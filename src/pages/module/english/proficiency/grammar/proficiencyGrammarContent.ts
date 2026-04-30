export type ProficiencyGrammarExample = {
  sentence: string;
  explanation: string;
};

export type ProficiencyGrammarQuiz = {
  q: string;
  opts: string[];
  ans: string;
  exp: string;
};

export type ProficiencyGrammarLessonContent = {
  id: number;
  title: string;
  subtitle: string;
  objective: string;
  rules: string[];
  formulas: string[];
  examples: ProficiencyGrammarExample[];
  practice: string[];
  masteryTask: string;
  quiz: ProficiencyGrammarQuiz[];
};

const lessonSeeds = [
  ['C2 Grammar Diagnostic', 'Audit advanced control across tense, voice, mood, and emphasis'],
  ['Rare Passive Constructions', 'Passive infinitives, perfect passive, and modal passive nuance'],
  ['Advanced Inversion', 'Negative, conditional, comparative, and literary inversion'],
  ['Subjunctive and Mandative Forms', 'Formal recommendations, demands, and fixed expressions'],
  ['Clefts and Pseudo-Clefts', 'Information focus with it-clefts, wh-clefts, and all-clefts'],
  ['Ellipsis and Substitution', 'Avoid repetition with controlled omission and replacement'],
  ['Nominalisation Mastery', 'Turn clauses into precise academic noun phrases'],
  ['Participle and Verbless Clauses', 'Compress information with reduced clauses'],
  ['Complex Relative Clauses', 'Non-defining, sentential, and reduced relatives'],
  ['Modal Perfect Nuance', 'Speculation, criticism, regret, and missed obligation'],
  ['Mixed and Inverted Conditionals', 'Hypothetical time mixing and formal conditionals'],
  ['Emphatic Structures', 'Do-support, fronting, repetition, and intensifying grammar'],
  ['Discourse Grammar', 'Grammar choices that organise argument and cohesion'],
  ['Hedging and Stance Grammar', 'Modality, evidential verbs, and cautious claims'],
  ['Advanced Comparison', 'Parallel comparison, proportional structures, and degree nuance'],
  ['Reporting and Distancing', 'Passive reporting, seem/appear, and attribution control'],
  ['Register and Style Shifts', 'Formal, neutral, diplomatic, and literary alternatives'],
  ['Clause Stacking and Sentence Rhythm', 'Build long sentences without losing clarity'],
  ['Error Editing at C2', 'Detect subtle errors in agreement, reference, tense, and structure'],
  ['C2 Grammar Integration', 'Use grammar strategically for precision, elegance, and emphasis'],
];

const formulaBank = [
  ['modal + have + been + V3', 'Not only + auxiliary + subject + verb', 'It is essential that + subject + base verb'],
  ['modal + be + V3', 'modal + have + been + V3', 'be supposed/expected/intended + to have been + V3'],
  ['Never/Rarely/Seldom + auxiliary + subject + verb', 'Had/Were/Should + subject + verb, main clause', 'So/Such + adjective/noun + auxiliary + subject + verb'],
  ['It is vital/essential/imperative that + subject + base verb', 'I suggest/recommend/insist that + subject + base verb', 'If need be / so be it / suffice it to say'],
  ['It + be + focused element + that/who + clause', 'What + clause + be + focused element', 'All + subject + verb + be + focused element'],
  ['auxiliary/modal + so/not', 'do/does/did + so', 'omitted subject/verb after conjunction where meaning is recoverable'],
  ['verb/adjective clause -> noun phrase', 'because X increased -> the increase in X', 'people rejected the policy -> the rejection of the policy'],
  ['Having + V3, main clause', 'V-ing/V3 phrase, main clause', 'adjective/prepositional phrase + main clause'],
  ['noun, which + clause', 'noun + V-ing/V3 phrase', 'which refers to the whole previous clause'],
  ['must/may/might/could + have + V3', 'should/ought to + have + V3', 'need not + have + V3'],
  ['If + past perfect, would + base verb now', 'If + past simple, would have + V3', 'Had/Were/Should + subject + verb'],
  ['do/does/did + base verb', 'fronted phrase + subject + verb', 'What + subject + auxiliary + verb + is + base verb'],
  ['This/that/these + noun', 'the former/the latter', 'such + noun / this pattern / these findings'],
  ['may/might/could + base verb', 'appear/seem/tend + to + verb', 'It is plausible/likely/unlikely that'],
  ['the + comparative, the + comparative', 'as much/many + noun + as', 'no less/more + adjective + than'],
  ['It is said/believed/claimed that', 'subject + is said/believed/claimed + to + verb', 'appear/seem + to have + V3'],
  ['formal nominal phrase -> neutral clause', 'direct imperative -> diplomatic modal', 'literary inversion -> neutral word order'],
  ['subordinate clause + main clause + non-defining clause', 'semicolon joining related independent clauses', 'dash/colon for explanation or emphasis'],
  ['pronoun reference check', 'parallel structure check', 'tense sequence check'],
  ['choose structure by purpose: emphasis, caution, compression, cohesion, or style', 'combine two or more advanced structures only when clarity remains high'],
];

