import { useState } from 'react';
import { CheckCircle2, Circle, Trash2, ChevronDown, Dumbbell, Info } from 'lucide-react';
import RestTimer from './RestTimer';

export default function ExerciseItem({ id, name, sets, reps, tips, videoId, media, onDelete, locked, onRestStart, onRestEnd }) {
  const [isDone,     setIsDone]     = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showRest,   setShowRest]   = useState(false);

  const handleDone = (e) => {
    e.stopPropagation();
    if (locked) return;
    const next = !isDone;
    setIsDone(next);
    if (next) { setShowRest(true); if (onRestStart) onRestStart(); }
    else      { setShowRest(false); if (onRestEnd) onRestEnd(); }
  };

  const handleClose = () => {
    setShowRest(false);
    if (onRestEnd) onRestEnd();
  };

  const handleToggle = () => { if (!locked) setIsExpanded(p => !p); };

  return (
    <>
      <div className={`exercise-card${isDone ? ' done' : ''}${locked ? ' ex-locked' : ''}`}>
        {/* Header — klik untuk expand */}
        <div
          className="exercise-header"
          onClick={handleToggle}
          role="button"
          tabIndex={locked ? -1 : 0}
          onKeyDown={(e) => e.key === 'Enter' && handleToggle()}
          aria-expanded={isExpanded}
          aria-disabled={locked}
        >
          <span className="exercise-status">
            {isDone
              ? <CheckCircle2 size={20} strokeWidth={2} />
              : <Circle       size={20} strokeWidth={1.5} />
            }
          </span>

          <div className="exercise-info">
            <p className="exercise-name">{name}</p>
            <p className="exercise-meta">{sets} set &times; {reps} rep</p>
          </div>

          <ChevronDown
            size={18}
            className={`exercise-chevron${isExpanded ? ' open' : ''}`}
            aria-hidden
          />
        </div>

        {/* Body — accordion */}
        {isExpanded && (
          <div className="exercise-body">
            {/* Area Video Gerakan */}
            <div className="exercise-video-wrap">
              {media ? (
                <video
                  src={media}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="exercise-video-media"
                />
              ) : videoId ? (
                <div className="exercise-video-frame-container">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0&playsinline=1`}
                    title={`Panduan gerakan ${name}`}
                    allow="autoplay; encrypted-media"
                    loading="lazy"
                    className="exercise-video-iframe"
                  />
                </div>
              ) : (
                <div className="exercise-video-placeholder">
                  <Dumbbell size={28} strokeWidth={1.5} />
                  <span>Ilustrasi Gerakan: {name}</span>
                </div>
              )}
            </div>

            {/* Table Tips */}
            {tips && (
              <div className="exercise-tips-card">
                <div className="exercise-tips-label">
                  <Info size={14} strokeWidth={1.5} />
                  <span>Panduan Eksekusi</span>
                </div>
                <p className="exercise-tips-content">{tips}</p>
              </div>
            )}

            <div className="exercise-actions">
              <button
                className={`btn btn-sm ${isDone ? 'btn-secondary' : 'btn-success'}`}
                style={{ flex: 1 }}
                onClick={handleDone}
              >
                <CheckCircle2 size={15} />
                {isDone ? 'Batalkan Selesai' : 'Selesai Gerakan'}
              </button>
              <button
                className="btn btn-danger"
                onClick={(e) => { e.stopPropagation(); onDelete(id); }}
                aria-label="Hapus latihan"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        )}
      </div>

      {showRest && <RestTimer onClose={handleClose} />}
    </>
  );
}
