import SourceLesson from '../../../../ai-kamus/arabic/elementary/mufradat/Lesson7';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryMufradatLesson7() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="mufradat"
      lessonId={7}
      LessonComponent={SourceLesson}
    />
  );
}
