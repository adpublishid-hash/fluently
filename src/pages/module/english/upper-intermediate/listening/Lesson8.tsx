import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine, DialoguePlayer, FillBlankExercise } from './listeningUtils';
import type { QuizItem, DialogueLine, BlankItem } from './listeningUtils';
import { Headphones, PenTool, CheckCircle2, ChevronLeft } from 'lucide-react';

const DIALOGUE: DialogueLine[] = [
  { "speaker": "Speaker A", "avatar": "👤", "text": "This lecture examines Pendidikan & Kebijakan in depth at CEFR B2 level. The key issues include complex arguments, specific data, and multiple perspectives that students must follow and analyse.", "translation": "Kuliah ini membahas topik Pendidikan & Kebijakan secara mendalam di tingkat CEFR B2." },
  { "speaker": "Speaker B", "avatar": "👥", "text": "From a critical perspective, Pendidikan & Kebijakan raises several interconnected challenges that require nuanced analysis. The evidence suggests that simplistic solutions are unlikely to succeed given the complexity of the factors involved.", "translation": "Dari perspektif kritis, topik ini menimbulkan beberapa tantangan yang saling terhubung yang membutuhkan analisis yang bernuansa." },
  { "speaker": "Speaker A", "avatar": "👤", "text": "What does the research evidence tell us? Multiple studies indicate that the approaches that have proven most effective are those that combine technical solutions with broader systemic and institutional change. Neither approach alone appears sufficient.", "translation": "Apa yang dikatakan bukti penelitian? Beberapa studi menunjukkan bahwa pendekatan yang terbukti paling efektif adalah yang menggabungkan solusi teknis dengan perubahan sistemik dan kelembagaan yang lebih luas." },
  { "speaker": "Speaker B", "avatar": "👥", "text": "I agree that a multi-pronged approach is necessary. However, implementation presents significant challenges, particularly in contexts where resources are limited and institutional capacity is weak. The political will to sustain long-term initiatives remains a critical variable.", "translation": "Saya setuju bahwa pendekatan multi-cabang diperlukan. Namun, implementasi menghadirkan tantangan yang signifikan, terutama dalam konteks di mana sumber daya terbatas dan kapasitas kelembagaan lemah." }
];

const BLANKS: BlankItem[] = [
  { "sentence": "This topic requires ___ analysis of multiple arguments.", "blank": "nuanced", "opts": ["nuanced", "simple", "numeric", "neutral"], "hint": "Analisis yang mempertimbangkan berbagai sudut pandang" },
  { "sentence": "The evidence ___ that simplistic solutions rarely succeed.", "blank": "suggests", "opts": ["suggests", "suspends", "selects", "separates"], "hint": "Menunjukkan / mengindikasikan" },
  { "sentence": "A ___ approach combines multiple strategies.", "blank": "multi-pronged", "opts": ["multi-pronged", "single-track", "old-fashioned", "cost-free"], "hint": "Pendekatan dengan banyak strategi berbeda" },
  { "sentence": "Political ___ to sustain long-term initiatives is critical.", "blank": "will", "opts": ["will", "wall", "bell", "ball"], "hint": "Kemauan / niat untuk bertindak" },
  { "sentence": "Implementation challenges are significant where ___ capacity is weak.", "blank": "institutional", "opts": ["institutional", "international", "instructional", "industrial"], "hint": "Berkaitan dengan lembaga dan organisasi" },
  { "sentence": "The most successful programmes address both technical and ___ causes.", "blank": "systemic", "opts": ["systemic", "specific", "symbolic", "synthetic"], "hint": "Berkaitan dengan sistem yang lebih besar" },
  { "sentence": "Countries with strong ___ tend to achieve better outcomes.", "blank": "governance", "opts": ["governance", "geography", "geology", "geometry"], "hint": "Tata kelola / kepemerintahan yang efektif" }
];

