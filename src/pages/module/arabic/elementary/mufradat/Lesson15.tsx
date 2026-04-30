import SourceLesson from '../../../../ai-kamus/arabic/elementary/mufradat/Lesson15';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryMufradatLesson15() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="mufradat"
      lessonId={15}
      LessonComponent={SourceLesson}
    />
  );
}
