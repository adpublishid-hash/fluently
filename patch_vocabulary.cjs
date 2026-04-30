/**
 * patch_vocabulary.cjs — Adds completion tracking, Next button, and success modal
 * to all 11 beginner vocabulary lessons + updates VocabularyPage
 */
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, 'src/pages/module/english/beginner/vocabulary');
const TOTAL = 11;
const BASE = '/modul/english/beginner/vocabulary';
const COLOR = '#3498DB'; // Vocabulary blue color

const HELPERS = `
/* ─── Vocabulary Completion Helpers ─── */
const VOCAB_STORAGE_KEY = 'talky_beginner_vocabulary_completed';
function getCompletedVocabLessons(): number[] {
  try { return JSON.parse(localStorage.getItem(VOCAB_STORAGE_KEY) || '[]'); } catch { return []; }
}
function markVocabComplete(lessonId: number) {
  const done = getCompletedVocabLessons();
  if (!done.includes(lessonId)) localStorage.setItem(VOCAB_STORAGE_KEY, JSON.stringify([...done, lessonId]));
}

`;

let passed = 0;

for (let id = 1; id <= TOTAL; id++) {
  const file = path.join(DIR, `Lesson${id}.tsx`);
  if (!fs.existsSync(file)) { console.warn(`SKIP: Lesson${id}.tsx`); continue; }

  let src = fs.readFileSync(file, 'utf8');

  if (src.includes('VOCAB_STORAGE_KEY')) { console.log(`✓  Lesson${id} already patched`); passed++; continue; }

  const nextId = id < TOTAL ? id + 1 : null;
  const nextPath = nextId ? `'${BASE}/lesson-${nextId}'` : 'null';

  // ── 1. Inject helpers before interface or first const block ───────────────
  src = src.replace(
    /^(interface Lesson\d+Props)/m,
    HELPERS + '$1'
  );
  // fallback: insert after imports if no interface
  if (!src.includes('VOCAB_STORAGE_KEY')) {
    src = src.replace(
      /^(import [^\n]+\n)+\n/m,
      (m) => m + HELPERS
    );
  }

  // ── 2. Inject state inside component (after navigate = useNavigate()) ─────
  if (!src.includes('isCompleted')) {
    const stateCode = `
    const nextLessonPath = ${nextPath};
    const [isCompleted, setIsCompleted] = React.useState(() => getCompletedVocabLessons().includes(${id}));
    const [showVocabModal, setShowVocabModal] = React.useState(false);
    const handleSelesai = () => { markVocabComplete(${id}); setIsCompleted(true); setShowVocabModal(true); };
`;
    src = src.replace(
      'const navigate = useNavigate();',
      'const navigate = useNavigate();\n' + stateCode
    );
  }

  // ── 3. Replace MoreIcon (header "..." button) with Next button ────────────
  if (src.includes('<MoreIcon')) {
    src = src.replace(
      /<button className="w-10 h-10 -mr-2 rounded-full flex items-center justify-center hover:bg-slate-50 text-slate-600 active:bg-slate-100">\s*<MoreIcon className="w-6 h-6" \/>\s*<\/button>/s,
      `{nextLessonPath ? (
                    <button
                      onClick={() => navigate(nextLessonPath)}
                      className="flex items-center gap-1 px-3 h-9 rounded-full text-xs font-bold text-white"
                      style={{ background: '${COLOR}', boxShadow: '0 2px 10px ${COLOR}55' }}
                    >
                      Next ›
                    </button>
                  ) : (
                    <div className="w-10" />
                  )}`
    );
  }

  // ── 4. Replace "Complete Lesson" button ───────────────────────────────────
  // Pattern in vocab lessons:
  src = src.replace(
    `onClick={() => onComplete ? onComplete() : navigate(-1)}
                    className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                    <CheckCircleIcon className="w-6 h-6" />
                    Complete Lesson`,
    `onClick={isCompleted ? () => navigate(-1) : handleSelesai}
                    className="w-full md:w-auto px-8 py-4 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                    style={{ background: isCompleted ? 'linear-gradient(135deg, #26C76D, #1ea85a)' : 'linear-gradient(135deg, ${COLOR}, ${COLOR}cc)' }}
                >
                    <CheckCircleIcon className="w-6 h-6" />
                    {isCompleted ? 'Sudah Selesai ✓' : 'Complete Lesson'}`
  );

  // ── 5. Inject success modal before return ──────────────────────────────────
  if (!src.includes('showVocabModal')) {
    const nextBtnJSX = nextId
      ? `          <button onClick={() => { setShowVocabModal(false); navigate('${BASE}/lesson-${nextId}'); }} className="flex-1 py-3 rounded-xl font-bold text-white shadow-lg" style={{ background: 'linear-gradient(135deg, ${COLOR}, ${COLOR}bb)' }}>Next ›</button>\n`
      : '';

    const modal = `
    const vocabModal = showVocabModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }} onClick={() => setShowVocabModal(false)}>
            <div className="relative bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg, ${COLOR}, ${COLOR}99)' }}>
                    <span style={{ fontSize: 36 }}>🏆</span>
                </div>
                <h2 className="text-xl font-extrabold text-[#1A1A2E] mb-1">Lesson Selesai! 🎉</h2>
                <p className="text-[13px] text-gray-500 mb-5">Kamu telah menyelesaikan <b>Vocabulary Lesson ${id}</b>. Terus semangat!</p>
                <div className="flex justify-center gap-2 mb-6"><span style={{ fontSize: 26 }}>⭐</span><span style={{ fontSize: 26 }}>⭐</span><span style={{ fontSize: 26 }}>⭐</span></div>
                <div className="flex gap-3">
${nextBtnJSX}                    <button onClick={() => { setShowVocabModal(false); navigate(-1); }} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700">Kembali</button>
                </div>
            </div>
        </div>
    ) : null;
`;

    // Insert modal before return and wrap with fragment
    src = src.replace(
      '\n    return (\n        <div className="flex flex-col h-[100dvh]',
      `\n${modal}\n    return (\n        <>\n        {vocabModal}\n        <div className="flex flex-col h-[100dvh]`
    );

    // Close fragment before closing );
    src = src.replace(
      /(\s+<\/div >\n\s+\);\n\};\n\nexport default)/,
      '\n        </>\n    );\n};\n\nexport default'
    );
    // Also handle: </div>\n    );\n};
    if (!src.includes('</>\n    );')) {
      src = src.replace(
        /(\s+<\/div>\n\s+\);\n\};\n\nexport default)/,
        '\n        </>\n    );\n};\n\nexport default'
      );
    }
  }

  fs.writeFileSync(file, src, 'utf8');
  console.log(`✅ Lesson${id}.tsx patched`);
  passed++;
}

console.log(`\nDone: ${passed}/${TOTAL} lessons patched`);
