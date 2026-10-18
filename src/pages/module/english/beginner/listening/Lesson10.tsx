import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine, DialoguePlayer, getCompletedListeningLessons, markListeningComplete } from './listeningUtils';
import type { QuizItem, DialogueLine } from './listeningUtils';

const FINAL_DIALOGUE: DialogueLine[] = [
  { speaker: 'Host', text: 'Welcome to our final listening review! Let\'s practice everything together.', translation: 'Selamat datang di ulasan mendengar akhir kita! Mari berlatih semuanya bersama.', avatar: '🎙️' },
  { speaker: 'A', text: 'Hello! My name is Putri. I am twenty-two years old and I am from Bandung.', translation: 'Halo! Nama saya Putri. Saya berumur 22 tahun dan saya dari Bandung.', avatar: '👩' },
  { speaker: 'B', text: 'Nice to meet you, Putri! I have three people in my family: my father, mother, and me.', translation: 'Senang bertemu kamu, Putri! Keluargaku ada tiga orang: ayah, ibu, dan aku.', avatar: '👦' },
  { speaker: 'A', text: 'My house has two bedrooms and one bathroom. My bedroom is upstairs next to the kitchen.', translation: 'Rumahku punya dua kamar tidur dan satu kamar mandi. Kamar tidurku di lantai atas, sebelah dapur.', avatar: '👩' },
  { speaker: 'B', text: 'I wake up at six every morning. I have breakfast at seven, then I go to work by bus.', translation: 'Aku bangun jam enam setiap pagi. Sarapan jam tujuh, lalu pergi kerja naik bus.', avatar: '👦' },
  { speaker: 'A', text: 'I would like a coffee and a toast, please. How much is that?', translation: 'Saya pesan kopi dan roti panggang. Berapa harganya?', avatar: '👩' },
  { speaker: 'B', text: 'Excuse me, where is the nearest hospital? I am a bit lost.', translation: 'Permisi, di mana rumah sakit terdekat? Saya agak tersesat.', avatar: '👦' },
  { speaker: 'A', text: 'Today is sunny and warm — about 28 degrees. It is now quarter past ten.', translation: 'Hari ini cerah dan hangat — sekitar 28 derajat. Sekarang jam sepuluh lewat seperempat.', avatar: '👩' },
  { speaker: 'B', text: 'Hello? Can I speak to Dr. Maya, please? This is Budi calling.', translation: 'Halo? Boleh saya bicara dengan Dr. Maya? Ini Budi yang menelepon.', avatar: '👦' },
  { speaker: 'Host', text: 'Excellent! You have completed the Beginner Listening module!', translation: 'Luar biasa! Kamu telah menyelesaikan modul Listening Beginner!', avatar: '🎙️' },
];

