import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import LessonShell from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Trophy, Lightbulb, Sparkles, Star, Volume2 } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

const FITNESS_VOCAB = [

  { word: "Workout", ipa: "/ˈwɜːrkaʊt/", meaning: "Latihan fisik / Olahraga" },
  { word: "Stamina", ipa: "/ˈstæmɪnə/", meaning: "Stamina / Ketahanan fisik" },
  { word: "Flexibility", ipa: "/ˌflɛksəˈbɪlɪti/", meaning: "Kelenturan" },
  { word: "Muscle", ipa: "/ˈmʌsəl/", meaning: "Otot" },
  { word: "Aerobic", ipa: "/ɛˈroʊbɪk/", meaning: "Aerobik (Kardio)" },
  { word: "Strength", ipa: "/strɛŋθ/", meaning: "Kekuatan" },
  { word: "Endurance", ipa: "/ɪnˈdjʊərəns/", meaning: "Daya tahan" },
  { word: "Warm-up", ipa: "/wɔːrm ʌp/", meaning: "Pemanasan" },
  { word: "Cooldown", ipa: "/ˈkuːldaʊn/", meaning: "Pendinginan" },
  { word: "Posture", ipa: "/ˈpɒstʃər/", meaning: "Postur tubuh" },

];

const MEDICAL_VOCAB = [

  { word: "Symptom", ipa: "/ˈsɪmptəm/", meaning: "Gejala (penyakit)" },
  { word: "Diagnosis", ipa: "/ˌdaɪəɡˈnoʊsɪs/", meaning: "Diagnosis" },
  { word: "Prescription", ipa: "/prɪˈskrɪpʃən/", meaning: "Resep obat" },
  { word: "Infection", ipa: "/ɪnˈfɛkʃən/", meaning: "Infeksi" },
  { word: "Treatment", ipa: "/ˈtriːtmənt/", meaning: "Pengobatan / Perawatan" },
  { word: "Recovery", ipa: "/rɪˈkʌvəri/", meaning: "Pemulihan" },
  { word: "Surgery", ipa: "/ˈsɜːrdʒəri/", meaning: "Operasi / Bedah" },
  { word: "Patient", ipa: "/ˈpeɪʃənt/", meaning: "Pasien" },
  { word: "Emergency", ipa: "/ɪˈmɜːrdʒənsi/", meaning: "Darurat" },
  { word: "Vaccine", ipa: "/vækˈsiːn/", meaning: "Vaksin" },

];

const LIFESTYLE_VOCAB = [

  { word: "Nutrition", ipa: "/nuˈtrɪʃən/", meaning: "Nutrisi / Gizi" },
  { word: "Well-being", ipa: "/ˌwɛlˈbiːɪŋ/", meaning: "Kesejahteraan (Fisik & Mental)" },
  { word: "Meditation", ipa: "/ˌmɛdɪˈteɪʃən/", meaning: "Meditasi" },
  { word: "Stress", ipa: "/strɛs/", meaning: "Stres / Tekanan" },
  { word: "Balanced", ipa: "/ˈbælənst/", meaning: "Seimbang" },
  { word: "Habit", ipa: "/ˈhæbɪt/", meaning: "Kebiasaan" },
  { word: "Diet", ipa: "/ˈdaɪət/", meaning: "Pola makan / Diet" },
  { word: "Hydration", ipa: "/haɪˈdreɪʃən/", meaning: "Hidrasi (Kecukupan cairan)" },
  { word: "Mental", ipa: "/ˈmɛntl/", meaning: "Mental / Jiwa" },
  { word: "Relaxation", ipa: "/ˌriːlækˈseɪʃən/", meaning: "Relaksasi" },

];

