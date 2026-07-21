import { User, BookOpen, Briefcase, Award } from 'lucide-react';
import { STRENGTHS, EDUCATION, LANGUAGES, EXPERIENCE, CERTIFICATIONS } from '../../data/portfolioData';

export default function AboutSection() {
  return (
    <section id="about" className="py-24 scroll-mt-16">
      <div className="grid md:grid-cols-12 gap-12 items-start">
        <div className="md:col-span-5 md:sticky md:top-24 space-y-10 text-left">
          <div>
            <div className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-sm font-semibold uppercase tracking-wider mb-3">
              <User size={16} />
              <span>About Me</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
              My professional path & design principles
            </h2>
            <p className="mt-6 text-slate-600 dark:text-slate-400 leading-relaxed">
              I’m a Full-Stack Developer with a deep focus on web and game development. I spend most of my time building clean, high-performance web applications and logic-heavy 2D games.
            </p>
            <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
              Whether I’m wiring up backend databases, crafting smooth user interfaces, or programming core gameplay systems, I love taking a complex project from a rough idea all the way to a finished, working product.
            </p>
          </div>

          {/* Core Strengths */}
          <div className="border-t border-slate-200 dark:border-slate-800 pt-6">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">Core Strengths</h3>
            <div className="flex flex-wrap gap-2">
              {STRENGTHS.map((strength, idx) => (
                <span key={idx} className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-lg text-xs font-semibold">
                  {strength}
                </span>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="border-t border-slate-200 dark:border-slate-800 pt-6">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <BookOpen size={16} />
              <span>Education</span>
            </h3>
            <div className="space-y-4">
              {EDUCATION.map((edu, idx) => (
                <div key={idx}>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{edu.degree}</h4>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{edu.institution}</div>
                  <div className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">{edu.period}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="border-t border-slate-200 dark:border-slate-800 pt-6">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">Languages</h3>
            <div className="space-y-2">
              {LANGUAGES.map((lang, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">{lang.name}</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{lang.level}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-7 space-y-12 text-left">
          {/* Professional Experience */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2 mb-6">
              <Briefcase size={18} />
              <span>Professional Experience</span>
            </h3>
            
            <div className="relative pl-6 border-l border-slate-200 dark:border-slate-800 space-y-8">
              {EXPERIENCE.map((exp, index) => (
                <div key={index} className="relative group">
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-800 border-4 border-white dark:border-slate-900 group-hover:bg-indigo-600 dark:group-hover:bg-indigo-400 transition-colors"></div>
                  <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-1">{exp.period}</div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">{exp.role}</h4>
                  <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">{exp.company}</div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications & Seminars */}
          <div className="border-t border-slate-200 dark:border-slate-800 pt-8">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2 mb-6">
              <Award size={18} />
              <span>Certifications & Seminars</span>
            </h3>
            
            <div className="space-y-4">
              {CERTIFICATIONS.map((cert, index) => (
                <div key={index} className="bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800/80 rounded-xl p-4 flex justify-between items-start gap-4 hover:border-indigo-300 dark:hover:border-indigo-900/50 transition-colors">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{cert.title}</h4>
                    <div className="text-xs text-slate-500 dark:text-slate-400">{cert.issuer}</div>
                  </div>
                  <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 whitespace-nowrap bg-indigo-50 dark:bg-indigo-950/40 px-2.5 py-1 rounded-md">
                    {cert.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
