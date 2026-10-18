import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircleIcon, XCircleIcon, StarIcon } from '../../../../../components/Icons';

const WRITING_STORAGE_KEY = 'talky_elementary_writing_completed';
function getCompletedWritingLessons(): number[] { try { return JSON.parse(localStorage.getItem(WRITING_STORAGE_KEY) || '[]'); } catch { return []; } }
function markWritingComplete(id: number) { const d = getCompletedWritingLessons(); if (!d.includes(id)) localStorage.setItem(WRITING_STORAGE_KEY, JSON.stringify([...d, id])); }

const RULES = [
  {
    icon: "🎁",
    title: "Sebutkan Hadiahnya",
    rule: "Beritahu mereka apa yang kamu syukuri.",
    wrong: "Thanks for everything.",
    correct: "Thank you for the beautiful watch."
  }
];
const FIX_SENTENCES = [
  {
    broken: "thank you for gift.",
    hint: "Tambahkan \"the\" di depan gift",
    answer: "Thank you for the gift."
  }
];
const BUILD_ITEMS = [
  {
    prompt: "Thank you ___ helping me.",
    blank: "for",
    options: [
      "for",
      "to",
      "at"
    ],
    answer: "for"
  }
];
const QUIZ = [
  {
    q: "Cara bilang terima kasih untuk bantuan:",
    opts: [
      "Thanks your help.",
      "Thank your help to me.",
      "Thank you for your help.",
      "Thanks to help me."
    ],
    ans: "Thank you for your help.",
    exp: "\"Thank you for\" + noun/v-ing."
  },
  {
    q: "\"Thank you for ___ me.\"",
    opts: [
      "helping",
      "helps",
      "help",
      "helped"
    ],
    ans: "helping",
    exp: "Setelah \"for\", gunakan v-ing."
  },
  {
    q: "Ucapan terima kasih paling spesifik:",
    opts: [
      "Thanks.",
      "Thanks a lot.",
      "Thank you for the blue scarf!",
      "Yeah thanks."
    ],
    ans: "Thank you for the blue scarf!",
    exp: "Sebutkan item spesifik."
  },
  {
    q: "\"I really ___ the birthday present.\"",
    opts: [
      "appreciate",
      "appreciated",
      "appreciating",
      "appreciation"
    ],
    ans: "appreciate",
    exp: "Simple present untuk perasaan saat ini."
  },
  {
    q: "\"You ___ so kind to visit me.\"",
    opts: [
      "are",
      "was",
      "am",
      "is"
    ],
    ans: "are",
    exp: "\"You\" = \"are\"."
  },
  {
    q: "Penutup surat yang tepat:",
    opts: [
      "Whatever.",
      "With love, Ana.",
      "OK bye.",
      "End."
    ],
    ans: "With love, Ana.",
    exp: "\"With love\" untuk surat pribadi."
  },
  {
    q: "\"It ___ my day!\"",
    opts: [
      "makes",
      "made",
      "make",
      "making"
    ],
    ans: "made",
    exp: "\"Made\" (past) karena sudah terjadi."
  },
  {
    q: "\"I was ___ to receive your gift.\"",
    opts: [
      "happily",
      "happier",
      "happy",
      "happiness"
    ],
    ans: "happy",
    exp: "Adjective setelah to be."
  },
  {
    q: "\"The cake you ___ was delicious.\"",
    opts: [
      "bake",
      "baking",
      "bakes",
      "baked"
    ],
    ans: "baked",
    exp: "Past tense karena sudah dibuat."
  },
  {
    q: "\"I can\\'t ___ to use it!\"",
    opts: [
      "waiting",
      "waits",
      "waited",
      "wait"
    ],
    ans: "wait",
    exp: "\"Can\\'t wait\" = sangat menantikan."
  },
  {
    q: "\"I am so ___ for your support.\"",
    opts: [
      "gratefulness",
      "grate",
      "gratefully",
      "grateful"
    ],
    ans: "grateful",
    exp: "Adjective setelah \"so\"."
  },
  {
    q: "\"That was very ___ of you.\"",
    opts: [
      "thought",
      "thoughtful",
      "thoughtfully",
      "think"
    ],
    ans: "thoughtful",
    exp: "\"Thoughtful\" = penuh perhatian."
  },
  {
    q: "\"You always ___ me smile.\"",
    opts: [
      "making",
      "made",
      "makes",
      "make"
    ],
    ans: "make",
    exp: "\"You make\" (present habitual)."
  },
  {
    q: "\"I ___ blessed to have you.\"",
    opts: [
      "are",
      "was",
      "is",
      "am"
    ],
    ans: "am",
    exp: "\"I am\" + adjective."
  },
  {
    q: "\"Words ___ express how grateful I am.\"",
    opts: [
      "doesn\\'t",
      "cannot",
      "can",
      "isn\\'t"
    ],
    ans: "cannot",
    exp: "\"Cannot express\" = tak bisa ungkapkan."
  },
  {
    q: "\"Your gift was ___!\"",
    opts: [
      "perfect",
      "perfectly",
      "perfects",
      "perfection"
    ],
    ans: "perfect",
    exp: "Adjective setelah \"was\"."
  },
  {
    q: "\"I will ___ forget your kindness.\"",
    opts: [
      "ever",
      "always",
      "sometimes",
      "never"
    ],
    ans: "never",
    exp: "\"Will never forget\" = takkan pernah lupa."
  },
  {
    q: "\"Please ___ my thanks to your family.\"",
    opts: [
      "passed",
      "passing",
      "passes",
      "pass"
    ],
    ans: "pass",
    exp: "\"Please pass\" = tolong sampaikan."
  },
  {
    q: "\"You ___ the best friend ever!\"",
    opts: [
      "am",
      "is",
      "was",
      "are"
    ],
    ans: "are",
    exp: "\"You are\" = kamu adalah."
  },
  {
    q: "\"I ___ so lucky to know you.\"",
    opts: [
      "am",
      "are",
      "be",
      "is"
    ],
    ans: "am",
    exp: "\"I am\" untuk diri sendiri."
  }
];

