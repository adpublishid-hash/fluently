import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine, WritingCard, ComprehensionSection, getCompletedWritingLessons, markWritingComplete } from './writingUtils';
import type { QuizItem, ComprehensionQ } from './writingUtils';
import { BookOpen, PenTool, CheckCircle2, ChevronLeft } from 'lucide-react';

const QUIZ: QuizItem[] = [
  {
    "q": "What is the function of the FIRST sentence in paragraph two?",
    "opts": [
      "To conclude the essay",
      "To introduce the main topic of that paragraph (culinary & fashion)",
      "To ask a question",
      "To provide a specific example"
    ],
    "ans": "To introduce the main topic of that paragraph (culinary & fashion)",
    "exp": "It serves as the topic sentence for the second paragraph."
  },
  {
    "q": "In the text, what does the phrase \"flock to the city\" mean?",
    "opts": [
      "To leave a place",
      "To gather or travel in large numbers",
      "To fly like birds",
      "To complain loudly"
    ],
    "ans": "To gather or travel in large numbers",
    "exp": "\"Flock\" means people travel there in large groups."
  },
  {
    "q": "Which cohesive device is used to contrast traffic with people's warmth?",
    "opts": [
      "Also",
      "Despite",
      "Because",
      "Furthermore"
    ],
    "ans": "Despite",
    "exp": "\"Despite the heavy traffic... people remain warm\" contrasts a negative with a positive."
  },
  {
    "q": "Identify the adjective used to describe the mountains:",
    "opts": [
      "Trendy",
      "Volcanic",
      "Traditional",
      "Vibrant"
    ],
    "ans": "Volcanic",
    "exp": "The text specifically mentions \"volcanic mountains\"."
  },
  {
    "q": "What happens to the structure of the last paragraph?",
    "opts": [
      "It only talks about food",
      "It summarizes personal feelings and closes the text logically",
      "It introduces a totally new city",
      "It ends without a clear point"
    ],
    "ans": "It summarizes personal feelings and closes the text logically",
    "exp": "The conclusion shares feelings (\"proud\") and summarizes the balance of the city."
  },
  {
    "q": "In writing, what does \"proofreading\" mean?",
    "opts": [
      "Writing the first draft wildly",
      "Finding academic sources",
      "Carefully checking for grammatical and spelling errors",
      "Outlining paragraphs"
    ],
    "ans": "Carefully checking for grammatical and spelling errors",
    "exp": "Proofreading adalah tahapan akhir untuk membaca ulang dan memperbaiki kesalahan minor."
  },
  {
    "q": "Which sentence adds INFORMATION?",
    "opts": [
      "Moreover, the city has excellent public transport.",
      "Despite this, the city is loud.",
      "Therefore, we left early.",
      "As a result, prices increased."
    ],
    "ans": "Moreover, the city has excellent public transport.",
    "exp": "\"Moreover\" (lebih lanjut lagi) digunakan untuk memberikan informasi tambahan yang mendukung argumen."
  },
  {
    "q": "Choose the sentence with correct parallel structure:",
    "opts": [
      "I like swimming, to read, and hike.",
      "I like to swim, reading, and to hike.",
      "I like swimming, reading, and hiking.",
      "I like swim, read, and hike."
    ],
    "ans": "I like swimming, reading, and hiking.",
    "exp": "Struktur paralel mengharuskan semua elemen dalam daftar memiliki bentuk gramatikal yang sama (V-ing, V-ing, V-ing)."
  },
  {
    "q": "Which option is less formal? \"Commence\"",
    "opts": [
      "Begin",
      "Terminate",
      "Execute",
      "Finalize"
    ],
    "ans": "Begin",
    "exp": "\"Commence\" adalah bentuk sangat formal untuk kata \"begin\" atau \"start\"."
  },
  {
    "q": "Choose the correct form: \"If I ___ more time, I would check the document again.\"",
    "opts": [
      "have",
      "had",
      "have had",
      "having"
    ],
    "ans": "had",
    "exp": "Ini adalah Conditional Type 2 (unreal present): If + Past Simple (had), Subject + would + V1."
  },
  {
    "q": "Choose the most FORMAL word to replace \"but\":",
    "opts": [
      "However",
      "Also",
      "So",
      "And"
    ],
    "ans": "However",
    "exp": "\"However\" adalah transisi formal yang sangat baik untuk menggantikan \"but\" di awal kalimat."
  },
  {
    "q": "How would you combine these sentences with a relative clause? \"The man called the police. His car was stolen.\"",
    "opts": [
      "The man called the police whose car was stolen.",
      "The man whose car was stolen called the police.",
      "The man whom car was stolen called the police.",
      "The man whom called the police had his car stolen."
    ],
    "ans": "The man whose car was stolen called the police.",
    "exp": "\"Whose\" digunakan untuk kepemilikan. Klausul relative disematkan langsung setelah \"The man\"."
  },
  {
    "q": "Choose the correct structure: \"Not only ___ fast, but she is also strong.\"",
    "opts": [
      "she runs",
      "runs she",
      "is she running",
      "does she run"
    ],
    "ans": "does she run",
    "exp": "Struktur Inversion: Saat kalimat diawali \"Not only\", dilanjutkan dengan auxiliary + subjek (does she run)."
  },
  {
    "q": "Which sentence is an opinion, not a fact?",
    "opts": [
      "Water boils at 100 degrees.",
      "The population of Tokyo is huge.",
      "Pineapples are the most delicious fruit.",
      "Paris is the capital of France."
    ],
    "ans": "Pineapples are the most delicious fruit.",
    "exp": "\"The most delicious\" adalah penilaian subjektif atau opini."
  },
  {
    "q": "What is a \"Topic Sentence\"?",
    "opts": [
      "The last sentence of a text",
      "A sentence that explains the main idea of a paragraph",
      "A famous quote",
      "The title of an essay"
    ],
    "ans": "A sentence that explains the main idea of a paragraph",
    "exp": "Topic sentence (kalimat utama) memberi tahu pembaca apa gagasan pokok dari paragraf tersebut."
  },
  {
    "q": "Which phrase is most appropriate for a formal email greeting?",
    "opts": [
      "Hi mate,",
      "Hey there,",
      "Dear Mr. Smith,",
      "What’s up Smith,"
    ],
    "ans": "Dear Mr. Smith,",
    "exp": "Dalam email formal, sapaan standar adalah \"Dear [Title] [Last Name],\"."
  },
  {
    "q": "What is the function of \"therefore\"?",
    "opts": [
      "To add a point",
      "To show a difference",
      "To show a result or consequence",
      "To give an example"
    ],
    "ans": "To show a result or consequence",
    "exp": "\"Therefore\" berarti \"oleh karena itu\", digunakan untuk menunjukkan akibat dari kalimat sebelumnya."
  },
  {
    "q": "Which word means \"in addition\"?",
    "opts": [
      "However",
      "Instead",
      "Furthermore",
      "Whereas"
    ],
    "ans": "Furthermore",
    "exp": "\"Furthermore\" adalah adverb formal yang fungsinya menambah argumen atau informasi."
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
    "q": "Select the correct preposition: \"I apologise ___ the delay.\"",
    "opts": [
      "for",
      "from",
      "with",
      "about"
    ],
    "ans": "for",
    "exp": "\"Apologise\" selalu diikut oleh \"for\" ketika merujuk pada alasan (apologise for something)."
  }
];

