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

function relImport(file) {
  const rel = path.relative(path.dirname(file), path.join(__dirname, '..', 'src', 'services', 'ttsService'))
    .replace(/\\/g, '/');
  return rel.startsWith('.') ? rel : './' + rel;
}

const files = walk(root);
let fixed = 0;

for (const file of files) {
  let code = fs.readFileSync(file, 'utf8');
  const original = code;

  // Remove broken import lines stuck in the middle of multi-line imports.
  // Pattern: `import {\nimport { playAudio } from '.../ttsService';\n  ...`
  code = code.replace(
    /(import \{[^}]*\n)import \{ playAudio \} from '[^']*';\n/g,
    '$1'
  );

  // Also remove duplicate imports of playAudio
  const matches = code.match(/^import \{ playAudio \} from '[^']*';$/gm) || [];
  if (matches.length > 1) {
    let seen = false;
    code = code.replace(/^import \{ playAudio \} from '[^']*';$/gm, (m) => {
      if (seen) return '';
      seen = true;
      return m;
    });
  }

  // Ensure playAudio is imported if file uses it
  if (/\bplayAudio\s*\(/.test(code) && !/from ['"][^'"]*ttsService['"]/.test(code)) {
    const importPath = relImport(file);
    // Find end of the last top-level import block
    const lines = code.split('\n');
    let insertAt = 0;
    let inImport = false;
    for (let i = 0; i < lines.length; i++) {
      const l = lines[i];
      if (l.startsWith('import ')) {
        inImport = !l.includes(';') || l.includes('{') && !l.includes('}');
        insertAt = i + 1;
      } else if (inImport) {
        if (l.includes('}') && l.includes(';')) {
          inImport = false;
          insertAt = i + 1;
        }
      } else if (insertAt > 0 && l.trim() === '') {
        break;
      }
    }
    lines.splice(insertAt, 0, `import { playAudio } from '${importPath}';`);
    code = lines.join('\n');
  }

  if (code !== original) {
    fs.writeFileSync(file, code);
    fixed++;
    console.log(`✓ ${path.relative(path.join(__dirname, '..'), file)}`);
  }
}

console.log(`\nFixed imports in ${fixed} files.`);
