import SourceLesson from '../../../../ai-kamus/arabic/pemula/grammar/Lesson2';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerGrammarLesson2() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="grammar"
      lessonId={2}
      LessonComponent={SourceLesson}
    />
  );
}
