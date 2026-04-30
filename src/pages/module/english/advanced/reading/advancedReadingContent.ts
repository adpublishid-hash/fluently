export type ReadingLesson = {
  id: number;
  title: string;
  outcome: string;
  overview: string;
  passage: string;
  readingFocus: string[];
  keyConcepts: string[];
  analysisTask: string;
  strategies: string[];
};

export type ReadingQuizQuestion = {
  q: string;
  opts: string[];
  ans: string;
  exp: string;
};

const specs = [
  ['Inference & Implied Meaning', 'Infer unstated meaning from context, tone, contrast, and lexical choice.', 'The writer never openly criticises the policy; nevertheless, the repeated references to "administrative complexity" and "uncertain long-term benefits" make the stance clear. The argument depends less on direct opposition than on carefully accumulated reservations.'],
  ['Author Stance & Bias', 'Identify the writer\'s position, assumptions, framing, and evaluative language.', 'A text may appear neutral while still shaping the reader\'s judgement. Words such as reform, burden, investment, or interference do not merely describe a policy; they frame it as progress, cost, opportunity, or threat.'],
  ['Rhetorical Structure', 'Track how a complex text builds its argument from claim to evidence to implication.', 'The article opens with a familiar problem, narrows it through an example, introduces research evidence, and finally widens the discussion to social responsibility. This movement from concrete case to broader implication gives the argument persuasive force.'],
  ['Dense Academic Texts', 'Process abstract academic paragraphs by identifying claims, definitions, and qualifications.', 'Academic prose often compresses several ideas into one sentence. A careful reader separates the main claim from the qualifying phrases that limit it, because those qualifications often carry the writer\'s real precision.'],
  ['Evaluating Evidence', 'Distinguish strong evidence from anecdote, assertion, correlation, and speculation.', 'The study offers a correlation between screen time and reduced concentration, but the evidence does not establish causation. The reader must therefore treat the conclusion as suggestive rather than definitive.'],
  ['Reading Policy Arguments', 'Analyse policy texts for objectives, trade-offs, stakeholders, and implementation limits.', 'The proposal promises efficiency, yet its success depends on local capacity. A policy that works in a well-funded district may fail in an area where staffing, training, or infrastructure is already under pressure.'],
  ['Interpreting Opinion Columns', 'Recognise voice, irony, emphasis, and persuasive choices in opinion writing.', 'The columnist\'s phrase "a miracle solution, apparently" signals scepticism. The word apparently distances the writer from the claim and suggests that the optimism being described may be exaggerated.'],
  ['Comparing Viewpoints', 'Compare two texts by purpose, stance, evidence, and intended audience.', 'Text A argues from economic efficiency, while Text B argues from social fairness. Although both discuss the same reform, they prioritise different values and therefore reach different conclusions.'],
  ['Reading Reports & Findings', 'Extract key findings, limitations, recommendations, and practical implications.', 'The report concludes that the programme improved attendance, but it also notes that the sample was small and the follow-up period short. These limitations matter because they restrict how confidently the findings can be generalised.'],
  ['Understanding Figurative Language', 'Interpret metaphor, analogy, idiom, and figurative framing in advanced prose.', 'When the writer describes the education system as "a machine built for a different century", the metaphor suggests not only age but structural mismatch: the system still operates, but it no longer fits current needs.'],
  ['Critical Reading of Media', 'Evaluate headlines, source selection, framing, and omitted context.', 'The headline highlights a dramatic percentage increase, but the article later reveals that the original number was very small. Without that context, the statistic sounds more alarming than it actually is.'],
  ['Cohesion Across Paragraphs', 'Follow reference chains, transitions, and thematic development across a text.', 'The phrase this shift refers not to the previous sentence alone, but to the broader movement from office-based work to hybrid employment described across the paragraph.'],
  ['Reading for Tone', 'Identify tone such as sceptical, cautious, critical, optimistic, ironic, or conciliatory.', 'The writer\'s tone is cautiously optimistic: she acknowledges serious obstacles, but the final paragraph suggests that gradual progress is both possible and worth pursuing.'],
  ['Argument Weaknesses', 'Spot overgeneralisation, false comparison, unsupported claims, and missing evidence.', 'The argument assumes that because one city reduced congestion through pricing, the same policy will succeed elsewhere. This comparison ignores differences in public transport quality and commuter income.'],
  ['Literary Non-fiction', 'Analyse narrative technique, reflection, imagery, and thematic development.', 'The personal anecdote is not included merely for colour. It functions as a lens through which the writer explores memory, belonging, and the emotional cost of migration.'],
  ['Scientific Popular Writing', 'Understand scientific explanations written for educated non-specialist readers.', 'The writer simplifies the science without removing complexity. Instead of listing technical equations, she uses analogy and sequence to explain why the discovery matters.'],
  ['Legal & Ethical Texts', 'Read texts involving rights, responsibility, definitions, and ethical tension.', 'The debate is not simply about privacy versus security. It concerns who has the authority to decide what counts as legitimate surveillance and what safeguards must exist.'],
  ['Business & Economic Analysis', 'Interpret market commentary, risk language, projections, and strategic implications.', 'The forecast is positive, but the repeated references to volatility, supply constraints, and consumer confidence show that the writer sees the growth as fragile rather than guaranteed.'],
  ['Synthesis from Multiple Sources', 'Combine information from different texts without confusing their claims.', 'Source A provides statistical evidence, Source B offers expert interpretation, and Source C presents lived experience. A strong synthesis explains how these sources complement or complicate one another.'],
  ['Advanced Reading Simulation', 'Integrate inference, stance, evidence evaluation, tone, structure, and synthesis.', 'In the final simulation, the reader must move beyond comprehension and evaluate how the text works: what it claims, how it persuades, what it assumes, and where its reasoning remains vulnerable.'],
] as const;

