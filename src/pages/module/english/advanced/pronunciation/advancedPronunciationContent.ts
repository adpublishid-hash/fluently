export type PronunciationModelLine = {
  text: string;
  focus: string;
  note: string;
};

export type PronunciationQuizQuestion = {
  q: string;
  opts: string[];
  ans: string;
  exp: string;
};

export type AdvancedPronunciationLessonContent = {
  id: number;
  title: string;
  subtitle: string;
  outcome: string;
  overview: string;
  concepts: string[];
  articulation: string[];
  modelLines: PronunciationModelLine[];
  drills: string[];
  recordingTask: string;
  selfCheck: string[];
  quiz: PronunciationQuizQuestion[];
};

const titles = [
  ['Fluency Benchmark', 'C1 pronunciation diagnostic and delivery baseline'],
  ['Vowel Precision', 'Long, short, central, and reduced vowel control'],
  ['Consonant Clusters', 'Clear multi-consonant endings and academic words'],
  ['Word Stress Patterns', 'Stress rules for complex vocabulary'],
  ['Sentence Stress and Rhythm', 'Stress-timed English in longer speech'],
  ['Connected Speech: Linking', 'Smooth consonant-vowel and vowel-vowel transitions'],
  ['Connected Speech: Elision', 'Natural sound deletion without losing clarity'],
  ['Connected Speech: Assimilation', 'Sound changes across word boundaries'],
  ['Weak Forms and Schwa', 'Reduced function words in natural speech'],
  ['Intonation Patterns', 'Falling, rising, fall-rise, and level tones'],
  ['Nuclear Stress and Focus', 'Choosing the main information word'],
  ['Discourse Intonation', 'Signposting ideas through pitch and pausing'],
  ['Intrusion and Liaison', 'Using /w/, /j/, and /r/ links naturally'],
  ['Contrastive Stress', 'Correcting, comparing, and emphasizing meaning'],
  ['-ed and -s Endings', 'Precise grammatical endings in fast speech'],
  ['Word-Class Stress Shifts', 'Noun-verb stress pairs and related families'],
  ['Consonant Precision', 'Dental, postalveolar, and final consonant accuracy'],
  ['Suprasegmental Control', 'Pitch range, pacing, prominence, and pausing'],
  ['Accent and Intelligibility', 'Keeping accent identity while improving clarity'],
  ['C1 Pronunciation Simulation', 'Full advanced speaking performance check'],
];

