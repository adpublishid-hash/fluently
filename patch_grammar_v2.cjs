/**
 * patch_grammar_v2.cjs — robust patch for beginner grammar lessons
 */
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, 'src/pages/module/english/beginner/grammar');
const TOTAL = 14;
const BASE = '/modul/english/beginner/grammar';
const ACCENT = '#8E44AD';

let passed = 0;

for (let id = 1; id <= TOTAL; id++) {
  const file = path.join(DIR, `Lesson${id}.tsx`);
  if (!fs.existsSync(file)) { console.warn(`SKIP: Lesson${id}.tsx`); continue; }

  let src = fs.readFileSync(file, 'utf8');

  if (src.includes('GRAMMAR_STORAGE_KEY')) {
    console.log(`Already patched: Lesson${id}`);
    passed++; continue;
  }

  const nextId = id < TOTAL ? id + 1 : null;
  const nextPath = nextId ? `'${BASE}/lesson-${nextId}'` : 'null';

  // ── 1. Inject helpers after last single-line import ──────────────────────
  // Find the closing bracket of the last import (could be multiline)
  // Strategy: find "} from '..." last occurrence then insert after that line
  const lastImportMatch = src.match(/^([\s\S]*?^} from '[^']+';)/m);
  
  const helpers = `
/* ─── Grammar Completion Helpers ─── */
const GRAMMAR_STORAGE_KEY = 'talky_beginner_grammar_completed';
function getCompletedGrammarLessons(): number[] {
  try { return JSON.parse(localStorage.getItem(GRAMMAR_STORAGE_KEY) || '[]'); } catch { return []; }
}
function markGrammarComplete(lessonId: number) {
  const done = getCompletedGrammarLessons();
  if (!done.includes(lessonId)) localStorage.setItem(GRAMMAR_STORAGE_KEY, JSON.stringify([...done, lessonId]));
}

`;

  // Insert helpers before "interface LessonProps" or first "const " after imports
  src = src.replace(
    /^(interface LessonProps)/m,
    helpers + 'interface LessonProps'
  );

  // ── 2. Inject state after "const navigate = useNavigate();" ──────────────
  const stateCode = `
  const nextLessonPath: string | null = ${nextPath};
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedGrammarLessons().includes(${id}));
  const [showGrammarModal, setShowGrammarModal] = React.useState(false);
  const handleSelesai = () => {
    markGrammarComplete(${id});
    setIsCompleted(true);
    setShowGrammarModal(true);
  };
`;

  src = src.replace(
    'const navigate = useNavigate();',
    'const navigate = useNavigate();\n' + stateCode
  );

  // ── 3. Replace MoreIcon with Next button ──────────────────────────────────
  // The header button is: <button className="w-10 h-10 ..."><MoreIcon .../></button>
  src = src.replace(
    /<button className="w-10 h-10 -mr-2 rounded-full flex items-center justify-center hover:bg-slate-50 text-slate-600 active:bg-slate-100">\s*<MoreIcon className="w-6 h-6" \/>\s*<\/button>/s,
    `{nextLessonPath ? (
            <button
              onClick={() => navigate(nextLessonPath!)}
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
  // Pattern: onClick={() => navigate(-1)} ... ✅ Selesai
  src = src.replace(
    /onClick=\{\(\) => navigate\(-1\)\}(\s+className="w-full py-3\.5[^"]*")\s+style=\{\{ background: '[^']*' \}\}/,
    `onClick={isCompleted ? () => navigate(-1) : handleSelesai}$1 style={{ background: isCompleted ? 'linear-gradient(135deg, #26C76D, #1ea85a)' : 'linear-gradient(135deg, ${ACCENT}, ${ACCENT}cc)' }}`
  );

  // Replace the button text
  src = src.replace(/>\s*✅ Selesai\s*<\/button>/, `>\n              {isCompleted ? '✅ Sudah Selesai ✓' : '✅ Selesai'}\n            </button>`);

  // ── 5. Inject modal & wrap fragment ──────────────────────────────────────
  const modal = `
  const grammarModal = showGrammarModal ? (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}
      onClick={() => setShowGrammarModal(false)}
    >
      <div
        className="relative bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg, ${ACCENT}, ${ACCENT}99)' }}>
          <span style={{ fontSize: 36 }}>🏆</span>
        </div>
        <h2 className="text-xl font-extrabold text-[#1A1A2E] mb-1">Pelajaran Selesai! 🎉</h2>
        <p className="text-[13px] text-gray-500 mb-5">
          Kamu telah menyelesaikan <b>Grammar Lesson ${id}</b>. Terus semangat!
        </p>
        <div className="flex justify-center gap-2 mb-6">
          <span style={{ fontSize: 26 }}>⭐</span><span style={{ fontSize: 26 }}>⭐</span><span style={{ fontSize: 26 }}>⭐</span>
        </div>
        <div className="flex gap-3">
          {nextLessonPath && (
            <button
              onClick={() => { setShowGrammarModal(false); navigate(nextLessonPath!); }}
              className="flex-1 py-3 rounded-xl font-bold text-white shadow-lg"
              style={{ background: 'linear-gradient(135deg, ${ACCENT}, ${ACCENT}bb)' }}
            >Next ›</button>
          )}
          <button
            onClick={() => { setShowGrammarModal(false); navigate(-1); }}
            className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700"
          >Kembali</button>
        </div>
      </div>
    </div>
  ) : null;
`;

  // Wrap the return in a fragment
  src = src.replace(
    /\n  return \(\n    <div className="flex flex-col h-\[100dvh\]/,
    `\n${modal}\n  return (\n    <>\n    {grammarModal}\n    <div className="flex flex-col h-[100dvh]`
  );

  // Close the fragment
  src = src.replace(
    /(\s+<\/div>\n  \);\n\};\n\nexport default)/,
    '\n    </>\n  );\n};\n\nexport default'
  );

  fs.writeFileSync(file, src, 'utf8');
  console.log(`✅ Lesson${id}.tsx`);
  passed++;
}

console.log(`\nDone: ${passed}/${TOTAL}`);
