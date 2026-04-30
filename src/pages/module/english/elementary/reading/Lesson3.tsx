import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine, ReadingCard, ComprehensionSection, getCompletedReadingLessons, markReadingComplete } from './readingUtils';
import type { QuizItem, ComprehensionQ } from './readingUtils';

/* ══ DATA ═══════════════════════════════════════════════ */
const QUIZ: QuizItem[] = [
    { q: '(Review) Latihan 1 - What time does Train 103 depart?', opts: ["08:30 AM","12:15 PM","04:00 PM","03:30 PM"], ans: "12:15 PM", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Pemahaman Cepat) Latihan 2 - Which platform does Train 101 use?', opts: ["Platform 5","Platform 3","Platform 4","Platform 1"], ans: "Platform 5", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Analisis Singkat) Latihan 3 - When should passengers arrive at the station?', opts: ["45 minutes before departure","1 hour early","Just in time","10 minutes before"], ans: "45 minutes before departure", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Mencari Fakta) Latihan 4 - How long is the journey for EuroStar 105?', opts: ["3 hours 30 minutes","3 hours 15 minutes","2 hours","4 hours"], ans: "3 hours 15 minutes", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Review) Latihan 5 - Which train leaves in the morning?', opts: ["EuroStar 105","EuroStar 101","EuroStar 103","None"], ans: "EuroStar 101", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Pemahaman Cepat) Latihan 6 - What time does Train 103 depart?', opts: ["12:15 PM","08:30 AM","03:30 PM","04:00 PM"], ans: "12:15 PM", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Analisis Singkat) Latihan 7 - Which platform does Train 101 use?', opts: ["Platform 1","Platform 5","Platform 3","Platform 4"], ans: "Platform 5", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Mencari Fakta) Latihan 8 - When should passengers arrive at the station?', opts: ["10 minutes before","1 hour early","45 minutes before departure","Just in time"], ans: "45 minutes before departure", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Review) Latihan 9 - How long is the journey for EuroStar 105?', opts: ["3 hours 30 minutes","3 hours 15 minutes","2 hours","4 hours"], ans: "3 hours 15 minutes", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Pemahaman Cepat) Latihan 10 - Which train leaves in the morning?', opts: ["None","EuroStar 105","EuroStar 103","EuroStar 101"], ans: "EuroStar 101", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Analisis Singkat) Latihan 11 - What time does Train 103 depart?', opts: ["12:15 PM","08:30 AM","04:00 PM","03:30 PM"], ans: "12:15 PM", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Mencari Fakta) Latihan 12 - Which platform does Train 101 use?', opts: ["Platform 5","Platform 3","Platform 4","Platform 1"], ans: "Platform 5", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Review) Latihan 13 - When should passengers arrive at the station?', opts: ["45 minutes before departure","10 minutes before","1 hour early","Just in time"], ans: "45 minutes before departure", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Pemahaman Cepat) Latihan 14 - How long is the journey for EuroStar 105?', opts: ["4 hours","2 hours","3 hours 30 minutes","3 hours 15 minutes"], ans: "3 hours 15 minutes", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Analisis Singkat) Latihan 15 - Which train leaves in the morning?', opts: ["None","EuroStar 105","EuroStar 103","EuroStar 101"], ans: "EuroStar 101", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Mencari Fakta) Latihan 16 - What time does Train 103 depart?', opts: ["03:30 PM","04:00 PM","08:30 AM","12:15 PM"], ans: "12:15 PM", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Review) Latihan 17 - Which platform does Train 101 use?', opts: ["Platform 3","Platform 1","Platform 4","Platform 5"], ans: "Platform 5", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Pemahaman Cepat) Latihan 18 - When should passengers arrive at the station?', opts: ["10 minutes before","Just in time","1 hour early","45 minutes before departure"], ans: "45 minutes before departure", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Analisis Singkat) Latihan 19 - How long is the journey for EuroStar 105?', opts: ["3 hours 15 minutes","4 hours","3 hours 30 minutes","2 hours"], ans: "3 hours 15 minutes", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Mencari Fakta) Latihan 20 - Which train leaves in the morning?', opts: ["EuroStar 105","EuroStar 103","EuroStar 101","None"], ans: "EuroStar 101", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' }
];

