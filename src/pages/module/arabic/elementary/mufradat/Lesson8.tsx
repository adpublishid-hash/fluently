import SourceLesson from '../../../../ai-kamus/arabic/elementary/mufradat/Lesson8';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryMufradatLesson8() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="mufradat"
      lessonId={8}
      LessonComponent={SourceLesson}
    />
  );
}
