import { hashSeed, shuffleOpts } from '../../../../../utils/quiz';
export type ProficiencyPronunciationLine = {
  text: string;
  focus: string;
  note: string;
};

export type ProficiencyPronunciationQuiz = {
  q: string;
  opts: string[];
  ans: string;
  exp: string;
};

export type ProficiencyPronunciationLessonContent = {
  id: number;
  title: string;
  subtitle: string;
  objective: string;
  concepts: string[];
  modelLines: ProficiencyPronunciationLine[];
  drills: string[];
  speakingTask: string;
  selfCheck: string[];
  quiz: ProficiencyPronunciationQuiz[];
};

const lessonSeeds = [
  ['C2 Pronunciation Diagnostic', 'Benchmark clarity, prosody, pacing, and listener comfort'],
  ['Precision Vowels in Dense Speech', 'Control subtle vowel contrasts under natural speed'],
  ['Consonant Clusters at Speed', 'Keep complex endings clear without over-articulation'],
  ['Advanced Word Stress', 'Handle long academic and professional vocabulary'],
  ['Rhythm and Compression', 'Use stress-timed rhythm in complex utterances'],
  ['Connected Speech Mastery', 'Link, reduce, and blend while remaining intelligible'],
  ['Elision with Control', 'Drop sounds naturally without losing grammar'],
  ['Assimilation and Coarticulation', 'Recognise and produce natural sound changes'],
  ['Weak Forms in Formal Speech', 'Reduce function words while keeping authority'],
  ['Intonation for Nuance', 'Signal certainty, reservation, irony, and politeness'],
  ['Nuclear Stress and Meaning', 'Move prominence to change implication'],
  ['Discourse Prosody', 'Use pitch and pausing to structure long speech'],
  ['Accent Clarity and Identity', 'Improve intelligibility without erasing accent'],
  ['Diplomatic Delivery', 'Sound tactful in disagreement and correction'],
  ['Academic Presentation Voice', 'Deliver complex points with calm authority'],
  ['Debate and Rebuttal Prosody', 'Emphasise contrast under pressure'],
  ['Storytelling Voice Control', 'Use pace, pitch, and pause for narrative effect'],
  ['Media and Podcast Delivery', 'Sustain engaging long-form spoken delivery'],
  ['Impromptu Pronunciation Control', 'Maintain clarity with little preparation'],
  ['C2 Pronunciation Simulation', 'Integrate clarity, rhythm, tone, and rhetorical control'],
];

const conceptPool = [
  'Pronunciation at C2 is about meaning control, not accent imitation.',
  'Key words should be more prominent than function words.',
  'Pauses should mark thought groups, contrast, and emphasis.',
  'Reduction should support fluency without hiding grammatical endings.',
  'Pitch movement should match stance: certain, cautious, ironic, or diplomatic.',
];

const lineBank = [
  'To put it more precisely, the evidence is compelling but incomplete.',
  'I would frame the issue differently, particularly in light of recent developments.',
  'The distinction is subtle, yet it changes the interpretation considerably.',
  'That argument is persuasive up to a point, but it overlooks implementation risks.',
  'What matters here is not speed, but whether the listener can follow the logic.',
  'Taken together, these factors suggest a more cautious conclusion.',
];

const focusBank = [
  'thought grouping and final fall',
  'contrastive stress and controlled pacing',
  'weak forms and schwa reduction',
  'pitch range for qualification',
  'final consonant clarity',
  'synthesis tone and listener-friendly closure',
];

function makeLines(lesson: number): ProficiencyPronunciationLine[] {
  return lineBank.map((text, index) => ({
    text,
    focus: focusBank[(index + lesson - 1) % focusBank.length],
    note: `Mark the main stressed word, then repeat at slow, natural, and presentation speed. Keep the delivery clear without sounding mechanical.`,
  }));
}

function makeQuiz(id: number, title: string, lines: ProficiencyPronunciationLine[]): ProficiencyPronunciationQuiz[] {
  const base: ProficiencyPronunciationQuiz[] = [
    {
      q: `What is the main target in "${title}"?`,
      opts: ['clear meaning, controlled prosody, and listener comfort', 'copying one native accent perfectly', 'speaking as fast as possible'],
      ans: 'clear meaning, controlled prosody, and listener comfort',
      exp: 'C2 pronunciation focuses on intelligibility, nuance, rhythm, and rhetorical control.',
    },
    {
      q: 'What should happen to function words in natural English rhythm?',
      opts: ['They are often reduced unless they carry contrast', 'They must always be stressed equally', 'They should be deleted from every sentence'],
      ans: 'They are often reduced unless they carry contrast',
      exp: 'Weak forms help English rhythm, but important grammar must remain understandable.',
    },
    {
      q: `Which sentence is a model line for this lesson?`,
      opts: [lines[0].text, 'My name is John.', 'This is a table.'],
      ans: lines[0].text,
      exp: `The line practises ${lines[0].focus}.`,
    },
    {
      q: 'A C2 speaker uses pauses to:',
      opts: ['organise thought groups and guide listener attention', 'interrupt every word', 'avoid pronunciation completely'],
      ans: 'organise thought groups and guide listener attention',
      exp: 'Strategic pausing makes complex speech easier to process.',
    },
  ];

  const generated = Array.from({ length: 16 }, (_, index) => {
    const line = lines[index % lines.length];
    return {
      q: `Lesson ${id} practice ${index + 5}: how should you deliver "${line.text}"?`,
      opts: [`Focus on ${line.focus}`, 'stress every syllable equally', 'remove all pauses and endings'],
      ans: `Focus on ${line.focus}`,
      exp: line.note,
    };
  });

  return [...base, ...generated];
}

export const proficiencyPronunciationLessons: ProficiencyPronunciationLessonContent[] = lessonSeeds.map(([title, subtitle], index) => {
  const id = index + 1;
  const lines = makeLines(id);

  return {
    id,
    title,
    subtitle,
    objective: `By the end of this lesson, learners can apply ${title.toLowerCase()} with C2-level clarity, natural rhythm, nuanced tone, and confident public delivery.`,
    concepts: conceptPool.map((concept, conceptIndex) => conceptIndex === 0 ? `${concept} In this lesson, apply it to ${title.toLowerCase()}.` : concept),
    modelLines: lines,
    drills: [
      'Listen to each model line, then shadow it three times: slow, natural, and presentation speed.',
      'Underline the nuclear stress in each sentence and change it once to observe the meaning shift.',
      'Record a 45-second response using at least three model lines.',
      'Replay your recording and check whether key words stand out clearly.',
      'Repeat the response with calmer pacing and fewer unnecessary pauses.',
    ],
    speakingTask: `Record a one-minute C2 response using ${title.toLowerCase()}. Include one contrast, one qualified claim, and one synthesising final sentence.`,
    selfCheck: [
      'My stressed words match the intended meaning.',
      'My function words are reduced naturally but still clear.',
      'My pauses help the listener follow the structure.',
      'My final consonants and grammar endings remain audible.',
      'My tone matches the stance: certain, cautious, diplomatic, or emphatic.',
    ],
    // Options are written answer-first; shuffled per lesson so the answer is not always A.
    quiz: shuffleOpts(makeQuiz(id, title, lines), hashSeed('proficiencyPronunciationContent', title)),
  };
});

export function getProficiencyPronunciationLesson(id: number) {
  return proficiencyPronunciationLessons.find((lesson) => lesson.id === id) ?? proficiencyPronunciationLessons[0];
}
