import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine, DialoguePlayer, FillBlankExercise, getCompletedListeningLessons, markListeningComplete } from './listeningUtils';
import type { QuizItem, DialogueLine, BlankItem } from './listeningUtils';

const DIALOGUE: DialogueLine[] = [
  { speaker: 'Sarah', text: 'Good morning! You must be the new marketing manager. I\'m Sarah from HR.', translation: 'Selamat pagi! Kamu pasti manajer marketing baru. Saya Sarah dari HR.', avatar: '👩' },
  { speaker: 'David', text: 'Good morning, Sarah! Yes, that\'s right. I\'m David. I started this morning.', translation: 'Selamat pagi, Sarah! Ya, benar. Saya David. Saya mulai hari ini.', avatar: '👨' },
  { speaker: 'Sarah', text: 'Welcome to the company! Your office is on the third floor. Let me show you around.', translation: 'Selamat datang di perusahaan! Kantormu di lantai tiga. Izinkan saya menunjukkan sekitar.', avatar: '👩' },
  { speaker: 'David', text: 'Thank you! Do I have a meeting today? I want to be prepared.', translation: 'Terima kasih! Apakah saya ada rapat hari ini? Saya ingin bersiap.', avatar: '👨' },
  { speaker: 'Sarah', text: 'Yes, there\'s a team meeting at two o\'clock in the conference room on the same floor.', translation: 'Ya, ada rapat tim jam dua di ruang konferensi di lantai yang sama.', avatar: '👩' },
  { speaker: 'David', text: 'Perfect. Who should I report to? Is my supervisor here today?', translation: 'Bagus. Kepada siapa saya melapor? Apakah supervisor saya ada hari ini?', avatar: '👨' },
  { speaker: 'Sarah', text: 'Your supervisor is Mr. Chen. He is in a meeting now but will be free after lunch, around one.', translation: 'Supervisor Anda adalah Pak Chen. Dia sedang rapat sekarang tapi akan bebas setelah makan siang, sekitar jam satu.', avatar: '👩' },
  { speaker: 'David', text: 'Great. I\'ll prepare my introduction for the team meeting. Thanks for everything, Sarah!', translation: 'Bagus. Saya akan mempersiapkan perkenalan saya untuk rapat tim. Terima kasih untuk segalanya, Sarah!', avatar: '👨' },
];

const BLANKS: BlankItem[] = [
  { sentence: 'Your office is on the ___ floor.', blank: 'third', opts: ['first', 'second', 'third', 'fourth'], hint: 'Lantai berapa kantor David?' },
  { sentence: 'The team meeting is at two o\'clock in the ___ room.', blank: 'conference', opts: ['conference', 'meeting', 'dining', 'waiting'], hint: 'Ruang untuk rapat = ___ room' },
  { sentence: 'Who should I ___ to?', blank: 'report', opts: ['report', 'talk', 'listen', 'answer'], hint: '"Melapor kepada" = ___ to' },
  { sentence: 'He will be ___ after lunch, around one.', blank: 'free', opts: ['free', 'busy', 'ready', 'back'], hint: 'Bebas / tidak sibuk = ___' },
  { sentence: 'I\'ll ___ my introduction for the meeting.', blank: 'prepare', opts: ['prepare', 'make', 'write', 'think'], hint: 'Mempersiapkan = ___' },
];

