'use client'

import { useEffect, useRef } from 'react';

export default function WaterBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Define wave interface
    interface Wave {
      frequency: number;
      amplitude: number;
      yOffset: number;
      speed: number;
      phase: number;
      color: string;
    }

    const waves: Wave[] = [];
    const waveCount = 5;
    const colors = [
      'rgba(159, 156, 235, 0.3)',  // lavender-400 with opacity
      'rgba(102, 83, 212, 0.2)',  // lavender-600 with opacity
      'rgba(85, 64, 193, 0.2)',  // lavender-700 with opacity
      'rgba(72, 54, 161, 0.2)',  // lavender-800 with opacity
      'rgba(35, 28, 89, 0.1)',   // lavender-950 with opacity
    ];

    for (let i = 0; i < waveCount; i++) {
      waves.push({
        frequency: 0.01 + (i * 0.005),
        amplitude: 20 + (i * 10),
        yOffset: (canvas.height * 0.5) + (i * 40),
        speed: 0.05 + (i * 0.02),
        phase: 0,
        color: colors[i % colors.length]
      });
    }

    const bubbles: any[] = [];
    for (let i = 0; i < 20; i++) {
      bubbles.push({
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 100,
        radius: 2 + Math.random() * 10,
        speed: 1 + Math.random() * 3,
        opacity: 0.2 + Math.random() * 0.3
      });
    }

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      for (let i = 0; i < waveCount; i++) {
        waves[i].yOffset = (canvas.height * 0.5) + (i * 40);
      }
    };

    window.addEventListener('resize', resize);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(35, 28, 89, 0.8)'); // lavender-950
      gradient.addColorStop(1, 'rgba(102, 83, 212, 0.3)'); // lavender-600
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw waves
      waves.forEach(wave => {
        wave.phase += wave.speed;

        ctx.beginPath();
        ctx.moveTo(0, canvas.height);

        for (let x = 0; x <= canvas.width; x += 10) {
          const y = wave.yOffset + Math.sin(x * wave.frequency + wave.phase) * wave.amplitude;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();

        ctx.fillStyle = wave.color;
        ctx.fill();
      });

      // Draw bubbles
      bubbles.forEach(bubble => {
        bubble.y -= bubble.speed;

        if (bubble.y < -bubble.radius * 2) {
          bubble.y = canvas.height + bubble.radius;
          bubble.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = `rgba(255, 255, 255, ${bubble.opacity})`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full -z-10"
    />
  );
}
