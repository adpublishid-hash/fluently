import { BookOpen, CheckCircle2, ClipboardList, Lightbulb, PenLine, Volume2 } from 'lucide-react';
import type { ArabicLevelId, ArabicSkillId } from './arabicModuleData';
import { getArabicLessonPreview } from './beginner/generatedBeginnerArabicContent';

type ArabicExample = {
  arabic: string;
  transliteration: string;
  meaning: string;
};

type SupplementData = {
  topic: string;
  objective: string;
  concepts: string[];
  patterns: Array<{ label: string; value: string; note: string }>;
  examples: ArabicExample[];
  drills: string[];
  checklist: string[];
};

const topicBank: Record<ArabicSkillId, Partial<Record<ArabicLevelId, string[]>>> = {
  kalam: {
    pemula: [
      'salam dan sapaan', 'memperkenalkan nama', 'asal negara', 'menanyakan kabar', 'ucapan terima kasih',
      'permintaan maaf', 'izin dan permisi', 'keluarga dekat', 'benda di kelas', 'aktivitas harian',
      'makanan dan minuman', 'angka sederhana', 'waktu dan jam', 'arah sederhana', 'berbelanja ringan',
      'transportasi', 'hobi', 'cuaca', 'janji bertemu', 'review dialog pemula',
    ],
    elementary: [
      'dialog perkenalan panjang', 'rutinitas harian', 'keluarga dan pekerjaan', 'sekolah dan jadwal', 'rumah dan lingkungan',
      'memesan makanan', 'belanja dan harga', 'arah jalan', 'rencana akhir pekan', 'kesehatan ringan',
      'hobi dan alasan', 'cuaca dan musim', 'mengundang teman', 'menceritakan pengalaman', 'rencana masa depan',
      'deskripsi orang', 'tempat umum', 'pesan telepon', 'wawancara mini', 'review percakapan A2',
    ],
    intermediate: [
      'diskusi pengalaman belajar', 'menyampaikan pendapat', 'setuju dan tidak setuju', 'memberi alasan', 'menceritakan kejadian lampau',
      'rencana dan target', 'membandingkan pilihan', 'meminta klarifikasi', 'menjelaskan masalah', 'memberi solusi',
      'wawancara pekerjaan sederhana', 'presentasi singkat', 'negosiasi ringan', 'diskusi perjalanan', 'cerita pengalaman pribadi',
      'menjelaskan proses', 'memberi saran', 'menyimpulkan percakapan', 'debat ringan', 'review kalam B1',
    ],
  },
  istima: {
    pemula: [
      'bunyi pendek dan panjang', 'salam terdengar', 'nama orang', 'asal negara', 'kata kelas',
      'kata rumah', 'angka terdengar', 'warna terdengar', 'instruksi kelas', 'makanan dan minuman',
      'apa kabar', 'jam sederhana', 'lokasi benda', 'keluarga terdengar', 'hobi terdengar',
      'arah sederhana', 'dialog pasar', 'dialog sekolah', 'pengumuman pendek', 'cerita audio mini',
    ],
    elementary: [
      'dialog perkenalan', 'rutinitas harian', 'instruksi kelas', 'percakapan keluarga', 'dialog sekolah',
      'dialog rumah', 'belanja sederhana', 'pesanan restoran', 'arah jalan', 'janji bertemu',
      'cuaca harian', 'hobi dan waktu luang', 'pengumuman pendek', 'cerita lampau sederhana', 'rencana akhir pekan',
      'deskripsi orang', 'lokasi tempat umum', 'pesan suara pendek', 'wawancara mini', 'review listening A2',
    ],
    intermediate: [
      'dialog cepat terkontrol', 'opini dan alasan', 'narasi lampau', 'rencana masa depan', 'pengumuman umum',
      'instruksi bertahap', 'wawancara singkat', 'podcast pendek', 'berita sederhana', 'diskusi kelas',
      'keluhan dan respons', 'saran dan solusi', 'perbandingan pilihan', 'cerita pengalaman', 'percakapan telepon',
      'presentasi mini', 'dialog perjalanan', 'transaksi layanan', 'inti argumen', 'review istima B1',
    ],
  },
  qiraah: {
    pemula: [
      'huruf dan kata pendek', 'salam tertulis', 'nama dan asal', 'keluarga', 'sekolah',
      'rumah', 'waktu harian', 'angka 1-20', 'warna dan benda', 'makanan sederhana',
      'pasar kecil', 'masjid dan tempat umum', 'cuaca', 'hobi', 'transportasi',
      'arah sederhana', 'kesehatan dasar', 'pekerjaan', 'undangan pendek', 'cerita mini',
    ],
    elementary: [
      'paragraf perkenalan', 'kegiatan harian', 'keluarga dan profesi', 'sekolah dan jadwal', 'rumah dan lingkungan',
      'berbelanja', 'makanan dan restoran', 'perjalanan kota', 'arah dan lokasi', 'kesehatan ringan',
      'hobi dan kebiasaan', 'cuaca dan musim', 'undangan dan janji', 'cerita masa lalu sederhana', 'rencana besok',
      'deskripsi orang', 'tempat umum', 'pesan singkat', 'cerita pengalaman', 'review bacaan A2',
    ],
    intermediate: [
      'artikel pendek', 'biografi tokoh', 'pengalaman pribadi', 'teks opini sederhana', 'jadwal dan pengumuman',
      'instruksi prosedur', 'surat formal ringan', 'deskripsi budaya', 'cerita lampau', 'rencana masa depan',
      'teks perbandingan', 'teks sebab-akibat', 'iklan dan informasi', 'berita sederhana', 'ringkasan cerita',
      'dialog tertulis', 'teks argumentasi ringan', 'laporan pendek', 'membaca intensif', 'review qiraah B1',
    ],
  },
  kitabah: {
    pemula: [
      'menulis huruf sambung', 'menyalin kata berharakat', 'menulis salam', 'identitas diri', 'jumlah ismiyyah sederhana',
      'kata tunjuk', 'dhamir dasar', 'benda di kelas', 'keluarga saya', 'rutinitas pagi',
      'kalimat tanya', 'jawaban ya/tidak', 'preposisi dasar', 'deskripsi warna', 'angka dalam kalimat',
      'pesan pendek', 'paragraf 3 kalimat', 'dialog mini', 'kartu perkenalan', 'review tulisan pemula',
    ],
    elementary: [
      'paragraf identitas diri', 'rutinitas harian', 'email sederhana', 'deskripsi keluarga', 'deskripsi rumah',
      'menulis jadwal', 'catatan belanja', 'dialog tertulis', 'instruksi arah', 'pesan permintaan maaf',
      'kalimat lampau sederhana', 'kalimat rencana', 'menghubungkan kalimat', 'deskripsi tempat', 'pendapat sederhana',
      'cerita 5 kalimat', 'formulir data diri', 'undangan pendek', 'balasan pesan', 'portfolio tulisan A2',
    ],
    intermediate: [
      'paragraf opini', 'email semi-formal', 'cerita pengalaman', 'ringkasan teks', 'deskripsi proses',
      'surat permintaan', 'pesan keluhan sopan', 'perbandingan dua hal', 'rencana belajar', 'laporan singkat',
      'sebab dan akibat', 'kalimat penghubung', 'narasi lampau', 'argumen sederhana', 'review tulisan teman',
      'teks instruksi', 'catatan presentasi', 'dialog tertulis panjang', 'portfolio B1', 'review kitabah B1',
    ],
  },
  mufradat: {
    pemula: [
      'salam', 'keluarga', 'kelas', 'rumah', 'angka 1-20', 'warna', 'makanan', 'minuman', 'hari', 'waktu',
      'anggota tubuh', 'pakaian', 'transportasi', 'tempat umum', 'profesi', 'hewan', 'cuaca', 'hobi', 'kata kerja harian', 'sifat dasar',
      'arah', 'belanja', 'alat tulis', 'buah', 'sayur', 'peralatan rumah', 'masjid', 'sekolah', 'kota', 'negara',
      'perasaan', 'kesehatan', 'keluarga besar', 'aktivitas pagi', 'aktivitas malam', 'pertanyaan umum', 'kata sambung', 'kata depan', 'ungkapan sopan', 'review mufradat',
    ],
    elementary: [
      'rutinitas harian', 'sekolah dan jadwal', 'keluarga dan profesi', 'belanja dan harga', 'restoran',
      'rumah dan ruangan', 'kota dan arah', 'kesehatan', 'hobi dan olahraga', 'cuaca dan musim',
      'perjalanan', 'teknologi sederhana', 'perasaan dan pendapat', 'kata kerja lampau', 'kata kerja rencana',
      'deskripsi orang', 'tempat umum', 'undangan', 'pengalaman', 'review tematik', 'portfolio kosakata',
    ],
    intermediate: [
      'opini dan argumen', 'pendidikan', 'pekerjaan', 'media dan teknologi', 'lingkungan',
      'kesehatan dan gaya hidup', 'perjalanan', 'budaya', 'ekonomi harian', 'layanan publik',
      'kata penghubung', 'kata kerja abstrak', 'ungkapan sebab-akibat', 'ungkapan perbandingan', 'ungkapan saran',
      'kolokasi umum', 'sinonim dasar', 'antonim dasar', 'frasa presentasi', 'review mufradat B1',
    ],
  },
  grammar: {
    pemula: [
      'isim dan fiil', 'mubtada dan khabar', 'kata tunjuk', 'dhamir munfashil', 'jenis mudzakkar muannats',
      'mufrad mutsanna jamak', 'huruf jar', 'jumlah ismiyyah', 'jumlah fiiliyyah', 'kata tanya',
      'naat dan manuut', 'idafah dasar', 'fiil madhi', 'fiil mudhari', 'fiil amr',
      'negasi laa', 'negasi maa', 'urutan kata', 'kalimat sederhana', 'review nahwu pemula',
    ],
    elementary: [
      'jumlah ismiyyah lanjutan', 'jumlah fiiliyyah lanjutan', 'fiil madhi dan pelaku', 'fiil mudhari dan pelaku', 'huruf jar dalam kalimat',
      'idafah dalam konteks', 'naat manuut', 'kana dan saudaranya', 'inna dan saudaranya', 'review grammar A2',
    ],
    intermediate: [
      'fiil madhi pola dasar', 'fiil mudhari marfu', 'manshub setelah an/lan', 'majzum setelah lam', 'faail dan maful bih',
      'naibul faail dasar', 'kana dan khabar', 'inna dan isimnya', 'idafah kompleks', 'naat manuut kompleks',
      'hal sederhana', 'tamyiz dasar', 'jumlah sebagai khabar', 'isim maushul', 'dhamir muttashil',
      'fiil mujarad dan mazid', 'wazan faala', 'wazan faala/yufaailu', 'kalimat syarat sederhana', 'review nahwu-sharaf B1',
    ],
  },
  pronunciation: {
    pemula: [
      'makharij tenggorokan', 'huruf bibir', 'huruf lidah depan', 'huruf tebal', 'huruf tipis',
      'harakat fathah', 'kasrah', 'dhammah', 'sukun', 'tasydid',
      'mad asli', 'hamzah', 'ain dan ha', 'qaf dan kaf', 'sin dan shad',
      'dal dan dhad', 'ra tafkhim', 'lam jalalah', 'waqaf pendek', 'review pelafalan pemula',
    ],
    elementary: [
      'kontras bunyi sulit', 'mad lebih stabil', 'tekanan kata', 'intonasi tanya', 'intonasi dialog',
      'waqaf pada kalimat', 'ghunnah dasar', 'idgham ringan', 'ikhfa ringan', 'qalqalah dasar',
      'ritme bacaan', 'pengucapan frasa', 'reduksi jeda', 'latihan minimal pair', 'koreksi mandiri',
      'membaca dialog', 'membaca paragraf', 'latihan rekam ulang', 'fluency pendek', 'review pronunciation A2',
    ],
    intermediate: [
      'kelancaran frasa', 'intonasi opini', 'intonasi narasi', 'waqaf makna', 'mad dalam kalimat',
      'ghunnah stabil', 'qalqalah kuat', 'huruf tebal dalam konteks', 'kontras sad-sin', 'kontras dad-dal',
      'ain natural', 'qaf konsisten', 'hamzah di tengah', 'ritme paragraf', 'reduksi jeda panjang',
      'membaca berita pendek', 'membaca presentasi', 'shadowing dialog', 'rekaman evaluasi', 'review pronunciation B1',
    ],
  },
};

