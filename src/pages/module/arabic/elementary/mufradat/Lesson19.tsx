import SourceLesson from '../../../../ai-kamus/arabic/elementary/mufradat/Lesson19';
import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';

export default function ArabicElementaryMufradatLesson19() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="mufradat"
      lessonId={19}
      LessonComponent={SourceLesson}
    />
  );
}
