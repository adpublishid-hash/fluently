import { seededRandom, seededShuffle } from '../../../../../utils/quiz';

export type VocabQuizWord = { word: string; type: string; meaning: string; example: string; collocations: string[] };
export type VocabQuizQuestion = { q: string; opts: string[]; ans: string; exp: string };

type Form = 'meaning' | 'define' | 'gap' | 'collocation';
const FORMS: Form[] = ['meaning', 'define', 'gap', 'collocation'];

const escape = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const blankOut = (text: string, word: string) => text.replace(new RegExp(escape(word), 'i'), '_____');

function ask(form: Form, item: VocabQuizWord, others: VocabQuizWord[], random: () => number): VocabQuizQuestion | null {
  // Distractors of the same part of speech first, so options are grammatically plausible.
  const pool = seededShuffle([...others.filter((other) => other.type === item.type), ...others.filter((other) => other.type !== item.type)], random)
    .filter((other, index, list) => list.findIndex((entry) => entry.word === other.word) === index)
    .slice(0, 3);
  if (pool.length < 2) return null;
  if (form === 'meaning') {
    return { q: `What does "${item.word}" mean?`, opts: [item.meaning, ...pool.map((other) => other.meaning)], ans: item.meaning, exp: `"${item.word}" (${item.type.toLowerCase()}) means ${item.meaning}.` };
  }
  if (form === 'define') {
    return { q: `Which word means "${item.meaning}"?`, opts: [item.word, ...pool.map((other) => other.word)], ans: item.word, exp: `"${item.word}" means ${item.meaning}. Example: ${item.example}` };
  }
  if (form === 'gap') {
    if (!item.example.toLowerCase().includes(item.word.toLowerCase())) return null;
    return { q: `Complete the sentence: ${blankOut(item.example, item.word)}`, opts: [item.word, ...pool.map((other) => other.word)], ans: item.word, exp: `"${item.example}"` };
  }
  const collocation = item.collocations.find((entry) => entry.toLowerCase().includes(item.word.toLowerCase()));
  if (!collocation) return null;
  return { q: `Complete the collocation: "${blankOut(collocation, item.word)}"`, opts: [item.word, ...pool.map((other) => other.word)], ans: item.word, exp: `"${collocation}" is a natural collocation with "${item.word}".` };
}

/**
 * A vocabulary quiz in four forms (meaning, definition, sentence gap,
 * collocation gap). Each word is asked in two forms picked by its position;
 * review lessons pass the words' original positions + 1 so they get the two
 * forms the topic lesson skipped. Options are answer-first (callers shuffle).
 */
export function buildVocabQuiz(words: VocabQuizWord[], seed: number, positions?: number[], length = 20): VocabQuizQuestion[] {
  const random = seededRandom(seed);
  const plan = words.flatMap((item, index) => {
    const position = positions?.[index] ?? index;
    return [FORMS[position % 4], FORMS[(position + 2) % 4]].map((form) => ({ form, item }));
  });
  const rounds = [plan.filter((_, index) => index % 2 === 0), plan.filter((_, index) => index % 2 === 1)].flat();
  return rounds
    .map(({ form, item }) => ask(form, item, words.filter((other) => other.word !== item.word), random))
    .filter((question): question is VocabQuizQuestion => question !== null)
    .slice(0, length);
}