const QUIZ_QUESTIONS = [

  {
    id: 1,
    question: "Before running fast, you should do a ___ to avoid injury.",
    options: ['surgery', 'warm-up', 'prescription'],
    answer: 'warm-up',
    explanation: "A warm-up (Pemanasan) mempersiapkan tubuh Anda untuk latihan."
  },
  {
    id: 2,
    question: "If you have a high fever, that is a ___ of an illness.",
    options: ['symptom', 'muscle', 'habit'],
    answer: 'symptom',
    explanation: "A symptom (Gejala) adalah tanda bahwa Anda sakit."
  },
  {
    id: 3,
    question: "She practices yoga to improve her ___.",
    options: ['flexibility', 'infection', 'diagnosis'],
    answer: 'flexibility',
    explanation: "Flexibility (Kelenturan) adalah kemampuan untuk menekuk dengan mudah tanpa patah."
  },
  {
    id: 4,
    question: "Drinking enough water is important for ___.",
    options: ['hydration', 'stress', 'emergency'],
    answer: 'hydration',
    explanation: "Hydration (Hidrasi) mengacu pada penyerapan air."
  },
  {
    id: 5,
    question: "The doctor gave me a ___ for antibiotics.",
    options: ['menu', 'prescription', 'receipt'],
    answer: 'prescription',
    explanation: "A prescription (Resep) adalah kertas dari dokter untuk mendapatkan obat."
  },
  {
    id: 6,
    question: "Regular ___ helps you build ___ and lose weight.",
    options: ['workout, muscle', 'diet, surgery', 'stress, vaccine'],
    answer: 'workout, muscle',
    explanation: "Workout (Latihan) membantu membangun Muscle (Otot)."
  },
  {
    id: 7,
    question: "Marathon runners need great ___ and ___.",
    options: ['stamina, endurance', 'surgery, infection', 'prescription, diagnosis'],
    answer: 'stamina, endurance',
    explanation: "Stamina (Stamina) dan Endurance (Daya tahan) diperlukan untuk lari jarak jauh."
  },
  {
    id: 8,
    question: "Good ___ prevents back pain.",
    options: ['posture', 'vaccine', 'cooldown'],
    answer: 'posture',
    explanation: "Posture (Postur tubuh) yang baik menjaga tulang belakang sejajar dengan benar."
  },
  {
    id: 9,
    question: "After exercising, do a ___ to help your body relax.",
    options: ['warm-up', 'cooldown', 'surgery'],
    answer: 'cooldown',
    explanation: "Cooldown (Pendinginan) membantu tubuh kembali normal setelah latihan intens."
  },
  {
    id: 10,
    question: "The ___ is still waiting for the doctor's ___.",
    options: ['patient, diagnosis', 'muscle, workout', 'habit, stress'],
    answer: 'patient, diagnosis',
    explanation: "Patient (Pasien) menunggu Diagnosis (Diagnosis) dari dokter."
  },
  {
    id: 11,
    question: "She caught an ___ and needs ___.",
    options: ['infection, treatment', 'aerobic, strength', 'posture, flexibility'],
    answer: 'infection, treatment',
    explanation: "Infection (Infeksi) memerlukan Treatment (Pengobatan)."
  },
  {
    id: 12,
    question: "His ___ from the accident took several months.",
    options: ['recovery', 'workout', 'habit'],
    answer: 'recovery',
    explanation: "Recovery (Pemulihan) adalah proses menjadi sehat kembali."
  },
  {
    id: 13,
    question: "The ___ was successful, and he is doing well.",
    options: ['surgery', 'meditation', 'hydration'],
    answer: 'surgery',
    explanation: "Surgery (Operasi) adalah prosedur medis untuk memperbaiki atau menghilangkan bagian tubuh."
  },
  {
    id: 14,
    question: "Call an ambulance! This is an ___!",
    options: ['emergency', 'aerobic', 'nutrition'],
    answer: 'emergency',
    explanation: "Emergency (Darurat) adalah situasi serius yang membutuhkan tindakan segera."
  },
  {
    id: 15,
    question: "Children should get a ___ to prevent diseases.",
    options: ['vaccine', 'symptom', 'cooldown'],
    answer: 'vaccine',
    explanation: "Vaccine (Vaksin) membantu tubuh melawan penyakit tertentu."
  },
  {
    id: 16,
    question: "Good ___ includes fruits, vegetables, and protein.",
    options: ['nutrition', 'stress', 'surgery'],
    answer: 'nutrition',
    explanation: "Nutrition (Nutrisi) adalah makanan yang dibutuhkan tubuh untuk tetap sehat."
  },
  {
    id: 17,
    question: "Physical and ___ health are both important for ___.",
    options: ['mental, well-being', 'muscle, surgery', 'aerobic, infection'],
    answer: 'mental, well-being',
    explanation: "Mental (Mental) dan Physical health keduanya penting untuk Well-being (Kesejahteraan)."
  },
  {
    id: 18,
    question: "A ___ lifestyle includes regular exercise and a healthy ___.",
    options: ['balanced, diet', 'stressed, emergency', 'flexible, surgery'],
    answer: 'balanced, diet',
    explanation: "Balanced (Seimbang) lifestyle termasuk Diet (Pola makan) yang sehat."
  },
  {
    id: 19,
    question: "I practice ___ and ___ to reduce stress.",
    options: ['meditation, relaxation', 'surgery, infection', 'diagnosis, prescription'],
    answer: 'meditation, relaxation',
    explanation: "Meditation (Meditasi) dan Relaxation (Relaksasi) membantu mengurangi stres."
  },
  {
    id: 20,
    question: "Building a good ___ takes time and discipline.",
    options: ['habit', 'symptom', 'emergency'],
    answer: 'habit',
    explanation: "Habit (Kebiasaan) adalah sesuatu yang Anda lakukan secara teratur tanpa berpikir."
  }

];

