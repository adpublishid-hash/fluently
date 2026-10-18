import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine, DialoguePlayer, FillBlankExercise, getCompletedListeningLessons, markListeningComplete } from './listeningUtils';
import type { QuizItem, DialogueLine, BlankItem } from './listeningUtils';

const DIALOGUE: DialogueLine[] = [
  { speaker: 'Amy', text: 'Excuse me, do you have this jacket in a larger size? This one is a medium.', translation: 'Permisi, apakah Anda punya jaket ini dalam ukuran yang lebih besar? Yang ini ukuran medium.', avatar: '👩' },
  { speaker: 'Staff', text: 'Let me check for you. We have a large and an extra-large in the same colour.', translation: 'Izinkan saya memeriksa untuk Anda. Kami punya ukuran large dan extra-large dalam warna yang sama.', avatar: '🧑' },
  { speaker: 'Amy', text: 'Could I try the large one, please? And how much does it cost?', translation: 'Bisakah saya mencoba yang ukuran large? Dan berapa harganya?', avatar: '👩' },
  { speaker: 'Staff', text: 'Of course! The jacket is sixty-five dollars. We also have a ten percent discount today.', translation: 'Tentu! Jaket itu harganya 65 dolar. Kami juga ada diskon 10 persen hari ini.', avatar: '🧑' },
  { speaker: 'Amy', text: 'Oh great! And if it doesn\'t fit, can I return it?', translation: 'Oh bagus! Dan jika tidak pas, bisakah saya mengembalikannya?', avatar: '👩' },
  { speaker: 'Staff', text: 'Yes, you can return it within thirty days with your receipt. We offer a full refund.', translation: 'Ya, Anda bisa mengembalikannya dalam 30 hari dengan struk. Kami menawarkan pengembalian uang penuh.', avatar: '🧑' },
  { speaker: 'Amy', text: 'Perfect! I\'ll take the large. Can I pay by card?', translation: 'Sempurna! Saya akan ambil yang ukuran large. Bisakah saya bayar dengan kartu?', avatar: '👩' },
  { speaker: 'Staff', text: 'Certainly! We accept all major credit and debit cards. The cashier is at the front.', translation: 'Tentu! Kami menerima semua kartu kredit dan debit utama. Kasirnya ada di depan.', avatar: '🧑' },
];

const BLANKS: BlankItem[] = [
  { sentence: 'Do you have this jacket in a ___ size?', blank: 'larger', opts: ['larger', 'smaller', 'bigger', 'better'], hint: 'Meminta ukuran yang lebih ___' },
  { sentence: 'We have a ten ___ discount today.', blank: 'percent', opts: ['percent', 'dollar', 'amount', 'number'], hint: '10% = 10 ___' },
  { sentence: 'You can return it within ___ days with your receipt.', blank: 'thirty', opts: ['thirty', 'twenty', 'fifteen', 'sixty'], hint: 'Berapa hari untuk retur?' },
  { sentence: 'We offer a full ___.', blank: 'refund', opts: ['refund', 'return', 'money', 'credit'], hint: 'Pengembalian uang penuh = full ___' },
  { sentence: 'The ___ is at the front.', blank: 'cashier', opts: ['cashier', 'counter', 'manager', 'service'], hint: 'Tempat bayar = ___' },
];

