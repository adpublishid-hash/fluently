import SourceLesson from '../../../../ai-kamus/arabic/pemula/grammar/Lesson5';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerGrammarLesson5() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="grammar"
      lessonId={5}
      LessonComponent={SourceLesson}
    />
  );
}
