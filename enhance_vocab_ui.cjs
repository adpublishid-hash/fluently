/**
 * enhance_vocab_ui.cjs — replaces inline vocab tables with VocabWordList component
 * Works on Lesson1-11 (handles both old-style and LessonShell variants)
 */
const fs = require('fs');
const path = require('path');
const DIR = path.join(__dirname, 'src/pages/module/english/beginner/vocabulary');

const IMPORT_LINE = "import VocabWordList from './VocabWordList';";

// Patterns for the complex table header (two variants)
const OLD_HEADER_SLATE = `<div className="bg-slate-50 rounded-xl border border-slate-100 overflow-hidden">
                                    <div className="grid grid-cols-[auto_1fr_1fr] md:grid-cols-[auto_1.5fr_1fr_1fr] gap-4 p-4 bg-slate-100/50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                        <div className="w-6"></div>
                                        <div>Word</div>
                                        <div className="hidden md:block">Phonetic</div>
                                        <div className="text-right md:text-left">Meaning</div>
                                    </div>`;

const OLD_HEADER_VAR = `<div className="bg-[var(--color-background)] rounded-xl border border-[var(--color-border)] overflow-hidden">
                                    <div className="grid grid-cols-[auto_1fr_1fr] md:grid-cols-[auto_1.5fr_1fr_1fr] gap-4 p-4 bg-gray-100/50 border-b border-[var(--color-border)] text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
                                        <div className="w-6"></div>
                                        <div>Word</div>
                                        <div className="hidden md:block">Phonetic</div>
                                        <div className="text-right md:text-left">Meaning</div>
                                    </div>`;

// The inner items div wrapper
const OLD_ITEMS_WRAPPER_OPEN_SLATE = `\n                                    <div className="divide-y divide-slate-100">
                                        {VOCAB_LIST.map((item, idx) => (
                                            <div key={idx} className="group grid grid-cols-[auto_1fr] md:grid-cols-[auto_1.5fr_1fr_1fr] gap-x-4 gap-y-2 p-3 items-center hover:bg-white transition-colors">
                                                {/* Audio Button */}
                                                <div className="row-span-2 md:row-span-1">
                                                    <button
                                                        onClick={() => handlePlayAudio(item.word)}
                                                        className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-teal-500 hover:text-white hover:border-teal-500 transition-all active:scale-95 shadow-sm"
                                                        aria-label={\`Play audio for \${item.word}\`}
                                                    >
                                                        <PlayCircleIcon className="w-4 h-4" />
                                                    </button>
                                                </div>

                                                {/* Word */}
                                                <div className="font-bold text-slate-800 text-sm md:text-base self-end md:self-center">
                                                    {item.word}
                                                </div>

                                                {/* Phonetic (Mobile: below word, Desktop: separate col) */}
                                                <div className="row-start-2 col-start-2 md:row-start-1 md:col-start-3 self-start md:self-center">
                                                    <span className="font-mono text-xs text-slate-500 bg-slate-100/80 px-1.5 py-0.5 rounded border border-slate-200/50">
                                                        {item.ipa}
                                                    </span>
                                                </div>

                                                {/* Meaning (Mobile: right aligned, Desktop: separate col) */}
                                                <div className="row-start-1 col-start-2 justify-self-end md:row-start-1 md:col-start-4 md:justify-self-start text-sm text-slate-600 font-medium text-right md:text-left">
                                                    {item.meaning}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>`;

// Build replacement for old-style (Lesson1) - uses teal accent
const NEW_VOCAB_LESSON1 = `\n                                <VocabWordList items={VOCAB_LIST} accentColor="#3498DB" />`;

// For var-based lessons, end marker varies - we search for the closing div pattern
// and replace everything from header start to closing </div></div>

function fixLesson(id) {
  const file = path.join(DIR, `Lesson${id}.tsx`);
  if (!fs.existsSync(file)) { console.warn(`SKIP Lesson${id}`); return; }
  let src = fs.readFileSync(file, 'utf8');

  // Add import if missing
  if (!src.includes('VocabWordList')) {
    // Add after last import line
    const lastImport = src.lastIndexOf('\nimport ');
    const endOfImport = src.indexOf('\n', lastImport + 1);
    src = src.slice(0, endOfImport + 1) + IMPORT_LINE + '\n' + src.slice(endOfImport + 1);
    console.log(`  → import added`);
  }

  // Find the vocab table section using a unique anchor: "Core Vocabulary" section
  // Pattern: the section containing the word table
  // Replace from the outer wrapper div to closing </div></section> area
  
  // For Lesson1: bg-slate-50 wrapper
  if (src.includes(OLD_HEADER_SLATE) && !src.includes('<VocabWordList')) {
    // Find the end of the table: after the items div
    const start = src.indexOf(OLD_HEADER_SLATE);
    // The table ends with: </div>\n                                </div>
    // which is: close items-div + close outer-bg-div
    const END_MARKER = `\n                                </div>\n                            </section>`;
    const endSearch = src.indexOf(END_MARKER, start);
    if (endSearch > 0) {
      src = src.slice(0, start) + 
            '\n                                <VocabWordList items={VOCAB_LIST} accentColor="#3498DB" />' + 
            src.slice(endSearch);
      console.log(`  → Lesson${id}: slate table replaced`);
    }
  }

  // For Lesson2-11: var() wrapper
  if (src.includes(OLD_HEADER_VAR) && !src.includes('<VocabWordList')) {
    const start = src.indexOf(OLD_HEADER_VAR);
    const END_MARKER = `\n                                </div>\n                             </motion.section>`;
    const END_MARKER2 = `\n                                </div>\n                            </motion.section>`;
    let endSearch = src.indexOf(END_MARKER, start);
    let markerLen = END_MARKER.length;
    if (endSearch < 0) { endSearch = src.indexOf(END_MARKER2, start); markerLen = END_MARKER2.length; }
    
    if (endSearch > 0) {
      src = src.slice(0, start) + 
            '\n                                <VocabWordList items={VOCAB_LIST} accentColor="#3498DB" />' + 
            src.slice(endSearch);
      console.log(`  → Lesson${id}: var() table replaced`);
    } else {
      // Fallback: just replace the header div and items container
      // Find end by counting divs
      console.log(`  ⚠ Lesson${id}: end marker not found, trying fallback`);
    }
  }

  // Also: remove the handlePlayAudio function if VocabWordList is now handling audio
  // (optional - leave it for safety so practice tabs still work)

  fs.writeFileSync(file, src, 'utf8');
  console.log(`✅ Lesson${id}`);
}

for (let i = 1; i <= 11; i++) {
  console.log(`\nProcessing Lesson${i}...`);
  fixLesson(i);
}
console.log('\nDone!');
