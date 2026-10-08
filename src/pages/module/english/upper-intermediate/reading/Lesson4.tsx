import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, CheckCircle2, ChevronLeft } from 'lucide-react';

const VOCAB = [
  { en: "Monetary policy", id: "Kebijakan moneter – pengaturan suku bunga dan uang beredar" },
  { en: "Recession", id: "Resesi – penurunan ekonomi berkepanjangan" },
  { en: "Inflation", id: "Inflasi – kenaikan harga umum secara berkelanjutan" },
  { en: "Trade deficit", id: "Defisit perdagangan – impor lebih besar dari ekspor" }
];

const PASSAGE = "This B2-level reading text explores the complex dimensions of News Analysis: Global Economy. Academic and analytical texts at this level require readers to follow extended arguments, identify implied meaning, distinguish fact from opinion, and recognise rhetorical devices and authorial purpose.\n\nResearchers and analysts in this field have highlighted several key tensions: between competing interests, between short-term pragmatism and long-term sustainability, and between individual and collective responsibility. The evidence base continues to evolve, and authoritative sources frequently present nuanced, qualified positions that resist simple characterisation.\n\nA critical reading of texts on this theme requires attention to the author's perspective, the evidence marshalled in support of claims, the assumptions underlying the argument, and the counterarguments that are acknowledged or dismissed. At CEFR B2 level, students should be able to extract the writer's central thesis, trace the development of an argument across multiple paragraphs, and make inferences about unstated implications.\n\nFurthermore, the vocabulary of academic and professional discourse — including hedging language ('it has been suggested that', 'evidence indicates'), evaluative adjectives ('significant', 'crucial', 'problematic'), and discourse markers ('however', 'consequently', 'notwithstanding') — plays a central role in shaping meaning and should be a focus of close reading at this level.";

