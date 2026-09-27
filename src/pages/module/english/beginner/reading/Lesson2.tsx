import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine, ReadingCard, ComprehensionSection, getCompletedReadingLessons, markReadingComplete } from './readingUtils';
import type { QuizItem, ComprehensionQ } from './readingUtils';

const QUIZ: QuizItem[] = [
  { q: '"NOTICE" pada sebuah papan artinya...', opts: ['Iklan', 'Pengumuman penting', 'Pertanyaan', 'Perintah'], ans: 'Pengumuman penting', exp: '"Notice" = pemberitahuan/pengumuman penting.' },
  { q: '"The office is CLOSED today." artinya...', opts: ['Kantor tutup hari ini.', 'Kantor buka hari ini.', 'Kantor pindah.', 'Kantor penuh.'], ans: 'Kantor tutup hari ini.', exp: '"Closed today" = tutup hari ini.' },
  { q: '"FOR SALE" pada sebuah rumah artinya...', opts: ['Rumah disewa', 'Rumah dijual', 'Rumah gratis', 'Rumah dikosongkan'], ans: 'Rumah dijual', exp: '"For sale" = dijual.' },
  { q: '"NO SMOKING" artinya...', opts: ['Boleh merokok', 'Area merokok', 'Dilarang merokok', 'Jual rokok'], ans: 'Dilarang merokok', exp: '"No + kata kerja" = dilarang melakukan sesuatu itu.' },
  { q: '"PLEASE KEEP THIS AREA CLEAN" artinya...', opts: ['Bersihkan sekarang', 'Dilarang masuk', 'Tolong jaga kebersihan area ini.', 'Area ini kotor.'], ans: 'Tolong jaga kebersihan area ini.', exp: '"Keep this area clean" = jaga kebersihan area ini.' },
  { q: '"Opening Hours: Mon–Fri 8AM–5PM" artinya...', opts: ['Buka Senin–Jumat jam 8–5', 'Buka setiap hari jam 8–5', 'Buka akhir pekan saja', 'Tutup Senin'], ans: 'Buka Senin–Jumat jam 8–5', exp: '"Mon–Fri" = Monday to Friday = Senin sampai Jumat.' },
  { q: '"CAUTION: WET FLOOR" artinya...', opts: ['Lantai kering', 'Dilarang masuk', 'Hati-hati lantai licin/basah', 'Sedang dibersihkan'], ans: 'Hati-hati lantai licin/basah', exp: '"Caution" = hati-hati. "Wet floor" = lantai basah/licin.' },
  { q: '"STAFF ONLY" artinya...', opts: ['Terbuka untuk umum', 'Hanya untuk pegawai', 'Ruang tunggu', 'Ruang makan'], ans: 'Hanya untuk pegawai', exp: '"Staff only" = khusus untuk staf/pegawai saja.' },
  { q: '"DO NOT DISTURB" pada pintu hotel artinya...', opts: ['Ketuk pintu', 'Jangan ganggu', 'Silakan masuk', 'Kamar bersih'], ans: 'Jangan ganggu', exp: '"Do not disturb" = jangan diganggu / mohon tidak diganggu.' },
  { q: '"OUT OF ORDER" pada sebuah mesin artinya...', opts: ['Mesin bekerja normal', 'Mesin rusak/tidak berfungsi', 'Mesin baru', 'Mesin kosong'], ans: 'Mesin rusak/tidak berfungsi', exp: '"Out of order" = rusak atau tidak berfungsi.' },
  { q: '"ENTRANCE" pada sebuah gedung artinya...', opts: ['Pintu keluar', 'Tangga darurat', 'Pintu masuk', 'Lift'], ans: 'Pintu masuk', exp: '"Entrance" = pintu masuk. Kebalikannya "Exit" = pintu keluar.' },
  { q: '"FRAGILE – Handle with Care" artinya...', opts: ['Barang berat', 'Barang mudah pecah – tangani dengan hati-hati', 'Barang berbahaya', 'Barang baru'], ans: 'Barang mudah pecah – tangani dengan hati-hati', exp: '"Fragile" = rapuh/mudah pecah. "Handle with care" = tangani dengan hati-hati.' },
  { q: '"RESERVED" pada sebuah meja/kursi artinya...', opts: ['Meja kosong', 'Meja sudah dipesan', 'Meja rusak', 'Meja VIP'], ans: 'Meja sudah dipesan', exp: '"Reserved" = sudah dipesan/dicadangkan.' },
  { q: '"PLEASE QUEUE HERE" artinya...', opts: ['Dilarang antre', 'Silakan antre di sini', 'Antre di luar', 'Kasir tutup'], ans: 'Silakan antre di sini', exp: '"Queue" = antre. "Please queue here" = silakan antre di sini.' },
  { q: '"EMERGENCY EXIT" artinya...', opts: ['Pintu utama', 'Pintu belakang', 'Pintu darurat', 'Pintu barang'], ans: 'Pintu darurat', exp: '"Emergency" = darurat. "Emergency exit" = pintu keluar darurat.' },
  { q: '"ATTENTION ALL PASSENGERS" artinya...', opts: ['Perhatian semua penumpang', 'Perhatian semua pengemudi', 'Perhatian semua pengunjung', 'Perhatian semua siswa'], ans: 'Perhatian semua penumpang', exp: '"Passengers" = penumpang (bus, kereta, pesawat).' },
  { q: '"NO ENTRY" artinya...', opts: ['Silakan masuk', 'Dilarang masuk', 'Pintu masuk', 'Area terbuka'], ans: 'Dilarang masuk', exp: '"No entry" = dilarang masuk.' },
  { q: '"OPEN 24 HOURS" artinya...', opts: ['Buka 24 jam', 'Buka jam 2 siang', 'Tutup pukul 24.00', 'Buka 24 hari'], ans: 'Buka 24 jam', exp: '"Open 24 hours" = buka 24 jam penuh, tidak tutup.' },
  { q: '"INFORMATION DESK" artinya...', opts: ['Meja kasir', 'Meja informasi', 'Meja resepsionis hotel', 'Meja pengiriman'], ans: 'Meja informasi', exp: '"Information desk" = meja/loket informasi.' },
  { q: '"PLEASE TURN OFF YOUR PHONE" artinya...', opts: ['Silakan nyalakan HP', 'Mohon matikan HP Anda', 'Gunakan HP Anda', 'Cas HP Anda'], ans: 'Mohon matikan HP Anda', exp: '"Turn off" = matikan. "Phone" = HP/telepon.' },
];

