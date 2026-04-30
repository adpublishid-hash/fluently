import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine, DialoguePlayer, FillBlankExercise, getCompletedListeningLessons, markListeningComplete } from './listeningUtils';
import type { QuizItem, DialogueLine, BlankItem } from './listeningUtils';

const DIALOGUE: DialogueLine[] = [
  { speaker: 'Customer', text: 'Good morning! I would like to order, please.', translation: 'Selamat pagi! Saya ingin memesan, tolong.', avatar: '🧑' },
  { speaker: 'Waiter', text: 'Of course! What would you like to eat?', translation: 'Tentu saja! Apa yang ingin Anda makan?', avatar: '👨‍🍳' },
  { speaker: 'Customer', text: 'I would like fried rice and a glass of orange juice, please.', translation: 'Saya pesan nasi goreng dan segelas jus jeruk, tolong.', avatar: '🧑' },
  { speaker: 'Waiter', text: 'Would you like anything else?', translation: 'Apakah Anda ingin pesan yang lain?', avatar: '👨‍🍳' },
  { speaker: 'Customer', text: 'No, that is all. How much is it?', translation: 'Tidak, itu saja. Berapa harganya?', avatar: '🧑' },
  { speaker: 'Waiter', text: 'It is forty-five thousand rupiah, please.', translation: 'Harganya empat puluh lima ribu rupiah.', avatar: '👨‍🍳' },
  { speaker: 'Customer', text: 'Here you are. Can I have the receipt, please?', translation: 'Ini dia. Boleh saya minta kwitansinya?', avatar: '🧑' },
  { speaker: 'Waiter', text: 'Certainly! Thank you and enjoy your meal!', translation: 'Tentu saja! Terima kasih dan selamat menikmati makanannya!', avatar: '👨‍🍳' },
];

const BLANKS: BlankItem[] = [
  { sentence: 'I would ___ to have a coffee, please.', blank: 'like', opts: ['like', 'want', 'love', 'need'], hint: 'Cara sopan memesan sesuatu' },
  { sentence: 'How ___ is this bag?', blank: 'much', opts: ['much', 'many', 'more', 'most'], hint: 'Menanyakan harga: How ___ is it?' },
  { sentence: 'Can I have the ___, please?', blank: 'receipt', opts: ['receipt', 'menu', 'order', 'change'], hint: 'Struk pembelian = ___' },
  { sentence: 'I will ___ two kilograms of sugar.', blank: 'take', opts: ['take', 'bring', 'carry', 'have'], hint: '"Ambil/beli" saat berbelanja' },
  { sentence: 'That is ___ for today, thank you.', blank: 'all', opts: ['all', 'done', 'final', 'one'], hint: '"Itu saja" = that is ___' },
];

