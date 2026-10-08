import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ChevronLeft, BookOpen, Lightbulb } from 'lucide-react';

import { shuffledAuthored } from '../../advanced/shared/authoredQuiz';
import { advancedGrammarQuizBank } from './quizBank';
const THEORY_LINES = [
    "**Participle clauses** reduce relative clauses and adverbial clauses to add concision and sophistication.",
    "**Present Participle (-ing):** Active meaning",
    "- *The scientist **conducting** the experiment won the Nobel Prize.* (= who conducted)",
    "- *Considering all the evidence, we can conclude...* (= When we consider)",
    "**Past Participle (-ed):** Passive meaning",
    "- *The theory **proposed** by Einstein remained controversial.* (= that was proposed)",
    "- ***Concerned** about the deadline, the team worked overtime.* (= Because they were concerned)",
    "**Perfect Participle (Having + past participle):** Completed action",
    "- ***Having reviewed** all submissions, the committee reached a verdict.*",
    "- ***Having been awarded** the grant, she began her research.*"
];

const ITEMS = [

];

const QUIZ: { q: string; opts: string[]; ans: string; exp: string }[] = shuffledAuthored(advancedGrammarQuizBank[6], 'advanced/grammar/6');

const ACCENT = '#1B2631';
const NEXT_PATH = "/modul/english/advanced/grammar/lesson-7";
const STORAGE_KEY = 'talky_advanced_grammar_completed';
const LESSON_NUM = 6;

function getCompleted(): number[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
}
function markComplete() {
  const d = getCompleted();
  if (!d.includes(LESSON_NUM)) localStorage.setItem(STORAGE_KEY, JSON.stringify([...d, LESSON_NUM]));
}

