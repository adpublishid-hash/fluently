/**
 * fix_vocab_fragment.cjs — adds missing <> opening fragment to Lesson3-10
 */
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, 'src/pages/module/english/beginner/vocabulary');

for (let id = 3; id <= 10; id++) {
  const file = path.join(DIR, `Lesson${id}.tsx`);
  let src = fs.readFileSync(file, 'utf8');

  // Check if missing fragment open
  if (!src.includes('<>\n    {vocabModal}') && src.includes('</>\n  );')) {
    // Fix: add <> and {vocabModal} after "return ("
    // The current pattern after script: "return (\n        <LessonShell"
    src = src.replace(
      '\n  return (\n        <LessonShell',
      '\n  return (\n    <>\n    {vocabModal}\n        <LessonShell'
    );
    // Also handle 4-space indent variant
    src = src.replace(
      '\n  return (\n    <LessonShell',
      '\n  return (\n    <>\n    {vocabModal}\n    <LessonShell'
    );
    fs.writeFileSync(file, src, 'utf8');
    console.log(`✅ Lesson${id}: <> added`);
  } else {
    console.log(`✓  Lesson${id}: already ok`);
  }
}

console.log('\nDone!');
