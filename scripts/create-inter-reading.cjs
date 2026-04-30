const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, 'src', 'pages', 'module', 'english', 'intermediate', 'reading');
if (!fs.existsSync(DIR)) {
  fs.mkdirSync(DIR, { recursive: true });
}

const READING_UTILS_CONTENT = `import React, { useState } from 'react';
import { CheckCircleIcon, XCircleIcon, StarIcon } from '../../../../../components/Icons';

export const READING_KEY = 'talky_intermediate_reading_completed';
export function getCompletedReadingLessons(): number[] { try { return JSON.parse(localStorage.getItem(READING_KEY) || '[]'); } catch { return []; } }
export function markReadingComplete(id: number) { const d = getCompletedReadingLessons(); if (!d.includes(id)) localStorage.setItem(READING_KEY, JSON.stringify([...d, id])); }

/* ─────────────── QUIZ ENGINE ─────────────── */
export interface QuizItem { q: string; opts: string[]; ans: string; exp: string; }

export function QuizEngine({ items, onComplete }: { items: QuizItem[]; onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [sel, setSel] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  const pick = (o: string) => { if (checked) return; setSel(o); setChecked(true); if (o === items[step].ans) setScore(s => s + 1); };
  const next = () => { if (step < items.length - 1) { setStep(s => s + 1); setSel(null); setChecked(false); } else setDone(true); };
  const restart = () => { setStep(0); setScore(0); setDone(false); setSel(null); setChecked(false); };

  if (done) return (
    <div className="text-center py-8 max-w-md mx-auto animate-fade-in">
      <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-pink-200">
        <StarIcon className="w-12 h-12 text-pink-500" />
      </div>
      <h2 className="text-2xl font-bold text-slate-800 mb-1">Latihan Selesai! 🎉</h2>
      <p className="text-slate-500 mb-1">Skor: <span className="font-extrabold text-pink-600 text-3xl">{score}</span><span className="text-xl">/{items.length}</span></p>
      <p className="text-sm text-slate-400 mb-6">{score >= Math.round(items.length * 0.8) ? '🏆 Pemahaman membaca sangat baik!' : score >= Math.round(items.length * 0.6) ? '👍 Cukup baik!' : '📚 Coba baca ulang teks perlahan!'}</p>
      <button onClick={restart} className="px-6 py-3 bg-pink-500 text-white rounded-xl font-bold mr-3 cursor-pointer hover:bg-pink-600 shadow-md">Ulangi</button>
      <button onClick={onComplete} className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold cursor-pointer hover:bg-slate-800 shadow-md">Tandai Selesai ✓</button>
    </div>
  );

  const q = items[step];
  return (
    <div className="max-w-xl mx-auto animate-fade-in">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Soal {step + 1} dari {items.length}</span>
          <span className="text-xs font-bold bg-pink-50 text-pink-600 px-3 py-1 rounded-full border border-pink-100">Skor: {score}</span>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full mb-5 overflow-hidden">
          <div className="h-full bg-pink-500 transition-all rounded-full" style={{ width: \`\${((step + 1) / items.length) * 100}%\` }} />
        </div>
        <h3 className="text-[15px] font-bold text-slate-800 mb-5 leading-relaxed">{q.q}</h3>
        <div className="space-y-3">
          {q.opts.map((o, i) => {
            let cls = 'border-slate-200 hover:border-pink-300 hover:bg-pink-50 cursor-pointer shadow-sm';
            if (checked) { if (o === q.ans) cls = 'bg-green-50 border-green-500 text-green-800 font-medium'; else if (o === sel) cls = 'bg-red-50 border-red-500 text-red-800 font-medium'; else cls = 'opacity-40 border-slate-100 cursor-default'; }
            return (
              <button key={i} onClick={() => pick(o)} disabled={checked} className={\`w-full p-4 rounded-xl border max-w-full text-left text-sm transition-all flex items-center justify-between gap-3 \${cls}\`}>
                <span className="leading-relaxed">{o}</span>
                {checked && o === q.ans && <CheckCircleIcon className="w-5 h-5 text-green-600 shrink-0" />}
                {checked && o === sel && o !== q.ans && <XCircleIcon className="w-5 h-5 text-red-500 shrink-0" />}
              </button>
            );
          })}
        </div>
        {checked && (
          <div className="mt-5 animate-fade-in">
            <div className={\`p-4 rounded-xl text-sm mb-4 border leading-relaxed \${sel === q.ans ? 'bg-green-50 text-green-800 border-green-200' : 'bg-orange-50 text-orange-900 border-orange-200'}\`}>
              <span className="font-bold block mb-1">💡 Penjelasan:</span>
              {q.exp}
            </div>
            <button onClick={next} className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all cursor-pointer shadow-md">
              {step < items.length - 1 ? 'Selanjutnya →' : 'Lihat Rekap'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────── READING CARD ─────────────── */
export function ReadingCard({ title, icon, children, highlight }: { title?: string; icon?: string; children: React.ReactNode; highlight?: string; }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-4 transition-all hover:shadow-md">
      {title && (
        <div className="bg-gradient-to-r from-pink-50 to-orange-50 px-5 py-3 border-b border-pink-100 flex items-center gap-3">
          {icon && <span className="text-xl">{icon}</span>}
          <p className="text-sm font-extrabold text-pink-900 tracking-wide">{title}</p>
          {highlight && <span className="ml-auto text-[11px] font-bold bg-pink-500 text-white px-3 py-1 rounded-full shadow-sm">{highlight}</span>}
        </div>
      )}
      <div className="p-5 md:p-6">{children}</div>
    </div>
  );
}

/* ─────────────── COMPREHENSION Q&A ─────────────── */
export interface ComprehensionQ { q: string; opts: string[]; ans: string; }

export function ComprehensionSection({ passageTitle, passage, questions }: {
  passageTitle: string; passage: React.ReactNode; questions: ComprehensionQ[];
}) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showAns, setShowAns] = useState(false);
  const correctCount = questions.filter((q, i) => answers[i] === q.ans).length;

  return (
    <div className="space-y-6 max-w-xl mx-auto animate-fade-in">
      <ReadingCard title={passageTitle} icon="📄">
        <div className="text-sm text-slate-700 leading-relaxed space-y-4">
          {passage}
        </div>
      </ReadingCard>

      <div className="bg-slate-50 p-5 md:p-6 rounded-2xl border border-slate-200">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-extrabold text-slate-800 flex items-center gap-2">
            ✏️ Pemahaman Membaca
          </h3>
          {Object.keys(answers).length === questions.length && !showAns && (
            <button onClick={() => setShowAns(true)} className="text-xs font-bold px-4 py-2 bg-slate-900 text-white rounded-full hover:bg-slate-800 cursor-pointer shadow-md transition-all active:scale-95">Periksa Jawaban</button>
          )}
          {showAns && <span className="text-sm font-bold bg-green-100 text-green-700 px-3 py-1 rounded-full border border-green-200">{correctCount}/{questions.length} benar</span>}
        </div>
        
        <div className="space-y-4">
          {questions.map((q, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
              <p className="text-[15px] font-bold text-slate-800 mb-4 leading-relaxed">{i + 1}. {q.q}</p>
              <div className="space-y-2.5">
                {q.opts.map((opt, j) => {
                  let cls = 'border-slate-200 hover:border-slate-400 hover:bg-slate-50 cursor-pointer text-slate-700';
                  if (showAns) { 
                    if (opt === q.ans) cls = 'bg-green-50 border-green-500 text-green-800 font-bold'; 
                    else if (opt === answers[i]) cls = 'bg-red-50 border-red-500 text-red-800'; 
                    else cls = 'opacity-50 border-slate-100 cursor-default flex-row text-slate-400'; 
                  }
                  else if (answers[i] === opt) cls = 'border-slate-800 bg-slate-100 text-slate-900 font-medium';
                  return (
                    <button key={j} onClick={() => !showAns && setAnswers(p => ({ ...p, [i]: opt }))} disabled={showAns} className={\`w-full text-left text-sm px-4 py-3 rounded-xl border max-w-full transition-all \${cls}\`}>
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        
        {showAns && (
          <button onClick={() => { setAnswers({}); setShowAns(false); }} className="w-full mt-5 py-3.5 border-2 border-slate-300 text-slate-700 font-bold rounded-xl text-sm hover:bg-slate-100 hover:text-slate-900 cursor-pointer transition-colors">
            Coba Lagi Pilihan Ganda
          </button>
        )}
      </div>
    </div>
  );
}
`;

