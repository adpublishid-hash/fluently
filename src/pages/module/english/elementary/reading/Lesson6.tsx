import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine, ReadingCard, ComprehensionSection, getCompletedReadingLessons, markReadingComplete } from './readingUtils';
import type { QuizItem, ComprehensionQ } from './readingUtils';

/* ══ DATA ═══════════════════════════════════════════════ */
const QUIZ: QuizItem[] = [
    { q: '(Review) Latihan 1 - What time does the breakfast buffet close?', opts: ["7 AM", "8 PM", "10 AM", "12 PM"], ans: "10 AM", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Pemahaman Cepat) Latihan 2 - Can you bring a dog to the resort?', opts: ["Yes, but only in the room", "Yes, anytime", "No, pets are not allowed", "Yes, but not at the beach"], ans: "No, pets are not allowed", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Analisis Singkat) Latihan 3 - When does the swimming pool close?', opts: ["10 AM", "8 PM", "7 AM", "Midnight"], ans: "8 PM", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Mencari Fakta) Latihan 4 - Is the Wi-Fi free?', opts: ["Only during breakfast", "No, you have to pay", "Only at the beach", "Yes, in all rooms"], ans: "Yes, in all rooms", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Review) Latihan 5 - What kind of access does the resort have?', opts: ["Public pool only", "Private beach access", "No beach", "Only a lake"], ans: "Private beach access", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Pemahaman Cepat) Latihan 6 - What time does the breakfast buffet close?', opts: ["7 AM", "8 PM", "12 PM", "10 AM"], ans: "10 AM", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Analisis Singkat) Latihan 7 - Can you bring a dog to the resort?', opts: ["Yes, but only in the room", "No, pets are not allowed", "Yes, anytime", "Yes, but not at the beach"], ans: "No, pets are not allowed", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Mencari Fakta) Latihan 8 - When does the swimming pool close?', opts: ["7 AM", "8 PM", "10 AM", "Midnight"], ans: "8 PM", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Review) Latihan 9 - Is the Wi-Fi free?', opts: ["Only during breakfast", "Only at the beach", "Yes, in all rooms", "No, you have to pay"], ans: "Yes, in all rooms", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Pemahaman Cepat) Latihan 10 - What kind of access does the resort have?', opts: ["Private beach access","Public pool only","No beach","Only a lake"], ans: "Private beach access", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Analisis Singkat) Latihan 11 - What time does the breakfast buffet close?', opts: ["8 PM", "12 PM", "10 AM", "7 AM"], ans: "10 AM", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Mencari Fakta) Latihan 12 - Can you bring a dog to the resort?', opts: ["Yes, anytime","Yes, but not at the beach","Yes, but only in the room","No, pets are not allowed"], ans: "No, pets are not allowed", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Review) Latihan 13 - When does the swimming pool close?', opts: ["7 AM", "8 PM", "10 AM", "Midnight"], ans: "8 PM", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Pemahaman Cepat) Latihan 14 - Is the Wi-Fi free?', opts: ["Only at the beach", "Yes, in all rooms", "No, you have to pay", "Only during breakfast"], ans: "Yes, in all rooms", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Analisis Singkat) Latihan 15 - What kind of access does the resort have?', opts: ["Public pool only", "No beach", "Private beach access", "Only a lake"], ans: "Private beach access", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Mencari Fakta) Latihan 16 - What time does the breakfast buffet close?', opts: ["7 AM", "10 AM", "12 PM", "8 PM"], ans: "10 AM", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Review) Latihan 17 - Can you bring a dog to the resort?', opts: ["Yes, but not at the beach", "Yes, but only in the room", "Yes, anytime", "No, pets are not allowed"], ans: "No, pets are not allowed", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Pemahaman Cepat) Latihan 18 - When does the swimming pool close?', opts: ["10 AM", "8 PM", "Midnight", "7 AM"], ans: "8 PM", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Analisis Singkat) Latihan 19 - Is the Wi-Fi free?', opts: ["Only during breakfast","Only at the beach","No, you have to pay","Yes, in all rooms"], ans: "Yes, in all rooms", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' },
    { q: '(Mencari Fakta) Latihan 20 - What kind of access does the resort have?', opts: ["Public pool only", "Only a lake", "Private beach access", "No beach"], ans: "Private beach access", exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' }
];

const COMPREHENSION: { passageTitle: string; passage: React.ReactNode; questions: ComprehensionQ[] } = {
  passageTitle: '🏖️ Bacaan: Brosur Wisata Pantai',
  passage: (
    <>
      <div className='bg-cyan-50 p-4 rounded-xl border border-cyan-300'><h2 className='text-lg font-bold text-cyan-800 mb-2'>🏖️ Welcome to Sunny Beach!</h2><p className='text-sm mb-2'>Enjoy the best summer holiday with us. We offer:</p><ul className='list-disc pl-5 text-sm space-y-1 mb-3'><li>Free Wi-Fi in all rooms</li><li>Breakfast buffet from 7 AM to 10 AM</li><li>Swimming pool access (closes at 8 PM)</li><li>Private beach access</li></ul><p className='text-xs font-bold text-red-600'>NO PETS ALLOWED.</p></div>
    </>
  ),
  questions: [
    { q: 'What time does the breakfast buffet close?', opts: ["7 AM", "12 PM", "10 AM", "8 PM"], ans: '10 AM' },
    { q: 'Can you bring a dog to the resort?', opts: ["Yes, but not at the beach", "Yes, anytime", "Yes, but only in the room", "No, pets are not allowed"], ans: 'No, pets are not allowed' },
    { q: 'When does the swimming pool close?', opts: ["10 AM","7 AM","8 PM","Midnight"], ans: '8 PM' },
    { q: 'Is the Wi-Fi free?', opts: ["Only during breakfast", "Yes, in all rooms", "No, you have to pay", "Only at the beach"], ans: 'Yes, in all rooms' },
    { q: 'What kind of access does the resort have?', opts: ["No beach", "Public pool only", "Private beach access", "Only a lake"], ans: 'Private beach access' },
  ],
};

/* ══ MAIN ═══════════════════════════════════════════════ */
export default function ReadingLesson6(): React.ReactElement {
  const navigate = useNavigate();
  const nextPath = '/modul/english/elementary/reading/lesson-7';
  const [isCompleted, setIsCompleted] = useState(() => getCompletedReadingLessons().includes(6));
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'baca' | 'latihan' | 'kuis'>('baca');

  const handleComplete = () => { markReadingComplete(6); setIsCompleted(true); setShowModal(true); };

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
            <div className="text-center"><h1 className="text-sm font-bold text-slate-800">Brosur Wisata Pantai</h1><p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">A2 Reading • Latihan 6</p></div>
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
                  <h2 className="text-lg font-extrabold mb-1">Memahami brosur liburan sederhana</h2>
                  <p className="text-sm text-blue-100">Pemahaman membaca level A2 mengharuskan kamu untuk bisa menemukan informasi dengan cepat dan tepat pada dokumen tertulis.</p>
                </div>

                <ReadingCard title="Informasi Konteks" icon="🏖️">
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