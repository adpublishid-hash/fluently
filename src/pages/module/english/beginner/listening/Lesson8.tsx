import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine, DialoguePlayer, FillBlankExercise, getCompletedListeningLessons, markListeningComplete } from './listeningUtils';
import type { QuizItem, DialogueLine, BlankItem } from './listeningUtils';

const DIALOGUE: DialogueLine[] = [
  { speaker: 'Radio', text: 'Good morning! This is the weather forecast for today, Thursday, April 16th.', translation: 'Selamat pagi! Ini adalah prakiraan cuaca untuk hari ini, Kamis 16 April.', avatar: '📻' },
  { speaker: 'Radio', text: 'In Jakarta, it will be sunny and hot with a temperature of 32 degrees Celsius.', translation: 'Di Jakarta, akan cerah dan panas dengan suhu 32 derajat Celsius.', avatar: '📻' },
  { speaker: 'Ali', text: 'Oh no! I don\'t like hot weather. What about tomorrow?', translation: 'Oh tidak! Saya tidak suka cuaca panas. Bagaimana dengan besok?', avatar: '👦' },
  { speaker: 'Radio', text: 'Tomorrow, Friday, there will be heavy rain in the afternoon and evening. Please bring an umbrella!', translation: 'Besok, Jumat, akan ada hujan lebat di siang dan malam hari. Mohon bawa payung!', avatar: '📻' },
  { speaker: 'Ali', text: 'What is the temperature now?', translation: 'Berapa suhu sekarang?', avatar: '👦' },
  { speaker: 'Dita', text: 'It is nine o\'clock in the morning and already 28 degrees!', translation: 'Ini jam sembilan pagi dan sudah 28 derajat!', avatar: '👩' },
  { speaker: 'Ali', text: 'Wow, that is really warm! Let\'s stay inside today.', translation: 'Wow, itu sangat hangat! Mari tetap di dalam hari ini.', avatar: '👦' },
];

const BLANKS: BlankItem[] = [
  { sentence: 'It is very hot today. The ___ is 35 degrees.', blank: 'temperature', opts: ['temperature', 'weather', 'season', 'climate'], hint: 'Ukuran panas atau dinginnya udara' },
  { sentence: 'It is ___ outside. Please bring an umbrella.', blank: 'raining', opts: ['raining', 'snowing', 'sunny', 'windy'], hint: 'Kondisi cuaca saat butuh payung' },
  { sentence: 'What ___ is it today? It is summer!', blank: 'season', opts: ['season', 'time', 'day', 'year'], hint: 'Musim apa ini sekarang?' },
  { sentence: 'The weather forecast says it will be ___ tomorrow.', blank: 'cloudy', opts: ['cloudy', 'rainy', 'sunny', 'windy'], hint: 'Berawan = ___' },
  { sentence: 'What time is it? It is ___ o\'clock.', blank: 'three', opts: ['three', 'third', 'thirty', 'thirteen'], hint: 'Jam 3 = ___ o\'clock' },
];

