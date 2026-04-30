/**
 * fix-imports.mjs — Add missing imports to migrated lesson files
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, basename, dirname, relative } from 'path';

const ROOT = join(import.meta.dirname, '..');
const MODULE_DIR = join(ROOT, 'src', 'pages', 'module', 'english', 'beginner');

function collectFiles(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...collectFiles(full));
    } else if (/^Lesson\d+\.tsx$/.test(entry)) {
      const code = readFileSync(full, 'utf8');
      // Only fix files that use LessonShell but are missing imports
      if (code.includes('LessonShell') && !code.includes("from 'framer-motion'")) {
        files.push(full);
      } else if (code.includes('<motion.') && !code.includes("from 'framer-motion'")) {
        files.push(full);
      }
    }
  }
  return files;
}

function fixFile(filePath) {
  let code = readFileSync(filePath, 'utf8');
  const relPath = relative(ROOT, filePath);
  
  // Calculate relative path to shared components
  const fileDir = dirname(filePath);
  const sharedDir = join(ROOT, 'src', 'components', 'shared');
  let rel = relative(fileDir, sharedDir).replace(/\\/g, '/');
  if (!rel.startsWith('.')) rel = './' + rel;

  // Determine which lucide icons are actually used in the file
  const allIcons = ['Volume2', 'PlayCircle', 'Lightbulb', 'Sparkles', 'Info', 'CheckCircle2', 'XCircle', 'MessageSquare', 'BookOpen', 'PenTool', 'Mic', 'ChevronLeft', 'MoreHorizontal'];
  const usedIcons = allIcons.filter(icon => code.includes(`<${icon}`) || code.includes(`{${icon}}`));
  // Always need BookOpen and PenTool for tabs
  if (!usedIcons.includes('BookOpen')) usedIcons.push('BookOpen');
  if (!usedIcons.includes('PenTool')) usedIcons.push('PenTool');

  const needsMotion = code.includes('<motion.') || code.includes('sectionVariants');
  const needsLessonShell = code.includes('LessonShell');
  const needsLucide = usedIcons.length > 0;

  // Build new import block
  const newImports = [];
  
  if (needsMotion && !code.includes("from 'framer-motion'")) {
    newImports.push("import { motion } from 'framer-motion';");
  }
  if (needsLucide && !code.includes("from 'lucide-react'")) {
    newImports.push(`import { ${usedIcons.join(', ')} } from 'lucide-react';`);
  }
  if (needsLessonShell && !code.includes("from '" + rel + "/LessonShell'") && !code.includes('from "' + rel + '/LessonShell"')) {
    newImports.push(`import LessonShell, { sectionVariants } from '${rel}/LessonShell';`);
  }

  if (newImports.length === 0) {
    console.log(`  ⏭️  ${relPath} — already has all imports`);
    return;
  }

  // Insert after the last existing import
  const lastImportIdx = code.lastIndexOf('\nimport ');
  if (lastImportIdx !== -1) {
    const endOfLine = code.indexOf('\n', lastImportIdx + 1);
    code = code.slice(0, endOfLine + 1) + newImports.join('\n') + '\n' + code.slice(endOfLine + 1);
  } else {
    // Fallback: prepend
    code = newImports.join('\n') + '\n' + code;
  }

  writeFileSync(filePath, code, 'utf8');
  console.log(`  ✅ ${relPath} — added ${newImports.length} import(s)`);
}

console.log('🔧 Fixing missing imports...\n');

// Also check files that use LessonShell in JSX but dont have its import
function collectAll(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...collectAll(full));
    } else if (/^Lesson\d+\.tsx$/.test(entry)) {
      const code = readFileSync(full, 'utf8');
      const missing = (code.includes('<LessonShell') && !code.includes("LessonShell'")) ||
                      (code.includes('<motion.') && !code.includes("'framer-motion'")) ||
                      (code.includes('<BookOpen') && !code.includes("'lucide-react'"));
      if (missing) files.push(full);
    }
  }
  return files;
}

const files = collectAll(MODULE_DIR);
console.log(`Found ${files.length} files needing import fixes.\n`);

for (const f of files) {
  try {
    fixFile(f);
  } catch (err) {
    console.error(`  ❌ ${relative(ROOT, f)}: ${err.message}`);
  }
}

console.log(`\n✅ Done!`);
