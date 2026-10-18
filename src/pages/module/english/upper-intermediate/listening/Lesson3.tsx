import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine, DialoguePlayer, FillBlankExercise } from './listeningUtils';
import type { QuizItem, DialogueLine, BlankItem } from './listeningUtils';
import { Headphones, PenTool, CheckCircle2, ChevronLeft } from 'lucide-react';

const DIALOGUE: DialogueLine[] = [
  { "speaker": "Narrator", "avatar": "🎬", "text": "In laboratories across the world, engineers are building systems that learn, predict, and in some cases, make life-altering decisions. Artificial intelligence is no longer science fiction — it is diagnosing cancer, approving loans, filtering job applications, and determining prison sentences. But who is accountable when these systems go wrong?", "translation": "Di laboratorium di seluruh dunia, para insinyur membangun sistem yang belajar, memprediksi, dan dalam beberapa kasus, membuat keputusan yang mengubah hidup. Kecerdasan buatan bukan lagi fiksi ilmiah — ia mendiagnosis kanker, menyetujui pinjaman, menyaring lamaran kerja, dan menentukan hukuman penjara. Namun siapa yang bertanggung jawab ketika sistem ini berjalan salah?" },
  { "speaker": "Prof. Chen", "avatar": "👩‍🔬", "text": "The core problem is what we call algorithmic bias. AI systems learn from historical data — and if that data reflects past discrimination, the AI will perpetuate and even amplify that discrimination. A hiring algorithm trained on decades of who was hired will likely favour male candidates, because historically more men were hired. It is encoding the past into the future.", "translation": "Masalah inti adalah apa yang kita sebut bias algoritmik. Sistem AI belajar dari data historis — dan jika data tersebut mencerminkan diskriminasi masa lalu, AI akan meneruskan dan bahkan memperkuat diskriminasi itu. Algoritma perekrutan yang dilatih pada data siapa yang dipekerjakan selama beberapa dekade kemungkinan besar akan lebih mengutamakan kandidat pria, karena secara historis lebih banyak pria yang dipekerjakan. Ini mengkodekan masa lalu ke dalam masa depan." },
  { "speaker": "Narrator", "avatar": "🎬", "text": "In 2018, Amazon scrapped an AI recruiting tool precisely because it had learned to downgrade applications from women. The system had been trained on CVs submitted over a ten-year period — during which male applicants were dominant. Amazon's engineers could not make the system gender-neutral. They shut it down.", "translation": "Pada tahun 2018, Amazon membuang alat perekrutan AI justru karena telah belajar menurunkan peringkat lamaran dari perempuan. Sistem ini telah dilatih pada CV yang diajukan selama periode sepuluh tahun — di mana pelamar pria mendominasi. Para insinyur Amazon tidak dapat membuat sistem itu netral gender. Mereka menutupnya." },
  { "speaker": "Dr. Martinez", "avatar": "👨‍💻", "text": "But the Amazon case is visible. The more dangerous problem is the invisible bias — in predictive policing, in criminal sentencing, in medical diagnosis. COMPAS, the risk assessment tool used in US courts, was found by ProPublica journalists to be nearly twice as likely to falsely flag Black defendants as high-risk compared to white defendants. That is not a software glitch — that is a systemic problem encoded in data.", "translation": "Tapi kasus Amazon terlihat. Masalah yang lebih berbahaya adalah bias yang tidak terlihat — dalam polisi prediktif, dalam hukuman pidana, dalam diagnosis medis. COMPAS, alat penilaian risiko yang digunakan di pengadilan AS, ditemukan oleh jurnalis ProPublica hampir dua kali lebih mungkin untuk secara keliru menandai terdakwa kulit hitam sebagai berisiko tinggi dibandingkan terdakwa kulit putih. Itu bukan gangguan perangkat lunak — itu adalah masalah sistemik yang dikodekan dalam data." },
  { "speaker": "Prof. Chen", "avatar": "👩‍🔬", "text": "And the opacity of these systems compounds the problem. Many AI tools operate as black boxes — even their creators cannot fully explain how they arrive at a decision. This is fundamentally incompatible with the principles of fairness, due process, and accountability that underpin democratic legal systems.", "translation": "Dan ketidaktransparanan sistem ini memperburuk masalah. Banyak alat AI beroperasi sebagai kotak hitam — bahkan pencipta mereka tidak sepenuhnya dapat menjelaskan bagaimana mereka sampai pada keputusan. Ini secara fundamental tidak sesuai dengan prinsip-prinsip keadilan, proses hukum yang semestinya, dan akuntabilitas yang menopang sistem hukum demokratis." },
  { "speaker": "Narrator", "avatar": "🎬", "text": "The European Union's AI Act, adopted in 2024, represents the world's most comprehensive attempt to regulate artificial intelligence. It establishes a risk-based framework: AI systems used in critical applications like credit decisions, employment, and law enforcement face the strictest requirements for transparency and human oversight.", "translation": "Undang-Undang AI Uni Eropa, yang diadopsi pada tahun 2024, mewakili upaya paling komprehensif di dunia untuk mengatur kecerdasan buatan. Ini menetapkan kerangka berbasis risiko: sistem AI yang digunakan dalam aplikasi kritis seperti keputusan kredit, ketenagakerjaan, dan penegakan hukum menghadapi persyaratan paling ketat untuk transparansi dan pengawasan manusia." },
  { "speaker": "Dr. Martinez", "avatar": "👨‍💻", "text": "Regulation is necessary but not sufficient. We need technical solutions alongside legal ones. Explainable AI — systems that can articulate the reasoning behind their decisions in human-understandable terms — is a growing field of research. And diverse development teams are crucial: an AI built by a team that reflects the diversity of the society it serves is less likely to encode the biases of any single perspective.", "translation": "Regulasi diperlukan tetapi tidak cukup. Kita membutuhkan solusi teknis di samping solusi hukum. AI yang dapat dijelaskan — sistem yang dapat mengartikulasikan alasan di balik keputusan mereka dalam istilah yang dapat dipahami manusia — adalah bidang penelitian yang berkembang. Dan tim pengembangan yang beragam sangat penting: AI yang dibangun oleh tim yang mencerminkan keragaman masyarakat yang dilayaninya kecil kemungkinannya untuk mengkodekan bias dari perspektif tunggal mana pun." }
];

