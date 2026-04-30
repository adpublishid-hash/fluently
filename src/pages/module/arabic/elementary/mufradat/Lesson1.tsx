import SourceLesson from '../../../../ai-kamus/arabic/elementary/mufradat/Lesson1';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryMufradatLesson1() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="mufradat"
      lessonId={1}
      LessonComponent={SourceLesson}
    />
  );
}
