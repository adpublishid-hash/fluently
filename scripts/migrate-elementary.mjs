/**
 * migrate-lessons.mjs
 * Automated migration of AI-Kamus lesson files to the Talky LessonShell format.
 *
 * WHAT IT DOES:
 * 1. Replaces the custom header/tabs/bottom-nav boilerplate with <LessonShell>
 * 2. Swaps Icons.tsx SVG imports → lucide-react equivalents
 * 3. Replaces old CSS classes (bg-slate-*, bg-teal-*, animate-fade-in) with
 *    framer-motion wrappers and Talky CSS-variable tokens
 * 4. Wraps top-level <section> blocks in <motion.section> with sectionVariants
 *
 * RUN:  node scripts/migrate-lessons.mjs
 */
import { readFileSync, writeFileSync, readdirSync, existsSync, statSync } from 'fs';
import { join, basename, dirname, relative } from 'path';

const ROOT = join(import.meta.dirname, '..');
const MODULE_DIR = join(ROOT, 'src', 'pages', 'module', 'english', 'elementary');

/* ─── helpers ─── */
function depthTo(file, anchor) {
  const rel = relative(dirname(file), join(ROOT, 'src', 'components', 'shared'));
  return rel.replace(/\\/g, '/');
}

/* ─── 1. Collect all lesson files that still use the OLD format ─── */
function collectOldLessons(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...collectOldLessons(full));
    } else if (/^Lesson\d+\.tsx$/.test(entry)) {
      const code = readFileSync(full, 'utf8');
      // Already migrated?
      if (code.includes('LessonShell')) continue;
      // Must have the old header pattern
      if (code.includes('ChevronLeftIcon') || code.includes('animate-fade-in')) {
        files.push(full);
      }
    }
  }
  return files;
}

