import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { CheckCircle2, ChevronRight, RotateCcw, Trophy, Volume2, XCircle } from 'lucide-react';
import PageContainer from '../../../components/layout/PageContainer';
import { PageHeader } from '../../../components/shared/NavComponents';
import { useAuth } from '../../../auth/AuthContext';
import { getJapaneseTopicList } from '../../module/japanese/japaneseLessonContent';
import {
  isJapaneseSkill,
  japaneseLevels,
  japaneseSkills,
  normalizeJapaneseLevel,
  type JapaneseLevelId,
  type JapaneseSkillId,
} from '../../module/japanese/japaneseModuleData';
import { buildJapanesePractice } from './japanesePracticeContent';

const SCORES_KEY = 'fluently_japanese_practice_scores_v1';
const HISTORY_KEY = 'fluently-practice-history-v1';

type ScoreMap = Record<string, number>;

function scoreKey(level: JapaneseLevelId, skill: JapaneseSkillId, topic: number) {
  return `${level}/${skill}/${topic}`;
}

function readScores(): ScoreMap {
  try {
    const parsed = JSON.parse(localStorage.getItem(SCORES_KEY) || '{}');
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function saveResult(level: JapaneseLevelId, skill: JapaneseSkillId, topic: number, topicTitle: string, score: number, total: number) {
  try {
    const scores = readScores();
    const percent = Math.round((score / Math.max(1, total)) * 100);
    const key = scoreKey(level, skill, topic);
    scores[key] = Math.max(scores[key] ?? 0, percent);
    localStorage.setItem(SCORES_KEY, JSON.stringify(scores));
    const history = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
    const attempt = {
      skillId: `japanese-${skill}`,
      topicTitle,
      score,
      total,
      weakestLevel: percent >= 80 ? 'Advanced' : percent >= 55 ? 'Intermediate' : 'Basic',
      completedAt: new Date().toISOString(),
    };
    localStorage.setItem(HISTORY_KEY, JSON.stringify([attempt, ...(Array.isArray(history) ? history : [])].slice(0, 200)));
  } catch {
    // storage unavailable: the session still works, only history is skipped
  }
}

function speakJapanese(text: string) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ja-JP';
  utterance.rate = 0.85;
  window.speechSynthesis.speak(utterance);
}

export function japanesePracticeLevel(level?: string): JapaneseLevelId {
  const value = (level || '').toLowerCase();
  if (value.includes('n1') || value.includes('proficiency') || value.includes('c2')) return 'proficiency';
  if (value.includes('n2') || value.includes('advanced') || value.includes('c1')) return 'advanced';
  if (value.includes('n3') || value.includes('intermediate') || value.includes('b1') || value.includes('b2')) return 'intermediate';
  if (value.includes('n4') || value.includes('elementary') || value.includes('a2')) return 'elementary';
  return 'beginner';
}

function useLevel(): [JapaneseLevelId, (level: JapaneseLevelId) => void] {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const fromQuery = searchParams.get('level');
  const level = fromQuery ? normalizeJapaneseLevel(fromQuery) : japanesePracticeLevel(user?.persona?.level);
  const setLevel = (next: JapaneseLevelId) => setSearchParams({ level: next }, { replace: true });
  return [level, setLevel];
}

export function JapanesePracticeTopicsPage() {
  const navigate = useNavigate();
  const { skillId } = useParams();
  const skill: JapaneseSkillId = isJapaneseSkill(skillId) ? skillId : 'vocabulary';
  const skillInfo = japaneseSkills.find((item) => item.id === skill) ?? japaneseSkills[0];
  const [level, setLevel] = useLevel();
  const topics = getJapaneseTopicList(level, skill);
  const scores = useMemo(() => readScores(), []);

  return (
    <PageContainer>
      <div className="pb-28 md:pb-8">
        <PageHeader title={`Latihan ${skillInfo.label}`} subtitle={`Japanese ${japaneseLevels[level].badge} · ${topics.length} topik`} onBack={() => navigate('/latihan')} />
        <div className="mx-5 mb-4 flex gap-2 overflow-x-auto pb-1 md:mx-0">
          {(Object.keys(japaneseLevels) as JapaneseLevelId[]).map((id) => (
            <button
              key={id}
              onClick={() => setLevel(id)}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-black transition ${id === level ? 'text-white shadow-sm' : 'bg-white text-slate-500 border border-slate-200'}`}
              style={id === level ? { backgroundColor: japaneseLevels[id].color } : undefined}
            >
              {japaneseLevels[id].badge}
            </button>
          ))}
        </div>
        <div className="mx-5 grid gap-3 md:mx-0 md:grid-cols-2">
          {topics.map((topic, index) => {
            const best = scores[scoreKey(level, skill, index + 1)];
            return (
              <motion.button
                key={topic}
                onClick={() => navigate(`/latihan/japanese/${skill}/topik${index + 1}?level=${level}`)}
                className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(index, 10) * 0.02 }}
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-sm font-black" style={{ backgroundColor: skillInfo.bgColor, color: skillInfo.color }}>
                  {index + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-black text-slate-800">{topic}</p>
                  <p className="text-xs font-semibold text-slate-400">{best !== undefined ? `Skor terbaik ${best}%` : 'Belum dicoba'}</p>
                </div>
                {best !== undefined && best >= 80 ? <CheckCircle2 size={18} className="text-emerald-500" /> : <ChevronRight size={18} className="text-slate-300" />}
              </motion.button>
            );
          })}
        </div>
      </div>
    </PageContainer>
  );
}

export function JapanesePracticeSessionPage() {
  const navigate = useNavigate();
  const { skillId, topicSlug } = useParams();
  const { awardXp } = useAuth();
  const skill: JapaneseSkillId = isJapaneseSkill(skillId) ? skillId : 'vocabulary';
  const [level] = useLevel();
  const topicNumber = Math.max(1, Number((topicSlug || '').match(/\d+/)?.[0] ?? 1));
  const topics = getJapaneseTopicList(level, skill);
  const topicTitle = topics[topicNumber - 1] ?? `Topik ${topicNumber}`;
  const questions = useMemo(() => buildJapanesePractice(level, skill, topicNumber), [level, skill, topicNumber]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [xpNote, setXpNote] = useState('');
  const question = questions[index];
  const backToTopics = () => navigate(`/latihan/japanese/${skill}?level=${level}`);

  if (topicNumber > topics.length || !question) {
    return (
      <PageContainer>
        <div className="grid min-h-[60vh] place-items-center p-6 text-center">
          <div>
            <p className="mb-4 font-black text-slate-700">Topik latihan tidak ditemukan.</p>
            <button onClick={backToTopics} className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-black text-white">Kembali</button>
          </div>
        </div>
      </PageContainer>
    );
  }

  const choose = (option: string) => {
    if (selected) return;
    setSelected(option);
    if (option === question.answer) setScore((value) => value + 1);
  };

  const next = () => {
    if (index + 1 < questions.length) {
      setIndex(index + 1);
      setSelected(null);
      return;
    }
    setFinished(true);
    saveResult(level, skill, topicNumber, `Japanese ${topicTitle}`, score, questions.length);
    const percent = score / questions.length;
    if (percent >= 0.6) {
      void awardXp(Math.round(percent * 30), 'practice', `latihan/japanese/${level}/${skill}/topik-${topicNumber}`).then((result) => {
        setXpNote(result.duplicate ? 'XP topik ini sudah diklaim sebelumnya.' : result.awarded ? `+${result.awarded} XP` : '');
      });
    } else {
      setXpNote('Raih minimal 60% untuk mendapatkan XP.');
    }
  };

  const restart = () => {
    setIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setXpNote('');
  };

  if (finished) {
    const percent = Math.round((score / questions.length) * 100);
    return (
      <PageContainer>
        <div className="mx-auto max-w-md px-5 pb-28 pt-10 text-center md:pb-10">
          <div className="mx-auto mb-4 grid h-20 w-20 place-items-center rounded-full bg-amber-50 text-amber-500">
            <Trophy size={36} />
          </div>
          <h1 className="text-2xl font-black text-slate-900">Latihan selesai</h1>
          <p className="mt-1 text-sm font-semibold text-slate-500">{topicTitle}</p>
          <p className="mt-6 text-5xl font-black text-slate-900">{percent}%</p>
          <p className="mt-1 text-sm font-semibold text-slate-500">{score} dari {questions.length} benar</p>
          {xpNote && <p className="mt-3 text-sm font-black text-amber-600">{xpNote}</p>}
          <div className="mt-8 grid gap-3">
            <button onClick={restart} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white py-3 text-sm font-black text-slate-700">
              <RotateCcw size={16} /> Ulangi
            </button>
            {topicNumber < topics.length && (
              <button
                onClick={() => { restart(); navigate(`/latihan/japanese/${skill}/topik${topicNumber + 1}?level=${level}`); }}
                className="rounded-2xl bg-slate-900 py-3 text-sm font-black text-white"
              >
                Topik berikutnya
              </button>
            )}
            <button onClick={backToTopics} className="py-2 text-sm font-bold text-slate-500">Daftar topik</button>
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="mx-auto max-w-2xl px-5 pb-28 md:px-0 md:pb-10">
        <PageHeader title={topicTitle} subtitle={`Japanese ${japaneseLevels[level].badge} · soal ${index + 1}/${questions.length}`} onBack={backToTopics} />
        <div className="mb-5 h-2 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-slate-900 transition-all" style={{ width: `${((index + (selected ? 1 : 0)) / questions.length) * 100}%` }} />
        </div>
        <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
          <p className="text-base font-black leading-relaxed text-slate-900" lang="ja">{question.question}</p>
          {question.audio && (
            <button
              onClick={() => speakJapanese(question.audio!)}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-sky-50 px-4 py-2 text-sm font-black text-sky-700"
            >
              <Volume2 size={16} /> Putar audio
            </button>
          )}
          <div className="mt-5 grid gap-2">
            {question.options.map((option) => {
              const isAnswer = option === question.answer;
              const isChosen = option === selected;
              const tone = !selected
                ? 'border-slate-200 bg-white hover:border-slate-400'
                : isAnswer
                  ? 'border-emerald-400 bg-emerald-50'
                  : isChosen
                    ? 'border-rose-400 bg-rose-50'
                    : 'border-slate-100 bg-white opacity-60';
              return (
                <button
                  key={option}
                  onClick={() => choose(option)}
                  className={`flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left text-sm font-bold text-slate-800 transition ${tone}`}
                  lang="ja"
                >
                  <span>{option}</span>
                  {selected && isAnswer && <CheckCircle2 size={18} className="shrink-0 text-emerald-500" />}
                  {selected && isChosen && !isAnswer && <XCircle size={18} className="shrink-0 text-rose-500" />}
                </button>
              );
            })}
          </div>
          {selected && (
            <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm font-semibold leading-relaxed text-slate-600" lang="ja">
              {question.explanation}
            </div>
          )}
        </div>
        {selected && (
          <button onClick={next} className="mt-4 w-full rounded-2xl bg-slate-900 py-4 text-sm font-black text-white">
            {index + 1 < questions.length ? 'Soal berikutnya' : 'Lihat hasil'}
          </button>
        )}
      </div>
    </PageContainer>
  );
}
