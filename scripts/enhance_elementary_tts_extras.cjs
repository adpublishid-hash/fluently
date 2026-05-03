/**
 * Second pass: clean up pronunciation lessons where playSound has a non-standard
 * signature (e.g. `(text, rate)` or `(text, accent)`) and wasn't matched by the
 * initial enhance_elementary.cjs script.
 */
const fs = require('fs');
const path = require('path');

const files = [];
for (let i = 1; i <= 15; i++) {
  files.push(`src/pages/module/english/elementary/pronunciation/Lesson${i}.tsx`);
}

let touched = 0;

for (const rel of files) {
  const file = path.join(__dirname, '..', rel);
  if (!fs.existsSync(file)) { console.log(`  (missing) ${rel}`); continue; }
  let code = fs.readFileSync(file, 'utf8');
  const before = code;

  // Signature: (text: string, rate: number = 0.9) => { ...browser TTS... };
  code = code.replace(
    /const\s+(playSound|handlePlayAudio)\s*=\s*\(\s*text\s*:\s*string\s*,\s*rate\s*:\s*number\s*=\s*[\d.]+\s*\)\s*=>\s*\{[\s\S]*?window\.speechSynthesis\.speak\([^)]*\);?\s*\}\s*\};?/g,
    'const $1 = (text: string, rate: number = 0.9) => { playAudio(text, rate); };',
  );

  // Signature: (text: string, accent: 'US' | 'UK') => { ...browser TTS with voice... };
  code = code.replace(
    /const\s+(playSound|handlePlayAudio)\s*=\s*\(\s*text\s*:\s*string\s*,\s*accent\s*:\s*['"]US['"]\s*\|\s*['"]UK['"]\s*\)\s*=>\s*\{[\s\S]*?window\.speechSynthesis\.speak\([^)]*\);?\s*\}\s*\};?/g,
    "const $1 = (text: string, _accent: 'US' | 'UK') => { playAudio(text, 0.9); };",
  );

  // Remove the voices useEffect + voices state (Lesson14 only) — browser-voice based
  code = code.replace(
    /\s*\/\/\s*Audio Logic\s*\n\s*const\s+\[voices,\s*setVoices\]\s*=\s*useState<SpeechSynthesisVoice\[\]>\(\[\]\);\s*\n\s*\n\s*useEffect\(\(\)\s*=>\s*\{[\s\S]*?\},\s*\[\]\);\s*\n/,
    '\n',
  );

  // Drop any `useEffect` import if nothing else uses it (simple check — keep safe: leave it be)
  // Remove lone `SpeechSynthesisVoice` references lingering, if any.

  if (code !== before) {
    fs.writeFileSync(file, code);
    touched++;
    console.log(`✓ ${rel}`);
  } else {
    console.log(`  (unchanged) ${rel}`);
  }
}

console.log(`\nModified ${touched} files.`);
