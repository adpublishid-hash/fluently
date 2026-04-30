export type AdvancedVocabularyWord = {
  word: string;
  type: string;
  meaning: string;
  example: string;
  collocations: string[];
};

export type AdvancedVocabularyLesson = {
  id: number;
  title: string;
  focus: string;
  words: AdvancedVocabularyWord[];
};

const lessonTitles = [
  'Academic Excellence',
  'Professional Register',
  'Scientific Discourse',
  'Economic & Financial Terms',
  'Political & Legal Language',
  'Idiomatic Expressions',
  'High-Frequency Collocations',
  'Formal vs Informal Register',
  'Affixation & Word Formation',
  'Metaphor & Figurative Language',
  'Discourse & Rhetoric Vocabulary',
  'Medical & Health Terminology',
  'Technology & Innovation',
  'Environmental & Climate Terms',
  'Philosophical Concepts',
  'Literary & Critical Terms',
  'Psychological Language',
  'International Relations',
  'Arts & Culture',
  'C1 Vocabulary Mastery',
  'Law & Criminal Justice',
  'Architecture & Urban Design',
  'Cognitive Science & Neuroscience',
  'Sociology & Social Theory',
  'Linguistics & Language Theory',
  'Economics of Innovation',
  'Climate Science & Policy',
  'Medical Research & Clinical Trials',
  'Postcolonial & Cultural Studies',
  'Leadership & Organisational Behaviour',
  'Geopolitics & Security',
  'Food Science & Nutrition',
  'Space Science & Astronomy',
  'Financial Markets & Investment',
  'Development Economics',
  'Media & Communication Theory',
  'Bioethics & Medical Ethics',
  'Artificial Intelligence & Machine Learning',
  'Public Health & Epidemiology',
  'Philosophy of Science',
  'Gender Studies & Feminism',
  'Urban Studies & Smart Cities',
  'Energy Systems & Renewables',
  'Human Rights & International Law',
  'Behavioural Economics',
  'Supply Chain & Globalisation',
  'Data Privacy & Digital Rights',
  'Conflict Resolution & Mediation',
  'Environmental Justice',
  'C1/C2 Master Vocabulary Test',
];