const BLANKS: BlankItem[] = [
  { "sentence": "AI systems learn from historical data, which may reflect past ___.", "blank": "discrimination", "opts": ["discrimination", "development", "discovery", "distribution"], "hint": "Perlakuan tidak adil terhadap kelompok tertentu" },
  { "sentence": "Amazon shut down its recruiting AI because it downgraded applications from ___.", "blank": "women", "opts": ["women", "managers", "engineers", "seniors"], "hint": "Kelompok yang dirugikan oleh sistem AI" },
  { "sentence": "COMPAS was found to be nearly twice as likely to falsely flag ___ defendants.", "blank": "Black", "opts": ["Black", "elderly", "foreign", "young"], "hint": "Kelompok yang lebih sering ditandai secara keliru sebagai berisiko tinggi" },
  { "sentence": "Many AI tools operate as ___ boxes — even creators can't explain decisions.", "blank": "black", "opts": ["black", "open", "safe", "clear"], "hint": "Sistem yang prosesnya tidak dapat dilihat atau dipahami" },
  { "sentence": "The EU AI Act establishes a risk-___ framework for regulation.", "blank": "based", "opts": ["based", "free", "proof", "ready"], "hint": "Kerangka yang dibuat berdasarkan tingkat risiko" },
  { "sentence": "AI that explains its reasoning is called ___ AI.", "blank": "Explainable", "opts": ["Explainable", "Experimental", "Exclusive", "Emotional"], "hint": "AI yang dapat menjelaskan keputusannya" },
  { "sentence": "___ development teams are crucial to avoid encoding a single perspective.", "blank": "Diverse", "opts": ["Diverse", "Distant", "Digital", "Dedicated"], "hint": "Tim yang mencerminkan keragaman masyarakat" }
];

