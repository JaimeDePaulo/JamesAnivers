import React, { useEffect, useRef } from 'react';

interface ParticleCanvasProps {
  isBirthday?: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  alphaSpeed: number;
  color: string;
  isConfetti: boolean;
  rotation: number;
  rotationSpeed: number;
}

const GOLD_PALETTE = ['#D4AF37', '#E5C158', '#F3E5AB', '#B89225', '#93C5FD'];

export const ParticleCanvas: React.FC<ParticleCanvasProps> = ({ isBirthday = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const particleCount = isBirthday ? 85 : 36;
    const particles: Particle[] = Array.from({ length: particleCount }, (_, idx) => {
      const confetti = isBirthday && idx < 50;
      return {
        x: Math.random() * width,
        y: confetti ? Math.random() * height - height : Math.random() * height,
        vx: confetti ? (Math.random() - 0.5) * 1.4 : (Math.random() - 0.5) * 0.25,
        vy: confetti ? Math.random() * 1.6 + 0.8 : -(Math.random() * 0.35 + 0.1),
        size: confetti ? Math.random() * 5 + 3 : Math.random() * 2 + 0.8,
        alpha: Math.random() * 0.55 + 0.15,
        alphaSpeed: (Math.random() - 0.5) * 0.008,
        color: GOLD_PALETTE[Math.floor(Math.random() * GOLD_PALETTE.length)],
        isConfetti: confetti,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.06,
      };
    });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.alpha += p.alphaSpeed;

        if (p.alpha <= 0.1 || p.alpha >= 0.75) {
          p.alphaSpeed *= -1;
        }

        if (p.isConfetti) {
          if (p.y > height + 20) {
            p.y = -20;
            p.x = Math.random() * width;
          }
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.globalAlpha = Math.max(0.15, Math.min(0.85, p.alpha));
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
          ctx.restore();
        } else {
          if (p.y < -10) p.y = height + 10;
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;

          ctx.save();
          ctx.globalAlpha = Math.max(0.08, Math.min(0.6, p.alpha));
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isBirthday]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
};
