import { Play } from 'lucide-react';
import { playAudio, stopCurrentAudio } from '../../../services/ttsService';

export type ReadingTopicMaterial = {
  id: string;
  title: string;
  description: string;
  topicNumber: number;
  passageTitle: string;
  passage: string;
  mainIdea: string;
  detail: string;
  vocabulary: string;
  vocabularyMeaning: string;
  inference: string;
  purpose: string;
  readingSkill: string;
};

export function ReadingPracticeIntro({ topic }: { topic: ReadingTopicMaterial }) {
  const readingSteps = [
    'Skim judul dan kalimat pertama untuk menangkap arah teks.',
    'Baca passage lengkap tanpa berhenti terlalu lama di satu kata.',
    `Perhatikan kata "${topic.vocabulary}" dan tebak maknanya dari konteks.`,
    'Cari satu detail pendukung sebelum masuk ke pilihan ganda.',
  ];

  const playPassage = () => {
    playAudio(`${topic.passageTitle}. ${topic.passage}`, 0.9);
  };

  return (
    <section className="mb-6 overflow-hidden rounded-[10px] border border-[#CBD5E1] bg-white">
      <div className="border-b border-[#CBD5E1] bg-[#F8FAFC] p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <span className="inline-flex rounded bg-[#DCFCE7] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-[#15803D]">
              Reading Lab
            </span>
            <h2 className="mt-3 text-lg font-black text-[#0F172A]">{topic.passageTitle}</h2>
            <p className="mt-1 max-w-3xl text-sm font-semibold leading-relaxed text-gray-600">{topic.description}</p>
          </div>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={playPassage}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-[4px] bg-[#15803D] px-4 text-sm font-black text-white transition hover:bg-[#166534]"
            >
              <Play size={16} fill="currentColor" />
              Read Aloud
            </button>
            <button
              type="button"
              onClick={stopCurrentAudio}
              className="inline-flex h-10 items-center justify-center rounded-[4px] border border-[#CBD5E1] px-4 text-sm font-black text-[#0F172A] transition hover:bg-white"
            >
              Stop
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 p-4 lg:grid-cols-[1.15fr_0.85fr]">
        <article className="rounded-[8px] border border-[#CBD5E1] bg-[#F8FAFC] p-4">
          <p className="text-[10px] font-black uppercase tracking-[0.12em] text-gray-400">Passage</p>
          <h3 className="mt-2 text-base font-black text-[#0F172A]">{topic.passageTitle}</h3>
          <p className="mt-3 text-sm font-semibold leading-7 text-gray-700">{topic.passage}</p>
        </article>

        <div className="space-y-4">
          <div className="rounded-[8px] border border-[#CBD5E1] bg-white p-4">
            <h3 className="text-sm font-black text-[#0F172A]">Reading Focus</h3>
            <div className="mt-3 grid gap-2">
              {[
                { label: 'Skill', value: topic.readingSkill },
                { label: 'Question Types', value: 'Main idea, detail, vocabulary, inference, purpose' },
                { label: 'Key Word', value: topic.vocabulary },
              ].map((item) => (
                <div key={item.label} className="rounded-[6px] border border-[#CBD5E1] px-3 py-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.12em] text-gray-400">{item.label}</p>
                  <p className="mt-0.5 text-xs font-black leading-relaxed text-[#0F172A]">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[8px] border border-[#CBD5E1] bg-[#F8FAFC] p-4">
            <h3 className="text-sm font-black text-[#0F172A]">Before You Answer</h3>
            <div className="mt-3 space-y-2">
              {readingSteps.map((step, index) => (
                <div key={step} className="flex gap-2 text-sm font-semibold leading-relaxed text-gray-600">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#DCFCE7] text-[10px] font-black text-[#15803D]">
                    {index + 1}
                  </span>
                  <p>{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
