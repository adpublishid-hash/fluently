/**
 * fix_pronun_fragment.cjs — fixes missing fragment open + {pronunModal} render
 * for Lesson2-10 that have pronunModal defined but not rendered
 */
const fs = require('fs');
const path = require('path');
const DIR = path.join(__dirname, 'src/pages/module/english/beginner/pronunciation');

const LESSONS_TO_FIX = [2, 3, 4, 5, 6, 7, 9, 10];

for (const id of LESSONS_TO_FIX) {
  const file = path.join(DIR, `Lesson${id}.tsx`);
  if (!fs.existsSync(file)) continue;

  let src = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');

  // Already fixed?
  if (src.includes('{pronunModal}') && src.includes('    <>\n    {pronunModal}')) {
    console.log(`✓  Lesson${id} already ok`);
    continue;
  }

  // ── 1. Find the return and wrap in fragment ───────────────────────────────
  // Pattern: "  return (\n" or "    return (\n" followed by some spaces then <LessonShell
  const returnMatch = src.match(/(\s+return \(\n)(\s+)<LessonShell/);
  if (!returnMatch) {
    console.warn(`⚠  Lesson${id}: return pattern not found`);
    continue;
  }

  const returnStr = returnMatch[1];   // e.g. "  return (\n" or "    return (\n"
  const lessonIndent = returnMatch[2]; // e.g. "        "

  if (!src.includes('{pronunModal}')) {
    // Replace: "  return (\n        <LessonShell" 
    // with:    "  return (\n    <>\n    {pronunModal}\n        <LessonShell"
    src = src.replace(
      returnStr + lessonIndent + '<LessonShell',
      returnStr + '    <>\n    {pronunModal}\n' + lessonIndent + '<LessonShell'
    );
    console.log(`  → Lesson${id}: fragment open + {pronunModal} injected`);
  }

  // ── 2. Fix orphan </> or missing close ───────────────────────────────────
  // Ensure fragment close is correct: after </LessonShell>
  if (!src.includes('    </>\n  );')) {
    // Add fragment close
    src = src.replace(
      lessonIndent + '</LessonShell>\n  );\n};',
      lessonIndent + '</LessonShell>\n    </>\n  );\n};'
    );
    // Try with 4-space indent too
    if (!src.includes('    </>\n  );')) {
      src = src.replace(
        '        </LessonShell>\n    );\n};',
        '        </LessonShell>\n    </>\n    );\n};'
      );
    }
    if (!src.includes('    </>\n  );') && !src.includes('    </>\n    );')) {
      // Try the pattern seen in Lesson8
      src = src.replace(
        '        </LessonShell>\n    );\n}',
        '        </LessonShell>\n    </>\n    );\n}'
      );
    }
  }

  fs.writeFileSync(file, src, 'utf8');
  console.log(`✅ Lesson${id}.tsx fixed`);
}

console.log('\nDone!');
