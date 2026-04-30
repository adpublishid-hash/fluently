import SourceLesson from '../../../../ai-kamus/arabic/pemula/grammar/Lesson19';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerGrammarLesson19() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="grammar"
      lessonId={19}
      LessonComponent={SourceLesson}
    />
  );
}
