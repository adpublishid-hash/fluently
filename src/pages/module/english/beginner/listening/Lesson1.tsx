import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine, DialoguePlayer, FillBlankExercise, WordMatchExercise, getCompletedListeningLessons, markListeningComplete } from './listeningUtils';
import type { QuizItem, DialogueLine, BlankItem, WordPair } from './listeningUtils';

const DIALOGUE: DialogueLine[] = [
  { speaker: 'Maya', text: 'Hello! My name is Maya. What is your name?', translation: 'Halo! Nama saya Maya. Siapa namamu?', avatar: '👩' },
  { speaker: 'Budi', text: 'Hi Maya! My name is Budi. Nice to meet you!', translation: 'Hai Maya! Nama saya Budi. Senang bertemu denganmu!', avatar: '👨' },
  { speaker: 'Maya', text: 'Nice to meet you too, Budi. How are you?', translation: 'Senang bertemu denganmu juga, Budi. Apa kabar?', avatar: '👩' },
  { speaker: 'Budi', text: 'I am fine, thank you. And you?', translation: 'Saya baik-baik saja, terima kasih. Dan kamu?', avatar: '👨' },
  { speaker: 'Maya', text: 'I am great! Where are you from, Budi?', translation: 'Saya sangat baik! Kamu dari mana, Budi?', avatar: '👩' },
  { speaker: 'Budi', text: 'I am from Surabaya. And you?', translation: 'Saya dari Surabaya. Dan kamu?', avatar: '👨' },
  { speaker: 'Maya', text: 'I am from Jakarta. It is nice to meet you!', translation: 'Saya dari Jakarta. Senang sekali bertemu denganmu!', avatar: '👩' },
  { speaker: 'Budi', text: 'You too! See you later, Maya!', translation: 'Kamu juga! Sampai jumpa lagi, Maya!', avatar: '👨' },
];

const BLANKS: BlankItem[] = [
  { sentence: 'Hello! My ___ is Maya.', blank: 'name', opts: ['name', 'age', 'job', 'city'], hint: 'Diucapkan saat memperkenalkan diri' },
  { sentence: 'Nice to ___ you!', blank: 'meet', opts: ['meet', 'see', 'call', 'know'], hint: 'Ungkapan saat pertama kali berkenalan' },
  { sentence: 'I am ___, thank you.', blank: 'fine', opts: ['fine', 'sad', 'tired', 'sick'], hint: 'Jawaban positif untuk "How are you?"' },
  { sentence: 'Where are you ___?', blank: 'from', opts: ['from', 'to', 'at', 'in'], hint: 'Menanyakan asal seseorang' },
  { sentence: 'See you ___, Maya!', blank: 'later', opts: ['later', 'soon', 'now', 'here'], hint: 'Perpisahan informal' },
];

const WORD_PAIRS: WordPair[] = [
  { word: 'Hello', meaning: 'Halo / Hai' },
  { word: 'My name is', meaning: 'Nama saya adalah' },
  { word: 'Nice to meet you', meaning: 'Senang bertemu denganmu' },
  { word: 'How are you?', meaning: 'Apa kabar?' },
  { word: 'I am fine', meaning: 'Saya baik-baik saja' },
  { word: 'Where are you from?', meaning: 'Kamu dari mana?' },
];

