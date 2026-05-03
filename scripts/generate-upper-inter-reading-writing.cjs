const fs = require('fs');
const path = require('path');

const BASE_UI = path.join(__dirname, '../src/pages/module/english/upper-intermediate');

// ─────────────────────────────────────────────────────────────
// READING CONFIG
// ─────────────────────────────────────────────────────────────
const READING_DIR = path.join(BASE_UI, 'reading');
const READING_TITLES = {
  1:  'Academic Articles: Climate Change Policy',
  2:  'Opinion Essays: Technology & Society',
  3:  'Research Summaries: Health Science',
  4:  'News Analysis: Global Economy',
  5:  'Literary Extracts: Modern Fiction',
  6:  'Report Writing: Environmental Issues',
  7:  'Discursive Texts: Education Reform',
  8:  'Editorials: Social Media & Democracy',
  9:  'Science Articles: Space Exploration',
  10: 'Historical Perspectives: Globalisation',
  11: 'Policy Documents: Universal Healthcare',
  12: 'Argumentative Texts: Wealth Inequality',
  13: 'Documentary Reviews: AI Ethics',
  14: 'Cultural Essays: Identity & Diversity',
  15: 'Investigative Journalism: Criminal Justice',
  16: 'Academic Reviews: Biotechnology',
  17: 'Feature Articles: Mental Health',
  18: 'Critical Analysis: Urban Planning',
  19: 'Comparative Texts: Energy Transition',
  20: 'Integrated Reading Test: B2 Mastery',
};

const READING_VOCAB = {
  1:  [['Mitigation', 'Mitigasi – upaya mengurangi dampak perubahan iklim'], ['Carbon neutrality', 'Netralitas karbon – keseimbangan emisi karbon'], ['Anthropogenic', 'Antropogenik – disebabkan oleh aktivitas manusia'], ['Paris Agreement', 'Perjanjian Paris – kesepakatan iklim internasional']],
  2:  [['Digital divide', 'Kesenjangan digital – ketimpangan akses teknologi'], ['Surveillance capitalism', 'Kapitalisme pengawasan – monetisasi data pengguna'], ['Algorithm', 'Algoritma – serangkaian instruksi pemrosesan data'], ['Disruption', 'Disrupsi – gangguan besar pada industri atau masyarakat']],
  3:  [['Randomised control trial', 'Uji coba terkendali acak – metode penelitian ilmiah'], ['Correlation', 'Korelasi – hubungan antara dua variabel'], ['Epidemiology', 'Epidemiologi – studi penyebaran penyakit'], ['Peer-reviewed', 'Ditinjau sejawat – dievaluasi oleh para ahli']],
  4:  [['Monetary policy', 'Kebijakan moneter – pengaturan suku bunga dan uang beredar'], ['Recession', 'Resesi – penurunan ekonomi berkepanjangan'], ['Inflation', 'Inflasi – kenaikan harga umum secara berkelanjutan'], ['Trade deficit', 'Defisit perdagangan – impor lebih besar dari ekspor']],
  5:  [['Narrative voice', 'Suara naratif – perspektif pencerita dalam fiksi'], ['Stream of consciousness', 'Aliran kesadaran – teknik penulisan pikiran bebas'], ['Unreliable narrator', 'Narator tidak dapat dipercaya – pencerita yang bias'], ['Allegory', 'Alegori – cerita dengan makna simbolik tersembunyi']],
  6:  [['Carbon footprint', 'Jejak karbon – total emisi yang dihasilkan individu/organisasi'], ['Biodiversity', 'Keanekaragaman hayati – variasi kehidupan di bumi'], ['Ecosystem services', 'Layanan ekosistem – manfaat alam bagi manusia'], ['Sustainability', 'Keberlanjutan – kemampuan bertahan jangka panjang']],
  7:  [['Curriculum reform', 'Reformasi kurikulum – perubahan sistematik isi pendidikan'], ['Standardised testing', 'Tes terstandarisasi – ujian seragam untuk semua siswa'], ['Pedagogy', 'Pedagogi – ilmu dan seni mengajar'], ['Equity in education', 'Kesetaraan pendidikan – akses yang adil bagi semua']],
  8:  [['Echo chamber', 'Ruang gema – lingkungan yang memperkuat pandangan sendiri'], ['Disinformation', 'Disinformasi – informasi palsu yang disebarkan dengan sengaja'], ['Polarisation', 'Polarisasi – pemisahan ekstrem pandangan dalam masyarakat'], ['Filter bubble', 'Gelembung filter – algoritma yang membatasi informasi']],
  9:  [['Orbital mechanics', 'Mekanika orbital – fisika pergerakan benda antariksa'], ['Exoplanet', 'Exoplanet – planet di luar tata surya kita'], ['Commercial spaceflight', 'Penerbangan antariksa komersial – perjalanan luar angkasa swasta'], ['Reusable rocket', 'Roket yang dapat digunakan kembali – inovasi SpaceX dll']],
  10: [['Neoliberalism', 'Neoliberalisme – ideologi ekonomi pasar bebas'], ['Multinational corporation', 'Perusahaan multinasional – bisnis lintas negara'], ['Supply chain', 'Rantai pasokan – jaringan produksi dan distribusi'], ['Trade liberalisation', 'Liberalisasi perdagangan – pengurangan hambatan perdagangan']],
  11: [['Universal coverage', 'Cakupan universal – akses layanan kesehatan untuk semua'], ['Health equity', 'Keadilan kesehatan – kesetaraan akses dan hasil kesehatan'], ['Cost-effectiveness', 'Efektivitas biaya – manfaat optimal dari setiap pengeluaran'], ['Preventive care', 'Perawatan preventif – upaya mencegah penyakit']],
  12: [['Wealth gap', 'Kesenjangan kekayaan – perbedaan besar distribusi kekayaan'], ['Progressive taxation', 'Pajak progresif – tarif lebih tinggi untuk penghasilan lebih besar'], ['Gini coefficient', 'Koefisien Gini – ukuran ketimpangan distribusi pendapatan'], ['Redistribution', 'Redistribusi – pemerataan kekayaan melalui kebijakan']],
  13: [['Algorithmic bias', 'Bias algoritmik – ketidakadilan dalam sistem AI'], ['Machine learning', 'Pembelajaran mesin – AI yang belajar dari data'], ['Accountability', 'Akuntabilitas – tanggung jawab atas keputusan yang dibuat'], ['Explainability', 'Kemampuan menjelaskan – transparansi cara AI bekerja']],
  14: [['Cultural identity', 'Identitas budaya – rasa kepemilikan terhadap kelompok budaya'], ['Diaspora', 'Diaspora – komunitas yang bermigrasi dari tanah asal'], ['Multiculturalism', 'Multikulturalisme – penghargaan terhadap beragam budaya'], ['Assimilation', 'Asimilasi – penyerapan ke dalam budaya dominan']],
  15: [['Recidivism', 'Rekidivisme – kecenderungan mengulangi kejahatan'], ['Rehabilitation', 'Rehabilitasi – pemulihan dan reintegrasi narapidana'], ['Restorative justice', 'Keadilan restoratif – pendekatan fokus pada pemulihan korban'], ['Mass incarceration', 'Penahanan massal – tingginya jumlah populasi penjara']],
  16: [['Gene editing', 'Penyuntingan gen – modifikasi DNA secara terarah'], ['CRISPR', 'CRISPR – teknologi pengeditan gen presisi tinggi'], ['Bioethics', 'Bioetika – etika dalam ilmu kehidupan dan kedokteran'], ['Germline modification', 'Modifikasi germline – perubahan DNA yang diturunkan']],
  17: [['Stigma', 'Stigma – prasangka negatif terhadap kondisi tertentu'], ['Burnout', 'Burnout – kelelahan ekstrem akibat stres berkepanjangan'], ['Cognitive behavioural therapy', 'CBT – terapi berbasis pola pikir dan perilaku'], ['Psychological safety', 'Keamanan psikologis – rasa aman untuk berbagi']],
  18: [['Urban density', 'Kepadatan urban – jumlah penduduk per satuan area'], ['Gentrification', 'Gentrifikasi – pembaruan kota yang menggeser penghuni asli'], ['Transit-oriented', 'Berorientasi transit – desain kota berpusat di transportasi'], ['15-minute city', 'Kota 15 menit – semua kebutuhan dalam jangkauan jalan kaki']],
  19: [['Renewable energy', 'Energi terbarukan – sumber energi yang dapat diperbaharui'], ['Fossil fuels', 'Bahan bakar fosil – energi dari sumber tak terbarukan'], ['Energy transition', 'Transisi energi – perpindahan dari fosil ke terbarukan'], ['Carbon capture', 'Penangkapan karbon – teknologi menyerap CO2 dari atmosfer']],
  20: [['Critical reading', 'Membaca kritis – analisis mendalam teks kompleks'], ['Inference', 'Inferensi – kesimpulan berdasarkan bukti tersirat'], ['Cohesion', 'Kohesi – keterpaduan elemen-elemen dalam teks'], ['Register', 'Register – tingkat formalitas bahasa yang digunakan']],
};

