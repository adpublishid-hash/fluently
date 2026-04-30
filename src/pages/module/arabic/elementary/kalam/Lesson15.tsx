import SourceLesson from '../../../../ai-kamus/arabic/elementary/kalam/Lesson15';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryKalamLesson15() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="kalam"
      lessonId={15}
      LessonComponent={SourceLesson}
    />
  );
}
