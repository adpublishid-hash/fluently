import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Award, BookOpen, CheckCircle2, ClipboardList, RotateCcw, Target, Volume2 } from 'lucide-react';
import PageContainer from '../../../components/layout/PageContainer';

type QuizLevel = 'Basic' | 'Intermediate' | 'Advanced';

export type MandarinCihuiDrill = {
  id: string;
  title: string;
  category: string;
  hanzi: string;
  pinyin: string;
  meaning: string;
  prompt: string;
  answer: string;
  exampleSentence: string;
  examplePinyin: string;
  exampleMeaning: string;
  hint: string;
  usage: string;
};

export type MandarinCihuiTopicMaterial = {
  id: string;
  title: string;
  description: string;
  topicNumber: number;
  focus: string;
  goal: string;
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

const practiceHistoryKey = 'fluently-practice-history-v1';

function loadPracticeHistory(): PracticeAttempt[] {
  if (typeof window === 'undefined') return [];

  try {
    const raw = window.localStorage.getItem(practiceHistoryKey);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function savePracticeAttempt(attempt: PracticeAttempt) {
  if (typeof window === 'undefined') return;
  const nextHistory = [attempt, ...loadPracticeHistory()].slice(0, 200);
  window.localStorage.setItem(practiceHistoryKey, JSON.stringify(nextHistory));
}

function makeId(prefix: string) {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}`;
}

function speakMandarinText(text: string, slow = false) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'zh-CN';
  utterance.rate = slow ? 0.58 : 0.78;
  window.speechSynthesis.speak(utterance);
}

export function MandarinCihuiPracticePage({
  material,
  drills,
}: {
  material: MandarinCihuiTopicMaterial;
  drills: MandarinCihuiDrill[];
}) {
  const navigate = useNavigate();
  const [drillIndex, setDrillIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [draftAnswer, setDraftAnswer] = useState('');
  const [rememberedCount, setRememberedCount] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [playCount, setPlayCount] = useState(0);
  const [lastScore, setLastScore] = useState(() => {
    const latest = loadPracticeHistory().find((attempt) => attempt.topicId === material.id);
    return latest ? Math.round((latest.score / Math.max(1, latest.total)) * 100) : 0;
  });
  const [sessionScore, setSessionScore] = useState<number | null>(null);

  const activeDrill = drills[drillIndex % drills.length];
  const progress = Math.round((answeredCount / Math.max(1, drills.length)) * 100);
  const currentNumber = Math.min(answeredCount + 1, drills.length);
  const categorySummary = useMemo(() => Array.from(new Set(drills.map((drill) => drill.category))), [drills]);

  const resetSession = () => {
    setDrillIndex(0);
    setRevealed(false);
    setDraftAnswer('');
    setRememberedCount(0);
    setAnsweredCount(0);
    setPlayCount(0);
    setSessionScore(null);
  };

  const playWord = (slow = false) => {
    setPlayCount((current) => current + 1);
    speakMandarinText(activeDrill.hanzi, slow);
  };

  const playExample = () => {
    setPlayCount((current) => current + 1);
    speakMandarinText(activeDrill.exampleSentence);
  };

  const completeCard = (remembered: boolean) => {
    const nextAnswered = answeredCount + 1;
    const nextRemembered = rememberedCount + (remembered ? 1 : 0);

    if (nextAnswered >= drills.length) {
      const finalScore = Math.round((nextRemembered / Math.max(1, drills.length)) * 100);
      savePracticeAttempt({
        id: makeId(material.id),
        skillId: 'cihui',
        topicId: material.id,
        topicTitle: material.title,
        score: nextRemembered,
        total: drills.length,
        weakestLevel: finalScore >= 80 ? 'Advanced' : finalScore >= 55 ? 'Intermediate' : 'Basic',
        completedAt: new Date().toISOString(),
      });
      setLastScore(finalScore);
      setSessionScore(finalScore);
      setDrillIndex(0);
      setRevealed(false);
      setDraftAnswer('');
      setRememberedCount(0);
      setAnsweredCount(0);
      setPlayCount(0);
      return;
    }

    setRememberedCount(nextRemembered);
    setAnsweredCount(nextAnswered);
    setDrillIndex((current) => current + 1);
    setRevealed(false);
    setDraftAnswer('');
    setPlayCount(0);
  };

  return (
    <PageContainer>
      <div className="mx-auto max-w-6xl px-5 pb-28 md:px-0 md:pb-8">
        <motion.section
          className="overflow-hidden rounded-[26px] border border-amber-100 bg-white shadow-sm"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-5 md:p-7">
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  onClick={() => navigate('/latihan/mandarin/cihui')}
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-amber-100 bg-white text-slate-600 shadow-sm transition hover:bg-amber-50"
                  aria-label="Kembali"
                >
                  <ArrowLeft size={18} />
                </button>
                <div className="min-w-0">
                  <span className="inline-flex rounded-full bg-amber-50 px-3 py-1 text-[10px] font-black uppercase text-[#CA8A04]">
                    Latihan Mandarin Cíhuì
                  </span>
                  <h1 className="mt-3 text-3xl font-black leading-tight text-[#0F172A] sm:text-4xl">{material.title}</h1>
                  <p className="mt-2 max-w-2xl text-sm font-semibold leading-relaxed text-slate-500">{material.description}</p>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  { label: 'Kata', value: drills.length, icon: BookOpen, color: '#CA8A04', bg: '#FEF3C7' },
                  { label: 'Selesai', value: `${answeredCount}/${drills.length}`, icon: Target, color: '#16A34A', bg: '#DCFCE7' },
                  { label: 'Best', value: `${lastScore}%`, icon: Award, color: '#DC2626', bg: '#FEE2E2' },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-[10px] font-black uppercase text-slate-400">{item.label}</p>
                          <p className="mt-1 text-lg font-black text-[#0F172A]">{item.value}</p>
                        </div>
                        <div className="grid h-10 w-10 place-items-center rounded-2xl" style={{ backgroundColor: item.bg, color: item.color }}>
                          <Icon size={18} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {categorySummary.map((category) => (
                  <span key={category} className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-black text-[#CA8A04]">
                    {category}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative min-h-[250px] bg-[#FFFBEB] p-6">
              <div className="absolute inset-6 rounded-[24px] border border-white/80 bg-white/75 shadow-sm" />
              <div className="relative z-10 flex h-full min-h-[220px] flex-col justify-between">
                <div className="rounded-2xl border border-amber-100 bg-white/90 p-5 shadow-sm">
                  <p className="text-[10px] font-black uppercase text-[#CA8A04]">Current Cíhuì</p>
                  <p lang="zh-CN" className="mt-4 text-6xl font-black leading-none text-[#0F172A]">{activeDrill.hanzi}</p>
                  <p className="mt-4 text-xl font-black text-[#CA8A04]">{activeDrill.pinyin}</p>
                  <p className="mt-1 text-xs font-semibold leading-relaxed text-slate-500">{activeDrill.category}</p>
                </div>
                <div className="mt-4 overflow-hidden rounded-full bg-white">
                  <div className="h-2 rounded-full bg-[#CA8A04] transition-all" style={{ width: `${progress}%` }} />
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <section className="mt-6 overflow-hidden rounded-[26px] border border-amber-100 bg-white shadow-sm">
          <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-5 md:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase text-[#CA8A04]">
                    Drill {currentNumber}/{drills.length}
                  </p>
                  <h2 className="mt-1 text-xl font-black text-[#0F172A]">{activeDrill.title}</h2>
                  <p className="mt-1 text-xs font-semibold leading-relaxed text-slate-500">{material.goal}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => playWord(false)}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#CA8A04] px-5 text-sm font-black text-white transition hover:bg-[#A16207]"
                  >
                    <Volume2 size={17} />
                    Kata
                  </button>
                  <button
                    type="button"
                    onClick={() => playWord(true)}
                    className="inline-flex h-11 items-center justify-center rounded-full border border-amber-100 bg-white px-5 text-sm font-black text-[#CA8A04] transition hover:bg-amber-50"
                  >
                    Pelan
                  </button>
                  <button
                    type="button"
                    onClick={playExample}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-amber-100 bg-white px-5 text-sm font-black text-[#CA8A04] transition hover:bg-amber-50"
                  >
                    <ClipboardList size={17} />
                    Contoh
                  </button>
                </div>
              </div>

              <div className="mt-5 rounded-3xl bg-slate-50 p-4">
                <p className="text-xs font-black uppercase text-slate-400">Prompt</p>
                <p className="mt-2 text-sm font-bold leading-relaxed text-[#0F172A]">{activeDrill.prompt}</p>
                <textarea
                  value={draftAnswer}
                  onChange={(event) => setDraftAnswer(event.target.value)}
                  rows={4}
                  className="mt-4 w-full resize-none rounded-2xl border border-slate-200 bg-white p-4 text-sm font-semibold text-slate-700 outline-none transition focus:border-amber-300 focus:ring-2 focus:ring-amber-100"
                  placeholder="Tulis arti, pinyin, atau contoh kalimat singkat..."
                />
                <p className="mt-2 text-xs font-semibold text-slate-500">{activeDrill.hint}</p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setRevealed(true)}
                  className="inline-flex h-11 items-center justify-center rounded-full border border-amber-100 bg-white px-5 text-sm font-black text-[#CA8A04] transition hover:bg-amber-50"
                >
                  Lihat Jawaban
                </button>
                <button
                  type="button"
                  onClick={() => completeCard(true)}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#16A34A] px-5 text-sm font-black text-white transition hover:bg-[#15803D]"
                >
                  <CheckCircle2 size={17} />
                  Saya Ingat
                </button>
                <button
                  type="button"
                  onClick={() => completeCard(false)}
                  className="inline-flex h-11 items-center justify-center rounded-full bg-slate-100 px-5 text-sm font-black text-slate-600 transition hover:bg-slate-200"
                >
                  Ulangi Nanti
                </button>
              </div>
            </div>

            <div className="border-t border-amber-100 bg-[#FFFBEB] p-5 md:p-6 lg:border-l lg:border-t-0">
              <div className="rounded-3xl border border-amber-100 bg-white p-5 shadow-sm">
                <p className="text-[10px] font-black uppercase text-[#CA8A04]">Answer Bank</p>
                <div className="mt-4 space-y-4">
                  <div>
                    <p className="text-xs font-black uppercase text-slate-400">Arti</p>
                    <p className="mt-1 text-lg font-black text-[#0F172A]">{revealed ? activeDrill.answer : '••••••'}</p>
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase text-slate-400">Contoh</p>
                    <p lang="zh-CN" className="mt-1 text-2xl font-black text-[#0F172A]">{revealed ? activeDrill.exampleSentence : activeDrill.hanzi}</p>
                    <p className="mt-1 text-sm font-black text-[#CA8A04]">{revealed ? activeDrill.examplePinyin : activeDrill.pinyin}</p>
                    <p className="mt-1 text-xs font-semibold leading-relaxed text-slate-500">{revealed ? activeDrill.exampleMeaning : 'Dengarkan dulu, lalu cek arti dan konteksnya.'}</p>
                  </div>
                  <div className="rounded-2xl bg-amber-50 p-4">
                    <p className="text-xs font-black uppercase text-[#CA8A04]">Usage</p>
                    <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-600">
                      {revealed ? activeDrill.usage : 'Gunakan tombol Lihat Jawaban setelah mencoba recall.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-3xl border border-slate-100 bg-white p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-400">Session</p>
                    <p className="mt-1 text-sm font-bold text-slate-600">Audio diputar {playCount} kali.</p>
                  </div>
                  <button
                    type="button"
                    onClick={resetSession}
                    className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"
                    aria-label="Reset latihan"
                  >
                    <RotateCcw size={17} />
                  </button>
                </div>
                {sessionScore !== null && (
                  <div className="mt-4 rounded-2xl bg-green-50 p-4 text-sm font-bold text-green-700">
                    Sesi selesai. Skor recall kamu {sessionScore}%.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageContainer>
  );
}