function QuizSection({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  const check = (opt: string) => { if (checked) return; setSelected(opt); setChecked(true); if (opt === QUIZ[step].ans) setScore(s => s + 1); };
  const next = () => { if (step < QUIZ.length - 1) { setStep(s => s + 1); setSelected(null); setChecked(false); } else setDone(true); };
  const restart = () => { setStep(0); setScore(0); setDone(false); setSelected(null); setChecked(false); };

  if (done) return (
    <div className="text-center py-8 max-w-md mx-auto">
      <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4"><StarIcon className="w-12 h-12 text-amber-500" /></div>
      <h2 className="text-2xl font-bold text-slate-800 mb-1">Kuis Selesai! 🎉</h2>
      <p className="text-slate-500 mb-1">Skor kamu: <span className="font-extrabold text-amber-600 text-2xl">{score}</span> / {QUIZ.length}</p>
      <p className="text-sm text-slate-400 mb-6">{score >= 16 ? '🏆 Luar biasa!' : score >= 12 ? '👍 Bagus!' : '📚 Terus berlatih!'}</p>
      <button onClick={restart} className="px-6 py-3 bg-amber-500 text-white rounded-xl font-bold mr-3">Ulangi</button>
      <button onClick={onComplete} className="px-6 py-3 bg-green-500 text-white rounded-xl font-bold">Tandai Selesai ✓</button>
    </div>
  );

  const q = QUIZ[step];
  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-amber-100">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-bold text-slate-400">Pertanyaan {step + 1}/{QUIZ.length}</span>
          <span className="text-xs font-bold bg-amber-50 text-amber-600 px-2 py-1 rounded-lg">Skor: {score}</span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full mb-5 overflow-hidden">
          <div className="h-full bg-amber-500 transition-all rounded-full" style={{ width: `${((step + 1) / QUIZ.length) * 100}%` }} />
        </div>
        <h3 className="text-base font-bold text-slate-800 mb-5">{q.q}</h3>
        <div className="space-y-2.5">
          {q.opts.map((o, i) => {
            let cls = 'border-slate-200 hover:border-amber-400 hover:bg-amber-50 cursor-pointer';
            if (checked) { if (o === q.ans) cls = 'bg-green-50 border-sky-400 text-green-800'; else if (o === selected) cls = 'bg-red-50 border-red-400 text-red-700'; else cls = 'opacity-40 border-slate-100'; }
            return (
              <button key={i} onClick={() => check(o)} disabled={checked} className={`w-full p-3.5 rounded-xl border-2 text-left text-sm font-medium transition-all flex items-center justify-between ${cls}`}>
                <span>{o}</span>
                {checked && o === q.ans && <CheckCircleIcon className="w-5 h-5 text-green-600 shrink-0" />}
                {checked && o === selected && o !== q.ans && <XCircleIcon className="w-5 h-5 text-red-500 shrink-0" />}
              </button>
            );
          })}
        </div>
        {checked && (
          <div className="mt-4">
            <div className={`p-3 rounded-xl text-sm mb-4 ${selected === q.ans ? 'bg-green-50 text-green-800 border border-sky-100' : 'bg-orange-50 text-orange-800 border border-orange-100'}`}>
              💡 {q.exp}
            </div>
            <button onClick={next} className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-700 transition-all">
              {step < QUIZ.length - 1 ? 'Selanjutnya →' : 'Lihat Hasil'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function WritingSection() {
  const [userAnswers, setUserAnswers] = useState<string[]>(FIX_SENTENCES.map(() => ''));
  const [checked, setChecked] = useState<boolean[]>(FIX_SENTENCES.map(() => false));
  const [buildAnswer, setBuildAnswer] = useState<string[]>(BUILD_ITEMS.map(() => ''));

  const checkSentence = (i: number) => { const newChecked = [...checked]; newChecked[i] = true; setChecked(newChecked); };
  const isCorrect = (i: number) => userAnswers[i].trim().toLowerCase() === FIX_SENTENCES[i].answer.toLowerCase();

  return (
    <div className="space-y-8 max-w-xl mx-auto">
      <div>
        <div className="flex items-center gap-2 mb-4"><span className="text-xl">✏️</span><h2 className="text-base font-extrabold text-slate-800">Perbaiki Kalimat Berikut</h2></div>
        <div className="space-y-4">
          {FIX_SENTENCES.map((item, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
              <div className="flex items-start gap-2 mb-2"><span className="text-red-400 text-lg mt-0.5">❌</span><p className="text-sm font-mono text-slate-600 bg-red-50 px-3 py-1.5 rounded-lg flex-1">"{item.broken}"</p></div>
              <p className="text-xs text-amber-600 mb-2 pl-7">💡 {item.hint}</p>
              <div className="pl-7">
                <input type="text" value={userAnswers[i]} onChange={e => { const a = [...userAnswers]; a[i] = e.target.value; setUserAnswers(a); }} placeholder="Tulis yang benar..." className={`w-full border-2 rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-colors ${checked[i] ? isCorrect(i) ? 'border-sky-400 bg-green-50 text-green-800' : 'border-red-400 bg-red-50 text-red-800' : 'border-slate-200 focus:border-amber-400'}`}/>
                {checked[i] && !isCorrect(i) && <p className="text-xs text-green-700 mt-1.5 flex items-center justify-between"><span>✅ Jawaban: <span className="font-mono">{item.answer}</span></span> <button onClick={()=>setChecked([...checked.slice(0,i), false, ...checked.slice(i+1)])} className="text-[10px] bg-slate-200 px-2 py-0.5 rounded-md">coba lagi</button></p>}
                {!checked[i] && <button onClick={() => checkSentence(i)} className="mt-2 px-4 py-1.5 bg-amber-500 text-white rounded-lg text-xs font-bold hover:bg-amber-600">Periksa</button>}
                {checked[i] && isCorrect(i) && <p className="text-xs text-green-700 mt-1.5 font-bold">✅ Benar! Bagus sekali!</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="flex items-center gap-2 mb-4"><span className="text-xl">🔡</span><h2 className="text-base font-extrabold text-slate-800">Pilih Kata yang Tepat</h2></div>
        <div className="space-y-4">
          {BUILD_ITEMS.map((item, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
              <p className="text-sm font-semibold text-slate-700 mb-3">{item.prompt.replace('___', buildAnswer[i] ? `[${buildAnswer[i]}]` : '___')}</p>
              <div className="flex gap-2 flex-wrap">
                {item.options.map(opt => (
                  <button key={opt} onClick={() => { const a = [...buildAnswer]; a[i] = opt; setBuildAnswer(a); }} className={`px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all ${buildAnswer[i] === opt ? opt === item.answer ? 'bg-green-100 border-sky-500 text-green-800' : 'bg-red-100 border-red-400 text-red-700' : 'border-slate-200 hover:border-amber-400 hover:bg-amber-50'}`}>{opt}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="flex items-center gap-2 mb-4"><span className="text-xl">📝</span><h2 className="text-base font-extrabold text-slate-800">Tulis Kartu Ucapan</h2></div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500 mb-4">Berterima kasih kepada nenek untuk kado ulang tahun.</p>
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 mb-4 text-xs text-amber-700">
            <p className="font-bold mb-1">📌 Panduan:</p>
            <p>1. Dear Grandma,</p>
            <p>2. Thank you for the book.</p>
            <p>3. I love it!</p>
          </div>
          <textarea rows={5} placeholder="Tulis di sini..." className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400 resize-none" />
        </div>
      </div>
    </div>
  );
}

const ElementaryWritingLesson5: React.FC = () => {
  const navigate = useNavigate();
  const nextPath = '/modul/english/elementary/writing/lesson-6';
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedWritingLessons().includes(5));
  const [showModal, setShowModal] = React.useState(false);
  const [activeTab, setActiveTab] = useState<'learn' | 'menulis' | 'kuis'>('learn');

  const handleComplete = () => { markWritingComplete(5); setIsCompleted(true); setShowModal(true); };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)' }} onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg,#F39C12,#E67E22)' }}><span style={{ fontSize: 38 }}>🏆</span></div>
            <h2 className="text-xl font-extrabold text-slate-900 mb-1">Lesson 5 Selesai! 🎉</h2>
            <div className="flex gap-3 mt-5">
              <button onClick={() => { setShowModal(false); navigate(nextPath); }} className="flex-1 py-3 rounded-xl font-bold text-white" style={{ background: '#F39C12' }}>Lesson 6 ›</button>
              <button onClick={() => { setShowModal(false); navigate(-1); }} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700">Kembali</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col h-[100dvh] md:h-full bg-slate-50">
        <header className="flex-none bg-white/95 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100 shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg></button>
            <div className="text-center">
              <h1 className="text-sm font-bold text-slate-800">Surat Pribadi (Terima Kasih)</h1>
              <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">A2 Writing • Lesson 5</p>
            </div>
            <button onClick={() => navigate(nextPath)} className="px-3 h-9 rounded-full text-xs font-bold text-white" style={{ background: '#F39C12' }}>Next ›</button>
          </div>
        </header>

        <div className="flex bg-white border-b border-slate-100 sticky top-[65px] z-10 shadow-sm">
          {([['learn', '📖 Materi'], ['menulis', '✏️ Menulis'], ['kuis', '🎯 Kuis']] as const).map(([tab, label]) => (
            <button key={tab} onClick={() => setActiveTab(tab as typeof activeTab)} className={`flex-1 py-3 text-xs font-bold tracking-wide transition-all ${activeTab === tab ? 'text-amber-600 border-b-2 border-amber-500' : 'text-slate-400'}`}>{label as string}</button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 pb-28 space-y-5">
            {activeTab === 'learn' && (
              <>
                <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-red-400 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
                  <div className="absolute -top-4 -right-4 text-6xl opacity-10">✏️</div>
                  <h2 className="text-lg font-extrabold mb-1">Surat Pribadi (Terima Kasih)</h2>
                  <p className="text-sm text-amber-100">Mengekspresikan rasa terima kasih yang spesifik melalui kartu atau pesan.</p>
                </div>

                <div className="space-y-3">
                  {RULES.map((r, i) => (
                    <div key={i} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">{r.icon}</span>
                        <div><h3 className="font-extrabold text-slate-800 text-sm">{r.title}</h3><p className="text-xs text-slate-500">{r.rule}</p></div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-red-50 rounded-xl px-3 py-2 text-xs"><p className="text-red-400 font-bold mb-0.5">❌ Salah</p><p className="text-red-700 font-mono">{r.wrong}</p></div>
                        <div className="bg-green-50 rounded-xl px-3 py-2 text-xs"><p className="text-green-500 font-bold mb-0.5">✅ Benar</p><p className="text-green-700 font-mono font-bold">{r.correct}</p></div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeTab === 'menulis' && <WritingSection />}
            {activeTab === 'kuis' && <QuizSection onComplete={handleComplete} />}
          </div>
        </div>

        <div className="sticky bottom-0 z-30 bg-white/90 backdrop-blur-xl border-t border-gray-100 px-4 py-3">
          <button onClick={isCompleted ? () => navigate(-1) : handleComplete} className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all" style={{ background: isCompleted ? 'linear-gradient(135deg,#4FA3D1,#1E6F9F)' : 'linear-gradient(135deg,#F39C12,#E67E22)' }}>
            {isCompleted ? '✅ Sudah Selesai' : '✅ Tandai Selesai'}
          </button>
        </div>
      </div>
    </>
  );
};

export default ElementaryWritingLesson5;
