// @ts-nocheck
import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Check, ChevronRight, Headphones, Keyboard, RotateCcw, Timer, Trophy, Volume2, X } from 'lucide-react';
import PageContainer from '../../components/layout/PageContainer';
import { useAuth } from '../../auth/AuthContext';
import { getGamePack, normalizeTypedAnswer } from '../../features/game/gamePacks';

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

function makeTenseItem(sentence: string, translation: string, answer: string, options: string[], tense: string, formula: string, level: 'Easy' | 'Medium' | 'Hard') {
  return {
    word: sentence,
    prompt: sentence,
    translation,
    answer,
    options: shuffle([answer, ...options]).slice(0, 4),
    tense,
    formula,
    level,
    hint: tense,
  };
}

const tenseMasterQuestions = [
  ...[
    ['I ____ breakfast every morning.', 'Saya sarapan setiap pagi.', 'eat', ['eats', 'am eating', 'ate'], 'Simple Present', 'Subject + V1 / V1+s'],
    ['She ____ English on Mondays.', 'Dia belajar bahasa Inggris setiap Senin.', 'studies', ['study', 'studied', 'is studying'], 'Simple Present', 'He/She/It + V1+s/es'],
    ['They ____ football after school.', 'Mereka bermain sepak bola setelah sekolah.', 'play', ['plays', 'played', 'are play'], 'Simple Present', 'Subject + V1'],
    ['He ____ coffee every day.', 'Dia minum kopi setiap hari.', 'drinks', ['drink', 'drank', 'is drinking'], 'Simple Present', 'He/She/It + V1+s'],
    ['We ____ in Jakarta.', 'Kami tinggal di Jakarta.', 'live', ['lives', 'lived', 'are living'], 'Simple Present', 'Subject + V1'],
    ['The cat ____ on the sofa.', 'Kucing itu tidur di sofa.', 'sleeps', ['sleep', 'slept', 'is sleeping'], 'Simple Present', 'He/She/It + V1+s'],
    ['You ____ very fast.', 'Kamu berjalan sangat cepat.', 'walk', ['walks', 'walked', 'are walking'], 'Simple Present', 'Subject + V1'],
    ['My father ____ to work by car.', 'Ayah saya pergi kerja dengan mobil.', 'goes', ['go', 'went', 'is going'], 'Simple Present', 'He/She/It + V1+es'],
    ['I ____ water before class.', 'Saya minum air sebelum kelas.', 'drink', ['drinks', 'drank', 'am drinking'], 'Simple Present', 'Subject + V1'],
    ['The shop ____ at nine.', 'Toko itu buka pukul sembilan.', 'opens', ['open', 'opened', 'is opening'], 'Simple Present', 'He/She/It + V1+s'],
    ['I ____ a book now.', 'Saya sedang membaca buku sekarang.', 'am reading', ['read', 'reads', 'readed'], 'Present Continuous', 'am/is/are + V-ing'],
    ['She ____ dinner right now.', 'Dia sedang memasak makan malam sekarang.', 'is cooking', ['cooks', 'cooked', 'cook'], 'Present Continuous', 'is + V-ing'],
    ['They ____ for the bus.', 'Mereka sedang menunggu bus.', 'are waiting', ['wait', 'waits', 'waited'], 'Present Continuous', 'are + V-ing'],
    ['We ____ English today.', 'Kami sedang belajar bahasa Inggris hari ini.', 'are studying', ['study', 'studies', 'studied'], 'Present Continuous', 'are + V-ing'],
    ['He ____ a message now.', 'Dia sedang menulis pesan sekarang.', 'is writing', ['writes', 'wrote', 'write'], 'Present Continuous', 'is + V-ing'],
    ['You ____ too loudly.', 'Kamu sedang berbicara terlalu keras.', 'are speaking', ['speak', 'speaks', 'spoke'], 'Present Continuous', 'are + V-ing'],
    ['The baby ____ now.', 'Bayi itu sedang tidur sekarang.', 'is sleeping', ['sleeps', 'sleep', 'slept'], 'Present Continuous', 'is + V-ing'],
    ['I ____ to music at the moment.', 'Saya sedang mendengarkan musik saat ini.', 'am listening', ['listen', 'listened', 'listens'], 'Present Continuous', 'am + V-ing'],
    ['My friends ____ in the park.', 'Teman-teman saya sedang berlari di taman.', 'are running', ['run', 'runs', 'ran'], 'Present Continuous', 'are + V-ing'],
    ['The teacher ____ the lesson.', 'Guru sedang menjelaskan pelajaran.', 'is explaining', ['explains', 'explain', 'explained'], 'Present Continuous', 'is + V-ing'],
    ['I ____ my homework yesterday.', 'Saya mengerjakan PR kemarin.', 'did', ['do', 'does', 'am doing'], 'Simple Past', 'Subject + V2'],
    ['She ____ a letter last night.', 'Dia menulis surat tadi malam.', 'wrote', ['writes', 'write', 'is writing'], 'Simple Past', 'Subject + V2'],
    ['They ____ to Bali last year.', 'Mereka pergi ke Bali tahun lalu.', 'went', ['go', 'goes', 'are going'], 'Simple Past', 'Subject + V2'],
    ['We ____ the movie yesterday.', 'Kami menonton film itu kemarin.', 'watched', ['watch', 'watches', 'are watching'], 'Simple Past', 'Regular verb + ed'],
    ['He ____ late this morning.', 'Dia bangun terlambat pagi ini.', 'woke up', ['wakes up', 'wake up', 'is waking up'], 'Simple Past', 'Subject + V2'],
    ['You ____ the door five minutes ago.', 'Kamu membuka pintu lima menit lalu.', 'opened', ['open', 'opens', 'are opening'], 'Simple Past', 'Regular verb + ed'],
    ['The train ____ at six.', 'Kereta tiba pukul enam.', 'arrived', ['arrive', 'arrives', 'is arriving'], 'Simple Past', 'Regular verb + ed'],
    ['My mother ____ rice for lunch.', 'Ibu saya memasak nasi untuk makan siang.', 'cooked', ['cooks', 'cook', 'is cooking'], 'Simple Past', 'Regular verb + ed'],
    ['I ____ my friend at school.', 'Saya bertemu teman saya di sekolah.', 'met', ['meet', 'meets', 'am meeting'], 'Simple Past', 'Subject + V2'],
    ['They ____ happy after the game.', 'Mereka merasa senang setelah permainan.', 'felt', ['feel', 'feels', 'are feeling'], 'Simple Past', 'Subject + V2'],
  ].map(([sentence, translation, answer, options, tense, formula]) => makeTenseItem(sentence as string, translation as string, answer as string, options as string[], tense as string, formula as string, 'Easy')),
  ...[
    ['I ____ call you tomorrow.', 'Saya akan meneleponmu besok.', 'will', ['am', 'did', 'have'], 'Simple Future', 'will + V1'],
    ['She ____ visit her grandma next week.', 'Dia akan mengunjungi neneknya minggu depan.', 'will', ['is', 'has', 'did'], 'Simple Future', 'will + V1'],
    ['They ____ start a new project soon.', 'Mereka akan memulai proyek baru segera.', 'will', ['were', 'have', 'are'], 'Simple Future', 'will + V1'],
    ['We ____ meet at the station tonight.', 'Kami akan bertemu di stasiun malam ini.', 'will', ['did', 'are', 'have'], 'Simple Future', 'will + V1'],
    ['He ____ send the email later.', 'Dia akan mengirim email nanti.', 'will', ['does', 'has', 'was'], 'Simple Future', 'will + V1'],
    ['I am ____ to study harder.', 'Saya akan belajar lebih giat.', 'going', ['go', 'went', 'gone'], 'Future Plan', 'be going to + V1'],
    ['She is ____ to buy a new bag.', 'Dia akan membeli tas baru.', 'going', ['go', 'goes', 'went'], 'Future Plan', 'be going to + V1'],
    ['They are ____ to move next month.', 'Mereka akan pindah bulan depan.', 'going', ['go', 'went', 'gone'], 'Future Plan', 'be going to + V1'],
    ['We are ____ to practice tonight.', 'Kami akan berlatih malam ini.', 'going', ['go', 'goes', 'went'], 'Future Plan', 'be going to + V1'],
    ['He is ____ to join the class.', 'Dia akan bergabung dengan kelas.', 'going', ['go', 'went', 'gone'], 'Future Plan', 'be going to + V1'],
    ['I ____ finished my task.', 'Saya sudah menyelesaikan tugas saya.', 'have', ['has', 'had', 'am'], 'Present Perfect', 'have/has + V3'],
    ['She ____ visited Singapore.', 'Dia sudah mengunjungi Singapura.', 'has', ['have', 'had', 'is'], 'Present Perfect', 'has + V3'],
    ['They ____ eaten lunch.', 'Mereka sudah makan siang.', 'have', ['has', 'had', 'are'], 'Present Perfect', 'have + V3'],
    ['We ____ learned this topic.', 'Kami sudah mempelajari topik ini.', 'have', ['has', 'had', 'were'], 'Present Perfect', 'have + V3'],
    ['He ____ lost his key.', 'Dia kehilangan kuncinya.', 'has', ['have', 'had', 'is'], 'Present Perfect', 'has + V3'],
    ['I have ____ that movie.', 'Saya sudah menonton film itu.', 'seen', ['saw', 'see', 'seeing'], 'Present Perfect', 'have + V3'],
    ['She has ____ the report.', 'Dia sudah menulis laporan itu.', 'written', ['wrote', 'write', 'writing'], 'Present Perfect', 'has + V3'],
    ['They have ____ the game.', 'Mereka sudah memenangkan permainan.', 'won', ['win', 'wins', 'winning'], 'Present Perfect', 'have + V3'],
    ['We have ____ here for two years.', 'Kami sudah tinggal di sini selama dua tahun.', 'lived', ['live', 'lives', 'living'], 'Present Perfect', 'have + V3'],
    ['He has ____ his homework.', 'Dia sudah mengerjakan PR-nya.', 'done', ['did', 'do', 'doing'], 'Present Perfect', 'has + V3'],
    ['I ____ watching TV when you called.', 'Saya sedang menonton TV ketika kamu menelepon.', 'was', ['were', 'am', 'have'], 'Past Continuous', 'was/were + V-ing'],
    ['They ____ playing outside at noon.', 'Mereka sedang bermain di luar saat siang.', 'were', ['was', 'are', 'have'], 'Past Continuous', 'was/were + V-ing'],
    ['She ____ sleeping when I arrived.', 'Dia sedang tidur ketika saya tiba.', 'was', ['were', 'is', 'has'], 'Past Continuous', 'was + V-ing'],
    ['We ____ studying at eight last night.', 'Kami sedang belajar pukul delapan tadi malam.', 'were', ['was', 'are', 'had'], 'Past Continuous', 'were + V-ing'],
    ['He ____ driving to work when it rained.', 'Dia sedang menyetir ke kantor ketika hujan.', 'was', ['were', 'is', 'has'], 'Past Continuous', 'was + V-ing'],
    ['I was ____ dinner when she came.', 'Saya sedang memasak makan malam ketika dia datang.', 'cooking', ['cooked', 'cook', 'cooks'], 'Past Continuous', 'was + V-ing'],
    ['They were ____ for the exam.', 'Mereka sedang belajar untuk ujian.', 'preparing', ['prepared', 'prepare', 'prepares'], 'Past Continuous', 'were + V-ing'],
    ['She was ____ a song.', 'Dia sedang menyanyikan sebuah lagu.', 'singing', ['sang', 'sung', 'sings'], 'Past Continuous', 'was + V-ing'],
    ['We were ____ about the plan.', 'Kami sedang berbicara tentang rencana itu.', 'talking', ['talked', 'talk', 'talks'], 'Past Continuous', 'were + V-ing'],
    ['He was ____ his bike.', 'Dia sedang memperbaiki sepedanya.', 'fixing', ['fixed', 'fix', 'fixes'], 'Past Continuous', 'was + V-ing'],
  ].map(([sentence, translation, answer, options, tense, formula]) => makeTenseItem(sentence as string, translation as string, answer as string, options as string[], tense as string, formula as string, 'Medium')),
  ...[
    ['I ____ already eaten when he arrived.', 'Saya sudah makan ketika dia tiba.', 'had', ['have', 'has', 'was'], 'Past Perfect', 'had + V3'],
    ['She ____ finished the report before noon.', 'Dia sudah menyelesaikan laporan sebelum siang.', 'had', ['has', 'have', 'is'], 'Past Perfect', 'had + V3'],
    ['They ____ left before we came.', 'Mereka sudah pergi sebelum kami datang.', 'had', ['have', 'were', 'are'], 'Past Perfect', 'had + V3'],
    ['We had ____ the tickets earlier.', 'Kami sudah membeli tiket lebih awal.', 'bought', ['buy', 'boughted', 'buying'], 'Past Perfect', 'had + V3'],
    ['He had ____ the door before sleeping.', 'Dia sudah mengunci pintu sebelum tidur.', 'locked', ['lock', 'locks', 'locking'], 'Past Perfect', 'had + V3'],
    ['By next year, I will ____ graduated.', 'Tahun depan, saya akan sudah lulus.', 'have', ['has', 'had', 'be'], 'Future Perfect', 'will have + V3'],
    ['She will ____ completed the course by June.', 'Dia akan sudah menyelesaikan kursus pada bulan Juni.', 'have', ['has', 'had', 'be'], 'Future Perfect', 'will have + V3'],
    ['They will have ____ by the time we arrive.', 'Mereka akan sudah pergi saat kami tiba.', 'left', ['leave', 'leaves', 'leaving'], 'Future Perfect', 'will have + V3'],
    ['We will have ____ the project by Friday.', 'Kami akan sudah menyelesaikan proyek itu pada Jumat.', 'finished', ['finish', 'finishes', 'finishing'], 'Future Perfect', 'will have + V3'],
    ['He will have ____ the email before lunch.', 'Dia akan sudah mengirim email sebelum makan siang.', 'sent', ['send', 'sends', 'sending'], 'Future Perfect', 'will have + V3'],
    ['If I ____ more time, I would travel.', 'Jika saya punya lebih banyak waktu, saya akan bepergian.', 'had', ['have', 'has', 'will have'], 'Second Conditional', 'If + past, would + V1'],
    ['If she ____ harder, she would pass.', 'Jika dia belajar lebih giat, dia akan lulus.', 'studied', ['studies', 'study', 'will study'], 'Second Conditional', 'If + V2, would + V1'],
    ['If they ____ here, we would start.', 'Jika mereka ada di sini, kami akan mulai.', 'were', ['are', 'is', 'will be'], 'Second Conditional', 'If + past, would + V1'],
    ['I would help you if I ____ free.', 'Saya akan membantumu jika saya luang.', 'were', ['am', 'be', 'will be'], 'Second Conditional', 'If + past, would + V1'],
    ['He would buy it if it ____ cheaper.', 'Dia akan membelinya jika lebih murah.', 'were', ['is', 'will be', 'be'], 'Second Conditional', 'If + past, would + V1'],
    ['If I had known, I ____ have called you.', 'Jika saya tahu, saya akan meneleponmu.', 'would', ['will', 'can', 'do'], 'Third Conditional', 'If + had V3, would have V3'],
    ['If she had studied, she ____ have passed.', 'Jika dia belajar, dia akan lulus.', 'would', ['will', 'does', 'is'], 'Third Conditional', 'If + had V3, would have V3'],
    ['They would have joined if they ____ invited.', 'Mereka akan ikut jika mereka diundang.', 'had been', ['have been', 'were', 'are'], 'Third Conditional', 'If + had V3, would have V3'],
    ['We would have arrived earlier if we ____ left sooner.', 'Kami akan tiba lebih awal jika berangkat lebih cepat.', 'had', ['have', 'has', 'were'], 'Third Conditional', 'If + had V3, would have V3'],
    ['He would have helped if he ____ known.', 'Dia akan membantu jika dia tahu.', 'had', ['has', 'have', 'was'], 'Third Conditional', 'If + had V3, would have V3'],
    ['The report ____ written by Anna.', 'Laporan itu ditulis oleh Anna.', 'was', ['were', 'has', 'did'], 'Past Passive', 'was/were + V3'],
    ['The rooms ____ cleaned every morning.', 'Kamar-kamar dibersihkan setiap pagi.', 'are', ['is', 'was', 'did'], 'Present Passive', 'am/is/are + V3'],
    ['The email ____ sent yesterday.', 'Email itu dikirim kemarin.', 'was', ['is', 'has', 'does'], 'Past Passive', 'was/were + V3'],
    ['The books ____ delivered tomorrow.', 'Buku-buku akan dikirim besok.', 'will be', ['were', 'are', 'have'], 'Future Passive', 'will be + V3'],
    ['The problem ____ solved by the team.', 'Masalah itu telah diselesaikan oleh tim.', 'has been', ['was been', 'have been', 'is been'], 'Present Perfect Passive', 'has/have been + V3'],
    ['By 2027, the bridge will have ____ completed.', 'Pada 2027, jembatan itu akan sudah selesai.', 'been', ['be', 'being', 'was'], 'Future Perfect Passive', 'will have been + V3'],
    ['She said that she ____ tired.', 'Dia berkata bahwa dia lelah.', 'was', ['is', 'will be', 'has been'], 'Reported Speech', 'backshift tense'],
    ['He told me he ____ finished the task.', 'Dia memberi tahu saya bahwa dia sudah menyelesaikan tugas.', 'had', ['has', 'have', 'will'], 'Reported Speech', 'past perfect after reporting'],
    ['They said they ____ come the next day.', 'Mereka berkata akan datang keesokan harinya.', 'would', ['will', 'can', 'do'], 'Reported Speech', 'will becomes would'],
    ['I wish I ____ prepared earlier.', 'Saya berharap saya sudah mempersiapkan lebih awal.', 'had', ['have', 'has', 'would'], 'Wish + Past Perfect', 'wish + had V3'],
  ].map(([sentence, translation, answer, options, tense, formula]) => makeTenseItem(sentence as string, translation as string, answer as string, options as string[], tense as string, formula as string, 'Hard')),
];

type VerbFormSource = {
  base: string;
  past: string;
  participle: string;
  gerund: string;
  meaning: string;
};

const verbFormSources: VerbFormSource[] = [
  { base: 'go', past: 'went', participle: 'gone', gerund: 'going', meaning: 'pergi' },
  { base: 'eat', past: 'ate', participle: 'eaten', gerund: 'eating', meaning: 'makan' },
  { base: 'write', past: 'wrote', participle: 'written', gerund: 'writing', meaning: 'menulis' },
  { base: 'read', past: 'read', participle: 'read', gerund: 'reading', meaning: 'membaca' },
  { base: 'drink', past: 'drank', participle: 'drunk', gerund: 'drinking', meaning: 'minum' },
  { base: 'speak', past: 'spoke', participle: 'spoken', gerund: 'speaking', meaning: 'berbicara' },
  { base: 'take', past: 'took', participle: 'taken', gerund: 'taking', meaning: 'mengambil' },
  { base: 'make', past: 'made', participle: 'made', gerund: 'making', meaning: 'membuat' },
  { base: 'see', past: 'saw', participle: 'seen', gerund: 'seeing', meaning: 'melihat' },
  { base: 'come', past: 'came', participle: 'come', gerund: 'coming', meaning: 'datang' },
  { base: 'buy', past: 'bought', participle: 'bought', gerund: 'buying', meaning: 'membeli' },
  { base: 'bring', past: 'brought', participle: 'brought', gerund: 'bringing', meaning: 'membawa' },
  { base: 'teach', past: 'taught', participle: 'taught', gerund: 'teaching', meaning: 'mengajar' },
  { base: 'think', past: 'thought', participle: 'thought', gerund: 'thinking', meaning: 'berpikir' },
  { base: 'find', past: 'found', participle: 'found', gerund: 'finding', meaning: 'menemukan' },
  { base: 'give', past: 'gave', participle: 'given', gerund: 'giving', meaning: 'memberi' },
  { base: 'know', past: 'knew', participle: 'known', gerund: 'knowing', meaning: 'mengetahui' },
  { base: 'begin', past: 'began', participle: 'begun', gerund: 'beginning', meaning: 'memulai' },
  { base: 'choose', past: 'chose', participle: 'chosen', gerund: 'choosing', meaning: 'memilih' },
  { base: 'drive', past: 'drove', participle: 'driven', gerund: 'driving', meaning: 'mengemudi' },
  { base: 'fall', past: 'fell', participle: 'fallen', gerund: 'falling', meaning: 'jatuh' },
  { base: 'forget', past: 'forgot', participle: 'forgotten', gerund: 'forgetting', meaning: 'melupakan' },
  { base: 'get', past: 'got', participle: 'gotten', gerund: 'getting', meaning: 'mendapatkan' },
  { base: 'grow', past: 'grew', participle: 'grown', gerund: 'growing', meaning: 'tumbuh' },
  { base: 'keep', past: 'kept', participle: 'kept', gerund: 'keeping', meaning: 'menyimpan' },
  { base: 'leave', past: 'left', participle: 'left', gerund: 'leaving', meaning: 'meninggalkan' },
  { base: 'meet', past: 'met', participle: 'met', gerund: 'meeting', meaning: 'bertemu' },
  { base: 'pay', past: 'paid', participle: 'paid', gerund: 'paying', meaning: 'membayar' },
  { base: 'send', past: 'sent', participle: 'sent', gerund: 'sending', meaning: 'mengirim' },
  { base: 'win', past: 'won', participle: 'won', gerund: 'winning', meaning: 'menang' },
];

function makeVerbFormItem(verb: VerbFormSource, index: number, level: 'Easy' | 'Medium' | 'Hard') {
  const target = level === 'Easy' ? 'past' : level === 'Medium' ? (index % 2 === 0 ? 'participle' : 'gerund') : (index % 3 === 0 ? 'participle' : index % 3 === 1 ? 'gerund' : 'past');
  const answer = verb[target];
  const formLabel = target === 'past' ? 'V2 Past' : target === 'participle' ? 'V3 Participle' : 'V-ing';
  const pattern = target === 'past' ? 'Simple Past uses V2' : target === 'participle' ? 'Perfect / passive uses V3' : 'Continuous uses V-ing';
  const prompt = target === 'past'
    ? `Choose the V2 form of "${verb.base}".`
    : target === 'participle'
      ? `Choose the V3 form of "${verb.base}".`
      : `Choose the V-ing form of "${verb.base}".`;
  const formPool = verbFormSources.map((item) => item[target]).filter((item) => item !== answer);

  return {
    word: verb.base,
    prompt,
    translation: verb.meaning,
    answer,
    options: shuffle([answer, ...shuffle(formPool).slice(0, 3)]),
    formLabel,
    pattern,
    forms: {
      V1: verb.base,
      V2: verb.past,
      V3: verb.participle,
      ING: verb.gerund,
    },
    level,
    hint: formLabel,
  };
}

const verbFormsQuestions = [
  ...verbFormSources.map((verb, index) => makeVerbFormItem(verb, index, 'Easy')),
  ...verbFormSources.map((verb, index) => makeVerbFormItem(verb, index, 'Medium')),
  ...verbFormSources.map((verb, index) => makeVerbFormItem(verb, index, 'Hard')),
];