/* ─── 2. Parse lesson metadata from file content ─── */
function parseMeta(code, filePath) {
  const lessonNum = basename(filePath).match(/Lesson(\d+)/)?.[1] || '?';

  // Detect skill from path
  let skill = 'Vocabulary';
  if (filePath.includes('grammar')) skill = 'Grammar';
  else if (filePath.includes('speaking')) skill = 'Speaking';
  else if (filePath.includes('pronun') || filePath.includes('pronunciation')) skill = 'Pronunciation';

  // Extract title from header h1
  const titleMatch = code.match(/>\s*([\w\s&;'"\-–—:,.!?()\/]+)\s*<\/h1>/);
  let title = titleMatch ? titleMatch[1].replace(/&amp;/g, '&') : `${skill} ${lessonNum}`;
  title = title.trim();

  // The accent color per skill
  const accentColors = {
    Vocabulary: '#2980B9',
    Grammar: '#8E44AD',
    Speaking: '#E74C3C',
    Pronunciation: '#E83E8C',
  };

  return { lessonNum, skill, title, accent: accentColors[skill] };
}

/* ─── 3. Migrate one file ─── */
function migrateFile(filePath) {
  let code = readFileSync(filePath, 'utf8');
  const meta = parseMeta(code, filePath);
  const relShared = depthTo(filePath, '');

  console.log(`  ✏️  ${relative(ROOT, filePath)}  →  "${meta.title}" (${meta.skill} #${meta.lessonNum})`);

  // ─── STEP A: Fix imports ───

  // Remove old Icons import
  code = code.replace(/import\s*\{[^}]*\}\s*from\s*['"][^'"]*Icons['"];?\n?/g, '');

  // Add framer-motion + lucide if not present
  if (!code.includes('framer-motion')) {
    code = code.replace(
      /^(import React.*\n)/m,
      `$1import { motion } from 'framer-motion';\n`
    );
  }

  // Add lucide-react if not present
  if (!code.includes('lucide-react')) {
    code = code.replace(
      /^(import.*framer-motion.*\n)/m,
      `$1import {\n  Volume2, PlayCircle, Lightbulb, Sparkles,\n  Info, CheckCircle2, XCircle, MessageSquare, BookOpen, PenTool\n} from 'lucide-react';\n`
    );
  }

  // Add LessonShell import if not present
  if (!code.includes('LessonShell')) {
    code = code.replace(
      /^(import.*lucide-react.*\n)/m,
      `$1import LessonShell, { sectionVariants } from '${relShared}/LessonShell';\n`
    );
  }

  // ─── STEP B: Icon replacements ───
  const iconMap = {
    'ChevronLeftIcon': 'ChevronLeft',
    'MoreIcon': 'MoreHorizontal',
    'VolumeIcon': 'Volume2',
    'InfoIcon': 'Info',
    'CheckCircleIcon': 'CheckCircle2',
    'XCircleIcon': 'XCircle',
    'PlayCircleIcon': 'PlayCircle',
    'LightBulbIcon': 'Lightbulb',
    'SparklesIcon': 'Sparkles',
    'BookIcon': 'BookOpen',
    'PuzzleIcon': 'PenTool',
    'MicrophoneIcon': 'Mic',
  };

  for (const [old, nw] of Object.entries(iconMap)) {
    // Replace JSX usage: <OldIcon className="w-5 h-5" /> → <NewIcon size={20} />
    code = code.replace(
      new RegExp(`<${old}\\s+className="[^"]*w-(\\d+)[^"]*"\\s*/>`, 'g'),
      (match, size) => `<${nw} size={${parseInt(size) * 4}} />`
    );
    // Simple reference without className
    code = code.replace(new RegExp(`<${old}\\s*/>`, 'g'), `<${nw} size={20} />`);
    // className on component
    code = code.replace(
      new RegExp(`<${old}\\s+className=`, 'g'),
      `<${nw} className=`
    );
  }

  // ─── STEP C: Color/class replacements ───
  // Replace teal colors → accent variable pattern
  code = code.replace(/bg-teal-50/g, 'bg-gray-50');
  code = code.replace(/bg-teal-500/g, `bg-[var(--color-primary)]`);
  code = code.replace(/bg-teal-600/g, `bg-[var(--color-primary)]`);
  code = code.replace(/text-teal-500/g, 'text-[var(--color-primary)]');
  code = code.replace(/text-teal-600/g, 'text-[var(--color-primary)]');
  code = code.replace(/text-teal-700/g, 'text-[var(--color-primary)]');
  code = code.replace(/border-teal-200/g, 'border-[var(--color-border)]');
  code = code.replace(/border-teal-500/g, 'border-[var(--color-primary)]');
  code = code.replace(/hover:bg-teal-50/g, 'hover:bg-gray-50');
  code = code.replace(/hover:bg-teal-500/g, 'hover:bg-[var(--color-primary)]');
  code = code.replace(/hover:text-teal-700/g, 'hover:text-[var(--color-primary)]');
  code = code.replace(/hover:text-teal-500/g, 'hover:text-[var(--color-primary)]');
  code = code.replace(/hover:border-teal-200/g, 'hover:border-[var(--color-border)]');
  code = code.replace(/text-teal-200/g, 'text-white/60');
  code = code.replace(/hover:border-teal-500/g, 'hover:border-[var(--color-primary)]');

  // Replace slate colors → design tokens
  code = code.replace(/bg-slate-50/g, 'bg-[var(--color-background)]');
  code = code.replace(/bg-slate-100/g, 'bg-gray-100');
  code = code.replace(/text-slate-800/g, 'text-[var(--color-text-primary)]');
  code = code.replace(/text-slate-700/g, 'text-[var(--color-text-primary)]');
  code = code.replace(/text-slate-600/g, 'text-[var(--color-text-secondary)]');
  code = code.replace(/text-slate-500/g, 'text-[var(--color-text-muted)]');
  code = code.replace(/text-slate-400/g, 'text-[var(--color-text-muted)]');
  code = code.replace(/border-slate-100/g, 'border-[var(--color-border)]');
  code = code.replace(/border-slate-200/g, 'border-[var(--color-border)]');
  code = code.replace(/border-slate-300/g, 'border-[var(--color-border)]');
  code = code.replace(/bg-slate-100\/80/g, 'bg-gray-100');
  code = code.replace(/bg-slate-100\/50/g, 'bg-gray-50');
  code = code.replace(/hover:bg-slate-50/g, 'hover:bg-gray-50');
  code = code.replace(/hover:text-slate-600/g, 'hover:text-[var(--color-text-secondary)]');
  code = code.replace(/hover:text-slate-700/g, 'hover:text-[var(--color-text-primary)]');
  code = code.replace(/divide-slate-100/g, 'divide-gray-100');
  code = code.replace(/divide-slate-200/g, 'divide-gray-100');

  // shadow-sm → var(--shadow-card)
  code = code.replace(/shadow-sm/g, 'shadow-[var(--shadow-card)]');

  // ─── STEP D: Replace old header/tabs/footer boilerplate with LessonShell ───

  // Remove the entire old header block (from <header to </header>)
  code = code.replace(
    /\s*{\/\*\s*Header.*?\*\/}\s*\n?\s*<header[\s\S]*?<\/header>\s*\n?/,
    ''
  );

  // Remove old bottom navigation
  code = code.replace(
    /\s*{\/\*\s*Bottom Navigation.*?\*\/}[\s\S]*?<\/div>\s*\n?\s*<\/div\s*>\s*\n?\s*<\/div\s*>/,
    ''
  );

  // Remove old mobile-only bottom nav (alternate pattern)
  code = code.replace(
    /\s*{\/\*\s*Tabs.*?\*\/}[\s\S]*?<\/div>\s*\n/,
    '\n'
  );

  // Now wrap the content with LessonShell
  // Find the main return statement pattern
  const hasQuizImport = code.includes('QuizSection');
  const hasExercises = code.includes('LESSON_EXERCISES');

  // Determine exercise index for quiz
  const exerciseIdx = meta.lessonNum;

  // Find the outer container div: <div className="flex flex-col h-[100dvh]...">
  const outerDivPattern = /return\s*\(\s*\n?\s*<div className="flex flex-col h-\[100dvh\][^"]*">/;
  if (outerDivPattern.test(code)) {
    code = code.replace(
      outerDivPattern,
      `return (\n        <LessonShell\n            title="${meta.title}"\n            subtitle="${meta.skill} • Pelajaran ${meta.lessonNum}"\n            accentColor="${meta.accent}"\n            tabs={[{ id: 'learn', label: 'Pelajari', icon: <BookOpen size={14} /> }, { id: 'practice', label: 'Latihan', icon: <PenTool size={14} /> }]}\n        >\n            {(tabId) => tabId === 'learn' ? (`
    );
  }

  // Replace old scrollable content wrapper
  code = code.replace(
    /\s*{\/\*\s*Main Content\s*\*\/}\s*\n?\s*<div className="flex-1 overflow-y-auto[^"]*">\s*\n?\s*<div className="[^"]*animate-fade-in[^"]*">\s*\n?\s*\{activeTab === 'learn' \? \(\s*\n?\s*<>/,
    '<div className="space-y-6">'
  );

  // Close the learn section and handle practice tab
  code = code.replace(
    /\s*<\/>\s*\n?\s*\) : \(\s*\n?\s*<div className="animate-fade-in">\s*\n?\s*<QuizSection questions=\{LESSON_EXERCISES\[(\d+)\]\} \/>\s*\n?\s*<\/div>\s*\n?\s*\)\}\s*\n?\s*<\/div>\s*\n?\s*<\/div>/,
    (match, quizIdx) => `</div>\n            ) : (\n                <motion.div\n                  initial={{ opacity: 0, y: 20 }}\n                  animate={{ opacity: 1, y: 0 }}\n                  transition={{ duration: 0.4 }}\n                >\n                  <QuizSection questions={LESSON_EXERCISES[${quizIdx}]} />\n                </motion.div>\n            )}\n        </LessonShell>`
  );

  // ─── STEP E: Remove old activeTab state since LessonShell handles it ───
  code = code.replace(/const \[activeTab, setActiveTab\] = useState<[^>]+>\([^)]+\);\s*\n?/g, '');
  code = code.replace(/const \[activeTab, setActiveTab\] = useState\([^)]+\);\s*\n?/g, '');

  // Remove unused navigate if LessonShell back-navigation handles it
  // (keep if used elsewhere in the component)

  // Remove "// Quiz state removed" comments
  code = code.replace(/\s*\/\/\s*Quiz state removed\s*\n?/g, '\n');

  // ─── STEP F: Wrap sections with motion.section ───
  let sectionIdx = 0;
  code = code.replace(
    /<section\s+className="([^"]*)"/g,
    (match, cls) => {
      const idx = sectionIdx++;
      return `<motion.section\n                      custom={${idx}}\n                      variants={sectionVariants}\n                      initial="hidden"\n                      animate="visible"\n                      className="${cls}"`;
    }
  );
  code = code.replace(/<\/section>/g, '</motion.section>');

  // ─── STEP G: Clean up remaining artifacts ───

  // Fix: closing </div > with space
  code = code.replace(/<\/div\s+>/g, '</div>');

  // Remove duplicate blank lines
  code = code.replace(/\n{3,}/g, '\n\n');

  return code;
}

/* ─── MAIN ─── */
console.log('🔍 Scanning for un-migrated lessons...\n');

const lessons = collectOldLessons(MODULE_DIR);

if (lessons.length === 0) {
  console.log('✅ All lessons are already migrated!');
  process.exit(0);
}

console.log(`Found ${lessons.length} lessons to migrate:\n`);

for (const file of lessons) {
  try {
    const migrated = migrateFile(file);
    writeFileSync(file, migrated, 'utf8');
    console.log(`  ✅ Done`);
  } catch (err) {
    console.error(`  ❌ FAILED: ${err.message}`);
  }
}

console.log(`\n🎉 Migration complete! ${lessons.length} files processed.`);
console.log('⚠️  Please run `npm run build` to check for any remaining type errors.');
