import SourceLesson from '../../../../ai-kamus/arabic/pemula/grammar/Lesson14';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerGrammarLesson14() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="grammar"
      lessonId={14}
      LessonComponent={SourceLesson}
    />
  );
}
