import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Headphones, Play, RotateCcw, Target, Volume2, XCircle } from 'lucide-react';
import PageContainer from '../../../components/layout/PageContainer';
import { playAudio, stopCurrentAudio } from '../../../services/ttsService';
import type { QuizLevel } from './PracticeQuizPage';

export type ListeningLine = {
  speaker: string;
  text: string;
  note: string;
};

export type ListeningTopicMaterial = {
  id: string;
  title: string;
  description: string;
  topicNumber: number;
  level: string;
  accent: string;
  goal: string;
  lines: ListeningLine[];
  focus: string[];
};

export type ListeningQuestion = {
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

function buildQuestionExplanation(question: ListeningQuestion, selected?: string) {
  if (selected === question.answer) {
    return `Jawaban benar karena "${question.answer}" paling sesuai dengan instruksi soal.`;
  }

  return `Jawaban yang tepat adalah "${question.answer}". Pilihanmu "${selected || '-'}" belum sesuai dengan konteks soal, jadi ulangi pola pada pertanyaan ini saat review.`;
}

export function ListeningPracticePage({
  topic,
  questions,
  backPath = '/latihan/english/listening',
}: {
  topic: ListeningTopicMaterial;
  questions: ListeningQuestion[];
  backPath?: string;
}) {
  const navigate = useNavigate();
  const [activeLine, setActiveLine] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [mistakeBankCount, setMistakeBankCount] = useState(() => loadMistakeBank().length);

  const script = topic.lines.map((line) => `${line.speaker}: ${line.text}`).join('\n');
  const answeredCount = Object.keys(answers).length;
  const score = questions.reduce((total, question) => total + (answers[question.id] === question.answer ? 1 : 0), 0);
  const wrongQuestions = questions.filter((question) => answers[question.id] && answers[question.id] !== question.answer);
  const listeningLevelStats = (['Basic', 'Intermediate', 'Advanced'] as QuizLevel[]).map((level) => {
    const levelQuestions = questions.filter((question) => question.level === level);
    const correct = levelQuestions.filter((question) => answers[question.id] === question.answer).length;
    return { level, correct, total: Math.max(1, levelQuestions.length) };
  });
  const weakestListeningLevel = listeningLevelStats.reduce((weakest, stat) => {
    const statRate = stat.correct / stat.total;
    const weakestRate = weakest.correct / weakest.total;
    return statRate < weakestRate ? stat : weakest;
  }, listeningLevelStats[0]);
  const listeningRecommendation = score >= Math.ceil(questions.length * 0.85)
    ? 'Bagus. Lanjut ke topic listening berikutnya atau ulangi conversation tanpa membaca script.'
    : score >= Math.ceil(questions.length * 0.6)
      ? 'Dengarkan ulang conversation, lalu fokus ke baris yang menjadi dasar soal salah.'
      : 'Ulangi Listen First 2 kali sebelum membaca script, lalu kerjakan quiz lagi.';

  const playFullConversation = () => {
    setActiveLine(null);
    playAudio(script, 0.92);
  };

  const playLine = (index: number) => {
    setActiveLine(index);
    playAudio(topic.lines[index].text, 0.92);
  };

  const submitListeningQuiz = () => {
    const wrongRecords: MistakeRecord[] = wrongQuestions.map((question) => ({
      id: `listening-${topic.id}-${question.id}`,
      skillId: 'listening',
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
      id: `listening-${topic.id}-${Date.now()}`,
      skillId: 'listening',
      topicId: topic.id,
      topicTitle: topic.title,
      score,
      total: questions.length,
      weakestLevel: weakestListeningLevel.level,
      completedAt: new Date().toISOString(),
    });
    setSubmitted(true);
  };

  return (
    <PageContainer>
      <div className="mx-auto max-w-5xl px-5 pb-28 md:px-0 md:pb-8">
        <div className="overflow-hidden rounded-[10px] border border-[#CBD5E1] bg-white shadow-sm">
          <div className="bg-[#F8FAFC] px-5 py-5 md:px-8">
            <div className="mb-5 flex items-start gap-3">
              <motion.button
                type="button"
                onClick={() => navigate(backPath, { replace: true })}
                className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gray-100 bg-white shadow-sm transition hover:bg-gray-50"
                whileTap={{ scale: 0.92 }}
              >
                <ArrowLeft size={17} />
              </motion.button>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex rounded bg-[#E0F2FE] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-[#0891B2]">
                    Native AI Conversation
                  </span>
                  <span className="inline-flex rounded bg-white px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-gray-500">
                    {topic.level}
                  </span>
                </div>
                <h1 className="mt-3 text-[24px] font-black leading-tight text-[#0F172A]">{topic.title}</h1>
                <p className="mt-1 max-w-2xl text-sm font-semibold leading-relaxed text-gray-500">{topic.goal}</p>
              </div>
              <div className="h-9 w-9 shrink-0" />
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {[
                { label: 'Conversation', value: `${topic.lines.length} lines`, icon: Headphones },
                { label: 'Accent', value: topic.accent, icon: Volume2 },
                { label: 'Focus', value: `${topic.focus.length} chunks`, icon: Target },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="rounded-[8px] border border-[#CBD5E1] bg-white px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="grid h-9 w-9 place-items-center rounded-[8px] bg-[#E0F2FE] text-[#0891B2]">
                        <Icon size={17} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] font-black uppercase tracking-[0.12em] text-gray-400">{item.label}</p>
                        <p className="mt-0.5 truncate text-sm font-black text-[#0F172A]">{item.value}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="px-5 py-6 md:px-8">
            <div className="mb-5 flex flex-col gap-3 rounded-[10px] border border-[#CBD5E1] bg-[#F8FAFC] p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-black text-[#0F172A]">Listen First</p>
                <p className="mt-1 text-xs font-semibold text-gray-500">Dengarkan full conversation 1-2 kali sebelum membaca detail per baris.</p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  onClick={playFullConversation}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-[4px] bg-[#0891B2] px-4 text-sm font-black text-white transition hover:bg-[#0E7490]"
                >
                  <Play size={16} fill="currentColor" />
                  Play Conversation
                </button>
                <button
                  type="button"
                  onClick={stopCurrentAudio}
                  className="inline-flex h-10 items-center justify-center rounded-[4px] border border-[#CBD5E1] px-4 text-sm font-black text-[#0F172A] transition hover:bg-white"
                >
                  Stop
                </button>
              </div>
            </div>

            <section className="mb-6 rounded-[10px] border border-[#CBD5E1] bg-white p-4">
              <div className="mb-4 flex flex-col gap-1 border-b-2 border-[#0891B2] pb-3">
                <h2 className="text-base font-black text-[#0F172A]">Conversation Script</h2>
                <p className="text-xs font-semibold text-gray-500">Klik tiap baris untuk mendengar ulang bagian pendek.</p>
              </div>

              <div className="space-y-3">
                {topic.lines.map((line, index) => (
                  <div
                    key={`${line.speaker}-${index}`}
                    className={`rounded-[8px] border p-4 transition ${activeLine === index ? 'border-[#0891B2] bg-[#ECFEFF]' : 'border-gray-100 bg-white'}`}
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <p className="text-[10px] font-black uppercase tracking-[0.12em] text-[#0891B2]">{line.speaker}</p>
                        <p className="mt-1 text-sm font-black leading-relaxed text-[#0F172A]">{line.text}</p>
                        <p className="mt-2 text-xs font-semibold text-gray-500">{line.note}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => playLine(index)}
                        className="inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-[4px] border border-[#CBD5E1] px-3 text-xs font-black text-[#0F172A] transition hover:border-[#0891B2] hover:text-[#0891B2]"
                      >
                        <Volume2 size={15} />
                        Listen
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div className="grid gap-4 md:grid-cols-2">
              <section className="rounded-[10px] border border-[#CBD5E1] bg-[#F8FAFC] p-4">
                <h2 className="text-base font-black text-[#0F172A]">Focus Chunks</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {topic.focus.map((chunk) => (
                    <button
                      key={chunk}
                      type="button"
                      onClick={() => playAudio(chunk, 0.86)}
                      className="rounded-full border border-[#BAE6FD] bg-white px-3 py-1.5 text-xs font-black text-[#0E7490] transition hover:bg-[#ECFEFF]"
                    >
                      {chunk}
                    </button>
                  ))}
                </div>
              </section>

              <section className="rounded-[10px] border border-[#CBD5E1] bg-white p-4">
                <h2 className="text-base font-black text-[#0F172A]">Shadowing Drill</h2>
                <div className="mt-3 space-y-2 text-sm font-semibold text-gray-600">
                  <p>1. Listen without reading.</p>
                  <p>2. Listen again and mark words you missed.</p>
                  <p>3. Play each line, pause, then repeat with the same rhythm.</p>
                  <p>4. Play full conversation and shadow at native speed.</p>
                </div>
              </section>
            </div>

            <section className="mt-6 rounded-[10px] border border-[#CBD5E1] bg-white p-4">
              <div className="mb-4 flex flex-col gap-3 border-b-2 border-[#0891B2] pb-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-base font-black text-[#0F172A]">Listening Quiz</h2>
                  <p className="mt-1 text-xs font-semibold text-gray-500">Jawab pilihan ganda berdasarkan conversation yang kamu dengar.</p>
                </div>
                <span className="rounded bg-[#E0F2FE] px-2.5 py-1 text-xs font-black text-[#0E7490]">
                  {answeredCount}/{questions.length} answered
                </span>
              </div>

              <div className="space-y-4">
                {questions.map((question, index) => {
                  const selected = answers[question.id];
                  const correct = selected === question.answer;

                  return (
                    <div
                      key={question.id}
                      className={`rounded-[8px] border p-4 transition ${
                        submitted
                          ? correct
                            ? 'border-[#BBF7D0] bg-[#F0FDF4]'
                            : 'border-[#FECACA] bg-[#FFFBFB]'
                          : selected
                            ? 'border-[#BAE6FD] bg-[#F8FAFC]'
                            : 'border-gray-100 bg-white'
                      }`}
                    >
                      <div className="mb-3 flex items-start justify-between gap-3">
                        <div className="flex min-w-0 gap-3">
                          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#E0F2FE] text-xs font-black text-[#0891B2]">
                            {index + 1}
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

                      <div className="grid gap-2">
                        {question.options.map((option, optionIndex) => {
                          const optionLabel = String.fromCharCode(65 + optionIndex);
                          const isSelected = selected === option;
                          const showCorrect = submitted && option === question.answer;
                          const showWrong = submitted && isSelected && option !== question.answer;

                          return (
                            <label
                              key={`${question.id}-${option}`}
                              className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-[6px] border px-3 py-2 text-sm font-semibold transition ${
                                showCorrect
                                  ? 'border-[#10B981] bg-[#ECFDF5] text-[#065F46]'
                                  : showWrong
                                    ? 'border-[#EF4444] bg-[#FEF2F2] text-[#991B1B]'
                                    : isSelected
                                      ? 'border-[#0891B2] bg-[#ECFEFF] text-[#0E7490]'
                                      : 'border-[#CBD5E1] bg-white text-[#0F172A] hover:border-[#0891B2]'
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

              {submitted && (
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <div className="rounded-[8px] border border-[#CBD5E1] bg-[#F8FAFC] px-4 py-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.12em] text-gray-400">Hasil Listening</p>
                    <p className="mt-1 text-xl font-black text-[#0F172A]">{score}/{questions.length} benar</p>
                    <p className="mt-2 text-xs font-semibold leading-relaxed text-gray-600">{listeningRecommendation}</p>
                  </div>
                  <div className="rounded-[8px] border border-[#CBD5E1] bg-white px-4 py-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.12em] text-gray-400">Mistake Bank</p>
                    <p className="mt-1 text-xl font-black text-[#0F172A]">{mistakeBankCount} soal tersimpan</p>
                    <p className="mt-2 text-xs font-semibold leading-relaxed text-gray-500">{wrongQuestions.length} soal listening dari topic ini masuk review.</p>
                  </div>
                </div>
              )}

              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setAnswers({});
                    setSubmitted(false);
                  }}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-[4px] border border-[#CBD5E1] px-4 text-sm font-black text-[#0F172A] transition hover:bg-gray-50"
                >
                  <RotateCcw size={16} />
                  Reset Quiz
                </button>
                <button
                  type="button"
                  onClick={submitListeningQuiz}
                  className="inline-flex h-10 items-center justify-center rounded-[4px] bg-[#0891B2] px-5 text-sm font-black text-white transition hover:bg-[#0E7490] disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={answeredCount < questions.length}
                >
                  {answeredCount < questions.length ? `Jawab ${questions.length - answeredCount} soal lagi` : 'Submit Quiz'}
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