const InterVocabLesson4: React.FC = () => {
    const navigate = useNavigate();
    const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('intermediate_vocabulary', 4);
    const nextLessonPath = 4 < 20 ? `/modul/english/intermediate/vocabulary/lesson-${4+1}` : '/modul/english/intermediate';

    const [vocabSection, setVocabSection] = useState<'fitness' | string>('fitness');

    // Quiz State
    const [quizStep, setQuizStep] = useState(0);
    const [quizScore, setQuizScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isAnswerChecked, setIsAnswerChecked] = useState(false);

    // Audio Handler
    const playSound = (text: string) => { playAudio(text, 0.9); };

    // Quiz Handlers
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

    const renderVocabList = (list: any[], colorClass: string) => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                lessonLabel={"Intermediate Vocabulary Lesson 4"}
                accentColor="#2980B9"
                nextLessonPath={nextLessonPath}
                onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
                onBack={() => { setShowCompleteModal(false); navigate(-1); }}
            />
            <LessonShell
                title="Kesehatan & Kebugaran"
                subtitle="Vocabulary • Pelajaran 4"
                accentColor="#2980B9"
                nextLesson={nextLessonPath}
                tabs={[
                    { id: 'learn', label: 'Pelajari', icon: <BookOpen size={14} /> },
                    { id: 'practice', label: 'Latihan', icon: <PenTool size={14} /> }
                ]}
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
                {(tabId) => {
                    if (tabId === 'learn') {
                        return (
                            <div className="space-y-8 animate-fade-in">
                                
              <div className="flex flex-wrap justify-center gap-2 mb-6">

                <button
                  onClick={() => setVocabSection('fitness')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'fitness' ? 'bg-sky-100 text-sky-700 ring-2 ring-sky-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Kebugaran
                </button>

                <button
                  onClick={() => setVocabSection('medical')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'medical' ? 'bg-sky-100 text-sky-700 ring-2 ring-sky-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Medis
                </button>

                <button
                  onClick={() => setVocabSection('lifestyle')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'lifestyle' ? 'bg-sky-100 text-sky-700 ring-2 ring-sky-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Gaya Hidup
                </button>

              </div>
      
                                
              {vocabSection === 'fitness' && (
                <div className="animate-fade-in">
                  <div className="bg-sky-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-sky-500 shadow-[var(--shadow-card)]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sky-900 text-sm">Kebugaran Jasmani</h3>
                      <p className="text-xs text-sky-700">Latihan, kekuatan, dan tubuh.</p>
                    </div>
                  </div>
                  {renderVocabList(FITNESS_VOCAB, 'sky')}
                </div>
              )}

              {vocabSection === 'medical' && (
                <div className="animate-fade-in">
                  <div className="bg-sky-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-sky-500 shadow-[var(--shadow-card)]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sky-900 text-sm">Medis & Kesehatan</h3>
                      <p className="text-xs text-sky-700">Penyakit, pengobatan, dan dokter.</p>
                    </div>
                  </div>
                  {renderVocabList(MEDICAL_VOCAB, 'sky')}
                </div>
              )}

              {vocabSection === 'lifestyle' && (
                <div className="animate-fade-in">
                  <div className="bg-sky-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-sky-500 shadow-[var(--shadow-card)]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sky-900 text-sm">Gaya Hidup Sehat</h3>
                      <p className="text-xs text-sky-700">Kesehatan, pikiran, dan kebiasaan.</p>
                    </div>
                  </div>
                  {renderVocabList(LIFESTYLE_VOCAB, 'sky')}
                </div>
              )}

                                { /* Bonus: Penggunaan Kata & Kolokasi Section */ }
                                <div className="mt-10 animate-fade-in">
                                    
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Lightbulb className="w-6 h-6 text-yellow-500" />
                  <h2 className="text-lg font-bold text-slate-800">Penggunaan Kontekstual</h2>
                </div>

                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <h3 className="font-bold text-blue-800 mb-2 text-sm uppercase">Di Dokter</h3>
                    <p className="text-sm text-slate-700 italic mb-1">"The doctor made a <b>diagnosis</b> after seeing my <b>symptoms</b>."</p>
                    <p className="text-xs text-slate-500 mb-2">(Dokter membuat <b>diagnosis</b> setelah melihat <b>gejala</b> saya.)</p>
                    <p className="text-sm text-slate-700 italic">"I need to pick up my <b>prescription</b> from the pharmacy."</p>
                    <p className="text-xs text-slate-500">(Saya perlu mengambil <b>resep</b> saya dari apotek.)</p>
                  </div>

                  <div className="bg-green-50 p-4 rounded-xl border border-sky-100">
                    <h3 className="font-bold text-green-800 mb-2 text-sm uppercase">Kebiasaan Sehat</h3>
                    <p className="text-sm text-slate-700 italic mb-1">"A <b>balanced diet</b> and good <b>hydration</b> are key to <b>well-being</b>."</p>
                    <p className="text-xs text-slate-500 mb-2">(<b>Pola makan seimbang</b> dan <b>hidrasi</b> yang baik adalah kunci <b>kesejahteraan</b>.)</p>
                    <p className="text-sm text-slate-700 italic">"I do <b>meditation</b> to reduce <b>stress</b>."</p>
                    <p className="text-xs text-slate-500">(Saya melakukan <b>meditasi</b> untuk mengurangi <b>stres</b>.)</p>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-50 rounded-2xl p-5 border border-indigo-100">
                <h3 className="font-bold text-indigo-800 mb-2 text-sm uppercase tracking-wide">Kolokasi Umum</h3>
                <div className="bg-white p-3 rounded-lg border border-indigo-100/50">
                  <ul className="text-sm text-slate-700 space-y-2">
                    <li>• <b>Build</b> muscle (Membangun otot)</li>
                    <li>• <b>Catch</b> an infection (Terkena infeksi)</li>
                    <li>• <b>Recover</b> from surgery (Pulih dari operasi)</li>
                    <li>• <b>Maintain</b> a healthy lifestyle (Menjaga gaya hidup sehat)</li>
                  </ul>
                </div>
              </div>
            
                                </div>
                            </div>
                        );
                    }
                    if (tabId === 'practice') {
                        return (
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
                        );
                    }
                    return null;
                }}
            </LessonShell>
        </>
    );
};

export default InterVocabLesson4;