function makeArticleItem(sentence: string, translation: string, answer: string, rule: string, level: 'Easy' | 'Medium' | 'Hard') {
  return {
    word: sentence,
    prompt: sentence,
    translation,
    answer,
    options: ['a', 'an', 'the', 'no article'],
    rule,
    level,
    hint: rule,
  };
}

const articleDashQuestions = [
  ...[
    ['I have ____ pen.', 'Saya punya sebuah pulpen.', 'a', 'Use a before a singular consonant sound.'],
    ['She eats ____ apple.', 'Dia makan sebuah apel.', 'an', 'Use an before a singular vowel sound.'],
    ['He is ____ teacher.', 'Dia adalah seorang guru.', 'a', 'Jobs use a/an with singular nouns.'],
    ['This is ____ orange bag.', 'Ini adalah sebuah tas oranye.', 'an', 'Orange starts with a vowel sound.'],
    ['We saw ____ dog in the park.', 'Kami melihat seekor anjing di taman.', 'a', 'Use a when mentioning one item for the first time.'],
    ['I need ____ umbrella.', 'Saya butuh sebuah payung.', 'an', 'Umbrella starts with a vowel sound.'],
    ['She bought ____ book yesterday.', 'Dia membeli sebuah buku kemarin.', 'a', 'Use a for one nonspecific singular noun.'],
    ['He found ____ egg in the kitchen.', 'Dia menemukan sebutir telur di dapur.', 'an', 'Egg starts with a vowel sound.'],
    ['They live in ____ small house.', 'Mereka tinggal di sebuah rumah kecil.', 'a', 'Small starts with a consonant sound.'],
    ['I saw ____ elephant at the zoo.', 'Saya melihat seekor gajah di kebun binatang.', 'an', 'Elephant starts with a vowel sound.'],
    ['She is reading ____ magazine.', 'Dia sedang membaca sebuah majalah.', 'a', 'Use a for one general singular item.'],
    ['He wants ____ ice cream.', 'Dia ingin sebuah es krim.', 'an', 'Ice starts with a vowel sound.'],
    ['I have ____ idea.', 'Saya punya sebuah ide.', 'an', 'Idea starts with a vowel sound.'],
    ['There is ____ chair near the door.', 'Ada sebuah kursi dekat pintu.', 'a', 'Chair starts with a consonant sound.'],
    ['She wears ____ red dress.', 'Dia memakai sebuah gaun merah.', 'a', 'Red starts with a consonant sound.'],
    ['He is ____ honest man.', 'Dia adalah pria yang jujur.', 'an', 'Honest begins with a silent h vowel sound.'],
    ['We need ____ table for four.', 'Kami butuh sebuah meja untuk empat orang.', 'a', 'Table starts with a consonant sound.'],
    ['I saw ____ owl last night.', 'Saya melihat seekor burung hantu tadi malam.', 'an', 'Owl starts with a vowel sound.'],
    ['She has ____ new phone.', 'Dia punya sebuah ponsel baru.', 'a', 'New starts with a consonant sound.'],
    ['He bought ____ old car.', 'Dia membeli sebuah mobil tua.', 'an', 'Old starts with a vowel sound.'],
    ['This is ____ easy question.', 'Ini adalah sebuah pertanyaan mudah.', 'an', 'Easy starts with a vowel sound.'],
    ['I met ____ student from Canada.', 'Saya bertemu seorang siswa dari Kanada.', 'a', 'Student starts with a consonant sound.'],
    ['She needs ____ notebook.', 'Dia butuh sebuah buku catatan.', 'a', 'Notebook starts with a consonant sound.'],
    ['He saw ____ ant on the floor.', 'Dia melihat seekor semut di lantai.', 'an', 'Ant starts with a vowel sound.'],
    ['They ordered ____ pizza.', 'Mereka memesan sebuah pizza.', 'a', 'Pizza starts with a consonant sound.'],
    ['I heard ____ interesting story.', 'Saya mendengar sebuah cerita menarik.', 'an', 'Interesting starts with a vowel sound.'],
    ['She has ____ beautiful voice.', 'Dia punya suara yang indah.', 'a', 'Beautiful starts with a consonant sound.'],
    ['He is ____ engineer.', 'Dia adalah seorang insinyur.', 'an', 'Engineer starts with a vowel sound.'],
    ['We found ____ key.', 'Kami menemukan sebuah kunci.', 'a', 'Key starts with a consonant sound.'],
    ['It is ____ unusual problem.', 'Itu adalah masalah yang tidak biasa.', 'an', 'Unusual starts with a vowel sound.'],
  ].map(([sentence, translation, answer, rule]) => makeArticleItem(sentence as string, translation as string, answer as string, rule as string, 'Easy')),
  ...[
    ['Please close ____ door.', 'Tolong tutup pintunya.', 'the', 'Use the when both people know which item.'],
    ['____ sun rises in the east.', 'Matahari terbit di timur.', 'the', 'Use the for unique things.'],
    ['I like ____ music.', 'Saya suka musik.', 'no article', 'Use no article for general uncountable nouns.'],
    ['She plays ____ piano.', 'Dia bermain piano.', 'the', 'Use the with musical instruments.'],
    ['We had lunch at ____ school.', 'Kami makan siang di sekolah.', 'no article', 'Use no article for institutions in their main purpose.'],
    ['He went to ____ hospital to visit a friend.', 'Dia pergi ke rumah sakit untuk mengunjungi teman.', 'the', 'Use the when visiting the place, not receiving its service.'],
    ['____ moon looks bright tonight.', 'Bulan terlihat terang malam ini.', 'the', 'Use the for unique natural objects.'],
    ['I drink ____ coffee every morning.', 'Saya minum kopi setiap pagi.', 'no article', 'Use no article for general uncountable nouns.'],
    ['She is ____ best student in class.', 'Dia siswa terbaik di kelas.', 'the', 'Use the with superlatives.'],
    ['They went by ____ bus.', 'Mereka pergi dengan bus.', 'no article', 'Use no article with by + transport.'],
    ['I saw a dog. ____ dog was black.', 'Saya melihat seekor anjing. Anjing itu hitam.', 'the', 'Use the after something was already mentioned.'],
    ['____ water in this glass is cold.', 'Air di gelas ini dingin.', 'the', 'Use the for a specific amount or item.'],
    ['She studies ____ English.', 'Dia belajar bahasa Inggris.', 'no article', 'Use no article before languages.'],
    ['He lives in ____ United States.', 'Dia tinggal di Amerika Serikat.', 'the', 'Use the with countries containing states/republic/kingdom.'],
    ['We visited ____ museum near the station.', 'Kami mengunjungi museum dekat stasiun.', 'the', 'Use the when a noun is specified by context.'],
    ['I love ____ chocolate.', 'Saya suka cokelat.', 'no article', 'Use no article for general food substances.'],
    ['____ Pacific Ocean is huge.', 'Samudra Pasifik sangat besar.', 'the', 'Use the with oceans.'],
    ['She goes to ____ work at eight.', 'Dia pergi bekerja pukul delapan.', 'no article', 'Use no article in go to work.'],
    ['He is ____ tallest boy here.', 'Dia anak laki-laki tertinggi di sini.', 'the', 'Use the with superlative adjectives.'],
    ['We need ____ information you sent.', 'Kami membutuhkan informasi yang kamu kirim.', 'the', 'Use the for specific uncountable nouns.'],
    ['I enjoy ____ football.', 'Saya menikmati sepak bola.', 'no article', 'Use no article before sports in general.'],
    ['She opened ____ window.', 'Dia membuka jendela itu.', 'the', 'Use the when the object is clear in context.'],
    ['He reads ____ newspaper every day.', 'Dia membaca koran setiap hari.', 'a', 'Use a for one nonspecific countable noun.'],
    ['____ Nile is a long river.', 'Sungai Nil adalah sungai yang panjang.', 'the', 'Use the with river names.'],
    ['They are at ____ home.', 'Mereka berada di rumah.', 'no article', 'Use no article in at home.'],
    ['This is ____ answer I wanted.', 'Ini jawaban yang saya inginkan.', 'the', 'Use the when a following clause makes it specific.'],
    ['I bought ____ rice.', 'Saya membeli beras.', 'no article', 'Use no article for general uncountable nouns.'],
    ['She visited ____ Philippines.', 'Dia mengunjungi Filipina.', 'the', 'Use the with plural country names.'],
    ['We watched ____ movie last night.', 'Kami menonton sebuah film tadi malam.', 'a', 'Use a for one nonspecific countable noun.'],
    ['He is in ____ bed because he is sick.', 'Dia di tempat tidur karena sakit.', 'no article', 'Use no article in in bed for resting/sleeping.'],
  ].map(([sentence, translation, answer, rule]) => makeArticleItem(sentence as string, translation as string, answer as string, rule as string, 'Medium')),
  ...[
    ['She became ____ CEO of the company.', 'Dia menjadi CEO perusahaan.', 'the', 'Use the for a specific title/role in an organization.'],
    ['He was elected ____ president.', 'Dia terpilih menjadi presiden.', 'no article', 'Use no article after elect/appoint before unique roles.'],
    ['I have ____ MBA from a good university.', 'Saya punya gelar MBA dari universitas bagus.', 'an', 'MBA starts with a vowel sound: em.'],
    ['This is ____ one-time offer.', 'Ini adalah penawaran satu kali.', 'a', 'One starts with a consonant sound: wun.'],
    ['She is ____ European artist.', 'Dia adalah seniman Eropa.', 'a', 'European starts with a consonant sound: yoo.'],
    ['He arrived in ____ hour.', 'Dia tiba dalam satu jam.', 'an', 'Hour begins with a silent h vowel sound.'],
    ['____ rich should help the poor.', 'Orang kaya seharusnya membantu orang miskin.', 'the', 'Use the + adjective to mean a group of people.'],
    ['____ Japanese is difficult for me.', 'Bahasa Jepang sulit bagi saya.', 'no article', 'Use no article before languages.'],
    ['____ Japanese are known for punctuality.', 'Orang Jepang dikenal tepat waktu.', 'the', 'Use the with nationality adjectives for a group.'],
    ['We crossed ____ Alps last summer.', 'Kami melintasi Pegunungan Alpen musim panas lalu.', 'the', 'Use the with mountain ranges.'],
    ['She climbed ____ Mount Fuji.', 'Dia mendaki Gunung Fuji.', 'no article', 'Use no article with most single mountains.'],
    ['He plays ____ chess after dinner.', 'Dia bermain catur setelah makan malam.', 'no article', 'Use no article before games.'],
    ['I heard ____ amazing news.', 'Saya mendengar berita yang luar biasa.', 'no article', 'News is uncountable, so no a/an.'],
    ['She gave me ____ useful tip.', 'Dia memberi saya tips yang berguna.', 'a', 'Useful starts with a consonant sound: yoo.'],
    ['He is ____ heir to the throne.', 'Dia adalah pewaris takhta.', 'an', 'Heir begins with a silent h vowel sound.'],
    ['____ unemployed need more support.', 'Pengangguran membutuhkan lebih banyak dukungan.', 'the', 'Use the + adjective for a social group.'],
    ['They travelled through ____ Sahara.', 'Mereka bepergian melalui Sahara.', 'the', 'Use the with deserts.'],
    ['I met him at ____ university.', 'Saya bertemu dia di universitas.', 'a', 'University starts with a consonant sound: yoo.'],
    ['She has ____ honor to speak first.', 'Dia mendapat kehormatan berbicara pertama.', 'an', 'Honor begins with a silent h vowel sound.'],
    ['We stayed at ____ Hilton Hotel.', 'Kami menginap di Hotel Hilton.', 'the', 'Use the with hotel names.'],
    ['He works for ____ United Nations.', 'Dia bekerja untuk Perserikatan Bangsa-Bangsa.', 'the', 'Use the with organizations containing United.'],
    ['I need ____ advice from you.', 'Saya butuh nasihat darimu.', 'no article', 'Advice is uncountable.'],
    ['She bought ____ uniform for school.', 'Dia membeli seragam untuk sekolah.', 'a', 'Uniform starts with a consonant sound: yoo.'],
    ['____ Netherlands is in Europe.', 'Belanda berada di Eropa.', 'the', 'Use the with the Netherlands.'],
    ['He became ____ ambassador last year.', 'Dia menjadi duta besar tahun lalu.', 'an', 'Ambassador starts with a vowel sound.'],
    ['We had ____ dinner with clients.', 'Kami makan malam dengan klien.', 'no article', 'Meals usually take no article in general use.'],
    ['The team made ____ historic decision.', 'Tim membuat keputusan bersejarah.', 'a', 'Historic commonly starts with a pronounced h.'],
    ['She studies at ____ university in London.', 'Dia belajar di sebuah universitas di London.', 'a', 'University starts with a consonant sound: yoo.'],
    ['He is ____ only person I trust.', 'Dia satu-satunya orang yang saya percaya.', 'the', 'Use the with only when it makes a noun unique.'],
    ['They sailed across ____ Atlantic.', 'Mereka berlayar menyeberangi Atlantik.', 'the', 'Use the with oceans and seas.'],
  ].map(([sentence, translation, answer, rule]) => makeArticleItem(sentence as string, translation as string, answer as string, rule as string, 'Hard')),
];

const modalOptions = ['can', 'should', 'must', 'may', 'would', 'could'];

function modalItem(sentence: string, translation: string, answer: string, rule: string, tone: string, level: 'Easy' | 'Medium' | 'Hard') {
  return {
    word: sentence,
    prompt: sentence,
    translation,
    answer,
    options: shuffle([answer, ...modalOptions.filter((option) => option !== answer).slice(0, 3)]),
    rule,
    tone,
    level,
    hint: rule,
  };
}

const modalQuestQuestions = [
  ...[
    ['I ____ swim very well.', 'Saya bisa berenang dengan sangat baik.', 'can', 'Use can for ability.', 'Ability'],
    ['You ____ wear a helmet here.', 'Kamu harus memakai helm di sini.', 'must', 'Use must for strong obligation.', 'Obligation'],
    ['She ____ study more for the test.', 'Dia sebaiknya belajar lebih banyak untuk ujian.', 'should', 'Use should for advice.', 'Advice'],
    ['____ I open the window?', 'Bolehkah saya membuka jendela?', 'may', 'Use may for polite permission.', 'Permission'],
    ['He ____ speak English and Spanish.', 'Dia bisa berbicara bahasa Inggris dan Spanyol.', 'can', 'Use can for ability.', 'Ability'],
    ['You ____ see a doctor.', 'Kamu sebaiknya pergi ke dokter.', 'should', 'Use should for advice.', 'Advice'],
    ['Students ____ be quiet in the library.', 'Siswa harus tenang di perpustakaan.', 'must', 'Use must for rules.', 'Rule'],
    ['____ you help me, please?', 'Bisakah kamu membantu saya?', 'could', 'Use could for polite requests.', 'Request'],
    ['I ____ like some tea.', 'Saya ingin teh.', 'would', 'Use would like for polite wants.', 'Polite want'],
    ['We ____ finish this today.', 'Kami harus menyelesaikan ini hari ini.', 'must', 'Use must for necessity.', 'Necessity'],
    ['They ____ play guitar.', 'Mereka bisa bermain gitar.', 'can', 'Use can for ability.', 'Ability'],
    ['You ____ eat too much sugar.', 'Kamu sebaiknya tidak makan terlalu banyak gula.', 'should', 'Use should for advice.', 'Advice'],
    ['____ I sit here?', 'Bolehkah saya duduk di sini?', 'may', 'Use may for permission.', 'Permission'],
    ['She ____ run fast.', 'Dia bisa berlari cepat.', 'can', 'Use can for ability.', 'Ability'],
    ['Drivers ____ stop at a red light.', 'Pengemudi harus berhenti di lampu merah.', 'must', 'Use must for laws/rules.', 'Rule'],
    ['You ____ try this app.', 'Kamu sebaiknya mencoba aplikasi ini.', 'should', 'Use should for recommendation.', 'Advice'],
    ['____ you pass the salt?', 'Bisakah Anda mengambilkan garam?', 'could', 'Use could for polite requests.', 'Request'],
    ['I ____ help you after class.', 'Saya bisa membantumu setelah kelas.', 'can', 'Use can for ability/possibility.', 'Ability'],
    ['We ____ be late.', 'Kita tidak boleh terlambat.', 'must', 'Use must for strong necessity.', 'Necessity'],
    ['He ____ like to join the meeting.', 'Dia ingin bergabung dengan rapat.', 'would', 'Use would like for polite preference.', 'Polite want'],
    ['You ____ drink more water.', 'Kamu sebaiknya minum lebih banyak air.', 'should', 'Use should for health advice.', 'Advice'],
    ['____ I borrow your pen?', 'Bolehkah saya meminjam pulpenmu?', 'may', 'Use may for polite permission.', 'Permission'],
    ['They ____ not enter this room.', 'Mereka tidak boleh masuk ruangan ini.', 'must', 'Use must not for prohibition.', 'Prohibition'],
    ['She ____ draw beautifully.', 'Dia bisa menggambar dengan indah.', 'can', 'Use can for ability.', 'Ability'],
    ['____ you speak more slowly?', 'Bisakah kamu berbicara lebih pelan?', 'could', 'Use could for polite requests.', 'Request'],
    ['I ____ like to order pizza.', 'Saya ingin memesan pizza.', 'would', 'Use would like to order politely.', 'Polite want'],
    ['You ____ check your answer.', 'Kamu sebaiknya mengecek jawabanmu.', 'should', 'Use should for suggestion.', 'Advice'],
    ['Visitors ____ show ID.', 'Pengunjung harus menunjukkan ID.', 'must', 'Use must for requirements.', 'Requirement'],
    ['He ____ fix the computer.', 'Dia bisa memperbaiki komputer.', 'can', 'Use can for skill.', 'Ability'],
    ['____ I leave early today?', 'Bolehkah saya pulang lebih awal hari ini?', 'may', 'Use may for formal permission.', 'Permission'],
  ].map(([sentence, translation, answer, rule, tone]) => modalItem(sentence as string, translation as string, answer as string, rule as string, tone as string, 'Easy')),
  ...[
    ['You ____ have told me earlier.', 'Kamu seharusnya memberitahu saya lebih awal.', 'should', 'Use should have for past regret/advice.', 'Past advice'],
    ['She ____ be at home now.', 'Dia mungkin berada di rumah sekarang.', 'may', 'Use may for possibility.', 'Possibility'],
    ['He ____ be the new manager.', 'Dia mungkin menjadi manajer baru.', 'could', 'Use could for uncertain possibility.', 'Possibility'],
    ['I ____ rather stay home tonight.', 'Saya lebih memilih tinggal di rumah malam ini.', 'would', 'Use would rather for preference.', 'Preference'],
    ['You ____ not park here.', 'Kamu tidak boleh parkir di sini.', 'must', 'Use must not for prohibition.', 'Prohibition'],
    ['They ____ have missed the bus.', 'Mereka mungkin ketinggalan bus.', 'may', 'Use may have for past possibility.', 'Past possibility'],
    ['We ____ finish it by Friday.', 'Kami harus menyelesaikannya sebelum Jumat.', 'must', 'Use must for deadline necessity.', 'Necessity'],
    ['You ____ have studied harder.', 'Kamu seharusnya belajar lebih giat.', 'should', 'Use should have for past advice.', 'Past advice'],
    ['____ you mind closing the door?', 'Apakah Anda keberatan menutup pintu?', 'would', 'Use would you mind for polite requests.', 'Request'],
    ['This ____ be the right address.', 'Ini mungkin alamat yang benar.', 'could', 'Use could for possibility.', 'Possibility'],
    ['She ____ speak French when she was five.', 'Dia bisa berbicara bahasa Prancis saat berumur lima tahun.', 'could', 'Use could for past ability.', 'Past ability'],
    ['You ____ not touch that wire.', 'Kamu tidak boleh menyentuh kabel itu.', 'must', 'Use must not for danger/prohibition.', 'Prohibition'],
    ['He ____ arrive late because of traffic.', 'Dia mungkin tiba terlambat karena macet.', 'may', 'Use may for possible events.', 'Possibility'],
    ['I ____ prefer coffee, please.', 'Saya lebih suka kopi.', 'would', 'Use would prefer for polite preference.', 'Preference'],
    ['We ____ have taken a taxi.', 'Kita seharusnya naik taksi.', 'should', 'Use should have for better past action.', 'Past advice'],
    ['The answer ____ be correct.', 'Jawabannya mungkin benar.', 'could', 'Use could when not fully certain.', 'Possibility'],
    ['You ____ respect other people.', 'Kamu harus menghormati orang lain.', 'must', 'Use must for moral obligation.', 'Obligation'],
    ['She ____ have forgotten the meeting.', 'Dia mungkin lupa rapatnya.', 'may', 'Use may have for past possibility.', 'Past possibility'],
    ['I ____ love to visit Japan.', 'Saya ingin sekali mengunjungi Jepang.', 'would', 'Use would love to for polite desire.', 'Desire'],
    ['He ____ have apologized.', 'Dia seharusnya meminta maaf.', 'should', 'Use should have for past criticism.', 'Past advice'],
    ['We ____ cancel the event if it rains.', 'Kami mungkin membatalkan acara jika hujan.', 'may', 'Use may for possible future action.', 'Possibility'],
    ['You ____ be tired after the trip.', 'Kamu pasti lelah setelah perjalanan.', 'must', 'Use must for strong logical deduction.', 'Deduction'],
    ['She ____ be joking.', 'Dia mungkin bercanda.', 'could', 'Use could for weak possibility.', 'Possibility'],
    ['____ you like to join us?', 'Apakah kamu ingin bergabung dengan kami?', 'would', 'Use would you like for invitations.', 'Invitation'],
    ['They ____ have called us first.', 'Mereka seharusnya menelepon kita dulu.', 'should', 'Use should have for expected past action.', 'Past advice'],
    ['He ____ know the answer.', 'Dia mungkin tahu jawabannya.', 'may', 'Use may for uncertainty.', 'Possibility'],
    ['You ____ not share your password.', 'Kamu tidak boleh membagikan kata sandimu.', 'must', 'Use must not for security rules.', 'Prohibition'],
    ['I ____ use a break.', 'Saya bisa menggunakan waktu istirahat.', 'could', 'Use could use for something helpful.', 'Need'],
    ['We ____ rather wait here.', 'Kami lebih memilih menunggu di sini.', 'would', 'Use would rather for preference.', 'Preference'],
    ['She ____ have been at the office.', 'Dia mungkin tadi berada di kantor.', 'could', 'Use could have for past possibility.', 'Past possibility'],
  ].map(([sentence, translation, answer, rule, tone]) => modalItem(sentence as string, translation as string, answer as string, rule as string, tone as string, 'Medium')),
  ...[
    ['Had I known, I ____ have helped.', 'Jika saya tahu, saya akan membantu.', 'would', 'Use would have in third conditional results.', 'Conditional'],
    ['You ____ have been more careful.', 'Kamu seharusnya lebih berhati-hati.', 'should', 'Use should have for past criticism.', 'Past criticism'],
    ['The package ____ have arrived by now.', 'Paket itu seharusnya sudah tiba sekarang.', 'should', 'Use should have for expected completion.', 'Expectation'],
    ['She ____ have taken the wrong train.', 'Dia mungkin naik kereta yang salah.', 'may', 'Use may have for uncertain past possibility.', 'Past possibility'],
    ['He ____ have been the one who called.', 'Dia mungkin orang yang menelepon.', 'could', 'Use could have for possible past identity.', 'Past possibility'],
    ['If I were you, I ____ accept the offer.', 'Jika saya jadi kamu, saya akan menerima tawaran itu.', 'would', 'Use would in hypothetical advice.', 'Hypothetical'],
    ['You ____ not have opened that file.', 'Kamu seharusnya tidak membuka file itu.', 'should', 'Use should not have for past mistake.', 'Past mistake'],
    ['This ____ be the solution we need.', 'Ini mungkin solusi yang kita butuhkan.', 'could', 'Use could for tentative possibility.', 'Possibility'],
    ['Employees ____ follow the safety policy.', 'Karyawan harus mengikuti kebijakan keselamatan.', 'must', 'Use must for formal rules.', 'Rule'],
    ['The client ____ request another revision.', 'Klien mungkin meminta revisi lain.', 'may', 'Use may for future possibility.', 'Possibility'],
    ['I ____ rather not discuss it now.', 'Saya lebih memilih tidak membahasnya sekarang.', 'would', 'Use would rather not for preference.', 'Preference'],
    ['You ____ have seen his face.', 'Kamu seharusnya melihat wajahnya.', 'should', 'Use should have for noteworthy past situations.', 'Past reaction'],
    ['The system ____ restart automatically.', 'Sistem mungkin restart otomatis.', 'may', 'Use may for technical possibility.', 'Possibility'],
    ['We ____ have avoided this problem.', 'Kita bisa saja menghindari masalah ini.', 'could', 'Use could have for past possibility not taken.', 'Missed possibility'],
    ['They ____ comply with the new regulation.', 'Mereka harus mematuhi peraturan baru.', 'must', 'Use must for legal obligation.', 'Obligation'],
    ['If she had asked, I ____ have explained.', 'Jika dia bertanya, saya akan menjelaskan.', 'would', 'Use would have in third conditional.', 'Conditional'],
    ['You ____ have backed up the data.', 'Kamu seharusnya mencadangkan data itu.', 'should', 'Use should have for recommended past action.', 'Past advice'],
    ['The rumor ____ be true, but I doubt it.', 'Rumor itu mungkin benar, tapi saya meragukannya.', 'could', 'Use could for doubtful possibility.', 'Possibility'],
    ['Visitors ____ not take photos inside.', 'Pengunjung tidak boleh mengambil foto di dalam.', 'must', 'Use must not for strict prohibition.', 'Prohibition'],
    ['He ____ have misunderstood the instructions.', 'Dia mungkin salah memahami instruksi.', 'may', 'Use may have for possible past cause.', 'Past possibility'],
    ['I ____ appreciate your feedback.', 'Saya akan menghargai masukanmu.', 'would', 'Use would for polite statements.', 'Politeness'],
    ['The team ____ finish earlier than expected.', 'Tim mungkin selesai lebih awal dari perkiraan.', 'could', 'Use could for future possibility.', 'Possibility'],
    ['You ____ have checked the deadline first.', 'Kamu seharusnya memeriksa tenggat dulu.', 'should', 'Use should have for past advice.', 'Past advice'],
    ['All passengers ____ present a ticket.', 'Semua penumpang harus menunjukkan tiket.', 'must', 'Use must for requirements.', 'Requirement'],
    ['She ____ have received my email.', 'Dia mungkin sudah menerima email saya.', 'may', 'Use may have for uncertain past result.', 'Past possibility'],
    ['If we had left earlier, we ____ have arrived on time.', 'Jika kita berangkat lebih awal, kita akan tiba tepat waktu.', 'would', 'Use would have for unreal past result.', 'Conditional'],
    ['This decision ____ affect the whole team.', 'Keputusan ini mungkin memengaruhi seluruh tim.', 'could', 'Use could for possible effect.', 'Possibility'],
    ['You ____ not disclose confidential data.', 'Kamu tidak boleh membocorkan data rahasia.', 'must', 'Use must not for strict rules.', 'Prohibition'],
    ['He ____ have been promoted already.', 'Dia mungkin sudah dipromosikan.', 'may', 'Use may have for past possibility.', 'Past possibility'],
    ['I ____ have joined if I had known earlier.', 'Saya akan ikut jika saya tahu lebih awal.', 'would', 'Use would have in third conditional.', 'Conditional'],
  ].map(([sentence, translation, answer, rule, tone]) => modalItem(sentence as string, translation as string, answer as string, rule as string, tone as string, 'Hard')),
];

