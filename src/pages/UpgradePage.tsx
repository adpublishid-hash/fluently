import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Crown, Infinity, Sparkles, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../components/layout/PageContainer';
import { useAuth } from '../auth/AuthContext';
import { getEffectivePlan, type PremiumBlock } from '../utils/accessControl';
import { useState } from 'react';

type UpgradePageProps = {
  block?: PremiumBlock | null;
  returnTo?: string;
};

const planCards = [
  {
    id: 'pro' as const,
    title: 'Pro',
    subtitle: 'Akses penuh selama 1 tahun',
    price: 'Rp 149.000',
    icon: Crown,
    color: '#4FA3D1',
    bg: '#EAF7FC',
    cta: 'Upgrade to Pro',
    features: [
      'Semua lesson di setiap modul',
      'Semua practice topic',
      'Semua game arcade',
      'Semua topik AI Chat',
      'Materi baru otomatis terbuka',
      'Progress belajar tersimpan',
      'Diskon 30% kelas bersama live teaching with tutor',
    ],
  },
  {
    id: 'lifetime' as const,
    title: 'Lifetime',
    subtitle: 'Akses penuh selamanya',
    price: 'Rp 399.000',
    icon: Infinity,
    color: '#8B5CF6',
    bg: '#F3E8FF',
    cta: 'Get Lifetime',
    features: [
      'Semua fitur Pro',
      'Tidak ada masa berakhir',
      'Prioritas fitur baru',
      'Harga sekali bayar',
      'Akses semua update mendatang',
      'Diskon 30% kelas bersama live teaching with tutor',
      'Benefit aktif selamanya',
    ],
  },
];

export default function UpgradePage({ block, returnTo }: UpgradePageProps) {
  const navigate = useNavigate();
  const { user, upgradePlan } = useAuth();
  const [loadingPlan, setLoadingPlan] = useState<'pro' | 'lifetime' | null>(null);
  const [error, setError] = useState('');
  const plan = getEffectivePlan(user);

  const handleUpgrade = async (nextPlan: 'pro' | 'lifetime') => {
    setError('');
    setLoadingPlan(nextPlan);
    const result = await upgradePlan(nextPlan);
    setLoadingPlan(null);
    if (!result.success) {
      setError(result.error || 'Upgrade gagal. Coba lagi.');
      return;
    }
    navigate(returnTo || '/profile', { replace: true });
  };

  return (
    <PageContainer>
      <div className="mx-auto max-w-5xl px-5 pb-28 md:px-0 md:pb-10">
        <button
          type="button"
          onClick={() => {
            if (returnTo) {
              navigate(returnTo);
            } else {
              navigate(-1);
            }
          }}
          className="mb-4 mt-5 inline-flex h-10 items-center gap-2 rounded-full bg-white px-4 text-sm font-black text-[#1A1A2E] shadow-sm ring-1 ring-gray-100 transition hover:bg-gray-50 md:mt-0"
        >
          <ArrowLeft size={17} />
          Back
        </button>

        <motion.section
          className="overflow-hidden rounded-3xl bg-[#1A1A2E] text-white shadow-lg"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="relative p-5 md:p-7">
            <div className="absolute -right-24 -top-24 h-52 w-52 rounded-full bg-[#7EC3E6]/20 blur-3xl" />
            <div className="relative">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-[#7EC3E6]">
                <Sparkles size={13} />
                Upgrade Access
              </div>
              <h1 className="max-w-3xl text-2xl font-black leading-tight md:text-4xl">
                {block?.title || 'Buka semua fitur Fluently'}
              </h1>
              <p className="mt-3 max-w-2xl text-sm font-semibold leading-relaxed text-white/70">
                {block?.reason || 'Free member tetap bisa belajar, tapi akses penuh tersedia untuk Pro dan Lifetime.'}
              </p>
              <div className="mt-5 flex flex-wrap gap-2 text-xs font-black text-white/85">
                <span className="rounded-full bg-white/10 px-3 py-2">Semua modul</span>
                <span className="rounded-full bg-white/10 px-3 py-2">AI Chat lengkap</span>
                <span className="rounded-full bg-white/10 px-3 py-2">Game & practice terbuka</span>
                <span className="rounded-full bg-white/10 px-3 py-2">Diskon live class 30%</span>
              </div>
            </div>
          </div>
        </motion.section>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {planCards.map((card, index) => {
            const Icon = card.icon;
            const active = plan === card.id;
            return (
              <motion.div
                key={card.id}
                className="rounded-[28px] border border-gray-100 bg-white p-5 shadow-sm"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * index }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl" style={{ backgroundColor: card.bg, color: card.color }}>
                      <Icon size={23} />
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-[#1A1A2E]">{card.title}</h2>
                      <p className="text-xs font-semibold text-gray-500">{card.subtitle}</p>
                    </div>
                  </div>
                  {active && (
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-black text-emerald-600">Active</span>
                  )}
                </div>

                <div className="mt-5">
                  <p className="text-3xl font-black" style={{ color: card.color }}>{card.price}</p>
                  <p className="mt-1 text-xs font-bold text-gray-400">{card.id === 'pro' ? 'per tahun' : 'sekali bayar'}</p>
                </div>

                <div className="mt-5 space-y-2.5">
                  {card.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2 text-sm font-bold leading-snug text-[#1A1A2E]">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0" style={{ color: card.color }} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => handleUpgrade(card.id)}
                  disabled={!!loadingPlan || active}
                  className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl text-sm font-black text-white transition disabled:cursor-not-allowed disabled:opacity-60"
                  style={{ backgroundColor: card.color }}
                >
                  <Zap size={16} />
                  {loadingPlan === card.id ? 'Processing...' : active ? 'Current Plan' : card.cta}
                </button>
              </motion.div>
            );
          })}
        </div>

        {error && <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">{error}</p>}
      </div>
    </PageContainer>
  );
}
