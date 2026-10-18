import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine, DialoguePlayer, FillBlankExercise, getCompletedListeningLessons, markListeningComplete } from './listeningUtils';
import type { QuizItem, DialogueLine, BlankItem } from './listeningUtils';

const DIALOGUE: DialogueLine[] = [
  { speaker: 'Waiter', text: 'Good evening! Welcome to Bella Vista. Do you have a reservation?', translation: 'Selamat malam! Selamat datang di Bella Vista. Apakah Anda punya reservasi?', avatar: '🧑' },
  { speaker: 'Diana', text: 'Yes, we do. The reservation is under the name Diana Chen, for four people.', translation: 'Ya, kami punya. Reservasi atas nama Diana Chen, untuk empat orang.', avatar: '👩' },
  { speaker: 'Waiter', text: 'Perfect! Follow me please. Here are your menus. Can I start you off with some drinks?', translation: 'Sempurna! Ikuti saya. Ini menu Anda. Boleh saya mulai dengan minuman?', avatar: '🧑' },
  { speaker: 'Diana', text: 'Yes, please. I\'ll have sparkling water and my husband would like a glass of red wine.', translation: 'Ya, tolong. Saya mau air berkarbonasi dan suami saya mau segelas wine merah.', avatar: '👩' },
  { speaker: 'Waiter', text: 'Of course. Are you ready to order your food, or do you need a few more minutes?', translation: 'Tentu. Apakah Anda sudah siap memesan makanan, atau perlu beberapa menit lagi?', avatar: '🧑' },
  { speaker: 'Diana', text: 'We\'re ready. I\'ll have the grilled salmon and my husband will have the beef steak, medium rare.', translation: 'Kami sudah siap. Saya akan pesan salmon bakar dan suami saya akan pesan steak sapi, medium rare.', avatar: '👩' },
  { speaker: 'Waiter', text: 'Excellent choice! Any allergies or dietary requirements I should know about?', translation: 'Pilihan yang sangat bagus! Apakah ada alergi atau kebutuhan diet yang perlu saya ketahui?', avatar: '🧑' },
  { speaker: 'Diana', text: 'Yes, one of our guests is vegetarian. Could you also bring a vegetarian option for them?', translation: 'Ya, salah satu tamu kami vegetarian. Bisakah Anda juga membawa pilihan vegetarian untuk mereka?', avatar: '👩' },
];

const BLANKS: BlankItem[] = [
  { sentence: 'The reservation is ___ the name Diana Chen.', blank: 'under', opts: ['under', 'in', 'by', 'for'], hint: 'Reservasi atas nama = ___ the name' },
  { sentence: 'Can I start you ___ with some drinks?', blank: 'off', opts: ['off', 'up', 'with', 'by'], hint: '"Memulai dengan..." = start ___ with' },
  { sentence: 'I\'ll have the ___ salmon.', blank: 'grilled', opts: ['grilled', 'fried', 'boiled', 'steamed'], hint: 'Salmon yang dimasak di panggangan = ___ salmon' },
  { sentence: 'My husband will have the beef steak, ___ rare.', blank: 'medium', opts: ['medium', 'well', 'half', 'mild'], hint: 'Tingkat kematangan steak di tengah = ___ rare' },
  { sentence: 'Any ___ or dietary requirements?', blank: 'allergies', opts: ['allergies', 'diets', 'problems', 'needs'], hint: 'Reaksi makanan = ___' },
];

