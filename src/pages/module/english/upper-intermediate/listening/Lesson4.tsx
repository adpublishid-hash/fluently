import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine, DialoguePlayer, FillBlankExercise } from './listeningUtils';
import type { QuizItem, DialogueLine, BlankItem } from './listeningUtils';
import { Headphones, PenTool, CheckCircle2, ChevronLeft } from 'lucide-react';

const DIALOGUE: DialogueLine[] = [
  { "speaker": "Host", "avatar": "🎙️", "text": "Welcome to Economic Horizons. Today we're examining one of the most consequential transformations of our time: how automation and digitalisation are reshaping the very nature of work. I'm joined by two economists who fundamentally disagree on what this means for workers. Professor Nakamura, you argue this is largely positive. Dr. Walsh, you're considerably more concerned.", "translation": "Selamat datang di Economic Horizons. Hari ini kita memeriksa salah satu transformasi paling berdampak di era kita: bagaimana otomasi dan digitalisasi mengubah sifat pekerjaan itu sendiri. Saya ditemani dua ekonom yang secara fundamental berbeda pendapat tentang apa artinya bagi pekerja. Profesor Nakamura, Anda berpendapat ini sebagian besar positif. Dr. Walsh, Anda jauh lebih khawatir." },
  { "speaker": "Prof. Nakamura", "avatar": "👨‍💼", "text": "Thank you. Throughout history, technological revolutions have always disrupted existing jobs while creating new ones. The Industrial Revolution automated agricultural labour — and while that was traumatic for many, it ultimately drove urbanisation, industrialisation, and an enormous expansion of human prosperity. The digital revolution will follow a similar pattern.", "translation": "Terima kasih. Sepanjang sejarah, revolusi teknologi selalu mengganggu pekerjaan yang ada sambil menciptakan yang baru. Revolusi Industri mengotomasi tenaga kerja pertanian — dan meskipun itu traumatik bagi banyak orang, pada akhirnya mendorong urbanisasi, industrialisasi, dan ekspansi kemakmuran manusia yang sangat besar. Revolusi digital akan mengikuti pola serupa." },
  { "speaker": "Dr. Walsh", "avatar": "👩‍💼", "text": "I don't dispute the historical pattern, but there are reasons to believe this wave is qualitatively different. AI is not just automating physical, repetitive tasks — it is beginning to encroach on cognitive, professional, and creative domains. Radiologists, lawyers, accountants, even software engineers face partial automation of their core functions. And the speed of this transition may not allow sufficient time for labour market adaptation.", "translation": "Saya tidak mempersoalkan pola historis, tetapi ada alasan untuk percaya bahwa gelombang ini secara kualitatif berbeda. AI bukan hanya mengotomasi tugas fisik berulang — AI mulai merambah domain kognitif, profesional, dan kreatif. Radiolog, pengacara, akuntan, bahkan insinyur perangkat lunak menghadapi otomasi parsial fungsi inti mereka. Dan kecepatan transisi ini mungkin tidak memberikan cukup waktu untuk adaptasi pasar kerja." },
  { "speaker": "Host", "avatar": "🎙️", "text": "Let's talk numbers. Which jobs are most at risk?", "translation": "Mari bicara angka. Pekerjaan apa yang paling berisiko?" },
  { "speaker": "Prof. Nakamura", "avatar": "👨‍💼", "text": "Research from McKinsey suggests that around 15% of current jobs face high automation risk in the next decade. But simultaneously, the World Economic Forum projects the creation of 97 million new roles — particularly in green energy, data analytics, care work, and technology. The net effect may be positive, though the distribution of those gains is the crucial question.", "translation": "Penelitian dari McKinsey menunjukkan bahwa sekitar 15% pekerjaan saat ini menghadapi risiko otomasi tinggi dalam satu dekade ke depan. Namun secara bersamaan, Forum Ekonomi Dunia memproyeksikan penciptaan 97 juta peran baru — khususnya di energi hijau, analitik data, pekerjaan perawatan, dan teknologi. Efek bersih mungkin positif, meskipun distribusi keuntungan tersebut adalah pertanyaan krusial." },
  { "speaker": "Dr. Walsh", "avatar": "👩‍💼", "text": "That distribution is my central concern. New jobs are likely to be concentrated in highly skilled, high-capital cities. Displaced workers in manufacturing towns or rural service sectors don't automatically become data scientists. Without massive investment in retraining and social protection, we risk a two-tier economy: a small, highly skilled, highly paid elite, and a large, economically precarious working class dependent on gig work.", "translation": "Distribusi itulah kekhawatiran utama saya. Pekerjaan baru kemungkinan akan terkonsentrasi di kota-kota berketerampilan tinggi dan bermodal tinggi. Pekerja yang terpindahkan di kota-kota manufaktur atau sektor layanan pedesaan tidak secara otomatis menjadi ilmuwan data. Tanpa investasi besar dalam pelatihan ulang dan perlindungan sosial, kita berisiko mendapatkan ekonomi dua tingkat: elite kecil yang sangat terampil dan bergaji tinggi, dan kelas pekerja besar yang rentan secara ekonomi yang bergantung pada pekerjaan gig." },
  { "speaker": "Prof. Nakamura", "avatar": "👨‍💼", "text": "That risk is real, which is why I support a Universal Basic Income as a transitional mechanism. If productivity gains from automation are shared broadly — through taxation and redistribution — then automation can fund a social dividend that cushions dislocation and funds lifelong learning. The technology itself is not the problem; the distribution of its benefits is the policy challenge.", "translation": "Risiko itu nyata, itulah mengapa saya mendukung Pendapatan Dasar Universal sebagai mekanisme transisi. Jika keuntungan produktivitas dari otomasi dibagikan secara luas — melalui perpajakan dan redistribusi — maka otomasi dapat mendanai dividen sosial yang mengurangi dislokasi dan mendanai pembelajaran seumur hidup. Teknologinya sendiri bukan masalahnya; distribusi manfaatnya adalah tantangan kebijakan." },
  { "speaker": "Dr. Walsh", "avatar": "👩‍💼", "text": "I am sympathetic to UBI in principle, but concerned about implementation. The evidence from pilot programmes is mixed. And UBI alone won't replace the social functions of work — the sense of purpose, community, and identity that employment provides. We need not just income guarantees but meaningful work guarantees. That means large-scale investment in public sector employment, care infrastructure, and green transition jobs.", "translation": "Saya simpatik terhadap UBI secara prinsip, tetapi khawatir tentang implementasinya. Bukti dari program percontohan masih beragam. Dan UBI saja tidak akan menggantikan fungsi sosial kerja — rasa tujuan, komunitas, dan identitas yang disediakan pekerjaan. Kita membutuhkan bukan hanya jaminan pendapatan tetapi jaminan pekerjaan yang bermakna. Itu berarti investasi besar dalam ketenagakerjaan sektor publik, infrastruktur perawatan, dan pekerjaan transisi hijau." }
];

