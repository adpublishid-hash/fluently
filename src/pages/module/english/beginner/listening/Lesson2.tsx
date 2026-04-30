import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine, DialoguePlayer, FillBlankExercise, getCompletedListeningLessons, markListeningComplete } from './listeningUtils';
import type { QuizItem, DialogueLine, BlankItem } from './listeningUtils';

const DIALOGUE: DialogueLine[] = [
  { speaker: 'Cashier', text: 'Hello! How can I help you?', translation: 'Halo! Ada yang bisa saya bantu?', avatar: '👩‍💼' },
  { speaker: 'Customer', text: 'Hi! What is the price of this shirt?', translation: 'Halo! Berapa harga kemeja ini?', avatar: '🧑' },
  { speaker: 'Cashier', text: 'It is one hundred and fifty thousand rupiah.', translation: 'Harganya seratus lima puluh ribu rupiah.', avatar: '👩‍💼' },
  { speaker: 'Customer', text: 'And how old are you? Just kidding! I mean, how many are left?', translation: 'Dan berapa umurmu? Bercanda! Maksudku, berapa yang tersisa?', avatar: '🧑' },
  { speaker: 'Cashier', text: 'Ha! We have five left in your size.', translation: 'Ha! Kami punya lima tersisa dalam ukuranmu.', avatar: '👩‍💼' },
  { speaker: 'Customer', text: 'Great! My phone number is 0812 three four five six. Can you call me for discounts?', translation: 'Bagus! Nomor teleponku 0812 tiga empat lima enam. Bisa hubungi saya untuk diskon?', avatar: '🧑' },
  { speaker: 'Cashier', text: 'Of course! Your birthday is also important. When were you born?', translation: 'Tentu saja! Tanggal lahirmu juga penting. Kapan kamu lahir?', avatar: '👩‍💼' },
  { speaker: 'Customer', text: 'I was born on the fifteenth of March, nineteen ninety-five.', translation: 'Saya lahir pada tanggal 15 Maret 1995.', avatar: '🧑' },
];

const BLANKS: BlankItem[] = [
  { sentence: 'I am ___ years old.', blank: 'twenty', opts: ['twenty', 'twelve', 'twelfth', 'two'], hint: '"20 tahun" dalam bahasa Inggris' },
  { sentence: 'The price is ___ dollars.', blank: 'fifty', opts: ['fifty', 'fifteen', 'five', 'fifth'], hint: 'Angka 50' },
  { sentence: 'She was born on the ___ of June.', blank: 'third', opts: ['three', 'third', 'thirty', 'thirteen'], hint: 'Tanggal ke-3 (ordinal number)' },
  { sentence: 'My phone number is ___ double two.', blank: 'one', opts: ['one', 'first', 'once', 'won'], hint: 'Angka 1 dalam urutan nomor telepon' },
  { sentence: 'The year ___ nine seen ninety.', blank: 'nineteen', opts: ['nine', 'ninety', 'nineteen', 'ninth'], hint: 'Angka 19 (dipakai dalam tahun 1900-an)' },
];

