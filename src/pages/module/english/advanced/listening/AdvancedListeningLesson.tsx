import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ChevronLeft, ClipboardCheck, Headphones, Volume2 } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';
import { getAdvancedListeningLesson, getAdvancedListeningQuiz } from './advancedListeningContent';

const ACCENT = '#0F766E';
const STORAGE_KEY = 'talky_advanced_listening_completed';

function getCompleted(): number[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
}

function markComplete(lessonId: number) {
  const done = getCompleted();
  if (!done.includes(lessonId)) localStorage.setItem(STORAGE_KEY, JSON.stringify([...done, lessonId]));
}

export default function AdvancedListeningLesson({ lessonId }: { lessonId: number }) {
  const navigate = useNavigate();
  const lesson = getAdvancedListeningLesson(lessonId);
  const quiz = useMemo(() => lesson ? getAdvancedListeningQuiz(lesson) : [], [lesson]);
  const nextPath = lessonId < 20 ? `/modul/english/advanced/listening/lesson-${lessonId + 1}` : undefined;
  const [tab, setTab] = useState<'materi' | 'kuis'>('materi');
  const [done, setDone] = useState(() => getCompleted().includes(lessonId));
  const [qi, setQi] = useState(0);
  const [sel, setSel] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  if (!lesson) return <div className="min-h-screen grid place-items-center text-slate-600">Materi tidak ditemukan.</div>;

  const cur = quiz[qi];
  const pick = (opt: string) => {
    if (sel) return;
    setSel(opt);
    if (opt === cur.ans) setScore((value) => value + 1);
  };
  const next = () => {
    if (qi + 1 < quiz.length) {
      setQi((value) => value + 1);
      setSel(null);
      return;
    }
    setFinished(true);
    markComplete(lessonId);
    setDone(true);
  };
  const finish = () => {
    markComplete(lessonId);
    setDone(true);
  };

  return (
    <div className="flex flex-col h-[100dvh] md:h-full bg-slate-50">
      <header className="bg-white/95 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100 shadow-sm">
        <div className="px-4 py-3 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-slate-100"><ChevronLeft className="w-6 h-6 text-slate-600" /></button>
          <div className="text-center min-w-0 px-2">
            <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: ACCENT }}>C1 Listening - Lesson {lesson.id}</p>
            <h1 className="text-sm font-bold text-slate-800 line-clamp-1">{lesson.title}</h1>
          </div>
          {nextPath ? <button onClick={() => navigate(nextPath)} className="px-3 h-9 rounded-full text-xs font-bold" style={{ color: ACCENT, background: ACCENT + '18' }}>Next</button> : <div className="w-14" />}
        </div>
      </header>

      <div className="flex bg-white border-b border-slate-100 p-2 gap-2 sticky top-[65px] z-10">
        {([['materi', 'Materi & Audio'], ['kuis', 'Kuis 20 Soal']] as const).map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)} className={'flex-1 py-3 text-sm font-bold rounded-xl transition-all ' + (tab === key ? 'text-white shadow-md' : 'text-slate-500')} style={tab === key ? { background: ACCENT } : {}}>
            {label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 md:p-8 pb-28 space-y-5">
          {tab === 'materi' && (
            <div className="space-y-5">
              <section className="rounded-3xl p-6 text-white relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT}BB)` }}>
                <Headphones className="absolute top-4 right-4 w-20 h-20 opacity-10" />
                <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full">C1 Advanced Listening</span>
                <h2 className="text-xl font-black mt-3 mb-1">{lesson.title}</h2>
                <p className="text-sm text-white/85 leading-relaxed">{lesson.overview}</p>
              </section>

              <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
                <p className="text-xs font-extrabold uppercase tracking-widest mb-3" style={{ color: ACCENT }}>Tujuan Listening</p>
                <p className="text-sm text-slate-700 leading-relaxed">{lesson.outcome}</p>
              </section>

              <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-widest" style={{ color: ACCENT }}>Audio Transcript</p>
                    <p className="text-xs text-slate-500 mt-1">Gunakan AI Voice dari API key di Profile.</p>
                  </div>
                  <button onClick={() => playAudio(lesson.transcript, 0.88)} className="px-4 py-2 rounded-xl text-white text-sm font-bold inline-flex items-center gap-2 shrink-0" style={{ background: ACCENT }}>
                    <Volume2 size={16} />
                    Play
                  </button>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed italic">"{lesson.transcript}"</p>
              </section>

              <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
                <p className="text-xs font-extrabold uppercase tracking-widest mb-4" style={{ color: ACCENT }}>Listening Focus</p>
                <div className="space-y-3">
                  {lesson.listeningFocus.map((item, index) => (
                    <div key={item} className="flex gap-3 rounded-2xl bg-slate-50 border border-slate-100 p-3">
                      <div className="w-8 h-8 rounded-xl text-white flex items-center justify-center text-sm font-bold shrink-0" style={{ background: ACCENT }}>{index + 1}</div>
                      <p className="text-sm text-slate-700 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
                <p className="text-xs font-extrabold uppercase tracking-widest mb-4" style={{ color: ACCENT }}>Key Signals</p>
                <ul className="space-y-2">
                  {lesson.keySignals.map((item) => <li key={item} className="text-sm text-slate-700 bg-teal-50 border border-teal-100 rounded-xl px-4 py-3">- {item}</li>)}
                </ul>
              </section>

              <section className="rounded-2xl p-4 border" style={{ background: ACCENT + '08', borderColor: ACCENT + '25' }}>
                <p className="text-sm font-bold mb-1" style={{ color: ACCENT }}>Listening Task</p>
                <p className="text-sm mb-4" style={{ color: ACCENT + 'BB' }}>{lesson.listeningTask}</p>
                <p className="text-sm font-bold mb-2" style={{ color: ACCENT }}>Strategies</p>
                <ul className="space-y-1">
                  {lesson.strategies.map((item) => <li key={item} className="text-sm" style={{ color: ACCENT + 'CC' }}>- {item}</li>)}
                </ul>
              </section>
            </div>
          )}

          {tab === 'kuis' && (
            <div>
              {!finished && cur ? (
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Soal {qi + 1}/{quiz.length}</span>
                    <span className="text-xs font-bold px-3 py-1 rounded-full text-white" style={{ background: ACCENT }}>Skor: {score}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5">
                    <div className="h-1.5 rounded-full transition-all" style={{ width: `${((qi + (sel ? 1 : 0)) / quiz.length) * 100}%`, background: ACCENT }} />
                  </div>
                  <p className="text-base font-bold text-slate-800 leading-relaxed pt-2">{cur.q}</p>
                  <div className="space-y-3">
                    {cur.opts.map((option) => {
                      const cls = sel ? option === cur.ans ? 'bg-green-50 border-green-500 text-green-800 font-bold' : option === sel ? 'bg-red-50 border-red-400 text-red-700' : 'opacity-50 border-slate-100' : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-teal-300';
                      return <button key={option} onClick={() => pick(option)} disabled={Boolean(sel)} className={`w-full text-left px-4 py-3 rounded-xl border-2 text-sm transition-all ${cls}`}>{option}</button>;
                    })}
                  </div>
                  {sel && (
                    <>
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                        <p className="text-xs font-bold text-blue-600 mb-1">Penjelasan</p>
                        <p className="text-sm text-blue-700">{cur.exp}</p>
                      </div>
                      <button onClick={next} className="w-full py-3 rounded-xl font-bold text-white" style={{ background: ACCENT }}>{qi + 1 < quiz.length ? 'Soal Berikutnya' : 'Selesai'}</button>
                    </>
                  )}
                </div>
              ) : (
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-white" style={{ background: ACCENT }}><ClipboardCheck size={28} /></div>
                  <h3 className="text-2xl font-black text-slate-800">Kuis Selesai</h3>
                  <p className="text-4xl font-black" style={{ color: ACCENT }}>{score}/{quiz.length}</p>
                  {nextPath && <button onClick={() => navigate(nextPath)} className="w-full py-3 rounded-xl font-bold text-white" style={{ background: ACCENT }}>Pelajaran Berikutnya</button>}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="sticky bottom-0 z-30 bg-white/90 backdrop-blur-xl border-t border-slate-200 p-4">
        <button onClick={done ? () => navigate(-1) : finish} className="w-full py-4 rounded-2xl font-bold text-white flex items-center justify-center gap-2 shadow-lg" style={{ background: done ? 'linear-gradient(135deg,#10B981,#059669)' : `linear-gradient(135deg,${ACCENT},${ACCENT}CC)` }}>
          <CheckCircle2 className="w-5 h-5" />
          {done ? 'Sudah Selesai (Kembali)' : 'Tandai Selesai'}
        </button>
      </div>
    </div>
  );
}