const conditionalOptionPool = [
  'rains', 'will stay', 'boils', 'freezes', 'study', 'will pass', 'had', 'would travel',
  'had known', 'would have helped', 'were', 'would buy', 'had left', 'would have arrived',
  'heat', 'melts', 'call', 'will answer', 'worked', 'would earn', 'had studied', 'would have passed',
];

function conditionalItem(sentence: string, translation: string, answer: string, type: string, rule: string, level: 'Easy' | 'Medium' | 'Hard') {
  return {
    word: sentence,
    prompt: sentence,
    translation,
    answer,
    options: shuffle([answer, ...conditionalOptionPool.filter((option) => option !== answer).slice(0, 3)]),
    type,
    rule,
    level,
    hint: type,
  };
}

const conditionalRunQuestions = [
  ...[
    ['If it ____, we will stay home.', 'Jika hujan, kami akan tinggal di rumah.', 'rains', 'First Conditional', 'If + present, will + V1'],
    ['If water reaches 100°C, it ____.', 'Jika air mencapai 100°C, air mendidih.', 'boils', 'Zero Conditional', 'If + present, present'],
    ['If you study, you ____ pass.', 'Jika kamu belajar, kamu akan lulus.', 'will', 'First Conditional', 'If + present, will + V1'],
    ['If ice gets warm, it ____.', 'Jika es menjadi hangat, es mencair.', 'melts', 'Zero Conditional', 'If + present, present'],
    ['If she calls, I ____ answer.', 'Jika dia menelepon, saya akan menjawab.', 'will', 'First Conditional', 'If + present, will + V1'],
    ['If you mix red and blue, you ____ purple.', 'Jika kamu mencampur merah dan biru, kamu mendapat ungu.', 'get', 'Zero Conditional', 'If + present, present'],
    ['If they arrive early, we ____ start.', 'Jika mereka tiba lebih awal, kita akan mulai.', 'will', 'First Conditional', 'If + present, will + V1'],
    ['If plants do not get water, they ____.', 'Jika tanaman tidak mendapat air, mereka mati.', 'die', 'Zero Conditional', 'If + present, present'],
    ['If I finish work, I ____ call you.', 'Jika saya selesai bekerja, saya akan meneleponmu.', 'will', 'First Conditional', 'If + present, will + V1'],
    ['If you press this button, the machine ____.', 'Jika kamu menekan tombol ini, mesin mulai.', 'starts', 'Zero Conditional', 'If + present, present'],
    ['If he practices, he ____ improve.', 'Jika dia berlatih, dia akan meningkat.', 'will', 'First Conditional', 'If + present, will + V1'],
    ['If you heat ice, it ____.', 'Jika kamu memanaskan es, es mencair.', 'melts', 'Zero Conditional', 'If + present, present'],
    ['If we miss the bus, we ____ take a taxi.', 'Jika kita ketinggalan bus, kita akan naik taksi.', 'will', 'First Conditional', 'If + present, will + V1'],
    ['If people eat too much, they ____ sick.', 'Jika orang makan terlalu banyak, mereka merasa sakit.', 'feel', 'Zero Conditional', 'If + present, present'],
    ['If I see Anna, I ____ tell her.', 'Jika saya melihat Anna, saya akan memberitahunya.', 'will', 'First Conditional', 'If + present, will + V1'],
    ['If metal gets hot, it ____.', 'Jika logam menjadi panas, logam memuai.', 'expands', 'Zero Conditional', 'If + present, present'],
    ['If it is sunny, we ____ go outside.', 'Jika cerah, kita akan keluar.', 'will', 'First Conditional', 'If + present, will + V1'],
    ['If you do not sleep, you ____ tired.', 'Jika kamu tidak tidur, kamu merasa lelah.', 'feel', 'Zero Conditional', 'If + present, present'],
    ['If she studies tonight, she ____ understand it.', 'Jika dia belajar malam ini, dia akan memahaminya.', 'will', 'First Conditional', 'If + present, will + V1'],
    ['If you drop glass, it ____.', 'Jika kamu menjatuhkan gelas, gelas pecah.', 'breaks', 'Zero Conditional', 'If + present, present'],
    ['If we save money, we ____ buy a laptop.', 'Jika kami menabung, kami akan membeli laptop.', 'will', 'First Conditional', 'If + present, will + V1'],
    ['If the light is red, cars ____.', 'Jika lampu merah, mobil berhenti.', 'stop', 'Zero Conditional', 'If + present, present'],
    ['If he invites me, I ____ come.', 'Jika dia mengundang saya, saya akan datang.', 'will', 'First Conditional', 'If + present, will + V1'],
    ['If you freeze water, it ____ ice.', 'Jika kamu membekukan air, air menjadi es.', 'becomes', 'Zero Conditional', 'If + present, present'],
    ['If they ask, we ____ explain.', 'Jika mereka bertanya, kami akan menjelaskan.', 'will', 'First Conditional', 'If + present, will + V1'],
    ['If babies are hungry, they ____.', 'Jika bayi lapar, mereka menangis.', 'cry', 'Zero Conditional', 'If + present, present'],
    ['If I have time, I ____ help you.', 'Jika saya punya waktu, saya akan membantumu.', 'will', 'First Conditional', 'If + present, will + V1'],
    ['If the phone rings, she ____ answers it.', 'Jika telepon berbunyi, dia menjawabnya.', 'usually', 'Zero Conditional', 'If + present, present habit'],
    ['If we hurry, we ____ catch the train.', 'Jika kita bergegas, kita akan mengejar kereta.', 'will', 'First Conditional', 'If + present, will + V1'],
    ['If you touch fire, it ____.', 'Jika kamu menyentuh api, itu terbakar/menyakitkan.', 'burns', 'Zero Conditional', 'If + present, present'],
  ].map(([sentence, translation, answer, type, rule]) => conditionalItem(sentence as string, translation as string, answer as string, type as string, rule as string, 'Easy')),
  ...[
    ['If I ____ rich, I would travel the world.', 'Jika saya kaya, saya akan keliling dunia.', 'were', 'Second Conditional', 'If + past, would + V1'],
    ['If she studied harder, she ____ pass.', 'Jika dia belajar lebih keras, dia akan lulus.', 'would', 'Second Conditional', 'If + past, would + V1'],
    ['If we had more time, we ____ finish it.', 'Jika kami punya lebih banyak waktu, kami akan menyelesaikannya.', 'would', 'Second Conditional', 'If + past, would + V1'],
    ['If he ____ a car, he would drive to work.', 'Jika dia punya mobil, dia akan menyetir ke kantor.', 'had', 'Second Conditional', 'If + past, would + V1'],
    ['If I knew the answer, I ____ tell you.', 'Jika saya tahu jawabannya, saya akan memberitahumu.', 'would', 'Second Conditional', 'If + past, would + V1'],
    ['If they lived closer, we ____ meet often.', 'Jika mereka tinggal lebih dekat, kami akan sering bertemu.', 'would', 'Second Conditional', 'If + past, would + V1'],
    ['If she ____ here, she would help us.', 'Jika dia ada di sini, dia akan membantu kami.', 'were', 'Second Conditional', 'If + past, would + V1'],
    ['If you practiced daily, you ____ improve faster.', 'Jika kamu berlatih setiap hari, kamu akan meningkat lebih cepat.', 'would', 'Second Conditional', 'If + past, would + V1'],
    ['If he worked less, he ____ happier.', 'Jika dia bekerja lebih sedikit, dia akan lebih bahagia.', 'would be', 'Second Conditional', 'If + past, would + V1'],
    ['If I had a ticket, I ____ watch the concert.', 'Jika saya punya tiket, saya akan menonton konser.', 'would', 'Second Conditional', 'If + past, would + V1'],
    ['If we ____ in London, we would visit museums.', 'Jika kami tinggal di London, kami akan mengunjungi museum.', 'lived', 'Second Conditional', 'If + past, would + V1'],
    ['If she were older, she ____ apply for the job.', 'Jika dia lebih tua, dia akan melamar pekerjaan itu.', 'would', 'Second Conditional', 'If + past, would + V1'],
    ['If I saw a snake, I ____ run.', 'Jika saya melihat ular, saya akan lari.', 'would', 'Second Conditional', 'If + past, would + V1'],
    ['If he ____ more polite, people would like him.', 'Jika dia lebih sopan, orang akan menyukainya.', 'were', 'Second Conditional', 'If + past, would + V1'],
    ['If you asked nicely, she ____ agree.', 'Jika kamu meminta dengan baik, dia akan setuju.', 'would', 'Second Conditional', 'If + past, would + V1'],
    ['If I could fly, I ____ visit every country.', 'Jika saya bisa terbang, saya akan mengunjungi setiap negara.', 'would', 'Second Conditional', 'If + past, would + V1'],
    ['If we owned a restaurant, we ____ serve pasta.', 'Jika kami memiliki restoran, kami akan menyajikan pasta.', 'would', 'Second Conditional', 'If + past, would + V1'],
    ['If he ____ the truth, he would apologize.', 'Jika dia tahu kebenarannya, dia akan meminta maaf.', 'knew', 'Second Conditional', 'If + past, would + V1'],
    ['If they had enough money, they ____ buy a house.', 'Jika mereka punya cukup uang, mereka akan membeli rumah.', 'would', 'Second Conditional', 'If + past, would + V1'],
    ['If I were you, I ____ accept the offer.', 'Jika saya jadi kamu, saya akan menerima tawaran itu.', 'would', 'Second Conditional', 'If + past, would + V1'],
    ['If she ____ better internet, she would join the call.', 'Jika dia punya internet lebih baik, dia akan ikut panggilan.', 'had', 'Second Conditional', 'If + past, would + V1'],
    ['If we knew his number, we ____ call him.', 'Jika kami tahu nomornya, kami akan meneleponnya.', 'would', 'Second Conditional', 'If + past, would + V1'],
    ['If he spoke English, he ____ work abroad.', 'Jika dia berbicara bahasa Inggris, dia akan bekerja di luar negeri.', 'could', 'Second Conditional', 'If + past, could/would + V1'],
    ['If it ____ cheaper, I would buy it.', 'Jika itu lebih murah, saya akan membelinya.', 'were', 'Second Conditional', 'If + past, would + V1'],
    ['If I had a camera, I ____ take photos.', 'Jika saya punya kamera, saya akan mengambil foto.', 'would', 'Second Conditional', 'If + past, would + V1'],
    ['If you listened carefully, you ____ understand.', 'Jika kamu mendengarkan dengan saksama, kamu akan mengerti.', 'would', 'Second Conditional', 'If + past, would + V1'],
    ['If they ____ ready, we would start now.', 'Jika mereka siap, kita akan mulai sekarang.', 'were', 'Second Conditional', 'If + past, would + V1'],
    ['If she had a map, she ____ get lost.', 'Jika dia punya peta, dia tidak akan tersesat.', 'would not', 'Second Conditional', 'If + past, would + V1'],
    ['If I worked from home, I ____ save time.', 'Jika saya bekerja dari rumah, saya akan menghemat waktu.', 'would', 'Second Conditional', 'If + past, would + V1'],
    ['If he were careful, he ____ make fewer mistakes.', 'Jika dia hati-hati, dia akan membuat lebih sedikit kesalahan.', 'would', 'Second Conditional', 'If + past, would + V1'],
  ].map(([sentence, translation, answer, type, rule]) => conditionalItem(sentence as string, translation as string, answer as string, type as string, rule as string, 'Medium')),
  ...[
    ['If I ____ known, I would have helped.', 'Jika saya tahu, saya akan membantu.', 'had', 'Third Conditional', 'If + had V3, would have V3'],
    ['If she had studied, she ____ have passed.', 'Jika dia belajar, dia akan lulus.', 'would', 'Third Conditional', 'If + had V3, would have V3'],
    ['If we had left earlier, we ____ have arrived on time.', 'Jika kami berangkat lebih awal, kami akan tiba tepat waktu.', 'would', 'Third Conditional', 'If + had V3, would have V3'],
    ['If he had called, I ____ have answered.', 'Jika dia menelepon, saya akan menjawab.', 'would', 'Third Conditional', 'If + had V3, would have V3'],
    ['If they ____ invited us, we would have come.', 'Jika mereka mengundang kami, kami akan datang.', 'had', 'Third Conditional', 'If + had V3, would have V3'],
    ['If I had seen you, I ____ have said hello.', 'Jika saya melihatmu, saya akan menyapa.', 'would', 'Third Conditional', 'If + had V3, would have V3'],
    ['If she had taken a taxi, she ____ not have been late.', 'Jika dia naik taksi, dia tidak akan terlambat.', 'would', 'Third Conditional', 'If + had V3, would have V3'],
    ['If we ____ prepared, we would have won.', 'Jika kami siap, kami akan menang.', 'had', 'Third Conditional', 'If + had V3, would have V3'],
    ['If he had listened, he ____ have understood.', 'Jika dia mendengarkan, dia akan mengerti.', 'would', 'Third Conditional', 'If + had V3, would have V3'],
    ['If you had asked me, I ____ have explained.', 'Jika kamu bertanya, saya akan menjelaskan.', 'would', 'Third Conditional', 'If + had V3, would have V3'],
    ['If I had saved money, I ____ have bought it.', 'Jika saya menabung, saya akan membelinya.', 'would', 'Third Conditional', 'If + had V3, would have V3'],
    ['If they had checked the map, they ____ not have got lost.', 'Jika mereka mengecek peta, mereka tidak akan tersesat.', 'would', 'Third Conditional', 'If + had V3, would have V3'],
    ['If she ____ slept earlier, she would have felt better.', 'Jika dia tidur lebih awal, dia akan merasa lebih baik.', 'had', 'Third Conditional', 'If + had V3, would have V3'],
    ['If he had practiced, he ____ have played better.', 'Jika dia berlatih, dia akan bermain lebih baik.', 'would', 'Third Conditional', 'If + had V3, would have V3'],
    ['If we had known the rule, we ____ have avoided the mistake.', 'Jika kami tahu aturannya, kami akan menghindari kesalahan.', 'would', 'Third Conditional', 'If + had V3, would have V3'],
    ['If I ____ been there, I would have helped.', 'Jika saya ada di sana, saya akan membantu.', 'had', 'Third Conditional', 'If + had V3, would have V3'],
    ['If she had read the email, she ____ have replied.', 'Jika dia membaca email itu, dia akan membalas.', 'would', 'Third Conditional', 'If + had V3, would have V3'],
    ['If they had arrived sooner, we ____ have started earlier.', 'Jika mereka tiba lebih cepat, kami akan mulai lebih awal.', 'would', 'Third Conditional', 'If + had V3, would have V3'],
    ['If you ____ told the truth, everything would have been easier.', 'Jika kamu mengatakan kebenaran, semuanya akan lebih mudah.', 'had', 'Third Conditional', 'If + had V3, would have V3'],
    ['If he had worn a coat, he ____ not have felt cold.', 'Jika dia memakai mantel, dia tidak akan merasa dingin.', 'would', 'Third Conditional', 'If + had V3, would have V3'],
    ['If I had taken notes, I ____ have remembered it.', 'Jika saya mencatat, saya akan mengingatnya.', 'would', 'Third Conditional', 'If + had V3, would have V3'],
    ['If she ____ been careful, she would not have broken it.', 'Jika dia hati-hati, dia tidak akan memecahkannya.', 'had', 'Third Conditional', 'If + had V3, would have V3'],
    ['If we had booked earlier, we ____ have got seats.', 'Jika kami memesan lebih awal, kami akan mendapat kursi.', 'would', 'Third Conditional', 'If + had V3, would have V3'],
    ['If they had trained harder, they ____ have won.', 'Jika mereka berlatih lebih keras, mereka akan menang.', 'would', 'Third Conditional', 'If + had V3, would have V3'],
    ['If he ____ followed the instructions, it would have worked.', 'Jika dia mengikuti instruksi, itu akan berhasil.', 'had', 'Third Conditional', 'If + had V3, would have V3'],
    ['If you had called earlier, I ____ have picked you up.', 'Jika kamu menelepon lebih awal, saya akan menjemputmu.', 'would', 'Third Conditional', 'If + had V3, would have V3'],
    ['If she had explained it, we ____ have understood.', 'Jika dia menjelaskannya, kami akan mengerti.', 'would', 'Third Conditional', 'If + had V3, would have V3'],
    ['If I ____ seen the sign, I would have stopped.', 'Jika saya melihat rambu itu, saya akan berhenti.', 'had', 'Third Conditional', 'If + had V3, would have V3'],
    ['If he had saved the file, he ____ not have lost the work.', 'Jika dia menyimpan file, dia tidak akan kehilangan pekerjaan.', 'would', 'Third Conditional', 'If + had V3, would have V3'],
    ['If we had planned better, the event ____ have succeeded.', 'Jika kami merencanakan lebih baik, acara itu akan berhasil.', 'would', 'Third Conditional', 'If + had V3, would have V3'],
  ].map(([sentence, translation, answer, type, rule]) => conditionalItem(sentence as string, translation as string, answer as string, type as string, rule as string, 'Hard')),
];

const questionBuilderOptionPool = ['Do', 'Does', 'Did', 'Am', 'Is', 'Are', 'Was', 'Were', 'What', 'Where', 'When', 'Why', 'How', 'Can', 'Could', 'Will', 'Would', 'Have', 'Has', 'Which', 'Whose'];

function questionBuilderItem(sentence: string, translation: string, answer: string, type: string, rule: string, level: 'Easy' | 'Medium' | 'Hard') {
  const distractors = shuffle(questionBuilderOptionPool.filter((option) => option !== answer)).slice(0, 3);
  return {
    word: sentence,
    prompt: sentence,
    translation,
    answer,
    options: shuffle([answer, ...distractors]),
    type,
    rule,
    level,
    hint: type,
  };
}

