/**
 * fix-multiab.mjs — Fix grammar/pronunciation lessons that have broken multi-tab structures.
 *
 * These files were partially migrated: wrapped in LessonShell but internal
 * activeTab conditionals remain broken. This script:
 * 
 * 1. Removes the broken outer wrapper ({/* Content *\/} divs, animate-fade-in)
 * 2. Removes {activeTab === 'xxx' && ( ... )} conditionals for content tabs,
 *    keeping the inner JSX as sequential sections in a <div className="space-y-6">
 * 3. Moves quiz/practice sections into the practice tab branch
 * 4. Cleans up setActiveTab calls
 * 5. Removes stale state variables
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';

const ROOT = join(import.meta.dirname, '..');
const MODULE_DIR = join(ROOT, 'src', 'pages', 'module', 'english', 'beginner');

function collectFiles(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) files.push(...collectFiles(full));
    else if (/^Lesson\d+\.tsx$/.test(entry)) {
      const code = readFileSync(full, 'utf8');
      if (code.includes('activeTab')) files.push(full);
    }
  }
  return files;
}

function fixFile(filePath) {
  let code = readFileSync(filePath, 'utf8');
  
  // Step 1: Remove broken wrapper divs left by first migration
  code = code.replace(
    /\{\/\* Content \*\/\}\s*\n\s*<div className="flex-1 overflow-y-auto[^"]*">\s*\n\s*<div className="[^"]*">/g,
    ''
  );

  // Step 2: Remove `{activeTab === 'xxx' && (` and their matching `)}` 
  // For CONTENT tabs (not quiz) - remove conditional, keep content
  // We'll do a multi-pass approach
  
  // List of content tab names (merge into learn)
  const contentTabNames = ['learn', 'build', 'alphabet', 'vowels', 'magic-e', 'sounds', 'words',
    'contrast', 'endings', 'rules', 'stress', 'rhythm', 'pairs', 'patterns',
    'intonation', 'linking', 'tips', 'sentences', 'errors', 'compare', 'review'];
  
  // Remove {activeTab === 'xxx' && (\n<>  for content tabs → just <>
  for (const tab of contentTabNames) {
    const regex = new RegExp(
      `\\{activeTab === '${tab}' && \\(\\s*\\n(\\s*)<>`,
      'g'
    );
    code = code.replace(regex, (match, indent) => `${indent}<>`);
  }

  // For quiz/practice tabs inside the practice branch, also remove the conditional
  code = code.replace(
    /\{activeTab === '(?:quiz|practice)' && \(\s*\n(\s*)/g,
    (match, indent) => `${indent}`
  );

  // Step 3: Remove orphaned closing `)}` from removed conditionals
  // These appear as `)}\n\n` at the end of conditional blocks.
  // After removing the conditionals, the `</>` and `)}` pattern becomes `</>\n          )}`
  // We want to keep `</>` but remove the `)}` that closes the removed conditional
  // This is the trickiest part - let's handle it by removing `)}\n` that follows `</>`
  code = code.replace(/<\/>\s*\n\s*\)\}/g, '</>');

  // Step 4: Remove setActiveTab calls 
  code = code.replace(/\s*setActiveTab\([^)]+\);\s*/g, '\n');

  // Step 5: Remove stale state
  code = code.replace(/const \[activeTab, setActiveTab\] = useState[^;]+;\s*\n?/g, '');

  // Step 6: Fix remaining broken closing divs from the old wrapper
  // Remove the dangling </div></div> at the bottom that belonged to the old wrapper
  code = code.replace(
    /\s*<\/div>\s*\n\s*<\/div>\s*\n\s*<\/div>\s*\n\s*\);\s*\n\};/,
    '\n    );\n};'
  );

  // Step 7: Clean up ClipboardIcon and other remaining old icon refs
  code = code.replace(/<ClipboardIcon className="[^"]*" \/>/g, '<Sparkles size={96} />');
  code = code.replace(/<ClipboardIcon[^/]*\/>/g, '<Sparkles size={20} />');

  // Step 8: Remove obsolete classes  
  code = code.replace(/animate-fade-in/g, '');

  // Step 9: Clean up double blank lines
  code = code.replace(/\n{3,}/g, '\n\n');

  writeFileSync(filePath, code, 'utf8');
  console.log(`  ✅ ${relative(ROOT, filePath)}`);
}

console.log('🔧 Fixing multi-tab structures...\n');
const files = collectFiles(MODULE_DIR);
console.log(`Found ${files.length} files to fix.\n`);
for (const f of files) {
  try { fixFile(f); } catch (e) { console.error(`  ❌ ${relative(ROOT, f)}: ${e.message}`); }
}
console.log('\n✅ Done!');
