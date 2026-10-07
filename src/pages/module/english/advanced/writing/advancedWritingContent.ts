import { hashSeed, shuffleOpts } from '../../../../../utils/quiz';
import { fromAuthored } from '../shared/authoredQuiz';
import { advancedWritingQuizBank } from './writingQuizBank';
export type AdvancedWritingLesson = {
  id: number;
  title: string;
  genre: string;
  outcome: string;
  overview: string;
  modelText: string;
  writingFocus: string[];
  languageTools: string[];
  writingExercises: string[];
  writingTask: string;
  revisionChecklist: string[];
};

export type AdvancedWritingQuizQuestion = {
  q: string;
  opts: string[];
  ans: string;
  exp: string;
};

const specs = [
  ['Analytical Essays', 'C1 analytical essay', 'Develop a nuanced argument that analyses causes, implications, and limitations rather than simply listing opinions.', 'A convincing analytical essay does not merely take a side; it explains why a position is plausible, where it is limited, and what assumptions support it. Strong C1 writing therefore combines thesis, evidence, qualification, and synthesis.'],
  ['Critical Evaluation', 'Evaluation essay', 'Evaluate strengths and weaknesses using explicit criteria and balanced judgement.', 'Critical evaluation requires criteria. A claim may be persuasive in terms of efficiency but weak in terms of fairness. Advanced writing makes those criteria visible so the reader can follow the judgement.'],
  ['Policy Proposals', 'Formal proposal', 'Write a structured proposal with rationale, implementation steps, risks, and expected impact.', 'A proposal should move from problem to solution with practical logic. It needs to persuade decision-makers not only that an idea is attractive, but that it is feasible and worth prioritising.'],
  ['Research Summaries', 'Academic summary', 'Summarise complex research accurately while preserving nuance, limitations, and relevance.', 'A strong research summary compresses information without distorting it. It distinguishes the study\'s claim from its evidence, method, limitation, and implication.'],
  ['Literature & Culture Reviews', 'Critical review', 'Write a sophisticated review that combines description, interpretation, and evaluation.', 'A C1 review does more than say whether a work is good. It analyses technique, audience, intention, and effect, while supporting evaluation with specific textual or contextual evidence.'],
  ['Argument Synthesis', 'Synthesis essay', 'Integrate multiple viewpoints into a coherent argument with source-aware language.', 'Synthesis is not a list of sources. It is the act of showing how different perspectives confirm, challenge, or complicate one another within a single argument.'],
  ['Advanced Coherence', 'Cohesive academic text', 'Control paragraph flow, reference chains, thematic progression, and transitions across a long text.', 'Coherence at C1 depends on progression. Each sentence should connect to what came before while adding something new, creating a clear path through complex ideas.'],
  ['Nominalisation & Academic Style', 'Academic style transformation', 'Use nominalisation, passive structures, and abstract nouns to create formal academic style.', 'Nominalisation can make writing more concise and formal, but overuse creates density. Advanced writers use it selectively to focus on processes, findings, and relationships.'],
  ['Hedging & Qualification', 'Cautious academic argument', 'Make claims with appropriate caution using hedging, modality, and limitation language.', 'C1 writing avoids overstatement. Words such as may, appears, tends to, arguably, and to some extent allow writers to make strong but intellectually honest claims.'],
  ['Counterargument & Rebuttal', 'Argumentative essay section', 'Acknowledge opposing views and respond with evidence, reasoning, or qualification.', 'A strong rebuttal does not dismiss the opposing view cheaply. It recognises why the view is attractive and then explains why it is incomplete, exaggerated, or outweighed by stronger evidence.'],
  ['Executive Summaries', 'Professional summary', 'Write concise executive summaries for busy readers with key findings and recommendations.', 'An executive summary is not an introduction. It gives the central message, key evidence, implications, and recommended action in compressed form.'],
  ['Data Commentary', 'Analytical data commentary', 'Interpret data patterns, anomalies, and implications without overclaiming.', 'Data commentary requires selection. The writer must identify what matters most, describe it accurately, and explain its significance while avoiding unsupported causal claims.'],
  ['Problem-Solution Analysis', 'Problem-solution essay', 'Analyse complex problems and propose realistic solutions with trade-offs.', 'Advanced problem-solution writing distinguishes symptoms from causes. It evaluates solutions not only by desirability but also by feasibility, cost, and unintended consequences.'],
  ['Comparative Critique', 'Comparative essay', 'Compare two ideas, texts, policies, or approaches using meaningful criteria.', 'A comparative critique should not alternate random similarities and differences. It needs criteria such as effectiveness, fairness, scalability, reliability, or ethical cost.'],
  ['Persuasive Public Writing', 'Persuasive article', 'Persuade educated readers using rhetoric, evidence, audience awareness, and style control.', 'Persuasive writing at C1 balances force and credibility. It may use rhetorical questions or vivid examples, but the argument still needs evidence and a clear line of reasoning.'],
  ['Reflective Academic Writing', 'Reflective essay', 'Connect personal experience with analysis, learning, and future action.', 'Advanced reflection is not diary writing. It interprets experience through concepts, identifies change, and explains how insight will shape future behaviour.'],
  ['Professional Correspondence', 'Formal correspondence', 'Write tactful, precise emails and letters for complex professional situations.', 'Professional writing often requires diplomacy. The writer must be clear without sounding blunt, persuasive without sounding aggressive, and concise without losing important context.'],
  ['Grant & Application Statements', 'Application statement', 'Write persuasive personal statements with evidence of fit, impact, and motivation.', 'A strong application statement links experience to purpose. It avoids generic enthusiasm and instead demonstrates preparation, contribution, and realistic understanding of the opportunity.'],
  ['Editorial & Opinion Writing', 'Editorial essay', 'Write opinion pieces with voice, structure, evidence, and controlled rhetorical emphasis.', 'An editorial needs a recognisable voice, but voice must serve the argument. The best pieces combine clarity, urgency, evidence, and memorable phrasing.'],
  ['Advanced Writing Portfolio', 'Final C1 writing assessment', 'Plan, draft, revise, and evaluate a complete C1 text with genre control and stylistic precision.', 'A final C1 writing task requires integrated control: organisation, register, lexical precision, grammatical range, cohesion, and revision. The goal is not complexity for its own sake, but purposeful sophistication.'],
] as const;

