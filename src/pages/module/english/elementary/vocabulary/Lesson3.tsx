import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import LessonShell from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Volume2, Lightbulb, User, Star, Sparkles, Home } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

// 30 Words divided into 3 categories
const IMMEDIATE_FAMILY_VOCAB = [
  { word: "Parents", ipa: "/ˈpɛrənts/", meaning: "Orang tua" },
  { word: "Siblings", ipa: "/ˈsɪblɪŋz/", meaning: "Saudara kandung" },
  { word: "Spouse", ipa: "/spaʊs/", meaning: "Pasangan (Suami/Istri)" },
  { word: "Offspring", ipa: "/ˈɔːfsprɪŋ/", meaning: "Keturunan / Anak" },
  { word: "Twins", ipa: "/twɪnz/", meaning: "Kembar" },
  { word: "Only child", ipa: "/ˌoʊnli ˈtʃaɪld/", meaning: "Anak tunggal" },
  { word: "Adopted", ipa: "/əˈdɒptɪd/", meaning: "Diadopsi / Angkat" },
  { word: "Stepfather", ipa: "/ˈstɛpˌfɑːðər/", meaning: "Ayah tiri" },
  { word: "Stepmother", ipa: "/ˈstɛpˌmʌðər/", meaning: "Ibu tiri" },
  { word: "Half-brother", ipa: "/ˈhɑːfˌbrʌðər/", meaning: "Saudara laki-laki tiri (satu ayah/ibu)" },
];

const EXTENDED_FAMILY_VOCAB = [
  { word: "Grandparents", ipa: "/ˈɡrændˌpɛrənts/", meaning: "Kakek-Nenek" },
  { word: "Grandchild", ipa: "/ˈɡrændˌtʃaɪld/", meaning: "Cucu" },
  { word: "Aunt", ipa: "/ænt/", meaning: "Bibi / Tante" },
  { word: "Uncle", ipa: "/ˈʌŋkəl/", meaning: "Paman / Om" },
  { word: "Cousin", ipa: "/ˈkʌzən/", meaning: "Sepupu" },
  { word: "Nephew", ipa: "/ˈnɛfjuː/", meaning: "Keponakan laki-laki" },
  { word: "Niece", ipa: "/niːs/", meaning: "Keponakan perempuan" },
  { word: "Mother-in-law", ipa: "/ˈmʌðər ɪn lɔː/", meaning: "Ibu mertua" },
  { word: "Father-in-law", ipa: "/ˈfɑːðər ɪn lɔː/", meaning: "Ayah mertua" },
  { word: "Brother-in-law", ipa: "/ˈbrʌðər ɪn lɔː/", meaning: "Ipar laki-laki" },
];

const RELATIONSHIP_VOCAB = [
  { word: "Single", ipa: "/ˈsɪŋɡəl/", meaning: "Lajang / Sendiri" },
  { word: "Married", ipa: "/ˈmærid/", meaning: "Menikah" },
  { word: "Divorced", ipa: "/dɪˈvɔːrst/", meaning: "Cerai" },
  { word: "Widowed", ipa: "/ˈwɪdoʊd/", meaning: "Janda / Duda (ditinggal mati)" },
  { word: "Engaged", ipa: "/ɪnˈɡeɪdʒd/", meaning: "Bertunangan" },
  { word: "Partner", ipa: "/ˈpɑːrtnər/", meaning: "Pasangan (hidup/kerja)" },
  { word: "Ex-husband", ipa: "/ɛks ˈhʌzbənd/", meaning: "Mantan suami" },
  { word: "Godfather", ipa: "/ˈɡɒdˌfɑːðər/", meaning: "Ayah baptis" },
  { word: "Godmother", ipa: "/ˈɡɒdˌmʌðər/", meaning: "Ibu baptis" },
  { word: "Relative", ipa: "/ˈrɛlətɪv/", meaning: "Kerabat / Saudara" },
];

