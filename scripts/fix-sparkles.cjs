const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        if (file === 'node_modules' || file === '.git' || file === 'dist') return;
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.tsx')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk(path.join(__dirname, '../src/pages/module/english'));
let changed = 0;

for (const file of files) {
    let src = fs.readFileSync(file, 'utf8');
    if (src.includes('SparklesIcon')) {
        src = src.replace(/SparklesIcon/g, 'Sparkles');
        fs.writeFileSync(file, src, 'utf8');
        console.log('Fixed SparklesIcon in', file);
        changed++;
    }
}

console.log('Total fixed:', changed);