const QUIZ: QuizItem[] = [
  { q: '"Hello!" paling tepat dibalas dengan...', opts: ['Thank you!', 'Sorry!', 'Hello! / Hi!', 'Goodbye!'], ans: 'Hello! / Hi!', exp: '"Hello" dibalas dengan "Hello" atau "Hi" — sapaan balik.' },
  { q: '"What is your name?" artinya...', opts: ['Siapa namamu?', 'Apa kabarmu?', 'Berapa umurmu?', 'Dari mana kamu?'], ans: 'Siapa namamu?', exp: '"What is your name?" = Siapa namamu?' },
  { q: 'Jika seseorang berkata "Nice to meet you!", kamu membalas...', opts: ['See you!', 'I am fine!', 'Thank you, bye!', 'Nice to meet you too!'], ans: 'Nice to meet you too!', exp: '"Nice to meet you" dibalas "Nice to meet you too!" = Senang bertemu denganmu juga!' },
  { q: '"How are you?" artinya...', opts: ['Dari mana kamu?', 'Apa pekerjaanmu?', 'Siapa kamu?', 'Apa kabar?'], ans: 'Apa kabar?', exp: '"How are you?" = Apa kabar? / Bagaimana keadaanmu?' },
  { q: '"I am fine, thank you." artinya...', opts: ['Aku lelah, terima kasih.', 'Aku baik-baik saja, terima kasih.', 'Aku sakit, terima kasih.', 'Aku sibuk, terima kasih.'], ans: 'Aku baik-baik saja, terima kasih.', exp: '"Fine" = baik-baik saja.' },
  { q: '"Where are you from?" artinya...', opts: ['Kamu mau ke mana?', 'Kapan kamu tiba?', 'Kamu dari mana?', 'Di mana kamu?'], ans: 'Kamu dari mana?', exp: '"Where are you from?" = Kamu berasal dari mana?' },
  { q: '"I am from Jakarta." artinya...', opts: ['Saya tinggal di Jakarta.', 'Saya suka Jakarta.', 'Saya berasal dari Jakarta.', 'Saya pergi ke Jakarta.'], ans: 'Saya berasal dari Jakarta.', exp: '"I am from + kota/negara" = Saya berasal dari...' },
  { q: '"See you later!" artinya...', opts: ['Maaf!', 'Halo!', 'Terima kasih!', 'Sampai jumpa lagi!'], ans: 'Sampai jumpa lagi!', exp: '"See you later" = Sampai jumpa lagi!' },
  { q: 'Sapaan informal kepada teman adalah...', opts: ['Good morning, Sir.', 'Hi! / Hey!', 'Good afternoon, Madam.', 'Excuse me.'], ans: 'Hi! / Hey!', exp: '"Hi" atau "Hey" adalah sapaan informal yang santai.' },
  { q: '"Good morning!" digunakan pada waktu...', opts: ['Malam hari', 'Pagi hari', 'Siang hari', 'Sore hari'], ans: 'Pagi hari', exp: '"Good morning" = selamat pagi (digunakan di pagi hari).' },
  { q: '"Good evening!" digunakan pada waktu...', opts: ['Sore/malam hari', 'Siang hari', 'Pagi hari', 'Tengah malam'], ans: 'Sore/malam hari', exp: '"Good evening" = selamat sore/malam (mulai sekitar pukul 18.00).' },
  { q: '"Goodbye!" artinya...', opts: ['Halo!', 'Selamat datang!', 'Selamat tinggal!', 'Apa kabar?'], ans: 'Selamat tinggal!', exp: '"Goodbye" = selamat tinggal / sampai jumpa.' },
  { q: 'Cara formal memperkenalkan diri adalah...', opts: ['Hey, I\'m Budi!', 'Call me Budi!', 'Yo! Budi here!', 'My name is Budi. Nice to meet you.'], ans: 'My name is Budi. Nice to meet you.', exp: '"My name is..." + "Nice to meet you" adalah cara formal memperkenalkan diri.' },
  { q: '"And you?" dalam percakapan "How are you?" artinya...', opts: ['Di mana kamu?', 'Kenapa kamu?', 'Dan kamu?', 'Siapa kamu?'], ans: 'Dan kamu?', exp: '"And you?" = Dan kamu? (mengembalikan pertanyaan yang sama).' },
  { q: '"I am great!" artinya...', opts: ['Saya sangat baik!', 'Saya lelah.', 'Saya baik-baik saja.', 'Saya tidak baik.'], ans: 'Saya sangat baik!', exp: '"Great" = sangat baik / luar biasa.' },
  { q: 'Jika seseorang berkata "Thank you!", kamu membalas...', opts: ['You\'re welcome!', 'Goodbye!', 'Sorry!', 'Hello!'], ans: 'You\'re welcome!', exp: '"Thank you" dibalas "You\'re welcome" = sama-sama / terima kasih kembali.' },
  { q: '"Excuse me." digunakan untuk...', opts: ['Perpisahan', 'Menarik perhatian / permisi', 'Sapaan', 'Terima kasih'], ans: 'Menarik perhatian / permisi', exp: '"Excuse me" = permisi / maaf (untuk menarik perhatian orang atau minta jalan).' },
  { q: '"My name is" artinya...', opts: ['Nama saya adalah', 'Nama lengkap', 'Nama panggilan', 'Nama teman saya'], ans: 'Nama saya adalah', exp: '"My name is..." = Nama saya adalah...' },
  { q: '"Good night!" digunakan saat...', opts: ['Bertemu di siang hari', 'Berpisah di pagi hari', 'Bertemu di pagi hari', 'Berpisah di malam hari'], ans: 'Berpisah di malam hari', exp: '"Good night" digunakan saat berpisah di malam hari atau sebelum tidur.' },
  { q: '"I am from Indonesia." — kata "from" artinya...', opts: ['dari', 'di', 'dengan', 'ke'], ans: 'dari', exp: '"From" = dari. "I am from Indonesia" = Saya dari Indonesia.' },
];

