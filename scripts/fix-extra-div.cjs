const fs = require('fs');
const filesToFix = [
  'src/pages/module/english/beginner/pronunciation/Lesson2.tsx',
  'src/pages/module/english/beginner/pronunciation/Lesson4.tsx',
  'src/pages/module/english/beginner/pronunciation/Lesson5.tsx',
  'src/pages/module/english/beginner/pronunciation/Lesson6.tsx',
  'src/pages/module/english/beginner/pronunciation/Lesson8.tsx'
];

filesToFix.forEach(f => {
  let file = __dirname + '/../' + f;
  if (!fs.existsSync(file)) return;
  let src = fs.readFileSync(file, 'utf8');
  const regex = /<\/div>\s*<\/div>\s*<\/div>\s*<\/motion\.div>\s*\) : \(/;
  if (regex.test(src)) {
    src = src.replace(regex, '</div>\n            </div>\n                </motion.div>\n            ) : (');
    fs.writeFileSync(file, src, 'utf8');
    console.log('Fixed', f);
  }
});
