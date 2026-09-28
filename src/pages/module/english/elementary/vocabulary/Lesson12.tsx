import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import LessonShell from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Volume2, Lightbulb, Smile, TrendingUp, Star } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

// 30 Words divided into 3 categories
const POSITIVE_EMOTIONS = [
  { word: "Happy", ipa: "/ˈhæpi/", meaning: "Senang" },
  { word: "Excited", ipa: "/ɪkˈsaɪtɪd/", meaning: "Bersemangat" },
  { word: "Proud", ipa: "/praʊd/", meaning: "Bangga" },
  { word: "Confident", ipa: "/ˈkɒnfɪdənt/", meaning: "Percaya diri" },
  { word: "Relieved", ipa: "/rɪˈliːvd/", meaning: "Lega" },
  { word: "Grateful", ipa: "/ˈɡreɪtfʊl/", meaning: "Bersyukur" },
  { word: "Calm", ipa: "/kɑːm/", meaning: "Tenang" },
  { word: "Cheerful", ipa: "/ˈtʃɪərfʊl/", meaning: "Ceria" },
  { word: "Delighted", ipa: "/dɪˈlaɪtɪd/", meaning: "Sangat senang" },
  { word: "Satisfied", ipa: "/ˈsætɪsfaɪd/", meaning: "Puas" },
];

const NEGATIVE_EMOTIONS = [
  { word: "Sad", ipa: "/sæd/", meaning: "Sedih" },
  { word: "Angry", ipa: "/ˈæŋɡri/", meaning: "Marah" },
  { word: "Scared", ipa: "/skɛrd/", meaning: "Takut" },
  { word: "Nervous", ipa: "/ˈnɜːrvəs/", meaning: "Gugup / Gelisah" },
  { word: "Bored", ipa: "/bɔːrd/", meaning: "Bosan" },
  { word: "Jealous", ipa: "/ˈdʒɛləs/", meaning: "Cemburu / Iri" },
  { word: "Disappointed", ipa: "/ˌdɪsəˈpɔɪntɪd/", meaning: "Kecewa" },
  { word: "Lonely", ipa: "/ˈloʊnli/", meaning: "Kesepian" },
  { word: "Embarrassed", ipa: "/ɪmˈbærəst/", meaning: "Malu" },
  { word: "Upset", ipa: "/ʌpˈsɛt/", meaning: "Kesal / Sedih" },
];

const PHYSICAL_COMPLEX_STATES = [
  { word: "Tired", ipa: "/ˈtaɪərd/", meaning: "Lelah" },
  { word: "Hungry", ipa: "/ˈhʌŋɡri/", meaning: "Lapar" },
  { word: "Thirsty", ipa: "/ˈθɜːrsti/", meaning: "Haus" },
  { word: "Sick", ipa: "/sɪk/", meaning: "Sakit" },
  { word: "Sleepy", ipa: "/ˈsliːpi/", meaning: "Mengantuk" },
  { word: "Surprised", ipa: "/sərˈpraɪzd/", meaning: "Terkejut" },
  { word: "Confused", ipa: "/kənˈfjuːzd/", meaning: "Bingung" },
  { word: "Shocked", ipa: "/ʃɒkt/", meaning: "Syok / Terkejut hebat" },
  { word: "Worried", ipa: "/ˈwʌrid/", meaning: "Khawatir" },
  { word: "Stressed", ipa: "/strɛst/", meaning: "Tertekan / Stres" },
];

