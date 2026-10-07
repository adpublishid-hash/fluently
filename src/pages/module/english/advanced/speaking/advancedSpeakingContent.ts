import { hashSeed, shuffleOpts } from '../../../../../utils/quiz';
export type SpeakingExpression = {
  label: string;
  phrase: string;
  function: string;
};

export type SpeakingLesson = {
  id: number;
  title: string;
  outcome: string;
  overview: string;
  theory: string[];
  expressions: SpeakingExpression[];
  modelResponse: string;
  drills: string[];
  speakingTask: string;
  assessment: string[];
};

export type SpeakingQuizQuestion = {
  q: string;
  opts: string[];
  ans: string;
  exp: string;
};

const specs = [
  {
    title: 'Fluency Benchmark',
    outcome: 'Sustain a nuanced C1 monologue and discussion contribution with clear organisation, repair strategies, and natural pacing.',
    focus: ['discourse organisation', 'self-correction', 'hedging', 'lexical range', 'coping strategies'],
    task: 'Record a 3-minute response evaluating your own English fluency and set two concrete improvement targets.',
    model: 'To begin with, I would define fluency not merely as speed, but as the ability to communicate complex ideas without placing excessive strain on the listener. That said, speed still matters to some extent, particularly in spontaneous discussion. In my own case, I can usually sustain a conversation, although I occasionally overuse familiar phrases when the topic becomes abstract. What I need to refine is my ability to paraphrase smoothly and to signal my argument more explicitly.',
  },
  {
    title: 'Debate & Argumentation',
    outcome: 'Build persuasive spoken arguments using claims, evidence, counterarguments, and rebuttal.',
    focus: ['claim-evidence-link', 'counterargument', 'rebuttal', 'concession', 'turn-taking'],
    task: 'Debate whether universities should replace traditional exams with continuous assessment.',
    model: 'I take your point that exams can provide a standardised measure of performance; however, I am not entirely persuaded that they capture the full range of student ability. Continuous assessment, if designed rigorously, can evaluate research, collaboration, and sustained effort. The key issue, therefore, is not whether exams should disappear entirely, but whether they should remain the dominant form of assessment.',
  },
  {
    title: 'Speculating & Hedging',
    outcome: 'Discuss uncertain information using cautious, precise, and academically appropriate spoken language.',
    focus: ['may/might/could', 'appears to', 'it is plausible that', 'tentative conclusions', 'degree of certainty'],
    task: 'Speculate about how AI might change professional communication over the next decade.',
    model: 'It seems plausible that AI will streamline routine communication, particularly in administrative contexts. Nevertheless, it would be premature to assume that human judgement will become less important. If anything, the ability to evaluate AI-generated language may become a core professional skill. In other words, the technology may change the nature of communication rather than replace communicators altogether.',
  },
  {
    title: 'Narrating & Storytelling',
    outcome: 'Tell sophisticated stories with pacing, tension, reflection, and precise past-time narration.',
    focus: ['narrative arc', 'past perfect', 'scene-setting', 'reflection', 'dramatic emphasis'],
    task: 'Tell a story about a difficult decision that taught you something significant.',
    model: 'A few years ago, I found myself having to choose between a secure opportunity and a riskier path that aligned more closely with my long-term goals. At first, the safer option seemed obviously sensible. However, the more I reflected on it, the more I realised that avoiding risk was not the same as making a wise decision. Looking back, that moment taught me that confidence often comes after action, not before it.',
  },
  {
    title: 'Describing Trends & Data',
    outcome: 'Present data orally with overview statements, trend language, comparisons, and cautious interpretation.',
    focus: ['overall trend', 'sharp/slight changes', 'peaks and dips', 'comparison', 'interpretation'],
    task: 'Describe a chart showing remote work adoption from 2015 to 2025.',
    model: 'Overall, the data suggests a gradual rise in remote work before a dramatic increase around 2020. After that point, the figure appears to stabilise rather than return to pre-pandemic levels. What is particularly striking is that hybrid work remains significantly more common than fully remote work, which may indicate that many organisations value flexibility but still want some face-to-face interaction.',
  },
  {
    title: 'Problem-Solution Discussion',
    outcome: 'Analyse complex problems and propose realistic, prioritised solutions in spoken discussion.',
    focus: ['problem framing', 'root causes', 'feasibility', 'trade-offs', 'prioritising solutions'],
    task: 'Discuss how a city should reduce traffic congestion without harming low-income commuters.',
    model: 'The problem should not be framed simply as too many cars on the road. A deeper issue is that many commuters lack reliable alternatives. For that reason, congestion pricing may be effective only if it is introduced alongside affordable public transport. Otherwise, the policy risks penalising people who have limited choice. A more balanced approach would combine investment, incentives, and gradual restrictions.',
  },
  {
    title: 'Compare & Contrast',
    outcome: 'Compare abstract ideas with nuance, balanced judgement, and precise contrast language.',
    focus: ['whereas/while', 'similarity', 'difference', 'criteria', 'balanced judgement'],
    task: 'Compare leadership in startups and leadership in large organisations.',
    model: 'Leadership in startups tends to require adaptability and tolerance for ambiguity, whereas leadership in large organisations often depends on coordination, delegation, and institutional awareness. That is not to say one is inherently more difficult than the other. Rather, they demand different strengths: one rewards speed and experimentation, while the other rewards consistency and strategic alignment.',
  },
  {
    title: 'Diplomatic Language',
    outcome: 'Express disagreement, criticism, requests, and negotiation points tactfully.',
    focus: ['softening', 'indirect disagreement', 'face-saving language', 'negotiation phrases', 'polite interruption'],
    task: 'Role-play a meeting where you disagree with a proposed deadline but need to remain professional.',
    model: 'I can see why that deadline would be attractive from a planning perspective. My concern, though, is that it may compromise the quality of the final deliverable. Would it be possible to consider a phased submission instead? That way, we could provide an initial version on time while still allowing space for proper review.',
  },
  {
    title: 'Academic Seminar Speaking',
    outcome: 'Contribute to seminar discussion using evidence, clarification questions, and synthesis.',
    focus: ['referring to sources', 'building on ideas', 'challenging politely', 'synthesis', 'academic register'],
    task: 'Discuss whether economic growth should remain the main measure of national progress.',
    model: 'Building on that point, I would argue that GDP remains useful but insufficient. It captures economic activity, yet it tells us relatively little about distribution, wellbeing, or environmental cost. A more comprehensive framework would include indicators such as health outcomes, educational access, and ecological sustainability.',
  },
  {
    title: 'Professional Presentation',
    outcome: 'Deliver a structured professional presentation with signposting, emphasis, and audience awareness.',
    focus: ['opening', 'signposting', 'emphasis', 'transition', 'closing'],
    task: 'Give a 4-minute presentation proposing a new employee learning programme.',
    model: 'Good morning everyone. I will briefly outline the problem, propose a practical solution, and explain why it is likely to be cost-effective. The central issue is that training currently happens too late and too inconsistently. My proposal is a modular learning programme that combines short online preparation with monthly peer-led workshops.',
  },
  {
    title: 'Clarifying & Repairing Speech',
    outcome: 'Recover smoothly from errors, vague wording, or misunderstanding without losing fluency.',
    focus: ['self-repair', 'clarification', 'paraphrase', 'checking understanding', 'reformulation'],
    task: 'Explain a complex concept, intentionally reformulating it twice to make it clearer.',
    model: 'What I mean is that the policy creates incentives rather than direct obligations. Let me put that another way: companies are not forced to change immediately, but they are encouraged to do so through financial signals. To be more precise, the mechanism shifts behaviour by making unsustainable choices more expensive over time.',
  },
  {
    title: 'Expressing Nuanced Opinions',
    outcome: 'Give opinions that are balanced, qualified, and sensitive to complexity.',
    focus: ['qualified stance', 'on balance', 'to some extent', 'reservation', 'nuance'],
    task: 'Give your view on whether social media does more harm than good.',
    model: 'On balance, I would say that social media is neither inherently harmful nor inherently beneficial. Its impact depends heavily on design, usage patterns, and the vulnerability of the user. I am sceptical of blanket claims in either direction; however, I do think platforms should bear greater responsibility for features that encourage compulsive use.',
  },
  {
    title: 'Handling Challenging Questions',
    outcome: 'Respond to difficult questions with composure, structure, and strategic qualification.',
    focus: ['buying time', 'reframing', 'partial agreement', 'evidence limits', 'bridging'],
    task: 'Answer five challenging follow-up questions after a presentation on climate policy.',
    model: 'That is a fair challenge, and I would answer it in two parts. First, the evidence on cost is mixed because it depends on the time horizon. Second, even where short-term costs are high, the long-term cost of inaction may be considerably higher. So I would not dismiss the concern, but I would frame it as a question of timing and distribution.',
  },
  {
    title: 'Idiomatic & Figurative Language',
    outcome: 'Use idioms and figurative language naturally without sounding memorised or excessive.',
    focus: ['idiom control', 'metaphor', 'collocation', 'tone', 'appropriacy'],
    task: 'Discuss a recent technological change using three idioms naturally.',
    model: 'The shift to AI-assisted work is a double-edged sword. On the one hand, it can take a lot of repetitive work off people’s plates. On the other hand, organisations that adopt it without clear guidelines may open a can of worms, particularly around privacy and accountability.',
  },
  {
    title: 'Persuasive Speaking',
    outcome: 'Persuade an audience using rhetorical structure, examples, and controlled emphasis.',
    focus: ['ethos', 'logos', 'pathos', 'rhetorical questions', 'call to action'],
    task: 'Persuade your audience to support a four-day work week pilot.',
    model: 'If productivity is measured by meaningful output rather than hours at a desk, then a four-day work week deserves serious consideration. The evidence from pilot programmes suggests that shorter weeks can improve wellbeing without reducing performance. The question is not whether we can afford to test it, but whether we can afford to ignore it.',
  },
  {
    title: 'Negotiation & Compromise',
    outcome: 'Negotiate priorities, propose compromises, and protect relationships while pursuing goals.',
    focus: ['trade-offs', 'conditional offers', 'non-negotiables', 'compromise', 'summarising agreement'],
    task: 'Negotiate a project timeline where your team needs more time but the client wants speed.',
    model: 'If the final deadline is fixed, we could agree to deliver the core features first and postpone the optional elements. That would allow you to launch on schedule without compromising the stability of the product. From our side, the non-negotiable point is adequate testing time, because skipping that stage would create unnecessary risk.',
  },
  {
    title: 'Media Interview Skills',
    outcome: 'Answer interview questions with concise messages, bridging phrases, and controlled emphasis.',
    focus: ['key message', 'bridging', 'soundbite', 'avoiding traps', 'clarity'],
    task: 'Answer interview questions about a controversial education policy.',
    model: 'The important point here is that reform should improve learning outcomes, not simply change the system for its own sake. I understand why some people are concerned about disruption, but the current model already leaves many students behind. That is why careful implementation and transparent evaluation are essential.',
  },
  {
    title: 'Abstract Topic Discussion',
    outcome: 'Discuss abstract themes such as identity, ethics, progress, and freedom with depth and coherence.',
    focus: ['abstraction', 'examples', 'concept definition', 'philosophical contrast', 'synthesis'],
    task: 'Discuss whether technological progress always leads to social progress.',
    model: 'Technological progress can expand what societies are capable of, but it does not automatically determine how those capabilities are used. A surveillance tool, for instance, may improve security while also threatening privacy. So the relationship between technological and social progress is mediated by values, institutions, and public accountability.',
  },
  {
    title: 'Group Discussion Leadership',
    outcome: 'Lead discussions by inviting contributions, summarising positions, and moving the group forward.',
    focus: ['facilitation', 'inviting quieter speakers', 'summarising', 'managing disagreement', 'decision framing'],
    task: 'Lead a group discussion deciding how a school should spend a limited innovation budget.',
    model: 'Before we move to a decision, let me briefly summarise where we seem to agree. There is broad support for improving digital resources, but some concern about maintenance costs. Perhaps we could hear from someone who has not spoken yet, and then compare the two strongest options against our budget criteria.',
  },
  {
    title: 'Advanced Speaking Simulation',
    outcome: 'Integrate C1 speaking skills in a timed monologue, debate response, and reflective self-evaluation.',
    focus: ['fluency', 'argument', 'interaction', 'repair', 'evaluation'],
    task: 'Complete a final simulation: 3-minute monologue, 2-minute rebuttal, 2-minute reflection.',
    model: 'To bring the key threads together, advanced speaking is not simply about sounding impressive. It is about making complex ideas accessible, responding flexibly to other people, and maintaining control when the conversation becomes unpredictable. The strongest speakers are not those who never hesitate, but those who can recover, clarify, and continue with purpose.',
  },
] as const;

