/**
 * Shared utilities for Beginner Listening module.
 * Simulates listening exercises via interactive dialogue + quiz.
 * Supports AI Text-to-Speech with the shared Fluently AI voice service.
 */
import React, { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircleIcon, XCircleIcon, StarIcon } from '../../../../../components/Icons';
import { speakText, getSpeakerVoice, hasApiKey, stopCurrentAudio } from '../../../../../services/ttsService';

export const LISTENING_KEY = 'talky_beginner_listening_completed';
export function getCompletedListeningLessons(): number[] { try { return JSON.parse(localStorage.getItem(LISTENING_KEY) || '[]'); } catch { return []; } }
export function markListeningComplete(id: number) { const d = getCompletedListeningLessons(); if (!d.includes(id)) localStorage.setItem(LISTENING_KEY, JSON.stringify([...d, id])); }

/* ─────────── QUIZ ENGINE ─────────── */
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
      <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4"><StarIcon className="w-12 h-12 text-purple-500" /></div>
      <h2 className="text-2xl font-bold text-slate-800 mb-1">Kuis Selesai! 🎉</h2>
      <p className="text-slate-500 mb-1">Skor: <span className="font-extrabold text-purple-600 text-3xl">{score}</span><span className="text-xl">/{items.length}</span></p>
      <p className="text-sm text-slate-400 mb-6">{score >= Math.round(items.length * 0.8) ? '🏆 Luar biasa!' : score >= Math.round(items.length * 0.6) ? '👍 Bagus!' : '📚 Terus berlatih!'}</p>
      <button onClick={restart} className="px-6 py-3 bg-purple-500 text-white rounded-xl font-bold mr-3">Ulangi</button>
      <button onClick={onComplete} className="px-6 py-3 bg-purple-700 text-white rounded-xl font-bold">Tandai Selesai ✓</button>
    </div>
  );

  const q = items[step];
  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-bold text-slate-400">Pertanyaan {step + 1}/{items.length}</span>
          <span className="text-xs font-bold bg-purple-50 text-purple-600 px-2 py-1 rounded-lg">Skor: {score}</span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full mb-5 overflow-hidden">
          <div className="h-full bg-purple-500 transition-all rounded-full" style={{ width: `${((step + 1) / items.length) * 100}%` }} />
        </div>
        <h3 className="text-base font-bold text-slate-800 mb-5">{q.q}</h3>
        <div className="space-y-2.5">
          {q.opts.map((o, i) => {
            let cls = 'border-slate-200 hover:border-purple-400 hover:bg-purple-50 cursor-pointer';
            if (checked) { if (o === q.ans) cls = 'bg-purple-50 border-purple-400 text-purple-800'; else if (o === sel) cls = 'bg-red-50 border-red-400 text-red-700'; else cls = 'opacity-40 border-slate-100 cursor-default'; }
            return (
              <button key={i} onClick={() => pick(o)} disabled={checked} className={`w-full p-3.5 rounded-xl border-2 text-left text-sm font-medium transition-all flex items-center justify-between ${cls}`}>
                <span>{o}</span>
                {checked && o === q.ans && <CheckCircleIcon className="w-5 h-5 text-purple-600 shrink-0" />}
                {checked && o === sel && o !== q.ans && <XCircleIcon className="w-5 h-5 text-red-500 shrink-0" />}
              </button>
            );
          })}
        </div>
        {checked && (
          <div className="mt-4">
            <div className={`p-3 rounded-xl text-sm mb-4 border ${sel === q.ans ? 'bg-purple-50 text-purple-800 border-purple-100' : 'bg-orange-50 text-orange-800 border-orange-100'}`}>
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

/* ─────────── TTS PLAY BUTTON ─────────── */
type PlayState = 'idle' | 'loading' | 'playing';

function TTSPlayButton({ text, speakerIdx, onGoToProfile }: { text: string; speakerIdx: number; onGoToProfile: () => void }) {
  const [state, setState] = useState<PlayState>('idle');
  const [errMsg, setErrMsg] = useState('');
  const voice = getSpeakerVoice(speakerIdx);

  const handlePlay = useCallback(async () => {
    if (!hasApiKey()) { onGoToProfile(); return; }
    if (state === 'playing') { stopCurrentAudio(); setState('idle'); return; }
    setErrMsg('');
    await speakText(
      text, voice,
      () => setState('loading'),
      () => setState('idle'),
      (err) => { setState('idle'); setErrMsg(err); setTimeout(() => setErrMsg(''), 3500); },
    );
    setState('playing');
  }, [text, voice, state, onGoToProfile]);

  return (
    <div className="relative">
      <button
        onClick={handlePlay}
        title={state === 'playing' ? 'Stop' : hasApiKey() ? 'Putar dengan AI' : 'Setup API Key di Profile'}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shrink-0 shadow-sm border-2 ${
          state === 'playing' ? 'bg-purple-500 border-purple-500 text-white animate-pulse' :
          state === 'loading' ? 'bg-purple-100 border-purple-200 cursor-wait' :
          !hasApiKey() ? 'bg-slate-50 border-slate-200 text-slate-300 hover:border-amber-300 hover:text-amber-400' :
          'bg-white border-purple-200 text-purple-500 hover:bg-purple-50 hover:border-purple-400'
        }`}
      >
        {state === 'loading' ? (
          <svg className="w-3.5 h-3.5 animate-spin text-purple-400" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        ) : state === 'playing' ? (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
        ) : (
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
        )}
      </button>
      {errMsg && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 bg-red-600 text-white text-xs rounded-xl px-3 py-2 whitespace-nowrap shadow-xl">
          {errMsg}
        </div>
      )}
    </div>
  );
}

/* ─────────── DIALOGUE PLAYER ─────────── */
export interface DialogueLine { speaker: string; text: string; translation: string; avatar: string; }

export function DialoguePlayer({ title, lines }: { title: string; lines: DialogueLine[] }) {
  const navigate = useNavigate();
  const [revealed, setRevealed] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [keySet] = useState(hasApiKey());
  const [showNoKeyTip, setShowNoKeyTip] = useState(false);
  const [playAllIdx, setPlayAllIdx] = useState<number | null>(null);
  const playAllRef = useRef(false);
  const display = showAll ? lines : lines.slice(0, revealed + 1);

  const handleNoKey = () => {
    setShowNoKeyTip(true);
    setTimeout(() => setShowNoKeyTip(false), 3000);
  };

  const handlePlayAll = useCallback(async () => {
    if (!hasApiKey()) { handleNoKey(); return; }
    if (playAllRef.current) { stopCurrentAudio(); playAllRef.current = false; setPlayAllIdx(null); return; }
    playAllRef.current = true;
    setShowAll(true);
    for (let i = 0; i < lines.length; i++) {
      if (!playAllRef.current) break;
      setPlayAllIdx(i);
      const voice = getSpeakerVoice(i);
      await new Promise<void>(resolve => {
        speakText(lines[i].text, voice, undefined, resolve, () => resolve());
      });
      if (playAllRef.current) await new Promise(r => setTimeout(r, 400));
    }
    playAllRef.current = false;
    setPlayAllIdx(null);
  }, [lines]);

  return (
    <div className="bg-white rounded-2xl border-2 border-purple-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 to-violet-50 px-4 py-3 border-b border-purple-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">🎧</span>
          <p className="text-xs font-extrabold text-purple-700 uppercase tracking-wider">{title}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePlayAll}
            title={playAllIdx !== null ? 'Stop semua' : keySet ? 'Main semua baris' : 'Setup AI Voice di Profile'}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              playAllIdx !== null
                ? 'bg-purple-500 text-white animate-pulse'
                : keySet
                ? 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                : 'bg-slate-100 text-slate-400 hover:bg-amber-50 hover:text-amber-600'
            }`}
          >
            {playAllIdx !== null ? (
              <><svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>Stop</>
            ) : (
              <><svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>Play All</>
            )}
          </button>
          <button onClick={() => setShowAll(!showAll)} className="text-xs font-bold text-purple-500 underline">
            {showAll ? 'Sembunyikan' : 'Tampilkan Semua'}
          </button>
        </div>
      </div>

      {/* No-key slim banner — redirect to Profile */}
      {!keySet && (
        <div className="flex items-center gap-3 px-4 py-2.5 bg-amber-50 border-b border-amber-100">
          <span className="text-sm">🔑</span>
          <p className="text-xs text-amber-700 flex-1">
            Aktifkan <span className="font-bold">AI Voice</span> — setup API key <span className="font-bold">sekali</span> di Profile
          </p>
          <button
            onClick={() => navigate('/profile')}
            className="text-xs font-extrabold bg-amber-500 text-white px-3 py-1.5 rounded-xl hover:bg-amber-600 transition-all shrink-0"
          >
            Ke Profile →
          </button>
        </div>
      )}

      {/* No-key toast (when play button pressed without key) */}
      {showNoKeyTip && (
        <div className="mx-4 mt-3 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2.5 flex items-center gap-2 animate-pulse">
          <span className="text-base">🔑</span>
          <div className="flex-1">
            <p className="text-xs font-bold text-amber-800">API Key belum diset</p>
            <p className="text-[10px] text-amber-600">AI Voice default aktif. Buka Profile untuk preferensi suara.</p>
          </div>
          <button onClick={() => navigate('/profile')} className="text-xs font-extrabold text-amber-700 underline shrink-0">
            Ke Profile
          </button>
        </div>
      )}

      <div className="p-4 space-y-3">
        {display.map((line, i) => {
          const isLeft = i % 2 === 0;
          const isPlaying = playAllIdx === i;
          return (
            <div key={i} className={`flex gap-2 items-start ${isLeft ? '' : 'flex-row-reverse'}`}>
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xl shrink-0 transition-all ${isPlaying ? 'ring-2 ring-purple-400 ring-offset-1 scale-110' : ''} bg-purple-100`}>
                {line.avatar}
              </div>
              <div className={`flex items-center gap-2 max-w-[75%] ${isLeft ? '' : 'flex-row-reverse'}`}>
                <div className={`flex-1 ${isLeft ? '' : 'text-right'}`}>
                  <p className="text-[10px] font-extrabold text-purple-600 mb-0.5">{line.speaker}</p>
                  <div className={`inline-block rounded-2xl px-3 py-2 transition-all ${isPlaying ? 'bg-purple-100 ring-1 ring-purple-300' : isLeft ? 'bg-purple-50 rounded-tl-none' : 'bg-violet-50 rounded-tr-none'}`}>
                    <p className="text-sm font-semibold text-slate-800">"{line.text}"</p>
                    <p className="text-xs text-slate-400 mt-0.5 italic">{line.translation}</p>
                  </div>
                </div>
                <TTSPlayButton text={line.text} speakerIdx={i} onGoToProfile={handleNoKey} />
              </div>
            </div>
          );
        })}
        {!showAll && revealed < lines.length - 1 && (
          <button onClick={() => setRevealed(r => r + 1)}
            className="w-full py-2 border-2 border-dashed border-purple-200 text-purple-500 rounded-xl text-xs font-bold hover:bg-purple-50 transition-all">
            ▶ Lanjutkan Percakapan
          </button>
        )}
        {!showAll && revealed === lines.length - 1 && (
          <div className="text-center py-2 text-xs font-bold text-purple-400">— Akhir Percakapan —</div>
        )}
      </div>

      {keySet && (
        <div className="bg-slate-50 border-t border-slate-100 px-4 py-2 flex items-center gap-2">
          <span className="text-xs text-slate-400">🤖 AI TTS aktif</span>
          <div className="flex gap-1 ml-auto">
            {['nova','onyx','shimmer','echo'].map(v => (
              <span key={v} className="text-[10px] bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full font-bold">{v}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────── FILL IN THE BLANK ─────────── */

export interface BlankItem { sentence: string; blank: string; opts: string[]; hint: string; }

export function FillBlankExercise({ items }: { items: BlankItem[] }) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const score = items.filter((it, i) => answers[i] === it.blank).length;

  return (
    <div className="space-y-4 max-w-xl mx-auto">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-extrabold text-slate-800">✏️ Lengkapi Kalimat</h3>
        {submitted && <span className="text-xs font-bold text-purple-700">{score}/{items.length} benar</span>}
      </div>
      {items.map((it, i) => (
        <div key={i} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
          <p className="text-xs text-slate-400 italic mb-1.5">💡 {it.hint}</p>
          <p className="text-sm font-bold text-slate-800 mb-3">{it.sentence.replace('___', submitted
            ? (answers[i] === it.blank ? `✅ ${it.blank}` : `❌ ${answers[i] || '?'} → ${it.blank}`)
            : '___')}</p>
          <div className="grid grid-cols-2 gap-2">
            {it.opts.map((opt, j) => {
              let cls = 'border-slate-200 hover:border-purple-300 hover:bg-purple-50 cursor-pointer';
              if (submitted) { if (opt === it.blank) cls = 'bg-purple-50 border-purple-400 text-purple-800 font-bold'; else if (opt === answers[i]) cls = 'bg-red-50 border-red-300 text-red-600'; else cls = 'opacity-40 border-slate-100 cursor-default'; }
              else if (answers[i] === opt) cls = 'border-purple-400 bg-purple-50 text-purple-800 font-bold';
              return (
                <button key={j} onClick={() => !submitted && setAnswers(p => ({ ...p, [i]: opt }))} disabled={submitted}
                  className={`text-sm px-3 py-2 rounded-xl border-2 transition-all ${cls}`}>{opt}</button>
              );
            })}
          </div>
        </div>
      ))}
      <div className="flex gap-3">
        {!submitted
          ? <button onClick={() => setSubmitted(true)} disabled={Object.keys(answers).length < items.length} className="flex-1 py-3 bg-purple-600 text-white rounded-xl font-bold disabled:opacity-50">Periksa Jawaban</button>
          : <button onClick={() => { setAnswers({}); setSubmitted(false); }} className="flex-1 py-3 border-2 border-purple-400 text-purple-700 font-bold rounded-xl hover:bg-purple-50">Coba Lagi</button>
        }
      </div>
    </div>
  );
}

/* ─────────── WORD MATCH ─────────── */
export interface WordPair { word: string; meaning: string; }

export function WordMatchExercise({ pairs }: { pairs: WordPair[] }) {
  const [matched, setMatched] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const shuffledMeanings = [...pairs.map(p => p.meaning)].sort(() => Math.random() - 0.5);
  const [meanings] = useState(shuffledMeanings);
  const allMatched = Object.keys(matched).length === pairs.length;

  const handleWord = (word: string) => {
    if (matched[word]) return;
    setSelected(selected === word ? null : word);
  };
  const handleMeaning = (meaning: string) => {
    if (!selected) return;
    const correct = pairs.find(p => p.word === selected)?.meaning;
    if (meaning === correct) { setMatched(m => ({ ...m, [selected]: meaning })); setSelected(null); }
    else { setSelected(null); }
  };

  return (
    <div className="max-w-xl mx-auto space-y-3">
      <h3 className="text-sm font-extrabold text-slate-800">🔗 Cocokkan Kata</h3>
      <p className="text-xs text-slate-400">Pilih kata bahasa Inggris, lalu pilih artinya</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <p className="text-xs font-bold text-purple-600 uppercase tracking-wide text-center">Bahasa Inggris</p>
          {pairs.map(p => (
            <button key={p.word} onClick={() => handleWord(p.word)}
              className={`w-full px-3 py-2.5 rounded-xl border-2 text-sm font-bold transition-all ${matched[p.word] ? 'bg-purple-50 border-purple-400 text-purple-700' : selected === p.word ? 'bg-purple-500 border-purple-500 text-white shadow-md' : 'bg-white border-slate-200 hover:border-purple-300'}`}>
              {matched[p.word] ? `✅ ${p.word}` : p.word}
            </button>
          ))}
        </div>
        <div className="space-y-2">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide text-center">Bahasa Indonesia</p>
          {meanings.map(m => {
            const isMatched = Object.values(matched).includes(m);
            return (
              <button key={m} onClick={() => handleMeaning(m)} disabled={isMatched}
                className={`w-full px-3 py-2.5 rounded-xl border-2 text-sm transition-all ${isMatched ? 'bg-green-50 border-sky-300 text-green-700 opacity-60 cursor-default' : 'bg-white border-slate-200 hover:border-purple-300 hover:bg-purple-50'}`}>
                {m}
              </button>
            );
          })}
        </div>
      </div>
      {allMatched && (
        <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 text-center">
          <p className="text-2xl mb-1">🎉</p>
          <p className="font-extrabold text-purple-800">Semua cocok! Hebat!</p>
        </div>
      )}
    </div>
  );
}
