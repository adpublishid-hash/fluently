import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine, ReadingCard, ComprehensionSection, getCompletedReadingLessons, markReadingComplete } from './readingUtils';
import type { QuizItem, ComprehensionQ } from './readingUtils';

/* ══ DATA ═══════════════════════════════════════════════ */
const QUIZ: QuizItem[] = [
    { q: '(Review) Latihan 1 - What is the passenger\'s name?', opts: ["JFK", "John Doe", "Alex Smith", "Sky Airlines"], ans: "Alex Smith", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Pemahaman Cepat) Latihan 2 - Where is the flight going?', opts: ["New York (JFK)", "Paris", "Gate 22B", "London (LHR)"], ans: "London (LHR)", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Analisis Singkat) Latihan 3 - What is the flight number?', opts: ["22B", "SK404", "LHR", "JFK"], ans: "SK404", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Mencari Fakta) Latihan 4 - What time does boarding start?', opts: ["09:00 AM", "12 OCT", "10:15 AM", "09:15 AM"], ans: "09:15 AM", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Review) Latihan 5 - Which gate should the passenger go to?', opts: ["SK404","22B","12","JFK"], ans: "22B", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Pemahaman Cepat) Latihan 6 - What is the passenger\'s name?', opts: ["John Doe", "JFK", "Alex Smith", "Sky Airlines"], ans: "Alex Smith", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Analisis Singkat) Latihan 7 - Where is the flight going?', opts: ["London (LHR)", "Gate 22B", "Paris", "New York (JFK)"], ans: "London (LHR)", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Mencari Fakta) Latihan 8 - What is the flight number?', opts: ["JFK", "22B", "SK404", "LHR"], ans: "SK404", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Review) Latihan 9 - What time does boarding start?', opts: ["10:15 AM", "09:15 AM", "09:00 AM", "12 OCT"], ans: "09:15 AM", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Pemahaman Cepat) Latihan 10 - Which gate should the passenger go to?', opts: ["SK404", "JFK", "22B", "12"], ans: "22B", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Analisis Singkat) Latihan 11 - What is the passenger\'s name?', opts: ["Sky Airlines", "JFK", "John Doe", "Alex Smith"], ans: "Alex Smith", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Mencari Fakta) Latihan 12 - Where is the flight going?', opts: ["Gate 22B", "Paris", "London (LHR)", "New York (JFK)"], ans: "London (LHR)", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Review) Latihan 13 - What is the flight number?', opts: ["LHR", "SK404", "JFK", "22B"], ans: "SK404", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Pemahaman Cepat) Latihan 14 - What time does boarding start?', opts: ["12 OCT", "10:15 AM", "09:00 AM", "09:15 AM"], ans: "09:15 AM", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Analisis Singkat) Latihan 15 - Which gate should the passenger go to?', opts: ["22B", "SK404", "12", "JFK"], ans: "22B", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Mencari Fakta) Latihan 16 - What is the passenger\'s name?', opts: ["JFK", "John Doe", "Alex Smith", "Sky Airlines"], ans: "Alex Smith", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Review) Latihan 17 - Where is the flight going?', opts: ["New York (JFK)", "Gate 22B", "London (LHR)", "Paris"], ans: "London (LHR)", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Pemahaman Cepat) Latihan 18 - What is the flight number?', opts: ["JFK","22B","SK404","LHR"], ans: "SK404", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Analisis Singkat) Latihan 19 - What time does boarding start?', opts: ["10:15 AM", "09:15 AM", "09:00 AM", "12 OCT"], ans: "09:15 AM", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Mencari Fakta) Latihan 20 - Which gate should the passenger go to?', opts: ["12", "JFK", "22B", "SK404"], ans: "22B", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' }
];

const COMPREHENSION: { passageTitle: string; passage: React.ReactNode; questions: ComprehensionQ[] } = {
  passageTitle: '✈️ Bacaan: Boarding Pass Penerbangan',
  passage: (
    <>
      <div className='border-2 border-indigo-200 bg-white rounded-xl overflow-hidden'><div className='bg-indigo-600 text-white p-2 font-bold flex justify-between'><span>SKY AIRLINES</span><span>BOARDING PASS</span></div><div className='p-4 text-sm flex gap-4'><div className='flex-1'><b>Passenger:</b> SMITH/ALEX<br/><b>From:</b> JFK (New York)<br/><b>To:</b> LHR (London)</div><div><b>Flight:</b> SK404<br/><b>Date:</b> 12 OCT<br/><b>Gate:</b> 22B</div></div><div className='bg-indigo-50 p-2 text-center text-xs font-bold text-indigo-800'>BOARDING TIME: 09:15 AM</div></div>
    </>
  ),
  questions: [
    { q: 'What is the passenger\'s name?', opts: ["Sky Airlines", "Alex Smith", "JFK", "John Doe"], ans: 'Alex Smith' },
    { q: 'Where is the flight going?', opts: ["New York (JFK)", "Paris", "London (LHR)", "Gate 22B"], ans: 'London (LHR)' },
    { q: 'What is the flight number?', opts: ["JFK", "LHR", "SK404", "22B"], ans: 'SK404' },
    { q: 'What time does boarding start?', opts: ["09:15 AM", "10:15 AM", "12 OCT", "09:00 AM"], ans: '09:15 AM' },
    { q: 'Which gate should the passenger go to?', opts: ["JFK", "22B", "12", "SK404"], ans: '22B' },
  ],
};

/* ══ MAIN ═══════════════════════════════════════════════ */
export default function ReadingLesson13(): React.ReactElement {
  const navigate = useNavigate();
  const nextPath = '/modul/english/elementary/reading/lesson-14';
  const [isCompleted, setIsCompleted] = useState(() => getCompletedReadingLessons().includes(13));
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'baca' | 'latihan' | 'kuis'>('baca');

  const handleComplete = () => { markReadingComplete(13); setIsCompleted(true); setShowModal(true); };

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
            <div className="text-center"><h1 className="text-sm font-bold text-slate-800">Boarding Pass Penerbangan</h1><p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">A2 Reading • Latihan 13</p></div>
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
                  <h2 className="text-lg font-extrabold mb-1">Membaca tiket pesawat dengan detail</h2>
                  <p className="text-sm text-blue-100">Pemahaman membaca level A2 mengharuskan kamu untuk bisa menemukan informasi dengan cepat dan tepat pada dokumen tertulis.</p>
                </div>

                <ReadingCard title="Informasi Konteks" icon="✈️">
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