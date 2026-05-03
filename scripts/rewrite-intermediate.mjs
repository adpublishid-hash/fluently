/**
 * FINAL rewrite: Extract ONLY pure JS data arrays from source,
 * then render them with 100% clean hardcoded JSX template.
 * NO regex JSX extraction - just data extraction.
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const SOURCE_BASE = 'D:\\aikamus-master\\pages\\module\\english\\intermediate';
const TARGET_BASE = 'D:\\talky-main\\talky-main\\src\\pages\\module\\english\\intermediate';

const ACCENT = { grammar:'#8E44AD', speaking:'#E74C3C', vocabulary:'#2980B9', pronunciation:'#16A085' };
const LABEL  = { grammar:'Grammar', speaking:'Speaking', vocabulary:'Vocabulary', pronunciation:'Pronunciation' };
const SUBMODULES = ['grammar', 'speaking', 'vocabulary', 'pronunciation'];

// ----- helpers ---------------------------------------------------------------

/** Extract a named const array/object block from source, e.g. "const FOO = [...]" */
function extractConst(src, name) {
  const start = src.indexOf(`const ${name}`);
  if (start === -1) return null;
  
  let i = src.indexOf('[', start);
  if (i === -1) { i = src.indexOf('{', start); }
  if (i === -1) return null;
  
  const openChar = src[i];
  const closeChar = openChar === '[' ? ']' : '}';
  let depth = 0;
  let j = i;
  while (j < src.length) {
    if (src[j] === openChar) depth++;
    else if (src[j] === closeChar) { depth--; if (depth === 0) { j++; break; } }
    j++;
  }
  return src.substring(start, j) + ';';
}

/** Get the component export name */
function getCompName(src) {
  const m = src.match(/const (Inter[A-Za-z]+Lesson\d+)/);
  return m ? m[1] : null;
}

/** Check if source has quiz questions */
function hasQuiz(src) {
  return src.includes('QUIZ_QUESTIONS');
}

/** Check if source has specific data variable */
function hasVar(src, name) {
  return src.includes(`const ${name}`);
}

// ----- template builders -----------------------------------------------------

