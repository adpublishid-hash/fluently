import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BookOpen, CheckCircle, ChevronLeft, ClipboardCheck, Layers, ListChecks, Target, Volume2 } from 'lucide-react';
import { getMandarinLesson } from './mandarinLessonContent';
import { isMandarinSkill, mandarinLessonCounts, mandarinLevels, mandarinSkills, normalizeMandarinLevel, type MandarinSkillId } from './mandarinModuleData';
import { useAuth } from '../../../auth/AuthContext';
import { languageCompletionKey, markCompletedId } from '../../../utils/lessonProgress';
import StrokeOrderPanel from '../../../components/shared/StrokeOrderPanel';
import RubricCard from '../../../components/shared/RubricCard';

function parseLessonId(raw?: string) {
  const match = (raw ?? 'lesson-1').match(/\d+/);
  return Number(match?.[0] ?? 1);
}

function markComplete(levelId: string, skillId: string, lessonId: number) {
  return markCompletedId(languageCompletionKey('mandarin', levelId, skillId), lessonId);
}

function speakMandarin(text: string) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'zh-CN';
  utterance.rate = 0.82;
  window.speechSynthesis.speak(utterance);
}

export default function MandarinLessonPage() {
  const { awardXp } = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  const levelId = normalizeMandarinLevel(params.levelId);
  const skillId: MandarinSkillId = isMandarinSkill(params.skillId) ? params.skillId : 'grammar';
  const lessonId = parseLessonId(params.lessonSlug);
  const totalLessons = mandarinLessonCounts[levelId][skillId];
  const level = mandarinLevels[levelId];
  const skill = mandarinSkills.find((item) => item.id === skillId) ?? mandarinSkills[0];
  const lesson = getMandarinLesson(skillId, lessonId, levelId);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [activeTab, setActiveTab] = useState<'materi' | 'latihan'>('materi');

  const goBack = () => navigate(`/modul/mandarin/${levelId}/${skillId}`);
  const completeAndContinue = () => {
    markComplete(levelId, skillId, lessonId);
    void awardXp(50, 'lesson', `modul/mandarin/${levelId}/${skillId}/lesson-${lessonId}`);
    if (lessonId < totalLessons) navigate(`/modul/mandarin/${levelId}/${skillId}/lesson-${lessonId + 1}`);
    else goBack();
  };

  if (lessonId < 1 || lessonId > totalLessons) {
    return (
      <div className="min-h-screen grid place-items-center bg-slate-50 p-6">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 max-w-md text-center">
          <h1 className="text-xl font-black text-slate-800 mb-2">Lesson tidak ditemukan</h1>
          <p className="text-sm text-slate-500 mb-6">Materi Mandarin untuk path ini belum tersedia.</p>
          <button onClick={goBack} className="px-5 py-3 rounded-xl text-white font-bold" style={{ backgroundColor: level.color }}>
            Kembali ke daftar
          </button>
        </div>
      </div>
    );
  }

  const progress = Math.min(100, Math.max(0, (lessonId / totalLessons) * 100));

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between gap-3">
          <button onClick={goBack} className="w-10 h-10 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-center transition">
            <ChevronLeft size={20} className="text-slate-700" />
          </button>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] truncate" style={{ color: level.color }}>Mandarin {level.badge} - {skill.label}</p>
            <h1 className="text-sm md:text-base font-black text-slate-900 truncate">Lesson {lessonId}</h1>
          </div>
          <button
            onClick={completeAndContinue}
            className="px-4 h-10 rounded-xl text-xs font-black text-white shadow-sm transition"
            style={{ backgroundColor: level.color }}
          >
            {lessonId < totalLessons ? 'Next' : 'Done'}
          </button>
        </div>
        <div className="h-1 bg-slate-100">
          <div className="h-full transition-all" style={{ width: `${progress}%`, backgroundColor: level.color }} />
        </div>
      </div>

      <main className="mx-auto max-w-5xl px-4 py-6 pb-28 space-y-4">
        <section className="rounded-2xl bg-white border border-slate-200 p-5 md:p-6 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${level.color}12`, color: level.color }}>
              <Target size={21} />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: level.color }}>Mandarin {level.badge}</p>
              <h1 className="mt-1 text-xl md:text-2xl font-black text-slate-900">{lesson.title}</h1>
              <p className="mt-1 text-sm font-semibold text-slate-500">{lesson.subtitle}</p>
              <p className="mt-4 text-sm leading-relaxed text-slate-700">{lesson.objective}</p>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-2 rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
          {[
            { id: 'materi' as const, label: 'Materi' },
            { id: 'latihan' as const, label: `Latihan ${lesson.practice.length} Soal` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-xl px-4 py-3 text-sm font-black transition ${activeTab === tab.id ? 'text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
              style={activeTab === tab.id ? { backgroundColor: level.color } : undefined}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'materi' && (
        <>
        <section className="rounded-2xl bg-white border border-slate-200 p-5 md:p-6 shadow-sm">
          <h2 className="font-black text-slate-900 mb-4 flex items-center gap-2">
            <BookOpen size={18} style={{ color: level.color }} />
            Materi Inti
          </h2>
          <div className="space-y-3">
            {lesson.explanation.map((item) => (
              <p key={item} className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-sm leading-relaxed text-slate-700">
                {item}
              </p>
            ))}
          </div>
        </section>

        <section className="rounded-2xl bg-white border border-slate-200 p-5 md:p-6 shadow-sm">
          <h2 className="font-black text-slate-900 mb-4 flex items-center gap-2">
            <CheckCircle size={18} style={{ color: skill.color }} />
            Fokus Materi
          </h2>
          <div className="grid gap-3 md:grid-cols-2">
            {lesson.focus.map((item) => (
              <div key={item} className="flex gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4">
                <CheckCircle size={18} className="shrink-0 mt-0.5" style={{ color: skill.color }} />
                <p className="text-sm text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl bg-white border border-slate-200 p-5 md:p-6 shadow-sm">
            <h2 className="font-black text-slate-900 mb-4 flex items-center gap-2">
              <Layers size={18} style={{ color: level.color }} />
              Pola/Rumus
            </h2>
            <div className="space-y-3">
              {lesson.patterns.map((pattern) => (
                <div key={pattern.label} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <p className="text-xs font-black uppercase tracking-wider" style={{ color: level.color }}>{pattern.label}</p>
                  <p lang="zh-CN" className="mt-2 text-2xl font-bold text-slate-900 leading-relaxed">{pattern.hanzi}</p>
                  <p className="mt-2 text-xs font-semibold text-slate-500">{pattern.pinyin}</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-700">{pattern.meaning}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 p-5 md:p-6 shadow-sm">
            <h2 className="font-black text-slate-900 mb-4 flex items-center gap-2">
              <BookOpen size={18} style={{ color: skill.color }} />
              Kosakata HSK
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {lesson.vocabulary.map((word) => (
                <button
                  key={`${word.hanzi}-${word.pinyin}`}
                  onClick={() => speakMandarin(word.hanzi)}
                  className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-left hover:bg-red-50/60 transition"
                  title="Dengarkan Mandarin"
                >
                  <p lang="zh-CN" className="text-2xl font-bold text-slate-900 leading-relaxed">{word.hanzi}</p>
                  <p className="mt-1 text-xs font-semibold text-slate-500">{word.pinyin}</p>
                  <p className="mt-1 text-sm text-slate-700">{word.meaning}</p>
                </button>
              ))}
            </div>
          </div>
          {(skillId === 'writing' || skillId === 'vocabulary' || skillId === 'reading') && (
            <StrokeOrderPanel text={lesson.vocabulary.map((word) => word.hanzi).join('')} color={skill.color} lang="zh-CN" />
          )}
        </section>

        <section className="rounded-2xl bg-white border border-slate-200 p-5 md:p-6 shadow-sm">
          <h2 className="font-black text-slate-900 mb-4 flex items-center gap-2">
            <Volume2 size={18} style={{ color: skill.color }} />
            Contoh Terintegrasi TTS
          </h2>
          <div className="space-y-3">
            {lesson.examples.map((example) => (
              <div key={example.hanzi} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => speakMandarin(example.hanzi)}
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition"
                    style={{ backgroundColor: `${skill.color}12`, color: skill.color }}
                    title="Dengarkan Mandarin"
                  >
                    <Volume2 size={18} />
                  </button>
                  <div className="min-w-0 flex-1">
                    <p lang="zh-CN" className="text-2xl md:text-3xl font-bold text-slate-900 leading-relaxed">{example.hanzi}</p>
                    <p className="mt-1 text-xs font-semibold text-slate-500">{example.pinyin}</p>
                    <p className="mt-1 text-sm text-slate-700">{example.meaning}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {lesson.modelOutput && (
          <section className="rounded-2xl bg-white border border-slate-200 p-5 md:p-6 shadow-sm">
            <h2 className="font-black text-slate-900 mb-4 flex items-center gap-2">
              <BookOpen size={18} style={{ color: level.color }} />
              {lesson.modelOutput.title}
            </h2>
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <div className="flex items-start gap-3">
                <button
                  onClick={() => speakMandarin(lesson.modelOutput?.hanzi ?? '')}
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition"
                  style={{ backgroundColor: `${level.color}12`, color: level.color }}
                  title="Dengarkan Mandarin"
                >
                  <Volume2 size={18} />
                </button>
                <div className="min-w-0 flex-1">
                  <p lang="zh-CN" className="text-2xl md:text-3xl font-bold text-slate-900 leading-relaxed">{lesson.modelOutput.hanzi}</p>
                  <p className="mt-3 text-xs font-semibold text-slate-500 leading-relaxed">{lesson.modelOutput.pinyin}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">{lesson.modelOutput.meaning}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="rounded-2xl bg-white border border-slate-200 p-5 md:p-6 shadow-sm">
          <h2 className="font-black text-slate-900 mb-4 flex items-center gap-2">
            <ListChecks size={18} style={{ color: level.color }} />
            Alur Latihan Produksi
          </h2>
          <div className="grid gap-3 md:grid-cols-4">
            {lesson.productionSteps.map((step, index) => (
              <div key={step} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-black text-white" style={{ backgroundColor: level.color }}>{index + 1}</span>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">{step}</p>
              </div>
            ))}
          </div>
        </section>

        {(skillId === 'speaking' || skillId === 'writing') && <RubricCard language="mandarin" level={levelId} skill={skillId} accentColor="#DC2626" />}
        {lesson.rubric && (
          <section className="rounded-2xl bg-white border border-slate-200 p-5 md:p-6 shadow-sm">
            <h2 className="font-black text-slate-900 mb-4 flex items-center gap-2">
              <CheckCircle size={18} style={{ color: skill.color }} />
              Checklist {level.badge}
            </h2>
            <div className="grid gap-3 md:grid-cols-3">
              {lesson.rubric.map((item) => (
                <div key={item} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <CheckCircle size={18} className="mb-3" style={{ color: skill.color }} />
                  <p className="text-sm leading-relaxed text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </section>
        )}
        </>
        )}

        {activeTab === 'latihan' && (
        <>
        <section className="rounded-2xl bg-white border border-slate-200 p-5 md:p-6 shadow-sm">
          <h2 className="font-black text-slate-900 mb-1 flex items-center gap-2">
            <ClipboardCheck size={18} style={{ color: skill.color }} />
            Latihan {lesson.practice.length} Soal
          </h2>
          <p className="text-sm text-slate-500 mb-5">Pilih jawaban sendiri, lalu sistem memberi feedback langsung.</p>
          <div className="space-y-4">
            {lesson.practice.map((question, index) => {
              const selected = answers[index];
              return (
                <div key={question.question} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <p className="font-bold text-sm text-slate-900">{index + 1}. {question.question}</p>
                  <div className="mt-3 grid gap-2">
                    {question.options.map((option) => {
                      const isSelected = selected === option;
                      const isCorrect = selected && option === question.answer;
                      const isWrong = isSelected && option !== question.answer;
                      return (
                        <button
                          key={option}
                          onClick={() => setAnswers((prev) => ({ ...prev, [index]: option }))}
                          className={`rounded-xl border px-4 py-3 text-left text-sm font-semibold transition ${
                            isCorrect ? 'border-emerald-300 bg-emerald-50 text-emerald-800' :
                            isWrong ? 'border-rose-300 bg-rose-50 text-rose-800' :
                            'border-slate-200 bg-white text-slate-700 hover:border-red-200'
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5 md:p-6">
          <h2 className="font-black text-amber-900 mb-2">Tugas Praktik</h2>
          <p className="text-sm leading-relaxed text-amber-900">{lesson.task}</p>
        </section>

        <button onClick={completeAndContinue} className="w-full rounded-xl py-4 text-white font-black shadow-lg transition" style={{ backgroundColor: level.color }}>
          Tandai Selesai
        </button>
        </>
        )}
      </main>
    </div>
  );
}
