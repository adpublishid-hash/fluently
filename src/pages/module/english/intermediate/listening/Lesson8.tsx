import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine, DialoguePlayer, FillBlankExercise, getCompletedListeningLessons, markListeningComplete } from './listeningUtils';
import type { QuizItem } from './listeningUtils';
import { Headphones, PenTool, CheckCircle2, ChevronLeft } from 'lucide-react';

import { shuffledAuthored } from '../../advanced/shared/authoredQuiz';
import { intermediateListeningQuizBank } from './quizBank';
/* ══ DATA: QUIZ 20 SOAL (CEFR B1) ═══════════════════════════════════════════════ */
const QUIZ: QuizItem[] = shuffledAuthored(intermediateListeningQuizBank[8], 'intermediate/listening/8');

export default function InterListeningLesson8(): React.ReactElement {
  const navigate = useNavigate();
  const nextPath = '/modul/english/intermediate/listening/lesson-9';
  const [isCompleted, setIsCompleted] = useState(() => getCompletedListeningLessons().includes(8));
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'simak' | 'latihan' | 'kuis'>('simak');

  const handleComplete = () => { markListeningComplete(8); setIsCompleted(true); setShowModal(true); };

  const vocab = [{"en":"Scholarship","id":"Beasiswa"},{"en":"Qualify","id":"Memenuhi syarat"},{"en":"Eligible","id":"Berhak / Memenuhi syarat"},{"en":"Deadline","id":"Tenggat waktu"}];
  const DIALOGUE = [{"speaker":"Interviewer","text":"Welcome back to 'Campus Talk'. Many families worry about the cost of university, so today I'm joined by Ms Lewis, a scholarship adviser. Ms Lewis, who can apply for a scholarship?","translation":"Selamat datang kembali di 'Campus Talk'. Banyak keluarga khawatir tentang biaya kuliah, jadi hari ini saya ditemani Ibu Lewis, seorang penasihat beasiswa. Ibu Lewis, siapa yang bisa mendaftar beasiswa?","avatar":"🎤"},{"speaker":"Ms Lewis","text":"More students than you might think! Some scholarships reward excellent grades, but others are for talented athletes, musicians or students from low-income families. Many students simply never apply because they assume they won't qualify.","translation":"Lebih banyak siswa daripada yang Anda kira! Beberapa beasiswa diberikan untuk nilai yang sangat baik, tetapi ada juga yang untuk atlet berbakat, musisi, atau siswa dari keluarga berpenghasilan rendah. Banyak siswa tidak pernah mendaftar karena mereka mengira tidak akan memenuhi syarat.","avatar":"👩‍🏫"},{"speaker":"Interviewer","text":"When should students start looking?","translation":"Kapan siswa sebaiknya mulai mencari?","avatar":"🎤"},{"speaker":"Ms Lewis","text":"Ideally a year before they start university. Scholarship deadlines are often much earlier than course deadlines, so make a list of every scholarship you're eligible for and note each deadline in a calendar.","translation":"Idealnya setahun sebelum mereka mulai kuliah. Tenggat beasiswa sering jauh lebih awal daripada tenggat pendaftaran jurusan, jadi buatlah daftar semua beasiswa yang bisa Anda ikuti dan catat setiap tenggatnya di kalender.","avatar":"👩‍🏫"},{"speaker":"Interviewer","text":"Any final tips for the application itself?","translation":"Ada tips terakhir untuk formulir pendaftarannya?","avatar":"🎤"},{"speaker":"Ms Lewis","text":"Read the instructions carefully and ask a teacher to check your form. A small mistake can cost you thousands of pounds.","translation":"Bacalah petunjuknya dengan teliti dan minta guru memeriksa formulir Anda. Kesalahan kecil bisa membuat Anda kehilangan ribuan pound.","avatar":"👩‍🏫"}];
  const BLANKS = [{"sentence":"Many families worry about the ___ of university.","blank":"cost","opts":["cost","size","name","colour"],"hint":"Biaya"},{"sentence":"They assume they won't ___.","blank":"qualify","opts":["qualify","travel","remember","sleep"],"hint":"Memenuhi syarat"},{"sentence":"Note each ___ in a calendar.","blank":"deadline","opts":["deadline","holiday","birthday","recipe"],"hint":"Tenggat waktu"}];

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
              <h1 className="text-base font-extrabold text-slate-800 tracking-tight">Finding a Scholarship</h1>
              <p className="text-[10px] text-indigo-500 font-bold uppercase tracking-widest bg-indigo-50 inline-block px-2 py-0.5 rounded-full mt-0.5">Intermediate Listening • L8</p>
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
                  <h2 className="text-xl md:text-2xl font-extrabold mb-2 relative z-10">Interview: Scholarship Advice</h2>
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
                   <DialoguePlayer title="Interview: Scholarship Advice" lines={DIALOGUE as any} />
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
