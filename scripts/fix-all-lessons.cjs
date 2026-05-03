/**
 * Fix Elementary Lessons (Grammar, Pronunciation, Speaking, Vocabulary)
 * 
 * These files were partially migrated to use LessonShell but still have:
 * 1. Missing LessonShell import (import ViewState instead)
 * 2. Old LessonProps interface
 * 3. Old component signature with unused props
 * 4. Broken JSX: {(tabId) => ...} callback with old activeTab conditionals
 * 5. Wrong closing tags (</div></div></div> instead of </LessonShell>)
 */

const fs = require('fs');
const path = require('path');

const SKILLS = ['pronunciation', 'speaking', 'vocabulary', 'grammar'];
const BASE_DIR = path.join(__dirname, '..', 'src', 'pages', 'module', 'english', 'elementary');

function fixLesson(filePath, componentName) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const original = content;
  
  // ─── Component Signature Fix ───
  // Remove LessonProps
  content = content.replace(/interface\s+LessonProps\s*\{[\s\S]*?\n\}/, '');
  content = content.replace(/import\s+\{\s*ViewState\s*\}\s+from\s+['"](?:\.\.\/)+types['"];?\n?/, '');
  
  // We already fixed signatures in the previous script but just in case:
  const sigRegex = new RegExp(`const\\s+${componentName}\\s*:\\s*React\\.FC(?:<[^>]+>)?\\s*=\\s*\\([^)]*\\)\\s*=>`);
  if (sigRegex.test(content)) {
    content = content.replace(sigRegex, `const ${componentName}: React.FC = () =>`);
  }
  
  // Add LessonShell import if missing
  if (!content.includes("import LessonShell")) {
    if (content.includes("lucide-react")) {
      content = content.replace(
        /(} from 'lucide-react';\n)/,
        `$1import LessonShell, { sectionVariants } from '../../../../../components/shared/LessonShell';\n`
      );
    } else {
      content = content.replace(
        /(import React.*?;\n)/,
        `$1import LessonShell, { sectionVariants } from '../../../../../components/shared/LessonShell';\n`
      );
    }
  }

  // ─── Fix the JSX structure ───
  // Find the render section - everything from `{(tabId) =>` to end of component
  const renderStart = content.indexOf("{(tabId) => tabId === 'learn' ? (");
  if (renderStart === -1) {
    return false; // Already fixed or didn't have this exact pattern
  }
  
  const beforeRender = content.substring(0, renderStart);
  let renderSection = content.substring(renderStart);
  
  // Use a simple parser to find {activeTab === 'xxx' && ( ... )} blocks
  const tabBlocks = [];
  let quizBlock = null;
  
  // First, figure out what the old tabs were by checking activeTab or similar patterns
  // The old code had blocks like `{activeTab === 'learn' && (`
  // Wait, some Pronunciation/Speaking/Vocabulary used different state like `vocabSection` or didn't have activeTab.
  // Actually, if we look at Vocabulary Lesson14, it DOES have `activeTab === 'vocab'` and `activeTab === 'grammar'` and `activeTab === 'quiz'`.
  // The tab blocks we need to extract:
  
  const activeTabRegex = /\{activeTab === '([^']+)' && \(/g;
  let match;
  
  while ((match = activeTabRegex.exec(renderSection)) !== null) {
    const tabName = match[1];
    const startPos = match.index;
    
    let depth = 0;
    let i = startPos;
    let foundStart = false;
    
    for (; i < renderSection.length; i++) {
      const char = renderSection[i];
      if (char === '{' || char === '(') {
        depth++;
        foundStart = true;
      } else if (char === '}' || char === ')') {
        depth--;
        if (foundStart && depth === 0) break;
      }
    }
    
    const blockContent = renderSection.substring(startPos, i + 1);
    
    const innerStart = blockContent.indexOf('(') + 1;
    let innerDepth = 1;
    let innerEnd = innerStart;
    for (let j = innerStart; j < blockContent.length; j++) {
      if (blockContent[j] === '(') innerDepth++;
      else if (blockContent[j] === ')') {
        innerDepth--;
        if (innerDepth === 0) {
          innerEnd = j;
          break;
        }
      }
    }
    
    const innerContent = blockContent.substring(innerStart, innerEnd).trim();
    
    if (tabName === 'quiz' || tabName === 'practice') {
      quizBlock = innerContent;
    } else {
      tabBlocks.push({ name: tabName, content: innerContent });
    }
  }
  
  if (tabBlocks.length === 0 && !quizBlock) {
    // Maybe there are no activeTab blocks because the file just stuffed everything inside the learn tab.
    // In that case, we need to close the LessonShell properly at the end.
    if (content.indexOf('</LessonShell>') === -1) {
      // Just close it correctly.
      // Replace the last sequence of `</div>` and `};` with `</div>)}</LessonShell>);};`
      content = content.replace(/(<\/div>\s*<\/div>\s*<\/div>\s*\)\s*;\s*\}\s*;\s*export default)/, '</div>)}</LessonShell>);};export default');
      if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf-8');
        return true;
      }
    }
    return false;
  }
  
  // Combine all non-quiz blocks into the 'learn' tab content
  const cleanBlock = (block) => {
    return block.replace(/^\s*<>\s*/, '').replace(/\s*<\/>\s*$/, '');
  };
  
  const learnContent = tabBlocks.map(b => cleanBlock(b.content)).join('\n\n');
  
  // Build the new render section
  let newRender;
  
  if (quizBlock) {
    newRender = `{(tabId) => tabId === 'learn' ? (
        <div className="space-y-8 animate-fade-in">
${learnContent}
        </div>
      ) : (
        <div className="animate-fade-in">
          ${quizBlock}
        </div>
      )}
    </LessonShell>
  );
};

export default ${componentName};
`;
  } else {
    newRender = `{(tabId) => tabId === 'learn' ? (
        <div className="space-y-8 animate-fade-in">
${learnContent}
        </div>
      ) : (
        <div className="animate-fade-in">
          <p>Latihan akan datang!</p>
        </div>
      )}
    </LessonShell>
  );
};

export default ${componentName};
`;
  }
  
  content = beforeRender + newRender;
  content = content.replace(/\n{3,}/g, '\n\n');
  
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf-8');
    return true;
  }
  
  return false;
}

let fixed = 0;
for (const skill of SKILLS) {
  const dirPath = path.join(BASE_DIR, skill);
  if (!fs.existsSync(dirPath)) continue;

  for (let i = 1; i <= 20; i++) {
    const filePath = path.join(dirPath, `Lesson${i}.tsx`);
    if (fs.existsSync(filePath)) {
      // Get component name from file
      let componentName = `Lesson${i}`;
      if (skill === 'pronunciation') componentName = `ElemPronunLesson${i}`;
      if (skill === 'speaking') componentName = `ElemSpeakLesson${i}`;
      if (skill === 'vocabulary') componentName = `ElemVocabLesson${i}`;
      if (skill === 'grammar') componentName = `ElemGrammarLesson${i}`;
      
      try {
        if (fixLesson(filePath, componentName)) {
           fixed++;
           console.log(`[FIXED] ${skill}/Lesson${i}.tsx`);
        }
      } catch (err) {
        console.log(`[ERROR] ${skill}/Lesson${i}.tsx: ${err.message}`);
      }
    }
  }
}

console.log(`\nDone! Fixed ${fixed} files.`);
