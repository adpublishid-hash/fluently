/**
 * Adds a "Selesai" footer button to all Grammar Lessons 2-14
 * that use LessonShell.
 */
const fs = require('fs');
const path = require('path');

const grammarDir = path.join(__dirname, '..', 'src', 'pages', 'module', 'english', 'beginner', 'grammar');

for (let i = 2; i <= 14; i++) {
  const file = path.join(grammarDir, `Lesson${i}.tsx`);
  if (!fs.existsSync(file)) continue;

  let content = fs.readFileSync(file, 'utf-8');

  // Skip if already has footer
  if (content.includes('footer=')) {
    console.log(`Lesson${i}.tsx — already has footer, skipping.`);
    continue;
  }

  // Ensure useNavigate is imported
  if (!content.includes('useNavigate')) {
    // Add import after first line
    content = content.replace(
      "import React, { useState } from 'react';",
      "import React, { useState } from 'react';\nimport { useNavigate } from 'react-router-dom';"
    );
  }

  // Ensure CheckCircle2 is imported from lucide-react
  if (!content.includes('CheckCircle2')) {
    content = content.replace(
      /from 'lucide-react';/,
      (match) => {
        // Find the import line and add CheckCircle2
        return match.replace("from 'lucide-react';", "CheckCircle2, } from 'lucide-react';").replace(', CheckCircle2, }', ', CheckCircle2 }');
      }
    );
    // Simpler approach - just add it
    if (!content.includes('CheckCircle2')) {
      content = content.replace(
        /} from 'lucide-react';/,
        "CheckCircle2 } from 'lucide-react';"
      );
      // Fix double comma
      content = content.replace(', CheckCircle2 }', ', CheckCircle2 }');
    }
  }

  // Add navigate hook if component doesn't have it
  // For LessonShell-based components, add navigate right after the component function starts
  const hasNavigateHook = content.includes('const navigate = useNavigate()');
  
  // Find the LessonShell opening tag and add footer prop
  // Match: <LessonShell ... > and add footer before the closing >
  content = content.replace(
    /(<LessonShell\s[\s\S]*?)(>)/,
    (match, before, close) => {
      // Need to inject navigate if not present
      let navigateDecl = '';
      if (!hasNavigateHook) {
        // We'll add it in the footer directly using window.history
      }
      
      return `${before}
            footer={() => (
                <button
                    onClick={() => window.history.back()}
                    className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg transition-all hover:opacity-90 active:scale-[0.98]"
                    style={{ background: 'linear-gradient(135deg, #8E44AD, #8E44ADcc)' }}
                >
                    <CheckCircle2 size={18} />
                    Selesai
                </button>
            )}
        ${close}`;
    }
  );

  fs.writeFileSync(file, content, 'utf-8');
  console.log(`Lesson${i}.tsx — ✅ footer added.`);
}

console.log('\nDone!');
