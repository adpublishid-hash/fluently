import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ChevronLeft, ClipboardCheck, FileText, ListChecks, PenLine } from 'lucide-react';
import { getUpperInterWritingLesson, getUpperInterWritingQuiz } from './upperInterWritingContent';

const ACCENT = '#784212';
const STORAGE_KEY = 'talky_upper_intermediate_writing_completed';

function getCompleted(): number[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
}

function markComplete(n: number) {
  const done = getCompleted();
  if (!done.includes(n)) localStorage.setItem(STORAGE_KEY, JSON.stringify([...done, n]));
}

type Props = {
  lessonId: number;
};

export default function UpperInterWritingLesson({ lessonId }: Props) {
  const navigate = useNavigate();
  const lesson = getUpperInterWritingLesson(lessonId);
  const quiz = useMemo(() => lesson ? getUpperInterWritingQuiz(lesson) : [], [lesson]);
  const nextPath = lessonId < 20 ? `/modul/english/upper-intermediate/writing/lesson-${lessonId + 1}` : undefined;
  const [activeTab, setActiveTab] = useState<'belajar' | 'kuis'>('belajar');
  const [isCompleted, setIsCompleted] = useState(() => getCompleted().includes(lessonId));
  const [quizIdx, setQuizIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  if (!lesson) {
    return <div className="min-h-screen grid place-items-center text-slate-600">Materi tidak ditemukan.</div>;
  }

  const current = quiz[quizIdx];

  const handleAnswer = (opt: string) => {
    if (selected) return;
    setSelected(opt);
    if (opt === current.ans) setScore((value) => value + 1);
  };

  const handleNext = () => {
    if (quizIdx + 1 < quiz.length) {
      setQuizIdx((value) => value + 1);
      setSelected(null);
      return;
    }
    setFinished(true);
    markComplete(lessonId);
    setIsCompleted(true);
  };

  const handleComplete = () => {
    markComplete(lessonId);
    setIsCompleted(true);
  };

  const restartQuiz = () => {
    setQuizIdx(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  return (
    <div className="flex flex-col h-[100dvh] md:h-full bg-slate-50">
      <header className="flex-none bg-white/95 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100 shadow-sm">
        <div className="px-4 py-3 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-600">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="text-center min-w-0 px-2">
            <h1 className="text-sm font-bold text-slate-800 line-clamp-1">{lesson.title}</h1>
            <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: ACCENT }}>Upper-Intermediate Writing - L{lesson.id}</p>
          </div>
          {nextPath ? (
            <button onClick={() => navigate(nextPath)} className="px-3 h-9 rounded-full text-xs font-bold" style={{ color: ACCENT, backgroundColor: ACCENT + '18' }}>
              Next
            </button>
          ) : <div className="w-14" />}
        </div>
      </header>

      <div className="flex bg-white border-b border-slate-100 sticky top-[65px] z-10 p-2 gap-2">
        {(['belajar', 'kuis'] as const).map((tab) => {
          const labels = { belajar: 'Materi', kuis: 'Kuis 15 Soal' };
          const isActive = activeTab === tab;
          return (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={'flex-1 py-3 text-sm font-bold tracking-wide transition-all rounded-xl flex items-center justify-center gap-2 ' + (isActive ? 'text-white shadow-md' : 'text-slate-500 hover:bg-slate-50')}
              style={isActive ? { backgroundColor: ACCENT } : {}}>
              {labels[tab]}
            </button>
          );
        })}
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 md:p-8 pb-28 space-y-6">
          {activeTab === 'belajar' && (
            <div className="space-y-6">
              <div className="rounded-3xl p-6 text-white shadow-xl relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #784212, #5D3005)' }}>
                <div className="absolute top-0 right-0 p-6 opacity-20"><PenLine className="w-24 h-24" /></div>
                <h2 className="text-xl font-extrabold mb-1 relative z-10">{lesson.title}</h2>
                <p className="text-sm text-white/90 relative z-10">{lesson.genre} - CEFR B2</p>
                <p className="text-sm text-white/90 leading-relaxed mt-4 max-w-2xl relative z-10">{lesson.overview}</p>
              </div>

              <section className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5">
                <p className="text-xs font-extrabold uppercase tracking-widest mb-3" style={{ color: ACCENT }}>Tujuan Pembelajaran</p>
                <p className="text-sm text-slate-700 leading-relaxed">{lesson.outcome}</p>
              </section>

              <section className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5">
                <h3 className="font-extrabold text-slate-900 flex items-center gap-2 mb-4">
                  <FileText size={18} style={{ color: ACCENT }} />
                  Struktur Materi
                </h3>
                <div className="space-y-3">
                  {lesson.structure.map((item, index) => (
                    <div key={item} className="flex gap-3 rounded-2xl bg-slate-50 border border-slate-100 p-3">
                      <div className="w-8 h-8 rounded-xl text-white flex items-center justify-center text-sm font-bold shrink-0" style={{ backgroundColor: ACCENT }}>{index + 1}</div>
                      <p className="text-sm text-slate-700 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5">
                <h3 className="font-extrabold text-slate-900 flex items-center gap-2 mb-4">
                  <ListChecks size={18} style={{ color: ACCENT }} />
                  Language Focus B2
                </h3>
                <div className="grid gap-3">
                  {lesson.languageFocus.map((item) => (
                    <p key={item} className="text-sm text-slate-700 bg-amber-50 border border-amber-100 rounded-2xl px-4 py-3 leading-relaxed">{item}</p>
                  ))}
                </div>
              </section>

              <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 space-y-4">
                <p className="text-xs font-extrabold uppercase tracking-widest" style={{ color: ACCENT }}>Contoh & Analisis</p>
                {lesson.examples.map((ex) => (
                  <div key={ex.label} className="rounded-2xl overflow-hidden border border-slate-100">
                    <div className="px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-white" style={{ backgroundColor: ACCENT }}>{ex.label}</div>
                    <div className="bg-slate-50 px-4 py-3">
                      <p className="text-sm text-slate-800 leading-relaxed italic">"{ex.text}"</p>
                      <p className="text-xs text-slate-500 mt-2">{ex.note}</p>
                    </div>
                  </div>
                ))}
              </section>

              <section className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5">
                <p className="text-xs font-extrabold uppercase tracking-widest mb-3" style={{ color: ACCENT }}>Writing Task</p>
                <p className="text-sm text-slate-700 leading-relaxed mb-4">{lesson.writingTask}</p>
                <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4">
                  <p className="text-sm font-bold text-slate-900 mb-2">Planning Steps</p>
                  <ul className="space-y-2">
                    {lesson.planningSteps.map((step) => <li key={step} className="text-sm text-slate-600">- {step}</li>)}
                  </ul>
                </div>
              </section>

              <section className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                <p className="text-sm font-bold text-amber-900 mb-2">Checklist Revisi</p>
                <ul className="text-sm text-amber-800 space-y-1">
                  {lesson.checklist.map((item) => <li key={item}>- {item}</li>)}
                </ul>
              </section>
            </div>
          )}

          {activeTab === 'kuis' && (
            <div>
              {!finished && current ? (
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-5">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Soal {quizIdx + 1} / {quiz.length}</p>
                    <p className="text-xs font-bold" style={{ color: ACCENT }}>Skor: {score}</p>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 mb-4">
                    <div className="h-2 rounded-full transition-all" style={{ width: `${((quizIdx + (selected ? 1 : 0)) / quiz.length) * 100}%`, backgroundColor: ACCENT }} />
                  </div>
                  <p className="text-base font-bold text-slate-800 leading-relaxed">{current.q}</p>
                  <div className="space-y-3">
                    {current.opts.map((opt) => {
                      const isSelected = selected === opt;
                      const isCorrect = opt === current.ans;
                      const cls = selected
                        ? isCorrect
                          ? 'bg-green-100 border-green-400 text-green-800 font-bold'
                          : isSelected
                            ? 'bg-red-100 border-red-400 text-red-800'
                            : 'bg-slate-50 border-slate-200 text-slate-500'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-amber-300';
                      return (
                        <button key={opt} onClick={() => handleAnswer(opt)} disabled={Boolean(selected)} className={`w-full text-left px-4 py-3 rounded-xl border-2 text-sm transition-all ${cls}`}>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {selected && (
                    <div className="space-y-3">
                      <div className="mt-3 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                        <p className="text-xs font-bold text-blue-700 mb-1">Penjelasan</p>
                        <p className="text-sm text-blue-700">{current.exp}</p>
                      </div>
                      <button onClick={handleNext} className="w-full py-3 rounded-xl font-bold text-white" style={{ backgroundColor: ACCENT }}>
                        {quizIdx + 1 < quiz.length ? 'Soal Berikutnya' : 'Selesai'}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-white" style={{ backgroundColor: ACCENT }}>
                    <ClipboardCheck size={28} />
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-800">Kuis Selesai</h3>
                  <p className="text-4xl font-black" style={{ color: ACCENT }}>{score}/{quiz.length}</p>
                  <button onClick={restartQuiz} className="w-full py-3 rounded-xl font-bold text-white" style={{ backgroundColor: ACCENT }}>
                    Ulangi Kuis
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="sticky bottom-0 z-30 bg-white/90 backdrop-blur-xl border-t border-slate-200 p-4">
        <button onClick={isCompleted ? () => navigate(-1) : handleComplete}
          className="w-full py-4 rounded-2xl font-bold text-white flex items-center justify-center gap-2 shadow-lg"
          style={{ background: isCompleted ? 'linear-gradient(135deg,#10B981,#059669)' : `linear-gradient(135deg,${ACCENT},${ACCENT}CC)` }}>
          <CheckCircle2 className="w-5 h-5" />
          {isCompleted ? 'Sudah Selesai (Kembali)' : 'Tandai Selesai'}
        </button>
      </div>
    </div>
  );
}
