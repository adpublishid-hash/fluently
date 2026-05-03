/**
 * Adds a "Selesai" footer button to all Elementary Lessons
 */
const fs = require('fs');
const path = require('path');

const elementaryDir = path.join(__dirname, '..', 'src', 'pages', 'module', 'english', 'elementary');
const folders = ['grammar', 'speaking', 'vocabulary', 'pronunciation'];

const accentColors = {
  Vocabulary: '#2980B9',
  Grammar: '#8E44AD',
  Speaking: '#E74C3C',
  Pronunciation: '#E83E8C',
};

for (const folder of folders) {
  const dirPath = path.join(elementaryDir, folder);
  if (!fs.existsSync(dirPath)) continue;

  const files = fs.readdirSync(dirPath).filter(f => f.startsWith('Lesson') && f.endsWith('.tsx'));

  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    let content = fs.readFileSync(fullPath, 'utf-8');

    // Make sure we have CheckCircle2 from lucide-react
    if (!content.includes('CheckCircle2')) {
      if (content.includes('lucide-react')) {
        content = content.replace(/from 'lucide-react';/, "CheckCircle2 } from 'lucide-react';");
        content = content.replace(', CheckCircle2 }', ', CheckCircle2 }');
        content = content.replace(/}\s*CheckCircle2\s*}/, ', CheckCircle2 }');
      }
    }

    // Replace old Icons imports if CheckCircle2 conflicts
    content = content.replace(/CheckCircleIcon/g, 'CheckCircle2');
    
    // Convert useNavigate string match if it exists
    const hasNavigateHook = content.includes('const navigate = useNavigate()') || content.includes('const navigate=useNavigate()');

    if (!hasNavigateHook && !content.match(/import\s*\{\s*useNavigate\s*\}\s*from\s*'react-router-dom'/)) {
      content = content.replace(
        "import React",
        "import { useNavigate } from 'react-router-dom';\nimport React"
      );
    }
    
    // Inject footer into LessonShell if it doesn't exist
    if (content.includes('<LessonShell') && !content.includes('footer={() =>')) {
      const skillName = folder.charAt(0).toUpperCase() + folder.slice(1);
      const color = accentColors[skillName];

      content = content.replace(
        /\s*>\s*\{\(tabId\)/,
        `
            footer={() => (
                <button
                    onClick={() => window.history.back()}
                    className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg transition-all hover:opacity-90 active:scale-[0.98]"
                    style={{ background: 'linear-gradient(135deg, ${color}, ${color}cc)' }}
                >
                    <CheckCircle2 size={18} />
                    Selesai
                </button>
            )}
        >
            {(tabId)`
      );
    }
    
    // If it doesn't use LessonShell, inject it at the bottom above the root closing div
    if (!content.includes('<LessonShell') && !content.includes('Completed Footer')) {
        const skillName = folder.charAt(0).toUpperCase() + folder.slice(1);
        const color = accentColors[skillName];

        content = content.replace(
            /(<\/div>\s*<\/div>\s*<\/div>\s*;\s*};\s*export default)/,
            `      {/* ── Completed Footer ── */}
      <div className="sticky bottom-0 z-30 bg-white/80 backdrop-blur-xl border-t border-gray-100 px-4 py-3">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => window.history.back()}
            className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg transition-all hover:opacity-90 active:scale-[0.98]"
            style={{ background: 'linear-gradient(135deg, ${color}, ${color}cc)' }}
          >
            ✅ Selesai
          </button>
        </div>
      </div>
$1`
        );
        // Fallback replacement if the above doesn't match
        if(!content.includes('Completed Footer')) {
            content = content.replace(
            /(<\/div>\s*;\s*};\s*export default)/,
            `      {/* ── Completed Footer ── */}
      <div className="sticky bottom-0 z-30 bg-white/80 backdrop-blur-xl border-t border-gray-100 px-4 py-3">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => window.history.back()}
            className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg transition-all hover:opacity-90 active:scale-[0.98]"
            style={{ background: 'linear-gradient(135deg, ${color}, ${color}cc)' }}
          >
            ✅ Selesai
          </button>
        </div>
      </div>
$1`
            );
        }
    }

    fs.writeFileSync(fullPath, content, 'utf-8');
    console.log(`✅ ${folder}/${file} - Footer injected.`);
  }
}
console.log('Done!');
