import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine, ReadingCard, ComprehensionSection, getCompletedReadingLessons, markReadingComplete } from './readingUtils';
import type { QuizItem, ComprehensionQ } from './readingUtils';

/* ══ DATA ═══════════════════════════════════════════════ */
const QUIZ: QuizItem[] = [
    { q: '(Review) Latihan 1 - How many eggs are needed?', opts: ["1", "3", "None", "2"], ans: "1", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Pemahaman Cepat) Latihan 2 - What do you do first?', opts: ["Mix flour, milk, and egg in a bowl", "Cook for 2 minutes", "Pour the mix", "Melt butter in a pan"], ans: "Mix flour, milk, and egg in a bowl", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Analisis Singkat) Latihan 3 - Where do you melt the butter?', opts: ["In a bowl", "In a pan", "On a plate", "In the oven"], ans: "In a pan", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Mencari Fakta) Latihan 4 - How long should you cook it before flipping?', opts: ["Until it burns", "1 minute", "2 minutes", "5 minutes"], ans: "2 minutes", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Review) Latihan 5 - What can you serve the pancakes with?', opts: ["Honey or sugar", "Chocolate", "Fruit", "Jam or butter"], ans: "Honey or sugar", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Pemahaman Cepat) Latihan 6 - How many eggs are needed?', opts: ["3","None","2","1"], ans: "1", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Analisis Singkat) Latihan 7 - What do you do first?', opts: ["Melt butter in a pan", "Mix flour, milk, and egg in a bowl", "Cook for 2 minutes", "Pour the mix"], ans: "Mix flour, milk, and egg in a bowl", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Mencari Fakta) Latihan 8 - Where do you melt the butter?', opts: ["In a pan", "In a bowl", "On a plate", "In the oven"], ans: "In a pan", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Review) Latihan 9 - How long should you cook it before flipping?', opts: ["2 minutes", "Until it burns", "1 minute", "5 minutes"], ans: "2 minutes", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Pemahaman Cepat) Latihan 10 - What can you serve the pancakes with?', opts: ["Chocolate", "Honey or sugar", "Fruit", "Jam or butter"], ans: "Honey or sugar", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Analisis Singkat) Latihan 11 - How many eggs are needed?', opts: ["None", "1", "2", "3"], ans: "1", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Mencari Fakta) Latihan 12 - What do you do first?', opts: ["Mix flour, milk, and egg in a bowl", "Cook for 2 minutes", "Pour the mix", "Melt butter in a pan"], ans: "Mix flour, milk, and egg in a bowl", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Review) Latihan 13 - Where do you melt the butter?', opts: ["In a bowl", "In a pan", "On a plate", "In the oven"], ans: "In a pan", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Pemahaman Cepat) Latihan 14 - How long should you cook it before flipping?', opts: ["1 minute", "2 minutes", "5 minutes", "Until it burns"], ans: "2 minutes", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Analisis Singkat) Latihan 15 - What can you serve the pancakes with?', opts: ["Fruit", "Honey or sugar", "Jam or butter", "Chocolate"], ans: "Honey or sugar", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Mencari Fakta) Latihan 16 - How many eggs are needed?', opts: ["1", "3", "None", "2"], ans: "1", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Review) Latihan 17 - What do you do first?', opts: ["Pour the mix", "Mix flour, milk, and egg in a bowl", "Melt butter in a pan", "Cook for 2 minutes"], ans: "Mix flour, milk, and egg in a bowl", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Pemahaman Cepat) Latihan 18 - Where do you melt the butter?', opts: ["On a plate", "In a pan", "In a bowl", "In the oven"], ans: "In a pan", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Analisis Singkat) Latihan 19 - How long should you cook it before flipping?', opts: ["1 minute", "5 minutes", "Until it burns", "2 minutes"], ans: "2 minutes", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Mencari Fakta) Latihan 20 - What can you serve the pancakes with?', opts: ["Fruit", "Honey or sugar", "Chocolate", "Jam or butter"], ans: "Honey or sugar", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' }
];

const COMPREHENSION: { passageTitle: string; passage: React.ReactNode; questions: ComprehensionQ[] } = {
  passageTitle: '🥣 Bacaan: Resep Makanan Ringan',
  passage: (
    <>
      <div className='bg-orange-50 p-4 rounded-lg'><h2 className='font-serif text-lg font-bold text-orange-900 mb-2'>Pancake Recipe 🥞</h2><p className='text-sm mb-2 font-bold'>Ingredients: Flour, Milk, 1 Egg, Butter.</p><p className='text-sm leading-relaxed'>1. Mix the flour, milk, and egg in a bowl.<br/>2. Melt some butter in a pan.<br/>3. Pour the mix into the pan.<br/>4. Cook for 2 minutes, then flip it.<br/>5. Serve with honey or sugar.</p></div>
    </>
  ),
  questions: [
    { q: 'How many eggs are needed?', opts: ["2", "3", "None", "1"], ans: '1' },
    { q: 'What do you do first?', opts: ["Melt butter in a pan", "Mix flour, milk, and egg in a bowl", "Pour the mix", "Cook for 2 minutes"], ans: 'Mix flour, milk, and egg in a bowl' },
    { q: 'Where do you melt the butter?', opts: ["In the oven", "On a plate", "In a pan", "In a bowl"], ans: 'In a pan' },
    { q: 'How long should you cook it before flipping?', opts: ["1 minute", "Until it burns", "5 minutes", "2 minutes"], ans: '2 minutes' },
    { q: 'What can you serve the pancakes with?', opts: ["Jam or butter", "Honey or sugar", "Chocolate", "Fruit"], ans: 'Honey or sugar' },
  ],
};

/* ══ MAIN ═══════════════════════════════════════════════ */
export default function ReadingLesson14(): React.ReactElement {
  const navigate = useNavigate();
  const nextPath = '/modul/english/elementary/reading/lesson-15';
  const [isCompleted, setIsCompleted] = useState(() => getCompletedReadingLessons().includes(14));
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'baca' | 'latihan' | 'kuis'>('baca');

  const handleComplete = () => { markReadingComplete(14); setIsCompleted(true); setShowModal(true); };

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
            <div className="text-center"><h1 className="text-sm font-bold text-slate-800">Resep Makanan Ringan</h1><p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">A2 Reading • Latihan 14</p></div>
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
                  <h2 className="text-lg font-extrabold mb-1">Memahami langkah instruksional</h2>
                  <p className="text-sm text-blue-100">Pemahaman membaca level A2 mengharuskan kamu untuk bisa menemukan informasi dengan cepat dan tepat pada dokumen tertulis.</p>
                </div>

                <ReadingCard title="Informasi Konteks" icon="🥣">
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