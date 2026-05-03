import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const speakingDir = join(__dirname, '..', 'src', 'pages', 'module', 'english', 'elementary', 'speaking');

// Map of wrong icon names -> correct lucide-react names
const ICON_REMAP = {
  'UserIcon': 'User',
  'SmileIcon': 'Smile',
  'ClipboardIcon': 'ClipboardList',
  'ClockIcon': 'Clock',
  'SunIcon': 'Sun',
  'PlaneIcon': 'Plane',
  'TrendUpIcon': 'TrendingUp',
  'HeartIcon': 'Heart',
  'FlameIcon': 'Flame',
  'TrophyIcon': 'Trophy',
  'StarIcon': 'Star',
  'SmartphoneIcon': 'Smartphone',
  'GiftIcon': 'Gift',
  'ZapIcon': 'Zap',
  'SwapIcon': 'ArrowLeftRight',
  'CloudRainIcon': 'CloudRain',
};

// All lucide icons to detect usage of (including correct short names)
const ALL_LUCIDE_ICONS = [
  'BookOpen', 'PenTool', 'CheckCircle2', 'XCircle', 'Volume2',
  'Lightbulb', 'Info', 'Clock', 'User', 'Smile', 'ClipboardList',
  'Sun', 'Plane', 'TrendingUp', 'Heart', 'Flame', 'Trophy', 'Star',
  'Smartphone', 'Gift', 'Zap', 'ArrowLeftRight', 'CloudRain',
  'ChevronRight', 'ChevronLeft', 'Play', 'Check', 'MessageCircle',
  'Mic', 'Volume', 'Book', 'Pencil', 'Award', 'AlertCircle',
  'HelpCircle', 'Sparkles', 'Hash', 'BarChart2', 'ThumbsUp',
  'Bookmark', 'Flag', 'GraduationCap', 'Languages', 'Headphones',
  'MessageSquare', 'Send', 'FileText', 'Settings', 'Globe',
];

const files = readdirSync(speakingDir).filter(f => f.startsWith('Lesson') && f.endsWith('.tsx'));

let fixedCount = 0;

for (const file of files) {
  const filePath = join(speakingDir, file);
  let content = readFileSync(filePath, 'utf-8');
  let changed = false;

  // Step 1: Replace wrong icon names in JSX with correct ones
  for (const [wrong, correct] of Object.entries(ICON_REMAP)) {
    // Replace in JSX: <WrongIcon ... /> and <WrongIcon>
    const jsxRegex = new RegExp(`<${wrong}(\\s|/)`, 'g');
    const closingRegex = new RegExp(`</${wrong}>`, 'g');
    if (jsxRegex.test(content) || closingRegex.test(content)) {
      content = content.replace(new RegExp(`<${wrong}(\\s|/)`, 'g'), `<${correct}$1`);
      content = content.replace(new RegExp(`</${wrong}>`, 'g'), `</${correct}>`);
      changed = true;
    }
    // Also replace in existing import if present
    const importRegex = new RegExp(`\\b${wrong}\\b`, 'g');
    if (importRegex.test(content)) {
      content = content.replace(new RegExp(`\\b${wrong}\\b`, 'g'), correct);
      changed = true;
    }
  }

  // Step 2: Rebuild the lucide-react import based on actual usage
  // First remove existing lucide-react import line
  content = content.replace(/^import \{[^}]+\} from 'lucide-react';\n/m, '');

  // Detect which icons are actually used now (after remap)
  const usedIcons = ALL_LUCIDE_ICONS.filter(icon => {
    const regex = new RegExp(`[<{\\s]${icon}[\\s/>{}]|<${icon}$`, 'm');
    return regex.test(content);
  });

  if (usedIcons.length > 0) {
    const importStatement = `import { ${usedIcons.join(', ')} } from 'lucide-react';\n`;
    // Insert after the last existing import block
    const importBlockEnd = content.match(/^(import .+;\n)+/m);
    if (importBlockEnd) {
      const insertPos = content.indexOf(importBlockEnd[0]) + importBlockEnd[0].length;
      content = content.slice(0, insertPos) + importStatement + content.slice(insertPos);
    } else {
      content = importStatement + content;
    }
    changed = true;
  }

  if (changed) {
    writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ ${file} — icons remapped & imports rebuilt: ${usedIcons.join(', ')}`);
    fixedCount++;
  } else {
    console.log(`⏭  ${file} — no changes needed`);
  }
}

console.log(`\nDone. Fixed ${fixedCount}/${files.length} files.`);
