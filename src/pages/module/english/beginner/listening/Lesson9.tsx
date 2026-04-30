import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine, DialoguePlayer, FillBlankExercise, getCompletedListeningLessons, markListeningComplete } from './listeningUtils';
import type { QuizItem, DialogueLine, BlankItem } from './listeningUtils';

const DIALOGUE: DialogueLine[] = [
  { speaker: '[Ring ring...]', text: 'Hello? This is the Happy Bakery. How can I help you?', translation: 'Halo? Ini Toko Roti Happy. Ada yang bisa kami bantu?', avatar: '📞' },
  { speaker: 'Caller', text: 'Hello! I would like to place an order, please.', translation: 'Halo! Saya ingin menempatkan pesanan, tolong.', avatar: '📱' },
  { speaker: '[Bakery]', text: 'Of course! What would you like to order?', translation: 'Tentu saja! Apa yang ingin Anda pesan?', avatar: '📞' },
  { speaker: 'Caller', text: 'I would like one chocolate cake and two dozen cookies, please.', translation: 'Saya pesan satu kue coklat dan dua lusin kuki, tolong.', avatar: '📱' },
  { speaker: '[Bakery]', text: 'Great! Can I have your name and phone number?', translation: 'Bagus! Boleh saya tahu nama dan nomor telepon Anda?', avatar: '📞' },
  { speaker: 'Caller', text: 'My name is Rina Sari. My phone number is 0812 five six seven eight.', translation: 'Nama saya Rina Sari. Nomor telepon saya 0812 lima enam tujuh delapan.', avatar: '📱' },
  { speaker: '[Bakery]', text: 'Thank you, Rina! Your order will be ready at three o\'clock. Is that okay?', translation: 'Terima kasih, Rina! Pesananmu akan siap jam tiga. Apakah itu oke?', avatar: '📞' },
  { speaker: 'Caller', text: 'Yes, that is perfect! Thank you very much. Goodbye!', translation: 'Ya, itu sempurna! Terima kasih banyak. Sampai jumpa!', avatar: '📱' },
];

const BLANKS: BlankItem[] = [
  { sentence: 'Hello? Can I ___ to Mr. Danang, please?', blank: 'speak', opts: ['speak', 'talk', 'call', 'say'], hint: 'Dalam telepon: boleh saya ___ dengan...?' },
  { sentence: 'Please ___ a message after the beep.', blank: 'leave', opts: ['leave', 'send', 'give', 'say'], hint: 'Tinggalkan pesan = ___ a message' },
  { sentence: 'He is not available ___ the moment.', blank: 'at', opts: ['at', 'in', 'on', 'for'], hint: 'Tidak tersedia saat ini = not available ___ the moment' },
  { sentence: 'I will ___ you back soon.', blank: 'call', opts: ['call', 'ring', 'phone', 'text'], hint: 'Menelepon balik = ___ you back' },
  { sentence: 'Can I take a ___?', blank: 'message', opts: ['message', 'note', 'letter', 'call'], hint: 'Bisakah saya mengambil ___? (menerima pesan untuk orang lain)' },
];

