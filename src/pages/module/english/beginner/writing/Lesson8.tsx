import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine } from './writingUtils';
import type { QuizItem } from './writingUtils';

const WRITING_STORAGE_KEY = 'talky_beginner_writing_completed';
function getCompletedWritingLessons(): number[] { try { return JSON.parse(localStorage.getItem(WRITING_STORAGE_KEY) || '[]'); } catch { return []; } }
function markWritingComplete(id: number) { const d = getCompletedWritingLessons(); if (!d.includes(id)) localStorage.setItem(WRITING_STORAGE_KEY, JSON.stringify([...d, id])); }

const ROUTINE_VERBS = [
  { verb: 'wake up', id: 'bangun tidur' }, { verb: 'brush teeth', id: 'gosok gigi' },
  { verb: 'take a shower', id: 'mandi' }, { verb: 'get dressed', id: 'berpakaian' },
  { verb: 'eat breakfast', id: 'makan sarapan' }, { verb: 'go to school', id: 'pergi ke sekolah' },
  { verb: 'study', id: 'belajar' }, { verb: 'eat lunch', id: 'makan siang' },
  { verb: 'go home', id: 'pulang ke rumah' }, { verb: 'do homework', id: 'mengerjakan PR' },
  { verb: 'eat dinner', id: 'makan malam' }, { verb: 'go to bed', id: 'tidur' },
];

const QUIZ: QuizItem[] = [
  { q: '"Saya bangun jam 6 pagi." ditulis...', opts: ['I wake up at 6 AM.', 'I woke up 6 AM.', 'I am wake up at 6.'], ans: 'I wake up at 6 AM.', exp: '"I wake up at + waktu" untuk rutinitas.' },
  { q: '"Setiap hari" dalam bahasa Inggris?', opts: ['every time', 'every day', 'all day'], ans: 'every day', exp: '"Every day" = setiap hari.' },
  { q: '"Di pagi hari" dalam bahasa Inggris?', opts: ['at morning', 'in the morning', 'on morning'], ans: 'in the morning', exp: '"In the morning" = di pagi hari.' },
  { q: '"Saya makan sarapan." ditulis...', opts: ['I eat breakfast.', 'I eating breakfast.', 'I eats breakfast.'], ans: 'I eat breakfast.', exp: '"I eat breakfast" = pola rutinitas yang benar.' },
  { q: '"Biasanya" dalam bahasa Inggris?', opts: ['always', 'sometimes', 'usually'], ans: 'usually', exp: '"Usually" = biasanya.' },
  { q: '"Saya pergi ke sekolah jam 7." ditulis...', opts: ['I go school at 7.', 'I go to school at 7.', 'I goes to school at 7.'], ans: 'I go to school at 7.', exp: '"Go to + tempat" adalah pola yang benar.' },
  { q: '"Di malam hari" dalam bahasa Inggris?', opts: ['in the night', 'at night', 'on night'], ans: 'at night', exp: '"At night" = di malam hari (khusus pakai "at").' },
  { q: '"Saya tidur jam 9 malam." ditulis...', opts: ['I go to bed at 9 PM.', 'I sleep at bed 9.', 'I am sleeping 9 PM.'], ans: 'I go to bed at 9 PM.', exp: '"Go to bed" = tidur. "PM" = malam.' },
  { q: '"Kadang-kadang" dalam bahasa Inggris?', opts: ['usually', 'always', 'sometimes'], ans: 'sometimes', exp: '"Sometimes" = kadang-kadang.' },
  { q: '"Selalu" dalam bahasa Inggris?', opts: ['ever', 'always', 'never'], ans: 'always', exp: '"Always" = selalu.' },
  { q: '"Saya mandi setiap pagi." ditulis...', opts: ['I take shower every morning.', 'I take a shower every morning.', 'I am shower every morning.'], ans: 'I take a shower every morning.', exp: '"Take a shower" = mandi (artikel "a" wajib ada).' },
  { q: '"Saya mengerjakan PR setelah pulang." ditulis...', opts: ['I do homework after going home.', 'I doing homework after home.', 'I does homework after go home.'], ans: 'I do homework after going home.', exp: '"Do homework" = mengerjakan PR. "After + verb-ing."' },
  { q: '"AM" menunjukkan waktu...', opts: ['Pagi hari', 'Malam hari', 'Siang hari'], ans: 'Pagi hari', exp: '"AM" = Ante Meridiem = pagi hari (sebelum tengah hari).' },
  { q: '"PM" menunjukkan waktu...', opts: ['Pagi hari', 'Siang/Malam hari', 'Tengah malam'], ans: 'Siang/Malam hari', exp: '"PM" = Post Meridiem = sore/malam hari.' },
  { q: '"I ___ have breakfast every morning." (biasanya)', opts: ['usually', 'always', 'never'], ans: 'usually', exp: '"Usually" = biasanya. Letaknya sebelum kata kerja.' },
  { q: 'Simple Present Tense digunakan untuk...', opts: ['kejadian masa lalu', 'rutinitas/kebiasaan', 'rencana masa depan'], ans: 'rutinitas/kebiasaan', exp: 'Simple Present = menyatakan rutinitas dan kebiasaan.' },
  { q: '"I eat breakfast every morning." — "every morning" artinya?', opts: ['kemarin pagi', 'setiap pagi', 'besok pagi'], ans: 'setiap pagi', exp: '"Every morning" = setiap pagi (rutinitas).' },
  { q: 'Urutan kata yang benar: rutinitas + waktu?', opts: ['I at 7 go to school.', 'I go to school at 7.', 'At 7, I going school.'], ans: 'I go to school at 7.', exp: 'Pola dasar: Subjek + kata kerja + objek + waktu.' },
  { q: '"I usually ___ home at 3 PM." Kata kerja tepat?', opts: ['goes', 'go', 'going'], ans: 'go', exp: '"I" = kata kerja dasar tanpa -s: "go".' },
  { q: '"Saya belajar di rumah setelah makan malam." ditulis...', opts: ['I study at home after dinner.', 'I studying home after dinner.', 'I studies at home after dinner.'], ans: 'I study at home after dinner.', exp: '"I study at home after dinner." — Simple Present yang benar.' },
];