const skillConcepts: Record<ArabicSkillId, string[]> = {
  kalam: [
    'Mulai dari frasa pendek yang bisa langsung dipakai dalam dialog.',
    'Pisahkan fungsi kalimat: menyapa, bertanya, menjawab, meminta, atau menjelaskan.',
    'Latih respons cepat dengan pola tanya-jawab, bukan hanya menghafal satu kalimat.',
  ],
  istima: [
    'Dengarkan sekali untuk menangkap makna umum, lalu dengarkan ulang untuk detail kata.',
    'Fokus pada kata kunci: nama, tempat, angka, waktu, dan kata tanya.',
    'Ulangi audio dengan ritme yang sama agar telinga terbiasa dengan panjang pendek bunyi.',
  ],
  qiraah: [
    'Baca dari kanan ke kiri sambil menandai kata yang sudah dikenal.',
    'Cari struktur kalimat sebelum menerjemahkan kata per kata.',
    'Gunakan konteks untuk menebak arti kata baru sebelum melihat terjemahan.',
  ],
  kitabah: [
    'Tulis kata Arab dari kanan ke kiri dan jaga bentuk huruf awal, tengah, akhir.',
    'Bangun kalimat pendek dulu, lalu tambah keterangan tempat, waktu, atau sifat.',
    'Periksa ulang kesesuaian mudzakkar/muannats dan susunan kata.',
  ],
  mufradat: [
    'Hafalkan kosakata dalam pasangan: kata Arab, arti, dan contoh kalimat.',
    'Kelompokkan kata berdasarkan tema agar mudah dipakai saat berbicara.',
    'Gunakan kosakata baru dalam minimal tiga kalimat berbeda.',
  ],
  grammar: [
    'Pahami fungsi kata dalam kalimat: subjek, predikat, objek, sifat, atau keterangan.',
    'Baca pola terlebih dahulu, lalu ganti kata untuk membuat kalimat baru.',
    'Grammar dipakai untuk membantu makna, bukan sekadar menghafal istilah.',
  ],
  pronunciation: [
    'Dengarkan bunyi target, ucapkan perlahan, lalu bandingkan dengan contoh.',
    'Perhatikan tempat keluarnya huruf: tenggorokan, lidah, bibir, atau rongga mulut.',
    'Latih minimal pair agar bunyi mirip tidak tertukar.',
  ],
};

