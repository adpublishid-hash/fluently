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
    "name": "Present Perfect vs Past Simple",
    "color": "blue",
    "icon": "🔵",
    "points": [
      "Present Perfect: untuk pengalaman/recently completed actions yang masih relevan sekarang.",
      "Kalimat: \"I **have worked** here for 5 years.\" (masih bekerja di sini)",
      "Past Simple: untuk waktu spesifik di masa lalu yang sudah selesai.",
      "Kalimat: \"I **worked** there in 2019.\" (sudah tidak bekerja di sana)",
      "Signal words Present Perfect: already, yet, ever, never, just, recently, for, since",
      "Signal words Past Simple: yesterday, last year, in 2020, ago, when"
    ]
  },
  {
    "name": "Past Perfect",
    "color": "indigo",
    "icon": "🟣",
    "points": [
      "Past Perfect: aksi yang selesai SEBELUM aksi lain di masa lalu.",
      "Rumus: had + past participle",
      "\"Before she arrived, he **had already eaten**.\" (makan selesai sebelum tiba)",
      "\"I **had never seen** such a beautiful place before visiting Bali.\"",
      "Digunakan bersama before, after, when, by the time, already",
      "Memberi konteks latar belakang dalam narasi masa lalu."
    ]
  },
  {
    "name": "Future Perfect",
    "color": "violet",
    "icon": "🔮",
    "points": [
      "Future Perfect: aksi yang akan selesai SEBELUM waktu tertentu di masa depan.",
      "Rumus: will have + past participle",
      "\"By 2030, the company **will have expanded** to 50 countries.\"",
      "\"By the time you arrive, I **will have finished** cooking.\"",
      "Signal words: by then, by [time], before [event], by the time",
      "Digunakan untuk proyeksi, prediksi, atau rencana masa depan yang pasti."
    ]
  }
];
const EXAMPLES: string[] = [
  "\"She **has been studying** English for three years.\" → Present Perfect Continuous (masih berlangsung)",
  "\"They **had been waiting** for two hours when the bus finally came.\" → Past Perfect Continuous",
  "\"By next month, I **will have been working** here for a decade.\" → Future Perfect Continuous",
  "\"I **have never visited** Tokyo, but I hope to go next year.\" → Present Perfect untuk pengalaman",
  "\"The scientists **had discovered** a new species before the lab was closed.\" → Past Perfect untuk urutan",
  "\"By 2030, renewable energy **will have replaced** most fossil fuels.\" → Future Perfect untuk prediksi"
];
const QUIZ: QuizItem[] = [
  {
    "q": "Choose the correct tense: \"When I arrived, she ___ (already leave) the office.\"",
    "opts": [
      "was already leaving",
      "already left",
      "had already left",
      "has already left"
    ],
    "ans": "had already left",
    "exp": "Past Perfect (had left) digunakan untuk aksi yang selesai SEBELUM aksi lain di masa lalu (arrived)."
  },
  {
    "q": "Which sentence uses Present Perfect CORRECTLY?",
    "opts": [
      "We have already submitted the report.",
      "They have worked there in 2020.",
      "I have seen him yesterday.",
      "She has moved to London last year."
    ],
    "ans": "We have already submitted the report.",
    "exp": "\"Already\" adalah signal word Present Perfect. Kalimat lain salah karena menggunakan time adverb past (yesterday, last year, in 2020)."
  },
  {
    "q": "\"By the time you read this, I ___ (finish) the project.\" Choose correctly.",
    "opts": [
      "will finish",
      "have finished",
      "will have finished",
      "had finished"
    ],
    "ans": "will have finished",
    "exp": "Future Perfect (will have finished) digunakan untuk aksi yang selesai SEBELUM waktu tertentu di masa depan."
  },
  {
    "q": "She ___ English for 10 years, so she is fluent now.",
    "opts": [
      "has studied",
      "will study",
      "studied",
      "had studied"
    ],
    "ans": "has studied",
    "exp": "Present Perfect dengan \"for\" menunjukkan aksi yang dimulai masa lalu dan masih relevan sekarang."
  },
  {
    "q": "He told me he ___ never ___ to Japan before.",
    "opts": [
      "will, go",
      "has, been",
      "was, gone",
      "had, been"
    ],
    "ans": "had, been",
    "exp": "Past Perfect dalam reported speech: dia menceritakan pengalamannya sebelum saat berbicara."
  },
  {
    "q": "\"Researchers ___ the data by the time the conference begins.\" Best choice?",
    "opts": [
      "have analysed",
      "had analysed",
      "analyse",
      "will have analysed"
    ],
    "ans": "will have analysed",
    "exp": "Future Perfect menunjukkan bahwa analisis akan selesai sebelum konferensi dimulai."
  },
  {
    "q": "Which time expression goes with the Past Perfect tense?",
    "opts": [
      "yesterday",
      "since last year",
      "tomorrow",
      "by the time"
    ],
    "ans": "by the time",
    "exp": "\"By the time\" + Past Perfect menunjukkan urutan kronologis dua peristiwa masa lalu."
  },
  {
    "q": "I ___ three novels this year. (tahun ini belum selesai)",
    "opts": [
      "had read",
      "will read",
      "read",
      "have read"
    ],
    "ans": "have read",
    "exp": "Present Perfect digunakan karena waktu (this year) belum selesai - masih dalam periode yang sama."
  },
  {
    "q": "\"Before smartphones, people ___ maps to navigate.\" Choose correctly.",
    "opts": [
      "had used",
      "will have used",
      "use",
      "have used"
    ],
    "ans": "had used",
    "exp": "Past Perfect menunjukkan kebiasaan yang ada sebelum peristiwa lain (sebelum era smartphone)."
  },
  {
    "q": "Which sentence shows the CORRECT future perfect structure?",
    "opts": [
      "She will have finished the project by Monday.",
      "She had finished the project by Monday.",
      "She finishes the project by Monday.",
      "She will finish the project."
    ],
    "ans": "She will have finished the project by Monday.",
    "exp": "Future Perfect: will + have + past participle, with \"by Monday\" sebagai deadline masa depan."
  },
  {
    "q": "The signal word \"yet\" is typically used with which tense?",
    "opts": [
      "Past Simple",
      "Present Perfect",
      "Future Perfect",
      "Past Perfect"
    ],
    "ans": "Present Perfect",
    "exp": "\"Yet\" digunakan dalam kalimat Present Perfect, biasanya dalam pertanyaan atau kalimat negatif."
  },
  {
    "q": "\"___ you ever ___ bungee jumping?\" Choose correctly.",
    "opts": [
      "Had, tried",
      "Have, tried",
      "Did, try",
      "Will, try"
    ],
    "ans": "Have, tried",
    "exp": "\"Ever\" dalam pertanyaan tentang pengalaman hidup → Present Perfect (Have you ever...)."
  },
  {
    "q": "By 2050, scientists predict they ___ a cure for cancer.",
    "opts": [
      "had found",
      "have found",
      "find",
      "will have found"
    ],
    "ans": "will have found",
    "exp": "Future Perfect (will have found) untuk proyeksi yang akan selesai sebelum tahun 2050."
  },
  {
    "q": "\"I ___ here since 2015\" means I am still here now.",
    "opts": [
      "worked",
      "had worked",
      "was working",
      "have been working"
    ],
    "ans": "have been working",
    "exp": "Present Perfect Continuous (have been working + since) = aktivitas yang dimulai di masa lalu dan masih berlangsung."
  },
  {
    "q": "Which sentence INCORRECTLY uses Past Perfect?",
    "opts": [
      "She had eaten before he arrived.",
      "He had been born in 1990.",
      "They had left when I called.",
      "I had went to the store."
    ],
    "ans": "I had went to the store.",
    "exp": "\"Had went\" adalah kesalahan - Past Participle dari \"go\" adalah \"gone\", bukan \"went\"."
  },
  {
    "q": "He was exhausted because he ___ all night.",
    "opts": [
      "works",
      "worked",
      "had been working",
      "will work"
    ],
    "ans": "had been working",
    "exp": "Past Perfect Continuous (had been working) menunjukkan aksi yang berlangsung lama dan menyebabkan kondisi masa lalu."
  },
  {
    "q": "The phrase \"by the time\" signals which tense combination?",
    "opts": [
      "Past + Past Perfect",
      "Future + Past",
      "Present + Past",
      "Past + Present Perfect"
    ],
    "ans": "Past + Past Perfect",
    "exp": "\"By the time + Past Simple, + Past Perfect\" → By the time she arrived, he had left."
  },
  {
    "q": "\"The team members ___ extensive training before the match.\" Which is BEST?",
    "opts": [
      "undertook",
      "had undertaken",
      "have undertaken",
      "will undertake"
    ],
    "ans": "had undertaken",
    "exp": "Past Perfect karena pelatihan selesai sebelum pertandingan (urutan peristiwa masa lalu)."
  },
  {
    "q": "Which shows CORRECT signal word for Future Perfect?",
    "opts": [
      "by next year",
      "since",
      "just",
      "yesterday"
    ],
    "ans": "by next year",
    "exp": "\"By + future time\" → Future Perfect: \"By next year, she will have graduated.\""
  },
  {
    "q": "Which sentence uses \"for\" correctly with Present Perfect?",
    "opts": [
      "She has lived there for 2010.",
      "He has studied for last month.",
      "They have worked here for 5 years.",
      "I have been here for yesterday."
    ],
    "ans": "They have worked here for 5 years.",
    "exp": "\"For + duration\" (5 years) dengan Present Perfect berarti aksi berlangsung dari waktu tertentu hingga sekarang."
  }
];

const UpperInterGrammarLesson1: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('upper_intermediate_grammar', 1);
  const nextLessonPath = '/modul/english/upper-intermediate/grammar/lesson-2';

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
        lessonLabel="Upper-Intermediate Grammar Lesson 1"
        accentColor="#1A5276"
        nextLessonPath={nextLessonPath}
        onNext={() => { setShowCompleteModal(false); navigate(nextLessonPath); }}
        onBack={() => { setShowCompleteModal(false); navigate(-1); }}
      />
      <LessonShell
        title="Advanced Perfect Tenses"
        subtitle="Grammar B2 • Pelajaran 1"
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
                <h2 className="text-xl font-extrabold mb-1">Advanced Perfect Tenses</h2>
                <p className="text-sm opacity-90">Perfect Tenses: Present, Past & Future</p>
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

export default UpperInterGrammarLesson1;
