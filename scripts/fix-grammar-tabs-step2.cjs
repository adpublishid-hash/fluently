/**
 * fix-grammar-tabs-step2.cjs
 * Add 'quiz' tab to Lesson 2-13 tab configs (step 2 of fix)
 */
const fs   = require('fs');
const path = require('path');

const GRAMMAR_DIR = path.join(
  __dirname,
  '../src/pages/module/english/beginner/grammar'
);

let fixed = 0;

for (let n = 2; n <= 13; n++) {
  const filePath = path.join(GRAMMAR_DIR, `Lesson${n}.tsx`);
  let src = fs.readFileSync(filePath, 'utf8');
  const original = src;

  // Already has quiz tab
  if (src.includes("id: 'quiz'")) {
    console.log(`⏭️  L${n}: already has quiz tab`);
    continue;
  }

  // The tabs block looks like exactly this in all Lesson 2-13:
  // "                { id: 'practice', label: 'Latihan', icon: <PenTool size={14} /> }\n            ].filter(Boolean)}"
  const oldTabs = "                { id: 'practice', label: 'Latihan', icon: <PenTool size={14} /> }\n            ].filter(Boolean)}";
  const newTabs = "                { id: 'practice', label: 'Latihan', icon: <PenTool size={14} /> },\n                { id: 'quiz', label: 'Kuis', icon: <Star size={14} /> },\n            ]}";

  if (src.includes(oldTabs)) {
    src = src.replace(oldTabs, newTabs);
    fs.writeFileSync(filePath, src, 'utf8');
    console.log(`✅ L${n}: added quiz tab`);
    fixed++;
  } else {
    // Try alternate spacing
    const alt = "{ id: 'practice', label: 'Latihan', icon: <PenTool size={14} /> }\n            ].filter(Boolean)}";
    if (src.includes(alt)) {
      src = src.replace(alt, "{ id: 'practice', label: 'Latihan', icon: <PenTool size={14} /> },\n                { id: 'quiz', label: 'Kuis', icon: <Star size={14} /> },\n            ]}");
      fs.writeFileSync(filePath, src, 'utf8');
      console.log(`✅ L${n}: added quiz tab (alt)`);
      fixed++;
    } else {
      console.log(`⚠️  L${n}: pattern not found — checking...`);
      // Find the practice tab line
      const idx = src.indexOf("id: 'practice'");
      if (idx !== -1) {
        const lineEnd = src.indexOf('\n', idx);
        const afterLine = src.slice(lineEnd);
        console.log(`  Next chars: ${JSON.stringify(afterLine.slice(0, 60))}`);
      }
    }
  }
}

console.log(`\n✅ Fixed: ${fixed}`);
