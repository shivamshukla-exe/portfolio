import { useEffect, useRef, useState } from 'react';
import { Github, ExternalLink } from 'lucide-react';

interface Project {
  title: string;
  subtitle: string;
  description: string;
  gradient: string;
  github: string;
  tags: string[];
  stats: { label: string; value: string }[];
}

const projects: Project[] = [
  {
    title: 'Crime Prediction',
    subtitle: 'SARIMA Time-Series Forecasting',
    description:
      'Full-stack crime analytics platform built for Himachal Pradesh Police. One SARIMA model per district × crime type, auto-optimised via AIC. Predicts crime rates 30 days ahead with an interactive Plotly Dash + React dashboard, GPS heatmap of 167 police stations, district risk bubble map, patrol advisories, and CSV export.',
    gradient: 'from-orange-500 to-red-500',
    github: 'https://github.com/shivamshukla-exe/Crime-Prediction-using-SARIMA-modelling',
    tags: ['Python', 'SARIMA', 'pmdarima', 'Plotly Dash', 'React', 'React-Leaflet', 'Pandas'],
    stats: [
      { label: 'Police stations', value: '167' },
      { label: 'Charts', value: '13' },
      { label: 'Horizon', value: '30 days' },
    ],
  },
  {
    title: 'PM Gatishakti',
    subtitle: 'Satellite Rooftop Segmentation',
    description:
      'Built at BISAG-N for MeitY as part of the PM Gatishakti national infrastructure initiative. DeepLabV3+ (ResNet-101) segments rooftop areas from satellite tiles. Achieved ~15% mIoU improvement over the baseline U-Net approach.',
    gradient: 'from-green-500 to-emerald-500',
    github: 'https://github.com/shivamshukla-exe/Change_Detection',
    tags: ['PyTorch', 'DeepLabV3+', 'OpenCV', 'NumPy', 'GeoTIFF'],
    stats: [
      { label: 'mIoU gain', value: '+15%' },
      { label: 'Model', value: 'DLv3+' },
      { label: 'Client', value: 'Govt.' },
    ],
  },
  {
    title: 'Change Detection',
    subtitle: 'Satellite / Aerial Image Diff',
    description:
      'Detects structural changes — new buildings, encroachments, demolitions — between before/after satellite or aerial images. Aligns and normalises both images, runs an edge-detection pipeline, filters noise by area threshold, and outputs a 4-panel visualisation with numbered change regions. Supports GeoTIFF, PNG, and JPG.',
    gradient: 'from-teal-500 to-cyan-500',
    github: 'https://github.com/shivamshukla-exe/Change_Detection',
    tags: ['Python', 'OpenCV', 'GeoTIFF', 'NumPy', 'Matplotlib'],
    stats: [
      { label: 'Input formats', value: '3' },
      { label: 'Output panels', value: '4' },
      { label: 'Domain', value: 'Remote sensing' },
    ],
  },
  {
    title: 'Emotion Playlist',
    subtitle: 'NLP → Music — Patent Filed',
    description:
      'Analyses text (journal entries, social media) to detect one of 6 emotions — Happy, Sad, Angry, Anxious, Surprised, Neutral — including emoji and expression parsing, then generates a matching Spotify playlist. Patent application filed for the multimodal fusion approach covering audio, video, and text modalities.',
    gradient: 'from-purple-500 to-pink-500',
    github: 'https://github.com/shivamshukla-exe/Emotion-Driven-Playlist-Generator',
    tags: ['Python', 'Transformers', 'NLP', 'Spotify API', 'FastAPI'],
    stats: [
      { label: 'Emotions', value: '6' },
      { label: 'CPU saved', value: '20%' },
      { label: 'Status', value: 'Patent' },
    ],
  },
  {
    title: 'AI Chatbot',
    subtitle: 'Offline LLM — BART + Phi-3',
    description:
      'Conversational AI that runs fully offline — no cloud, no API keys. BART (facebook/bart-large-cnn) summarises long inputs before passing context to Phi-3 via Ollama. React frontend, Flask backend. Designed for privacy-first deployments.',
    gradient: 'from-blue-500 to-cyan-500',
    github: 'https://github.com/shivamshukla-exe/portfolio',
    tags: ['Python', 'Flask', 'React', 'Ollama', 'BART', 'Phi-3'],
    stats: [
      { label: 'LLMs', value: '2' },
      { label: 'Mode', value: 'Offline' },
      { label: 'Backend', value: 'Flask' },
    ],
  },
];

