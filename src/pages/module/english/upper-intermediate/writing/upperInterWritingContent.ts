export type WritingExample = {
  label: string;
  text: string;
  note: string;
};

export type WritingLesson = {
  id: number;
  title: string;
  genre: string;
  outcome: string;
  overview: string;
  structure: string[];
  languageFocus: string[];
  examples: WritingExample[];
  planningSteps: string[];
  writingTask: string;
  checklist: string[];
};

export type WritingQuizQuestion = {
  q: string;
  opts: string[];
  ans: string;
  exp: string;
};

const lessonSpecs = [
  {
    title: 'Writing Essays: Argument & Opinion',
    genre: 'Argumentative essay',
    outcome: 'Write a clear thesis-led essay with supporting arguments, evidence, counterargument, and conclusion.',
    focus: ['thesis statements', 'topic sentences', 'counterargument', 'refutation', 'formal stance'],
    task: 'Write a 250-word essay arguing whether governments should prioritise public transport over private car infrastructure.',
    weak: 'In this essay I will talk about climate change.',
    strong: 'While technological solutions to climate change are essential, they are insufficient without systemic political and economic reform.',
    model: 'Critics argue that renewable energy is too expensive to deploy at scale; however, the rapidly declining cost of solar and wind technology has rendered this objection increasingly weak.',
  },
  {
    title: 'Formal Reports: Structure & Language',
    genre: 'Formal report',
    outcome: 'Write a report with terms of reference, findings, analysis, and practical recommendations.',
    focus: ['headings', 'objective tone', 'findings', 'recommendations', 'impersonal style'],
    task: 'Write a report evaluating the facilities in a language school and recommending three improvements.',
    weak: 'The school is nice but some things are bad.',
    strong: 'This report evaluates current student facilities and proposes cost-effective improvements to increase comfort, accessibility, and study efficiency.',
    model: 'It is recommended that additional quiet-study areas be created, as survey responses indicate that existing spaces are frequently overcrowded during peak hours.',
  },
  {
    title: 'Discursive Writing: Both Sides',
    genre: 'Discursive essay',
    outcome: 'Present opposing perspectives fairly before reaching a balanced, evidence-based conclusion.',
    focus: ['balanced argument', 'neutral phrasing', 'weighing evidence', 'concession', 'synthesis'],
    task: 'Write a discursive essay on whether remote work is beneficial for both employees and employers.',
    weak: 'Remote work is good and bad, so it depends.',
    strong: 'Remote work offers substantial flexibility, yet its long-term value depends on how effectively organisations manage collaboration, accountability, and employee wellbeing.',
    model: 'On the one hand, flexible work can improve productivity; on the other, it may weaken informal communication if teams lack deliberate routines.',
  },
  {
    title: 'Academic Emails & Correspondence',
    genre: 'Formal and semi-formal email',
    outcome: 'Write polite, purposeful emails with appropriate openings, requests, explanations, and closings.',
    focus: ['register', 'polite requests', 'subject lines', 'concise paragraphs', 'tone management'],
    task: 'Write an email to a course coordinator requesting an extension and explaining the reason professionally.',
    weak: 'Hi, I need more time because I am busy.',
    strong: 'I am writing to request a short extension for the assignment due on Friday, as an unexpected family matter has affected my available study time.',
    model: 'I would be grateful if you could confirm whether an extension until Monday would be possible. I apologise for any inconvenience caused.',
  },
  {
    title: 'Coherence & Cohesion in Writing',
    genre: 'Connected paragraphs',
    outcome: 'Link ideas smoothly across sentences and paragraphs using logical progression and cohesive devices.',
    focus: ['reference words', 'linking phrases', 'old-to-new information', 'paragraph flow', 'signposting'],
    task: 'Revise a 220-word text about online learning so that the ideas flow more logically and cohesively.',
    weak: 'Online classes are popular. Some students like them. There are problems. Teachers use technology.',
    strong: 'Online classes have become increasingly common; however, their effectiveness depends largely on the quality of interaction and feedback.',
    model: 'This shift has created new opportunities for flexible learning. Nevertheless, it has also made student engagement more difficult to monitor.',
  },
  {
    title: 'Vocabulary Precision & Register',
    genre: 'Style improvement',
    outcome: 'Choose precise, formal vocabulary and adapt register to audience and purpose.',
    focus: ['formal vocabulary', 'collocation', 'avoidance of vague words', 'nominalisation', 'audience awareness'],
    task: 'Rewrite an informal paragraph about health habits into a precise B2 academic paragraph.',
    weak: 'A lot of people eat bad food and this makes things worse.',
    strong: 'A significant proportion of consumers rely on highly processed food, which may contribute to long-term public health problems.',
    model: 'The policy could mitigate excessive sugar consumption by improving product labelling and restricting misleading advertising.',
  },
  {
    title: 'Hedging & Academic Caution',
    genre: 'Academic paragraph',
    outcome: 'Make claims carefully using hedging, cautious verbs, and qualified conclusions.',
    focus: ['may/might/could', 'appears to', 'suggests that', 'to some extent', 'limitations'],
    task: 'Write a paragraph explaining why social media may affect concentration, using cautious academic language.',
    weak: 'Social media destroys everyone\'s attention.',
    strong: 'Frequent social media use may reduce sustained attention, particularly when notifications repeatedly interrupt focused tasks.',
    model: 'The available evidence suggests a correlation rather than a direct causal relationship, so broader claims should be made cautiously.',
  },
  {
    title: 'Complex Sentences & Subordination',
    genre: 'Sentence development',
    outcome: 'Use subordinate clauses, relative clauses, participle phrases, and concessive clauses accurately.',
    focus: ['although clauses', 'because clauses', 'relative clauses', 'participle phrases', 'sentence variety'],
    task: 'Expand ten simple sentences about urban life into five complex B2 sentences.',
    weak: 'The city is crowded. It has good jobs. People move there.',
    strong: 'Although the city is increasingly crowded, many people continue to move there because it offers better employment opportunities.',
    model: 'Residents who rely on public transport are particularly affected when services are delayed during peak hours.',
  },
  {
    title: 'Writing Introductions & Conclusions',
    genre: 'Essay framing',
    outcome: 'Write introductions that establish context and conclusions that synthesise rather than repeat.',
    focus: ['hook/context', 'scope', 'thesis', 'synthesis', 'broader implication'],
    task: 'Write an introduction and conclusion for an essay about whether exams are the best way to assess students.',
    weak: 'This essay is about exams and I will give my opinion.',
    strong: 'As education systems increasingly value creativity and problem-solving, the role of traditional exams deserves careful reconsideration.',
    model: 'Overall, exams remain useful for measuring certain skills, but they should be combined with coursework to provide a more complete assessment.',
  },
  {
    title: 'Paragraphing & Topic Sentences',
    genre: 'Body paragraph',
    outcome: 'Build paragraphs with a topic sentence, explanation, evidence, analysis, and link.',
    focus: ['TEEL structure', 'paragraph unity', 'development', 'evidence integration', 'linking back'],
    task: 'Write two body paragraphs supporting the view that cities should invest more in green spaces.',
    weak: 'Parks are good. People like parks. They can walk there.',
    strong: 'Urban green spaces improve quality of life by giving residents accessible places to exercise, relax, and socialise.',
    model: 'For example, a small neighbourhood park can reduce social isolation by creating a shared public space for different age groups.',
  },
  {
    title: 'Cause & Effect: Advanced Structures',
    genre: 'Cause-effect essay',
    outcome: 'Explain causes, consequences, and chains of impact with accurate connectors and grammar.',
    focus: ['as a result', 'therefore', 'consequently', 'leads to', 'is caused by'],
    task: 'Write a cause-effect essay explaining why young people are sleeping less and what effects this may have.',
    weak: 'People sleep less because phones. This is bad.',
    strong: 'Increased screen exposure before bedtime can disrupt sleep routines, which in turn may reduce concentration and emotional resilience.',
    model: 'Consequently, students who sleep poorly may find it harder to retain information and manage academic pressure.',
  },
  {
    title: 'Compare & Contrast Writing',
    genre: 'Comparison essay',
    outcome: 'Compare two options using point-by-point organisation and precise contrast language.',
    focus: ['whereas', 'while', 'similarly', 'in contrast', 'comparative structures'],
    task: 'Compare online learning and classroom learning in terms of flexibility, interaction, and learner independence.',
    weak: 'Online learning is different from classroom learning.',
    strong: 'Whereas classroom learning provides immediate face-to-face interaction, online learning offers greater flexibility and learner autonomy.',
    model: 'Both formats can be effective; however, they require different forms of discipline, support, and feedback.',
  },
  {
    title: 'Writing for Academic Purposes',
    genre: 'Academic response',
    outcome: 'Write objective academic paragraphs using source-aware language and formal organisation.',
    focus: ['source reference', 'paraphrase', 'academic tone', 'claim-evidence-analysis', 'objectivity'],
    task: 'Write an academic paragraph discussing the benefits and limitations of using AI tools in education.',
    weak: 'AI is amazing and students should use it all the time.',
    strong: 'AI tools can support independent learning, although their educational value depends on how critically and ethically students use them.',
    model: 'Research on digital learning suggests that guidance and feedback remain essential when learners use automated tools.',
  },
  {
    title: 'Describing Data & Graphs',
    genre: 'Data description',
    outcome: 'Describe trends, comparisons, peaks, declines, and anomalies without over-interpreting data.',
    focus: ['increase/decrease verbs', 'trend language', 'approximation', 'comparison', 'overview statements'],
    task: 'Write a 180-word description of a chart showing changes in public transport use over ten years.',
    weak: 'The graph goes up and down and some numbers are big.',
    strong: 'Overall, public transport use rose steadily over the decade, although there was a temporary decline between 2020 and 2021.',
    model: 'The most noticeable increase occurred after 2022, when passenger numbers recovered and exceeded pre-pandemic levels.',
  },
  {
    title: 'Persuasive Writing: Rhetoric & Evidence',
    genre: 'Persuasive article',
    outcome: 'Persuade readers through evidence, rhetorical structure, controlled emphasis, and audience appeal.',
    focus: ['rhetorical questions', 'evidence', 'emphasis', 'call to action', 'reader awareness'],
    task: 'Write a persuasive article encouraging young adults to reduce single-use plastic.',
    weak: 'Plastic is bad so stop using it.',
    strong: 'If small daily choices are multiplied across millions of consumers, reducing single-use plastic becomes a practical and powerful environmental habit.',
    model: 'Rather than waiting for perfect policy solutions, individuals can begin with simple changes such as reusable bottles and shopping bags.',
  },
  {
    title: 'Critical Analysis & Evaluation',
    genre: 'Evaluation paragraph',
    outcome: 'Evaluate strengths and weaknesses instead of only describing ideas.',
    focus: ['criteria', 'strengths', 'limitations', 'evidence quality', 'balanced judgement'],
    task: 'Evaluate the claim that technology always improves education.',
    weak: 'Technology is useful because it helps students.',
    strong: 'Technology can expand access to learning resources, but its impact is limited when teachers lack training or students lack reliable internet access.',
    model: 'A balanced evaluation should consider not only efficiency, but also equity, motivation, and learning outcomes.',
  },
  {
    title: 'Writing Reviews & Critiques',
    genre: 'Review and critique',
    outcome: 'Write reviews that combine description, evaluation, evidence, and recommendation.',
    focus: ['evaluative adjectives', 'specific evidence', 'balanced tone', 'recommendation', 'audience fit'],
    task: 'Write a review of a language-learning app for adult learners at B2 level.',
    weak: 'This app is very good and I like it.',
    strong: 'The app is particularly effective for vocabulary revision, although its speaking practice is too limited for learners who need conversational fluency.',
    model: 'Its spaced repetition system is well designed, but the lack of detailed feedback makes some grammar exercises less useful.',
  },
  {
    title: 'Problem-Solution Essays',
    genre: 'Problem-solution essay',
    outcome: 'Analyse a problem, explain causes, propose solutions, and evaluate feasibility.',
    focus: ['problem definition', 'causes', 'solutions', 'evaluation', 'implementation'],
    task: 'Write a problem-solution essay about traffic congestion in large cities.',
    weak: 'Traffic is a big problem and the government should fix it.',
    strong: 'Traffic congestion is caused not only by population growth, but also by weak public transport systems and car-dependent urban planning.',
    model: 'A realistic solution would combine improved bus networks with pricing policies that discourage unnecessary private car use.',
  },
  {
    title: 'Narrative & Reflective Writing',
    genre: 'Reflective narrative',
    outcome: 'Narrate an experience and reflect on its significance using mature language and structure.',
    focus: ['sequencing', 'reflection', 'sensory detail', 'lesson learned', 'past tenses'],
    task: 'Write a reflective narrative about a time when you learned something important from a mistake.',
    weak: 'I made a mistake and learned a lesson.',
    strong: 'Although the mistake seemed embarrassing at the time, it taught me to prepare more carefully and ask for clarification before making decisions.',
    model: 'Looking back, the experience changed the way I respond to pressure because it showed me the value of pausing before acting.',
  },
  {
    title: 'Integrated Writing Test: B2 Mastery',
    genre: 'Integrated writing assessment',
    outcome: 'Plan, write, revise, and evaluate a complete B2 text under timed conditions.',
    focus: ['planning', 'genre control', 'accuracy', 'cohesion', 'revision'],
    task: 'Choose one prompt and produce a complete 280-word B2 text, then revise it using the final checklist.',
    weak: 'I will write quickly and hope it is correct.',
    strong: 'Before writing, I will define the genre, identify the reader, select two main points, and reserve time for revision.',
    model: 'A successful final response demonstrates clear organisation, accurate grammar, appropriate register, and purposeful vocabulary choices.',
  },
] as const;

