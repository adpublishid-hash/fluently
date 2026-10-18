import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine, DialoguePlayer, FillBlankExercise } from './listeningUtils';
import type { QuizItem, DialogueLine, BlankItem } from './listeningUtils';
import { Headphones, PenTool, CheckCircle2, ChevronLeft } from 'lucide-react';

const DIALOGUE: DialogueLine[] = [
  { "speaker": "Moderator", "avatar": "🎙️", "text": "Welcome to this evening's panel. Tonight's discussion focuses on the escalating global refugee crisis. In 2023, the UNHCR reported that over 110 million people worldwide were forcibly displaced — the highest figure ever recorded. Let us begin with Dr. Osei: what are the primary drivers of this unprecedented displacement?", "translation": "Selamat datang di panel malam ini. Diskusi malam ini berfokus pada krisis pengungsi global yang semakin meningkat. Pada tahun 2023, UNHCR melaporkan bahwa lebih dari 110 juta orang di seluruh dunia mengalami perpindahan paksa — angka tertinggi yang pernah tercatat. Mari kita mulai dengan Dr. Osei: apa pendorong utama perpindahan yang belum pernah terjadi sebelumnya ini?" },
  { "speaker": "Dr. Osei", "avatar": "👨‍💼", "text": "Thank you. The drivers are multifaceted: armed conflict remains the primary cause, accounting for the majority of cases. But we are increasingly seeing climate-induced displacement as prolonged droughts, floods, and agricultural collapse make regions uninhabitable. And then there is economic desperation — though technically these individuals may not qualify as refugees under the 1951 Refugee Convention.", "translation": "Terima kasih. Pendorongnya multifaset: konflik bersenjata tetap menjadi penyebab utama, menyumbang sebagian besar kasus. Namun kita semakin banyak melihat perpindahan akibat iklim ketika kekeringan berkepanjangan, banjir, dan keruntuhan pertanian membuat wilayah tidak dapat dihuni. Dan kemudian ada keputusasaan ekonomi — meskipun secara teknis individu-individu ini mungkin tidak memenuhi syarat sebagai pengungsi berdasarkan Konvensi Pengungsi tahun 1951." },
  { "speaker": "Ms. Petrova", "avatar": "👩‍⚖️", "text": "That is a crucial legal distinction. The 1951 convention defines a refugee as someone with a well-founded fear of persecution on specific grounds: race, religion, nationality, political opinion, or membership of a particular social group. Climate migrants fall outside this legal definition — which creates a significant protection gap in international law.", "translation": "Itu adalah perbedaan hukum yang krusial. Konvensi 1951 mendefinisikan pengungsi sebagai seseorang yang memiliki ketakutan beralasan akan penganiayaan berdasarkan alasan tertentu: ras, agama, kebangsaan, pendapat politik, atau keanggotaan kelompok sosial tertentu. Migran iklim berada di luar definisi hukum ini — yang menciptakan kesenjangan perlindungan yang signifikan dalam hukum internasional." },
  { "speaker": "Mr. Lindqvist", "avatar": "🧑‍💼", "text": "And this gap has very real consequences. In Sweden, we have seen a sharp increase in applications from individuals fleeing drought-affected regions of sub-Saharan Africa. Without a legal basis for protection, many face deportation to conditions that are objectively life-threatening.", "translation": "Dan kesenjangan ini memiliki konsekuensi yang sangat nyata. Di Swedia, kami melihat peningkatan tajam dalam pengajuan dari individu-individu yang melarikan diri dari daerah yang terdampak kekeringan di Afrika Sub-Sahara. Tanpa dasar hukum untuk perlindungan, banyak yang menghadapi deportasi ke kondisi yang secara objektif mengancam jiwa." },
  { "speaker": "Dr. Osei", "avatar": "👨‍💼", "text": "The principle of non-refoulement is central here. Under international law, you cannot return someone to a place where they face serious risk of harm — regardless of whether they formally qualify as a refugee. But enforcement of this principle is inconsistent, and political pressures often override legal obligations.", "translation": "Prinsip non-refoulement sangat sentral di sini. Berdasarkan hukum internasional, Anda tidak dapat mengembalikan seseorang ke tempat di mana mereka menghadapi risiko serius atas bahaya — terlepas dari apakah mereka secara formal memenuhi syarat sebagai pengungsi. Namun penegakan prinsip ini tidak konsisten, dan tekanan politik sering kali mengalahkan kewajiban hukum." },
  { "speaker": "Ms. Petrova", "avatar": "👩‍⚖️", "text": "The question of burden-sharing is equally contentious. The global refugee population is disproportionately hosted by low-income nations in the global south, while wealthy nations with far greater capacity often admit far fewer. Turkey alone hosts nearly 3.5 million Syrian refugees. The wealthiest nations collectively could do far more than they currently do under the Global Compact on Refugees.", "translation": "Pertanyaan tentang pembagian beban sama-sama diperdebatkan. Populasi pengungsi global secara tidak proporsional ditampung oleh negara-negara berpenghasilan rendah di selatan global, sementara negara-negara kaya dengan kapasitas jauh lebih besar sering kali menerima jauh lebih sedikit. Turki saja menampung hampir 3,5 juta pengungsi Suriah. Negara-negara terkaya secara kolektif dapat melakukan jauh lebih banyak dari yang mereka lakukan saat ini di bawah Perjanjian Global tentang Pengungsi." },
  { "speaker": "Moderator", "avatar": "🎙️", "text": "So what practical mechanisms could strengthen the international response? Mr. Lindqvist?", "translation": "Jadi mekanisme praktis apa yang bisa memperkuat respon internasional? Bapak Lindqvist?" },
  { "speaker": "Mr. Lindqvist", "avatar": "🧑‍💼", "text": "Three things: mandatory burden-sharing quotas binding on wealthy nations, a revised legal framework that covers climate displacement, and far greater investment in addressing root causes — poverty, conflict, and environmental degradation. Treating symptoms without addressing causes is fundamentally unsustainable.", "translation": "Tiga hal: kuota pembagian beban yang mengikat bagi negara-negara kaya, kerangka hukum yang direvisi untuk mencakup perpindahan iklim, dan investasi yang jauh lebih besar dalam mengatasi akar penyebab — kemiskinan, konflik, dan degradasi lingkungan. Mengobati gejala tanpa mengatasi penyebab adalah hal yang secara fundamental tidak berkelanjutan." }
];