const QUIZ_QUESTIONS = [
{
    id: 1,
    question: "The daughter of your brother is your ___.",
    options: ['Nephew', 'Niece', 'Cousin'],
    answer: 'Niece',
    explanation: "Anak perempuan dari saudara kandung adalah niece (keponakan perempuan). Laki-laki adalah nephew."
  },
  {
    id: 2,
    question: "Your husband's mother is your ___.",
    options: ['Mother-in-law', 'Grandmother', 'Stepmother'],
    answer: 'Mother-in-law',
    explanation: "Ibu dari pasanganmu adalah mother-in-law (ibu mertua)."
  },
  {
    id: 3,
    question: "They are no longer married. They are ___.",
    options: ['Widowed', 'Engaged', 'Divorced'],
    answer: 'Divorced',
    explanation: "Divorced (Cerai) berarti pernikahan telah berakhir secara hukum."
  },
  {
    id: 4,
    question: "I have no brothers or sisters. I am an ___.",
    options: ['Only child', 'Orphan', 'Adopted child'],
    answer: 'Only child',
    explanation: "Only child (Anak tunggal) berarti kamu adalah satu-satunya anak yang lahir dari orang tuamu."
  },
  {
    id: 5,
    question: "Two children born at the same time are ___.",
    options: ['Siblings', 'Cousins', 'Twins'],
    answer: 'Twins',
    explanation: "Twins (Kembar) lahir dari kehamilan yang sama."
  },
  {
    id: 6,
    question: "The daughter of your brother is your ___.",
    options: ["Nephew", "Niece", "Cousin"],
    answer: "Niece",
    explanation: "Anak perempuan dari saudara kandung adalah niece (keponakan perempuan). Laki-laki adalah nephew."
  },
  {
    id: 7,
    question: "Your husband's mother is your ___.",
    options: ["Mother-in-law", "Grandmother", "Stepmother"],
    answer: "Mother-in-law",
    explanation: "Ibu dari pasanganmu adalah mother-in-law (ibu mertua)."
  },
  {
    id: 8,
    question: "They are no longer married. They are ___.",
    options: ["Widowed", "Engaged", "Divorced"],
    answer: "Divorced",
    explanation: "Divorced (Cerai) berarti pernikahan telah berakhir secara hukum."
  },
  {
    id: 9,
    question: "I have no brothers or sisters. I am an ___.",
    options: ["Only child","Orphan","Adopted child"],
    answer: "Only child",
    explanation: "Only child (Anak tunggal) berarti kamu adalah satu-satunya anak yang lahir dari orang tuamu."
  },
  {
    id: 10,
    question: "Two children born at the same time are ___.",
    options: ["Siblings", "Cousins", "Twins"],
    answer: "Twins",
    explanation: "Twins (Kembar) lahir dari kehamilan yang sama."
  },
  {
    id: 11,
    question: "The daughter of your brother is your ___.",
    options: ["Nephew", "Niece", "Cousin"],
    answer: "Niece",
    explanation: "Anak perempuan dari saudara kandung adalah niece (keponakan perempuan). Laki-laki adalah nephew."
  },
  {
    id: 12,
    question: "Your husband's mother is your ___.",
    options: ["Mother-in-law", "Grandmother", "Stepmother"],
    answer: "Mother-in-law",
    explanation: "Ibu dari pasanganmu adalah mother-in-law (ibu mertua)."
  },
  {
    id: 13,
    question: "They are no longer married. They are ___.",
    options: ["Widowed", "Engaged", "Divorced"],
    answer: "Divorced",
    explanation: "Divorced (Cerai) berarti pernikahan telah berakhir secara hukum."
  },
  {
    id: 14,
    question: "I have no brothers or sisters. I am an ___.",
    options: ["Only child","Orphan","Adopted child"],
    answer: "Only child",
    explanation: "Only child (Anak tunggal) berarti kamu adalah satu-satunya anak yang lahir dari orang tuamu."
  },
  {
    id: 15,
    question: "Two children born at the same time are ___.",
    options: ["Siblings", "Cousins", "Twins"],
    answer: "Twins",
    explanation: "Twins (Kembar) lahir dari kehamilan yang sama."
  },
  {
    id: 16,
    question: "The daughter of your brother is your ___.",
    options: ["Nephew", "Niece", "Cousin"],
    answer: "Niece",
    explanation: "Anak perempuan dari saudara kandung adalah niece (keponakan perempuan). Laki-laki adalah nephew."
  },
  {
    id: 17,
    question: "Your husband's mother is your ___.",
    options: ["Mother-in-law", "Grandmother", "Stepmother"],
    answer: "Mother-in-law",
    explanation: "Ibu dari pasanganmu adalah mother-in-law (ibu mertua)."
  },
  {
    id: 18,
    question: "They are no longer married. They are ___.",
    options: ["Widowed", "Engaged", "Divorced"],
    answer: "Divorced",
    explanation: "Divorced (Cerai) berarti pernikahan telah berakhir secara hukum."
  },
  {
    id: 19,
    question: "I have no brothers or sisters. I am an ___.",
    options: ["Only child","Orphan","Adopted child"],
    answer: "Only child",
    explanation: "Only child (Anak tunggal) berarti kamu adalah satu-satunya anak yang lahir dari orang tuamu."
  },
  {
    id: 20,
    question: "Two children born at the same time are ___.",
    options: ["Siblings", "Cousins", "Twins"],
    answer: "Twins",
    explanation: "Twins (Kembar) lahir dari kehamilan yang sama."
  }
];

