import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, CheckCircle2, ChevronLeft } from 'lucide-react';

import { shuffledAuthored } from '../../advanced/shared/authoredQuiz';
import { upperInterReadingQuizBank } from './quizBank';
const VOCAB = [
  { en: "Standardised testing", id: "Tes terstandarisasi – ujian seragam untuk semua siswa" },
  { en: "Accountability", id: "Akuntabilitas – tanggung jawab sekolah atas hasilnya" },
  { en: "Teach to the test", id: "Mengajar demi ujian – hanya fokus pada materi dan teknik ujian" },
  { en: "Equity in education", id: "Kesetaraan pendidikan – akses yang adil bagi semua" }
];

const PASSAGE = "Few issues in education provoke as much debate as standardised testing. In some countries, including Indonesia, national examinations have been scaled back or replaced in recent years, while elsewhere governments have introduced even more tests in the name of accountability. The question of whether high-stakes exams help or hinder learning is therefore far from settled, and it deserves careful consideration from both sides.\n\nSupporters of standardised testing argue that it provides an objective measure of what pupils have learnt. Because every candidate sits the same paper under the same conditions, results can be compared fairly across schools and regions, allowing governments to identify where extra resources are needed. Advocates also maintain that the prospect of an important exam motivates students to study consistently and gives teachers clear goals.\n\nCritics, on the other hand, contend that high-stakes tests distort the curriculum. When a school's reputation depends on its results, teachers may feel pressured to 'teach to the test', concentrating on exam technique at the expense of creativity, discussion and practical skills. There are also concerns about equity in education: pupils from wealthier families can afford private tutoring, which means that test scores may reflect family income as much as ability. Moreover, the stress associated with a single decisive exam can be considerable.\n\nOn balance, it seems that the problem lies less with assessment itself than with the weight placed upon it. A reformed system might combine a smaller number of national tests with continuous classroom assessment, project work and teacher judgement. Such an approach would preserve the benefits of comparability while reducing the pressure that critics rightly identify. Ultimately, the purpose of any assessment should be to support learning rather than merely to measure it.";

const QUIZ: { q: string; opts: string[]; ans: string; exp: string }[] = shuffledAuthored(upperInterReadingQuizBank[7], 'upper-intermediate/reading/7');

const ACCENT = '#D4A017';
const NEXT_PATH = '/modul/english/upper-intermediate/reading/lesson-8';
const STORAGE_KEY = 'talky_upper_intermediate_reading_completed';
const LESSON_NUM = 7;

function getCompleted(): number[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
}
function markComplete(n: number) {
  const d = getCompleted();
  if (!d.includes(n)) localStorage.setItem(STORAGE_KEY, JSON.stringify([...d, n]));
}

