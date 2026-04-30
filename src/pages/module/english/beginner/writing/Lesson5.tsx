import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine, PostcardWriter } from './writingUtils';
import type { QuizItem } from './writingUtils';

const WRITING_STORAGE_KEY = 'talky_beginner_writing_completed';
function getCompletedWritingLessons(): number[] { try { return JSON.parse(localStorage.getItem(WRITING_STORAGE_KEY) || '[]'); } catch { return []; } }
function markWritingComplete(id: number) { const d = getCompletedWritingLessons(); if (!d.includes(id)) localStorage.setItem(WRITING_STORAGE_KEY, JSON.stringify([...d, id])); }

const FAMILY = [
  { en: 'father', id: 'ayah', icon: '👨' }, { en: 'mother', id: 'ibu', icon: '👩' },
  { en: 'brother', id: 'saudara laki-laki', icon: '👦' }, { en: 'sister', id: 'saudara perempuan', icon: '👧' },
  { en: 'grandfather', id: 'kakek', icon: '👴' }, { en: 'grandmother', id: 'nenek', icon: '👵' },
  { en: 'uncle', id: 'paman', icon: '🧔' }, { en: 'aunt', id: 'bibi', icon: '👩‍🦱' },
  { en: 'cousin', id: 'sepupu', icon: '🧑' }, { en: 'son', id: 'anak laki-laki', icon: '👦' },
  { en: 'daughter', id: 'anak perempuan', icon: '👧' }, { en: 'husband', id: 'suami', icon: '👨' },
  { en: 'wife', id: 'istri', icon: '👩' }, { en: 'parents', id: 'orang tua', icon: '👨‍👩‍👧' },
];

const QUIZ: QuizItem[] = [
  { q: '"Ibu" dalam bahasa Inggris?', opts: ['father', 'mother', 'aunt'], ans: 'mother', exp: '"Mother" = ibu.' },
  { q: '"Saya punya dua saudara laki-laki." ditulis...', opts: ['I have two brothers.', 'I has two brother.', 'I have two brother.'], ans: 'I have two brothers.', exp: 'Dua orang: brothers (jamak, +s).' },
  { q: '"Kakek" dalam bahasa Inggris?', opts: ['uncle', 'grandfather', 'father'], ans: 'grandfather', exp: '"Grandfather" = kakek.' },
  { q: '"My father ___ a doctor." Kata kerja yang benar?', opts: ['am', 'are', 'is'], ans: 'is', exp: '"My father" = he → is.' },
  { q: '"Saudara perempuan" dalam bahasa Inggris?', opts: ['sister', 'brother', 'daughter'], ans: 'sister', exp: '"Sister" = saudara perempuan.' },
  { q: '"Kami adalah keluarga besar." ditulis...', opts: ['We have a big family.', 'We is a big family.', 'We are a big family.'], ans: 'We are a big family.', exp: '"We are" = kami adalah (to be untuk jamak).' },
  { q: '"Nenek" dalam bahasa Inggris?', opts: ['aunt', 'grandmother', 'mother'], ans: 'grandmother', exp: '"Grandmother" = nenek.' },
  { q: '"Ayah dan ibuku baik." ditulis...', opts: ['My parents is kind.', 'My parents are kind.', 'My parent are kind.'], ans: 'My parents are kind.', exp: '"Parents" jamak → are.' },
  { q: '"Paman" dalam bahasa Inggris?', opts: ['uncle', 'aunt', 'cousin'], ans: 'uncle', exp: '"Uncle" = paman.' },
  { q: '"Bibi" dalam bahasa Inggris?', opts: ['uncle', 'aunt', 'sister'], ans: 'aunt', exp: '"Aunt" = bibi.' },
  { q: '"Her brother is tall." artinya...', opts: ['Kakaknya tinggi.', 'Saudaranya (lk) tinggi.', 'Dia saudara laki-laki.'], ans: 'Saudaranya (lk) tinggi.', exp: '"Her brother" = saudara laki-lakinya (milik perempuan).' },
  { q: '"Anak perempuan" dalam bahasa Inggris?', opts: ['son', 'daughter', 'niece'], ans: 'daughter', exp: '"Daughter" = anak perempuan.' },
  { q: '"Sepupu" dalam bahasa Inggris?', opts: ['nephew', 'cousin', 'niece'], ans: 'cousin', exp: '"Cousin" = sepupu.' },
  { q: '"I love my family." artinya?', opts: ['Saya suka keluarga.', 'Saya mencintai keluargaku.', 'Saya dan keluarga.'], ans: 'Saya mencintai keluargaku.', exp: '"Love" = mencintai (lebih kuat dari "like").' },
  { q: '"Anak laki-laki" dalam bahasa Inggris?', opts: ['son', 'boy', 'nephew'], ans: 'son', exp: '"Son" = anak laki-laki (dari perspektif orang tua).' },
  { q: '"My sister ___ a teacher." Kata yang benar?', opts: ['am', 'is', 'are'], ans: 'is', exp: '"My sister" = she → is.' },
  { q: '"Suami" dalam bahasa Inggris?', opts: ['husband', 'wife', 'man'], ans: 'husband', exp: '"Husband" = suami.' },
  { q: '"Orang tua" (ayah+ibu) dalam bahasa Inggris?', opts: ['relatives', 'parents', 'family'], ans: 'parents', exp: '"Parents" = orang tua (ayah dan ibu).' },
  { q: 'Possessive adjective untuk "she" (miliknya)?', opts: ['his', 'her', 'their'], ans: 'her', exp: '"She" → "her" (contoh: her book = bukunya).' },
  { q: '"I miss my family." artinya?', opts: ['Saya pergi ke keluarga.', 'Saya merindukan keluargaku.', 'Saya bertemu keluarga.'], ans: 'Saya merindukan keluargaku.', exp: '"Miss" = merindukan/kangen.' },
];

