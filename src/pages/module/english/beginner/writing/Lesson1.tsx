import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircleIcon, XCircleIcon, StarIcon } from '../../../../../components/Icons';

const WRITING_STORAGE_KEY = 'talky_beginner_writing_completed';
function getCompletedWritingLessons(): number[] { try { return JSON.parse(localStorage.getItem(WRITING_STORAGE_KEY) || '[]'); } catch { return []; } }
function markWritingComplete(id: number) { const d = getCompletedWritingLessons(); if (!d.includes(id)) localStorage.setItem(WRITING_STORAGE_KEY, JSON.stringify([...d, id])); }

/* ─── DATA ─────────────────────────────────────── */
const RULES = [
  { icon: '🔠', title: 'Huruf Kapital', rule: 'Mulai setiap kalimat dengan HURUF BESAR.', wrong: 'my name is sari.', correct: 'My name is Sari.' },
  { icon: '🛑', title: 'Titik (.)', rule: 'Akhiri kalimat pernyataan dengan titik.', wrong: 'I like cats', correct: 'I like cats.' },
  { icon: '❓', title: 'Tanda Tanya (?)', rule: 'Akhiri kalimat pertanyaan dengan tanda tanya.', wrong: 'Do you like tea', correct: 'Do you like tea?' },
  { icon: '📣', title: 'Tanda Seru (!)', rule: 'Menunjukkan emosi kuat atau seruan.', wrong: 'Wow that is great', correct: 'Wow, that is great!' },
];

// Sentences to correct — user types corrected version
const FIX_SENTENCES = [
  { broken: 'my name is budi.', hint: 'Nama dan awal kalimat harus kapital.', answer: 'My name is Budi.' },
  { broken: 'she is my sister', hint: 'Kalimat butuh tanda baca di akhir.', answer: 'She is my sister.' },
  { broken: 'we live in jakarta.', hint: 'Nama kota harus kapital.', answer: 'We live in Jakarta.' },
  { broken: 'do you speak english', hint: 'Kalimat tanya butuh tanda tanya.', answer: 'Do you speak English?' },
  { broken: 'i am a student from bandung.', hint: '"I" selalu kapital; nama kota kapital.', answer: 'I am a student from Bandung.' },
];

// Simple sentence builder — pick the right word
const BUILD_ITEMS = [
  { prompt: '___ name is Rina.', blank: 'My', options: ['My', 'Me', 'I'], answer: 'My' },
  { prompt: 'She ___ a teacher.', blank: 'is', options: ['am', 'is', 'are'], answer: 'is' },
  { prompt: 'I live ___ Surabaya.', blank: 'in', options: ['at', 'in', 'on'], answer: 'in' },
  { prompt: 'Do you ___ English?', blank: 'speak', options: ['speaks', 'speak', 'speaking'], answer: 'speak' },
];

