// Fungsi untuk memetakan jadwal Senin-Minggu
export const getJadwalMingguan = (jumlahHari) => {
  switch (jumlahHari) {
    case '2': return [
      { hari: 'Senin',  jenis: 'Full Body - Upper' },
      { hari: 'Selasa', jenis: 'Rest Day'          },
      { hari: 'Rabu',   jenis: 'Rest Day'          },
      { hari: 'Kamis',  jenis: 'Full Body - Lower' },
      { hari: 'Jumat',  jenis: 'Rest Day'          },
      { hari: 'Sabtu',  jenis: 'Rest Day'          },
      { hari: 'Minggu', jenis: 'Rest Day'          },
    ];
    case '3': return [
      { hari: 'Senin',  jenis: 'Push'     },
      { hari: 'Selasa', jenis: 'Rest Day' },
      { hari: 'Rabu',   jenis: 'Leg'      },
      { hari: 'Kamis',  jenis: 'Rest Day' },
      { hari: 'Jumat',  jenis: 'Pull'     },
      { hari: 'Sabtu',  jenis: 'Rest Day' },
      { hari: 'Minggu', jenis: 'Rest Day' },
    ];
    case '4': return [
      { hari: 'Senin',  jenis: 'Chest'                 },
      { hari: 'Selasa', jenis: 'Back'                  },
      { hari: 'Rabu',   jenis: 'Legs'                  },
      { hari: 'Kamis',  jenis: 'Rest Day'              },
      { hari: 'Jumat',  jenis: 'Shoulder, chest, back' },
      { hari: 'Sabtu',  jenis: 'Rest Day'              },
      { hari: 'Minggu', jenis: 'Rest Day'              },
    ];
    case '5': return [
      { hari: 'Senin',  jenis: 'Chest'    },
      { hari: 'Selasa', jenis: 'Back'     },
      { hari: 'Rabu',   jenis: 'Leg'      },
      { hari: 'Kamis',  jenis: 'Rest Day' },
      { hari: 'Jumat',  jenis: 'Push'     },
      { hari: 'Sabtu',  jenis: 'Pull'     },
      { hari: 'Minggu', jenis: 'Rest Day' },
    ];
    default: return [];
  }
};

