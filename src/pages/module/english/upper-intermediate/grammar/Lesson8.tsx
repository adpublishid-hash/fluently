import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LessonShell from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Star, Lightbulb } from 'lucide-react';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

import { shuffledAuthored } from '../../advanced/shared/authoredQuiz';
import { upperInterGrammarQuizBank } from './quizBank';
interface TheoryBlock { name: string; color: string; icon: string; points: string[]; }
interface QuizItem { q: string; opts: string[]; ans: string; exp: string; }

const THEORY: TheoryBlock[] = [
  {
    name: "Epistemic Modals: Present Deduction",
    color: "blue",
    icon: "🔵",
    points: [
      "Modal verbs untuk deduksi dan spekulasi tentang situasi saat ini:",
      "**Must be**: hampir pasti (positive): \"She **must be** exhausted after the 14-hour flight.\"",
      "**Can't/Couldn't be**: hampir pasti (negative): \"That **can't be** right — the figures don't add up.\"",
      "**May/Might/Could be**: mungkin (50-50 atau kurang): \"He **might be** stuck in traffic.\"",
      "**Should be**: seharusnya (expectation): \"The results **should be** available by now.\"",
      "Tingkat kepastian: **must** (95%) > **should** (80%) > **may** (50%) > **might/could** (30%)",
    ]
  },
  {
    name: "Modal Perfect: Past Deduction",
    color: "indigo",
    icon: "🟣",
    points: [
      "Modal + **have** + past participle untuk deduksi tentang masa lalu:",
      "**Must have**: hampir pasti terjadi: \"She **must have left** before I arrived.\"",
      "**Can't have**: hampir pasti tidak terjadi: \"He **can't have forgotten** — it's in the calendar.\"",
      "**May/Might/Could have**: mungkin terjadi: \"They **may have made** a mistake in the report.\"",
      "**Should have**: seharusnya terjadi (tapi tidak): \"The report **should have been submitted** last week.\"",
      "**Need not have**: tidak perlu dilakukan (tapi sudah dilakukan): \"You **needn't have worried** — everything is fine.\"",
    ]
  },
  {
    name: "Modals in Formal & Academic Contexts",
    color: "green",
    icon: "🟢",
    points: [
      "Academic writing menggunakan modal untuk hedging (ketidakpastian yang terukur):",
      "\"This **could** suggest that the hypothesis requires further testing.\"",
      "\"The results **may** indicate a correlation between the two variables.\"",
      "\"These findings **might** have implications for policy design.\"",
      "Formal speech: **Would** untuk formalisasi permintaan dan saran:",
      "\"**Would** it be possible to schedule a follow-up meeting?\"",
      "\"You **might wish to consider** the long-term implications of this decision.\"",
    ]
  }
];
const EXAMPLES: string[] = [
  "\"She **must have worked** through the night — the entire report was completed by morning.\" → Past deduction",
  "\"The results **can't have been** accurate — the methodology was fundamentally flawed.\" → Past negative deduction",
  "\"This pattern **might suggest** that the variable is not as significant as initially assumed.\" → Academic hedging",
  "\"You **needn't have stayed** so late — I had already solved the problem.\" → Needn't have",
  "\"He **should have been informed** of the changes before the meeting.\" → Should have (criticism)",
  "\"The anomaly **could indicate** a previously undetected flaw in the model.\" → Could for possibility"
];
const QUIZ: QuizItem[] = shuffledAuthored(upperInterGrammarQuizBank[8], 'upper-intermediate/grammar/8');

const UpperInterGrammarLesson8: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('upper_intermediate_grammar', 8);
  const nextLessonPath = '/modul/english/upper-intermediate/grammar/lesson-9';

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
        lessonLabel="Upper-Intermediate Grammar Lesson 8"
        accentColor="#1A5276"
        nextLessonPath={nextLessonPath}
        onNext={() => { setShowCompleteModal(false); navigate(nextLessonPath); }}
        onBack={() => { setShowCompleteModal(false); navigate(-1); }}
      />
      <LessonShell
        title="Modal Verbs for Deduction"
        subtitle="Grammar B2 • Pelajaran 8"
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
                <h2 className="text-xl font-extrabold mb-1">Modal Verbs for Deduction</h2>
                <p className="text-sm opacity-90">Must/Can't/Could/Might for Speculation B2</p>
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

export default UpperInterGrammarLesson8;
