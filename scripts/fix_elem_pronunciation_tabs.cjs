/**
 * Fix elementary pronunciation Lessons 2-15:
 *  1. Add missing imports (motion, lucide-react icons, custom Icons).
 *  2. Replace broken setActiveTab/onNavigate refs.
 *  3. Replace the blank "Tantangan akan segera hadir" placeholder with
 *     a functional Shadowing challenge driven by existing data arrays.
 */
const fs = require('fs');
const path = require('path');

const LESSONS_DIR = path.join(__dirname, '..', 'src', 'pages', 'module', 'english', 'elementary', 'pronunciation');

// Pick the first array suitable for shadowing from each lesson.
// Map lesson -> { arrayName, itemTextField } — the field that holds the sentence/word to read.
const SHADOWING_SOURCE = {
  2: { name: 'LISTENING_CHALLENGE', field: 'word', label: 'Dengarkan & pilih suara yang benar', optionsField: 'options', answerField: 'answer' },
  3: { name: 'PRACTICE_WORDS', field: 'word' },
  4: { name: 'RHYTHM_DRILLS', field: 'sentence' },
  5: { name: 'PRACTICE_SENTENCES', field: 'sentence' },
  6: { name: 'PRACTICE_ITEMS', field: 'sentence' },
  7: { name: 'CLUSTER_CHALLENGES', field: 'word' },
  8: { name: 'PRACTICE_SENTENCES', field: 'sentence' },
  9: { name: 'PRACTICE_ITEMS', field: 'sentence' },
  10: { name: 'TONGUE_TWISTERS', field: 'text' },
  11: { name: 'PRACTICE_SENTENCES', field: 'sentence' },
  12: { name: 'WARMUP_PHRASES', field: 'text' },
  13: { name: 'PRACTICE_SENTENCES', field: 'sentence' },
  14: { name: 'ACCENT_COMPARISONS', field: 'word' },
  15: { name: 'SOUND_TEST_ITEMS', field: 'word' },
};

// Build standard import block to add after existing imports.
const STANDARD_IMPORTS = `import { motion } from 'framer-motion';
import { Volume2, CheckCircle2, XCircle, BookOpen, PenTool, Star, Lightbulb, PlayCircle } from 'lucide-react';
import { StarIcon, FlameIcon, MicIcon, TrendUpIcon, TrophyIcon, RefreshIcon } from '../../../../../components/Icons';
`;

function detectField(code, arrayName) {
  // Match first item of array declaration to guess field.
  const re = new RegExp(`const ${arrayName}[\\s\\S]*?=\\s*\\[\\s*\\{([^}]+)\\}`, 'm');
  const m = code.match(re);
  if (!m) return null;
  const body = m[1];
  for (const f of ['sentence', 'text', 'word', 'phrase']) {
    if (new RegExp(`\\b${f}\\s*:`).test(body)) return f;
  }
  return null;
}

function buildShadowingBlock(arrayName, field, extra) {
  const listening = extra && extra.optionsField;
  if (listening) {
    return `
        <div className="max-w-xl mx-auto p-4 md:p-8 pb-24 animate-fade-in">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100 text-center">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Tantangan Mendengarkan</h3>
            <p className="text-xs text-slate-500 mb-4">Tekan tombol audio — pilih suara yang benar.</p>
            <button
              onClick={() => playSound(${arrayName}[practiceStep % ${arrayName}.length].${field})}
              className="w-20 h-20 bg-pink-50 text-pink-600 rounded-full flex items-center justify-center mx-auto hover:bg-pink-100 transition-all shadow-inner mb-6"
            >
              <Volume2 size={32} />
            </button>
            <div className="grid grid-cols-1 gap-3">
              {${arrayName}[practiceStep % ${arrayName}.length].${extra.optionsField}.map((opt: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => handlePracticeCheck(opt)}
                  disabled={!!practiceFeedback}
                  className="py-3 rounded-xl border-2 border-slate-200 hover:border-pink-400 hover:bg-pink-50 font-bold text-slate-700 transition-all active:scale-95 text-sm disabled:opacity-60"
                >
                  {opt}
                </button>
              ))}
            </div>
            {practiceFeedback && (
              <div className={\`mt-5 font-bold \${practiceFeedback === 'correct' ? 'text-green-600' : 'text-red-500'}\`}>
                {practiceFeedback === 'correct' ? 'Benar! 🎉' : 'Ups! Coba lagi.'}
              </div>
            )}
            <div className="mt-6 text-xs text-slate-400">
              Soal {(practiceStep % ${arrayName}.length) + 1} dari {${arrayName}.length}
            </div>
          </div>
        </div>
      `;
  }
  return `
        <div className="max-w-xl mx-auto p-4 md:p-8 pb-24 animate-fade-in">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 text-center">Tantangan Shadowing</h3>
            <p className="text-xs text-slate-500 mb-6 text-center">Tekan tombol putar lalu ulangi dengan lantang.</p>
            <div className="space-y-3">
              {${arrayName}.map((item: any, idx: number) => (
                <div key={idx} className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50">
                  <button
                    onClick={() => playSound(item.${field})}
                    className="w-11 h-11 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center shrink-0 hover:bg-pink-200 transition-all"
                  >
                    <Volume2 size={18} />
                  </button>
                  <p className="flex-1 text-sm font-semibold text-slate-800">{item.${field}}</p>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-slate-400 text-center mt-5 italic">🎤 Ucapkan setiap kalimat 3x — fokus pada ritme dan intonasi.</p>
          </div>
        </div>
      `;
}

