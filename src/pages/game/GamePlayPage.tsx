// @ts-nocheck
import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Check, ChevronRight, Headphones, Keyboard, RotateCcw, Timer, Trophy, Volume2, X } from 'lucide-react';
import PageContainer from '../../components/layout/PageContainer';

type GameStats = {
  xp: number;
  played: number;
  completed: number;
  bestScore: number;
  modeBest: Record<string, number>;
};

const defaultStats: GameStats = {
  xp: 0,
  played: 0,
  completed: 0,
  bestScore: 0,
  modeBest: {},
};

const wordBank = [
  { word: 'Schedule', answer: 'Jadwal', options: ['Jadwal', 'Kantor', 'Rapat', 'Kebiasaan'], hint: 'A plan for time.' },
  { word: 'Improve', answer: 'Meningkatkan', options: ['Meningkatkan', 'Menghapus', 'Menunggu', 'Membayar'], hint: 'To make better.' },
  { word: 'Confident', answer: 'Percaya diri', options: ['Percaya diri', 'Bingung', 'Lelah', 'Terlambat'], hint: 'Feeling sure.' },
  { word: 'Meeting', answer: 'Rapat', options: ['Rapat', 'Tiket', 'Kamus', 'Hadiah'], hint: 'People discuss something.' },
  { word: 'Practice', answer: 'Berlatih', options: ['Berlatih', 'Berbelanja', 'Beristirahat', 'Berangkat'], hint: 'Do it again to get better.' },
  { word: 'Goal', answer: 'Tujuan', options: ['Tujuan', 'Kesalahan', 'Ruangan', 'Pesanan'], hint: 'Something you want to reach.' },
  { word: 'Polite', answer: 'Sopan', options: ['Sopan', 'Keras', 'Cepat', 'Mahal'], hint: 'Respectful in behavior.' },
  { word: 'Explain', answer: 'Menjelaskan', options: ['Menjelaskan', 'Membeli', 'Menghapus', 'Menutup'], hint: 'Make something clear.' },
];

function makeListenItem(word: string, answer: string, level: 'Easy' | 'Medium' | 'Hard', distractors: string[]) {
  return {
    word,
    answer,
    options: shuffle([answer, ...distractors]).slice(0, 4),
    hint: level,
    level,
  };
}

const listenTapQuestions = [
  ...[
    ['Apple', 'Apel', ['Buku', 'Kursi', 'Air']], ['Book', 'Buku', ['Apel', 'Pintu', 'Kue']], ['Water', 'Air', ['Roti', 'Tas', 'Topi']],
    ['House', 'Rumah', ['Ikan', 'Sepatu', 'Pensil']], ['School', 'Sekolah', ['Meja', 'Bola', 'Jam']], ['Teacher', 'Guru', ['Murid', 'Mobil', 'Kucing']],
    ['Friend', 'Teman', ['Ayah', 'Jalan', 'Lampu']], ['Family', 'Keluarga', ['Makanan', 'Bunga', 'Kereta']], ['Morning', 'Pagi', ['Malam', 'Bulan', 'Hujan']],
    ['Night', 'Malam', ['Pagi', 'Tangan', 'Kunci']], ['Food', 'Makanan', ['Minuman', 'Kertas', 'Kaca']], ['Bread', 'Roti', ['Susu', 'Baju', 'Pohon']],
    ['Milk', 'Susu', ['Roti', 'Ikan', 'Pintu']], ['Table', 'Meja', ['Kursi', 'Langit', 'Tas']], ['Chair', 'Kursi', ['Meja', 'Roda', 'Jam']],
    ['Door', 'Pintu', ['Jendela', 'Buku', 'Kue']], ['Window', 'Jendela', ['Pintu', 'Topi', 'Pulpen']], ['Bag', 'Tas', ['Sepatu', 'Air', 'Lampu']],
    ['Pen', 'Pulpen', ['Pensil', 'Roti', 'Bulan']], ['Pencil', 'Pensil', ['Pulpen', 'Kucing', 'Jam']], ['Cat', 'Kucing', ['Anjing', 'Guru', 'Sekolah']],
    ['Dog', 'Anjing', ['Kucing', 'Rumah', 'Teman']], ['Fish', 'Ikan', ['Burung', 'Roti', 'Air']], ['Bird', 'Burung', ['Ikan', 'Tas', 'Pagi']],
    ['Sun', 'Matahari', ['Bulan', 'Hujan', 'Pohon']], ['Moon', 'Bulan', ['Matahari', 'Air', 'Jalan']], ['Tree', 'Pohon', ['Bunga', 'Pintu', 'Susu']],
    ['Flower', 'Bunga', ['Pohon', 'Buku', 'Malam']], ['Car', 'Mobil', ['Kereta', 'Kursi', 'Makanan']], ['Train', 'Kereta', ['Mobil', 'Pagi', 'Jendela']],
  ].map(([word, answer, distractors]) => makeListenItem(word, answer, 'Easy', distractors as string[])),
  ...[
    ['Schedule', 'Jadwal', ['Tujuan', 'Rapat', 'Kebiasaan']], ['Improve', 'Meningkatkan', ['Menghapus', 'Menunggu', 'Membayar']], ['Confident', 'Percaya diri', ['Bingung', 'Lelah', 'Terlambat']],
    ['Meeting', 'Rapat', ['Tiket', 'Kamus', 'Hadiah']], ['Practice', 'Berlatih', ['Belanja', 'Istirahat', 'Berangkat']], ['Goal', 'Tujuan', ['Kesalahan', 'Ruangan', 'Pesanan']],
    ['Polite', 'Sopan', ['Keras', 'Cepat', 'Mahal']], ['Explain', 'Menjelaskan', ['Membeli', 'Menghapus', 'Menutup']], ['Important', 'Penting', ['Mudah', 'Kosong', 'Lambat']],
    ['Different', 'Berbeda', ['Sama', 'Pendek', 'Murah']], ['Decide', 'Memutuskan', ['Membuka', 'Menarik', 'Menyimpan']], ['Prepare', 'Mempersiapkan', ['Menolak', 'Mencuci', 'Menggambar']],
    ['Arrive', 'Tiba', ['Pergi', 'Tinggal', 'Makan']], ['Leave', 'Berangkat', ['Datang', 'Tidur', 'Membaca']], ['Borrow', 'Meminjam', ['Menjual', 'Membakar', 'Membawa']],
    ['Return', 'Mengembalikan', ['Meminjam', 'Melepas', 'Menyalakan']], ['Choose', 'Memilih', ['Menunggu', 'Melompat', 'Menutup']], ['Remember', 'Mengingat', ['Melupakan', 'Membagi', 'Membeli']],
    ['Forget', 'Melupakan', ['Mengingat', 'Menjelaskan', 'Mencari']], ['Invite', 'Mengundang', ['Menolak', 'Menyuruh', 'Menyalin']], ['Accept', 'Menerima', ['Menolak', 'Menyimpan', 'Mencoba']],
    ['Refuse', 'Menolak', ['Menerima', 'Mengirim', 'Mendengar']], ['Describe', 'Mendeskripsikan', ['Mengangkat', 'Menabung', 'Mencetak']], ['Compare', 'Membandingkan', ['Menghindari', 'Mengeringkan', 'Menjawab']],
    ['Support', 'Mendukung', ['Menyerang', 'Mengunci', 'Melepas']], ['Advice', 'Saran', ['Masalah', 'Uang', 'Tanda']], ['Question', 'Pertanyaan', ['Jawaban', 'Gambar', 'Pesan']],
    ['Answer', 'Jawaban', ['Pertanyaan', 'Kebiasaan', 'Ruangan']], ['Office', 'Kantor', ['Pasar', 'Sekolah', 'Taman']], ['Market', 'Pasar', ['Kantor', 'Stasiun', 'Bandara']],
  ].map(([word, answer, distractors]) => makeListenItem(word, answer, 'Medium', distractors as string[])),
  ...[
    ['Opportunity', 'Kesempatan', ['Kewajiban', 'Perkiraan', 'Peringatan']], ['Responsibility', 'Tanggung jawab', ['Kesempatan', 'Keuntungan', 'Perbandingan']], ['Achievement', 'Pencapaian', ['Kegagalan', 'Perjalanan', 'Persetujuan']],
    ['Requirement', 'Persyaratan', ['Rekomendasi', 'Pencapaian', 'Keraguan']], ['Recommendation', 'Rekomendasi', ['Larangan', 'Keterlambatan', 'Persediaan']], ['Environment', 'Lingkungan', ['Peralatan', 'Pemerintah', 'Pemasaran']],
    ['Development', 'Pengembangan', ['Pengurangan', 'Pemeriksaan', 'Pertemuan']], ['Agreement', 'Kesepakatan', ['Pertanyaan', 'Persaingan', 'Keterampilan']], ['Challenge', 'Tantangan', ['Keuntungan', 'Kebiasaan', 'Kebutuhan']],
    ['Solution', 'Solusi', ['Masalah', 'Alasan', 'Sumber']], ['Evidence', 'Bukti', ['Dugaan', 'Rencana', 'Pengaruh']], ['Research', 'Penelitian', ['Pelatihan', 'Perjalanan', 'Persediaan']],
    ['Strategy', 'Strategi', ['Kebetulan', 'Kecepatan', 'Kelemahan']], ['Performance', 'Kinerja', ['Peralatan', 'Permintaan', 'Pengiriman']], ['Progress', 'Kemajuan', ['Kemunduran', 'Peringatan', 'Persaingan']],
    ['Feedback', 'Umpan balik', ['Kesimpulan', 'Pertukaran', 'Permintaan']], ['Negotiation', 'Negosiasi', ['Pengumuman', 'Penjelasan', 'Pendaftaran']], ['Presentation', 'Presentasi', ['Percakapan', 'Peraturan', 'Pengulangan']],
    ['Conversation', 'Percakapan', ['Presentasi', 'Kesepakatan', 'Peralatan']], ['Instruction', 'Instruksi', ['Gangguan', 'Perkiraan', 'Pengalaman']], ['Information', 'Informasi', ['Imajinasi', 'Kesempatan', 'Peringatan']],
    ['Application', 'Aplikasi', ['Perjanjian', 'Persetujuan', 'Penghasilan']], ['Experience', 'Pengalaman', ['Perbedaan', 'Kesulitan', 'Kebijakan']], ['Management', 'Manajemen', ['Pengukuran', 'Pendaftaran', 'Pertimbangan']],
    ['Customer', 'Pelanggan', ['Pesaing', 'Pekerja', 'Pemimpin']], ['Competitor', 'Pesaing', ['Pelanggan', 'Penasihat', 'Pengunjung']], ['Audience', 'Audiens', ['Penulis', 'Pembicara', 'Pengguna']],
    ['Deadline', 'Tenggat waktu', ['Jadwal harian', 'Jam istirahat', 'Waktu luang']], ['Priority', 'Prioritas', ['Pilihan', 'Perintah', 'Perubahan']], ['Efficiency', 'Efisiensi', ['Kreativitas', 'Kesabaran', 'Ketepatan']],
  ].map(([word, answer, distractors]) => makeListenItem(word, answer, 'Hard', distractors as string[])),
];

const sentenceBank = [
  { prompt: 'Saya belajar bahasa Inggris setiap hari.', answer: ['I', 'study', 'English', 'every', 'day'], words: ['day', 'I', 'English', 'every', 'study'] },
  { prompt: 'Dia sedang membaca buku sekarang.', answer: ['She', 'is', 'reading', 'a', 'book', 'now'], words: ['book', 'is', 'now', 'She', 'a', 'reading'] },
  { prompt: 'Kami akan pergi ke kantor besok.', answer: ['We', 'will', 'go', 'to', 'the', 'office', 'tomorrow'], words: ['office', 'We', 'to', 'tomorrow', 'will', 'the', 'go'] },
  { prompt: 'Mereka sudah menyelesaikan latihan itu.', answer: ['They', 'have', 'finished', 'the', 'exercise'], words: ['finished', 'They', 'exercise', 'have', 'the'] },
  { prompt: 'Bisakah kamu membantu saya?', answer: ['Can', 'you', 'help', 'me'], words: ['help', 'Can', 'me', 'you'] },
  { prompt: 'Saya ingin meningkatkan kemampuan berbicara saya.', answer: ['I', 'want', 'to', 'improve', 'my', 'speaking', 'skill'], words: ['speaking', 'I', 'skill', 'to', 'my', 'want', 'improve'] },
];

