import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine, DialoguePlayer, FillBlankExercise, getCompletedListeningLessons, markListeningComplete } from './listeningUtils';
import type { QuizItem, DialogueLine, BlankItem } from './listeningUtils';

const DIALOGUE: DialogueLine[] = [
  { speaker: 'Lisa', text: 'What time do you wake up every day?', translation: 'Jam berapa kamu bangun setiap hari?', avatar: '👩' },
  { speaker: 'Andi', text: 'I usually wake up at six o\'clock in the morning.', translation: 'Saya biasanya bangun jam enam pagi.', avatar: '👨' },
  { speaker: 'Lisa', text: 'That is early! What do you do after waking up?', translation: 'Itu cepat sekali! Apa yang kamu lakukan setelah bangun?', avatar: '👩' },
  { speaker: 'Andi', text: 'I brush my teeth, take a shower, and then have breakfast.', translation: 'Saya gosok gigi, mandi, lalu sarapan.', avatar: '👨' },
  { speaker: 'Lisa', text: 'What do you eat for breakfast?', translation: 'Apa yang kamu makan untuk sarapan?', avatar: '👩' },
  { speaker: 'Andi', text: 'I usually eat rice with egg and drink a cup of tea.', translation: 'Saya biasanya makan nasi dengan telur dan minum secangkir teh.', avatar: '👨' },
  { speaker: 'Lisa', text: 'What time do you go to work?', translation: 'Jam berapa kamu pergi bekerja?', avatar: '👩' },
  { speaker: 'Andi', text: 'I leave home at seven thirty and arrive at the office at eight o\'clock.', translation: 'Saya berangkat dari rumah jam setengah delapan dan tiba di kantor jam delapan.', avatar: '👨' },
];

const BLANKS: BlankItem[] = [
  { sentence: 'I wake ___ at 6 AM every day.', blank: 'up', opts: ['up', 'down', 'in', 'out'], hint: '"Bangun" = wake ___' },
  { sentence: 'She goes to work ___ bus.', blank: 'by', opts: ['by', 'in', 'on', 'with'], hint: 'Cara bepergian dengan kendaraan umum' },
  { sentence: 'He usually ___ breakfast at 7 AM.', blank: 'has', opts: ['has', 'takes', 'does', 'makes'], hint: 'Kata kerja yang tepat untuk "sarapan"' },
  { sentence: 'I brush my ___ before breakfast.', blank: 'teeth', opts: ['teeth', 'hair', 'hands', 'face'], hint: 'Sikat ___ (menyikat gigi)' },
  { sentence: 'She ___ home at 5 PM every day.', blank: 'leaves', opts: ['leaves', 'arrives', 'stays', 'goes'], hint: 'Berangkat dari rumah = ___ home' },
];

