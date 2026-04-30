/**
 * fix_vocabulary_lessons.cjs
 * Patches Lesson2-11 (LessonShell structure) + verifies Lesson1
 */
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, 'src/pages/module/english/beginner/vocabulary');
const TOTAL = 11;
const BASE = '/modul/english/beginner/vocabulary';
const COLOR = '#3498DB';

let passed = 0;

for (let id = 2; id <= TOTAL; id++) {
  const file = path.join(DIR, `Lesson${id}.tsx`);
  if (!fs.existsSync(file)) { console.warn(`SKIP: Lesson${id}.tsx`); continue; }

  let src = fs.readFileSync(file, 'utf8');

  if (src.includes('isCompleted') && src.includes('vocabModal')) {
    console.log(`✓  Lesson${id} already patched`);
    passed++; continue;
  }

  const nextId = id < TOTAL ? id + 1 : null;
  const nextPath = nextId ? `'${BASE}/lesson-${nextId}'` : 'null';

  // ── 1. Add useNavigate import ─────────────────────────────────────────────
  if (!src.includes('useNavigate')) {
    src = src.replace(
      "import React, { useState } from 'react';",
      "import React, { useState } from 'react';\nimport { useNavigate } from 'react-router-dom';"
    );
    // If no React import, add after first import
    if (!src.includes('useNavigate')) {
      src = src.replace(
        /^(import )/m,
        "import { useNavigate } from 'react-router-dom';\n$1"
      );
    }
  }

  // ── 2. Inject state at component start ───────────────────────────────────
  if (!src.includes('isCompleted')) {
    const stateCode = `  const navigate = useNavigate();
  const nextLessonPath = ${nextPath};
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedVocabLessons().includes(${id}));
  const [showVocabModal, setShowVocabModal] = React.useState(false);
  const handleSelesai = () => { markVocabComplete(${id}); setIsCompleted(true); setShowVocabModal(true); };
`;

    // Pattern: const LessonN: React.FC = () => {
    const compPattern = new RegExp(`const Lesson${id}: React\\.FC(?:<[^>]+>)? = \\(\\) => \\{`);
    if (compPattern.test(src)) {
      src = src.replace(compPattern, (m) => m + '\n' + stateCode);
    }
  }

  // ── 3. Add nextLesson to LessonShell ─────────────────────────────────────
  if (!src.includes('nextLesson=') && nextId) {
    src = src.replace(
      /accentColor="[^"]+"\n(\s+)tabs=\[/,
      `accentColor="${COLOR}"\n$1nextLesson={'${BASE}/lesson-${nextId}'}\n$1tabs=[`
    );
    src = src.replace(
      /accentColor="[^"]+"\n(\s+)tabs=\{/,
      `accentColor="${COLOR}"\n$1nextLesson={'${BASE}/lesson-${nextId}'}\n$1tabs={`
    );
  }

  // ── 4. Replace footer Selesai button ─────────────────────────────────────
  if (!src.includes('handleSelesai')) {
    // onClick
    src = src.replace(
      "onClick={() => window.history.back()}",
      "onClick={isCompleted ? () => navigate(-1) : handleSelesai}"
    );
    // Gradient + text
    src = src.replace(
      /style=\{\{ background: `linear-gradient\(135deg, \$\{'#[^']+'\}, \$\{'#[^']+'\}cc\)`[^}]*\}\}\s*>\s*<CheckCircle2 size=\{18\} \/>\s*Selesai/s,
      `style={{ background: isCompleted ? 'linear-gradient(135deg, #26C76D, #1ea85a)' : 'linear-gradient(135deg, ${COLOR}, ${COLOR}cc)' }}
                >
                    <CheckCircle2 size={18} />
                    {isCompleted ? 'Sudah Selesai ✓' : 'Selesai'}`
    );
    // Fallback simpler replace
    src = src.replace(
      />
                    <CheckCircle2 size={18} \/>\n\s+Selesai/,
      `>
                    <CheckCircle2 size={18} />
                    {isCompleted ? 'Sudah Selesai ✓' : 'Selesai'}`
    );
  }

  // ── 5. Inject modal + wrap fragment ──────────────────────────────────────
  if (!src.includes('vocabModal')) {
    const nextBtnJSX = nextId
      ? `          <button onClick={() => { setShowVocabModal(false); navigate('${BASE}/lesson-${nextId}'); }} className="flex-1 py-3 rounded-xl font-bold text-white shadow-lg" style={{ background: 'linear-gradient(135deg, ${COLOR}, ${COLOR}bb)' }}>Next ›</button>\n`
      : '';

    const modal = `
  const vocabModal = showVocabModal ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }} onClick={() => setShowVocabModal(false)}>
      <div className="relative bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg, ${COLOR}, ${COLOR}99)' }}>
          <span style={{ fontSize: 36 }}>🏆</span>
        </div>
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
      /\n  return \(\n(\s+)<LessonShell/,
      `\n${modal}\n  return (\n    <>\n    {vocabModal}\n    <LessonShell`
    );

    // Close fragment
    src = src.replace(
      /(\s+<\/LessonShell>\n\s+\);\n\};\n\nexport default)/,
      '\n    </LessonShell>\n    </>\n  );\n};\n\nexport default'
    );
    // Also handle trailing ) with 4 spaces
    if (!src.includes('</>\n  );')) {
      src = src.replace(
        /    <\/LessonShell>\n    \);\n\};\n\nexport default/,
        '    </LessonShell>\n    </>\n  );\n};\n\nexport default'
      );
    }
  }

  fs.writeFileSync(file, src, 'utf8');
  console.log(`✅ Lesson${id}.tsx patched`);
  passed++;
}

console.log(`\nDone: ${passed}/${TOTAL - 1}`);
