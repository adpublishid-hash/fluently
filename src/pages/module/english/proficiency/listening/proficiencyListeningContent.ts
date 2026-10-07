import { hashSeed, shuffleOpts } from '../../../../../utils/quiz';
export type ProficiencyListeningQuiz = {
  q: string;
  opts: string[];
  ans: string;
  exp: string;
};

export type ProficiencyListeningLessonContent = {
  id: number;
  title: string;
  subtitle: string;
  objective: string;
  transcript: string;
  listeningFocus: string[];
  keySignals: string[];
  listeningTask: string;
  strategies: string[];
  quiz: ProficiencyListeningQuiz[];
};

const lessonSeeds = [
  ['C2 Listening Diagnostic', 'Benchmark gist, detail, stance, inference, and discourse tracking'],
  ['Rapid Academic Monologues', 'Follow dense arguments with compressed examples and qualifications'],
  ['Implicit Stance and Attitude', 'Hear reservation, doubt, irony, and guarded approval'],
  ['Specialised Professional Briefings', 'Track priorities, risk, urgency, and decision logic'],
  ['Legal and Policy Listening', 'Understand conditions, exceptions, obligations, and implications'],
  ['Research Seminar Q&A', 'Follow challenges, clarifications, limitations, and defence of claims'],
  ['Panel Debate Dynamics', 'Track multiple speakers, overlap, rebuttal, and shifting positions'],
  ['Podcast Long-Form Argument', 'Follow narrative, analysis, reflection, and delayed thesis'],
  ['Different Accents at Speed', 'Use context and prediction with varied accent patterns'],
  ['Humour, Irony, and Understatement', 'Interpret meaning beyond literal wording'],
  ['Crisis Communication', 'Distinguish certainty, reassurance, limitation, and accountability'],
  ['Negotiation Listening', 'Identify priorities, concessions, conditions, and non-negotiables'],
  ['Data Commentary Audio', 'Hear trends, anomalies, projections, and cautious interpretation'],
  ['Philosophical Discussion', 'Follow abstract distinctions and conceptual reasoning'],
  ['Literary and Cultural Commentary', 'Interpret tone, symbolism, and evaluative nuance'],
  ['Media Framing and Bias', 'Detect loaded language, omission, emphasis, and agenda'],
  ['Technical Explanations', 'Decode complex processes through signposting and analogy'],
  ['Intercultural Pragmatics', 'Hear politeness, indirectness, register, and social intent'],
  ['Impromptu Speech Analysis', 'Follow spontaneous structure, repair, and reformulation'],
  ['C2 Listening Simulation', 'Integrate inference, evidence, stance, structure, and detail'],
];

const transcriptTopics = [
  'whether expertise can retain public trust in an age of rapid information',
  'how universities should define originality in research',
  'why polite approval may still conceal serious reservation',
  'a strategic decision that balances speed, cost, and reputational risk',
  'the difference between formal compliance and substantive accountability',
  'a researcher responding to a methodological challenge',
  'a panel moving from agreement to qualified disagreement',
  'a podcast host reflecting on failure as a form of evidence',
  'a speaker whose accent affects rhythm but not the core message',
  'a professional using understatement to criticise a poor decision',
  'an organisation explaining what is known, unknown, and being investigated',
  'two parties negotiating scope, deadline, and acceptable compromise',
  'data that appears positive but contains a significant anomaly',
  'the tension between freedom, obligation, and collective responsibility',
  'a critic discussing ambiguity in a contemporary novel',
  'how two news outlets frame the same policy differently',
  'a technical expert explaining AI systems through analogy',
  'a manager softening direct criticism in an intercultural meeting',
  'a speaker correcting their answer while preserving fluency',
  'a complete C2 listening performance involving nuance and structure',
];

const focus = [
  'Identify the speaker purpose before focusing on details.',
  'Separate fact, interpretation, implication, and evaluation.',
  'Notice stance markers: hedges, pauses, stress, and evaluative adjectives.',
  'Track discourse markers that signal contrast, concession, example, or synthesis.',
  'Use context to recover meaning when speed, accent, or reduction obscures words.',
];

