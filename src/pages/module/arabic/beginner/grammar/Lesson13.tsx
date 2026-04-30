import SourceLesson from '../../../../ai-kamus/arabic/pemula/grammar/Lesson13';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerGrammarLesson13() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="grammar"
      lessonId={13}
      LessonComponent={SourceLesson}
    />
  );
}
