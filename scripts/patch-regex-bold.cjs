// patch-regex-bold.cjs
// Fixes broken /g regex in upper-intermediate grammar & pronunciation lessons
// The broken pattern: /**(.*?)**/g  →  should be: /\*\*(.*?)\*\*/g
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '../src/pages/module/english/upper-intermediate');

// Helper: replace bold markdown rendering with safe approach (no regex in JSX)
function patchFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Fix 1: grammar span bold - /**(.*?)**/g  with no backslashes
  // Replace the entire broken dangerouslySetInnerHTML pattern with safe version
  // Pattern in grammar files (theory points):
  const brokenGrammarPoint = `p.replace(/**(.*?)**/g,'<strong>$1</strong>')`;
  const fixedGrammarPoint = `p.replace(/\\*\\*(.*?)\\*\\*/g,'<strong>$1</strong>')`;

  // Pattern in grammar files (examples):
  const brokenGrammarEx = `ex.replace(/**(.*?)**/g,'<strong class="text-indigo-700">$1</strong>').replace(/→/g,'<span class="text-slate-400 mx-1">→</span>')`;
  const fixedGrammarEx = `ex.replace(/\\*\\*(.*?)\\*\\*/g,'<strong class="text-indigo-700">$1</strong>').replace(/→/g,'<span class="text-slate-400 mx-1">→</span>')`;

  // Pattern in pronunciation files (points):
  const brokenPronPoint = `p.replace(/**(.*?)**/g,'<strong class=&quot;text-purple-800&quot;>$1</strong>')`;
  const fixedPronPoint = `p.replace(/\\*\\*(.*?)\\*\\*/g,'<strong class=\\"text-purple-800\\">$1</strong>')`;

  if (content.includes(brokenGrammarPoint)) {
    content = content.split(brokenGrammarPoint).join(fixedGrammarPoint);
    changed = true;
  }
  if (content.includes(brokenGrammarEx)) {
    content = content.split(brokenGrammarEx).join(fixedGrammarEx);
    changed = true;
  }
  if (content.includes(brokenPronPoint)) {
    content = content.split(brokenPronPoint).join(fixedPronPoint);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  }
  return false;
}

const DIRS = ['grammar', 'pronunciation'];
let total = 0;

for (const dir of DIRS) {
  const folder = path.join(BASE, dir);
  for (let n = 1; n <= 20; n++) {
    const fp = path.join(folder, `Lesson${n}.tsx`);
    if (fs.existsSync(fp)) {
      if (patchFile(fp)) {
        console.log(`✅ Patched: ${dir}/Lesson${n}.tsx`);
        total++;
      } else {
        console.log(`⚪ No change: ${dir}/Lesson${n}.tsx`);
      }
    }
  }
}

console.log(`\n🔧 Done. ${total} files patched.`);
