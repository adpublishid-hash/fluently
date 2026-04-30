const fs = require('fs');
const path = require('path');

const SKILLS = ['pronunciation', 'speaking', 'vocabulary'];
const BASE_DIR = path.join(__dirname, '..', 'src', 'pages', 'module', 'english', 'elementary');

let fixedCount = 0;

for (const skill of SKILLS) {
  const dirPath = path.join(BASE_DIR, skill);
  if (!fs.existsSync(dirPath)) continue;

  for (let i = 1; i <= 15; i++) {
    const filePath = path.join(dirPath, `Lesson${i}.tsx`);
    if (!fs.existsSync(filePath)) continue;

    let content = fs.readFileSync(filePath, 'utf-8');
    const original = content;

    // 1. Remove LessonProps interface
    content = content.replace(/interface\s+LessonProps\s*\{[\s\S]*?\n\}/, '');

    // 2. Remove ViewState import
    content = content.replace(/import\s+\{\s*ViewState\s*\}\s+from\s+['"](?:\.\.\/)+types['"];?\n?/, '');

    // 3. Fix component signature
    // Matches patterns like `const Component: React.FC<LessonProps> = ({ onNavigate, userParams }) => {`
    // or `const Component: React.FC<LessonProps> = (props) => {`
    content = content.replace(/(const\s+\w+\s*:\s*React\.FC)<LessonProps>\s*=\s*\([^{)]*(?:\{[^}]*\})?[^)]*\)\s*=>/, '$1 = () =>');

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf-8');
      fixedCount++;
      console.log(`[FIXED] ${skill}/Lesson${i}.tsx`);
    } else {
      console.log(`[SKIPPED] ${skill}/Lesson${i}.tsx (No changes needed)`);
    }
  }
}

console.log(`\nSuccessfully fixed ${fixedCount} files.`);
