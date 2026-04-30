const fs = require('fs');
const path = require('path');

const grammarDir = path.join(__dirname, '..', 'src', 'pages', 'module', 'english', 'beginner', 'grammar');

for (let i = 2; i <= 14; i++) {
  const file = path.join(grammarDir, `Lesson${i}.tsx`);
  if (!fs.existsSync(file)) continue;

  let content = fs.readFileSync(file, 'utf-8');

  // Fix the broken LessonShell footer injection
  const brokenFooterRegex = /<BookOpen size=\{14\} \/\n\s*footer=\{\(\) => \([\s\S]*?<\/button>\n\s*\)\}\n\s*> \},/m;
  
  if (brokenFooterRegex.test(content)) {
    // 1. Remove the misplaced footer block to restore the BookOpen tag
    content = content.replace(brokenFooterRegex, '<BookOpen size={14} /> },');

    // 2. Safely add the footer block right after the tabs array before the closing '>' of LessonShell
    content = content.replace(
      /(\.filter\(Boolean\)\})([\s\n]*)>/,
      `$1
            footer={() => (
                <button
                    onClick={() => window.history.back()}
                    className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg transition-all hover:opacity-90 active:scale-[0.98]"
                    style={{ background: 'linear-gradient(135deg, #8E44AD, #8E44ADcc)' }}
                >
                    <CheckCircle2 size={18} />
                    Selesai
                </button>
            )}$2>`
    );
    
    fs.writeFileSync(file, content, 'utf-8');
    console.log(`Fixed syntax in Lesson${i}.tsx`);
  } else {
    console.log(`Lesson${i}.tsx does not contain the broken footer.`);
  }
}
