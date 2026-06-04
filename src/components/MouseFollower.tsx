import { useEffect, useRef } from 'react';

interface SkillWord {
  text: string;
  x: number;
  y: number;
  // drift velocity — slow, organic
  vx: number;
  vy: number;
  // life goes 0 → 1 → 0 (birth, peak, death)
  age: number;       // 0 → maxAge
  maxAge: number;
  size: number;
  color: string;
  // slight wobble per word
  wobbleOffset: number;
  wobbleSpeed: number;
  // letter-spacing feel — scale starts small, blooms to 1
  scale: number;
}

const SKILLS = [
  // Languages
  'Python', 'JavaScript', 'SQL', 'R', 'Java', 'C', 'HTML', 'CSS',
  // ML / DL
  'TensorFlow', 'PyTorch', 'Keras', 'Scikit-learn', 'XGBoost', 'LightGBM',
  // NLP & LLMs
  'NLP', 'LLMs', 'BART', 'Phi-3', 'Transformers', 'Ollama',
  'RAG', 'LangChain', 'Sentence Transformers', 'DistilRoBERTa',
  // Time-series & stats
  'SARIMA', 'ARIMA', 'Prophet', 'EDA', 'Feature Engineering',
  // CV
  'Computer Vision', 'DeepLabV3+', 'OpenCV', 'ResNet', 'U-Net',
  // Web / Backend
  'React', 'Flask', 'FastAPI', 'Django', 'REST APIs',
  // Data
  'Pandas', 'NumPy', 'Matplotlib', 'Tableau', 'Power BI',
  // Tools
  'Docker', 'Git', 'Kaggle', 'Google Colab', 'Selenium', 'Spotify API',
];

const COLORS = [
  '#60a5fa', // blue-400
  '#38bdf8', // sky-400
  '#93c5fd', // blue-300
  '#a5b4fc', // indigo-300
  '#67e8f9', // cyan-300
  '#bae6fd', // sky-200
];

export default function MouseFollower() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wordsRef = useRef<SkillWord[]>([]);

  // mouse state
  const posRef    = useRef({ x: -9999, y: -9999 });
  const prevRef   = useRef({ x: -9999, y: -9999 });
  const movingRef = useRef(false);       // true while mouse is moving
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // spawn
  const skillIdxRef  = useRef(0);
  const spawnFrame   = useRef(0);
  const SPAWN_EVERY  = 10; // frames between spawns while moving

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e: MouseEvent) => {
      prevRef.current = { ...posRef.current };
      posRef.current  = { x: e.clientX, y: e.clientY };

      // how fast is the mouse moving?
      const dx = posRef.current.x - prevRef.current.x;
      const dy = posRef.current.y - prevRef.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);

      // only "moving" if mouse actually travelled a few px
      if (speed > 2) {
        movingRef.current = true;
      }

      // reset idle timer — stop spawning 180 ms after last movement
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => {
        movingRef.current = false;
      }, 180);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    let rafId: number;
    let frame = 0;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ── Spawn ────────────────────────────────────────────────────────
      if (movingRef.current && frame % SPAWN_EVERY === 0) {
        const dx = posRef.current.x - prevRef.current.x;
        const dy = posRef.current.y - prevRef.current.y;

        const idx = skillIdxRef.current % SKILLS.length;
        skillIdxRef.current++;

        // spread words in a small cloud around cursor
        const spread = 30;
        const word: SkillWord = {
          text:  SKILLS[idx],
          x:     posRef.current.x + (Math.random() - 0.5) * spread,
          y:     posRef.current.y + (Math.random() - 0.5) * spread * 0.6,
          // drift gently upward + a little in the direction of mouse travel
          vx:    (Math.random() - 0.5) * 0.35 + dx * 0.015,
          vy:    -(Math.random() * 0.55 + 0.2) + dy * 0.01,
          age:    0,
          maxAge: 130 + Math.random() * 60, // ~2–3 s at 60 fps
          size:   Math.floor(Math.random() * 5) + 11, // 11–15 px
          color:  COLORS[Math.floor(Math.random() * COLORS.length)],
          wobbleOffset: Math.random() * Math.PI * 2,
          wobbleSpeed:  0.03 + Math.random() * 0.02,
          scale:  0,
        };
        wordsRef.current.push(word);

        // hard cap — oldest evicted first
        if (wordsRef.current.length > 50) wordsRef.current.shift();
      }

      // ── Draw ─────────────────────────────────────────────────────────
      ctx.textBaseline = 'middle';

      wordsRef.current = wordsRef.current.filter(w => w.age < w.maxAge);

      wordsRef.current.forEach(w => {
        w.age++;
        const t = w.age / w.maxAge; // 0 → 1

        // position drift with a gentle lateral wobble
        w.x += w.vx + Math.sin(w.age * w.wobbleSpeed + w.wobbleOffset) * 0.18;
        w.y += w.vy;
        // very slight gravity so it doesn't float forever
        w.vy += 0.003;

        // alpha: ease-in over first 15%, flat, ease-out over last 25%
        let alpha: number;
        if (t < 0.15) {
          alpha = t / 0.15;
        } else if (t > 0.75) {
          alpha = (1 - t) / 0.25;
        } else {
          alpha = 1;
        }

        // scale: bloom from 0 → 1 over first 20%, then hold
        w.scale = t < 0.2 ? t / 0.2 : 1;

        // optional: very faint underline that grows with scale — feels like a thought forming
        const textWidth = ctx.measureText(w.text).width * w.scale;

        ctx.save();
        ctx.translate(w.x, w.y);
        ctx.scale(w.scale, w.scale);

        // soft glow — just a second draw at higher blur sim via shadow
        ctx.shadowColor  = w.color;
        ctx.shadowBlur   = 6;
        ctx.globalAlpha  = alpha * 0.55;
        ctx.fillStyle    = w.color;
        ctx.font         = `${w.size}px "SF Mono","Fira Code","Fira Mono","Cascadia Code",monospace`;
        ctx.fillText(w.text, 0, 0);

        // main sharp draw on top
        ctx.shadowBlur  = 0;
        ctx.globalAlpha = alpha * 0.82;
        ctx.fillText(w.text, 0, 0);

        ctx.restore();
      });

      ctx.globalAlpha = 1;
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', resize);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30"
    />
  );
}