function makeSentenceItem(prompt: string, answer: string, level: 'Easy' | 'Medium' | 'Hard') {
  const words = answer.split(' ');
  return { prompt, answer: words, words: shuffle(words), level };
}

const sentenceBuilderQuestions = [
  ...[
    ['Saya suka apel.', 'I like apples'],
    ['Dia membaca buku.', 'She reads a book'],
    ['Kami pergi ke sekolah.', 'We go to school'],
    ['Mereka bermain sepak bola.', 'They play football'],
    ['Ini adalah rumah saya.', 'This is my house'],
    ['Kamu minum air.', 'You drink water'],
    ['Dia adalah guru.', 'He is a teacher'],
    ['Saya punya seekor kucing.', 'I have a cat'],
    ['Kami makan sarapan.', 'We eat breakfast'],
    ['Mereka tinggal di Jakarta.', 'They live in Jakarta'],
    ['Saya belajar bahasa Inggris.', 'I study English'],
    ['Dia menulis surat.', 'She writes a letter'],
    ['Kamu membuka pintu.', 'You open the door'],
    ['Kami menonton film.', 'We watch a movie'],
    ['Mereka membeli roti.', 'They buy bread'],
    ['Saya mendengar musik.', 'I listen to music'],
    ['Dia memasak nasi.', 'She cooks rice'],
    ['Kamu memakai topi.', 'You wear a hat'],
    ['Kami membaca cerita.', 'We read a story'],
    ['Mereka naik bus.', 'They take the bus'],
    ['Saya bangun pagi.', 'I wake up early'],
    ['Dia berjalan cepat.', 'He walks fast'],
    ['Kamu terlihat bahagia.', 'You look happy'],
    ['Kami bekerja di kantor.', 'We work in an office'],
    ['Mereka belajar bersama.', 'They study together'],
    ['Saya membutuhkan pensil.', 'I need a pencil'],
    ['Dia membawa tas.', 'She carries a bag'],
    ['Kamu makan kue.', 'You eat cake'],
    ['Kami menyukai permainan ini.', 'We like this game'],
    ['Mereka pulang sekarang.', 'They go home now'],
  ].map(([prompt, answer]) => makeSentenceItem(prompt, answer, 'Easy')),
  ...[
    ['Saya sedang membaca buku sekarang.', 'I am reading a book now'],
    ['Dia sedang belajar untuk ujian.', 'She is studying for the test'],
    ['Kami akan pergi besok pagi.', 'We will go tomorrow morning'],
    ['Mereka sudah menyelesaikan latihan itu.', 'They have finished the exercise'],
    ['Saya ingin meningkatkan kemampuan berbicara saya.', 'I want to improve my speaking skill'],
    ['Bisakah kamu membantu saya hari ini?', 'Can you help me today'],
    ['Dia tidak suka makanan pedas.', 'He does not like spicy food'],
    ['Kami sedang menunggu teman kami.', 'We are waiting for our friend'],
    ['Mereka akan mengunjungi museum minggu depan.', 'They will visit the museum next week'],
    ['Saya pernah melihat film itu.', 'I have seen that movie'],
    ['Jika hujan, kami akan tinggal di rumah.', 'If it rains we will stay home'],
    ['Dia lebih tinggi daripada saudaranya.', 'He is taller than his brother'],
    ['Kamu harus menyelesaikan tugasmu dulu.', 'You should finish your homework first'],
    ['Kami tidak bisa datang ke pesta.', 'We cannot come to the party'],
    ['Mereka sedang membicarakan rencana baru.', 'They are talking about a new plan'],
    ['Saya biasanya minum kopi di pagi hari.', 'I usually drink coffee in the morning'],
    ['Dia mengirim email kepada manajernya.', 'She sent an email to her manager'],
    ['Kami telah belajar selama dua jam.', 'We have studied for two hours'],
    ['Kamu harus berbicara lebih pelan.', 'You need to speak more slowly'],
    ['Mereka sedang mencari alamat restoran.', 'They are looking for the restaurant address'],
    ['Saya akan meneleponmu setelah rapat.', 'I will call you after the meeting'],
    ['Dia membeli hadiah untuk ibunya.', 'She bought a gift for her mother'],
    ['Kami belum memutuskan tanggalnya.', 'We have not decided the date yet'],
    ['Kamu bisa memilih kursus yang berbeda.', 'You can choose a different course'],
    ['Mereka tiba lebih awal dari kami.', 'They arrived earlier than us'],
    ['Saya sedang mencoba memahami instruksinya.', 'I am trying to understand the instructions'],
    ['Dia harus berlatih setiap hari.', 'He has to practice every day'],
    ['Kami ingin memesan meja untuk empat orang.', 'We would like to book a table for four'],
    ['Kamu tidak perlu khawatir tentang itu.', 'You do not need to worry about it'],
    ['Mereka akan mulai proyek baru bulan depan.', 'They will start a new project next month'],
  ].map(([prompt, answer]) => makeSentenceItem(prompt, answer, 'Medium')),
  ...[
    ['Meskipun cuacanya buruk, kami tetap melanjutkan perjalanan.', 'Although the weather was bad we continued the trip'],
    ['Saya akan menghubungimu segera setelah saya menerima informasi terbaru.', 'I will contact you as soon as I receive the latest information'],
    ['Dia menyarankan agar kami meninjau ulang laporan itu sebelum rapat.', 'She suggested that we review the report before the meeting'],
    ['Jika saya punya lebih banyak waktu, saya akan mengikuti kursus tambahan.', 'If I had more time I would take an additional course'],
    ['Proyek itu telah selesai sebelum klien meminta perubahan.', 'The project had been completed before the client requested changes'],
    ['Kami sedang mempertimbangkan apakah akan memperluas layanan ke kota lain.', 'We are considering whether to expand the service to another city'],
    ['Semakin sering kamu berlatih, semakin percaya diri kamu akan berbicara.', 'The more you practice the more confident you will become'],
    ['Dia tidak hanya menyelesaikan tugasnya, tetapi juga membantu tim lain.', 'She not only completed her task but also helped another team'],
    ['Saya berharap saya telah mempersiapkan presentasi itu lebih awal.', 'I wish I had prepared the presentation earlier'],
    ['Keputusan itu dibuat setelah semua risiko dianalisis dengan hati-hati.', 'The decision was made after all risks were carefully analyzed'],
    ['Kami perlu memastikan bahwa semua peserta memahami instruksinya.', 'We need to ensure that all participants understand the instructions'],
    ['Buku yang kamu rekomendasikan kemarin sangat membantu untuk penelitian saya.', 'The book that you recommended yesterday was very helpful for my research'],
    ['Dia berbicara seolah-olah dia sudah mengetahui hasil akhirnya.', 'He spoke as if he already knew the final result'],
    ['Walaupun topiknya sulit, penjelasan guru itu sangat mudah diikuti.', 'Although the topic was difficult the teacher explanation was easy to follow'],
    ['Saya lebih suka bekerja dari rumah daripada menghabiskan waktu di perjalanan.', 'I would rather work from home than spend time commuting'],
    ['Laporan itu harus dikirim sebelum manajer meninggalkan kantor.', 'The report must be submitted before the manager leaves the office'],
    ['Kami tidak akan berhasil kecuali semua orang bekerja sama.', 'We will not succeed unless everyone works together'],
    ['Presentasi yang sedang kamu siapkan akan menentukan langkah berikutnya.', 'The presentation that you are preparing will determine the next step'],
    ['Dia meminta saya menjelaskan mengapa biaya proyek meningkat.', 'He asked me to explain why the project cost had increased'],
    ['Semua dokumen telah diperiksa sebelum kontrak ditandatangani.', 'All documents had been checked before the contract was signed'],
    ['Saya akan menghadiri pelatihan itu asalkan jadwal saya tidak berubah.', 'I will attend the training provided that my schedule does not change'],
    ['Mereka sedang mengembangkan aplikasi yang dapat membantu pelajar berlatih setiap hari.', 'They are developing an app that can help learners practice every day'],
    ['Masalah ini lebih rumit daripada yang kami perkirakan sebelumnya.', 'This issue is more complicated than we had expected before'],
    ['Dia berhasil menjelaskan ide itu tanpa menggunakan terlalu banyak istilah teknis.', 'She managed to explain the idea without using too many technical terms'],
    ['Kami perlu mengetahui apakah pengguna puas dengan fitur baru tersebut.', 'We need to know whether users are satisfied with the new feature'],
    ['Setelah menyelesaikan kursus ini, kamu akan mampu menyusun kalimat kompleks.', 'After completing this course you will be able to build complex sentences'],
    ['Saya tidak menyadari bahwa tenggat waktunya telah dimajukan.', 'I did not realize that the deadline had been moved forward'],
    ['Mereka tetap melanjutkan diskusi meskipun sebagian data belum lengkap.', 'They continued the discussion even though some data was incomplete'],
    ['Kalimat yang disusun dengan baik membuat pesan lebih mudah dipahami.', 'Well structured sentences make the message easier to understand'],
    ['Kami akan mengevaluasi hasilnya setelah semua latihan berhasil diselesaikan.', 'We will evaluate the results after all exercises have been completed'],
  ].map(([prompt, answer]) => makeSentenceItem(prompt, answer, 'Hard')),
];

const letterQuestSets = [
  [
    { word: 'STAR', icon: '★', color: '#FACC15', letters: ['S', 'R', 'I', 'N', 'I', 'J', 'K', 'G', 'H', 'A', 'L', 'T', 'E', 'O', 'Y'] },
    { word: 'UMBRELLA', icon: '☂', color: '#FB7185', letters: ['U', 'P', 'L', 'A', 'L', 'R', 'S', 'P', 'H', 'A', 'T', 'N', 'E', 'M', 'B'] },
    { word: 'HOUSE', icon: '⌂', color: '#64748B', letters: ['N', 'P', 'I', 'A', 'G', 'D', 'C', 'S', 'H', 'U', 'L', 'Y', 'E', 'O', 'R'] },
    { word: 'TREE', icon: '♣', color: '#166534', letters: ['E', 'P', 'I', 'K', 'R', 'J', 'E', 'P', 'H', 'A', 'D', 'Y', 'T', 'S', 'Q'] },
  ],
  [
    { word: 'FROG', icon: '●', color: '#84CC16', letters: ['F', 'R', 'I', 'N', 'I', 'J', 'K', 'G', 'H', 'A', 'L', 'T', 'E', 'O', 'Y'] },
    { word: 'ELEPHANT', icon: '◖', color: '#93C5FD', letters: ['E', 'P', 'L', 'A', 'K', 'J', 'S', 'P', 'H', 'A', 'T', 'N', 'E', 'O', 'U'] },
    { word: 'DOG', icon: '◕', color: '#FDE68A', letters: ['N', 'P', 'I', 'A', 'G', 'D', 'C', 'S', 'H', 'U', 'L', 'Y', 'E', 'O', 'R'] },
    { word: 'BIRD', icon: '◆', color: '#0EA5E9', letters: ['B', 'P', 'I', 'K', 'R', 'J', 'F', 'P', 'H', 'A', 'D', 'Y', 'T', 'S', 'Q'] },
  ],
];