const COMPREHENSION = {
  passageTitle: '📋 Bacaan: Pengumuman di Kantor',
  passage: (
    <div className="space-y-2 text-sm text-slate-700">
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <p className="font-extrabold text-center text-yellow-800 mb-2 uppercase">⚠️ NOTICE — All Staff</p>
        <p>The office will be <b>CLOSED</b> on <b>Friday, April 25th</b> due to a public holiday.</p>
        <p className="mt-1">Please note: The <b>main entrance</b> will be locked. Use the <b>SIDE DOOR</b> on Saturday if needed.</p>
        <p className="mt-2">Normal working hours resume on <b>Monday, April 28th</b> at <b>8:00 AM</b>.</p>
        <p className="mt-2 text-xs text-right text-yellow-700 font-medium">— HR Department</p>
      </div>
    </div>
  ),
  questions: [
    { q: 'Pada hari apa kantor ditutup?', opts: ['Kamis', 'Jumat', 'Sabtu', 'Senin'], ans: 'Jumat' },
    { q: 'Apa alasan kantor ditutup?', opts: ['Perbaikan kantor', 'Libur nasional', 'Pertemuan staf', 'Cuaca buruk'], ans: 'Libur nasional' },
    { q: 'Pintu mana yang dikunci pada hari libur?', opts: ['Pintu samping', 'Pintu darurat', 'Pintu utama', 'Pintu belakang'], ans: 'Pintu utama' },
    { q: 'Kapan jam kerja normal kembali?', opts: ['Jumat 25 April', 'Sabtu 26 April', 'Senin 28 April', 'Selasa 29 April'], ans: 'Senin 28 April' },
    { q: 'Pengumuman ini dibuat oleh departemen apa?', opts: ['IT Department', 'Finance', 'HR Department', 'Marketing'], ans: 'HR Department' },
  ] as ComprehensionQ[],
};