const QUIZ: QuizItem[] = [
  { q: '"Can I speak to Mr. Budi, please?" artinya...', opts: ['Apakah saya bisa bertemu Mr. Budi?', 'Boleh saya berbicara dengan Mr. Budi?', 'Siapa Mr. Budi?', 'Di mana Mr. Budi?'], ans: 'Boleh saya berbicara dengan Mr. Budi?', exp: '"Can I speak to...?" = boleh saya berbicara dengan...? (formulasi telepon yang umum).' },
  { q: '"He is not available right now." artinya...', opts: ['Dia tidak ada di sini.', 'Dia sedang tidak bisa dihubungi saat ini.', 'Dia tidak punya telepon.', 'Dia tidak mau mengangkat telepon.'], ans: 'Dia sedang tidak bisa dihubungi saat ini.', exp: '"Not available" = tidak tersedia / tidak bisa dihubungi.' },
  { q: '"Please leave a message after the beep." artinya...', opts: ['Tolong terima pesan setelah bunyi bip.', 'Tolong tinggalkan pesan setelah bunyi bip.', 'Tolong kirim pesan.', 'Tolong tunggu bunyi bip.'], ans: 'Tolong tinggalkan pesan setelah bunyi bip.', exp: '"Leave a message" = tinggalkan pesan. "Beep" = bunyi bip.' },
  { q: '"I will call you back." artinya...', opts: ['Saya tidak bisa menelepon.', 'Saya akan meneleponmu kembali.', 'Kamu harus menelepon saya.', 'Teleponnya tidak aktif.'], ans: 'Saya akan meneleponmu kembali.', exp: '"Call back" = menelepon balik.' },
  { q: '"Who is calling, please?" artinya...', opts: ['Kamu mau ke mana?', 'Siapa yang menelepon?', 'Kenapa kamu menelepon?', 'Kapan kamu menelepon?'], ans: 'Siapa yang menelepon?', exp: '"Who is calling?" = siapa yang menelepon? (pertanyaan standar di telepon).' },
  { q: '"Hold on, please." artinya...', opts: ['Tutup telepon.', 'Tahan dahulu / tunggu sebentar.', 'Berbicara lebih keras.', 'Ulangi pertanyaanmu.'], ans: 'Tahan dahulu / tunggu sebentar.', exp: '"Hold on" = tahan sebentar / mohon tunggu.' },
  { q: '"I will text you the address." artinya...', opts: ['Saya akan meneleponmu tentang alamatnya.', 'Saya akan mengirimkan SMS alamatnya.', 'Saya tidak tahu alamatnya.', 'Saya akan datang ke alamatmu.'], ans: 'Saya akan mengirimkan SMS alamatnya.', exp: '"Text" = mengirim pesan teks / SMS.' },
  { q: '"The line is busy." artinya...', opts: ['Sinyal lemah.', 'Teleponnya rusak.', 'Nomornya tidak aktif.', 'Jalur teleponnya sedang sibuk.'], ans: 'Jalur teleponnya sedang sibuk.', exp: '"The line is busy" = jalur telepon sedang digunakan (sibuk).' },
  { q: '"Can I take a message?" artinya...', opts: ['Boleh saya menerima pesan untuk orang lain?', 'Boleh saya mengirim pesan?', 'Boleh saya pergi?', 'Boleh saya mengambil teleponnya?'], ans: 'Boleh saya menerima pesan untuk orang lain?', exp: '"Can I take a message?" = bisakah saya menerima/mencatat pesan untuk orang yang sedang tidak ada.' },
  { q: '"This is Budi speaking." artinya...', opts: ['Saya mencari Budi.', 'Saya adalah Budi.', 'Budi tidak ada.', 'Boleh saya bicara dengan Budi?'], ans: 'Saya adalah Budi.', exp: '"This is [nama] speaking" = cara memperkenalkan diri di telepon.' },
  { q: '"I will be there in five minutes." artinya...', opts: ['Saya sudah di sana.', 'Saya akan tiba dalam lima menit.', 'Saya tidak bisa datang.', 'Tunggu lima menit lagi.'], ans: 'Saya akan tiba dalam lima menit.', exp: '"I will be there" = saya akan ada di sana. "In five minutes" = dalam lima menit.' },
  { q: '"Wrong number." artinya...', opts: ['Nomornya benar.', 'Nomornya salah.', 'Nomornya tidak aktif.', 'Nomornya baru.'], ans: 'Nomornya salah.', exp: '"Wrong number" = nomor yang salah (salah sambung).' },
  { q: '"My battery is low." artinya...', opts: ['Sinyal saya lemah.', 'Baterai saya hampir habis.', 'Kuota saya habis.', 'Telepon saya rusak.'], ans: 'Baterai saya hampis habis.', exp: '"Battery is low" = baterai sedang lemah / hampir habis.' },
  { q: '"Please call me at this number." artinya...', opts: ['Tolong hubungi saya di nomor ini.', 'Tolong simpan nomor ini.', 'Tolong kirimkan SMS ke nomor ini.', 'Tolong ganti nomor ini.'], ans: 'Tolong hubungi saya di nomor ini.', exp: '"Please call me at this number" = tolong hubungi saya di nomor ini.' },
  { q: '"I cannot hear you clearly." artinya...', opts: ['Saya tidak bisa bertemu kamu.', 'Saya tidak bisa mendengarmu dengan jelas.', 'Saya tidak paham bahasamu.', 'Saya tidak suka cara bicaramu.'], ans: 'Saya tidak bisa mendengarmu dengan jelas.', exp: '"I cannot hear you clearly" = saya tidak bisa mendengarmu dengan jelas (kurang jelas/gangguan sinyal).' },
  { q: '"Drop me a text." artinya...', opts: ['Jatuhkan sesuatu untukku.', 'Kirimkan aku pesan teks.', 'Hubungi aku segera.', 'Kunjungi aku sekarang.'], ans: 'Kirimkan aku pesan teks.', exp: '"Drop me a text" = kirimkan aku pesan teks (informal).' },
  { q: '"The phone is off." artinya...', opts: ['Telepon dalam mode senyap.', 'Telepon sedang dimatikan.', 'Telepon sedang diisi daya.', 'Telepon sedang digunakan.'], ans: 'Telepon sedang dimatikan.', exp: '"The phone is off" = hp dimatikan (tidak menyala).' },
  { q: '"Could you speak more slowly, please?" artinya...', opts: ['Bisakah kamu berbicara lebih keras?', 'Bisakah kamu berbicara lebih pelan?', 'Bisakah kamu mengulangi?', 'Bisakah kamu berhenti?'], ans: 'Bisakah kamu berbicara lebih pelan?', exp: '"Speak more slowly" = berbicara lebih pelan. Penting saat tidak mengerti!' },
  { q: '"I am returning your call." artinya...', opts: ['Saya menelepon pertama kali.', 'Saya menelepon balik karena kamu menelepon saya.', 'Saya tidak bisa menelepon.', 'Saya menerima teleponmu.'], ans: 'Saya menelepon balik karena kamu menelepon saya.', exp: '"Returning your call" = menelepon balik sebagai respons panggilan sebelumnya.' },
  { q: '"Voicemail" artinya...', opts: ['Email suara', 'Pesan suara / kotak pesan', 'Telepon video', 'Konferensi telepon'], ans: 'Pesan suara / kotak pesan', exp: '"Voicemail" = kotak pesan suara (rekaman pesan saat tidak diangkat).' },
];