const QUIZ: QuizItem[] = [
  { q: '"You must be the new marketing manager." artinya...', opts: ['Bisakah kamu jadi manajer?', 'Kamu pasti manajer marketing baru.', 'Kamu harus jadi manajer.', 'Kamu ingin jadi manajer.'], ans: 'Kamu pasti manajer marketing baru.', exp: '"Must be" = pasti/kemungkinan besar (kesimpulan logis).' },
  { q: '"Let me show you around." artinya...', opts: ['Saya tidak tahu sekitar.', 'Mari kita pergi.', 'Izinkan saya menunjukkan sekitar.', 'Biarkan saya pergi.'], ans: 'Izinkan saya menunjukkan sekitar.', exp: '"Show around" = memandu/menunjukkan tempat baru kepada seseorang.' },
  { q: '"I started this morning." — tense yang digunakan?', opts: ['Future Simple', 'Past Simple', 'Present Simple', 'Present Perfect'], ans: 'Past Simple', exp: '"I started" = Past Simple, kejadian yang selesai (pagi ini).' },
  { q: 'Di lantai berapa kantor David?', opts: ['Ketiga', 'Kedua', 'Pertama', 'Keempat'], ans: 'Ketiga', exp: '"Third floor" = lantai ketiga.' },
  { q: '"I want to be prepared." artinya...', opts: ['Apakah saya bersiap?', 'Saya sudah bersiap.', 'Saya tidak ingin bersiap.', 'Saya ingin bersiap.'], ans: 'Saya ingin bersiap.', exp: '"Want to be + adjective" = ingin dalam keadaan tertentu.' },
  { q: '"The meeting is at two o\'clock." jam berapa rapat?', opts: ['12.00', '15.00', '14.00', '13.00'], ans: '14.00', exp: '"Two o\'clock" = jam 2 = 14.00.' },
  { q: '"Who should I report to?" artinya...', opts: ['Kapan saya melapor?', 'Kepada siapa saya melapor?', 'Mengapa saya melapor?', 'Di mana saya melapor?'], ans: 'Kepada siapa saya melapor?', exp: '"Who should I...?" = kepada siapa saya seharusnya...?' },
  { q: '"He is in a meeting now." artinya...', opts: ['Dia sudah rapat.', 'Dia tidak rapat.', 'Dia sedang rapat sekarang.', 'Dia akan rapat.'], ans: 'Dia sedang rapat sekarang.', exp: '"In a meeting" = sedang dalam rapat (keadaan saat ini, Present Continuous).' },
  { q: '"He will be free after lunch." artinya...', opts: ['Dia bebas saat makan siang.', 'Dia tidak bebas.', 'Dia bebas sebelum makan siang.', 'Dia akan bebas setelah makan siang.'], ans: 'Dia akan bebas setelah makan siang.', exp: '"Will be free after lunch" = akan bebas setelah makan siang.' },
  { q: '"HR" dalam konteks pekerjaan singkatan dari...', opts: ['High Rank', 'Home Resources', 'Human Resources', 'Head of Research'], ans: 'Human Resources', exp: 'HR = Human Resources = departemen yang mengurus karyawan.' },
  { q: '"Conference room" artinya...', opts: ['Ruang tunggu', 'Ruang konferensi/rapat', 'Ruang istirahat', 'Ruang makan'], ans: 'Ruang konferensi/rapat', exp: '"Conference room" = ruang rapat besar/formal.' },
  { q: '"I\'ll prepare my introduction." menggunakan...', opts: ["Future will", 'Present Perfect', 'Past Simple', 'Present Continuous'], ans: "Future will", exp: '"I\'ll prepare" = "I will prepare" = rencana atau keinginan di masa depan.' },
  { q: '"Supervisor" artinya...', opts: ['Bawahan', 'Klien', 'Atasan/pengawas', 'Rekan kerja'], ans: 'Atasan/pengawas', exp: '"Supervisor" = orang yang mengawasi/membimbing pekerjaan kita.' },
  { q: '"Around one" = jam berapa kira-kira?', opts: ['12.00', '14.00', '13.00', '15.00'], ans: '13.00', exp: '"Around one" = sekitar jam 1 = 13.00.' },
  { q: '"Welcome to the company!" adalah ekspresi...', opts: ['Perpisahan', 'Keluhan', 'Pertanyaan', 'Sambutan'], ans: 'Sambutan', exp: '"Welcome to..." = ucapan selamat datang (sambutan).' },
  { q: '"Is my supervisor here today?" — "here" artinya...', opts: ['Dekat', 'Ada di sini/hadir hari ini', 'Bekerja', 'Siap'], ans: 'Ada di sini/hadir hari ini', exp: '"Is someone here?" = apakah orang itu ada/hadir di lokasi ini.' },
  { q: '"Thanks for everything." artinya...', opts: ['Tidak perlu berterima kasih.', 'Terima kasih untuk segalanya.', 'Terima kasih untuk sesuatu.', 'Terima kasih untuk apa saja.'], ans: 'Terima kasih untuk segalanya.', exp: '"Everything" = segalanya. Ekspresi rasa terima kasih yang kuat.' },
  { q: '"Marketing manager" = seseorang yang...', opts: ['Memimpin tim marketing/pemasaran', 'Membuat produk', 'Mengurus karyawan', 'Mengelola keuangan'], ans: 'Memimpin tim marketing/pemasaran', exp: '"Marketing manager" = manajer yang memimpin divisi pemasaran.' },
  { q: '"Good morning" digunakan pada waktu...', opts: ['Setelah tengah hari', 'Malam hari', 'Pagi hari', 'Kapan saja'], ans: 'Pagi hari', exp: '"Good morning" = salam pagi (biasanya sebelum jam 12 siang).' },
  { q: 'Siapa nama supervisor David?', opts: ['Mr. Kim', 'Mr. Lee', 'Mr. Chen', 'Mr. Brown'], ans: 'Mr. Chen', exp: 'Sarah menyebutkan "Your supervisor is Mr. Chen."' },
];

