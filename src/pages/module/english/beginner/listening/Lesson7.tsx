import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine, DialoguePlayer, FillBlankExercise, getCompletedListeningLessons, markListeningComplete } from './listeningUtils';
import type { QuizItem, DialogueLine, BlankItem } from './listeningUtils';

const DIALOGUE: DialogueLine[] = [
  { speaker: 'Tourist', text: 'Excuse me! I am lost. Can you help me?', translation: 'Permisi! Saya tersesat. Bisakah kamu membantu saya?', avatar: '🧳' },
  { speaker: 'Local', text: 'Of course! Where do you want to go?', translation: 'Tentu saja! Kamu mau ke mana?', avatar: '🧑' },
  { speaker: 'Tourist', text: 'I am looking for the post office. Is it far from here?', translation: 'Saya mencari kantor pos. Apakah itu jauh dari sini?', avatar: '🧳' },
  { speaker: 'Local', text: 'No, it is not far. Go straight ahead for two blocks.', translation: 'Tidak, tidak jauh. Jalan lurus dua blok.', avatar: '🧑' },
  { speaker: 'Tourist', text: 'And then?', translation: 'Dan kemudian?', avatar: '🧳' },
  { speaker: 'Local', text: 'Then turn left at the traffic light. The post office is on your right side.', translation: 'Kemudian belok kiri di lampu merah. Kantor pos ada di sebelah kananmu.', avatar: '🧑' },
  { speaker: 'Tourist', text: 'Thank you so much! How long does it take to walk there?', translation: 'Terima kasih banyak! Berapa lama jalan kaki ke sana?', avatar: '🧳' },
  { speaker: 'Local', text: 'About five minutes. You are welcome! Have a nice day!', translation: 'Sekitar lima menit. Sama-sama! Semoga harimu menyenangkan!', avatar: '🧑' },
];

const BLANKS: BlankItem[] = [
  { sentence: 'Go ___ ahead for two blocks.', blank: 'straight', opts: ['straight', 'right', 'left', 'fast'], hint: 'Jalan lurus = go ___ ahead' },
  { sentence: 'Turn ___ at the traffic light.', blank: 'left', opts: ['left', 'right', 'up', 'down'], hint: 'Belok kiri = turn ___' },
  { sentence: 'Excuse me, I am ___.', blank: 'lost', opts: ['lost', 'tired', 'hungry', 'late'], hint: 'Tersesat = ___' },
  { sentence: 'The bank is ___ to the supermarket.', blank: 'next', opts: ['next', 'near', 'close', 'beside'], hint: 'Di sebelah = ___ to' },
  { sentence: 'How ___ does it take to get there?', blank: 'long', opts: ['long', 'far', 'much', 'many'], hint: 'Berapa lama = how ___' },
];

