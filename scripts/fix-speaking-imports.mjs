import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const speakingDir = join(__dirname, '..', 'src', 'pages', 'module', 'english', 'elementary', 'speaking');

// All lucide-react icons potentially used
const ALL_LUCIDE_ICONS = [
  'BookOpen', 'PenTool', 'CheckCircle2', 'XCircle', 'Volume2',
  'Lightbulb', 'Info', 'ChevronRight', 'ChevronLeft', 'ChevronDown',
  'Star', 'ArrowRight', 'ArrowLeft', 'Play', 'Pause', 'Check',
  'X', 'Clock', 'ClockIcon', 'MessageCircle', 'Mic', 'MicOff',
  'Volume', 'Volume1', 'VolumeX', 'Book', 'Pencil', 'Edit',
  'HeartHandshake', 'Trophy', 'Zap', 'Target', 'Globe', 'Users',
  'User', 'Home', 'Lock', 'Unlock', 'Eye', 'EyeOff', 'Search',
  'RotateCcw', 'RefreshCw', 'Award', 'Badge', 'Circle', 'Square',
  'AlertCircle', 'AlertTriangle', 'HelpCircle', 'Sparkles', 'Flame',
  'Hash', 'List', 'LayoutGrid', 'Columns', 'BarChart2', 'TrendingUp',
  'ThumbsUp', 'ThumbsDown', 'Heart', 'Bookmark', 'Flag', 'Tag',
  'GraduationCap', 'Languages', 'Headphones', 'Radio', 'Rss',
  'MessageSquare', 'Send', 'Share', 'Link', 'ExternalLink',
  'FileText', 'File', 'Folder', 'Settings', 'MoreHorizontal',
  'MoreVertical', 'Menu', 'Grid', 'Layout', 'Columns2',
];

const files = readdirSync(speakingDir).filter(f => f.startsWith('Lesson') && f.endsWith('.tsx'));

let fixedCount = 0;

for (const file of files) {
  const filePath = join(speakingDir, file);
  let content = readFileSync(filePath, 'utf-8');

  // Check if already has lucide-react import
  if (content.includes("from 'lucide-react'")) {
    console.log(`⏭  ${file} — already has lucide-react import`);
    continue;
  }

  // Detect which icons are used in this file
  const usedIcons = ALL_LUCIDE_ICONS.filter(icon => {
    // Match JSX usage like <IconName or <IconName size or {IconName}
    const regex = new RegExp(`[<{]${icon}[\\s/>{}]|<${icon}$`, 'm');
    return regex.test(content);
  });

  if (usedIcons.length === 0) {
    console.log(`⚠  ${file} — no lucide icons detected`);
    continue;
  }

  const importStatement = `import { ${usedIcons.join(', ')} } from 'lucide-react';\n`;

  // Insert after the last existing import line
  const importInsertRegex = /^(import .+;\n)+/m;
  const match = content.match(importInsertRegex);

  if (match) {
    const insertPos = content.indexOf(match[0]) + match[0].length;
    content = content.slice(0, insertPos) + importStatement + content.slice(insertPos);
  } else {
    // Prepend at top
    content = importStatement + content;
  }

  writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ ${file} — added imports: ${usedIcons.join(', ')}`);
  fixedCount++;
}

console.log(`\nDone. Fixed ${fixedCount}/${files.length} files.`);
