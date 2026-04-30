import SourceLesson from '../../../../ai-kamus/arabic/elementary/mufradat/Lesson16';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryMufradatLesson16() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="mufradat"
      lessonId={16}
      LessonComponent={SourceLesson}
    />
  );
}
