/**
 * patch_grammar_v4.cjs — patches Lesson2-14 that use LessonShell structure
 */
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, 'src/pages/module/english/beginner/grammar');
const TOTAL = 14;
const BASE = '/modul/english/beginner/grammar';
const ACCENT = '#8E44AD';

let passed = 0;

for (let id = 2; id <= TOTAL; id++) {
  const file = path.join(DIR, `Lesson${id}.tsx`);
  if (!fs.existsSync(file)) { console.warn(`SKIP: Lesson${id}.tsx`); continue; }

  let src = fs.readFileSync(file, 'utf8');

  // Already fully patched?
  if (src.includes('isCompleted') && src.includes('grammarModal')) {
    console.log(`✓  Lesson${id} already complete`);
    passed++; continue;
  }

  const nextId = id < TOTAL ? id + 1 : null;
  const nextPath = nextId ? `'${BASE}/lesson-${nextId}'` : 'null';

  // ── 1. Add useNavigate if missing ────────────────────────────────────────
  if (!src.includes('useNavigate')) {
    src = src.replace(
      "import { useNavigate } from 'react-router-dom';",
      ''
    );
    // add after first import line
    src = src.replace(
      /^(import React[^\n]+\n)/m,
      `$1import { useNavigate } from 'react-router-dom';\n`
    );
  }

  // ── 2. Inject state into component (after const navigate = ... or after React.FC = () => {) ─
  if (!src.includes('isCompleted')) {
    const stateCode = `
  const navigate = typeof useNavigate === 'function' ? useNavigate() : null;
  const nextLessonPath: string | null = ${nextPath};
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedGrammarLessons().includes(${id}));
  const [showGrammarModal, setShowGrammarModal] = React.useState(false);
  const handleSelesai = () => {
    markGrammarComplete(${id});
    setIsCompleted(true);
    setShowGrammarModal(true);
  };
`;
    // Find the component function body — insert after first useState inside it
    src = src.replace(
      /const GrammarLesson\d+[^=]*= \(\) => \{\n/,
      (match) => match + stateCode
    );
    // Also handle arrow with type annotation
    src = src.replace(
      /const GrammarLesson\d+: React\.FC(?:<[^>]+>)? = \(\) => \{\n/,
      (match) => match + stateCode
    );
  }

  // ── 3. Add nextLesson prop to LessonShell ────────────────────────────────
  if (!src.includes('nextLesson=')) {
    src = src.replace(
      /accentColor="[^"]+"\n(\s+)tabs=\{/,
      (match, indent) => match.replace(
        `accentColor="${match.match(/accentColor="([^"]+)"/)[1]}"`,
        `accentColor="${ACCENT}"\n${indent}nextLesson={nextLessonPath ?? undefined}`
      )
    );
  }

  // ── 4. Replace Selesai footer button ──────────────────────────────────────
  if (!src.includes('handleSelesai')) {
    // Pattern 1: onClick={() => window.history.back()}
    src = src.replace(
      /onClick=\{\(\) => window\.history\.back\(\)\}(\s+className="w-full py-3\.5[^"]*"\s+style=\{[^}]+\})/s,
      `onClick={isCompleted ? () => navigate?.(-1) ?? window.history.back() : handleSelesai}$1`
    );
    // Pattern 2: onClick={() => navigate(-1)}
    src = src.replace(
      /onClick=\{\(\) => navigate\(-1\)\}(\s+className="w-full py-3\.5[^"]*"\s+style=\{[^}]+\})/s,
      `onClick={isCompleted ? () => navigate?.(-1) : handleSelesai}$1`
    );
    // Update gradient + text
    src = src.replace(
      /style=\{\{ background: 'linear-gradient\(135deg, #8E44AD, #8E44ADcc\)' \}\}(\s*>\s*)(<CheckCircle2[^/]+\/>\s*)?Selesai/s,
      `style={{ background: isCompleted ? 'linear-gradient(135deg, #26C76D, #1ea85a)' : 'linear-gradient(135deg, ${ACCENT}, ${ACCENT}cc)' }}$1<CheckCircle2 size={18} />{' '}{isCompleted ? 'Sudah Selesai ✓' : 'Selesai'}`
    );
  }

  // ── 5. Inject modal before return ─────────────────────────────────────────
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
              onClick={() => { setShowGrammarModal(false); navigate?.(nextLessonPath!); }}
              className="flex-1 py-3 rounded-xl font-bold text-white shadow-lg"
              style={{ background: 'linear-gradient(135deg, ${ACCENT}, ${ACCENT}bb)' }}
            >Next ›</button>
          )}
          <button
            onClick={() => { setShowGrammarModal(false); navigate?.(-1) ?? window.history.back(); }}
            className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700"
          >Kembali</button>
        </div>
      </div>
    </div>
  ) : null;
`;

    // Wrap return in fragment and inject modal
    src = src.replace(
      /\n  return \(\n(\s+)<LessonShell/,
      `\n${modal}\n  return (\n    <>\n    {grammarModal}\n    <LessonShell`
    );
    // Close fragment before final );
    src = src.replace(
      /(\s+<\/LessonShell>\n\s+<\/>\n\s+\);\n)/,
      '        </LessonShell>\n      </>\n  );\n'
    );
    // If not already wrapped, close the fragment
    if (src.includes('{grammarModal}') && !src.includes('</>\n  );')) {
      src = src.replace(
        /(\s*<\/LessonShell>\n\s*\);\n\})/,
        '\n        </LessonShell>\n      </>\n  );\n}'
      );
    }
  }

  fs.writeFileSync(file, src, 'utf8');
  console.log(`✅ Lesson${id}.tsx patched`);
  passed++;
}

console.log(`\nDone: ${passed}/${TOTAL - 1}`);
