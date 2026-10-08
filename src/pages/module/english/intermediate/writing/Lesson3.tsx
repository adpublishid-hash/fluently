import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine, WritingCard, ComprehensionSection, getCompletedWritingLessons, markWritingComplete } from './writingUtils';
import type { QuizItem, ComprehensionQ } from './writingUtils';
import { BookOpen, PenTool, CheckCircle2, ChevronLeft } from 'lucide-react';

const QUIZ: QuizItem[] = [
  {
    "q": "Which word in the text functions as a TIME SEQUENCER?",
    "opts": [
      "Structured",
      "Located",
      "Afterwards",
      "Typically"
    ],
    "ans": "Afterwards",
    "exp": "\"Afterwards\" explicitly shows the order of events in time."
  },
  {
    "q": "What grammatical tense dominates this text?",
    "opts": [
      "Present Simple",
      "Past Simple",
      "Present Continuous",
      "Future Perfect"
    ],
    "ans": "Present Simple",
    "exp": "Routines and habits are always expressed using the Present Simple (e.g., goes off, drink, take)."
  },
  {
    "q": "What does the phrase \"an early riser\" mean?",
    "opts": [
      "An alarm clock",
      "A type of yoga",
      "Someone who bakes bread",
      "Someone who wakes up early in the morning"
    ],
    "ans": "Someone who wakes up early in the morning",
    "exp": "It is a common idiom/noun phrase for a morning person."
  },
  {
    "q": "Identify the subordinating conjunction used for purpose in the last paragraph:",
    "opts": [
      "So that",
      "In the late afternoon",
      "While",
      "Once"
    ],
    "ans": "So that",
    "exp": "\"So that\" explains the reason or purpose for going to bed at 10:30."
  },
  {
    "q": "Which transition phrase opens the final paragraph logically?",
    "opts": [
      "In the late afternoon",
      "By 7:00 AM",
      "First",
      "During the ride"
    ],
    "ans": "In the late afternoon",
    "exp": "It shifts the chronological timeline from the workday into the evening."
  },
  {
    "q": "How do you make this formal? \"Send me the files ASAP.\"",
    "opts": [
      "I require the files immediately.",
      "Please send the documents at your earliest convenience.",
      "Shoot the documents to me.",
      "Please dispatch the files really quick."
    ],
    "ans": "Please send the documents at your earliest convenience.",
    "exp": "\"At your earliest convenience\" adalah frasa kesopanan baku dalam korespondensi bisnis/formal."
  },
  {
    "q": "Choose the correct form: \"If I ___ more time, I would check the document again.\"",
    "opts": [
      "had",
      "have had",
      "having",
      "have"
    ],
    "ans": "had",
    "exp": "Ini adalah Conditional Type 2 (unreal present): If + Past Simple (had), Subject + would + V1."
  },
  {
    "q": "Which word modifies a verb strongly?",
    "opts": [
      "Beautiful",
      "Significantly",
      "Quick",
      "Happy"
    ],
    "ans": "Significantly",
    "exp": "\"Significantly\" adalah adverb (kata keterangan) yang memodifikasi/menjelaskan verb."
  },
  {
    "q": "What is a \"Topic Sentence\"?",
    "opts": [
      "A famous quote",
      "A sentence that explains the main idea of a paragraph",
      "The last sentence of a text",
      "The title of an essay"
    ],
    "ans": "A sentence that explains the main idea of a paragraph",
    "exp": "Topic sentence (kalimat utama) memberi tahu pembaca apa gagasan pokok dari paragraf tersebut."
  },
  {
    "q": "Which word means \"in addition\"?",
    "opts": [
      "Instead",
      "However",
      "Whereas",
      "Furthermore"
    ],
    "ans": "Furthermore",
    "exp": "\"Furthermore\" adalah adverb formal yang fungsinya menambah argumen atau informasi."
  },
  {
    "q": "Choose the sentence with correct parallel structure:",
    "opts": [
      "I like swim, read, and hike.",
      "I like swimming, to read, and hike.",
      "I like to swim, reading, and to hike.",
      "I like swimming, reading, and hiking."
    ],
    "ans": "I like swimming, reading, and hiking.",
    "exp": "Struktur paralel mengharuskan semua elemen dalam daftar memiliki bentuk gramatikal yang sama (V-ing, V-ing, V-ing)."
  },
  {
    "q": "Choose the correct contrast linker: \"___ the bad weather, the event was a success.\"",
    "opts": [
      "Although",
      "However",
      "Despite",
      "Because"
    ],
    "ans": "Despite",
    "exp": "\"Despite\" diikuti langsung oleh frasa kata benda (the bad weather), bukan klausa bersubjek-predikat."
  },
  {
    "q": "\"On the one hand... ___\". What finishes this paired conjunction?",
    "opts": [
      "However...",
      "On the second hand...",
      "On the other side...",
      "On the other hand..."
    ],
    "ans": "On the other hand...",
    "exp": "Pasangan frasa idiomatis ini selalu \"On the one hand... On the other hand...\" untuk membandingkan dua sisi."
  },
  {
    "q": "What is the function of \"For instance\"?",
    "opts": [
      "To show cause",
      "To contrast",
      "To conclude",
      "To provide an example"
    ],
    "ans": "To provide an example",
    "exp": "\"For instance\" adalah variasi formal dari \"For example\" pada level B1/B2."
  },
  {
    "q": "\"Due to\" is primarily used to indicate...",
    "opts": [
      "Time",
      "Addition",
      "Condition",
      "Cause or Reason"
    ],
    "ans": "Cause or Reason",
    "exp": "\"Due to\" (= because of) digunakan untuk menunjukkan alasan/penyebab dari sesuatu."
  },
  {
    "q": "Identify the spelling error in this formal text: \"The goverment should take action immediately.\"",
    "opts": [
      "immediately",
      "goverment",
      "action",
      "should"
    ],
    "ans": "goverment",
    "exp": "Ejaan yang benar adalah \"governMENT\" (ada huruf n yang sering terlupa)."
  },
  {
    "q": "Which sentence is an opinion, not a fact?",
    "opts": [
      "Water boils at 100 degrees.",
      "Pineapples are the most delicious fruit.",
      "The population of Tokyo is huge.",
      "Paris is the capital of France."
    ],
    "ans": "Pineapples are the most delicious fruit.",
    "exp": "\"The most delicious\" adalah penilaian subjektif atau opini."
  },
  {
    "q": "Which sentence adds INFORMATION?",
    "opts": [
      "Despite this, the city is loud.",
      "As a result, prices increased.",
      "Therefore, we left early.",
      "Moreover, the city has excellent public transport."
    ],
    "ans": "Moreover, the city has excellent public transport.",
    "exp": "\"Moreover\" (lebih lanjut lagi) digunakan untuk memberikan informasi tambahan yang mendukung argumen."
  },
  {
    "q": "Identify the error: \"I look forward to hear from you soon.\"",
    "opts": [
      "to hear",
      "from you",
      "soon",
      "look forward"
    ],
    "ans": "to hear",
    "exp": "Aturan baku: \"look forward to\" selalu diikuti oleh Gerund (V-ing), sehingga seharusnya \"to hearing\"."
  },
  {
    "q": "Identify the compound adjective: \"She bought a ___ car.\"",
    "opts": [
      "beautifully",
      "red",
      "very fast",
      "brand-new"
    ],
    "ans": "brand-new",
    "exp": "\"Brand-new\" adalah adjective gabungan (compound adjective) yang dihubungkan dengan hyphen."
  }
];

