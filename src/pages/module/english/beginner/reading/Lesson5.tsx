import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine, ReadingCard, ComprehensionSection, getCompletedReadingLessons, markReadingComplete } from './readingUtils';
import type { QuizItem, ComprehensionQ } from './readingUtils';

const QUIZ: QuizItem[] = [
  { q: '"MENU" di restoran adalah...', opts: ['Bill/tagihan', 'Petunjuk keluar', 'Daftar makanan & minuman', 'Nama restoran'], ans: 'Daftar makanan & minuman', exp: '"Menu" = daftar makanan dan minuman beserta harganya.' },
  { q: 'Pada menu: "Nasi Goreng — Rp 35,000" artinya...', opts: ['Nasi goreng harganya Rp 35.000', 'Nasi goreng habis', 'Nasi goreng gratis', 'Nasi goreng diskon'], ans: 'Nasi goreng harganya Rp 35.000', exp: '"—" setelah nama makanan biasanya menunjukkan harga.' },
  { q: '"VEGETARIAN" pada menu artinya...', opts: ['Hidangan laut', 'Hidangan ayam', 'Khusus daging', 'Tidak mengandung daging/ikan'], ans: 'Tidak mengandung daging/ikan', exp: '"Vegetarian" = hidangan tanpa daging/ikan, cocok untuk vegetarian.' },
  { q: '"TODAY\'S SPECIAL" pada menu artinya...', opts: ['Menu paling mahal', 'Menu spesial hari ini', 'Menu yang selalu ada', 'Menu terlaris'], ans: 'Menu spesial hari ini', exp: '"Today\'s special" = hidangan spesial yang tersedia hari ini saja.' },
  { q: '"DESSERT" pada menu artinya...', opts: ['Hidangan pembuka', 'Minuman', 'Makanan penutup/manis', 'Hidangan utama'], ans: 'Makanan penutup/manis', exp: '"Dessert" = hidangan penutup (kue, es krim, pudding, dll).' },
  { q: '"SPICY" pada menu artinya...', opts: ['Manis', 'Asam', 'Asin', 'Pedas'], ans: 'Pedas', exp: '"Spicy" = pedas.' },
  { q: '"FREE REFILL" pada minuman artinya...', opts: ['Minuman gratis', 'Diskon minuman', 'Isi ulang berbayar', 'Isi ulang gratis'], ans: 'Isi ulang gratis', exp: '"Free refill" = isi ulang gratis (bisa minta tambah tanpa bayar lagi).' },
  { q: '"APPETIZER" pada menu artinya...', opts: ['Hidangan utama', 'Makanan penutup', 'Hidangan pembuka', 'Minuman'], ans: 'Hidangan pembuka', exp: '"Appetizer" = hidangan pembuka yang disajikan sebelum hidangan utama.' },
  { q: '"MAIN COURSE" pada menu adalah...', opts: ['Hidangan utama', 'Minuman', 'Makanan penutup', 'Hidangan pembuka'], ans: 'Hidangan utama', exp: '"Main course" = hidangan utama.' },
  { q: '"SERVICE CHARGE: 10%" pada tagihan artinya...', opts: ['Biaya pelayanan 10%', 'Tip 10%', 'Diskon 10%', 'Pajak 10%'], ans: 'Biaya pelayanan 10%', exp: '"Service charge" = biaya pelayanan yang ditambahkan ke tagihan.' },
  { q: '"SET MENU" pada restoran artinya...', opts: ['Menu ala carte', 'Paket menu lengkap', 'Menu harian', 'Menu eksklusif'], ans: 'Paket menu lengkap', exp: '"Set menu" = paket menu lengkap (biasanya lebih hemat).' },
  { q: '"GRILLED" pada menu artinya...', opts: ['Direbus', 'Dikukus', 'Dipanggang/dibakar', 'Digoreng'], ans: 'Dipanggang/dibakar', exp: '"Grilled" = dipanggang atau dibakar (di atas panggangan).' },
  { q: '"PORTION: SMALL / LARGE" artinya...', opts: ['Porsi: kecil/besar', 'Harga: murah/mahal', 'Waktu: cepat/lama', 'Rasa: ringan/berat'], ans: 'Porsi: kecil/besar', exp: '"Portion" = porsi/ukuran sajian.' },
  { q: '"BILL / CHECK" di restoran adalah...', opts: ['Struk pembayaran/tagihan', 'Resep makanan', 'Daftar menu', 'Meja pesanan'], ans: 'Struk pembayaran/tagihan', exp: '"Bill" atau "check" = tagihan/nota pembayaran.' },
  { q: '"FRIED" pada menu artinya...', opts: ['Direbus', 'Dikukus', 'Digoreng', 'Dipanggang'], ans: 'Digoreng', exp: '"Fried" = digoreng. Contoh: fried chicken = ayam goreng.' },
  { q: '"PRICE LIST" adalah...', opts: ['Daftar harga', 'Daftar makanan', 'Daftar tamu', 'Daftar bahan'], ans: 'Daftar harga', exp: '"Price list" = daftar harga barang atau layanan.' },
  { q: '"TAX INCLUDED" artinya...', opts: ['Pajak belum termasuk', 'Bebas pajak', 'Pajak sudah termasuk', 'Harga plus pajak'], ans: 'Pajak sudah termasuk', exp: '"Tax included" = harga sudah termasuk pajak.' },
  { q: '"STEAMED" pada menu artinya...', opts: ['Dipanggang', 'Diasap', 'Dikukus', 'Digoreng'], ans: 'Dikukus', exp: '"Steamed" = dikukus.' },
  { q: '"HALF PRICE" artinya...', opts: ['Harga normal', 'Harga penuh', 'Setengah harga', 'Dua kali harga'], ans: 'Setengah harga', exp: '"Half price" = setengah harga = diskon 50%.' },
  { q: '"TAKEAWAY / TO GO" pada menu artinya...', opts: ['Dibawa pulang', 'Makan di tempat', 'Reservasi meja', 'Pesan antar'], ans: 'Dibawa pulang', exp: '"Takeaway" atau "to go" = pesan untuk dibawa pulang.' },
];

