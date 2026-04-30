const fs = require('fs');
const path = require('path');

const dir = 'd:/talky-main/talky-main/src/pages/module/english/intermediate/pronunciation';

let allMissing = [];

for (let i = 1; i <= 20; i++) {
    let filePath = path.join(dir, `Lesson${i}.tsx`);
    if (!fs.existsSync(filePath)) continue;

    let content = fs.readFileSync(filePath, 'utf8');

    let tags = [];
    let regex = /<([A-Z][A-Za-z0-9]*)/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
        tags.push(match[1]);
    }
    
    tags = [...new Set(tags)];
    
    let missing = [];
    for (let tag of tags) {
        if (tag === 'Fragment') continue;
        
        let isImported = new RegExp(`import(\n|\\s|\\{)*[\\s\\S]*?\\b${tag}\\b[\\s\\S]*?from`).test(content);
        let isDefinedConst = new RegExp(`const\\s+${tag}\\s*(=|:)`).test(content);
        let isDefinedFunc = new RegExp(`function\\s+${tag}\\b`).test(content);
        let isDefinedClass = new RegExp(`class\\s+${tag}\\b`).test(content);
        
        if (!isImported && !isDefinedConst && !isDefinedFunc && !isDefinedClass) {
            missing.push(tag);
        }
    }
    
    if (missing.length > 0) {
        allMissing.push(`Lesson${i}.tsx: ${missing.join(', ')}`);
    }
}

console.log(allMissing.join('\n') || "No missing tags found.");