const QUIZ: QuizItem[] = [
  { "q": "What is algorithmic bias according to Prof. Chen?", "opts": ["When AI programs crash unexpectedly", "When developers intentionally programme prejudice", "When AI systems perpetuate discrimination patterns learned from historical data", "When AI makes random errors"], "ans": "When AI systems perpetuate discrimination patterns learned from historical data", "exp": "Prof. Chen explains that if training data reflects past discrimination, the AI will 'perpetuate and even amplify that discrimination.'" },
  { "q": "Why did Amazon shut down its AI recruiting tool?", "opts": ["It could not read PDF applications", "It had learned to downgrade applications from women", "It was too expensive to run", "It selected only senior candidates"], "ans": "It had learned to downgrade applications from women", "exp": "The narrator states Amazon 'scrapped an AI recruiting tool precisely because it had learned to downgrade applications from women.'" },
  { "q": "How long was Amazon's AI trained on CVs before the bias was discovered?", "opts": ["2 years", "5 years", "10 years", "20 years"], "ans": "10 years", "exp": "The system 'had been trained on CVs submitted over a ten-year period — during which male applicants were dominant.'" },
  { "q": "What did the ProPublica investigation find about COMPAS?", "opts": ["It was biased against elderly defendants", "It was used only in California courts", "It was nearly twice as likely to falsely flag Black defendants as high-risk", "It was highly accurate for all groups"], "ans": "It was nearly twice as likely to falsely flag Black defendants as high-risk", "exp": "Dr. Martinez states COMPAS 'was found by ProPublica journalists to be nearly twice as likely to falsely flag Black defendants as high-risk.'" },
  { "q": "What does 'black box' mean in the context of AI?", "opts": ["A system whose internal decision-making process cannot be explained or understood", "An AI that only works in dark environments", "An AI that stores data in encrypted files", "An outdated computer system"], "ans": "A system whose internal decision-making process cannot be explained or understood", "exp": "Prof. Chen says: 'Many AI tools operate as black boxes — even their creators cannot fully explain how they arrive at a decision.'" },
  { "q": "Which legislation is described as 'the world's most comprehensive attempt to regulate AI'?", "opts": ["The UN Resolution on AI", "The US AI Safety Act", "The UK AI Framework", "The European Union's AI Act"], "ans": "The European Union's AI Act", "exp": "The narrator describes 'The European Union's AI Act, adopted in 2024' as the most comprehensive regulatory attempt." },
  { "q": "When was the EU AI Act adopted?", "opts": ["2020", "2021", "2022", "2024"], "ans": "2024", "exp": "The narrator states: 'The European Union's AI Act, adopted in 2024.'" },
  { "q": "What type of AI framework does the EU AI Act use?", "opts": ["Cost-based", "Industry-based", "Geography-based", "Risk-based"], "ans": "Risk-based", "exp": "The narrator explains: 'It establishes a risk-based framework' — stricter rules for higher-risk AI applications." },
  { "q": "What is 'Explainable AI'?", "opts": ["AI that speaks in multiple languages", "AI systems that can articulate the reasoning behind their decisions in understandable terms", "AI that explains errors to users", "AI designed for teaching purposes"], "ans": "AI systems that can articulate the reasoning behind their decisions in understandable terms", "exp": "Dr. Martinez describes it as 'systems that can articulate the reasoning behind their decisions in human-understandable terms.'" },
  { "q": "Why does Dr. Martinez say regulation 'is necessary but not sufficient'?", "opts": ["Because regulation is too expensive", "Because laws are only effective in the EU", "Because AI companies ignore all regulations", "Because technical solutions are also needed alongside legal ones"], "ans": "Because technical solutions are also needed alongside legal ones", "exp": "He says: 'We need technical solutions alongside legal ones' — such as Explainable AI and diverse development teams." },
  { "q": "According to Prof. Chen, why is AI opacity incompatible with democratic legal systems?", "opts": ["Due process and accountability require understandable, explainable decisions", "Democracy requires everything to be public", "Democratic systems prefer slower decision-making", "AI should only be used in authoritarian countries"], "ans": "Due process and accountability require understandable, explainable decisions", "exp": "Prof. Chen says opacity is 'incompatible with the principles of fairness, due process, and accountability that underpin democratic legal systems.'" },
  { "q": "The documentary suggests AI is currently used in which real-world high-stakes decisions?", "opts": ["Traffic management and restaurant recommendations", "Electoral systems and currency exchange", "Cancer diagnosis, loan approvals, and prison sentences", "Weather forecasting and sports predictions"], "ans": "Cancer diagnosis, loan approvals, and prison sentences", "exp": "The narrator lists: 'diagnosing cancer, approving loans, filtering job applications, and determining prison sentences.'" },
  { "q": "What does Prof. Chen mean by 'encoding the past into the future'?", "opts": ["AI systems repeat and reinforce historical patterns of discrimination in future decisions", "Programming future AI using past AI systems", "Storing old AI data for future training", "Creating a historical archive of AI decisions"], "ans": "AI systems repeat and reinforce historical patterns of discrimination in future decisions", "exp": "She says a hiring AI will favour historical demographic patterns because it is 'encoding the past into the future.'" },
  { "q": "What is described as 'a systemic problem encoded in data'?", "opts": ["The Amazon CV sorting error", "The EU AI Act's framework", "AI software crashes", "The racial bias found in the COMPAS sentencing tool"], "ans": "The racial bias found in the COMPAS sentencing tool", "exp": "Dr. Martinez explicitly calls the COMPAS racial disparity 'not a software glitch — that is a systemic problem encoded in data.'" },
  { "q": "Why are diverse development teams important for reducing AI bias?", "opts": ["They make AI less likely to encode biases of any single perspective", "They work faster and produce more code", "They have better technical qualifications", "They are cheaper to hire than homogeneous teams"], "ans": "They make AI less likely to encode biases of any single perspective", "exp": "Dr. Martinez says diverse teams reflecting societal diversity are 'less likely to encode the biases of any single perspective.'" },
  { "q": "What does 'opacity' of AI systems mean in this documentary?", "opts": ["Lack of transparency about how AI makes decisions", "Systems that encrypt all their outputs", "AI systems that work only at night", "AI that refuses to process certain data"], "ans": "Lack of transparency about how AI makes decisions", "exp": "Opacity refers to the lack of transparency — when AI operates as a black box that no one can fully explain." },
  { "q": "COMPAS is described as a:", "opts": ["Risk assessment tool used in US courts", "Credit scoring algorithm", "Job recruitment algorithm", "Medical diagnosis system"], "ans": "Risk assessment tool used in US courts", "exp": "The narrator identifies COMPAS as 'the risk assessment tool used in US courts' for evaluating criminal defendants." },
  { "q": "According to the documentary, which critical AI applications require strictest transparency under the EU AI Act?", "opts": ["Entertainment and gaming", "Scientific research and weather forecasting", "Social media and content recommendation", "Credit decisions, employment, and law enforcement"], "ans": "Credit decisions, employment, and law enforcement", "exp": "The narrator says the EU AI Act requires strictest requirements for 'credit decisions, employment, and law enforcement.'" },
  { "q": "The documentary's overall message is best summarised as:", "opts": ["AI is too dangerous and should be banned immediately", "AI is perfectly fair if properly maintained", "AI presents significant ethical challenges that require both legal and technical solutions", "Only the EU has understood the dangers of AI"], "ans": "AI presents significant ethical challenges that require both legal and technical solutions", "exp": "The documentary explores bias, opacity, and systemic discrimination — concluding that both regulation and technical innovation (Explainable AI, diversity) are needed." },
  { "q": "What does 'accountability' mean in the context of this documentary?", "opts": ["Publishing AI source code openly", "Recording all AI decisions in a database", "Being responsible and answerable for decisions made by AI systems", "Hiring accountants to audit AI systems"], "ans": "Being responsible and answerable for decisions made by AI systems", "exp": "Accountability refers to the obligation to be answerable for decisions — including when those decisions are made by AI systems that affect people's lives." }
];

