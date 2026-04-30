const fs = require('fs');
const path = require('path');

const UI_QUIZ_BLOCK = `
        <div className="py-4">
          {!showResult ? (
            <div className="max-w-xl mx-auto bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pertanyaan {practiceStep + 1} dari {QUIZ_QUESTIONS.length}</span>
                <span className="text-xs font-bold bg-indigo-50 text-indigo-600 px-2 py-1 rounded">Skor: {quizScore}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-6">{QUIZ_QUESTIONS[practiceStep].question}</h3>
              <div className="space-y-3">
                {QUIZ_QUESTIONS[practiceStep].options.map((option: string, idx: number) => {
                  let cls = "border-slate-200 hover:border-indigo-300 hover:bg-slate-50";
                  if (isPracticeChecked) {
                    if (option === QUIZ_QUESTIONS[practiceStep].answer) cls = "bg-green-50 border-green-500 text-green-700";
                    else if (option === selectedPracticeOption) cls = "bg-red-50 border-red-500 text-red-700";
                    else cls = "opacity-50 border-slate-100";
                  } else if (option === selectedPracticeOption) {
                    cls = "border-indigo-500 bg-indigo-50 text-indigo-700";
                  }
                  return (
                    <button key={idx} onClick={() => { if(!isPracticeChecked) setSelectedPracticeOption(option); }} disabled={isPracticeChecked}
                      className={"w-full p-4 rounded-xl border text-left font-medium transition-all flex items-center justify-between " + cls}>
                      <span>{option}</span>
                      {isPracticeChecked && option === QUIZ_QUESTIONS[practiceStep].answer && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                      {isPracticeChecked && option === selectedPracticeOption && option !== QUIZ_QUESTIONS[practiceStep].answer && <XCircle className="w-5 h-5 text-red-500" />}
                    </button>
                  );
                })}
              </div>
              {!isPracticeChecked ? (
                <button 
                  onClick={() => setIsPracticeChecked(true)}
                  disabled={!selectedPracticeOption}
                  className={\`mt-6 w-full py-3 rounded-xl font-bold transition-all \${selectedPracticeOption ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg' : 'bg-slate-100 text-slate-400'}\`}
                >
                  Cek Jawaban
                </button>
              ) : (
                <div className="mt-6 animate-fade-in">
                  <div className={"p-3 rounded-lg text-sm mb-4 " + (selectedPracticeOption === QUIZ_QUESTIONS[practiceStep].answer ? "bg-green-50 text-green-800" : "bg-orange-50 text-orange-800")}>
                    {selectedPracticeOption === QUIZ_QUESTIONS[practiceStep].answer ? "Benar! " : "Kurang Tepat. "}
                    {QUIZ_QUESTIONS[practiceStep].explanation}
                  </div>
                  <button onClick={() => {
                    const isCorrect = selectedPracticeOption === QUIZ_QUESTIONS[practiceStep].answer;
                    if (isCorrect) setQuizScore(p => p + 1);
                    if (practiceStep < QUIZ_QUESTIONS.length - 1) { 
                      setPracticeStep(p => p + 1); 
                      setSelectedPracticeOption(null); 
                      setIsPracticeChecked(false); 
                    } else { 
                      setShowResult(true); 
                    }
                  }} className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg">
                    {practiceStep < QUIZ_QUESTIONS.length - 1 ? "Selanjutnya" : "Lihat Hasil"}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-10 h-10 text-yellow-500" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Latihan Selesai!</h2>
              <p className="text-slate-500 mb-6">Skor kamu: {quizScore} dari {QUIZ_QUESTIONS.length}</p>
              <button 
                onClick={() => { setPracticeStep(0); setQuizScore(0); setShowResult(false); setSelectedPracticeOption(null); setIsPracticeChecked(false); }} 
                className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg"
              >
                Coba Lagi
              </button>
            </div>
          )}
        </div>`;

