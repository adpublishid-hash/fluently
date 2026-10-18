import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine, DialoguePlayer, FillBlankExercise } from './listeningUtils';
import type { QuizItem, DialogueLine, BlankItem } from './listeningUtils';
import { Headphones, PenTool, CheckCircle2, ChevronLeft } from 'lucide-react';

const DIALOGUE: DialogueLine[] = [
  { "speaker": "Journalist", "avatar": "🎙️", "text": "Dr. Simmons, you've spent fifteen years researching mental health in corporate environments. How significant is the mental health crisis in today's workplaces?", "translation": "Dr. Simmons, Anda telah menghabiskan lima belas tahun meneliti kesehatan mental di lingkungan perusahaan. Seberapa signifikan krisis kesehatan mental di tempat kerja saat ini?" },
  { "speaker": "Dr. Simmons", "avatar": "👩‍⚕️", "text": "The numbers are stark. The World Health Organisation estimates that depression and anxiety cost the global economy approximately one trillion dollars per year in lost productivity. In any given year, one in four adults will experience a mental health condition. Yet many employees are reluctant to disclose this to their employers for fear of discrimination, lost opportunities, or outright dismissal.", "translation": "Angkanya mengejutkan. Organisasi Kesehatan Dunia memperkirakan bahwa depresi dan kecemasan merugikan ekonomi global sekitar satu triliun dolar per tahun dalam produktivitas yang hilang. Dalam satu tahun tertentu, satu dari empat orang dewasa akan mengalami kondisi kesehatan mental. Namun banyak karyawan enggan mengungkapkan hal ini kepada pemberi kerja mereka karena takut diskriminasi, kehilangan peluang, atau pemecatan." },
  { "speaker": "Journalist", "avatar": "🎙️", "text": "What drives this reluctance to speak openly about mental health at work?", "translation": "Apa yang mendorong keengganan untuk berbicara terbuka tentang kesehatan mental di tempat kerja?" },
  { "speaker": "Dr. Simmons", "avatar": "👩‍⚕️", "text": "Primarily stigma — the belief that mental illness indicates weakness or incompetence. This is particularly acute in high-performance cultures where emotional vulnerability is perceived as a professional liability. Male employees are especially reluctant to seek help, which accounts for the disproportionately high rates of suicide among working-age men. The solution begins with leadership: when senior executives openly discuss their own mental health challenges, it fundamentally reshapes organisational culture.", "translation": "Terutama stigma — keyakinan bahwa penyakit mental menunjukkan kelemahan atau ketidakmampuan. Ini sangat akut dalam budaya berperforma tinggi di mana kerentanan emosional dianggap sebagai kewajiban profesional. Karyawan pria sangat enggan mencari bantuan, yang menyebabkan tingkat bunuh diri yang tidak proporsional tinggi di antara pria usia kerja. Solusinya dimulai dari kepemimpinan: ketika eksekutif senior secara terbuka membahas tantangan kesehatan mental mereka sendiri, itu secara fundamental membentuk ulang budaya organisasi." },
  { "speaker": "Journalist", "avatar": "🎙️", "text": "You've written about 'presenteeism' — can you explain that concept?", "translation": "Anda telah menulis tentang 'presenteeisme' — bisakah Anda menjelaskan konsep itu?" },
  { "speaker": "Dr. Simmons", "avatar": "👩‍⚕️", "text": "Presenteeism is working while unwell — being physically present but mentally absent, unable to perform effectively. Research suggests presenteeism costs UK employers more than absenteeism. An employee struggling with depression who forces themselves to attend work may complete tasks slowly, make errors, and affect team morale — often for months before taking sick leave. It is a hidden cost that most organisations fail to measure.", "translation": "Presenteeisme adalah bekerja saat sakit — hadir secara fisik tetapi absen secara mental, tidak mampu bekerja secara efektif. Penelitian menunjukkan bahwa presenteeisme merugikan pengusaha Inggris lebih dari absenteeisme. Seorang karyawan yang berjuang dengan depresi yang memaksakan diri untuk hadir dalam bekerja mungkin menyelesaikan tugas dengan lambat, membuat kesalahan, dan mempengaruhi semangat tim — sering selama berbulan-bulan sebelum mengambil cuti sakit. Ini adalah biaya tersembunyi yang gagal diukur oleh kebanyakan organisasi." },
  { "speaker": "Journalist", "avatar": "🎙️", "text": "What structural changes should organisations make?", "translation": "Perubahan struktural apa yang harus dilakukan organisasi?" },
  { "speaker": "Dr. Simmons", "avatar": "👩‍⚕️", "text": "Several interconnected changes. First, mandatory mental health first aid training for all managers — just as physical first aid is standard, mental health first aid should be too. Second, confidential Employee Assistance Programmes with real access to therapy, not just a helpline. Third, redesigning workloads and measuring psychological safety alongside financial metrics. And fundamentally, a shift from 'wellness washing' — superficial yoga classes and mindfulness apps — to genuinely addressing systemic causes of workplace stress.", "translation": "Beberapa perubahan yang saling terhubung. Pertama, pelatihan pertolongan pertama kesehatan mental wajib untuk semua manajer — sama seperti pertolongan pertama fisik adalah standar, pertolongan pertama kesehatan mental seharusnya juga begitu. Kedua, Program Bantuan Karyawan yang rahasia dengan akses nyata ke terapi, bukan hanya hotline. Ketiga, merancang ulang beban kerja dan mengukur keamanan psikologis bersama metrik keuangan. Dan secara fundamental, beralih dari 'wellness washing' — kelas yoga superfisial dan aplikasi mindfulness — untuk benar-benar mengatasi penyebab sistemik stres di tempat kerja." }
];

