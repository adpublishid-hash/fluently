// force-inject-upper-inter.cjs
// Force-injects missing Upper-Intermediate lesson imports and routes into App.tsx
const fs = require('fs');
const path = require('path');

const APP_FILE = path.join(__dirname, '../src/App.tsx');
let content = fs.readFileSync(APP_FILE, 'utf8');

// ── Build FULL import block ───────────────────────────────────────────────────
let importBlock = '\n// Upper-Intermediate Lesson Imports (Full B2)\n';
importBlock += "import UpperInterVocabPage from './pages/module/english/upper-intermediate/vocabulary/UpperInterVocabularyPage';\n";
importBlock += "import UpperInterPronPage from './pages/module/english/upper-intermediate/pronunciation/UpperInterPronunciationPage';\n";
importBlock += "import UpperInterSpeakingPage from './pages/module/english/upper-intermediate/speaking/UpperInterSpeakingPage';\n";

for (let n = 1; n <= 20; n++) importBlock += `import UpperInterVocabLesson${n} from './pages/module/english/upper-intermediate/vocabulary/Lesson${n}';\n`;
for (let n = 1; n <= 20; n++) importBlock += `import UpperInterPronLesson${n} from './pages/module/english/upper-intermediate/pronunciation/Lesson${n}';\n`;
for (let n = 1; n <= 20; n++) importBlock += `import UpperInterSpeakingLesson${n} from './pages/module/english/upper-intermediate/speaking/Lesson${n}';\n`;

// ── Build FULL route block ────────────────────────────────────────────────────
let routeBlock = '\n                  {/* ── Upper-Inter Vocab/Pron/Speaking Routes ── */}\n';
routeBlock += '                  <Route path="/modul/english/upper-intermediate/vocabulary" element={<UpperInterVocabPage />} />\n';
routeBlock += '                  <Route path="/modul/english/upper-intermediate/pronunciation" element={<UpperInterPronPage />} />\n';
routeBlock += '                  <Route path="/modul/english/upper-intermediate/speaking" element={<UpperInterSpeakingPage />} />\n';

const SKILL_MAP = [
  { name: 'vocabulary', comp: 'UpperInterVocabLesson' },
  { name: 'pronunciation', comp: 'UpperInterPronLesson' },
  { name: 'speaking', comp: 'UpperInterSpeakingLesson' },
];

for (const skill of SKILL_MAP) {
  for (let n = 1; n <= 20; n++) {
    routeBlock += `                  <Route path="/modul/english/upper-intermediate/${skill.name}/lesson-${n}" element={<${skill.comp}${n} />} />\n`;
  }
}

// ── Inject imports after existing UpperInterPage import  ──────────────────────
if (!content.includes('UpperInterVocabLesson1')) {
  const IMPORT_ANCHOR = "import UpperInterPage from './pages/module/english/upper-intermediate/UpperInterPage';";
  if (content.includes(IMPORT_ANCHOR)) {
    content = content.replace(IMPORT_ANCHOR, IMPORT_ANCHOR + importBlock);
    console.log('✅ Vocab/Pron/Speaking imports injected');
  } else {
    // Try after TTSNotice
    const FALLBACK_ANCHOR = "import TTSNotice from './components/shared/TTSNotice';";
    content = content.replace(FALLBACK_ANCHOR, importBlock + '\n' + FALLBACK_ANCHOR);
    console.log('✅ Imports injected via fallback anchor');
  }
}

// ── Inject routes before </Routes> ───────────────────────────────────────────
if (!content.includes('upper-intermediate/vocabulary/lesson-1')) {
  const ROUTE_ANCHOR = '</Routes>';
  content = content.replace(ROUTE_ANCHOR, routeBlock + '\n' + ROUTE_ANCHOR);
  console.log('✅ Vocab/Pron/Speaking routes injected');
}

fs.writeFileSync(APP_FILE, content, 'utf8');
console.log('🚀 App.tsx fully updated!');

// Verify
const finalCount = (content.match(/UpperInter/g) || []).length;
console.log(`   Total UpperInter references: ${finalCount}`);
