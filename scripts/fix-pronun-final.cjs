/**
 * Safe pronunciation tab splitter.
 * Strategy:
 *  - Add "Tantangan" tab between Pelajari and Latihan
 *  - The ENTIRE old practice content goes into the Latihan tab (unchanged)
 *  - Tantangan tab shows a placeholder for now
 *  - For Lesson1 only (which has {/* Quiz *\/} marker), actually split the content
 *
 * Key rules:
 *  1. Normalize CRLF → LF before processing
 *  2. Use line-by-line replacement for imports (handles multiline imports)
 *  3. Never slice JSX content at mid-expression
 */
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src/pages/module/english/elementary/pronunciation');

for (let i = 1; i <= 15; i++) {
  const file = path.join(dir, `Lesson${i}.tsx`);
  if (!fs.existsSync(file)) continue;

  // Normalize CRLF → LF
  let content = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');

  // ── 1. Fix the import: add Star using a line-aware replacement ───────────────
  // Find the lucide-react import block (may span multiple lines)
  const importRegex = /import \{([\s\S]*?)\} from 'lucide-react';/;
  const importMatch = content.match(importRegex);
  if (importMatch) {
    const iconString = importMatch[1];
    const icons = iconString.split(',').map(s => s.trim().replace(/\n/g, '')).filter(Boolean);
    if (!icons.includes('Star')) {
      icons.push('Star');
    }
    const newImport = `import { ${icons.join(', ')} } from 'lucide-react';`;
    content = content.replace(importRegex, newImport);
  }

  // ── 2. Replace the 2-tab definition with 3-tab definition ────────────────────
  const oldTabs = `tabs={[{ id: 'learn', label: 'Pelajari', icon: <BookOpen size={14} /> }, { id: 'practice', label: 'Latihan', icon: <PenTool size={14} /> }]}`;
  const newTabs = `tabs={[{ id: 'learn', label: 'Pelajari', icon: <BookOpen size={14} /> }, { id: 'challenge', label: 'Tantangan', icon: <Star size={14} /> }, { id: 'practice', label: 'Latihan', icon: <PenTool size={14} /> }]}`;
  
  if (!content.includes(oldTabs)) {
    console.log(`L${i}: old tabs def not found, skip`);
    continue;
  }
  content = content.replace(oldTabs, newTabs);

  // ── 3. Find the old 2-way ternary split: `) : (` ────────────────────────────
  // The original files end the learn branch with:  ) : (
  const OLD_SPLIT = ') : (';
  const splitIdx = content.indexOf(OLD_SPLIT);
  if (splitIdx === -1) {
    console.log(`L${i}: ternary split not found`);
    continue;
  }

  const beforeSplit = content.slice(0, splitIdx);  // learn tab content
  const afterSplit = content.slice(splitIdx + OLD_SPLIT.length); // old practice content (challenge + quiz combined)

  // ── 4. Strip the old closing from afterSplit ─────────────────────────────────
  // afterSplit ends with:  \n      )}\n    </LessonShell>\n  );\n};\n\nexport default Xyz;\n
  // We want the practice content without the outer `)}` and `</LessonShell>` closing.
  const lessonShellMarker = '\n    </LessonShell>';
  const lsIdx = afterSplit.indexOf(lessonShellMarker);
  
  let practiceContent = lsIdx !== -1 ? afterSplit.slice(0, lsIdx) : afterSplit;
  
  // Strip the trailing `)}` that was the original 2-way ternary close
  practiceContent = practiceContent.replace(/\n\s*\)\}\s*$/, '').trim();

  // ── 5. For Lesson1: split challenge vs quiz at {/* Quiz */} ─────────────────
  let challengeContent = `<div className="p-6 text-center">\n            <p className="text-[var(--color-text-secondary)] text-sm">Tantangan untuk pelajaran ini akan segera hadir. 🎯</p>\n          </div>`;
  let quizContent = practiceContent;

  if (i === 1) {
    const quizMarker = '{/* Quiz */}';
    const quizMarkerIdx = practiceContent.indexOf(quizMarker);
    if (quizMarkerIdx !== -1) {
      // Find the <div that precedes the quiz comment
      const beforeQuiz = practiceContent.slice(0, quizMarkerIdx);
      const lastNewline = beforeQuiz.lastIndexOf('\n');
      challengeContent = beforeQuiz.slice(0, lastNewline).trim();
      quizContent = beforeQuiz.slice(lastNewline).trimStart() + quizMarker + practiceContent.slice(quizMarkerIdx + quizMarker.length);
      quizContent = quizContent.trim();
    }
  }

  // ── 6. Get the export name ────────────────────────────────────────────────────
  const exportMatch = content.match(/export default (ElemPronun\w+);/);
  const exportName = exportMatch ? exportMatch[1] : `ElemPronunLesson${i}`;
  const compMatch = content.match(/const (ElemPronun\w+): React\.FC/);
  const compName = compMatch ? compMatch[1] : exportName;

  // ── 7. Rebuild the complete file ──────────────────────────────────────────────
  const newContent =
    beforeSplit +
    `\n      ) : tabId === 'challenge' ? (\n` +
    `        <div className="max-w-xl mx-auto p-4 md:p-8 pb-24 animate-fade-in">\n` +
    `          ${challengeContent}\n` +
    `        </div>\n` +
    `      ) : tabId === 'practice' ? (\n` +
    `        <div className="max-w-xl mx-auto p-4 md:p-8 pb-24 animate-fade-in">\n` +
    `          ${quizContent}\n` +
    `        </div>\n` +
    `      ) : null}\n    </LessonShell>\n  );\n};\n\nexport default ${exportName};\n`;

  fs.writeFileSync(file, newContent, 'utf8');
  console.log(`L${i}: ✓ (${compName})`);
}

console.log('\nAll done!');
