import { MAKAN_DATA } from '../Data/makanTemplates';
import { Utensils, Target, Info } from 'lucide-react';

export default function SaranMakan({ fokus }) {
  const data = MAKAN_DATA[fokus] ?? MAKAN_DATA.bulking;

  return (
    <div className="nutri-wrap">
      <div className="nutri-header">
        <Utensils size={18} strokeWidth={1.5} />
        <div>
          <h2 className="nutri-title">Panduan Nutrisi — {fokus === 'bulking' ? 'Bulking' : 'Cutting'}</h2>
          <p className="nutri-target">{data.target}</p>
        </div>
      </div>

      {/* Makro Cards */}
      <div className="nutri-makro-grid">
        <div className="nutri-makro-card">
          <span className="nutri-makro-label">Protein</span>
          <span className="nutri-makro-value">{data.makro.protein}</span>
        </div>
        <div className="nutri-makro-card">
          <span className="nutri-makro-label">Karbohidrat</span>
          <span className="nutri-makro-value">{data.makro.karbo}</span>
        </div>
        <div className="nutri-makro-card">
          <span className="nutri-makro-label">Lemak Sehat</span>
          <span className="nutri-makro-value">{data.makro.lemak}</span>
        </div>
      </div>

      {/* Tips */}
      <div className="nutri-tips">
        <div className="nutri-tips-header"><Info size={14} strokeWidth={1.5} /> Tips Penting</div>
        {data.tips.map((tip, i) => (
          <p key={i} className="nutri-tip-item">— {tip}</p>
        ))}
      </div>

      {/* Menu Harian */}
      <div className="nutri-menu">
        <h3 className="nutri-menu-title">Contoh Menu Harian</h3>
        {data.menu.map((meal, i) => (
          <div key={i} className="nutri-meal-card">
            <p className="nutri-meal-time">{meal.waktu}</p>
            <ul className="nutri-meal-items">
              {meal.items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
