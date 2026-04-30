import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ChevronLeft, Mic, Volume2 } from 'lucide-react';
import { getProficiencyPronunciationLesson } from './proficiencyPronunciationContent';
import { playAudio } from '../../../../../services/ttsService';

const ACCENT = '#BE185D';
const STORAGE_KEY = 'talky_proficiency_pronunciation_completed';

function getCompleted(): number[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
}

function markComplete(lessonId: number) {
  const completed = getCompleted();
  if (!completed.includes(lessonId)) localStorage.setItem(STORAGE_KEY, JSON.stringify([...completed, lessonId]));
}

export default function ProficiencyPronunciationLesson({ lessonId }: { lessonId: number }) {
  const navigate = useNavigate();
  const lesson = useMemo(() => getProficiencyPronunciationLesson(lessonId), [lessonId]);
  const nextPath = lesson.id < 20 ? `/modul/english/proficiency/pronunciation/lesson-${lesson.id + 1}` : '';
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
            <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: ACCENT }}>C2 Pronunciation - Lesson {lesson.id}</p>
            <h1 className="text-sm font-bold text-slate-800 truncate max-w-[230px] md:max-w-none">{lesson.title}</h1>
          </div>
          {nextPath ? <button onClick={() => navigate(nextPath)} className="px-3 h-9 rounded-full text-xs font-bold" style={{ color: ACCENT, background: `${ACCENT}15` }}>Next</button> : <div className="w-14" />}
        </div>
      </header>

      <div className="flex bg-white border-b border-slate-100 p-2 gap-2 sticky top-[65px] z-10">
        {([['materi', 'Materi & Audio'], ['latihan', 'Latihan Rekaman'], ['kuis', 'Kuis 20 Soal']] as const).map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)} className={`flex-1 py-3 text-xs md:text-sm font-bold rounded-xl transition-all ${tab === key ? 'text-white shadow-md' : 'text-slate-500'}`} style={tab === key ? { background: ACCENT } : undefined}>
            {label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 md:p-8 pb-28 space-y-5">
          {tab === 'materi' && (
            <>
              <section className="rounded-3xl p-6 text-white relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${ACCENT}, #EC4899)` }}>
                <Mic className="absolute top-5 right-5 w-24 h-24 opacity-10" />
                <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full">C2 Proficiency Pronunciation</span>
                <h2 className="text-2xl font-black mt-4 mb-2">{lesson.title}</h2>
                <p className="text-sm text-white/85 max-w-2xl">{lesson.subtitle}</p>
              </section>

              <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5">
                <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: ACCENT }}>Tujuan Pembelajaran</p>
                <p className="text-sm text-slate-700 leading-relaxed">{lesson.objective}</p>
              </section>

              <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5">
                <h3 className="text-base font-black text-slate-800 mb-4">Konsep Kunci</h3>
                <div className="space-y-3">
                  {lesson.concepts.map((concept, index) => (
                    <div key={concept} className="flex gap-3 rounded-2xl bg-slate-50 p-3">
                      <span className="w-7 h-7 rounded-full text-white text-xs font-black flex items-center justify-center shrink-0" style={{ background: ACCENT }}>{index + 1}</span>
                      <p className="text-sm text-slate-700 leading-relaxed">{concept}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-slate-100">
                  <h3 className="text-base font-black text-slate-800">Model Kalimat dengan TTS</h3>
                  <p className="text-xs text-slate-500 mt-1">Dengar, ulangi, lalu rekam versi kamu.</p>
                </div>
                {lesson.modelLines.map((line, index) => (
                  <div key={line.text} className="p-5 border-b border-slate-100 last:border-b-0 flex gap-4">
                    <button onClick={() => playAudio(line.text, 0.82)} className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 border border-slate-200 hover:bg-slate-50" style={{ color: ACCENT }}>
                      <Volume2 size={18} />
                    </button>
                    <div>
                      <p className="text-sm font-black text-slate-900 leading-relaxed">{index + 1}. {line.text}</p>
                      <p className="text-xs font-bold mt-2" style={{ color: ACCENT }}>Focus: {line.focus}</p>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{line.note}</p>
                    </div>
                  </div>
                ))}
              </section>
            </>
          )}

          {tab === 'latihan' && (
            <>
              <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5">
                <h3 className="text-lg font-black text-slate-800 mb-3">Drill Harian</h3>
                <div className="space-y-3">
                  {lesson.drills.map((drill, index) => (
                    <div key={drill} className="flex gap-3 rounded-2xl border border-slate-100 p-4">
                      <span className="w-8 h-8 rounded-xl text-white text-sm font-black flex items-center justify-center shrink-0" style={{ background: ACCENT }}>{index + 1}</span>
                      <p className="text-sm text-slate-700 leading-relaxed">{drill}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-3xl p-5 border" style={{ background: `${ACCENT}0D`, borderColor: `${ACCENT}30` }}>
                <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: ACCENT }}>Recording Task</p>
                <p className="text-sm text-slate-700 leading-relaxed">{lesson.speakingTask}</p>
              </section>

              <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5">
                <h3 className="text-lg font-black text-slate-800 mb-3">Self-Assessment</h3>
                <div className="space-y-2">
                  {lesson.selfCheck.map((item) => (
                    <label key={item} className="flex gap-3 rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">
                      <input type="checkbox" className="mt-1 accent-pink-700" />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
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
                      <div className="bg-pink-50 border border-pink-200 rounded-xl p-4">
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
                  <button onClick={() => navigate('/modul/english/proficiency/pronunciation')} className="w-full py-3 rounded-xl font-bold text-slate-600 bg-slate-100">Kembali ke Daftar</button>
                </div>
              )}
            </section>
          )}
        </div>
      </div>

      <div className="sticky bottom-0 bg-white/90 backdrop-blur-xl border-t border-slate-200 p-4">
        <button onClick={done ? () => navigate('/modul/english/proficiency/pronunciation') : finishLesson} className="w-full py-4 rounded-2xl font-bold text-white flex items-center justify-center gap-2 shadow-lg" style={{ background: done ? 'linear-gradient(135deg,#10B981,#059669)' : `linear-gradient(135deg,${ACCENT},#EC4899)` }}>
          <CheckCircle2 className="w-5 h-5" />
          {done ? 'Selesai - Kembali' : 'Tandai Selesai'}
        </button>
      </div>
    </div>
  );
}
