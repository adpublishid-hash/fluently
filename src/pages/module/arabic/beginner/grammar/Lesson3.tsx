import SourceLesson from '../../../../ai-kamus/arabic/pemula/grammar/Lesson3';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerGrammarLesson3() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="grammar"
      lessonId={3}
      LessonComponent={SourceLesson}
    />
  );
}
