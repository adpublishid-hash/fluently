import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine, DialoguePlayer, FillBlankExercise } from './listeningUtils';
import type { QuizItem, DialogueLine, BlankItem } from './listeningUtils';
import { Headphones, PenTool, CheckCircle2, ChevronLeft } from 'lucide-react';

const DIALOGUE: DialogueLine[] = [
  {
    "speaker": "Prof. Harrison",
    "text": "Good morning, everyone. Today's lecture focuses on climate change policy — specifically, the gap between scientific consensus and actual government action. As many of you will be aware, the Intergovernmental Panel on Climate Change, or IPCC, has repeatedly stated that we need to reduce global carbon emissions by at least 45% by 2030 to keep warming below 1.5 degrees Celsius.",
    "translation": "Selamat pagi semuanya. Kuliah hari ini berfokus pada kebijakan perubahan iklim — khususnya, kesenjangan antara konsensus ilmiah dan tindakan pemerintah yang sebenarnya. Seperti yang banyak dari Anda ketahui, Panel Antarpemerintah tentang Perubahan Iklim (IPCC) berulang kali menyatakan bahwa kita perlu mengurangi emisi karbon global setidaknya 45% pada tahun 2030 untuk menjaga pemanasan di bawah 1,5 derajat Celsius.",
    "avatar": "👨‍🏫"
  },
  {
    "speaker": "Prof. Harrison",
    "text": "Despite this scientific clarity, many governments have failed to implement adequate mitigation strategies. The reasons are complex: political resistance, economic dependencies on fossil fuels, and the challenge of balancing short-term voter interests against long-term planetary health. This is what political scientists call the 'collective action problem.'",
    "translation": "Meskipun sudah ada kejelasan ilmiah, banyak pemerintah gagal menerapkan strategi mitigasi yang memadai. Alasannya kompleks: resistensi politik, ketergantungan ekonomi pada bahan bakar fosil, dan tantangan menyeimbangkan kepentingan pemilih jangka pendek dengan kesehatan planet jangka panjang. Inilah yang oleh ilmuwan politik disebut 'masalah tindakan kolektif.'",
    "avatar": "👨‍🏫"
  },
  {
    "speaker": "Student A",
    "text": "Professor, isn't the Paris Agreement supposed to address that? Countries have committed to nationally determined contributions, haven't they?",
    "translation": "Profesor, bukankah Perjanjian Paris seharusnya mengatasi hal itu? Negara-negara telah berkomitmen terhadap kontribusi yang ditentukan secara nasional, bukan?",
    "avatar": "🙋"
  },
  {
    "speaker": "Prof. Harrison",
    "text": "That's an excellent question, and it highlights a fundamental weakness of the Paris Agreement: it's voluntary. Nations set their own targets, and there is no binding enforcement mechanism. A country can pledge ambitious reductions and then quietly water them down without legal consequences.",
    "translation": "Pertanyaan yang sangat bagus, dan itu menyoroti kelemahan mendasar dari Perjanjian Paris: sifatnya sukarela. Negara-negara menetapkan target mereka sendiri, dan tidak ada mekanisme penegakan yang mengikat. Suatu negara bisa berjanji melakukan pengurangan ambisius dan kemudian secara diam-diam melemahkannya tanpa konsekuensi hukum.",
    "avatar": "👨‍🏫"
  },
  {
    "speaker": "Student B",
    "text": "So what's the alternative? A global carbon tax?",
    "translation": "Jadi apa alternatifnya? Pajak karbon global?",
    "avatar": "🙋‍♀️"
  },
  {
    "speaker": "Prof. Harrison",
    "text": "A global carbon price is one of the most economically efficient solutions proposed. When emitting CO2 has a financial cost, both individuals and corporations are incentivised to reduce their carbon footprint. Several economists argue this is far more effective than regulatory mandates alone. The challenge is political — getting all major economies to agree on a common price per tonne of CO2 requires unprecedented international cooperation.",
    "translation": "Harga karbon global adalah salah satu solusi paling efisien secara ekonomi yang diusulkan. Ketika emisi CO2 memiliki biaya finansial, baik individu maupun perusahaan terdorong untuk mengurangi jejak karbon mereka. Beberapa ekonom berpendapat bahwa ini jauh lebih efektif daripada mandat regulasi semata. Tantangannya bersifat politik — membuat semua ekonomi besar menyepakati harga bersama per ton CO2 memerlukan kerja sama internasional yang belum pernah terjadi sebelumnya.",
    "avatar": "👨‍🏫"
  },
  {
    "speaker": "Student A",
    "text": "What role can renewable energy play? Can it replace fossil fuels fast enough?",
    "translation": "Peran apa yang bisa dimainkan energi terbarukan? Apakah bisa menggantikan bahan bakar fosil cukup cepat?",
    "avatar": "🙋"
  },
  {
    "speaker": "Prof. Harrison",
    "text": "The capacity for renewable energy expansion is genuinely promising. Solar and wind costs have dropped dramatically in the past decade. The real obstacles are grid infrastructure, energy storage technology, and political will. Some countries, like Denmark and Germany, are demonstrating that a high-renewable grid is operationally feasible. The question is whether the political accountability mechanisms exist to push most nations in that direction at sufficient speed.",
    "translation": "Kapasitas ekspansi energi terbarukan sungguh menjanjikan. Biaya tenaga surya dan angin telah turun drastis dalam satu dekade terakhir. Hambatan nyatanya adalah infrastruktur jaringan listrik, teknologi penyimpanan energi, dan kemauan politik. Beberapa negara, seperti Denmark dan Jerman, menunjukkan bahwa jaringan listrik dengan energi terbarukan tinggi layak secara operasional. Pertanyaannya adalah apakah mekanisme akuntabilitas politik ada untuk mendorong sebagian besar negara ke arah tersebut dengan kecepatan yang cukup.",
    "avatar": "👨‍🏫"
  }
];

