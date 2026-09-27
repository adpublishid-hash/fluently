import { useState } from 'react';
import { BookOpen, CheckCircle, ClipboardCheck, Eye, EyeOff, Headphones, Layers, ListChecks, Target, Volume2 } from 'lucide-react';
import type { ViewState } from '../../../../types';
import type { ArabicSkillId } from '../arabicModuleData';
import { getGeneratedArabicLesson, type GeneratedArabicContentLevel } from './generatedBeginnerArabicContent';
import RubricCard from '../../../../components/shared/RubricCard';

type GeneratedArabicLessonRendererProps = {
  skillId: ArabicSkillId;
  lessonId: number;
  onComplete: () => void;
  contentLevel?: GeneratedArabicContentLevel;
  levelLabel?: string;
  initialTab?: 'materi' | 'latihan';
};

function speakArabic(text: string) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ar-SA';
  utterance.rate = 0.85;
  window.speechSynthesis.speak(utterance);
}

export default function GeneratedArabicLessonRenderer({ skillId, lessonId, onComplete, contentLevel = 'beginner', levelLabel = 'Beginner', initialTab = 'materi' }: GeneratedArabicLessonRendererProps) {
  const lesson = getGeneratedArabicLesson(skillId, lessonId, contentLevel);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [activeTab, setActiveTab] = useState<'materi' | 'latihan'>(initialTab);
  const [showPassageText, setShowPassageText] = useState(false);
  const [showPassageMeaning, setShowPassageMeaning] = useState(false);
  const passageVisible = !lesson.passage?.listenFirst || showPassageText;
  const isIntermediate = contentLevel === 'intermediate' || contentLevel === 'upper-intermediate';
  const levelCode = contentLevel === 'scholar'
    ? 'Research'
    : contentLevel === 'mastery'
    ? 'Post-C2'
    : contentLevel === 'proficiency'
    ? 'C2'
    : contentLevel === 'advanced'
    ? 'C1'
    : contentLevel === 'upper-intermediate'
    ? 'B2'
    : contentLevel === 'intermediate'
    ? 'B1'
    : contentLevel === 'elementary'
    ? 'A2'
    : 'A1';

  return (
    <main className="mx-auto max-w-4xl py-6 space-y-4">
      <section className="rounded-2xl bg-white border border-slate-200 p-5 md:p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-xl bg-teal-50 text-[#0F766E] flex items-center justify-center shrink-0">
            <Target size={21} />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0F766E]">Arabic {levelLabel}</p>
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
            className={`rounded-xl px-4 py-3 text-sm font-black transition ${activeTab === tab.id ? 'bg-[#0F766E] text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'materi' && (
      <>
      {lesson.explanation && (
        <section className="rounded-2xl bg-white border border-slate-200 p-5 md:p-6 shadow-sm">
          <h2 className="font-black text-slate-900 mb-4 flex items-center gap-2">
            <BookOpen size={18} className="text-[#7C3AED]" />
            Materi Inti {levelCode}
          </h2>
          <div className="space-y-3">
            {lesson.explanation.map((item) => (
              <p key={item} className="rounded-xl border border-violet-100 bg-violet-50/60 p-4 text-sm leading-relaxed text-slate-700">
                {item}
              </p>
            ))}
          </div>
        </section>
      )}

      <section className="rounded-2xl bg-white border border-slate-200 p-5 md:p-6 shadow-sm">
        <h2 className="font-black text-slate-900 mb-4 flex items-center gap-2">
          <CheckCircle size={18} className="text-[#0F766E]" />
          Fokus Materi
        </h2>
        <div className="grid gap-3 md:grid-cols-2">
          {lesson.focus.map((item) => (
            <div key={item} className="flex gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4">
              <CheckCircle size={18} className="text-[#0F766E] shrink-0 mt-0.5" />
              <p className="text-sm text-slate-700">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {(lesson.patterns || lesson.vocabulary) && (
        <section className="grid gap-4 lg:grid-cols-2">
          {lesson.patterns && (
            <div className="rounded-2xl bg-white border border-slate-200 p-5 md:p-6 shadow-sm">
              <h2 className="font-black text-slate-900 mb-4 flex items-center gap-2">
                <Layers size={18} className="text-[#7C3AED]" />
                Pola/Rumus {levelCode}
              </h2>
              <div className="space-y-3">
                {lesson.patterns.map((pattern) => (
                  <div key={pattern.label} className="rounded-xl border border-violet-100 bg-violet-50/50 p-4">
                    <p className="text-xs font-black uppercase tracking-wider text-violet-500">{pattern.label}</p>
                    <p dir="rtl" lang="ar" className="mt-2 text-2xl font-bold text-slate-900 leading-relaxed">{pattern.arabic}</p>
                    <p className="mt-2 text-xs font-semibold text-slate-500">{pattern.transliteration}</p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-700">{pattern.meaning}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {lesson.vocabulary && (
            <div className="rounded-2xl bg-white border border-slate-200 p-5 md:p-6 shadow-sm">
              <h2 className="font-black text-slate-900 mb-4 flex items-center gap-2">
                <BookOpen size={18} className="text-[#0F766E]" />
                Kosakata & Kolokasi
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {lesson.vocabulary.map((word) => (
                  <button
                    key={word.arabic}
                    onClick={() => speakArabic(word.arabic)}
                    className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-left hover:border-teal-200 hover:bg-teal-50/50 transition"
                    title="Dengarkan kosakata"
                  >
                    <p dir="rtl" lang="ar" className="text-2xl font-bold text-slate-900 leading-relaxed">{word.arabic}</p>
                    <p className="mt-1 text-xs font-semibold text-slate-500">{word.transliteration}</p>
                    <p className="mt-1 text-sm text-slate-700">{word.meaning}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {(skillId === 'kalam' || skillId === 'kitabah') && <RubricCard language="arabic" level={contentLevel} skill={skillId === 'kalam' ? 'speaking' : 'writing'} accentColor="#0F766E" />}
      {lesson.passage && (
        <section className="rounded-2xl bg-white border border-slate-200 p-5 md:p-6 shadow-sm">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-black text-slate-900 flex items-center gap-2">
              {lesson.passage.listenFirst ? <Headphones size={18} className="text-[#0F766E]" /> : <BookOpen size={18} className="text-[#0F766E]" />}
              {lesson.passage.listenFirst ? 'Teks Simakan' : 'Teks Bacaan'}: {lesson.passage.title}
            </h2>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => speakArabic(lesson.passage!.sentences.map((sentence) => sentence.arabic).join(' '))}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#0F766E] px-3 py-1.5 text-xs font-bold text-white hover:bg-teal-800 transition"
              >
                <Volume2 size={14} /> Putar semua
              </button>
              {lesson.passage.listenFirst && (
                <button
                  onClick={() => setShowPassageText((value) => !value)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
                >
                  {showPassageText ? <EyeOff size={14} /> : <Eye size={14} />} {showPassageText ? 'Sembunyikan teks' : 'Tampilkan teks'}
                </button>
              )}
              {passageVisible && (
                <button
                  onClick={() => setShowPassageMeaning((value) => !value)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
                >
                  {showPassageMeaning ? 'Sembunyikan arti' : 'Tampilkan arti'}
                </button>
              )}
            </div>
          </div>
          {passageVisible ? (
            <div className="space-y-2">
              {lesson.passage.sentences.map((sentence) => (
                <button
                  key={sentence.arabic}
                  onClick={() => speakArabic(sentence.arabic)}
                  className="block w-full rounded-xl border border-slate-100 bg-slate-50 p-3 text-left hover:border-teal-200 hover:bg-teal-50/50 transition"
                  title="Dengarkan kalimat"
                >
                  <p dir="rtl" lang="ar" className="text-xl md:text-2xl font-bold text-slate-900 leading-loose">{sentence.arabic}</p>
                  {showPassageMeaning && (
                    <>
                      <p className="mt-1 text-xs font-semibold text-slate-500">{sentence.transliteration}</p>
                      <p className="mt-1 text-sm text-slate-700">{sentence.meaning}</p>
                    </>
                  )}
                </button>
              ))}
            </div>
          ) : (
            <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
              Putar audio 2–3 kali dan catat kata kunci. Jawab pertanyaan bacaan di tab latihan sebelum membuka teks.
            </p>
          )}
        </section>
      )}

      <section className="rounded-2xl bg-white border border-slate-200 p-5 md:p-6 shadow-sm">
        <h2 className="font-black text-slate-900 mb-4 flex items-center gap-2">
          <Volume2 size={18} className="text-[#0F766E]" />
          Contoh Terintegrasi TTS
        </h2>
        <div className="space-y-3">
          {lesson.examples.map((example) => (
            <div key={example.arabic} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <div className="flex items-start gap-3">
                <button
                  onClick={() => speakArabic(example.arabic)}
                  className="w-10 h-10 rounded-xl bg-teal-50 text-[#0F766E] flex items-center justify-center shrink-0 hover:bg-teal-100 transition"
                  title="Dengarkan Arabic"
                >
                  <Volume2 size={18} />
                </button>
                <div className="min-w-0 flex-1">
                  <p dir="rtl" lang="ar" className="text-2xl md:text-3xl font-bold text-slate-900 leading-relaxed">{example.arabic}</p>
                  <p className="mt-1 text-xs font-semibold text-slate-500">{example.transliteration}</p>
                  <p className="mt-1 text-sm text-slate-700">{example.meaning}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {lesson.productionSteps && (
        <section className="rounded-2xl bg-white border border-slate-200 p-5 md:p-6 shadow-sm">
          <h2 className="font-black text-slate-900 mb-4 flex items-center gap-2">
            <ListChecks size={18} className="text-[#7C3AED]" />
            Alur Latihan Produksi
          </h2>
          <div className="grid gap-3 md:grid-cols-4">
            {lesson.productionSteps.map((step, index) => (
              <div key={step} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#7C3AED] text-xs font-black text-white">{index + 1}</span>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">{step}</p>
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
          <ClipboardCheck size={18} className="text-[#0F766E]" />
          Latihan {lesson.practice.length} Soal
        </h2>
        <p className="text-sm text-slate-500 mb-5">
          {isIntermediate ? 'Soal dibuat untuk cek pemahaman pola B1. Jawaban baru terlihat setelah kamu memilih.' : 'Pilih jawaban sendiri, lalu sistem akan memberi feedback langsung.'}
        </p>
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
                          'border-slate-200 bg-white text-slate-700 hover:border-teal-200'
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

      <button onClick={onComplete} className="w-full rounded-xl bg-[#0F766E] py-4 text-white font-black shadow-lg shadow-teal-100 hover:bg-[#0B6B63] transition">
        Tandai Selesai
      </button>
      </>
      )}
    </main>
  );
}

export type GeneratedArabicLegacyProps = {
  onNavigate: (view: ViewState) => void;
  onComplete: () => void;
};