const QUIZ: QuizItem[] = [
  { q: '"What is the weather like today?" artinya...', opts: ['Bagaimana cuaca hari ini?', 'Apakah akan hujan?', 'Kapan cuacanya bagus?', 'Apa suhu hari ini?'], ans: 'Bagaimana cuaca hari ini?', exp: '"What is the weather like?" = Bagaimana cuacanya?' },
  { q: '"It is sunny today." artinya...', opts: ['Hari ini cerah.', 'Hari ini berawan.', 'Hari ini hujan.', 'Hari ini dingin.'], ans: 'Hari ini cerah.', exp: '"Sunny" = cerah, banyak matahari.' },
  { q: '"Heavy rain" artinya...', opts: ['Gerimis', 'Hujan lebat', 'Badai', 'Hujan ringan'], ans: 'Hujan lebat', exp: '"Heavy" = berat/lebat. "Heavy rain" = hujan lebat.' },
  { q: '"The temperature is 30 degrees Celsius." artinya...', opts: ['Suhu 30 derajat Fahrenheit.', 'Suhu di bawah nol derajat.', 'Suhu sangat panas.', 'Suhu 30 derajat Celsius.'], ans: 'Suhu 30 derajat Celsius.', exp: 'Celsius = skala suhu yang umum digunakan di Indonesia.' },
  { q: '"It is cloudy." artinya...', opts: ['Cuacanya cerah.', 'Cuacanya hujan.', 'Cuacanya berangin.', 'Cuacanya berawan.'], ans: 'Cuacanya berawan.', exp: '"Cloudy" = berawan.' },
  { q: '"What time is it?" artinya...', opts: ['Kapan kita pergi?', 'Berapa lama?', 'Hari apa ini?', 'Jam berapa sekarang?'], ans: 'Jam berapa sekarang?', exp: '"What time is it?" = Jam berapa sekarang?' },
  { q: '"It is half past two." artinya...', opts: ['Jam dua belas.', 'Jam dua lewat.', 'Jam setengah tiga (02:30).', 'Jam dua tepat.'], ans: 'Jam setengah tiga (02:30).', exp: '"Half past two" = dua lewat tiga puluh = pukul 02:30.' },
  { q: '"In spring" artinya...', opts: ['Di musim semi', 'Di musim gugur', 'Di musim dingin', 'Di musim panas'], ans: 'Di musim semi', exp: '"Spring" = musim semi. Empat musim: spring, summer, autumn/fall, winter.' },
  { q: '"It is snowing." artinya...', opts: ['Sedang bersalju.', 'Sedang berangin.', 'Sedang berkabut.', 'Sedang hujan.'], ans: 'Sedang bersalju.', exp: '"Snowing" = turun salju.' },
  { q: '"A quarter past three" artinya...', opts: ['Pukul 03:00', 'Pukul 03:30', 'Pukul 03:15', 'Pukul 03:45'], ans: 'Pukul 03:15', exp: '"A quarter past" = lewat satu per empat jam = +15 menit.' },
  { q: '"The forecast says rain tomorrow." artinya...', opts: ['Kemarin hujan.', 'Hari ini hujan.', 'Prakiraan cuaca mengatakan besok hujan.', 'Minggu depan hujan.'], ans: 'Prakiraan cuaca mengatakan besok hujan.', exp: '"Forecast" = prakiraan cuaca. "Tomorrow" = besok.' },
  { q: '"Windy" artinya...', opts: ['Panas', 'Berangin', 'Hujan', 'Bersalju'], ans: 'Berangin', exp: '"Windy" = berangin.' },
  { q: '"It is minus five degrees." artinya...', opts: ['Suhu 50 derajat.', 'Suhu 15 derajat.', 'Suhu minus 5 derajat (sangat dingin).', 'Suhu 5 derajat.'], ans: 'Suhu minus 5 derajat (sangat dingin).', exp: '"Minus" = di bawah nol. Minus 5 = sangat dingin.' },
  { q: '"In the evening" artinya...', opts: ['Di siang hari', 'Di sore/petang hari', 'Di tengah malam', 'Di pagi hari'], ans: 'Di sore/petang hari', exp: '"In the evening" = di sore/malam hari (sekitar jam 6–9 malam).' },
  { q: '"Umbrella" artinya...', opts: ['Payung', 'Sepatu bot', 'Jaket', 'Jas hujan'], ans: 'Payung', exp: '"Umbrella" = payung.' },
  { q: '"Four seasons" mengacu pada...', opts: ['Empat musim (spring, summer, autumn, winter)', 'Empat jam dalam sehari', 'Empat hari dalam seminggu', 'Empat jenis cuaca'], ans: 'Empat musim (spring, summer, autumn, winter)', exp: 'Empat musim: musim semi, panas, gugur, dingin.' },
  { q: '"It is foggy this morning." artinya...', opts: ['Pagi ini berkabut.', 'Pagi ini hujan.', 'Pagi ini cerah.', 'Pagi ini berangin.'], ans: 'Pagi ini berkabut.', exp: '"Foggy" = berkabut.' },
  { q: '"At midnight" artinya...', opts: ['Pukul 12 siang', 'Pukul 6 pagi', 'Pukul 12 tengah malam', 'Pukul 6 sore'], ans: 'Pukul 12 tengah malam', exp: '"Midnight" = tengah malam (pukul 00:00).' },
  { q: '"The rainy season" artinya...', opts: ['Musim panas', 'Musim kemarau', 'Musim hujan', 'Musim dingin'], ans: 'Musim hujan', exp: '"Rainy season" = musim hujan.' },
  { q: '"It is quarter to four." artinya...', opts: ['Pukul 04:15', 'Pukul 03:30', 'Pukul 04:00', 'Pukul 03:45'], ans: 'Pukul 03:45', exp: '"Quarter to four" = kurang seperempat jam dari jam empat = 03:45.' },
];

