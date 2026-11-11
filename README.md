# ⚡ Workout Tracker — Smart Routine & Gym Planner

Aplikasi web modern dan elegan untuk menyusun, melacak, dan mengelola rutinitas latihan fisik harian (Gym, Kalistenik, maupun Beban Non-Kalistenik). Dilengkapi dengan latar belakang dinamis gelombang air (*Fluid Water Waves Live Wallpaper*) yang responsif terhadap interaksi kursor dan beradaptasi halus mengikuti tema pilihan.

---

## 🌟 Fitur Utama

- **🎯 Personalisasi Program Latihan (Kuesioner Otomatis)**:
  - Penyesuaian target tubuh (*Bulking* atau *Cutting*).
  - Pilihan frekuensi latihan: **2 Hari** (Upper/Lower), **3 Hari** (Push/Leg/Pull), **4 Hari** (Chest/Back/Legs/Shoulder-Chest-Back), atau **5 Hari** (Split Optimal).
  - Adaptasi alat latihan: **Gym**, **Kalistenik (Bodyweight)**, atau **Non-Kalistenik (Beban Tambahan)**.

- **📅 Jadwal Mingguan Fleksibel**:
  - Visualisasi jadwal Senin s/d Minggu yang interaktif.
  - Deteksi otomatis hari istirahat (*Rest Day*) agar pemulihan otot optimal.
  - Kemudahan beralih hari untuk memeriksa target latihan hari berikutnya.

- **📝 Manajemen & Tracking Latihan**:
  - **Checklist Selesai**: Tandai latihan yang telah diselesaikan dengan indikator visual.
  - **Accordion Detail**: Setiap gerakan dilengkapi jumlah set, repetisi, dan tips teknis gerakan.
  - **Tambah Latihan Kustom**: Menambahkan latihan buatan sendiri ke hari tertentu.
  - **Hapus Latihan**: Menyingkirkan gerakan yang tidak sesuai preferensi pengguna.

- **🌊 Fluid Water Waves Live Wallpaper (Canvas 60 FPS)**:
  - Latar belakang interaktif berbasis multi-layer gelombang air harmonik.
  - Efek riak air fisik (*ripple physics*) saat kursor mouse digerakkan.
  - Refleksi kilau air (*caustic sparkles*) dan puncak gelombang berkilau (*crest highlights*).

- **🎨 7 Tema Warna Elegan**:
  - **Dark** (Default — Emas Mewah)
  - **Light** (Obsidian Stone Minimalis)
  - **Graphite** (Titanium Grey)
  - **Matcha** (Emerald Jade)
  - **Starla** (Deep Ocean Sapphire)
  - **Plum** (Velvet Amethyst)
  - **Lyra** (Arctic Slate)
  - Seluruh warna kanvas bertransisi lembut (*smooth color lerp*) tanpa *flicker* saat berganti tema.

- **💾 Penyimpanan Otomatis (Local Persistence)**:
  - Semua pengaturan, tema, program latihan, status checklist, dan latihan kustom tersimpan di `localStorage` peramban tanpa perlu login.

---

## 📂 Struktur Proyek

```text
workout-tracker/
├── public/
├── src/
│   ├── Components/
│   │   ├── ExerciseItem.jsx      # Kartu latihan (accordion, tips, checklist, delete)
│   │   ├── LiveWallpaper.jsx     # Background canvas animasi gelombang air interaktif
│   │   ├── Navbar.jsx            # Navigasi sticky, logo, dan theme switcher
│   │   ├── QuestionCard.jsx      # Komponen kartu kuesioner langkah demi langkah
│   │   └── SaranLatihan.jsx      # Bar navigasi jadwal mingguan (Senin–Minggu)
│   ├── Data/
│   │   └── workoutTemplates.js   # Database gerakan (sets/reps/tips) & logika pemetaan split
│   ├── Pages/
│   │   ├── Dashboard.jsx         # Halaman utama rutinitas harian dan progres
│   │   ├── Home.jsx              # Landing page sambutan
│   │   ├── Kuesioner.jsx         # Wizard setup program latihan awal
│   │   └── TambahLatihan.jsx     # Form input latihan kustom
│   ├── App.jsx                   # Konfigurasi routing & state tema global
│   ├── index.css                 # Design token CSS, variabel tema & glassmorphism
│   └── main.jsx                  # Entry point aplikasi React
├── package.json
└── vite.config.js
```

---

## 🚀 Cara Menjalankan Proyek

### Prasyarat
- Pastikan sudah menginstal [Node.js](https://nodejs.org/) (versi 18 ke atas direkomendasikan).

### Langkah Instalasi
1. **Clone repository ini**:
   ```bash
   git clone https://github.com/username-kamu/workout-tracker.git
   cd workout-tracker
   ```

2. **Instal dependensi**:
   ```bash
   npm install
   ```

3. **Jalankan server pengembangan (Dev Mode)**:
   ```bash
   npm run dev
   ```
   Buka browser di alamat: `http://localhost:5173`

4. **Build untuk Produksi**:
   ```bash
   npm run build
   ```

---

## 🛠️ Cara Mengubah / Menambah Latihan di Kode

Jika ingin mengedit gerakan default, set, repetisi, atau jadwal latihan secara permanen melalui kode sumber, kamu hanya perlu mengubah satu file:

📄 **`src/Data/workoutTemplates.js`**

1. **Mengubah Pembagian Hari**: Edit fungsi `getJadwalMingguan(jumlahHari)`:
   ```javascript
   case '3': return [
     { hari: 'Senin',  jenis: 'Push' },
     { hari: 'Selasa', jenis: 'Rest Day' },
     { hari: 'Rabu',   jenis: 'Leg' },
     // ...
   ];
   ```
2. **Mengubah Gerakan / Sets / Reps / Tips**: Edit objek `DB`:
   ```javascript
   gym: {
     chest: [
       { 
         id: 1, 
         name: 'Barbell Bench Press', 
         sets: 4, 
         reps: '6–8', 
         tips: 'Pemanasan rotator cuff dulu. Dada turun ke bar.' 
       },
       // Tambahkan gerakan baru di sini
     ],
     // ...
   }
   ```

---

## 💻 Teknologi yang Digunakan

- **Frontend Core**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Routing**: [React Router DOM v6](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Visuals & Animasi**: HTML5 Canvas API (Fluid Harmonics & Physics)
- **Styling**: Vanilla CSS Design Tokens, Modern CSS Variables & Glassmorphism Blur
- **Storage**: Browser Web Storage API (`localStorage`)

---

## 📄 Lisensi
Proyek ini dibuat untuk tujuan pembelajaran dan pengembangan diri. Bebas dimodifikasi dan dikembangkan lebih lanjut.
