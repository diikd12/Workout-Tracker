import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Dumbbell,
  LayoutDashboard,
  PlusCircle,
  Salad,
  MessageSquare,
  Palette,
} from 'lucide-react';

const THEMES = [
  { value: 'dark',     label: 'Dark',    swatch: '#e8d5a3', bg: '#0a0a0a' },
  { value: 'light',   label: 'Light',   swatch: '#1a1a1a', bg: '#fafaf8' },
  { value: 'graphite',label: 'Graphite',swatch: '#c8c8d8', bg: '#0e0e10' },
  { value: 'green',   label: 'Matcha',  swatch: '#a8d5b5', bg: '#060f0a' },
  { value: 'blue',    label: 'Starla',  swatch: '#90bde0', bg: '#03091a' },
  { value: 'purple',  label: 'Plum',    swatch: '#c4b8d4', bg: '#100d14' },
  { value: 'slate',   label: 'Lyra',    swatch: '#b0c0c4', bg: '#060e14' },
];

export default function Navbar({ currentTheme, onChangeTheme }) {
  const location = useLocation();
  const [themeOpen, setThemeOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="nav-logo">
          <span className="nav-logo-icon">
            <Dumbbell size={22} strokeWidth={2.5} />
          </span>
          <span>Workout Tracker</span>
        </Link>

        <div className="nav-actions">
          {/* Desktop theme switcher */}
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
                <span
                  style={{
                    display: 'block',
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    background: t.swatch,
                    boxShadow: `0 0 0 2px ${t.bg}`,
                  }}
                />
              </button>
            ))}
          </div>

          {/* Mobile palette button */}
          <button
            className="theme-btn-palette nav-link"
            onClick={() => setThemeOpen(true)}
            aria-label="Pilih Tema"
            title="Pilih Tema"
          >
            <Palette size={16} strokeWidth={1.5} />
          </button>

          <Link
            to="/nutrisi"
            className={`nav-link${location.pathname === '/nutrisi' ? ' active' : ''}`}
            aria-label="Nutrisi"
          >
            <Salad size={16} strokeWidth={1.5} />
            <span>Nutrisi</span>
          </Link>

          <Link
            to="/inbox"
            className={`nav-link${location.pathname === '/inbox' ? ' active' : ''}`}
            aria-label="Inbox"
          >
            <MessageSquare size={16} strokeWidth={1.5} />
            <span>Inbox</span>
          </Link>

          <Link
            to="/tambah-latihan"
            className="nav-link primary"
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

      {/* Mobile theme bottom sheet */}
      {themeOpen && (
        <>
          <div
            className="theme-sheet-overlay"
            onClick={() => setThemeOpen(false)}
          />
          <div className="theme-sheet">
            <p className="theme-sheet-title">Pilih Tema</p>
            <div className="theme-sheet-grid">
              {THEMES.map((t) => (
                <button
                  key={t.value}
                  className={`theme-sheet-btn${currentTheme === t.value ? ' active' : ''}`}
                  onClick={() => { onChangeTheme(t.value); setThemeOpen(false); }}
                  aria-label={`Tema ${t.label}`}
                >
                  <span
                    className="theme-sheet-swatch"
                    style={{ background: t.swatch }}
                  />
                  <span>{t.label}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