const BLANKS: BlankItem[] = [
  {
    "sentence": "The IPCC states we must reduce carbon ___ by 45% by 2030.",
    "blank": "emissions",
    "opts": [
      "emissions",
      "taxes",
      "prices",
      "workers"
    ],
    "hint": "Gas buang / emisi"
  },
  {
    "sentence": "Many governments have failed to implement adequate ___ strategies.",
    "blank": "mitigation",
    "opts": [
      "mitigation",
      "celebration",
      "production",
      "elimination"
    ],
    "hint": "Upaya mengurangi dampak"
  },
  {
    "sentence": "The Paris Agreement lacks a binding ___ mechanism.",
    "blank": "enforcement",
    "opts": [
      "enforcement",
      "decoration",
      "entertainment",
      "foundation"
    ],
    "hint": "Mekanisme penegakan hukum"
  },
  {
    "sentence": "A global carbon ___ makes emitting CO2 financially costly.",
    "blank": "price",
    "opts": [
      "price",
      "law",
      "party",
      "game"
    ],
    "hint": "Harga / biaya finansial pada emisi karbon"
  },
  {
    "sentence": "Solar and wind energy ___ have fallen dramatically in the past decade.",
    "blank": "costs",
    "opts": [
      "costs",
      "colors",
      "names",
      "buildings"
    ],
    "hint": "Biaya / ongkos produksi"
  },
  {
    "sentence": "The challenge is getting all economies to agree through international ___.",
    "blank": "cooperation",
    "opts": [
      "cooperation",
      "competition",
      "confusion",
      "conversation"
    ],
    "hint": "Kerja sama / kolaborasi internasional"
  },
  {
    "sentence": "Countries with ___ grids like Denmark show it is operationally feasible.",
    "blank": "high-renewable",
    "opts": [
      "high-renewable",
      "fossil-fuel",
      "coal-based",
      "nuclear-heavy"
    ],
    "hint": "Jaringan yang menggunakan banyak energi terbarukan"
  }
];

