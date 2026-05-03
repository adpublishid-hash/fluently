import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine, PostcardWriter } from './writingUtils';
import type { QuizItem } from './writingUtils';

const WRITING_STORAGE_KEY = 'talky_beginner_writing_completed';
function getCompletedWritingLessons(): number[] { try { return JSON.parse(localStorage.getItem(WRITING_STORAGE_KEY) || '[]'); } catch { return []; } }
function markWritingComplete(id: number) { const d = getCompletedWritingLessons(); if (!d.includes(id)) localStorage.setItem(WRITING_STORAGE_KEY, JSON.stringify([...d, id])); }

const QUIZ: QuizItem[] = [
  { q: '"Merah" dalam bahasa Inggris?', opts: ['red', 'blue', 'green'], ans: 'red', exp: '"Red" = merah.' },
  { q: '"The sky is ___." (langit biru)', opts: ['green', 'blue', 'yellow'], ans: 'blue', exp: 'Langit berwarna biru = blue.' },
  { q: '"Kuning" dalam bahasa Inggris?', opts: ['orange', 'yellow', 'purple'], ans: 'yellow', exp: '"Yellow" = kuning.' },
  { q: '"Lingkaran" dalam bahasa Inggris?', opts: ['square', 'circle', 'triangle'], ans: 'circle', exp: '"Circle" = lingkaran.' },
  { q: '"The apple is ___." (apel merah)', opts: ['red', 'blue', 'green'], ans: 'red', exp: 'Apel merah → red.' },
  { q: '"Bintang" dalam bahasa Inggris?', opts: ['heart', 'circle', 'star'], ans: 'star', exp: '"Star" = bintang.' },
  { q: '"Hijau" dalam bahasa Inggris?', opts: ['green', 'grey', 'gold'], ans: 'green', exp: '"Green" = hijau.' },
  { q: '"Segitiga" dalam bahasa Inggris?', opts: ['rectangle', 'square', 'triangle'], ans: 'triangle', exp: '"Triangle" = segitiga.' },
  { q: 'Kalimat deskripsi yang benar?', opts: ['The ball red is.', 'The ball is red.', 'Red is the ball.'], ans: 'The ball is red.', exp: 'Pola: Subject + is + adjective (warna/sifat).' },
  { q: '"Merah muda" dalam bahasa Inggris?', opts: ['red', 'pink', 'light red'], ans: 'pink', exp: '"Pink" = merah muda.' },
  { q: '"Persegi panjang" dalam bahasa Inggris?', opts: ['square', 'rectangle', 'oval'], ans: 'rectangle', exp: '"Rectangle" = persegi panjang.' },
  { q: '"Coklat" dalam bahasa Inggris?', opts: ['brown', 'bronze', 'dark'], ans: 'brown', exp: '"Brown" = coklat.' },
  { q: '"Ungu" dalam bahasa Inggris?', opts: ['blue', 'pink', 'purple'], ans: 'purple', exp: '"Purple" = ungu.' },
  { q: '"Kotak" dalam bahasa Inggris?', opts: ['circle', 'triangle', 'square'], ans: 'square', exp: '"Square" = kotak.' },
  { q: '"Hitam" dalam bahasa Inggris?', opts: ['white', 'black', 'grey'], ans: 'black', exp: '"Black" = hitam.' },
  { q: '"The flag of Indonesia is red and ___."', opts: ['blue', 'white', 'green'], ans: 'white', exp: 'Bendera Indonesia: merah dan putih = red and white.' },
  { q: '"Oranye" dalam bahasa Inggris?', opts: ['red', 'orange', 'yellow'], ans: 'orange', exp: '"Orange" = oranye.' },
  { q: '"Hati" (bentuk) dalam bahasa Inggris?', opts: ['star', 'diamond', 'heart'], ans: 'heart', exp: '"Heart" = bentuk hati ❤️.' },
  { q: '"Putih" dalam bahasa Inggris?', opts: ['white', 'light', 'clear'], ans: 'white', exp: '"White" = putih.' },
  { q: '"The grass is ___." (rumput hijau)', opts: ['blue', 'white', 'green'], ans: 'green', exp: 'Rumput berwarna hijau = green.' },
];

