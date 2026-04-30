/**
 * Fix Elementary Grammar Lessons 1-18
 * 
 * These files were partially migrated to use LessonShell but still have:
 * 1. Missing LessonShell import (import ViewState instead)
 * 2. Old LessonProps interface
 * 3. Old component signature with unused props
 * 4. Broken JSX: {(tabId) => ...} callback with old activeTab conditionals
 * 5. References to non-existent icons (StarIcon, TrendUpIcon, etc.)
 * 6. Wrong closing tags (</div></div></div> instead of </LessonShell>)
 * 
 * The correct pattern is from Lesson20.tsx which was properly migrated.
 */

const fs = require('fs');
const path = require('path');

const GRAMMAR_DIR = path.join(__dirname, '..', 'src', 'pages', 'module', 'english', 'elementary', 'grammar');

// Map of old icon references to lucide-react replacements
const ICON_REPLACEMENTS = {
  'RefreshIcon': 'TrendingUp',
  'HistoryIcon': 'TrendingUp',
  'ClipboardIcon': 'TrendingUp',
  'EditIcon': 'TrendingUp',
  'RepeatIcon': 'TrendingUp',
  'TrendUpIcon': 'TrendingUp',
  'FlameIcon': 'Sparkles',
  'StarIcon': 'Star',
  'TrophyIcon': 'Trophy',
  'ShuffleIcon': 'TrendingUp',
  'ClockIcon': 'TrendingUp',
  'SettingsIcon': 'TrendingUp',
  'TargetIcon': 'TrendingUp',
  'LayersIcon': 'TrendingUp',
  'LinkIcon': 'TrendingUp',
  'FilterIcon': 'TrendingUp',
  'SpeakerIcon': 'TrendingUp',
  'BarChartIcon': 'TrendingUp',
  'HashIcon': 'TrendingUp',
  'GitMergeIcon': 'TrendingUp',
  'RepeatClockIcon': 'TrendingUp',
  'FileTextIcon': 'TrendingUp',
  'BrainIcon': 'TrendingUp',
  'AlertCircleIcon': 'TrendingUp',
  'CompareIcon': 'TrendingUp',
  'ScaleIcon': 'TrendingUp',
  'AlertTriangleIcon': 'TrendingUp',
};