const baseExamples: Record<ArabicSkillId, ArabicExample[]> = {
  kalam: [
    { arabic: 'السَّلَامُ عَلَيْكُمْ.', transliteration: "As-salamu 'alaikum.", meaning: 'Semoga keselamatan atas kalian.' },
    { arabic: 'مَا اسْمُكَ؟', transliteration: 'Ma ismuka?', meaning: 'Siapa namamu? (laki-laki)' },
    { arabic: 'أَنَا مِنْ إِنْدُونِيسِيَا.', transliteration: 'Ana min Indunisiya.', meaning: 'Saya dari Indonesia.' },
  ],
  istima: [
    { arabic: 'اِسْمَعْ ثُمَّ أَعِدْ.', transliteration: "Isma' tsumma a'id.", meaning: 'Dengarkan lalu ulangi.' },
    { arabic: 'أَيْنَ الْمَدْرَسَةُ؟', transliteration: 'Ayna al-madrasatu?', meaning: 'Di mana sekolah itu?' },
    { arabic: 'السَّاعَةُ السَّابِعَةُ.', transliteration: "As-sa'atu as-sabi'ah.", meaning: 'Jam tujuh.' },
  ],
  qiraah: [
    { arabic: 'هٰذَا بَيْتٌ كَبِيرٌ.', transliteration: 'Hadza baitun kabirun.', meaning: 'Ini rumah besar.' },
    { arabic: 'الطَّالِبُ فِي الْفَصْلِ.', transliteration: 'Ath-thalibu fi al-fashli.', meaning: 'Siswa itu di kelas.' },
    { arabic: 'أُحِبُّ اللُّغَةَ الْعَرَبِيَّةَ.', transliteration: 'Uhibbu al-lughata al-arabiyyah.', meaning: 'Saya suka bahasa Arab.' },
  ],
  kitabah: [
    { arabic: 'أَنَا طَالِبٌ.', transliteration: 'Ana thalibun.', meaning: 'Saya seorang siswa.' },
    { arabic: 'هٰذِهِ مَدْرَسَتِي.', transliteration: 'Hadzihi madrasati.', meaning: 'Ini sekolah saya.' },
    { arabic: 'أَكْتُبُ جُمْلَةً قَصِيرَةً.', transliteration: 'Aktubu jumlatan qashiratan.', meaning: 'Saya menulis kalimat pendek.' },
  ],
  mufradat: [
    { arabic: 'كِتَابٌ', transliteration: 'Kitabun.', meaning: 'Buku.' },
    { arabic: 'قَلَمٌ', transliteration: 'Qalamun.', meaning: 'Pulpen.' },
    { arabic: 'بَيْتٌ', transliteration: 'Baitun.', meaning: 'Rumah.' },
  ],
  grammar: [
    { arabic: 'زَيْدٌ طَالِبٌ.', transliteration: 'Zaidun thalibun.', meaning: 'Zaid adalah siswa.' },
    { arabic: 'كَتَبَ الطَّالِبُ الدَّرْسَ.', transliteration: 'Kataba ath-thalibu ad-darsa.', meaning: 'Siswa itu menulis pelajaran.' },
    { arabic: 'الْكِتَابُ عَلَى الْمَكْتَبِ.', transliteration: 'Al-kitabu ala al-maktabi.', meaning: 'Buku itu di atas meja.' },
  ],
  pronunciation: [
    { arabic: 'عَ - حَ - هَ - ءَ', transliteration: "A - ha - ha - a.", meaning: 'Latihan huruf tenggorokan.' },
    { arabic: 'قَلْبٌ - كَلْبٌ', transliteration: 'Qalbun - kalbun.', meaning: 'Hati - anjing, bedakan qaf dan kaf.' },
    { arabic: 'صَبَرَ - سَفَرَ', transliteration: 'Shabara - safara.', meaning: 'Bersabar - bepergian, bedakan shad dan sin.' },
  ],
};