const QUIZ = [
  { q: 'Kalimat mana yang benar?', opts: ['my name is ali.', 'My name is Ali.', 'My Name Is Ali'], ans: 'My name is Ali.', exp: 'Hanya awal kalimat & nama orang yang kapital.' },
  { q: 'Tanda apa yang mengakhiri kalimat tanya?', opts: ['.', '!', '?'], ans: '?', exp: 'Kalimat tanya diakhiri tanda tanya (?).' },
  { q: '"I" dalam bahasa Inggris selalu ditulis...', opts: ['i', 'I', 'bergantian'], ans: 'I', exp: 'Kata ganti "I" (saya) ALWAYS kapital.' },
  { q: '"london is a big city." Yang salah...', opts: ['london', 'big', 'city'], ans: 'london', exp: 'Nama kota harus kapital: London.' },
  { q: '"She is my sister" butuh tanda baca...', opts: [',', '.', '?'], ans: '.', exp: 'Kalimat pernyataan diakhiri titik (.).' },
  { q: 'Mana penulisan yang benar?', opts: ['we live in jakarta', 'We live in Jakarta.', 'We Live In Jakarta.'], ans: 'We live in Jakarta.', exp: 'Awal kalimat & nama kota kapital, diakhiri titik.' },
  { q: 'Alfabet Inggris terdiri dari...', opts: ['24 huruf', '25 huruf', '26 huruf'], ans: '26 huruf', exp: 'A sampai Z = 26 huruf.' },
  { q: 'Kalimat seru diakhiri dengan...', opts: ['.', '?', '!'], ans: '!', exp: 'Tanda seru (!) untuk ekspresi emosi kuat.' },
  { q: '"do you like coffee?" yang salah adalah...', opts: ['do (awal kalimat)', 'like', 'coffee'], ans: 'do (awal kalimat)', exp: 'Awal kalimat tanya juga harus kapital: "Do you like coffee?"' },
  { q: 'Huruf vokal dalam alfabet Inggris adalah...', opts: ['A B C D E', 'A E I O U', 'B C D F G'], ans: 'A E I O U', exp: 'Lima huruf vokal: A, E, I, O, U.' },
  { q: '"She is my friend" → sudah benar tanda bacanya?', opts: ['Sudah', 'Belum — butuh titik', 'Belum — butuh koma'], ans: 'Belum — butuh titik', exp: 'Kalimat pernyataan harus diakhiri titik: "She is my friend."' },
  { q: 'Nama negara harus ditulis...', opts: ['huruf kecil semua', 'huruf kapital semua', 'huruf kapital di awal kata'], ans: 'huruf kapital di awal kata', exp: 'Nama negara: Indonesia, America, Japan.' },
  { q: 'Kalimat mana yang SALAH?', opts: ['I am from Bali.', 'She is my sister.', 'we are students.'], ans: 'we are students.', exp: '"We" di awal kalimat harus kapital: "We are students."' },
  { q: '"Wow that is great" butuh tanda baca...', opts: ['tanda tanya', 'titik saja', 'koma & tanda seru'], ans: 'koma & tanda seru', exp: '"Wow, that is great!" — koma setelah seruan, tanda seru di akhir.' },
  { q: 'Huruf konsonan adalah...', opts: ['A, E, I, O, U', 'semua huruf selain vokal', 'hanya B, C, D'], ans: 'semua huruf selain vokal', exp: '21 konsonan = semua huruf kecuali 5 vokal.' },
  { q: 'Kalimat yang tepat adalah...', opts: ['my sister is pretty.', 'My sister is pretty.', 'My Sister Is Pretty.'], ans: 'My sister is pretty.', exp: 'Hanya kata pertama yang kapital (bukan kata umum lainnya).' },
  { q: '"She is my Friend." yang salah...', opts: ['She', 'is', 'Friend'], ans: 'Friend', exp: '"Friend" bukan nama diri, tidak perlu kapital: "She is my friend."' },
  { q: '"i speak english." Perbaikan yang benar...', opts: ['I speak English.', 'I Speak English.', 'i speak English.'], ans: 'I speak English.', exp: '"I" dan nama bahasa "English" harus kapital.' },
  { q: 'Kalimat tanya yang benar...', opts: ['do you like cats.', 'Do you like cats?', 'Do you like cats!'], ans: 'Do you like cats?', exp: 'Kalimat tanya + kapital di awal + tanda tanya.' },
  { q: 'Berapa jumlah huruf kapital dalam abjad Inggris?', opts: ['24', '26', '28'], ans: '26', exp: 'A–Z = 26 huruf, masing-masing ada versi kapital dan kecil.' },
];

/* ─── KOMPONEN QUIZ ─── */
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

