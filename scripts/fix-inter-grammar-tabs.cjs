const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src/pages/module/english/intermediate/grammar');

let processed = 0;

for (let i = 1; i <= 20; i++) {
    const file = path.join(dir, `Lesson${i}.tsx`);
    if (!fs.existsSync(file)) {
        console.log(`Skipping Lesson${i}.tsx - not found`);
        continue;
    }

    let content = fs.readFileSync(file, 'utf8');

    // Skip if already has examples tab and 3 tabs logic
    if (content.includes("tabId === 'examples'") || content.includes("id: 'examples', label: 'Contoh'")) {
        console.log(`Skipping Lesson${i}.tsx - already has example tab`);
        continue;
    }

    // 1. Update imports
    if (!content.includes('Volume2')) {
        content = content.replace(/import {([^}]+)} from 'lucide-react';/, "import { $1, Volume2 } from 'lucide-react';");
    }

    // 2. Update tabs definitions exactly like elementary
    // We want: Materi (id: learn), Contoh (id: examples), Latihan (id: practice)
    content = content.replace(
      "tabs={[{ id: 'learn', label: 'Pelajari', icon: <BookOpen size={14} /> }, { id: 'practice', label: 'Latihan', icon: <PenTool size={14} /> }]}",
      "tabs={[{ id: 'learn', label: 'Materi', icon: <BookOpen size={14} /> }, { id: 'examples', label: 'Contoh', icon: <Volume2 size={14} /> }, { id: 'practice', label: 'Latihan', icon: <PenTool size={14} /> }]}"
    );
     content = content.replace(
      "tabs={[\n        { id: 'learn', label: 'Pelajari', icon: <BookOpen size={14} /> },\n        { id: 'practice', label: 'Latihan', icon: <PenTool size={14} /> }\n      ]}",
      "tabs={[{ id: 'learn', label: 'Materi', icon: <BookOpen size={14} /> }, { id: 'examples', label: 'Contoh', icon: <Volume2 size={14} /> }, { id: 'practice', label: 'Latihan', icon: <PenTool size={14} /> }]}"
    );
    // Add replace for label "Pelajari" -> "Materi" if it wasn't caught
    content = content.replace(/label: 'Pelajari'/g, "label: 'Materi'");
    
    // 3. Extract logic
    const parts = content.split(') : (');
    if (parts.length < 2) {
        console.log(`Cannot parse ternary tabs in Lesson${i}.tsx`);
        continue;
    }
    
    let learnContent = parts[0];
    
    // Identify the block containing Examples
    // In Lesson1, it starts with: <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
    // Usually it has <h3>...Contoh Kalimat</h3>
    // We try to find the last grid or div that looks like examples.
    const markerTitle = 'Contoh Kalimat';
    let extracted = `<div className="flex flex-col items-center justify-center p-8 text-center animate-fade-in"><BookOpen className="w-16 h-16 text-slate-200 mb-4 mx-auto" /><p className="text-[var(--color-text-secondary)] font-medium">Contoh kalimat belum tersedia.</p></div>`;
    
    // Look for <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"> ... containing "Contoh Kalimat"
    const exampleBlockRegex = /<div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">[\s\S]*?(Contoh Kalimat|Examples)[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*$/;
    
    const match = learnContent.match(exampleBlockRegex);
    if (match) {
        let blockStr = match[0];
        // However, extracting via regex might be tricky if there's nested divs.
        // Let's use simple string finding backwards from the end of the learn tab.
        // The learn tab ends with </div> </div>
        let lastDivs = learnContent.slice(-40);
        if (lastDivs.includes('</div>')) {
            // we search for the start of the last big block
            let searchStart = '<div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">';
            let alternativeStart = '<div className="bg-white rounded-2xl border p-5 shadow-sm overflow-hidden">'; // if different
            let idxStart = learnContent.lastIndexOf(searchStart);
            if (idxStart === -1) idxStart = learnContent.lastIndexOf(alternativeStart);
            
            if (idxStart !== -1 && idxStart > learnContent.length / 2) { // must be secondary half
                 let toExtract = learnContent.substring(idxStart);
                 // remove trailing closing tags of the parent container
                 toExtract = toExtract.replace(/<\/div>\s*<\/div>\s*$/, '');
                 extracted = `<div className="space-y-8 w-full max-w-2xl mx-auto">\n            ${toExtract}\n          </div>`;
                 // remove from learn content
                 learnContent = learnContent.substring(0, idxStart) + "          </div>\n        </div>";
            }
        }
    } else {
        // Fallback for extraction: look for `<div className="max-w-xl mx-auto">` if it was like elementary
        let marker = '<div className="max-w-xl mx-auto">';
        let startIdx = learnContent.lastIndexOf(marker);
        if (startIdx !== -1 && startIdx > learnContent.length / 2) { // Only if it's the second part
            let endTrim = learnContent.lastIndexOf('</div>');
            if (endTrim !== -1 && endTrim > startIdx) {
                let toExtract = learnContent.substring(startIdx, endTrim);
                extracted = `<div className="space-y-8 w-full max-w-2xl mx-auto">\n${toExtract}\n</div>`;
                learnContent = learnContent.substring(0, startIdx) + "\n        </div>\n        </div>";
            }
        }
    }

    const newMiddle = `\n      ) : tabId === 'examples' ? (\n        <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth relative">\n          <div className="p-4 md:p-8 space-y-8 pb-24 animate-fade-in">\n            ${extracted}\n          </div>\n        </div>\n      ) : tabId === 'practice' ? (`;
    
    content = learnContent + newMiddle + parts.slice(1).join(') : (');
    
    // Fix the ending ternary logic
    content = content.replace(/(\)\} | \))<\/LessonShell>/g, ') : null}</LessonShell>');
    content = content.replace(/ \)\}<\/LessonShell>/g, ' : null}</LessonShell>');
    content = content.replace(/\)\s*\}<\/(?:shared\/)?LessonShell>/g, ') : null}</LessonShell>');
    content = content.replace(/\)\s*\}<\/LessonShell>/g, ') : null}</LessonShell>');
    
    fs.writeFileSync(file, content, 'utf8');
    processed++;
    console.log(`Processed Lesson${i}.tsx successfully.`);
}

console.log(`Finished processing ${processed} files.`);