const POSTCARD_FIELDS = [
  { id: 'greeting', label: 'Greeting', placeholder: 'e.g. Hi [nama]! / Dear [nama],', hint: 'Sapa penerimamu dulu.' },
  { id: 'place_desc', label: 'Describe the place (Ceritakan tempatnya)', placeholder: 'e.g. I am in Lombok. It is beautiful! The beach is blue and white.', multiline: true, hint: 'Deskripsikan tempat dengan warna dan bentuk (blue sky, white sand, green mountains).' },
  { id: 'closing', label: 'Closing', placeholder: 'e.g. Miss you! See you soon,', hint: 'Salam penutup' },
  { id: 'name', label: 'Your Name', placeholder: 'Namamu' },
  { id: 'to_name', label: 'To', placeholder: 'e.g. Budi Santoso' },
  { id: 'to_address', label: 'Address', placeholder: 'e.g. Jl. Veteran No. 3, Yogyakarta' },
  { id: 'to_city', label: 'City & Country', placeholder: 'e.g. Yogyakarta, Indonesia' },
];

const POSTCARD_EXAMPLE = {
  greeting: 'Hi Siti!',
  place_desc: 'I am in Lombok now. The beach is amazing! The sand is white and the sea is blue and green. The sky is clear and the sun is bright yellow. I see a big orange sunset every evening.',
  closing: 'Miss you lots!\nWarm wishes,',
  name: 'Rara',
  to_name: 'Siti Nurhaliza',
  to_address: 'Jl. Anggrek No. 7, Yogyakarta',
  to_city: 'Yogyakarta, 55221, Indonesia',
};

