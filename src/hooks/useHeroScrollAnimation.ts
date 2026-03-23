import { useEffect, useRef } from 'react';

export function useHeroScrollAnimation() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Hero fades OUT as you scroll down
      const scrollProgress = Math.min(scrollY / windowHeight, 1);
      const opacity = Math.max(1 - scrollProgress * 1.5, 0);
      heroRef.current.style.opacity = opacity.toString();
      
      // Slight parallax effect - hero moves up slower than scroll
      const translateY = scrollY * 0.3;
      heroRef.current.style.transform = `translateY(${translateY}px)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return heroRef;
}
