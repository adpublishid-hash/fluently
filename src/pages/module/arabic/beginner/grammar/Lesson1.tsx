import SourceLesson from '../../../../ai-kamus/arabic/pemula/grammar/Lesson1';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerGrammarLesson1() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="grammar"
      lessonId={1}
      LessonComponent={SourceLesson}
    />
  );
}
