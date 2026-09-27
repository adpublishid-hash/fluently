import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Award, CheckCircle2, Ear, Headphones, RotateCcw, Target, Volume2 } from 'lucide-react';
import PageContainer from '../../../components/layout/PageContainer';

type QuizLevel = 'Basic' | 'Intermediate' | 'Advanced';

export type ArabicIstimaDrill = {
  id: string;
  title: string;
  arabic: string;
  transliteration: string;
  meaning: string;
  focus: string;
  prompt: string;
  answer: string;
  hint: string;
  keyword: string;
};

export type ArabicIstimaTopicMaterial = {
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

function speakArabicText(text: string, slow = false) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ar-SA';
  utterance.rate = slow ? 0.68 : 0.82;
  window.speechSynthesis.speak(utterance);
}

export function ArabicIstimaPracticePage({
  material,
  drills,
}: {
  material: ArabicIstimaTopicMaterial;
  drills: ArabicIstimaDrill[];
}) {
  const navigate = useNavigate();
  const [drillIndex, setDrillIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [draftAnswer, setDraftAnswer] = useState('');
  const [correctCount, setCorrectCount] = useState(0);
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
  const focusSummary = useMemo(() => Array.from(new Set(drills.map((drill) => drill.focus))), [drills]);

  const resetSession = () => {
    setDrillIndex(0);
    setRevealed(false);
    setDraftAnswer('');
    setCorrectCount(0);
    setAnsweredCount(0);
    setPlayCount(0);
    setSessionScore(null);
  };

  const playAudio = (slow = false) => {
    setPlayCount((current) => current + 1);
    speakArabicText(activeDrill.arabic, slow);
  };

  const completeCard = (captured: boolean) => {
    const nextAnswered = answeredCount + 1;
    const nextCorrect = correctCount + (captured ? 1 : 0);

    if (nextAnswered >= drills.length) {
      const finalScore = Math.round((nextCorrect / Math.max(1, drills.length)) * 100);
      savePracticeAttempt({
        id: makeId(material.id),
        skillId: 'istima',
        topicId: material.id,
        topicTitle: material.title,
        score: nextCorrect,
        total: drills.length,
        weakestLevel: finalScore >= 80 ? 'Advanced' : finalScore >= 55 ? 'Intermediate' : 'Basic',
        completedAt: new Date().toISOString(),
      });
      setLastScore(finalScore);
      setSessionScore(finalScore);
      setDrillIndex(0);
      setRevealed(false);
      setDraftAnswer('');
      setCorrectCount(0);
      setAnsweredCount(0);
      setPlayCount(0);
      return;
    }

    setCorrectCount(nextCorrect);
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
          className="overflow-hidden rounded-[26px] border border-teal-100 bg-white shadow-sm"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-5 md:p-7">
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  onClick={() => navigate('/latihan/arabic/istima')}
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-teal-100 bg-white text-slate-600 shadow-sm transition hover:bg-teal-50"
                  aria-label="Kembali"
                >
                  <ArrowLeft size={18} />
                </button>
                <div className="min-w-0">
                  <span className="inline-flex rounded-full bg-teal-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-[#0F766E]">
                    Latihan Arabic Istima
                  </span>
                  <h1 className="mt-3 text-3xl font-black leading-tight text-[#0F172A] sm:text-4xl">{material.title}</h1>
                  <p className="mt-2 max-w-2xl text-sm font-semibold leading-relaxed text-slate-500">{material.description}</p>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  { label: 'Audio', value: drills.length, icon: Headphones, color: '#0F766E', bg: '#CCFBF1' },
                  { label: 'Terjawab', value: `${answeredCount}/${drills.length}`, icon: Target, color: '#2563EB', bg: '#DBEAFE' },
                  { label: 'Best', value: `${lastScore}%`, icon: Award, color: '#CA8A04', bg: '#FEF3C7' },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">{item.label}</p>
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
                  <span key={focus} className="rounded-full bg-teal-50 px-3 py-1.5 text-xs font-black text-[#0F766E]">
                    {focus}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative min-h-[250px] bg-[#ECFDF5] p-6">
              <div className="absolute inset-6 rounded-[24px] border border-white/70 bg-white/75 shadow-sm" />
              <div className="relative z-10 flex h-full min-h-[220px] flex-col justify-between">
                <div className="rounded-2xl border border-teal-100 bg-white/90 p-5 shadow-sm">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#0F766E]">Listen First</p>
                  <div className="mt-5 grid h-24 w-24 place-items-center rounded-[24px] bg-teal-50 text-[#0F766E]">
                    <Ear size={42} />
                  </div>
                  <p className="mt-5 text-xl font-black text-[#0F172A]">{activeDrill.title}</p>
                  <p className="mt-1 text-xs font-semibold leading-relaxed text-slate-500">{activeDrill.prompt}</p>
                </div>
                <div className="mt-4 overflow-hidden rounded-full bg-white">
                  <div className="h-2 rounded-full bg-[#0F766E] transition-all" style={{ width: `${progress}%` }} />
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <section className="mt-6 overflow-hidden rounded-[26px] border border-teal-100 bg-white shadow-sm">
          <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-5 md:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#0F766E]">
                    Audio {currentNumber}/{drills.length}
                  </p>
                  <h2 className="mt-1 text-xl font-black text-[#0F172A]">{activeDrill.title}</h2>
                  <p className="mt-1 text-xs font-semibold leading-relaxed text-slate-500">{material.goal}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => playAudio(false)}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#0F766E] px-5 text-sm font-black text-white transition hover:bg-[#0B6B63]"
                  >
                    <Volume2 size={17} />
                    Putar
                  </button>
                  <button
                    type="button"
                    onClick={() => playAudio(true)}
                    className="inline-flex h-11 items-center justify-center rounded-full border border-teal-100 bg-white px-5 text-sm font-black text-[#0F766E] transition hover:bg-teal-50"
                  >
                    Pelan
                  </button>
                </div>
              </div>

              <div className="mt-5 rounded-[24px] border border-slate-100 bg-slate-50 p-5">
                <p className="text-sm font-black text-[#0F172A]">{activeDrill.prompt}</p>
                <p className="mt-2 text-xs font-semibold leading-relaxed text-slate-500">Hint: {activeDrill.hint}</p>

                <textarea
                  value={draftAnswer}
                  onChange={(event) => setDraftAnswer(event.target.value)}
                  rows={3}
                  dir={draftAnswer.match(/[\u0600-\u06FF]/) ? 'rtl' : 'auto'}
                  placeholder="Tulis kata kunci, arti, atau kalimat yang kamu dengar..."
                  className="mt-4 w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-[#0F172A] outline-none transition placeholder:text-slate-300 focus:border-[#0F766E] focus:ring-2 focus:ring-teal-100"
                />

                {revealed && (
                  <motion.div
                    className="mt-4 rounded-2xl border border-teal-100 bg-white p-4"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#0F766E]">Transkrip dan Target</p>
                    <p dir="rtl" lang="ar" className="mt-3 text-3xl font-black leading-relaxed text-[#0F172A]">{activeDrill.arabic}</p>
                    <p className="mt-2 text-sm font-black text-[#0F766E]">{activeDrill.transliteration}</p>
                    <p className="mt-1 text-sm font-semibold text-slate-500">{activeDrill.meaning}</p>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl bg-teal-50 p-3">
                        <p className="text-xs font-black text-[#0F766E]">Target Jawaban</p>
                        <p className="mt-1 text-xs font-semibold leading-relaxed text-slate-700">{activeDrill.answer}</p>
                      </div>
                      <div className="rounded-2xl bg-slate-50 p-3">
                        <p className="text-xs font-black text-slate-500">Kata Kunci</p>
                        <p className="mt-1 text-xs font-semibold leading-relaxed text-slate-700">{activeDrill.keyword}</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setRevealed(true)}
                    className="inline-flex h-11 items-center justify-center rounded-full border border-teal-100 bg-white px-5 text-sm font-black text-[#0F766E] transition hover:bg-teal-50"
                  >
                    Lihat Transkrip
                  </button>
                  <button
                    type="button"
                    onClick={() => completeCard(true)}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#0F766E] px-5 text-sm font-black text-white shadow-sm transition hover:bg-[#0B6B63]"
                  >
                    <CheckCircle2 size={16} />
                    Saya Tangkap
                  </button>
                  <button
                    type="button"
                    onClick={() => completeCard(false)}
                    className="inline-flex h-11 items-center justify-center rounded-full bg-slate-100 px-5 text-sm font-black text-slate-600 transition hover:bg-slate-200"
                  >
                    Perlu Ulang
                  </button>
                </div>
              </div>
            </div>

            <aside className="border-t border-teal-50 bg-[#F8FAFC] p-5 md:p-6 lg:border-l lg:border-t-0">
              <div className="rounded-2xl border border-white bg-white p-4 shadow-sm">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Session</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                  {[
                    { label: 'Tangkap', value: correctCount },
                    { label: 'Putar', value: playCount },
                    { label: 'Best', value: `${lastScore}%` },
                  ].map((item) => (
                    <div key={item.label} className="rounded-2xl bg-slate-50 px-4 py-3">
                      <p className="text-[10px] font-black uppercase tracking-[0.12em] text-slate-400">{item.label}</p>
                      <p className="mt-1 text-lg font-black text-[#0F172A]">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-white bg-white p-4 shadow-sm">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Fokus Topik</p>
                <p className="mt-2 text-sm font-black leading-relaxed text-[#0F172A]">{material.focus}</p>
                <p className="mt-2 text-xs font-semibold leading-relaxed text-slate-500">{material.goal}</p>
              </div>

              {sessionScore !== null && (
                <motion.div
                  className="mt-4 rounded-2xl border border-emerald-100 bg-emerald-50 p-4"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-700">Sesi Selesai</p>
                  <p className="mt-2 text-2xl font-black text-[#0F172A]">{sessionScore}%</p>
                  <p className="mt-1 text-xs font-semibold text-emerald-700">Skor tersimpan ke practice history.</p>
                </motion.div>
              )}

              <button
                type="button"
                onClick={resetSession}
                className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-white text-sm font-black text-slate-600 transition hover:bg-slate-50"
              >
                <RotateCcw size={16} />
                Ulangi Sesi
              </button>
            </aside>
          </div>
        </section>
      </div>
    </PageContainer>
  );
}
