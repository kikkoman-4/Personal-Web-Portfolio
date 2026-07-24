import { useState, useMemo } from 'react';
import { Award, ExternalLink, ShieldCheck, FileText, Calendar, Building2, Maximize2, Sparkles, ChevronRight } from 'lucide-react';
import { CERTIFICATIONS_CONTENT, CERTIFICATIONS } from '../../data/portfolioData';
import AnimatedSection from '../ui/AnimatedSection';
import LazyImage from '../ui/LazyImage';

interface Cert {
  title: string;
  issuer: string;
  category: string;
  date: string;
  pdf: string;
  verifyUrl: string;
}

export default function CertificationsSection() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedCertIndex, setSelectedCertIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Derive unique categories
  const categories = useMemo(() => {
    return ['All', ...Array.from(new Set(CERTIFICATIONS.map((c) => c.category)))];
  }, []);

  // Filtered list of certs
  const filteredCerts = useMemo(() => {
    if (activeFilter === 'All') return CERTIFICATIONS as Cert[];
    return CERTIFICATIONS.filter((c) => c.category === activeFilter) as Cert[];
  }, [activeFilter]);

  // Active certificate
  const selectedCert = useMemo(() => {
    return filteredCerts[selectedCertIndex] || filteredCerts[0] || (CERTIFICATIONS[0] as Cert);
  }, [filteredCerts, selectedCertIndex]);

  // Handle filter change
  const handleFilterChange = (cat: string) => {
    setActiveFilter(cat);
    setSelectedCertIndex(0);
  };

  const isImage = (path: string) => Boolean(path.match(/\.(png|jpe?g|webp|gif|svg)$/i));

  return (
    <section id="certifications" className="py-20 scroll-mt-16 w-full text-left snap-start snap-always">
      <div className="px-4 sm:px-6 lg:px-12 2xl:px-20 max-w-[1700px] mx-auto">
        
        {/* ── Section Header ────────────────────────────────────────────── */}
        <AnimatedSection direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-slate-200 dark:border-slate-800/80 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest mb-2 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-md border border-indigo-200 dark:border-indigo-800/50">
                <Award size={14} />
                <span>{CERTIFICATIONS_CONTENT.tagline}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white uppercase">
                {CERTIFICATIONS_CONTENT.title}
              </h2>
            </div>
            <p className="text-slate-600 dark:text-slate-400 max-w-md text-xs sm:text-sm leading-relaxed">
              {CERTIFICATIONS_CONTENT.subtitle}
            </p>
          </div>
        </AnimatedSection>

        {/* ── Filter Bar (Agent Class Selector) ─────────────────────────── */}
        <AnimatedSection direction="up" delay={50}>
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-thin scrollbar-thumb-slate-700">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-2 shrink-0 flex items-center gap-1">
              <Sparkles size={13} className="text-indigo-500" /> Filter:
            </span>
            {categories.map((cat) => {
              const isActive = activeFilter === cat;
              const count = cat === 'All' ? CERTIFICATIONS.length : CERTIFICATIONS.filter(c => c.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => handleFilterChange(cat)}
                  className={`text-xs font-bold px-3.5 py-1.5 rounded-lg border uppercase tracking-wider transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/25 scale-105'
                      : 'border-slate-300 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-400 dark:hover:border-slate-700 bg-white/50 dark:bg-slate-900/50'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-indigo-800 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </AnimatedSection>

        {/* ── Valorant Style Agent Select 3-Column Layout ────────────────── */}
        <AnimatedSection direction="up" delay={100}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white/80 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl backdrop-blur-md">
            
            {/* ── LEFT PANEL: Certificate Roster / Selector Grid ────────── */}
            <div className="lg:col-span-4 xl:col-span-3 flex flex-col h-[400px] lg:h-[680px]">
              <div className="flex items-center justify-between px-2 pb-3 mb-2 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Award size={14} className="text-indigo-500" /> Certificate Roster
                </span>
                <span className="text-[11px] font-semibold text-slate-400">
                  {filteredCerts.length} Available
                </span>
              </div>

              {/* Roster Items List */}
              <div className="flex-1 overflow-y-auto pr-1.5 space-y-2.5 scrollbar-thin scrollbar-thumb-indigo-500/20 hover:scrollbar-thumb-indigo-500/40">
                {filteredCerts.map((cert, idx) => {
                  const isSelected = selectedCert === cert;
                  return (
                    <button
                      key={cert.title + idx}
                      onClick={() => setSelectedCertIndex(idx)}
                      className={`w-full text-left p-3 rounded-xl border transition-all duration-200 group relative flex items-center gap-3 ${
                        isSelected
                          ? 'bg-indigo-600/10 dark:bg-indigo-950/60 border-indigo-500 shadow-md shadow-indigo-500/10 translate-x-1'
                          : 'border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/40 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      {/* Active Indicator Bar */}
                      {isSelected && (
                        <div className="absolute left-0 top-2 bottom-2 w-1 bg-indigo-500 rounded-r-full shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
                      )}

                      {/* Icon */}
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        isSelected 
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' 
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:text-indigo-400'
                      }`}>
                        <FileText size={18} />
                      </div>

                      {/* Info */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1 mb-0.5">
                          <span className={`text-[9px] font-extrabold uppercase tracking-wider truncate px-1.5 py-0.2 rounded ${
                            isSelected ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' : 'text-slate-500 dark:text-slate-400 bg-slate-200/60 dark:bg-slate-800/60'
                          }`}>
                            {cert.category}
                          </span>
                          <span className="text-[10px] text-slate-400 dark:text-slate-500 shrink-0">
                            {cert.date}
                          </span>
                        </div>
                        <h4 className={`text-xs font-bold truncate leading-snug transition-colors ${
                          isSelected ? 'text-indigo-600 dark:text-indigo-300' : 'text-slate-800 dark:text-slate-200 group-hover:text-indigo-500'
                        }`}>
                          {cert.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                          {cert.issuer}
                        </p>
                      </div>

                      <ChevronRight size={14} className={`shrink-0 transition-transform ${isSelected ? 'text-indigo-500 translate-x-0.5' : 'text-slate-400 opacity-0 group-hover:opacity-100'}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── MIDDLE PANEL: Certificate View Display (Center Stage) ── */}
            <div className="lg:col-span-5 xl:col-span-6 flex flex-col h-[500px] lg:h-[680px] bg-slate-950 rounded-xl overflow-hidden border border-slate-800 relative shadow-inner">
              
              {/* Viewer Control Bar */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs text-slate-400 shrink-0">
                <div className="flex items-center gap-2 truncate">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-mono text-emerald-400 text-[11px]">DOCUMENT_VIEWER //</span>
                  <span className="font-bold text-white truncate max-w-[200px] sm:max-w-[300px]">{selectedCert?.title}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {selectedCert?.pdf && (
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="flex items-center gap-1 text-[11px] font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded transition-colors"
                      title="Expand Fullscreen"
                    >
                      <Maximize2 size={12} />
                      <span className="hidden sm:inline">Expand</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Document Container */}
              <div className="flex-1 relative flex items-center justify-center p-2 sm:p-4 bg-slate-950/90 overflow-hidden">
                {selectedCert ? (
                  isImage(selectedCert.pdf) ? (
                    <div className="w-full h-full flex items-center justify-center p-2">
                      <LazyImage
                        src={selectedCert.pdf}
                        alt={selectedCert.title}
                        className="max-h-full max-w-full object-contain rounded shadow-2xl border border-slate-800"
                        containerClassName="w-full h-full flex items-center justify-center"
                      />
                    </div>
                  ) : (
                    <iframe
                      key={selectedCert.pdf}
                      src={`${selectedCert.pdf}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
                      className="w-full h-full border-0 rounded bg-white shadow-2xl"
                      title={selectedCert.title}
                    />
                  )
                ) : (
                  <div className="flex flex-col items-center justify-center gap-3 text-slate-600">
                    <FileText size={48} strokeWidth={1} />
                    <p className="text-xs uppercase tracking-widest">No Document Selected</p>
                  </div>
                )}
              </div>
            </div>

            {/* ── RIGHT PANEL: Agent / Certificate Tactical Info Card ─── */}
            <div className="lg:col-span-3 flex flex-col justify-between h-auto lg:h-[680px] p-4 bg-slate-900/60 rounded-xl border border-slate-800">
              
              {/* Info Header */}
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-400 bg-indigo-950/80 px-2.5 py-1 rounded border border-indigo-800/60">
                    {selectedCert?.category}
                  </span>
                  <h3 className="text-xl font-black text-white uppercase tracking-tight mt-3 leading-snug">
                    {selectedCert?.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-400 mt-1 flex items-center gap-1.5">
                    <Building2 size={13} className="text-indigo-400" />
                    {selectedCert?.issuer}
                  </p>
                </div>

                <div className="border-t border-slate-800 pt-4 space-y-3">
                  <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800/80">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                      ISSUE DATE
                    </span>
                    <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                      <Calendar size={13} className="text-indigo-400" />
                      {selectedCert?.date}
                    </span>
                  </div>

                  <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800/80">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                      STATUS
                    </span>
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                      <ShieldCheck size={14} />
                      AUTHENTICATED CREDENTIAL
                    </span>
                  </div>

                  <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800/80">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                      FILE SPECIFICATION
                    </span>
                    <span className="text-xs font-mono text-slate-300 truncate block">
                      {selectedCert?.pdf.split('/').pop()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-4 border-t border-slate-800 mt-4 lg:mt-0">
                {selectedCert?.verifyUrl && (
                  <a
                    href={selectedCert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 text-xs font-extrabold uppercase tracking-wider py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-lg shadow-indigo-600/30 hover:scale-[1.02]"
                  >
                    <ExternalLink size={14} />
                    Verify Authenticity
                  </a>
                )}
                
                <a
                  href={selectedCert?.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 text-xs font-extrabold uppercase tracking-wider py-2.5 px-4 rounded-xl border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 bg-slate-800/60 hover:bg-slate-800 transition-all"
                >
                  <FileText size={14} />
                  Open Raw Document
                </a>
              </div>

            </div>

          </div>
        </AnimatedSection>

      </div>

      {/* ── Modal for Full Screen View ─────────────────────────────────── */}
      {isModalOpen && selectedCert && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full max-w-6xl h-[90vh] bg-slate-900 border border-slate-800 rounded-2xl flex flex-col overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800 bg-slate-950">
              <div className="flex items-center gap-2 truncate">
                <Award size={16} className="text-indigo-400 shrink-0" />
                <span className="text-sm font-bold text-white truncate">{selectedCert.title}</span>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 p-2 bg-slate-950 overflow-hidden flex items-center justify-center">
              {isImage(selectedCert.pdf) ? (
                <img src={selectedCert.pdf} alt={selectedCert.title} className="max-h-full max-w-full object-contain rounded" />
              ) : (
                <iframe src={`${selectedCert.pdf}#toolbar=1`} className="w-full h-full border-0 rounded bg-white" title={selectedCert.title} />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
