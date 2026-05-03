import SourceLesson from '../../../../ai-kamus/arabic/pemula/grammar/Lesson7';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerGrammarLesson7() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="grammar"
      lessonId={7}
      LessonComponent={SourceLesson}
    />
  );
}
