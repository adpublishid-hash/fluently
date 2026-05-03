import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine, ReadingCard, ComprehensionSection, getCompletedReadingLessons, markReadingComplete } from './readingUtils';
import type { QuizItem, ComprehensionQ } from './readingUtils';

/* ══ DATA ═══════════════════════════════════════════════ */
const QUIZ: QuizItem[] = [
    { q: '(Review) Latihan 1 - What is on sale?', opts: ["Shoes, T-shirts, and Electronics","Only shoes","Food and drinks","Cars and bikes"], ans: "Shoes, T-shirts, and Electronics", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Pemahaman Cepat) Latihan 2 - How much are the shoes now?', opts: ["$10","$60","$30","$50"], ans: "$30", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Analisis Singkat) Latihan 3 - What is the discount for Electronics?', opts: ["50% OFF","10% OFF","30% OFF","20% OFF"], ans: "20% OFF", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Mencari Fakta) Latihan 4 - When does the sale end?', opts: ["December 31st","Tomorrow","Next week","January 1st"], ans: "December 31st", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Review) Latihan 5 - What happens if you buy 2 T-shirts?', opts: ["Nothing","You pay double","You get 50% off","You get 1 free"], ans: "You get 1 free", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Pemahaman Cepat) Latihan 6 - What is on sale?', opts: ["Cars and bikes","Food and drinks","Only shoes","Shoes, T-shirts, and Electronics"], ans: "Shoes, T-shirts, and Electronics", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Analisis Singkat) Latihan 7 - How much are the shoes now?', opts: ["$10","$60","$30","$50"], ans: "$30", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Mencari Fakta) Latihan 8 - What is the discount for Electronics?', opts: ["20% OFF","50% OFF","30% OFF","10% OFF"], ans: "20% OFF", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Review) Latihan 9 - When does the sale end?', opts: ["January 1st","Tomorrow","Next week","December 31st"], ans: "December 31st", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Pemahaman Cepat) Latihan 10 - What happens if you buy 2 T-shirts?', opts: ["You get 50% off","You pay double","You get 1 free","Nothing"], ans: "You get 1 free", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Analisis Singkat) Latihan 11 - What is on sale?', opts: ["Shoes, T-shirts, and Electronics","Cars and bikes","Only shoes","Food and drinks"], ans: "Shoes, T-shirts, and Electronics", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Mencari Fakta) Latihan 12 - How much are the shoes now?', opts: ["$10","$60","$50","$30"], ans: "$30", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Review) Latihan 13 - What is the discount for Electronics?', opts: ["20% OFF","30% OFF","50% OFF","10% OFF"], ans: "20% OFF", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Pemahaman Cepat) Latihan 14 - When does the sale end?', opts: ["December 31st","Tomorrow","Next week","January 1st"], ans: "December 31st", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Analisis Singkat) Latihan 15 - What happens if you buy 2 T-shirts?', opts: ["You get 1 free","Nothing","You pay double","You get 50% off"], ans: "You get 1 free", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Mencari Fakta) Latihan 16 - What is on sale?', opts: ["Shoes, T-shirts, and Electronics","Cars and bikes","Only shoes","Food and drinks"], ans: "Shoes, T-shirts, and Electronics", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Review) Latihan 17 - How much are the shoes now?', opts: ["$10","$50","$60","$30"], ans: "$30", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Pemahaman Cepat) Latihan 18 - What is the discount for Electronics?', opts: ["30% OFF","20% OFF","50% OFF","10% OFF"], ans: "20% OFF", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Analisis Singkat) Latihan 19 - When does the sale end?', opts: ["Next week","January 1st","Tomorrow","December 31st"], ans: "December 31st", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Mencari Fakta) Latihan 20 - What happens if you buy 2 T-shirts?', opts: ["Nothing","You pay double","You get 1 free","You get 50% off"], ans: "You get 1 free", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' }
];

const COMPREHENSION: { passageTitle: string; passage: React.ReactNode; questions: ComprehensionQ[] } = {
  passageTitle: '🏷️ Bacaan: Iklan Sederhana',
  passage: (
    <>
      <div className='text-center border-4 border-red-500 p-4 mb-4'><h2 className='text-2xl font-black text-red-600 uppercase'>End of Year Sale!</h2><p className='text-xl font-bold'>Up to 50% OFF</p><ul className='my-3 space-y-1 text-left bg-red-50 p-3'><li>👟 <b>Shoes:</b> $30 (was $60)</li><li>👕 <b>T-Shirts:</b> $10 (Buy 2 Get 1 Free)</li><li>📱 <b>Electronics:</b> 20% OFF</li></ul><p className='text-sm italic'>Valid until December 31st. Limited stock!</p></div>
    </>
  ),
  questions: [
    { q: 'What is on sale?', opts: ["Shoes, T-shirts, and Electronics","Only shoes","Cars and bikes","Food and drinks"], ans: 'Shoes, T-shirts, and Electronics' },
    { q: 'How much are the shoes now?', opts: ["$50","$10","$60","$30"], ans: '$30' },
    { q: 'What is the discount for Electronics?', opts: ["50% OFF","20% OFF","30% OFF","10% OFF"], ans: '20% OFF' },
    { q: 'When does the sale end?', opts: ["Next week","January 1st","December 31st","Tomorrow"], ans: 'December 31st' },
    { q: 'What happens if you buy 2 T-shirts?', opts: ["You get 50% off","Nothing","You pay double","You get 1 free"], ans: 'You get 1 free' },
  ],
};

/* ══ MAIN ═══════════════════════════════════════════════ */
export default function ReadingLesson1(): React.ReactElement {
  const navigate = useNavigate();
  const nextPath = '/modul/english/elementary/reading/lesson-2';
  const [isCompleted, setIsCompleted] = useState(() => getCompletedReadingLessons().includes(1));
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'baca' | 'latihan' | 'kuis'>('baca');

  const handleComplete = () => { markReadingComplete(1); setIsCompleted(true); setShowModal(true); };

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
            <div className="text-center"><h1 className="text-sm font-bold text-slate-800">Iklan Sederhana</h1><p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">A2 Reading • Latihan 1</p></div>
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
                  <h2 className="text-lg font-extrabold mb-1">Memahami teks diskon & promo</h2>
                  <p className="text-sm text-blue-100">Pemahaman membaca level A2 mengharuskan kamu untuk bisa menemukan informasi dengan cepat dan tepat pada dokumen tertulis.</p>
                </div>

                <ReadingCard title="Informasi Konteks" icon="🏷️">
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