const BLANKS: BlankItem[] = [
  { "sentence": "McKinsey suggests around 15% of jobs face high ___ risk.", "blank": "automation", "opts": ["automation", "inflation", "education", "regulation"], "hint": "Penggantian oleh mesin atau teknologi" },
  { "sentence": "The World Economic Forum projects creation of 97 million new ___.", "blank": "roles", "opts": ["roles", "roads", "rules", "roots"], "hint": "Posisi pekerjaan baru" },
  { "sentence": "Displaced workers may end up dependent on ___ work.", "blank": "gig", "opts": ["gig", "gig", "big", "dig"], "hint": "Pekerjaan kontrak jangka pendek berbasis platform" },
  { "sentence": "A Universal Basic ___ would provide income regardless of employment.", "blank": "Income", "opts": ["Income", "Insurance", "Interest", "Industry"], "hint": "Pendapatan dasar universal" },
  { "sentence": "Automation productivity gains should be shared through taxation and ___.", "blank": "redistribution", "opts": ["redistribution", "regulation", "restoration", "revolution"], "hint": "Pembagian kembali manfaat ekonomi" },
  { "sentence": "Work provides not just income but also a sense of ___ and identity.", "blank": "purpose", "opts": ["purpose", "profit", "product", "process"], "hint": "Rasa makna dan tujuan hidup" },
  { "sentence": "Dr. Walsh advocates large-scale investment in ___ transition jobs.", "blank": "green", "opts": ["green", "grey", "gross", "great"], "hint": "Pekerjaan yang ramah lingkungan" }
];