const signals = [
  'That said / having said that = concession or qualification.',
  'It appears / it may suggest / arguably = cautious certainty.',
  'The key point / what matters here / the broader issue = main argument signal.',
  'In other words / to put it differently = paraphrase or clarification.',
  'I take your point / that is a fair question = acknowledgement before response.',
];

function makeTranscript(index: number) {
  const topic = transcriptTopics[index];
  return `In this extract, the speaker discusses ${topic}. The argument is not delivered as a simple list of facts; it unfolds through qualification, contrast, and selective emphasis. At first, the speaker appears to support the main proposal, but a longer pause before the word "feasible" suggests hesitation. The phrase "in principle" also limits the endorsement, implying that the idea may be attractive in theory but difficult in practice. Later, the speaker introduces an example not to prove the claim absolutely, but to show why the issue is more contingent than it first appears. A C2 listener should therefore identify the central claim, the speaker's implied reservation, the evidence used, and the point at which the speaker moves from description to evaluation.`;
}

function makeQuiz(id: number, title: string, transcript: string): ProficiencyListeningQuiz[] {
  const base: ProficiencyListeningQuiz[] = [
    {
      q: `What is the main C2 listening skill in "${title}"?`,
      opts: ['tracking stance, implication, structure, and evidence', 'hearing only isolated words', 'ignoring tone and hesitation'],
      ans: 'tracking stance, implication, structure, and evidence',
      exp: 'C2 listening requires interpretation of structure, attitude, implication, and detail.',
    },
    {
      q: 'What does "in principle" often signal?',
      opts: ['limited or qualified agreement', 'complete rejection', 'a spelling correction'],
      ans: 'limited or qualified agreement',
      exp: '"In principle" often means the speaker accepts an idea theoretically but may doubt the practical reality.',
    },
    {
      q: 'Which listening clue can show hesitation or reservation?',
      opts: ['pause, stress, hedging, and cautious adjectives', 'only volume', 'the first word alone'],
      ans: 'pause, stress, hedging, and cautious adjectives',
      exp: 'Advanced listeners combine verbal and prosodic clues.',
    },
    {
      q: 'Which summary best fits the transcript?',
      opts: [transcript.split('.').slice(0, 2).join('.') + '.', 'The speaker lists random vocabulary.', 'The speaker refuses to discuss the topic.'],
      ans: transcript.split('.').slice(0, 2).join('.') + '.',
      exp: 'This captures the topic and structure of the extract.',
    },
  ];

  const generated = Array.from({ length: 16 }, (_, index) => {
    const strategy = focus[index % focus.length];
    return {
      q: `Lesson ${id} listening check ${index + 5}: what should you do?`,
      opts: [strategy, 'stop listening after one missed word', 'treat every phrase as literal'],
      ans: strategy,
      exp: `${strategy} This is essential for C2-level listening accuracy.`,
    };
  });

  return [...base, ...generated];
}

export const proficiencyListeningLessons: ProficiencyListeningLessonContent[] = lessonSeeds.map(([title, subtitle], index) => {
  const transcript = makeTranscript(index);
  return {
    id: index + 1,
    title,
    subtitle,
    objective: `By the end of this lesson, learners can handle ${title.toLowerCase()} by identifying gist, detail, implied attitude, discourse structure, and evidence quality.`,
    transcript,
    listeningFocus: focus,
    keySignals: signals,
    listeningTask: `Listen to the audio twice. First, write the central claim. Second, identify one fact, one inference, one attitude clue, and one discourse marker.`,
    strategies: [
      'First listening: capture topic, speaker purpose, and overall stance.',
      'Second listening: note evidence, examples, hedges, and contrast markers.',
      'Third listening: check implied attitude, certainty, and evaluation.',
      'Recover from missed words by using surrounding context and the next sentence.',
      'Summarise the extract in one sentence without copying the transcript.',
    ],
    // Options are written answer-first; shuffled per lesson so the answer is not always A.
    quiz: shuffleOpts(makeQuiz(index + 1, title, transcript), hashSeed('proficiencyListeningContent', title)),
  };
});

export function getProficiencyListeningLesson(id: number) {
  return proficiencyListeningLessons.find((lesson) => lesson.id === id) ?? proficiencyListeningLessons[0];
}
