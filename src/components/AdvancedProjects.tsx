import { useEffect, useRef, useState } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

// Config for the stacked effect
const CARD_TOP_OFFSET = 80;   // first card sticks at this px from top
const CARD_INCREMENT  = 30;   // each subsequent card sticks 30px further down
const SCALE_SHRINK    = 0.04; // how much each card shrinks when "behind"

export default function AdvancedProjects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardEls    = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // GSAP ScrollTrigger — scale + dim cards as they get scrolled past
  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    cardEls.current.forEach((card, i) => {
      if (!card || i === projects.length - 1) return; // last card doesn't shrink

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: `top ${CARD_TOP_OFFSET + i * CARD_INCREMENT}px`,
          endTrigger: cardEls.current[i + 1]!,
          end: `top ${CARD_TOP_OFFSET + (i + 1) * CARD_INCREMENT}px`,
          scrub: 0.4,
          // pin: false — we rely on sticky
        },
      });

      tl.to(card, {
        scale: 1 - SCALE_SHRINK,
        opacity: 0.6,
        filter: 'brightness(0.7)',
        ease: 'none',
      });

      if (tl.scrollTrigger) triggers.push(tl.scrollTrigger);
    });

    return () => triggers.forEach(t => t.kill());
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative bg-slate-900 overflow-visible"
    >
      {/* heading — not sticky */}
      <div className="max-w-4xl mx-auto px-6 pt-24 pb-12">
        <h2 className="text-5xl md:text-7xl font-black text-white mb-4">Projects</h2>
        <div className="w-16 h-1 bg-blue-500 mb-4" />
        <p className="text-slate-200">
          Crime forecasting for police, satellite segmentation for govt., emotion-driven music — and more.
        </p>
      </div>

      {/* card stack area — tall enough to allow scroll through all cards */}
      <div className="max-w-4xl mx-auto px-6 pb-24 relative">
        {projects.map((project, index) => (
          <div
            key={index}
            ref={el => { cardEls.current[index] = el; }}
            className="sticky mb-6 will-change-transform origin-top"
            style={{
              top: `${CARD_TOP_OFFSET + index * CARD_INCREMENT}px`,
              zIndex: index + 1,
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className={`
              relative rounded-2xl overflow-hidden
              bg-slate-800 border border-slate-700
              shadow-xl shadow-black/30
              transition-shadow duration-300
              ${hoveredIndex === index ? 'shadow-2xl shadow-blue-500/10' : ''}
            `}>
              {/* accent bar */}
              <div className={`h-[3px] w-full bg-gradient-to-r ${project.gradient}`} />

              <div className="p-7 md:p-8 flex flex-col md:flex-row gap-6">
                {/* left: content */}
                <div className="flex-1 flex flex-col">
                  <span className={`inline-block self-start text-xs font-mono px-2 py-0.5 rounded mb-3 text-white bg-gradient-to-r ${project.gradient} opacity-90`}>
                    {project.subtitle}
                  </span>

                  <h3 className="text-2xl md:text-3xl font-black text-white mb-3 group-hover:text-blue-300 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-slate-200 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs font-mono px-2 py-0.5 bg-slate-900 text-slate-300 rounded border border-slate-700">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* github */}
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

                {/* right: stats panel */}
                <div className="flex flex-row md:flex-col gap-4 md:gap-6 md:w-36 justify-center md:justify-start md:pt-8 md:border-l md:border-slate-700 md:pl-6">
                  {project.stats.map((stat, i) => (
                    <div key={i} className="text-center md:text-left">
                      <p className={`text-xl md:text-2xl font-black bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
                        {stat.value}
                      </p>
                      <p className="text-xs text-slate-300 mt-0.5">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* hover glow border */}
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
