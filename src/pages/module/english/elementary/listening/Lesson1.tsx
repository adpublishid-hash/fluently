import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine, DialoguePlayer, FillBlankExercise, getCompletedListeningLessons, markListeningComplete } from './listeningUtils';
import type { QuizItem, DialogueLine, BlankItem } from './listeningUtils';

const DIALOGUE: DialogueLine[] = [
  { speaker: 'Lisa', text: 'Hi! I\'m Lisa. I work as a graphic designer and I really enjoy my job.', translation: 'Hai! Saya Lisa. Saya bekerja sebagai desainer grafis dan sangat menikmati pekerjaan saya.', avatar: '👩' },
  { speaker: 'Tom', text: 'That sounds great! My name is Tom. I\'m a teacher. What do you do in your free time?', translation: 'Kedengarannya bagus! Nama saya Tom. Saya seorang guru. Apa yang kamu lakukan di waktu luang?', avatar: '👨' },
  { speaker: 'Lisa', text: 'I love painting and hiking. I usually go hiking every weekend. Do you have any hobbies?', translation: 'Saya suka melukis dan mendaki. Saya biasanya mendaki setiap akhir pekan. Kamu punya hobi?', avatar: '👩' },
  { speaker: 'Tom', text: 'Yes, I play the guitar and I enjoy cooking. I also like reading books about history.', translation: 'Ya, saya bermain gitar dan suka memasak. Saya juga suka membaca buku tentang sejarah.', avatar: '👨' },
  { speaker: 'Lisa', text: 'Interesting! How long have you been playing the guitar?', translation: 'Menarik! Sudah berapa lama kamu bermain gitar?', avatar: '👩' },
  { speaker: 'Tom', text: 'For about five years now. I started when I was in university. Are you interested in music?', translation: 'Sekitar lima tahun sekarang. Saya mulai saat di universitas. Apakah kamu tertarik dengan musik?', avatar: '👨' },
  { speaker: 'Lisa', text: 'Definitely! I listen to jazz and classical music when I paint. It really helps me focus.', translation: 'Tentu saja! Saya mendengarkan jazz dan musik klasik saat melukis. Itu benar-benar membantu saya fokus.', avatar: '👩' },
  { speaker: 'Tom', text: 'That\'s wonderful. We should meet up sometime and share our interests!', translation: 'Itu luar biasa. Kita harus bertemu suatu saat dan berbagi minat kita!', avatar: '👨' },
];

const BLANKS: BlankItem[] = [
  { sentence: 'She works as a graphic ___ and loves her job.', blank: 'designer', opts: ['designer', 'developer', 'doctor', 'driver'], hint: 'Desainer grafis = graphic ___' },
  { sentence: 'He has been playing the guitar ___ five years.', blank: 'for', opts: ['for', 'since', 'during', 'from'], hint: 'Durasi waktu: sudah ___ 5 tahun' },
  { sentence: 'She listens to music when she ___.', blank: 'paints', opts: ['paints', 'cooks', 'reads', 'sleeps'], hint: 'Apa yang dia lakukan saat mendengarkan musik?' },
  { sentence: 'What do you do in your ___ time?', blank: 'free', opts: ['free', 'spare', 'own', 'break'], hint: 'Waktu luang = ___ time' },
  { sentence: 'I really ___ cooking and reading books.', blank: 'enjoy', opts: ['enjoy', 'love', 'like', 'prefer'], hint: '"Menikmati" dalam bahasa Inggris formal' },
];

