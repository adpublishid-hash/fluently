import SourceLesson from '../../../../ai-kamus/arabic/elementary/kalam/Lesson19';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryKalamLesson19() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="kalam"
      lessonId={19}
      LessonComponent={SourceLesson}
    />
  );
}