const STICKY_BASE = 90;   // px from top where the first card pins
const STICKY_STEP = 26;   // each card pins this much further down (stair-step lip)

export default function AdvancedProjects() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Shrink + dim a card once the NEXT card rises up to cover it.
  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const next = cardRefs.current[i + 1];

        if (!next) {
          // last card stays pristine
          card.style.transform = 'scale(1)';
          card.style.opacity = '1';
          card.style.filter = 'brightness(1)';
          return;
        }

        const pinTop = STICKY_BASE + i * STICKY_STEP;
        const nextTop = next.getBoundingClientRect().top;

        // progress 0 → 1 as the next card travels the last ~420px up to the pin
        const COVER = 420;
        let progress = 1 - (nextTop - pinTop) / COVER;
        progress = Math.max(0, Math.min(1, progress));

        const scale = 1 - progress * 0.07;
        const opacity = 1 - progress * 0.4;
        const brightness = 1 - progress * 0.35;

        card.style.transform = `scale(${scale})`;
        card.style.opacity = `${opacity}`;
        card.style.filter = `brightness(${brightness})`;
      });
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="projects" className="relative bg-slate-900">
      {/* heading */}
      <div className="max-w-4xl mx-auto px-6 pt-24 pb-12">
        <h2 className="text-5xl md:text-7xl font-black text-white mb-4">Projects</h2>
        <div className="w-16 h-1 bg-blue-500 mb-4" />
        <p className="text-slate-200">
          Crime forecasting for police, satellite segmentation for govt., emotion-driven music — and more. Scroll to stack.
        </p>
      </div>

      {/* card stack — all cards are SIBLINGS in one container, each sticky */}
      <div className="max-w-4xl mx-auto px-6 pb-[45vh] space-y-8">
        {projects.map((project, index) => (
          <div
            key={index}
            ref={el => { cardRefs.current[index] = el; }}
            className="sticky will-change-transform"
            style={{
              top: `${STICKY_BASE + index * STICKY_STEP}px`,
              zIndex: index + 1,
              transformOrigin: 'center top',
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div
              className={`
                relative rounded-2xl overflow-hidden
                bg-slate-800 border border-slate-700
                shadow-2xl shadow-black/60
                transition-shadow duration-300
                ${hoveredIndex === index ? 'shadow-blue-500/20' : ''}
              `}
            >
              {/* accent bar */}
              <div className={`h-[3px] w-full bg-gradient-to-r ${project.gradient}`} />

              <div className="p-7 md:p-9 flex flex-col md:flex-row gap-6">
                {/* content */}
                <div className="flex-1 flex flex-col">
                  <span
                    className={`inline-block self-start text-xs font-mono px-2 py-0.5 rounded mb-3 text-white bg-gradient-to-r ${project.gradient} opacity-90`}
                  >
                    {project.subtitle}
                  </span>

                  <h3 className="text-2xl md:text-3xl font-black text-white mb-3">
                    {project.title}
                  </h3>

                  <p className="text-slate-200 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tags.map(tag => (
                      <span
                        key={tag}
                        className="text-xs font-mono px-2 py-0.5 bg-slate-900 text-slate-300 rounded border border-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors mt-auto"
                    onClick={e => e.stopPropagation()}
                  >
                    <Github className="w-4 h-4" />
                    <span className="font-mono text-xs">View on GitHub</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* stats */}
                <div className="flex flex-row md:flex-col gap-5 md:gap-6 md:w-40 justify-around md:justify-start md:pl-6 md:border-l md:border-slate-700">
                  {project.stats.map((stat, i) => (
                    <div key={i} className="text-center md:text-left">
                      <p
                        className={`text-xl md:text-2xl font-black bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}
                      >
                        {stat.value}
                      </p>
                      <p className="text-xs text-slate-300 mt-0.5">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* hover border */}
              <div
                className={`absolute inset-0 border-2 rounded-2xl pointer-events-none transition-all duration-300 ${
                  hoveredIndex === index ? 'border-blue-500/40' : 'border-transparent'
                }`}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
