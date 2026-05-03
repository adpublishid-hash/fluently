import SourceLesson from '../../../../ai-kamus/arabic/elementary/mufradat/Lesson4';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryMufradatLesson4() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="mufradat"
      lessonId={4}
      LessonComponent={SourceLesson}
    />
  );
}