// Database gerakan
const DB = {
  kalistenik: {
    chest: [
      { id: 1, name: 'Push-up',           sets: 4, reps: 'To failure', tips: 'Turun perlahan 3 detik.' },
      { id: 2, name: 'Diamond Push-up',   sets: 3, reps: '10–15',      tips: 'Fokus ke trisep dan dada tengah, tangan rapat.' },
      { id: 3, name: 'Decline Push-up',   sets: 3, reps: '10–12',      tips: 'Kaki di atas kasur/kursi, fokus dada atas.' },
    ],
    back: [
      { id: 4, name: 'Pull-up',           sets: 4, reps: 'To failure', tips: 'Full ROM — lengan lurus di bawah, dagu di atas bar.' },
      { id: 5, name: 'Chin-up',           sets: 3, reps: 'To failure', tips: 'Supinasi tangan, fokus ke bicep dan lats.' },
      { id: 6, name: 'Inverted Row',      sets: 3, reps: '12–15',      tips: 'Gunakan kolong meja yang kokoh, badan lurus tegak.' },
    ],
    push: [
      { id: 7, name: 'Push-up',           sets: 4, reps: 'To failure', tips: 'Turun perlahan 3 detik, dorong eksplosif.' },
      { id: 8, name: 'Diamond Push-up',   sets: 3, reps: '10–15',      tips: 'Fokus ke trisep, tangan rapat di tengah dada.' },
      { id: 9, name: 'Pike Push-up',      sets: 3, reps: '10–12',      tips: 'Simulasi overhead press, pinggul dorong ke atas.' },
    ],
    pull: [
      { id: 10, name: 'Pull-up',          sets: 4, reps: 'To failure', tips: 'Full ROM — lengan lurus di bawah, dagu di atas bar.' },
      { id: 11, name: 'Chin-up',          sets: 3, reps: 'To failure', tips: 'Supinasi tangan, lebih fokus ke bicep.' },
      { id: 12, name: 'Inverted Row',     sets: 3, reps: '12–15',      tips: 'Pakai meja, badan lurus seperti plank.' },
    ],
    leg: [
      { id: 13, name: 'Squat',                sets: 4, reps: '15–20',      tips: 'Turun sampai paha sejajar lantai.' },
      { id: 14, name: 'Bulgarian Split Squat',sets: 3, reps: '10/kaki',    tips: 'Kaki belakang di kursi, jaga keseimbangan.' },
      { id: 15, name: 'Calf Raise',           sets: 4, reps: '20–25',      tips: 'Pakai anak tangga untuk ROM penuh tumit.' },
    ],
    upper: [
      { id: 16, name: 'Pull-up',          sets: 4, reps: 'To failure', tips: 'Pemanasan sendi bahu terlebih dahulu.' },
      { id: 17, name: 'Push-up',          sets: 4, reps: '12–15',      tips: 'Dada menyentuh lantai, dorong kuat.' },
      { id: 18, name: 'Pike Push-up',     sets: 3, reps: '8–12',       tips: 'Target bahu depan dan trisep.' },
      { id: 19, name: 'Inverted Row',     sets: 3, reps: '10–12',      tips: 'Rapatkan belikat di puncak tarikan.' },
      { id: 20, name: 'Bench Dips',       sets: 3, reps: '12–15',      tips: 'Gunakan tepi kursi/kasur untuk melatih trisep.' },
    ],
    lower: [
      { id: 21, name: 'Squat',                sets: 4, reps: '15–20',      tips: 'Jaga dada tetap tegak saat turun.' },
      { id: 22, name: 'Bulgarian Split Squat',sets: 3, reps: '10/kaki',    tips: 'Kaki belakang di kursi, tumpukan beban di paha depan.' },
      { id: 23, name: 'Single-leg Glute Bridge', sets: 3, reps: '12/kaki', tips: 'Angkat pinggul dan remas bokong di puncak gerakan.' },
      { id: 24, name: 'Calf Raise',           sets: 4, reps: '20–25',      tips: 'Tahan 1 detik di puncak kontraksi betis.' },
    ],
    shoulderChestBack: [
      { id: 25, name: 'Pike Push-up',     sets: 4, reps: '8–12',       tips: 'Bahu tegak lurus, kepala turun di antara kedua tangan.' },
      { id: 26, name: 'Push-up Variasi',  sets: 3, reps: '12–15',      tips: 'Kombinasikan tempo lambat saat turun.' },
      { id: 27, name: 'Pull-up',          sets: 3, reps: 'To failure', tips: 'Tarik tubuh hingga dagu melewati palang.' },
      { id: 28, name: 'Inverted Row',     sets: 3, reps: '12',          tips: 'Punggung atas kontraksi maksimal.' },
    ],
  },

  nonKalistenik: {
    chest: [
      { id: 1, name: 'Push-up Berbeban',  sets: 4, reps: 'To failure', tips: 'Gunakan beban tas di punggung, turun perlahan.' },
      { id: 2, name: 'Incline Push-up',   sets: 3, reps: '10–15',      tips: 'Tangan di kursi/box, fokus dada atas.' },
      { id: 3, name: 'Floor Press Tas',   sets: 3, reps: '12',         tips: 'Berbaring di lantai, dorong tas seperti bench press.' },
    ],
    back: [
      { id: 4, name: 'Bent-over Row',     sets: 4, reps: '10–12',      tips: 'Fokus kontraksi punggung dengan beban tas.' },
      { id: 5, name: 'Single-Arm Bag Row',sets: 3, reps: '10/sisi',    tips: 'Tumpu satu tangan di kursi, tarik tas ke arah pinggul.' },
      { id: 6, name: 'Good Morning Tas',  sets: 3, reps: '12',         tips: 'Peluk tas di dada, tekuk pinggul ke belakang jaga punggung lurus.' },
    ],
    push: [
      { id: 7, name: 'Push-up Berbeban',  sets: 4, reps: 'To failure', tips: 'Gunakan beban tas di punggung, turun perlahan.' },
      { id: 8, name: 'OHP Beban Tambahan',sets: 3, reps: '10–15',      tips: 'Gunakan beban tas di kedua tangan, dorong vertikal.' },
      { id: 9, name: 'Tricep Extension',  sets: 3, reps: '12',         tips: 'Pegang beban tas, angkat dari belakang kepala.' },
    ],
    pull: [
      { id: 10, name: 'Bent-over Row',    sets: 4, reps: '10–12',      tips: 'Fokus kontraksi punggung dengan beban tas.' },
      { id: 11, name: 'Bicep Curl Tas',   sets: 3, reps: '12–15',      tips: 'Pegang handle tas dengan kuat, siku rapat di pinggang.' },
    ],
    leg: [
      { id: 12, name: 'Squat Berbeban',   sets: 4, reps: '8–12',       tips: 'Beban tas di punggung/dada, turun sampai paha sejajar lantai.' },
      { id: 13, name: 'Lunges Berbeban',  sets: 3, reps: '10/kaki',    tips: 'Langkah cukup lebar, jaga keseimbangan dengan beban.' },
    ],
    upper: [
      { id: 14, name: 'Push-up Berbeban', sets: 4, reps: '10–12',      tips: 'Beban tas di punggung, tempo perlahan.' },
      { id: 15, name: 'Bent-over Row',    sets: 4, reps: '10–12',      tips: 'Punggung lurus membentuk sudut 45 derajat.' },
      { id: 16, name: 'OHP Beban Tambahan',sets: 3, reps: '10–12',     tips: 'Kencangkan otot inti saat mendorong beban ke atas.' },
      { id: 17, name: 'Bicep Curl Tas',   sets: 3, reps: '12',         tips: 'Kontrol gerakan saat menurunkan beban.' },
      { id: 18, name: 'Tricep Extension', sets: 3, reps: '12–15',      tips: 'Kunci posisi siku agar tidak melebar.' },
    ],
    lower: [
      { id: 19, name: 'Squat Berbeban',   sets: 4, reps: '10–12',      tips: 'Beban tas dipeluk di depan dada (goblet style).' },
      { id: 20, name: 'Lunges Berbeban',  sets: 3, reps: '10/kaki',    tips: 'Jaga lutut depan tidak melebihi ujung jari kaki.' },
      { id: 21, name: 'RDL Berbeban Tas', sets: 3, reps: '10–12',      tips: 'Engsel pinggul ke belakang, rasakan tarikan di hamstring.' },
      { id: 22, name: 'Calf Raise Berbeban', sets: 4, reps: '15–20',   tips: 'Gendong tas di punggung, jinjit di ujung pijakan.' },
    ],
    shoulderChestBack: [
      { id: 23, name: 'OHP Beban Tambahan', sets: 4, reps: '10–12',    tips: 'Fokus kekuatan bahu dan stabilitas inti.' },
      { id: 24, name: 'Push-up Berbeban',   sets: 3, reps: '10–12',    tips: 'Dada tegap, jangan sampai pinggul turun.' },
      { id: 25, name: 'Bent-over Row',      sets: 4, reps: '10–12',    tips: 'Tarik beban menuju pusar/perut bawah.' },
      { id: 26, name: 'Incline Push-up',    sets: 3, reps: '12–15',    tips: 'Tangan di kursi/meja, pompa sisa tenaga dada.' },
    ],
  },

  gym: {
    chest: [
      { id: 1, name: 'Barbell Bench Press',   sets: 4, reps: '6–8',   tips: 'Pemanasan rotator cuff dulu. Dada turun ke bar.' },
      { id: 2, name: 'Incline DB Press',      sets: 3, reps: '10–12', tips: 'Fokus dada atas, sudut sandaran 30–45°.' },
      { id: 3, name: 'Cable Fly',             sets: 3, reps: '12–15', tips: 'Jaga siku sedikit menekuk, tarik ke depan dada.' },
    ],
    back: [
      { id: 4, name: 'Lat Pulldown',          sets: 3, reps: '10–12', tips: 'Tarik dengan siku mengarah ke bawah, bukan menarik pakai tangan.' },
      { id: 5, name: 'Barbell Row',           sets: 4, reps: '6–8',   tips: 'Punggung lurus rata, tarik bar ke arah pusar.' },
      { id: 6, name: 'Cable Row',             sets: 3, reps: '10–12', tips: 'Squeeze belikat punggung selama 1 detik di puncak.' },
    ],
    push: [
      { id: 7, name: 'Barbell Bench Press',   sets: 4, reps: '6–8',   tips: 'Pemanasan rotator cuff dulu. Dada turun ke bar.' },
      { id: 8, name: 'Incline DB Press',      sets: 3, reps: '10–12', tips: 'Fokus dada atas, sudut 30–45°.' },
      { id: 9, name: 'Overhead Press',        sets: 3, reps: '8–10',  tips: 'Core kencang, bar naik vertikal di atas kepala.' },
      { id: 10, name: 'Tricep Pushdown',      sets: 3, reps: '12–15', tips: 'Siku terkunci di samping badan.' },
    ],
    pull: [
      { id: 11, name: 'Lat Pulldown',         sets: 3, reps: '10–12', tips: 'Tarik dengan siku, bukan tangan.' },
      { id: 12, name: 'Barbell Row',          sets: 4, reps: '6–8',   tips: 'Punggung lurus, tarik ke perut bawah.' },
      { id: 13, name: 'Cable Row',            sets: 3, reps: '10–12', tips: 'Squeeze punggung di puncak.' },
      { id: 14, name: 'Barbell Curl',         sets: 3, reps: '10–12', tips: 'Full ROM, jangan swinging tubuh.' },
    ],
    leg: [
      { id: 15, name: 'Barbell Squat',        sets: 4, reps: '5–8',   tips: 'Jaga arch pinggang, lutut mengarah ke ujung jari kaki.' },
      { id: 16, name: 'Leg Press',            sets: 3, reps: '10–15', tips: 'Jangan sampai lutut mengunci lurus di atas.' },
      { id: 17, name: 'Romanian Deadlift',    sets: 3, reps: '8–10',  tips: 'Hinge di pinggul, rasakan peregangan hamstring.' },
      { id: 18, name: 'Leg Curl',             sets: 3, reps: '12–15', tips: 'Kontraksi hamstring maksimal di puncak gerakan.' },
    ],
    upper: [
      { id: 19, name: 'Barbell Bench Press',  sets: 4, reps: '6–8',   tips: 'Gerakan compound utama dada dan trisep.' },
      { id: 20, name: 'Barbell Row',          sets: 4, reps: '8–10',  tips: 'Gerakan compound utama penyeimbang punggung.' },
      { id: 21, name: 'Overhead Press',       sets: 3, reps: '8–10',  tips: 'Bahu tegap, dorong barbell lurus ke atas kepala.' },
      { id: 22, name: 'Lat Pulldown',         sets: 3, reps: '10–12', tips: 'Fokus melebarkan otot sayap lats.' },
      { id: 23, name: 'Tricep Pushdown',      sets: 3, reps: '12–15', tips: 'Finisher trisep kabel rope/bar.' },
    ],
    lower: [
      { id: 24, name: 'Barbell Squat',        sets: 4, reps: '6–8',   tips: 'Kekuatan paha depan dan glutes secara menyeluruh.' },
      { id: 25, name: 'Romanian Deadlift',    sets: 3, reps: '8–10',  tips: 'Fokus paha belakang dan rantai posterior.' },
      { id: 26, name: 'Leg Press',            sets: 3, reps: '10–12', tips: 'Volume ekstra paha tanpa membebani tulang belakang.' },
      { id: 27, name: 'Seated Leg Curl',      sets: 3, reps: '12–15', tips: 'Isolasi hamstring.' },
      { id: 28, name: 'Standing Calf Raise',  sets: 4, reps: '15–20', tips: 'Full stretch di bawah, tahan 1 detik di atas.' },
    ],
    shoulderChestBack: [
      { id: 29, name: 'Overhead Press',       sets: 4, reps: '6–8',   tips: 'Prioritas utama bahu.' },
      { id: 30, name: 'Incline DB Press',     sets: 3, reps: '8–10',  tips: 'Fokus dada bagian atas.' },
      { id: 31, name: 'Lat Pulldown',         sets: 3, reps: '10–12', tips: 'Tarikan vertikal punggung.' },
      { id: 32, name: 'Cable Fly',            sets: 3, reps: '12–15', tips: 'Isolasi peregangan dada.' },
      { id: 33, name: 'Cable Row',            sets: 3, reps: '10–12', tips: 'Tarikan horizontal punggung tengah.' },
    ],
  },
};

