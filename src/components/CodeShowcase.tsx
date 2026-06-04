import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface CodeSnippet {
  title: string;
  language: string;
  code: string;
  highlights: number[];
}

export default function CodeShowcase() {
  const [activeSnippet, setActiveSnippet] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLPreElement>(null);

  const snippets: CodeSnippet[] = [
    {
      title: 'AI Chatbot — Offline LLM',
      language: 'python',
      code: `# Flask backend — BART summariser + Phi-3 chat
from flask import Flask, request, jsonify
from transformers import pipeline
import ollama

app = Flask(__name__)
summariser = pipeline("summarization", model="facebook/bart-large-cnn")

@app.route("/chat", methods=["POST"])
def chat():
    user_msg = request.json.get("message", "")
    # Summarise long context before passing to LLM
    if len(user_msg.split()) > 200:
        user_msg = summariser(user_msg, max_length=130)[0]["summary_text"]

    response = ollama.chat(
        model="phi3",
        messages=[{"role": "user", "content": user_msg}]
    )
    return jsonify({"reply": response["message"]["content"]})`,
      highlights: [1, 9, 11, 13, 16],
    },
    {
      title: 'PM Gatishakti — Rooftop Segmentation',
      language: 'python',
      code: `# DeepLabV3+ inference on satellite tiles (BISAG-N)
import torch
from torchvision.models.segmentation import deeplabv3_resnet101

model = deeplabv3_resnet101(pretrained=False, num_classes=2)
model.load_state_dict(torch.load("rooftop_seg.pth"))
model.eval()

def segment_rooftop(tile_tensor):
    with torch.no_grad():
        output = model(tile_tensor)["out"]
    mask = output.argmax(1).squeeze().numpy()
    # mask: 0 = background, 1 = rooftop
    coverage = (mask == 1).sum() / mask.size * 100
    return mask, round(coverage, 2)

# Improved mIoU by ~15% over baseline U-Net`,
      highlights: [1, 8, 10, 13, 16],
    },
    {
      title: 'Emotion Playlist — Multimodal',
      language: 'python',
      code: `# Fuse audio + video + text emotion scores → Spotify playlist
from transformers import pipeline as hf_pipeline
import librosa, spotipy

text_clf   = hf_pipeline("text-classification", model="j-hartmann/emotion-english-distilroberta-base")
audio_clf  = lambda path: extract_valence_arousal(librosa.load(path))
video_clf  = lambda frame: fer_model.predict(frame)

def fuse_emotions(text, audio_path, video_frame):
    scores = {
        "text":  text_clf(text)[0],
        "audio": audio_clf(audio_path),
        "video": video_clf(video_frame),
    }
    # Weighted ensemble — 20% lower CPU vs single-modal loop
    dominant = max(scores, key=lambda k: scores[k]["score"])
    return dominant

# Patent application filed — 3-modality fusion`,
      highlights: [1, 7, 9, 14, 17],
    },
  ];

  const current = snippets[activeSnippet];

  useEffect(() => {
    if (codeRef.current) {
      gsap.fromTo(
        codeRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );
    }
  }, [activeSnippet]);

  return (
    <section className="relative py-24 px-6 bg-gradient-to-b from-slate-900 to-black overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/5 via-transparent to-transparent"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
            Code I've Written
          </h2>
          <p className="text-slate-400">Snippets from real projects — chatbot, satellite segmentation, emotion AI</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {snippets.map((snippet, i) => (
            <button
              key={i}
              onClick={() => setActiveSnippet(i)}
              className={`p-4 rounded-lg border-2 transition-all duration-300 text-left group ${
                activeSnippet === i
                  ? 'border-blue-500 bg-blue-500/20 shadow-lg shadow-blue-500/30'
                  : 'border-slate-700 bg-slate-800/50 hover:border-blue-500/50 hover:bg-slate-800'
              }`}
            >
              <p className="font-semibold text-white group-hover:text-cyan-300 transition-colors">
                {snippet.title}
              </p>
              <p className="text-xs text-slate-400 mt-1">{snippet.language}</p>
            </button>
          ))}
        </div>

        <div
          ref={containerRef}
          className="relative bg-black border-2 border-blue-500/50 rounded-xl overflow-hidden shadow-2xl"
          style={{ boxShadow: '0 0 60px rgba(59, 130, 246, 0.3)' }}
        >
          <div className="bg-gradient-to-r from-slate-900 to-blue-900/20 px-4 py-3 flex items-center justify-between border-b border-blue-500/30">
            <span className="text-slate-400 text-xs font-mono flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              {current.language}
            </span>
            <span className="text-slate-500 text-xs">{current.title}</span>
          </div>

          <pre
            ref={codeRef}
            className="font-mono text-sm p-6 overflow-x-auto bg-black text-slate-300 leading-relaxed max-h-96"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, rgba(59, 130, 246, 0.03) 0px, rgba(59, 130, 246, 0.03) 1px, transparent 1px, transparent 2px)',
            }}
          >
            {current.code.split('\n').map((line, i) => (
              <div
                key={i}
                className={`transition-all duration-300 ${
                  current.highlights.includes(i + 1)
                    ? 'bg-blue-500/20 text-cyan-300 pl-2'
                    : ''
                }`}
              >
                <span className="text-slate-600 mr-4 select-none">{String(i + 1).padStart(2, ' ')}</span>
                {line}
              </div>
            ))}
          </pre>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {[
            { emoji: '🏛️', title: 'BISAG-N / MeitY', desc: 'Government-scale AI deployment on satellite imagery' },
            { emoji: '📜', title: 'Patent Filed', desc: 'Multimodal emotion detection — audio, video & text' },
            { emoji: '🤗', title: 'Hugging Face', desc: 'BART, DistilRoBERTa, Phi-3 — offline-first LLM stack' },
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-lg hover:border-blue-400/60 transition-all duration-300 hover:scale-105"
            >
              <div className="text-3xl mb-3">{item.emoji}</div>
              <p className="font-bold text-white mb-2">{item.title}</p>
              <p className="text-slate-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
