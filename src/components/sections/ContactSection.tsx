import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2, AlertCircle } from 'lucide-react';
import { Github, Linkedin } from '../ui/Icons';
import { PERSONAL_INFO, CONTACT_CONTENT } from '../../data/portfolioData';
import AnimatedSection from '../ui/AnimatedSection';

export default function ContactSection() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) {
      setErrorMessage('Please fill out all required fields.');
      return;
    }

    setIsSubmitting(true);

    const accessKey =
      import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ||
      import.meta.env.VITE_FORM_ACCESS_KEY ||
      import.meta.env.FORM_ACCESS_KEY;

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: contactName,
          email: contactEmail,
          message: contactMessage,
          subject: `Portfolio Message from ${contactName}`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setFormSubmitted(true);
        setContactName('');
        setContactEmail('');
        setContactMessage('');
      } else {
        setErrorMessage(result.message || 'Something went wrong. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setErrorMessage('Failed to send message. Please check your network connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-12 md:py-16 mt-12 md:mt-64 scroll-mt-16 text-left mb-16 snap-start snap-always">
      <div className="grid md:grid-cols-12 gap-12">
        <AnimatedSection direction="left" className="md:col-span-5 space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-sm font-semibold uppercase tracking-wider mb-3">
              <Mail size={16} />
              <span>{CONTACT_CONTENT.tagline}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
              {CONTACT_CONTENT.title}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              {CONTACT_CONTENT.subtitle}
            </p>
          </div>

          <div className="space-y-4">
            <a href={`mailto:${PERSONAL_INFO.email}`} className="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              <Mail size={18} />
              <span className="text-sm font-medium">{PERSONAL_INFO.email}</span>
            </a>
            <a href={`tel:${PERSONAL_INFO.phoneRaw}`} className="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              <Phone size={18} />
              <span className="text-sm font-medium">{PERSONAL_INFO.phone}</span>
            </a>
            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
              <MapPin size={18} />
              <span className="text-sm font-medium">{PERSONAL_INFO.location}</span>
            </div>
            <div className="flex items-center gap-4 pt-4">
              <a href={PERSONAL_INFO.socials.github} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors" aria-label="GitHub Profile">
                <Github size={20} />
              </a>
              <a href={PERSONAL_INFO.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors" aria-label="LinkedIn Profile">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection direction="right" className="md:col-span-7">
          <form onSubmit={handleContactSubmit} className="space-y-4 bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 md:p-8">
            {formSubmitted ? (
              <div className="py-12 text-center">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-950/55 text-emerald-600 dark:text-emerald-400 mb-4">
                  <Send size={20} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{CONTACT_CONTENT.successTitle}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm max-w-sm mx-auto mb-6">
                  {CONTACT_CONTENT.successMessage}
                </p>
                <button
                  type="button"
                  onClick={() => setFormSubmitted(false)}
                  className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm flex items-center gap-2.5">
                    <AlertCircle size={18} className="shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Your Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      required 
                      disabled={isSubmitting}
                      value={contactName} 
                      onChange={(e) => setContactName(e.target.value)} 
                      placeholder="Jane Doe" 
                      className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition-colors disabled:opacity-50"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      required 
                      disabled={isSubmitting}
                      value={contactEmail} 
                      onChange={(e) => setContactEmail(e.target.value)} 
                      placeholder="jane@company.com" 
                      className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition-colors disabled:opacity-50"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Message</label>
                  <textarea 
                    id="message" 
                    required 
                    rows={4} 
                    disabled={isSubmitting}
                    value={contactMessage} 
                    onChange={(e) => setContactMessage(e.target.value)} 
                    placeholder="Tell me about your project needs..." 
                    className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition-colors resize-none disabled:opacity-50"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold h-12 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </>
            )}
          </form>
        </AnimatedSection>
      </div>
    </section>
  );
}
