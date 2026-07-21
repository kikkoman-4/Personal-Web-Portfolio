import { Cpu, Layers } from 'lucide-react';
import { SKILLS } from '../data/portfolioData';

export default function SkillsSection() {
  return (
    <section id="skills" className="py-24 scroll-mt-16 text-left">
      <div className="grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-5">
          <div className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-sm font-semibold uppercase tracking-wider mb-3">
            <Cpu size={16} />
            <span>My Stack</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
            Engineered for speed, built to scale
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            I maintain expertise across multiple technology disciplines. From frontend rendering mechanisms to robust backend structures, these tools form my daily development pipeline.
          </p>
        </div>

        <div className="md:col-span-7 grid gap-6">
          {SKILLS.map((cat, index) => (
            <div key={index} className="bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Layers size={14} />
                <span>{cat.category}</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((skill, sIdx) => (
                  <span 
                    key={sIdx}
                    className="bg-slate-50 dark:bg-slate-800/50 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200 dark:hover:border-indigo-900/60 border border-slate-200 dark:border-slate-800/60 text-slate-800 dark:text-slate-200 px-3.5 py-1.5 rounded-xl text-sm font-medium transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
