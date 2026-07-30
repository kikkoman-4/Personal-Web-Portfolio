import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Sparkles, User, FolderGit, Calendar, Award, Mail } from 'lucide-react';

interface FloatingDockProps {
  activeSection: string;
  scrollToSection: (id: string) => void;
}

export default function FloatingDock({ activeSection, scrollToSection }: FloatingDockProps) {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [isIdle, setIsIdle] = useState(false);
  const [mounted, setMounted] = useState(false);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sections = ['hero', 'about', 'projects', 'events', 'certifications', 'contact'];

  const sectionLabels: Record<string, string> = {
    hero: 'Home',
    about: 'About',
    projects: 'Projects',
    events: 'Events',
    certifications: 'Certs',
    contact: 'Contact',
  };

  // Short display labels — keeps bubble from overflowing on long names
  const navLabels: Record<string, string> = {
    hero: 'hero',
    about: 'about',
    projects: 'projects',
    events: 'events',
    certifications: 'certs',
    contact: 'contact',
  };

  // Idle timer logic: hide navbar section title after 2.5s of inactivity
  useEffect(() => {
    const resetIdleTimer = () => {
      setIsIdle(false);
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
      idleTimerRef.current = setTimeout(() => {
        setIsIdle(true);
      }, 2500);
    };

    // Trigger timer on section change or initial render
    resetIdleTimer();

    const handleActivity = () => {
      resetIdleTimer();
    };

    window.addEventListener('scroll', handleActivity, { passive: true });
    window.addEventListener('mousemove', handleActivity, { passive: true });
    window.addEventListener('touchstart', handleActivity, { passive: true });

    return () => {
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
      window.removeEventListener('scroll', handleActivity);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
    };
  }, [activeSection]);

  if (!mounted) return null;

  return createPortal(
    <>
      {/* ── MOBILE STREAMLINED FLOATING DOCK (< 768px) ── */}
      <nav 
        className="fixed z-[9999] bottom-4 inset-x-0 mx-auto w-fit max-w-[95vw] flex md:hidden items-center gap-1.5 bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-2xl border border-slate-800/80 rounded-full px-2.5 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.6)] transition-all duration-300 pointer-events-auto"
        aria-label="Mobile Navigation"
      >
        {sections.map((item) => {
          const isActive = activeSection === item;
          const label = sectionLabels[item] || item;

          return (
            <button
              key={`mobile-${item}`}
              onClick={() => scrollToSection(item)}
              className={`relative flex items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer rounded-full ${
                isActive 
                  ? 'bg-indigo-600/35 text-indigo-300 border border-indigo-500/40 px-3.5 py-1.5 font-semibold text-xs shadow-inner' 
                  : 'text-slate-400 hover:text-white w-9 h-9'
              }`}
              aria-label={`Scroll to ${item}`}
            >
              <span className={isActive ? 'text-indigo-400 shrink-0' : 'shrink-0'}>
                {item === 'hero' && <Sparkles size={17} />}
                {item === 'about' && <User size={17} />}
                {item === 'projects' && <FolderGit size={17} />}
                {item === 'events' && <Calendar size={17} />}
                {item === 'certifications' && <Award size={17} />}
                {item === 'contact' && <Mail size={17} />}
              </span>

              {isActive && (
                <span className="whitespace-nowrap transition-all duration-200">
                  {label}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* ── DESKTOP LIQUID MORPHING DOCK (>= 768px) ── */}
      <div 
        className="hidden md:block fixed z-[9999] right-8 top-1/2 -translate-y-1/2 pointer-events-auto"
        onMouseLeave={() => setHoveredSection(null)}
      >
        {/* SVG Liquid/Gooey Filter Definition */}
        <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }} aria-hidden="true">
          <defs>
            <filter id="liquid-goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
              <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
          </defs>
        </svg>

        {/* LAYER 1: Liquid Morphism Backgrounds (Gooey Filter Applied) */}
        <div 
          className="absolute inset-0 pointer-events-none flex flex-col py-5 px-2.5 gap-3 items-center justify-center transition-all duration-300"
          style={{ filter: 'url(#liquid-goo)' }}
        >
          {/* Main Dock Backdrop */}
          <div className="absolute inset-0 bg-slate-900/95 dark:bg-slate-950/95 shadow-2xl rounded-full" />
          
          {/* Droplet Background Bubbles */}
          {sections.map((item) => {
            const isHovered = hoveredSection === item;
            const isActive = activeSection === item;
            const showDroplet = isHovered || (isActive && !isIdle);
            
            return (
              <div 
                key={`bg-${item}`}
                className="w-10 h-10 flex items-center justify-center relative"
              >
                <div 
                  className={`absolute h-10 rounded-full transition-all duration-500 ease-out ${
                    showDroplet 
                      ? 'bg-slate-900/95 dark:bg-slate-950/95 w-24 scale-105 translate-x-[-68px]' 
                      : 'bg-transparent w-10 scale-90 translate-x-0'
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* LAYER 2: Interactive Buttons and Icons */}
        <div className="relative flex flex-col py-5 px-2.5 gap-3 items-center transition-all duration-300">
          {sections.map((item) => {
            const isHovered = hoveredSection === item;
            const isActive = activeSection === item;
            const isSelected = isActive || isHovered;
            const showTitle = isHovered || (isActive && !isIdle);
            
            return (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                onMouseEnter={() => setHoveredSection(item)}
                className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ease-out cursor-pointer ${
                  isSelected ? 'scale-110' : 'scale-100'
                }`}
                aria-label={`Scroll to ${item}`}
              >
                <span className={`transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-10 flex items-center justify-center ${
                  isSelected 
                    ? 'text-indigo-400 dark:text-indigo-400 scale-135 drop-shadow-[0_0_10px_rgba(129,140,248,0.7)]' 
                    : 'text-slate-400 dark:text-slate-500 scale-100 opacity-70 hover:opacity-100'
                }`}>
                  {item === 'hero' && <Sparkles size={18} />}
                  {item === 'about' && <User size={18} />}
                  {item === 'projects' && <FolderGit size={18} />}
                  {item === 'events' && <Calendar size={18} />}
                  {item === 'certifications' && <Award size={18} />}
                  {item === 'contact' && <Mail size={18} />}
                </span>

                <span 
                  className={`absolute z-20 pointer-events-none capitalize text-[10px] font-bold tracking-wide text-white transition-all duration-500 ease-out whitespace-nowrap ${
                    showTitle
                      ? 'opacity-100 scale-100 translate-x-[-68px]'
                      : 'opacity-0 scale-75 translate-x-0'
                  }`}
                >
                  {navLabels[item] ?? item}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </>,
    document.body
  );
}
