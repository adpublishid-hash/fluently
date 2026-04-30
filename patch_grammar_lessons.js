/**
 * patch_grammar_lessons.js — patches beginner grammar Lesson1-14
 * Run: node patch_grammar_lessons.js (from talky-main root)
 */
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, 'src/pages/module/english/beginner/grammar');
const TOTAL = 14;
const BASE = '/modul/english/beginner/grammar';
const ACCENT = '#8E44AD';

let passed = 0, failed = 0;

for (let lessonId = 1; lessonId <= TOTAL; lessonId++) {
  const file = path.join(DIR, `Lesson${lessonId}.tsx`);
  if (!fs.existsSync(file)) { console.warn(`SKIP Lesson${lessonId}.tsx`); failed++; continue; }

  let src = fs.readFileSync(file, 'utf8');

  // ── Guard: skip if already patched ──────────────────────────────────────
  if (src.includes('GRAMMAR_STORAGE_KEY')) {
    console.log(`SKIP (already patched): Lesson${lessonId}.tsx`);
    passed++;
    continue;
  }

  // ── 1. Inject helpers after import block ────────────────────────────────
  const helpers = `
/* ─── Grammar Completion Helpers ─── */
const GRAMMAR_STORAGE_KEY = 'talky_beginner_grammar_completed';
function getCompletedGrammarLessons(): number[] {
  try { return JSON.parse(localStorage.getItem(GRAMMAR_STORAGE_KEY) || '[]'); } catch { return []; }
}
function markGrammarComplete(id: number) {
  const done = getCompletedGrammarLessons();
  if (!done.includes(id)) localStorage.setItem(GRAMMAR_STORAGE_KEY, JSON.stringify([...done, id]));
}

`;

  // Insert helpers before the first const/interface/function after imports
  src = src.replace(
    /^((?:import [^\n]+\n)+)\n/m,
    (match) => match + helpers
  );

  // ── 2. Inject state + handler inside component (after useNavigate) ──────
  const nextId = lessonId < TOTAL ? lessonId + 1 : null;
  const stateBlock = `
  const nextLessonPath = ${nextId !== null ? `'${BASE}/lesson-${nextId}'` : 'null'};
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedGrammarLessons().includes(${lessonId}));
  const [showGrammarModal, setShowGrammarModal] = React.useState(false);
  const handleSelesai = () => {
    markGrammarComplete(${lessonId});
    setIsCompleted(true);
    setShowGrammarModal(true);
  };
`;

  src = src.replace(
    /const navigate = useNavigate\(\);/,
    `const navigate = useNavigate();\n${stateBlock}`
  );

  // ── 3. Replace MoreIcon button → Next Lesson button ──────────────────────
  src = src.replace(
    /<button className="w-10 h-10 -mr-2 rounded-full flex items-center justify-center hover:bg-slate-50 text-slate-600 active:bg-slate-100">\s*<MoreIcon className="w-6 h-6" \/>\s*<\/button>/s,
    `{nextLessonPath ? (
            <button
              onClick={() => navigate(nextLessonPath)}
              className="flex items-center gap-1 px-3 h-9 rounded-full text-xs font-bold text-white"
              style={{ background: '${ACCENT}', boxShadow: '0 2px 10px ${ACCENT}55' }}
            >
              Next ›
            </button>
          ) : (
            <div className="w-10" />
          )}`
  );

  // ── 4. Replace Selesai footer button ──────────────────────────────────────
  // Original pattern varies slightly per file, so match broadly
  src = src.replace(
    /<button\s+onClick=\{[^}]*navigate\(-1\)[^}]*\}\s+className="w-full py-3\.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg transition-all hover:opacity-90 active:scale-\[0\.98\]"\s+style=\{\{[^}]*\}\}\s*>\s*✅ Selesai\s*<\/button>/s,
    `<button
              onClick={isCompleted ? () => navigate(-1) : handleSelesai}
              className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg transition-all hover:opacity-90 active:scale-[0.98]"
              style={{ background: isCompleted ? 'linear-gradient(135deg, #26C76D, #1ea85a)' : 'linear-gradient(135deg, ${ACCENT}, ${ACCENT}cc)' }}
            >
              {isCompleted ? '✅ Sudah Selesai ✓' : '✅ Selesai'}
            </button>`
  );

  // ── 5. Inject modal + wrap return in fragment ──────────────────────────────
  const modal = `
  /* ── Grammar Success Modal ── */
  const grammarModal = showGrammarModal ? (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}
      onClick={() => setShowGrammarModal(false)}
    >
      <div
        className="relative bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg, ${ACCENT}, ${ACCENT}99)' }}>
          <span style={{ fontSize: 36 }}>🏆</span>
        </div>
        <h2 className="text-xl font-extrabold text-[#1A1A2E] mb-1">Pelajaran Selesai! 🎉</h2>
        <p className="text-[13px] text-gray-500 mb-5">
          Kamu telah menyelesaikan <b>Grammar Lesson ${lessonId}</b>. Terus semangat!
        </p>
        <div className="flex justify-center gap-2 mb-6">
          <span style={{ fontSize: 26 }}>⭐</span>
          <span style={{ fontSize: 26 }}>⭐</span>
          <span style={{ fontSize: 26 }}>⭐</span>
        </div>
        <div className="flex gap-3">
          {nextLessonPath && (
            <button
              onClick={() => { setShowGrammarModal(false); navigate(nextLessonPath); }}
              className="flex-1 py-3 rounded-xl font-bold text-white shadow-lg"
              style={{ background: 'linear-gradient(135deg, ${ACCENT}, ${ACCENT}bb)' }}
            >
              Next ›
            </button>
          )}
          <button
            onClick={() => { setShowGrammarModal(false); navigate(-1); }}
            className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700"
          >
            Kembali
          </button>
        </div>
      </div>
    </div>
  ) : null;
`;

  // Insert modal variable before return, then wrap in fragment
  src = src.replace(
    /\n  return \(\n    <div className="flex flex-col h-\[100dvh\]/,
    `\n${modal}\n  return (\n    <>\n    {grammarModal}\n    <div className="flex flex-col h-[100dvh]`
  );

  // Close fragment before the closing of export
  src = src.replace(
    /  \);\n\};\n\nexport default/,
    `    </>\n  );\n};\n\nexport default`
  );

  fs.writeFileSync(file, src, 'utf8');
  console.log(`✅ Patched Lesson${lessonId}.tsx`);
  passed++;
}

console.log(`\nDone: ${passed} patched, ${failed} failed.`);
