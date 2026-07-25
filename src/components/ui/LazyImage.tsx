import { useState, useRef, useEffect } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
}

/**
 * LazyImage — intersection-observer lazy load + blank skeleton placeholder.
 * - Shows a blank muted background until the image fully loads.
 * - Only starts fetching once the element enters the viewport.
 * - Fades the image in smoothly on load.
 * - Falls back to the blank background on error (no broken-image icon).
 */
export default function LazyImage({ src, alt, className = '', containerClassName = '' }: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const [errored, setErrored] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer — only load once visible
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' } // start loading 200px before entering viewport
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${containerClassName}`}>
      {/* Blank skeleton placeholder — visible until image loads */}
      <div
        className={`absolute inset-0 bg-slate-200 dark:bg-slate-800 transition-opacity duration-500 ${
          loaded && !errored ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      />

      {/* Actual image — only mounted when in view */}
      {inView && !errored && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={`relative w-full h-full transition-opacity duration-500 ${
            loaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
        />
      )}
    </div>
  );
}
