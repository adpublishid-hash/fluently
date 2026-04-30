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

    // We mistakenly replaced 3 div closing tags with 1 div closing tag + )}</LessonShell>...
    // Let's restore the two missing div closing tags.
    // The pattern is currently: `</div>)}</LessonShell>);};export default`
    // We want to change it to: `</div></div></div>)}</LessonShell>);};export default`
    content = content.replace(/(?<!<\/div>\s*<\/div>\s*)<\/div>\)\}<\/LessonShell>\);\};\s*export default/g, '</div></div></div>)}</LessonShell>);};\nexport default');

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf-8');
      fixedCount++;
      console.log(`[FIXED CLOSING TAGS] ${skill}/Lesson${i}.tsx`);
    }

    // Also let's check for any missing icons like StarIcon or InfoIcon or TrendUpIcon or Volume2Icon 
    // that the previous script from AI Kamus didn't clean up if it didn't run the full regex.
    // Actually, typescript build output mainly showed JSX tag errors. We'll wait on icon errors.
  }
}

console.log(`\nSuccessfully fixed closing tags in ${fixedCount} files.`);
