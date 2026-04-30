/**
 * fix_vocab_encoding.cjs — fixes encoding issues in Lesson3-10 modal text
 * Replaces mojibake emoji strings with correct Unicode
 */
const fs = require('fs');
const path = require('path');
const DIR = path.join(__dirname, 'src/pages/module/english/beginner/vocabulary');

// These are the broken sequences and what they should be
const FIXES = [
  // Trophy emoji
  ['ðŸ†', '🏆'],
  // Party emoji  
  ['ðŸŽ‰', '🎉'],
  // Star emoji
  ['â­', '⭐'],
  // Next arrow
  ['â€º', '›'],
  // Bullet/separator in subtitle
  ['â€¢', '•'],
];

let fixedCount = 0;

for (let id = 3; id <= 10; id++) {
  const file = path.join(DIR, `Lesson${id}.tsx`);
  if (!fs.existsSync(file)) continue;
  
  // Read as latin1 to preserve bytes
  let src = fs.readFileSync(file, 'utf8');
  
  let changed = false;
  for (const [bad, good] of FIXES) {
    if (src.includes(bad)) {
      while (src.includes(bad)) {
        src = src.replace(bad, good);
      }
      changed = true;
    }
  }
  
  if (changed) {
    fs.writeFileSync(file, src, 'utf8');
    console.log(`✅ Lesson${id}: encoding fixed`);
    fixedCount++;
  } else {
    console.log(`✓  Lesson${id}: ok`);
  }
}

console.log(`\nFixed ${fixedCount} files`);
