import SourceLesson from '../../../../ai-kamus/arabic/elementary/grammar/Lesson4';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryGrammarLesson4() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="grammar"
      lessonId={4}
      LessonComponent={SourceLesson}
    />
  );
}
