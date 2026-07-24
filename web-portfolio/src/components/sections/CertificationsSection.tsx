import { useState, useMemo } from 'react';
import {
  Award, ExternalLink, ShieldCheck, FileText,
  Calendar, Building2, Tag, ChevronLeft, ChevronRight, Maximize2
} from 'lucide-react';
import { CERTIFICATIONS_CONTENT, CERTIFICATIONS } from '../../data/portfolioData';
import LazyImage from '../ui/LazyImage';

interface Cert {
  title: string;
  issuer: string;
  category: string;
  date: string;
  pdf: string;
  verifyUrl: string;
}

const pad = (n: number) => String(n).padStart(2, '0');

export default function CertificationsSection() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedCertIndex, setSelectedCertIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(CERTIFICATIONS.map((c) => c.category)))],
    []
  );

  const filteredCerts = useMemo<Cert[]>(() => {
    if (activeFilter === 'All') return CERTIFICATIONS as Cert[];
    return CERTIFICATIONS.filter((c) => c.category === activeFilter) as Cert[];
  }, [activeFilter]);

  const selectedCert = useMemo<Cert>(
    () => filteredCerts[selectedCertIndex] ?? filteredCerts[0] ?? (CERTIFICATIONS[0] as Cert),
    [filteredCerts, selectedCertIndex]
  );

  const handleFilterChange = (cat: string) => {
    setActiveFilter(cat);
    setSelectedCertIndex(0);
  };

  const handlePrev = () =>
    setSelectedCertIndex((i) => (i > 0 ? i - 1 : filteredCerts.length - 1));

  const handleNext = () =>
    setSelectedCertIndex((i) => (i < filteredCerts.length - 1 ? i + 1 : 0));

  const isImage = (path: string) => Boolean(path.match(/\.(png|jpe?g|webp|gif|svg)$/i));

  return (
    <>
      {/* ── Section scroll-snap wrapper ───────────────────────────────────── */}
      <section
        id="certifications"
        data-snap
        data-lenis-snap-start
        style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}
        className="h-screen w-full overflow-hidden flex flex-col bg-slate-950 text-left relative snap-start snap-always"
      >
        {/* ── TOP HEADER BAR ───────────────────────────────────────────────── */}
        <div className="shrink-0 flex items-center justify-between px-6 lg:px-10 pt-5 pb-3 border-b border-slate-800/50">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 flex items-center gap-1.5 mb-1">
              <Award size={11} />
              {CERTIFICATIONS_CONTENT.tagline}
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white uppercase leading-none">
              {CERTIFICATIONS_CONTENT.title}
            </h2>
          </div>
          <p className="hidden md:block text-slate-500 text-[11px] leading-relaxed max-w-[280px] text-right">
            {CERTIFICATIONS_CONTENT.subtitle}
          </p>
        </div>

        {/* ── MAIN BODY (3 columns) ─────────────────────────────────────────── */}
        <div className="flex-1 grid grid-cols-12 overflow-hidden min-h-0">

          {/* LEFT — Slim scrollable roster list */}
          <aside className="col-span-3 xl:col-span-3 border-r border-slate-800/50 flex flex-col overflow-hidden">
            <div className="px-5 pt-4 pb-2 shrink-0 flex items-center justify-between">
              <p className="text-[9px] uppercase tracking-[0.2em] text-slate-500 font-semibold">
                Roster &mdash; {activeFilter}
              </p>
              <span className="text-[9px] text-slate-600 font-mono">
                {filteredCerts.length} total
              </span>
            </div>

            {/* data-lenis-prevent prevents Lenis smooth scroll from hijacking wheel scrolling inside this list */}
            <div
              data-lenis-prevent="true"
              className="flex-1 overflow-y-auto pr-1 space-y-1 scrollbar-thin scrollbar-thumb-indigo-500/20 hover:scrollbar-thumb-indigo-500/40"
            >
              {filteredCerts.map((cert, idx) => {
                const isSelected = idx === selectedCertIndex;
                return (
                  <button
                    key={cert.title + idx}
                    onClick={() => setSelectedCertIndex(idx)}
                    className={`w-full text-left px-5 py-3 border-b border-slate-800/20 transition-all duration-150 group relative flex flex-col justify-center ${
                      isSelected
                        ? 'bg-indigo-600/10 border-l-2 border-l-indigo-500 text-white'
                        : 'border-l-2 border-l-transparent text-slate-500 hover:text-slate-300 hover:bg-white/[0.02]'
                    }`}
                  >
                    <span className={`text-xs truncate font-medium transition-colors ${isSelected ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>
                      {cert.title}
                    </span>
                    <span className="text-[10px] text-slate-500 truncate mt-0.5">
                      {cert.issuer}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Scroll hint indicator */}
            <div className="shrink-0 py-2 px-5 border-t border-slate-800/50 flex items-center justify-center bg-slate-950/80">
              <span className="text-[9px] uppercase tracking-widest text-slate-600 flex items-center gap-1">
                <ChevronRight size={10} className="rotate-90" />
                Scroll List
                <ChevronRight size={10} className="rotate-90" />
              </span>
            </div>
          </aside>

          {/* CENTER — Certificate viewer */}
          <div className="col-span-6 xl:col-span-6 flex flex-col items-center justify-center relative px-6 lg:px-10 py-4 bg-slate-950">
            {/* Cert title above viewer */}
            <h3 className="text-center text-white font-semibold text-sm sm:text-base mb-3 tracking-wide max-w-md line-clamp-1 shrink-0">
              {selectedCert?.title}
            </h3>

            {/* Viewer + arrows */}
            <div className="flex-1 flex items-center justify-center w-full min-h-0 relative">
              {/* Prev */}
              <button
                onClick={handlePrev}
                aria-label="Previous certificate"
                className="absolute left-0 z-10 w-9 h-9 flex items-center justify-center rounded-full border border-slate-700/60 bg-slate-900/80 text-slate-400 hover:text-white hover:border-slate-500 hover:bg-slate-800 transition-all shrink-0 shadow-lg"
              >
                <ChevronLeft size={16} />
              </button>

              {/* Certificate card wrapper */}
              <div className="mx-12 w-full h-full flex items-center justify-center rounded-2xl overflow-hidden border border-slate-800/60 bg-slate-900 shadow-2xl shadow-black/50 relative group">
                {selectedCert && (
                  isImage(selectedCert.pdf) ? (
                    <LazyImage
                      src={selectedCert.pdf}
                      alt={selectedCert.title}
                      className="max-h-full max-w-full object-contain"
                      containerClassName="w-full h-full flex items-center justify-center"
                    />
                  ) : (
                    <iframe
                      key={selectedCert.pdf}
                      src={`${selectedCert.pdf}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
                      className="w-full h-full border-0 bg-white"
                      title={selectedCert.title}
                    />
                  )
                )}
              </div>

              {/* Next */}
              <button
                onClick={handleNext}
                aria-label="Next certificate"
                className="absolute right-0 z-10 w-9 h-9 flex items-center justify-center rounded-full border border-slate-700/60 bg-slate-900/80 text-slate-400 hover:text-white hover:border-slate-500 hover:bg-slate-800 transition-all shrink-0 shadow-lg"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Counter + dot indicators */}
            <div className="shrink-0 mt-3 flex items-center gap-4">
              <span className="text-slate-600 text-xs font-mono">{pad(selectedCertIndex + 1)}</span>
              <div className="flex items-center gap-1.5">
                {filteredCerts.slice(0, 9).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedCertIndex(i)}
                    className={`rounded-full transition-all duration-300 ${
                      i === selectedCertIndex
                        ? 'w-5 h-1.5 bg-indigo-400'
                        : 'w-1.5 h-1.5 bg-slate-700 hover:bg-slate-500'
                    }`}
                  />
                ))}
                {filteredCerts.length > 9 && (
                  <span className="text-slate-700 text-xs ml-1">···</span>
                )}
              </div>
              <span className="text-slate-600 text-xs font-mono">{pad(filteredCerts.length)}</span>
            </div>

            {/* Expand button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="shrink-0 mt-2 flex items-center gap-1.5 text-[10px] text-slate-500 hover:text-slate-300 transition-colors uppercase tracking-widest"
            >
              <Maximize2 size={10} /> Expand Fullscreen
            </button>
          </div>

          {/* RIGHT — Info panel */}
          <aside
            data-lenis-prevent="true"
            className="col-span-3 xl:col-span-3 border-l border-slate-800/50 flex flex-col p-5 lg:p-6 overflow-y-auto"
          >
            {selectedCert && (
              <>
                {/* Category badge */}
                <div className="flex items-center gap-3 mb-4 shrink-0">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-300 border border-indigo-800/60 bg-indigo-950/60 px-2.5 py-1 rounded-full">
                    {selectedCert.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-white leading-snug mb-5 shrink-0">
                  {selectedCert.title}
                </h3>

                {/* Details */}
                <div className="flex-1 space-y-4 min-h-0">
                  <div className="border-b border-slate-800/50 pb-3">
                    <span className="text-[9px] uppercase tracking-[0.18em] text-slate-500 block mb-1">
                      Issued by
                    </span>
                    <span className="text-xs text-slate-200 font-medium flex items-center gap-2">
                      <Building2 size={13} className="text-indigo-400 shrink-0" />
                      {selectedCert.issuer}
                    </span>
                  </div>

                  <div className="border-b border-slate-800/50 pb-3">
                    <span className="text-[9px] uppercase tracking-[0.18em] text-slate-500 block mb-1">
                      Issue Date
                    </span>
                    <span className="text-xs text-slate-200 font-medium flex items-center gap-2">
                      <Calendar size={13} className="text-indigo-400 shrink-0" />
                      {selectedCert.date}
                    </span>
                  </div>

                  <div className="border-b border-slate-800/50 pb-3">
                    <span className="text-[9px] uppercase tracking-[0.18em] text-slate-500 block mb-1">
                      Credential Type
                    </span>
                    <span className="text-xs text-slate-200 font-medium flex items-center gap-2">
                      <Tag size={13} className="text-indigo-400 shrink-0" />
                      {selectedCert.category}
                    </span>
                  </div>

                  <div>
                    <span className="text-[9px] uppercase tracking-[0.18em] text-slate-500 block mb-1">
                      Status
                    </span>
                    <span className="text-xs text-emerald-400 font-medium flex items-center gap-2">
                      <ShieldCheck size={14} className="text-emerald-500 shrink-0" />
                      Verified Credential
                    </span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="shrink-0 mt-5 space-y-2">
                  {selectedCert.verifyUrl && (
                    <a
                      href={selectedCert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 text-xs font-semibold py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-md"
                    >
                      <ExternalLink size={13} />
                      Verify Authenticity
                    </a>
                  )}
                  <a
                    href={selectedCert.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 text-xs font-medium py-2 px-4 rounded-xl border border-slate-700/50 text-slate-400 hover:text-white hover:border-slate-600 bg-slate-800/30 hover:bg-slate-800/60 transition-colors"
                  >
                    <FileText size={13} />
                    Open Document
                  </a>
                </div>
              </>
            )}
          </aside>
        </div>

        {/* ── BOTTOM CATEGORY FILTER BAR ───────────────────────────────────── */}
        <div className="shrink-0 border-t border-slate-800/50 py-2.5 px-6 lg:px-10 bg-slate-950/90 backdrop-blur">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
            <span className="text-[9px] uppercase tracking-[0.2em] text-slate-600 mr-4 shrink-0">
              Categories
            </span>
            <div className="flex items-end gap-1 sm:gap-2">
              {categories.map((cat) => {
                const isActive = activeFilter === cat;
                const count = cat === 'All' ? CERTIFICATIONS.length : CERTIFICATIONS.filter(c => c.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => handleFilterChange(cat)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg shrink-0 transition-all text-xs font-semibold ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-indigo-800 text-white' : 'bg-slate-800 text-slate-500'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── FULLSCREEN MODAL ─────────────────────────────────────────────────── */}
      {isModalOpen && selectedCert && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-md"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full max-w-6xl h-[92vh] bg-slate-900 border border-slate-800 rounded-2xl flex flex-col overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800 bg-slate-950 shrink-0">
              <div className="flex items-center gap-2 min-w-0">
                <Award size={15} className="text-indigo-400 shrink-0" />
                <span className="text-sm font-semibold text-white truncate">{selectedCert.title}</span>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-500 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors shrink-0"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 bg-slate-950 overflow-hidden flex items-center justify-center p-2">
              {isImage(selectedCert.pdf) ? (
                <img
                  src={selectedCert.pdf}
                  alt={selectedCert.title}
                  className="max-h-full max-w-full object-contain rounded"
                />
              ) : (
                <iframe
                  src={`${selectedCert.pdf}#toolbar=1`}
                  className="w-full h-full border-0 rounded bg-white"
                  title={selectedCert.title}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
