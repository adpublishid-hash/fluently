import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BookOpen, CheckCircle2, Eye, EyeOff, Headphones, Pause, Play, Volume2 } from 'lucide-react';
import PageContainer from '../../components/layout/PageContainer';
import { PageHeader } from '../../components/shared/NavComponents';
import { useAuth } from '../../auth/AuthContext';
import { getPassage, getPassages, isPassageLanguage, passageLanguages, passageLevelLabels, type Passage, type PassageLanguage } from '../../features/passages';
import { studyLanguageFor, studyLanguageLabel, studySpeechLang } from '../../features/learning/studyLanguages';
import { buildChoiceQuestion, hashSeed, seededRandom, type ChoiceQuestion } from '../../utils/quiz';
import { speak, stopSpeaking } from '../../utils/speech';
import WordIllustration from '../../components/shared/WordIllustration';

const DONE_KEY = 'fluently_passages_done_v1';
const PASSAGE_XP = 20;

function readDone(): Record<string, number> {
  try {
    return JSON.parse(localStorage.getItem(DONE_KEY) || '{}');
  } catch {
    return {};
  }
}

function saveDone(key: string, percent: number) {
  try {
    const done = readDone();
    done[key] = Math.max(done[key] ?? 0, percent);
    localStorage.setItem(DONE_KEY, JSON.stringify(done));
  } catch {
    // ignore storage failures
  }
}

function buildQuestions(passage: Passage): ChoiceQuestion[] {
  const random = seededRandom(hashSeed('passage', passage.id));
  return passage.questions
    .map((item) => buildChoiceQuestion(item.question, item.answer, item.distractors, random))
    .filter((item): item is ChoiceQuestion => item !== null);
}

