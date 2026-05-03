import SourceLesson from '../../../../ai-kamus/arabic/pemula/grammar/Lesson12';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerGrammarLesson12() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="grammar"
      lessonId={12}
      LessonComponent={SourceLesson}
    />
  );
}
