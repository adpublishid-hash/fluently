export type SpeakingModel = {
  prompt: string;
  response: string;
  technique: string;
};

export type SpeakingQuiz = {
  q: string;
  opts: string[];
  ans: string;
  exp: string;
};

export type ProficiencySpeakingLessonContent = {
  id: number;
  title: string;
  subtitle: string;
  objective: string;
  theory: string[];
  expressions: string[];
  models: SpeakingModel[];
  drills: string[];
  speakingTask: string;
  assessment: string[];
  quiz: SpeakingQuiz[];
};

const lessonSeeds = [
  ['C2 Fluency Diagnostic', 'Benchmark fluency, precision, interaction, and repair strategies'],
  ['Abstract Argumentation', 'Build complex arguments around abstract and philosophical topics'],
  ['Nuanced Opinion Framing', 'Express position, doubt, concession, and qualification naturally'],
  ['Socratic Discussion', 'Use probing questions and layered follow-up responses'],
  ['Diplomatic Disagreement', 'Challenge ideas without sounding blunt or defensive'],
  ['Complex Problem Solving', 'Analyse constraints, trade-offs, and implementation risks'],
  ['Academic Seminar Talk', 'Participate in high-level academic discussion'],
  ['Executive Briefing', 'Deliver concise strategic updates for professional audiences'],
  ['Panel Debate Performance', 'Respond under pressure with structure and control'],
  ['Storytelling with Subtext', 'Tell sophisticated narratives with implication and pacing'],
  ['Persuasive Speechcraft', 'Use rhetorical devices to influence listeners'],
  ['Crisis Communication', 'Speak clearly during uncertainty and reputational risk'],
  ['Negotiation and Mediation', 'Balance interests, concessions, and principled compromise'],
  ['Intercultural Pragmatics', 'Adjust register and politeness across contexts'],
  ['Humour, Irony, and Understatement', 'Use advanced social nuance safely and appropriately'],
  ['Data Commentary', 'Interpret trends, anomalies, and implications verbally'],
  ['Literary and Cultural Analysis', 'Discuss symbolism, tone, and interpretation'],
  ['Podcast-Style Monologue', 'Sustain engaging long-form spoken analysis'],
  ['Impromptu Speaking Mastery', 'Organise spontaneous answers with minimal preparation'],
  ['C2 Speaking Simulation', 'Integrate fluency, precision, interaction, and rhetorical control'],
];

const expressionBank = [
  ['To put it more precisely...', 'What I am trying to get at is...', 'There is a distinction worth making here...', 'I would frame the issue slightly differently...'],
  ['At a more fundamental level...', 'This raises a broader question about...', 'The underlying assumption seems to be...', 'One could argue that the premise itself is flawed...'],
  ['I am inclined to think that...', 'That said, I would not go so far as to claim...', 'My position is conditional on...', 'The evidence points in that direction, albeit cautiously...'],
  ['Could we unpack that assumption?', 'What would follow if that were true?', 'How might the argument change under different conditions?', 'Is there a counterexample that would weaken the claim?'],
  ['I take your point, but I see it differently.', 'I would question whether that conclusion necessarily follows.', 'That is persuasive up to a point.', 'I am not entirely convinced by that interpretation.'],
  ['The key constraint appears to be...', 'A workable solution would need to account for...', 'The trade-off is between...', 'The risk is not the idea itself, but its execution.'],
  ['Building on that point...', 'I would like to situate this within...', 'The literature tends to distinguish between...', 'A useful way to conceptualise this is...'],
  ['The headline message is...', 'There are three implications for decision-makers.', 'The immediate priority should be...', 'From a strategic standpoint...'],
  ['Before I respond directly, let me clarify the premise.', 'I will address that in two parts.', 'The strongest objection is...', 'My rebuttal would be...'],
  ['What makes the story revealing is...', 'The surface event masks a deeper tension.', 'Looking back, the turning point was...', 'The lesson was less obvious than it seemed.'],
  ['Let us not mistake activity for progress.', 'The question is not whether we can, but whether we should.', 'That contrast is precisely the point.', 'This is where the argument becomes compelling.'],
  ['The first thing to acknowledge is...', 'We should avoid premature certainty.', 'What we know at this stage is...', 'The responsible course of action is...'],
  ['I can accept that condition provided that...', 'What would make this acceptable from your perspective?', 'There may be room for a principled compromise.', 'Let us separate interests from positions.'],
  ['In this context, a more appropriate register would be...', 'I would soften that by saying...', 'The direct translation may sound too abrupt.', 'A culturally sensitive phrasing might be...'],
  ['I mean that somewhat ironically.', 'There is a touch of understatement there.', 'The humour depends on shared context.', 'I would use that only in an informal setting.'],
  ['The most striking trend is...', 'That figure is significant because...', 'The anomaly suggests that...', 'A cautious interpretation would be...'],
  ['The symbolism operates on two levels.', 'The tone is deliberately ambivalent.', 'One reading would be that...', 'The cultural context complicates the interpretation.'],
  ['Let me take that idea and develop it.', 'There are several layers to this issue.', 'The interesting part is not the answer, but the tension.', 'I want to connect this to a wider pattern.'],
  ['I will think aloud and structure the answer as I go.', 'My first instinct is...', 'A more considered answer would be...', 'Let me refine that point.'],
  ['To synthesise the discussion...', 'The most defensible position is...', 'I would qualify that conclusion in one respect.', 'Overall, the argument stands if...'],
];

