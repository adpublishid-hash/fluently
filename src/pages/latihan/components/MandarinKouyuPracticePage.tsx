import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Award, CheckCircle2, Mic, RotateCcw, Target, Volume2 } from 'lucide-react';
import PageContainer from '../../../components/layout/PageContainer';

type QuizLevel = 'Basic' | 'Intermediate' | 'Advanced';

export type MandarinKouyuDrill = {
  id: string;
  title: string;
  scenario: string;
  role: string;
  prompt: string;
  modelHanzi: string;
  modelPinyin: string;
  modelMeaning: string;
  starter: string;
  hint: string;
  checklist: string[];
  followUp: string;
};

export type MandarinKouyuTopicMaterial = {
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

export function MandarinKouyuPracticePage({
  material,
  drills,
}: {
  material: MandarinKouyuTopicMaterial;
  drills: MandarinKouyuDrill[];
}) {
  const navigate = useNavigate();
  const [drillIndex, setDrillIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [draftResponse, setDraftResponse] = useState('');
  const [fluentCount, setFluentCount] = useState(0);
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
  const scenarioSummary = useMemo(() => Array.from(new Set(drills.map((drill) => drill.scenario))), [drills]);

  const resetSession = () => {
    setDrillIndex(0);
    setRevealed(false);
    setDraftResponse('');
    setFluentCount(0);
    setAnsweredCount(0);
    setPlayCount(0);
    setSessionScore(null);
  };

  const playModel = (slow = false) => {
    setPlayCount((current) => current + 1);
    speakMandarinText(activeDrill.modelHanzi, slow);
  };

  const completeCard = (fluent: boolean) => {
    const nextAnswered = answeredCount + 1;
    const nextFluent = fluentCount + (fluent ? 1 : 0);

    if (nextAnswered >= drills.length) {
      const finalScore = Math.round((nextFluent / Math.max(1, drills.length)) * 100);
      savePracticeAttempt({
        id: makeId(material.id),
        skillId: 'kouyu',
        topicId: material.id,
        topicTitle: material.title,
        score: nextFluent,
        total: drills.length,
        weakestLevel: finalScore >= 80 ? 'Advanced' : finalScore >= 55 ? 'Intermediate' : 'Basic',
        completedAt: new Date().toISOString(),
      });
      setLastScore(finalScore);
      setSessionScore(finalScore);
      setDrillIndex(0);
      setRevealed(false);
      setDraftResponse('');
      setFluentCount(0);
      setAnsweredCount(0);
      setPlayCount(0);
      return;
    }

    setFluentCount(nextFluent);
    setAnsweredCount(nextAnswered);
    setDrillIndex((current) => current + 1);
    setRevealed(false);
    setDraftResponse('');
    setPlayCount(0);
  };

  return (
    <PageContainer>
      <div className="mx-auto max-w-6xl px-5 pb-28 md:px-0 md:pb-8">
        <motion.section
          className="overflow-hidden rounded-[26px] border border-orange-100 bg-white shadow-sm"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-5 md:p-7">
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  onClick={() => navigate('/latihan/mandarin/kouyu')}
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-orange-100 bg-white text-slate-600 shadow-sm transition hover:bg-orange-50"
                  aria-label="Kembali"
                >
                  <ArrowLeft size={18} />
                </button>
                <div className="min-w-0">
                  <span className="inline-flex rounded-full bg-orange-50 px-3 py-1 text-[10px] font-black uppercase text-[#EA580C]">
                    Latihan Mandarin Kǒuyǔ
                  </span>
                  <h1 className="mt-3 text-3xl font-black leading-tight text-[#0F172A] sm:text-4xl">{material.title}</h1>
                  <p className="mt-2 max-w-2xl text-sm font-semibold leading-relaxed text-slate-500">{material.description}</p>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  { label: 'Drill', value: drills.length, icon: Mic, color: '#EA580C', bg: '#FFEDD5' },
                  { label: 'Selesai', value: `${answeredCount}/${drills.length}`, icon: Target, color: '#DB2777', bg: '#FCE7F3' },
                  { label: 'Best', value: `${lastScore}%`, icon: Award, color: '#CA8A04', bg: '#FEF3C7' },
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
                {scenarioSummary.map((scenario) => (
                  <span key={scenario} className="rounded-full bg-orange-50 px-3 py-1.5 text-xs font-black text-[#EA580C]">
                    {scenario}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative min-h-[250px] bg-[#FFF7ED] p-6">
              <div className="absolute inset-6 rounded-[24px] border border-white/80 bg-white/75 shadow-sm" />
              <div className="relative z-10 flex h-full min-h-[220px] flex-col justify-between">
                <div className="rounded-2xl border border-orange-100 bg-white/90 p-5 shadow-sm">
                  <p className="text-[10px] font-black uppercase text-[#EA580C]">Speaking Scenario</p>
                  <p className="mt-4 text-3xl font-black leading-tight text-[#0F172A]">{activeDrill.scenario}</p>
                  <p className="mt-4 text-sm font-black text-[#EA580C]">{activeDrill.role}</p>
                  <p className="mt-1 text-xs font-semibold leading-relaxed text-slate-500">{material.focus}</p>
                </div>
                <div className="mt-4 overflow-hidden rounded-full bg-white">
                  <div className="h-2 rounded-full bg-[#EA580C] transition-all" style={{ width: `${progress}%` }} />
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <section className="mt-6 overflow-hidden rounded-[26px] border border-orange-100 bg-white shadow-sm">
          <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-5 md:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase text-[#EA580C]">
                    Drill {currentNumber}/{drills.length}
                  </p>
                  <h2 className="mt-1 text-xl font-black text-[#0F172A]">{activeDrill.title}</h2>
                  <p className="mt-1 text-xs font-semibold leading-relaxed text-slate-500">{material.goal}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => playModel(false)}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#EA580C] px-5 text-sm font-black text-white transition hover:bg-[#C2410C]"
                  >
                    <Volume2 size={17} />
                    Model
                  </button>
                  <button
                    type="button"
                    onClick={() => playModel(true)}
                    className="inline-flex h-11 items-center justify-center rounded-full border border-orange-100 bg-white px-5 text-sm font-black text-[#EA580C] transition hover:bg-orange-50"
                  >
                    Pelan
                  </button>
                </div>
              </div>

              <div className="mt-5 rounded-3xl bg-slate-50 p-4">
                <p className="text-xs font-black uppercase text-slate-400">Situasi</p>
                <p className="mt-2 text-sm font-bold leading-relaxed text-[#0F172A]">{activeDrill.prompt}</p>
                <p className="mt-3 text-xs font-semibold leading-relaxed text-slate-500">{activeDrill.hint}</p>
              </div>

              <div className="mt-5 rounded-3xl bg-orange-50 p-4">
                <p className="text-xs font-black uppercase text-[#EA580C]">Respons Kamu</p>
                <p className="mt-2 text-sm font-black text-[#0F172A]">Starter: {activeDrill.starter}</p>
                <textarea
                  value={draftResponse}
                  onChange={(event) => setDraftResponse(event.target.value)}
                  rows={4}
                  className="mt-4 w-full resize-none rounded-2xl border border-orange-100 bg-white p-4 text-sm font-semibold text-slate-700 outline-none transition focus:border-orange-300 focus:ring-2 focus:ring-orange-100"
                  placeholder="Tulis draft respons, lalu ucapkan keras-keras..."
                />
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setRevealed(true)}
                  className="inline-flex h-11 items-center justify-center rounded-full border border-orange-100 bg-white px-5 text-sm font-black text-[#EA580C] transition hover:bg-orange-50"
                >
                  Lihat Model
                </button>
                <button
                  type="button"
                  onClick={() => completeCard(true)}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#16A34A] px-5 text-sm font-black text-white transition hover:bg-[#15803D]"
                >
                  <CheckCircle2 size={17} />
                  Lancar
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

            <div className="border-t border-orange-100 bg-[#FFF7ED] p-5 md:p-6 lg:border-l lg:border-t-0">
              <div className="rounded-3xl border border-orange-100 bg-white p-5 shadow-sm">
                <p className="text-[10px] font-black uppercase text-[#EA580C]">Model Bank</p>
                <div className="mt-4 space-y-4">
                  <div>
                    <p className="text-xs font-black uppercase text-slate-400">Model Respons</p>
                    <p lang="zh-CN" className="mt-1 whitespace-pre-line text-2xl font-black leading-relaxed text-[#0F172A]">
                      {revealed ? activeDrill.modelHanzi : '••••••'}
                    </p>
                    <p className="mt-2 text-sm font-black leading-relaxed text-[#EA580C]">{revealed ? activeDrill.modelPinyin : '••••••'}</p>
                    <p className="mt-2 text-xs font-semibold leading-relaxed text-slate-500">{revealed ? activeDrill.modelMeaning : '••••••'}</p>
                  </div>
                  <div className="rounded-2xl bg-orange-50 p-4">
                    <p className="text-xs font-black uppercase text-[#EA580C]">Checklist</p>
                    <div className="mt-3 space-y-2">
                      {activeDrill.checklist.map((item) => (
                        <div key={item} className="flex gap-2 rounded-2xl bg-white px-3 py-2 text-xs font-bold text-slate-600">
                          <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-[#16A34A]" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                    <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-600">
                      {revealed ? activeDrill.followUp : 'Ucapkan responsmu dulu, lalu buka model untuk cek ritme dan struktur.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-3xl border border-slate-100 bg-white p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-400">Session</p>
                    <p className="mt-1 text-sm font-bold text-slate-600">Model diputar {playCount} kali.</p>
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
                    Sesi selesai. Skor kelancaran kamu {sessionScore}%.
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
