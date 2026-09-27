import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, ArrowLeft, CheckCircle2, Clock3, Download, Eye, EyeOff, FileText, Flag, Headphones, ListChecks, Mail, Play, RotateCcw, Trophy, Volume2, XCircle } from 'lucide-react';
import PageContainer from '../../../../components/layout/PageContainer';
import { useAuth } from '../../../../auth/AuthContext';
import { generateToeflCertificate, generateToeflCertificateBase64 } from '../../../../utils/generateToeflCertificate';
import { hasApiKey, playAudio, stopCurrentAudio } from '../../../../services/ttsService';
import { ANSWER_PENDING, toeflPractice2Questions } from './toeflPractice2Data';
import type { Question, SectionId } from './toeflPractice2Data';

const STORAGE_KEY = 'talky_exam_english_toefl1_result';
const PROGRESS_STORAGE_KEY = 'talky_exam_english_toefl2_progress';
const EXAM_SECONDS = 115 * 60;

const toeflScoreConversion: Record<SectionId, Record<number, number>> = {
  Listening: {
    1: 25, 2: 26, 3: 27, 4: 28, 5: 29, 6: 30, 7: 31, 8: 32, 9: 32,
    10: 33, 11: 35, 12: 37, 13: 38, 14: 39, 15: 41, 16: 41, 17: 42, 18: 43, 19: 44,
    20: 45, 21: 45, 22: 46, 23: 47, 24: 47, 25: 48, 26: 48, 27: 49, 28: 49, 29: 50,
    30: 51, 31: 52, 32: 52, 33: 53, 34: 53, 35: 54, 36: 54, 37: 55, 38: 56, 39: 57,
    40: 57, 41: 58, 42: 59, 43: 60, 44: 61, 45: 62, 46: 63, 47: 65, 48: 66, 49: 67, 50: 68,
  },
  Structure: {
    1: 20, 2: 21, 3: 22, 4: 23, 5: 25, 6: 26, 7: 27, 8: 29, 9: 31,
    10: 33, 11: 35, 12: 36, 13: 37, 14: 38, 15: 40, 16: 40, 17: 41, 18: 42, 19: 43,
    20: 44, 21: 45, 22: 46, 23: 47, 24: 48, 25: 49, 26: 50, 27: 51, 28: 52, 29: 53,
    30: 54, 31: 55, 32: 56, 33: 57, 34: 58, 35: 60, 36: 61, 37: 63, 38: 65, 39: 68, 40: 68,
  },
  Reading: {
    1: 22, 2: 23, 3: 23, 4: 25, 5: 26, 6: 27, 7: 28, 8: 28, 9: 29,
    10: 30, 11: 31, 12: 32, 13: 33, 14: 34, 15: 35, 16: 36, 17: 37, 18: 38, 19: 39,
    20: 40, 21: 41, 22: 42, 23: 43, 24: 43, 25: 44, 26: 45, 27: 46, 28: 46, 29: 47,
    30: 48, 31: 48, 32: 49, 33: 50, 34: 51, 35: 52, 36: 52, 37: 53, 38: 54, 39: 54,
    40: 55, 41: 56, 42: 57, 43: 58, 44: 59, 45: 60, 46: 61, 47: 63, 48: 65, 49: 66, 50: 67,
  },
};

const maxConversionRaw: Record<SectionId, number> = {
  Listening: 50,
  Structure: 40,
  Reading: 50,
};

const getConvertedSectionScore = (section: SectionId, raw: number) => {
  const clampedRaw = Math.min(Math.max(raw, 1), maxConversionRaw[section]);
  return toeflScoreConversion[section][clampedRaw];
};

const sectionConfig = [
  { title: 'Listening' as const, icon: Headphones, total: 50, time: '35 min' },
  { title: 'Structure' as const, icon: ListChecks, total: 40, time: '25 min' },
  { title: 'Reading' as const, icon: FileText, total: 50, time: '55 min' },
];

const optionSet = (correct: string, distractors: string[], position: number) => {
  const options = [...distractors.slice(0, 3)];
  options.splice(position % 4, 0, correct);
  return { options, answer: position % 4 };
};

const listeningSituations = [
  {
    transcript: 'A student asks when the library closes. The librarian says it closes at seven tonight because of a staff meeting.',
    prompt: 'When does the library close tonight?',
    correct: 'At seven',
    distractors: ['At five', 'At six', 'At eight'],
    explanation: 'The librarian directly says the library closes at seven tonight.',
  },
  {
    transcript: 'A woman says she cannot attend the workshop because her train has been delayed for nearly an hour.',
    prompt: 'Why will the woman miss the workshop?',
    correct: 'Her train is delayed',
    distractors: ['She forgot the location', 'The workshop was cancelled', 'She is preparing a report'],
    explanation: 'The woman mentions a delayed train as the reason.',
  },
  {
    transcript: 'The professor tells the class that the essay deadline has been moved from Friday to Monday.',
    prompt: 'What change does the professor announce?',
    correct: 'The essay is due on Monday',
    distractors: ['The essay is cancelled', 'The class meets on Friday', 'The exam is postponed'],
    explanation: 'The deadline is moved from Friday to Monday.',
  },
  {
    transcript: 'A man says he bought the cheaper textbook because the new edition was too expensive and almost identical.',
    prompt: 'Why did the man buy the cheaper textbook?',
    correct: 'The new edition cost too much',
    distractors: ['The cheaper book had more chapters', 'The professor required it', 'The bookstore was closed'],
    explanation: 'He chose it because the new edition was expensive and very similar.',
  },
  {
    transcript: 'A student asks for clarification about the lab report. The assistant says the results section should include a table and a short explanation.',
    prompt: 'What should be included in the results section?',
    correct: 'A table and a short explanation',
    distractors: ['Only a conclusion', 'A list of references', 'A long personal reflection'],
    explanation: 'The assistant specifies a table plus a short explanation.',
  },
  {
    transcript: 'A woman says the apartment is convenient, but she is worried because the street is noisy at night.',
    prompt: 'What problem does the woman mention?',
    correct: 'Noise at night',
    distractors: ['A high deposit', 'No public transport', 'A small kitchen'],
    explanation: 'She is concerned about the noisy street at night.',
  },
  {
    transcript: 'The advisor recommends that the student take statistics before applying for the research internship.',
    prompt: 'What does the advisor recommend?',
    correct: 'Taking statistics first',
    distractors: ['Changing majors', 'Applying immediately', 'Dropping the internship'],
    explanation: 'The advisor says statistics should be taken before the internship application.',
  },
  {
    transcript: 'A man says he enjoyed the guest lecture because the speaker used real business examples instead of abstract theory.',
    prompt: 'Why did the man like the guest lecture?',
    correct: 'It included real business examples',
    distractors: ['It ended early', 'It had no required reading', 'It was about music theory'],
    explanation: 'The speaker used real examples, which the man liked.',
  },
  {
    transcript: 'The announcement says that students must bring identification cards to enter the testing room.',
    prompt: 'What are students required to bring?',
    correct: 'Identification cards',
    distractors: ['Printed essays', 'Lab coats', 'Library books'],
    explanation: 'The announcement states that ID cards are required.',
  },
  {
    transcript: 'A woman says she will reserve a smaller room because only twelve people confirmed attendance.',
    prompt: 'Why will the woman reserve a smaller room?',
    correct: 'Only twelve people will attend',
    distractors: ['The larger room has no projector', 'The meeting was delayed', 'The room is cheaper on Friday'],
    explanation: 'She chooses a smaller room because attendance is limited.',
  },
];

const listeningQuestions: Question[] = Array.from({ length: 50 }, (_, index) => {
  const item = listeningSituations[index % listeningSituations.length];
  const { options, answer } = optionSet(item.correct, item.distractors, index);
  return {
    id: `l${index + 1}`,
    section: 'Listening',
    passage: `Audio transcript ${index + 1}: ${item.transcript}`,
    prompt: item.prompt,
    options,
    answer,
    explanation: item.explanation,
  };
});

