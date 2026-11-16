import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Timer } from 'lucide-react';

export default function WarmupTimer({ jenisLatihan }) {
  const [duration, setDuration] = useState(600);
  const [timeLeft, setTimeLeft] = useState(600);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const intervalRef = useRef(null);

  const OPTIONS = [
    { label: '5 Min', seconds: 300, desc: 'Quick Mobility' },
    { label: '10 Min', seconds: 600, desc: 'Standar Gym' },
    { label: '15 Min', seconds: 900, desc: 'Full Dynamic Stretch' },
  ];

  const selectDuration = (sec) => {
    if (running) return;
    setDuration(sec);
    setTimeLeft(sec);
    setFinished(false);
  };

  useEffect(() => {
    if (running && timeLeft > 0) {
      intervalRef.current = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0 && running) {
      setRunning(false);
      setFinished(true);
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running, timeLeft]);

  const reset = () => {
    setRunning(false);
    setTimeLeft(duration);
    setFinished(false);
    clearInterval(intervalRef.current);
  };

  const mins = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const secs = String(timeLeft % 60).padStart(2, '0');
  const progress = timeLeft / duration;

  return (
    <div className="warmup-card">
      <div className="warmup-header">
        <Timer size={16} strokeWidth={1.5} />
        <span className="warmup-title">Pemanasan Sebelum Latihan</span>
      </div>

      {!running && !finished && (
        <div className="warmup-options">
          {OPTIONS.map(o => (
            <button
              key={o.seconds}
              className={`warmup-opt-btn${duration === o.seconds ? ' active' : ''}`}
              onClick={() => selectDuration(o.seconds)}
            >
              <span className="warmup-opt-label">{o.label}</span>
              <span className="warmup-opt-desc">{o.desc}</span>
            </button>
          ))}
        </div>
      )}

      <div className="warmup-ring-wrap">
        <svg className="warmup-ring" viewBox="0 0 120 120" width="120" height="120">
          <circle cx="60" cy="60" r="52" className="warmup-ring-bg" />
          <circle
            cx="60" cy="60" r="52"
            className="warmup-ring-fill"
            strokeDasharray={`${2 * Math.PI * 52}`}
            strokeDashoffset={`${2 * Math.PI * 52 * (1 - progress)}`}
            style={{ transition: 'stroke-dashoffset 1s linear', transform: 'rotate(-90deg)', transformOrigin: 'center' }}
          />
        </svg>
        <div className="warmup-time">
          {finished ? (
            <span className="warmup-done-text">Siap!</span>
          ) : (
            <span className="warmup-countdown">{mins}:{secs}</span>
          )}
        </div>
      </div>

      <div className="warmup-controls">
        {!finished ? (
          <>
            <button className="btn btn-secondary warmup-ctrl-btn" onClick={reset} aria-label="Reset">
              <RotateCcw size={15} strokeWidth={1.5} />
            </button>
            <button className="btn btn-primary warmup-ctrl-btn" onClick={() => setRunning(r => !r)}>
              {running ? <Pause size={16} strokeWidth={1.5} /> : <Play size={16} strokeWidth={1.5} />}
              {running ? 'Jeda' : 'Mulai'}
            </button>
          </>
        ) : (
          <div className="warmup-finish-msg">
            Pemanasan selesai. Otot siap beraksi!
          </div>
        )}
      </div>
    </div>
  );
}
