import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine, HotelForm } from './writingUtils';
import type { QuizItem, FormField } from './writingUtils';

const WRITING_STORAGE_KEY = 'talky_beginner_writing_completed';
function getCompletedWritingLessons(): number[] { try { return JSON.parse(localStorage.getItem(WRITING_STORAGE_KEY) || '[]'); } catch { return []; } }
function markWritingComplete(id: number) { const d = getCompletedWritingLessons(); if (!d.includes(id)) localStorage.setItem(WRITING_STORAGE_KEY, JSON.stringify([...d, id])); }

const QUIZ: QuizItem[] = [
  { q: '"Nasi" dalam bahasa Inggris?', opts: ['bread', 'rice', 'noodles'], ans: 'rice', exp: '"Rice" = nasi.' },
  { q: '"I like ___." (suka minum kopi)', opts: ['coffee', 'tea', 'milk'], ans: 'coffee', exp: '"Coffee" = kopi.' },
  { q: '"Saya tidak suka kopi." ditulis...', opts: ["I don't like coffee.", "I am not like coffee.", "I no like coffee."], ans: "I don't like coffee.", exp: '"I don\'t like" = saya tidak suka.' },
  { q: '"Susu" dalam bahasa Inggris?', opts: ['juice', 'soda', 'milk'], ans: 'milk', exp: '"Milk" = susu.' },
  { q: '"Saya suka makan ayam." ditulis...', opts: ['I like eat chicken.', 'I like eating chicken.', 'I like to eat chicken.'], ans: 'I like eating chicken.', exp: '"like + verb-ing" = suka melakukan sesuatu.' },
  { q: '"Buah" dalam bahasa Inggris?', opts: ['fruit', 'vegetable', 'plant'], ans: 'fruit', exp: '"Fruit" = buah.' },
  { q: '"Teh" dalam bahasa Inggris?', opts: ['coffee', 'tea', 'juice'], ans: 'tea', exp: '"Tea" = teh.' },
  { q: '"Telur" dalam bahasa Inggris?', opts: ['fish', 'meat', 'egg'], ans: 'egg', exp: '"Egg" = telur.' },
  { q: '"Do you like ___?" yang benar?', opts: ['drinking coffee?', 'drink coffee?', 'coffee?'], ans: 'coffee?', exp: '"Do you like + noun?" adalah pola yang benar.' },
  { q: '"Air" dalam bahasa Inggris?', opts: ['water', 'liquid', 'drink'], ans: 'water', exp: '"Water" = air.' },
  { q: '"Jawaban singkat \'ya\' untuk Do you like milk?"', opts: ['Yes, I like.', 'Yes, I do.', 'Yes, I am.'], ans: 'Yes, I do.', exp: '"Yes, I do." adalah jawaban pendek yang benar.' },
  { q: '"Roti" dalam bahasa Inggris?', opts: ['bread', 'cake', 'bun'], ans: 'bread', exp: '"Bread" = roti.' },
  { q: '"Ikan" dalam bahasa Inggris?', opts: ['chicken', 'beef', 'fish'], ans: 'fish', exp: '"Fish" = ikan.' },
  { q: '"Mie" dalam bahasa Inggris?', opts: ['pasta', 'noodles', 'spaghetti'], ans: 'noodles', exp: '"Noodles" = mie.' },
  { q: '"Kopi" dalam bahasa Inggris?', opts: ['tea', 'coffee', 'cocoa'], ans: 'coffee', exp: '"Coffee" = kopi.' },
  { q: '"I like ___." diikuti oleh...', opts: ['verb murni', 'noun atau verb+ing', 'adjective'], ans: 'noun atau verb+ing', exp: '"I like music" atau "I like eating."' },
  { q: '"Ayam" dalam bahasa Inggris?', opts: ['duck', 'chicken', 'beef'], ans: 'chicken', exp: '"Chicken" = ayam.' },
  { q: '"Sayuran" dalam bahasa Inggris?', opts: ['fruit', 'vegetables', 'spices'], ans: 'vegetables', exp: '"Vegetables" = sayuran.' },
  { q: '"Jus" dalam bahasa Inggris?', opts: ['juice', 'soda', 'smoothie'], ans: 'juice', exp: '"Juice" = jus.' },
  { q: '"Kalimat benar: Saya suka mie."', opts: ['I like noodles.', 'I likes noodle.', 'I am like noodles.'], ans: 'I like noodles.', exp: '"I like + noun." = pola yang benar.' },
];

