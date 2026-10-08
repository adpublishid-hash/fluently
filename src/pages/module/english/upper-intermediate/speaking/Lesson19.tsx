import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LessonShell from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Star, Mic2, MessageCircle } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

import { shuffledAuthored } from '../../advanced/shared/authoredQuiz';
import { upperInterSpeakingQuizBank } from './quizBank';
interface SpeakingItem { phrase: string; usage: string; }
interface SpeakingSection { name: string; icon: string; items: SpeakingItem[]; }
interface QuizItem { q: string; opts: string[]; ans: string; exp: string; }

const SECTIONS: SpeakingSection[] = [
  {
    name: "Mengevaluasi Argumen",
    icon: "🧠",
    items: [
      { phrase: "The strength of this argument rests on the quality of its underlying evidence.", usage: "Menilai kualitas argumen dari sisi bukti" },
      { phrase: "While this is a persuasive claim, it relies heavily on an unexamined assumption.", usage: "Mengidentifikasi asumsi tersembunyi" },
      { phrase: "The logic here is sound, provided we accept the initial premise.", usage: "Menilai logika dengan syarat" },
      { phrase: "This argument would be more compelling if supported by empirical evidence.", usage: "Meminta bukti empiris" },
      { phrase: "There is an internal inconsistency in this line of reasoning: on one hand..., yet on the other...", usage: "Mengidentifikasi inkonsistensi internal" },
      { phrase: "The argument conflates two distinct concepts: X and Y are not equivalent.", usage: "Mengidentifikasi equivocation" },
      { phrase: "This is a well-structured argument, though the conclusion may not necessarily follow from the premises.", usage: "Menilai struktur logis" },
      { phrase: "One must distinguish between what the evidence demonstrates and what it merely suggests.", usage: "Tingkat kepastian dalam interpretasi bukti" }
    ]
  },
  {
    name: "Identifikasi Logical Fallacies",
    icon: "🔍",
    items: [
      { phrase: "That appears to be a false dilemma — there may be options beyond A and B.", usage: "Mengidentifikasi false dichotomy" },
      { phrase: "This reasoning assumes that correlation implies causation, which is not necessarily the case.", usage: "Korelasi vs kausalitas" },
      { phrase: "Be cautious of hasty generalisations — one case does not establish a pattern.", usage: "Mengidentifikasi hasty generalisation" },
      { phrase: "This seems to be an appeal to authority rather than evidence.", usage: "Mengidentifikasi appeal to authority" },
      { phrase: "The argument here is essentially circular — it relies on its own conclusion as evidence.", usage: "Mengidentifikasi circular reasoning" },
      { phrase: "This may be a straw man argument — that is not quite what the opposing view holds.", usage: "Mengidentifikasi straw man" },
      { phrase: "We should be careful not to commit the ad hominem fallacy by attacking the person, not the argument.", usage: "Menghindari ad hominem" },
      { phrase: "The slippery slope assumption here requires evidence that each step necessarily leads to the next.", usage: "Mengidentifikasi slippery slope" }
    ]
  },
  {
    name: "Diskusi Kritis yang Produktif",
    icon: "💬",
    items: [
      { phrase: "Let us examine the evidence on both sides before drawing any conclusions.", usage: "Pendekatan balanced sebelum simpulan" },
      { phrase: "Rather than dismissing this view outright, let us explore the reasoning behind it.", usage: "Pendekatan steel-manning argumen lawan" },
      { phrase: "What specific evidence would change your position on this?", usage: "Pertanyaan penting tentang falsifiability" },
      { phrase: "I think we should be epistemically humble here given the complexity of the issue.", usage: "Mengedepankan kerendahan hati epistemik" },
      { phrase: "Let us focus on the strongest version of each argument.", usage: "Mengutamakan argumen terkuat dari tiap sisi" },
      { phrase: "What assumptions are we making that we might not have examined carefully?", usage: "Mengidentifikasi asumsi tak tersirat" }
    ]
  }
];
const QUIZ: QuizItem[] = shuffledAuthored(upperInterSpeakingQuizBank[19], 'upper-intermediate/speaking/19');