function readStats(): GameStats {
  try {
    const raw = localStorage.getItem('fluently_game_stats');
    return raw ? { ...defaultStats, ...JSON.parse(raw) } : defaultStats;
  } catch {
    return defaultStats;
  }
}

function saveStats(stats: GameStats) {
  localStorage.setItem('fluently_game_stats', JSON.stringify(stats));
}

function modeTitle(modeId?: string) {
  if (modeId === 'sentence-builder') return 'Sentence Builder';
  if (modeId === 'memory-card') return 'Memory Card';
  if (modeId === 'find-words') return 'Find the Words';
  if (modeId === 'speed-quiz') return 'Speed Quiz';
  if (modeId === 'listen-tap') return 'Listen & Tap';
  if (modeId === 'letter-quest') return 'Letter Quest';
  if (modeId === 'crossword' || modeId === 'typing-sprint') return 'Typing Sprint';
  if (modeId === 'clan-battle') return 'Boss Challenge';
  return 'Word Match';
}

function difficultyLimit(difficulty: string | null) {
  if (difficulty === 'easy') return 4;
  if (difficulty === 'hard') return 8;
  return 6;
}

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

type LetterQuestLevel = 'easy' | 'medium' | 'hard';

function makeLetterQuestItem(word: string, icon: string, color: string, level: 'Easy' | 'Medium' | 'Hard') {
  const distractors = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').filter((letter) => !word.includes(letter));
  const letters = shuffle([...word.split(''), ...shuffle(distractors).slice(0, Math.max(8, 15 - word.length))]).slice(0, 15);
  return { word, icon, color, level, letters };
}

const legacyLetterQuestQuestions = [
  makeLetterQuestItem('STAR', '★', '#FACC15', 'Easy'),
  makeLetterQuestItem('TREE', '♣', '#166534', 'Easy'),
  makeLetterQuestItem('DOG', '●', '#FDE68A', 'Easy'),
  makeLetterQuestItem('BIRD', '◆', '#0EA5E9', 'Easy'),
  makeLetterQuestItem('FROG', '●', '#84CC16', 'Easy'),
  makeLetterQuestItem('MOON', '◐', '#A78BFA', 'Easy'),
  makeLetterQuestItem('SUN', '☀', '#F59E0B', 'Easy'),
  makeLetterQuestItem('FISH', '◒', '#38BDF8', 'Easy'),
  makeLetterQuestItem('BOOK', '▤', '#60A5FA', 'Easy'),
  makeLetterQuestItem('CAKE', '▰', '#FB7185', 'Easy'),
  makeLetterQuestItem('HOUSE', '⌂', '#64748B', 'Medium'),
  makeLetterQuestItem('CHAIR', '▥', '#A16207', 'Medium'),
  makeLetterQuestItem('APPLE', '●', '#EF4444', 'Medium'),
  makeLetterQuestItem('WATER', '≈', '#0EA5E9', 'Medium'),
  makeLetterQuestItem('CLOUD', '☁', '#94A3B8', 'Medium'),
  makeLetterQuestItem('PLANT', '♧', '#22C55E', 'Medium'),
  makeLetterQuestItem('CLOCK', '◷', '#6366F1', 'Medium'),
  makeLetterQuestItem('TRAIN', '▣', '#475569', 'Medium'),
  makeLetterQuestItem('SHOES', '◞', '#F97316', 'Medium'),
  makeLetterQuestItem('PHONE', '▯', '#14B8A6', 'Medium'),
  makeLetterQuestItem('UMBRELLA', '☂', '#FB7185', 'Hard'),
  makeLetterQuestItem('ELEPHANT', '◖', '#93C5FD', 'Hard'),
  makeLetterQuestItem('BUTTERFLY', '✦', '#C084FC', 'Hard'),
  makeLetterQuestItem('NOTEBOOK', '▤', '#3B82F6', 'Hard'),
  makeLetterQuestItem('COMPUTER', '▣', '#2563EB', 'Hard'),
  makeLetterQuestItem('MOUNTAIN', '▲', '#65A30D', 'Hard'),
  makeLetterQuestItem('SANDWICH', '▰', '#D97706', 'Hard'),
  makeLetterQuestItem('RAINBOW', '⌒', '#EC4899', 'Hard'),
  makeLetterQuestItem('BACKPACK', '▥', '#F97316', 'Hard'),
  makeLetterQuestItem('KEYBOARD', '▦', '#64748B', 'Hard'),
];

const letterQuestWordSets = {
  Easy: [
    ['STAR', '*', '#FACC15'], ['TREE', 'T', '#166534'], ['DOG', 'D', '#FDE68A'], ['BIRD', 'B', '#0EA5E9'], ['FROG', 'F', '#84CC16'],
    ['MOON', 'M', '#A78BFA'], ['SUN', 'S', '#F59E0B'], ['FISH', 'F', '#38BDF8'], ['BOOK', 'B', '#60A5FA'], ['CAKE', 'C', '#FB7185'],
    ['BALL', 'O', '#EF4444'], ['BELL', 'B', '#FBBF24'], ['BOAT', 'B', '#0284C7'], ['DUCK', 'D', '#F97316'], ['LION', 'L', '#CA8A04'],
    ['MILK', 'M', '#F8FAFC'], ['RING', 'R', '#A855F7'], ['SOCK', 'S', '#22C55E'], ['TENT', 'T', '#DC2626'], ['KITE', 'K', '#3B82F6'],
    ['CORN', 'C', '#F59E0B'], ['DOOR', 'D', '#92400E'], ['FORK', 'F', '#94A3B8'], ['GOAT', 'G', '#FDE68A'], ['HAT', 'H', '#14B8A6'],
    ['JAM', 'J', '#E11D48'], ['LAMP', 'L', '#FCD34D'], ['PEN', 'P', '#2563EB'], ['ROSE', 'R', '#FB7185'], ['TOY', 'T', '#8B5CF6'],
  ],
  Medium: [
    ['HOUSE', 'H', '#64748B'], ['CHAIR', 'C', '#A16207'], ['APPLE', 'A', '#EF4444'], ['WATER', 'W', '#0EA5E9'], ['CLOUD', 'C', '#94A3B8'],
    ['PLANT', 'P', '#22C55E'], ['CLOCK', 'C', '#6366F1'], ['TRAIN', 'T', '#475569'], ['SHOES', 'S', '#F97316'], ['PHONE', 'P', '#14B8A6'],
    ['BREAD', 'B', '#D97706'], ['BRUSH', 'B', '#A855F7'], ['CAMEL', 'C', '#CA8A04'], ['CANDY', 'C', '#EC4899'], ['DRESS', 'D', '#F472B6'],
    ['FRUIT', 'F', '#22C55E'], ['GLASS', 'G', '#38BDF8'], ['GRAPE', 'G', '#7C3AED'], ['HORSE', 'H', '#92400E'], ['JUICE', 'J', '#F97316'],
    ['MOUSE', 'M', '#64748B'], ['PAPER', 'P', '#F8FAFC'], ['PIZZA', 'P', '#F59E0B'], ['RIVER', 'R', '#0284C7'], ['ROBOT', 'R', '#94A3B8'],
    ['SHEEP', 'S', '#E5E7EB'], ['SNAKE', 'S', '#16A34A'], ['TABLE', 'T', '#A16207'], ['TIGER', 'T', '#EA580C'], ['WATCH', 'W', '#2563EB'],
  ],
  Hard: [
    ['UMBRELLA', 'U', '#FB7185'], ['ELEPHANT', 'E', '#93C5FD'], ['BUTTERFLY', 'B', '#C084FC'], ['NOTEBOOK', 'N', '#3B82F6'], ['COMPUTER', 'C', '#2563EB'],
    ['MOUNTAIN', 'M', '#65A30D'], ['SANDWICH', 'S', '#D97706'], ['RAINBOW', 'R', '#EC4899'], ['BACKPACK', 'B', '#F97316'], ['KEYBOARD', 'K', '#64748B'],
    ['AIRPLANE', 'A', '#38BDF8'], ['BICYCLE', 'B', '#22C55E'], ['CALENDAR', 'C', '#8B5CF6'], ['DINOSAUR', 'D', '#84CC16'], ['FIREWORK', 'F', '#EF4444'],
    ['GIRAFFE', 'G', '#F59E0B'], ['HOSPITAL', 'H', '#DC2626'], ['KANGAROO', 'K', '#A16207'], ['LANGUAGE', 'L', '#4FA3D1'], ['MAGAZINE', 'M', '#EC4899'],
    ['PENGUIN', 'P', '#1E293B'], ['QUESTION', 'Q', '#7C3AED'], ['SCISSORS', 'S', '#94A3B8'], ['TEACHER', 'T', '#0EA5E9'], ['TREASURE', 'T', '#F59E0B'],
    ['VEGETABLE', 'V', '#16A34A'], ['WATERFALL', 'W', '#0284C7'], ['XYLOPHONE', 'X', '#F97316'], ['YESTERDAY', 'Y', '#6366F1'], ['ZUCCHINI', 'Z', '#22C55E'],
  ],
} as const;

const letterQuestQuestions = Object.entries(letterQuestWordSets).flatMap(([level, words]) =>
  words.map(([word, icon, color]) => makeLetterQuestItem(word, icon, color, level as 'Easy' | 'Medium' | 'Hard'))
);

function readLetterQuestLevel(): LetterQuestLevel {
  try {
    const saved = localStorage.getItem('fluently_letter_quest_level') as LetterQuestLevel | null;
    return saved === 'medium' || saved === 'hard' ? saved : 'easy';
  } catch {
    return 'easy';
  }
}

function nextLetterQuestLevel(level: LetterQuestLevel): LetterQuestLevel | null {
  if (level === 'easy') return 'medium';
  if (level === 'medium') return 'hard';
  return null;
}

function readWordMatchLevel(): LetterQuestLevel {
  try {
    const saved = localStorage.getItem('fluently_word_match_level') as LetterQuestLevel | null;
    return saved === 'medium' || saved === 'hard' ? saved : 'easy';
  } catch {
    return 'easy';
  }
}

function nextWordMatchLevel(level: LetterQuestLevel): LetterQuestLevel | null {
  if (level === 'easy') return 'medium';
  if (level === 'medium') return 'hard';
  return null;
}

function readSentenceBuilderLevel(): LetterQuestLevel {
  try {
    const saved = localStorage.getItem('fluently_sentence_builder_level') as LetterQuestLevel | null;
    return saved === 'medium' || saved === 'hard' ? saved : 'easy';
  } catch {
    return 'easy';
  }
}

function nextSentenceBuilderLevel(level: LetterQuestLevel): LetterQuestLevel | null {
  if (level === 'easy') return 'medium';
  if (level === 'medium') return 'hard';
  return null;
}

function readListenTapLevel(): LetterQuestLevel {
  try {
    const saved = localStorage.getItem('fluently_listen_tap_level') as LetterQuestLevel | null;
    return saved === 'medium' || saved === 'hard' ? saved : 'easy';
  } catch {
    return 'easy';
  }
}

function nextListenTapLevel(level: LetterQuestLevel): LetterQuestLevel | null {
  if (level === 'easy') return 'medium';
  if (level === 'medium') return 'hard';
  return null;
}

function readMemoryCardLevel(): LetterQuestLevel {
  try {
    const saved = localStorage.getItem('fluently_memory_card_level') as LetterQuestLevel | null;
    return saved === 'medium' || saved === 'hard' ? saved : 'easy';
  } catch {
    return 'easy';
  }
}

function nextMemoryCardLevel(level: LetterQuestLevel): LetterQuestLevel | null {
  if (level === 'easy') return 'medium';
  if (level === 'medium') return 'hard';
  return null;
}

function readFindWordsLevel(): LetterQuestLevel {
  try {
    const saved = localStorage.getItem('fluently_find_words_level') as LetterQuestLevel | null;
    return saved === 'medium' || saved === 'hard' ? saved : 'easy';
  } catch {
    return 'easy';
  }
}

