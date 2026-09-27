import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import LessonShell from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Volume2, Lightbulb, Clock, Star, Sparkles, Home } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

// 30 Words divided into 3 categories
const MORNING_EVENING_VOCAB = [
  { word: "Oversleep", ipa: "/ˌoʊvərˈsliːp/", meaning: "Bangun kesiangan" },
  { word: "Hit snooze", ipa: "/hɪt snuːz/", meaning: "Tekan tombol tunda alarm" },
  { word: "Get dressed", ipa: "/ɡɛt drɛst/", meaning: "Berpakaian" },
  { word: "Put on makeup", ipa: "/pʊt ɒn ˈmeɪkʌp/", meaning: "Memakai riasan" },
  { word: "Pack a lunch", ipa: "/pæk ə lʌntʃ/", meaning: "Membawa bekal" },
  { word: "Commute", ipa: "/kəˈmjuːt/", meaning: "Perjalanan ke tempat kerja" },
  { word: "Get home", ipa: "/ɡɛt hoʊm/", meaning: "Sampai di rumah" },
  { word: "Unwind", ipa: "/ˌʌnˈwaɪnd/", meaning: "Bersantai / Melepas penat" },
  { word: "Skincare routine", ipa: "/ˈskɪnkɛr ruːˈtiːn/", meaning: "Rutinitas perawatan kulit" },
  { word: "Set an alarm", ipa: "/sɛt ən əˈlɑːrm/", meaning: "Pasang alarm" },
];

const CHORES_VOCAB = [
  { word: "Do the laundry", ipa: "/duː ðə ˈlɔːndri/", meaning: "Mencuci baju" },
  { word: "Hang the clothes", ipa: "/hæŋ ðə kloʊðz/", meaning: "Menjemur pakaian" },
  { word: "Fold the laundry", ipa: "/foʊld ðə ˈlɔːndri/", meaning: "Melipat cucian" },
  { word: "Iron the shirt", ipa: "/ˈaɪərn ðə ʃɜːrt/", meaning: "Menyetrika kemeja" },
  { word: "Vacuum the rug", ipa: "/ˈvækjuːm ðə rʌɡ/", meaning: "Menyedot debu karpet" },
  { word: "Mop the floor", ipa: "/mɒp ðə flɔːr/", meaning: "Mengepel lantai" },
  { word: "Dust the shelves", ipa: "/dʌst ðə ʃɛlvz/", meaning: "Membersihkan debu rak" },
  { word: "Take out the trash", ipa: "/teɪk aʊt ðə træʃ/", meaning: "Membuang sampah" },
  { word: "Water the plants", ipa: "/ˈwɔːtər ðə plænts/", meaning: "Menyiram tanaman" },
  { word: "Feed the pet", ipa: "/fiːd ðə pɛt/", meaning: "Memberi makan hewan peliharaan" },
];

const MODERN_HABITS_VOCAB = [
  { word: "Scroll social media", ipa: "/skroʊl ˈsoʊʃəl ˈmiːdiə/", meaning: "Melihat media sosial" },
  { word: "Check notifications", ipa: "/tʃɛk ˌnoʊtɪfɪˈkeɪʃənz/", meaning: "Cek notifikasi" },
  { word: "Charge phone", ipa: "/tʃɑːrdʒ foʊn/", meaning: "Mengisi daya HP" },
  { word: "Reply to messages", ipa: "/rɪˈplaɪ tu ˈmɛsɪdʒɪz/", meaning: "Membalas pesan" },
  { word: "Order food delivery", ipa: "/ˈɔːrdər fuːd dɪˈlɪvəri/", meaning: "Pesan antar makanan" },
  { word: "Binge-watch", ipa: "/bɪndʒ wɒtʃ/", meaning: "Nonton maraton (TV/Film)" },
  { word: "Go to the gym", ipa: "/ɡoʊ tu ðə dʒɪm/", meaning: "Pergi ke gym" },
  { word: "Go grocery shopping", ipa: "/ɡoʊ ˈɡroʊsəri ˈʃɒpɪŋ/", meaning: "Belanja kebutuhan sehari-hari" },
  { word: "Run errands", ipa: "/rʌn ˈɛrəndz/", meaning: "Mengurus keperluan kecil" },
  { word: "Hang out", ipa: "/hæŋ aʊt/", meaning: "Nongkrong / Berkumpul" },
];