const QUIZ: QuizItem[] = [
  { q: '"I work as a graphic designer." — pekerjaannya adalah...', opts: ['Guru', 'Desainer grafis', 'Dokter', 'Insinyur'], ans: 'Desainer grafis', exp: '"Graphic designer" = desainer grafis.' },
  { q: '"What do you do in your free time?" artinya...', opts: ['Kapan kamu bebas?', 'Apa pekerjaanmu?', 'Apa yang kamu lakukan saat luang?', 'Berapa lama waktu luangmu?'], ans: 'Apa yang kamu lakukan saat luang?', exp: '"Free time" = waktu luang. "What do you do?" = apa yang kamu lakukan?' },
  { q: '"I\'ve been playing for five years." — sudah berapa lama?', opts: ['4 tahun', '5 tahun', '2 tahun', '3 tahun'], ans: '5 tahun', exp: '"For five years" = selama 5 tahun.' },
  { q: '"I enjoy cooking." menggunakan struktur...', opts: ['enjoy + to cook', 'enjoy + cook', 'enjoy + cooking', 'enjoy + cooked'], ans: 'enjoy + cooking', exp: 'Setelah "enjoy" selalu gunakan kata kerja bentuk -ing.' },
  { q: '"I started when I was in university." artinya...', opts: ['Saya berhenti saat di universitas.', 'Saya mulai saat di sekolah.', 'Saya mulai saat di universitas.', 'Saya akan mulai di universitas.'], ans: 'Saya mulai saat di universitas.', exp: '"When I was in university" = saat saya masih di universitas.' },
  { q: 'Hobi Lisa adalah...', opts: ['Memasak dan membaca', 'Melukis dan mendaki', 'Membaca dan mendaki', 'Bermain gitar dan memasak'], ans: 'Melukis dan mendaki', exp: 'Lisa menyebutkan "painting and hiking" sebagai hobinya.' },
  { q: '"It really helps me focus." artinya...', opts: ['Itu membuatku lelah.', 'Itu tidak membantuku.', 'Itu membuatku bersemangat.', 'Itu benar-benar membantuku fokus.'], ans: 'Itu benar-benar membantuku fokus.', exp: '"Help someone focus" = membantu seseorang untuk fokus.' },
  { q: '"How long have you been...?" digunakan untuk...', opts: ['Menanyakan durasi aktivitas yang masih berlangsung', 'Menanyakan harga', 'Menanyakan lokasi', 'Menanyakan waktu di masa depan'], ans: 'Menanyakan durasi aktivitas yang masih berlangsung', exp: '"How long have you been...?" = Present Perfect Continuous untuk durasi.' },
  { q: '"I usually go hiking every weekend." kata "usually" artinya...', opts: ['Jarang', 'Selalu', 'Biasanya / umumnya', 'Kadang-kadang'], ans: 'Biasanya / umumnya', exp: '"Usually" = biasanya (frequency adverb ~70-80% of the time).' },
  { q: '"Are you interested in music?" cara menjawab ya...', opts: ['Yes, I like.', 'Yes, music.', 'Yes, I do.', 'Yes, I am.'], ans: 'Yes, I am.', exp: 'Pertanyaan "Are you...?" dijawab dengan "Yes, I am." atau "No, I\'m not."' },
  { q: '"Graphic designer" artinya...', opts: ['Desainer grafis', 'Perancang busana', 'Animator', 'Fotografer'], ans: 'Desainer grafis', exp: '"Graphic designer" = desainer grafis, membuat visual/logo/layout.' },
  { q: '"We should meet up sometime." artinya...', opts: ['Kita seharusnya bertemu suatu saat.', 'Kita seharusnya bertemu sekarang.', 'Kita tidak bisa bertemu.', 'Kita sudah bertemu.'], ans: 'Kita seharusnya bertemu suatu saat.', exp: '"Should" + "sometime" = saran untuk masa depan yang tidak spesifik.' },
  { q: '"I listen to jazz when I paint." — kapan dia mendengarkan jazz?', opts: ['Saat bermain gitar', 'Saat melukis', 'Saat membaca', 'Saat memasak'], ans: 'Saat melukis', exp: '"When I paint" = ketika/saat saya melukis.' },
  { q: 'Kata kerja mana yang TIDAK lihat diikuti -ing setelah "enjoy"?', opts: ['cooking', 'to swim', 'hiking', 'reading'], ans: 'to swim', exp: 'Setelah "enjoy" harus -ing, bukan "to + infinitive".' },
  { q: '"That sounds great!" artinya...', opts: ['Itu kedengarannya bagus!', 'Itu sangat mahal!', 'Itu terdengar buruk!', 'Itu kelihatan bagus!'], ans: 'Itu kedengarannya bagus!', exp: '"That sounds great" = kedengarannya bagus! (ekspresi antusias).' },
  { q: '"Share our interests" artinya...', opts: ['Membeli minat kita', 'Berbagi / mendiskusikan minat kita', 'Menjual minat kita', 'Menyembunyikan minat kita'], ans: 'Berbagi / mendiskusikan minat kita', exp: '"Share interests" = berbagi/membicarakan minat yang sama.' },
  { q: '"I\'m a teacher." Tom adalah...', opts: ['Guru', 'Pedagang', 'Insinyur', 'Dokter'], ans: 'Guru', exp: '"Teacher" = guru.' },
  { q: '"I started when I was in university." — tense yang digunakan adalah...', opts: ['Past Simple', 'Present Perfect', 'Present Simple', 'Future Simple'], ans: 'Past Simple', exp: '"I started" = Past Simple, menceritakan kejadian di masa lalu.' },
  { q: '"Definitely!" artinya...', opts: ['Mungkin', 'Tentu saja / pasti', 'Tidak sama sekali', 'Biasa saja'], ans: 'Tentu saja / pasti', exp: '"Definitely!" = tentu saja! (ekspresi persetujuan kuat).' },
  { q: 'Tom suka membaca buku tentang...', opts: ['Seni', 'Sejarah', 'Sains', 'Memasak'], ans: 'Sejarah', exp: 'Tom menyebutkan "books about history" = buku tentang sejarah.' },
];

