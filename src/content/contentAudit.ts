// Content audit for generated lessons. Used by the Vitest suite (CI gate) and by
// `npm run content:audit` (human-readable coverage report).
import { getGeneratedArabicLesson, type GeneratedArabicContentLevel } from '../pages/module/arabic/beginner/generatedBeginnerArabicContent';
import { arabicLessonCounts, arabicLevels, arabicSkills, type ArabicLevelId } from '../pages/module/arabic/arabicModuleData';
import { getJapaneseLesson, getJapaneseTopicList } from '../pages/module/japanese/japaneseLessonContent';
import { buildJapanesePractice } from '../pages/latihan/japanese/japanesePracticeContent';
import { japaneseLessonCounts, japaneseSkills, type JapaneseLevelId } from '../pages/module/japanese/japaneseModuleData';
import { getMandarinLesson } from '../pages/module/mandarin/mandarinLessonContent';
import { mandarinLessonCounts, mandarinSkills, type MandarinLevelId } from '../pages/module/mandarin/mandarinModuleData';

export type AuditQuestion = { question: string; options: string[]; answer: string };
export type AuditLesson = { key: string; title: string; practice: AuditQuestion[]; fingerprint: string };

export type LevelAudit = {
  language: string;
  level: string;
  lessons: number;
  questions: number;
  invalidQuestions: string[];
  duplicateLessons: string[];
  answerFirstRatio: number;
  uniqueQuestionRatio: number;
};

// Option order is shuffled per lesson, so compare questions with sorted options.
function practiceKey(practice: AuditQuestion[]) {
  return practice.map((item) => [item.question, item.answer, [...item.options].sort()]);
}

function arabicContentLevel(level: ArabicLevelId): GeneratedArabicContentLevel {
  return level === 'pemula' ? 'beginner' : level;
}

export function collectLessons(): Array<{ language: string; level: string; lessons: AuditLesson[] }> {
  const groups: Array<{ language: string; level: string; lessons: AuditLesson[] }> = [];

  (Object.keys(japaneseLessonCounts) as JapaneseLevelId[]).forEach((level) => {
    const lessons: AuditLesson[] = [];
    japaneseSkills.forEach(({ id: skill }) => {
      for (let lesson = 1; lesson <= japaneseLessonCounts[level][skill]; lesson += 1) {
        const data = getJapaneseLesson(skill, lesson, level);
        lessons.push({
          key: `${skill}/${lesson}`,
          title: data.title,
          practice: data.practice,
          fingerprint: JSON.stringify([data.title, data.vocabulary, data.examples, practiceKey(data.practice)]),
        });
      }
    });
    groups.push({ language: 'japanese', level, lessons });
  });

  (Object.keys(japaneseLessonCounts) as JapaneseLevelId[]).forEach((level) => {
    const lessons: AuditLesson[] = [];
    japaneseSkills.forEach(({ id: skill }) => {
      getJapaneseTopicList(level, skill).forEach((topic, index) => {
        const practice = buildJapanesePractice(level, skill, index + 1);
        lessons.push({ key: `${skill}/${index + 1}`, title: topic, practice, fingerprint: JSON.stringify([skill, topic, practiceKey(practice)]) });
      });
    });
    groups.push({ language: 'japanese-latihan', level, lessons });
  });

  (Object.keys(mandarinLessonCounts) as MandarinLevelId[]).forEach((level) => {
    const lessons: AuditLesson[] = [];
    mandarinSkills.forEach(({ id: skill }) => {
      for (let lesson = 1; lesson <= mandarinLessonCounts[level][skill]; lesson += 1) {
        const data = getMandarinLesson(skill, lesson, level);
        lessons.push({
          key: `${skill}/${lesson}`,
          title: data.title,
          practice: data.practice,
          fingerprint: JSON.stringify([data.title, data.subtitle, data.vocabulary, data.examples, practiceKey(data.practice)]),
        });
      }
    });
    groups.push({ language: 'mandarin', level, lessons });
  });

  (Object.keys(arabicLevels) as ArabicLevelId[]).forEach((level) => {
    const lessons: AuditLesson[] = [];
    arabicSkills.forEach(({ id: skill }) => {
      for (let lesson = 1; lesson <= arabicLessonCounts[level][skill]; lesson += 1) {
        const data = getGeneratedArabicLesson(skill, lesson, arabicContentLevel(level));
        lessons.push({
          key: `${skill}/${lesson}`,
          title: data.title,
          practice: data.practice,
          fingerprint: JSON.stringify([data.title, data.subtitle, data.vocabulary, data.examples, practiceKey(data.practice)]),
        });
      }
    });
    groups.push({ language: 'arabic', level, lessons });
  });

  return groups;
}

export function auditGroup(language: string, level: string, lessons: AuditLesson[]): LevelAudit {
  const invalidQuestions: string[] = [];
  const seenFingerprints = new Map<string, string>();
  const duplicateLessons: string[] = [];
  const questionTexts = new Set<string>();
  let questions = 0;
  let answerFirst = 0;

  lessons.forEach((lesson) => {
    const previous = seenFingerprints.get(lesson.fingerprint);
    if (previous) duplicateLessons.push(`${lesson.key} = ${previous}`);
    else seenFingerprints.set(lesson.fingerprint, lesson.key);

    lesson.practice.forEach((item, index) => {
      questions += 1;
      questionTexts.add(`${item.question}→${item.answer}`);
      if (item.options[0] === item.answer) answerFirst += 1;
      const problems: string[] = [];
      if (!item.options.includes(item.answer)) problems.push('answer not in options');
      if (new Set(item.options).size !== item.options.length) problems.push('duplicate options');
      if (item.options.length < 2) problems.push('fewer than 2 options');
      if (problems.length) invalidQuestions.push(`${lesson.key}#${index + 1}: ${problems.join(', ')}`);
    });
  });

  return {
    language,
    level,
    lessons: lessons.length,
    questions,
    invalidQuestions,
    duplicateLessons,
    answerFirstRatio: questions ? answerFirst / questions : 0,
    uniqueQuestionRatio: questions ? questionTexts.size / questions : 0,
  };
}

export function runContentAudit(): LevelAudit[] {
  return collectLessons().map((group) => auditGroup(group.language, group.level, group.lessons));
}
