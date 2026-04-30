import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';
import GeneratedArabicLessonRenderer, { type GeneratedArabicLegacyProps } from '../GeneratedArabicLessonRenderer';

function GeneratedLesson(props: GeneratedArabicLegacyProps) {
  return <GeneratedArabicLessonRenderer skillId="kitabah" lessonId={5} onComplete={props.onComplete} />;
}

export default function ArabicBeginnerKitabahLesson5() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="kitabah"
      lessonId={5}
      LessonComponent={GeneratedLesson}
    />
  );
}
