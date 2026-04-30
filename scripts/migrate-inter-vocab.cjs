const fs = require('fs');
const path = require('path');

const srcDir = path.join('d:\\', 'aikamus-master', 'pages', 'module', 'english', 'intermediate', 'vocabulary');
const destDir = path.join(__dirname, '..', 'src', 'pages', 'module', 'english', 'intermediate', 'vocabulary');

for (let i = 1; i <= 20; i++) {
  const srcFile = path.join(srcDir, `Lesson${i}.tsx`);
  const destFile = path.join(destDir, `Lesson${i}.tsx`);

  if (!fs.existsSync(srcFile)) continue;
  const content = fs.readFileSync(srcFile, 'utf8');

  // Extract arrays
  const vocabRegex = /const\s+([A-Z_0-9]+)\s*=\s*\[([\s\S]*?)\];/g;
  let match;
  const vocabArrays = [];
  while ((match = vocabRegex.exec(content)) !== null) {
      if (match[1] !== 'QUIZ_QUESTIONS') {
          vocabArrays.push({ name: match[1], content: match[2] });
      }
  }

  const quizRegex = /const QUIZ_QUESTIONS\s*=\s*\[([\s\S]*?)\];/;
  const quizMatch = content.match(quizRegex);
  const quizContent = quizMatch ? quizMatch[1] : '';

  // Extract title
  const titleMatch = content.match(/<h1[^>]*>([^<]+)<\/h1>/);
  const title = titleMatch ? titleMatch[1] : `Vocabulary Lesson ${i}`;

  // Extract usage content (handling LightBulbIcon translation to Talky's Lightbulb if needed)
  let usageContent = '';
  const usageRegex = /\{activeTab === 'usage' && \(\s*<>([\s\S]*?)<\/>\s*\)\}/;
  const usageMatch = content.match(usageRegex);
  if (usageMatch) {
      usageContent = usageMatch[1];
      usageContent = usageContent.replace(/LightBulbIcon/g, 'Lightbulb');
  }

  // Extract sections names
  // Need the 's' flag so .*? matches across newlines!
  const sectionNamesRegex = /setVocabSection\('([^']+)'\).*?>\s*([^<]+)\s*<\/button>/gsi;
  const sectionsMap = [];
  let secMatch;
  while ((secMatch = sectionNamesRegex.exec(content)) !== null) {
      sectionsMap.push({ id: secMatch[1], label: secMatch[2].trim() });
  }

  // Generate State Initialization & Section Definitions for the learn tab
  let sectionButtonsJSX = '';
  let sectionContentJSX = '';
  let initialSectionId = sectionsMap.length > 0 ? sectionsMap[0].id : 'part1';

  if (sectionsMap.length > 0 && vocabArrays.length === sectionsMap.length) {
      sectionButtonsJSX = `
              <div className="flex flex-wrap justify-center gap-2 mb-6">
${sectionsMap.map((sec, idx) => `
                <button
                  onClick={() => setVocabSection('${sec.id}')}
                  className={\`px-4 py-2 rounded-full text-xs font-bold transition-all \${vocabSection === '${sec.id}' ? 'bg-sky-100 text-sky-700 ring-2 ring-sky-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}\`}
                >
                  ${sec.label}
                </button>
`).join('')}
              </div>
      `;

      sectionContentJSX = sectionsMap.map((sec, idx) => {
          // Extract specific section header from old code (like <h3 className="font-bold text-amber-900 text-sm">Pencapaian Hidup</h3>)
          let secHeaderHtml = '';
          const secBlockRegex = new RegExp(`vocabSection === '${sec.id}' && \\([\\s\\S]*?<h3[^>]*>([^<]*)<\\/h3>[\\s\\S]*?<p[^>]*>([^<]*)<\\/p>[\\s\\S]*?renderVocabList`, 'i');
          const hrMatch = content.match(secBlockRegex);
          let title2 = sec.label;
          let subtitle2 = '';
          if (hrMatch) {
              title2 = hrMatch[1];
              subtitle2 = hrMatch[2];
          }

          return `
              {vocabSection === '${sec.id}' && (
                <div className="animate-fade-in">
                  <div className="bg-sky-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-sky-500 shadow-[var(--shadow-card)]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sky-900 text-sm">${title2}</h3>
                      <p className="text-xs text-sky-700">${subtitle2}</p>
                    </div>
                  </div>
                  {renderVocabList(${vocabArrays[idx].name}, 'sky')}
                </div>
              )}`;
      }).join('\n');
  } else if (vocabArrays.length > 0) {
      // Fallback if regex missed buttons
      sectionContentJSX = `
              <div className="animate-fade-in">
                  <div className="bg-sky-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-sky-500 shadow-[var(--shadow-card)]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sky-900 text-sm">Vocabularies</h3>
                    </div>
                  </div>
                  {renderVocabList(${vocabArrays[0].name}, 'sky')}
              </div>
      `;
  }

  const generatedComponent = `import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import LessonShell from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Trophy, Lightbulb, Sparkles, Star, Volume2 } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

