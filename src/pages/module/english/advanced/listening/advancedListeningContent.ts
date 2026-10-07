import { hashSeed, shuffleOpts } from '../../../../../utils/quiz';
export type ListeningLesson = {
  id: number;
  title: string;
  outcome: string;
  overview: string;
  listeningFocus: string[];
  transcript: string;
  keySignals: string[];
  listeningTask: string;
  strategies: string[];
};

export type ListeningQuizQuestion = {
  q: string;
  opts: string[];
  ans: string;
  exp: string;
};

const specs = [
  ['Implicit Meaning & Speaker Stance', 'Infer attitude, certainty, reluctance, and implied criticism from tone and wording.', 'A speaker says a proposal is "ambitious", pauses, and adds that it would require "considerable coordination". At C1 level, you should notice that this is not simple praise; it may signal polite doubt about feasibility. The key is to combine lexical choice, intonation, hesitation, and context.'],
  ['Fast Academic Lectures', 'Follow dense lecture speech, identify main claims, supporting evidence, and lecture signposting.', 'In today\'s lecture, I want to distinguish between innovation as invention and innovation as adoption. The distinction matters because a technology can exist for years before institutions develop the incentives and infrastructure to use it effectively.'],
  ['Panel Discussions & Turn-taking', 'Track multiple speakers, agreement, disagreement, interruptions, and shifts in position.', 'I agree with the broad direction of the policy, but I would challenge the assumption that implementation will be straightforward. As Maria mentioned earlier, local authorities vary widely in resources, and that difference changes the practical impact.'],
  ['Recognising Bias & Framing', 'Identify loaded language, framing choices, selective evidence, and speaker agenda.', 'The report describes the reform as modernisation, but opponents call it deregulation. Those labels frame the same policy in very different ways: one suggests progress, while the other implies risk and loss of protection.'],
  ['Idiomatic Speech in Context', 'Understand idioms, informal reductions, and figurative meaning in advanced conversation.', 'When the manager said the team had "opened a can of worms", she did not mean the project had literally failed. She meant that solving one issue had revealed several more complicated problems.'],
  ['Inference from Intonation', 'Use pitch, stress, and pausing to infer contrast, sarcasm, uncertainty, or emphasis.', 'The phrase "That was helpful" can express gratitude, but with flat intonation and a pause before "helpful", it may signal frustration or mild sarcasm. Listening at C1 means hearing the attitude behind the words.'],
  ['News Analysis & Commentary', 'Distinguish factual reporting from interpretation, evaluation, and speculation.', 'The minister confirmed the figures, but analysts argue that the timing of the announcement is politically significant. That second part is not a fact from the minister; it is an interpretation of possible motive.'],
  ['Technical Explanations', 'Follow specialised explanations by using structure, examples, and paraphrase cues.', 'Machine learning models are not programmed with every answer. Rather, they identify patterns in data and use those patterns to make predictions. In other words, the system generalises from examples.'],
  ['Problem-Solution Interviews', 'Identify the problem, causes, proposed solutions, trade-offs, and feasibility concerns.', 'The obvious solution is to increase public transport capacity, but that takes time and investment. In the short term, flexible working hours may reduce peak congestion without requiring major infrastructure changes.'],
  ['Cultural References & Humour', 'Interpret humour, understatement, irony, and shared cultural references.', 'When he said the meeting was "a little lively", he meant it had been extremely tense. That kind of understatement is common in British-style professional humour.'],
  ['Listening for Evidence', 'Separate claims, evidence, examples, and conclusions in spoken argument.', 'The speaker first claims that remote work can improve retention. She then supports this with survey data and an example from a company that reduced staff turnover after introducing hybrid work.'],
  ['Concession & Counterargument', 'Notice when speakers concede a point before weakening or refuting it.', 'It is true that electric vehicles reduce tailpipe emissions. However, if the electricity grid remains carbon-intensive, the environmental benefit is smaller than many people assume.'],
  ['Discourse Markers in Real Speech', 'Use signposting phrases to follow complex spoken structure.', 'Let me step back for a moment. The broader issue is not simply funding, but accountability. Having said that, funding still determines whether any reform can be implemented at scale.'],
  ['Evaluating Certainty', 'Recognise degrees of certainty through modal verbs, hedges, and reporting verbs.', 'The data appears to suggest a link, but it does not prove causation. The speaker is deliberately cautious, using appears and suggest to avoid overstating the evidence.'],
  ['Negotiation Listening', 'Follow offers, conditions, priorities, non-negotiables, and compromise proposals.', 'We could accept the earlier delivery date provided the scope is reduced. What we cannot do is guarantee both the full feature set and the original deadline without increasing risk.'],
  ['Academic Q&A Sessions', 'Understand questions, challenges, clarification requests, and speaker responses.', 'That is a fair question. I would answer it in two parts: first, the sample size is limited; second, the pattern is consistent with previous studies, so the finding is still worth considering.'],
  ['Podcast Storytelling', 'Follow long-form narrative, shifts in timeline, reflection, and implied lesson.', 'At the time, she thought the rejection was a setback. Years later, she realised it had pushed her toward a field that suited her strengths far better.'],
  ['Listening to Different Accents', 'Use context and prediction to understand unfamiliar accents and reduced forms.', 'Accent variation affects vowels, rhythm, and word stress, but advanced listeners focus on meaning, context, and key content words rather than decoding every sound perfectly.'],
  ['Critical Listening for Assumptions', 'Identify hidden assumptions, missing evidence, and questionable comparisons.', 'The argument assumes that higher spending automatically leads to better outcomes. That may be true in some contexts, but without evidence about how the money is used, the conclusion is incomplete.'],
  ['Advanced Listening Simulation', 'Integrate inference, gist, detail, stance, evidence, and discourse tracking in one final lesson.', 'In this final simulation, you will listen for the speaker\'s central claim, attitude, supporting evidence, implied reservations, and the way the argument is organised from opening to conclusion.'],
] as const;

