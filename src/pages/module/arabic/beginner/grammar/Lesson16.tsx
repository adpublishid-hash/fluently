import SourceLesson from '../../../../ai-kamus/arabic/pemula/grammar/Lesson16';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerGrammarLesson16() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="grammar"
      lessonId={16}
      LessonComponent={SourceLesson}
    />
  );
}
