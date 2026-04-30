/**
 * fix-icons.mjs — Replace remaining old Icon component references with lucide-react equivalents.
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';

const ROOT = join(import.meta.dirname, '..');
const MODULE_DIR = join(ROOT, 'src', 'pages', 'module', 'english', 'beginner');

const ICON_MAP = {
  'ClipboardIcon': 'Sparkles',
  'BarChartIcon': 'BarChart3',
  'FlameIcon': 'Flame',
  'HandStopIcon': 'Hand',
  'HistoryIcon': 'History',
  'HomeIcon': 'Home',
  'MicIcon': 'Mic',
  'StarIcon': 'Star',
  'TrendUpIcon': 'TrendingUp',
  'TrophyIcon': 'Trophy',
  'UserIcon': 'User',
  'VolumeIcon': 'Volume2',
  'InfoIcon': 'Info',
  'CheckCircleIcon': 'CheckCircle2',
  'XCircleIcon': 'XCircle',
  'PlayCircleIcon': 'PlayCircle',
  'LightBulbIcon': 'Lightbulb',
  'SparklesIcon': 'Sparkles',
  'BookIcon': 'BookOpen',
  'PuzzleIcon': 'PenTool',
  'ChevronLeftIcon': 'ChevronLeft',
  'MoreIcon': 'MoreHorizontal',
  'MicrophoneIcon': 'Mic',
};

function collectFiles(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) files.push(...collectFiles(full));
    else if (/^Lesson\d+\.tsx$/.test(entry)) {
      const code = readFileSync(full, 'utf8');
      if (code.includes('Icon className') || code.includes('Icon />')) files.push(full);
    }
  }
  return files;
}

function fixFile(filePath) {
  let code = readFileSync(filePath, 'utf8');
  let changed = false;

  for (const [oldIcon, newIcon] of Object.entries(ICON_MAP)) {
    if (!code.includes(oldIcon)) continue;
    changed = true;

    // <OldIcon className="w-5 h-5" /> → <NewIcon size={20} />
    code = code.replace(
      new RegExp(`<${oldIcon}\\s+className="[^"]*w-(\\d+)[^"]*"\\s*/>`, 'g'),
      (match, size) => `<${newIcon} size={${parseInt(size) * 4}} />`
    );
    // <OldIcon className="..." />  (without w-N)
    code = code.replace(
      new RegExp(`<${oldIcon}\\s+className="[^"]*"\\s*/>`, 'g'),
      `<${newIcon} size={20} />`
    );
    // <OldIcon /> (simple)
    code = code.replace(new RegExp(`<${oldIcon}\\s*/>`, 'g'), `<${newIcon} size={20} />`);
  }

  if (!changed) return;

  // Now ensure all new lucide icons are imported
  const allLucide = ['Volume2','PlayCircle','Lightbulb','Sparkles','Info','CheckCircle2','XCircle',
    'MessageSquare','BookOpen','PenTool','Mic','ChevronLeft','MoreHorizontal','BarChart3','Flame',
    'Hand','History','Home','Star','TrendingUp','Trophy','User'];
  
  const usedLucide = allLucide.filter(icon => {
    return code.includes(`<${icon} `) || code.includes(`<${icon}>`);
  });

  // Update the existing lucide-react import
  if (code.includes("from 'lucide-react'")) {
    code = code.replace(
      /import \{[^}]*\} from 'lucide-react';/,
      `import { ${usedLucide.join(', ')} } from 'lucide-react';`
    );
  } else {
    // Add it after the last import
    const lastImport = code.lastIndexOf('\nimport ');
    const endOfLine = code.indexOf('\n', lastImport + 1);
    code = code.slice(0, endOfLine + 1) + 
      `import { ${usedLucide.join(', ')} } from 'lucide-react';\n` + 
      code.slice(endOfLine + 1);
  }

  writeFileSync(filePath, code, 'utf8');
  console.log(`  ✅ ${relative(ROOT, filePath)}`);
}

console.log('🎨 Fixing old icon references...\n');
const files = collectFiles(MODULE_DIR);
console.log(`Found ${files.length} files.\n`);
for (const f of files) {
  try { fixFile(f); } catch (e) { console.error(`  ❌ ${relative(ROOT, f)}: ${e.message}`); }
}
console.log('\n✅ Done!');
