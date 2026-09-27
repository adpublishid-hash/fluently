import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Clock3, FileText, Headphones, ListChecks, Lock, Trophy } from 'lucide-react';
import PageContainer from '../../../components/layout/PageContainer';

const examOptions = [
  {
    label: 'TOEFL PBT',
    title: 'TOEFL Practice Test 2',
    description: 'Full practice 140 soal dengan Listening audio asli, Structure, Reading, dan estimasi skor PBT saat kunci tersedia.',
    route: '/ujian/english/toefl/toefl1',
    available: true,
    meta: ['140 questions', '115 min', 'Real score conversion'],
    accent: '#4FA3D1',
    bg: 'linear-gradient(135deg,#EAF7FC,#FFFFFF)',
  },
  {
    label: 'TOEFL PBT',
    title: 'TOEFL Test 2',
    description: 'Paket latihan kedua untuk simulasi ulang dengan variasi soal baru.',
    route: '',
    available: false,
    meta: ['Coming soon', 'Full test', 'Score conversion'],
    accent: '#6366F1',
    bg: 'linear-gradient(135deg,#EEF2FF,#FFFFFF)',
  },
];

const skills = [
  { title: 'Listening', icon: Headphones },
  { title: 'Structure', icon: ListChecks },
  { title: 'Reading', icon: FileText },
];

export default function EnglishExamPage() {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <div className="min-h-screen px-4 pb-8 pt-3 sm:px-6 lg:px-8">
        <div className="sticky top-3 z-20 mb-4 rounded-3xl border border-slate-100 bg-white/90 px-4 py-3 backdrop-blur">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/modul')}
              className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-600 hover:bg-slate-200"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#4FA3D1]">English Exam</p>
              <h1 className="text-lg font-black leading-tight text-[#101828]">Pilih jenis ujian</h1>
            </div>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="rounded-3xl bg-gradient-to-br from-[#4FA3D1] to-[#1E6F9F] p-6 text-white">
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white/70">Test Center</p>
            <h2 className="mt-2 text-3xl font-black leading-tight">Mulai dari simulasi yang paling sesuai.</h2>
            <p className="mt-3 text-sm font-semibold leading-relaxed text-white/75">
              Pilih simulasi TOEFL sebelum masuk ke halaman test. TOEFL Practice Test 2 sudah aktif dengan materi baru.
            </p>
            <div className="mt-5 grid grid-cols-3 gap-2">
              {skills.map((skill) => {
                const Icon = skill.icon;
                return (
                  <div key={skill.title} className="rounded-2xl bg-white/12 px-3 py-3 text-center backdrop-blur">
                    <Icon className="mx-auto mb-1" size={18} />
                    <p className="text-[10px] font-black">{skill.title}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid gap-3">
            {examOptions.map((exam) => (
              <motion.button
                key={exam.title}
                type="button"
                onClick={() => exam.available && navigate(exam.route)}
                whileHover={exam.available ? { y: -2 } : {}}
                whileTap={exam.available ? { scale: 0.98 } : {}}
                className={`relative overflow-hidden rounded-3xl border border-slate-100 p-5 text-left shadow-sm ${exam.available ? 'cursor-pointer' : 'cursor-not-allowed opacity-70'}`}
                style={{ background: exam.bg }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <span
                      className="inline-flex rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest"
                      style={{ backgroundColor: `${exam.accent}18`, color: exam.accent }}
                    >
                      {exam.label}
                    </span>
                    <h3 className="mt-3 text-xl font-black leading-tight text-[#101828]">{exam.title}</h3>
                    <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-500">{exam.description}</p>
                  </div>
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-white"
                    style={{ backgroundColor: exam.accent }}
                  >
                    {exam.available ? <ChevronRight size={22} /> : <Lock size={18} />}
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {exam.meta.map((item, index) => (
                    <span key={item} className="inline-flex items-center gap-1 rounded-full bg-white/80 px-3 py-1.5 text-[11px] font-black text-slate-500">
                      {index === 0 ? <FileText size={13} /> : index === 1 ? <Clock3 size={13} /> : <Trophy size={13} />}
                      {item}
                    </span>
                  ))}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </PageContainer>
  );
}
