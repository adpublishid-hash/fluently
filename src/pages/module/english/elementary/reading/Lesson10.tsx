import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine, ReadingCard, ComprehensionSection, getCompletedReadingLessons, markReadingComplete } from './readingUtils';
import type { QuizItem, ComprehensionQ } from './readingUtils';

/* ══ DATA ═══════════════════════════════════════════════ */
const QUIZ: QuizItem[] = [
    { q: '(Review) Latihan 1 - What is the dog\'s name?', opts: ["Goldie","Max","Rex","Buddy"], ans: "Max", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Pemahaman Cepat) Latihan 2 - What breed is the dog?', opts: ["Bulldog","Beagle","Poodle","Golden Retriever"], ans: "Golden Retriever", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Analisis Singkat) Latihan 3 - What color is the dog\'s collar?', opts: ["Blue","Green","Light Brown","Red"], ans: "Blue", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Mencari Fakta) Latihan 4 - Where was the dog lost?', opts: ["In the mall","At home","At the beach","Near Central Park"], ans: "Near Central Park", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Review) Latihan 5 - How much is the reward?', opts: ["$100","$50","No reward","$200"], ans: "$100", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Pemahaman Cepat) Latihan 6 - What is the dog\'s name?', opts: ["Max","Buddy","Rex","Goldie"], ans: "Max", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Analisis Singkat) Latihan 7 - What breed is the dog?', opts: ["Beagle","Bulldog","Poodle","Golden Retriever"], ans: "Golden Retriever", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Mencari Fakta) Latihan 8 - What color is the dog\'s collar?', opts: ["Green","Light Brown","Red","Blue"], ans: "Blue", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Review) Latihan 9 - Where was the dog lost?', opts: ["At home","Near Central Park","At the beach","In the mall"], ans: "Near Central Park", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Pemahaman Cepat) Latihan 10 - How much is the reward?', opts: ["No reward","$200","$50","$100"], ans: "$100", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Analisis Singkat) Latihan 11 - What is the dog\'s name?', opts: ["Max","Goldie","Buddy","Rex"], ans: "Max", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Mencari Fakta) Latihan 12 - What breed is the dog?', opts: ["Bulldog","Poodle","Beagle","Golden Retriever"], ans: "Golden Retriever", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Review) Latihan 13 - What color is the dog\'s collar?', opts: ["Green","Light Brown","Red","Blue"], ans: "Blue", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Pemahaman Cepat) Latihan 14 - Where was the dog lost?', opts: ["Near Central Park","At the beach","In the mall","At home"], ans: "Near Central Park", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Analisis Singkat) Latihan 15 - How much is the reward?', opts: ["$50","$200","No reward","$100"], ans: "$100", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Mencari Fakta) Latihan 16 - What is the dog\'s name?', opts: ["Buddy","Rex","Goldie","Max"], ans: "Max", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Review) Latihan 17 - What breed is the dog?', opts: ["Golden Retriever","Poodle","Bulldog","Beagle"], ans: "Golden Retriever", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Pemahaman Cepat) Latihan 18 - What color is the dog\'s collar?', opts: ["Blue","Red","Light Brown","Green"], ans: "Blue", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Analisis Singkat) Latihan 19 - Where was the dog lost?', opts: ["Near Central Park","At the beach","In the mall","At home"], ans: "Near Central Park", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Mencari Fakta) Latihan 20 - How much is the reward?', opts: ["$200","$50","No reward","$100"], ans: "$100", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' }
];

const COMPREHENSION: { passageTitle: string; passage: React.ReactNode; questions: ComprehensionQ[] } = {
  passageTitle: '🎒 Bacaan: Pengumuman Barang Hilang',
  passage: (
    <>
      <div className='text-center p-5 bg-white border-4 border-dashed border-red-500'><h1 className='text-3xl font-black text-red-600 mb-2'>LOST DOG</h1><p className='text-left text-sm mb-3'><b>Name:</b> Max<br/><b>Breed:</b> Golden Retriever<br/><b>Color:</b> Light Brown<br/><b>Details:</b> Wearing a blue collar. Very friendly.</p><p className='font-bold bg-yellow-200 inline-block px-2 text-sm'>Lost on Monday near Central Park.</p><p className='mt-3 text-lg'><b>REWARD:</b> $100<br/>Call: 555-0192</p></div>
    </>
  ),
  questions: [
    { q: 'What is the dog\'s name?', opts: ["Goldie","Rex","Buddy","Max"], ans: 'Max' },
    { q: 'What breed is the dog?', opts: ["Beagle","Poodle","Bulldog","Golden Retriever"], ans: 'Golden Retriever' },
    { q: 'What color is the dog\'s collar?', opts: ["Light Brown","Green","Red","Blue"], ans: 'Blue' },
    { q: 'Where was the dog lost?', opts: ["Near Central Park","In the mall","At the beach","At home"], ans: 'Near Central Park' },
    { q: 'How much is the reward?', opts: ["No reward","$200","$50","$100"], ans: '$100' },
  ],
};

/* ══ MAIN ═══════════════════════════════════════════════ */
export default function ReadingLesson10(): React.ReactElement {
  const navigate = useNavigate();
  const nextPath = '/modul/english/elementary/reading/lesson-11';
  const [isCompleted, setIsCompleted] = useState(() => getCompletedReadingLessons().includes(10));
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'baca' | 'latihan' | 'kuis'>('baca');

  const handleComplete = () => { markReadingComplete(10); setIsCompleted(true); setShowModal(true); };

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
            <div className="text-center"><h1 className="text-sm font-bold text-slate-800">Pengumuman Barang Hilang</h1><p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">A2 Reading • Latihan 10</p></div>
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
                  <h2 className="text-lg font-extrabold mb-1">Memahami ciri barang di pengumuman</h2>
                  <p className="text-sm text-blue-100">Pemahaman membaca level A2 mengharuskan kamu untuk bisa menemukan informasi dengan cepat dan tepat pada dokumen tertulis.</p>
                </div>

                <ReadingCard title="Informasi Konteks" icon="🎒">
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