const QUIZ: QuizItem[] = [
  {
    "q": "What is the main focus of today's lecture?",
    "opts": [
      "Nuclear energy safety",
      "The gap between scientific consensus and government action on climate",
      "Economic growth in developing nations",
      "History of the Industrial Revolution"
    ],
    "ans": "The gap between scientific consensus and government action on climate",
    "exp": "Prof. Harrison explicitly states the lecture focuses on \"the gap between scientific consensus and actual government action.\""
  },
  {
    "q": "According to the IPCC, by what percentage must carbon emissions be reduced by 2030?",
    "opts": [
      "15%",
      "30%",
      "45%",
      "60%"
    ],
    "ans": "45%",
    "exp": "The professor states: \"we need to reduce global carbon emissions by at least 45% by 2030.\""
  },
  {
    "q": "What temperature limit is mentioned as the goal?",
    "opts": [
      "1 degree Celsius",
      "1.5 degrees Celsius",
      "2 degrees Celsius",
      "3 degrees Celsius"
    ],
    "ans": "1.5 degrees Celsius",
    "exp": "\"to keep warming below 1.5 degrees Celsius\" — the IPCC target mentioned by the professor."
  },
  {
    "q": "What term does the professor use for the challenge of getting nations to cooperate for a global good?",
    "opts": [
      "Free rider problem",
      "Collective action problem",
      "Prisoner's dilemma",
      "Tragedy of the commons"
    ],
    "ans": "Collective action problem",
    "exp": "The professor specifically uses the phrase \"collective action problem\" to describe why nations fail to coordinate."
  },
  {
    "q": "What is identified as the fundamental weakness of the Paris Agreement?",
    "opts": [
      "It was never signed",
      "It only covers developing nations",
      "Commitments are voluntary with no binding enforcement",
      "It focuses only on nuclear energy"
    ],
    "ans": "Commitments are voluntary with no binding enforcement",
    "exp": "The professor states \"it's voluntary... there is no binding enforcement mechanism.\""
  },
  {
    "q": "What is described as \"one of the most economically efficient solutions\"?",
    "opts": [
      "Banning all fossil fuels immediately",
      "A global carbon price/tax",
      "Shutting down all factories",
      "Planting a trillion trees"
    ],
    "ans": "A global carbon price/tax",
    "exp": "\"A global carbon price is one of the most economically efficient solutions proposed.\""
  },
  {
    "q": "How does a carbon price incentivise behaviour change?",
    "opts": [
      "By putting people in prison",
      "By making emitting CO2 financially costly",
      "By rewarding people for travelling more",
      "By lowering electricity prices"
    ],
    "ans": "By making emitting CO2 financially costly",
    "exp": "When CO2 emission has a financial cost, individuals and companies are incentivised to reduce their footprint."
  },
  {
    "q": "Which countries does the professor mention as having high-renewable energy grids?",
    "opts": [
      "USA and China",
      "Brazil and India",
      "Denmark and Germany",
      "Japan and South Korea"
    ],
    "ans": "Denmark and Germany",
    "exp": "\"Some countries, like Denmark and Germany, are demonstrating that a high-renewable grid is operationally feasible.\""
  },
  {
    "q": "What are mentioned as the real obstacles to renewable energy expansion?",
    "opts": [
      "Lack of sunlight and wind",
      "Grid infrastructure, storage technology, and political will",
      "Insufficient scientific research",
      "Absence of international treaties"
    ],
    "ans": "Grid infrastructure, storage technology, and political will",
    "exp": "\"The real obstacles are grid infrastructure, energy storage technology, and political will.\""
  },
  {
    "q": "The word \"anthropogenic\" means...",
    "opts": [
      "Relating to ancient history",
      "Caused by human activity",
      "Related to animal migration",
      "Natural geological processes"
    ],
    "ans": "Caused by human activity",
    "exp": "\"Anthropogenic\" refers to effects or changes caused by human activity — a key term in climate science."
  },
  {
    "q": "Why is getting a global carbon price politically challenging?",
    "opts": [
      "Scientists oppose it",
      "All economies must agree on a common price — requiring unprecedented cooperation",
      "It would make energy free",
      "No economists support it"
    ],
    "ans": "All economies must agree on a common price — requiring unprecedented cooperation",
    "exp": "\"Getting all major economies to agree on a common price per tonne of CO2 requires unprecedented international cooperation.\""
  },
  {
    "q": "What have happened to solar and wind energy costs in the past decade?",
    "opts": [
      "They have tripled",
      "They have stayed the same",
      "They have dropped dramatically",
      "They have become unaffordable"
    ],
    "ans": "They have dropped dramatically",
    "exp": "\"Solar and wind costs have dropped dramatically in the past decade.\""
  },
  {
    "q": "Student A's point about Nationally Determined Contributions (NDCs) suggests...",
    "opts": [
      "They are strictly enforced",
      "They are legally binding on all nations",
      "They represent voluntary national targets without legal consequences",
      "They were rejected by all countries"
    ],
    "ans": "They represent voluntary national targets without legal consequences",
    "exp": "The professor confirms NDCs are voluntary — countries can water down promises without legal consequences."
  },
  {
    "q": "What does \"mitigation\" mean in the context of climate change?",
    "opts": [
      "To increase emissions for economic growth",
      "Strategies to reduce the severity of climate change",
      "To deny climate change exists",
      "To study the history of climate"
    ],
    "ans": "Strategies to reduce the severity of climate change",
    "exp": "\"Mitigation\" means actions taken to reduce or prevent greenhouse gas emissions to limit climate change impact."
  },
  {
    "q": "The \"collective action problem\" refers to...",
    "opts": [
      "When companies work together efficiently",
      "The challenge of nations cooperating for collective benefit when individual incentives conflict",
      "A type of group exercise in politics",
      "When governments fund collective art projects"
    ],
    "ans": "The challenge of nations cooperating for collective benefit when individual incentives conflict",
    "exp": "The collective action problem describes when rational individual choices lead to collectively bad outcomes."
  },
  {
    "q": "What does the professor imply about political will in the context of renewables?",
    "opts": [
      "Political will is no longer needed",
      "There is already sufficient political will globally",
      "Political will is a critical missing component in many nations",
      "Politicians are fully aligned with climate scientists"
    ],
    "ans": "Political will is a critical missing component in many nations",
    "exp": "The professor flags \"political will\" as one of the real obstacles alongside infrastructure and technology."
  },
  {
    "q": "Which level of English listening describes the ability to follow complex academic lectures?",
    "opts": [
      "A1",
      "A2",
      "B1",
      "B2"
    ],
    "ans": "B2",
    "exp": "CEFR B2: Can understand extended speech and lectures and follow complex lines of argument on familiar topics."
  },
  {
    "q": "What is a \"carbon footprint\"?",
    "opts": [
      "A physical mark left by carbon dioxide",
      "The total amount of greenhouse gases caused by an individual or organisation",
      "A type of renewable energy",
      "A step in the policy-making process"
    ],
    "ans": "The total amount of greenhouse gases caused by an individual or organisation",
    "exp": "\"Carbon footprint\" refers to the total greenhouse gas emissions caused directly or indirectly by a person or organisation."
  },
  {
    "q": "According to the lecture, what is missing from the Paris Agreement that would make it stronger?",
    "opts": [
      "More signatories",
      "A binding legal enforcement mechanism with consequences",
      "Better scientific support",
      "More funding from wealthy nations"
    ],
    "ans": "A binding legal enforcement mechanism with consequences",
    "exp": "The professor says nations can break promises \"without legal consequences\" — implying a binding mechanism is missing."
  },
  {
    "q": "The tone of the lecture is best described as...",
    "opts": [
      "Casual and entertaining",
      "Critical and analytical, exploring policy limitations",
      "Extremely optimistic about current policies",
      "Strongly opposed to all international agreements"
    ],
    "ans": "Critical and analytical, exploring policy limitations",
    "exp": "The professor critically analyses the gap between climate science and government policy in an academic tone."
  }
];