const COMPREHENSION: { passageTitle: string; passage: React.ReactNode; questions: ComprehensionQ[] } = {
  passageTitle: '✍️ My Daily Routine',
  passage: (
    <>
      <div className="bg-amber-50 p-6 font-serif rounded-xl border border-amber-100 shadow-inner text-slate-800 leading-relaxed text-[15px]" 
           dangerouslySetInnerHTML={{ __html: "<p className=\"mb-4\">My weekdays typically follow a very structured routine. I am an early riser, so my alarm goes off at 5:30 AM every morning. First, I drink a large glass of water and do a quick 20-minute yoga session to stretch my body. Afterwards, I take a shower and prepare a healthy breakfast, which usually consists of oatmeal and a fresh banana.\n\nBy 7:00 AM, I am out the door. My office is located in the city center, so the commute takes roughly 45 minutes on the commuter train. During the ride, I like to listen to educational podcasts to make the most of my travel time. My workday officially begins at 8:00 AM and is usually filled with meetings, drafting reports, and replying to endless emails.\n\nIn the late afternoon, I finish up my tasks and head home by 5:30 PM. Once I get home, the evening is my personal time to unwind. I usually cook dinner while listening to music, and then I settle on the couch to read a novel or watch an episode of a documentary. I try to be in bed by 10:30 PM so that I have enough energy for the following day.</p>" }} />
    </>
  ),
  questions: [
  {
    "q": "What time does the writer usually wake up?",
    "opts": [
      "6:00 AM",
      "7:00 AM",
      "8:00 AM",
      "5:30 AM"
    ],
    "ans": "5:30 AM"
  },
  {
    "q": "What does the writer do immediately after drinking water?",
    "opts": [
      "Takes a shower",
      "Listens to a podcast",
      "Does a 20-minute yoga session",
      "Eats oatmeal"
    ],
    "ans": "Does a 20-minute yoga session"
  },
  {
    "q": "How long does the commute to the office take?",
    "opts": [
      "20 minutes",
      "1 hour",
      "45 minutes",
      "10 minutes"
    ],
    "ans": "45 minutes"
  },
  {
    "q": "What does the writer do during the train ride?",
    "opts": [
      "Replies to emails",
      "Reads a novel",
      "Sleeps",
      "Listens to educational podcasts"
    ],
    "ans": "Listens to educational podcasts"
  },
  {
    "q": "Why does the writer go to bed at 10:30 PM?",
    "opts": [
      "Because the TV show ends",
      "Because the house is dark",
      "To avoid catching a cold",
      "To have enough energy for the next day"
    ],
    "ans": "To have enough energy for the next day"
  }
],
};

