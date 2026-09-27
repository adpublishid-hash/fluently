import { motion } from 'framer-motion';
import { Settings, ChevronRight, BookOpen, Flame, Trophy, Zap, Star, Bell, Globe, LogOut, Shield, HelpCircle, Activity, CheckCircle2, XCircle, Pencil, Mail, UserRound, Upload, Image as ImageIcon, Link2, Sparkles, Trash2, Camera, MessageSquare, Send, Bug, LifeBuoy } from 'lucide-react';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import PageContainer from '../components/layout/PageContainer';
import { useLanguage } from '../i18n/LanguageContext';
import { useAuth } from '../auth/AuthContext';
import { getTargetLanguageLabel, targetLanguageOptions, type TargetLanguage } from '../features/chat/targetLanguage';
import AppLanguageSwitcher, { getAppLanguageLabel } from '../components/shared/AppLanguageSwitcher';
import ActivityYearModal from '../components/shared/ActivityYearModal';
import { FOCUS_SESSION_EVENT, getFocusSessions, getTodayFocusMinutes, type FocusSession } from '../utils/focusTimer';

// Local-only preferences (notifications/privacy/rating). Profile fields (displayName/avatarUrl)
// now live on the server and are read/written via AuthContext.updateProfile.
type LocalPrefs = {
  emailDigest: boolean;
  pushReminder: boolean;
  streakReminder: boolean;
  profilePublic: boolean;
  showLeaderboard: boolean;
  shareProgress: boolean;
  rating: number;
};

type ProfilePanel = 'edit-profile' | 'language' | 'target-language' | 'notifications' | 'privacy' | 'rate' | 'help' | null;
type SupportCategory = 'support' | 'bug' | 'feedback' | 'billing';
type SendStatus = 'idle' | 'sending' | 'sent' | 'error';

const LOCAL_PREFS_KEY = 'fluently_profile_prefs_v2';
const SUPPORT_EMAIL = 'support@fluently.id';

const defaultLocalPrefs: LocalPrefs = {
  emailDigest: true,
  pushReminder: true,
  streakReminder: true,
  profilePublic: false,
  showLeaderboard: true,
  shareProgress: false,
  rating: 0,
};

const loadLocalPrefs = (): LocalPrefs => {
  try {
    const raw = localStorage.getItem(LOCAL_PREFS_KEY);
    return raw ? { ...defaultLocalPrefs, ...JSON.parse(raw) } : defaultLocalPrefs;
  } catch {
    return defaultLocalPrefs;
  }
};

const saveLocalPrefs = (prefs: LocalPrefs) => {
  localStorage.setItem(LOCAL_PREFS_KEY, JSON.stringify(prefs));
};

const supportCategories: { value: SupportCategory; label: string; icon: React.ElementType }[] = [
  { value: 'support', label: 'Support', icon: LifeBuoy },
  { value: 'bug', label: 'Bug', icon: Bug },
  { value: 'feedback', label: 'Feedback', icon: MessageSquare },
  { value: 'billing', label: 'Billing', icon: Mail },
];

function countStoredLearningProgress() {
  let lessons = 0;
  let sources = 0;
  try {
    for (let i = 0; i < localStorage.length; i += 1) {
      const key = localStorage.key(i) || '';
      if (!key.startsWith('talky_') || !key.endsWith('_completed')) continue;
      const value = JSON.parse(localStorage.getItem(key) || '[]');
      if (Array.isArray(value)) {
        lessons += value.length;
        if (value.length) sources += 1;
      }
    }
    const gameStats = JSON.parse(localStorage.getItem('talky_game_stats') || '{}');
    lessons += Number(gameStats.completed || 0);
  } catch {
    // Keep profile resilient if a localStorage key contains stale data.
  }
  return { lessons, sources };
}

// Build the trailing two-week grid from real focus-session minutes.
// Levels mirror ActivityYearModal: 0 none, 1 <10m, 2 <25m, 3 <50m, 4 >=50m.
function buildActivityGrid(sessions: FocusSession[]) {
  return [0, 1].map((weekOffset) =>
    Array.from({ length: 7 }, (_, dayIndex) => {
      const target = new Date();
      const daysBack = (1 - weekOffset) * 7 + (6 - dayIndex);
      target.setDate(target.getDate() - daysBack);
      target.setHours(0, 0, 0, 0);
      const start = target.getTime();
      const end = start + 24 * 60 * 60 * 1000;
      const minutes = sessions
        .filter((session) => {
          const time = new Date(session.completedAt).getTime();
          return time >= start && time < end;
        })
        .reduce((sum, session) => sum + session.minutes, 0);
      if (minutes >= 50) return 4;
      if (minutes >= 25) return 3;
      if (minutes >= 10) return 2;
      if (minutes > 0) return 1;
      return 0;
    }),
  );
}