const BLANKS: BlankItem[] = [
  { "sentence": "Over 110 million people were forcibly ___ in 2023.", "blank": "displaced", "opts": ["displaced", "employed", "satisfied", "trained"], "hint": "Terpaksa berpindah dari tempat tinggal" },
  { "sentence": "Climate migrants fall outside the legal ___ of refugee.", "blank": "definition", "opts": ["definition", "direction", "detention", "decision"], "hint": "Pengertian hukum resmi" },
  { "sentence": "The principle of non-___ prohibits returning someone to danger.", "blank": "refoulement", "opts": ["refoulement", "refusal", "registration", "reform"], "hint": "Larangan pemulangan ke tempat berbahaya" },
  { "sentence": "Turkey alone hosts nearly 3.5 million Syrian ___.", "blank": "refugees", "opts": ["refugees", "reporters", "residents", "relatives"], "hint": "Orang yang mencari perlindungan internasional" },
  { "sentence": "The refugee population is disproportionately hosted by ___ nations.", "blank": "low-income", "opts": ["low-income", "high-income", "oil-rich", "island"], "hint": "Negara-negara dengan pendapatan rendah" },
  { "sentence": "Mandatory burden-sharing ___ would bind wealthy nations.", "blank": "quotas", "opts": ["quotas", "questions", "requests", "quantities"], "hint": "Target jumlah yang ditetapkan secara resmi" },
  { "sentence": "The 1951 Refugee ___ defines who qualifies for protection.", "blank": "Convention", "opts": ["Convention", "Constitution", "Conversion", "Consolidation"], "hint": "Perjanjian hukum internasional" }
];

