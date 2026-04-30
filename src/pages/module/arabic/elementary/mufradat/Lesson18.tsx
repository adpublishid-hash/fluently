import SourceLesson from '../../../../ai-kamus/arabic/elementary/mufradat/Lesson18';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryMufradatLesson18() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="mufradat"
      lessonId={18}
      LessonComponent={SourceLesson}
    />
  );
}