function makeExamples(id: number, title: string): ProficiencyGrammarExample[] {
  const formulas = formulaBank[id - 1];
  return [
    {
      sentence: `Had the evidence been scrutinised earlier, the conclusion might have been revised.`,
      explanation: `Uses ${formulas[0]} to create formal precision and show time relationship.`,
    },
    {
      sentence: `What the argument overlooks is the distinction between feasibility and desirability.`,
      explanation: `Focuses the reader's attention on a key conceptual contrast in ${title.toLowerCase()}.`,
    },
    {
      sentence: `The proposal appears to have been designed with efficiency in mind, though its ethical implications remain unresolved.`,
      explanation: `Combines distancing, perfect aspect, and concession for C2-level nuance.`,
    },
  ];
}

function makeQuiz(id: number, title: string): ProficiencyGrammarQuiz[] {
  const formulas = formulaBank[id - 1];
  const base: ProficiencyGrammarQuiz[] = [
    {
      q: `What is the main grammar target in "${title}"?`,
      opts: ['precision, emphasis, register, and controlled complexity', 'basic word order only', 'memorising unrelated vocabulary'],
      ans: 'precision, emphasis, register, and controlled complexity',
      exp: 'C2 grammar is strategic: it controls meaning, style, caution, and emphasis.',
    },
    {
      q: `Which formula belongs to this lesson?`,
      opts: [formulas[0], 'subject + be + adjective only', 'noun + noun + noun with no grammar'],
      ans: formulas[0],
      exp: `${formulas[0]} is one of the lesson structures.`,
    },
    {
      q: 'Which sentence sounds most C2?',
      opts: ['What the argument overlooks is the distinction between feasibility and desirability.', 'This thing is good and also bad.', 'I am very very agree.'],
      ans: 'What the argument overlooks is the distinction between feasibility and desirability.',
      exp: 'The cleft structure focuses the key point precisely and formally.',
    },
    {
      q: 'Why should C2 writers avoid unnecessary complexity?',
      opts: ['because complexity must serve meaning and clarity', 'because advanced grammar is always wrong', 'because short sentences are always better'],
      ans: 'because complexity must serve meaning and clarity',
      exp: 'C2 grammar is purposeful, not decorative.',
    },
  ];

  const generated = Array.from({ length: 16 }, (_, index) => {
    const formula = formulas[index % formulas.length];
    return {
      q: `Lesson ${id} check ${index + 5}: when should you use "${formula}"?`,
      opts: ['when it improves precision, emphasis, or register', 'when it makes the sentence harder for no reason', 'when you want to avoid grammar completely'],
      ans: 'when it improves precision, emphasis, or register',
      exp: `"${formula}" is useful only when it supports meaning and reader/listener clarity.`,
    };
  });

  return [...base, ...generated];
}

export const proficiencyGrammarLessons: ProficiencyGrammarLessonContent[] = lessonSeeds.map(([title, subtitle], index) => {
  const id = index + 1;
  const formulas = formulaBank[index];
  return {
    id,
    title,
    subtitle,
    objective: `By the end of this lesson, learners can use ${title.toLowerCase()} with C2-level precision, register control, and stylistic purpose.`,
    rules: [
      'Choose advanced grammar only when it clarifies meaning, focus, or stance.',
      'Check the relationship between time, voice, modality, and information focus.',
      'Use formal structures for academic or professional contexts, not casual speech by default.',
      'Maintain readability: long sentences still need clear rhythm and reference.',
      'Revise every advanced structure for accuracy, naturalness, and purpose.',
    ],
    formulas,
    examples: makeExamples(id, title),
    practice: [
      `Transform one basic sentence into a C2 sentence using: ${formulas[0]}.`,
      `Write one sentence using: ${formulas[1]}.`,
      `Write one sentence using: ${formulas[2]}.`,
      'Rewrite your sentence in a simpler style and compare the change in tone.',
      'Find one possible ambiguity and revise it for clarity.',
    ],
    masteryTask: `Write a 120-word paragraph using at least three structures from this lesson. The paragraph must include one contrast, one cautious claim, and one emphatic sentence.`,
    quiz: makeQuiz(id, title),
  };
});

export function getProficiencyGrammarLesson(id: number) {
  return proficiencyGrammarLessons.find((lesson) => lesson.id === id) ?? proficiencyGrammarLessons[0];
}