function getTopic(levelId: ArabicLevelId, skillId: ArabicSkillId, lessonId: number) {
  if (levelId === 'scholar') return getArabicLessonPreview(skillId, lessonId, 'scholar');
  if (levelId === 'mastery') return getArabicLessonPreview(skillId, lessonId, 'mastery');
  if (levelId === 'proficiency') return getArabicLessonPreview(skillId, lessonId, 'proficiency');
  if (levelId === 'advanced') return getArabicLessonPreview(skillId, lessonId, 'advanced');
  if (levelId === 'upper-intermediate') return getArabicLessonPreview(skillId, lessonId, 'upper-intermediate');
  const topics = topicBank[skillId][levelId] ?? topicBank[skillId].intermediate ?? topicBank[skillId].elementary ?? topicBank[skillId].pemula ?? [];
  return topics[(lessonId - 1) % topics.length];
}

function getPatterns(skillId: ArabicSkillId, levelId: ArabicLevelId): SupplementData['patterns'] {
  const levelNote = levelId === 'scholar'
    ? 'Gunakan kritik sumber, tahqiq ringan, dan struktur riset agar kalimat terasa scholar/research.'
    : levelId === 'mastery'
    ? 'Gunakan turats, balaghah, dan register ahli secara terkontrol agar kalimat terasa post-C2.'
    : levelId === 'proficiency'
    ? 'Gunakan sintesis, ambiguitas terkontrol, dan register mahir agar kalimat terasa C2.'
    : levelId === 'advanced'
    ? 'Tambahkan sintesis, konsesi, dan register akademik/profesional agar kalimat terasa C1.'
    : levelId === 'upper-intermediate'
    ? 'Gunakan penghubung, konsesi, dan detail pendukung agar kalimat terasa B2.'
    : levelId === 'intermediate'
    ? 'Tambahkan alasan, penghubung, atau konteks agar kalimat terasa B1.'
    : levelId === 'elementary'
      ? 'Tambahkan keterangan waktu/tempat agar kalimat lebih A2.'
      : 'Gunakan pola pendek dulu sampai lancar.';

  if (skillId === 'grammar') {
    return [
      { label: 'Jumlah ismiyyah', value: 'مُبْتَدَأٌ + خَبَرٌ', note: 'Contoh: زَيْدٌ طَالِبٌ = Zaid adalah siswa.' },
      { label: "Jumlah fi'liyyah", value: 'فِعْلٌ + فَاعِلٌ + مَفْعُولٌ', note: 'Contoh: كَتَبَ الطَّالِبُ الدَّرْسَ.' },
      { label: 'Huruf jar', value: 'فِي / عَلَى / مِنْ + اِسْمٍ', note: 'Setelah huruf jar, kata benda biasanya majrur.' },
    ];
  }

  if (skillId === 'pronunciation') {
    return [
      { label: 'Dengar', value: 'اِسْمَعْ', note: 'Dengarkan bunyi target tanpa ikut membaca.' },
      { label: 'Tiru', value: 'أَعِدْ', note: 'Ulangi 3 kali dengan kecepatan lambat.' },
      { label: 'Bandingkan', value: 'قَارِنْ', note: 'Bandingkan rekamanmu dengan contoh TTS.' },
    ];
  }

  if (skillId === 'kitabah') {
    return [
      { label: 'Kalimat dasar', value: 'أَنَا + خَبَرٌ', note: 'Contoh: أَنَا طَالِبٌ.' },
      { label: 'Keterangan tempat', value: 'فِي + مَكَانٍ', note: 'Contoh: أَنَا فِي الْبَيْتِ.' },
      { label: 'Perluas kalimat', value: 'جُمْلَةٌ + صِفَةٌ', note: levelNote },
    ];
  }

  if (skillId === 'mufradat') {
    return [
      { label: 'Kata', value: 'كَلِمَةٌ', note: 'Ucapkan kata Arab dengan harakat.' },
      { label: 'Frasa', value: 'صِفَةٌ + مَوْصُوفٌ', note: 'Contoh: كِتَابٌ جَدِيدٌ.' },
      { label: 'Kalimat', value: 'هٰذَا / هٰذِهِ + كَلِمَةٌ', note: 'Masukkan kosakata ke kalimat pendek.' },
    ];
  }

  return [
    { label: 'Tanya', value: 'مَا / أَيْنَ / هَلْ', note: 'Pakai kata tanya sesuai informasi yang dicari.' },
    { label: 'Jawab', value: 'أَنَا / هٰذَا / فِي', note: 'Jawab dengan kalimat pendek dan jelas.' },
    { label: 'Perluas', value: '+ زَمَانٌ / مَكَانٌ / سَبَبٌ', note: levelNote },
  ];
}

