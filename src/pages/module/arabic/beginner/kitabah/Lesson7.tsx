import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';
import GeneratedArabicLessonRenderer, { type GeneratedArabicLegacyProps } from '../GeneratedArabicLessonRenderer';

function GeneratedLesson(props: GeneratedArabicLegacyProps) {
  return <GeneratedArabicLessonRenderer skillId="kitabah" lessonId={7} onComplete={props.onComplete} />;
}

export default function ArabicBeginnerKitabahLesson7() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="kitabah"
      lessonId={7}
      LessonComponent={GeneratedLesson}
    />
  );
}
