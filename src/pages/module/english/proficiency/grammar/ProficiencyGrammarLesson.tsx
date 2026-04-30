import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, CheckCircle2, ChevronLeft, ClipboardCheck, Volume2 } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';
import { getProficiencyGrammarLesson } from './proficiencyGrammarContent';

const ACCENT = '#1C2833';
const STORAGE_KEY = 'talky_proficiency_grammar_completed';

function getCompleted(): number[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
}

function markComplete(lessonId: number) {
  const completed = getCompleted();
  if (!completed.includes(lessonId)) localStorage.setItem(STORAGE_KEY, JSON.stringify([...completed, lessonId]));
}

export default function ProficiencyGrammarLesson({ lessonId }: { lessonId: number }) {
  const navigate = useNavigate();
  const lesson = useMemo(() => getProficiencyGrammarLesson(lessonId), [lessonId]);
  const nextPath = lesson.id < 20 ? `/modul/english/proficiency/grammar/lesson-${lesson.id + 1}` : '';
  const [tab, setTab] = useState<'materi' | 'latihan' | 'kuis'>('materi');
  const [done, setDone] = useState(() => getCompleted().includes(lesson.id));
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const currentQuestion = lesson.quiz[questionIndex];

  const finishLesson = () => { markComplete(lesson.id); setDone(true); };
  const chooseAnswer = (option: string) => {
    if (selected) return;
    setSelected(option);
    if (option === currentQuestion.ans) setScore((value) => value + 1);
  };
  const nextQuestion = () => {
    if (questionIndex + 1 < lesson.quiz.length) {
      setQuestionIndex((value) => value + 1);
      setSelected(null);
      return;
    }
    setFinished(true);
    markComplete(lesson.id);
    setDone(true);
  };

  return (
    <div className="flex flex-col h-[100dvh] md:h-full bg-slate-50">
      <header className="bg-white/95 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100 shadow-sm">
        <div className="px-4 py-3 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-slate-100"><ChevronLeft className="w-6 h-6 text-slate-600" /></button>
          <div className="text-center min-w-0 px-2">
            <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: ACCENT }}>C2 Grammar - Lesson {lesson.id}</p>
            <h1 className="text-sm font-bold text-slate-800 truncate max-w-[230px] md:max-w-none">{lesson.title}</h1>
          </div>
          {nextPath ? <button onClick={() => navigate(nextPath)} className="px-3 h-9 rounded-full text-xs font-bold" style={{ color: ACCENT, background: `${ACCENT}12` }}>Next</button> : <div className="w-14" />}
        </div>
      </header>

      <div className="flex bg-white border-b border-slate-100 p-2 gap-2 sticky top-[65px] z-10">
        {([['materi', 'Materi & Rumus'], ['latihan', 'Latihan'], ['kuis', 'Kuis 20 Soal']] as const).map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)} className={`flex-1 py-3 text-xs md:text-sm font-bold rounded-xl transition-all ${tab === key ? 'text-white shadow-md' : 'text-slate-500'}`} style={tab === key ? { background: ACCENT } : undefined}>
            {label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 md:p-8 pb-28 space-y-5">
          {tab === 'materi' && (
            <>
              <section className="rounded-3xl p-6 text-white relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${ACCENT}, #4B5563)` }}>
                <BookOpen className="absolute top-4 right-4 w-20 h-20 opacity-10" />
                <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full">C2 Proficiency Grammar</span>
                <h2 className="text-xl font-black mt-3 mb-1">{lesson.title}</h2>
                <p className="text-sm text-white/85 leading-relaxed">{lesson.subtitle}</p>
              </section>

              <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
                <p className="text-xs font-extrabold uppercase tracking-widest mb-3" style={{ color: ACCENT }}>Tujuan Grammar</p>
                <p className="text-sm text-slate-700 leading-relaxed">{lesson.objective}</p>
              </section>

              <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
                <p className="text-xs font-extrabold uppercase tracking-widest mb-4" style={{ color: ACCENT }}>Rumus / Struktur</p>
                <div className="space-y-3">
                  {lesson.formulas.map((formula, index) => (
                    <div key={formula} className="rounded-2xl bg-slate-50 border border-slate-100 p-4">
                      <p className="text-xs font-bold mb-1" style={{ color: ACCENT }}>FORMULA {index + 1}</p>
                      <p className="text-sm font-black text-slate-800">{formula}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
                <p className="text-xs font-extrabold uppercase tracking-widest mb-4" style={{ color: ACCENT }}>Aturan Penggunaan</p>
                <div className="space-y-3">
                  {lesson.rules.map((rule, index) => (
                    <div key={rule} className="flex gap-3 rounded-2xl bg-slate-50 border border-slate-100 p-3">
                      <div className="w-8 h-8 rounded-xl text-white flex items-center justify-center text-sm font-bold shrink-0" style={{ background: ACCENT }}>{index + 1}</div>
                      <p className="text-sm text-slate-700 leading-relaxed">{rule}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                  <p className="text-xs font-extrabold uppercase tracking-widest" style={{ color: ACCENT }}>Contoh C2</p>
                </div>
                {lesson.examples.map((example) => (
                  <div key={example.sentence} className="p-5 border-b border-slate-100 last:border-b-0">
                    <button onClick={() => playAudio(example.sentence, 0.84)} className="mb-3 inline-flex items-center gap-2 text-xs font-bold" style={{ color: ACCENT }}>
                      <Volume2 size={15} /> Play Example
                    </button>
                    <p className="text-sm font-bold text-slate-900 leading-relaxed">{example.sentence}</p>
                    <p className="text-sm text-slate-600 leading-relaxed mt-2">{example.explanation}</p>
                  </div>
                ))}
              </section>
            </>
          )}

          {tab === 'latihan' && (
            <>
              <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
                <p className="text-xs font-extrabold uppercase tracking-widest mb-4" style={{ color: ACCENT }}>Latihan Transformasi</p>
                <div className="space-y-3">
                  {lesson.practice.map((item, index) => (
                    <div key={item} className="flex gap-3 rounded-2xl border border-slate-100 p-4">
                      <span className="w-8 h-8 rounded-xl text-white text-sm font-bold flex items-center justify-center shrink-0" style={{ background: ACCENT }}>{index + 1}</span>
                      <p className="text-sm text-slate-700 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl p-5 border" style={{ background: `${ACCENT}08`, borderColor: `${ACCENT}25` }}>
                <div className="flex items-center gap-2 mb-2">
                  <ClipboardCheck size={18} style={{ color: ACCENT }} />
                  <p className="text-sm font-bold" style={{ color: ACCENT }}>Mastery Task</p>
                </div>
                <p className="text-sm text-slate-700">{lesson.masteryTask}</p>
              </section>
            </>
          )}

          {tab === 'kuis' && (
            <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
              {!finished ? (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Soal {questionIndex + 1}/{lesson.quiz.length}</span>
                    <span className="text-xs font-bold px-3 py-1 rounded-full text-white" style={{ background: ACCENT }}>Skor: {score}</span>
                  </div>
                  <p className="text-base font-bold text-slate-800 leading-relaxed pt-2">{currentQuestion.q}</p>
                  <div className="space-y-3">
                    {currentQuestion.opts.map((option) => {
                      let stateClass = 'bg-slate-50 border-slate-200 text-slate-700';
                      if (selected) {
                        if (option === currentQuestion.ans) stateClass = 'bg-green-50 border-green-400 text-green-800 font-bold';
                        else if (option === selected) stateClass = 'bg-red-50 border-red-400 text-red-700';
                        else stateClass = 'opacity-50 border-slate-100 text-slate-500';
                      }
                      return <button key={option} onClick={() => chooseAnswer(option)} className={`w-full text-left px-4 py-3 rounded-xl border-2 text-sm transition-all ${stateClass}`}>{option}</button>;
                    })}
                  </div>
                  {selected && (
                    <>
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                        <p className="text-xs font-bold mb-1" style={{ color: ACCENT }}>Penjelasan</p>
                        <p className="text-sm text-slate-700">{currentQuestion.exp}</p>
                      </div>
                      <button onClick={nextQuestion} className="w-full py-3 rounded-xl font-bold text-white" style={{ background: ACCENT }}>
                        {questionIndex + 1 < lesson.quiz.length ? 'Soal Berikutnya' : 'Selesai'}
                      </button>
                    </>
                  )}
                </>
              ) : (
                <div className="text-center space-y-4">
                  <div className="text-5xl">{score >= 16 ? '🏆' : '📚'}</div>
                  <h3 className="text-2xl font-black text-slate-800">Kuis Selesai!</h3>
                  <p className="text-4xl font-black" style={{ color: ACCENT }}>{score}/{lesson.quiz.length}</p>
                  {nextPath && <button onClick={() => navigate(nextPath)} className="w-full py-3 rounded-xl font-bold text-white" style={{ background: ACCENT }}>Pelajaran Berikutnya</button>}
                  <button onClick={() => navigate('/modul/english/proficiency/grammar')} className="w-full py-3 rounded-xl font-bold text-slate-600 bg-slate-100">Kembali ke Daftar</button>
                </div>
              )}
            </section>
          )}
        </div>
      </div>

      <div className="sticky bottom-0 bg-white/90 backdrop-blur-xl border-t border-slate-200 p-4">
        <button onClick={done ? () => navigate('/modul/english/proficiency/grammar') : finishLesson} className="w-full py-4 rounded-2xl font-bold text-white flex items-center justify-center gap-2 shadow-lg" style={{ background: done ? 'linear-gradient(135deg,#10B981,#059669)' : `linear-gradient(135deg,${ACCENT},#4B5563)` }}>
          <CheckCircle2 className="w-5 h-5" />
          {done ? 'Selesai - Kembali' : 'Tandai Selesai'}
        </button>
      </div>
    </div>
  );
}
