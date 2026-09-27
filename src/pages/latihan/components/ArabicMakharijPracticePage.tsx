import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Award, CheckCircle2, Mic, RotateCcw, Target, Volume2, Waves } from 'lucide-react';
import PageContainer from '../../../components/layout/PageContainer';

type QuizLevel = 'Basic' | 'Intermediate' | 'Advanced';

export type ArabicMakharijDrill = {
  id: string;
  title: string;
  letter: string;
  transliteration: string;
  place: string;
  meaning: string;
  prompt: string;
  modelWord: string;
  modelTransliteration: string;
  modelMeaning: string;
  hint: string;
  contrast: string;
};

export type ArabicMakharijTopicMaterial = {
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
  utterance.rate = slow ? 0.62 : 0.76;
  window.speechSynthesis.speak(utterance);
}

export function ArabicMakharijPracticePage({
  material,
  drills,
}: {
  material: ArabicMakharijTopicMaterial;
  drills: ArabicMakharijDrill[];
}) {
  const navigate = useNavigate();
  const [drillIndex, setDrillIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [draftNote, setDraftNote] = useState('');
  const [clearCount, setClearCount] = useState(0);
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
  const placeSummary = useMemo(() => Array.from(new Set(drills.map((drill) => drill.place))), [drills]);

  const resetSession = () => {
    setDrillIndex(0);
    setRevealed(false);
    setDraftNote('');
    setClearCount(0);
    setAnsweredCount(0);
    setPlayCount(0);
    setSessionScore(null);
  };

  const playModel = (slow = false) => {
    setPlayCount((current) => current + 1);
    speakArabicText(activeDrill.modelWord, slow);
  };

  const completeCard = (clear: boolean) => {
    const nextAnswered = answeredCount + 1;
    const nextClear = clearCount + (clear ? 1 : 0);

    if (nextAnswered >= drills.length) {
      const finalScore = Math.round((nextClear / Math.max(1, drills.length)) * 100);
      savePracticeAttempt({
        id: makeId(material.id),
        skillId: 'makharij',
        topicId: material.id,
        topicTitle: material.title,
        score: nextClear,
        total: drills.length,
        weakestLevel: finalScore >= 80 ? 'Advanced' : finalScore >= 55 ? 'Intermediate' : 'Basic',
        completedAt: new Date().toISOString(),
      });
      setLastScore(finalScore);
      setSessionScore(finalScore);
      setDrillIndex(0);
      setRevealed(false);
      setDraftNote('');
      setClearCount(0);
      setAnsweredCount(0);
      setPlayCount(0);
      return;
    }

    setClearCount(nextClear);
    setAnsweredCount(nextAnswered);
    setDrillIndex((current) => current + 1);
    setRevealed(false);
    setDraftNote('');
    setPlayCount(0);
  };

  return (
    <PageContainer>
      <div className="mx-auto max-w-6xl px-5 pb-28 md:px-0 md:pb-8">
        <motion.section
          className="overflow-hidden rounded-[26px] border border-pink-100 bg-white shadow-sm"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-5 md:p-7">
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  onClick={() => navigate('/latihan/arabic/makharij')}
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-pink-100 bg-white text-slate-600 shadow-sm transition hover:bg-pink-50"
                  aria-label="Kembali"
                >
                  <ArrowLeft size={18} />
                </button>
                <div className="min-w-0">
                  <span className="inline-flex rounded-full bg-pink-50 px-3 py-1 text-[10px] font-black uppercase text-[#E83E8C]">
                    Latihan Arabic Makharij
                  </span>
                  <h1 className="mt-3 text-3xl font-black leading-tight text-[#0F172A] sm:text-4xl">{material.title}</h1>
                  <p className="mt-2 max-w-2xl text-sm font-semibold leading-relaxed text-slate-500">{material.description}</p>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  { label: 'Bunyi', value: drills.length, icon: Waves, color: '#E83E8C', bg: '#FDEDF4' },
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
                {placeSummary.map((place) => (
                  <span key={place} className="rounded-full bg-pink-50 px-3 py-1.5 text-xs font-black text-[#E83E8C]">
                    {place}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative min-h-[250px] bg-[#FFF7FB] p-6">
              <div className="absolute inset-6 rounded-[24px] border border-white/80 bg-white/75 shadow-sm" />
              <div className="relative z-10 flex h-full min-h-[220px] flex-col justify-between">
                <div className="rounded-2xl border border-pink-100 bg-white/90 p-5 shadow-sm">
                  <p className="text-[10px] font-black uppercase text-[#E83E8C]">Current Sound</p>
                  <p dir="rtl" lang="ar" className="mt-4 text-right text-7xl font-black leading-none text-[#0F172A]">{activeDrill.letter}</p>
                  <p className="mt-4 text-sm font-black text-[#E83E8C]">{activeDrill.transliteration}</p>
                  <p className="mt-1 text-xs font-semibold leading-relaxed text-slate-500">{activeDrill.place}</p>
                </div>
                <div className="mt-4 overflow-hidden rounded-full bg-white">
                  <div className="h-2 rounded-full bg-[#E83E8C] transition-all" style={{ width: `${progress}%` }} />
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <section className="mt-6 overflow-hidden rounded-[26px] border border-pink-100 bg-white shadow-sm">
          <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-5 md:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase text-[#E83E8C]">
                    Drill {currentNumber}/{drills.length}
                  </p>
                  <h2 className="mt-1 text-xl font-black text-[#0F172A]">{activeDrill.title}</h2>
                  <p className="mt-1 text-xs font-semibold leading-relaxed text-slate-500">{material.goal}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => playModel(false)}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#E83E8C] px-5 text-sm font-black text-white transition hover:bg-[#C2186A]"
                  >
                    <Volume2 size={17} />
                    Model
                  </button>
                  <button
                    type="button"
                    onClick={() => playModel(true)}
                    className="inline-flex h-11 items-center justify-center rounded-full border border-pink-100 bg-white px-5 text-sm font-black text-[#E83E8C] transition hover:bg-pink-50"
                  >
                    Pelan
                  </button>
                </div>
              </div>

              <div className="mt-5 rounded-[24px] border border-slate-100 bg-slate-50 p-5">
                <p className="text-sm font-black text-[#0F172A]">{activeDrill.prompt}</p>
                <p className="mt-2 text-xs font-semibold leading-relaxed text-slate-500">Hint: {activeDrill.hint}</p>

                <textarea
                  value={draftNote}
                  onChange={(event) => setDraftNote(event.target.value)}
                  rows={3}
                  placeholder="Catat rasa keluarnya bunyi, bagian lidah, atau bedanya dengan huruf lain..."
                  className="mt-4 w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-[#0F172A] outline-none transition placeholder:text-slate-300 focus:border-[#E83E8C] focus:ring-2 focus:ring-pink-100"
                />

                {revealed && (
                  <motion.div
                    className="mt-4 rounded-2xl border border-pink-100 bg-white p-4"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <p className="text-[10px] font-black uppercase text-[#E83E8C]">Model Kata</p>
                    <p dir="rtl" lang="ar" className="mt-3 text-right text-4xl font-black leading-tight text-[#0F172A]">{activeDrill.modelWord}</p>
                    <p className="mt-3 text-sm font-black text-[#E83E8C]">{activeDrill.modelTransliteration}</p>
                    <p className="mt-1 text-xs font-semibold leading-relaxed text-slate-500">{activeDrill.modelMeaning}</p>
                  </motion.div>
                )}

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setRevealed(true)}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-pink-100 bg-white px-5 text-sm font-black text-[#E83E8C] transition hover:bg-pink-50"
                  >
                    <Mic size={16} />
                    Lihat Model
                  </button>
                  <button
                    type="button"
                    onClick={() => completeCard(true)}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#E83E8C] px-5 text-sm font-black text-white transition hover:bg-[#C2186A]"
                  >
                    <CheckCircle2 size={16} />
                    Bunyi Jelas
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

            <aside className="border-t border-pink-100 bg-[#FFF7FB] p-5 md:p-6 lg:border-l lg:border-t-0">
              <div className="rounded-[24px] border border-white/80 bg-white p-5 shadow-sm">
                <p className="text-[10px] font-black uppercase text-[#E83E8C]">Makharij</p>
                <p className="mt-3 text-lg font-black leading-relaxed text-[#0F172A]">{activeDrill.place}</p>
                <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-500">{activeDrill.meaning}</p>
              </div>

              <div className="mt-4 rounded-[24px] border border-white/80 bg-white p-5 shadow-sm">
                <p className="text-[10px] font-black uppercase text-[#E83E8C]">Kontras</p>
                <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-600">{activeDrill.contrast}</p>
              </div>

              <div className="mt-4 rounded-[24px] border border-white/80 bg-white p-5 shadow-sm">
                <p className="text-[10px] font-black uppercase text-[#E83E8C]">Sesi</p>
                <div className="mt-3 grid gap-2 text-sm font-semibold text-slate-600">
                  <div className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3">
                    <span>Model diputar</span>
                    <span className="font-black text-[#0F172A]">{playCount}x</span>
                  </div>
                  <div className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3">
                    <span>Skor sesi</span>
                    <span className="font-black text-[#0F172A]">{sessionScore === null ? '-' : `${sessionScore}%`}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={resetSession}
                  className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-pink-100 bg-pink-50 text-sm font-black text-[#E83E8C] transition hover:bg-pink-100"
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