const questionBuilderQuestions = [
  ...[
    ['____ you like coffee?', 'Apakah kamu suka kopi?', 'Do', 'Yes / No Question', 'Do + subject + V1'],
    ['____ she speak English?', 'Apakah dia berbicara bahasa Inggris?', 'Does', 'Yes / No Question', 'Does + he/she/it + V1'],
    ['____ they go to school yesterday?', 'Apakah mereka pergi ke sekolah kemarin?', 'Did', 'Past Question', 'Did + subject + V1'],
    ['____ he your brother?', 'Apakah dia saudara laki-lakimu?', 'Is', 'Be Question', 'Is + singular subject'],
    ['____ they ready?', 'Apakah mereka siap?', 'Are', 'Be Question', 'Are + plural subject'],
    ['____ you at home last night?', 'Apakah kamu di rumah tadi malam?', 'Were', 'Past Be Question', 'Were + you/they/we'],
    ['____ she tired yesterday?', 'Apakah dia lelah kemarin?', 'Was', 'Past Be Question', 'Was + singular subject'],
    ['____ we need a ticket?', 'Apakah kita membutuhkan tiket?', 'Do', 'Yes / No Question', 'Do + we/you/they + V1'],
    ['____ it rain yesterday?', 'Apakah kemarin hujan?', 'Did', 'Past Question', 'Did + subject + V1'],
    ['____ your father work here?', 'Apakah ayahmu bekerja di sini?', 'Does', 'Yes / No Question', 'Does + singular subject + V1'],
    ['____ the movie interesting?', 'Apakah filmnya menarik?', 'Was', 'Past Be Question', 'Was + singular subject'],
    ['____ these books yours?', 'Apakah buku-buku ini milikmu?', 'Are', 'Be Question', 'Are + plural subject'],
    ['____ he play football?', 'Apakah dia bermain sepak bola?', 'Does', 'Yes / No Question', 'Does + he/she/it + V1'],
    ['____ you understand the lesson?', 'Apakah kamu memahami pelajaran itu?', 'Do', 'Yes / No Question', 'Do + subject + V1'],
    ['____ they visit you last week?', 'Apakah mereka mengunjungimu minggu lalu?', 'Did', 'Past Question', 'Did + subject + V1'],
    ['____ I late?', 'Apakah saya terlambat?', 'Am', 'Be Question', 'Am + I'],
    ['____ we friends?', 'Apakah kita teman?', 'Are', 'Be Question', 'Are + we/you/they'],
    ['____ she at school now?', 'Apakah dia di sekolah sekarang?', 'Is', 'Be Question', 'Is + singular subject'],
    ['____ your parents happy?', 'Apakah orang tuamu senang?', 'Are', 'Be Question', 'Are + plural subject'],
    ['____ he call you yesterday?', 'Apakah dia meneleponmu kemarin?', 'Did', 'Past Question', 'Did + subject + V1'],
    ['____ Anna like music?', 'Apakah Anna suka musik?', 'Does', 'Yes / No Question', 'Does + singular subject + V1'],
    ['____ the shop open?', 'Apakah tokonya buka?', 'Is', 'Be Question', 'Is + singular subject'],
    ['____ you have a pen?', 'Apakah kamu punya pulpen?', 'Do', 'Yes / No Question', 'Do + subject + V1'],
    ['____ they in the library?', 'Apakah mereka di perpustakaan?', 'Are', 'Be Question', 'Are + plural subject'],
    ['____ he busy today?', 'Apakah dia sibuk hari ini?', 'Is', 'Be Question', 'Is + singular subject'],
    ['____ we meet before?', 'Apakah kita pernah bertemu sebelumnya?', 'Did', 'Past Question', 'Did + subject + V1'],
    ['____ your sister study at night?', 'Apakah saudara perempuanmu belajar malam hari?', 'Does', 'Yes / No Question', 'Does + singular subject + V1'],
    ['____ the test easy?', 'Apakah tesnya mudah?', 'Was', 'Past Be Question', 'Was + singular subject'],
    ['____ you and Tom classmates?', 'Apakah kamu dan Tom teman sekelas?', 'Are', 'Be Question', 'Are + plural subject'],
    ['____ I need to wait?', 'Apakah saya perlu menunggu?', 'Do', 'Yes / No Question', 'Do + subject + V1'],
  ].map(([sentence, translation, answer, type, rule]) => questionBuilderItem(sentence as string, translation as string, answer as string, type as string, rule as string, 'Easy')),
  ...[
    ['____ do you live?', 'Di mana kamu tinggal?', 'Where', 'WH Question', 'Where asks about place'],
    ['____ is your name?', 'Siapa namamu?', 'What', 'WH Question', 'What asks about information'],
    ['____ did she leave?', 'Kapan dia pergi?', 'When', 'WH Question', 'When asks about time'],
    ['____ are you crying?', 'Mengapa kamu menangis?', 'Why', 'WH Question', 'Why asks about reason'],
    ['____ do you go to school?', 'Bagaimana kamu pergi ke sekolah?', 'How', 'WH Question', 'How asks about manner'],
    ['____ does he work?', 'Di mana dia bekerja?', 'Where', 'WH Question', 'Where asks about place'],
    ['____ did they buy?', 'Apa yang mereka beli?', 'What', 'WH Question', 'What asks about object'],
    ['____ will you arrive?', 'Kapan kamu akan tiba?', 'When', 'WH Question', 'When asks about time'],
    ['____ is she absent?', 'Mengapa dia absen?', 'Why', 'WH Question', 'Why asks about reason'],
    ['____ can I improve my English?', 'Bagaimana saya bisa meningkatkan bahasa Inggris saya?', 'How', 'WH Question', 'How asks about method'],
    ['____ are your books?', 'Di mana buku-bukumu?', 'Where', 'WH Question', 'Where asks about place'],
    ['____ did he say?', 'Apa yang dia katakan?', 'What', 'WH Question', 'What asks about information'],
    ['____ does the class start?', 'Kapan kelas dimulai?', 'When', 'WH Question', 'When asks about time'],
    ['____ do they need help?', 'Mengapa mereka membutuhkan bantuan?', 'Why', 'WH Question', 'Why asks about reason'],
    ['____ are you today?', 'Bagaimana kabarmu hari ini?', 'How', 'WH Question', 'How asks about condition'],
    ['____ is the nearest station?', 'Di mana stasiun terdekat?', 'Where', 'WH Question', 'Where asks about place'],
    ['____ did you choose this course?', 'Mengapa kamu memilih kursus ini?', 'Why', 'WH Question', 'Why asks about reason'],
    ['____ will she bring?', 'Apa yang akan dia bawa?', 'What', 'WH Question', 'What asks about object'],
    ['____ did the meeting end?', 'Kapan rapat berakhir?', 'When', 'WH Question', 'When asks about time'],
    ['____ can we solve this problem?', 'Bagaimana kita bisa menyelesaikan masalah ini?', 'How', 'WH Question', 'How asks about method'],
    ['____ is calling me?', 'Siapa yang menelepon saya?', 'Who', 'Subject Question', 'Who asks about a person'],
    ['____ do you prefer?', 'Yang mana yang kamu pilih?', 'Which', 'Choice Question', 'Which asks about choice'],
    ['____ bag is this?', 'Tas siapa ini?', 'Whose', 'Possession Question', 'Whose asks about owner'],
    ['____ are they waiting?', 'Di mana mereka menunggu?', 'Where', 'WH Question', 'Where asks about place'],
    ['____ did you learn yesterday?', 'Apa yang kamu pelajari kemarin?', 'What', 'WH Question', 'What asks about object'],
    ['____ should we start?', 'Kapan kita sebaiknya mulai?', 'When', 'WH Question', 'When asks about time'],
    ['____ is the internet slow?', 'Mengapa internetnya lambat?', 'Why', 'WH Question', 'Why asks about reason'],
    ['____ do you spell your name?', 'Bagaimana kamu mengeja namamu?', 'How', 'WH Question', 'How asks about method'],
    ['____ option is better?', 'Pilihan mana yang lebih baik?', 'Which', 'Choice Question', 'Which asks about choice'],
    ['____ phone is ringing?', 'Telepon siapa yang berdering?', 'Whose', 'Possession Question', 'Whose asks about owner'],
  ].map(([sentence, translation, answer, type, rule]) => questionBuilderItem(sentence as string, translation as string, answer as string, type as string, rule as string, 'Medium')),
  ...[
    ['____ you tell me where she lives?', 'Bisakah kamu memberi tahu saya di mana dia tinggal?', 'Could', 'Polite Question', 'Could you + V1'],
    ['____ you know what time it is?', 'Apakah kamu tahu jam berapa sekarang?', 'Do', 'Indirect Question', 'Do you know + statement order'],
    ['____ he finished the report?', 'Apakah dia sudah menyelesaikan laporan?', 'Has', 'Present Perfect Question', 'Has + singular subject + V3'],
    ['____ they been to Bali?', 'Apakah mereka pernah ke Bali?', 'Have', 'Present Perfect Question', 'Have + plural subject + V3'],
    ['____ she be joining us tomorrow?', 'Apakah dia akan bergabung dengan kita besok?', 'Will', 'Future Continuous Question', 'Will + subject + be + V-ing'],
    ['____ I ask you a question?', 'Bolehkah saya bertanya?', 'Can', 'Permission Question', 'Can I + V1'],
    ['____ you mind closing the door?', 'Apakah kamu keberatan menutup pintu?', 'Would', 'Polite Request', 'Would you mind + V-ing'],
    ['____ long have you worked here?', 'Sudah berapa lama kamu bekerja di sini?', 'How', 'Duration Question', 'How long + present perfect'],
    ['____ of these answers is correct?', 'Manakah dari jawaban ini yang benar?', 'Which', 'Choice Question', 'Which of + noun'],
    ['____ book is on the table?', 'Buku siapa yang ada di atas meja?', 'Whose', 'Possession Question', 'Whose + noun'],
    ['____ she have called earlier?', 'Seharusnya dia menelepon lebih awal?', 'Should', 'Modal Perfect Question', 'Should have + V3'],
    ['____ they able to finish it today?', 'Apakah mereka mampu menyelesaikannya hari ini?', 'Are', 'Ability Question', 'Be able to'],
    ['____ you have told me sooner?', 'Bisakah kamu memberitahu saya lebih cepat?', 'Could', 'Modal Perfect Question', 'Could have + V3'],
    ['____ the files been uploaded?', 'Apakah file-file itu sudah diunggah?', 'Have', 'Passive Perfect Question', 'Have + plural subject + been + V3'],
    ['____ the package been delivered?', 'Apakah paketnya sudah dikirim?', 'Has', 'Passive Perfect Question', 'Has + singular subject + been + V3'],
    ['____ you explain why this happened?', 'Bisakah kamu menjelaskan mengapa ini terjadi?', 'Can', 'Information Request', 'Can you + V1'],
    ['____ the meeting have started without us?', 'Mungkinkah rapat sudah dimulai tanpa kita?', 'Could', 'Possibility Question', 'Could have + V3'],
    ['____ you rather study online or offline?', 'Apakah kamu lebih suka belajar online atau offline?', 'Would', 'Preference Question', 'Would rather + V1'],
    ['____ they have arrived by now?', 'Apakah mereka mungkin sudah tiba sekarang?', 'Could', 'Possibility Question', 'Could have + V3'],
    ['____ I supposed to submit this today?', 'Apakah saya seharusnya mengumpulkan ini hari ini?', 'Am', 'Expectation Question', 'Be supposed to'],
    ['____ you finished your homework yet?', 'Apakah kamu sudah menyelesaikan PR-mu?', 'Have', 'Present Perfect Question', 'Have + subject + V3'],
    ['____ he going to attend the workshop?', 'Apakah dia akan menghadiri workshop?', 'Is', 'Future Plan Question', 'Be going to + V1'],
    ['____ we allowed to use dictionaries?', 'Apakah kita diizinkan menggunakan kamus?', 'Are', 'Permission Question', 'Be allowed to'],
    ['____ she have forgotten the schedule?', 'Mungkinkah dia lupa jadwalnya?', 'Could', 'Possibility Question', 'Could have + V3'],
    ['____ you mind if I joined?', 'Apakah kamu keberatan jika saya bergabung?', 'Would', 'Polite Permission', 'Would you mind if + past'],
    ['____ has been using my account?', 'Siapa yang telah menggunakan akun saya?', 'Who', 'Subject Perfect Continuous', 'Who + has been + V-ing'],
    ['____ should we contact for support?', 'Siapa yang harus kami hubungi untuk dukungan?', 'Who', 'Object Question', 'Who + auxiliary + subject + V1'],
    ['____ the presentation be recorded?', 'Apakah presentasinya akan direkam?', 'Will', 'Passive Future Question', 'Will + subject + be + V3'],
    ['____ you have checked the details first?', 'Seharusnya kamu memeriksa detailnya terlebih dahulu?', 'Should', 'Modal Perfect Question', 'Should have + V3'],
    ['____ this issue be fixed before Friday?', 'Bisakah masalah ini diperbaiki sebelum Jumat?', 'Can', 'Passive Modal Question', 'Can + subject + be + V3'],
  ].map(([sentence, translation, answer, type, rule]) => questionBuilderItem(sentence as string, translation as string, answer as string, type as string, rule as string, 'Hard')),
];

function errorFixItem(wrong: string, correct: string, translation: string, type: string, rule: string, level: 'Easy' | 'Medium' | 'Hard') {
  const fallbackDistractors = [
    wrong,
    correct.replace(/[.?]$/, ''),
    correct.endsWith('?') ? correct.replace('?', '.') : `${correct}?`,
    correct.replace(/\b(is|are|am|was|were|do|does|did|has|have)\b/i, (match) => match.toLowerCase() === 'is' ? 'are' : 'is'),
  ];
  const options = shuffle([correct, ...fallbackDistractors.filter((option) => option !== correct)]).filter((option, index, list) => list.indexOf(option) === index).slice(0, 4);
  return {
    word: wrong,
    prompt: wrong,
    translation,
    answer: correct,
    options,
    type,
    rule,
    level,
    hint: type,
  };
}

const errorFixQuestions = [
  ...[
    ['She like apples.', 'She likes apples.', 'Dia suka apel.', 'Subject Verb Agreement', 'He/She/It + verb-s'],
    ['He go to school every day.', 'He goes to school every day.', 'Dia pergi ke sekolah setiap hari.', 'Subject Verb Agreement', 'He/She/It + verb-s/es'],
    ['They is happy.', 'They are happy.', 'Mereka senang.', 'Be Verb', 'They/we/you use are'],
    ['I are a student.', 'I am a student.', 'Saya seorang siswa.', 'Be Verb', 'I use am'],
    ['We was late.', 'We were late.', 'Kami terlambat.', 'Past Be Verb', 'We/you/they use were'],
    ['She have a book.', 'She has a book.', 'Dia punya buku.', 'Have / Has', 'He/She/It use has'],
    ['They has many friends.', 'They have many friends.', 'Mereka punya banyak teman.', 'Have / Has', 'They/we/you use have'],
    ['He do not like tea.', 'He does not like tea.', 'Dia tidak suka teh.', 'Negative Present', 'He/She/It use does not'],
    ['She are reading now.', 'She is reading now.', 'Dia sedang membaca sekarang.', 'Present Continuous', 'Singular subject uses is'],
    ['We is playing football.', 'We are playing football.', 'Kami sedang bermain sepak bola.', 'Present Continuous', 'We/you/they use are'],
    ['I has a pen.', 'I have a pen.', 'Saya punya pulpen.', 'Have / Has', 'I/you/we/they use have'],
    ['The cat sleep on the sofa.', 'The cat sleeps on the sofa.', 'Kucing itu tidur di sofa.', 'Subject Verb Agreement', 'Singular subject + verb-s'],
    ['My parents is at home.', 'My parents are at home.', 'Orang tua saya di rumah.', 'Be Verb', 'Plural subject uses are'],
    ['He play guitar.', 'He plays guitar.', 'Dia bermain gitar.', 'Subject Verb Agreement', 'He/She/It + verb-s'],
    ['She do homework every night.', 'She does homework every night.', 'Dia mengerjakan PR setiap malam.', 'Subject Verb Agreement', 'He/She/It + does'],
    ['You was tired.', 'You were tired.', 'Kamu lelah.', 'Past Be Verb', 'You uses were'],
    ['It are cold today.', 'It is cold today.', 'Hari ini dingin.', 'Be Verb', 'It uses is'],
    ['The books is new.', 'The books are new.', 'Buku-buku itu baru.', 'Be Verb', 'Plural subject uses are'],
    ['I am go home.', 'I am going home.', 'Saya sedang pulang.', 'Present Continuous', 'Be + V-ing'],
    ['They are study English.', 'They are studying English.', 'Mereka sedang belajar bahasa Inggris.', 'Present Continuous', 'Be + V-ing'],
    ['He does not likes coffee.', 'He does not like coffee.', 'Dia tidak suka kopi.', 'Negative Present', 'After does not use V1'],
    ['She can sings well.', 'She can sing well.', 'Dia bisa bernyanyi dengan baik.', 'Modal Verb', 'Modal + V1'],
    ['We must goes now.', 'We must go now.', 'Kami harus pergi sekarang.', 'Modal Verb', 'Modal + V1'],
    ['I likes this movie.', 'I like this movie.', 'Saya suka film ini.', 'Subject Verb Agreement', 'I/you/we/they use V1'],
    ['They goes to the park.', 'They go to the park.', 'Mereka pergi ke taman.', 'Subject Verb Agreement', 'Plural subject uses V1'],
    ['He is cook dinner.', 'He is cooking dinner.', 'Dia sedang memasak makan malam.', 'Present Continuous', 'Be + V-ing'],
    ['We have a meeting yesterday.', 'We had a meeting yesterday.', 'Kami punya rapat kemarin.', 'Simple Past', 'Use V2 for past time'],
    ['She eat breakfast this morning.', 'She ate breakfast this morning.', 'Dia sarapan pagi ini.', 'Simple Past', 'Use V2 for past time'],
    ['Did you went there?', 'Did you go there?', 'Apakah kamu pergi ke sana?', 'Past Question', 'Did + subject + V1'],
    ['Does he likes music?', 'Does he like music?', 'Apakah dia suka musik?', 'Present Question', 'Does + subject + V1'],
  ].map(([wrong, correct, translation, type, rule]) => errorFixItem(wrong as string, correct as string, translation as string, type as string, rule as string, 'Easy')),
  ...[
    ['I am studying English yesterday.', 'I studied English yesterday.', 'Saya belajar bahasa Inggris kemarin.', 'Tense Choice', 'Past time uses simple past'],
    ['She has went to Bali.', 'She has gone to Bali.', 'Dia sudah pergi ke Bali.', 'Present Perfect', 'Have/has + V3'],
    ['They have ate lunch.', 'They have eaten lunch.', 'Mereka sudah makan siang.', 'Present Perfect', 'Have/has + V3'],
    ['We was watching TV when he called.', 'We were watching TV when he called.', 'Kami sedang menonton TV ketika dia menelepon.', 'Past Continuous', 'We/you/they use were'],
    ['He were sleeping at 9 PM.', 'He was sleeping at 9 PM.', 'Dia sedang tidur pukul 9 malam.', 'Past Continuous', 'He/she/it uses was'],
    ['I will to call you tomorrow.', 'I will call you tomorrow.', 'Saya akan meneleponmu besok.', 'Future Tense', 'Will + V1'],
    ['She is going buy a bag.', 'She is going to buy a bag.', 'Dia akan membeli tas.', 'Future Plan', 'Be going to + V1'],
    ['They did not went home.', 'They did not go home.', 'Mereka tidak pulang.', 'Negative Past', 'Did not + V1'],
    ['He has lived here since five years.', 'He has lived here for five years.', 'Dia sudah tinggal di sini selama lima tahun.', 'For / Since', 'Use for + duration'],
    ['I have known her for 2020.', 'I have known her since 2020.', 'Saya sudah mengenalnya sejak 2020.', 'For / Since', 'Use since + starting point'],
    ['She is more tall than me.', 'She is taller than me.', 'Dia lebih tinggi dari saya.', 'Comparative', 'Short adjectives use -er'],
    ['This book is more cheap.', 'This book is cheaper.', 'Buku ini lebih murah.', 'Comparative', 'Short adjectives use -er'],
    ['He is the most tall student.', 'He is the tallest student.', 'Dia siswa paling tinggi.', 'Superlative', 'Short adjectives use -est'],
    ['I have never saw that movie.', 'I have never seen that movie.', 'Saya belum pernah melihat film itu.', 'Present Perfect', 'Have/has + V3'],
    ['She should studies harder.', 'She should study harder.', 'Dia sebaiknya belajar lebih giat.', 'Modal Verb', 'Modal + V1'],
    ['We need discuss the plan.', 'We need to discuss the plan.', 'Kami perlu membahas rencana itu.', 'Verb Pattern', 'Need + to + V1'],
    ['He enjoys to read novels.', 'He enjoys reading novels.', 'Dia menikmati membaca novel.', 'Gerund', 'Enjoy + V-ing'],
    ['I want learning English.', 'I want to learn English.', 'Saya ingin belajar bahasa Inggris.', 'Infinitive', 'Want + to + V1'],
    ['She is good in English.', 'She is good at English.', 'Dia bagus dalam bahasa Inggris.', 'Preposition', 'Good at a skill'],
    ['We arrived to the airport.', 'We arrived at the airport.', 'Kami tiba di bandara.', 'Preposition', 'Arrive at a place'],
    ['He depends of his parents.', 'He depends on his parents.', 'Dia bergantung pada orang tuanya.', 'Preposition', 'Depend on'],
    ['I am interested on music.', 'I am interested in music.', 'Saya tertarik pada musik.', 'Preposition', 'Interested in'],
    ['She married with a teacher.', 'She married a teacher.', 'Dia menikah dengan seorang guru.', 'Verb Pattern', 'Marry someone'],
    ['There is many people here.', 'There are many people here.', 'Ada banyak orang di sini.', 'There Is / Are', 'Plural noun uses there are'],
    ['There are a problem.', 'There is a problem.', 'Ada sebuah masalah.', 'There Is / Are', 'Singular noun uses there is'],
    ['I have too much books.', 'I have too many books.', 'Saya punya terlalu banyak buku.', 'Much / Many', 'Many for countable plural nouns'],
    ['She has many money.', 'She has much money.', 'Dia punya banyak uang.', 'Much / Many', 'Much for uncountable nouns'],
    ['He speaks English good.', 'He speaks English well.', 'Dia berbicara bahasa Inggris dengan baik.', 'Adverb', 'Use well for how someone does an action'],
    ['The test was very hardly.', 'The test was very hard.', 'Tes itu sangat sulit.', 'Adjective', 'Use hard as adjective'],
    ['Can you explain me the rule?', 'Can you explain the rule to me?', 'Bisakah kamu menjelaskan aturan itu kepada saya?', 'Verb Pattern', 'Explain something to someone'],
  ].map(([wrong, correct, translation, type, rule]) => errorFixItem(wrong as string, correct as string, translation as string, type as string, rule as string, 'Medium')),
  ...[
    ['If I will have time, I will call you.', 'If I have time, I will call you.', 'Jika saya punya waktu, saya akan meneleponmu.', 'First Conditional', 'If + present, will + V1'],
    ['If I was you, I would apologize.', 'If I were you, I would apologize.', 'Jika saya jadi kamu, saya akan minta maaf.', 'Second Conditional', 'Use were in hypothetical condition'],
    ['If she studied, she will pass.', 'If she studies, she will pass.', 'Jika dia belajar, dia akan lulus.', 'First Conditional', 'If + present, will + V1'],
    ['If he would study, he would pass.', 'If he studied, he would pass.', 'Jika dia belajar, dia akan lulus.', 'Second Conditional', 'If + past, would + V1'],
    ['I wish I know the answer.', 'I wish I knew the answer.', 'Saya berharap saya tahu jawabannya.', 'Wish', 'Wish + past for present unreal'],
    ['I wish I have studied harder.', 'I wish I had studied harder.', 'Saya berharap saya belajar lebih giat.', 'Wish Past', 'Wish + had + V3 for past regret'],
    ['The report was wrote yesterday.', 'The report was written yesterday.', 'Laporan itu ditulis kemarin.', 'Passive Voice', 'Be + V3'],
    ['The email has sent.', 'The email has been sent.', 'Email itu sudah dikirim.', 'Passive Perfect', 'Has/have been + V3'],
    ['English is speak in many countries.', 'English is spoken in many countries.', 'Bahasa Inggris digunakan di banyak negara.', 'Passive Voice', 'Be + V3'],
    ['The meeting will held tomorrow.', 'The meeting will be held tomorrow.', 'Rapat akan diadakan besok.', 'Passive Future', 'Will be + V3'],
    ['She asked me where did I live.', 'She asked me where I lived.', 'Dia bertanya di mana saya tinggal.', 'Indirect Question', 'Use statement order after question word'],
    ['Do you know where does he work?', 'Do you know where he works?', 'Apakah kamu tahu di mana dia bekerja?', 'Indirect Question', 'Use statement order'],
    ['I do not know what is the answer.', 'I do not know what the answer is.', 'Saya tidak tahu apa jawabannya.', 'Indirect Question', 'Use statement order'],
    ['He told that he was tired.', 'He said that he was tired.', 'Dia berkata bahwa dia lelah.', 'Reporting Verb', 'Say that / tell someone'],
    ['She told me that she is busy yesterday.', 'She told me that she was busy yesterday.', 'Dia memberi tahu saya bahwa dia sibuk kemarin.', 'Reported Speech', 'Backshift tense when reporting past speech'],
    ['The man which called you is here.', 'The man who called you is here.', 'Pria yang meneleponmu ada di sini.', 'Relative Clause', 'Use who for people'],
    ['The book who I bought is useful.', 'The book that I bought is useful.', 'Buku yang saya beli berguna.', 'Relative Clause', 'Use that/which for things'],
    ['This is the place which I was born.', 'This is the place where I was born.', 'Ini tempat saya lahir.', 'Relative Clause', 'Use where for places'],
    ['Despite it was raining, we went out.', 'Although it was raining, we went out.', 'Meskipun hujan, kami keluar.', 'Connector', 'Although + clause'],
    ['Although the rain, we went out.', 'Despite the rain, we went out.', 'Meskipun hujan, kami keluar.', 'Connector', 'Despite + noun'],
    ['Neither John or Mary came.', 'Neither John nor Mary came.', 'Baik John maupun Mary tidak datang.', 'Correlative Conjunction', 'Neither ... nor'],
    ['Either you nor I must go.', 'Either you or I must go.', 'Entah kamu atau saya harus pergi.', 'Correlative Conjunction', 'Either ... or'],
    ['Not only he is smart but also kind.', 'Not only is he smart but also kind.', 'Dia bukan hanya pintar tetapi juga baik.', 'Inversion', 'Not only + auxiliary + subject'],
    ['Hardly I had arrived when it rained.', 'Hardly had I arrived when it rained.', 'Baru saja saya tiba ketika hujan.', 'Inversion', 'Hardly + auxiliary + subject'],
    ['No sooner I arrived than he left.', 'No sooner had I arrived than he left.', 'Segera setelah saya tiba, dia pergi.', 'Inversion', 'No sooner had + subject + V3'],
    ['The more you practice, more confident you become.', 'The more you practice, the more confident you become.', 'Semakin sering kamu berlatih, semakin percaya diri kamu.', 'Parallel Structure', 'The more..., the more...'],
    ['I look forward to meet you.', 'I look forward to meeting you.', 'Saya menantikan bertemu denganmu.', 'Gerund', 'Look forward to + V-ing'],
    ['She suggested me to apply.', 'She suggested that I apply.', 'Dia menyarankan agar saya melamar.', 'Subjunctive', 'Suggest that + subject + V1'],
    ['It is important that he is on time.', 'It is important that he be on time.', 'Penting agar dia tepat waktu.', 'Subjunctive', 'Important that + subject + V1'],
    ['Having finished the report, the computer was shut down.', 'Having finished the report, I shut down the computer.', 'Setelah menyelesaikan laporan, saya mematikan komputer.', 'Dangling Modifier', 'Intro phrase must match the subject'],
  ].map(([wrong, correct, translation, type, rule]) => errorFixItem(wrong as string, correct as string, translation as string, type as string, rule as string, 'Hard')),
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
  if (modeId === 'tense-master') return 'Tense Master';
  if (modeId === 'verb-forms') return 'Verb Forms';
  if (modeId === 'article-dash') return 'Article Dash';
  if (modeId === 'preposition-path') return 'Preposition Path';
  if (modeId === 'modal-quest') return 'Modal Quest';
  if (modeId === 'conditional-run') return 'Conditional Run';
  if (modeId === 'question-builder') return 'Question Builder';
  if (modeId === 'error-fix') return 'Error Fix';
  if (modeId === 'clause-connect') return 'Clause Connect';
  if (modeId === 'grammar-mix') return 'Grammar Mix';
  if (modeId === 'memory-card') return 'Memory Card';
  if (modeId === 'find-words') return 'Find the Words';
  if (modeId === 'speed-quiz') return 'Speed Quiz';
  if (modeId === 'listen-tap') return 'Listen & Tap';
  if (modeId === 'letter-quest') return 'Letter Quest';
  if (modeId === 'crossword' || modeId === 'typing-sprint') return 'Typing Sprint';
  if (modeId === 'clan-battle') return 'Boss Challenge';
  return 'Word Match';
}