function nextFindWordsLevel(level: LetterQuestLevel): LetterQuestLevel | null {
  if (level === 'easy') return 'medium';
  if (level === 'medium') return 'hard';
  return null;
}

const wordMatchVisuals: Record<string, string> = {
  STAR: '⭐', TREE: '🌲', DOG: '🐶', BIRD: '🐦', FROG: '🐸',
  MOON: '🌙', SUN: '☀️', FISH: '🐟', BOOK: '📘', CAKE: '🍰',
  BALL: '⚽', BELL: '🔔', BOAT: '⛵', DUCK: '🦆', LION: '🦁',
  MILK: '🥛', RING: '💍', SOCK: '🧦', TENT: '⛺', KITE: '🪁',
  CORN: '🌽', DOOR: '🚪', FORK: '🍴', GOAT: '🐐', HAT: '🎩',
  JAM: '🍓', LAMP: '💡', PEN: '🖊️', ROSE: '🌹', TOY: '🧸',
  HOUSE: '🏠', CHAIR: '🪑', APPLE: '🍎', WATER: '💧', CLOUD: '☁️',
  PLANT: '🪴', CLOCK: '🕘', TRAIN: '🚆', SHOES: '👟', PHONE: '📱',
  BREAD: '🍞', BRUSH: '🪥', CAMEL: '🐪', CANDY: '🍬', DRESS: '👗',
  FRUIT: '🍇', GLASS: '🥛', GRAPE: '🍇', HORSE: '🐴', JUICE: '🧃',
  MOUSE: '🐭', PAPER: '📄', PIZZA: '🍕', RIVER: '🌊', ROBOT: '🤖',
  SHEEP: '🐑', SNAKE: '🐍', TABLE: '🪵', TIGER: '🐯', WATCH: '⌚',
  UMBRELLA: '☂️', ELEPHANT: '🐘', BUTTERFLY: '🦋', NOTEBOOK: '📓', COMPUTER: '💻',
  MOUNTAIN: '⛰️', SANDWICH: '🥪', RAINBOW: '🌈', BACKPACK: '🎒', KEYBOARD: '⌨️',
  AIRPLANE: '✈️', BICYCLE: '🚲', CALENDAR: '📅', DINOSAUR: '🦖', FIREWORK: '🎆',
  GIRAFFE: '🦒', HOSPITAL: '🏥', KANGAROO: '🦘', LANGUAGE: '🗣️', MAGAZINE: '📰',
  PENGUIN: '🐧', QUESTION: '❓', SCISSORS: '✂️', TEACHER: '👩‍🏫', TREASURE: '💎',
  VEGETABLE: '🥦', WATERFALL: '💦', XYLOPHONE: '🎹', YESTERDAY: '📆', ZUCCHINI: '🥒',
};

function getWordMatchVisual(word: string, fallback: string) {
  return wordMatchVisuals[word] || fallback;
}

function makeWordSearchGrid(words: string[], size: number) {
  const grid = Array.from({ length: size }, () => Array.from({ length: size }, () => ''));
  const placements = [
    { row: 0, col: 0, dr: 0, dc: 1 },
    { row: 0, col: size - 1, dr: 1, dc: 0 },
    { row: Math.floor(size / 2), col: size - 1, dr: 0, dc: -1 },
    { row: size - 1, col: 0, dr: -1, dc: 1 },
  ];

  words.forEach((word, index) => {
    const placement = placements[index % placements.length];
    word.split('').forEach((letter, letterIndex) => {
      const row = placement.row + placement.dr * letterIndex;
      const col = placement.col + placement.dc * letterIndex;
      if (row >= 0 && row < size && col >= 0 && col < size) {
        grid[row][col] = letter;
      }
    });
  });

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return grid.map((row, rowIndex) =>
    row.map((cell, colIndex) => cell || alphabet[(rowIndex * 7 + colIndex * 11 + words.join('').length) % alphabet.length])
  );
}

