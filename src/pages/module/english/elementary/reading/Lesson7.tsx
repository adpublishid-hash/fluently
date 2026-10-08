import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine, ReadingCard, ComprehensionSection, getCompletedReadingLessons, markReadingComplete } from './readingUtils';
import type { QuizItem, ComprehensionQ } from './readingUtils';

/* ══ DATA ═══════════════════════════════════════════════ */
const QUIZ: QuizItem[] = [
    { q: '(Review) Latihan 1 - Are you allowed to eat a sandwich in the library?', opts: ["No, eating is not allowed", "Only at the front desk", "Yes, anytime", "Yes, if you share"], ans: "No, eating is not allowed", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Pemahaman Cepat) Latihan 2 - What should you do with your phone?', opts: ["Turn it off completely", "Leave it outside", "Turn it to silent mode", "Talk quietly"], ans: "Turn it to silent mode", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Analisis Singkat) Latihan 3 - What drink is allowed in the library?', opts: ["Tea", "Soda", "Bottled water", "Coffee"], ans: "Bottled water", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Mencari Fakta) Latihan 4 - Where should you put books when finished?', opts: ["Return them to the front desk", "Take them home", "Put them back on the shelf", "Leave them on the table"], ans: "Return them to the front desk", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Review) Latihan 5 - What is the general atmosphere rule?', opts: ["Play music", "Laugh freely", "Keep quiet", "Talk loudly"], ans: "Keep quiet", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Pemahaman Cepat) Latihan 6 - Are you allowed to eat a sandwich in the library?', opts: ["Yes, anytime", "Yes, if you share", "No, eating is not allowed", "Only at the front desk"], ans: "No, eating is not allowed", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Analisis Singkat) Latihan 7 - What should you do with your phone?', opts: ["Talk quietly", "Turn it to silent mode", "Turn it off completely", "Leave it outside"], ans: "Turn it to silent mode", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Mencari Fakta) Latihan 8 - What drink is allowed in the library?', opts: ["Tea", "Soda", "Coffee", "Bottled water"], ans: "Bottled water", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Review) Latihan 9 - Where should you put books when finished?', opts: ["Return them to the front desk", "Put them back on the shelf", "Leave them on the table", "Take them home"], ans: "Return them to the front desk", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Pemahaman Cepat) Latihan 10 - What is the general atmosphere rule?', opts: ["Keep quiet", "Play music", "Laugh freely", "Talk loudly"], ans: "Keep quiet", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Analisis Singkat) Latihan 11 - Are you allowed to eat a sandwich in the library?', opts: ["Yes, anytime", "No, eating is not allowed", "Yes, if you share", "Only at the front desk"], ans: "No, eating is not allowed", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Mencari Fakta) Latihan 12 - What should you do with your phone?', opts: ["Turn it off completely","Turn it to silent mode","Leave it outside","Talk quietly"], ans: "Turn it to silent mode", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Review) Latihan 13 - What drink is allowed in the library?', opts: ["Coffee","Soda","Bottled water","Tea"], ans: "Bottled water", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Pemahaman Cepat) Latihan 14 - Where should you put books when finished?', opts: ["Put them back on the shelf", "Return them to the front desk", "Leave them on the table", "Take them home"], ans: "Return them to the front desk", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Analisis Singkat) Latihan 15 - What is the general atmosphere rule?', opts: ["Talk loudly", "Laugh freely", "Play music", "Keep quiet"], ans: "Keep quiet", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Mencari Fakta) Latihan 16 - Are you allowed to eat a sandwich in the library?', opts: ["Only at the front desk", "No, eating is not allowed", "Yes, anytime", "Yes, if you share"], ans: "No, eating is not allowed", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Review) Latihan 17 - What should you do with your phone?', opts: ["Turn it to silent mode", "Turn it off completely", "Leave it outside", "Talk quietly"], ans: "Turn it to silent mode", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Pemahaman Cepat) Latihan 18 - What drink is allowed in the library?', opts: ["Soda","Tea","Bottled water","Coffee"], ans: "Bottled water", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Analisis Singkat) Latihan 19 - Where should you put books when finished?', opts: ["Take them home", "Put them back on the shelf", "Leave them on the table", "Return them to the front desk"], ans: "Return them to the front desk", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Mencari Fakta) Latihan 20 - What is the general atmosphere rule?', opts: ["Play music", "Laugh freely", "Talk loudly", "Keep quiet"], ans: "Keep quiet", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' }
];

const COMPREHENSION: { passageTitle: string; passage: React.ReactNode; questions: ComprehensionQ[] } = {
  passageTitle: '⚠️ Bacaan: Papan Peringatan (Warning)',
  passage: (
    <>
      <div className='p-5 border-4 border-yellow-500 bg-yellow-50 text-center'><h1 className='text-xl text-yellow-800 font-bold mb-3'>⚠ LIBRARY RULES ⚠</h1><ul className='text-left space-y-2 text-sm font-medium'><li>🤫 Please keep quiet at all times.</li><li>📵 Turn your mobile phone to silent mode.</li><li>🍔 No eating or drinking inside (except bottled water).</li><li>📚 Return books to the front desk after reading.</li></ul></div>
    </>
  ),
  questions: [
    { q: 'Are you allowed to eat a sandwich in the library?', opts: ["Only at the front desk", "Yes, if you share", "No, eating is not allowed", "Yes, anytime"], ans: 'No, eating is not allowed' },
    { q: 'What should you do with your phone?', opts: ["Talk quietly", "Turn it to silent mode", "Turn it off completely", "Leave it outside"], ans: 'Turn it to silent mode' },
    { q: 'What drink is allowed in the library?', opts: ["Coffee", "Tea", "Bottled water", "Soda"], ans: 'Bottled water' },
    { q: 'Where should you put books when finished?', opts: ["Return them to the front desk", "Leave them on the table", "Take them home", "Put them back on the shelf"], ans: 'Return them to the front desk' },
    { q: 'What is the general atmosphere rule?', opts: ["Talk loudly", "Keep quiet", "Laugh freely", "Play music"], ans: 'Keep quiet' },
  ],
};

/* ══ MAIN ═══════════════════════════════════════════════ */
export default function ReadingLesson7(): React.ReactElement {
  const navigate = useNavigate();
  const nextPath = '/modul/english/elementary/reading/lesson-8';
  const [isCompleted, setIsCompleted] = useState(() => getCompletedReadingLessons().includes(7));
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'baca' | 'latihan' | 'kuis'>('baca');

  const handleComplete = () => { markReadingComplete(7); setIsCompleted(true); setShowModal(true); };

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
            <div className="text-center"><h1 className="text-sm font-bold text-slate-800">Papan Peringatan (Warning)</h1><p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">A2 Reading • Latihan 7</p></div>
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
                  <h2 className="text-lg font-extrabold mb-1">Memahami larangan & aturan A2</h2>
                  <p className="text-sm text-blue-100">Pemahaman membaca level A2 mengharuskan kamu untuk bisa menemukan informasi dengan cepat dan tepat pada dokumen tertulis.</p>
                </div>

                <ReadingCard title="Informasi Konteks" icon="⚠️">
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