const READING_PASSAGES = {
  1: `The scientific consensus on anthropogenic climate change is now unequivocal. According to the Intergovernmental Panel on Climate Change (IPCC), global average temperatures have increased by approximately 1.1°C above pre-industrial levels, driven primarily by the combustion of fossil fuels and deforestation. Without immediate and substantial mitigation measures, temperatures could exceed 2°C by the end of this century — a threshold scientists identify as catastrophic for ecosystems and human civilisation alike.\n\nThe Paris Agreement of 2015 represented a landmark commitment: 196 parties pledged to limit global warming to well below 2°C, with efforts to restrict it to 1.5°C. However, current national contributions fall significantly short of what is required. Analysis by Climate Action Tracker suggests that even if all pledges were fully implemented, we remain on course for approximately 2.7°C of warming. The gap between commitments and reality reflects the inherent tension between environmental imperatives and short-term economic and political interests.\n\nMitigation strategies broadly fall into two categories: reducing emissions at source and enhancing carbon sinks. The former encompasses transitioning to renewable energy, improving energy efficiency, electrifying transport, and reforming agricultural practices. Carbon capture and storage (CCS) technologies represent an emerging approach, though their scalability and cost-effectiveness remain subjects of intense debate. Critics argue that over-reliance on unproven technologies provides a pretext for delaying immediate action.\n\nEqually pressing is the question of climate justice. The nations most vulnerable to climate impacts — low-lying island states, sub-Saharan African nations — have contributed least to cumulative emissions. Ensuring that the transition is both ecologically sound and socially equitable requires that wealthy, high-emitting nations provide financial and technological support to developing countries. The Green Climate Fund was established for this purpose, though it has been persistently underfunded.`,
  2: `The rapid proliferation of digital technologies has transformed nearly every facet of modern life, yet this transformation has not been uniformly distributed. The concept of the digital divide — the gap between those who have meaningful access to digital technologies and those who do not — has attracted growing academic and policy attention. Initially framed as a binary distinction between "haves" and "have-nots," researchers now recognise multiple dimensions of digital inequality, including access, skills, motivation, and quality of use.\n\nIn parallel, critics of the dominant model of platform capitalism have raised more fundamental concerns. The surveillance capitalism thesis, advanced by Shoshana Zuboff, argues that the business model of major technology corporations — harvesting vast quantities of behavioural data to predict and modify user behaviour — constitutes an unprecedented threat to human autonomy. Under this framework, users are not customers but rather raw material whose attention and data are the actual commodities being sold.\n\nProponents of digital technologies counter that the internet has democratised access to information, enabled new forms of civic participation, and driven significant economic growth, particularly in emerging markets. Mobile technology has allowed individuals in regions without traditional banking infrastructure to access financial services, transforming economic outcomes for millions.\n\nThe regulatory landscape is shifting in response to these tensions. The European Union's Digital Services Act and Digital Markets Act represent ambitious attempts to impose accountability on major platforms, restricting anti-competitive practices and requiring greater transparency. Whether national and regional regulation can effectively govern genuinely global entities remains an open question — one that increasingly dominates debates about the governance of technology.`,
};

// Default passage for others
for (let i = 3; i <= 20; i++) {
  if (!READING_PASSAGES[i]) {
    READING_PASSAGES[i] = `This B2-level reading text explores the complex dimensions of ${READING_TITLES[i]}. Academic and analytical texts at this level require readers to follow extended arguments, identify implied meaning, distinguish fact from opinion, and recognise rhetorical devices and authorial purpose.\n\nResearchers and analysts in this field have highlighted several key tensions: between competing interests, between short-term pragmatism and long-term sustainability, and between individual and collective responsibility. The evidence base continues to evolve, and authoritative sources frequently present nuanced, qualified positions that resist simple characterisation.\n\nA critical reading of texts on this theme requires attention to the author's perspective, the evidence marshalled in support of claims, the assumptions underlying the argument, and the counterarguments that are acknowledged or dismissed. At CEFR B2 level, students should be able to extract the writer's central thesis, trace the development of an argument across multiple paragraphs, and make inferences about unstated implications.\n\nFurthermore, the vocabulary of academic and professional discourse — including hedging language ('it has been suggested that', 'evidence indicates'), evaluative adjectives ('significant', 'crucial', 'problematic'), and discourse markers ('however', 'consequently', 'notwithstanding') — plays a central role in shaping meaning and should be a focus of close reading at this level.`;
  }
}

