import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine, ReadingCard, ComprehensionSection, getCompletedReadingLessons, markReadingComplete } from './readingUtils';
import type { QuizItem, ComprehensionQ } from './readingUtils';

const QUIZ: QuizItem[] = [
  { q: '"MON" adalah singkatan dari hari...', opts: ['Monday', 'Tuesday', 'Morning', 'Month'], ans: 'Monday', exp: '"Mon" = Monday (Senin).' },
  { q: '"Departure: 09:30" pada jadwal bus artinya...', opts: ['Buka jam 09.30', 'Tiba jam 09.30', 'Berangkat jam 09.30', 'Istirahat jam 09.30'], ans: 'Berangkat jam 09.30', exp: '"Departure" = keberangkatan.' },
  { q: '"Arrival: 13:15" artinya...', opts: ['Istirahat jam 13.15', 'Buka jam 13.15', 'Tiba jam 13.15', 'Berangkat jam 13.15'], ans: 'Tiba jam 13.15', exp: '"Arrival" = kedatangan/ketibaan.' },
  { q: '"PLATFORM 3" pada jadwal kereta artinya...', opts: ['Peron 3', 'Kursi 3', 'Jalur 3', 'Gerbong 3'], ans: 'Peron 3', exp: '"Platform" = peron (tempat menunggu kereta di stasiun).' },
  { q: '"DELAYED" pada layar bandara artinya...', opts: ['Dibatalkan', 'Ditunda/terlambat', 'Tepat waktu', 'Berangkat lebih awal'], ans: 'Ditunda/terlambat', exp: '"Delayed" = terlambat / ada penundaan keberangkatan.' },
  { q: '"CANCELLED" pada jadwal artinya...', opts: ['Tepat waktu', 'Ditunda', 'Dibatalkan', 'Dipercepat'], ans: 'Dibatalkan', exp: '"Cancelled" = dibatalkan sepenuhnya.' },
  { q: '"SUN" adalah singkatan dari hari...', opts: ['Sunday', 'Senior', 'Saturday', 'Summer'], ans: 'Sunday', exp: '"Sun" = Sunday (Minggu).' },
  { q: '"Doctor appointment at 2 PM on Tuesday" artinya...', opts: ['Janji dokter Selasa jam 2 siang', 'Janji dokter Kamis jam 2 pagi', 'Janji dokter Rabu', 'Janji dokter Senin jam 2'], ans: 'Janji dokter Selasa jam 2 siang', exp: '"2 PM on Tuesday" = jam 2 siang hari Selasa.' },
  { q: '"GATE B7" pada tiket pesawat artinya...', opts: ['Pintu/gerbang keberangkatan B7', 'Terminal 7', 'Nomor kursi', 'Nomor gerbong'], ans: 'Pintu/gerbang keberangkatan B7', exp: '"Gate" = pintu/gerbang boarding di bandara.' },
  { q: '"ON TIME" pada jadwal artinya...', opts: ['Tepat waktu', 'Ditunda', 'Dibatalkan', 'Terlambat'], ans: 'Tepat waktu', exp: '"On time" = tepat waktu / sesuai jadwal.' },
  { q: '"WED" adalah singkatan hari...', opts: ['Thursday', 'Weekend', 'Wednesday', 'Tuesday'], ans: 'Wednesday', exp: '"Wed" = Wednesday (Rabu).' },
  { q: '"EVERY DAY EXCEPT SUNDAY" pada jadwal artinya...', opts: ['Setiap hari kecuali Minggu', 'Setiap hari', 'Hanya hari kerja', 'Hanya Minggu'], ans: 'Setiap hari kecuali Minggu', exp: '"Every day except Sunday" = setiap hari kecuali hari Minggu.' },
  { q: '"DURATION: 2h 30m" pada jadwal perjalanan artinya...', opts: ['Durasi perjalanan 2 jam 30 menit', 'Nomor kursi 230', 'Harga Rp 2,30', 'Jarak 2,5 km'], ans: 'Durasi perjalanan 2 jam 30 menit', exp: '"Duration" = durasi/lama waktu. "2h 30m" = 2 jam 30 menit.' },
  { q: '"FRI" adalah singkatan hari...', opts: ['Thursday', 'February', 'First', 'Friday'], ans: 'Friday', exp: '"Fri" = Friday (Jumat).' },
  { q: '"BOARDING NOW" pada layar bandara artinya...', opts: ['Menunggu boarding', 'Pesawat terlambat', 'Gate ditutup', 'Sedang boarding sekarang'], ans: 'Sedang boarding sekarang', exp: '"Boarding now" = proses naik pesawat sedang berlangsung.' },
  { q: '"MONTHLY CALENDAR" artinya...', opts: ['Kalender mingguan', 'Kalender harian', 'Kalender bulanan', 'Kalender tahunan'], ans: 'Kalender bulanan', exp: '"Monthly" = bulanan. "Calendar" = kalender.' },
  { q: '"SAT" adalah singkatan hari...', opts: ['September', 'Start', 'Saturday', 'Sunday'], ans: 'Saturday', exp: '"Sat" = Saturday (Sabtu).' },
  { q: '"LAST TRAIN: 22:30" artinya...', opts: ['Kereta terakhir jam 22.30', 'Kereta lambat jam 22.30', 'Kereta cepat jam 22.30', 'Kereta pertama jam 22.30'], ans: 'Kereta terakhir jam 22.30', exp: '"Last train" = kereta terakhir.' },
  { q: '"Appointment: Dr. Sari | 10:00 AM | Room 3" artinya...', opts: ['Jadwal Ruang 3', 'Janji Dr. Sari jam 10 pagi di Ruang 3', 'Dokter Sari ada jam 10 malam', 'Ruang 3 tersedia jam 10'], ans: 'Janji Dr. Sari jam 10 pagi di Ruang 3', exp: '"Appointment" = janji temu. "AM" = pagi hari.' },
  { q: '"THU" adalah singkatan hari...', opts: ['Tuesday', 'Three', 'Third', 'Thursday'], ans: 'Thursday', exp: '"Thu" = Thursday (Kamis).' },
];

