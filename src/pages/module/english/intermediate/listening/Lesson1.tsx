import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine, DialoguePlayer, FillBlankExercise, getCompletedListeningLessons, markListeningComplete } from './listeningUtils';
import type { QuizItem, DialogueLine, BlankItem } from './listeningUtils';
import { Headphones, PenTool, CheckCircle2, ChevronLeft } from 'lucide-react';

import { shuffledAuthored } from '../../advanced/shared/authoredQuiz';
import { intermediateListeningQuizBank } from './quizBank';
const DIALOGUE: DialogueLine[] = [
  { speaker: 'Radio Host', text: "Welcome back to 'Morning Careers' on 99.5 FM. I'm your host, Mark. Today, we're talking about productivity in the workplace. Many people feel overwhelmed by their daily tasks. Our guest today is Sarah, a productivity coach. Welcome, Sarah!", translation: "Selamat datang kembali di 'Karir Pagi' di 99.5 FM. Saya pembawa acara Anda, Mark. Hari ini, kita berbicara tentang produktivitas di tempat kerja. Banyak orang merasa kewalahan dengan tugas harian mereka. Tamu kita hari ini adalah Sarah, seorang pelatih produktivitas. Selamat datang, Sarah!", avatar: '🎙️' },
  { speaker: 'Sarah', text: "Thank you, Mark. It's great to be here. Yes, feeling overwhelmed is very common. In my experience, the biggest problem is that people try to multitask. They check emails while writing reports, and it actually slows them down.", translation: "Terima kasih, Mark. Sangat menyenangkan berada di sini. Ya, merasa kewalahan sangatlah umum. Menurut pengalaman saya, masalah terbesarnya adalah orang-orang mencoba melakukan banyak tugas sekaligus. Mereka memeriksa email sambil menulis laporan, dan itu sebenarnya memperlambat mereka.", avatar: '👩‍💼' },
  { speaker: 'Radio Host', text: "That is interesting! Are you saying we should only do one thing at a time?", translation: "Itu menarik! Apakah Anda mengatakan kita harus melakukan satu hal saja pada satu waktu?", avatar: '🎙️' },
  { speaker: 'Sarah', text: "Exactly. It is called 'single-tasking'. When you focus your energy on one specific task, you finish it much faster and with fewer mistakes. I always advise my clients to turn off phone notifications during deep work.", translation: "Tepat sekali. Itu disebut 'tugas tunggal'. Ketika Anda memfokuskan energi Anda pada satu tugas tertentu, Anda menyelesaikannya jauh lebih cepat dan dengan lebih sedikit kesalahan. Saya selalu menasihati klien saya untuk mematikan notifikasi telepon selama pekerjaan mendalam.", avatar: '👩‍💼' },
  { speaker: 'Radio Host', text: "I see. But what if your boss expects you to answer messages immediately?", translation: "Oh begitu. Tapi bagaimana jika atasan Anda berharap Anda membalas pesan dengan segera?", avatar: '🎙️' },
  { speaker: 'Sarah', text: "Communication is key. You should tell your team, 'I am working on an important project from 10 AM to 12 PM, so I won't be checking messages.' Most employers will appreciate your dedication to quality work.", translation: "Komunikasi adalah kuncinya. Anda harus memberi tahu tim Anda, 'Saya sedang mengerjakan proyek penting dari jam 10 pagi sampai jam 12 siang, jadi saya tidak akan memeriksa pesan.' Sebagian besar majikan akan menghargai dedikasi Anda terhadap pekerjaan yang berkualitas.", avatar: '👩‍💼' },
  { speaker: 'Radio Host', text: "That makes a lot of sense. Another issue many listeners face is the endless number of meetings. Do you have any advice for handling that?", translation: "Itu sangat masuk akal. Masalah lain yang dihadapi banyak pendengar adalah jumlah rapat yang tiada habisnya. Apakah Anda punya saran untuk menangani itu?", avatar: '🎙️' },
  { speaker: 'Sarah', text: "Yes. Before accepting a meeting invitation, ask yourself if the issue could be resolved with a quick email. If a meeting is necessary, always make sure there is a clear agenda.", translation: "Ya. Sebelum menerima undangan rapat, tanyakan pada diri sendiri apakah masalah tersebut dapat diselesaikan dengan email singkat. Jika rapat diperlukan, selalu pastikan ada agenda yang jelas.", avatar: '👩‍💼' },
  { speaker: 'Radio Host', text: "Fantastic advice, Sarah. Let's take a short commercial break. When we return, we'll take some calls from our listeners.", translation: "Nasihat yang fantastis, Sarah. Mari kita jeda komersial sejenak. Saat kita kembali, kita akan menerima beberapa telepon dari pendengar kita.", avatar: '🎙️' },
];

