/**
 * patch_grammar_v3.cjs — force re-patch lessons missing Next/modal
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
  let changed = false;

  const nextId = id < TOTAL ? id + 1 : null;
  const nextPath = nextId ? `'${BASE}/lesson-${nextId}'` : 'null';

  // ── State injection (if missing) ──────────────────────────────────────────
  if (!src.includes('nextLessonPath')) {
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
    src = src.replace('const navigate = useNavigate();', 'const navigate = useNavigate();\n' + stateCode);
    changed = true;
  }

  // ── Replace MoreIcon with Next button (if still present) ──────────────────
  if (src.includes('<MoreIcon')) {
    const morePattern = /<button className="w-10 h-10 -mr-2[^>]*>\s*<MoreIcon[^/]*\/>\s*<\/button>/s;
    const replacement = `{nextLessonPath ? (
            <button
              onClick={() => navigate(nextLessonPath!)}
              className="flex items-center gap-1 px-3 h-9 rounded-full text-xs font-bold text-white"
              style={{ background: '${ACCENT}', boxShadow: '0 2px 10px ${ACCENT}55' }}
            >
              Next ›
            </button>
          ) : (
            <div className="w-10" />
          )}`;
    const newSrc = src.replace(morePattern, replacement);
    if (newSrc !== src) { src = newSrc; changed = true; }
    else console.warn(`  ⚠ MoreIcon pattern not matched for Lesson${id}`);
  }

  // ── Update Selesai button ─────────────────────────────────────────────────
  if (src.includes('✅ Selesai') && !src.includes('isCompleted ?')) {
    // Replace onClick
    src = src.replace(
      /onClick=\{\(\) => navigate\(-1\)\}(\s+className="w-full py-3\.5[^"]*"\s+style=\{[^}]+\})/,
      `onClick={isCompleted ? () => navigate(-1) : handleSelesai}$1`
    );
    // Replace gradient in style
    src = src.replace(
      /style=\{\{ background: 'linear-gradient\(135deg, #8E44AD[^']*\)' \}\}\s*>\s*✅ Selesai/,
      `style={{ background: isCompleted ? 'linear-gradient(135deg, #26C76D, #1ea85a)' : 'linear-gradient(135deg, ${ACCENT}, ${ACCENT}cc)' }}>
              {isCompleted ? '✅ Sudah Selesai ✓' : '✅ Selesai'}`
    );
    changed = true;
  }

  // ── Inject modal (if missing) ─────────────────────────────────────────────
  if (!src.includes('grammarModal')) {
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

    // Insert before return statement
    src = src.replace(
      '\n  return (\n    <div className="flex flex-col h-[100dvh]',
      modal + '\n  return (\n    <>\n    {grammarModal}\n    <div className="flex flex-col h-[100dvh]'
    );

    // Close fragment — find the last </div> before ");\n};"
    src = src.replace(/(\n    <\/div>\n  \);\n\};\n\nexport default)/, '\n    </>\n  );\n};\n\nexport default');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, src, 'utf8');
    console.log(`✅ Lesson${id}.tsx patched`);
  } else {
    console.log(`✓  Lesson${id}.tsx already complete`);
  }
  passed++;
}

console.log(`\nDone: ${passed}/${TOTAL}`);