const FINAL_QUIZ: QuizItem[] = [
  { q: '"Hello! My name is Putri." — nama orangnya adalah...', opts: ['Rina', 'Maya', 'Sari', 'Putri'], ans: 'Putri', exp: '"My name is Putri" = nama orangnya Putri.' },
  { q: '"I am twenty-two years old." artinya umurnya...', opts: ['20 tahun', '12 tahun', '2 tahun', '22 tahun'], ans: '22 tahun', exp: '"Twenty-two" = 22.' },
  { q: '"I have three people in my family." artinya...', opts: ['Keluarganya ada 3 orang.', 'Keluarganya ada 2 orang.', 'Dia punya 3 anak.', 'Dia punya 3 saudara.'], ans: 'Keluarganya ada 3 orang.', exp: '"Three people in my family" = 3 orang dalam keluarga.' },
  { q: '"My bedroom is upstairs next to the kitchen." artinya...', opts: ['Kamarnya di lantai bawah.', 'Kamarnya di lantai atas sebelah dapur.', 'Kamarnya di luar rumah.', 'Kamarnya di sebelah kamar mandi.'], ans: 'Kamarnya di lantai atas sebelah dapur.', exp: '"Upstairs" = lantai atas. "Next to the kitchen" = di sebelah dapur.' },
  { q: '"I wake up at six every morning." artinya...', opts: ['Dia tidur jam 6 pagi.', 'Dia makan jam 6 pagi.', 'Dia pergi jam 6 pagi.', 'Dia bangun jam 6 pagi setiap hari.'], ans: 'Dia bangun jam 6 pagi setiap hari.', exp: '"Wake up at six" = bangun jam 6. "Every morning" = setiap pagi.' },
  { q: '"I go to work by bus." artinya...', opts: ['Dia kerja di bus.', 'Dia naik motor ke tempat kerja.', 'Dia naik bus ke tempat kerja.', 'Dia jalan kaki ke tempat kerja.'], ans: 'Dia naik bus ke tempat kerja.', exp: '"Go to work by bus" = pergi ke tempat kerja naik bus.' },
  { q: '"I would like a coffee and a toast." artinya...', opts: ['Saya minum kopi dan makan roti.', 'Saya ingin kopi dan roti panggang.', 'Saya tidak suka kopi dan roti.', 'Apakah ada kopi dan roti?'], ans: 'Saya ingin kopi dan roti panggang.', exp: '"I would like" = saya ingin (cara sopan memesan).' },
  { q: '"I am a bit lost." artinya...', opts: ['Saya agak tersesat.', 'Saya kehilangan sesuatu.', 'Saya sangat lelah.', 'Saya tidak di sini.'], ans: 'Saya agak tersesat.', exp: '"Lost" = tersesat. "A bit" = sedikit / agak.' },
  { q: '"Today is sunny and warm." artinya...', opts: ['Hari ini hujan dan dingin.', 'Hari ini berawan dan sejuk.', 'Hari ini cerah dan hangat.', 'Hari ini berkabut dan panas.'], ans: 'Hari ini cerah dan hangat.', exp: '"Sunny" = cerah. "Warm" = hangat.' },
  { q: '"It is now quarter past ten." artinya...', opts: ['Sekarang jam 10:00.', 'Sekarang jam 10:30.', 'Sekarang jam 10:15.', 'Sekarang jam 10:45.'], ans: 'Sekarang jam 10:15.', exp: '"Quarter past ten" = sepuluh lewat seperempat = 10:15.' },
  { q: '"Can I speak to Dr. Maya?" artinya...', opts: ['Siapa Dr. Maya?', 'Apakah Dr. Maya ada?', 'Boleh saya bicara dengan Dr. Maya?', 'Di mana Dr. Maya?'], ans: 'Boleh saya bicara dengan Dr. Maya?', exp: '"Can I speak to...?" = boleh saya berbicara dengan...? (formulasi telepon).' },
  { q: '"This is Budi calling." artinya...', opts: ['Ini panggilan untuk Budi.', 'Ini adalah Budi yang menelepon.', 'Budi sedang dipanggil.', 'Budi tidak mau menelepon.'], ans: 'Ini adalah Budi yang menelepon.', exp: '"This is [nama] calling" = ini [nama] yang menelepon (perkenalan di telepon).' },
  { q: 'Kata "Nice to meet you!" adalah ungkapan untuk...', opts: ['Saat pertama kali bertemu', 'Perpisahan', 'Saat berterima kasih', 'Saat makan bersama'], ans: 'Saat pertama kali bertemu', exp: '"Nice to meet you" = senang bertemu denganmu (diucapkan pertama kali bertemu).' },
  { q: '"How are you?" dijawab dengan...', opts: ['I am fine, thank you!', 'Goodbye!', 'See you later!', 'My name is...'], ans: 'I am fine, thank you!', exp: '"How are you?" dibalas "I am fine, thank you!" atau jawaban kabar lainnya.' },
  { q: 'Kata yang menunjukkan kebiasaan adalah...', opts: ['Semua benar', 'Never', 'Sometimes', 'Usually'], ans: 'Semua benar', exp: 'Never, sometimes, usually adalah semua frequency adverb (kata keterangan frekuensi).' },
  { q: '"Go straight ahead, then turn left." — Kamu harus...', opts: ['Jalan lurus dulu, baru belok kiri', 'Balik arah, lalu belok kiri', 'Belok kiri langsung', 'Belok kanan dulu, baru belok kiri'], ans: 'Jalan lurus dulu, baru belok kiri', exp: '"Go straight" = jalan lurus dulu. "Then turn left" = kemudian belok kiri.' },
  { q: '"The weather is cloudy with a chance of rain." artinya...', opts: ['Cuaca badai.', 'Cuaca cerah dengan sedikit hujan.', 'Cuaca berawan dengan kemungkinan hujan.', 'Cuaca panas dan lembab.'], ans: 'Cuaca berawan dengan kemungkinan hujan.', exp: '"Cloudy" = berawan. "A chance of rain" = kemungkinan hujan.' },
  { q: '"Bedroom" adalah tempat untuk...', opts: ['Mandi', 'Makan', 'Memasak', 'Tidur'], ans: 'Tidur', exp: '"Bedroom" = kamar tidur. "Bed" = tempat tidur.' },
  { q: 'Cara sopan untuk memesan makanan adalah...', opts: ['I want rice!', 'Chicken! Now!', 'Give me chicken!', 'I would like chicken rice, please.'], ans: 'I would like chicken rice, please.', exp: '"I would like... please" adalah cara paling sopan untuk memesan.' },
  { q: 'Lesson 1–9 Listening mencakup topik...', opts: ['Pronunciation only', 'Grammar & Vocabulary only', 'Reading & Writing', 'Salam, angka, keluarga, rumah, rutinitas, makanan, arah, cuaca & telepon'], ans: 'Salam, angka, keluarga, rumah, rutinitas, makanan, arah, cuaca & telepon', exp: 'Modul Listening Beginner mencakup 9 topik percakapan sehari-hari yang penting!' },
];

