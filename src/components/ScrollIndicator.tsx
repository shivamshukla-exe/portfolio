import { useEffect, useRef, useState } from 'react';

export default function ScrollIndicator() {
  const progressRef = useRef<HTMLDivElement>(null);
  const [scrollPct, setScrollPct] = useState(0);

  const SIZE = 44;
  const STROKE = 2.5;
  const R = (SIZE - STROKE) / 2;
  const CIRC = 2 * Math.PI * R;

  useEffect(() => {
    const update = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(window.scrollY / docHeight, 1) : 0;
      setScrollPct(pct);

      if (progressRef.current) {
        progressRef.current.style.width = `${pct * 100}%`;
      }
    };

    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  const dashOffset = CIRC * (1 - scrollPct);
  const pctLabel   = Math.round(scrollPct * 100);

  return (
    <>
      {/* top progress bar */}
      <div
        ref={progressRef}
        className="fixed top-0 left-0 h-[2px] bg-blue-500 z-[100] transition-none"
        style={{ width: '0%', boxShadow: '0 0 8px rgba(96,165,250,0.5)' }}
      />

      {/* arc indicator — top right */}
      <div
        className="fixed top-6 right-6 z-[100]"
        title={`${pctLabel}% read`}
      >
        <svg
          width={SIZE}
          height={SIZE}
          style={{ transform: 'rotate(-90deg)' }}
        >
          {/* track */}
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={R}
            fill="none"
            stroke="rgba(148,163,184,0.12)"
            strokeWidth={STROKE}
          />
          {/* fill arc */}
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={R}
            fill="none"
            stroke="#60a5fa"
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={CIRC}
            strokeDashoffset={dashOffset}
            style={{ transition: 'stroke-dashoffset 0.15s ease-out' }}
          />
        </svg>

        {/* percentage label centred inside the arc */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="font-mono text-slate-400 select-none"
            style={{ fontSize: '9px', letterSpacing: '-0.02em' }}
          >
            {pctLabel > 0 ? `${pctLabel}%` : ''}
          </span>
        </div>
      </div>
    </>
  );
}
