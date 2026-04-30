import SourceLesson from '../../../../ai-kamus/arabic/elementary/grammar/Lesson1';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryGrammarLesson1() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="grammar"
      lessonId={1}
      LessonComponent={SourceLesson}
    />
  );
}
