import { useState, useCallback, useEffect } from 'react';
import { Award, ExternalLink, X, FileText, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { CERTIFICATIONS_CONTENT, CERTIFICATIONS } from '../../data/portfolioData';
import AnimatedSection from '../ui/AnimatedSection';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Cert {
  title: string;
  issuer: string;
  category: string;
  date: string;
  pdf: string;
  verifyUrl: string;
}

// ─── PDF Modal Viewer ─────────────────────────────────────────────────────────
function PdfModal({
  certs,
  initialIndex,
  onClose,
}: {
  certs: Cert[];
  initialIndex: number;
  onClose: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const cert = certs[currentIndex];

  const goPrev = useCallback(() => setCurrentIndex((i) => Math.max(0, i - 1)), []);
  const goNext = useCallback(() => setCurrentIndex((i) => Math.min(certs.length - 1, i + 1)), [certs.length]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, goPrev, goNext]);

  return (
    <div
      id="cert-modal-backdrop"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      onClick={(e) => {
        if ((e.target as HTMLElement).id === 'cert-modal-backdrop') onClose();
      }}
    >
      {/* Blur backdrop */}
      <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-md" />

      {/* Modal panel */}
      <div className="relative z-10 w-full max-w-6xl h-[92vh] flex flex-col rounded-2xl overflow-hidden border border-slate-700/60 bg-slate-900 shadow-2xl">

        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-3.5 border-b border-slate-800 bg-slate-900/95 flex-shrink-0">
          <Award size={18} className="text-indigo-400 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-bold text-white truncate">{cert.title}</h2>
            <p className="text-xs text-slate-400 truncate">{cert.issuer} · {cert.date}</p>
          </div>

          {/* Nav counter */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              id="cert-modal-prev"
              disabled={currentIndex === 0}
              onClick={goPrev}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-xs text-slate-500 px-1 select-none tabular-nums">
              {currentIndex + 1} / {certs.length}
            </span>
            <button
              id="cert-modal-next"
              disabled={currentIndex === certs.length - 1}
              onClick={goNext}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Next"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-shrink-0 ml-2">
            {cert.verifyUrl && (
              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300 hover:border-indigo-500 hover:text-indigo-400 transition-colors"
              >
                <ExternalLink size={12} />
                Verify
              </a>
            )}
            <a
              href={cert.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
            >
              Open in Tab
            </a>
            <button
              id="cert-modal-close"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-1"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 bg-slate-950 overflow-hidden">
          <iframe
            key={cert.pdf}
            src={`${cert.pdf}#toolbar=1&navpanes=0&scrollbar=1&view=FitH`}
            className="w-full h-full border-0"
            title={cert.title}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Landscape Certificate Card ───────────────────────────────────────────────
function CertCard({
  cert,
  index,
  onOpen,
}: {
  cert: Cert;
  index: number;
  onOpen: (cert: Cert) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const hasPdf = Boolean(cert.pdf);
  const hasVerify = Boolean(cert.verifyUrl);

  return (
    <AnimatedSection direction="up" delay={index * 70} duration={600}>
      <div
        className="group relative flex flex-col md:flex-row rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 backdrop-blur-sm shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* ── LEFT: PDF Preview Panel ────────────────────────────────────── */}
        <div
          className="relative md:w-[45%] flex-shrink-0 overflow-hidden cursor-pointer bg-slate-100 dark:bg-slate-800/60"
          style={{ minHeight: '260px' }}
          onClick={() => hasPdf && onOpen(cert)}
        >
          {/* Document Skeleton — shown until real PDFs are loaded */}
          <div className="absolute inset-0 flex flex-col p-5 gap-3">
            {/* Certificate header bar */}
            <div className="flex items-center justify-between mb-1">
              <div className="h-2.5 w-20 rounded-full skeleton-shimmer" />
              <div className="h-2.5 w-14 rounded-full skeleton-shimmer" />
            </div>

            {/* Seal / stamp circle */}
            <div className="flex justify-center py-2">
              <div className="w-16 h-16 rounded-full skeleton-shimmer" />
            </div>

            {/* Title lines */}
            <div className="space-y-2">
              <div className="h-3 w-4/5 mx-auto rounded-full skeleton-shimmer" />
              <div className="h-3 w-3/5 mx-auto rounded-full skeleton-shimmer" />
            </div>

            {/* Divider */}
            <div className="h-px w-full skeleton-shimmer mt-1" />

            {/* Body text lines */}
            <div className="space-y-2">
              <div className="h-2 w-full rounded-full skeleton-shimmer" />
              <div className="h-2 w-5/6 rounded-full skeleton-shimmer" />
              <div className="h-2 w-4/6 rounded-full skeleton-shimmer" />
              <div className="h-2 w-full rounded-full skeleton-shimmer" />
            </div>

            {/* Signature / bottom bar */}
            <div className="mt-auto flex items-center justify-between">
              <div className="h-2.5 w-16 rounded-full skeleton-shimmer" />
              <div className="h-2.5 w-12 rounded-full skeleton-shimmer" />
            </div>
          </div>

          {/* Hover overlay — click to open PDF modal */}
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center gap-2 bg-indigo-950/70 backdrop-blur-[2px] transition-opacity duration-300 ${
              hovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 border border-white/20">
              <FileText size={22} className="text-white" />
            </div>
            <span className="text-xs font-bold text-white tracking-wide uppercase">View PDF</span>
          </div>

          {/* Right edge gradient blending into card body */}
          <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-r from-transparent to-white dark:to-slate-900 pointer-events-none hidden md:block" />
          {/* Bottom edge gradient for mobile */}
          <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white dark:from-slate-900 to-transparent pointer-events-none md:hidden" />
        </div>

        {/* ── RIGHT: Certificate Info ────────────────────────────────────── */}
        <div className="flex flex-col justify-between flex-1 p-6 gap-4">
          {/* Top: meta */}
          <div>
            <div className="flex items-center justify-between gap-3 flex-wrap mb-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 rounded-md border border-indigo-100 dark:border-indigo-900/40">
                {cert.category}
              </span>
              <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                {cert.date}
              </span>
            </div>

            <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white leading-snug">
              {cert.title}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5">{cert.issuer}</p>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-100 dark:border-slate-800" />

          {/* Bottom: actions */}
          <div className="flex items-center gap-3">
            <button
              id={`view-pdf-btn-${index}`}
              disabled={!hasPdf}
              onClick={() => hasPdf && onOpen(cert)}
              className="flex items-center gap-2 text-sm font-semibold py-2.5 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-200 dark:disabled:bg-slate-800 text-white disabled:text-slate-400 transition-all duration-200 shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/30"
            >
              <FileText size={15} />
              View PDF
            </button>
            {hasVerify && (
              <a
                id={`verify-cert-btn-${index}`}
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-semibold py-2.5 px-5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-indigo-400 dark:hover:border-indigo-600 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200"
              >
                <ExternalLink size={14} />
                Verify Certificate
              </a>
            )}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function CertificationsSection() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [modalData, setModalData] = useState<{ certs: Cert[]; index: number } | null>(null);

  const categories = ['All', ...Array.from(new Set(CERTIFICATIONS.map((c) => c.category)))];

  const filtered = activeFilter === 'All'
    ? CERTIFICATIONS
    : CERTIFICATIONS.filter((c) => c.category === activeFilter);

  const openModal = useCallback((cert: Cert) => {
    const index = filtered.findIndex((c) => c.title === cert.title);
    setModalData({ certs: filtered as Cert[], index });
  }, [filtered]);

  const closeModal = useCallback(() => setModalData(null), []);

  return (
    <>
      <section id="certifications" className="py-24 scroll-mt-16 w-full">
        {/* ── Section Header — centred, max-w for readability ── */}
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <AnimatedSection direction="up">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-sm font-semibold uppercase tracking-wider mb-3">
                <Award size={16} />
                <span>{CERTIFICATIONS_CONTENT.tagline}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                {CERTIFICATIONS_CONTENT.title}
              </h2>
              <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-sm leading-relaxed">
                {CERTIFICATIONS_CONTENT.subtitle}
              </p>
            </div>
          </AnimatedSection>

          {/* ── Filter Bar ── */}
          <AnimatedSection direction="up" delay={80}>
            <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
              <Filter size={14} className="text-slate-400 mr-1" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  id={`cert-filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => setActiveFilter(cat)}
                  className={`text-xs font-semibold px-4 py-1.5 rounded-full border transition-all duration-200 ${
                    activeFilter === cat
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-500/20'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 bg-white dark:bg-transparent'
                  }`}
                >
                  {cat}
                </button>
              ))}
              <span className="text-xs text-slate-400 dark:text-slate-500 ml-2">
                {filtered.length} {filtered.length === 1 ? 'certificate' : 'certificates'}
              </span>
            </div>
          </AnimatedSection>
        </div>

        {/* ── Full-width Certificate Grid ── */}
        <div className="px-6 lg:px-12 xl:px-20 2xl:px-32">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
              {filtered.map((cert, i) => (
                <CertCard
                  key={cert.title}
                  cert={cert as Cert}
                  index={i}
                  onOpen={openModal}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-slate-400 dark:text-slate-600">
              <FileText size={48} strokeWidth={1} className="mx-auto mb-4 opacity-50" />
              <p className="text-sm">No certificates in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── PDF Modal ── */}
      {modalData && (
        <PdfModal
          certs={modalData.certs}
          initialIndex={modalData.index}
          onClose={closeModal}
        />
      )}
    </>
  );
}
