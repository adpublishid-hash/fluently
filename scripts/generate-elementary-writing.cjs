const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, '../src/pages/module/english/elementary/writing');

if (!fs.existsSync(DIR)) {
  fs.mkdirSync(DIR, { recursive: true });
}

// Helper to generate 20 questions from 10 unique templates (shuffle options, round labels)
function expandQuiz(templates, count = 20) {
  const result = [];
  for (let i = 0; i < count; i++) {
    const t = templates[i % templates.length];
    const round = Math.floor(i / templates.length) + 1;
    result.push({
      q: t.q.replace('{v}', '') + (round > 1 ? ' (R' + round + ')' : ''),
      opts: [...t.opts].sort(() => Math.random() - 0.5),
      ans: t.ans,
      exp: t.exp
    });
  }
  return result;
}

// 15 Lesson Configurations
const LESSONS = [
  {
    id: 1, title: 'Struktur Kalimat Sederhana',
    desc: 'Menguasai struktur Subjek + Predikat + Objek dengan bentuk To Be dan Kata Kerja dasar.',
    rules: [
      { icon: '🧩', title: 'Subjek Terlebih Dahulu', rule: 'Dalam bahasa Inggris, kalimat biasanya dimulai dengan subjek as (I, He, They).', wrong: 'Like I apples.', correct: 'I like apples.' },
      { icon: '🔄', title: 'To Be (am/is/are)', rule: 'Gunakan to be sesuai subjek untuk mendeskripsikan sesuatu.', wrong: 'He am a student.', correct: 'He is a student.' }
    ],
    fix: [
      { broken: 'she are happy today.', hint: 'Huruf kapital dan To Be yang tepat', answer: 'She is happy today.' },
      { broken: 'i play football likes.', hint: 'Susunan S + V + O', answer: 'I like to play football.' }, // simplified
      { broken: 'we is go to school', hint: 'To Be untuk We', answer: 'We are going to school.' },
      { broken: 'they reads books', hint: 'Untuk They, kata kerja tidak ditambah s', answer: 'They read books.' }
    ],
    build: [
      { prompt: '___ is my brother.', blank: 'He', options: ['He', 'She', 'It'], answer: 'He' },
      { prompt: 'They ___ playing outside.', blank: 'are', options: ['is', 'are', 'am'], answer: 'are' },
      { prompt: 'I ___ a cat.', blank: 'have', options: ['has', 'have', 'having'], answer: 'have' },
      { prompt: 'She ___ coffee every morning.', blank: 'drinks', options: ['drink', 'drinks', 'drinking'], answer: 'drinks' }
    ],
    quizTemplates: [
      { q: 'Susunan kalimat yang benar adalah... {v}', opts: ['I like pizza.', 'Like I pizza.', 'Pizza I like.'], ans: 'I like pizza.', exp: 'Struktur yang benar adalah S (I) + V (like) + O (pizza).' },
      { q: 'Pilih pasangan to be yang benar untuk "She" {v}', opts: ['am', 'are', 'is'], ans: 'is', exp: '"She" selalu dipasangkan dengan "is".' },
      { q: 'Kalimat mana yang tidak punya Subjek? {v}', opts: ['They swim.', 'Runs fast.', 'He is tall.'], ans: 'Runs fast.', exp: 'Kalimat harus memiliki Subjek (siapa yang berlari?).' },
      { q: 'Struktur yang salah: {v}', opts: ['We play tennis.', 'She are a nurse.', 'I am tired.'], ans: 'She are a nurse.', exp: 'Seharusnya "She is a nurse."' },
      { q: 'Terjemahan "Saya makan nasi": {v}', opts: ['I eat rice.', 'Eat I rice.', 'Rice I eat.'], ans: 'I eat rice.', exp: 'Subjek (I) + Predikat (eat) + Objek (rice).' }
    ],
    writingTask: {
      title: 'Tuliskan Kalimat Pertamamu!',
      desc: 'Buat 3 kalimat sederhana (S+V+O) berdasarkan petunjuk.',
      guide: ['1. [I] + [have] + [a book]', '2. [She] + [likes] + [cats]', '3. [We] + [are] + [students]']
    }
  },
  {
    id: 2, title: 'Menulis Pesan Singkat',
    desc: 'Bisa menulis pesan singkat kepada teman atau rekan kerja tentang rencana atau informasi mendesak.',
    rules: [
      { icon: '📝', title: 'Langsung ke Inti', rule: 'Pesan singkat tidak perlu kata-kata terlalu formal, langsung ke tujuan.', wrong: 'I hereby would like to inform you that I will be late.', correct: 'I will be 10 minutes late. Sorry!' }
    ],
    fix: [
      { broken: 'see u at five o clock.', hint: 'Gunakan kapital di awal kalimat dan akhiri dengan titik', answer: 'See you at five o\'clock.' },
      { broken: 'i am wait at the bus stop', hint: 'Gunakan V-ing setelah am', answer: 'I am waiting at the bus stop.' }
    ],
    build: [
      { prompt: 'See you ___ tomorrow.', blank: 'tomorrow', options: ['yesterday', 'tomorrow', 'now'], answer: 'tomorrow' },
      { prompt: 'I will be ___ for 10 minutes.', blank: 'late', options: ['late', 'later', 'lately'], answer: 'late' }
    ],
    quizTemplates: [
      { q: 'Pesan informal ke teman: {v}', opts: ['I await your arrival.', 'See you at 5!', 'Please arrive promptly.'], ans: 'See you at 5!', exp: 'Frasa "See you at 5!" adalah sapaan kasual untuk teman.' },
      { q: 'Cara memberi tahu Anda telat: {v}', opts: ['I am late 5 mins.', 'I will be 5 minutes late.', 'Late me 5 minutes.'], ans: 'I will be 5 minutes late.', exp: '"I will be [time] late" adalah struktur yang lazim.' }
    ],
    writingTask: {
      title: 'Kirim Pesan ke Teman',
      desc: 'Tulis pesan singkat meminta teman menunggu di halte.',
      guide: ['1. [Wait for me]', '2. [at the bus stop]', '3. [I am coming]']
    }
  },
  {
    id: 3, title: 'Menulis Catatan Mendesak',
    desc: 'Membuat pesan darurat yang informatif namun ringkas (contoh: minta tolong, info batal janji).',
    rules: [
      { icon: '⚠️', title: 'Jelaskan Alasan', rule: 'Berikan rincian singkat mengapa pesannya mendesak.', wrong: 'I cannot come.', correct: 'I cannot come because I am sick.' }
    ],
    fix: [
      { broken: 'please call me as soon', hint: 'Lengkapi frasa menjadi "as soon as possible"', answer: 'Please call me as soon as possible.' },
      { broken: 'it is emergency', hint: 'Tambahkan artikel "an"', answer: 'It is an emergency.' }
    ],
    build: [
      { prompt: 'Please call me ___ as possible.', blank: 'as soon', options: ['as late', 'as soon', 'very fast'], answer: 'as soon' }
    ],
    quizTemplates: [
      { q: 'Kalimat mana yang menunjukkan kedaruratan? {v}', opts: ['I like ice cream.', 'Call me immediately!', 'See you tomorrow.'], ans: 'Call me immediately!', exp: '"Immediately" berarti dengan segera/mendesak.' }
    ],
    writingTask: {
      title: 'Tinggalkan Catatan Meding',
      desc: 'Tulis catatan untuk ibumu karena kau harus ke rumah sakit (darurat).',
      guide: ['1. [Mom,]', '2. [I have to go to the hospital.]', '3. [Please call me.]']
    }
  },
  {
    id: 4, title: 'Menulis Email Sederhana',
    desc: 'Membuat email dasar dengan Subject, Salam Pembuka, dan Penutup.',
    rules: [
      { icon: '📧', title: 'Gunakan Subject', rule: 'Jangan pernah kosongkan baris subjek.', wrong: '(No Subject)', correct: 'Pertanyaan tentang Jadwal Meeting' }
    ],
    fix: [
      { broken: 'dear mr john.', hint: 'Akhiri salam pembuka dengan koma', answer: 'Dear Mr. John,' },
      { broken: 'regards budi', hint: 'Pisahkan dengan koma dan baris baru (atau cukup tambah koma)', answer: 'Regards, Budi.' }
    ],
    build: [
      { prompt: '___ Mr. Smith,', blank: 'Dear', options: ['Sincerely', 'Hello to', 'Dear'], answer: 'Dear' }
    ],
    quizTemplates: [
      { q: 'Salam pembuka email profesional: {v}', opts: ['Hey John!', 'Dear Mr. Smith,', 'What is up bro'], ans: 'Dear Mr. Smith,', exp: 'Gunakan "Dear" diikuti nama keluarga.' }
    ],
    writingTask: {
      title: 'Kirim Email',
      desc: 'Tulis email meminta izin tidak masuk kelas.',
      guide: ['1. Dear Mr. ...,', '2. I cannot attend the class.', '3. Regards, ...']
    }
  },
  {
    id: 5, title: 'Surat Pribadi (Terima Kasih)',
    desc: 'Mengekspresikan rasa terima kasih yang spesifik melalui kartu atau pesan.',
    rules: [
      { icon: '🎁', title: 'Sebutkan Hadiahnya', rule: 'Beritahu mereka apa yang kamu syukuri.', wrong: 'Thanks for everything.', correct: 'Thank you for the beautiful watch.' }
    ],
    fix: [
      { broken: 'thank you for gift.', hint: 'Tambahkan "the" di depan gift', answer: 'Thank you for the gift.' }
    ],
    build: [
      { prompt: 'Thank you ___ helping me.', blank: 'for', options: ['to', 'for', 'at'], answer: 'for' }
    ],
    quizTemplates: [
      { q: 'Cara bilang terima kasih untuk bantuan: {v}', opts: ['Thanks to help me.', 'Thank you for your help.', 'Thanks your help.'], ans: 'Thank you for your help.', exp: 'Struktur yang benar: "Thank you for" + noun/v-ing.' }
    ],
    writingTask: {
      title: 'Tulis Kartu Ucapan',
      desc: 'Berterima kasih kepada nenek untuk kado ulang tahun.',
      guide: ['1. Dear Grandma,', '2. Thank you for the book.', '3. I love it!']
    }
  },
  {
    id: 6, title: 'Surat Pribadi (Undangan)',
    desc: 'Mengundang teman ke acara atau pesta dengan mencantumkan detail Waktu & Tempat.',
    rules: [
      { icon: '📅', title: 'Waktu dan Tempat Wajib', rule: 'Tanpanya, tamu tak akan bisa datang!', wrong: 'Come to my party!', correct: 'Come to my party on Sunday at 7 PM.' }
    ],
    fix: [
      { broken: 'my party is in sunday.', hint: 'Gunakan "on" untuk hari', answer: 'My party is on Sunday.' }
    ],
    build: [
      { prompt: 'The party starts ___ 8 PM.', blank: 'at', options: ['on', 'in', 'at'], answer: 'at' }
    ],
    quizTemplates: [
      { q: 'Preposisi untuk waktu (Jam): {v}', opts: ['in', 'on', 'at'], ans: 'at', exp: 'Jam selalu menggunakan "at".' }
    ],
    writingTask: {
      title: 'Buat Undangan Ulang Tahun',
      desc: 'Undang temanmu ke pesta di rumahmu jam 4 sore.',
      guide: ['1. Please come to my party.', '2. When: Saturday at 4 PM.', '3. Where: My house.']
    }
  },
  {
    id: 7, title: 'Mendeskripsikan Sesuatu/Seseorang',
    desc: 'Menulis deskripsi fisik dan sifat seseorang menggunakan adjectives.',
    rules: [
      { icon: '👱‍♀️', title: 'Kata Sifat (Adjective)', rule: 'Gunakan adjective sebelum kata benda atau sesudah To Be.', wrong: 'He has hair short.', correct: 'He has short hair.' }
    ],
    fix: [
      { broken: 'she is girl beautiful.', hint: 'Adjective mendahului Noun', answer: 'She is a beautiful girl.' }
    ],
    build: [
      { prompt: 'My friend is very ___.', blank: 'tall', options: ['tall', 'height', 'taller'], answer: 'tall' }
    ],
    quizTemplates: [
      { q: 'Susunan kalimat sifat yang benar: {v}', opts: ['My cat is very fat.', 'My cat is fat very.', 'Fat is my cat very.'], ans: 'My cat is very fat.', exp: 'Adverb (very) ditempatkan sebelum Adjective (fat).' }
    ],
    writingTask: {
      title: 'Deskripsikan Temanmu',
      desc: 'Tulis 3 kalimat tentang ciri fisik dan sifat teman dekatmu.',
      guide: ['1. My friend is [name].', '2. He/She has [short/long] hair.', '3. He/She is [kind/funny].']
    }
  },
  {
    id: 8, title: 'Pengumuman Singkat',
    desc: 'Menulis pemberitahuan singkat namun jelas (kehilangan barang, barang dijual).',
    rules: [
      { icon: '📢', title: 'Judul yang Jelas', rule: 'Berikan headline (LOST/FOUND/FOR SALE) di awal.', wrong: 'I have a car and want to sell it.', correct: 'FOR SALE: A Blue Bicycle.' }
    ],
    fix: [
      { broken: 'lost: one keys.', hint: 'Key seharusnya tunggal jika hanya satu', answer: 'LOST: One key.' }
    ],
    build: [
      { prompt: 'Please contact me ___ 555-1234.', blank: 'at', options: ['on', 'at', 'in'], answer: 'at' }
    ],
    quizTemplates: [
      { q: 'Papan pengumuman kucing hilang sebaiknya diakhiri dengan: {v}', opts: ['Good bye.', 'Please contact 0812-xxx if found.', 'I am sad.'], ans: 'Please contact 0812-xxx if found.', exp: 'Pengumuman hilang perlu aksi yang jelas (nomor kontak).' }
    ],
    writingTask: {
      title: 'Buat Brosur Kehilangan',
      desc: 'Tulis info bahwa dompetmu hilang.',
      guide: ['1. LOST: Black Wallet.', '2. Inside: ID card and money.', '3. Please call: [Number].']
    }
  },
  {
    id: 9, title: 'Menulis Pengalaman Masa Lalu',
    desc: 'Menceritakan kegiatan kemarin atau bulan lalu dengan Verb 2 (Past Tense).',
    rules: [
      { icon: '⏳', title: 'Kata Kerja Bentuk 2', rule: 'Gunakan Past Tense untuk hal yang sudah selesai.', wrong: 'I go to Bali yesterday.', correct: 'I went to Bali yesterday.' }
    ],
    fix: [
      { broken: 'we play soccer last week.', hint: 'Bentuk lampau dari play', answer: 'We played soccer last week.' }
    ],
    build: [
      { prompt: 'Last night, I ___ a good movie.', blank: 'watched', options: ['watch', 'watched', 'watching'], answer: 'watched' }
    ],
    quizTemplates: [
      { q: 'Verb past tense dari "eat" adalah {v}', opts: ['eated', 'ate', 'eats'], ans: 'ate', exp: 'Eat adalah irregular verb, bentuk ke-2 nya ate.' }
    ],
    writingTask: {
      title: 'Cerita Akhir Pekanmu',
      desc: 'Ceritakan kejadian seru akhir pekan lalu.',
      guide: ['1. Last weekend, I ...', '2. Then we went to ...', '3. It was ...']
    }
  },
  {
    id: 10, title: 'Menulis Rencana Liburan',
    desc: 'Menulis aktivitas masa depan menggunakan will atau be going to.',
    rules: [
      { icon: '🚀', title: 'Will / Going To', rule: 'Gunakan will/going to + Verb dasar.', wrong: 'I want to will go.', correct: 'I will go.' }
    ],
    fix: [
      { broken: 'i going to the market.', hint: 'Butuh to be "am" sebelum going', answer: 'I am going to the market.' }
    ],
    build: [
      { prompt: 'They ___ travel to Japan next year.', blank: 'will', options: ['were', 'will', 'did'], answer: 'will' }
    ],
    quizTemplates: [
      { q: 'Pasangan kalimat yang benar untuk masa depan: {v}', opts: ['I am going to sleep.', 'I going to sleep.', 'I am will sleep.'], ans: 'I am going to sleep.', exp: 'Struktur be + going to + verb 1 digunakan untuk rencana masa depan.' }
    ],
    writingTask: {
      title: 'Rencana Tahun Depan',
      desc: 'Apa yang akan kau lakukan tahun depan? Tulis 3 kalimat.',
      guide: ['1. Next year, I will ...', '2. I am going to buy ...', '3. I will visit ...']
    }
  },
  {
    id: 11, title: 'Mengisi Formulir Dasar',
    desc: 'Mampu memberikan info akurat pada formulir (First Name, Surname, DOB).',
    rules: [
      { icon: '🗂️', title: 'Nama Keluarga (Surname)', rule: 'Surname/Last name berarti marga atau nama akhirmu.', wrong: 'First Name: Smith, Surname: John', correct: 'First Name: John, Surname: Smith' }
    ],
    fix: [
      { broken: 'dob: july', hint: 'Date of Birth (DOB) butuh tanggal lengkap', answer: 'DOB: July 15, 2005' }
    ],
    build: [
      { prompt: 'State your ___ (Place where you live).', blank: 'address', options: ['name', 'address', 'age'], answer: 'address' }
    ],
    quizTemplates: [
      { q: 'Arti dari tulisan "Gender / Sex" di formulir: {v}', opts: ['Nama Anda', 'Jenis Kelamin', 'Umur'], ans: 'Jenis Kelamin', exp: 'Male / Female' }
    ],
    writingTask: {
      title: 'Isi Data Diri',
      desc: 'Lengkapi simulasi pengisian formulir asrama ini.',
      guide: ['First Name: ...', 'Surname: ...', 'Date of Birth (DOB): ...', 'Address: ...', 'Phone: ...']
    }
  },
  {
    id: 12, title: 'Review Sederhana',
    desc: 'Memberikan pendapat tentang makanan, buku, film, menggunakan kata sifat positif/negatif.',
    rules: [
      { icon: '⭐', title: 'Berikan Pendapatmu', rule: 'Gunakan frasa I think, I like, atau I don’t like.', wrong: 'The film.', correct: 'I think the film is great.' }
    ],
    fix: [
      { broken: 'the food are bad.', hint: 'Food adalah non-countable (tunggal), gunakan is', answer: 'The food is bad.' }
    ],
    build: [
      { prompt: 'I highly ___ this restaurant!', blank: 'recommend', options: ['hate', 'recommend', 'go'], answer: 'recommend' }
    ],
    quizTemplates: [
      { q: 'Kata untuk menyatakan sangat menyukai: {v}', opts: ['I hate it.', 'It is awful.', 'It is amazing!'], ans: 'It is amazing!', exp: 'Amazing adalah sentimen positif.' }
    ],
    writingTask: {
      title: 'Ulas Restoran Favorit',
      desc: 'Tulis kenapa kamu suka makan di sana.',
      guide: ['1. The food is ...', '2. The price is ...', '3. You should try the ...']
    }
  },
  {
    id: 13, title: 'Memberi Arahan/Instruksi',
    desc: 'Menulis teks panduan singkat yang urut dan imperatif.',
    rules: [
      { icon: '🚦', title: 'Gunakan Kata Kerja Perintah', rule: 'Kalimat tidak butuh awalan Subjek (I/You).', wrong: 'You go to the left.', correct: 'Go to the left.' }
    ],
    fix: [
      { broken: 'turning right at the corner.', hint: 'Bentuk perintah harus pakai verb 1 murni tanpa -ing', answer: 'Turn right at the corner.' }
    ],
    build: [
      { prompt: '___ straight for 200 meters.', blank: 'Go', options: ['Goes', 'Going', 'Go'], answer: 'Go' }
    ],
    quizTemplates: [
      { q: 'Arahkan seseorang untuk berputar balik: {v}', opts: ['Go straight', 'Turn around', 'Stop'], ans: 'Turn around', exp: 'Turn around = U-turn atau berputar arah.' }
    ],
    writingTask: {
      title: 'Tulis Arah Jalan',
      desc: 'Jelaskan cara mencari kamar mandimu dari ruang tamu.',
      guide: ['1. Go straight.', '2. Turn ...', '3. It is on your ...']
    }
  },
  {
    id: 14, title: 'Membalas Undangan',
    desc: 'Menerima atau secara sopan menolak ajakan orang lain (RSVP).',
    rules: [
      { icon: '🤝', title: 'Bersikap Sopan', rule: 'Selalu berterima kasih walau kau menolak.', wrong: 'No, I hate parties.', correct: 'Thank you, but I can\'t come.' }
    ],
    fix: [
      { broken: 'thanks for invite me.', hint: 'Setelah preposisi (for) gunakan V-ing', answer: 'Thanks for inviting me.' }
    ],
    build: [
      { prompt: 'I would ___ to come.', blank: 'love', options: ['loving', 'love', 'liked'], answer: 'love' }
    ],
    quizTemplates: [
      { q: 'Cara paling sopan menolak: {v}', opts: ['I won\'t go.', 'I am sorry, but I am busy.', 'No.'], ans: 'I am sorry, but I am busy.', exp: 'Berikan maaf lalu alasannya.' }
    ],
    writingTask: {
      title: 'Balas Temanmu',
      desc: 'Tulis pesan singkat menerangkan kalau kau bersedia datang.',
      guide: ['1. Thank you for inviting me.', '2. Yes, I will come.', '3. See you at ...']
    }
  },
  {
    id: 15, title: 'Review Menulis Keseluruhan',
    desc: 'Ujian akhir untuk semua materi Elementary Writing yang telah dipelajari.',
    rules: [
      { icon: '🏁', title: 'Cek Ulang (Proofread)', rule: 'Selalu pastikan kapitalisasi, ejaan, & tanda baca benar sebelum mengirim tulisan.', wrong: 'i is done', correct: 'I am done.' }
    ],
    fix: [
      { broken: 'thnks u so much', hint: 'Gunakan ejaan yang benar', answer: 'Thank you so much.' }
    ],
    build: [
      { prompt: 'Always double-check your ___.', blank: 'spelling', options: ['eyes', 'spelling', 'shoes'], answer: 'spelling' }
    ],
    quizTemplates: [
      { q: 'Bentuk paling benar: {v}', opts: ['im sorry.', 'I am sorry.', 'i am Sorry.'], ans: 'I am sorry.', exp: 'Awal kapital (I) dan titik di akhir tanpa salah kapitalisasi kata.' }
    ],
    writingTask: {
      title: 'Tugas Akhir',
      desc: 'Tulis keseluruhan surat perkenalan, aktivitas hari ini, dan satu pujian (sekitar 3-5 kalimat).',
      guide: ['1. Hello, my name is ...', '2. Today I am ...', '3. ...']
    }
  }
];

