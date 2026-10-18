import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine, ReadingCard, ComprehensionSection, getCompletedReadingLessons, markReadingComplete } from './readingUtils';
import type { QuizItem, ComprehensionQ } from './readingUtils';

const QUIZ: QuizItem[] = [
  { q: '"Best Before: 15 May 2025" artinya...', opts: ['Dijual hingga 15 Mei', 'Dibuat 15 Mei', 'Kadaluarsa tepat 15 Mei', 'Terbaik dikonsumsi sebelum 15 Mei'], ans: 'Terbaik dikonsumsi sebelum 15 Mei', exp: '"Best before" = batas waktu terbaik untuk dikonsumsi.' },
  { q: '"NET WEIGHT: 500g" artinya...', opts: ['Volume: 500 ml', 'Berat kotor', 'Berat bersih: 500 gram', 'Berat kemasan'], ans: 'Berat bersih: 500 gram', exp: '"Net weight" = berat bersih (tanpa kemasan).' },
  { q: '"INGREDIENTS:" pada kemasan makanan artinya...', opts: ['Bahan-bahan', 'Petunjuk penyajian', 'Petunjuk penyimpanan', 'Nilai gizi'], ans: 'Bahan-bahan', exp: '"Ingredients" = bahan-bahan yang digunakan dalam produk.' },
  { q: '"KEEP REFRIGERATED" artinya...', opts: ['Simpan di lemari es', 'Jangan dibekukan', 'Simpan di suhu ruang', 'Simpan di tempat kering'], ans: 'Simpan di lemari es', exp: '"Refrigerated" = didinginkan. "Keep refrigerated" = simpan di kulkas.' },
  { q: '"SHAKE WELL BEFORE USE" artinya...', opts: ['Jangan dikocok', 'Buka sebelum digunakan', 'Dinginkan dulu', 'Kocok sebelum digunakan'], ans: 'Kocok sebelum digunakan', exp: '"Shake well before use" = kocok dengan baik sebelum digunakan.' },
  { q: '"PRICE: Rp 25,000" artinya...', opts: ['Diskon Rp 25.000', 'Deposit Rp 25.000', 'Gratis senilai Rp 25.000', 'Harganya Rp 25.000'], ans: 'Harganya Rp 25.000', exp: '"Price" = harga. Ini menunjukkan harga produk tersebut.' },
  { q: '"SUGAR FREE" pada produk artinya...', opts: ['Rendah kalori', 'Mengandung gula', 'Tanpa gula', 'Bebas lemak'], ans: 'Tanpa gula', exp: '"Sugar free" = bebas gula / tidak mengandung gula.' },
  { q: '"MANUFACTURED BY:" artinya...', opts: ['Dijual oleh:', 'Diimpor oleh:', 'Didistribusikan oleh:', 'Diproduksi oleh:'], ans: 'Diproduksi oleh:', exp: '"Manufactured by" = dibuat/diproduksi oleh pabrik tertentu.' },
  { q: '"USE WITHIN 3 DAYS AFTER OPENING" artinya...', opts: ['Buka dalam 3 hari', 'Simpan 3 hari sebelum dibuka', 'Habiskan dalam 3 hari setelah dibuka', 'Beli 3 dalam sehari'], ans: 'Habiskan dalam 3 hari setelah dibuka', exp: '"Use within 3 days after opening" = harus dihabiskan dalam 3 hari setelah dibuka.' },
  { q: '"CALORIES PER SERVING: 200" artinya...', opts: ['200 ml per sajian', '200 protein per sajian', '200 kalori per sajian', '200 gram per sajian'], ans: '200 kalori per sajian', exp: '"Calories per serving" = jumlah kalori dalam satu porsi sajian.' },
  { q: '"STORE IN A COOL, DRY PLACE" artinya...', opts: ['Simpan di kulkas', 'Simpan di freezer', 'Simpan di tempat hangat', 'Simpan di tempat sejuk dan kering'], ans: 'Simpan di tempat sejuk dan kering', exp: '"Cool, dry place" = tempat yang sejuk dan kering (tidak lembab).' },
  { q: '"100% NATURAL" artinya...', opts: ['100% alami', 'Mengandung bahan kimia', 'Buatan pabrik', 'Setengah alami'], ans: '100% alami', exp: '"Natural" = alami. "100% natural" = sepenuhnya terbuat dari bahan alami.' },
  { q: '"GLUTEN FREE" pada kemasan artinya...', opts: ['Bebas gula', 'Mengandung gluten', 'Bebas gluten', 'Bebas lemak'], ans: 'Bebas gluten', exp: '"Gluten free" = bebas gluten.' },
  { q: '"MADE IN JAPAN" artinya...', opts: ['Dijual di Jepang', 'Dikirim dari Jepang', 'Dibuat di Jepang', 'Merek Jepang'], ans: 'Dibuat di Jepang', exp: '"Made in + negara" = diproduksi/dibuat di negara tersebut.' },
  { q: '"EXPIRY DATE" artinya...', opts: ['Tanggal kadaluarsa', 'Tanggal penjualan', 'Tanggal pengiriman', 'Tanggal produksi'], ans: 'Tanggal kadaluarsa', exp: '"Expiry date" = tanggal kadaluarsa produk.' },
  { q: '"SERVING SUGGESTION" pada gambar kemasan artinya...', opts: ['Foto asli produk', 'Saran penyajian', 'Cara memasak', 'Resep makanan'], ans: 'Saran penyajian', exp: '"Serving suggestion" = gambar saran penyajian (bukan foto asli produk).' },
  { q: '"CONTAINS NUTS" artinya...', opts: ['Mengandung kacang', 'Bebas kacang', 'Dibuat dari kacang', 'Rasa kacang'], ans: 'Mengandung kacang', exp: '"Contains nuts" = mengandung kacang (penting untuk alergi).' },
  { q: '"RECYCLABLE PACKAGING" artinya...', opts: ['Kemasan kaca', 'Kemasan plastik tebal', 'Kemasan dapat didaur ulang', 'Kemasan sekali pakai'], ans: 'Kemasan dapat didaur ulang', exp: '"Recyclable" = dapat didaur ulang.' },
  { q: '"LOW FAT" pada kemasan artinya...', opts: ['Bebas kalori', 'Tanpa lemak', 'Rendah lemak', 'Tinggi lemak'], ans: 'Rendah lemak', exp: '"Low fat" = rendah lemak (bukan bebas lemak / "fat free").' },
  { q: '"ORIGINAL PRICE: Rp 100,000 | NOW: Rp 75,000" artinya...', opts: ['Harga tetap', 'Naik Rp 25.000', 'Diskon Rp 25.000', 'Gratis Rp 25.000'], ans: 'Diskon Rp 25.000', exp: 'Harga asli Rp 100.000, sekarang Rp 75.000 = diskon Rp 25.000.' },
];

