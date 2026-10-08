import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine, ReadingCard, ComprehensionSection, getCompletedReadingLessons, markReadingComplete } from './readingUtils';
import type { QuizItem, ComprehensionQ } from './readingUtils';

/* ══ DATA ═══════════════════════════════════════════════ */
const QUIZ: QuizItem[] = [
    { q: '(Review) Latihan 1 - Who is Emma writing to?', opts: ["Her sister", "Her teacher", "Her boss", "Mom & Dad"], ans: "Mom & Dad", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Pemahaman Cepat) Latihan 2 - Where is Emma right now?', opts: ["Lombok", "Jakarta", "Hawaii", "Bali"], ans: "Bali", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Analisis Singkat) Latihan 3 - What does Emma do every morning?', opts: ["Dances", "Goes to the beach", "Eats breakfast", "Sleeps in"], ans: "Goes to the beach", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Mencari Fakta) Latihan 4 - How is the weather in Bali according to Emma?', opts: ["Rainy and cold", "Very windy", "Cloudy", "Bright and hot"], ans: "Bright and hot", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Review) Latihan 5 - What did Emma see yesterday?', opts: ["A movie", "A museum", "A traditional dance", "A concert"], ans: "A traditional dance", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Pemahaman Cepat) Latihan 6 - Who is Emma writing to?', opts: ["Mom & Dad", "Her teacher", "Her sister", "Her boss"], ans: "Mom & Dad", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Analisis Singkat) Latihan 7 - Where is Emma right now?', opts: ["Jakarta", "Lombok", "Hawaii", "Bali"], ans: "Bali", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Mencari Fakta) Latihan 8 - What does Emma do every morning?', opts: ["Eats breakfast", "Goes to the beach", "Dances", "Sleeps in"], ans: "Goes to the beach", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Review) Latihan 9 - How is the weather in Bali according to Emma?', opts: ["Bright and hot", "Very windy", "Rainy and cold", "Cloudy"], ans: "Bright and hot", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Pemahaman Cepat) Latihan 10 - What did Emma see yesterday?', opts: ["A concert", "A museum", "A movie", "A traditional dance"], ans: "A traditional dance", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Analisis Singkat) Latihan 11 - Who is Emma writing to?', opts: ["Her boss", "Her teacher", "Her sister", "Mom & Dad"], ans: "Mom & Dad", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Mencari Fakta) Latihan 12 - Where is Emma right now?', opts: ["Hawaii", "Jakarta", "Bali", "Lombok"], ans: "Bali", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Review) Latihan 13 - What does Emma do every morning?', opts: ["Eats breakfast","Dances","Goes to the beach","Sleeps in"], ans: "Goes to the beach", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Pemahaman Cepat) Latihan 14 - How is the weather in Bali according to Emma?', opts: ["Cloudy", "Rainy and cold", "Very windy", "Bright and hot"], ans: "Bright and hot", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Analisis Singkat) Latihan 15 - What did Emma see yesterday?', opts: ["A traditional dance", "A museum", "A concert", "A movie"], ans: "A traditional dance", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Mencari Fakta) Latihan 16 - Who is Emma writing to?', opts: ["Her teacher", "Her sister", "Mom & Dad", "Her boss"], ans: "Mom & Dad", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Review) Latihan 17 - Where is Emma right now?', opts: ["Lombok", "Hawaii", "Bali", "Jakarta"], ans: "Bali", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Pemahaman Cepat) Latihan 18 - What does Emma do every morning?', opts: ["Goes to the beach", "Sleeps in", "Eats breakfast", "Dances"], ans: "Goes to the beach", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Analisis Singkat) Latihan 19 - How is the weather in Bali according to Emma?', opts: ["Very windy", "Cloudy", "Rainy and cold", "Bright and hot"], ans: "Bright and hot", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Mencari Fakta) Latihan 20 - What did Emma see yesterday?', opts: ["A movie", "A concert", "A museum", "A traditional dance"], ans: "A traditional dance", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' }
];

const COMPREHENSION: { passageTitle: string; passage: React.ReactNode; questions: ComprehensionQ[] } = {
  passageTitle: '📭 Bacaan: Kartu Pos',
  passage: (
    <>
      <div className='bg-[url(https://www.transparenttextures.com/patterns/cream-paper.png)] bg-amber-50 p-5 rounded font-serif shadow-md text-sm italic'>Dear Mom & Dad,<br/><br/>Bali is beautiful! We go to the beach every morning. The sun is very bright and hot.<br/>Yesterday, we saw a traditional dance. It was wonderful.<br/><br/>Miss you both!<br/>Love, Emma</div>
    </>
  ),
  questions: [
    { q: 'Who is Emma writing to?', opts: ["Her teacher", "Mom & Dad", "Her sister", "Her boss"], ans: 'Mom & Dad' },
    { q: 'Where is Emma right now?', opts: ["Jakarta", "Bali", "Lombok", "Hawaii"], ans: 'Bali' },
    { q: 'What does Emma do every morning?', opts: ["Goes to the beach", "Eats breakfast", "Sleeps in", "Dances"], ans: 'Goes to the beach' },
    { q: 'How is the weather in Bali according to Emma?', opts: ["Rainy and cold", "Bright and hot", "Cloudy", "Very windy"], ans: 'Bright and hot' },
    { q: 'What did Emma see yesterday?', opts: ["A museum", "A movie", "A traditional dance", "A concert"], ans: 'A traditional dance' },
  ],
};

/* ══ MAIN ═══════════════════════════════════════════════ */
export default function ReadingLesson9(): React.ReactElement {
  const navigate = useNavigate();
  const nextPath = '/modul/english/elementary/reading/lesson-10';
  const [isCompleted, setIsCompleted] = useState(() => getCompletedReadingLessons().includes(9));
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'baca' | 'latihan' | 'kuis'>('baca');

  const handleComplete = () => { markReadingComplete(9); setIsCompleted(true); setShowModal(true); };

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
            <div className="text-center"><h1 className="text-sm font-bold text-slate-800">Kartu Pos</h1><p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">A2 Reading • Latihan 9</p></div>
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
                  <h2 className="text-lg font-extrabold mb-1">Pesan pendek dari luar negeri</h2>
                  <p className="text-sm text-blue-100">Pemahaman membaca level A2 mengharuskan kamu untuk bisa menemukan informasi dengan cepat dan tepat pada dokumen tertulis.</p>
                </div>

                <ReadingCard title="Informasi Konteks" icon="📭">
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