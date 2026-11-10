import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar';
import LiveWallpaper from './Components/LiveWallpaper';
import Home from './Pages/Home';
import Kuesioner from './Pages/Kuesioner';
import Dashboard from './Pages/Dashboard';
import TambahLatihan from './Pages/TambahLatihan';

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('appTheme') || 'dark');
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem('appTheme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <>
      {/* Live Wallpaper Responsif Tema */}
      <LiveWallpaper currentTheme={theme} />

      <Navbar currentTheme={theme} onChangeTheme={setTheme} />

      <main style={{ position: 'relative', zIndex: 1 }}>
        <Routes location={location} key={location.pathname}>
          <Route path="/"               element={<Home />} />
          <Route path="/kuesioner"      element={<Kuesioner />} />
          <Route path="/dashboard"      element={<Dashboard />} />
          <Route path="/tambah-latihan" element={<TambahLatihan />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
