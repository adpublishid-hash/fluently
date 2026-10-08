import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine, DialoguePlayer, FillBlankExercise, getCompletedListeningLessons, markListeningComplete } from './listeningUtils';
import type { QuizItem, DialogueLine, BlankItem } from './listeningUtils';

const DIALOGUE: DialogueLine[] = [
  { speaker: 'Ben', text: 'Excuse me, I\'m looking for the post office. Is it far from here?', translation: 'Permisi, saya mencari kantor pos. Apakah jauh dari sini?', avatar: '👨' },
  { speaker: 'Maria', text: 'Not really. Go straight ahead on this street for about two blocks, then turn left.', translation: 'Tidak terlalu. Jalan lurus di jalan ini sekitar dua blok, lalu belok kiri.', avatar: '👩' },
  { speaker: 'Ben', text: 'Turn left at the traffic lights?', translation: 'Belok kiri di lampu merah?', avatar: '👨' },
  { speaker: 'Maria', text: 'Yes, exactly. The post office is next to the supermarket, opposite the park.', translation: 'Ya, tepat. Kantor pos ada di samping supermarket, di seberang taman.', avatar: '👩' },
  { speaker: 'Ben', text: 'Is there a bank nearby too? I need to use an ATM.', translation: 'Apakah ada bank di dekat situ juga? Saya perlu menggunakan ATM.', avatar: '👨' },
  { speaker: 'Maria', text: 'Yes! There\'s a bank on the corner of Main Street and Park Avenue. It\'s about five minutes on foot.', translation: 'Ya! Ada bank di pojok Jalan Main dan Park Avenue. Sekitar 5 menit berjalan kaki.', avatar: '👩' },
  { speaker: 'Ben', text: 'That\'s very helpful. Is the area safe to walk around in the evening?', translation: 'Itu sangat membantu. Apakah daerahnya aman untuk berjalan di malam hari?', avatar: '👨' },
  { speaker: 'Maria', text: 'Yes, the neighborhood is very safe. There are street lights and usually many people around.', translation: 'Ya, lingkungannya sangat aman. Ada lampu jalan dan biasanya banyak orang di sekitar.', avatar: '👩' },
];

const BLANKS: BlankItem[] = [
  { sentence: 'Go ___ ahead on this street for two blocks.', blank: 'straight', opts: ['straight', 'slowly', 'quickly', 'carefully'], hint: 'Jalan lurus = go ___ ahead' },
  { sentence: 'The post office is ___ to the supermarket.', blank: 'next', opts: ['next', 'near', 'close', 'beside'], hint: 'Di samping = ___ to' },
  { sentence: 'The bank is on the ___ of Main Street and Park Avenue.', blank: 'corner', opts: ['corner', 'middle', 'end', 'start'], hint: 'Di pojok = on the ___' },
  { sentence: 'It\'s about five minutes ___ foot.', blank: 'on', opts: ['on', 'by', 'with', 'in'], hint: 'Berjalan kaki = ___ foot' },
  { sentence: 'The post office is ___ the park.', blank: 'opposite', opts: ['opposite', 'behind', 'beside', 'under'], hint: 'Di seberang = ___' },
];

