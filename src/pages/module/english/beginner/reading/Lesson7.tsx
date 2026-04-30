import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine, ReadingCard, ComprehensionSection, getCompletedReadingLessons, markReadingComplete } from './readingUtils';
import type { QuizItem, ComprehensionQ } from './readingUtils';

const QUIZ: QuizItem[] = [
  { q: '"STEP 1:" pada petunjuk penggunaan artinya...', opts: ['Langkah terakhir', 'Langkah pertama', 'Langkah pilihan', 'Langkah utama'], ans: 'Langkah pertama', exp: '"Step 1" = langkah pertama dalam instruksi urutan.' },
  { q: '"DO NOT" pada instruksi artinya...', opts: ['Lakukan segera', 'Boleh dilakukan', 'Jangan dilakukan', 'Harus dilakukan'], ans: 'Jangan dilakukan', exp: '"Do not" = jangan / dilarang.' },
  { q: '"Turn left at the traffic light." artinya...', opts: ['Belok kanan di lampu merah', 'Belok kiri di lampu merah/traffic light', 'Lurus terus', 'Putar balik'], ans: 'Belok kiri di lampu merah/traffic light', exp: '"Turn left" = belok kiri. "Traffic light" = lampu lalu lintas.' },
  { q: '"KEEP OUT OF REACH OF CHILDREN" artinya...', opts: ['Aman untuk anak-anak', 'Jauhkan dari jangkauan anak-anak', 'Untuk anak-anak saja', 'Mainan anak'], ans: 'Jauhkan dari jangkauan anak-anak', exp: 'Ini peringatan keamanan produk berbahaya.' },
  { q: '"ADD WATER AND STIR WELL" artinya...', opts: ['Tambahkan gula dan aduk', 'Tambahkan air panas saja', 'Tambahkan air dan aduk dengan baik', 'Tuangkan dan biarkan'], ans: 'Tambahkan air dan aduk dengan baik', exp: '"Add" = tambahkan. "Stir" = aduk. "Well" = dengan baik.' },
  { q: '"WARNING: HOT SURFACE" artinya...', opts: ['Permukaan dingin', 'Peringatan: permukaan panas', 'Jangan sentuh', 'Area berbahaya'], ans: 'Peringatan: permukaan panas', exp: '"Warning" = peringatan. "Hot surface" = permukaan panas.' },
  { q: '"Go straight for 500 meters." artinya...', opts: ['Belok kanan 500 meter', 'Lurus terus sejauh 500 meter', 'Mundur 500 meter', 'Belok kiri 500 meter'], ans: 'Lurus terus sejauh 500 meter', exp: '"Go straight" = lurus terus. "For 500 meters" = sejauh 500 meter.' },
  { q: '"PRESS TO OPEN" artinya...', opts: ['Tarik untuk buka', 'Dorong untuk buka', 'Tekan untuk buka', 'Putar untuk buka'], ans: 'Tekan untuk buka', exp: '"Press" = tekan.' },
  { q: '"HANDLE WITH CARE" artinya...', opts: ['Lempar dengan hati-hati', 'Tangani dengan hati-hati', 'Simpan dengan aman', 'Buka dengan hati-hati'], ans: 'Tangani dengan hati-hati', exp: '"Handle" = tangani/perlakukan. "With care" = dengan hati-hati.' },
  { q: '"BEFORE USE, READ INSTRUCTIONS" artinya...', opts: ['Setelah digunakan, baca instruksi', 'Sebelum digunakan, baca instruksi', 'Selama digunakan, baca instruksi', 'Hapus instruksi'], ans: 'Sebelum digunakan, baca instruksi', exp: '"Before use" = sebelum digunakan.' },
  { q: '"Turn right at the hospital." artinya...', opts: ['Belok kiri di rumah sakit', 'Lurus terus di rumah sakit', 'Belok kanan di rumah sakit', 'Berhenti di rumah sakit'], ans: 'Belok kanan di rumah sakit', exp: '"Turn right" = belok kanan.' },
  { q: '"INSERT COIN HERE" artinya...', opts: ['Ambil koin di sini', 'Masukkan koin di sini', 'Tukar koin di sini', 'Simpan koin di sini'], ans: 'Masukkan koin di sini', exp: '"Insert" = masukkan. "Coin" = koin.' },
  { q: '"KEEP AWAY FROM FIRE" artinya...', opts: ['Jauhkan dari api', 'Dekatkan ke api untuk mengaktifkan', 'Simpan di tempat panas', 'Gunakan dekat api'], ans: 'Jauhkan dari api', exp: '"Keep away from" = jauhkan dari.' },
  { q: '"The pharmacy is next to the bank." artinya...', opts: ['Apotek ada di dalam bank', 'Apotek ada di sebelah bank', 'Apotek ada di atas bank', 'Apotek ada di depan bank'], ans: 'Apotek ada di sebelah bank', exp: '"Next to" = di sebelah / berdampingan dengan.' },
  { q: '"SHAKE WELL, THEN REFRIGERATE" artinya...', opts: ['Dinginkan, lalu kocok', 'Kocok dahulu, lalu dinginkan', 'Hanya kocok saja', 'Hanya dinginkan saja'], ans: 'Kocok dahulu, lalu dinginkan', exp: '"Shake well" = kocok dengan baik. "Then" = lalu/kemudian. "Refrigerate" = dinginkan.' },
  { q: '"The bus stop is opposite the park." artinya...', opts: ['Halte bus ada di sebelah taman', 'Halte bus ada di dalam taman', 'Halte bus ada di seberang/depan taman', 'Halte bus ada di belakang taman'], ans: 'Halte bus ada di seberang/depan taman', exp: '"Opposite" = di seberang / berhadapan dengan.' },
  { q: '"CAUTION: MAY CAUSE DIZZINESS" artinya...', opts: ['Aman dikonsumsi', 'Hati-hati: dapat menyebabkan pusing', 'Dinginkan sebelum digunakan', 'Jangan diminum'], ans: 'Hati-hati: dapat menyebabkan pusing', exp: '"May cause dizziness" = dapat menyebabkan pusing.' },
  { q: '"ALLOW TO COOL BEFORE OPENING" artinya...', opts: ['Buka secepatnya', 'Biarkan dingin sebelum membuka', 'Panaskan sebelum membuka', 'Jangan dibuka'], ans: 'Biarkan dingin sebelum membuka', exp: '"Allow to cool" = biarkan menjadi dingin. "Before opening" = sebelum membuka.' },
  { q: '"Take the second street on the right." artinya...', opts: ['Belok di jalan pertama kanan', 'Ambil jalan kedua di sebelah kanan', 'Jalan terus 2 blok', 'Belok kiri dua kali'], ans: 'Ambil jalan kedua di sebelah kanan', exp: '"Second street" = jalan kedua. "On the right" = di sebelah kanan.' },
  { q: '"FOR EXTERNAL USE ONLY" artinya...', opts: ['Bisa diminum', 'Hanya untuk pemakaian luar/oles', 'Untuk semua penggunaan', 'Untuk internal perusahaan'], ans: 'Hanya untuk pemakaian luar/oles', exp: '"External use only" = hanya untuk dioleskan di luar tubuh (tidak diminum).' },
];

