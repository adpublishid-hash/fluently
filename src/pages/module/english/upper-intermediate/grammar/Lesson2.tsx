import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LessonShell from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Star, Lightbulb } from 'lucide-react';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

interface TheoryBlock { name: string; color: string; icon: string; points: string[]; }
interface QuizItem { q: string; opts: string[]; ans: string; exp: string; }

const THEORY: TheoryBlock[] = [
  {
    "name": "Type 2: Unreal Present/Future",
    "color": "amber",
    "icon": "🔶",
    "points": [
      "Gunakan Type 2 untuk situasi hipotetis yang tidak nyata di masa sekarang atau masa depan.",
      "Rumus: If + Past Simple, would/could/might + base verb",
      "\"If I **had** more time, I **would study** medicine.\" (Kenyataan: tidak punya waktu)",
      "\"If she **were** the CEO, she **would change** the company culture.\"",
      "Catatan: \"were\" digunakan untuk semua orang (I/he/she/it) dalam conditional formal (If I were...)",
      "Gunakan \"could\" untuk kemampuan dan \"might\" untuk kemungkinan yang lebih lemah."
    ]
  },
  {
    "name": "Type 3: Unreal Past",
    "color": "red",
    "icon": "🔴",
    "points": [
      "Gunakan Type 3 untuk situasi yang tidak terjadi di masa lalu dan konsekuensinya.",
      "Rumus: If + Past Perfect, would/could/might + have + past participle",
      "\"If he **had studied** harder, he **would have passed** the exam.\" (Kenyataan: tidak belajar, gagal)",
      "\"If they **hadn't invested** early, they **wouldn't have made** a profit.\"",
      "Sering mengekspresikan penyesalan atau spekulasi tentang masa lalu.",
      "Gunakan \"could have\" atau \"might have\" untuk kemungkinan alternatif."
    ]
  },
  {
    "name": "Mixed Conditionals",
    "color": "purple",
    "icon": "🟣",
    "points": [
      "Mencampur waktu Type 2 dan Type 3 untuk situasi yang lebih kompleks.",
      "Tipe A: If + Past Perfect (masa lalu) → would + base verb (masa kini)",
      "\"If he **had studied** medicine, he **would be** a doctor now.\" (dulu tidak belajar, sekarang bukan dokter)",
      "Tipe B: If + Past Simple (masa kini/kebiasaan) → would have + past participle (masa lalu)",
      "\"If she **were** more organized, she **would have finished** on time.\" (sifatnya, hasil masa lalu)",
      "Mixed conditionals menunjukkan hubungan lintas waktu yang kompleks."
    ]
  }
];
const EXAMPLES: string[] = [
  "\"If I **were** president, I **would prioritise** education spending.\" (Type 2 - tidak nyata kini)",
  "\"If she **had taken** the job offer, she **would have earned** more money.\" (Type 3 - penyesalan masa lalu)",
  "\"If he **had been** born in a different era, he **would be** a different person today.\" (Mixed)",
  "\"**Were I** to win the lottery, I **would invest** in renewable energy.\" (Formal inversion)",
  "\"**Had she** studied harder, she **might have passed** the bar exam.\" (Formal inversion Type 3)",
  "\"If the economy **hadn't collapsed**, unemployment **would not have risen** so sharply.\" (Type 3 kontekstual)"
];
const QUIZ: QuizItem[] = [
  {
    "q": "Which is a correct Type 2 Conditional?",
    "opts": [
      "If she had studied, she would have passed.",
      "If she studies, she would pass.",
      "If she studies hard, she will pass.",
      "If she studied hard, she would pass."
    ],
    "ans": "If she studied hard, she would pass.",
    "exp": "Type 2: If + Past Simple (studied), + would + base verb (pass). Situasi hipotetis masa kini."
  },
  {
    "q": "Which is a correct Type 3 Conditional?",
    "opts": [
      "If he had left early, he would catch the train.",
      "If he had left early, he catches the train.",
      "If he left early, he would have caught the train.",
      "If he had left early, he would have caught the train."
    ],
    "ans": "If he had left early, he would have caught the train.",
    "exp": "Type 3: If + Past Perfect (had left), + would have + past participle (caught). Situasi tidak nyata di masa lalu."
  },
  {
    "q": "Fill in: \"If I ___ (be) you, I ___ (accept) the offer.\"",
    "opts": [
      "was, would have accepted",
      "had been, would accept",
      "were, would accept",
      "am, will accept"
    ],
    "ans": "were, would accept",
    "exp": "Type 2 dengan \"were\" formal (bukan \"was\") untuk conditional unreal present."
  },
  {
    "q": "\"If they ___ (invest) earlier, they ___ (not lose) their money.\" Type 3 form?",
    "opts": [
      "invested, would have lost",
      "had invested, wouldn't have lost",
      "invested, wouldn't lose",
      "had invested, hadn't lose"
    ],
    "ans": "had invested, wouldn't have lost",
    "exp": "Type 3: If + had invested + wouldn't have lost (past perfect → would+have+pp)."
  },
  {
    "q": "\"If he ___ wealthy, he ___ a yacht.\" Which option is correct for Type 2?",
    "opts": [
      "was, bought",
      "had been, would buy",
      "were, would buy",
      "is, buys"
    ],
    "ans": "were, would buy",
    "exp": "Type 2: \"If he were wealthy\" (past form, hipotetis) + \"would buy\" (result clause)."
  },
  {
    "q": "Identify the MIXED conditional: A past cause → a present result.",
    "opts": [
      "If I had a car, I would drive to work.",
      "If he had chosen that career, he would be rich now.",
      "If she hadn't studied, she wouldn't have graduated.",
      "If we leave now, we will catch the bus."
    ],
    "ans": "If he had chosen that career, he would be rich now.",
    "exp": "\"Had chosen\" (masa lalu) → \"would be\" (masa kini) = Mixed Conditional tipe A."
  },
  {
    "q": "Which conditional expresses REGRET about a past decision?",
    "opts": [
      "Type 0",
      "Type 3",
      "Type 2",
      "Type 1"
    ],
    "ans": "Type 3",
    "exp": "Type 3 digunakan untuk menyatakan penyesalan atau spekulasi tentang hal yang tidak terjadi di masa lalu."
  },
  {
    "q": "\"If I ___ (know) the answer, I ___ (tell) you.\" Present impossibility?",
    "opts": [
      "knew, would tell",
      "know, will tell",
      "knew, would have told",
      "had known, would have told"
    ],
    "ans": "knew, would tell",
    "exp": "Type 2: If + Past Simple (knew) + would + base verb (tell). Saya tidak tahu, jadi ini hipotetis."
  },
  {
    "q": "In formal conditional Type 2, which form is correct for \"if + to be\"?",
    "opts": [
      "If I was rich...",
      "If I will be rich...",
      "If I were rich...",
      "If I am rich..."
    ],
    "ans": "If I were rich...",
    "exp": "Dalam formal/subjunctive conditional, \"were\" digunakan untuk semua person (I/he/she/it/they were)."
  },
  {
    "q": "\"If you ___ (come) to the party, you ___ (have) a great time.\" Type 3:",
    "opts": [
      "come, have",
      "came, would have",
      "had come, would have had",
      "came, would have had"
    ],
    "ans": "had come, would have had",
    "exp": "Type 3: If + had come (past perfect) + would have had (would + have + pp)."
  },
  {
    "q": "What does \"I would have helped you if you had asked\" express?",
    "opts": [
      "A regret that help was not given in the past",
      "A general truth",
      "A real present situation",
      "A future plan"
    ],
    "ans": "A regret that help was not given in the past",
    "exp": "Type 3 dengan \"would have helped\" dan \"had asked\" mengekspresikan penyesalan tentang masa lalu."
  },
  {
    "q": "\"If she ___ (be) more disciplined, she would have qualified for the team.\"",
    "opts": [
      "has been",
      "were",
      "is",
      "had been"
    ],
    "ans": "had been",
    "exp": "Ini mixed conditional: \"had been\" (masa lalu) + \"would have qualified\" (result yang terjadi di masa lalu)."
  },
  {
    "q": "Which modal verb shows possibility (not certainty) in a conditional result?",
    "opts": [
      "should",
      "must",
      "would",
      "might"
    ],
    "ans": "might",
    "exp": "\"Might\" menunjukkan hasil yang mungkin tapi tidak pasti, lebih lemah dari \"would\"."
  },
  {
    "q": "\"If they had communicated better, the project ___ a success.\"",
    "opts": [
      "will be",
      "would had been",
      "would have been",
      "would be"
    ],
    "ans": "would have been",
    "exp": "Type 3: \"had communicated\" (pp) → \"would have been\" (would + have + pp)."
  },
  {
    "q": "\"___ I known you were coming, I would have baked a cake.\" What replaces \"if\"?",
    "opts": [
      "Were",
      "Did",
      "Should",
      "Had"
    ],
    "ans": "Had",
    "exp": "\"Had I known...\" adalah inversion conditional formal, setara dengan \"If I had known...\"."
  },
  {
    "q": "Which type deals with general scientific laws and facts?",
    "opts": [
      "Type 2",
      "Type 3",
      "Type 0",
      "Type 1"
    ],
    "ans": "Type 0",
    "exp": "Type 0 (Zero Conditional): If + present simple, + present simple. Untuk kebenaran umum/ilmiah."
  },
  {
    "q": "Mixed Conditional Type B: present state → past result. Example?",
    "opts": [
      "If he were taller, he would play basketball.",
      "If she were organized, she would have finished on time.",
      "If they leave early, they will arrive on time.",
      "If he had studied, he would be successful now."
    ],
    "ans": "If she were organized, she would have finished on time.",
    "exp": "\"Were organized\" (sifat kini) → \"would have finished\" (hasil masa lalu) = Mixed Type B."
  },
  {
    "q": "\"Could have\" in Type 3 means...",
    "opts": [
      "A certain past result",
      "A possible past result that did not happen",
      "A future possibility",
      "A current ability"
    ],
    "ans": "A possible past result that did not happen",
    "exp": "\"Could have\" berarti ada kemungkinan hasil tersebut terjadi di masa lalu, tapi tidak terjadi."
  },
  {
    "q": "Which sentence uses WITHOUT + gerund to replace a conditional?",
    "opts": [
      "Had you not helped, I would have failed.",
      "All of the above",
      "If you had not helped me, I would have failed.",
      "Without your help, I would have failed."
    ],
    "ans": "All of the above",
    "exp": "Semua ekspresi di atas setara dengan Type 3 conditional yang membayangkan berbagai cara penyampaian."
  },
  {
    "q": "\"If I ___ the CEO, I ___ the bonus structure immediately.\" (hipotetis kini)",
    "opts": [
      "am, will change",
      "were, would change",
      "had been, would change",
      "was, changed"
    ],
    "ans": "were, would change",
    "exp": "Type 2: \"If I were the CEO\" (hipotetis kini) + \"would change\" (hasil yang diinginkan)."
  }
];