const QUIZ: QuizItem[] = [
  { q: '"Do you have a reservation?" artinya...', opts: ['Apakah Anda ingin memesan?', 'Berapa orang?', 'Apakah Anda mau meja?', 'Apakah Anda punya reservasi?'], ans: 'Apakah Anda punya reservasi?', exp: '"Reservation" = pemesanan meja/kamar terlebih dahulu.' },
  { q: '"The reservation is under the name Diana Chen." artinya...', opts: ['Reservasi untuk Diana Chen saja.', 'Reservasi dibuat oleh Diana Chen.', 'Reservasi atas nama Diana Chen.', 'Diana Chen yang bayar.'], ans: 'Reservasi atas nama Diana Chen.', exp: '"Under the name..." = atas nama... (cara menyebut nama dalam reservasi).' },
  { q: '"Can I start you off with some drinks?" artinya...', opts: ['Boleh saya mulai dengan minuman dahulu?', 'Boleh saya ambil piring Anda?', 'Apakah Anda ingin memesan makanan dahulu?', 'Apakah Anda ingin makanan penutup?'], ans: 'Boleh saya mulai dengan minuman dahulu?', exp: '"Start someone off with" = memulai layanan dengan (biasanya minuman dulu sebelum makanan).' },
  { q: '"Sparkling water" artinya...', opts: ['Air putih biasa', 'Jus buah', 'Air panas', 'Air berkarbonasi/bersoda'], ans: 'Air berkarbonasi/bersoda', exp: '"Sparkling water" = air mineral berkarbonasi (ada gelembungnya).' },
  { q: '"Are you ready to order?" artinya...', opts: ['Apakah makanan sudah siap?', 'Apakah Anda siap memesan?', 'Apakah Anda sudah memilih?', 'Apakah Anda ingin bayar?'], ans: 'Apakah Anda siap memesan?', exp: '"Ready to order" = siap untuk memesan makanan.' },
  { q: '"Grilled salmon" artinya...', opts: ['Salmon rebus', 'Salmon bakar', 'Salmon kukus', 'Salmon goreng'], ans: 'Salmon bakar', exp: '"Grilled" = dimasak di atas panggangan/grill = bakar.' },
  { q: '"Medium rare" untuk steak berarti...', opts: ['Matang sedang (sedikit merah di tengah)', 'Mentah', 'Matang penuh', 'Hampir mentah'], ans: 'Matang sedang (sedikit merah di tengah)', exp: '"Medium rare" = tingkat kematangan steak dengan bagian tengah masih sedikit merah/pink.' },
  { q: '"Excellent choice!" artinya...', opts: ['Pilihan yang buruk!', 'Pilihan yang biasa.', 'Pilihan yang sangat bagus!', 'Tidak ada pilihan lain.'], ans: 'Pilihan yang sangat bagus!', exp: '"Excellent choice!" = pujian atas pilihan (umum digunakan pelayan restoran).' },
  { q: '"Allergies" artinya...', opts: ['Diet ketat', 'Alergi makanan', 'Pantangan agama', 'Selera makan'], ans: 'Alergi makanan', exp: '"Allergies" = alergi (reaksi tubuh terhadap zat tertentu).' },
  { q: '"Dietary requirements" artinya...', opts: ['Kebutuhan kalori harian', 'Kebutuhan/pantangan makan tertentu', 'Menu diet sehat', 'Suplemen makanan'], ans: 'Kebutuhan/pantangan makan tertentu', exp: '"Dietary requirements" = kebutuhan makan khusus (vegetarian, vegan, halal, dll.).' },
  { q: '"Vegetarian" berarti orang yang...', opts: ['Hanya makan buah', 'Tidak makan seafood', 'Tidak makan daging', 'Tidak makan sayur'], ans: 'Tidak makan daging', exp: '"Vegetarian" = orang yang tidak makan daging dan biasanya tidak makan ikan.' },
  { q: '"Could you also bring...?" adalah cara...', opts: ['Menolak permintaan', 'Meminta dengan sopan', 'Memerintahkan langsung', 'Mengeluh'], ans: 'Meminta dengan sopan', exp: '"Could you...?" = bentuk permintaan yang sopan (lebih halus dari "can you?").' },
  { q: '"A glass of red wine" artinya...', opts: ['Sebotol wine merah', 'Segelas wine merah', 'Segelas wine putih', 'Dua gelas wine'], ans: 'Segelas wine merah', exp: '"A glass of" = segelas. "Red wine" = wine/anggur merah.' },
  { q: '"Follow me, please." artinya...', opts: ['Silakan lihat menu.', 'Silakan duduk di sini.', 'Ikuti saya, silakan.', 'Mohon tunggu sebentar.'], ans: 'Ikuti saya, silakan.', exp: '"Follow me" = ikuti saya (pelayan mengantar ke meja).' },
  { q: '"For four people" berarti reservasi untuk...', opts: ['2 orang', '4 orang', '3 orang', '5 orang'], ans: '4 orang', exp: '"For four people" = untuk 4 orang.' },
  { q: '"Or do you need a few more minutes?" artinya...', opts: ['Atau Anda butuh beberapa menit lagi?', 'Apakah Anda sudah memesan?', 'Apakah makanan sudah selesai?', 'Atau Anda ingin pulang?'], ans: 'Atau Anda butuh beberapa menit lagi?', exp: 'Pelayan memberi pilihan: pesan sekarang atau butuh waktu untuk memilih.' },
  { q: '"Beef steak" artinya...', opts: ['Steak ayam', 'Steak sapi', 'Steak babi', 'Steak ikan'], ans: 'Steak sapi', exp: '"Beef" = daging sapi. "Steak" = potongan daging tebal yang dipanggang.' },
  { q: 'Diana memesan untuk dirinya...', opts: ['Steak sapi', 'Pasta', 'Makanan vegetarian', 'Salmon bakar'], ans: 'Salmon bakar', exp: '"I\'ll have the grilled salmon" = saya akan pesan salmon bakar.' },
  { q: '"Here are your menus." artinya...', opts: ['Apakah Anda sudah lihat menu?', 'Menu ada di sana.', 'Pilih menu Anda.', 'Ini menu Anda.'], ans: 'Ini menu Anda.', exp: '"Here are..." = ini dia... (menyerahkan sesuatu).' },
  { q: 'Suami Diana memesan steak dengan tingkat kematangan...', opts: ['Well done', 'Rare', 'Medium rare', 'Medium'], ans: 'Medium rare', exp: '"My husband will have the beef steak, medium rare."' },
];

