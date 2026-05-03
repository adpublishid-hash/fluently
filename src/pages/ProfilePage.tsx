import { motion } from 'framer-motion';
import { Settings, ChevronRight, BookOpen, Flame, Trophy, Zap, Star, Bell, Globe, LogOut, Shield, HelpCircle, Activity, KeyRound, Volume2, CheckCircle2, XCircle, Eye, EyeOff, Cpu, Pencil, Mail, UserRound, Upload, Image as ImageIcon, Link2, Sparkles, Trash2, Camera } from 'lucide-react';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import PageContainer from '../components/layout/PageContainer';
import { useLanguage } from '../i18n/LanguageContext';
import { useAuth } from '../auth/AuthContext';
import { getTargetLanguageLabel, targetLanguageOptions, type TargetLanguage } from '../features/chat/targetLanguage';
import {
  getApiKey, saveApiKey, removeApiKey, hasApiKey, getMaskedKey,
  getPreferredVoice, setPreferredVoice, getPreferredModel, setPreferredModel,
  speakText, TTS_VOICES, TTS_MODELS,
} from '../services/ttsService';
import type { TTSVoice, TTSModel } from '../services/ttsService';

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

const LOCAL_PREFS_KEY = 'fluently_profile_prefs_v2';

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
  { label: 'Avataaars', style: 'avataaars', seeds: ['Karina', 'Aiden', 'Mia', 'Leo', 'Nova', 'Theo'] },
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
          <p className="font-black text-text-primary truncate">{displayName || 'Display Name'}</p>
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

// ─────────────────────────────────────────────────────────────────────────────
// BYOK Panel — full section for Profile page
// ─────────────────────────────────────────────────────────────────────────────

