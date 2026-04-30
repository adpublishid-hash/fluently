const fs = require('fs');
const path = require('path');

const SKILLS = ['pronunciation', 'speaking', 'vocabulary'];
const BASE_DIR = path.join(__dirname, '..', 'src', 'pages', 'module', 'english', 'elementary');

let fixedCount = 0;

for (const skill of SKILLS) {
  const dirPath = path.join(BASE_DIR, skill);
  if (!fs.existsSync(dirPath)) continue;

  for (let i = 1; i <= 20; i++) {
    const filePath = path.join(dirPath, `Lesson${i}.tsx`);
    if (!fs.existsSync(filePath)) continue;

    let content = fs.readFileSync(filePath, 'utf-8');
    const original = content;

    // Fix the specific { /* Content */ } issue causing the parser error
    content = content.replace(/\{\(\s*tabId\s*\)\s*=>\s*tabId\s*===\s*['"]learn['"]\s*\?\s*\(\s*\{[^}]*\}/g, "{(tabId) => tabId === 'learn' ? (");

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf-8');
      fixedCount++;
      console.log(`[FIXED JSX] ${skill}/Lesson${i}.tsx`);
    }
  }
}

console.log(`\nSuccessfully fixed JSX in ${fixedCount} files.`);