function getDrills(skillId: ArabicSkillId, topic: string, levelId: ArabicLevelId) {
  const longer = levelId === 'elementary' || levelId === 'intermediate' || levelId === 'upper-intermediate';
  const advanced = levelId === 'upper-intermediate' || levelId === 'advanced' || levelId === 'proficiency' || levelId === 'mastery' || levelId === 'scholar';

  if (skillId === 'istima') {
    return [
      `Dengarkan contoh TTS tentang ${topic} tanpa melihat arti.`,
      'Tulis 3 kata Arab yang berhasil kamu tangkap.',
      advanced ? 'Catat posisi pembicara, alasan utama, detail pendukung, dan kesimpulan tersirat.' : longer ? 'Jawab: siapa, di mana, kapan, dan apa maksud pembicara?' : 'Jawab: siapa dan apa topiknya?',
    ];
  }

  if (skillId === 'qiraah') {
    return [
      `Baca teks pendek tentang ${topic} dua kali.`,
      'Garisbawahi isim, fiil, atau kata tanya yang kamu kenali.',
      advanced ? 'Tulis evaluasi singkat: klaim penulis, bukti, dan kelemahan argumen.' : longer ? 'Tulis ringkasan 2 kalimat dalam bahasa Indonesia.' : 'Tulis arti umum dalam 1 kalimat.',
    ];
  }

  if (skillId === 'kitabah') {
    return [
      `Tulis 5 kalimat Arab bertema ${topic}.`,
      'Beri transliterasi di bawah setiap kalimat.',
      advanced ? 'Kembangkan menjadi paragraf B2 dengan tesis, konsesi, dan kesimpulan.' : longer ? 'Gabungkan kalimat menjadi paragraf 4-5 kalimat.' : 'Periksa arah tulisan dan bentuk huruf sambung.',
    ];
  }

  if (skillId === 'pronunciation') {
    return [
      'Ucapkan contoh bunyi 5 kali dengan lambat.',
      'Rekam suaramu, lalu cek panjang-pendek harakat.',
      `Buat 3 pasangan kata yang melatih ${topic}.`,
    ];
  }

  if (skillId === 'grammar') {
    return [
      'Identifikasi pola grammar dari 3 contoh kalimat.',
      'Ganti subjek atau kata benda untuk membuat kalimat baru.',
      advanced ? 'Analisis i‘rab 1 paragraf pendek, lalu tulis ulang dengan variasi struktur.' : longer ? 'Tulis 5 kalimat dengan variasi waktu/tempat.' : 'Tulis 3 kalimat dengan pola yang sama.',
    ];
  }

  if (skillId === 'mufradat') {
    return [
      `Hafalkan 10 kosakata utama tentang ${topic}.`,
      'Masukkan 5 kosakata ke kalimat Arab sederhana.',
      advanced ? 'Buat daftar kolokasi formal dan pakai minimal 8 dalam paragraf argumentatif.' : longer ? 'Buat dialog pendek memakai minimal 8 kosakata.' : 'Ulangi kosakata dengan TTS sampai lancar.',
    ];
  }

  return [
    `Latih dialog bertema ${topic} dengan 2 peran.`,
    'Ucapkan pertanyaan dan jawaban secara bergantian.',
    advanced ? 'Tambahkan tesis, alasan, contoh, sanggahan sopan, dan kesimpulan.' : longer ? 'Tambahkan alasan atau keterangan waktu dalam jawaban.' : 'Ulangi sampai bisa menjawab tanpa membaca.',
  ];
}

