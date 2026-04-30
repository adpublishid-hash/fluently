import SourceLesson from '../../../../ai-kamus/arabic/elementary/mufradat/Lesson12';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryMufradatLesson12() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="mufradat"
      lessonId={12}
      LessonComponent={SourceLesson}
    />
  );
}