const COMPREHENSION: { passageTitle: string; passage: React.ReactNode; questions: ComprehensionQ[] } = {
  passageTitle: '✍️ My Hometown',
  passage: (
    <>
      <div className="bg-amber-50 p-6 font-serif rounded-xl border border-amber-100 shadow-inner text-slate-800 leading-relaxed text-[15px]" 
           dangerouslySetInnerHTML={{ __html: "<p className=\"mb-4\">I come from Bandung, a bustling city in West Java, Indonesia. Also known as the \"Paris of Java\", Bandung is famous for its cool climate, lush green landscapes, and historical architecture. The city lies in a river basin entirely surrounded by volcanic mountains, providing spectacular panoramic views.\n\nOne of the most defining aspects of Bandung is its vibrant culinary and fashion scene. The streets of Dago and Riau are lined with trendy cafes, traditional food stalls selling 'siomay' and 'surabi', and massive factory outlets. During the weekends, thousands of tourists flock to the city to experience this unique blend of modern lifestyle and traditional Sundanese culture.\n\nDespite the heavy traffic congestion during holidays, the people of Bandung remain incredibly warm and welcoming. There is a strong sense of community and creativity here. From indie music festivals to local art galleries, the city pulses with creative energy. I am immensely proud of my hometown because it manages to balance rapid development with its beautiful natural heritage.</p>" }} />
    </>
  ),
  questions: [
  {
    "q": "Why is Bandung called the \"Paris of Java\"?",
    "opts": [
      "Because it is in France",
      "Due to its cool climate and historical architecture",
      "Because it is extremely hot",
      "Because of its traffic"
    ],
    "ans": "Due to its cool climate and historical architecture"
  },
  {
    "q": "What is mentioned as a geographical feature of Bandung?",
    "opts": [
      "A large ocean",
      "A huge desert",
      "Surrounded by volcanic mountains",
      "A flat prairie"
    ],
    "ans": "Surrounded by volcanic mountains"
  },
  {
    "q": "What can tourists find along Dago and Riau streets?",
    "opts": [
      "Government offices",
      "Trendy cafes and factory outlets",
      "Farms and barns",
      "Schools and universities"
    ],
    "ans": "Trendy cafes and factory outlets"
  },
  {
    "q": "What negative aspect of Bandung is mentioned in the text?",
    "opts": [
      "Poor food quality",
      "Heavy traffic congestion",
      "Unfriendly people",
      "Lack of art galleries"
    ],
    "ans": "Heavy traffic congestion"
  },
  {
    "q": "How does the writer feel about their hometown?",
    "opts": [
      "Indifferent",
      "Ashamed",
      "Disappointed",
      "Immensely proud"
    ],
    "ans": "Immensely proud"
  }
],
};

