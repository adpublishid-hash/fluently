import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check, Crown, Lock, MessageCircle, ShieldCheck,
  Sparkles, Star, X, Zap,
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageContainer from '../components/layout/PageContainer';
import { useAuth } from '../auth/AuthContext';
import { FREE_LIMITS, getEffectivePlan, type PremiumBlock } from '../utils/accessControl';

type UpgradePageProps = {
  block?: PremiumBlock | null;
  returnTo?: string;
};

type PaidPlan = {
  id: 'monthly' | 'yearly' | 'lifetime';
  title: string;
  badge: string;
  ribbon?: string;
  original: string;
  priceLabel: string;
  period: string;
  amount: number;
  description: string;
  cta: string;
  featured?: boolean;
  lifetime?: boolean;
};

const QRIS_URL = 'https://adpublish.id/wp-content/uploads/2026/03/QRStatis-indigit.jpg';
const CONFIRM_WHATSAPP = '6285169167464';

const planCards: PaidPlan[] = [
  {
    id: 'monthly',
    title: 'Pro Bulanan',
    badge: 'Fleksibel',
    original: 'Rp49rb',
    priceLabel: 'Rp30rb',
    period: '/bulan',
    amount: 30000,
    description: 'Coba serius dulu, batalkan kapan saja.',
    cta: 'Ambil Bulanan',
  },
  {
    id: 'yearly',
    title: 'Pro Tahunan',
    badge: 'Hemat 72%',
    ribbon: 'Paling Worth It',
    original: 'Rp588rb',
    priceLabel: 'Rp99rb',
    period: '/tahun',
    amount: 99000,
    description: 'Pilihan paling populer. Bayar 1x, akses 12 bulan.',
    cta: 'Ambil Tahunan',
    featured: true,
  },
  {
    id: 'lifetime',
    title: 'Pro Lifetime',
    badge: 'Sekali Bayar',
    original: 'Rp499rb',
    priceLabel: 'Rp199rb',
    period: '/lifetime',
    amount: 199000,
    description: 'Bayar 1x untuk akses seumur hidup.',
    cta: 'Ambil Lifetime',
    lifetime: true,
  },
];

const benefitGroups = [
  ['4 bahasa: Inggris, Arab, Mandarin, Jepang', 'Practice & roleplay tanpa batas', 'Sertifikat level CEFR/HSK/JLPT', 'Bonus worksheet generator PDF'],
  ['Semua level CEFR, HSK, dan JLPT', '27+ game arcade semua mode', 'Grup WA & support 1x24 jam', 'Bonus visual dictionary generator'],
  ['AI Tutor tanpa batas chat & voice', 'Diskon 30% kelas live tutor', 'Pre-test TOEFL & IELTS', 'Analytics progres belajar lengkap'],
];

const featureCopy: Record<string, { title: string; reason: string }> = {
  goals: {
    title: 'Goal gratis sudah penuh',
    reason: `Free member bisa membuat ${FREE_LIMITS.goals} goal. Upgrade Pro untuk goal tanpa batas dan tracking lebih rapi.`,
  },
  notes: {
    title: 'Notes gratis sudah penuh',
    reason: `Free member bisa membuat ${FREE_LIMITS.notes} notes. Upgrade Pro untuk notes tanpa batas.`,
  },
};

const featureBackTargets: Record<string, string> = {
  analytics: '/analytics',
  chat: '/chat',
  exam: '/ujian',
  game: '/game',
  goals: '/goals',
  ielts: '/ielts',
  lesson: '/modul',
  module: '/modul',
  notes: '/notes',
  practice: '/latihan',
  shop: '/shop',
};

function safeInternalPath(path: string) {
  const value = String(path || '').trim();
  return value.startsWith('/') && !value.startsWith('//') ? value : '';
}

function formatRupiah(amount: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount);
}

function uniqueCode(planId: string) {
  const seed = planId.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return 100 + (seed % 800);
}

