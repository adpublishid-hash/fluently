import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine, ReadingCard, ComprehensionSection, getCompletedReadingLessons, markReadingComplete } from './readingUtils';
import type { QuizItem, ComprehensionQ } from './readingUtils';

const QUIZ: QuizItem[] = [
  { q: '"Hi! How are you?" adalah jenis pesan...', opts: ['Formal', 'Darurat', 'Informal/casual', 'Bisnis'], ans: 'Informal/casual', exp: '"Hi" = sapaan informal. Pesan ini bersifat santai / percakapan sehari-hari.' },
  { q: '"Dear Mr. Santoso," adalah pembuka surat...', opts: ['Sangat informal', 'Formal', 'Darurat', 'Iklan'], ans: 'Formal', exp: '"Dear + gelar + nama" = pembuka surat formal.' },
  { q: '"LOL" dalam pesan singkat artinya...', opts: ['Lots of love', 'Laughing out loud', 'Lots of luck', 'Leave on leave'], ans: 'Laughing out loud', exp: '"LOL" = Laughing Out Loud = tertawa terbahak-bahak (ekspresi humor).' },
  { q: '"Happy Birthday! 🎂" adalah...', opts: ['Kartu undangan', 'Kartu ucapan ulang tahun', 'Pesan bisnis', 'Tagihan'], ans: 'Kartu ucapan ulang tahun', exp: '"Happy Birthday" = selamat ulang tahun.' },
  { q: '"Please call me back ASAP" artinya...', opts: ['Hubungi saya nanti-nanti', 'Hubungi saya secepatnya', 'Jangan hubungi saya', 'Saya yang menghubungi'], ans: 'Hubungi saya secepatnya', exp: '"ASAP" = As Soon As Possible = sesegera mungkin.' },
  { q: '"Wish you were here!" artinya...', opts: ['Saya berharap kamu ada di sini', 'Pergilah dari sini', 'Tetap di sini', 'Kamu sudah di sini'], ans: 'Saya berharap kamu ada di sini', exp: 'Kalimat ini sering ditulis di kartu pos untuk mengatakan kamu merindukan seseorang.' },
  { q: '"FYI" dalam pesan artinya...', opts: ['For Your Information (Sebagai info untukmu)', 'For Your Invitation', 'Find Your ID', 'Free Your Ideas'], ans: 'For Your Information (Sebagai info untukmu)', exp: '"FYI" = For Your Information = sebagai informasi.' },
  { q: '"Congrats! 🎉" adalah singkatan dari...', opts: ['Continue', 'Congratulations (Selamat!)', 'Contact', 'Commerce'], ans: 'Congratulations (Selamat!)', exp: '"Congrats" = singkatan dari "Congratulations" = selamat!' },
  { q: '"Best regards," di akhir pesan berarti...', opts: ['Salam hangat/hormat', 'Sampai jumpa', 'Maaf', 'Terima kasih'], ans: 'Salam hangat/hormat', exp: '"Best regards" = salam hormat (penutup surat formal/semi-formal).' },
  { q: '"BTW" dalam chat artinya...', opts: ['Better to wait', 'By the way (ngomong-ngomong)', 'Between two walls', 'Buy two wins'], ans: 'By the way (ngomong-ngomong)', exp: '"BTW" = By The Way = ngomong-ngomong / oh iya.' },
  { q: '"See you soon!" artinya...', opts: ['Sampai jumpa lagi!', 'Sudah lama tidak bertemu', 'Jangan pergi!', 'Semoga bertemu nanti!'], ans: 'Sampai jumpa lagi!', exp: '"See you soon" = sampai jumpa lagi / sampai bertemu lagi.' },
  { q: '"Warm wishes" di akhir kartu ucapan artinya...', opts: ['Salam dingin', 'Salam hangat', 'Sampai jumpa', 'Terima kasih'], ans: 'Salam hangat', exp: '"Warm wishes" = salam hangat (penutup kartu ucapan yang ramah).' },
  { q: '"OTW" dalam pesan singkat artinya...', opts: ['On The Way (sedang dalam perjalanan)', 'Over The Weekend', 'On Time Waiting', 'One Two Wait'], ans: 'On The Way (sedang dalam perjalanan)', exp: '"OTW" = On The Way = sedang dalam perjalanan menuju suatu tempat.' },
  { q: '"Merry Christmas! 🎄" artinya...', opts: ['Selamat Tahun Baru', 'Selamat Hari Natal', 'Selamat Idul Fitri', 'Selamat Ulang Tahun'], ans: 'Selamat Hari Natal', exp: '"Merry Christmas" = Selamat Hari Natal.' },
  { q: '"Missing you! 😊" artinya...', opts: ['Melupakanmu', 'Merindukan/kangen kamu', 'Menemukanmu', 'Mencarimu'], ans: 'Merindukan/kangen kamu', exp: '"Missing you" = merindukanmu / kangen kamu.' },
  { q: '"TBH" dalam pesan chat artinya...', opts: ['Too Bad Honestly', 'To Be Honest (Jujur saja)', 'Take Back Home', 'Try Better Here'], ans: 'To Be Honest (Jujur saja)', exp: '"TBH" = To Be Honest = jujur saja / sejujurnya.' },
  { q: '"Have a safe trip!" artinya...', opts: ['Selamat jalan-jalan', 'Semoga perjalananmu selamat', 'Hati-hati di jalan', 'Semua jawaban benar'], ans: 'Semua jawaban benar', exp: '"Have a safe trip" = semoga perjalananmu selamat (bisa bermakna semua pilihan itu).' },
  { q: '"P.S." di akhir surat berarti...', opts: ['Please Send', 'Post Script (tambahan informasi di akhir)', 'Pay Service', 'Pretty Soon'], ans: 'Post Script (tambahan informasi di akhir)', exp: '"P.S." = Post Script = pesan tambahan yang ditulis setelah akhir surat.' },
  { q: '"Happy New Year! 🎆" artinya...', opts: ['Selamat Hari Natal', 'Selamat Ulang Tahun', 'Selamat Tahun Baru', 'Selamat Hari Raya'], ans: 'Selamat Tahun Baru', exp: '"Happy New Year" = Selamat Tahun Baru.' },
  { q: '"Take care!" di akhir pesan artinya...', opts: ['Ambil ini!', 'Jaga diri!', 'Perhatikan ini!', 'Bawa ini!'], ans: 'Jaga diri!', exp: '"Take care" = jaga diri ya! (ungkapan perhatian kepada orang lain).' },
];