function generateFileContent(lesson) {
  // Ensure array has exactly 20 items using generic duplication for missing items
  const quizSet = expandQuiz(lesson.quizTemplates, 20);

  const quizString = JSON.stringify(quizSet, null, 2).replace(/"([^"]+)":/g, '$1:');
  const fixString = JSON.stringify(lesson.fix, null, 2).replace(/"([^"]+)":/g, '$1:');
  const buildString = JSON.stringify(lesson.build, null, 2).replace(/"([^"]+)":/g, '$1:');
  const rulesString = JSON.stringify(lesson.rules, null, 2).replace(/"([^"]+)":/g, '$1:');

  return `import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircleIcon, XCircleIcon, StarIcon } from '../../../../../components/Icons';

const WRITING_STORAGE_KEY = 'talky_elementary_writing_completed';
function getCompletedWritingLessons(): number[] { try { return JSON.parse(localStorage.getItem(WRITING_STORAGE_KEY) || '[]'); } catch { return []; } }
function markWritingComplete(id: number) { const d = getCompletedWritingLessons(); if (!d.includes(id)) localStorage.setItem(WRITING_STORAGE_KEY, JSON.stringify([...d, id])); }

const RULES = ${rulesString};
const FIX_SENTENCES = ${fixString};
const BUILD_ITEMS = ${buildString};
const QUIZ = ${quizString};

function QuizSection({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  const check = (opt: string) => { if (checked) return; setSelected(opt); setChecked(true); if (opt === QUIZ[step].ans) setScore(s => s + 1); };
  const next = () => { if (step < QUIZ.length - 1) { setStep(s => s + 1); setSelected(null); setChecked(false); } else setDone(true); };
  const restart = () => { setStep(0); setScore(0); setDone(false); setSelected(null); setChecked(false); };

  if (done) return (
    <div className="text-center py-8 max-w-md mx-auto">
      <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4"><StarIcon className="w-12 h-12 text-amber-500" /></div>
      <h2 className="text-2xl font-bold text-slate-800 mb-1">Kuis Selesai! 🎉</h2>
      <p className="text-slate-500 mb-1">Skor kamu: <span className="font-extrabold text-amber-600 text-2xl">{score}</span> / {QUIZ.length}</p>
      <p className="text-sm text-slate-400 mb-6">{score >= 16 ? '🏆 Luar biasa!' : score >= 12 ? '👍 Bagus!' : '📚 Terus berlatih!'}</p>
      <button onClick={restart} className="px-6 py-3 bg-amber-500 text-white rounded-xl font-bold mr-3">Ulangi</button>
      <button onClick={onComplete} className="px-6 py-3 bg-green-500 text-white rounded-xl font-bold">Tandai Selesai ✓</button>
    </div>
  );

  const q = QUIZ[step];
  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-amber-100">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-bold text-slate-400">Pertanyaan {step + 1}/{QUIZ.length}</span>
          <span className="text-xs font-bold bg-amber-50 text-amber-600 px-2 py-1 rounded-lg">Skor: {score}</span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full mb-5 overflow-hidden">
          <div className="h-full bg-amber-500 transition-all rounded-full" style={{ width: \`\${((step + 1) / QUIZ.length) * 100}%\` }} />
        </div>
        <h3 className="text-base font-bold text-slate-800 mb-5">{q.q}</h3>
        <div className="space-y-2.5">
          {q.opts.map((o, i) => {
            let cls = 'border-slate-200 hover:border-amber-400 hover:bg-amber-50 cursor-pointer';
            if (checked) { if (o === q.ans) cls = 'bg-green-50 border-green-400 text-green-800'; else if (o === selected) cls = 'bg-red-50 border-red-400 text-red-700'; else cls = 'opacity-40 border-slate-100'; }
            return (
              <button key={i} onClick={() => check(o)} disabled={checked} className={\`w-full p-3.5 rounded-xl border-2 text-left text-sm font-medium transition-all flex items-center justify-between \${cls}\`}>
                <span>{o}</span>
                {checked && o === q.ans && <CheckCircleIcon className="w-5 h-5 text-green-600 shrink-0" />}
                {checked && o === selected && o !== q.ans && <XCircleIcon className="w-5 h-5 text-red-500 shrink-0" />}
              </button>
            );
          })}
        </div>
        {checked && (
          <div className="mt-4">
            <div className={\`p-3 rounded-xl text-sm mb-4 \${selected === q.ans ? 'bg-green-50 text-green-800 border border-green-100' : 'bg-orange-50 text-orange-800 border border-orange-100'}\`}>
              💡 {q.exp}
            </div>
            <button onClick={next} className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-700 transition-all">
              {step < QUIZ.length - 1 ? 'Selanjutnya →' : 'Lihat Hasil'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function WritingSection() {
  const [userAnswers, setUserAnswers] = useState<string[]>(FIX_SENTENCES.map(() => ''));
  const [checked, setChecked] = useState<boolean[]>(FIX_SENTENCES.map(() => false));
  const [buildAnswer, setBuildAnswer] = useState<string[]>(BUILD_ITEMS.map(() => ''));

  const checkSentence = (i: number) => { const newChecked = [...checked]; newChecked[i] = true; setChecked(newChecked); };
  const isCorrect = (i: number) => userAnswers[i].trim().toLowerCase() === FIX_SENTENCES[i].answer.toLowerCase();

  return (
    <div className="space-y-8 max-w-xl mx-auto">
      <div>
        <div className="flex items-center gap-2 mb-4"><span className="text-xl">✏️</span><h2 className="text-base font-extrabold text-slate-800">Perbaiki Kalimat Berikut</h2></div>
        <div className="space-y-4">
          {FIX_SENTENCES.map((item, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
              <div className="flex items-start gap-2 mb-2"><span className="text-red-400 text-lg mt-0.5">❌</span><p className="text-sm font-mono text-slate-600 bg-red-50 px-3 py-1.5 rounded-lg flex-1">"{item.broken}"</p></div>
              <p className="text-xs text-amber-600 mb-2 pl-7">💡 {item.hint}</p>
              <div className="pl-7">
                <input type="text" value={userAnswers[i]} onChange={e => { const a = [...userAnswers]; a[i] = e.target.value; setUserAnswers(a); }} placeholder="Tulis yang benar..." className={\`w-full border-2 rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-colors \${checked[i] ? isCorrect(i) ? 'border-green-400 bg-green-50 text-green-800' : 'border-red-400 bg-red-50 text-red-800' : 'border-slate-200 focus:border-amber-400'}\`}/>
                {checked[i] && !isCorrect(i) && <p className="text-xs text-green-700 mt-1.5 flex items-center justify-between"><span>✅ Jawaban: <span className="font-mono">{item.answer}</span></span> <button onClick={()=>setChecked([...checked.slice(0,i), false, ...checked.slice(i+1)])} className="text-[10px] bg-slate-200 px-2 py-0.5 rounded-md">coba lagi</button></p>}
                {!checked[i] && <button onClick={() => checkSentence(i)} className="mt-2 px-4 py-1.5 bg-amber-500 text-white rounded-lg text-xs font-bold hover:bg-amber-600">Periksa</button>}
                {checked[i] && isCorrect(i) && <p className="text-xs text-green-700 mt-1.5 font-bold">✅ Benar! Bagus sekali!</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="flex items-center gap-2 mb-4"><span className="text-xl">🔡</span><h2 className="text-base font-extrabold text-slate-800">Pilih Kata yang Tepat</h2></div>
        <div className="space-y-4">
          {BUILD_ITEMS.map((item, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
              <p className="text-sm font-semibold text-slate-700 mb-3">{item.prompt.replace('___', buildAnswer[i] ? \`[\${buildAnswer[i]}]\` : '___')}</p>
              <div className="flex gap-2 flex-wrap">
                {item.options.map(opt => (
                  <button key={opt} onClick={() => { const a = [...buildAnswer]; a[i] = opt; setBuildAnswer(a); }} className={\`px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all \${buildAnswer[i] === opt ? opt === item.answer ? 'bg-green-100 border-green-500 text-green-800' : 'bg-red-100 border-red-400 text-red-700' : 'border-slate-200 hover:border-amber-400 hover:bg-amber-50'}\`}>{opt}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="flex items-center gap-2 mb-4"><span className="text-xl">📝</span><h2 className="text-base font-extrabold text-slate-800">${lesson.writingTask.title}</h2></div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500 mb-4">${lesson.writingTask.desc}</p>
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 mb-4 text-xs text-amber-700">
            <p className="font-bold mb-1">📌 Panduan:</p>
            ${lesson.writingTask.guide.map(g => `<p>${g}</p>`).join('\n            ')}
          </div>
          <textarea rows={5} placeholder="Tulis di sini..." className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400 resize-none" />
        </div>
      </div>
    </div>
  );
}

const ElementaryWritingLesson${lesson.id}: React.FC = () => {
  const navigate = useNavigate();
  const nextPath = '${lesson.id < 15 ? `/modul/english/elementary/writing/lesson-${lesson.id + 1}` : '/modul/english/elementary/writing'}';
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedWritingLessons().includes(${lesson.id}));
  const [showModal, setShowModal] = React.useState(false);
  const [activeTab, setActiveTab] = useState<'learn' | 'menulis' | 'kuis'>('learn');

  const handleComplete = () => { markWritingComplete(${lesson.id}); setIsCompleted(true); setShowModal(true); };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)' }} onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg,#F39C12,#E67E22)' }}><span style={{ fontSize: 38 }}>🏆</span></div>
            <h2 className="text-xl font-extrabold text-slate-900 mb-1">Lesson ${lesson.id} Selesai! 🎉</h2>
            <div className="flex gap-3 mt-5">
              <button onClick={() => { setShowModal(false); navigate(nextPath); }} className="flex-1 py-3 rounded-xl font-bold text-white" style={{ background: '#F39C12' }}>${lesson.id < 15 ? 'Lesson ' + (lesson.id + 1) + ' ›' : 'Menu'}</button>
              <button onClick={() => { setShowModal(false); navigate(-1); }} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700">Kembali</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col h-[100dvh] md:h-full bg-slate-50">
        <header className="flex-none bg-white/95 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100 shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg></button>
            <div className="text-center">
              <h1 className="text-sm font-bold text-slate-800">${lesson.title}</h1>
              <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">A2 Writing • Lesson ${lesson.id}</p>
            </div>
            <button onClick={() => navigate(nextPath)} className="px-3 h-9 rounded-full text-xs font-bold text-white" style={{ background: '#F39C12' }}>Next ›</button>
          </div>
        </header>

        <div className="flex bg-white border-b border-slate-100 sticky top-[65px] z-10 shadow-sm">
          {([['learn', '📖 Materi'], ['menulis', '✏️ Menulis'], ['kuis', '🎯 Kuis']] as const).map(([tab, label]) => (
            <button key={tab} onClick={() => setActiveTab(tab as typeof activeTab)} className={\`flex-1 py-3 text-xs font-bold tracking-wide transition-all \${activeTab === tab ? 'text-amber-600 border-b-2 border-amber-500' : 'text-slate-400'}\`}>{label as string}</button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 pb-28 space-y-5">
            {activeTab === 'learn' && (
              <>
                <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-red-400 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
                  <div className="absolute -top-4 -right-4 text-6xl opacity-10">✏️</div>
                  <h2 className="text-lg font-extrabold mb-1">${lesson.title}</h2>
                  <p className="text-sm text-amber-100">${lesson.desc}</p>
                </div>

                <div className="space-y-3">
                  {RULES.map((r, i) => (
                    <div key={i} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">{r.icon}</span>
                        <div><h3 className="font-extrabold text-slate-800 text-sm">{r.title}</h3><p className="text-xs text-slate-500">{r.rule}</p></div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-red-50 rounded-xl px-3 py-2 text-xs"><p className="text-red-400 font-bold mb-0.5">❌ Salah</p><p className="text-red-700 font-mono">{r.wrong}</p></div>
                        <div className="bg-green-50 rounded-xl px-3 py-2 text-xs"><p className="text-green-500 font-bold mb-0.5">✅ Benar</p><p className="text-green-700 font-mono font-bold">{r.correct}</p></div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeTab === 'menulis' && <WritingSection />}
            {activeTab === 'kuis' && <QuizSection onComplete={handleComplete} />}
          </div>
        </div>

        <div className="sticky bottom-0 z-30 bg-white/90 backdrop-blur-xl border-t border-gray-100 px-4 py-3">
          <button onClick={isCompleted ? () => navigate(-1) : handleComplete} className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all" style={{ background: isCompleted ? 'linear-gradient(135deg,#26C76D,#1ea85a)' : 'linear-gradient(135deg,#F39C12,#E67E22)' }}>
            {isCompleted ? '✅ Sudah Selesai' : '✅ Tandai Selesai'}
          </button>
        </div>
      </div>
    </>
  );
};

export default ElementaryWritingLesson${lesson.id};
`;
}