const ListeningLesson9: React.FC = () => {
  const navigate = useNavigate();
  const nextPath = '/modul/english/beginner/listening/lesson-10';
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedListeningLessons().includes(9));
  const [showModal, setShowModal] = React.useState(false);
  const [activeTab, setActiveTab] = useState<'simak' | 'latihan' | 'kuis'>('simak');
  const handleComplete = () => { markListeningComplete(9); setIsCompleted(true); setShowModal(true); };

  const phonePhrases = [
    { en: 'Hello? This is...', id: 'Halo? Ini...' }, { en: 'Can I speak to...?', id: 'Boleh saya bicara dengan...?' },
    { en: 'Hold on, please.', id: 'Tunggu sebentar.' }, { en: 'Who is calling?', id: 'Siapa yang menelepon?' },
    { en: 'Leave a message', id: 'Tinggalkan pesan' }, { en: 'Call you back', id: 'Menelepon balik' },
    { en: 'Wrong number', id: 'Salah sambung' }, { en: 'The line is busy', id: 'Jalur sibuk' },
  ];

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)' }} onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg,#8E44AD,#6C3483)' }}><span style={{ fontSize: 38 }}>🏆</span></div>
            <h2 className="text-xl font-extrabold mb-1">Lesson 9 Selesai! 🎉</h2>
            <p className="text-sm text-gray-500 mb-5">Kamu sudah bisa memahami percakapan telepon!</p>
            <div className="flex gap-3">
              <button onClick={() => { setShowModal(false); navigate(nextPath); }} className="flex-1 py-3 rounded-xl font-bold text-white bg-purple-500">Lesson 10 ›</button>
              <button onClick={() => { setShowModal(false); navigate(-1); }} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700">Kembali</button>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col h-[100dvh] md:h-full bg-slate-50">
        <header className="flex-none bg-white/95 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100 shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg></button>
            <div className="text-center"><h1 className="text-sm font-bold text-slate-800">Telepon & Pesan</h1><p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">Listening • Lesson 9</p></div>
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
                  <h2 className="text-lg font-extrabold mb-1">Telepon & Pesan</h2>
                  <p className="text-sm text-purple-100">Pelajari cara memahami percakapan telepon dan pesan singkat dalam bahasa Inggris!</p>
                </div>
                <div className="bg-white rounded-2xl border border-purple-100 shadow-sm p-4">
                  <p className="text-xs font-extrabold text-purple-700 uppercase tracking-wide mb-3">📞 Frasa Telepon yang Umum</p>
                  <div className="grid grid-cols-2 gap-2">
                    {phonePhrases.map(p => (<div key={p.en} className="bg-slate-50 rounded-xl px-3 py-2"><p className="text-xs font-extrabold text-slate-800">{p.en}</p><p className="text-xs text-purple-600">{p.id}</p></div>))}
                  </div>
                </div>
                <DialoguePlayer title="Percakapan: Memesan via Telepon" lines={DIALOGUE} />
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

export default ListeningLesson9;