const COMPREHENSION: { passageTitle: string; passage: React.ReactNode; questions: ComprehensionQ[] } = {
  passageTitle: '🚆 Bacaan: Jadwal Kereta & Pesawat',
  passage: (
    <>
      <table className='w-full text-sm text-left border-collapse'><thead><tr className='bg-blue-800 text-white'><th>Train No.</th><th>Departs</th><th>Arrives</th><th>Platform</th></tr></thead><tbody><tr className='bg-blue-50'><td>EuroStar 101</td><td>08:30 AM</td><td>11:45 AM</td><td>5</td></tr><tr><td>EuroStar 103</td><td>12:15 PM</td><td>03:30 PM</td><td>4</td></tr><tr className='bg-blue-50'><td>EuroStar 105</td><td>04:00 PM</td><td>07:15 PM</td><td>5</td></tr></tbody></table><p className='text-xs mt-3 text-slate-500'>* Please arrive 45 minutes before departure.</p>
    </>
  ),
  questions: [
    { q: 'What time does Train 103 depart?', opts: ["12:15 PM","03:30 PM","08:30 AM","04:00 PM"], ans: '12:15 PM' },
    { q: 'Which platform does Train 101 use?', opts: ["Platform 3","Platform 5","Platform 4","Platform 1"], ans: 'Platform 5' },
    { q: 'When should passengers arrive at the station?', opts: ["Just in time","45 minutes before departure","1 hour early","10 minutes before"], ans: '45 minutes before departure' },
    { q: 'How long is the journey for EuroStar 105?', opts: ["4 hours","2 hours","3 hours 30 minutes","3 hours 15 minutes"], ans: '3 hours 15 minutes' },
    { q: 'Which train leaves in the morning?', opts: ["EuroStar 105","None","EuroStar 103","EuroStar 101"], ans: 'EuroStar 101' },
  ],
};

/* ══ MAIN ═══════════════════════════════════════════════ */
export default function ReadingLesson3(): React.ReactElement {
  const navigate = useNavigate();
  const nextPath = '/modul/english/elementary/reading/lesson-4';
  const [isCompleted, setIsCompleted] = useState(() => getCompletedReadingLessons().includes(3));
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'baca' | 'latihan' | 'kuis'>('baca');

  const handleComplete = () => { markReadingComplete(3); setIsCompleted(true); setShowModal(true); };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)' }} onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg,#3B82F6,#2563EB)' }}><span style={{ fontSize: 38 }}>🏆</span></div>
            <h2 className="text-xl font-extrabold mb-1">Materi Selesai! 🎉</h2>
            <p className="text-sm text-gray-500 mb-5">Kamu berhasil menyelesaikan latihan A2 Reading ini.</p>
            <div className="flex gap-3">
              <button onClick={() => { setShowModal(false); navigate(nextPath); }} className="flex-1 py-3 rounded-xl font-bold text-white bg-blue-500 hover:bg-blue-600 transition">Lanjut ›</button>
              <button onClick={() => { setShowModal(false); }} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700 hover:bg-gray-200 transition">Tutup</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col h-[100dvh] md:h-full bg-slate-50">
        <header className="flex-none bg-white/95 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100 shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg></button>
            <div className="text-center"><h1 className="text-sm font-bold text-slate-800">Jadwal Kereta & Pesawat</h1><p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">A2 Reading • Latihan 3</p></div>
            <button onClick={() => navigate(nextPath)} className="px-3 h-9 rounded-full text-xs font-bold text-white bg-blue-500 hover:bg-blue-600">Next ›</button>
          </div>
        </header>

        <div className="flex bg-white border-b border-slate-100 sticky top-[65px] z-10 shadow-sm">
          {(['baca', 'latihan', 'kuis'] as const).map((tab) => {
            const labels = { baca: '📖 Baca', latihan: '✏️ Latihan', kuis: '🎯 Kuis 20 Soal' };
            return (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-3 text-xs font-bold tracking-wide transition-all ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-500' : 'text-slate-400 hover:text-slate-600'}`}>{labels[tab]}</button>
            )
          })}
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 pb-28 space-y-5">
            {activeTab === 'baca' && (
              <>
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-5 text-white shadow-lg">
                  <h2 className="text-lg font-extrabold mb-1">Membaca tabel waktu perjalanan</h2>
                  <p className="text-sm text-blue-100">Pemahaman membaca level A2 mengharuskan kamu untuk bisa menemukan informasi dengan cepat dan tepat pada dokumen tertulis.</p>
                </div>

                <ReadingCard title="Informasi Konteks" icon="🚆">
                  <p className="text-sm text-slate-700 mb-2">Pada sesi materi ini, silakan klik tab <b>Latihan</b> untuk melihat contoh bacaan interaktif yang berfokus pada informasi keseharian seperti iklan, jadwal, atau pesanan.</p>
                  <p className="text-sm text-slate-700">Gunakan tab <b>Kuis 20 Soal</b> untuk melatih kemampuanmu dalam menjawab variasi pertanyaan pilihan ganda terkait berbagai skenario.</p>
                </ReadingCard>
              </>
            )}

            {activeTab === 'latihan' && <ComprehensionSection {...COMPREHENSION} />}
            {activeTab === 'kuis' && <QuizEngine items={QUIZ} onComplete={handleComplete} />}
          </div>
        </div>

        <div className="sticky bottom-0 z-30 bg-white/90 backdrop-blur-xl border-t border-gray-100 px-4 py-3">
          <button onClick={isCompleted ? () => navigate(-1) : handleComplete} className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all" style={{ background: isCompleted ? 'linear-gradient(135deg,#10B981,#059669)' : 'linear-gradient(135deg,#3B82F6,#2563EB)' }}>
            {isCompleted ? '✅ Selesai (Kembali)' : '✅ Tandai Selesai'}
          </button>
        </div>
      </div>
    </>
  );
}