const BLANKS: BlankItem[] = [
  { sentence: 'Many people feel ___ by their daily tasks.', blank: 'overwhelmed', opts: ['overwhelmed', 'excited', 'bored', 'happy'], hint: 'Merasa kewalahan / terbebani' },
  { sentence: 'The biggest problem is that people try to ___.', blank: 'multitask', opts: ['multitask', 'sleep', 'complain', 'quit'], hint: 'Mengerjakan banyak hal bersamaan' },
  { sentence: 'You should focus your energy on one ___ task.', blank: 'specific', opts: ['specific', 'general', 'random', 'easy'], hint: 'Satu tugas tertentu / spesifik' },
  { sentence: 'I advise my clients to turn off phone ___.', blank: 'notifications', opts: ['notifications', 'screens', 'chargers', 'buttons'], hint: 'Pemberitahuan dari HP' },
  { sentence: 'Most ___ will appreciate your dedication to quality work.', blank: 'employers', opts: ['employers', 'friends', 'enemies', 'pets'], hint: 'Orang yang mempekerjakan / atasan' },
  { sentence: 'Ask if the issue can be resolved with a quick ___.', blank: 'email', opts: ['email', 'call', 'meeting', 'letter'], hint: 'Surat elektronik' },
  { sentence: 'If a meeting is necessary, make sure there is a clear ___.', blank: 'agenda', opts: ['agenda', 'coffee', 'room', 'chair'], hint: 'Daftar hal yang akan dibicarakan (agenda)' },
];

const QUIZ: QuizItem[] = shuffledAuthored(intermediateListeningQuizBank[1], 'intermediate/listening/1');

