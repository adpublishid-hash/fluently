/**
 * fix_grammar_final.cjs
 * Final fix for all grammar lessons: ensure footer button and Lesson1 state are correct
 */
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, 'src/pages/module/english/beginner/grammar');
const BASE = '/modul/english/beginner/grammar';
const ACCENT = '#8E44AD';

// ── Fix Lesson1 (old-style, needs navigate added) ─────────────────────────────
(() => {
  const file = path.join(DIR, 'Lesson1.tsx');
  let src = fs.readFileSync(file, 'utf8');

  // Add useNavigate import if missing
  if (!src.includes('useNavigate')) {
    src = src.replace(
      "import React, { useState } from 'react';",
      "import React, { useState } from 'react';\nimport { useNavigate } from 'react-router-dom';"
    );
  }

  // Add state & handlers if missing
  if (!src.includes('isCompleted')) {
    src = src.replace(
      'const GrammarLesson1: React.FC<LessonProps> = ({ onNavigate, userParams }) => {\n  const navigate = useNavigate();',
      `const GrammarLesson1: React.FC<LessonProps> = ({ onNavigate, userParams }) => {
  const navigate = useNavigate();
  const nextLessonPath = '${BASE}/lesson-2';
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedGrammarLessons().includes(1));
  const [showGrammarModal, setShowGrammarModal] = React.useState(false);
  const handleSelesai = () => { markGrammarComplete(1); setIsCompleted(true); setShowGrammarModal(true); };`
    );
  }

  // Fix footer button
  src = src.replace(
    /onClick=\{\(\) => navigate\(-1\)\}\n(\s+className="w-full py-3\.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg transition-all hover:opacity-90 active:scale-\[0\.98\]")\n(\s+)style=\{\{ background: 'linear-gradient\(135deg, #8E44AD, #8E44ADcc\)' \}\}\n(\s+)>\n(\s+)✅ Selesai/,
    `onClick={isCompleted ? () => navigate(-1) : handleSelesai}\n            className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg transition-all hover:opacity-90 active:scale-[0.98]"\n            style={{ background: isCompleted ? 'linear-gradient(135deg, #26C76D, #1ea85a)' : 'linear-gradient(135deg, ${ACCENT}, ${ACCENT}cc)' }}\n          >\n            {isCompleted ? '✅ Sudah Selesai ✓' : '✅ Selesai'}`
  );

  // Add modal if missing
  if (!src.includes('grammarModal')) {
    const modal = `
  const grammarModal = showGrammarModal ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }} onClick={() => setShowGrammarModal(false)}>
      <div className="relative bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg, ${ACCENT}, ${ACCENT}99)' }}><span style={{ fontSize: 36 }}>🏆</span></div>
        <h2 className="text-xl font-extrabold text-[#1A1A2E] mb-1">Pelajaran Selesai! 🎉</h2>
        <p className="text-[13px] text-gray-500 mb-5">Kamu telah menyelesaikan <b>Grammar Lesson 1</b>. Terus semangat!</p>
        <div className="flex justify-center gap-2 mb-6"><span style={{ fontSize: 26 }}>⭐</span><span style={{ fontSize: 26 }}>⭐</span><span style={{ fontSize: 26 }}>⭐</span></div>
        <div className="flex gap-3">
          <button onClick={() => { setShowGrammarModal(false); navigate(nextLessonPath); }} className="flex-1 py-3 rounded-xl font-bold text-white shadow-lg" style={{ background: 'linear-gradient(135deg, ${ACCENT}, ${ACCENT}bb)' }}>Next ›</button>
          <button onClick={() => { setShowGrammarModal(false); navigate(-1); }} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700">Kembali</button>
        </div>
      </div>
    </div>
  ) : null;
`;
    src = src.replace(
      '\n  return (\n    <div className="flex flex-col h-[100dvh]',
      `\n${modal}\n  return (\n    <>\n    {grammarModal}\n    <div className="flex flex-col h-[100dvh]`
    );
    // Close fragment
    src = src.replace(
      '</div>\n  );\n};\n\nexport default GrammarLesson1;',
      '</div>\n    </>\n  );\n};\n\nexport default GrammarLesson1;'
    );
  }

  fs.writeFileSync(file, src, 'utf8');
  console.log('✅ Lesson1.tsx fixed');
})();

// ── Fix Lesson2-14 (LessonShell-based) ──────────────────────────────────────
for (let id = 2; id <= 14; id++) {
  const file = path.join(DIR, `Lesson${id}.tsx`);
  let src = fs.readFileSync(file, 'utf8');

  // Fix footer button - pattern: window.history.back()
  const oldFooterBack = `onClick={() => window.history.back()}
                    className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg transition-all hover:opacity-90 active:scale-[0.98]"
                    style={{ background: 'linear-gradient(135deg, #8E44AD, #8E44ADcc)' }}
                >
                    <CheckCircle2 size={18} />
                    Selesai`;

  const newFooter = `onClick={isCompleted ? () => navigate(-1) : handleSelesai}
                    className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg transition-all hover:opacity-90 active:scale-[0.98]"
                    style={{ background: isCompleted ? 'linear-gradient(135deg, #26C76D, #1ea85a)' : 'linear-gradient(135deg, #8E44AD, #8E44ADcc)' }}
                >
                    <CheckCircle2 size={18} />
                    {isCompleted ? 'Sudah Selesai ✓' : 'Selesai'}`;

  if (src.includes(oldFooterBack)) {
    src = src.replace(oldFooterBack, newFooter);
    console.log(`  ✅ Lesson${id}: footer fixed`);
  } else if (src.includes('handleSelesai')) {
    console.log(`  ✓  Lesson${id}: footer already fixed`);
  } else {
    // Try alternate format
    src = src.replace(
      "onClick={() => window.history.back()}",
      "onClick={isCompleted ? () => navigate(-1) : handleSelesai}"
    );
    src = src.replace(
      "style={{ background: 'linear-gradient(135deg, #8E44AD, #8E44ADcc)' }}\n                >\n                    <CheckCircle2 size={18} />\n                    Selesai",
      "style={{ background: isCompleted ? 'linear-gradient(135deg, #26C76D, #1ea85a)' : 'linear-gradient(135deg, #8E44AD, #8E44ADcc)' }}\n                >\n                    <CheckCircle2 size={18} />\n                    {isCompleted ? 'Sudah Selesai ✓' : 'Selesai'}"
    );
    console.log(`  ⚠  Lesson${id}: used fallback replacement`);
  }

  fs.writeFileSync(file, src, 'utf8');
}

console.log('\nAll done!');