const QUIZ: QuizItem[] = [
  { "q": "Question 1 about Pendidikan & Kebijakan: Which statement best reflects the main argument presented?", "opts": ["The simplest solution is always the best", "Evidence-based, multi-dimensional approaches are most effective", "Technology alone can solve all problems", "Political will is the only factor that matters"], "ans": "Evidence-based, multi-dimensional approaches are most effective", "exp": "At CEFR B2 level, listeners must be able to follow complex arguments and identify the main thesis — in this case, that multi-dimensional, evidence-based approaches work best for Pendidikan & Kebijakan." },
  { "q": "Question 2 about Pendidikan & Kebijakan: Which statement best reflects the main argument presented?", "opts": ["The simplest solution is always the best", "Evidence-based, multi-dimensional approaches are most effective", "Technology alone can solve all problems", "Political will is the only factor that matters"], "ans": "Evidence-based, multi-dimensional approaches are most effective", "exp": "At CEFR B2 level, listeners must be able to follow complex arguments and identify the main thesis — in this case, that multi-dimensional, evidence-based approaches work best for Pendidikan & Kebijakan." },
  { "q": "Question 3 about Pendidikan & Kebijakan: Which statement best reflects the main argument presented?", "opts": ["The simplest solution is always the best", "Evidence-based, multi-dimensional approaches are most effective", "Technology alone can solve all problems", "Political will is the only factor that matters"], "ans": "Evidence-based, multi-dimensional approaches are most effective", "exp": "At CEFR B2 level, listeners must be able to follow complex arguments and identify the main thesis — in this case, that multi-dimensional, evidence-based approaches work best for Pendidikan & Kebijakan." },
  { "q": "Question 4 about Pendidikan & Kebijakan: Which statement best reflects the main argument presented?", "opts": ["The simplest solution is always the best", "Evidence-based, multi-dimensional approaches are most effective", "Technology alone can solve all problems", "Political will is the only factor that matters"], "ans": "Evidence-based, multi-dimensional approaches are most effective", "exp": "At CEFR B2 level, listeners must be able to follow complex arguments and identify the main thesis — in this case, that multi-dimensional, evidence-based approaches work best for Pendidikan & Kebijakan." },
  { "q": "Question 5 about Pendidikan & Kebijakan: Which statement best reflects the main argument presented?", "opts": ["The simplest solution is always the best", "Evidence-based, multi-dimensional approaches are most effective", "Technology alone can solve all problems", "Political will is the only factor that matters"], "ans": "Evidence-based, multi-dimensional approaches are most effective", "exp": "At CEFR B2 level, listeners must be able to follow complex arguments and identify the main thesis — in this case, that multi-dimensional, evidence-based approaches work best for Pendidikan & Kebijakan." },
  { "q": "Question 6 about Pendidikan & Kebijakan: Which statement best reflects the main argument presented?", "opts": ["The simplest solution is always the best", "Evidence-based, multi-dimensional approaches are most effective", "Technology alone can solve all problems", "Political will is the only factor that matters"], "ans": "Evidence-based, multi-dimensional approaches are most effective", "exp": "At CEFR B2 level, listeners must be able to follow complex arguments and identify the main thesis — in this case, that multi-dimensional, evidence-based approaches work best for Pendidikan & Kebijakan." },
  { "q": "Question 7 about Pendidikan & Kebijakan: Which statement best reflects the main argument presented?", "opts": ["The simplest solution is always the best", "Evidence-based, multi-dimensional approaches are most effective", "Technology alone can solve all problems", "Political will is the only factor that matters"], "ans": "Evidence-based, multi-dimensional approaches are most effective", "exp": "At CEFR B2 level, listeners must be able to follow complex arguments and identify the main thesis — in this case, that multi-dimensional, evidence-based approaches work best for Pendidikan & Kebijakan." },
  { "q": "Question 8 about Pendidikan & Kebijakan: Which statement best reflects the main argument presented?", "opts": ["The simplest solution is always the best", "Evidence-based, multi-dimensional approaches are most effective", "Technology alone can solve all problems", "Political will is the only factor that matters"], "ans": "Evidence-based, multi-dimensional approaches are most effective", "exp": "At CEFR B2 level, listeners must be able to follow complex arguments and identify the main thesis — in this case, that multi-dimensional, evidence-based approaches work best for Pendidikan & Kebijakan." },
  { "q": "Question 9 about Pendidikan & Kebijakan: Which statement best reflects the main argument presented?", "opts": ["The simplest solution is always the best", "Evidence-based, multi-dimensional approaches are most effective", "Technology alone can solve all problems", "Political will is the only factor that matters"], "ans": "Evidence-based, multi-dimensional approaches are most effective", "exp": "At CEFR B2 level, listeners must be able to follow complex arguments and identify the main thesis — in this case, that multi-dimensional, evidence-based approaches work best for Pendidikan & Kebijakan." },
  { "q": "Question 10 about Pendidikan & Kebijakan: Which statement best reflects the main argument presented?", "opts": ["The simplest solution is always the best", "Evidence-based, multi-dimensional approaches are most effective", "Technology alone can solve all problems", "Political will is the only factor that matters"], "ans": "Evidence-based, multi-dimensional approaches are most effective", "exp": "At CEFR B2 level, listeners must be able to follow complex arguments and identify the main thesis — in this case, that multi-dimensional, evidence-based approaches work best for Pendidikan & Kebijakan." },
  { "q": "Question 11 about Pendidikan & Kebijakan: Which statement best reflects the main argument presented?", "opts": ["The simplest solution is always the best", "Evidence-based, multi-dimensional approaches are most effective", "Technology alone can solve all problems", "Political will is the only factor that matters"], "ans": "Evidence-based, multi-dimensional approaches are most effective", "exp": "At CEFR B2 level, listeners must be able to follow complex arguments and identify the main thesis — in this case, that multi-dimensional, evidence-based approaches work best for Pendidikan & Kebijakan." },
  { "q": "Question 12 about Pendidikan & Kebijakan: Which statement best reflects the main argument presented?", "opts": ["The simplest solution is always the best", "Evidence-based, multi-dimensional approaches are most effective", "Technology alone can solve all problems", "Political will is the only factor that matters"], "ans": "Evidence-based, multi-dimensional approaches are most effective", "exp": "At CEFR B2 level, listeners must be able to follow complex arguments and identify the main thesis — in this case, that multi-dimensional, evidence-based approaches work best for Pendidikan & Kebijakan." },
  { "q": "Question 13 about Pendidikan & Kebijakan: Which statement best reflects the main argument presented?", "opts": ["The simplest solution is always the best", "Evidence-based, multi-dimensional approaches are most effective", "Technology alone can solve all problems", "Political will is the only factor that matters"], "ans": "Evidence-based, multi-dimensional approaches are most effective", "exp": "At CEFR B2 level, listeners must be able to follow complex arguments and identify the main thesis — in this case, that multi-dimensional, evidence-based approaches work best for Pendidikan & Kebijakan." },
  { "q": "Question 14 about Pendidikan & Kebijakan: Which statement best reflects the main argument presented?", "opts": ["The simplest solution is always the best", "Evidence-based, multi-dimensional approaches are most effective", "Technology alone can solve all problems", "Political will is the only factor that matters"], "ans": "Evidence-based, multi-dimensional approaches are most effective", "exp": "At CEFR B2 level, listeners must be able to follow complex arguments and identify the main thesis — in this case, that multi-dimensional, evidence-based approaches work best for Pendidikan & Kebijakan." },
  { "q": "Question 15 about Pendidikan & Kebijakan: Which statement best reflects the main argument presented?", "opts": ["The simplest solution is always the best", "Evidence-based, multi-dimensional approaches are most effective", "Technology alone can solve all problems", "Political will is the only factor that matters"], "ans": "Evidence-based, multi-dimensional approaches are most effective", "exp": "At CEFR B2 level, listeners must be able to follow complex arguments and identify the main thesis — in this case, that multi-dimensional, evidence-based approaches work best for Pendidikan & Kebijakan." },
  { "q": "Question 16 about Pendidikan & Kebijakan: Which statement best reflects the main argument presented?", "opts": ["The simplest solution is always the best", "Evidence-based, multi-dimensional approaches are most effective", "Technology alone can solve all problems", "Political will is the only factor that matters"], "ans": "Evidence-based, multi-dimensional approaches are most effective", "exp": "At CEFR B2 level, listeners must be able to follow complex arguments and identify the main thesis — in this case, that multi-dimensional, evidence-based approaches work best for Pendidikan & Kebijakan." },
  { "q": "Question 17 about Pendidikan & Kebijakan: Which statement best reflects the main argument presented?", "opts": ["The simplest solution is always the best", "Evidence-based, multi-dimensional approaches are most effective", "Technology alone can solve all problems", "Political will is the only factor that matters"], "ans": "Evidence-based, multi-dimensional approaches are most effective", "exp": "At CEFR B2 level, listeners must be able to follow complex arguments and identify the main thesis — in this case, that multi-dimensional, evidence-based approaches work best for Pendidikan & Kebijakan." },
  { "q": "Question 18 about Pendidikan & Kebijakan: Which statement best reflects the main argument presented?", "opts": ["The simplest solution is always the best", "Evidence-based, multi-dimensional approaches are most effective", "Technology alone can solve all problems", "Political will is the only factor that matters"], "ans": "Evidence-based, multi-dimensional approaches are most effective", "exp": "At CEFR B2 level, listeners must be able to follow complex arguments and identify the main thesis — in this case, that multi-dimensional, evidence-based approaches work best for Pendidikan & Kebijakan." },
  { "q": "Question 19 about Pendidikan & Kebijakan: Which statement best reflects the main argument presented?", "opts": ["The simplest solution is always the best", "Evidence-based, multi-dimensional approaches are most effective", "Technology alone can solve all problems", "Political will is the only factor that matters"], "ans": "Evidence-based, multi-dimensional approaches are most effective", "exp": "At CEFR B2 level, listeners must be able to follow complex arguments and identify the main thesis — in this case, that multi-dimensional, evidence-based approaches work best for Pendidikan & Kebijakan." },
  { "q": "Question 20 about Pendidikan & Kebijakan: Which statement best reflects the main argument presented?", "opts": ["The simplest solution is always the best", "Evidence-based, multi-dimensional approaches are most effective", "Technology alone can solve all problems", "Political will is the only factor that matters"], "ans": "Evidence-based, multi-dimensional approaches are most effective", "exp": "At CEFR B2 level, listeners must be able to follow complex arguments and identify the main thesis — in this case, that multi-dimensional, evidence-based approaches work best for Pendidikan & Kebijakan." }
];

