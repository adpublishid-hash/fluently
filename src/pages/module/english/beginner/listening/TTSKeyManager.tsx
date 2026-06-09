/**
 * TTSKeyManager — optional personal Gemini key preferences.
 * AI Chat uses the default backend key; this modal is only for optional voice setup.
 */
import React, { useState, useEffect } from 'react';
import { getApiKey, saveApiKey, removeApiKey, hasApiKey } from '../../../../../services/ttsService';

interface Props {
  /** Show the modal immediately (e.g., when user clicks play without key) */
  forceOpen?: boolean;
  onClose?: () => void;
}

export function TTSKeyManager({ forceOpen = false, onClose }: Props) {
  const [isOpen, setIsOpen] = useState(forceOpen);
  const [keyValue, setKeyValue] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => { setIsOpen(forceOpen); }, [forceOpen]);

  const existingKey = getApiKey();
  const masked = existingKey ? `...${existingKey.slice(-6)}` : '';

  const handleSave = () => {
    const trimmed = keyValue.trim();
    if (!trimmed) { setError('API key tidak boleh kosong.'); return; }
    saveApiKey(trimmed);
    setError('');
    setSaved(true);
    setKeyValue('');
    setTimeout(() => { setSaved(false); setIsOpen(false); onClose?.(); }, 1200);
  };

  const handleRemove = () => { removeApiKey(); setIsOpen(false); onClose?.(); };

  const close = () => { setIsOpen(false); onClose?.(); setError(''); setKeyValue(''); };

  return (
    <>
      {/* Floating FAB */}
      <button
        onClick={() => setIsOpen(true)}
        title="Kelola Gemini API Key"
        className="fixed bottom-24 right-4 z-40 w-12 h-12 rounded-full shadow-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95"
        style={{ background: hasApiKey() ? 'linear-gradient(135deg,#8E44AD,#6C3483)' : 'linear-gradient(135deg,#E74C3C,#C0392B)' }}
      >
        <span className="text-white text-lg">{hasApiKey() ? '🔑' : '🔒'}</span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
          onClick={close}
        >
          <div
            className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-violet-600 px-6 py-5 text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
                  <span className="text-xl">🔑</span>
                </div>
                <div>
                  <h2 className="font-extrabold text-lg">Gemini AI Voice</h2>
                  <p className="text-xs text-purple-200">Default AI aktif — key pribadi opsional</p>
                </div>
                <button onClick={close} className="ml-auto w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30">
                  <span className="text-white text-sm">✕</span>
                </button>
              </div>
            </div>

            <div className="px-6 py-5 space-y-4">
              {/* Info box */}
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-3.5">
                <p className="text-xs font-bold text-blue-800 mb-1">ℹ️ AI sudah aktif</p>
                <p className="text-xs text-blue-700 leading-relaxed">
                  Chat memakai default Gemini Flash 2.5 dari Fluently. Key pribadi di sini hanya opsional untuk eksperimen voice langsung dari browser.
                </p>
              </div>

              {/* Current key status */}
              {existingKey && (
                <div className="flex items-center justify-between bg-green-50 border border-sky-100 rounded-2xl px-4 py-2.5">
                  <div>
                    <p className="text-xs font-bold text-green-800">✅ Key Tersimpan</p>
                    <p className="text-xs text-green-600 font-mono mt-0.5">{masked}</p>
                  </div>
                  <button onClick={handleRemove} className="text-xs font-bold text-red-500 hover:text-red-700 px-2 py-1">Hapus</button>
                </div>
              )}

              {/* Key input */}
              <div className="space-y-2">
                <label className="text-xs font-extrabold text-slate-700">
                  {existingKey ? 'Ganti API Key:' : 'Masukkan API Key:'}
                </label>
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <input
                      type={showKey ? 'text' : 'password'}
                      value={keyValue}
                      onChange={e => { setKeyValue(e.target.value); setError(''); }}
                      onKeyDown={e => e.key === 'Enter' && handleSave()}
                      placeholder="Gemini API key..."
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-purple-400 outline-none text-sm font-mono pr-10"
                    />
                    <button
                      onClick={() => setShowKey(!showKey)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                    >
                      {showKey ? '🙈' : '👁️'}
                    </button>
                  </div>
                </div>
                {error && <p className="text-xs text-red-500 font-semibold">{error}</p>}
              </div>

              {/* Model info */}
              <div className="bg-purple-50 rounded-xl p-3">
                <p className="text-xs font-bold text-purple-800 mb-1">🤖 Model yang Digunakan</p>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { name: 'Model', val: 'gemini-2.5-flash-preview-tts' },
                    { name: 'Format', val: 'WAV' },
                    { name: 'Bahasa', val: 'English' },
                    { name: 'Suara', val: 'Kore / Puck / dll' },
                  ].map(i => (
                    <div key={i.name} className="text-[10px] text-purple-700">
                      <span className="text-purple-400">{i.name}: </span>
                      <span className="font-bold">{i.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-1">
                <button onClick={close} className="flex-1 py-3 rounded-xl border-2 border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50">
                  Batal
                </button>
                <button
                  onClick={handleSave}
                  disabled={!keyValue.trim()}
                  className="flex-1 py-3 rounded-xl font-bold text-sm text-white transition-all disabled:opacity-40"
                  style={{ background: 'linear-gradient(135deg,#8E44AD,#6C3483)' }}
                >
                  {saved ? '✅ Tersimpan!' : 'Simpan Key'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/** Floating banner shown when no key is set */
export function TTSNoBanner({ onSetupClick }: { onSetupClick: () => void }) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed || hasApiKey()) return null;

  return (
    <div className="mx-4 mb-4 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 flex items-center gap-3">
      <span className="text-2xl shrink-0">🔑</span>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-extrabold text-amber-800">Aktifkan Tombol Play</p>
        <p className="text-xs text-amber-600">Tambahkan Gemini API key-mu untuk mendengar audio AI</p>
      </div>
      <div className="flex gap-2 shrink-0">
        <button onClick={() => setDismissed(true)} className="text-xs text-amber-400 hover:text-amber-600">✕</button>
        <button onClick={onSetupClick} className="text-xs font-bold bg-amber-500 text-white px-3 py-1.5 rounded-xl">Setup</button>
      </div>
    </div>
  );
}