export const upperInterWritingLessons: WritingLesson[] = lessonSpecs.map((spec, index) => {
  const id = index + 1;
  return {
    id,
    title: spec.title,
    genre: spec.genre,
    outcome: spec.outcome,
    overview: `${spec.title} trains you to produce CEFR B2 writing that is organised, precise, reader-aware, and supported by clear development rather than isolated sentences.`,
    structure: [
      `Identify the genre: ${spec.genre}. Decide whether the reader expects argument, information, evaluation, or reflection.`,
      'Plan the text before writing: define the purpose, reader, register, and two to four main points.',
      'Open with context and a controlling idea so the reader understands your direction immediately.',
      'Develop each body paragraph with a clear main idea, explanation, concrete support, and a link back to the task.',
      'Close by synthesising the message and showing the implication, recommendation, or final judgement.',
    ],
    languageFocus: [
      `Core focus: ${spec.focus.join(', ')}.`,
      'Use B2 discourse markers such as however, therefore, in contrast, consequently, moreover, and nevertheless.',
      'Combine sentence types: simple sentences for clarity, compound sentences for balance, and complex sentences for nuance.',
      'Prefer precise verbs and nouns over vague phrases such as good, bad, things, stuff, or very important.',
      'Check register: formal for reports and essays, semi-formal for correspondence, and reflective but controlled for narratives.',
    ],
    examples: [
      { label: 'Weak version', text: spec.weak, note: 'This version is too general, too informal, or lacks a clear B2 writing purpose.' },
      { label: 'Improved B2 version', text: spec.strong, note: 'This version has clearer control, more precise vocabulary, and stronger development.' },
      { label: 'Model sentence', text: spec.model, note: 'Use this as a pattern for sentence structure, cohesion, and register.' },
      { label: 'Useful frame', text: `Although ${spec.focus[0]} is central to this task, a strong response also needs ${spec.focus[1]} and ${spec.focus[2]}.`, note: 'A reusable frame for building balanced B2 sentences.' },
    ],
    planningSteps: [
      'Underline the key words in the prompt and identify exactly what must be answered.',
      'Write a one-sentence controlling idea before drafting the full text.',
      'Choose two main points and one counterpoint, limitation, or example.',
      'Select five useful B2 phrases before writing so the register stays consistent.',
      'After drafting, revise for clarity, cohesion, grammar accuracy, and task completion.',
    ],
    writingTask: spec.task,
    checklist: [
      'The text answers every part of the prompt.',
      'The opening paragraph makes the purpose clear.',
      'Each body paragraph has one main idea and enough development.',
      'Connectors show contrast, cause, addition, example, or conclusion accurately.',
      'Vocabulary is precise and appropriate for B2 register.',
      'Grammar includes at least two complex sentences without losing clarity.',
      'The final paragraph synthesises the message instead of repeating sentences mechanically.',
    ],
  };
});

