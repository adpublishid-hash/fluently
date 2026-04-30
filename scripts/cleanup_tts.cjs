const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', 'src', 'pages', 'module', 'english', 'beginner');

function walk(dir, out = []) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (p.endsWith('.tsx') || p.endsWith('.ts')) out.push(p);
  }
  return out;
}

const files = walk(root);
let fixed = 0;

for (const file of files) {
  let code = fs.readFileSync(file, 'utf8');
  const original = code;

  // Remove orphan `};` or `} else { ... }` right after a collapsed playAudio function
  // Pattern:
  //   const fn = (...) => { playAudio(...); };
  //   };   <-- orphan
  //
  //   or
  //
  //   const fn = (...) => { playAudio(...); };
  //     } else {
  //         console.warn("Text-to-speech not supported");
  //     }
  //   };

  // Match: line with "playAudio(...);  };" on one line, followed by whitespace/closing braces lines
  code = code.replace(
    /(const \w+\s*=\s*\([^)]*\)\s*=>\s*\{\s*playAudio\([^)]+\);\s*\};?)\s*(?:\}\s*else\s*\{[^}]*\}\s*)?\s*\};?/g,
    '$1'
  );

  // Remove standalone orphan `};` after a collapsed function (when the function line ends with `};`)
  // This is trickier — look for `};\n   };`
  code = code.replace(
    /(playAudio\([^)]+\);\s*\};)\s*\n\s*\};?/g,
    '$1'
  );

  // Also: `} else { console.warn(...) }` leftover on its own after the fn
  code = code.replace(
    /(const \w+\s*=\s*\([^)]*\)\s*=>\s*\{\s*playAudio\([^)]+\);\s*\};?)\s*\n\s*\}\s*else\s*\{[^}]*\}\s*\n\s*\};?/g,
    '$1'
  );

  // Remove double semicolons `};;`
  code = code.replace(/\};;/g, '};');

  if (code !== original) {
    fs.writeFileSync(file, code);
    fixed++;
    console.log(`✓ ${path.relative(path.join(__dirname, '..'), file)}`);
  }
}

console.log(`\nCleaned up ${fixed} files.`);
