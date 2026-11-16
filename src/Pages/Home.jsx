import { Link } from 'react-router-dom';
import { ArrowRight, Dumbbell, Target, Zap, ShieldCheck } from 'lucide-react';

export default function Home() {
  return (
    <div className="home-container page-enter">
      {/* Header / Content at Top (Mindly layout) */}
      <div className="home-content">
        <div className="home-eyebrow">
          PROGRAM LATIHAN PERSONAL
        </div>

        <h1 className="home-title-main">WORKOUT TRACKER</h1>

        <p className="home-desc">
          Membantumu membangun otot kapan saja kamu mau
        </p>

        <div className="home-cta-group">
          <Link to="/kuesioner" className="btn-cta-primary">
            Mulai Susun Program
            <ArrowRight size={16} strokeWidth={1.5} />
          </Link>
          <Link to="/dashboard" className="btn-cta-ghost">
            Lihat Dashboard
          </Link>
        </div>
      </div>

      {/* Hero section: Roman statue + floating 3D glass cards */}
      <div className="home-hero">
        <img
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
      </div>
    </div>
  );
}
