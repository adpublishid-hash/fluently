/**
 * Extract upper-intermediate lessons directly from the *Data.ts files.
 * Data is stored as:  const materials: Record<number, {title, content}> = { 1: {...}, 2: {...} }
 * And examples/quizzes as const examples: {lessonId, example, translation}[]
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const SRC_BASE  = 'D:\\aikamus-master\\pages\\module\\english\\upper-intermediate';
const DST_BASE  = 'D:\\talky-main\\talky-main\\src\\pages\\module\\english\\upper-intermediate';

const SUBMODULES = [
  { id: 'grammar',       dataFile: 'grammarData.ts',       accent: '#1A5276', label: 'Grammar',       prefix: 'UpperInterGrammar' },
  { id: 'speaking',      dataFile: 'speakingData.ts',      accent: '#C0392B', label: 'Speaking',      prefix: 'UpperInterSpeaking' },
  { id: 'vocabulary',    dataFile: 'vocabData.ts',         accent: '#117A65', label: 'Vocabulary',    prefix: 'UpperInterVocabulary' },
  { id: 'pronunciation', dataFile: 'pronunciationData.ts', accent: '#6C3483', label: 'Pronunciation', prefix: 'UpperInterPronunciation' },
];

// ── Parse materials record from data file ─────────────────────────────────────

function parseMaterials(src) {
  // Find "const materials" block
  const start = src.indexOf('const materials');
  if (start === -1) return {};

  let i = src.indexOf('{', start);
  if (i === -1) return {};
  let depth = 0, j = i;
  while (j < src.length) {
    if (src[j] === '{') depth++;
    else if (src[j] === '}') { depth--; if (depth === 0) { j++; break; } }
    j++;
  }
  const block = src.substring(i, j);

  // Extract each lesson number and its title/content
  const result = {};
  // Match: 1: { title: "...", content: `...` }
  const re = /(\d+):\s*\{/g;
  let m;
  while ((m = re.exec(block)) !== null) {
    const lessonId = parseInt(m[1]);
    const bStart = m.index + m[0].length - 1; // position of '{'
    let depth2 = 0, k = bStart;
    while (k < block.length) {
      if (block[k] === '{') depth2++;
      else if (block[k] === '}') { depth2--; if (depth2 === 0) { k++; break; } }
      k++;
    }
    const lessonBlock = block.substring(bStart, k);

    const titleM = lessonBlock.match(/title:\s*["'`]([^"'`]+)["'`]/);
    // content might be template literal
    const contentM = lessonBlock.match(/content:\s*`([\s\S]*?)`(?:\s*[,}])/);
    const contentM2 = lessonBlock.match(/content:\s*["']([^"']+)["']/);

    result[lessonId] = {
      title:   titleM ? titleM[1] : `Lesson ${lessonId}`,
      content: (contentM ? contentM[1] : contentM2 ? contentM2[1] : '').trim(),
    };
  }
  return result;
}

// ── Parse examples array from data file ──────────────────────────────────────

function parseExamples(src, lessonId) {
  // Each item: { id, lessonId, example, translation, ... }
  const results = [];
  const re = /\{[^{}]*lessonId:\s*(\d+)[^{}]*\}/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    if (parseInt(m[1]) !== lessonId) continue;
    const block = m[0];
    const exM  = block.match(/example:\s*["'`]([^"'`]+)["'`]/);
    const trM  = block.match(/translation:\s*["'`]([^"'`]+)["'`]/);
    if (exM) {
      results.push({ example: exM[1], translation: trM ? trM[1] : '' });
    }
    if (results.length >= 8) break;
  }
  return results;
}

// ── Parse quizzes from data file ──────────────────────────────────────────────

function parseQuizzes(src, lessonId) {
  const results = [];
  // Quiz items have lessonId and options array
  // Need bigger match since options are arrays
  const startTag = `lessonId: ${lessonId}`;
  let pos = 0;
  while (true) {
    const idx = src.indexOf(startTag, pos);
    if (idx === -1) break;
    // Walk back to find opening {
    let bStart = idx;
    while (bStart > 0 && src[bStart] !== '{') bStart--;
    // Walk forward to find closing }
    let depth = 0, k = bStart;
    while (k < src.length) {
      if (src[k] === '{') depth++;
      else if (src[k] === '}') { depth--; if (depth === 0) { k++; break; } }
      k++;
    }
    const block = src.substring(bStart, k);
    if (block.includes('question:') && block.includes('options:') && block.includes('answer:')) {
      const qM    = block.match(/question:\s*["'`]([^"'`]+)["'`]/);
      const ansM  = block.match(/answer:\s*["'`]([^"'`]+)["'`]/);
      const expM  = block.match(/explanation:\s*["'`]([^"'`]+)["'`]/);
      const optM  = block.match(/options:\s*\[([\s\S]*?)\]/);
      if (qM && ansM && optM) {
        const options = [...optM[1].matchAll(/["'`]([^"'`]+)["'`]/g)].map(x => x[1]);
        results.push({
          question: qM[1],
          options,
          answer: ansM[1],
          explanation: expM ? expM[1] : '',
        });
      }
    }
    pos = k;
    if (results.length >= 5) break;
  }
  return results;
}

// ── Format content as JSX cards ──────────────────────────────────────────────

function contentToJSX(content, accent) {
  if (!content) return '';
  // Parse bold-line format: **Section** → card
  const sections = [];
  let currentSection = null;
  const lines = content.split('\n');

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    if (trimmed.startsWith('**') && trimmed.endsWith('**') &&
        (trimmed.match(/\*\*[A-G]\.\s/) || trimmed.match(/\*\*Tujuan/))) {
      // Section header
      if (currentSection) sections.push(currentSection);
      currentSection = { title: trimmed.replace(/\*\*/g, ''), bullets: [] };
    } else if (currentSection) {
      currentSection.bullets.push(trimmed.replace(/\*\*/g, ''));
    } else {
      if (!currentSection) currentSection = { title: 'Materi', bullets: [] };
      currentSection.bullets.push(trimmed.replace(/\*\*/g, ''));
    }
  }
  if (currentSection) sections.push(currentSection);

  // Keep max 5 sections
  const shown = sections.slice(0, 5);

  const cards = shown.map(s => {
    const bullets = s.bullets.slice(0, 6).map(b => {
      const clean = b.replace(/"/g, '\\"').replace(/`/g, "'");
      return `                  <p className="text-xs text-slate-600 leading-relaxed">• ${clean}</p>`;
    }).join('\n');
    const titleClean = s.title.replace(/"/g, '\\"');
    return `              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                <h3 className="font-bold text-[15px] mb-3" style={{ color: '${accent}' }}>${titleClean}</h3>
${bullets}
              </div>`;
  }).join('\n');

  return `
            <div className="grid gap-4">
${cards}
            </div>`;
}

// ── Build lesson file ─────────────────────────────────────────────────────────

function buildLesson({ compName, accent, label, n, title, content, examples, quizzes }) {
  const introText = content.split('\n').find(l => l.trim() && !l.trim().startsWith('**'))
    ?.trim().replace(/"/g, '\\"').substring(0, 150) + '...' || `Pelajaran ${label} ${n}.`;

  const learnSection = contentToJSX(content, accent);

  const examplesSection = examples.length > 0 ? `
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="bg-slate-50 px-5 py-4 border-b border-slate-100">
                <h3 className="font-bold text-slate-800">📖 Contoh Kalimat</h3>
              </div>
              <div>
                ${examples.map(e => `<div className="p-4 border-b border-slate-50 flex items-start gap-3">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-800 mb-1">${e.example.replace(/"/g,'\\"')}</p>
                    <p className="text-xs text-slate-500 italic">${(e.translation||'').replace(/"/g,'\\"')}</p>
                  </div>
                  <button onClick={() => playSound("${e.example.replace(/"/g,'\\"')}")} className="shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-indigo-100 transition-colors"><Volume2 className="w-4 h-4 text-slate-500" /></button>
                </div>`).join('\n                ')}
              </div>
            </div>` : '';

  const hasQuiz = quizzes.length > 0;
  const quizData = hasQuiz ? JSON.stringify(quizzes, null, 4) : '';

  const quizSection = hasQuiz ? `
        <div className="max-w-xl mx-auto p-4">
          {!showResult ? (
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-indigo-100">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold text-slate-400 uppercase">{quizStep + 1} / {QUIZ_DATA.length}</span>
                <span className="text-xs font-bold bg-indigo-50 text-indigo-600 px-2 py-1 rounded">Skor: {quizScore}</span>
              </div>
              <h3 className="text-base font-bold text-slate-800 mb-5">{QUIZ_DATA[quizStep].question}</h3>
              <div className="space-y-2">
                {QUIZ_DATA[quizStep].options.map((opt: string, idx: number) => {
                  let cls = 'border-slate-200 hover:border-indigo-300';
                  if (answered) {
                    if (opt === QUIZ_DATA[quizStep].answer) cls = 'bg-green-50 border-green-500 text-green-700';
                    else if (opt === picked) cls = 'bg-red-50 border-red-500 text-red-600';
                    else cls = 'opacity-40 border-slate-100';
                  }
                  return (
                    <button key={idx} disabled={answered} onClick={() => pick(opt)}
                      className={\`w-full p-3.5 rounded-xl border-2 text-left text-sm font-medium transition-all \${cls}\`}>
                      {opt}
                    </button>
                  );
                })}
              </div>
              {answered && (
                <div className="mt-4">
                  <p className={\`text-sm p-3 rounded-lg mb-3 \${picked === QUIZ_DATA[quizStep].answer ? 'bg-green-50 text-green-800' : 'bg-orange-50 text-orange-800'}\`}>
                    {QUIZ_DATA[quizStep].explanation}
                  </p>
                  <button onClick={next} className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold">
                    {quizStep < QUIZ_DATA.length - 1 ? 'Selanjutnya' : 'Lihat Hasil'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-10">
              <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Selesai!</h2>
              <p className="text-slate-500 mb-6">Skor: {quizScore} / {QUIZ_DATA.length}</p>
              <button onClick={reset} className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold">Ulangi</button>
            </div>
          )}
        </div>` : `<div className="p-8 text-center text-slate-400">Latihan belum tersedia.</div>`;

  return `import React, { useState } from 'react';
import LessonShell from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, Volume2, Trophy } from 'lucide-react';

${hasQuiz ? `const QUIZ_DATA = ${quizData};` : ''}

const ${compName}: React.FC = () => {
  const playSound = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'en-US'; u.rate = 0.85;
      window.speechSynthesis.speak(u);
    }
  };
${hasQuiz ? `  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [picked, setPicked] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const pick = (opt: string) => {
    if (answered) return;
    setPicked(opt);
    setAnswered(true);
    if (opt === QUIZ_DATA[quizStep].answer) setQuizScore(p => p + 1);
  };
  const next = () => {
    if (quizStep < QUIZ_DATA.length - 1) { setQuizStep(p => p + 1); setPicked(null); setAnswered(false); }
    else setShowResult(true);
  };
  const reset = () => { setQuizStep(0); setQuizScore(0); setShowResult(false); setPicked(null); setAnswered(false); };` : ''}

  return (
    <LessonShell
      title="${title.replace(/"/g, '\\"')}"
      subtitle="${label} • Pelajaran ${n}"
      accentColor="${accent}"
      tabs={[{ id: 'learn', label: 'Pelajari', icon: <BookOpen size={14} /> }, { id: 'practice', label: 'Latihan', icon: <PenTool size={14} /> }]}
      footer={() => (
        <button
          onClick={() => window.history.back()}
          className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg"
          style={{ background: 'linear-gradient(135deg, ${accent}, ${accent}cc)' }}
        >
          <CheckCircle2 size={18} /> Selesai
        </button>
      )}
    >
      {(tabId) => tabId === 'learn' ? (
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 space-y-4 pb-24">
            <div className="rounded-2xl p-5 text-white" style={{ background: 'linear-gradient(135deg, ${accent}, ${accent}99)' }}>
              <h2 className="text-lg font-bold mb-1">${title.replace(/"/g, '\\"')}</h2>
              <p className="text-sm opacity-85 leading-relaxed">${introText}</p>
            </div>
            ${learnSection}
            ${examplesSection}
          </div>
        </div>
      ) : (
        <div className="py-4">
          ${quizSection}
        </div>
      )}
    </LessonShell>
  );
};

export default ${compName};
`;
}

// ── main ─────────────────────────────────────────────────────────────────────

let totalOk = 0, totalFail = 0;

for (const sub of SUBMODULES) {
  const dataFilePath = join(SRC_BASE, sub.dataFile);
  const dstDir = join(DST_BASE, sub.id);
  if (!existsSync(dstDir)) mkdirSync(dstDir, { recursive: true });

  if (!existsSync(dataFilePath)) {
    console.log(`⚠️  Data file not found: ${sub.dataFile}`);
    continue;
  }

  const dataSrc = readFileSync(dataFilePath, 'utf-8').replace(/\r\n/g, '\n');
  console.log(`\n📂 ${sub.id} (${sub.dataFile})`);

  const materials = parseMaterials(dataSrc);
  const lessonCount = Object.keys(materials).length;
  console.log(`  Found ${lessonCount} material entries`);

  for (let n = 1; n <= 20; n++) {
    const mat      = materials[n] || { title: `${sub.label} ${n}`, content: '' };
    const examples = parseExamples(dataSrc, n);
    const quizzes  = parseQuizzes(dataSrc, n);
    const compName = `${sub.prefix}Lesson${n}`;
    const dstFile  = join(dstDir, `Lesson${n}.tsx`);

    try {
      const out = buildLesson({
        compName, accent: sub.accent, label: sub.label, n,
        title: mat.title, content: mat.content,
        examples, quizzes,
      });
      writeFileSync(dstFile, out, 'utf-8');
      const flags = [examples.length > 0 ? `E:${examples.length}` : '', quizzes.length > 0 ? `Q:${quizzes.length}` : ''].filter(Boolean);
      console.log(`  ✅ Lesson${n}.tsx — "${mat.title}" [${flags.join(' ') || 'content only'}]`);
      totalOk++;
    } catch (e) {
      console.error(`  ❌ Lesson${n}: ${e.message}`);
      totalFail++;
    }
  }
}

console.log(`\n✨ Done. OK: ${totalOk}, Failed: ${totalFail}`);
