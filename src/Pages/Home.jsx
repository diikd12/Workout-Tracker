import { Link } from 'react-router-dom';
import { ArrowRight, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="home-container page-enter">
      {/* Eyebrow pill */}
      <div className="home-eyebrow">
        <Zap size={12} />
        Program Latihan Personal
      </div>

      <h1 className="home-title">
        Bangun Otot.<br />
        <span>Dimana Saja.</span>
      </h1>

      <p className="home-desc">
        Tidak ada kata nanti untuk menjadi yang terbaik. <br />
        Susun program latihan personalmu sekarang, dan mulai perjalananmu menuju tubuh impian.
      </p>

      <div className="home-cta-group">
        <Link to="/kuesioner" className="btn btn-primary btn-lg">
          Susun Program <ArrowRight size={18} />
        </Link>
        <Link to="/dashboard" className="btn btn-secondary btn-lg">
          Lihat Dashboard
        </Link>
      </div>
    </div>
  );
}
