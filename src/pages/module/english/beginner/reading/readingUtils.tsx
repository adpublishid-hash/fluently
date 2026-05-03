/**
 * Shared utilities for Beginner Reading module.
 * Provides: ReadingCard (text display), QuizEngine, SignBoard, ProductLabel, etc.
 */
import React, { useState } from 'react';
import { CheckCircleIcon, XCircleIcon, StarIcon } from '../../../../../components/Icons';

export const READING_KEY = 'talky_beginner_reading_completed';
export function getCompletedReadingLessons(): number[] { try { return JSON.parse(localStorage.getItem(READING_KEY) || '[]'); } catch { return []; } }
export function markReadingComplete(id: number) { const d = getCompletedReadingLessons(); if (!d.includes(id)) localStorage.setItem(READING_KEY, JSON.stringify([...d, id])); }

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
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"><StarIcon className="w-12 h-12 text-green-500" /></div>
      <h2 className="text-2xl font-bold text-slate-800 mb-1">Kuis Selesai! 🎉</h2>
      <p className="text-slate-500 mb-1">Skor: <span className="font-extrabold text-green-600 text-3xl">{score}</span><span className="text-xl">/{items.length}</span></p>
      <p className="text-sm text-slate-400 mb-6">{score >= Math.round(items.length * 0.8) ? '🏆 Luar biasa!' : score >= Math.round(items.length * 0.6) ? '👍 Bagus!' : '📚 Terus berlatih!'}</p>
      <button onClick={restart} className="px-6 py-3 bg-green-500 text-white rounded-xl font-bold mr-3">Ulangi</button>
      <button onClick={onComplete} className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold">Tandai Selesai ✓</button>
    </div>
  );

  const q = items[step];
  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-sky-100">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-bold text-slate-400">Pertanyaan {step + 1}/{items.length}</span>
          <span className="text-xs font-bold bg-green-50 text-green-600 px-2 py-1 rounded-lg">Skor: {score}</span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full mb-5 overflow-hidden">
          <div className="h-full bg-green-500 transition-all rounded-full" style={{ width: `${((step + 1) / items.length) * 100}%` }} />
        </div>
        <h3 className="text-base font-bold text-slate-800 mb-5">{q.q}</h3>
        <div className="space-y-2.5">
          {q.opts.map((o, i) => {
            let cls = 'border-slate-200 hover:border-sky-400 hover:bg-green-50 cursor-pointer';
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

/* ─────────────── READING CARD ─────────────── */
export function ReadingCard({ title, icon, children, highlight }: { title?: string; icon?: string; children: React.ReactNode; highlight?: string; }) {
  return (
    <div className="bg-white rounded-2xl border-2 border-sky-100 shadow-sm overflow-hidden">
      {title && (
        <div className="bg-gradient-to-r from-sky-50 to-blue-50 px-4 py-3 border-b border-sky-100 flex items-center gap-2">
          {icon && <span className="text-xl">{icon}</span>}
          <p className="text-xs font-extrabold text-green-700 uppercase tracking-wider">{title}</p>
          {highlight && <span className="ml-auto text-[10px] font-bold bg-green-600 text-white px-2 py-0.5 rounded-full">{highlight}</span>}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}

/* ─────────────── SIGN BOARD ─────────────── */
export function SignBoard({ text, subtext, icon, type = 'info' }: {
  text: string; subtext?: string; icon?: string; type?: 'info' | 'warning' | 'danger' | 'success';
}) {
  const palette = {
    info: { bg: '#EBF5FB', border: '#3498DB', text: '#1A5276' },
    warning: { bg: '#FDFEFE', border: '#F39C12', text: '#784212' },
    danger: { bg: '#FDEDEC', border: '#E74C3C', text: '#922B21' },
    success: { bg: '#EAFAF1', border: '#7EC3E6', text: '#1E8449' },
  };
  const p = palette[type];
  return (
    <div className="rounded-2xl border-4 p-4 text-center" style={{ backgroundColor: p.bg, borderColor: p.border }}>
      {icon && <p className="text-3xl mb-2">{icon}</p>}
      <p className="text-lg font-extrabold uppercase tracking-wide" style={{ color: p.text }}>{text}</p>
      {subtext && <p className="text-xs mt-1 font-medium" style={{ color: p.text }}>{subtext}</p>}
    </div>
  );
}

/* ─────────────── COMPREHENSION Q&A ─────────────── */
export interface ComprehensionQ { q: string; opts: string[]; ans: string; }

export function ComprehensionSection({ passageTitle, passage, questions }: {
  passageTitle: string; passage: React.ReactNode; questions: ComprehensionQ[];
}) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showAns, setShowAns] = useState(false);
  const correctCount = questions.filter((q, i) => answers[i] === q.ans).length;

  return (
    <div className="space-y-4 max-w-xl mx-auto">
      <ReadingCard title={passageTitle} icon="📄">
        <div className="text-sm text-slate-700 leading-relaxed">{passage}</div>
      </ReadingCard>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-extrabold text-slate-800">✏️ Pertanyaan Pemahaman</h3>
          {Object.keys(answers).length === questions.length && !showAns && (
            <button onClick={() => setShowAns(true)} className="text-xs font-bold px-3 py-1.5 bg-green-600 text-white rounded-xl">Periksa Jawaban</button>
          )}
          {showAns && <span className="text-xs font-bold text-green-700">{correctCount}/{questions.length} benar</span>}
        </div>
        <div className="space-y-3">
          {questions.map((q, i) => (
            <div key={i} className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
              <p className="text-sm font-semibold text-slate-800 mb-3">{i + 1}. {q.q}</p>
              <div className="space-y-2">
                {q.opts.map((opt, j) => {
                  let cls = 'border-slate-200 hover:border-sky-300 hover:bg-green-50 cursor-pointer';
                  if (showAns) { if (opt === q.ans) cls = 'bg-green-50 border-sky-400 text-green-800 font-bold'; else if (opt === answers[i]) cls = 'bg-red-50 border-red-300 text-red-700'; else cls = 'opacity-40 border-slate-100'; }
                  else if (answers[i] === opt) cls = 'border-sky-400 bg-green-50 text-green-800';
                  return (
                    <button key={j} onClick={() => !showAns && setAnswers(p => ({ ...p, [i]: opt }))} disabled={showAns} className={`w-full text-left text-sm px-3 py-2 rounded-lg border-2 transition-all ${cls}`}>
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        {showAns && (
          <button onClick={() => { setAnswers({}); setShowAns(false); }} className="w-full mt-3 py-2.5 border-2 border-sky-400 text-green-700 font-bold rounded-xl text-sm hover:bg-green-50">
            Coba Lagi
          </button>
        )}
      </div>
    </div>
  );
}