const QUIZ: QuizItem[] = [
  { q: '"Do you have this in a larger size?" — pembeli mencari ukuran...', opts: ['Sama', 'Terkecil', 'Lebih kecil', 'Lebih besar'], ans: 'Lebih besar', exp: '"Larger size" = ukuran yang lebih besar (komparatif dari large).' },
  { q: '"Let me check for you." artinya...', opts: ['Anda harus periksa sendiri.', 'Saya sedang memeriksa.', 'Izinkan saya memeriksa untuk Anda.', 'Saya tidak bisa membantu.'], ans: 'Izinkan saya memeriksa untuk Anda.', exp: '"Let me + verb" = izinkan saya....' },
  { q: '"Could I try the large one, please?" — ini adalah...', opts: ['Permintaan sopan', 'Perintah', 'Keluhan', 'Pertanyaan informasi'], ans: 'Permintaan sopan', exp: '"Could I...?" = cara sopan meminta izin (lebih sopan dari "can I?").' },
  { q: 'Harga jaket adalah...', opts: ['$60', '$55', '$70', '$65'], ans: '$65', exp: '"Sixty-five dollars" = $65.' },
  { q: 'Diskon hari ini adalah...', opts: ['20%', '5%', '10%', '15%'], ans: '10%', exp: '"Ten percent discount" = diskon 10%.' },
  { q: '"If it doesn\'t fit" artinya...', opts: ['Jika tidak bagus', 'Jika tidak suka', 'Jika tidak mahal', 'Jika tidak pas'], ans: 'Jika tidak pas', exp: '"Fit" dalam konteks pakaian = pas/sesuai dengan ukuran tubuh.' },
  { q: '"Return" dalam konteks belanja artinya...', opts: ['Mengembalikan barang', 'Membeli kembali', 'Menukar barang', 'Kembali ke toko'], ans: 'Mengembalikan barang', exp: '"Return a product" = mengembalikan produk ke toko.' },
  { q: 'Berapa hari untuk retur barang?', opts: ['15 hari', '20 hari', '25 hari', '30 hari'], ans: '30 hari', exp: '"Within thirty days" = dalam waktu 30 hari.' },
  { q: '"Full refund" artinya...', opts: ['Tidak ada uang kembali', 'Kredit toko', 'Pengembalian uang penuh', 'Sebagian uang kembali'], ans: 'Pengembalian uang penuh', exp: '"Full refund" = pengembalian 100% uang yang dibayar.' },
  { q: '"Can I pay by card?" artinya...', opts: ['Apakah harganya murah?', 'Bisakah saya bayar tunai?', 'Apakah ada kartu anggota?', 'Bisakah saya bayar dengan kartu?'], ans: 'Bisakah saya bayar dengan kartu?', exp: '"Pay by card" = membayar menggunakan kartu (kredit/debit).' },
  { q: '"Certainly!" artinya...', opts: ['Mungkin', 'Tidak', 'Tentu saja', 'Nanti'], ans: 'Tentu saja', exp: '"Certainly!" = tentu saja! (ekspresi setuju/mengiyakan yang formal).' },
  { q: '"We accept all major credit cards." artinya...', opts: ['Kami tidak terima kartu.', 'Kami punya kartu kredit.', 'Kami hanya kerima tunai.', 'Kami menerima semua kartu kredit utama.'], ans: 'Kami menerima semua kartu kredit utama.', exp: '"Accept" = menerima. "Major" = utama/besar.' },
  { q: 'Amy akan membeli ukuran...', opts: ['Extra-large', 'Small', 'Medium', 'Large'], ans: 'Large', exp: '"I\'ll take the large" = saya akan ambil yang ukuran large.' },
  { q: '"Excuse me" digunakan untuk...', opts: ['Menolak permintaan', 'Meminta maaf atas kesalahan besar', 'Mengucapkan selamat tinggal', 'Menarik perhatian dengan sopan'], ans: 'Menarik perhatian dengan sopan', exp: '"Excuse me" = permisi (cara sopan menarik perhatian orang).' },
  { q: '"The cashier is at the front." artinya...', opts: ['Kasirnya ada di depan.', 'Kasirnya ada di belakang.', 'Kasirnya belum ada.', 'Kasirnya sedang Istirahat.'], ans: 'Kasirnya ada di depan.', exp: '"At the front" = di bagian depan (toko).' },
  { q: '"With your receipt" artinya...', opts: ['Dengan kartu', 'Dengan uang tunai', 'Dengan identitas', 'Dengan struk/bukti pembayaran'], ans: 'Dengan struk/bukti pembayaran', exp: '"Receipt" = struk/nota bukti pembayaran.' },
  { q: '"How much does it cost?" artinya...', opts: ['Di mana kasirnya?', 'Berapa ukurannya?', 'Berapa harganya?', 'Berapa diskonnya?'], ans: 'Berapa harganya?', exp: '"How much does it cost?" = berapa harganya? (menanyakan harga).' },
  { q: '"Debit card" berbeda dari "credit card" karena...', opts: ['Tidak diterima di toko', 'Langsung memotong saldo rekening', 'Lebih mahal', 'Hanya untuk online'], ans: 'Langsung memotong saldo rekening', exp: '"Debit card" memotong saldo langsung, "credit card" = pinjam dulu bayar nanti.' },
  { q: 'Ukuran yang tersedia selain medium adalah...', opts: ['Extra-small dan large', 'Large dan extra-large', 'Small dan large', 'Small dan extra-large'], ans: 'Large dan extra-large', exp: 'Staff menyebutkan "a large and an extra-large".' },
  { q: '"Of course!" ekuivalen dengan...', opts: ['Sure!', 'Certainly!', 'Definitely!', 'Semua benar'], ans: 'Semua benar', exp: '"Of course!", "Certainly!", "Definitely!", "Sure!" semua berarti "tentu saja!"' },
];

