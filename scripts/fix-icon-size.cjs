const fs = require('fs');
const path = require('path');

const grammarDir = path.join(__dirname, '..', 'src', 'pages', 'module', 'english', 'beginner', 'grammar');
const files = fs.readdirSync(grammarDir).filter(f => f.startsWith('Lesson') && f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(grammarDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Replace giant icon sizes
  const newContent = content
    .replace(/size=\{2400\}/g, 'size={24}')
    .replace(/size=\{2000\}/g, 'size={20}')
    .replace(/size=\{1600\}/g, 'size={16}');
    
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf-8');
    console.log(`Fixed icon sizes in ${file}`);
  }
}
