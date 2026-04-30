const fs = require('fs');
const path = require('path');

const SPEAKING_DIR = path.join(__dirname, '..', 'src', 'pages', 'module', 'english', 'elementary', 'speaking');

let fixedCount = 0;

for (let i = 1; i <= 20; i++) {
  const filePath = path.join(SPEAKING_DIR, `Lesson${i}.tsx`);
  if (!fs.existsSync(filePath)) continue;

  let content = fs.readFileSync(filePath, 'utf-8');
  let original = content;

  // Replace <section>\n *<h3 className="text-lg font-bold... ending with </motion.section>
  // Wait, the simplest way is to see if we have <section> immediately prefixed by {/* Scenario Selector */}
  // and close it properly.
  content = content.replace(/\{\/\* Scenario Selector \*\/\}\s*<section>/g, '{/* Scenario Selector */}\n          <section>');

  // And let's find the closing </motion.section> for it and change to </section>
  // It's followed by {/* Active Conversation Display */}
  content = content.replace(/<\/motion\.section>\s*\{\/\* Active Conversation Display \*\/\}/g, '</section>\n\n          {/* Active Conversation Display */}');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf-8');
    fixedCount++;
    console.log(`[FIXED SECTION] speaking/Lesson${i}.tsx`);
  }
}

console.log(`\nSuccessfully fixed section tags in ${fixedCount} files.`);