function PassageReader({ passage, onBack }: { passage: Passage; onBack: () => void }) {
  const { awardXp } = useAuth();
  const lang = studySpeechLang[passage.language];
  const isRtl = passage.language === 'arabic';
  const [mode, setMode] = useState<'read' | 'listen'>('read');
  const [showText, setShowText] = useState(false);
  const [showReading, setShowReading] = useState(false);
  const [showMeaning, setShowMeaning] = useState(false);
  const [rate, setRate] = useState(0.85);
  const [playing, setPlaying] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const [note, setNote] = useState('');
  const questions = useMemo(() => buildQuestions(passage), [passage]);
  const textVisible = mode === 'read' || showText;

  useEffect(() => () => stopSpeaking(), []);

  const playFrom = (index: number) => {
    if (index >= passage.sentences.length) {
      setPlaying(null);
      return;
    }
    setPlaying(index);
    speak(passage.sentences[index].text, lang, { rate, onEnd: () => playFrom(index + 1) });
  };

  const stop = () => {
    stopSpeaking();
    setPlaying(null);
  };

  const check = () => {
    setChecked(true);
    const correct = questions.filter((question, index) => answers[index] === question.answer).length;
    const percent = Math.round((correct / Math.max(1, questions.length)) * 100);
    saveDone(`${passage.language}/${passage.id}`, percent);
    if (correct >= Math.ceil((questions.length * 2) / 3)) {
      void awardXp(PASSAGE_XP, 'practice', `bacaan/${passage.language}/${passage.id}`).then((result) => {
        setNote(result.duplicate ? 'XP bacaan ini sudah pernah diklaim.' : result.awarded ? `+${result.awarded} XP` : '');
      });
    } else {
      setNote('Baca/dengar sekali lagi, lalu coba jawab ulang.');
    }
  };

  return (
    <div className="space-y-4">
      <button onClick={onBack} className="text-sm font-bold text-indigo-600">← Daftar bacaan</button>
      <section className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
        <p className="text-xs font-black uppercase tracking-widest text-indigo-500">{passage.title}</p>
        <h1 dir={isRtl ? 'rtl' : undefined} className="mt-1 text-2xl font-black text-slate-900">{passage.native}</h1>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {([['read', 'Membaca', BookOpen], ['listen', 'Menyimak', Headphones]] as const).map(([id, label, Icon]) => (
            <button
              key={id}
              onClick={() => { setMode(id); setShowText(false); }}
              className={`flex items-center justify-center gap-2 rounded-2xl border py-2.5 text-sm font-black ${mode === id ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-slate-200 text-slate-600'}`}
            >
              <Icon size={16} /> {label}
            </button>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {playing === null ? (
            <button onClick={() => playFrom(0)} className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3 py-2 text-xs font-black text-white">
              <Play size={14} /> Putar semua
            </button>
          ) : (
            <button onClick={stop} className="inline-flex items-center gap-1.5 rounded-xl bg-slate-800 px-3 py-2 text-xs font-black text-white">
              <Pause size={14} /> Berhenti
            </button>
          )}
          <button onClick={() => setRate((value) => (value > 0.8 ? 0.65 : 0.85))} className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700">
            Kecepatan: {rate > 0.8 ? 'normal' : 'pelan'}
          </button>
          {mode === 'listen' && (
            <button onClick={() => setShowText((value) => !value)} className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700">
              {showText ? <EyeOff size={14} /> : <Eye size={14} />} {showText ? 'Sembunyikan teks' : 'Tampilkan teks'}
            </button>
          )}
          {textVisible && passage.sentences.some((sentence) => sentence.reading) && (
            <button onClick={() => setShowReading((value) => !value)} className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700">
              {showReading ? 'Sembunyikan' : 'Tampilkan'} {passage.language === 'mandarin' ? 'pinyin' : 'transliterasi'}
            </button>
          )}
          {textVisible && (
            <button onClick={() => setShowMeaning((value) => !value)} className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700">
              {showMeaning ? 'Sembunyikan arti' : 'Tampilkan arti'}
            </button>
          )}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
        {textVisible ? (
          <div className="space-y-2">
            {passage.sentences.map((sentence, index) => (
              <button
                key={sentence.text}
                onClick={() => { setPlaying(index); speak(sentence.text, lang, { rate, onEnd: () => setPlaying(null) }); }}
                className={`block w-full rounded-2xl border p-3 text-left transition ${playing === index ? 'border-indigo-300 bg-indigo-50' : 'border-slate-100 bg-slate-50 hover:border-indigo-200'}`}
              >
                <p dir={isRtl ? 'rtl' : undefined} className={`${isRtl ? 'text-2xl leading-loose' : 'text-lg leading-relaxed'} font-bold text-slate-900`}>{sentence.text}</p>
                {showReading && sentence.reading && <p className="mt-1 text-xs font-semibold text-slate-500">{sentence.reading}</p>}
                {showMeaning && <p className="mt-1 text-sm text-slate-600">{sentence.meaning}</p>}
              </button>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
            <p className="font-bold text-slate-800">Mode menyimak</p>
            <p className="mt-1">Putar audio 2–3 kali tanpa melihat teks dan catat kata kunci. Jawab pertanyaan di bawah, lalu buka teks untuk mengecek.</p>
            {playing !== null && <p className="mt-2 text-xs font-bold text-indigo-600">Memutar kalimat {playing + 1} dari {passage.sentences.length}…</p>}
          </div>
        )}
      </section>

      {passage.glossary.length > 0 && (
        <section className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-black text-slate-900">Kosakata kunci</h2>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {passage.glossary.map((word) => (
              <button key={word.text} onClick={() => speak(word.text, lang, { rate })} className="flex items-start gap-2 rounded-2xl bg-slate-50 p-3 text-left">
                <Volume2 size={14} className="mt-1 shrink-0 text-indigo-500" />
                <WordIllustration meaning={word.meaning} className="text-xl" />
                <span>
                  <span dir={isRtl ? 'rtl' : undefined} className="font-black text-slate-900">{word.text}</span>
                  {word.reading && <span className="ml-2 text-xs font-semibold text-slate-500">{word.reading}</span>}
                  <span className="block text-xs text-slate-600">{word.meaning}</span>
                </span>
              </button>
            ))}
          </div>
        </section>
      )}

      <section className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-black text-slate-900">Pertanyaan pemahaman</h2>
        <div className="mt-3 space-y-4">
          {questions.map((question, index) => (
            <div key={question.question}>
              <p className="text-sm font-bold text-slate-800">{index + 1}. {question.question}</p>
              <div className="mt-2 grid gap-2">
                {question.options.map((option) => {
                  const selected = answers[index] === option;
                  const tone = !checked
                    ? selected ? 'border-indigo-500 bg-indigo-50 text-indigo-800' : 'border-slate-200 text-slate-700'
                    : option === question.answer ? 'border-emerald-400 bg-emerald-50 text-emerald-800'
                    : selected ? 'border-rose-300 bg-rose-50 text-rose-700' : 'border-slate-200 text-slate-400';
                  return (
                    <button key={option} disabled={checked} onClick={() => setAnswers((prev) => ({ ...prev, [index]: option }))} className={`rounded-2xl border px-3 py-2 text-left text-sm font-semibold ${tone}`}>
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        {!checked ? (
          <button
            onClick={check}
            disabled={Object.keys(answers).length < questions.length}
            className="mt-4 w-full rounded-2xl bg-indigo-600 py-3 text-sm font-black text-white disabled:opacity-40"
          >
            Cek jawaban
          </button>
        ) : (
          <div className="mt-4 flex items-center justify-between gap-3">
            <p className="text-sm font-bold text-slate-700">
              Skor {questions.filter((question, index) => answers[index] === question.answer).length}/{questions.length} {note && `· ${note}`}
            </p>
            <button onClick={() => { setChecked(false); setAnswers({}); setNote(''); }} className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700">Ulangi</button>
          </div>
        )}
      </section>
    </div>
  );
}

function PassageLibrary({ language }: { language: PassageLanguage }) {
  const navigate = useNavigate();
  const levels = passageLevelLabels[language];
  const [level, setLevel] = useState(levels[0][0]);
  const [openId, setOpenId] = useState<string | null>(null);
  const [done, setDone] = useState(readDone);
  const passages = useMemo(() => getPassages(language, level), [language, level]);
  const open = openId ? getPassage(language, openId) : undefined;

  if (open) {
    return <PassageReader key={open.id} passage={open} onBack={() => { setOpenId(null); setDone(readDone()); }} />;
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {passageLanguages.map((item) => (
          <button
            key={item}
            onClick={() => navigate(`/bacaan/${item}`)}
            className={`rounded-2xl border py-2.5 text-sm font-black ${item === language ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-slate-200 text-slate-600'}`}
          >
            {studyLanguageLabel[item]}
          </button>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {levels.map(([id, label]) => (
          <button
            key={id}
            onClick={() => setLevel(id)}
            className={`rounded-full border px-3 py-1.5 text-xs font-black ${id === level ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 text-slate-600'}`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="mt-4 space-y-2">
        {passages.map((passage) => {
          const score = done[`${language}/${passage.id}`];
          return (
            <button key={passage.id} onClick={() => setOpenId(passage.id)} className="flex w-full items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-white p-4 text-left shadow-sm hover:border-indigo-200">
              <span className="min-w-0">
                <span className="block text-sm font-black text-slate-900">{passage.title}</span>
                <span dir={language === 'arabic' ? 'rtl' : undefined} className="block truncate text-sm text-slate-500">{passage.native}</span>
                <span className="text-[11px] font-bold text-slate-400">{passage.sentences.length} kalimat · {passage.questions.length} soal</span>
              </span>
              {score !== undefined && (
                <span className="flex shrink-0 items-center gap-1 text-xs font-black text-emerald-600"><CheckCircle2 size={14} /> {score}%</span>
              )}
            </button>
          );
        })}
      </div>
    </>
  );
}

export default function PassageLabPage() {
  const navigate = useNavigate();
  const params = useParams();
  const { user } = useAuth();
  const preferred = studyLanguageFor(user?.persona?.targetLanguage);
  const language: PassageLanguage = isPassageLanguage(params.language) ? params.language : isPassageLanguage(preferred) ? preferred : 'japanese';

  return (
    <PageContainer>
      <div className="mx-auto max-w-2xl px-5 pb-28 md:px-0 md:pb-10">
        <PageHeader title="Bacaan & Simakan" subtitle={`${studyLanguageLabel[language]} · teks panjang dengan audio`} onBack={() => navigate(-1)} />
        <PassageLibrary key={language} language={language} />
      </div>
    </PageContainer>
  );
}
