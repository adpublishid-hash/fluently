
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LessonShell from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Lightbulb, Star, Volume2, TrendingUp } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';






const QUESTION_TYPES = [
  {
    title: "Question Tags",
    desc: "Pertanyaan kecil di akhir kalimat.",
    formula: "Pernyataan + Tag?",
    example: "It's nice, isn't it?",
    icon: "🏷️",
    color: "bg-indigo-50 text-indigo-700 border-indigo-200"
  },
  {
    title: "Lists",
    desc: "Serangkaian item.",
    formula: "Item 1 ↗, Item 2 ↗, and Item 3 ↘",
    example: "I bought apples, bananas, and pears.",
    icon: "📝",
    color: "bg-emerald-50 text-emerald-700 border-blue-200"
  },
  {
    title: "Choice Questions",
    desc: "Memberikan seseorang pilihan.",
    formula: "Pilihan A ↗ or Pilihan B ↘",
    example: "Do you want tea or coffee?",
    icon: "⚖️",
    color: "bg-rose-50 text-rose-700 border-rose-200"
  }
];

const TAG_INTONATION = [
  {
    meaning: "Pertanyaan Nyata (Saya tidak tahu)",
    tone: "Naik ↗",
    context: "Anda tidak yakin dan meminta informasi.",
    example: "You haven't seen my phone, have you? ↗"
  },
  {
    meaning: "Konfirmasi (Saya tahu)",
    tone: "Turun ↘",
    context: "Anda yakin dan ingin persetujuan.",
    example: "It's a beautiful day, isn't it? ↘"
  }
];

const LIST_CHOICE_EXAMPLES = [
  {
    text: "Red, blue, and green.",
    pattern: "↗ ↗ ↘",
    type: "List",
    hint: "Naik, Naik, Turun (Selesai)"
  },
  {
    text: "Is it a boy or a girl?",
    pattern: "↗ ... ↘",
    type: "Pilihan",
    hint: "Naik pada opsi pertama, Turun pada yang terakhir"
  },
  {
    text: "One, two, three, four.",
    pattern: "↗ ↗ ↗ ↘",
    type: "Menghitung",
    hint: "Terus naik sampai akhir"
  }
];