const QUIZ: QuizItem[] = [
  { q: '"Excuse me, where is the bank?" artinya...', opts: ['Permisi, apakah kamu pergi ke bank?', 'Permisi, di mana banknya?', 'Permisi, apakah ada bank?', 'Permisi, saya mencari bank.'], ans: 'Permisi, di mana banknya?', exp: '"Where is...?" = di mana...? Diawali "excuse me" = permisi.' },
  { q: '"Go straight ahead." artinya...', opts: ['Belok kiri.', 'Jalan lurus ke depan.', 'Berhenti di sini.', 'Belok kanan.'], ans: 'Jalan lurus ke depan.', exp: '"Go straight ahead" = jalan lurus ke depan.' },
  { q: '"Turn right at the corner." artinya...', opts: ['Belok kiri di sudut.', 'Belok kanan di sudut.', 'Lurus di sudut.', 'Berhenti di sudut.'], ans: 'Belok kanan di sudut.', exp: '"Turn right" = belok kanan. "At the corner" = di sudut jalan.' },
  { q: '"It is not far from here." artinya...', opts: ['Itu cukup jauh dari sini.', 'Itu tidak jauh dari sini.', 'Itu di sini.', 'Itu sangat jauh dari sini.'], ans: 'Itu tidak jauh dari sini.', exp: '"Not far" = tidak jauh.' },
  { q: '"How long does it take?" artinya...', opts: ['Seberapa jauh?', 'Berapa lama?', 'Seberapa besar?', 'Berapa harganya?'], ans: 'Berapa lama?', exp: '"How long does it take?" = berapa lama waktu yang dibutuhkan?' },
  { q: '"I am looking for the hospital." artinya...', opts: ['Saya pergi ke rumah sakit.', 'Saya bekerja di rumah sakit.', 'Saya suka rumah sakit.', 'Saya mencari rumah sakit.'], ans: 'Saya mencari rumah sakit.', exp: '"I am looking for..." = saya sedang mencari...' },
  { q: '"Next to" artinya...', opts: ['Di depan', 'Di sebelah', 'Di atas', 'Di belakang'], ans: 'Di sebelah', exp: '"Next to" = di sebelah / berdampingan.' },
  { q: '"The pharmacy is opposite the park." artinya...', opts: ['Apotek ada di sebelah taman.', 'Apotek ada di seberang taman.', 'Apotek ada di belakang taman.', 'Apotek ada di dalam taman.'], ans: 'Apotek ada di seberang taman.', exp: '"Opposite" = di seberang (berhadapan langsung).' },
  { q: '"Take the second street on the left." artinya...', opts: ['Ambil jalan pertama di kiri.', 'Ambil jalan kedua di kanan.', 'Ambil jalan ketiga di kiri.', 'Ambil jalan kedua di kiri.'], ans: 'Ambil jalan kedua di kiri.', exp: '"Second street" = jalan kedua. "On the left" = di sebelah kiri.' },
  { q: '"About ten minutes on foot." artinya...', opts: ['Persis 10 menit.', 'Lebih dari 10 menit.', 'Sekitar 10 menit dengan bus.', 'Sekitar 10 menit jalan kaki.'], ans: 'Sekitar 10 menit jalan kaki.', exp: '"On foot" = jalan kaki. "About" = sekitar / kira-kira.' },
  { q: '"Can you show me on the map?" artinya...', opts: ['Bisakah kamu tunjukkan di petanya?', 'Bisakah kamu mencari di peta?', 'Bisakah kamu membelikan peta?', 'Bisakah kamu gambarkan petanya?'], ans: 'Bisakah kamu tunjukkan di petanya?', exp: '"Show me" = tunjukkan/perlihatkan kepada saya.' },
  { q: '"You cannot miss it!" artinya...', opts: ['Kamu harus berbelok di sana.', 'Kamu akan melihatnya nanti.', 'Kamu tidak boleh melewatinya.', 'Kamu pasti tidak akan terlewat/terlewatkan.'], ans: 'Kamu pasti tidak akan terlewat/terlewatkan.', exp: '"You cannot miss it" = kamu tidak mungkin terlewatkan (sangat mudah ditemukan).' },
  { q: '"Walk past the school." artinya...', opts: ['Lewati sekolah.', 'Belok di sekolah.', 'Masuk ke sekolah.', 'Berhenti di sekolah.'], ans: 'Lewati sekolah.', exp: '"Walk past" = lewati / jalan melewati.' },
  { q: '"It is on your right-hand side." artinya...', opts: ['Ada di sisi kirimu.', 'Ada di depanmu.', 'Ada di belakangmu.', 'Ada di sisi kananmu.'], ans: 'Ada di sisi kananmu.', exp: '"Right-hand side" = sisi kanan.' },
  { q: '"Between the bank and the school" artinya...', opts: ['Di depan sekolah.', 'Di belakang bank dan sekolah.', 'Di sebelah bank.', 'Di antara bank dan sekolah.'], ans: 'Di antara bank dan sekolah.', exp: '"Between A and B" = di antara A dan B.' },
  { q: '"Is there a ATM near here?" artinya...', opts: ['Saya mencari ATM.', 'Berapa jauh ATM-nya?', 'Di mana ATM-nya?', 'Apakah ada ATM di dekat sini?'], ans: 'Apakah ada ATM di dekat sini?', exp: '"Is there a...near here?" = apakah ada... di dekat sini?' },
  { q: '"I am lost." artinya...', opts: ['Saya lapar.', 'Saya terlambat.', 'Saya tersesat.', 'Saya lelah.'], ans: 'Saya tersesat.', exp: '"I am lost" = saya tersesat / tidak tahu arah.' },
  { q: '"At the traffic light" artinya...', opts: ['Di persimpangan jalan', 'Di lampu jalan', 'Di jalan raya', 'Di lampu lalu lintas'], ans: 'Di lampu lalu lintas', exp: '"Traffic light" = lampu lalu lintas.' },
  { q: '"Keep walking until you see the bridge." artinya...', opts: ['Berhenti di jembatan.', 'Belok di jembatan.', 'Terus jalan hingga kamu melihat jembatan.', 'Cari jembatan.'], ans: 'Terus jalan hingga kamu melihat jembatan.', exp: '"Keep walking" = terus berjalan. "Until" = hingga / sampai.' },
  { q: '"Have a nice day!" artinya...', opts: ['Semoga harimu menyenangkan!', 'Hati-hati di jalan!', 'Semoga berhasil!', 'Selamat malam!'], ans: 'Semoga harimu menyenangkan!', exp: '"Have a nice day" = semoga harimu menyenangkan! (ucapan perpisahan ramah).' },
];

