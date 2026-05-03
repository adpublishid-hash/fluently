// fix-generator-syntax.cjs
const fs = require('fs');
const file = 'scripts/generate-inter-writing-enhanced.cjs';
let content = fs.readFileSync(file, 'utf8');

// The write_to_file tool literally inserted \` and \${ and \n. We need to un-escape these back.
content = content.replace(/\\`/g, '`');
content = content.replace(/\\\$/g, '$');
// Note: We don't want to unescape \n inside regexes or logic if they were meant to be \n, 
// so let's be careful. Let's just fix the template string bounds and iterators.
content = content.replace(/\\\\n/g, '\\n');

fs.writeFileSync(file, content);
console.log('Fixed syntax escapes in ' + file);
