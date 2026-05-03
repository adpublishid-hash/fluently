const fs = require('fs');
const path = require('path');

const DIRECTORIES_TO_CHECK = [
  path.join(__dirname, '../src/pages/module/english/beginner/grammar'),
  path.join(__dirname, '../src/pages/module/english/beginner/pronunciation'),
];

let fixedFiles = 0;

for (const dir of DIRECTORIES_TO_CHECK) {
  if (!fs.existsSync(dir)) continue;

  const files = fs.readdirSync(dir).filter(f => f.startsWith('Lesson') && f.endsWith('.tsx'));

  for (const f of files) {
    const filePath = path.join(dir, f);
    let src = fs.readFileSync(filePath, 'utf8');
    const original = src;

    // Pattern 1: Strict matching with spaces
    // The previous script added closing tags before this precise pattern.
    const searchPattern = /              <\/div>\n                <\/motion\.div>\n            \) : \(/g;
    const replacement = '              </div>\n            </div>\n                </motion.div>\n            ) : (';

    if (searchPattern.test(src)) {
      src = src.replace(searchPattern, replacement);
    } else {
        // Pattern 2: the alternate pattern
        // Sometimes it's right before </motion.div>
        const altPattern = /(\s+)<\/div>\n(\s+)<\/motion\.div>\n(\s+)\) : \(/;
        const match = src.match(altPattern);
        if (match) {
            src = src.replace(altPattern, `$1</div>\n$1</div>\n$2</motion.div>\n$3) : (`);
        }
    }

    if (src !== original) {
        fs.writeFileSync(filePath, src, 'utf8');
        console.log(`✅ Fixed: ${f} in ${path.basename(dir)}`);
        fixedFiles++;
    }
  }
}

console.log(`\nFixed total: ${fixedFiles}`);
