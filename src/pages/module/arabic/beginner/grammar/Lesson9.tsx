import SourceLesson from '../../../../ai-kamus/arabic/pemula/grammar/Lesson9';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerGrammarLesson9() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="grammar"
      lessonId={9}
      LessonComponent={SourceLesson}
    />
  );
}
