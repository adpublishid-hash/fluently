import SourceLesson from '../../../../ai-kamus/arabic/elementary/grammar/Lesson5';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryGrammarLesson5() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="grammar"
      lessonId={5}
      LessonComponent={SourceLesson}
    />
  );
}