const QUIZ_QUESTIONS = [
  { id: 1, question: "Jika saya mengatakan 'It's cold, isn't it?' dengan suara TURUN (↘), saya bermaksud...", options: ['Saya bertanya apakah dingin', 'Saya menyatakan fakta dan ingin persetujuan'], answer: 'Saya menyatakan fakta dan ingin persetujuan', explanation: "Intonasi menurun pada tag berarti itu bukan pertanyaan nyata, hanya komentar." },
  { id: 2, question: "Apa pola intonasi untuk: 'Do you want water or juice?'", options: ['Naik ↗ (pada juice)', 'Turun ↘ (pada juice)'], answer: 'Turun ↘ (pada juice)', explanation: "Dalam pertanyaan pilihan, suara NAIK pada opsi pertama dan TURUN pada yang terakhir." },
  { id: 3, question: "Saat menghitung '1, 2, 3...', suara Anda harus...", options: ['Naik pada setiap angka sampai yang terakhir', 'Turun pada setiap angka'], answer: 'Naik pada setiap angka sampai yang terakhir', explanation: "Nada naik menunjukkan bahwa daftar masih berlanjut. Nada turun menunjukkan bahwa itu selesai." },
  { id: 4, question: "You're late, aren't you? (Naik ↗)", options: ['Saya bertanya apakah Anda terlambat', 'Saya memberitahu Anda bahwa Anda terlambat'], answer: 'Saya bertanya apakah Anda terlambat', explanation: "Intonasi naik membuatnya menjadi pertanyaan nyata." },
  { id: 5, question: "Pola intonasi untuk list: 'Red, blue, and green'", options: ['Turun semua', 'Naik, Naik, Turun (↗ ↗ ↘)', 'Naik semua'], answer: 'Naik, Naik, Turun (↗ ↗ ↘)', explanation: "Item terakhir dalam list turun untuk menandakan selesai." },
  { id: 6, question: "'It's a beautiful day, isn't it?' (Turun ↘) = ", options: ['Pertanyaan nyata', 'Komentar/konfirmasi'], answer: 'Komentar/konfirmasi', explanation: "Falling tag = Saya yakin, saya hanya ingin persetujuan Anda." },
  { id: 7, question: "'You haven't seen my phone, have you?' (Naik ↗) = ", options: ['Pertanyaan ny ata (tidak tahu)', 'Konfirmasi (sudah tahu)'], answer: 'Pertanyaan nyata (tidak tahu)', explanation: "Rising tag = genuine question, I don't know the answer." },
  { id: 8, question: "Dalam 'Is it a boy or a girl?', pola intonasi adalah...", options: ['BOY (↗) ... GIRL (↘)', 'BOY (↘) ... GIRL (↗)', 'Sama rata'], answer: 'BOY (↗) ... GIRL (↘)', explanation: "Pilihan pertama naik, pilihan terakhir turun." },
  { id: 9, question: "Question tag dengan intonasi NAIK (↗) berarti...", options: ['Saya yakin', 'Saya tidak yakin, saya benar-benar bertanya'], answer: 'Saya tidak yakin, saya benar-benar bertanya', explanation: "Rising tag = real question, uncertainty." },
  { id: 10, question: "Question tag dengan intonasi TURUN (↘) berarti...", options: ['Saya yakin, hanya ingin konfirmasi', 'Saya tidak tahu'], answer: 'Saya yakin, hanya ingin konfirmasi', explanation: "Falling tag = I'm confident, just checking." },
  { id: 11, question: "'Apples, bananas, and pears' - Item mana yang turun?", options: ['Apples', 'Bananas', 'Pears (terakhir)'], answer: 'Pears (terakhir)', explanation: "Item terakhir dalam list selalu turun (↘)." },
  { id: 12, question: "Kapan question tag menggunakan rising intonation?", options: ['Ketika Anda yakin', 'Ketika Anda TIDAK TAHU dan benar-benar bertanya'], answer: 'Ketika Anda TIDAK TAHU dan benar-benar bertanya', explanation: "Rising = genuine uncertainty." },
  { id: 13, question: "Kapan question tag menggunakan falling intonation?", options: ['Ketika Anda YAKIN dan hanya ingin persetujuan', 'Ketika Anda tidak tahu'], answer: 'Ketika Anda YAKIN dan hanya ingin persetujuan', explanation: "Falling = confident statement seeking agreement." },
  { id: 14, question: "Dalam list '1, 2, 3, 4', angka mana yang turun?", options: ['1', '4 (terakhir)', 'Semua turun'], answer: '4 (terakhir)', explanation: "Hanya item terakhir yang turun untuk signal completion." },
  { id: 15, question: "'Tea or coffee?' - Pola intonasi adalah...", options: ['TEA (↗), COFFEE (↘)', 'TEA (↘), COFFEE (↗)', 'Sama rata'], answer: 'TEA (↗), COFFEE (↘)', explanation: "First option rises, final option falls in choice questions." },
  { id: 16, question: "Mengapa intonasi penting dalam question tags?", options: ['Tidak penting', 'Mengubah apakah itu pertanyaan nyata atau komentar', 'Hanya untuk style'], answer: 'Mengubah apakah itu pertanyaan nyata atau komentar', explanation: "Intonation completely changes the meaning of tags." },
  { id: 17, question: "List intonation: kenapa item tengah naik?", options: ['Untuk menunjukkan list belum selesai', 'Karena bingung', 'Tidak ada alasan'], answer: 'Untuk menunjukkan list belum selesai', explanation: "Rising tone = 'more is coming', falling = 'finished.'" },
  { id: 18, question: "'You like pizza, don't you?' (↘) - Pembicara...", options: ['Tidak tahu', 'Sudah yakin Anda suka pizza'], answer: 'Sudah yakin Anda suka pizza', explanation: "Falling tag = speaker is confident about the statement." },
  { id: 19, question: "'You like pizza, don't you?' (↗) - Pembicara...", options: ['Yakin', 'Tidak yakin, benar-benar bertanya'], answer: 'Tidak yakin, benar-benar bertanya', explanation: "Rising tag = genuine question, speaker doesn't know." },
  { id: 20, question: "Dalam choice question, opsi terakhir selalu...", options: ['Naik', 'Turun', 'Datar'], answer: 'Turun', explanation: "Final option falls to signal the end of choices." }
];

