const fs = require('fs');
const glob = require('glob');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const MODULE_DIR = path.join(ROOT, 'src', 'pages', 'module', 'english', 'beginner');

function getFiles(dir, files = []) {
  fs.readdirSync(dir).forEach(file => {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) {
      getFiles(full, files);
    } else if (full.endsWith('.tsx') && !full.includes('Speaking') && !full.includes('exercises.ts') && !full.includes('QuizSection.tsx')) {
      const code = fs.readFileSync(full, 'utf8');
      if (code.includes('LessonShell')) {
         files.push(full);
      }
    }
  });
  return files;
}

const files = getFiles(MODULE_DIR);

for (const file of files) {
  let code = fs.readFileSync(file, 'utf8');

  // Extract the title, subtitle, accentColor
  const titleMatch = code.match(/title="([^"]+)"/);
  const subtitleMatch = code.match(/subtitle="([^"]+)"/);
  const accentMatch = code.match(/accentColor="([^"]+)"/);
  
  if (!titleMatch || !subtitleMatch || !accentMatch) continue;
  
  const title = titleMatch[1];
  const subtitle = subtitleMatch[1];
  const accent = accentMatch[1];

  // Try to find the section containing the LEARN content
  // Usually starts after `tabId === 'learn' ? (` and ends before the quiz or end of file
  let learnStart = code.indexOf(`{(tabId) => tabId === 'learn' ? (`);
  if (learnStart === -1) continue;

  let contentStart = code.indexOf('<', learnStart + 35);
  // look for `) : (` or `) : null` or the quiz block
  let quizStart = code.indexOf('<div className="max-w-xl mx-auto">');
  if (quizStart === -1) quizStart = code.indexOf('{!showResult ? (');
  if (quizStart !== -1) {
    quizStart = code.lastIndexOf('<', quizStart - 1);
    // Go up one level if it's motion.div
    const motionDiv = code.lastIndexOf('<motion.div', quizStart);
    if (motionDiv !== -1 && (quizStart - motionDiv) < 100) quizStart = motionDiv;
  }
  
  let learnEnd = quizStart !== -1 ? code.lastIndexOf('</div>', quizStart) : code.lastIndexOf('</div>', code.length - 100);
  if (learnEnd === -1) learnEnd = code.length;

  // Extract learn block
  // We need to clean `<div className="space-y-6">` and `<>` wrappers
  const rawLearnContent = code.substring(contentStart, quizStart !== -1 ? code.lastIndexOf('</div>', quizStart) : code.lastIndexOf('</div>', code.length - 50));
  
  let quizBlock = "";
  if (quizStart !== -1) {
     let quizEnd = code.lastIndexOf('</motion.div>');
     if (quizEnd === -1) quizEnd = code.lastIndexOf('</div>', code.length - 50);
     if (quizEnd !== -1) {
       quizBlock = code.substring(quizStart, quizEnd + 13);
     }
  }

  // Rewrite the whole bottom Half
  const returnIndex = code.indexOf('return (');
  if (returnIndex === -1) continue;

  const topHalf = code.substring(0, returnIndex);
  
  // Reconstruct learn block safely
  // Remove broken wrappers
  let cleanedLearn = rawLearnContent;
  cleanedLearn = cleanedLearn.replace(/^<div className="space-y-6">\s*/, '');
  cleanedLearn = cleanedLearn.replace(/^<div className="space-y-6">\s*/, '');
  cleanedLearn = cleanedLearn.replace(/^<>\s*/, '');
  cleanedLearn = cleanedLearn.replace(/\s*<\/>$/, '');
  cleanedLearn = cleanedLearn.replace(/\s*<\/div>$/, '');
  cleanedLearn = cleanedLearn.replace(/\s*<\/div>$/, '');

  // Reconstruct quiz block
  let finalQuizBlock = quizBlock;
  if (quizBlock) {
     if (!quizBlock.startsWith('<motion.div')) {
         finalQuizBlock = `<motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >\n${quizBlock}\n</motion.div>`;
     }
  } else {
     finalQuizBlock = 'null';
  }

  const newReturn = `return (
    <LessonShell
      title="${title}"
      subtitle="${subtitle}"
      accentColor="${accent}"
      tabs={[
        { id: 'learn', label: 'Pelajari', icon: <BookOpen size={14} /> },
        ${finalQuizBlock !== 'null' ? `{ id: 'practice', label: 'Latihan', icon: <PenTool size={14} /> }` : ''}
      ].filter(Boolean)}
    >
      {(tabId) => tabId === 'learn' ? (
        <div className="space-y-6">
          ${cleanedLearn}
        </div>
      ) : (
        ${finalQuizBlock}
      )}
    </LessonShell>
  );
};
export default ${path.basename(file, '.tsx')};
`;

  fs.writeFileSync(file, topHalf + newReturn, 'utf8');
}
console.log('Fixed files');
