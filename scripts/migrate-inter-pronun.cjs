const fs = require('fs');
const path = require('path');

const SOURCE_DIR = path.join('d:', 'aikamus-master', 'pages', 'module', 'english', 'intermediate', 'pronunciation');
const TARGET_DIR = path.join(__dirname, '..', 'src', 'pages', 'module', 'english', 'intermediate', 'pronunciation');

// Ensure target directory exists
if (!fs.existsSync(TARGET_DIR)) {
    fs.mkdirSync(TARGET_DIR, { recursive: true });
}

function processLesson(lessonNumber) {
    const sourceFilePath = path.join(SOURCE_DIR, `Lesson${lessonNumber}.tsx`);
    const targetFilePath = path.join(TARGET_DIR, `Lesson${lessonNumber}.tsx`);

    if (!fs.existsSync(sourceFilePath)) {
        console.warn(`File not found: ${sourceFilePath}`);
        return false;
    }

    let code = fs.readFileSync(sourceFilePath, 'utf8');

    // --- 1. Replace Imports ---
    // Remove the old ViewState and Icons imports:
    code = code.replace(/import\s*\{\s*ViewState\s*\}\s*from\s*'[^']+';/g, '');
    code = code.replace(/import\s*\{[^}]+\}\s*from\s*'[^']*components\/Icons';/g, '');

    // Inject Talky standard imports
    const standardImports = `import { useNavigate } from 'react-router-dom';
import LessonShell from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Trophy, Lightbulb, Sparkles, Star, Volume2, Target, TrendingUp, BarChart, Zap } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';
`;
    // Find the first `import React` to inject after
    code = code.replace(/(import React[^;]+;)/, `$1\n${standardImports}`);


    // --- 2. Remove LessonProps interface ---
    const interfaceStr = `interface LessonProps {
  apiKey: string;
  onNavigate: (view: ViewState) => void;
  userParams: { name: string; isLifetime: boolean };
}`;
    code = code.replace(interfaceStr, '');


    // --- 3. Update Component Signature ---
    code = code.replace(
        new RegExp(`const\\s+InterPronunLesson${lessonNumber}\\s*:\\s*React\\.FC(?:<[^>]+>)?\\s*=\\s*\\([^)]*\\)\\s*=>\\s*\\{`),
        `const InterPronunLesson${lessonNumber}: React.FC = () => {\n    const navigate = useNavigate();\n    const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('intermediate_pronunciation', ${lessonNumber});\n    const nextLessonPath = ${lessonNumber} < 20 ? \`/modul/english/intermediate/pronunciation/lesson-\${${lessonNumber} + 1}\` : '/modul/english/intermediate';\n`
    );

    // Patch the audio handler to use playAudio instead of the inline window.speechSynthesis
    code = code.replace(/const\s+playSound\s*=\s*\([^{]+?\{[\s\S]*?\};/m, `const playSound = (text: string) => { playAudio(text, 0.9); };`);

    // Add alert fallback removal
    code = code.replace(/alert\([^)]+\);/g, ''); // Remove window.alerts
    code = code.replace(/onNavigate\([^)]+\)/g, 'navigate(-1)'); // remove missing onNavigate

    // --- 4. Extract Tabs ---
    const tabsRegex = /<div className="flex bg-white[^>]+>([\s\S]*?)<\/div>\s*\{\/\* Content \*\/\}/m;
    let tabsMatch = code.match(tabsRegex);
    if (!tabsMatch) {
        // Alternative match looking for the start of the content div
        const tabsRegexAlt = /<div className="flex bg-white[^>]+>([\s\S]*?)<\/div>\s*<div className="flex-1 overflow-y-auto/m;
        tabsMatch = code.match(tabsRegexAlt);
    }
    
    let tabs = [];
    if (tabsMatch) {
       const buttonsBlock = tabsMatch[1];
       const btnRegex = /onClick=\{\(\)\s*=>\s*setActiveTab\('([^']+)'\)\}[\s\S]*?>\s*([^<]+)\s*</g;
       let m;
       while ((m = btnRegex.exec(buttonsBlock)) !== null) {
           let id = m[1].trim();
           let label = m[2].trim();
           // map IDs to common Talky names if possible
           let mappedId = id;
           if (id === 'quiz') mappedId = 'practice';
           if (label.toLowerCase().includes('quiz')) label = 'Latihan';
           if (label.toLowerCase().includes('practice') || id==='practice') label = 'Tantangan';

           let iconName = 'BookOpen';
           if (mappedId === 'practice') iconName = 'PenTool';
           else if (mappedId === 'challenge' || id === 'practice' || label === 'Tantangan') iconName = 'Star';
           else if (id === 'compounds' || id === 'phrasals' || id === 'rhythm') iconName = 'Sparkles';

           tabs.push(`{ id: '${mappedId}', label: '${label}', icon: <${iconName} size={14} /> }`);
       }
    } else {
        // Fallback
        tabs.push(`{ id: 'learn', label: 'Pelajari', icon: <BookOpen size={14} /> }`);
        tabs.push(`{ id: 'practice', label: 'Latihan', icon: <PenTool size={14} /> }`);
    }
    
    // Safety Fallback if parsing failed somehow
    if (tabs.length === 0) {
        tabs.push(`{ id: 'learn', label: 'Pelajari', icon: <BookOpen size={14} /> }`);
        tabs.push(`{ id: 'practice', label: 'Latihan', icon: <PenTool size={14} /> }`);
    }

    // Extract inner content from `<div className="p-4 md:p-8 space-y-8 pb-24 animate-fade-in">` to the end of the divs.
    let contentBlock = '';
    const contentRegex = /<div className="p-4 md:p-8 space-y-8 pb-24 animate-fade-in">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*\);\s*\}\s*;\s*export/m;
    const cMatch = code.match(contentRegex);
    if (cMatch) {
        contentBlock = cMatch[1];
    } else {
        const contentFallback = /<div className="p-4 md:p-8 space-y-8 pb-24 animate-fade-in">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>\s*\)\;/m;
        const cMatch2 = code.match(contentFallback);
        if (cMatch2) contentBlock = cMatch2[1];
    }

    // Replace `activeTab === 'xyz'` with `tabId === 'xyz'`
    contentBlock = contentBlock.replace(/activeTab\s*===/gi, 'tabId ===');
    // Re-map the newly replaced "practice" to "challenge" ONLY if there is a conflict. 
    // Wait, the above two lines conflict.
    // Better way: Reconstruct contentBlock.

    // Icon replacements
    contentBlock = contentBlock.replace(/VolumeIcon/g, 'Volume2');
    contentBlock = contentBlock.replace(/SparklesIcon/g, 'Sparkles');
    contentBlock = contentBlock.replace(/PlayCircleIcon/g, 'Volume2');
    contentBlock = contentBlock.replace(/CheckCircleIcon/g, 'CheckCircle2');
    contentBlock = contentBlock.replace(/XCircleIcon/g, 'XCircle');
    contentBlock = contentBlock.replace(/StarIcon/g, 'Star');
    contentBlock = contentBlock.replace(/LightBulbIcon/g, 'Lightbulb');
    contentBlock = contentBlock.replace(/TrendUpIcon/g, 'TrendingUp');
    contentBlock = contentBlock.replace(/BarChartIcon/g, 'BarChart');
    contentBlock = contentBlock.replace(/FlameIcon/g, 'Zap');
    contentBlock = contentBlock.replace(/BookIcon/g, 'BookOpen');

    // Title Extraction
    let title = "Tinjauan Pengucapan";
    const titleMatch = code.match(/<h1[^>]*>([^<]+)<\/h1>/);
    if(titleMatch) title = titleMatch[1];


    // --- 5. Assemble Final Return Block ---
    const newReturnBlock = `return (
        <>
            <LessonCompleteModal
                show={showCompleteModal}
                onClose={() => setShowCompleteModal(false)}
                lessonLabel={"Intermediate Pronunciation Lesson ${lessonNumber}"}
                accentColor="#8B5CF6"
                nextLessonPath={nextLessonPath}
                onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
                onBack={() => { setShowCompleteModal(false); navigate(-1); }}
            />
            <LessonShell
                title="${title}"
                subtitle="Pronunciation • Pelajaran ${lessonNumber}"
                accentColor="#8B5CF6"
                nextLesson={nextLessonPath}
                tabs={[
                    ${tabs.join(',\n                    ')}
                ]}
                footer={() => (
                    <button
                        onClick={isCompleted ? () => navigate(-1) : handleSelesai}
                        className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg transition-all hover:opacity-90 active:scale-[0.98]"
                        style={{ background: isCompleted ? 'linear-gradient(135deg, #26C76D, #1ea85a)' : 'linear-gradient(135deg, #8B5CF6, #7C3AED)' }}
                    >
                        <CheckCircle2 size={18} />
                        {isCompleted ? 'Sudah Selesai ✓' : 'Selesai'}
                    </button>
                )}
            >
                {(tabId) => {
                    // Safe mapping for legacy tabs to Talky tabs
                    ${tabs.some(t => t.includes("'challenge'")) ? `if (tabId === 'practice') { tabId = 'quiz'; } else if (tabId === 'challenge') { tabId = 'practice'; }` : `if (tabId === 'practice') tabId = 'quiz';`}
                    
                    return (
                        <div className="animate-fade-in space-y-6">
                            ${contentBlock}
                        </div>
                    );
                }}
            </LessonShell>
        </>
    );`;

    const returnBlockStart = code.indexOf('return (');
    if (returnBlockStart === -1) {
       console.log("Could not find return block for " + lessonNumber);
       return false;
    }
    
    // The previous code ends exactly after the `export default` string... wait no.
    // Replace the end return block.
    const preReturn = code.slice(0, returnBlockStart);
    const postReturn = code.slice(returnBlockStart).replace(/return\s*\([\s\S]*?(?=\bexport\s+default)/m, newReturnBlock + '\n}; // END COMPONENT\n\n');

    let finalCode = preReturn + postReturn;

    // Remove stray HTML tags that might have broken
    finalCode = finalCode.replace(/<\/div>\s*<\/div>\s*<\/div>\s*\);\s*\}\s*;/g, '');

    // Cleanup: Some files might use activeTab to define button colors: `activeTab === 'quiz' ? ... ` 
    // In our new block, we've replaced activeTab with tabId. So it works.
    
    fs.writeFileSync(targetFilePath, finalCode);
    console.log(`Successfully migrated Inter Pronunciation Lesson ${lessonNumber}`);
    return true;
}

async function migrateAll() {
    let successCount = 0;
    for (let i = 1; i <= 20; i++) {
        if (processLesson(i)) successCount++;
    }
    console.log(`Done! Migrated ${successCount} files.`);
}

migrateAll();