const modelBank: PronunciationModelLine[][] = [
  [
    { text: 'To begin with, I would argue that the evidence is mixed.', focus: 'pacing and thought groups', note: 'Pause after "begin with" and keep the main stress on "mixed".' },
    { text: 'Let me rephrase that more precisely.', focus: 'self-correction phrase', note: 'Use a fall-rise on "rephrase" to sound controlled, not hesitant.' },
    { text: 'The issue is more nuanced than it first appears.', focus: 'C1 lexical stress', note: 'Stress "nuanced" and "appears". Reduce "than it".' },
    { text: 'In other words, the outcome depends on context.', focus: 'signposting', note: 'Link "words, the" smoothly and pause before the conclusion.' },
    { text: 'I am not entirely convinced by that interpretation.', focus: 'hedging tone', note: 'Keep "entirely" light; stress "convinced" and "interpretation".' },
    { text: 'Overall, the argument is plausible but incomplete.', focus: 'final evaluation', note: 'Falling tone at the end gives a clear conclusion.' },
  ],
  [
    { text: 'The team needs a brief review before the meeting.', focus: 'long /i/ vs short /i/', note: 'Contrast "needs" with "brief"; avoid turning "meeting" into two equal beats.' },
    { text: 'This policy is both practical and controversial.', focus: 'schwa in unstressed syllables', note: 'Reduce the weak vowels in "policy", "practical", and "controversial".' },
    { text: 'Her speech was clear, but the pitch was too high.', focus: 'vowel length', note: 'Hold "speech" slightly longer than "pitch".' },
    { text: 'The cost of living has risen dramatically.', focus: 'central vowels', note: 'Reduce "of" and "has"; stress "living" and "dramatically".' },
    { text: 'We should avoid vague claims and precise-looking errors.', focus: 'diphthong control', note: 'Make "avoid", "vague", and "claims" distinct.' },
    { text: 'A balanced answer requires careful wording.', focus: 'vowel reduction', note: 'Weak "a" becomes schwa; stress "balanced", "requires", and "careful".' },
  ],
  [
    { text: 'The project risks increased costs next spring.', focus: 'final clusters', note: 'Do not drop final /ks/, /sts/, or /kst/ clusters.' },
    { text: 'Experts stressed the strengths of the strategy.', focus: 'initial and final clusters', note: 'Keep "experts stressed strengths" crisp but not over-separated.' },
    { text: 'The texts describe complex social constraints.', focus: 'academic clusters', note: 'Release the final consonants lightly.' },
    { text: 'She asks for facts, not abstract guesses.', focus: '-s clusters', note: 'Keep "asks", "facts", and "guesses" grammatically audible.' },
    { text: 'Several groups attempted structured tasks.', focus: 'past endings', note: 'Pronounce "attempted" with an extra syllable; "structured" ends in /d/.' },
    { text: 'The sixth draft fixed most weaknesses.', focus: 'difficult sequence', note: 'Slow slightly through "sixth draft" without adding a vowel.' },
  ],
  [
    { text: 'Economic development requires political stability.', focus: 'primary stress', note: 'Stress "nom", "vel", "quires", "lit", and "bil".' },
    { text: 'Photography and biography follow a similar pattern.', focus: '-ography stress', note: 'Stress the syllable before -graphy: phoTOGraphy, biOGraphy.' },
    { text: 'The analysis was systematic rather than emotional.', focus: 'suffix stress', note: 'Stress "nal" in analysis and "mat" in systematic.' },
    { text: 'We need to clarify the objective immediately.', focus: 'multi-syllable control', note: 'Give each long word one clear main stress.' },
    { text: 'The proposal was intellectually ambitious.', focus: 'secondary stress', note: 'Do not flatten long words; keep a rhythm.' },
    { text: 'A controversial decision can still be defensible.', focus: 'stress placement', note: 'Stress "ver", "ci", and "fen".' },
  ],
  [
    { text: 'Most people want reliable information, not just faster answers.', focus: 'content-word stress', note: 'Stress nouns, adjectives, and main verbs; reduce function words.' },
    { text: 'If we look at the data, the pattern becomes clearer.', focus: 'rhythm and pausing', note: 'Pause after the if-clause; stress "data", "pattern", and "clearer".' },
    { text: 'The problem is not the idea itself, but the way it is implemented.', focus: 'contrastive rhythm', note: 'Stress "not", "idea", "way", and "implemented".' },
    { text: 'It would have been easier to explain with a visual example.', focus: 'weak forms', note: 'Reduce "would have been" but keep it understandable.' },
    { text: 'The more specific the claim, the easier it is to test.', focus: 'parallel rhythm', note: 'Match the rhythm in both halves.' },
    { text: 'What matters most is whether the audience can follow the logic.', focus: 'focus stress', note: 'Main stress falls on "audience" and "logic".' },
  ],
  [
    { text: 'Turn it off after the interview is over.', focus: 'consonant-vowel linking', note: 'Link "turn-it-off" and "interview-is-over".' },
    { text: 'An effective answer often starts with a clear example.', focus: 'linking across vowels', note: 'Avoid hard stops between vowel sounds.' },
    { text: 'Take a minute to look at it again.', focus: 'rapid linking', note: 'Say it as connected chunks, not isolated words.' },
    { text: 'The result is interesting, although it is incomplete.', focus: 'resyllabification', note: 'Final consonants attach to following vowels.' },
    { text: 'I agree with most of it, but not all of it.', focus: 'linking in opinion', note: 'Connect "most-of-it" and "all-of-it".' },
    { text: 'Could you explain it in another way?', focus: 'question rhythm', note: 'Link smoothly and rise slightly at the end.' },
  ],
  [
    { text: 'The next stage should start next week.', focus: 't/d elision', note: 'The /t/ in "next stage" may soften, but meaning must remain clear.' },
    { text: 'I must say, the first draft was stronger.', focus: 'cluster simplification', note: 'Do not overpronounce every /t/ in fast speech.' },
    { text: 'The last speaker made a persuasive point.', focus: 'natural deletion', note: 'The /t/ in "last speaker" can be reduced.' },
    { text: 'Most students noticed the pattern quickly.', focus: 'controlled elision', note: 'Keep grammatical endings audible where needed.' },
    { text: 'The second reason is more convincing.', focus: 'd reduction', note: 'The /d/ in "second reason" links lightly.' },
    { text: 'Facts can be compressed, but they cannot be invented.', focus: 'clarity after elision', note: 'Elision should help fluency, not hide content.' },
  ],
  [
    { text: 'Ten people joined the discussion.', focus: 'n to m before p', note: 'In natural speech, "ten people" may sound like "tem people".' },
    { text: 'Good boys often become good men.', focus: 'd before b', note: 'The /d/ may shift toward /b/ before "boys".' },
    { text: 'Would you mind moving this chair?', focus: 'd + y assimilation', note: '"Would you" often becomes a smoother "wouldja".' },
    { text: 'Did you notice the change?', focus: 'd + y', note: 'Connected speech may produce a /j/ blend.' },
    { text: 'This year the figures are more stable.', focus: 's + y', note: '"This year" can sound like "thish year" in rapid speech.' },
    { text: 'Green parks make cities healthier.', focus: 'n before p', note: 'The nasal adjusts to the following consonant.' },
  ],
  [
    { text: 'I can explain the result if you want.', focus: 'weak can', note: 'Weak "can" is reduced; strong "can" is used for emphasis.' },
    { text: 'The answer is in the second part of the article.', focus: 'schwa and weak the/of', note: 'Reduce "the", "is", "in", and "of".' },
    { text: 'We have to consider the long-term effect.', focus: 'have to reduction', note: '"Have to" often sounds like "hafta".' },
    { text: 'There are a number of reasons for this.', focus: 'there are / of / for', note: 'Do not stress every function word.' },
    { text: 'It is an example of a wider trend.', focus: 'schwa chain', note: 'Many unstressed vowels become schwa.' },
    { text: 'What are you going to do about it?', focus: 'going to reduction', note: '"Going to" may reduce to "gonna" in informal speech.' },
  ],
  [
    { text: 'That is a reasonable conclusion.', focus: 'falling intonation', note: 'Use falling tone to sound definite.' },
    { text: 'Could you clarify that point?', focus: 'rising intonation', note: 'Rise at the end for a polite yes/no-style request.' },
    { text: 'It is possible, but not very likely.', focus: 'fall-rise', note: 'Fall-rise shows reservation or partial agreement.' },
    { text: 'First, we need to define the problem.', focus: 'continuing tone', note: 'Keep pitch slightly open after "first".' },
    { text: 'I agree with the aim, not the method.', focus: 'contrastive intonation', note: 'Pitch highlights the contrast.' },
    { text: 'So, what should we do next?', focus: 'engaging question', note: 'Use a natural rise to invite response.' },
  ],
  [
    { text: 'I asked for the report on Monday.', focus: 'nuclear stress position', note: 'Stress "Monday" if the day is new information.' },
    { text: 'I asked for the report on Monday, not Tuesday.', focus: 'contrastive focus', note: 'Stress "Monday" and "Tuesday".' },
    { text: 'She wanted the blue folder, not the green one.', focus: 'color contrast', note: 'Main stress falls on the contrasting adjectives.' },
    { text: 'The policy failed because it was unclear.', focus: 'reason focus', note: 'Stress "because" phrase if it answers why.' },
    { text: 'The surprising part is the timing.', focus: 'new information', note: 'Main stress normally lands near the end.' },
    { text: 'We need evidence, not assumptions.', focus: 'focus correction', note: 'Stress the corrected item strongly.' },
  ],
  [
    { text: 'There are three main reasons. First, cost. Second, access. Third, trust.', focus: 'discourse signposting', note: 'Use clear pauses and parallel pitch.' },
    { text: 'Having said that, the evidence is not conclusive.', focus: 'concession', note: 'Fall-rise on the opening phrase sounds balanced.' },
    { text: 'This brings me to the second point.', focus: 'transition phrase', note: 'Pause after the phrase before explaining.' },
    { text: 'The key point here is not speed, but reliability.', focus: 'topic focus', note: 'Pitch marks the contrast.' },
    { text: 'Let me give you a concrete example.', focus: 'listener guidance', note: 'Stress "concrete example".' },
    { text: 'To sum up, the proposal is promising but incomplete.', focus: 'closing tone', note: 'Use a controlled fall for closure.' },
  ],
  [
    { text: 'Go on and explain the idea again.', focus: 'linking w', note: 'A light /w/ link can appear between "go" and "on".' },
    { text: 'I am interested in the idea of it.', focus: 'linking y and r', note: 'A /j/ link appears after "I"; linking /r/ may appear in some accents.' },
    { text: 'The law and order issue is complex.', focus: 'linking w', note: 'Smooth the transition between vowel sounds.' },
    { text: 'She asked for a better answer.', focus: 'linking r', note: 'Non-rhotic accents may link final r before a vowel.' },
    { text: 'They are aware of every option.', focus: 'liaison', note: 'Connect adjacent vowel sounds without glottal stops.' },
    { text: 'A new era of innovation is beginning.', focus: 'vowel-vowel transition', note: 'Use light links to keep fluency.' },
  ],
  [
    { text: 'I said the report was useful, not perfect.', focus: 'correction', note: 'Stress "useful" and "perfect" to show contrast.' },
    { text: 'She did finish it; she just finished it late.', focus: 'emphatic did', note: 'Strong "did" corrects an assumption.' },
    { text: 'The problem is the cost, not the concept.', focus: 'contrast pair', note: 'Keep the rhythm parallel.' },
    { text: 'I am questioning the method, not the motive.', focus: 'precision', note: 'Contrast "method" and "motive".' },
    { text: 'It is possible, but it is not probable.', focus: 'semantic contrast', note: 'Stress the key adjectives.' },
    { text: 'We need fewer claims and more evidence.', focus: 'argument emphasis', note: 'Stress "fewer" and "more".' },
  ],
  [
    { text: 'They watched three short documentaries.', focus: '-ed /t/', note: '"Watched" ends with /t/ because the base ends in a voiceless sound.' },
    { text: 'The panel agreed and revised the plan.', focus: '-ed /d/', note: '"Agreed" and "revised" end with /d/.' },
    { text: 'The committee rejected the proposal.', focus: '-ed /id/', note: '"Rejected" adds an extra syllable because it ends in /t/.' },
    { text: 'She presents complex ideas clearly.', focus: '-s endings', note: '"Presents" and "ideas" have different final sounds.' },
    { text: 'The books, pages, and boxes are ready.', focus: 'plural endings', note: 'Contrast /s/, /z/, and /iz/ endings.' },
    { text: 'He manages tasks and leads teams.', focus: 'third person endings', note: 'Keep final grammar audible.' },
  ],
  [
    { text: 'They will record a new record tomorrow.', focus: 'noun-verb stress', note: 'Verb reCORD; noun RECord.' },
    { text: 'The project may increase the overall increase in cost.', focus: 'stress shift', note: 'Verb inCREASE; noun INcrease.' },
    { text: 'We need to present a balanced present position.', focus: 'present stress', note: 'Verb preSENT; adjective/noun PREsent.' },
    { text: 'The export figures show what they export.', focus: 'export stress', note: 'Noun EXport; verb exPORT.' },
    { text: 'They object to the object in the image.', focus: 'object stress', note: 'Verb obJECT; noun OBject.' },
    { text: 'The permit allows them to permit entry.', focus: 'permit stress', note: 'Noun PERmit; verb perMIT.' },
  ],
  [
    { text: 'The theory is thorough, though not universally accepted.', focus: 'th sounds', note: 'Contrast voiceless /th/ in "theory" with voiced /th/ in "though".' },
    { text: 'She measured the vision and the precision of the device.', focus: 'sh/zh distinction', note: 'Keep "vision" and "precision" smooth but distinct from "mission".' },
    { text: 'The judge chose a cautious approach.', focus: 'j/ch/sh', note: 'Do not merge /j/, /ch/, and /sh/ sounds.' },
    { text: 'Clear final consonants make the message credible.', focus: 'final consonants', note: 'Release final /t/, /d/, /k/, and /b/ lightly.' },
    { text: 'This thick cloth is difficult to breathe through.', focus: 'dental fricatives', note: 'Tongue touches the teeth for "th".' },
    { text: 'The result was casual, not careless.', focus: 's/z/zh', note: 'Control voicing and friction.' },
  ],
  [
    { text: 'If we examine the evidence carefully, a different picture emerges.', focus: 'pitch range', note: 'Use a wider range on the main clause.' },
    { text: 'The first explanation is simple; the second is more persuasive.', focus: 'balanced phrasing', note: 'Make both halves rhythmically parallel.' },
    { text: 'This is not a minor detail; it changes the entire argument.', focus: 'prominence', note: 'Stress "not", "minor", "changes", and "entire".' },
    { text: 'Before we draw conclusions, we should check the assumptions.', focus: 'pausing', note: 'Pause after the introductory clause.' },
    { text: 'A calm pace often sounds more authoritative than a fast one.', focus: 'pace control', note: 'Do not rush the final comparison.' },
    { text: 'The point is worth emphasizing because it is often overlooked.', focus: 'emphasis', note: 'Use pitch and length on "worth emphasizing".' },
  ],
  [
    { text: 'My aim is clarity, not imitation.', focus: 'intelligibility goal', note: 'Stress "clarity" and "imitation".' },
    { text: 'A strong accent can still be highly intelligible.', focus: 'accent identity', note: 'Use a warm, confident tone.' },
    { text: 'Listeners need rhythm, clear stress, and predictable pauses.', focus: 'listener comfort', note: 'List items with parallel intonation.' },
    { text: 'I can slow down without sounding unnatural.', focus: 'pace adjustment', note: 'Keep connected speech while reducing speed.' },
    { text: 'The important words should stand out clearly.', focus: 'prominence', note: 'Do not stress every word.' },
    { text: 'Pronunciation is about successful communication.', focus: 'final message', note: 'Conclude with a firm falling tone.' },
  ],
  [
    { text: 'Today I will discuss the benefits and limitations of remote work.', focus: 'presentation opening', note: 'Mark the topic clearly and pause after "today".' },
    { text: 'The strongest argument in favour is flexibility.', focus: 'argument focus', note: 'Stress "strongest", "favour", and "flexibility".' },
    { text: 'However, this advantage depends on good management.', focus: 'concession tone', note: 'Use fall-rise on "however".' },
    { text: 'For example, unclear expectations can reduce productivity.', focus: 'example framing', note: 'Pause after "for example".' },
    { text: 'In contrast, structured communication can improve trust.', focus: 'contrast marker', note: 'Stress "contrast" and "structured".' },
    { text: 'To conclude, the model works best when expectations are explicit.', focus: 'closing simulation', note: 'Slow slightly for the final claim.' },
  ],
];