const MESSAGE_PASSAGE = {
  passageTitle: '📮 Bacaan: Kartu Pos & Pesan Singkat',
  passage: (
    <div className="space-y-4">
      <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-5">
        <p className="font-extrabold text-amber-800 mb-3 text-sm">📮 POSTCARD FROM BALI</p>
        <p className="text-sm text-slate-700 leading-relaxed">
          Hi Mom and Dad! 🌴<br /><br />
          I am in Bali now. The weather is beautiful and warm! Yesterday, I visited Tanah Lot temple — it was amazing.<br /><br />
          The food here is delicious. I ate <i>babi guling</i> and fresh coconut. I bought some souvenirs for you!<br /><br />
          I miss you both. <b>Wish you were here!</b><br /><br />
          Love,<br />
          <b>Rina 💕</b>
        </p>
        <div className="border-t border-amber-200 mt-3 pt-3">
          <p className="text-xs font-bold text-amber-700 mb-1">📬 TO:</p>
          <p className="text-xs text-slate-600">Mr. & Mrs. Santoso<br />Jl. Pahlawan No.5, Surabaya, 60111<br />Indonesia</p>
        </div>
      </div>
      <div className="bg-green-50 border border-sky-200 rounded-2xl p-4">
        <p className="font-extrabold text-green-800 mb-2 text-xs">💬 SMS/Chat Messages:</p>
        <div className="space-y-2">
          {[
            ['Budi', 'Hey! OTW to the office. ETA 10 mins.', 'right'],
            ['Sari', "Ok! BTW, don't forget the meeting at 2PM.", 'left'],
            ['Budi', 'Got it! See you soon 👍', 'right'],
          ].map(([name, msg, side], i) => (
            <div key={i} className={`flex ${side === 'right' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs rounded-2xl px-3 py-2 text-xs ${side === 'right' ? 'bg-green-500 text-white' : 'bg-white border border-slate-200 text-slate-700'}`}>
                {side === 'left' && <p className="font-bold text-green-600 mb-0.5">{name}</p>}
                <p>{msg}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  questions: [
    { q: 'Dari mana Rina mengirim kartu pos?', opts: ['Jakarta', 'Surabaya', 'Bali', 'Lombok'], ans: 'Bali' },
    { q: 'Tempat wisata apa yang Rina kunjungi?', opts: ['Kuta Beach', 'Tanah Lot temple', 'Uluwatu', 'Seminyak'], ans: 'Tanah Lot temple' },
    { q: '"Wish you were here!" artinya...', opts: ['Rina minta dijemput', 'Rina merindukan keluarganya', 'Rina sudah pulang', 'Rina ingin pindah ke Bali'], ans: 'Rina merindukan keluarganya' },
    { q: '"OTW" dalam chat Budi artinya...', opts: ['Sudah tiba', 'Sedang dalam perjalanan', 'Akan berangkat', 'Tidak bisa datang'], ans: 'Sedang dalam perjalanan' },
    { q: '"ETA 10 mins" artinya...', opts: ['Terlambat 10 menit', 'Perkiraan tiba 10 menit lagi', 'Butuh 10 menit', 'Istirahat 10 menit'], ans: 'Perkiraan tiba 10 menit lagi' },
  ] as ComprehensionQ[],
};

const ReadingLesson9: React.FC = () => {
  const navigate = useNavigate();
  const nextPath = '/modul/english/beginner/reading/lesson-10';
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedReadingLessons().includes(9));
  const [showModal, setShowModal] = React.useState(false);
  const [activeTab, setActiveTab] = useState<'baca' | 'latihan' | 'kuis'>('baca');
  const handleComplete = () => { markReadingComplete(9); setIsCompleted(true); setShowModal(true); };

  const abbreviations = [
    { ab: 'ASAP', full: 'As Soon As Possible', id: 'Sesegera mungkin' },
    { ab: 'FYI', full: 'For Your Information', id: 'Sebagai informasi' },
    { ab: 'LOL', full: 'Laughing Out Loud', id: 'Tertawa terbahak' },
    { ab: 'BTW', full: 'By The Way', id: 'Ngomong-ngomong' },
    { ab: 'OTW', full: 'On The Way', id: 'Sedang dalam perjalanan' },
    { ab: 'TBH', full: 'To Be Honest', id: 'Jujur saja' },
    { ab: 'ETA', full: 'Estimated Time of Arrival', id: 'Perkiraan waktu tiba' },
    { ab: 'P.S.', full: 'Post Script', id: 'Tambahan pesan di akhir' },
  ];

  const greetingCards = [
    { occ: 'Birthday', msg: 'Happy Birthday! 🎂', id: 'Selamat Ulang Tahun!' },
    { occ: 'New Year', msg: 'Happy New Year! 🎆', id: 'Selamat Tahun Baru!' },
    { occ: 'Christmas', msg: 'Merry Christmas! 🎄', id: 'Selamat Hari Natal!' },
    { occ: 'Achievement', msg: 'Congratulations! 🎉', id: 'Selamat!' },
    { occ: 'Get well', msg: 'Get Well Soon! 💊', id: 'Semoga lekas sembuh!' },
    { occ: 'Travel', msg: 'Have a safe trip! ✈️', id: 'Semoga perjalanan aman!' },
  ];

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)' }} onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg,#4FA3D1,#1E6F9F)' }}><span style={{ fontSize: 38 }}>🏆</span></div>
            <h2 className="text-xl font-extrabold mb-1">Lesson 9 Selesai! 🎉</h2>
            <p className="text-sm text-gray-500 mb-5">Kamu sudah bisa membaca pesan singkat dan kartu ucapan!</p>
            <div className="flex gap-3">
              <button onClick={() => { setShowModal(false); navigate(nextPath); }} className="flex-1 py-3 rounded-xl font-bold text-white bg-green-500">Lesson 10 ›</button>
              <button onClick={() => { setShowModal(false); navigate(-1); }} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700">Kembali</button>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col h-[100dvh] md:h-full bg-slate-50">
        <header className="flex-none bg-white/95 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100 shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg></button>
            <div className="text-center"><h1 className="text-sm font-bold text-slate-800">Pesan Singkat & Kartu</h1><p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">Reading • Lesson 9</p></div>
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
                  <h2 className="text-lg font-extrabold mb-1">Pesan Singkat & Kartu Ucapan</h2>
                  <p className="text-sm text-green-100">Pelajari cara membaca SMS, pesan WhatsApp, kartu pos, dan kartu ucapan dalam bahasa Inggris!</p>
                </div>
                <ReadingCard title="💬 Singkatan Chat Populer" icon="📱">
                  <div className="space-y-2">
                    {abbreviations.map(a => (
                      <div key={a.ab} className="flex items-center gap-3 bg-slate-50 rounded-xl px-3 py-2">
                        <span className="font-extrabold text-green-600 bg-green-50 px-2 py-1 rounded-lg text-xs w-12 text-center">{a.ab}</span>
                        <div><p className="text-xs font-bold text-slate-800">{a.full}</p><p className="text-xs text-slate-500">{a.id}</p></div>
                      </div>
                    ))}
                  </div>
                </ReadingCard>
                <ReadingCard title="🎉 Kartu Ucapan" icon="💌">
                  <div className="grid grid-cols-2 gap-2">
                    {greetingCards.map(g => (
                      <div key={g.occ} className="bg-green-50 border border-sky-100 rounded-xl p-3 text-center">
                        <p className="text-xs font-extrabold text-green-700">{g.msg}</p>
                        <p className="text-xs text-slate-500 mt-1">{g.id}</p>
                      </div>
                    ))}
                  </div>
                </ReadingCard>
              </>
            )}
            {activeTab === 'latihan' && <ComprehensionSection {...MESSAGE_PASSAGE} />}
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

export default ReadingLesson9;