const QUIZ_QUESTIONS = [
{
    id: 1,
    question: "I won the competition! I feel very ___.",
    options: ['sad', 'proud', 'lonely'],
    answer: 'proud',
    explanation: "Memenangkan sesuatu biasanya membuatmu merasa proud (bangga)."
  },
  {
    id: 2,
    question: "The movie was very long and slow. I was ___.",
    options: ['excited', 'bored', 'nervous'],
    answer: 'bored',
    explanation: "Hal yang panjang dan lambat sering membuatmu merasa bored (bosan)."
  },
  {
    id: 3,
    question: "She is afraid of spiders. She is ___.",
    options: ['scared', 'happy', 'grateful'],
    answer: 'scared',
    explanation: "Afraid adalah sinonim dari scared (takut)."
  },
  {
    id: 4,
    question: "I have an exam tomorrow. I feel ___.",
    options: ['calm', 'nervous', 'delighted'],
    answer: 'nervous',
    explanation: "Ujian sering membuat orang merasa nervous (gugup)."
  },
  {
    id: 5,
    question: "He has no friends here. He feels ___.",
    options: ['lonely', 'confident', 'cheerful'],
    answer: 'lonely',
    explanation: "Tidak memiliki teman membuatmu merasa lonely (kesepian)."
  },
  {
    id: 6,
    question: "I won the competition! I feel very ___.",
    options: ["sad","proud","lonely"],
    answer: "proud",
    explanation: "Memenangkan sesuatu biasanya membuatmu merasa proud (bangga)."
  },
  {
    id: 7,
    question: "The movie was very long and slow. I was ___.",
    options: ["excited","bored","nervous"],
    answer: "bored",
    explanation: "Hal yang panjang dan lambat sering membuatmu merasa bored (bosan)."
  },
  {
    id: 8,
    question: "the woman is afraid of spiders. the woman is ___.",
    options: ["scared","happy","grateful"],
    answer: "scared",
    explanation: "Afraid adalah sinonim dari scared (takut)."
  },
  {
    id: 9,
    question: "I have an exam tomorrow. I feel ___.",
    options: ["calm","nervous","delighted"],
    answer: "nervous",
    explanation: "Ujian sering membuat orang merasa nervous (gugup)."
  },
  {
    id: 10,
    question: "My friend has no friends here. My friend feels ___.",
    options: ["lonely","confident","cheerful"],
    answer: "lonely",
    explanation: "Tidak memiliki teman membuatmu merasa lonely (kesepian)."
  },
  {
    id: 11,
    question: "I won the competition! I feel very ___.",
    options: ["sad","proud","lonely"],
    answer: "proud",
    explanation: "Memenangkan sesuatu biasanya membuatmu merasa proud (bangga)."
  },
  {
    id: 12,
    question: "The movie was very long and slow. I was ___.",
    options: ["excited","bored","nervous"],
    answer: "bored",
    explanation: "Hal yang panjang dan lambat sering membuatmu merasa bored (bosan)."
  },
  {
    id: 13,
    question: "The woman is afraid of spiders. The woman is ___.",
    options: ["scared","happy","grateful"],
    answer: "scared",
    explanation: "Afraid adalah sinonim dari scared (takut)."
  },
  {
    id: 14,
    question: "I have an exam tomorrow. I feel ___.",
    options: ["calm","nervous","delighted"],
    answer: "nervous",
    explanation: "Ujian sering membuat orang merasa nervous (gugup)."
  },
  {
    id: 15,
    question: "He has no friends here. He feels ___.",
    options: ["lonely","confident","cheerful"],
    answer: "lonely",
    explanation: "Tidak memiliki teman membuatmu merasa lonely (kesepian)."
  },
  {
    id: 16,
    question: "I won the competition! I feel very ___.",
    options: ["sad","proud","lonely"],
    answer: "proud",
    explanation: "Memenangkan sesuatu biasanya membuatmu merasa proud (bangga)."
  },
  {
    id: 17,
    question: "The movie was very long and slow. I was ___.",
    options: ["excited","bored","nervous"],
    answer: "bored",
    explanation: "Hal yang panjang dan lambat sering membuatmu merasa bored (bosan)."
  },
  {
    id: 18,
    question: "my friend is afraid of spiders. my friend is ___.",
    options: ["scared","happy","grateful"],
    answer: "scared",
    explanation: "Afraid adalah sinonim dari scared (takut)."
  },
  {
    id: 19,
    question: "I have an exam tomorrow. I feel ___.",
    options: ["calm","nervous","delighted"],
    answer: "nervous",
    explanation: "Ujian sering membuat orang merasa nervous (gugup)."
  },
  {
    id: 20,
    question: "He has no friends here. He feels ___.",
    options: ["lonely","confident","cheerful"],
    answer: "lonely",
    explanation: "Tidak memiliki teman membuatmu merasa lonely (kesepian)."
  }
];

