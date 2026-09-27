import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Award, CheckCircle2, ClipboardList, RotateCcw, Target, XCircle } from 'lucide-react';
import PageContainer from '../../../components/layout/PageContainer';
import { useLanguage } from '../../../i18n/LanguageContext';

export type QuizLevel = 'Basic' | 'Intermediate' | 'Advanced';

export type Topic = {
  id: string;
  title: string;
  description: string;
};

export type VocabQuestion = {
  id: string;
  level: QuizLevel;
  prompt: string;
  answer: string;
  options: string[];
};

type MistakeRecord = {
  id: string;
  skillId: string;
  topicTitle: string;
  level: QuizLevel;
  prompt: string;
  answer: string;
  selected: string;
  options?: string[];
  savedAt: string;
};

type PracticeAttempt = {
  id: string;
  skillId: string;
  topicId: string;
  topicTitle: string;
  score: number;
  total: number;
  weakestLevel: QuizLevel;
  completedAt: string;
};

const mistakeBankKey = 'fluently-mistake-bank-v1';
const practiceHistoryKey = 'fluently-practice-history-v1';

function loadMistakeBank(): MistakeRecord[] {
  if (typeof window === 'undefined') return [];

  try {
    const raw = window.localStorage.getItem(mistakeBankKey);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveMistakeBank(records: MistakeRecord[]) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(mistakeBankKey, JSON.stringify(records.slice(0, 120)));
}

function loadPracticeHistory(): PracticeAttempt[] {
  if (typeof window === 'undefined') return [];

  try {
    const raw = window.localStorage.getItem(practiceHistoryKey);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function savePracticeAttempt(attempt: PracticeAttempt) {
  if (typeof window === 'undefined') return;
  const nextHistory = [attempt, ...loadPracticeHistory()].slice(0, 200);
  window.localStorage.setItem(practiceHistoryKey, JSON.stringify(nextHistory));
}

function buildQuestionExplanation(question: VocabQuestion, selected?: string) {
  if (selected === question.answer) {
    return `Jawaban benar karena "${question.answer}" paling sesuai dengan instruksi soal.`;
  }

  return `Jawaban yang tepat adalah "${question.answer}". Pilihanmu "${selected || '-'}" belum sesuai dengan konteks soal, jadi ulangi pola pada pertanyaan ini saat review.`;
}

export function VocabularyQuizPage({
  topicId,
  levelId,
  skillId = 'vocabulary',
  quizTopics,
  buildQuizQuestions,
  quizLabel = 'Vocabulary',
  introContent,
  backPath,
}: {
  topicId: string;
  levelId?: string;
  skillId?: string;
  quizTopics: Topic[];
  buildQuizQuestions: (topicId: string, language?: 'en' | 'id') => VocabQuestion[];
  quizLabel?: string;
  introContent?: (topic: Topic) => ReactNode;
  backPath?: string;
}) {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const topic = quizTopics.find((item) => item.id === topicId) || quizTopics[0];
  const resolvedBackPath = backPath || (levelId ? `/latihan/${levelId}/${skillId}` : `/latihan/${skillId}`);
  const questions = useMemo(() => buildQuizQuestions(topic.id, language), [buildQuizQuestions, language, topic.id]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [mistakeBankCount, setMistakeBankCount] = useState(() => loadMistakeBank().length);

  const score = questions.reduce((total, question) => total + (answers[question.id] === question.answer ? 1 : 0), 0);
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / questions.length) * 100);
  const wrongQuestions = questions.filter((question) => answers[question.id] && answers[question.id] !== question.answer);
  const levelStats = (['Basic', 'Intermediate', 'Advanced'] as QuizLevel[]).map((level) => {
    const levelQuestions = questions.filter((question) => question.level === level);
    const answered = levelQuestions.filter((question) => answers[question.id]).length;
    const correct = levelQuestions.filter((question) => answers[question.id] === question.answer).length;

    return { level, answered, correct, total: levelQuestions.length };
  });
  const weakestLevel = levelStats.reduce((weakest, stat) => {
    const statRate = stat.correct / stat.total;
    const weakestRate = weakest.correct / weakest.total;
    return statRate < weakestRate ? stat : weakest;
  }, levelStats[0]);
  const recommendation = score >= 26
    ? `Mantap. Lanjut ke topik ${quizLabel} berikutnya atau coba ulang mode Advanced.`
    : score >= 18
      ? `Fokus ulang level ${weakestLevel.level}; level ini skormu ${weakestLevel.correct}/${weakestLevel.total}.`
      : `Perkuat Basic dulu sebelum lanjut. Mulai dari review ${wrongQuestions.length} soal yang salah.`;

  const reset = () => {
    setAnswers({});
    setSubmitted(false);
  };

  const scrollToQuestion = (questionId: string) => {
    document.getElementById(questionId)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const submitQuiz = () => {
    const wrongRecords: MistakeRecord[] = wrongQuestions.map((question) => ({
      id: `${skillId}-${topic.id}-${question.id}`,
      skillId,
      topicTitle: topic.title,
      level: question.level,
      prompt: question.prompt,
      answer: question.answer,
      selected: answers[question.id],
      options: question.options,
      savedAt: new Date().toISOString(),
    }));
    const existing = loadMistakeBank().filter((record) => !wrongRecords.some((item) => item.id === record.id));
    const nextBank = [...wrongRecords, ...existing];
    saveMistakeBank(nextBank);
    setMistakeBankCount(nextBank.length);
    savePracticeAttempt({
      id: `${skillId}-${topic.id}-${Date.now()}`,
      skillId,
      topicId: topic.id,
      topicTitle: topic.title,
      score,
      total: questions.length,
      weakestLevel: weakestLevel.level,
      completedAt: new Date().toISOString(),
    });
    setSubmitted(true);
  };

  return (
    <PageContainer>
      <div className="mx-auto max-w-6xl px-5 pb-28 md:px-0 md:pb-8">
        <div className="overflow-hidden rounded-[10px] border border-[#CBD5E1] bg-white shadow-sm">
          <div className="bg-[#F8FAFC] px-5 py-4 md:px-8">
          <div className="mb-5 text-xs font-semibold text-gray-500">
            Latihan Soal <span className="mx-1">/</span> {quizLabel} <span className="mx-1">/</span>{' '}
            <span className="font-black text-[#2563EB]">{topic.title}</span>
          </div>

          <div className="flex items-start gap-3">
            <motion.button
              type="button"
              onClick={() => navigate(resolvedBackPath, { replace: true })}
              className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gray-100 bg-white shadow-sm transition hover:bg-gray-50"
              whileTap={{ scale: 0.92 }}
            >
              <ArrowLeft size={17} />
            </motion.button>
            <div className="flex-1">
              <div className="inline-flex rounded bg-[#EEF2FF] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-[#2563EB]">
                30 multiple choice questions
              </div>
              <h1 className="mt-3 text-[24px] font-black leading-tight text-[#0F172A]">Latihan Soal: {quizLabel} ({topic.title})</h1>
              <p className="mt-1 max-w-2xl text-sm font-semibold leading-relaxed text-gray-500">
                Kerjakan campuran soal Basic, Intermediate, dan Advanced. Pilih satu jawaban paling tepat untuk setiap nomor.
              </p>
            </div>
            <div className="h-9 w-9 shrink-0" />
          </div>
          </div>

          <div className="px-5 py-6 md:px-8">
          {introContent?.(topic)}

          <div className="mb-5 grid gap-3 md:grid-cols-4">
            {[
              { label: 'Total Soal', value: '30', icon: ClipboardList, color: '#2563EB', bg: '#DBEAFE' },
              { label: 'Terjawab', value: `${answeredCount}/30`, icon: Target, color: '#0F766E', bg: '#CCFBF1' },
              { label: 'Progress', value: `${progressPercent}%`, icon: CheckCircle2, color: '#7C3AED', bg: '#EDE9FE' },
              { label: 'Skor', value: submitted ? `${score}/30` : '-', icon: Award, color: '#F59E0B', bg: '#FEF3C7' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="rounded-[8px] border border-[#CBD5E1] bg-white px-4 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.12em] text-gray-400">{item.label}</p>
                      <p className="mt-1 text-lg font-black text-[#0F172A]">{item.value}</p>
                    </div>
                    <div className="grid h-9 w-9 place-items-center rounded-[8px]" style={{ backgroundColor: item.bg, color: item.color }}>
                      <Icon size={17} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mb-6 rounded-[8px] border border-[#CBD5E1] bg-white p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-sm font-black text-[#0F172A]">Question Navigator</p>
              <p className="text-xs font-bold text-gray-500">{answeredCount} of 30 answered</p>
            </div>
            <div className="mb-4 h-2 overflow-hidden rounded-full bg-gray-100">
              <motion.div
                className="h-full rounded-full bg-[#2563EB]"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.35 }}
              />
            </div>
            <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(32px, 1fr))' }}>
              {questions.map((question, index) => {
                const answered = Boolean(answers[question.id]);
                const correct = answers[question.id] === question.answer;

                return (
                  <button
                    key={question.id}
                    type="button"
                    onClick={() => scrollToQuestion(question.id)}
                    className={`h-8 rounded-[6px] border text-xs font-black transition ${
                      submitted
                        ? correct
                          ? 'border-[#10B981] bg-[#ECFDF5] text-[#047857]'
                          : 'border-[#EF4444] bg-[#FEF2F2] text-[#DC2626]'
                        : answered
                          ? 'border-[#2563EB] bg-[#DBEAFE] text-[#1D4ED8]'
                          : 'border-[#CBD5E1] bg-white text-gray-400 hover:border-[#2563EB]'
                    }`}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mb-7 grid gap-3 md:grid-cols-3">
            {levelStats.map((stat) => (
              <div key={stat.level} className="rounded-[8px] border border-[#CBD5E1] bg-[#F8FAFC] p-4">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <p className="text-sm font-black text-[#0F172A]">{stat.level}</p>
                  <span className="text-xs font-black text-gray-500">
                    {submitted ? `${stat.correct}/${stat.total}` : `${stat.answered}/${stat.total}`}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white">
                  <motion.div
                    className="h-full rounded-full bg-[#2563EB]"
                    initial={{ width: 0 }}
                    animate={{ width: `${(stat.answered / stat.total) * 100}%` }}
                    transition={{ duration: 0.35 }}
                  />
                </div>
              </div>
            ))}
          </div>

          {(['Basic', 'Intermediate', 'Advanced'] as QuizLevel[]).map((level) => (
            <section key={level} className="mb-8 rounded-[10px] border border-[#CBD5E1] bg-white p-4">
              <div className="flex flex-col gap-2 border-b-2 border-[#2563EB] pb-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-base font-black text-[#0F172A]">{level} Level</h2>
                <span className="text-xs font-bold text-gray-500">
                  {questions.filter((question) => question.level === level && answers[question.id]).length}/10 answered
                </span>
              </div>

              <div className="mt-4 space-y-5">
                {questions
                  .filter((question) => question.level === level)
                  .map((question) => {
                    const selected = answers[question.id];
                    const correct = selected === question.answer;

                    return (
                      <div
                        key={question.id}
                        id={question.id}
                        className={`scroll-mt-24 rounded-[8px] border p-4 transition ${
                          submitted
                            ? correct
                              ? 'border-[#BBF7D0] bg-[#F0FDF4]'
                              : 'border-[#FECACA] bg-[#FFFBFB]'
                            : selected
                              ? 'border-[#BFDBFE] bg-[#F8FAFC]'
                              : 'border-gray-100 bg-white'
                        }`}
                      >
                        <div className="mb-2 flex items-start justify-between gap-3">
                          <div className="flex min-w-0 gap-3">
                            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#EEF2FF] text-xs font-black text-[#2563EB]">
                              {questions.findIndex((item) => item.id === question.id) + 1}
                            </span>
                            <p className="pt-1 text-sm font-black leading-relaxed text-[#0F172A]">{question.prompt}</p>
                          </div>
                          {submitted && (
                            <span className={`inline-flex shrink-0 items-center gap-1 text-xs font-black ${correct ? 'text-[#047857]' : 'text-[#DC2626]'}`}>
                              {correct ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                              {correct ? 'Benar' : 'Salah'}
                            </span>
                          )}
                        </div>

                        <div className="space-y-2">
                          {question.options.map((option, optionIndex) => {
                            const optionLabel = String.fromCharCode(65 + optionIndex);
                            const isSelected = selected === option;
                            const showCorrect = submitted && option === question.answer;
                            const showWrong = submitted && isSelected && option !== question.answer;

                            return (
                              <label
                                key={option}
                                className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-[6px] border px-3 py-2 text-sm font-semibold transition ${
                                  showCorrect
                                    ? 'border-[#10B981] bg-[#ECFDF5] text-[#065F46]'
                                    : showWrong
                                      ? 'border-[#EF4444] bg-[#FEF2F2] text-[#991B1B]'
                                      : isSelected
                                        ? 'border-[#2563EB] bg-[#EFF6FF] text-[#1D4ED8]'
                                        : 'border-[#CBD5E1] bg-white text-[#0F172A] hover:border-[#2563EB]'
                                }`}
                              >
                                <input
                                  type="radio"
                                  name={question.id}
                                  checked={isSelected}
                                  disabled={submitted}
                                  onChange={() => setAnswers((current) => ({ ...current, [question.id]: option }))}
                                  className="h-3.5 w-3.5"
                                />
                                <span>{optionLabel}. {option}</span>
                              </label>
                            );
                          })}
                        </div>

                        {submitted && (
                          <div className="mt-3 rounded-[6px] border border-[#CBD5E1] bg-white px-3 py-2">
                            <p className="text-[10px] font-black uppercase tracking-[0.12em] text-gray-400">Pembahasan</p>
                            <p className="mt-1 text-xs font-semibold leading-relaxed text-gray-600">
                              {buildQuestionExplanation(question, selected)}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </section>
          ))}

          {submitted && (
            <div className="mb-5 space-y-4">
              <div className="rounded-[10px] border border-[#CBD5E1] bg-[#F8FAFC] p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.12em] text-gray-400">Hasil Akhir</p>
                    <p className="mt-1 text-2xl font-black text-[#0F172A]">{score}/30 benar</p>
                    <p className="mt-2 text-sm font-semibold text-gray-600">{recommendation}</p>
                  </div>
                  <div className="rounded-[8px] bg-white px-4 py-3 text-sm font-black text-[#2563EB]">
                    Nilai: {Math.round((score / questions.length) * 100)}
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-[10px] border border-[#CBD5E1] bg-white p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.12em] text-gray-400">Mistake Bank</p>
                      <p className="mt-1 text-lg font-black text-[#0F172A]">{mistakeBankCount} soal tersimpan</p>
                    </div>
                    <div className="grid h-10 w-10 place-items-center rounded-[8px] bg-[#FEF2F2] text-[#DC2626]">
                      <XCircle size={18} />
                    </div>
                  </div>
                  <p className="mt-3 text-xs font-semibold leading-relaxed text-gray-500">
                    Soal yang salah otomatis disimpan di perangkat ini, jadi nanti bisa dibuat mode Review Mistakes.
                  </p>
                </div>

                <div className="rounded-[10px] border border-[#CBD5E1] bg-white p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.12em] text-gray-400">Adaptive Focus</p>
                  <p className="mt-1 text-lg font-black text-[#0F172A]">{weakestLevel.level}</p>
                  <p className="mt-3 text-xs font-semibold leading-relaxed text-gray-500">
                    Level terlemahmu di topik ini adalah {weakestLevel.level} dengan skor {weakestLevel.correct}/{weakestLevel.total}. Prioritaskan level ini sebelum lanjut.
                  </p>
                </div>
              </div>

              {wrongQuestions.length > 0 && (
                <div className="rounded-[10px] border border-[#CBD5E1] bg-white p-4">
                  <div className="mb-3 flex flex-col gap-1 border-b border-gray-100 pb-3">
                    <h3 className="text-base font-black text-[#0F172A]">Review Soal Salah</h3>
                    <p className="text-xs font-semibold text-gray-500">Mulai dari daftar ini saat mengulang topik.</p>
                  </div>
                  <div className="grid gap-2 md:grid-cols-2">
                    {wrongQuestions.slice(0, 8).map((question) => (
                      <button
                        key={`review-${question.id}`}
                        type="button"
                        onClick={() => scrollToQuestion(question.id)}
                        className="rounded-[6px] border border-[#FECACA] bg-[#FFFBFB] px-3 py-2 text-left transition hover:border-[#EF4444]"
                      >
                        <span className="text-[10px] font-black uppercase tracking-[0.12em] text-[#DC2626]">{question.level}</span>
                        <span className="mt-1 line-clamp-2 block text-xs font-black leading-relaxed text-[#0F172A]">{question.prompt}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="sticky bottom-0 -mx-5 flex flex-col gap-3 border-t border-gray-100 bg-white/95 px-5 py-4 backdrop-blur sm:flex-row sm:items-center sm:justify-between md:-mx-8 md:px-8">
            <button
              type="button"
              onClick={reset}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-[4px] border border-[#CBD5E1] px-5 text-sm font-black text-[#0F172A] transition hover:bg-gray-50"
            >
              <RotateCcw size={16} />
              Reset Jawaban
            </button>
            <button
              type="button"
              onClick={submitQuiz}
              className="inline-flex h-11 items-center justify-center rounded-[4px] bg-[#2563EB] px-6 text-sm font-black text-white transition hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:opacity-50"
              disabled={answeredCount < questions.length}
            >
              {answeredCount < questions.length ? `Jawab ${questions.length - answeredCount} soal lagi` : 'Submit Jawaban'}
            </button>
          </div>
        </div>
      </div>
      </div>
    </PageContainer>
  );
}
