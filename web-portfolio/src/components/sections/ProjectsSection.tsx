import { FolderGit, ExternalLink } from 'lucide-react';
import { PROJECTS, PROJECTS_CONTENT } from '../../data/portfolioData';
import { Github } from '../ui/Icons';
import AnimatedSection from '../ui/AnimatedSection';

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24 scroll-mt-16 text-left">
      <AnimatedSection direction="up">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-sm font-semibold uppercase tracking-wider mb-3">
              <FolderGit size={16} />
              <span>{PROJECTS_CONTENT.tagline}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              {PROJECTS_CONTENT.title}
            </h2>
          </div>
          <p className="text-slate-600 dark:text-slate-400 max-w-md">
            {PROJECTS_CONTENT.subtitle}
          </p>
        </div>
      </AnimatedSection>

      <div className="grid md:grid-cols-2 gap-8">
        {PROJECTS.map((proj, index) => (
          <AnimatedSection key={index} direction={index % 2 === 0 ? 'left' : 'right'} delay={index * 100}>
            <div 
              className="group flex flex-col bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/5 h-full"
            >
              <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-2">{proj.category}</div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 group-hover:text-indigo-400 dark:group-hover:text-indigo-400 transition-colors mb-3 flex items-center justify-between">
                <span>{proj.title}</span>
                <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                {proj.description}
              </p>
              
              <div className="flex flex-wrap gap-1.5 mb-6">
                {proj.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 text-xs font-semibold border-t border-slate-100 dark:border-slate-800/50 pt-4">
                <a href={proj.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                  <Github size={14} />
                  <span>Source</span>
                </a>
                <a href={proj.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                  <ExternalLink size={14} />
                  <span>Live Demo</span>
                </a>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