const conceptBank = [
  ['Use thought groups to make long C1 sentences easier to follow.', 'Control speed by stretching key words, not by pausing after every word.', 'Repair speech naturally with phrases like "let me rephrase that" and "to be more precise".'],
  ['Distinguish tense and lax vowels in minimal pairs.', 'Reduce unstressed vowels to schwa in long words.', 'Maintain vowel length only where it carries meaning.'],
  ['Produce final clusters without adding extra vowels.', 'Keep grammatical endings audible in plural, third-person, and past forms.', 'Slow down only on dense consonant groups.'],
  ['Identify the main stress in academic vocabulary.', 'Use suffix patterns such as -tion, -ic, -ity, and -graphy.', 'Avoid stressing every syllable in long words.'],
  ['English rhythm depends on stressed beats, not equal syllables.', 'Function words are usually reduced between content words.', 'Parallel structures should have parallel rhythm.'],
  ['A final consonant often links to the next vowel.', 'Vowel-to-vowel links should sound smooth, not separated.', 'Connected speech improves fluency and listening comprehension.'],
  ['Elision removes sounds when clusters are difficult.', 'Natural deletion should not remove important grammar.', 'Elision is common with /t/ and /d/ between consonants.'],
  ['Assimilation changes a sound to become more like its neighbour.', 'It often happens with /n/, /d/, /t/, /s/, and /z/.', 'Recognising assimilation helps decode fast speech.'],
  ['Weak forms carry grammar, while strong forms carry emphasis.', 'Schwa is the default vowel in many unstressed syllables.', 'Overstressing function words makes speech sound unnatural.'],
  ['Falling tone signals completion or certainty.', 'Rising tone invites response or shows incompleteness.', 'Fall-rise can show reservation, politeness, or contrast.'],
  ['Nuclear stress is the main stressed word in a phrase.', 'It usually marks new or contrastive information.', 'Moving nuclear stress changes the meaning.'],
  ['Pitch organizes discourse, not only individual sentences.', 'Transitions need clear pausing and signposting.', 'A good speaker guides listeners through structure.'],
  ['Intrusive links help vowel-vowel transitions.', 'Linking /r/ depends on accent variety.', 'Liaison should be light and natural.'],
  ['Contrastive stress corrects assumptions.', 'Emphatic auxiliaries can clarify meaning.', 'Parallel contrast improves argumentative clarity.'],
  ['-ed endings are /t/, /d/, or /id/.', '-s endings are /s/, /z/, or /iz/.', 'Clear endings make grammar easier to understand.'],
  ['Many noun-verb pairs shift stress.', 'Stress can also shift across word families.', 'Correct stress improves professional credibility.'],
  ['Dental fricatives require tongue-to-teeth contact.', 'Final consonants should be released lightly.', 'Precision matters more than exaggerated articulation.'],
  ['Suprasegmentals include pitch, stress, rhythm, and pace.', 'A wider pitch range helps emphasis.', 'Strategic pauses make complex ideas easier to process.'],
  ['Intelligibility is the goal, not accent elimination.', 'Listeners rely on rhythm, stress, and clear endings.', 'Accent identity can remain while clarity improves.'],
  ['Combine stress, rhythm, intonation, and connected speech.', 'Use C1 discourse markers with controlled delivery.', 'Evaluate yourself against clarity, fluency, and listener comfort.'],
];

