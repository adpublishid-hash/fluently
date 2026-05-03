import SourceLesson from '../../../../ai-kamus/arabic/elementary/mufradat/Lesson21';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryMufradatLesson21() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="mufradat"
      lessonId={21}
      LessonComponent={SourceLesson}
    />
  );
}
