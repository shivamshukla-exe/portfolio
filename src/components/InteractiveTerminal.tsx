import { useEffect, useRef, useState, KeyboardEvent } from 'react';

interface TerminalLine {
  type: 'input' | 'output' | 'header' | 'error';
  text: string;
}

const AUTO_COMMANDS = [
  { input: 'whoami', output: 'Shivam Shukla — AI/ML Engineer & Full Stack Developer\nGhaziabad, India | shivamshukla2003@gmail.com' },
  { input: 'cat experience.txt', output: `[Jul 2024 – present]  AI/ML Intern @ BISAG-N / MeitY (Govt. of India)
  → Rooftop segmentation on satellite imagery (DeepLabV3+)
  → Part of PM Gatishakti national infrastructure initiative
  → ~15% mIoU improvement over baseline U-Net

[May – Jul 2024]  Data Science Intern @ Unified Mentor
  → End-to-end ML pipelines, classification & regression
  → Dashboards with Tableau and Power BI` },
  { input: 'cat skills.py', output: `skills = {
  "languages":  ["Python", "JavaScript", "SQL", "R", "Java"],
  "ml_dl":      ["TensorFlow", "PyTorch", "Keras", "Scikit-learn", "XGBoost"],
  "nlp_llm":    ["Transformers", "BART", "Phi-3", "LangChain", "RAG"],
  "timeseries": ["SARIMA", "ARIMA", "Prophet"],
  "web":        ["React", "Flask", "Django", "FastAPI"],
  "tools":      ["Docker", "Git", "Selenium", "Tableau", "Power BI"],
}` },
  { input: 'git log --oneline', output: `d3a91fc (HEAD) Patent filed: Emotion-Driven Playlist Generator
b7c42e1 Deployed: PM Gatishakti rooftop segmentation (BISAG-N)
f1d88a0 Shipped: Offline AI Chatbot — BART + Phi-3 + Flask + React
9e23b6d Internship: Data Science pipelines @ Unified Mentor
2a10c7d Init: B.Tech AI/ML @ AKGEC (CGPA 7.88)` },
];

const COMMAND_RESPONSES: Record<string, string> = {
  help: `available commands:
  whoami          — who I am
  cat skills.py   — tech stack
  cat experience.txt — work history
  cat certs.txt   — certifications
  git log --oneline — project history
  contact         — get in touch
  clear           — clear terminal`,
  'cat certs.txt': `✓ IBM — Exploratory Data Analysis for ML
✓ IBM — Supervised ML: Regression
✓ Great Learning — Machine Learning with Python`,
  contact: `email    shivamshukla2003@gmail.com
github   github.com/shivamshukla2003
linkedin linkedin.com/in/shivam-shukla
location Ghaziabad, India`,
  whoami: 'Shivam Shukla — AI/ML Engineer & Full Stack Developer\nGhaziabad, India | shivamshukla2003@gmail.com',
  'cat skills.py': `skills = {
  "languages":  ["Python", "JavaScript", "SQL", "R", "Java"],
  "ml_dl":      ["TensorFlow", "PyTorch", "Keras", "Scikit-learn", "XGBoost"],
  "nlp_llm":    ["Transformers", "BART", "Phi-3", "LangChain", "RAG"],
  "timeseries": ["SARIMA", "ARIMA", "Prophet"],
  "web":        ["React", "Flask", "Django", "FastAPI"],
  "tools":      ["Docker", "Git", "Selenium", "Tableau", "Power BI"],
}`,
  'cat experience.txt': `[Jul 2024 – present]  AI/ML Intern @ BISAG-N / MeitY (Govt. of India)
  → Rooftop segmentation on satellite imagery (DeepLabV3+)
  → Part of PM Gatishakti national infrastructure initiative
  → ~15% mIoU improvement over baseline U-Net

[May – Jul 2024]  Data Science Intern @ Unified Mentor
  → End-to-end ML pipelines, classification & regression
  → Dashboards with Tableau and Power BI`,
  'git log --oneline': `d3a91fc (HEAD) Patent filed: Emotion-Driven Playlist Generator
b7c42e1 Deployed: PM Gatishakti rooftop segmentation (BISAG-N)
f1d88a0 Shipped: Offline AI Chatbot — BART + Phi-3 + Flask + React
9e23b6d Internship: Data Science pipelines @ Unified Mentor
2a10c7d Init: B.Tech AI/ML @ AKGEC (CGPA 7.88)`,
  ls: 'projects/   experience/   skills.py   certs.txt   readme.md',
  pwd: '/home/shivam',
  date: new Date().toDateString(),
};

