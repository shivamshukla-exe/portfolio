import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Github, ExternalLink, ChevronRight, ChevronDown, FileCode, Folder, FolderOpen } from 'lucide-react';

interface CodeSnippet {
  file: string;       // filename shown in tab + tree
  path: string;       // full tree path shown in breadcrumb
  language: string;
  github: string;
  description: string;
  code: string;
  highlights: number[];
}

const SNIPPETS: CodeSnippet[] = [
  {
    file: 'chatbot.py',
    path: 'shivam/projects/ai-chatbot/chatbot.py',
    language: 'python',
    github: 'https://github.com/shivamshukla-exe/portfolio',
    description: 'Offline LLM chatbot — BART summariser + Phi-3 via Ollama, Flask backend',
    code: `# shivam/projects/ai-chatbot/chatbot.py
from flask import Flask, request, jsonify
from transformers import pipeline
import ollama

app = Flask(__name__)
summariser = pipeline("summarization",
                      model="facebook/bart-large-cnn")

@app.route("/chat", methods=["POST"])
def chat():
    user_msg = request.json.get("message", "")
    # Summarise long context before passing to LLM
    if len(user_msg.split()) > 200:
        user_msg = summariser(
            user_msg, max_length=130
        )[0]["summary_text"]

    response = ollama.chat(
        model="phi3",
        messages=[{"role": "user", "content": user_msg}]
    )
    return jsonify({"reply": response["message"]["content"]})`,
    highlights: [1, 9, 13, 17, 21],
  },
  {
    file: 'segment.py',
    path: 'shivam/projects/pm-gatishakti/segment.py',
    language: 'python',
    github: 'https://github.com/shivamshukla-exe/Change_Detection',
    description: 'DeepLabV3+ rooftop segmentation on satellite tiles — BISAG-N / MeitY',
    code: `# shivam/projects/pm-gatishakti/segment.py
import torch
from torchvision.models.segmentation import deeplabv3_resnet101

model = deeplabv3_resnet101(pretrained=False, num_classes=2)
model.load_state_dict(torch.load("rooftop_seg.pth"))
model.eval()

def segment_rooftop(tile_tensor):
    """Infer rooftop mask. Returns (mask, coverage_pct)."""
    with torch.no_grad():
        out = model(tile_tensor)["out"]
    mask = out.argmax(1).squeeze().numpy()
    # 0 = background, 1 = rooftop
    coverage = (mask == 1).sum() / mask.size * 100
    return mask, round(coverage, 2)

# mIoU improved ~15% over baseline U-Net`,
    highlights: [1, 9, 11, 15, 18],
  },
  {
    file: 'detect.py',
    path: 'shivam/projects/change-detection/detect.py',
    language: 'python',
    github: 'https://github.com/shivamshukla-exe/Change_Detection',
    description: 'Before/after satellite image diff — structural changes, encroachments',
    code: `# shivam/projects/change-detection/detect.py
import cv2, numpy as np

def detect_changes(img_before, img_after,
                   threshold=30, min_area=200):
    """Align, normalise, diff, filter noise."""
    # Colour-normalise both frames
    b = cv2.cvtColor(img_before, cv2.COLOR_BGR2LAB)
    a = cv2.cvtColor(img_after,  cv2.COLOR_BGR2LAB)

    diff = cv2.absdiff(b, a)
    gray = cv2.cvtColor(diff, cv2.COLOR_LAB2BGR)
    gray = cv2.cvtColor(gray, cv2.COLOR_BGR2GRAY)

    _, binary = cv2.threshold(gray, threshold,
                               255, cv2.THRESH_BINARY)
    # Remove noise by minimum contour area
    contours, _ = cv2.findContours(
        binary, cv2.RETR_EXTERNAL,
        cv2.CHAIN_APPROX_SIMPLE
    )
    return [c for c in contours
            if cv2.contourArea(c) >= min_area]`,
    highlights: [1, 4, 7, 14, 17],
  },
  {
    file: 'emotion.py',
    path: 'shivam/projects/emotion-playlist/emotion.py',
    language: 'python',
    github: 'https://github.com/shivamshukla-exe/Emotion-Driven-Playlist-Generator',
    description: 'NLP emotion detection → Spotify playlist — Patent filed',
    code: `# shivam/projects/emotion-playlist/emotion.py
from transformers import pipeline as hf_pipeline
import spotipy

EMOTIONS = ["happy","sad","angry","anxious",
            "surprised","neutral"]

clf = hf_pipeline(
    "text-classification",
    model="j-hartmann/emotion-english-distilroberta-base",
    return_all_scores=True,
)

def detect_and_play(text: str, sp: spotipy.Spotify):
    """Detect dominant emotion and queue a playlist."""
    scores = clf(text)[0]
    dominant = max(scores, key=lambda x: x["score"])
    emotion  = dominant["label"].lower()

    results = sp.search(
        q=f"{emotion} mood", type="playlist", limit=1
    )
    playlist = results["playlists"]["items"][0]
    sp.start_playback(context_uri=playlist["uri"])
    return emotion, playlist["name"]
# Patent application filed — 3-modality fusion`,
    highlights: [1, 8, 13, 16, 20],
  },
  {
    file: 'sarima_model.py',
    path: 'shivam/projects/crime-prediction/sarima_model.py',
    language: 'python',
    github: 'https://github.com/shivamshukla-exe/Crime-Prediction-using-SARIMA-modelling',
    description: 'SARIMA crime forecasting — 167 police stations, 30-day horizon',
    code: `# shivam/projects/crime-prediction/sarima_model.py
import pandas as pd
from pmdarima import auto_arima

def fit_district_model(df: pd.DataFrame,
                        district: str,
                        crime_type: str):
    """Auto-optimise SARIMA per district × crime type."""
    series = (df
        .query("district == @district and type == @crime_type")
        .set_index("date")["count"]
        .asfreq("MS")
        .fillna(0)
    )
    model = auto_arima(
        series,
        seasonal=True, m=12,
        information_criterion="aic",
        suppress_warnings=True,
    )
    forecast = model.predict(n_periods=30)
    return pd.Series(forecast,
                     name=f"{district}_{crime_type}")
# 167 stations • 13 charts • Plotly Dash + React-Leaflet`,
    highlights: [1, 6, 9, 14, 21],
  },
];