/* ─── POSTCARD FIELDS ─── */
const POSTCARD_FIELDS = [
  { id: 'greeting', label: 'Greeting (Salam Pembuka)', placeholder: 'e.g. Dear Mom and Dad,', hint: 'Mulai dengan "Dear + nama penerima,"' },
  { id: 'message', label: 'Message (Pesan)', placeholder: 'Tulis pesanmu di sini...', multiline: true, hint: 'Ceritakan di mana kamu dan apa yang kamu lakukan.' },
  { id: 'closing', label: 'Closing (Penutup)', placeholder: 'e.g. Love, / Best wishes,', hint: 'Akhiri dengan salam seperti "Love," atau "Warm wishes,"' },
  { id: 'name', label: 'Your Name (Namamu)', placeholder: 'e.g. Rina' },
  { id: 'to_name', label: 'To (Nama Penerima)', placeholder: 'e.g. Mr. & Mrs. Santoso' },
  { id: 'to_address', label: 'Address (Alamat)', placeholder: 'e.g. Jl. Merdeka No. 10, Jakarta' },
  { id: 'to_city', label: 'City (Kota)', placeholder: 'e.g. Jakarta, 10110, Indonesia' },
];

const POSTCARD_EXAMPLE = {
  greeting: 'Dear Mom and Dad,',
  message: 'I am in Bali now. It is very beautiful here! I visited Tanah Lot temple yesterday. The weather is sunny and warm. I eat a lot of delicious food. I miss you both!',
  closing: 'Love,',
  name: 'Rina',
  to_name: 'Mr. & Mrs. Santoso',
  to_address: 'Jl. Pahlawan No. 5, Surabaya',
  to_city: 'Surabaya, 60111, Indonesia',
};

