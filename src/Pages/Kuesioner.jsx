import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionCard from '../Components/QuestionCard';
import { ArrowRight, ArrowLeft, Save, CheckCircle2 } from 'lucide-react';

const TOTAL_STEPS = 4;

export default function Kuesioner() {
  const navigate = useNavigate();
  const [step,    setStep]    = useState(1);
  const [answers, setAnswers] = useState({ fokus: '', hari: '', lokasi: '', alat: '' });

  const set = (field, value) => setAnswers((prev) => ({ ...prev, [field]: value }));

  const handleSimpan = () => {
    localStorage.setItem('workoutPlan', JSON.stringify(answers));
    navigate('/dashboard');
  };

  const canNext =
    (step === 1 && !!answers.fokus)  ||
    (step === 2 && !!answers.hari)   ||
    (step === 3 && !!answers.lokasi) ||
    step === 4;

  const isLastStep = step === 4;
  const canSave = isLastStep && (answers.lokasi === 'gym' || !!answers.alat);

  return (
    <div className="kuesioner-wrap page-enter">
      <div className="step-indicator" aria-label={`Langkah ${step} dari ${TOTAL_STEPS}`}>
        {Array.from({ length: TOTAL_STEPS }, (_, i) => (
          <span
            key={i}
            className={`step-dot ${i + 1 === step ? 'active' : i + 1 < step ? 'done' : ''}`}
          />
        ))}
      </div>

      {step === 1 && (
        <QuestionCard
          stepNum={1} totalSteps={TOTAL_STEPS}
          question="Apa fokus utamamu saat ini?"
          options={[
            { label: 'Bulking',  value: 'bulking' },
            { label: 'Cutting',   value: 'cutting' },
          ]}
          currentAnswer={answers.fokus}
          onSelect={(v) => set('fokus', v)}
        />
      )}

      {step === 2 && (
        <QuestionCard
          stepNum={2} totalSteps={TOTAL_STEPS}
          question="Berapa hari kamu bisa latihan per minggu?"
          options={[
            { label: '2 Hari',       value: '2' },
            { label: '3 Hari',        value: '3' },
            { label: '4 Hari',      value: '4' },
            { label: '5 Hari',      value: '5' },
          ]}
          currentAnswer={answers.hari}
          onSelect={(v) => set('hari', v)}
        />
      )}

      {step === 3 && (
        <QuestionCard
          stepNum={3} totalSteps={TOTAL_STEPS}
          question="Di mana kamu akan latihan?"
          options={[
            { label: 'Rumah',   value: 'rumah' },
            { label: 'Gym',           value: 'gym'   },
          ]}
          currentAnswer={answers.lokasi}
          onSelect={(v) => set('lokasi', v)}
        />
      )}

      {step === 4 && answers.lokasi === 'rumah' && (
        <QuestionCard
          stepNum={4} totalSteps={TOTAL_STEPS}
          question="Seberapa kuat kamu kalistenik?"
          options={[
            { label: 'Kuat — Bodyweight murni',       value: 'kalistenik' },
            { label: 'Kurang — Pakai beban / Non-Kalistenik', value: 'nonKalistenik' },
          ]}
          currentAnswer={answers.alat}
          onSelect={(v) => set('alat', v)}
        />
      )}

      {step === 4 && answers.lokasi === 'gym' && (
        <div className="question-card text-center" style={{ maxWidth: 520, width: '100%' }}>
          <CheckCircle2 size={40} style={{ color: 'var(--success)', margin: '0 auto 1rem' }} />
          <h2 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
            Mantap, siap gas! 💪
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Program gym akan disesuaikan otomatis dengan alat yang tersedia.
          </p>
        </div>
      )}

      {/* Navigasi */}
      <div className="nav-buttons">
        {step > 1 && (
          <button className="btn btn-secondary" onClick={() => setStep((s) => s - 1)}>
            <ArrowLeft size={16} /> Kembali
          </button>
        )}

        {!isLastStep ? (
          <button
            className="btn btn-primary"
            disabled={!canNext}
            onClick={() => setStep((s) => s + 1)}
            style={{ flex: 1 }}
          >
            Lanjut <ArrowRight size={16} />
          </button>
        ) : (
          <button
            className="btn btn-primary"
            disabled={!canSave}
            onClick={handleSimpan}
            style={{ flex: 1 }}
          >
            <Save size={16} /> Simpan Program
          </button>
        )}
      </div>
    </div>
  );
}
