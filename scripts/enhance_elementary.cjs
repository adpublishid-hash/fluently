/**
 * Enhance all elementary lesson files (grammar, pronunciation, speaking, vocabulary):
 *  1. Replace browser SpeechSynthesis calls with playAudio() (AI TTS via BYOK).
 *  2. Add completion tracking (localStorage) + completion modal popup.
 *  3. Wire up Next button at top-right (via LessonShell's nextLesson prop).
 *  4. Toggle Selesai footer button based on completion state.
 */
const fs = require('fs');
const path = require('path');

const ELEMENTARY_DIR = path.join(__dirname, '..', 'src', 'pages', 'module', 'english', 'elementary');
const MODULES = [
  { name: 'grammar',       max: 20, storage: 'elementary_grammar' },
  { name: 'pronunciation', max: 15, storage: 'elementary_pronunciation' },
  { name: 'speaking',      max: 15, storage: 'elementary_speaking' },
  { name: 'vocabulary',    max: 15, storage: 'elementary_vocabulary' },
];

const IMPORT_PATH_PREFIX = '../../../../../';

let touched = 0;
let skipped = 0;
const errors = [];

for (const mod of MODULES) {
  const moduleDir = path.join(ELEMENTARY_DIR, mod.name);
  for (let i = 1; i <= mod.max; i++) {
    const file = path.join(moduleDir, `Lesson${i}.tsx`);
    if (!fs.existsSync(file)) { skipped++; continue; }
    try {
      const result = transform(file, mod, i);
      if (result.changed) {
        fs.writeFileSync(file, result.code);
        touched++;
        console.log(`✓ ${path.relative(path.join(__dirname, '..'), file)}`);
      } else {
        console.log(`  (unchanged) ${path.relative(path.join(__dirname, '..'), file)}`);
      }
    } catch (e) {
      errors.push({ file, err: e.message });
      console.error(`✗ ${path.relative(path.join(__dirname, '..'), file)}: ${e.message}`);
    }
  }
}

console.log(`\nDone. Modified ${touched} files, skipped ${skipped}, errors ${errors.length}.`);
if (errors.length) {
  for (const e of errors) console.error(`  ${path.relative(path.join(__dirname, '..'), e.file)}: ${e.err}`);
  process.exit(1);
}