/* ─── SENTENCE BUILDER ─── */
function SentenceBuilder() {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const items = [
    { id: 's1', prompt: 'My father ___ a doctor in Jakarta.', choices: ['am', 'is', 'are'], ans: 'is' },
    { id: 's2', prompt: 'I have ___ brothers and one sister.', choices: ['two', 'a', 'much'], ans: 'two' },
    { id: 's3', prompt: 'My grandmother ___ very kind and gentle.', choices: ['is', 'are', 'am'], ans: 'is' },
    { id: 's4', prompt: 'We ___ a happy family.', choices: ['is', 'am', 'are'], ans: 'are' },
    { id: 's5', prompt: 'My sister ___ studying English every day.', choices: ['is', 'are', 'am'], ans: 'is' },
  ];

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl">🧩</span>
        <h2 className="text-base font-extrabold text-slate-800">Lengkapi Kalimat</h2>
      </div>
      <div className="space-y-3">
        {items.map(item => (
          <div key={item.id} className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
            <p className="text-sm font-semibold text-slate-700 mb-3">
              {item.prompt.replace('___', answers[item.id] ? `[${answers[item.id]}]` : '___')}
            </p>
            <div className="flex gap-2">
              {item.choices.map(c => (
                <button key={c} onClick={() => setAnswers(p => ({ ...p, [item.id]: c }))} className={`px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all ${answers[item.id] === c ? c === item.ans ? 'bg-green-100 border-sky-500 text-green-800' : 'bg-red-100 border-red-400 text-red-700' : 'border-slate-200 hover:border-amber-400'}`}>{c}</button>
              ))}
            </div>
            {answers[item.id] && answers[item.id] === item.ans && <p className="text-xs text-green-700 mt-2 font-bold">✅ Benar!</p>}
            {answers[item.id] && answers[item.id] !== item.ans && <p className="text-xs text-red-600 mt-2">❌ Jawaban: <b>{item.ans}</b></p>}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── MAIN ─── */
const WritingLesson5: React.FC = () => {
  const navigate = useNavigate();
  const nextPath = '/modul/english/beginner/writing/lesson-6';
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
            <h2 className="text-xl font-extrabold mb-1">Lesson 5 Selesai! 🎉</h2>
            <p className="text-sm text-gray-500 mb-5">Kamu sudah bisa menulis kartu pos untuk keluarga!</p>
            <div className="flex gap-3">
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
            <div className="text-center"><h1 className="text-sm font-bold text-slate-800">Keluarga & Kartu Pos</h1><p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">Writing • Lesson 5</p></div>
            <button onClick={() => navigate(nextPath)} className="px-3 h-9 rounded-full text-xs font-bold text-white" style={{ background: '#F39C12' }}>Next ›</button>
          </div>
        </header>

        <div className="flex bg-white border-b border-slate-100 sticky top-[65px] z-10 shadow-sm">
          {([['learn', '📖 Materi'], ['menulis', '✏️ Kartu Pos'], ['kuis', '🎯 Kuis']] as const).map(([tab, label]) => (
            <button key={tab} onClick={() => setActiveTab(tab as typeof activeTab)} className={`flex-1 py-3 text-xs font-bold tracking-wide transition-all ${activeTab === tab ? 'text-amber-600 border-b-2 border-amber-500' : 'text-slate-400'}`}>{label as string}</button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 pb-28 space-y-5">

            {activeTab === 'learn' && (
              <>
                <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-5 text-white shadow-lg">
                  <h2 className="text-lg font-extrabold mb-1">Keluarga & Kartu Pos</h2>
                  <p className="text-sm text-amber-100">Pelajari kosakata keluarga lalu praktikkan dengan menulis kartu pos liburan untuk keluargamu!</p>
                </div>

                <div>
                  <h3 className="font-extrabold text-slate-800 mb-3 text-sm">👨‍👩‍👧‍👦 Anggota Keluarga</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {FAMILY.map(f => (
                      <div key={f.en} className="bg-white rounded-xl p-3 border border-slate-100 flex items-center gap-2.5 shadow-sm">
                        <span className="text-2xl">{f.icon}</span>
                        <div><p className="text-sm font-bold text-slate-800">{f.en}</p><p className="text-xs text-slate-400">{f.id}</p></div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                  <h3 className="font-extrabold text-slate-800 mb-3 text-sm">📮 Struktur Kartu Pos</h3>
                  <div className="space-y-2">
                    {[
                      { part: 'Greeting', ex: 'Dear Mom and Dad,', desc: 'Salam kepada siapa kartu ditulis' },
                      { part: 'Message', ex: 'I am in Bali. It is beautiful!', desc: 'Isi pesan / kabar' },
                      { part: 'Closing', ex: 'Love, / Warm wishes,', desc: 'Salam penutup' },
                      { part: 'Signature', ex: 'Rina', desc: 'Nama pengirim' },
                    ].map((s, i) => (
                      <div key={i} className="flex items-start gap-3 bg-amber-50 rounded-xl px-3 py-2.5">
                        <span className="text-xs font-extrabold text-amber-600 w-20 shrink-0 pt-0.5">{s.part}</span>
                        <div><p className="text-xs font-mono text-amber-800 font-bold">{s.ex}</p><p className="text-xs text-slate-500">{s.desc}</p></div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-green-50 border border-sky-100 rounded-2xl p-4">
                  <h3 className="font-bold text-green-800 mb-2 text-sm">💡 Pola Kalimat Tentang Keluarga</h3>
                  <ul className="text-sm text-green-700 space-y-1.5">
                    <li>✦ <b>My + anggota keluarga + is/are + informasi</b></li>
                    <li>✦ <b>I have + artikel + anggota keluarga</b></li>
                    <li>✦ <b>My parents are ___</b> (jamak → are)</li>
                    <li>✦ <b>I love my ___</b> (ungkapan sayang)</li>
                  </ul>
                </div>
              </>
            )}

            {activeTab === 'menulis' && (
              <div className="space-y-8 max-w-xl mx-auto">
                <SentenceBuilder />
                <div>
                  <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 mb-4">
                    <p className="font-bold text-amber-800 text-sm mb-1">🎯 Situasi:</p>
                    <p className="text-sm text-amber-700">Kamu sedang liburan di Bali. Tulis kartu pos untuk keluargamu di rumah! Ceritakan di mana kamu berada dan apa yang kamu lakukan.</p>
                  </div>
                  <PostcardWriter
                    title="Tulis Kartu Pos untuk Keluarga"
                    stamp="🌴"
                    to="Keluargamu di rumah"
                    fields={POSTCARD_FIELDS}
                    example={POSTCARD_EXAMPLE}
                  />
                </div>
              </div>
            )}

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

export default WritingLesson5;
