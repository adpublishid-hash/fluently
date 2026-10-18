import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine, ReadingCard, ComprehensionSection, getCompletedReadingLessons, markReadingComplete } from './readingUtils';
import type { QuizItem, ComprehensionQ } from './readingUtils';
import { BookOpen, PenTool, CheckCircle2, ChevronLeft } from 'lucide-react';

import { shuffledAuthored } from '../../advanced/shared/authoredQuiz';
import { intermediateReadingQuizBank } from './quizBank';
import { lessonTips } from './lessonTips';
/* ══ DATA: QUIZ 20 SOAL (CEFR B1) ═══════════════════════════════════════════════ */
const QUIZ: QuizItem[] = shuffledAuthored(intermediateReadingQuizBank[12], 'intermediate/reading/12');

/* ══ DATA: KONTEN BACAAN (B1) ═══════════════════════════════════════════════ */
const COMPREHENSION: { passageTitle: string; passage: React.ReactNode; questions: ComprehensionQ[] } = {
  passageTitle: "Personal Letter: My New Routine",
  passage: (
    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 shadow-inner text-slate-800" dangerouslySetInnerHTML={{ __html: "Dear Grandad,<br/><br/>Thanks for your card – it arrived just before my first exam! Life at university is busier than I imagined. On weekdays I get up at seven, catch the 7:45 bus and have lectures from nine until one. After lunch, I go to the library, and then I work at a bookshop from four until seven on Mondays and Wednesdays.<br/><br/>At first I found it hard to organise my time, and I missed a seminar because I read the timetable wrongly. Now I write everything in a diary, and it really helps. Next month I'm moving into a flat with two friends from my course. I'll send you the new address once I have the keys.<br/><br/>Lots of love,<br/>Emma" }} />
  ),
  questions: [
  {
    "q": "What time does Emma catch the bus?",
    "opts": [
      "7:00",
      "7:45",
      "9:00",
      "8:15"
    ],
    "ans": "7:45"
  },
  {
    "q": "On which days does Emma work at the bookshop?",
    "opts": [
      "Every weekday",
      "Tuesdays and Thursdays",
      "Mondays and Wednesdays",
      "At weekends"
    ],
    "ans": "Mondays and Wednesdays"
  },
  {
    "q": "Why did Emma miss a seminar?",
    "opts": [
      "She overslept.",
      "She was working at the bookshop.",
      "The bus was late.",
      "She read the timetable wrongly."
    ],
    "ans": "She read the timetable wrongly."
  },
  {
    "q": "What helps Emma organise her time now?",
    "opts": [
      "Writing everything in a diary",
      "Asking her friends for help",
      "Phoning her grandad",
      "Working fewer hours"
    ],
    "ans": "Writing everything in a diary"
  },
  {
    "q": "What will Emma do when she gets the keys to the flat?",
    "opts": [
      "Visit her grandad for the weekend",
      "Start a new job",
      "Send her grandad the new address",
      "Buy a new diary"
    ],
    "ans": "Send her grandad the new address"
  }
]
};