// tree structure
const TREE = [
  {
    name: 'shivam', type: 'root', open: true,
    children: [
      {
        name: 'projects', type: 'folder', open: true,
        children: [
          { name: 'ai-chatbot',       type: 'folder', file: 'chatbot.py',      idx: 0 },
          { name: 'pm-gatishakti',    type: 'folder', file: 'segment.py',      idx: 1 },
          { name: 'change-detection', type: 'folder', file: 'detect.py',       idx: 2 },
          { name: 'emotion-playlist', type: 'folder', file: 'emotion.py',      idx: 3 },
          { name: 'crime-prediction', type: 'folder', file: 'sarima_model.py', idx: 4 },
        ],
      },
    ],
  },
];

export default function CodeShowcase() {
  const [active, setActive] = useState(0);
  const [openFolders, setOpenFolders] = useState<Set<string>>(
    new Set(['shivam', 'projects', 'ai-chatbot'])
  );
  const codeRef = useRef<HTMLPreElement>(null);
  const current = SNIPPETS[active];

  const toggleFolder = (name: string) => {
    setOpenFolders(prev => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  };

  const selectFile = (idx: number, folderName: string) => {
    setActive(idx);
    setOpenFolders(prev => new Set([...prev, folderName]));
  };

  useEffect(() => {
    if (!codeRef.current) return;
    gsap.fromTo(codeRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
    );
  }, [active]);

  return (
    <section className="relative py-24 px-4 md:px-6 bg-[#0d1117] overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">

        {/* heading */}
        <div className="mb-10">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-2">Code I've Written</h2>
          <div className="w-14 h-1 bg-blue-500 mb-3" />
          <p className="text-slate-500 font-mono text-sm">~/shivam/projects — 5 repos</p>
        </div>

        {/* IDE shell */}
        <div className="rounded-xl overflow-hidden border border-slate-700/60 shadow-2xl"
             style={{ boxShadow: '0 0 60px rgba(59,130,246,0.12)' }}>

          {/* title bar */}
          <div className="flex items-center gap-2 px-4 py-2.5 bg-[#161b22] border-b border-slate-700/60">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-4 text-slate-500 text-xs font-mono flex-1 text-center">
              shivam@bisag-n  —  {current.path}
            </span>
          </div>

          {/* tab bar */}
          <div className="flex items-center bg-[#0d1117] border-b border-slate-700/60 overflow-x-auto">
            {SNIPPETS.map((s, i) => (
              <button
                key={i}
                onClick={() => selectFile(i, s.path.split('/')[2])}
                className={`flex items-center gap-1.5 px-4 py-2 text-xs font-mono whitespace-nowrap border-r border-slate-700/40 transition-colors duration-150 ${
                  active === i
                    ? 'bg-[#0d1117] text-white border-t-2 border-t-blue-500'
                    : 'bg-[#161b22] text-slate-500 hover:text-slate-300'
                }`}
              >
                <FileCode className="w-3 h-3" />
                {s.file}
              </button>
            ))}
          </div>

          {/* body: file tree + editor */}
          <div className="flex" style={{ minHeight: '480px' }}>

            {/* file tree sidebar */}
            <div className="w-52 flex-shrink-0 bg-[#0d1117] border-r border-slate-700/40 py-3 overflow-y-auto text-xs font-mono">
              <p className="text-slate-600 uppercase tracking-widest text-[10px] px-4 mb-2">Explorer</p>

              {/* root */}
              <div>
                <button
                  onClick={() => toggleFolder('shivam')}
                  className="flex items-center gap-1 px-3 py-0.5 w-full text-left text-slate-300 hover:bg-slate-800/50"
                >
                  {openFolders.has('shivam')
                    ? <ChevronDown className="w-3 h-3 text-slate-500" />
                    : <ChevronRight className="w-3 h-3 text-slate-500" />}
                  <FolderOpen className="w-3.5 h-3.5 text-yellow-400" />
                  <span>shivam</span>
                </button>

                {openFolders.has('shivam') && (
                  <div className="pl-4">
                    <button
                      onClick={() => toggleFolder('projects')}
                      className="flex items-center gap-1 px-3 py-0.5 w-full text-left text-slate-300 hover:bg-slate-800/50"
                    >
                      {openFolders.has('projects')
                        ? <ChevronDown className="w-3 h-3 text-slate-500" />
                        : <ChevronRight className="w-3 h-3 text-slate-500" />}
                      <FolderOpen className="w-3.5 h-3.5 text-yellow-400" />
                      <span>projects</span>
                    </button>

                    {openFolders.has('projects') && (
                      <div className="pl-4">
                        {SNIPPETS.map((s, i) => {
                          const folder = s.path.split('/')[2];
                          const isActive = active === i;
                          const isOpen = openFolders.has(folder);
                          return (
                            <div key={i}>
                              <button
                                onClick={() => toggleFolder(folder)}
                                className={`flex items-center gap-1 px-3 py-0.5 w-full text-left hover:bg-slate-800/50 ${
                                  isActive ? 'text-blue-400' : 'text-slate-400'
                                }`}
                              >
                                {isOpen
                                  ? <ChevronDown className="w-3 h-3 text-slate-600" />
                                  : <ChevronRight className="w-3 h-3 text-slate-600" />}
                                {isOpen
                                  ? <FolderOpen className="w-3.5 h-3.5 text-blue-400/70" />
                                  : <Folder className="w-3.5 h-3.5 text-blue-400/50" />}
                                <span className="truncate">{folder}</span>
                              </button>

                              {isOpen && (
                                <button
                                  onClick={() => selectFile(i, folder)}
                                  className={`flex items-center gap-1.5 pl-10 pr-3 py-0.5 w-full text-left hover:bg-slate-800/50 ${
                                    isActive
                                      ? 'text-white bg-blue-600/20'
                                      : 'text-slate-500 hover:text-slate-300'
                                  }`}
                                >
                                  <FileCode className="w-3 h-3 flex-shrink-0" />
                                  <span className="truncate">{s.file}</span>
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* editor panel */}
            <div className="flex-1 flex flex-col overflow-hidden bg-[#0d1117]">

              {/* breadcrumb + description bar */}
              <div className="flex items-center justify-between px-4 py-2 border-b border-slate-700/40 bg-[#161b22]">
                <span className="text-slate-500 text-xs font-mono truncate">
                  {current.path}
                </span>
                <a
                  href={current.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs font-mono text-slate-500 hover:text-blue-400 transition-colors flex-shrink-0 ml-4"
                >
                  <Github className="w-3 h-3" />
                  <span>open repo</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>

              {/* description strip */}
              <div className="px-4 py-1.5 bg-[#0d1117] border-b border-slate-800">
                <span className="text-slate-600 text-xs font-mono">// {current.description}</span>
              </div>

              {/* code */}
              <pre
                ref={codeRef}
                className="flex-1 overflow-auto p-5 text-xs leading-relaxed font-mono text-slate-300"
                style={{
                  background: '#0d1117',
                  backgroundImage: 'repeating-linear-gradient(0deg, rgba(59,130,246,0.025) 0px, rgba(59,130,246,0.025) 1px, transparent 1px, transparent 20px)',
                }}
              >
                {current.code.split('\n').map((line, i) => (
                  <div
                    key={i}
                    className={`flex transition-colors duration-200 ${
                      current.highlights.includes(i + 1)
                        ? 'bg-blue-500/10 border-l-2 border-blue-500/60'
                        : ''
                    }`}
                  >
                    {/* line number */}
                    <span className="select-none text-slate-700 text-right pr-5"
                          style={{ minWidth: '2.5rem' }}>
                      {i + 1}
                    </span>
                    {/* code line with basic syntax colouring */}
                    <span className={syntaxColor(line)}>
                      {line || ' '}
                    </span>
                  </div>
                ))}
              </pre>

              {/* status bar */}
              <div className="flex items-center justify-between px-4 py-1 bg-[#161b22] border-t border-slate-700/40 text-[10px] font-mono text-slate-600">
                <span>Python · UTF-8 · LF</span>
                <span className="text-blue-500/70">{current.file}</span>
                <span>{current.code.split('\n').length} lines</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Minimal syntax tinting — keywords, comments, strings */
function syntaxColor(line: string): string {
  if (line.trim().startsWith('#')) return 'text-slate-500 italic';
  if (/^\s*(def |class |import |from |return |with |if |for |while )/.test(line))
    return 'text-purple-300';
  if (/"[^"]*"|'[^']*'/.test(line)) return 'text-green-300/90';
  return 'text-slate-300';
}