const SCHEDULE_PASSAGE = {
  passageTitle: '🚌 Bacaan: Jadwal Bus Kota',
  passage: (
    <div className="space-y-3">
      <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl overflow-hidden">
        <div className="bg-blue-600 px-4 py-2 text-white">
          <p className="font-extrabold text-sm">🚌 BUS ROUTE 12 — City Center to Airport</p>
          <p className="text-xs text-blue-200">Operates: Monday – Saturday | NO service on Sunday</p>
        </div>
        <div className="p-4">
          <div className="space-y-2 text-sm">
            {[
              { dep: '06:00', arr: '06:45', status: 'ON TIME' },
              { dep: '08:30', arr: '09:15', status: 'ON TIME' },
              { dep: '11:00', arr: '11:45', status: 'DELAYED' },
              { dep: '14:00', arr: '14:45', status: 'ON TIME' },
              { dep: '17:30', arr: '18:15', status: 'ON TIME' },
              { dep: '20:00', arr: '20:45', status: 'LAST BUS' },
            ].map((r, i) => (
              <div key={i} className="flex items-center justify-between bg-white rounded-xl px-3 py-2 border border-blue-100">
                <span className="text-slate-600 text-xs">DEP <b className="text-slate-800">{r.dep}</b></span>
                <span className="text-slate-400 text-xs">→</span>
                <span className="text-slate-600 text-xs">ARR <b className="text-slate-800">{r.arr}</b></span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${r.status === 'ON TIME' ? 'bg-green-100 text-green-700' : r.status === 'DELAYED' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{r.status}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-blue-400 mt-3">Price: Rp 15,000 per trip | Duration: ±45 minutes</p>
        </div>
      </div>
    </div>
  ),
  questions: [
    { q: 'Bus ini beroperasi pada hari apa?', opts: ['Senin–Sabtu', 'Sabtu–Minggu saja', 'Senin–Jumat', 'Setiap hari'], ans: 'Senin–Sabtu' },
    { q: 'Bus manakah yang mengalami keterlambatan?', opts: ['Bus jam 08:30', 'Bus jam 06:00', 'Bus jam 14:00', 'Bus jam 11:00'], ans: 'Bus jam 11:00' },
    { q: 'Berapa lama perjalanan bus ini?', opts: ['45 menit', '1 jam', '1,5 jam', '30 menit'], ans: '45 menit' },
    { q: 'Bus terakhir berangkat jam berapa?', opts: ['18:15', '20:45', '17:30', '20:00'], ans: '20:00' },
    { q: 'Berapa harga tiket bus ini?', opts: ['Rp 20.000', 'Rp 15.000', 'Rp 10.000', 'Gratis'], ans: 'Rp 15.000' },
  ] as ComprehensionQ[],
};

const ReadingLesson8: React.FC = () => {
  const navigate = useNavigate();
  const nextPath = '/modul/english/beginner/reading/lesson-9';
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedReadingLessons().includes(8));
  const [showModal, setShowModal] = React.useState(false);
  const [activeTab, setActiveTab] = useState<'baca' | 'latihan' | 'kuis'>('baca');
  const handleComplete = () => { markReadingComplete(8); setIsCompleted(true); setShowModal(true); };

  const days = [
    { short: 'MON', full: 'Monday', id: 'Senin' }, { short: 'TUE', full: 'Tuesday', id: 'Selasa' },
    { short: 'WED', full: 'Wednesday', id: 'Rabu' }, { short: 'THU', full: 'Thursday', id: 'Kamis' },
    { short: 'FRI', full: 'Friday', id: 'Jumat' }, { short: 'SAT', full: 'Saturday', id: 'Sabtu' },
    { short: 'SUN', full: 'Sunday', id: 'Minggu' },
  ];

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)' }} onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg,#4FA3D1,#1E6F9F)' }}><span style={{ fontSize: 38 }}>🏆</span></div>
            <h2 className="text-xl font-extrabold mb-1">Lesson 8 Selesai! 🎉</h2>
            <p className="text-sm text-gray-500 mb-5">Kamu sudah bisa membaca jadwal dan kalender!</p>
            <div className="flex gap-3">
              <button onClick={() => { setShowModal(false); navigate(nextPath); }} className="flex-1 py-3 rounded-xl font-bold text-white bg-green-500">Lesson 9 ›</button>
              <button onClick={() => { setShowModal(false); navigate(-1); }} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700">Kembali</button>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col h-[100dvh] md:h-full bg-slate-50">
        <header className="flex-none bg-white/95 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100 shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg></button>
            <div className="text-center"><h1 className="text-sm font-bold text-slate-800">Jadwal & Kalender</h1><p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">Reading • Lesson 8</p></div>
            <button onClick={() => navigate(nextPath)} className="px-3 h-9 rounded-full text-xs font-bold text-white bg-green-500">Next ›</button>
          </div>
        </header>
        <div className="flex bg-white border-b border-slate-100 sticky top-[65px] z-10 shadow-sm">
          {(['baca', 'latihan', 'kuis'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-3 text-xs font-bold tracking-wide transition-all ${activeTab === tab ? 'text-green-600 border-b-2 border-sky-500' : 'text-slate-400'}`}>
              {tab === 'baca' ? '📖 Baca' : tab === 'latihan' ? '✏️ Latihan' : '🎯 Kuis'}
            </button>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 pb-28 space-y-5">
            {activeTab === 'baca' && (
              <>
                <div className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl p-5 text-white shadow-lg">
                  <h2 className="text-lg font-extrabold mb-1">Jadwal & Kalender</h2>
                  <p className="text-sm text-green-100">Pelajari cara membaca jadwal bus, kereta, dokter, dan kalender dalam bahasa Inggris!</p>
                </div>
                <ReadingCard title="📅 Hari dalam Seminggu" icon="🗓️">
                  <div className="grid grid-cols-1 gap-1.5">
                    {days.map(d => (
                      <div key={d.short} className="flex items-center gap-3 bg-slate-50 rounded-xl px-3 py-2">
                        <span className="text-xs font-extrabold text-green-600 bg-green-100 w-12 text-center py-1 rounded-lg">{d.short}</span>
                        <p className="text-sm font-bold text-slate-800">{d.full}</p>
                        <p className="text-xs text-slate-400 ml-auto">{d.id}</p>
                      </div>
                    ))}
                  </div>
                </ReadingCard>
                <ReadingCard title="✈️ Status Jadwal Penerbangan" icon="🛫">
                  <div className="space-y-2">
                    {[
                      { status: 'ON TIME', color: 'green', id: 'Tepat waktu' },
                      { status: 'DELAYED', color: 'yellow', id: 'Terlambat' },
                      { status: 'BOARDING', color: 'blue', id: 'Sedang boarding' },
                      { status: 'CANCELLED', color: 'red', id: 'Dibatalkan' },
                      { status: 'DEPARTED', color: 'gray', id: 'Sudah berangkat' },
                    ].map(s => (
                      <div key={s.status} className="flex items-center justify-between bg-slate-50 rounded-xl px-3 py-2">
                        <span className={`font-extrabold text-sm ${s.color === 'green' ? 'text-green-600' : s.color === 'yellow' ? 'text-yellow-600' : s.color === 'blue' ? 'text-blue-600' : s.color === 'red' ? 'text-red-600' : 'text-gray-500'}`}>{s.status}</span>
                        <span className="text-xs text-slate-500">{s.id}</span>
                      </div>
                    ))}
                  </div>
                </ReadingCard>
              </>
            )}
            {activeTab === 'latihan' && <ComprehensionSection {...SCHEDULE_PASSAGE} />}
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

export default ReadingLesson8;
