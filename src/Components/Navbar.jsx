import { Link, useLocation } from 'react-router-dom';
import { Dumbbell, LayoutDashboard, PlusCircle } from 'lucide-react';

const THEMES = [
  { value: 'dark',     label: 'Dark',    swatch: '#e8d5a3', bg: '#0a0a0a' },
  { value: 'light',    label: 'Light',   swatch: '#1a1a1a', bg: '#fafaf8' },
  { value: 'graphite', label: 'Graphite',swatch: '#c8c8d8', bg: '#0e0e10' },
  { value: 'green',    label: 'Matcha',  swatch: '#a8d5b5', bg: '#060f0a' },
  { value: 'blue',     label: 'Starla',  swatch: '#90bde0', bg: '#03091a' },
  { value: 'purple',   label: 'Plum',    swatch: '#c4b8d4', bg: '#100d14' },
  { value: 'slate',    label: 'Lyra',    swatch: '#b0c0c4', bg: '#060e14' },
];

export default function Navbar({ currentTheme, onChangeTheme }) {
  const location = useLocation();

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        <span className="nav-logo-icon">
          <Dumbbell size={22} strokeWidth={2.5} />
        </span>
        <span>Workout Tracker</span>
      </Link>

      <div className="nav-actions">

        <div className="theme-switcher" title="Pilih Tema">
          {THEMES.map((t) => (
            <button
              key={t.value}
              className={`theme-btn ${currentTheme === t.value ? 'active' : ''}`}
              onClick={() => onChangeTheme(t.value)}
              title={t.label}
              aria-label={`Tema ${t.label}`}
              style={{ position: 'relative' }}
            >
              <span style={{
                display: 'block',
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: t.swatch,
                boxShadow: `0 0 0 2px ${t.bg}`,
              }} />
            </button>
          ))}
        </div>

        <Link
          to="/tambah-latihan"
          className={`nav-link primary`}
          aria-label="Tambah Latihan"
        >
          <PlusCircle size={16} strokeWidth={2} />
          <span>Tambah</span>
        </Link>

        <Link
          to="/dashboard"
          className="nav-link"
          aria-label="Dashboard"
        >
          <LayoutDashboard size={16} strokeWidth={2} />
          <span>Dashboard</span>
        </Link>
      </div>
    </nav>
  );
}