export const advancedReadingLessons: ReadingLesson[] = specs.map(([title, outcome, passage], index) => {
  const id = index + 1;
  return {
    id,
    title,
    outcome,
    overview: `${title} develops C1 reading ability for dense, nuanced, and argument-driven texts. The goal is not only to understand what is written, but to evaluate how meaning is constructed.`,
    passage,
    readingFocus: [
      'Identify the writer\'s main claim before analysing details.',
      'Notice words that reveal stance, caution, criticism, or evaluation.',
      'Separate fact, interpretation, example, assumption, and conclusion.',
      'Track reference words such as this, these, such, former, latter, and which.',
      'Ask what the writer includes, omits, emphasises, and downplays.',
    ],
    keyConcepts: [
      'Inference: meaning the reader must derive from context rather than direct statement.',
      'Stance: the writer\'s attitude toward the topic, evidence, or opposing view.',
      'Framing: the way language encourages readers to view an issue from a particular angle.',
      'Cohesion: how ideas are connected across sentences and paragraphs.',
      'Evaluation: judging the strength, limits, and implications of an argument.',
    ],
    analysisTask: `Read the passage for "${title}" twice. First, write the main claim in one sentence. Second, identify one word or phrase that reveals stance. Third, evaluate one limitation or implication.`,
    strategies: [
      'Preview the title and predict the issue before reading deeply.',
      'Underline contrast markers because they often introduce the writer\'s real position.',
      'Circle hedging language such as may, tends to, appears, arguably, and to some extent.',
      'Summarise each paragraph in five to seven words.',
      'After reading, ask: what would a critical reader question here?',
    ],
  };
});

export function getAdvancedReadingLesson(id: number) {
  return advancedReadingLessons.find((lesson) => lesson.id === id);
}

export function getAdvancedReadingQuiz(lesson: ReadingLesson): ReadingQuizQuestion[] {
  const base: ReadingQuizQuestion[] = [
    {
      q: `What is the main outcome of "${lesson.title}"?`,
      opts: [lesson.outcome, 'Read only for pronunciation practice', 'Ignore implication and focus only on spelling'],
      ans: lesson.outcome,
      exp: 'The outcome defines the C1 reading skill trained in this lesson.',
    },
    {
      q: 'What should an advanced reader evaluate beyond literal meaning?',
      opts: ['Stance, implication, evidence, assumptions, and structure', 'Only the number of sentences', 'Only whether the text is long or short'],
      ans: 'Stance, implication, evidence, assumptions, and structure',
      exp: 'C1 reading requires interpretation and evaluation, not only comprehension.',
    },
    {
      q: 'Which option best summarises the passage?',
      opts: [lesson.passage.split('.').slice(0, 2).join('.') + '.', 'The passage gives unrelated random grammar rules.', 'The passage is only a list of vocabulary.'],
      ans: lesson.passage.split('.').slice(0, 2).join('.') + '.',
      exp: 'This option captures the core meaning of the reading passage.',
    },
  ];

  const focusQuestions = lesson.readingFocus.map((item, index) => ({
    q: `Which reading focus is useful in this lesson? (${index + 1})`,
    opts: [item, 'Skip all transition words', 'Avoid thinking about the writer\'s purpose'],
    ans: item,
    exp: 'This focus supports advanced reading comprehension and analysis.',
  }));

  const conceptQuestions = lesson.keyConcepts.map((item, index) => ({
    q: `Which key concept belongs to advanced reading analysis? (${index + 1})`,
    opts: [item, 'Reading faster always means reading better', 'Every text is completely neutral'],
    ans: item,
    exp: 'Advanced reading requires attention to inference, stance, framing, cohesion, and evaluation.',
  }));

  const strategyQuestions = lesson.strategies.map((item, index) => ({
    q: `Which strategy should you apply? (${index + 1})`,
    opts: [item, 'Never summarise paragraphs', 'Stop reading whenever you find one unfamiliar word'],
    ans: item,
    exp: 'This strategy helps you manage dense C1 texts more accurately.',
  }));

  return [...base, ...focusQuestions, ...conceptQuestions, ...strategyQuestions].slice(0, 20);
}
