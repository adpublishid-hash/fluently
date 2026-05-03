import SourceLesson from '../../../../ai-kamus/arabic/elementary/kalam/Lesson4';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryKalamLesson4() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="kalam"
      lessonId={4}
      LessonComponent={SourceLesson}
    />
  );
}