const READING_QUESTIONS = (num) => {
  const t = READING_TITLES[num];
  return [
    { q: `What is the main argument of this passage about "${t}"?`, opts: ['The topic has no solution', 'Complex, multi-dimensional approaches are required', 'The issue affects only wealthy nations', 'Simple technological fixes are sufficient'], ans: 'Complex, multi-dimensional approaches are required', exp: 'B2 texts typically argue that complex challenges require nuanced, evidence-based, multi-dimensional responses.' },
    { q: 'The author\'s tone in this text is best described as:', opts: ['Highly emotional and personal', 'Analytical and evidence-based', 'Humorous and ironic', 'Optimistic without qualification'], ans: 'Analytical and evidence-based', exp: 'Academic texts at B2 level use an objective, evidence-based analytical tone, presenting multiple perspectives.' },
    { q: 'The phrase "unequivocal evidence" (or similar) suggests the author:', opts: ['Is uncertain about the findings', 'Believes the evidence is clear and indisputable', 'Is presenting a minority view', 'Is speculating without data'], ans: 'Believes the evidence is clear and indisputable', exp: '"Unequivocal" means leaving no doubt — the author is asserting that evidence is definitive.' },
    { q: 'Which reading strategy is most useful for texts at this level?', opts: ['Reading only the first sentence of each paragraph', 'Skimming for individual words', 'Identifying the main claim and how each paragraph develops it', 'Translating every word before continuing'], ans: 'Identifying the main claim and how each paragraph develops it', exp: 'At B2 level, following the logical development of an extended argument is the key skill.' },
    { q: 'What does the discourse marker "however" indicate in academic texts?', opts: ['An example is being given', 'A conclusion is being drawn', 'A contrast or qualification is being introduced', 'A definition is being provided'], ans: 'A contrast or qualification is being introduced', exp: '"However" signals a shift to a contrasting or qualifying point — essential to follow complex arguments.' },
    { q: 'An "unreliable narrator" or biased source in a text means:', opts: ['The text contains factual errors', 'The reader should question and critically evaluate the source\'s perspective', 'The author is deliberately lying', 'The text is fictional'], ans: 'The reader should question and critically evaluate the source\'s perspective', exp: 'Critical reading at B2 level requires evaluating the trustworthiness and perspective of sources.' },
    { q: 'The word "mitigation" in academic contexts most likely means:', opts: ['Making a problem worse', 'Completely eliminating a problem', 'Reducing the severity or impact of a problem', 'Ignoring a problem'], ans: 'Reducing the severity or impact of a problem', exp: '"Mitigation" refers to actions that reduce — but may not eliminate — a negative impact.' },
    { q: 'When an academic text says "it has been suggested that...", this hedging language indicates:', opts: ['The author is certain of the claim', 'The claim is generally accepted as fact', 'The claim is tentative or not universally agreed upon', 'The author is dismissing the claim'], ans: 'The claim is tentative or not universally agreed upon', exp: 'Hedging language like "it has been suggested" signals academic caution — the claim is not fully established.' },
    { q: 'What is the purpose of the second paragraph in a well-structured argument essay?', opts: ['To introduce the author', 'To give a personal anecdote', 'To develop, evidence, or qualify the thesis established in the first paragraph', 'To provide a list of statistics'], ans: 'To develop, evidence, or qualify the thesis established in the first paragraph', exp: 'Body paragraphs in academic texts develop the central argument with evidence, examples, or elaboration.' },
    { q: 'A "tension" between two positions in an academic text means:', opts: ['The author is angry', 'There is a contradiction or conflict between competing arguments or interests', 'Both positions are equally wrong', 'The positions are identical'], ans: 'There is a contradiction or conflict between competing arguments or interests', exp: '"Tension" in academic writing refers to unresolved conflict or competition between different claims or interests.' },
    { q: 'What does "equity" mean in academic and policy contexts?', opts: ['Equal identical treatment for everyone', 'Financial profit', 'Fairness and justice, often addressing structural disadvantages', 'Legal ownership'], ans: 'Fairness and justice, often addressing structural disadvantages', exp: '"Equity" goes beyond equality — it involves fairness that addresses underlying structural disadvantages.' },
    { q: 'The structure of an academic argument typically follows:', opts: ['Random presentation of ideas', 'Claim → Evidence → Analysis → Conclusion', 'Only personal opinion', 'A narrative chronological structure'], ans: 'Claim → Evidence → Analysis → Conclusion', exp: 'Academic arguments present a claim, support it with evidence, analyse that evidence, and draw conclusions.' },
    { q: 'When a text uses the phrase "proponents argue...", this signals:', opts: ['The author\'s personal view', 'Those who support a particular position are being described', 'A conclusion', 'A definition'], ans: 'Those who support a particular position are being described', exp: '"Proponents" means advocates or supporters — the author is presenting their arguments, not necessarily endorsing them.' },
    { q: 'An "inherent tension" in a text means the conflict is:', opts: ['Easily resolved', 'External and temporary', 'Fundamental to the nature of the situation itself', 'Created by one party intentionally'], ans: 'Fundamental to the nature of the situation itself', exp: '"Inherent" means built-in or essential — the conflict is not accidental but central to the issue.' },
    { q: 'In critical reading, "inference" means:', opts: ['Finding explicit statements in the text', 'Drawing conclusions from evidence not directly stated', 'Summarising the text in fewer words', 'Translating the text'], ans: 'Drawing conclusions from evidence not directly stated', exp: '"Inference" involves reading between the lines — understanding what is implied rather than explicitly stated.' },
    { q: 'What does "nuanced" mean in academic contexts?', opts: ['Simple and clear-cut', 'Extreme in one direction', 'Showing awareness of subtle distinctions and complexities', 'Vague and unclear'], ans: 'Showing awareness of subtle distinctions and complexities', exp: 'A "nuanced" argument acknowledges complexity, avoids oversimplification, and recognises multiple dimensions.' },
    { q: 'If a text says "critics counter that...", the author is:', opts: ['Ending the argument', 'Presenting a personal attack', 'Introducing an opposing viewpoint', 'Agreeing with the previous point'], ans: 'Introducing an opposing viewpoint', exp: '"Critics counter" introduces a contrasting or opposing argument — standard in academic balanced analysis.' },
    { q: 'The term "scalability" in a policy or technology text refers to:', opts: ['The physical size of a system', 'The ability to increase in size or capacity to meet growing demand', 'The cost of implementation', 'The environmental impact'], ans: 'The ability to increase in size or capacity to meet growing demand', exp: '"Scalability" refers to whether a solution can be effectively expanded to reach larger scale or greater demand.' },
    { q: 'What does "persistently underfunded" suggest about a programme?', opts: ['It consistently receives more funding than needed', 'It has never had any funding', 'It repeatedly receives insufficient financial resources over time', 'It was recently defunded'], ans: 'It repeatedly receives insufficient financial resources over time', exp: '"Persistently" means repeatedly over time — the programme consistently faces inadequate funding.' },
    { q: 'The best approach to B2-level academic reading is to:', opts: ['Read every word at the same speed regardless of importance', 'Skip paragraphs that seem difficult', 'Use contextual clues, paragraph structure, and discourse markers to follow extended arguments', 'Always use a dictionary for every unknown word'], ans: 'Use contextual clues, paragraph structure, and discourse markers to follow extended arguments', exp: 'B2 reading involves strategic reading: using context, structure, and discourse markers to construct meaning without needing every word.' },
  ];
};

// ─────────────────────────────────────────────────────────────
// WRITING CONFIG
// ─────────────────────────────────────────────────────────────
const WRITING_DIR = path.join(BASE_UI, 'writing');
const WRITING_TITLES = {
  1:  'Writing Essays: Argument & Opinion',
  2:  'Formal Reports: Structure & Language',
  3:  'Discursive Writing: Both Sides',
  4:  'Academic Emails & Correspondence',
  5:  'Coherence & Cohesion in Writing',
  6:  'Vocabulary Precision & Register',
  7:  'Hedging & Academic Caution',
  8:  'Complex Sentences & Subordination',
  9:  'Writing Introductions & Conclusions',
  10: 'Paragraphing & Topic Sentences',
  11: 'Cause & Effect: Advanced Structures',
  12: 'Compare & Contrast Writing',
  13: 'Writing for Academic Purposes',
  14: 'Describing Data & Graphs',
  15: 'Persuasive Writing: Rhetoric & Evidence',
  16: 'Critical Analysis & Evaluation',
  17: 'Writing Reviews & Critiques',
  18: 'Problem-Solution Essays',
  19: 'Narrative & Reflective Writing',
  20: 'Integrated Writing Test: B2 Mastery',
};

