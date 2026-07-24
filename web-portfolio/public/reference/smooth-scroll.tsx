"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Disable restoration as early as possible (before React mount)
if (typeof window !== "undefined") {
  history.scrollRestoration = 'manual';
  gsap.registerPlugin(ScrollTrigger);
  // Clear any existing GSAP scroll memory
  ScrollTrigger.clearScrollMemory('manual');
  
  // Store original refresh to add cleanup
  const originalRefresh = ScrollTrigger.refresh;
  ScrollTrigger.refresh = function(...args: [safe?: boolean]) {
    // Only refresh if document is still valid
    if (document && document.body) {
      return originalRefresh.apply(this, args);
    }
  };
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initial hard reset to top
    window.scrollTo(0, 0);

    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    // Skip Lenis on mobile — native scroll + CSS scroll-snap is more reliable
    if (isMobile) {
      const refreshTimer = setTimeout(() => {
        ScrollTrigger.refresh();
        window.scrollTo(0, 0);
      }, 100);
      return () => clearTimeout(refreshTimer);
    }

    // Initialize Lenis with autoRaf disabled (desktop only)
    lenisRef.current = new Lenis({
      lerp: 0.08,           // slightly snappier lerp so sections feel decisive
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
      autoRaf: false,
      // Snap to elements that have [data-lenis-snap-start] or [data-snap]
      // duration controls how long the snap animation takes
      // @ts-ignore — snap is supported in Lenis ≥1.1 but types may lag
      snap: {
        type: "mandatory",
        duration: 0.9,
        easing: (t: number) => 1 - Math.pow(1 - t, 4), // ease-out quart
      },
    });

    // Reset scroll to top on mount
    lenisRef.current.scrollTo(0, { immediate: true });

    // Force a ScrollTrigger refresh after a small delay to handle layout shifts
    const refreshTimer = setTimeout(() => {
      if (typeof document !== 'undefined' && document.body) {
        ScrollTrigger.refresh();
      }
      window.scrollTo(0, 0);
    }, 100);

    // Expose Lenis instance on window for components to access
    (window as any).lenis = lenisRef.current;
    (window as any).Lenis = lenisRef.current;

    // Drive Lenis RAF loop via GSAP ticker for perfect synchronization
    const updateLenis = (time: number) => {
      if (lenisRef.current) {
        lenisRef.current.raf(time * 1000);
      }
    };
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    // Sync ScrollTrigger with Lenis scroll updates
    lenisRef.current.on('scroll', () => {
      ScrollTrigger.update();
    });

    return () => {
      clearTimeout(refreshTimer);
      // Kill all ScrollTriggers before destroying Lenis to prevent DOM manipulation errors
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.getAll().forEach((st) => st.kill());
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      gsap.ticker.remove(updateLenis);
      delete (window as any).lenis;
      delete (window as any).Lenis;
    };
  }, []);

  return <>{children}</>;
}
