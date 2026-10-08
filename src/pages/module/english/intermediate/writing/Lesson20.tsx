import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine, WritingCard, ComprehensionSection, getCompletedWritingLessons, markWritingComplete } from './writingUtils';
import type { QuizItem, ComprehensionQ } from './writingUtils';
import { BookOpen, PenTool, CheckCircle2, ChevronLeft } from 'lucide-react';

const QUIZ: QuizItem[] = [
  {
    "q": "Identify the contrast linker in paragraph one:",
    "opts": [
      "Foundation",
      "Indicates",
      "While",
      "Consequently"
    ],
    "ans": "While",
    "exp": "\"While vocabulary forms the base, the ability to weave...\" sets up a contrast of importance."
  },
  {
    "q": "What does \"Consequently\" mean in this context?",
    "opts": [
      "Before",
      "In addition",
      "As a logical result",
      "However"
    ],
    "ans": "As a logical result",
    "exp": "Because paragraphing shows proficiency, AS A RESULT, learners must focus on cohesion."
  },
  {
    "q": "What is the grammatical subject of \"reading extensive literature exposes students\"?",
    "opts": [
      "Literature",
      "Reading extensive literature (Gerund phrase)",
      "Exposes",
      "Students"
    ],
    "ans": "Reading extensive literature (Gerund phrase)",
    "exp": "The entire gerund phrase acts as the subject."
  },
  {
    "q": "In the phrase \"can highlight persistent errors\", what does \"persistent\" mean?",
    "opts": [
      "Easy to see",
      "Funny",
      "Occurring repeatedly and constantly",
      "Grammatical"
    ],
    "ans": "Occurring repeatedly and constantly",
    "exp": "\"Persistent\" means something stubborn that keeps happening."
  },
  {
    "q": "Why is \"Therefore\" used in the last paragraph?",
    "opts": [
      "To start a story",
      "To introduce a cause",
      "To conclude a logical argument",
      "To change subjects"
    ],
    "ans": "To conclude a logical argument",
    "exp": "It logically connects the objective (clarity) with the necessary action (proper punctuation)."
  },
  {
    "q": "Which phrase is most appropriate for a formal email greeting?",
    "opts": [
      "Hi mate,",
      "Dear Mr. Smith,",
      "What’s up Smith,",
      "Hey there,"
    ],
    "ans": "Dear Mr. Smith,",
    "exp": "Dalam email formal, sapaan standar adalah \"Dear [Title] [Last Name],\"."
  },
  {
    "q": "Which cohesive device BEST shows CONTRAST?",
    "opts": [
      "Similarly",
      "Consequently",
      "Nevertheless",
      "Furthermore"
    ],
    "ans": "Nevertheless",
    "exp": "\"Nevertheless\" setara dengan \"However\" atau \"Despite that\", digunakan untuk menunjukkan kontras yang kuat."
  },
  {
    "q": "Choose the correct structure: \"Not only ___ fast, but she is also strong.\"",
    "opts": [
      "runs she",
      "is she running",
      "does she run",
      "she runs"
    ],
    "ans": "does she run",
    "exp": "Struktur Inversion: Saat kalimat diawali \"Not only\", dilanjutkan dengan auxiliary + subjek (does she run)."
  },
  {
    "q": "How do you make this formal? \"Send me the files ASAP.\"",
    "opts": [
      "Please dispatch the files really quick.",
      "I require the files immediately.",
      "Please send the documents at your earliest convenience.",
      "Shoot the documents to me."
    ],
    "ans": "Please send the documents at your earliest convenience.",
    "exp": "\"At your earliest convenience\" adalah frasa kesopanan baku dalam korespondensi bisnis/formal."
  },
  {
    "q": "Choose the most FORMAL word to replace \"but\":",
    "opts": [
      "So",
      "And",
      "Also",
      "However"
    ],
    "ans": "However",
    "exp": "\"However\" adalah transisi formal yang sangat baik untuk menggantikan \"but\" di awal kalimat."
  },
  {
    "q": "What is the purpose of a thesis statement in an essay?",
    "opts": [
      "To give a dictionary definition",
      "To greet the reader",
      "To state the main argument or focus of the essay",
      "To ask a rhetorical question"
    ],
    "ans": "To state the main argument or focus of the essay",
    "exp": "Thesis statement berada di paragraf pertama untuk menjabarkan argumen/titik berat esai."
  },
  {
    "q": "What is the function of \"For instance\"?",
    "opts": [
      "To provide an example",
      "To conclude",
      "To contrast",
      "To show cause"
    ],
    "ans": "To provide an example",
    "exp": "\"For instance\" adalah variasi formal dari \"For example\" pada level B1/B2."
  },
  {
    "q": "Identify the spelling error in this formal text: \"The goverment should take action immediately.\"",
    "opts": [
      "action",
      "should",
      "goverment",
      "immediately"
    ],
    "ans": "goverment",
    "exp": "Ejaan yang benar adalah \"governMENT\" (ada huruf n yang sering terlupa)."
  },
  {
    "q": "Choose the correct form: \"If I ___ more time, I would check the document again.\"",
    "opts": [
      "have",
      "have had",
      "had",
      "having"
    ],
    "ans": "had",
    "exp": "Ini adalah Conditional Type 2 (unreal present): If + Past Simple (had), Subject + would + V1."
  },
  {
    "q": "In writing, what does \"proofreading\" mean?",
    "opts": [
      "Outlining paragraphs",
      "Writing the first draft wildly",
      "Finding academic sources",
      "Carefully checking for grammatical and spelling errors"
    ],
    "ans": "Carefully checking for grammatical and spelling errors",
    "exp": "Proofreading adalah tahapan akhir untuk membaca ulang dan memperbaiki kesalahan minor."
  },
  {
    "q": "Which is correctly punctuated?",
    "opts": [
      "Although it was raining, we went out.",
      "Although, it was raining, we went out.",
      "Although, it was raining we went out.",
      "Although it was raining we went out,"
    ],
    "ans": "Although it was raining, we went out.",
    "exp": "Jika kalimat dimulai dengan konjungsi subordinatif (Although), gunakan koma sebelum klausa utama."
  },
  {
    "q": "How would you combine these sentences with a relative clause? \"The man called the police. His car was stolen.\"",
    "opts": [
      "The man whose car was stolen called the police.",
      "The man whom car was stolen called the police.",
      "The man whom called the police had his car stolen.",
      "The man called the police whose car was stolen."
    ],
    "ans": "The man whose car was stolen called the police.",
    "exp": "\"Whose\" digunakan untuk kepemilikan. Klausul relative disematkan langsung setelah \"The man\"."
  },
  {
    "q": "Choose the sentence with correct parallel structure:",
    "opts": [
      "I like swimming, to read, and hike.",
      "I like swimming, reading, and hiking.",
      "I like swim, read, and hike.",
      "I like to swim, reading, and to hike."
    ],
    "ans": "I like swimming, reading, and hiking.",
    "exp": "Struktur paralel mengharuskan semua elemen dalam daftar memiliki bentuk gramatikal yang sama (V-ing, V-ing, V-ing)."
  },
  {
    "q": "Which choice correctly joins these: \"It was late. I kept writing.\"",
    "opts": [
      "Because it was late, I kept writing.",
      "It was late, therefore I kept writing.",
      "Although it was late, I kept writing.",
      "It was late so I kept writing."
    ],
    "ans": "Although it was late, I kept writing.",
    "exp": "Konteks kalimat menunjukkan kontras (sudah malam tapi tetap nulis), jadi \"Although\" adalah yang paling masuk akal."
  },
  {
    "q": "What is the function of \"therefore\"?",
    "opts": [
      "To add a point",
      "To show a result or consequence",
      "To show a difference",
      "To give an example"
    ],
    "ans": "To show a result or consequence",
    "exp": "\"Therefore\" berarti \"oleh karena itu\", digunakan untuk menunjukkan akibat dari kalimat sebelumnya."
  }
];

