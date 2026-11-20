import { useState, useEffect, useRef } from 'react';
import { X, Plus } from 'lucide-react';

function playAlarm() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    [0, 0.3, 0.6].forEach((delay) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.value = 880;
      gain.gain.setValueAtTime(0.4, ctx.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.4);
      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + 0.4);
    });
  } catch (_) {}
}

export default function RestTimer({ onClose, onFinish }) {
  const DURATION = 300;
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [finished, setFinished] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(intervalRef.current);
          setFinished(true);
          playAlarm();
          if (onFinish) onFinish();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const addTime = () => setTimeLeft(t => t + 30);
  const mins = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const secs = String(timeLeft % 60).padStart(2, '0');
  const progress = timeLeft / DURATION;

  return (
    <div className={`rest-pill${finished ? ' rest-pill-done' : ''}`}>
      <div className="rest-pill-left">
        <svg width="36" height="36" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="14" className="rest-ring-bg" />
          <circle
            cx="18" cy="18" r="14"
            className="rest-ring-fill"
            strokeDasharray={`${2 * Math.PI * 14}`}
            strokeDashoffset={`${2 * Math.PI * 14 * (1 - progress)}`}
            style={{ transition: 'stroke-dashoffset 1s linear', transform: 'rotate(-90deg)', transformOrigin: 'center' }}
          />
        </svg>
      </div>
      <div className="rest-pill-center">
        {finished ? (
          <span className="rest-pill-label">Istirahat selesai. Lanjutkan!</span>
        ) : (
          <>
            <span className="rest-pill-label">Waktu Istirahat</span>
            <span className="rest-pill-time">{mins}:{secs}</span>
          </>
        )}
      </div>
      <div className="rest-pill-right">
        {!finished && (
          <button className="rest-pill-btn" onClick={addTime} aria-label="Tambah 30 detik">
            <Plus size={13} strokeWidth={2} />
            <span>30s</span>
          </button>
        )}
        <button
          className="rest-pill-btn rest-pill-close"
          onClick={onClose}
          disabled={!finished}
          aria-label="Tutup"
        >
          {finished ? 'Lanjut' : <X size={13} strokeWidth={2} />}
        </button>
      </div>
    </div>
  );
}
