import { useState } from 'react';
import { User, BookOpen, Briefcase, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ABOUT_CONTENT, STRENGTHS, EDUCATION, LANGUAGES, EXPERIENCE } from '../../data/portfolioData';
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

  return (
    <div
      id="exp-lightbox-backdrop"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => {
        if ((e.target as HTMLElement).id === 'exp-lightbox-backdrop') onClose();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col rounded-2xl overflow-hidden border border-slate-700/60 bg-slate-900 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800 bg-slate-900/95 flex-shrink-0">
          <div>
            <p className="text-xs text-slate-400">{title}</p>
            <p className="text-xs text-slate-500 tabular-nums">{current + 1} / {images.length}</p>
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
        <div className="bg-slate-950 flex items-center justify-center" style={{ minHeight: '60vh' }}>
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
                className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  i === current
                    ? 'border-indigo-500 opacity-100'
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
    </div>
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
        <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-800 border-4 border-white dark:border-slate-900 group-hover:bg-indigo-600 dark:group-hover:bg-indigo-400 transition-colors" />

        {/* Text content */}
        <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-1">{exp.period}</div>
        <h4 className="text-lg font-bold text-slate-900 dark:text-white">{exp.role}</h4>
        <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">{exp.company}</div>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{exp.description}</p>

        {/* Image strip — only rendered when images are present */}
        {images.length > 0 && (
          <div className="mt-4 flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
            {images.map((src, i) => (
              <button
                key={i}
                id={`exp-img-${index}-${i}`}
                onClick={() => setLightbox(i)}
                className="flex-shrink-0 w-40 h-24 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label={`View ${exp.company} screenshot ${i + 1}`}
              >
                <LazyImage
                  src={src}
                  alt={`${exp.company} result ${i + 1}`}
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  containerClassName="w-full h-full"
                />
              </button>
            ))}
          </div>
        )}
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

// ─── Main section ─────────────────────────────────────────────────────────────
export default function AboutSection() {
  return (
    <section id="about" className="py-24 scroll-mt-16">
      <div className="grid md:grid-cols-12 gap-12 items-start">
        <AnimatedSection direction="left" className="md:col-span-5 md:sticky md:top-24 space-y-10 text-left">
          <div>
            <div className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-sm font-semibold uppercase tracking-wider mb-3">
              <User size={16} />
              <span>{ABOUT_CONTENT.tagline}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
              {ABOUT_CONTENT.title}
            </h2>
            {ABOUT_CONTENT.paragraphs.map((paragraph, pIdx) => (
              <p key={pIdx} className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                {paragraph}
              </p>
            ))}
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
        </AnimatedSection>

        <AnimatedSection direction="right" className="md:col-span-7 space-y-12 text-left">
          {/* Professional Experience */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2 mb-6">
              <Briefcase size={18} />
              <span>Professional Experience</span>
            </h3>

            <div className="relative pl-6 border-l border-slate-200 dark:border-slate-800 space-y-10">
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
