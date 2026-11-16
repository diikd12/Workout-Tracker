import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SaranMakan from '../Components/saranMakan';
import { ArrowLeft } from 'lucide-react';

export default function Nutrisi() {
  const navigate = useNavigate();
  const [fokus, setFokus] = useState('bulking');

  useEffect(() => {
    const saved = localStorage.getItem('workoutPlan');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.fokus) setFokus(parsed.fokus);
    }
  }, []);

  return (
    <div className="container page-enter">
      <button className="form-back" onClick={() => navigate('/dashboard')}>
        <ArrowLeft size={16} strokeWidth={1.5} /> Kembali ke Dashboard
      </button>
      <div className="nutri-toggle">
        <button className={`nutri-toggle-btn ${fokus === 'bulking' ? 'active' : ''}`} onClick={() => setFokus('bulking')}>Bulking</button>
        <button className={`nutri-toggle-btn ${fokus === 'cutting' ? 'active' : ''}`} onClick={() => setFokus('cutting')}>Cutting</button>
      </div>
      <SaranMakan fokus={fokus} />
    </div>
  );
}
