import { useState } from 'react';
import { createPortal } from 'react-dom';
import {
  User,
  Briefcase,
  X,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  MapPin,
  Mail,
  Terminal,
  Sparkles,
  GraduationCap,
  Globe,
  Award,
  Code2,
  Users,
  Trophy,
  Calendar,
} from 'lucide-react';
import { Github, Linkedin } from '../ui/Icons';
import {
  PERSONAL_INFO,
  ABOUT_CONTENT,
  STRENGTHS,
  EDUCATION,
  LANGUAGES,
  EXPERIENCE,
  STATS,
} from '../../data/portfolioData';
import AnimatedSection from '../ui/AnimatedSection';
import LazyImage from '../ui/LazyImage';

// ─── Lightbox for full-size image viewing ────────────────────────────────────
function Lightbox({
  images,
  startIndex,
  title,
  onClose,
}: {
  images: string[];
  startIndex: number;
  title: string;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(startIndex);

  const prev = () => setCurrent((i) => Math.max(0, i - 1));
  const next = () => setCurrent((i) => Math.min(images.length - 1, i + 1));

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Panel */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col rounded-2xl overflow-hidden border border-slate-700/60 bg-slate-900 shadow-2xl animate-popup">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800 bg-slate-900/95 flex-shrink-0">
          <div>
            <p className="text-xs text-slate-400">{title}</p>
            <p className="text-xs text-slate-500 tabular-nums font-mono">
              {current + 1} / {images.length}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              disabled={current === 0}
              onClick={prev}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              disabled={current === images.length - 1}
              onClick={next}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Next image"
            >
              <ChevronRight size={16} />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-1"
              aria-label="Close lightbox"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Image area */}
        <div className="bg-slate-950 flex items-center justify-center min-h-[60vh]">
          <LazyImage
            key={images[current]}
            src={images[current]}
            alt={`${title} screenshot ${current + 1}`}
            className="object-contain max-h-[70vh]"
            containerClassName="w-full max-h-[70vh]"
          />
        </div>

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div className="flex gap-2 p-3 border-t border-slate-800 overflow-x-auto">
            {images.map((src, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 ${i === current
                  ? 'border-indigo-500 opacity-100 scale-105'
                  : 'border-slate-700 opacity-50 hover:opacity-80'
                  }`}
                aria-label={`View image ${i + 1}`}
              >
                <LazyImage
                  src={src}
                  alt={`Thumbnail ${i + 1}`}
                  className="object-cover"
                  containerClassName="w-full h-full"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

// ─── Experience entry with image strip ───────────────────────────────────────
function ExperienceEntry({
  exp,
  index,
}: {
  exp: {
    role: string;
    company: string;
    period: string;
    description: string;
    images?: string[];
  };
  index: number;
}) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const images = exp.images ?? [];

  return (
    <>
      <div className="relative group">
        {/* Timeline dot */}
        <div className="absolute -left-[32.5px] top-1.5 w-4 h-4 rounded-full bg-slate-300 dark:bg-slate-800 border-4 border-slate-50 dark:border-slate-950 group-hover:bg-indigo-600 dark:group-hover:bg-indigo-400 group-hover:scale-125 transition-all duration-200" />

        {/* Entry Card styled like GitHub activity item */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 transition-all duration-200 hover:border-slate-300 dark:hover:border-slate-700/80 shadow-sm hover:shadow-md">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                {exp.role}
              </h4>
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {exp.company}
              </div>
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/50 dark:border-indigo-800/40 px-2.5 py-1 rounded-full">
              <Calendar size={12} />
              {exp.period}
            </span>
          </div>

          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mt-3">
            {exp.description}
          </p>

          {/* Image strip — only rendered when images are present */}
          {images.length > 0 && (
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60">
              <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                Project Showcase ({images.length})
              </p>
              <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
                {images.map((src, i) => (
                  <button
                    key={i}
                    id={`exp-img-${index}-${i}`}
                    onClick={() => setLightbox(i)}
                    className="flex-shrink-0 w-36 h-22 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700/80 hover:border-indigo-500 dark:hover:border-indigo-400 hover:shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 group/img"
                    aria-label={`View ${exp.company} screenshot ${i + 1}`}
                  >
                    <LazyImage
                      src={src}
                      alt={`${exp.company} screenshot ${i + 1}`}
                      className="object-cover transition-transform duration-300 group-hover/img:scale-105"
                      containerClassName="w-full h-full"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <Lightbox
          images={images}
          startIndex={lightbox}
          title={`${exp.role} — ${exp.company}`}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  );
}

// Map icons to stats index
const STAT_ICONS = [Trophy, Code2, Users, Award];

// ─── Main section ─────────────────────────────────────────────────────────────
export default function AboutSection() {
  return (
    <section id="about" className="py-24 scroll-mt-16">
      <div className="grid md:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left Column (Sticky Sidebar - GitHub Profile Style) */}
        <AnimatedSection
          direction="left"
          className="md:col-span-4 lg:col-span-4 md:sticky md:top-8 max-h-[calc(100vh-4rem)] overflow-y-auto scrollbar-hide space-y-6 text-left pb-4"
        >
          {/* Avatar & Profile Identifiers */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="relative mb-4 group">
              <div className="w-40 h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden border-2 border-slate-200 dark:border-slate-700 shadow-xl bg-slate-100 dark:bg-slate-800 transition-transform duration-300 group-hover:scale-[1.02]">
                <LazyImage
                  src="/thumbnails/gradpic_small.jpg"
                  alt={PERSONAL_INFO.name}
                  className="object-cover w-full h-full"
                  containerClassName="w-full h-full"
                />
              </div>
            </div>

            {/* Name & Handle */}
            <div className="w-full">
              <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                {PERSONAL_INFO.name}
              </h2>
              <div className="text-sm font-mono text-slate-500 dark:text-slate-400 font-normal">
                kikkoman-4
              </div>
              <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mt-1">
                {PERSONAL_INFO.title}
              </div>
            </div>
          </div>

          {/* GitHub Style Meta Links List */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2.5">
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
              <MapPin size={15} className="text-slate-400 shrink-0" />
              <span>{PERSONAL_INFO.location}</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
              <Mail size={15} className="text-slate-400 shrink-0" />
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="hover:text-indigo-600 dark:hover:text-indigo-400 truncate transition-colors"
              >
                {PERSONAL_INFO.email}
              </a>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
              <Github size={15} className="text-slate-400 shrink-0" />
              <a
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                github.com/kikkoman-4
              </a>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
              <Linkedin size={15} className="text-slate-400 shrink-0" />
              <a
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                linkedin.com/in/kikz-afable
              </a>
            </div>
          </div>

          {/* Core Strengths (GitHub Topic Tags Style) */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Core Strengths
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {STRENGTHS.map((strength, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
                >
                  {strength}
                </span>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3 flex items-center gap-2">
              <GraduationCap size={15} className="text-indigo-500" />
              <span>Education</span>
            </h3>
            <div className="space-y-3">
              {EDUCATION.map((edu, idx) => (
                <div key={idx} className="text-left">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {edu.degree}
                  </h4>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    {edu.institution}
                  </div>
                  <div className="text-[10px] font-mono font-semibold text-indigo-600 dark:text-indigo-400">
                    {edu.period}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Languages (GitHub Lang Stats Style) */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3 flex items-center gap-2">
              <Globe size={15} className="text-indigo-500" />
              <span>Languages</span>
            </h3>
            <div className="space-y-2">
              {LANGUAGES.map((lang, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${idx === 0 ? 'bg-indigo-500' : 'bg-amber-400'
                        }`}
                    />
                    <span className="text-slate-700 dark:text-slate-300">
                      {lang.name}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    {lang.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Right Column (Scrolling Divs - GitHub Profile Overview) */}
        <AnimatedSection
          direction="right"
          className="md:col-span-8 lg:col-span-8 space-y-8 text-left"
        >
          {/* README.md Container Box */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 overflow-hidden shadow-sm">
            {/* Header bar styled like GitHub README box */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-100/80 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Terminal size={15} className="text-slate-500 dark:text-slate-400" />
                <span className="text-xs font-mono font-medium text-slate-700 dark:text-slate-300">
                  kikkoman-4 / README.md
                </span>
              </div>
              <Sparkles size={14} className="text-indigo-500" />
            </div>

            {/* Readme Content */}
            <div className="p-6 md:p-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-800/50">
                <User size={14} />
                <span>{ABOUT_CONTENT.tagline}</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                {ABOUT_CONTENT.title}
              </h3>
              {ABOUT_CONTENT.paragraphs.map((paragraph, pIdx) => (
                <p
                  key={pIdx}
                  className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Professional Stats Grid (GitHub Metric Cards) */}
          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
              <TrendingUp size={18} className="text-indigo-500" />
              <span>Professional Stats</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              {STATS.map((stat, idx) => {
                const IconComponent = STAT_ICONS[idx % STAT_ICONS.length];
                return (
                  <div
                    key={idx}
                    className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 hover:border-indigo-400 dark:hover:border-indigo-500/70 transition-all duration-200 shadow-sm hover:shadow-md group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                        {stat.label}
                      </span>
                      <IconComponent
                        size={16}
                        className="text-slate-400 group-hover:text-indigo-500 transition-colors"
                      />
                    </div>
                    <div className="text-2xl md:text-3xl font-bold font-mono text-indigo-600 dark:text-indigo-400 tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                      {stat.description}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Professional Experience Feed (GitHub Activity Timeline Style) */}
          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2 mb-6">
              <Briefcase size={18} className="text-indigo-500" />
              <span>Professional Experience</span>
            </h3>

            <div className="relative pl-6 border-l border-slate-200 dark:border-slate-800 space-y-8">
              {EXPERIENCE.map((exp, index) => (
                <ExperienceEntry key={index} exp={exp} index={index} />
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