const BLANKS: BlankItem[] = [
  { "sentence": "Depression and anxiety cost the global economy 1 ___ dollars per year.", "blank": "trillion", "opts": ["trillion", "billion", "million", "thousand"], "hint": "Jumlah sangat besar – 1,000 miliar" },
  { "sentence": "One in ___ adults will experience a mental health condition per year.", "blank": "four", "opts": ["four", "ten", "twenty", "fifty"], "hint": "Fraksi populasi – 25%" },
  { "sentence": "Working while mentally unwell but physically present is called ___.", "blank": "presenteeism", "opts": ["presenteeism", "absenteeism", "activism", "progressivism"], "hint": "Hadir fisik tapi tidak produktif" },
  { "sentence": "Psychological ___ means feeling safe to share without fear of judgment.", "blank": "safety", "opts": ["safety", "salary", "sanity", "saturation"], "hint": "Rasa aman untuk berbuka pikiran" },
  { "sentence": "The solution begins with ___ — when executives share their own struggles.", "blank": "leadership", "opts": ["leadership", "legislation", "litigation", "liberation"], "hint": "Pemimpin organisasi yang menjadi teladan" },
  { "sentence": "'Wellness washing' refers to ___ wellness programmes that don't address root causes.", "blank": "superficial", "opts": ["superficial", "substantial", "successful", "supportive"], "hint": "Dangkal / tidak mendalam" },
  { "sentence": "Mental health ___ aid training should be mandatory for all managers.", "blank": "first", "opts": ["first", "last", "online", "advanced"], "hint": "Pertolongan pertama – bantuan awal" }
];

