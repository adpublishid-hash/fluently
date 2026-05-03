import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';
import GeneratedArabicLessonRenderer, { type GeneratedArabicLegacyProps } from '../GeneratedArabicLessonRenderer';

function GeneratedLesson(props: GeneratedArabicLegacyProps) {
  return <GeneratedArabicLessonRenderer skillId="qiraah" lessonId={3} onComplete={props.onComplete} />;
}

export default function ArabicBeginnerQiraahLesson3() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="qiraah"
      lessonId={3}
      LessonComponent={GeneratedLesson}
    />
  );
}
