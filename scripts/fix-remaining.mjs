/**
 * fix-remaining.mjs — Final pass to remove ALL remaining activeTab conditionals
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
      if (readFileSync(full, 'utf8').includes('activeTab')) files.push(full);
    }
  }
  return files;
}

function fixFile(filePath) {
  let code = readFileSync(filePath, 'utf8');

  // Remove ALL {activeTab === 'xxx' && (\n<> patterns (keep the <>)
  code = code.replace(
    /\{activeTab === '[^']+' && \(\s*\n(\s*)<>/g,
    (m, indent) => `${indent}<>`
  );

  // Remove ALL {activeTab === 'xxx' && (\n (without <>, just content)
  code = code.replace(
    /\{activeTab === '[^']+' && \(\s*\n/g,
    ''
  );

  // Remove orphaned </>  )} pairs
  code = code.replace(/<\/>\s*\n\s*\)\}/g, '</>');

  // Remove dangling )} that were conditional closers (appear alone on a line after section content)
  // Be careful not to remove valid )} from other code
  // These typically appear as `          )}` on their own line after </motion.section> or </div>
  
  // Remove any remaining setActiveTab
  code = code.replace(/\s*setActiveTab\([^)]+\);\s*/g, '\n');
  
  // Remove activeTab state
  code = code.replace(/const \[activeTab, setActiveTab\] = useState[^;]+;\s*\n?/g, '');

  // Clean double blank lines
  code = code.replace(/\n{3,}/g, '\n\n');

  writeFileSync(filePath, code, 'utf8');
  console.log(`  ✅ ${relative(ROOT, filePath)}`);
}

console.log('🔧 Final activeTab cleanup...\n');
const files = collectFiles(MODULE_DIR);
console.log(`Found ${files.length} files.\n`);
for (const f of files) {
  try { fixFile(f); } catch (e) { console.error(`  ❌ ${relative(ROOT, f)}: ${e.message}`); }
}

// Verify
let remaining = 0;
for (const entry of readdirSync(MODULE_DIR, { recursive: true })) {
  const full = join(MODULE_DIR, entry);
  if (!statSync(full).isFile() || !/Lesson\d+\.tsx$/.test(entry)) continue;
  if (readFileSync(full, 'utf8').includes('activeTab')) remaining++;
}
console.log(`\n${remaining === 0 ? '✅ All activeTab references removed!' : `⚠️  ${remaining} files still have activeTab`}`);