const INSTRUCTION_PASSAGE = {
  passageTitle: '📋 Bacaan: Petunjuk & Arah',
  passage: (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
        <p className="font-extrabold text-blue-800 mb-3 text-sm">📍 How to Get to City Hospital</p>
        <div className="space-y-2 text-sm text-slate-700">
          <p>🟢 <b>Step 1:</b> Exit the hotel, turn <b>left</b> onto Jalan Sudirman.</p>
          <p>🟢 <b>Step 2:</b> Go straight for about <b>500 meters</b>.</p>
          <p>🟢 <b>Step 3:</b> Turn <b>right</b> at the traffic light (near Indomaret).</p>
          <p>🟢 <b>Step 4:</b> The hospital is on your <b>left</b>, next to the park.</p>
          <p className="mt-2 text-xs text-blue-500 italic">Total walking time: approximately 10 minutes.</p>
        </div>
      </div>
    </div>
  ),
  questions: [
    { q: 'Dari hotel, kamu harus belok ke mana dulu?', opts: ['Kanan', 'Kiri', 'Lurus', 'Putar balik'], ans: 'Kiri' },
    { q: 'Seberapa jauh kamu harus berjalan lurus?', opts: ['200 meter', '300 meter', '500 meter', '1 kilometer'], ans: '500 meter' },
    { q: 'Di mana kamu belok kanan?', opts: ['Di depan taman', 'Di lampu merah dekat Indomaret', 'Di depan hotel', 'Di perempatan utama'], ans: 'Di lampu merah dekat Indomaret' },
    { q: 'Rumah sakit ada di sisi mana jalan?', opts: ['Kanan', 'Kiri', 'Tengah jalan', 'Di persimpangan'], ans: 'Kiri' },
    { q: 'Berapa lama perkiraan waktu berjalan kaki?', opts: ['5 menit', '10 menit', '15 menit', '20 menit'], ans: '10 menit' },
  ] as ComprehensionQ[],
};

