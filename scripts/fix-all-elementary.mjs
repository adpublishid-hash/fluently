import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Semua folder modul yang perlu diperbaiki
const MODULE_DIRS = [
  join(__dirname, '..', 'src', 'pages', 'module', 'english', 'elementary', 'grammar'),
  join(__dirname, '..', 'src', 'pages', 'module', 'english', 'elementary', 'vocabulary'),
  join(__dirname, '..', 'src', 'pages', 'module', 'english', 'elementary', 'pronunciation'),
];

// Peta nama ikon salah -> nama benar di lucide-react
const ICON_REMAP = {
  // Icon variants with "Icon" suffix (tidak ada di lucide-react)
  'HomeIcon': 'Home',
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
  'BookIcon': 'BookOpen',
  'PencilIcon': 'Pencil',
  'AwardIcon': 'Award',
  'TargetIcon': 'Target',
  'MicIcon': 'Mic',
  'MessageIcon': 'MessageCircle',
  'EditIcon': 'Edit',
  'GlobeIcon': 'Globe',
  'CheckIcon': 'Check',
  'AlertIcon': 'AlertCircle',
  'HelpIcon': 'HelpCircle',
  'PlayIcon': 'Play',
  'SchoolIcon': 'GraduationCap',
  'LanguageIcon': 'Languages',
  'RadioIcon': 'Radio',
  'SendIcon': 'Send',
  'ShareIcon': 'Share',
  'FolderIcon': 'Folder',
  'FileIcon': 'FileText',
  'BellIcon': 'Bell',
  'MapPinIcon': 'MapPin',
  'CalendarIcon': 'Calendar',
  'SettingsIcon': 'Settings',
  'SearchIcon': 'Search',
  'EyeIcon': 'Eye',
  'LockIcon': 'Lock',
  'ShieldIcon': 'Shield',
  'ThumbsUpIcon': 'ThumbsUp',
  'FlagIcon': 'Flag',
  'TagIcon': 'Tag',
  'RefreshIcon': 'RefreshCw',
  'RotateIcon': 'RotateCcw',
  'ChatIcon': 'MessageSquare',
  'SparkleIcon': 'Sparkles',
  'BoltIcon': 'Zap',
  'ArrowIcon': 'ArrowRight',
  'BookmarkIcon': 'Bookmark',
  'CrownIcon': 'Crown',
  'DumbbellIcon': 'Dumbbell',
  'WrenchIcon': 'Wrench',
  'BriefcaseIcon': 'Briefcase',
  'CameraIcon': 'Camera',
  'FilmIcon': 'Film',
  'MusicIcon': 'Music',
  'PaletteIcon': 'Palette',
  'PrinterIcon': 'Printer',
  'ScissorsIcon': 'Scissors',
  'ShoppingCartIcon': 'ShoppingCart',
  'SpeakerIcon': 'Speaker',
  'TerminalIcon': 'Terminal',
  'ThermometerIcon': 'Thermometer',
  'ToolIcon': 'Tool',
  'TrashIcon': 'Trash2',
  'TruckIcon': 'Truck',
  'UmbrellaIcon': 'Umbrella',
  'WifiIcon': 'Wifi',
  'WindIcon': 'Wind',
};

// Semua ikon lucide-react yang valid (setelah remap)
const ALL_LUCIDE_ICONS = [
  'BookOpen', 'PenTool', 'CheckCircle2', 'XCircle', 'Volume2',
  'Lightbulb', 'Info', 'Clock', 'User', 'Smile', 'ClipboardList',
  'Sun', 'Plane', 'TrendingUp', 'Heart', 'Flame', 'Trophy', 'Star',
  'Smartphone', 'Gift', 'Zap', 'ArrowLeftRight', 'CloudRain',
  'ChevronRight', 'ChevronLeft', 'ChevronDown', 'ChevronUp',
  'Play', 'Pause', 'Check', 'MessageCircle', 'Mic', 'Volume', 'Book',
  'Pencil', 'Edit', 'Award', 'AlertCircle', 'AlertTriangle', 'HelpCircle',
  'Sparkles', 'Hash', 'BarChart2', 'ThumbsUp', 'Bookmark', 'Flag', 'Tag',
  'GraduationCap', 'Languages', 'Headphones', 'Radio', 'Rss',
  'MessageSquare', 'Send', 'Share', 'FileText', 'Settings', 'Globe',
  'Search', 'Eye', 'Lock', 'Shield', 'RefreshCw', 'RotateCcw',
  'Home', 'Target', 'Crown', 'Dumbbell', 'Wrench', 'Briefcase',
  'Camera', 'Film', 'Music', 'Palette', 'ShoppingCart', 'Trash2',
  'Truck', 'Umbrella', 'Wifi', 'Wind', 'MapPin', 'Calendar',
  'Bell', 'Folder', 'Tool', 'ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown',
  'PlayCircle', 'StopCircle', 'Terminal', 'Thermometer', 'Printer', 'Scissors',
  'Volume1', 'VolumeX', 'BarChart', 'PanelLeft',
  'BookMarked', 'FileQuestion', 'Quote', 'Layers', 'Compass',
  'Navigation', 'Map', 'Globe2', 'Repeat', 'Shuffle',
];