const VOCAB = [
  { "word": "Mitigation", "meaning": "Mitigasi – mengurangi dampak perubahan iklim" },
  { "word": "Carbon-neutral", "meaning": "Karbon-netral – tidak menghasilkan emisi bersih" },
  { "word": "Tipping point", "meaning": "Titik kritis – ambang batas perubahan tak dapat dibalik" },
  { "word": "Emissions trading", "meaning": "Perdagangan emisi – sistem izin emisi karbon" },
  { "word": "Renewable energy", "meaning": "Energi terbarukan – energi dari sumber alam yang tak habis" },
  { "word": "Climate accord", "meaning": "Perjanjian iklim – kesepakatan internasional tentang iklim" },
  { "word": "Fossil fuels", "meaning": "Bahan bakar fosil – energi dari batubara, minyak, gas" },
  { "word": "Net-zero", "meaning": "Net-zero – keseimbangan antara emisi dan penyerapan karbon" }
];

export default function UpperInterListeningLesson1() {
  const navigate = useNavigate();
  const nextPath = '/modul/english/upper-intermediate/listening/lesson-2';
  const STORAGE_KEY = 'talky_upper_intermediate_listening_completed';

  const getCompleted = (): number[] => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
  };
  const markComplete = (n: number) => {
    const d = getCompleted();
    if (!d.includes(n)) localStorage.setItem(STORAGE_KEY, JSON.stringify([...d, n]));
  };

  const [isCompleted, setIsCompleted] = useState(() => getCompleted().includes(1));
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'simak' | 'latihan' | 'kuis'>('simak');

  const handleComplete = () => { markComplete(1); setIsCompleted(true); setShowModal(true); };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 animate-fade-in" style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }} onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-[2rem] p-8 max-w-sm w-full text-center shadow-2xl relative overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="absolute top-0 left-0 w-full h-32 rounded-t-[2rem] -z-10 bg-gradient-to-br from-sky-600 to-blue-500" />
            <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 bg-white shadow-xl border-4 border-white/80 mt-4"><span className="text-5xl">🎧</span></div>
            <h2 className="text-2xl font-extrabold text-slate-800 mb-2">Lesson Selesai! 🎉</h2>
            <p className="text-slate-500 mb-8 leading-relaxed">Selamat! Anda berhasil memahami materi B2 tentang: <strong>University Lecture: Climate Change Policy</strong>.</p>
            <div className="space-y-3">
              <button onClick={() => { setShowModal(false); navigate(nextPath); }} className="w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all active:scale-95" style={{ backgroundColor: '#059669' }}>Pelajari Materi Selanjutnya</button>
              <button onClick={() => setShowModal(false)} className="w-full py-4 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all">Tutup</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col h-[100dvh] md:h-full bg-slate-50">
        <header className="flex-none bg-white/95 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100 shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-600 transition-colors"><ChevronLeft className="w-6 h-6" /></button>
            <div className="text-center">
              <h1 className="text-sm font-bold text-slate-800 line-clamp-1">University Lecture: Climate Change Policy</h1>
              <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#059669' }}>Upper-Intermediate Listening • L1</p>
            </div>
            <button onClick={() => navigate(nextPath)} className="px-3 h-9 rounded-full text-xs font-bold transition-colors" style={{ color: '#059669', backgroundColor: '#05966918' }}>Next ›</button>
          </div>
        </header>

        <div className="flex bg-white border-b border-slate-100 sticky top-[65px] z-10 p-2 gap-2 shadow-sm">
          {(['simak', 'latihan', 'kuis'] as const).map(tab => {
            const labels = { simak: 'Simak TTS', latihan: 'Isi Rumpang', kuis: 'Kuis 20 Soal' };
            const icons = { simak: <Headphones className="w-4 h-4" />, latihan: <PenTool className="w-4 h-4" />, kuis: <CheckCircle2 className="w-4 h-4" /> };
            const isActive = activeTab === tab;
            return (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={'flex-1 py-3 text-sm font-bold tracking-wide transition-all rounded-xl flex items-center justify-center gap-2 ' + (isActive ? 'text-white shadow-md' : 'text-slate-500 hover:bg-slate-50')}
                style={isActive ? { backgroundColor: '#059669' } : {}}>
                {icons[tab]} {labels[tab]}
              </button>
            );
          })}
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-8 pb-28 space-y-6">
            {activeTab === 'simak' && (
              <div className="animate-fade-in space-y-6">
                <div className="bg-gradient-to-br from-sky-600 to-blue-500 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-20"><Headphones className="w-24 h-24" /></div>
                  <h2 className="text-xl md:text-2xl font-extrabold mb-2 relative z-10">B2 Listening: University Lecture: Climate Change Policy</h2>
                  <p className="text-sm md:text-base text-white/90 leading-relaxed max-w-lg relative z-10">Pidato Akademik: Kebijakan Perubahan Iklim</p>
                  <div className="mt-3 inline-block bg-white/20 px-3 py-1 rounded-full text-xs font-bold">🎧 CEFR B2 · Upper-Intermediate Listening</div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full rounded-l-3xl" style={{ backgroundColor: '#059669' }} />
                  <p className="text-xs font-extrabold uppercase tracking-widest mb-4" style={{ color: '#059669' }}>📖 KOSAKATA B2 KUNCI</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {VOCAB.map((v) => (
                      <div key={v.word} className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 flex items-center justify-between hover:bg-slate-100 transition-colors">
                        <span className="text-sm font-bold text-slate-800">{v.word}</span>
                        <span className="text-xs font-medium text-right max-w-[60%] leading-tight" style={{ color: '#059669' }}>{v.meaning}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                  <DialoguePlayer title="University Lecture: Climate Change Policy" lines={DIALOGUE} />
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                  <p className="text-sm font-bold text-amber-800 mb-1">💡 Tips Listening B2</p>
                  <ul className="text-sm text-amber-700 space-y-1">
                    <li>• Fokus pada <strong>argumen utama</strong>, bukan setiap kata</li>
                    <li>• Perhatikan <strong>signal words</strong>: however, therefore, despite, in contrast</li>
                    <li>• Catat <strong>poin-poin kunci</strong> setelah setiap paragraph</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'latihan' && (
              <div className="animate-fade-in">
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 mb-6">
                  <h3 className="text-lg font-bold text-slate-800 mb-2">Isi Rumpang (Fill in the Blank)</h3>
                  <p className="text-sm text-slate-500">Gunakan konteks dari percakapan di atas untuk memilih kata yang tepat.</p>
                </div>
                <FillBlankExercise items={BLANKS} />
              </div>
            )}

            {activeTab === 'kuis' && (
              <div className="animate-fade-in">
                <QuizEngine items={QUIZ} onComplete={handleComplete} />
              </div>
            )}
          </div>
        </div>

        <div className="sticky bottom-0 z-30 bg-white/90 backdrop-blur-xl border-t border-slate-200 p-4">
          <button onClick={isCompleted ? () => navigate(-1) : handleComplete}
            className="w-full py-4 rounded-2xl font-bold text-white flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all hover:shadow-xl"
            style={{ background: isCompleted ? 'linear-gradient(135deg,#10B981,#059669)' : `linear-gradient(135deg,#059669,#059669CC)` }}>
            <CheckCircle2 className="w-5 h-5" />
            {isCompleted ? 'Sudah Selesai ✓ (Kembali)' : 'Tandai Selesai ✓'}
          </button>
        </div>
      </div>
    </>
  );
}
