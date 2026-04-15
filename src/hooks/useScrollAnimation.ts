import { useEffect, useRef, useCallback } from 'react';

interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  staggerDelay?: number;
}

export function useScrollAnimation(options: ScrollAnimationOptions = {}) {
  const {
    threshold = 0.08,
    rootMargin = '0px 0px -80px 0px',
    staggerDelay = 0
  } = options;

  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Set initial state
    element.style.opacity = '0';
    element.style.transform = 'translateY(55px) scale(0.92)';
    element.style.filter = 'blur(8px)';
    element.style.transition = `opacity 0.75s cubic-bezier(0.34, 1.4, 0.64, 1) ${staggerDelay}s, transform 0.75s cubic-bezier(0.34, 1.4, 0.64, 1) ${staggerDelay}s, filter 0.6s ease-out ${staggerDelay}s`;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.style.opacity = '1';
            target.style.transform = 'translateY(0)';
            target.style.filter = 'blur(0)';
            observer.unobserve(target);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, staggerDelay]);

  return elementRef;
}

// Hook for multiple elements with stagger effect
export function useStaggeredScrollAnimation(count: number, baseDelay = 0.1) {
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const elements = refs.current.filter(Boolean) as HTMLElement[];
    
    elements.forEach((element, index) => {
      const delay = index * baseDelay;
      element.style.opacity = '0';
      element.style.transform = 'translateY(55px) scale(0.88)';
      element.style.filter = 'blur(8px)';
      element.style.transition = `opacity 0.7s cubic-bezier(0.34, 1.4, 0.64, 1) ${delay}s, transform 0.7s cubic-bezier(0.34, 1.4, 0.64, 1) ${delay}s, filter 0.6s ease-out ${delay}s`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.style.opacity = '1';
            target.style.transform = 'translateY(0) scale(1)';
            target.style.filter = 'blur(0)';
            observer.unobserve(target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [count, baseDelay]);

  const setRef = useCallback((index: number) => (el: HTMLElement | null) => {
    refs.current[index] = el;
  }, []);

  return setRef;
}

// Section fade-in that triggers as hero fades out
export function useSectionScrollAnimation(sectionIndex = 0) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      const scrollProgress = Math.min(scrollY / windowHeight, 1);
      const delay = sectionIndex * 0.15;
      const sectionProgress = Math.max(scrollProgress - delay, 0);
      
      const opacity = Math.min(sectionProgress * 2, 1);
      const translateY = Math.max(30 - sectionProgress * 60, 0);
      
      section.style.opacity = opacity.toString();
      section.style.transform = `translateY(${translateY}px)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIndex]);

  return sectionRef;
}

// Individual element animation hook for granular control
export function useElementAnimation(delay = 0) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.opacity = '0';
    el.style.transform = 'translateY(40px) scale(0.94)';
    el.style.filter = 'blur(6px)';
    el.style.transition = `opacity 0.7s cubic-bezier(0.34, 1.4, 0.64, 1) ${delay}s, transform 0.7s cubic-bezier(0.34, 1.4, 0.64, 1) ${delay}s, filter 0.6s ease-out ${delay}s`;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.style.opacity = '1';
            target.style.transform = 'translateY(0)';
            target.style.filter = 'blur(0)';
            observer.unobserve(target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return ref;
}