// Fungsi pencocokan cerdas untuk mengambil daftar latihan sesuai jadwal
export const getWorkoutData = (alat, jenisLatihan) => {
  if (!jenisLatihan || jenisLatihan.toLowerCase().includes('rest')) return [];

  const key = (alat === 'ransel' || alat === 'non-kalistenik') ? 'nonKalistenik' : alat;
  const src = DB[key] ?? DB.nonKalistenik;
  const jenis = jenisLatihan.toLowerCase();

  // 1. Shoulder, chest, back (Khusus jadwal 4 hari Jumat)
  if (jenis.includes('shoulder')) {
    return src.shoulderChestBack ?? [...(src.chest || []), ...(src.back || [])];
  }

  // 2. Full Body - Upper
  if (jenis.includes('upper')) {
    return src.upper ?? [...(src.chest || []), ...(src.back || [])];
  }

  // 3. Full Body - Lower
  if (jenis.includes('lower')) {
    return src.lower ?? src.leg;
  }

  // 4. Chest spesifik
  if (jenis.includes('chest')) {
    return src.chest ?? src.push;
  }

  // 5. Back spesifik
  if (jenis.includes('back')) {
    return src.back ?? src.pull;
  }

  // 6. Push
  if (jenis.includes('push')) {
    return src.push;
  }

  // 7. Pull
  if (jenis.includes('pull')) {
    return src.pull;
  }

  // 8. Leg / Legs
  if (jenis.includes('leg')) {
    return src.leg;
  }

  // 9. Full body umum fallback
  if (jenis.includes('full')) {
    return src.upper ?? [...(src.push || []), ...(src.leg || [])];
  }

  return src.push;
};
