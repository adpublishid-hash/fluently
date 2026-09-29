import { motion } from 'framer-motion';
import { Settings, ChevronRight, ChevronDown, BookOpen, Flame, Trophy, Zap, Star, Bell, Globe, LogOut, Shield, HelpCircle, Activity, CheckCircle2, XCircle, Pencil, Mail, UserRound, Upload, Image as ImageIcon, Link2, Sparkles, Trash2, Camera, MessageSquare, Send, Bug, LifeBuoy, KeyRound, Lock, X } from 'lucide-react';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import PageContainer from '../components/layout/PageContainer';
import { useLanguage } from '../i18n/LanguageContext';
import { useAuth } from '../auth/AuthContext';
import { getTargetLanguageLabel, targetLanguageOptions, type TargetLanguage } from '../features/chat/targetLanguage';
import AppLanguageSwitcher, { getAppLanguageLabel } from '../components/shared/AppLanguageSwitcher';
import ActivityYearModal from '../components/shared/ActivityYearModal';
import { FOCUS_SESSION_EVENT, getFocusSessions, getTodayFocusMinutes, getTotalFocusMinutes, type FocusSession } from '../utils/focusTimer';
import { AI_QUOTA_CHANGED_EVENT, getStudioKey, openAiKeyPrompt } from '../services/aiClient';

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

type ProfilePanel = 'edit-profile' | 'language' | 'target-language' | 'notifications' | 'privacy' | 'rate' | 'help' | 'logout' | null;
type SupportCategory = 'support' | 'bug' | 'feedback' | 'billing';
type SendStatus = 'idle' | 'sending' | 'sent' | 'error';

const LOCAL_PREFS_KEY = 'fluently_profile_prefs_v2';
const SUPPORT_EMAIL = 'support@fluently.id';
const XP_PER_LEVEL = 3000;

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

