import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine, ReadingCard, ComprehensionSection, getCompletedReadingLessons, markReadingComplete } from './readingUtils';
import type { QuizItem, ComprehensionQ } from './readingUtils';
import { BookOpen, PenTool, CheckCircle2, ChevronLeft } from 'lucide-react';

/* ══ DATA: QUIZ 20 SOAL (CEFR B1) ═══════════════════════════════════════════════ */
const QUIZ: QuizItem[] = [
    { q: 'What is the main purpose of Sarah’s letter?', opts: ["To complain about her boss", "To ask for money", "To update Jane about her new job and life", "To invite Jane to a party"], ans: "To update Jane about her new job and life", exp: 'Surat ini berisi pembaruan tentang kehidupan dan pekerjaan barunya (updating about new job and life).' },
    { q: 'How long has Sarah been working at the new company?', opts: ["A few days", "Six months", "A year", "Almost a month"], ans: "Almost a month", exp: 'Di paragraf pertama ia menyebutkan "It’s been almost a month since I started my new job..."' },
    { q: 'What is Sarah’s current position?', opts: ["Graphic Designer", "Marketing Manager", "Sales Executive", "Junior Marketing Assistant"], ans: "Junior Marketing Assistant", exp: 'Ia menyebut peran barunya sebagai "Junior Marketing Assistant" di agensi.' },
    { q: 'How did Sarah feel during her first week?', opts: ["Excited but overwhelmed", "Angry and frustrated", "Very confident and relaxed", "Bored and tired"], ans: "Excited but overwhelmed", exp: 'Di awal ia merasa "I was quite overwhelmed at first..." (Awalnya saya cukup kewalahan).' },
    { q: 'What kind of tasks does Sarah do every day?', opts: ["Only making coffee for the boss", "Writing social media posts and analyzing data", "Writing code for websites", "Calling customers to sell products"], ans: "Writing social media posts and analyzing data", exp: 'Tugasnya meliputi "drafting social media posts and analyzing engagement metrics".' },
    { q: 'Who is Mr. Peterson?', opts: ["Sarah’s colleague", "A client", "Jane’s boss", "Sarah’s manager"], ans: "Sarah’s manager", exp: 'Mr. Peterson disebutkan sebagai "My manager, Mr. Peterson..."' },
    { q: 'What does Sarah think about Mr. Peterson?', opts: ["He is lazy and rude.", "He is strict but supportive.", "He gives too much unpaid work.", "He doesn't care about the team."], ans: "He is strict but supportive.", exp: 'Ia dideskripsikan sebagai "strict when it comes to deadlines, but he’s incredibly supportive." (Tegas tetapi sangat mendukung).' },
    { q: 'What happened last Friday?', opts: ["The team had a welcome lunch for Sarah.", "Sarah got promoted.", "They lost a major client.", "Sarah resigned from the job."], ans: "The team had a welcome lunch for Sarah.", exp: '"Last Friday, the team took me out for a welcome lunch..."' },
    { q: 'Where did they go for the welcome lunch?', opts: ["A fast-food chain", "A coffee shop", "An Italian restaurant near the office", "A French bakery"], ans: "An Italian restaurant near the office", exp: 'Mereka pergi ke "a fantastic Italian restaurant just around the corner." (restoran Italia terdekat).' },
    { q: 'What is Sarah’s hope for next month?', opts: ["To quit her job", "To travel to Europe", "To lead her own campaign", "To buy a new car"], ans: "To lead her own campaign", exp: 'Ia berharap: "I really hope to be given the chance to lead my own small campaign next month."' },
    { q: 'Which phrase is used to describe the coworkers?', opts: ["Quiet and reserved", "Lazy and unhelpful", "Competitive and mean", "Friendly and welcoming"], ans: "Friendly and welcoming", exp: 'Rekan kerjanya dideskripsikan "everyone has been so friendly and welcoming."' },
    { q: 'What does "overwhelmed" mean in this context?', opts: ["Merasa kewalahan atau kelebihan beban", "Merasa luar biasa bahagia", "Merasa tidak peduli", "Merasa sangat bosan"], ans: "Merasa kewalahan atau kelebihan beban", exp: '"Overwhelmed" berarti merasa terlalu banyak hal yang harus ditangani sekaligus (kewalahan).' },
    { q: 'Why did Sarah feel overwhelmed initially?', opts: ["Because she didn't like Jane", "Because there was so much new information to learn", "Because she hated the office", "Because her computer was broken"], ans: "Because there was so much new information to learn", exp: 'Kewalahan terjadi karena "there was so much to learn regarding their internal systems".' },
    { q: 'What event is happening next weekend?', opts: ["Sarah and Jane are planning to meet for coffee.", "There is a company party.", "Sarah is going on a business trip.", "Sarah is moving to a new apartment."], ans: "Sarah and Jane are planning to meet for coffee.", exp: 'Di akhir surat: "Let’s catch up properly next weekend. Are you free for coffee on Saturday?"' },
    { q: 'What does "catch up" mean in a personal letter?', opts: ["Bertemu untuk saling bertukar kabar", "Mengejar kereta", "Menangkap bola", "Berlari bersama"], ans: "Bertemu untuk saling bertukar kabar", exp: '"Catch up" adalah phrasal verb umum untuk bertemu teman dan mengobrol tentang kabar terbaru.' },
    { q: 'What describes the "pace" (ritme) of her new workplace?', opts: ["Boring", "Very slow", "Fast-paced", "Relaxed and quiet"], ans: "Fast-paced", exp: 'Lingkungannya digambarkan sebagai "fast-paced environment".' },
    { q: 'How does Sarah feel about her teammates?', opts: ["She feels disconnected from them.", "She thinks they are not smart.", "She has never met them.", "She appreciates their help."], ans: "She appreciates their help.", exp: 'Ia menghargai mereka ("they were always ready to answer my questions").' },
    { q: 'What did they eat at the lunch?', opts: ["Burgers", "Pizza and pasta", "Sushi", "Steak"], ans: "Pizza and pasta", exp: 'Karena itu adalah restoran Italia (Italian restaurant), Pizza dan Pasta adalah makanan khas yang dihidangkan.' },
    { q: 'Is the tone of this letter formal or informal?', opts: ["Informal (Personal)", "Legal", "Academic", "Very formal (Business)"], ans: "Informal (Personal)", exp: 'Surat ini ditujukan kepada teman ("Dear Jane", "Let\'s catch up"), menggunakan bahasa santai.' },
    { q: 'What is Sarah seeking in her career right now?', opts: ["A job in a completely different field", "A chance to sleep at work", "Growth and learning opportunities", "Early retirement"], ans: "Growth and learning opportunities", exp: 'Dia berbicara tentang harapannya memimpin kampanye dan belajar dari manajernya, menunjukkan keinginan untuk berkembang.' }
];