const QUIZ: QuizItem[] = [
  { q: '"I would like to order." artinya...', opts: ['Saya sudah memesan.', 'Saya ingin memesan.', 'Saya tidak ingin memesan.', 'Pesanan saya sudah datang.'], ans: 'Saya ingin memesan.', exp: '"I would like to..." = saya ingin... (cara sopan).' },
  { q: '"How much is this?" artinya...', opts: ['Ini apa?', 'Ini milik siapa?', 'Berapa harga ini?', 'Ini di mana?'], ans: 'Berapa harga ini?', exp: '"How much" = berapa harganya? (untuk barang yang tidak bisa dihitung per satuan).' },
  { q: '"Would you like anything else?" artinya...', opts: ['Kamu suka apa?', 'Apakah kamu ingin sesuatu yang lain?', 'Kamu mau kemana?', 'Apa yang kamu butuhkan?'], ans: 'Apakah kamu ingin sesuatu yang lain?', exp: '"Would you like...?" = apakah kamu mau...? (tawaran sopan).' },
  { q: '"Here you are." artinya...', opts: ['Di sana kamu berada.', 'Ini dia. / Silakan.', 'Kamu ada di sini.', 'Berapa kamu?'], ans: 'Ini dia. / Silakan.', exp: '"Here you are" = ini dia (saat memberikan sesuatu kepada seseorang).' },
  { q: '"That is all, thank you." artinya...', opts: ['Semua itu, terima kasih.', 'Itu saja, terima kasih.', 'Itu benar, terima kasih.', 'Cukup, terima kasih.'], ans: 'Itu saja, terima kasih.', exp: '"That is all" = itu saja. Artinya tidak ada pesanan lagi.' },
  { q: '"Do you have vegetarian options?" artinya...', opts: ['Apakah kamu vegetarian?', 'Apakah ada pilihan vegetarian?', 'Apa saja sayuran yang ada?', 'Di mana menu vegetariannya?'], ans: 'Apakah ada pilihan vegetarian?', exp: '"Options" = pilihan. "Do you have...?" = apakah ada/tersedia...?' },
  { q: '"The total is eighty thousand rupiah." artinya...', opts: ['Totalnya delapan ribu rupiah.', 'Totalnya delapan puluh ribu rupiah.', 'Totalnya delapan ratus ribu rupiah.', 'Totalnya delapan juta rupiah.'], ans: 'Totalnya delapan puluh ribu rupiah.', exp: '"Eighty" = 80. "Eighty thousand" = 80.000.' },
  { q: '"Can I pay by card?" artinya...', opts: ['Bisakah saya bayar tunai?', 'Bisakah saya bayar dengan kartu?', 'Apakah ada diskon?', 'Bisakah saya cicil?'], ans: 'Bisakah saya bayar dengan kartu?', exp: '"Pay by card" = bayar dengan kartu (kredit/debit).' },
  { q: '"Fresh fruit" artinya...', opts: ['Buah kaleng', 'Buah segar', 'Jus buah', 'Buah kering'], ans: 'Buah segar', exp: '"Fresh" = segar. "Fruit" = buah.' },
  { q: '"On sale" artinya...', opts: ['Dijual (harga penuh)', 'Sedang diskon', 'Sudah terjual', 'Harga tetap'], ans: 'Sedang diskon', exp: '"On sale" = dalam keadaan diskon / sedang ada penawaran harga.' },
  { q: '"I need to buy some groceries." artinya...', opts: ['Saya ingin makan.', 'Saya perlu membeli bahan makanan.', 'Saya suka belanja.', 'Saya tidak butuh apa-apa.'], ans: 'Saya perlu membeli bahan makanan.', exp: '"Groceries" = bahan makanan / kebutuhan dapur.' },
  { q: '"Enjoy your meal!" artinya...', opts: ['Habiskan makananmu!', 'Selamat menikmati makananmu!', 'Makanan sudah siap!', 'Makan dahulu!'], ans: 'Selamat menikmati makananmu!', exp: '"Enjoy your meal" = selamat menikmati makanannya!' },
  { q: '"A glass of water" artinya...', opts: ['Sebotol air', 'Segelas air', 'Semangkuk air', 'Secangkir air'], ans: 'Segelas air', exp: '"A glass of" = se-gelas. "A cup of" = se-cangkir (untuk kopi/teh).' },
  { q: '"The food is delicious!" artinya...', opts: ['Makanannya enak/lezat!', 'Makanannya mahal!', 'Makanannya pedas!', 'Makanannya dingin!'], ans: 'Makanannya enak/lezat!', exp: '"Delicious" = lezat / enak sekali.' },
  { q: '"Can I see the menu, please?" artinya...', opts: ['Boleh saya pesan?', 'Boleh saya lihat menunya?', 'Boleh saya duduk?', 'Boleh saya bayar?'], ans: 'Boleh saya lihat menunya?', exp: '"Can I see the menu?" = boleh saya melihat menu? (permintaan sopan).' },
  { q: '"Checkout" di supermarket artinya...', opts: ['Masuk toko', 'Area parkir', 'Kasir / proses pembayaran', 'Gudang'], ans: 'Kasir / proses pembayaran', exp: '"Checkout" = proses membayar di kasir.' },
  { q: '"Too expensive" artinya...', opts: ['Sangat murah', 'Terlalu mahal', 'Harga pas', 'Sangat murah sekali'], ans: 'Terlalu mahal', exp: '"Too expensive" = terlalu mahal.' },
  { q: '"Change" ketika membayar artinya...', opts: ['Tukar barang', 'Uang kembalian', 'Tambah bayar', 'Bayar tunai'], ans: 'Uang kembalian', exp: '"Change" dalam konteks berbelanja = uang kembalian.' },
  { q: '"Do you accept credit cards?" artinya...', opts: ['Apakah kamu punya kartu kredit?', 'Apakah kamu menerima kartu kredit?', 'Di mana ATM-nya?', 'Berapa limitnya?'], ans: 'Apakah kamu menerima kartu kredit?', exp: '"Accept" = menerima. "Do you accept...?" = apakah kamu menerima...?' },
  { q: '"A dozen eggs" artinya...', opts: ['Enam butir telur', 'Delapan butir telur', 'Dua belas butir telur', 'Dua puluh butir telur'], ans: 'Dua belas butir telur', exp: '"A dozen" = selusin = 12 buah.' },
];