export function getUpperInterWritingLesson(id: number) {
  return upperInterWritingLessons.find((lesson) => lesson.id === id);
}

export function getUpperInterWritingQuiz(lesson: WritingLesson): WritingQuizQuestion[] {
  const base: WritingQuizQuestion[] = [
    {
      q: `What is the main outcome of "${lesson.title}"?`,
      opts: [lesson.outcome, 'Memorise unrelated vocabulary only', 'Avoid planning and write as quickly as possible', 'Use only simple sentences'],
      ans: lesson.outcome,
      exp: 'The lesson outcome defines the writing skill you should be able to produce by the end of the lesson.',
    },
    {
      q: `Which genre best matches this lesson?`,
      opts: [lesson.genre, 'Informal chat message', 'Shopping list', 'Pronunciation drill'],
      ans: lesson.genre,
      exp: 'Identifying genre helps you choose structure, register, and language features.',
    },
    {
      q: 'Which option is the stronger B2 sentence?',
      opts: [lesson.examples[1].text, lesson.examples[0].text, 'This thing is nice and I like it.', 'People have many opinions about this.'],
      ans: lesson.examples[1].text,
      exp: 'The improved version is more precise, controlled, and appropriate for B2 writing.',
    },
  ];

  const structureQuestions = lesson.structure.map((item, index) => ({
    q: `Which planning/structure principle is useful for this lesson? (${index + 1})`,
    opts: [item, 'Write one long paragraph without transitions', 'Ignore the reader and focus only on word count', 'Use informal abbreviations throughout'],
    ans: item,
    exp: 'This step supports organisation, coherence, and task achievement.',
  }));

  const languageQuestions = lesson.languageFocus.map((item, index) => ({
    q: `Which language focus belongs to this B2 writing lesson? (${index + 1})`,
    opts: [item, 'Use random idioms even when they do not fit', 'Avoid all connectors', 'Use vague words repeatedly'],
    ans: item,
    exp: 'B2 writing requires precise language choices that match purpose and audience.',
  }));

  const checklistQuestions = lesson.checklist.map((item, index) => ({
    q: `Which revision checklist item should you apply? (${index + 1})`,
    opts: [item, 'Never revise after drafting', 'Add new unrelated ideas in the conclusion', 'Remove all examples from body paragraphs'],
    ans: item,
    exp: 'Revision is part of the writing process, not an optional extra.',
  }));

  const exampleQuestions = lesson.examples.map((example) => ({
    q: `What does this example demonstrate: "${example.text}"?`,
    opts: [example.note, 'A sentence that should always be copied exactly', 'A pronunciation-only exercise', 'A grammar rule unrelated to writing'],
    ans: example.note,
    exp: example.note,
  }));

  return [...base, ...structureQuestions, ...languageQuestions, ...checklistQuestions, ...exampleQuestions].slice(0, 20);
}
