const fs = require('fs');
const path = require('path');

const dirs = [
  'src/pages/module/english/beginner/pronunciation',
  'src/pages/module/english/beginner/speaking',
];

for (const dir of dirs) {
  const fullDir = path.join(__dirname, '..', dir);
  if (!fs.existsSync(fullDir)) { console.log('MISSING:', dir); continue; }
  
  console.log('\n=== ' + dir.split('/').pop().toUpperCase() + ' ===');
  
  fs.readdirSync(fullDir)
    .filter(f => f.startsWith('Lesson'))
    .sort()
    .forEach(f => {
      const src = fs.readFileSync(path.join(fullDir, f), 'utf8');
      const tabCount = (src.match(/id: '(learn|practice|quiz)'/g) || []).length;
      const maxXlCount = (src.match(/max-w-xl mx-auto/g) || []).length;
      const alreadyFixed = src.includes("tabId === 'practice' ? (") || src.includes("tabId === 'quiz' ? (");
      const stacked = maxXlCount > 1 && !alreadyFixed;
      const status = alreadyFixed ? '✅ fixed' : stacked ? '❌ STACKED' : '⚪ ok';
      console.log(f + ' | tabs=' + tabCount + ' | max-xl-count=' + maxXlCount + ' | ' + status);
    });
}
