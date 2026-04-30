import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine, WritingCard, ComprehensionSection, getCompletedWritingLessons, markWritingComplete } from './writingUtils';
import type { QuizItem, ComprehensionQ } from './writingUtils';
import { BookOpen, PenTool, CheckCircle2, ChevronLeft } from 'lucide-react';

const QUIZ: QuizItem[] = [
  {
    "q": "Which greeting is highly informal and typical for a friend?",
    "opts": [
      "Dear Madam,",
      "To Whom It May Concern,",
      "Hi Sarah,",
      "Dear Ms. Sarah,"
    ],
    "ans": "Hi Sarah,",
    "exp": "\"Hi\" followed by a first name is the standard informal greeting."
  },
  {
    "q": "What does the phrase \"caught up\" mean contextually?",
    "opts": [
      "To run fast",
      "To talk and update each other on life",
      "To catch a ball",
      "To get a virus"
    ],
    "ans": "To talk and update each other on life",
    "exp": "\"Catch up\" is an informal phrasal verb meaning to exchange news."
  },
  {
    "q": "Identify the contraction used in the text that makes it informal:",
    "opts": [
      "I am",
      "Absolutely",
      "I've",
      "Ceremony"
    ],
    "ans": "I've",
    "exp": "Contractions like \"I've\" (I have) are hallmarks of informal/personal writing."
  },
  {
    "q": "What is the function of the question \"How have you been?\"",
    "opts": [
      "Rhetorical social greeting showing care",
      "A strict medical inquiry",
      "A test of grammar",
      "To end the letter"
    ],
    "ans": "Rhetorical social greeting showing care",
    "exp": "It is a friendly opening to establish a warm tone."
  },
  {
    "q": "Choose the most appropriate informal sign-off used here.",
    "opts": [
      "Yours faithfully,",
      "Warmly,",
      "Best regards,",
      "Sincerely,"
    ],
    "ans": "Warmly,",
    "exp": "Warmly, Best, or Cheers are appropriate for personal letters."
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
    "q": "Which is correctly punctuated?",
    "opts": [
      "Although, it was raining we went out.",
      "Although it was raining, we went out.",
      "Although it was raining we went out,",
      "Although, it was raining, we went out."
    ],
    "ans": "Although it was raining, we went out.",
    "exp": "Jika kalimat dimulai dengan konjungsi subordinatif (Although), gunakan koma sebelum klausa utama."
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
    "q": "Which sentence uses the PASSIVE voice correctly?",
    "opts": [
      "The report was finished by Anna yesterday.",
      "The report finished Anna yesterday.",
      "Anna was finished the report yesterday.",
      "The report was finish by Anna."
    ],
    "ans": "The report was finished by Anna yesterday.",
    "exp": "Pasif: Subject (The report) + to be (was) + Past Participle (finished)."
  },
  {
    "q": "\"On the one hand... ___\". What finishes this paired conjunction?",
    "opts": [
      "On the second hand...",
      "On the other side...",
      "On the other hand...",
      "However..."
    ],
    "ans": "On the other hand...",
    "exp": "Pasangan frasa idiomatis ini selalu \"On the one hand... On the other hand...\" untuk membandingkan dua sisi."
  },
  {
    "q": "Identify the error: \"I look forward to hear from you soon.\"",
    "opts": [
      "look forward",
      "to hear",
      "from you",
      "soon"
    ],
    "ans": "to hear",
    "exp": "Aturan baku: \"look forward to\" selalu diikuti oleh Gerund (V-ing), sehingga seharusnya \"to hearing\"."
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
    "q": "Which choice correctly joins these: \"It was late. I kept writing.\"",
    "opts": [
      "It was late so I kept writing.",
      "Although it was late, I kept writing.",
      "Because it was late, I kept writing.",
      "It was late, therefore I kept writing."
    ],
    "ans": "Although it was late, I kept writing.",
    "exp": "Konteks kalimat menunjukkan kontras (sudah malam tapi tetap nulis), jadi \"Although\" adalah yang paling masuk akal."
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
    "q": "Identify the compound adjective: \"She bought a ___ car.\"",
    "opts": [
      "very fast",
      "brand-new",
      "beautifully",
      "red"
    ],
    "ans": "brand-new",
    "exp": "\"Brand-new\" adalah adjective gabungan (compound adjective) yang dihubungkan dengan hyphen."
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
    "q": "\"Due to\" is primarily used to indicate...",
    "opts": [
      "Addition",
      "Time",
      "Cause or Reason",
      "Condition"
    ],
    "ans": "Cause or Reason",
    "exp": "\"Due to\" (= because of) digunakan untuk menunjukkan alasan/penyebab dari sesuatu."
  },
  {
    "q": "Which word modifies a verb strongly?",
    "opts": [
      "Beautiful",
      "Quick",
      "Significantly",
      "Happy"
    ],
    "ans": "Significantly",
    "exp": "\"Significantly\" adalah adverb (kata keterangan) yang memodifikasi/menjelaskan verb."
  }
];

