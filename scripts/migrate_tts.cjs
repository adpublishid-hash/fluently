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

const files = walk(root).filter(f => {
  const c = fs.readFileSync(f, 'utf8');
  return c.includes('speechSynthesis') || c.includes('SpeechSynthesisUtterance');
});

let changed = 0;
for (const file of files) {
  let code = fs.readFileSync(file, 'utf8');
  const original = code;

  // Pattern 1: playSound / handlePlayAudio / play function with if ('speechSynthesis' in window) { ... speak(...) }
  // Replace the body contents with a single call to playAudio.
  code = code.replace(
    /if \('speechSynthesis' in window\) \{\s*(?:\/\/[^\n]*\n\s*)?(?:window\.speechSynthesis\.cancel\(\);\s*)?(?:const (?:utterance|u) = new SpeechSynthesisUtterance\([^)]+\);\s*(?:utterance|u)\.lang\s*=\s*['"]en-US['"];\s*(?:utterance|u)\.rate\s*=\s*([\d.]+);\s*window\.speechSynthesis\.speak\((?:utterance|u)\);)\s*\}(?:\s*else\s*\{[^}]*\})?/g,
    (_m, rate) => {
      const r = rate || '0.9';
      return `playAudio(text, ${r});`;
    }
  );

  // Also handle cases where variable is not named `text`. Look for the enclosing arrow function param.
  // Use a pattern matching each function declaration
  code = code.replace(
    /const (playSound|handlePlayAudio|playTTS|speakWord|play|handleSpeak|handlePlay)\s*=\s*\(([a-zA-Z_$][\w$]*)\s*:\s*string\)\s*=>\s*\{\s*playAudio\(text,\s*([\d.]+)\);\s*\}/g,
    (_m, fnName, param, rate) => {
      return `const ${fnName} = (${param}: string) => { playAudio(${param}, ${rate}); };`;
    }
  );

  // If we still have SpeechSynthesisUtterance (a more complex/different pattern), try a broader replacement:
  // Match function bodies that contain speechSynthesis usage and collapse.
  code = code.replace(
    /const (playSound|handlePlayAudio|playTTS|speakWord|play|handleSpeak|handlePlay)\s*=\s*\(([a-zA-Z_$][\w$]*)\s*:\s*string\)\s*=>\s*\{[\s\S]*?window\.speechSynthesis\.speak\([^)]+\);[^}]*\};?/g,
    (_m, fnName, param) => {
      return `const ${fnName} = (${param}: string) => { playAudio(${param}); };`;
    }
  );

  // Add import if file was modified and doesn't already have playAudio imported
  if (code !== original && !/from ['"][^'"]*ttsService['"]/.test(code)) {
    const importPath = relImport(file);
    // Insert after the last `import` line at the top
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
  } else if (code !== original && /from ['"][^'"]*ttsService['"]/.test(code) && !/\bplayAudio\b/.test(code.split('from')[0])) {
    // ttsService is imported but not playAudio — add to existing import
    code = code.replace(
      /import \{([^}]*)\} from (['"][^'"]*ttsService['"])/,
      (m, names, from) => {
        if (names.includes('playAudio')) return m;
        return `import { ${names.trim()}, playAudio } from ${from}`;
      }
    );
  }

  if (code !== original) {
    fs.writeFileSync(file, code);
    changed++;
    console.log(`✓ ${path.relative(path.join(__dirname, '..'), file)}`);
  } else {
    console.log(`- unchanged ${path.relative(path.join(__dirname, '..'), file)}`);
  }
}

console.log(`\nDone. ${changed} / ${files.length} files updated.`);
