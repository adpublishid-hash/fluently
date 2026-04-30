import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine, ReadingCard, ComprehensionSection, getCompletedReadingLessons, markReadingComplete } from './readingUtils';
import type { QuizItem, ComprehensionQ } from './readingUtils';

/* ══ DATA ═══════════════════════════════════════════════ */
const QUIZ: QuizItem[] = [
    { q: '(Review) Latihan 1 - Which street do you walk on first?', opts: ["Hospital Street","Main Street","Elm Street","Supermarket Street"], ans: "Main Street", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Pemahaman Cepat) Latihan 2 - Which way do you turn at the traffic light?', opts: ["Turn around","Go straight","Right","Left"], ans: "Left", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Analisis Singkat) Latihan 3 - What building do you walk past?', opts: ["The pharmacy","The school","The bank","The supermarket"], ans: "The supermarket", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Mencari Fakta) Latihan 4 - What is next to the hospital?', opts: ["The supermarket","Elm Street","The traffic light","The pharmacy"], ans: "The pharmacy", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Review) Latihan 5 - On which side is the hospital located?', opts: ["On your right","Behind you","On your left","In front of you"], ans: "On your right", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Pemahaman Cepat) Latihan 6 - Which street do you walk on first?', opts: ["Main Street","Elm Street","Hospital Street","Supermarket Street"], ans: "Main Street", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Analisis Singkat) Latihan 7 - Which way do you turn at the traffic light?', opts: ["Left","Turn around","Right","Go straight"], ans: "Left", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Mencari Fakta) Latihan 8 - What building do you walk past?', opts: ["The school","The bank","The supermarket","The pharmacy"], ans: "The supermarket", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Review) Latihan 9 - What is next to the hospital?', opts: ["The traffic light","Elm Street","The pharmacy","The supermarket"], ans: "The pharmacy", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Pemahaman Cepat) Latihan 10 - On which side is the hospital located?', opts: ["On your right","Behind you","In front of you","On your left"], ans: "On your right", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Analisis Singkat) Latihan 11 - Which street do you walk on first?', opts: ["Supermarket Street","Hospital Street","Elm Street","Main Street"], ans: "Main Street", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Mencari Fakta) Latihan 12 - Which way do you turn at the traffic light?', opts: ["Turn around","Go straight","Right","Left"], ans: "Left", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Review) Latihan 13 - What building do you walk past?', opts: ["The school","The bank","The pharmacy","The supermarket"], ans: "The supermarket", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Pemahaman Cepat) Latihan 14 - What is next to the hospital?', opts: ["The pharmacy","The traffic light","Elm Street","The supermarket"], ans: "The pharmacy", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Analisis Singkat) Latihan 15 - On which side is the hospital located?', opts: ["Behind you","In front of you","On your left","On your right"], ans: "On your right", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Mencari Fakta) Latihan 16 - Which street do you walk on first?', opts: ["Supermarket Street","Hospital Street","Elm Street","Main Street"], ans: "Main Street", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Review) Latihan 17 - Which way do you turn at the traffic light?', opts: ["Left","Right","Go straight","Turn around"], ans: "Left", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Pemahaman Cepat) Latihan 18 - What building do you walk past?', opts: ["The school","The bank","The pharmacy","The supermarket"], ans: "The supermarket", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Analisis Singkat) Latihan 19 - What is next to the hospital?', opts: ["The supermarket","Elm Street","The traffic light","The pharmacy"], ans: "The pharmacy", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Mencari Fakta) Latihan 20 - On which side is the hospital located?', opts: ["On your right","On your left","In front of you","Behind you"], ans: "On your right", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' }
];

const COMPREHENSION: { passageTitle: string; passage: React.ReactNode; questions: ComprehensionQ[] } = {
  passageTitle: '🗺️ Bacaan: Teks Petunjuk Arah',
  passage: (
    <>
      <div className='bg-green-50 p-4 rounded-xl border border-sky-200'><h2 className='font-bold text-green-800 mb-2'>How to find City Hospital:</h2><p className='text-sm leading-relaxed'>1. Go straight on Main Street.<br/>2. Turn left at the traffic light onto Elm Street.<br/>3. Walk past the supermarket.<br/>4. The hospital is on your right, next to the pharmacy.</p></div>
    </>
  ),
  questions: [
    { q: 'Which street do you walk on first?', opts: ["Main Street","Elm Street","Hospital Street","Supermarket Street"], ans: 'Main Street' },
    { q: 'Which way do you turn at the traffic light?', opts: ["Go straight","Left","Turn around","Right"], ans: 'Left' },
    { q: 'What building do you walk past?', opts: ["The supermarket","The pharmacy","The bank","The school"], ans: 'The supermarket' },
    { q: 'What is next to the hospital?', opts: ["Elm Street","The supermarket","The pharmacy","The traffic light"], ans: 'The pharmacy' },
    { q: 'On which side is the hospital located?', opts: ["Behind you","On your left","On your right","In front of you"], ans: 'On your right' },
  ],
};

/* ══ MAIN ═══════════════════════════════════════════════ */
export default function ReadingLesson11(): React.ReactElement {
  const navigate = useNavigate();
  const nextPath = '/modul/english/elementary/reading/lesson-12';
  const [isCompleted, setIsCompleted] = useState(() => getCompletedReadingLessons().includes(11));
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'baca' | 'latihan' | 'kuis'>('baca');

  const handleComplete = () => { markReadingComplete(11); setIsCompleted(true); setShowModal(true); };

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
            <div className="text-center"><h1 className="text-sm font-bold text-slate-800">Teks Petunjuk Arah</h1><p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">A2 Reading • Latihan 11</p></div>
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
                  <h2 className="text-lg font-extrabold mb-1">Memahami navigasi tertulis</h2>
                  <p className="text-sm text-blue-100">Pemahaman membaca level A2 mengharuskan kamu untuk bisa menemukan informasi dengan cepat dan tepat pada dokumen tertulis.</p>
                </div>

                <ReadingCard title="Informasi Konteks" icon="🗺️">
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