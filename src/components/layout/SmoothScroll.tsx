import React, { createContext, useContext, useEffect, useState } from 'react';
import Lenis from 'lenis';
import Snap from 'lenis/snap';
import gsap from 'gsap';
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
  /** Section element IDs that should snap to the top of the viewport */
  snapSections?: string[];
}

export const SmoothScroll: React.FC<SmoothScrollProps> = ({
  children,
  snapSections = [],
}) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    // Disable smooth scroll library on mobile devices to preserve native touch scroll physics & performance
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    if (isMobile) {
      return;
    }

    // ── Lenis (matching reference: autoRaf: false, lerp: 0.08) ────────────
    const lenisInstance = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
      autoRaf: false,
    });

    setLenis(lenisInstance);
    (window as any).lenis = lenisInstance;

    // ── GSAP ticker drives Lenis ──────────────────────────────────────────
    const updateTicker = (time: number) => lenisInstance.raf(time * 1000);
    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // ── Sync ScrollTrigger ────────────────────────────────────────────────
    lenisInstance.on('scroll', () => ScrollTrigger.update());

    // ── Lenis Snap plugin (lenis/snap) ────────────────────────────────────
    // Must initialise AFTER sections are in the DOM
    let snapInstance: Snap | null = null;
    let removeSnapFns: Array<() => void> = [];

    const initSnap = () => {
      if (snapSections.length === 0) return;

      snapInstance = new Snap(lenisInstance, {
        type: 'proximity',
        distanceThreshold: '25%',
        debounce: 300,
        duration: 0.8,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
      });

      snapSections.forEach((id) => {
        const el = document.getElementById(id);
        if (el && snapInstance) {
          const remove = snapInstance.addElement(el, { align: ['start'] });
          removeSnapFns.push(remove);
        }
      });
    };

    // Wait 300ms for sections to fully mount/measure
    const snapTimer = setTimeout(initSnap, 300);

    // Force ScrollTrigger refresh after layout
    const refreshTimer = setTimeout(() => {
      if (document?.body) ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(snapTimer);
      clearTimeout(refreshTimer);
      removeSnapFns.forEach((fn) => fn());
      snapInstance?.destroy();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      lenisInstance.destroy();
      gsap.ticker.remove(updateTicker);
      delete (window as any).lenis;
      setLenis(null);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snapSections.join(',')]);

  return (
    <LenisContext.Provider value={{ lenis }}>
      {children}
    </LenisContext.Provider>
  );
};
