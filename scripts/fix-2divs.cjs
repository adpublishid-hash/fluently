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

    // Use flexible whitespace matching
    content = content.replace(/<\/div>\s*<\/div>\s*<\/div>\)\}<\/LessonShell>\);\};/g, '</div></div>)}</LessonShell>);};');

    // For any files that accidentally only got 1 div
    content = content.replace(/([^>])\s*<\/div>\)\}<\/LessonShell>\);\};/g, '$1</div></div>)}</LessonShell>);};');

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf-8');
      fixedCount++;
      console.log(`[FIXED WHITESPACE DIVS] ${skill}/Lesson${i}.tsx`);
    }
  }
}

console.log(`\nSuccessfully fixed closing tags in ${fixedCount} files.`);
