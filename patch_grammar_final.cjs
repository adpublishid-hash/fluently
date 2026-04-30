/**
 * patch_grammar_final.cjs
 * Patches Lesson3-14 using exact known patterns from Lesson2 structure
 */
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, 'src/pages/module/english/beginner/grammar');
const BASE = '/modul/english/beginner/grammar';
const ACCENT = '#8E44AD';

// Only patch lessons 3-14
for (let id = 3; id <= 14; id++) {
  const file = path.join(DIR, `Lesson${id}.tsx`);
  if (!fs.existsSync(file)) { console.warn(`SKIP: Lesson${id}.tsx`); continue; }

  let src = fs.readFileSync(file, 'utf8');

  // Skip if already patched
  if (src.includes('isCompleted') && src.includes('grammarModal')) {
    console.log(`✓  Lesson${id} already complete`);
    continue;
  }

  const nextId = id < 14 ? id + 1 : null;
  const nextLessonPath = nextId ? `${BASE}/lesson-${nextId}` : null;

  // ── 1. Add state after component declaration ──────────────────────────────
  if (!src.includes('isCompleted')) {
    const stateCode = `  const navigate = useNavigate();\n  const nextLessonPath = ${nextLessonPath ? `'${nextLessonPath}'` : 'null'};\n  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedGrammarLessons().includes(${id}));\n  const [showGrammarModal, setShowGrammarModal] = React.useState(false);\n  const handleSelesai = () => { markGrammarComplete(${id}); setIsCompleted(true); setShowGrammarModal(true); };\n`;

    // Find component function — try multiple patterns
    let replaced = false;
    
    // Pattern A: const GrammarLessonN: React.FC = () => {
    const patternA = new RegExp(`const GrammarLesson${id}: React\\.FC(?:<[^>]+>)? = \\(\\) => \\{\\n`);
    if (!replaced && patternA.test(src)) {
      src = src.replace(patternA, (m) => m + stateCode);
      replaced = true;
    }
    
    // Pattern B: const GrammarLessonN = () => {
    const patternB = new RegExp(`const GrammarLesson${id} = \\(\\) => \\{\\n`);
    if (!replaced && patternB.test(src)) {
      src = src.replace(patternB, (m) => m + stateCode);
      replaced = true;
    }

    if (!replaced) {
      console.warn(`  ⚠ Could not inject state for Lesson${id}`);
    }
  }

  // ── 2. Add nextLesson to LessonShell if missing ───────────────────────────
  if (!src.includes('nextLesson=') && nextLessonPath) {
    src = src.replace(
      /accentColor="#8E44AD"\n(\s+)tabs=\[/,
      `accentColor="#8E44AD"\n$1nextLesson={'${nextLessonPath}'}\n$1tabs=[`
    );
    src = src.replace(
      /accentColor="#8E44AD"\n(\s+)tabs=\{/,
      `accentColor="#8E44AD"\n$1nextLesson={'${nextLessonPath}'}\n$1tabs={`
    );
  }

  // ── 3. Replace footer Selesai button ─────────────────────────────────────
  if (!src.includes('handleSelesai')) {
    // Replace onClick
    src = src.replace(
      "onClick={() => window.history.back()}",
      "onClick={isCompleted ? () => navigate(-1) : handleSelesai}"
    );
    src = src.replace(
      "onClick={() => navigate(-1)}",
      "onClick={isCompleted ? () => navigate(-1) : handleSelesai}"
    );
    // Replace gradient
    src = src.replace(
      "style={{ background: 'linear-gradient(135deg, #8E44AD, #8E44ADcc)' }}\n                >\n                    <CheckCircle2 size={18} />\n                    Selesai",
      "style={{ background: isCompleted ? 'linear-gradient(135deg, #26C76D, #1ea85a)' : 'linear-gradient(135deg, #8E44AD, #8E44ADcc)' }}\n                >\n                    <CheckCircle2 size={18} />\n                    {isCompleted ? 'Sudah Selesai ✓' : 'Selesai'}"
    );
  }

  // ── 4. Inject modal + fragment wrapper ───────────────────────────────────
  if (!src.includes('grammarModal')) {
    const nextBtnJSX = nextLessonPath
      ? `          <button onClick={() => { setShowGrammarModal(false); navigate('${nextLessonPath}'); }} className="flex-1 py-3 rounded-xl font-bold text-white shadow-lg" style={{ background: 'linear-gradient(135deg, #8E44AD, #8E44ADbb)' }}>Next ›</button>\n`
      : '';

    const modal = `  const grammarModal = showGrammarModal ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }} onClick={() => setShowGrammarModal(false)}>
      <div className="relative bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg, #8E44AD, #8E44AD99)' }}>
          <span style={{ fontSize: 36 }}>🏆</span>
        </div>
        <h2 className="text-xl font-extrabold text-[#1A1A2E] mb-1">Pelajaran Selesai! 🎉</h2>
        <p className="text-[13px] text-gray-500 mb-5">Kamu telah menyelesaikan <b>Grammar Lesson ${id}</b>. Terus semangat!</p>
        <div className="flex justify-center gap-2 mb-6"><span style={{ fontSize: 26 }}>⭐</span><span style={{ fontSize: 26 }}>⭐</span><span style={{ fontSize: 26 }}>⭐</span></div>
        <div className="flex gap-3">
${nextBtnJSX}          <button onClick={() => { setShowGrammarModal(false); navigate(-1); }} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700">Kembali</button>
        </div>
      </div>
    </div>
  ) : null;

`;

    // Insert modal before return and wrap with fragment
    src = src.replace(
      /\n  return \(\n(\s+)<LessonShell/,
      `\n${modal}  return (\n    <>\n    {grammarModal}\n    <LessonShell`
    );

    // Close the fragment before the last ");\n};"
    src = src.replace(
      /(\s+<\/LessonShell>\n\s+\);\n})/,
      '\n    </LessonShell>\n    </>\n  );\n}'
    );
  }

  fs.writeFileSync(file, src, 'utf8');
  console.log(`✅ Lesson${id}.tsx patched`);
}

console.log('\nDone!');