const ListeningLesson10: React.FC = () => {
  const navigate = useNavigate();
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedListeningLessons().includes(10));
  const [showModal, setShowModal] = React.useState(false);
  const [activeTab, setActiveTab] = useState<'review' | 'simak' | 'kuis'>('review');
  const handleComplete = () => { markListeningComplete(10); setIsCompleted(true); setShowModal(true); };

  const reviewItems = [
    { n: 1, icon: '👋', title: 'Salam & Perkenalan', skill: 'Hello, my name is, Nice to meet you' },
    { n: 2, icon: '🔢', title: 'Angka & Tanggal', skill: 'Numbers, dates, prices, phone numbers' },
    { n: 3, icon: '👨‍👩‍👧', title: 'Keluargaku', skill: 'Mother, father, sister, brother, grandparents' },
    { n: 4, icon: '🏠', title: 'Di Rumah', skill: 'Bedroom, kitchen, living room, upstairs' },
    { n: 5, icon: '⏰', title: 'Rutinitas Harian', skill: 'Wake up, breakfast, go to work' },
    { n: 6, icon: '🍽️', title: 'Makanan & Belanja', skill: 'I would like, How much, That is all' },
    { n: 7, icon: '🗺️', title: 'Bertanya Arah', skill: 'Excuse me, go straight, turn left/right' },
    { n: 8, icon: '🌤️', title: 'Cuaca & Waktu', skill: 'Sunny, cloudy, half past, quarter to' },
    { n: 9, icon: '📞', title: 'Telepon & Pesan', skill: 'Can I speak to, Hold on, Wrong number' },
  ];

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)' }} onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg,#8E44AD,#6C3483)' }}><span style={{ fontSize: 46 }}>🎓</span></div>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Modul Listening Selesai! 🏆</h2>
            <p className="text-sm text-gray-600 mb-4">Hebat! Kamu telah menyelesaikan seluruh <b>10 Lesson Listening Beginner</b>. Kamu sekarang bisa memahami:</p>
            <div className="bg-purple-50 rounded-xl p-3 mb-5 text-left text-sm text-purple-800 space-y-1">
              <p>✅ Salam & percakapan perkenalan</p>
              <p>✅ Angka, harga & tanggal</p>
              <p>✅ Cerita tentang keluarga & rumah</p>
              <p>✅ Rutinitas, makanan & petunjuk arah</p>
              <p>✅ Cuaca, waktu & percakapan telepon</p>
            </div>
            <button onClick={() => { setShowModal(false); navigate('/modul/english/beginner/listening'); }} className="w-full py-3.5 rounded-xl font-bold text-white text-base bg-purple-600">
              🎉 Kembali ke Modul Listening
            </button>
          </div>
        </div>
      )}
      <div className="flex flex-col h-[100dvh] md:h-full bg-slate-50">
        <header className="flex-none bg-white/95 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100 shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg></button>
            <div className="text-center"><h1 className="text-sm font-bold text-slate-800">Latihan Akhir</h1><p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">Listening • Lesson 10 — FINAL</p></div>
            <div className="w-10" />
          </div>
        </header>
        <div className="flex bg-white border-b border-slate-100 sticky top-[65px] z-10 shadow-sm">
          {([['review', '📋 Review'], ['simak', '🎧 Simak'], ['kuis', '🎯 Kuis Final']] as [string,string][]).map(([tab, label]) => (
            <button key={tab} onClick={() => setActiveTab(tab as typeof activeTab)} className={`flex-1 py-3 text-xs font-bold tracking-wide transition-all ${activeTab === tab ? 'text-purple-600 border-b-2 border-purple-500' : 'text-slate-400'}`}>{label}</button>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 pb-28 space-y-5">
            {activeTab === 'review' && (
              <>
                <div className="bg-gradient-to-br from-purple-500 via-violet-500 to-indigo-500 rounded-2xl p-6 text-white shadow-lg text-center relative overflow-hidden">
                  <div className="absolute -top-4 -right-4 text-8xl opacity-10">🎓</div>
                  <p className="text-4xl mb-2">🎓</p>
                  <h2 className="text-xl font-extrabold mb-1">Selamat! Hampir Selesai!</h2>
                  <p className="text-sm text-purple-100">Ini lesson terakhir modul Listening Beginner. Lihat semua yang sudah kamu pelajari!</p>
                </div>
                <div className="space-y-2">
                  {reviewItems.map(item => (
                    <div key={item.n} className="bg-white rounded-2xl px-4 py-3.5 border border-slate-100 shadow-sm flex items-center gap-4">
                      <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-xl shrink-0">{item.icon}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-extrabold text-slate-800">Lesson {item.n}: {item.title}</p>
                        <p className="text-xs text-slate-500 truncate">{item.skill}</p>
                      </div>
                      <span className="text-purple-500 shrink-0 text-lg">✅</span>
                    </div>
                  ))}
                </div>
                <div className="bg-purple-50 border border-purple-100 rounded-2xl p-5 text-center">
                  <p className="text-2xl mb-2">🎧</p>
                  <h3 className="font-extrabold text-purple-800 mb-2">Kemampuan Listening Sekarang!</h3>
                  <div className="text-sm text-purple-700 space-y-1 text-left mb-4">
                    <p>✦ Mendengar dan memahami salam & perkenalan</p>
                    <p>✦ Memahami angka, harga, tanggal</p>
                    <p>✦ Mengerti cerita tentang keluarga & rumah</p>
                    <p>✦ Memahami rutinitas dan cara memesan</p>
                    <p>✦ Mengerti petunjuk arah & cuaca</p>
                    <p>✦ Memahami percakapan telepon sederhana</p>
                  </div>
                  <div className="flex gap-2 justify-center">
                    <button onClick={() => setActiveTab('simak')} className="px-4 py-2 bg-purple-500 text-white rounded-xl text-xs font-bold">🎧 Simak Akhir</button>
                    <button onClick={() => setActiveTab('kuis')} className="px-4 py-2 bg-purple-700 text-white rounded-xl text-xs font-bold">🎯 Kuis Final</button>
                  </div>
                </div>
              </>
            )}
            {activeTab === 'simak' && (
              <div className="space-y-4">
                <div className="bg-purple-50 border border-purple-200 rounded-2xl px-4 py-3 flex items-center gap-3">
                  <span className="text-2xl">🎙️</span>
                  <div><p className="text-sm font-extrabold text-purple-800">Percakapan Review — Semua Topik</p><p className="text-xs text-purple-600">Ikuti percakapan yang mencakup semua lesson 1–9</p></div>
                </div>
                <DialoguePlayer title="Percakapan Final: Gabungan Semua Topik" lines={FINAL_DIALOGUE} />
              </div>
            )}
            {activeTab === 'kuis' && (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200 rounded-2xl px-4 py-3 flex items-center gap-3">
                  <span className="text-2xl">⭐</span>
                  <div><p className="text-sm font-extrabold text-purple-800">Kuis Final — 20 Soal Komprehensif</p><p className="text-xs text-purple-600">Mencakup semua topik dari Lesson 1–9</p></div>
                </div>
                <QuizEngine items={FINAL_QUIZ} onComplete={handleComplete} />
              </div>
            )}
          </div>
        </div>
        <div className="sticky bottom-0 z-30 bg-white/90 backdrop-blur-xl border-t border-gray-100 px-4 py-3">
          <button onClick={isCompleted ? () => navigate('/modul/english/beginner/listening') : handleComplete} className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg active:scale-[0.98]" style={{ background: isCompleted ? 'linear-gradient(135deg,#4FA3D1,#1E6F9F)' : 'linear-gradient(135deg,#8E44AD,#6C3483)' }}>
            {isCompleted ? '🏆 Modul Selesai — Kembali ke Daftar' : '✅ Selesaikan Modul'}
          </button>
        </div>
      </div>
    </>
  );
};

export default ListeningLesson10;