export default function InteractiveTerminal() {
  const linesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [displayedLines, setDisplayedLines] = useState<TerminalLine[]>([
    { type: 'header', text: 'shivam_shell v1.0.0  —  type "help" for commands' },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [autoRunDone, setAutoRunDone] = useState(false);

  // auto-run intro sequence once
  useEffect(() => {
    if (autoRunDone) return;
    setAutoRunDone(true);

    const run = async () => {
      for (const cmd of AUTO_COMMANDS) {
        await new Promise(r => setTimeout(r, 900));
        setDisplayedLines(prev => [...prev, { type: 'input', text: `$ ${cmd.input}` }]);
        await new Promise(r => setTimeout(r, 500));
        setDisplayedLines(prev => [...prev, { type: 'output', text: cmd.output }]);
      }
    };
    run();
  }, []);

  // auto-scroll
  useEffect(() => {
    if (linesRef.current) {
      linesRef.current.scrollTop = linesRef.current.scrollHeight;
    }
  }, [displayedLines]);

  const runCommand = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === 'clear') {
      setDisplayedLines([{ type: 'header', text: 'shivam_shell v1.0.0  —  type "help" for commands' }]);
      return;
    }

    setDisplayedLines(prev => [...prev, { type: 'input', text: `$ ${raw.trim()}` }]);

    const response = COMMAND_RESPONSES[cmd];
    if (response) {
      setDisplayedLines(prev => [...prev, { type: 'output', text: response }]);
    } else {
      setDisplayedLines(prev => [...prev, {
        type: 'error',
        text: `command not found: ${cmd}\ntype "help" to see available commands`,
      }]);
    }
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const val = inputVal.trim();
      if (val) {
        setHistory(prev => [val, ...prev]);
        setHistoryIdx(-1);
      }
      runCommand(val);
      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(historyIdx + 1, history.length - 1);
      setHistoryIdx(next);
      setInputVal(history[next] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.max(historyIdx - 1, -1);
      setHistoryIdx(next);
      setInputVal(next === -1 ? '' : history[next]);
    }
  };

  return (
    <section className="relative py-24 px-6 bg-black overflow-hidden min-h-screen flex items-center">
      {/* grid bg */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="tgrid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(59,130,246,0.15)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#tgrid)" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto relative z-10 w-full">
        <div className="mb-10">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-2">Terminal</h2>
          <p className="text-slate-500 font-mono text-sm">interactive — try typing a command</p>
        </div>

        <div
          className="bg-[#0d1117] border border-slate-700 rounded-xl overflow-hidden shadow-2xl"
          onClick={() => inputRef.current?.focus()}
        >
          {/* title bar */}
          <div className="px-4 py-3 flex items-center gap-2 border-b border-slate-800 bg-slate-900">
            <div className="w-3 h-3 bg-red-500/80 rounded-full" />
            <div className="w-3 h-3 bg-yellow-500/80 rounded-full" />
            <div className="w-3 h-3 bg-green-500/80 rounded-full" />
            <span className="ml-3 text-slate-500 text-xs font-mono">shivam@bisag-n  ~/profile</span>
          </div>

          {/* output */}
          <div
            ref={linesRef}
            className="font-mono text-sm p-5 overflow-y-auto h-80 space-y-0.5 cursor-text"
            style={{ background: '#0d1117' }}
          >
            {displayedLines.map((line, idx) => (
              <div key={idx} className={
                line.type === 'input'  ? 'text-cyan-400' :
                line.type === 'header' ? 'text-green-500 mb-2' :
                line.type === 'error'  ? 'text-red-400' :
                'text-slate-300'
              }>
                <pre className="whitespace-pre-wrap text-xs leading-relaxed font-mono">{line.text}</pre>
              </div>
            ))}

            {/* live input line */}
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono pt-1">
              <span>$</span>
              <input
                ref={inputRef}
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                onKeyDown={handleKey}
                className="flex-1 bg-transparent outline-none text-cyan-400 caret-cyan-400 placeholder-slate-600"
                placeholder="type a command..."
                autoComplete="off"
                spellCheck={false}
              />
            </div>
          </div>
        </div>

        {/* hint chips */}
        <div className="flex flex-wrap gap-2 mt-5">
          {['help', 'cat skills.py', 'cat experience.txt', 'git log --oneline', 'contact'].map(cmd => (
            <button
              key={cmd}
              onClick={() => { runCommand(cmd); inputRef.current?.focus(); }}
              className="text-xs font-mono px-3 py-1 bg-slate-800 text-slate-400 rounded border border-slate-700 hover:border-blue-500/60 hover:text-blue-400 transition-all duration-200"
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
