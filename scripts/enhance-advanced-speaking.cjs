/**
 * enhance-advanced-speaking.cjs
 * Generates rich Speaking lessons (1-20) with premium UI
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '../src/pages/module/english/advanced/speaking');
const ACCENT = '#922B21';
const STORAGE_KEY = 'talky_advanced_speaking_completed';

const SPEAKING_TOPICS = [
  { n:1, title:'Fluency Benchmark', obj:'Assess and elevate your C1/C2 fluency in spontaneous, nuanced academic and professional conversation.', 
    theory:`**C1 Fluency Benchmarks**

At C1, fluency means more than speaking quickly. It involves:

**1. Discourse-level organisation**
Your speech is logically structured with clear signposting: "To begin with... Furthermore... In contrast... To conclude..."

**2. Self-correction and repair**
You can correct yourself naturally: "What I should have said is... / Let me rephrase that... / To be more precise..."

**3. Hedging and qualification**
Rather than stating facts absolutely, you qualify appropriately: "It appears that... / One might argue that... / Evidence suggests..."

**4. Lexical range and idiom**
- Idiomatic phrases: "a double-edged sword", "bear the brunt of", "by the same token"
- Sophisticated connectors: "notwithstanding", "by virtue of", "in the wake of"

**5. Coping strategies**
If you lose a word, you paraphrase: "the person who... / the thing that causes... / a kind of mechanism that..."

**Key self-evaluation questions:**
✓ Can you sustain a 2-minute monologue without pausing excessively?
✓ Can you follow and contribute to rapidly-paced group discussions?
✓ Can you adjust register from informal to formal within the same conversation?` },

  { n:2, title:'Debate & Argumentation', obj:'Master advanced debate techniques — building, defending, rebutting, and conceding arguments at C1/C2 level.',
    theory:`**The Architecture of a Formal Argument**

A well-structured argument at C1 follow the PEEL model with sophisticated language:

**Point:** State your main claim clearly.
- *"It is my contention that..." / "I would argue that..." / "The evidence strongly supports..."*

**Elaboration:** Develop your point with reasoning.
- *"This is significant because... / The implications of this are... / What underpins this view is..."*

**Evidence:** Support with specific examples/data.
- *"A compelling illustration of this... / To substantiate this, consider... / As evidenced by..."*

**Link:** Connect back to the main topic.
- *"This reinforces the notion that... / Consequently, we can conclude..."*

**Rebuttal techniques:**
- *"While I appreciate that perspective, the evidence actually suggests..."*
- *"That point has merit, however, it overlooks..."*
- *"I would challenge that assumption on the grounds that..."*

**Concession:**
- *"I concede that... nevertheless..."*
- *"Granted, X is true, but this does not negate Y..."*

**Logical fallacies to avoid at C1:**
- Ad hominem (attacking the person, not the argument)
- Strawman (distorting opponent's argument)
- False dichotomy (presenting only two options when more exist)` },

  { n:3, title:'Speculating & Hedging', obj:'Use sophisticated hedging language to speculate, qualify, and express uncertainty at C1/C2 level.',
    theory:`**The Language of Qualified Speculation**

At C1, speakers express uncertainty with precision and sophistication:

**Modal hedges:**
- *May/might:* "This **may** indicate a structural issue."
- *Could:* "The results **could** be attributable to external factors."
- *Would:* "One **would** expect to see improvement."

**Adverbial hedges:**
- *Arguably:* "This is **arguably** the most significant finding."
- *Seemingly/apparently:* "The data **seemingly** contradicts the hypothesis."
- *Presumably/presumably:* "**Presumably**, further research will clarify this."

**Verb phrase hedges:**
- *It appears/seems that...*
- *It would seem that...*
- *There is reason to believe that...*
- *The evidence suggests/indicates that...*

**Frequency hedges:**
- *tends to / is inclined to / is apt to*
- *in most cases / generally speaking / as a rule*

**Attribution hedges (distancing):**
- *According to X... / As X argues... / X claims that...*

**Qualifying absolute statements:**
- ✗ "AI will replace all jobs." 
- ✓ "AI has the **potential** to reshape, and in some sectors **may** significantly reduce, the demand for certain types of labour."` },

  { n:4, title:'Narrating & Storytelling', obj:'Tell compelling, sophisticated stories and anecdotes using advanced narrative techniques at C1/C2 level.',
    theory:`**Advanced Narrative Techniques at C1**

**1. Setting the scene with sophistication**
- ✗ "It was a Monday morning."
- ✓ "It was an overcast Monday morning in late November when, quite out of the blue, the news arrived."

**2. Tense variety for effect**
- Past simple: main narrative events ("She entered the boardroom.")
- Past continuous: background setting ("While negotiations were ongoing...")
- Past perfect: prior context ("By the time the report landed, the team had already anticipated...")
- Historic present (for vivid effect): "So she walks in, and suddenly everyone goes silent."

**3. Evaluative language**
Show the significance of events, don't just describe:
- *"What struck me most was..." / "The remarkable thing about this was..."*
- *"Looking back, I realise that..." / "In retrospect, it's clear that..."*

**4. Direct speech for immediacy:**
- "He turned to me and said, quite calmly, 'This changes everything.'"

**5. Sequence markers:**
- *Initially... Subsequently... In due course... Eventually... In the end...*

**6. Resolution and reflection:**
- *"The upshot of all this was..." / "What I took away from this experience was..."*` },

  { n:5, title:'Describing Trends & Data', obj:'Articulate trends, graphs, and statistics with precision and sophisticated academic language at C1/C2 level.',
    theory:`**Language for Data Description at C1**

Academic presentations and discussions require precise, varied language for describing quantitative information.

**Verbs for trends:**
- Increase: *rise, grow, climb, surge, escalate, soar, skyrocket*
- Decrease: *fall, drop, decline, dip, plummet, contract, shrink*
- Stabilise: *level off, plateau, remain stable, hold steady*
- Fluctuate: *fluctuate, oscillate, vary*

**Adverbs for degree:**
- Sharp: *dramatically, sharply, steeply, substantially, markedly*
- Gradual: *gradually, steadily, marginally, slightly, incrementally*

**Describing proportions:**
- *"Just under half... / Approximately one-third... / Nearly two-thirds..."*
- *"A disproportionate share... / The lion's share... / A negligible proportion..."*

**Comparing data points:**
- *"By contrast / In comparison / While X increased, Y declined commensurately."*
- *"The gap between X and Y widened significantly over the period."*

**Attributing causes:**
- *"This upward trend may be attributable to..."*
- *"The decline appears to correlate with..."*
- *"A plausible explanation for this pattern is..."*

**Forecasting:**
- *"Projections suggest that... / On current trends, we might expect... / Barring unforeseen disruptions..."*` },
];

// Fill remaining lessons
const MORE_TOPICS = [
  { n:6, title:'Problem-Solution Discussion', obj:'Structure sophisticated problem-solution discourse using advanced framing and analytical language.' },
  { n:7, title:'Compare & Contrast', obj:'Make nuanced comparisons using sophisticated parallel structures and precise hedged language.' },
  { n:8, title:'Diplomatic Language', obj:'Navigate sensitive topics, disagreements, and negotiations using advanced diplomatic and tactful expressions.' },
  { n:9, title:'Academic Presentation', obj:'Deliver structured academic presentations with professional signposting, hedging, and Q&A techniques.' },
  { n:10, title:'Interview & Professional Talk', obj:'Excel in professional interviews and workplace discussions using C1-level precision and confidence.' },
  { n:11, title:'Abstract Thinking', obj:'Discuss abstract philosophical, ethical, and theoretical concepts with nuance and intellectual depth.' },
  { n:12, title:'Cultural & Social Issues', obj:'Engage critically with cultural, social, and political topics using balanced, evidence-based discourse.' },
  { n:13, title:'Counterfactual & Hypothetical', obj:'Discuss hypothetical scenarios and counterfactuals using mixed conditionals and modal perfects.' },
  { n:14, title:'Persuasion & Rhetoric', obj:'Master rhetorical structures — ethos, pathos, logos — and sophisticated persuasion techniques.' },
  { n:15, title:'Critical Evaluation', obj:'Evaluate arguments, sources, and evidence critically using precise analytical vocabulary.' },
  { n:16, title:'Humour & Irony', obj:'Understand and produce English humour, irony, and understatement at C1 level.' },
  { n:17, title:'Media & Technology', obj:'Discuss media, digital society, and technology critically with relevant C1 specialist vocabulary.' },
  { n:18, title:'Ethics & Philosophy', obj:'Articulate complex ethical and philosophical positions with precision and sophistication.' },
  { n:19, title:'Environmental Discourse', obj:'Engage with environmental, climate, and sustainability topics using advanced academic vocabulary.' },
  { n:20, title:'C1 Speaking Assessment', obj:'Demonstrate full C1 speaking competence across all sub-skills: fluency, range, accuracy, and coherence.' },
];

const MORE_THEORIES = {
  6: `**Problem-Solution Discourse Structure**\n\n**1. Naming the problem:**\n- *"One of the most pressing challenges facing... is..."*\n- *"A significant concern that has emerged is..."*\n- *"The root cause of this problem lies in..."*\n\n**2. Analysing causes:**\n- *"This arises principally from... / This can be attributed to... / Contributing factors include..."*\n\n**3. Evaluating consequences:**\n- *"The ramifications of this are far-reaching... / The downstream effects include..."*\n- *"Left unaddressed, this will inevitably result in..."*\n\n**4. Proposing solutions:**\n- *"A viable approach would be to... / One potential remedy is... / A more sustainable solution lies in..."*\n\n**5. Evaluating solutions:**\n- *"While this approach has merit, it is not without limitations..."*\n- *"Its effectiveness is contingent upon... / The main drawback is..."*\n\n**6. Conclusion:**\n- *"On balance, the most pragmatic course of action appears to be..."*`,
  7: `**Advanced Comparison Structures**\n\n**Balanced comparisons:**\n- *"While X has the advantage of..., Y is superior in terms of..."*\n- *"Both X and Y share the characteristic of..., however they diverge in..."*\n\n**Disproportionate comparison:**\n- *"X is considerably more... than Y in that..."*\n- *"The difference between X and Y is not merely one of degree but of kind."*\n\n**Comparative structures:**\n- *"The more..., the more..." (proportional)*\n- *"As opposed to / In contrast to / Contrary to popular belief..."*\n\n**Nuanced equivalence:**\n- *"No less significant than X is Y..."*\n- *"X is no more effective than Y in achieving Z."*\n\n**Pattern: Similarities first, differences second:**\n1. Common ground: *"Both approaches share..."*\n2. Key difference: *"However, a fundamental distinction lies in..."*\n3. Evaluation: *"Ultimately, X proves more effective because..."*`,
  8: `**Diplomatic Language Strategies**\n\n**Softening disagreement:**\n- *"I see where you're coming from; however, I'm not entirely convinced that..."*\n- *"That's a valid point, though one might question whether..."*\n- *"With respect, I'd like to raise a counter-consideration here."*\n\n**Polite refusal:**\n- *"I'm afraid that wouldn't be feasible at this stage."*\n- *"While I appreciate the proposal, I have some reservations about..."*\n\n**Avoiding absolutes:**\n- ✗ "That's wrong." → ✓ "That may not be entirely accurate."*\n- ✗ "This will fail." → ✓ "There may be some challenges to consider."*\n\n**Concession moves:**\n- *"I take your point and I'd concede that... nonetheless..."*\n- *"That said, it's also worth noting that..."*\n\n**Recovering from misunderstanding:**\n- *"I may not have expressed that as clearly as I intended. What I mean is..."*`,
  9: `**Academic Presentation Structure (C1)**\n\n**Opening:**\n- *"Good [morning/afternoon]. I'd like to begin by contextualising today's topic..."*\n- *"Today's presentation addresses [X]. I'll be covering three key areas: [A, B, C]."*\n\n**Signposting throughout:**\n- Moving on: *"Having established X, I'd now like to turn to Y."*\n- Elaborating: *"To expand on this point..."*\n- Concluding a section: *"In summary, the evidence suggests..."*\n\n**Handling slides/data:**\n- *"As this slide illustrates... / What this figure demonstrates is... / If I could draw your attention to..."*\n\n**Q&A management:**\n- Repeating the question: *"So if I understand correctly, you're asking about..."*\n- Buying time: *"That's a perceptive question. Let me consider that for a moment."*\n- Referring: *"That's outside the scope of today's presentation, but I'd recommend..."*\n\n**Closing:**\n- *"To bring everything together... / In conclusion, what emerges from this analysis is..."*`,
  10: `**Professional Interview Language at C1**\n\n**Structuring answers (STAR method):**\n- **Situation:** *"In my previous role at X, I was tasked with..."*\n- **Task:** *"The challenge was to..."*\n- **Action:** *"I approached this by first..., then subsequently..."*\n- **Result:** *"As a direct consequence, we achieved..."*\n\n**Promoting yourself professionally:**\n- *"One of my key strengths is my ability to..."*\n- *"I bring [X] years of experience in... which has equipped me with..."*\n- *"I've developed a reputation for..."*\n\n**Showing analytical depth:**\n- *"My approach to problem-solving typically involves first mapping the issue, then identifying the contributing factors, before considering a range of potential responses."*\n\n**Asking intelligent questions:**\n- *"Could you tell me more about how success would be measured in this role?"*\n- *"What are the most significant challenges the team is currently navigating?"*`,
  11: `**Discussing Abstract Concepts at C1**\n\n**Defining abstract terms:**\n- *"When we talk about [justice/freedom/consciousness], we must first distinguish between..."*\n- *"At its most fundamental, [concept] can be understood as..."*\n\n**Philosophical hedging:**\n- *"One philosophical position holds that... / An alternative view would be..."*\n- *"This raises the broader question of..."*\n\n**Nuanced position-taking:**\n- *"I find myself broadly sympathetic to X, while acknowledging the force of the objection from Y."*\n- *"The tension between X and Y cannot, I think, be fully resolved."*\n\n**Abstract vocabulary:**\n- *paradigm, epistemology, dialectic, empirical, normative, subjective, axiom, premise, inference*\n\n**Expressing intellectual humility:**\n- *"I confess I don't have a fully satisfying answer to that."*\n- *"This is a question that continues to divide scholars."*`,
  12: `**Engaging with Social Issues at C1**\n\n**Framing issues objectively:**\n- *"The discourse surrounding [issue] has become increasingly polarised, with proponents of X arguing... while critics contend..."*\n\n**Presenting multiple perspectives:**\n- *"From a progressive standpoint... / Conversely, a more conservative view would hold that..."*\n- *"There are those who argue... while others maintain..."*\n\n**Acknowledging complexity:**\n- *"This is not a straightforward issue — it intersects with questions of [race/class/gender/policy] in complex ways."*\n\n**Avoiding bias:**\n- Balanced: use "proponents claim" / "critics contend" / "evidence suggests"\n- Avoid emotive language: not "fanatics" but "advocates"\n\n**Key topic vocabulary:**\n- *inequality, systemic, marginalised, institutional, discourse, intersectional, normative, stigma, disenfranchised*`,
  13: `**Counterfactual and Hypothetical Discussion**\n\n**Grammar review — mixed conditionals:**\n- Type 3 (past unreal): "If they had acted sooner, the crisis would have been averted."\n- Mixed (past → present): "If the policy had been reformed decades ago, we would be in a very different position now."\n- Mixed (present → past): "If the team were more cohesive, they would have handled that situation better."\n\n**Expressing degrees of likelihood:**\n- *Very unlikely:* "It is conceivable that, in a very different set of circumstances..."\n- *Possible:* "Had certain conditions been met, it is plausible that..."\n- *Probable:* "Under marginally different conditions, it seems quite likely that..."\n\n**Speculation markers:**\n- *"Hypothetically speaking... / For the sake of argument... / If we were to posit that..."*\n\n**Historical counterfactuals:**\n- *"Had the treaty been signed in 1914, the trajectory of the 20th century might have been profoundly different."*`,
  14: `**Rhetoric and Persuasion at C1**\n\n**The classical rhetorical triangle:**\n- **Ethos** (credibility): "As someone with 15 years' experience in this field..."\n- **Pathos** (emotion): "Consider what this means for those most vulnerable..."\n- **Logos** (logic): "The statistics are unambiguous: [data]"\n\n**Rhetorical devices:**\n- *Anaphora* (repetition for effect): "We will not stop. We will not give up. We will not be silenced."\n- *Rhetorical question:* "How long can we afford to ignore this?"\n- *Tricolon:* "It requires vision, commitment, and execution."\n- *Chiasmus:* "Ask not what your country can do for you — ask what you can do for your country."\n\n**Persuasive discourse markers:**\n- *"The evidence is overwhelming... / No reasonable person would dispute... / The data speaks for itself..."*\n- *"What is beyond dispute is... / It is axiomatic that..."*`,
  15: `**Critical Evaluation at C1**\n\n**Evaluating arguments:**\n- *"The argument rests on the assumption that... which may not hold in all contexts."*\n- *"While the conclusion follows logically from the premises, the premises themselves are contestable."*\n\n**Assessing evidence quality:**\n- *"The sample size raises questions about generalisability."*\n- *"The correlation observed does not necessarily imply causation."*\n- *"This finding has been replicated across multiple studies, lending it considerable credibility."*\n\n**Identifying logical weaknesses:**\n- *Overgeneralisation:* "The claim that all X implies Y is an overgeneralisation."\n- *Circular reasoning:* "This argument is circular in that it assumes what it sets out to prove."\n- *False cause:* "The post hoc ergo propter hoc fallacy is evident here."\n\n**Balanced evaluation:**\n- *"The strength of this analysis lies in... however, a significant limitation is..."*\n- *"On balance, the evidence more strongly supports X than Y, though this conclusion must be treated with appropriate caution."*`,
  16: `**English Humour & Irony at C1**\n\n**Types of British English humour:**\n- **Understatement:** Describing something serious/dramatic as minor: "It was a bit of a setback" (= it was catastrophic)\n- **Irony:** Saying the opposite of what you mean: "Oh brilliant — another meeting." (= this is terrible)\n- **Deadpan:** Delivering humour with a completely straight face\n- **Self-deprecation:** Mocking oneself: "As someone comprehensively unqualified to comment on this..."\n\n**Recognising irony markers:**\n- Exaggerated understatement: "not entirely ideal", "somewhat suboptimal", "marginally problematic"\n- Tone (falling/flat intonation on enthusiastic words)\n- Context incongruity\n\n**Safe irony starters:**\n- *"One might charitably describe it as..."*\n- *"It was, shall we say,..."*\n- *"In a development that surprised absolutely no one..."*\n\n**Cultural caution:** British irony and understatement can confuse non-native speakers. Always check context.`,
  17: `**Media & Technology Vocabulary at C1**\n\n**Digital society terms:**\n- *algorithm, data sovereignty, surveillance capitalism, platform monopoly, digital divide*\n- *misinformation, disinformation, deepfake, filter bubble, echo chamber*\n\n**Media literacy vocabulary:**\n- *editorial bias, media framing, agenda-setting, narrative control*\n- *primary vs. secondary source, verification, fact-checking, source attribution*\n\n**Critical analysis structures:**\n- *"The way this story was framed by [outlet] reflects..."*\n- *"What is noticeably absent from this coverage is..."*\n- *"The use of [provocative language/selective statistics] serves to..."*\n\n**Technology discourse:**\n- *"AI poses existential, ethical, and economic challenges that demand proactive governance."*\n- *"The concentration of data in the hands of a few corporations raises significant questions of accountability."*\n\n**Balanced stance:**\n- Technological optimism vs. digital scepticism: present both, evaluate with evidence`,
  18: `**Ethics & Philosophy Discourse at C1**\n\n**Major ethical frameworks:**\n- **Consequentialism (Utilitarianism):** *"The morally right action is that which maximises utility — the greatest good for the greatest number."*\n- **Deontology (Kant):** *"Certain actions are intrinsically right or wrong, regardless of their consequences."*\n- **Virtue Ethics (Aristotle):** *"We should ask not 'What should I do?' but 'What kind of person should I be?'"*\n\n**Ethical discourse markers:**\n- *"From a deontological perspective... / Consequentialist reasoning would suggest..."*\n- *"The moral weight of this decision hinges on..."*\n\n**Key philosophy vocabulary:**\n- *autonomy, moral agency, categorical imperative, teleology, axiology, epistemology, ontology*\n\n**Constructing ethical arguments:**\n1. Identify the ethical question clearly\n2. Apply a framework\n3. Acknowledge counter-arguments\n4. Conclude with a qualified position`,
  19: `**Environmental & Climate Discourse at C1**\n\n**Key terminology:**\n- *carbon footprint, net zero, carbon sequestration, biodiversity loss, ecological overshoot*\n- *climate justice, just transition, mitigation vs. adaptation, planetary boundaries*\n- *renewable transition, stranded assets, green economy, circular economy*\n\n**Discussing policy:**\n- *"Carbon pricing mechanisms, whether through taxation or cap-and-trade systems, aim to..."*\n- *"The tension between economic development and environmental protection is particularly acute in..."*\n\n**Using data in environmental discourse:**\n- *"Current projections from the IPCC indicate that, without significant intervention, temperatures are likely to rise by..."*\n\n**Balanced environmental argument:**\n- Acknowledge urgency without alarmism\n- Present economic and social co-benefits\n- Distinguish mitigation (preventing) from adaptation (coping)\n- Discuss intergenerational equity and climate justice`,
  20: `**C1 Speaking Assessment: Full Integration**\n\nAt CEFR C1, you can:\n\n✓ **Fluency:** Speak at length with little hesitation; repair smoothly when needed\n✓ **Range:** Use a wide variety of sophisticated vocabulary, idioms, and complex structures flexibly\n✓ **Accuracy:** Maintain consistent grammatical accuracy; minor errors do not impede communication\n✓ **Coherence:** Structure extended discourse logically with appropriate discourse markers\n✓ **Interaction:** Initiate, sustain, and close conversations; manage turn-taking and interruption diplomatically\n✓ **Register:** Adapt between formal, semi-formal, and informal registers appropriately\n\n**C1 Speaking descriptors (Cambridge):**\n- "Can engage in extended discourse on complex topics"\n- "Can use language flexibly and effectively for social, academic, and professional purposes"\n- "Can produce clear, well-structured, detailed text on complex subjects"\n\n**Self-assessment:** Record yourself speaking for 5 minutes on an unfamiliar topic. Evaluate: fluency, accuracy, discourse management, range, and pragmatic appropriateness.`
};

// Build full topic list
const allTopics = [...SPEAKING_TOPICS];
for (const t of MORE_TOPICS) {
  if (!allTopics.find(x => x.n === t.n)) {
    allTopics.push({ ...t, theory: MORE_THEORIES[t.n] || `Advanced speaking practice for: ${t.title}` });
  }
}

const SPEAKING_QUIZ = [
  { q: 'Which phrase best demonstrates polite disagreement at C1 level?', opts: ["You're completely wrong.", "I take your point; however, I'm not entirely persuaded by that argument.", "Whatever."], ans: "I take your point; however, I'm not entirely persuaded by that argument.", exp: 'C1 polite disagreement acknowledges the other view before presenting an alternative: "I take your point; however..."' },
  { q: 'What does "to play devil\'s advocate" mean?', opts: ['To cheat or deceive in a discussion', 'To argue a position one may not personally hold, in order to stimulate debate', 'To refuse to participate in discussion'], ans: 'To argue a position one may not personally hold, in order to stimulate debate', exp: '"Playing devil\'s advocate" means deliberately taking an opposing view to explore all angles of an argument.' },
  { q: 'Which sentence uses appropriate academic hedging?', opts: ['The results prove the hypothesis.', 'The results may suggest tentative support for the hypothesis.', 'We have no idea about the results.'], ans: 'The results may suggest tentative support for the hypothesis.', exp: 'Hedging ("may suggest") avoids overconfident claims — essential in academic speaking and writing.' },
  { q: '"To broaden one\'s horizons" most accurately means:', opts: ['To buy a telescope', 'To expand the scope of one\'s knowledge and experience', 'To travel cheaply'], ans: 'To expand the scope of one\'s knowledge and experience', exp: 'This idiom means to widen one\'s intellectual or experiential world beyond familiar boundaries.' },
  { q: 'Which is an example of understatement (British English)?', opts: ['"This is catastrophically terrible."', '"It was not entirely ideal circumstances, I admit."', '"This is absolutely amazing!"'], ans: '"It was not entirely ideal circumstances, I admit."', exp: 'Understatement describes something serious in deliberately mild terms. A hallmark of British discourse style.' },
  { q: 'Which phrase is used to politely interrupt in a discussion?', opts: ["Excuse me, I'm talking!", "If I could just interject here for a moment...", "Stop speaking now."], ans: "If I could just interject here for a moment...", exp: 'Polite interruption phrases like "if I could just interject" allow you to speak without seeming rude or aggressive.' },
  { q: 'What rhetorical device is used in: "We will not stop. We will not give up. We will not surrender."?', opts: ['Chiasmus', 'Anaphora', 'Synecdoche'], ans: 'Anaphora', exp: 'Anaphora is the repetition of a word or phrase at the beginning of successive clauses for rhetorical effect.' },
  { q: 'Which discourse marker signals a concession followed by a counter-point?', opts: ['Furthermore', 'Nevertheless', 'Similarly'], ans: 'Nevertheless', exp: '"Nevertheless" (= however/nonetheless) signals that despite what has just been said, an opposing point follows.' },
  { q: 'In the PEEL structure for argumentation, what does "E" stand for?', opts: ['Emphasis', 'Elaboration and Evidence', 'Evaluation'], ans: 'Elaboration and Evidence', exp: 'PEEL: Point → Elaboration (develop) → Evidence (examples/data) → Link (connect back to topic).' },
  { q: 'What does "by the same token" mean?', opts: ['Using the same amount of money', 'For the same reason; in the same way', 'At the same time'], ans: 'For the same reason; in the same way', exp: '"By the same token" is a discourse connector meaning "for the same reason" or "similarly". C1 idiom.' },
  { q: 'Which structure is a tricolon used in rhetoric?', opts: ['"He came."', '"He came, saw, and conquered."', '"He came and he saw."'], ans: '"He came, saw, and conquered."', exp: 'A tricolon is a group of three parallel elements for rhetorical effect. "Veni, vidi, vici" — "He came, saw, conquered."' },
  { q: 'Which shows the best coping strategy when you forget a word?', opts: ["Um... I forget the word.", "It's the kind of device used to measure... um... atmospheric pressure — a barometer.", "I do not know the vocabulary."], ans: "It's the kind of device used to measure... um... atmospheric pressure — a barometer.", exp: 'Circumlocution (describing the thing without the word) is a key C1 coping strategy that maintains fluency.' },
  { q: '"The more rigorous the evidence, ___ compelling the argument."', opts: ['most', 'the most', 'the more'], ans: 'the more', exp: 'Proportional comparative structure: "The more X, the more Y." Both clauses use comparative forms.' },
  { q: 'What is ethos in classical rhetoric?', opts: ['Emotional appeal to the audience', 'Logical argument using facts and data', 'The speaker\'s credibility and moral character'], ans: 'The speaker\'s credibility and moral character', exp: 'Ethos establishes the speaker\'s credibility. Logos = logic. Pathos = emotional appeal.' },
  { q: 'Which phrase most naturally introduces a summary in spoken English at C1?', opts: ["OK so to wrap things up...", "To bring the key threads of the discussion together...", "Ending."], ans: "To bring the key threads of the discussion together...", exp: 'Formal summaries in spoken C1 use sophisticated signposting: "to bring X together", "in synthesis", "to recapitulate".' },
  { q: 'What does "notwithstanding" mean as a discourse connector?', opts: ['Because of', 'Despite; in spite of', 'As a result'], ans: 'Despite; in spite of', exp: '"Notwithstanding X, Y occurred" = "Despite X, Y occurred." A formal concessive connector at C1/C2 level.' },
  { q: 'Which sentence correctly uses a reporting verb with precision?', opts: ['"She said the results were fraudulent." (certain accusation)', '"She suggested that the results might warrant further scrutiny." (careful, qualified)', '"She said maybe possibly the results."'], ans: '"She suggested that the results might warrant further scrutiny." (careful, qualified)', exp: '"Suggested" + hedged language creates a precisely qualified claim — avoiding both overstatement and vagueness.' },
  { q: 'What is the function of "that said" in a discussion?', opts: ['To introduce a cause', 'To acknowledge the previous point before presenting a contrast or qualification', 'To agree completely'], ans: 'To acknowledge the previous point before presenting a contrast or qualification', exp: '"That said" (= nonetheless/however) concedes the previous point while pivoting to a counter-argument.' },
  { q: 'Which is an appropriate turn-closing signal in a formal discussion?', opts: ['"OK I\'m done."', '"So, to summarise my position: [summary]..."', '"Stop."'], ans: '"So, to summarise my position: [summary]..."', exp: 'Turn-ending cues like "to summarise my position" signal you\'ve finished your contribution clearly.' },
  { q: 'What characterises C1 discourse management?', opts: ['Frequent pauses and incomplete sentences', 'Smooth topic transitions, strategic pauses, sophisticated repair, and flexible turn-taking', 'Rapid speech with no organisation'], ans: 'Smooth topic transitions, strategic pauses, sophisticated repair, and flexible turn-taking', exp: 'C1 discourse management involves smooth signposting, natural self-correction, and confident turn-taking in group discussion.' },
];

function buildSpeakingLesson(topicData) {
  const { n, title, obj, theory } = topicData;
  const nextPath = n < 20 ? `/modul/english/advanced/speaking/lesson-${n+1}` : null;
  const nextCode = nextPath ? JSON.stringify(nextPath) : 'null';
  const theoryLines = theory.split('\n');
  const theoryCode = theoryLines.map(l => JSON.stringify(l)).join(',\n    ');
  const quizCode = SPEAKING_QUIZ.map((q, i) =>
    `  { q: ${JSON.stringify(q.q)}, opts: [${q.opts.map(o => JSON.stringify(o)).join(', ')}], ans: ${JSON.stringify(q.ans)}, exp: ${JSON.stringify(q.exp)} }`
  ).join(',\n');

  return `import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ChevronLeft, BookOpen, Volume2, Mic } from 'lucide-react';

const THEORY_LINES = [
    ${theoryCode}
];

const QUIZ: { q: string; opts: string[]; ans: string; exp: string }[] = [
${quizCode}
];

const ACCENT = '${ACCENT}';
const NEXT_PATH = ${nextCode};
const STORAGE_KEY = '${STORAGE_KEY}';
const LESSON_NUM = ${n};

function getCompleted(): number[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
}
function markComplete() {
  const d = getCompleted();
  if (!d.includes(LESSON_NUM)) localStorage.setItem(STORAGE_KEY, JSON.stringify([...d, LESSON_NUM]));
}

const playTTS = (text: string) => {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'en-US'; u.rate = 0.85;
  window.speechSynthesis.speak(u);
};

export default function AdvancedSpeakingLesson${n}() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'materi' | 'kuis'>('materi');
  const [done, setDone] = useState(() => getCompleted().includes(LESSON_NUM));
  const [modal, setModal] = useState(false);
  const [qi, setQi] = useState(0);
  const [sel, setSel] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [fin, setFin] = useState(false);
  const cur = QUIZ[qi];

  const pickAns = (o: string) => {
    if (sel) return; setSel(o);
    if (o === cur.ans) setScore(s => s + 1);
  };
  const next = () => {
    if (qi + 1 < QUIZ.length) { setQi(q => q + 1); setSel(null); }
    else { setFin(true); markComplete(); setDone(true); setModal(true); }
  };
  const finish = () => { markComplete(); setDone(true); setModal(true); };

  return (
    <>
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(10px)' }} onClick={() => setModal(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="text-5xl mb-3">{fin ? (score >= 16 ? '🏆' : '📚') : '✅'}</div>
            <h2 className="text-2xl font-black text-slate-800 mb-2">Lesson Selesai!</h2>
            {fin && <p className="text-2xl font-black mb-2" style={{ color: ACCENT }}>{score}/{QUIZ.length}</p>}
            <p className="text-slate-500 text-sm mb-6">Advanced Speaking — Lesson ${n}: ${title}</p>
            <div className="space-y-3">
              {NEXT_PATH && <button onClick={() => { setModal(false); navigate(NEXT_PATH); }} className="w-full py-3 rounded-xl font-bold text-white" style={{ background: ACCENT }}>Pelajaran Berikutnya →</button>}
              <button onClick={() => { setModal(false); navigate('/modul/english/advanced/speaking'); }} className="w-full py-3 rounded-xl font-bold text-slate-600 bg-slate-100">Kembali ke Daftar</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col h-[100dvh] md:h-full bg-slate-50">
        <header className="bg-white/95 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100 shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-slate-100"><ChevronLeft className="w-6 h-6 text-slate-600" /></button>
            <div className="text-center">
              <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: ACCENT }}>C1/C2 Speaking — Lesson ${n}</p>
              <h1 className="text-sm font-bold text-slate-800 line-clamp-1">${title}</h1>
            </div>
            {NEXT_PATH ? <button onClick={() => navigate(NEXT_PATH)} className="px-3 h-9 rounded-full text-xs font-bold" style={{ color: ACCENT, background: ACCENT + '18' }}>Next ›</button> : <div className="w-14" />}
          </div>
        </header>

        <div className="flex bg-white border-b border-slate-100 p-2 gap-2 sticky top-[65px] z-10">
          {([['materi', '📖 Materi & Ekspresi'], ['kuis', '🧠 Kuis 20 Soal']] as const).map(([t, label]) => (
            <button key={t} onClick={() => setTab(t as 'materi' | 'kuis')} className={'flex-1 py-3 text-sm font-bold rounded-xl transition-all ' + (tab === t ? 'text-white shadow-md' : 'text-slate-500')} style={tab === t ? { background: ACCENT } : {}}>{label}</button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-8 pb-28 space-y-5">
            {tab === 'materi' && (
              <div className="space-y-5">
                <div className="rounded-3xl p-6 text-white relative overflow-hidden" style={{ background: \`linear-gradient(135deg, \${ACCENT}, \${ACCENT}BB)\` }}>
                  <Mic className="absolute top-4 right-4 w-20 h-20 opacity-10" />
                  <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full">🎤 C1/C2 Advanced Speaking</span>
                  <h2 className="text-xl font-black mt-3 mb-1">${title}</h2>
                  <p className="text-sm text-white/85 leading-relaxed">${obj}</p>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
                  <p className="text-xs font-extrabold uppercase tracking-widest mb-4" style={{ color: ACCENT }}>📋 TEORI & EKSPRESI KUNCI</p>
                  <div className="space-y-3">
                    {THEORY_LINES.map((line, i) => {
                      if (!line.trim()) return null;
                      const clean = line.replace(/\\*\\*(.*?)\\*\\*/g, '$1').replace(/\\*(.*?)\\*/g, '$1');
                      if (clean.startsWith('**') || line.startsWith('**')) return <p key={i} className="text-sm font-extrabold text-slate-800 mt-4 mb-1">{clean.replace(/\\*\\*/g,'')}</p>;
                      if (clean.startsWith('✓') || clean.startsWith('✗')) {
                        const good = clean.startsWith('✓');
                        return <div key={i} className={\`text-sm px-3 py-2 rounded-lg font-medium \${good ? 'bg-green-50 text-green-800 border-l-4 border-green-500' : 'bg-red-50 text-red-800 border-l-4 border-red-500'}\`}>{clean}</div>;
                      }
                      if (clean.startsWith('-') || clean.startsWith('•')) return <div key={i} className="text-sm text-slate-700 pl-4 py-0.5 border-l-2 border-slate-200 italic">{clean.replace(/^[-•]\\s*/,'')}</div>;
                      if (clean.startsWith('*') && !clean.startsWith('**')) {
                        const expr = clean.replace(/^\\*/,'').replace(/\\*$/,'');
                        return (
                          <div key={i} className="flex items-center gap-2 bg-slate-50 rounded-xl px-4 py-2 border border-slate-100">
                            <p className="flex-1 text-sm text-slate-700 font-medium italic">{expr}</p>
                            <button onClick={() => playTTS(expr)} className="text-slate-400 hover:text-slate-600 shrink-0"><Volume2 size={14} /></button>
                          </div>
                        );
                      }
                      return <p key={i} className="text-sm text-slate-700 leading-relaxed">{clean}</p>;
                    })}
                  </div>
                </div>

                <div className="rounded-2xl p-4 border" style={{ background: ACCENT + '08', borderColor: ACCENT + '25' }}>
                  <p className="text-sm font-bold mb-1" style={{ color: ACCENT }}>🎙️ Practice Task</p>
                  <p className="text-sm" style={{ color: ACCENT + 'BB' }}>Record yourself speaking about "${title}" for 2-3 minutes. Listen back and evaluate: fluency, vocabulary range, discourse organisation, and appropriateness of hedging.</p>
                </div>
              </div>
            )}

            {tab === 'kuis' && (
              <div>
                {!fin ? (
                  <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Soal {qi + 1}/{QUIZ.length}</span>
                      <span className="text-xs font-bold px-3 py-1 rounded-full text-white" style={{ background: ACCENT }}>Skor: {score}</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5">
                      <div className="h-1.5 rounded-full transition-all" style={{ width: \`\${(qi / QUIZ.length) * 100}%\`, background: ACCENT }} />
                    </div>
                    <p className="text-base font-bold text-slate-800 leading-relaxed pt-2">{cur.q}</p>
                    <div className="space-y-3">
                      {cur.opts.map(o => {
                        let cls = 'bg-slate-50 border-slate-200 text-slate-700';
                        if (sel) {
                          if (o === cur.ans) cls = 'bg-green-50 border-green-500 text-green-800 font-bold';
                          else if (o === sel) cls = 'bg-red-50 border-red-400 text-red-700';
                          else cls = 'opacity-50 border-slate-100';
                        }
                        return <button key={o} onClick={() => pickAns(o)} className={\`w-full text-left px-4 py-3 rounded-xl border-2 text-sm transition-all \${cls}\`}>{o}</button>;
                      })}
                    </div>
                    {sel && (
                      <>
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                          <p className="text-xs font-bold text-blue-600 mb-1">💡 Penjelasan</p>
                          <p className="text-sm text-blue-700">{cur.exp}</p>
                        </div>
                        <button onClick={next} className="w-full py-3 rounded-xl font-bold text-white" style={{ background: ACCENT }}>{qi + 1 < QUIZ.length ? 'Soal Berikutnya →' : 'Selesai ✓'}</button>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 text-center space-y-4">
                    <div className="text-5xl">{score >= 16 ? '🏆' : score >= 12 ? '🎯' : '📚'}</div>
                    <h3 className="text-2xl font-black text-slate-800">Kuis Selesai!</h3>
                    <p className="text-4xl font-black" style={{ color: ACCENT }}>{score}/{QUIZ.length}</p>
                    <p className="text-slate-500">{score >= 16 ? 'Excellent! C1 Speaking mastery.' : 'Review materi dan coba lagi.'}</p>
                    {NEXT_PATH && <button onClick={() => navigate(NEXT_PATH)} className="w-full py-3 rounded-xl font-bold text-white" style={{ background: ACCENT }}>Pelajaran Berikutnya →</button>}
                    <button onClick={() => navigate('/modul/english/advanced/speaking')} className="w-full py-3 rounded-xl font-bold text-slate-600 bg-slate-100">Kembali ke Daftar</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="sticky bottom-0 bg-white/90 backdrop-blur-xl border-t border-slate-200 p-4">
          <button onClick={done ? () => navigate(-1) : finish} className="w-full py-4 rounded-2xl font-bold text-white flex items-center justify-center gap-2 shadow-lg" style={{ background: done ? 'linear-gradient(135deg,#10B981,#059669)' : \`linear-gradient(135deg,\${ACCENT},\${ACCENT}CC)\` }}>
            <CheckCircle2 className="w-5 h-5" />
            {done ? 'Selesai ✓ — Kembali' : 'Tandai Selesai'}
          </button>
        </div>
      </div>
    </>
  );
}
`;
}

// Write all speaking lessons
for (const topic of allTopics) {
  const content = buildSpeakingLesson(topic);
  const outPath = path.join(BASE, `Lesson${topic.n}.tsx`);
  fs.writeFileSync(outPath, content, 'utf8');
  console.log(`✅ speaking/Lesson${topic.n} — ${topic.title}`);
}
console.log('\n🎤 All 20 Advanced Speaking lessons enhanced!');
