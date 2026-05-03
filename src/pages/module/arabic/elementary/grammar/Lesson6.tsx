import SourceLesson from '../../../../ai-kamus/arabic/elementary/grammar/Lesson6';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryGrammarLesson6() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="grammar"
      lessonId={6}
      LessonComponent={SourceLesson}
    />
  );
}
