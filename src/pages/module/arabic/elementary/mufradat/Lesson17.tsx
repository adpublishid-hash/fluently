import SourceLesson from '../../../../ai-kamus/arabic/elementary/mufradat/Lesson17';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryMufradatLesson17() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="mufradat"
      lessonId={17}
      LessonComponent={SourceLesson}
    />
  );
}
