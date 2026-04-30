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
let changed = 0;

for (const file of files) {
  let code = fs.readFileSync(file, 'utf8');
  const original = code;

  // Pattern with (text, rate = 0.9) signature
  code = code.replace(
    /const (playSound|handlePlayAudio|playTTS|speakWord|play|handleSpeak|handlePlay)\s*=\s*\(([a-zA-Z_$][\w$]*)\s*:\s*string,\s*([a-zA-Z_$][\w$]*)\s*:\s*number\s*=\s*[\d.]+\)\s*=>\s*\{[\s\S]*?window\.speechSynthesis\.speak\([^)]+\);[^}]*\};?/g,
    (_m, fnName, param, rateParam) => {
      return `const ${fnName} = (${param}: string, ${rateParam}: number = 0.9) => { playAudio(${param}, ${rateParam}); };`;
    }
  );

  // Clean up double semicolons `};;` left over from bad rewrites
  code = code.replace(/\};;/g, '};');

  // Clean up `() => { playAudio(text); };` where there's an extra `};`
  code = code.replace(/(playAudio\([^)]+\);)\s*\}\s*;\s*;/g, '$1 };');

  // Add import if modified
  if (code !== original) {
    if (!/from ['"][^'"]*ttsService['"]/.test(code)) {
      const importPath = relImport(file);
      const lines = code.split('\n');
      let lastImport = -1;
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('import ')) lastImport = i;
        else if (lastImport >= 0 && lines[i].trim() === '') break;
      }
      if (lastImport >= 0) {
        lines.splice(lastImport + 1, 0, `import { playAudio } from '${importPath}';`);
        code = lines.join('\n');
      }
    } else if (!/\bplayAudio\b/.test(code.split('\n').filter(l => l.startsWith('import')).join('\n'))) {
      code = code.replace(
        /import \{([^}]*)\} from (['"][^'"]*ttsService['"])/,
        (m, names, from) => {
          if (names.includes('playAudio')) return m;
          return `import { ${names.trim()}, playAudio } from ${from}`;
        }
      );
    }
  }

  if (code !== original) {
    fs.writeFileSync(file, code);
    changed++;
    console.log(`✓ ${path.relative(path.join(__dirname, '..'), file)}`);
  }
}

console.log(`\nDone. ${changed} files updated in part 2.`);
