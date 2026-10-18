import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine, PostcardWriter, HotelForm } from './writingUtils';
import type { QuizItem, FormField } from './writingUtils';

const WRITING_STORAGE_KEY = 'talky_beginner_writing_completed';
function getCompletedWritingLessons(): number[] { try { return JSON.parse(localStorage.getItem(WRITING_STORAGE_KEY) || '[]'); } catch { return []; } }
function markWritingComplete(id: number) { const d = getCompletedWritingLessons(); if (!d.includes(id)) localStorage.setItem(WRITING_STORAGE_KEY, JSON.stringify([...d, id])); }

const FINAL_QUIZ: QuizItem[] = [
  { q: 'Alfabet Inggris terdiri dari berapa huruf?', opts: ['25', '26', '24'], ans: '26', exp: 'A–Z = 26 huruf.' },
  { q: '"12" dalam bahasa Inggris?', opts: ['twenty', 'twelfth', 'twelve'], ans: 'twelve', exp: '12 = twelve.' },
  { q: '"Dia (pr) adalah guruku." → ___ is my teacher.', opts: ['He', 'She', 'It'], ans: 'She', exp: '"She" untuk perempuan.' },
  { q: '"Saya berusia 20 tahun." ditulis...', opts: ['I am 20 years old.', 'I have 20 years.', 'I am 20 age.'], ans: 'I am 20 years old.', exp: 'Pola: I am + umur + years old.' },
  { q: '"Ibu" dalam bahasa Inggris?', opts: ['mother', 'aunt', 'father'], ans: 'mother', exp: '"Mother" = ibu.' },
  { q: '"Merah" dalam bahasa Inggris?', opts: ['red', 'green', 'blue'], ans: 'red', exp: '"Red" = merah.' },
  { q: '"Saya suka minum teh." ditulis...', opts: ["I don't like tea.", 'I like tea.', 'I am like tea.'], ans: 'I like tea.', exp: '"I like + noun." = pola yang benar.' },
  { q: '"Di pagi hari" dalam bahasa Inggris?', opts: ['in the morning', 'at morning', 'on morning'], ans: 'in the morning', exp: '"In the morning" = di pagi hari.' },
  { q: '"Belok kanan" dalam bahasa Inggris?', opts: ['Turn right', 'Go straight', 'Turn left'], ans: 'Turn right', exp: '"Turn right" = belok kanan.' },
  { q: '"My name is Budi." Yang benar adalah...', opts: ['My name is Budi.', 'My Name Is Budi.', 'my name is budi.'], ans: 'My name is Budi.', exp: 'Awal kalimat & nama orang = kapital; diakhiri titik.' },
  { q: '"Segitiga" dalam bahasa Inggris?', opts: ['square', 'triangle', 'circle'], ans: 'triangle', exp: '"Triangle" = segitiga.' },
  { q: '"1st" dibaca...', opts: ['onest', 'first', 'one-st'], ans: 'first', exp: '1st = first (pertama, ordinal number).' },
  { q: '"Nationality" dalam formulir hotel artinya...', opts: ['Kewarganegaraan', 'Alamat', 'Nama lengkap'], ans: 'Kewarganegaraan', exp: '"Nationality" = kewarganegaraan.' },
  { q: '"Kami" dalam bahasa Inggris?', opts: ['We', 'I', 'They'], ans: 'We', exp: '"We" = kami/kita.' },
  { q: '"Saya makan sarapan jam 7." ditulis...', opts: ['I eating 7 breakfast.', 'I eat breakfast at 7 AM.', 'I am eat breakfast 7.'], ans: 'I eat breakfast at 7 AM.', exp: 'Simple Present + at + waktu.' },
  { q: '"Bibi" dalam bahasa Inggris?', opts: ['aunt', 'uncle', 'sister'], ans: 'aunt', exp: '"Aunt" = bibi.' },
  { q: '"Saya tidak suka kopi." ditulis...', opts: ["I don't like coffee.", "I am not like coffee.", "I no like coffee."], ans: "I don't like coffee.", exp: '"I don\'t like" = saya tidak suka.' },
  { q: '"Saya tinggal di Bandung." ditulis...', opts: ['I live at Bandung.', 'I am in Bandung.', 'I live in Bandung.'], ans: 'I live in Bandung.', exp: '"In" untuk kota/negara.' },
  { q: 'Tanda baca untuk kalimat tanya?', opts: ['!', '.', '?'], ans: '?', exp: 'Kalimat tanya diakhiri tanda tanya (?).' },
  { q: 'Kalimat yang BENAR dengan possessive pronoun...', opts: ['Me name is Sari.', 'My name is Sari.', 'I name Sari.'], ans: 'My name is Sari.', exp: '"My" = possessive dari "I." Pola: My name is...' },
];

