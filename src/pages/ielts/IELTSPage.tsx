import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  BarChart3,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock,
  FileText,
  Headphones,
  Mic,
  PenLine,
  PlayCircle,
  Target,
} from 'lucide-react';
import PageContainer from '../../components/layout/PageContainer';

type Track = 'academic' | 'general';

const BAND_TARGETS = ['5.5', '6.0', '6.5', '7.0', '7.5', '8.0'];

const SKILLS = [
  {
    title: 'Listening',
    icon: Headphones,
    color: '#0EA5E9',
    bg: '#E0F2FE',
    time: '30 min',
    focus: 'Form completion, maps, MCQ, distractors',
  },
  {
    title: 'Reading',
    icon: BookOpen,
    color: '#10B981',
    bg: '#D1FAE5',
    time: '60 min',
    focus: 'Skimming, scanning, TFNG, headings',
  },
  {
    title: 'Writing',
    icon: PenLine,
    color: '#F59E0B',
    bg: '#FEF3C7',
    time: '60 min',
    focus: 'Task 1 structure, Task 2 argument, band feedback',
  },
  {
    title: 'Speaking',
    icon: Mic,
    color: '#EC4899',
    bg: '#FCE7F3',
    time: '11-14 min',
    focus: 'Part 1, cue card, follow-up questions',
  },
];

const ACTIONS = [
  {
    title: 'Entry Check',
    subtitle: 'Cari level awal sebelum latihan',
    icon: Target,
    path: '/ujian/english',
  },
  {
    title: 'Writing Feedback',
    subtitle: 'Kirim Task 1 atau Task 2 ke AI tutor',
    icon: FileText,
    path: '/chat/writing/a1',
  },
  {
    title: 'Speaking Practice',
    subtitle: 'Latihan cue card dan grammar correction',
    icon: Mic,
    path: '/chat/speaking/a1',
  },
];

function getPlan(targetBand: string) {
  const band = Number(targetBand);
  if (band >= 7.5) {
    return {
      label: 'Intensive',
      hours: '9-12 jam/minggu',
      steps: ['2 full mock setiap minggu', 'Writing feedback 3x', 'Speaking drill 4x'],
    };
  }
  if (band >= 6.5) {
    return {
      label: 'Balanced',
      hours: '6-8 jam/minggu',
      steps: ['Listening dan Reading timed drill', 'Writing Task 2 2x', 'Speaking cue card 3x'],
    };
  }
  return {
    label: 'Foundation',
    hours: '4-6 jam/minggu',
    steps: ['Pahami format tes', 'Latihan vocabulary akademik', 'Bangun struktur jawaban dasar'],
  };
}

