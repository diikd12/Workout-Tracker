import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, CheckCircle } from 'lucide-react';

const HARI_OPTIONS = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

const EMPTY = { name: '', sets: '', reps: '', tips: '', hari: 'Senin' };

export default function TambahLatihan() {
  const navigate = useNavigate();
  const [form,        setForm]        = useState(EMPTY);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const existing = JSON.parse(localStorage.getItem('customWorkouts')) || [];
    const newItem  = {
      id:   Date.now(),
      name: form.name,
      sets: form.sets,
      reps: form.reps,
      tips: form.tips || 'Tidak ada catatan.',
      hari: form.hari,
    };
    localStorage.setItem('customWorkouts', JSON.stringify([...existing, newItem]));
    setForm(EMPTY);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="container page-enter form-container">
      <button className="form-back" onClick={() => navigate('/dashboard')}>
        <ArrowLeft size={16} /> Kembali ke Dashboard
      </button>

      <h1 style={{ fontSize: '1.6rem', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '1.75rem' }}>
        Tambah Latihan Kustom
      </h1>

      {showSuccess && (
        <div className="alert-success animate-pop">
          <CheckCircle size={18} />
          Latihan berhasil ditambahkan ke {form.hari || 'jadwal'}!
        </div>
      )}

      <form onSubmit={handleSubmit} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>

        <div className="form-group">
          <label htmlFor="hari" className="form-label">Jadwalkan untuk Hari</label>
          <select id="hari" name="hari" value={form.hari} onChange={handleChange} className="form-input">
            {HARI_OPTIONS.map((h) => (
              <option key={h} value={h}>{h}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="name" className="form-label">Nama Gerakan</label>
          <input
            type="text" id="name" name="name" required
            value={form.name} onChange={handleChange}
            placeholder="Contoh: Squat Galon"
            className="form-input"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="sets" className="form-label">Jumlah Set</label>
            <input
              type="number" id="sets" name="sets" required min="1"
              value={form.sets} onChange={handleChange}
              placeholder="3"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="reps" className="form-label">Jumlah Reps</label>
            <input
              type="text" id="reps" name="reps" required
              value={form.reps} onChange={handleChange}
              placeholder="10–12"
              className="form-input"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="tips" className="form-label">Tips (opsional)</label>
          <textarea
            id="tips" name="tips"
            value={form.tips} onChange={handleChange}
            placeholder="Catatan teknik atau beban..."
            className="form-input"
            rows={3}
          />
        </div>

        <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem', width: '100%' }}>
          <Save size={17} /> Simpan Latihan
        </button>
      </form>
    </div>
  );
}
