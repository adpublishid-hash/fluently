import { hashSeed, shuffleOpts } from '../../../../../utils/quiz';
export type ProficiencyReadingQuiz = {
  q: string;
  opts: string[];
  ans: string;
  exp: string;
};

export type ProficiencyReadingLessonContent = {
  id: number;
  title: string;
  subtitle: string;
  objective: string;
  passage: string;
  readingFocus: string[];
  keyConcepts: string[];
  analysisTask: string;
  strategies: string[];
  quiz: ProficiencyReadingQuiz[];
};

const lessonSeeds = [
  ['Dense Argument Mapping', 'Trace claims, warrants, evidence, and implicit assumptions'],
  ['Research Article Critique', 'Evaluate methodology, limitations, and cautious claims'],
  ['Policy Text Analysis', 'Read institutional language, trade-offs, and hidden priorities'],
  ['Literary Prose Interpretation', 'Analyse voice, ambiguity, imagery, and subtext'],
  ['Editorial Bias and Framing', 'Identify stance, framing, emphasis, and omission'],
  ['Legal and Contractual Reading', 'Interpret conditions, exceptions, and obligations'],
  ['Philosophical Texts', 'Follow abstract reasoning and conceptual distinctions'],
  ['Historical Commentary', 'Separate narrative, evidence, interpretation, and ideology'],
  ['Scientific Popularisation', 'Distinguish simplified explanation from technical accuracy'],
  ['Rhetorical Structure', 'Recognise analogy, concession, refutation, and synthesis'],
  ['Satire and Irony', 'Read humour, understatement, contradiction, and implied criticism'],
  ['Comparative Reviews', 'Compare criteria, judgement, and evaluative language'],
  ['Financial and Economic Texts', 'Interpret risk, causation, projection, and uncertainty'],
  ['Technology Ethics', 'Analyse innovation claims, harms, and responsibility'],
  ['Cultural Criticism', 'Read identity, representation, and contested interpretation'],
  ['Academic Literature Review', 'Track agreement, gap, tension, and contribution'],
  ['Long-Form Journalism', 'Follow narrative evidence and investigative sequencing'],
  ['Complex Instructions', 'Read multi-step procedures, constraints, and exceptions'],
  ['Style and Register Analysis', 'Evaluate tone, formality, density, and audience design'],
  ['C2 Reading Simulation', 'Integrate inference, evaluation, synthesis, and precision'],
];

const passageTopics = [
  'public trust in expert institutions',
  'the reproducibility debate in social research',
  'urban climate adaptation policy',
  'memory and moral ambiguity in contemporary fiction',
  'media framing during technological disruption',
  'data privacy obligations in service agreements',
  'freedom, responsibility, and collective action',
  'the political uses of historical memory',
  'the translation of scientific uncertainty for general audiences',
  'the architecture of persuasive public argument',
  'satirical criticism of professional optimism',
  'contrasting reviews of the same cultural work',
  'inflation, confidence, and household behaviour',
  'artificial intelligence and institutional accountability',
  'cultural heritage in a global marketplace',
  'scholarly disagreement in emerging fields',
  'investigative reporting on supply chains',
  'compliance procedures in complex organisations',
  'register choices in expert communication',
  'an integrated C2 reading assessment text',
];

function makePassage(index: number) {
  const topic = passageTopics[index];
  return `The text examines ${topic}, but its argument is deliberately indirect. Rather than presenting a single conclusion, it moves through a sequence of qualified claims: first, that the issue cannot be understood through one cause alone; second, that apparently neutral language often carries institutional priorities; and third, that responsible interpretation requires attention to what the writer leaves unsaid. The author uses contrast to challenge a simple reading. On the surface, the passage appears balanced, yet its examples consistently favour caution over enthusiasm. This does not mean the writer rejects change; rather, the writer questions whether change has been described with enough precision. A C2 reader should notice the distinction between evidence and implication, between stated evaluation and implied judgement, and between a persuasive example and a representative one. The final paragraph therefore functions less as a summary than as a controlled warning: sophisticated readers should accept complexity without allowing complexity to become an excuse for vague thinking.`;
}

