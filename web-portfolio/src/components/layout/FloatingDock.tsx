import { useState } from 'react';
import { Sparkles, User, FolderGit, Cpu, Mail } from 'lucide-react';

interface FloatingDockProps {
  activeSection: string;
  scrollToSection: (id: string) => void;
}

export default function FloatingDock({ activeSection, scrollToSection }: FloatingDockProps) {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  const sections = ['hero', 'about', 'projects', 'skills', 'contact'];

  return (
    <div 
      className="fixed z-50 left-1/2 -translate-x-1/2 bottom-6 md:left-auto md:translate-x-0 md:bottom-auto md:right-8 md:top-1/2 md:-translate-y-1/2"
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
        className="absolute inset-0 pointer-events-none flex items-center justify-center transition-all duration-300 flex-row py-2.5 px-4 gap-2 md:flex-col md:py-5 md:px-2.5 md:gap-3"
        style={{ filter: 'url(#liquid-goo)' }}
      >
        {/* Main Dock Backdrop */}
        <div className="absolute inset-0 bg-slate-900/95 dark:bg-slate-950/95 shadow-2xl rounded-full" />
        
        {/* Droplet Background Bubbles (one behind each item, sliding out on hover/active) */}
        {sections.map((item) => {
          const isHovered = hoveredSection === item;
          const isActive = activeSection === item;
          const showDroplet = isHovered || isActive;
          
          return (
            <div 
              key={`bg-${item}`}
              className="w-10 h-10 flex items-center justify-center relative"
            >
              {/* The merging droplet background bubble */}
              <div 
                className={`absolute h-10 rounded-full transition-all duration-500 ease-out ${
                  showDroplet 
                    ? 'bg-slate-900/95 dark:bg-slate-950/95 w-24 scale-105 translate-y-[-56px] md:translate-y-0 md:translate-x-[-68px]' 
                    : 'bg-transparent w-10 scale-90 translate-y-0 md:translate-x-0'
                }`}
              />
            </div>
          );
        })}
      </div>

      {/* LAYER 2: Interactive Buttons and Icons (No filter, crisp rendering) */}
      <div className="relative flex items-center transition-all duration-300 flex-row py-2.5 px-4 gap-2 md:flex-col md:py-5 md:px-2.5 md:gap-3">
        {sections.map((item) => {
          const isHovered = hoveredSection === item;
          const isActive = activeSection === item;
          
          return (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              onMouseEnter={() => setHoveredSection(item)}
              className="relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 cursor-pointer"
              aria-label={`Scroll to ${item}`}
            >
              {/* Icon wrapper to handle color state */}
              <span className={`transition-all duration-300 z-10 ${isActive || isHovered ? 'text-indigo-400 dark:text-indigo-400 scale-110' : 'text-slate-400 dark:text-slate-500'}`}>
                {item === 'hero' && <Sparkles size={16} />}
                {item === 'about' && <User size={16} />}
                {item === 'projects' && <FolderGit size={16} />}
                {item === 'skills' && <Cpu size={16} />}
                {item === 'contact' && <Mail size={16} />}
              </span>

              {/* Text Label inside the droplet (crisp and positioned over the background bubble) */}
              <span 
                className={`absolute z-20 pointer-events-none capitalize text-[10px] font-bold tracking-wide text-white transition-all duration-500 ease-out whitespace-nowrap ${
                  isActive || isHovered
                    ? 'opacity-100 scale-100 translate-y-[-56px] md:translate-y-0 md:translate-x-[-68px]'
                    : 'opacity-0 scale-75 translate-y-0 md:translate-x-0'
                }`}
              >
                {item}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
