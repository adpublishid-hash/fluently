import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine, ReadingCard, ComprehensionSection, getCompletedReadingLessons, markReadingComplete } from './readingUtils';
import type { QuizItem, ComprehensionQ } from './readingUtils';

const QUIZ: QuizItem[] = [
  { q: '"GRAND OPENING" pada poster toko artinya...', opts: ['Renovasi', 'Penutupan toko', 'Pembukaan perdana', 'Pindah lokasi'], ans: 'Pembukaan perdana', exp: '"Grand Opening" = pembukaan perdana / acara besar pertama kali.' },
  { q: '"50% OFF" pada iklan artinya...', opts: ['Diskon 50%', 'Harga naik 50%', 'Gratis 50 item', 'Beli 2 diskon 50'], ans: 'Diskon 50%', exp: '"OFF" dalam konteks harga = potongan harga. "50% off" = diskon 50%.' },
  { q: '"BUY 1 GET 1 FREE" artinya...', opts: ['Gratis 1 produk', 'Beli 2 bayar 1', 'Beli 1 dapat 1 gratis', 'Beli 1 diskon 50%'], ans: 'Beli 1 dapat 1 gratis', exp: '"Buy 1 Get 1 Free" = BOGO = beli satu dapat satu gratis.' },
  { q: '"COMING SOON" pada poster artinya...', opts: ['Sudah hadir', 'Tidak tersedia', 'Sudah habis', 'Segera hadir'], ans: 'Segera hadir', exp: '"Coming soon" = segera hadir / akan datang segera.' },
  { q: '"LIMITED OFFER" artinya...', opts: ['Penawaran terbatas', 'Penawaran tak terbatas', 'Penawaran khusus', 'Penawaran tetap'], ans: 'Penawaran terbatas', exp: '"Limited offer" = penawaran terbatas (stok atau waktu).' },
  { q: '"FREE DELIVERY" artinya...', opts: ['Pengiriman gratis', 'Ambil sendiri', 'Pengiriman cepat', 'Pengiriman berbayar'], ans: 'Pengiriman gratis', exp: '"Free delivery" = pengiriman/ongkir gratis.' },
  { q: '"SPECIAL PRICE" artinya...', opts: ['Harga spesial/murah', 'Harga mahal', 'Harga penuh', 'Harga normal'], ans: 'Harga spesial/murah', exp: '"Special price" = harga khusus yang lebih murah dari biasanya.' },
  { q: '"LIVE MUSIC" pada poster acara artinya...', opts: ['Musik langsung/live', 'Musik klasik', 'Tidak ada musik', 'Rekaman musik'], ans: 'Musik langsung/live', exp: '"Live music" = penampilan musik secara langsung.' },
  { q: '"ADMISSION FREE" pada poster artinya...', opts: ['Masuk berbayar', 'Tiket mahal', 'Tempat terbatas', 'Masuk gratis'], ans: 'Masuk gratis', exp: '"Admission free" = gratis masuk / tidak dipungut biaya masuk.' },
  { q: '"VALID UNTIL" pada kupon artinya...', opts: ['Berlaku mulai', 'Berlaku hingga', 'Tidak berlaku', 'Berlaku selamanya'], ans: 'Berlaku hingga', exp: '"Valid until" = berlaku sampai dengan tanggal tertentu.' },
  { q: '"NEW ARRIVAL" pada toko pakaian artinya...', opts: ['Produk diskon', 'Produk terlaris', 'Produk lama', 'Produk baru datang'], ans: 'Produk baru datang', exp: '"New arrival" = produk yang baru tiba/masuk stok.' },
  { q: '"CLEARANCE SALE" artinya...', opts: ['Penjualan normal', 'Obral/cuci gudang', 'Penjualan eksklusif', 'Peluncuran produk'], ans: 'Obral/cuci gudang', exp: '"Clearance sale" = obral untuk menghabiskan stok lama.' },
  { q: '"TERMS AND CONDITIONS APPLY" artinya...', opts: ['Syarat dan ketentuan berlaku', 'Gratis tanpa syarat', 'Syarat mudah', 'Berlaku tanpa syarat'], ans: 'Syarat dan ketentuan berlaku', exp: '"Terms and conditions apply" = ada syarat dan ketentuan.' },
  { q: '"SOLD OUT" artinya...', opts: ['Habis terjual', 'Baru masuk', 'Tersedia banyak', 'Sedang promo'], ans: 'Habis terjual', exp: '"Sold out" = habis / kehabisan stok.' },
  { q: '"HURRY! LAST 3 DAYS" artinya...', opts: ['Masih 30 hari', 'Cepat! Tinggal 3 hari lagi', 'Dimulai 3 hari lagi', 'Sudah berakhir'], ans: 'Cepat! Tinggal 3 hari lagi', exp: '"Hurry" = cepat. "Last 3 days" = tinggal 3 hari lagi.' },
  { q: '"ALL ITEMS" dalam katalog artinya...', opts: ['1 item', 'Semua item', 'Item terpilih', 'Item mahal'], ans: 'Semua item', exp: '"All items" = semua produk/barang.' },
  { q: '"FLASH SALE" artinya...', opts: ['Penjualan lambat', 'Penjualan malam', 'Promo kilat/terbatas waktu', 'Obral besar'], ans: 'Promo kilat/terbatas waktu', exp: '"Flash sale" = promo terbatas waktu yang sangat singkat.' },
  { q: '"ENTER HERE" pada poster artinya...', opts: ['Beli di sini', 'Daftar di sini', 'Keluar di sini', 'Masuk di sini'], ans: 'Masuk di sini', exp: '"Enter here" = masuk di sini.' },
  { q: '"DISCOUNT" artinya...', opts: ['Kenaikan harga', 'Potongan harga', 'Harga khusus VIP', 'Harga penuh'], ans: 'Potongan harga', exp: '"Discount" = potongan harga / diskon.' },
  { q: '"WIN BIG PRIZES" pada poster artinya...', opts: ['Menangkan hadiah besar', 'Menang hadiah kecil', 'Tukar hadiah', 'Beli hadiah besar'], ans: 'Menangkan hadiah besar', exp: '"Win big prizes" = menangkan hadiah-hadiah besar.' },
];

