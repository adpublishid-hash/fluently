import SourceLesson from '../../../../ai-kamus/arabic/elementary/mufradat/Lesson13';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryMufradatLesson13() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="mufradat"
      lessonId={13}
      LessonComponent={SourceLesson}
    />
  );
}
