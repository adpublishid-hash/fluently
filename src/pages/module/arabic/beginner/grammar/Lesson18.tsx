import SourceLesson from '../../../../ai-kamus/arabic/pemula/grammar/Lesson18';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerGrammarLesson18() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="grammar"
      lessonId={18}
      LessonComponent={SourceLesson}
    />
  );
}
