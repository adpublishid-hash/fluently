import SourceLesson from '../../../../ai-kamus/arabic/pemula/grammar/Lesson17';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerGrammarLesson17() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="grammar"
      lessonId={17}
      LessonComponent={SourceLesson}
    />
  );
}
