import SourceLesson from '../../../../ai-kamus/arabic/elementary/mufradat/Lesson9';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryMufradatLesson9() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="mufradat"
      lessonId={9}
      LessonComponent={SourceLesson}
    />
  );
}
