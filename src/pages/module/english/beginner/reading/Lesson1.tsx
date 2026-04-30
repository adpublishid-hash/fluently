import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine, ReadingCard, SignBoard, ComprehensionSection, getCompletedReadingLessons, markReadingComplete } from './readingUtils';
import type { QuizItem, ComprehensionQ } from './readingUtils';

/* ══ DATA ═══════════════════════════════════════════════ */
const QUIZ: QuizItem[] = [
  { q: 'Apa artinya nama "Starbucks" pada sebuah gedung?', opts: ['Warung nasi', 'Kedai kopi', 'Apotek', 'Toko buku'], ans: 'Kedai kopi', exp: 'Starbucks adalah merek kedai kopi internasional yang terkenal.' },
  { q: 'Tanda "OPEN" di depan toko artinya...', opts: ['Toko tutup', 'Toko buka', 'Toko pindah', 'Toko penuh'], ans: 'Toko buka', exp: '"OPEN" = buka. Kebalikannya adalah "CLOSED" = tutup.' },
  { q: '"EXIT" pada papan petunjuk artinya...', opts: ['Masuk', 'Keluar', 'Berhenti', 'Naik'], ans: 'Keluar', exp: '"Exit" = pintu keluar / jalan keluar.' },
  { q: 'Nama "Jakarta" pada sebuah peta adalah nama...', opts: ['Jalan', 'Negara', 'Kota', 'Pulau'], ans: 'Kota', exp: 'Jakarta adalah nama kota (ibu kota Indonesia).' },
  { q: '"Dr. Siti Rahayu" adalah nama seorang...', opts: ['Tentara', 'Dokter', 'Pilot', 'Guru'], ans: 'Dokter', exp: '"Dr." adalah singkatan dari Doctor (Dokter/Doktor).' },
  { q: 'Tanda "PUSH" pada sebuah pintu artinya...', opts: ['Tarik', 'Dorong', 'Putar', 'Angkat'], ans: 'Dorong', exp: '"Push" = dorong. Kebalikannya "Pull" = tarik.' },
  { q: '"Jl. Sudirman No. 5" adalah contoh sebuah...', opts: ['Nama orang', 'Nama kota', 'Alamat', 'Nomor telepon'], ans: 'Alamat', exp: '"Jl." adalah singkatan dari "Jalan" = nama jalan.' },
  { q: '"McDonald\'s" pada sebuah papan besar adalah nama...', opts: ['Merek restoran', 'Nama orang', 'Nama kota', 'Merek obat'], ans: 'Merek restoran', exp: 'McDonald\'s adalah merek restoran cepat saji internasional.' },
  { q: '"TOILET / WC" pada papan petunjuk artinya...', opts: ['Tangga', 'Parkir', 'Kamar mandi', 'Kasir'], ans: 'Kamar mandi', exp: '"Toilet" atau "WC" (Water Closet) = kamar mandi/toilet.' },
  { q: '"Indomaret" pada papan toko adalah nama...', opts: ['Merek supermarket', 'Nama jalan', 'Nama kota', 'Merek makanan'], ans: 'Merek supermarket', exp: 'Indomaret adalah nama merek minimarket/supermarket.' },
  { q: '"Mr. John Smith" — gelar "Mr." digunakan untuk...', opts: ['Anak-anak', 'Pria dewasa', 'Wanita menikah', 'Wanita belum menikah'], ans: 'Pria dewasa', exp: '"Mr." (Mister) digunakan untuk pria dewasa.' },
  { q: '"Mrs. Putri Hapsari" — gelar "Mrs." digunakan untuk...', opts: ['Pria dewasa', 'Wanita belum menikah', 'Wanita menikah', 'Anak perempuan'], ans: 'Wanita menikah', exp: '"Mrs." (Missus) digunakan untuk wanita yang sudah menikah.' },
  { q: '"ENTER" pada tombol komputer atau pintu artinya...', opts: ['Keluar', 'Masuk/Lanjutkan', 'Batal', 'Simpan'], ans: 'Masuk/Lanjutkan', exp: '"Enter" = masuk atau lanjutkan.' },
  { q: '"Stasiun Gambir" adalah nama sebuah...', opts: ['Pasar', 'Hotel', 'Stasiun kereta', 'Bandara'], ans: 'Stasiun kereta', exp: '"Stasiun" = train station (stasiun kereta api).' },
  { q: '"PT Telkom Indonesia" adalah nama sebuah...', opts: ['Orang', 'Kota', 'Perusahaan', 'Produk'], ans: 'Perusahaan', exp: '"PT" (Perseroan Terbatas) = perusahaan / company.' },
  { q: '"Taman Nasional Komodo" adalah nama sebuah...', opts: ['Taman bermain', 'Area wisata alam', 'Kebun binatang kota', 'Museum'], ans: 'Area wisata alam', exp: '"Taman Nasional" = National Park = kawasan alam yang dilindungi.' },
  { q: '"CLOSED" pada pintu toko artinya...', opts: ['Buka', 'Diskon', 'Tutup', 'Pindah'], ans: 'Tutup', exp: '"Closed" = tutup. Kebalikannya "Open" = buka.' },
  { q: '"PARKING" atau "P" pada papan artinya...', opts: ['Toilet', 'Pintu masuk', 'Area parkir', 'Kassa'], ans: 'Area parkir', exp: '"Parking" = area untuk memarkirkan kendaraan.' },
  { q: '"Miss" sebagai gelar digunakan untuk...', opts: ['Pria dewasa', 'Wanita menikah', 'Wanita muda/belum menikah', 'Dokter wanita'], ans: 'Wanita muda/belum menikah', exp: '"Miss" digunakan untuk wanita yang belum menikah.' },
  { q: '"SALE 50%" pada sebuah toko artinya...', opts: ['Harga naik 50%', 'Diskon 50%', 'Stok tersisa 50%', 'Beli 2 gratis 1'], ans: 'Diskon 50%', exp: '"Sale" = diskon/obral. "50%" = 50 persen potongan harga.' },
];

