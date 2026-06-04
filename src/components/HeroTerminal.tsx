import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroTerminal() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    for (let i = 0; i < 90; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 1.8 + 0.4,
        opacity: Math.random() * 0.6 + 0.15,
      });
    }

    let time = 0;
    const animate = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      time += 0.001;

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x > canvas.width) p.x = 0;
        if (p.x < 0) p.x = canvas.width;
        if (p.y > canvas.height) p.y = 0;
        if (p.y < 0) p.y = canvas.height;

        ctx.fillStyle = `rgba(59, 130, 246, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        const wave = Math.sin(time * 2 + p.x * 0.01) * 15;
        ctx.strokeStyle = `rgba(34, 211, 238, ${p.opacity * 0.3})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y + wave, p.size * 2, 0, Math.PI * 2);
        ctx.stroke();
      });

      requestAnimationFrame(animate);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!titleRef.current) return;

    gsap.fromTo(
      titleRef.current.children,
      { opacity: 0, y: 50, rotateX: -90 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'back.out',
      }
    );

    const handleScroll = () => {
      if (titleRef.current) {
        const scrollY = window.scrollY;
        gsap.to(titleRef.current, {
          y: scrollY * 0.3,
          opacity: Math.max(0, 1 - scrollY / 800),
          duration: 0.2,
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-slate-900"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ opacity: 0.48 }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(59,130,246,0.12),transparent)]"></div>

      <div ref={titleRef} className="relative z-10 text-center px-6 max-w-5xl perspective-3d">
        <div className="mb-6 overflow-hidden">
          <h1 className="text-6xl sm:text-8xl md:text-9xl font-black text-white mb-4 tracking-tighter leading-none">
            Shivam Shukla
          </h1>
        </div>

        <div className="mb-8 overflow-hidden">
          <p className="text-xl md:text-2xl text-slate-400 font-light tracking-wide">
            Built satellite segmentation for the Indian govt. Filed a patent at 21.
          </p>
        </div>

        <div className="mb-3 overflow-hidden">
          <p className="text-base text-slate-500 font-light">
            AI/ML Engineer &amp; Full Stack Developer
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 text-sm text-slate-400 mb-12">
          {['Python', 'TensorFlow', 'PyTorch', 'React', 'Flask', 'NLP & LLMs'].map((tag, i) => (
            <span
              key={tag}
              className="px-4 py-1.5 bg-slate-800 rounded-full border border-slate-700 hover:border-blue-500/60 hover:text-blue-400 transition-all duration-300 font-mono text-xs cursor-default"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div>
          <button className="inline-flex items-center gap-3 px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium text-base group relative overflow-hidden transition-all duration-200">
            <span className="relative flex items-center gap-2">
              View My Work
              <svg
                className="w-4 h-4 group-hover:translate-y-0.5 transition-transform"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path d="M12 5v14M19 12l-7 7-7-7" strokeWidth={2} strokeLinecap="round" />
              </svg>
            </span>
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-5 h-8 border border-slate-600 rounded-full flex justify-center relative">
          <div className="w-1 h-2 bg-slate-500 rounded-full mt-1.5 animate-scroll-indicator" />
        </div>
      </div>
    </section>
  );
}
