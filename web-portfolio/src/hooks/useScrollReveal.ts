import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface ScrollRevealOptions {
  animation?: gsap.TweenVars;
  triggerHook?: string; // e.g., 'top 80%', 'top center'
  scrub?: boolean | number;
  once?: boolean;
}

/**
 * Custom hook to easily add scroll-reveal animations to components.
 * 
 * @param options configuration options for the GSAP scroll animation.
 * @returns a useRef object that should be attached to the target element.
 */
export const useScrollReveal = <T extends HTMLElement = HTMLDivElement>(
  options: ScrollRevealOptions = {}
) => {
  const elementRef = useRef<T | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const {
      animation = { opacity: 0, y: 30, duration: 1 },
      triggerHook = 'top 85%',
      scrub = false,
      once = true,
    } = options;

    const ctx = gsap.context(() => {
      gsap.from(element, {
        ...animation,
        scrollTrigger: {
          trigger: element,
          start: triggerHook,
          scrub: scrub,
          once: once,
          toggleActions: once ? 'play none none none' : 'play reverse play reverse',
        },
      });
    });

    return () => ctx.revert();
  }, [options]);

  return elementRef;
};