const structureItems = [
  ['She _____ English for three years.', 'has studied', ['studies', 'is study', 'study'], 'Present perfect is used with for + period of time.'],
  ['The meeting _____ yesterday afternoon.', 'was cancelled', ['cancelled by', 'was cancel', 'cancelling'], 'Passive past form: was cancelled.'],
  ['If I had more time, I _____ another practice test.', 'would take', ['will take', 'take', 'am taking'], 'Second conditional uses would + base verb.'],
  ['Neither the students nor the teacher _____ ready.', 'is', ['are', 'be', 'were'], 'The verb agrees with the nearer subject, teacher.'],
  ['The book _____ on the desk belongs to Maya.', 'lying', ['lies', 'is lied', 'to lie'], 'The participle lying modifies the book.'],
  ['He is interested _____ studying abroad.', 'in', ['on', 'at', 'for'], 'Interested is followed by in.'],
  ['By the time we arrived, the lecture _____.', 'had begun', ['begins', 'has begun', 'began'], 'Past perfect shows an earlier past action.'],
  ['The research was _____ difficult than expected.', 'more', ['most', 'many', 'much'], 'Comparative adjective: more difficult.'],
  ['Only after the exam _____ how hard it was.', 'did they realize', ['they realized', 'realized they', 'they did realize'], 'Inversion follows only after at the beginning.'],
  ['The manager asked that the report _____ revised.', 'be', ['is', 'was', 'being'], 'Subjunctive after asked that: be revised.'],
  ['The woman _____ car was stolen called the police.', 'whose', ['who', 'which', 'whom'], 'Whose shows possession.'],
  ['There are several reasons _____ students choose online classes.', 'why', ['which', 'what', 'whose'], 'Reasons why is the correct relative structure.'],
  ['The lecture was so clear _____ everyone understood it.', 'that', ['than', 'as', 'because of'], 'So + adjective + that expresses result.'],
  ['Despite _____ tired, she finished the assignment.', 'being', ['was', 'be', 'been'], 'Despite is followed by a noun or gerund.'],
  ['The data _____ collected from three universities.', 'were', ['was', 'is', 'has'], 'Data is treated as plural in formal academic English.'],
  ['The professor made the students _____ their drafts.', 'revise', ['to revise', 'revising', 'revised'], 'Make + object + base verb.'],
  ['No sooner had the class started _____ the fire alarm rang.', 'than', ['when', 'then', 'that'], 'No sooner pairs with than.'],
  ['The article is worth _____.', 'reading', ['to read', 'read', 'being read'], 'Worth is followed by a gerund.'],
  ['Each of the answers _____ correct.', 'is', ['are', 'were', 'be'], 'Each is singular.'],
  ['The students objected _____ the schedule change.', 'to', ['for', 'about', 'with'], 'Object is followed by to.'],
  ['The more she practiced, _____ confident she became.', 'the more', ['more', 'most', 'the most'], 'Parallel comparative: the more, the more.'],
  ['The committee has not decided _____ to approve the plan.', 'whether', ['weather', 'which', 'whose'], 'Whether introduces an alternative decision.'],
  ['This is the most useful feedback I _____ received.', 'have ever', ['ever have', 'had ever', 'am ever'], 'Present perfect with ever: have ever received.'],
  ['The instructor advised us _____ notes during the lecture.', 'to take', ['take', 'taking', 'taken'], 'Advise + object + to-infinitive.'],
  ['A number of students _____ absent today.', 'are', ['is', 'was', 'be'], 'A number of means several and takes plural verb.'],
  ['The experiment, _____ lasted two hours, was successful.', 'which', ['who', 'whose', 'what'], 'Which refers to the experiment.'],
  ['She speaks English _____ than her brother does.', 'more fluently', ['fluently', 'most fluently', 'fluent'], 'Comparative adverb: more fluently.'],
  ['The files must _____ before Friday.', 'be submitted', ['submit', 'submitted', 'be submit'], 'Modal passive: must be submitted.'],
  ['It was not until midnight _____ the team finished.', 'that', ['when', 'than', 'which'], 'Cleft sentence: not until + time + that.'],
  ['The company needs someone _____ can translate contracts.', 'who', ['which', 'whose', 'whom'], 'Who is used for a person as subject.'],
  ['Having completed the course, Maria _____ a certificate.', 'received', ['receiving', 'to receive', 'has receiving'], 'The main clause needs a finite verb.'],
  ['The test was easier than I _____.', 'expected', ['expecting', 'have expecting', 'was expected'], 'Than I expected is the correct clause.'],
  ['The teacher explained the rule _____ the students could apply it.', 'so that', ['because of', 'although', 'unless'], 'So that expresses purpose.'],
  ['The documents _____ on the table are confidential.', 'placed', ['placing', 'were placing', 'place'], 'Past participle placed modifies documents.'],
  ['Rarely _____ such a clear explanation.', 'have I heard', ['I have heard', 'heard I have', 'I heard'], 'Negative adverb rarely triggers inversion.'],
  ['The course includes both grammar _____ pronunciation practice.', 'and', ['or', 'nor', 'but'], 'Both pairs with and.'],
  ['The city is known _____ its museums.', 'for', ['as', 'to', 'with'], 'Known for means famous because of.'],
  ['He suggested _____ a different strategy.', 'trying', ['to try', 'try', 'tried'], 'Suggest is followed by a gerund.'],
  ['The results are similar _____ those of previous studies.', 'to', ['with', 'than', 'as'], 'Similar is followed by to.'],
  ['Before _____ the form, check your information carefully.', 'submitting', ['submit', 'submitted', 'to submit'], 'Before can be followed by a gerund.'],
] as const;

