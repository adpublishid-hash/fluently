import SourceLesson from '../../../../ai-kamus/arabic/elementary/grammar/Lesson8';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryGrammarLesson8() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="grammar"
      lessonId={8}
      LessonComponent={SourceLesson}
    />
  );
}
