// inject-upper-inter-listening.cjs
// Injects listening routes and imports into App.tsx
const fs = require('fs');
const path = require('path');

const APP_FILE = path.join(__dirname, '../src/App.tsx');
let content = fs.readFileSync(APP_FILE, 'utf8');

if (content.includes('UpperInterListeningPage')) {
  console.log('⚠️  Listening routes already exist, skipping.');
  process.exit(0);
}

// ── Build imports ─────────────────────────────────────────────────────────────
let importBlock = '\nimport UpperInterListeningPage from \'./pages/module/english/upper-intermediate/listening/UpperInterListeningPage\';\n';
for (let n = 1; n <= 20; n++) {
  importBlock += `import UpperInterListeningLesson${n} from './pages/module/english/upper-intermediate/listening/Lesson${n}';\n`;
}

// ── Build routes ──────────────────────────────────────────────────────────────
let routeBlock = '\n                  {/* ── Upper-Intermediate Listening Routes ── */}\n';
routeBlock += '                  <Route path="/modul/english/upper-intermediate/listening" element={<UpperInterListeningPage />} />\n';
for (let n = 1; n <= 20; n++) {
  routeBlock += `                  <Route path="/modul/english/upper-intermediate/listening/lesson-${n}" element={<UpperInterListeningLesson${n} />} />\n`;
}

// ── Inject ────────────────────────────────────────────────────────────────────
const IMPORT_ANCHOR = "import TTSNotice from './components/shared/TTSNotice';";
if (content.includes(IMPORT_ANCHOR)) {
  content = content.replace(IMPORT_ANCHOR, importBlock + '\n' + IMPORT_ANCHOR);
  console.log('✅ Listening imports injected');
} else {
  // Append before UpperInterPage import
  const FALLBACK = "import UpperInterPage from './pages/module/english/upper-intermediate/UpperInterPage';";
  content = content.replace(FALLBACK, importBlock + '\n' + FALLBACK);
  console.log('✅ Listening imports injected (via fallback anchor)');
}

const ROUTE_ANCHOR = '</Routes>';
content = content.replace(ROUTE_ANCHOR, routeBlock + '\n' + ROUTE_ANCHOR);
console.log('✅ Listening routes injected');

fs.writeFileSync(APP_FILE, content, 'utf8');
console.log('🚀 App.tsx updated with Upper-Intermediate Listening (21 routes)!');
