import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  history.scrollRestoration = 'manual';
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.clearScrollMemory('manual');
}

interface LenisContextValue {
  lenis: Lenis | null;
}

const LenisContext = createContext<LenisContextValue>({ lenis: null });

export const useLenis = () => {
  const context = useContext(LenisContext);
  if (!context) throw new Error('useLenis must be used within SmoothScrollProvider');
  return context.lenis;
};

interface SmoothScrollProps {
  children: React.ReactNode;
  snapSections?: string[];
}

export const SmoothScroll: React.FC<SmoothScrollProps> = ({ children, snapSections = ['certifications'] }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 767px)').matches;

    if (isMobile) {
      const refreshTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
      return () => clearTimeout(refreshTimer);
    }

    // Initialize Lenis
    const lenisInstance = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
      autoRaf: false,
    });

    lenisRef.current = lenisInstance;
    setLenis(lenisInstance);

    (window as any).lenis = lenisInstance;
    (window as any).Lenis = lenisInstance;

    // Sync GSAP ticker with Lenis
    const updateLenis = (time: number) => {
      if (lenisRef.current) {
        lenisRef.current.raf(time * 1000);
      }
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    lenisInstance.on('scroll', () => {
      ScrollTrigger.update();
    });

    // Setup Section Snapping via ScrollTrigger + Lenis scrollTo
    const refreshTimer = setTimeout(() => {
      if (typeof document !== 'undefined' && document.body) {
        ScrollTrigger.refresh();

        const targets = (snapSections.length > 0
          ? snapSections.map((id) => document.getElementById(id))
          : Array.from(document.querySelectorAll('[data-snap]'))
        ).filter((el): el is HTMLElement => el !== null);

        targets.forEach((el) => {
          ScrollTrigger.create({
            trigger: el,
            start: 'top 35%',
            end: 'bottom 65%',
            onEnter: () => {
              lenisInstance.scrollTo(el, { offset: 0, duration: 0.8 });
            },
            onEnterBack: () => {
              lenisInstance.scrollTo(el, { offset: 0, duration: 0.8 });
            },
          });
        });
      }
    }, 150);

    return () => {
      clearTimeout(refreshTimer);
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.getAll().forEach((st) => st.kill());
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      gsap.ticker.remove(updateLenis);
      delete (window as any).lenis;
      delete (window as any).Lenis;
      setLenis(null);
    };
  }, [snapSections]);

  return (
    <LenisContext.Provider value={{ lenis }}>
      {children}
    </LenisContext.Provider>
  );
};
