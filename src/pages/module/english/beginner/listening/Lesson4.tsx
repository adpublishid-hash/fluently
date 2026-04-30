import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine, DialoguePlayer, FillBlankExercise, getCompletedListeningLessons, markListeningComplete } from './listeningUtils';
import type { QuizItem, DialogueLine, BlankItem } from './listeningUtils';

const DIALOGUE: DialogueLine[] = [
  { speaker: 'Tom', text: 'Wow, your house is beautiful! How many rooms does it have?', translation: 'Wow, rumahmu indah! Berapa kamar yang dimilikinya?', avatar: '👦' },
  { speaker: 'Nina', text: 'Thank you! It has three bedrooms, two bathrooms, a kitchen, and a living room.', translation: 'Terima kasih! Ada tiga kamar tidur, dua kamar mandi, dapur, dan ruang tamu.', avatar: '👩' },
  { speaker: 'Tom', text: 'Do you have a garden?', translation: 'Apakah kamu punya taman?', avatar: '👦' },
  { speaker: 'Nina', text: 'Yes! There is a small garden in the front of the house. I love it!', translation: 'Ya! Ada taman kecil di depan rumah. Aku suka!', avatar: '👩' },
  { speaker: 'Tom', text: 'What is in the living room?', translation: 'Apa yang ada di ruang tamu?', avatar: '👦' },
  { speaker: 'Nina', text: 'There is a sofa, a television, a coffee table, and a bookshelf.', translation: 'Ada sofa, televisi, meja kopi, dan rak buku.', avatar: '👩' },
  { speaker: 'Tom', text: 'Where is your bedroom?', translation: 'Di mana kamar tidurmu?', avatar: '👦' },
  { speaker: 'Nina', text: 'My bedroom is upstairs, next to the bathroom.', translation: 'Kamar tidurku di lantai atas, di sebelah kamar mandi.', avatar: '👩' },
];

const BLANKS: BlankItem[] = [
  { sentence: 'I sleep in my ___.', blank: 'bedroom', opts: ['bedroom', 'bathroom', 'kitchen', 'garage'], hint: 'Kamar untuk tidur' },
  { sentence: 'We cook food in the ___.', blank: 'kitchen', opts: ['kitchen', 'bedroom', 'garden', 'garage'], hint: 'Ruangan untuk memasak' },
  { sentence: 'The sofa is in the ___ room.', blank: 'living', opts: ['living', 'dining', 'bed', 'bath'], hint: 'Ruangan untuk berkumpul bersama keluarga' },
  { sentence: 'My house has two ___ for cars.', blank: 'garages', opts: ['garages', 'bathrooms', 'kitchens', 'bedrooms'], hint: 'Tempat menyimpan mobil' },
  { sentence: 'Turn off the lights when you leave the ___.', blank: 'room', opts: ['room', 'roof', 'road', 'door'], hint: 'Ruangan secara umum' },
];

const QUIZ: QuizItem[] = [
  { q: '"Bedroom" artinya...', opts: ['Kamar mandi', 'Ruang tamu', 'Kamar tidur', 'Dapur'], ans: 'Kamar tidur', exp: '"Bedroom" = kamar tidur. "Bed" = tempat tidur.' },
  { q: '"Kitchen" artinya...', opts: ['Dapur', 'Kamar mandi', 'Ruang makan', 'Taman'], ans: 'Dapur', exp: '"Kitchen" = dapur, tempat memasak.' },
  { q: '"There is a sofa in the living room." artinya...', opts: ['Sofa ada di kamar tidur.', 'Sofa ada di dapur.', 'Sofa ada di ruang tamu.', 'Sofa ada di taman.'], ans: 'Sofa ada di ruang tamu.', exp: '"Living room" = ruang tamu / ruang keluarga.' },
  { q: '"Upstairs" artinya...', opts: ['Di lantai bawah', 'Di lantai atas', 'Di luar rumah', 'Di dalam rumah'], ans: 'Di lantai atas', exp: '"Upstairs" = di lantai atas. "Downstairs" = di lantai bawah.' },
  { q: '"Bathroom" artinya...', opts: ['Kamar tidur', 'Kamar mandi', 'Ruang tamu', 'Taman'], ans: 'Kamar mandi', exp: '"Bathroom" = kamar mandi / toilet.' },
  { q: '"Where is your bedroom?" artinya...', opts: ['Berapa kamar tidurmu?', 'Di mana kamar tidurmu?', 'Apa yang ada di kamar tidurmu?', 'Siapa yang tidur di sini?'], ans: 'Di mana kamar tidurmu?', exp: '"Where is?" = di mana? (menanyakan lokasi).' },
  { q: '"Garden" artinya...', opts: ['Garasi', 'Taman', 'Dapur', 'Gudang'], ans: 'Taman', exp: '"Garden" = taman / kebun.' },
  { q: '"Next to" artinya...', opts: ['Di atas', 'Di bawah', 'Di sebelah', 'Di depan'], ans: 'Di sebelah', exp: '"Next to" = di sebelah / berdampingan.' },
  { q: '"Bookshelf" artinya...', opts: ['Lemari baju', 'Rak sepatu', 'Rak buku', 'Meja belajar'], ans: 'Rak buku', exp: '"Bookshelf" = rak buku. "Book" = buku, "shelf" = rak.' },
  { q: '"My house has three floors." artinya...', opts: ['Rumahku punya tiga kamar.', 'Rumahku punya tiga lantai.', 'Rumahku punya tiga jendela.', 'Rumahku punya tiga pintu.'], ans: 'Rumahku punya tiga lantai.', exp: '"Floor" = lantai. "Three floors" = tiga lantai.' },
  { q: '"In front of" artinya...', opts: ['Di belakang', 'Di samping', 'Di depan', 'Di dalam'], ans: 'Di depan', exp: '"In front of" = di depan.' },
  { q: '"Television / TV" ada di...', opts: ['Kamar mandi', 'Dapur', 'Garasi', 'Ruang tamu / kamar tidur'], ans: 'Ruang tamu / kamar tidur', exp: 'TV biasanya ada di ruang tamu atau kamar tidur.' },
  { q: '"Dining room" artinya...', opts: ['Ruang tamu', 'Ruang makan', 'Ruang bermain', 'Ruang belajar'], ans: 'Ruang makan', exp: '"Dining room" = ruang makan.' },
  { q: '"Behind" artinya...', opts: ['Di depan', 'Di samping', 'Di belakang', 'Di dalam'], ans: 'Di belakang', exp: '"Behind" = di belakang.' },
  { q: '"The cat is under the table." artinya...', opts: ['Kucing ada di atas meja.', 'Kucing ada di bawah meja.', 'Kucing ada di samping meja.', 'Kucing ada di dalam meja.'], ans: 'Kucing ada di bawah meja.', exp: '"Under" = di bawah.' },
  { q: '"Garage" artinya...', opts: ['Taman', 'Garasi', 'Gudang', 'Pagar'], ans: 'Garasi', exp: '"Garage" = garasi (tempat menyimpan kendaraan).' },
  { q: '"There are two windows in my room." artinya...', opts: ['Ada dua pintu di kamarku.', 'Ada dua jendela di kamarku.', 'Ada dua lemari di kamarku.', 'Ada dua lampu di kamarku.'], ans: 'Ada dua jendela di kamarku.', exp: '"Window" = jendela.' },
  { q: '"On the left" artinya...', opts: ['Di sebelah kanan', 'Di sebelah kiri', 'Di tengah', 'Di sudut'], ans: 'Di sebelah kiri', exp: '"On the left" = di sebelah kiri. "On the right" = di sebelah kanan.' },
  { q: '"Ceiling" artinya...', opts: ['Dinding', 'Lantai', 'Plafon / langit-langit', 'Atap'], ans: 'Plafon / langit-langit', exp: '"Ceiling" = langit-langit / plafon (bagian atas ruangan).' },
  { q: '"My bedroom is next to the bathroom." artinya...', opts: ['Kamar tidurku di atas kamar mandi.', 'Kamar tidurku di sebelah kamar mandi.', 'Kamar tidurku di bawah kamar mandi.', 'Kamar tidurku jauh dari kamar mandi.'], ans: 'Kamar tidurku di sebelah kamar mandi.', exp: '"Next to" = di sebelah / bersebelahan.' },
];