export default function InterWritingLesson3(): React.ReactElement {
  const navigate = useNavigate();
  const nextPath = '/modul/english/intermediate/writing/lesson-4';
  const [isCompleted, setIsCompleted] = useState(() => getCompletedWritingLessons().includes(3));
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'baca' | 'latihan' | 'kuis'>('baca');

  const handleComplete = () => { markWritingComplete(3); setIsCompleted(true); setShowModal(true); };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 animate-fade-in" style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }} onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-[2rem] p-8 max-w-sm w-full text-center shadow-2xl relative overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-amber-400 to-orange-500 rounded-t-[2rem] -z-10" />
            <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 bg-white shadow-xl border-4 border-amber-50 mt-4">
              <span className="text-5xl">🏆</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-800 mb-2">Lesson Selesai! 🎉</h2>
            <p className="text-slate-500 mb-8 leading-relaxed">Selamat! Kamu berhasil menaklukkan tantangan <b>B1/B2 Writing Analysis</b>.</p>
            <div className="space-y-3">
              <button onClick={() => { setShowModal(false); navigate(nextPath); }} className="w-full py-4 rounded-xl font-bold text-white bg-amber-500 hover:bg-amber-600 shadow-lg shadow-amber-200 transition-all active:scale-95">Materi Selanjutnya</button>
              <button onClick={() => setShowModal(false)} className="w-full py-4 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all">Tutup</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col h-[100dvh] md:h-[calc(100vh-2rem)] bg-slate-50 md:rounded-3xl overflow-hidden shadow-2xl md:max-w-4xl md:mx-auto md:my-4 border border-slate-200">
        <header className="flex-none bg-white/80 backdrop-blur-xl sticky top-0 z-20 border-b border-slate-100 shadow-sm transition-all py-3 px-4">
          <div className="flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-600 transition-colors">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="text-center">
              <h1 className="text-base font-extrabold text-slate-800 tracking-tight">My Daily Routine</h1>
              <p className="text-[10px] text-amber-600 font-bold uppercase tracking-widest bg-amber-50 inline-block px-2 py-0.5 rounded-full mt-0.5">B1/B2 Writing • Lesson 3</p>
            </div>
            <button onClick={() => navigate(nextPath)} className="px-4 py-2 rounded-full text-xs font-bold text-amber-600 bg-amber-50 hover:bg-amber-100 transition-colors">Next ›</button>
          </div>
        </header>

        <div className="flex bg-white border-b border-slate-100 sticky top-[65px] z-10 shadow-sm p-2 gap-2">
          {(['baca', 'latihan', 'kuis'] as const).map((tab) => {
            const labels = { baca: 'Materi Detail', latihan: 'Pemahaman (5)', kuis: 'Super Kuis (20)' };
            const icons = { baca: <BookOpen className="w-4 h-4" />, latihan: <PenTool className="w-4 h-4" />, kuis: <CheckCircle2 className="w-4 h-4" /> };
            const isActive = activeTab === tab;
            return (
              <button key={tab} onClick={() => setActiveTab(tab)} className={'flex-1 py-3 text-sm font-bold tracking-wide transition-all rounded-xl flex items-center justify-center gap-2 ' + (isActive ? 'bg-amber-500 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800')}>
                {icons[tab]} <span className="hidden sm:inline">{labels[tab]}</span>
              </button>
            );
          })}
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-8 pb-28 space-y-6">
            {activeTab === 'baca' && (
              <div className="animate-fade-in space-y-6">
                <div className="bg-gradient-to-br from-indigo-700 to-purple-800 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-10">
                    <BookOpen className="w-32 h-32" />
                  </div>
                  <div className="text-4xl mb-3 relative z-10">🌅</div>
                  <h2 className="text-xl md:text-2xl font-extrabold mb-2 relative z-10">My Daily Routine</h2>
                  <p className="text-sm md:text-base text-indigo-100 leading-relaxed max-w-lg relative z-10">
                    Menggunakan *time sequence markers* untuk menceritakan aktivitas sehari-hari secara rasional.
                  </p>
                  <p className="mt-4 text-xs font-bold inline-block bg-white/20 px-3 py-1 rounded-full text-white backdrop-blur-sm shadow-sm border border-white/20">🔥 Enhanced B1/B2 Format</p>
                </div>

                <WritingCard title="Target Mekanikal" icon="🎯">
                  <p className="text-sm text-slate-700 mb-3 leading-relaxed">
                    Untuk menaklukkan level B1-B2 dalam tulisan <strong>daily routines</strong>, perhatikan elemen berikut:
                  </p>
                  <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside bg-slate-50 p-4 rounded-xl shadow-inner border border-slate-100">
                    <li><strong className="text-slate-800">Advanced Lexical Resource:</strong> Hindari kosakata berulang. Gunakan sinonim yang lebih kaya (e.g. <i>crucial, significantly, furthermore</i>).</li>
                    <li><strong className="text-slate-800">Cohesive Devices:</strong> Jangan hanya bertumpu pada 'and', 'but', 'so'. Gunakan <i>Despite, Nevertheless, Consequently, Moreover</i>.</li>
                    <li><strong className="text-slate-800">Sentence Variety:</strong> Padukan kalimat pendek dengan <i>Complex Sentences</i> (Relative clauses, if-clauses).</li>
                  </ul>
                  <p className="text-sm text-indigo-700 mt-4 font-bold bg-indigo-50 p-3 rounded-lg border border-indigo-100 inline-block w-full">
                    👉 Buka tab "Pemahaman" untuk membaca esai contoh lengkap dan uji akurasi bacaanmu!
                  </p>
                </WritingCard>
              </div>
            )}

            {activeTab === 'latihan' && <ComprehensionSection {...COMPREHENSION} />}
            {activeTab === 'kuis' && <QuizEngine items={QUIZ} onComplete={handleComplete} />}
          </div>
        </div>

        <div className="sticky bottom-0 z-30 bg-white/90 backdrop-blur-xl border-t border-slate-200 p-4">
          <button onClick={isCompleted ? () => navigate(-1) : handleComplete} className="w-full py-4 rounded-2xl font-bold text-white flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all hover:shadow-xl" style={{ background: isCompleted ? 'linear-gradient(135deg,#10B981,#059669)' : 'linear-gradient(135deg,#F39C12,#E67E22)' }}>
            <CheckCircle2 className="w-5 h-5" />
            {isCompleted ? 'Validasi Target Selesai ✓ (Kembali)' : 'Tandai Kuis Selesai ✓'}
          </button>
        </div>
      </div>
    </>
  );
}
