export type ProficiencyVocabularyWord = {
  word: string;
  type: string;
  meaning: string;
  example: string;
  collocations: string[];
};

export type ProficiencyVocabularyQuiz = {
  q: string;
  opts: string[];
  ans: string;
  exp: string;
};

export type ProficiencyVocabularyLessonContent = {
  id: number;
  title: string;
  focus: string;
  words: ProficiencyVocabularyWord[];
  usageTask: string;
  quiz: ProficiencyVocabularyQuiz[];
};

const lessonTitles = [
  'C2 Academic Precision',
  'Rhetoric and Argument',
  'Policy and Governance',
  'Law, Rights, and Ethics',
  'Economics and Markets',
  'Scientific Reasoning',
  'Technology and AI',
  'Climate and Sustainability',
  'Psychology and Cognition',
  'Sociology and Inequality',
  'Literature and Criticism',
  'Culture and Identity',
  'Media and Discourse',
  'Diplomacy and Geopolitics',
  'Business Strategy',
  'Leadership and Organisations',
  'Medical and Public Health',
  'Philosophy and Abstract Thought',
  'Idioms and Figurative Register',
  'C2 Vocabulary Mastery',
];

const wordBank: Array<[string, string, string, string[]]> = [
  ['aberration', 'noun', 'a departure from what is normal or expected', ['statistical aberration', 'temporary aberration', 'treat as an aberration']],
  ['abrogate', 'verb', 'to formally abolish or cancel a rule, agreement, or responsibility', ['abrogate a treaty', 'abrogate responsibility', 'abrogate rights']],
  ['acrimonious', 'adjective', 'angry, bitter, and hostile in tone', ['acrimonious debate', 'acrimonious dispute', 'acrimonious exchange']],
  ['adjudicate', 'verb', 'to make an official judgement about a dispute', ['adjudicate a claim', 'adjudicate fairly', 'adjudicate disputes']],
  ['aesthetic', 'adjective', 'concerned with beauty, style, or artistic effect', ['aesthetic value', 'aesthetic judgement', 'aesthetic sensibility']],
  ['ameliorate', 'verb', 'to make a bad situation better', ['ameliorate conditions', 'ameliorate inequality', 'ameliorate harm']],
  ['anomaly', 'noun', 'something that does not fit an expected pattern', ['data anomaly', 'statistical anomaly', 'apparent anomaly']],
  ['antecedent', 'noun', 'something that came before and influenced a later event', ['historical antecedent', 'direct antecedent', 'cultural antecedents']],
  ['apocryphal', 'adjective', 'widely repeated but probably not true', ['apocryphal story', 'apocryphal account', 'largely apocryphal']],
  ['arbitrary', 'adjective', 'based on personal choice rather than clear reason or system', ['arbitrary decision', 'arbitrary distinction', 'arbitrary rule']],
  ['ascertain', 'verb', 'to discover or establish something with certainty', ['ascertain the facts', 'ascertain whether', 'ascertain the cause']],
  ['assiduous', 'adjective', 'showing great care, attention, and persistence', ['assiduous research', 'assiduous effort', 'assiduous attention']],
  ['attenuate', 'verb', 'to weaken, reduce, or make less severe', ['attenuate risk', 'attenuate the effect', 'attenuated response']],
  ['austerity', 'noun', 'strict economic policy involving reduced public spending', ['austerity measures', 'fiscal austerity', 'period of austerity']],
  ['axiomatic', 'adjective', 'accepted as obviously true or self-evident', ['axiomatic principle', 'seem axiomatic', 'almost axiomatic']],
  ['belie', 'verb', 'to give a false impression of something', ['belie the complexity', 'belie expectations', 'appearance belies reality']],
  ['capricious', 'adjective', 'changing suddenly and unpredictably', ['capricious behaviour', 'capricious market', 'capricious decision-making']],
  ['cogent', 'adjective', 'clear, logical, and convincing', ['cogent argument', 'cogent explanation', 'cogent critique']],
  ['commensurate', 'adjective', 'equal or appropriate in size, degree, or value', ['commensurate with risk', 'commensurate reward', 'commensurate response']],
  ['concomitant', 'adjective', 'naturally accompanying or associated with something', ['concomitant risk', 'concomitant increase', 'concomitant changes']],
  ['conflate', 'verb', 'to combine two ideas incorrectly as if they were the same', ['conflate issues', 'conflate correlation and causation', 'conflate categories']],
  ['contingent', 'adjective', 'dependent on particular conditions', ['contingent upon', 'contingent factor', 'historically contingent']],
  ['corroborate', 'verb', 'to support a statement with additional evidence', ['corroborate testimony', 'corroborate findings', 'corroborating evidence']],
  ['deference', 'noun', 'respectful submission to authority or judgement', ['show deference', 'institutional deference', 'excessive deference']],
  ['deleterious', 'adjective', 'harmful or damaging', ['deleterious effect', 'deleterious consequences', 'deleterious impact']],
  ['delineate', 'verb', 'to describe, outline, or mark boundaries clearly', ['delineate responsibilities', 'delineate boundaries', 'clearly delineate']],
  ['demagogue', 'noun', 'a leader who appeals to emotion and prejudice rather than reason', ['populist demagogue', 'demagogue rhetoric', 'act as a demagogue']],
  ['derivative', 'adjective', 'lacking originality because it copies something else', ['derivative work', 'derivative argument', 'seem derivative']],
  ['diffident', 'adjective', 'lacking confidence or assertiveness', ['diffident manner', 'diffident response', 'sound diffident']],
  ['disparate', 'adjective', 'very different from each other', ['disparate groups', 'disparate data', 'disparate interests']],
  ['disseminate', 'verb', 'to spread information widely', ['disseminate findings', 'disseminate information', 'wide dissemination']],
  ['dogmatic', 'adjective', 'asserting opinions as unquestionably true', ['dogmatic stance', 'dogmatic certainty', 'avoid dogmatic claims']],
  ['eclectic', 'adjective', 'drawing ideas or styles from diverse sources', ['eclectic approach', 'eclectic taste', 'eclectic mix']],
  ['efficacy', 'noun', 'the ability to produce the intended result', ['clinical efficacy', 'policy efficacy', 'questionable efficacy']],
  ['elucidate', 'verb', 'to explain or make something clear', ['elucidate a concept', 'elucidate the mechanism', 'further elucidate']],
  ['ephemeral', 'adjective', 'lasting for a very short time', ['ephemeral trend', 'ephemeral pleasure', 'ephemeral impact']],
  ['equivocal', 'adjective', 'ambiguous or open to more than one interpretation', ['equivocal evidence', 'equivocal response', 'remain equivocal']],
  ['exacerbate', 'verb', 'to make a problem worse', ['exacerbate inequality', 'exacerbate tensions', 'exacerbate symptoms']],
  ['exculpate', 'verb', 'to clear someone from blame', ['exculpate the accused', 'exculpatory evidence', 'attempt to exculpate']],
  ['exigency', 'noun', 'an urgent need or demand', ['political exigency', 'practical exigencies', 'exigencies of war']],
  ['fallacious', 'adjective', 'based on mistaken reasoning', ['fallacious assumption', 'fallacious argument', 'fallacious reasoning']],
  ['fastidious', 'adjective', 'very attentive to detail and standards', ['fastidious editor', 'fastidious attention', 'fastidious taste']],
  ['felicitous', 'adjective', 'well chosen, suitable, or pleasing', ['felicitous phrase', 'felicitous choice', 'felicitous expression']],
  ['hegemony', 'noun', 'dominance of one group, state, or ideology over others', ['cultural hegemony', 'regional hegemony', 'hegemonic power']],
  ['heterogeneous', 'adjective', 'made up of varied or diverse elements', ['heterogeneous group', 'heterogeneous sample', 'heterogeneous society']],
  ['impecunious', 'adjective', 'having little or no money', ['impecunious students', 'impecunious artist', 'remain impecunious']],
  ['inchoate', 'adjective', 'not fully formed or developed', ['inchoate idea', 'inchoate movement', 'inchoate anger']],
  ['incontrovertible', 'adjective', 'impossible to deny or dispute', ['incontrovertible evidence', 'incontrovertible fact', 'seem incontrovertible']],
  ['indefatigable', 'adjective', 'persisting tirelessly', ['indefatigable campaigner', 'indefatigable energy', 'indefatigable effort']],
  ['ineffable', 'adjective', 'too great or subtle to be expressed in words', ['ineffable quality', 'ineffable beauty', 'almost ineffable']],
  ['inimical', 'adjective', 'harmful or hostile to something', ['inimical to democracy', 'inimical effect', 'inimical interests']],
  ['insidious', 'adjective', 'gradually harmful in a hidden way', ['insidious influence', 'insidious bias', 'insidious process']],
  ['interlocutor', 'noun', 'a person taking part in a conversation or dialogue', ['skilled interlocutor', 'main interlocutor', 'address the interlocutor']],
  ['laconic', 'adjective', 'using very few words', ['laconic reply', 'laconic style', 'laconic humour']],
  ['liminal', 'adjective', 'relating to a transitional or threshold state', ['liminal space', 'liminal period', 'liminal identity']],
  ['mendacious', 'adjective', 'not truthful; lying', ['mendacious claim', 'mendacious politician', 'mendacious account']],
  ['meticulous', 'adjective', 'showing great attention to detail', ['meticulous research', 'meticulous planning', 'meticulous records']],
  ['nebulous', 'adjective', 'vague, unclear, or poorly defined', ['nebulous concept', 'nebulous goals', 'nebulous idea']],
  ['obfuscate', 'verb', 'to make something unclear or difficult to understand', ['obfuscate the issue', 'deliberately obfuscate', 'obfuscate responsibility']],
  ['orthodox', 'adjective', 'following accepted or traditional beliefs', ['orthodox view', 'orthodox economics', 'orthodox approach']],
  ['panacea', 'noun', 'a supposed solution for all problems', ['not a panacea', 'technological panacea', 'presented as a panacea']],
  ['parsimony', 'noun', 'economy or simplicity in explanation or spending', ['principle of parsimony', 'fiscal parsimony', 'explanatory parsimony']],
  ['perfunctory', 'adjective', 'done with little care or enthusiasm', ['perfunctory apology', 'perfunctory review', 'perfunctory response']],
  ['pernicious', 'adjective', 'extremely harmful, especially gradually', ['pernicious myth', 'pernicious effect', 'pernicious influence']],
  ['perspicacious', 'adjective', 'having sharp insight and understanding', ['perspicacious observer', 'perspicacious analysis', 'perspicacious comment']],
  ['placate', 'verb', 'to calm or satisfy someone who is angry', ['placate critics', 'placate voters', 'attempt to placate']],
  ['polemic', 'noun', 'a strong written or spoken attack on a position', ['political polemic', 'sharp polemic', 'write a polemic']],
  ['precarious', 'adjective', 'unstable, insecure, or risky', ['precarious position', 'precarious employment', 'precarious balance']],
  ['prosaic', 'adjective', 'ordinary, dull, or lacking imagination', ['prosaic explanation', 'prosaic detail', 'prosaic reality']],
  ['quixotic', 'adjective', 'idealistic in an impractical way', ['quixotic ambition', 'quixotic campaign', 'quixotic project']],
  ['recalcitrant', 'adjective', 'resisting authority or control', ['recalcitrant minority', 'recalcitrant student', 'recalcitrant problem']],
  ['redress', 'noun', 'remedy or compensation for a wrong', ['seek redress', 'legal redress', 'provide redress']],
  ['salient', 'adjective', 'most noticeable or important', ['salient feature', 'salient point', 'salient distinction']],
  ['sanguine', 'adjective', 'optimistic, especially in a difficult situation', ['remain sanguine', 'sanguine outlook', 'overly sanguine']],
  ['soporific', 'adjective', 'causing sleepiness or boredom', ['soporific lecture', 'soporific effect', 'soporific tone']],
  ['specious', 'adjective', 'seeming true but actually false', ['specious argument', 'specious reasoning', 'specious claim']],
  ['spurious', 'adjective', 'false or not genuine', ['spurious correlation', 'spurious claim', 'spurious evidence']],
  ['substantive', 'adjective', 'meaningful, real, or important', ['substantive change', 'substantive issue', 'substantive discussion']],
  ['tacit', 'adjective', 'understood without being openly stated', ['tacit agreement', 'tacit approval', 'tacit assumption']],
  ['tenuous', 'adjective', 'weak, thin, or uncertain', ['tenuous link', 'tenuous evidence', 'tenuous connection']],
  ['trenchant', 'adjective', 'sharp, forceful, and effective in expression', ['trenchant critique', 'trenchant analysis', 'trenchant observation']],
  ['ubiquitous', 'adjective', 'present almost everywhere', ['ubiquitous technology', 'ubiquitous presence', 'increasingly ubiquitous']],
  ['umbrage', 'noun', 'offence or annoyance', ['take umbrage', 'express umbrage', 'cause umbrage']],
  ['verisimilitude', 'noun', 'the appearance of being true or real', ['sense of verisimilitude', 'literary verisimilitude', 'create verisimilitude']],
  ['vicissitude', 'noun', 'an unpleasant change or difficulty in life', ['vicissitudes of life', 'economic vicissitudes', 'political vicissitudes']],
];