const ReadingLesson2: React.FC = () => {
  const navigate = useNavigate();
  const nextPath = '/modul/english/beginner/reading/lesson-3';
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedReadingLessons().includes(2));
  const [showModal, setShowModal] = React.useState(false);
  const [activeTab, setActiveTab] = useState<'baca' | 'latihan' | 'kuis'>('baca');
  const handleComplete = () => { markReadingComplete(2); setIsCompleted(true); setShowModal(true); };

  const commonNotices = [
    { sign: 'NOTICE', meaning: 'Pemberitahuan penting', icon: '📢', type: 'warning' as const },
    { sign: 'CAUTION', meaning: 'Hati-hati / Perhatian', icon: '⚠️', type: 'warning' as const },
    { sign: 'NO SMOKING', meaning: 'Dilarang merokok', icon: '🚭', type: 'danger' as const },
    { sign: 'STAFF ONLY', meaning: 'Khusus pegawai', icon: '🔒', type: 'info' as const },
    { sign: 'RESERVED', meaning: 'Sudah dipesan', icon: '🪑', type: 'info' as const },
    { sign: 'OUT OF ORDER', meaning: 'Rusak / tidak berfungsi', icon: '🔧', type: 'danger' as const },
  ];

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)' }} onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg,#4FA3D1,#1E6F9F)' }}><span style={{ fontSize: 38 }}>🏆</span></div>
            <h2 className="text-xl font-extrabold mb-1">Lesson 2 Selesai! 🎉</h2>
            <p className="text-sm text-gray-500 mb-5">Kamu sudah bisa membaca pengumuman dan tanda peringatan!</p>
            <div className="flex gap-3">
              <button onClick={() => { setShowModal(false); navigate(nextPath); }} className="flex-1 py-3 rounded-xl font-bold text-white bg-green-500">Lesson 3 ›</button>
              <button onClick={() => { setShowModal(false); navigate(-1); }} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700">Kembali</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col h-[100dvh] md:h-full bg-slate-50">
        <header className="flex-none bg-white/95 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100 shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg></button>
            <div className="text-center"><h1 className="text-sm font-bold text-slate-800">Pengumuman Sederhana</h1><p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">Reading • Lesson 2</p></div>
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
                  <h2 className="text-lg font-extrabold mb-1">Pengumuman & Notice</h2>
                  <p className="text-sm text-green-100">Pelajari cara membaca pengumuman di tempat-tempat umum — kantor, mall, sekolah, dan fasilitas publik!</p>
                </div>

                <ReadingCard title="📢 Tanda & Pengumuman Umum">
                  <div className="grid grid-cols-2 gap-3">
                    {commonNotices.map(n => (
                      <div key={n.sign} className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                        <p className="text-lg mb-1">{n.icon}</p>
                        <p className="text-sm font-extrabold text-slate-800">{n.sign}</p>
                        <p className="text-xs text-green-600">{n.meaning}</p>
                      </div>
                    ))}
                  </div>
                </ReadingCard>

                <ReadingCard title="📅 Jam Operasional (Opening Hours)">
                  <div className="space-y-2 text-sm">
                    {[
                      { day: 'Mon – Fri', time: '8:00 AM – 5:00 PM', id: 'Senin – Jumat' },
                      { day: 'Saturday', time: '9:00 AM – 3:00 PM', id: 'Sabtu' },
                      { day: 'Sunday', time: 'CLOSED', id: 'Minggu' },
                      { day: 'Public Holiday', time: 'CLOSED', id: 'Hari Libur' },
                    ].map((h, i) => (
                      <div key={i} className={`flex items-center justify-between px-3 py-2.5 rounded-xl ${h.time === 'CLOSED' ? 'bg-red-50 border border-red-100' : 'bg-green-50 border border-sky-100'}`}>
                        <div><p className="font-bold text-slate-800">{h.day}</p><p className="text-xs text-slate-400">{h.id}</p></div>
                        <p className={`font-extrabold text-sm ${h.time === 'CLOSED' ? 'text-red-500' : 'text-green-600'}`}>{h.time}</p>
                      </div>
                    ))}
                  </div>
                </ReadingCard>

                <ReadingCard title="💡 Kata-kata dalam Pengumuman">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {[
                      { en: 'Notice', id: 'Pemberitahuan' }, { en: 'Announcement', id: 'Pengumuman' },
                      { en: 'Due to', id: 'Karena / Dikarenakan' }, { en: 'Please note', id: 'Harap diperhatikan' },
                      { en: 'Effective', id: 'Berlaku (mulai)' }, { en: 'Until further notice', id: 'Hingga ada pemberitahuan' },
                      { en: 'We apologize', id: 'Kami mohon maaf' }, { en: 'For your convenience', id: 'Untuk kenyamanan Anda' },
                    ].map(w => (<div key={w.en} className="bg-slate-50 rounded-xl px-3 py-2"><p className="font-bold text-slate-800">{w.en}</p><p className="text-xs text-green-600">{w.id}</p></div>))}
                  </div>
                </ReadingCard>
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

export default ReadingLesson2;