const QUIZ_BANK = {};
for (let i = 1; i <= 20; i++) {
  QUIZ_BANK[i] = [
    {
      question: "Which phrase is the most polite way to interrupt someone?",
      options: ["Hey, listen!", "Excuse me, may I add something?", "Stop talking."],
      answer: "Excuse me, may I add something?",
      explanation: "Saat situasi formal, selalu gunakan 'May I' atau 'Excuse me' sebelum menyampaikan hal baru."
    },
    {
      question: "How do you respond to 'Thank you' formally?",
      options: ["You're welcome / My pleasure.", "No problem, man.", "Whatever."],
      answer: "You're welcome / My pleasure.",
      explanation: "'My pleasure' adalah respon yang sangat sopan dalam nuansa profesional."
    },
    {
      question: "To disagree politely, what should you say?",
      options: ["You are wrong.", "I see your point, but...", "That's stupid."],
      answer: "I see your point, but...",
      explanation: "Sebelum menyanggah pendapat, akui dulu pendapat orang lain agar tidak terkesan kasar."
    },
    {
      question: "Which of these is a casual greeting?",
      options: ["Good morning, sir.", "How do you do?", "What's up?"],
      answer: "What's up?",
      explanation: "'What's up?' sangat populer dalam percakapan kasual bersama teman sebaya."
    },
    {
      question: "How to express sympathy when someone shares bad news?",
      options: ["Oh well, life goes on.", "I'm really sorry to hear that.", "Thank you."],
      answer: "I'm really sorry to hear that.",
      explanation: "Gunakan 'I am sorry to hear that' untuk menunjukan rasa empati."
    }
  ];
}

for (let i = 1; i <= 20; i++) {
  const file = path.join(__dirname, '../src/pages/module/english/intermediate/speaking/Lesson' + i + '.tsx');
  if (!fs.existsSync(file)) continue;

  let content = fs.readFileSync(file, 'utf8');

  // Insert QUIZ_QUESTIONS array
  if (!content.includes('const QUIZ_QUESTIONS')) {
    const arrayStr = `\nconst QUIZ_QUESTIONS = ${JSON.stringify(QUIZ_BANK[i], null, 2)};\n`;
    if (content.includes('const REVIEW_POINTS =')) {
      content = content.replace('const REVIEW_POINTS =', arrayStr + '\nconst REVIEW_POINTS =');
    } else {
      content = content.replace('const CONVERSATION_SCENARIOS', arrayStr + '\nconst CONVERSATION_SCENARIOS');
    }
  }

  // Insert state variables at the top of the component
  const hookInjection = `\n  const [practiceStep, setPracticeStep] = useState(0);\n  const [selectedPracticeOption, setSelectedPracticeOption] = useState<string | null>(null);\n  const [isPracticeChecked, setIsPracticeChecked] = useState(false);\n  const [quizScore, setQuizScore] = useState(0);\n  const [showResult, setShowResult] = useState(false);\n`;
  if (!content.includes('const [practiceStep')) {
    content = content.replace(/(const playSound =)/, hookInjection + '  $1');
  }

  // Replace old JSX fallback
  const oldFallback = '<div className="py-4">\n          <div className="p-8 text-center text-slate-500">Latihan belum tersedia.</div>\n        </div>';
  const tabSelector = 'tabId === \'practice\' ? (';
  
  if (content.includes(oldFallback)) {
     content = content.replace(oldFallback, UI_QUIZ_BLOCK);
  } else if (content.includes('>Latihan belum tersedia.')) {
     // Regex fallback
     content = content.replace(/<div className="py-4">[\s\S]*?Latihan belum tersedia.[\s\S]*?<\/div>\s*<\/div>/, UI_QUIZ_BLOCK);
  }

  fs.writeFileSync(file, content, 'utf8');
  console.log('Processed Quiz Upgrade for Lesson ' + i);
}
console.log('Done.');
