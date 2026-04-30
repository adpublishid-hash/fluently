const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src/pages/module/english/elementary/speaking');

for (let i = 1; i <= 15; i++) {
    const file = path.join(dir, `Lesson${i}.tsx`);
    if (!fs.existsSync(file)) continue;

    let content = fs.readFileSync(file, 'utf8');

    // Fix subtitle
    content = content.replace(/subtitle=\"Speaking [^a-zA-Z0-9] Pelajaran (\d+)\"/g, 'subtitle="Speaking • Pelajaran $1"');

    // Extract Interactive Practice Section
    const practiceStartTag = '{/* Interactive Practice Section */}';
    const tipsStartTag = '{/* Tips Section */}';
    
    const pStartIdx = content.indexOf(practiceStartTag);
    const tStartIdx = content.indexOf(tipsStartTag);

    if (pStartIdx !== -1 && tStartIdx !== -1 && pStartIdx < tStartIdx) {
        // Find the line that starts the practice section
        const actualStart = content.lastIndexOf('          {/*', pStartIdx);
        // Find the line that starts the tips section
        const actualEnd = content.lastIndexOf('          {/*', tStartIdx);

        if (actualStart !== -1 && actualEnd !== -1) {
            const practiceSection = content.slice(actualStart, actualEnd);

            // Remove practice section from 'learn' tab
            content = content.slice(0, actualStart) + content.slice(actualEnd);

            // Replace the fallback 'Latihan belum tersedia' with the extracted practice section wrapped in container
            const fallbackStr = ') : (<div className="p-8 text-center animate-fade-in"><p className="text-[var(--color-text-secondary)]">Latihan belum tersedia.</p></div>)}';
            const newPracticeStr = `) : tabId === 'practice' ? (
      <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth relative">
        <div className="p-4 md:p-8 space-y-8 pb-24 animate-fade-in">
${practiceSection}
        </div>
      </div>
    ) : null}`;

            content = content.replace(fallbackStr, newPracticeStr);
        }
    }

    fs.writeFileSync(file, content, 'utf8');
    console.log(`Fixed Lesson${i}.tsx`);
}
