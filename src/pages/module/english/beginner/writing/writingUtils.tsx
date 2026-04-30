/**
 * Shared writing utilities for Beginner Writing module.
 * Provides reusable components: PostcardWriter, HotelForm, QuizEngine.
 */
import React, { useState } from 'react';
import { CheckCircleIcon, XCircleIcon, StarIcon } from '../../../../../components/Icons';

/* ─────────────── QUIZ ENGINE ─────────────── */
export interface QuizItem { q: string; opts: string[]; ans: string; exp: string; }

export function QuizEngine({ items, onComplete }: { items: QuizItem[]; onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [sel, setSel] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  const pick = (o: string) => { if (checked) return; setSel(o); setChecked(true); if (o === items[step].ans) setScore(s => s + 1); };
  const next = () => { if (step < items.length - 1) { setStep(s => s + 1); setSel(null); setChecked(false); } else setDone(true); };
  const restart = () => { setStep(0); setScore(0); setDone(false); setSel(null); setChecked(false); };

  if (done) return (
    <div className="text-center py-8 max-w-md mx-auto">
      <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4"><StarIcon className="w-12 h-12 text-amber-500" /></div>
      <h2 className="text-2xl font-bold text-slate-800 mb-1">Kuis Selesai! 🎉</h2>
      <p className="text-slate-500 mb-1">Skor: <span className="font-extrabold text-amber-600 text-3xl">{score}</span><span className="text-xl">/{items.length}</span></p>
      <p className="text-sm text-slate-400 mb-6">{score >= Math.round(items.length * 0.8) ? '🏆 Luar biasa!' : score >= Math.round(items.length * 0.6) ? '👍 Bagus!' : '📚 Terus berlatih!'}</p>
      <button onClick={restart} className="px-6 py-3 bg-amber-500 text-white rounded-xl font-bold mr-3">Ulangi</button>
      <button onClick={onComplete} className="px-6 py-3 bg-green-500 text-white rounded-xl font-bold">Tandai Selesai ✓</button>
    </div>
  );

  const q = items[step];
  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-amber-100">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-bold text-slate-400">Pertanyaan {step + 1}/{items.length}</span>
          <span className="text-xs font-bold bg-amber-50 text-amber-600 px-2 py-1 rounded-lg">Skor: {score}</span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full mb-5 overflow-hidden">
          <div className="h-full bg-amber-500 transition-all rounded-full" style={{ width: `${((step + 1) / items.length) * 100}%` }} />
        </div>
        <h3 className="text-base font-bold text-slate-800 mb-5">{q.q}</h3>
        <div className="space-y-2.5">
          {q.opts.map((o, i) => {
            let cls = 'border-slate-200 hover:border-amber-400 hover:bg-amber-50 cursor-pointer';
            if (checked) { if (o === q.ans) cls = 'bg-green-50 border-sky-400 text-green-800'; else if (o === sel) cls = 'bg-red-50 border-red-400 text-red-700'; else cls = 'opacity-40 border-slate-100 cursor-default'; }
            return (
              <button key={i} onClick={() => pick(o)} disabled={checked} className={`w-full p-3.5 rounded-xl border-2 text-left text-sm font-medium transition-all flex items-center justify-between ${cls}`}>
                <span>{o}</span>
                {checked && o === q.ans && <CheckCircleIcon className="w-5 h-5 text-green-600 shrink-0" />}
                {checked && o === sel && o !== q.ans && <XCircleIcon className="w-5 h-5 text-red-500 shrink-0" />}
              </button>
            );
          })}
        </div>
        {checked && (
          <div className="mt-4">
            <div className={`p-3 rounded-xl text-sm mb-4 border ${sel === q.ans ? 'bg-green-50 text-green-800 border-sky-100' : 'bg-orange-50 text-orange-800 border-orange-100'}`}>
              💡 {q.exp}
            </div>
            <button onClick={next} className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-700 transition-all">
              {step < items.length - 1 ? 'Selanjutnya →' : 'Lihat Hasil'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────── POSTCARD WRITER ─────────────── */
export interface PostcardField { id: string; label: string; placeholder: string; hint?: string; multiline?: boolean; }

export function PostcardWriter({ title, stamp, to, fields, example }: {
  title?: string;
  stamp?: string;
  to?: string;
  fields: PostcardField[];
  example?: Record<string, string>;
}) {
  const [vals, setVals] = useState<Record<string, string>>({});
  const [showEx, setShowEx] = useState(false);

  const update = (id: string, v: string) => setVals(prev => ({ ...prev, [id]: v }));

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {title && (
        <div className="flex items-center gap-2">
          <span className="text-xl">📮</span>
          <h2 className="text-base font-extrabold text-slate-800">{title}</h2>
        </div>
      )}

      {/* Postcard Visual */}
      <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl overflow-hidden shadow-lg">
        {/* Postcard top bar */}
        <div className="bg-gradient-to-r from-amber-400 to-orange-400 px-4 py-2 flex items-center justify-between">
          <span className="text-white font-bold text-sm">📮 POSTCARD</span>
          <span className="text-2xl">{stamp ?? '🌴'}</span>
        </div>

        <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x-2 md:divide-amber-200">
          {/* LEFT: Write area */}
          <div className="p-4 space-y-3">
            <p className="text-xs font-bold text-amber-700 uppercase tracking-wider">Isi Pesan →</p>
            {fields.filter(f => !f.id.startsWith('to_') && !f.id.startsWith('from_')).map(f => (
              <div key={f.id}>
                <label className="text-xs font-bold text-slate-600 block mb-1">{f.label}</label>
                {f.multiline
                  ? <textarea rows={3} value={vals[f.id] ?? ''} onChange={e => update(f.id, e.target.value)} placeholder={showEx && example?.[f.id] ? example[f.id] : f.placeholder} className="w-full border-2 border-amber-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-amber-500 bg-white resize-none" />
                  : <input type="text" value={vals[f.id] ?? ''} onChange={e => update(f.id, e.target.value)} placeholder={showEx && example?.[f.id] ? example[f.id] : f.placeholder} className="w-full border-2 border-amber-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-amber-500 bg-white" />
                }
                {f.hint && <p className="text-[10px] text-amber-600 mt-1">💡 {f.hint}</p>}
              </div>
            ))}
          </div>

          {/* RIGHT: Address area */}
          <div className="p-4 space-y-3 bg-white/50">
            <p className="text-xs font-bold text-amber-700 uppercase tracking-wider">Alamat Penerima →</p>
            <div className="border-2 border-dashed border-amber-200 rounded-xl p-3 space-y-2">
              {fields.filter(f => f.id.startsWith('to_') || f.id.startsWith('from_')).map(f => (
                <div key={f.id}>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-0.5">{f.label}</label>
                  <input type="text" value={vals[f.id] ?? ''} onChange={e => update(f.id, e.target.value)} placeholder={showEx && example?.[f.id] ? example[f.id] : f.placeholder} className="w-full border border-amber-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-amber-500 bg-white" />
                </div>
              ))}
            </div>
            {to && <p className="text-xs text-slate-400 text-center">Kirim kepada: <b>{to}</b></p>}
          </div>
        </div>
      </div>

      {/* Example toggle */}
      {example && (
        <div className="flex justify-end">
          <button onClick={() => setShowEx(s => !s)} className={`text-xs font-bold px-4 py-2 rounded-xl border-2 transition-all ${showEx ? 'bg-amber-100 border-amber-400 text-amber-700' : 'border-slate-200 text-slate-500 hover:border-amber-300'}`}>
            {showEx ? '🙈 Sembunyikan Contoh' : '👁️ Lihat Contoh'}
          </button>
        </div>
      )}
    </div>
  );
}

/* ─────────────── HOTEL FORM ─────────────── */
export interface FormField { id: string; label: string; placeholder: string; type?: string; required?: boolean; options?: string[]; hint?: string; }

export function HotelForm({ fields, title, subtitle }: { fields: FormField[]; title?: string; subtitle?: string }) {
  const [vals, setVals] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const update = (id: string, v: string) => { setVals(p => ({ ...p, [id]: v })); if (errors[id]) setErrors(p => ({ ...p, [id]: false })); };

  const submit = () => {
    const newErrors: Record<string, boolean> = {};
    fields.filter(f => f.required).forEach(f => { if (!vals[f.id]?.trim()) newErrors[f.id] = true; });
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    setSubmitted(true);
  };

  if (submitted) return (
    <div className="max-w-md mx-auto text-center py-8">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">✅</div>
      <h3 className="text-xl font-bold text-slate-800 mb-2">Formulir Terkirim!</h3>
      <p className="text-slate-500 text-sm mb-4">Selamat! Kamu berhasil mengisi formulir registrasi hotel.</p>
      <div className="bg-green-50 border border-sky-100 rounded-2xl p-4 text-left space-y-2 mb-6">
        {fields.filter(f => vals[f.id]).map(f => (
          <div key={f.id} className="flex gap-2 text-sm">
            <span className="font-bold text-green-700 w-28 shrink-0">{f.label}:</span>
            <span className="text-green-800">{vals[f.id]}</span>
          </div>
        ))}
      </div>
      <button onClick={() => { setSubmitted(false); setVals({}); }} className="px-6 py-2.5 bg-amber-500 text-white rounded-xl font-bold text-sm">Isi Ulang</button>
    </div>
  );

  return (
    <div className="max-w-xl mx-auto">
      {/* Form Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-t-2xl px-5 py-4 text-white">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🏨</span>
          <div>
            <h3 className="font-extrabold text-base">{title ?? 'Hotel Registration Form'}</h3>
            <p className="text-xs text-slate-300">{subtitle ?? 'Please fill in all required fields (*)'}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-b-2xl border border-slate-200 border-t-0 shadow-lg divide-y divide-slate-100">
        {fields.map(f => (
          <div key={f.id} className="px-5 py-4">
            <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">
              {f.label} {f.required && <span className="text-red-500">*</span>}
            </label>
            {f.options ? (
              <select value={vals[f.id] ?? ''} onChange={e => update(f.id, e.target.value)} className={`w-full border-2 rounded-xl px-4 py-2.5 text-sm focus:outline-none ${errors[f.id] ? 'border-red-400 bg-red-50' : 'border-slate-200 focus:border-amber-400'}`}>
                <option value="">{f.placeholder}</option>
                {f.options.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            ) : (
              <input type={f.type ?? 'text'} value={vals[f.id] ?? ''} onChange={e => update(f.id, e.target.value)} placeholder={f.placeholder} className={`w-full border-2 rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-colors ${errors[f.id] ? 'border-red-400 bg-red-50' : 'border-slate-200 focus:border-amber-400'}`} />
            )}
            {errors[f.id] && <p className="text-xs text-red-500 mt-1">⚠️ Field ini wajib diisi</p>}
            {f.hint && <p className="text-xs text-slate-400 mt-1">💡 {f.hint}</p>}
          </div>
        ))}

        <div className="px-5 py-4">
          <button onClick={submit} className="w-full py-3.5 rounded-xl font-bold text-white text-sm shadow-lg" style={{ background: 'linear-gradient(135deg,#F39C12,#E67E22)' }}>
            Submit / Kirim Formulir
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────── SUCCESS MODAL ─────────────── */
export function SuccessModal({ lessonNum, nextPath, onClose }: { lessonNum: number; nextPath: string; onClose: () => void }) {
  const navigate = (typeof window !== 'undefined' && (window as any).__useNavigate) ? (window as any).__useNavigate() : null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)' }} onClick={onClose}>
      <div className="bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg,#F39C12,#E67E22)' }}><span style={{ fontSize: 38 }}>🏆</span></div>
        <h2 className="text-xl font-extrabold text-slate-900 mb-1">Lesson {lessonNum} Selesai! 🎉</h2>
        <p className="text-sm text-gray-500 mb-5">Kamu berhasil menyelesaikan pelajaran ini!</p>
        <div className="flex gap-3">
          {nextPath && <a href={nextPath} className="flex-1 py-3 rounded-xl font-bold text-white text-sm inline-flex items-center justify-center" style={{ background: '#F39C12' }} onClick={onClose}>Lesson Selanjutnya ›</a>}
          <button onClick={onClose} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700 text-sm">Kembali</button>
        </div>
      </div>
    </div>
  );
}
