/**
 * Fix all intermediate lesson files:
 * 1. Remove duplicate icon imports
 * 2. Fix broken JSX structure from migration
 * 3. Ensure proper closing tags
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const TARGET_BASE = join(ROOT, 'src', 'pages', 'module', 'english', 'intermediate');

const SUBMODULES = ['grammar', 'speaking', 'vocabulary', 'pronunciation'];

const ACCENT_COLORS = {
  grammar:       '#8E44AD',
  speaking:      '#E74C3C',
  vocabulary:    '#2980B9',
  pronunciation: '#16A085',
};

const SUB_LABELS = {
  grammar:       'Grammar',
  speaking:      'Speaking',
  vocabulary:    'Vocabulary',
  pronunciation: 'Pronunciation',
};

// All valid lucide-react icons we might use
const ALL_LUCIDE = [
  'BookOpen','PenTool','CheckCircle2','XCircle','Volume2','Lightbulb','Info',
  'Clock','User','Smile','ClipboardList','Sun','Plane','TrendingUp','Heart',
  'Flame','Trophy','Star','Smartphone','Gift','Zap','ArrowLeftRight','CloudRain',
  'ChevronRight','ChevronLeft','ChevronDown','ChevronUp','MoreHorizontal',
  'Play','Pause','Check','MessageCircle','Mic','Pencil','Edit','Award',
  'AlertCircle','Sparkles','Hash','ThumbsUp','Bookmark','Flag','Tag',
  'GraduationCap','Languages','Headphones','MessageSquare','Send','Share',
  'FileText','Settings','Globe','Search','Eye','Lock','Shield','RefreshCw',
  'RotateCcw','Home','Target','Crown','Briefcase','Camera','Film','Music',
  'ShoppingCart','Trash2','Truck','Umbrella','Wifi','Wind','MapPin',
  'Calendar','Bell','ArrowRight','ArrowLeft','PlayCircle','History','Repeat',
];

function fixFile(filePath, submodule, lessonNum) {
  let content = readFileSync(filePath, 'utf-8');

  // ── Fix duplicate imports in lucide-react line ─────────────────────────────
  // Find the lucide-react import line and deduplicate
  const lucideMatch = content.match(/^import \{([^}]+)\} from 'lucide-react';$/m);
  if (lucideMatch) {
    const iconList = lucideMatch[1]
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);
    const uniqueIcons = [...new Set(iconList)];
    const newImport = `import { ${uniqueIcons.join(', ')} } from 'lucide-react';`;
    content = content.replace(lucideMatch[0], newImport);
  }

  // Also remove any secondary lucide-react import lines (duplicated whole line)
  const lucideLines = [...content.matchAll(/^import \{[^}]+\} from 'lucide-react';$/gm)];
  if (lucideLines.length > 1) {
    // Keep first, remove rest
    for (let i = 1; i < lucideLines.length; i++) {
      content = content.replace(lucideLines[i][0] + '\n', '');
    }
  }

  // ── Completely rebuild the return statement with clean structure ───────────
  // Strategy: extract data sections and rebuild cleanly
  
  const accent = ACCENT_COLORS[submodule];
  const label = SUB_LABELS[submodule];
  const compMatch = content.match(/const (Inter[A-Za-z]+Lesson\d+): React\.FC/);
  const compName = compMatch ? compMatch[1] : `Inter${label}Lesson${lessonNum}`;

  // Find the return statement and extract tab content
  // Look for the LessonShell return
  const returnIdx = content.indexOf('  return (');
  if (returnIdx === -1) return { content, changed: false };

  const beforeReturn = content.substring(0, returnIdx);
  
  // Extract learn content: everything between tabId === 'learn' and the ): part
  let learnContent = '';
  let practiceContent = '';

  // Try to extract from existing structure
  const learnMatch = content.match(/tabId === 'learn' \? \(\s*<div[^>]*>\s*<div[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*\) : \(/);
  if (learnMatch) {
    learnContent = learnMatch[1].trim();
  }

  const practiceMatch = content.match(/\) : \(\s*<div[^>]*>([\s\S]*?)<\/div>\s*\)\}/);
  if (practiceMatch) {
    practiceContent = practiceMatch[1].trim();
  }

  // If extraction failed, use simpler approach — grab everything inside content areas
  if (!learnContent) {
    // Find content between the tabs
    const innerMatch = content.match(/tabId === 'learn' \? \(([\s\S]*?)\) : \(([\s\S]*?)\)\}/);
    if (innerMatch) {
      learnContent = innerMatch[1].trim();
      practiceContent = innerMatch[2].trim();
    }
  }

  // Detect used icons from the full file
  const usedIcons = ALL_LUCIDE.filter(icon => {
    const r = new RegExp(`[<{\\s(,]${icon}[\\s/>{}),]|<${icon}$`, 'm');
    return r.test(content);
  });

  // Rebuild clean import
  const newImports = [
    `import React, { useState } from 'react';`,
    `import LessonShell, { sectionVariants } from '../../../../../components/shared/LessonShell';`,
    usedIcons.length > 0 ? `import { ${[...new Set(usedIcons)].join(', ')} } from 'lucide-react';` : null,
  ].filter(Boolean).join('\n');

  // Strip all import lines from beforeReturn
  const noImportBefore = beforeReturn
    .replace(/^import .+;\n/gm, '')
    .replace(/^\n+/, '');

  // Build the final file
  const newReturn = `
  return (
    <LessonShell
      title="${label} Pelajaran ${lessonNum}"
      subtitle="${label} • Pelajaran ${lessonNum}"
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
            ${learnContent || '<p className="text-slate-500">Konten tersedia.</p>'}
          </div>
        </div>
      ) : (
        <div className="animate-fade-in">
          <div className="max-w-xl mx-auto">
            ${practiceContent || '<p className="text-center text-slate-500 py-8">Latihan belum tersedia.</p>'}
          </div>
        </div>
      )}
    </LessonShell>
  );
};

export default ${compName};
`;

  const finalContent = newImports + '\n\n' + noImportBefore + newReturn;
  return { content: finalContent, changed: true };
}

let fixed = 0;
let skipped = 0;

for (const sub of SUBMODULES) {
  const dir = join(TARGET_BASE, sub);
  console.log(`\n📂 ${sub}`);

  for (let n = 1; n <= 20; n++) {
    const fp = join(dir, `Lesson${n}.tsx`);
    if (!existsSync(fp)) { console.log(`  ⚠ Lesson${n} not found`); continue; }

    try {
      const result = fixFile(fp, sub, n);
      writeFileSync(fp, result.content, 'utf-8');
      console.log(`  ✅ Lesson${n}.tsx`);
      fixed++;
    } catch (e) {
      console.error(`  ❌ Lesson${n}.tsx: ${e.message}`);
      skipped++;
    }
  }
}

console.log(`\n✨ Done. Fixed: ${fixed}, Skipped: ${skipped}`);
