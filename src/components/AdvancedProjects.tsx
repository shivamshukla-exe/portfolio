import { useEffect, useRef, useState } from 'react';
import { Github, ExternalLink } from 'lucide-react';

export default function AdvancedProjects() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleCards, setVisibleCards] = useState<boolean[]>([false, false, false]);

  const projects = [
    {
      title: 'AI Chatbot',
      subtitle: 'Offline LLM — BART + Phi-3',
      description: 'Conversational AI that runs fully offline. BART summarises long inputs; Phi-3 handles chat via Ollama. React frontend, Flask backend, no cloud dependency.',
      gradient: 'from-blue-500 to-cyan-500',
      github: 'https://github.com/shivamshukla2003',
      tags: ['Python', 'Flask', 'React', 'Ollama', 'BART'],
      stats: [
        { label: 'Stack', value: 'Flask' },
        { label: 'LLMs', value: '2' },
        { label: 'Mode', value: 'Offline' },
      ],
    },
    {
      title: 'PM Gatishakti',
      subtitle: 'Satellite Rooftop Segmentation',
      description: 'Built at BISAG-N for MeitY. DeepLabV3+ model segments rooftop areas from satellite tiles for the national infrastructure initiative. ~15% mIoU improvement over baseline.',
      gradient: 'from-green-500 to-emerald-500',
      github: 'https://github.com/shivamshukla2003',
      tags: ['PyTorch', 'DeepLabV3+', 'OpenCV', 'NumPy'],
      stats: [
        { label: 'mIoU gain', value: '+15%' },
        { label: 'Model', value: 'DLv3+' },
        { label: 'Client', value: 'Govt.' },
      ],
    },
    {
      title: 'Emotion Playlist',
      subtitle: 'Multimodal — Patent Filed',
      description: 'Detects emotion from audio, video, and text simultaneously, then curates a Spotify playlist to match or lift the mood. 20% CPU reduction via optimised fusion loop.',
      gradient: 'from-purple-500 to-pink-500',
      github: 'https://github.com/shivamshukla2003',
      tags: ['Transformers', 'Librosa', 'Spotify API', 'FastAPI'],
      stats: [
        { label: 'Modalities', value: '3' },
        { label: 'CPU saved', value: '20%' },
        { label: 'Status', value: 'Patent' },
      ],
    },
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // staggered reveal on scroll
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
            }, i * 150);
          }
        },
        { threshold: 0.1 }
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
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div
          className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl transition-all duration-500"
          style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px`, transform: 'translate(-50%, -50%)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16">
          <h2 className="text-5xl md:text-7xl font-black text-white mb-4">Projects</h2>
          <div className="w-16 h-1 bg-blue-500 mb-4"></div>
          <p className="text-slate-400">From a government satellite pipeline to a patent-filed emotion engine</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              ref={el => { cardRefs.current[index] = el; }}
              className={`relative rounded-2xl overflow-hidden cursor-pointer group bg-slate-800 border border-slate-700 transition-all duration-700 ${
                visibleCards[index]
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* colour accent top bar */}
              <div className={`h-1 w-full bg-gradient-to-r ${project.gradient}`} />

              <div className="p-7 flex flex-col h-full min-h-[320px]">
                {/* header */}
                <div className="mb-4">
                  <span className={`inline-block text-xs font-mono px-2 py-0.5 rounded bg-gradient-to-r ${project.gradient} bg-opacity-20 text-white mb-3`}>
                    {project.subtitle}
                  </span>
                  <h3 className="text-2xl font-black text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* tech tags */}
                <div className="flex flex-wrap gap-1.5 mb-6 mt-auto">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-xs font-mono px-2 py-0.5 bg-slate-900 text-slate-400 rounded border border-slate-700">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* stats row — slides up on hover */}
                <div
                  className={`grid grid-cols-3 gap-3 border-t border-slate-700 pt-4 mb-4 transition-all duration-300 ${
                    hoveredIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
                  }`}
                >
                  {project.stats.map((stat, i) => (
                    <div key={i} className="text-center">
                      <p className={`text-lg font-black bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
                        {stat.value}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* GitHub link */}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-all duration-300 ${
                    hoveredIndex === index ? 'opacity-100' : 'opacity-0'
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
                  hoveredIndex === index ? 'border-blue-500/50' : 'border-transparent'
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