function MenuItem({ icon: Icon, label, description, value, status, color, onClick }: {
  icon: React.ElementType;
  label: string;
  description?: string;
  value?: string;
  // Coloured pill for on/off style values; plain muted text otherwise.
  status?: { label: string; tone: 'on' | 'off' };
  color: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full cursor-pointer items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors hover:bg-gray-50 focus-visible:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: `${color}1A` }}>
        <Icon size={17} style={{ color }} />
      </div>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[14px] font-bold text-text-primary">{label}</span>
        {description && <span className="mt-0.5 block truncate text-[11.5px] font-medium text-text-muted">{description}</span>}
      </span>
      {status && (
        <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-bold ${
          status.tone === 'on' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-text-muted'
        }`}>
          <span className={`h-1.5 w-1.5 rounded-full ${status.tone === 'on' ? 'bg-emerald-500' : 'bg-gray-300'}`} />
          {status.label}
        </span>
      )}
      {value && <span className="max-w-[120px] shrink-0 truncate text-[12.5px] font-semibold text-text-muted">{value}</span>}
      <ChevronRight size={16} className="shrink-0 text-gray-300 transition-all group-hover:translate-x-0.5 group-hover:text-primary-dark" />
    </button>
  );
}

function SettingsSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="px-3 pb-1 text-[10.5px] font-black uppercase tracking-[0.08em] text-text-muted">{title}</p>
      <div className="flex flex-col">{children}</div>
    </div>
  );
}

function ToggleRow({ label, description, checked, onChange }: {
  label: string; description: string; checked: boolean; onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-4 transition-colors hover:border-primary/30">
      <span>
        <span className="block text-sm font-black text-text-primary">{label}</span>
        <span className="mt-0.5 block text-xs font-semibold text-text-muted">{description}</span>
      </span>
      <input
        type="checkbox"
        role="switch"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="peer sr-only"
      />
      <span
        aria-hidden="true"
        className="relative h-6 w-11 shrink-0 rounded-full bg-gray-300 transition-colors peer-checked:bg-primary-dark peer-focus-visible:ring-2 peer-focus-visible:ring-primary/50 peer-focus-visible:ring-offset-2 after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:transition-transform peer-checked:after:translate-x-5"
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

function ProfileModal({ title, children, onClose, size = 'lg' }: {
  title: string; children: React.ReactNode; onClose: () => void; size?: 'sm' | 'lg';
}) {
  const { t } = useLanguage();
  const titleId = React.useId();

  // Esc closes the sheet, and the page behind it stops scrolling while it is open.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  // Portal to <body>: PageContainer animates transform/filter, which would otherwise
  // trap this fixed overlay inside the page box instead of covering the viewport.
  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-900/40 px-3 pb-3 pt-16 backdrop-blur-sm md:items-center md:p-6"
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', damping: 26, stiffness: 320 }}
        onClick={(event) => event.stopPropagation()}
        className={`max-h-[88vh] w-full ${size === 'sm' ? 'max-w-sm' : 'max-w-lg'} overflow-y-auto rounded-[28px] bg-white shadow-2xl`}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-gray-100 bg-white/95 px-5 py-4 backdrop-blur">
          <h3 id={titleId} className="text-lg font-black text-text-primary">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label={t('profile.close')}
            autoFocus
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-text-secondary transition-colors hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          >
            <X size={17} />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </motion.div>
    </div>,
    document.body,
  );
}

function AchievementBadge({
  emoji,
  label,
  unlocked,
  progress,
  requirement,
  highlight,
  delay,
}: {
  emoji: string;
  label: string;
  unlocked: boolean;
  progress: number;
  requirement: string;
  highlight?: boolean;
  delay: number;
}) {
  const { t } = useLanguage();
  return (
    <motion.div
      className={`relative flex flex-col overflow-hidden rounded-3xl border p-3.5 text-left transition-all duration-300 ${
        unlocked
          ? 'border-primary/25 bg-gradient-to-br from-sky-50 via-white to-white shadow-sm hover:-translate-y-0.5 hover:shadow-md'
          : highlight
            ? 'border-amber-200 bg-amber-50/40'
            : 'border-gray-100 bg-white'
      }`}
      initial={{ opacity: 0, y: 10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl text-[26px] ${
          unlocked ? 'bg-white shadow-sm ring-1 ring-primary/20' : 'bg-gray-50 opacity-60 grayscale'
        }`}>
          {emoji}
        </div>
        {unlocked ? (
          <CheckCircle2 size={18} className="text-emerald-500" aria-label={t('profile.unlocked')} />
        ) : highlight ? (
          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-black text-amber-700">{t('profile.nextTarget')}</span>
        ) : (
          <Lock size={14} className="text-gray-300" aria-label={t('profile.badgeLocked')} />
        )}
      </div>
      <p className={`mt-3 text-[13.5px] font-black leading-tight ${unlocked ? 'text-text-primary' : 'text-text-secondary'}`}>{label}</p>
      <p className="mt-1 flex-1 text-[11px] font-semibold leading-snug text-text-muted">{requirement}</p>
      <div className="mt-3 flex items-center gap-2">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100">
          <motion.div
            className={`h-full rounded-full ${unlocked ? 'bg-emerald-500' : highlight ? 'bg-amber-400' : 'bg-primary'}`}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ delay: delay + 0.15, duration: 0.7, ease: 'easeOut' }}
          />
        </div>
        <span className="w-8 text-right text-[10.5px] font-black text-text-muted">{progress}%</span>
      </div>
    </motion.div>
  );
}

function formatMinutes(total: number) {
  const hours = Math.floor(total / 60);
  const minutes = total % 60;
  if (!hours) return `${minutes}m`;
  return minutes ? `${hours}h ${minutes}m` : `${hours}h`;
}

// Lessons/modules from localStorage plus focus sessions, refreshed whenever another tab,
// the focus timer, or a return to this window may have changed them.
function useLearningSnapshot() {
  const [summary, setSummary] = useState(() => countStoredLearningProgress());
  const [focusSessions, setFocusSessions] = useState<FocusSession[]>(getFocusSessions);

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

  return { summary, focusSessions };
}

const HEATMAP_COLORS = ['#F3F4F6', '#BBF7D0', '#86EFAC', '#4ADE80', '#22C55E'];

