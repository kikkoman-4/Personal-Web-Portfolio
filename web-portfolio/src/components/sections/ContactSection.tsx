import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Github, Linkedin } from '../ui/Icons';

export default function ContactSection() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactName && contactEmail && contactMessage) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setContactName('');
        setContactEmail('');
        setContactMessage('');
      }, 5000);
    }
  };

  return (
    <section id="contact" className="py-24 scroll-mt-16 text-left mb-16">
      <div className="grid md:grid-cols-12 gap-12">
        <div className="md:col-span-5 space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-sm font-semibold uppercase tracking-wider mb-3">
              <Mail size={16} />
              <span>Contact</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
              Start a conversation
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              Have an project in mind or looking for a developer to join your engineering crew? Let's construct something awesome together.
            </p>
          </div>

          <div className="space-y-4">
            <a href="mailto:kikzafable@gmail.com" className="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              <Mail size={18} />
              <span className="text-sm font-medium">kikzafable@gmail.com</span>
            </a>
            <a href="tel:+639567331807" className="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              <Phone size={18} />
              <span className="text-sm font-medium">(+63) 956-733-1807</span>
            </a>
            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
              <MapPin size={18} />
              <span className="text-sm font-medium">Vista Verde, Brgy. Mayowe, Tayabas City</span>
            </div>
            <div className="flex items-center gap-4 pt-4">
              <a href="https://github.com/kikkoman-4" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors" aria-label="GitHub Profile">
                <Github size={20} />
              </a>
              <a href="https://linkedin.com/in/kikz-afable" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors" aria-label="LinkedIn Profile">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="md:col-span-7">
          <form onSubmit={handleContactSubmit} className="space-y-4 bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 md:p-8">
            {formSubmitted ? (
              <div className="py-12 text-center">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-950/55 text-emerald-600 dark:text-emerald-400 mb-4">
                  <Send size={20} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Message Sent!</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm max-w-sm mx-auto">
                  Thank you for reaching out. I'll get back to you as soon as possible.
                </p>
              </div>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Your Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      required 
                      value={contactName} 
                      onChange={(e) => setContactName(e.target.value)} 
                      placeholder="Jane Doe" 
                      className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      required 
                      value={contactEmail} 
                      onChange={(e) => setContactEmail(e.target.value)} 
                      placeholder="jane@company.com" 
                      className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Message</label>
                  <textarea 
                    id="message" 
                    required 
                    rows={4} 
                    value={contactMessage} 
                    onChange={(e) => setContactMessage(e.target.value)} 
                    placeholder="Tell me about your project needs..." 
                    className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold h-12 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
                >
                  <Send size={16} />
                  <span>Send Message</span>
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
