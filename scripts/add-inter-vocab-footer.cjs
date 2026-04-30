const fs = require('fs');
const path = require('path');

for (let i = 1; i <= 20; i++) {
  const file = path.join(__dirname, '../src/pages/module/english/intermediate/vocabulary/Lesson' + i + '.tsx');
  if (!fs.existsSync(file)) continue;

  let content = fs.readFileSync(file, 'utf8');

  // Insert Imports
  const importsToInject = `
import { useNavigate } from 'react-router-dom';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';
`;
  if (!content.includes('useLessonCompletion')) {
    content = content.replace(/(import React[^;]*;)/, '$1' + importsToInject);
  }

  // Insert Hooks inside component
  const hookInjection = `\n  const navigate = useNavigate();\n  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('intermediate_vocabulary', ${i});\n  const nextLessonPath = ${i} < 20 ? \`/modul/english/intermediate/vocabulary/lesson-\${${i}+1}\` : '/modul/english/intermediate';\n`;
  if (!content.includes('const navigate = useNavigate();')) {
    // Find where to inject, usually right after const InterVocabularyLesson... = () => {
    content = content.replace(/(const \[quizStep, setQuizStep\])/, hookInjection + '  $1');
  }

  // Change Footer Logic
  const oldFooterRegex = /footer=\{\(\) => \([\s\S]*?onClick=\{\(\) => window\.history\.back\(\)\}[\s\S]*?Selesai[\s\S]*?<\/button>\s*\)\}/;
  const newFooter = `footer={() => (
        <button
          onClick={isCompleted ? () => navigate(-1) : handleSelesai}
          className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg transition-all hover:opacity-90 active:scale-[0.98]"
          style={{ background: isCompleted ? 'linear-gradient(135deg, #26C76D, #1ea85a)' : 'linear-gradient(135deg, #2980B9, #2980B9cc)' }}
        >
          <CheckCircle2 size={18} />
          {isCompleted ? 'Sudah Selesai ✓' : 'Selesai'}
        </button>
      )}`;

  if (oldFooterRegex.test(content)) {
    content = content.replace(oldFooterRegex, newFooter);
  }

  // Inject nextLesson prop to LessonShell
  if (content.includes('tabs={[')) {
      if(!content.includes('nextLesson={nextLessonPath}')) {
          content = content.replace('tabs={[', 'nextLesson={nextLessonPath}\n      tabs={[');
      }
  }

  // Add LessonCompleteModal Wrapper
  const modalInjection = `<>
      <LessonCompleteModal
        show={showCompleteModal}
        onClose={() => setShowCompleteModal(false)}
        lessonLabel={"Intermediate Vocabulary Lesson ${i}"}
        accentColor="#2980B9"
        nextLessonPath={nextLessonPath}
        onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
        onBack={() => { setShowCompleteModal(false); navigate(-1); }}
      />
      <LessonShell`;
  
  if (!content.includes('<LessonCompleteModal')) {
    content = content.replace(/<LessonShell/, modalInjection);
    
    // Close the fragment
    const closingTag = '</LessonShell>';
    const lastIndex = content.lastIndexOf(closingTag);
    if (lastIndex !== -1) {
        content = content.substring(0, lastIndex) + closingTag + '\n    </>' + content.substring(lastIndex + closingTag.length);
    }
  }

  fs.writeFileSync(file, content, 'utf8');
  console.log('Processed Completion State for Vocabulary Lesson ' + i);
}

console.log('Done mapping modal and completion data.');