export function getArabicSupplement(levelId: ArabicLevelId, skillId: ArabicSkillId, lessonId: number): SupplementData {
  const topic = getTopic(levelId, skillId, lessonId);
  const levelName = levelId === 'scholar' ? 'scholar/research' : levelId === 'mastery' ? 'mastery/post-C2' : levelId === 'proficiency' ? 'proficiency/C2' : levelId === 'advanced' ? 'advanced/C1' : levelId === 'upper-intermediate' ? 'upper-intermediate/B2' : levelId === 'intermediate' ? 'intermediate/B1' : levelId === 'elementary' ? 'elementary/A2' : 'pemula/A1';

  return {
    topic,
    objective: `Menguasai materi ${skillId} level ${levelName} bertema ${topic}, lalu mampu memakai contoh Arabnya dalam latihan dengar, baca, tulis, atau bicara.`,
    concepts: skillConcepts[skillId],
    patterns: getPatterns(skillId, levelId),
    examples: baseExamples[skillId],
    drills: getDrills(skillId, topic, levelId),
    checklist: [
      'Saya bisa membaca contoh Arab dengan arah kanan ke kiri.',
      'Saya paham arti umum contoh tanpa menerjemahkan kata per kata.',
      'Saya bisa membuat minimal 2 contoh baru dengan pola yang sama.',
    ],
  };
}

