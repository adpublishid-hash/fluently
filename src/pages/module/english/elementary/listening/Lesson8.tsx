import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine, DialoguePlayer, FillBlankExercise, getCompletedListeningLessons, markListeningComplete } from './listeningUtils';
import type { QuizItem, DialogueLine, BlankItem } from './listeningUtils';

const DIALOGUE: DialogueLine[] = [
  { speaker: 'Raj', text: 'Hey Emma! Are you going to the gym this weekend?', translation: 'Hei Emma! Apakah kamu mau ke gym akhir pekan ini?', avatar: '👨' },
  { speaker: 'Emma', text: 'Yes! I go every Saturday morning. I usually do a one-hour yoga class first.', translation: 'Ya! Saya pergi setiap Sabtu pagi. Saya biasanya ikut kelas yoga satu jam dulu.', avatar: '👩' },
  { speaker: 'Raj', text: 'That sounds relaxing. I prefer team sports. I play football with friends on Sunday afternoons.', translation: 'Kedengarannya menenangkan. Saya lebih suka olahraga tim. Saya bermain sepak bola dengan teman-teman Minggu sore.', avatar: '👨' },
  { speaker: 'Emma', text: 'How long have you been playing football?', translation: 'Sudah berapa lama kamu bermain sepak bola?', avatar: '👩' },
  { speaker: 'Raj', text: 'Since I was twelve. I also go swimming twice a week to stay fit.', translation: 'Sejak saya berumur dua belas tahun. Saya juga berenang dua kali seminggu untuk tetap bugar.', avatar: '👨' },
  { speaker: 'Emma', text: 'Wow, you\'re very active! Do you have any plans for next weekend?', translation: 'Wow, kamu sangat aktif! Apakah kamu punya rencana untuk akhir pekan depan?', avatar: '👩' },
  { speaker: 'Raj', text: 'Yes, our team has a friendly match on Saturday. Why don\'t you come and watch?', translation: 'Ya, tim kami punya pertandingan persahabatan Sabtu. Kenapa kamu tidak datang dan menonton?', avatar: '👨' },
  { speaker: 'Emma', text: 'I\'d love to! What time does it start? I\'ll bring some snacks for everyone.', translation: 'Saya mau! Jam berapa mulainya? Saya akan membawa camilan untuk semua orang.', avatar: '👩' },
];

const BLANKS: BlankItem[] = [
  { sentence: 'I usually do a one-hour yoga ___ first.', blank: 'class', opts: ['class', 'session', 'lesson', 'program'], hint: 'Kelas yoga = yoga ___' },
  { sentence: 'I prefer ___ sports like football.', blank: 'team', opts: ['team', 'group', 'friend', 'social'], hint: 'Olahraga yang dimainkan bersama tim = ___ sports' },
  { sentence: 'I\'ve been playing since I was ___.', blank: 'twelve', opts: ['twelve', 'ten', 'eight', 'sixteen'], hint: 'Berapa usia Raj mulai main bola?' },
  { sentence: 'I go swimming ___ a week to stay fit.', blank: 'twice', opts: ['twice', 'once', 'three times', 'every day'], hint: 'Dua kali seminggu = ___ a week' },
  { sentence: 'Our team has a ___ match on Saturday.', blank: 'friendly', opts: ['friendly', 'final', 'training', 'practice'], hint: 'Pertandingan tidak resmi = ___ match' },
];

