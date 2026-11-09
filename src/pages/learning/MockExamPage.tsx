import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Award, BookOpen, Clock, GraduationCap, Loader2, PenLine, Sparkles, Volume2 } from 'lucide-react';
import PageContainer from '../../components/layout/PageContainer';
import { PageHeader } from '../../components/shared/NavComponents';
import AiQuotaBadge from '../../components/shared/AiQuotaBadge';
import { useAuth } from '../../auth/AuthContext';
import { buildFormattedExam, examFormats, type FormattedQuestion } from '../../features/learning/examFormats';
import { assessExamWriting, generateAiExam, getAiWritingPart, weakParts, type AiExam, type WritingAssessment } from '../../features/learning/aiExam';
import { getStudyLevels, studyLanguageLabel, studyLevelIndex, studySpeechLang, type StudyLanguage } from '../../features/learning/studyLanguages';
import { speak } from '../../utils/speech';

const PASS_PERCENT = 70;
const BEST_KEY = 'fluently_mock_exam_best_v1';
const WRITING_MINUTES = 15;
// Share of the final score taken by the writing part when the paper has one.
const WRITING_WEIGHT = 0.2;

type ExamMode = 'bank' | 'ai';

function isStudyLanguage(value?: string): value is StudyLanguage {
  return value === 'english' || value === 'japanese' || value === 'mandarin' || value === 'arabic';
}

function readBest(): Record<string, number> {
  try {
    return JSON.parse(localStorage.getItem(BEST_KEY) || '{}');
  } catch {
    return {};
  }
}

function saveBest(key: string, percent: number) {
  try {
    const best = readBest();
    best[key] = Math.max(best[key] ?? 0, percent);
    localStorage.setItem(BEST_KEY, JSON.stringify(best));
  } catch {
    // ignore storage failures
  }
}