function BYOKPanel() {
  const [keyInput, setKeyInput] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [keyStatus, setKeyStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [errMsg, setErrMsg] = useState('');
  const [currentKey, setCurrentKey] = useState<string | null>(null);
  const [voice, setVoice] = useState<TTSVoice>(getPreferredVoice());
  const [model, setModel] = useState<TTSModel>(getPreferredModel());
  const [testState, setTestState] = useState<'idle' | 'loading' | 'playing'>('idle');
  const [testErr, setTestErr] = useState('');

  useEffect(() => { setCurrentKey(getApiKey()); }, []);

  const handleSave = () => {
    const k = keyInput.trim();
    if (!k) { setErrMsg('API key tidak boleh kosong.'); setKeyStatus('error'); return; }
    if (!k.startsWith('sk-')) { setErrMsg('OpenAI API key harus dimulai dengan "sk-".'); setKeyStatus('error'); return; }
    setKeyStatus('saving');
    saveApiKey(k);
    setCurrentKey(k);
    setKeyInput('');
    setErrMsg('');
    setKeyStatus('saved');
    setTimeout(() => setKeyStatus('idle'), 2000);
  };

  const handleDelete = () => { removeApiKey(); setCurrentKey(null); setKeyStatus('idle'); };

  const handleVoiceChange = (v: TTSVoice) => { setVoice(v); setPreferredVoice(v); };
  const handleModelChange = (m: TTSModel) => { setModel(m); setPreferredModel(m); };

  const handleTest = async () => {
    if (!hasApiKey()) return;
    setTestErr('');
    setTestState('loading');
    await speakText(
      'Hello! This is Fluently speaking. Your API key is working perfectly!',
      voice,
      () => setTestState('loading'),
      () => setTestState('idle'),
      (e) => { setTestState('idle'); setTestErr(e); setTimeout(() => setTestErr(''), 4000); }
    );
    setTestState('playing');
  };

  const voiceDescriptions: Record<TTSVoice, string> = {
    alloy: 'Netral & ramah', echo: 'Pria - alami', fable: 'Ekspresif & hangat',
    nova: 'Wanita - hangat', onyx: 'Pria - dalam', shimmer: 'Wanita - lembut',
  };

  return (
    <motion.div className="rounded-3xl overflow-hidden border border-purple-100 shadow-sm bg-white"
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>

      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-violet-600 px-6 py-5 flex items-center gap-4">
        <div className="w-11 h-11 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
          <KeyRound size={22} className="text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-extrabold text-white text-base">AI Text-to-Speech (BYOK)</h3>
          <p className="text-purple-200 text-xs mt-0.5">Bring Your Own Key — gunakan API key OpenAI milikmu sendiri</p>
        </div>
        <div className={`px-3 py-1.5 rounded-full text-xs font-extrabold flex items-center gap-1.5 ${currentKey ? 'bg-green-400/20 text-green-100' : 'bg-red-400/20 text-red-100'}`}>
          {currentKey ? <><CheckCircle2 size={12} /> Aktif</> : <><XCircle size={12} /> Belum Setup</>}
        </div>
      </div>

      <div className="p-6 space-y-6">

        {/* Info */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
          <p className="text-xs font-extrabold text-blue-800 mb-2">ℹ️ Cara Mendapatkan API Key Gratis</p>
          <ol className="text-xs text-blue-700 space-y-1.5 list-decimal list-inside">
            <li>Buka <span className="font-bold">platform.openai.com</span> dan login / daftar</li>
            <li>Klik menu <span className="font-bold">API Keys</span> di sidebar kiri</li>
            <li>Klik tombol <span className="font-bold">+ Create new secret key</span></li>
            <li>Salin key-nya dan tempel di bawah</li>
          </ol>
          <div className="mt-3 bg-blue-100/60 rounded-xl px-3 py-2 text-[10px] text-blue-600">
            🔒 API key disimpan hanya di browser kamu (<span className="font-bold">localStorage</span>). Fluently <span className="font-bold">tidak pernah</span> menyimpan atau mengirim key-mu ke server kami.
          </div>
        </div>

        {/* Current Key Status */}
        {currentKey && (
          <div className="bg-green-50 border border-sky-200 rounded-2xl px-4 py-3.5 flex items-center gap-3">
            <div className="w-9 h-9 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
              <CheckCircle2 size={18} className="text-green-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-extrabold text-green-800">API Key Tersimpan</p>
              <p className="text-xs font-mono text-green-600 mt-0.5">{getMaskedKey()}</p>
            </div>
            <button onClick={handleDelete} className="text-xs font-bold text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-xl transition-all">
              Hapus
            </button>
          </div>
        )}

        {/* Key Input */}
        <div className="space-y-3">
          <label className="text-sm font-extrabold text-slate-700">
            {currentKey ? '🔄 Ganti API Key' : '🔑 Masukkan OpenAI API Key'}
          </label>
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={keyInput}
                onChange={e => { setKeyInput(e.target.value); setErrMsg(''); setKeyStatus('idle'); }}
                onKeyDown={e => e.key === 'Enter' && handleSave()}
                placeholder="sk-proj-..."
                className="w-full pl-4 pr-10 py-3 rounded-xl border-2 border-slate-200 focus:border-purple-400 outline-none text-sm font-mono transition-colors"
              />
              <button onClick={() => setShowKey(!showKey)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700">
                {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <button onClick={handleSave} disabled={!keyInput.trim()}
              className={`px-5 py-3 rounded-xl font-bold text-sm transition-all disabled:opacity-40 text-white min-w-[90px] ${keyStatus === 'saved' ? 'bg-green-500' : 'bg-purple-600 hover:bg-purple-700'}`}>
              {keyStatus === 'saving' ? '...' : keyStatus === 'saved' ? '✅ Saved' : 'Simpan'}
            </button>
          </div>
          {(errMsg || keyStatus === 'error') && <p className="text-xs text-red-500 font-semibold">{errMsg || 'Terjadi kesalahan.'}</p>}
        </div>

        {/* Voice & Model Settings */}
        <div className="space-y-4">
          <p className="text-sm font-extrabold text-slate-700 flex items-center gap-2"><Volume2 size={16} className="text-purple-500" /> Preferensi Suara AI</p>

          {/* Model */}
          <div>
            <p className="text-xs font-bold text-slate-500 mb-2 flex items-center gap-1.5"><Cpu size={12} /> Model TTS</p>
            <div className="grid grid-cols-2 gap-2">
              {TTS_MODELS.map(m => (
                <button key={m} onClick={() => handleModelChange(m)}
                  className={`py-2.5 rounded-xl border-2 text-sm font-bold transition-all ${model === m ? 'border-purple-400 bg-purple-50 text-purple-700' : 'border-slate-200 text-slate-600 hover:border-purple-200'}`}>
                  {m}
                  {m === 'tts-1-hd' && <span className="ml-1 text-[10px] bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded-full">HD</span>}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-slate-400 mt-1">tts-1 lebih cepat, tts-1-hd kualitas lebih tinggi (biaya lebih besar)</p>
          </div>

          {/* Voices */}
          <div>
            <p className="text-xs font-bold text-slate-500 mb-2">Pilih Suara</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {TTS_VOICES.map(v => (
                <button key={v} onClick={() => handleVoiceChange(v)}
                  className={`py-2.5 px-3 rounded-xl border-2 text-left transition-all ${voice === v ? 'border-purple-400 bg-purple-50' : 'border-slate-200 hover:border-purple-200'}`}>
                  <p className={`text-sm font-extrabold capitalize ${voice === v ? 'text-purple-700' : 'text-slate-700'}`}>{v}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{voiceDescriptions[v]}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Test Button */}
          <div className="flex items-center gap-3">
            <button onClick={handleTest} disabled={!currentKey || testState === 'loading'}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all ${currentKey ? 'bg-purple-500 hover:bg-purple-600 text-white' : 'bg-slate-100 text-slate-400 cursor-not-allowed'} ${testState === 'playing' ? 'animate-pulse' : ''}`}>
              <Volume2 size={16} />
              {testState === 'loading' ? 'Memuat...' : testState === 'playing' ? 'Memutar...' : 'Test Suara'}
            </button>
            {testErr && <p className="text-xs text-red-500 font-semibold">{testErr}</p>}
            {!currentKey && <p className="text-xs text-slate-400">Simpan API key terlebih dahulu</p>}
          </div>
        </div>

        {/* Usage Info */}
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
          <p className="text-xs font-extrabold text-amber-800 mb-2">💡 Informasi Penggunaan & Biaya</p>
          <div className="text-xs text-amber-700 space-y-1.5">
            <p>• <span className="font-bold">tts-1</span>: ~$0.015 per 1.000 karakter</p>
            <p>• <span className="font-bold">tts-1-hd</span>: ~$0.030 per 1.000 karakter</p>
            <p>• Satu kalimat dialog ≈ 100–200 karakter ≈ $0.001–0.003</p>
            <p>• Audio di-cache di browser → tidak duplikat biaya untuk teks yang sama</p>
          </div>
        </div>

        {/* Where used */}
        <div className="bg-purple-50 border border-purple-100 rounded-2xl p-4">
          <p className="text-xs font-extrabold text-purple-800 mb-2">🎧 Fitur yang menggunakan TTS</p>
          <div className="text-xs text-purple-700 space-y-1">
            <p>• <span className="font-bold">Modul Listening Beginner</span> — tombol ▶ di setiap baris dialogue</p>
            <p>• <span className="font-bold">Play All</span> — putar seluruh percakapan secara berurutan</p>
            <p className="text-purple-400 mt-2">Lebih banyak modul akan didukung TTS ke depannya</p>
          </div>
        </div>

      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────────────────────────────────────

export default function ProfilePage({ onLogout }: { onLogout?: () => void }) {
  const { t, language, setLanguage } = useLanguage();
  const { user, updatePersona, updateProfile } = useAuth();
  const [showBYOK, setShowBYOK] = useState(false);
  const [savingLanguage, setSavingLanguage] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [activePanel, setActivePanel] = useState<ProfilePanel>(null);
  const [localPrefs, setLocalPrefs] = useState<LocalPrefs>(() => loadLocalPrefs());

  const displayName = user?.displayName || user?.name || 'Learner';
  const avatarUrl = user?.avatarUrl
    || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(displayName)}&backgroundColor=b6e3f4`;
  const xp = user?.xp ?? 0;
  const streak = user?.streak ?? 0;
  const level = user?.level ?? 1;
  const xpInLevel = xp % 3000;

  const [profileDraft, setProfileDraft] = useState({ displayName, avatarUrl });
  const [profileError, setProfileError] = useState('');
  const [profileSaved, setProfileSaved] = useState(false);

  const completedCourses = 3;
  const totalCourses = 12;
  const targetLanguage = user?.persona?.targetLanguage || 'English';
  const targetLanguageLabel = getTargetLanguageLabel(targetLanguage);

  useEffect(() => {
    saveLocalPrefs(localPrefs);
  }, [localPrefs]);

  // Reset draft whenever the modal opens or the server-side user changes.
  useEffect(() => {
    if (activePanel === 'edit-profile') {
      setProfileDraft({ displayName, avatarUrl });
      setProfileError('');
      setProfileSaved(false);
    }
  }, [activePanel, displayName, avatarUrl]);

  const updateLocalPrefs = (patch: Partial<LocalPrefs>) => {
    setLocalPrefs((current) => ({ ...current, ...patch }));
  };

  const saveProfileDraft = async () => {
    if (savingProfile) return;
    const nextName = profileDraft.displayName.trim() || displayName;
    const draftAvatar = profileDraft.avatarUrl.trim();
    const nextAvatar = draftAvatar
      || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(nextName)}&backgroundColor=b6e3f4`;

    setProfileError('');
    setSavingProfile(true);
    const result = await updateProfile({ displayName: nextName, avatarUrl: nextAvatar });
    setSavingProfile(false);

    if (!result.success) {
      setProfileError(result.error || 'Gagal menyimpan profile');
      return;
    }
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
    { emoji: '🔥', label: t('achievement.7DayStreak'), unlocked: true, progress: 100, requirement: '12 hari aktif berturut-turut' },
    { emoji: '📚', label: t('achievement.bookworm'), unlocked: true, progress: 100, requirement: 'Selesaikan 3 materi belajar' },
    { emoji: '⭐', label: t('achievement.starStudent'), unlocked: true, progress: 100, requirement: 'Raih 2.000+ XP belajar' },
    { emoji: '🏆', label: t('achievement.top10'), unlocked: true, progress: 100, requirement: 'Masuk peringkat 10 besar' },
    { emoji: '💎', label: t('achievement.diamond'), unlocked: false, progress: 62, requirement: 'Kumpulkan 5.000 XP total' },
    { emoji: '🚀', label: t('achievement.speedLearner'), unlocked: false, progress: 45, requirement: 'Selesaikan 5 latihan cepat' },
    { emoji: '🎯', label: t('achievement.perfectScore'), unlocked: false, progress: 70, requirement: 'Dapatkan skor 100% di quiz' },
    { emoji: '👑', label: t('achievement.master'), unlocked: false, progress: 28, requirement: 'Tamatkan semua skill utama' },
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
                    <p className="text-[13px] md:text-sm font-semibold text-text-secondary mt-1">{t('profile.levelProgress')} {level} {t('profile.levelLearner')} • {user?.plan === 'lifetime' ? 'Lifetime' : user?.plan === 'pro' ? 'Pro' : 'Free'} Plan</p>
                    {user?.email && <p className="mt-1 text-xs font-semibold text-text-muted">{user.email}</p>}
                  </div>
                  <div className="hidden shrink-0 md:flex items-center gap-2 bg-white/85 backdrop-blur rounded-2xl p-2 border border-primary/20 shadow-sm">
                    <button
                      type="button"
                      onClick={() => setActivePanel('edit-profile')}
                      className="flex h-9 items-center gap-1.5 rounded-xl bg-primary/10 px-3 text-[12px] font-black text-primary hover:bg-primary/15"
                    >
                      <Pencil size={14} />
                      Edit
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
                <p className="mt-0.5 text-xs font-semibold text-text-muted">Lacak achievement dan target berikutnya.</p>
              </div>
              <span className="shrink-0 text-[13px] bg-primary/10 text-primary font-bold px-3 py-1 rounded-full shadow-sm">
                {achievements.filter(a => a.unlocked).length}/{achievements.length} {t('profile.unlocked')}
              </span>
            </div>
            <div className="grid grid-cols-1 gap-3 rounded-[28px] bg-white p-4 desktop-card border-none sm:grid-cols-2 xl:grid-cols-4">
              {achievements.map((a, i) => (<AchievementBadge key={a.label} {...a} delay={0.05 * i + 0.5} />))}
            </div>
          </div>

          {/* BYOK Section (inline on mobile + wide screens) */}
          <div className="px-5 md:px-0">
            {showBYOK
              ? <BYOKPanel />
              : (
                <motion.button onClick={() => setShowBYOK(true)} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-violet-50 border-2 border-purple-100 rounded-[28px] text-left shadow-sm hover:shadow-md transition-all"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                  <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                    <KeyRound size={22} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-extrabold text-slate-800 text-[15px]">AI Text-to-Speech (BYOK)</p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {hasApiKey()
                        ? `✅ Aktif — ${getMaskedKey()} · Ketuk untuk atur preferensi`
                        : '🔑 Belum setup — Tambahkan OpenAI API key untuk fitur audio AI'}
                    </p>
                  </div>
                  <div className={`w-3 h-3 rounded-full shrink-0 ${hasApiKey() ? 'bg-green-400 shadow-sky-300 shadow-sm' : 'bg-red-400 shadow-red-300 shadow-sm'}`} />
                  <ChevronRight size={20} className="text-purple-400 shrink-0" />
                </motion.button>
              )
            }
          </div>

        </div>

        {/* Right Sidebar */}
        <div className="flex min-w-0 flex-col gap-5 px-5 md:px-0">

          <div className="hidden lg:block h-[280px]">
            <ProgressList total={totalCourses} completed={completedCourses} />
          </div>

          {/* Settings Menu */}
          <div className="bg-white rounded-3xl overflow-hidden desktop-card border-none">
            <div className="px-5 py-4 border-b border-gray-50 bg-gradient-to-r from-gray-50 to-white">
              <h3 className="font-extrabold text-lg text-text-primary">{t('profile.settings')}</h3>
            </div>
            <div className="divide-y divide-gray-50">
              <MenuItem icon={UserRound} label="Edit Profile" value={displayName} color="#4FA3D1" onClick={() => setActivePanel('edit-profile')} />
              <MenuItem icon={Globe} label={t('profile.language')} value={language === 'id' ? 'Indonesia' : 'English'} color="#3498DB" onClick={() => setActivePanel('language')} />
              <MenuItem icon={BookOpen} label="Bahasa dipelajari" value={targetLanguageLabel} color="#0F766E" onClick={() => setActivePanel('target-language')} />
              <MenuItem icon={Bell} label={t('profile.notifications')} value={localPrefs.pushReminder ? 'On' : 'Off'} color="#F39C12" onClick={() => setActivePanel('notifications')} />
              <MenuItem icon={Shield} label={t('profile.privacy')} value={localPrefs.profilePublic ? 'Public' : 'Private'} color="#4FA3D1" onClick={() => setActivePanel('privacy')} />
              {/* BYOK shortcut in sidebar */}
              <MenuItem
                icon={KeyRound}
                label="API Key (TTS)"
                color="#8E44AD"
                onClick={() => setShowBYOK(true)}
                badge={
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full mr-2 ${hasApiKey() ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                    {hasApiKey() ? '✓ Aktif' : '! Setup'}
                  </span>
                }
              />
              <MenuItem icon={Star} label={t('profile.rateUs')} value={localPrefs.rating ? `${localPrefs.rating}/5` : undefined} color="#FFD700" onClick={() => setActivePanel('rate')} />
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
        <ProfileModal title="Edit Profile" onClose={() => { setProfileSaved(false); setActivePanel(null); }}>
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
              <span className="mb-1 block text-xs font-black uppercase tracking-wider text-text-muted">Display Name</span>
              <input
                value={profileDraft.displayName}
                onChange={(event) => setProfileDraft((current) => ({ ...current, displayName: event.target.value }))}
                maxLength={40}
                className="h-12 w-full rounded-2xl border border-gray-200 px-4 text-sm font-bold outline-none focus:border-primary"
              />
              <p className="mt-1 text-[11px] font-semibold text-text-muted">{profileDraft.displayName.length}/40 karakter</p>
            </label>

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
                <><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" /> Menyimpan...</>
              ) : profileSaved ? (
                <><CheckCircle2 size={16} /> Tersimpan</>
              ) : 'Save Profile'}
            </button>
          </div>
        </ProfileModal>
      )}

      {activePanel === 'language' && (
        <ProfileModal title="App Language" onClose={() => setActivePanel(null)}>
          <div className="grid gap-3">
            {[
              { value: 'en' as const, label: 'English', sub: 'Use English interface' },
              { value: 'id' as const, label: 'Indonesia', sub: 'Gunakan tampilan Bahasa Indonesia' },
            ].map((item) => (
              <button
                key={item.value}
                onClick={() => { setLanguage(item.value); setActivePanel(null); }}
                className={`rounded-2xl border-2 p-4 text-left ${language === item.value ? 'border-primary bg-primary/10' : 'border-gray-100 bg-gray-50'}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-black text-text-primary">{item.label}</p>
                    <p className="text-xs font-semibold text-text-muted">{item.sub}</p>
                  </div>
                  {language === item.value && <CheckCircle2 className="text-primary" size={20} />}
                </div>
              </button>
            ))}
          </div>
        </ProfileModal>
      )}

      {activePanel === 'target-language' && (
        <ProfileModal title="Bahasa yang Dipelajari" onClose={() => setActivePanel(null)}>
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
          {savingLanguage && <p className="mt-3 text-xs font-semibold text-text-muted">Menyimpan pilihan...</p>}
        </ProfileModal>
      )}

      {activePanel === 'notifications' && (
        <ProfileModal title="Notifications" onClose={() => setActivePanel(null)}>
          <div className="space-y-3">
            <ToggleRow label="Daily reminder" description="Ingatkan jadwal belajar harian." checked={localPrefs.pushReminder} onChange={(checked) => updateLocalPrefs({ pushReminder: checked })} />
            <ToggleRow label="Streak warning" description="Beri peringatan sebelum streak putus." checked={localPrefs.streakReminder} onChange={(checked) => updateLocalPrefs({ streakReminder: checked })} />
            <ToggleRow label="Weekly digest" description="Kirim ringkasan progres mingguan." checked={localPrefs.emailDigest} onChange={(checked) => updateLocalPrefs({ emailDigest: checked })} />
          </div>
        </ProfileModal>
      )}

      {activePanel === 'privacy' && (
        <ProfileModal title="Privacy" onClose={() => setActivePanel(null)}>
          <div className="space-y-3">
            <ToggleRow label="Public profile" description="Izinkan learner lain melihat profil kamu." checked={localPrefs.profilePublic} onChange={(checked) => updateLocalPrefs({ profilePublic: checked })} />
            <ToggleRow label="Show on leaderboard" description="Tampilkan namamu di papan peringkat." checked={localPrefs.showLeaderboard} onChange={(checked) => updateLocalPrefs({ showLeaderboard: checked })} />
            <ToggleRow label="Share progress" description="Izinkan badge/progres tampil di komunitas." checked={localPrefs.shareProgress} onChange={(checked) => updateLocalPrefs({ shareProgress: checked })} />
          </div>
        </ProfileModal>
      )}

      {activePanel === 'rate' && (
        <ProfileModal title="Rate Fluently" onClose={() => setActivePanel(null)}>
          <div className="text-center">
            <p className="text-sm font-semibold text-text-secondary">Bagaimana pengalaman belajarmu sejauh ini?</p>
            <div className="mt-5 flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((score) => (
                <button key={score} onClick={() => updateLocalPrefs({ rating: score })} className="text-4xl transition-transform hover:scale-110">
                  <Star className={score <= localPrefs.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'} size={38} />
                </button>
              ))}
            </div>
            <p className="mt-4 text-sm font-black text-text-primary">{localPrefs.rating ? `Thanks! ${localPrefs.rating}/5 saved.` : 'Tap a star to rate.'}</p>
          </div>
        </ProfileModal>
      )}

      {activePanel === 'help' && (
        <ProfileModal title="Help Center" onClose={() => setActivePanel(null)}>
          <div className="space-y-3">
            {[
              ['Bagaimana mengganti bahasa modul?', 'Buka Bahasa yang dipelajari, pilih bahasa baru, lalu halaman Modul akan mengikuti pilihan itu.'],
              ['Kenapa AI voice butuh API key?', 'Fitur TTS memakai BYOK agar key dan biaya OpenAI tetap berada di sisi pengguna.'],
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
