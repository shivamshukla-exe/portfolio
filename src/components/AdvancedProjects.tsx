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

const STICKY_TOP = 100;       // px from top where every card pins
const CARD_HEIGHT_VH = 80;    // scroll length per card (in viewport units)

export default function AdvancedProjects() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const wrapperRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const innerRefs    = useRef<(HTMLDivElement | null)[]>([]);

  // On scroll, compute per-card scale + opacity based on how much of the
  // *next* card has covered this one. This is the AWS pattern.
  useEffect(() => {
    let raf = 0;

    const update = () => {
      const vh = window.innerHeight;

      wrapperRefs.current.forEach((wrap, i) => {
        if (!wrap) return;
        const inner = innerRefs.current[i];
        if (!inner) return;

        const rect = wrap.getBoundingClientRect();
        // Progress: 0 while card is in view, grows to 1 as next card pushes it away
        // We measure: how far has the card scrolled past its pin?
        const cardHeightPx = vh * CARD_HEIGHT_VH / 100;
        const scrolledPast = -rect.top + STICKY_TOP; // px past pin
        let progress = scrolledPast / cardHeightPx;
        progress = Math.max(0, Math.min(1, progress));

        // Don't shrink the last card
        if (i === projects.length - 1) progress = 0;

        // Scale shrinks 0 → 0.06, opacity dims to 0.55, brightness to 0.7
        const scale      = 1 - progress * 0.06;
        const opacity    = 1 - progress * 0.45;
        const brightness = 1 - progress * 0.3;
        const yShift     = -progress * 12; // slight pull-up for depth

        inner.style.transform = `translate3d(0, ${yShift}px, 0) scale(${scale})`;
        inner.style.opacity   = `${opacity}`;
        inner.style.filter    = `brightness(${brightness})`;
      });

      raf = 0;
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
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
    <section
      id="projects"
      className="relative bg-slate-900"
    >
      {/* heading */}
      <div className="max-w-4xl mx-auto px-6 pt-24 pb-12">
        <h2 className="text-5xl md:text-7xl font-black text-white mb-4">Projects</h2>
        <div className="w-16 h-1 bg-blue-500 mb-4" />
        <p className="text-slate-200">
          Crime forecasting for police, satellite segmentation for govt., emotion-driven music — and more. Scroll to stack.
        </p>
      </div>

      {/* card stack */}
      <div className="max-w-4xl mx-auto px-6 pb-32">
        {projects.map((project, index) => (
          <div
            key={index}
            ref={el => { wrapperRefs.current[index] = el; }}
            className="relative"
            style={{
              // Each wrapper is tall — that's what gives us scroll distance
              // to pin the inner card while moving past it
              height: `${CARD_HEIGHT_VH}vh`,
            }}
          >
            <div
              ref={el => { innerRefs.current[index] = el; }}
              className="sticky will-change-transform origin-top"
              style={{
                top: `${STICKY_TOP}px`,
                zIndex: index + 1,
                // start at no transform; JS updates inline styles
                transformOrigin: 'center top',
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className={`
                  relative rounded-2xl overflow-hidden
                  bg-slate-800 border border-slate-700
                  shadow-2xl shadow-black/50
                  transition-shadow duration-300
                  ${hoveredIndex === index ? 'shadow-blue-500/15' : ''}
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
          </div>
        ))}
      </div>
    </section>
  );
}
