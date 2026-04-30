/**
 * patch_pronunciation.cjs
 * Adds completion tracking, Next button, success modal to all 10 beginner pronunciation lessons
 * + updates PronunciationPage with real progress tracking
 */
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, 'src/pages/module/english/beginner/pronunciation');
const BASE = '/modul/english/beginner/pronunciation';
const COLOR = '#7C3AED';
const TOTAL = 10;

// ── Helpers ──────────────────────────────────────────────────────────────────
const HELPERS = `
/* ─── Pronunciation Completion Helpers ─── */
const PRONUN_STORAGE_KEY = 'talky_beginner_pronunciation_completed';
function getCompletedPronunLessons(): number[] {
  try { return JSON.parse(localStorage.getItem(PRONUN_STORAGE_KEY) || '[]'); } catch { return []; }
}
function markPronunComplete(lessonId: number) {
  const done = getCompletedPronunLessons();
  if (!done.includes(lessonId)) localStorage.setItem(PRONUN_STORAGE_KEY, JSON.stringify([...done, lessonId]));
}
`;

for (let id = 1; id <= TOTAL; id++) {
  const file = path.join(DIR, `Lesson${id}.tsx`);
  if (!fs.existsSync(file)) { console.warn(`SKIP Lesson${id}`); continue; }

  let src = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');

  if (src.includes('PRONUN_STORAGE_KEY')) {
    console.log(`✓  Lesson${id} already patched`); continue;
  }

  const nextId = id < TOTAL ? id + 1 : null;
  const nextPath = nextId ? `'${BASE}/lesson-${nextId}'` : 'null';
  const accentRe = src.match(/accentColor="(#[^"]+)"/);
  const accent = accentRe ? accentRe[1] : COLOR;

  // ── 1. Add useNavigate import ────────────────────────────────────────────
  if (!src.includes('useNavigate')) {
    src = src.replace(
      "import React, { useState } from 'react';",
      "import React, { useState } from 'react';\nimport { useNavigate } from 'react-router-dom';"
    );
    if (!src.includes('useNavigate')) {
      src = "import { useNavigate } from 'react-router-dom';\n" + src;
    }
  }

  // ── 2. Add helpers after imports ─────────────────────────────────────────
  const lastImportEnd = (() => {
    const lines = src.split('\n');
    let last = 0;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('import ')) last = i;
    }
    return src.indexOf('\n', src.split('\n').slice(0, last + 1).join('\n').length);
  })();
  src = src.slice(0, lastImportEnd + 1) + '\n' + HELPERS + src.slice(lastImportEnd + 1);

  // ── 3. Find component function start and inject state ────────────────────
  // Match: "const PronunLessonN: React.FC = () => {" or "const LessonN: React.FC = () => {"
  const compRe = /const \w+: React\.FC(?:<[^>]+>)? = \(\) => \{/;
  const stateCode = `
  const navigate = useNavigate();
  const nextLessonPath = ${nextPath};
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedPronunLessons().includes(${id}));
  const [showPronunModal, setShowPronunModal] = React.useState(false);
  const handleSelesai = () => { markPronunComplete(${id}); setIsCompleted(true); setShowPronunModal(true); };
`;
  if (compRe.test(src)) {
    src = src.replace(compRe, m => m + stateCode);
  }

  // ── 4. Add nextLesson prop to LessonShell ─────────────────────────────────
  if (!src.includes('nextLesson=') && nextId) {
    src = src.replace(
      `accentColor="${accent}"\n`,
      `accentColor="${accent}"\n            nextLesson={${nextPath}}\n`
    );
    // If that exact pattern fails, try without trailing newline
    if (!src.includes('nextLesson=')) {
      src = src.replace(
        `accentColor="${accent}"`,
        `accentColor="${accent}"\n            nextLesson={${nextPath}}`
      );
    }
  }

  // ── 5. Fix footer button ──────────────────────────────────────────────────
  src = src.replace(
    "onClick={() => window.history.back()}",
    "onClick={isCompleted ? () => navigate(-1) : handleSelesai}"
  );
  // Fix Selesai text
  src = src.replace(
    "\n                    Selesai\n",
    "\n                    {isCompleted ? 'Sudah Selesai \\u2713' : 'Selesai'}\n"
  );
  // Fix footer gradient style - handle any existing style
  src = src.replace(
    /style=\{\{ background: '?`?linear-gradient\(135deg, #[^,]+, #[^)]+\)'?`? \}\}\s*\n(\s+)>\s*\n(\s+)<CheckCircle2/,
    `style={{ background: isCompleted ? 'linear-gradient(135deg, #26C76D, #1ea85a)' : 'linear-gradient(135deg, ${accent}, ${accent}bb)' }}\n$1>\n$2<CheckCircle2`
  );

  // ── 6. Inject modal ────────────────────────────────────────────────────────
  const nextBtn = nextId
    ? `          <button onClick={() => { setShowPronunModal(false); navigate('${BASE}/lesson-${nextId}'); }} className="flex-1 py-3 rounded-xl font-bold text-white shadow-lg" style={{ background: 'linear-gradient(135deg, ${accent}, ${accent}bb)' }}>Next \u203a</button>\n`
    : '';

  const modal = `
  const pronunModal = showPronunModal ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }} onClick={() => setShowPronunModal(false)}>
      <div className="relative bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg, ${accent}, ${accent}99)' }}><span style={{ fontSize: 36 }}>\uD83C\uDFC6</span></div>
        <h2 className="text-xl font-extrabold text-[#1A1A2E] mb-1">Lesson Selesai! \uD83C\uDF89</h2>
        <p className="text-[13px] text-gray-500 mb-5">Kamu telah menyelesaikan <b>Pronunciation Lesson ${id}</b>. Terus semangat!</p>
        <div className="flex justify-center gap-2 mb-6"><span style={{ fontSize: 26 }}>\u2B50</span><span style={{ fontSize: 26 }}>\u2B50</span><span style={{ fontSize: 26 }}>\u2B50</span></div>
        <div className="flex gap-3">
${nextBtn}          <button onClick={() => { setShowPronunModal(false); navigate(-1); }} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700">Kembali</button>
        </div>
      </div>
    </div>
  ) : null;
`;

  // Insert modal before return and wrap in fragment
  src = src.replace(
    '    return (\n        <LessonShell',
    modal + '    return (\n    <>\n    {pronunModal}\n        <LessonShell'
  );

  // Close fragment
  src = src.replace(
    '        </LessonShell>\n    );\n};',
    '        </LessonShell>\n    </>\n  );\n};'
  );

  fs.writeFileSync(file, src, 'utf8');
  console.log(`✅ Lesson${id}.tsx patched`);
}

console.log('\nAll done!');
