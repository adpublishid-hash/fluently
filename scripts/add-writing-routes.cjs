// add-writing-routes.cjs
// Adds Intermediate Writing imports and routes to App.tsx

const fs = require('fs');
const path = require('path');

const APP_PATH = path.join(__dirname, '../src/App.tsx');
let content = fs.readFileSync(APP_PATH, 'utf8');

// ── 1. Add imports after ElemWritingLesson15 ──────────────────────────────
const IMPORT_ANCHOR = "import ElemWritingLesson15 from './pages/module/english/elementary/writing/Lesson15';";
const IMPORT_BLOCK = `
// Intermediate Writing
import InterWritingPage from './pages/module/english/intermediate/writing/WritingPage';
import InterWritingLesson1 from './pages/module/english/intermediate/writing/Lesson1';
import InterWritingLesson2 from './pages/module/english/intermediate/writing/Lesson2';
import InterWritingLesson3 from './pages/module/english/intermediate/writing/Lesson3';
import InterWritingLesson4 from './pages/module/english/intermediate/writing/Lesson4';
import InterWritingLesson5 from './pages/module/english/intermediate/writing/Lesson5';
import InterWritingLesson6 from './pages/module/english/intermediate/writing/Lesson6';
import InterWritingLesson7 from './pages/module/english/intermediate/writing/Lesson7';
import InterWritingLesson8 from './pages/module/english/intermediate/writing/Lesson8';
import InterWritingLesson9 from './pages/module/english/intermediate/writing/Lesson9';
import InterWritingLesson10 from './pages/module/english/intermediate/writing/Lesson10';
import InterWritingLesson11 from './pages/module/english/intermediate/writing/Lesson11';
import InterWritingLesson12 from './pages/module/english/intermediate/writing/Lesson12';
import InterWritingLesson13 from './pages/module/english/intermediate/writing/Lesson13';
import InterWritingLesson14 from './pages/module/english/intermediate/writing/Lesson14';
import InterWritingLesson15 from './pages/module/english/intermediate/writing/Lesson15';
import InterWritingLesson16 from './pages/module/english/intermediate/writing/Lesson16';
import InterWritingLesson17 from './pages/module/english/intermediate/writing/Lesson17';
import InterWritingLesson18 from './pages/module/english/intermediate/writing/Lesson18';
import InterWritingLesson19 from './pages/module/english/intermediate/writing/Lesson19';
import InterWritingLesson20 from './pages/module/english/intermediate/writing/Lesson20';`;

// ── 2. Route block to insert ──────────────────────────────────────────────
const ROUTE_BLOCK = `
                  {/* Intermediate Writing */}
                  <Route path="/modul/english/intermediate/writing" element={<InterWritingPage />} />
                  <Route path="/modul/english/intermediate/writing/lesson-1" element={<InterWritingLesson1 />} />
                  <Route path="/modul/english/intermediate/writing/lesson-2" element={<InterWritingLesson2 />} />
                  <Route path="/modul/english/intermediate/writing/lesson-3" element={<InterWritingLesson3 />} />
                  <Route path="/modul/english/intermediate/writing/lesson-4" element={<InterWritingLesson4 />} />
                  <Route path="/modul/english/intermediate/writing/lesson-5" element={<InterWritingLesson5 />} />
                  <Route path="/modul/english/intermediate/writing/lesson-6" element={<InterWritingLesson6 />} />
                  <Route path="/modul/english/intermediate/writing/lesson-7" element={<InterWritingLesson7 />} />
                  <Route path="/modul/english/intermediate/writing/lesson-8" element={<InterWritingLesson8 />} />
                  <Route path="/modul/english/intermediate/writing/lesson-9" element={<InterWritingLesson9 />} />
                  <Route path="/modul/english/intermediate/writing/lesson-10" element={<InterWritingLesson10 />} />
                  <Route path="/modul/english/intermediate/writing/lesson-11" element={<InterWritingLesson11 />} />
                  <Route path="/modul/english/intermediate/writing/lesson-12" element={<InterWritingLesson12 />} />
                  <Route path="/modul/english/intermediate/writing/lesson-13" element={<InterWritingLesson13 />} />
                  <Route path="/modul/english/intermediate/writing/lesson-14" element={<InterWritingLesson14 />} />
                  <Route path="/modul/english/intermediate/writing/lesson-15" element={<InterWritingLesson15 />} />
                  <Route path="/modul/english/intermediate/writing/lesson-16" element={<InterWritingLesson16 />} />
                  <Route path="/modul/english/intermediate/writing/lesson-17" element={<InterWritingLesson17 />} />
                  <Route path="/modul/english/intermediate/writing/lesson-18" element={<InterWritingLesson18 />} />
                  <Route path="/modul/english/intermediate/writing/lesson-19" element={<InterWritingLesson19 />} />
                  <Route path="/modul/english/intermediate/writing/lesson-20" element={<InterWritingLesson20 />} />`;

// ── Step 1: Check / add imports ───────────────────────────────────────────
if (content.includes('InterWritingPage')) {
  console.log('ℹ️  Imports already present, skipping import step.');
} else if (content.includes(IMPORT_ANCHOR)) {
  content = content.replace(IMPORT_ANCHOR, IMPORT_ANCHOR + IMPORT_BLOCK);
  console.log('✓ Imports added.');
} else {
  console.error('❌ Import anchor not found! Check App.tsx structure.');
  process.exit(1);
}

// ── Step 2: Find where to insert routes ──────────────────────────────────
// Look for the Intermediate Listening lesson-20 route, then insert after it.
// If already added, skip.
if (content.includes('intermediate/writing/lesson-1"')) {
  console.log('ℹ️  Routes already present, skipping route step.');
} else {
  // Try multiple anchors in priority order
  const ROUTE_ANCHORS = [
    // After last listening lesson
    'intermediate/listening/lesson-20"',
    // After last reading lesson
    'intermediate/reading/lesson-20"',
    // After last pronunciation lesson
    'intermediate/pronunciation/lesson-20"',
    // After last vocabulary lesson
    'intermediate/vocabulary/lesson-20"',
    // After last speaking lesson
    'intermediate/speaking/lesson-20"',
    // After last grammar lesson
    'intermediate/grammar/lesson-20"',
  ];

  let inserted = false;
  for (const anchor of ROUTE_ANCHORS) {
    // Find the full line containing the anchor
    const idx = content.indexOf(anchor);
    if (idx === -1) continue;

    // Find end of that line
    const lineEnd = content.indexOf('\n', idx);
    if (lineEnd === -1) continue;

    content = content.slice(0, lineEnd + 1) + ROUTE_BLOCK + '\n' + content.slice(lineEnd + 1);
    console.log(`✓ Routes inserted after anchor: "${anchor}"`);
    inserted = true;
    break;
  }

  if (!inserted) {
    // Last resort: insert before the ComingSoon catchall for intermediate
    const CATCHALL = '/modul/english/intermediate/:skillId';
    const catchIdx = content.indexOf(CATCHALL);
    if (catchIdx !== -1) {
      // Find start of that line
      const lineStart = content.lastIndexOf('\n', catchIdx) + 1;
      content = content.slice(0, lineStart) + ROUTE_BLOCK + '\n\n' + content.slice(lineStart);
      console.log('✓ Routes inserted before intermediate catching route.');
      inserted = true;
    }
  }

  if (!inserted) {
    console.error('❌ Could not find a suitable anchor for route insertion!');
    process.exit(1);
  }
}

fs.writeFileSync(APP_PATH, content, 'utf8');
console.log('\n✅ App.tsx updated successfully!');
