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
    name: "Quantifiers with Countable & Uncountable Nouns",
    color: "blue",
    icon: "🔢",
    points: [
      "**Both / Each / Every / Either / Neither**: specific use with countable nouns.",
      "**Both** (two items, positive): \"**Both** proposals have considerable merit.\"",
      "**Either** (one or the other): \"**Either** solution could work effectively.\"",
      "**Neither** (not one nor the other): \"**Neither** approach proved sustainable long-term.\"",
      "**Each / Every**: each emphasizes individuals; every emphasizes totality.",
      "\"**Each** team member was assigned specific responsibility.\" vs \"**Every** attempt failed.\"",
    ]
  },
  {
    name: "Broad & Proportional Quantifiers",
    color: "indigo",
    icon: "📊",
    points: [
      "**The majority / A minority / A proportion / A significant number of + plural**",
      "\"**The majority of** respondents indicated support for the proposed changes.\"",
      "\"**A significant proportion of** the budget was allocated to research and development.\"",
      "**Much / Little** (uncountable): \"**Much** of the analysis was based on preliminary figures.\"",
      "**Many / Few / Several / Numerous**: \"**Numerous** studies have confirmed this finding.\"",
      "**A great deal of / A large amount of**: formal for large uncountable quantities.",
    ]
  },
  {
    name: "Partitive & Approximating Expressions",
    color: "amber",
    icon: "🔍",
    points: [
      "Partitive expressions: **a quantity/number/range/variety/series/set of...**",
      "\"**A range of** innovative solutions was proposed during the brainstorming session.\"",
      "\"**A series of** policy failures contributed to the erosion of public trust.\"",
      "Approximators: **approximately, roughly, around, some, about, nearly, almost**",
      "\"**Approximately** 40% of participants reported significant improvement in symptoms.\"",
      "\"**Some** researchers argue that the causal link has not yet been conclusively proven.\"",
    ]
  }
];
const EXAMPLES: string[] = [
  "\"**The majority of** economists surveyed anticipated a gradual reduction in inflationary pressure.\" → Majority of",
  "\"**A significant proportion of** the company's revenue now derives from emerging markets.\" → A proportion of",
  "\"**Neither** the government's stimulus package **nor** the monetary policy has proven sufficient.\" → Neither...nor",
  "\"**A series of** administrative errors led to the complete breakdown of the procurement process.\" → A series of",
  "\"**Numerous** longitudinal studies have demonstrated a clear correlation between diet and cognitive decline.\" → Numerous",
  "\"**Approximately** three-quarters of respondents indicated they would welcome stricter environmental regulation.\" → Approximately"
];
const QUIZ: QuizItem[] = [
  {
    "q": "Which describes the primary characteristic of Quantifiers Advanced?",
    "opts": [
      "It is a complex grammatical structure used in formal B2 contexts",
      "It is only used in questions",
      "It replaces all other grammar patterns",
      "It only appears in spoken English"
    ],
    "ans": "It is a complex grammatical structure used in formal B2 contexts",
    "exp": "Quantifiers Advanced adalah struktur gramatikal B2 yang digunakan secara luas dalam konteks formal dan akademik."
  },
  {
    "q": "At CEFR B2 level, writers are expected to use grammar with ___",
    "opts": [
      "Only basic sentences",
      "Primarily spoken patterns",
      "No errors at all",
      "A high degree of accuracy in complex contexts"
    ],
    "ans": "A high degree of accuracy in complex contexts",
    "exp": "CEFR B2 mengharuskan pengguna untuk menampilkan kontrol gramatikal yang baik dalam teks kompleks."
  },
  {
    "q": "Which sentence demonstrates higher grammatical sophistication?",
    "opts": [
      "Having worked here for years, I understand the culture well.",
      "I worked here.",
      "I work here.",
      "I am working here now."
    ],
    "ans": "Having worked here for years, I understand the culture well.",
    "exp": "Participle clause \"Having worked...\" menunjukkan tingkat sophistication gramatikal yang lebih tinggi."
  },
  {
    "q": "Formal academic writing generally requires ___",
    "opts": [
      "Passive voice and complex sentence structures",
      "Conversational tone",
      "Simple subject-verb patterns",
      "Contractions and slang"
    ],
    "ans": "Passive voice and complex sentence structures",
    "exp": "Academic writing formal menggunakan passive voice dan struktur kompleks untuk objektivitas dan presisi."
  },
  {
    "q": "Which is a sign of B2-level grammatical competence?",
    "opts": [
      "Using only simple sentences",
      "Avoiding all complex grammar",
      "Using varied sentence structures appropriately",
      "Mixing tenses randomly"
    ],
    "ans": "Using varied sentence structures appropriately",
    "exp": "B2 menunjukkan kemampuan menggunakan berbagai struktur kalimat yang kompleks dengan tepat."
  },
  {
    "q": "Error correction is important because it ___",
    "opts": [
      "Improves clarity and credibility of the text",
      "Makes writing shorter",
      "Replaces ideas with structure",
      "Eliminates all vocabulary"
    ],
    "ans": "Improves clarity and credibility of the text",
    "exp": "Memperbaiki kesalahan gramatikal meningkatkan kejernihan dan kredibilitas tulisan Anda."
  },
  {
    "q": "Which word signals strong contrast in formal writing?",
    "opts": [
      "So",
      "Because",
      "And",
      "Nevertheless"
    ],
    "ans": "Nevertheless",
    "exp": "\"Nevertheless\" adalah konektor formal yang kuat untuk menyatakan kontras antara dua argumen."
  },
  {
    "q": "The passive voice is preferred in academic writing because it ___",
    "opts": [
      "Is shorter than active voice",
      "Focuses on the action not the actor for objectivity",
      "Sounds more informal",
      "Is easier to construct"
    ],
    "ans": "Focuses on the action not the actor for objectivity",
    "exp": "Passive voice memindahkan fokus dari pelaku ke tindakan, menciptakan nada objektif yang cocok untuk akademik."
  },
  {
    "q": "Which structure correctly uses \"not only... but also\"?",
    "opts": [
      "Not only he studies, but also works.",
      "Not only studying, but also work.",
      "Not only he does study, but also works.",
      "Not only does he study, but he also works."
    ],
    "ans": "Not only does he study, but he also works.",
    "exp": "\"Not only\" diikuti inversion: does/is/has + subject. \"Not only does he study, but he also works.\""
  },
  {
    "q": "Which connector adds information while contrasting simultaneously?",
    "opts": [
      "However",
      "Despite",
      "While",
      "Therefore"
    ],
    "ans": "While",
    "exp": "\"While\" dapat digunakan untuk menambahkan informasi yang berkontras dalam satu kalimat (\"While X is true, Y is also important\")."
  },
  {
    "q": "Cleft sentences are used to ___",
    "opts": [
      "Shorten sentences",
      "Replace relative clauses",
      "Remove the subject",
      "Emphasize a specific element of a sentence"
    ],
    "ans": "Emphasize a specific element of a sentence",
    "exp": "Cleft sentences (\"It is X that...\") digunakan untuk memberikan penekanan pada elemen tertentu."
  },
  {
    "q": "Which is an example of nominalization?",
    "opts": [
      "His decision to go shocked us.",
      "Going was his plan.",
      "He was going there.",
      "He decided to go."
    ],
    "ans": "His decision to go shocked us.",
    "exp": "Nominalization: kata kerja \"decided\" diubah menjadi nomina \"decision\" untuk gaya akademik yang lebih formal."
  },
  {
    "q": "Which preposition commonly follows \"the reason\"?",
    "opts": [
      "for",
      "by",
      "of",
      "to"
    ],
    "ans": "for",
    "exp": "\"The reason for + noun\" atau \"the reason why + clause\" adalah kolokasi baku dalam formal English."
  },
  {
    "q": "To avoid repetition in formal texts, writers use ___",
    "opts": [
      "Synonyms and ellipsis",
      "Short sentences",
      "Only pronouns",
      "The same word repeatedly"
    ],
    "ans": "Synonyms and ellipsis",
    "exp": "Sinonim dan ellipsis (menghilangkan bagian yang sudah jelas) digunakan untuk menghindari repetisi."
  },
  {
    "q": "Which is NOT a discourse marker for adding information?",
    "opts": [
      "Furthermore",
      "Nevertheless",
      "Moreover",
      "In addition"
    ],
    "ans": "Nevertheless",
    "exp": "\"Nevertheless\" digunakan untuk kontras, bukan untuk menambah informasi. Tiga lainnya digunakan untuk penambahan."
  },
  {
    "q": "In academic style, \"big\" should be replaced with ___",
    "opts": [
      "Substantial",
      "Significant",
      "Huge",
      "Large"
    ],
    "ans": "Substantial",
    "exp": "\"Substantial\" atau \"significant\" adalah pilihan yang lebih akademik dibandingkan \"big\" atau \"large\"."
  },
  {
    "q": "\"Despite\" is followed by ___",
    "opts": [
      "A noun phrase or gerund",
      "A full clause",
      "An adjective only",
      "An infinitive"
    ],
    "ans": "A noun phrase or gerund",
    "exp": "\"Despite\" diikuti langsung oleh noun phrase atau gerund: \"Despite the rain\" / \"Despite working hard\"."
  },
  {
    "q": "Which structure shows condition without \"if\"?",
    "opts": [
      "Unless + past",
      "Since + noun",
      "Although + subject",
      "Were + subject + infinitive"
    ],
    "ans": "Were + subject + infinitive",
    "exp": "\"Were I to leave early...\" adalah inversion conditional formal yang menggantikan \"If I were to leave early...\"."
  },
  {
    "q": "Which linking expression introduces a conclusion?",
    "opts": [
      "In addition",
      "As a result",
      "On the other hand",
      "In contrast"
    ],
    "ans": "As a result",
    "exp": "\"As a result\" menunjukkan hasil atau konsekuensi dari pernyataan sebelumnya."
  },
  {
    "q": "Which is the BEST academic version of \"The company got more money from investors\"?",
    "opts": [
      "More money was got by the company.",
      "Investors gave the company lots of cash.",
      "The company received additional funding from investors.",
      "The company got more dollars from people."
    ],
    "ans": "The company received additional funding from investors.",
    "exp": "\"Received additional funding\" adalah ekspresi formal yang tepat untuk konteks akademik dan bisnis."
  }
];

const UpperInterGrammarLesson17: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('upper_intermediate_grammar', 17);
  const nextLessonPath = '/modul/english/upper-intermediate/grammar/lesson-18';

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
        lessonLabel="Upper-Intermediate Grammar Lesson 17"
        accentColor="#1A5276"
        nextLessonPath={nextLessonPath}
        onNext={() => { setShowCompleteModal(false); navigate(nextLessonPath); }}
        onBack={() => { setShowCompleteModal(false); navigate(-1); }}
      />
      <LessonShell
        title="Quantifiers Advanced"
        subtitle="Grammar B2 • Pelajaran 17"
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
                <h2 className="text-xl font-extrabold mb-1">Quantifiers Advanced</h2>
                <p className="text-sm opacity-90">Few/Little/A few/A little + Formal Usage</p>
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

export default UpperInterGrammarLesson17;