const QUIZ: QuizItem[] = [
  { q: '"I\'m looking for the post office." artinya...', opts: ['Saya mencari kantor pos.', 'Saya sudah menemukan kantor pos.', 'Saya di dekat kantor pos.', 'Saya bekerja di kantor pos.'], ans: 'Saya mencari kantor pos.', exp: '"Look for" = mencari (sedang dalam proses mencari).' },
  { q: '"Go straight ahead" artinya...', opts: ['Belok kanan', 'Putar balik', 'Jalan lurus', 'Belok kiri'], ans: 'Jalan lurus', exp: '"Straight ahead" = lurus ke depan.' },
  { q: '"Turn left" artinya...', opts: ['Belok kiri', 'Berhenti', 'Belok kanan', 'Jalan terus'], ans: 'Belok kiri', exp: '"Turn left" = belok kiri. "Turn right" = belok kanan.' },
  { q: '"Two blocks" artinya...', opts: ['Dua blok (ruas jalan)', 'Dua menit', 'Dua putaran', 'Dua jalan'], ans: 'Dua blok (ruas jalan)', exp: '"Block" = satu ruas/segmen jalan antar persimpangan.' },
  { q: '"Next to" artinya...', opts: ['Di belakang', 'Di samping', 'Di atas', 'Di depan'], ans: 'Di samping', exp: '"Next to" = di samping/bersebelahan.' },
  { q: '"Opposite the park" artinya...', opts: ['Di dalam taman', 'Di belakang taman', 'Di seberang taman', 'Di samping taman'], ans: 'Di seberang taman', exp: '"Opposite" = berhadapan/di seberang.' },
  { q: '"Is it far from here?" artinya...', opts: ['Apakah itu bagus?', 'Apakah itu jauh dari sini?', 'Apakah itu dekat?', 'Apakah itu buka?'], ans: 'Apakah itu jauh dari sini?', exp: '"Far from here" = jauh dari tempat ini.' },
  { q: '"On the corner of Main Street and Park Avenue" berarti...', opts: ['Di depan bank', 'Di samping taman', 'Di pojok pertemuan dua jalan', 'Di tengah jalan'], ans: 'Di pojok pertemuan dua jalan', exp: '"On the corner of [street A] and [street B]" = di pojok persimpangan dua jalan.' },
  { q: '"Five minutes on foot" artinya...', opts: ['Lima blok jauh', 'Lima menit naik kendaraan', '5 menit berjalan kaki', 'Sekitar 5 kilometer'], ans: '5 menit berjalan kaki', exp: '"On foot" = dengan berjalan kaki (tanpa kendaraan).' },
  { q: 'Kantor pos ada di sebelah...', opts: ['Taman', 'Lampu merah', 'Supermarket', 'Bank'], ans: 'Supermarket', exp: '"The post office is next to the supermarket."' },
  { q: '"Traffic lights" artinya...', opts: ['Lampu merah (lampu lalu lintas)', 'Lampu jalan', 'Jalan raya', 'Rambu lalu lintas'], ans: 'Lampu merah (lampu lalu lintas)', exp: '"Traffic lights" = lampu lalu lintas (merah, kuning, hijau).' },
  { q: '"The neighborhood is very safe." artinya...', opts: ['Lingkungannya sangat ramai.', 'Lingkungannya sangat sepi.', 'Lingkungannya sangat aman.', 'Lingkungannya sangat berbahaya.'], ans: 'Lingkungannya sangat aman.', exp: '"Safe" = aman. "Neighborhood" = lingkungan/wilayah tempat tinggal.' },
  { q: '"Street lights" artinya...', opts: ['Lampu jalan penerangan', 'Head lights', 'Lampu lalu lintas', 'Neon sign'], ans: 'Lampu jalan penerangan', exp: '"Street lights" = lampu penerangan di pinggir jalan.' },
  { q: '"I need to use an ATM." artinya...', opts: ['Saya perlu menggunakan ATM.', 'ATM di mana?', 'Saya sudah ke ATM.', 'Saya ingin membuka rekening.'], ans: 'Saya perlu menggunakan ATM.', exp: '"I need to..." = saya perlu/harus... (menyatakan kebutuhan).' },
  { q: '"Not really" sebagai jawaban atas "Is it far?" berarti...', opts: ['Tidak sama sekali', 'Tidak terlalu (agak dekat)', 'Ya, sangat jauh', 'Mungkin jauh'], ans: 'Tidak terlalu (agak dekat)', exp: '"Not really" = tidak terlalu, tidak begitu (menyangkal secara halus).' },
  { q: '"That\'s very helpful." artinya...', opts: ['Itu cukup membantu.', 'Apakah itu membantu?', 'Itu tidak membantu.', 'Itu sangat membantu.'], ans: 'Itu sangat membantu.', exp: '"Helpful" = membantu. "Very helpful" = sangat membantu.' },
  { q: '"Post office" artinya...', opts: ['Kantor pos', 'Kantor imigrasi', 'Kantor polisi', 'Kantor pemerintah'], ans: 'Kantor pos', exp: '"Post office" = kantor pos (pengiriman surat dan paket).' },
  { q: '"Supermarket" dalam bahasa Indonesia adalah...', opts: ['Pasar tradisional', 'Warung', 'Minimarket', 'Supermarket/swalayan'], ans: 'Supermarket/swalayan', exp: '"Supermarket" = toko besar yang menjual berbagai kebutuhan.' },
  { q: 'Bank ada di pojok...', opts: ['Main Street & Park Avenue', 'Park Street & Park Avenue', 'Park Street & Main Avenue', 'Main Street & Oak Avenue'], ans: 'Main Street & Park Avenue', exp: '"Corner of Main Street and Park Avenue."' },
  { q: '"Is the area safe to walk around in the evening?" artinya...', opts: ['Apakah daerah ini ramai di sore hari?', 'Apakah ada tempat jalan-jalan?', 'Kapan waktu terbaik untuk jalan-jalan?', 'Apakah aman berjalan-jalan di malam hari?'], ans: 'Apakah aman berjalan-jalan di malam hari?', exp: '"Safe to walk around" = aman untuk berjalan-jalan. "In the evening" = di malam hari.' },
];

