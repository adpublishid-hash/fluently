import SourceLesson from '../../../../ai-kamus/arabic/pemula/grammar/Lesson15';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerGrammarLesson15() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="grammar"
      lessonId={15}
      LessonComponent={SourceLesson}
    />
  );
}