const QUIZ: QuizItem[] = [
  { q: '"Are you going to the gym?" menggunakan...', opts: ['Present Simple', 'Future will', 'Present Continuous untuk rencana masa depan', 'Past Simple'], ans: 'Present Continuous untuk rencana masa depan', exp: '"Are you going...?" = Present Continuous bisa digunakan untuk rencana di masa depan.' },
  { q: '"I prefer team sports." artinya...', opts: ['Saya bermain olahraga tim.', 'Saya lebih suka olahraga tim.', 'Saya tidak suka olahraga tim.', 'Saya akan mencoba olahraga tim.'], ans: 'Saya lebih suka olahraga tim.', exp: '"Prefer" = lebih suka, lebih memilih.' },
  { q: '"Since I was twelve." artinya...', opts: ['Selama 12 tahun', 'Dalam 12 tahun', 'Saat saya berumur 12 tahun', 'Sejak saya berumur 12 tahun'], ans: 'Sejak saya berumur 12 tahun', exp: '"Since" = sejak (titik waktu di masa lalu sampai sekarang).' },
  { q: '"Twice a week" artinya...', opts: ['Sekali seminggu', 'Dua kali seminggu', 'Tiga kali seminggu', 'Setiap hari'], ans: 'Dua kali seminggu', exp: '"Twice" = dua kali. "Once" = sekali. "Three times" = tiga kali.' },
  { q: '"Stay fit" artinya...', opts: ['Tetap bugar/sehat', 'Berhenti olahraga', 'Tetap di gym', 'Kembali olahraga'], ans: 'Tetap bugar/sehat', exp: '"Fit" = bugar/sehat secara fisik. "Stay fit" = menjaga kebugaran.' },
  { q: '"A friendly match" artinya...', opts: ['Pertandingan final', 'Pertandingan persahabatan (tidak resmi)', 'Pertandingan latihan', 'Pertandingan resmi liga'], ans: 'Pertandingan persahabatan (tidak resmi)', exp: '"Friendly match" = pertandingan persahabatan yang tidak mempengaruhi peringkat.' },
  { q: '"Why don\'t you come and watch?" artinya...', opts: ['Kenapa kamu tidak datang menonton? (ajakan)', 'Apakah kamu akan menonton?', 'Mengapa kamu tidak menonton?', 'Bisakah kamu menonton?'], ans: 'Kenapa kamu tidak datang menonton? (ajakan)', exp: '"Why don\'t you...?" = cara ajakan yang umum (= Come and watch!).' },
  { q: '"I\'d love to!" artinya...', opts: ['Saya mungkin bisa.', 'Saya sangat mau!', 'Saya tidak tahu.', 'Saya tidak bisa.'], ans: 'Saya sangat mau!', exp: '"I\'d love to!" = "I would love to!" = saya sangat mau/ingin sekali.' },
  { q: '"I\'ll bring some snacks for everyone." menggunakan...', opts: ['Past Simple', 'Future will (keputusan spontan)', 'Future going to', 'Present Perfect'], ans: 'Future will (keputusan spontan)', exp: '"I\'ll" = "I will" untuk keputusan yang baru dibuat saat berbicara.' },
  { q: 'Emma pergi ke gym setiap...', opts: ['Minggu pagi', 'Setiap hari', 'Sabtu pagi', 'Jumat pagi'], ans: 'Sabtu pagi', exp: '"I go every Saturday morning."' },
  { q: '"How long have you been playing football?" ini adalah...', opts: ['Past Simple question', 'Future question', 'Present Perfect Continuous question', 'Present Simple question'], ans: 'Present Perfect Continuous question', exp: '"How long have you been...?" = pertanyaan Present Perfect Continuous untuk durasi.' },
  { q: '"Yoga class" pertama yang Emma ikut selama...', opts: ['60 menit (1 jam)', '45 menit', '30 menit', '90 menit'], ans: '60 menit (1 jam)', exp: '"One-hour yoga class" = kelas yoga satu jam.' },
  { q: '"Team sports" contohnya adalah...', opts: ['Yoga', 'Renang', 'Lari maraton', 'Sepak bola'], ans: 'Sepak bola', exp: '"Team sports" = olahraga yang dimainkan secara tim, contoh: sepak bola, basket.' },
  { q: '"You\'re very active!" artinya...', opts: ['Kamu sangat aktif/rajin olahraga.', 'Kamu terlalu aktif.', 'Kamu tidak cukup aktif.', 'Kamu sangat malas.'], ans: 'Kamu sangat aktif/rajin olahraga.', exp: '"Active" = aktif, banyak bergerak, rajin beraktivitas fisik.' },
  { q: 'Raj bermain sepak bola...', opts: ['Sabtu pagi', 'Sabtu sore', 'Minggu pagi', 'Minggu sore'], ans: 'Minggu sore', exp: '"I play football with friends on Sunday afternoons."' },
  { q: '"Snacks" artinya...', opts: ['Makanan besar', 'Minuman', 'Dessert', 'Camilan/makanan ringan'], ans: 'Camilan/makanan ringan', exp: '"Snacks" = makanan ringan/camilan yang dimakan di luar waktu makan utama.' },
  { q: '"Do you have any plans for next weekend?" artinya...', opts: ['Apa yang kamu lakukan kemarin?', 'Apa rencanamu minggu ini?', 'Apakah kamu punya rencana weekend depan?', 'Apakah kamu sibuk?'], ans: 'Apakah kamu punya rencana weekend depan?', exp: '"Next weekend" = akhir pekan depan.' },
  { q: 'Raj berenang...', opts: ['Sekali seminggu', 'Tiga kali seminggu', 'Setiap hari', 'Dua kali seminggu'], ans: 'Dua kali seminggu', exp: '"I go swimming twice a week."' },
  { q: '"I go swimming" vs "I swim" — perbedaannya...', opts: ['"I go swimming" lebih umum untuk hobi/kegiatan rutin', '"I go swimming" hanya untuk masa depan', '"I swim" lebih formal', 'Tidak ada perbedaan'], ans: '"I go swimming" lebih umum untuk hobi/kegiatan rutin', exp: '"Go + -ing" (go swimming, go hiking) umum untuk aktivitas/hobi yang dilakukan secara rutin.' },
  { q: '"That sounds relaxing." artinya...', opts: ['Itu kedengarannya membosankan.', 'Itu kedengarannya menenangkan.', 'Itu kedengarannya menegangkan.', 'Itu kedengarannya menyenangkan.'], ans: 'Itu kedengarannya menenangkan.', exp: '"Relaxing" = menenangkan, membuat rileks.' },
];

