import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';
import GeneratedArabicLessonRenderer, { type GeneratedArabicLegacyProps } from '../../beginner/GeneratedArabicLessonRenderer';

function GeneratedLesson(props: GeneratedArabicLegacyProps) {
  return <GeneratedArabicLessonRenderer skillId="qiraah" lessonId={4} onComplete={props.onComplete} contentLevel="elementary" levelLabel="Elementary" />;
}

export default function ArabicElementaryQiraahLesson4() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="qiraah"
      lessonId={4}
      LessonComponent={GeneratedLesson}
    />
  );
}
