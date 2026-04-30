import SourceLesson from '../../../../ai-kamus/arabic/elementary/grammar/Lesson2';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryGrammarLesson2() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="grammar"
      lessonId={2}
      LessonComponent={SourceLesson}
    />
  );
}