const MENU_PASSAGE = {
  passageTitle: '🍽️ Bacaan: Menu Restoran',
  passage: (
    <div className="space-y-3">
      <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-5">
        <p className="text-center font-extrabold text-amber-800 text-lg mb-1">🍽️ WARUNG NUSANTARA</p>
        <p className="text-center text-xs text-amber-600 mb-4">Authentic Indonesian Cuisine</p>
        <div className="space-y-4">
          {[
            { cat: '🥗 Appetizer', items: [{ n: 'Gado-Gado', p: 'Rp 25,000' }, { n: 'Spring Roll', p: 'Rp 20,000' }] },
            { cat: '🍛 Main Course', items: [{ n: 'Nasi Goreng Special', p: 'Rp 45,000' }, { n: 'Soto Ayam', p: 'Rp 40,000' }, { n: 'Grilled Fish', p: 'Rp 55,000' }] },
            { cat: '🧃 Drinks', items: [{ n: 'Fresh Orange Juice', p: 'Rp 20,000' }, { n: 'Iced Tea', p: 'Rp 15,000' }] },
          ].map(cat => (
            <div key={cat.cat}>
              <p className="text-xs font-extrabold text-amber-700 mb-1.5">{cat.cat}</p>
              {cat.items.map(item => (
                <div key={item.n} className="flex justify-between text-sm items-center py-1 border-b border-amber-100">
                  <span className="text-slate-700">{item.n}</span>
                  <span className="font-bold text-amber-800">{item.p}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <p className="text-xs text-center text-amber-500 mt-3">Service charge 10% | Tax included</p>
      </div>
    </div>
  ),
  questions: [
    { q: 'Menu manakah yang termasuk hidangan pembuka (Appetizer)?', opts: ['Soto Ayam', 'Nasi Goreng Special', 'Iced Tea', 'Gado-Gado'], ans: 'Gado-Gado' },
    { q: 'Berapa harga Grilled Fish?', opts: ['Rp 50.000', 'Rp 55.000', 'Rp 45.000', 'Rp 40.000'], ans: 'Rp 55.000' },
    { q: 'Restoran ini menyajikan makanan jenis apa?', opts: ['Japanese cuisine', 'Western cuisine', 'Chinese cuisine', 'Indonesian cuisine'], ans: 'Indonesian cuisine' },
    { q: 'Berapa service charge yang dikenakan?', opts: ['Gratis', '5%', '10%', '15%'], ans: '10%' },
    { q: 'Minuman paling murah di menu ini adalah?', opts: ['Soto Ayam', 'Fresh Orange Juice', 'Iced Tea', 'Spring Roll'], ans: 'Iced Tea' },
  ] as ComprehensionQ[],
};

const ReadingLesson5: React.FC = () => {
  const navigate = useNavigate();
  const nextPath = '/modul/english/beginner/reading/lesson-6';
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedReadingLessons().includes(5));
  const [showModal, setShowModal] = React.useState(false);
  const [activeTab, setActiveTab] = useState<'baca' | 'latihan' | 'kuis'>('baca');
  const handleComplete = () => { markReadingComplete(5); setIsCompleted(true); setShowModal(true); };

  const menuTerms = [
    { en: 'Appetizer', id: 'Hidangan Pembuka' }, { en: 'Main Course', id: 'Hidangan Utama' },
    { en: 'Dessert', id: 'Makanan Penutup' }, { en: 'Beverage / Drinks', id: 'Minuman' },
    { en: 'Set Menu', id: 'Paket Makan Lengkap' }, { en: 'A la Carte', id: 'Pesan Satuan' },
    { en: 'Today\'s Special', id: 'Spesial Hari Ini' }, { en: 'Free Refill', id: 'Isi Ulang Gratis' },
  ];
  const cookingTerms = [
    { en: 'Fried', id: 'Digoreng' }, { en: 'Grilled', id: 'Dipanggang' },
    { en: 'Steamed', id: 'Dikukus' }, { en: 'Boiled', id: 'Direbus' },
    { en: 'Baked', id: 'Dipanggang di oven' }, { en: 'Spicy', id: 'Pedas' },
  ];

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)' }} onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg,#4FA3D1,#1E6F9F)' }}><span style={{ fontSize: 38 }}>🏆</span></div>
            <h2 className="text-xl font-extrabold mb-1">Lesson 5 Selesai! 🎉</h2>
            <p className="text-sm text-gray-500 mb-5">Kamu sudah bisa membaca menu restoran!</p>
            <div className="flex gap-3">
              <button onClick={() => { setShowModal(false); navigate(nextPath); }} className="flex-1 py-3 rounded-xl font-bold text-white bg-green-500">Lesson 6 ›</button>
              <button onClick={() => { setShowModal(false); navigate(-1); }} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700">Kembali</button>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col h-[100dvh] md:h-full bg-slate-50">
        <header className="flex-none bg-white/95 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100 shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg></button>
            <div className="text-center"><h1 className="text-sm font-bold text-slate-800">Menu & Daftar Harga</h1><p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">Reading • Lesson 5</p></div>
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
                  <h2 className="text-lg font-extrabold mb-1">Menu & Daftar Harga</h2>
                  <p className="text-sm text-green-100">Pelajari kosakata di menu restoran dan daftar harga — sangat berguna saat makan di luar negeri!</p>
                </div>
                <ReadingCard title="🍽️ Bagian-bagian Menu" icon="📋">
                  <div className="grid grid-cols-2 gap-2">
                    {menuTerms.map(t => (<div key={t.en} className="bg-slate-50 rounded-xl px-3 py-2.5"><p className="text-xs font-extrabold text-slate-800">{t.en}</p><p className="text-xs text-green-600">{t.id}</p></div>))}
                  </div>
                </ReadingCard>
                <ReadingCard title="👨‍🍳 Cara Memasak (Cooking Methods)" icon="🔥">
                  <div className="grid grid-cols-2 gap-2">
                    {cookingTerms.map(t => (<div key={t.en} className="bg-amber-50 rounded-xl px-3 py-2.5"><p className="text-xs font-extrabold text-amber-800">{t.en}</p><p className="text-xs text-amber-600">{t.id}</p></div>))}
                  </div>
                </ReadingCard>
                <ReadingCard title="💰 Istilah Pembayaran" icon="💳">
                  <div className="space-y-2 text-sm">
                    {[
                      { en: 'Bill / Check', id: 'Tagihan / Nota', icon: '🧾' },
                      { en: 'Service Charge', id: 'Biaya pelayanan', icon: '💼' },
                      { en: 'Tax Included', id: 'Sudah termasuk pajak', icon: '📊' },
                      { en: 'Cash Only', id: 'Hanya tunai', icon: '💵' },
                      { en: 'Card Accepted', id: 'Kartu diterima', icon: '💳' },
                    ].map(i => (<div key={i.en} className="flex items-center gap-3 bg-slate-50 rounded-xl px-3 py-2"><span className="text-xl">{i.icon}</span><div><p className="font-bold text-slate-800 text-xs">{i.en}</p><p className="text-xs text-green-600">{i.id}</p></div></div>))}
                  </div>
                </ReadingCard>
              </>
            )}
            {activeTab === 'latihan' && <ComprehensionSection {...MENU_PASSAGE} />}
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

export default ReadingLesson5;