/* ─── FINAL POSTCARD ─── */
const FINAL_POSTCARD_FIELDS = [
  { id: 'greeting', label: 'Greeting / Salam', placeholder: 'e.g. Dear [Name], / Hi [Name]!', hint: 'Sapa pinerimamu dengan hangat.' },
  { id: 'location', label: 'Location & First Impression', placeholder: 'e.g. I am in [place]. It is [description]!', hint: 'Di mana kamu dan kesan pertamamu.' },
  { id: 'activities', label: 'Activities (Kegiatanmu)', placeholder: 'e.g. Yesterday I visited... Today I ate...', multiline: true, hint: 'Ceritakan apa yang kamu lakukan di sana.' },
  { id: 'feelings', label: 'Feelings (Perasaanmu)', placeholder: 'e.g. I feel very happy here. I miss you!', hint: 'Ungkapkan perasaanmu.' },
  { id: 'closing', label: 'Closing / Penutup', placeholder: 'e.g. See you soon! With love,', hint: 'Tutup kartumu dengan hangat.' },
  { id: 'your_name', label: 'Your Name / Namamu', placeholder: 'Namamu' },
  { id: 'to_name', label: 'To / Kepada', placeholder: 'Nama dan gelar penerima' },
  { id: 'to_address', label: 'Street Address', placeholder: 'Jl. ___ No. ___, ___' },
  { id: 'to_city', label: 'City, ZIP, Country', placeholder: 'Kota, Kode Pos, Indonesia' },
];

const FINAL_POSTCARD_EXAMPLE = {
  greeting: 'Dear Mom and Dad,',
  location: 'I am in Singapore now! This city is amazing. The buildings are very tall and everything is so clean and organized.',
  activities: 'Yesterday I visited Marina Bay Sands and the Gardens by the Bay. The flowers at the gardens are colorful and beautiful. I also ate delicious laksa at a hawker centre today — it is spicy but very yummy!',
  feelings: 'I feel so happy and excited here. The weather is warm and sunny. I miss you both and I will bring you some chocolates!',
  closing: 'With love and hugs,',
  your_name: 'Budi',
  to_name: 'Mr. & Mrs. Santoso Wijaya',
  to_address: 'Jl. Pahlawan No. 8, RT 02/05',
  to_city: 'Surabaya, 60111, Indonesia',
};

/* ─── FINAL HOTEL FORM ─── */
const FINAL_HOTEL_FIELDS: FormField[] = [
  { id: 'title', label: 'Title', placeholder: 'Select...', options: ['Mr.', 'Mrs.', 'Ms.', 'Dr.', 'Prof.'], hint: 'Pilih sapaan yang sesuai.' },
  { id: 'first_name', label: 'First Name (Nama Depan)', placeholder: 'e.g. Budi', required: true },
  { id: 'last_name', label: 'Last Name (Nama Belakang)', placeholder: 'e.g. Santoso', required: true },
  { id: 'nationality', label: 'Nationality (Kewarganegaraan)', placeholder: 'e.g. Indonesian', required: true, options: ['Indonesian', 'Malaysian', 'Singaporean', 'American', 'British', 'Australian', 'Japanese', 'Korean', 'German', 'French', 'Dutch', 'Other'] },
  { id: 'dob', label: 'Date of Birth', placeholder: 'DD/MM/YYYY', type: 'date', required: true },
  { id: 'passport', label: 'Passport / ID Number', placeholder: 'e.g. A1234567', required: true },
  { id: 'address', label: 'Home Address (Alamat Rumah)', placeholder: 'e.g. Jl. Merdeka No. 5', required: true },
  { id: 'city', label: 'City (Kota Asal)', placeholder: 'e.g. Surabaya, Indonesia', required: true },
  { id: 'email', label: 'Email Address', placeholder: 'e.g. budi@email.com', type: 'email', required: true },
  { id: 'phone', label: 'Phone Number', placeholder: 'e.g. +62 812 3456 7890', required: true },
  { id: 'check_in', label: 'Check-in Date', placeholder: 'DD/MM/YYYY', type: 'date', required: true },
  { id: 'check_out', label: 'Check-out Date', placeholder: 'DD/MM/YYYY', type: 'date', required: true },
  { id: 'room', label: 'Room Type', placeholder: 'Select...', options: ['Standard Single', 'Standard Double', 'Deluxe Double', 'Twin Room', 'Junior Suite', 'Executive Suite'], required: true },
  { id: 'purpose', label: 'Purpose of Visit', placeholder: 'Select...', options: ['Tourism / Holiday', 'Business', 'Education', 'Family Visit', 'Other'] },
  { id: 'special', label: 'Special Requests (Permintaan Khusus)', placeholder: 'e.g. Non-smoking room, early check-in, etc.' },
];

