import { useState, useMemo, useEffect } from 'react';
import { Award, FileText, Calendar, Building2, Maximize2, ChevronRight, CheckCircle2, Search } from 'lucide-react';
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

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

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
    <section id="certifications" className="h-screen scroll-mt-16 w-full text-left snap-start snap-always relative overflow-hidden flex flex-col">
      {/* Background Ambience */}
      <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none opacity-40 dark:opacity-80 mix-blend-screen" />
      <div className="absolute bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none opacity-40 dark:opacity-80 mix-blend-screen" />

      <div className="px-4 sm:px-6 lg:px-12 max-w-[1600px] mx-auto relative z-10 flex flex-col flex-1 min-h-0 py-6 md:py-8">
        
        {/* ── Section Header ── */}
        <AnimatedSection direction="up">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
            <div className="flex items-center gap-4 min-w-0">
              <div>
                <div className="inline-flex items-center gap-1.5 text-indigo-500 font-semibold uppercase tracking-widest text-xs mb-1">
                  <Award size={14} className="text-indigo-400" />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-blue-400">
                    {CERTIFICATIONS_CONTENT.tagline}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  {CERTIFICATIONS_CONTENT.title}
                </h2>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-1.5 sm:justify-end shrink-0">
              {categories.map((cat) => {
                const isActive = activeFilter === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => handleFilterChange(cat)}
                    className={`text-xs font-medium px-3 py-1.5 rounded-full transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-md shadow-indigo-500/25'
                        : 'bg-white/50 dark:bg-slate-800/50 backdrop-blur-md text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700/50 hover:bg-white dark:hover:bg-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </AnimatedSection>

        {/* ── Premium Unified Glass Window ── */}
        <AnimatedSection direction="up" delay={100} className="flex-1 min-h-0 flex flex-col">
          <div className="flex flex-col lg:flex-row flex-1 min-h-0 bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl border border-slate-200/50 dark:border-slate-700/50 rounded-3xl shadow-2xl overflow-hidden ring-1 ring-white/10">
            
            {/* ── LEFT PANEL: Master List ── */}
            <div className="w-full lg:w-[340px] xl:w-[380px] shrink-0 border-b lg:border-b-0 lg:border-r border-slate-200/50 dark:border-slate-700/50 flex flex-col bg-slate-50/50 dark:bg-slate-950/30 max-h-[45vh] lg:max-h-none">
              
              <div className="px-5 py-4 border-b border-slate-200/50 dark:border-slate-700/50">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center justify-between">
                  <span>Credentials</span>
                  <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-200 dark:border-indigo-500/20">
                    {filteredCerts.length} Verified
                  </span>
                </h3>
              </div>

              <div 
                data-lenis-prevent
                onWheel={(e) => e.stopPropagation()}
                className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-2 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700"
              >
                {filteredCerts.map((cert, idx) => {
                  const isSelected = selectedCert === cert;
                  return (
                    <button
                      key={cert.title + idx}
                      onClick={() => setSelectedCertIndex(idx)}
                      className={`w-full text-left p-4 rounded-2xl transition-all duration-300 group relative flex items-start gap-4 ${
                        isSelected
                          ? 'bg-white dark:bg-slate-800 shadow-sm border-transparent'
                          : 'bg-transparent hover:bg-white/50 dark:hover:bg-slate-800/50 border-transparent hover:shadow-sm'
                      }`}
                    >
                      {/* Selection Indicator Glow */}
                      {isSelected && (
                        <div className="absolute inset-0 border-2 border-indigo-500/30 rounded-2xl pointer-events-none" />
                      )}

                      <div className={`mt-0.5 w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300 ${
                        isSelected 
                          ? 'bg-gradient-to-br from-indigo-500 to-blue-500 text-white shadow-lg shadow-indigo-500/20' 
                          : 'bg-slate-200/50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-500/10 group-hover:text-indigo-500 dark:group-hover:text-indigo-400'
                      }`}>
                        {isSelected ? <CheckCircle2 size={20} strokeWidth={2.5} /> : <Award size={20} />}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h4 className={`text-sm font-bold truncate leading-tight mb-1.5 transition-colors ${
                          isSelected ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white'
                        }`}>
                          {cert.title}
                        </h4>
                        <div className="flex flex-col gap-1 text-xs text-slate-500 dark:text-slate-400">
                          <span className="truncate">{cert.issuer}</span>
                          <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">{cert.date}</span>
                        </div>
                      </div>

                      <ChevronRight 
                        size={18} 
                        className={`shrink-0 mt-2 transition-all duration-300 ${
                          isSelected ? 'text-indigo-500 translate-x-0' : 'text-slate-300 dark:text-slate-600 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'
                        }`} 
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── RIGHT PANEL: Detail Canvas ── */}
            <div className="flex-1 flex flex-col bg-slate-100/50 dark:bg-slate-950/50 relative overflow-hidden">
              
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4 border-b border-slate-200/50 dark:border-slate-700/50 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md z-10 shrink-0">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/50 px-2 py-0.5 rounded-md">
                      {selectedCert?.category}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-1.5 leading-tight">
                    {selectedCert?.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Building2 size={16} className="text-indigo-500/70" />
                      {selectedCert?.issuer}
                    </span>
                    <span className="text-slate-300 dark:text-slate-700">•</span>
                    <span className="flex items-center gap-1.5">
                      <Calendar size={16} className="text-indigo-500/70" />
                      {selectedCert?.date}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <a
                    href={selectedCert?.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 px-5 py-2.5 rounded-xl transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5"
                  >
                    <FileText size={18} />
                    Open Original
                  </a>
                  {selectedCert?.pdf && (
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="p-2.5 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-xl transition-all border border-slate-200 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-500/30 shadow-sm"
                      title="View Fullscreen"
                    >
                      <Maximize2 size={20} />
                    </button>
                  )}
                </div>
              </div>

              {/* Document Stage */}
              <div className="relative w-full p-4 sm:p-6 flex-1 min-h-0 flex items-center justify-center overflow-hidden">
                {selectedCert ? (
                  <div className="w-full aspect-[1.414/1] max-w-5xl relative rounded-xl shadow-2xl ring-1 ring-slate-900/5 dark:ring-white/10 overflow-hidden bg-white group">
                    {/* Hover sheen effect on document frame */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />
                    
                    {isImage(selectedCert.pdf) ? (
                      <LazyImage
                        src={selectedCert.pdf}
                        alt={selectedCert.title}
                        className="w-full h-full object-contain p-4"
                        containerClassName="w-full h-full flex items-center justify-center"
                      />
                    ) : (
                      <iframe
                        key={selectedCert.pdf}
                        src={`${selectedCert.pdf}#toolbar=0&navpanes=0&scrollbar=0&view=Fit`}
                        className="w-full h-full border-0 relative z-0"
                        title={selectedCert.title}
                      />
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-4 text-slate-400">
                    <Search size={48} strokeWidth={1} className="text-slate-300 dark:text-slate-600" />
                    <p className="text-sm font-medium">Select a credential to inspect</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </AnimatedSection>

      </div>

      {/* ── Fullscreen Modal ── */}
      {isModalOpen && selectedCert && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-6 bg-slate-900/90 backdrop-blur-xl transition-all"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full max-w-7xl h-[95vh] bg-white dark:bg-slate-900 rounded-3xl flex flex-col overflow-hidden shadow-2xl ring-1 ring-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-8 py-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white truncate pr-4 flex items-center gap-3">
                <Award size={24} className="text-indigo-500" />
                {selectedCert.title}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-sm font-bold tracking-wide text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors bg-white dark:bg-slate-800 px-4 py-2 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700"
              >
                Close View
              </button>
            </div>
            <div className="flex-1 bg-slate-200 dark:bg-slate-950/50 overflow-hidden flex items-center justify-center p-4 sm:p-8">
              <div className="w-full h-full max-w-6xl aspect-[1.414/1] bg-white rounded-xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800">
                {isImage(selectedCert.pdf) ? (
                  <img src={selectedCert.pdf} alt={selectedCert.title} className="w-full h-full object-contain p-4" />
                ) : (
                  <iframe src={`${selectedCert.pdf}#toolbar=1`} className="w-full h-full border-0" title={selectedCert.title} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