const QUIZ: { q: string; opts: string[]; ans: string; exp: string }[] = [
  { q: "What is the main argument of this passage about \"News Analysis: Global Economy\"?", opts: ["The issue affects only wealthy nations", "Complex, multi-dimensional approaches are required", "The topic has no solution", "Simple technological fixes are sufficient"], ans: "Complex, multi-dimensional approaches are required", exp: "B2 texts typically argue that complex challenges require nuanced, evidence-based, multi-dimensional responses." },
  { q: "The author's tone in this text is best described as:", opts: ["Analytical and evidence-based", "Optimistic without qualification", "Humorous and ironic", "Highly emotional and personal"], ans: "Analytical and evidence-based", exp: "Academic texts at B2 level use an objective, evidence-based analytical tone, presenting multiple perspectives." },
  { q: "The phrase \"unequivocal evidence\" (or similar) suggests the author:", opts: ["Is speculating without data", "Is uncertain about the findings", "Believes the evidence is clear and indisputable", "Is presenting a minority view"], ans: "Believes the evidence is clear and indisputable", exp: "\"Unequivocal\" means leaving no doubt — the author is asserting that evidence is definitive." },
  { q: "Which reading strategy is most useful for texts at this level?", opts: ["Reading only the first sentence of each paragraph", "Translating every word before continuing", "Identifying the main claim and how each paragraph develops it", "Skimming for individual words"], ans: "Identifying the main claim and how each paragraph develops it", exp: "At B2 level, following the logical development of an extended argument is the key skill." },
  { q: "What does the discourse marker \"however\" indicate in academic texts?", opts: ["A definition is being provided", "An example is being given", "A conclusion is being drawn", "A contrast or qualification is being introduced"], ans: "A contrast or qualification is being introduced", exp: "\"However\" signals a shift to a contrasting or qualifying point — essential to follow complex arguments." },
  { q: "An \"unreliable narrator\" or biased source in a text means:", opts: ["The text contains factual errors", "The author is deliberately lying", "The text is fictional", "The reader should question and critically evaluate the source's perspective"], ans: "The reader should question and critically evaluate the source's perspective", exp: "Critical reading at B2 level requires evaluating the trustworthiness and perspective of sources." },
  { q: "The word \"mitigation\" in academic contexts most likely means:", opts: ["Completely eliminating a problem", "Reducing the severity or impact of a problem", "Ignoring a problem", "Making a problem worse"], ans: "Reducing the severity or impact of a problem", exp: "\"Mitigation\" refers to actions that reduce — but may not eliminate — a negative impact." },
  { q: "When an academic text says \"it has been suggested that...\", this hedging language indicates:", opts: ["The author is certain of the claim", "The claim is tentative or not universally agreed upon", "The author is dismissing the claim", "The claim is generally accepted as fact"], ans: "The claim is tentative or not universally agreed upon", exp: "Hedging language like \"it has been suggested\" signals academic caution — the claim is not fully established." },
  { q: "What is the purpose of the second paragraph in a well-structured argument essay?", opts: ["To introduce the author", "To provide a list of statistics", "To develop, evidence, or qualify the thesis established in the first paragraph", "To give a personal anecdote"], ans: "To develop, evidence, or qualify the thesis established in the first paragraph", exp: "Body paragraphs in academic texts develop the central argument with evidence, examples, or elaboration." },
  { q: "A \"tension\" between two positions in an academic text means:", opts: ["The positions are identical", "The author is angry", "There is a contradiction or conflict between competing arguments or interests", "Both positions are equally wrong"], ans: "There is a contradiction or conflict between competing arguments or interests", exp: "\"Tension\" in academic writing refers to unresolved conflict or competition between different claims or interests." },
  { q: "What does \"equity\" mean in academic and policy contexts?", opts: ["Financial profit", "Legal ownership", "Equal identical treatment for everyone", "Fairness and justice, often addressing structural disadvantages"], ans: "Fairness and justice, often addressing structural disadvantages", exp: "\"Equity\" goes beyond equality — it involves fairness that addresses underlying structural disadvantages." },
  { q: "The structure of an academic argument typically follows:", opts: ["Claim → Evidence → Analysis → Conclusion", "A narrative chronological structure", "Random presentation of ideas", "Only personal opinion"], ans: "Claim → Evidence → Analysis → Conclusion", exp: "Academic arguments present a claim, support it with evidence, analyse that evidence, and draw conclusions." },
  { q: "When a text uses the phrase \"proponents argue...\", this signals:", opts: ["A definition", "The author's personal view", "Those who support a particular position are being described", "A conclusion"], ans: "Those who support a particular position are being described", exp: "\"Proponents\" means advocates or supporters — the author is presenting their arguments, not necessarily endorsing them." },
  { q: "An \"inherent tension\" in a text means the conflict is:", opts: ["Easily resolved", "Fundamental to the nature of the situation itself", "Created by one party intentionally", "External and temporary"], ans: "Fundamental to the nature of the situation itself", exp: "\"Inherent\" means built-in or essential — the conflict is not accidental but central to the issue." },
  { q: "In critical reading, \"inference\" means:", opts: ["Summarising the text in fewer words", "Translating the text", "Drawing conclusions from evidence not directly stated", "Finding explicit statements in the text"], ans: "Drawing conclusions from evidence not directly stated", exp: "\"Inference\" involves reading between the lines — understanding what is implied rather than explicitly stated." },
  { q: "What does \"nuanced\" mean in academic contexts?", opts: ["Extreme in one direction", "Simple and clear-cut", "Vague and unclear", "Showing awareness of subtle distinctions and complexities"], ans: "Showing awareness of subtle distinctions and complexities", exp: "A \"nuanced\" argument acknowledges complexity, avoids oversimplification, and recognises multiple dimensions." },
  { q: "If a text says \"critics counter that...\", the author is:", opts: ["Presenting a personal attack", "Agreeing with the previous point", "Ending the argument", "Introducing an opposing viewpoint"], ans: "Introducing an opposing viewpoint", exp: "\"Critics counter\" introduces a contrasting or opposing argument — standard in academic balanced analysis." },
  { q: "The term \"scalability\" in a policy or technology text refers to:", opts: ["The physical size of a system", "The cost of implementation", "The ability to increase in size or capacity to meet growing demand", "The environmental impact"], ans: "The ability to increase in size or capacity to meet growing demand", exp: "\"Scalability\" refers to whether a solution can be effectively expanded to reach larger scale or greater demand." },
  { q: "What does \"persistently underfunded\" suggest about a programme?", opts: ["It consistently receives more funding than needed", "It repeatedly receives insufficient financial resources over time", "It has never had any funding", "It was recently defunded"], ans: "It repeatedly receives insufficient financial resources over time", exp: "\"Persistently\" means repeatedly over time — the programme consistently faces inadequate funding." },
  { q: "The best approach to B2-level academic reading is to:", opts: ["Always use a dictionary for every unknown word", "Read every word at the same speed regardless of importance", "Skip paragraphs that seem difficult", "Use contextual clues, paragraph structure, and discourse markers to follow extended arguments"], ans: "Use contextual clues, paragraph structure, and discourse markers to follow extended arguments", exp: "B2 reading involves strategic reading: using context, structure, and discourse markers to construct meaning without needing every word." }
];

const ACCENT = '#D4A017';
const NEXT_PATH = '/modul/english/upper-intermediate/reading/lesson-5';
const STORAGE_KEY = 'talky_upper_intermediate_reading_completed';
const LESSON_NUM = 4;

function getCompleted(): number[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
}
function markComplete(n: number) {
  const d = getCompleted();
  if (!d.includes(n)) localStorage.setItem(STORAGE_KEY, JSON.stringify([...d, n]));
}

export default function UpperInterReadingLesson4() {
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
            <p className="text-slate-500 mb-6 text-sm leading-relaxed">Selamat! Anda telah menyelesaikan: <strong>News Analysis: Global Economy</strong></p>
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
              <h1 className="text-sm font-bold text-slate-800 line-clamp-1">News Analysis: Global Economy</h1>
              <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: ACCENT }}>Upper-Intermediate Reading • L4</p>
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
                  <h2 className="text-xl font-extrabold mb-1 relative z-10">News Analysis: Global Economy</h2>
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
