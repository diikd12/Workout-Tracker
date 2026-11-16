export const MAKAN_DATA = {
  bulking: {
    target: 'Surplus kalori +300 hingga +500 kkal per hari',
    makro: { protein: '1.8–2.2g per kg berat badan', karbo: '45–55% total kalori', lemak: '25–30% total kalori' },
    tips: [
      'Makan setiap 3–4 jam untuk menjaga nitrogen positif di otot.',
      'Prioritaskan protein kompleks setelah latihan dalam 30 menit pertama.',
      'Hindari lemak jenuh berlebihan — pilih lemak tak jenuh seperti alpukat dan kacang.',
    ],
    menu: [
      { waktu: 'Sarapan (07.00)', items: ['Oatmeal 100g + pisang + madu', '4 butir telur rebus (3 putih 1 kuning)', '1 gelas susu full cream'] },
      { waktu: 'Makan Siang (12.00)', items: ['Nasi merah 200g', 'Dada ayam 200g (panggang/rebus)', 'Brokoli + wortel rebus', 'Alpukat setengah buah'] },
      { waktu: 'Camilan Pre-Workout (15.00)', items: ['Roti gandum 2 lembar + selai kacang', '1 pisang atau 1 apel'] },
      { waktu: 'Post-Workout (Setelah Latihan)', items: ['Protein shake atau 3 putih telur', 'Nasi putih 150g atau 1 buah ubi rebus'] },
      { waktu: 'Makan Malam (19.00)', items: ['Nasi merah 150g', 'Ikan salmon/tuna 150g', 'Sayuran hijau tumis minyak zaitun', 'Yogurt Greek plain'] },
    ],
  },
  cutting: {
    target: 'Defisit kalori -300 hingga -500 kkal per hari',
    makro: { protein: '2.2–2.5g per kg berat badan (lebih tinggi untuk jaga otot)', karbo: '30–40% total kalori (utamakan karbohidrat kompleks)', lemak: '20–25% total kalori' },
    tips: [
      'Perbanyak serat (sayuran, legum) untuk menekan rasa lapar tanpa kalori berlebih.',
      'Jangan potong kalori terlalu drastis — kehilangan otot lebih dari lemak adalah tanda cutting salah.',
      'Timing makan protein tetap penting: konsumsi protein tinggi di setiap makan utama.',
    ],
    menu: [
      { waktu: 'Sarapan (07.00)', items: ['3 putih telur + 1 kuning telur scramble', 'Oatmeal 60g tanpa gula + buah beri', '1 gelas air mineral + kopi hitam (opsional)'] },
      { waktu: 'Makan Siang (12.00)', items: ['Nasi merah 100g (porsi kecil)', 'Dada ayam 180g (panggang tanpa minyak)', 'Salad sayuran hijau (selada, timun, tomat)', 'Dressing: lemon + sedikit minyak zaitun'] },
      { waktu: 'Camilan (15.00)', items: ['Greek yogurt plain tanpa gula 150g', 'Segenggam almond atau kacang tanah (20–25 biji)'] },
      { waktu: 'Post-Workout', items: ['Dada ayam rebus 150g atau putih telur 4 butir', 'Sayuran kukus (brokoli, bayam)'] },
      { waktu: 'Makan Malam (19.00)', items: ['Ikan putih (kakap/kembung) 150g kukus', 'Sayuran hijau rebus tanpa minyak', 'Tahu/tempe 100g', 'Hindari karbohidrat sederhana di malam hari'] },
    ],
  },
};
