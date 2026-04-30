const fs = require('fs');
const path = require('path');

const scriptPath = path.join(__dirname, 'generate-listening-full.cjs');
let src = fs.readFileSync(scriptPath, 'utf8');

// Fix Q9: only 3 opts — add 4th option
const bad9 = `    { q: "What does Dr. Walsh say about Universal Basic Income?", opts: ["She strongly opposes it", "She supports it completely without reservation", "She is sympathetic in principle but concerned about implementation and the limits of income alone"], ans: "She is sympathetic in principle but concerned about implementation and the limits of income alone",`;
const fix9 = `    { q: "What does Dr. Walsh say about Universal Basic Income?", opts: ["She strongly opposes it", "She supports it completely without reservation", "She is sympathetic in principle but concerned about implementation and the limits of income alone", "She advocates replacing UBI with higher minimum wages"], ans: "She is sympathetic in principle but concerned about implementation and the limits of income alone",`;

// Fix Q20: extra ']' bracket — wrong: ...evidence-based\"], ans: \n    The ], is making the opts array close prematurely
const bad20 = `    { q: "Which of the following best describes the overall tone of both economists?", opts: ["Optimistic and uncritical about automation", "Dismissive of workers' concerns", "Analytically engaged — Nakamura more optimistic, Walsh more cautionary, but both evidence-based"], ans: "Analytically engaged — Nakamura more optimistic, Walsh more cautionary, but both evidence-based"], exp:`;
const fix20 = `    { q: "Which of the following best describes the overall tone of both economists?", opts: ["Optimistic and uncritical about automation", "Dismissive of workers' concerns", "Analytically engaged — Nakamura more optimistic, Walsh more cautionary, but both evidence-based", "Purely theoretical with no policy relevance"], ans: "Analytically engaged — Nakamura more optimistic, Walsh more cautionary, but both evidence-based", exp:`;

if (src.includes(bad9)) {
  src = src.replace(bad9, fix9);
  console.log('✅ Patched Q9 (missing 4th option)');
} else {
  console.log('⚠️  Q9 pattern not found — may already be fixed');
}

if (src.includes(bad20)) {
  src = src.replace(bad20, fix20);
  console.log('✅ Patched Q20 (extra bracket)');
} else {
  console.log('⚠️  Q20 pattern not found — trying alternate...');
  
  // Try simpler detection
  const bad20v2 = `"Analytically engaged — Nakamura more optimistic, Walsh more cautionary, but both evidence-based"], ans:`;
  const fix20v2 = `"Analytically engaged — Nakamura more optimistic, Walsh more cautionary, but both evidence-based", "Purely theoretical with no policy relevance"], ans:`;
  if (src.includes(bad20v2)) {
    src = src.replace(bad20v2, fix20v2);
    console.log('✅ Patched Q20 v2 (extra bracket via simpler match)');
  } else {
    console.log('❌ Could not find Q20 pattern');
  }
}

fs.writeFileSync(scriptPath, src, 'utf8');
console.log('\n✔ Patched script saved.');
