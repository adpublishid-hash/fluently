import SourceLesson from '../../../../ai-kamus/arabic/elementary/grammar/Lesson7';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryGrammarLesson7() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="grammar"
      lessonId={7}
      LessonComponent={SourceLesson}
    />
  );
}
