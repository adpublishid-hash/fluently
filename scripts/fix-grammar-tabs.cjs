const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src/pages/module/english/elementary/grammar');

let fixed = 0;
let skipped = 0;

for (let i = 1; i <= 20; i++) {
    const file = path.join(dir, `Lesson${i}.tsx`);
    if (!fs.existsSync(file)) continue;

    let content = fs.readFileSync(file, 'utf8');

    // Pattern 1: Lessons that use the new 3-tab pattern with tabId === 'practice'
    // These should end with `) : null}</LessonShell>` (our standard)
    // But the script may have produced `)}` instead.
    
    const hasPracticeCheck = content.includes("tabId === 'practice' ?");
    const hasNullClose = content.includes(') : null}</LessonShell>');
    const hasOldBadClose = /\)\s*\}\s*\n\s*<\/LessonShell>/.test(content);
    const hasExamplesTab = content.includes("tabId === 'examples'");
    
    console.log(`L${i}: practice=${hasPracticeCheck}, nullClose=${hasNullClose}, badClose=${hasOldBadClose}, examples=${hasExamplesTab}`);
    
    if (hasPracticeCheck && !hasNullClose && hasOldBadClose) {
        // The practice tab needs to be closed with `: null}` instead of `}`
        // Find the last `)} \n    </LessonShell>` and replace
        content = content.replace(
            /(\)\s*\})\s*\n(\s*<\/LessonShell>)/,
            ') : null}\n$2'
        );
        fs.writeFileSync(file, content, 'utf8');
        console.log(`  → FIXED Lesson${i}`);
        fixed++;
    } else {
        skipped++;
    }
}

console.log(`Done. Fixed: ${fixed}, Skipped: ${skipped}`);
