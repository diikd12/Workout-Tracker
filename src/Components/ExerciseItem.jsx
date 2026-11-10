import { useState } from 'react';
import { CheckCircle2, Circle, Trash2, ChevronDown } from 'lucide-react';

export default function ExerciseItem({ id, name, sets, reps, tips, onDelete }) {
  const [isDone,     setIsDone]     = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`exercise-card${isDone ? ' done' : ''}`}>
      {/* Header — klik untuk expand */}
      <div
        className="exercise-header"
        onClick={() => setIsExpanded((p) => !p)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setIsExpanded((p) => !p)}
        aria-expanded={isExpanded}
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
          {tips && (
            <div className="exercise-tips">
              <strong>Tips: </strong>{tips}
            </div>
          )}
          <div className="exercise-actions">
            <button
              className={`btn btn-sm ${isDone ? 'btn-secondary' : 'btn-success'}`}
              style={{ flex: 1 }}
              onClick={(e) => { e.stopPropagation(); setIsDone((p) => !p); }}
            >
              <CheckCircle2 size={15} />
              {isDone ? 'Batalkan' : 'Selesai'}
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
  );
}