/* ══ MAIN COMPONENT ═══════════════════════════════════════════════ */
export default function InterReadingLesson12(): React.ReactElement {
  const navigate = useNavigate();
  const nextPath = '/modul/english/intermediate/reading/lesson-13';
  const [isCompleted, setIsCompleted] = useState(() => getCompletedReadingLessons().includes(12));
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'baca' | 'latihan' | 'kuis'>('baca');

  const handleComplete = () => { markReadingComplete(12); setIsCompleted(true); setShowModal(true); };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 animate-fade-in" style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }} onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-[2rem] p-8 max-w-sm w-full text-center shadow-2xl relative overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-t-[2rem] -z-10" />
            <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 bg-white shadow-xl border-4 border-indigo-50 mt-4">
              <span className="text-5xl">🏆</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-800 mb-2">Lesson Selesai! 🎉</h2>
            <p className="text-slate-500 mb-8 leading-relaxed">Selamat! Anda berhasil memahami teks ini dengan standar <b>B1 (Intermediate)</b>.</p>
            <div className="space-y-3">
              <button onClick={() => { setShowModal(false); navigate(nextPath); }} className="w-full py-4 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all active:scale-95">Pelajari Materi Selanjutnya</button>
              <button onClick={() => setShowModal(false)} className="w-full py-4 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all">Tutup</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col h-[100dvh] md:h-[calc(100vh-2rem)] bg-slate-50 md:rounded-3xl overflow-hidden shadow-2xl md:max-w-4xl md:mx-auto md:my-4 border border-slate-200">
        <header className="flex-none bg-white/80 backdrop-blur-xl sticky top-0 z-20 border-b border-slate-100 shadow-sm transition-all py-3 px-4">
          <div className="flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-600 transition-colors">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="text-center">
              <h1 className="text-base font-extrabold text-slate-800 tracking-tight">{COMPREHENSION.passageTitle}</h1>
              <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-widest bg-indigo-50 inline-block px-2 py-0.5 rounded-full mt-0.5">Reading B1: Changes and Feelings</p>
            </div>
            <button onClick={() => navigate(nextPath)} className="px-4 py-2 rounded-full text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors">Next ›</button>
          </div>
        </header>

        {/* Custom Tabs */}
        <div className="flex bg-white border-b border-slate-100 sticky top-[65px] z-10 shadow-sm p-2 gap-2">
          {(['baca', 'latihan', 'kuis'] as const).map((tab) => {
            const labels = { baca: 'Materi', latihan: 'Pemahaman', kuis: 'Kuis 20 Soal' };
            const icons = { baca: <BookOpen className="w-4 h-4" />, latihan: <PenTool className="w-4 h-4" />, kuis: <CheckCircle2 className="w-4 h-4" /> };
            const isActive = activeTab === tab;
            return (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-3 text-sm font-bold tracking-wide transition-all rounded-xl flex items-center justify-center gap-2 ${isActive ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}>
                {icons[tab]} {labels[tab]}
              </button>
            )
          })}
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-8 pb-28 space-y-6">
            {activeTab === 'baca' && (
              <div className="animate-fade-in space-y-6">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-10">
                     <BookOpen className="w-32 h-32" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-extrabold mb-2 relative z-10">{COMPREHENSION.passageTitle}</h2>
                  <p className="text-sm md:text-base text-indigo-100 leading-relaxed max-w-lg relative z-10">
                    Siswa pada level B1 diharapkan mampu memahami teks berisi info esensial dari ranah keseharian dan dunia kerja.
                  </p>
                </div>

                <ReadingCard title="Petunjuk Belajar" icon="💡">
                  <p className="text-sm text-slate-700 mb-3 leading-relaxed">
                    {lessonTips[12].intro}
                  </p>
                  <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside bg-slate-50 p-4 rounded-xl">
                    {lessonTips[12].tips.map(([label, text]) => (
                      <li key={label}><strong className="text-slate-800">{label}:</strong> {text}</li>
                    ))}
                  </ul>
                  <p className="text-sm text-slate-700 mt-4 font-medium italic">
                    Silakan lanjut ke tab <b>Pemahaman</b> untuk mengevaluasi bacaanmu!
                  </p>
                </ReadingCard>
              </div>
            )}

            {activeTab === 'latihan' && <ComprehensionSection {...COMPREHENSION} />}
            {activeTab === 'kuis' && <QuizEngine items={QUIZ} onComplete={handleComplete} />}
          </div>
        </div>

        <div className="sticky bottom-0 z-30 bg-white/90 backdrop-blur-xl border-t border-slate-200 p-4">
          <button onClick={isCompleted ? () => navigate(-1) : handleComplete} className="w-full py-4 rounded-2xl font-bold text-white flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all hover:shadow-xl" style={{ background: isCompleted ? 'linear-gradient(135deg,#10B981,#059669)' : 'linear-gradient(135deg,#4F46E5,#4338CA)' }}>
            <CheckCircle2 className="w-5 h-5" />
            {isCompleted ? 'Sudah Selesai ✓ (Kembali)' : 'Tandai Selesai ✓'}
          </button>
        </div>
      </div>
    </>
  );
}