const ListeningLesson8: React.FC = () => {
  const navigate = useNavigate();
  const nextPath = '/modul/english/beginner/listening/lesson-9';
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedListeningLessons().includes(8));
  const [showModal, setShowModal] = React.useState(false);
  const [activeTab, setActiveTab] = useState<'simak' | 'latihan' | 'kuis'>('simak');
  const handleComplete = () => { markListeningComplete(8); setIsCompleted(true); setShowModal(true); };

  const weatherWords = [
    { en: 'Sunny', id: 'Cerah/Bersinar', icon: '☀️' }, { en: 'Cloudy', id: 'Berawan', icon: '☁️' },
    { en: 'Rainy', id: 'Hujan', icon: '🌧️' }, { en: 'Windy', id: 'Berangin', icon: '💨' },
    { en: 'Foggy', id: 'Berkabut', icon: '🌫️' }, { en: 'Snowy', id: 'Bersalju', icon: '❄️' },
    { en: 'Hot', id: 'Panas', icon: '🌡️' }, { en: 'Cold', id: 'Dingin', icon: '🥶' },
  ];

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)' }} onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg,#8E44AD,#6C3483)' }}><span style={{ fontSize: 38 }}>🏆</span></div>
            <h2 className="text-xl font-extrabold mb-1">Lesson 8 Selesai! 🎉</h2>
            <p className="text-sm text-gray-500 mb-5">Kamu sudah bisa memahami laporan cuaca dan waktu!</p>
            <div className="flex gap-3">
              <button onClick={() => { setShowModal(false); navigate(nextPath); }} className="flex-1 py-3 rounded-xl font-bold text-white bg-purple-500">Lesson 9 ›</button>
              <button onClick={() => { setShowModal(false); navigate(-1); }} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700">Kembali</button>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col h-[100dvh] md:h-full bg-slate-50">
        <header className="flex-none bg-white/95 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100 shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg></button>
            <div className="text-center"><h1 className="text-sm font-bold text-slate-800">Cuaca & Waktu</h1><p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">Listening • Lesson 8</p></div>
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
                  <h2 className="text-lg font-extrabold mb-1">Cuaca & Waktu</h2>
                  <p className="text-sm text-purple-100">Pelajari cara memahami laporan cuaca dan percakapan tentang waktu dalam bahasa Inggris!</p>
                </div>
                <div className="bg-white rounded-2xl border border-purple-100 shadow-sm p-4">
                  <p className="text-xs font-extrabold text-purple-700 uppercase tracking-wide mb-3">🌤️ Kata-kata Cuaca</p>
                  <div className="grid grid-cols-2 gap-2">
                    {weatherWords.map(w => (
                      <div key={w.en} className="bg-slate-50 rounded-xl px-3 py-2 flex items-center gap-2">
                        <span className="text-xl">{w.icon}</span>
                        <div><p className="text-xs font-extrabold text-slate-800">{w.en}</p><p className="text-xs text-purple-600">{w.id}</p></div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-2xl border border-purple-100 shadow-sm p-4">
                  <p className="text-xs font-extrabold text-purple-700 uppercase tracking-wide mb-3">⏰ Cara Menyebutkan Waktu</p>
                  <div className="space-y-2 text-sm">
                    {[
                      { time: '03:00', say: 'three o\'clock', id: 'jam tiga tepat' },
                      { time: '03:15', say: 'a quarter past three', id: 'tiga lewat seperempat' },
                      { time: '03:30', say: 'half past three', id: 'setengah empat' },
                      { time: '03:45', say: 'a quarter to four', id: 'kurang seperempat jam empat' },
                    ].map(t => (
                      <div key={t.time} className="flex items-center gap-3 bg-purple-50 rounded-xl px-3 py-2">
                        <span className="font-extrabold text-purple-700 w-12 text-sm">{t.time}</span>
                        <div><p className="text-xs font-bold text-slate-800">"{t.say}"</p><p className="text-xs text-slate-400">{t.id}</p></div>
                      </div>
                    ))}
                  </div>
                </div>
                <DialoguePlayer title="Siaran: Prakiraan Cuaca & Percakapan" lines={DIALOGUE} />
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

export default ListeningLesson8;
