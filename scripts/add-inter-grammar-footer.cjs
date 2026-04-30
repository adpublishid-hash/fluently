const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src/pages/module/english/intermediate/grammar');

for (let i = 1; i <= 20; i++) {
  const file = path.join(dir, `Lesson${i}.tsx`);
  if (!fs.existsSync(file)) continue;

  let content = fs.readFileSync(file, 'utf8');

  // Skip if already contains LessonCompleteModal
  if (content.includes('LessonCompleteModal')) {
    console.log(`Skipping Lesson${i}.tsx - already has modal`);
    continue;
  }

  // 1. Add Imports
  const importsToAdd = `import { useNavigate } from 'react-router-dom';\nimport { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';\nimport LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';\n`;
  content = content.replace(/(import React[^;]+;)/, "$1\n" + importsToAdd);

  // 2. Add Component State
  const hookLogic = `  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('intermediate_grammar', ${i});
  const nextLessonPath = ${i < 20 ? `'/modul/english/intermediate/grammar/lesson-${i + 1}'` : `undefined`};
  `;
  content = content.replace(/(const playSound =)/, hookLogic + '\n  $1');

  // 3. Add Modal and Fragment wrapper
  const modalMarkup = `    <>
      <LessonCompleteModal
        show={showCompleteModal}
        onClose={() => setShowCompleteModal(false)}
        lessonLabel={"Intermediate Grammar Lesson ${i}"}
        accentColor={"#8E44AD"}
        nextLessonPath={nextLessonPath}
        onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
        onBack={() => { setShowCompleteModal(false); navigate(-1); }}
      />
      <LessonShell`;
  
  content = content.replace(/<LessonShell/, modalMarkup);
  
  // Add nextLesson prop to LessonShell
  content = content.replace(/(accentColor="#8E44AD")/, "$1\n      nextLesson={nextLessonPath}");

  // Modify Footer Button
  const existingFooterStart = "      footer={() => (\n        <button\n          onClick={() => window.history.back()}";
  const existingFooterGradientStart = "          style={{ background: 'linear-gradient(135deg, #8E44AD, #8E44ADcc)' }}\n        >\n          <CheckCircle2 size={18} />\n          Selesai\n        </button>";
  
  // First we replace the onClick
  content = content.replace(
      "onClick={() => window.history.back()}",
      "onClick={isCompleted ? () => navigate(-1) : handleSelesai}"
  );

  // Then replace the style and children
  content = content.replace(
      "style={{ background: 'linear-gradient(135deg, #8E44AD, #8E44ADcc)' }}\n        >\n          <CheckCircle2 size={18} />\n          Selesai",
      "style={{ background: isCompleted ? 'linear-gradient(135deg, #26C76D, #1ea85a)' : 'linear-gradient(135deg, #8E44AD, #8E44ADcc)' }}\n        >\n          <CheckCircle2 size={18} />\n          {isCompleted ? 'Sudah Selesai ✓' : 'Selesai'}"
  );

  // Close the Fragment Wrapper at the end
  content = content.replace(/<\/LessonShell>\s*\);\s*\};/, "</LessonShell>\n    </>\n  );\n};");

  fs.writeFileSync(file, content, 'utf8');
  console.log(`Processed Lesson${i}.tsx`);
}

console.log('Done processing LessonCompleteModal integration.');
