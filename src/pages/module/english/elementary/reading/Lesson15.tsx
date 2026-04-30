import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine, ReadingCard, ComprehensionSection, getCompletedReadingLessons, markReadingComplete } from './readingUtils';
import type { QuizItem, ComprehensionQ } from './readingUtils';

/* ══ DATA ═══════════════════════════════════════════════ */
const QUIZ: QuizItem[] = [
    { q: '(Review) Latihan 1 - Why are the classes canceled?', opts: ["Teacher is sick","Because of the rain","Due to heavy snow","It's a holiday"], ans: "Due to heavy snow", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Pemahaman Cepat) Latihan 2 - Which classes are canceled?', opts: ["Morning classes on Tuesday","Afternoon classes","All classes on Tuesday","Wednesday classes"], ans: "Morning classes on Tuesday", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Analisis Singkat) Latihan 3 - Is the library closed?', opts: ["Only in the afternoon","Only in the morning","No, it will remain open","Yes, it is closed"], ans: "No, it will remain open", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Mencari Fakta) Latihan 4 - When will afternoon classes start?', opts: ["They are canceled","At 12:00 PM","At 2:00 PM","At 1:00 PM"], ans: "At 1:00 PM", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Review) Latihan 5 - Where should students check for updates?', opts: ["Their student email","The library","The teacher","The news"], ans: "Their student email", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Pemahaman Cepat) Latihan 6 - Why are the classes canceled?', opts: ["Teacher is sick","Because of the rain","Due to heavy snow","It's a holiday"], ans: "Due to heavy snow", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Analisis Singkat) Latihan 7 - Which classes are canceled?', opts: ["All classes on Tuesday","Morning classes on Tuesday","Afternoon classes","Wednesday classes"], ans: "Morning classes on Tuesday", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Mencari Fakta) Latihan 8 - Is the library closed?', opts: ["No, it will remain open","Only in the afternoon","Only in the morning","Yes, it is closed"], ans: "No, it will remain open", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Review) Latihan 9 - When will afternoon classes start?', opts: ["They are canceled","At 12:00 PM","At 2:00 PM","At 1:00 PM"], ans: "At 1:00 PM", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Pemahaman Cepat) Latihan 10 - Where should students check for updates?', opts: ["Their student email","The news","The library","The teacher"], ans: "Their student email", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Analisis Singkat) Latihan 11 - Why are the classes canceled?', opts: ["Because of the rain","It's a holiday","Due to heavy snow","Teacher is sick"], ans: "Due to heavy snow", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Mencari Fakta) Latihan 12 - Which classes are canceled?', opts: ["Wednesday classes","All classes on Tuesday","Morning classes on Tuesday","Afternoon classes"], ans: "Morning classes on Tuesday", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Review) Latihan 13 - Is the library closed?', opts: ["Only in the afternoon","Only in the morning","No, it will remain open","Yes, it is closed"], ans: "No, it will remain open", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Pemahaman Cepat) Latihan 14 - When will afternoon classes start?', opts: ["At 2:00 PM","At 1:00 PM","At 12:00 PM","They are canceled"], ans: "At 1:00 PM", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Analisis Singkat) Latihan 15 - Where should students check for updates?', opts: ["The news","The teacher","The library","Their student email"], ans: "Their student email", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Mencari Fakta) Latihan 16 - Why are the classes canceled?', opts: ["It's a holiday","Teacher is sick","Due to heavy snow","Because of the rain"], ans: "Due to heavy snow", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Review) Latihan 17 - Which classes are canceled?', opts: ["Wednesday classes","All classes on Tuesday","Afternoon classes","Morning classes on Tuesday"], ans: "Morning classes on Tuesday", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Pemahaman Cepat) Latihan 18 - Is the library closed?', opts: ["No, it will remain open","Yes, it is closed","Only in the morning","Only in the afternoon"], ans: "No, it will remain open", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Analisis Singkat) Latihan 19 - When will afternoon classes start?', opts: ["At 2:00 PM","At 1:00 PM","At 12:00 PM","They are canceled"], ans: "At 1:00 PM", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Mencari Fakta) Latihan 20 - Where should students check for updates?', opts: ["The library","The news","Their student email","The teacher"], ans: "Their student email", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' }
];

const COMPREHENSION: { passageTitle: string; passage: React.ReactNode; questions: ComprehensionQ[] } = {
  passageTitle: '🎓 Bacaan: Evaluasi Membaca A2',
  passage: (
    <>
      <div className='border-l-4 border-red-600 bg-gray-50 p-4'><h3 className='text-red-700 font-bold mb-1'>IMPORTANT NOTICE</h3><p className='text-sm'>Due to heavy snow, all morning classes on Tuesday are canceled. The library will remain open. Afternoon classes will start at 1:00 PM as usual. Please check your student email for updates.</p></div>
    </>
  ),
  questions: [
    { q: 'Why are the classes canceled?', opts: ["It's a holiday","Due to heavy snow","Because of the rain","Teacher is sick"], ans: 'Due to heavy snow' },
    { q: 'Which classes are canceled?', opts: ["Wednesday classes","All classes on Tuesday","Afternoon classes","Morning classes on Tuesday"], ans: 'Morning classes on Tuesday' },
    { q: 'Is the library closed?', opts: ["No, it will remain open","Yes, it is closed","Only in the morning","Only in the afternoon"], ans: 'No, it will remain open' },
    { q: 'When will afternoon classes start?', opts: ["At 12:00 PM","They are canceled","At 2:00 PM","At 1:00 PM"], ans: 'At 1:00 PM' },
    { q: 'Where should students check for updates?', opts: ["The news","The library","Their student email","The teacher"], ans: 'Their student email' },
  ],
};

/* ══ MAIN ═══════════════════════════════════════════════ */
export default function ReadingLesson15(): React.ReactElement {
  const navigate = useNavigate();
  const nextPath = '/modul/english/elementary';
  const [isCompleted, setIsCompleted] = useState(() => getCompletedReadingLessons().includes(15));
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'baca' | 'latihan' | 'kuis'>('baca');

  const handleComplete = () => { markReadingComplete(15); setIsCompleted(true); setShowModal(true); };

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
            <div className="text-center"><h1 className="text-sm font-bold text-slate-800">Evaluasi Membaca A2</h1><p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">A2 Reading • Latihan 15</p></div>
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
                  <h2 className="text-lg font-extrabold mb-1">Uji komprehensif teks pendek</h2>
                  <p className="text-sm text-blue-100">Pemahaman membaca level A2 mengharuskan kamu untuk bisa menemukan informasi dengan cepat dan tepat pada dokumen tertulis.</p>
                </div>

                <ReadingCard title="Informasi Konteks" icon="🎓">
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