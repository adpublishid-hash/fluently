const fs = require('fs');
const path = require('path');

const DIRECTORIES_TO_CHECK = [
  path.join(__dirname, '../src/pages/module/english/beginner/grammar'),
  path.join(__dirname, '../src/pages/module/english/beginner/pronunciation'),
];

for (const dir of DIRECTORIES_TO_CHECK) {
  if (!fs.existsSync(dir)) continue;

  const files = fs.readdirSync(dir).filter(f => f.startsWith('Lesson') && f.endsWith('.tsx'));

  for (const f of files) {
    const filePath = path.join(dir, f);
    let src = fs.readFileSync(filePath, 'utf8');

    const searchPattern = /              <\/div>\n                <\/motion\.div>\n            \) : \(/g;
    const replacement = '              </div>\n            </div>\n                </motion.div>\n            ) : (';

    if (searchPattern.test(src)) {
      src = src.replace(searchPattern, replacement);
      fs.writeFileSync(filePath, src, 'utf8');
      console.log(`✅ Fixed (Pattern 1): ${f} in ${path.basename(dir)}`);
    } else {
      const altPattern = /(<\/div>\s*)(<\/motion\.div>\s*\) : \()/g;
      // We only apply altPattern if we actually see the opening <div className="max-w-xl mx-auto text-center pt-8">
      // without its matching closing tag before the motion.div.
      // A naive regex is risky, but we can check if it creates equal amounts of divs. 
      // Safest is to rely on our knowledge of the exact string format.
      if (altPattern.test(src) && src.includes('max-w-xl mx-auto')) { // crude check
          // Just to be safe, only replace if we are sure it needs it. 
          // Let's count divs in the practice branch.
          // Before running regex, let's just use exact match with more flexible spacing.
      }
    }
  }
}
