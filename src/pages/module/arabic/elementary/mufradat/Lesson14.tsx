import SourceLesson from '../../../../ai-kamus/arabic/elementary/mufradat/Lesson14';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryMufradatLesson14() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="mufradat"
      lessonId={14}
      LessonComponent={SourceLesson}
    />
  );
}