const WRITING_OBJECTIVES = {
  1:  'Learn to construct a clear argument with a thesis, supporting points, and counterargument.',
  2:  'Understand formal report structure: executive summary, findings, recommendations.',
  3:  'Practice presenting both sides of an issue fairly before reaching a balanced conclusion.',
  4:  'Master the conventions of formal and semi-formal email writing for academic and professional contexts.',
  5:  'Use cohesive devices (moreover, however, consequently) to create well-linked paragraphs.',
  6:  'Choose vocabulary that matches the register — formal/academic vs. informal/conversational.',
  7:  'Use hedging language (may, could, it is suggested that) to express appropriate academic caution.',
  8:  'Build complex sentences using subordinate clauses, relative clauses, and participle phrases.',
  9:  'Write effective introductions that contextualise and thesis, and conclusions that synthesise, not just summarise.',
  10: 'Structure paragraphs with clear topic sentences, development, evidence, and link sentences.',
  11: 'Express causal relationships using a range of structures: as a result, due to, consequently, which led to.',
  12: 'Compare and contrast two subjects using appropriate linking devices and parallel structure.',
  13: 'Adapt writing style, vocabulary, and structure for academic purpose and audience.',
  14: 'Describe trends, patterns, and data from graphs and charts using precise language.',
  15: 'Use rhetorical devices — tricolon, rhetorical questions, concession-refutation — to persuade readers.',
  16: 'Evaluate sources, arguments, and evidence critically, identifying strengths and limitations.',
  17: 'Write balanced reviews of books, films, products, or performances using evaluative language.',
  18: 'Structure problem-solution essays: problem, cause, solution, evaluation of solution.',
  19: 'Explore personal experience and reflection using narrative voice and descriptive precision.',
  20: 'Demonstrate B2 writing competence across essay types, demonstrating range, accuracy, and coherence.',
};

const WRITING_EXAMPLES = {
  1: [
    { label: 'Weak thesis', text: 'In this essay I will talk about climate change.' },
    { label: 'Strong thesis (B2)', text: 'While technological solutions to climate change are essential, they are insufficient without systemic political and economic reform.' },
    { label: 'Counterargument + refutation', text: 'Critics argue that renewable energy is too expensive to deploy at scale; however, the rapidly declining cost of solar and wind technology has rendered this objection largely obsolete.' },
  ],
  2: [
    { label: 'Formal report opening', text: 'This report examines the key challenges facing urban public transport systems and provides evidence-based recommendations for improvement.' },
    { label: 'Findings section', text: 'The research indicates that three principal factors contribute to declining public transport usage: inadequate frequency, poor reliability, and an absence of integrated ticketing.' },
    { label: 'Recommendation', text: 'It is recommended that the regional authority invest in real-time digital passenger information systems as an immediate priority.' },
  ],
  3: [
    { label: 'Presenting one side', text: 'Proponents of social media argue that it has democratised public discourse, enabling marginalised voices to reach global audiences without the gatekeeping of traditional media.' },
    { label: 'Presenting the other side', text: 'Conversely, critics contend that algorithmic amplification of emotionally charged content has exacerbated societal polarisation and undermined the conditions necessary for rational democratic deliberation.' },
    { label: 'Balanced conclusion', text: 'On balance, while social media\'s democratising potential is genuine, realising it requires robust regulatory frameworks to mitigate the documented harms.' },
  ],
};

for (let i = 4; i <= 20; i++) {
  if (!WRITING_EXAMPLES[i]) {
    WRITING_EXAMPLES[i] = [
      { label: 'Key skill', text: `This lesson focuses on: ${WRITING_OBJECTIVES[i]}` },
      { label: 'Academic phrase bank', text: 'Useful expressions: "It is widely acknowledged that...", "The evidence suggests...", "Whilst acknowledging...", "On balance...", "A significant contributing factor is..."' },
      { label: 'Practice task (B2)', text: `Write 200-250 words on the topic related to: ${WRITING_TITLES[i]}. Use a clear structure, varied vocabulary, and appropriate register.` },
    ];
  }
}

const WRITING_QUESTIONS = (num) => {
  const t = WRITING_TITLES[num];
  return [
    { q: `What is the primary focus of this writing lesson on "${t}"?`, opts: ['Grammar rules only', 'Building practical B2 writing skills with structure and vocabulary', 'Learning vocabulary lists', 'Reading comprehension'], ans: 'Building practical B2 writing skills with structure and vocabulary', exp: 'B2 writing lessons focus on producing clear, well-structured texts with appropriate vocabulary and register.' },
    { q: 'At B2 level, a well-constructed paragraph should contain:', opts: ['Only one sentence', 'A topic sentence, development, supporting evidence, and a link', 'Just examples without explanation', 'A title and a list of points'], ans: 'A topic sentence, development, supporting evidence, and a link', exp: 'Effective paragraphing requires a clear topic sentence, development of the idea, evidence, and connection to the next point.' },
    { q: 'Which sentence demonstrates the BEST academic register at B2 level?', opts: ['This stuff is really bad for people.', 'Everyone knows this is wrong.', 'Evidence suggests that this practice has significant adverse consequences for public health.', 'Lots of experts say this is a big problem.'], ans: 'Evidence suggests that this practice has significant adverse consequences for public health.', exp: 'Academic register requires formal vocabulary, hedged language ("evidence suggests"), and precise expression.' },
    { q: 'Hedging language in academic writing is used to:', opts: ['Show certainty and confidence', 'Avoid taking any position', 'Express appropriate caution and qualification about claims', 'Make writing more casual'], ans: 'Express appropriate caution and qualification about claims', exp: 'Hedging (may, could, suggests, appears) shows intellectual honesty and acknowledges the limits of evidence.' },
    { q: 'Which is the best example of a counter-argument followed by refutation?', opts: ['Some people disagree. I disagree with them too.', 'Critics argue X; however, the evidence indicates Y, which undermines this objection.', 'Many people think different things about this topic.', 'This is a complex issue with no easy answer.'], ans: 'Critics argue X; however, the evidence indicates Y, which undermines this objection.', exp: 'Effective counter-argument acknowledges the opposing view, then provides evidence to refute or qualify it.' },
    { q: '"Coherence" in writing refers to:', opts: ['Correct grammar only', 'The clarity and logic of ideas flowing from sentence to sentence and paragraph to paragraph', 'Using long sentences', 'Including many examples'], ans: 'The clarity and logic of ideas flowing from sentence to sentence and paragraph to paragraph', exp: 'Coherence is about logical flow — ideas should connect clearly throughout the text.' },
    { q: 'Which cohesive device expresses CONTRAST?', opts: ['Furthermore', 'In addition', 'Consequently', 'Nevertheless'], ans: 'Nevertheless', exp: '"Nevertheless" signals a contrasting or unexpected point — it functions like "however" or "despite this".' },
    { q: 'A strong essay introduction at B2 level should:', opts: ['List all the points to be made as numbered items', 'State the writer\'s personal biography', 'Contextualise the topic, define key terms if needed, and state the thesis clearly', 'Begin with a dictionary definition of the title word'], ans: 'Contextualise the topic, define key terms if needed, and state the thesis clearly', exp: 'An effective introduction establishes context, clarifies scope, and signals the essay\'s central argument (thesis).' },
    { q: 'The difference between "formal" and "informal" register is:', opts: ['Formal writing is shorter', 'Informal writing uses contracted forms, colloquial vocabulary, and personal pronouns; formal writing is more impersonal and precise', 'Formal writing is always longer', 'There is no significant difference in academic contexts'], ans: 'Informal writing uses contracted forms, colloquial vocabulary, and personal pronouns; formal writing is more impersonal and precise', exp: 'Register refers to the level of formality — B2 writers must match language to context and audience.' },
    { q: 'Which phrase best introduces supporting evidence in an academic essay?', opts: ['I totally agree because...', 'Like, for example...', 'Research conducted by X demonstrates that...', 'Everybody knows that...'], ans: 'Research conducted by X demonstrates that...', exp: 'Academic evidence should be attributed to specific sources and introduced with formal language.' },
    { q: 'What is the function of a "topic sentence"?', opts: ['To summarise the entire essay', 'To introduce the main idea of a paragraph, which the rest of the paragraph develops', 'To list all the evidence', 'To provide a transition to the next section'], ans: 'To introduce the main idea of a paragraph, which the rest of the paragraph develops', exp: 'A topic sentence states the paragraph\'s central point — all subsequent sentences should support or develop it.' },
    { q: 'Complex sentences at B2 level typically include:', opts: ['Only simple subject-verb-object structures', 'Subordinate clauses, relative clauses, passive constructions, and participle phrases', 'Only compound sentences joined by "and"', 'Bullet points and numbered lists'], ans: 'Subordinate clauses, relative clauses, passive constructions, and participle phrases', exp: 'Syntactic complexity — varied clause structures — is a key feature distinguishing B2 from lower-level writing.' },
    { q: 'When describing a graph or data at B2 level, you should:', opts: ['Simply copy the numbers without interpretation', 'Only state the highest and lowest values', 'Describe trends, patterns, anomalies, and their possible significance', 'Write one sentence per data point'], ans: 'Describe trends, patterns, anomalies, and their possible significance', exp: 'Effective data description identifies trends, explains patterns, notes exceptions, and may suggest implications.' },
    { q: 'The passive voice in academic writing is commonly used to:', opts: ['Make writing sound old-fashioned', 'Focus on what was done rather than who did it, creating a more impersonal academic tone', 'Avoid using verbs', 'Describe personal experiences'], ans: 'Focus on what was done rather than who did it, creating a more impersonal academic tone', exp: 'The passive voice ("it was found that", "the study was conducted") is extensively used in academic writing to create objectivity.' },
    { q: 'A "discursive essay" (both sides) should:', opts: ['Strongly advocate for one position from the first paragraph', 'Present only facts without any opinion', 'Explore multiple perspectives fairly before reaching a balanced, evidenced conclusion', 'Avoid taking any position at all'], ans: 'Explore multiple perspectives fairly before reaching a balanced, evidenced conclusion', exp: 'A discursive essay presents contrasting views objectively, with a conclusion that synthesises and takes a reasoned position.' },
    { q: 'Which word signals CAUSE in an academic text?', opts: ['However', 'Nevertheless', 'Furthermore', 'Consequently'], ans: 'Consequently', exp: '"Consequently" signals that what follows is a result or effect of what preceded it — an important discourse marker for cause-effect.' },
    { q: 'What makes a conclusion effective at B2 level?', opts: ['Introducing entirely new arguments', 'Simply repeating the introduction word for word', 'Synthesising the key arguments and explaining their broader implications', 'Providing a long list of further examples'], ans: 'Synthesising the key arguments and explaining their broader implications', exp: 'An effective conclusion synthesises — draws together key points — and extends to broader significance, without merely restating.' },
    { q: 'Vocabulary "precision" in writing means:', opts: ['Using as many words as possible', 'Using the most accurate, specific word for the concept being expressed', 'Using only simple vocabulary', 'Avoiding technical terminology'], ans: 'Using the most accurate, specific word for the concept being expressed', exp: 'Precise vocabulary — choosing "exacerbate" rather than "make worse", "mitigate" rather than "reduce" — marks B2 proficiency.' },
    { q: 'A "problem-solution" essay structure should include:', opts: ['Only the problem with no proposed solutions', 'An introduction, problem description, proposed solution(s), evaluation of solutions, and conclusion', 'A timeline of historical events', 'A list of questions without answers'], ans: 'An introduction, problem description, proposed solution(s), evaluation of solutions, and conclusion', exp: 'Problem-solution essays require clear identification of a problem + causes, proposed solutions, and critical evaluation of those solutions.' },
    { q: 'The best way to improve B2 writing is to:', opts: ['Translate from Indonesian to English word by word', 'Write only when required for assessment', 'Practise regularly, seek feedback, read widely in English, and actively study exemplar texts', 'Memorise fixed phrases without adapting them'], ans: 'Practise regularly, seek feedback, read widely in English, and actively study exemplar texts', exp: 'Sustained writing practice combined with extensive reading of good academic models is the most effective path to B2 writing proficiency.' },
  ];
};