const POSTER_DATA = {
  passageTitle: '📋 Bacaan: Poster Bazaar',
  passage: (
    <div className="space-y-3 text-sm text-slate-700">
      <div className="bg-purple-50 border-2 border-purple-300 rounded-2xl p-5 text-center">
        <p className="text-3xl mb-1">🎪</p>
        <p className="text-2xl font-extrabold text-purple-800 uppercase">GRAND BAZAAR</p>
        <p className="font-bold text-purple-700 mt-1">Saturday, April 20th | 10 AM – 9 PM</p>
        <div className="flex justify-center gap-2 mt-2 flex-wrap">
          {['🍔 Food', '👗 Fashion', '🎵 Entertainment'].map(t => (
            <span key={t} className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">{t}</span>
          ))}
        </div>
        <p className="mt-3 font-extrabold text-red-500 text-lg">ADMISSION FREE!</p>
        <p className="text-xs text-purple-500 mt-1">🎸 Live Music at 7 PM</p>
        <p className="text-xs text-purple-400 mt-1">Valid until stock lasts</p>
      </div>
    </div>
  ),
  questions: [
    { q: 'Acara ini diadakan pada hari apa?', opts: ['Sabtu', 'Senin', 'Jumat', 'Minggu'], ans: 'Sabtu' },
    { q: 'Jam berapa bazaar dimulai?', opts: ['9 AM', '10 AM', '11 AM', '8 AM'], ans: '10 AM' },
    { q: 'Berapa biaya masuk ke bazaar?', opts: ['Rp 100.000', 'Tidak disebutkan', 'Gratis', 'Rp 50.000'], ans: 'Gratis' },
    { q: 'Pukul berapa live music diadakan?', opts: ['7 PM', '6 PM', '5 PM', '8 PM'], ans: '7 PM' },
    { q: 'Apa saja yang ada di bazaar ini?', opts: ['Hanya makanan', 'Pakaian saja', 'Hanya musik', 'Food, Fashion, Entertainment'], ans: 'Food, Fashion, Entertainment' },
  ] as ComprehensionQ[],
};

const POSTER_TYPES = [
  { label: 'Poster Acara', items: ['GRAND OPENING', 'LIVE MUSIC', 'ADMISSION FREE', 'COMING SOON', 'DATE & TIME'] },
  { label: 'Iklan Toko', items: ['SALE 50% OFF', 'BUY 1 GET 1', 'NEW ARRIVAL', 'CLEARANCE', 'FLASH SALE'] },
  { label: 'Iklan Digital', items: ['FREE DELIVERY', 'LIMITED OFFER', 'SOLD OUT', 'HURRY!', 'VALID UNTIL...'] },
];

