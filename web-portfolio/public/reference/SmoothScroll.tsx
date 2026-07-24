"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis but disabled for scroll snapping to work
    // Can be enabled programmatically for specific animations
    lenisRef.current = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
      autoRaf: false, // Disable auto RAF to prevent scroll hijacking
      // @ts-ignore - 'snap' might not be in the current type definitions but is supported in recent Lenis versions
      snap: true, // Enable Lenis snapping
    });

    // Expose Lenis instance on window for components to access
    (window as any).lenis = lenisRef.current;
    (window as any).Lenis = lenisRef.current; // Both cases for compatibility

    // Sync GSAP with Lenis scroll (only when needed for animations)
    const updateLenis = (time: number) => {
      if (lenisRef.current) {
        lenisRef.current.raf(time * 1000);
      }
    };

    gsap.ticker.add(updateLenis);

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      gsap.ticker.remove(updateLenis);
      // Clean up window reference
      delete (window as any).lenis;
    };
  }, []);

  return <>{children}</>;
}