const COMPREHENSION: { passageTitle: string; passage: React.ReactNode; questions: ComprehensionQ[] } = {
  passageTitle: '✍️ Personal Email',
  passage: (
    <>
      <div className="bg-amber-50 p-6 font-serif rounded-xl border border-amber-100 shadow-inner text-slate-800 leading-relaxed text-[15px]" 
           dangerouslySetInnerHTML={{ __html: "<p className=\"mb-4\">Subject: Guess who's back in town!\n\nHi Sarah,\n\nHow have you been? I hope everything is going great with your new job. It feels like ages since we last caught up over coffee.\n\nI’m writing to let you know that I’ve just moved back to Jakarta after finishing my master’s degree in Melbourne! The graduation ceremony was absolutely exhausting but totally worth it. Now that I’m back, I have so much free time before I start looking for full-time work, and I really want to hear all about your recent promotion.\n\nAre you free this weekend? We should definitely go to that new Italian restaurant you were raving about on Instagram. Let me know what day works best for you. I can drive us there since I just got my car fixed.\n\nCan’t wait to see you soon!\n\nWarmly,\nDavid</p>" }} />
    </>
  ),
  questions: [
  {
    "q": "What is the purpose of this email?",
    "opts": [
      "To apply for a job",
      "To complain about a restaurant",
      "To inform a friend about moving back and arranging to meet",
      "To send an invoice"
    ],
    "ans": "To inform a friend about moving back and arranging to meet"
  },
  {
    "q": "Where did David just return from?",
    "opts": [
      "Jakarta",
      "Italy",
      "Melbourne",
      "London"
    ],
    "ans": "Melbourne"
  },
  {
    "q": "Why does David have free time right now?",
    "opts": [
      "He was fired",
      "He is waiting to start looking for work after graduation",
      "He is on holiday",
      "He works part-time"
    ],
    "ans": "He is waiting to start looking for work after graduation"
  },
  {
    "q": "What type of food are they planning to eat?",
    "opts": [
      "Indonesian",
      "Japanese",
      "Italian",
      "Mexican"
    ],
    "ans": "Italian"
  },
  {
    "q": "How will they get to the restaurant?",
    "opts": [
      "David will drive",
      "Sarah will drive",
      "They will take a taxi",
      "They will walk"
    ],
    "ans": "David will drive"
  }
],
};

export default function InterWritingLesson2(): React.ReactElement {
  const navigate = useNavigate();
  const nextPath = '/modul/english/intermediate/writing/lesson-3';
  const [isCompleted, setIsCompleted] = useState(() => getCompletedWritingLessons().includes(2));
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'baca' | 'latihan' | 'kuis'>('baca');

  const handleComplete = () => { markWritingComplete(2); setIsCompleted(true); setShowModal(true); };

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
              <h1 className="text-base font-extrabold text-slate-800 tracking-tight">Personal Email</h1>
              <p className="text-[10px] text-amber-600 font-bold uppercase tracking-widest bg-amber-50 inline-block px-2 py-0.5 rounded-full mt-0.5">B1/B2 Writing • Lesson 2</p>
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
                  <div className="text-4xl mb-3 relative z-10">✉️</div>
                  <h2 className="text-xl md:text-2xl font-extrabold mb-2 relative z-10">Personal Email</h2>
                  <p className="text-sm md:text-base text-indigo-100 leading-relaxed max-w-lg relative z-10">
                    Menulis surat pribadi dengan nada santai, kontraksi, dan ungkapan emosional.
                  </p>
                  <p className="mt-4 text-xs font-bold inline-block bg-white/20 px-3 py-1 rounded-full text-white backdrop-blur-sm shadow-sm border border-white/20">🔥 Enhanced B1/B2 Format</p>
                </div>

                <WritingCard title="Target Mekanikal" icon="🎯">
                  <p className="text-sm text-slate-700 mb-3 leading-relaxed">
                    Untuk menaklukkan level B1-B2 dalam tulisan <strong>personal communication</strong>, perhatikan elemen berikut:
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