function buildSupportMailto({
  category,
  subject,
  message,
  name,
  email,
  rating,
}: {
  category: SupportCategory;
  subject: string;
  message: string;
  name: string;
  email: string;
  rating?: number;
}) {
  const mailSubject = `[Fluently ${category}] ${subject || 'Support request'}`;
  const body = [
    `Name: ${name || '-'}`,
    `Email: ${email || '-'}`,
    rating ? `Rating: ${rating}/5` : '',
    `Category: ${category}`,
    '',
    message,
  ].filter(Boolean).join('\n');

  return `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(body)}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Subcomponents
// ─────────────────────────────────────────────────────────────────────────────

function StatCard({ icon: Icon, label, value, color, delay }: {
  icon: React.ElementType; label: string; value: string | number; color: string; delay: number;
}) {
  return (
    <motion.div className="bg-white rounded-[24px] p-4 flex min-h-[126px] flex-col items-center justify-center gap-3 desktop-card border-none"
      initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
      <div className="w-11 h-11 rounded-2xl flex items-center justify-center transition-transform hover:scale-105 duration-300" style={{ backgroundColor: `${color}15` }}>
        <Icon size={22} style={{ color }} />
      </div>
      <div className="text-center">
        <p className="text-xl md:text-2xl font-black text-text-primary">{value}</p>
        <p className="text-[11px] md:text-xs font-bold text-text-muted mt-0.5">{label}</p>
      </div>
    </motion.div>
  );
}

function MenuItem({ icon: Icon, label, value, color, onClick, badge }: {
  icon: React.ElementType; label: string; value?: string; color: string; onClick?: () => void; badge?: React.ReactNode;
}) {
  return (
    <button onClick={onClick} className="flex items-center gap-3.5 w-full px-5 py-3.5 hover:bg-gray-50 transition-colors cursor-pointer group">
      <div className="w-9 h-9 rounded-xl flex shrink-0 items-center justify-center transition-transform group-hover:scale-105" style={{ backgroundColor: `${color}15` }}>
        <Icon size={17} style={{ color }} />
      </div>
      <span className="min-w-0 flex-1 text-[14px] font-black text-text-primary text-left group-hover:text-primary transition-colors">{label}</span>
      {badge}
      {value && <span className="max-w-[130px] truncate text-[12px] font-bold text-text-muted mr-1 bg-gray-100 px-2 py-0.5 rounded">{value}</span>}
      <ChevronRight size={17} className="shrink-0 text-text-muted group-hover:text-primary transition-colors group-hover:translate-x-1" />
    </button>
  );
}

function ToggleRow({ label, description, checked, onChange }: {
  label: string; description: string; checked: boolean; onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-4">
      <span>
        <span className="block text-sm font-black text-text-primary">{label}</span>
        <span className="mt-0.5 block text-xs font-semibold text-text-muted">{description}</span>
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-5 w-5 shrink-0 accent-primary"
      />
    </label>
  );
}

// Resize + compress an image File to a square JPEG data URL so localStorage stays small.
const MAX_AVATAR_DIMENSION = 320;
const MAX_AVATAR_FILE_BYTES = 8 * 1024 * 1024;

async function fileToCompressedDataURL(file: File, size = MAX_AVATAR_DIMENSION): Promise<string> {
  if (!file.type.startsWith('image/')) {
    throw new Error('File harus berupa gambar (jpg, png, webp, atau gif).');
  }
  if (file.size > MAX_AVATAR_FILE_BYTES) {
    throw new Error('Ukuran gambar maksimal 8 MB.');
  }

  const dataUrl: string = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('Gagal membaca file.'));
    reader.readAsDataURL(file);
  });

  const img: HTMLImageElement = await new Promise((resolve, reject) => {
    const el = new Image();
    el.onload = () => resolve(el);
    el.onerror = () => reject(new Error('Gambar tidak valid atau rusak.'));
    el.src = dataUrl;
  });

  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Browser tidak mendukung canvas rendering.');

  // Cover-fit crop into square
  const ratio = Math.max(size / img.width, size / img.height);
  const drawW = img.width * ratio;
  const drawH = img.height * ratio;
  const dx = (size - drawW) / 2;
  const dy = (size - drawH) / 2;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, size, size);
  ctx.drawImage(img, dx, dy, drawW, drawH);

  return canvas.toDataURL('image/jpeg', 0.85);
}

const AVATAR_PRESETS: { label: string; style: string; seeds: string[] }[] = [
  { label: 'Avataaars', style: 'avataaars', seeds: ['Aiden', 'Mia', 'Leo', 'Nova', 'Theo', 'Sky'] },
  { label: 'Bottts', style: 'bottts', seeds: ['Pixel', 'Robo', 'Spark', 'Circuit'] },
  { label: 'Lorelei', style: 'lorelei', seeds: ['Hana', 'Yumi', 'Sora', 'Aki'] },
  { label: 'Notionists', style: 'notionists', seeds: ['Andi', 'Budi', 'Citra', 'Dewi'] },
];

const buildPresetUrl = (style: string, seed: string) =>
  `https://api.dicebear.com/7.x/${style}/svg?seed=${encodeURIComponent(seed)}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;

type AvatarTab = 'upload' | 'preset' | 'url';

function AvatarEditor({
  value,
  displayName,
  onChange,
  fallback,
}: {
  value: string;
  displayName: string;
  onChange: (next: string) => void;
  fallback: string;
}) {
  const { t } = useLanguage();
  const [tab, setTab] = useState<AvatarTab>('upload');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const processFile = useCallback(async (file: File | undefined | null) => {
    if (!file) return;
    setError('');
    setBusy(true);
    try {
      const dataUrl = await fileToCompressedDataURL(file);
      onChange(dataUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal memuat gambar.');
    } finally {
      setBusy(false);
    }
  }, [onChange]);

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);
    const file = event.dataTransfer.files?.[0];
    void processFile(file);
  };

  const removePhoto = () => {
    setError('');
    onChange(fallback);
  };

  const previewSrc = value || fallback;
  const isUploaded = value.startsWith('data:image/');

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 rounded-2xl bg-gray-50 p-4">
        <div className="relative">
          <img
            src={previewSrc}
            alt="Avatar preview"
            className="h-20 w-20 rounded-full border-4 border-white object-cover shadow"
          />
          <button
            type="button"
            onClick={() => { setTab('upload'); fileRef.current?.click(); }}
            className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white shadow-md ring-2 ring-white hover:bg-primary-dark"
            aria-label="Ganti foto profile"
          >
            <Camera size={13} />
          </button>
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-black text-text-primary truncate">{displayName || t('profile.displayName')}</p>
          <p className="text-xs font-semibold text-text-muted mt-0.5">
            {isUploaded ? 'Foto custom (tersimpan di perangkat)' : 'Avatar generator'}
          </p>
          {isUploaded && (
            <button
              type="button"
              onClick={removePhoto}
              className="mt-2 inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-black text-red-600 hover:bg-red-100"
            >
              <Trash2 size={11} /> Hapus foto
            </button>
          )}
        </div>
      </div>

      <div className="flex gap-1 rounded-2xl bg-gray-100 p-1">
        {([
          { key: 'upload' as const, label: 'Upload', icon: Upload },
          { key: 'preset' as const, label: 'Avatar', icon: Sparkles },
          { key: 'url' as const, label: 'URL', icon: Link2 },
        ]).map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            type="button"
            onClick={() => { setTab(key); setError(''); }}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-black transition-all ${
              tab === key ? 'bg-white text-primary shadow-sm' : 'text-text-muted hover:text-text-primary'
            }`}
          >
            <Icon size={13} /> {label}
          </button>
        ))}
      </div>

      {tab === 'upload' && (
        <div>
          <div
            onClick={() => fileRef.current?.click()}
            onDragOver={(event) => { event.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={onDrop}
            className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed px-4 py-6 text-center transition-colors ${
              dragActive ? 'border-primary bg-primary/10' : 'border-gray-200 bg-gray-50 hover:border-primary/40 hover:bg-primary/5'
            }`}
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10">
              {busy ? (
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              ) : (
                <ImageIcon size={20} className="text-primary" />
              )}
            </div>
            <p className="text-sm font-black text-text-primary">
              {busy ? 'Memproses gambar...' : 'Klik atau drop gambar di sini'}
            </p>
            <p className="text-[11px] font-semibold text-text-muted">JPG, PNG, WEBP, atau GIF · maks 8 MB</p>
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              void processFile(file);
              event.target.value = '';
            }}
          />
        </div>
      )}

      {tab === 'preset' && (
        <div className="space-y-4">
          {AVATAR_PRESETS.map((preset) => (
            <div key={preset.style}>
              <p className="mb-2 text-[11px] font-black uppercase tracking-wider text-text-muted">{preset.label}</p>
              <div className="grid grid-cols-6 gap-2">
                {preset.seeds.map((seed) => {
                  const url = buildPresetUrl(preset.style, seed);
                  const selected = value === url;
                  return (
                    <button
                      key={seed}
                      type="button"
                      onClick={() => { setError(''); onChange(url); }}
                      className={`overflow-hidden rounded-2xl border-2 p-1 transition-all ${
                        selected ? 'border-primary bg-primary/10' : 'border-transparent bg-gray-50 hover:border-primary/30'
                      }`}
                      title={`${preset.label} · ${seed}`}
                    >
                      <img src={url} alt={seed} className="aspect-square w-full rounded-xl object-cover" />
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'url' && (
        <label className="block">
          <span className="mb-1 block text-xs font-black uppercase tracking-wider text-text-muted">Avatar URL</span>
          <input
            value={value.startsWith('data:') ? '' : value}
            onChange={(event) => { setError(''); onChange(event.target.value); }}
            placeholder="https://..."
            className="h-12 w-full rounded-2xl border border-gray-200 px-4 text-sm font-bold outline-none focus:border-primary"
          />
          <p className="mt-1 text-[11px] font-semibold text-text-muted">
            Tempel URL gambar publik. Field kosong → avatar otomatis sesuai display name.
          </p>
        </label>
      )}

      {error && (
        <div className="flex items-start gap-2 rounded-xl bg-red-50 px-3 py-2 text-xs font-bold text-red-600">
          <XCircle size={14} className="mt-0.5 shrink-0" /> {error}
        </div>
      )}
    </div>
  );
}

function ProfileModal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-900/30 px-4 pb-4 pt-20 backdrop-blur-sm md:items-center md:p-6">
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="max-h-[84vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white shadow-2xl"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white/95 px-5 py-4 backdrop-blur">
          <h3 className="text-lg font-black text-text-primary">{title}</h3>
          <button onClick={onClose} className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-black text-text-secondary hover:bg-gray-200">
            Close
          </button>
        </div>
        <div className="p-5">{children}</div>
      </motion.div>
    </div>
  );
}

function AchievementBadge({
  emoji,
  label,
  unlocked,
  progress,
  requirement,
  delay,
}: {
  emoji: string;
  label: string;
  unlocked: boolean;
  progress: number;
  requirement: string;
  delay: number;
}) {
  return (
    <motion.div
      className={`group relative min-w-[132px] overflow-hidden rounded-3xl border p-3 text-left transition-all duration-300 ${
        unlocked
          ? 'border-primary/20 bg-gradient-to-br from-sky-50 via-white to-white shadow-sm hover:-translate-y-1 hover:shadow-md'
          : 'border-gray-100 bg-white/70 shadow-sm hover:border-primary/15'
      }`}
      initial={{ opacity: 0, y: 10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay }}
    >
      <div className={`absolute -right-6 -top-8 h-20 w-20 rounded-full ${unlocked ? 'bg-primary/10' : 'bg-gray-100'}`} />
      <div className="relative flex items-start justify-between gap-2">
        <div className={`flex h-14 w-14 items-center justify-center rounded-2xl border text-[30px] ${
          unlocked
            ? 'border-primary/20 bg-white shadow-sm'
            : 'border-gray-100 bg-gray-50 grayscale'
        }`}>
          {emoji}
        </div>
        <span className={`rounded-full px-2 py-1 text-[10px] font-black ${
          unlocked ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-text-muted'
        }`}>
          {unlocked ? 'Unlocked' : 'Locked'}
        </span>
      </div>
      <div className="relative mt-3 min-h-[52px]">
        <p className={`text-sm font-black leading-tight ${unlocked ? 'text-text-primary' : 'text-text-secondary'}`}>{label}</p>
        <p className="mt-1 text-[11px] font-semibold leading-snug text-text-muted">{requirement}</p>
      </div>
      <div className="relative mt-3">
        <div className="mb-1 flex items-center justify-between text-[10px] font-black text-text-muted">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-gray-100">
          <motion.div
            className={`h-full rounded-full ${unlocked ? 'bg-primary' : 'bg-gray-300'}`}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ delay: delay + 0.15, duration: 0.7, ease: 'easeOut' }}
          />
        </div>
      </div>
    </motion.div>
  );
}

function ProgressList({ total, completed }: { total: number, completed: number }) {
  const { t } = useLanguage();
  return (
    <div className="bg-white rounded-3xl p-5 desktop-card flex flex-col justify-center border-none h-full">
      <div className="flex items-center gap-3 mb-5"><Activity size={20} className="text-primary" /><h3 className="font-extrabold text-lg text-text-primary">{t('profile.learningStats')}</h3></div>
      <div className="space-y-5">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[13px] font-bold text-text-secondary">{t('profile.overallProgress')}</span>
            <span className="text-[13px] font-black text-primary">{Math.round((completed/total)*100)}%</span>
          </div>
          <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden shadow-inner">
            <motion.div className="h-full rounded-full bg-primary relative" initial={{ width: 0 }} animate={{ width: `${(completed/total)*100}%` }} transition={{ duration: 1 }}>
              <div className="absolute top-0 right-0 bottom-0 w-8 bg-white/20 skew-x-[-20deg]" />
            </motion.div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50 rounded-2xl p-4"><p className="text-[10px] font-black text-text-muted mb-1 uppercase tracking-wider">{t('profile.coursesActive')}</p><p className="text-2xl font-black text-text-primary">{total - completed}</p></div>
          <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10"><p className="text-[10px] font-black text-primary mb-1 uppercase tracking-wider">{t('profile.completed')}</p><p className="text-2xl font-black text-primary">{completed}</p></div>
        </div>
        <div className="flex items-center justify-between bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
          <span className="text-[13px] font-bold text-text-secondary">{t('profile.timeSpent')}</span>
          <span className="text-[15px] font-black text-text-primary bg-primary/10 px-3 py-1 rounded-lg">24h 30m</span>
        </div>
      </div>
    </div>
  );
}

function ActivityHeatmapCard({ streak }: { streak: number }) {
  const { t, language } = useLanguage();
  const [summary, setSummary] = useState(() => countStoredLearningProgress());
  const [focusSessions, setFocusSessions] = useState<FocusSession[]>(getFocusSessions);
  const [showYearModal, setShowYearModal] = useState(false);
  const days = language === 'id' ? ['S', 'S', 'R', 'K', 'J', 'S', 'M'] : ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const grid = buildActivityGrid(focusSessions);
  const todayFocus = getTodayFocusMinutes(focusSessions);
  const flameCount = todayFocus || streak;

  useEffect(() => {
    const refresh = () => {
      setSummary(countStoredLearningProgress());
      setFocusSessions(getFocusSessions());
    };
    window.addEventListener('storage', refresh);
    window.addEventListener('focus', refresh);
    window.addEventListener(FOCUS_SESSION_EVENT, refresh);
    return () => {
      window.removeEventListener('storage', refresh);
      window.removeEventListener('focus', refresh);
      window.removeEventListener(FOCUS_SESSION_EVENT, refresh);
    };
  }, []);

  const getColor = (levelValue: number) => {
    if (levelValue === 0) return '#F3F4F6';
    if (levelValue === 1) return '#BBF7D0';
    if (levelValue === 2) return '#86EFAC';
    if (levelValue === 3) return '#4ADE80';
    if (levelValue === 4) return '#22C55E';
    return '#16A34A';
  };

  return (
    <>
    <div
      role="button"
      tabIndex={0}
      onClick={() => setShowYearModal(true)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setShowYearModal(true);
        }
      }}
      className="bg-white rounded-3xl p-5 desktop-card border-none cursor-pointer transition-shadow hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)]"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Activity size={18} className="text-emerald-500" />
          <h3 className="text-base font-extrabold text-text-primary">{t('sidebar.activity')}</h3>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1">
          <Flame size={14} className="text-amber-500" />
          <span className="text-xs font-black text-amber-600">{flameCount}</span>
        </div>
      </div>

      <div className="mb-2 grid grid-cols-7 gap-2">
        {days.map((day, index) => (
          <span key={`${day}-${index}`} className="text-center text-[11px] font-black text-text-muted">
            {day}
          </span>
        ))}
      </div>
      <div className="space-y-2">
        {grid.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7 gap-2">
            {week.map((levelValue, dayIndex) => (
              <motion.div
                key={`${weekIndex}-${dayIndex}`}
                title={levelValue ? `${levelValue} activity points` : t('activity.noActivity')}
                className="aspect-square rounded-xl"
                style={{ backgroundColor: getColor(levelValue) }}
                initial={{ scale: 0.75, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: (weekIndex * 7 + dayIndex) * 0.025 }}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-emerald-50 p-3">
          <p className="text-[10px] font-black uppercase tracking-wider text-emerald-600">Lessons</p>
          <p className="mt-1 text-xl font-black text-emerald-700">{summary.lessons}</p>
        </div>
        <div className="rounded-2xl bg-sky-50 p-3">
          <p className="text-[10px] font-black uppercase tracking-wider text-sky-600">Modules</p>
          <p className="mt-1 text-xl font-black text-sky-700">{summary.sources}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-1 text-[11px] font-bold text-text-muted">
        <span>{t('activity.viewYear')}</span>
        <ChevronRight size={13} />
      </div>
    </div>

    <ActivityYearModal
      open={showYearModal}
      onClose={() => setShowYearModal(false)}
      sessions={focusSessions}
      streak={flameCount}
    />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────────────────────────────────────

export default function ProfilePage({ onLogout }: { onLogout?: () => void }) {
  const { t, language } = useLanguage();
  const { user, updatePersona, updateProfile, changePassword, authHeaders } = useAuth();
  const [savingLanguage, setSavingLanguage] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [activePanel, setActivePanel] = useState<ProfilePanel>(null);
  const [localPrefs, setLocalPrefs] = useState<LocalPrefs>(() => loadLocalPrefs());
  const [supportDraft, setSupportDraft] = useState({
    category: 'support' as SupportCategory,
    subject: '',
    message: '',
  });
  const [supportStatus, setSupportStatus] = useState<SendStatus>('idle');
  const [supportError, setSupportError] = useState('');
  const [ratingMessage, setRatingMessage] = useState('');
  const [ratingStatus, setRatingStatus] = useState<SendStatus>('idle');
  const [ratingError, setRatingError] = useState('');

  const displayName = user?.displayName || user?.name || 'Learner';
  const avatarUrl = user?.avatarUrl
    || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(displayName)}&backgroundColor=b6e3f4`;
  const xp = user?.xp ?? 0;
  const streak = user?.streak ?? 0;
  const level = user?.level ?? 1;
  const xpInLevel = xp % 3000;

  const [profileDraft, setProfileDraft] = useState({ displayName, avatarUrl });
  const [passwordDraft, setPasswordDraft] = useState({ current: '', next: '', confirm: '' });
  const [profileError, setProfileError] = useState('');
  const [profileSaved, setProfileSaved] = useState(false);

  const completedCourses = 3;
  const totalCourses = 12;
  const targetLanguage = user?.persona?.targetLanguage || 'English';
  const targetLanguageLabel = getTargetLanguageLabel(targetLanguage);
  const planLabel = user?.plan === 'lifetime'
    ? t('profile.planLifetime')
    : user?.plan === 'pro'
      ? t('profile.planPro')
      : t('profile.planFree');

  useEffect(() => {
    saveLocalPrefs(localPrefs);
  }, [localPrefs]);

  // Reset draft whenever the modal opens or the server-side user changes.
  useEffect(() => {
    if (activePanel === 'edit-profile') {
      setProfileDraft({ displayName, avatarUrl });
      setPasswordDraft({ current: '', next: '', confirm: '' });
      setProfileError('');
      setProfileSaved(false);
    }
  }, [activePanel, displayName, avatarUrl]);

  const updateLocalPrefs = (patch: Partial<LocalPrefs>) => {
    setLocalPrefs((current) => ({ ...current, ...patch }));
  };

  const sendSupportFeedback = async ({
    category,
    subject,
    message,
    rating,
  }: {
    category: SupportCategory;
    subject: string;
    message: string;
    rating?: number;
  }) => {
    const response = await fetch('/api/support/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify({
        category,
        subject,
        message,
        rating,
        page: window.location.pathname,
      }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || 'Gagal mengirim pesan');
    return data;
  };

  const openSupportEmail = (draft = supportDraft, rating?: number) => {
    window.location.href = buildSupportMailto({
      category: draft.category,
      subject: draft.subject,
      message: draft.message || ratingMessage || 'Saya ingin memberi masukan untuk Fluently.',
      name: displayName,
      email: user?.email || '',
      rating,
    });
  };

  const submitSupport = async () => {
    const message = supportDraft.message.trim();
    if (message.length < 5) {
      setSupportStatus('error');
      setSupportError('Tulis pesan minimal 5 karakter.');
      return;
    }

    setSupportStatus('sending');
    setSupportError('');
    try {
      await sendSupportFeedback({
        ...supportDraft,
        subject: supportDraft.subject.trim() || 'Support request',
        message,
      });
      setSupportStatus('sent');
      setSupportDraft((current) => ({ ...current, subject: '', message: '' }));
    } catch (err) {
      setSupportStatus('error');
      setSupportError(err instanceof Error ? err.message : 'Gagal mengirim pesan.');
    }
  };

  const submitRatingFeedback = async () => {
    if (!localPrefs.rating) {
      setRatingStatus('error');
      setRatingError('Pilih rating dulu.');
      return;
    }

    const message = ratingMessage.trim() || `Rating ${localPrefs.rating}/5 tanpa catatan tambahan.`;
    setRatingStatus('sending');
    setRatingError('');
    try {
      await sendSupportFeedback({
        category: 'feedback',
        subject: `Rating ${localPrefs.rating}/5`,
        message,
        rating: localPrefs.rating,
      });
      setRatingStatus('sent');
      setRatingMessage('');
    } catch (err) {
      setRatingStatus('error');
      setRatingError(err instanceof Error ? err.message : 'Gagal mengirim feedback.');
    }
  };

  const saveProfileDraft = async () => {
    if (savingProfile) return;
    const nextName = profileDraft.displayName.trim() || displayName;
    const draftAvatar = profileDraft.avatarUrl.trim();
    const nextAvatar = draftAvatar
      || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(nextName)}&backgroundColor=b6e3f4`;

    setProfileError('');
    const wantsPasswordChange = passwordDraft.current || passwordDraft.next || passwordDraft.confirm;
    if (wantsPasswordChange) {
      if (!passwordDraft.current || !passwordDraft.next || !passwordDraft.confirm) {
        setProfileError('Lengkapi password lama, password baru, dan konfirmasi password.');
        return;
      }
      if (passwordDraft.next.length < 8) {
        setProfileError('Password baru minimal 8 karakter.');
        return;
      }
      if (passwordDraft.next !== passwordDraft.confirm) {
        setProfileError('Konfirmasi password baru belum sama.');
        return;
      }
    }

    setSavingProfile(true);
    const result = await updateProfile({ displayName: nextName, avatarUrl: nextAvatar });

    if (!result.success) {
      setSavingProfile(false);
      setProfileError(result.error || 'Gagal menyimpan profile');
      return;
    }

    if (wantsPasswordChange) {
      const passwordResult = await changePassword(passwordDraft.current, passwordDraft.next);
      if (!passwordResult.success) {
        setSavingProfile(false);
        setProfileError(passwordResult.error || 'Gagal mengganti password');
        return;
      }
      setPasswordDraft({ current: '', next: '', confirm: '' });
    }

    setSavingProfile(false);
    setProfileSaved(true);
    setTimeout(() => {
      setProfileSaved(false);
      setActivePanel(null);
    }, 900);
  };

  const handleTargetLanguage = async (nextLanguage: TargetLanguage) => {
    if (nextLanguage === targetLanguage || savingLanguage) return;
    setSavingLanguage(true);
    await updatePersona({ targetLanguage: nextLanguage });
    setSavingLanguage(false);
  };

  const achievements = [
    { emoji: '🔥', label: t('achievement.7DayStreak'),  unlocked: false, progress: 0, requirement: '7 hari aktif berturut-turut' },
    { emoji: '📚', label: t('achievement.bookworm'),    unlocked: false, progress: 0, requirement: 'Selesaikan 3 materi belajar' },
    { emoji: '⭐', label: t('achievement.starStudent'), unlocked: false, progress: 0, requirement: 'Raih 2.000+ XP belajar' },
    { emoji: '🏆', label: t('achievement.top10'),       unlocked: false, progress: 0, requirement: 'Masuk peringkat 10 besar' },
    { emoji: '💎', label: t('achievement.diamond'),     unlocked: false, progress: 0, requirement: 'Kumpulkan 5.000 XP total' },
    { emoji: '🚀', label: t('achievement.speedLearner'),unlocked: false, progress: 0, requirement: 'Selesaikan 5 latihan cepat' },
    { emoji: '🎯', label: t('achievement.perfectScore'),unlocked: false, progress: 0, requirement: 'Dapatkan skor 100% di quiz' },
    { emoji: '👑', label: t('achievement.master'),      unlocked: false, progress: 0, requirement: 'Tamatkan semua skill utama' },
  ];

  return (
    <PageContainer>
      <div className="grid h-full gap-6 pb-8 md:px-5 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8">

        {/* Main Column */}
        <div className="min-w-0 flex flex-col gap-5 pt-4 md:pt-0">

          <div className="flex items-center justify-between px-5 pt-6 md:pt-0 md:px-0 mb-2">
            <h1 className="text-2xl font-extrabold text-text-primary">{t('profile.title')}</h1>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setActivePanel('edit-profile')}
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center cursor-pointer shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors md:hidden"
            >
              <Settings size={20} className="text-text-secondary" />
            </motion.button>
          </div>

          {/* Profile Card */}
          <motion.div className="mx-5 md:mx-0 bg-white rounded-[30px] p-5 md:p-6 relative overflow-hidden desktop-card border-none"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="absolute top-0 right-0 h-full w-1/2 bg-gradient-to-l from-primary/10 flex items-center justify-end pr-8 opacity-50 pointer-events-none">
              <Trophy size={112} className="text-primary/20 blur-[2px] transform rotate-12" />
            </div>
            <div className="relative grid gap-5 z-10 md:grid-cols-[128px_1fr] md:items-center">
              <div className="mx-auto h-28 w-28 overflow-hidden rounded-full border-4 border-white bg-white shadow-xl ring-4 ring-primary/20 md:mx-0">
                <img src={avatarUrl} alt={displayName} className="w-full h-full object-cover" />
              </div>
              <div className="min-w-0">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0 text-center md:text-left">
                    <h2 className="truncate text-2xl md:text-3xl font-black text-text-primary tracking-tight">{displayName}</h2>
                    <p className="text-[13px] md:text-sm font-semibold text-text-secondary mt-1">{t('profile.levelProgress')} {level} {t('profile.levelLearner')} • {planLabel}</p>
                    {user?.email && <p className="mt-1 text-xs font-semibold text-text-muted">{user.email}</p>}
                  </div>
                  <div className="hidden shrink-0 md:flex items-center gap-2 bg-white/85 backdrop-blur rounded-2xl p-2 border border-primary/20 shadow-sm">
                    <button
                      type="button"
                      onClick={() => setActivePanel('edit-profile')}
                      className="flex h-9 items-center gap-1.5 rounded-xl bg-primary/10 px-3 text-[12px] font-black text-primary hover:bg-primary/15"
                    >
                      <Pencil size={14} />
                      {t('profile.editShort')}
                    </button>
                    <div className="flex h-9 items-center gap-1.5 rounded-xl bg-orange-50 px-3">
                      <Flame size={16} className="text-orange-500" />
                      <span className="text-[13px] font-black text-orange-600">{streak} {t('profile.streak')}</span>
                    </div>
                  </div>
                </div>
                <div className="flex md:hidden items-center gap-1 mt-3">
                  <div className="flex items-center gap-1 bg-orange-50 px-3 py-1.5 rounded-lg border border-orange-100">
                    <Flame size={14} className="text-orange-500" />
                    <span className="text-xs font-black text-orange-600">{streak} {t('profile.dayStreakLabel')}</span>
                  </div>
                </div>
                <div className="mt-5 border-t border-gray-100/70 pt-5">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="font-bold text-text-secondary">{t('profile.levelProgress')} {level}</span>
                    <span className="font-black text-primary">{xpInLevel.toLocaleString()} <span className="text-text-muted font-semibold">/ 3000 XP</span></span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                    <motion.div className="h-full rounded-full relative" style={{ background: 'linear-gradient(90deg, #4FA3D1, #1E6F9F)' }}
                      initial={{ width: 0 }} animate={{ width: `${(xpInLevel / 3000) * 100}%` }} transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}>
                      <div className="absolute top-0 right-0 bottom-0 w-8 bg-white/20 skew-x-[-20deg]" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 px-5 md:grid-cols-4 md:px-0">
            <StatCard icon={BookOpen} label={t('profile.coursesDone')} value={completedCourses} color="#4FA3D1" delay={0.1} />
            <StatCard icon={Zap} label={t('profile.totalXP')} value={xp >= 1000 ? `${(xp / 1000).toFixed(1)}k` : String(xp)} color="#F39C12" delay={0.2} />
            <StatCard icon={Flame} label={t('profile.dayStreak')} value={streak} color="#E74C3C" delay={0.3} />
            <StatCard icon={Trophy} label={t('profile.globalRank')} value="#6" color="#3498DB" delay={0.4} />
          </div>

          {/* Achievements */}
          <div className="px-5 md:px-0">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-extrabold text-lg text-text-primary">{t('profile.yourBadges')}</h3>
                <p className="mt-0.5 text-xs font-semibold text-text-muted">{t('profile.badgesSubtitle')}</p>
              </div>
              <span className="shrink-0 text-[13px] bg-primary/10 text-primary font-bold px-3 py-1 rounded-full shadow-sm">
                {achievements.filter(a => a.unlocked).length}/{achievements.length} {t('profile.unlocked')}
              </span>
            </div>
            <div className="grid grid-cols-1 gap-3 rounded-[28px] bg-white p-4 desktop-card border-none sm:grid-cols-2 xl:grid-cols-4">
              {achievements.map((a, i) => (<AchievementBadge key={a.label} {...a} delay={0.05 * i + 0.5} />))}
            </div>
          </div>

        </div>

        {/* Right Sidebar */}
        <div className="flex min-w-0 flex-col gap-5 px-5 md:px-0">

          <div className="hidden lg:block h-[280px]">
            <ProgressList total={totalCourses} completed={completedCourses} />
          </div>

          <ActivityHeatmapCard streak={streak} />

          {/* Settings Menu */}
          <div className="bg-white rounded-3xl overflow-hidden desktop-card border-none">
            <div className="px-5 py-4 border-b border-gray-50 bg-gradient-to-r from-gray-50 to-white">
              <h3 className="font-extrabold text-lg text-text-primary">{t('profile.settings')}</h3>
            </div>
            <div className="divide-y divide-gray-50">
              <MenuItem icon={UserRound} label={t('profile.editProfile')} value={displayName} color="#4FA3D1" onClick={() => setActivePanel('edit-profile')} />
              <MenuItem icon={Globe} label={t('profile.appLanguage')} value={getAppLanguageLabel(language)} color="#3498DB" onClick={() => setActivePanel('language')} />
              <MenuItem icon={BookOpen} label={t('profile.learningLanguage')} value={targetLanguageLabel} color="#0F766E" onClick={() => setActivePanel('target-language')} />
              <MenuItem icon={Bell} label={t('profile.notifications')} value={localPrefs.pushReminder ? t('profile.notificationsOn') : t('profile.notificationsOff')} color="#F39C12" onClick={() => setActivePanel('notifications')} />
              <MenuItem icon={Shield} label={t('profile.privacy')} value={localPrefs.profilePublic ? t('profile.privacyPublic') : t('profile.privacyPrivate')} color="#4FA3D1" onClick={() => setActivePanel('privacy')} />
              <MenuItem icon={Star} label={t('profile.rateUs')} value={localPrefs.rating ? `${localPrefs.rating}/5` : undefined} color="#FFD700" onClick={() => setActivePanel('rate')} />
              <MenuItem icon={MessageSquare} label={t('profile.supportFeedback')} value={SUPPORT_EMAIL} color="#10B981" onClick={() => setActivePanel('help')} />
              <MenuItem icon={HelpCircle} label={t('profile.helpCenter')} color="#9B59B6" onClick={() => setActivePanel('help')} />
              <div className="p-2">
                <button onClick={onLogout} className="w-full mt-2 bg-red-50 text-red-600 hover:bg-red-100 font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer">
                  <LogOut size={18} /> {t('profile.logOut')}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Progress List */}
          <div className="lg:hidden">
            <ProgressList total={totalCourses} completed={completedCourses} />
          </div>
        </div>

      </div>

      {activePanel === 'edit-profile' && (
        <ProfileModal title={t('profile.editProfile')} onClose={() => { setProfileSaved(false); setActivePanel(null); }}>
          <div className="space-y-5">
            <div className="flex items-center gap-2 rounded-2xl bg-primary/5 px-4 py-2.5 text-[11px] font-semibold text-primary">
              <Mail size={12} /> {user?.email || ''}
            </div>

            <AvatarEditor
              value={profileDraft.avatarUrl}
              displayName={profileDraft.displayName || displayName}
              fallback={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(profileDraft.displayName || displayName)}&backgroundColor=b6e3f4`}
              onChange={(next) => setProfileDraft((current) => ({ ...current, avatarUrl: next }))}
            />

            <label className="block">
              <span className="mb-1 block text-xs font-black uppercase tracking-wider text-text-muted">{t('profile.displayName')}</span>
              <input
                value={profileDraft.displayName}
                onChange={(event) => setProfileDraft((current) => ({ ...current, displayName: event.target.value }))}
                maxLength={40}
                className="h-12 w-full rounded-2xl border border-gray-200 px-4 text-sm font-bold outline-none focus:border-primary"
              />
              <p className="mt-1 text-[11px] font-semibold text-text-muted">{profileDraft.displayName.length}/40 karakter</p>
            </label>

            <div className="rounded-3xl border border-gray-100 bg-gray-50 p-4">
              <div className="mb-3 flex items-center gap-2">
                <div className="grid h-9 w-9 place-items-center rounded-2xl bg-white text-primary shadow-sm">
                  <Shield size={16} />
                </div>
                <div>
                  <p className="text-sm font-black text-text-primary">Ganti Password</p>
                  <p className="text-[11px] font-semibold text-text-muted">Kosongkan jika tidak ingin mengubah password.</p>
                </div>
              </div>

              <div className="grid gap-3">
                <label className="block">
                  <span className="mb-1 block text-[10px] font-black uppercase tracking-wider text-text-muted">Password Lama</span>
                  <input
                    type="password"
                    value={passwordDraft.current}
                    onChange={(event) => setPasswordDraft((current) => ({ ...current, current: event.target.value }))}
                    autoComplete="current-password"
                    placeholder="Masukkan password lama"
                    className="h-11 w-full rounded-2xl border border-gray-200 bg-white px-4 text-sm font-bold outline-none focus:border-primary"
                  />
                </label>
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1 block text-[10px] font-black uppercase tracking-wider text-text-muted">Password Baru</span>
                    <input
                      type="password"
                      value={passwordDraft.next}
                      onChange={(event) => setPasswordDraft((current) => ({ ...current, next: event.target.value }))}
                      autoComplete="new-password"
                      placeholder="Minimal 8 karakter"
                      className="h-11 w-full rounded-2xl border border-gray-200 bg-white px-4 text-sm font-bold outline-none focus:border-primary"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-[10px] font-black uppercase tracking-wider text-text-muted">Konfirmasi</span>
                    <input
                      type="password"
                      value={passwordDraft.confirm}
                      onChange={(event) => setPasswordDraft((current) => ({ ...current, confirm: event.target.value }))}
                      autoComplete="new-password"
                      placeholder="Ulangi password baru"
                      className="h-11 w-full rounded-2xl border border-gray-200 bg-white px-4 text-sm font-bold outline-none focus:border-primary"
                    />
                  </label>
                </div>
              </div>
            </div>

            {profileError && (
              <div className="flex items-start gap-2 rounded-xl bg-red-50 px-3 py-2 text-xs font-bold text-red-600">
                <XCircle size={14} className="mt-0.5 shrink-0" /> {profileError}
              </div>
            )}

            <button
              onClick={() => { void saveProfileDraft(); }}
              disabled={savingProfile || profileSaved}
              className={`flex h-12 w-full items-center justify-center gap-2 rounded-2xl text-sm font-black text-white transition-colors ${
                profileSaved ? 'bg-emerald-500' : 'bg-primary hover:bg-primary-dark'
              } disabled:opacity-80`}
            >
              {savingProfile ? (
                <><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" /> {t('profile.saving')}</>
              ) : profileSaved ? (
                <><CheckCircle2 size={16} /> {t('profile.saved')}</>
              ) : t('profile.saveProfile')}
            </button>
          </div>
        </ProfileModal>
      )}

      {activePanel === 'language' && (
        <ProfileModal title={t('profile.appLanguage')} onClose={() => setActivePanel(null)}>
          <AppLanguageSwitcher variant="card" onChange={() => setActivePanel(null)} />
        </ProfileModal>
      )}

      {activePanel === 'target-language' && (
        <ProfileModal title={t('profile.learningLanguage')} onClose={() => setActivePanel(null)}>
          <div className="grid grid-cols-2 gap-3">
            {targetLanguageOptions.map((item) => (
              <button
                key={item.value}
                onClick={() => handleTargetLanguage(item.value)}
                className={`rounded-2xl border-2 p-4 text-left ${targetLanguage === item.value ? 'border-primary bg-primary/10' : 'border-gray-100 bg-gray-50'}`}
              >
                <p className="font-black text-text-primary">{item.label}</p>
                <p className="text-xs font-semibold text-text-muted">{item.localLabel}</p>
                {targetLanguage === item.value && <CheckCircle2 className="mt-3 text-primary" size={18} />}
              </button>
            ))}
          </div>
          {savingLanguage && <p className="mt-3 text-xs font-semibold text-text-muted">{t('profile.savingChoice')}</p>}
        </ProfileModal>
      )}

      {activePanel === 'notifications' && (
        <ProfileModal title="Notifications" onClose={() => setActivePanel(null)}>
          <div className="space-y-3">
            <ToggleRow label="Daily reminder" description="Ingatkan jadwal belajar harian." checked={localPrefs.pushReminder} onChange={(checked) => updateLocalPrefs({ pushReminder: checked })} />
            <ToggleRow label="Streak warning" description="Beri peringatan sebelum streak putus." checked={localPrefs.streakReminder} onChange={(checked) => updateLocalPrefs({ streakReminder: checked })} />
            <ToggleRow label="Weekly digest" description="Kirim ringkasan progres mingguan." checked={localPrefs.emailDigest} onChange={(checked) => updateLocalPrefs({ emailDigest: checked })} />
            <button
              type="button"
              onClick={() => {
                if (!('Notification' in window)) {
                  globalThis.alert(language === 'id' ? 'Browser ini belum mendukung notifikasi.' : 'This browser does not support notifications.');
                  return;
                }
                Notification.requestPermission().then((permission) => {
                  if (permission === 'granted') {
                    new Notification('Fluently reminder', { body: 'Notification aktif. Saatnya lanjut belajar!' });
                  }
                });
              }}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-primary text-sm font-black text-white hover:bg-primary-dark"
            >
              <Bell size={16} /> Test browser notification
            </button>
          </div>
        </ProfileModal>
      )}

      {activePanel === 'privacy' && (
        <ProfileModal title="Privacy" onClose={() => setActivePanel(null)}>
          <div className="space-y-3">
            <ToggleRow label="Public profile" description="Izinkan learner lain melihat profil kamu." checked={localPrefs.profilePublic} onChange={(checked) => updateLocalPrefs({ profilePublic: checked })} />
            <ToggleRow label="Show on leaderboard" description="Tampilkan namamu di papan peringkat." checked={localPrefs.showLeaderboard} onChange={(checked) => updateLocalPrefs({ showLeaderboard: checked })} />
            <ToggleRow label="Share progress" description="Izinkan badge/progres tampil di komunitas." checked={localPrefs.shareProgress} onChange={(checked) => updateLocalPrefs({ shareProgress: checked })} />
            <a
              href="https://fluently.id/privacy.html"
              className="flex h-11 w-full items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white text-sm font-black text-text-secondary hover:border-primary hover:text-primary"
            >
              <Shield size={16} /> Open privacy policy
            </a>
          </div>
        </ProfileModal>
      )}

      {activePanel === 'rate' && (
        <ProfileModal title="Rate Fluently" onClose={() => setActivePanel(null)}>
          <div className="text-center">
            <p className="text-sm font-semibold text-text-secondary">Bagaimana pengalaman belajarmu sejauh ini?</p>
            <div className="mt-5 flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((score) => (
                <button
                  key={score}
                  onClick={() => { updateLocalPrefs({ rating: score }); setRatingStatus('idle'); setRatingError(''); }}
                  className="text-4xl transition-transform hover:scale-110"
                  aria-label={`Rate ${score} stars`}
                >
                  <Star className={score <= localPrefs.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'} size={38} />
                </button>
              ))}
            </div>
            <p className="mt-4 text-sm font-black text-text-primary">{localPrefs.rating ? `Thanks! ${localPrefs.rating}/5 saved.` : 'Tap a star to rate.'}</p>

            <textarea
              value={ratingMessage}
              onChange={(event) => { setRatingMessage(event.target.value); setRatingStatus('idle'); setRatingError(''); }}
              rows={4}
              placeholder="Ceritakan apa yang sudah bagus atau perlu diperbaiki..."
              className="mt-5 w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-left text-sm font-semibold text-text-primary outline-none transition focus:border-primary focus:bg-white"
              maxLength={1200}
            />
            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <button
                onClick={() => { void submitRatingFeedback(); }}
                disabled={ratingStatus === 'sending' || !localPrefs.rating}
                className={`flex h-11 flex-1 items-center justify-center gap-2 rounded-2xl text-sm font-black text-white transition ${
                  ratingStatus === 'sent' ? 'bg-emerald-500' : 'bg-primary hover:bg-primary-dark'
                } disabled:opacity-50`}
              >
                {ratingStatus === 'sending' ? (
                  <><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" /> Mengirim...</>
                ) : ratingStatus === 'sent' ? (
                  <><CheckCircle2 size={16} /> Terkirim</>
                ) : (
                  <><Send size={16} /> Send feedback</>
                )}
              </button>
              <a
                href={buildSupportMailto({
                  category: 'feedback',
                  subject: localPrefs.rating ? `Rating ${localPrefs.rating}/5` : 'Fluently feedback',
                  message: ratingMessage || 'Saya ingin memberi masukan untuk Fluently.',
                  name: displayName,
                  email: user?.email || '',
                  rating: localPrefs.rating || undefined,
                })}
                className="flex h-11 flex-1 items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white text-sm font-black text-text-secondary hover:border-primary hover:text-primary"
              >
                <Mail size={16} /> Email support
              </a>
            </div>
            {ratingError && <p className="mt-3 text-xs font-bold text-red-500">{ratingError}</p>}
            <p className="mt-3 text-[11px] font-semibold text-text-muted">
              Feedback dikirim ke {SUPPORT_EMAIL}. Jika server email belum aktif, gunakan tombol Email support.
            </p>
          </div>
        </ProfileModal>
      )}

      {activePanel === 'help' && (
        <ProfileModal title="Help Center" onClose={() => setActivePanel(null)}>
          <div className="space-y-4">
            <div className="rounded-3xl border border-primary/10 bg-primary/5 p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary text-white">
                  <LifeBuoy size={19} />
                </div>
                <div>
                  <p className="font-black text-text-primary">Support & Feedback</p>
                  <p className="mt-1 text-sm font-semibold leading-relaxed text-text-secondary">
                    Kirim bug, pertanyaan, billing issue, atau ide produk langsung ke {SUPPORT_EMAIL}.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-gray-100 bg-white p-4 shadow-sm">
              <div className="grid grid-cols-2 gap-2">
                {supportCategories.map(({ value, label, icon: Icon }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => { setSupportDraft((current) => ({ ...current, category: value })); setSupportStatus('idle'); setSupportError(''); }}
                    className={`flex items-center justify-center gap-2 rounded-2xl border-2 px-3 py-2.5 text-xs font-black transition ${
                      supportDraft.category === value
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-gray-100 bg-gray-50 text-text-secondary hover:border-primary/30'
                    }`}
                  >
                    <Icon size={14} /> {label}
                  </button>
                ))}
              </div>

              <input
                value={supportDraft.subject}
                onChange={(event) => { setSupportDraft((current) => ({ ...current, subject: event.target.value })); setSupportStatus('idle'); setSupportError(''); }}
                placeholder="Subject"
                maxLength={120}
                className="mt-3 h-12 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 text-sm font-bold text-text-primary outline-none focus:border-primary focus:bg-white"
              />
              <textarea
                value={supportDraft.message}
                onChange={(event) => { setSupportDraft((current) => ({ ...current, message: event.target.value })); setSupportStatus('idle'); setSupportError(''); }}
                rows={5}
                placeholder="Tulis pesanmu di sini..."
                maxLength={4000}
                className="mt-3 w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-semibold text-text-primary outline-none focus:border-primary focus:bg-white"
              />

              <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                <button
                  onClick={() => { void submitSupport(); }}
                  disabled={supportStatus === 'sending'}
                  className={`flex h-11 flex-1 items-center justify-center gap-2 rounded-2xl text-sm font-black text-white transition ${
                    supportStatus === 'sent' ? 'bg-emerald-500' : 'bg-primary hover:bg-primary-dark'
                  } disabled:opacity-70`}
                >
                  {supportStatus === 'sending' ? (
                    <><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" /> Mengirim...</>
                  ) : supportStatus === 'sent' ? (
                    <><CheckCircle2 size={16} /> Terkirim</>
                  ) : (
                    <><Send size={16} /> Send to support</>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => openSupportEmail()}
                  className="flex h-11 flex-1 items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white text-sm font-black text-text-secondary hover:border-primary hover:text-primary"
                >
                  <Mail size={16} /> Open email app
                </button>
              </div>

              {supportStatus === 'sent' && (
                <p className="mt-3 rounded-xl bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700">
                  Pesan terkirim ke {SUPPORT_EMAIL}. Terima kasih sudah bantu improve Fluently.
                </p>
              )}
              {supportError && (
                <p className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-xs font-bold text-red-600">
                  {supportError}. Kamu tetap bisa pakai Open email app.
                </p>
              )}
            </div>

            {[
              ['Bagaimana mengganti bahasa modul?', 'Buka Bahasa yang dipelajari, pilih bahasa baru, lalu halaman Modul akan mengikuti pilihan itu.'],
              ['Apakah perlu API key sendiri?', 'Tidak. Semua fitur AI memakai default key Kie dari Fluently lewat backend.'],
              ['Di mana data profile disimpan?', 'Preferensi profile disimpan lokal di browser ini. Data akun utama tetap memakai session login.'],
            ].map(([q, a]) => (
              <div key={q} className="rounded-2xl bg-gray-50 p-4">
                <p className="font-black text-text-primary">{q}</p>
                <p className="mt-1 text-sm font-semibold leading-relaxed text-text-secondary">{a}</p>
              </div>
            ))}
          </div>
        </ProfileModal>
      )}
    </PageContainer>
  );
}