const wordBank = [
  ['paradigm', 'Noun', 'a model, framework, or dominant way of thinking', ['paradigm shift', 'dominant paradigm', 'new paradigm']],
  ['ubiquitous', 'Adjective', 'present or found almost everywhere', ['ubiquitous presence', 'increasingly ubiquitous', 'seemingly ubiquitous']],
  ['mitigate', 'Verb', 'to make a problem, risk, or impact less severe', ['mitigate risk', 'mitigate damage', 'mitigate the impact']],
  ['scrutinise', 'Verb', 'to examine something carefully and critically', ['scrutinise evidence', 'scrutinise closely', 'come under scrutiny']],
  ['inherent', 'Adjective', 'existing as a natural or essential part of something', ['inherent risk', 'inherent limitation', 'inherent value']],
  ['empirical', 'Adjective', 'based on observation, data, or experiment', ['empirical evidence', 'empirical research', 'empirical findings']],
  ['nuanced', 'Adjective', 'showing subtle distinctions and complexity', ['nuanced argument', 'nuanced view', 'nuanced understanding']],
  ['substantiate', 'Verb', 'to support a claim with evidence', ['substantiate a claim', 'substantiate allegations', 'substantiate findings']],
  ['plausible', 'Adjective', 'reasonable or believable', ['plausible explanation', 'plausible scenario', 'plausible argument']],
  ['contentious', 'Adjective', 'likely to cause disagreement or debate', ['contentious issue', 'contentious claim', 'highly contentious']],
  ['detrimental', 'Adjective', 'harmful or damaging', ['detrimental effect', 'detrimental impact', 'detrimental consequences']],
  ['exacerbate', 'Verb', 'to make an existing problem worse', ['exacerbate inequality', 'exacerbate tensions', 'exacerbate the crisis']],
  ['constrain', 'Verb', 'to limit or restrict', ['constrain growth', 'constrain behaviour', 'constrain choice']],
  ['facilitate', 'Verb', 'to make a process easier or more effective', ['facilitate cooperation', 'facilitate access', 'facilitate change']],
  ['prevalent', 'Adjective', 'common or widespread in a particular context', ['highly prevalent', 'prevalent among', 'prevalent belief']],
  ['ambiguous', 'Adjective', 'open to more than one interpretation', ['ambiguous wording', 'ambiguous evidence', 'remain ambiguous']],
  ['coherent', 'Adjective', 'clear, logical, and well organised', ['coherent strategy', 'coherent argument', 'coherent account']],
  ['robust', 'Adjective', 'strong, reliable, and able to withstand challenge', ['robust evidence', 'robust framework', 'robust debate']],
  ['tangible', 'Adjective', 'clear, definite, and able to be noticed or measured', ['tangible benefits', 'tangible progress', 'tangible outcome']],
  ['profound', 'Adjective', 'very great, deep, or significant', ['profound effect', 'profound implications', 'profound change']],
  ['incremental', 'Adjective', 'happening gradually in small steps', ['incremental change', 'incremental improvement', 'incremental progress']],
  ['viable', 'Adjective', 'able to work successfully or be practical', ['viable option', 'viable solution', 'commercially viable']],
  ['integrate', 'Verb', 'to combine parts into a whole', ['integrate data', 'integrate systems', 'integrate knowledge']],
  ['undermine', 'Verb', 'to weaken or damage gradually', ['undermine trust', 'undermine confidence', 'undermine authority']],
  ['bolster', 'Verb', 'to support or strengthen', ['bolster confidence', 'bolster evidence', 'bolster security']],
  ['notwithstanding', 'Adverb', 'despite something; nevertheless', ['notwithstanding concerns', 'notwithstanding evidence', 'notwithstanding the fact']],
  ['ostensibly', 'Adverb', 'apparently, but perhaps not actually', ['ostensibly neutral', 'ostensibly designed', 'ostensibly simple']],
  ['predicated', 'Adjective', 'based on or dependent on something', ['predicated on assumptions', 'predicated on evidence', 'predicated on growth']],
  ['salient', 'Adjective', 'most noticeable or important', ['salient feature', 'salient point', 'salient issue']],
  ['ramification', 'Noun', 'a complex consequence of an action or decision', ['legal ramifications', 'political ramifications', 'far-reaching ramifications']],
  ['discrepancy', 'Noun', 'a difference between things that should match', ['significant discrepancy', 'data discrepancy', 'explain the discrepancy']],
  ['convergence', 'Noun', 'the process of coming together or becoming similar', ['policy convergence', 'technological convergence', 'convergence of ideas']],
  ['divergence', 'Noun', 'the process of becoming different', ['ideological divergence', 'market divergence', 'divergence between groups']],
  ['resilient', 'Adjective', 'able to recover from difficulty', ['resilient system', 'resilient community', 'remain resilient']],
  ['volatile', 'Adjective', 'likely to change suddenly and unpredictably', ['volatile market', 'volatile situation', 'politically volatile']],
  ['equitable', 'Adjective', 'fair and impartial', ['equitable access', 'equitable distribution', 'equitable system']],
  ['legitimate', 'Adjective', 'reasonable, lawful, or justified', ['legitimate concern', 'legitimate authority', 'legitimate claim']],
  ['anomaly', 'Noun', 'something that differs from what is normal or expected', ['statistical anomaly', 'market anomaly', 'apparent anomaly']],
  ['corroborate', 'Verb', 'to confirm or support with additional evidence', ['corroborate testimony', 'corroborate findings', 'corroborate evidence']],
  ['allocate', 'Verb', 'to distribute resources for a purpose', ['allocate resources', 'allocate funding', 'allocate time']],
  ['deviation', 'Noun', 'a departure from a standard or expected pattern', ['standard deviation', 'minor deviation', 'deviation from norms']],
  ['synthesis', 'Noun', 'a combination of ideas into a coherent whole', ['critical synthesis', 'synthesis of evidence', 'theoretical synthesis']],
  ['trajectory', 'Noun', 'the path or development of something over time', ['growth trajectory', 'career trajectory', 'future trajectory']],
  ['pervasive', 'Adjective', 'spreading widely through an area or system', ['pervasive influence', 'pervasive problem', 'pervasive culture']],
  ['conducive', 'Adjective', 'making a result more likely', ['conducive to growth', 'conducive environment', 'conducive conditions']],
  ['tenuous', 'Adjective', 'weak, uncertain, or not strongly supported', ['tenuous link', 'tenuous evidence', 'tenuous relationship']],
  ['impartial', 'Adjective', 'fair and not biased', ['impartial assessment', 'impartial observer', 'remain impartial']],
  ['precedent', 'Noun', 'an earlier example used as a guide', ['set a precedent', 'legal precedent', 'historical precedent']],
  ['decentralise', 'Verb', 'to move power away from a central authority', ['decentralise authority', 'decentralise services', 'decentralise decision-making']],
  ['reconcile', 'Verb', 'to make opposing ideas compatible', ['reconcile differences', 'reconcile interests', 'reconcile data']],
];

function makeExample(word: string, topic: string) {
  return `In discussions of ${topic.toLowerCase()}, the term "${word}" helps express a precise advanced idea without relying on vague language.`;
}

export function getAdvancedVocabularyLessons(): AdvancedVocabularyLesson[] {
  return lessonTitles.map((title, index) => {
    const words = Array.from({ length: 30 }, (_, i) => {
      const [word, type, meaning, collocations] = wordBank[(index * 7 + i) % wordBank.length];
      return {
        word,
        type,
        meaning,
        example: makeExample(word, title),
        collocations,
      };
    });

    return {
      id: index + 1,
      title,
      focus: `30 advanced C1/C2 vocabulary items for ${title.toLowerCase()}, with meaning, example sentence, and collocations.`,
      words,
    };
  });
}

export function getAdvancedVocabularyLesson(id: number) {
  return getAdvancedVocabularyLessons().find((lesson) => lesson.id === id);
}

export function getAdvancedVocabularyQuiz(lesson: AdvancedVocabularyLesson) {
  const meaningQuestions = lesson.words.slice(0, 10).map((item, index) => {
    const a = lesson.words[(index + 3) % lesson.words.length];
    const b = lesson.words[(index + 9) % lesson.words.length];
    return {
      q: `What does "${item.word}" mean?`,
      opts: [item.meaning, a.meaning, b.meaning],
      ans: item.meaning,
      exp: `"${item.word}" means ${item.meaning}.`,
    };
  });

  const collocationQuestions = lesson.words.slice(10, 20).map((item, index) => ({
    q: `Which collocation is natural with "${item.word}"?`,
    opts: [item.collocations[0], `make ${item.word}`, `do ${item.word}`],
    ans: item.collocations[0],
    exp: `"${item.collocations[0]}" is a natural collocation.`,
  }));

  return [...meaningQuestions, ...collocationQuestions];
}