export default function ElemListeningLesson4() {
  const navigate = useNavigate();
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedListeningLessons().includes(4));
  const [showModal, setShowModal] = React.useState(false);
  const [activeTab, setActiveTab] = useState<'simak' | 'latihan' | 'kuis'>('simak');
  const handleComplete = () => { markListeningComplete(4); setIsCompleted(true); setShowModal(true); };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)' }} onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg,#4FA3D1,#1E6F9F)' }}><span style={{ fontSize: 38 }}>🏆</span></div>
            <h2 className="text-xl font-extrabold mb-1">Lesson 4 Selesai! 🎉</h2>
            <p className="text-sm text-gray-500 mb-5">Kamu bisa memahami petunjuk arah dan fasilitas umum!</p>
            <div className="flex gap-3">
              <button onClick={() => { setShowModal(false); navigate('/modul/english/elementary/listening/lesson-5'); }} className="flex-1 py-3 rounded-xl font-bold text-white bg-teal-500">Lesson 5 ›</button>
              <button onClick={() => { setShowModal(false); navigate(-1); }} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700">Kembali</button>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col h-[100dvh] bg-slate-50">
        <header className="flex-none bg-white/95 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100 shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg></button>
            <div className="text-center"><h1 className="text-sm font-bold text-slate-800">Lingkungan Sekitar</h1><p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">Elementary Listening • L4</p></div>
            <button onClick={() => navigate('/modul/english/elementary/listening/lesson-5')} className="px-3 h-9 rounded-full text-xs font-bold text-white bg-teal-500">Next ›</button>
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
                  <h2 className="text-lg font-extrabold mb-1">🏘️ Lingkungan Sekitar</h2>
                  <p className="text-sm text-teal-100">Pelajari cara memahami dan memberikan petunjuk arah serta info fasilitas umum.</p>
                </div>
                <div className="bg-white rounded-2xl border border-sky-100 shadow-sm p-4">
                  <p className="text-xs font-extrabold text-teal-700 uppercase tracking-wide mb-3">📖 Kosakata Penting</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[{en:'Go straight ahead',id:'Jalan lurus'},{en:'Turn left/right',id:'Belok kiri/kanan'},{en:'Next to',id:'Di samping'},{en:'Opposite',id:'Di seberang'},{en:'On the corner',id:'Di pojok'},{en:'On foot',id:'Berjalan kaki'}].map(v => (<div key={v.en} className="bg-slate-50 rounded-xl px-3 py-2"><p className="text-xs font-extrabold text-slate-800">{v.en}</p><p className="text-xs text-teal-600">{v.id}</p></div>))}
                  </div>
                </div>
                <DialoguePlayer title="Percakapan: Mencari Kantor Pos & Bank" lines={DIALOGUE} />
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
