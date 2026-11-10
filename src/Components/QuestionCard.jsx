import { Check } from 'lucide-react';

export default function QuestionCard({ stepNum, totalSteps, question, options, currentAnswer, onSelect }) {
  return (
    <div className="question-card">
      {/* Label step */}
      <p className="question-label">Langkah {stepNum} dari {totalSteps}</p>

      <h2 className="question-text">{question}</h2>

      <div className="options-list">
        {options.map((opt, i) => (
          <button
            key={i}
            className={`option-btn ${currentAnswer === opt.value ? 'selected' : ''}`}
            onClick={() => onSelect(opt.value)}
          >
            <span>{opt.label}</span>
            <span className="option-check">
              {currentAnswer === opt.value && <Check size={11} strokeWidth={3} color="#000" />}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
