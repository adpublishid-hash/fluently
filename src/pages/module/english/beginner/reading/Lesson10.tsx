import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine, ComprehensionSection, getCompletedReadingLessons, markReadingComplete } from './readingUtils';
import type { QuizItem, ComprehensionQ } from './readingUtils';

const FINAL_QUIZ: QuizItem[] = [
  { q: '"OPEN" pada pintu toko artinya...', opts: ['Tutup', 'Buka', 'Pindah', 'Diskon'], ans: 'Buka', exp: '"OPEN" = toko sedang buka / melayani pelanggan.' },
  { q: '"Best Before: 20 June 2025" artinya...', opts: ['Dibuat 20 Juni', 'Dijual hingga 20 Juni', 'Terbaik dikonsumsi sebelum 20 Juni', 'Kadaluarsa 20 Juni'], ans: 'Terbaik dikonsumsi sebelum 20 Juni', exp: '"Best before" = batas waktu terbaik dikonsumsi.' },
  { q: '"Dr. Putri Wulandari" — gelar "Dr." menandakan...', opts: ['Insinyur', 'Dokter/Doktor', 'Direktur', 'Profesor'], ans: 'Dokter/Doktor', exp: '"Dr." = singkatan dari Doctor (dokter atau doktor).' },
  { q: '"BUY 2 GET 1 FREE" artinya...', opts: ['Beli 1 dapat 2 gratis', 'Beli 2 dapat 1 gratis', 'Diskon 50%', 'Beli 3 bayar 2'], ans: 'Beli 2 dapat 1 gratis', exp: '"Buy 2 Get 1 Free" = beli dua, dapat satu gratis.' },
  { q: '"Date of Birth" pada formulir artinya...', opts: ['Tempat lahir', 'Tanggal lahir', 'Usia', 'Tanggal daftar'], ans: 'Tanggal lahir', exp: '"Date of birth" = tanggal lahir (DOB).' },
  { q: '"CAUTION: WET FLOOR" artinya...', opts: ['Lantai kering', 'Hati-hati lantai basah', 'Dilarang masuk', 'Lantai licin'], ans: 'Hati-hati lantai basah', exp: '"Caution" = hati-hati. "Wet floor" = lantai basah.' },
  { q: '"Appetizer" pada menu restoran adalah...', opts: ['Hidangan utama', 'Makanan penutup', 'Hidangan pembuka', 'Minuman'], ans: 'Hidangan pembuka', exp: '"Appetizer" = hidangan pembuka.' },
  { q: '"DELAYED" pada layar bandara artinya...', opts: ['Tepat waktu', 'Dibatalkan', 'Ditunda/terlambat', 'Sudah berangkat'], ans: 'Ditunda/terlambat', exp: '"Delayed" = ada penundaan keberangkatan.' },
  { q: '"OTW" dalam chat artinya...', opts: ['One The Work', 'On The Way (sedang di perjalanan)', 'Off The Weekend', 'Over The World'], ans: 'On The Way (sedang di perjalanan)', exp: '"OTW" = On The Way = sedang dalam perjalanan.' },
  { q: '"Turn left at the traffic light." artinya...', opts: ['Belok kanan di persimpangan', 'Lurus di lampu merah', 'Belok kiri di lampu merah', 'Putar balik'], ans: 'Belok kiri di lampu merah', exp: '"Turn left" = belok kiri. "Traffic light" = lampu lalu lintas.' },
  { q: '"Nationality: Indonesian" pada formulir artinya...', opts: ['Nama: Indonesia', 'Bahasa: Indonesia', 'Kewarganegaraan: Indonesia', 'Alamat: Indonesia'], ans: 'Kewarganegaraan: Indonesia', exp: '"Nationality" = kewarganegaraan.' },
  { q: '"STAFF ONLY" artinya...', opts: ['Untuk semua orang', 'Untuk pengunjung', 'Khusus untuk pegawai', 'Untuk pembeli'], ans: 'Khusus untuk pegawai', exp: '"Staff only" = hanya untuk staf/karyawan.' },
  { q: '"FLASH SALE — LIMITED TIME!" pada iklan artinya...', opts: ['Penjualan lambat', 'Promo kilat — waktu terbatas!', 'Penjualan eksklusif', 'Diskon besar tetap'], ans: 'Promo kilat — waktu terbatas!', exp: '"Flash sale" = promo kilat. "Limited time" = waktu terbatas.' },
  { q: '"Happy New Year! 🎆" artinya...', opts: ['Selamat Hari Natal', 'Selamat Ulang Tahun', 'Selamat Tahun Baru', 'Selamat Idul Fitri'], ans: 'Selamat Tahun Baru', exp: '"Happy New Year" = Selamat Tahun Baru.' },
  { q: '"KEEP REFRIGERATED" pada label artinya...', opts: ['Simpan kering', 'Simpan di lemari es', 'Simpan di suhu ruang', 'Jangan dibekukan'], ans: 'Simpan di lemari es', exp: '"Refrigerated" = didinginkan. Simpan di kulkas.' },
  { q: '"Mr." digunakan untuk...', opts: ['Wanita menikah', 'Wanita muda', 'Pria dewasa', 'Anak laki-laki'], ans: 'Pria dewasa', exp: '"Mr." (Mister) = gelar untuk pria dewasa.' },
  { q: '"SOLD OUT" artinya...', opts: ['Baru tersedia', 'Habis terjual', 'Sedang diskon', 'Beli sekarang'], ans: 'Habis terjual', exp: '"Sold out" = stok habis / kehabisan.' },
  { q: '"Service Charge: 10%" pada tagihan restoran artinya...', opts: ['Diskon 10%', 'Biaya servis 10%', 'Pajak 10%', 'Tip 10%'], ans: 'Biaya servis 10%', exp: '"Service charge" = biaya pelayanan yang ditambahkan ke tagihan.' },
  { q: '"Best regards," di akhir email formal artinya...', opts: ['Terima kasih', 'Salam hangat/hormat', 'Permisi', 'Yth.'], ans: 'Salam hangat/hormat', exp: '"Best regards" = salam hormat. Penutup surat formal.' },
  { q: '"EXIT" pada gedung artinya...', opts: ['Pintu masuk', 'Tangga darurat', 'Lift', 'Pintu keluar'], ans: 'Pintu keluar', exp: '"Exit" = pintu keluar / jalan keluar.' },
];

