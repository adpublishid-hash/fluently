import fs from 'fs';
import path from 'path';

const ROOT = path.join(import.meta.dirname, '..');
const MODULE_DIR = path.join(ROOT, 'src', 'pages', 'module', 'english', 'beginner');

function getFiles(dir, files = []) {
  fs.readdirSync(dir).forEach(file => {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) getFiles(full, files);
    else if (full.endsWith('.tsx') && !full.includes('Lesson1.tsx') && !full.includes('speaking') && !full.includes('QuizSection') && !full.includes('exercises')) {
      files.push(full);
    }
  });
  return files;
}

const files = getFiles(MODULE_DIR);

function extractLessonMeta(code, filePath) {
  const lessonNum = path.basename(filePath).match(/Lesson(\d+)/)?.[1] || '?';
  let skill = 'Vocabulary';
  if (filePath.includes('grammar')) skill = 'Grammar';
  else if (filePath.includes('pronunciation')) skill = 'Pronunciation';
  
  const titleMatch = code.match(/>\s*([\w\s&;'"\-–—:,.!?()\/]+)\s*<\/h1>/);
  let title = titleMatch ? titleMatch[1].replace(/&amp;/g, '&').trim() : `${skill} ${lessonNum}`;
  
  const accentColors = { Vocabulary: '#2980B9', Grammar: '#8E44AD', Speaking: '#E74C3C', Pronunciation: '#E83E8C' };
  
  return { lessonNum, skill, title, accent: accentColors[skill] };
}

function processFile(filePath) {
  let code = fs.readFileSync(filePath, 'utf8');
  if (code.includes('LessonShell')) return; // already migrated
  
  const meta = extractLessonMeta(code, filePath);
  
  // 1. Imports
  code = code.replace(/import\s*\{[^}]*\}\s*from\s*['"][^'"]*Icons['"];?\n?/g, '');
  if (!code.includes('framer-motion')) code = code.replace(/^(import React.*\n)/m, `$1import { motion } from 'framer-motion';\n`);
  if (!code.includes('lucide-react')) code = code.replace(/^(import.*framer-motion.*\n)/m, `$1import { Volume2, PlayCircle, Lightbulb, Sparkles, Info, CheckCircle2, XCircle, MessageSquare, BookOpen, PenTool, Mic, ChevronLeft, MoreHorizontal, BarChart3, Flame, Hand, History, Home, Star, TrendingUp, Trophy, User } from 'lucide-react';\n`);
  
  const relShared = path.relative(path.dirname(filePath), path.join(ROOT, 'src', 'components', 'shared')).replace(/\\/g, '/');
  code = code.replace(/^(import.*lucide-react.*\n)/m, `$1import LessonShell, { sectionVariants } from '${relShared}/LessonShell';\n`);

  // 2. Icon + color maps
  const iconMap = {
    'ClipboardIcon': 'Sparkles', 'BarChartIcon': 'BarChart3', 'FlameIcon': 'Flame', 'HandStopIcon': 'Hand', 'HistoryIcon': 'History', 'HomeIcon': 'Home', 'MicIcon': 'Mic', 'StarIcon': 'Star', 'TrendUpIcon': 'TrendingUp', 'TrophyIcon': 'Trophy', 'UserIcon': 'User', 'VolumeIcon': 'Volume2', 'InfoIcon': 'Info', 'CheckCircleIcon': 'CheckCircle2', 'XCircleIcon': 'XCircle', 'PlayCircleIcon': 'PlayCircle', 'LightBulbIcon': 'Lightbulb', 'SparklesIcon': 'Sparkles', 'BookIcon': 'BookOpen', 'PuzzleIcon': 'PenTool', 'ChevronLeftIcon': 'ChevronLeft', 'MoreIcon': 'MoreHorizontal', 'MicrophoneIcon': 'Mic',
  };
  for (const [old, nw] of Object.entries(iconMap)) {
    code = code.replace(new RegExp(`<${old}\\s+className="[^"]*w-(\\d+)[^"]*"\\s*/>`, 'g'), (m, size) => `<${nw} size={${parseInt(size) * 4}} />`);
    code = code.replace(new RegExp(`<${old}\\s*/>`, 'g'), `<${nw} size={20} />`);
    code = code.replace(new RegExp(`<${old}\\s+className=`, 'g'), `<${nw} className=`);
  }
  
  const repl = [
    [/bg-teal-50/g, 'bg-gray-50'], [/bg-teal-500/g, `bg-[var(--color-primary)]`], [/bg-teal-600/g, `bg-[var(--color-primary)]`], [/text-teal-500/g, 'text-[var(--color-primary)]'], [/text-teal-600/g, 'text-[var(--color-primary)]'], [/text-teal-700/g, 'text-[var(--color-primary)]'], [/border-teal-200/g, 'border-[var(--color-border)]'], [/border-teal-500/g, 'border-[var(--color-primary)]'], [/hover:bg-teal-50/g, 'hover:bg-gray-50'], [/hover:bg-teal-500/g, 'hover:bg-[var(--color-primary)]'], [/hover:text-teal-700/g, 'hover:text-[var(--color-primary)]'], [/hover:text-teal-500/g, 'hover:text-[var(--color-primary)]'], [/hover:border-teal-200/g, 'hover:border-[var(--color-border)]'], [/hover:border-teal-500/g, 'hover:border-[var(--color-primary)]'], [/bg-slate-50/g, 'bg-[var(--color-background)]'], [/bg-slate-100/g, 'bg-gray-100'], [/text-slate-800/g, 'text-[var(--color-text-primary)]'], [/text-slate-700/g, 'text-[var(--color-text-primary)]'], [/text-slate-600/g, 'text-[var(--color-text-secondary)]'], [/text-slate-500/g, 'text-[var(--color-text-muted)]'], [/text-slate-400/g, 'text-[var(--color-text-muted)]'], [/border-slate-100/g, 'border-[var(--color-border)]'], [/border-slate-200/g, 'border-[var(--color-border)]'], [/border-slate-300/g, 'border-[var(--color-border)]'], [/bg-slate-100\/80/g, 'bg-gray-100'], [/bg-slate-100\/50/g, 'bg-gray-50'], [/hover:bg-slate-50/g, 'hover:bg-gray-50'], [/hover:text-slate-600/g, 'hover:text-[var(--color-text-secondary)]'], [/hover:text-slate-700/g, 'hover:text-[var(--color-text-primary)]'], [/divide-slate-100/g, 'divide-gray-100'], [/divide-slate-200/g, 'divide-gray-100'], [/shadow-sm/g, 'shadow-[var(--shadow-card)]'],
    [/animate-fade-in/g, '']
  ];
  repl.forEach(([reg, val]) => { code = code.replace(reg, val); });

  // 3. Structural Rewrite
  // Find the exact boundaries
  const returnIdx = code.indexOf('return (');
  const endIdx = code.lastIndexOf(');', code.length - 1);
  const bottomNavIdx = code.lastIndexOf('{/* Bottom Navigation');
  
  // Clean all `activeTab` from state logic
  code = code.replace(/const \[activeTab[^;]+;/g, '');
  code = code.replace(/\s*setActiveTab\([^)]+\);/g, '');

  let topHalf = code.substring(0, returnIdx);
  let oldReturnBody = code.substring(returnIdx, endIdx);

  // We want to extract ALL the `activeTab === 'xxx' && (` blocks.
  // There are content tabs, and there are practice tabs (quiz, practice).
  const quizMatches = [];
  const contentMatches = [];
  
  // We use regex to match ANY block `{activeTab === 'XYZ' && (` or `{activeTab === 'XYZ' ? (`
  // But wait, the ternary was `{activeTab === 'learn' ? (` and `) : (`.
  // In Vocabulary it's ternary. In Grammar/Pronunciation it's logical AND `&&`.
  
  if (oldReturnBody.includes("activeTab === 'learn' ? (")) {
     // Ternary pattern (Vocabulary usually)
     let parts = oldReturnBody.split("activeTab === 'learn' ? (");
     let afterTernary = parts[1];
     let divider = afterTernary.lastIndexOf(") : (");
     let learnContent = afterTernary.substring(0, divider);
     let quizContent = afterTernary.substring(divider + 5);
     // Clean wrappers
     learnContent = learnContent.replace(/^[\s\n]*<>/, '');
     learnContent = learnContent.replace(/<\/>[\s\n]*$/, '');
     quizContent = quizContent.replace(/}}$/, ''); // trim the end closure stuff
     
     contentMatches.push(learnContent);
     quizMatches.push(quizContent);
  } else {
     // Logical AND pattern (Grammar, Pronunciation)
     // Find all {activeTab === 'name' && ( ... )} blocks manually by tracing braces
     let searchIdx = 0;
     while (true) {
        let match = oldReturnBody.indexOf("{activeTab === '", searchIdx);
        if (match === -1) break;
        
        let quoteStart = match + 16;
        let quoteEnd = oldReturnBody.indexOf("'", quoteStart);
        let tabName = oldReturnBody.substring(quoteStart, quoteEnd);
        
        let blockStart = oldReturnBody.indexOf("(", quoteEnd);
        // Find matching closing parenthesis
        let openCount = 1;
        let blockEnd = blockStart + 1;
        while (openCount > 0 && blockEnd < oldReturnBody.length) {
            if (oldReturnBody[blockEnd] === '(') openCount++;
            else if (oldReturnBody[blockEnd] === ')') openCount--;
            blockEnd++;
        }
        
        let content = oldReturnBody.substring(blockStart + 1, blockEnd - 1).trim();
        // peel <> </> if present
        if (content.startsWith('<>')) content = content.substring(2);
        if (content.endsWith('</>')) content = content.substring(0, content.length - 3);
        
        if (tabName === 'quiz' || tabName === 'practice') {
            quizMatches.push(content);
        } else {
            contentMatches.push(content);
        }
        searchIdx = blockEnd;
     }
  }

  // Wrap sections
  let combinedContent = contentMatches.join('\n\n');
  let sectionIdx = 0;
  combinedContent = combinedContent.replace(
    /<section\s+className="([^"]*)"/g,
    (match, cls) => `<motion.section\n                      custom={${sectionIdx++}}\n                      variants={sectionVariants}\n                      initial="hidden"\n                      animate="visible"\n                      className="${cls}"`
  );
  combinedContent = combinedContent.replace(/<\/section>/g, '</motion.section>');

  const quizContent = quizMatches.join('\n\n');

  let newReturn = `return (
        <LessonShell
            title="${meta.title}"
            subtitle="${meta.skill} • Pelajaran ${meta.lessonNum}"
            accentColor="${meta.accent}"
            tabs={[
                { id: 'learn', label: 'Pelajari', icon: <BookOpen size={14} /> },
                ${quizContent ? `{ id: 'practice', label: 'Latihan', icon: <PenTool size={14} /> }` : ''}
            ].filter(Boolean)}
        >
            {(tabId) => tabId === 'learn' ? (
                <div className="space-y-6">
                    ${combinedContent}
                </div>
            ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                    ${quizContent}
                </motion.div>
            )}
        </LessonShell>
    );
};

export default ${path.basename(filePath, '.tsx')};`;

  fs.writeFileSync(filePath, topHalf + newReturn, 'utf8');
  console.log(`✅ ${path.basename(filePath)}`);
}

for (const file of files) {
   try { processFile(file); } catch (e) { console.error(`❌ ${path.basename(file)}: ${e.message}`); }
}
