import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, CheckCircle2, ChevronLeft, Volume2 } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';
import { getAdvancedVocabularyLesson, getAdvancedVocabularyQuiz } from './advancedVocabularyContent';

const ACCENT = '#0B5345';
const STORAGE_KEY = 'talky_advanced_vocabulary_completed';

function getCompleted(): number[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
}

function markComplete(lessonId: number) {
  const done = getCompleted();
  if (!done.includes(lessonId)) localStorage.setItem(STORAGE_KEY, JSON.stringify([...done, lessonId]));
}

export default function AdvancedVocabularyLesson({ lessonId }: { lessonId: number }) {
  const navigate = useNavigate();
  const lesson = getAdvancedVocabularyLesson(lessonId);
  const quiz = useMemo(() => lesson ? getAdvancedVocabularyQuiz(lesson) : [], [lesson]);
  const nextPath = lessonId < 50 ? `/modul/english/advanced/vocabulary/lesson-${lessonId + 1}` : undefined;
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
            <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: ACCENT }}>C1/C2 Vocabulary - Lesson {lesson.id}</p>
            <h1 className="text-sm font-bold text-slate-800 line-clamp-1">{lesson.title}</h1>
          </div>
          {nextPath ? <button onClick={() => navigate(nextPath)} className="px-3 h-9 rounded-full text-xs font-bold" style={{ color: ACCENT, background: ACCENT + '18' }}>Next</button> : <div className="w-14" />}
        </div>
      </header>

      <div className="flex bg-white border-b border-slate-100 p-2 gap-2 sticky top-[65px] z-10">
        {([['materi', '30 Vocab'], ['kuis', 'Kuis 20 Soal']] as const).map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)} className={'flex-1 py-3 text-sm font-bold rounded-xl transition-all ' + (tab === key ? 'text-white shadow-md' : 'text-slate-500')} style={tab === key ? { background: ACCENT } : {}}>
            {label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 md:p-8 pb-28 space-y-4">
          {tab === 'materi' && (
            <div className="space-y-4">
              <section className="rounded-3xl p-6 text-white relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT}AA)` }}>
                <BookOpen className="absolute top-4 right-4 w-20 h-20 opacity-10" />
                <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full">{lesson.words.length} advanced words</span>
                <h2 className="text-xl font-black mt-3 mb-1">{lesson.title}</h2>
                <p className="text-sm text-white/85">{lesson.focus}</p>
              </section>

              {lesson.words.map((item, index) => (
                <section key={`${item.word}-${index}`} className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest" style={{ color: ACCENT }}>Word {index + 1}</p>
                      <h3 className="text-xl font-black text-slate-800 mt-1">{item.word}</h3>
                      <span className="inline-flex mt-1 text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: ACCENT }}>{item.type}</span>
                    </div>
                    <button onClick={() => playAudio(item.word, 0.85)} className="w-9 h-9 rounded-full flex items-center justify-center border border-slate-200 text-slate-400 hover:text-slate-700 shrink-0">
                      <Volume2 size={16} />
                    </button>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">{item.meaning}</p>
                  <button onClick={() => playAudio(item.example, 0.85)} className="w-full text-left bg-slate-50 rounded-2xl p-3 border border-slate-100 hover:border-slate-300 transition-colors">
                    <p className="text-xs font-semibold mb-1" style={{ color: ACCENT }}>Example</p>
                    <p className="text-sm text-slate-700 italic">"{item.example}"</p>
                  </button>
                  <div className="flex flex-wrap gap-2">
                    {item.collocations.map((collocation) => (
                      <button key={collocation} onClick={() => playAudio(collocation, 0.85)} className="text-xs font-medium px-3 py-1.5 rounded-full border border-slate-200 text-slate-600 bg-slate-50 hover:bg-slate-100">
                        {collocation}
                      </button>
                    ))}
                  </div>
                </section>
              ))}
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
                  <p className="text-base font-bold text-slate-800 leading-relaxed pt-2">{cur.q}</p>
                  <div className="space-y-3">
                    {cur.opts.map((option) => {
                      const cls = sel ? option === cur.ans ? 'bg-green-50 border-green-500 text-green-800 font-bold' : option === sel ? 'bg-red-50 border-red-400 text-red-700' : 'opacity-50 border-slate-100' : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-emerald-300';
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
                  <h3 className="text-2xl font-black text-slate-800">Kuis Selesai</h3>
                  <p className="text-4xl font-black" style={{ color: ACCENT }}>{score}/{quiz.length}</p>
                  {nextPath && <button onClick={() => navigate(nextPath)} className="w-full py-3 rounded-xl font-bold text-white" style={{ background: ACCENT }}>Pelajaran Berikutnya</button>}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="sticky bottom-0 bg-white/90 backdrop-blur-xl border-t border-slate-200 p-4">
        <button onClick={done ? () => navigate(-1) : finish} className="w-full py-4 rounded-2xl font-bold text-white flex items-center justify-center gap-2 shadow-lg" style={{ background: done ? 'linear-gradient(135deg,#10B981,#059669)' : `linear-gradient(135deg,${ACCENT},${ACCENT}CC)` }}>
          <CheckCircle2 className="w-5 h-5" />
          {done ? 'Selesai - Kembali' : 'Tandai Selesai'}
        </button>
      </div>
    </div>
  );
}
