const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src/pages/module/english/elementary/pronunciation');

let fixed = 0;

for (let i = 1; i <= 15; i++) {
  const file = path.join(dir, `Lesson${i}.tsx`);
  if (!fs.existsSync(file)) continue;

  let content = fs.readFileSync(file, 'utf8');

  // Check if challenge tab is already populated (not just placeholder)
  if (content.includes("id: 'challenge'") && !content.includes('Tantangan belum tersedia')) {
    console.log(`L${i}: already properly split, skipping`);
    continue;
  }

  // Find the practice tab's opening
  const practiceTabStart = content.indexOf(") : tabId === 'practice' ? (");
  if (practiceTabStart === -1) {
    console.log(`L${i}: no practice tab found`);
    continue;
  }
  
  const afterPracticeTab = content.slice(practiceTabStart);
  
  // Find quiz comment divider
  const quizCommentIdx = afterPracticeTab.indexOf('{/* Quiz */}');
  const quizNoCommentIdx = afterPracticeTab.indexOf('!showResult');
  
  let challengeOnly = '';
  let quizOnly = '';
  
  if (quizCommentIdx !== -1) {
    // Found {/* Quiz */} marker — split right before the containing <div>
    const divBeforeQuiz = afterPracticeTab.lastIndexOf('\n              <div', quizCommentIdx);
    if (divBeforeQuiz !== -1) {
      challengeOnly = afterPracticeTab.slice(0, divBeforeQuiz);
      quizOnly = afterPracticeTab.slice(divBeforeQuiz);
    }
  } else if (quizNoCommentIdx !== -1) {
    // Fallback: split at !showResult's container div
    const divBeforeQuiz = afterPracticeTab.lastIndexOf('\n              <div', quizNoCommentIdx);
    const divBeforeQuiz2 = afterPracticeTab.lastIndexOf('\n        <div', quizNoCommentIdx);
    const splitAt = Math.max(divBeforeQuiz, divBeforeQuiz2);
    if (splitAt !== -1) {
      challengeOnly = afterPracticeTab.slice(0, splitAt);
      quizOnly = afterPracticeTab.slice(splitAt);
    }
  }
  
  if (!challengeOnly || !quizOnly) {
    console.log(`L${i}: could not find quiz split point`);
    continue;
  }
  
  // Build new practice block
  // challengeOnly currently starts with ") : tabId === 'practice' ? (\n        <div..."
  // We need to strip the opening wrapper from challengeOnly and put it in challenge tab
  
  const challengeInnerStart = challengeOnly.indexOf('\n        <div');
  const challengeInner = challengeOnly.slice(challengeInnerStart).trim();
  
  // quizOnly ends with ") : null}\n    </LessonShell>" 
  // Extract just the quiz content div
  const quizInner = quizOnly.trim();
  
  // Replace the challenge tab placeholder + practice tab with properly split content
  const oldChallengeBlock = "      ) : tabId === 'challenge' ? (\n        <div className=\"p-8 text-center\"><p className=\"text-[var(--color-text-secondary)]\">Tantangan belum tersedia.</p></div>\n      ) : tabId === 'practice' ? (";
  const practiceTabFull = content.slice(practiceTabStart);
  
  const newBlock = 
    `\n      ) : tabId === 'challenge' ? (\n`+
    `        <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth relative">\n`+
    `          <div className="p-4 md:p-8 space-y-8 pb-24 animate-fade-in">\n`+
    challengeInner +
    `\n          </div>\n        </div>\n`+
    `      ) : tabId === 'practice' ? (\n`+
    `        <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth relative">\n`+
    `          <div className="p-4 md:p-8 space-y-8 pb-24 animate-fade-in">\n`+
    quizInner +
    `\n          </div>\n        </div>\n      ) : null}\n    </LessonShell>`;
  
  content = content.slice(0, practiceTabStart) + newBlock;
  
  // Fix the closing - remove anything after </LessonShell>
  const lessonShellEnd = content.indexOf('</LessonShell>');
  const afterShell = content.slice(lessonShellEnd + '</LessonShell>'.length);
  // Get the proper export
  const exportMatch = content.match(/export default (ElemPronun\w+);/);
  const exportName = exportMatch ? exportMatch[1] : `ElemPronunLesson${i}`;
  
  content = content.slice(0, lessonShellEnd + '</LessonShell>'.length) + '\n  );\n};\n\nexport default ' + exportName + ';\n';
  
  fs.writeFileSync(file, content, 'utf8');
  console.log(`L${i}: FIXED`);
  fixed++;
}

console.log(`\nDone. Fixed ${fixed} lessons.`);
