import SourceLesson from '../../../../ai-kamus/arabic/elementary/mufradat/Lesson2';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryMufradatLesson2() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="mufradat"
      lessonId={2}
      LessonComponent={SourceLesson}
    />
  );
}