function speakArabic(text: string) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ar-SA';
  utterance.rate = 0.85;
  window.speechSynthesis.speak(utterance);
}

export default function ArabicLessonSupplement({
  levelId,
  skillId,
  lessonId,
}: {
  levelId: ArabicLevelId;
  skillId: ArabicSkillId;
  lessonId: number;
}) {
  const data = getArabicSupplement(levelId, skillId, lessonId);

  return (
    <section className="mx-auto max-w-5xl px-4 pt-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#0F766E]">Materi Tambahan</p>
            <h2 className="mt-1 text-xl font-black text-slate-900 capitalize">{data.topic}</h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">{data.objective}</p>
          </div>
          <div className="rounded-xl bg-teal-50 px-4 py-3 text-sm font-black text-[#0F766E]">
            Lesson {lessonId}
          </div>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <div className="mb-3 flex items-center gap-2 font-black text-slate-900">
              <Lightbulb size={18} className="text-amber-500" />
              Konsep Inti
            </div>
            <div className="space-y-3">
              {data.concepts.map((item) => (
                <div key={item} className="flex gap-2 text-sm leading-relaxed text-slate-700">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#0F766E]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <div className="mb-3 flex items-center gap-2 font-black text-slate-900">
              <BookOpen size={18} className="text-blue-500" />
              Pola/Rumus
            </div>
            <div className="space-y-3">
              {data.patterns.map((pattern) => (
                <div key={pattern.label} className="rounded-lg bg-white p-3">
                  <p className="text-xs font-black uppercase tracking-wider text-slate-400">{pattern.label}</p>
                  <p dir="rtl" lang="ar" className="mt-1 text-xl font-bold text-slate-900">{pattern.value}</p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">{pattern.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <div className="mb-3 flex items-center gap-2 font-black text-slate-900">
              <ClipboardList size={18} className="text-violet-500" />
              Latihan Mandiri
            </div>
            <div className="space-y-3">
              {data.drills.map((item, index) => (
                <div key={item} className="flex gap-3 rounded-lg bg-white p-3 text-sm leading-relaxed text-slate-700">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0F766E] text-xs font-black text-white">{index + 1}</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-teal-100 bg-teal-50/60 p-4">
          <div className="mb-3 flex items-center gap-2 font-black text-slate-900">
            <Volume2 size={18} className="text-[#0F766E]" />
            Contoh Berharakat + TTS
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {data.examples.map((example) => (
              <div key={example.arabic} className="rounded-xl border border-white/80 bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <p dir="rtl" lang="ar" className="text-2xl font-bold leading-relaxed text-slate-900">{example.arabic}</p>
                  <button
                    onClick={() => speakArabic(example.arabic)}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-[#0F766E] transition hover:bg-teal-100"
                    title="Dengarkan contoh Arab"
                  >
                    <Volume2 size={17} />
                  </button>
                </div>
                <p className="mt-2 text-xs font-semibold text-slate-500">{example.transliteration}</p>
                <p className="mt-1 text-sm text-slate-700">{example.meaning}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <div className="mb-2 flex items-center gap-2 font-black text-amber-900">
            <PenLine size={18} />
            Checklist Penguasaan
          </div>
          <div className="grid gap-2 md:grid-cols-3">
            {data.checklist.map((item) => (
              <div key={item} className="flex gap-2 text-sm leading-relaxed text-amber-900">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
