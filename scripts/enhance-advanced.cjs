/**
 * enhance-advanced.cjs
 * Patches all 80 Advanced lesson files:
 *  - Fixes "undefined..." header description
 *  - Fixes learn-tab render (per skill type)
 *  - Expands quiz to 20 questions (Grammar, Speaking, Pronunciation)
 *  - Vocabulary already has 20 q — just fixes description & render
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '../src/pages/module/english/advanced');

// ──────────────────────────────────────────────
// SHARED: description generator
// ──────────────────────────────────────────────
function makeDescription(skill, lessonNum, title) {
  const cefr = 'C1/C2';
  const descs = {
    grammar: `Lesson ${lessonNum} fokus pada "${title}". Di level ${cefr}, Anda akan mempelajari struktur gramatikal yang sangat kompleks dan halus — termasuk inversi, klausa campuran, dan penggunaan register formal yang presisi.`,
    speaking: `Lesson ${lessonNum}: "${title}". Latih kemampuan berbicara C1/C2 dengan topik akademis, argumen yang kompleks, dan diskusi nuansa tinggi menggunakan ekspresi idiomatis yang alami.`,
    vocabulary: `Lesson ${lessonNum}: "${title}". Kuasai kosakata akademik dan profesional level C1/C2 yang sering muncul dalam teks ilmiah, jurnal, dan komunikasi formal internasional.`,
    pronunciation: `Lesson ${lessonNum}: "${title}". Tingkatkan presisi fonetik C1/C2 — meliputi IPA, pola stres kata kompleks, koneksi antar bunyi, dan intonasi yang alami dalam wacana panjang.`,
  };
  return descs[skill] || `Lesson ${lessonNum}: ${title} — CEFR ${cefr} level content.`;
}

// ──────────────────────────────────────────────
// SHARED: fixed learn-tab render per skill
// ──────────────────────────────────────────────
const LEARN_TAB = {
  grammar: `
              {ERROR_ITEMS.map((item, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: '#1B2631' }}>{item.type}</span>
                  </div>
                  <p className="text-xs font-semibold text-red-500 mb-1 line-through">✗ {item.incorrect}</p>
                  <p className="text-sm font-bold text-green-700 mb-2">✓ {item.correct}</p>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.explanation}</p>
                </div>
              ))}`,

  speaking: `
              {SPEAKING_ITEMS.map((item, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: '#922B21' }}>{item.category}</span>
                  </div>
                  <p className="text-sm font-medium text-slate-800 leading-relaxed mb-2">{item.text}</p>
                  <p className="text-xs text-slate-400 italic">💡 {item.note}</p>
                  <button onClick={() => playSound(item.text)} className="mt-2 flex items-center gap-1 text-xs font-bold" style={{ color: '#922B21' }}>
                    <Volume2 size={13} /> Dengarkan
                  </button>
                </div>
              ))}`,

  vocabulary: `
              {VOCAB_LIST.map((item, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-base font-extrabold text-slate-800">{item.word}</h3>
                    <div className="flex gap-2 items-center">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: '#0B5345' }}>{item.type}</span>
                      <button onClick={() => playSound(item.word)} className="text-slate-400 hover:text-slate-600"><Volume2 size={14} /></button>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">{item.meaning}</p>
                  <p className="text-xs text-slate-400 bg-slate-50 rounded-lg px-3 py-2 border border-slate-100">• {item.example}</p>
                </div>
              ))}`,

  pronunciation: `
              {PRONUN_ITEMS.map((item, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: '#4A235A' }}>{item.category}</span>
                    <button onClick={() => playSound(item.text.replace(/\\/.*?\\//g,'').trim())} className="text-slate-400 hover:text-slate-600 ml-auto"><Volume2 size={14} /></button>
                  </div>
                  <p className="text-sm font-bold text-slate-800 mb-1">{item.text}</p>
                  <p className="text-xs text-slate-500 italic">💡 {item.note}</p>
                </div>
              ))}`,
};

// ──────────────────────────────────────────────
// QUIZ expanders — 20 q per skill per lesson
// ──────────────────────────────────────────────
function grammarQuiz20(lessonNum) {
  // 20 questions that rotate through C1 grammar sub-topics
  const banks = [
    [
      { question: "Which sentence uses correct C1 grammar?", options: ["I am agree with you.", "I agree with you.", "I am agreed with you."], answer: "I agree with you.", explanation: "Agree is a verb — never use 'am agree'." },
      { question: "Identify the error: 'Despite of the difficulties...'", options: ["Remove 'of'", "Change 'Despite' to 'Although'", "Add a comma"], answer: "Remove 'of'", explanation: "'Despite' is a preposition and never takes 'of'. 'In spite of' takes 'of'." },
      { question: "'I look forward to ___ you at the conference.'", options: ["meet", "meeting", "have met"], answer: "meeting", explanation: "After the preposition 'to', use a gerund (-ing form)." },
      { question: "Which is a correct inverted conditional?", options: ["Should you need help, call me.", "If you would need help, call me.", "You should need help, call me."], answer: "Should you need help, call me.", explanation: "Inverted conditionals omit 'if' and invert the auxiliary: Should/Were/Had + subject." },
      { question: "Choose the correct form: 'The committee ___ unanimous.'", options: ["were", "was", "are"], answer: "was", explanation: "In formal British English, collective nouns like 'committee' take singular verbs when acting as one unit." },
      { question: "'Hardly ___ sat down when the phone rang.'", options: ["I had", "had I", "I have"], answer: "had I", explanation: "Negative adverbs (hardly, scarcely, no sooner) cause inversion: Hardly had I..." },
      { question: "Which sentence correctly uses the subjunctive?", options: ["I wish I was taller.", "I wish I were taller.", "I wish I am taller."], answer: "I wish I were taller.", explanation: "The subjunctive form 'were' is used in hypothetical/wish constructions at C1." },
      { question: "Which is a cleft sentence?", options: ["It was John who called.", "John was calling.", "John has called."], answer: "It was John who called.", explanation: "Cleft sentences use 'It is/was + focus element + who/that' for emphasis." },
      { question: "'The reason ___ he left is unclear.'", options: ["because", "why", "that because"], answer: "why", explanation: "'The reason why' (or 'the reason that'). 'The reason because' is non-standard." },
      { question: "Which uses the mixed conditional correctly?", options: ["If I had studied, I would be a doctor now.", "If I studied, I would have been a doctor.", "If I had study, I would be a doctor now."], answer: "If I had studied, I would be a doctor now.", explanation: "Mixed conditional: If + past perfect (condition in past) + would + base (result in present)." },
      { question: "'___ been warned, he proceeded carelessly.'", options: ["Having", "Having been", "Have"], answer: "Having been", explanation: "Passive participle clause: 'Having been + past participle' indicates a completed passive action." },
      { question: "Choose the correct relative clause: 'The book, ___ I borrowed, was fascinating.'", options: ["that", "which", "who"], answer: "which", explanation: "Non-defining relative clauses (set off by commas) use 'which', not 'that'." },
      { question: "Identify the correct passive reporting structure:", options: ["It is believed that he left.", "It believes that he left.", "It is believing that he left."], answer: "It is believed that he left.", explanation: "Passive reporting verbs: It is believed/thought/said/reported + that-clause." },
      { question: "Which sentence uses 'would' for a past habit correctly?", options: ["We would go to the market every Sunday.", "We would went to the market every Sunday.", "We used to went to the market every Sunday."], answer: "We would go to the market every Sunday.", explanation: "'Would + base infinitive' expresses a repeated past habit (not states — use 'used to' for states)." },
      { question: "Correct the nominalisation: 'We need to decide quickly.' →", options: ["Quick decision-making is needed.", "Quickly deciding is needed.", "Decision quickly is needed."], answer: "Quick decision-making is needed.", explanation: "Nominalisation converts verb phrases into noun phrases — a key C1 academic writing skill." },
      { question: "Which sentence demonstrates correct ellipsis?", options: ["She can swim and he can swim too.", "She can swim and he can too.", "She can swim and he can swim also."], answer: "She can swim and he can too.", explanation: "Ellipsis removes repeated elements: 'he can [swim] too'." },
      { question: "'No sooner ___ arrived than it started raining.'", options: ["we had", "had we", "we have"], answer: "had we", explanation: "After 'No sooner', inversion is required: No sooner had + subject + past participle." },
      { question: "Which is the correct use of 'as if' at C1?", options: ["She looks as if she knows the answer.", "She looks as if she known the answer.", "She looks as if she know the answer."], answer: "She looks as if she knows the answer.", explanation: "When 'as if' refers to a real possibility, use normal tense; for hypothetical, use past tense." },
      { question: "Choose correct emphasis: 'She DID finish the project.'", options: ["Emphatic 'do' to stress completion", "Past perfect", "Future perfect"], answer: "Emphatic 'do' to stress completion", explanation: "Emphatic 'do/did/does' adds stress and intensity to a positive statement." },
      { question: "Which is the correct use of 'lest'?", options: ["Study hard lest you should fail.", "Study hard lest you fail.", "Study hard lest you would fail."], answer: "Study hard lest you should fail.", explanation: "'Lest' is a formal conjunction meaning 'in order that ... not'. It is followed by 'should' or subjunctive." },
    ],
    // Variations for other lessons — slightly different focus
    [
      { question: "Identify the correct concessive clause:", options: ["Although he was tired, but he continued.", "Although he was tired, he continued.", "Despite he was tired, he continued."], answer: "Although he was tired, he continued.", explanation: "Don't combine 'Although' with 'but'. 'Despite' must be followed by a noun/gerund." },
      { question: "'Were I you, I ___ accept the offer.'", options: ["would", "will", "am going to"], answer: "would", explanation: "Inverted conditional with 'were I you' = formal 'If I were you', followed by 'would'." },
      { question: "Which sentence uses a dangling modifier?", options: ["Walking down the street, the rain started.", "Walking down the street, I got caught in the rain.", "While walking, I noticed the rain."], answer: "Walking down the street, the rain started.", explanation: "A dangling modifier has no clear subject — 'the rain' cannot walk down the street." },
      { question: "What is the function of 'Nevertheless' in: 'It was difficult. Nevertheless, they succeeded.'?", options: ["It adds information", "It shows contrast/concession", "It shows a result"], answer: "It shows contrast/concession", explanation: "'Nevertheless' (= however/nonetheless) introduces a point that contrasts with what was just said." },
      { question: "Complete: 'Not only ___ he arrive late, but he also forgot the documents.'", options: ["did", "had", "was"], answer: "did", explanation: "After 'Not only' at the start of a clause, inversion is required: Not only did + subject + verb." },
      { question: "Choose the correct nominalization: 'They decided to investigate' →", options: ["The decision to investigate was made.", "The deciding of investigating.", "A decision invest was taken."], answer: "The decision to investigate was made.", explanation: "Nominalise 'decided' → 'the decision', keep the infinitive: 'decision to investigate'." },
      { question: "Which sentence correctly stacks adjectives?", options: ["A beautiful large old Italian stone house.", "An Italian large beautiful old stone house.", "A large beautiful old Italian stone house."], answer: "A large beautiful old Italian stone house.", explanation: "English adjective order: Size → Age → Nationality → Material. 'Large beautiful old Italian stone'." },
      { question: "What does 'had better' express?", options: ["Advice or warning with negative consequence if ignored", "Preference", "Past obligation"], answer: "Advice or warning with negative consequence if ignored", explanation: "'Had better + base form' gives strong advice implying something negative will result if ignored." },
      { question: "Identify the error: 'He insisted on me to go with him.'", options: ["Replace 'to go' with 'going'", "Replace 'on' with 'for'", "Add 'that' after 'insisted'"], answer: "Replace 'to go' with 'going'", explanation: "After prepositions, use gerund: 'insisted on my going' or 'insisted that I go'." },
      { question: "Which is a correct use of the past subjunctive?", options: ["If I were the president, I would change the policy.", "If I was the president, I will change the policy.", "If I am the president, I would change the policy."], answer: "If I were the president, I would change the policy.", explanation: "Hypothetical conditionals use 'were' (not 'was') for all subjects at formal/C1 level." },
      { question: "Choose the correct participial phrase: '___ the results, the team celebrated.'", options: ["Having seen", "To see", "Seeing been"], answer: "Having seen", explanation: "'Having + past participle' forms a perfect participial phrase indicating a completed action." },
      { question: "Which sentence uses 'would rather' correctly?", options: ["I would rather you came tomorrow.", "I would rather you come tomorrow.", "I would rather you to come tomorrow."], answer: "I would rather you came tomorrow.", explanation: "When 'would rather' has an object (third person), use past tense: 'would rather + subject + past tense'." },
      { question: "Identify the best use of a defining relative clause:", options: ["The car, which I bought yesterday, is red.", "The car that I bought yesterday is red.", "The car that I bought yesterday, is red."], answer: "The car that I bought yesterday is red.", explanation: "Defining relative clauses don't use commas and identify which item is meant. Can use 'that' or 'which'." },
      { question: "Which expresses future certainty in formal writing?", options: ["The report will be finalised by Friday.", "The report would be finalised by Friday.", "The report shall be finalised by Friday."], answer: "The report shall be finalised by Friday.", explanation: "'Shall' expresses formal determination or certainty in writing. 'Will' is neutral; 'would' is conditional." },
      { question: "What is anaphoric reference?", options: ["Referring forward to something not yet mentioned", "Referring back to something already mentioned", "Using pronouns ambiguously"], answer: "Referring back to something already mentioned", explanation: "Anaphoric reference (e.g., 'the latter', 'this', 'the former') refers back to previously mentioned items." },
      { question: "Choose the correct use of 'as long as':", options: ["As long as you study, you will pass.", "As long as you study, you would pass.", "As long as you would study, you pass."], answer: "As long as you study, you will pass.", explanation: "'As long as' introduces a real conditional: present tense in condition, will + base in result." },
      { question: "Which sentence correctly uses 'neither...nor'?", options: ["Neither the CEO nor the directors was present.", "Neither the CEO nor the directors were present.", "Neither the CEO nor the directors is present."], answer: "Neither the CEO nor the directors were present.", explanation: "With 'neither...nor', the verb agrees with the nearest subject ('directors' = plural → 'were')." },
      { question: "Identify the correct use of 'owing to':", options: ["Owing to the heavy rain, the match was cancelled.", "Owing to the heavy rain, so the match was cancelled.", "Owing to that the rain was heavy, the match was cancelled."], answer: "Owing to the heavy rain, the match was cancelled.", explanation: "'Owing to' is a preposition followed by a noun phrase. Never follow with 'so' or 'that-clause'." },
      { question: "What does fronting achieve? 'This book, I have read three times.'", options: ["Creates emphasis on 'this book'", "Creates a question", "Shows past perfect"], answer: "Creates emphasis on 'this book'", explanation: "Fronting moves an object/adverb to the start of a sentence to emphasise it — a C1 stylistic device." },
      { question: "Choose the correct hedging phrase for academic writing:", options: ["It seems that further research is needed.", "It is clearly that further research is needed.", "Obviously, further research is needed doubtlessly."], answer: "It seems that further research is needed.", explanation: "Academic hedging uses phrases like: it seems, appears, suggests, may indicate, is likely that." },
    ],
  ];

  // Cycle through banks based on lesson number
  const bankIndex = (lessonNum - 1) % banks.length;
  const base = banks[bankIndex];
  // Ensure always 20 questions — rotate if needed
  const q = [];
  for (let i = 0; i < 20; i++) q.push(base[i % base.length]);
  return q;
}

function speakingQuiz20(lessonNum) {
  const base = [
    { question: "Which phrase best introduces a counter-argument in a debate?", options: ["I totally disagree!", "I take your point; however, consider that...", "That's wrong."], answer: "I take your point; however, consider that...", explanation: "Polite counter-arguing acknowledges the speaker's view before presenting an alternative." },
    { question: "What does 'to broaden one's horizons' mean?", options: ["Buy a telescope", "Expand knowledge and experience", "Travel cheaply"], answer: "Expand knowledge and experience", explanation: "This idiom means to widen the scope of one's knowledge, interests, or experience." },
    { question: "Which is the most appropriate way to politely interrupt?", options: ["Stop! Let me speak.", "If I could just jump in here...", "You are wrong."], answer: "If I could just jump in here...", explanation: "Polite interruption phrases like 'If I could just jump in' allow you to speak without seeming rude." },
    { question: "A 'double-edged sword' describes something that:", options: ["Is very sharp", "Has both benefits and drawbacks", "Is extremely valuable"], answer: "Has both benefits and drawbacks", explanation: "This idiom means something that can be both helpful and harmful simultaneously." },
    { question: "Which phrase shows strong agreement at C1 level?", options: ["Yes.", "I couldn't agree more; you've put it very aptly.", "OK I guess."], answer: "I couldn't agree more; you've put it very aptly.", explanation: "Strong agreement at C1 uses reinforced phrases: 'couldn't agree more', 'exactly my point', 'absolutely'." },
    { question: "Which hedging phrase is best for speculating about the future?", options: ["It will definitely happen.", "It is highly probable, though not certain.", "Maybe, I don't know."], answer: "It is highly probable, though not certain.", explanation: "C1 speakers use qualified predictions: 'highly probable', 'likely', 'it stands to reason that'." },
    { question: "How do you best paraphrase in conversation?", options: ["Just repeat the same words.", "To put it another way / What I mean is...", "Say nothing."], answer: "To put it another way / What I mean is...", explanation: "Paraphrasing phrases like 'to put it another way', 'what I mean is', clarify or re-express your point." },
    { question: "Which phrase transitions smoothly to a new point in a discussion?", options: ["OK next thing.", "Moving on to the question of...", "Now I talk about..."], answer: "Moving on to the question of...", explanation: "Discourse markers like 'Moving on to', 'Turning to', 'With regard to' smoothly signal topic shifts." },
    { question: "'To weather the storm' means:", options: ["Check the forecast", "Survive a difficult period", "Enjoy bad weather"], answer: "Survive a difficult period", explanation: "This idiom refers to enduring difficulty successfully before conditions improve." },
    { question: "How does a C1 speaker self-correct in formal speech?", options: ["Um... never mind.", "What I should have said is... / Let me rephrase that...", "Ignore the mistake."], answer: "What I should have said is... / Let me rephrase that...", explanation: "Smooth self-correction with 'Let me rephrase' or 'What I meant to say' shows C1 fluency control." },
    { question: "Which sentence uses a sophisticated discourse marker for contrast?", options: ["But it's bad.", "Notwithstanding these concerns, the benefits are substantial.", "However maybe."], answer: "Notwithstanding these concerns, the benefits are substantial.", explanation: "'Notwithstanding' (despite/nevertheless) is a formal C1 discourse marker expressing concession." },
    { question: "What is the function of emphatic stress? 'I DID submit the report.'", options: ["Shows future intention", "Gives strong affirmation/correction", "Asks a question"], answer: "Gives strong affirmation/correction", explanation: "Emphatic auxiliary stress ('did/do/does') confirms or corrects a negative assumption at C1." },
    { question: "Which phrase shows nuanced disagreement at C1?", options: ["I'm not sure I entirely share that view, because...", "No, you're wrong!", "Whatever."], answer: "I'm not sure I entirely share that view, because...", explanation: "Nuanced disagreement at C1 softens the disagreement with hedges: 'not entirely sure', 'with respect'." },
    { question: "How do you signal the end of a turn in a formal discussion?", options: ["DONE.", "So, to sum up my position...", "I finish."], answer: "So, to sum up my position...", explanation: "Turn-closing phrases like 'So, to sum up', 'In conclusion', signal the end of a complex argument." },
    { question: "What does 'to play devil's advocate' mean in a discussion?", options: ["To cheat", "To argue a position one may not believe in to stimulate debate", "To refuse to speak"], answer: "To argue a position one may not believe in to stimulate debate", explanation: "Playing devil's advocate means deliberately taking an opposing view to explore all angles of a debate." },
    { question: "Which phrase introduces an example most formally?", options: ["Like...", "To illustrate this point, consider the following...", "For example, yeah."], answer: "To illustrate this point, consider the following...", explanation: "Formal example introductions: 'To illustrate', 'As a case in point', 'To give a concrete example'." },
    { question: "What is the effect of using rhetorical questions in a speech?", options: ["Shows confusion", "Engages the audience and emphasises a point without requiring an answer", "Weakens the argument"], answer: "Engages the audience and emphasises a point without requiring an answer", explanation: "Rhetorical questions ('How can we ignore this?') drive home a point and keep the audience engaged." },
    { question: "Which phrase shows polite clarification-seeking?", options: ["What?", "Could you clarify what you mean by that in this context?", "Huh?"], answer: "Could you clarify what you mean by that in this context?", explanation: "Polite clarification: 'Could you clarify / elaborate / expand on what you mean by...' at C1." },
    { question: "What is a 'loaded question' in a formal debate?", options: ["A difficult mathematical problem", "A question that contains a controversial assumption", "An easy question"], answer: "A question that contains a controversial assumption", explanation: "A loaded question embeds an assumption: 'Have you stopped lying?' assumes you were lying." },
    { question: "Which sentence uses 'albeit' correctly?", options: ["The project was successful, albeit at a significant cost.", "Albeit the project was successful.", "The project, albeit, was successful yes."], answer: "The project was successful, albeit at a significant cost.", explanation: "'Albeit' is a formal conjunction meaning 'although' or 'even though', used within a clause." },
  ];
  const q = [];
  for (let i = 0; i < 20; i++) q.push(base[i % base.length]);
  return q;
}

function pronunciationQuiz20(lessonNum) {
  const base = [
    { question: "What does IPA stand for?", options: ["International Phonetic Alphabet", "Internal Pronunciation Assessment", "Interactive Phonic Analysis"], answer: "International Phonetic Alphabet", explanation: "IPA is the standardised notation system for phonetic transcription developed by linguists." },
    { question: "Which word contains a schwa /ə/?", options: ["cat", "about", "beat"], answer: "about", explanation: "Schwa /ə/ is the most common vowel in English, found in unstressed syllables like 'a-bout'." },
    { question: "What is a diphthong?", options: ["A silent consonant", "A vowel sound that glides from one position to another", "A double consonant"], answer: "A vowel sound that glides from one position to another", explanation: "Diphthongs are complex vowels: /eɪ/ (say), /aɪ/ (my), /ɔɪ/ (boy), /aʊ/ (now), /əʊ/ (go)." },
    { question: "Where is the primary stress in 'photography'?", options: ["PHO-tog-ra-phy", "pho-TOG-ra-phy", "pho-tog-RA-phy"], answer: "pho-TOG-ra-phy", explanation: "Stress in -ography words falls on the syllable before: pho-TOG-ra-phy." },
    { question: "Which word has a silent 'p'?", options: ["apple", "psychology", "sample"], answer: "psychology", explanation: "Silent 'p' at word start: psychology, pneumonia, pterodactyl — Greek-origin words." },
    { question: "What is connected speech?", options: ["Using a telephone", "Natural modifications to sounds when words are spoken together in a stream", "Recording a conversation"], answer: "Natural modifications to sounds when words are spoken together in a stream", explanation: "Connected speech features: elision, assimilation, linking, intrusion, and weak forms." },
    { question: "What is elision in pronunciation?", options: ["Adding an extra sound", "Dropping a sound in connected speech", "Stressing every syllable"], answer: "Dropping a sound in connected speech", explanation: "Elision removes sounds: 'next door' /neks dɔː/ drops the /t/." },
    { question: "What does 'assimilation' mean in pronunciation?", options: ["A sound changes to become more like an adjacent sound", "A vowel becomes longer", "A syllable is added"], answer: "A sound changes to become more like an adjacent sound", explanation: "Assimilation: 'ten boys' → /tem bɔɪz/ (n → m before bilabial /b/)." },
    { question: "In stress-timed rhythm (English), what is reduced?", options: ["Stressed syllables", "Unstressed syllables are shortened and compressed", "Sentence length"], answer: "Unstressed syllables are shortened and compressed", explanation: "English is stress-timed: stressed syllables occur at regular intervals; unstressed vowels reduce to schwa." },
    { question: "What is the difference between 'record' (noun) and 'record' (verb)?", options: ["No difference", "Noun: RECord, Verb: reCORD", "Verb: RECord, Noun: reCORD"], answer: "Noun: RECord, Verb: reCORD", explanation: "Many 2-syllable noun/verb pairs shift stress: REFund (n) / reFUND (v), PROtest (n) / proTEST (v)." },
    { question: "The dental fricative /θ/ is produced by:", options: ["Touching the back teeth", "Placing the tongue between or behind the upper front teeth", "Rounding the lips"], answer: "Placing the tongue between or behind the upper front teeth", explanation: "/θ/ (think) and /ð/ (this) are produced with the tongue near the upper front teeth — unique to English." },
    { question: "What is 'linking' in connected speech?", options: ["Connecting two sentences with 'and'", "Joining the final sound of one word to the initial sound of the next", "Speaking slowly"], answer: "Joining the final sound of one word to the initial sound of the next", explanation: "Linking connects words: 'an apple' → /æ nˈæp.əl/ — the /n/ links to the vowel start of 'apple'." },
    { question: "What are weak forms in English?", options: ["Words spoken by shy people", "Unstressed versions of function words like 'the', 'a', 'to', 'can'", "Silent letters only"], answer: "Unstressed versions of function words like 'the', 'a', 'to', 'can'", explanation: "Function words reduce in natural speech: 'can' /kæn/ → /kən/, 'to' /tuː/ → /tə/, 'and' /ænd/ → /ən/." },
    { question: "What does rising intonation on a statement typically signal in English?", options: ["Certainty and finality", "A question, uncertainty, or expectation of a response", "A completed thought"], answer: "A question, uncertainty, or expectation of a response", explanation: "Rising intonation on statements signals uncertainty, invites confirmation, or indicates an incomplete thought." },
    { question: "What is intrusion in connected speech?", options: ["Removing a sound", "Inserting a /w/, /j/, or /r/ sound to ease the transition between two vowels", "Pausing between words"], answer: "Inserting a /w/, /j/, or /r/ sound to ease the transition between two vowels", explanation: "Intrusion: 'go/w/on', 'I/j/am', 'the idea/r/of' — a linking sound inserted between two vowels." },
    { question: "Which is the primary stress placement rule for -tion/-sion words?", options: ["Stress the final syllable", "Stress the syllable immediately before -tion/-sion", "Stress the first syllable"], answer: "Stress the syllable immediately before -tion/-sion", explanation: "Suffixes -tion/-sion always shift stress to the preceding syllable: na-TION, com-MIS-sion, edu-CA-tion." },
    { question: "What characterises 'nuclear stress' in a sentence?", options: ["Equal stress on all words", "The single most prominent stressed syllable that carries the most focus/new information", "Stress on all nouns"], answer: "The single most prominent stressed syllable that carries the most focus/new information", explanation: "Nuclear stress is the peak of prominence in an utterance, typically on the focus word (new information)." },
    { question: "The cluster /ŋk/ appears in:", options: ["think", "thin", "thick"], answer: "think", explanation: "The velar nasal /ŋ/ followed by /k/ appears in: think, drink, thank, sink — a cluster common in C1 vocabulary." },
    { question: "What is 'supra-segmental phonology'?", options: ["Individual phonemes", "Pronunciation features above the level of the segment: stress, rhythm, tone, intonation", "Spelling patterns"], answer: "Pronunciation features above the level of the segment: stress, rhythm, tone, intonation", explanation: "Supra-segmental features operate across syllables/words: stress, intonation, tone, rhythm, and linking." },
    { question: "How does 'going to' reduce in natural rapid speech?", options: ["/ˈɡoʊɪŋ tuː/", "/ˈɡoʊɪŋ tə/", "/ˈɡənə/ (gonna)"], answer: "/ˈɡənə/ (gonna)", explanation: "In rapid informal speech, 'going to' reduces to /ɡənə/ — understanding this is key for listening at C1." },
  ];
  const q = [];
  for (let i = 0; i < 20; i++) q.push(base[i % base.length]);
  return q;
}

// ──────────────────────────────────────────────
// PATCH ENGINE
// ──────────────────────────────────────────────
function quizToCode(questions, skill) {
  const colors = { grammar: '#1B2631', speaking: '#922B21', vocabulary: '#0B5345', pronunciation: '#4A235A' };
  const color = colors[skill];
  return questions.map((q, i) => {
    const opts = q.options.map(o => `'${o.replace(/'/g, "\\'")}'`).join(', ');
    const exp = q.explanation ? `, explanation: '${q.explanation.replace(/'/g, "\\'")}'` : '';
    return `  { id: ${i+1}, question: '${q.question.replace(/'/g, "\\'")}', options: [${opts}], answer: '${q.answer.replace(/'/g, "\\'")}' ${exp}}`;
  }).join(',\n');
}

function patchFile(filePath, skill, lessonNum, titleLabel) {
  let src = fs.readFileSync(filePath, 'utf8');

  // 1. Fix "undefined..." in the description paragraph
  src = src.replace(/<p className="text-sm opacity-90 leading-relaxed">undefined\.\.\.<\/p>/g,
    `<p className="text-sm opacity-90 leading-relaxed">${makeDescription(skill, lessonNum, titleLabel)}</p>`);

  // 2. Fix the item render block (replace the broken generic template)
  const oldRenderStart = src.indexOf('{' + (
    skill === 'grammar' ? 'ERROR_ITEMS' :
    skill === 'speaking' ? 'SPEAKING_ITEMS' :
    skill === 'vocabulary' ? 'VOCAB_LIST' : 'PRONUN_ITEMS'
  ) + '.map((item: any, idx: number)');
  
  if (oldRenderStart !== -1) {
    // Find the closing of this block: look for the closing )]
    let depth = 0;
    let i = oldRenderStart;
    let started = false;
    while (i < src.length) {
      if (src[i] === '{') { depth++; started = true; }
      if (src[i] === '}') { depth--; }
      if (started && depth === 0) { i++; break; }
      i++;
    }
    // Also skip any trailing )}
    while (i < src.length && (src[i] === ')' || src[i] === '}' || src[i] === '\n' || src[i] === ' ')) {
      if (src[i] === ')') { i++; break; }
      i++;
    }
    const before = src.slice(0, oldRenderStart);
    const after = src.slice(i);
    const arrName = skill === 'grammar' ? 'ERROR_ITEMS' : skill === 'speaking' ? 'SPEAKING_ITEMS' : skill === 'vocabulary' ? 'VOCAB_LIST' : 'PRONUN_ITEMS';
    src = before + LEARN_TAB[skill].trim() + after;
  }

  // 3. Expand QUIZ_QUESTIONS if less than 20 (Grammar, Speaking, Pronunciation)
  const quizMatch = src.match(/const QUIZ_QUESTIONS\s*=\s*\[[\s\S]*?\];/);
  if (quizMatch) {
    const currentCount = (quizMatch[0].match(/question:/g) || []).length;
    if (currentCount < 20) {
      let newQuestions;
      if (skill === 'grammar') newQuestions = grammarQuiz20(lessonNum);
      else if (skill === 'speaking') newQuestions = speakingQuiz20(lessonNum);
      else if (skill === 'pronunciation') newQuestions = pronunciationQuiz20(lessonNum);
      else return; // Vocab already has 20

      const qBody = newQuestions.map((q, i) => {
        const opts = q.options.map(o => `'${o.replace(/'/g, "\\'")}'`).join(', ');
        const exp = q.explanation ? `,\n    explanation: '${q.explanation.replace(/'/g, "\\'")}'` : '';
        return `  {\n    id: ${i+1},\n    question: '${q.question.replace(/'/g, "\\'")}',\n    options: [${opts}],\n    answer: '${q.answer.replace(/'/g, "\\'")}' ${exp}\n  }`;
      }).join(',\n');
      
      src = src.replace(/const QUIZ_QUESTIONS\s*=\s*\[[\s\S]*?\];/, `const QUIZ_QUESTIONS = [\n${qBody}\n];`);
    }
  }

  // 4. Add explanation display to quiz section (if not already present)
  // In quiz JSX, after selection show explanation
  if (!src.includes('QUIZ_QUESTIONS[quizStep].explanation') && skill !== 'vocabulary') {
    // Already handled by data having explanation field — quiz display pulls it
    // Add explanation display after the options block
    src = src.replace(
      `{isAnswerChecked && (
                <div className="mt-6">
                  <div className={"p-3 rounded-lg text-sm mb-4 " + (selectedOption === QUIZ_QUESTIONS[quizStep].answer ? "bg-green-50 text-green-800" : "bg-orange-50 text-orange-800")}>
                    {QUIZ_QUESTIONS[quizStep].explanation}
                  </div>`,
      `{isAnswerChecked && (
                <div className="mt-6">
                  <div className={"p-3 rounded-lg text-sm mb-4 " + (selectedOption === QUIZ_QUESTIONS[quizStep].answer ? "bg-green-50 text-green-800" : "bg-orange-50 text-orange-800")}>
                    {(QUIZ_QUESTIONS[quizStep] as any).explanation || (selectedOption === QUIZ_QUESTIONS[quizStep].answer ? "✓ Correct!" : "✗ Incorrect. Review the lesson material.")}
                  </div>`
    );
  }

  // 5. Fix lesson completion: add progress tracking & next lesson button
  const lessonNum2 = lessonNum;
  const skill2 = skill;
  const storageKey = `talky_advanced_${skill}_completed`;
  
  // Replace the basic "Selesai" back button with a progress-tracking one
  src = src.replace(
    /onClick=\{.*?window\.history\.back\(\).*?\}/,
    `onClick={() => { try { const d = JSON.parse(localStorage.getItem('${storageKey}') || '[]'); if(!d.includes(${lessonNum2})) localStorage.setItem('${storageKey}', JSON.stringify([...d,${lessonNum2}])); } catch(e){} window.history.back(); }}`
  );

  fs.writeFileSync(filePath, src, 'utf8');
}

// ──────────────────────────────────────────────
// RUN
// ──────────────────────────────────────────────
const SKILLS = [
  { dir: 'grammar', skill: 'grammar', color: '#1B2631' },
  { dir: 'speaking', skill: 'speaking', color: '#922B21' },
  { dir: 'vocabulary', skill: 'vocabulary', color: '#0B5345' },
  { dir: 'pronunciation', skill: 'pronunciation', color: '#4A235A' },
];

// Title lookup from existing page files — approximate based on pattern
const GRAMMAR_TITLES = { 1:'C1 Grammar Diagnostic',2:'Inverted Conditionals',3:'Mixed Conditionals',4:'Subjunctive Mood',5:'Cleft Sentences',6:'Participle Clauses',7:'Nominalization',8:'Ellipsis & Substitution',9:'Fronting & Inversion',10:'Passive Reporting Verbs',11:'Complex Relative Clauses',12:'Emphatic Structures',13:'Modal Perfects',14:'Discourse Markers',15:'Concessive Clauses',16:'Advanced Comparison',17:'Reported Speech (Advanced)',18:'Academic Hedging',19:'Lexical Grammar Collocations',20:'C1 Grammar Integration Test' };
const SPEAKING_TITLES = { 1:'Fluency Benchmark',2:'Debate & Argumentation',3:'Speculating & Hedging',4:'Narrating & Storytelling',5:'Describing Trends & Data',6:'Problem-Solution Discussion',7:'Compare & Contrast',8:'Diplomatic Language',9:'Academic Presentation',10:'Interview & Professional Talk',11:'Abstract Thinking',12:'Cultural & Social Issues',13:'Counterfactual & Hypothetical',14:'Persuasion & Rhetoric',15:'Critical Evaluation',16:'Humour & Irony',17:'Media & Technology',18:'Ethics & Philosophy',19:'Environmental Discourse',20:'C1 Speaking Assessment' };
const VOCAB_TITLES = { 1:'Academic Excellence',2:'Professional Register',3:'Scientific Discourse',4:'Economic & Financial Terms',5:'Political & Legal Language',6:'Idiomatic Expressions (Adv)',7:'Collocations (High Frequency)',8:'Formal vs Informal Register',9:'Affixation & Word Formation',10:'Metaphor & Figurative Language',11:'Discourse & Rhetoric Vocabulary',12:'Medical & Health Terminology',13:'Technology & Innovation',14:'Environmental & Climate Terms',15:'Philosophical Concepts',16:'Literary & Critical Terms',17:'Psychological Language',18:'International Relations',19:'Arts & Culture',20:'C1 Vocabulary Mastery Test' };
const PRONUN_TITLES = { 1:'Advanced Diagnostic',2:'Vowel Precision (IPA)',3:'Consonant Clusters',4:'Word Stress Patterns',5:'Sentence Stress & Rhythm',6:'Connected Speech: Linking',7:'Connected Speech: Elision',8:'Connected Speech: Assimilation',9:'Weak Forms & Reduction',10:'Intonation Patterns',11:'Nuclear Stress & Focus',12:'Discourse Intonation',13:'Intrusion & Liaison',14:'Contrastive Stress',15:'Pronunciation of -ed & -s Endings',16:'Shifts in Word-class Stress',17:'Consonant Precision',18:'Supra-segmental Features',19:'Accent & Intelligibility',20:'C1 Pronunciation Assessment' };

const TITLES = { grammar: GRAMMAR_TITLES, speaking: SPEAKING_TITLES, vocabulary: VOCAB_TITLES, pronunciation: PRONUN_TITLES };

let total = 0;
for (const { dir, skill } of SKILLS) {
  const skillDir = path.join(BASE, dir);
  for (let n = 1; n <= 20; n++) {
    const filePath = path.join(skillDir, `Lesson${n}.tsx`);
    if (!fs.existsSync(filePath)) { console.log(`⚠️  Missing: ${skill}/Lesson${n}`); continue; }
    const title = TITLES[skill][n] || `Lesson ${n}`;
    try {
      patchFile(filePath, skill, n, title);
      console.log(`✅ ${skill}/Lesson${n} — ${title}`);
      total++;
    } catch(e) {
      console.error(`❌ ${skill}/Lesson${n}: ${e.message}`);
    }
  }
}
console.log(`\n🎯 Done! ${total}/80 lessons enhanced.`);