fs.writeFileSync(path.join(DIR, 'readingUtils.tsx'), READING_UTILS_CONTENT);

const TEXTS = [
  {
    title: 'Work Email: Project Kick-off',
    content: "<strong>Subject:</strong> Project Kick-off Meeting Rescheduled<br/><br/>Hi team,<br/>I want to inform you that our project kick-off meeting, originally scheduled for Wednesday, has been pushed back to Friday at 10:00 AM in the main conference room. Some of our key stakeholders are traveling and won't be back until Thursday. Please review the attached agenda beforehand and come prepared with your initial ideas. Let me know if this new time conflicts with any pressing deadlines.<br/><br/>Best,<br/>Sarah",
    questions: [
      { q: "Why was the meeting rescheduled?", opts: ["The conference room was booked by another team.", "Sarah is currently out of town.", "Important stakeholders are traveling and unavailable.", "The team needs more time to prepare their ideas."], ans: "Important stakeholders are traveling and unavailable." },
      { q: "What are the team members expected to do before the meeting?", opts: ["Send their ideas via email to Sarah.", "Meet the stakeholders at the airport.", "Reschedule their pressing deadlines.", "Read the attached agenda and prepare ideas."], ans: "Read the attached agenda and prepare ideas." },
      { q: "What does the phrase 'pushed back' mean in this email?", opts: ["Canceled completely", "Delayed to a later time or date", "Moved to an earlier time", "Relocated to another room"], ans: "Delayed to a later time or date" },
      { q: "What should a team member do if they cannot attend the new schedule?", opts: ["Inform Sarah about conflicting deadlines.", "Call the stakeholders directly.", "Ignore the email.", "Write a new agenda."], ans: "Inform Sarah about conflicting deadlines." }
    ]
  },
  {
    title: 'Workplace Announcement',
    content: "<strong>Notice: Maintenance Work</strong><br/><br/>Please be advised that the building's water supply will be shut off this Saturday from 8:00 AM to 2:00 PM due to scheduled maintenance on the main pipes. We apologize for the inconvenience this may cause to those coming in for weekend shifts. Bottled water will be provided in the staff lounge. Restrooms on the ground floor will remain operational using a backup water tank.",
    questions: [
      { q: "How long will the water supply be shut off?", opts: ["4 hours", "6 hours", "8 hours", "The whole day"], ans: "6 hours" },
      { q: "Which facility will STILL work normally during the maintenance?", opts: ["The water pipes on the second floor", "All restrooms in the building", "The restrooms on the ground floor", "The coffee machine in the staff lounge"], ans: "The restrooms on the ground floor" },
      { q: "How is the company helping the staff who work on Saturday?", opts: ["By giving them the day off", "By providing bottled water in the lounge", "By moving them to a different building", "By giving them extra pay"], ans: "By providing bottled water in the lounge" },
      { q: "Who is this notice most likely intended for?", opts: ["Customers visiting the building", "Plumbers fixing the pipes", "Employees working weekend shifts", "The cleaning staff"], ans: "Employees working weekend shifts" }
    ]
  },
  {
    title: 'Personal Letter - Events & Feelings',
    content: "Dear Mia,<br/><br/>I'm writing this while sitting in my new apartment in London! The move was absolutely exhausting. Half of my boxes ended up at the wrong address, and I spent two days trying to track them down. Honestly, I felt so overwhelmed and almost cried multiple times.<br/><br/>But things are finally settling down. The city is amazing, and I've already found a cozy little café near my place where I can work on my laptop. I'm hoping to start my new job next Monday. I miss you so much and I am really looking forward to your visit in the summer.<br/><br/>Love,<br/>Chloe",
    questions: [
      { q: "How did Chloe feel during the moving process?", opts: ["Excited and energized", "Bored and sleepy", "Overwhelmed and exhausted", "Angry and confused"], ans: "Overwhelmed and exhausted" },
      { q: "What specific problem happened when Chloe moved?", opts: ["Her laptop was broken.", "She couldn't find the apartment.", "Some of her boxes were sent to the wrong place.", "She lost her new job."], ans: "Some of her boxes were sent to the wrong place." },
      { q: "What has Chloe discovered near her new apartment?", opts: ["A big shopping mall", "A cozy café where she can work", "A new group of friends", "A library"], ans: "A cozy café where she can work" },
      { q: "What is Chloe's hope for the near future regarding Mia?", opts: ["She hopes Mia will help her find her boxes.", "She hopes Mia can get a job in London.", "She hopes Mia will visit her in the summer.", "She hopes to visit Mia in her hometown next month."], ans: "She hopes Mia will visit her in the summer." },
      { q: "Which combination of emotions best describes Chloe's letter?", opts: ["Stressed at first, but now optimistic and hopeful", "Extremely happy from the beginning to the end", "Sad, disappointed, and full of regrets", "Professional, serious, and formal"], ans: "Stressed at first, but now optimistic and hopeful" }
    ]
  },
  {
    title: 'Everyday Advert',
    content: "<strong>Dog Walker Wanted!</strong><br/><br/>Busy professional seeking a reliable and energetic dog walker for an active Golden Retriever, Max. Needed Monday to Friday for a 45-minute walk around 12:00 PM. Pay is $15 per walk. Must have experience with large dogs and provide at least one reference. If interested, email John at john.doe@email.com.",
    questions: [
      { q: "How many days a week does John need the dog walker?", opts: ["2 days", "3 days", "5 days", "7 days"], ans: "5 days" },
      { q: "What is a strict requirement for the applicant?", opts: ["Must be a professional vet.", "Must have experience handling large dogs.", "Must own a Golden Retriever.", "Must be available in the mornings."], ans: "Must have experience handling large dogs." },
      { q: "How much will the dog walker earn in one complete week (Mon-Fri)?", opts: ["$15", "$45", "$60", "$75"], ans: "$75" }
    ]
  },
  {
    title: 'Personal Email - Hopes & Plans',
    content: "Hi Alex,<br/><br/>I heard you passed your final exams with flying colors! I am so incredibly proud of you. I know how much you stressed over the math paper last month.<br/><br/>Are you still planning to take a gap year before university? I really hope you do. Traveling around Southeast Asia like we talked about would be an unforgettable experience for you. Let me know what you decide. If you're free this weekend, let's grab dinner to celebrate. It's my treat!<br/><br/>Cheers,<br/>Sam",
    questions: [
      { q: "What does the idiom 'passed with flying colors' mean in the text?", opts: ["Passed with very high marks / great success", "Passed barely enough to graduate", "Cheated on the exam", "Painted a colorful picture for the exam"], ans: "Passed with very high marks / great success" },
      { q: "How did Alex feel about the math test before the results came out?", opts: ["Confident", "Stressed", "Indifferent", "Excited"], ans: "Stressed" },
      { q: "What does Sam hope Alex will do next?", opts: ["Go to university immediately", "Take a gap year to travel", "Retake the math exam", "Start working at a company"], ans: "Take a gap year to travel" },
      { q: "What is Sam offering at the end of the email?", opts: ["To help Alex pack for a trip", "To pay for Alex's university tuition", "To buy Alex dinner to celebrate", "To cook dinner for Alex's family"], ans: "To buy Alex dinner to celebrate" }
    ]
  }
];

