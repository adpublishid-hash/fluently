import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const speakingDir = join(__dirname, '..', 'src', 'pages', 'module', 'english', 'elementary', 'speaking');

const files = readdirSync(speakingDir).filter(f => f.startsWith('Lesson') && f.endsWith('.tsx'));

let fixedCount = 0;

for (const file of files) {
  const filePath = join(speakingDir, file);
  let content = readFileSync(filePath, 'utf-8');

  const needsFramerMotion = content.includes('<motion.') && !content.includes("from 'framer-motion'");

  if (!needsFramerMotion) {
    console.log(`⏭  ${file} — framer-motion already imported or not needed`);
    continue;
  }

  // Add framer-motion import after last import line
  const importInsertRegex = /^(import .+;\n)+/m;
  const match = content.match(importInsertRegex);

  const framerImport = `import { motion } from 'framer-motion';\n`;
  
  if (match) {
    const insertPos = content.indexOf(match[0]) + match[0].length;
    content = content.slice(0, insertPos) + framerImport + content.slice(insertPos);
  } else {
    content = framerImport + content;
  }

  writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ ${file} — added framer-motion import`);
  fixedCount++;
}

console.log(`\nDone. Fixed ${fixedCount}/${files.length} files.`);