const QUIZ: QuizItem[] = [
  { q: 'Bagaimana mengucapkan "21" dalam bahasa Inggris?', opts: ['twenty-one', 'two-one', 'sixteen', 'twelve'], ans: 'twenty-one', exp: '21 = twenty-one. Angka 20 = twenty, +1 = twenty-one.' },
  { q: '"Fifteen" dalam angka adalah...', opts: ['50', '55', '15', '5'], ans: '15', exp: '15 = fifteen. Perhatikan "-teen" untuk angka 13-19.' },
  { q: 'Bagaimana mengucapkan tahun "2005"?', opts: ['two thousand five', 'twenty oh five', 'two thousand and five', 'Semua benar'], ans: 'Semua benar', exp: '2005 bisa diucapkan "two thousand five" atau "twenty oh five".' },
  { q: '"Thirty" dalam angka adalah...', opts: ['13', '3', '30', '300'], ans: '30', exp: '30 = thirty. Jangan bingung dengan "thirteen" (13).' },
  { q: 'Bagaimana mengucapkan tanggal "15th"?', opts: ['fifteen', 'fifteenth', 'fifth', 'fifties'], ans: 'fifteenth', exp: 'Tanggal ke-15 = "the fifteenth" (ordinal number).' },
  { q: '"One hundred" adalah...', opts: ['10', '100', '1000', '110'], ans: '100', exp: '100 = one hundred.' },
  { q: 'Berapa "forty-five"?', opts: ['54', '45', '415', '145'], ans: '45', exp: '45 = forty-five. Forty = 40, five = 5.' },
  { q: '"My birthday is on the third of July." artinya...', opts: ['3 Juni', '3 Juli', '13 Juli', '30 Juli'], ans: '3 Juli', exp: '"Third" = ke-3. "July" = Juli.' },
  { q: 'Bagaimana mengucapkan "1995"?', opts: ['one nine nine five', 'nineteen ninety-five', 'one thousand nine hundred ninety-five', 'Semua benar'], ans: 'Semua benar', exp: '1995 = "nineteen ninety-five" (paling umum) atau cara lain.' },
  { q: '"Seventy-two" adalah...', opts: ['27', '72', '7.2', '720'], ans: '72', exp: '72 = seventy-two. Seventy = 70, two = 2.' },
  { q: '"How old are you?" artinya...', opts: ['Kamu dari mana?', 'Berapa umurmu?', 'Apa pekerjaanmu?', 'Kapan kamu lahir?'], ans: 'Berapa umurmu?', exp: '"How old are you?" = Berapa umurmu?' },
  { q: '"I am twenty-three years old." artinya...', opts: ['Saya berumur 32 tahun.', 'Saya berumur 23 tahun.', 'Saya berumur 2-3 tahun.', 'Saya lahir tahun 23.'], ans: 'Saya berumur 23 tahun.', exp: '"Twenty-three" = 23.' },
  { q: '"First, Second, Third" adalah...', opts: ['Angka biasa', 'Angka ordinal (urutan)', 'Angka waktu', 'Angka harga'], ans: 'Angka ordinal (urutan)', exp: 'Ordinal numbers digunakan untuk urutan: 1st, 2nd, 3rd, 4th...' },
  { q: 'Bagaimana mengucapkan "$12.50"?', opts: ['twelve fifty', 'twelve point five', 'twelve dollars fifty cents', 'Semua cara di atas'], ans: 'Semua cara di atas', exp: '$12.50 bisa diucapkan "twelve fifty", "twelve dollars fifty cents", dll.' },
  { q: '"Eleven" adalah angka...', opts: ['10', '11', '12', '111'], ans: '11', exp: '11 = eleven. Perhatikan: eleven dan twelve tidak mengikuti pola -teen.' },
  { q: '"The price is two hundred thousand rupiah." artinya...', opts: ['Rp 20.000', 'Rp 200.000', 'Rp 2.000.000', 'Rp 2.000'], ans: 'Rp 200.000', exp: '"Two hundred thousand" = 200.000.' },
  { q: 'Bagaimana mengucapkan nomor telepon "0812"?', opts: ['oh eight one two', 'zero eight twelve', 'eight twelve', 'Semua benar'], ans: 'Semua benar', exp: 'Nomor telepon biasanya dibaca digit per digit. "0" bisa diucapkan "oh" atau "zero".' },
  { q: '"Eighth" adalah...', opts: ['Ke-18', 'Ke-8', 'Ke-80', 'Angka 8'], ans: 'Ke-8', exp: '"Eighth" = ke-8 (ordinal dari eight/8).' },
  { q: 'Angka "1000" dalam bahasa Inggris adalah...', opts: ['one hundred', 'one thousand', 'ten hundred', 'a million'], ans: 'one thousand', exp: '1000 = one thousand.' },
  { q: '"Date of birth: 07/04/2000" dibaca...', opts: ['seventh of April two thousand', 'seventh April two thousand', 'April seventh two thousand', 'Semua cara benar'], ans: 'Semua cara benar', exp: 'Tanggal dapat diucapkan dalam berbagai cara yang semua benar.' },
];

