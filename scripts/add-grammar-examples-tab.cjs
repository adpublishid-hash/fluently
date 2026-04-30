const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src/pages/module/english/elementary/grammar');

for (let i = 1; i <= 20; i++) {
    const file = path.join(dir, `Lesson${i}.tsx`);
    if (!fs.existsSync(file)) continue;

    let content = fs.readFileSync(file, 'utf8');

    if (content.includes("tabId === 'examples'")) continue;

    // 1. Update imports
    if (!content.includes('Volume2')) {
        content = content.replace(/import {([^}]+)} from 'lucide-react';/, "import { $1, Volume2 } from 'lucide-react';");
    }

    // 2. Update tabs
    content = content.replace(
      "tabs={[{ id: 'learn', label: 'Pelajari', icon: <BookOpen size={14} /> }, { id: 'practice', label: 'Latihan', icon: <PenTool size={14} /> }]}",
      "tabs={[{ id: 'learn', label: 'Pelajari', icon: <BookOpen size={14} /> }, { id: 'examples', label: 'Contoh', icon: <Volume2 size={14} /> }, { id: 'practice', label: 'Latihan', icon: <PenTool size={14} /> }]}"
    );
     content = content.replace(
      "tabs={[\n        { id: 'learn', label: 'Pelajari', icon: <BookOpen size={14} /> },\n        { id: 'practice', label: 'Latihan', icon: <PenTool size={14} /> }\n      ]}",
      "tabs={[{ id: 'learn', label: 'Pelajari', icon: <BookOpen size={14} /> }, { id: 'examples', label: 'Contoh', icon: <Volume2 size={14} /> }, { id: 'practice', label: 'Latihan', icon: <PenTool size={14} /> }]}"
    );

    // 3. Extract logic
    const parts = content.split(') : (');
    if (parts.length < 2) continue;
    
    let learnContent = parts[0];
    const marker = '<div className="max-w-xl mx-auto">';
    const startIdx = learnContent.indexOf(marker);
    
    let extracted = `<div className="flex flex-col items-center justify-center p-8 text-center animate-fade-in"><BookOpen className="w-16 h-16 text-slate-200 mb-4 mx-auto" /><p className="text-[var(--color-text-secondary)] font-medium">Contoh belum tersedia.</p></div>`;
    
    if (startIdx !== -1 && (learnContent.includes('Contoh') || learnContent.includes('MIXED_EXAMPLES') || learnContent.includes('Kalimat'))) {
        const endTrim = learnContent.lastIndexOf('</div>');
        if (endTrim !== -1 && endTrim > startIdx) {
            const exactlyExamples = learnContent.substring(startIdx, endTrim);
            extracted = `<div className="space-y-8 w-full max-w-2xl mx-auto">\n${exactlyExamples}\n</div>`;
            learnContent = learnContent.substring(0, startIdx) + "\n        </div>";
        }
    }

    const newMiddle = `\n      ) : tabId === 'examples' ? (\n        <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth relative">\n          <div className="p-4 md:p-8 space-y-8 pb-24 animate-fade-in">\n            ${extracted}\n          </div>\n        </div>\n      ) : tabId === 'practice' ? (`;
    
    content = learnContent + newMiddle + parts[1];
    content = content.replace(/(\)\} | \))<\/LessonShell>/g, ') : null}</LessonShell>');
    content = content.replace(/ \)\}<\/LessonShell>/g, ' : null}</LessonShell>');
    content = content.replace(/\)\s*\}<\/(?:shared\/)?LessonShell>/g, ') : null}</LessonShell>');
    
    fs.writeFileSync(file, content, 'utf8');
    console.log('Processed Lesson' + i);
}
