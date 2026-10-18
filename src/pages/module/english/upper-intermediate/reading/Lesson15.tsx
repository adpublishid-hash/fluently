import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, CheckCircle2, ChevronLeft } from 'lucide-react';

import { shuffledAuthored } from '../../advanced/shared/authoredQuiz';
import { upperInterReadingQuizBank } from './quizBank';
const VOCAB = [
  { en: "Pretrial detention", id: "Penahanan pra-sidang – ditahan sebelum kasus diputus pengadilan" },
  { en: "Public defender", id: "Pembela umum – pengacara yang disediakan negara" },
  { en: "Reoffending", id: "Residivisme – melakukan kejahatan lagi" },
  { en: "Rehabilitation", id: "Rehabilitasi – pemulihan dan reintegrasi pelaku" }
];

const PASSAGE = "For eleven weeks last spring, Daniel Price sat in a cell at Brennan County Jail. He had not been convicted of any crime. Arrested on suspicion of shoplifting goods worth less than $80, he was held in pretrial detention because a paperwork error meant that his court date was repeatedly postponed. By the time the case was finally dismissed, he had lost his job and fallen behind on his rent.\n\nPrice's case is not an isolated one. An investigation by this newspaper, based on court records obtained through freedom-of-information requests and interviews with more than forty defendants, lawyers and former staff, has found that at least 230 people were held for over a month on minor, non-violent charges in the county during the past two years. In many cases, the delays were caused not by the complexity of the cases but by a shortage of public defenders and an outdated case-management system.\n\nThe human cost is considerable, but so is the financial one. Detaining a person costs the county around $140 a day — far more than the community supervision programmes that several neighbouring counties have adopted. Moreover, research consistently suggests that even short periods of detention can increase the likelihood of reoffending, as people lose employment, housing and family support. In this sense, the system may be undermining the very public safety it claims to protect.\n\nWhen presented with our findings, a spokesperson for the county court acknowledged 'unacceptable delays' and said that a review was under way. Campaigners argue that a review is not enough. They are calling for automatic hearings within seven days for anyone held on a minor charge, and for investment in rehabilitation and support services rather than more cells. Price, who now works in a warehouse, puts it more simply: 'Nobody ever told me why I was still there.'";

const QUIZ: { q: string; opts: string[]; ans: string; exp: string }[] = shuffledAuthored(upperInterReadingQuizBank[15], 'upper-intermediate/reading/15');

const ACCENT = '#D4A017';
const NEXT_PATH = '/modul/english/upper-intermediate/reading/lesson-16';
const STORAGE_KEY = 'talky_upper_intermediate_reading_completed';
const LESSON_NUM = 15;

function getCompleted(): number[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
}
function markComplete(n: number) {
  const d = getCompleted();
  if (!d.includes(n)) localStorage.setItem(STORAGE_KEY, JSON.stringify([...d, n]));
}

export default function UpperInterReadingLesson15() {
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
            <p className="text-slate-500 mb-6 text-sm leading-relaxed">Selamat! Anda telah menyelesaikan: <strong>Investigative Journalism: Criminal Justice</strong></p>
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
              <h1 className="text-sm font-bold text-slate-800 line-clamp-1">Investigative Journalism: Criminal Justice</h1>
              <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: ACCENT }}>Upper-Intermediate Reading • L15</p>
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
                  <h2 className="text-xl font-extrabold mb-1 relative z-10">Investigative Journalism: Criminal Justice</h2>
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