function localizedModeTitle(modeId: string | undefined, pack: ReturnType<typeof getGamePack>) {
  if (pack && modeId && pack.modeCopy[modeId]) return pack.modeCopy[modeId].title;
  return modeTitle(modeId);
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

function readTenseMasterLevel(): LetterQuestLevel {
  try {
    const saved = localStorage.getItem('fluently_tense_master_level') as LetterQuestLevel | null;
    return saved === 'medium' || saved === 'hard' ? saved : 'easy';
  } catch {
    return 'easy';
  }
}

function nextTenseMasterLevel(level: LetterQuestLevel): LetterQuestLevel | null {
  if (level === 'easy') return 'medium';
  if (level === 'medium') return 'hard';
  return null;
}

function readVerbFormsLevel(): LetterQuestLevel {
  try {
    const saved = localStorage.getItem('fluently_verb_forms_level') as LetterQuestLevel | null;
    return saved === 'medium' || saved === 'hard' ? saved : 'easy';
  } catch {
    return 'easy';
  }
}

function nextVerbFormsLevel(level: LetterQuestLevel): LetterQuestLevel | null {
  if (level === 'easy') return 'medium';
  if (level === 'medium') return 'hard';
  return null;
}

function readArticleDashLevel(): LetterQuestLevel {
  try {
    const saved = localStorage.getItem('fluently_article_dash_level') as LetterQuestLevel | null;
    return saved === 'medium' || saved === 'hard' ? saved : 'easy';
  } catch {
    return 'easy';
  }
}

function nextArticleDashLevel(level: LetterQuestLevel): LetterQuestLevel | null {
  if (level === 'easy') return 'medium';
  if (level === 'medium') return 'hard';
  return null;
}

function readModalQuestLevel(): LetterQuestLevel {
  try {
    const saved = localStorage.getItem('fluently_modal_quest_level') as LetterQuestLevel | null;
    return saved === 'medium' || saved === 'hard' ? saved : 'easy';
  } catch {
    return 'easy';
  }
}

function nextModalQuestLevel(level: LetterQuestLevel): LetterQuestLevel | null {
  if (level === 'easy') return 'medium';
  if (level === 'medium') return 'hard';
  return null;
}

function readConditionalRunLevel(): LetterQuestLevel {
  try {
    const saved = localStorage.getItem('fluently_conditional_run_level') as LetterQuestLevel | null;
    return saved === 'medium' || saved === 'hard' ? saved : 'easy';
  } catch {
    return 'easy';
  }
}

function nextConditionalRunLevel(level: LetterQuestLevel): LetterQuestLevel | null {
  if (level === 'easy') return 'medium';
  if (level === 'medium') return 'hard';
  return null;
}

function readQuestionBuilderLevel(): LetterQuestLevel {
  try {
    const saved = localStorage.getItem('fluently_question_builder_level') as LetterQuestLevel | null;
    return saved === 'medium' || saved === 'hard' ? saved : 'easy';
  } catch {
    return 'easy';
  }
}

function nextQuestionBuilderLevel(level: LetterQuestLevel): LetterQuestLevel | null {
  if (level === 'easy') return 'medium';
  if (level === 'medium') return 'hard';
  return null;
}

function readErrorFixLevel(): LetterQuestLevel {
  try {
    const saved = localStorage.getItem('fluently_error_fix_level') as LetterQuestLevel | null;
    return saved === 'medium' || saved === 'hard' ? saved : 'easy';
  } catch {
    return 'easy';
  }
}

function nextErrorFixLevel(level: LetterQuestLevel): LetterQuestLevel | null {
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

function readSpeedQuizLevel(): LetterQuestLevel {
  try {
    const saved = localStorage.getItem('fluently_speed_quiz_level') as LetterQuestLevel | null;
    return saved === 'medium' || saved === 'hard' ? saved : 'easy';
  } catch {
    return 'easy';
  }
}

function nextSpeedQuizLevel(level: LetterQuestLevel): LetterQuestLevel | null {
  if (level === 'easy') return 'medium';
  if (level === 'medium') return 'hard';
  return null;
}

function speedQuizDuration(level: LetterQuestLevel) {
  if (level === 'hard') return 150;
  if (level === 'medium') return 120;
  return 90;
}

function readTypingSprintLevel(): LetterQuestLevel {
  try {
    const saved = localStorage.getItem('fluently_typing_sprint_level') as LetterQuestLevel | null;
    return saved === 'medium' || saved === 'hard' ? saved : 'easy';
  } catch {
    return 'easy';
  }
}

function nextTypingSprintLevel(level: LetterQuestLevel): LetterQuestLevel | null {
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

  const hasArabic = words.some((word) => /[\u0600-\u06FF]/.test(word));
  const hasCjk = words.some((word) => /[\u3040-\u30FF\u4E00-\u9FFF]/.test(word));
  const alphabet = hasArabic
    ? 'ابتثجحخدذرزسشصضطظعغفقكلمنهوي'
    : hasCjk
      ? [...new Set([...words.join(''), ...'的一是不了人我在有他这中大来上国个到说们为子和你地出道也时年日本学生先'])].join('')
      : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return grid.map((row, rowIndex) =>
    row.map((cell, colIndex) => cell || alphabet[(rowIndex * 7 + colIndex * 11 + words.join('').length) % alphabet.length])
  );
}

export default function GamePlayPage() {
  const navigate = useNavigate();
  const { user, awardXp } = useAuth();
  const { categoryId = 'vocabulary', modeId = 'word-match' } = useParams<{ categoryId: string; modeId: string }>();
  const [searchParams] = useSearchParams();
  const gamePack = getGamePack(user?.persona?.targetLanguage);
  const isArabicGame = gamePack?.language === 'Arabic';
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
  const [currentTenseLevel, setCurrentTenseLevel] = useState<LetterQuestLevel>(() => readTenseMasterLevel());
  const [currentVerbFormsLevel, setCurrentVerbFormsLevel] = useState<LetterQuestLevel>(() => readVerbFormsLevel());
  const [currentArticleDashLevel, setCurrentArticleDashLevel] = useState<LetterQuestLevel>(() => readArticleDashLevel());
  const [currentModalQuestLevel, setCurrentModalQuestLevel] = useState<LetterQuestLevel>(() => readModalQuestLevel());
  const [currentConditionalRunLevel, setCurrentConditionalRunLevel] = useState<LetterQuestLevel>(() => readConditionalRunLevel());
  const [currentQuestionBuilderLevel, setCurrentQuestionBuilderLevel] = useState<LetterQuestLevel>(() => readQuestionBuilderLevel());
  const [currentErrorFixLevel, setCurrentErrorFixLevel] = useState<LetterQuestLevel>(() => readErrorFixLevel());
  const [currentListenLevel, setCurrentListenLevel] = useState<LetterQuestLevel>(() => readListenTapLevel());
  const [currentSpeedLevel, setCurrentSpeedLevel] = useState<LetterQuestLevel>(() => readSpeedQuizLevel());
  const [currentTypingLevel, setCurrentTypingLevel] = useState<LetterQuestLevel>(() => readTypingSprintLevel());
  const [currentMemoryLevel, setCurrentMemoryLevel] = useState<LetterQuestLevel>(() => readMemoryCardLevel());
  const [memoryBoard, setMemoryBoard] = useState(0);
  const [memoryBoardComplete, setMemoryBoardComplete] = useState(false);
  const [currentFindWordsLevel, setCurrentFindWordsLevel] = useState<LetterQuestLevel>(() => readFindWordsLevel());
  const [findWordsBoard, setFindWordsBoard] = useState(0);
  const [findWordsAnswers, setFindWordsAnswers] = useState<Record<number, string>>({});
  const [activeFindWordsIndex, setActiveFindWordsIndex] = useState(0);
  const [findWordsCells, setFindWordsCells] = useState<Record<number, string[]>>({});
  const [findWordsChecked, setFindWordsChecked] = useState(false);

  const isFindWords = modeId === 'find-words';
  const isTenseMaster = modeId === 'tense-master';
  const isVerbForms = modeId === 'verb-forms';
  const isArticleDash = modeId === 'article-dash';
  const isModalQuest = modeId === 'modal-quest';
  const isConditionalRun = modeId === 'conditional-run';
  const isQuestionBuilder = modeId === 'question-builder';
  const isErrorFix = modeId === 'error-fix';
  const isSentenceBuilder = modeId === 'sentence-builder' || (categoryId === 'grammar' && modeId !== 'tense-master' && modeId !== 'verb-forms' && modeId !== 'article-dash' && modeId !== 'modal-quest' && modeId !== 'conditional-run' && modeId !== 'question-builder' && modeId !== 'error-fix' && modeId !== 'speed-quiz' && modeId !== 'memory-card');
  const isMemoryCard = modeId === 'memory-card';
  const isLetterQuest = modeId === 'letter-quest';
  const isVisualWordMatch = modeId === 'word-match' && categoryId === 'vocabulary';
  const isSpeedQuiz = modeId === 'speed-quiz' || modeId === 'clan-battle';
  const isListenTap = modeId === 'listen-tap' || categoryId === 'listening';
  const isTyping = modeId === 'crossword' || modeId === 'typing-sprint';
  const title = localizedModeTitle(modeId, gamePack);
  const activeWordBank = gamePack?.banks.wordBank ?? wordBank;
  const activeListenTapQuestions = gamePack?.banks.listenTapQuestions ?? listenTapQuestions;
  const activeLetterQuestQuestions = gamePack?.banks.letterQuestQuestions ?? letterQuestQuestions;
  const activeSentenceBuilderQuestions = gamePack?.banks.sentenceBuilderQuestions ?? sentenceBuilderQuestions;
  const activeTenseMasterQuestions = gamePack?.banks.tenseMasterQuestions ?? tenseMasterQuestions;
  const activeVerbFormsQuestions = gamePack?.banks.verbFormsQuestions ?? verbFormsQuestions;
  const activeArticleDashQuestions = gamePack?.banks.articleDashQuestions ?? articleDashQuestions;
  const activeModalQuestQuestions = gamePack?.banks.modalQuestQuestions ?? modalQuestQuestions;
  const activeConditionalRunQuestions = gamePack?.banks.conditionalRunQuestions ?? conditionalRunQuestions;
  const activeQuestionBuilderQuestions = gamePack?.banks.questionBuilderQuestions ?? questionBuilderQuestions;
  const activeErrorFixQuestions = gamePack?.banks.errorFixQuestions ?? errorFixQuestions;
  const activeDifficulty = isLetterQuest ? currentLetterLevel : isVisualWordMatch ? currentWordMatchLevel : isTenseMaster ? currentTenseLevel : isVerbForms ? currentVerbFormsLevel : isArticleDash ? currentArticleDashLevel : isModalQuest ? currentModalQuestLevel : isConditionalRun ? currentConditionalRunLevel : isQuestionBuilder ? currentQuestionBuilderLevel : isErrorFix ? currentErrorFixLevel : isSentenceBuilder ? currentSentenceLevel : isListenTap ? currentListenLevel : isSpeedQuiz ? currentSpeedLevel : isTyping ? currentTypingLevel : isMemoryCard ? currentMemoryLevel : isFindWords ? currentFindWordsLevel : difficulty;

  const questions = useMemo(() => {
    const limit = difficultyLimit(difficulty);
    if (isTenseMaster) {
      const label = currentTenseLevel === 'easy' ? 'Easy' : currentTenseLevel === 'medium' ? 'Medium' : 'Hard';
      return shuffle(activeTenseMasterQuestions.filter((item) => item.level === label));
    }
    if (isVerbForms) {
      const label = currentVerbFormsLevel === 'easy' ? 'Easy' : currentVerbFormsLevel === 'medium' ? 'Medium' : 'Hard';
      return shuffle(activeVerbFormsQuestions.filter((item) => item.level === label));
    }
    if (isArticleDash) {
      const label = currentArticleDashLevel === 'easy' ? 'Easy' : currentArticleDashLevel === 'medium' ? 'Medium' : 'Hard';
      return shuffle(activeArticleDashQuestions.filter((item) => item.level === label));
    }
    if (isModalQuest) {
      const label = currentModalQuestLevel === 'easy' ? 'Easy' : currentModalQuestLevel === 'medium' ? 'Medium' : 'Hard';
      return shuffle(activeModalQuestQuestions.filter((item) => item.level === label));
    }
    if (isConditionalRun) {
      const label = currentConditionalRunLevel === 'easy' ? 'Easy' : currentConditionalRunLevel === 'medium' ? 'Medium' : 'Hard';
      return shuffle(activeConditionalRunQuestions.filter((item) => item.level === label));
    }
    if (isQuestionBuilder) {
      const label = currentQuestionBuilderLevel === 'easy' ? 'Easy' : currentQuestionBuilderLevel === 'medium' ? 'Medium' : 'Hard';
      return shuffle(activeQuestionBuilderQuestions.filter((item) => item.level === label));
    }
    if (isErrorFix) {
      const label = currentErrorFixLevel === 'easy' ? 'Easy' : currentErrorFixLevel === 'medium' ? 'Medium' : 'Hard';
      return shuffle(activeErrorFixQuestions.filter((item) => item.level === label));
    }
    if (isSentenceBuilder) {
      const label = currentSentenceLevel === 'easy' ? 'Easy' : currentSentenceLevel === 'medium' ? 'Medium' : 'Hard';
      return shuffle(activeSentenceBuilderQuestions.filter((item) => item.level === label));
    }
    if (isListenTap) {
      const label = currentListenLevel === 'easy' ? 'Easy' : currentListenLevel === 'medium' ? 'Medium' : 'Hard';
      return shuffle(activeListenTapQuestions.filter((item) => item.level === label));
    }
    if (isSpeedQuiz) {
      const label = currentSpeedLevel === 'easy' ? 'Easy' : currentSpeedLevel === 'medium' ? 'Medium' : 'Hard';
      return shuffle(activeListenTapQuestions.filter((item) => item.level === label));
    }
    if (isTyping) {
      const label = currentTypingLevel === 'easy' ? 'Easy' : currentTypingLevel === 'medium' ? 'Medium' : 'Hard';
      return shuffle(activeListenTapQuestions.filter((item) => item.level === label));
    }
    return shuffle(activeWordBank).slice(0, Math.min(limit, activeWordBank.length));
  }, [activeArticleDashQuestions, activeConditionalRunQuestions, activeErrorFixQuestions, activeListenTapQuestions, activeModalQuestQuestions, activeQuestionBuilderQuestions, activeSentenceBuilderQuestions, activeTenseMasterQuestions, activeVerbFormsQuestions, activeWordBank, currentArticleDashLevel, currentConditionalRunLevel, currentErrorFixLevel, currentListenLevel, currentModalQuestLevel, currentQuestionBuilderLevel, currentSentenceLevel, currentSpeedLevel, currentTenseLevel, currentTypingLevel, currentVerbFormsLevel, difficulty, isArticleDash, isConditionalRun, isErrorFix, isListenTap, isModalQuest, isQuestionBuilder, isSentenceBuilder, isSpeedQuiz, isTenseMaster, isTyping, isVerbForms]);

  const memoryPairCount = currentMemoryLevel === 'hard' ? 6 : currentMemoryLevel === 'medium' ? 5 : 4;
  const memoryPool = useMemo(() => {
    const level = currentMemoryLevel === 'hard' ? 'Hard' : currentMemoryLevel === 'medium' ? 'Medium' : 'Easy';
    return shuffle(activeLetterQuestQuestions.filter((item) => item.level === level));
  }, [activeLetterQuestQuestions, currentMemoryLevel]);
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
    return shuffle(activeLetterQuestQuestions.filter((item) => item.level === level));
  }, [activeLetterQuestQuestions, currentFindWordsLevel]);
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
    return shuffle(activeLetterQuestQuestions.filter((item) => item.level === label));
  }, [activeLetterQuestQuestions, currentLetterLevel]);
  const letterQuestItems = useMemo(() => {
    return letterQuestPool.slice(letterBoard * 4, letterBoard * 4 + 4);
  }, [letterBoard, letterQuestPool]);
  const letterQuestTotalBoards = Math.ceil(letterQuestPool.length / 4);
  const wordMatchPool = useMemo(() => {
    const label = currentWordMatchLevel === 'easy' ? 'Easy' : currentWordMatchLevel === 'medium' ? 'Medium' : 'Hard';
    return shuffle(activeLetterQuestQuestions.filter((item) => item.level === label));
  }, [activeLetterQuestQuestions, currentWordMatchLevel]);
  const wordMatchItems = useMemo(() => {
    return wordMatchPool.slice(wordMatchBoard * 4, wordMatchBoard * 4 + 4);
  }, [wordMatchBoard, wordMatchPool]);
  const wordMatchWords = useMemo(() => shuffle(wordMatchItems.map((item, index) => ({ ...item, sourceIndex: index }))), [wordMatchItems]);
  const wordMatchTotalBoards = Math.ceil(wordMatchPool.length / 4);

  const current = questions[round];
  const progress = isMemoryCard
    ? Math.round((((memoryBoard * memoryPairCount) + (matchedCards.length / 2)) / memoryPool.length) * 100)
    : isFindWords
      ? Math.round((((findWordsBoard * 4) + findWordsItems.filter((item, index) => (findWordsAnswers[index] || '').length === item.word.length).length) / findWordsPool.length) * 100)
    : isLetterQuest
      ? Math.round((((letterBoard * 4) + letterAnswers.filter((answer, index) => letterQuestItems[index] && answer.length === letterQuestItems[index].word.length).length) / letterQuestPool.length) * 100)
    : isVisualWordMatch
      ? Math.round((((wordMatchBoard * 4) + Object.keys(wordMatchPairs).length) / wordMatchPool.length) * 100)
    : isSpeedQuiz
      ? Math.round((secondsLeft / speedQuizDuration(currentSpeedLevel)) * 100)
      : Math.round((round / questions.length) * 100);
  const letterQuestNextLevel = isLetterQuest ? nextLetterQuestLevel(currentLetterLevel) : null;
  const letterQuestPerfect = isLetterQuest && score === letterQuestPool.length;
  const wordMatchNextLevel = isVisualWordMatch ? nextWordMatchLevel(currentWordMatchLevel) : null;
  const wordMatchPerfect = isVisualWordMatch && score === wordMatchPool.length;
  const tenseMasterNextLevel = isTenseMaster ? nextTenseMasterLevel(currentTenseLevel) : null;
  const tenseMasterPerfect = isTenseMaster && score === questions.length;
  const verbFormsNextLevel = isVerbForms ? nextVerbFormsLevel(currentVerbFormsLevel) : null;
  const verbFormsPerfect = isVerbForms && score === questions.length;
  const articleDashNextLevel = isArticleDash ? nextArticleDashLevel(currentArticleDashLevel) : null;
  const articleDashPerfect = isArticleDash && score === questions.length;
  const modalQuestNextLevel = isModalQuest ? nextModalQuestLevel(currentModalQuestLevel) : null;
  const modalQuestPerfect = isModalQuest && score === questions.length;
  const conditionalRunNextLevel = isConditionalRun ? nextConditionalRunLevel(currentConditionalRunLevel) : null;
  const conditionalRunPerfect = isConditionalRun && score === questions.length;
  const questionBuilderNextLevel = isQuestionBuilder ? nextQuestionBuilderLevel(currentQuestionBuilderLevel) : null;
  const questionBuilderPerfect = isQuestionBuilder && score === questions.length;
  const errorFixNextLevel = isErrorFix ? nextErrorFixLevel(currentErrorFixLevel) : null;
  const errorFixPerfect = isErrorFix && score === questions.length;
  const sentenceBuilderNextLevel = isSentenceBuilder ? nextSentenceBuilderLevel(currentSentenceLevel) : null;
  const sentenceBuilderPerfect = isSentenceBuilder && score === questions.length;
  const listenTapNextLevel = isListenTap ? nextListenTapLevel(currentListenLevel) : null;
  const listenTapPerfect = isListenTap && score === questions.length;
  const speedQuizNextLevel = isSpeedQuiz ? nextSpeedQuizLevel(currentSpeedLevel) : null;
  const speedQuizPerfect = isSpeedQuiz && score === questions.length;
  const typingSprintNextLevel = isTyping ? nextTypingSprintLevel(currentTypingLevel) : null;
  const typingSprintPerfect = isTyping && score === questions.length;
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

  useEffect(() => {
    if (!isSpeedQuiz) return;
    setSecondsLeft(speedQuizDuration(currentSpeedLevel));
  }, [currentSpeedLevel, isSpeedQuiz]);

  const speak = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = gamePack?.speechLang ?? 'en-US';
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
    if (isTenseMaster) {
      const nextLevel = nextTenseMasterLevel(currentTenseLevel);
      if (nextLevel) {
        localStorage.setItem('fluently_tense_master_level', nextLevel);
      }
    }
    if (isVerbForms) {
      const nextLevel = nextVerbFormsLevel(currentVerbFormsLevel);
      if (nextLevel) {
        localStorage.setItem('fluently_verb_forms_level', nextLevel);
      }
    }
    if (isArticleDash) {
      const nextLevel = nextArticleDashLevel(currentArticleDashLevel);
      if (nextLevel) {
        localStorage.setItem('fluently_article_dash_level', nextLevel);
      }
    }
    if (isModalQuest) {
      const nextLevel = nextModalQuestLevel(currentModalQuestLevel);
      if (nextLevel) {
        localStorage.setItem('fluently_modal_quest_level', nextLevel);
      }
    }
    if (isConditionalRun) {
      const nextLevel = nextConditionalRunLevel(currentConditionalRunLevel);
      if (nextLevel) {
        localStorage.setItem('fluently_conditional_run_level', nextLevel);
      }
    }
    if (isQuestionBuilder) {
      const nextLevel = nextQuestionBuilderLevel(currentQuestionBuilderLevel);
      if (nextLevel) {
        localStorage.setItem('fluently_question_builder_level', nextLevel);
      }
    }
    if (isErrorFix) {
      const nextLevel = nextErrorFixLevel(currentErrorFixLevel);
      if (nextLevel) {
        localStorage.setItem('fluently_error_fix_level', nextLevel);
      }
    }
    if (isListenTap) {
      const nextLevel = nextListenTapLevel(currentListenLevel);
      if (nextLevel) {
        localStorage.setItem('fluently_listen_tap_level', nextLevel);
      }
    }
    if (isSpeedQuiz) {
      const nextLevel = nextSpeedQuizLevel(currentSpeedLevel);
      if (nextLevel) {
        localStorage.setItem('fluently_speed_quiz_level', nextLevel);
      }
    }
    if (isTyping) {
      const nextLevel = nextTypingSprintLevel(currentTypingLevel);
      if (nextLevel) {
        localStorage.setItem('fluently_typing_sprint_level', nextLevel);
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
    if (xp > 0) awardXp(Math.min(xp, 500), 'game');
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

  const removeBuiltWord = (indexToRemove: number) => {
    if (feedback) return;
    setBuiltWords((value) => value.filter((_, index) => index !== indexToRemove));
    setUsedIndexes((value) => value.filter((_, index) => index !== indexToRemove));
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
    const accepted = [current.word, ...(gamePack?.acceptsRomanization && current.hint ? [current.hint] : [])];
    const correct = accepted.some((answer) => normalizeTypedAnswer(typedAnswer) === normalizeTypedAnswer(String(answer)));
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

  const pickFindWordCell = (rowIndex: number, colIndex: number, letter: string) => {
    if (findWordsChecked) return;
    const target = findWordsItems[activeFindWordsIndex];
    const currentAnswer = findWordsAnswers[activeFindWordsIndex] || '';
    if (!target || currentAnswer.length >= target.word.length) return;

    const cellId = `${rowIndex}-${colIndex}`;
    const currentCells = findWordsCells[activeFindWordsIndex] || [];
    if (currentCells.includes(cellId)) return;

    const nextAnswer = currentAnswer + letter;
    setFindWordsAnswers((answers) => ({ ...answers, [activeFindWordsIndex]: nextAnswer }));
    setFindWordsCells((cells) => ({ ...cells, [activeFindWordsIndex]: [...currentCells, cellId] }));

    if (nextAnswer.length === target.word.length) {
      const nextIndex = findWordsItems.findIndex((item, index) => index !== activeFindWordsIndex && (findWordsAnswers[index] || '').length < item.word.length);
      if (nextIndex !== -1) setActiveFindWordsIndex(nextIndex);
    }
  };

  const eraseFindWordLetter = (index: number) => {
    if (findWordsChecked) return;
    setActiveFindWordsIndex(index);
    setFindWordsAnswers((answers) => ({ ...answers, [index]: (answers[index] || '').slice(0, -1) }));
    setFindWordsCells((cells) => ({ ...cells, [index]: (cells[index] || []).slice(0, -1) }));
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
    setFindWordsCells({});
    setActiveFindWordsIndex(0);
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
    setSecondsLeft(isSpeedQuiz ? speedQuizDuration(currentSpeedLevel) : 45);
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
    setFindWordsCells({});
    setActiveFindWordsIndex(0);
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

  const startNextTenseMasterLevel = () => {
    const nextLevel = nextTenseMasterLevel(currentTenseLevel);
    if (!nextLevel) {
      navigate('/game');
      return;
    }
    setCurrentTenseLevel(nextLevel);
    localStorage.setItem('fluently_tense_master_level', nextLevel);
    restart();
  };

  const startNextVerbFormsLevel = () => {
    const nextLevel = nextVerbFormsLevel(currentVerbFormsLevel);
    if (!nextLevel) {
      navigate('/game');
      return;
    }
    setCurrentVerbFormsLevel(nextLevel);
    localStorage.setItem('fluently_verb_forms_level', nextLevel);
    restart();
  };

  const startNextArticleDashLevel = () => {
    const nextLevel = nextArticleDashLevel(currentArticleDashLevel);
    if (!nextLevel) {
      navigate('/game');
      return;
    }
    setCurrentArticleDashLevel(nextLevel);
    localStorage.setItem('fluently_article_dash_level', nextLevel);
    restart();
  };

  const startNextModalQuestLevel = () => {
    const nextLevel = nextModalQuestLevel(currentModalQuestLevel);
    if (!nextLevel) {
      navigate('/game');
      return;
    }
    setCurrentModalQuestLevel(nextLevel);
    localStorage.setItem('fluently_modal_quest_level', nextLevel);
    restart();
  };

  const startNextConditionalRunLevel = () => {
    const nextLevel = nextConditionalRunLevel(currentConditionalRunLevel);
    if (!nextLevel) {
      navigate('/game');
      return;
    }
    setCurrentConditionalRunLevel(nextLevel);
    localStorage.setItem('fluently_conditional_run_level', nextLevel);
    restart();
  };

  const startNextQuestionBuilderLevel = () => {
    const nextLevel = nextQuestionBuilderLevel(currentQuestionBuilderLevel);
    if (!nextLevel) {
      navigate('/game');
      return;
    }
    setCurrentQuestionBuilderLevel(nextLevel);
    localStorage.setItem('fluently_question_builder_level', nextLevel);
    restart();
  };

  const startNextErrorFixLevel = () => {
    const nextLevel = nextErrorFixLevel(currentErrorFixLevel);
    if (!nextLevel) {
      navigate('/game');
      return;
    }
    setCurrentErrorFixLevel(nextLevel);
    localStorage.setItem('fluently_error_fix_level', nextLevel);
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

  const startNextSpeedQuizLevel = () => {
    const nextLevel = nextSpeedQuizLevel(currentSpeedLevel);
    if (!nextLevel) {
      navigate('/game');
      return;
    }
    setCurrentSpeedLevel(nextLevel);
    localStorage.setItem('fluently_speed_quiz_level', nextLevel);
    restart();
  };

  const startNextTypingSprintLevel = () => {
    const nextLevel = nextTypingSprintLevel(currentTypingLevel);
    if (!nextLevel) {
      navigate('/game');
      return;
    }
    setCurrentTypingLevel(nextLevel);
    localStorage.setItem('fluently_typing_sprint_level', nextLevel);
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
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#7EC3E6] font-black">
                {gamePack ? `${gamePack.categoryCopy[categoryId] || gamePack.language} game` : `${categoryId} game`}
              </p>
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

        <div className={`mt-6 mx-auto ${isVisualWordMatch || isFindWords ? 'max-w-5xl' : isMemoryCard ? 'max-w-4xl' : isTenseMaster || isVerbForms || isArticleDash || isModalQuest || isConditionalRun || isQuestionBuilder || isErrorFix ? 'max-w-3xl' : 'max-w-2xl'}`}>
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
                        <h2 className="text-3xl sm:text-4xl font-black text-white leading-none">{isArabicGame ? 'Find Arabic Words' : 'Find the words'}</h2>
                      </div>
                      <p className="mt-4 text-center text-sm sm:text-base font-black text-[#1A1A2E]">
                        {isArabicGame ? 'Pilih kartu mufradat, lalu klik huruf Arab di papan.' : 'Pilih kartu jawaban, lalu klik huruf di papan.'}
                      </p>
                      <p className="mt-2 text-center">
                        <span className="inline-flex px-4 py-1 rounded-full bg-[#EAF7FC] text-[12px] font-black text-[#2F80ED]">
                          {currentFindWordsLevel.toUpperCase()} Level - Board {findWordsBoard + 1} / {findWordsTotalBoards} - 30 {isArabicGame ? 'Arabic words' : 'words'}
                        </span>
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      <div
                        className="grid rounded-xl border-2 border-[#4FA3D1] overflow-hidden bg-white shadow-sm"
                        style={{ gridTemplateColumns: `repeat(${findWordsGridSize}, minmax(0, 1fr))` }}
                      >
                        {findWordsGrid.flatMap((row, rowIndex) =>
                          row.map((letter, colIndex) => {
                            const cellId = `${rowIndex}-${colIndex}`;
                            const selectedBy = Object.entries(findWordsCells).find(([, cells]) => cells.includes(cellId))?.[0];
                            const isActiveCell = selectedBy !== undefined && Number(selectedBy) === activeFindWordsIndex;
                            const isSelectedCell = selectedBy !== undefined;

                            return (
                            <button
                              key={`${rowIndex}-${colIndex}`}
                              type="button"
                              onClick={() => pickFindWordCell(rowIndex, colIndex, letter)}
                              disabled={findWordsChecked}
                              className={`aspect-square border border-[#4FA3D1]/70 flex items-center justify-center text-[14px] min-[390px]:text-[18px] sm:text-[22px] font-black transition-colors ${isActiveCell ? 'bg-[#2F80ED] text-white' : isSelectedCell ? 'bg-[#EAF7FC] text-[#2F80ED]' : 'bg-white text-[#1A1A2E] hover:bg-[#EAF7FC]'}`}
                            >
                              <span dir={isArabicGame ? 'rtl' : 'auto'}>{letter}</span>
                            </button>
                          );
                          })
                        )}
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-4">
                      {findWordsItems.map((item, index) => {
                        const answer = findWordsAnswers[index] || '';
                        const correct = findWordsChecked && answer === item.word;
                        const wrong = findWordsChecked && answer !== item.word;
                        return (
                          <button
                            key={`answer-${item.word}`}
                            type="button"
                            onClick={() => !findWordsChecked && setActiveFindWordsIndex(index)}
                            className={`text-left rounded-2xl border p-4 bg-white shadow-sm transition-colors ${correct ? 'border-emerald-300 bg-emerald-50' : wrong ? 'border-rose-300 bg-rose-50' : activeFindWordsIndex === index ? 'border-[#2F80ED] bg-[#EAF7FC]' : 'border-[#BDE7F7] hover:border-[#4FA3D1]'}`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-white to-[#EAF7FC] flex items-center justify-center text-[42px] shadow-md border border-white">
                                <span className="absolute inset-x-3 bottom-2 h-3 rounded-full bg-black/10 blur-sm" />
                                <span className="relative drop-shadow-md">{getWordMatchVisual(item.word, item.icon)}</span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex gap-1.5">
                                  {item.word.split('').map((_, letterIndex) => (
                                    <span key={letterIndex} className="h-8 flex-1 min-w-[18px] rounded-md border-2 border-[#4FA3D1]/70 bg-white flex items-center justify-center text-sm font-black text-[#1A1A2E]">
                                      <span dir={isArabicGame ? 'rtl' : 'auto'}>{answer[letterIndex] || ''}</span>
                                    </span>
                                  ))}
                                </div>
                                {!findWordsChecked && (
                                  <span
                                    role="button"
                                    tabIndex={0}
                                    onClick={(event) => {
                                      event.stopPropagation();
                                      eraseFindWordLetter(index);
                                    }}
                                    onKeyDown={(event) => {
                                      if (event.key !== 'Enter' && event.key !== ' ') return;
                                      event.preventDefault();
                                      event.stopPropagation();
                                      eraseFindWordLetter(index);
                                    }}
                                    className="mt-2 inline-flex h-8 px-3 rounded-xl border border-[#BDE7F7] bg-white text-[11px] font-black uppercase text-[#2F80ED] items-center justify-center"
                                  >
                                    Hapus
                                  </span>
                                )}
                              </div>
                            </div>
                            {findWordsChecked && (
                              <p className={`mt-2 text-xs font-black ${correct ? 'text-emerald-600' : 'text-rose-600'}`}>
                                {correct ? 'Correct' : `Answer: ${item.word}`}
                              </p>
                            )}
                          </button>
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
                      {findWordsChecked && findWordsBoard + 1 < findWordsTotalBoards ? (isArabicGame ? 'Board Berikutnya' : 'Next Board') : findWordsChecked ? (isArabicGame ? 'Menyelesaikan...' : 'Finishing...') : isArabicGame ? 'Check Arabic Words' : 'Check Find the Words'}
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
                      {currentWordMatchLevel.toUpperCase()} Level - Board {wordMatchBoard + 1} / {wordMatchTotalBoards} - 30 {isArabicGame ? 'Arabic matches' : 'visual matches'}
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
                                <span dir={isArabicGame ? 'rtl' : 'auto'}>{wordMatchWords[pictureIndex]?.word}</span>
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
                    {wordMatchChecked && wordMatchBoard + 1 < wordMatchTotalBoards ? (isArabicGame ? 'Board Berikutnya' : 'Next Board') : wordMatchChecked ? (isArabicGame ? 'Menyelesaikan...' : 'Finishing...') : isArabicGame ? 'Check Arabic Match' : 'Check Word Match'}
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
                    {isArabicGame ? 'Arabic Letter Quest' : 'Letter Quest'}
                  </h2>
                  <p className="inline-block mt-3 px-4 py-1 rounded-full bg-[#F5D7F0] text-[12px] font-black text-[#40344D]">
                    {currentLetterLevel.toUpperCase()} Level - Board {letterBoard + 1} / {letterQuestTotalBoards} - 30 {isArabicGame ? 'Arabic words' : 'visual questions'}.
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
                              <span dir={isArabicGame ? 'rtl' : 'auto'}>{answer[letterIndex] || ''}</span>
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
                              <span dir={isArabicGame ? 'rtl' : 'auto'}>{letter}</span>
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
                  {letterChecked && letterBoard + 1 < letterQuestTotalBoards ? (isArabicGame ? 'Board Berikutnya' : 'Next Board') : letterChecked ? (isArabicGame ? 'Menyelesaikan...' : 'Finishing...') : isArabicGame ? 'Check Arabic Letters' : 'Check Letter Quest'}
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
                    <h2 className="text-2xl font-black text-[#1A1A2E]">{isArabicGame ? 'Match picture and Arabic word' : 'Match picture and word'}</h2>
                    <p className="text-sm text-gray-500 font-medium">{isArabicGame ? 'Buka kartu, ingat posisinya, lalu temukan pasangan visual dan mufradat Arab.' : 'Buka kartu, ingat posisinya, lalu temukan pasangan visual dan kata.'}</p>
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
                              <span dir={isArabicGame ? 'rtl' : 'auto'} className="px-3 py-2 rounded-2xl bg-white text-[#1A1A2E] text-sm sm:text-base font-black shadow-sm break-words">
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
                      {isArabicGame ? 'Soal' : 'Question'} {round + 1} / {questions.length}
                    </span>
                    <span className="text-[11px] font-bold text-gray-400 capitalize">{isTenseMaster ? currentTenseLevel : isVerbForms ? currentVerbFormsLevel : isArticleDash ? currentArticleDashLevel : isModalQuest ? currentModalQuestLevel : isConditionalRun ? currentConditionalRunLevel : isQuestionBuilder ? currentQuestionBuilderLevel : isErrorFix ? currentErrorFixLevel : isSentenceBuilder ? currentSentenceLevel : isListenTap ? currentListenLevel : isSpeedQuiz ? currentSpeedLevel : isTyping ? currentTypingLevel : difficulty}</span>
                  </div>

                  {isTenseMaster ? (
                    <>
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className="px-3 py-1.5 rounded-full bg-white border border-[#7EC3E6]/40 text-[11px] font-black text-[#2F80ED]">
                          {current.tense}
                        </span>
                        <span className="px-3 py-1.5 rounded-full bg-[#1A1A2E] text-white text-[11px] font-black">
                          {current.formula}
                        </span>
                      </div>
                      <p className="text-[13px] text-gray-500 font-semibold mb-2">{isArabicGame ? "Lengkapi kalimat dengan fi'il yang tepat:" : 'Lengkapi kalimat sesuai tense:'}</p>
                      <h2 dir={isArabicGame ? 'rtl' : 'auto'} lang={isArabicGame ? 'ar' : undefined} className="text-[25px] md:text-[34px] leading-tight font-black text-[#1A1A2E]">{current.prompt}</h2>
                      <p className="text-sm text-gray-400 mt-3 font-semibold">{current.translation}</p>
                    </>
                  ) : isVerbForms ? (
                    <>
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className="px-3 py-1.5 rounded-full bg-white border border-emerald-200 text-[11px] font-black text-emerald-600">
                          {current.formLabel}
                        </span>
                        <span className="px-3 py-1.5 rounded-full bg-[#1A1A2E] text-white text-[11px] font-black">
                          {current.pattern}
                        </span>
                      </div>
                      <p className="text-[13px] text-gray-500 font-semibold mb-2">{isArabicGame ? "Pilih bentuk fi'il yang tepat:" : 'Pilih bentuk verb yang tepat:'}</p>
                      <h2 dir={isArabicGame ? 'rtl' : 'auto'} lang={isArabicGame ? 'ar' : undefined} className="text-[25px] md:text-[34px] leading-tight font-black text-[#1A1A2E]">{current.prompt}</h2>
                      <p className="text-sm text-gray-400 mt-3 font-semibold">Arti: {current.translation}</p>
                    </>
                  ) : isArticleDash ? (
                    <>
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className="px-3 py-1.5 rounded-full bg-white border border-orange-200 text-[11px] font-black text-orange-600">
                          {isArabicGame ? 'Pilihan ال' : 'Article choice'}
                        </span>
                        <span className="px-3 py-1.5 rounded-full bg-[#1A1A2E] text-white text-[11px] font-black">
                          {isArabicGame ? 'marifah / nakirah' : 'a / an / the / no article'}
                        </span>
                      </div>
                      <p className="text-[13px] text-gray-500 font-semibold mb-2">{isArabicGame ? 'Pilih bentuk marifah/nakirah yang tepat:' : 'Pilih article yang tepat:'}</p>
                      <h2 dir={isArabicGame ? 'rtl' : 'auto'} lang={isArabicGame ? 'ar' : undefined} className="text-[25px] md:text-[34px] leading-tight font-black text-[#1A1A2E]">{current.prompt}</h2>
                      <p className="text-sm text-gray-400 mt-3 font-semibold">{current.translation}</p>
                    </>
                  ) : isModalQuest ? (
                    <>
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className="px-3 py-1.5 rounded-full bg-white border border-amber-200 text-[11px] font-black text-amber-600">
                          {current.tone}
                        </span>
                        <span className="px-3 py-1.5 rounded-full bg-[#1A1A2E] text-white text-[11px] font-black">
                          {isArabicGame ? "ungkapan + fi'il" : 'modal + V1'}
                        </span>
                      </div>
                      <p className="text-[13px] text-gray-500 font-semibold mb-2">{isArabicGame ? 'Pilih ungkapan Arab yang tepat:' : 'Pilih modal verb yang tepat:'}</p>
                      <h2 dir={isArabicGame ? 'rtl' : 'auto'} lang={isArabicGame ? 'ar' : undefined} className="text-[25px] md:text-[34px] leading-tight font-black text-[#1A1A2E]">{current.prompt}</h2>
                      <p className="text-sm text-gray-400 mt-3 font-semibold">{current.translation}</p>
                    </>
                  ) : isConditionalRun ? (
                    <>
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className="px-3 py-1.5 rounded-full bg-white border border-purple-200 text-[11px] font-black text-purple-600">
                          {current.type}
                        </span>
                        <span className="px-3 py-1.5 rounded-full bg-[#1A1A2E] text-white text-[11px] font-black">
                          {current.rule}
                        </span>
                      </div>
                      <p className="text-[13px] text-gray-500 font-semibold mb-2">{isArabicGame ? 'Lengkapi kalimat syarat Arabic:' : 'Lengkapi conditional sentence:'}</p>
                      <h2 dir={isArabicGame ? 'rtl' : 'auto'} lang={isArabicGame ? 'ar' : undefined} className="text-[25px] md:text-[34px] leading-tight font-black text-[#1A1A2E]">{current.prompt}</h2>
                      <p className="text-sm text-gray-400 mt-3 font-semibold">{current.translation}</p>
                    </>
                  ) : isQuestionBuilder ? (
                    <>
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className="px-3 py-1.5 rounded-full bg-white border border-cyan-200 text-[11px] font-black text-cyan-700">
                          {current.type}
                        </span>
                        <span className="px-3 py-1.5 rounded-full bg-[#1A1A2E] text-white text-[11px] font-black">
                          {current.rule}
                        </span>
                      </div>
                      <p className="text-[13px] text-gray-500 font-semibold mb-2">{isArabicGame ? 'Pilih kata tanya Arab yang tepat:' : 'Pilih kata pembuka untuk membangun pertanyaan:'}</p>
                      <h2 dir={isArabicGame ? 'rtl' : 'auto'} lang={isArabicGame ? 'ar' : undefined} className="text-[25px] md:text-[34px] leading-tight font-black text-[#1A1A2E]">{current.prompt}</h2>
                      <p className="text-sm text-gray-400 mt-3 font-semibold">{current.translation}</p>
                    </>
                  ) : isErrorFix ? (
                    <>
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className="px-3 py-1.5 rounded-full bg-white border border-rose-200 text-[11px] font-black text-rose-600">
                          {current.type}
                        </span>
                        <span className="px-3 py-1.5 rounded-full bg-[#1A1A2E] text-white text-[11px] font-black">
                          {isArabicGame ? 'koreksi Arab' : 'find and fix'}
                        </span>
                      </div>
                      <p className="text-[13px] text-gray-500 font-semibold mb-2">Pilih versi kalimat yang sudah benar:</p>
                      <h2 dir={isArabicGame ? 'rtl' : 'auto'} lang={isArabicGame ? 'ar' : undefined} className="text-[25px] md:text-[34px] leading-tight font-black text-[#1A1A2E]">{current.prompt}</h2>
                      <p className="text-sm text-gray-400 mt-3 font-semibold">{current.translation}</p>
                    </>
                  ) : isSentenceBuilder ? (
                    <>
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className="px-3 py-1.5 rounded-full bg-white border border-[#7EC3E6]/40 text-[11px] font-black text-[#2F80ED]">
                          {isArabicGame ? currentSentenceLevel === 'easy' ? 'Jumlah dasar' : currentSentenceLevel === 'medium' ? 'Jumlah harian' : 'Jumlah kompleks' : currentSentenceLevel === 'easy' ? 'Basic sentence' : currentSentenceLevel === 'medium' ? 'Expanded sentence' : 'Complex sentence'}
                        </span>
                        <span className="px-3 py-1.5 rounded-full bg-[#1A1A2E] text-white text-[11px] font-black">
                          {current.answer.length} {isArabicGame ? 'kata Arab' : 'words'}
                        </span>
                      </div>
                      <p className="text-[13px] text-gray-500 font-semibold mb-2">{isArabicGame ? 'Susun kalimat bahasa Arab:' : 'Susun kalimat bahasa Inggris:'}</p>
                      <h2 className="text-[24px] md:text-[34px] leading-tight font-black text-[#1A1A2E]">{current.prompt}</h2>
                    </>
                  ) : isListenTap ? (
                    <>
                      <p className="text-[13px] text-gray-500 font-semibold mb-3">{isArabicGame ? 'Dengarkan kata Arab lalu pilih artinya:' : 'Dengarkan kata lalu pilih artinya:'}</p>
                      <button onClick={() => speak(current.word)} className="h-16 px-6 rounded-2xl bg-[#7EC3E6] text-white inline-flex items-center gap-3 font-black">
                        <Volume2 size={24} />
                        {isArabicGame ? 'Putar Audio Arab' : 'Play Audio'}
                      </button>
                    </>
                  ) : isTyping ? (
                    <>
                      <p className="text-[13px] text-gray-500 font-semibold mb-2">{isArabicGame ? 'Ketik kata Arab dari arti ini:' : 'Ketik kata bahasa Inggris dari arti ini:'}</p>
                      <h2 className="text-[30px] md:text-[40px] leading-tight font-black text-[#1A1A2E]">{current.answer}</h2>
                      <p className="text-sm text-gray-400 mt-3">Hint: {current.hint}</p>
                    </>
                  ) : (
                    <>
                      <p className="text-[13px] text-gray-500 font-semibold mb-2">{isSpeedQuiz ? 'Jawab cepat sebelum waktu habis:' : isArabicGame ? 'Pilih arti mufradat yang paling tepat:' : 'Pilih arti yang paling tepat:'}</p>
                      <h2 dir={isArabicGame ? 'rtl' : 'auto'} className="text-[34px] md:text-[44px] leading-tight font-black text-[#1A1A2E]">{current.word}</h2>
                    </>
                  )}
                </div>

                <div className="p-5 md:p-7">
                  {isTenseMaster ? (
                    <div className="space-y-5">
                      <div className="grid grid-cols-3 gap-2">
                        {['Easy', 'Medium', 'Hard'].map((level) => {
                          const active = level.toLowerCase() === currentTenseLevel;
                          return (
                            <div key={level} className={`rounded-2xl border p-3 text-center ${active ? 'bg-[#EAF7FC] border-[#7EC3E6] text-[#2F80ED]' : 'bg-gray-50 border-gray-100 text-gray-400'}`}>
                              <p className="text-[10px] uppercase tracking-wider font-black">{level}</p>
                              <p className="text-[11px] font-bold mt-1">{level === 'Easy' ? 'Basic tenses' : level === 'Medium' ? 'Perfect + future' : 'Advanced forms'}</p>
                            </div>
                          );
                        })}
                      </div>

                      <div className="relative rounded-3xl border border-[#7EC3E6]/35 bg-gradient-to-br from-[#EAF7FC] to-white p-4 overflow-hidden">
                        <div className="absolute left-5 right-5 top-1/2 h-1 rounded-full bg-[#7EC3E6]/25" />
                        <div className="relative grid grid-cols-3 gap-3">
                          {['Past', 'Now', 'Future'].map((label) => {
                            const active = current.tense.toLowerCase().includes(label.toLowerCase()) || (label === 'Now' && current.tense.toLowerCase().includes('present'));
                            return (
                              <div key={label} className="flex flex-col items-center gap-2">
                                <span className={`w-8 h-8 rounded-full border-4 flex items-center justify-center ${active ? 'bg-[#2F80ED] border-white shadow-lg text-white' : 'bg-white border-[#CDEEFF] text-gray-300'}`}>
                                  {active ? <Check size={14} /> : null}
                                </span>
                                <span className={`text-[11px] font-black ${active ? 'text-[#2F80ED]' : 'text-gray-400'}`}>{label}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-3">
                        {current.options.map((option) => {
                          const isPicked = selected === option;
                          const isCorrect = option === current.answer;
                          const stateClass = feedback && isPicked
                            ? isCorrect
                              ? 'border-emerald-400 bg-emerald-50 text-emerald-700'
                              : 'border-rose-400 bg-rose-50 text-rose-700'
                            : selected === option
                              ? 'border-[#7EC3E6] bg-[#EAF7FC] text-[#1A1A2E]'
                              : 'border-gray-100 bg-[#F8FAFC] text-[#1A1A2E] hover:border-[#7EC3E6] hover:bg-[#EAF7FC]';

                          return (
                            <button
                              key={option}
                              onClick={() => answerWordMatch(option)}
                              disabled={!!feedback}
                              className={`min-h-[70px] rounded-2xl border px-5 text-left font-black transition flex items-center justify-between ${stateClass}`}
                            >
                              <span dir={isArabicGame ? 'rtl' : 'auto'} lang={isArabicGame ? 'ar' : undefined}>{option}</span>
                              {feedback && isPicked && (isCorrect ? <Check size={20} /> : <X size={20} />)}
                            </button>
                          );
                        })}
                      </div>

                      {feedback && (
                        <div className={`rounded-2xl p-4 text-sm font-bold ${feedback === 'correct' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                          {feedback === 'correct' ? `Benar. Polanya: ${current.formula}` : `Belum tepat. Jawaban: ${current.answer}`}
                        </div>
                      )}
                    </div>
                  ) : isVerbForms ? (
                    <div className="space-y-5">
                      <div className="grid grid-cols-3 gap-2">
                        {['Easy', 'Medium', 'Hard'].map((level) => {
                          const active = level.toLowerCase() === currentVerbFormsLevel;
                          return (
                            <div key={level} className={`rounded-2xl border p-3 text-center ${active ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-gray-50 border-gray-100 text-gray-400'}`}>
                              <p className="text-[10px] uppercase tracking-wider font-black">{level}</p>
                              <p className="text-[11px] font-bold mt-1">{level === 'Easy' ? 'V2' : level === 'Medium' ? 'V3 + ing' : 'mixed'}</p>
                            </div>
                          );
                        })}
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {Object.entries(current.forms).map(([label, value]) => {
                          const active = (label === 'V2' && current.formLabel.includes('V2')) || (label === 'V3' && current.formLabel.includes('V3')) || (label === 'ING' && current.formLabel.includes('ing'));
                          return (
                            <div key={label} className={`rounded-2xl border p-4 text-center ${active ? 'border-emerald-300 bg-emerald-50 shadow-sm' : 'border-gray-100 bg-[#F8FAFC]'}`}>
                              <p className={`text-[10px] uppercase tracking-wider font-black ${active ? 'text-emerald-600' : 'text-gray-400'}`}>{label}</p>
                              <p className="mt-2 text-lg font-black text-[#1A1A2E] break-words">{active && !feedback ? '?' : value}</p>
                            </div>
                          );
                        })}
                      </div>

                      <div className="grid sm:grid-cols-2 gap-3">
                        {current.options.map((option) => {
                          const isPicked = selected === option;
                          const isCorrect = option === current.answer;
                          const stateClass = feedback && isPicked
                            ? isCorrect
                              ? 'border-emerald-400 bg-emerald-50 text-emerald-700'
                              : 'border-rose-400 bg-rose-50 text-rose-700'
                            : 'border-gray-100 bg-white text-[#1A1A2E] hover:border-emerald-300 hover:bg-emerald-50';

                          return (
                            <button
                              key={option}
                              onClick={() => answerWordMatch(option)}
                              disabled={!!feedback}
                              className={`min-h-[68px] rounded-2xl border px-5 text-left font-black transition flex items-center justify-between shadow-sm ${stateClass}`}
                            >
                              <span dir={isArabicGame ? 'rtl' : 'auto'} lang={isArabicGame ? 'ar' : undefined}>{option}</span>
                              {feedback && isPicked && (isCorrect ? <Check size={20} /> : <X size={20} />)}
                            </button>
                          );
                        })}
                      </div>

                      {feedback && (
                        <div className={`rounded-2xl p-4 text-sm font-bold ${feedback === 'correct' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                          {feedback === 'correct' ? `Benar. ${current.pattern}.` : `Belum tepat. Jawaban: ${current.answer}`}
                        </div>
                      )}
                    </div>
                  ) : isArticleDash ? (
                    <div className="space-y-5">
                      <div className="grid grid-cols-3 gap-2">
                        {['Easy', 'Medium', 'Hard'].map((level) => {
                          const active = level.toLowerCase() === currentArticleDashLevel;
                          return (
                            <div key={level} className={`rounded-2xl border p-3 text-center ${active ? 'bg-orange-50 border-orange-200 text-orange-700' : 'bg-gray-50 border-gray-100 text-gray-400'}`}>
                              <p className="text-[10px] uppercase tracking-wider font-black">{level}</p>
                              <p className="text-[11px] font-bold mt-1">{level === 'Easy' ? 'a / an' : level === 'Medium' ? 'the / zero' : 'advanced'}</p>
                            </div>
                          );
                        })}
                      </div>

                      <div className="rounded-3xl border border-orange-200 bg-gradient-to-br from-orange-50 to-white p-5">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center font-black text-xl">
                            {selected ? (selected === 'no article' ? '0' : selected) : '?'}
                          </div>
                          <div className="min-w-0">
                            <p className="text-[11px] uppercase tracking-wider font-black text-orange-600">{isArabicGame ? 'Slot kosong' : 'Dash slot'}</p>
                            <p className="text-sm font-bold text-gray-500">{isArabicGame ? 'Isi bagian kosong dengan bentuk Arabic yang benar.' : 'Isi bagian kosong dengan article yang benar.'}</p>
                          </div>
                        </div>
                        <div dir={isArabicGame ? 'rtl' : 'auto'} lang={isArabicGame ? 'ar' : undefined} className="mt-4 rounded-2xl bg-white border border-orange-100 p-4 text-base sm:text-lg font-black text-[#1A1A2E]">
                          {current.prompt.split('____').map((part, index, parts) => (
                            <span key={`${part}-${index}`}>
                              {part}
                              {index < parts.length - 1 && (
                                <span className="inline-flex min-w-[86px] mx-1 px-3 py-1 rounded-xl bg-orange-50 border border-orange-200 text-orange-600 justify-center">
                                  {selected || '____'}
                                </span>
                              )}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {current.options.map((option) => {
                          const isPicked = selected === option;
                          const isCorrect = option === current.answer;
                          const stateClass = feedback && isPicked
                            ? isCorrect
                              ? 'border-emerald-400 bg-emerald-50 text-emerald-700'
                              : 'border-rose-400 bg-rose-50 text-rose-700'
                            : selected === option
                              ? 'border-orange-400 bg-orange-50 text-orange-700'
                              : 'border-gray-100 bg-white text-[#1A1A2E] hover:border-orange-300 hover:bg-orange-50';

                          return (
                            <button
                              key={option}
                              onClick={() => answerWordMatch(option)}
                              disabled={!!feedback}
                              className={`min-h-[76px] rounded-2xl border px-4 text-center font-black transition flex items-center justify-center shadow-sm ${stateClass}`}
                            >
                              <span dir={isArabicGame ? 'rtl' : 'auto'} lang={isArabicGame ? 'ar' : undefined}>{option === 'no article' ? 'no article' : option}</span>
                              {feedback && isPicked && <span className="ml-2">{isCorrect ? <Check size={18} /> : <X size={18} />}</span>}
                            </button>
                          );
                        })}
                      </div>

                      {feedback && (
                        <div className={`rounded-2xl p-4 text-sm font-bold ${feedback === 'correct' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                          {feedback === 'correct' ? `Benar. ${current.rule}` : `Belum tepat. Jawaban: ${current.answer}. ${current.rule}`}
                        </div>
                      )}
                    </div>
                  ) : isModalQuest ? (
                    <div className="space-y-5">
                      <div className="grid grid-cols-3 gap-2">
                        {['Easy', 'Medium', 'Hard'].map((level) => {
                          const active = level.toLowerCase() === currentModalQuestLevel;
                          return (
                            <div key={level} className={`rounded-2xl border p-3 text-center ${active ? 'bg-amber-50 border-amber-200 text-amber-700' : 'bg-gray-50 border-gray-100 text-gray-400'}`}>
                              <p className="text-[10px] uppercase tracking-wider font-black">{level}</p>
                              <p className="text-[11px] font-bold mt-1">{level === 'Easy' ? 'basic' : level === 'Medium' ? 'past modal' : 'advanced'}</p>
                            </div>
                          );
                        })}
                      </div>

                      <div className="rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-5">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                          <div className="grid grid-cols-3 gap-2 sm:w-64">
                            {(isArabicGame ? ['أستطيع', 'يجب', 'أريد', 'هل يمكن', 'من فضلك', 'لا بد'] : ['can', 'should', 'must', 'may', 'would', 'could']).map((modal) => (
                              <span
                                key={modal}
                                dir={isArabicGame ? 'rtl' : 'auto'}
                                lang={isArabicGame ? 'ar' : undefined}
                                className={`h-10 rounded-xl border flex items-center justify-center text-xs font-black ${selected === modal ? 'bg-amber-500 border-amber-500 text-white shadow-sm' : 'bg-white border-amber-100 text-amber-600'}`}
                              >
                                {modal}
                              </span>
                            ))}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[11px] uppercase tracking-wider font-black text-amber-600">{isArabicGame ? 'Petunjuk' : 'Quest clue'}</p>
                            <p className="text-sm font-bold text-gray-500 mt-1">{current.tone} - {current.rule}</p>
                          </div>
                        </div>

                        <div dir={isArabicGame ? 'rtl' : 'auto'} lang={isArabicGame ? 'ar' : undefined} className="mt-4 rounded-2xl bg-white border border-amber-100 p-4 text-base sm:text-lg font-black text-[#1A1A2E]">
                          {current.prompt.split('____').map((part, index, parts) => (
                            <span key={`${part}-${index}`}>
                              {part}
                              {index < parts.length - 1 && (
                                <span className="inline-flex min-w-[92px] mx-1 px-3 py-1 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 justify-center">
                                  {selected || '____'}
                                </span>
                              )}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {current.options.map((option) => {
                          const isPicked = selected === option;
                          const isCorrect = option === current.answer;
                          const stateClass = feedback && isPicked
                            ? isCorrect
                              ? 'border-emerald-400 bg-emerald-50 text-emerald-700'
                              : 'border-rose-400 bg-rose-50 text-rose-700'
                            : selected === option
                              ? 'border-amber-400 bg-amber-50 text-amber-700'
                              : 'border-gray-100 bg-white text-[#1A1A2E] hover:border-amber-300 hover:bg-amber-50';

                          return (
                            <button
                              key={option}
                              onClick={() => answerWordMatch(option)}
                              disabled={!!feedback}
                              className={`min-h-[68px] rounded-2xl border px-5 text-center font-black transition flex items-center justify-center shadow-sm ${stateClass}`}
                            >
                              <span dir={isArabicGame ? 'rtl' : 'auto'} lang={isArabicGame ? 'ar' : undefined}>{option}</span>
                              {feedback && isPicked && <span className="ml-2">{isCorrect ? <Check size={18} /> : <X size={18} />}</span>}
                            </button>
                          );
                        })}
                      </div>

                      {feedback && (
                        <div className={`rounded-2xl p-4 text-sm font-bold ${feedback === 'correct' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                          {feedback === 'correct' ? `Benar. ${current.rule}` : `Belum tepat. Jawaban: ${current.answer}. ${current.rule}`}
                        </div>
                      )}
                    </div>
                  ) : isConditionalRun ? (
                    <div className="space-y-5">
                      <div className="grid grid-cols-3 gap-2">
                        {['Easy', 'Medium', 'Hard'].map((level) => {
                          const active = level.toLowerCase() === currentConditionalRunLevel;
                          return (
                            <div key={level} className={`rounded-2xl border p-3 text-center ${active ? 'bg-purple-50 border-purple-200 text-purple-700' : 'bg-gray-50 border-gray-100 text-gray-400'}`}>
                              <p className="text-[10px] uppercase tracking-wider font-black">{level}</p>
                              <p className="text-[11px] font-bold mt-1">{level === 'Easy' ? 'zero / first' : level === 'Medium' ? 'second' : 'third'}</p>
                            </div>
                          );
                        })}
                      </div>

                      <div className="rounded-3xl border border-purple-200 bg-gradient-to-br from-purple-50 to-white p-5">
                        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                          <div className="rounded-2xl bg-white border border-purple-100 p-4 text-center">
                            <p className="text-[10px] uppercase tracking-wider font-black text-purple-500">{isArabicGame ? 'Syarat' : 'If clause'}</p>
                            <p className="mt-1 text-sm font-black text-[#1A1A2E]">{isArabicGame ? 'kondisi' : 'condition'}</p>
                          </div>
                          <ChevronRight className="text-purple-400" size={22} />
                          <div className="rounded-2xl bg-white border border-purple-100 p-4 text-center">
                            <p className="text-[10px] uppercase tracking-wider font-black text-purple-500">{isArabicGame ? 'Jawab syarat' : 'Result'}</p>
                            <p className="mt-1 text-sm font-black text-[#1A1A2E]">{isArabicGame ? 'hasil' : 'outcome'}</p>
                          </div>
                        </div>

                        <div dir={isArabicGame ? 'rtl' : 'auto'} lang={isArabicGame ? 'ar' : undefined} className="mt-4 rounded-2xl bg-white border border-purple-100 p-4 text-base sm:text-lg font-black text-[#1A1A2E]">
                          {current.prompt.split('____').map((part, index, parts) => (
                            <span key={`${part}-${index}`}>
                              {part}
                              {index < parts.length - 1 && (
                                <span className="inline-flex min-w-[106px] mx-1 px-3 py-1 rounded-xl bg-purple-50 border border-purple-200 text-purple-600 justify-center">
                                  {selected || '____'}
                                </span>
                              )}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-3">
                        {current.options.map((option) => {
                          const isPicked = selected === option;
                          const isCorrect = option === current.answer;
                          const stateClass = feedback && isPicked
                            ? isCorrect
                              ? 'border-emerald-400 bg-emerald-50 text-emerald-700'
                              : 'border-rose-400 bg-rose-50 text-rose-700'
                            : selected === option
                              ? 'border-purple-400 bg-purple-50 text-purple-700'
                              : 'border-gray-100 bg-white text-[#1A1A2E] hover:border-purple-300 hover:bg-purple-50';

                          return (
                            <button
                              key={option}
                              onClick={() => answerWordMatch(option)}
                              disabled={!!feedback}
                              className={`min-h-[68px] rounded-2xl border px-5 text-left font-black transition flex items-center justify-between shadow-sm ${stateClass}`}
                            >
                              <span dir={isArabicGame ? 'rtl' : 'auto'} lang={isArabicGame ? 'ar' : undefined}>{option}</span>
                              {feedback && isPicked && (isCorrect ? <Check size={20} /> : <X size={20} />)}
                            </button>
                          );
                        })}
                      </div>

                      {feedback && (
                        <div className={`rounded-2xl p-4 text-sm font-bold ${feedback === 'correct' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                          {feedback === 'correct' ? `Benar. ${current.rule}` : `Belum tepat. Jawaban: ${current.answer}. ${current.rule}`}
                        </div>
                      )}
                    </div>
                  ) : isQuestionBuilder ? (
                    <div className="space-y-5">
                      <div className="grid grid-cols-3 gap-2">
                        {['Easy', 'Medium', 'Hard'].map((level) => {
                          const active = level.toLowerCase() === currentQuestionBuilderLevel;
                          return (
                            <div key={level} className={`rounded-2xl border p-3 text-center ${active ? 'bg-cyan-50 border-cyan-200 text-cyan-700' : 'bg-gray-50 border-gray-100 text-gray-400'}`}>
                              <p className="text-[10px] uppercase tracking-wider font-black">{level}</p>
                              <p className="text-[11px] font-bold mt-1">{level === 'Easy' ? 'yes / no' : level === 'Medium' ? 'WH words' : 'advanced'}</p>
                            </div>
                          );
                        })}
                      </div>

                      <div className="rounded-3xl border border-cyan-200 bg-gradient-to-br from-cyan-50 to-white p-5">
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            [isArabicGame ? 'Pembuka' : 'Starter', selected || '?'],
                            [isArabicGame ? 'Kalimat' : 'Subject', current.prompt.replace('____', '').trim().split(' ')[0] || (isArabicGame ? 'kalimat' : 'subject')],
                            [isArabicGame ? 'Pola' : 'Pattern', current.type],
                          ].map(([label, value], index) => (
                            <div key={label} className={`rounded-2xl border p-3 text-center ${index === 0 ? 'bg-cyan-500 border-cyan-500 text-white shadow-sm' : 'bg-white border-cyan-100 text-[#1A1A2E]'}`}>
                              <p className={`text-[10px] uppercase tracking-wider font-black ${index === 0 ? 'text-white/80' : 'text-cyan-600'}`}>{label}</p>
                              <p dir={isArabicGame ? 'rtl' : 'auto'} lang={isArabicGame ? 'ar' : undefined} className="mt-1 text-sm font-black truncate">{value}</p>
                            </div>
                          ))}
                        </div>

                        <div dir={isArabicGame ? 'rtl' : 'auto'} lang={isArabicGame ? 'ar' : undefined} className="mt-4 rounded-2xl bg-white border border-cyan-100 p-4 text-base sm:text-lg font-black text-[#1A1A2E]">
                          {current.prompt.split('____').map((part, index, parts) => (
                            <span key={`${part}-${index}`}>
                              {part}
                              {index < parts.length - 1 && (
                                <span className="inline-flex min-w-[96px] mx-1 px-3 py-1 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-700 justify-center">
                                  {selected || '____'}
                                </span>
                              )}
                            </span>
                          ))}
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {(isArabicGame ? ['kata tanya', 'subjek', 'predikat', 'makna'] : ['question word', 'auxiliary', 'subject', 'base verb']).map((part, index) => (
                            <span key={part} className={`px-3 py-1.5 rounded-full text-[11px] font-black ${index === 0 ? 'bg-cyan-600 text-white' : 'bg-white border border-cyan-100 text-cyan-700'}`}>
                              {part}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {current.options.map((option) => {
                          const isPicked = selected === option;
                          const isCorrect = option === current.answer;
                          const stateClass = feedback && isPicked
                            ? isCorrect
                              ? 'border-emerald-400 bg-emerald-50 text-emerald-700'
                              : 'border-rose-400 bg-rose-50 text-rose-700'
                            : selected === option
                              ? 'border-cyan-400 bg-cyan-50 text-cyan-700'
                              : 'border-gray-100 bg-white text-[#1A1A2E] hover:border-cyan-300 hover:bg-cyan-50';

                          return (
                            <button
                              key={option}
                              onClick={() => answerWordMatch(option)}
                              disabled={!!feedback}
                              className={`min-h-[72px] rounded-2xl border px-4 text-center font-black transition flex items-center justify-center shadow-sm ${stateClass}`}
                            >
                              <span dir={isArabicGame ? 'rtl' : 'auto'} lang={isArabicGame ? 'ar' : undefined}>{option}</span>
                              {feedback && isPicked && <span className="ml-2">{isCorrect ? <Check size={18} /> : <X size={18} />}</span>}
                            </button>
                          );
                        })}
                      </div>

                      {feedback && (
                        <div className={`rounded-2xl p-4 text-sm font-bold ${feedback === 'correct' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                          {feedback === 'correct' ? `Benar. ${current.rule}` : `Belum tepat. Jawaban: ${current.answer}. ${current.rule}`}
                        </div>
                      )}
                    </div>
                  ) : isErrorFix ? (
                    <div className="space-y-5">
                      <div className="grid grid-cols-3 gap-2">
                        {['Easy', 'Medium', 'Hard'].map((level) => {
                          const active = level.toLowerCase() === currentErrorFixLevel;
                          return (
                            <div key={level} className={`rounded-2xl border p-3 text-center ${active ? 'bg-rose-50 border-rose-200 text-rose-700' : 'bg-gray-50 border-gray-100 text-gray-400'}`}>
                              <p className="text-[10px] uppercase tracking-wider font-black">{level}</p>
                              <p className="text-[11px] font-bold mt-1">{level === 'Easy' ? 'basic errors' : level === 'Medium' ? 'tense + pattern' : 'advanced grammar'}</p>
                            </div>
                          );
                        })}
                      </div>

                      <div className="rounded-3xl border border-rose-200 bg-gradient-to-br from-rose-50 to-white p-5">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-2xl bg-rose-500 text-white flex items-center justify-center font-black">
                            <X size={24} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[11px] uppercase tracking-wider font-black text-rose-600">{isArabicGame ? 'Kalimat perlu dikoreksi' : 'Sentence with error'}</p>
                            <p className="text-sm font-bold text-gray-500">{current.type}</p>
                          </div>
                        </div>

                        <div className="mt-4 rounded-2xl bg-white border border-rose-100 p-4">
                          <p className="text-[11px] uppercase tracking-wider font-black text-rose-500 mb-2">{isArabicGame ? 'Asal' : 'Original'}</p>
                          <p dir={isArabicGame ? 'rtl' : 'auto'} lang={isArabicGame ? 'ar' : undefined} className="text-lg sm:text-xl font-black text-[#1A1A2E]">{current.prompt}</p>
                        </div>

                        <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                          <div className="h-2 rounded-full bg-rose-200" />
                          <ChevronRight className="text-rose-400" size={22} />
                          <div className="h-2 rounded-full bg-emerald-200" />
                        </div>

                        <div className="mt-3 rounded-2xl bg-emerald-50 border border-emerald-100 p-4">
                          <p className="text-[11px] uppercase tracking-wider font-black text-emerald-600 mb-2">{isArabicGame ? 'Koreksi kamu' : 'Your fix'}</p>
                          <p dir={isArabicGame && selected ? 'rtl' : 'auto'} lang={isArabicGame && selected ? 'ar' : undefined} className="text-base sm:text-lg font-black text-[#1A1A2E]">{selected || (isArabicGame ? 'Pilih kalimat Arab yang sudah benar' : 'Choose the corrected sentence below')}</p>
                        </div>
                      </div>

                      <div className="grid gap-3">
                        {current.options.map((option) => {
                          const isPicked = selected === option;
                          const isCorrect = option === current.answer;
                          const stateClass = feedback && isPicked
                            ? isCorrect
                              ? 'border-emerald-400 bg-emerald-50 text-emerald-700'
                              : 'border-rose-400 bg-rose-50 text-rose-700'
                            : selected === option
                              ? 'border-rose-400 bg-rose-50 text-rose-700'
                              : 'border-gray-100 bg-white text-[#1A1A2E] hover:border-rose-300 hover:bg-rose-50';

                          return (
                            <button
                              key={option}
                              onClick={() => answerWordMatch(option)}
                              disabled={!!feedback}
                              className={`min-h-[66px] rounded-2xl border px-5 text-left font-black transition flex items-center justify-between shadow-sm ${stateClass}`}
                            >
                              <span dir={isArabicGame ? 'rtl' : 'auto'} lang={isArabicGame ? 'ar' : undefined}>{option}</span>
                              {feedback && isPicked && (isCorrect ? <Check size={20} /> : <X size={20} />)}
                            </button>
                          );
                        })}
                      </div>

                      {feedback && (
                        <div className={`rounded-2xl p-4 text-sm font-bold ${feedback === 'correct' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                          {feedback === 'correct' ? `Benar. ${current.rule}` : `Belum tepat. Jawaban: ${current.answer}. ${current.rule}`}
                        </div>
                      )}
                    </div>
                  ) : isSentenceBuilder ? (
                    <div className="space-y-5">
                      <div className="grid grid-cols-3 gap-2">
                        {['Easy', 'Medium', 'Hard'].map((level) => {
                          const active = level.toLowerCase() === currentSentenceLevel;
                          return (
                            <div key={level} className={`rounded-2xl border p-3 text-center ${active ? 'bg-[#EAF7FC] border-[#7EC3E6] text-[#2F80ED]' : 'bg-gray-50 border-gray-100 text-gray-400'}`}>
                              <p className="text-[10px] uppercase tracking-wider font-black">{level}</p>
                              <p className="text-[11px] font-bold mt-1">{level === 'Easy' ? 'short' : level === 'Medium' ? 'daily' : 'complex'}</p>
                            </div>
                          );
                        })}
                      </div>

                      <div className="rounded-3xl border border-[#7EC3E6]/35 bg-gradient-to-br from-[#EAF7FC] to-white p-4">
                        <div className="flex items-center justify-between text-[11px] font-black text-gray-400 mb-3">
                          <span>{isArabicGame ? 'Susunan kalimat' : 'Sentence path'}</span>
                          <span>{builtWords.length} / {current.answer.length}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {current.answer.map((_, index) => {
                            const word = builtWords[index];
                            return word ? (
                              <button
                                key={`${word}-${index}`}
                                type="button"
                                onClick={() => removeBuiltWord(index)}
                                className="min-h-10 px-3 py-2 rounded-xl bg-white text-[#1A1A2E] text-sm font-black shadow-sm border border-[#7EC3E6]/30"
                              >
                                <span dir={isArabicGame ? 'rtl' : 'auto'} lang={isArabicGame ? 'ar' : undefined}>{word}</span>
                              </button>
                            ) : (
                              <span
                                key={`empty-${index}`}
                                className="min-w-[54px] min-h-10 px-3 py-2 rounded-xl border-2 border-dashed border-[#7EC3E6]/40 bg-white/55 text-center text-sm font-black text-gray-300"
                              >
                                {index + 1}
                              </span>
                            );
                          })}
                        </div>
                        {builtWords.length === 0 && (
                          <p className="text-xs text-gray-400 font-semibold mt-3">{isArabicGame ? 'Tap kata Arab di bawah untuk menyusun jawaban.' : 'Tap kata di bawah untuk menyusun jawaban.'}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {current.words.map((word, index) => {
                          const used = usedIndexes.includes(index);
                          return (
                            <button
                              key={`${word}-${index}`}
                              onClick={() => pickWord(word, index)}
                              disabled={used || !!feedback}
                              className={`min-h-12 px-4 py-2.5 rounded-2xl text-sm font-black border transition ${used ? 'bg-gray-100 text-gray-300 border-gray-100' : 'bg-white text-[#1A1A2E] border-gray-200 hover:border-[#7EC3E6] hover:bg-[#EAF7FC] hover:-translate-y-0.5 shadow-sm'}`}
                            >
                              <span dir={isArabicGame ? 'rtl' : 'auto'} lang={isArabicGame ? 'ar' : undefined}>{word}</span>
                            </button>
                          );
                        })}
                      </div>

                      {feedback && (
                        <div className={`rounded-2xl p-4 text-sm font-bold ${feedback === 'correct' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                          {feedback === 'correct' ? (isArabicGame ? 'Benar. Jumlah Arab sudah tepat.' : 'Benar. Kalimatmu sudah tepat.') : `Belum tepat. Jawaban: ${current.answer.join(' ')}`}
                        </div>
                      )}

                      <div className="flex gap-3">
                        <button onClick={undoWord} disabled={builtWords.length === 0 || !!feedback} className="h-12 px-4 rounded-2xl bg-gray-100 text-gray-600 font-black disabled:opacity-40">{isArabicGame ? 'Urungkan' : 'Undo'}</button>
                        <button onClick={feedback ? () => goNext(score) : checkSentence} disabled={!feedback && builtWords.length !== current.answer.length} className="h-12 flex-1 rounded-2xl bg-[#7EC3E6] text-white font-black disabled:opacity-40">
                          {feedback ? (isArabicGame ? 'Lanjut' : 'Next') : (isArabicGame ? 'Periksa' : 'Check')}
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
                          dir={isArabicGame ? 'rtl' : 'auto'}
                          lang={isArabicGame ? 'ar' : undefined}
                          placeholder={isArabicGame ? 'اكتب الإجابة...' : 'Type your answer...'}
                        />
                      </div>
                      {feedback && (
                        <div className={`rounded-2xl p-4 text-sm font-bold ${feedback === 'correct' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                          {feedback === 'correct' ? (isArabicGame ? 'Benar.' : 'Correct.') : `${isArabicGame ? 'Jawaban' : 'Answer'}: ${current.word}`}
                        </div>
                      )}
                      <button onClick={feedback ? () => goNext(score) : checkTyping} className="h-12 w-full rounded-2xl bg-[#7EC3E6] text-white font-black">
                        {feedback ? (isArabicGame ? 'Lanjut' : 'Next') : (isArabicGame ? 'Kirim' : 'Submit')}
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
                            <span dir={isArabicGame ? 'rtl' : 'auto'} lang={isArabicGame ? 'ar' : undefined} className="inline-flex items-center gap-2">
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
                    : isTenseMaster
                      ? (tenseMasterNextLevel ? 'Selamat, Level Terbuka!' : 'Selamat, Tense Master Selesai!')
                    : isVerbForms
                      ? (verbFormsNextLevel ? 'Selamat, Level Terbuka!' : 'Selamat, Verb Forms Selesai!')
                    : isArticleDash
                      ? (articleDashNextLevel ? 'Selamat, Level Terbuka!' : 'Selamat, Article Dash Selesai!')
                    : isModalQuest
                      ? (modalQuestNextLevel ? 'Selamat, Level Terbuka!' : 'Selamat, Modal Quest Selesai!')
                    : isConditionalRun
                      ? (conditionalRunNextLevel ? 'Selamat, Level Terbuka!' : 'Selamat, Conditional Run Selesai!')
                    : isQuestionBuilder
                      ? (questionBuilderNextLevel ? 'Selamat, Level Terbuka!' : 'Selamat, Question Builder Selesai!')
                    : isErrorFix
                      ? (errorFixNextLevel ? 'Selamat, Level Terbuka!' : 'Selamat, Error Fix Selesai!')
                    : isSentenceBuilder
                      ? (sentenceBuilderNextLevel ? 'Selamat, Level Terbuka!' : 'Selamat, Sentence Builder Selesai!')
                      : isListenTap
                        ? (listenTapNextLevel ? 'Selamat, Level Terbuka!' : 'Selamat, Listen & Tap Selesai!')
                      : isSpeedQuiz
                        ? (speedQuizNextLevel ? 'Selamat, Level Terbuka!' : 'Selamat, Speed Quiz Selesai!')
                      : isTyping
                        ? (typingSprintNextLevel ? 'Selamat, Level Terbuka!' : 'Selamat, Typing Sprint Selesai!')
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
                    : isTenseMaster
                      ? `${currentTenseLevel.toUpperCase()} score: ${score} / ${questions.length}${tenseMasterPerfect ? ' - Perfect!' : ''}`
                    : isVerbForms
                      ? `${currentVerbFormsLevel.toUpperCase()} score: ${score} / ${questions.length}${verbFormsPerfect ? ' - Perfect!' : ''}`
                    : isArticleDash
                      ? `${currentArticleDashLevel.toUpperCase()} score: ${score} / ${questions.length}${articleDashPerfect ? ' - Perfect!' : ''}`
                    : isModalQuest
                      ? `${currentModalQuestLevel.toUpperCase()} score: ${score} / ${questions.length}${modalQuestPerfect ? ' - Perfect!' : ''}`
                    : isConditionalRun
                      ? `${currentConditionalRunLevel.toUpperCase()} score: ${score} / ${questions.length}${conditionalRunPerfect ? ' - Perfect!' : ''}`
                    : isQuestionBuilder
                      ? `${currentQuestionBuilderLevel.toUpperCase()} score: ${score} / ${questions.length}${questionBuilderPerfect ? ' - Perfect!' : ''}`
                    : isErrorFix
                      ? `${currentErrorFixLevel.toUpperCase()} score: ${score} / ${questions.length}${errorFixPerfect ? ' - Perfect!' : ''}`
                    : isSentenceBuilder
                      ? `${currentSentenceLevel.toUpperCase()} score: ${score} / ${questions.length}${sentenceBuilderPerfect ? ' - Perfect!' : ''}`
                    : isListenTap
                      ? `${currentListenLevel.toUpperCase()} score: ${score} / ${questions.length}${listenTapPerfect ? ' - Perfect!' : ''}`
                    : isSpeedQuiz
                      ? `${currentSpeedLevel.toUpperCase()} score: ${score} / ${questions.length}${speedQuizPerfect ? ' - Perfect!' : ''}`
                    : isTyping
                      ? `${currentTypingLevel.toUpperCase()} score: ${score} / ${questions.length}${typingSprintPerfect ? ' - Perfect!' : ''}`
                    : isMemoryCard
                      ? `${currentMemoryLevel.toUpperCase()} score: ${score} / ${memoryPool.length}${memoryCardPerfect ? ' - Perfect!' : ''}`
                    : isFindWords
                      ? `${currentFindWordsLevel.toUpperCase()} score: ${score} / ${findWordsPool.length}${findWordsPerfect ? ' - Perfect!' : ''}`
                    : `Score ${score} / ${questions.length}`}
                </p>
                {(isLetterQuest || isVisualWordMatch || isTenseMaster || isVerbForms || isArticleDash || isModalQuest || isConditionalRun || isQuestionBuilder || isErrorFix || isSentenceBuilder || isListenTap || isSpeedQuiz || isTyping || isMemoryCard || isFindWords) && (
                  <p className="text-xs text-gray-400 mt-2 font-semibold">
                    {isLetterQuest
                      ? (letterQuestNextLevel
                        ? `Level berikutnya sekarang terbuka: ${letterQuestNextLevel.toUpperCase()}.`
                        : 'Kamu sudah menyelesaikan Easy, Medium, dan Hard.')
                      : isVisualWordMatch
                      ? (wordMatchNextLevel
                        ? `Level berikutnya sekarang terbuka: ${wordMatchNextLevel.toUpperCase()}.`
                        : 'Kamu sudah menyelesaikan Easy, Medium, dan Hard.')
                      : isTenseMaster
                      ? (tenseMasterNextLevel
                        ? `Level berikutnya sekarang terbuka: ${tenseMasterNextLevel.toUpperCase()}.`
                        : 'Kamu sudah menyelesaikan Easy, Medium, dan Hard.')
                      : isVerbForms
                      ? (verbFormsNextLevel
                        ? `Level berikutnya sekarang terbuka: ${verbFormsNextLevel.toUpperCase()}.`
                        : 'Kamu sudah menyelesaikan Easy, Medium, dan Hard.')
                      : isArticleDash
                      ? (articleDashNextLevel
                        ? `Level berikutnya sekarang terbuka: ${articleDashNextLevel.toUpperCase()}.`
                        : 'Kamu sudah menyelesaikan Easy, Medium, dan Hard.')
                      : isModalQuest
                      ? (modalQuestNextLevel
                        ? `Level berikutnya sekarang terbuka: ${modalQuestNextLevel.toUpperCase()}.`
                        : 'Kamu sudah menyelesaikan Easy, Medium, dan Hard.')
                      : isConditionalRun
                      ? (conditionalRunNextLevel
                        ? `Level berikutnya sekarang terbuka: ${conditionalRunNextLevel.toUpperCase()}.`
                        : 'Kamu sudah menyelesaikan Easy, Medium, dan Hard.')
                      : isQuestionBuilder
                      ? (questionBuilderNextLevel
                        ? `Level berikutnya sekarang terbuka: ${questionBuilderNextLevel.toUpperCase()}.`
                        : 'Kamu sudah menyelesaikan Easy, Medium, dan Hard.')
                      : isErrorFix
                      ? (errorFixNextLevel
                        ? `Level berikutnya sekarang terbuka: ${errorFixNextLevel.toUpperCase()}.`
                        : 'Kamu sudah menyelesaikan Easy, Medium, dan Hard.')
                      : isMemoryCard
                      ? (memoryCardNextLevel
                        ? `Level berikutnya sekarang terbuka: ${memoryCardNextLevel.toUpperCase()}.`
                        : 'Kamu sudah menyelesaikan Easy, Medium, dan Hard.')
                      : isSpeedQuiz
                      ? (speedQuizNextLevel
                        ? `Level berikutnya sekarang terbuka: ${speedQuizNextLevel.toUpperCase()}.`
                        : 'Kamu sudah menyelesaikan Easy, Medium, dan Hard.')
                      : isTyping
                      ? (typingSprintNextLevel
                        ? `Level berikutnya sekarang terbuka: ${typingSprintNextLevel.toUpperCase()}.`
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
                  <button onClick={isLetterQuest && letterQuestNextLevel ? startNextLetterLevel : isVisualWordMatch && wordMatchNextLevel ? startNextWordMatchLevel : isTenseMaster && tenseMasterNextLevel ? startNextTenseMasterLevel : isVerbForms && verbFormsNextLevel ? startNextVerbFormsLevel : isArticleDash && articleDashNextLevel ? startNextArticleDashLevel : isModalQuest && modalQuestNextLevel ? startNextModalQuestLevel : isConditionalRun && conditionalRunNextLevel ? startNextConditionalRunLevel : isQuestionBuilder && questionBuilderNextLevel ? startNextQuestionBuilderLevel : isErrorFix && errorFixNextLevel ? startNextErrorFixLevel : isSentenceBuilder && sentenceBuilderNextLevel ? startNextSentenceBuilderLevel : isListenTap && listenTapNextLevel ? startNextListenTapLevel : isSpeedQuiz && speedQuizNextLevel ? startNextSpeedQuizLevel : isTyping && typingSprintNextLevel ? startNextTypingSprintLevel : isMemoryCard && memoryCardNextLevel ? startNextMemoryCardLevel : isFindWords && findWordsNextLevel ? startNextFindWordsLevel : () => navigate('/game')} className="h-12 rounded-2xl bg-[#7EC3E6] text-white font-black inline-flex items-center justify-center gap-2">
                    {(isLetterQuest && letterQuestNextLevel) || (isVisualWordMatch && wordMatchNextLevel) || (isTenseMaster && tenseMasterNextLevel) || (isVerbForms && verbFormsNextLevel) || (isArticleDash && articleDashNextLevel) || (isModalQuest && modalQuestNextLevel) || (isConditionalRun && conditionalRunNextLevel) || (isQuestionBuilder && questionBuilderNextLevel) || (isErrorFix && errorFixNextLevel) || (isSentenceBuilder && sentenceBuilderNextLevel) || (isListenTap && listenTapNextLevel) || (isSpeedQuiz && speedQuizNextLevel) || (isTyping && typingSprintNextLevel) || (isMemoryCard && memoryCardNextLevel) || (isFindWords && findWordsNextLevel) ? 'Next Level' : 'Done'}
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
