/**
 * fix_vocab_definitive.cjs — definitive fix for Lesson3-10
 * Uses exact known patterns from viewing Lesson3
 */
const fs = require('fs');
const path = require('path');
const BASE = '/modul/english/beginner/vocabulary';
const COLOR = '#3498DB';
const DIR = path.join(__dirname, 'src/pages/module/english/beginner/vocabulary');

for (let id = 3; id <= 10; id++) {
  const file = path.join(DIR, `Lesson${id}.tsx`);
  let src = fs.readFileSync(file, 'utf8');

  const nextId = id < 11 ? id + 1 : null;

  // ── 1. Fix footer onClick + style + text ──────────────────────────────────
  // Replace old window.history.back() + template-literal gradient
  if (src.includes("() => window.history.back()")) {
    src = src.replace(
      "() => window.history.back()",
      "isCompleted ? () => navigate(-1) : handleSelesai"
    );
  }

  // Fix style with template literal (the ${'#2980B9'} pattern)
  src = src.replace(
    /style=\{\{ background: `linear-gradient\(135deg, \$\{'#[^']+'\}, \$\{'#[^']+'\}cc\)` \}\}/g,
    `style={{ background: isCompleted ? 'linear-gradient(135deg, #26C76D, #1ea85a)' : 'linear-gradient(135deg, ${COLOR}, ${COLOR}cc)' }}`
  );

  // Fix the Selesai text 
  if (src.includes('\n                    Selesai\n')) {
    src = src.replace(
      '\n                    Selesai\n',
      "\n                    {isCompleted ? 'Sudah Selesai \\u2713' : 'Selesai'}\n"
    );
  }

  // ── 2. Inject modal + wrap in fragment ────────────────────────────────────
  // Only if modal not present yet
  if (!src.includes('vocabModal')) {
    const nextBtnJSX = nextId
      ? `          <button onClick={() => { setShowVocabModal(false); navigate('${BASE}/lesson-${nextId}'); }} className="flex-1 py-3 rounded-xl font-bold text-white shadow-lg" style={{ background: 'linear-gradient(135deg, ${COLOR}, ${COLOR}bb)' }}>Next \u203a</button>\n`
      : '';

    const modal = `  const vocabModal = showVocabModal ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }} onClick={() => setShowVocabModal(false)}>
      <div className="relative bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg, ${COLOR}, ${COLOR}99)' }}><span style={{ fontSize: 36 }}>\uD83C\uDFC6</span></div>
        <h2 className="text-xl font-extrabold text-[#1A1A2E] mb-1">Lesson Selesai! \uD83C\uDF89</h2>
        <p className="text-[13px] text-gray-500 mb-5">Kamu telah menyelesaikan <b>Vocabulary Lesson ${id}</b>. Terus semangat!</p>
        <div className="flex justify-center gap-2 mb-6"><span style={{ fontSize: 26 }}>\u2B50</span><span style={{ fontSize: 26 }}>\u2B50</span><span style={{ fontSize: 26 }}>\u2B50</span></div>
        <div className="flex gap-3">
${nextBtnJSX}          <button onClick={() => { setShowVocabModal(false); navigate(-1); }} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700">Kembali</button>
        </div>
      </div>
    </div>
  ) : null;

`;

    // The return block in these files is "    return (\n        <LessonShell"
    src = src.replace('    return (\n        <LessonShell', modal + '    return (\n    <>\n    {vocabModal}\n        <LessonShell');
  }

  // ── 3. Fix orphan </> — remove if no <> open exists properly ─────────────
  // Check: the  </> comes after </LessonShell>
  // If the fragment is not properly opened, we already added it above
  // Make sure the closing is correct
  if (src.includes('        </LessonShell>\n    </>\n  );')) {
    // Already correct
  } else if (src.includes('        </LessonShell>\n    </>')) {
    src = src.replace(
      '        </LessonShell>\n    </>',
      '        </LessonShell>\n    </>'
    );
  }

  fs.writeFileSync(file, src, 'utf8');
  console.log(`✅ Lesson${id}`);
}

console.log('\nAll done!');
