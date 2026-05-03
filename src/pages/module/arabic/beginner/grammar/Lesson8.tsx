import SourceLesson from '../../../../ai-kamus/arabic/pemula/grammar/Lesson8';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerGrammarLesson8() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="grammar"
      lessonId={8}
      LessonComponent={SourceLesson}
    />
  );
}