const COMPREHENSION: { passageTitle: string; passage: React.ReactNode; questions: ComprehensionQ[] } = {
  passageTitle: '📋 Bacaan: Papan Nama di Mall',
  passage: (
    <div className="space-y-2">
      <p>You are at <b>Grand Indonesia Mall</b> in Jakarta. You see these signs:</p>
      <div className="grid grid-cols-2 gap-2 my-3">
        <div className="bg-green-50 rounded-lg p-2 text-center text-sm border border-sky-100"><b>OPEN</b><br /><span className="text-xs text-slate-500">Hours: 10AM–10PM</span></div>
        <div className="bg-blue-50 rounded-lg p-2 text-center text-sm border border-blue-100"><b>INFORMATION</b><br /><span className="text-xs text-slate-500">Level 1</span></div>
        <div className="bg-red-50 rounded-lg p-2 text-center text-sm border border-red-100"><b>EXIT ↓</b><br /><span className="text-xs text-slate-500">Ground Floor</span></div>
        <div className="bg-yellow-50 rounded-lg p-2 text-center text-sm border border-yellow-100"><b>TOILET 🚻</b><br /><span className="text-xs text-slate-500">Level 2</span></div>
      </div>
      <p>The mall opens at <b>10 AM</b> and closes at <b>10 PM</b>. There is an information desk on Level 1. The exit is on the ground floor.</p>
    </div>
  ),
  questions: [
    { q: 'Jam berapa mall dibuka?', opts: ['8 AM', '9 AM', '10 AM', '11 AM'], ans: '10 AM' },
    { q: 'Di mana meja informasi berada?', opts: ['Ground Floor', 'Level 1', 'Level 2', 'Level 3'], ans: 'Level 1' },
    { q: '"EXIT" menunjukkan arah ke...', opts: ['Toilet', 'Pintu keluar', 'Informasi', 'Kasir'], ans: 'Pintu keluar' },
    { q: 'Di level berapa toilet berada?', opts: ['Ground Floor', 'Level 1', 'Level 2', 'Level 3'], ans: 'Level 2' },
    { q: 'Jam berapa mall tutup?', opts: ['8 PM', '9 PM', '10 PM', '11 PM'], ans: '10 PM' },
  ],
};