const QUIZ: QuizItem[] = [
  { q: '"I wake up at seven o\'clock." artinya...', opts: ['Saya bangun jam tuju.', 'Saya tidur jam tuju.', 'Saya makan jam tuju.', 'Saya pergi jam tuju.'], ans: 'Saya bangun jam tuju.', exp: '"Wake up" = bangun. "Seven o\'clock" = jam tujuh.' },
  { q: '"Usually" artinya...', opts: ['Selalu', 'Kadang-kadang', 'Tidak pernah', 'Biasanya'], ans: 'Biasanya', exp: '"Usually" = biasanya. Menunjukkan kebiasaan yang sering dilakukan.' },
  { q: '"Have breakfast" artinya...', opts: ['Memasak sarapan', 'Makan sarapan', 'Membeli sarapan', 'Melewatkan sarapan'], ans: 'Makan sarapan', exp: '"Have breakfast" = makan sarapan.' },
  { q: '"I go to school by bus." artinya...', opts: ['Saya pergi ke sekolah naik mobil.', 'Saya pergi ke sekolah naik bus.', 'Saya pergi ke sekolah jalan kaki.', 'Saya tidak ke sekolah.'], ans: 'Saya pergi ke sekolah naik bus.', exp: '"By bus" = naik bus. "Go to school" = pergi ke sekolah.' },
  { q: '"What time do you go to bed?" artinya...', opts: ['Jam berapa kamu bangun?', 'Jam berapa kamu pergi tidur?', 'Jam berapa kamu makan?', 'Jam berapa kamu pulang?'], ans: 'Jam berapa kamu pergi tidur?', exp: '"Go to bed" = pergi tidur. Pertanyaan tentang kapan seseorang tidur.' },
  { q: '"After work, I watch TV." artinya...', opts: ['Sebelum bekerja, saya nonton TV.', 'Saat bekerja, saya nonton TV.', 'Setelah bekerja, saya nonton TV.', 'Saya tidak suka nonton TV.'], ans: 'Setelah bekerja, saya nonton TV.', exp: '"After work" = setelah bekerja.' },
  { q: '"I take a shower in the morning." artinya...', opts: ['Saya mandi di pagi hari.', 'Saya cuci muka pagi hari.', 'Saya gosok gigi pagi hari.', 'Saya olahraga pagi hari.'], ans: 'Saya mandi di pagi hari.', exp: '"Take a shower" = mandi (dengan shower/pancuran).' },
  { q: '"Leave home" artinya...', opts: ['Tiba di rumah', 'Tinggal di rumah', 'Berangkat dari rumah', 'Membersihkan rumah'], ans: 'Berangkat dari rumah', exp: '"Leave home" = berangkat dari rumah / pergi dari rumah.' },
  { q: '"Brush teeth" artinya...', opts: ['Sikat rambut', 'Sikat gigi', 'Cuci tangan', 'Cuci muka'], ans: 'Sikat gigi', exp: '"Brush teeth" = menyikat gigi.' },
  { q: '"She exercises every morning." artinya...', opts: ['Dia makan setiap pagi.', 'Dia berolahraga setiap pagi.', 'Dia bekerja setiap pagi.', 'Dia belajar setiap pagi.'], ans: 'Dia berolahraga setiap pagi.', exp: '"Exercise" = berolahraga.' },
  { q: '"At half past seven" artinya...', opts: ['Jam tujuh tepat', 'Jam setengah tujuh (06:30)', 'Jam setengah delapan (07:30)', 'Jam tujuh lewat'], ans: 'Jam setengah delapan (07:30)', exp: '"Half past seven" = 7:30 (tujuh lewat tiga puluh).' },
  { q: '"I cook dinner at 6 PM." artinya...', opts: ['Saya makan malam jam 6 sore.', 'Saya memasak makan malam jam 6 sore.', 'Saya membeli makan malam jam 6 sore.', 'Saya cuci piring jam 6 sore.'], ans: 'Saya memasak makan malam jam 6 sore.', exp: '"Cook dinner" = memasak makan malam.' },
  { q: '"He walks to school." artinya...', opts: ['Dia naik bus ke sekolah.', 'Dia naik motor ke sekolah.', 'Dia jalan kaki ke sekolah.', 'Dia naik sepeda ke sekolah.'], ans: 'Dia jalan kaki ke sekolah.', exp: '"Walk to" = jalan kaki ke...' },
  { q: '"Routine" artinya...', opts: ['Kegiatan sesekali', 'Kegiatan baru', 'Kebiasaan/rutinitas', 'Kegiatan darurat'], ans: 'Kebiasaan/rutinitas', exp: '"Routine" = kebiasaan atau aktivitas yang dilakukan secara teratur.' },
  { q: '"I never eat fast food." artinya...', opts: ['Saya sering makan fast food.', 'Saya kadang makan fast food.', 'Saya tidak pernah makan fast food.', 'Saya selalu makan fast food.'], ans: 'Saya tidak pernah makan fast food.', exp: '"Never" = tidak pernah.' },
  { q: '"Sometimes" artinya...', opts: ['Selalu', 'Biasanya', 'Kadang-kadang', 'Tidak pernah'], ans: 'Kadang-kadang', exp: '"Sometimes" = kadang-kadang / sesekali.' },
  { q: '"I get dressed and go to work." artinya...', opts: ['Saya mandi dan pergi bekerja.', 'Saya berpakaian dan pergi bekerja.', 'Saya makan dan pergi bekerja.', 'Saya istirahat dan pergi bekerja.'], ans: 'Saya berpakaian dan pergi bekerja.', exp: '"Get dressed" = berpakaian / memakai baju.' },
  { q: '"At noon" artinya...', opts: ['Pagi hari', 'Siang hari / tengah hari', 'Sore hari', 'Malam hari'], ans: 'Siang hari / tengah hari', exp: '"Noon" = tengah hari (pukul 12:00 siang).' },
  { q: '"I always drink coffee in the morning." artinya...', opts: ['Saya kadang minum kopi pagi.', 'Saya tidak suka kopi pagi.', 'Saya selalu minum kopi di pagi hari.', 'Saya biasanya minum teh pagi.'], ans: 'Saya selalu minum kopi di pagi hari.', exp: '"Always" = selalu.' },
  { q: '"What do you do in your free time?" artinya...', opts: ['Apa pekerjaanmu?', 'Apa yang kamu lakukan di waktu senggang?', 'Kapan kamu bebas?', 'Di mana kamu menghabiskan waktu?'], ans: 'Apa yang kamu lakukan di waktu senggang?', exp: '"Free time" = waktu luang / waktu senggang.' },
];

