const fs = require('fs');
const path = require('path');

const SKILLS = ['pronunciation', 'speaking', 'vocabulary', 'grammar'];
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

    // Find the actual componentName defined in the file
    // e.g., const PronunLesson10: React.FC = () => {
    const match = content.match(/const\s+([A-Za-z0-9_]+Lesson\d+)\s*:\s*React\.FC/);
    if (match && match[1]) {
      const actualName = match[1];
      // Replace the export default to match the actual name
      content = content.replace(/export\s+default\s+[A-Za-z0-9_]+;/, `export default ${actualName};`);
    }

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf-8');
      fixedCount++;
      console.log(`[FIXED EXPORT] ${skill}/Lesson${i}.tsx -> export default ${match[1]}`);
    }
  }
}

console.log(`\nSuccessfully fixed exports in ${fixedCount} files.`);
