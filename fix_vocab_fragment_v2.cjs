/**
 * fix_vocab_fragment_v2.cjs
 * Scans all vocab lessons for orphan </> and adds <> + {vocabModal} 
 */
const fs = require('fs');
const path = require('path');
const DIR = path.join(__dirname, 'src/pages/module/english/beginner/vocabulary');

for (let id = 3; id <= 11; id++) {
  const file = path.join(DIR, `Lesson${id}.tsx`);
  if (!fs.existsSync(file)) continue;
  let src = fs.readFileSync(file, 'utf8');

  // Detect: has </> but the return() block doesn't start with <>
  const returnBlock = src.match(/return \(\n([\s\S]*)/);
  if (!returnBlock) { console.log(`SKIP ${id}: no return`); continue; }

  const afterReturn = returnBlock[1];
  const firstTag = afterReturn.trimStart().slice(0, 4);

  if (firstTag === '<>\n' || firstTag === '<>\r') {
    console.log(`✓  Lesson${id}: already has <>`);
    continue;
  }

  // Fragment open is missing — add it
  // Find position of "return (\n" and insert <> + {vocabModal} after it
  // Also ensure </> is correct

  // Pattern 1: return (\n    <>\n    {vocabModal}\n    <LessonShell (already fixed correctly)
  // Pattern 2: return (\n        <LessonShell  (needs fix)
  // Pattern 3: return (\n    <LessonShell (needs fix)

  let fixed = false;

  // Try 8-space LessonShell
  if (src.includes('\n  return (\n        <LessonShell')) {
    src = src.replace(
      '\n  return (\n        <LessonShell',
      '\n  return (\n    <>\n    {vocabModal}\n        <LessonShell'
    );
    fixed = true;
  }
  // Try 4-space LessonShell
  else if (src.includes('\n  return (\n    <LessonShell')) {
    src = src.replace(
      '\n  return (\n    <LessonShell',
      '\n  return (\n    <>\n    {vocabModal}\n    <LessonShell'
    );
    fixed = true;
  }

  if (!fixed) {
    console.log(`⚠  Lesson${id}: could not fix automatically`);
    continue;
  }

  // Ensure closing fragment is correct
  // Look for </LessonShell> followed by </> then );
  if (!src.includes('</LessonShell>\n    </>\n  );')) {
    src = src.replace(
      /(<\/LessonShell>\n)([ \t]*<\/>)/,
      `$1    </>`
    );
  }

  fs.writeFileSync(file, src, 'utf8');
  console.log(`✅ Lesson${id}: fixed`);
}
console.log('\nDone!');
