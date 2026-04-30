import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine } from './writingUtils';
import type { QuizItem } from './writingUtils';

const WRITING_STORAGE_KEY = 'talky_beginner_writing_completed';
function getCompletedWritingLessons(): number[] { try { return JSON.parse(localStorage.getItem(WRITING_STORAGE_KEY) || '[]'); } catch { return []; } }
function markWritingComplete(id: number) { const d = getCompletedWritingLessons(); if (!d.includes(id)) localStorage.setItem(WRITING_STORAGE_KEY, JSON.stringify([...d, id])); }

const PRONOUNS = [
  { pro: 'I', use: 'Diri sendiri (kamu)', ex: 'I am a student.', possessive: 'My', pos_ex: 'My book is red.' },
  { pro: 'You', use: 'Orang yang diajak bicara', ex: 'You are my friend.', possessive: 'Your', pos_ex: 'Your name is Ali.' },
  { pro: 'He', use: 'Laki-laki', ex: 'He is my brother.', possessive: 'His', pos_ex: 'His car is blue.' },
  { pro: 'She', use: 'Perempuan', ex: 'She is my sister.', possessive: 'Her', pos_ex: 'Her bag is new.' },
  { pro: 'It', use: 'Benda / Hewan', ex: 'It is a cat.', possessive: 'Its', pos_ex: 'Its name is Mochi.' },
  { pro: 'We', use: 'Saya + orang lain', ex: 'We are happy.', possessive: 'Our', pos_ex: 'Our school is big.' },
  { pro: 'They', use: 'Beberapa orang/benda', ex: 'They are students.', possessive: 'Their', pos_ex: 'Their books are here.' },
];

const QUIZ: QuizItem[] = [
  { q: '"Dia (lk) adalah muridku" → ___ is my student.', opts: ['She', 'He', 'It'], ans: 'He', exp: '"He" untuk laki-laki.' },
  { q: '"Kami pergi ke sekolah." → ___ go to school.', opts: ['They', 'We', 'I'], ans: 'We', exp: '"We" untuk kelompok + saya.' },
  { q: '"Kamu adalah temanku." → ___ are my friend.', opts: ['I', 'You', 'She'], ans: 'You', exp: '"You" untuk orang yang diajak bicara.' },
  { q: '"Ini adalah kucing." → ___ is a cat.', opts: ['He', 'They', 'It'], ans: 'It', exp: '"It" untuk benda atau hewan.' },
  { q: '"Saya seorang guru." → ___ am a teacher.', opts: ['I', 'We', 'He'], ans: 'I', exp: '"I" hanya digunakan untuk diri sendiri.' },
  { q: '"Mereka murid." → ___ are students.', opts: ['We', 'They', 'She'], ans: 'They', exp: '"They" = lebih dari satu orang atau benda.' },
  { q: '"Dia (pr) adalah ibuku." → ___ is my mother.', opts: ['He', 'It', 'She'], ans: 'She', exp: '"She" untuk perempuan.' },
  { q: 'Kata ganti mana untuk buku (benda)?', opts: ['He', 'She', 'It'], ans: 'It', exp: 'Buku adalah benda → It.' },
  { q: 'Possessive pronoun untuk "I" (milikku) adalah...', opts: ['My', 'Me', 'Mine'], ans: 'My', exp: '"My" = milikku (My book, My name).' },
  { q: '"Mobilnya (laki-laki)" ditulis...', opts: ['His car', 'Her car', 'Its car'], ans: 'His car', exp: '"His" = milik laki-laki.' },
  { q: '"Tasnya (perempuan)" ditulis...', opts: ['His bag', 'Her bag', 'Your bag'], ans: 'Her bag', exp: '"Her" = milik perempuan.' },
  { q: '"Sekolah kami" ditulis...', opts: ['Their school', 'Our school', 'We school'], ans: 'Our school', exp: '"Our" = milik kami.' },
  { q: '"Buku mereka" ditulis...', opts: ['Their books', 'Our books', 'His books'], ans: 'Their books', exp: '"Their" = milik mereka.' },
  { q: '"Namamu" ditulis...', opts: ['You name', 'Your name', 'Yours name'], ans: 'Your name', exp: '"Your" = milikmu.' },
  { q: '"___ is raining." Kata ganti tepat untuk cuaca...', opts: ['He', 'She', 'It'], ans: 'It', exp: 'Cuaca selalu pakai "It": It is raining.' },
  { q: 'Kata mana BUKAN subject pronoun?', opts: ['I', 'Me', 'She'], ans: 'Me', exp: '"Me" adalah object pronoun, bukan subject.' },
  { q: '"John dan Mary pergi." → ___ go.', opts: ['We', 'They', 'You'], ans: 'They', exp: '"They" = lebih dari satu orang.' },
  { q: '"Sekolah kami besar." ditulis...', opts: ['We school is big.', 'Our school is big.', 'Their school is big.'], ans: 'Our school is big.', exp: '"Our" = possessive dari "we".' },
  { q: '"You are" → disingkat menjadi...', opts: ["You're", 'Your', "You'd"], ans: "You're", exp: '"You are" → "You\'re" (kontraksi).' },
  { q: '"I am" → disingkat menjadi...', opts: ["I'm", 'Im', "I'd"], ans: "I'm", exp: '"I am" → "I\'m" (kontraksi).' },
];

