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

    // Inject the missing colon branch of the ternary operator that was opened with `tabId === 'learn' ? (`
    content = content.replace(/<\/div>\s*<\/div>\)\}<\/LessonShell>\);\};/g, '</div></div>) : (<div className="p-8 text-center animate-fade-in"><p className="text-[var(--color-text-secondary)]">Latihan belum tersedia.</p></div>)}</LessonShell>);};');

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf-8');
      fixedCount++;
      console.log(`[FIXED TERNARY] ${skill}/Lesson${i}.tsx`);
    }
  }
}

console.log(`\nSuccessfully fixed ternary in ${fixedCount} files.`);
