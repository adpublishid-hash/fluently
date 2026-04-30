/**
 * patch_pronunciation_v2.cjs — comprehensive patch for all 10 pronunciation lessons
 * - Reads/writes as UTF-8
 * - Adds completion tracking, navigate, modal, nextLesson
 * - Fixes mojibake emoji by replacing the UTF-8 encoded Latin-1 sequences
 */
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, 'src/pages/module/english/beginner/pronunciation');
const BASE = '/modul/english/beginner/pronunciation';
const COLOR = '#7C3AED';
const TOTAL = 10;

// Emoji mojibake → correct (these are read correctly as UTF-8 already)
// The mojibake comes from files that had UTF-8 emoji re-encoded, causing display issues
// We simply replace the broken sequences with the correct ones - read file, do JS string replace
const MOJIBAKE = [
  ['ðŸŽ"', '🎓'], ['ðŸŽµ', '🎵'], ['ðŸŽ¶', '🎶'], ['ðŸŽ¤', '🎤'], ['ðŸŽ§', '🎧'],
  ['ðŸŽ‰', '🎉'], ['ðŸ†', '🏆'], ['ðŸ'ª', '💪'], ['ðŸ'¡', '💡'], ['ðŸ"Š', '🔊'],
  ['ðŸ"', '📚'], ['ðŸ"', '📝'], ['ðŸ"–', '📖'], ['ðŸŒŸ', '🌟'], ['ðŸŒ', '🌍'],
  ['ðŸ—£', '🗣'], ['ðŸ¤£', '🤣'], ['ðŸ'', '👍'], ['ðŸ'‹', '👋'], ['ðŸš€', '🚀'],
  ['ðŸ"¥', '🔥'], ['ðŸŽ¯', '🎯'], ['ðŸ'¯', '💯'], ['ðŸ˜Š', '😊'], ['ðŸ˜„', '😄'],
  ['â­', '⭐'], ['â€¢', '•'], ['â€º', '›'], ['â€™', "'"], ['â€œ', '"'], ['â€', '"'],
];

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

  // Read as UTF-8
  let src = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');

  // ── Fix mojibake ────────────────────────────────────────────────────────
  let emojiFixed = 0;
  for (const [bad, good] of MOJIBAKE) {
    if (src.includes(bad)) {
      src = src.split(bad).join(good);
      emojiFixed++;
    }
  }
  if (emojiFixed) console.log(`  → Lesson${id}: ${emojiFixed} emoji fixed`);

  if (src.includes('PRONUN_STORAGE_KEY')) {
    // Already patched — just write back (for emoji fixes only)
    fs.writeFileSync(file, src, 'utf8');
    console.log(`✓  Lesson${id} already patched (emoji updated)`);
    continue;
  }

  const nextId = id < TOTAL ? id + 1 : null;
  const nextPath = nextId ? `'${BASE}/lesson-${nextId}'` : 'null';
  const accentMatch = src.match(/accentColor="(#[^"]+)"/);
  const accent = accentMatch ? accentMatch[1] : COLOR;

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

  // ── 2. Add helpers after last import ─────────────────────────────────────
  const lines = src.split('\n');
  let lastImportLine = 0;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('import ')) lastImportLine = i;
  }
  lines.splice(lastImportLine + 1, 0, HELPERS);
  src = lines.join('\n');

  // ── 3. Find component start and inject state ──────────────────────────────
  const compRe = /const \w+: React\.FC(?:<[^>]+>)? = \(\) => \{/;
  const stateCode = `
  const navigate = useNavigate();
  const nextLessonPath = ${nextPath};
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedPronunLessons().includes(${id}));
  const [showPronunModal, setShowPronunModal] = React.useState(false);
  const handleSelesai = () => { markPronunComplete(${id}); setIsCompleted(true); setShowPronunModal(true); };
`;
  src = src.replace(compRe, m => m + stateCode);

  // ── 4. Add nextLesson prop ────────────────────────────────────────────────
  if (!src.includes('nextLesson=') && nextId) {
    src = src.replace(
      `accentColor="${accent}"`,
      `accentColor="${accent}"\n            nextLesson={${nextPath}}`
    );
  }

  // ── 5. Fix footer onClick ─────────────────────────────────────────────────
  src = src.replace(
    "onClick={() => window.history.back()}",
    "onClick={isCompleted ? () => navigate(-1) : handleSelesai}"
  );
  // Fix Selesai text + gradient
  src = src.replace(
    "\n                    Selesai\n",
    "\n                    {isCompleted ? 'Sudah Selesai \u2713' : 'Selesai'}\n"
  );
  // Try to fix the gradient style (match any existing gradient)
  src = src.replace(
    /style=\{\{ background: 'linear-gradient\(135deg, #[^']+\)' \}\}\s*\n(\s+)>\s*\n(\s+)<CheckCircle2/,
    `style={{ background: isCompleted ? 'linear-gradient(135deg, #26C76D, #1ea85a)' : 'linear-gradient(135deg, ${accent}, ${accent}bb)' }}\n$1>\n$2<CheckCircle2`
  );

  // ── 6. Build modal ─────────────────────────────────────────────────────────
  const nextBtn = nextId
    ? `          <button onClick={() => { setShowPronunModal(false); navigate('${BASE}/lesson-${nextId}'); }} className="flex-1 py-3 rounded-xl font-bold text-white shadow-lg" style={{ background: 'linear-gradient(135deg, ${accent}, ${accent}bb)' }}>Next \u203a</button>\n`
    : '';

  const modal = `
  const pronunModal = showPronunModal ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }} onClick={() => setShowPronunModal(false)}>
      <div className="relative bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg, ${accent}, ${accent}99)' }}><span style={{ fontSize: 36 }}>🏆</span></div>
        <h2 className="text-xl font-extrabold text-[#1A1A2E] mb-1">Lesson Selesai! 🎉</h2>
        <p className="text-[13px] text-gray-500 mb-5">Kamu telah menyelesaikan <b>Pronunciation Lesson ${id}</b>. Terus semangat!</p>
        <div className="flex justify-center gap-2 mb-6"><span style={{ fontSize: 26 }}>⭐</span><span style={{ fontSize: 26 }}>⭐</span><span style={{ fontSize: 26 }}>⭐</span></div>
        <div className="flex gap-3">
${nextBtn}          <button onClick={() => { setShowPronunModal(false); navigate(-1); }} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700">Kembali</button>
        </div>
      </div>
    </div>
  ) : null;
`;

  // ── 7. Inject modal + wrap return ─────────────────────────────────────────
  const returnMatch = src.match(/(\s+return \(\n)(\s+)<LessonShell/);
  if (returnMatch) {
    const retStr = returnMatch[1];
    const lsIndent = returnMatch[2];
    src = src.replace(
      retStr + lsIndent + '<LessonShell',
      modal + retStr + '    <>\n    {pronunModal}\n' + lsIndent + '<LessonShell'
    );
    // Close fragment before );
    src = src.replace(
      lsIndent + '</LessonShell>\n  );\n};',
      lsIndent + '</LessonShell>\n    </>\n  );\n};'
    );
    src = src.replace(
      lsIndent + '</LessonShell>\n    );\n};',
      lsIndent + '</LessonShell>\n    </>\n    );\n};'
    );
  }

  // Write as UTF-8
  fs.writeFileSync(file, src, 'utf8');
  console.log(`✅ Lesson${id}.tsx patched`);
}

console.log('\nAll done!');