const ListeningLesson7: React.FC = () => {
  const navigate = useNavigate();
  const nextPath = '/modul/english/beginner/listening/lesson-8';
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedListeningLessons().includes(7));
  const [showModal, setShowModal] = React.useState(false);
  const [activeTab, setActiveTab] = useState<'simak' | 'latihan' | 'kuis'>('simak');
  const handleComplete = () => { markListeningComplete(7); setIsCompleted(true); setShowModal(true); };

  const dirPhrases = [
    { en: 'Excuse me!', id: 'Permisi!' }, { en: 'I am lost.', id: 'Saya tersesat.' },
    { en: 'Where is...?', id: 'Di mana...?' }, { en: 'Go straight ahead', id: 'Jalan lurus' },
    { en: 'Turn left/right', id: 'Belok kiri/kanan' }, { en: 'Next to', id: 'Di sebelah' },
    { en: 'Opposite', id: 'Di seberang' }, { en: 'How far?', id: 'Seberapa jauh?' },
  ];

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)' }} onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg,#8E44AD,#6C3483)' }}><span style={{ fontSize: 38 }}>🏆</span></div>
            <h2 className="text-xl font-extrabold mb-1">Lesson 7 Selesai! 🎉</h2>
            <p className="text-sm text-gray-500 mb-5">Kamu sudah bisa memahami petunjuk arah dalam bahasa Inggris!</p>
            <div className="flex gap-3">
              <button onClick={() => { setShowModal(false); navigate(nextPath); }} className="flex-1 py-3 rounded-xl font-bold text-white bg-purple-500">Lesson 8 ›</button>
              <button onClick={() => { setShowModal(false); navigate(-1); }} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700">Kembali</button>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col h-[100dvh] md:h-full bg-slate-50">
        <header className="flex-none bg-white/95 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100 shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg></button>
            <div className="text-center"><h1 className="text-sm font-bold text-slate-800">Bertanya Arah</h1><p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">Listening • Lesson 7</p></div>
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
                  <h2 className="text-lg font-extrabold mb-1">Bertanya Arah</h2>
                  <p className="text-sm text-purple-100">Pelajari cara memahami petunjuk arah ketika seseorang berbicara dengan pelan dan jelas!</p>
                </div>
                <div className="bg-white rounded-2xl border border-purple-100 shadow-sm p-4">
                  <p className="text-xs font-extrabold text-purple-700 uppercase tracking-wide mb-3">🗺️ Frasa Bertanya & Memberi Arah</p>
                  <div className="grid grid-cols-2 gap-2">
                    {dirPhrases.map(p => (<div key={p.en} className="bg-slate-50 rounded-xl px-3 py-2"><p className="text-xs font-extrabold text-slate-800">{p.en}</p><p className="text-xs text-purple-600">{p.id}</p></div>))}
                  </div>
                </div>
                <DialoguePlayer title="Percakapan: Bertanya Arah ke Kantor Pos" lines={DIALOGUE} />
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

export default ListeningLesson7;
