import { motion } from 'framer-motion';
import { Settings, ChevronRight, BookOpen, Flame, Trophy, Zap, Star, Bell, Globe, LogOut, Shield, HelpCircle, Activity, KeyRound, Volume2, CheckCircle2, XCircle, Eye, EyeOff, Cpu } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import PageContainer from '../components/layout/PageContainer';
import { mockUser } from '../data/mockData';
import { useLanguage } from '../i18n/LanguageContext';
import { useAuth } from '../auth/AuthContext';
import {
  getApiKey, saveApiKey, removeApiKey, hasApiKey, getMaskedKey,
  getPreferredVoice, setPreferredVoice, getPreferredModel, setPreferredModel,
  speakText, TTS_VOICES, TTS_MODELS,
} from '../services/ttsService';
import type { TTSVoice, TTSModel } from '../services/ttsService';

// ─────────────────────────────────────────────────────────────────────────────
// Subcomponents
// ─────────────────────────────────────────────────────────────────────────────

function StatCard({ icon: Icon, label, value, color, delay }: {
  icon: React.ElementType; label: string; value: string | number; color: string; delay: number;
}) {
  return (
    <motion.div className="bg-white rounded-2xl p-4 md:p-5 flex flex-col items-center gap-3 desktop-card border-none"
      initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
      <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform hover:scale-110 duration-300" style={{ backgroundColor: `${color}15` }}>
        <Icon size={24} style={{ color }} />
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
    <button onClick={onClick} className="flex items-center gap-4 w-full px-5 py-4 hover:bg-gray-50 transition-colors cursor-pointer group">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105" style={{ backgroundColor: `${color}15` }}>
        <Icon size={18} style={{ color }} />
      </div>
      <span className="flex-1 text-[15px] font-bold text-text-primary text-left group-hover:text-primary transition-colors">{label}</span>
      {badge}
      {value && <span className="text-[13px] font-semibold text-text-muted mr-1 bg-gray-100 px-2 py-0.5 rounded">{value}</span>}
      <ChevronRight size={18} className="text-text-muted group-hover:text-primary transition-colors group-hover:translate-x-1" />
    </button>
  );
}

function AchievementBadge({ emoji, label, unlocked, delay }: { emoji: string; label: string; unlocked: boolean; delay: number }) {
  return (
    <motion.div className={`flex flex-col items-center gap-2 group ${!unlocked ? 'opacity-40 grayscale hover:grayscale-0 transition-all duration-300' : ''}`}
      initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: unlocked ? 1 : 0.4, scale: 1 }} transition={{ delay }}>
      <div className={`w-16 h-16 md:w-20 md:h-20 rounded-[20px] flex items-center justify-center text-3xl md:text-4xl shadow-sm border ${unlocked ? 'bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 group-hover:scale-105 transition-transform' : 'bg-gray-50 border-gray-100'}`}>{emoji}</div>
      <span className="text-[10px] md:text-xs font-bold text-text-secondary text-center leading-tight max-w-[70px]">{label}</span>
    </motion.div>
  );
}