const focusBank = [
  'Identify the central claim and separate it from supporting commentary.',
  'Underline hedging language such as "appears", "suggests", "may", and "arguably".',
  'Notice where the author shifts from evidence to interpretation.',
  'Track contrast markers and ask what position they are softening or challenging.',
  'Infer the author stance from emphasis, omission, and repeated vocabulary.',
];

const conceptBank = [
  'Claim: the main point the writer wants the reader to accept.',
  'Warrant: the reasoning that connects evidence to the claim.',
  'Hedging: cautious language used to avoid overclaiming.',
  'Framing: the way a topic is presented to shape interpretation.',
  'Implication: meaning suggested indirectly rather than stated explicitly.',
];

function makeQuiz(id: number, title: string): ProficiencyReadingQuiz[] {
  const base: ProficiencyReadingQuiz[] = [
    {
      q: `In "${title}", what should a C2 reader prioritise?`,
      opts: ['inference, argument structure, stance, and precise evidence', 'reading only the first sentence', 'memorising every word without interpretation'],
      ans: 'inference, argument structure, stance, and precise evidence',
      exp: 'C2 reading requires evaluation of meaning, not only surface comprehension.',
    },
    {
      q: 'What does hedging usually show in complex texts?',
      opts: ['caution or limited certainty', 'a spelling mistake', 'a command to the reader'],
      ans: 'caution or limited certainty',
      exp: 'Words like "may", "appears", and "arguably" signal careful qualification.',
    },
    {
      q: 'Which reading action best reveals implied stance?',
      opts: ['checking emphasis, contrast, examples, and omission', 'ignoring repeated vocabulary', 'choosing the shortest paragraph'],
      ans: 'checking emphasis, contrast, examples, and omission',
      exp: 'Writers often reveal attitude through patterning rather than direct statements.',
    },
    {
      q: 'A representative example is:',
      opts: ['an example that fairly reflects a wider pattern', 'the most dramatic example only', 'an unrelated anecdote'],
      ans: 'an example that fairly reflects a wider pattern',
      exp: 'C2 readers should question whether examples prove the wider claim.',
    },
  ];

  const generated = Array.from({ length: 16 }, (_, index) => {
    const focus = focusBank[index % focusBank.length];
    return {
      q: `Lesson ${id} analysis ${index + 5}: which strategy is most useful?`,
      opts: [focus, 'skip all qualifying words', 'treat every example as proof'],
      ans: focus,
      exp: `${focus} This prevents oversimplified reading.`,
    };
  });

  return [...base, ...generated];
}

export const proficiencyReadingLessons: ProficiencyReadingLessonContent[] = lessonSeeds.map(([title, subtitle], index) => ({
  id: index + 1,
  title,
  subtitle,
  objective: `By the end of this lesson, learners can read ${title.toLowerCase()} at C2 level by interpreting explicit meaning, implicit stance, rhetorical design, and evidence quality.`,
  passage: makePassage(index),
  readingFocus: focusBank.map((focus, focusIndex) => focusIndex === 0 ? `${focus} Apply it to ${passageTopics[index]}.` : focus),
  keyConcepts: conceptBank,
  analysisTask: `Write a 120-word reading response explaining the author's main claim, one implied assumption, one example of hedging, and one limitation in the argument.`,
  strategies: [
    'Read once for global meaning, then reread for structure.',
    'Mark claims, evidence, concessions, and final synthesis in different colours.',
    'Ask whether each example is representative, illustrative, or rhetorical.',
    'Separate what the writer states from what the writer implies.',
    'Summarise the text in one sentence without copying the original wording.',
  ],
  // Options are written answer-first; shuffled per lesson so the answer is not always A.
    quiz: shuffleOpts(makeQuiz(index + 1, title), hashSeed('proficiencyReadingContent', title)),
}));

export function getProficiencyReadingLesson(id: number) {
  return proficiencyReadingLessons.find((lesson) => lesson.id === id) ?? proficiencyReadingLessons[0];
}
