import { Play, Volume2 } from 'lucide-react';
import { playAudio, stopCurrentAudio } from '../../../services/ttsService';

export type SpeakingTopicMaterial = {
  id: string;
  title: string;
  description: string;
  topicNumber: number;
  situation: string;
  goal: string;
  pattern: string;
  pronunciation: string;
  sample: string;
  formalResponse: string;
  casualResponse: string;
  repairPhrase: string;
  fluencyTip: string;
};

export function SpeakingPracticeIntro({ topic }: { topic: SpeakingTopicMaterial }) {
  const drillItems = [
    { label: 'Pattern', value: topic.pattern },
    { label: 'Model Answer', value: topic.sample },
    { label: 'Formal', value: topic.formalResponse },
    { label: 'Casual', value: topic.casualResponse },
    { label: 'Repair Phrase', value: topic.repairPhrase },
  ];

  const playSpeakingPack = () => {
    playAudio(
      [
        `Situation: ${topic.situation}.`,
        `Goal: ${topic.goal}.`,
        `Pattern: ${topic.pattern}.`,
        `Model answer: ${topic.sample}`,
      ].join(' '),
      0.9
    );
  };

  return (
    <section className="mb-6 overflow-hidden rounded-[10px] border border-[#CBD5E1] bg-white">
      <div className="border-b border-[#CBD5E1] bg-[#F8FAFC] p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <span className="inline-flex rounded bg-[#E0F2FE] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-[#0891B2]">
              Speaking Studio
            </span>
            <h2 className="mt-3 text-lg font-black text-[#0F172A]">{topic.title}</h2>
            <p className="mt-1 max-w-3xl text-sm font-semibold leading-relaxed text-gray-600">{topic.goal}</p>
          </div>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={playSpeakingPack}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-[4px] bg-[#0891B2] px-4 text-sm font-black text-white transition hover:bg-[#0E7490]"
            >
              <Play size={16} fill="currentColor" />
              Listen Model
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

      <div className="grid gap-4 p-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[8px] border border-[#CBD5E1] bg-[#F8FAFC] p-4">
          <p className="text-[10px] font-black uppercase tracking-[0.12em] text-gray-400">Situation Prompt</p>
          <p className="mt-2 text-base font-black leading-relaxed text-[#0F172A]">{topic.situation}</p>
          <div className="mt-4 rounded-[8px] bg-white p-4">
            <p className="text-[10px] font-black uppercase tracking-[0.12em] text-[#0891B2]">Model Answer</p>
            <p className="mt-2 text-sm font-black leading-relaxed text-[#0F172A]">{topic.sample}</p>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="rounded-[8px] bg-white p-3">
              <p className="text-[10px] font-black uppercase tracking-[0.12em] text-gray-400">Pronunciation Focus</p>
              <p className="mt-1 text-sm font-semibold text-gray-700">{topic.pronunciation}</p>
            </div>
            <div className="rounded-[8px] bg-white p-3">
              <p className="text-[10px] font-black uppercase tracking-[0.12em] text-gray-400">Fluency Tip</p>
              <p className="mt-1 text-sm font-semibold text-gray-700">{topic.fluencyTip}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-[8px] border border-[#CBD5E1] bg-white p-4">
            <h3 className="text-sm font-black text-[#0F172A]">Repeat Bank</h3>
            <div className="mt-3 space-y-2">
              {drillItems.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => playAudio(item.value, 0.88)}
                  className="flex w-full items-center justify-between gap-3 rounded-[6px] border border-[#CBD5E1] px-3 py-2 text-left transition hover:border-[#0891B2] hover:bg-[#ECFEFF]"
                >
                  <span className="min-w-0">
                    <span className="block text-[10px] font-black uppercase tracking-[0.12em] text-gray-400">{item.label}</span>
                    <span className="mt-0.5 block text-xs font-black leading-relaxed text-[#0F172A]">{item.value}</span>
                  </span>
                  <Volume2 className="shrink-0 text-[#0891B2]" size={16} />
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[8px] border border-[#CBD5E1] bg-[#F8FAFC] p-4">
            <h3 className="text-sm font-black text-[#0F172A]">Practice Flow</h3>
            <div className="mt-3 space-y-2 text-sm font-semibold text-gray-600">
              <p>1. Listen to the model answer once.</p>
              <p>2. Repeat the pattern slowly, then at natural speed.</p>
              <p>3. Replace the blank with your own detail.</p>
              <p>4. Answer the 30 multiple choice questions to lock the structure.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