/* ─── LESSON 10 MAIN ─── */
const WritingLesson10: React.FC = () => {
  const navigate = useNavigate();
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedWritingLessons().includes(10));
  const [showModal, setShowModal] = React.useState(false);
  const [activeTab, setActiveTab] = useState<'review' | 'kartupos' | 'hotel' | 'kuis'>('review');
  const handleComplete = () => { markWritingComplete(10); setIsCompleted(true); setShowModal(true); };

  const reviewItems = [
    { n: 1, icon: '🔡', title: 'Huruf & Alfabet', skill: 'Huruf kapital, tanda baca' },
    { n: 2, icon: '🔢', title: 'Angka 1–100', skill: 'Cardinal & ordinal numbers' },
    { n: 3, icon: '👤', title: 'Kata Ganti', skill: 'I, You, He, She, It, We, They + possessives' },
    { n: 4, icon: '👋', title: 'Perkenalan & Formulir Hotel', skill: 'My name is... + Hotel form' },
    { n: 5, icon: '👨‍👩‍👧', title: 'Keluarga & Kartu Pos', skill: 'Family vocab + Postcard writing' },
    { n: 6, icon: '🎨', title: 'Warna & Bentuk', skill: 'Deskripsi warna + Postcard wisata' },
    { n: 7, icon: '🍽️', title: 'Makanan & Minuman', skill: 'I like/don\'t like + Restaurant form' },
    { n: 8, icon: '⏰', title: 'Rutinitas Harian', skill: 'Simple Present + Schedule builder' },
    { n: 9, icon: '📍', title: 'Tempat & Lokasi', skill: 'Places + Postcard + Hotel form' },
  ];

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)' }} onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg,#F39C12,#E67E22)' }}><span style={{ fontSize: 46 }}>🎓</span></div>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Modul Selesai! 🏆</h2>
            <p className="text-sm text-gray-600 mb-4">Luar biasa! Kamu telah menyelesaikan seluruh <b>10 Lesson Writing Beginner</b>. Kamu sekarang bisa menulis:</p>
            <div className="bg-amber-50 rounded-xl p-3 mb-5 text-left text-sm text-amber-800 space-y-1">
              <p>✅ Kalimat dengan ejaan & tanda baca benar</p>
              <p>✅ Perkenalan diri secara tertulis</p>
              <p>✅ Kartu pos liburan yang natural</p>
              <p>✅ Formulir registrasi hotel</p>
            </div>
            <button onClick={() => { setShowModal(false); navigate('/modul/english/beginner/writing'); }} className="w-full py-3.5 rounded-xl font-bold text-white text-base" style={{ background: 'linear-gradient(135deg,#F39C12,#E67E22)' }}>
              🎉 Kembali ke Modul Writing
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col h-[100dvh] md:h-full bg-slate-50">
        <header className="flex-none bg-white/95 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100 shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg></button>
            <div className="text-center"><h1 className="text-sm font-bold text-slate-800">Penilaian Akhir</h1><p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">Writing • Lesson 10 — FINAL</p></div>
            <div className="w-10" />
          </div>
        </header>

        <div className="flex bg-white border-b border-slate-100 sticky top-[65px] z-10 shadow-sm overflow-x-auto">
          {([['review', '📋 Ulasan'], ['kartupos', '📮 Kartu Pos'], ['hotel', '🏨 Hotel'], ['kuis', '🎯 Kuis Final']] as const).map(([tab, label]) => (
            <button key={tab} onClick={() => setActiveTab(tab as typeof activeTab)} className={`flex-none px-4 py-3 text-xs font-bold tracking-wide transition-all whitespace-nowrap ${activeTab === tab ? 'text-amber-600 border-b-2 border-amber-500' : 'text-slate-400'}`}>{label as string}</button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 pb-28 space-y-5">

            {activeTab === 'review' && (
              <>
                <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-red-400 rounded-2xl p-6 text-white shadow-lg text-center relative overflow-hidden">
                  <div className="absolute -top-4 -right-4 text-8xl opacity-10">🎓</div>
                  <p className="text-4xl mb-2">🎓</p>
                  <h2 className="text-xl font-extrabold mb-1">Selamat! Kamu Hampir Selesai</h2>
                  <p className="text-sm text-amber-100">Ini adalah lesson terakhir dari Writing Beginner. Cek ulang semua yang sudah kamu pelajari!</p>
                </div>
                <div className="space-y-2">
                  {reviewItems.map(item => (
                    <div key={item.n} className="bg-white rounded-2xl px-4 py-3.5 border border-slate-100 shadow-sm flex items-center gap-4">
                      <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-xl shrink-0">{item.icon}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-extrabold text-slate-800">Lesson {item.n}: {item.title}</p>
                        <p className="text-xs text-slate-500 truncate">{item.skill}</p>
                      </div>
                      <span className="text-green-500 shrink-0 text-lg">✅</span>
                    </div>
                  ))}
                </div>
                <div className="bg-green-50 border border-sky-100 rounded-2xl p-5 text-center">
                  <p className="text-2xl mb-2">🏆</p>
                  <h3 className="font-extrabold text-green-800 mb-2">Kamu Sudah Bisa Melakukan Ini!</h3>
                  <div className="text-sm text-green-700 space-y-1 text-left mb-4">
                    <p>✦ Menulis kartu pos pendek & sederhana untuk mengirim salam liburan</p>
                    <p>✦ Mengisi formulir dengan data pribadi (nama, kewarganegaraan, alamat)</p>
                    <p>✦ Menulis perkenalan diri dalam bahasa Inggris</p>
                    <p>✦ Menggunakan ejaan dan tanda baca yang benar</p>
                  </div>
                  <div className="flex gap-2 justify-center flex-wrap">
                    <button onClick={() => setActiveTab('kartupos')} className="px-4 py-2 bg-amber-500 text-white rounded-xl text-xs font-bold">📮 Tulis Kartu Pos</button>
                    <button onClick={() => setActiveTab('hotel')} className="px-4 py-2 bg-slate-700 text-white rounded-xl text-xs font-bold">🏨 Isi Formulir Hotel</button>
                    <button onClick={() => setActiveTab('kuis')} className="px-4 py-2 bg-green-500 text-white rounded-xl text-xs font-bold">🎯 Kuis Final</button>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'kartupos' && (
              <div className="space-y-4 max-w-xl mx-auto">
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100 rounded-2xl p-4">
                  <p className="font-bold text-amber-800 text-sm mb-1">🎯 Tantangan Final — Kartu Pos Liburan!</p>
                  <p className="text-sm text-amber-700">Tulis kartu pos liburan yang lengkap dari destinasi pilihanmu. Gunakan semua yang sudah kamu pelajari: perkenalan, deskripsi tempat, rutinitas, dan perasaanmu!</p>
                </div>
                <PostcardWriter
                  title="Kartu Pos Liburanmu 🌏"
                  stamp="✈️"
                  to="Keluarga / Sahabatmu"
                  fields={FINAL_POSTCARD_FIELDS}
                  example={FINAL_POSTCARD_EXAMPLE}
                />
              </div>
            )}

            {activeTab === 'hotel' && (
              <div className="space-y-4 max-w-xl mx-auto">
                <div className="bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200 rounded-2xl p-4">
                  <p className="font-bold text-slate-800 text-sm mb-1">🎯 Tantangan Final — Formulir Hotel Internasional!</p>
                  <p className="text-sm text-slate-600">Ini adalah formulir hotel yang lebih lengkap seperti yang digunakan di hotel bintang 4–5 internasional. Isi semua field dengan data pribadi yang akurat!</p>
                </div>
                <HotelForm
                  title="🌟 Grand International Hotel"
                  subtitle="Complete Guest Registration Form — Please fill all required fields (*)"
                  fields={FINAL_HOTEL_FIELDS}
                />
              </div>
            )}

            {activeTab === 'kuis' && (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 rounded-2xl px-4 py-3 flex items-center gap-3">
                  <span className="text-2xl">⭐</span>
                  <div><p className="text-sm font-extrabold text-amber-800">Kuis Final — 20 Soal Komprehensif</p><p className="text-xs text-amber-600">Mencakup semua topik dari Lesson 1–9</p></div>
                </div>
                <QuizEngine items={FINAL_QUIZ} onComplete={handleComplete} />
              </div>
            )}
          </div>
        </div>

        <div className="sticky bottom-0 z-30 bg-white/90 backdrop-blur-xl border-t border-gray-100 px-4 py-3">
          <button onClick={isCompleted ? () => navigate('/modul/english/beginner/writing') : handleComplete} className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg active:scale-[0.98]" style={{ background: isCompleted ? 'linear-gradient(135deg,#4FA3D1,#1E6F9F)' : 'linear-gradient(135deg,#F39C12,#E67E22)' }}>
            {isCompleted ? '🏆 Modul Selesai — Kembali ke Daftar' : '✅ Selesaikan Modul'}
          </button>
        </div>
      </div>
    </>
  );
};

export default WritingLesson10;