/* ══ MAIN ═══════════════════════════════════════════════ */
const ReadingLesson1: React.FC = () => {
  const navigate = useNavigate();
  const nextPath = '/modul/english/beginner/reading/lesson-2';
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedReadingLessons().includes(1));
  const [showModal, setShowModal] = React.useState(false);
  const [activeTab, setActiveTab] = useState<'baca' | 'latihan' | 'kuis'>('baca');
  const handleComplete = () => { markReadingComplete(1); setIsCompleted(true); setShowModal(true); };

  const names = [
    { name: 'Dr. Siti Rahayu', type: 'Dokter', flag: '👩‍⚕️' },
    { name: 'Mr. John Smith', type: 'Pria Dewasa', flag: '👨' },
    { name: 'Mrs. Putri Hapsari', type: 'Wanita Menikah', flag: '👩‍💼' },
    { name: 'Miss Jessica Lee', type: 'Wanita Muda', flag: '👧' },
    { name: 'Prof. Ahmad Yani', type: 'Profesor', flag: '👨‍🏫' },
  ];

  const brands = [
    { n: 'Starbucks', icon: '☕', cat: 'Coffee shop' }, { n: 'McDonald\'s', icon: '🍔', cat: 'Fast food' },
    { n: 'Indomaret', icon: '🛒', cat: 'Minimarket' }, { n: 'KFC', icon: '🍗', cat: 'Fast food' },
    { n: 'Grab', icon: '📱', cat: 'Ride-hailing app' }, { n: 'Tokopedia', icon: '🛍️', cat: 'Online store' },
  ];

  const signs = [
    { text: 'OPEN', sub: 'buka', type: 'success' as const },
    { text: 'CLOSED', sub: 'tutup', type: 'danger' as const },
    { text: 'EXIT', sub: 'keluar', type: 'info' as const },
    { text: 'PUSH', sub: 'dorong', type: 'warning' as const },
    { text: 'PULL', sub: 'tarik', type: 'info' as const },
    { text: 'SALE', sub: 'diskon', type: 'warning' as const },
  ];

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)' }} onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg,#4FA3D1,#1E6F9F)' }}><span style={{ fontSize: 38 }}>🏆</span></div>
            <h2 className="text-xl font-extrabold mb-1">Lesson 1 Selesai! 🎉</h2>
            <p className="text-sm text-gray-500 mb-5">Kamu sudah bisa membaca nama dan tanda-tanda umum!</p>
            <div className="flex gap-3">
              <button onClick={() => { setShowModal(false); navigate(nextPath); }} className="flex-1 py-3 rounded-xl font-bold text-white bg-green-500">Lesson 2 ›</button>
              <button onClick={() => { setShowModal(false); navigate(-1); }} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700">Kembali</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col h-[100dvh] md:h-full bg-slate-50">
        <header className="flex-none bg-white/95 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100 shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg></button>
            <div className="text-center"><h1 className="text-sm font-bold text-slate-800">Nama & Kata Familiar</h1><p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">Reading • Lesson 1</p></div>
            <button onClick={() => navigate(nextPath)} className="px-3 h-9 rounded-full text-xs font-bold text-white bg-green-500">Next ›</button>
          </div>
        </header>
        <div className="flex bg-white border-b border-slate-100 sticky top-[65px] z-10 shadow-sm">
          {([['baca', '📖 Baca'], ['latihan', '✏️ Latihan'], ['kuis', '🎯 Kuis']] as const).map(([tab, label]) => (
            <button key={tab} onClick={() => setActiveTab(tab as typeof activeTab)} className={`flex-1 py-3 text-xs font-bold tracking-wide transition-all ${activeTab === tab ? 'text-green-600 border-b-2 border-sky-500' : 'text-slate-400'}`}>{label as string}</button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 pb-28 space-y-5">

            {activeTab === 'baca' && (
              <>
                <div className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl p-5 text-white shadow-lg">
                  <h2 className="text-lg font-extrabold mb-1">Membaca Nama & Tanda Umum</h2>
                  <p className="text-sm text-green-100">Di lesson ini kamu belajar mengenali nama orang, merek terkenal, dan tanda-tanda yang sering kamu lihat sehari-hari.</p>
                </div>

                <ReadingCard title="👤 Gelar & Nama Orang" icon="🪪">
                  <div className="space-y-3">
                    {names.map((n, i) => (
                      <div key={i} className="flex items-center gap-3 bg-slate-50 rounded-xl px-3 py-2.5">
                        <span className="text-2xl">{n.flag}</span>
                        <div><p className="text-sm font-bold text-slate-800">{n.name}</p><p className="text-xs text-green-600 font-semibold">{n.type}</p></div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 bg-green-50 border border-sky-100 rounded-xl p-3 text-xs text-green-800">
                    <p className="font-bold mb-1">📌 Gelar dalam bahasa Inggris:</p>
                    <p>• <b>Mr.</b> = untuk pria | <b>Mrs.</b> = wanita menikah</p>
                    <p>• <b>Miss</b> = wanita muda/belum menikah</p>
                    <p>• <b>Dr.</b> = dokter/doktor | <b>Prof.</b> = profesor</p>
                  </div>
                </ReadingCard>

                <ReadingCard title="🏪 Merek & Nama Bisnis" icon="🔤">
                  <div className="grid grid-cols-2 gap-2">
                    {brands.map(b => (
                      <div key={b.n} className="bg-slate-50 rounded-xl p-3 flex items-center gap-2.5">
                        <span className="text-2xl">{b.icon}</span>
                        <div><p className="text-sm font-extrabold text-slate-800">{b.n}</p><p className="text-xs text-slate-500">{b.cat}</p></div>
                      </div>
                    ))}
                  </div>
                </ReadingCard>

                <div>
                  <h3 className="font-extrabold text-slate-800 mb-3 text-sm">🔤 Tanda-tanda Umum</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {signs.map(s => <SignBoard key={s.text} text={s.text} subtext={s.sub} type={s.type} />)}
                  </div>
                </div>
              </>
            )}

            {activeTab === 'latihan' && <ComprehensionSection {...COMPREHENSION} />}
            {activeTab === 'kuis' && <QuizEngine items={QUIZ} onComplete={handleComplete} />}
          </div>
        </div>

        <div className="sticky bottom-0 z-30 bg-white/90 backdrop-blur-xl border-t border-gray-100 px-4 py-3">
          <button onClick={isCompleted ? () => navigate(-1) : handleComplete} className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg active:scale-[0.98]" style={{ background: isCompleted ? 'linear-gradient(135deg,#4FA3D1,#1E6F9F)' : 'linear-gradient(135deg,#4FA3D1,#1E6F9F)' }}>
            {isCompleted ? '✅ Sudah Selesai' : '✅ Tandai Selesai'}
          </button>
        </div>
      </div>
    </>
  );
};

export default ReadingLesson1;
