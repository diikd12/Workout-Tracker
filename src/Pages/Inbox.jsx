import { useState, useEffect } from 'react';
import { Send, MessageSquare } from 'lucide-react';

const CATEGORIES = ['Saran Fitur Baru', 'Laporan Bug', 'Request Gerakan / Makanan', 'Lainnya'];

export default function Inbox() {
  const [form, setForm] = useState({ name: '', email: '', category: CATEGORIES[0], message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  // EventListener beforeunload seperti di video dcode
  // Munculkan dialog konfirmasi bawaan browser jika user mencoba menutup/reload halaman saat form terisi
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (form.name || form.message) {
        e.preventDefault();
        e.returnValue = ''; // Wajib untuk browser Chromium/Chrome
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [form.name, form.message]);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isConfirmed = window.confirm('Kirimkan pesan dan saran ini ke developer?');
    if (!isConfirmed) {
      return;
    }

    setStatus('sending');
    try {
      const accessKey = 'PUBLIC_KEY_PLACEHOLDER';
      if (accessKey === 'PUBLIC_KEY_PLACEHOLDER') {
        // Prototype mode: simulasi pengiriman sukses
        await new Promise(r => setTimeout(r, 400));
        const saved = JSON.parse(localStorage.getItem('workout_tracker_inbox') || '[]');
        saved.push({ ...form, date: new Date().toISOString() });
        localStorage.setItem('workout_tracker_inbox', JSON.stringify(saved));
        setStatus('idle');
        setForm({ name: '', email: '', category: CATEGORIES[0], message: '' });
        window.alert('Pesan dan saran berhasil dikirim ke developer. Terima kasih atas kontribusimu!');
        return;
      }

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `[Workout Tracker] ${form.category} dari ${form.name}`,
          name: form.name,
          email: form.email,
          category: form.category,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('idle');
        setForm({ name: '', email: '', category: CATEGORIES[0], message: '' });
        window.alert('Pesan dan saran berhasil dikirim ke developer. Terima kasih atas kontribusimu!');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="container page-enter inbox-wrap">
      {/* Two column layout */}
      <div className="inbox-layout">
        {/* Kiri: Info */}
        <div className="inbox-info">
          <MessageSquare size={28} strokeWidth={1} style={{ color: 'var(--accent)', marginBottom: '1rem' }} />
          <h1 className="inbox-title">INBOX</h1>
          <p className="inbox-subtitle">SARAN &amp; MASUKAN</p>
          <p className="inbox-desc">Punya saran latihan baru, masukan fitur, atau ingin berdiskusi? Tinggalkan pesan langsung untuk developer.</p>
          <div className="inbox-info-divider" />
          <p className="inbox-info-label">Status</p>
          <p className="inbox-info-value">Aktif Menerima Masukan</p>
        </div>

        {/* Kanan: Form */}
        <div className="inbox-form-wrap">
          <h2 className="inbox-form-title">CONTACT FORM</h2>
          {status === 'error' && <p className="inbox-error">Gagal mengirim. Coba lagi.</p>}
          <form onSubmit={handleSubmit} className="inbox-form">
            <div className="inbox-field">
              <label className="inbox-label">Your name</label>
              <input name="name" required value={form.name} onChange={handleChange} className="inbox-input" placeholder="Nama atau samaran" />
            </div>
            <div className="inbox-field">
              <label className="inbox-label">Your email (opsional)</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} className="inbox-input" placeholder="email@kamu.com" />
            </div>
            <div className="inbox-field">
              <label className="inbox-label">Kategori</label>
              <select name="category" value={form.category} onChange={handleChange} className="inbox-input">
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="inbox-field">
              <label className="inbox-label">Message</label>
              <textarea name="message" required rows={5} value={form.message} onChange={handleChange} className="inbox-input" placeholder="Tuliskan saran atau pesanmu di sini..." />
            </div>
            <button type="submit" className="btn btn-primary inbox-submit" disabled={status === 'sending'}>
              <Send size={15} strokeWidth={1.5} />
              {status === 'sending' ? 'Mengirim...' : 'SEND MESSAGE'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
