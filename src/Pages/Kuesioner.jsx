import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionCard from '../Components/QuestionCard';
import { ArrowRight, ArrowLeft, Save } from 'lucide-react';

export default function Kuesioner() {
  const navigate = useNavigate();
  const [step,    setStep]    = useState(1);
  const [answers, setAnswers] = useState({ fokus: '', hari: '', lokasi: '', alat: '' });

  const totalSteps = answers.lokasi === 'gym' ? 3 : 4;

  const set = (field, value) => setAnswers((prev) => ({ ...prev, [field]: value }));

  const handleSimpan = (overrides = {}) => {
    const plan = { ...answers, ...overrides };
    localStorage.setItem('workoutPlan', JSON.stringify(plan));
    navigate('/dashboard');
  };

  const handleLokasiSelect = (v) => {
    set('lokasi', v);
    if (v === 'gym') {
      // Save immediately with alat:'gym', skip step 4
      const plan = { ...answers, lokasi: 'gym', alat: 'gym' };
      localStorage.setItem('workoutPlan', JSON.stringify(plan));
      navigate('/dashboard');
    }
  };

  const canNext =
    (step === 1 && !!answers.fokus)  ||
    (step === 2 && !!answers.hari)   ||
    (step === 3 && !!answers.lokasi && answers.lokasi === 'rumah');

  const isLastStep = step === totalSteps;
  const canSave = isLastStep && !!answers.alat;

  return (
    <div className="kuesioner-wrap page-enter">
      <div className="step-indicator" aria-label={`Langkah ${step} dari ${totalSteps}`}>
        {Array.from({ length: totalSteps }, (_, i) => (
          <span
            key={i}
            className={`step-pill ${i + 1 === step ? 'active' : i + 1 < step ? 'done' : ''}`}
          />
        ))}
      </div>

      {step === 1 && (
        <QuestionCard
          stepNum={1} totalSteps={totalSteps}
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
          stepNum={2} totalSteps={totalSteps}
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
          stepNum={3} totalSteps={totalSteps}
          question="Di mana kamu akan latihan?"
          options={[
            { label: 'Rumah',   value: 'rumah' },
            { label: 'Gym',     value: 'gym'   },
          ]}
          currentAnswer={answers.lokasi}
          onSelect={handleLokasiSelect}
        />
      )}

      {step === 4 && answers.lokasi === 'rumah' && (
        <QuestionCard
          stepNum={4} totalSteps={totalSteps}
          question="Seberapa kuat kamu kalistenik?"
          options={[
            { label: 'Kuat — Bodyweight murni',              value: 'kalistenik' },
            { label: 'Kurang — Pakai beban / Non-Kalistenik', value: 'nonKalistenik' },
          ]}
          currentAnswer={answers.alat}
          onSelect={(v) => set('alat', v)}
        />
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
            onClick={() => handleSimpan()}
            style={{ flex: 1 }}
          >
            <Save size={16} /> Simpan Program
          </button>
        )}
      </div>
    </div>
  );
}