function buildGrammarTemplate(sub, n, src) {
  const accent = ACCENT[sub];
  const label = LABEL[sub];
  const compName = getCompName(src) || `Inter${label}Lesson${n}`;
  
  // Extract data blocks
  const quizBlock = extractConst(src, 'QUIZ_QUESTIONS');
  const examplesBlock = extractConst(src, 'GRAMMAR_EXAMPLES') || 
                        extractConst(src, 'SPEAKING_EXAMPLES') ||
                        extractConst(src, 'VOCAB_ITEMS') ||
                        extractConst(src, 'PRONUNCIATION_ITEMS') ||
                        extractConst(src, 'EXAMPLES');
  const conceptsBlock = extractConst(src, 'REVIEW_CONCEPTS') ||
                        extractConst(src, 'CONCEPTS') ||
                        extractConst(src, 'TIPS') ||
                        extractConst(src, 'PHRASES') ||
                        extractConst(src, 'RULES');

  // Get title from source header h1
  const titleMatch = src.match(/<h1[^>]*>([^<]+)<\/h1>/);
  const lessonTitle = titleMatch ? titleMatch[1].trim() : `${label} Pelajaran ${n}`;

  // Get intro text
  const introMatch = src.match(/<h2[^>]*>([^<]+)<\/h2>/);
  const introTitle = introMatch ? introMatch[1].trim() : `${label} ${n}`;
  
  const introPMatch = src.match(/<p className="text-indigo-100[^"]*">([^<]+)<\/p>/);
  const introText = introPMatch ? introPMatch[1].trim() : `Pelajaran ${label} ${n} - tingkat Intermediate.`;

  const hasQuizData = !!quizBlock;
  const hasExamples = !!examplesBlock;
  const hasConcepts = !!conceptsBlock;

  // Data section
  const dataSection = [
    conceptsBlock,
    examplesBlock,
    hasQuizData ? quizBlock : null,
  ].filter(Boolean).join('\n\n');

  const conceptsJSX = hasConcepts ? `
            <div className="grid gap-4 mb-6">
              {CONCEPTS_DATA.map((item: any, idx: number) => (
                <div key={idx} className="bg-white rounded-2xl border p-5 shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-slate-800">{item.title || item.prep || item.phrase || item.word || item.sound || item.topic}</h3>
                    {item.icon && <span className="text-2xl">{item.icon}</span>}
                  </div>
                  <p className="text-sm text-slate-600 mb-3">{item.desc || item.meaning || item.explanation || item.rule}</p>
                  {(item.examples || item.sentences) && (
                    <div className="space-y-1">
                      {(item.examples || item.sentences).map((ex: string, i: number) => (
                        <p key={i} className="text-xs font-medium text-slate-500 bg-slate-50 p-1.5 rounded border border-slate-100">• {ex}</p>
                      ))}
                    </div>
                  )}
                  {item.example && <p className="text-xs font-medium text-slate-500 bg-slate-50 p-1.5 rounded border border-slate-100 mt-2">• {item.example}</p>}
                </div>
              ))}
            </div>` : '';

  const examplesJSX = hasExamples ? `
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-100">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-500" />
                  Contoh Kalimat
                </h3>
                <p className="text-xs text-slate-500 mt-1">Dengar dan ulangi untuk berlatih.</p>
              </div>
              <div className="divide-y divide-slate-100">
                {EXAMPLES_DATA.map((item: any, idx: number) => (
                  <div key={idx} className="p-4 hover:bg-indigo-50 transition-colors flex items-center justify-between">
                    <div>
                      {(item.tag || item.type || item.category) && (
                        <span className="text-[10px] font-bold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100 mb-1 inline-block uppercase tracking-wide">
                          {item.tag || item.type || item.category}
                        </span>
                      )}
                      <p className="text-sm font-bold text-slate-800 mb-1">{item.en || item.word || item.phrase || item.sentence}</p>
                      {(item.id || item.meaning || item.translation) && (
                        <p className="text-xs text-slate-500 italic">{item.id || item.meaning || item.translation}</p>
                      )}
                    </div>
                    <button
                      onClick={() => playSound(item.en || item.word || item.phrase || item.sentence || '')}
                      className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-400 flex items-center justify-center hover:border-indigo-300 hover:text-indigo-600 transition-all shadow-sm flex-shrink-0"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>` : '';

  const quizJSX = hasQuizData ? `
        <div className="max-w-xl mx-auto">
          {!showResult ? (
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-indigo-100">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pertanyaan {quizStep + 1} dari {QUIZ_QUESTIONS.length}</span>
                <span className="text-xs font-bold bg-indigo-50 text-indigo-600 px-2 py-1 rounded">Skor: {quizScore}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-6">{QUIZ_QUESTIONS[quizStep].question}</h3>
              <div className="space-y-3">
                {QUIZ_QUESTIONS[quizStep].options.map((option: string, idx: number) => {
                  let cls = "border-slate-200 hover:border-indigo-300 hover:bg-slate-50";
                  if (isAnswerChecked) {
                    if (option === QUIZ_QUESTIONS[quizStep].answer) cls = "bg-green-50 border-green-500 text-green-700";
                    else if (option === selectedOption) cls = "bg-red-50 border-red-500 text-red-700";
                    else cls = "opacity-50 border-slate-100";
                  }
                  return (
                    <button key={idx} onClick={() => handleCheckQuiz(option)} disabled={isAnswerChecked}
                      className={"w-full p-4 rounded-xl border text-left font-medium transition-all flex items-center justify-between " + cls}>
                      <span>{option}</span>
                      {isAnswerChecked && option === QUIZ_QUESTIONS[quizStep].answer && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                      {isAnswerChecked && option === selectedOption && option !== QUIZ_QUESTIONS[quizStep].answer && <XCircle className="w-5 h-5 text-red-500" />}
                    </button>
                  );
                })}
              </div>
              {isAnswerChecked && (
                <div className="mt-6">
                  <div className={"p-3 rounded-lg text-sm mb-4 " + (selectedOption === QUIZ_QUESTIONS[quizStep].answer ? "bg-green-50 text-green-800" : "bg-orange-50 text-orange-800")}>
                    {QUIZ_QUESTIONS[quizStep].explanation}
                  </div>
                  <button onClick={nextQuizQuestion} className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg">
                    {quizStep < QUIZ_QUESTIONS.length - 1 ? "Pertanyaan Berikutnya" : "Lihat Hasil"}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-10 h-10 text-yellow-500" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Kuis Selesai!</h2>
              <p className="text-slate-500 mb-6">Skor kamu: {quizScore} dari {QUIZ_QUESTIONS.length}</p>
              <button onClick={restartQuiz} className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg">Coba Lagi</button>
            </div>
          )}
        </div>` : `
        <div className="p-8 text-center text-slate-500">Latihan belum tersedia.</div>`;

  // Normalize variable names  
  let normalizedData = dataSection;
  // Rename to generic names for consistent JSX references
  const conceptVarName = dataSection.includes('REVIEW_CONCEPTS') ? 'REVIEW_CONCEPTS' : 
                         dataSection.includes('CONCEPTS') ? 'CONCEPTS' :
                         dataSection.includes('TIPS') ? 'TIPS' :
                         dataSection.includes('PHRASES') ? 'PHRASES' : 
                         dataSection.includes('RULES') ? 'RULES' : null;
  const exampleVarName = dataSection.includes('GRAMMAR_EXAMPLES') ? 'GRAMMAR_EXAMPLES' :
                         dataSection.includes('SPEAKING_EXAMPLES') ? 'SPEAKING_EXAMPLES' :
                         dataSection.includes('VOCAB_ITEMS') ? 'VOCAB_ITEMS' :
                         dataSection.includes('PRONUNCIATION_ITEMS') ? 'PRONUNCIATION_ITEMS' :
                         dataSection.includes('EXAMPLES') ? 'EXAMPLES' : null;

  const conceptsJSXFinal = hasConcepts ? conceptsJSX.replace(/CONCEPTS_DATA/g, conceptVarName) : '';
  const examplesJSXFinal = hasExamples ? examplesJSX.replace(/EXAMPLES_DATA/g, exampleVarName) : '';

  return `import React, { useState } from 'react';
import LessonShell from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Volume2, Trophy, RefreshCw } from 'lucide-react';

${normalizedData}

const ${compName}: React.FC = () => {
  const playSound = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'en-US'; u.rate = 0.9;
      window.speechSynthesis.speak(u);
    }
  };
${hasQuizData ? `
  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  const handleCheckQuiz = (option: string) => {
    if (isAnswerChecked) return;
    setSelectedOption(option);
    setIsAnswerChecked(true);
    if (option === QUIZ_QUESTIONS[quizStep].answer) setQuizScore(p => p + 1);
  };
  const nextQuizQuestion = () => {
    if (quizStep < QUIZ_QUESTIONS.length - 1) { setQuizStep(p => p + 1); setSelectedOption(null); setIsAnswerChecked(false); }
    else setShowResult(true);
  };
  const restartQuiz = () => { setQuizStep(0); setQuizScore(0); setShowResult(false); setSelectedOption(null); setIsAnswerChecked(false); };` : ''}

  return (
    <LessonShell
      title="${lessonTitle}"
      subtitle="${label} • Pelajaran ${n}"
      accentColor="${accent}"
      tabs={[{ id: 'learn', label: 'Pelajari', icon: <BookOpen size={14} /> }, { id: 'practice', label: 'Latihan', icon: <PenTool size={14} /> }]}
      footer={() => (
        <button
          onClick={() => window.history.back()}
          className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg transition-all hover:opacity-90 active:scale-[0.98]"
          style={{ background: 'linear-gradient(135deg, ${accent}, ${accent}cc)' }}
        >
          <CheckCircle2 size={18} />
          Selesai
        </button>
      )}
    >
      {(tabId) => tabId === 'learn' ? (
        <div className="flex-1 overflow-y-auto scroll-smooth">
          <div className="p-4 md:p-8 space-y-6 pb-24">
            <section className="rounded-2xl p-6 shadow-lg text-white relative overflow-hidden" style={{ background: 'linear-gradient(135deg, ${accent}, ${accent}99)' }}>
              <h2 className="text-xl font-bold mb-2">${introTitle}</h2>
              <p className="text-sm opacity-90 leading-relaxed">${introText}</p>
            </section>
            ${conceptsJSXFinal}
            ${examplesJSXFinal}
          </div>
        </div>
      ) : (
        <div className="py-4">
          ${quizJSX}
        </div>
      )}
    </LessonShell>
  );
};

export default ${compName};
`;
}

// ----- main ------------------------------------------------------------------

let ok = 0, fail = 0;

for (const sub of SUBMODULES) {
  const srcDir = join(SOURCE_BASE, sub);
  const dstDir = join(TARGET_BASE, sub);
  if (!existsSync(dstDir)) mkdirSync(dstDir, { recursive: true });

  console.log(`\n📂 ${sub}`);

  for (let n = 1; n <= 20; n++) {
    const srcFile = join(srcDir, `Lesson${n}.tsx`);
    const dstFile = join(dstDir, `Lesson${n}.tsx`);
    if (!existsSync(srcFile)) { console.log(`  ⚠  Lesson${n} not found`); continue; }

    try {
      const raw = readFileSync(srcFile, 'utf-8').replace(/\r\n/g, '\n');
      const out = buildGrammarTemplate(sub, n, raw);
      writeFileSync(dstFile, out, 'utf-8');
      console.log(`  ✅ Lesson${n}.tsx`);
      ok++;
    } catch (e) {
      console.error(`  ❌ Lesson${n}: ${e.message}`);
      fail++;
    }
  }
}

console.log(`\n✨ Done. OK: ${ok}, Failed: ${fail}`);