function fixFile(num) {
  const file = path.join(LESSONS_DIR, `Lesson${num}.tsx`);
  let code = fs.readFileSync(file, 'utf8');
  const orig = code;

  // 1. Add standard imports if not present (add after the last existing import line)
  if (!code.includes("from 'lucide-react'") && !code.includes("from 'framer-motion'")) {
    // Insert after the last top-of-file import line
    const importRe = /^(import[\s\S]*?;)\n/gm;
    let lastMatch; let m;
    while ((m = importRe.exec(code)) !== null) { lastMatch = m; }
    if (lastMatch) {
      const insertAt = lastMatch.index + lastMatch[0].length;
      code = code.slice(0, insertAt) + STANDARD_IMPORTS + code.slice(insertAt);
    }
  } else {
    // Already has some. Normalize by replacing existing with standard block.
    // Remove existing lucide-react / framer-motion / Icons imports and re-add standard block.
    code = code.replace(/^import .*? from ['"]framer-motion['"];\s*\n/m, '');
    code = code.replace(/^import .*? from ['"]lucide-react['"];\s*\n/m, '');
    code = code.replace(/^import [^;]*?components\/Icons['"];\s*\n/m, '');
    const importRe = /^(import[\s\S]*?;)\n/gm;
    let lastMatch; let m;
    while ((m = importRe.exec(code)) !== null) { lastMatch = m; }
    if (lastMatch) {
      const insertAt = lastMatch.index + lastMatch[0].length;
      code = code.slice(0, insertAt) + STANDARD_IMPORTS + code.slice(insertAt);
    }
  }

  // 2. Neutralize broken refs
  code = code.replace(/setActiveTab\(['"]quiz['"]\);?/g, '/* setActiveTab removed */');
  code = code.replace(/onNavigate\(ViewState\.MODULES_LESSON_LIST\)/g, 'navigate(-1)');

  // 3. Replace the blank challenge placeholder with a real challenge block
  const source = SHADOWING_SOURCE[num];
  if (source) {
    const field = source.field || detectField(code, source.name) || 'sentence';
    const block = buildShadowingBlock(source.name, field, source);

    // Match the placeholder challenge wrapper
    const placeholderRe = /\) : tabId === 'challenge' \? \(\s*<div className="max-w-xl mx-auto p-4 md:p-8 pb-24 animate-fade-in">\s*<div className="p-6 text-center">\s*<p className="text-\[var\(--color-text-secondary\)\] text-sm">Tantangan untuk pelajaran ini akan segera hadir\. 🎯<\/p>\s*<\/div>\s*<\/div>\s*\) : tabId === 'practice'/;
    if (placeholderRe.test(code)) {
      code = code.replace(placeholderRe, `) : tabId === 'challenge' ? (${block}) : tabId === 'practice'`);
    }
  }

  // 4. Ensure practiceStep state variable exists if file uses it
  if (/practiceStep/.test(code) && !/\[practiceStep,\s*setPracticeStep\]/.test(code)) {
    // Add state declaration near top of component
    code = code.replace(
      /(const \[practiceFeedback,\s*setPracticeFeedback\][^;]*;)/,
      `const [practiceStep, setPracticeStep] = useState(0);\n  $1`
    );
  }

  if (code !== orig) {
    fs.writeFileSync(file, code);
    console.log(`✓ Fixed Lesson${num}.tsx`);
  } else {
    console.log(`- No change Lesson${num}.tsx`);
  }
}

for (let i = 2; i <= 15; i++) fixFile(i);
console.log('Done.');