function makeQuiz(lesson: number, title: string, lines: PronunciationModelLine[], concepts: string[]): PronunciationQuizQuestion[] {
  const base: PronunciationQuizQuestion[] = [
    {
      q: `In "${title}", what should be the main learning goal?`,
      opts: [concepts[0], 'Pronouncing every word separately with equal stress', 'Speaking as fast as possible'],
      ans: concepts[0],
      exp: concepts[0],
    },
    {
      q: `Which model sentence is best for Lesson ${lesson} practice?`,
      opts: [lines[0].text, 'I like apples.', 'This is a pen.'],
      ans: lines[0].text,
      exp: `This sentence practises ${lines[0].focus}.`,
    },
    {
      q: `What is the focus of "${lines[1].text}"?`,
      opts: [lines[1].focus, lines[2].focus, 'basic spelling'],
      ans: lines[1].focus,
      exp: lines[1].note,
    },
    {
      q: 'At C1 level, pronunciation practice should prioritise:',
      opts: ['intelligibility, rhythm, stress, and controlled emphasis', 'copying one accent perfectly', 'avoiding connected speech completely'],
      ans: 'intelligibility, rhythm, stress, and controlled emphasis',
      exp: 'Advanced pronunciation focuses on listener comfort and meaning, not accent erasure.',
    },
  ];

  const generated = Array.from({ length: 16 }, (_, index) => {
    const line = lines[index % lines.length];
    const concept = concepts[index % concepts.length];
    return {
      q: `Lesson ${lesson} check ${index + 5}: How should you practise "${line.text}"?`,
      opts: [
        `Focus on ${line.focus} and record one controlled repetition`,
        'Stress every syllable equally from start to finish',
        'Remove all pauses even when the sentence is long',
      ],
      ans: `Focus on ${line.focus} and record one controlled repetition`,
      exp: `${line.note} Key concept: ${concept}`,
    };
  });

  return [...base, ...generated];
}