/* ─── RESTAURANT ORDER FORM ─── */
const ORDER_FIELDS: FormField[] = [
  { id: 'name', label: 'Customer Name', placeholder: 'Your name', required: true },
  { id: 'table', label: 'Table Number', placeholder: 'e.g. Table 5', required: true },
  { id: 'food', label: 'Food Order (Makanan)', placeholder: 'e.g. fried rice, chicken soup', required: true, hint: 'Tulis makanan yang ingin dipesan dalam bahasa Inggris.' },
  { id: 'drink', label: 'Drink Order (Minuman)', placeholder: 'e.g. orange juice, water', required: true, hint: 'Tulis minuman yang ingin dipesan.' },
  { id: 'notes', label: 'Special Notes', placeholder: 'e.g. No chili please. / Extra sauce.', hint: 'Tulis permintaan khusus jika ada.' },
];

function WritingPractice() {
  const likes = ['rice', 'noodles', 'chicken', 'fish', 'vegetables', 'fruit', 'bread', 'egg'];
  const dislikes = ['spicy food', 'bitter food', 'very salty food', 'raw food'];
  const [liked, setLiked] = useState<string[]>([]);
  const [disliked, setDisliked] = useState<string[]>([]);

  const toggle = (arr: string[], setArr: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    setArr(prev => prev.includes(item) ? prev.filter(x => x !== item) : [...prev, item]);
  };

  return (
    <div className="space-y-8 max-w-xl mx-auto">
      {/* Food preference picker */}
      <div>
        <div className="flex items-center gap-2 mb-3"><span className="text-xl">❤️</span><h2 className="text-base font-extrabold text-slate-800">Pilih Makanan Favoritmu</h2></div>
        <p className="text-sm text-slate-500 mb-3">Pilih makanan yang kamu suka, lalu lihat kalimat yang terbentuk!</p>
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm mb-3">
          <p className="text-xs font-bold text-green-700 mb-2">Saya suka: (tap untuk memilih)</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {likes.map(f => (<button key={f} onClick={() => toggle(liked, setLiked, f)} className={`px-3 py-1.5 rounded-xl text-xs font-bold border-2 transition-all ${liked.includes(f) ? 'bg-green-100 border-sky-500 text-green-800' : 'border-slate-200 text-slate-600 hover:border-amber-400'}`}>{f}</button>))}
          </div>
          <p className="text-xs font-bold text-red-500 mb-2">Saya tidak suka:</p>
          <div className="flex flex-wrap gap-2">
            {dislikes.map(f => (<button key={f} onClick={() => toggle(disliked, setDisliked, f)} className={`px-3 py-1.5 rounded-xl text-xs font-bold border-2 transition-all ${disliked.includes(f) ? 'bg-red-100 border-red-400 text-red-700' : 'border-slate-200 text-slate-600 hover:border-red-300'}`}>{f}</button>))}
          </div>
        </div>
        {(liked.length > 0 || disliked.length > 0) && (
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
            <p className="text-xs font-bold text-amber-700 mb-2">📝 Kalimat yang terbentuk:</p>
            {liked.length > 0 && <p className="text-sm text-slate-700">I like <b>{liked.join(', ')}</b>.</p>}
            {disliked.length > 0 && <p className="text-sm text-slate-700 mt-1">I don't like <b>{disliked.join(', ')}</b>.</p>}
          </div>
        )}
      </div>

      {/* Restaurant order form */}
      <div>
        <div className="flex items-center gap-2 mb-3"><span className="text-xl">🍽️</span><h2 className="text-base font-extrabold text-slate-800">Formulir Pemesanan Restoran</h2></div>
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 mb-4 text-sm text-amber-800">
          <p className="font-bold mb-1">🎯 Situasi:</p>
          <p>Kamu di restoran di Singapura. Pelayannya tidak bicara bahasa Indonesia — isi formulir pesanan dalam bahasa Inggris!</p>
        </div>
        <HotelForm title="🍽️ Restaurant Order Form" subtitle="Please write your order in English" fields={ORDER_FIELDS} />
      </div>

      {/* Free write about food */}
      <div>
        <div className="flex items-center gap-2 mb-3"><span className="text-xl">✍️</span><h2 className="text-base font-extrabold text-slate-800">Tulis tentang Makanan Favoritmu</h2></div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500 mb-3">Tulis 3–4 kalimat tentang makanan dan minuman yang kamu suka/tidak suka.</p>
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 mb-3 text-xs text-amber-700">
            <p className="font-bold mb-1">💡 Panduan:</p>
            <p>• My favorite food is ___.</p>
            <p>• I like ___ because it is ___.</p>
            <p>• I don't like ___ because it is too ___.</p>
            <p>• My favorite drink is ___.</p>
          </div>
          <textarea rows={5} placeholder="My favorite food is..." className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400 resize-none" />
        </div>
      </div>
    </div>
  );
}

const WritingLesson7: React.FC = () => {
  const navigate = useNavigate();
  const nextPath = '/modul/english/beginner/writing/lesson-8';
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedWritingLessons().includes(7));
  const [showModal, setShowModal] = React.useState(false);
  const [activeTab, setActiveTab] = useState<'learn' | 'menulis' | 'kuis'>('learn');
  const handleComplete = () => { markWritingComplete(7); setIsCompleted(true); setShowModal(true); };

  const foods = [{en:'rice',id:'nasi',icon:'🍚'},{en:'bread',id:'roti',icon:'🍞'},{en:'egg',id:'telur',icon:'🥚'},{en:'chicken',id:'ayam',icon:'🍗'},{en:'fish',id:'ikan',icon:'🐟'},{en:'vegetables',id:'sayuran',icon:'🥦'},{en:'fruit',id:'buah',icon:'🍎'},{en:'noodles',id:'mie',icon:'🍜'}];
  const drinks = [{en:'water',id:'air',icon:'💧'},{en:'milk',id:'susu',icon:'🥛'},{en:'tea',id:'teh',icon:'🍵'},{en:'coffee',id:'kopi',icon:'☕'},{en:'juice',id:'jus',icon:'🧃'},{en:'soda',id:'soda',icon:'🥤'}];

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)' }} onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg,#F39C12,#E67E22)' }}><span style={{ fontSize: 38 }}>🏆</span></div>
            <h2 className="text-xl font-extrabold mb-1">Lesson 7 Selesai! 🎉</h2>
            <p className="text-sm text-gray-500 mb-5">Kamu sudah bisa memesan makanan dalam bahasa Inggris!</p>
            <div className="flex gap-3">
              <button onClick={() => { setShowModal(false); navigate(nextPath); }} className="flex-1 py-3 rounded-xl font-bold text-white" style={{ background: '#F39C12' }}>Lesson 8 ›</button>
              <button onClick={() => { setShowModal(false); navigate(-1); }} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700">Kembali</button>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col h-[100dvh] md:h-full bg-slate-50">
        <header className="flex-none bg-white/95 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100 shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg></button>
            <div className="text-center"><h1 className="text-sm font-bold text-slate-800">Makanan & Formulir Restoran</h1><p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">Writing • Lesson 7</p></div>
            <button onClick={() => navigate(nextPath)} className="px-3 h-9 rounded-full text-xs font-bold text-white" style={{ background: '#F39C12' }}>Next ›</button>
          </div>
        </header>
        <div className="flex bg-white border-b border-slate-100 sticky top-[65px] z-10 shadow-sm">
          {([['learn', '📖 Materi'], ['menulis', '✏️ Pesan Makanan'], ['kuis', '🎯 Kuis']] as const).map(([tab, label]) => (
            <button key={tab} onClick={() => setActiveTab(tab as typeof activeTab)} className={`flex-1 py-3 text-xs font-bold tracking-wide transition-all ${activeTab === tab ? 'text-amber-600 border-b-2 border-amber-500' : 'text-slate-400'}`}>{label as string}</button>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 pb-28 space-y-5">
            {activeTab === 'learn' && (
              <>
                <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-5 text-white shadow-lg"><h2 className="text-lg font-extrabold mb-1">Makanan, Minuman & Pemesanan</h2><p className="text-sm text-amber-100">Pelajari kosakata makanan & minuman, lalu praktikkan mengisi formulir restoran dalam bahasa Inggris!</p></div>
                <div><h3 className="font-extrabold text-slate-800 mb-3 text-sm">🍽️ Makanan (Food)</h3><div className="grid grid-cols-2 gap-2">{foods.map(f => (<div key={f.en} className="bg-white rounded-xl p-3 border border-slate-100 flex items-center gap-2.5 shadow-sm"><span className="text-2xl">{f.icon}</span><div><p className="text-sm font-bold text-slate-800">{f.en}</p><p className="text-xs text-slate-400">{f.id}</p></div></div>))}</div></div>
                <div><h3 className="font-extrabold text-slate-800 mb-3 text-sm">🥤 Minuman (Drinks)</h3><div className="grid grid-cols-2 gap-2">{drinks.map(d => (<div key={d.en} className="bg-white rounded-xl p-3 border border-slate-100 flex items-center gap-2.5 shadow-sm"><span className="text-2xl">{d.icon}</span><div><p className="text-sm font-bold text-slate-800">{d.en}</p><p className="text-xs text-slate-400">{d.id}</p></div></div>))}</div></div>
                <div className="bg-green-50 border border-sky-100 rounded-2xl p-4"><h3 className="font-bold text-green-800 mb-2 text-sm">💡 Pola Kalimat</h3><ul className="text-sm text-green-700 space-y-1"><li>✦ Suka: <b>I like + makanan/minuman.</b></li><li>✦ Tidak suka: <b>I don't like + makanan/minuman.</b></li><li>✦ Tanya: <b>Do you like + makanan/minuman?</b></li><li>✦ Pesan: <b>I would like + makanan, please.</b></li></ul></div>
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

export default WritingLesson7;