// ─────────────────────────────────────────────────────────────
// GENERATORS
// ─────────────────────────────────────────────────────────────

function makeReadingLesson(num) {
  const title = READING_TITLES[num];
  const vocab = READING_VOCAB[num] || READING_VOCAB[1];
  const passage = READING_PASSAGES[num];
  const questions = READING_QUESTIONS(num);
  const nextPath = num < 20 ? `/modul/english/upper-intermediate/reading/lesson-${num+1}` : null;
  const nextCode = nextPath ? `'${nextPath}'` : 'null';

  const vocabLines = vocab.map(([en, id]) =>
    `  { en: ${JSON.stringify(en)}, id: ${JSON.stringify(id)} }`
  ).join(',\n');

  const quizLines = questions.map(q => {
    const opts = q.opts.map(o => JSON.stringify(o)).join(', ');
    return `  { q: ${JSON.stringify(q.q)}, opts: [${opts}], ans: ${JSON.stringify(q.ans)}, exp: ${JSON.stringify(q.exp)} }`;
  }).join(',\n');

  return `import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, CheckCircle2, ChevronLeft, Brain } from 'lucide-react';

const VOCAB = [
${vocabLines}
];

const PASSAGE = ${JSON.stringify(passage)};

const QUIZ: { q: string; opts: string[]; ans: string; exp: string }[] = [
${quizLines}
];

const ACCENT = '#D4A017';
const NEXT_PATH = ${nextCode};
const STORAGE_KEY = 'talky_upper_intermediate_reading_completed';
const LESSON_NUM = ${num};

function getCompleted(): number[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
}
function markComplete(n: number) {
  const d = getCompleted();
  if (!d.includes(n)) localStorage.setItem(STORAGE_KEY, JSON.stringify([...d, n]));
}

export default function UpperInterReadingLesson${num}() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'baca' | 'kuis'>('baca');
  const [isCompleted, setIsCompleted] = useState(() => getCompleted().includes(LESSON_NUM));
  const [showModal, setShowModal] = useState(false);
  const [quizIdx, setQuizIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showExp, setShowExp] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = QUIZ[quizIdx];

  const handleAnswer = (opt: string) => {
    if (selected) return;
    setSelected(opt);
    setShowExp(true);
    if (opt === current.ans) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (quizIdx + 1 < QUIZ.length) {
      setQuizIdx(i => i + 1); setSelected(null); setShowExp(false);
    } else {
      setFinished(true);
      markComplete(LESSON_NUM);
      setIsCompleted(true);
      setShowModal(true);
    }
  };

  const handleComplete = () => { markComplete(LESSON_NUM); setIsCompleted(true); setShowModal(true); };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }} onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-[2rem] p-8 max-w-sm w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-5xl">📖</div>
            <h2 className="text-2xl font-extrabold text-slate-800 mb-2">Lesson Selesai! 🎉</h2>
            {finished && <p className="text-lg font-bold mb-2" style={{ color: ACCENT }}>Skor: {score}/{QUIZ.length}</p>}
            <p className="text-slate-500 mb-6 text-sm leading-relaxed">Selamat! Anda telah menyelesaikan: <strong>${title}</strong></p>
            <div className="space-y-3">
              {NEXT_PATH && <button onClick={() => { setShowModal(false); navigate(NEXT_PATH); }} className="w-full py-3 rounded-xl font-bold text-white" style={{ backgroundColor: ACCENT }}>Pelajaran Berikutnya →</button>}
              <button onClick={() => setShowModal(false)} className="w-full py-3 rounded-xl font-bold text-slate-600 bg-slate-100">Tutup</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col h-[100dvh] md:h-full bg-slate-50">
        <header className="flex-none bg-white/95 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100 shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-600"><ChevronLeft className="w-6 h-6" /></button>
            <div className="text-center">
              <h1 className="text-sm font-bold text-slate-800 line-clamp-1">${title}</h1>
              <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: ACCENT }}>Upper-Intermediate Reading • L${num}</p>
            </div>
            {NEXT_PATH ? <button onClick={() => navigate(NEXT_PATH)} className="px-3 h-9 rounded-full text-xs font-bold" style={{ color: ACCENT, backgroundColor: ACCENT + '18' }}>Next ›</button> : <div className="w-14" />}
          </div>
        </header>

        <div className="flex bg-white border-b border-slate-100 sticky top-[65px] z-10 p-2 gap-2">
          {(['baca', 'kuis'] as const).map(tab => {
            const labels = { baca: '📖 Baca Teks', kuis: '🧠 Kuis 20 Soal' };
            const isActive = activeTab === tab;
            return (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={'flex-1 py-3 text-sm font-bold tracking-wide transition-all rounded-xl flex items-center justify-center gap-2 ' + (isActive ? 'text-white shadow-md' : 'text-slate-500 hover:bg-slate-50')}
                style={isActive ? { backgroundColor: ACCENT } : {}}>
                {labels[tab]}
              </button>
            );
          })}
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-8 pb-28 space-y-6">
            {activeTab === 'baca' && (
              <div className="animate-fade-in space-y-6">
                <div className="rounded-3xl p-6 text-white shadow-xl relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #D4A017, #B8860B)' }}>
                  <div className="absolute top-0 right-0 p-6 opacity-20"><BookOpen className="w-24 h-24" /></div>
                  <h2 className="text-xl font-extrabold mb-1 relative z-10">${title}</h2>
                  <p className="text-sm text-white/90 relative z-10">Upper-Intermediate Reading • CEFR B2</p>
                  <div className="mt-3 inline-block bg-white/20 px-3 py-1 rounded-full text-xs font-bold">📖 B2 Academic Reading</div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5">
                  <p className="text-xs font-extrabold uppercase tracking-widest mb-4" style={{ color: ACCENT }}>📚 Kosakata B2 Kunci</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {VOCAB.map(v => (
                      <div key={v.en} className="bg-slate-50 rounded-xl px-4 py-3 flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-800">{v.en}</span>
                        <span className="text-xs font-medium text-right max-w-[55%] leading-tight" style={{ color: ACCENT }}>{v.id}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
                  <p className="text-xs font-extrabold uppercase tracking-widest mb-4 text-slate-400">📄 READING PASSAGE</p>
                  {PASSAGE.split('\\n\\n').map((para, i) => (
                    <p key={i} className="text-sm text-slate-700 leading-relaxed mb-4">{para}</p>
                  ))}
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                  <p className="text-sm font-bold text-amber-800 mb-1">💡 Tips Membaca B2</p>
                  <ul className="text-sm text-amber-700 space-y-1">
                    <li>• Identifikasi <strong>thesis utama</strong> di paragraf pertama</li>
                    <li>• Perhatikan <strong>discourse markers</strong>: however, consequently, nevertheless</li>
                    <li>• Bedakan <strong>fakta</strong> dari <strong>opini</strong> dan <strong>inferensi</strong></li>
                    <li>• Perhatikan <strong>hedging language</strong>: suggests, may, appears to</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'kuis' && (
              <div className="animate-fade-in">
                {!finished ? (
                  <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-5">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Soal {quizIdx + 1} / {QUIZ.length}</p>
                      <p className="text-xs font-bold" style={{ color: ACCENT }}>Skor: {score}</p>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 mb-4">
                      <div className="h-2 rounded-full transition-all" style={{ width: \`\${((quizIdx) / QUIZ.length) * 100}%\`, backgroundColor: ACCENT }} />
                    </div>
                    <p className="text-base font-bold text-slate-800 leading-relaxed">{current.q}</p>
                    <div className="space-y-3">
                      {current.opts.map(opt => {
                        const isSelected = selected === opt;
                        const isCorrect = opt === current.ans;
                        let bg = 'bg-slate-50 border-slate-200 text-slate-700';
                        if (selected) {
                          if (isCorrect) bg = 'bg-green-100 border-green-400 text-green-800 font-bold';
                          else if (isSelected) bg = 'bg-red-100 border-red-400 text-red-800';
                        }
                        return (
                          <button key={opt} onClick={() => handleAnswer(opt)} className={\`w-full text-left px-4 py-3 rounded-xl border-2 text-sm transition-all \${bg}\`}>
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                    {showExp && (
                      <div className="mt-3 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                        <p className="text-xs font-bold text-blue-700 mb-1">💡 Penjelasan</p>
                        <p className="text-sm text-blue-700">{current.exp}</p>
                      </div>
                    )}
                    {selected && (
                      <button onClick={handleNext} className="w-full py-3 rounded-xl font-bold text-white mt-2" style={{ backgroundColor: ACCENT }}>
                        {quizIdx + 1 < QUIZ.length ? 'Soal Berikutnya →' : 'Selesai ✓'}
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 text-center space-y-4">
                    <div className="text-5xl mb-2">{score >= 16 ? '🏆' : score >= 12 ? '🎯' : '📖'}</div>
                    <h3 className="text-2xl font-extrabold text-slate-800">Kuis Selesai!</h3>
                    <p className="text-4xl font-black" style={{ color: ACCENT }}>{score}/{QUIZ.length}</p>
                    <p className="text-slate-500">{score >= 16 ? 'Luar biasa! Pemahaman B2 sangat baik.' : score >= 12 ? 'Bagus! Terus tingkatkan kemampuan membaca.' : 'Baca ulang teks dan coba lagi.'}</p>
                    <button onClick={() => { setShowModal(false); if (NEXT_PATH) navigate(NEXT_PATH); }} className="w-full py-3 rounded-xl font-bold text-white" style={{ backgroundColor: ACCENT }}>
                      {NEXT_PATH ? 'Pelajaran Berikutnya →' : 'Kembali ke Modul'}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="sticky bottom-0 z-30 bg-white/90 backdrop-blur-xl border-t border-slate-200 p-4">
          <button onClick={isCompleted ? () => navigate(-1) : handleComplete}
            className="w-full py-4 rounded-2xl font-bold text-white flex items-center justify-center gap-2 shadow-lg"
            style={{ background: isCompleted ? 'linear-gradient(135deg,#10B981,#059669)' : \`linear-gradient(135deg,\${ACCENT},\${ACCENT}CC)\` }}>
            <CheckCircle2 className="w-5 h-5" />
            {isCompleted ? 'Sudah Selesai ✓ (Kembali)' : 'Tandai Selesai ✓'}
          </button>
        </div>
      </div>
    </>
  );
}
`;
}