const QUIZ: QuizItem[] = [
  { "q": "How many people were forcibly displaced worldwide in 2023 according to UNHCR?", "opts": ["110 million", "150 million", "50 million", "75 million"], "ans": "110 million", "exp": "The moderator states: 'the UNHCR reported that over 110 million people worldwide were forcibly displaced.'" },
  { "q": "According to Dr. Osei, what is the PRIMARY driver of displacement?", "opts": ["Climate change", "Political elections", "Armed conflict", "Economic desperation"], "ans": "Armed conflict", "exp": "Dr. Osei says: 'armed conflict remains the primary cause, accounting for the majority of cases.'" },
  { "q": "Under the 1951 Refugee Convention, which of the following is NOT listed as grounds for refugee status?", "opts": ["Economic hardship", "Religion", "Political opinion", "Race"], "ans": "Economic hardship", "exp": "The 1951 Convention covers race, religion, nationality, political opinion, and social group — not economic hardship." },
  { "q": "Why do climate migrants fall outside the legal definition of refugee?", "opts": ["They are too numerous", "They are not in danger", "The UN rejected their claims", "The 1951 Convention does not cover climate displacement"], "ans": "The 1951 Convention does not cover climate displacement", "exp": "Ms. Petrova explains that climate migrants fall outside the legal definition — creating a 'protection gap in international law.'" },
  { "q": "What is the principle of 'non-refoulement'?", "opts": ["The right to apply for asylum", "The obligation to share refugees equally", "The right to permanent residency", "The prohibition on returning someone to a place where they face serious harm"], "ans": "The prohibition on returning someone to a place where they face serious harm", "exp": "Dr. Osei states: 'Under international law, you cannot return someone to a place where they face serious risk of harm.'" },
  { "q": "According to Ms. Petrova, how is the global refugee population distributed?", "opts": ["Disproportionately hosted by wealthy Western nations", "Disproportionately hosted by low-income nations in the global south", "Mainly hosted by island nations", "Equally among all nations"], "ans": "Disproportionately hosted by low-income nations in the global south", "exp": "She says: 'the global refugee population is disproportionately hosted by low-income nations in the global south.'" },
  { "q": "Approximately how many Syrian refugees does Turkey host?", "opts": ["3.5 million", "5 million", "2 million", "1 million"], "ans": "3.5 million", "exp": "Ms. Petrova states: 'Turkey alone hosts nearly 3.5 million Syrian refugees.'" },
  { "q": "What three practical mechanisms does Mr. Lindqvist propose?", "opts": ["Mandatory quotas, revised legal framework, investment in root causes", "Bilateral treaties, financial aid, military intervention", "Better border controls, improved camps, stricter laws", "Regional agreements, naval patrols, refugee processing centres"], "ans": "Mandatory quotas, revised legal framework, investment in root causes", "exp": "Lindqvist proposes: 'mandatory burden-sharing quotas, a revised legal framework, and greater investment in addressing root causes.'" },
  { "q": "What does Dr. Osei mean by 'protection gap in international law'?", "opts": ["Wealthy nations ignore all laws", "Not enough lawyers work on refugee cases", "Some groups in danger are not legally protected because they don't fit the refugee definition", "International courts are too slow"], "ans": "Some groups in danger are not legally protected because they don't fit the refugee definition", "exp": "Climate migrants face life-threatening situations but lack legal protection because they fall outside the 1951 Convention's definition." },
  { "q": "What document does Ms. Petrova reference as the framework for burden-sharing?", "opts": ["The Paris Agreement", "The Universal Declaration of Human Rights", "The Geneva Convention", "The Global Compact on Refugees"], "ans": "The Global Compact on Refugees", "exp": "She says wealthy nations 'could do far more than they currently do under the Global Compact on Refugees.'" },
  { "q": "Mr. Lindqvist says treating symptoms without addressing causes is...", "opts": ["Effective short-term", "The best available option", "Economically efficient", "Fundamentally unsustainable"], "ans": "Fundamentally unsustainable", "exp": "He states: 'Treating symptoms without addressing causes is fundamentally unsustainable.'" },
  { "q": "The word 'multifaceted' (used by Dr. Osei) most nearly means:", "opts": ["Completely solved", "Having many different aspects or dimensions", "Simple and straightforward", "Related to economics only"], "ans": "Having many different aspects or dimensions", "exp": "'Multifaceted' describes something with many complex dimensions or aspects — here describing the multiple drivers of displacement." },
  { "q": "Enforcement of non-refoulement is described as:", "opts": ["Inconsistent, often overridden by political pressures", "Irrelevant in modern international law", "Universally respected by all nations", "Always strictly applied"], "ans": "Inconsistent, often overridden by political pressures", "exp": "Dr. Osei states: 'But enforcement of this principle is inconsistent, and political pressures often override legal obligations.'" },
  { "q": "What was Sweden experiencing according to Mr. Lindqvist?", "opts": ["A legal reform reducing refugee rights", "A new border agreement with neighbouring nations", "A decrease in refugee applications", "A sharp increase in applications from drought-affected regions"], "ans": "A sharp increase in applications from drought-affected regions", "exp": "Lindqvist says: 'In Sweden, we have seen a sharp increase in applications from individuals fleeing drought-affected regions of sub-Saharan Africa.'" },
  { "q": "The word 'asylum seeker' refers to:", "opts": ["An economic migrant", "A stateless person", "Someone who has been granted refugee status", "Someone who has not yet had their claim for protection decided"], "ans": "Someone who has not yet had their claim for protection decided", "exp": "An asylum seeker is someone who has applied for refugee protection but whose claim is still being processed." },
  { "q": "What are the three 'root causes' that Mr. Lindqvist says must be addressed?", "opts": ["Terrorism, disease, and famine", "Poverty, conflict, and environmental degradation", "Corruption, war, and political instability", "Climate change, inequality, and poor governance"], "ans": "Poverty, conflict, and environmental degradation", "exp": "Lindqvist names: 'poverty, conflict, and environmental degradation' as root causes requiring greater investment." },
  { "q": "According to the panel, which type of migrant currently lacks international legal protection?", "opts": ["Climate migrants", "Political dissidents", "War refugees", "Stateless people"], "ans": "Climate migrants", "exp": "Ms. Petrova explains the 'protection gap' — climate migrants don't qualify under the 1951 Convention's definition." },
  { "q": "What best describes the tone of this panel discussion?", "opts": ["Casual and personal", "Humorous and light-hearted", "Formal, analytical, and policy-focused", "Emotional and one-sided"], "ans": "Formal, analytical, and policy-focused", "exp": "The panel maintains a formal, evidence-based discussion of legal and policy dimensions of the refugee crisis." },
  { "q": "The term 'burden-sharing' in this context means:", "opts": ["Distributing responsibility for hosting refugees among nations", "Sharing the financial burden of conflicts that create refugees", "Dividing administrative workload in UNHCR offices", "Sharing physical burdens in refugee camps"], "ans": "Distributing responsibility for hosting refugees among nations", "exp": "'Burden-sharing' refers to equitable distribution of the responsibility for hosting and protecting refugees across nations." },
  { "q": "What does the panel suggest about the relationship between wealth and refugee hosting?", "opts": ["Wealthier nations have greater capacity but often admit fewer refugees", "Poorer nations refuse to host refugees", "There is no relationship between wealth and refugee hosting", "Wealthier nations host proportionally more refugees"], "ans": "Wealthier nations have greater capacity but often admit fewer refugees", "exp": "Ms. Petrova highlights the disparity: wealthy nations 'could do far more' but often admit fewer than poorer nations that host millions." }
];

