/**
 * Smart migration rewrite: detect ALL array variable names automatically,
 * handle upper-intermediate (data in separate file) and advanced (custom var names).
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const AIKAMUS_BASE = 'D:\\aikamus-master\\pages\\module\\english';
const TALKY_BASE   = 'D:\\talky-main\\talky-main\\src\\pages\\module\\english';

const LEVELS = [
  {
    src: 'intermediate', dst: 'intermediate', prefix: 'Inter',
    accent: { grammar:'#8E44AD', speaking:'#E74C3C', vocabulary:'#2980B9', pronunciation:'#16A085' },
    labelMap: { grammar:'Grammar', speaking:'Speaking', vocabulary:'Vocabulary', pronunciation:'Pronunciation' },
    submodules: ['grammar', 'speaking', 'vocabulary', 'pronunciation'],
    dataFiles: null,
  },
  {
    src: 'upper-intermediate', dst: 'upper-intermediate', prefix: 'UpperInter',
    accent: { grammar:'#1A5276', speaking:'#C0392B', vocabulary:'#117A65', pronunciation:'#6C3483' },
    labelMap: { grammar:'Grammar', speaking:'Speaking', vocabulary:'Vocabulary', pronunciation:'Pronunciation' },
    submodules: ['grammar', 'speaking', 'vocabulary', 'pronunciation'],
    dataFiles: {
      grammar:       'grammarData.ts',
      speaking:      'speakingData.ts',
      vocabulary:    'vocabData.ts',
      pronunciation: 'pronunciationData.ts',
    },
  },
  {
    src: 'advanced', dst: 'advanced', prefix: 'Advanced',
    accent: { grammar:'#1B2631', speaking:'#922B21', vocabulary:'#0B5345', pronunciation:'#4A235A' },
    labelMap: { grammar:'Grammar', speaking:'Speaking', vocabulary:'Vocabulary', pronunciation:'Pronunciation' },
    submodules: ['grammar', 'speaking', 'vocabulary', 'pronunciation'],
    dataFiles: null, // data inline in each lesson file
  },
  {
    src: 'proficiency', dst: 'proficiency', prefix: 'Proficiency',
    accent: { grammar:'#1C2833' },
    labelMap: { grammar:'Grammar' },
    submodules: ['grammar'],
    dataFiles: null,
  },
];

// ── helpers ──────────────────────────────────────────────────────────────────

/** Extract a named const array/object block from source */
function extractConst(src, name) {
  const start = src.indexOf(`const ${name}`);
  if (start === -1) return null;
  
  // Find the assignment operator followed by [ or {
  const m = src.substring(start).match(/=\s*([\[\{])/);
  if (!m) return null;
  
  const i = start + m.index + m[0].length - 1;
  const openChar = src[i];
  const closeChar = openChar === '[' ? ']' : '}';
  let depth = 0, j = i;
  while (j < src.length) {
    if (src[j] === openChar) depth++;
    else if (src[j] === closeChar) { depth--; if (depth === 0) { j++; break; } }
    j++;
  }
  return src.substring(start, j) + ';';
}

/** Find ALL top-level const arrays/objects in a source file */
function findAllConsts(src) {
  const found = [];
  const regex = /^const ([A-Z][A-Z0-9_]+)\s*[:=]/gm;
  let m;
  while ((m = regex.exec(src)) !== null) {
    const name = m[1];
    if (!name.match(/^(React|FC)$/)) found.push(name);
  }
  return found;
}

/** Extract material/content text from upper-intermediate data file */
function extractUiDataForLesson(dataFilePath, lessonId, dataType) {
  if (!existsSync(dataFilePath)) return null;
  const src = readFileSync(dataFilePath, 'utf-8').replace(/\r\n/g, '\n');

  if (dataType === 'material') {
    // Look for  N: { title: "...", content: `...` }  block
    const lessonPattern = new RegExp(`\\b${lessonId}:\\s*\\{`);
    const start = src.search(lessonPattern);
    if (start === -1) return null;
    let depth = 0, j = src.indexOf('{', start);
    const blockStart = j;
    while (j < src.length) {
      if (src[j] === '{') depth++;
      else if (src[j] === '}') { depth--; if (depth === 0) { j++; break; } }
      j++;
    }
    const block = src.substring(blockStart, j);
    // Extract title
    const titleM = block.match(/title:\s*["'`]([^"'`]+)["'`]/);
    const title = titleM ? titleM[1] : `Lesson ${lessonId}`;
    // Extract content (grab template literal or string)
    const contentM = block.match(/content:\s*`([\s\S]*?)`/);
    const content = contentM ? contentM[1].trim().substring(0, 300) : 'Materi tersedia di lesson ini.';
    return { title, content };
  }

  if (dataType === 'examples') {
    // Look for lessonId in example records
    const pattern = new RegExp(`lessonId:\\s*${lessonId}[,\\s}]`);
    if (!src.match(pattern)) return null;
    // Find the examples array that contains lessonId: N
    const exRegex = /\{\s*lessonId:\s*(\d+)[\s\S]*?\}/g;
    const filtered = [];
    let em;
    while ((em = exRegex.exec(src)) !== null) {
      if (parseInt(em[1]) === lessonId) {
        const block = em[0];
        const expM = block.match(/example:\s*["'`]([^"'`]*)["'`]/);
        const transM = block.match(/translation:\s*["'`]([^"'`]*)["'`]/);
        if (expM) filtered.push({ example: expM[1], translation: transM?.[1] ?? '' });
        if (filtered.length >= 8) break;
      }
    }
    return filtered.length > 0 ? filtered : null;
  }

  if (dataType === 'quizzes') {
    const quizRegex = /\{\s*lessonId:\s*(\d+)[\s\S]*?\}/g;
    const filtered = [];
    let qm;
    while ((qm = quizRegex.exec(src)) !== null) {
      if (parseInt(qm[1]) === lessonId) {
        const block = qm[0];
        const qM    = block.match(/question:\s*["'`]([^"'`]*)["'`]/);
        const optM  = block.match(/options:\s*\[([^\]]*)\]/);
        const ansM  = block.match(/answer:\s*["'`]([^"'`]*)["'`]/);
        const expM  = block.match(/explanation:\s*["'`]([^"'`]*)["'`]/);
        if (qM && optM && ansM) {
          const options = optM[1].match(/["'`]([^"'`]+)["'`]/g)?.map(s => s.replace(/["'`]/g, '')) ?? [];
          filtered.push({ question: qM[1], options, answer: ansM[1], explanation: expM?.[1] ?? '' });
        }
        if (filtered.length >= 5) break;
      }
    }
    return filtered.length > 0 ? filtered : null;
  }
  return null;
}

// ── template ──────────────────────────────────────────────────────────────────

function buildTemplate({ compName, accentColor, skillLabel, n, lessonTitle, introTitle, introText,
  dataSection, conceptVarName, exampleVarName, hasQuizData, hasConcepts, hasExamples,
  uiExamples, uiMaterial, uiQuizzes }) {

  // If we have UI-extracted data, build inline sections
  let learnContent = '';
  let quizContent = '';

  if (uiMaterial) {
    introTitle = uiMaterial.title;
    introText  = uiMaterial.content.replace(/\n/g, ' ').replace(/"/g, '\\"').substring(0, 200) + '...';
  }

  if (uiExamples && uiExamples.length > 0) {
    const rows = uiExamples.map(e =>
      `              <div className="p-4 border-b border-slate-100 flex items-start justify-between gap-3 hover:bg-indigo-50 transition-colors">
                <div>
                  <p className="text-sm font-bold text-slate-800 mb-1">${e.example.replace(/`/g, "'")}</p>
                  <p className="text-xs text-slate-500 italic">${(e.translation || '').replace(/`/g, "'")}</p>
                </div>
                <button onClick={() => playSound("${e.example.replace(/"/g, '\\"')}")} className="w-8 h-8 shrink-0 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:border-indigo-300 hover:text-indigo-600 transition-all shadow-sm">
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>`
    ).join('\n');
    learnContent += `
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-100">
                <h3 className="font-bold text-slate-800 flex items-center gap-2"><BookOpen className="w-5 h-5 text-indigo-500" /> Contoh Kalimat</h3>
                <p className="text-xs text-slate-500 mt-1">Klik ikon 🔊 untuk mendengarkan.</p>
              </div>
              <div className="divide-y divide-slate-50">
${rows}
              </div>
            </div>`;
  }

  if (uiQuizzes && uiQuizzes.length > 0) {
    const quizDataStr = JSON.stringify(uiQuizzes, null, 2)
      .replace(/"([^"]+)":/g, '$1:');
    hasQuizData = true;
    dataSection = (dataSection || '') + `\nconst QUIZ_QUESTIONS = ${quizDataStr};\n`;
  }

  // Use extracted concept/example vars if available
  if (hasConcepts && conceptVarName) {
    learnContent += `
            <div className="grid gap-4 mb-6">
              {${conceptVarName}.map((item: any, idx: number) => (
                <div key={idx} className="bg-white rounded-2xl border p-5 shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-slate-800">{item.title || item.prep || item.phrase || item.word || item.sound || item.topic}</h3>
                    {item.icon && <span className="text-2xl">{item.icon}</span>}
                  </div>
                  <p className="text-sm text-slate-600 mb-3">{item.desc || item.meaning || item.explanation || item.rule || item.content || item.text}</p>
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
            </div>`;
  }

  if (hasExamples && exampleVarName && !uiExamples) {
    learnContent += `
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-100">
                <h3 className="font-bold text-slate-800 flex items-center gap-2"><BookOpen className="w-5 h-5 text-indigo-500" /> Contoh Kalimat</h3>
                <p className="text-xs text-slate-500 mt-1">Dengar dan ulangi untuk berlatih.</p>
              </div>
              <div className="divide-y divide-slate-100">
                {${exampleVarName}.map((item: any, idx: number) => (
                  <div key={idx} className="p-4 hover:bg-indigo-50 transition-colors flex items-center justify-between">
                    <div>
                      {(item.tag || item.type || item.category) && (
                        <span className="text-[10px] font-bold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100 mb-1 inline-block uppercase tracking-wide">
                          {item.tag || item.type || item.category}
                        </span>
                      )}
                      <p className="text-sm font-bold text-slate-800 mb-1">{item.en || item.word || item.phrase || item.sentence || item.example}</p>
                      {(item.id || item.meaning || item.translation) && (
                        <p className="text-xs text-slate-500 italic">{item.id || item.meaning || item.translation}</p>
                      )}
                    </div>
                    <button
                      onClick={() => playSound(item.en || item.word || item.phrase || item.sentence || item.example || '')}
                      className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-400 flex items-center justify-center hover:border-indigo-300 hover:text-indigo-600 transition-all shadow-sm flex-shrink-0"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>`;
  }

  if (hasQuizData) {
    quizContent = `
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
        </div>`;
  } else {
    quizContent = `<div className="p-8 text-center text-slate-500">Latihan belum tersedia.</div>`;
  }

  return `import React, { useState } from 'react';
import LessonShell from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Volume2, Trophy, RefreshCw } from 'lucide-react';

${dataSection || ''}

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
      subtitle="${skillLabel} • Pelajaran ${n}"
      accentColor="${accentColor}"
      tabs={[{ id: 'learn', label: 'Pelajari', icon: <BookOpen size={14} /> }, { id: 'practice', label: 'Latihan', icon: <PenTool size={14} /> }]}
      footer={() => (
        <button
          onClick={() => window.history.back()}
          className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg transition-all hover:opacity-90 active:scale-[0.98]"
          style={{ background: 'linear-gradient(135deg, ${accentColor}, ${accentColor}cc)' }}
        >
          <CheckCircle2 size={18} />
          Selesai
        </button>
      )}
    >
      {(tabId) => tabId === 'learn' ? (
        <div className="flex-1 overflow-y-auto scroll-smooth">
          <div className="p-4 md:p-8 space-y-6 pb-24">
            <section className="rounded-2xl p-6 shadow-lg text-white relative overflow-hidden" style={{ background: 'linear-gradient(135deg, ${accentColor}, ${accentColor}99)' }}>
              <h2 className="text-xl font-bold mb-2">${introTitle}</h2>
              <p className="text-sm opacity-90 leading-relaxed">${introText}</p>
            </section>
            ${learnContent}
          </div>
        </div>
      ) : (
        <div className="py-4">
          ${quizContent}
        </div>
      )}
    </LessonShell>
  );
};

export default ${compName};
`;
}

// ── main ──────────────────────────────────────────────────────────────────────

let totalOk = 0, totalFail = 0;

for (const level of LEVELS) {
  console.log(`\n🔷 Level: ${level.src}`);

  for (const sub of level.submodules) {
    const srcDir  = join(AIKAMUS_BASE, level.src, sub);
    const dstDir  = join(TALKY_BASE, level.dst, sub);
    const accentColor = level.accent[sub];
    const skillLabel  = level.labelMap[sub];
    if (!existsSync(dstDir)) mkdirSync(dstDir, { recursive: true });

    // Load data file for upper-intermediate
    let dataFilePath = null;
    if (level.dataFiles && level.dataFiles[sub]) {
      dataFilePath = join(AIKAMUS_BASE, level.src, level.dataFiles[sub]);
    }

    console.log(`\n  📂 ${sub}`);

    for (let n = 1; n <= 20; n++) {
      const srcFile = join(srcDir, `Lesson${n}.tsx`);
      const dstFile = join(dstDir, `Lesson${n}.tsx`);
      if (!existsSync(srcFile)) { console.log(`    ⚠  Lesson${n} not found`); continue; }

      try {
        const raw = readFileSync(srcFile, 'utf-8').replace(/\r\n/g, '\n');
        const compName = `${level.prefix}${skillLabel.replace(/ /g,'')}Lesson${n}`;

        // For upper-intermediate (data in separate file)
        let uiMaterial = null, uiExamples = null, uiQuizzes = null;
        if (dataFilePath && existsSync(dataFilePath)) {
          uiMaterial = extractUiDataForLesson(dataFilePath, n, 'material');
          uiExamples = extractUiDataForLesson(dataFilePath, n, 'examples');
          uiQuizzes  = extractUiDataForLesson(dataFilePath, n, 'quizzes');
        }

        // Find all top-level const arrays in the lesson file
        const allConsts = findAllConsts(raw);
        let conceptVarName = null, exampleVarName = null;

        for (const name of allConsts) {
          if (/QUIZ/.test(name)) continue;
          if (!conceptVarName && /CONCEPT|REVIEW|RULE|TIP|PHRASE|MATERIAL|PATTERN|ERROR|ITEM|STRUCTURE|SCENARIO|VS|DIFFERENCE|LIST/.test(name)) conceptVarName = name;
          if (!exampleVarName && /EXAMPLE|VOCAB|PRONUN|SENTENCE|SPEAK/.test(name)) exampleVarName = name;
        }

        const quizBlock      = raw.includes('const QUIZ_QUESTIONS') ? extractConst(raw, 'QUIZ_QUESTIONS') : null;
        const conceptsBlock  = conceptVarName ? extractConst(raw, conceptVarName) : null;
        if (exampleVarName === conceptVarName) exampleVarName = null;
        const examplesBlock  = exampleVarName ? extractConst(raw, exampleVarName) : null;

        const titleMatch  = raw.match(/<h1[^>]*>([^<]+)<\/h1>/);
        const lessonTitle = titleMatch ? titleMatch[1].trim() : `${skillLabel} Pelajaran ${n}`;
        const introMatch  = raw.match(/<h2[^>]*>([^<]+)<\/h2>/);
        const introTitle  = uiMaterial?.title ?? (introMatch ? introMatch[1].trim() : `${skillLabel} ${n}`);
        const introPMatch = raw.match(/<p[^>]*text-indigo-100[^>]*>([^<]+)<\/p>/);
        const introText   = uiMaterial?.content.substring(0, 200).replace(/\n/g,' ').replace(/"/g,'\\"') + '...'
                          ?? (introPMatch ? introPMatch[1].trim() : `Pelajaran ${skillLabel} ${n}.`);

        const hasQuizData  = !!quizBlock || (uiQuizzes && uiQuizzes.length > 0);
        const hasConcepts  = !!conceptsBlock;
        const hasExamples  = !!examplesBlock;
        let dataSection = [conceptsBlock, examplesBlock, quizBlock].filter(Boolean).join('\n\n');

        if (uiQuizzes && uiQuizzes.length > 0 && !quizBlock) {
          const quizDataStr = JSON.stringify(uiQuizzes, null, 2);
          dataSection += `\n\nconst QUIZ_QUESTIONS = ${quizDataStr};`;
        }

        const out = buildTemplate({
          compName, accentColor, skillLabel, n,
          lessonTitle, introTitle, introText,
          dataSection, conceptVarName, exampleVarName,
          hasQuizData, hasConcepts, hasExamples,
          uiExamples: (!hasExamples && uiExamples) ? uiExamples : null,
          uiMaterial, uiQuizzes: (!quizBlock && uiQuizzes) ? uiQuizzes : null,
        });

        writeFileSync(dstFile, out, 'utf-8');
        const flags = [hasConcepts?'C':'', hasExamples?'E':'', hasQuizData?'Q':''].filter(Boolean).join('+');
        console.log(`    ✅ Lesson${n}.tsx [${flags || 'banner only'}]`);
        totalOk++;
      } catch (e) {
        console.error(`    ❌ Lesson${n}: ${e.message}`);
        totalFail++;
      }
    }
  }
}

console.log(`\n✨ Done. OK: ${totalOk}, Failed: ${totalFail}`);