let totalFixed = 0;

for (const dir of MODULE_DIRS) {
  let files;
  try {
    files = readdirSync(dir).filter(f => f.startsWith('Lesson') && f.endsWith('.tsx'));
  } catch {
    console.log(`⚠  Direktori tidak ditemukan: ${dir}`);
    continue;
  }

  console.log(`\n📁 ${dir.split('\\').slice(-2).join('/')}`);

  for (const file of files) {
    const filePath = join(dir, file);
    let content = readFileSync(filePath, 'utf-8');
    let changed = false;

    // Step 1: Hapus definisi komponen SVG lokal yang duplikat
    // Pattern: const XxxYyy = ({ className }: { className?: string }) => ( <svg ... );
    const localSvgRegex = /\/\/[^\n]*\n const ([A-Z][a-zA-Z]+) = \(\{ className \}: \{ className\?: string \}\) => \(\s*<svg[\s\S]*?<\/svg>\s*\);\n/g;
    const localSvgRegex2 = /const ([A-Z][a-zA-Z]+) = \(\{ className \}: \{ className\?: string \}\) => \(\s*<svg[\s\S]*?<\/svg>\s*\);\n/g;
    if (localSvgRegex.test(content) || localSvgRegex2.test(content)) {
      content = content.replace(localSvgRegex, '');
      content = content.replace(localSvgRegex2, '');
      changed = true;
    }

    // Step 2: Remap ikon salah ke nama benar di seluruh JSX dan teks
    for (const [wrong, correct] of Object.entries(ICON_REMAP)) {
      const jsxOpen = new RegExp(`<${wrong}(\\s|/)`, 'g');
      const jsxClose = new RegExp(`</${wrong}>`, 'g');
      const inText = new RegExp(`\\b${wrong}\\b`, 'g');
      if (jsxOpen.test(content) || jsxClose.test(content) || inText.test(content)) {
        content = content.replace(new RegExp(`<${wrong}(\\s|/)`, 'g'), `<${correct}$1`);
        content = content.replace(new RegExp(`</${wrong}>`, 'g'), `</${correct}>`);
        content = content.replace(new RegExp(`\\b${wrong}\\b`, 'g'), correct);
        changed = true;
      }
    }

    // Step 3: Tambahkan framer-motion jika belum ada tapi digunakan
    if (content.includes('<motion.') && !content.includes("from 'framer-motion'")) {
      const importBlock = content.match(/^(import .+;\n)+/m);
      const framerImport = `import { motion } from 'framer-motion';\n`;
      if (importBlock) {
        const pos = content.indexOf(importBlock[0]) + importBlock[0].length;
        content = content.slice(0, pos) + framerImport + content.slice(pos);
      } else {
        content = framerImport + content;
      }
      changed = true;
    }

    // Step 4: Rebuild lucide-react import
    const oldLucideImport = content.match(/^import \{[^}]+\} from 'lucide-react';\n/m);
    content = content.replace(/^import \{[^}]+\} from 'lucide-react';\n/m, '');

    const usedIcons = ALL_LUCIDE_ICONS.filter(icon => {
      const regex = new RegExp(`[<{\\s(]${icon}[\\s/>{}),]|<${icon}$`, 'm');
      return regex.test(content);
    });

    if (usedIcons.length > 0) {
      const newImport = `import { ${usedIcons.join(', ')} } from 'lucide-react';\n`;
      const hadOldImport = !!oldLucideImport;
      if (hadOldImport || changed) {
        const importBlock = content.match(/^(import .+;\n)+/m);
        if (importBlock) {
          const pos = content.indexOf(importBlock[0]) + importBlock[0].length;
          content = content.slice(0, pos) + newImport + content.slice(pos);
        } else {
          content = newImport + content;
        }
        changed = true;
      }
    }

    if (changed) {
      writeFileSync(filePath, content, 'utf-8');
      console.log(`  ✅ ${file} — fixed (icons: ${usedIcons.join(', ')})`);
      totalFixed++;
    } else {
      console.log(`  ⏭  ${file} — ok`);
    }
  }
}

console.log(`\n✨ Selesai. Total ${totalFixed} file diperbaiki.`);
