import SourceLesson from '../../../../ai-kamus/arabic/elementary/grammar/Lesson10';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryGrammarLesson10() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="grammar"
      lessonId={10}
      LessonComponent={SourceLesson}
    />
  );
}
