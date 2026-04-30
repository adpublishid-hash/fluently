/**
 * Migration script: AI-kamus intermediate → Talky LessonShell
 * 
 * Converts legacy AI-kamus lesson format to Talky's LessonShell component system.
 * Handles all 4 submodules: grammar, speaking, vocabulary, pronunciation
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const SOURCE_BASE = 'D:\\aikamus-master\\pages\\module\\english\\intermediate';
const TARGET_BASE = join(ROOT, 'src', 'pages', 'module', 'english', 'intermediate');

// Accent colors per submodule
const ACCENT_COLORS = {
  grammar:      '#8E44AD', // purple
  speaking:     '#E74C3C', // red
  vocabulary:   '#2980B9', // blue
  pronunciation:'#16A085', // teal
};

// Icon remap: old AI-kamus Icons -> lucide-react
const ICON_REMAP = {
  'ChevronLeftIcon': 'ChevronLeft',
  'MoreIcon':        'MoreHorizontal',
  'InfoIcon':        'Info',
  'CheckCircleIcon': 'CheckCircle2',
  'XCircleIcon':     'XCircle',
  'LightBulbIcon':   'Lightbulb',
  'SparklesIcon':    'Sparkles',
  'StarIcon':        'Star',
  'TrophyIcon':      'Trophy',
  'TrendUpIcon':     'TrendingUp',
  'FlameIcon':       'Flame',
  'VolumeIcon':      'Volume2',
  'BookIcon':        'BookOpen',
  'RefreshIcon':     'RefreshCw',
  'HistoryIcon':     'History',
  'ClockIcon':       'Clock',
  'UserIcon':        'User',
  'SmileIcon':       'Smile',
  'ClipboardIcon':   'ClipboardList',
  'SunIcon':         'Sun',
  'PlaneIcon':       'Plane',
  'HeartIcon':       'Heart',
  'SmartphoneIcon':  'Smartphone',
  'GiftIcon':        'Gift',
  'ZapIcon':         'Zap',
  'HomeIcon':        'Home',
  'PencilIcon':      'Pencil',
  'MicIcon':         'Mic',
  'GlobalIcon':      'Globe',
  'MessageIcon':     'MessageCircle',
  'ChatIcon':        'MessageSquare',
  'TargetIcon':      'Target',
  'AwardIcon':       'Award',
  'BookmarkIcon':    'Bookmark',
  'GraduationIcon':  'GraduationCap',
  'LanguageIcon':    'Languages',
  'EditIcon':        'Edit',
};

// All valid lucide-react icons
const ALL_LUCIDE = [
  'BookOpen','PenTool','CheckCircle2','XCircle','Volume2','Lightbulb','Info',
  'Clock','User','Smile','ClipboardList','Sun','Plane','TrendingUp','Heart',
  'Flame','Trophy','Star','Smartphone','Gift','Zap','ArrowLeftRight','CloudRain',
  'ChevronRight','ChevronLeft','ChevronDown','ChevronUp','MoreHorizontal',
  'Play','Pause','Check','MessageCircle','Mic','Volume','BookOpen','Book',
  'Pencil','Edit','Award','AlertCircle','AlertTriangle','HelpCircle','Sparkles',
  'Hash','BarChart2','ThumbsUp','Bookmark','Flag','Tag','GraduationCap',
  'Languages','Headphones','Radio','MessageSquare','Send','Share','FileText',
  'Settings','Globe','Search','Eye','Lock','Shield','RefreshCw','RotateCcw',
  'Home','Target','Crown','Briefcase','Camera','Film','Music','ShoppingCart',
  'Trash2','Truck','Umbrella','Wifi','Wind','MapPin','Calendar','Bell',
  'Folder','ArrowRight','ArrowLeft','PlayCircle','History','Repeat',
];

const SUBMODULES = ['grammar', 'speaking', 'vocabulary', 'pronunciation'];

let totalMigrated = 0;
let totalFailed = 0;

function detectUsedIcons(content) {
  return ALL_LUCIDE.filter(icon => {
    const r = new RegExp(`[<{\\s(]${icon}[\\s/>{}),]|<${icon}$`, 'm');
    return r.test(content);
  });
}

function remapIcons(content) {
  for (const [old, neo] of Object.entries(ICON_REMAP)) {
    content = content.replace(new RegExp(`<${old}(\\s|/)`, 'g'), `<${neo}$1`);
    content = content.replace(new RegExp(`</${old}>`, 'g'), `</${neo}>`);
    content = content.replace(new RegExp(`\\b${old}\\b`, 'g'), neo);
  }
  return content;
}

function transformLesson(raw, submodule, lessonNum) {
  const accent = ACCENT_COLORS[submodule];
  const subLabel = {
    grammar:      'Grammar',
    speaking:     'Speaking',
    vocabulary:   'Vocabulary',
    pronunciation:'Pronunciation',
  }[submodule];

  // Strip carriage returns (Windows CRLF → LF)
  let content = raw.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  // ── 1. Remove old imports ──────────────────────────────────────────────────
  content = content.replace(/^import \{ ViewState \}.*;\n/m, '');
  content = content.replace(/^import \{[\s\S]*?\} from ['"].*\/Icons['"];\n/m, '');
  content = content.replace(/^import \{[\s\S]*?\} from ['"].*Icons['"];\n/m, '');
  content = content.replace(/^interface LessonProps \{[\s\S]*?\}\n/m, '');

  // ── 2. Remap icon names ────────────────────────────────────────────────────
  content = remapIcons(content);

  // ── 3. Fix size={2000} / size={2400} ──────────────────────────────────────
  content = content.replace(/size=\{[12][0-9]{3}\}/g, 'size={20}');

  // ── 4. Remove local SVG component definitions ──────────────────────────────
  content = content.replace(/\/\/[^\n]*\nconst [A-Z][a-zA-Z]+ = \(\{ className \}: \{ className\?: string \}\) => \(\s*<svg[\s\S]*?<\/svg>\s*\);\n/g, '');
  content = content.replace(/const [A-Z][a-zA-Z]+ = \(\{ className \}: \{ className\?: string \}\) => \(\s*<svg[\s\S]*?<\/svg>\s*\);\n/g, '');

  // ── 5. Replace component signature ────────────────────────────────────────
  // Old: const InterXxxLessonN: React.FC<LessonProps> = ({ onNavigate, userParams }) =>
  // New: const InterXxxLessonN: React.FC = () =>
  content = content.replace(
    /const (Inter[A-Za-z]+Lesson\d+): React\.FC<LessonProps> = \(\{[^}]*\}\) =>/,
    'const $1: React.FC = () =>'
  );
  // Also handle if already without LessonProps
  content = content.replace(
    /const (Inter[A-Za-z]+Lesson\d+): React\.FC<\{[^}]*\}> = \(\{[^}]*\}\) =>/,
    'const $1: React.FC = () =>'
  );

  // ── 6. Replace entire legacy shell with LessonShell ───────────────────────
  // The old structure is: <div className="flex flex-col h-[100dvh]..."> ... </div>
  // We need to wrap content inside LessonShell tabs

  // Find the content inside the tabs
  // Strategy: replace header + tab bar + wrapper with LessonShell
  
  // Remove old header section
  content = content.replace(
    /\n\s*\{\/\* Header \*\/\}\n\s*<header[\s\S]*?<\/header>\n/,
    '\n'
  );
  
  // Remove old tab bar section
  content = content.replace(
    /\n\s*\{\/\* Tabs \*\/\}\n\s*<div className="flex bg-white border-b[\s\S]*?<\/div>\n/,
    '\n'
  );

  // ── 7. Replace outer div wrapper ─────────────────────────────────────────
  // Old: return ( <div className="flex flex-col h-[100dvh] ...">
  //                 {/* Content */}
  //                 <div className="flex-1 overflow-y-auto...">
  //                   <div className="p-4 ... pb-24 animate-fade-in">
  //                     {activeTab === 'concepts' && (...)}
  //                     {activeTab === 'examples' && (...)}
  //                     {activeTab === 'quiz' && (...)}
  //                   </div>
  //                 </div>
  //               </div> )

  // We'll detect known tab names and remap them to learn/practice
  // Tab: 'concepts' or 'content' or 'learn' → 'learn'
  // Tab: 'examples' → we keep inside 'learn'
  // Tab: 'quiz' or 'practice' → 'practice'

  // Replace activeTab state and setActiveTab patterns
  // Old tabs: 'concepts', 'examples', 'quiz' → new: just use LessonShell's tabId
  content = content.replace(
    /const \[activeTab, setActiveTab\] = useState<'[a-z]+'[^>]*>\('[a-z]+'\);/,
    ''
  );

  // Replace the entire return statement structure
  // Find "return (" then the outer div
  const returnStart = content.indexOf('  return (');
  if (returnStart !== -1) {
    const beforeReturn = content.substring(0, returnStart);
    let afterReturn = content.substring(returnStart);

    // Build the new LessonShell wrapper
    // We need to detect the title from the old header h1 tag
    const titleMatch = afterReturn.match(/<h1[^>]*>([^<]+)<\/h1>/);
    const subtitleMatch = afterReturn.match(/<p[^>]*>([^<]*Pelajaran \d+[^<]*)<\/p>/);
    const title = titleMatch ? titleMatch[1].trim() : `${subLabel} Pelajaran ${lessonNum}`;
    const subtitle = `${subLabel} • Pelajaran ${lessonNum}`;

    // Extract the tab contents
    // Looking for patterns: {activeTab === 'concepts' && (...)}
    const conceptsMatch = afterReturn.match(/\{activeTab === 'concepts' && \(\n([\s\S]*?)\n\s*\)\}/);
    const examplesMatch = afterReturn.match(/\{activeTab === 'examples' && \(\n([\s\S]*?)\n\s*\)\}/);
    const quizMatch = afterReturn.match(/\{activeTab === 'quiz' && \(\n([\s\S]*?)\n\s*\)\}/);

    // Also try alternate tab names
    const learnMatch = afterReturn.match(/\{activeTab === 'learn' && \(\n([\s\S]*?)\n\s*\)\}/);
    const practiceMatch = afterReturn.match(/\{activeTab === 'practice' && \(\n([\s\S]*?)\n\s*\)\}/);
    const contentMatch = afterReturn.match(/\{activeTab === 'content' && \(\n([\s\S]*?)\n\s*\)\}/);

    if (conceptsMatch || learnMatch || contentMatch || quizMatch || practiceMatch) {
      // Build learn content (concepts + examples)
      let learnContent = '';
      if (conceptsMatch) learnContent += conceptsMatch[1];
      else if (learnMatch) learnContent = learnMatch[1];
      else if (contentMatch) learnContent = contentMatch[1];

      if (examplesMatch && !learnContent.includes(examplesMatch[1].substring(0, 50))) {
        learnContent += '\n' + examplesMatch[1];
      }

      // Build practice content
      let practiceContent = '';
      if (quizMatch) practiceContent = quizMatch[1];
      else if (practiceMatch) practiceContent = practiceMatch[1];
      else practiceContent = `<div className="p-8 text-center"><p className="text-[var(--color-text-secondary)]">Latihan belum tersedia.</p></div>`;

      afterReturn = `
  return (
    <LessonShell
      title="${title}"
      subtitle="${subtitle}"
      accentColor="${accent}"
      tabs={[{ id: 'learn', label: 'Pelajari', icon: <BookOpen size={14} /> }, { id: 'practice', label: 'Latihan', icon: <PenTool size={14} /> }]}
      footer={() => (
        <button
          onClick={() => window.history.back()}
          className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg transition-all hover:opacity-90 active:scale-[0.98]"
          style={{ background: 'linear-gradient(135deg, ${accent}, ${accent}cc)' }}
        >
          <CheckCircle2 size={18} />
          Selesai
        </button>
      )}
    >
      {(tabId) => tabId === 'learn' ? (
        <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth relative">
          <div className="p-4 md:p-8 space-y-8 pb-24 animate-fade-in">
${learnContent}
          </div>
        </div>
      ) : (
        <div className="animate-fade-in">
          <div className="max-w-xl mx-auto">
${practiceContent}
          </div>
        </div>
      )}
    </LessonShell>
  );
};

export default ${content.match(/const (Inter[A-Za-z]+Lesson\d+)/)?.[1] || `Inter${subLabel.replace(' ', '')}Lesson${lessonNum}`};
`;
      content = beforeReturn + afterReturn;
    } else {
      // Fallback: just wrap everything as-is in LessonShell learn tab
      content = beforeReturn + `
  return (
    <LessonShell
      title="${title}"
      subtitle="${subtitle}"
      accentColor="${accent}"
      tabs={[{ id: 'learn', label: 'Pelajari', icon: <BookOpen size={14} /> }, { id: 'practice', label: 'Latihan', icon: <PenTool size={14} /> }]}
      footer={() => (
        <button
          onClick={() => window.history.back()}
          className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg transition-all hover:opacity-90 active:scale-[0.98]"
          style={{ background: 'linear-gradient(135deg, ${accent}, ${accent}cc)' }}
        >
          <CheckCircle2 size={18} />
          Selesai
        </button>
      )}
    >
      {(tabId) => tabId === 'learn' ? (
        <div className="p-4 md:p-8 space-y-8 pb-24 animate-fade-in">
          <p className="text-[var(--color-text-secondary)]">Konten tersedia.</p>
        </div>
      ) : (
        <div className="p-8 text-center">
          <p className="text-[var(--color-text-secondary)]">Latihan belum tersedia.</p>
        </div>
      )}
    </LessonShell>
  );
};

export default Inter${subLabel.replace(' ', '')}Lesson${lessonNum};
`;
    }
  }

  // Remove duplicate/stray export default lines (keep only the last)
  const exportLines = [...content.matchAll(/^export default .+;$/gm)];
  if (exportLines.length > 1) {
    // Remove all but last
    for (let i = 0; i < exportLines.length - 1; i++) {
      content = content.replace(exportLines[i][0] + '\n', '');
    }
  }

  // ── 8. Build import block ──────────────────────────────────────────────────
  // Remove any existing lucide-react imports (will rebuild)
  content = content.replace(/^import \{[^}]+\} from 'lucide-react';\n/gm, '');
  // Remove framer-motion duplicates
  content = content.replace(/^import \{ motion \} from 'framer-motion';\n/gm, '');
  // Remove LessonShell duplicates
  content = content.replace(/^import LessonShell.* from '.*LessonShell';\n/gm, '');
  // Remove useNavigate if not needed (we use window.history.back())
  content = content.replace(/^import \{ useNavigate \} from 'react-router-dom';\n/gm, '');

  // Detect icons
  const icons = detectUsedIcons(content);
  const needsMotion = content.includes('<motion.');

  // Build new import block
  const imports = [
    `import React, { useState } from 'react';`,
    needsMotion ? `import { motion } from 'framer-motion';` : null,
    `import LessonShell, { sectionVariants } from '../../../../../components/shared/LessonShell';`,
    icons.length > 0 ? `import { ${icons.join(', ')} } from 'lucide-react';` : null,
  ].filter(Boolean).join('\n');

  // Remove old React import
  content = content.replace(/^import React, \{ useState \} from 'react';\n/gm, '');
  content = content.replace(/^import React from 'react';\n/gm, '');
  content = content.replace(/^\n+/, ''); // trim leading newlines

  content = imports + '\n\n' + content;

  return content;
}