export const advancedPronunciationLessons: AdvancedPronunciationLessonContent[] = titles.map(([title, subtitle], index) => {
  const id = index + 1;
  const concepts = conceptBank[index];
  const modelLines = modelBank[index];

  return {
    id,
    title,
    subtitle,
    outcome: `By the end of this lesson, learners can apply ${title.toLowerCase()} in C1/C2 speech with clearer stress, rhythm, and listener-friendly delivery.`,
    overview: `${title} trains advanced pronunciation as a communication skill: clear meaning, natural flow, accurate prominence, and confident delivery in academic or professional contexts.`,
    concepts,
    articulation: [
      `Listen to the model sentence, then repeat it once slowly and once at natural speed.`,
      `Mark the main stressed word before speaking: ${modelLines[0].focus}.`,
      `Record a 45-60 second answer using at least three model lines from this lesson.`,
      `Replay your recording and check whether the key words are easier to hear than the function words.`,
    ],
    modelLines,
    drills: [
      `Shadow each model line three times: slow, natural, then presentation speed.`,
      `Underline the most important word in each sentence and exaggerate it once before returning to natural delivery.`,
      `Say the sentence with the wrong stress, then correct it and notice how the meaning changes.`,
      `Record yourself answering a short C1 question using this lesson's focus.`,
      `Compare your recording with TTS and repeat only the section that sounds unclear.`,
    ],
    recordingTask: `Record a one-minute C1 response using ${title.toLowerCase()}. Include an opening signpost, two detailed points, and one concluding sentence.`,
    selfCheck: [
      'Did the listener hear the most important information without reading the text?',
      'Were function words reduced naturally instead of over-stressed?',
      'Did pauses support meaning rather than interrupt it?',
      'Did final consonants and grammatical endings remain clear?',
      'Did your intonation match the attitude: certain, cautious, polite, or contrastive?',
    ],
    quiz: makeQuiz(id, title, modelLines, concepts),
  };
});

export function getAdvancedPronunciationLesson(id: number) {
  return advancedPronunciationLessons.find((lesson) => lesson.id === id) ?? advancedPronunciationLessons[0];
}