const LABEL_PASSAGE = {
  passageTitle: '📋 Bacaan: Label Produk',
  passage: (
    <div className="space-y-3">
      <div className="bg-emerald-50 border-2 border-blue-300 rounded-2xl p-5">
        <p className="font-extrabold text-emerald-800 text-center mb-4 text-base">🏷️ PRODUCT LABEL</p>
        <div className="space-y-2.5 text-sm">
          {[
            { label: 'Product', value: 'Healthy Oat Biscuits' },
            { label: 'Net Weight', value: '500g' },
            { label: 'Best Before', value: '15 May 2025' },
            { label: 'Calories/serving', value: '200 kcal' },
            { label: 'Ingredients', value: 'Oats, Wheat, Sugar, Honey' },
            { label: 'Keep', value: 'Refrigerated' },
            { label: 'Made in', value: 'Indonesia' },
            { label: 'Manufactured by', value: 'PT Healthy Foods Indonesia' },
          ].map(row => (
            <div key={row.label} className="flex justify-between items-center border-b border-blue-100 pb-1.5">
              <span className="text-slate-500">{row.label}:</span>
              <b className="text-slate-800 text-right">{row.value}</b>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  questions: [
    { q: 'Sebelum tanggal berapa produk sebaiknya dikonsumsi?', opts: ['31 Desember', 'Tidak disebutkan', '15 Mei 2025', '1 Januari'], ans: '15 Mei 2025' },
    { q: 'Berapa berat bersih produk?', opts: ['250g', '1kg', '500g', '375g'], ans: '500g' },
    { q: 'Di mana produk sebaiknya disimpan?', opts: ['Di oven', 'Di lemari es', 'Di tempat hangat', 'Di bawah sinar matahari'], ans: 'Di lemari es' },
    { q: 'Berapa kalori per sajian?', opts: ['250 kcal', '100 kcal', '150 kcal', '200 kcal'], ans: '200 kcal' },
    { q: 'Produk ini dibuat di negara mana?', opts: ['Singapura', 'Indonesia', 'Thailand', 'Malaysia'], ans: 'Indonesia' },
  ] as ComprehensionQ[],
};

const ReadingLesson4: React.FC = () => {
  const navigate = useNavigate();
  const nextPath = '/modul/english/beginner/reading/lesson-5';
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedReadingLessons().includes(4));
  const [showModal, setShowModal] = React.useState(false);
  const [activeTab, setActiveTab] = useState<'baca' | 'latihan' | 'kuis'>('baca');
  const handleComplete = () => { markReadingComplete(4); setIsCompleted(true); setShowModal(true); };

  const labelTerms = [
    { en: 'Net Weight', id: 'Berat bersih' }, { en: 'Best Before', id: 'Terbaik sebelum' },
    { en: 'Expiry Date', id: 'Tanggal kadaluarsa' }, { en: 'Ingredients', id: 'Bahan-bahan' },
    { en: 'Manufactured by', id: 'Diproduksi oleh' }, { en: 'Calories', id: 'Kalori' },
    { en: 'Serving Size', id: 'Ukuran sajian' }, { en: 'Made in', id: 'Dibuat di' },
    { en: 'Sugar Free', id: 'Bebas gula' }, { en: 'Low Fat', id: 'Rendah lemak' },
    { en: 'Gluten Free', id: 'Bebas gluten' }, { en: 'Keep Refrigerated', id: 'Simpan di kulkas' },
  ];

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)' }} onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg,#4FA3D1,#1E6F9F)' }}><span style={{ fontSize: 38 }}>🏆</span></div>
            <h2 className="text-xl font-extrabold mb-1">Lesson 4 Selesai! 🎉</h2>
            <p className="text-sm text-gray-500 mb-5">Kamu sudah bisa membaca label produk dan kemasan!</p>
            <div className="flex gap-3">
              <button onClick={() => { setShowModal(false); navigate(nextPath); }} className="flex-1 py-3 rounded-xl font-bold text-white bg-green-500">Lesson 5 ›</button>
              <button onClick={() => { setShowModal(false); navigate(-1); }} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700">Kembali</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col h-[100dvh] md:h-full bg-slate-50">
        <header className="flex-none bg-white/95 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100 shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg></button>
            <div className="text-center"><h1 className="text-sm font-bold text-slate-800">Label & Kemasan Produk</h1><p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">Reading • Lesson 4</p></div>
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
                  <h2 className="text-lg font-extrabold mb-1">Label & Kemasan Produk</h2>
                  <p className="text-sm text-green-100">Pelajari cara membaca label produk, kemasan makanan, harga, dan katalog — keahlian penting saat berbelanja!</p>
                </div>
                <ReadingCard title="🏷️ Kosakata Label Produk" icon="📦">
                  <div className="grid grid-cols-2 gap-2">
                    {labelTerms.map(t => (
                      <div key={t.en} className="bg-slate-50 rounded-xl px-3 py-2.5">
                        <p className="text-xs font-extrabold text-slate-800">{t.en}</p>
                        <p className="text-xs text-green-600">{t.id}</p>
                      </div>
                    ))}
                  </div>
                </ReadingCard>
                <ReadingCard title="⚠️ Simbol & Peringatan Kemasan" icon="🔍">
                  <div className="space-y-2">
                    {[
                      { sym: '♻️', text: 'RECYCLABLE', id: 'Dapat didaur ulang' },
                      { sym: '❄️', text: 'KEEP FROZEN', id: 'Simpan beku' },
                      { sym: '☀️', text: 'KEEP OUT OF SUNLIGHT', id: 'Jauhkan dari sinar matahari' },
                      { sym: '💧', text: 'KEEP DRY', id: 'Jaga tetap kering' },
                      { sym: '⬆️', text: 'THIS SIDE UP', id: 'Sisi ini menghadap atas' },
                    ].map(s => (
                      <div key={s.text} className="flex items-center gap-3 bg-amber-50 rounded-xl px-3 py-2">
                        <span className="text-xl shrink-0">{s.sym}</span>
                        <div><p className="text-xs font-bold text-slate-800">{s.text}</p><p className="text-xs text-amber-700">{s.id}</p></div>
                      </div>
                    ))}
                  </div>
                </ReadingCard>
              </>
            )}
            {activeTab === 'latihan' && <ComprehensionSection {...LABEL_PASSAGE} />}
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

export default ReadingLesson4;
