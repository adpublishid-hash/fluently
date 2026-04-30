/**
 * register-vocab-routes.cjs
 * Adds imports + routes for AdvancedVocabularyLesson21-50 to App.tsx
 */
const fs = require('fs');
const path = require('path');

const APP_FILE = path.join(__dirname, '../src/App.tsx');
let content = fs.readFileSync(APP_FILE, 'utf8');

// ── 1. Build import lines for Lesson21-50 ──────────────────────
const importLines = Array.from({ length: 30 }, (_, i) => {
  const n = i + 21;
  return `import AdvancedVocabularyLesson${n} from './pages/module/english/advanced/vocabulary/Lesson${n}';`;
}).join('\n');

// Find anchor: import for Lesson20 vocabulary
const importAnchor = `import AdvancedVocabularyLesson20 from './pages/module/english/advanced/vocabulary/Lesson20';`;
if (!content.includes(importAnchor)) {
  console.error('❌ Could not find import anchor for AdvancedVocabularyLesson20');
  process.exit(1);
}
content = content.replace(importAnchor, importAnchor + '\n' + importLines);
console.log('✅ Added imports for Lesson21-50');

// ── 2. Build route lines for Lesson21-50 ──────────────────────
const routeLines = Array.from({ length: 30 }, (_, i) => {
  const n = i + 21;
  return `                  <Route path="/modul/english/advanced/vocabulary/lesson-${n}" element={<AdvancedVocabularyLesson${n} />} />`;
}).join('\n');

// Find anchor: route for lesson-20
const routeAnchor = `<Route path="/modul/english/advanced/vocabulary/lesson-20" element={<AdvancedVocabularyLesson20 />} />`;
if (!content.includes(routeAnchor)) {
  console.error('❌ Could not find route anchor for lesson-20');
  process.exit(1);
}
content = content.replace(routeAnchor, routeAnchor + '\n' + routeLines);
console.log('✅ Added routes for lesson-21 to lesson-50');

fs.writeFileSync(APP_FILE, content, 'utf8');
console.log('\n🎯 App.tsx updated! Advanced Vocabulary now has 50 routed lessons.');
