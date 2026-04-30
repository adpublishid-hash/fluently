/**
 * fix_vocab_final.cjs — handles CRLF line endings properly
 */
const fs = require('fs');
const path = require('path');
const DIR = path.join(__dirname, 'src/pages/module/english/beginner/vocabulary');
const BASE = '/modul/english/beginner/vocabulary';
const COLOR = '#3498DB';

for (let id = 3; id <= 10; id++) {
  const file = path.join(DIR, `Lesson${id}.tsx`);
  if (!fs.existsSync(file)) continue;

  // Read as buffer, normalize to LF for processing
  let src = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');

  const nextId = id < 11 ? id + 1 : null;

  // ── Check what's missing ──────────────────────────────────────────────────
  const hasModal = src.includes('vocabModal');
  const hasFragOpen = src.includes('<>\n    {vocabModal}');
  const hasHandleSelesai = src.includes('handleSelesai');

  console.log(`Lesson${id}: modal=${hasModal} fragOpen=${hasFragOpen} selesai=${hasHandleSelesai}`);

  // ── Inject modal if missing ───────────────────────────────────────────────
  if (!hasModal) {
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

    // Insert before return
    src = src.replace(
      '\n  return (\n        <LessonShell',
      `\n${modal}\n  return (\n    <>\n    {vocabModal}\n        <LessonShell`
    );

    // Close fragment before ");}" 
    src = src.replace(
      '\n        </LessonShell>\n    );\n};',
      '\n        </LessonShell>\n    </>\n  );\n};'
    );
  }

  // ── Add fragment open if modal exists but <> is missing ───────────────────
  if (hasModal && !hasFragOpen) {
    src = src.replace(
      '\n  return (\n        <LessonShell',
      '\n  return (\n    <>\n    {vocabModal}\n        <LessonShell'
    );
    // Also ensure closing is correct
    if (!src.includes('</>\n  );')) {
      src = src.replace(
        '\n        </LessonShell>\n    );\n};',
        '\n        </LessonShell>\n    </>\n  );\n};'
      );
      src = src.replace(
        '\n    </LessonShell>\n    </>\n  );\n};',
        '\n        </LessonShell>\n    </>\n  );\n};'
      );
    }
  }

  // ── Fix footer button ──────────────────────────────────────────────────────
  if (!hasHandleSelesai) {
    src = src.replace(
      "onClick={() => window.history.back()}",
      "onClick={isCompleted ? () => navigate(-1) : handleSelesai}"
    );
    src = src.replace(
      ">\n                    <CheckCircle2 size={18} />\n                    Selesai",
      ">\n                    <CheckCircle2 size={18} />\n                    {isCompleted ? 'Sudah Selesai ✓' : 'Selesai'}"
    );
    // Fix the gradient style
    src = src.replace(
      /style=\{\{ background: `linear-gradient\([^`]+\)` \}\}\s*\n(\s+)>\n(\s+)<CheckCircle2/,
      `style={{ background: isCompleted ? 'linear-gradient(135deg, #26C76D, #1ea85a)' : 'linear-gradient(135deg, ${COLOR}, ${COLOR}cc)' }}\n$1>\n$2<CheckCircle2`
    );
  }

  // Write back (keep LF, Windows is fine with it in most editors)
  fs.writeFileSync(file, src, 'utf8');
  console.log(`✅ Lesson${id} done`);
}

console.log('\nAll done!');