const ListeningLesson4: React.FC = () => {
  const navigate = useNavigate();
  const nextPath = '/modul/english/beginner/listening/lesson-5';
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedListeningLessons().includes(4));
  const [showModal, setShowModal] = React.useState(false);
  const [activeTab, setActiveTab] = useState<'simak' | 'latihan' | 'kuis'>('simak');
  const handleComplete = () => { markListeningComplete(4); setIsCompleted(true); setShowModal(true); };

  const rooms = [
    { en: 'Living Room', id: 'Ruang Tamu', icon: '🛋️' }, { en: 'Bedroom', id: 'Kamar Tidur', icon: '🛏️' },
    { en: 'Kitchen', id: 'Dapur', icon: '🍳' }, { en: 'Bathroom', id: 'Kamar Mandi', icon: '🚿' },
    { en: 'Dining Room', id: 'Ruang Makan', icon: '🍽️' }, { en: 'Garden', id: 'Taman', icon: '🌿' },
    { en: 'Garage', id: 'Garasi', icon: '🚗' }, { en: 'Balcony', id: 'Balkon', icon: '🌅' },
  ];

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)' }} onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg,#8E44AD,#6C3483)' }}><span style={{ fontSize: 38 }}>🏆</span></div>
            <h2 className="text-xl font-extrabold mb-1">Lesson 4 Selesai! 🎉</h2>
            <p className="text-sm text-gray-500 mb-5">Kamu sudah bisa memahami percakapan tentang rumah!</p>
            <div className="flex gap-3">
              <button onClick={() => { setShowModal(false); navigate(nextPath); }} className="flex-1 py-3 rounded-xl font-bold text-white bg-purple-500">Lesson 5 ›</button>
              <button onClick={() => { setShowModal(false); navigate(-1); }} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700">Kembali</button>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col h-[100dvh] md:h-full bg-slate-50">
        <header className="flex-none bg-white/95 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100 shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg></button>
            <div className="text-center"><h1 className="text-sm font-bold text-slate-800">Di Rumah</h1><p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">Listening • Lesson 4</p></div>
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
                  <h2 className="text-lg font-extrabold mb-1">Di Rumah</h2>
                  <p className="text-sm text-purple-100">Pelajari nama-nama ruangan dan perabot serta cara memahami percakapan tentang rumah!</p>
                </div>
                <div className="bg-white rounded-2xl border border-purple-100 shadow-sm p-4">
                  <p className="text-xs font-extrabold text-purple-700 uppercase tracking-wide mb-3">🏠 Ruangan dalam Rumah</p>
                  <div className="grid grid-cols-2 gap-2">
                    {rooms.map(r => (
                      <div key={r.en} className="bg-slate-50 rounded-xl px-3 py-2.5 flex items-center gap-2">
                        <span className="text-xl">{r.icon}</span>
                        <div><p className="text-xs font-extrabold text-slate-800">{r.en}</p><p className="text-xs text-purple-600">{r.id}</p></div>
                      </div>
                    ))}
                  </div>
                </div>
                <DialoguePlayer title="Percakapan: Tur Rumah" lines={DIALOGUE} />
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

export default ListeningLesson4;