const QUIZ: QuizItem[] = [
  { "q": "How much do depression and anxiety cost the global economy per year?", "opts": ["$100 billion", "$1 trillion", "$5 trillion", "$500 billion"], "ans": "$1 trillion", "exp": "Dr. Simmons states: 'The WHO estimates depression and anxiety cost the global economy approximately one trillion dollars per year in lost productivity.'" },
  { "q": "What proportion of adults experience a mental health condition in any given year?", "opts": ["1 in 10", "1 in 2", "1 in 4", "1 in 20"], "ans": "1 in 4", "exp": "Dr. Simmons says: 'In any given year, one in four adults will experience a mental health condition.'" },
  { "q": "Why are employees reluctant to disclose mental health issues to employers?", "opts": ["They prefer to handle it alone", "Company policies prohibit disclosure", "Fear of discrimination, lost opportunities, or dismissal", "Mental health is seen as a personal matter only"], "ans": "Fear of discrimination, lost opportunities, or dismissal", "exp": "The doctor says employees fear 'discrimination, lost opportunities, or outright dismissal.'" },
  { "q": "Which group is described as especially reluctant to seek help?", "opts": ["Male employees", "Part-time workers", "Young professionals", "Female executives"], "ans": "Male employees", "exp": "Dr. Simmons says: 'Male employees are especially reluctant to seek help, which accounts for the disproportionately high rates of suicide among working-age men.'" },
  { "q": "What is described as the starting point for organisational culture change?", "opts": ["Introducing yoga classes", "Senior executives openly discussing their own mental health challenges", "Providing free therapy apps", "Implementing strict sick leave policies"], "ans": "Senior executives openly discussing their own mental health challenges", "exp": "'When senior executives openly discuss their own mental health challenges, it fundamentally reshapes organisational culture.'" },
  { "q": "What is 'presenteeism'?", "opts": ["Arriving at work earlier than required", "Working while unwell — physically present but mentally absent", "Being absent from work due to illness", "Presenting financial reports at meetings"], "ans": "Working while unwell — physically present but mentally absent", "exp": "Dr. Simmons defines it as 'working while unwell — being physically present but mentally absent, unable to perform effectively.'" },
  { "q": "Research suggests presenteeism costs UK employers compared to absenteeism:", "opts": ["More than absenteeism", "Twice as much as absenteeism", "About the same", "Much less"], "ans": "More than absenteeism", "exp": "She says: 'Research suggests presenteeism costs UK employers more than absenteeism.'" },
  { "q": "What is 'wellness washing'?", "opts": ["Using mindfulness to cure serious mental illness", "A legal requirement for workplace wellness programmes", "A deep organisational culture change", "Superficial wellness programmes that don't address root causes of stress"], "ans": "Superficial wellness programmes that don't address root causes of stress", "exp": "Dr. Simmons criticises 'wellness washing — superficial yoga classes and mindfulness apps' that fail to address systemic causes." },
  { "q": "What three structural changes does Dr. Simmons recommend?", "opts": ["More vacation days, better pay, and remote work options", "Mindfulness workshops, life coaches, and meditation rooms", "Mental health first aid training, EAPs with real therapy access, and redesigning workloads", "Free gym memberships, meal subsidies, and flexible hours"], "ans": "Mental health first aid training, EAPs with real therapy access, and redesigning workloads", "exp": "She recommends: 'mandatory mental health first aid training... confidential EAPs with real access to therapy... redesigning workloads and measuring psychological safety.'" },
  { "q": "What does 'psychological safety' mean in a workplace context?", "opts": ["Having secure access to company data", "Emotional support from colleagues during personal crises", "Physical security at the office", "Feeling safe to share ideas, concerns, or problems without fear of judgment or punishment"], "ans": "Feeling safe to share ideas, concerns, or problems without fear of judgment or punishment", "exp": "Psychological safety means employees feel safe to be vulnerable, speak up, and share concerns without fearing negative consequences." },
  { "q": "What is an 'Employee Assistance Programme' (EAP)?", "opts": ["A performance management system", "An employee share ownership scheme", "A company benefit card for gym access", "A confidential programme providing professional support (including therapy) for employees"], "ans": "A confidential programme providing professional support (including therapy) for employees", "exp": "Dr. Simmons describes EAPs as 'confidential Employee Assistance Programmes with real access to therapy, not just a helpline.'" },
  { "q": "What does 'stigma' mean in this context?", "opts": ["A legal framework for mental health rights", "A government policy on work absence", "A physical disability", "Negative attitudes and prejudice associating mental illness with weakness or incompetence"], "ans": "Negative attitudes and prejudice associating mental illness with weakness or incompetence", "exp": "The doctor defines stigma as 'the belief that mental illness indicates weakness or incompetence' — creating a cultural barrier to disclosure." },
  { "q": "In high-performance cultures, emotional vulnerability is perceived as:", "opts": ["Irrelevant to professional performance", "A strength that builds team trust", "A professional liability", "A necessary management skill"], "ans": "A professional liability", "exp": "Dr. Simmons says: 'emotional vulnerability is perceived as a professional liability' — particularly in high-performance work cultures." },
  { "q": "The interview implies mental health issues are primarily stigmatised in:", "opts": ["Healthcare settings", "Educational institutions", "High-performance corporate cultures", "Creative industries"], "ans": "High-performance corporate cultures", "exp": "The conversation specifically focuses on workplace stigma in performance-driven corporate environments." },
  { "q": "What does Dr. Simmons suggest about measuring psychological safety?", "opts": ["It should replace financial metrics", "Only HR departments should measure it", "It cannot be measured at all", "It should be measured alongside financial metrics"], "ans": "It should be measured alongside financial metrics", "exp": "She advocates 'measuring psychological safety alongside financial metrics' — making it a genuine organisational priority." },
  { "q": "Which word best describes Dr. Simmons' overall tone in this interview?", "opts": ["Angry and accusatory", "Casual and dismissive", "Pessimistic about any solution", "Authoritative, evidence-based, and constructive"], "ans": "Authoritative, evidence-based, and constructive", "exp": "Dr. Simmons presents research evidence, identifies problems clearly, and offers practical solutions — making her tone authoritative and constructive." },
  { "q": "According to the interview, identifying and treating mental health conditions EARLY would:", "opts": ["Increase absenteeism costs", "Only benefit the individual employee", "Reduce presenteeism and its hidden costs", "Have no effect on productivity"], "ans": "Reduce presenteeism and its hidden costs", "exp": "By implication, early intervention would prevent employees from working through mental illness ineffectively for months before seeking help." },
  { "q": "The word 'stark' (used about statistics) most nearly means:", "opts": ["Shockingly bleak and clear", "Complex and difficult to interpret", "Unreliable and uncertain", "Surprising and optimistic"], "ans": "Shockingly bleak and clear", "exp": "'Stark' describes something that is disturbingly clear and unavoidably unpleasant — here used about the scale of mental health costs." },
  { "q": "The term 'disproportionately high' (used about male suicide rates) means:", "opts": ["Exactly proportional to population", "Higher than would be expected given their proportion of the workforce", "Lower than average for all workers", "Statistically insignificant"], "ans": "Higher than would be expected given their proportion of the workforce", "exp": "'Disproportionately high' means the rate is greater than their share of the population would predict — indicating a systemic issue affecting male workers specifically." },
  { "q": "What implicit argument does the interview make about the business case for mental health?", "opts": ["Investing in employee mental health reduces costs and improves productivity — it is both ethical and economically rational", "Mental health programmes are too expensive for businesses to justify", "Mental health investment is purely altruistic with no business benefit", "Mental health is purely a personal responsibility"], "ans": "Investing in employee mental health reduces costs and improves productivity — it is both ethical and economically rational", "exp": "The $1 trillion cost figure and presenteeism data build a clear business case: addressing mental health reduces these enormous economic costs — making it commercially rational, not just ethical." }
];