function WritingPractice() {
  const [schedule, setSchedule] = useState<Record<string, string>>({});
  const [myDay, setMyDay] = useState('');

  const times = [
    { time: '6:00 AM', key: 't1' }, { time: '7:00 AM', key: 't2' },
    { time: '8:00 AM', key: 't3' }, { time: '12:00 PM', key: 't4' },
    { time: '3:00 PM', key: 't5' }, { time: '7:00 PM', key: 't6' },
    { time: '9:00 PM', key: 't7' },
  ];

  return (
    <div className="space-y-8 max-w-xl mx-auto">
      {/* Vocabulary bank */}
      <div>
        <div className="flex items-center gap-2 mb-3"><span className="text-xl">📚</span><h2 className="text-base font-extrabold text-slate-800">Bank Kata Kerja Rutinitas</h2></div>
        <div className="grid grid-cols-2 gap-2">
          {ROUTINE_VERBS.map(v => (<div key={v.verb} className="bg-white rounded-xl px-3 py-2.5 border border-slate-100 shadow-sm"><p className="text-sm font-bold text-amber-700">{v.verb}</p><p className="text-xs text-slate-400">{v.id}</p></div>))}
        </div>
      </div>

      {/* Schedule builder */}
      <div>
        <div className="flex items-center gap-2 mb-3"><span className="text-xl">🗓️</span><h2 className="text-base font-extrabold text-slate-800">Bangun Jadwal Harianmu</h2></div>
        <p className="text-sm text-slate-500 mb-3">Tulis kegiatanmu di setiap waktu menggunakan kata kerja dari bank kata di atas.</p>
        <div className="space-y-2">
          {times.map(t => (
            <div key={t.key} className="bg-white rounded-xl p-3 border border-slate-100 flex items-center gap-3 shadow-sm">
              <span className="text-xs font-extrabold text-amber-600 w-20 shrink-0">{t.time}</span>
              <input type="text" value={schedule[t.key] ?? ''} onChange={e => setSchedule(p => ({ ...p, [t.key]: e.target.value }))} placeholder="I ... at this time." className="flex-1 border-2 border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-amber-400" />
            </div>
          ))}
        </div>
        {Object.values(schedule).filter(Boolean).length > 0 && (
          <div className="mt-4 bg-amber-50 border border-amber-100 rounded-2xl p-4">
            <p className="text-xs font-bold text-amber-700 mb-2">📝 Jadwal harianmu:</p>
            {times.filter(t => schedule[t.key]).map(t => (
              <p key={t.key} className="text-sm text-slate-700"><b className="text-amber-600">{t.time}</b> — {schedule[t.key]}</p>
            ))}
          </div>
        )}
      </div>

      {/* Free paragraph */}
      <div>
        <div className="flex items-center gap-2 mb-3"><span className="text-xl">✍️</span><h2 className="text-base font-extrabold text-slate-800">Ceritakan Hari-Hari Biasamu</h2></div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500 mb-3">Tulis paragraf singkat (3–5 kalimat) tentang rutinitas harianmu menggunakan Simple Present Tense.</p>
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 mb-3 text-xs text-amber-700">
            <p className="font-bold mb-1">💡 Panduan:</p>
            <p>• I usually wake up at ___ in the morning.</p>
            <p>• I always ___ before going to school/work.</p>
            <p>• In the afternoon, I ___.</p>
            <p>• I go to bed at ___ every night.</p>
          </div>
          <textarea rows={6} value={myDay} onChange={e => setMyDay(e.target.value)} placeholder="I usually wake up at..." className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400 resize-none" />
          <p className="text-xs text-slate-400 mt-1">{myDay.length} character(s)</p>
        </div>
      </div>
    </div>
  );
}