export default function ElemListeningLesson7() {
  const navigate = useNavigate();
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedListeningLessons().includes(7));
  const [showModal, setShowModal] = React.useState(false);
  const [activeTab, setActiveTab] = useState<'simak' | 'latihan' | 'kuis'>('simak');
  const handleComplete = () => { markListeningComplete(7); setIsCompleted(true); setShowModal(true); };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)' }} onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg,#4FA3D1,#1E6F9F)' }}><span style={{ fontSize: 38 }}>🏆</span></div>
            <h2 className="text-xl font-extrabold mb-1">Lesson 7 Selesai! 🎉</h2>
            <p className="text-sm text-gray-500 mb-5">Kamu bisa memahami percakapan di restoran & cara memesan makanan!</p>
            <div className="flex gap-3">
              <button onClick={() => { setShowModal(false); navigate('/modul/english/elementary/listening/lesson-8'); }} className="flex-1 py-3 rounded-xl font-bold text-white bg-teal-500">Lesson 8 ›</button>
              <button onClick={() => { setShowModal(false); navigate(-1); }} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700">Kembali</button>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col h-[100dvh] bg-slate-50">
        <header className="flex-none bg-white/95 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100 shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg></button>
            <div className="text-center"><h1 className="text-sm font-bold text-slate-800">Makan di Luar</h1><p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">Elementary Listening • L7</p></div>
            <button onClick={() => navigate('/modul/english/elementary/listening/lesson-8')} className="px-3 h-9 rounded-full text-xs font-bold text-white bg-teal-500">Next ›</button>
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
                  <h2 className="text-lg font-extrabold mb-1">🍽️ Makan di Luar</h2>
                  <p className="text-sm text-teal-100">Pahami percakapan di restoran: reservasi, menu, pesanan & kebutuhan diet khusus.</p>
                </div>
                <div className="bg-white rounded-2xl border border-sky-100 shadow-sm p-4">
                  <p className="text-xs font-extrabold text-teal-700 uppercase tracking-wide mb-3">📖 Kosakata Penting</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[{en:'Reservation',id:'Reservasi meja'},{en:'Grilled / Fried',id:'Bakar / Goreng'},{en:'Medium rare',id:'Setengah matang'},{en:'Allergies',id:'Alergi'},{en:'Vegetarian',id:'Tidak makan daging'},{en:'Dietary requirements',id:'Kebutuhan makan khusus'}].map(v => (<div key={v.en} className="bg-slate-50 rounded-xl px-3 py-2"><p className="text-xs font-extrabold text-slate-800">{v.en}</p><p className="text-xs text-teal-600">{v.id}</p></div>))}
                  </div>
                </div>
                <DialoguePlayer title="Percakapan: Di Restoran Bella Vista" lines={DIALOGUE} />
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
