import { hashSeed, seededRandom, seededShuffle, type ChoiceQuestion } from '../../../../utils/quiz';
import type { JapaneseLevelId, JapaneseSkillId } from '../../../module/japanese/japaneseModuleData';
import { askJapaneseQuestion, type CorePool, type JapaneseQuestionKind } from '../../../module/japanese/lessonCore/practice';
import type { QuizLevel, VocabQuestion } from '../../components/PracticeQuizPage';
import type { QuizItem } from './types';

// Question types per skill, most characteristic first.
const kindsBySkill: Record<JapaneseSkillId, JapaneseQuestionKind[]> = {
  vocabulary: ['meaning', 'japanese', 'romaji', 'heard'],
  grammar: ['particle', 'order', 'meaning', 'japanese'],
  reading: ['meaning', 'order', 'romaji'],
  writing: ['japanese', 'order', 'particle'],
  listening: ['heard', 'meaning', 'japanese'],
  speaking: ['japanese', 'heard', 'order'],
  pronunciation: ['romaji', 'heard', 'meaning'],
};

export const QUESTIONS_PER_LEVEL = 10;
const BACKUP_KINDS: JapaneseQuestionKind[] = ['meaning', 'japanese', 'heard', 'romaji', 'order', 'particle'];
const LEVELS: QuizLevel[] = ['Basic', 'Intermediate', 'Advanced'];

function authoredQuestion(item: QuizItem, random: () => number): ChoiceQuestion | null {
  const authored = item[3];
  if (!authored) return null;
  const [prompt, answer, ...wrong] = authored;
  return { question: prompt, answer, options: seededShuffle([answer, ...wrong], random) };
}

/** 30 questions (10 per level) for one practice topic, built from that topic's own items. */
export function buildJapaneseTopicQuiz(
  level: JapaneseLevelId,
  skill: JapaneseSkillId,
  topicId: string,
  tiers: [basic: QuizItem[], intermediate: QuizItem[], advanced: QuizItem[]],
  pool: CorePool,
): VocabQuestion[] {
  const random = seededRandom(hashSeed('japanese-latihan', level, skill, topicId));
  const kinds = kindsBySkill[skill];
  return LEVELS.flatMap((quizLevel, levelIndex) => {
    const items = tiers[levelIndex];
    const seen = new Set<string>();
    const picked: ChoiceQuestion[] = [];
    const add = (question: ChoiceQuestion | null) => {
      if (!question || seen.has(question.question) || picked.length >= QUESTIONS_PER_LEVEL) return;
      seen.add(question.question);
      picked.push(question);
    };
    items.forEach((item) => add(authoredQuestion(item, random)));
    // Round-robin over kinds so every item is asked in several ways; a repeat falls back to another kind.
    for (let round = 0; round < kinds.length + 2 && picked.length < QUESTIONS_PER_LEVEL; round += 1) {
      items.forEach(([japanese, romaji, meaning], index) => {
        const phrase = { japanese, romaji, meaning };
        const preferred = kinds[(index + round) % kinds.length];
        for (const kind of [preferred, ...BACKUP_KINDS]) {
          const question = askJapaneseQuestion(kind, phrase, pool, random);
          if (question && !seen.has(question.question)) return add(question);
        }
      });
    }
    return picked.map((question, index) => ({
      id: `${topicId}-${quizLevel.toLowerCase()}-${index + 1}`,
      level: quizLevel,
      prompt: question.question,
      answer: question.answer,
      options: question.options,
    }));
  });
}