export default function AdvancedGrammarLesson6() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'materi' | 'kuis'>('materi');
  const [done, setDone] = useState(() => getCompleted().includes(LESSON_NUM));
  const [modal, setModal] = useState(false);
  const [qi, setQi] = useState(0);
  const [sel, setSel] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [fin, setFin] = useState(false);
  const cur = QUIZ[qi];

  const pickAns = (o: string) => {
    if (sel) return;
    setSel(o);
    if (o === cur.ans) setScore(s => s + 1);
  };
  const next = () => {
    if (qi + 1 < QUIZ.length) { setQi(q => q + 1); setSel(null); }
    else { setFin(true); markComplete(); setDone(true); setModal(true); }
  };
  const finish = () => { markComplete(); setDone(true); setModal(true); };

  return (
    <>
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(10px)' }} onClick={() => setModal(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="text-5xl mb-3">{fin ? (score >= 16 ? '🏆' : '📚') : '✅'}</div>
            <h2 className="text-2xl font-black text-slate-800 mb-2">Lesson Selesai!</h2>
            {fin && <p className="text-2xl font-black mb-2" style={{ color: ACCENT }}>{score}/{QUIZ.length}</p>}
            <p className="text-slate-500 text-sm mb-6">Advanced Grammar — Lesson 6: Participle Clauses</p>
            <div className="space-y-3">
              {NEXT_PATH && <button onClick={() => { setModal(false); navigate(NEXT_PATH); }} className="w-full py-3 rounded-xl font-bold text-white" style={{ background: ACCENT }}>Pelajaran Berikutnya →</button>}
              <button onClick={() => { setModal(false); navigate('/modul/english/advanced/grammar'); }} className="w-full py-3 rounded-xl font-bold text-slate-600 bg-slate-100">Kembali ke Daftar</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col h-[100dvh] md:h-full bg-slate-50">
        {/* Header */}
        <header className="bg-white/95 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100 shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-slate-100">
              <ChevronLeft className="w-6 h-6 text-slate-600" />
            </button>
            <div className="text-center">
              <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: ACCENT }}>C1/C2 Grammar — Lesson 6</p>
              <h1 className="text-sm font-bold text-slate-800 line-clamp-1">Participle Clauses</h1>
            </div>
            {NEXT_PATH ? (
              <button onClick={() => navigate(NEXT_PATH)} className="px-3 h-9 rounded-full text-xs font-bold" style={{ color: ACCENT, background: ACCENT + '18' }}>Next ›</button>
            ) : <div className="w-14" />}
          </div>
        </header>

        {/* Tabs */}
        <div className="flex bg-white border-b border-slate-100 p-2 gap-2 sticky top-[65px] z-10">
          {([['materi', '📖 Materi & Teori'], ['kuis', '🧠 Kuis 20 Soal']] as const).map(([t, label]) => (
            <button key={t} onClick={() => setTab(t as 'materi' | 'kuis')}
              className={'flex-1 py-3 text-sm font-bold rounded-xl transition-all ' + (tab === t ? 'text-white shadow-md' : 'text-slate-500')}
              style={tab === t ? { background: ACCENT } : {}}>
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-8 pb-28 space-y-5">

            {tab === 'materi' && (
              <div className="space-y-5 animate-fade-in">
                {/* Hero */}
                <div className="rounded-3xl p-6 text-white relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT}BB)` }}>
                  <BookOpen className="absolute top-4 right-4 w-20 h-20 opacity-10" />
                  <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full">🎓 C1/C2 Advanced Grammar</span>
                  <h2 className="text-xl font-black mt-3 mb-1">Participle Clauses</h2>
                  <p className="text-sm text-white/85 leading-relaxed">Master Participle Clauses at CEFR C1/C2 level — essential for sophisticated academic and professional English.</p>
                </div>

                {/* Theory */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Lightbulb className="w-5 h-5" style={{ color: ACCENT }} />
                    <p className="text-xs font-extrabold uppercase tracking-widest" style={{ color: ACCENT }}>📐 PENJELASAN TEORI</p>
                  </div>
                  <div className="space-y-3">
                    {THEORY_LINES.map((line, i) => {
                      const isBold = line.startsWith('<BOLD>') || line.startsWith('**');
                      const isCode = line.startsWith('✓') || line.startsWith('✗') || line.startsWith('•') || line.startsWith('-');
                      const clean = line.replace(/<BOLD>(.*?)<\/BOLD>/g, '$1').replace(/<EM>(.*?)<\/EM>/g, '$1').replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1');
                      if (!clean.trim()) return null;
                      if (clean.startsWith('**') || (isBold && !isCode)) {
                        return <p key={i} className="text-sm font-extrabold text-slate-800 mt-4 mb-1">{clean.replace(/\*\*/g, '')}</p>;
                      }
                      if (clean.startsWith('✓') || clean.startsWith('✗')) {
                        const isGood = clean.startsWith('✓');
                        return <div key={i} className={`text-sm font-medium px-3 py-2 rounded-lg ${isGood ? 'bg-green-50 text-green-800 border-l-4 border-sky-500' : 'bg-red-50 text-red-800 border-l-4 border-red-500'}`}>{clean}</div>;
                      }
                      if (clean.startsWith('-') || clean.startsWith('•')) {
                        return <div key={i} className="text-sm text-slate-700 pl-4 py-0.5 border-l-2 border-slate-200">{clean.replace(/^[-•]\s*/, '')}</div>;
                      }
                      return <p key={i} className="text-sm text-slate-700 leading-relaxed">{clean}</p>;
                    })}
                  </div>
                </div>

                {/* Error correction items */}
                {ITEMS.length > 0 && (
                  <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
                    <p className="text-xs font-extrabold uppercase tracking-widest mb-4" style={{ color: ACCENT }}>🔍 LATIHAN IDENTIFIKASI KESALAHAN</p>
                    <div className="space-y-4">
                      {ITEMS.map((item, i) => (
                        <div key={i} className="rounded-2xl overflow-hidden border border-slate-100">
                          <div className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-white" style={{ background: ACCENT }}>{item.label}</div>
                          <div className="bg-slate-50 px-4 py-3 space-y-2">
                            <p className="text-sm font-medium text-red-600 line-through opacity-80">{item.text}</p>
                            {item.fix && <p className="text-sm font-bold text-green-700">{item.fix}</p>}
                            {item.note && <p className="text-xs text-slate-500 leading-relaxed pt-1 border-t border-slate-200">{item.note}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tip box */}
                <div className="rounded-2xl p-4 border" style={{ background: ACCENT + '08', borderColor: ACCENT + '25' }}>
                  <p className="text-sm font-bold mb-1" style={{ color: ACCENT }}>💡 Tips C1/C2</p>
                  <p className="text-sm" style={{ color: ACCENT + 'CC' }}>Struktur ini sering muncul dalam IELTS Academic 7.0+, Cambridge C1 Advanced, dan C2 Proficiency. Kuasai penggunaannya dalam tulisan akademik dan lisan formal.</p>
                </div>
              </div>
            )}

            {tab === 'kuis' && (
              <div className="animate-fade-in">
                {!fin ? (
                  <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Soal {qi + 1}/{QUIZ.length}</span>
                      <span className="text-xs font-bold px-3 py-1 rounded-full text-white" style={{ background: ACCENT }}>Skor: {score}</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5">
                      <div className="h-1.5 rounded-full transition-all" style={{ width: `${(qi / QUIZ.length) * 100}%`, background: ACCENT }} />
                    </div>
                    <p className="text-base font-bold text-slate-800 leading-relaxed pt-2">{cur.q}</p>
                    <div className="space-y-3">
                      {cur.opts.map(o => {
                        let cls = 'bg-slate-50 border-slate-200 text-slate-700';
                        if (sel) {
                          if (o === cur.ans) cls = 'bg-green-50 border-sky-500 text-green-800 font-bold';
                          else if (o === sel) cls = 'bg-red-50 border-red-400 text-red-700';
                          else cls = 'opacity-50 border-slate-100';
                        }
                        return (
                          <button key={o} onClick={() => pickAns(o)} className={`w-full text-left px-4 py-3 rounded-xl border-2 text-sm transition-all ${cls}`}>{o}</button>
                        );
                      })}
                    </div>
                    {sel && (
                      <>
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                          <p className="text-xs font-bold text-blue-600 mb-1">💡 Penjelasan</p>
                          <p className="text-sm text-blue-700">{cur.exp}</p>
                        </div>
                        <button onClick={next} className="w-full py-3 rounded-xl font-bold text-white" style={{ background: ACCENT }}>
                          {qi + 1 < QUIZ.length ? 'Soal Berikutnya →' : 'Selesai ✓'}
                        </button>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 text-center space-y-4">
                    <div className="text-5xl">{score >= 16 ? '🏆' : score >= 12 ? '🎯' : '📚'}</div>
                    <h3 className="text-2xl font-black text-slate-800">Kuis Selesai!</h3>
                    <p className="text-4xl font-black" style={{ color: ACCENT }}>{score}/{QUIZ.length}</p>
                    <p className="text-slate-500">{score >= 16 ? 'Excellent! C1 Grammar mastery tinggi.' : score >= 12 ? 'Good! Review materi untuk penyempurnaan.' : 'Pelajari ulang teori dan coba lagi.'}</p>
                    {NEXT_PATH && <button onClick={() => navigate(NEXT_PATH)} className="w-full py-3 rounded-xl font-bold text-white" style={{ background: ACCENT }}>Pelajaran Berikutnya →</button>}
                    <button onClick={() => navigate('/modul/english/advanced/grammar')} className="w-full py-3 rounded-xl font-bold text-slate-600 bg-slate-100">Kembali ke Daftar</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="sticky bottom-0 bg-white/90 backdrop-blur-xl border-t border-slate-200 p-4">
          <button onClick={done ? () => navigate(-1) : finish} className="w-full py-4 rounded-2xl font-bold text-white flex items-center justify-center gap-2 shadow-lg"
            style={{ background: done ? 'linear-gradient(135deg,#10B981,#059669)' : `linear-gradient(135deg,${ACCENT},${ACCENT}CC)` }}>
            <CheckCircle2 className="w-5 h-5" />
            {done ? 'Selesai ✓ — Kembali' : 'Tandai Selesai'}
          </button>
        </div>
      </div>
    </>
  );
}