const ListeningLesson5: React.FC = () => {
  const navigate = useNavigate();
  const nextPath = '/modul/english/beginner/listening/lesson-6';
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedListeningLessons().includes(5));
  const [showModal, setShowModal] = React.useState(false);
  const [activeTab, setActiveTab] = useState<'simak' | 'latihan' | 'kuis'>('simak');
  const handleComplete = () => { markListeningComplete(5); setIsCompleted(true); setShowModal(true); };

  const activities = [
    { time: '06:00', act: 'Wake up', id: 'Bangun tidur', icon: '⏰' },
    { time: '06:15', act: 'Brush teeth & shower', id: 'Sikat gigi & mandi', icon: '🚿' },
    { time: '07:00', act: 'Have breakfast', id: 'Sarapan', icon: '🍳' },
    { time: '07:30', act: 'Leave home', id: 'Berangkat dari rumah', icon: '🚶' },
    { time: '08:00', act: 'Arrive at work/school', id: 'Tiba di kantor/sekolah', icon: '🏢' },
    { time: '12:00', act: 'Have lunch', id: 'Makan siang', icon: '🍱' },
    { time: '17:00', act: 'Go home', id: 'Pulang ke rumah', icon: '🏠' },
    { time: '19:00', act: 'Have dinner', id: 'Makan malam', icon: '🍽️' },
    { time: '22:00', act: 'Go to bed', id: 'Tidur', icon: '😴' },
  ];

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)' }} onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg,#8E44AD,#6C3483)' }}><span style={{ fontSize: 38 }}>🏆</span></div>
            <h2 className="text-xl font-extrabold mb-1">Lesson 5 Selesai! 🎉</h2>
            <p className="text-sm text-gray-500 mb-5">Kamu sudah bisa memahami percakapan tentang rutinitas harian!</p>
            <div className="flex gap-3">
              <button onClick={() => { setShowModal(false); navigate(nextPath); }} className="flex-1 py-3 rounded-xl font-bold text-white bg-purple-500">Lesson 6 ›</button>
              <button onClick={() => { setShowModal(false); navigate(-1); }} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700">Kembali</button>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col h-[100dvh] md:h-full bg-slate-50">
        <header className="flex-none bg-white/95 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100 shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg></button>
            <div className="text-center"><h1 className="text-sm font-bold text-slate-800">Rutinitas Harian</h1><p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">Listening • Lesson 5</p></div>
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
                  <h2 className="text-lg font-extrabold mb-1">Rutinitas Harian</h2>
                  <p className="text-sm text-purple-100">Pelajari kosakata kegiatan sehari-hari dan cara memahami percakapan tentang rutinitas!</p>
                </div>
                <div className="bg-white rounded-2xl border border-purple-100 shadow-sm overflow-hidden">
                  <div className="bg-purple-50 px-4 py-2.5 border-b border-purple-100">
                    <p className="text-xs font-extrabold text-purple-700 uppercase tracking-wide">⏰ Jadwal Harian Khas</p>
                  </div>
                  <div className="divide-y divide-slate-50">
                    {activities.map(a => (
                      <div key={a.time} className="px-4 py-2.5 flex items-center gap-3">
                        <span className="text-xs font-extrabold text-purple-600 w-12 shrink-0">{a.time}</span>
                        <span className="text-xl">{a.icon}</span>
                        <div><p className="text-sm font-bold text-slate-800">{a.act}</p><p className="text-xs text-slate-400">{a.id}</p></div>
                      </div>
                    ))}
                  </div>
                </div>
                <DialoguePlayer title="Percakapan: Cerita Rutinitas" lines={DIALOGUE} />
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

export default ListeningLesson5;