const VOCAB = [
  { "en": "Mental health stigma", "id": "Stigma kesehatan mental – prasangka negatif terhadap kondisi jiwa" },
  { "en": "Burnout", "id": "Burnout – kelelahan ekstrem akibat stres kerja berkepanjangan" },
  { "en": "Workplace wellbeing", "id": "Kesehatan kerja – program kesejahteraan karyawan di tempat kerja" },
  { "en": "Psychological safety", "id": "Keamanan psikologis – rasa aman untuk berbagi tanpa takut dihakimi" },
  { "en": "Cognitive behavioural therapy", "id": "CBT – terapi berbasis perubahan pola pikir dan perilaku" },
  { "en": "Presenteeism", "id": "Presenteeisme – hadir fisik tapi tidak produktif akibat masalah kesehatan" },
  { "en": "Employee assistance programme", "id": "EAP – program bantuan profesional untuk karyawan" },
  { "en": "Resilience training", "id": "Pelatihan ketahanan – meningkatkan kemampuan mengatasi tekanan" }
];

export default function UpperInterListeningLesson6() {
  const navigate = useNavigate();
  const nextPath = '/modul/english/upper-intermediate/listening/lesson-7';
  const STORAGE_KEY = 'talky_upper_intermediate_listening_completed';

  const getCompleted = (): number[] => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
  };
  const markComplete = (n: number) => {
    const d = getCompleted();
    if (!d.includes(n)) localStorage.setItem(STORAGE_KEY, JSON.stringify([...d, n]));
  };

  const [isCompleted, setIsCompleted] = useState(() => getCompleted().includes(6));
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'simak' | 'latihan' | 'kuis'>('simak');

  const handleComplete = () => { markComplete(6); setIsCompleted(true); setShowModal(true); };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 animate-fade-in" style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }} onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-[2rem] p-8 max-w-sm w-full text-center shadow-2xl relative overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="absolute top-0 left-0 w-full h-32 rounded-t-[2rem] -z-10 bg-gradient-to-br from-sky-600 to-blue-500" />
            <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 bg-white shadow-xl border-4 border-white/80 mt-4"><span className="text-5xl">🎧</span></div>
            <h2 className="text-2xl font-extrabold text-slate-800 mb-2">Lesson Selesai! 🎉</h2>
            <p className="text-slate-500 mb-8 leading-relaxed">Selamat! Anda berhasil memahami materi B2 tentang: <strong>Interview: Breaking the Mental Health Stigma in the Workplace</strong>.</p>
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
              <h1 className="text-sm font-bold text-slate-800 line-clamp-1">Interview: Breaking the Mental Health Stigma in the Workplace</h1>
              <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#059669' }}>Upper-Intermediate Listening • L6</p>
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
                  <h2 className="text-xl md:text-2xl font-extrabold mb-2 relative z-10">B2 Listening: Interview: Breaking the Mental Health Stigma in the Workplace</h2>
                  <p className="text-sm md:text-base text-white/90 leading-relaxed max-w-lg relative z-10">Wawancara: Mengatasi Stigma Kesehatan Mental di Tempat Kerja</p>
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
                  <DialoguePlayer title="Interview: Breaking the Mental Health Stigma in the Workplace" lines={DIALOGUE} />
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                  <p className="text-sm font-bold text-amber-800 mb-1">💡 Tips Listening B2 – Kesehatan Mental & Masyarakat</p>
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
                  <p className="text-sm text-slate-500">Gunakan konteks dari dialog di atas untuk memilih kata yang tepat. Topik: Kesehatan Mental & Masyarakat</p>
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