export default function ElemListeningLesson3() {
  const navigate = useNavigate();
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedListeningLessons().includes(3));
  const [showModal, setShowModal] = React.useState(false);
  const [activeTab, setActiveTab] = useState<'simak' | 'latihan' | 'kuis'>('simak');
  const handleComplete = () => { markListeningComplete(3); setIsCompleted(true); setShowModal(true); };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)' }} onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg,#4FA3D1,#1E6F9F)' }}><span style={{ fontSize: 38 }}>🏆</span></div>
            <h2 className="text-xl font-extrabold mb-1">Lesson 3 Selesai! 🎉</h2>
            <p className="text-sm text-gray-500 mb-5">Kamu bisa memahami percakapan di toko dan transaksi belanja!</p>
            <div className="flex gap-3">
              <button onClick={() => { setShowModal(false); navigate('/modul/english/elementary/listening/lesson-4'); }} className="flex-1 py-3 rounded-xl font-bold text-white bg-teal-500">Lesson 4 ›</button>
              <button onClick={() => { setShowModal(false); navigate(-1); }} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700">Kembali</button>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col h-[100dvh] bg-slate-50">
        <header className="flex-none bg-white/95 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100 shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg></button>
            <div className="text-center"><h1 className="text-sm font-bold text-slate-800">Belanja & Layanan</h1><p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">Elementary Listening • L3</p></div>
            <button onClick={() => navigate('/modul/english/elementary/listening/lesson-4')} className="px-3 h-9 rounded-full text-xs font-bold text-white bg-teal-500">Next ›</button>
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
                  <h2 className="text-lg font-extrabold mb-1">🛍️ Belanja & Layanan</h2>
                  <p className="text-sm text-teal-100">Pahami percakapan di toko: ukuran, harga, diskon, dan kebijakan pengembalian.</p>
                </div>
                <div className="bg-white rounded-2xl border border-sky-100 shadow-sm p-4">
                  <p className="text-xs font-extrabold text-teal-700 uppercase tracking-wide mb-3">📖 Kosakata Penting</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[{en:'Larger size',id:'Ukuran lebih besar'},{en:'Discount',id:'Diskon'},{en:'Return / Refund',id:'Retur / Uang kembali'},{en:'Receipt',id:'Struk / Nota'},{en:'Pay by card',id:'Bayar dengan kartu'},{en:'Cashier',id:'Kasir'}].map(v => (<div key={v.en} className="bg-slate-50 rounded-xl px-3 py-2"><p className="text-xs font-extrabold text-slate-800">{v.en}</p><p className="text-xs text-teal-600">{v.id}</p></div>))}
                  </div>
                </div>
                <DialoguePlayer title="Percakapan: Di Toko Pakaian" lines={DIALOGUE} />
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