const Lesson3: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('elementary_vocabulary', 3);
  const nextLessonPath = '/modul/english/elementary/vocabulary/lesson-4';
  const [vocabSection, setVocabSection] = useState<'immediate' | 'extended' | 'status'>('immediate');

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

  const renderVocabList = (list: typeof IMMEDIATE_FAMILY_VOCAB, colorClass: string, icon: any) => (
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
      lessonLabel={"Elementary Vocabulary Lesson 3"}
      accentColor={"#16A085"}
      nextLessonPath={nextLessonPath}
      onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
      onBack={() => { setShowCompleteModal(false); navigate(-1); }}
    />
        <LessonShell
            title="Keluarga & Hubungan"
            subtitle="Vocabulary • Pelajaran 3"
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
                  onClick={() => setVocabSection('immediate')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'immediate' ? 'bg-emerald-100 text-emerald-700 ring-2 ring-emerald-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Keluarga Inti
                </button>
                <button
                  onClick={() => setVocabSection('extended')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'extended' ? 'bg-orange-100 text-orange-700 ring-2 ring-orange-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Keluarga Besar
                </button>
                <button
                  onClick={() => setVocabSection('status')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'status' ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Status
                </button>
              </div>

              {vocabSection === 'immediate' && (
                <>
                  <div className="bg-emerald-50 p-4 rounded-2xl mb-4 border border-blue-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-emerald-500 shadow-[var(--shadow-card)]"><Home className="w-5 h-5" /></div>
                    <div>
                      <h3 className="font-bold text-emerald-900 text-sm">Keluarga Inti</h3>
                      <p className="text-xs text-emerald-700">Orang tua, saudara kandung, dan kerabat dekat.</p>
                    </div>
                  </div>
                  {renderVocabList(IMMEDIATE_FAMILY_VOCAB, 'emerald', Home)}
                </>
              )}

              {vocabSection === 'extended' && (
                <>
                  <div className="bg-orange-50 p-4 rounded-2xl mb-4 border border-orange-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-orange-500 shadow-[var(--shadow-card)]"><User className="w-5 h-5" /></div>
                    <div>
                      <h3 className="font-bold text-orange-900 text-sm">Keluarga Besar</h3>
                      <p className="text-xs text-orange-700">Kerabat di luar rumah tangga utama dan Mertua/Ipar.</p>
                    </div>
                  </div>
                  {renderVocabList(EXTENDED_FAMILY_VOCAB, 'orange', User)}
                </>
              )}

              {vocabSection === 'status' && (
                <>
                  <div className="bg-blue-50 p-4 rounded-2xl mb-4 border border-blue-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-blue-500 shadow-[var(--shadow-card)]"><Sparkles size={20} /></div>
                    <div>
                      <h3 className="font-bold text-blue-900 text-sm">Status Hubungan</h3>
                      <p className="text-xs text-blue-700">Istilah untuk menggambarkan status pernikahan dan sosial.</p>
                    </div>
                  </div>
                  {renderVocabList(RELATIONSHIP_VOCAB, 'blue', Sparkles)}
                </>
              )}

<div className="bg-white rounded-2xl p-6 shadow-[var(--shadow-card)] border border-[var(--color-border)] mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Lightbulb size={20} />
                  <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Kepemilikan 's (Possessive 's)</h2>
                </div>
                <p className="text-sm text-[var(--color-text-secondary)] mb-6">
                  Dalam bahasa Inggris, kita biasanya menambahkan <b>'s</b> ke nama seseorang untuk menunjukkan hubungan keluarga atau kepemilikan. Kita jarang mengatakan "The mother of John".
                </p>

                <div className="space-y-4">
                  <div className="bg-emerald-50 p-4 rounded-xl border border-blue-100">
                    <h3 className="font-bold text-emerald-800 mb-2">Nama Tunggal</h3>
                    <p className="text-xs text-emerald-700 mb-2">Tambahkan 's setelah nama.</p>
                    <ul className="list-disc list-inside text-sm text-[var(--color-text-primary)] space-y-1">
                      <li>This is <b>Sarah's</b> father.</li>
                      <li>That is <b>Tom's</b> cousin.</li>
                    </ul>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                    <h3 className="font-bold text-orange-800 mb-2">Nama Berakhiran S</h3>
                    <p className="text-xs text-orange-700 mb-2">Kamu bisa menambahkan 's atau hanya ' (tanda apostrof).</p>
                    <ul className="list-disc list-inside text-sm text-[var(--color-text-primary)] space-y-1">
                      <li><b>James's</b> mother. (Common)</li>
                      <li><b>James'</b> mother. (Also correct)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
                <h3 className="font-bold text-blue-800 mb-2 text-sm uppercase tracking-wide">Keluarga Mertua ("In-Laws")</h3>
                <div className="bg-white p-3 rounded-lg border border-blue-100/50">
                  <p className="text-xs text-[var(--color-text-muted)] mb-2">Kerabat dari pasanganmu (suami/istri) disebut "In-Laws".</p>
                  <p className="text-sm font-medium text-[var(--color-text-primary)]">Mother-in-law = Ibu pasanganmu.</p>
                  <p className="text-sm font-medium text-[var(--color-text-primary)] mt-1">Brother-in-law = Saudara laki-laki pasanganmu.</p>
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
                    <span className="text-xs font-bold bg-gray-50 text-[var(--color-primary)] px-2 py-1 rounded">Skor: {quizScore}</span>
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
                    className="px-8 py-3 bg-[var(--color-primary)] text-white rounded-xl font-bold hover:bg-teal-700 transition-all shadow-lg shadow-sky-200"
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

export default Lesson3;
