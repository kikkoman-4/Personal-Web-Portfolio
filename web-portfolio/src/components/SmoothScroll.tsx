import React, { createContext, useContext, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

interface LenisContextValue {
  lenis: Lenis | null;
}

const LenisContext = createContext<LenisContextValue>({ lenis: null });

export const useLenis = () => {
  const context = useContext(LenisContext);
  if (!context) {
    throw new Error('useLenis must be used within a SmoothScrollProvider');
  }
  return context.lenis;
};

interface SmoothScrollProps {
  children: React.ReactNode;
}

export const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Instantiate Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brc1gd42qi
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Synchronize Lenis scroll with GSAP's ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Tell GSAP to use Lenis's requestAnimationFrame pipeline
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Disable lag smoothing in GSAP to prevent synchronization jitter
    gsap.ticker.lagSmoothing(0);

    return () => {
      // Clean up on unmount
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
      lenisRef.current = null;
    };
  }, []);

  return (
    <LenisContext.Provider value={{ lenis: lenisRef.current }}>
      {children}
    </LenisContext.Provider>
  );
};