export const advancedWritingLessons: AdvancedWritingLesson[] = specs.map(([title, genre, outcome, modelText], index) => {
  const id = index + 1;
  return {
    id,
    title,
    genre,
    outcome,
    overview: `${title} trains C1 writing control for academic and professional contexts. The lesson focuses on depth, precision, register, cohesion, and purposeful complexity.`,
    modelText,
    writingFocus: [
      'Define the reader, purpose, genre, and expected register before drafting.',
      'Build a controlling idea that can guide every paragraph.',
      'Develop paragraphs with claim, evidence, analysis, qualification, and link.',
      'Use transitions to show logic, not merely to decorate sentences.',
      'Revise for precision, concision, cohesion, and the strength of evidence.',
    ],
    languageTools: [
      'Hedging: arguably, appears to, may suggest, to some extent, it is plausible that.',
      'Evaluation: compelling, problematic, limited, robust, questionable, significant.',
      'Cohesion: this pattern, such findings, the former, the latter, in this respect.',
      'Contrast: nevertheless, notwithstanding, conversely, while this is true.',
      'Synthesis: taken together, these points suggest, the evidence therefore indicates.',
    ],
    writingExercises: [
      `Sentence upgrade: rewrite this basic sentence in a C1 style for ${genre.toLowerCase()}: "This is important and many people think about it."`,
      `Outline practice: create a four-part plan for a ${genre.toLowerCase()} with introduction, two developed body sections, and conclusion.`,
      `Paragraph development: write one 90-word paragraph using claim, evidence, analysis, qualification, and link.`,
      `Register control: rewrite one informal idea into formal C1 language using at least two language tools from this lesson.`,
      `Revision practice: take your paragraph and remove vague wording, overstatement, repetition, and weak transitions.`,
    ],
    writingTask: `Write a 280-350 word ${genre.toLowerCase()} on a topic connected to "${title}". Include a clear purpose, developed paragraphs, at least one qualification, and a final synthesis.`,
    revisionChecklist: [
      'Does the opening establish context and direction clearly?',
      'Does each paragraph develop one main idea with enough support?',
      'Is the register appropriate for a C1 academic or professional reader?',
      'Have I qualified claims instead of overgeneralising?',
      'Are transitions logical and varied?',
      'Have I removed vague words such as things, good, bad, and very?',
      'Does the conclusion synthesise rather than mechanically repeat?',
    ],
  };
});

export function getAdvancedWritingLesson(id: number) {
  return advancedWritingLessons.find((lesson) => lesson.id === id);
}

// Fifteen authored questions per lesson, each practising this lesson's skill.
function buildAdvancedWritingQuiz(lesson: AdvancedWritingLesson): AdvancedWritingQuizQuestion[] {
  return fromAuthored(advancedWritingQuizBank[lesson.id]);
}

// Options are written answer-first; shuffle them (seeded per lesson) so the answer is not always A.
export function getAdvancedWritingQuiz(lesson: AdvancedWritingLesson): AdvancedWritingQuizQuestion[] {
  return shuffleOpts(buildAdvancedWritingQuiz(lesson), hashSeed('getAdvancedWritingQuiz', lesson.title));
}