function transform(file, mod, lessonNum) {
  let code = fs.readFileSync(file, 'utf8');
  const original = code;

  // ── 1. Replace browser TTS blocks with playAudio(text, 0.9) ──────────────
  //   Handles both `playSound` and `handlePlayAudio` naming.
  code = code.replace(
    /const\s+(playSound|handlePlayAudio)\s*=\s*\(\s*text\s*:\s*string\s*\)\s*=>\s*\{\s*(?:window\.speechSynthesis\.cancel\(\);?\s*)?if\s*\(\s*['"]speechSynthesis['"]\s+in\s+window\s*\)\s*\{[\s\S]*?window\.speechSynthesis\.speak\([^)]*\);?\s*\}\s*\};?/g,
    'const $1 = (text: string) => { playAudio(text, 0.9); };',
  );

  // ── 2. Ensure playAudio import is present ────────────────────────────────
  if (!/from ['"][^'"]*ttsService['"]/.test(code)) {
    code = addImportAfterReactImports(code, `import { playAudio } from '${IMPORT_PATH_PREFIX}services/ttsService';`);
  }

  // ── 3. Ensure useNavigate import is present ──────────────────────────────
  if (!/from ['"]react-router-dom['"]/.test(code)) {
    code = addImportAfterReactImports(code, `import { useNavigate } from 'react-router-dom';`);
  } else if (!/\buseNavigate\b/.test(code)) {
    code = code.replace(
      /import\s*\{([^}]*)\}\s*from\s*['"]react-router-dom['"]\s*;?/,
      (m, inner) => `import {${inner.trim()}${inner.trim() ? ', ' : ''}useNavigate } from 'react-router-dom';`,
    );
  }

  // ── 4. Ensure completion helper imports are present ──────────────────────
  if (!/from ['"][^'"]*lessonCompletion['"]/.test(code)) {
    code = addImportAfterReactImports(code, `import { useLessonCompletion } from '${IMPORT_PATH_PREFIX}components/shared/lessonCompletion';`);
  }
  if (!/from ['"][^'"]*LessonCompleteModal['"]/.test(code)) {
    code = addImportAfterReactImports(code, `import LessonCompleteModal from '${IMPORT_PATH_PREFIX}components/shared/LessonCompleteModal';`);
  }

  // ── 5. Ensure useState is imported from react ────────────────────────────
  if (!/\buseState\b/.test(code)) {
    // unlikely, but keep safe
    code = code.replace(
      /import\s+React(?:\s*,\s*\{([^}]*)\})?\s+from\s+['"]react['"]\s*;?/,
      (m, inner) => {
        const names = (inner || '').split(',').map(s => s.trim()).filter(Boolean);
        if (!names.includes('useState')) names.push('useState');
        return `import React, { ${names.join(', ')} } from 'react';`;
      },
    );
  }

  // ── 6. Inject completion state right after the component signature ───────
  const compSig = /(const\s+\w+\s*:\s*React\.FC\s*=\s*\(\s*\)\s*=>\s*\{\s*\n)/;
  if (!/useLessonCompletion\(/.test(code)) {
    const nextPath = lessonNum < mod.max
      ? `'/modul/english/elementary/${mod.name}/lesson-${lessonNum + 1}'`
      : 'undefined';
    const injection = `  const navigate = useNavigate();\n` +
      `  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('${mod.storage}', ${lessonNum});\n` +
      `  const nextLessonPath = ${nextPath};\n`;
    if (!compSig.test(code)) throw new Error('Component signature not found');
    code = code.replace(compSig, (m) => m + injection);
  }

  // ── 7. Add nextLesson prop to LessonShell tag ────────────────────────────
  if (!/<LessonShell[\s\S]*?nextLesson=/.test(code)) {
    // Insert nextLesson after the accentColor line inside the opening <LessonShell ... >.
    code = code.replace(
      /(<LessonShell\b[\s\S]*?accentColor\s*=\s*(?:\{[^}]*\}|"[^"]*"|'[^']*'))(\s*\n)/,
      `$1\n            nextLesson={nextLessonPath}$2`,
    );
  }

  // ── 8. Update Selesai footer button onClick + label + style ──────────────
  //    Match the single button that uses window.history.back().
  code = code.replace(
    /onClick=\{\s*\(\s*\)\s*=>\s*window\.history\.back\(\)\s*\}/g,
    'onClick={isCompleted ? () => navigate(-1) : handleSelesai}',
  );

  // Replace the literal "Selesai" text inside that button (not elsewhere).
  // The button is identified by being right after a <CheckCircle2 size={18} /> element.
  code = code.replace(
    /(<CheckCircle2\s+size=\{18\}\s*\/>\s*)Selesai(\s*<\/button>)/g,
    `$1{isCompleted ? 'Sudah Selesai \u2713' : 'Selesai'}$2`,
  );

  // Swap button background style to switch to green when completed.
  // Pattern: style={{ background: 'linear-gradient(135deg, #XXX, #XXXcc)' }} — only inside the Selesai footer button.
  // Use a narrow context (the button containing the Selesai text we just replaced).
  code = code.replace(
    /(onClick=\{isCompleted \? \(\) => navigate\(-1\) : handleSelesai\}[\s\S]{0,400}?)style=\{\{\s*background:\s*'linear-gradient\(135deg,\s*(#[0-9A-Fa-f]{3,8}),\s*#[0-9A-Fa-f]{3,8}cc\)'\s*\}\}/,
    (_m, pre, hex) => `${pre}style={{ background: isCompleted ? 'linear-gradient(135deg, #26C76D, #1ea85a)' : 'linear-gradient(135deg, ${hex}, ${hex}cc)' }}`,
  );

  // ── 9. Wrap return with completion modal ────────────────────────────────
  if (!/LessonCompleteModal/.test(original) || !/<LessonCompleteModal\b/.test(code)) {
    // Add modal + fragment wrapper around the LessonShell.
    const modalTag = `<LessonCompleteModal\n      show={showCompleteModal}\n      onClose={() => setShowCompleteModal(false)}\n      lessonLabel={${JSON.stringify(prettyLabel(mod.name, lessonNum))}}\n      accentColor={${JSON.stringify(accentOf(mod.name))}}\n      nextLessonPath={nextLessonPath}\n      onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}\n      onBack={() => { setShowCompleteModal(false); navigate(-1); }}\n    />`;

    // Opening: `return (\n    <LessonShell` (allow leading whitespace)
    let wrapped = false;
    code = code.replace(
      /(return\s*\(\s*\n)(\s*)<LessonShell\b/,
      (_m, ret, indent) => {
        wrapped = true;
        return `${ret}${indent}<>\n${indent}  ${modalTag}\n${indent}<LessonShell`;
      },
    );

    if (wrapped) {
      // Closing: find the `</LessonShell>` followed by `);` and close the fragment.
      code = code.replace(
        /<\/LessonShell>(\s*\)\s*;?)/,
        '</LessonShell>\n    </>$1',
      );
    }
  }

  return { code, changed: code !== original };
}

function addImportAfterReactImports(code, newImport) {
  if (code.includes(newImport)) return code;
  const lines = code.split('\n');
  let lastImportIdx = -1;
  let inMultiLine = false;
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (inMultiLine) {
      if (l.includes('}') && /from\s+['"]/.test(l)) {
        inMultiLine = false;
        lastImportIdx = i;
      }
      continue;
    }
    if (/^import\b/.test(l)) {
      if (/from\s+['"][^'"]+['"]\s*;?\s*$/.test(l)) {
        lastImportIdx = i;
      } else if (/\{\s*$/.test(l) || (l.includes('{') && !l.includes('}'))) {
        inMultiLine = true;
      }
    }
  }
  if (lastImportIdx < 0) return code;
  lines.splice(lastImportIdx + 1, 0, newImport);
  return lines.join('\n');
}

function prettyLabel(mod, num) {
  const modLabel = {
    grammar: 'Grammar',
    pronunciation: 'Pronunciation',
    speaking: 'Speaking',
    vocabulary: 'Vocabulary',
  }[mod];
  return `Elementary ${modLabel} Lesson ${num}`;
}

function accentOf(mod) {
  return {
    grammar: '#8E44AD',
    pronunciation: '#2E86DE',
    speaking: '#E74C3C',
    vocabulary: '#16A085',
  }[mod];
}
