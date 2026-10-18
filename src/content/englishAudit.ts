// English lessons whose practice is importable as data. Lessons that keep their
// quiz in a non-exported const inside a page component are not covered yet.
import type { AuditLesson, AuditQuestion } from './contentAudit';
import { buildChoiceQuestion, hashSeed, seededRandom, type ChoiceQuestion } from '../utils/quiz';
import { getAdvancedListeningQuiz, advancedListeningLessons } from '../pages/module/english/advanced/listening/advancedListeningContent';
import { advancedPronunciationLessons } from '../pages/module/english/advanced/pronunciation/advancedPronunciationContent';
import { advancedReadingLessons, getAdvancedReadingQuiz } from '../pages/module/english/advanced/reading/advancedReadingContent';
import { advancedSpeakingLessons, getAdvancedSpeakingQuiz } from '../pages/module/english/advanced/speaking/advancedSpeakingContent';
import { getAdvancedVocabularyLessons, getAdvancedVocabularyQuiz } from '../pages/module/english/advanced/vocabulary/advancedVocabularyContent';
import { advancedWritingLessons, getAdvancedWritingQuiz } from '../pages/module/english/advanced/writing/advancedWritingContent';
import { proficiencyGrammarLessons } from '../pages/module/english/proficiency/grammar/proficiencyGrammarContent';
import { proficiencyListeningLessons } from '../pages/module/english/proficiency/listening/proficiencyListeningContent';
import { proficiencyPronunciationLessons } from '../pages/module/english/proficiency/pronunciation/proficiencyPronunciationContent';
import { proficiencyReadingLessons } from '../pages/module/english/proficiency/reading/proficiencyReadingContent';
import { proficiencySpeakingLessons } from '../pages/module/english/proficiency/speaking/proficiencySpeakingContent';
import { proficiencyVocabularyLessons } from '../pages/module/english/proficiency/vocabulary/proficiencyVocabularyContent';
import { proficiencyWritingLessons } from '../pages/module/english/proficiency/writing/proficiencyWritingContent';
import { getInteractivePracticeSet, intermediateGrammarLessons } from '../pages/module/english/intermediate/grammar/intermediateGrammarContent';
import { getUpperInterWritingQuiz, upperInterWritingLessons } from '../pages/module/english/upper-intermediate/writing/upperInterWritingContent';
import { BEGINNER_SPEAKING_LESSONS } from '../pages/module/english/beginner/speaking/speakingData';
import { LESSON_EXERCISES } from '../pages/module/english/beginner/vocabulary/exercises';
import { allExtraEnglishLessons } from '../pages/module/english/extra';

type Qoa = { q: string; opts: string[]; ans: string };
type Group = { language: string; level: string; lessons: AuditLesson[] };

const fromQoa = (items: Qoa[]): AuditQuestion[] => items.map(({ q, opts, ans }) => ({ question: q, options: opts, answer: ans }));

function group(level: string, practices: AuditQuestion[][]): Group {
  const lessons = practices.map((practice, index) => ({
    key: `${index + 1}`,
    title: `${level} ${index + 1}`,
    practice,
    fingerprint: JSON.stringify(practice.map((item) => [item.question, item.answer, [...item.options].sort()])),
  }));
  return { language: 'english', level, lessons };
}

export function collectEnglishLessons(): Group[] {
  const extras = new Map<string, AuditQuestion[][]>();
  allExtraEnglishLessons().forEach(({ level, skill, lesson }) => {
    const key = `${level}/${skill}+extra`;
    // Same option building as ExtraEnglishLessonPage.
    const random = seededRandom(hashSeed('english-extra', level, skill, lesson.id));
    const practice = lesson.practice
      .map(([question, answer, wrong]) => buildChoiceQuestion(question, answer, wrong, random))
      .filter((item): item is ChoiceQuestion => item !== null);
    extras.set(key, [...(extras.get(key) ?? []), practice]);
  });
  return [
    group('beginner/speaking', Object.values(BEGINNER_SPEAKING_LESSONS).map((lesson) => lesson.practiceQuestions.map((item) => ({
      question: item.prompt,
      options: item.options.map((option) => option.text),
      answer: item.options.find((option) => option.correct)?.text ?? '',
    })))),
    group('beginner/vocabulary', Object.values(LESSON_EXERCISES).map((items) => items.map((item) => ({ question: item.question, options: item.options, answer: item.correctAnswer })))),
    ...[...extras.entries()].map(([level, practices]) => group(level, practices)),
    group('intermediate/grammar', intermediateGrammarLessons.map((lesson) => getInteractivePracticeSet(lesson))),
    group('upper-intermediate/writing', upperInterWritingLessons.map((lesson) => fromQoa(getUpperInterWritingQuiz(lesson)))),
    group('advanced/listening', advancedListeningLessons.map((lesson) => fromQoa(getAdvancedListeningQuiz(lesson)))),
    group('advanced/pronunciation', advancedPronunciationLessons.map((lesson) => fromQoa(lesson.quiz))),
    group('advanced/reading', advancedReadingLessons.map((lesson) => fromQoa(getAdvancedReadingQuiz(lesson)))),
    group('advanced/speaking', advancedSpeakingLessons.map((lesson) => fromQoa(getAdvancedSpeakingQuiz(lesson)))),
    group('advanced/vocabulary', getAdvancedVocabularyLessons().map((lesson) => fromQoa(getAdvancedVocabularyQuiz(lesson)))),
    group('advanced/writing', advancedWritingLessons.map((lesson) => fromQoa(getAdvancedWritingQuiz(lesson)))),
    group('proficiency/grammar', proficiencyGrammarLessons.map((lesson) => fromQoa(lesson.quiz))),
    group('proficiency/listening', proficiencyListeningLessons.map((lesson) => fromQoa(lesson.quiz))),
    group('proficiency/pronunciation', proficiencyPronunciationLessons.map((lesson) => fromQoa(lesson.quiz))),
    group('proficiency/reading', proficiencyReadingLessons.map((lesson) => fromQoa(lesson.quiz))),
    group('proficiency/speaking', proficiencySpeakingLessons.map((lesson) => fromQoa(lesson.quiz))),
    group('proficiency/vocabulary', proficiencyVocabularyLessons.map((lesson) => fromQoa(lesson.quiz))),
    group('proficiency/writing', proficiencyWritingLessons.map((lesson) => fromQoa(lesson.quiz))),
  ];
}