const COMPREHENSION: { passageTitle: string; passage: React.ReactNode; questions: ComprehensionQ[] } = {
  passageTitle: '✍️ Review & Writing Test',
  passage: (
    <>
      <div className="bg-amber-50 p-6 font-serif rounded-xl border border-amber-100 shadow-inner text-slate-800 leading-relaxed text-[15px]" 
           dangerouslySetInnerHTML={{ __html: "<p className=\"mb-4\">Learning to write effectively in a second language is a journey that requires both patience and practice. While vocabulary and grammar form the foundation, the ability to weave sentences into a coherent paragraph is what truly indicates proficiency. Consequently, intermediate learners must focus significantly on cohesive devices.\n\nThere are several methods to improve writing fluency. Reading extensive literature exposes students to varied sentence structures and formal registers. Additionally, seeking peer review can highlight persistent errors that a student might conventionally overlook. By comparing feedback, learners can identify their weaknesses.\n\nUltimately, writing is a communicative tool. The primary objective is to convey ideas as clearly and concisely as possible. Therefore, minimizing ambiguity through proper punctuation and strict paragraphing rules is essential. Mastery is not achieved overnight, but through consistent, deliberate practice.</p>" }} />
    </>
  ),
  questions: [
  {
    "q": "What is considered the foundation of writing according to the text?",
    "opts": [
      "Speaking loudly",
      "Finding errors",
      "Spelling and reading",
      "Vocabulary and grammar"
    ],
    "ans": "Vocabulary and grammar"
  },
  {
    "q": "What indicates true proficiency?",
    "opts": [
      "Typing fast",
      "The ability to weave sentences into a coherent paragraph",
      "Using passive voice",
      "Knowing 1000 words"
    ],
    "ans": "The ability to weave sentences into a coherent paragraph"
  },
  {
    "q": "How does reading literature help?",
    "opts": [
      "It hurts visibility",
      "It makes you sleepy",
      "It exposes students to varied structures and registers",
      "It wastes time"
    ],
    "ans": "It exposes students to varied structures and registers"
  },
  {
    "q": "What is the primary objective of writing?",
    "opts": [
      "To convey ideas clearly and concisely",
      "To write long sentences",
      "To get a high score",
      "To confuse the reader"
    ],
    "ans": "To convey ideas clearly and concisely"
  },
  {
    "q": "How is mastery achieved?",
    "opts": [
      "Through consistent, deliberate practice",
      "By buying special pens",
      "Overnight magically",
      "By ignoring rules"
    ],
    "ans": "Through consistent, deliberate practice"
  }
],
};