const FREQUENCY_ADVERBS = [
  { word: "Always", pct: 100, color: "bg-green-500" },
  { word: "Usually", pct: 80, color: "bg-emerald-400" },
  { word: "Often", pct: 60, color: "bg-teal-400" },
  { word: "Sometimes", pct: 40, color: "bg-yellow-400" },
  { word: "Rarely", pct: 10, color: "bg-orange-400" },
  { word: "Never", pct: 0, color: "bg-red-500" },
];

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "I slept too late, so I ___ this morning.",
    options: ['commuted', 'overslept', 'unwound'],
    answer: 'overslept',
    explanation: "Oversleep berarti bangun lebih lambat dari yang kamu niatkan."
  },
  {
    id: 2,
    question: "The carpet is dirty. I need to ___.",
    options: ['mop it', 'vacuum it', 'iron it'],
    answer: 'vacuum it',
    explanation: "Kita menyedot debu (vacuum) karpet dan permadani untuk menghilangkan debu."
  },
  {
    id: 3,
    question: "I usually ___ on Netflix on weekends.",
    options: ['binge-watch', 'scroll', 'charge'],
    answer: 'binge-watch',
    explanation: "Binge-watch berarti menonton banyak episode berturut-turut."
  },
  {
    id: 4,
    question: "Before sleeping, I always ___ my phone.",
    options: ['feed', 'charge', 'water'],
    answer: 'charge',
    explanation: "Kita mengisi daya (charge) perangkat elektronik untuk mengisi baterai."
  },
  {
    id: 5,
    question: "I need to buy food. I'm going ___.",
    options: ['grocery shopping', 'running errands', 'doing laundry'],
    answer: 'grocery shopping',
    explanation: "Grocery shopping adalah membeli makanan dan kebutuhan rumah tangga."
  },
  {
    id: 6,
    question: "I need to ___ the plants because the soil is very dry.",
    options: ['fold', 'water', 'hang'],
    answer: 'water',
    explanation: "Kamu menyiram (water) tanaman agar tetap hidup dan tumbuh."
  },
  {
    id: 7,
    question: "She never leaves home without trying to ___ to look good.",
    options: ['put on makeup', 'do laundry', 'unwind'],
    answer: 'put on makeup',
    explanation: "Memakai riasan (put on makeup) adalah salah satu rutinitas merias diri."
  },
  {
    id: 8,
    question: "Instead of getting up, I decided to ___ and sleep five more minutes.",
    options: ['hit snooze', 'commute', 'pack a lunch'],
    answer: 'hit snooze',
    explanation: "Menekan snooze (hit snooze) berarti menunda alarm agar berbunyi lagi beberapa menit kemudian."
  },
  {
    id: 9,
    question: "I have to ___ early tomorrow because my train leaves at 6 AM.",
    options: ['set an alarm', 'binge-watch', 'hang out'],
    answer: 'set an alarm',
    explanation: "Kamu memasang alarm (set an alarm) agar bangun tepat waktu."
  },
  {
    id: 10,
    question: "After taking off my clean clothes from the line, I need to ___ them.",
    options: ['iron', 'fold', 'dust'],
    answer: 'fold',
    explanation: "Melipat (fold) pakaian adalah kegiatan setelah pakaian kering."
  },
  {
    id: 11,
    question: "You want to eat but you are too lazy to cook. You should ___.",
    options: ['do the laundry', 'order food delivery', 'take out the trash'],
    answer: 'order food delivery',
    explanation: "Order food delivery berarti memesan antar makanan."
  },
  {
    id: 12,
    question: "Adverb of frequency 'Selalu' in English is ___.",
    options: ['Often', 'Usually', 'Always'],
    answer: 'Always',
    explanation: "'Always' digunakan untuk sesuatu yang dilakukan 100% setiap saat."
  },
  {
    id: 13,
    question: "My cat is hungry. I have to ___ him.",
    options: ['feed', 'water', 'dust'],
    answer: 'feed',
    explanation: "Memberi makan hewan peliharaan adalah 'feed the pet'."
  },
  {
    id: 14,
    question: "It takes me an hour to ___ to work every day by train.",
    options: ['commute', 'unwind', 'hang out'],
    answer: 'commute',
    explanation: "Commute berarti perjalanan pulang-pergi ke tempat kerja."
  },
  {
    id: 15,
    question: "I use a broom and a mop to ___.",
    options: ['dust the shelves', 'mop the floor', 'iron the shirt'],
    answer: 'mop the floor',
    explanation: "Mengepel (mop) lantai (floor) menggunakan alat pel."
  },
  {
    id: 16,
    question: "When I am bored, I often ___ to see new posts from friends.",
    options: ['scroll social media', 'check notifications', 'reply to messages'],
    answer: 'scroll social media',
    explanation: "Menggulir media sosial untuk melihat postingan disebut 'scroll social media'."
  },
  {
    id: 17,
    question: "My phone just beeped. I need to ___.",
    options: ['scroll social media', 'check notifications', 'hang out'],
    answer: 'check notifications',
    explanation: "Saat ada notifikasi baru, kamu akan mengecek (check notifications)."
  },
  {
    id: 18,
    question: "After a long and stressful day, I like to ___ by reading a book.",
    options: ['unwind', 'commute', 'run errands'],
    answer: 'unwind',
    explanation: "Unwind berarti bersantai atau melepas penat setelah kelelahan."
  },
  {
    id: 19,
    question: "Adverb 'Jarang' in English is ___.",
    options: ['Often', 'Rarely', 'Usually'],
    answer: 'Rarely',
    explanation: "'Rarely' menunjukkan kejadian yang sangat jarang dilakukan (10% peluang)."
  },
  {
    id: 20,
    question: "My shirt is wrinkled. I need to ___ it.",
    options: ['hang', 'iron', 'fold'],
    answer: 'iron',
    explanation: "Menyetrika (iron) pakaian bertujuan untuk membuatnya tidak kusut."
  }
];