${vocabArrays.map(v => `const ${v.name} = [\n${v.content}\n];`).join('\n\n')}

const QUIZ_QUESTIONS = [
${quizContent}
];

const InterVocabLesson${i}: React.FC = () => {
    const navigate = useNavigate();
    const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('intermediate_vocabulary', ${i});
    const nextLessonPath = ${i} < 20 ? \`/modul/english/intermediate/vocabulary/lesson-\${${i}+1}\` : '/modul/english/intermediate';

    const [vocabSection, setVocabSection] = useState<'${initialSectionId}' | string>('${initialSectionId}');

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
                    className={\`bg-white p-4 rounded-xl border border-[var(--color-border)] shadow-[var(--shadow-card)] flex items-center justify-between group hover:border-\${colorClass}-300 hover:shadow-md transition-all active:scale-95 text-left\`}
                >
                    <div className="flex items-start gap-4">
                        <div className={\`w-10 h-10 rounded-full bg-\${colorClass}-50 text-\${colorClass}-500 flex items-center justify-center flex-shrink-0 font-bold text-sm\`}>
                            {idx + 1}
                        </div>
                        <div>
                            <p className="font-bold text-[var(--color-text-primary)]">{item.word}</p>
                            <p className="text-xs text-[var(--color-text-muted)] font-mono mb-1">{item.ipa}</p>
                            <p className="text-xs text-[var(--color-text-muted)] italic">{item.meaning}</p>
                        </div>
                    </div>
                    <Volume2 className={\`w-5 h-5 text-slate-300 group-hover:text-\${colorClass}-500\`} />
                </button>
            ))}
        </div>
    );

    return (
        <>
            <LessonCompleteModal
                show={showCompleteModal}
                onClose={() => setShowCompleteModal(false)}
                lessonLabel={"Intermediate Vocabulary Lesson ${i}"}
                accentColor="#2980B9"
                nextLessonPath={nextLessonPath}
                onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
                onBack={() => { setShowCompleteModal(false); navigate(-1); }}
            />
            <LessonShell
                title="${title}"
                subtitle="Vocabulary • Pelajaran ${i}"
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
                        style={{ background: isCompleted ? 'linear-gradient(135deg, #26C76D, #1ea85a)' : 'linear-gradient(135deg, #2980B9, #2980B9cc)' }}
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
                                ${sectionButtonsJSX}
                                ${sectionContentJSX}

                                { /* Bonus: Penggunaan Kata & Kolokasi Section */ }
                                <div className="mt-10 animate-fade-in">
                                    ${usageContent}
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
                                                        if (option === QUIZ_QUESTIONS[quizStep].answer) btnClass = "bg-green-50 border-green-500 text-green-700";
                                                        else if (option === selectedOption) btnClass = "bg-red-50 border-red-500 text-red-700";
                                                        else btnClass = "opacity-50 border-[var(--color-border)]";
                                                    }

                                                    return (
                                                        <button
                                                            key={idx}
                                                            onClick={() => handleCheckQuiz(option)}
                                                            disabled={isAnswerChecked}
                                                            className={\`w-full p-4 rounded-xl border text-left font-medium transition-all flex items-center justify-between \${btnClass}\`}
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
                                                    <div className={\`p-3 rounded-lg text-sm mb-4 \${selectedOption === QUIZ_QUESTIONS[quizStep].answer ? 'bg-green-50 text-green-800' : 'bg-orange-50 text-orange-800'}\`}>
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

export default InterVocabLesson${i};
`;

  fs.writeFileSync(destFile, generatedComponent, 'utf8');
  console.log(`Successfully migrated Inter Vocab Lesson ${i}`);
}