function makeWritingLesson(num) {
  const title = WRITING_TITLES[num];
  const objective = WRITING_OBJECTIVES[num];
  const examples = WRITING_EXAMPLES[num];
  const questions = WRITING_QUESTIONS(num);
  const nextPath = num < 20 ? `/modul/english/upper-intermediate/writing/lesson-${num+1}` : null;
  const nextCode = nextPath ? `'${nextPath}'` : 'null';

  const examplesCode = examples.map(e =>
    `  { label: ${JSON.stringify(e.label)}, text: ${JSON.stringify(e.text)} }`
  ).join(',\n');

  const quizLines = questions.map(q => {
    const opts = q.opts.map(o => JSON.stringify(o)).join(', ');
    return `  { q: ${JSON.stringify(q.q)}, opts: [${opts}], ans: ${JSON.stringify(q.ans)}, exp: ${JSON.stringify(q.exp)} }`;
  }).join(',\n');

  return `import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PenLine, CheckCircle2, ChevronLeft } from 'lucide-react';

const EXAMPLES = [
${examplesCode}
];

const QUIZ: { q: string; opts: string[]; ans: string; exp: string }[] = [
${quizLines}
];

const ACCENT = '#784212';
const NEXT_PATH = ${nextCode};
const STORAGE_KEY = 'talky_upper_intermediate_writing_completed';
const LESSON_NUM = ${num};

function getCompleted(): number[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
}
function markComplete(n: number) {
  const d = getCompleted();
  if (!d.includes(n)) localStorage.setItem(STORAGE_KEY, JSON.stringify([...d, n]));
}

export default function UpperInterWritingLesson${num}() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'belajar' | 'kuis'>('belajar');
  const [isCompleted, setIsCompleted] = useState(() => getCompleted().includes(LESSON_NUM));
  const [showModal, setShowModal] = useState(false);
  const [quizIdx, setQuizIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showExp, setShowExp] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = QUIZ[quizIdx];

  const handleAnswer = (opt: string) => {
    if (selected) return;
    setSelected(opt);
    setShowExp(true);
    if (opt === current.ans) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (quizIdx + 1 < QUIZ.length) {
      setQuizIdx(i => i + 1); setSelected(null); setShowExp(false);
    } else {
      setFinished(true);
      markComplete(LESSON_NUM);
      setIsCompleted(true);
      setShowModal(true);
    }
  };

  const handleComplete = () => { markComplete(LESSON_NUM); setIsCompleted(true); setShowModal(true); };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }} onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-[2rem] p-8 max-w-sm w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="text-5xl mb-3">✍️</div>
            <h2 className="text-2xl font-extrabold text-slate-800 mb-2">Lesson Selesai! 🎉</h2>
            {finished && <p className="text-lg font-bold mb-2" style={{ color: ACCENT }}>Skor: {score}/{QUIZ.length}</p>}
            <p className="text-slate-500 mb-6 text-sm">Anda telah menyelesaikan: <strong>${title}</strong></p>
            <div className="space-y-3">
              {NEXT_PATH && <button onClick={() => { setShowModal(false); navigate(NEXT_PATH); }} className="w-full py-3 rounded-xl font-bold text-white" style={{ backgroundColor: ACCENT }}>Pelajaran Berikutnya →</button>}
              <button onClick={() => setShowModal(false)} className="w-full py-3 rounded-xl font-bold text-slate-600 bg-slate-100">Tutup</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col h-[100dvh] md:h-full bg-slate-50">
        <header className="flex-none bg-white/95 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100 shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-600"><ChevronLeft className="w-6 h-6" /></button>
            <div className="text-center">
              <h1 className="text-sm font-bold text-slate-800 line-clamp-1">${title}</h1>
              <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: ACCENT }}>Upper-Intermediate Writing • L${num}</p>
            </div>
            {NEXT_PATH ? <button onClick={() => navigate(NEXT_PATH)} className="px-3 h-9 rounded-full text-xs font-bold" style={{ color: ACCENT, backgroundColor: ACCENT + '18' }}>Next ›</button> : <div className="w-14" />}
          </div>
        </header>

        <div className="flex bg-white border-b border-slate-100 sticky top-[65px] z-10 p-2 gap-2">
          {(['belajar', 'kuis'] as const).map(tab => {
            const labels = { belajar: '✍️ Materi', kuis: '🧠 Kuis 20 Soal' };
            const isActive = activeTab === tab;
            return (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={'flex-1 py-3 text-sm font-bold tracking-wide transition-all rounded-xl flex items-center justify-center gap-2 ' + (isActive ? 'text-white shadow-md' : 'text-slate-500 hover:bg-slate-50')}
                style={isActive ? { backgroundColor: ACCENT } : {}}>
                {labels[tab]}
              </button>
            );
          })}
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-8 pb-28 space-y-6">
            {activeTab === 'belajar' && (
              <div className="animate-fade-in space-y-6">
                <div className="rounded-3xl p-6 text-white shadow-xl relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #784212, #5D3005)' }}>
                  <div className="absolute top-0 right-0 p-6 opacity-20"><PenLine className="w-24 h-24" /></div>
                  <h2 className="text-xl font-extrabold mb-1 relative z-10">${title}</h2>
                  <p className="text-sm text-white/90 relative z-10">Upper-Intermediate Writing • CEFR B2</p>
                  <div className="mt-3 inline-block bg-white/20 px-3 py-1 rounded-full text-xs font-bold">✍️ B2 Writing Skills</div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5">
                  <p className="text-xs font-extrabold uppercase tracking-widest mb-3" style={{ color: ACCENT }}>🎯 TUJUAN PEMBELAJARAN</p>
                  <p className="text-sm text-slate-700 leading-relaxed">${objective}</p>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 space-y-4">
                  <p className="text-xs font-extrabold uppercase tracking-widest mb-2" style={{ color: ACCENT }}>📝 CONTOH & LATIHAN</p>
                  {EXAMPLES.map((ex, i) => (
                    <div key={i} className="rounded-2xl overflow-hidden border border-slate-100">
                      <div className="px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-white" style={{ backgroundColor: ACCENT }}>{ex.label}</div>
                      <div className="bg-slate-50 px-4 py-3">
                        <p className="text-sm text-slate-700 leading-relaxed italic">"{ex.text}"</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                  <p className="text-sm font-bold text-amber-800 mb-1">💡 Tips Menulis B2</p>
                  <ul className="text-sm text-amber-700 space-y-1">
                    <li>• Rencanakan struktur <strong>sebelum</strong> menulis: intro → body → conclusion</li>
                    <li>• Gunakan <strong>discourse markers</strong>: however, consequently, in contrast</li>
                    <li>• Hindari kalimat terlalu pendek — gunakan <strong>subordinate clauses</strong></li>
                    <li>• Sesuaikan <strong>register</strong> dengan konteks: formal untuk esai, semi-formal untuk email</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'kuis' && (
              <div className="animate-fade-in">
                {!finished ? (
                  <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-5">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Soal {quizIdx + 1} / {QUIZ.length}</p>
                      <p className="text-xs font-bold" style={{ color: ACCENT }}>Skor: {score}</p>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 mb-4">
                      <div className="h-2 rounded-full transition-all" style={{ width: \`\${((quizIdx) / QUIZ.length) * 100}%\`, backgroundColor: ACCENT }} />
                    </div>
                    <p className="text-base font-bold text-slate-800 leading-relaxed">{current.q}</p>
                    <div className="space-y-3">
                      {current.opts.map(opt => {
                        const isSelected = selected === opt;
                        const isCorrect = opt === current.ans;
                        let bg = 'bg-slate-50 border-slate-200 text-slate-700';
                        if (selected) {
                          if (isCorrect) bg = 'bg-green-100 border-green-400 text-green-800 font-bold';
                          else if (isSelected) bg = 'bg-red-100 border-red-400 text-red-800';
                        }
                        return (
                          <button key={opt} onClick={() => handleAnswer(opt)} className={\`w-full text-left px-4 py-3 rounded-xl border-2 text-sm transition-all \${bg}\`}>
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                    {showExp && (
                      <div className="mt-3 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                        <p className="text-xs font-bold text-blue-700 mb-1">💡 Penjelasan</p>
                        <p className="text-sm text-blue-700">{current.exp}</p>
                      </div>
                    )}
                    {selected && (
                      <button onClick={handleNext} className="w-full py-3 rounded-xl font-bold text-white mt-2" style={{ backgroundColor: ACCENT }}>
                        {quizIdx + 1 < QUIZ.length ? 'Soal Berikutnya →' : 'Selesai ✓'}
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 text-center space-y-4">
                    <div className="text-5xl mb-2">{score >= 16 ? '🏆' : score >= 12 ? '🎯' : '✍️'}</div>
                    <h3 className="text-2xl font-extrabold text-slate-800">Kuis Selesai!</h3>
                    <p className="text-4xl font-black" style={{ color: ACCENT }}>{score}/{QUIZ.length}</p>
                    <p className="text-slate-500">{score >= 16 ? 'Luar biasa! Pemahaman writing B2 sangat baik.' : score >= 12 ? 'Bagus! Terus latihan menulis setiap hari.' : 'Pelajari kembali contoh dan coba latihan lebih banyak.'}</p>
                    <button onClick={() => { setShowModal(false); if (NEXT_PATH) navigate(NEXT_PATH); }} className="w-full py-3 rounded-xl font-bold text-white" style={{ backgroundColor: ACCENT }}>
                      {NEXT_PATH ? 'Pelajaran Berikutnya →' : 'Kembali ke Modul'}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="sticky bottom-0 z-30 bg-white/90 backdrop-blur-xl border-t border-slate-200 p-4">
          <button onClick={isCompleted ? () => navigate(-1) : handleComplete}
            className="w-full py-4 rounded-2xl font-bold text-white flex items-center justify-center gap-2 shadow-lg"
            style={{ background: isCompleted ? 'linear-gradient(135deg,#10B981,#059669)' : \`linear-gradient(135deg,\${ACCENT},\${ACCENT}CC)\` }}>
            <CheckCircle2 className="w-5 h-5" />
            {isCompleted ? 'Sudah Selesai ✓ (Kembali)' : 'Tandai Selesai ✓'}
          </button>
        </div>
      </div>
    </>
  );
}
`;
}

