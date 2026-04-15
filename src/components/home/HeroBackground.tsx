import { useEffect, useRef } from 'react';

export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Function to get computed CSS colors (called each frame for dark mode support)
    const getColors = () => {
      const computedStyle = getComputedStyle(document.documentElement);
      const isDark = document.documentElement.classList.contains('dark');
      
      // In dark mode, use brighter purple lines
      const lineColorBase = computedStyle.getPropertyValue('--datum-line').trim();
      const focalColorBase = computedStyle.getPropertyValue('--datum-focal').trim();
      const gridColorBase = computedStyle.getPropertyValue('--datum-grid').trim();
      
      return {
        lineColor: isDark ? `hsl(270, 50%, 45%)` : `hsl(${lineColorBase})`,
        focalColor: `hsl(${focalColorBase})`,
        gridColor: isDark ? `hsl(270, 40%, 35%)` : `hsl(${gridColorBase})`,
        isDark
      };
    };

    let animationId: number;
    let time = 0;

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      };
    };
    window.addEventListener('mousemove', handleMouseMove);

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener('resize', resize);

    // Floating elements with depth for parallax
    const elements: Array<{
      x: number;
      y: number;
      size: number;
      speed: number;
      type: 'circle' | 'line' | 'dot';
      angle: number;
      opacity: number;
      pulseOffset: number;
      depth: number;
    }> = [];

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;

    // Generate elements more concentrated in the visible area
    for (let i = 0; i < 22; i++) {
      elements.push({
        x: Math.random() * width,
        y: height * 0.15 + Math.random() * height * 0.7, // Keep elements in middle 70% of height
        size: Math.random() * 90 + 35,
        speed: Math.random() * 0.2 + 0.08,
        type: ['circle', 'line', 'dot'][Math.floor(Math.random() * 3)] as 'circle' | 'line' | 'dot',
        angle: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.25 + 0.1,
        pulseOffset: Math.random() * Math.PI * 2,
        depth: Math.random() * 0.8 + 0.2
      });
    }

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      ctx.clearRect(0, 0, w, h);

      // Get current colors (supports dark mode toggle)
      const { lineColor, focalColor, gridColor, isDark } = getColors();
      
      // Higher opacity multiplier in dark mode for visibility
      const opacityMult = isDark ? 2.5 : 1;

      // Parallax offset for center based on mouse
      const parallaxX = (mx - 0.5) * 60;
      const parallaxY = (my - 0.5) * 40;

      // Draw subtle axis lines with parallax - center vertically adjusted to account for header
      const centerX = w * 0.72 + parallaxX * 0.3;
      const centerY = h * 0.48 + parallaxY * 0.3;
      const axisOpacity = (0.08 + Math.sin(time * 0.5) * 0.03) * opacityMult;

      ctx.save();
      ctx.globalAlpha = axisOpacity;
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;
      ctx.setLineDash([8, 12]);
      
      // Horizontal axis
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(w, centerY);
      ctx.stroke();
      
      // Vertical axis
      ctx.beginPath();
      ctx.moveTo(centerX, 0);
      ctx.lineTo(centerX, h);
      ctx.stroke();
      
      // Diagonal axes
      ctx.globalAlpha = axisOpacity * 0.6;
      ctx.beginPath();
      ctx.moveTo(centerX - w, centerY - w);
      ctx.lineTo(centerX + w, centerY + w);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(centerX + w, centerY - w);
      ctx.lineTo(centerX - w, centerY + w);
      ctx.stroke();
      
      ctx.setLineDash([]);
      ctx.restore();

      // Draw floating geometric elements with pulse and parallax
      elements.forEach((el) => {
        const pulse = Math.sin(time * 1.5 + el.pulseOffset) * 0.5 + 0.5;
        const currentOpacity = el.opacity * (0.7 + pulse * 0.3) * opacityMult;
        const currentSize = el.size * (0.95 + pulse * 0.1);

        // Parallax based on depth
        const elParallaxX = (mx - 0.5) * 80 * el.depth;
        const elParallaxY = (my - 0.5) * 50 * el.depth;

        ctx.save();
        ctx.globalAlpha = currentOpacity;
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 1.5 + pulse * 0.5;

        const offsetX = Math.sin(time * el.speed + el.angle) * 30 + elParallaxX;
        const offsetY = Math.cos(time * el.speed * 0.7 + el.angle) * 25 + elParallaxY;

        const x = el.x + offsetX;
        const y = el.y + offsetY;

        if (el.type === 'circle') {
          ctx.beginPath();
          ctx.arc(x, y, currentSize, 0, Math.PI * 2);
          ctx.stroke();
          
          // Inner pulsing ring
          ctx.globalAlpha = currentOpacity * 0.5;
          ctx.beginPath();
          ctx.arc(x, y, currentSize * 0.5 * (0.5 + pulse * 0.5), 0, Math.PI * 2);
          ctx.stroke();
        } else if (el.type === 'line') {
          const lineAngle = el.angle + time * 0.03;
          ctx.beginPath();
          ctx.moveTo(x - Math.cos(lineAngle) * currentSize, y - Math.sin(lineAngle) * currentSize);
          ctx.lineTo(x + Math.cos(lineAngle) * currentSize, y + Math.sin(lineAngle) * currentSize);
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(x, y, 4 + pulse * 3, 0, Math.PI * 2);
          ctx.fillStyle = focalColor;
          ctx.globalAlpha = currentOpacity * 2;
          ctx.fill();
        }

        ctx.restore();
      });

      // Central datum point with enhanced pulse
      const mainPulse = Math.sin(time * 0.8) * 0.5 + 0.5;
      const ringPulse = Math.sin(time * 1.2) * 0.5 + 0.5;

      // Concentric circles with staggered pulse
      for (let i = 0; i < 6; i++) {
        const staggerPulse = Math.sin(time * 0.6 - i * 0.3) * 0.5 + 0.5;
        const radius = 80 + i * 65 + staggerPulse * 25;
        const opacity = (0.18 - i * 0.02) * (0.7 + staggerPulse * 0.3);
        
        ctx.save();
        ctx.globalAlpha = Math.max(0, opacity);
        ctx.strokeStyle = focalColor;
        ctx.lineWidth = 2 + staggerPulse;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // Radiating lines from center
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2 + time * 0.04;
        const linePulse = Math.sin(time + i * 0.4) * 0.5 + 0.5;
        const lineLength = 180 + linePulse * 100;
        
        ctx.save();
        ctx.globalAlpha = 0.06 + linePulse * 0.06;
        ctx.strokeStyle = focalColor;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
          centerX + Math.cos(angle) * lineLength,
          centerY + Math.sin(angle) * lineLength
        );
        ctx.stroke();
        ctx.restore();
      }

      // Central dot with glow pulse
      ctx.save();
      ctx.globalAlpha = 0.3 + mainPulse * 0.25;
      ctx.fillStyle = focalColor;
      ctx.shadowColor = focalColor;
      ctx.shadowBlur = 30 + mainPulse * 20;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 8 + mainPulse * 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Inner ring
      ctx.save();
      ctx.globalAlpha = 0.35 + ringPulse * 0.15;
      ctx.strokeStyle = focalColor;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 30 + ringPulse * 12, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      time += 0.02;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/50" />
      
      {/* Canvas for animated elements */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      
      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
