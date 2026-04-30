import ArabicStaticLessonShell from '../../ArabicStaticLessonShell';
import GeneratedArabicLessonRenderer, { type GeneratedArabicLegacyProps } from '../GeneratedArabicLessonRenderer';

function GeneratedLesson(props: GeneratedArabicLegacyProps) {
  return <GeneratedArabicLessonRenderer skillId="qiraah" lessonId={18} onComplete={props.onComplete} />;
}

export default function ArabicBeginnerQiraahLesson18() {
  return (
    <ArabicStaticLessonShell
      levelId="pemula"
      routeLevelId="beginner"
      skillId="qiraah"
      lessonId={18}
      LessonComponent={GeneratedLesson}
    />
  );
}
