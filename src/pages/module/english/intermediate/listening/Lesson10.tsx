import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine, DialoguePlayer, FillBlankExercise, getCompletedListeningLessons, markListeningComplete } from './listeningUtils';
import type { QuizItem } from './listeningUtils';
import { Headphones, PenTool, CheckCircle2, ChevronLeft } from 'lucide-react';

import { shuffledAuthored } from '../../advanced/shared/authoredQuiz';
import { intermediateListeningQuizBank } from './quizBank';
/* ══ DATA: QUIZ 20 SOAL (CEFR B1) ═══════════════════════════════════════════════ */
const QUIZ: QuizItem[] = shuffledAuthored(intermediateListeningQuizBank[10], 'intermediate/listening/10');

export default function InterListeningLesson10(): React.ReactElement {
  const navigate = useNavigate();
  const nextPath = '/modul/english/intermediate/listening/lesson-11';
  const [isCompleted, setIsCompleted] = useState(() => getCompletedListeningLessons().includes(10));
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'simak' | 'latihan' | 'kuis'>('simak');

  const handleComplete = () => { markListeningComplete(10); setIsCompleted(true); setShowModal(true); };

  const vocab = [{"en":"Nutritionist","id":"Ahli Gizi"},{"en":"Habits","id":"Kebiasaan"},{"en":"Routine","id":"Rutinitas"},{"en":"Digestion","id":"Pencernaan"}];
  const DIALOGUE = [{"speaker":"Host","text":"Welcome to the 'Daily Health' podcast. I'm Jenna. Today my guest is nutritionist David. We are checking out simple healthy habits you can easily add to your busy routine. Thanks for coming, David.","translation":"Selamat datang di podcast 'Kesehatan Harian'. Saya Jenna. Hari ini tamu saya adalah ahli gizi David. Kita akan melihat kebiasaan sehat sederhana yang dapat dengan mudah ditambahkan ke rutinitas sibuk Anda. Terima kasih telah datang, David.","avatar":"🎙️"},{"speaker":"David","text":"Thanks for having me, Jenna. A great start is drinking water right after you wake up. Also, taking a short ten-minute walk after lunch dramatically improves digestion and reduces evening fatigue.","translation":"Terima kasih telah mengundang saya, Jenna. Awal yang baik adalah meminum air putih segera setelah bangun. Selain itu, berjalan kaki singkat sepuluh menit setelah makan siang secara dramatis memperbaiki pencernaan dan mengurangi kelelahan di sore hari.","avatar":"👨‍⚕️"}];
  const BLANKS = [{"sentence":"We are checking out simple healthy ___ you can add to your routine.","blank":"habits","opts":["habits","books","clothes","foods"],"hint":"Kebiasaan"},{"sentence":"Drinking water right after you ___ up.","blank":"wake","opts":["wake","stand","look","give"],"hint":"Bangun tidur"},{"sentence":"Taking a 10-minute walk improves ___.","blank":"digestion","opts":["digestion","sleep","hair","vision"],"hint":"Pencernaan"}];

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
            <p className="text-slate-500 mb-8 leading-relaxed">Selamat! Anda berhasil memahami percakapan B1 tentang topik ini.</p>
            <div className="space-y-3">
              <button onClick={() => { setShowModal(false); navigate(nextPath); }} className="w-full py-4 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all active:scale-95">Pelajari Materi Selanjutnya</button>
              <button onClick={() => setShowModal(false)} className="w-full py-4 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all">Tutup</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col h-[100dvh] md:h-[calc(100vh-2rem)] bg-slate-50 md:rounded-3xl overflow-hidden shadow-2xl md:max-w-4xl md:mx-auto md:my-4 border border-slate-200">
        <header className="flex-none bg-white/80 backdrop-blur-xl sticky top-0 z-20 border-b border-slate-100 shadow-sm transition-all py-3 px-4">
          <div className="flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-600 transition-colors">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="text-center">
              <h1 className="text-base font-extrabold text-slate-800 tracking-tight">Healthy Lifestyle Habits</h1>
              <p className="text-[10px] text-indigo-500 font-bold uppercase tracking-widest bg-indigo-50 inline-block px-2 py-0.5 rounded-full mt-0.5">Intermediate Listening • L10</p>
            </div>
            <button onClick={() => navigate(nextPath)} className="px-4 py-2 rounded-full text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors">Next ›</button>
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
                  <h2 className="text-xl md:text-2xl font-extrabold mb-2 relative z-10">Podcast: Healthy Habits</h2>
                  <p className="text-sm md:text-base text-indigo-50 leading-relaxed max-w-lg relative z-10">
                    Siswa level B1 mampu mengerti esensi utama dari program radio atau wawancara profesional bertema keseharian.
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
                   <DialoguePlayer title="Podcast: Healthy Habits" lines={DIALOGUE as any} />
                </div>
              </div>
            )}

            {activeTab === 'latihan' && (
              <div className="animate-fade-in">
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 mb-6">
                  <h3 className="text-lg font-bold text-slate-800 mb-2">Tebak Kata yang Hilang (Fill in the Blank)</h3>
                  <p className="text-sm text-slate-500 mb-2">Dengarkan kembali ucapannya atau gunakan konteks kalimat.</p>
                </div>
                <FillBlankExercise items={BLANKS as any} />
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
