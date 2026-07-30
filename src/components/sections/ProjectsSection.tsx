import { useState } from 'react';
import { FolderGit, ExternalLink, ChevronDown } from 'lucide-react';
import { PROJECTS, PROJECTS_CONTENT } from '../../data/portfolioData';
import { Github } from '../ui/Icons';
import AnimatedSection from '../ui/AnimatedSection';
import LazyImage from '../ui/LazyImage';

export default function ProjectsSection() {
  const [showAll, setShowAll] = useState(false);
  const featuredCount = 4;
  const initialProjects = PROJECTS.slice(0, featuredCount);
  const extraProjects = PROJECTS.slice(featuredCount);

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

      {/* Featured Initial Projects Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {initialProjects.map((proj, index) => (
          <AnimatedSection key={index} direction={index % 2 === 0 ? 'left' : 'right'} delay={(index % 4) * 100}>
            <ProjectCard proj={proj} />
          </AnimatedSection>
        ))}
      </div>

      {/* Fluid Sliding Extra Projects Container */}
      {extraProjects.length > 0 && (
        <div
          className={`grid transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            showAll
              ? 'grid-rows-[1fr] opacity-100 mt-8'
              : 'grid-rows-[0fr] opacity-0 mt-0 pointer-events-none'
          }`}
        >
          <div className="overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 pt-2 pb-2">
              {extraProjects.map((proj, index) => (
                <div key={index} className="h-full">
                  <ProjectCard proj={proj} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Fluid Animated View More / View Less Button */}
      {extraProjects.length > 0 && (
        <AnimatedSection direction="up" delay={150}>
          <div className="mt-12 text-center">
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="group relative inline-flex items-center justify-center gap-2 font-semibold text-sm px-7 py-3.5 rounded-full bg-slate-100 dark:bg-slate-800/80 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-200 dark:border-slate-700/60 hover:border-indigo-300 dark:hover:border-indigo-500/40 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-indigo-500/10 hover:scale-105 active:scale-95 overflow-hidden"
            >
              {/* Background liquid accent pill animation */}
              <span
                className={`absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-blue-500/10 to-indigo-500/10 transition-transform duration-500 ease-out ${
                  showAll ? 'translate-y-0' : 'translate-y-full group-hover:translate-y-0'
                }`}
              />

              <span className="relative z-10 flex items-center gap-2">
                <span>{showAll ? 'Show Less' : `View More Projects (${extraProjects.length} More)`}</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                    showAll ? 'rotate-180 text-indigo-500' : 'rotate-0 group-hover:translate-y-0.5'
                  }`}
                />
              </span>
            </button>
          </div>
        </AnimatedSection>
      )}
    </section>
  );
}

function ProjectCard({ proj }: { proj: typeof PROJECTS[0] }) {
  return (
    <div className="group flex flex-col bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/80 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10 h-full">
      {/* Thumbnail */}
      <div className="relative w-full h-48 overflow-hidden shrink-0">
        <LazyImage
          src={proj.thumbnail}
          alt={`${proj.title} screenshot`}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          containerClassName="w-full h-full"
        />
        {/* Hover overlay with links */}
        <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <a
            href={proj.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-all hover:scale-105"
            onClick={(e) => e.stopPropagation()}
          >
            <Github size={14} />
            <span>Source</span>
          </a>
          <a
            href={proj.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-indigo-600/90 hover:bg-indigo-500 border border-indigo-400/30 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-all hover:scale-105"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink size={14} />
            <span>Live Demo</span>
          </a>
        </div>
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-900/80 backdrop-blur-sm text-indigo-300 border border-indigo-800/50 px-2.5 py-1 rounded-full">
            {proj.category}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-grow p-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2 flex items-center justify-between">
          <span>{proj.title}</span>
          <ExternalLink size={15} className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2" />
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-5 flex-grow">
          {proj.description}
        </p>

        <div className="flex flex-wrap gap-1.5 border-t border-slate-100 dark:border-slate-800/50 pt-4">
          {proj.tags.map((tag, tIdx) => (
            <span key={tIdx} className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-md">
              {tag}
            </span>
          ))}
        </div>

        {/* Mobile Direct Touch Action Buttons */}
        <div className="flex md:hidden items-center gap-3 pt-4 mt-3 border-t border-slate-100 dark:border-slate-800/50">
          <a
            href={proj.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold py-2.5 rounded-xl border border-slate-200 dark:border-slate-700"
          >
            <Github size={14} />
            <span>Source</span>
          </a>
          <a
            href={proj.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 bg-indigo-600 text-white text-xs font-semibold py-2.5 rounded-xl shadow-sm"
          >
            <ExternalLink size={14} />
            <span>Live Demo</span>
          </a>
        </div>
      </div>
    </div>
  );
}

