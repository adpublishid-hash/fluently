// fix-upper-inter-page-storage.cjs
// Fixes the localStorage reading in all 4 upper-intermediate skill pages
// They should use: JSON.parse(localStorage.getItem(`talky_${mod}_completed`))
// which is how lessonCompletion.ts stores data

const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '../src/pages/module/english/upper-intermediate');

const FILES = [
  {
    file: 'vocabulary/UpperInterVocabularyPage.tsx',
    mod: 'upper_intermediate_vocabulary',
  },
  {
    file: 'grammar/UpperInterGrammarPage.tsx',
    mod: 'upper_intermediate_grammar',
  },
  {
    file: 'pronunciation/UpperInterPronunciationPage.tsx',
    mod: 'upper_intermediate_pronunciation',
  },
  {
    file: 'speaking/UpperInterSpeakingPage.tsx',
    mod: 'upper_intermediate_speaking',
  },
];

for (const cfg of FILES) {
  const fp = path.join(BASE, cfg.file);
  let content = fs.readFileSync(fp, 'utf8');

  // Replace the localStorage.getItem per-lesson pattern with the array-based one
  const OLD_PATTERN_RE = /const completedSet = new Set\(\s*Array\.from\(\{ length: SKILL\.totalDays \}, \(_, i\) => i \+ 1\)\.filter\(n =>\s*localStorage\.getItem\(`lesson_done_${cfg.mod}_\$\{n\}`\) === 'true'\s*\)\s*\);/gs;
  
  const NEW_PATTERN = `const _completed: number[] = (() => {
    try { return JSON.parse(localStorage.getItem('talky_${cfg.mod}_completed') || '[]'); } catch { return []; }
  })();
  const completedSet = new Set(_completed);`;

  if (OLD_PATTERN_RE.test(content)) {
    content = content.replace(OLD_PATTERN_RE, NEW_PATTERN);
    console.log(`✅ Fixed storage key: ${cfg.file}`);
  } else {
    // Try simpler replacement
    const lines = content.split('\n');
    const start = lines.findIndex(l => l.includes('const completedSet = new Set('));
    if (start !== -1) {
      // Find end of the block (closing );)
      let end = start;
      for (let i = start; i < Math.min(start + 10, lines.length); i++) {
        if (lines[i].trim().startsWith(');')) { end = i; break; }
      }
      lines.splice(start, end - start + 1, 
        `  const _completed: number[] = (() => {`,
        `    try { return JSON.parse(localStorage.getItem('talky_${cfg.mod}_completed') || '[]'); } catch { return []; }`,
        `  })();`,
        `  const completedSet = new Set(_completed);`
      );
      content = lines.join('\n');
      console.log(`✅ Fixed via line splice: ${cfg.file}`);
    } else {
      console.log(`⚠️  Pattern not found in: ${cfg.file}`);
    }
  }

  fs.writeFileSync(fp, content, 'utf8');
}

console.log('🚀 Storage keys synchronized!');