function PaymentModal({ plan, userEmail, onClose }: { plan: PaidPlan; userEmail: string; onClose: () => void }) {
  const orderId = useMemo(() => `INV-${Date.now().toString().slice(-6)}`, [plan.id]);
  const total = plan.amount + uniqueCode(plan.id);
  const waText = encodeURIComponent(
    [
      'Halo Admin Fluently, saya sudah melakukan pembayaran Pro.',
      '',
      `Order ID: ${orderId}`,
      `Paket: ${plan.title}`,
      `Total Transfer: ${formatRupiah(total)}`,
      `Email akun: ${userEmail || '-'}`,
      '',
      'Saya lampirkan bukti transfer untuk aktivasi akun.',
    ].join('\n'),
  );

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-[#0F172A]/65 px-3 backdrop-blur-sm sm:items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-t-[28px] bg-white shadow-2xl sm:rounded-[28px]"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-emerald-50 text-emerald-600">
              <Lock size={19} />
            </div>
            <p className="font-black text-[#101828]">Secure Payment</p>
          </div>
          <button type="button" onClick={onClose} className="grid h-10 w-10 place-items-center rounded-2xl text-slate-400 hover:bg-slate-50">
            <X size={22} />
          </button>
        </div>

        <div className="px-5 py-7 text-center">
          <h2 className="text-2xl font-black text-[#101828] md:text-3xl">Checkout {plan.title}</h2>
          <p className="mt-2 text-sm font-semibold text-slate-500">Order ID: {orderId}</p>

          <div className="mt-5 rounded-2xl border border-orange-200 bg-orange-50 px-4 py-4 text-left text-sm font-black leading-relaxed text-orange-700">
            Selesaikan pembayaran sekarang agar pesanan masuk batch aktivasi cepat hari ini.
          </div>

          <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50 p-5">
            <div className="flex items-center justify-between gap-4">
              <p className="text-left text-sm font-black text-slate-600">Total Pembayaran</p>
              <p className="text-3xl font-black text-blue-700">{formatRupiah(total)}</p>
            </div>
            <p className="mx-auto mt-3 inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-black text-blue-700">
              Transfer tepat hingga 3 digit terakhir
            </p>
          </div>

          <p className="mt-7 text-base font-black text-slate-700">QRIS</p>
          <p className="mx-auto mt-2 max-w-sm text-sm font-semibold leading-relaxed text-slate-500">
            Scan QR code di bawah ini menggunakan e-wallet atau mobile banking Anda.
          </p>
          <img
            src={QRIS_URL}
            alt="QRIS pembayaran Fluently Pro"
            className="mx-auto mt-5 h-64 w-64 rounded-2xl border border-slate-200 bg-white object-contain p-3 shadow-sm"
          />

          <a
            href={`https://wa.me/${CONFIRM_WHATSAPP}?text=${waText}`}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-emerald-600 px-5 text-sm font-black text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700"
          >
            Konfirmasi Pembayaran via WhatsApp
            <MessageCircle size={19} />
          </a>
          <button type="button" onClick={onClose} className="mt-4 text-sm font-black text-slate-500 hover:text-slate-700">
            Batal
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function UpgradePage({ block, returnTo }: UpgradePageProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<PaidPlan | null>(null);
  const params = new URLSearchParams(location.search);
  const queryFeature = params.get('feature') || '';
  const queryReturnTo = params.get('returnTo') || '';
  const message = block || featureCopy[queryFeature] || null;
  const activePlan = getEffectivePlan(user);
  const stateFrom = typeof (location.state as { from?: unknown } | null)?.from === 'string'
    ? String((location.state as { from: string }).from)
    : '';
  const backTarget = safeInternalPath(returnTo || queryReturnTo || stateFrom);
  const fallbackTarget = featureBackTargets[queryFeature] || '/modul';
  const handleBack = () => {
    if (backTarget) {
      navigate(backTarget, { replace: true });
      return;
    }

    navigate(fallbackTarget, { replace: true });
  };

  return (
    <PageContainer>
      <div className="mx-auto max-w-7xl px-5 pb-28 md:px-0 md:pb-10">
        <button
          type="button"
          onClick={handleBack}
          className="mb-4 mt-5 inline-flex h-11 items-center gap-2 rounded-full bg-white px-4 text-sm font-black text-[#1A1A2E] shadow-sm ring-1 ring-gray-100 transition hover:bg-gray-50 md:mt-0"
        >
          <X size={17} />
          Close
        </button>

        <motion.section
          className="overflow-hidden rounded-[28px] bg-[#0F172A] text-white shadow-lg"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="relative p-5 md:p-7">
            <div className="absolute -right-20 -top-24 h-56 w-56 rounded-full bg-[#7EC3E6]/20 blur-3xl" />
            <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-[#7EC3E6]">
                  <Sparkles size={13} />
                  Upgrade Access
                </div>
                <h1 className="max-w-3xl text-3xl font-black leading-tight md:text-5xl">
                  {message?.title || 'Buka semua fitur Fluently Pro'}
                </h1>
                <p className="mt-3 max-w-3xl text-sm font-semibold leading-relaxed text-white/70 md:text-base">
                  {message?.reason || 'Free member tetap bisa belajar. Upgrade Pro untuk membuka semua modul, AI chat, practice, game, IELTS, exam, goals, notes, dan analytics.'}
                </p>
              </div>
              {activePlan !== 'free' && (
                <div className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500/15 px-4 py-3 text-sm font-black text-emerald-200">
                  <ShieldCheck size={18} />
                  Plan aktif: {activePlan}
                </div>
              )}
            </div>
          </div>
        </motion.section>

        <div className="mt-7 grid gap-5 lg:grid-cols-3">
          {planCards.map((plan, index) => (
            <motion.div
              key={plan.id}
              className={`relative flex min-h-[330px] flex-col rounded-[28px] border p-6 shadow-sm ${
                plan.featured ? 'border-[#0F172A] text-white shadow-xl shadow-slate-900/10' : plan.lifetime ? 'border-amber-300 bg-amber-50/30' : 'border-slate-100 bg-white'
              }`}
              style={plan.featured ? { backgroundColor: '#0F172A' } : undefined}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              {plan.ribbon && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-amber-400 px-5 py-2 text-xs font-black uppercase tracking-wide text-[#101828]">
                  {plan.ribbon}
                </div>
              )}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-black">{plan.title}</h2>
                  {plan.featured && <Star size={22} className="fill-amber-300 text-amber-300" />}
                  {plan.lifetime && <Crown size={22} className="text-amber-500" />}
                </div>
                <span className={`rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-wide ${
                  plan.featured ? 'bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/30' : 'bg-slate-100 text-slate-500'
                }`}>
                  {plan.badge}
                </span>
              </div>

              <div className="mt-8">
                <p className={`text-sm font-bold line-through ${plan.featured ? 'text-white/45' : 'text-slate-400'}`}>{plan.original}</p>
                <div className="flex items-end gap-2">
                  <p className={`text-5xl font-black ${plan.lifetime ? 'text-orange-600' : plan.featured ? 'text-white' : 'text-[#101828]'}`}>
                    {plan.priceLabel}
                  </p>
                  <p className={`pb-2 text-lg font-bold ${plan.featured ? 'text-white/60' : 'text-slate-500'}`}>{plan.period}</p>
                </div>
                {plan.featured && <p className="mt-2 text-sm font-bold text-white/60">≈ Rp8.250/bulan</p>}
                <p className={`mt-4 text-sm font-semibold leading-relaxed ${plan.featured ? 'text-white/70' : 'text-slate-500'}`}>
                  {plan.description}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedPlan(plan)}
                className={`mt-auto inline-flex h-14 w-full items-center justify-center rounded-2xl text-sm font-black transition ${
                  plan.featured
                    ? 'bg-white text-[#101828] hover:bg-slate-100'
                    : plan.lifetime
                      ? 'bg-gradient-to-r from-orange-400 to-orange-600 text-white shadow-lg shadow-orange-500/20 hover:brightness-105'
                      : 'bg-[#0F172A] text-white hover:bg-[#1E293B]'
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        <motion.section
          className="mt-7 rounded-[28px] border border-slate-100 bg-white p-5 shadow-sm md:p-7"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div className="flex flex-col gap-3 border-b border-slate-100 pb-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-[#4FA3D1]">
                <Sparkles size={20} />
              </div>
              <div>
                <h2 className="text-xl font-black text-[#101828]">Semua paket dapat ini</h2>
                <p className="text-sm font-semibold text-slate-500">Yang membedakan cuma cara bayarnya, fitur sama persis.</p>
              </div>
            </div>
            <span className="w-fit rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">{benefitGroups.flat().length} benefit</span>
          </div>

          <div className="grid gap-3 py-6 md:grid-cols-3">
            {benefitGroups.map((group, groupIndex) => (
              <div key={groupIndex} className="space-y-3">
                {group.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3 text-sm font-semibold leading-snug text-slate-600">
                    <Check size={17} className="mt-0.5 shrink-0 text-blue-600" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4">
              <p className="font-black text-[#101828]">Diskon 30% kelas live tutor</p>
              <p className="mt-1 text-sm font-semibold text-slate-500">Speaking dan koreksi langsung dari tutor.</p>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4">
              <p className="font-black text-[#101828]">Gratis AI Tools</p>
              <p className="mt-1 text-sm font-semibold text-slate-500">Worksheet dan Visual Dictionary custom dalam detik.</p>
            </div>
          </div>
        </motion.section>
      </div>

      <AnimatePresence>
        {selectedPlan && (
          <PaymentModal
            plan={selectedPlan}
            userEmail={user?.email ?? ''}
            onClose={() => setSelectedPlan(null)}
          />
        )}
      </AnimatePresence>
    </PageContainer>
  );
}
