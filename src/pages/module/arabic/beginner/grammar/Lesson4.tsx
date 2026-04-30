import SourceLesson from '../../../../ai-kamus/arabic/pemula/grammar/Lesson4';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerGrammarLesson4() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="grammar"
      lessonId={4}
      LessonComponent={SourceLesson}
    />
  );
}