const ReadingLesson3: React.FC = () => {
  const navigate = useNavigate();
  const nextPath = '/modul/english/beginner/reading/lesson-4';
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedReadingLessons().includes(3));
  const [showModal, setShowModal] = React.useState(false);
  const [activeTab, setActiveTab] = useState<'baca' | 'latihan' | 'kuis'>('baca');
  const handleComplete = () => { markReadingComplete(3); setIsCompleted(true); setShowModal(true); };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)' }} onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg,#4FA3D1,#1E6F9F)' }}><span style={{ fontSize: 38 }}>🏆</span></div>
            <h2 className="text-xl font-extrabold mb-1">Lesson 3 Selesai! 🎉</h2>
            <p className="text-sm text-gray-500 mb-5">Kamu sudah bisa membaca poster dan iklan!</p>
            <div className="flex gap-3">
              <button onClick={() => { setShowModal(false); navigate(nextPath); }} className="flex-1 py-3 rounded-xl font-bold text-white bg-green-500">Lesson 4 ›</button>
              <button onClick={() => { setShowModal(false); navigate(-1); }} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700">Kembali</button>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col h-[100dvh] md:h-full bg-slate-50">
        <header className="flex-none bg-white/95 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100 shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg></button>
            <div className="text-center"><h1 className="text-sm font-bold text-slate-800">Poster & Iklan</h1><p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">Reading • Lesson 3</p></div>
            <button onClick={() => navigate(nextPath)} className="px-3 h-9 rounded-full text-xs font-bold text-white bg-green-500">Next ›</button>
          </div>
        </header>
        <div className="flex bg-white border-b border-slate-100 sticky top-[65px] z-10 shadow-sm">
          {(['baca', 'latihan', 'kuis'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-3 text-xs font-bold tracking-wide transition-all ${activeTab === tab ? 'text-green-600 border-b-2 border-sky-500' : 'text-slate-400'}`}>
              {tab === 'baca' ? '📖 Baca' : tab === 'latihan' ? '✏️ Latihan' : '🎯 Kuis'}
            </button>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 pb-28 space-y-5">
            {activeTab === 'baca' && (
              <>
                <div className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl p-5 text-white shadow-lg">
                  <h2 className="text-lg font-extrabold mb-1">Poster & Iklan</h2>
                  <p className="text-sm text-green-100">Pelajari kata-kata kunci yang sering muncul di poster acara, iklan toko, dan promo online!</p>
                </div>
                {POSTER_TYPES.map(cat => (
                  <ReadingCard key={cat.label} title={cat.label} icon="📋">
                    <div className="flex flex-wrap gap-2">
                      {cat.items.map(w => (
                        <span key={w} className="bg-green-50 border border-sky-200 text-green-800 font-bold text-sm px-3 py-1.5 rounded-xl">{w}</span>
                      ))}
                    </div>
                  </ReadingCard>
                ))}
                <ReadingCard title="💡 Pola Kalimat di Iklan" icon="📢">
                  <div className="space-y-2 text-sm">
                    {[
                      { ex: 'BUY NOW, PAY LATER', id: 'Beli sekarang, bayar belakangan' },
                      { ex: 'WHILE STOCKS LAST', id: 'Selagi stok masih ada' },
                      { ex: 'GET 30% OFF YOUR FIRST ORDER', id: 'Dapatkan diskon 30% untuk pesanan pertamamu' },
                      { ex: 'FREE GIFT WITH EVERY PURCHASE', id: 'Hadiah gratis untuk setiap pembelian' },
                    ].map((i, idx) => (
                      <div key={idx} className="bg-slate-50 rounded-xl px-3 py-2.5">
                        <p className="font-mono font-bold text-slate-800 text-xs">{i.ex}</p>
                        <p className="text-xs text-green-600 mt-0.5">{i.id}</p>
                      </div>
                    ))}
                  </div>
                </ReadingCard>
              </>
            )}
            {activeTab === 'latihan' && <ComprehensionSection {...POSTER_DATA} />}
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
};

export default ReadingLesson3;