LESSONS.forEach(lesson => {
  const content = generateFileContent(lesson);
  fs.writeFileSync(path.join(DIR, `Lesson${lesson.id}.tsx`), content, 'utf8');
  console.log(`Generated Lesson ${lesson.id}`);
});

// Generate Landing Page
const PAGE_CONTENT = `import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../../../../../components/layout/PageContainer';
import { PageHeader } from '../../../../../components/shared/NavComponents';
import { CheckCircleIcon } from '../../../../../components/Icons';

const WRITING_STORAGE_KEY = 'talky_elementary_writing_completed';
function getCompletedWritingLessons(): number[] { try { return JSON.parse(localStorage.getItem(WRITING_STORAGE_KEY) || '[]'); } catch { return []; } }

export default function ElementaryWritingPage() {
  const navigate = useNavigate();
  const completed = getCompletedWritingLessons();
  const total = 15;
  const progress = Math.round((completed.length / total) * 100) || 0;

  return (
    <PageContainer>
      <div className="pb-28 md:pb-8">
        <PageHeader titleKey="skill.writing" subtitleKey="skill.writingSub" />

        <div className="px-5 mb-8">
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 opacity-5 rounded-full blur-3xl" />
            <div className="flex justify-between items-end mb-4 relative z-10">
              <div><h2 className="text-xl font-extrabold text-slate-800">Menulis (A2)</h2><p className="text-sm text-slate-500 font-medium mt-1">{completed.length} dari {total} bab selesai</p></div>
              <div className="text-right"><span className="text-3xl font-black text-blue-500">{progress}%</span></div>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden relative z-10">
              <div className="bg-blue-500 h-full rounded-full transition-all duration-1000" style={{ width: \`\${progress}%\` }} />
            </div>
          </div>
        </div>

        <div className="px-5 mb-5 space-y-3">
          <h2 className="text-base font-extrabold text-slate-800 mb-4 px-1">Daftar Materi</h2>
          {[...Array(total)].map((_, i) => {
            const id = i + 1;
            const isCompleted = completed.includes(id);
            const isAvailable = true;

            return (
              <button key={id} disabled={!isAvailable} onClick={() => isAvailable && navigate(\`/modul/english/elementary/writing/lesson-\${id}\`)} className={\`w-full flex items-center justify-between p-4 rounded-2xl border transition-all \${isAvailable ? isCompleted ? 'border-green-100 bg-green-50 shadow-sm hover:border-green-300' : 'border-blue-100 bg-white shadow-sm hover:border-blue-400' : 'border-slate-100 bg-slate-50 opacity-60 cursor-not-allowed'}\`}>
                <div className="flex items-center gap-4">
                  <div className={\`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold shadow-sm \${isCompleted ? 'bg-green-500 text-white' : isAvailable ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-400'}\`}>
                    {isCompleted ? <CheckCircleIcon className="w-6 h-6" /> : !isAvailable ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg> : id}
                  </div>
                  <div className="text-left">
                    <h3 className={\`font-bold text-[15px] \${isAvailable ? 'text-slate-800' : 'text-slate-500'}\`}>A2 Writing • Latihan {id}</h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">{isCompleted ? 'Tuntas' : '20 Latihan & Menulis'}</p>
                  </div>
                </div>
                {isAvailable && !isCompleted && <div className="text-blue-500"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg></div>}
              </button>
            );
          })}
        </div>
      </div>
    </PageContainer>
  );
}
`;

fs.writeFileSync(path.join(DIR, 'ElementaryWritingPage.tsx'), PAGE_CONTENT, 'utf8');
console.log('Done script configuration!');
