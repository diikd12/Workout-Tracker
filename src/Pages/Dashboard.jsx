import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExerciseItem from '../Components/ExerciseItem';
import SaranLatihan from '../Components/SaranLatihan';
import { getJadwalMingguan, getWorkoutData } from '../Data/workoutTemplates';
import { Edit2, PlusCircle } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const [userData,             setUserData]             = useState(null);
  const [selectedHari,         setSelectedHari]         = useState('Senin');
  const [jadwalFull,           setJadwalFull]           = useState([]);
  const [todaysWorkout,        setTodaysWorkout]        = useState([]);
  const [jenisLatihanHariIni,  setJenisLatihanHariIni]  = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('workoutPlan');
    if (!saved) { navigate('/kuesioner'); return; }
    const parsed = JSON.parse(saved);
    setUserData(parsed);
    const jadwal = getJadwalMingguan(parsed.hari);
    setJadwalFull(jadwal);
    // Langsung set ke hari pertama yang bukan Rest
    const firstActive = jadwal.find((j) => j.jenis !== 'Rest Day');
    if (firstActive) setSelectedHari(firstActive.hari);
  }, [navigate]);

  useEffect(() => {
    if (!jadwalFull.length || !userData) return;

    const hariAktif = jadwalFull.find((j) => j.hari === selectedHari);
    setJenisLatihanHariIni(hariAktif?.jenis ?? '');

    if (!hariAktif || hariAktif.jenis === 'Rest Day') {
      setTodaysWorkout([]);
      return;
    }

    const alat = userData.lokasi === 'gym' ? 'gym' : userData.alat;
    const defaults = getWorkoutData(alat, hariAktif.jenis).map((item) => ({
      ...item,
      id: `default-${hariAktif.jenis}-${item.id}`,
    }));

    const customAll     = JSON.parse(localStorage.getItem('customWorkouts'))  || [];
    const customToday   = customAll.filter((item) => item.hari === selectedHari);
    const deleted       = JSON.parse(localStorage.getItem('deletedWorkouts')) || [];

    setTodaysWorkout(
      [...defaults, ...customToday].filter((item) => !deleted.includes(item.id))
    );
  }, [selectedHari, jadwalFull, userData]);

  const handleDelete = (idToDelete) => {
    // Tandai deleted
    const deleted = JSON.parse(localStorage.getItem('deletedWorkouts')) || [];
    if (!deleted.includes(idToDelete)) {
      localStorage.setItem('deletedWorkouts', JSON.stringify([...deleted, idToDelete]));
    }
    // Juga hapus dari customWorkouts kalau ada
    const customAll = JSON.parse(localStorage.getItem('customWorkouts')) || [];
    localStorage.setItem('customWorkouts', JSON.stringify(customAll.filter((i) => i.id !== idToDelete)));
    setTodaysWorkout((prev) => prev.filter((i) => i.id !== idToDelete));
  };

  const handleUbahProgram = () => {
    localStorage.removeItem('workoutPlan');
    navigate('/kuesioner');
  };

  if (!userData) return null;

  const isRestDay = jenisLatihanHariIni === 'Rest Day';

  return (
    <div className="container page-enter">
      <header className="dashboard-header">
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '0.4rem' }}>
            Dashboard Latihan
          </h1>
          <div className="dashboard-meta">
            <span className="badge">
              {userData.hari} Hari / Minggu
            </span>
            <span className="badge muted">
              {userData.lokasi === 'rumah' ? 'Rumah' : 'Gym'}
            </span>
            {userData.lokasi === 'rumah' && userData.alat && (
              <span className="badge muted">
                {userData.alat === 'nonKalistenik' || userData.alat === 'ransel' || userData.alat === 'non-kalistenik'
                  ? 'Non-Kalistenik'
                  : userData.alat}
              </span>
            )}
          </div>
        </div>
        <button className="btn btn-secondary" onClick={handleUbahProgram}>
          <Edit2 size={15} /> Ubah Program
        </button>
      </header>

      {/* Jadwal mingguan */}
      <SaranLatihan
        jadwal={jadwalFull}
        selectedHari={selectedHari}
        onSelectHari={setSelectedHari}
      />

      {/* Daftar latihan hari ini */}
      <section>
        <div className="section-header">
          <div>
            <p style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>
              {selectedHari}
            </p>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 600, letterSpacing: '-0.01em' }}>
              {isRestDay ? 'Hari Istirahat' : jenisLatihanHariIni}
            </h2>
          </div>
          {!isRestDay && (
            <button
              className="btn btn-ghost"
              style={{ fontSize: '0.8rem', gap: '0.3rem' }}
              onClick={() => navigate('/tambah-latihan')}
            >
              <PlusCircle size={15} /> Tambah
            </button>
          )}
        </div>

        {isRestDay ? (
          <div className="empty-state">
            <p style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🛋️</p>
            <h3>Hari Istirahat</h3>
            <p>Otot tumbuh saat kamu istirahat. Nikmati!</p>
          </div>
        ) : todaysWorkout.length === 0 ? (
          <div className="empty-state">
            <p style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📋</p>
            <h3>Belum ada latihan</h3>
            <p>Tambahkan gerakan kustom untuk hari ini.</p>
          </div>
        ) : (
          <div className="exercise-list">
            {todaysWorkout.map((ex) => (
              <ExerciseItem key={ex.id} {...ex} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