export default function InterWritingLesson1(): React.ReactElement {
  const navigate = useNavigate();
  const nextPath = '/modul/english/intermediate/writing/lesson-2';
  const [isCompleted, setIsCompleted] = useState(() => getCompletedWritingLessons().includes(1));
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'baca' | 'latihan' | 'kuis'>('baca');

  const handleComplete = () => { markWritingComplete(1); setIsCompleted(true); setShowModal(true); };

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
              <h1 className="text-base font-extrabold text-slate-800 tracking-tight">My Hometown</h1>
              <p className="text-[10px] text-amber-600 font-bold uppercase tracking-widest bg-amber-50 inline-block px-2 py-0.5 rounded-full mt-0.5">B1/B2 Writing • Lesson 1</p>
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
                  <div className="text-4xl mb-3 relative z-10">🏙️</div>
                  <h2 className="text-xl md:text-2xl font-extrabold mb-2 relative z-10">My Hometown</h2>
                  <p className="text-sm md:text-base text-indigo-100 leading-relaxed max-w-lg relative z-10">
                    Belajar menulis paragraf deskriptif menggunakan detail sensorik dan struktur topik yang kuat.
                  </p>
                  <p className="mt-4 text-xs font-bold inline-block bg-white/20 px-3 py-1 rounded-full text-white backdrop-blur-sm shadow-sm border border-white/20">🔥 Enhanced B1/B2 Format</p>
                </div>

                <WritingCard title="Target Mekanikal" icon="🎯">
                  <p className="text-sm text-slate-700 mb-3 leading-relaxed">
                    Untuk menaklukkan level B1-B2 dalam tulisan <strong>hometown</strong>, perhatikan elemen berikut:
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
