import SourceLesson from '../../../../ai-kamus/arabic/elementary/grammar/Lesson9';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryGrammarLesson9() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="grammar"
      lessonId={9}
      LessonComponent={SourceLesson}
    />
  );
}
