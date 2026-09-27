import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Compass, XCircle } from 'lucide-react';
import PageContainer from '../../components/layout/PageContainer';
import { PageHeader } from '../../components/shared/NavComponents';
import { useAuth } from '../../auth/AuthContext';
import { buildLevelQuestions, type ExamQuestion } from '../../features/learning/examQuestions';
import { getStudyLevels, studyLanguageFor, studyLanguageLabel } from '../../features/learning/studyBank';

// Adaptive placement: five questions per level, pass with four to move up.
const QUESTIONS_PER_LEVEL = 5;
const PASS_MARK = 4;

type LevelResult = { levelIndex: number; correct: number };

export default function PlacementTestPage() {
  const navigate = useNavigate();
  const { user, updatePersona } = useAuth();
  const language = studyLanguageFor(user?.persona?.targetLanguage);
  const levels = getStudyLevels(language);
  const [attemptSeed] = useState(() => String(Date.now()));
  const [levelIndex, setLevelIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [results, setResults] = useState<LevelResult[]>([]);
  const [finished, setFinished] = useState(false);
  const [saved, setSaved] = useState('');
  const questions: ExamQuestion[] = useMemo(
    () => buildLevelQuestions(language, levels[levelIndex].id, { vocabulary: 3, reading: 1, grammar: 1 }, `placement-${attemptSeed}`).slice(0, QUESTIONS_PER_LEVEL),
    [attemptSeed, language, levelIndex, levels],
  );
  const question = questions[questionIndex];
  // The test stops at the first level that is not passed, so the last level
  // reached is the right starting point (or the top level if all passed).
  const recommended = levels[results[results.length - 1]?.levelIndex ?? 0];

  const choose = (option: string) => {
    if (selected) return;
    setSelected(option);
    if (option === question.answer) setCorrect((value) => value + 1);
  };

  const next = () => {
    setSelected(null);
    if (questionIndex + 1 < questions.length) {
      setQuestionIndex(questionIndex + 1);
      return;
    }
    const levelResult = { levelIndex, correct };
    const nextResults = [...results, levelResult];
    setResults(nextResults);
    if (correct >= PASS_MARK && levelIndex + 1 < levels.length) {
      setLevelIndex(levelIndex + 1);
      setQuestionIndex(0);
      setCorrect(0);
    } else {
      setFinished(true);
    }
  };

  const applyLevel = async () => {
    const result = await updatePersona({ level: recommended.personaLevel });
    setSaved(result.success ? `Level profil diperbarui ke ${recommended.label}.` : result.error || 'Gagal menyimpan level.');
  };

  if (finished) {
    return (
      <PageContainer>
        <div className="mx-auto max-w-md px-5 pb-28 pt-8 md:pb-10">
          <div className="text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-sky-50 text-sky-600"><Compass size={30} /></div>
            <h1 className="mt-4 text-2xl font-black text-slate-900">Rekomendasi level</h1>
            <p className="mt-2 text-4xl font-black text-sky-600">{recommended.label}</p>
            <p className="mt-2 text-sm font-semibold text-slate-500">{studyLanguageLabel[language]} · mulai belajar dari level ini.</p>
          </div>
          <div className="mt-6 space-y-2">
            {results.map((result) => (
              <div key={result.levelIndex} className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white px-4 py-3 text-sm font-bold shadow-sm">
                <span>{levels[result.levelIndex].label}</span>
                <span className={result.correct >= PASS_MARK ? 'text-emerald-600' : 'text-rose-500'}>
                  {result.correct}/{QUESTIONS_PER_LEVEL} {result.correct >= PASS_MARK ? 'lulus' : 'belum'}
                </span>
              </div>
            ))}
          </div>
          <button onClick={applyLevel} className="mt-6 w-full rounded-2xl bg-sky-600 py-4 text-sm font-black text-white">Pakai level {recommended.label}</button>
          {saved && <p className="mt-3 text-center text-sm font-bold text-emerald-600">{saved}</p>}
          <button onClick={() => navigate('/modul')} className="mt-3 w-full py-2 text-sm font-bold text-slate-500">Ke modul</button>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="mx-auto max-w-2xl px-5 pb-28 md:px-0 md:pb-10">
        <PageHeader title="Tes Penempatan" subtitle={`${studyLanguageLabel[language]} · level ${levels[levelIndex].label} · soal ${questionIndex + 1}/${questions.length}`} onBack={() => navigate(-1)} />
        <div className="mb-5 flex gap-1.5">
          {levels.map((level, index) => (
            <div key={level.id} className={`h-2 flex-1 rounded-full ${index < levelIndex ? 'bg-emerald-400' : index === levelIndex ? 'bg-sky-500' : 'bg-slate-100'}`} />
          ))}
        </div>
        <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
          <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">{question.section}</p>
          <p dir="auto" className="mt-2 text-base font-black leading-relaxed text-slate-900">{question.question}</p>
          <div className="mt-5 grid gap-2">
            {question.options.map((option) => {
              const isAnswer = option === question.answer;
              const isChosen = option === selected;
              const tone = !selected ? 'border-slate-200 hover:border-slate-400' : isAnswer ? 'border-emerald-400 bg-emerald-50' : isChosen ? 'border-rose-400 bg-rose-50' : 'border-slate-100 opacity-60';
              return (
                <button key={option} dir="auto" onClick={() => choose(option)} className={`flex items-center justify-between gap-3 rounded-2xl border bg-white px-4 py-3 text-left text-sm font-bold text-slate-800 ${tone}`}>
                  <span>{option}</span>
                  {selected && isAnswer && <CheckCircle2 size={18} className="shrink-0 text-emerald-500" />}
                  {selected && isChosen && !isAnswer && <XCircle size={18} className="shrink-0 text-rose-500" />}
                </button>
              );
            })}
          </div>
        </div>
        {selected && (
          <button onClick={next} className="mt-4 w-full rounded-2xl bg-slate-900 py-4 text-sm font-black text-white">Lanjut</button>
        )}
        <p className="mt-4 text-center text-xs font-semibold text-slate-400">Jawab {PASS_MARK} dari {QUESTIONS_PER_LEVEL} soal dengan benar untuk naik ke level berikutnya.</p>
      </div>
    </PageContainer>
  );
}
