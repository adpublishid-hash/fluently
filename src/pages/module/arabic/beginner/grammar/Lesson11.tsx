import SourceLesson from '../../../../ai-kamus/arabic/pemula/grammar/Lesson11';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerGrammarLesson11() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="grammar"
      lessonId={11}
      LessonComponent={SourceLesson}
    />
  );
}