const QUIZ: QuizItem[] = [
  { "q": "What is the main topic of this radio programme?", "opts": ["How automation and digitalisation are reshaping work", "The growth of the global gig economy", "The history of the Industrial Revolution", "Why remote work is declining"], "ans": "How automation and digitalisation are reshaping work", "exp": "The host says they are 'examining... how automation and digitalisation are reshaping the very nature of work.'" },
  { "q": "Prof. Nakamura's key argument is that:", "opts": ["Gig work is the future of all employment", "Automation will destroy all jobs within a decade", "Technology always creates new jobs to replace lost ones, as in past revolutions", "Universal Basic Income is the only solution"], "ans": "Technology always creates new jobs to replace lost ones, as in past revolutions", "exp": "He argues: 'technological revolutions have always disrupted existing jobs while creating new ones' — and the digital revolution will follow the same pattern." },
  { "q": "What makes Dr. Walsh argue this wave of automation is 'qualitatively different'?", "opts": ["AI is beginning to encroach on cognitive, professional, and creative domains", "It automates only agricultural work", "It is happening in Asia not Europe", "It creates more jobs than it destroys"], "ans": "AI is beginning to encroach on cognitive, professional, and creative domains", "exp": "Dr. Walsh says AI is 'encroaching on cognitive, professional, and creative domains' — unlike past automation which targeted physical, repetitive tasks." },
  { "q": "According to McKinsey research cited in the programme, what percentage of current jobs face high automation risk?", "opts": ["10%", "5%", "25%", "15%"], "ans": "15%", "exp": "Prof. Nakamura says: 'Research from McKinsey suggests that around 15% of current jobs face high automation risk in the next decade.'" },
  { "q": "How many new roles does the World Economic Forum project will be created?", "opts": ["97 million", "127 million", "37 million", "57 million"], "ans": "97 million", "exp": "Prof. Nakamura cites: 'the World Economic Forum projects the creation of 97 million new roles.'" },
  { "q": "What is Dr. Walsh's central concern about new job creation?", "opts": ["New jobs will be concentrated in skilled cities, not accessible to displaced workers", "New jobs require moving abroad", "New jobs will be boring", "New jobs will not pay enough"], "ans": "New jobs will be concentrated in skilled cities, not accessible to displaced workers", "exp": "Dr. Walsh says new jobs 'are likely to be concentrated in highly skilled, high-capital cities' while 'displaced workers in manufacturing towns... don't automatically become data scientists.'" },
  { "q": "What does Dr. Walsh describe as the risk without retraining investment?", "opts": ["A two-tier economy with a skilled elite and large precarious working class", "Universal poverty for all workers", "A single global government", "Mass emigration from rich countries"], "ans": "A two-tier economy with a skilled elite and large precarious working class", "exp": "She warns about 'a two-tier economy: a small, highly skilled, highly paid elite, and a large, economically precarious working class dependent on gig work.'" },
  { "q": "Why does Prof. Nakamura support Universal Basic Income (UBI)?", "opts": ["Because he thinks all jobs will disappear", "Because it would eliminate the need for taxation", "As a permanent replacement for all social welfare", "As a transitional mechanism funded by productivity gains from automation"], "ans": "As a transitional mechanism funded by productivity gains from automation", "exp": "He says UBI works 'If productivity gains from automation are shared broadly — through taxation and redistribution.'" },
  { "q": "What does Dr. Walsh say about Universal Basic Income?", "opts": ["She is sympathetic in principle but concerned about implementation and the limits of income alone", "She advocates replacing UBI with higher minimum wages", "She strongly opposes it", "She supports it completely without reservation"], "ans": "She is sympathetic in principle but concerned about implementation and the limits of income alone", "exp": "Dr. Walsh says: 'I am sympathetic to UBI in principle, but concerned about implementation' — and notes UBI won't replace work's social functions." },
  { "q": "According to Dr. Walsh, work provides more than income. What else does it provide?", "opts": ["Access to healthcare and housing", "Political rights and citizenship", "A sense of purpose, community, and identity", "Physical exercise and social skills"], "ans": "A sense of purpose, community, and identity", "exp": "She says UBI alone won't replace 'the sense of purpose, community, and identity that employment provides.'" },
  { "q": "What three areas does Dr. Walsh advocate investing in for 'meaningful work'?", "opts": ["Public sector employment, care infrastructure, and green transition jobs", "Military, construction, and retail", "Manufacturing, mining, and agriculture", "Finance, technology, and entertainment"], "ans": "Public sector employment, care infrastructure, and green transition jobs", "exp": "She calls for 'large-scale investment in public sector employment, care infrastructure, and green transition jobs.'" },
  { "q": "The word 'precarious' (used by Dr. Walsh) most nearly means:", "opts": ["Uncertain, insecure, and potentially risky", "Rural and agricultural", "Highly paid and stable", "Skilled and technical"], "ans": "Uncertain, insecure, and potentially risky", "exp": "'Precarious' means unstable and insecure — Dr. Walsh uses it to describe gig workers' economic situation." },
  { "q": "Prof. Nakamura describes the Industrial Revolution as:", "opts": ["Evidence that technology always destroys jobs permanently", "The same challenge as AI automation today", "A complete failure that reduced prosperity", "Traumatic in the short term but ultimately driving prosperity and urbanisation"], "ans": "Traumatic in the short term but ultimately driving prosperity and urbanisation", "exp": "He says the Industrial Revolution 'was traumatic for many' but 'ultimately drove urbanisation, industrialisation, and an enormous expansion of human prosperity.'" },
  { "q": "The 'gig economy' refers to:", "opts": ["Traditional manufacturing jobs", "The music industry", "Short-term, contract-based work mediated through digital platforms", "Government employment programmes"], "ans": "Short-term, contract-based work mediated through digital platforms", "exp": "The gig economy involves workers taking on short-term, flexible jobs through platforms like Uber, Fiverr, or Deliveroo — without traditional employment security." },
  { "q": "What does 'reskilling' mean in this context?", "opts": ["Repairing broken technology", "Moving to a new city for work", "Training workers to develop new skills for different types of jobs", "Reducing the number of workers in an industry"], "ans": "Training workers to develop new skills for different types of jobs", "exp": "Reskilling means training workers who have lost jobs to automation to acquire new skills for different roles in the changing economy." },
  { "q": "Which of the following is NOT mentioned as a new job sector by Prof. Nakamura?", "opts": ["Care work", "Data analytics", "Green energy", "Traditional banking"], "ans": "Traditional banking", "exp": "Prof. Nakamura mentions 'green energy, data analytics, care work, and technology' — not traditional banking." },
  { "q": "The programme structure (two experts disagreeing) is best described as:", "opts": ["An entertainment interview with personal anecdotes", "A government announcement about policy", "A news report presenting one official view", "A debate format presenting opposing academic perspectives"], "ans": "A debate format presenting opposing academic perspectives", "exp": "The host explicitly introduces two economists who 'fundamentally disagree' — creating a structured academic debate format." },
  { "q": "Dr. Walsh says 'the evidence from pilot programmes is mixed' — this means:", "opts": ["UBI pilot programmes failed everywhere", "Results from UBI trials are inconsistent and not definitive", "UBI pilot programmes succeeded in every case", "Pilot programmes were never conducted"], "ans": "Results from UBI trials are inconsistent and not definitive", "exp": "'Mixed evidence' means results have been varied — some programmes showed positive outcomes, others did not — making conclusions difficult." },
  { "q": "What does Prof. Nakamura describe as 'the crucial question'?", "opts": ["The distribution of gains from automation", "Whether governments will regulate technology", "The speed at which AI improves", "Whether new jobs will be physical or digital"], "ans": "The distribution of gains from automation", "exp": "He says: 'The net effect may be positive, though the distribution of those gains is the crucial question.'" },
  { "q": "Which of the following best describes the overall tone of both economists?", "opts": ["Optimistic and uncritical about automation", "Dismissive of workers' concerns", "Analytically engaged — Nakamura more optimistic, Walsh more cautionary, but both evidence-based", "Purely theoretical with no policy relevance"], "ans": "Analytically engaged — Nakamura more optimistic, Walsh more cautionary, but both evidence-based", "exp": "Both economists engage with evidence (McKinsey, WEF, pilot programmes) and acknowledge real risks — differing in optimism, not in engagement with facts." }
];

