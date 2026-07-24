import { useEffect, useRef } from 'react';
import { useLenis } from '../components/layout/SmoothScroll';

/**
 * Robust section snap hook using native IntersectionObserver + Lenis smooth scroll.
 * Exclusively snaps targeted sections ('certifications', 'contact') into view.
 * 
 * @param sectionIds Array of section element IDs (e.g. ['certifications', 'contact'])
 */
export function useSectionSnap(sectionIds: string[]) {
  const lenis = useLenis();
  const lastSnappedRef = useRef<string | null>(null);
  const isSnappingRef = useRef(false);

  const idsKey = sectionIds.join(',');

  useEffect(() => {
    if (!lenis) return;

    const targets = idsKey.split(',').filter(Boolean);

    // Native IntersectionObserver to detect when section enters snap zone
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isSnappingRef.current) {
            const id = entry.target.id;

            // Only snap if we haven't just snapped to this exact section
            if (lastSnappedRef.current !== id) {
              isSnappingRef.current = true;
              lastSnappedRef.current = id;

              lenis.scrollTo(entry.target as HTMLElement, {
                offset: -20,
                duration: 0.8,
                onComplete: () => {
                  setTimeout(() => {
                    isSnappingRef.current = false;
                  }, 400);
                },
              });
            }
          } else if (!entry.isIntersecting && lastSnappedRef.current === entry.target.id) {
            // Reset state when section leaves the snap band
            lastSnappedRef.current = null;
          }
        });
      },
      {
        root: null,
        // Snap zone: triggers when top of section enters top 10% - 50% of viewport height
        rootMargin: '-10% 0px -50% 0px',
        threshold: 0.01,
      }
    );

    // Observe each target element after DOM mount
    const timer = setTimeout(() => {
      targets.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }, 200);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [lenis, idsKey]);
}
