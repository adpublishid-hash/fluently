import SourceLesson from '../../../../ai-kamus/arabic/elementary/mufradat/Lesson20';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryMufradatLesson20() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="mufradat"
      lessonId={20}
      LessonComponent={SourceLesson}
    />
  );
}