const ListeningLesson1: React.FC = () => {
  const navigate = useNavigate();
  const nextPath = '/modul/english/beginner/listening/lesson-2';
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedListeningLessons().includes(1));
  const [showModal, setShowModal] = React.useState(false);
  const [activeTab, setActiveTab] = useState<'simak' | 'latihan' | 'kuis'>('simak');
  const handleComplete = () => { markListeningComplete(1); setIsCompleted(true); setShowModal(true); };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)' }} onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg,#8E44AD,#6C3483)' }}><span style={{ fontSize: 38 }}>🏆</span></div>
            <h2 className="text-xl font-extrabold mb-1">Lesson 1 Selesai! 🎉</h2>
            <p className="text-sm text-gray-500 mb-5">Kamu sudah bisa mendengar dan memahami salam & perkenalan dasar!</p>
            <div className="flex gap-3">
              <button onClick={() => { setShowModal(false); navigate(nextPath); }} className="flex-1 py-3 rounded-xl font-bold text-white bg-purple-500">Lesson 2 ›</button>
              <button onClick={() => { setShowModal(false); navigate(-1); }} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700">Kembali</button>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col h-[100dvh] md:h-full bg-slate-50">
        <header className="flex-none bg-white/95 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100 shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg></button>
            <div className="text-center"><h1 className="text-sm font-bold text-slate-800">Salam & Perkenalan</h1><p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">Listening • Lesson 1</p></div>
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
                  <h2 className="text-lg font-extrabold mb-1">Salam & Perkenalan</h2>
                  <p className="text-sm text-purple-100">Ikuti percakapan di bawah dengan membaca perlahan. Bayangkan kamu mendengarnya langsung!</p>
                </div>
                <div className="bg-purple-50 border border-purple-100 rounded-2xl p-4">
                  <p className="text-xs font-bold text-purple-700 mb-2">📌 Ungkapan Kunci</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { en: 'Hello / Hi', id: 'Halo / Hai' }, { en: 'My name is', id: 'Nama saya' },
                      { en: 'How are you?', id: 'Apa kabar?' }, { en: 'I am fine', id: 'Saya baik' },
                      { en: 'Nice to meet you', id: 'Senang bertemu' }, { en: 'See you later', id: 'Sampai jumpa' },
                    ].map(p => (<div key={p.en} className="bg-white rounded-xl px-3 py-2"><p className="text-xs font-extrabold text-purple-800">{p.en}</p><p className="text-xs text-slate-500">{p.id}</p></div>))}
                  </div>
                </div>
                <DialoguePlayer title="Percakapan: Perkenalan Pertama" lines={DIALOGUE} />
                <WordMatchExercise pairs={WORD_PAIRS} />
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

export default ListeningLesson1;