const ListeningLesson2: React.FC = () => {
  const navigate = useNavigate();
  const nextPath = '/modul/english/beginner/listening/lesson-3';
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedListeningLessons().includes(2));
  const [showModal, setShowModal] = React.useState(false);
  const [activeTab, setActiveTab] = useState<'simak' | 'latihan' | 'kuis'>('simak');
  const handleComplete = () => { markListeningComplete(2); setIsCompleted(true); setShowModal(true); };

  const numbers = [
    { n: '1–10', items: ['one','two','three','four','five','six','seven','eight','nine','ten'] },
    { n: '11–20', items: ['eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen','twenty'] },
    { n: 'Puluhan', items: ['twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety','one hundred'] },
    { n: 'Ordinal', items: ['first','second','third','fourth','fifth','sixth','seventh','eighth','ninth','tenth'] },
  ];

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)' }} onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg,#8E44AD,#6C3483)' }}><span style={{ fontSize: 38 }}>🏆</span></div>
            <h2 className="text-xl font-extrabold mb-1">Lesson 2 Selesai! 🎉</h2>
            <p className="text-sm text-gray-500 mb-5">Kamu sudah bisa mendengar dan memahami angka serta tanggal!</p>
            <div className="flex gap-3">
              <button onClick={() => { setShowModal(false); navigate(nextPath); }} className="flex-1 py-3 rounded-xl font-bold text-white bg-purple-500">Lesson 3 ›</button>
              <button onClick={() => { setShowModal(false); navigate(-1); }} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700">Kembali</button>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col h-[100dvh] md:h-full bg-slate-50">
        <header className="flex-none bg-white/95 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100 shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg></button>
            <div className="text-center"><h1 className="text-sm font-bold text-slate-800">Angka & Tanggal</h1><p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">Listening • Lesson 2</p></div>
            <button onClick={() => navigate(nextPath)} className="px-3 h-9 rounded-full text-xs font-bold text-white bg-purple-500">Next ›</button>
          </div>
        </header>
        <div className="flex bg-white border-b border-slate-100 sticky top-[65px] z-10 shadow-sm">
          {(['simak', 'latihan', 'kuis'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-3 text-xs font-bold tracking-wide transition-all ${activeTab === tab ? 'text-purple-600 border-b-2 border-purple-500' : 'text-slate-400'}`}>
              {tab === 'simak' ? '🎧 Simak' : tab === 'latihan' ? '✏️ Latihan' : '🎯 Kuis'}
            </button>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 pb-28 space-y-5">
            {activeTab === 'simak' && (
              <>
                <div className="bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl p-5 text-white shadow-lg">
                  <h2 className="text-lg font-extrabold mb-1">Angka & Tanggal</h2>
                  <p className="text-sm text-purple-100">Pelajari cara mendengar dan memahami angka, umur, harga, nomor telepon, dan tanggal!</p>
                </div>
                {numbers.map(group => (
                  <div key={group.n} className="bg-white rounded-2xl border border-purple-100 shadow-sm overflow-hidden">
                    <div className="bg-purple-50 px-4 py-2.5 border-b border-purple-100">
                      <p className="text-xs font-extrabold text-purple-700 uppercase tracking-wide">🔢 {group.n}</p>
                    </div>
                    <div className="p-4 flex flex-wrap gap-2">
                      {group.items.map(w => (<span key={w} className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold px-3 py-1.5 rounded-xl">{w}</span>))}
                    </div>
                  </div>
                ))}
                <DialoguePlayer title="Percakapan: Di Toko — Harga & Angka" lines={DIALOGUE} />
              </>
            )}
            {activeTab === 'latihan' && <FillBlankExercise items={BLANKS} />}
            {activeTab === 'kuis' && <QuizEngine items={QUIZ} onComplete={handleComplete} />}
          </div>
        </div>
        <div className="sticky bottom-0 z-30 bg-white/90 backdrop-blur-xl border-t border-gray-100 px-4 py-3">
          <button onClick={isCompleted ? () => navigate(-1) : handleComplete} className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg active:scale-[0.98]" style={{ background: isCompleted ? 'linear-gradient(135deg,#4FA3D1,#1E6F9F)' : 'linear-gradient(135deg,#8E44AD,#6C3483)' }}>
            {isCompleted ? '✅ Sudah Selesai' : '✅ Tandai Selesai'}
          </button>
        </div>
      </div>
    </>
  );
};

export default ListeningLesson2;