const Lesson1: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('elementary_vocabulary', 1);
  const nextLessonPath = '/modul/english/elementary/vocabulary/lesson-2';
  const [vocabSection, setVocabSection] = useState<'morning' | 'chores' | 'modern'>('morning');

  // Quiz State
  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  // Audio Handler
  const playSound = (text: string) => { playAudio(text, 0.9); };

  // Quiz Logic
  const handleCheckQuiz = (option: string) => {
    if (isAnswerChecked) return;
    setSelectedOption(option);
    setIsAnswerChecked(true);
    if (option === QUIZ_QUESTIONS[quizStep].answer) {
      setQuizScore(prev => prev + 1);
      playSound("Correct!");
    } else {
      playSound("Incorrect.");
    }
  };

  const nextQuizQuestion = () => {
    if (quizStep < QUIZ_QUESTIONS.length - 1) {
      setQuizStep(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setQuizStep(0);
    setQuizScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setIsAnswerChecked(false);
  };

  const renderVocabList = (list: typeof MORNING_EVENING_VOCAB, colorClass: string, icon: any) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 animate-fade-in">
      {list.map((item, idx) => (
        <button
          key={idx}
          onClick={() => playSound(item.word)}
          className={`bg-white p-4 rounded-xl border border-[var(--color-border)] shadow-[var(--shadow-card)] flex items-center justify-between group hover:border-${colorClass}-300 hover:shadow-md transition-all active:scale-95 text-left`}
        >
          <div className="flex items-start gap-4">
            <div className={`w-10 h-10 rounded-full bg-${colorClass}-50 text-${colorClass}-500 flex items-center justify-center flex-shrink-0 font-bold text-sm`}>
              {idx + 1}
            </div>
            <div>
              <p className="font-bold text-[var(--color-text-primary)]">{item.word}</p>
              <p className="text-xs text-[var(--color-text-muted)] font-mono mb-1">{item.ipa}</p>
              <p className="text-xs text-[var(--color-text-muted)] italic">{item.meaning}</p>
            </div>
          </div>
          <Volume2 className={`w-5 h-5 text-slate-300 group-hover:text-${colorClass}-500`} />
        </button>
      ))}
    </div>
  );

  return (
        <>
          <LessonCompleteModal
      show={showCompleteModal}
      onClose={() => setShowCompleteModal(false)}
      lessonLabel={"Elementary Vocabulary Lesson 1"}
      accentColor={"#16A085"}
      nextLessonPath={nextLessonPath}
      onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
      onBack={() => { setShowCompleteModal(false); navigate(-1); }}
    />
        <LessonShell
            title="Kehidupan Sehari-hari & Rutinitas"
            subtitle="Vocabulary • Pelajaran 1"
            accentColor="#2980B9"
            nextLesson={nextLessonPath}
            tabs={[{ id: 'learn', label: 'Pelajari', icon: <BookOpen size={14} /> }, { id: 'practice', label: 'Latihan', icon: <PenTool size={14} /> }]}
            footer={() => (
                <button
                    onClick={isCompleted ? () => navigate(-1) : handleSelesai}
                    className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg transition-all hover:opacity-90 active:scale-[0.98]"
                    style={{ background: isCompleted ? 'linear-gradient(135deg, #4FA3D1, #1E6F9F)' : 'linear-gradient(135deg, #2980B9, #2980B9cc)' }}
                >
                    <CheckCircle2 size={18} />
                    {isCompleted ? 'Sudah Selesai ✓' : 'Selesai'}
                </button>
            )}
        >
            {(tabId) => tabId === 'learn' ? (
        <div className="space-y-8 animate-fade-in">
{/* Category Switcher */}
              <div className="flex justify-center gap-2 mb-6">
                <button
                  onClick={() => setVocabSection('morning')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'morning' ? 'bg-sky-100 text-sky-700 ring-2 ring-sky-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Pagi & Malam
                </button>
                <button
                  onClick={() => setVocabSection('chores')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'chores' ? 'bg-emerald-100 text-emerald-700 ring-2 ring-emerald-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Pekerjaan Rumah
                </button>
                <button
                  onClick={() => setVocabSection('modern')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'modern' ? 'bg-violet-100 text-violet-700 ring-2 ring-violet-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Kehidupan Modern
                </button>
              </div>

              {vocabSection === 'morning' && (
                <>
                  <div className="bg-sky-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-sky-500 shadow-[var(--shadow-card)]"><Clock className="w-5 h-5" /></div>
                    <div>
                      <h3 className="font-bold text-sky-900 text-sm">Pagi & Malam</h3>
                      <p className="text-xs text-sky-700">Rutinitas untuk memulai dan mengakhiri harimu.</p>
                    </div>
                  </div>
                  {renderVocabList(MORNING_EVENING_VOCAB, 'sky', Clock)}
                </>
              )}

              {vocabSection === 'chores' && (
                <>
                  <div className="bg-emerald-50 p-4 rounded-2xl mb-4 border border-blue-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-emerald-500 shadow-[var(--shadow-card)]"><Home className="w-5 h-5" /></div>
                    <div>
                      <h3 className="font-bold text-emerald-900 text-sm">Pekerjaan Rumah Tangga</h3>
                      <p className="text-xs text-emerald-700">Menjaga tempat tinggalmu tetap bersih dan rapi.</p>
                    </div>
                  </div>
                  {renderVocabList(CHORES_VOCAB, 'emerald', Home)}
                </>
              )}

              {vocabSection === 'modern' && (
                <>
                  <div className="bg-violet-50 p-4 rounded-2xl mb-4 border border-violet-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-violet-500 shadow-[var(--shadow-card)]"><Sparkles size={20} /></div>
                    <div>
                      <h3 className="font-bold text-violet-900 text-sm">Kebiasaan Modern</h3>
                      <p className="text-xs text-violet-700">Teknologi, kehidupan sosial, dan urusan sehari-hari.</p>
                    </div>
                  </div>
                  {renderVocabList(MODERN_HABITS_VOCAB, 'violet', Sparkles)}
                </>
              )}

<div className="bg-white rounded-2xl p-6 shadow-[var(--shadow-card)] border border-[var(--color-border)] mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Lightbulb size={20} />
                  <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Kata Keterangan Frekuensi</h2>
                </div>
                <p className="text-sm text-[var(--color-text-secondary)] mb-6">
                  Gunakan kata-kata ini untuk menyatakan <b>seberapa sering</b> kamu melakukan sesuatu.
                </p>

                <div className="space-y-4">
                  {FREQUENCY_ADVERBS.map((adv, idx) => (
                    <div key={idx} className="group">
                      <div className="flex justify-between items-end mb-1">
                        <span className="font-bold text-[var(--color-text-primary)] text-sm">{adv.word}</span>
                        <span className="text-xs text-[var(--color-text-muted)] font-mono">{adv.pct}%</span>
                      </div>
                      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${adv.color} transition-all duration-700`}
                          style={{ width: `${Math.max(adv.pct, 5)}%` }} // min width for visual
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-sky-50 rounded-2xl p-5 border border-sky-100">
                <h3 className="font-bold text-sky-800 mb-2 text-sm uppercase tracking-wide">Struktur Kalimat</h3>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded-lg border border-sky-100/50">
                    <p className="text-xs text-[var(--color-text-muted)] mb-1">Sebelum Kata Kerja Utama:</p>
                    <p className="text-sm font-medium text-[var(--color-text-primary)]">I <span className="text-sky-600 font-bold">always</span> drink coffee.</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-sky-100/50">
                    <p className="text-xs text-[var(--color-text-muted)] mb-1">Setelah 'To Be':</p>
                    <p className="text-sm font-medium text-[var(--color-text-primary)]">She is <span className="text-sky-600 font-bold">never</span> late.</p>
                  </div>
                </div>
              </div>
        </div>
      ) : (
        <div className="animate-fade-in">
          <div className="max-w-xl mx-auto">
              {!showResult ? (
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-sky-100">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Pertanyaan {quizStep + 1} dari {QUIZ_QUESTIONS.length}</span>
                    <span className="text-xs font-bold bg-sky-50 text-sky-600 px-2 py-1 rounded">Skor: {quizScore}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-6">
                    {QUIZ_QUESTIONS[quizStep].question}
                  </h3>

                  <div className="space-y-3">
                    {QUIZ_QUESTIONS[quizStep].options.map((option, idx) => {
                      let btnClass = "border-[var(--color-border)] hover:border-sky-300 hover:bg-[var(--color-background)]";
                      if (isAnswerChecked) {
                        if (option === QUIZ_QUESTIONS[quizStep].answer) btnClass = "bg-green-50 border-sky-500 text-green-700";
                        else if (option === selectedOption) btnClass = "bg-red-50 border-red-500 text-red-700";
                        else btnClass = "opacity-50 border-[var(--color-border)]";
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleCheckQuiz(option)}
                          disabled={isAnswerChecked}
                          className={`w-full p-4 rounded-xl border text-left font-medium transition-all flex items-center justify-between ${btnClass}`}
                        >
                          <span>{option}</span>
                          {isAnswerChecked && option === QUIZ_QUESTIONS[quizStep].answer && <CheckCircle2 size={20} />}
                          {isAnswerChecked && option === selectedOption && option !== QUIZ_QUESTIONS[quizStep].answer && <XCircle size={20} />}
                        </button>
                      );
                    })}
                  </div>

                  {isAnswerChecked && (
                    <div className="mt-6">
                      <div className={`p-3 rounded-lg text-sm mb-4 ${selectedOption === QUIZ_QUESTIONS[quizStep].answer ? 'bg-green-50 text-green-800' : 'bg-orange-50 text-orange-800'}`}>
                        {QUIZ_QUESTIONS[quizStep].explanation}
                      </div>
                      <button
                        onClick={nextQuizQuestion}
                        className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg"
                      >
                        {quizStep < QUIZ_QUESTIONS.length - 1 ? "Pertanyaan Selanjutnya" : "Lihat Hasil"}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 text-yellow-500">
                    <Star className="w-10 h-10" />
                  </div>
                  <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">Kuis Selesai!</h2>
                  <p className="text-[var(--color-text-muted)] mb-6">Kamu mendapatkan skor {quizScore} dari {QUIZ_QUESTIONS.length}</p>
                  <button
                    onClick={restartQuiz}
                    className="px-8 py-3 bg-sky-600 text-white rounded-xl font-bold hover:bg-sky-700 transition-all shadow-lg shadow-sky-200"
                  >
                    Coba Lagi
                  </button>
                </div>
              )}
            </div>
        </div>
      )}
    </LessonShell>
    </>
  );
};

export default Lesson1;