export default function InterListeningLesson1() {
  const navigate = useNavigate();
  const nextPath = '/modul/english/intermediate/listening/lesson-2';
  const [isCompleted, setIsCompleted] = useState(() => getCompletedListeningLessons().includes(1));
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'simak' | 'latihan' | 'kuis'>('simak');

  const handleComplete = () => { markListeningComplete(1); setIsCompleted(true); setShowModal(true); };

  const vocab = [
    { en: 'Productivity', id: 'Produktivitas / Daya produksi' },
    { en: 'Overwhelmed', id: 'Kewalahan / Terbebani' },
    { en: 'Multitask', id: 'Melakukan banyak tugas sekaligus' },
    { en: 'Notification', id: 'Pemberitahuan' },
    { en: 'Agenda', id: 'Daftar acara / Hal yang akan dibahas' },
    { en: 'Dedication', id: 'Dedikasi / Pengabdian' },
  ];

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 animate-fade-in" style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }} onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-[2rem] p-8 max-w-sm w-full text-center shadow-2xl relative overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-t-[2rem] -z-10" />
            <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 bg-white shadow-xl border-4 border-indigo-50 mt-4">
              <span className="text-5xl">🎧</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-800 mb-2">Lesson Selesai! 🎉</h2>
            <p className="text-slate-500 mb-8 leading-relaxed">Selamat! Anda berhasil memahami percakapan B1 tentang produktivitas kerja.</p>
            <div className="space-y-3">
              <button onClick={() => { setShowModal(false); navigate(nextPath); }} className="w-full py-4 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all active:scale-95">Pelajari Materi Selanjutnya</button>
              <button onClick={() => setShowModal(false)} className="w-full py-4 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all">Tutup</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col h-[100dvh] md:h-full bg-slate-50">
        <header className="flex-none bg-white/95 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100 shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-600 transition-colors">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="text-center">
              <h1 className="text-sm font-bold text-slate-800 line-clamp-1">Productivity & Careers</h1>
              <p className="text-[10px] text-indigo-500 font-bold uppercase tracking-widest">Intermediate Listening • L1</p>
            </div>
            <button onClick={() => navigate(nextPath)} className="px-3 h-9 rounded-full text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors">Next ›</button>
          </div>
        </header>

        <div className="flex bg-white border-b border-slate-100 sticky top-[65px] z-10 p-2 gap-2 shadow-sm">
          {(['simak', 'latihan', 'kuis'] as const).map(tab => {
            const labels = { simak: 'Simak TTS', latihan: 'Rumpang', kuis: 'Kuis 20 Soal' };
            const icons = { simak: <Headphones className="w-4 h-4" />, latihan: <PenTool className="w-4 h-4" />, kuis: <CheckCircle2 className="w-4 h-4" /> };
            const isActive = activeTab === tab;
            return (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-3 text-sm font-bold tracking-wide transition-all rounded-xl flex items-center justify-center gap-2 ${isActive ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}>
                {icons[tab]} {labels[tab]}
              </button>
            )
          })}
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-8 pb-28 space-y-6">
            {activeTab === 'simak' && (
              <div className="animate-fade-in space-y-6">
                <div className="bg-gradient-to-br from-indigo-600 to-cyan-500 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-20">
                     <Headphones className="w-24 h-24" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-extrabold mb-2 relative z-10">B1 Listening: Radio Programs</h2>
                  <p className="text-sm md:text-base text-indigo-50 leading-relaxed max-w-lg relative z-10">
                    Siswa level B1 mampu mengerti esensi utama dari program radio atau TV tentang topik yang lazim seperti dunia profesional.
                  </p>
                </div>

                <div className="bg-white rounded-3xl border border-indigo-50 shadow-sm p-6 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500" />
                  <p className="text-xs font-extrabold text-indigo-700 uppercase tracking-widest mb-4">📖 KOSAKATA B1 PENTING</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {vocab.map(v => (
                      <div key={v.en} className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 flex items-center justify-between hover:bg-indigo-50 transition-colors">
                         <span className="text-sm font-bold text-slate-800">{v.en}</span>
                         <span className="text-xs text-indigo-600 font-medium text-right max-w-[60%] leading-tight">{v.id}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                   <DialoguePlayer title="Radio Interview: Morning Careers" lines={DIALOGUE} />
                </div>
              </div>
            )}

            {activeTab === 'latihan' && (
              <div className="animate-fade-in">
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 mb-6">
                  <h3 className="text-lg font-bold text-slate-800 mb-2">Tebak Kata yang Hilang (Fill in the Blank)</h3>
                  <p className="text-sm text-slate-500 mb-2">Dengarkan kembali ucapannya atau gunakan konteks kalimat.</p>
                </div>
                <FillBlankExercise items={BLANKS} />
              </div>
            )}
            
            {activeTab === 'kuis' && (
              <div className="animate-fade-in">
                <QuizEngine items={QUIZ} onComplete={handleComplete} />
              </div>
            )}
          </div>
        </div>

        <div className="sticky bottom-0 z-30 bg-white/90 backdrop-blur-xl border-t border-slate-200 p-4">
          <button onClick={isCompleted ? () => navigate(-1) : handleComplete} className="w-full py-4 rounded-2xl font-bold text-white flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all hover:shadow-xl" style={{ background: isCompleted ? 'linear-gradient(135deg,#10B981,#059669)' : 'linear-gradient(135deg,#4F46E5,#4338CA)' }}>
            <CheckCircle2 className="w-5 h-5" />
            {isCompleted ? 'Sudah Selesai ✓ (Kembali)' : 'Tandai Selesai ✓'}
          </button>
        </div>
      </div>
    </>
  );
}