// ── Main ──────────────────────────────────────────────────────────────────────
console.log('🚀 Starting intermediate module migration...\n');

for (const sub of SUBMODULES) {
  const sourceDir = join(SOURCE_BASE, sub);
  const targetDir = join(TARGET_BASE, sub);

  // Create target dir
  if (!existsSync(targetDir)) {
    mkdirSync(targetDir, { recursive: true });
    console.log(`📁 Created: src/.../intermediate/${sub}`);
  }

  console.log(`\n📂 Migrating: ${sub}`);

  for (let n = 1; n <= 20; n++) {
    const srcFile = join(sourceDir, `Lesson${n}.tsx`);
    const dstFile = join(targetDir, `Lesson${n}.tsx`);

    if (!existsSync(srcFile)) {
      console.log(`  ⚠  Lesson${n}.tsx — not found, skipping`);
      continue;
    }

    try {
      const raw = readFileSync(srcFile, 'utf-8');
      const transformed = transformLesson(raw, sub, n);
      writeFileSync(dstFile, transformed, 'utf-8');
      console.log(`  ✅ Lesson${n}.tsx`);
      totalMigrated++;
    } catch (err) {
      console.error(`  ❌ Lesson${n}.tsx — ERROR: ${err.message}`);
      totalFailed++;
    }
  }
}

console.log(`\n✨ Done! Migrated: ${totalMigrated}, Failed: ${totalFailed}`);
console.log(`📍 Output: src/pages/module/english/intermediate/`);
