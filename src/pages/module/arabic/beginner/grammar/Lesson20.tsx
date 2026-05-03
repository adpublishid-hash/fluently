import SourceLesson from '../../../../ai-kamus/arabic/pemula/grammar/Lesson20';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerGrammarLesson20() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="grammar"
      lessonId={20}
      LessonComponent={SourceLesson}
    />
  );
}