export default function ElemListeningLesson2() {
  const navigate = useNavigate();
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedListeningLessons().includes(2));
  const [showModal, setShowModal] = React.useState(false);
  const [activeTab, setActiveTab] = useState<'simak' | 'latihan' | 'kuis'>('simak');
  const handleComplete = () => { markListeningComplete(2); setIsCompleted(true); setShowModal(true); };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)' }} onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg,#4FA3D1,#1E6F9F)' }}><span style={{ fontSize: 38 }}>🏆</span></div>
            <h2 className="text-xl font-extrabold mb-1">Lesson 2 Selesai! 🎉</h2>
            <p className="text-sm text-gray-500 mb-5">Kamu sudah bisa memahami percakapan di tempat kerja!</p>
            <div className="flex gap-3">
              <button onClick={() => { setShowModal(false); navigate('/modul/english/elementary/listening/lesson-3'); }} className="flex-1 py-3 rounded-xl font-bold text-white bg-teal-500">Lesson 3 ›</button>
              <button onClick={() => { setShowModal(false); navigate(-1); }} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700">Kembali</button>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col h-[100dvh] bg-slate-50">
        <header className="flex-none bg-white/95 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100 shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg></button>
            <div className="text-center"><h1 className="text-sm font-bold text-slate-800">Di Tempat Kerja</h1><p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">Elementary Listening • L2</p></div>
            <button onClick={() => navigate('/modul/english/elementary/listening/lesson-3')} className="px-3 h-9 rounded-full text-xs font-bold text-white bg-teal-500">Next ›</button>
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
                  <h2 className="text-lg font-extrabold mb-1">💼 Di Tempat Kerja</h2>
                  <p className="text-sm text-teal-100">Pahami percakapan hari pertama kerja: perkenalan, jadwal rapat, dan struktur perusahaan.</p>
                </div>
                <div className="bg-white rounded-2xl border border-sky-100 shadow-sm p-4">
                  <p className="text-xs font-extrabold text-teal-700 uppercase tracking-wide mb-3">📖 Kosakata Penting</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[{en:'Conference room',id:'Ruang rapat'},{en:'Supervisor',id:'Atasan/pengawas'},{en:'Report to',id:'Melapor kepada'},{en:'Marketing manager',id:'Manajer pemasaran'},{en:'Human Resources (HR)',id:'Sumber Daya Manusia'},{en:'Be prepared',id:'Bersiap diri'}].map(v => (<div key={v.en} className="bg-slate-50 rounded-xl px-3 py-2"><p className="text-xs font-extrabold text-slate-800">{v.en}</p><p className="text-xs text-teal-600">{v.id}</p></div>))}
                  </div>
                </div>
                <DialoguePlayer title="Percakapan: Hari Pertama di Kantor" lines={DIALOGUE} />
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