function ProgressList({ total, completed }: { total: number, completed: number }) {
  const { t } = useLanguage();
  return (
    <div className="bg-white rounded-2xl p-6 desktop-card flex flex-col justify-center border-none h-full">
      <div className="flex items-center gap-3 mb-6"><Activity size={20} className="text-primary" /><h3 className="font-extrabold text-lg text-text-primary">{t('profile.learningStats')}</h3></div>
      <div className="space-y-6">
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
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-xl p-4"><p className="text-[11px] font-semibold text-text-muted mb-1 uppercase tracking-wider">{t('profile.coursesActive')}</p><p className="text-2xl font-black text-text-primary">{total - completed}</p></div>
          <div className="bg-primary/5 rounded-xl p-4 border border-primary/10"><p className="text-[11px] font-semibold text-primary mb-1 uppercase tracking-wider">{t('profile.completed')}</p><p className="text-2xl font-black text-primary">{completed}</p></div>
        </div>
        <div className="flex items-center justify-between bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
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
  const { t, language } = useLanguage();
  const { user, updatePersona } = useAuth();
  const [showBYOK, setShowBYOK] = useState(false);
  const [savingLanguage, setSavingLanguage] = useState(false);
  const completedCourses = 3;
  const totalCourses = 12;
  const targetLanguage = user?.persona?.targetLanguage || 'English';
  const targetLanguageLabel = targetLanguage === 'Japanese' ? 'Bahasa Jepang' : targetLanguage === 'Mandarin' ? 'Bahasa Mandarin' : targetLanguage === 'Arabic' ? 'Bahasa Arab' : 'Bahasa Inggris';

  const handleTargetLanguage = async (nextLanguage: 'English' | 'Arabic' | 'Mandarin' | 'Japanese') => {
    if (nextLanguage === targetLanguage || savingLanguage) return;
    setSavingLanguage(true);
    await updatePersona({ targetLanguage: nextLanguage });
    setSavingLanguage(false);
  };

  const achievements = [
    { emoji: '🔥', label: t('achievement.7DayStreak'), unlocked: true },
    { emoji: '📚', label: t('achievement.bookworm'), unlocked: true },
    { emoji: '⭐', label: t('achievement.starStudent'), unlocked: true },
    { emoji: '🏆', label: t('achievement.top10'), unlocked: true },
    { emoji: '💎', label: t('achievement.diamond'), unlocked: false },
    { emoji: '🚀', label: t('achievement.speedLearner'), unlocked: false },
    { emoji: '🎯', label: t('achievement.perfectScore'), unlocked: false },
    { emoji: '👑', label: t('achievement.master'), unlocked: false },
  ];

  return (
    <PageContainer>
      <div className="flex flex-col lg:flex-row gap-8 pb-8 h-full md:px-5 lg:px-8">

        {/* Main Column */}
        <div className="flex-1 min-w-0 flex flex-col gap-6 pt-4 md:pt-0">

          <div className="flex items-center justify-between px-5 pt-6 md:pt-0 md:px-0 mb-2">
            <h1 className="text-2xl font-extrabold text-text-primary">{t('profile.title')}</h1>
            <motion.button whileTap={{ scale: 0.9 }} className="w-10 h-10 rounded-full bg-white flex items-center justify-center cursor-pointer shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors md:hidden">
              <Settings size={20} className="text-text-secondary" />
            </motion.button>
          </div>

          {/* Profile Card */}
          <motion.div className="mx-5 md:mx-0 bg-white rounded-3xl p-6 md:p-8 relative overflow-hidden desktop-card border-none"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 flex items-center justify-end pr-10 opacity-50 pointer-events-none">
              <Trophy size={120} className="text-primary/20 blur-[2px] transform rotate-12" />
            </div>
            <div className="relative flex flex-col md:flex-row md:items-center gap-6 pt-2 z-10">
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-white shadow-xl ring-4 ring-primary/20 shrink-0 bg-white">
                <img src={mockUser.avatarUrl} alt={mockUser.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-black text-text-primary tracking-tight">{mockUser.name}</h2>
                    <p className="text-[13px] md:text-sm font-semibold text-text-secondary mt-1">{t('profile.levelProgress')} {mockUser.level} {t('profile.levelLearner')} • {t('profile.joined')}</p>
                  </div>
                  <div className="hidden md:flex items-center gap-2 bg-white/80 backdrop-blur rounded-xl p-2 border border-primary/20 shadow-sm">
                    <div className="flex items-center gap-1.5 bg-orange-50 px-3 py-1.5 rounded-lg">
                      <Flame size={16} className="text-orange-500" />
                      <span className="text-[13px] font-black text-orange-600">{mockUser.streak} {t('profile.streak')}</span>
                    </div>
                  </div>
                </div>
                <div className="flex md:hidden items-center gap-1 mt-3">
                  <div className="flex items-center gap-1 bg-orange-50 px-3 py-1.5 rounded-lg border border-orange-100">
                    <Flame size={14} className="text-orange-500" />
                    <span className="text-xs font-black text-orange-600">{mockUser.streak} {t('profile.dayStreakLabel')}</span>
                  </div>
                </div>
                <div className="mt-5 pt-5 border-t border-gray-100/60 max-w-md">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="font-bold text-text-secondary">{t('profile.levelProgress')} {mockUser.level}</span>
                    <span className="font-black text-primary">{mockUser.xp} <span className="text-text-muted font-semibold">/ 3000 XP</span></span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                    <motion.div className="h-full rounded-full relative" style={{ background: 'linear-gradient(90deg, #4FA3D1, #1E6F9F)' }}
                      initial={{ width: 0 }} animate={{ width: `${(mockUser.xp / 3000) * 100}%` }} transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}>
                      <div className="absolute top-0 right-0 bottom-0 w-8 bg-white/20 skew-x-[-20deg]" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-5 md:px-0">
            <StatCard icon={BookOpen} label={t('profile.coursesDone')} value={completedCourses} color="#4FA3D1" delay={0.1} />
            <StatCard icon={Zap} label={t('profile.totalXP')} value={`${(mockUser.xp / 1000).toFixed(1)}k`} color="#F39C12" delay={0.2} />
            <StatCard icon={Flame} label={t('profile.dayStreak')} value={mockUser.streak} color="#E74C3C" delay={0.3} />
            <StatCard icon={Trophy} label={t('profile.globalRank')} value="#6" color="#3498DB" delay={0.4} />
          </div>

          {/* Achievements */}
          <div className="px-5 md:px-0">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold text-lg text-text-primary">{t('profile.yourBadges')}</h3>
              <span className="text-[13px] bg-primary/10 text-primary font-bold px-3 py-1 rounded-full shadow-sm">
                {achievements.filter(a => a.unlocked).length}/{achievements.length} {t('profile.unlocked')}
              </span>
            </div>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-4 bg-white rounded-3xl p-6 desktop-card border-none">
              {achievements.map((a, i) => (<AchievementBadge key={a.label} {...a} delay={0.05 * i + 0.5} />))}
            </div>
          </div>

          {/* BYOK Section (inline on mobile + wide screens) */}
          <div className="px-5 md:px-0">
            {showBYOK
              ? <BYOKPanel />
              : (
                <motion.button onClick={() => setShowBYOK(true)} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center gap-4 p-5 bg-gradient-to-r from-purple-50 to-violet-50 border-2 border-purple-100 rounded-3xl text-left shadow-sm hover:shadow-md transition-all"
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

          <div className="px-5 md:px-0">
            <motion.div
              className="bg-white rounded-3xl p-5 md:p-6 desktop-card border-none"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="font-extrabold text-lg text-text-primary">Bahasa yang dipelajari</h3>
                  <p className="text-sm text-text-secondary mt-1">Pilihan ini mengubah isi halaman Modul.</p>
                </div>
                <div className="w-11 h-11 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
                  <Globe size={21} className="text-blue-500" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'English' as const, label: 'English', sub: 'Bahasa Inggris', code: 'GB' },
                  { value: 'Arabic' as const, label: 'Arabic', sub: 'Bahasa Arab', code: 'AR' },
                  { value: 'Mandarin' as const, label: 'Mandarin', sub: 'Bahasa Mandarin', code: 'ZH' },
                  { value: 'Japanese' as const, label: 'Japanese', sub: 'Bahasa Jepang', code: 'JP' },
                ].map((item) => {
                  const active = targetLanguage === item.value;
                  return (
                    <button
                      key={item.value}
                      onClick={() => handleTargetLanguage(item.value)}
                      disabled={savingLanguage}
                      className={`rounded-2xl border-2 p-4 text-left transition-all ${
                        active
                          ? 'border-primary bg-primary/10 shadow-sm'
                          : 'border-gray-100 bg-gray-50 hover:border-primary/30'
                      } ${savingLanguage ? 'opacity-70' : ''}`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-black text-text-muted">{item.code}</span>
                        {active && <CheckCircle2 size={18} className="text-primary" />}
                      </div>
                      <p className="mt-2 font-black text-text-primary">{item.label}</p>
                      <p className="text-xs font-semibold text-text-secondary">{item.sub}</p>
                    </button>
                  );
                })}
              </div>
              {savingLanguage && <p className="mt-3 text-xs font-semibold text-text-muted">Menyimpan pilihan bahasa...</p>}
            </motion.div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="flex flex-col gap-6 w-full lg:w-[340px] shrink-0 px-5 md:px-0">

          <div className="hidden lg:block h-[280px]">
            <ProgressList total={totalCourses} completed={completedCourses} />
          </div>

          {/* Settings Menu */}
          <div className="bg-white rounded-3xl overflow-hidden desktop-card border-none flex-1">
            <div className="p-5 border-b border-gray-50 bg-gradient-to-r from-gray-50 to-white">
              <h3 className="font-extrabold text-lg text-text-primary">{t('profile.settings')}</h3>
            </div>
            <div className="divide-y divide-gray-50">
              <MenuItem icon={Globe} label={t('profile.language')} value={language === 'id' ? 'Indonesia' : 'English'} color="#3498DB" />
              <MenuItem icon={BookOpen} label="Bahasa dipelajari" value={targetLanguageLabel} color="#0F766E" />
              <MenuItem icon={Bell} label={t('profile.notifications')} color="#F39C12" />
              <MenuItem icon={Shield} label={t('profile.privacy')} color="#4FA3D1" />
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
              <MenuItem icon={Star} label={t('profile.rateUs')} color="#FFD700" />
              <MenuItem icon={HelpCircle} label={t('profile.helpCenter')} color="#9B59B6" />
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
    </PageContainer>
  );
}