export default function ElemListeningLesson1() {
  const navigate = useNavigate();
  const nextPath = '/modul/english/elementary/listening/lesson-2';
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedListeningLessons().includes(1));
  const [showModal, setShowModal] = React.useState(false);
  const [activeTab, setActiveTab] = useState<'simak' | 'latihan' | 'kuis'>('simak');
  const handleComplete = () => { markListeningComplete(1); setIsCompleted(true); setShowModal(true); };

  const vocab = [
    { en: 'Graphic designer', id: 'Desainer grafis' }, { en: 'Hobby / Hobbies', id: 'Hobi' },
    { en: 'Free time', id: 'Waktu luang' }, { en: 'I enjoy + -ing', id: 'Saya menikmati...' },
    { en: 'How long have you been...?', id: 'Sudah berapa lama kamu...?' }, { en: 'Definitely!', id: 'Tentu saja!' },
  ];

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)' }} onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg,#4FA3D1,#1E6F9F)' }}><span style={{ fontSize: 38 }}>🏆</span></div>
            <h2 className="text-xl font-extrabold mb-1">Lesson 1 Selesai! 🎉</h2>
            <p className="text-sm text-gray-500 mb-5">Kamu bisa memahami percakapan tentang hobi dan informasi personal!</p>
            <div className="flex gap-3">
              <button onClick={() => { setShowModal(false); navigate(nextPath); }} className="flex-1 py-3 rounded-xl font-bold text-white bg-teal-500">Lesson 2 ›</button>
              <button onClick={() => { setShowModal(false); navigate(-1); }} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700">Kembali</button>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col h-[100dvh] bg-slate-50">
        <header className="flex-none bg-white/95 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100 shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg></button>
            <div className="text-center"><h1 className="text-sm font-bold text-slate-800">Tentang Dirimu</h1><p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">Elementary Listening • L1</p></div>
            <button onClick={() => navigate(nextPath)} className="px-3 h-9 rounded-full text-xs font-bold text-white bg-teal-500">Next ›</button>
          </div>
        </header>
        <div className="flex bg-white border-b border-slate-100 sticky top-[65px] z-10">
          {(['simak', 'latihan', 'kuis'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-3 text-xs font-bold tracking-wide transition-all ${activeTab === tab ? 'text-teal-600 border-b-2 border-sky-500' : 'text-slate-400'}`}>
              {tab === 'simak' ? '🎧 Simak' : tab === 'latihan' ? '✏️ Latihan' : '🎯 Kuis'}
            </button>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 pb-28 space-y-5">
            {activeTab === 'simak' && (
              <>
                <div className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl p-5 text-white shadow-lg">
                  <h2 className="text-lg font-extrabold mb-1">🙋 Tentang Dirimu</h2>
                  <p className="text-sm text-teal-100">Pelajari cara mendeskripsikan diri sendiri — pekerjaan, hobi, dan minat — dalam percakapan A2!</p>
                </div>
                <div className="bg-white rounded-2xl border border-sky-100 shadow-sm p-4">
                  <p className="text-xs font-extrabold text-teal-700 uppercase tracking-wide mb-3">📖 Kosakata & Ekspresi Penting</p>
                  <div className="grid grid-cols-2 gap-2">
                    {vocab.map(v => (<div key={v.en} className="bg-slate-50 rounded-xl px-3 py-2"><p className="text-xs font-extrabold text-slate-800">{v.en}</p><p className="text-xs text-teal-600">{v.id}</p></div>))}
                  </div>
                </div>
                <DialoguePlayer title="Percakapan: Lisa & Tom — Hobi & Minat" lines={DIALOGUE} />
              </>
            )}
            {activeTab === 'latihan' && <FillBlankExercise items={BLANKS} />}
            {activeTab === 'kuis' && <QuizEngine items={QUIZ} onComplete={handleComplete} />}
          </div>
        </div>
        <div className="sticky bottom-0 z-30 bg-white/90 backdrop-blur-xl border-t border-gray-100 px-4 py-3">
          <button onClick={isCompleted ? () => navigate(-1) : handleComplete} className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg active:scale-[0.98]" style={{ background: isCompleted ? 'linear-gradient(135deg,#4FA3D1,#1E6F9F)' : 'linear-gradient(135deg,#4FA3D1,#1E6F9F)' }}>
            {isCompleted ? '✅ Sudah Selesai' : '✅ Tandai Selesai'}
          </button>
        </div>
      </div>
    </>
  );
}