const structureErrorItems = [
  {
    sentence: 'The professor explained the assignment careful before the students left.',
    options: ['The professor', 'the assignment', 'careful', 'left'],
    answer: 2,
    correction: 'carefully',
    explanation: 'Use the adverb carefully to describe the verb explained.',
  },
  {
    sentence: 'Neither the library nor the classrooms was open after the storm.',
    options: ['Neither', 'nor', 'was', 'after'],
    answer: 2,
    correction: 'were',
    explanation: 'With neither...nor, the verb agrees with the nearer plural subject classrooms.',
  },
  {
    sentence: 'The article which we read yesterday it was about climate policy.',
    options: ['which', 'read', 'it was', 'about'],
    answer: 2,
    correction: 'was',
    explanation: 'Do not repeat the subject. The relative clause already modifies article.',
  },
  {
    sentence: 'Because the experiment was expensive, the team decided repeating it later.',
    options: ['Because', 'expensive', 'decided', 'repeating'],
    answer: 3,
    correction: 'to repeat',
    explanation: 'Decide is followed by a to-infinitive: decided to repeat.',
  },
  {
    sentence: 'The students are responsible for submit their final reports on Friday.',
    options: ['responsible', 'for', 'submit', 'on Friday'],
    answer: 2,
    correction: 'submitting',
    explanation: 'After a preposition, use a gerund: for submitting.',
  },
  {
    sentence: 'The book was so interesting that I finished them in one evening.',
    options: ['so', 'that', 'them', 'one evening'],
    answer: 2,
    correction: 'it',
    explanation: 'The pronoun refers to the singular noun book, so use it.',
  },
  {
    sentence: 'The committee have approved the new schedule for next semester.',
    options: ['committee', 'have', 'approved', 'for'],
    answer: 1,
    correction: 'has',
    explanation: 'Committee is treated as singular in this sentence: has approved.',
  },
  {
    sentence: 'Only after the lecture ended the students asked questions.',
    options: ['Only after', 'ended', 'the students asked', 'questions'],
    answer: 2,
    correction: 'did the students ask',
    explanation: 'Introductory only after requires inversion: did the students ask.',
  },
  {
    sentence: 'The results of the survey was published in a medical journal.',
    options: ['results', 'survey', 'was published', 'journal'],
    answer: 2,
    correction: 'were published',
    explanation: 'The subject results is plural, so the verb must be were published.',
  },
  {
    sentence: 'Students who takes notes regularly usually remember more information.',
    options: ['who', 'takes', 'regularly', 'more'],
    answer: 1,
    correction: 'take',
    explanation: 'Who refers to plural students, so use take.',
  },
  {
    sentence: 'The manager asked that every report is checked before submission.',
    options: ['asked', 'every', 'is checked', 'before'],
    answer: 2,
    correction: 'be checked',
    explanation: 'After asked that, formal English uses the subjunctive: be checked.',
  },
  {
    sentence: 'There were fewer people at the seminar than we expected them.',
    options: ['There were', 'fewer', 'than', 'expected them'],
    answer: 3,
    correction: 'expected',
    explanation: 'Than we expected is complete; do not add them.',
  },
  {
    sentence: 'Having finished the exam, the results were posted online.',
    options: ['Having finished', 'the exam', 'the results', 'online'],
    answer: 2,
    correction: 'the teacher posted the results',
    explanation: 'The opening modifier must describe the subject. Results cannot finish an exam.',
  },
  {
    sentence: 'The city is famous as its museums and historic bridges.',
    options: ['city', 'famous', 'as', 'historic'],
    answer: 2,
    correction: 'for',
    explanation: 'Famous for means well known because of something.',
  },
  {
    sentence: 'The speaker talked about both the problem or the possible solution.',
    options: ['talked', 'both', 'or', 'possible'],
    answer: 2,
    correction: 'and',
    explanation: 'Both pairs with and: both the problem and the solution.',
  },
  {
    sentence: 'The more carefully you read, more accurate your answers become.',
    options: ['more carefully', 'read', 'more accurate', 'become'],
    answer: 2,
    correction: 'the more accurate',
    explanation: 'Parallel comparative structure: the more..., the more....',
  },
  {
    sentence: 'The instructor suggested to review the notes before the quiz.',
    options: ['instructor', 'suggested', 'to review', 'before'],
    answer: 2,
    correction: 'reviewing',
    explanation: 'Suggest is followed by a gerund: suggested reviewing.',
  },
  {
    sentence: 'Each of the applicants were required to bring identification.',
    options: ['Each', 'applicants', 'were required', 'identification'],
    answer: 2,
    correction: 'was required',
    explanation: 'Each is singular, so use was required.',
  },
  {
    sentence: 'The course is designed for helping students improve academic writing.',
    options: ['course', 'designed', 'for helping', 'improve'],
    answer: 2,
    correction: 'to help',
    explanation: 'Designed is commonly followed by to + verb for purpose.',
  },
  {
    sentence: 'The woman whose car broke down she called the campus police.',
    options: ['whose', 'broke down', 'she called', 'police'],
    answer: 2,
    correction: 'called',
    explanation: 'The main subject is the woman; do not repeat she.',
  },
  {
    sentence: 'A number of articles has been added to the online database.',
    options: ['A number of', 'articles', 'has been', 'database'],
    answer: 2,
    correction: 'have been',
    explanation: 'A number of takes a plural verb: have been.',
  },
  {
    sentence: 'The report contains information that are useful for new employees.',
    options: ['contains', 'information', 'are useful', 'employees'],
    answer: 2,
    correction: 'is useful',
    explanation: 'Information is uncountable and singular: information is useful.',
  },
  {
    sentence: 'Despite of the heavy rain, the field trip continued as planned.',
    options: ['Despite of', 'heavy', 'continued', 'planned'],
    answer: 0,
    correction: 'Despite',
    explanation: 'Use despite without of, or use in spite of.',
  },
  {
    sentence: 'The lecture was enough clear for most students to understand.',
    options: ['lecture', 'enough clear', 'most', 'understand'],
    answer: 1,
    correction: 'clear enough',
    explanation: 'Enough comes after adjectives: clear enough.',
  },
  {
    sentence: 'The research team will begin collect data next month.',
    options: ['research team', 'will begin', 'collect', 'next month'],
    answer: 2,
    correction: 'collecting / to collect',
    explanation: 'Begin can be followed by a gerund or to-infinitive.',
  },
] as const;

const structureCompletionQuestions: Question[] = structureItems.slice(0, 15).map((item, index) => {
  const [prompt, correct, distractors, explanation] = item;
  const { options, answer } = optionSet(correct, [...distractors], index + 1);
  return {
    id: `s${index + 1}`,
    section: 'Structure',
    prompt: `Choose the best answer: ${prompt}`,
    options,
    answer,
    explanation,
    skill: 'Sentence Completion',
    instruction: 'Choose the word or phrase that best completes the sentence.',
  };
});

const structureErrorQuestions: Question[] = structureErrorItems.map((item, index) => ({
  id: `s${structureCompletionQuestions.length + index + 1}`,
  section: 'Structure',
  prompt: item.sentence,
  options: [...item.options],
  answer: item.answer,
  explanation: item.explanation,
  correction: item.correction,
  skill: 'Written Expression',
  instruction: 'Identify the one underlined word or phrase that must be changed for the sentence to be correct.',
}));

const structureQuestions: Question[] = [...structureCompletionQuestions, ...structureErrorQuestions];

const readingPassages = [
  {
    title: 'Campus Gardens',
    passage: '(1) Many universities now maintain campus gardens, not simply as decorative spaces but as outdoor laboratories. Biology students can observe plant growth directly, while environmental science classes test soil quality and water use. (2) Some gardens also supply fresh vegetables to campus dining halls, giving students a visible connection between academic study and daily life. (3) Although these projects require careful planning, supporters argue that the educational benefits are worth the effort.',
    main: 'Campus gardens can connect academic learning with practical campus life.',
    detail: 'They can be used as outdoor laboratories.',
    notMentioned: 'They replace all classroom instruction.',
    vocab: ['maintain', 'keep', 'ignore', 'destroy', 'borrow'],
    reference: ['these projects', 'campus gardens'],
    inference: 'Campus gardens require organization as well as student interest.',
    purpose: 'To explain educational and practical uses of campus gardens',
    organization: 'By describing uses and then noting a limitation',
    tone: 'Informative and supportive',
    bestTitle: 'Campus Gardens as Learning Spaces',
  },
  {
    title: 'Remote Work',
    passage: '(1) Remote work has changed the way many companies operate. Employees may avoid long commutes and gain more control over their schedules. (2) However, informal office conversations occur less often, so managers must communicate goals clearly. (3) Successful remote teams usually set written expectations, schedule regular check-ins, and keep shared documents updated. Without these systems, flexibility can quickly become confusion.',
    main: 'Remote work is useful when teams use clear communication systems.',
    detail: 'Successful teams keep shared documents updated.',
    notMentioned: 'Remote workers always earn higher salaries.',
    vocab: ['flexibility', 'adaptability', 'expense', 'distance', 'silence'],
    reference: ['these systems', 'written expectations, check-ins, and shared documents'],
    inference: 'Remote work can create problems if communication is weak.',
    purpose: 'To describe both advantages and requirements of remote work',
    organization: 'By presenting benefits, then explaining necessary conditions',
    tone: 'Balanced and practical',
    bestTitle: 'Making Remote Work Effective',
  },
  {
    title: 'Language Learning',
    passage: '(1) Adults can learn new languages successfully, although their progress may differ from that of children. Adult learners often understand grammar explanations quickly and can use study strategies intentionally. (2) Children, on the other hand, may imitate pronunciation with less effort because they are less self-conscious when experimenting with new sounds. (3) For this reason, researchers often recommend combining explicit study with frequent listening and speaking practice.',
    main: 'Adults and children have different strengths in language learning.',
    detail: 'Adults can use study strategies intentionally.',
    notMentioned: 'Children always learn grammar rules faster than adults.',
    vocab: ['intentionally', 'deliberately', 'accidentally', 'rarely', 'quietly'],
    reference: ['this reason', 'the different strengths of adult and child learners'],
    inference: 'A mixed learning approach may help adult learners improve more effectively.',
    purpose: 'To compare language-learning strengths and suggest an approach',
    organization: 'By contrasting two groups and then giving a recommendation',
    tone: 'Explanatory',
    bestTitle: 'Different Strengths in Language Learning',
  },
  {
    title: 'Public Libraries',
    passage: '(1) Public libraries have expanded far beyond lending books. Many now offer digital media, language classes, career workshops, and quiet study spaces. (2) In communities where internet access is limited, libraries can be essential places for completing applications and school assignments. (3) Their role continues to evolve as public needs change, and many librarians now serve as guides to information rather than simply keepers of books.',
    main: 'Public libraries now provide many modern community services.',
    detail: 'Libraries can help people complete applications online.',
    notMentioned: 'Libraries charge high fees for every service.',
    vocab: ['essential', 'necessary', 'optional', 'unusual', 'temporary'],
    reference: ['Their', 'public libraries'],
    inference: 'Modern librarians may need technology and teaching skills.',
    purpose: 'To show how public libraries have adapted to new community needs',
    organization: 'By listing services and explaining their importance',
    tone: 'Informative and positive',
    bestTitle: 'The Changing Role of Public Libraries',
  },
  {
    title: 'Urban Trees',
    passage: '(1) Urban trees provide benefits that are easy to overlook. They cool streets by creating shade, reduce air pollution, and absorb rainwater that might otherwise flood roads. (2) Neighborhoods with more trees are often more pleasant for walking, which can encourage residents to spend more time outdoors. (3) Because of these advantages, some cities have begun planting trees as part of climate adaptation plans.',
    main: 'Urban trees improve city environments in several important ways.',
    detail: 'They absorb rainwater that might otherwise flood roads.',
    notMentioned: 'They eliminate the need for all public transportation.',
    vocab: ['overlook', 'fail to notice', 'study carefully', 'decorate', 'remove'],
    reference: ['these advantages', 'the benefits of urban trees'],
    inference: 'Tree planting can be part of a city strategy for handling climate effects.',
    purpose: 'To explain why cities may invest in planting trees',
    organization: 'By naming benefits and then connecting them to city planning',
    tone: 'Informative and approving',
    bestTitle: 'Why Urban Trees Matter',
  },
];