export const advancedSpeakingLessons: SpeakingLesson[] = specs.map((spec, index) => {
  const id = index + 1;
  return {
    id,
    title: spec.title,
    outcome: spec.outcome,
    overview: `${spec.title} develops C1 speaking control for academic, professional, and high-level social contexts. The lesson focuses on depth, flexibility, precision, and interaction rather than memorised answers.`,
    theory: [
      `Core skill: ${spec.focus.join(', ')}.`,
      'At C1, strong speaking is organised at discourse level: your listener can follow the direction of your argument without effort.',
      'Advanced fluency includes strategic pauses, reformulation, and self-correction. These features show control, not weakness.',
      'Lexical range matters, but appropriacy matters more. Use sophisticated expressions only when they fit the situation and register.',
      'A strong response normally includes a clear position, qualification, example, implication, and a closing signal.',
    ],
    expressions: [
      { label: 'Opening', phrase: 'I would frame the issue in the following way...', function: 'Introduce a structured response.' },
      { label: 'Hedging', phrase: 'It would be difficult to claim that this is always the case.', function: 'Avoid overgeneralisation.' },
      { label: 'Contrast', phrase: 'That said, there is another side to the argument.', function: 'Pivot to a contrasting idea.' },
      { label: 'Clarification', phrase: 'Let me put that more precisely.', function: 'Repair or refine your message.' },
      { label: 'Evidence', phrase: 'A useful example of this can be seen in...', function: 'Support an abstract point.' },
      { label: 'Closing', phrase: 'So, to bring the main points together...', function: 'Signal a controlled conclusion.' },
    ],
    modelResponse: spec.model,
    drills: [
      'Speak for 45 seconds using only signposting language and one clear main idea.',
      'Repeat the same idea three ways: formal, neutral, and conversational.',
      'Give one opinion, then add a concession beginning with "That said..."',
      'Paraphrase a difficult word instead of stopping when you cannot remember it.',
      'Record your answer and identify one moment where your argument could be clearer.',
    ],
    speakingTask: spec.task,
    assessment: [
      'Can I sustain speech for 2-3 minutes without losing structure?',
      'Did I use signposting to guide the listener?',
      'Did I qualify claims instead of sounding absolute?',
      'Did I use precise vocabulary and avoid repeated basic words?',
      'Did I give at least one concrete example or implication?',
      'Did I repair or clarify naturally when needed?',
    ],
  };
});