const UpperInterSpeakingLesson19: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('upper_intermediate_speaking', 19);
  const nextLessonPath = '/modul/english/upper-intermediate/speaking/lesson-20';

  const [activeSection, setActiveSection] = useState(0);
  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string|null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  const handlePlay = (text: string) => { playAudio(text, 0.85); };

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

  return (
    <>
      <LessonCompleteModal
        show={showCompleteModal}
        onClose={() => setShowCompleteModal(false)}
        lessonLabel="Upper-Intermediate Speaking Lesson 19"
        accentColor="#4FA3D1"
        nextLessonPath={nextLessonPath}
        onNext={() => { setShowCompleteModal(false); navigate(nextLessonPath); }}
        onBack={() => { setShowCompleteModal(false); navigate(-1); }}
      />
      <LessonShell
        title="Critical Thinking in Discussion"
        subtitle="Speaking B2 • Pelajaran 19"
        accentColor="#4FA3D1"
        nextLesson={nextLessonPath}
        tabs={[
          { id: 'learn', label: 'Frasa & Teknik', icon: <BookOpen size={14} /> },
          { id: 'practice', label: 'Latihan Soal', icon: <PenTool size={14} /> }
        ]}
        footer={() => (
          <button
            onClick={isCompleted ? () => navigate(-1) : handleSelesai}
            className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg transition-all hover:opacity-90 active:scale-[0.98]"
            style={{ background: isCompleted ? 'linear-gradient(135deg,#4FA3D1,#1E6F9F)' : 'linear-gradient(135deg,#4FA3D1,#2F86B5)' }}
          >
            <CheckCircle2 size={18} />
            {isCompleted ? 'Sudah Selesai ✓' : 'Selesai & Simpan Progress'}
          </button>
        )}
      >
        {(tabId) => {
          if (tabId === 'learn') return (
            <div className="space-y-6 animate-fade-in p-4">
              <div className="rounded-3xl p-6 text-white shadow-xl relative overflow-hidden" style={{background:'linear-gradient(135deg,#4FA3D1,#0B5345)'}}>
                <div className="text-3xl mb-2">🎙️</div>
                <h2 className="text-xl font-extrabold mb-1">Critical Thinking in Discussion</h2>
                <p className="text-sm opacity-90">Berpikir Kritis & Analitis dalam Diskusi Lisan</p>
                <div className="mt-3 inline-block bg-white/20 px-3 py-1 rounded-full text-xs font-bold">🗣️ CEFR B2 · Speaking</div>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-1">
                {SECTIONS.map((s, i) => (
                  <button key={i} onClick={() => setActiveSection(i)}
                    className={'px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ' + (activeSection === i ? 'text-white shadow-md' : 'bg-white text-slate-500 border border-slate-200')}
                    style={activeSection === i ? {backgroundColor:'#4FA3D1'} : {}}>
                    {s.icon} {s.name}
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                {SECTIONS[activeSection].items.map((item, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 border border-sky-100 shadow-sm">
                    <div className="flex items-start gap-3">
                      <button onClick={() => handlePlay(item.phrase)}
                        className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center shrink-0 hover:bg-green-100 transition-colors">
                        <Mic2 className="w-4 h-4 text-green-600" />
                      </button>
                      <div>
                        <p className="font-bold text-slate-800 text-sm">{item.phrase}</p>
                        <p className="text-xs text-slate-500 mt-0.5 italic">{item.usage}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-green-50 rounded-2xl p-4 border border-sky-100">
                <div className="flex items-center gap-2 mb-2">
                  <MessageCircle className="w-5 h-5 text-green-600" />
                  <h3 className="font-bold text-green-800 text-sm">💡 Tips Speaking B2</h3>
                </div>
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>• Gunakan frasa ini dalam percakapan nyata atau latihan role-play.</li>
                  <li>• Rekam dan putar ulang untuk menilai kelancaran dan ketepatan.</li>
                  <li>• Fokus pada register (formal/informal) sesuai konteks situasi.</li>
                </ul>
              </div>
            </div>
          );

          if (tabId === 'practice') return (
            <div className="p-4 animate-fade-in">
              <div className="max-w-xl mx-auto">
                {!showResult ? (
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-sky-100">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xs font-bold text-slate-400 uppercase">Soal {quizStep+1}/{QUIZ.length}</span>
                      <span className="text-xs font-bold bg-green-50 text-green-700 px-3 py-1 rounded-full">Skor: {quizScore}</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 mb-5">
                      <div className="h-1.5 rounded-full bg-green-600 transition-all" style={{width: ((quizStep/QUIZ.length)*100)+'%'}}></div>
                    </div>
                    <h3 className="text-sm font-bold text-slate-800 mb-5">{QUIZ[quizStep].q}</h3>
                    <div className="space-y-2">
                      {QUIZ[quizStep].opts.map((opt, i) => {
                        let cls = 'border-slate-200 hover:border-sky-300 hover:bg-green-50';
                        if (isAnswerChecked) {
                          if (opt === QUIZ[quizStep].ans) cls = 'bg-green-50 border-sky-500 text-green-800';
                          else if (opt === selectedOption) cls = 'bg-red-50 border-red-400 text-red-700';
                          else cls = 'opacity-40 border-slate-200';
                        }
                        return (
                          <button key={i} onClick={() => handleCheckQuiz(opt)} disabled={isAnswerChecked}
                            className={'w-full p-3 rounded-xl border-2 text-left font-medium transition-all flex items-center justify-between text-sm ' + cls}>
                            <span>{opt}</span>
                            {isAnswerChecked && opt === QUIZ[quizStep].ans && <CheckCircle2 size={16} className="text-green-600 shrink-0" />}
                            {isAnswerChecked && opt === selectedOption && opt !== QUIZ[quizStep].ans && <XCircle size={16} className="text-red-500 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                    {isAnswerChecked && (
                      <div className="mt-4">
                        <div className={'p-3 rounded-xl text-sm mb-3 ' + (selectedOption === QUIZ[quizStep].ans ? 'bg-green-50 text-green-800' : 'bg-orange-50 text-orange-800')}>
                          <strong>{selectedOption === QUIZ[quizStep].ans ? '✅ Benar!' : '❌ Belum tepat.'}</strong> {QUIZ[quizStep].exp}
                        </div>
                        <button onClick={nextQuestion} className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all">
                          {quizStep < QUIZ.length-1 ? 'Soal Berikutnya →' : 'Lihat Skor Akhir'}
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Star className="w-10 h-10 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Kuis Speaking Selesai!</h2>
                    <p className="text-slate-500 mb-2">Skor: <strong className="text-green-600 text-2xl">{quizScore}</strong> / {QUIZ.length}</p>
                    <p className="text-sm text-slate-400 mb-8">{quizScore >= 16 ? '🎙️ Outstanding B2 Speaker!' : quizScore >= 10 ? '👍 Keep practising!' : '💪 Review the phrases and try again!'}</p>
                    <button onClick={restartQuiz} className="px-8 py-3 text-white rounded-xl font-bold" style={{backgroundColor:'#4FA3D1'}}>Ulangi Kuis</button>
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

export default UpperInterSpeakingLesson19;