/* ══ DATA: KONTEN BACAAN (B1) ═══════════════════════════════════════════════ */
const COMPREHENSION: { passageTitle: string; passage: React.ReactNode; questions: ComprehensionQ[] } = {
  passageTitle: '✉️ Bacaan: Surat dari Sarah',
  passage: (
    <>
      <div className="bg-orange-50 p-6 font-serif rounded-xl border border-orange-100 shadow-inner text-slate-800">
        <p className="mb-4 text-right italic">October 12th</p>
        <p className="mb-4">Dear Jane,</p>
        <p className="mb-4">
          How have you been? I’m writing to give you a quick update about my new job at the advertising agency. It’s been almost a month since I started as a Junior Marketing Assistant, and honestly, it has been quite an experience!
        </p>
        <p className="mb-4">
          I was quite overwhelmed at first. The environment is very fast-paced, and there was so much to learn regarding their internal systems. However, everyone has been so friendly and welcoming. My daily tasks usually involve drafting social media posts and analyzing engagement metrics. It sounds like a lot of work, but I am actually enjoying the challenge.
        </p>
        <p className="mb-4">
          My manager, Mr. Peterson, is strict when it comes to deadlines, but he’s incredibly supportive. He takes the time to explain things clearly if I make a mistake. Last Friday, the team took me out for a welcome lunch at a fantastic Italian restaurant just around the corner. We had so much fun chatting and getting to know each other outside the office.
        </p>
        <p className="mb-4">
          I really hope to be given the chance to lead my own small campaign next month. I feel much more confident now than I did on my first day. 
        </p>
        <p className="mb-4">
          Anyway, I’d love to hear about how things are going with you. Let’s catch up properly next weekend. Are you free for coffee on Saturday afternoon?
        </p>
        <p className="mb-8">Looking forward to seeing you,</p>
        <p className="font-bold">Sarah</p>
      </div>
    </>
  ),
  questions: [
    { q: 'Siapa yang menulis surat ini?', opts: ["Jane", "Sarah", "Mr. Peterson", "Tidak diketahui"], ans: 'Sarah' },
    { q: 'Berapa lama Sarah sudah bekerja di pekerjaan barunya?', opts: ["Baru saja mulai besok", "1 Tahun", "Hampir sebulan", "Satu minggu"], ans: 'Hampir sebulan' },
    { q: 'Apa jenis perusahaan tempat Sarah bekerja sekarang?', opts: ["Perusahaan IT", "Rumah Sakit", "Restoran Italia", "Agensi Periklanan (Advertising agency)"], ans: 'Agensi Periklanan (Advertising agency)' },
    { q: 'Apa yang dilakukan tim Sarah untuk merayakan kedatangannya?', opts: ["Mengundangnya makan siang (welcome lunch)", "Memberikan banyak pekerjaan", "Memecatnya", "Membelikannya mobil"], ans: 'Mengundangnya makan siang (welcome lunch)' },
    { q: 'Apa harapan Sarah untuk bulan depan secara profesional?', opts: ["Bekerja dari rumah", "Resign dari perusahaan", "Menjadi CEO", "Memimpin campaign-nya sendiri"], ans: 'Memimpin campaign-nya sendiri' },
  ],
};