export default function InterWritingLesson20(): React.ReactElement {
  const navigate = useNavigate();
  const nextPath = '/modul/english/intermediate/writing';
  const [isCompleted, setIsCompleted] = useState(() => getCompletedWritingLessons().includes(20));
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'baca' | 'latihan' | 'kuis'>('baca');

  const handleComplete = () => { markWritingComplete(20); setIsCompleted(true); setShowModal(true); };

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
              <h1 className="text-base font-extrabold text-slate-800 tracking-tight">Review & Writing Test</h1>
              <p className="text-[10px] text-amber-600 font-bold uppercase tracking-widest bg-amber-50 inline-block px-2 py-0.5 rounded-full mt-0.5">B1/B2 Writing • Lesson 20</p>
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
                  <div className="text-4xl mb-3 relative z-10">📝</div>
                  <h2 className="text-xl md:text-2xl font-extrabold mb-2 relative z-10">Review & Writing Test</h2>
                  <p className="text-sm md:text-base text-indigo-100 leading-relaxed max-w-lg relative z-10">
                    Latihan penguatan mekanikal teks
                  </p>
                  <p className="mt-4 text-xs font-bold inline-block bg-white/20 px-3 py-1 rounded-full text-white backdrop-blur-sm shadow-sm border border-white/20">🔥 Enhanced B1/B2 Format</p>
                </div>

                <WritingCard title="Target Mekanikal" icon="🎯">
                  <p className="text-sm text-slate-700 mb-3 leading-relaxed">
                    Untuk menaklukkan level B1-B2 dalam tulisan <strong>review & writing test</strong>, perhatikan elemen berikut:
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