export default function ElemListeningLesson8() {
  const navigate = useNavigate();
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedListeningLessons().includes(8));
  const [showModal, setShowModal] = React.useState(false);
  const [activeTab, setActiveTab] = useState<'simak' | 'latihan' | 'kuis'>('simak');
  const handleComplete = () => { markListeningComplete(8); setIsCompleted(true); setShowModal(true); };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)' }} onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg,#4FA3D1,#1E6F9F)' }}><span style={{ fontSize: 38 }}>🏆</span></div>
            <h2 className="text-xl font-extrabold mb-1">Lesson 8 Selesai! 🎉</h2>
            <p className="text-sm text-gray-500 mb-5">Kamu bisa memahami percakapan tentang olahraga dan aktivitas rutin!</p>
            <div className="flex gap-3">
              <button onClick={() => { setShowModal(false); navigate('/modul/english/elementary/listening/lesson-9'); }} className="flex-1 py-3 rounded-xl font-bold text-white bg-teal-500">Lesson 9 ›</button>
              <button onClick={() => { setShowModal(false); navigate(-1); }} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700">Kembali</button>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col h-[100dvh] bg-slate-50">
        <header className="flex-none bg-white/95 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100 shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg></button>
            <div className="text-center"><h1 className="text-sm font-bold text-slate-800">Olahraga & Waktu Luang</h1><p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">Elementary Listening • L8</p></div>
            <button onClick={() => navigate('/modul/english/elementary/listening/lesson-9')} className="px-3 h-9 rounded-full text-xs font-bold text-white bg-teal-500">Next ›</button>
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
                  <h2 className="text-lg font-extrabold mb-1">⚽ Olahraga & Waktu Luang</h2>
                  <p className="text-sm text-teal-100">Pahami percakapan tentang rutinitas olahraga, hobi aktif, dan rencana kegiatan.</p>
                </div>
                <div className="bg-white rounded-2xl border border-sky-100 shadow-sm p-4">
                  <p className="text-xs font-extrabold text-teal-700 uppercase tracking-wide mb-3">📖 Kosakata Penting</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[{en:'Team sports',id:'Olahraga tim'},{en:'Twice a week',id:'Dua kali seminggu'},{en:'Stay fit',id:'Tetap bugar'},{en:'Friendly match',id:'Pertandingan persahabatan'},{en:'I\'d love to!',id:'Saya sangat mau!'},{en:'Go swimming/hiking',id:'Pergi berenang/mendaki'}].map(v => (<div key={v.en} className="bg-slate-50 rounded-xl px-3 py-2"><p className="text-xs font-extrabold text-slate-800">{v.en}</p><p className="text-xs text-teal-600">{v.id}</p></div>))}
                  </div>
                </div>
                <DialoguePlayer title="Percakapan: Rutinitas Olahraga & Rencana Weekend" lines={DIALOGUE} />
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