export default function UpperInterReadingLesson7() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'baca' | 'kuis'>('baca');
  const [isCompleted, setIsCompleted] = useState(() => getCompleted().includes(LESSON_NUM));
  const [showModal, setShowModal] = useState(false);
  const [quizIdx, setQuizIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showExp, setShowExp] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = QUIZ[quizIdx];

  const handleAnswer = (opt: string) => {
    if (selected) return;
    setSelected(opt);
    setShowExp(true);
    if (opt === current.ans) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (quizIdx + 1 < QUIZ.length) {
      setQuizIdx(i => i + 1); setSelected(null); setShowExp(false);
    } else {
      setFinished(true);
      markComplete(LESSON_NUM);
      setIsCompleted(true);
      setShowModal(true);
    }
  };

  const handleComplete = () => { markComplete(LESSON_NUM); setIsCompleted(true); setShowModal(true); };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }} onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-[2rem] p-8 max-w-sm w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-5xl">📖</div>
            <h2 className="text-2xl font-extrabold text-slate-800 mb-2">Lesson Selesai! 🎉</h2>
            {finished && <p className="text-lg font-bold mb-2" style={{ color: ACCENT }}>Skor: {score}/{QUIZ.length}</p>}
            <p className="text-slate-500 mb-6 text-sm leading-relaxed">Selamat! Anda telah menyelesaikan: <strong>Discursive Texts: Education Reform</strong></p>
            <div className="space-y-3">
              {NEXT_PATH && <button onClick={() => { setShowModal(false); navigate(NEXT_PATH); }} className="w-full py-3 rounded-xl font-bold text-white" style={{ backgroundColor: ACCENT }}>Pelajaran Berikutnya →</button>}
              <button onClick={() => setShowModal(false)} className="w-full py-3 rounded-xl font-bold text-slate-600 bg-slate-100">Tutup</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col h-[100dvh] md:h-full bg-slate-50">
        <header className="flex-none bg-white/95 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100 shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-600"><ChevronLeft className="w-6 h-6" /></button>
            <div className="text-center">
              <h1 className="text-sm font-bold text-slate-800 line-clamp-1">Discursive Texts: Education Reform</h1>
              <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: ACCENT }}>Upper-Intermediate Reading • L7</p>
            </div>
            {NEXT_PATH ? <button onClick={() => navigate(NEXT_PATH)} className="px-3 h-9 rounded-full text-xs font-bold" style={{ color: ACCENT, backgroundColor: ACCENT + '18' }}>Next ›</button> : <div className="w-14" />}
          </div>
        </header>

        <div className="flex bg-white border-b border-slate-100 sticky top-[65px] z-10 p-2 gap-2">
          {(['baca', 'kuis'] as const).map(tab => {
            const labels = { baca: '📖 Baca Teks', kuis: '🧠 Kuis 20 Soal' };
            const isActive = activeTab === tab;
            return (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={'flex-1 py-3 text-sm font-bold tracking-wide transition-all rounded-xl flex items-center justify-center gap-2 ' + (isActive ? 'text-white shadow-md' : 'text-slate-500 hover:bg-slate-50')}
                style={isActive ? { backgroundColor: ACCENT } : {}}>
                {labels[tab]}
              </button>
            );
          })}
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-8 pb-28 space-y-6">
            {activeTab === 'baca' && (
              <div className="animate-fade-in space-y-6">
                <div className="rounded-3xl p-6 text-white shadow-xl relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #D4A017, #B8860B)' }}>
                  <div className="absolute top-0 right-0 p-6 opacity-20"><BookOpen className="w-24 h-24" /></div>
                  <h2 className="text-xl font-extrabold mb-1 relative z-10">Discursive Texts: Education Reform</h2>
                  <p className="text-sm text-white/90 relative z-10">Upper-Intermediate Reading • CEFR B2</p>
                  <div className="mt-3 inline-block bg-white/20 px-3 py-1 rounded-full text-xs font-bold">📖 B2 Academic Reading</div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5">
                  <p className="text-xs font-extrabold uppercase tracking-widest mb-4" style={{ color: ACCENT }}>📚 Kosakata B2 Kunci</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {VOCAB.map(v => (
                      <div key={v.en} className="bg-slate-50 rounded-xl px-4 py-3 flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-800">{v.en}</span>
                        <span className="text-xs font-medium text-right max-w-[55%] leading-tight" style={{ color: ACCENT }}>{v.id}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
                  <p className="text-xs font-extrabold uppercase tracking-widest mb-4 text-slate-400">📄 READING PASSAGE</p>
                  {PASSAGE.split('\n\n').map((para, i) => (
                    <p key={i} className="text-sm text-slate-700 leading-relaxed mb-4">{para}</p>
                  ))}
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                  <p className="text-sm font-bold text-amber-800 mb-1">💡 Tips Membaca B2</p>
                  <ul className="text-sm text-amber-700 space-y-1">
                    <li>• Identifikasi <strong>thesis utama</strong> di paragraf pertama</li>
                    <li>• Perhatikan <strong>discourse markers</strong>: however, consequently, nevertheless</li>
                    <li>• Bedakan <strong>fakta</strong> dari <strong>opini</strong> dan <strong>inferensi</strong></li>
                    <li>• Perhatikan <strong>hedging language</strong>: suggests, may, appears to</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'kuis' && (
              <div className="animate-fade-in">
                {!finished ? (
                  <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-5">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Soal {quizIdx + 1} / {QUIZ.length}</p>
                      <p className="text-xs font-bold" style={{ color: ACCENT }}>Skor: {score}</p>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 mb-4">
                      <div className="h-2 rounded-full transition-all" style={{ width: `${((quizIdx) / QUIZ.length) * 100}%`, backgroundColor: ACCENT }} />
                    </div>
                    <p className="text-base font-bold text-slate-800 leading-relaxed">{current.q}</p>
                    <div className="space-y-3">
                      {current.opts.map(opt => {
                        const isSelected = selected === opt;
                        const isCorrect = opt === current.ans;
                        let bg = 'bg-slate-50 border-slate-200 text-slate-700';
                        if (selected) {
                          if (isCorrect) bg = 'bg-green-100 border-sky-400 text-green-800 font-bold';
                          else if (isSelected) bg = 'bg-red-100 border-red-400 text-red-800';
                        }
                        return (
                          <button key={opt} onClick={() => handleAnswer(opt)} className={`w-full text-left px-4 py-3 rounded-xl border-2 text-sm transition-all ${bg}`}>
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                    {showExp && (
                      <div className="mt-3 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                        <p className="text-xs font-bold text-blue-700 mb-1">💡 Penjelasan</p>
                        <p className="text-sm text-blue-700">{current.exp}</p>
                      </div>
                    )}
                    {selected && (
                      <button onClick={handleNext} className="w-full py-3 rounded-xl font-bold text-white mt-2" style={{ backgroundColor: ACCENT }}>
                        {quizIdx + 1 < QUIZ.length ? 'Soal Berikutnya →' : 'Selesai ✓'}
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 text-center space-y-4">
                    <div className="text-5xl mb-2">{score >= 16 ? '🏆' : score >= 12 ? '🎯' : '📖'}</div>
                    <h3 className="text-2xl font-extrabold text-slate-800">Kuis Selesai!</h3>
                    <p className="text-4xl font-black" style={{ color: ACCENT }}>{score}/{QUIZ.length}</p>
                    <p className="text-slate-500">{score >= 16 ? 'Luar biasa! Pemahaman B2 sangat baik.' : score >= 12 ? 'Bagus! Terus tingkatkan kemampuan membaca.' : 'Baca ulang teks dan coba lagi.'}</p>
                    <button onClick={() => { setShowModal(false); if (NEXT_PATH) navigate(NEXT_PATH); }} className="w-full py-3 rounded-xl font-bold text-white" style={{ backgroundColor: ACCENT }}>
                      {NEXT_PATH ? 'Pelajaran Berikutnya →' : 'Kembali ke Modul'}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="sticky bottom-0 z-30 bg-white/90 backdrop-blur-xl border-t border-slate-200 p-4">
          <button onClick={isCompleted ? () => navigate(-1) : handleComplete}
            className="w-full py-4 rounded-2xl font-bold text-white flex items-center justify-center gap-2 shadow-lg"
            style={{ background: isCompleted ? 'linear-gradient(135deg,#10B981,#059669)' : `linear-gradient(135deg,${ACCENT},${ACCENT}CC)` }}>
            <CheckCircle2 className="w-5 h-5" />
            {isCompleted ? 'Sudah Selesai ✓ (Kembali)' : 'Tandai Selesai ✓'}
          </button>
        </div>
      </div>
    </>
  );
}
