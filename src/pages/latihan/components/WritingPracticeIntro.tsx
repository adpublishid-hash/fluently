export type WritingTopicMaterial = {
  id: string;
  title: string;
  description: string;
  topicNumber: number;
  task: string;
  goal: string;
  format: string;
  structure: string;
  sample: string;
  opening: string;
  connector: string;
  closing: string;
  editingTip: string;
};

export function WritingPracticeIntro({ topic }: { topic: WritingTopicMaterial }) {
  const writingParts = [
    { label: 'Opening', value: topic.opening },
    { label: 'Connector', value: topic.connector },
    { label: 'Closing', value: topic.closing },
    { label: 'Structure', value: topic.structure },
    { label: 'Editing Tip', value: topic.editingTip },
  ];

  return (
    <section className="mb-6 overflow-hidden rounded-[10px] border border-[#CBD5E1] bg-white">
      <div className="border-b border-[#CBD5E1] bg-[#F8FAFC] p-4">
        <div className="flex flex-col gap-2">
          <span className="inline-flex w-fit rounded bg-[#EEF2FF] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-[#2563EB]">
            Writing Studio
          </span>
          <h2 className="text-lg font-black text-[#0F172A]">{topic.title}</h2>
          <p className="max-w-3xl text-sm font-semibold leading-relaxed text-gray-600">{topic.goal}</p>
        </div>
      </div>

      <div className="grid gap-4 p-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[8px] border border-[#CBD5E1] bg-[#F8FAFC] p-4">
          <p className="text-[10px] font-black uppercase tracking-[0.12em] text-gray-400">Writing Task</p>
          <p className="mt-2 text-base font-black leading-relaxed text-[#0F172A]">{topic.task}</p>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="rounded-[8px] bg-white p-3">
              <p className="text-[10px] font-black uppercase tracking-[0.12em] text-gray-400">Format</p>
              <p className="mt-1 text-sm font-black text-[#0F172A]">{topic.format}</p>
            </div>
            <div className="rounded-[8px] bg-white p-3">
              <p className="text-[10px] font-black uppercase tracking-[0.12em] text-gray-400">Structure</p>
              <p className="mt-1 text-sm font-semibold text-gray-700">{topic.structure}</p>
            </div>
          </div>

          <div className="mt-4 rounded-[8px] bg-white p-4">
            <p className="text-[10px] font-black uppercase tracking-[0.12em] text-[#2563EB]">Model Writing</p>
            <p className="mt-2 text-sm font-black leading-relaxed text-[#0F172A]">{topic.sample}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-[8px] border border-[#CBD5E1] bg-white p-4">
            <h3 className="text-sm font-black text-[#0F172A]">Writing Builder</h3>
            <div className="mt-3 space-y-2">
              {writingParts.map((item) => (
                <div key={item.label} className="rounded-[6px] border border-[#CBD5E1] px-3 py-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.12em] text-gray-400">{item.label}</p>
                  <p className="mt-0.5 text-xs font-black leading-relaxed text-[#0F172A]">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[8px] border border-[#CBD5E1] bg-[#F8FAFC] p-4">
            <h3 className="text-sm font-black text-[#0F172A]">Draft Flow</h3>
            <div className="mt-3 space-y-2 text-sm font-semibold text-gray-600">
              <p>1. Read the task and decide the format.</p>
              <p>2. Write one clear main idea first.</p>
              <p>3. Add one connector and one supporting detail.</p>
              <p>4. Check grammar, punctuation, and tone before submitting.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
