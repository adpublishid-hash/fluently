import { hashSeed, shuffleOpts } from '../../../../../utils/quiz';
import { fromAuthored } from '../../advanced/shared/authoredQuiz';
import { proficiencyWritingQuizBank } from './writingQuizBank';
export type ProficiencyWritingQuiz = {
  q: string;
  opts: string[];
  ans: string;
  exp: string;
};

export type ProficiencyWritingLessonContent = {
  id: number;
  title: string;
  genre: string;
  objective: string;
  overview: string;
  modelText: string;
  writingFocus: string[];
  languageTools: string[];
  exercises: string[];
  writingTask: string;
  revisionChecklist: string[];
  quiz: ProficiencyWritingQuiz[];
};

const lessonSeeds = [
  ['C2 Diagnostic Essay', 'high-level diagnostic essay'],
  ['Scholarly Argument', 'academic argument essay'],
  ['Critical Literature Review', 'literature review section'],
  ['Policy Brief', 'executive policy brief'],
  ['Research Abstract', 'research abstract and summary'],
  ['Position Paper', 'formal position paper'],
  ['Editorial with Voice', 'public editorial'],
  ['Reflective Critical Essay', 'critical reflective essay'],
  ['Comparative Analysis', 'comparative analytical essay'],
  ['Grant Proposal', 'grant or project proposal'],
  ['Professional Report', 'strategic professional report'],
  ['Data Interpretation', 'data commentary report'],
  ['Legal-Style Argument', 'formal legal-style analysis'],
  ['Cultural Criticism', 'cultural criticism essay'],
  ['Advanced Correspondence', 'complex professional email'],
  ['Speech Script Writing', 'formal speech script'],
  ['Book or Film Critique', 'sophisticated review'],
  ['Narrative Nonfiction', 'literary nonfiction piece'],
  ['Integrated Source Synthesis', 'multi-source synthesis'],
  ['C2 Writing Portfolio', 'final proficiency writing assessment'],
];

const modelTopics = [
  'language learning and professional identity',
  'public trust in expert knowledge',
  'emerging research on digital attention',
  'urban adaptation and climate resilience',
  'the ethical use of artificial intelligence',
  'university access and social mobility',
  'technology, convenience, and civic life',
  'failure as evidence of learning',
  'remote work and organisational culture',
  'community education initiatives',
  'risk management in public institutions',
  'economic inequality and household behaviour',
  'privacy obligations in digital contracts',
  'cultural memory and representation',
  'a sensitive workplace conflict',
  'a public address on educational reform',
  'a work of art that divides audiences',
  'a personal encounter with social change',
  'three sources on environmental responsibility',
  'a complete C2 writing portfolio theme',
];

function makeModelText(index: number, genre: string) {
  const topic = modelTopics[index];
  return `A polished ${genre} on ${topic} should resist the temptation to sound impressive at the expense of clarity. The central claim needs to be exact, not merely forceful: while the issue may appear straightforward, its consequences are distributed unevenly across groups, institutions, and time. A stronger text therefore moves beyond assertion. It defines the problem, qualifies the scope of the claim, acknowledges a plausible objection, and then shows why the proposed interpretation remains defensible. The style is formal but not inflated; the paragraphs are cohesive but not mechanical. Most importantly, the conclusion does not simply repeat the introduction. It synthesises the argument by explaining what the reader should now understand differently.`;
}

const writingFocus = [
  'Establish a precise controlling idea before drafting.',
  'Use paragraph architecture: claim, evidence, analysis, qualification, and link.',
  'Control register so the text sounds polished rather than decorative.',
  'Use cohesion to guide logic, not just to connect sentences.',
  'Revise for density, elegance, evidence quality, and reader impact.',
];

const languageTools = [
  'Precision: more specifically, in practical terms, the distinction matters because.',
  'Qualification: this does not necessarily imply, it would be premature to conclude.',
  'Synthesis: taken together, these considerations suggest, the stronger interpretation is.',
  'Evaluation: defensible, overstated, underdeveloped, consequential, methodologically weak.',
  'Style control: avoid vague intensifiers; prefer exact nouns, active verbs, and purposeful abstraction.',
];

export const proficiencyWritingLessons: ProficiencyWritingLessonContent[] = lessonSeeds.map(([title, genre], index) => ({
  id: index + 1,
  title,
  genre,
  objective: `By the end of this lesson, learners can produce a ${genre} with C2-level precision, register control, sophisticated cohesion, and purposeful revision.`,
  overview: `${title} trains writing mastery for academic, professional, and public contexts. The focus is not complexity for its own sake, but elegant control of meaning, evidence, tone, and reader expectations.`,
  modelText: makeModelText(index, genre),
  writingFocus,
  languageTools,
  exercises: [
    `Rewrite a vague thesis about ${modelTopics[index]} into one precise C2 claim.`,
    `Draft one paragraph for a ${genre} using claim, evidence, analysis, qualification, and link.`,
    'Reduce a 90-word paragraph to 65 words without losing nuance.',
    'Rewrite one informal sentence into formal, polished C2 style.',
    'Add one concession and one synthesis sentence to strengthen the argument.',
  ],
  writingTask: `Write a 350-450 word ${genre} about ${modelTopics[index]}. Include a precise thesis, two developed sections, one concession, careful qualification, and a synthesising conclusion.`,
  revisionChecklist: [
    'Is the central claim exact and defensible?',
    'Does each paragraph perform a clear function?',
    'Have I qualified claims where evidence is limited?',
    'Is the register appropriate for a C2 academic or professional reader?',
    'Does the conclusion synthesise rather than repeat?',
  ],
  // Fifteen authored questions per lesson; options shuffled per lesson so the answer is not always A.
    quiz: shuffleOpts(fromAuthored(proficiencyWritingQuizBank[index + 1]), hashSeed('proficiencyWritingContent', title)),
}));

export function getProficiencyWritingLesson(id: number) {
  return proficiencyWritingLessons.find((lesson) => lesson.id === id) ?? proficiencyWritingLessons[0];
}
