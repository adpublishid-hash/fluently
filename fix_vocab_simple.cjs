/**
 * fix_vocab_simple.cjs — patches Lesson3-11 using exact string matching
 */
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, 'src/pages/module/english/beginner/vocabulary');
const BASE = '/modul/english/beginner/vocabulary';
const COLOR = '#3498DB';

let passed = 0;

for (let id = 3; id <= 11; id++) {
  const file = path.join(DIR, `Lesson${id}.tsx`);
  if (!fs.existsSync(file)) { console.warn(`SKIP`); continue; }

  let src = fs.readFileSync(file, 'utf8');

  if (src.includes('isCompleted') && src.includes('vocabModal')) {
    console.log(`✓  Lesson${id} done`); passed++; continue;
  }

  const nextId = id < 11 ? id + 1 : null;

  // 1. Add useNavigate
  if (!src.includes('useNavigate')) {
    src = src.replace(
      "import React, { useState } from 'react';",
      "import React, { useState } from 'react';\nimport { useNavigate } from 'react-router-dom';"
    );
    if (!src.includes('useNavigate')) {
      // Find any import line and add before it
      src = "import { useNavigate } from 'react-router-dom';\n" + src;
    }
  }

  // 2. Inject state into component
  if (!src.includes('isCompleted')) {
    const nextPathVal = nextId ? `'${BASE}/lesson-${nextId}'` : 'null';
    const stateCode = `  const navigate = useNavigate();
  const nextLessonPath = ${nextPathVal};
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedVocabLessons().includes(${id}));
  const [showVocabModal, setShowVocabModal] = React.useState(false);
  const handleSelesai = () => { markVocabComplete(${id}); setIsCompleted(true); setShowVocabModal(true); };
`;
    // Find component beginning
    const compRe = new RegExp(`const Lesson${id}: React\\.FC(?:<[^>]+>)? = \\(\\) => \\{`);
    src = src.replace(compRe, (m) => m + '\n' + stateCode);
  }

  // 3. Add nextLesson to LessonShell  
  if (!src.includes('nextLesson=') && nextId) {
    // Replace accentColor line followed by tabs
    src = src.replace(
      `accentColor="${COLOR}"\n`,
      `accentColor="${COLOR}"\n            nextLesson={'${BASE}/lesson-${nextId}'}\n`
    );
    // Also try other accentColor variants
    const accentMatch = src.match(/accentColor="(#[^"]+)"/);
    if (accentMatch && !src.includes('nextLesson=')) {
      src = src.replace(
        `accentColor="${accentMatch[1]}"`,
        `accentColor="${COLOR}"\n            nextLesson={'${BASE}/lesson-${nextId}'}`
      );
    }
  }

  // 4. Fix footer button
  if (!src.includes('handleSelesai')) {
    src = src.replace(
      "onClick={() => window.history.back()}",
      "onClick={isCompleted ? () => navigate(-1) : handleSelesai}"
    );
    // Fix style + text (try both template literal and regular string)
    src = src.replace(
      ">\n                    <CheckCircle2 size={18} />\n                    Selesai",
      ">\n                    <CheckCircle2 size={18} />\n                    {isCompleted ? 'Sudah Selesai ✓' : 'Selesai'}"
    );
    // Replace gradient regardless
    src = src.replace(
      /style=\{\{ background: [`'"]linear-gradient\(135deg, #[^,]+, #[^)]+\)[`'"] \}\}\s*\n(\s+)>\n(\s+)<CheckCircle2 size=\{18\} \/>\n/,
      `style={{ background: isCompleted ? 'linear-gradient(135deg, #26C76D, #1ea85a)' : 'linear-gradient(135deg, ${COLOR}, ${COLOR}cc)' }}\n$1>\n$2<CheckCircle2 size={18} />\n`
    );
  }

  // 5. Inject modal + fragment
  if (!src.includes('vocabModal')) {
    const nextBtnJSX = nextId
      ? `          <button onClick={() => { setShowVocabModal(false); navigate('${BASE}/lesson-${nextId}'); }} className="flex-1 py-3 rounded-xl font-bold text-white shadow-lg" style={{ background: 'linear-gradient(135deg, ${COLOR}, ${COLOR}bb)' }}>Next ›</button>\n`
      : '';

    const modal = `
  const vocabModal = showVocabModal ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }} onClick={() => setShowVocabModal(false)}>
      <div className="relative bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg, ${COLOR}, ${COLOR}99)' }}><span style={{ fontSize: 36 }}>🏆</span></div>
        <h2 className="text-xl font-extrabold text-[#1A1A2E] mb-1">Lesson Selesai! 🎉</h2>
        <p className="text-[13px] text-gray-500 mb-5">Kamu telah menyelesaikan <b>Vocabulary Lesson ${id}</b>. Terus semangat!</p>
        <div className="flex justify-center gap-2 mb-6"><span style={{ fontSize: 26 }}>⭐</span><span style={{ fontSize: 26 }}>⭐</span><span style={{ fontSize: 26 }}>⭐</span></div>
        <div className="flex gap-3">
${nextBtnJSX}          <button onClick={() => { setShowVocabModal(false); navigate(-1); }} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700">Kembali</button>
        </div>
      </div>
    </div>
  ) : null;
`;
    src = src.replace(
      '\n  return (\n        <LessonShell',
      `\n${modal}\n  return (\n    <>\n    {vocabModal}\n        <LessonShell`
    );
    // Close fragment
    const closeMatch = src.match(/        <\/LessonShell>\n    \);\n\};\n\nexport default/);
    if (closeMatch) {
      src = src.replace(
        '        </LessonShell>\n    );\n};\n\nexport default',
        '        </LessonShell>\n    </>\n  );\n};\n\nexport default'
      );
    }
  }

  fs.writeFileSync(file, src, 'utf8');
  console.log(`✅ Lesson${id}.tsx`);
  passed++;
}

console.log(`\nDone: ${passed}/9`);
