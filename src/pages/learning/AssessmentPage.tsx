import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Loader2, Mic, PenLine, Sparkles, Square, Volume2 } from 'lucide-react';
import PageContainer from '../../components/layout/PageContainer';
import { PageHeader } from '../../components/shared/NavComponents';
import { useAuth } from '../../auth/AuthContext';
import { getRubricLevels, isRubricLanguage, rubricCriteria, rubricLevelId, type RubricLanguage, type RubricSkill } from '../../features/rubrics';
import { studyLanguageFor, studyLanguageLabel, studyLevelIndex, getStudyLevels, studySpeechLang } from '../../features/learning/studyLanguages';
import { speak } from '../../utils/speech';

type Assessment = {
  scores: Record<string, number>;
  overall: number;
  summary: string;
  strengths: string[];
  improvements: string[];
  corrected: string;
  nextStep: string;
};

type Recognition = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((event: { resultIndex: number; results: ArrayLike<{ isFinal: boolean; 0: { transcript: string } }> }) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
};

function createRecognition(): Recognition | null {
  if (typeof window === 'undefined') return null;
  const speechWindow = window as typeof window & { SpeechRecognition?: new () => Recognition; webkitSpeechRecognition?: new () => Recognition };
  const Constructor = speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition;
  return Constructor ? new Constructor() : null;
}

