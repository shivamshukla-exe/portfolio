import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CodeMatrix() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = 300;

    const chars = '01アイウエオカキクケコサシスセソタチツテト';
    const columns = Math.ceil(canvas.width / 10);
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * canvas.height;
    }

    let time = 0;

    const draw = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0ff';
      ctx.font = '12px monospace';

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];

        const opacity = Math.sin(time * 0.02 + i * 0.05) * 0.5 + 0.5;
        ctx.fillStyle = `rgba(0, 255, 255, ${opacity})`;

        ctx.fillText(char, i * 10, drops[i]);

        if (drops[i] > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i] += Math.sin(time * 0.01 + i) * 2 + 2;
      }

      time++;
      requestAnimationFrame(draw);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
    };

    window.addEventListener('resize', handleResize);
    draw();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-12 bg-black overflow-hidden border-y border-blue-500/30"
    >
      <canvas
        ref={canvasRef}
        className="w-full"
        style={{
          filter: 'drop-shadow(0 0 10px rgba(0, 255, 255, 0.3))',
          mixBlendMode: 'screen',
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <p className="sheen-text font-mono text-xs md:text-sm tracking-widest">
            Python • TensorFlow • PyTorch • React • Flask • SARIMA • OpenCV • NLP • Spotify API • DeepLabV3+
          </p>
        </div>
      </div>
    </section>
  );
}