const WritingLesson8: React.FC = () => {
  const navigate = useNavigate();
  const nextPath = '/modul/english/beginner/writing/lesson-9';
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedWritingLessons().includes(8));
  const [showModal, setShowModal] = React.useState(false);
  const [activeTab, setActiveTab] = useState<'learn' | 'menulis' | 'kuis'>('learn');
  const handleComplete = () => { markWritingComplete(8); setIsCompleted(true); setShowModal(true); };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)' }} onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg,#F39C12,#E67E22)' }}><span style={{ fontSize: 38 }}>🏆</span></div>
            <h2 className="text-xl font-extrabold mb-1">Lesson 8 Selesai! 🎉</h2>
            <p className="text-sm text-gray-500 mb-5">Kamu sudah bisa menulis jadwal harian dalam bahasa Inggris!</p>
            <div className="flex gap-3">
              <button onClick={() => { setShowModal(false); navigate(nextPath); }} className="flex-1 py-3 rounded-xl font-bold text-white" style={{ background: '#F39C12' }}>Lesson 9 ›</button>
              <button onClick={() => { setShowModal(false); navigate(-1); }} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700">Kembali</button>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col h-[100dvh] md:h-full bg-slate-50">
        <header className="flex-none bg-white/95 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100 shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg></button>
            <div className="text-center"><h1 className="text-sm font-bold text-slate-800">Rutinitas & Jadwal Harian</h1><p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">Writing • Lesson 8</p></div>
            <button onClick={() => navigate(nextPath)} className="px-3 h-9 rounded-full text-xs font-bold text-white" style={{ background: '#F39C12' }}>Next ›</button>
          </div>
        </header>
        <div className="flex bg-white border-b border-slate-100 sticky top-[65px] z-10 shadow-sm">
          {([['learn', '📖 Materi'], ['menulis', '✏️ Jadwal'], ['kuis', '🎯 Kuis']] as const).map(([tab, label]) => (
            <button key={tab} onClick={() => setActiveTab(tab as typeof activeTab)} className={`flex-1 py-3 text-xs font-bold tracking-wide transition-all ${activeTab === tab ? 'text-amber-600 border-b-2 border-amber-500' : 'text-slate-400'}`}>{label as string}</button>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 pb-28 space-y-5">
            {activeTab === 'learn' && (
              <>
                <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-5 text-white shadow-lg"><h2 className="text-lg font-extrabold mb-1">Rutinitas Harian & Jadwal</h2><p className="text-sm text-amber-100">Belajar menulis jadwal dan rutinitas harian menggunakan Simple Present Tense dan kata keterangan waktu.</p></div>
                <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                  <h3 className="font-extrabold text-slate-800 mb-3 text-sm">🕐 Contoh Jadwal Harian</h3>
                  <div className="space-y-2">
                    {[{t:'6:00 AM',en:'I wake up at 6 AM.',id:'Saya bangun jam 6.'},{t:'7:00 AM',en:'I eat breakfast.',id:'Saya sarapan.'},{t:'8:00 AM',en:'I go to school.',id:'Saya pergi ke sekolah.'},{t:'12:00 PM',en:'I eat lunch.',id:'Saya makan siang.'},{t:'3:00 PM',en:'I go home.',id:'Saya pulang.'},{t:'9:00 PM',en:'I go to bed.',id:'Saya tidur.'}].map((s,i)=>(<div key={i} className="flex items-center gap-3 bg-slate-50 rounded-xl px-3 py-2.5"><span className="text-xs font-extrabold text-amber-600 w-20 shrink-0">{s.t}</span><div><p className="text-sm font-bold text-slate-800">{s.en}</p><p className="text-xs text-slate-400">{s.id}</p></div></div>))}
                  </div>
                </div>
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4"><h3 className="font-bold text-blue-800 mb-2 text-sm">💡 Kata Keterangan Frekuensi</h3><div className="grid grid-cols-2 gap-2">{[{en:'always',id:'selalu'},{en:'usually',id:'biasanya'},{en:'often',id:'sering'},{en:'sometimes',id:'kadang-kadang'},{en:'rarely',id:'jarang'},{en:'never',id:'tidak pernah'}].map(f=>(<div key={f.en} className="bg-white rounded-xl px-3 py-2"><p className="text-sm font-bold text-blue-800">{f.en}</p><p className="text-xs text-blue-500">{f.id}</p></div>))}</div></div>
              </>
            )}
            {activeTab === 'menulis' && <WritingPractice />}
            {activeTab === 'kuis' && <QuizEngine items={QUIZ} onComplete={handleComplete} />}
          </div>
        </div>
        <div className="sticky bottom-0 z-30 bg-white/90 backdrop-blur-xl border-t border-gray-100 px-4 py-3">
          <button onClick={isCompleted ? () => navigate(-1) : handleComplete} className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg active:scale-[0.98]" style={{ background: isCompleted ? 'linear-gradient(135deg,#4FA3D1,#1E6F9F)' : 'linear-gradient(135deg,#F39C12,#E67E22)' }}>
            {isCompleted ? '✅ Sudah Selesai' : '✅ Tandai Selesai'}
          </button>
        </div>
      </div>
    </>
  );
};

export default WritingLesson8;