function makeIndexPage(skill, accentColor, title, funcName, subtitle) {
  const sTitles = skill === 'reading' ? READING_TITLES : WRITING_TITLES;
  const titlesCode = Object.entries(sTitles).map(([k, v]) => `  ${k}: ${JSON.stringify(v)}`).join(',\n');
  const storageKey = `talky_upper_intermediate_${skill}_completed`;
  return `import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Check, Play } from 'lucide-react';
import PageContainer from '../../../../../components/layout/PageContainer';
import { PageHeader } from '../../../../../components/shared/NavComponents';

const ACCENT = '${accentColor}';
const TOTAL = 20;
const STORAGE_KEY = '${storageKey}';
const BASE_PATH = '/modul/english/upper-intermediate/${skill}';

const LESSON_TITLES: Record<number, string> = {
${titlesCode}
};

function getCompleted(): number[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
}

export default function ${funcName}() {
  const navigate = useNavigate();
  const [completedIds, setCompletedIds] = useState<number[]>([]);
  useEffect(() => { setCompletedIds(getCompleted()); }, []);

  const count = completedIds.length;
  const pct = (count / TOTAL) * 100;
  const lessons = Array.from({ length: TOTAL }, (_, i) => i + 1);

  return (
    <PageContainer>
      <div className="pb-28 md:pb-8">
        <PageHeader titleKey="skill.${skill}" subtitleKey="modul.daysSubtitle" />

        <motion.div className="mx-5 md:mx-0 mb-6 rounded-2xl p-5 relative overflow-hidden"
          style={{ backgroundColor: ACCENT + '15', border: \`1px solid \${ACCENT}30\` }}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ backgroundColor: ACCENT + '20' }}>
              ${skill === 'reading' ? '📖' : '✍️'}
            </div>
            <div>
              <h3 className="font-bold text-[15px] text-[#1A1A2E]">${title}</h3>
              <p className="text-xs text-[#6B7280]">{count}/{TOTAL} Pelajaran • ${subtitle}</p>
            </div>
            <div className="ml-auto inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: ACCENT }}>
              🎓 B2
            </div>
          </div>
          <div className="mt-3 h-2 bg-white/60 rounded-full overflow-hidden">
            <motion.div className="h-full rounded-full" style={{ backgroundColor: ACCENT }}
              initial={{ width: 0 }} animate={{ width: \`\${pct}%\` }} transition={{ duration: 0.8 }} />
          </div>
          {count > 0 && <p className="text-[11px] font-semibold mt-1.5" style={{ color: ACCENT }}>{count === TOTAL ? '🎉 Semua pelajaran selesai!' : \`\${count} dari \${TOTAL} pelajaran selesai\`}</p>}
        </motion.div>

        <div className="px-5 md:px-0">
          <h2 className="text-lg font-extrabold text-[#1A1A2E] mb-1">Learning Path</h2>
          <p className="text-[13px] text-[#6B7280] mb-5">20 pelajaran CEFR B2 Upper-Intermediate</p>
          <div className="space-y-3">
            {lessons.map((id, i) => {
              const done = completedIds.includes(id);
              return (
                <motion.button key={id}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl text-left border-2 shadow-sm hover:shadow-md cursor-pointer"
                  style={{ borderColor: done ? '#26C76D' : ACCENT + '30', backgroundColor: done ? '#F0FDF6' : 'white' }}
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.03 * i }}
                  whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(\`\${BASE_PATH}/lesson-\${id}\`)}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 text-white" style={{ backgroundColor: done ? '#26C76D' : ACCENT }}>
                    {done ? <Check size={18} strokeWidth={3} /> : <Play size={16} fill="white" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-sm text-[#1A1A2E]">Lesson {id}</p>
                      {done && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white bg-[#26C76D]">✓ Selesai</span>}
                    </div>
                    <p className="text-[12px] text-[#6B7280] truncate mt-0.5">{LESSON_TITLES[id]}</p>
                  </div>
                  <span className="text-[10px] font-bold px-3 py-1.5 rounded-full text-white shrink-0" style={{ backgroundColor: done ? '#26C76D' : ACCENT }}>
                    {done ? 'Completed' : 'Start'}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
`;
}