/* ══ MAIN COMPONENT ═══════════════════════════════════════════════ */
export default function InterReadingLesson1(): React.ReactElement {
  const navigate = useNavigate();
  const nextPath = '/modul/english/intermediate/reading/lesson-2'; // Bisa disesuaikan jika lesson 2 belum ada
  const [isCompleted, setIsCompleted] = useState(() => getCompletedReadingLessons().includes(1));
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'baca' | 'latihan' | 'kuis'>('baca');

  const handleComplete = () => { markReadingComplete(1); setIsCompleted(true); setShowModal(true); };

  return (
    <>
      {/* Modal Selesai */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 animate-fade-in" style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }} onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-[2rem] p-8 max-w-sm w-full text-center shadow-2xl relative overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-t-[2rem] -z-10" />
            <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 bg-white shadow-xl border-4 border-indigo-50 mt-4">
              <span className="text-5xl">🏆</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-800 mb-2">Lesson Selesai! 🎉</h2>
            <p className="text-slate-500 mb-8 leading-relaxed">Selamat! Anda berhasil memahami teks surat pertemanan dengan standar bahasa Inggris <b>B1 (Intermediate)</b>.</p>
            <div className="space-y-3">
              <button onClick={() => { setShowModal(false); navigate(nextPath); }} className="w-full py-4 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all active:scale-95">Pelajari Materi Selanjutnya</button>
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
              <h1 className="text-base font-extrabold text-slate-800 tracking-tight">Personal & Work Letter</h1>
              <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-widest bg-indigo-50 inline-block px-2 py-0.5 rounded-full mt-0.5">B1 Reading • Lesson 1</p>
            </div>
            <button onClick={() => navigate(nextPath)} className="px-4 py-2 rounded-full text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors">Next ›</button>
          </div>
        </header>

        {/* Custom Tabs */}
        <div className="flex bg-white border-b border-slate-100 sticky top-[65px] z-10 shadow-sm p-2 gap-2">
          {(['baca', 'latihan', 'kuis'] as const).map((tab) => {
            const labels = { baca: 'Materi', latihan: 'Pemahaman', kuis: 'Kuis 20 Soal' };
            const icons = { baca: <BookOpen className="w-4 h-4" />, latihan: <PenTool className="w-4 h-4" />, kuis: <CheckCircle2 className="w-4 h-4" /> };
            const isActive = activeTab === tab;
            return (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-3 text-sm font-bold tracking-wide transition-all rounded-xl flex items-center justify-center gap-2 ${isActive ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}>
                {icons[tab]} {labels[tab]}
              </button>
            )
          })}
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-8 pb-28 space-y-6">
            {activeTab === 'baca' && (
              <div className="animate-fade-in space-y-6">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-10">
                     <BookOpen className="w-32 h-32" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-extrabold mb-2 relative z-10">Surat Kabar Pekerjaan</h2>
                  <p className="text-sm md:text-base text-indigo-100 leading-relaxed max-w-lg relative z-10">
                    Siswa pada level B1 diharapkan mampu memahami teks berisi kejadian (events), perasaan (feelings), dan harapan (wishes) dalam ranah keseharian dan dunia kerja.
                  </p>
                </div>

                <ReadingCard title="Petunjuk Belajar" icon="💡">
                  <p className="text-sm text-slate-700 mb-3 leading-relaxed">
                    Di latihan ini, kamu akan membaca surat dari seorang kerabat. Perhatikan cara ia menceritakan kondisinya di tempat baru:
                  </p>
                  <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside bg-slate-50 p-4 rounded-xl">
                    <li><strong className="text-slate-800">Events:</strong> Apa yang terjadi padanya minggu lalu?</li>
                    <li><strong className="text-slate-800">Feelings:</strong> Bagaimana perasaannya di minggu pertama bekerja?</li>
                    <li><strong className="text-slate-800">Wishes:</strong> Apa harapannya di masa depan?</li>
                  </ul>
                  <p className="text-sm text-slate-700 mt-4 font-medium italic">
                    Silakan lanjut ke tab <b>Pemahaman</b> untuk mulai membaca teks!
                  </p>
                </ReadingCard>
              </div>
            )}

            {activeTab === 'latihan' && <ComprehensionSection {...COMPREHENSION} />}
            {activeTab === 'kuis' && <QuizEngine items={QUIZ} onComplete={handleComplete} />}
          </div>
        </div>

        <div className="sticky bottom-0 z-30 bg-white/90 backdrop-blur-xl border-t border-slate-200 p-4">
          <button onClick={isCompleted ? () => navigate(-1) : handleComplete} className="w-full py-4 rounded-2xl font-bold text-white flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all hover:shadow-xl" style={{ background: isCompleted ? 'linear-gradient(135deg,#10B981,#059669)' : 'linear-gradient(135deg,#4F46E5,#4338CA)' }}>
            <CheckCircle2 className="w-5 h-5" />
            {isCompleted ? 'Sudah Selesai ✓ (Kembali)' : 'Tandai Selesai ✓'}
          </button>
        </div>
      </div>
    </>
  );
}
