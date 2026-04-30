// inject-upper-inter-routes.cjs
const fs = require('fs');
const path = require('path');

const APP_FILE = path.join(__dirname, '../src/App.tsx');
let content = fs.readFileSync(APP_FILE, 'utf8');

// ── Build import block ────────────────────────────────────────────────────────
let importBlock = '\n// Upper-Intermediate Pages & Lessons\n';
importBlock += "import UpperInterPage from './pages/module/english/upper-intermediate/UpperInterPage';\n";
importBlock += "import UpperInterVocabPage from './pages/module/english/upper-intermediate/vocabulary/UpperInterVocabularyPage';\n";
importBlock += "import UpperInterGrammarPage from './pages/module/english/upper-intermediate/grammar/UpperInterGrammarPage';\n";
importBlock += "import UpperInterPronPage from './pages/module/english/upper-intermediate/pronunciation/UpperInterPronunciationPage';\n";
importBlock += "import UpperInterSpeakingPage from './pages/module/english/upper-intermediate/speaking/UpperInterSpeakingPage';\n";

for (let n = 1; n <= 20; n++) importBlock += `import UpperInterVocabLesson${n} from './pages/module/english/upper-intermediate/vocabulary/Lesson${n}';\n`;
for (let n = 1; n <= 20; n++) importBlock += `import UpperInterGrammarLesson${n} from './pages/module/english/upper-intermediate/grammar/Lesson${n}';\n`;
for (let n = 1; n <= 20; n++) importBlock += `import UpperInterPronLesson${n} from './pages/module/english/upper-intermediate/pronunciation/Lesson${n}';\n`;
for (let n = 1; n <= 20; n++) importBlock += `import UpperInterSpeakingLesson${n} from './pages/module/english/upper-intermediate/speaking/Lesson${n}';\n`;

// ── Build route block ─────────────────────────────────────────────────────────
let routeBlock = '\n                  {/* ── Upper-Intermediate Routes ── */}\n';
routeBlock += '                  <Route path="/modul/english/upper-intermediate" element={<UpperInterPage />} />\n';
routeBlock += '                  <Route path="/modul/english/upper-intermediate/vocabulary" element={<UpperInterVocabPage />} />\n';
routeBlock += '                  <Route path="/modul/english/upper-intermediate/grammar" element={<UpperInterGrammarPage />} />\n';
routeBlock += '                  <Route path="/modul/english/upper-intermediate/pronunciation" element={<UpperInterPronPage />} />\n';
routeBlock += '                  <Route path="/modul/english/upper-intermediate/speaking" element={<UpperInterSpeakingPage />} />\n';

const SKILL_MAP = [
  { name: 'vocabulary', comp: 'UpperInterVocabLesson' },
  { name: 'grammar', comp: 'UpperInterGrammarLesson' },
  { name: 'pronunciation', comp: 'UpperInterPronLesson' },
  { name: 'speaking', comp: 'UpperInterSpeakingLesson' },
];

for (const skill of SKILL_MAP) {
  for (let n = 1; n <= 20; n++) {
    routeBlock += `                  <Route path="/modul/english/upper-intermediate/${skill.name}/lesson-${n}" element={<${skill.comp}${n} />} />\n`;
  }
}

// ── Inject into App.tsx ───────────────────────────────────────────────────────
const IMPORT_ANCHOR = "import TTSNotice from './components/shared/TTSNotice';";
const ROUTE_ANCHOR = '</Routes>';

if (content.includes('UpperInterPage')) {
  console.log('⚠️  Upper-inter already injected, skipping.');
} else {
  // Inject imports
  if (content.includes(IMPORT_ANCHOR)) {
    content = content.replace(IMPORT_ANCHOR, importBlock + '\n' + IMPORT_ANCHOR);
    console.log('✅ Imports injected');
  } else {
    console.error('❌ Import anchor not found!');
    process.exit(1);
  }

  // Inject routes
  if (content.includes(ROUTE_ANCHOR)) {
    content = content.replace(ROUTE_ANCHOR, routeBlock + '\n' + ROUTE_ANCHOR);
    console.log('✅ Routes injected');
  } else {
    console.error('❌ Route anchor not found!');
    process.exit(1);
  }

  fs.writeFileSync(APP_FILE, content, 'utf8');
  console.log('🚀 App.tsx updated with', 85, 'imports and', 85, 'routes for Upper-Intermediate!');
}
