import { Code2, Zap, ArrowUp } from 'lucide-react';

export default function EnhancedFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-b from-slate-900 to-black overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/5 via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12 animate-fade-in-up">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-6 h-6 text-blue-400" />
              <h3 className="text-xl font-bold text-white">Shivam Shukla</h3>
            </div>
            <p className="text-slate-200 text-sm leading-relaxed">
              AI/ML engineer with a thing for solving real problems — satellite imagery, offline LLMs, and emotion-aware systems.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wide">Quick Links</h4>
            <ul className="space-y-2">
              {['About', 'Experience', 'Projects', 'Contact'].map((link, i) => (
                <li key={i}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-slate-200 hover:text-blue-400 transition-colors text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wide">Tech Stack</h4>
            <ul className="space-y-2">
              {['Python & ML/DL', 'React & Flask', 'NLP & LLMs', 'Data & Viz'].map((tech, i) => (
                <li key={i} className="text-slate-200 text-sm flex items-center gap-2">
                  <Code2 className="w-3 h-3 text-green-400" />
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-slate-300 text-sm">
            built by shivam, for shivam
          </p>

          <button
            onClick={scrollToTop}
            className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-white hover:shadow-lg hover:shadow-blue-500/50 transition-all hover:scale-110 active:scale-95"
          >
            <ArrowUp className="w-5 h-5" />
          </button>

          <p className="text-slate-300 text-sm">
            © 2025 Shivam Shukla. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