const VOCAB = [
  { "en": "Automation displacement", "id": "Perpindahan akibat otomasi – kehilangan kerja karena mesin" },
  { "en": "Gig economy", "id": "Ekonomi gig – kerja kontrak jangka pendek" },
  { "en": "Universal Basic Income", "id": "UBI – pendapatan dasar universal tanpa syarat" },
  { "en": "Reskilling", "id": "Reskilling – pelatihan ulang kompetensi baru" },
  { "en": "Labour market", "id": "Pasar tenaga kerja – sistem penawaran dan permintaan kerja" },
  { "en": "Platform economy", "id": "Ekonomi platform – model bisnis berbasis platform digital" },
  { "en": "Remote work", "id": "Kerja jarak jauh – bekerja dari luar kantor secara digital" },
  { "en": "Portfolio career", "id": "Karier portofolio – gabungan beberapa pekerjaan atau proyek" }
];

export default function UpperInterListeningLesson4() {
  const navigate = useNavigate();
  const nextPath = '/modul/english/upper-intermediate/listening/lesson-5';
  const STORAGE_KEY = 'talky_upper_intermediate_listening_completed';

  const getCompleted = (): number[] => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
  };
  const markComplete = (n: number) => {
    const d = getCompleted();
    if (!d.includes(n)) localStorage.setItem(STORAGE_KEY, JSON.stringify([...d, n]));
  };

  const [isCompleted, setIsCompleted] = useState(() => getCompleted().includes(4));
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'simak' | 'latihan' | 'kuis'>('simak');

  const handleComplete = () => { markComplete(4); setIsCompleted(true); setShowModal(true); };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 animate-fade-in" style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }} onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-[2rem] p-8 max-w-sm w-full text-center shadow-2xl relative overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="absolute top-0 left-0 w-full h-32 rounded-t-[2rem] -z-10 bg-gradient-to-br from-sky-600 to-blue-500" />
            <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 bg-white shadow-xl border-4 border-white/80 mt-4"><span className="text-5xl">🎧</span></div>
            <h2 className="text-2xl font-extrabold text-slate-800 mb-2">Lesson Selesai! 🎉</h2>
            <p className="text-slate-500 mb-8 leading-relaxed">Selamat! Anda berhasil memahami materi B2 tentang: <strong>Radio Programme: The Future of Work in a Digital Economy</strong>.</p>
            <div className="space-y-3">
              {nextPath && <button onClick={() => { setShowModal(false); navigate(nextPath); }} className="w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all active:scale-95" style={{ backgroundColor: '#059669' }}>Pelajari Materi Selanjutnya</button>}
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
              <h1 className="text-sm font-bold text-slate-800 line-clamp-1">Radio Programme: The Future of Work in a Digital Economy</h1>
              <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#059669' }}>Upper-Intermediate Listening • L4</p>
            </div>
            {nextPath && <button onClick={() => navigate(nextPath)} className="px-3 h-9 rounded-full text-xs font-bold transition-colors" style={{ color: '#059669', backgroundColor: '#05966918' }}>Next ›</button>}
            {!nextPath && <div className="w-14" />}
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
                  <h2 className="text-xl md:text-2xl font-extrabold mb-2 relative z-10">B2 Listening: Radio Programme: The Future of Work in a Digital Economy</h2>
                  <p className="text-sm md:text-base text-white/90 leading-relaxed max-w-lg relative z-10">Program Radio: Masa Depan Kerja di Era Ekonomi Digital</p>
                  <div className="mt-3 inline-block bg-white/20 px-3 py-1 rounded-full text-xs font-bold">🎧 CEFR B2 · Upper-Intermediate Listening</div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full rounded-l-3xl" style={{ backgroundColor: '#059669' }} />
                  <p className="text-xs font-extrabold uppercase tracking-widest mb-4" style={{ color: '#059669' }}>📖 KOSAKATA B2 KUNCI</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {VOCAB.map((v: { en: string; id: string }) => (
                      <div key={v.en} className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 flex items-center justify-between hover:bg-slate-100 transition-colors">
                        <span className="text-sm font-bold text-slate-800">{v.en}</span>
                        <span className="text-xs font-medium text-right max-w-[60%] leading-tight" style={{ color: '#059669' }}>{v.id}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                  <DialoguePlayer title="Radio Programme: The Future of Work in a Digital Economy" lines={DIALOGUE} />
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                  <p className="text-sm font-bold text-amber-800 mb-1">💡 Tips Listening B2</p>
                  <ul className="text-sm text-amber-700 space-y-1">
                    <li>• Fokus pada <strong>argumen utama</strong>, bukan setiap kata</li>
                    <li>• Perhatikan <strong>signal words</strong>: however, therefore, despite, in contrast</li>
                    <li>• Catat <strong>data dan angka kunci</strong> yang disebutkan pembicara</li>
                    <li>• Identifikasi <strong>perspektif berbeda</strong> dari setiap pembicara</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'latihan' && (
              <div className="animate-fade-in">
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 mb-6">
                  <h3 className="text-lg font-bold text-slate-800 mb-2">Isi Rumpang (Fill in the Blank)</h3>
                  <p className="text-sm text-slate-500">Gunakan konteks dari dialog di atas untuk memilih kata yang tepat. Topik: Ekonomi Digital & Ketenagakerjaan</p>
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
            style={{ background: isCompleted ? 'linear-gradient(135deg,#10B981,#059669)' : 'linear-gradient(135deg,#059669,#059669CC)' }}>
            <CheckCircle2 className="w-5 h-5" />
            {isCompleted ? 'Sudah Selesai ✓ (Kembali)' : 'Tandai Selesai ✓'}
          </button>
        </div>
      </div>
    </>
  );
}
