import SourceLesson from '../../../../ai-kamus/arabic/pemula/grammar/Lesson10';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicBeginnerGrammarLesson10() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="grammar"
      lessonId={10}
      LessonComponent={SourceLesson}
    />
  );
}
