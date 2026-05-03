// fix-duplicate-upper-inter.cjs
// Removes duplicate upper-intermediate imports and routes from App.tsx
const fs = require('fs');
const path = require('path');

const APP_FILE = path.join(__dirname, '../src/App.tsx');
let content = fs.readFileSync(APP_FILE, 'utf8');

const lines = content.split('\n');
const seen = new Set();
const deduped = [];

for (const line of lines) {
  const trimmed = line.trim();
  
  // Check if this is an import we might duplicate
  const isUpperImport = trimmed.startsWith('import UpperInter');
  const isUpperRoute = trimmed.includes('upper-intermediate') && trimmed.includes('<Route');
  const isUpperComment = trimmed.includes('Upper-Intermediate') || trimmed.includes('Upper-Inter');
  
  if (isUpperImport || isUpperRoute || isUpperComment) {
    // Extract key (just the identifier or path)
    if (seen.has(trimmed)) {
      console.log('🗑️  Removed duplicate:', trimmed.substring(0, 80));
      continue; // skip duplicate
    }
    seen.add(trimmed);
  }
  
  deduped.push(line);
}

const result = deduped.join('\n');
fs.writeFileSync(APP_FILE, result, 'utf8');

const remaining = (result.match(/UpperInter/g) || []).length;
console.log(`✅ Deduplication complete. ${remaining} UpperInter references remain.`);
console.log(`   Lines before: ${lines.length}, after: ${deduped.length}`);