const InterPronunLesson8: React.FC = () => {
    const navigate = useNavigate();
    const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('intermediate_pronunciation', 8);
    const nextLessonPath = 8 < 20 ? `/modul/english/intermediate/pronunciation/lesson-${8 + 1}` : '/modul/english/intermediate';

  const [activeTab, setActiveTab] = useState<'types' | 'tags' | 'lists' | 'quiz'>('types');

  // Quiz State
  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  // Audio Handler
  const playSound = (text: string, rateOrLabel: number | string = 0.9, maybeRate?: number) => { const rate = typeof rateOrLabel === "number" ? rateOrLabel : (maybeRate ?? 0.9); playAudio(text, rate); };

  // Quiz Handlers
  const handleCheckQuiz = (option: string) => {
    if (isAnswerChecked) return;
    setSelectedOption(option);
    setIsAnswerChecked(true);
    if (option === QUIZ_QUESTIONS[quizStep].answer) {
      setQuizScore(prev => prev + 1);
      playSound("Benar!");
    } else {
      playSound("Salah.");
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

  return (
        <>
            <LessonCompleteModal
                show={showCompleteModal}
                onClose={() => setShowCompleteModal(false)}
                lessonLabel={"Intermediate Pronunciation Lesson 8"}
                accentColor="#8B5CF6"
                nextLessonPath={nextLessonPath}
                onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
                onBack={() => { setShowCompleteModal(false); navigate(-1); }}
            />
            <LessonShell
                title="Intonasi Pertanyaan"
                subtitle="Pronunciation • Pelajaran 8"
                accentColor="#8B5CF6"
                nextLesson={nextLessonPath}
                tabs={[
                    { id: 'types', label: 'Ringkasan', icon: <BookOpen size={14} /> },
                    { id: 'tags', label: 'Pertanyaan Tag', icon: <BookOpen size={14} /> },
                    { id: 'lists', label: 'Daftar', icon: <BookOpen size={14} /> },
                    { id: 'quiz', label: 'Kuis', icon: <PenTool size={14} /> }
                ]}
                footer={() => (
                    <button
                        onClick={isCompleted ? () => navigate(-1) : handleSelesai}
                        className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg transition-all hover:opacity-90 active:scale-[0.98]"
                        style={{ background: isCompleted ? 'linear-gradient(135deg, #4FA3D1, #1E6F9F)' : 'linear-gradient(135deg, #8B5CF6, #7C3AED)' }}
                    >
                        <CheckCircle2 size={18} />
                        {isCompleted ? 'Sudah Selesai ✓' : 'Selesai'}
                    </button>
                )}
            >
                {(tabId) => {
                    
                    
                    return (
                        <div className="animate-fade-in space-y-6">
                            

          {tabId === 'types' && (
            <>
              {/* Intro */}
              <section className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden mb-6">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <TrendingUp className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2">Lebih dari Ya/Tidak</h2>
                  <p className="text-indigo-100 text-sm leading-relaxed">
                    Pertanyaan tidak selalu hanya naik atau turun. Kita menggunakan nada khusus untuk daftar, pilihan, dan memeriksa informasi.
                  </p>
                </div>
              </section>

              <div className="grid gap-4">
                {QUESTION_TYPES.map((type, idx) => (
                  <div key={idx} className={`bg-white rounded-2xl border p-5 shadow-sm ${type.color.replace('bg-', 'border-').split(' ')[2]}`}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className={`text-lg font-bold ${type.color.split(' ')[1]}`}>{type.title}</h3>
                        <p className="text-xs text-slate-500 mt-1">{type.desc}</p>
                      </div>
                      <span className="text-2xl">{type.icon}</span>
                    </div>
                    <div className="bg-white/60 p-2 rounded-lg border border-slate-100/50 mb-2">
                      <p className="text-xs font-mono font-bold text-slate-600">{type.formula}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-800 italic">"{type.example}"</span>
                      <button
                        onClick={() => playSound(type.example)}
                        className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-all"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {tabId === 'tags' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-500" />
                  Dua Makna Tag
                </h3>
                <p className="text-sm text-slate-600 mb-6">
                  "Isn't it?", "Don't you?", "Can't we?" bisa berarti dua hal yang sangat berbeda tergantung pada suara Anda.
                </p>

                <div className="space-y-4">
                  {TAG_INTONATION.map((item, idx) => (
                    <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-indigo-700">{item.meaning}</span>
                        <span className="text-xs font-black bg-white px-2 py-1 rounded border border-slate-200">{item.tone}</span>
                      </div>
                      <p className="text-xs text-slate-500 mb-3">{item.context}</p>
                      <button
                        onClick={() => playSound(item.example)}
                        className="w-full flex items-center justify-between bg-white p-3 rounded-lg border border-slate-200 hover:border-indigo-300 transition-all group"
                      >
                        <span className="text-sm font-medium text-slate-800">{item.example}</span>
                        <Volume2 className="w-4 h-4 text-slate-300 group-hover:text-indigo-500" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tabId === 'lists' && (
            <div className="max-w-xl mx-auto">
              <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="bg-emerald-50 px-6 py-4 border-b border-blue-100">
                  <h3 className="font-bold text-emerald-800 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Daftar & Pilihan
                  </h3>
                  <p className="text-xs text-emerald-600 mt-1">Jangan turunkan suara Anda terlalu dini!</p>
                </div>
                <div className="divide-y divide-slate-100">
                  {LIST_CHOICE_EXAMPLES.map((item, idx) => (
                    <div key={idx} className="p-4 hover:bg-slate-50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">{item.type}</span>
                        <span className="font-mono text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">{item.pattern}</span>
                      </div>
                      <p className="text-lg font-bold text-slate-800 mb-2">{item.text}</p>
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-slate-500 italic">{item.hint}</p>
                        <button
                          onClick={() => playSound(item.text)}
                          className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-400 flex items-center justify-center hover:border-blue-300 hover:text-emerald-600 transition-all"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tabId === 'quiz' && (
            <div className="max-w-xl mx-auto">
              {!showResult ? (
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-indigo-100">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pertanyaan {quizStep + 1} dari {QUIZ_QUESTIONS.length}</span>
                    <span className="text-xs font-bold bg-indigo-50 text-indigo-600 px-2 py-1 rounded">Skor: {quizScore}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-800 mb-6 flex flex-col gap-2">
                    {QUIZ_QUESTIONS[quizStep].question}
                  </h3>

                  <div className="space-y-3">
                    {QUIZ_QUESTIONS[quizStep].options.map((option, idx) => {
                      let btnClass = "border-slate-200 hover:border-indigo-300 hover:bg-slate-50";
                      if (isAnswerChecked) {
                        if (option === QUIZ_QUESTIONS[quizStep].answer) btnClass = "bg-green-50 border-sky-500 text-green-700";
                        else if (option === selectedOption) btnClass = "bg-red-50 border-red-500 text-red-700";
                        else btnClass = "opacity-50 border-slate-100";
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleCheckQuiz(option)}
                          disabled={isAnswerChecked}
                          className={`w-full p-4 rounded-xl border text-left font-medium transition-all flex items-center justify-between ${btnClass}`}
                        >
                          <span>{option}</span>
                          {isAnswerChecked && option === QUIZ_QUESTIONS[quizStep].answer && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                          {isAnswerChecked && option === selectedOption && option !== QUIZ_QUESTIONS[quizStep].answer && <XCircle className="w-5 h-5 text-red-500" />}
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
                        {quizStep < QUIZ_QUESTIONS.length - 1 ? "Pertanyaan Berikutnya" : "Lihat Hasil"}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 text-yellow-500">
                    <Star className="w-10 h-10" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">Kuis Selesai!</h2>
                  <p className="text-slate-500 mb-6">Anda mendapat skor {quizScore} dari {QUIZ_QUESTIONS.length}</p>
                  <button
                    onClick={restartQuiz}
                    className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
                  >
                    Coba Lagi
                  </button>
                </div>
              )}
            </div>
          )}

        
                        </div>
                    );
                }}
            </LessonShell>
        </>
    );
}; // END COMPONENT

export default InterPronunLesson8;