const FULL_QUIZ = TEXTS.flatMap(t => t.questions.map(q => ({
  q: \`(Text: \${t.title}) \${q.q}\`,
  opts: q.opts,
  ans: q.ans,
  exp: 'Reading Comprehension (B1/B2) - Memahami informasi spesifik dan inferensi dari teks.'
})));

for (let i = 1; i <= 20; i++) {
  const tIndex = (i - 1) % 5;
  const tData = TEXTS[tIndex];

  const content = \`import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine, ReadingCard, ComprehensionSection, getCompletedReadingLessons, markReadingComplete } from './readingUtils';
import type { QuizItem } from './readingUtils';

const QUIZ: QuizItem[] = \${JSON.stringify(FULL_QUIZ, null, 2)};

const COMPREHENSION = {
  passageTitle: '\${tData.title}',
  passage: (
    <div dangerouslySetInnerHTML={{ __html: \`\${tData.content.replace(/\`/g, '\\\\`')}\` }} />
  ),
  questions: \${JSON.stringify(tData.questions, null, 2)}
};

export default function InterReadingLesson\${i}(): React.ReactElement {
  const navigate = useNavigate();
  const nextPath = \${i < 20 ? \`'/modul/english/intermediate/reading/lesson-\${i + 1}'\` : \`'/modul/english/intermediate'\`};
  const [isCompleted, setIsCompleted] = useState(() => getCompletedReadingLessons().includes(\${i}));
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'baca' | 'latihan' | 'kuis'>('baca');

  const handleComplete = () => { markReadingComplete(\${i}); setIsCompleted(true); setShowModal(true); };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/50 backdrop-blur-sm" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 bg-gradient-to-br from-pink-500 to-orange-400 text-4xl">
              🏆
            </div>
            <h2 className="text-xl font-extrabold text-slate-800 mb-2">Lesson \${i} Selesai! 🎉</h2>
            <p className="text-sm text-slate-500 mb-6">Kamu berhasil menyelesaikan latihan Intermediate Reading ini.</p>
            <div className="flex gap-3">
              <button onClick={() => { setShowModal(false); navigate(nextPath); }} className="flex-1 py-3 rounded-xl font-bold text-white bg-slate-900 hover:bg-slate-800 transition">Lanjut ›</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col h-[100dvh] md:h-full bg-slate-50">
        <header className="flex-none bg-white/95 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100 shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <div className="text-center">
              <h1 className="text-sm font-bold text-slate-800 line-clamp-1">\${tData.title}</h1>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Intermediate Reading • Lesson \${i}</p>
            </div>
            <button onClick={() => navigate(nextPath)} className="px-3 h-9 rounded-full text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200">Next ›</button>
          </div>
        </header>

        <div className="flex bg-white border-b border-slate-200 sticky top-[65px] z-10 shadow-sm">
          {(['baca', 'latihan', 'kuis'] as const).map((tab) => {
            const labels = { baca: '📖 Materi', latihan: '✏️ Latihan', kuis: '🎯 Kuis 20 Soal' };
            return (
              <button key={tab} onClick={() => setActiveTab(tab)} className={\`flex-1 py-3.5 text-xs font-bold tracking-wide transition-all \${activeTab === tab ? 'text-pink-600 border-b-2 border-pink-500 bg-pink-50/30' : 'text-slate-400 hover:text-slate-600'}\`}>
                {labels[tab]}
              </button>
            )
          })}
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 pb-28 space-y-6">
            {activeTab === 'baca' && (
              <div className="animate-fade-in space-y-5">
                <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl p-6 text-white shadow-lg overflow-hidden relative">
                  <div className="relative z-10">
                    <h2 className="text-lg font-extrabold mb-2 text-white">Memahami Konteks B1/B2</h2>
                    <p className="text-sm text-pink-50 leading-relaxed">
                      Di pelajaran ini, kamu akan berlatih membaca intensif (intensive reading) dan ekstensif. Fokus pada makna tersurat dan tersirat dalam teks.
                    </p>
                  </div>
                </div>

                <ReadingCard title="Instruksi Pembelajaran" icon="💡" highlight="Penting">
                  <p className="text-[15px] text-slate-700 mb-3 leading-relaxed">
                    1. Buka tab <b>Latihan</b> untuk membaca teks spesifik dan menjawab pertanyaan tertulis.
                  </p>
                  <p className="text-[15px] text-slate-700 leading-relaxed">
                    2. Pilih tab <b>Kuis 20 Soal</b> untuk menantang pemahamanmu dengan timer dan skor keseluruhan dari berbagai materi. Semangat!
                  </p>
                </ReadingCard>
              </div>
            )}

            {activeTab === 'latihan' && <div className="animate-fade-in"><ComprehensionSection {...COMPREHENSION} /></div>}
            {activeTab === 'kuis' && <div className="animate-fade-in"><QuizEngine items={QUIZ} onComplete={handleComplete} /></div>}
          </div>
        </div>

        <div className="sticky bottom-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 p-4 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)]">
          <button onClick={isCompleted ? () => navigate(-1) : handleComplete} className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-all cursor-pointer" style={{ background: isCompleted ? '#10B981' : '#0F172A' }}>
            {isCompleted ? '✅ Selesai (Kembali)' : 'Tandai Selesai ✓'}
          </button>
        </div>
      </div>
    </>
  );
}
\`;

  fs.writeFileSync(path.join(DIR, \`Lesson\${i}.tsx\`), content);
}

const PAGE_CONTENT = \`import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Check, Play, Sparkles } from 'lucide-react';
import PageContainer from '../../../../../components/layout/PageContainer';
import { PageHeader } from '../../../../../components/shared/NavComponents';
import { useLanguage } from '../../../../../i18n/LanguageContext';
import { getCompletedReadingLessons } from './readingUtils';

const SKILL = {
  id: 'reading',
  label: 'Reading',
  icon: '/assets/icons/new/4. E-Library.png',
  color: '#E84393',
  bgColor: '#FDEDF4',
};

const TOTAL_LESSONS = 20;

export default function InterReadingPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [completedIds, setCompletedIds] = useState<number[]>([]);

  useEffect(() => { setCompletedIds(getCompletedReadingLessons()); }, []);

  const completedCount = completedIds.length;
  const progressPercent = TOTAL_LESSONS > 0 ? (completedCount / TOTAL_LESSONS) * 100 : 0;
  const lessons = Array.from({ length: TOTAL_LESSONS }, (_, i) => i + 1);

  return (
    <PageContainer>
      <div className="pb-28 md:pb-8">
        <PageHeader titleKey="skill.reading" subtitleKey="modul.daysSubtitle" />

        <motion.div
          className="mx-5 md:mx-0 mb-6 rounded-2xl p-5 relative overflow-hidden shadow-sm"
          style={{ backgroundColor: SKILL.bgColor, border: \`1px solid \${SKILL.color}20\` }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl p-2 shrink-0 bg-white/50 backdrop-blur-sm">
              <img src={SKILL.icon} alt="" className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="font-bold text-[15px] text-[#1A1A2E]">{SKILL.label}</h3>
              <p className="text-xs text-[#6B7280]">
                {completedCount}/{TOTAL_LESSONS} Lessons · Reading Practice
              </p>
            </div>
            <div className="ml-auto inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm" style={{ backgroundColor: SKILL.color }}>
               Intermediate
            </div>
          </div>
          <div className="mt-4 h-2.5 bg-white/60 rounded-full overflow-hidden shadow-inner">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: SKILL.color }}
              initial={{ width: 0 }}
              animate={{ width: \`\${progressPercent}%\` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
          {completedCount > 0 && (
            <p className="text-[11px] font-semibold mt-2 text-slate-700">
              {completedCount === TOTAL_LESSONS
                ? '🎉 Semua pelajaran selesai!'
                : \`\${completedCount} dari \${TOTAL_LESSONS} pelajaran selesai\`}
            </p>
          )}
        </motion.div>

        <div className="px-5 md:px-0">
          <h2 className="text-lg font-extrabold text-slate-800 mb-1">{t('modul.daysTitle')}</h2>
          <p className="text-[13px] text-slate-500 mb-5">Pilih pelajaran untuk mempraktikkan pemahaman membaca.</p>

          <div className="space-y-3">
            {lessons.map((id, i) => {
              const done = completedIds.includes(id);
              return (
                <motion.button
                  key={id}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl text-left transition-all border shadow-sm hover:shadow-md cursor-pointer"
                  style={{
                    borderColor: done ? '#26C76D' : \`\${SKILL.color}30\`,
                    backgroundColor: done ? '#F0FDF6' : 'white',
                  }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.03 * i }}
                  whileHover={{ scale: 1.01, borderColor: done ? '#26C76D' : SKILL.color }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(\`/modul/english/intermediate/reading/lesson-\${id}\`)}
                >
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 text-white transition-colors shadow-sm"
                    style={{ backgroundColor: done ? '#26C76D' : SKILL.color }}
                  >
                    {done ? <Check size={18} strokeWidth={3} /> : <Play size={16} fill="white" className="ml-0.5" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-sm text-[#1A1A2E]">Lesson {id}</p>
                      {done && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white bg-[#26C76D]">
                          ✓ Selesai
                        </span>
                      )}
                    </div>
                    <p className="text-[12px] text-[#6B7280] flex items-center gap-1 mt-0.5 truncate">
                      <Sparkles size={10} className="text-pink-400" /> Reading B1-B2 Comprehension
                    </p>
                  </div>

                  <span
                    className="text-[10px] font-bold px-3 py-1.5 rounded-full text-white shrink-0 shadow-sm"
                    style={{ backgroundColor: done ? '#26C76D' : SKILL.color }}
                  >
                    {done ? 'Ulang' : 'Start'}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
\`;

fs.writeFileSync(path.join(DIR, 'ReadingPage.tsx'), PAGE_CONTENT);
console.log('Successfully created intermediate reading module with 20 lessons and ReadingPage.');
