/**
 * fix_pronun_encoding.cjs — fixes mojibake emoji in all pronunciation lessons
 */
const fs = require('fs');
const path = require('path');
const DIR = path.join(__dirname, 'src/pages/module/english/beginner/pronunciation');

// Read file as latin-1 bytes then fix common mojibake sequences
// These are UTF-8 sequences misread as latin-1

const EMOJI_FIXES = [
  // 4-byte emoji sequences (most emoji)
  ['\xF0\x9F\x8E\x93', '🎓'],  // 🎓
  ['\xF0\x9F\x8E\xB5', '🎵'],  // 🎵
  ['\xF0\x9F\x8E\xB6', '🎶'],  // 🎶
  ['\xF0\x9F\x8E\xA4', '🎤'],  // 🎤
  ['\xF0\x9F\x8E\xA7', '🎧'],  // 🎧
  ['\xF0\x9F\x8E\x89', '🎉'],  // 🎉
  ['\xF0\x9F\x8F\x86', '🏆'],  // 🏆
  ['\xF0\x9F\x92\xAA', '💪'],  // 💪
  ['\xF0\x9F\x92\xA1', '💡'],  // 💡
  ['\xF0\x9F\x94\x8A', '🔊'],  // 🔊
  ['\xF0\x9F\x94\x9D', '🔝'],  // 🔝
  ['\xF0\x9F\x93\x9A', '📚'],  // 📚
  ['\xF0\x9F\x93\x9D', '📝'],  // 📝
  ['\xF0\x9F\x93\x96', '📖'],  // 📖
  ['\xF0\x9F\x8C\x9F', '🌟'],  // 🌟
  ['\xF0\x9F\x8C\x8D', '🌍'],  // 🌍
  ['\xF0\x9F\x97\xA3', '🗣'],  // 🗣
  ['\xF0\x9F\xA4\xA3', '🤣'],  // 🤣
  ['\xF0\x9F\x91\x8D', '👍'],  // 👍
  ['\xF0\x9F\x91\x8B', '👋'],  // 👋
  ['\xF0\x9F\x9A\x80', '🚀'],  // 🚀
  ['\xF0\x9F\x94\xA5', '🔥'],  // 🔥
  ['\xF0\x9F\x91\x81', '👁'],  // 👁
  ['\xF0\x9F\x8E\xAF', '🎯'],  // 🎯
  ['\xF0\x9F\x8E\xBC', '🎼'],  // 🎼
  ['\xF0\x9F\x8E\xBB', '🎻'],  // 🎻
  ['\xF0\x9F\x8E\xBA', '🎺'],  // 🎺
  ['\xF0\x9F\x8E\xB9', '🎹'],  // 🎹
  ['\xF0\x9F\x8E\xB8', '🎸'],  // 🎸
  ['\xF0\x9F\x8C\x88', '🌈'],  // 🌈
  ['\xF0\x9F\x99\x8F', '🙏'],  // 🙏
  ['\xE2\xAD\x90', '⭐'],      // ⭐ (3-byte)
  ['\xF0\x9F\x8C\x9F', '🌟'],  // 🌟
  ['\xF0\x9F\x8E\x80', '🎀'],  // 🎀
  ['\xF0\x9F\x8E\x97', '🎗'],  // 🎗
  ['\xF0\x9F\x92\xAF', '💯'],  // 💯
  ['\xF0\x9F\x8E\x81', '🎁'],  // 🎁
  ['\xF0\x9F\xA4\x93', '🤓'],  // 🤓
  ['\xF0\x9F\xA4\xAF', '🤯'],  // 🤯
  ['\xF0\x9F\x98\x8A', '😊'],  // 😊
  ['\xF0\x9F\x98\x84', '😄'],  // 😄
];

let fixedTotal = 0;

const files = fs.readdirSync(DIR).filter(f => f.endsWith('.tsx'));

for (const fname of files) {
  const file = path.join(DIR, fname);
  // Read as binary (latin-1)
  const buf = fs.readFileSync(file);
  // Convert to latin-1 string to detect mojibake
  const latin = buf.toString('latin1');
  
  let changed = false;
  let fixed = latin;
  
  for (const [bad, good] of EMOJI_FIXES) {
    if (fixed.includes(bad)) {
      while (fixed.includes(bad)) {
        fixed = fixed.replace(bad, good);
      }
      changed = true;
    }
  }
  
  if (changed) {
    // Write back as latin-1 → this preserves valid UTF-8 and replaces only the bad sequences
    // But we need to write as UTF-8 with correct chars. Since the good chars are actual unicode,
    // we need to write the result as a Buffer with latin1 encoding for the ascii parts
    // and the replaced emoji chars as their proper UTF-8 bytes
    
    // Actually: write fixed string as utf8 but encoding it from latin1 means the utf8 chars
    // in 'fixed' that came from 'good' (which are real unicode) need to be preserved.
    // The trick: write the result to a buffer using 'latin1' encode so each char byte is preserved,
    // except the replacement strings which are already correct unicode that will be utf8-encoded correctly.
    
    // Simpler approach: the fixed string contains mix of latin1 bytes and correct emoji.
    // Write as latin1 for the byte-correct payload:
    fs.writeFileSync(file, Buffer.from(fixed, 'latin1'));
    console.log(`✅ ${fname}: encoding fixed`);
    fixedTotal++;
  } else {
    console.log(`✓  ${fname}: ok`);
  }
}

console.log(`\nFixed ${fixedTotal} files`);
