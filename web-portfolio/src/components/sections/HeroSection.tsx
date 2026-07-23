import { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Mail, ChevronDown } from 'lucide-react';
import { HERO_CONTENT } from '../../data/portfolioData';

interface HeroSectionProps {
  scrollToSection: (id: string) => void;
}

export default function HeroSection({ scrollToSection }: HeroSectionProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate smooth card slide-up displacement on scroll
  const translateY = Math.min(scrollY * 0.35, 250);
  const opacity = Math.max(1 - scrollY / 500, 0);

  return (
    <section 
      id="hero" 
      className="relative z-20 w-full min-h-[calc(100vh-20px)] flex flex-col justify-center items-center text-center px-6 py-20 bg-slate-900 text-white rounded-b-[40px] md:rounded-b-[64px] shadow-2xl border-b border-slate-800/80 transition-transform duration-75 ease-out"
      style={{
        transform: `translate3d(0, -${translateY}px, 0)`,
      }}
    >
      {/* Card subtle background grid pattern & radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none rounded-b-[40px] md:rounded-b-[64px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />

      <div 
        className="relative z-10 max-w-4xl mx-auto flex flex-col items-center transition-opacity duration-150"
        style={{ opacity }}
      >
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-800/50 text-indigo-300 text-xs font-semibold mb-8 shadow-inner animate-pulse">
          <Sparkles size={14} />
          <span>{HERO_CONTENT.badge}</span>
        </div>

        <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
          {HERO_CONTENT.name} <br className="hidden md:inline" />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">{HERO_CONTENT.title}</span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed">
          {HERO_CONTENT.subtitle}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-xs sm:max-w-none">
          <button 
            onClick={() => scrollToSection('projects')}
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-7 py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer group shadow-lg shadow-indigo-600/30 hover:scale-105 active:scale-95"
          >
            <span>{HERO_CONTENT.ctaPrimary}</span>
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="w-full sm:w-auto bg-slate-800/90 hover:bg-slate-700 text-slate-200 font-semibold px-7 py-3.5 rounded-xl flex items-center justify-center gap-2 border border-slate-700/80 transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-md"
          >
            <Mail size={16} />
            <span>{HERO_CONTENT.ctaSecondary}</span>
          </button>
        </div>
      </div>

      {/* Scroll indicator prompt */}
      <div 
        onClick={() => scrollToSection('about')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer animate-bounce z-10"
        style={{ opacity }}
      >
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Scroll down</span>
        <ChevronDown size={18} />
      </div>
    </section>
  );
}
