import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Award, CheckCircle2, ClipboardList, PenLine, RotateCcw, Target, Volume2 } from 'lucide-react';
import PageContainer from '../../../components/layout/PageContainer';
import { arabicQuizBanks } from '../arabic/quiz';
import { ArabicTopicQuizPage } from './ArabicTopicQuizPage';

type QuizLevel = 'Basic' | 'Intermediate' | 'Advanced';

export type ArabicKitabahDrill = {
  id: string;
  title: string;
  modelText: string;
  transliteration: string;
  meaning: string;
  focus: string;
  prompt: string;
  answer: string;
  hint: string;
  checklist: string[];
};

export type ArabicKitabahTopicMaterial = {
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

function speakArabicText(text: string) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ar-SA';
  utterance.rate = 0.76;
  window.speechSynthesis.speak(utterance);
}

function ArabicKitabahDrillPage({
  material,
  drills,
}: {
  material: ArabicKitabahTopicMaterial;
  drills: ArabicKitabahDrill[];
}) {
  const navigate = useNavigate();
  const [drillIndex, setDrillIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [draftAnswer, setDraftAnswer] = useState('');
  const [goodCount, setGoodCount] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [listenCount, setListenCount] = useState(0);
  const [lastScore, setLastScore] = useState(() => {
    const latest = loadPracticeHistory().find((attempt) => attempt.topicId === material.id);
    return latest ? Math.round((latest.score / Math.max(1, latest.total)) * 100) : 0;
  });
  const [sessionScore, setSessionScore] = useState<number | null>(null);

  const activeDrill = drills[drillIndex % drills.length];
  const progress = Math.round((answeredCount / Math.max(1, drills.length)) * 100);
  const currentNumber = Math.min(answeredCount + 1, drills.length);
  const focusSummary = useMemo(() => Array.from(new Set(drills.map((drill) => drill.focus))), [drills]);

  const resetSession = () => {
    setDrillIndex(0);
    setRevealed(false);
    setDraftAnswer('');
    setGoodCount(0);
    setAnsweredCount(0);
    setListenCount(0);
    setSessionScore(null);
  };

  const playModel = () => {
    setListenCount((current) => current + 1);
    speakArabicText(activeDrill.modelText);
  };

  const completeCard = (good: boolean) => {
    const nextAnswered = answeredCount + 1;
    const nextGood = goodCount + (good ? 1 : 0);

    if (nextAnswered >= drills.length) {
      const finalScore = Math.round((nextGood / Math.max(1, drills.length)) * 100);
      savePracticeAttempt({
        id: makeId(material.id),
        skillId: 'kitabah',
        topicId: material.id,
        topicTitle: material.title,
        score: nextGood,
        total: drills.length,
        weakestLevel: finalScore >= 80 ? 'Advanced' : finalScore >= 55 ? 'Intermediate' : 'Basic',
        completedAt: new Date().toISOString(),
      });
      setLastScore(finalScore);
      setSessionScore(finalScore);
      setDrillIndex(0);
      setRevealed(false);
      setDraftAnswer('');
      setGoodCount(0);
      setAnsweredCount(0);
      setListenCount(0);
      return;
    }

    setGoodCount(nextGood);
    setAnsweredCount(nextAnswered);
    setDrillIndex((current) => current + 1);
    setRevealed(false);
    setDraftAnswer('');
    setListenCount(0);
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
                  onClick={() => navigate('/latihan/arabic/kitabah')}
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-amber-100 bg-white text-slate-600 shadow-sm transition hover:bg-amber-50"
                  aria-label="Kembali"
                >
                  <ArrowLeft size={18} />
                </button>
                <div className="min-w-0">
                  <span className="inline-flex rounded-full bg-amber-50 px-3 py-1 text-[10px] font-black uppercase text-[#D97706]">
                    Latihan Arabic Kitabah
                  </span>
                  <h1 className="mt-3 text-3xl font-black leading-tight text-[#0F172A] sm:text-4xl">{material.title}</h1>
                  <p className="mt-2 max-w-2xl text-sm font-semibold leading-relaxed text-slate-500">{material.description}</p>
                  {arabicQuizBanks.kitabah && (
                    <button
                      type="button"
                      onClick={() => navigate('?mode=kuis')}
                      className="mt-4 inline-flex h-10 items-center gap-2 rounded-full bg-[#2563EB] px-5 text-xs font-black text-white shadow-sm transition hover:bg-[#1D4ED8]"
                    >
                      Kerjakan Kuis 30 Soal
                    </button>
                  )}
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  { label: 'Tugas', value: drills.length, icon: PenLine, color: '#D97706', bg: '#FEF3C7' },
                  { label: 'Selesai', value: `${answeredCount}/${drills.length}`, icon: Target, color: '#0F766E', bg: '#CCFBF1' },
                  { label: 'Best', value: `${lastScore}%`, icon: Award, color: '#2563EB', bg: '#DBEAFE' },
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
                {focusSummary.map((focus) => (
                  <span key={focus} className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-black text-[#D97706]">
                    {focus}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative min-h-[250px] bg-[#FFFBEB] p-6">
              <div className="absolute inset-6 rounded-[24px] border border-white/80 bg-white/75 shadow-sm" />
              <div className="relative z-10 flex h-full min-h-[220px] flex-col justify-between">
                <div className="rounded-2xl border border-amber-100 bg-white/90 p-5 shadow-sm">
                  <p className="text-[10px] font-black uppercase text-[#D97706]">Writing Focus</p>
                  <div className="mt-5 grid h-24 w-24 place-items-center rounded-[24px] bg-amber-50 text-[#D97706]">
                    <PenLine size={42} />
                  </div>
                  <p className="mt-5 text-xl font-black text-[#0F172A]">{activeDrill.title}</p>
                  <p className="mt-1 text-xs font-semibold leading-relaxed text-slate-500">{material.focus}</p>
                </div>
                <div className="mt-4 overflow-hidden rounded-full bg-white">
                  <div className="h-2 rounded-full bg-[#D97706] transition-all" style={{ width: `${progress}%` }} />
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
                  <p className="text-[10px] font-black uppercase text-[#D97706]">
                    Latihan {currentNumber}/{drills.length}
                  </p>
                  <h2 className="mt-1 text-xl font-black text-[#0F172A]">{activeDrill.title}</h2>
                  <p className="mt-1 text-xs font-semibold leading-relaxed text-slate-500">{material.goal}</p>
                </div>
                <button
                  type="button"
                  onClick={playModel}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#D97706] px-5 text-sm font-black text-white transition hover:bg-[#B45309]"
                >
                  <Volume2 size={17} />
                  Model
                </button>
              </div>

              <div className="mt-5 rounded-[24px] border border-slate-100 bg-slate-50 p-5">
                <p className="text-sm font-black text-[#0F172A]">{activeDrill.prompt}</p>
                <p className="mt-2 text-xs font-semibold leading-relaxed text-slate-500">Hint: {activeDrill.hint}</p>

                <textarea
                  value={draftAnswer}
                  onChange={(event) => setDraftAnswer(event.target.value)}
                  rows={6}
                  dir="rtl"
                  lang="ar"
                  placeholder="اكتب إجابتك هنا..."
                  className="mt-4 w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-right text-xl font-black leading-loose text-[#0F172A] outline-none transition placeholder:text-slate-300 focus:border-[#D97706] focus:ring-2 focus:ring-amber-100"
                />

                {revealed && (
                  <motion.div
                    className="mt-4 rounded-2xl border border-amber-100 bg-white p-4"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <p className="text-[10px] font-black uppercase text-[#D97706]">Model Tulisan</p>
                    <p dir="rtl" lang="ar" className="mt-3 text-right text-3xl font-black leading-loose text-[#0F172A]">{activeDrill.answer}</p>
                    <p className="mt-2 text-sm font-black text-[#D97706]">{activeDrill.transliteration}</p>
                    <p className="mt-1 text-xs font-semibold leading-relaxed text-slate-500">{activeDrill.meaning}</p>
                  </motion.div>
                )}

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setRevealed(true)}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-amber-100 bg-white px-5 text-sm font-black text-[#D97706] transition hover:bg-amber-50"
                  >
                    <ClipboardList size={16} />
                    Cek Model
                  </button>
                  <button
                    type="button"
                    onClick={() => completeCard(true)}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#D97706] px-5 text-sm font-black text-white transition hover:bg-[#B45309]"
                  >
                    <CheckCircle2 size={16} />
                    Tulisan Rapi
                  </button>
                  <button
                    type="button"
                    onClick={() => completeCard(false)}
                    className="inline-flex h-11 items-center justify-center rounded-full border border-slate-200 bg-white px-5 text-sm font-black text-slate-600 transition hover:bg-slate-50"
                  >
                    Ulangi Nanti
                  </button>
                </div>
              </div>
            </div>

            <aside className="border-t border-amber-100 bg-[#FFFBEB] p-5 md:p-6 lg:border-l lg:border-t-0">
              <div className="rounded-[24px] border border-white/80 bg-white p-5 shadow-sm">
                <p className="text-[10px] font-black uppercase text-[#D97706]">Contoh</p>
                <p dir="rtl" lang="ar" className="mt-3 text-right text-4xl font-black leading-loose text-[#0F172A]">{activeDrill.modelText}</p>
                <p className="mt-3 text-sm font-black text-[#D97706]">{activeDrill.transliteration}</p>
                <p className="mt-1 text-xs font-semibold leading-relaxed text-slate-500">{activeDrill.meaning}</p>
              </div>

              <div className="mt-4 rounded-[24px] border border-white/80 bg-white p-5 shadow-sm">
                <p className="text-[10px] font-black uppercase text-[#D97706]">Checklist</p>
                <div className="mt-3 space-y-3">
                  {activeDrill.checklist.map((item, index) => (
                    <div key={item} className="flex gap-3 text-sm font-semibold leading-relaxed text-slate-600">
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-amber-50 text-xs font-black text-[#D97706]">{index + 1}</span>
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 rounded-[24px] border border-white/80 bg-white p-5 shadow-sm">
                <p className="text-[10px] font-black uppercase text-[#D97706]">Sesi</p>
                <div className="mt-3 grid gap-2 text-sm font-semibold text-slate-600">
                  <div className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3">
                    <span>Model didengar</span>
                    <span className="font-black text-[#0F172A]">{listenCount}x</span>
                  </div>
                  <div className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3">
                    <span>Skor sesi</span>
                    <span className="font-black text-[#0F172A]">{sessionScore === null ? '-' : `${sessionScore}%`}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={resetSession}
                  className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-amber-100 bg-amber-50 text-sm font-black text-[#D97706] transition hover:bg-amber-100"
                >
                  <RotateCcw size={16} />
                  Reset Sesi
                </button>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </PageContainer>
  );
}

/** Flashcard drills by default; `?mode=kuis` opens the topic's scored multiple-choice quiz. */
export function ArabicKitabahPracticePage(props: Parameters<typeof ArabicKitabahDrillPage>[0]) {
  const [params] = useSearchParams();
  if (params.get('mode') === 'kuis') return <ArabicTopicQuizPage skill="kitabah" material={props.material} />;
  return <ArabicKitabahDrillPage {...props} />;
}