const readingQuestions: Question[] = readingPassages.flatMap((item, passageIndex) => {
  const base = passageIndex * 10;
  const questionsForPassage = [
    {
      prompt: `What is the main idea of the passage "${item.title}"?`,
      correct: item.main,
      distractors: ['The passage mainly tells a personal story.', 'The passage argues that the topic is no longer useful.', 'The passage focuses only on a historical event.'],
      explanation: 'The correct answer summarizes the whole passage, not only one detail.',
      skill: 'Main Idea',
    },
    {
      prompt: 'According to the passage, which statement is true?',
      correct: item.detail,
      distractors: ['The passage says the topic has no practical value.', 'The passage says the topic is useful only for experts.', 'The passage says every problem has already been solved.'],
      explanation: 'This detail is explicitly stated in the passage.',
      skill: 'Detail',
    },
    {
      prompt: 'Which of the following is NOT mentioned in the passage?',
      correct: item.notMentioned,
      distractors: [item.detail, item.main, item.purpose],
      explanation: 'The correct answer is the only option that is not stated or suggested by the passage.',
      skill: 'Negative Detail',
    },
    {
      prompt: `The word "${item.vocab[0]}" in the passage is closest in meaning to:`,
      correct: item.vocab[1],
      distractors: [item.vocab[2], item.vocab[3], item.vocab[4]],
      explanation: `In context, "${item.vocab[0]}" means "${item.vocab[1]}".`,
      skill: 'Vocabulary in Context',
    },
    {
      prompt: `The phrase "${item.reference[0]}" refers to:`,
      correct: item.reference[1],
      distractors: ['the author of the passage', 'an unrelated historical event', 'a problem not mentioned in the passage'],
      explanation: `The phrase points back to "${item.reference[1]}".`,
      skill: 'Reference',
    },
    {
      prompt: 'What can be inferred from the passage?',
      correct: item.inference,
      distractors: ['The author believes the topic has no real benefit.', 'The author thinks the topic should be completely avoided.', 'The passage suggests the topic is unrelated to daily life.'],
      explanation: 'An inference is not always stated directly, but it follows logically from the passage.',
      skill: 'Inference',
    },
    {
      prompt: 'What is the author’s main purpose?',
      correct: item.purpose,
      distractors: ['To entertain readers with a fictional conflict', 'To prove that older methods are always better', 'To describe the private life of one individual'],
      explanation: 'The purpose describes what the author is trying to do in the passage.',
      skill: 'Author Purpose',
    },
    {
      prompt: 'The passage is mainly organized by:',
      correct: item.organization,
      distractors: ['Telling events in strict chronological order', 'Presenting a fictional problem and surprise ending', 'Listing unrelated definitions without examples'],
      explanation: 'Organization questions ask how the ideas are arranged.',
      skill: 'Organization',
    },
    {
      prompt: 'Which word best describes the author’s tone?',
      correct: item.tone,
      distractors: ['Angry and sarcastic', 'Uncertain and confused', 'Humorous and fictional'],
      explanation: 'Tone refers to the author’s attitude toward the topic.',
      skill: 'Tone',
    },
    {
      prompt: 'Which title best fits the passage?',
      correct: item.bestTitle,
      distractors: [`The End of ${item.title}`, `A Problem with No Solution`, `A Personal Story about ${item.title}`],
      explanation: 'The passage explains positive value and practical benefits.',
      skill: 'Best Title',
    },
  ];

  return questionsForPassage.map((question, index) => {
    const { options, answer } = optionSet(question.correct, question.distractors, base + index);
    return {
      id: `r${base + index + 1}`,
      section: 'Reading',
      passage: `${item.title}: ${item.passage}`,
      prompt: question.prompt,
      options,
      answer,
      explanation: question.explanation,
      skill: question.skill,
      instruction: 'Read the passage and choose the best answer.',
    };
  });
});

const questions: Question[] = toeflPractice2Questions;
const answerKeyReady = questions.every((question) => question.answer !== ANSWER_PENDING);
const questionNavigatorGroups = sectionConfig.map((section) => ({
  ...section,
  questionEntries: questions
    .map((question, index) => ({ question, index }))
    .filter(({ question }) => question.section === section.title),
}));