function WritingPractice() {
  const items = [
    { icon: '☀️', item: 'The sun', color: 'yellow', shape: 'round/circle' },
    { icon: '🌊', item: 'The sea', color: 'blue', shape: '—' },
    { icon: '🌿', item: 'The grass', color: 'green', shape: '—' },
    { icon: '⛰️', item: 'The mountain', color: 'grey / dark green', shape: 'triangle' },
    { icon: '🏖️', item: 'The sand', color: 'white / yellow', shape: '—' },
  ];

  return (
    <div className="space-y-8 max-w-xl mx-auto">
      <div>
        <div className="flex items-center gap-2 mb-3"><span className="text-xl">🖊️</span><h2 className="text-base font-extrabold text-slate-800">Tulis Kalimat Deskripsi</h2></div>
        <p className="text-sm text-slate-500 mb-4">Tulis deskripsi singkat setiap objek menggunakan warna dan bentuk yang tepat. Pola: <b>The [benda] is [warna/bentuk].</b></p>
        <div className="space-y-3">
          {items.map((item, i) => (
            <div key={i} className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 mb-2"><span className="text-2xl">{item.icon}</span><div><p className="text-sm font-bold text-slate-800">{item.item}</p><p className="text-xs text-slate-400">Warna: {item.color} {item.shape !== '—' ? `| Bentuk: ${item.shape}` : ''}</p></div></div>
              <input type="text" placeholder={`${item.item} is...`} className="w-full border-2 border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-amber-400" />
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3"><span className="text-xl">📮</span><h2 className="text-base font-extrabold text-slate-800">Kartu Pos dari Tempat Wisata</h2></div>
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 mb-4 text-sm text-amber-800">
          <p className="font-bold mb-1">🎯 Situasi:</p>
          <p>Kamu berlibur di pantai Lombok. Kirim kartu pos ke temanmu dan <b>deskripsikan warna dan keindahan tempat itu</b> dalam bahasa Inggris!</p>
        </div>
        <PostcardWriter title="Kartu Pos Liburan — Lombok 🏖️" stamp="🌊" to="Teman di rumah" fields={POSTCARD_FIELDS} example={POSTCARD_EXAMPLE} />
      </div>
    </div>
  );
}

const WritingLesson6: React.FC = () => {
  const navigate = useNavigate();
  const nextPath = '/modul/english/beginner/writing/lesson-7';
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedWritingLessons().includes(6));
  const [showModal, setShowModal] = React.useState(false);
  const [activeTab, setActiveTab] = useState<'learn' | 'menulis' | 'kuis'>('learn');
  const handleComplete = () => { markWritingComplete(6); setIsCompleted(true); setShowModal(true); };

  const colors = [{ en:'red',id:'merah',hex:'#EF4444'},{en:'blue',id:'biru',hex:'#3B82F6'},{en:'green',id:'hijau',hex:'#22C55E'},{en:'yellow',id:'kuning',hex:'#EAB308'},{en:'orange',id:'oranye',hex:'#F97316'},{en:'purple',id:'ungu',hex:'#A855F7'},{en:'black',id:'hitam',hex:'#1F2937'},{en:'white',id:'putih',hex:'#F3F4F6'},{en:'pink',id:'merah muda',hex:'#EC4899'},{en:'brown',id:'coklat',hex:'#92400E'}];
  const shapes = [{en:'circle',id:'lingkaran',icon:'⭕'},{en:'square',id:'kotak',icon:'⬜'},{en:'triangle',id:'segitiga',icon:'🔺'},{en:'rectangle',id:'persegi panjang',icon:'▬'},{en:'star',id:'bintang',icon:'⭐'},{en:'heart',id:'hati',icon:'❤️'}];

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)' }} onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg,#F39C12,#E67E22)' }}><span style={{ fontSize: 38 }}>🏆</span></div>
            <h2 className="text-xl font-extrabold mb-1">Lesson 6 Selesai! 🎉</h2>
            <p className="text-sm text-gray-500 mb-5">Kamu sudah bisa menulis deskripsi warna dan kartu pos wisata!</p>
            <div className="flex gap-3">
              <button onClick={() => { setShowModal(false); navigate(nextPath); }} className="flex-1 py-3 rounded-xl font-bold text-white" style={{ background: '#F39C12' }}>Lesson 7 ›</button>
              <button onClick={() => { setShowModal(false); navigate(-1); }} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700">Kembali</button>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col h-[100dvh] md:h-full bg-slate-50">
        <header className="flex-none bg-white/95 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100 shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg></button>
            <div className="text-center"><h1 className="text-sm font-bold text-slate-800">Warna, Bentuk & Deskripsi</h1><p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">Writing • Lesson 6</p></div>
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
                <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-5 text-white shadow-lg"><h2 className="text-lg font-extrabold mb-1">Warna & Bentuk dalam Deskripsi</h2><p className="text-sm text-amber-100">Gunakan warna dan bentuk untuk menulis kalimat deskriptif yang indah — sangat berguna untuk kartu pos liburan!</p></div>
                <div><h3 className="font-extrabold text-slate-800 mb-3 text-sm">🎨 Warna (Colors)</h3><div className="grid grid-cols-2 gap-2">{colors.map(c => (<div key={c.en} className="bg-white rounded-xl p-3 border border-slate-100 flex items-center gap-3 shadow-sm"><div className="w-8 h-8 rounded-lg shrink-0 border border-slate-200" style={{ backgroundColor: c.hex }} /><div><p className="text-sm font-bold text-slate-800">{c.en}</p><p className="text-xs text-slate-400">{c.id}</p></div></div>))}</div></div>
                <div><h3 className="font-extrabold text-slate-800 mb-3 text-sm">🔷 Bentuk (Shapes)</h3><div className="grid grid-cols-2 gap-2">{shapes.map(s => (<div key={s.en} className="bg-white rounded-xl p-3 border border-slate-100 flex items-center gap-3 shadow-sm"><span className="text-2xl">{s.icon}</span><div><p className="text-sm font-bold text-slate-800">{s.en}</p><p className="text-xs text-slate-400">{s.id}</p></div></div>))}</div></div>
                <div className="bg-green-50 border border-sky-100 rounded-2xl p-4"><h3 className="font-bold text-green-800 mb-2 text-sm">💡 Pola Deskripsi</h3><ul className="text-sm text-green-700 space-y-1"><li>✦ <b>The + benda + is + warna/bentuk.</b></li><li>✦ The sky is blue and clear.</li><li>✦ The sand is white and soft.</li><li>✦ The sun is bright yellow and round.</li></ul></div>
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

export default WritingLesson6;