export default function MockExamPage() {
  const navigate = useNavigate();
  const params = useParams();
  const { user, awardXp } = useAuth();
  const language: StudyLanguage = isStudyLanguage(params.language) ? params.language : 'english';
  const levels = getStudyLevels(language);
  const [levelIndex, setLevelIndex] = useState(() => studyLevelIndex(language, user?.persona?.level));
  const [mode, setMode] = useState<ExamMode>('ai');
  const [attempt, setAttempt] = useState<string | null>(null);
  const [aiExam, setAiExam] = useState<AiExam | null>(null);
  const [generating, setGenerating] = useState(false);
  const [notice, setNotice] = useState('');
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [writingAnswer, setWritingAnswer] = useState('');
  const [writingResult, setWritingResult] = useState<WritingAssessment | null>(null);
  const [assessing, setAssessing] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(examFormats[language].minutes * 60);
  const [submitted, setSubmitted] = useState(false);
  const [xpNote, setXpNote] = useState('');
  const level = levels[levelIndex];
  const format = examFormats[language];
  const bankQuestions = useMemo(
    () => (attempt && !aiExam ? buildFormattedExam(language, level.id, `exam-${attempt}`) : []),
    [aiExam, attempt, language, level.id],
  );
  const questions: FormattedQuestion[] = aiExam?.questions ?? bankQuestions;
  const writing = aiExam?.writing ?? null;
  const aiWritingPart = getAiWritingPart(language, levelIndex);
  const [best, setBest] = useState(readBest);

  const scoreOf = (items: FormattedQuestion[]) => items.filter((question) => answers[questions.indexOf(question)] === question.answer).length;

  const finish = (percent: number) => {
    saveBest(`${language}/${level.id}`, percent);
    setBest(readBest());
    if (percent >= PASS_PERCENT) {
      void awardXp(100, 'exam', `ujian/${language}/${level.id}`).then((result) => {
        setXpNote(result.duplicate ? 'XP kelulusan level ini sudah pernah diklaim.' : result.awarded ? `+${result.awarded} XP` : '');
      });
    }
  };

  const choicePercent = () => Math.round((scoreOf(questions) / Math.max(1, questions.length)) * 100);

  const submit = () => {
    if (submitted) return;
    setSubmitted(true);
    if (!writing) {
      finish(choicePercent());
      return;
    }
    setAssessing(true);
    void assessExamWriting(language, level.id, writing.task, writingAnswer).then((result) => {
      setWritingResult(result);
      setAssessing(false);
      const writingScore = result?.overall ?? (writingAnswer.trim() ? null : 0);
      finish(writingScore === null ? choicePercent() : Math.round(choicePercent() * (1 - WRITING_WEIGHT) + writingScore * WRITING_WEIGHT));
    });
  };

  useEffect(() => {
    if (!attempt || submitted) return;
    const timer = window.setInterval(() => setSecondsLeft((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [attempt, submitted]);

  useEffect(() => {
    if (attempt && !submitted && secondsLeft === 0) submit();
  });

  const reset = () => {
    setAnswers({});
    setWritingAnswer('');
    setWritingResult(null);
    setSubmitted(false);
    setXpNote('');
    setNotice('');
  };

  const start = async () => {
    reset();
    const seed = String(Date.now());
    if (mode === 'bank') {
      setAiExam(null);
      setSecondsLeft(format.minutes * 60);
      setAttempt(seed);
      return;
    }

    setGenerating(true);
    const exam = await generateAiExam(language, level.id, levelIndex, seed).catch(() => null);
    setGenerating(false);
    const generated = exam?.parts.reduce((sum, part) => sum + part.generated, 0) ?? 0;
    if (!exam || generated === 0) {
      setAiExam(null);
      setNotice('AI sedang tidak tersedia, jadi ujian ini memakai soal standar.');
    } else {
      setAiExam(exam);
      const filled = exam.parts.reduce((sum, part) => sum + part.fromBank, 0);
      setNotice(filled ? `${generated} soal dibuat AI, ${filled} soal dilengkapi dari bank soal standar.` : '');
    }
    setSecondsLeft((format.minutes + (generated && exam?.writing ? WRITING_MINUTES : 0)) * 60);
    setAttempt(seed);
  };

  const backToStart = () => {
    setAttempt(null);
    setAiExam(null);
  };

  if (!attempt) {
    return (
      <PageContainer>
        <div className="mx-auto max-w-xl px-5 pb-28 md:px-0 md:pb-10">
          <PageHeader title={format.name} subtitle={`${studyLanguageLabel[language]} · ${format.minutes} menit`} onBack={() => navigate(-1)} />
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-indigo-50 text-indigo-600"><GraduationCap size={24} /></div>
              <div>
                <p className="text-sm font-semibold text-slate-500">Format resmi per bagian, termasuk soal menyimak (audio) dan bacaan panjang. Lulus dengan skor minimal {PASS_PERCENT}%.</p>
                <ul className="mt-2 space-y-0.5 text-xs font-bold text-slate-600">
                  {format.parts.map((part) => <li key={part.id}>{part.native} · {part.label} · {part.count} soal</li>)}
                  {mode === 'ai' && aiWritingPart && <li>{aiWritingPart.native} · {aiWritingPart.label} · 1 tugas (+{WRITING_MINUTES} menit)</li>}
                </ul>
              </div>
            </div>

            <p className="mt-6 text-xs font-black uppercase tracking-widest text-slate-400">Jenis soal</p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {([
                { id: 'ai', icon: Sparkles, title: 'Generate dengan AI', sub: 'Soal baru tiap kali, tipe soal asli + pembahasan' },
                { id: 'bank', icon: BookOpen, title: 'Soal standar', sub: 'Dari bank soal, tanpa kuota AI' },
              ] as const).map((item) => (
                <button
                  key={item.id}
                  onClick={() => setMode(item.id)}
                  className={`rounded-2xl border px-3 py-3 text-left ${mode === item.id ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200'}`}
                >
                  <span className={`flex items-center gap-1.5 text-sm font-black ${mode === item.id ? 'text-indigo-700' : 'text-slate-700'}`}>
                    <item.icon size={15} /> {item.title}
                  </span>
                  <span className="mt-1 block text-[11px] font-semibold leading-snug text-slate-500">{item.sub}</span>
                </button>
              ))}
            </div>
            {mode === 'ai' && <div className="mt-3"><AiQuotaBadge /></div>}

            <p className="mt-6 text-xs font-black uppercase tracking-widest text-slate-400">Pilih level</p>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {levels.map((item, index) => {
                const bestScore = best[`${language}/${item.id}`];
                return (
                  <button
                    key={item.id}
                    onClick={() => setLevelIndex(index)}
                    className={`rounded-2xl border px-3 py-3 text-sm font-black ${index === levelIndex ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-slate-200 text-slate-600'}`}
                  >
                    {item.label}
                    <span className="block text-[10px] font-bold text-slate-400">{bestScore !== undefined ? `terbaik ${bestScore}%` : 'belum'}</span>
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => void start()}
              disabled={generating}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 py-4 text-sm font-black text-white disabled:opacity-70"
            >
              {generating ? <><Loader2 size={16} className="animate-spin" /> Menyusun soal {level.label}… (±30 detik)</> : `Mulai ujian ${level.label}`}
            </button>
          </div>
          {language === 'english' && (
            <button onClick={() => navigate('/ujian/english')} className="mt-4 w-full rounded-2xl border border-slate-200 bg-white py-3 text-sm font-black text-slate-700">Buka TOEFL Practice Test</button>
          )}
        </div>
      </PageContainer>
    );
  }

  if (submitted) {
    const sections = format.parts.map((part) => {
      const items = questions.filter((question) => question.part === part.id);
      return { id: part.id, label: `${part.native} · ${part.label}`, total: items.length, correct: scoreOf(items) };
    }).filter((item) => item.total > 0);
    const score = sections.reduce((sum, item) => sum + item.correct, 0);
    const choice = choicePercent();
    const writingScore = writingResult?.overall ?? (writing && !writingAnswer.trim() ? 0 : null);
    const percent = writing && writingScore !== null ? Math.round(choice * (1 - WRITING_WEIGHT) + writingScore * WRITING_WEIGHT) : choice;
    const weak = weakParts(sections);
    return (
      <PageContainer>
        <div className="mx-auto max-w-xl px-5 pb-28 pt-6 md:px-0 md:pb-10">
          <div className="text-center">
            <Award size={48} className={`mx-auto ${percent >= PASS_PERCENT ? 'text-emerald-500' : 'text-slate-300'}`} />
            <h1 className="mt-3 text-2xl font-black text-slate-900">
              {assessing ? 'Menilai tulisan…' : `${percent >= PASS_PERCENT ? 'Lulus' : 'Belum lulus'} · ${level.label}`}
            </h1>
            <p className="mt-2 text-5xl font-black text-slate-900">{assessing ? <Loader2 className="mx-auto animate-spin" size={40} /> : `${percent}%`}</p>
            <p className="mt-1 text-sm font-semibold text-slate-500">{score} dari {questions.length} soal pilihan ganda benar</p>
            {xpNote && <p className="mt-2 text-sm font-black text-amber-600">{xpNote}</p>}
          </div>
          <div className="mt-6 space-y-2">
            {sections.map((item) => (
              <div key={item.id} className="rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-sm">
                <div className="flex justify-between text-sm font-black text-slate-700">
                  <span>{item.label}</span>
                  <span>{item.correct}/{item.total}</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-indigo-500" style={{ width: `${(item.correct / item.total) * 100}%` }} />
                </div>
              </div>
            ))}
            {writing && (
              <div className="rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-sm">
                <div className="flex justify-between text-sm font-black text-slate-700">
                  <span>{writing.part.native} · {writing.part.label}</span>
                  <span>{assessing ? '…' : writingScore === null ? 'tidak dinilai' : `${writingScore}/100`}</span>
                </div>
                {writingResult && (
                  <div className="mt-2 space-y-1 text-xs font-semibold leading-relaxed text-slate-600">
                    <p>{writingResult.summary}</p>
                    {writingResult.improvements.map((item) => <p key={item}>• {item}</p>)}
                    {writingResult.corrected && <p dir="auto" className="rounded-xl bg-emerald-50 p-2 text-emerald-800">{writingResult.corrected}</p>}
                  </div>
                )}
                {!assessing && !writingResult && writingAnswer.trim() && (
                  <p className="mt-2 text-xs font-semibold text-slate-500">Penilaian AI untuk tulisan sedang tidak tersedia, jadi skor akhir hanya dari pilihan ganda.</p>
                )}
              </div>
            )}
          </div>

          {weak.length > 0 && (
            <div className="mt-6 rounded-2xl border border-amber-100 bg-amber-50/60 p-4">
              <p className="text-sm font-black text-amber-800">Perlu dilatih</p>
              <ul className="mt-1 space-y-0.5 text-sm font-semibold text-amber-900">
                {weak.map((item) => <li key={item.id}>• {item.label}: {Math.round((item.correct / item.total) * 100)}%</li>)}
              </ul>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <button onClick={() => navigate('/latihan')} className="rounded-xl bg-white py-2 text-xs font-black text-amber-800 ring-1 ring-amber-200">Buka Practice</button>
                <button onClick={() => navigate('/chat')} className="rounded-xl bg-white py-2 text-xs font-black text-amber-800 ring-1 ring-amber-200">Latihan dengan Chat AI</button>
              </div>
            </div>
          )}

          <p className="mt-6 text-xs font-black uppercase tracking-widest text-slate-400">Pembahasan soal yang salah</p>
          <div className="mt-2 space-y-3">
            {questions.map((question, index) => answers[index] !== question.answer && (
              <div key={index} className="rounded-2xl border border-rose-100 bg-rose-50/50 p-4 text-sm">
                {question.type && <p className="text-[11px] font-black text-rose-400">{question.type}</p>}
                <p dir="auto" className="font-bold text-slate-800">{index + 1}. {question.question}</p>
                {question.audio && <p dir="auto" className="mt-1 whitespace-pre-line text-xs text-slate-500">Audio: {question.audio}</p>}
                <p className="mt-1 font-semibold text-rose-600">Jawabanmu: {answers[index] || '-'}</p>
                <p dir="auto" className="font-semibold text-emerald-700">Benar: {question.answer}</p>
                {question.explanation && <p className="mt-2 rounded-xl bg-white/80 p-2 text-xs font-semibold leading-relaxed text-slate-600">💡 {question.explanation}</p>}
              </div>
            ))}
          </div>
          <button onClick={backToStart} className="mt-6 w-full rounded-2xl bg-slate-900 py-4 text-sm font-black text-white">Kembali</button>
        </div>
      </PageContainer>
    );
  }

  const answered = Object.keys(answers).length;
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = String(secondsLeft % 60).padStart(2, '0');
  return (
    <PageContainer>
      <div className="mx-auto max-w-2xl px-5 pb-28 md:px-0 md:pb-10">
        <PageHeader title={`${format.name} ${level.label}`} subtitle={`${answered}/${questions.length} dijawab${aiExam ? ' · soal AI' : ''}`} onBack={backToStart} />
        {notice && <p className="mb-3 rounded-2xl bg-amber-50 px-4 py-2 text-xs font-bold text-amber-800">{notice}</p>}
        <div className={`sticky top-2 z-10 mb-4 flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-black shadow-sm ${secondsLeft < 120 ? 'bg-rose-50 text-rose-700' : 'bg-white text-slate-700'}`}>
          <span className="inline-flex items-center gap-2"><Clock size={16} /> {minutes}:{seconds}</span>
          <button onClick={submit} className="rounded-xl bg-indigo-600 px-4 py-2 text-white">Kumpulkan</button>
        </div>
        <div className="space-y-4">
          {questions.map((question, index) => {
            const part = format.parts.find((item) => item.id === question.part);
            const firstOfPart = index === 0 || questions[index - 1].part !== question.part;
            const sameContext = index > 0 && question.context && questions[index - 1].context?.text === question.context.text;
            const sameAudio = index > 0 && question.audio && questions[index - 1].audio === question.audio;
            return (
              <div key={index} className="space-y-3">
                {firstOfPart && part && (
                  <div className="rounded-2xl bg-slate-900 px-4 py-3 text-white">
                    <p className="text-sm font-black">{part.native}</p>
                    <p className="text-xs font-semibold text-slate-300">{part.label}{part.kind === 'listening' ? ' · putar audio, teks tidak ditampilkan' : ''}</p>
                  </div>
                )}
                {question.context && !sameContext && (
                  <div className="rounded-3xl border border-indigo-100 bg-indigo-50/50 p-5">
                    <p className="text-[11px] font-black uppercase tracking-widest text-indigo-500">Bacaan · {question.context.title}</p>
                    <p dir="auto" className="mt-2 whitespace-pre-line text-lg leading-loose text-slate-900">{question.context.text}</p>
                  </div>
                )}
                <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
                  <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">{index + 1}. {question.type || part?.label || question.section}</p>
                  {question.audio && (
                    <button
                      onClick={() => speak(question.audio!, studySpeechLang[language])}
                      className="mt-2 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-3 py-2 text-xs font-black text-white"
                    >
                      <Volume2 size={14} /> {sameAudio ? 'Putar ulang audio' : 'Putar audio'}
                    </button>
                  )}
                  <p dir="auto" className="mt-2 whitespace-pre-line font-black leading-relaxed text-slate-900">{question.question}</p>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {question.options.map((option) => (
                      <button
                        key={option}
                        dir="auto"
                        onClick={() => setAnswers((current) => ({ ...current, [index]: option }))}
                        className={`rounded-2xl border px-4 py-3 text-left text-sm font-bold ${answers[index] === option ? 'border-indigo-500 bg-indigo-50 text-indigo-800' : 'border-slate-200 text-slate-700'}`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}

          {writing && (
            <div className="space-y-3">
              <div className="rounded-2xl bg-slate-900 px-4 py-3 text-white">
                <p className="text-sm font-black">{writing.part.native}</p>
                <p className="text-xs font-semibold text-slate-300">{writing.part.label} · dinilai AI dengan rubrik level</p>
              </div>
              <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
                <p className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-slate-400"><PenLine size={13} /> Tugas menulis{writing.task.target ? ` · ${writing.task.target}` : ''}</p>
                <p dir="auto" className="mt-2 whitespace-pre-line font-black leading-relaxed text-slate-900">{writing.task.prompt}</p>
                <p className="mt-1 text-sm font-semibold text-slate-500">{writing.task.instruction}</p>
                {writing.task.words.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {writing.task.words.map((word) => <span key={word} className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-black text-indigo-700">{word}</span>)}
                  </div>
                )}
                <textarea
                  dir="auto"
                  value={writingAnswer}
                  onChange={(event) => setWritingAnswer(event.target.value)}
                  rows={6}
                  placeholder="Tulis jawabanmu di sini…"
                  className="mt-3 w-full rounded-2xl border border-slate-200 p-3 text-base outline-none focus:border-indigo-400"
                />
                <p className="mt-1 text-right text-[11px] font-bold text-slate-400">{writingAnswer.replace(/\s+/g, '').length} karakter</p>
              </div>
            </div>
          )}
        </div>
        <button onClick={submit} className="mt-6 w-full rounded-2xl bg-indigo-600 py-4 text-sm font-black text-white">Kumpulkan jawaban</button>
      </div>
    </PageContainer>
  );
}
