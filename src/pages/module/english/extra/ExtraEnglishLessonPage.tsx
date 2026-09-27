import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Eye, EyeOff, Lightbulb, PenTool, Volume2 } from 'lucide-react';
import LessonShell from '../../../../components/shared/LessonShell';
import LessonCompleteModal from '../../../../components/shared/LessonCompleteModal';
import { playAudio } from '../../../../services/ttsService';
import { markCompletedId, readCompletedIds } from '../../../../utils/lessonProgress';
import { buildChoiceQuestion, hashSeed, seededRandom, type ChoiceQuestion } from '../../../../utils/quiz';
import { getExtraEnglishLessons, type ExtraEnglishLesson } from '.';

const accent: Record<string, string> = {
  grammar: '#8E44AD', listening: '#0EA5E9', pronunciation: '#F97316', reading: '#10B981',
  speaking: '#E74C3C', vocabulary: '#4FA3D1', writing: '#D97706',
};
const levelLabel: Record<string, string> = { beginner: 'Beginner', elementary: 'Elementary' };

type Props = { level: string; skill: string; lesson: ExtraEnglishLesson };

export default function ExtraEnglishLessonPage({ level, skill, lesson }: Props) {
  const navigate = useNavigate();
  const color = accent[skill] ?? '#4FA3D1';
  const storageKey = `talky_${level}_${skill}_completed`;
  const [isCompleted, setIsCompleted] = useState(() => readCompletedIds(storageKey).includes(lesson.id));
  const [showModal, setShowModal] = useState(false);
  const [showScript, setShowScript] = useState(skill !== 'listening');
  const [showMeaning, setShowMeaning] = useState(false);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const questions = useMemo<ChoiceQuestion[]>(() => {
    const random = seededRandom(hashSeed('english-extra', level, skill, lesson.id));
    return lesson.practice
      .map(([question, answer, distractors]) => buildChoiceQuestion(question, answer, distractors, random))
      .filter((item): item is ChoiceQuestion => item !== null);
  }, [level, skill, lesson]);
  const lessons = getExtraEnglishLessons(level, skill);
  const next = lessons.find((item) => item.id === lesson.id + 1);
  const nextLessonPath = next ? `/modul/english/${level}/${skill}/lesson-${next.id}` : undefined;
  const score = questions.filter((question, index) => answers[index] === question.answer).length;
  const scriptTitle = skill === 'listening' ? 'Skrip menyimak' : skill === 'reading' ? 'Teks bacaan' : 'Dialog model';

  const complete = () => {
    markCompletedId(storageKey, lesson.id);
    setIsCompleted(true);
    setShowModal(true);
  };

  const playScript = () => {
    if (lesson.dialogue) playAudio(lesson.dialogue.map(([, english]) => english).join(' '));
  };

  return (
    <>
      <LessonCompleteModal
        show={showModal}
        onClose={() => setShowModal(false)}
        lessonLabel={`${levelLabel[level] ?? level} ${skill} Lesson ${lesson.id}`}
        accentColor={color}
        nextLessonPath={nextLessonPath}
        onNext={nextLessonPath ? () => { setShowModal(false); navigate(nextLessonPath); } : undefined}
        onBack={() => { setShowModal(false); navigate(-1); }}
      />
      <LessonShell
        title={lesson.title}
        subtitle={`${skill.charAt(0).toUpperCase()}${skill.slice(1)} • Pelajaran ${lesson.id}`}
        accentColor={color}
        nextLesson={nextLessonPath}
        footer={() => (
          <button
            onClick={isCompleted ? () => navigate(-1) : complete}
            className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 font-bold text-white shadow-lg transition-all hover:opacity-90 active:scale-[0.98]"
            style={{ background: isCompleted ? 'linear-gradient(135deg, #4FA3D1, #1E6F9F)' : `linear-gradient(135deg, ${color}, ${color}cc)` }}
          >
            <CheckCircle2 size={18} />
            {isCompleted ? 'Sudah Selesai ✓' : 'Selesai'}
          </button>
        )}
      >
        {(tabId) => tabId === 'learn' ? (
          <div className="space-y-5">
            <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <p className="text-xs font-black uppercase tracking-widest" style={{ color }}>{lesson.subtitle}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">{lesson.intro}</p>
              <ul className="mt-4 space-y-2">
                {lesson.points.map((point) => (
                  <li key={point} className="flex gap-2 text-sm text-slate-700">
                    <Lightbulb size={16} className="mt-0.5 shrink-0" style={{ color }} /> {point}
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <h3 className="mb-3 text-sm font-black text-slate-900">Contoh</h3>
              <div className="space-y-2">
                {lesson.examples.map(([english, meaning]) => (
                  <button key={english} onClick={() => playAudio(english)} className="flex w-full items-start gap-3 rounded-xl bg-slate-50 p-3 text-left hover:bg-slate-100">
                    <Volume2 size={16} className="mt-0.5 shrink-0" style={{ color }} />
                    <span>
                      <span className="block text-sm font-bold text-slate-900">{english}</span>
                      <span className="block text-xs text-slate-500">{meaning}</span>
                    </span>
                  </button>
                ))}
              </div>
            </section>

            {lesson.dialogue && (
              <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-sm font-black text-slate-900">{scriptTitle}</h3>
                  <div className="flex flex-wrap gap-2">
                    <button onClick={playScript} className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold text-white" style={{ backgroundColor: color }}>
                      <Volume2 size={14} /> Putar
                    </button>
                    {skill === 'listening' && (
                      <button onClick={() => setShowScript((value) => !value)} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700">
                        {showScript ? <EyeOff size={14} /> : <Eye size={14} />} {showScript ? 'Sembunyikan teks' : 'Tampilkan teks'}
                      </button>
                    )}
                    {showScript && (
                      <button onClick={() => setShowMeaning((value) => !value)} className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700">
                        {showMeaning ? 'Sembunyikan arti' : 'Tampilkan arti'}
                      </button>
                    )}
                  </div>
                </div>
                {showScript ? (
                  <div className="space-y-2">
                    {lesson.dialogue.map(([speaker, english, meaning]) => (
                      <button key={`${speaker}-${english}`} onClick={() => playAudio(english)} className="block w-full rounded-xl bg-slate-50 p-3 text-left hover:bg-slate-100">
                        {skill !== 'reading' && <span className="text-[11px] font-black uppercase tracking-wider" style={{ color }}>{speaker}</span>}
                        <span className="block text-sm font-semibold text-slate-900">{english}</span>
                        {showMeaning && <span className="mt-0.5 block text-xs text-slate-500">{meaning}</span>}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">Putar audio 2–3 kali tanpa melihat teks, kerjakan latihan, lalu buka teks untuk mengecek.</p>
                )}
              </section>
            )}

            <section className="rounded-2xl border border-dashed p-5" style={{ borderColor: `${color}66`, backgroundColor: `${color}0d` }}>
              <h3 className="flex items-center gap-2 text-sm font-black text-slate-900"><PenTool size={16} style={{ color }} /> Tugas produksi</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">{lesson.task}</p>
            </section>
          </div>
        ) : (
          <div className="space-y-4">
            {questions.map((question, index) => (
              <div key={question.question} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                <p className="text-sm font-bold text-slate-900">{index + 1}. {question.question}</p>
                <div className="mt-3 grid gap-2">
                  {question.options.map((option) => {
                    const selected = answers[index] === option;
                    const tone = !checked
                      ? selected ? 'border-slate-900 bg-slate-50 text-slate-900' : 'border-slate-200 text-slate-700'
                      : option === question.answer ? 'border-emerald-400 bg-emerald-50 text-emerald-800'
                      : selected ? 'border-rose-300 bg-rose-50 text-rose-700' : 'border-slate-200 text-slate-400';
                    return (
                      <button key={option} disabled={checked} onClick={() => setAnswers((prev) => ({ ...prev, [index]: option }))} className={`rounded-xl border px-3 py-2 text-left text-sm font-semibold ${tone}`}>
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
            {!checked ? (
              <button
                onClick={() => setChecked(true)}
                disabled={Object.keys(answers).length < questions.length}
                className="w-full rounded-xl py-3 text-sm font-black text-white disabled:opacity-40"
                style={{ backgroundColor: color }}
              >
                Cek jawaban
              </button>
            ) : (
              <div className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm">
                <p className="text-sm font-black text-slate-800">Skor {score}/{questions.length}</p>
                <button onClick={() => { setAnswers({}); setChecked(false); }} className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700">Ulangi</button>
              </div>
            )}
          </div>
        )}
      </LessonShell>
    </>
  );
}