const FINAL_PASSAGE = {
  passageTitle: '📋 Bacaan Final: Selebaran Wisata',
  passage: (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-sky-50 to-blue-50 border-2 border-sky-200 rounded-2xl p-5">
        <p className="text-center text-2xl mb-1">🏯</p>
        <p className="text-center text-xl font-extrabold text-green-800 uppercase">YOGYAKARTA CITY TOUR</p>
        <p className="text-center text-sm text-green-600 font-medium">Discover the Cultural Heart of Java</p>
        <div className="mt-4 space-y-2 text-sm text-slate-700">
          <div className="flex gap-2 items-start bg-white rounded-xl px-3 py-2"><span>📅</span><div><b>Date:</b> Every Saturday & Sunday</div></div>
          <div className="flex gap-2 items-start bg-white rounded-xl px-3 py-2"><span>⏰</span><div><b>Time:</b> 08:00 AM – 05:00 PM</div></div>
          <div className="flex gap-2 items-start bg-white rounded-xl px-3 py-2"><span>💰</span><div><b>Price:</b> Rp 350,000 per person (includes lunch)</div></div>
          <div className="flex gap-2 items-start bg-white rounded-xl px-3 py-2"><span>📍</span><div><b>Includes:</b> Borobudur Temple, Prambanan, Kraton Palace</div></div>
          <div className="flex gap-2 items-start bg-white rounded-xl px-3 py-2"><span>🚍</span><div><b>Pickup:</b> All hotels in Yogyakarta city center</div></div>
        </div>
        <div className="mt-3 bg-red-50 border border-red-100 rounded-xl px-3 py-2 text-center">
          <p className="text-xs font-extrabold text-red-600">⚠️ NOTE: Advance booking required. Limited seats!</p>
        </div>
        <div className="mt-2 text-center">
          <p className="text-xs text-slate-400">Contact: +62 274 555 0123 | info@yogyatour.com</p>
        </div>
      </div>
    </div>
  ),
  questions: [
    { q: 'Tur ini tersedia pada hari apa?', opts: ['Setiap hari', 'Senin–Jumat', 'Sabtu & Minggu', 'Hanya Sabtu'], ans: 'Sabtu & Minggu' },
    { q: 'Jam berapa tur dimulai?', opts: ['07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM'], ans: '08:00 AM' },
    { q: 'Berapa harga per orang?', opts: ['Rp 250.000', 'Rp 300.000', 'Rp 350.000', 'Rp 400.000'], ans: 'Rp 350.000' },
    { q: 'Apa saja tempat wisata yang dikunjungi?', opts: ['Bali, Lombok, NTT', 'Borobudur, Prambanan, Kraton', 'Jakarta, Bandung, Surabaya', 'Merapi, Merbabu, Lawu'], ans: 'Borobudur, Prambanan, Kraton' },
    { q: 'Apakah perlu booking terlebih dahulu?', opts: ['Tidak perlu', 'Ya, perlu booking dulu', 'Beli langsung di tempat', 'Tidak disebutkan'], ans: 'Ya, perlu booking dulu' },
  ] as ComprehensionQ[],
};

