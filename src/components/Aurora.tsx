import { useRef, useEffect } from 'react';

interface AuroraProps {
  scrollY?: number;
  className?: string;
  intensity?: 'full' | 'subtle';
  variant?: 'default' | 'emerald' | 'sunset' | 'cosmic' | 'ocean';
  isDark?: boolean;
}

export function Aurora({ 
  scrollY = 0, 
  className = '', 
  intensity = 'full',
  variant = 'default',
}: AuroraProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const timeRef = useRef(0);
  const isDarkRef = useRef(false);

  const isSubtle = intensity === 'subtle';

  // Track dark mode
  useEffect(() => {
    const checkDark = () => {
      isDarkRef.current = document.documentElement.classList.contains('dark');
    };
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);



  // Dramatically different variant configurations
  const variantConfig = {
    default: {
      speed: 0.008,
      waveCount: 4,
      colors: {
        primary: { r: 139, g: 63, b: 217 },
        secondary: { r: 168, g: 85, b: 247 },
        accent: { r: 192, g: 132, b: 252 },
      },
    },
    emerald: {
      speed: 0.006,
      waveCount: 5,
      colors: {
        primary: { r: 16, g: 185, b: 129 },
        secondary: { r: 20, g: 184, b: 166 },
        accent: { r: 52, g: 211, b: 153 },
      },
    },
    sunset: {
      speed: 0.004,
      waveCount: 3,
      colors: {
        primary: { r: 249, g: 115, b: 22 },
        secondary: { r: 239, g: 68, b: 68 },
        accent: { r: 251, g: 191, b: 36 },
      },
    },
    cosmic: {
      speed: 0.01,
      waveCount: 6,
      colors: {
        primary: { r: 139, g: 92, b: 246 },
        secondary: { r: 236, g: 72, b: 153 },
        accent: { r: 168, g: 85, b: 247 },
      },
    },
    ocean: {
      speed: 0.005,
      waveCount: 4,
      colors: {
        primary: { r: 14, g: 165, b: 233 },
        secondary: { r: 6, g: 182, b: 212 },
        accent: { r: 56, g: 189, b: 248 },
      },
    },
  };

  const config = variantConfig[variant];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      timeRef.current += config.speed;
      const t = timeRef.current;
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Opacity multiplier for subtle mode
      const opacityMult = isSubtle ? 0.3 : 1;

      // Clear with theme-aware background
      ctx.fillStyle = isDarkRef.current ? '#000000' : '#faf8f5';
      ctx.fillRect(0, 0, width, height);

      const { primary, secondary, accent } = config.colors;

      // Large ambient glow zones - spread across entire canvas
      const drawAmbientGlow = (
        cx: number, 
        cy: number, 
        radius: number, 
        color: { r: number; g: number; b: number }, 
        alpha: number,
        pulseSpeed: number = 1
      ) => {
        const pulse = 0.8 + Math.sin(t * pulseSpeed) * 0.2;
        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * pulse);
        gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha * opacityMult})`);
        gradient.addColorStop(0.3, `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha * 0.5 * opacityMult})`);
        gradient.addColorStop(0.6, `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha * 0.2 * opacityMult})`);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      };

      // Main ambient glow zones - creates the overall hue
      drawAmbientGlow(width * 0.3, height * 0.4, width * 0.8, primary, 0.25, 0.5);
      drawAmbientGlow(width * 0.7, height * 0.6, width * 0.7, secondary, 0.2, 0.7);
      drawAmbientGlow(width * 0.5, height * 0.3, width * 0.6, accent, 0.15, 0.3);
      
      // Additional floating glow orbs
      const orbX1 = width * (0.2 + Math.sin(t * 0.3) * 0.1);
      const orbY1 = height * (0.5 + Math.cos(t * 0.4) * 0.1);
      drawAmbientGlow(orbX1, orbY1, width * 0.4, primary, 0.12, 0.6);
      
      const orbX2 = width * (0.8 + Math.cos(t * 0.25) * 0.08);
      const orbY2 = height * (0.4 + Math.sin(t * 0.35) * 0.12);
      drawAmbientGlow(orbX2, orbY2, width * 0.35, secondary, 0.1, 0.8);

      // Draw flowing wave bands (multiple, not just one line)
      const drawWaveBand = (
        baseY: number, 
        amplitude: number, 
        thickness: number, 
        color: { r: number; g: number; b: number }, 
        alpha: number,
        phaseOffset: number = 0
      ) => {
        ctx.beginPath();
        
        // Create a filled wave band, not just a line
        const points: { x: number; y: number }[] = [];
        
        for (let x = -10; x <= width + 10; x += 2) {
          const normalizedX = x / width;
          let y = baseY;
          
          for (let w = 0; w < config.waveCount; w++) {
            const freq = 1.5 + w * 0.8;
            const amp = amplitude * (1 - w * 0.15);
            const phase = t * (0.6 + w * 0.15) * (w % 2 === 0 ? 1 : -1) + phaseOffset;
            y += Math.sin(normalizedX * freq * Math.PI * 2 + phase) * amp;
          }
          
          points.push({ x, y });
        }

        // Draw the wave as a thick gradient stroke with glow
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        
        // Multiple glow layers for each wave
        const glowLayers = [
          { width: thickness * 8, alpha: alpha * 0.1 },
          { width: thickness * 5, alpha: alpha * 0.2 },
          { width: thickness * 3, alpha: alpha * 0.35 },
          { width: thickness * 1.5, alpha: alpha * 0.6 },
          { width: thickness * 0.5, alpha: alpha * 0.9 },
        ];

        glowLayers.forEach(layer => {
          ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${layer.alpha * opacityMult})`;
          ctx.lineWidth = layer.width;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.stroke();
        });

        // Bright core
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.7 * opacityMult})`;
        ctx.lineWidth = thickness * 0.2;
        ctx.stroke();
      };

      // Draw multiple wave bands at different heights
      drawWaveBand(height * 0.35, 40, 12, primary, 0.5, 0);
      drawWaveBand(height * 0.45, 35, 10, accent, 0.4, 1);
      drawWaveBand(height * 0.55, 30, 8, secondary, 0.35, 2);
      drawWaveBand(height * 0.4, 25, 6, primary, 0.3, 0.5);
      drawWaveBand(height * 0.5, 20, 5, accent, 0.25, 1.5);

      // Subtle horizontal gradient overlay for depth
      if (!isSubtle) {
        const hGradient = ctx.createLinearGradient(0, 0, width, 0);
        hGradient.addColorStop(0, `rgba(${secondary.r}, ${secondary.g}, ${secondary.b}, 0.08)`);
        hGradient.addColorStop(0.5, 'transparent');
        hGradient.addColorStop(1, `rgba(${primary.r}, ${primary.g}, ${primary.b}, 0.08)`);
        ctx.fillStyle = hGradient;
        ctx.fillRect(0, 0, width, height);
      }

      // Soft vignette to blend edges
      const vignetteColor = isDarkRef.current ? 'rgba(0, 0, 0, 0.4)' : 'rgba(250, 248, 245, 0.5)';
      const vignette = ctx.createRadialGradient(
        width * 0.5, height * 0.5, 0,
        width * 0.5, height * 0.5, Math.max(width, height) * 0.7
      );
      vignette.addColorStop(0, 'transparent');
      vignette.addColorStop(0.7, 'transparent');
      vignette.addColorStop(1, vignetteColor);
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [scrollY, isSubtle, config, variant]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
    />
  );
}
