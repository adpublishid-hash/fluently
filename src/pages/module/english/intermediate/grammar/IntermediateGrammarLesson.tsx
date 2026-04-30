import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, CheckCircle2, ClipboardCheck, Lightbulb, PenTool, Sigma, Volume2, XCircle } from 'lucide-react';
import LessonShell from '../../../../../components/shared/LessonShell';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import { playAudio } from '../../../../../services/ttsService';
import { getExpandedGrammarExamples, getInteractivePracticeSet, getIntermediateGrammarLesson } from './intermediateGrammarContent';

type Props = {
  lessonId: number;
};

const accentColor = '#8E44AD';

export default function IntermediateGrammarLesson({ lessonId }: Props) {
  const navigate = useNavigate();
  const lesson = getIntermediateGrammarLesson(lessonId);
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('intermediate_grammar', lessonId);
  const nextLessonPath = lessonId < 20 ? `/modul/english/intermediate/grammar/lesson-${lessonId + 1}` : undefined;
  const [quizStep, setQuizStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const examples = useMemo(() => lesson ? getExpandedGrammarExamples(lesson) : [], [lesson]);
  const practiceSet = useMemo(() => lesson ? getInteractivePracticeSet(lesson) : [], [lesson]);

  if (!lesson) {
    return (
      <div className="min-h-screen grid place-items-center text-slate-600">
        Materi tidak ditemukan.
      </div>
    );
  }

  const currentQuestion = practiceSet[quizStep];

  const playSound = (text: string) => {
    playAudio(text, 0.9);
  };

  const selectAnswer = (option: string) => {
    if (selectedOption || showResult || !currentQuestion) return;
    setSelectedOption(option);
    if (option === currentQuestion.answer) setScore((value) => value + 1);
  };

  const goToNextQuestion = () => {
    if (quizStep >= practiceSet.length - 1) {
      setShowResult(true);
      return;
    }
    setQuizStep((value) => value + 1);
    setSelectedOption(null);
  };

  const restartQuiz = () => {
    setQuizStep(0);
    setSelectedOption(null);
    setScore(0);
    setShowResult(false);
  };

  return (
    <>
      <LessonCompleteModal
        show={showCompleteModal}
        onClose={() => setShowCompleteModal(false)}
        lessonLabel={`Intermediate Grammar Lesson ${lesson.id}`}
        accentColor={accentColor}
        nextLessonPath={nextLessonPath}
        onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
        onBack={() => { setShowCompleteModal(false); navigate(-1); }}
      />

      <LessonShell
        title={lesson.title}
        subtitle={`Grammar - Pelajaran ${lesson.id}`}
        accentColor={accentColor}
        nextLesson={nextLessonPath}
        tabs={[
          { id: 'learn', label: 'Materi', icon: <BookOpen size={14} /> },
          { id: 'examples', label: 'Contoh', icon: <Volume2 size={14} /> },
          { id: 'practice', label: 'Latihan', icon: <PenTool size={14} /> },
        ]}
        footer={() => (
          <button
            onClick={isCompleted ? () => navigate(-1) : handleSelesai}
            className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg transition-all hover:opacity-90 active:scale-[0.98]"
            style={{ background: 'linear-gradient(135deg, #8E44AD, #8E44ADcc)' }}
          >
            <CheckCircle2 size={18} />
            {isCompleted ? 'Kembali' : 'Tandai Selesai'}
          </button>
        )}
      >
        {(tabId) => {
          if (tabId === 'learn') {
            return (
              <div className="space-y-5">
                <section className="rounded-2xl p-6 shadow-lg text-white relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #8E44AD, #B56BD0)' }}>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-80 mb-2">Intermediate Grammar</p>
                  <h2 className="text-xl font-extrabold mb-2">{lesson.title}</h2>
                  <p className="text-sm opacity-95 leading-relaxed">{lesson.summary}</p>
                </section>

                <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                      <Lightbulb size={19} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">Tujuan Materi</h3>
                      <p className="text-sm text-slate-600 leading-relaxed mt-1">{lesson.objective}</p>
                    </div>
                  </div>
                  <div className="grid gap-2 mt-4">
                    {lesson.keyUses.map((item) => (
                      <div key={item} className="text-sm text-slate-700 bg-slate-50 border border-slate-100 rounded-xl px-3 py-2">
                        {item}
                      </div>
                    ))}
                  </div>
                </section>

                <section className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                  <div className="px-5 py-4 bg-purple-50 border-b border-purple-100">
                    <h3 className="font-bold text-slate-900 flex items-center gap-2">
                      <Sigma size={18} className="text-purple-700" />
                      Rumus Utama
                    </h3>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {lesson.formulas.map((formula) => (
                      <div key={formula.label} className="p-5">
                        <p className="text-sm font-bold text-slate-900 mb-2">{formula.label}</p>
                        <div className="rounded-xl bg-slate-950 text-white px-4 py-3 font-mono text-sm overflow-x-auto">
                          {formula.pattern}
                        </div>
                        <p className="text-sm text-purple-700 font-semibold mt-3">{formula.example}</p>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">{formula.note}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="bg-white rounded-2xl border border-red-100 shadow-sm p-5">
                  <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-3">
                    <XCircle size={18} className="text-red-500" />
                    Kesalahan yang Sering Terjadi
                  </h3>
                  <div className="space-y-2">
                    {lesson.commonMistakes.map((mistake) => (
                      <p key={mistake} className="text-sm text-slate-700 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
                        {mistake}
                      </p>
                    ))}
                  </div>
                </section>
              </div>
            );
          }

          if (tabId === 'examples') {
            return (
              <div className="space-y-4">
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                  <div className="bg-slate-50 px-5 py-4 border-b border-slate-100">
                    <h3 className="font-bold text-slate-900 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-purple-600" />
                      Contoh Kalimat
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">Dengar via AI Voice, ulangi, lalu perhatikan fungsi grammarnya.</p>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {examples.map((example) => (
                      <div key={example.en} className="p-4 flex items-center justify-between gap-4">
                        <div>
                          <p className="text-sm font-bold text-slate-900">{example.en}</p>
                          <p className="text-xs text-slate-500 italic mt-1">{example.id}</p>
                          <p className="text-xs text-purple-700 font-semibold mt-2">{example.note}</p>
                        </div>
                        <button
                          onClick={() => playSound(example.en)}
                          className="w-9 h-9 rounded-full bg-white border border-slate-200 text-slate-500 flex items-center justify-center hover:border-purple-300 hover:text-purple-700 transition-all shadow-sm shrink-0"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          }

          return (
            <div className="space-y-4">
              <section className="rounded-2xl p-5 bg-white border border-slate-100 shadow-sm">
                <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-2">
                  <ClipboardCheck size={18} className="text-purple-700" />
                  Latihan Interaktif
                </h3>
                <p className="text-sm text-slate-500">Jawab 20 soal. Jawaban dan penjelasan baru muncul setelah kamu memilih opsi.</p>
              </section>

              {!showResult && currentQuestion && (
                <section className="rounded-2xl bg-white border border-slate-100 shadow-sm p-5">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <p className="text-xs font-bold text-purple-700">Soal {quizStep + 1} dari {practiceSet.length}</p>
                    <p className="text-xs font-bold text-slate-500">Skor: {score}</p>
                  </div>

                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-5">
                    <div
                      className="h-full rounded-full bg-purple-600 transition-all"
                      style={{ width: `${((quizStep + (selectedOption ? 1 : 0)) / practiceSet.length) * 100}%` }}
                    />
                  </div>

                  <h3 className="font-bold text-slate-900 mb-4">{currentQuestion.question}</h3>
                  <div className="grid gap-2">
                    {currentQuestion.options.map((option) => {
                      const isSelected = selectedOption === option;
                      const isAnswer = currentQuestion.answer === option;
                      const showCorrect = selectedOption && isAnswer;
                      const showWrong = selectedOption && isSelected && !isAnswer;
                      const className = showCorrect
                        ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                        : showWrong
                          ? 'border-red-300 bg-red-50 text-red-700'
                          : isSelected
                            ? 'border-purple-300 bg-purple-50 text-purple-800'
                            : 'border-slate-100 bg-slate-50 text-slate-700 hover:border-purple-200 hover:bg-purple-50';

                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => selectAnswer(option)}
                          disabled={Boolean(selectedOption)}
                          className={`rounded-xl border px-3 py-3 text-sm font-semibold text-left transition-all ${className}`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>

                  {selectedOption && (
                    <div className="mt-4 space-y-3">
                      <div className={`rounded-xl border px-4 py-3 text-sm ${selectedOption === currentQuestion.answer ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-red-200 bg-red-50 text-red-700'}`}>
                        <p className="font-bold">{selectedOption === currentQuestion.answer ? 'Benar' : 'Belum tepat'}</p>
                        <p className="mt-1">Jawaban: <span className="font-bold">{currentQuestion.answer}</span>. {currentQuestion.explanation}</p>
                      </div>
                      <button
                        type="button"
                        onClick={goToNextQuestion}
                        className="w-full py-3 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all"
                      >
                        {quizStep < practiceSet.length - 1 ? 'Lanjut' : 'Lihat Skor Akhir'}
                      </button>
                    </div>
                  )}
                </section>
              )}

              {showResult && (
                <section className="rounded-2xl bg-white border border-slate-100 shadow-sm p-8 text-center">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center mb-4">
                    <ClipboardCheck size={28} />
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 mb-2">Latihan Selesai</h3>
                  <p className="text-slate-500 mb-6">Skor kamu: <span className="font-extrabold text-purple-700">{score}</span> / {practiceSet.length}</p>
                  <button
                    type="button"
                    onClick={restartQuiz}
                    className="px-6 py-3 rounded-xl text-white font-bold transition-all"
                    style={{ backgroundColor: accentColor }}
                  >
                    Ulangi Latihan
                  </button>
                </section>
              )}
            </div>
          );
        }}
      </LessonShell>
    </>
  );
}