const ReadingLesson10: React.FC = () => {
  const navigate = useNavigate();
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedReadingLessons().includes(10));
  const [showModal, setShowModal] = React.useState(false);
  const [activeTab, setActiveTab] = useState<'review' | 'latihan' | 'kuis'>('review');
  const handleComplete = () => { markReadingComplete(10); setIsCompleted(true); setShowModal(true); };

  const reviewItems = [
    { n: 1, icon: '🪧', title: 'Nama & Kata Familiar', skill: 'Gelar, merek & tanda umum' },
    { n: 2, icon: '📢', title: 'Pengumuman', skill: 'Notice, warning, jam operasional' },
    { n: 3, icon: '🎪', title: 'Poster & Iklan', skill: 'Promo, sale, event, flash sale' },
    { n: 4, icon: '🏷️', title: 'Label Produk', skill: 'Best before, ingredients, storage' },
    { n: 5, icon: '🍽️', title: 'Menu Restoran', skill: 'Appetizer, main course, bill' },
    { n: 6, icon: '📝', title: 'Formulir', skill: 'Full name, DOB, nationality, signature' },
    { n: 7, icon: '🗺️', title: 'Petunjuk & Arah', skill: 'Directions, warnings, step-by-step' },
    { n: 8, icon: '🚌', title: 'Jadwal & Kalender', skill: 'Departure, arrival, delayed, days' },
    { n: 9, icon: '💌', title: 'Pesan & Kartu', skill: 'SMS abbreviations, greeting cards' },
  ];

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)' }} onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg,#4FA3D1,#1E6F9F)' }}><span style={{ fontSize: 46 }}>🎓</span></div>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Modul Reading Selesai! 🏆</h2>
            <p className="text-sm text-gray-600 mb-4">Luar biasa! Kamu telah menyelesaikan seluruh <b>10 Lesson Reading Beginner</b>. Kamu sekarang bisa membaca:</p>
            <div className="bg-green-50 rounded-xl p-3 mb-5 text-left text-sm text-green-800 space-y-1">
              <p>✅ Nama orang, merek, dan tanda-tanda umum</p>
              <p>✅ Pengumuman, poster, dan iklan</p>
              <p>✅ Label produk dan menu restoran</p>
              <p>✅ Formulir, jadwal, dan kartu pos</p>
            </div>
            <button onClick={() => { setShowModal(false); navigate('/modul/english/beginner/reading'); }} className="w-full py-3.5 rounded-xl font-bold text-white text-base bg-green-500">
              🎉 Kembali ke Modul Reading
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col h-[100dvh] md:h-full bg-slate-50">
        <header className="flex-none bg-white/95 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100 shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg></button>
            <div className="text-center"><h1 className="text-sm font-bold text-slate-800">Ulasan & Latihan Akhir</h1><p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">Reading • Lesson 10 — FINAL</p></div>
            <div className="w-10" />
          </div>
        </header>
        <div className="flex bg-white border-b border-slate-100 sticky top-[65px] z-10 shadow-sm">
          {([['review', '📋 Ulasan'], ['latihan', '✏️ Latihan'], ['kuis', '🎯 Kuis Final']] as const).map(([tab, label]) => (
            <button key={tab} onClick={() => setActiveTab(tab as typeof activeTab)} className={`flex-1 py-3 text-xs font-bold tracking-wide transition-all ${activeTab === tab ? 'text-green-600 border-b-2 border-sky-500' : 'text-slate-400'}`}>{label as string}</button>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 pb-28 space-y-5">
            {activeTab === 'review' && (
              <>
                <div className="bg-gradient-to-br from-sky-500 via-sky-500 to-blue-500 rounded-2xl p-6 text-white shadow-lg text-center relative overflow-hidden">
                  <div className="absolute -top-4 -right-4 text-8xl opacity-10">🎓</div>
                  <p className="text-4xl mb-2">🎓</p>
                  <h2 className="text-xl font-extrabold mb-1">Selamat! Kamu Hampir Selesai</h2>
                  <p className="text-sm text-green-100">Ini adalah lesson terakhir dari Reading Beginner. Review semua yang sudah kamu pelajari!</p>
                </div>
                <div className="space-y-2">
                  {reviewItems.map(item => (
                    <div key={item.n} className="bg-white rounded-2xl px-4 py-3.5 border border-slate-100 shadow-sm flex items-center gap-4">
                      <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-xl shrink-0">{item.icon}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-extrabold text-slate-800">Lesson {item.n}: {item.title}</p>
                        <p className="text-xs text-slate-500 truncate">{item.skill}</p>
                      </div>
                      <span className="text-green-500 shrink-0 text-lg">✅</span>
                    </div>
                  ))}
                </div>
                <div className="bg-green-50 border border-sky-100 rounded-2xl p-5 text-center">
                  <p className="text-2xl mb-2">📖</p>
                  <h3 className="font-extrabold text-green-800 mb-2">Kemampuan Membacamu Sekarang!</h3>
                  <div className="text-sm text-green-700 space-y-1 text-left mb-4">
                    <p>✦ Memahami nama familiar, merek & tanda umum</p>
                    <p>✦ Membaca pengumuman, poster & iklan</p>
                    <p>✦ Memahami label produk & menu restoran</p>
                    <p>✦ Membaca formulir & tanda pengenal</p>
                    <p>✦ Memahami petunjuk & instruksi sederhana</p>
                    <p>✦ Membaca jadwal, pesan singkat & kartu ucapan</p>
                  </div>
                  <div className="flex gap-2 justify-center flex-wrap">
                    <button onClick={() => setActiveTab('latihan')} className="px-4 py-2 bg-green-500 text-white rounded-xl text-xs font-bold">✏️ Latihan Akhir</button>
                    <button onClick={() => setActiveTab('kuis')} className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold">🎯 Kuis Final</button>
                  </div>
                </div>
              </>
            )}
            {activeTab === 'latihan' && (
              <div className="space-y-4">
                <div className="bg-green-50 border border-sky-200 rounded-2xl px-4 py-3 flex items-center gap-3">
                  <span className="text-2xl">📋</span>
                  <div><p className="text-sm font-extrabold text-green-800">Latihan Akhir — Teks Nyata</p><p className="text-xs text-green-600">Baca dan jawab pertanyaan tentang selebaran wisata</p></div>
                </div>
                <ComprehensionSection {...FINAL_PASSAGE} />
              </div>
            )}
            {activeTab === 'kuis' && (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200 rounded-2xl px-4 py-3 flex items-center gap-3">
                  <span className="text-2xl">⭐</span>
                  <div><p className="text-sm font-extrabold text-green-800">Kuis Final — 20 Soal Komprehensif</p><p className="text-xs text-green-600">Mencakup semua topik dari Lesson 1–9</p></div>
                </div>
                <QuizEngine items={FINAL_QUIZ} onComplete={handleComplete} />
              </div>
            )}
          </div>
        </div>
        <div className="sticky bottom-0 z-30 bg-white/90 backdrop-blur-xl border-t border-gray-100 px-4 py-3">
          <button onClick={isCompleted ? () => navigate('/modul/english/beginner/reading') : handleComplete} className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg active:scale-[0.98]" style={{ background: isCompleted ? 'linear-gradient(135deg,#4FA3D1,#1E6F9F)' : 'linear-gradient(135deg,#4FA3D1,#1E6F9F)' }}>
            {isCompleted ? '🏆 Modul Selesai — Kembali ke Daftar' : '✅ Selesaikan Modul'}
          </button>
        </div>
      </div>
    </>
  );
};

export default ReadingLesson10;
