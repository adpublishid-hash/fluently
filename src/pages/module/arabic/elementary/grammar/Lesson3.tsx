import SourceLesson from '../../../../ai-kamus/arabic/elementary/grammar/Lesson3';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryGrammarLesson3() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="grammar"
      lessonId={3}
      LessonComponent={SourceLesson}
    />
  );
}