/* ─── WRITING PRACTICE ─── */
function WritingPractice() {
  const [chosen, setChosen] = useState<Record<number, string>>({});
  const [corrections, setCorrections] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  const sentenceProblems = [
    { broken: 'Me is a student from Jakarta.', correct: 'I am a student from Jakarta.', hint: '"Me" bukan subject pronoun. Gunakan "I".' },
    { broken: 'Her bag is beautiful, and she bought it in Bali.', correct: 'Her bag is beautiful, and she bought it in Bali.', hint: 'Kalimat ini sudah benar! Kenali "her" dan "she" dengan tepat.' },
    { broken: 'We school name is SMA 1.', correct: 'Our school name is SMA 1.', hint: '"We school" tidak benar. Gunakan possessive "our".' },
    { broken: 'Him likes football very much.', correct: 'He likes football very much.', hint: '"Him" adalah object pronoun. Subject harus "He".' },
  ];

  const gapFill = [
    { prompt: '___ am happy today.', options: ['I', 'Me', 'My'], ans: 'I' },
    { prompt: '___ school is very big.', options: ['We', 'Our', 'Us'], ans: 'Our' },
    { prompt: '___ book is on the table.', options: ['Her', 'She', 'Hers'], ans: 'Her' },
    { prompt: 'I love ___ family.', options: ['me', 'my', 'I'], ans: 'my' },
  ];

  return (
    <div className="space-y-8 max-w-xl mx-auto">
      {/* Gap fill */}
      <div>
        <div className="flex items-center gap-2 mb-3"><span className="text-xl">🧩</span><h2 className="text-base font-extrabold text-slate-800">Pilih Kata Ganti yang Benar</h2></div>
        <div className="space-y-3">
          {gapFill.map((item, i) => (
            <div key={i} className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
              <p className="text-sm font-semibold text-slate-700 mb-3">{item.prompt.replace('___', chosen[i] ? `[${chosen[i]}]` : '___')}</p>
              <div className="flex gap-2">{item.options.map(o => (<button key={o} onClick={() => setChosen(p => ({ ...p, [i]: o }))} className={`px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all ${chosen[i] === o ? o === item.ans ? 'bg-green-100 border-sky-500 text-green-800' : 'bg-red-100 border-red-400 text-red-700' : 'border-slate-200 hover:border-amber-400'}`}>{o}</button>))}</div>
              {chosen[i] && chosen[i] === item.ans && <p className="text-xs text-green-700 mt-2 font-bold">✅ Benar!</p>}
              {chosen[i] && chosen[i] !== item.ans && <p className="text-xs text-red-600 mt-2">❌ Jawaban: <b>{item.ans}</b></p>}
            </div>
          ))}
        </div>
      </div>

      {/* Sentence correction */}
      <div>
        <div className="flex items-center gap-2 mb-3"><span className="text-xl">✏️</span><h2 className="text-base font-extrabold text-slate-800">Perbaiki Kalimat</h2></div>
        <div className="space-y-4">
          {sentenceProblems.map((item, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
              <div className="bg-red-50 rounded-xl px-3 py-2 mb-2"><p className="text-xs text-red-500 font-bold mb-0.5">❌ Salah:</p><p className="text-sm font-mono text-red-700">"{item.broken}"</p></div>
              <p className="text-xs text-amber-600 mb-2">💡 {item.hint}</p>
              <input type="text" value={corrections[i] ?? ''} onChange={e => setCorrections(p => ({ ...p, [i]: e.target.value }))} placeholder="Tulis kalimat yang benar..." className={`w-full border-2 rounded-xl px-3 py-2 text-sm focus:outline-none transition-colors ${checked[i] ? corrections[i]?.trim().toLowerCase() === item.correct.toLowerCase() ? 'border-sky-400 bg-green-50' : 'border-red-300 bg-red-50' : 'border-slate-200 focus:border-amber-400'}`} />
              {!checked[i] && <button onClick={() => setChecked(p => ({ ...p, [i]: true }))} className="mt-2 px-4 py-1.5 bg-amber-500 text-white rounded-lg text-xs font-bold">Periksa</button>}
              {checked[i] && corrections[i]?.trim().toLowerCase() !== item.correct.toLowerCase() && <p className="text-xs text-green-700 mt-1">✅ Jawaban: <span className="font-mono font-bold">{item.correct}</span></p>}
              {checked[i] && corrections[i]?.trim().toLowerCase() === item.correct.toLowerCase() && <p className="text-xs text-green-700 mt-1 font-bold">✅ Sempurna!</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Postcard pronoun fill */}
      <div>
        <div className="flex items-center gap-2 mb-3"><span className="text-xl">📮</span><h2 className="text-base font-extrabold text-slate-800">Tulis Pesan Singkat</h2></div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500 mb-3">Tulis pesan singkat (2–3 kalimat) tentang dirimu kepada seorang teman. Gunakan kata ganti yang benar (I, my, you, your, etc.)</p>
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 mb-3 text-xs text-amber-700">
            <p className="font-bold mb-1">Panduan:</p>
            <p>• Mulai dengan: "Hi [nama teman],"</p>
            <p>• Ceritakan: I am..., My hobby is..., I like...</p>
            <p>• Akhiri dengan: "From, [namamu]"</p>
          </div>
          <textarea rows={5} placeholder="Hi Dani,&#10;&#10;...&#10;&#10;From, ___" className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400 resize-none" />
        </div>
      </div>
    </div>
  );
}

const WritingLesson3: React.FC = () => {
  const navigate = useNavigate();
  const nextPath = '/modul/english/beginner/writing/lesson-4';
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedWritingLessons().includes(3));
  const [showModal, setShowModal] = React.useState(false);
  const [activeTab, setActiveTab] = useState<'learn' | 'menulis' | 'kuis'>('learn');
  const handleComplete = () => { markWritingComplete(3); setIsCompleted(true); setShowModal(true); };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)' }} onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg,#F39C12,#E67E22)' }}><span style={{ fontSize: 38 }}>🏆</span></div>
            <h2 className="text-xl font-extrabold mb-1">Lesson 3 Selesai! 🎉</h2>
            <p className="text-sm text-gray-500 mb-5">Kamu sudah menguasai kata ganti diri!</p>
            <div className="flex gap-3">
              <button onClick={() => { setShowModal(false); navigate(nextPath); }} className="flex-1 py-3 rounded-xl font-bold text-white" style={{ background: '#F39C12' }}>Lesson 4 ›</button>
              <button onClick={() => { setShowModal(false); navigate(-1); }} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700">Kembali</button>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col h-[100dvh] md:h-full bg-slate-50">
        <header className="flex-none bg-white/95 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100 shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg></button>
            <div className="text-center"><h1 className="text-sm font-bold text-slate-800">Kata Ganti & Menulis Pesan</h1><p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">Writing • Lesson 3</p></div>
            <button onClick={() => navigate(nextPath)} className="px-3 h-9 rounded-full text-xs font-bold text-white" style={{ background: '#F39C12' }}>Next ›</button>
          </div>
        </header>
        <div className="flex bg-white border-b border-slate-100 sticky top-[65px] z-10 shadow-sm">
          {([['learn', '📖 Materi'], ['menulis', '✏️ Latihan'], ['kuis', '🎯 Kuis']] as const).map(([tab, label]) => (
            <button key={tab} onClick={() => setActiveTab(tab as typeof activeTab)} className={`flex-1 py-3 text-xs font-bold tracking-wide transition-all ${activeTab === tab ? 'text-amber-600 border-b-2 border-amber-500' : 'text-slate-400'}`}>{label as string}</button>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 pb-28 space-y-5">
            {activeTab === 'learn' && (
              <>
                <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-5 text-white shadow-lg"><h2 className="text-lg font-extrabold mb-1">Kata Ganti Diri</h2><p className="text-sm text-amber-100">Kata ganti (pronouns) membuat tulisanmu lebih natural. Pelajari subject & possessive pronouns!</p></div>
                <div className="space-y-3">
                  {PRONOUNS.map((p, i) => (
                    <div key={i} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2"><span className="text-2xl font-extrabold text-amber-600 bg-amber-50 w-12 h-12 rounded-xl flex items-center justify-center">{p.pro}</span><div><p className="text-sm font-bold text-slate-800">{p.use}</p></div></div>
                        <div className="text-right"><p className="text-xs text-slate-400">Possessive</p><p className="text-sm font-bold text-blue-600">{p.possessive}</p></div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-slate-50 rounded-xl px-3 py-2 text-xs text-slate-600 italic">"{p.ex}"</div>
                        <div className="bg-blue-50 rounded-xl px-3 py-2 text-xs text-blue-700 italic">"{p.pos_ex}"</div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
            {activeTab === 'menulis' && <WritingPractice />}
            {activeTab === 'kuis' && <QuizEngine items={QUIZ} onComplete={handleComplete} />}
          </div>
        </div>
        <div className="sticky bottom-0 z-30 bg-white/90 backdrop-blur-xl border-t border-gray-100 px-4 py-3">
          <button onClick={isCompleted ? () => navigate(-1) : handleComplete} className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg active:scale-[0.98]" style={{ background: isCompleted ? 'linear-gradient(135deg,#4FA3D1,#1E6F9F)' : 'linear-gradient(135deg,#F39C12,#E67E22)' }}>
            {isCompleted ? '✅ Sudah Selesai' : '✅ Tandai Selesai'}
          </button>
        </div>
      </div>
    </>
  );
};

export default WritingLesson3;
