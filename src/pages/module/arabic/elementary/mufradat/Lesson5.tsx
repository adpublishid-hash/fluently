import SourceLesson from '../../../../ai-kamus/arabic/elementary/mufradat/Lesson5';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryMufradatLesson5() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="mufradat"
      lessonId={5}
      LessonComponent={SourceLesson}
    />
  );
}