const VOCAB = [
  { "en": "Key term 1 (Pendidikan & Kebijakan)", "id": "Istilah kunci 1 – definisi dalam bahasa Indonesia" },
  { "en": "Key term 2 (Pendidikan & Kebijakan)", "id": "Istilah kunci 2 – definisi dalam bahasa Indonesia" },
  { "en": "Key term 3 (Pendidikan & Kebijakan)", "id": "Istilah kunci 3 – definisi dalam bahasa Indonesia" },
  { "en": "Key term 4 (Pendidikan & Kebijakan)", "id": "Istilah kunci 4 – definisi dalam bahasa Indonesia" },
  { "en": "Key term 5 (Pendidikan & Kebijakan)", "id": "Istilah kunci 5 – definisi dalam bahasa Indonesia" },
  { "en": "Key term 6 (Pendidikan & Kebijakan)", "id": "Istilah kunci 6 – definisi dalam bahasa Indonesia" },
  { "en": "Key term 7 (Pendidikan & Kebijakan)", "id": "Istilah kunci 7 – definisi dalam bahasa Indonesia" },
  { "en": "Key term 8 (Pendidikan & Kebijakan)", "id": "Istilah kunci 8 – definisi dalam bahasa Indonesia" }
];

export default function UpperInterListeningLesson8() {
  const navigate = useNavigate();
  const nextPath = '/modul/english/upper-intermediate/listening/lesson-9';
  const STORAGE_KEY = 'talky_upper_intermediate_listening_completed';

  const getCompleted = (): number[] => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
  };
  const markComplete = (n: number) => {
    const d = getCompleted();
    if (!d.includes(n)) localStorage.setItem(STORAGE_KEY, JSON.stringify([...d, n]));
  };

  const [isCompleted, setIsCompleted] = useState(() => getCompleted().includes(8));
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'simak' | 'latihan' | 'kuis'>('simak');

  const handleComplete = () => { markComplete(8); setIsCompleted(true); setShowModal(true); };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 animate-fade-in" style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }} onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-[2rem] p-8 max-w-sm w-full text-center shadow-2xl relative overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="absolute top-0 left-0 w-full h-32 rounded-t-[2rem] -z-10 bg-gradient-to-br from-sky-600 to-blue-500" />
            <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 bg-white shadow-xl border-4 border-white/80 mt-4"><span className="text-5xl">🎧</span></div>
            <h2 className="text-2xl font-extrabold text-slate-800 mb-2">Lesson Selesai! 🎉</h2>
            <p className="text-slate-500 mb-8 leading-relaxed">Selamat! Anda berhasil memahami materi B2 tentang: <strong>Panel: Education Reform in the 21st Century</strong>.</p>
            <div className="space-y-3">
              {nextPath && <button onClick={() => { setShowModal(false); navigate(nextPath); }} className="w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all active:scale-95" style={{ backgroundColor: '#059669' }}>Pelajari Materi Selanjutnya</button>}
              <button onClick={() => setShowModal(false)} className="w-full py-4 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all">Tutup</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col h-[100dvh] md:h-full bg-slate-50">
        <header className="flex-none bg-white/95 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100 shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-600 transition-colors"><ChevronLeft className="w-6 h-6" /></button>
            <div className="text-center">
              <h1 className="text-sm font-bold text-slate-800 line-clamp-1">Panel: Education Reform in the 21st Century</h1>
              <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#059669' }}>Upper-Intermediate Listening • L8</p>
            </div>
            <button onClick={() => navigate(nextPath)} className="px-3 h-9 rounded-full text-xs font-bold transition-colors" style={{ color: '#059669', backgroundColor: '#05966918' }}>Next ›</button>
          </div>
        </header>

        <div className="flex bg-white border-b border-slate-100 sticky top-[65px] z-10 p-2 gap-2 shadow-sm">
          {(['simak', 'latihan', 'kuis'] as const).map(tab => {
            const labels = { simak: 'Simak TTS', latihan: 'Isi Rumpang', kuis: 'Kuis 20 Soal' };
            const icons = { simak: <Headphones className="w-4 h-4" />, latihan: <PenTool className="w-4 h-4" />, kuis: <CheckCircle2 className="w-4 h-4" /> };
            const isActive = activeTab === tab;
            return (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={'flex-1 py-3 text-sm font-bold tracking-wide transition-all rounded-xl flex items-center justify-center gap-2 ' + (isActive ? 'text-white shadow-md' : 'text-slate-500 hover:bg-slate-50')}
                style={isActive ? { backgroundColor: '#059669' } : {}}>
                {icons[tab]} {labels[tab]}
              </button>
            );
          })}
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-8 pb-28 space-y-6">
            {activeTab === 'simak' && (
              <div className="animate-fade-in space-y-6">
                <div className="bg-gradient-to-br from-sky-600 to-blue-500 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-20"><Headphones className="w-24 h-24" /></div>
                  <h2 className="text-xl md:text-2xl font-extrabold mb-2 relative z-10">B2 Listening: Panel: Education Reform in the 21st Century</h2>
                  <p className="text-sm md:text-base text-white/90 leading-relaxed max-w-lg relative z-10">Panel: Reformasi Pendidikan di Abad ke-21</p>
                  <div className="mt-3 inline-block bg-white/20 px-3 py-1 rounded-full text-xs font-bold">🎧 CEFR B2 · Upper-Intermediate Listening</div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full rounded-l-3xl" style={{ backgroundColor: '#059669' }} />
                  <p className="text-xs font-extrabold uppercase tracking-widest mb-4" style={{ color: '#059669' }}>📖 KOSAKATA B2 KUNCI</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {VOCAB.map((v: { en: string; id: string }) => (
                      <div key={v.en} className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 flex items-center justify-between hover:bg-slate-100 transition-colors">
                        <span className="text-sm font-bold text-slate-800">{v.en}</span>
                        <span className="text-xs font-medium text-right max-w-[60%] leading-tight" style={{ color: '#059669' }}>{v.id}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                  <DialoguePlayer title="Panel: Education Reform in the 21st Century" lines={DIALOGUE} />
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                  <p className="text-sm font-bold text-amber-800 mb-1">💡 Tips Listening B2 – Pendidikan & Kebijakan</p>
                  <ul className="text-sm text-amber-700 space-y-1">
                    <li>• Fokus pada <strong>argumen utama</strong>, bukan setiap kata</li>
                    <li>• Perhatikan <strong>signal words</strong>: however, therefore, despite, in contrast</li>
                    <li>• Catat <strong>data dan angka kunci</strong> yang disebutkan pembicara</li>
                    <li>• Identifikasi <strong>perspektif berbeda</strong> dari setiap pembicara</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'latihan' && (
              <div className="animate-fade-in">
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 mb-6">
                  <h3 className="text-lg font-bold text-slate-800 mb-2">Isi Rumpang (Fill in the Blank)</h3>
                  <p className="text-sm text-slate-500">Gunakan konteks dari dialog di atas untuk memilih kata yang tepat. Topik: Pendidikan & Kebijakan</p>
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
          <button onClick={isCompleted ? () => navigate(-1) : handleComplete}
            className="w-full py-4 rounded-2xl font-bold text-white flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all hover:shadow-xl"
            style={{ background: isCompleted ? 'linear-gradient(135deg,#10B981,#059669)' : 'linear-gradient(135deg,#059669,#059669CC)' }}>
            <CheckCircle2 className="w-5 h-5" />
            {isCompleted ? 'Sudah Selesai ✓ (Kembali)' : 'Tandai Selesai ✓'}
          </button>
        </div>
      </div>
    </>
  );
}
