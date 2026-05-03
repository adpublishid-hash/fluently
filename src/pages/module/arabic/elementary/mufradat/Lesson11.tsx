import SourceLesson from '../../../../ai-kamus/arabic/elementary/mufradat/Lesson11';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryMufradatLesson11() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="mufradat"
      lessonId={11}
      LessonComponent={SourceLesson}
    />
  );
}