function fixLesson(filePath) {
  const filename = path.basename(filePath);
  const lessonNum = filename.match(/Lesson(\d+)/)?.[1];
  if (!lessonNum || parseInt(lessonNum) > 19) return false;
  
  let content = fs.readFileSync(filePath, 'utf-8');
  const original = content;
  
  // ─── Step 1: Fix imports ───
  // Remove old imports
  content = content.replace(/import { useNavigate } from 'react-router-dom';\n/, '');
  content = content.replace(/import { ViewState } from ['"]\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/types['"];\n/, '');
  
  // Remove LessonProps interface
  content = content.replace(/\ninterface LessonProps \{[\s\S]*?\}\n/, '\n');
  
  // Add LessonShell import if missing
  if (!content.includes("import LessonShell")) {
    // Add after lucide-react import
    content = content.replace(
      /(} from 'lucide-react';\n)/,
      `$1import LessonShell, { sectionVariants } from '../../../../../components/shared/LessonShell';\n`
    );
  }
  
  // ─── Step 2: Collect needed icon imports ───
  // Find all *Icon references in the file
  const iconRefs = new Set();
  for (const [oldIcon, newIcon] of Object.entries(ICON_REPLACEMENTS)) {
    const regex = new RegExp(`<${oldIcon}`, 'g');
    if (regex.test(content)) {
      iconRefs.add(newIcon);
    }
  }
  
  // Also check for StarIcon in quiz result section - replace with Star
  if (content.includes('StarIcon')) iconRefs.add('Star');
  if (content.includes('TrophyIcon')) iconRefs.add('Trophy');
  
  // ─── Step 3: Replace old icon references in JSX ───
  for (const [oldIcon, newIcon] of Object.entries(ICON_REPLACEMENTS)) {
    content = content.replace(new RegExp(`<${oldIcon}`, 'g'), `<${newIcon}`);
    content = content.replace(new RegExp(`</${oldIcon}>`, 'g'), `</${newIcon}>`);
  }
  
  // ─── Step 4: Add needed icons to lucide-react import ───
  const neededIcons = new Set(['Trophy', 'Star', 'TrendingUp']);
  iconRefs.forEach(icon => neededIcons.add(icon));
  
  // Check which icons are already imported
  const importMatch = content.match(/import \{([^}]+)\} from 'lucide-react'/);
  if (importMatch) {
    const existingImports = importMatch[1].split(',').map(s => s.trim()).filter(Boolean);
    const existingSet = new Set(existingImports);
    
    for (const icon of neededIcons) {
      if (!existingSet.has(icon)) {
        existingImports.push(icon);
      }
    }
    
    // Format the import nicely
    const formattedImports = existingImports.join(', ');
    content = content.replace(
      /import \{[^}]+\} from 'lucide-react'/,
      `import {\n  ${formattedImports}\n} from 'lucide-react'`
    );
  }
  
  // ─── Step 5: Fix component signature ───
  const componentName = `ElemGrammarLesson${lessonNum}`;
  content = content.replace(
    new RegExp(`const ${componentName}: React\\.FC<LessonProps> = \\(\\{ onNavigate, userParams \\}\\) =>`),
    `const ${componentName}: React.FC = () =>`
  );
  
  // ─── Step 6: Fix the JSX structure ───
  // The key problem: the children callback starts with
  //   {(tabId) => tabId === 'learn' ? (
  //   {/* Content */}
  //   <div className="flex-1...">
  //     <div className="p-4...">
  //       {activeTab === 'xxx' && ( ... )}  // OLD tabs
  //       {activeTab === 'yyy' && ( ... )}  // OLD tabs
  //       {activeTab === 'quiz' && ( ... )} // Quiz tab
  //     </div>
  //   </div>
  //   </div>  // wrong closing
  //
  // We need to transform this to:
  //   {(tabId) => tabId === 'learn' ? (
  //     <div className="space-y-8 animate-fade-in">
  //       ... all non-quiz activeTab content without the conditional ...
  //     </div>
  //   ) : (
  //     <div className="animate-fade-in">
  //       ... quiz content without the conditional ...
  //     </div>
  //   )}
  //   </LessonShell>
  
  // Find the render section - everything from `{(tabId) =>` to end of component
  const renderStart = content.indexOf("{(tabId) => tabId === 'learn' ? (");
  if (renderStart === -1) {
    console.log(`  ⚠ Could not find render callback in ${filename}`);
    return false;
  }
  
  // Find the content between the LessonShell open tag and end
  const beforeRender = content.substring(0, renderStart);
  const renderSection = content.substring(renderStart);
  
  // Extract all the activeTab sections
  // Find all {activeTab === 'xxx' && ( ... )} blocks
  const tabBlocks = [];
  let quizBlock = null;
  
  // Use a simple parser to find activeTab blocks
  const activeTabRegex = /\{activeTab === '([^']+)' && \(/g;
  let match;
  const renderContent = renderSection;
  
  while ((match = activeTabRegex.exec(renderContent)) !== null) {
    const tabName = match[1];
    const startPos = match.index;
    
    // Find the matching closing of this block by counting braces/parens
    let depth = 0;
    let i = startPos;
    let foundStart = false;
    
    for (; i < renderContent.length; i++) {
      const char = renderContent[i];
      if (char === '{' || char === '(') {
        depth++;
        foundStart = true;
      } else if (char === '}' || char === ')') {
        depth--;
        if (foundStart && depth === 0) {
          break;
        }
      }
    }
    
    const blockContent = renderContent.substring(startPos, i + 1);
    
    // Extract just the inner content (remove the {activeTab === 'xxx' && ( ... )} wrapper)
    const innerStart = blockContent.indexOf('(') + 1;
    // Find the matching close - it's the content between the first ( after && and the last )}
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
    
    if (tabName === 'quiz') {
      quizBlock = innerContent;
    } else {
      tabBlocks.push({ name: tabName, content: innerContent });
    }
  }
  
  if (tabBlocks.length === 0 && !quizBlock) {
    console.log(`  ⚠ Could not extract tab blocks from ${filename}`);
    return false;
  }
  
  // Combine all non-quiz blocks into the 'learn' tab content
  // Remove the <></> fragment wrappers if present
  const cleanBlock = (block) => {
    let cleaned = block;
    // Remove leading <> and trailing </>
    cleaned = cleaned.replace(/^\s*<>\s*/, '').replace(/\s*<\/>\s*$/, '');
    return cleaned;
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
  
  // Replace the old render section and everything after it
  content = beforeRender + newRender;
  
  // ─── Step 7: Clean up any remaining issues ───
  // Remove duplicate newlines
  content = content.replace(/\n{3,}/g, '\n\n');
  
  // Check the file compiles by verifying balanced braces etc
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`  ✅ Fixed ${filename}`);
    return true;
  }
  
  console.log(`  ℹ No changes needed for ${filename}`);
  return false;
}

// Process all lessons 1-18
console.log('🔧 Fixing Elementary Grammar Lessons 1-18...\n');

let fixed = 0;
for (let i = 1; i <= 19; i++) {
  const filePath = path.join(GRAMMAR_DIR, `Lesson${i}.tsx`);
  if (fs.existsSync(filePath)) {
    try {
      if (fixLesson(filePath)) fixed++;
    } catch (err) {
      console.log(`  ❌ Error fixing Lesson${i}: ${err.message}`);
    }
  } else {
    console.log(`  ⚠ Lesson${i}.tsx not found`);
  }
}

console.log(`\n✨ Done! Fixed ${fixed} files.`);