function ActivityHeatmapCard({ streak, sessions, modules }: { streak: number; sessions: FocusSession[]; modules: number }) {
  const { t, language } = useLanguage();
  const [showYearModal, setShowYearModal] = useState(false);
  const grid = buildActivityGrid(sessions);
  const todayFocus = getTodayFocusMinutes(sessions);
  const totalFocus = getTotalFocusMinutes(sessions);
  // The grid's last column is today, so label each column with its real weekday.
  const dayLabels = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));
    return new Intl.DateTimeFormat(language === 'id' ? 'id-ID' : 'en-US', { weekday: 'narrow' }).format(date);
  });

  return (
    <>
    <div className="bg-white rounded-3xl p-5 desktop-card border-none">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Activity size={18} className="text-emerald-500" />
          <h3 className="text-base font-extrabold text-text-primary">{t('sidebar.activity')}</h3>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-orange-50 px-3 py-1" title={`${streak} ${t('profile.dayStreakLabel')}`}>
          <Flame size={14} className="text-orange-500" />
          <span className="text-xs font-black text-orange-600">{streak} {t('profile.dayStreakLabel')}</span>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] md:items-center">
        <div>
          <div className="mb-2 grid grid-cols-7 gap-1.5">
            {dayLabels.map((day, index) => (
              <span key={`${day}-${index}`} className="text-center text-[10.5px] font-black text-text-muted">
                {day}
              </span>
            ))}
          </div>
          <div className="space-y-1.5">
            {grid.map((week, weekIndex) => (
              <div key={weekIndex} className="grid grid-cols-7 gap-1.5">
                {week.map((levelValue, dayIndex) => {
                  const isToday = weekIndex === grid.length - 1 && dayIndex === 6;
                  return (
                    <motion.div
                      key={`${weekIndex}-${dayIndex}`}
                      title={levelValue ? `${t('sidebar.activity')} ${levelValue}/4` : t('activity.noActivity')}
                      className={`aspect-square max-h-10 w-full rounded-lg ${isToday ? 'ring-2 ring-emerald-500 ring-offset-1' : ''}`}
                      style={{ backgroundColor: HEATMAP_COLORS[levelValue] ?? HEATMAP_COLORS[4] }}
                      initial={{ scale: 0.75, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: (weekIndex * 7 + dayIndex) * 0.02 }}
                    />
                  );
                })}
              </div>
            ))}
          </div>
          <div className="mt-2 flex items-center justify-end gap-1 text-[10px] font-bold text-text-muted">
            <span>{t('activity.less')}</span>
            {HEATMAP_COLORS.map((color) => <span key={color} className="h-2.5 w-2.5 rounded-[4px]" style={{ backgroundColor: color }} />)}
            <span>{t('activity.more')}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 md:grid-cols-1">
          {[
            { label: t('profile.focusToday'), value: formatMinutes(todayFocus), tone: 'bg-emerald-50 text-emerald-700' },
            { label: t('profile.focusTotal'), value: formatMinutes(totalFocus), tone: 'bg-sky-50 text-sky-700' },
            { label: t('profile.modulesStarted'), value: String(modules), tone: 'bg-violet-50 text-violet-700' },
          ].map((item) => (
            <div key={item.label} className={`rounded-2xl px-3 py-2.5 ${item.tone}`}>
              <p className="text-lg font-black leading-tight">{item.value}</p>
              <p className="mt-0.5 text-[10.5px] font-bold leading-tight opacity-80">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setShowYearModal(true)}
        className="mt-4 flex w-full items-center justify-center gap-1 rounded-xl py-2 text-[12px] font-bold text-text-secondary transition-colors hover:bg-gray-50 hover:text-primary-dark"
      >
        <span>{t('activity.viewYear')}</span>
        <ChevronRight size={14} />
      </button>
    </div>

    <ActivityYearModal
      open={showYearModal}
      onClose={() => setShowYearModal(false)}
      sessions={sessions}
      streak={streak}
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
  const xpInLevel = xp % XP_PER_LEVEL;

  const [profileDraft, setProfileDraft] = useState({ displayName, avatarUrl });
  const [passwordDraft, setPasswordDraft] = useState({ current: '', next: '', confirm: '' });
  const [profileError, setProfileError] = useState('');
  const [profileSaved, setProfileSaved] = useState(false);

  const [showAllBadges, setShowAllBadges] = useState(false);
  const [hasStudioKey, setHasStudioKey] = useState(() => Boolean(getStudioKey()));
  const { summary, focusSessions } = useLearningSnapshot();
  const settingsRef = useRef<HTMLDivElement | null>(null);
  const closePanel = useCallback(() => setActivePanel(null), []);

  const targetLanguage = user?.persona?.targetLanguage || 'English';
  const targetLanguageLabel = getTargetLanguageLabel(targetLanguage);
  const targetLanguageShort = targetLanguageOptions.find((item) => item.value === targetLanguage)?.label ?? targetLanguageLabel;
  const planLabel = user?.plan === 'lifetime'
    ? t('profile.planLifetime')
    : user?.plan === 'pro'
      ? t('profile.planPro')
      : t('profile.planFree');

  useEffect(() => {
    saveLocalPrefs(localPrefs);
  }, [localPrefs]);

  // The AI key is managed by the global AiKeyPrompt; keep the settings row status in sync.
  useEffect(() => {
    const sync = () => setHasStudioKey(Boolean(getStudioKey()));
    window.addEventListener(AI_QUOTA_CHANGED_EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(AI_QUOTA_CHANGED_EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

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

  const pct = (current: number, target: number) => Math.min(100, Math.round((current / target) * 100));
  const achievements = [
    { emoji: '🔥', label: t('achievement.7DayStreak'),   progress: pct(streak, 7),                requirement: t('achievement.req.7DayStreak') },
    { emoji: '📚', label: t('achievement.bookworm'),     progress: pct(summary.lessons, 3),       requirement: t('achievement.req.bookworm') },
    { emoji: '⭐', label: t('achievement.starStudent'),  progress: pct(xp, 2000),                 requirement: t('achievement.req.starStudent') },
    { emoji: '🏆', label: t('achievement.top10'),        progress: 0,                             requirement: t('achievement.req.top10') },
    { emoji: '💎', label: t('achievement.diamond'),      progress: pct(xp, 5000),                 requirement: t('achievement.req.diamond') },
    { emoji: '🚀', label: t('achievement.speedLearner'), progress: pct(focusSessions.length, 5),  requirement: t('achievement.req.speedLearner') },
    { emoji: '🎯', label: t('achievement.perfectScore'), progress: 0,                             requirement: t('achievement.req.perfectScore') },
    { emoji: '👑', label: t('achievement.master'),       progress: 0,                             requirement: t('achievement.req.master') },
  ]
    .map((badge) => ({ ...badge, unlocked: badge.progress >= 100 }))
    // Unlocked first, then the closest targets, so the useful cards lead.
    .sort((a, b) => Number(b.unlocked) - Number(a.unlocked) || b.progress - a.progress);
  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const nextTarget = achievements.find((a) => !a.unlocked && a.progress > 0) ?? achievements.find((a) => !a.unlocked);
  const visibleBadges = showAllBadges ? achievements : achievements.slice(0, 4);

  const scrollToSettings = () => {
    settingsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <PageContainer>
      <div className="grid h-full gap-6 pb-8 md:px-5 lg:grid-cols-[minmax(0,1fr)_380px] lg:px-8">

        {/* Main Column */}
        <div className="min-w-0 flex flex-col gap-5 pt-4 md:pt-0">

          <div className="flex items-center justify-between px-5 pt-6 md:pt-0 md:px-0">
            <h1 className="text-2xl font-extrabold text-text-primary">{t('profile.title')}</h1>
            <motion.button
              type="button"
              whileTap={{ scale: 0.9 }}
              onClick={scrollToSettings}
              aria-label={t('profile.settings')}
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center cursor-pointer shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors lg:hidden"
            >
              <Settings size={20} className="text-text-secondary" />
            </motion.button>
          </div>

          {/* Profile Card */}
          <motion.div className="mx-5 md:mx-0 bg-white rounded-[30px] p-5 md:p-6 relative overflow-hidden desktop-card border-none"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-primary/10" />
            <div className="pointer-events-none absolute -right-4 top-16 h-24 w-24 rounded-full bg-primary/5" />
            <div className="relative z-10 flex flex-col items-center gap-5 md:flex-row md:items-center">
              <div className="relative shrink-0">
                <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-white bg-white shadow-xl ring-4 ring-primary/20 md:h-28 md:w-28">
                  <img src={avatarUrl} alt={displayName} className="w-full h-full object-cover" />
                </div>
                <button
                  type="button"
                  onClick={() => setActivePanel('edit-profile')}
                  aria-label={t('profile.changePhoto')}
                  className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary-dark text-white shadow-md ring-[3px] ring-white transition-transform hover:scale-105"
                >
                  <Camera size={14} />
                </button>
              </div>

              <div className="w-full min-w-0 flex-1">
                <div className="flex flex-col items-center gap-3 md:flex-row md:items-start md:justify-between">
                  <div className="min-w-0 text-center md:text-left">
                    <h2 className="truncate text-2xl md:text-[28px] font-black text-text-primary tracking-tight">{displayName}</h2>
                    {user?.email && <p className="mt-0.5 truncate text-[13px] font-semibold text-text-muted">{user.email}</p>}
                    <div className="mt-2.5 flex flex-wrap items-center justify-center gap-1.5 md:justify-start">
                      <span className="rounded-full bg-primary/15 px-2.5 py-1 text-[11px] font-black text-primary-dark">
                        {t('profile.levelProgress')} {level} · {t('profile.levelLearner')}
                      </span>
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-black ${
                        user?.plan && user.plan !== 'free' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-text-secondary'
                      }`}>
                        {user?.plan && user.plan !== 'free' && <Sparkles size={11} />}
                        {planLabel}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActivePanel('edit-profile')}
                    className="flex h-10 shrink-0 items-center gap-1.5 rounded-xl border border-primary/25 bg-white px-4 text-[13px] font-black text-primary-dark shadow-sm transition-colors hover:bg-primary/10"
                  >
                    <Pencil size={14} />
                    {t('profile.editProfile')}
                  </button>
                </div>

                <div className="mt-5 border-t border-gray-100 pt-4">
                  <div className="flex items-center justify-between text-[13px] mb-2">
                    <span className="font-bold text-text-secondary">
                      {(XP_PER_LEVEL - xpInLevel).toLocaleString()} {t('profile.xpToLevel')} {level + 1}
                    </span>
                    <span className="font-black text-primary-dark">{xpInLevel.toLocaleString()} <span className="text-text-muted font-semibold">/ {XP_PER_LEVEL.toLocaleString()} XP</span></span>
                  </div>
                  <div
                    className="h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner"
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={XP_PER_LEVEL}
                    aria-valuenow={xpInLevel}
                  >
                    <motion.div className="h-full rounded-full relative" style={{ background: 'linear-gradient(90deg, #4FA3D1, #1E6F9F)' }}
                      initial={{ width: 0 }} animate={{ width: `${(xpInLevel / XP_PER_LEVEL) * 100}%` }} transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}>
                      <div className="absolute top-0 right-0 bottom-0 w-8 bg-white/20 skew-x-[-20deg]" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid — real numbers only */}
          <div className="grid grid-cols-2 gap-3 px-5 md:grid-cols-4 md:px-0">
            <StatCard icon={BookOpen} label={t('profile.lessonsDone')} value={summary.lessons} color="#4FA3D1" delay={0.1} />
            <StatCard icon={Zap} label={t('profile.totalXP')} value={xp >= 1000 ? `${(xp / 1000).toFixed(1)}k` : String(xp)} color="#F39C12" delay={0.2} />
            <StatCard icon={Flame} label={t('profile.dayStreak')} value={streak} color="#E74C3C" delay={0.3} />
            <StatCard icon={Trophy} label={t('profile.currentLevel')} value={level} color="#8B5CF6" delay={0.4} />
          </div>

          <div className="px-5 md:px-0">
            <ActivityHeatmapCard streak={streak} sessions={focusSessions} modules={summary.sources} />
          </div>

          {/* Achievements */}
          <div className="px-5 md:px-0">
            <div className="flex items-end justify-between gap-3 mb-3">
              <div className="min-w-0">
                <h3 className="font-extrabold text-lg text-text-primary">{t('profile.yourBadges')}</h3>
                <p className="mt-0.5 text-xs font-semibold text-text-muted">
                  {nextTarget ? `${t('profile.nextTarget')}: ${nextTarget.label}` : t('profile.badgesSubtitle')}
                </p>
              </div>
              <span className="shrink-0 text-[12px] bg-primary/10 text-primary-dark font-black px-3 py-1 rounded-full">
                {unlockedCount}/{achievements.length} {t('profile.unlocked')}
              </span>
            </div>
            <div className="rounded-[28px] bg-white p-3 desktop-card border-none sm:p-4">
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3 xl:grid-cols-4">
                {visibleBadges.map((a, i) => (
                  <AchievementBadge key={a.label} {...a} highlight={a === nextTarget} delay={0.04 * i + 0.3} />
                ))}
              </div>
              <button
                type="button"
                onClick={() => setShowAllBadges((current) => !current)}
                aria-expanded={showAllBadges}
                className="mt-3 flex w-full items-center justify-center gap-1 rounded-xl py-2 text-[12px] font-bold text-text-secondary transition-colors hover:bg-gray-50 hover:text-primary-dark"
              >
                {showAllBadges ? t('profile.showFewerBadges') : `${t('profile.showAllBadges')} (${achievements.length})`}
                <ChevronDown size={14} className={`transition-transform ${showAllBadges ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>

        </div>

        {/* Settings column — sticky on desktop so it is always one glance away */}
        <div className="min-w-0 px-5 md:px-0">
          <div
            ref={settingsRef}
            id="profile-settings"
            className="scroll-mt-4 bg-white rounded-3xl desktop-card border-none lg:sticky lg:top-6"
          >
            <div className="px-5 pt-5 pb-3">
              <h3 className="font-extrabold text-lg text-text-primary">{t('profile.settings')}</h3>
              <p className="mt-0.5 text-xs font-semibold text-text-muted">{t('profile.settingsSubtitle')}</p>
            </div>

            <div className="flex flex-col gap-4 px-2 pb-2">
              <SettingsSection title={t('profile.sectionAccount')}>
                <MenuItem icon={UserRound} label={t('profile.editProfile')} description={t('profile.editProfileHint')} color="#4FA3D1" onClick={() => setActivePanel('edit-profile')} />
              </SettingsSection>

              <SettingsSection title={t('profile.sectionPreferences')}>
                <MenuItem icon={Globe} label={t('profile.appLanguage')} value={getAppLanguageLabel(language)} color="#3498DB" onClick={() => setActivePanel('language')} />
                <MenuItem icon={BookOpen} label={t('profile.learningLanguage')} value={targetLanguageShort} color="#0F766E" onClick={() => setActivePanel('target-language')} />
                <MenuItem
                  icon={Bell}
                  label={t('profile.notifications')}
                  status={localPrefs.pushReminder
                    ? { label: t('profile.notificationsOn'), tone: 'on' }
                    : { label: t('profile.notificationsOff'), tone: 'off' }}
                  color="#F39C12"
                  onClick={() => setActivePanel('notifications')}
                />
                <MenuItem icon={Shield} label={t('profile.privacy')} value={localPrefs.profilePublic ? t('profile.privacyPublic') : t('profile.privacyPrivate')} color="#6366F1" onClick={() => setActivePanel('privacy')} />
              </SettingsSection>

              <SettingsSection title={t('profile.sectionAi')}>
                <MenuItem
                  icon={KeyRound}
                  label={t('profile.aiKey')}
                  description={t('profile.aiKeyHint')}
                  status={hasStudioKey
                    ? { label: t('profile.aiKeyActive'), tone: 'on' }
                    : { label: t('profile.aiKeyNotSet'), tone: 'off' }}
                  color="#7C3AED"
                  onClick={() => openAiKeyPrompt()}
                />
              </SettingsSection>

              <SettingsSection title={t('profile.sectionSupport')}>
                <MenuItem icon={HelpCircle} label={t('profile.supportFeedback')} description={t('profile.helpHint')} color="#10B981" onClick={() => setActivePanel('help')} />
                <MenuItem icon={Star} label={t('profile.rateUs')} value={localPrefs.rating ? `${localPrefs.rating}/5 ★` : undefined} color="#EAB308" onClick={() => setActivePanel('rate')} />
              </SettingsSection>
            </div>

            <div className="border-t border-gray-100 p-3">
              <button
                type="button"
                onClick={() => setActivePanel('logout')}
                className="flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-[14px] font-bold text-red-500 transition-colors hover:bg-red-50 cursor-pointer"
              >
                <LogOut size={17} /> {t('profile.logOut')}
              </button>
            </div>
          </div>
        </div>

      </div>

      {activePanel === 'logout' && (
        <ProfileModal title={t('profile.logOut')} onClose={closePanel} size="sm">
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
              <LogOut size={24} />
            </div>
            <p className="mt-4 text-base font-black text-text-primary">{t('profile.logOutConfirm')}</p>
            <p className="mt-1 text-sm font-semibold leading-relaxed text-text-muted">{t('profile.logOutConfirmDesc')}</p>
            <div className="mt-5 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={closePanel}
                className="h-11 rounded-2xl border border-gray-200 bg-white text-sm font-black text-text-secondary hover:bg-gray-50"
              >
                {t('profile.cancel')}
              </button>
              <button
                type="button"
                onClick={() => { closePanel(); onLogout?.(); }}
                className="h-11 rounded-2xl bg-red-500 text-sm font-black text-white hover:bg-red-600"
              >
                {t('profile.logOut')}
              </button>
            </div>
          </div>
        </ProfileModal>
      )}
      {activePanel === 'edit-profile' && (
        <ProfileModal title={t('profile.editProfile')} onClose={closePanel}>
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
        <ProfileModal title={t('profile.appLanguage')} onClose={closePanel}>
          <AppLanguageSwitcher variant="card" onChange={closePanel} />
        </ProfileModal>
      )}

      {activePanel === 'target-language' && (
        <ProfileModal title={t('profile.learningLanguage')} onClose={closePanel}>
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
        <ProfileModal title={t('profile.notifications')} onClose={closePanel}>
          <div className="space-y-3">
            <ToggleRow label={t('profile.dailyReminder')} description={t('profile.dailyReminderDesc')} checked={localPrefs.pushReminder} onChange={(checked) => updateLocalPrefs({ pushReminder: checked })} />
            <ToggleRow label={t('profile.streakWarning')} description={t('profile.streakWarningDesc')} checked={localPrefs.streakReminder} onChange={(checked) => updateLocalPrefs({ streakReminder: checked })} />
            <ToggleRow label={t('profile.weeklyDigest')} description={t('profile.weeklyDigestDesc')} checked={localPrefs.emailDigest} onChange={(checked) => updateLocalPrefs({ emailDigest: checked })} />
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
              <Bell size={16} /> {t('profile.testNotification')}
            </button>
          </div>
        </ProfileModal>
      )}

      {activePanel === 'privacy' && (
        <ProfileModal title={t('profile.privacy')} onClose={closePanel}>
          <div className="space-y-3">
            <ToggleRow label={t('profile.publicProfile')} description={t('profile.publicProfileDesc')} checked={localPrefs.profilePublic} onChange={(checked) => updateLocalPrefs({ profilePublic: checked })} />
            <ToggleRow label={t('profile.showLeaderboard')} description={t('profile.showLeaderboardDesc')} checked={localPrefs.showLeaderboard} onChange={(checked) => updateLocalPrefs({ showLeaderboard: checked })} />
            <ToggleRow label={t('profile.shareProgress')} description={t('profile.shareProgressDesc')} checked={localPrefs.shareProgress} onChange={(checked) => updateLocalPrefs({ shareProgress: checked })} />
            <a
              href="https://fluently.id/privacy.html"
              className="flex h-11 w-full items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white text-sm font-black text-text-secondary hover:border-primary hover:text-primary"
            >
              <Shield size={16} /> {t('profile.openPrivacyPolicy')}
            </a>
          </div>
        </ProfileModal>
      )}

      {activePanel === 'rate' && (
        <ProfileModal title={t('profile.rateUs')} onClose={closePanel}>
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
        <ProfileModal title={t('profile.supportFeedback')} onClose={closePanel}>
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
              ['Apakah perlu API key sendiri?', 'Tidak wajib. Fluently memberi kuota AI harian. Kalau kuota habis, tambahkan key gratis Google AI Studio lewat Pengaturan → Key Google AI Studio.'],
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
