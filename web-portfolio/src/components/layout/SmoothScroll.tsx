import React, { createContext, useContext, useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

export const SmoothScroll: React.FC<SmoothScrollProps> = ({
  children,
  snapSections = [],
}) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    // ── Lenis setup ───────────────────────────────────────────────────────
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    setLenis(lenisInstance);

    lenisInstance.on('scroll', ScrollTrigger.update);

    const updateTicker = (time: number) => lenisInstance.raf(time * 1000);
    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // ── Section snapping via wheel+RAF (bypasses Lenis event API entirely) ─
    let snapping = false;
    let wheelTimer: ReturnType<typeof setTimeout> | null = null;
    let rafId: number | null = null;

    const checkSnap = () => {
      if (snapping || snapSections.length === 0) return;
      const vh = window.innerHeight;

      for (const id of snapSections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;

        // Snap when section header is within top 45% of viewport but not yet locked (>10px)
        if (top > 10 && top < vh * 0.45) {
          snapping = true;
          lenisInstance.scrollTo(el, {
            offset: -20,
            duration: 0.75,
            easing: (t: number) => 1 - Math.pow(1 - t, 3),
            onComplete: () => {
              setTimeout(() => { snapping = false; }, 400);
            },
          });
          return;
        }
      }
    };

    // Poll window.scrollY via RAF until it is stable (Lenis finished animating)
    const waitForSettle = () => {
      if (rafId) cancelAnimationFrame(rafId);
      let prev = window.scrollY;
      let stableFrames = 0;

      const tick = () => {
        const curr = window.scrollY;
        if (Math.abs(curr - prev) < 0.5) {
          stableFrames++;
          if (stableFrames >= 6) {   // ~100ms at 60fps — Lenis has finished
            checkSnap();
            return;
          }
        } else {
          stableFrames = 0;
        }
        prev = curr;
        rafId = requestAnimationFrame(tick);
      };

      rafId = requestAnimationFrame(tick);
    };

    // Kick off settle-wait 100ms after the last wheel event fires
    const onWheel = () => {
      if (snapping) return;
      if (wheelTimer) clearTimeout(wheelTimer);
      wheelTimer = setTimeout(waitForSettle, 100);
    };

    if (snapSections.length > 0) {
      window.addEventListener('wheel', onWheel, { passive: true });
    }

    return () => {
      if (wheelTimer) clearTimeout(wheelTimer);
      if (rafId) cancelAnimationFrame(rafId);
      if (snapSections.length > 0) {
        window.removeEventListener('wheel', onWheel);
      }
      lenisInstance.off('scroll', ScrollTrigger.update);
      lenisInstance.destroy();
      gsap.ticker.remove(updateTicker);
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