const modelPrompts = [
  'Should advanced speakers prioritise accuracy or communicative impact?',
  'Is uncertainty a weakness in public decision-making?',
  'Can technology solve problems that are fundamentally social?',
  'What makes a question intellectually productive?',
  'How can disagreement improve a conversation?',
  'How should leaders respond to competing priorities?',
  'What makes an academic contribution original?',
  'How would you brief a team about a high-risk decision?',
  'How do you respond to a strong counterargument?',
  'Tell a story about a decision whose meaning changed over time.',
  'How can a speaker make an argument memorable?',
  'How should an organisation communicate during a crisis?',
  'What makes a negotiation fair?',
  'Why does politeness vary across cultures?',
  'When does humour help or harm communication?',
  'What does the data suggest beyond the obvious pattern?',
  'How can cultural context change interpretation?',
  'Develop a podcast-style reflection on modern learning.',
  'Answer an unexpected question about education and society.',
  'Give a complete C2-level response to a complex social issue.',
];

function makeModels(index: number): SpeakingModel[] {
  const expressions = expressionBank[index];
  return [
    {
      prompt: modelPrompts[index],
      response: `${expressions[0]} the strongest answer depends on purpose. In casual interaction, impact may matter more, but in academic or professional contexts, precision is part of impact because it protects the speaker from oversimplifying the issue.`,
      technique: 'thesis with qualification',
    },
    {
      prompt: 'Give a balanced response with concession.',
      response: `${expressions[1]} I can see why the alternative is attractive. However, it underestimates the practical constraints and assumes that people will respond predictably, which is rarely the case in complex systems.`,
      technique: 'concession plus limitation',
    },
    {
      prompt: 'Repair or refine your answer naturally.',
      response: `${expressions[2]} What I mean is not that the idea is wrong, but that it needs stronger conditions before it can be applied responsibly.`,
      technique: 'self-correction and precision',
    },
  ];
}

function makeQuiz(lesson: number, title: string, expressions: string[], models: SpeakingModel[]): SpeakingQuiz[] {
  const base: SpeakingQuiz[] = [
    {
      q: `What is the main C2 speaking target in "${title}"?`,
      opts: ['nuanced, coherent, listener-aware spoken control', 'memorising fixed scripts only', 'speaking quickly without pausing'],
      ans: 'nuanced, coherent, listener-aware spoken control',
      exp: 'C2 speaking requires flexible control of meaning, register, structure, and interaction.',
    },
    {
      q: 'Which phrase is best for refining an idea?',
      opts: [expressions[2], 'I do not know grammar.', 'Very very good.'],
      ans: expressions[2],
      exp: 'Refinement phrases help speakers repair and sharpen meaning naturally.',
    },
    {
      q: `Which technique appears in the model response: "${models[0].response.slice(0, 80)}..."?`,
      opts: [models[0].technique, 'basic self-introduction', 'word-by-word translation'],
      ans: models[0].technique,
      exp: `The model demonstrates ${models[0].technique}.`,
    },
    {
      q: 'A strong proficiency-level spoken answer should include:',
      opts: ['a clear position, qualification, examples, and controlled delivery', 'only one short sentence', 'no hesitation management'],
      ans: 'a clear position, qualification, examples, and controlled delivery',
      exp: 'Proficiency speaking is not only fluent; it is organised, precise, and responsive.',
    },
  ];

  const generated = Array.from({ length: 16 }, (_, index) => {
    const expression = expressions[index % expressions.length];
    return {
      q: `Lesson ${lesson} practice ${index + 5}: when is "${expression}" useful?`,
      opts: ['when developing a nuanced spoken response', 'when avoiding the question completely', 'when replacing structure with speed'],
      ans: 'when developing a nuanced spoken response',
      exp: `"${expression}" helps manage C2-level discourse with precision and control.`,
    };
  });

  return [...base, ...generated];
}

export const proficiencySpeakingLessons: ProficiencySpeakingLessonContent[] = lessonSeeds.map(([title, subtitle], index) => {
  const id = index + 1;
  const expressions = expressionBank[index];
  const models = makeModels(index);

  return {
    id,
    title,
    subtitle,
    objective: `By the end of this lesson, learners can handle ${title.toLowerCase()} with C2-level fluency, precise wording, natural repair, and strong interactional control.`,
    theory: [
      'Open with a clear frame so the listener understands the direction of your answer.',
      'Develop ideas through contrast, concession, cause, implication, and example.',
      'Use repair language naturally: refine, clarify, reframe, or qualify your own point.',
      'Control register: sound formal, neutral, diplomatic, or conversational depending on context.',
      'End with a synthesis rather than simply repeating the first sentence.',
    ],
    expressions,
    models,
    drills: [
      'Give a 60-second answer, then repeat it in 45 seconds without losing the argument.',
      'Add one concession and one counterargument to your first answer.',
      'Record yourself using at least three target expressions from this lesson.',
      'Answer the same prompt twice: once as an academic speaker and once as an executive speaker.',
      'Listen back and mark where your answer loses structure, precision, or natural rhythm.',
    ],
    speakingTask: `Prepare a two-minute response on the lesson topic. Include a thesis, one concession, one concrete example, one refined point, and a final synthesis.`,
    assessment: [
      'My answer has a clear position and does not drift.',
      'I used advanced expressions naturally rather than forcing them.',
      'I qualified claims instead of making absolute statements.',
      'I repaired unclear ideas smoothly while speaking.',
      'My final sentence synthesised the answer.',
    ],
    quiz: makeQuiz(id, title, expressions, models),
  };
});

export function getProficiencySpeakingLesson(id: number) {
  return proficiencySpeakingLessons.find((lesson) => lesson.id === id) ?? proficiencySpeakingLessons[0];
}
