import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Award, Clock, GraduationCap } from 'lucide-react';
import PageContainer from '../../components/layout/PageContainer';
import { PageHeader } from '../../components/shared/NavComponents';
import { useAuth } from '../../auth/AuthContext';
import { buildLevelQuestions, type ExamSection } from '../../features/learning/examQuestions';
import { getStudyLevels, studyLanguageLabel, studyLevelIndex, type StudyLanguage } from '../../features/learning/studyBank';

const EXAM_MINUTES = 20;
const PASS_PERCENT = 70;
const BEST_KEY = 'fluently_mock_exam_best_v1';
const examName: Record<StudyLanguage, string> = {
  english: 'Simulasi CEFR',
  japanese: 'Simulasi JLPT',
  mandarin: 'Simulasi HSK',
  arabic: 'Simulasi Ujian Bahasa Arab',
};

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
  const [attempt, setAttempt] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [secondsLeft, setSecondsLeft] = useState(EXAM_MINUTES * 60);
  const [submitted, setSubmitted] = useState(false);
  const [xpNote, setXpNote] = useState('');
  const level = levels[levelIndex];
  const questions = useMemo(
    () => (attempt ? buildLevelQuestions(language, level.id, { vocabulary: 12, reading: 10, grammar: 8 }, `exam-${attempt}`) : []),
    [attempt, language, level.id],
  );
  const [best, setBest] = useState(readBest);

  const submit = () => {
    if (submitted) return;
    setSubmitted(true);
    const score = questions.filter((question, index) => answers[index] === question.answer).length;
    const percent = Math.round((score / Math.max(1, questions.length)) * 100);
    saveBest(`${language}/${level.id}`, percent);
    setBest(readBest());
    if (percent >= PASS_PERCENT) {
      void awardXp(100, 'exam', `ujian/${language}/${level.id}`).then((result) => {
        setXpNote(result.duplicate ? 'XP kelulusan level ini sudah pernah diklaim.' : result.awarded ? `+${result.awarded} XP` : '');
      });
    }
  };

  useEffect(() => {
    if (!attempt || submitted) return;
    const timer = window.setInterval(() => setSecondsLeft((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [attempt, submitted]);

  useEffect(() => {
    if (attempt && !submitted && secondsLeft === 0) submit();
  });

  const start = () => {
    setAnswers({});
    setSecondsLeft(EXAM_MINUTES * 60);
    setSubmitted(false);
    setXpNote('');
    setAttempt(String(Date.now()));
  };

  if (!attempt) {
    return (
      <PageContainer>
        <div className="mx-auto max-w-xl px-5 pb-28 md:px-0 md:pb-10">
          <PageHeader title={examName[language]} subtitle={`${studyLanguageLabel[language]} · ${EXAM_MINUTES} menit`} onBack={() => navigate(-1)} />
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-indigo-50 text-indigo-600"><GraduationCap size={24} /></div>
              <p className="text-sm font-semibold text-slate-500">30 soal kosakata, membaca, dan tata bahasa. Lulus dengan skor minimal {PASS_PERCENT}%.</p>
            </div>
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
            <button onClick={start} className="mt-6 w-full rounded-2xl bg-indigo-600 py-4 text-sm font-black text-white">Mulai ujian {level.label}</button>
          </div>
          {language === 'english' && (
            <button onClick={() => navigate('/ujian/english')} className="mt-4 w-full rounded-2xl border border-slate-200 bg-white py-3 text-sm font-black text-slate-700">Buka TOEFL Practice Test</button>
          )}
        </div>
      </PageContainer>
    );
  }

  if (submitted) {
    const sections = (['Kosakata', 'Membaca', 'Tata bahasa'] as ExamSection[]).map((section) => {
      const items = questions.map((question, index) => ({ question, index })).filter((item) => item.question.section === section);
      return { section, total: items.length, correct: items.filter((item) => answers[item.index] === item.question.answer).length };
    }).filter((item) => item.total > 0);
    const score = sections.reduce((sum, item) => sum + item.correct, 0);
    const percent = Math.round((score / Math.max(1, questions.length)) * 100);
    return (
      <PageContainer>
        <div className="mx-auto max-w-xl px-5 pb-28 pt-6 md:px-0 md:pb-10">
          <div className="text-center">
            <Award size={48} className={`mx-auto ${percent >= PASS_PERCENT ? 'text-emerald-500' : 'text-slate-300'}`} />
            <h1 className="mt-3 text-2xl font-black text-slate-900">{percent >= PASS_PERCENT ? 'Lulus' : 'Belum lulus'} · {level.label}</h1>
            <p className="mt-2 text-5xl font-black text-slate-900">{percent}%</p>
            <p className="mt-1 text-sm font-semibold text-slate-500">{score} dari {questions.length} benar</p>
            {xpNote && <p className="mt-2 text-sm font-black text-amber-600">{xpNote}</p>}
          </div>
          <div className="mt-6 space-y-2">
            {sections.map((item) => (
              <div key={item.section} className="rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-sm">
                <div className="flex justify-between text-sm font-black text-slate-700">
                  <span>{item.section}</span>
                  <span>{item.correct}/{item.total}</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-indigo-500" style={{ width: `${(item.correct / item.total) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 space-y-3">
            {questions.map((question, index) => answers[index] !== question.answer && (
              <div key={question.question} className="rounded-2xl border border-rose-100 bg-rose-50/50 p-4 text-sm">
                <p dir="auto" className="font-bold text-slate-800">{question.question}</p>
                <p className="mt-1 font-semibold text-rose-600">Jawabanmu: {answers[index] || '-'}</p>
                <p dir="auto" className="font-semibold text-emerald-700">Benar: {question.answer}</p>
              </div>
            ))}
          </div>
          <button onClick={() => setAttempt(null)} className="mt-6 w-full rounded-2xl bg-slate-900 py-4 text-sm font-black text-white">Kembali</button>
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
        <PageHeader title={`${examName[language]} ${level.label}`} subtitle={`${answered}/${questions.length} dijawab`} onBack={() => setAttempt(null)} />
        <div className={`sticky top-2 z-10 mb-4 flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-black shadow-sm ${secondsLeft < 120 ? 'bg-rose-50 text-rose-700' : 'bg-white text-slate-700'}`}>
          <span className="inline-flex items-center gap-2"><Clock size={16} /> {minutes}:{seconds}</span>
          <button onClick={submit} className="rounded-xl bg-indigo-600 px-4 py-2 text-white">Kumpulkan</button>
        </div>
        <div className="space-y-4">
          {questions.map((question, index) => (
            <div key={question.question} className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
              <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">{index + 1}. {question.section}</p>
              <p dir="auto" className="mt-2 font-black leading-relaxed text-slate-900">{question.question}</p>
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
          ))}
        </div>
        <button onClick={submit} className="mt-6 w-full rounded-2xl bg-indigo-600 py-4 text-sm font-black text-white">Kumpulkan jawaban</button>
      </div>
    </PageContainer>
  );
}
