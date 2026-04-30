import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';
import GeneratedArabicLessonRenderer, { type GeneratedArabicLegacyProps } from '../../beginner/GeneratedArabicLessonRenderer';

function GeneratedLesson(props: GeneratedArabicLegacyProps) {
  return <GeneratedArabicLessonRenderer skillId="kitabah" lessonId={8} onComplete={props.onComplete} contentLevel="elementary" levelLabel="Elementary" />;
}

export default function ArabicElementaryKitabahLesson8() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="kitabah"
      lessonId={8}
      LessonComponent={GeneratedLesson}
    />
  );
}
