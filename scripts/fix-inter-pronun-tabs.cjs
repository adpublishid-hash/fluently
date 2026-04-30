const fs = require('fs');
const path = require('path');

const dir = 'd:/talky-main/talky-main/src/pages/module/english/intermediate/pronunciation';

for (let i = 1; i <= 20; i++) {
    let filePath = path.join(dir, `Lesson${i}.tsx`);
    if (!fs.existsSync(filePath)) continue;

    let content = fs.readFileSync(filePath, 'utf8');

    // Remove legacy mapping safely
    content = content.replace(/\/\/ Safe mapping[^\n]*\n\s*if\s*\(tabId === 'practice'\)\s*tabId = 'quiz';/g, '');
    content = content.replace(/if\s*\(tabId === 'practice'\)\s*tabId = 'quiz';/g, '');

    // Fix ChevronLeftIcon -> ChevronLeft
    if (content.includes('ChevronLeftIcon')) {
        content = content.replace(/ChevronLeftIcon/g, 'ChevronLeft');
        // add ChevronLeft to import if not present
        if (!content.includes('ChevronLeft,')) {
            content = content.replace(/import\s+{([^}]+)}\s+from\s+'lucide-react';/, (match, p1) => {
                if (p1.includes('ChevronLeft')) return match;
                return `import { ChevronLeft, ${p1.trim()} } from 'lucide-react';`;
            });
        }
    }

    // Fix tabs array
    let inTabs = false;
    let newLines = [];
    let lines = content.split('\n');
    
    for (let j = 0; j < lines.length; j++) {
        let line = lines[j];
        if (line.includes('tabs={[')) {
            inTabs = true;
        }
        if (inTabs) {
            if (line.includes("id: 'practice'") && (line.includes("label: 'Latihan'") || line.includes("label: 'Kuis'") || line.includes("label: 'Kuis Akhir'"))) {
                line = line.replace("id: 'practice'", "id: 'quiz'");
            }
        }
        if (inTabs && line.includes(']}')) {
            inTabs = false;
        }
        newLines.push(line);
    }
    
    fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
    console.log(`Processed Lesson${i}.tsx`);
}
console.log('All files processed.');