// ─────────────────────────────────────────────────────────────
// EXECUTE
// ─────────────────────────────────────────────────────────────
if (!fs.existsSync(READING_DIR)) fs.mkdirSync(READING_DIR, { recursive: true });
if (!fs.existsSync(WRITING_DIR)) fs.mkdirSync(WRITING_DIR, { recursive: true });

// Reading index page
fs.writeFileSync(path.join(READING_DIR, 'UpperInterReadingPage.tsx'),
  makeIndexPage('reading', '#D4A017', 'Reading', 'UpperInterReadingPage', 'Teks Akademik B2'), 'utf8');
console.log('✅ UpperInterReadingPage.tsx written');

// Reading lessons 1-20
for (let i = 1; i <= 20; i++) {
  fs.writeFileSync(path.join(READING_DIR, `Lesson${i}.tsx`), makeReadingLesson(i), 'utf8');
  console.log(`✅ Reading Lesson${i} written`);
}

// Writing index page
fs.writeFileSync(path.join(WRITING_DIR, 'UpperInterWritingPage.tsx'),
  makeIndexPage('writing', '#784212', 'Writing', 'UpperInterWritingPage', 'Menulis Essay & Laporan B2'), 'utf8');
console.log('✅ UpperInterWritingPage.tsx written');

// Writing lessons 1-20
for (let i = 1; i <= 20; i++) {
  fs.writeFileSync(path.join(WRITING_DIR, `Lesson${i}.tsx`), makeWritingLesson(i), 'utf8');
  console.log(`✅ Writing Lesson${i} written`);
}

console.log('\n🎯 Done! 42 files generated (2 index pages + 20 reading + 20 writing)');
