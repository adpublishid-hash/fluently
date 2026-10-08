import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine, ReadingCard, ComprehensionSection, getCompletedReadingLessons, markReadingComplete } from './readingUtils';
import type { QuizItem, ComprehensionQ } from './readingUtils';

/* ══ DATA ═══════════════════════════════════════════════ */
const QUIZ: QuizItem[] = [
    { q: '(Review) Latihan 1 - How much does the Margherita Pizza cost?', opts: ["$12.00", "$14.50", "$8.00", "$3.00"], ans: "$12.00", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Pemahaman Cepat) Latihan 2 - Which dish has bacon in it?', opts: ["Margherita Pizza", "Caesar Salad", "Espresso", "Spaghetti Carbonara"], ans: "Spaghetti Carbonara", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Analisis Singkat) Latihan 3 - What do you get in a Caesar Salad?', opts: ["Tomato and mozzarella", "Pasta and cheese", "Egg and bacon", "Lettuce, croutons, parmesan"], ans: "Lettuce, croutons, parmesan", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Mencari Fakta) Latihan 4 - What is the cheapest item on this menu?', opts: ["Pizza", "Caesar Salad", "Espresso", "Spaghetti"], ans: "Espresso", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Review) Latihan 5 - What kind of restaurant is Luigi\'s?', opts: ["Japanese", "French", "Mexican", "Italian"], ans: "Italian", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Pemahaman Cepat) Latihan 6 - How much does the Margherita Pizza cost?', opts: ["$12.00", "$3.00", "$8.00", "$14.50"], ans: "$12.00", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Analisis Singkat) Latihan 7 - Which dish has bacon in it?', opts: ["Espresso", "Spaghetti Carbonara", "Margherita Pizza", "Caesar Salad"], ans: "Spaghetti Carbonara", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Mencari Fakta) Latihan 8 - What do you get in a Caesar Salad?', opts: ["Egg and bacon", "Lettuce, croutons, parmesan", "Tomato and mozzarella", "Pasta and cheese"], ans: "Lettuce, croutons, parmesan", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Review) Latihan 9 - What is the cheapest item on this menu?', opts: ["Pizza", "Spaghetti", "Caesar Salad", "Espresso"], ans: "Espresso", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Pemahaman Cepat) Latihan 10 - What kind of restaurant is Luigi\'s?', opts: ["French", "Japanese", "Italian", "Mexican"], ans: "Italian", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Analisis Singkat) Latihan 11 - How much does the Margherita Pizza cost?', opts: ["$14.50","$12.00","$8.00","$3.00"], ans: "$12.00", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Mencari Fakta) Latihan 12 - Which dish has bacon in it?', opts: ["Margherita Pizza", "Spaghetti Carbonara", "Caesar Salad", "Espresso"], ans: "Spaghetti Carbonara", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Review) Latihan 13 - What do you get in a Caesar Salad?', opts: ["Tomato and mozzarella", "Lettuce, croutons, parmesan", "Egg and bacon", "Pasta and cheese"], ans: "Lettuce, croutons, parmesan", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Pemahaman Cepat) Latihan 14 - What is the cheapest item on this menu?', opts: ["Espresso","Spaghetti","Caesar Salad","Pizza"], ans: "Espresso", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Analisis Singkat) Latihan 15 - What kind of restaurant is Luigi\'s?', opts: ["Italian", "Mexican", "French", "Japanese"], ans: "Italian", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Mencari Fakta) Latihan 16 - How much does the Margherita Pizza cost?', opts: ["$3.00", "$14.50", "$8.00", "$12.00"], ans: "$12.00", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Review) Latihan 17 - Which dish has bacon in it?', opts: ["Margherita Pizza", "Caesar Salad", "Espresso", "Spaghetti Carbonara"], ans: "Spaghetti Carbonara", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Pemahaman Cepat) Latihan 18 - What do you get in a Caesar Salad?', opts: ["Tomato and mozzarella", "Pasta and cheese", "Egg and bacon", "Lettuce, croutons, parmesan"], ans: "Lettuce, croutons, parmesan", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Analisis Singkat) Latihan 19 - What is the cheapest item on this menu?', opts: ["Spaghetti", "Pizza", "Caesar Salad", "Espresso"], ans: "Espresso", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Mencari Fakta) Latihan 20 - What kind of restaurant is Luigi\'s?', opts: ["Japanese", "Mexican", "Italian", "French"], ans: "Italian", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' }
];

const COMPREHENSION: { passageTitle: string; passage: React.ReactNode; questions: ComprehensionQ[] } = {
  passageTitle: '🍔 Bacaan: Menu Restoran',
  passage: (
    <>
      <div className='bg-red-50 p-4 border-2 border-red-800 rounded-lg text-center font-serif'><h2 className='text-xl text-red-800 mb-2 border-b-2 border-red-800'>MENU</h2><div className='text-left text-sm space-y-3'><div><b>🍕 Margherita Pizza</b> ................ $12.00<br/><span className='text-xs text-gray-500'>Tomato sauce, fresh mozzarella, basil</span></div><div><b>🍝 Spaghetti Carbonara</b> ............ $14.50<br/><span className='text-xs text-gray-500'>Pasta with egg, cheese, and bacon</span></div><div><b>🥗 Caesar Salad</b> ..................... $8.00<br/><span className='text-xs text-gray-500'>Lettuce, croutons, parmesan cheese</span></div><div><b>☕ Espresso</b> ......................... $3.00</div></div></div>
    </>
  ),
  questions: [
    { q: 'How much does the Margherita Pizza cost?', opts: ["$12.00", "$8.00", "$14.50", "$3.00"], ans: '$12.00' },
    { q: 'Which dish has bacon in it?', opts: ["Spaghetti Carbonara", "Espresso", "Margherita Pizza", "Caesar Salad"], ans: 'Spaghetti Carbonara' },
    { q: 'What do you get in a Caesar Salad?', opts: ["Pasta and cheese","Egg and bacon","Tomato and mozzarella","Lettuce, croutons, parmesan"], ans: 'Lettuce, croutons, parmesan' },
    { q: 'What is the cheapest item on this menu?', opts: ["Pizza", "Espresso", "Spaghetti", "Caesar Salad"], ans: 'Espresso' },
    { q: 'What kind of restaurant is Luigi\'s?', opts: ["Italian", "French", "Mexican", "Japanese"], ans: 'Italian' },
  ],
};

/* ══ MAIN ═══════════════════════════════════════════════ */
export default function ReadingLesson5(): React.ReactElement {
  const navigate = useNavigate();
  const nextPath = '/modul/english/elementary/reading/lesson-6';
  const [isCompleted, setIsCompleted] = useState(() => getCompletedReadingLessons().includes(5));
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'baca' | 'latihan' | 'kuis'>('baca');

  const handleComplete = () => { markReadingComplete(5); setIsCompleted(true); setShowModal(true); };

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
            <div className="text-center"><h1 className="text-sm font-bold text-slate-800">Menu Restoran</h1><p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">A2 Reading • Latihan 5</p></div>
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
                  <h2 className="text-lg font-extrabold mb-1">Memahami kategori makanan & harga</h2>
                  <p className="text-sm text-blue-100">Pemahaman membaca level A2 mengharuskan kamu untuk bisa menemukan informasi dengan cepat dan tepat pada dokumen tertulis.</p>
                </div>

                <ReadingCard title="Informasi Konteks" icon="🍔">
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