export const advancedListeningLessons: ListeningLesson[] = specs.map(([title, outcome, transcript], index) => {
  const id = index + 1;
  return {
    id,
    title,
    outcome,
    overview: `${title} trains C1 listening skills for rapid, nuanced, authentic speech. Focus on gist, detail, implication, speaker stance, and discourse structure.`,
    listeningFocus: [
      'Identify the speaker\'s main purpose before focusing on details.',
      'Listen for stance markers: hedges, emphasis, contrast, hesitation, and evaluative adjectives.',
      'Separate facts from interpretation, examples, assumptions, and conclusions.',
      'Notice discourse markers that signal transition, concession, cause, contrast, or summary.',
      'Use context to recover meaning when accent, speed, or reduced forms make individual words unclear.',
    ],
    transcript,
    keySignals: [
      'However / nevertheless / that said = contrast or qualification.',
      'It appears / may suggest / is likely to = cautious certainty.',
      'For example / in other words / to put it differently = explanation or paraphrase.',
      'The broader issue / the key point / what matters is = main argument signal.',
      'I take your point / that is a fair question = concession before response.',
    ],
    listeningTask: `Listen to the transcript for "${title}" twice. First, identify the main idea. Second, write three details: one fact, one inference, and one speaker attitude.`,
    strategies: [
      'First listening: catch the gist and speaker purpose.',
      'Second listening: note discourse markers and evidence.',
      'Third listening if needed: focus on attitude, implication, and details.',
      'Do not panic when you miss a phrase; use the next sentence to rebuild meaning.',
      'After listening, summarise the message in one sentence without copying the transcript.',
    ],
  };
});

export function getAdvancedListeningLesson(id: number) {
  return advancedListeningLessons.find((lesson) => lesson.id === id);
}

function buildAdvancedListeningQuiz(lesson: ListeningLesson): ListeningQuizQuestion[] {
  const base: ListeningQuizQuestion[] = [
    {
      q: `What is the main outcome of "${lesson.title}"?`,
      opts: [lesson.outcome, 'Memorise spelling rules only', 'Ignore tone and focus only on isolated words'],
      ans: lesson.outcome,
      exp: 'The outcome defines the advanced listening skill for this lesson.',
    },
    {
      q: 'At C1 level, what should you listen for beyond literal words?',
      opts: ['Speaker stance, implication, discourse structure, and evidence', 'Only individual vocabulary items', 'Only the first sentence'],
      ans: 'Speaker stance, implication, discourse structure, and evidence',
      exp: 'Advanced listening requires inference, structure tracking, and interpretation of attitude.',
    },
    {
      q: 'Which sentence best summarises the transcript?',
      opts: [lesson.transcript.split('.').slice(0, 2).join('.') + '.', 'The speaker only lists random vocabulary.', 'The speaker avoids giving any meaningful information.'],
      ans: lesson.transcript.split('.').slice(0, 2).join('.') + '.',
      exp: 'This option captures the central meaning from the transcript.',
    },
  ];

  const focusQuestions = lesson.listeningFocus.map((item, index) => ({
    q: `Which listening focus is useful in this lesson? (${index + 1})`,
    opts: [item, 'Translate every word before understanding the message', 'Stop listening after one unknown word'],
    ans: item,
    exp: 'This focus helps you process authentic advanced speech more effectively.',
  }));

  const signalQuestions = lesson.keySignals.map((item, index) => ({
    q: `What signal should advanced listeners recognise? (${index + 1})`,
    opts: [item, 'All connectors mean the same thing', 'Tone never changes meaning'],
    ans: item,
    exp: 'Signal phrases help you predict meaning and follow the speaker\'s logic.',
  }));

  const strategyQuestions = lesson.strategies.map((item, index) => ({
    q: `Which strategy should you apply? (${index + 1})`,
    opts: [item, 'Focus only on accent and ignore meaning', 'Never summarise after listening'],
    ans: item,
    exp: 'Strategic listening improves comprehension under speed, accent, and complexity pressure.',
  }));

  return [...base, ...focusQuestions, ...signalQuestions, ...strategyQuestions].slice(0, 20);
}

// Options are written answer-first; shuffle them (seeded per lesson) so the answer is not always A.
export function getAdvancedListeningQuiz(lesson: ListeningLesson): ListeningQuizQuestion[] {
  return shuffleOpts(buildAdvancedListeningQuiz(lesson), hashSeed('getAdvancedListeningQuiz', lesson.title));
}
