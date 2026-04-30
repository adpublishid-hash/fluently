const fs = require('fs');
const path = require('path');

const dir = 'd:/talky-main/talky-main/src/pages/module/english/intermediate/pronunciation';

for (let i = 1; i <= 20; i++) {
    let filePath = path.join(dir, `Lesson${i}.tsx`);
    if (!fs.existsSync(filePath)) continue;

    let content = fs.readFileSync(filePath, 'utf8');
    
    // Find all <XxxIcon tags
    let iconsToFix = [];
    let regex = /<([A-Z][A-Za-z0-9]*)Icon\b/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
        let baseName = match[1];
        let fullName = baseName + 'Icon';
        // Is it locally defined?
        if (!content.includes(`const ${fullName} =`) && !content.includes(`function ${fullName}(`)) {
            iconsToFix.push({base: baseName, full: fullName});
        }
    }
    
    iconsToFix = [...new Set(iconsToFix.map(o => JSON.stringify(o)))].map(s => JSON.parse(s));
    
    if (iconsToFix.length > 0) {
        iconsToFix.forEach(({base, full}) => {
            // Replace <XxxIcon with <Xxx
            content = content.replace(new RegExp(`<${full}\\b`, 'g'), `<${base}`);
            content = content.replace(new RegExp(`</${full}>`, 'g'), `</${base}>`);
            
            // Add base to lucide-react imports if not there
            let importRegex = /import\s+\{([^}]+)\}\s+from\s+'lucide-react'/;
            content = content.replace(importRegex, (match, importsStr) => {
                if (importsStr.includes(base)) return match;
                return `import { ${base}, ${importsStr.trim()} } from 'lucide-react'`;
            });
        });
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Fixed ${iconsToFix.map(o => o.full).join(', ')} in Lesson${i}.tsx`);
    }
}
