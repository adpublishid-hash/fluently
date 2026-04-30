const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '../src/pages/module/english/elementary/pronunciation');

for (const i of [1, 2, 3, 6, 15]) {
  const f = path.join(dir, `Lesson${i}.tsx`);
  if (!fs.existsSync(f)) continue;
  const lines = fs.readFileSync(f, 'utf8').split('\n');
  lines.forEach((l, idx) => {
    const t = l.trim();
    if (t.includes('Quiz') || t.includes('MINIMAL_PAIRS') || t.includes("id: 'practice'") || t.includes("tabId ===")) {
      console.log(`L${i}:${idx + 1}: ${t.substring(0, 90)}`);
    }
  });
  console.log('---');
}
