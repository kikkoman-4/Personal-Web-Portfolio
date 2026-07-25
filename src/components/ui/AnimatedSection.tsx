import { useEffect, useRef, useState, type ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'zoom';
  className?: string;
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
}

export default function AnimatedSection({
  children,
  direction = 'up',
  className = '',
  delay = 0,
  duration = 700,
  threshold = 0.12,
  once = true,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(node);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold, once]);

  const getAnimationStyles = () => {
    if (isVisible) {
      return 'opacity-100 translate-x-0 translate-y-0 scale-100 blur-none';
    }

    switch (direction) {
      case 'left':
        return 'opacity-0 -translate-x-14 translate-y-0 scale-95 blur-sm';
      case 'right':
        return 'opacity-0 translate-x-14 translate-y-0 scale-95 blur-sm';
      case 'down':
        return 'opacity-0 translate-x-0 -translate-y-14 scale-95 blur-sm';
      case 'zoom':
        return 'opacity-0 translate-x-0 translate-y-0 scale-90 blur-sm';
      case 'fade':
        return 'opacity-0 translate-x-0 translate-y-0 scale-100 blur-sm';
      case 'up':
      default:
        return 'opacity-0 translate-x-0 translate-y-14 scale-95 blur-sm';
    }
  };

  return (
    <div
      ref={ref}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
      className={`transition-all ease-out transform-gpu ${getAnimationStyles()} ${className}`}
    >
      {children}
    </div>
  );
}