export default function AssessmentPage() {
  const navigate = useNavigate();
  const params = useParams();
  const [search] = useSearchParams();
  const { user, authHeaders, awardXp } = useAuth();
  const preferred = studyLanguageFor(user?.persona?.targetLanguage);
  const language: RubricLanguage = isRubricLanguage(params.language) ? params.language : preferred;
  const levels = getRubricLevels(language);
  const defaultLevel = search.get('level')
    ?? rubricLevelId(language, getStudyLevels(language)[studyLevelIndex(language, user?.persona?.level)]?.id ?? levels[0]?.id);
  const [levelId, setLevelId] = useState(levels.some((item) => item.id === defaultLevel) ? defaultLevel : levels[0]?.id);
  const [skill, setSkill] = useState<RubricSkill>(search.get('skill') === 'speaking' ? 'speaking' : 'writing');
  const [answer, setAnswer] = useState('');
  const [recording, setRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<Assessment | null>(null);
  const [xpNote, setXpNote] = useState('');
  const recognition = useRef<Recognition | null>(null);
  const level = levels.find((item) => item.id === levelId) ?? levels[0];
  const rubric = level?.[skill];
  const rtl = language === 'arabic';

  useEffect(() => () => recognition.current?.stop(), []);

  const toggleRecording = () => {
    if (recording) {
      recognition.current?.stop();
      return;
    }
    const instance = createRecognition();
    if (!instance) {
      setError('Browser ini belum mendukung pengenalan suara. Ketik transkrip jawabanmu di kotak teks.');
      return;
    }
    instance.lang = studySpeechLang[language];
    instance.continuous = true;
    instance.interimResults = false;
    instance.onresult = (event) => {
      let text = '';
      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        if (event.results[index].isFinal) text += event.results[index][0].transcript;
      }
      if (text) setAnswer((current) => `${current} ${text}`.trim());
    };
    instance.onend = () => setRecording(false);
    instance.onerror = () => setRecording(false);
    recognition.current = instance;
    setError('');
    setRecording(true);
    instance.start();
  };

  const submit = async () => {
    if (!level) return;
    setLoading(true);
    setError('');
    setResult(null);
    setXpNote('');
    try {
      const response = await fetch('/api/ai/assess', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
        body: JSON.stringify({ language, levelId: level.id, skill, answer }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.scores) throw new Error(data?.error || 'Penilaian AI belum tersedia. Coba lagi nanti.');
      setResult(data as Assessment);
      if (data.overall >= 60) {
        const xp = await awardXp(30, 'practice', `nilai/${language}/${level.id}/${skill}`);
        setXpNote(xp.duplicate ? 'XP penilaian level ini sudah diklaim.' : xp.awarded ? `+${xp.awarded} XP` : '');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Penilaian AI gagal.');
    } finally {
      setLoading(false);
    }
  };

  if (!level || !rubric) return null;

  return (
    <PageContainer>
      <div className="mx-auto max-w-2xl space-y-4 px-5 pb-28 md:px-0 md:pb-10">
        <PageHeader title="Penilaian AI" subtitle={`${studyLanguageLabel[language]} · rubrik per level`} onBack={() => navigate(-1)} />

        <section className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="grid grid-cols-2 gap-2">
            {(['writing', 'speaking'] as RubricSkill[]).map((item) => (
              <button
                key={item}
                onClick={() => { setSkill(item); setResult(null); }}
                className={`flex items-center justify-center gap-2 rounded-2xl border py-2.5 text-sm font-black ${skill === item ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-slate-200 text-slate-600'}`}
              >
                {item === 'writing' ? <PenLine size={16} /> : <Mic size={16} />} {item === 'writing' ? 'Menulis' : 'Berbicara'}
              </button>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {levels.map((item) => (
              <button
                key={item.id}
                onClick={() => { setLevelId(item.id); setResult(null); }}
                className={`rounded-full border px-3 py-1.5 text-xs font-black ${item.id === level.id ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 text-slate-600'}`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="mt-4 rounded-2xl bg-slate-50 p-4">
            <p className="text-xs font-black uppercase tracking-widest text-slate-400">Tugas · {rubric.target}</p>
            <p dir={rtl ? 'rtl' : undefined} className={`mt-1 font-bold text-slate-900 ${rtl ? 'text-xl' : ''}`}>{rubric.prompt}</p>
            <ul className="mt-2 space-y-1">
              {rubric.expectations.map((item) => <li key={item} className="text-xs text-slate-600">• {item}</li>)}
            </ul>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
          {skill === 'speaking' && (
            <button
              onClick={toggleRecording}
              className={`mb-3 flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-sm font-black text-white ${recording ? 'bg-rose-600' : 'bg-indigo-600'}`}
            >
              {recording ? <Square size={16} /> : <Mic size={16} />} {recording ? 'Berhenti merekam' : 'Rekam jawaban'}
            </button>
          )}
          <textarea
            dir={rtl ? 'rtl' : 'auto'}
            value={answer}
            onChange={(event) => setAnswer(event.target.value)}
            rows={skill === 'writing' ? 9 : 5}
            placeholder={skill === 'writing' ? 'Tulis jawabanmu di sini…' : 'Transkrip rekamanmu muncul di sini (bisa juga diketik).'}
            className="w-full rounded-2xl border border-slate-200 p-4 text-sm leading-relaxed outline-none focus:border-indigo-400"
          />
          {error && <p className="mt-2 text-sm font-semibold text-rose-600">{error}</p>}
          <button
            onClick={submit}
            disabled={loading || answer.trim().length < 5}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 py-3.5 text-sm font-black text-white disabled:opacity-40"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />} Nilai dengan rubrik {level.label}
          </button>
        </section>

        {result && (
          <section className="space-y-4 rounded-3xl border border-indigo-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-black text-slate-900">Skor keseluruhan</p>
              <p className="text-3xl font-black text-indigo-600">{result.overall}%</p>
            </div>
            {xpNote && <p className="text-sm font-black text-amber-600">{xpNote}</p>}
            <div className="space-y-2">
              {rubricCriteria[skill].map((item) => {
                const score = result.scores[item.id] ?? 0;
                return (
                  <div key={item.id}>
                    <div className="flex justify-between text-xs font-bold text-slate-700"><span>{item.label}</span><span>{score}/4</span></div>
                    <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-indigo-500" style={{ width: `${(score / 4) * 100}%` }} /></div>
                  </div>
                );
              })}
            </div>
            {result.summary && <p className="text-sm leading-relaxed text-slate-700">{result.summary}</p>}
            {result.strengths.length > 0 && (
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-emerald-600">Kekuatan</p>
                <ul className="mt-1 space-y-1">{result.strengths.map((item) => <li key={item} className="text-sm text-slate-700">✓ {item}</li>)}</ul>
              </div>
            )}
            {result.improvements.length > 0 && (
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-rose-600">Perbaikan</p>
                <ul className="mt-1 space-y-1">{result.improvements.map((item) => <li key={item} className="text-sm text-slate-700">→ {item}</li>)}</ul>
              </div>
            )}
            {result.corrected && (
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400">Versi yang diperbaiki</p>
                  <button onClick={() => speak(result.corrected, studySpeechLang[language])} className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600"><Volume2 size={13} /> Dengar</button>
                </div>
                <p dir={rtl ? 'rtl' : 'auto'} className={`mt-2 whitespace-pre-line text-slate-900 ${rtl ? 'text-xl leading-loose' : 'text-sm leading-relaxed'}`}>{result.corrected}</p>
              </div>
            )}
            {result.nextStep && <p className="rounded-2xl bg-amber-50 p-3 text-sm font-semibold text-amber-800">Latihan berikutnya: {result.nextStep}</p>}
          </section>
        )}
      </div>
    </PageContainer>
  );
}
