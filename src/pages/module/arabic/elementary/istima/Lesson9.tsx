import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';
import GeneratedArabicLessonRenderer, { type GeneratedArabicLegacyProps } from '../../beginner/GeneratedArabicLessonRenderer';

function GeneratedLesson(props: GeneratedArabicLegacyProps) {
  return <GeneratedArabicLessonRenderer skillId="istima" lessonId={9} onComplete={props.onComplete} contentLevel="elementary" levelLabel="Elementary" />;
}

export default function ArabicElementaryIstimaLesson9() {
  return (
    <ArabicStaticLessonShell
      levelId="elementary"
      routeLevelId="elementary"
      skillId="istima"
      lessonId={9}
      LessonComponent={GeneratedLesson}
    />
  );
}