type StoredExamProgress = {
  version: 2;
  currentIndex: number;
  timeLeft: number;
  answers: Record<string, number>;
  flaggedQuestionIds: string[];
  savedAt: string;
};

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(rest).padStart(2, '0')}`;
};

const getSectionQuestions = (section: SectionId) => questions.filter((question) => question.section === section);
const questionById = new Map(questions.map((question) => [question.id, question]));

const getFlaggedQuestionIds = (flaggedQuestions: Record<string, boolean>) =>
  Object.entries(flaggedQuestions)
    .filter(([, isFlagged]) => isFlagged)
    .map(([questionId]) => questionId);

const createFlaggedQuestionMap = (questionIds: string[]) =>
  questionIds.reduce<Record<string, boolean>>((acc, questionId) => {
    if (questionById.has(questionId)) acc[questionId] = true;
    return acc;
  }, {});

const clearStoredProgress = () => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(PROGRESS_STORAGE_KEY);
  } catch {
    // Ignore storage failures in private browsing or restricted environments.
  }
};

const readStoredProgress = (): StoredExamProgress | null => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StoredExamProgress>;
    if (parsed.version !== 2) return null;
    const timeLeft = Math.min(Math.max(Number(parsed.timeLeft) || 0, 0), EXAM_SECONDS);
    if (timeLeft <= 0) return null;
    const currentIndex = Math.min(Math.max(Number(parsed.currentIndex) || 0, 0), questions.length - 1);
    const answers = Object.entries(parsed.answers ?? {}).reduce<Record<string, number>>((acc, [questionId, answer]) => {
      const question = questionById.get(questionId);
      if (question && Number.isInteger(answer) && answer >= 0 && answer < question.options.length) {
        acc[questionId] = answer;
      }
      return acc;
    }, {});
    const flaggedQuestionIds = Array.isArray(parsed.flaggedQuestionIds)
      ? parsed.flaggedQuestionIds.filter((questionId) => questionById.has(questionId))
      : [];

    return {
      version: 2,
      currentIndex,
      timeLeft,
      answers,
      flaggedQuestionIds,
      savedAt: typeof parsed.savedAt === 'string' ? parsed.savedAt : new Date().toISOString(),
    };
  } catch {
    clearStoredProgress();
    return null;
  }
};

const getListeningAudioText = (question: Question) => {
  if (question.section !== 'Listening' || !question.passage) return '';
  return question.passage.replace(/^Audio transcript\s+\d+:\s*/i, '').trim();
};

const speakWithBrowserFallback = (text: string) => {
  if (!text) return;
  if (hasApiKey()) {
    playAudio(text, 0.9);
    return;
  }
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = 0.9;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
};

export default function EnglishToefl1Page() {
  const navigate = useNavigate();
  const { user, authHeaders } = useAuth();
  const [started, setStarted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedAt, setSubmittedAt] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(EXAM_SECONDS);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [downloading, setDownloading] = useState(false);
  const [emailStatus, setEmailStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [emailError, setEmailError] = useState('');
  const [savedProgress, setSavedProgress] = useState<StoredExamProgress | null>(() => readStoredProgress());
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showNavWarning, setShowNavWarning] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showQuestionNavigator, setShowQuestionNavigator] = useState(true);
  const [showListeningTranscript, setShowListeningTranscript] = useState(false);
  const completionEmailSentRef = useRef(false);

  const examActive = started && !submitted;

  // Block browser close / refresh
  useEffect(() => {
    if (!examActive) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [examActive]);

  // Intercept browser back button while exam is active
  useEffect(() => {
    if (!examActive) return;
    // Push a blocker entry so the back button has somewhere to land
    window.history.pushState(null, '');
    const handlePop = () => {
      // Re-push to stay on page, then show our warning modal
      window.history.pushState(null, '');
      setShowNavWarning(true);
    };
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, [examActive]);

  const currentQuestion = questions[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const currentListeningAudio = getListeningAudioText(currentQuestion);
  const currentListeningAudioSrc = currentQuestion.section === 'Listening' ? currentQuestion.audioSrc ?? '' : '';
  const currentSectionQuestions = getSectionQuestions(currentQuestion.section);
  const currentSectionPosition = Math.max(
    currentSectionQuestions.findIndex((question) => question.id === currentQuestion.id) + 1,
    1,
  );
  const currentAnswer = answers[currentQuestion.id];
  const isCurrentQuestionFlagged = Boolean(flaggedQuestions[currentQuestion.id]);
  const unansweredQuestions = useMemo(
    () => questions
      .map((question, index) => ({ question, index }))
      .filter(({ question }) => answers[question.id] === undefined),
    [answers],
  );
  const unansweredCount = unansweredQuestions.length;
  const flaggedQuestionCount = getFlaggedQuestionIds(flaggedQuestions).length;

  useEffect(() => {
    setShowListeningTranscript(false);
    stopCurrentAudio();
    if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel();
  }, [currentIndex]);

  useEffect(() => {
    if (!started || submitted) return;
    const progress: StoredExamProgress = {
      version: 2,
      currentIndex,
      timeLeft,
      answers,
      flaggedQuestionIds: getFlaggedQuestionIds(flaggedQuestions),
      savedAt: new Date().toISOString(),
    };
    try {
      window.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Autosave is helpful, but the exam should continue if browser storage is unavailable.
    }
  }, [answers, currentIndex, flaggedQuestions, started, submitted, timeLeft]);

  const sectionResults = useMemo(() => {
    return sectionConfig.map((section) => {
      const sectionQuestions = getSectionQuestions(section.title);
      const answered = sectionQuestions.filter((question) => answers[question.id] !== undefined).length;
      const raw = answerKeyReady
        ? sectionQuestions.filter((question) => answers[question.id] === question.answer).length
        : 0;
      const scaled = answerKeyReady
        ? getConvertedSectionScore(section.title, raw)
        : 0;
      return { ...section, answered, raw, scaled };
    });
  }, [answers]);

  const totalScore = useMemo(() => {
    if (!answerKeyReady) return 0;
    const totalScaled = sectionResults.reduce((sum, section) => sum + section.scaled, 0);
    return Math.round((totalScaled * 10) / 3);
  }, [sectionResults]);

  useEffect(() => {
    if (!started || submitted) return;

    const timer = window.setInterval(() => {
      setTimeLeft((value) => {
        if (value <= 1) {
          window.clearInterval(timer);
          setSubmitted(true);
          return 0;
        }
        return value - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [started, submitted]);

  useEffect(() => {
    if (!submitted) return;
    if (completionEmailSentRef.current) return;
    completionEmailSentRef.current = true;

    const now = new Date().toISOString();
    const studentName = user?.displayName ?? user?.name ?? 'Valued Learner';
    const sections = sectionResults.map(({ title, raw, scaled, total }) => ({ title, raw, scaled, total }));
    setSubmittedAt(now);
    clearStoredProgress();
    setSavedProgress(null);
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        score: totalScore,
        sections,
        total: questions.length,
        answerKeyReady,
        submittedAt: now,
      }),
    );

    if (!answerKeyReady) return;
    if (!user?.email) return;
    setEmailStatus('sending');
    setEmailError('');
    try {
      const certificate = generateToeflCertificateBase64({
        studentName,
        totalScore,
        sections,
        submittedAt: now,
      });

      void fetch('/api/exams/toefl/completion-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
        body: JSON.stringify({
          testName: 'TOEFL Practice Test 2',
          totalScore,
          sections,
          submittedAt: now,
          certificate,
        }),
      })
        .then(async (res) => {
          const data = await res.json().catch(() => ({}));
          if (!res.ok) throw new Error(data.error || 'Gagal mengirim sertifikat ke email');
          setEmailStatus('sent');
        })
        .catch((err) => {
          setEmailStatus('error');
          setEmailError(err instanceof Error ? err.message : 'Gagal mengirim sertifikat ke email');
        });
    } catch (err) {
      setEmailStatus('error');
      setEmailError(err instanceof Error ? err.message : 'Gagal membuat file sertifikat');
    }
  }, [authHeaders, sectionResults, submitted, totalScore, user?.displayName, user?.email, user?.name]);

  const handleDownloadCertificate = async () => {
    setDownloading(true);
    try {
      generateToeflCertificate({
        studentName: user?.displayName ?? user?.name ?? 'Valued Learner',
        totalScore,
        sections: sectionResults.map(({ title, raw, scaled, total }) => ({ title, raw, scaled, total })),
        submittedAt: submittedAt || new Date().toISOString(),
      });
    } finally {
      setDownloading(false);
    }
  };

  const startExam = (section?: SectionId) => {
    const index = section ? questions.findIndex((question) => question.section === section) : 0;
    clearStoredProgress();
    completionEmailSentRef.current = false;
    setStarted(true);
    setSubmitted(false);
    setSubmittedAt('');
    setCurrentIndex(index >= 0 ? index : 0);
    setTimeLeft(EXAM_SECONDS);
    setAnswers({});
    setFlaggedQuestions({});
    setEmailStatus('idle');
    setEmailError('');
    setSavedProgress(null);
    setShowSubmitModal(false);
    setShowQuestionNavigator(true);
  };

  const resumeExam = (progress: StoredExamProgress) => {
    completionEmailSentRef.current = false;
    setStarted(true);
    setSubmitted(false);
    setSubmittedAt('');
    setCurrentIndex(progress.currentIndex);
    setTimeLeft(progress.timeLeft);
    setAnswers(progress.answers);
    setFlaggedQuestions(createFlaggedQuestionMap(progress.flaggedQuestionIds));
    setEmailStatus('idle');
    setEmailError('');
    setShowSubmitModal(false);
    setShowQuestionNavigator(true);
  };

  const discardSavedProgress = () => {
    clearStoredProgress();
    setSavedProgress(null);
  };

  const resetExam = () => {
    clearStoredProgress();
    completionEmailSentRef.current = false;
    setStarted(false);
    setSubmitted(false);
    setSubmittedAt('');
    setCurrentIndex(0);
    setTimeLeft(EXAM_SECONDS);
    setAnswers({});
    setFlaggedQuestions({});
    setEmailStatus('idle');
    setEmailError('');
    setSavedProgress(null);
    setShowSubmitModal(false);
    setShowListeningTranscript(false);
  };

  const handleCancelConfirm = () => {
    setShowCancelModal(false);
    resetExam();
    navigate('/modul');
  };

  const jumpToSection = (section: SectionId) => {
    const index = questions.findIndex((question) => question.section === section);
    if (index >= 0) setCurrentIndex(index);
  };

  const jumpToQuestion = (index: number) => {
    setCurrentIndex(Math.min(Math.max(index, 0), questions.length - 1));
  };

  const toggleCurrentQuestionFlag = () => {
    setFlaggedQuestions((current) => ({
      ...current,
      [currentQuestion.id]: !current[currentQuestion.id],
    }));
  };

  const clearCurrentAnswer = () => {
    setAnswers((current) => {
      const next = { ...current };
      delete next[currentQuestion.id];
      return next;
    });
  };

  const handleSubmitAttempt = () => {
    setShowSubmitModal(true);
  };

  const confirmSubmit = () => {
    setShowSubmitModal(false);
    setSubmitted(true);
  };

  const reviewFirstUnanswered = () => {
    const firstUnanswered = unansweredQuestions[0];
    if (!firstUnanswered) return;
    setShowSubmitModal(false);
    jumpToQuestion(firstUnanswered.index);
  };

  const reviewFirstFlagged = () => {
    const firstFlaggedIndex = questions.findIndex((question) => flaggedQuestions[question.id]);
    if (firstFlaggedIndex < 0) return;
    setShowSubmitModal(false);
    jumpToQuestion(firstFlaggedIndex);
  };

  return (
    <>
      {/* ── Cancel confirmation modal (cancel button) ─────────────────── */}
      <AnimatePresence>
        {showCancelModal && (
          <motion.div
            key="cancel-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 16 }}
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 mx-auto">
                <AlertTriangle size={28} className="text-red-500" />
              </div>
              <h2 className="text-center text-xl font-black text-[#101828]">Batalkan Ujian?</h2>
              <p className="mt-2 text-center text-sm font-semibold leading-relaxed text-slate-500">
                Progres ujian kamu akan hilang dan tidak dapat dikembalikan. Yakin ingin keluar?
              </p>
              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowCancelModal(false)}
                  className="flex-1 rounded-2xl bg-slate-100 py-3 text-sm font-black text-slate-600 hover:bg-slate-200"
                >
                  Lanjutkan Ujian
                </button>
                <button
                  type="button"
                  onClick={handleCancelConfirm}
                  className="flex-1 rounded-2xl bg-red-500 py-3 text-sm font-black text-white hover:bg-red-600"
                >
                  Ya, Batalkan
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Back-button / nav warning modal ──────────────────────────── */}
      <AnimatePresence>
        {showNavWarning && (
          <motion.div
            key="nav-warning"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 16 }}
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 mx-auto">
                <AlertTriangle size={28} className="text-amber-500" />
              </div>
              <h2 className="text-center text-xl font-black text-[#101828]">Tinggalkan Halaman?</h2>
              <p className="mt-2 text-center text-sm font-semibold leading-relaxed text-slate-500">
                Ujian sedang berlangsung. Jika kamu meninggalkan halaman ini, semua progres akan hilang.
              </p>
              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowNavWarning(false)}
                  className="flex-1 rounded-2xl bg-slate-100 py-3 text-sm font-black text-slate-600 hover:bg-slate-200"
                >
                  Tetap di Sini
                </button>
                <button
                  type="button"
                  onClick={() => { setShowNavWarning(false); resetExam(); navigate('/modul'); }}
                  className="flex-1 rounded-2xl bg-amber-500 py-3 text-sm font-black text-white hover:bg-amber-600"
                >
                  Tinggalkan
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Submit confirmation modal ───────────────────────────────── */}
      <AnimatePresence>
        {showSubmitModal && (
          <motion.div
            key="submit-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 16 }}
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 mx-auto">
                <CheckCircle2 size={28} className="text-emerald-600" />
              </div>
              <h2 className="text-center text-xl font-black text-[#101828]">Submit Ujian?</h2>
              <p className="mt-2 text-center text-sm font-semibold leading-relaxed text-slate-500">
                {unansweredCount > 0
                  ? `${unansweredCount} soal belum dijawab.`
                  : 'Semua soal sudah dijawab.'}
                {flaggedQuestionCount > 0 ? ` ${flaggedQuestionCount} soal masih ditandai untuk review.` : ''}
              </p>
              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                {unansweredCount > 0 && (
                  <button
                    type="button"
                    onClick={reviewFirstUnanswered}
                    className="flex items-center justify-center gap-2 rounded-2xl bg-amber-50 py-3 text-sm font-black text-amber-700 hover:bg-amber-100"
                  >
                    <AlertTriangle size={17} />
                    Review Kosong
                  </button>
                )}
                {flaggedQuestionCount > 0 && (
                  <button
                    type="button"
                    onClick={reviewFirstFlagged}
                    className="flex items-center justify-center gap-2 rounded-2xl bg-sky-50 py-3 text-sm font-black text-[#1E6F9F] hover:bg-sky-100"
                  >
                    <Flag size={17} />
                    Review Tanda
                  </button>
                )}
              </div>
              <div className="mt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="flex-1 rounded-2xl bg-slate-100 py-3 text-sm font-black text-slate-600 hover:bg-slate-200"
                >
                  Kembali
                </button>
                <button
                  type="button"
                  onClick={confirmSubmit}
                  className="flex-1 rounded-2xl bg-emerald-600 py-3 text-sm font-black text-white hover:bg-emerald-700"
                >
                  Submit
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main page ─────────────────────────────────────────────────── */}
      <PageContainer>
        {/* When exam is active: fullscreen overlay that hides sidebar + bottom nav */}
        <div className={examActive ? 'fixed inset-0 z-[9000] overflow-y-auto bg-white' : 'min-h-screen pb-8'}>
          <div className={examActive ? 'mx-auto w-full max-w-5xl px-5 pb-8 md:px-8 xl:max-w-6xl' : 'mx-auto w-full max-w-5xl px-4 pb-8 md:px-8'}>
        <div className="sticky top-0 z-20 -mx-4 mb-4 border-b border-slate-100 bg-white/90 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-b-3xl">
          <div className="flex items-center justify-between gap-3">
            {examActive ? (
              <button
                type="button"
                onClick={() => setShowCancelModal(true)}
                className="flex items-center gap-2 rounded-2xl bg-red-50 px-3 py-2 text-sm font-black text-red-500 hover:bg-red-100"
              >
                <XCircle size={18} />
                Cancel
              </button>
            ) : (
              <button
                type="button"
                onClick={() => navigate('/modul')}
                className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-600 hover:bg-slate-200"
              >
                <ArrowLeft size={20} />
              </button>
            )}
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#4FA3D1]">English TOEFL PBT</p>
              <h1 className="truncate text-lg font-black leading-tight text-[#101828]">TOEFL Practice Test 2</h1>
            </div>
            <div className="flex items-center gap-1.5 rounded-2xl bg-slate-100 px-3 py-2 text-sm font-black text-slate-700">
              <Clock3 size={16} />
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>

        {!started && !submitted && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="rounded-3xl bg-gradient-to-br from-[#4FA3D1] to-[#1E6F9F] p-6 text-white">
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white/70">Simulasi TOEFL PBT</p>
              <h2 className="mt-2 text-3xl font-black leading-tight">Ujian lengkap dengan konversi skor TOEFL.</h2>
              <p className="mt-3 text-sm font-semibold leading-relaxed text-white/75">
                Kerjakan 140 soal: Listening 50, Structure 40, dan Reading 50. Skor akhir memakai tabel konversi per section dan rumus PBT.
              </p>
            </div>

            {savedProgress && (
              <div className="rounded-3xl border border-sky-100 bg-sky-50 p-4 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-black text-[#101828]">Progress ujian tersimpan</p>
                    <p className="mt-1 text-xs font-semibold leading-relaxed text-slate-500">
                      {Object.keys(savedProgress.answers).length} / {questions.length} soal terjawab · sisa waktu {formatTime(savedProgress.timeLeft)}
                    </p>
                    <p className="mt-0.5 text-[11px] font-bold text-slate-400">
                      Disimpan {new Date(savedProgress.savedAt).toLocaleString('id-ID')}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      onClick={discardSavedProgress}
                      className="rounded-2xl bg-white px-4 py-3 text-xs font-black text-slate-500 ring-1 ring-sky-100 hover:bg-slate-50"
                    >
                      Hapus
                    </button>
                    <button
                      type="button"
                      onClick={() => resumeExam(savedProgress)}
                      className="rounded-2xl bg-[#4FA3D1] px-4 py-3 text-xs font-black text-white shadow-sm hover:bg-[#2F86B5]"
                    >
                      Lanjutkan
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="grid gap-3 sm:grid-cols-3">
              {sectionConfig.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.title}
                    type="button"
                    onClick={() => startExam(section.title)}
                    className="rounded-3xl border border-slate-100 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-[#4FA3D1]">
                      <Icon size={21} />
                    </div>
                    <p className="font-black text-[#101828]">{section.title}</p>
                    <p className="mt-1 text-xs font-semibold text-slate-400">{section.total} questions · {section.time}</p>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => startExam()}
              className="h-14 w-full rounded-2xl bg-[#4FA3D1] text-base font-black text-white shadow-lg shadow-blue-100 hover:bg-[#2F86B5]"
            >
              Mulai dari Listening
            </button>
          </motion.div>
        )}

        {started && !submitted && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-center justify-between text-xs font-black text-slate-400">
                <span>{currentQuestion.section}</span>
                <span>{currentIndex + 1} / {questions.length}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-[#4FA3D1]" style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }} />
              </div>
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                {sectionConfig.map((section) => (
                  <button
                    key={section.title}
                    type="button"
                    onClick={() => jumpToSection(section.title)}
                    className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-black ${
                      currentQuestion.section === section.title ? 'bg-[#4FA3D1] text-white' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </div>
              <div className="mt-4 border-t border-slate-100 pt-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-black text-[#101828]">Question Navigator</p>
                    <p className="mt-0.5 text-xs font-bold text-slate-400">
                      {answeredCount} terjawab · {unansweredCount} kosong · {flaggedQuestionCount} review
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowQuestionNavigator((value) => !value)}
                    className="inline-flex w-fit items-center gap-2 rounded-2xl bg-slate-100 px-3 py-2 text-xs font-black text-slate-600 hover:bg-slate-200"
                  >
                    <ListChecks size={16} />
                    {showQuestionNavigator ? 'Sembunyikan' : 'Tampilkan'}
                  </button>
                </div>

                {showQuestionNavigator && (
                  <div className="mt-4 max-h-[320px] space-y-4 overflow-y-auto pr-1">
                    {questionNavigatorGroups.map((section) => (
                      <div key={section.title}>
                        <div className="mb-2 flex items-center justify-between gap-2">
                          <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">{section.title}</p>
                          <p className="text-[11px] font-black text-slate-400">
                            {section.questionEntries.filter(({ question }) => answers[question.id] !== undefined).length} / {section.total}
                          </p>
                        </div>
                        <div className="grid grid-cols-8 gap-1.5 sm:grid-cols-10 md:grid-cols-12">
                          {section.questionEntries.map(({ question, index }) => {
                            const isCurrent = index === currentIndex;
                            const isAnswered = answers[question.id] !== undefined;
                            const isFlagged = Boolean(flaggedQuestions[question.id]);
                            return (
                              <button
                                key={question.id}
                                type="button"
                                title={`${section.title} ${index + 1}`}
                                onClick={() => jumpToQuestion(index)}
                                className={`relative flex h-9 items-center justify-center rounded-xl text-[11px] font-black transition ${
                                  isCurrent
                                    ? 'bg-[#4FA3D1] text-white shadow-sm'
                                    : isAnswered
                                      ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100'
                                      : 'bg-slate-100 text-slate-500 ring-1 ring-slate-100'
                                }`}
                              >
                                {index + 1}
                                {isFlagged && (
                                  <span className={`absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 ${
                                    isCurrent ? 'border-[#4FA3D1] bg-amber-300' : 'border-white bg-amber-400'
                                  }`} />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
              {currentQuestion.section === 'Listening' && (currentListeningAudioSrc || currentListeningAudio) ? (
                <div className="mb-4 rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-sky-50 p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-[#4FA3D1] shadow-sm">
                        <Headphones size={22} />
                      </div>
                      <div>
                        <p className="text-sm font-black text-[#101828]">{currentQuestion.audioLabel || 'TOEFL Listening Audio'}</p>
                        <p className="mt-0.5 text-xs font-semibold text-slate-500">
                          Putar audio asli, lalu pilih jawaban terbaik. Track mengikuti bagian Listening yang sedang dikerjakan.
                        </p>
                      </div>
                    </div>
                    {!currentListeningAudioSrc && (
                      <button
                        type="button"
                        onClick={() => speakWithBrowserFallback(currentListeningAudio)}
                        className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-2xl bg-[#4FA3D1] px-5 text-sm font-black text-white shadow-sm hover:bg-[#2F86B5]"
                      >
                        <Play size={16} className="fill-white" />
                        Play Audio
                      </button>
                    )}
                  </div>

                  {currentListeningAudioSrc ? (
                    <audio
                      key={currentQuestion.audioSrc}
                      controls
                      preload="metadata"
                      className="mt-4 w-full"
                      src={currentListeningAudioSrc}
                    >
                      Browser kamu tidak mendukung audio player.
                    </audio>
                  ) : (
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => speakWithBrowserFallback(currentListeningAudio)}
                        className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[11px] font-black text-[#4FA3D1] ring-1 ring-blue-100"
                      >
                        <Volume2 size={13} />
                        Replay
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowListeningTranscript((value) => !value)}
                        className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[11px] font-black text-slate-500 ring-1 ring-slate-100"
                      >
                        {showListeningTranscript ? <EyeOff size={13} /> : <Eye size={13} />}
                        {showListeningTranscript ? 'Hide transcript' : 'Show transcript'}
                      </button>
                    </div>
                  )}

                  {!currentListeningAudioSrc && showListeningTranscript && (
                    <div className="mt-3 max-h-[160px] overflow-y-auto rounded-2xl bg-white p-4 text-sm font-semibold leading-relaxed text-slate-600 ring-1 ring-blue-100">
                      Audio transcript {currentIndex + 1}: {currentListeningAudio}
                    </div>
                  )}
                </div>
              ) : currentQuestion.passage ? (
                <div className={`mb-4 overflow-y-auto rounded-2xl bg-slate-50 p-4 text-sm font-semibold leading-relaxed text-slate-600 ${
                  currentQuestion.section === 'Reading' ? 'max-h-[340px]' : 'max-h-[220px]'
                }`}>
                  {currentQuestion.passage}
                </div>
              ) : null}
              {currentQuestion.section === 'Structure' && (
                <div className="mb-4 rounded-3xl border border-amber-100 bg-gradient-to-br from-amber-50 to-orange-50 p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-amber-600">
                        TOEFL Structure · {currentSectionPosition} / {currentSectionQuestions.length}
                      </p>
                      <h3 className="mt-1 text-base font-black text-[#101828]">{currentQuestion.skill}</h3>
                      <p className="mt-1 text-xs font-bold leading-relaxed text-slate-500">
                        {currentQuestion.instruction}
                      </p>
                    </div>
                    <span className="w-fit rounded-full bg-white px-3 py-1.5 text-[11px] font-black text-amber-700 ring-1 ring-amber-100">
                      {currentQuestion.skill === 'Sentence Completion' ? 'Part A' : 'Part B'}
                    </span>
                  </div>
                </div>
              )}
              {currentQuestion.section === 'Reading' && (
                <div className="mb-4 rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-teal-50 p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-600">
                        TOEFL Reading · {currentSectionPosition} / {currentSectionQuestions.length}
                      </p>
                      <h3 className="mt-1 text-base font-black text-[#101828]">{currentQuestion.skill}</h3>
                      <p className="mt-1 text-xs font-bold leading-relaxed text-slate-500">
                        {currentQuestion.instruction}
                      </p>
                    </div>
                    <span className="w-fit rounded-full bg-white px-3 py-1.5 text-[11px] font-black text-emerald-700 ring-1 ring-emerald-100">
                      Passage Question
                    </span>
                  </div>
                </div>
              )}
              <div className="mb-4 flex flex-col gap-3 rounded-2xl bg-slate-50 p-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-black text-slate-500">
                    Soal {currentIndex + 1} · {currentQuestion.section}
                  </p>
                  <p className="mt-0.5 text-[11px] font-bold text-slate-400">
                    {currentAnswer === undefined ? 'Belum dijawab' : `Pilihan ${String.fromCharCode(65 + currentAnswer)} dipilih`}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentAnswer !== undefined && (
                    <button
                      type="button"
                      onClick={clearCurrentAnswer}
                      className="inline-flex items-center gap-1.5 rounded-2xl bg-white px-3 py-2 text-xs font-black text-slate-500 ring-1 ring-slate-100 hover:bg-slate-100"
                    >
                      <XCircle size={15} />
                      Hapus Jawaban
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={toggleCurrentQuestionFlag}
                    className={`inline-flex items-center gap-1.5 rounded-2xl px-3 py-2 text-xs font-black ring-1 ${
                      isCurrentQuestionFlagged
                        ? 'bg-amber-50 text-amber-700 ring-amber-100 hover:bg-amber-100'
                        : 'bg-white text-slate-500 ring-slate-100 hover:bg-slate-100'
                    }`}
                  >
                    <Flag size={15} className={isCurrentQuestionFlagged ? 'fill-amber-300' : ''} />
                    {isCurrentQuestionFlagged ? 'Ditandai' : 'Tandai Review'}
                  </button>
                </div>
              </div>
              <h2 className="text-lg font-black leading-snug text-[#101828]">{currentQuestion.prompt}</h2>

              <div className="mt-5 grid gap-3">
                {currentQuestion.options.map((option, optionIndex) => {
                  const selected = answers[currentQuestion.id] === optionIndex;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setAnswers((current) => ({ ...current, [currentQuestion.id]: optionIndex }))}
                      className={`flex min-h-[56px] items-center gap-3 rounded-2xl border p-3 text-left text-sm font-bold transition ${
                        selected ? 'border-[#4FA3D1] bg-blue-50 text-[#1E6F9F]' : 'border-slate-100 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-black ${
                        selected ? 'bg-[#4FA3D1] text-white' : 'bg-slate-100 text-slate-400'
                      }`}>
                        {String.fromCharCode(65 + optionIndex)}
                      </span>
                      <span className={currentQuestion.skill === 'Written Expression' ? 'underline decoration-2 underline-offset-4' : ''}>
                        {option}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex((value) => Math.max(value - 1, 0))}
                className="flex-1 rounded-2xl bg-slate-100 px-4 py-3 text-sm font-black text-slate-600 disabled:opacity-40"
              >
                Sebelumnya
              </button>
              {currentIndex < questions.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentIndex((value) => Math.min(value + 1, questions.length - 1))}
                  className="flex-1 rounded-2xl bg-[#4FA3D1] px-4 py-3 text-sm font-black text-white"
                >
                  Berikutnya
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmitAttempt}
                  className="flex-1 rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-black text-white"
                >
                  Submit
                </button>
              )}
            </div>

            <p className="text-center text-xs font-bold text-slate-400">
              {answeredCount} dari {questions.length} soal terjawab · {unansweredCount} kosong · {flaggedQuestionCount} review
            </p>
          </motion.div>
        )}

        {submitted && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="rounded-3xl bg-gradient-to-br from-emerald-500 to-[#1E6F9F] p-6 text-center text-white">
              <Trophy className="mx-auto mb-3" size={40} />
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white/70">
                {answerKeyReady ? 'Estimated TOEFL PBT Score' : 'Answer Key Pending'}
              </p>
              <h2 className="mt-2 text-5xl font-black">{answerKeyReady ? totalScore : 'Pending'}</h2>
              <p className="mt-2 text-sm font-bold text-white/80">
                {answerKeyReady
                  ? 'Konversi section score berdasarkan tabel TOEFL PBT.'
                  : 'Kunci jawaban belum tersedia, jadi skor dan benar/salah belum dihitung.'}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {sectionResults.map((section) => (
                <div key={section.title} className="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm">
                  <p className="text-xs font-black uppercase tracking-wider text-slate-400">{section.title}</p>
                  <p className="mt-2 text-2xl font-black text-[#101828]">{answerKeyReady ? section.scaled : '-'}</p>
                  <p className="mt-1 text-sm font-bold text-slate-500">
                    {answerKeyReady ? `${section.raw} / ${section.total} benar` : `${section.answered} / ${section.total} terjawab`}
                  </p>
                </div>
              ))}
            </div>

            <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-black text-[#101828]">{answerKeyReady ? 'Rekomendasi' : 'Menunggu kunci jawaban'}</h3>
              <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-500">
                {answerKeyReady
                  ? totalScore >= 550
                    ? 'Skor kamu sudah kuat. Fokus berikutnya: speed reading, listening detail, dan latihan full test dengan batas waktu.'
                    : totalScore >= 450
                      ? 'Fondasi sudah terbentuk. Naikkan skor dengan drilling Structure dan latihan membaca passage akademik setiap hari.'
                      : 'Bangun ulang grammar dasar, vocabulary akademik, dan kebiasaan listening pendek. Ulangi test setelah latihan terarah 1 minggu.'
                  : 'Jawaban peserta tetap tersimpan di sesi ini. Setelah kunci jawaban dimasukkan, skor, review benar/salah, email, dan sertifikat bisa diaktifkan kembali.'}
              </p>
            </div>

            {answerKeyReady && (
              <div className="rounded-3xl border border-sky-100 bg-sky-50 p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-[#1E6F9F]">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-black text-[#101828]">
                      {emailStatus === 'sent'
                        ? 'Sertifikat sudah dikirim ke email'
                        : emailStatus === 'sending'
                          ? 'Mengirim sertifikat ke email...'
                          : emailStatus === 'error'
                            ? 'Sertifikat belum terkirim otomatis'
                            : 'Sertifikat akan dikirim ke email'}
                    </p>
                    <p className="mt-1 text-xs font-semibold leading-relaxed text-slate-500">
                      {emailStatus === 'error'
                        ? `${emailError || 'Silakan coba download sertifikat manual.'}`
                        : `Kami mengirim PDF sertifikat TOEFL ke ${user?.email || 'email akun kamu'}.`}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {questions.map((question, index) => {
                const userAnswer = answers[question.id];
                const hasQuestionAnswer = question.answer !== ANSWER_PENDING;
                const isCorrect = hasQuestionAnswer && userAnswer === question.answer;
                return (
                  <div key={question.id} className="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm">
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <p className="text-xs font-black uppercase tracking-wider text-slate-400">{index + 1}. {question.section}</p>
                      <span className={`rounded-full px-2.5 py-1 text-[10px] font-black ${
                        !hasQuestionAnswer
                          ? 'bg-amber-50 text-amber-700'
                          : isCorrect
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-red-50 text-red-600'
                      }`}>
                        {!hasQuestionAnswer ? 'Pending' : isCorrect ? 'Benar' : 'Review'}
                      </span>
                    </div>
                    <p className="font-black leading-snug text-[#101828]">{question.prompt}</p>
                    <p className="mt-2 text-sm font-semibold text-slate-500">
                      Jawaban kamu: {userAnswer === undefined ? 'Belum dijawab' : question.options[userAnswer]}
                    </p>
                    {hasQuestionAnswer && (
                      <p className="mt-1 text-sm font-semibold text-emerald-700">
                        Jawaban benar: {question.options[question.answer]}
                      </p>
                    )}
                    {hasQuestionAnswer && question.correction && (
                      <p className="mt-1 text-sm font-semibold text-sky-700">
                        Perbaikan: {question.correction}
                      </p>
                    )}
                    <p className="mt-2 text-xs font-semibold leading-relaxed text-slate-400">{question.explanation}</p>
                  </div>
                );
              })}
            </div>

            {answerKeyReady && (
              <button
                type="button"
                onClick={handleDownloadCertificate}
                disabled={downloading}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#0D2B55] to-[#1E6F9F] px-4 py-4 text-sm font-black text-white shadow-md shadow-blue-200 transition hover:opacity-90 disabled:opacity-60"
              >
                <Download size={18} />
                {downloading ? 'Generating Certificate...' : 'Download Certificate (PDF)'}
              </button>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={resetExam}
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-slate-100 px-4 py-3 text-sm font-black text-slate-600"
              >
                <RotateCcw size={18} /> Ulangi
              </button>
              <button
                type="button"
                onClick={() => navigate('/modul')}
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#4FA3D1] px-4 py-3 text-sm font-black text-white"
              >
                <CheckCircle2 size={18} /> Selesai
              </button>
            </div>
          </motion.div>
        )}
          </div>{/* inner centering div for exam mode */}
        </div>{/* fullscreen / normal wrapper */}
      </PageContainer>
    </>
  );
}