function makeWords(lessonIndex: number, title: string): ProficiencyVocabularyWord[] {
  return Array.from({ length: 30 }, (_, index) => {
    const [word, type, meaning, collocations] = wordBank[(lessonIndex * 9 + index) % wordBank.length];
    return {
      word,
      type,
      meaning,
      example: `In ${title.toLowerCase()}, a precise writer might use "${word}" to express a subtle distinction rather than a basic idea.`,
      collocations,
    };
  });
}

function makeQuiz(id: number, words: ProficiencyVocabularyWord[]): ProficiencyVocabularyQuiz[] {
  return Array.from({ length: 20 }, (_, index) => {
    const word = words[index % words.length];
    const distractorA = words[(index + 7) % words.length];
    const distractorB = words[(index + 13) % words.length];
    return {
      q: `What does "${word.word}" mean in C2 usage?`,
      opts: [word.meaning, distractorA.meaning, distractorB.meaning],
      ans: word.meaning,
      exp: `"${word.word}" means ${word.meaning}. Common collocation: ${word.collocations[0]}.`,
    };
  });
}

export const proficiencyVocabularyLessons: ProficiencyVocabularyLessonContent[] = lessonTitles.map((title, index) => {
  const words = makeWords(index, title);
  return {
    id: index + 1,
    title,
    focus: `Master C2 vocabulary for ${title.toLowerCase()} with meaning, collocation, example usage, and register awareness.`,
    words,
    usageTask: `Write a 180-word paragraph about ${title.toLowerCase()} using at least eight words from this lesson. Include one contrast, one qualification, and one synthesis sentence.`,
    quiz: makeQuiz(index + 1, words),
  };
});

export function getProficiencyVocabularyLesson(id: number) {
  return proficiencyVocabularyLessons.find((lesson) => lesson.id === id) ?? proficiencyVocabularyLessons[0];
}