export function getAdvancedSpeakingLesson(id: number) {
  return advancedSpeakingLessons.find((lesson) => lesson.id === id);
}

function buildAdvancedSpeakingQuiz(lesson: SpeakingLesson): SpeakingQuizQuestion[] {
  const base: SpeakingQuizQuestion[] = [
    {
      q: `What is the main outcome of "${lesson.title}"?`,
      opts: [lesson.outcome, 'Speak as fast as possible with no pauses', 'Memorise isolated vocabulary only'],
      ans: lesson.outcome,
      exp: 'The outcome describes the C1 speaking skill this lesson trains.',
    },
    {
      q: 'Which behaviour best reflects C1 speaking control?',
      opts: ['Using signposting, examples, qualification, and repair strategies', 'Avoiding all complex ideas', 'Speaking quickly without organisation'],
      ans: 'Using signposting, examples, qualification, and repair strategies',
      exp: 'C1 speaking is flexible, organised, nuanced, and listener-aware.',
    },
  ];

  const expressionQuestions = lesson.expressions.map((expression) => ({
    q: `What is the function of "${expression.phrase}"?`,
    opts: [expression.function, 'To end the conversation abruptly', 'To avoid answering completely'],
    ans: expression.function,
    exp: `${expression.phrase} is useful for: ${expression.function}`,
  }));

  const theoryQuestions = lesson.theory.map((line, index) => ({
    q: `Which principle belongs to this lesson? (${index + 1})`,
    opts: [line, 'C1 speaking should avoid examples and implications', 'Advanced speaking means never correcting yourself'],
    ans: line,
    exp: 'This principle supports advanced discourse management and spoken precision.',
  }));

  const assessmentQuestions = lesson.assessment.map((item, index) => ({
    q: `Which self-assessment question is useful after the speaking task? (${index + 1})`,
    opts: [item, 'Did I use only memorised sentences?', 'Did I avoid all interaction?'],
    ans: item,
    exp: 'Self-assessment helps you notice fluency, organisation, vocabulary, and repair strategies.',
  }));

  const drillQuestions = lesson.drills.map((item, index) => ({
    q: `Which practice drill develops this C1 speaking lesson? (${index + 1})`,
    opts: [item, 'Read silently without speaking', 'Translate word by word from Indonesian'],
    ans: item,
    exp: 'Speaking skill improves through active production, recording, and reflection.',
  }));

  return [...base, ...expressionQuestions, ...theoryQuestions, ...assessmentQuestions, ...drillQuestions].slice(0, 20);
}

// Options are written answer-first; shuffle them (seeded per lesson) so the answer is not always A.
export function getAdvancedSpeakingQuiz(lesson: SpeakingLesson): SpeakingQuizQuestion[] {
  return shuffleOpts(buildAdvancedSpeakingQuiz(lesson), hashSeed('getAdvancedSpeakingQuiz', lesson.title));
}
