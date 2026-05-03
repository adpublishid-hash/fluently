const fs = require('fs');
const path = require('path');

const dir = 'd:/talky-main/talky-main/src/pages/module/english/beginner/vocabulary';

for (let i = 1; i <= 11; i++) {
   const file = `Lesson${i}.tsx`;
   const filePath = path.join(dir, file);
   if (!fs.existsSync(filePath)) continue;
   let content = fs.readFileSync(filePath, 'utf8');

   // Replace Lightbulb size
   content = content.replace(/<Lightbulb size=\{1200\}.*?\/>/g, '<Lightbulb size={24} className="text-yellow-300" />');

   // Ensure CheckCircle2 is imported if we use it in footer
   if (!content.includes('CheckCircle2')) {
       content = content.replace(/import {([^}]+)} from 'lucide-react';/, "import { CheckCircle2, $1 } from 'lucide-react';");
   }

   const accentMatch = content.match(/accentColor="([^"]+)"/);
   const color = accentMatch ? accentMatch[1] : '#3498DB';

   // Add CheckCircle2 import if it doesn't exist
   const footerCode = `
            ].filter(Boolean)}
            footer={() => (
                <button
                    onClick={() => window.history.back()}
                    className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg transition-all hover:opacity-90 active:scale-[0.98]"
                    style={{ background: \`linear-gradient(135deg, \${'${color}'}, \${'${color}'}cc)\` }}
                >
                    <CheckCircle2 size={18} />
                    Selesai
                </button>
            )}
        >`;

   // Only add if not already present
   if (!content.includes('footer={() => (')) {
       content = content.replace(/\s*\]\.filter\(Boolean\)}\s*>/, footerCode + '\n        >');
   }

   fs.writeFileSync(filePath, content);
   console.log('Fixed', file);
}
console.log('Done!');