const UpperInterGrammarLesson2: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('upper_intermediate_grammar', 2);
  const nextLessonPath = '/modul/english/upper-intermediate/grammar/lesson-3';

  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string|null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  const handleCheckQuiz = (opt: string) => {
    if (isAnswerChecked) return;
    setSelectedOption(opt);
    setIsAnswerChecked(true);
    if (opt === QUIZ[quizStep].ans) setQuizScore(p => p + 1);
  };

  const nextQuestion = () => {
    if (quizStep < QUIZ.length - 1) { setQuizStep(p => p+1); setSelectedOption(null); setIsAnswerChecked(false); }
    else setShowResult(true);
  };

  const restartQuiz = () => { setQuizStep(0); setQuizScore(0); setShowResult(false); setSelectedOption(null); setIsAnswerChecked(false); };

  const COLORS: Record<string,string> = { blue:'#2563EB', indigo:'#4F46E5', amber:'#D97706', red:'#DC2626', violet:'#7C3AED', purple:'#9333EA', green:'#16A34A' };

  return (
    <>
      <LessonCompleteModal
        show={showCompleteModal}
        onClose={() => setShowCompleteModal(false)}
        lessonLabel="Upper-Intermediate Grammar Lesson 2"
        accentColor="#1A5276"
        nextLessonPath={nextLessonPath}
        onNext={() => { setShowCompleteModal(false); navigate(nextLessonPath); }}
        onBack={() => { setShowCompleteModal(false); navigate(-1); }}
      />
      <LessonShell
        title="Conditional Sentences"
        subtitle="Grammar B2 • Pelajaran 2"
        accentColor="#1A5276"
        nextLesson={nextLessonPath}
        tabs={[
          { id: 'learn', label: 'Teori', icon: <BookOpen size={14} /> },
          { id: 'practice', label: 'Latihan', icon: <PenTool size={14} /> }
        ]}
        footer={() => (
          <button
            onClick={isCompleted ? () => navigate(-1) : handleSelesai}
            className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg transition-all hover:opacity-90 active:scale-[0.98]"
            style={{ background: isCompleted ? 'linear-gradient(135deg,#4FA3D1,#1E6F9F)' : 'linear-gradient(135deg,#1A5276,#1A5276cc)' }}
          >
            <CheckCircle2 size={18} />
            {isCompleted ? 'Sudah Selesai ✓' : 'Selesai & Simpan Progress'}
          </button>
        )}
      >
        {(tabId) => {
          if (tabId === 'learn') return (
            <div className="space-y-6 animate-fade-in p-4">
              <div className="rounded-3xl p-6 text-white shadow-xl relative overflow-hidden" style={{background:'linear-gradient(135deg,#1A5276,#0E2D4A)'}}>
                <div className="text-3xl mb-2">📐</div>
                <h2 className="text-xl font-extrabold mb-1">Conditional Sentences</h2>
                <p className="text-sm opacity-90">Conditional Type 2, 3 & Mixed</p>
                <div className="mt-3 inline-block bg-white/20 px-3 py-1 rounded-full text-xs font-bold">🎯 CEFR B2 · Grammar</div>
              </div>

              {THEORY.map((block, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">{block.icon}</span>
                    <h3 className="font-bold text-slate-800">{block.name}</h3>
                  </div>
                  <ul className="space-y-2">
                    {block.points.map((p, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{backgroundColor: COLORS[block.color] || '#4F46E5'}}></span>
                        <span dangerouslySetInnerHTML={{__html: p.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>')}} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="bg-indigo-50 rounded-2xl p-5 border border-indigo-100">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-bold text-indigo-800 text-sm">Contoh Kalimat</h3>
                </div>
                {EXAMPLES.map((ex, i) => (
                  <div key={i} className="bg-white p-3 rounded-xl border border-indigo-100 mb-2 text-sm text-slate-700"
                    dangerouslySetInnerHTML={{__html: ex.replace(/\*\*(.*?)\*\*/g,'<strong class="text-indigo-700">$1</strong>').replace(/→/g,'<span class="text-slate-400 mx-1">→</span>')}} />
                ))}
              </div>
            </div>
          );

          if (tabId === 'practice') return (
            <div className="p-4 animate-fade-in">
              <div className="max-w-xl mx-auto">
                {!showResult ? (
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xs font-bold text-slate-400 uppercase">Soal {quizStep+1}/{QUIZ.length}</span>
                      <span className="text-xs font-bold bg-blue-50 text-blue-700 px-3 py-1 rounded-full">Skor: {quizScore}</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 mb-5">
                      <div className="h-1.5 rounded-full bg-blue-600 transition-all" style={{width: ((quizStep/QUIZ.length)*100)+'%'}}></div>
                    </div>
                    <h3 className="text-base font-bold text-slate-800 mb-5">{QUIZ[quizStep].q}</h3>
                    <div className="space-y-3">
                      {QUIZ[quizStep].opts.map((opt, i) => {
                        let cls = 'border-slate-200 hover:border-blue-300 hover:bg-blue-50';
                        if (isAnswerChecked) {
                          if (opt === QUIZ[quizStep].ans) cls = 'bg-green-50 border-sky-500 text-green-800';
                          else if (opt === selectedOption) cls = 'bg-red-50 border-red-400 text-red-700';
                          else cls = 'opacity-40 border-slate-200';
                        }
                        return (
                          <button key={i} onClick={() => handleCheckQuiz(opt)} disabled={isAnswerChecked}
                            className={'w-full p-4 rounded-xl border-2 text-left font-medium transition-all flex items-center justify-between text-sm ' + cls}>
                            <span>{opt}</span>
                            {isAnswerChecked && opt === QUIZ[quizStep].ans && <CheckCircle2 size={16} className="text-green-600 shrink-0" />}
                            {isAnswerChecked && opt === selectedOption && opt !== QUIZ[quizStep].ans && <XCircle size={16} className="text-red-500 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                    {isAnswerChecked && (
                      <div className="mt-5">
                        <div className={'p-3 rounded-xl text-sm mb-4 ' + (selectedOption === QUIZ[quizStep].ans ? 'bg-green-50 text-green-800 border border-sky-100' : 'bg-orange-50 text-orange-800 border border-orange-100')}>
                          <strong>{selectedOption === QUIZ[quizStep].ans ? '✅ Benar!' : '❌ Belum tepat.'}</strong> {QUIZ[quizStep].exp}
                        </div>
                        <button onClick={nextQuestion} className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all">
                          {quizStep < QUIZ.length-1 ? 'Lanjutkan →' : 'Lihat Skor'}
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Star className="w-10 h-10 text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Kuis Grammar Selesai!</h2>
                    <p className="text-slate-500 mb-2">Skor: <strong className="text-blue-600 text-2xl">{quizScore}</strong> / {QUIZ.length}</p>
                    <p className="text-sm text-slate-400 mb-8">{quizScore >= 16 ? '🏆 Excellent! Grammar B2 kamu sangat solid.' : quizScore >= 10 ? '👍 Good job! Terus berlatih.' : '💪 Jangan menyerah, review teori lagi!'}</p>
                    <button onClick={restartQuiz} className="px-8 py-3 text-white rounded-xl font-bold transition-all" style={{backgroundColor:'#1A5276'}}>Ulangi Kuis</button>
                  </div>
                )}
              </div>
            </div>
          );
          return null;
        }}
      </LessonShell>
    </>
  );
};

export default UpperInterGrammarLesson2;
