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

export default function AdvancedProjects() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleCards, setVisibleCards] = useState<boolean[]>(projects.map(() => false));

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const observers = cardRefs.current.map((card, i) => {
      if (!card) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleCards(prev => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }, i * 120);
          }
        },
        { threshold: 0.08 }
      );
      obs.observe(card);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative py-24 px-6 bg-slate-900 overflow-hidden"
    >
      {/* ambient cursor glow */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div
          className="absolute w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl transition-all duration-700"
          style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px`, transform: 'translate(-50%, -50%)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* heading */}
        <div className="mb-16">
          <h2 className="text-5xl md:text-7xl font-black text-white mb-4">Projects</h2>
          <div className="w-16 h-1 bg-blue-500 mb-4" />
          <p className="text-slate-400">
            Crime forecasting for police, satellite segmentation for govt., emotion-driven music — and more.
          </p>
        </div>

        {/* top row — 3 cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {projects.slice(0, 3).map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              index={index}
              hovered={hoveredIndex === index}
              visible={visibleCards[index]}
              cardRef={el => { cardRefs.current[index] = el; }}
              onEnter={() => setHoveredIndex(index)}
              onLeave={() => setHoveredIndex(null)}
            />
          ))}
        </div>

        {/* bottom row — 2 cards centred */}
        <div className="grid md:grid-cols-2 gap-6 md:w-2/3 mx-auto">
          {projects.slice(3).map((project, i) => {
            const index = i + 3;
            return (
              <ProjectCard
                key={index}
                project={project}
                index={index}
                hovered={hoveredIndex === index}
                visible={visibleCards[index]}
                cardRef={el => { cardRefs.current[index] = el; }}
                onEnter={() => setHoveredIndex(index)}
                onLeave={() => setHoveredIndex(null)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

interface CardProps {
  project: Project;
  index: number;
  hovered: boolean;
  visible: boolean;
  cardRef: (el: HTMLDivElement | null) => void;
  onEnter: () => void;
  onLeave: () => void;
}

function ProjectCard({ project, index, hovered, visible, cardRef, onEnter, onLeave }: CardProps) {
  return (
    <div
      ref={cardRef}
      className={`relative rounded-2xl overflow-hidden cursor-pointer group bg-slate-800 border border-slate-700 transition-all duration-700 flex flex-col ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* top accent bar */}
      <div className={`h-[3px] w-full bg-gradient-to-r ${project.gradient} flex-shrink-0`} />

      <div className="p-7 flex flex-col flex-1">
        {/* subtitle badge */}
        <span className={`inline-block self-start text-xs font-mono px-2 py-0.5 rounded mb-3 text-white bg-gradient-to-r ${project.gradient} opacity-90`}>
          {project.subtitle}
        </span>

        {/* title */}
        <h3 className="text-2xl font-black text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
          {project.title}
        </h3>

        {/* description */}
        <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-1">
          {project.description}
        </p>

        {/* tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.map(tag => (
            <span key={tag} className="text-xs font-mono px-2 py-0.5 bg-slate-900 text-slate-400 rounded border border-slate-700">
              {tag}
            </span>
          ))}
        </div>

        {/* stats — fade in on hover */}
        <div
          className={`grid grid-cols-3 gap-3 border-t border-slate-700 pt-4 mb-4 transition-all duration-300 ${
            hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
        >
          {project.stats.map((stat, i) => (
            <div key={i} className="text-center">
              <p className={`text-base font-black bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
                {stat.value}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* GitHub link — fade in on hover */}
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-2 text-slate-400 hover:text-white transition-all duration-200 ${
            hovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={e => e.stopPropagation()}
        >
          <Github className="w-4 h-4" />
          <span className="font-mono text-xs">View on GitHub</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* hover border glow */}
      <div
        className={`absolute inset-0 border-2 rounded-2xl pointer-events-none transition-all duration-300 ${
          hovered ? 'border-blue-500/40' : 'border-transparent'
        }`}
      />
    </div>
  );
}