const VOCAB = [
  { "en": "Algorithmic bias", "id": "Bias algoritmik – ketidakadilan dalam sistem AI" },
  { "en": "Autonomous system", "id": "Sistem otonom – teknologi beroperasi tanpa manusia" },
  { "en": "Data privacy", "id": "Privasi data – hak perlindungan informasi pribadi" },
  { "en": "Machine learning", "id": "Pembelajaran mesin – AI yang belajar dari data" },
  { "en": "Transparency", "id": "Transparansi – keterbukaan sistem atau proses" },
  { "en": "Accountability", "id": "Akuntabilitas – tanggung jawab atas tindakan" },
  { "en": "Deep learning", "id": "Pembelajaran mendalam – AI menggunakan jaringan saraf kompleks" },
  { "en": "AI governance", "id": "Tata kelola AI – kerangka aturan dan pengawasan AI" }
];

export default function UpperInterListeningLesson3() {
  const navigate = useNavigate();
  const nextPath = '/modul/english/upper-intermediate/listening/lesson-4';
  const STORAGE_KEY = 'talky_upper_intermediate_listening_completed';

  const getCompleted = (): number[] => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
  };
  const markComplete = (n: number) => {
    const d = getCompleted();
    if (!d.includes(n)) localStorage.setItem(STORAGE_KEY, JSON.stringify([...d, n]));
  };

  const [isCompleted, setIsCompleted] = useState(() => getCompleted().includes(3));
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'simak' | 'latihan' | 'kuis'>('simak');

  const handleComplete = () => { markComplete(3); setIsCompleted(true); setShowModal(true); };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 animate-fade-in" style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }} onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-[2rem] p-8 max-w-sm w-full text-center shadow-2xl relative overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="absolute top-0 left-0 w-full h-32 rounded-t-[2rem] -z-10 bg-gradient-to-br from-sky-600 to-blue-500" />
            <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 bg-white shadow-xl border-4 border-white/80 mt-4"><span className="text-5xl">🎧</span></div>
            <h2 className="text-2xl font-extrabold text-slate-800 mb-2">Lesson Selesai! 🎉</h2>
            <p className="text-slate-500 mb-8 leading-relaxed">Selamat! Anda berhasil memahami materi B2 tentang: <strong>Documentary Narration: The Ethics of Artificial Intelligence</strong>.</p>
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
              <h1 className="text-sm font-bold text-slate-800 line-clamp-1">Documentary Narration: The Ethics of Artificial Intelligence</h1>
              <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#059669' }}>Upper-Intermediate Listening • L3</p>
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
                  <h2 className="text-xl md:text-2xl font-extrabold mb-2 relative z-10">B2 Listening: Documentary Narration: The Ethics of Artificial Intelligence</h2>
                  <p className="text-sm md:text-base text-white/90 leading-relaxed max-w-lg relative z-10">Narasi Dokumenter: Etika Kecerdasan Buatan</p>
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
                  <DialoguePlayer title="Documentary Narration: The Ethics of Artificial Intelligence" lines={DIALOGUE} />
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
                  <p className="text-sm text-slate-500">Gunakan konteks dari dialog di atas untuk memilih kata yang tepat. Topik: Etika AI & Masyarakat</p>
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