const Lesson12: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('elementary_vocabulary', 12);
  const nextLessonPath = '/modul/english/elementary/vocabulary/lesson-13';
  const [vocabSection, setVocabSection] = useState<'positive' | 'negative' | 'states'>('positive');

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

  const renderVocabList = (list: typeof POSITIVE_EMOTIONS, colorClass: string, icon: any) => (
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
      lessonLabel={"Elementary Vocabulary Lesson 12"}
      accentColor={"#16A085"}
      nextLessonPath={nextLessonPath}
      onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
      onBack={() => { setShowCompleteModal(false); navigate(-1); }}
    />
        <LessonShell
            title="Perasaan & Emosi"
            subtitle="Vocabulary • Pelajaran 12"
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
                  onClick={() => setVocabSection('positive')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'positive' ? 'bg-green-100 text-green-700 ring-2 ring-green-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Positif
                </button>
                <button
                  onClick={() => setVocabSection('negative')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'negative' ? 'bg-red-100 text-red-700 ring-2 ring-red-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Negatif
                </button>
                <button
                  onClick={() => setVocabSection('states')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'states' ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Kondisi Fisik
                </button>
              </div>

              {vocabSection === 'positive' && (
                <>
                  <div className="bg-green-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-green-500 shadow-[var(--shadow-card)]"><Smile className="w-5 h-5" /></div>
                    <div>
                      <h3 className="font-bold text-green-900 text-sm">Perasaan Positif</h3>
                      <p className="text-xs text-green-700">Emosi dan suasana hati yang baik.</p>
                    </div>
                  </div>
                  {renderVocabList(POSITIVE_EMOTIONS, 'green', Smile)}
                </>
              )}

              {vocabSection === 'negative' && (
                <>
                  <div className="bg-red-50 p-4 rounded-2xl mb-4 border border-red-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-red-500 shadow-[var(--shadow-card)]"><TrendingUp className="w-5 h-5" /></div>
                    <div>
                      <h3 className="font-bold text-red-900 text-sm">Perasaan Negatif</h3>
                      <p className="text-xs text-red-700">Emosi yang sulit.</p>
                    </div>
                  </div>
                  {renderVocabList(NEGATIVE_EMOTIONS, 'red', TrendingUp)}
                </>
              )}

              {vocabSection === 'states' && (
                <>
                  <div className="bg-blue-50 p-4 rounded-2xl mb-4 border border-blue-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-blue-500 shadow-[var(--shadow-card)]"><Star className="w-5 h-5" /></div>
                    <div>
                      <h3 className="font-bold text-blue-900 text-sm">Kondisi Fisik</h3>
                      <p className="text-xs text-blue-700">Bagaimana perasaan tubuhmu.</p>
                    </div>
                  </div>
                  {renderVocabList(PHYSICAL_COMPLEX_STATES, 'blue', Star)}
                </>
              )}

<div className="bg-white rounded-2xl p-6 shadow-[var(--shadow-card)] border border-[var(--color-border)] mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Lightbulb size={20} />
                  <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Kata Sifat -ED vs -ING</h2>
                </div>
                <p className="text-sm text-[var(--color-text-secondary)] mb-6">
                  Banyak kata sifat untuk perasaan berakhiran <b>-ed</b> atau <b>-ing</b>. Mereka memiliki arti yang berbeda.
                </p>

                <div className="space-y-4">
                  <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                    <h3 className="font-bold text-indigo-800 mb-2">-ED (Perasaanmu)</h3>
                    <p className="text-xs text-indigo-700 mb-2">Gunakan -ed untuk menggambarkan bagaimana seseorang <b>merasa</b>.</p>
                    <ul className="list-disc list-inside text-sm text-[var(--color-text-primary)] space-y-1">
                      <li>I am <b>bored</b>. (Saya merasa bosan)</li>
                      <li>She is <b>excited</b>. (Dia merasa bersemangat)</li>
                      <li>We are <b>tired</b>. (Kami merasa lelah)</li>
                    </ul>
                  </div>

                  <div className="bg-rose-50 p-4 rounded-xl border border-rose-100">
                    <h3 className="font-bold text-rose-800 mb-2">-ING (Penyebabnya)</h3>
                    <p className="text-xs text-rose-700 mb-2">Gunakan -ing untuk menggambarkan <b>hal</b> yang menyebabkan perasaan tersebut.</p>
                    <ul className="list-disc list-inside text-sm text-[var(--color-text-primary)] space-y-1">
                      <li>The movie is <b>boring</b>. (Filmnya membosankan)</li>
                      <li>The game is <b>exciting</b>. (Permainannya seru)</li>
                      <li>The work is <b>tiring</b>. (Pekerjaannya melelahkan)</li>
                    </ul>
                  </div>
                </div>
              </div>
        </div>
      ) : (
        <div className="animate-fade-in">
          <div className="max-w-xl mx-auto">
              {!showResult ? (
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-rose-100">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Pertanyaan {quizStep + 1} dari {QUIZ_QUESTIONS.length}</span>
                    <span className="text-xs font-bold bg-rose-50 text-rose-600 px-2 py-1 rounded">Skor: {quizScore}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-6">
                    {QUIZ_QUESTIONS[quizStep].question}
                  </h3>

                  <div className="space-y-3">
                    {QUIZ_QUESTIONS[quizStep].options.map((option, idx) => {
                      let btnClass = "border-[var(--color-border)] hover:border-rose-300 hover:bg-[var(--color-background)]";
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
                    className="px-8 py-3 bg-rose-600 text-white rounded-xl font-bold hover:bg-rose-700 transition-all shadow-lg shadow-rose-200"
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

export default Lesson12;