const ReadingLesson7: React.FC = () => {
  const navigate = useNavigate();
  const nextPath = '/modul/english/beginner/reading/lesson-8';
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedReadingLessons().includes(7));
  const [showModal, setShowModal] = React.useState(false);
  const [activeTab, setActiveTab] = useState<'baca' | 'latihan' | 'kuis'>('baca');
  const handleComplete = () => { markReadingComplete(7); setIsCompleted(true); setShowModal(true); };

  const directions = [
    { en: 'Turn left', id: 'Belok kiri', icon: '⬅️' }, { en: 'Turn right', id: 'Belok kanan', icon: '➡️' },
    { en: 'Go straight', id: 'Lurus terus', icon: '⬆️' }, { en: 'U-turn', id: 'Putar balik', icon: '🔄' },
    { en: 'Next to', id: 'Di sebelah', icon: '↔️' }, { en: 'Opposite', id: 'Di seberang', icon: '↕️' },
    { en: 'Between', id: 'Di antara', icon: '◀️▶️' }, { en: 'At the corner', id: 'Di sudut jalan', icon: '📍' },
  ];

  const warnings = [
    { sign: 'WARNING', type: 'danger' as const, icon: '⚠️' }, { sign: 'CAUTION', type: 'warning' as const, icon: '🟡' },
    { sign: 'DO NOT', type: 'danger' as const, icon: '🚫' }, { sign: 'KEEP OUT', type: 'danger' as const, icon: '⛔' },
  ];

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)' }} onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg,#4FA3D1,#1E6F9F)' }}><span style={{ fontSize: 38 }}>🏆</span></div>
            <h2 className="text-xl font-extrabold mb-1">Lesson 7 Selesai! 🎉</h2>
            <p className="text-sm text-gray-500 mb-5">Kamu sudah bisa membaca petunjuk dan arah!</p>
            <div className="flex gap-3">
              <button onClick={() => { setShowModal(false); navigate(nextPath); }} className="flex-1 py-3 rounded-xl font-bold text-white bg-green-500">Lesson 8 ›</button>
              <button onClick={() => { setShowModal(false); navigate(-1); }} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700">Kembali</button>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col h-[100dvh] md:h-full bg-slate-50">
        <header className="flex-none bg-white/95 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100 shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg></button>
            <div className="text-center"><h1 className="text-sm font-bold text-slate-800">Petunjuk & Instruksi</h1><p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">Reading • Lesson 7</p></div>
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
                  <h2 className="text-lg font-extrabold mb-1">Petunjuk & Instruksi</h2>
                  <p className="text-sm text-green-100">Pelajari cara memahami petunjuk penggunaan produk dan petunjuk arah. Sangat berguna saat bepergian!</p>
                </div>
                <ReadingCard title="🗺️ Kata Arah" icon="🧭">
                  <div className="grid grid-cols-2 gap-2">
                    {directions.map(d => (<div key={d.en} className="bg-slate-50 rounded-xl px-3 py-2 flex items-center gap-2"><span className="text-lg">{d.icon}</span><div><p className="text-xs font-extrabold text-slate-800">{d.en}</p><p className="text-xs text-green-600">{d.id}</p></div></div>))}
                  </div>
                </ReadingCard>
                <ReadingCard title="⚠️ Kata-kata Peringatan" icon="🚨">
                  <div className="grid grid-cols-2 gap-3">
                    {warnings.map(w => (<div key={w.sign} className="bg-red-50 border border-red-200 rounded-xl p-3 text-center"><span className="text-2xl">{w.icon}</span><p className="text-sm font-extrabold text-red-700 mt-1">{w.sign}</p></div>))}
                  </div>
                  <p className="text-xs text-slate-400 mt-3 text-center">Perhatikan selalu tanda-tanda ini untuk keselamatanmu!</p>
                </ReadingCard>
                <ReadingCard title="📋 Kata Urutan Instruksi" icon="🔢">
                  <div className="space-y-2 text-sm">
                    {[
                      { en: 'First / Step 1', id: 'Pertama / Langkah 1' },
                      { en: 'Then / Next', id: 'Lalu / Selanjutnya' },
                      { en: 'After that', id: 'Setelah itu' },
                      { en: 'Finally / Lastly', id: 'Akhirnya / Terakhir' },
                    ].map((w, i) => (<div key={i} className="flex items-center gap-3 bg-green-50 rounded-xl px-3 py-2"><span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span><div><p className="font-bold text-slate-800 text-xs">{w.en}</p><p className="text-xs text-green-700">{w.id}</p></div></div>))}
                  </div>
                </ReadingCard>
              </>
            )}
            {activeTab === 'latihan' && <ComprehensionSection {...INSTRUCTION_PASSAGE} />}
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

export default ReadingLesson7;