export default function IELTSPage() {
  const navigate = useNavigate();
  const [track, setTrack] = useState<Track>('academic');
  const [targetBand, setTargetBand] = useState('7.0');
  const plan = useMemo(() => getPlan(targetBand), [targetBand]);

  return (
    <PageContainer>
      <div className="min-h-screen px-4 pb-24 pt-3 sm:px-6 lg:px-8">
        <div className="sticky top-3 z-20 mb-5 rounded-3xl border border-slate-100 bg-white/90 px-4 py-3 backdrop-blur">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-600 hover:bg-slate-200"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="min-w-0">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#7C3AED]">IELTS Preparation</p>
              <h1 className="truncate text-lg font-black leading-tight text-[#101828]">Simple Band Training</h1>
            </div>
          </div>
        </div>

        <main className="mx-auto max-w-6xl space-y-5">
          <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[28px] border border-slate-100 bg-white p-5 shadow-sm md:p-7"
          >
            <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#F5F3FF] px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.14em] text-[#7C3AED]">
                  <Target size={14} />
                  Pro IELTS Prep
                </span>
                <h2 className="mt-4 max-w-2xl text-3xl font-black leading-tight text-[#101828] md:text-5xl">
                  Pilih target band, lalu latihan per skill.
                </h2>
                <p className="mt-3 max-w-xl text-sm font-semibold leading-relaxed text-slate-500 md:text-base">
                  Fokus ke format IELTS yang penting saja: Listening, Reading, Writing, Speaking, dan feedback AI untuk memperbaiki jawaban.
                </p>
              </div>

              <div className="rounded-3xl bg-slate-50 p-4">
                <p className="text-[11px] font-black uppercase tracking-wider text-slate-400">Target Band</p>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {BAND_TARGETS.map((band) => (
                    <button
                      key={band}
                      type="button"
                      onClick={() => setTargetBand(band)}
                      className={`rounded-2xl px-3 py-3 text-sm font-black transition ${
                        targetBand === band ? 'bg-[#7C3AED] text-white shadow-sm' : 'bg-white text-slate-500 hover:bg-slate-100'
                      }`}
                    >
                      {band}
                    </button>
                  ))}
                </div>
                <div className="mt-4 rounded-2xl bg-white p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-3xl font-black text-[#101828]">{targetBand}</p>
                      <p className="text-xs font-bold text-slate-400">{plan.label} plan</p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F5F3FF] text-[#7C3AED]">
                      <BarChart3 size={24} />
                    </div>
                  </div>
                  <p className="mt-3 text-sm font-black text-slate-600">{plan.hours}</p>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.04 }}
            className="rounded-[24px] border border-slate-100 bg-white p-2 shadow-sm"
          >
            <div className="grid grid-cols-2 gap-2">
              {(['academic', 'general'] as Track[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setTrack(item)}
                  className={`rounded-2xl py-3 text-sm font-black transition ${
                    track === item ? 'bg-[#101828] text-white' : 'text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  {item === 'academic' ? 'Academic' : 'General Training'}
                </button>
              ))}
            </div>
          </motion.section>

          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {SKILLS.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <motion.button
                  key={skill.title}
                  type="button"
                  onClick={() => navigate('/chat')}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + index * 0.035 }}
                  className="rounded-[24px] border border-slate-100 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ backgroundColor: skill.bg, color: skill.color }}>
                      <Icon size={24} />
                    </div>
                    <ChevronRight size={18} className="text-slate-300" />
                  </div>
                  <h3 className="mt-5 text-xl font-black text-[#101828]">{skill.title}</h3>
                  <p className="mt-1 inline-flex items-center gap-1 text-xs font-black text-slate-400">
                    <Clock size={13} />
                    {skill.time}
                  </p>
                  <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-500">{skill.focus}</p>
                </motion.button>
              );
            })}
          </section>

          <section className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
              className="rounded-[24px] border border-slate-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F5F3FF] text-[#7C3AED]">
                  <CalendarDays size={22} />
                </div>
                <div>
                  <p className="text-[11px] font-black uppercase tracking-wider text-slate-400">Study Plan</p>
                  <h3 className="font-black text-[#101828]">{plan.label} untuk band {targetBand}</h3>
                </div>
              </div>
              <div className="mt-4 space-y-3">
                {plan.steps.map((step) => (
                  <div key={step} className="flex items-start gap-3 rounded-2xl bg-slate-50 px-4 py-3">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-500" />
                    <p className="text-sm font-bold leading-relaxed text-slate-600">{step}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16 }}
              className="rounded-[24px] border border-slate-100 bg-[#101828] p-5 text-white shadow-sm"
            >
              <p className="text-[11px] font-black uppercase tracking-wider text-white/45">Quick Start</p>
              <h3 className="mt-1 text-2xl font-black">Mulai dari satu langkah hari ini.</h3>
              <div className="mt-5 grid gap-3">
                {ACTIONS.map((action) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={action.title}
                      type="button"
                      onClick={() => navigate(action.path)}
                      className="flex items-center gap-3 rounded-2xl bg-white/8 p-3 text-left transition hover:bg-white/12"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-[#101828]">
                        <Icon size={21} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-black">{action.title}</p>
                        <p className="mt-0.5 text-xs font-semibold text-white/55">{action.subtitle}</p>
                      </div>
                      <ChevronRight size={17} className="text-white/45" />
                    </button>
                  );
                })}
              </div>
              <button
                type="button"
                onClick={() => navigate('/ujian/english')}
                className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-white text-sm font-black text-[#101828] transition hover:bg-slate-100"
              >
                <PlayCircle size={18} />
                Open Exam Centre
              </button>
            </motion.div>
          </section>
        </main>
      </div>
    </PageContainer>
  );
}