/* ─── KOMPONEN LATIHAN MENULIS ─── */
function WritingSection() {
  const [userAnswers, setUserAnswers] = useState<string[]>(FIX_SENTENCES.map(() => ''));
  const [checked, setChecked] = useState<boolean[]>(FIX_SENTENCES.map(() => false));
  const [buildAnswer, setBuildAnswer] = useState<string[]>(BUILD_ITEMS.map(() => ''));

  const checkSentence = (i: number) => {
    const newChecked = [...checked];
    newChecked[i] = true;
    setChecked(newChecked);
  };

  const isCorrect = (i: number) => userAnswers[i].trim().toLowerCase() === FIX_SENTENCES[i].answer.toLowerCase();

  return (
    <div className="space-y-8 max-w-xl mx-auto">

      {/* SECTION 1: Fix the sentence */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">✏️</span>
          <h2 className="text-base font-extrabold text-slate-800">Perbaiki Kalimat Berikut</h2>
        </div>
        <p className="text-sm text-slate-500 mb-4">Tulis ulang kalimat di bawah dengan ejaan dan tanda baca yang benar.</p>
        <div className="space-y-4">
          {FIX_SENTENCES.map((item, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
              <div className="flex items-start gap-2 mb-2">
                <span className="text-red-400 text-lg mt-0.5">❌</span>
                <p className="text-sm font-mono text-slate-600 bg-red-50 px-3 py-1.5 rounded-lg flex-1">"{item.broken}"</p>
              </div>
              <p className="text-xs text-amber-600 mb-2 pl-7">💡 {item.hint}</p>
              <div className="pl-7">
                <input
                  type="text"
                  value={userAnswers[i]}
                  onChange={e => { const a = [...userAnswers]; a[i] = e.target.value; setUserAnswers(a); }}
                  placeholder="Tulis kalimat yang benar di sini..."
                  className={`w-full border-2 rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-colors ${checked[i] ? isCorrect(i) ? 'border-sky-400 bg-green-50 text-green-800' : 'border-red-400 bg-red-50 text-red-800' : 'border-slate-200 focus:border-amber-400'}`}
                />
                {checked[i] && !isCorrect(i) && (
                  <p className="text-xs text-green-700 mt-1.5 font-medium">✅ Jawaban: <span className="font-mono">{item.answer}</span></p>
                )}
                {!checked[i] && (
                  <button onClick={() => checkSentence(i)} className="mt-2 px-4 py-1.5 bg-amber-500 text-white rounded-lg text-xs font-bold hover:bg-amber-600 transition">Periksa</button>
                )}
                {checked[i] && isCorrect(i) && <p className="text-xs text-green-700 mt-1.5 font-bold">✅ Benar! Bagus sekali!</p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: Fill the blank */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">🔡</span>
          <h2 className="text-base font-extrabold text-slate-800">Pilih Kata yang Tepat</h2>
        </div>
        <div className="space-y-4">
          {BUILD_ITEMS.map((item, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
              <p className="text-sm font-semibold text-slate-700 mb-3">
                {item.prompt.replace('___', buildAnswer[i] ? `[${buildAnswer[i]}]` : '___')}
              </p>
              <div className="flex gap-2 flex-wrap">
                {item.options.map(opt => (
                  <button
                    key={opt}
                    onClick={() => { const a = [...buildAnswer]; a[i] = opt; setBuildAnswer(a); }}
                    className={`px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all ${buildAnswer[i] === opt
                      ? opt === item.answer ? 'bg-green-100 border-sky-500 text-green-800' : 'bg-red-100 border-red-400 text-red-700'
                      : 'border-slate-200 hover:border-amber-400 hover:bg-amber-50'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {buildAnswer[i] && buildAnswer[i] === item.answer && (
                <p className="text-xs text-green-700 mt-2">✅ Benar!</p>
              )}
              {buildAnswer[i] && buildAnswer[i] !== item.answer && (
                <p className="text-xs text-orange-600 mt-2">❌ Coba lagi — jawaban yang benar: <b>{item.answer}</b></p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: Mini writing */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">📝</span>
          <h2 className="text-base font-extrabold text-slate-800">Perkenalkan Dirimu!</h2>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500 mb-4">Tulis 3 kalimat tentang dirimu. Gunakan huruf kapital dan tanda baca yang benar.</p>
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 mb-4 text-xs text-amber-700">
            <p className="font-bold mb-1">📌 Panduan:</p>
            <p>1. My name is ___.</p>
            <p>2. I am from ___.</p>
            <p>3. I like ___.</p>
          </div>
          <textarea
            rows={5}
            placeholder="Tulis di sini..."
            className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400 resize-none"
          />
          <p className="text-xs text-slate-400 mt-2">💡 Ingat: Mulai setiap kalimat dengan huruf kapital dan akhiri dengan titik.</p>
        </div>
      </div>

    </div>
  );
}

/* ─── MAIN COMPONENT ─── */
const WritingLesson1: React.FC = () => {
  const navigate = useNavigate();
  const nextPath = '/modul/english/beginner/writing/lesson-2';
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedWritingLessons().includes(1));
  const [showModal, setShowModal] = React.useState(false);
  const [activeTab, setActiveTab] = useState<'learn' | 'menulis' | 'kuis'>('learn');

  const handleComplete = () => { markWritingComplete(1); setIsCompleted(true); setShowModal(true); };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)' }} onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg,#F39C12,#E67E22)' }}><span style={{ fontSize: 38 }}>🏆</span></div>
            <h2 className="text-xl font-extrabold text-slate-900 mb-1">Lesson 1 Selesai! 🎉</h2>
            <p className="text-sm text-gray-500 mb-5">Kamu sudah menguasai aturan penulisan dasar bahasa Inggris!</p>
            <div className="flex gap-3">
              <button onClick={() => { setShowModal(false); navigate(nextPath); }} className="flex-1 py-3 rounded-xl font-bold text-white" style={{ background: '#F39C12' }}>Lesson 2 ›</button>
              <button onClick={() => { setShowModal(false); navigate(-1); }} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700">Kembali</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col h-[100dvh] md:h-full bg-slate-50">
        {/* Header */}
        <header className="flex-none bg-white/95 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100 shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <div className="text-center">
              <h1 className="text-sm font-bold text-slate-800">Huruf & Alfabet</h1>
              <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">Writing • Lesson 1</p>
            </div>
            <button onClick={() => navigate(nextPath)} className="px-3 h-9 rounded-full text-xs font-bold text-white" style={{ background: '#F39C12' }}>Next ›</button>
          </div>
        </header>

        {/* Tabs */}
        <div className="flex bg-white border-b border-slate-100 sticky top-[65px] z-10 shadow-sm">
          {([['learn', '📖 Materi'], ['menulis', '✏️ Menulis'], ['kuis', '🎯 Kuis']] as const).map(([tab, label]) => (
            <button key={tab} onClick={() => setActiveTab(tab as typeof activeTab)} className={`flex-1 py-3 text-xs font-bold tracking-wide transition-all ${activeTab === tab ? 'text-amber-600 border-b-2 border-amber-500' : 'text-slate-400'}`}>{label as string}</button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 pb-28 space-y-5">

            {activeTab === 'learn' && (
              <>
                <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-red-400 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
                  <div className="absolute -top-4 -right-4 text-6xl opacity-10">✏️</div>
                  <h2 className="text-lg font-extrabold mb-1">Fondasi Menulis Bahasa Inggris</h2>
                  <p className="text-sm text-amber-100">Sebelum bisa menulis kalimat, kartu pos, atau formulir — kamu harus menguasai aturan dasar ejaan & tanda baca!</p>
                </div>

                <div className="space-y-3">
                  {RULES.map((r, i) => (
                    <div key={i} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">{r.icon}</span>
                        <div>
                          <h3 className="font-extrabold text-slate-800 text-sm">{r.title}</h3>
                          <p className="text-xs text-slate-500">{r.rule}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-red-50 rounded-xl px-3 py-2 text-xs"><p className="text-red-400 font-bold mb-0.5">❌ Salah</p><p className="text-red-700 font-mono">{r.wrong}</p></div>
                        <div className="bg-green-50 rounded-xl px-3 py-2 text-xs"><p className="text-green-500 font-bold mb-0.5">✅ Benar</p><p className="text-green-700 font-mono font-bold">{r.correct}</p></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
                  <h3 className="font-bold text-blue-800 mb-2 text-sm">🔤 Alfabet A–Z</h3>
                  <div className="grid grid-cols-6 gap-1.5">
                    {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(l => (
                      <div key={l} className="bg-white rounded-lg h-9 flex flex-col items-center justify-center text-xs border border-blue-100">
                        <span className="font-extrabold text-blue-700">{l}</span>
                        <span className="text-slate-400 text-[9px]">{l.toLowerCase()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
                  <h3 className="font-bold text-amber-800 mb-2 text-sm">🎯 Yang akan kamu bisa setelah lesson ini:</h3>
                  <ul className="text-sm text-amber-700 space-y-1.5">
                    <li>✦ Menulis kalimat dengan ejaan yang benar</li>
                    <li>✦ Menggunakan huruf kapital di tempat yang tepat</li>
                    <li>✦ Menulis kartu pos dan formulir dengan tanda baca yang benar</li>
                  </ul>
                </div>
              </>
            )}

            {activeTab === 'menulis' && <WritingSection />}
            {activeTab === 'kuis' && <QuizSection onComplete={handleComplete} />}
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 z-30 bg-white/90 backdrop-blur-xl border-t border-gray-100 px-4 py-3">
          <button onClick={isCompleted ? () => navigate(-1) : handleComplete} className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all" style={{ background: isCompleted ? 'linear-gradient(135deg,#4FA3D1,#1E6F9F)' : 'linear-gradient(135deg,#F39C12,#E67E22)' }}>
            {isCompleted ? '✅ Sudah Selesai' : '✅ Tandai Selesai'}
          </button>
        </div>
      </div>
    </>
  );
};

export default WritingLesson1;