export default function GamePlayPage() {
  const navigate = useNavigate();
  const { categoryId = 'vocabulary', modeId = 'word-match' } = useParams<{ categoryId: string; modeId: string }>();
  const [searchParams] = useSearchParams();
  const difficulty = searchParams.get('difficulty') || 'medium';
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [builtWords, setBuiltWords] = useState<string[]>([]);
  const [usedIndexes, setUsedIndexes] = useState<number[]>([]);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [finished, setFinished] = useState(false);
  const [earnedXp, setEarnedXp] = useState(0);
  const [typedAnswer, setTypedAnswer] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(45);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [letterAnswers, setLetterAnswers] = useState<string[]>(['', '', '', '']);
  const [letterChecked, setLetterChecked] = useState(false);
  const [letterBoard, setLetterBoard] = useState(0);
  const [currentLetterLevel, setCurrentLetterLevel] = useState<LetterQuestLevel>(() => readLetterQuestLevel());
  const [currentWordMatchLevel, setCurrentWordMatchLevel] = useState<LetterQuestLevel>(() => readWordMatchLevel());
  const [wordMatchBoard, setWordMatchBoard] = useState(0);
  const [selectedPicture, setSelectedPicture] = useState<number | null>(null);
  const [wordMatchPairs, setWordMatchPairs] = useState<Record<number, number>>({});
  const [wordMatchChecked, setWordMatchChecked] = useState(false);
  const [currentSentenceLevel, setCurrentSentenceLevel] = useState<LetterQuestLevel>(() => readSentenceBuilderLevel());
  const [currentListenLevel, setCurrentListenLevel] = useState<LetterQuestLevel>(() => readListenTapLevel());
  const [currentMemoryLevel, setCurrentMemoryLevel] = useState<LetterQuestLevel>(() => readMemoryCardLevel());
  const [memoryBoard, setMemoryBoard] = useState(0);
  const [memoryBoardComplete, setMemoryBoardComplete] = useState(false);
  const [currentFindWordsLevel, setCurrentFindWordsLevel] = useState<LetterQuestLevel>(() => readFindWordsLevel());
  const [findWordsBoard, setFindWordsBoard] = useState(0);
  const [findWordsAnswers, setFindWordsAnswers] = useState<Record<number, string>>({});
  const [findWordsChecked, setFindWordsChecked] = useState(false);

  const isFindWords = modeId === 'find-words';
  const isSentenceBuilder = modeId === 'sentence-builder' || (categoryId === 'grammar' && modeId !== 'speed-quiz' && modeId !== 'memory-card');
  const isMemoryCard = modeId === 'memory-card';
  const isLetterQuest = modeId === 'letter-quest';
  const isVisualWordMatch = modeId === 'word-match' && categoryId === 'vocabulary';
  const isSpeedQuiz = modeId === 'speed-quiz' || modeId === 'clan-battle';
  const isListenTap = modeId === 'listen-tap' || categoryId === 'listening';
  const isTyping = modeId === 'crossword' || modeId === 'typing-sprint';
  const title = modeTitle(isSentenceBuilder ? 'sentence-builder' : modeId);
  const activeDifficulty = isLetterQuest ? currentLetterLevel : isVisualWordMatch ? currentWordMatchLevel : isSentenceBuilder ? currentSentenceLevel : isListenTap ? currentListenLevel : isMemoryCard ? currentMemoryLevel : isFindWords ? currentFindWordsLevel : difficulty;

  const questions = useMemo(() => {
    const limit = difficultyLimit(difficulty);
    if (isSentenceBuilder) {
      const label = currentSentenceLevel === 'easy' ? 'Easy' : currentSentenceLevel === 'medium' ? 'Medium' : 'Hard';
      return sentenceBuilderQuestions.filter((item) => item.level === label);
    }
    if (isListenTap) {
      const label = currentListenLevel === 'easy' ? 'Easy' : currentListenLevel === 'medium' ? 'Medium' : 'Hard';
      return listenTapQuestions.filter((item) => item.level === label);
    }
    return wordBank.slice(0, Math.min(limit, wordBank.length));
  }, [currentListenLevel, currentSentenceLevel, difficulty, isListenTap, isSentenceBuilder]);

  const memoryPairCount = currentMemoryLevel === 'hard' ? 6 : currentMemoryLevel === 'medium' ? 5 : 4;
  const memoryPool = useMemo(() => {
    const level = currentMemoryLevel === 'hard' ? 'Hard' : currentMemoryLevel === 'medium' ? 'Medium' : 'Easy';
    return letterQuestQuestions.filter((item) => item.level === level);
  }, [currentMemoryLevel]);
  const memoryCards = useMemo(() => {
    const pairs = memoryPool.slice(memoryBoard * memoryPairCount, memoryBoard * memoryPairCount + memoryPairCount);
    return shuffle(pairs.flatMap((item, pairId) => ([
      { id: pairId * 2, pairId, label: item.word, icon: item.icon, color: item.color, type: 'picture' },
      { id: pairId * 2 + 1, pairId, label: item.word, icon: item.icon, color: item.color, type: 'word' },
    ])));
  }, [memoryBoard, memoryPairCount, memoryPool]);
  const memoryTotalBoards = Math.ceil(memoryPool.length / memoryPairCount);
  const findWordsPool = useMemo(() => {
    const level = currentFindWordsLevel === 'hard' ? 'Hard' : currentFindWordsLevel === 'medium' ? 'Medium' : 'Easy';
    return letterQuestQuestions.filter((item) => item.level === level);
  }, [currentFindWordsLevel]);
  const findWordsItems = useMemo(() => {
    return findWordsPool.slice(findWordsBoard * 4, findWordsBoard * 4 + 4);
  }, [findWordsBoard, findWordsPool]);
  const findWordsGridSize = currentFindWordsLevel === 'hard' ? 12 : currentFindWordsLevel === 'medium' ? 10 : 8;
  const findWordsGrid = useMemo(() => {
    return makeWordSearchGrid(findWordsItems.map((item) => item.word), findWordsGridSize);
  }, [findWordsGridSize, findWordsItems]);
  const findWordsTotalBoards = Math.ceil(findWordsPool.length / 4);

  const letterQuestPool = useMemo(() => {
    const label = currentLetterLevel === 'easy' ? 'Easy' : currentLetterLevel === 'medium' ? 'Medium' : 'Hard';
    return letterQuestQuestions.filter((item) => item.level === label);
  }, [currentLetterLevel]);
  const letterQuestItems = useMemo(() => {
    return letterQuestPool.slice(letterBoard * 4, letterBoard * 4 + 4);
  }, [letterBoard, letterQuestPool]);
  const letterQuestTotalBoards = Math.ceil(letterQuestPool.length / 4);
  const wordMatchPool = useMemo(() => {
    const label = currentWordMatchLevel === 'easy' ? 'Easy' : currentWordMatchLevel === 'medium' ? 'Medium' : 'Hard';
    return letterQuestQuestions.filter((item) => item.level === label);
  }, [currentWordMatchLevel]);
  const wordMatchItems = useMemo(() => {
    return wordMatchPool.slice(wordMatchBoard * 4, wordMatchBoard * 4 + 4);
  }, [wordMatchBoard, wordMatchPool]);
  const wordMatchWords = useMemo(() => shuffle(wordMatchItems.map((item, index) => ({ ...item, sourceIndex: index }))), [wordMatchItems]);
  const wordMatchTotalBoards = Math.ceil(wordMatchPool.length / 4);

  const current = questions[round];
  const progress = isMemoryCard
    ? Math.round((((memoryBoard * memoryPairCount) + (matchedCards.length / 2)) / memoryPool.length) * 100)
    : isFindWords
      ? Math.round((((findWordsBoard * 4) + Object.values(findWordsAnswers).filter(Boolean).length) / findWordsPool.length) * 100)
    : isLetterQuest
      ? Math.round((((letterBoard * 4) + letterAnswers.filter((answer, index) => letterQuestItems[index] && answer.length === letterQuestItems[index].word.length).length) / letterQuestPool.length) * 100)
    : isVisualWordMatch
      ? Math.round((((wordMatchBoard * 4) + Object.keys(wordMatchPairs).length) / wordMatchPool.length) * 100)
    : isSpeedQuiz
      ? Math.round((secondsLeft / 45) * 100)
      : Math.round((round / questions.length) * 100);
  const letterQuestNextLevel = isLetterQuest ? nextLetterQuestLevel(currentLetterLevel) : null;
  const letterQuestPerfect = isLetterQuest && score === letterQuestPool.length;
  const wordMatchNextLevel = isVisualWordMatch ? nextWordMatchLevel(currentWordMatchLevel) : null;
  const wordMatchPerfect = isVisualWordMatch && score === wordMatchPool.length;
  const sentenceBuilderNextLevel = isSentenceBuilder ? nextSentenceBuilderLevel(currentSentenceLevel) : null;
  const sentenceBuilderPerfect = isSentenceBuilder && score === questions.length;
  const listenTapNextLevel = isListenTap ? nextListenTapLevel(currentListenLevel) : null;
  const listenTapPerfect = isListenTap && score === questions.length;
  const memoryCardNextLevel = isMemoryCard ? nextMemoryCardLevel(currentMemoryLevel) : null;
  const memoryCardPerfect = isMemoryCard && score === memoryPool.length;
  const findWordsNextLevel = isFindWords ? nextFindWordsLevel(currentFindWordsLevel) : null;
  const findWordsPerfect = isFindWords && score === findWordsPool.length;

  useEffect(() => {
    if (!isSpeedQuiz || finished) return;
    if (secondsLeft <= 0) {
      completeGame(score);
      return;
    }
    const timer = window.setTimeout(() => setSecondsLeft((value) => value - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [isSpeedQuiz, secondsLeft, finished, score]);

  const speak = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.82;
    window.speechSynthesis.speak(utterance);
  };

  const completeGame = (finalScore: number) => {
    if (finished) return;
    const xp = Math.max(10, finalScore * 15 + (activeDifficulty === 'hard' ? 20 : activeDifficulty === 'medium' ? 10 : 0));
    const stats = readStats();
    const updated: GameStats = {
      xp: stats.xp + xp,
      played: stats.played + 1,
      completed: stats.completed + 1,
      bestScore: Math.max(stats.bestScore, finalScore),
      modeBest: {
        ...stats.modeBest,
        [title]: Math.max(stats.modeBest?.[title] || 0, finalScore),
      },
    };
    saveStats(updated);
    if (isLetterQuest) {
      const nextLevel = nextLetterQuestLevel(currentLetterLevel);
      if (nextLevel) {
        localStorage.setItem('fluently_letter_quest_level', nextLevel);
      }
    }
    if (isVisualWordMatch) {
      const nextLevel = nextWordMatchLevel(currentWordMatchLevel);
      if (nextLevel) {
        localStorage.setItem('fluently_word_match_level', nextLevel);
      }
    }
    if (isSentenceBuilder) {
      const nextLevel = nextSentenceBuilderLevel(currentSentenceLevel);
      if (nextLevel) {
        localStorage.setItem('fluently_sentence_builder_level', nextLevel);
      }
    }
    if (isListenTap) {
      const nextLevel = nextListenTapLevel(currentListenLevel);
      if (nextLevel) {
        localStorage.setItem('fluently_listen_tap_level', nextLevel);
      }
    }
    if (isMemoryCard) {
      const nextLevel = nextMemoryCardLevel(currentMemoryLevel);
      if (nextLevel) {
        localStorage.setItem('fluently_memory_card_level', nextLevel);
      }
    }
    if (isFindWords) {
      const nextLevel = nextFindWordsLevel(currentFindWordsLevel);
      if (nextLevel) {
        localStorage.setItem('fluently_find_words_level', nextLevel);
      }
    }
    setEarnedXp(xp);
    setFinished(true);
  };

  const resetQuestionState = () => {
    setFeedback(null);
    setSelected(null);
    setBuiltWords([]);
    setUsedIndexes([]);
    setTypedAnswer('');
  };

  const goNext = (nextScore = score) => {
    resetQuestionState();
    if (round + 1 >= questions.length) {
      completeGame(nextScore);
      return;
    }
    setRound((value) => value + 1);
  };

  const answerWordMatch = (option: string) => {
    if (feedback) return;
    setSelected(option);
    const correct = option === current.answer;
    const nextScore = correct ? score + 1 : score;
    if (correct) setScore(nextScore);
    setFeedback(correct ? 'correct' : 'wrong');
    window.setTimeout(() => goNext(nextScore), isSpeedQuiz ? 320 : 650);
  };

  const pickWord = (word: string, index: number) => {
    if (usedIndexes.includes(index) || feedback) return;
    setBuiltWords((value) => [...value, word]);
    setUsedIndexes((value) => [...value, index]);
  };

  const undoWord = () => {
    if (feedback) return;
    setBuiltWords((value) => value.slice(0, -1));
    setUsedIndexes((value) => value.slice(0, -1));
  };

  const checkSentence = () => {
    if (feedback) return;
    const correct = builtWords.join(' ') === current.answer.join(' ');
    const nextScore = correct ? score + 1 : score;
    if (correct) setScore(nextScore);
    setFeedback(correct ? 'correct' : 'wrong');
  };

  const checkTyping = () => {
    if (feedback) return;
    const correct = typedAnswer.trim().toLowerCase() === current.word.toLowerCase();
    const nextScore = correct ? score + 1 : score;
    if (correct) setScore(nextScore);
    setFeedback(correct ? 'correct' : 'wrong');
  };

  const flipCard = (cardId: number) => {
    if (memoryBoardComplete || flippedCards.includes(cardId) || matchedCards.includes(cardId) || flippedCards.length >= 2) return;
    const nextFlipped = [...flippedCards, cardId];
    setFlippedCards(nextFlipped);
    if (nextFlipped.length !== 2) return;

    const first = memoryCards.find((card) => card.id === nextFlipped[0]);
    const second = memoryCards.find((card) => card.id === nextFlipped[1]);
    if (first?.pairId === second?.pairId && first?.type !== second?.type) {
      const nextMatched = [...matchedCards, ...nextFlipped];
      const nextScore = score + 1;
      setScore(nextScore);
      setMatchedCards(nextMatched);
      setFlippedCards([]);
      if (nextMatched.length === memoryCards.length) {
        if (memoryBoard + 1 >= memoryTotalBoards) {
          window.setTimeout(() => completeGame(nextScore), 650);
        } else {
          setMemoryBoardComplete(true);
        }
      }
      return;
    }

    window.setTimeout(() => setFlippedCards([]), 700);
  };

  const pickLetter = (itemIndex: number, letter: string) => {
    if (letterChecked) return;
    const target = letterQuestItems[itemIndex].word;
    setLetterAnswers((values) => values.map((value, index) => {
      if (index !== itemIndex || value.length >= target.length) return value;
      return value + letter;
    }));
  };

  const eraseLetter = (itemIndex: number) => {
    if (letterChecked) return;
    setLetterAnswers((values) => values.map((value, index) => index === itemIndex ? value.slice(0, -1) : value));
  };

  const checkLetterQuest = () => {
    const boardScore = letterQuestItems.reduce((total, item, index) => total + (letterAnswers[index] === item.word ? 1 : 0), 0);
    const finalScore = score + boardScore;
    setScore(finalScore);
    setLetterChecked(true);
    if (letterBoard + 1 >= letterQuestTotalBoards) {
      window.setTimeout(() => completeGame(finalScore), 700);
    }
  };

  const nextLetterBoard = () => {
    setLetterBoard((value) => value + 1);
    setLetterAnswers(['', '', '', '']);
    setLetterChecked(false);
  };

  const pickWordMatchPicture = (index: number) => {
    if (wordMatchChecked) return;
    setSelectedPicture(index);
  };

  const pickWordMatchWord = (wordIndex: number) => {
    if (wordMatchChecked || selectedPicture === null) return;
    const wordAlreadyUsed = Object.entries(wordMatchPairs).some(([pictureIndex, usedWordIndex]) => Number(pictureIndex) !== selectedPicture && usedWordIndex === wordIndex);
    if (wordAlreadyUsed) return;
    setWordMatchPairs((pairs) => ({ ...pairs, [selectedPicture]: wordIndex }));
    setSelectedPicture(null);
  };

  const checkWordMatchBoard = () => {
    const boardScore = wordMatchItems.reduce((total, item, pictureIndex) => {
      const matchedWord = wordMatchWords[wordMatchPairs[pictureIndex]];
      return total + (matchedWord?.word === item.word ? 1 : 0);
    }, 0);
    const finalScore = score + boardScore;
    setScore(finalScore);
    setWordMatchChecked(true);
    if (wordMatchBoard + 1 >= wordMatchTotalBoards) {
      window.setTimeout(() => completeGame(finalScore), 700);
    }
  };

  const nextWordMatchBoard = () => {
    setWordMatchBoard((value) => value + 1);
    setSelectedPicture(null);
    setWordMatchPairs({});
    setWordMatchChecked(false);
  };

  const nextMemoryBoard = () => {
    setMemoryBoard((value) => value + 1);
    setFlippedCards([]);
    setMatchedCards([]);
    setMemoryBoardComplete(false);
  };

  const updateFindWordAnswer = (index: number, value: string) => {
    if (findWordsChecked) return;
    setFindWordsAnswers((answers) => ({ ...answers, [index]: value.toUpperCase().replace(/[^A-Z]/g, '') }));
  };

  const checkFindWordsBoard = () => {
    const boardScore = findWordsItems.reduce((total, item, index) => {
      return total + ((findWordsAnswers[index] || '').trim().toUpperCase() === item.word ? 1 : 0);
    }, 0);
    const finalScore = score + boardScore;
    setScore(finalScore);
    setFindWordsChecked(true);
    if (findWordsBoard + 1 >= findWordsTotalBoards) {
      window.setTimeout(() => completeGame(finalScore), 700);
    }
  };

  const nextFindWordsBoard = () => {
    setFindWordsBoard((value) => value + 1);
    setFindWordsAnswers({});
    setFindWordsChecked(false);
  };

  const restart = () => {
    setRound(0);
    setScore(0);
    setSelected(null);
    setBuiltWords([]);
    setUsedIndexes([]);
    setFeedback(null);
    setFinished(false);
    setEarnedXp(0);
    setTypedAnswer('');
    setSecondsLeft(45);
    setFlippedCards([]);
    setMatchedCards([]);
    setLetterAnswers(['', '', '', '']);
    setLetterChecked(false);
    setLetterBoard(0);
    setWordMatchBoard(0);
    setSelectedPicture(null);
    setWordMatchPairs({});
    setWordMatchChecked(false);
    setMemoryBoard(0);
    setMemoryBoardComplete(false);
    setFindWordsBoard(0);
    setFindWordsAnswers({});
    setFindWordsChecked(false);
  };

  const startNextLetterLevel = () => {
    const nextLevel = nextLetterQuestLevel(currentLetterLevel);
    if (!nextLevel) {
      navigate('/game');
      return;
    }
    setCurrentLetterLevel(nextLevel);
    localStorage.setItem('fluently_letter_quest_level', nextLevel);
    restart();
  };

  const startNextWordMatchLevel = () => {
    const nextLevel = nextWordMatchLevel(currentWordMatchLevel);
    if (!nextLevel) {
      navigate('/game');
      return;
    }
    setCurrentWordMatchLevel(nextLevel);
    localStorage.setItem('fluently_word_match_level', nextLevel);
    restart();
  };

  const startNextSentenceBuilderLevel = () => {
    const nextLevel = nextSentenceBuilderLevel(currentSentenceLevel);
    if (!nextLevel) {
      navigate('/game');
      return;
    }
    setCurrentSentenceLevel(nextLevel);
    localStorage.setItem('fluently_sentence_builder_level', nextLevel);
    restart();
  };

  const startNextListenTapLevel = () => {
    const nextLevel = nextListenTapLevel(currentListenLevel);
    if (!nextLevel) {
      navigate('/game');
      return;
    }
    setCurrentListenLevel(nextLevel);
    localStorage.setItem('fluently_listen_tap_level', nextLevel);
    restart();
  };

  const startNextMemoryCardLevel = () => {
    const nextLevel = nextMemoryCardLevel(currentMemoryLevel);
    if (!nextLevel) {
      navigate('/game');
      return;
    }
    setCurrentMemoryLevel(nextLevel);
    localStorage.setItem('fluently_memory_card_level', nextLevel);
    restart();
  };

  const startNextFindWordsLevel = () => {
    const nextLevel = nextFindWordsLevel(currentFindWordsLevel);
    if (!nextLevel) {
      navigate('/game');
      return;
    }
    setCurrentFindWordsLevel(nextLevel);
    localStorage.setItem('fluently_find_words_level', nextLevel);
    restart();
  };

  return (
    <PageContainer>
      <div className="min-h-screen pb-28 md:pb-10 px-5 md:px-0">
        <div className="sticky top-0 z-20 bg-[#F8FAFC]/90 backdrop-blur-xl py-4 -mx-5 px-5 md:mx-0 md:px-0">
          <div className="flex items-center justify-between gap-3">
            <button onClick={() => navigate('/game')} className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center shadow-sm">
              <ArrowLeft size={18} />
            </button>
            <div className="text-center min-w-0">
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#7EC3E6] font-black">{categoryId} game</p>
              <h1 className="text-[18px] font-black text-[#1A1A2E] truncate">{title}</h1>
            </div>
            <div className="h-10 px-3 rounded-full bg-white border border-gray-100 flex items-center gap-1.5 text-[12px] font-black text-[#F59E0B] shadow-sm">
              {isSpeedQuiz ? <Timer size={15} /> : <Trophy size={15} />}
              {isSpeedQuiz ? `${secondsLeft}s` : score}
            </div>
          </div>
          <div className="mt-4 h-2 bg-white rounded-full overflow-hidden border border-gray-100">
            <motion.div className={`h-full rounded-full ${isSpeedQuiz ? 'bg-[#F59E0B]' : 'bg-[#7EC3E6]'}`} animate={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className={`mt-6 mx-auto ${isVisualWordMatch || isFindWords ? 'max-w-5xl' : isMemoryCard ? 'max-w-4xl' : 'max-w-2xl'}`}>
          {isFindWords ? (
            <motion.div
              className="rounded-[28px] p-3 sm:p-5 shadow-sm bg-[#4FA3D1]"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="rounded-[24px] bg-white p-4 sm:p-6 border-b-4 border-r-4 border-[#2F80ED]/30">
                <div className="flex flex-col lg:flex-row lg:items-start gap-5">
                  <div className="flex-1 min-w-0">
                    <div className="relative mb-4">
                      <div className="mx-auto w-fit rounded-b-[28px] rounded-t-sm bg-[#4FA3D1] px-8 py-3 shadow-sm">
                        <h2 className="text-3xl sm:text-4xl font-black text-white leading-none">Find the words</h2>
                      </div>
                      <p className="mt-4 text-center text-sm sm:text-base font-black text-[#1A1A2E]">
                        Spell and find the words, then write.
                      </p>
                      <p className="mt-2 text-center">
                        <span className="inline-flex px-4 py-1 rounded-full bg-[#EAF7FC] text-[12px] font-black text-[#2F80ED]">
                          {currentFindWordsLevel.toUpperCase()} Level - Board {findWordsBoard + 1} / {findWordsTotalBoards} - 30 words
                        </span>
                      </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_170px] gap-4">
                      <div
                        className="grid rounded-xl border-2 border-[#4FA3D1] overflow-hidden bg-white shadow-sm"
                        style={{ gridTemplateColumns: `repeat(${findWordsGridSize}, minmax(0, 1fr))` }}
                      >
                        {findWordsGrid.flatMap((row, rowIndex) =>
                          row.map((letter, colIndex) => (
                            <div
                              key={`${rowIndex}-${colIndex}`}
                              className="aspect-square border border-[#4FA3D1]/70 flex items-center justify-center text-[14px] min-[390px]:text-[18px] sm:text-[22px] font-black text-[#1A1A2E] bg-white"
                            >
                              {letter}
                            </div>
                          ))
                        )}
                      </div>

                      <div className="rounded-xl border-2 border-[#4FA3D1] bg-white p-3 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible">
                        {findWordsItems.map((item) => (
                          <div key={item.word} className="min-w-[110px] lg:min-w-0 flex-1 rounded-xl bg-[#F8FAFC] px-3 py-3 text-center">
                            <p className="text-lg sm:text-xl font-black text-[#1A1A2E]">{item.word}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {findWordsItems.map((item, index) => {
                        const answer = findWordsAnswers[index] || '';
                        const correct = findWordsChecked && answer === item.word;
                        const wrong = findWordsChecked && answer !== item.word;
                        return (
                          <div key={`answer-${item.word}`} className={`rounded-2xl border p-4 bg-white shadow-sm ${correct ? 'border-emerald-300 bg-emerald-50' : wrong ? 'border-rose-300 bg-rose-50' : 'border-[#BDE7F7]'}`}>
                            <div className="flex items-center gap-3">
                              <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-white to-[#EAF7FC] flex items-center justify-center text-[42px] shadow-md border border-white">
                                <span className="absolute inset-x-3 bottom-2 h-3 rounded-full bg-black/10 blur-sm" />
                                <span className="relative drop-shadow-md">{getWordMatchVisual(item.word, item.icon)}</span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex gap-1.5 mb-2">
                                  {item.word.split('').map((_, letterIndex) => (
                                    <span key={letterIndex} className="h-8 flex-1 min-w-[18px] rounded-md border-2 border-[#4FA3D1]/70 bg-white flex items-center justify-center text-sm font-black">
                                      {answer[letterIndex] || ''}
                                    </span>
                                  ))}
                                </div>
                                <input
                                  value={answer}
                                  onChange={(event) => updateFindWordAnswer(index, event.target.value)}
                                  maxLength={item.word.length}
                                  disabled={findWordsChecked}
                                  className="w-full h-10 rounded-xl border border-[#BDE7F7] bg-white px-3 text-sm font-black uppercase text-[#1A1A2E] outline-none focus:border-[#2F80ED]"
                                  placeholder="WRITE WORD"
                                />
                              </div>
                            </div>
                            {findWordsChecked && (
                              <p className={`mt-2 text-xs font-black ${correct ? 'text-emerald-600' : 'text-rose-600'}`}>
                                {correct ? 'Correct' : `Answer: ${item.word}`}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {findWordsChecked && (
                      <div className="mt-5 rounded-2xl bg-[#EAF7FC] p-4 text-center">
                        <p className="text-sm font-black text-[#1A1A2E]">
                          Board score: {findWordsItems.reduce((total, item, index) => total + ((findWordsAnswers[index] || '') === item.word ? 1 : 0), 0)} / {findWordsItems.length}
                        </p>
                        <p className="text-xs text-gray-500 font-bold mt-1">Total score: {score} / {findWordsPool.length}</p>
                      </div>
                    )}

                    <button
                      onClick={findWordsChecked && findWordsBoard + 1 < findWordsTotalBoards ? nextFindWordsBoard : checkFindWordsBoard}
                      disabled={!findWordsChecked && findWordsItems.some((item, index) => (findWordsAnswers[index] || '').length !== item.word.length)}
                      className="mt-5 h-13 w-full rounded-2xl bg-[#2F80ED] text-white font-black disabled:opacity-40"
                    >
                      {findWordsChecked && findWordsBoard + 1 < findWordsTotalBoards ? 'Next Board' : findWordsChecked ? 'Finishing...' : 'Check Find the Words'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : isVisualWordMatch ? (
            <motion.div
              className="rounded-[28px] p-4 sm:p-6 shadow-sm"
              style={{ backgroundColor: currentWordMatchLevel === 'hard' ? '#FF8A92' : currentWordMatchLevel === 'medium' ? '#80BFFF' : '#74B9FF' }}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="relative rounded-[26px] bg-[#FFFBEF] px-3 py-5 sm:px-10 min-h-[620px] overflow-hidden border-b-4 border-r-4 border-black/10">
                <div>
                  <div className="mb-6 text-center">
                    <span className="inline-flex px-4 py-1 rounded-full bg-white/80 text-[12px] font-black text-[#1A1A2E]">
                      {currentWordMatchLevel.toUpperCase()} Level - Board {wordMatchBoard + 1} / {wordMatchTotalBoards} - 30 visual matches
                    </span>
                  </div>

                  <div className="relative">
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                      {Object.entries(wordMatchPairs).map(([pictureIndex, wordIndex]) => {
                        const pIndex = Number(pictureIndex);
                        const wIndex = Number(wordIndex);
                        const correct = wordMatchChecked && wordMatchWords[wIndex]?.word === wordMatchItems[pIndex]?.word;
                        const wrong = wordMatchChecked && wordMatchWords[wIndex]?.word !== wordMatchItems[pIndex]?.word;
                        const ys = [13, 38, 63, 88];
                        return (
                          <line
                            key={`${pictureIndex}-${wordIndex}`}
                            x1="31"
                            y1={ys[pIndex]}
                            x2="64"
                            y2={ys[wIndex]}
                            stroke={correct ? '#22C55E' : wrong ? '#EF4444' : '#2F80ED'}
                            strokeWidth="0.8"
                            strokeLinecap="round"
                          />
                        );
                      })}
                    </svg>

                    <div className="grid grid-cols-[minmax(0,1fr)_30px_30px_minmax(0,1fr)] sm:grid-cols-[minmax(210px,1fr)_72px_72px_minmax(240px,1fr)] gap-x-2 sm:gap-x-5 gap-y-4 sm:gap-y-7 items-center relative z-20">
                      {wordMatchItems.map((item, pictureIndex) => {
                        const matchedWordIndex = wordMatchPairs[pictureIndex];
                        const correct = wordMatchChecked && wordMatchWords[matchedWordIndex]?.word === item.word;
                        const wrong = wordMatchChecked && matchedWordIndex !== undefined && wordMatchWords[matchedWordIndex]?.word !== item.word;
                        return (
                          <div key={`picture-${item.word}`} className="contents">
                            <button
                              onClick={() => pickWordMatchPicture(pictureIndex)}
                              disabled={wordMatchChecked}
                              className={`h-24 sm:h-28 rounded-2xl sm:rounded-3xl bg-white/70 flex items-center justify-center transition shadow-sm ${selectedPicture === pictureIndex ? 'ring-4 ring-[#2F80ED]' : ''}`}
                            >
                              <span className="relative w-16 h-16 sm:w-24 sm:h-24 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white to-slate-100 flex items-center justify-center text-[40px] sm:text-[56px] shadow-lg border border-white">
                                <span className="absolute inset-x-3 bottom-2 h-3 rounded-full bg-black/10 blur-sm" />
                                <span className="relative drop-shadow-md">{getWordMatchVisual(item.word, item.icon)}</span>
                              </span>
                            </button>
                            <button
                              onClick={() => pickWordMatchPicture(pictureIndex)}
                              disabled={wordMatchChecked}
                              className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 mx-auto ${correct ? 'bg-emerald-300 border-emerald-500' : wrong ? 'bg-rose-300 border-rose-500' : selectedPicture === pictureIndex ? 'bg-[#2F80ED] border-[#1D4ED8]' : 'bg-[#7EC3E6] border-[#2F80ED]'}`}
                              aria-label={`Select picture ${pictureIndex + 1}`}
                            />
                            <button
                              onClick={() => pickWordMatchWord(pictureIndex)}
                              disabled={wordMatchChecked || (Object.values(wordMatchPairs).includes(pictureIndex) && wordMatchPairs[selectedPicture ?? -1] !== pictureIndex)}
                              className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 mx-auto ${Object.values(wordMatchPairs).includes(pictureIndex) ? 'bg-[#2F80ED] border-[#1D4ED8]' : 'bg-[#7EC3E6] border-[#2F80ED]'}`}
                              aria-label={`Select word ${pictureIndex + 1}`}
                            />
                            <button
                              onClick={() => pickWordMatchWord(pictureIndex)}
                              disabled={wordMatchChecked || (Object.values(wordMatchPairs).includes(pictureIndex) && wordMatchPairs[selectedPicture ?? -1] !== pictureIndex)}
                              className="h-24 sm:h-28 rounded-2xl sm:rounded-3xl text-left px-2 sm:px-6 bg-white/40 hover:bg-white/70 disabled:opacity-45 transition min-w-0"
                            >
                              <span
                                className="block text-[17px] min-[390px]:text-[20px] sm:text-[36px] font-black text-black truncate"
                                style={{ fontFamily: "'Comic Sans MS', 'DM Sans', sans-serif", textShadow: '1px 1px 0 rgba(0,0,0,0.12)' }}
                              >
                                {wordMatchWords[pictureIndex]?.word}
                              </span>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {wordMatchChecked && (
                    <div className="mt-5 rounded-2xl bg-white/70 p-4 text-center">
                      <p className="text-sm font-black text-[#1A1A2E]">
                        Board score: {wordMatchItems.reduce((total, item, pictureIndex) => {
                          const matchedWord = wordMatchWords[wordMatchPairs[pictureIndex]];
                          return total + (matchedWord?.word === item.word ? 1 : 0);
                        }, 0)} / {wordMatchItems.length}
                      </p>
                      <p className="text-xs text-gray-500 font-bold mt-1">Total score: {score} / {wordMatchPool.length}</p>
                    </div>
                  )}

                  <button
                    onClick={wordMatchChecked && wordMatchBoard + 1 < wordMatchTotalBoards ? nextWordMatchBoard : checkWordMatchBoard}
                    disabled={!wordMatchChecked && Object.keys(wordMatchPairs).length !== wordMatchItems.length}
                    className="mt-5 h-13 w-full rounded-2xl bg-[#2F80ED] text-white font-black disabled:opacity-40"
                  >
                    {wordMatchChecked && wordMatchBoard + 1 < wordMatchTotalBoards ? 'Next Board' : wordMatchChecked ? 'Finishing...' : 'Check Word Match'}
                  </button>
                </div>
              </div>
            </motion.div>
          ) : isLetterQuest ? (
            <motion.div
              className="rounded-[28px] p-4 sm:p-6 shadow-sm"
              style={{ backgroundColor: currentLetterLevel === 'hard' ? '#D8A6BA' : currentLetterLevel === 'medium' ? '#CDA8EC' : '#BFD7F5' }}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="rounded-[26px] bg-white px-4 py-6 sm:px-6">
                <div className="text-center mb-5">
                  <h2
                    className="text-[42px] sm:text-[56px] leading-none font-black text-[#8B6BC0]"
                    style={{ fontFamily: "'Comic Sans MS', 'DM Sans', sans-serif", textShadow: '2px 3px 0 rgba(30,41,59,0.22)' }}
                  >
                    Letter Quest
                  </h2>
                  <p className="inline-block mt-3 px-4 py-1 rounded-full bg-[#F5D7F0] text-[12px] font-black text-[#40344D]">
                    {currentLetterLevel.toUpperCase()} Level - Board {letterBoard + 1} / {letterQuestTotalBoards} - 30 visual questions.
                  </p>
                  <p className="hidden">
                    Board {letterBoard + 1} / {letterQuestTotalBoards} • 30 visual questions across Easy, Medium, and Hard.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {letterQuestItems.map((item, itemIndex) => {
                    const answer = letterAnswers[itemIndex];
                    const complete = answer.length === item.word.length;
                    const correct = letterChecked && answer === item.word;
                    const wrong = letterChecked && answer !== item.word;
                    return (
                      <div key={item.word} className={`rounded-2xl bg-[#C8ACE2] p-4 min-h-[235px] border-4 ${correct ? 'border-emerald-300' : wrong ? 'border-rose-300' : 'border-transparent'}`}>
                        <div className="h-20 flex items-center justify-center">
                          <motion.div
                            className="text-[64px] leading-none flex items-center justify-center"
                            style={{ color: item.color, filter: 'drop-shadow(0 8px 0 rgba(0,0,0,0.08))' }}
                            animate={{ y: [0, -4, 0] }}
                            transition={{ repeat: Infinity, duration: 2.2 + itemIndex * 0.2 }}
                          >
                            {item.icon}
                          </motion.div>
                        </div>
                        <div className="text-center -mt-1 mb-2">
                          <span className="px-2 py-0.5 rounded-full bg-white/35 text-white text-[10px] font-black uppercase tracking-wider">
                            {item.level}
                          </span>
                        </div>

                        <div className="flex justify-center gap-1.5 mt-3">
                          {item.word.split('').map((_, letterIndex) => (
                            <div key={letterIndex} className="w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-white shadow-sm flex items-center justify-center text-sm font-black text-[#5B4B73]">
                              {answer[letterIndex] || ''}
                            </div>
                          ))}
                        </div>
                        <div className="my-3 border-t-2 border-dashed border-white" />

                        <div className="grid grid-cols-5 gap-1.5">
                          {item.letters.map((letter, letterIndex) => (
                            <button
                              key={`${item.word}-${letter}-${letterIndex}`}
                              onClick={() => pickLetter(itemIndex, letter)}
                              disabled={complete || letterChecked}
                              className="h-7 rounded-md text-white text-[15px] font-black hover:bg-white/20 disabled:opacity-45"
                            >
                              {letter}
                            </button>
                          ))}
                        </div>

                        <button onClick={() => eraseLetter(itemIndex)} className="mt-3 w-full h-8 rounded-xl bg-white/25 text-white text-xs font-black">
                          Erase
                        </button>
                      </div>
                    );
                  })}
                </div>

                {letterChecked && (
                  <div className="mt-5 rounded-2xl bg-[#F3E8FF] p-4 text-center">
                    <p className="text-sm font-black text-[#6D4BA1]">
                      Board score: {letterQuestItems.reduce((total, item, index) => total + (letterAnswers[index] === item.word ? 1 : 0), 0)} / {letterQuestItems.length}
                    </p>
                    <p className="text-xs text-[#8B6BC0] font-bold mt-1">Total score: {score} / {letterQuestPool.length}</p>
                  </div>
                )}

                <button
                  onClick={letterChecked && letterBoard + 1 < letterQuestTotalBoards ? nextLetterBoard : checkLetterQuest}
                  disabled={!letterChecked && letterAnswers.some((answer, index) => letterQuestItems[index] && answer.length !== letterQuestItems[index].word.length)}
                  className="mt-5 h-13 w-full rounded-2xl bg-[#8B6BC0] text-white font-black disabled:opacity-40"
                >
                  {letterChecked && letterBoard + 1 < letterQuestTotalBoards ? 'Next Board' : letterChecked ? 'Finishing...' : 'Check Letter Quest'}
                </button>
              </div>
            </motion.div>
          ) : isMemoryCard ? (
            <motion.div
              className="rounded-[28px] p-4 sm:p-6 shadow-sm"
              style={{ backgroundColor: currentMemoryLevel === 'hard' ? '#FCA5A5' : currentMemoryLevel === 'medium' ? '#A7F3D0' : '#BAE6FD' }}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="rounded-[26px] bg-white px-4 py-6 sm:px-6 border border-white/80">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-[#4FA3D1] font-black">Memory challenge</p>
                    <h2 className="text-2xl font-black text-[#1A1A2E]">Match picture and word</h2>
                    <p className="text-sm text-gray-500 font-medium">Buka kartu, ingat posisinya, lalu temukan pasangan visual dan kata.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1.5 rounded-full bg-[#EAF7FC] text-[11px] font-black text-[#2F80ED] uppercase">
                      {currentMemoryLevel}
                    </span>
                    <span className="px-3 py-1.5 rounded-full bg-gray-100 text-[11px] font-black text-gray-500">
                      Board {memoryBoard + 1} / {memoryTotalBoards}
                    </span>
                  </div>
                </div>

                <div className="mb-5 rounded-2xl bg-[#F8FAFC] border border-gray-100 p-4">
                  <div className="flex items-center justify-between text-xs font-black text-gray-500">
                    <span>{memoryPool.length} pairs per level</span>
                    <span>{matchedCards.length / 2} / {memoryCards.length / 2} board pairs</span>
                  </div>
                  <div className="mt-3 h-2.5 rounded-full bg-white overflow-hidden">
                    <motion.div className="h-full rounded-full bg-[#7EC3E6]" animate={{ width: `${progress}%` }} />
                  </div>
                </div>

                <div className={`grid grid-cols-2 ${memoryPairCount >= 5 ? 'sm:grid-cols-5' : 'sm:grid-cols-4'} gap-3 md:gap-4`}>
                  {memoryCards.map((card) => {
                    const open = flippedCards.includes(card.id) || matchedCards.includes(card.id);
                    const matched = matchedCards.includes(card.id);
                    return (
                      <button
                        key={card.id}
                        onClick={() => flipCard(card.id)}
                        disabled={memoryBoardComplete}
                        className={`aspect-[1.02] rounded-3xl border text-center p-3 transition shadow-sm ${matched ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : open ? 'border-[#7EC3E6] bg-[#EAF7FC] text-[#1A1A2E]' : 'border-[#7EC3E6] bg-gradient-to-br from-[#7EC3E6] to-[#4FA3D1] text-white hover:-translate-y-1'}`}
                      >
                        <motion.div animate={{ rotateY: open ? 0 : 180 }} className="h-full flex items-center justify-center">
                          {open ? (
                            card.type === 'picture' ? (
                              <span className="relative w-20 h-20 rounded-3xl bg-white flex items-center justify-center text-[46px] shadow-md border border-white">
                                <span className="absolute inset-x-3 bottom-2 h-3 rounded-full bg-black/10 blur-sm" />
                                <span className="relative drop-shadow-md">{getWordMatchVisual(card.label, card.icon)}</span>
                              </span>
                            ) : (
                              <span className="px-3 py-2 rounded-2xl bg-white text-[#1A1A2E] text-sm sm:text-base font-black shadow-sm break-words">
                                {card.label}
                              </span>
                            )
                          ) : (
                            <span className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-2xl font-black">?</span>
                          )}
                        </motion.div>
                      </button>
                    );
                  })}
                </div>

                {memoryBoardComplete && (
                  <div className="mt-5 rounded-2xl bg-emerald-50 border border-emerald-100 p-4 text-center">
                    <p className="text-sm font-black text-emerald-700">Board selesai. Score sementara: {score} / {memoryPool.length}</p>
                    <p className="text-xs text-emerald-600 font-semibold mt-1">Lanjut ke board berikutnya untuk menyelesaikan 30 pasangan level ini.</p>
                    <button onClick={nextMemoryBoard} className="mt-4 h-11 px-6 rounded-2xl bg-emerald-500 text-white font-black">
                      Next Board
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={`${modeId}-${round}`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="rounded-3xl bg-white border border-gray-100 shadow-sm overflow-hidden"
              >
                <div className="p-5 md:p-7 bg-gradient-to-br from-[#EAF7FC] to-white border-b border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-black text-[#4FA3D1] uppercase tracking-wider">
                      Question {round + 1} / {questions.length}
                    </span>
                    <span className="text-[11px] font-bold text-gray-400 capitalize">{isSentenceBuilder ? currentSentenceLevel : isListenTap ? currentListenLevel : difficulty}</span>
                  </div>

                  {isSentenceBuilder ? (
                    <>
                      <p className="text-[13px] text-gray-500 font-semibold mb-2">Susun kalimat bahasa Inggris:</p>
                      <h2 className="text-[22px] md:text-[28px] leading-tight font-black text-[#1A1A2E]">{current.prompt}</h2>
                    </>
                  ) : isListenTap ? (
                    <>
                      <p className="text-[13px] text-gray-500 font-semibold mb-3">Dengarkan kata lalu pilih artinya:</p>
                      <button onClick={() => speak(current.word)} className="h-16 px-6 rounded-2xl bg-[#7EC3E6] text-white inline-flex items-center gap-3 font-black">
                        <Volume2 size={24} />
                        Play Audio
                      </button>
                    </>
                  ) : isTyping ? (
                    <>
                      <p className="text-[13px] text-gray-500 font-semibold mb-2">Ketik kata bahasa Inggris dari arti ini:</p>
                      <h2 className="text-[30px] md:text-[40px] leading-tight font-black text-[#1A1A2E]">{current.answer}</h2>
                      <p className="text-sm text-gray-400 mt-3">Hint: {current.hint}</p>
                    </>
                  ) : (
                    <>
                      <p className="text-[13px] text-gray-500 font-semibold mb-2">{isSpeedQuiz ? 'Jawab cepat sebelum waktu habis:' : 'Pilih arti yang paling tepat:'}</p>
                      <h2 className="text-[34px] md:text-[44px] leading-tight font-black text-[#1A1A2E]">{current.word}</h2>
                    </>
                  )}
                </div>

                <div className="p-5 md:p-7">
                  {isSentenceBuilder ? (
                    <div className="space-y-5">
                      <div className="min-h-[74px] rounded-2xl border-2 border-dashed border-[#7EC3E6]/45 bg-[#EAF7FC]/40 p-3 flex flex-wrap gap-2 content-start">
                        {builtWords.length === 0 ? (
                          <span className="text-sm text-gray-400 font-semibold">Tap kata di bawah untuk menyusun jawaban</span>
                        ) : (
                          builtWords.map((word, index) => (
                            <span key={`${word}-${index}`} className="px-3 py-2 rounded-xl bg-white text-[#1A1A2E] text-sm font-black shadow-sm">
                              {word}
                            </span>
                          ))
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {current.words.map((word, index) => {
                          const used = usedIndexes.includes(index);
                          return (
                            <button
                              key={`${word}-${index}`}
                              onClick={() => pickWord(word, index)}
                              disabled={used || !!feedback}
                              className={`px-4 py-2.5 rounded-xl text-sm font-black border transition ${used ? 'bg-gray-100 text-gray-300 border-gray-100' : 'bg-white text-[#1A1A2E] border-gray-200 hover:border-[#7EC3E6] hover:bg-[#EAF7FC]'}`}
                            >
                              {word}
                            </button>
                          );
                        })}
                      </div>

                      {feedback && (
                        <div className={`rounded-2xl p-4 text-sm font-bold ${feedback === 'correct' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                          {feedback === 'correct' ? 'Benar. Kalimatmu sudah tepat.' : `Belum tepat. Jawaban: ${current.answer.join(' ')}`}
                        </div>
                      )}

                      <div className="flex gap-3">
                        <button onClick={undoWord} className="h-12 px-4 rounded-2xl bg-gray-100 text-gray-600 font-black">Undo</button>
                        <button onClick={feedback ? () => goNext(score) : checkSentence} className="h-12 flex-1 rounded-2xl bg-[#7EC3E6] text-white font-black">
                          {feedback ? 'Next' : 'Check'}
                        </button>
                      </div>
                    </div>
                  ) : isTyping ? (
                    <div className="space-y-4">
                      <div className="relative">
                        <Keyboard size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          value={typedAnswer}
                          onChange={(event) => setTypedAnswer(event.target.value)}
                          onKeyDown={(event) => {
                            if (event.key === 'Enter') feedback ? goNext(score) : checkTyping();
                          }}
                          autoFocus
                          className="w-full h-14 rounded-2xl border border-gray-200 bg-[#F8FAFC] pl-11 pr-4 font-black text-[#1A1A2E] outline-none focus:border-[#7EC3E6]"
                          placeholder="Type your answer..."
                        />
                      </div>
                      {feedback && (
                        <div className={`rounded-2xl p-4 text-sm font-bold ${feedback === 'correct' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                          {feedback === 'correct' ? 'Correct.' : `Answer: ${current.word}`}
                        </div>
                      )}
                      <button onClick={feedback ? () => goNext(score) : checkTyping} className="h-12 w-full rounded-2xl bg-[#7EC3E6] text-white font-black">
                        {feedback ? 'Next' : 'Submit'}
                      </button>
                    </div>
                  ) : (
                    <div className="grid gap-3">
                      {current.options.map((option) => {
                        const isPicked = selected === option;
                        const isCorrect = option === current.answer;
                        const stateClass = feedback && isPicked
                          ? isCorrect
                            ? 'border-emerald-400 bg-emerald-50 text-emerald-700'
                            : 'border-rose-400 bg-rose-50 text-rose-700'
                          : 'border-gray-100 bg-[#F8FAFC] text-[#1A1A2E] hover:border-[#7EC3E6] hover:bg-[#EAF7FC]';

                        return (
                          <button
                            key={option}
                            onClick={() => answerWordMatch(option)}
                            className={`min-h-[54px] rounded-2xl border px-4 text-left font-black transition flex items-center justify-between ${stateClass}`}
                          >
                            <span className="inline-flex items-center gap-2">
                              {isListenTap && <Headphones size={16} className="text-[#7EC3E6]" />}
                              {option}
                            </span>
                            {feedback && isPicked && (isCorrect ? <Check size={18} /> : <X size={18} />)}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        <AnimatePresence>
          {finished && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-5 bg-slate-950/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div className="w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-2xl" initial={{ scale: 0.92, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 20 }}>
                <div className="w-16 h-16 rounded-2xl bg-[#FEF3C7] mx-auto flex items-center justify-center text-[#F59E0B] mb-4">
                  <Trophy size={34} />
                </div>
                <h2 className="text-2xl font-black text-[#1A1A2E]">
                  {isLetterQuest
                    ? (letterQuestNextLevel ? 'Selamat, Level Terbuka!' : 'Selamat, Letter Quest Selesai!')
                    : isVisualWordMatch
                      ? (wordMatchNextLevel ? 'Selamat, Level Terbuka!' : 'Selamat, Word Match Selesai!')
                      : isSentenceBuilder
                        ? (sentenceBuilderNextLevel ? 'Selamat, Level Terbuka!' : 'Selamat, Sentence Builder Selesai!')
                      : isListenTap
                        ? (listenTapNextLevel ? 'Selamat, Level Terbuka!' : 'Selamat, Listen & Tap Selesai!')
                      : isMemoryCard
                        ? (memoryCardNextLevel ? 'Selamat, Level Terbuka!' : 'Selamat, Memory Card Selesai!')
                      : isFindWords
                        ? (findWordsNextLevel ? 'Selamat, Level Terbuka!' : 'Selamat, Find the Words Selesai!')
                      : 'Game Complete'}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {isLetterQuest
                    ? `${currentLetterLevel.toUpperCase()} score: ${score} / ${letterQuestPool.length}${letterQuestPerfect ? ' - Perfect!' : ''}`
                    : isVisualWordMatch
                      ? `${currentWordMatchLevel.toUpperCase()} score: ${score} / ${wordMatchPool.length}${wordMatchPerfect ? ' - Perfect!' : ''}`
                    : isSentenceBuilder
                      ? `${currentSentenceLevel.toUpperCase()} score: ${score} / ${questions.length}${sentenceBuilderPerfect ? ' - Perfect!' : ''}`
                    : isListenTap
                      ? `${currentListenLevel.toUpperCase()} score: ${score} / ${questions.length}${listenTapPerfect ? ' - Perfect!' : ''}`
                    : isMemoryCard
                      ? `${currentMemoryLevel.toUpperCase()} score: ${score} / ${memoryPool.length}${memoryCardPerfect ? ' - Perfect!' : ''}`
                    : isFindWords
                      ? `${currentFindWordsLevel.toUpperCase()} score: ${score} / ${findWordsPool.length}${findWordsPerfect ? ' - Perfect!' : ''}`
                    : `Score ${score} / ${questions.length}`}
                </p>
                {(isLetterQuest || isVisualWordMatch || isSentenceBuilder || isListenTap || isMemoryCard || isFindWords) && (
                  <p className="text-xs text-gray-400 mt-2 font-semibold">
                    {isLetterQuest
                      ? (letterQuestNextLevel
                        ? `Level berikutnya sekarang terbuka: ${letterQuestNextLevel.toUpperCase()}.`
                        : 'Kamu sudah menyelesaikan Easy, Medium, dan Hard.')
                      : isVisualWordMatch
                      ? (wordMatchNextLevel
                        ? `Level berikutnya sekarang terbuka: ${wordMatchNextLevel.toUpperCase()}.`
                        : 'Kamu sudah menyelesaikan Easy, Medium, dan Hard.')
                      : isMemoryCard
                      ? (memoryCardNextLevel
                        ? `Level berikutnya sekarang terbuka: ${memoryCardNextLevel.toUpperCase()}.`
                        : 'Kamu sudah menyelesaikan Easy, Medium, dan Hard.')
                      : isFindWords
                      ? (findWordsNextLevel
                        ? `Level berikutnya sekarang terbuka: ${findWordsNextLevel.toUpperCase()}.`
                        : 'Kamu sudah menyelesaikan Easy, Medium, dan Hard.')
                      : (sentenceBuilderNextLevel
                        ? `Level berikutnya sekarang terbuka: ${sentenceBuilderNextLevel.toUpperCase()}.`
                        : isListenTap && listenTapNextLevel
                          ? `Level berikutnya sekarang terbuka: ${listenTapNextLevel.toUpperCase()}.`
                        : 'Kamu sudah menyelesaikan Easy, Medium, dan Hard.')}
                  </p>
                )}
                <div className="mt-5 rounded-2xl bg-[#EAF7FC] p-4">
                  <p className="text-[11px] uppercase tracking-wider text-[#4FA3D1] font-black">Reward</p>
                  <p className="text-3xl font-black text-[#1A1A2E] mt-1">+{earnedXp} XP</p>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-5">
                  <button onClick={restart} className="h-12 rounded-2xl bg-gray-100 text-gray-700 font-black inline-flex items-center justify-center gap-2">
                    <RotateCcw size={16} />
                    Retry
                  </button>
                  <button onClick={isLetterQuest && letterQuestNextLevel ? startNextLetterLevel : isVisualWordMatch && wordMatchNextLevel ? startNextWordMatchLevel : isSentenceBuilder && sentenceBuilderNextLevel ? startNextSentenceBuilderLevel : isListenTap && listenTapNextLevel ? startNextListenTapLevel : isMemoryCard && memoryCardNextLevel ? startNextMemoryCardLevel : isFindWords && findWordsNextLevel ? startNextFindWordsLevel : () => navigate('/game')} className="h-12 rounded-2xl bg-[#7EC3E6] text-white font-black inline-flex items-center justify-center gap-2">
                    {(isLetterQuest && letterQuestNextLevel) || (isVisualWordMatch && wordMatchNextLevel) || (isSentenceBuilder && sentenceBuilderNextLevel) || (isListenTap && listenTapNextLevel) || (isMemoryCard && memoryCardNextLevel) || (isFindWords && findWordsNextLevel) ? 'Next Level' : 'Done'}
                    <ChevronRight size={16} />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageContainer>
  );
}