const ListeningLesson6: React.FC = () => {
  const navigate = useNavigate();
  const nextPath = '/modul/english/beginner/listening/lesson-7';
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedListeningLessons().includes(6));
  const [showModal, setShowModal] = React.useState(false);
  const [activeTab, setActiveTab] = useState<'simak' | 'latihan' | 'kuis'>('simak');
  const handleComplete = () => { markListeningComplete(6); setIsCompleted(true); setShowModal(true); };

  const orderPhrases = [
    { en: 'I would like...', id: 'Saya ingin...' }, { en: 'Can I have...?', id: 'Boleh saya minta...?' },
    { en: 'How much is...?', id: 'Berapa harga...?' }, { en: 'That is all', id: 'Itu saja' },
    { en: 'Here you are', id: 'Ini dia' }, { en: 'Enjoy your meal!', id: 'Selamat menikmati!' },
    { en: 'The bill/check', id: 'Tagihan' }, { en: 'Pay by card/cash', id: 'Bayar dengan kartu/tunai' },
  ];

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)' }} onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg,#8E44AD,#6C3483)' }}><span style={{ fontSize: 38 }}>🏆</span></div>
            <h2 className="text-xl font-extrabold mb-1">Lesson 6 Selesai! 🎉</h2>
            <p className="text-sm text-gray-500 mb-5">Kamu sudah bisa memahami percakapan saat makan dan belanja!</p>
            <div className="flex gap-3">
              <button onClick={() => { setShowModal(false); navigate(nextPath); }} className="flex-1 py-3 rounded-xl font-bold text-white bg-purple-500">Lesson 7 ›</button>
              <button onClick={() => { setShowModal(false); navigate(-1); }} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700">Kembali</button>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col h-[100dvh] md:h-full bg-slate-50">
        <header className="flex-none bg-white/95 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100 shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg></button>
            <div className="text-center"><h1 className="text-sm font-bold text-slate-800">Makanan & Belanja</h1><p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">Listening • Lesson 6</p></div>
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
                  <h2 className="text-lg font-extrabold mb-1">Makanan & Belanja</h2>
                  <p className="text-sm text-purple-100">Pelajari cara memahami percakapan saat memesan makanan di restoran dan berbelanja!</p>
                </div>
                <div className="bg-white rounded-2xl border border-purple-100 shadow-sm p-4">
                  <p className="text-xs font-extrabold text-purple-700 uppercase tracking-wide mb-3">🍽️ Frasa Memesan & Berbelanja</p>
                  <div className="grid grid-cols-2 gap-2">
                    {orderPhrases.map(p => (<div key={p.en} className="bg-slate-50 rounded-xl px-3 py-2"><p className="text-xs font-extrabold text-slate-800">{p.en}</p><p className="text-xs text-purple-600">{p.id}</p></div>))}
                  </div>
                </div>
                <DialoguePlayer title="Percakapan: Memesan di Restoran" lines={DIALOGUE} />
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

export default ListeningLesson6;