const VOCAB = [
  { "en": "Asylum seeker", "id": "Pencari suaka – seseorang yang meminta perlindungan" },
  { "en": "Non-refoulement", "id": "Non-pengusiran – larangan mengembalikan pengungsi ke bahaya" },
  { "en": "Host nation", "id": "Negara penerima – negara yang menerima pengungsi" },
  { "en": "Stateless", "id": "Tanpa kewarganegaraan – tidak diakui negara manapun" },
  { "en": "Displacement", "id": "Pengungsian – terpaksa meninggalkan tempat tinggal" },
  { "en": "Humanitarian corridor", "id": "Koridor kemanusiaan – jalur aman untuk pengungsi" },
  { "en": "Burden-sharing", "id": "Pembagian beban – tanggung jawab bersama antar negara" },
  { "en": "Resettlement", "id": "Pemukiman kembali – pemindahan ke negara ketiga yang aman" }
];

export default function UpperInterListeningLesson2() {
  const navigate = useNavigate();
  const nextPath = '/modul/english/upper-intermediate/listening/lesson-3';
  const STORAGE_KEY = 'talky_upper_intermediate_listening_completed';

  const getCompleted = (): number[] => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
  };
  const markComplete = (n: number) => {
    const d = getCompleted();
    if (!d.includes(n)) localStorage.setItem(STORAGE_KEY, JSON.stringify([...d, n]));
  };

  const [isCompleted, setIsCompleted] = useState(() => getCompleted().includes(2));
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'simak' | 'latihan' | 'kuis'>('simak');

  const handleComplete = () => { markComplete(2); setIsCompleted(true); setShowModal(true); };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 animate-fade-in" style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }} onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-[2rem] p-8 max-w-sm w-full text-center shadow-2xl relative overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="absolute top-0 left-0 w-full h-32 rounded-t-[2rem] -z-10 bg-gradient-to-br from-sky-600 to-blue-500" />
            <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 bg-white shadow-xl border-4 border-white/80 mt-4"><span className="text-5xl">🎧</span></div>
            <h2 className="text-2xl font-extrabold text-slate-800 mb-2">Lesson Selesai! 🎉</h2>
            <p className="text-slate-500 mb-8 leading-relaxed">Selamat! Anda berhasil memahami materi B2 tentang: <strong>Panel Discussion: The Global Refugee Crisis</strong>.</p>
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
              <h1 className="text-sm font-bold text-slate-800 line-clamp-1">Panel Discussion: The Global Refugee Crisis</h1>
              <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#059669' }}>Upper-Intermediate Listening • L2</p>
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
                  <h2 className="text-xl md:text-2xl font-extrabold mb-2 relative z-10">B2 Listening: Panel Discussion: The Global Refugee Crisis</h2>
                  <p className="text-sm md:text-base text-white/90 leading-relaxed max-w-lg relative z-10">Krisis Pengungsi Global – Hukum dan Kemanusiaan</p>
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
                  <DialoguePlayer title="Panel Discussion: The Global Refugee Crisis" lines={DIALOGUE} />
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
                  <p className="text-sm text-slate-500">Gunakan konteks dari dialog di atas untuk memilih kata yang tepat. Topik: Pengungsi & Hukum Internasional</p>
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
