const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '../src/pages/module/english/upper-intermediate/grammar');

// Enhanced data for each lesson: [THEORY array string, EXAMPLES array string]
const ENHANCEMENTS = {
  // L1: Advanced Perfect Tenses - already has good content, just add more examples
  1: {
    examples: [
      `"She **has been studying** English for three years." → Present Perfect Continuous (masih berlangsung)`,
      `"They **had been waiting** for two hours when the bus finally came." → Past Perfect Continuous`,
      `"By next month, I **will have been working** here for a decade." → Future Perfect Continuous`,
      `"I **have never visited** Tokyo, but I hope to go next year." → Present Perfect untuk pengalaman`,
      `"The scientists **had discovered** a new species before the lab was closed." → Past Perfect untuk urutan`,
      `"By 2030, renewable energy **will have replaced** most fossil fuels." → Future Perfect untuk prediksi`,
    ]
  },
  // L2: Conditional Sentences - already good, add more examples
  2: {
    examples: [
      `"If I **were** president, I **would prioritise** education spending." (Type 2 - tidak nyata kini)`,
      `"If she **had taken** the job offer, she **would have earned** more money." (Type 3 - penyesalan masa lalu)`,
      `"If he **had been** born in a different era, he **would be** a different person today." (Mixed)`,
      `"**Were I** to win the lottery, I **would invest** in renewable energy." (Formal inversion)`,
      `"**Had she** studied harder, she **might have passed** the bar exam." (Formal inversion Type 3)`,
      `"If the economy **hadn't collapsed**, unemployment **would not have risen** so sharply." (Type 3 kontekstual)`,
    ]
  },
  // L3: Passive Voice Complex
  3: {
    theory: `const THEORY: TheoryBlock[] = [
  {
    name: "Passive Voice: Advanced Forms",
    color: "blue",
    icon: "🔵",
    points: [
      "Passive Voice digunakan saat pelaku tidak diketahui, tidak penting, atau sengaja dihilangkan.",
      "Rumus dasar: **be + past participle** (disesuaikan dengan tense)",
      "Present: \\"The report **is being reviewed**.\\" / Past: \\"The policy **was implemented** last year.\\"",
      "Present Perfect: \\"The results **have been published**.\\" / Future: \\"The data **will be analysed**.\\"",
      "Passive dengan infinitive: \\"The CEO **is expected to resign**.\\" / \\"She **is believed to be** the best candidate.\\"",
      "Passive dengan modal: \\"This **should be done** immediately.\\" / \\"The problem **must be addressed**.\\"",
    ]
  },
  {
    name: "Reporting Verbs in Passive",
    color: "indigo",
    icon: "📢",
    points: [
      "Reporting verbs dalam passive: **It is said/believed/reported/claimed/alleged/thought/known that...**",
      "\\"**It is widely believed that** climate change is man-made.\\"",
      "\\"**It has been reported that** the company will merge.\\"",
      "Konstruksi alternatif: **Subject + is/are + verb-ed + to + infinitive**",
      "\\"**The economy is expected to grow** by 3% next year.\\"",
      "\\"**She is thought to have left** the country last month.\\"",
    ]
  },
  {
    name: "Passive in Academic & Business Writing",
    color: "green",
    icon: "✍️",
    points: [
      "Academic writing menggunakan passive untuk nada objektif dan tidak personal.",
      "\\"The data **were collected** from a sample of 500 participants.\\"",
      "\\"The experiment **was conducted** under controlled conditions.\\"",
      "Hindari passive berlebihan — gunakan selang-seling dengan active voice.",
      "\\"The results **suggest** that... (active) / The findings **were consistent with** previous studies. (passive)\\"",
      "Business passive: \\"The contract **has been signed**.\\" / \\"The budget **has been approved**.\\"",
    ]
  }
];`,
    examples: [
      `"The new policy **has been implemented** by the government." → Present Perfect Passive`,
      `"The suspect **is being questioned** by detectives." → Present Continuous Passive`,
      `"**It is believed that** the discovery will change medicine." → Reporting verb passive`,
      `"The CEO **is expected to announce** the results tomorrow." → Infinitive passive`,
      `"The data **were analysed** using statistical software." → Academic passive`,
      `"The project **should have been completed** by last Friday." → Modal Perfect Passive`,
    ]
  },
  // L4: Reported Speech Advanced
  4: {
    theory: `const THEORY: TheoryBlock[] = [
  {
    name: "Backshift Rules in Reported Speech",
    color: "blue",
    icon: "🔵",
    points: [
      "Reported speech mengubah tense maju ke masa lalu (backshift) kecuali kondisi tertentu.",
      "Present → Past: \\"I work here\\" → She said she **worked** there.",
      "Past → Past Perfect: \\"I worked there\\" → He said he **had worked** there.",
      "Present Perfect → Past Perfect: \\"I have finished\\" → She said she **had finished**.",
      "Will → Would: \\"I will go\\" → He said he **would go**.",
      "Can → Could | May → Might | Must → Had to | Shall → Would",
    ]
  },
  {
    name: "Reporting Verbs Beyond 'Said'",
    color: "indigo",
    icon: "💬",
    points: [
      "Gunakan reporting verbs yang tepat untuk nuansa makna yang berbeda.",
      "**Claim / Allege / Maintain + that**: \\"She **claimed** that she had never been there.\\"",
      "**Admit / Deny + gerund**: \\"He **denied stealing** the money.\\"",
      "**Offer / Agree / Refuse + to infinitive**: \\"She **offered to help** us.\\"",
      "**Warn / Advise / Urge + object + not to**: \\"He **urged them not to** sign the contract.\\"",
      "**Suggest + gerund / that + subjunctive**: \\"She **suggested leaving** early.\\"",
    ]
  },
  {
    name: "Pronoun & Time/Place Shifts",
    color: "purple",
    icon: "🟣",
    points: [
      "Dalam reported speech, pronoun, waktu, dan tempat ikut berubah.",
      "HERE → there | NOW → then | TODAY → that day | YESTERDAY → the day before",
      "TOMORROW → the next/following day | LAST YEAR → the previous year",
      "\\"Come **here** **now**\\" → She told him to go **there** at **that moment**.",
      "No backshift diperlukan jika fact masih berlaku saat ini: \\"He said the earth **is** round.\\"",
      "Questions in reported speech: \\"**Did** you see him?\\" → She asked **whether** I **had seen** him.",
    ]
  }
];`,
    examples: [
      `Direct: "I **have never been** to Paris." → Reported: She said she **had never been** to Paris.`,
      `Direct: "**Will** you help me?" → Reported: He asked **whether** she **would** help him.`,
      `"The minister **denied having received** any bribes." → Deny + gerund`,
      `"She **urged** the committee **not to approve** the amendment." → Reporting verb + object + infinitive`,
      `"Scientists **suggested that** further research **be** conducted." → Suggest + subjunctive`,
      `"He **warned** us **that** the deadline **was** approaching fast." → Warn + that clause`,
    ]
  },
  // L5: Inversion & Emphasis
  5: {
    theory: `const THEORY: TheoryBlock[] = [
  {
    name: "Negative Adverbials: Inversion",
    color: "blue",
    icon: "🔄",
    points: [
      "Inversion terjadi ketika negative/restrictive adverbial diletakkan di awal kalimat.",
      "**Never** have I witnessed such incompetence. (I have never witnessed...)",
      "**Rarely** does she make such a significant mistake. (She rarely makes...)",
      "**Not only** did he refuse to apologise, **but** he **also** blamed others.",
      "**Under no circumstances** are you to reveal this information.",
      "**Hardly** had she arrived **when** the meeting was cancelled.",
    ]
  },
  {
    name: "Emphatic Structures: Cleft Sentences",
    color: "indigo",
    icon: "💥",
    points: [
      "Cleft sentences digunakan untuk menekankan bagian tertentu dari kalimat.",
      "**It + be + emphasised element + that/who clause**: \\"**It was** the prime minister **who** announced the policy.\\"",
      "**What + clause + be + emphasis**: \\"**What surprised me** was the speed of the change.\\"",
      "**What I need** is more time, not more advice.",
      "**The thing that** concerns me **is** the lack of transparency.",
      "Cleft sentences sangat umum dalam debat, presentasi, dan academic writing.",
    ]
  },
  {
    name: "Do-Emphatic & Other Structures",
    color: "amber",
    icon: "⚡",
    points: [
      "**Do/Does/Did** ditambahkan sebelum kata kerja untuk penekanan:",
      "\\"I **do understand** your concern, but the decision stands.\\"",
      "\\"She **does make** an excellent point about resource allocation.\\"",
      "**Only** + adverb/prepositional phrase membuat inversion: \\"**Only then** did he realise his mistake.\\"",
      "**So/Such** untuk penekanan besarnya sesuatu: \\"So **rare** is this species that...\\"",
      "\\"**Such was** the impact of his speech that the audience fell silent.\\"",
    ]
  }
];`,
    examples: [
      `"**Never before** had scientists observed such rapid cellular growth." → Never + inversion`,
      `"**Not only** does social media spread news quickly, **but** it **also** spreads misinformation." → Not only...but also`,
      `"**It was** the lack of regulation **that** led to the financial crisis." → It-cleft sentence`,
      `"**What I find** most troubling **is** the systematic nature of the corruption." → What-cleft`,
      `"I **do believe** that education is the most powerful tool for change." → Do-emphatic`,
      `"**Only** when all options are exhausted **should** we consider redundancies." → Only + inversion`,
    ]
  },
  // L6: Relative Clauses
  6: {
    theory: `const THEORY: TheoryBlock[] = [
  {
    name: "Defining vs Non-Defining Relative Clauses",
    color: "blue",
    icon: "🔵",
    points: [
      "**Defining**: memberikan informasi esensial — tanpa koma, menggunakan that/which/who/whose/where/when.",
      "\\"The report **that was published yesterday** revealed significant flaws.\\"",
      "\\"Employees **who consistently exceed targets** will be promoted.\\"",
      "**Non-defining**: memberikan informasi tambahan — dengan koma, TIDAK menggunakan 'that'.",
      "\\"The CEO, **who has led the company for 15 years**, announced his retirement.\\"",
      "\\"The new policy, **which was widely criticised**, was eventually withdrawn.\\"",
    ]
  },
  {
    name: "Advanced Relative Structures",
    color: "indigo",
    icon: "🔑",
    points: [
      "**Whose** untuk kepemilikan: \\"Scientists, **whose findings** were disputed, defended their methodology.\\"",
      "**Where/When** untuk tempat dan waktu: \\"The era **when** digital communication emerged changed society.\\"",
      "**Preposition + relative pronoun**: \\"The committee, **by which** the decision was made, has since disbanded.\\"",
      "\\"This is the issue **about which** we have been debating for months.\\" (formal)",
      "Reduced relative clauses: \\"Students **enrolled** in the programme... (= who are enrolled)\\"",
      "\\"A report **published in** 2023 showed... (= that was published)\\"",
    ]
  },
  {
    name: "Quantifiers with Relative Clauses",
    color: "purple",
    icon: "🟣",
    points: [
      "**Most of whom / many of which / both of whom** dll. digunakan dalam non-defining clauses.",
      "\\"The researchers, **most of whom** were from leading universities, collaborated on the project.\\"",
      "\\"Three proposals were submitted, **none of which** addressed the core issue.\\"",
      "\\"The committee members, **all of whom** had decades of experience, endorsed the plan.\\"",
      "Struktur ini umum dalam academic writing dan formal journalism.",
      "Jangan gunakan 'that' setelah kuantifier: ❌ \\"many of that\\" → ✅ \\"many of which/whom\\"",
    ]
  }
];`,
    examples: [
      `"The scientist **whose research** transformed our understanding of genetics received a Nobel Prize." → Whose`,
      `"The legislation, **about which** there has been considerable debate, passed by a narrow margin." → Preposition + which`,
      `"Participants **selected for** the programme were required to have B2-level English." → Reduced relative`,
      `"Several recommendations were made, **none of which** were implemented." → Quantifier + relative`,
      `"The period **during which** the policy was in effect saw significant improvement." → During which`,
      `"It was an era **when** information travelled slowly and verification was difficult." → When`,
    ]
  },
  // L7: Gerunds & Infinitives
  7: {
    theory: `const THEORY: TheoryBlock[] = [
  {
    name: "Verbs + Gerund vs. Infinitive: Meaning Change",
    color: "blue",
    icon: "🔵",
    points: [
      "Beberapa kata kerja berubah maknanya tergantung diikuti gerund atau infinitive.",
      "**STOP**: stop + gerund = berhenti melakukan | stop + infinitive = berhenti untuk melakukan sesuatu lain",
      "\\"She stopped **smoking**.\\" (tidak merokok lagi) vs \\"She stopped **to smoke**.\\" (berhenti, lalu merokok)",
      "**REMEMBER**: remember + gerund = ingat melakukan sebelumnya | + infinitive = ingat untuk melakukan",
      "\\"I remember **locking** the door.\\" vs \\"Remember **to lock** the door!\\"",
      "**REGRET**: regret + gerund = menyesal melakukan | + infinitive = menyesal memberitahu",
      "\\"I regret **telling** him.\\" vs \\"We regret **to inform** you that....\\"",
    ]
  },
  {
    name: "Complex Verb Patterns",
    color: "indigo",
    icon: "🔑",
    points: [
      "**Appear / Seem / Tend / Claim / Happen** + to infinitive: \\"She **appears to have understood** the issue.\\"",
      "**Make / Let / Have** (causative) + bare infinitive: \\"The teacher **made** us **rewrite** the essay.\\"",
      "**Get** (causative) + object + past participle: \\"She **got** her report **reviewed** by a colleague.\\"",
      "**Have** + object + past participle: \\"I **had** my hair **cut** and my car **serviced**.\\"",
      "**It is + adjective + of/for + object + to**: \\"**It was thoughtful of** him **to** prepare in advance.\\"",
      "\\"**It takes** courage **to** speak truth to power.\\"",
    ]
  },
  {
    name: "Gerund as Subject & After Prepositions",
    color: "green",
    icon: "🟢",
    points: [
      "Gerund digunakan sebagai subjek kalimat dalam tulisan formal:",
      "\\"**Negotiating** trade agreements requires patience and expertise.\\"",
      "\\"**Reducing** carbon emissions is one of the defining challenges of our era.\\"",
      "Gerund wajib setelah preposisi: before, after, by, without, despite, in addition to...",
      "\\"Despite **being** highly qualified, she was not shortlisted for the role.\\"",
      "\\"By **implementing** stricter regulations, the government reduced pollution.\\"",
    ]
  }
];`,
    examples: [
      `"The university **encouraged** students **to pursue** interdisciplinary research." → encourage + to infinitive`,
      `"She **regrets not having applied** for the scholarship when she had the chance." → Perfect gerund`,
      `"**Addressing** the root causes of poverty requires systemic reform." → Gerund as subject`,
      `"The manager **had** all contracts **reviewed** by the legal department." → Have + object + past participle`,
      `"Despite **having worked** in the field for a decade, she remained humble." → Despite + gerund`,
      `"He **appeared to have forgotten** the deadline entirely." → Appear + perfect infinitive`,
    ]
  },
  // L8: Modal Verbs for Deduction
  8: {
    theory: `const THEORY: TheoryBlock[] = [
  {
    name: "Epistemic Modals: Present Deduction",
    color: "blue",
    icon: "🔵",
    points: [
      "Modal verbs untuk deduksi dan spekulasi tentang situasi saat ini:",
      "**Must be**: hampir pasti (positive): \\"She **must be** exhausted after the 14-hour flight.\\"",
      "**Can't/Couldn't be**: hampir pasti (negative): \\"That **can't be** right — the figures don't add up.\\"",
      "**May/Might/Could be**: mungkin (50-50 atau kurang): \\"He **might be** stuck in traffic.\\"",
      "**Should be**: seharusnya (expectation): \\"The results **should be** available by now.\\"",
      "Tingkat kepastian: **must** (95%) > **should** (80%) > **may** (50%) > **might/could** (30%)",
    ]
  },
  {
    name: "Modal Perfect: Past Deduction",
    color: "indigo",
    icon: "🟣",
    points: [
      "Modal + **have** + past participle untuk deduksi tentang masa lalu:",
      "**Must have**: hampir pasti terjadi: \\"She **must have left** before I arrived.\\"",
      "**Can't have**: hampir pasti tidak terjadi: \\"He **can't have forgotten** — it's in the calendar.\\"",
      "**May/Might/Could have**: mungkin terjadi: \\"They **may have made** a mistake in the report.\\"",
      "**Should have**: seharusnya terjadi (tapi tidak): \\"The report **should have been submitted** last week.\\"",
      "**Need not have**: tidak perlu dilakukan (tapi sudah dilakukan): \\"You **needn't have worried** — everything is fine.\\"",
    ]
  },
  {
    name: "Modals in Formal & Academic Contexts",
    color: "green",
    icon: "🟢",
    points: [
      "Academic writing menggunakan modal untuk hedging (ketidakpastian yang terukur):",
      "\\"This **could** suggest that the hypothesis requires further testing.\\"",
      "\\"The results **may** indicate a correlation between the two variables.\\"",
      "\\"These findings **might** have implications for policy design.\\"",
      "Formal speech: **Would** untuk formalisasi permintaan dan saran:",
      "\\"**Would** it be possible to schedule a follow-up meeting?\\"",
      "\\"You **might wish to consider** the long-term implications of this decision.\\"",
    ]
  }
];`,
    examples: [
      `"She **must have worked** through the night — the entire report was completed by morning." → Past deduction`,
      `"The results **can't have been** accurate — the methodology was fundamentally flawed." → Past negative deduction`,
      `"This pattern **might suggest** that the variable is not as significant as initially assumed." → Academic hedging`,
      `"You **needn't have stayed** so late — I had already solved the problem." → Needn't have`,
      `"He **should have been informed** of the changes before the meeting." → Should have (criticism)`,
      `"The anomaly **could indicate** a previously undetected flaw in the model." → Could for possibility`,
    ]
  },
  // L9: Subjunctive Mood
  9: {
    theory: `const THEORY: TheoryBlock[] = [
  {
    name: "Mandative Subjunctive",
    color: "blue",
    icon: "🔵",
    points: [
      "Subjunctive digunakan setelah kata kerja/kata sifat yang menyatakan keharusan atau keinginan.",
      "Kata kerja: **suggest, recommend, propose, insist, demand, require, request, urge, move**",
      "Rumus: verb + that + subject + **base form** (tanpa -s, tanpa to)",
      "\\"The committee **recommended that** the report **be revised** before submission.\\"",
      "\\"The board **insisted that** he **submit** his resignation immediately.\\"",
      "\\"It is **essential that** every student **complete** the assessment.\\"",
    ]
  },
  {
    name: "Subjunctive After Adjectives",
    color: "indigo",
    icon: "🟣",
    points: [
      "Adjectives yang memerlukan subjunctive: **essential, vital, crucial, imperative, necessary, important**",
      "\\"It is **crucial** that the data **be verified** before publication.\\"",
      "\\"It is **imperative** that all members **attend** the emergency meeting.\\"",
      "\\"It is **vital** that the CEO **be present** when this decision is made.\\"",
      "Bentuk negatif: It is essential that he **not** (tanpa do) take the decision.",
      "American English lebih sering menggunakan subjunctive; British English kadang menggunakan should + base verb.",
    ]
  },
  {
    name: "Were-Subjunctive & Archaic Forms",
    color: "amber",
    icon: "🔶",
    points: [
      "**Were** subjunctive digunakan dalam kondisional hipotetis untuk semua persona:",
      "\\"If she **were** to resign, the company would face a leadership crisis.\\"",
      "\\"**Were he** to discover the truth, he would be devastated.\\" (formal inversion)",
      "**If only + were**: \\"**If only** the situation **were** different!\\"",
      "**As if / As though + were**: \\"She speaks **as if** she **were** the only expert in the room.\\"",
      "**Suppose / Supposing + were**: \\"**Suppose** she **were** appointed — what would change?\\"",
    ]
  }
];`,
    examples: [
      `"The judge **ordered that** the evidence **be reexamined** by an independent panel." → Mandative subjunctive`,
      `"It is **imperative** that the committee **make** a decision before the deadline." → Adjective + subjunctive`,
      `"**Were** the data **to suggest** otherwise, we would need to revise our model entirely." → Were + inversion`,
      `"She acted **as though** she **were** unaware of the controversy surrounding her appointment." → As though + were`,
      `"The professor **suggested that** each student **present** their findings independently." → Suggest + subjunctive`,
      `"It is **vital** that the medication **not be** administered without a prescription." → Negative subjunctive`,
    ]
  },
  // L10: Cleft Sentences
  10: {
    theory: `const THEORY: TheoryBlock[] = [
  {
    name: "It-Cleft Sentences",
    color: "blue",
    icon: "💥",
    points: [
      "It-cleft digunakan untuk memberikan penekanan pada elemen tertentu dalam kalimat.",
      "Struktur: **It + be + emphasised element + that/who/where/when + rest of clause**",
      "\\"**It was** the prime minister **who** made the announcement.\\" (bukan orang lain)",
      "\\"**It is** the lack of trust **that** makes negotiation so difficult.\\"",
      "\\"**It was** in 2015 **that** the landmark agreement was signed.\\"",
      "It-cleft digunakan sering dalam spoken English dan formal writing untuk penekanan kontrastif.",
    ]
  },
  {
    name: "What-Cleft (Pseudo-Cleft) Sentences",
    color: "indigo",
    icon: "🟣",
    points: [
      "What-cleft menggunakan \\"What + clause + be + focus element\\".",
      "\\"**What** the government **needs** is a comprehensive long-term strategy.\\"",
      "\\"**What** surprised the analysts **was** the speed of the market recovery.\\"",
      "\\"**What** she **did** was (to) fundamentally restructure the entire department.\\"",
      "Reverse pseudo-cleft: **The thing/All + that + clause + be/is + focus**",
      "\\"**All we need** is cooperation from all stakeholders to move forward.\\"",
    ]
  },
  {
    name: "Other Emphatic Structures",
    color: "amber",
    icon: "⚡",
    points: [
      "**Do/Does/Did + base verb** untuk penekanan dalam pernyataan positif:",
      "\\"I **do believe** that this proposal has genuine merit.\\"",
      "\\"She **does make** a compelling argument for regulatory reform.\\"",
      "**The + comparative, the + comparative**: \\"**The more** we invest in education, **the greater** the returns.\\"",
      "**So + adjective/adverb + that**: \\"**So complex** was the situation **that** no single solution could work.\\"",
      "Semua struktur ini umum dalam academic writing, debat, dan persuasive speech.",
    ]
  }
];`,
    examples: [
      `"**It was** the whistleblower's testimony **that** eventually brought down the corporation." → It-cleft for emphasis`,
      `"**What the research reveals** is a systematic disparity in educational outcomes." → What-cleft`,
      `"**All that is needed** to resolve the dispute is honest dialogue between both parties." → All-cleft`,
      `"She **did contribute** significantly to the project, despite later taking all the credit." → Do-emphatic`,
      `"**The more** resources we allocate to prevention, **the less** we spend on cure." → The more...the more`,
      `"**So widespread** was the corruption **that** even senior officials were implicated." → So + inversion`,
    ]
  },
  // L11: Participle Clauses
  11: {
    theory: `const THEORY: TheoryBlock[] = [
  {
    name: "Present Participle Clauses",
    color: "blue",
    icon: "🔵",
    points: [
      "Present participle clause (-ing) menggantikan koordinate/subordinate clause dengan subjek yang sama.",
      "**Menggantikan relative clause**: \\"The report **describing** the findings... (= which describes)\\"",
      "**Menggantikan adverbial clause (simultaneous)**: \\"**Working** overtime, she completed the project.\\"",
      "\\"**Knowing** the risks, the team decided to proceed with the experiment.\\"",
      "**Having + past participle** untuk aksi yang selesai lebih dulu:",
      "\\"**Having reviewed** all applications, the committee selected three candidates.\\"",
    ]
  },
  {
    name: "Past Participle Clauses",
    color: "indigo",
    icon: "🟣",
    points: [
      "Past participle clause (V3) digunakan untuk makna pasif dan kondisional.",
      "**Pasif**: \\"**Written** in 1859, Darwin's Origin of Species changed scientific thinking forever.\\"",
      "**Kondisional**: \\"**Given** appropriate resources, the team can achieve remarkable results.\\"",
      "\\"**Faced with** budget cuts, the department had to prioritise its programmes.\\"",
      "\\"**Based on** the available evidence, we can draw the following conclusions...\\"",
      "\\"**Compared with** last year's figures, the growth is significant.\\"",
    ]
  },
  {
    name: "Participle Clauses in Academic Writing",
    color: "green",
    icon: "✍️",
    points: [
      "Participle clauses membuat tulisan lebih padat, formal, dan sophisicated.",
      "**Cause**: \\"**Suffering from** severe budget constraints, the charity had to scale back its operations.\\"",
      "**Time**: \\"**After considering** all options, the board reached a unanimous decision.\\"",
      "**Condition**: \\"**If implemented** correctly, the strategy could yield significant returns.\\"",
      "Perhatikan: participle clause harus merujuk ke subjek utama kalimat (dangling participle = ERROR).",
      "❌ **Running** late, the meeting was rescheduled. → Who was running late?",
      "✅ **Running** late, we asked to reschedule the meeting.",
    ]
  }
];`,
    examples: [
      `"**Having analysed** the data, the researchers published their findings in a peer-reviewed journal." → Having + pp`,
      `"**Written** during a period of political upheaval, the novel reflects deep social tensions." → Past participle, passive`,
      `"**Faced with** rising operational costs, management was forced to consider redundancies." → Faced with`,
      `"**Based on** preliminary findings, we propose three possible explanations for the anomaly." → Based on (academic)`,
      `"The policy, **introduced** last year by the coalition government, has been widely praised." → Reduced relative, passive`,
      `"**Knowing** that time was limited, she focused only on the most critical issues." → Knowing (causal)`,
    ]
  },
  // L12: Articles Advanced
  12: {
    theory: `const THEORY: TheoryBlock[] = [
  {
    name: "The: Unique Reference & Generic Use",
    color: "blue",
    icon: "📌",
    points: [
      "**The** digunakan ketika pembicara dan pendengar sama-sama tahu referensi yang dimaksud.",
      "Unique referents: **the sun, the moon, the government, the internet, the environment**",
      "**The** dengan ordinal numbers dan superlatives: **the first, the best, the most, the largest**",
      "**The + adjective** untuk grup orang: **the rich, the elderly, the unemployed, the deceased**",
      "Generic **the** dengan instrumen musik: **playing the piano, mastering the violin**",
      "**The + nationality adjective** = people: **the British, the French, the Japanese**",
    ]
  },
  {
    name: "Zero Article: Key Patterns",
    color: "indigo",
    icon: "∅",
    points: [
      "**Tanpa artikel** untuk: abstract nouns, languages, academic subjects, sport, meals.",
      "Abstract: **Love, knowledge, justice, freedom** are fundamental human values.",
      "Languages: She speaks **Spanish** and **Mandarin** fluently.",
      "Subjects: He studied **economics** and **political science** at university.",
      "Sport/games: She excels at **chess** and plays **tennis** professionally.",
      "Meals: After **lunch**, the committee reconvened for the afternoon session.",
    ]
  },
  {
    name: "A vs The: Common B2 Errors",
    color: "red",
    icon: "⚠️",
    points: [
      "**A/An** = indefinite (baru diperkenalkan) | **The** = definite (sudah diketahui)",
      "\\"She wrote **a** report. **The** report revealed startling findings.\\" (→ second mention)",
      "No article with plural/uncountable first mention: \\"**Studies** show... / **Evidence** suggests...\\"",
      "Lembaga: **in hospital** (sedang dirawat) vs **in the hospital** (mengunjungi)",
      "**At school/work/home** (fungsi) vs **at the school/work/home** (tempat fisik)",
      "**By plane/train/car** (no article) vs **on the plane/train** (spesifik)",
    ]
  }
];`,
    examples: [
      `"**The** research conducted over **a** five-year period revealed unexpected correlations." → First vs second mention`,
      `"She has **a** degree in **economics** and **a** postgraduate qualification in **law**." → Zero article for subjects`,
      `"**The** elderly are disproportionately affected by social isolation during economic downturns." → The + adjective = group`,
      `"After **breakfast**, **the** meeting was immediately convened to address **the** crisis." → Zero article for meals`,
      `"He was admitted to **hospital** last week but is now back **at work**." → Fixed expressions without article`,
      `"**The** British have a complex relationship with **the** concept of national identity." → The + nationality`,
    ]
  },
  // L13: Ellipsis & Substitution
  13: {
    theory: `const THEORY: TheoryBlock[] = [
  {
    name: "Ellipsis: Omitting Repeated Elements",
    color: "blue",
    icon: "...",
    points: [
      "Ellipsis = menghilangkan kata-kata yang sudah jelas untuk menghindari repetisi.",
      "**Verb phrase ellipsis**: \\"She can play the piano and **[he can]** the violin, too.\\"",
      "**Auxiliary ellipsis**: \\"She has finished and so **has** he.\\"",
      "**Infinitive ellipsis**: \\"I didn't want to leave, but I had **to [leave]**.\\"",
      "**Comparative ellipsis**: \\"He is more experienced than I **[am experienced]**.\\"",
      "Ellipsis adalah tanda dari bahasa yang natural dan sophisticated — hindari repetisi berlebihan.",
    ]
  },
  {
    name: "Substitution: Replacing with Pro-forms",
    color: "indigo",
    icon: "🔄",
    points: [
      "Substitution = mengganti elemen kalimat dengan pro-form (so, not, do so, one/ones).",
      "**So** (mengganti klausa positif): \\"Will it rain? I think **so**.\\"",
      "**Not** (mengganti klausa negatif): \\"Will it rain? I hope **not**.\\"",
      "**Do so** = melakukan hal tersebut: \\"Please review the report when you have time to **do so**.\\"",
      "**One/Ones** = mengganti noun: \\"I need a new strategy — the **one** we have isn't working.\\"",
      "**Same** = substitusi dalam formal contexts: \\"Could you send the agenda? Yes, I will **do the same** for all attendees.\\"",
    ]
  },
  {
    name: "Advanced Cohesion Devices",
    color: "green",
    icon: "🔗",
    points: [
      "Ellipsis dan substitution adalah alat kohesi teks yang penting di level B2.",
      "**Reference**: mengacu ke orang/benda yang sudah disebutkan (pronouns, the, this, that, these, those)",
      "**Lexical cohesion**: sinonim, superordinat, general words (the problem, the issue, the phenomenon)",
      "\\"She submitted the proposal. **The document** was reviewed within 48 hours.\\"",
      "**Discourse markers** sebagai alat kohesi: however, moreover, consequently, as a result, in contrast",
      "Menggunakan teknik-teknik ini membuat teks terasa mengalir alami dan tidak repetitif.",
    ]
  }
];`,
    examples: [
      `"I wanted to attend the conference, but unfortunately wasn't able **to**." → Infinitive ellipsis`,
      `"A: Should we proceed with the merger? B: I think **so**, given the current market conditions." → So substitution`,
      `"The committee is free to modify the proposal if they see fit **to do so**." → Do so`,
      `"I need a more reliable system — the **one** currently in place has too many vulnerabilities." → One substitution`,
      `"She arrived late to the meeting; **the same** had happened last week." → Same in formal context`,
      `"Two solutions were proposed: **the former** addressed the short-term problem, **the latter** the systemic issue." → Former/Latter`,
    ]
  },
  // L14: Discourse Markers Advanced
  14: {
    theory: `const THEORY: TheoryBlock[] = [
  {
    name: "Contrastive Discourse Markers",
    color: "blue",
    icon: "↔️",
    points: [
      "**However / Nevertheless / Nonetheless**: strong contrast; formal; can begin a sentence.",
      "\\"Initial results were promising. **Nevertheless**, significant challenges remain.\\"",
      "**Whereas / While**: contrast within a single sentence (simultaneous contrast).",
      "\\"**Whereas** economic growth has been observed in urban areas, rural regions continue to decline.\\"",
      "**On the other hand / In contrast / By contrast**: comparing two different aspects.",
      "\\"Some researchers advocate increased regulation. **By contrast**, others argue for market-led solutions.\\"",
    ]
  },
  {
    name: "Addition & Elaboration Markers",
    color: "indigo",
    icon: "➕",
    points: [
      "**Furthermore / Moreover / In addition / Additionally**: adding information, increasingly formal.",
      "\\"The policy reduces costs. **Furthermore**, it improves staff retention across all levels.\\"",
      "**What is more**: emphasis on additional/surprising point: \\"**What is more**, the approach is entirely scalable.\\"",
      "**Not to mention / Let alone**: adds point that reinforces or intensifies:",
      "\\"He couldn't manage a team, **let alone** an entire division.\\"",
      "**Indeed / In fact**: introduce reinforcing information or surprising truth.",
      "\\"The results were good. **In fact**, they exceeded all previous benchmarks.\\"",
    ]
  },
  {
    name: "Causal & Resultative Markers",
    color: "amber",
    icon: "➡️",
    points: [
      "**Consequently / As a result / Therefore / Hence**: result of previous statement.",
      "\\"Funding was cut significantly. **Consequently**, several key projects were suspended.\\"",
      "**Given [noun/that]**: introduces reason or premise: \\"**Given** the evidence, this conclusion is unavoidable.\\"",
      "**In light of**: considering new information: \\"**In light of** recent findings, we must revise our position.\\"",
      "**Owing to / Due to**: formal cause: \\"**Owing to** the economic downturn, growth projections were revised downward.\\"",
      "**As a consequence of**: formal result linked to cause; common in academic writing.",
    ]
  }
];`,
    examples: [
      `"Initial trials showed promising results. **Nevertheless**, several concerns about scalability remain." → Nevertheless`,
      `"**Whereas** some economies have recovered rapidly, others continue to struggle with structural unemployment." → Whereas`,
      `"The company reduced its carbon output by 20%. **Furthermore**, it achieved this while maintaining profitability." → Furthermore`,
      `"**In light of** the new data, the research team was forced to revisit its initial assumptions." → In light of`,
      `"He lacked basic communication skills, **let alone** the ability to lead a cross-functional team." → Let alone`,
      `"**Owing to** persistent inflationary pressure, the central bank raised interest rates for the fourth consecutive time." → Owing to`,
    ]
  },
  // L15: Nominalization
  15: {
    theory: `const THEORY: TheoryBlock[] = [
  {
    name: "What is Nominalization?",
    color: "blue",
    icon: "📝",
    points: [
      "Nominalization = mengubah verba atau adjektiva menjadi nomina untuk gaya formal.",
      "Verba → Nomina: **decide → decision | develop → development | suggest → suggestion**",
      "Adjektiva → Nomina: **equal → equality | diverse → diversity | stable → stability**",
      "**Affix patterns**: -tion/-sion, -ment, -ance/-ence, -ity, -ness, -al, -ure, -age",
      "Nominalization memungkinkan informasi padat disampaikan dalam frasa nominal.",
      "Gunakan nominalization untuk menciptakan nada objektif dalam laporan dan esai akademik.",
    ]
  },
  {
    name: "Benefits & Patterns of Nominalization",
    color: "indigo",
    icon: "✨",
    points: [
      "Nominal style menciptakan kalimat yang lebih padat dan formal:",
      "Verbal: \\"They **decided** to **investigate** the problem slowly.\\"",
      "Nominal: \\"**The decision** to **conduct an investigation** was made in stages.\\"",
      "Membuat subjek abstrak dan proses terasa lebih formal dan akademik.",
      "Common verb → noun: **implement → implementation | assess → assessment | analyse → analysis**",
      "Common adj → noun: **significant → significance | relevant → relevance | aware → awareness**",
    ]
  },
  {
    name: "Nominalization in Academic Writing",
    color: "green",
    icon: "📚",
    points: [
      "Academic writing menggunakan nominalization secara ekstensif untuk presisi.",
      "\\"**The implementation** of the new policy led to **a reduction** in urban crime rates.\\"",
      "\\"**The establishment** of clear guidelines is essential for effective governance.\\"",
      "\\"**An understanding** of the complexity involved is required before conclusions are drawn.\\"",
      "Hindari nominalization berlebihan yang membuat kalimat terlalu berat dan tidak natural.",
      "Seimbangkan antara nominal dan verbal style untuk keterbacaan yang optimal.",
    ]
  }
];`,
    examples: [
      `"**The implementation** of the reform required considerable political will and public support." → implement → implementation`,
      `"**The development** of artificial intelligence poses both opportunities and risks for society." → develop → development`,
      `"**An assessment** of the long-term environmental impact was commissioned by the government." → assess → assessment`,
      `"**The significance** of this discovery cannot be overstated given its implications for medicine." → significant → significance`,
      `"**The establishment** of international norms is critical for managing cross-border challenges." → establish → establishment`,
      `"**A thorough analysis** of the data revealed patterns that contradicted the initial hypothesis." → analyse → analysis`,
    ]
  },
  // L16: Comparative Structures
  16: {
    theory: `const THEORY: TheoryBlock[] = [
  {
    name: "Advanced Comparative Patterns",
    color: "blue",
    icon: "📊",
    points: [
      "**The + comparative, the + comparative**: \\"**The more** you practise, **the more** proficient you become.\\"",
      "**Comparative + than expected/anticipated**: \\"Results were **more positive than** initially **anticipated**.\\"",
      "**No + comparative + than**: \\"There is **no better** time **than** now to address climate change.\\"",
      "**Far/Much/Significantly + comparative**: \\"The impact was **far greater than** the models predicted.\\"",
      "**Not nearly as + adjective + as**: \\"The recovery was **not nearly as rapid as** economists had hoped.\\"",
      "**Twice/Three times as + adjective + as**: \\"The new engine is **twice as efficient as** its predecessor.\\"",
    ]
  },
  {
    name: "Superlative Structures",
    color: "indigo",
    icon: "🏆",
    points: [
      "Superlatives mark extremity within a defined group:",
      "\\"**By far the most significant** factor in the outcome was the lack of oversight.\\"",
      "\\"This is **easily the most complex** piece of legislation introduced this decade.\\"",
      "**One of the + superlative + plural noun**: A common and accurate superlative construction.",
      "\\"**One of the greatest** challenges facing modern democracies is misinformation.\\"",
      "**Relative superlative with ever**: \\"It was **the worst crisis** the country **had ever** experienced.\\"",
      "**Little/Less/Least** superlatives: \\"This is the **least viable** option on the table.\\"",
    ]
  },
  {
    name: "Comparative Structures for Analysis",
    color: "amber",
    icon: "🔍",
    points: [
      "Use comparative structures to express nuanced analytical points.",
      "\\"While A is important, B is arguably **even more** critical in the long run.\\"",
      "\\"Rather than pursue short-term gains, the board chose a **far less** risky strategy.\\"",
      "**In comparison with / compared with / relative to**: formal comparative phrases:",
      "\\"**Compared with** the previous year, revenue grew by 12%.\\"",
      "\\"**Relative to** its size, the country has **a disproportionately large** defence budget.\\"",
    ]
  }
];`,
    examples: [
      `"**The more** investment flows into renewable infrastructure, **the less** dependent we become on fossil fuels." → Double comparative`,
      `"The policy proved **far more effective than** sceptics had predicted at its introduction." → Far more...than`,
      `"**One of the most pressing** challenges facing global health systems is antibiotic resistance." → One of the most`,
      `"**Compared with** its regional peers, the economy showed considerably stronger resilience." → Compared with`,
      `"**By far the most significant** development of the decade was the widespread adoption of AI." → By far the most`,
      `"The outcome was **not nearly as severe as** the initial projections had suggested." → Not nearly as...as`,
    ]
  },
  // L17: Quantifiers Advanced
  17: {
    theory: `const THEORY: TheoryBlock[] = [
  {
    name: "Quantifiers with Countable & Uncountable Nouns",
    color: "blue",
    icon: "🔢",
    points: [
      "**Both / Each / Every / Either / Neither**: specific use with countable nouns.",
      "**Both** (two items, positive): \\"**Both** proposals have considerable merit.\\"",
      "**Either** (one or the other): \\"**Either** solution could work effectively.\\"",
      "**Neither** (not one nor the other): \\"**Neither** approach proved sustainable long-term.\\"",
      "**Each / Every**: each emphasizes individuals; every emphasizes totality.",
      "\\"**Each** team member was assigned specific responsibility.\\" vs \\"**Every** attempt failed.\\"",
    ]
  },
  {
    name: "Broad & Proportional Quantifiers",
    color: "indigo",
    icon: "📊",
    points: [
      "**The majority / A minority / A proportion / A significant number of + plural**",
      "\\"**The majority of** respondents indicated support for the proposed changes.\\"",
      "\\"**A significant proportion of** the budget was allocated to research and development.\\"",
      "**Much / Little** (uncountable): \\"**Much** of the analysis was based on preliminary figures.\\"",
      "**Many / Few / Several / Numerous**: \\"**Numerous** studies have confirmed this finding.\\"",
      "**A great deal of / A large amount of**: formal for large uncountable quantities.",
    ]
  },
  {
    name: "Partitive & Approximating Expressions",
    color: "amber",
    icon: "🔍",
    points: [
      "Partitive expressions: **a quantity/number/range/variety/series/set of...**",
      "\\"**A range of** innovative solutions was proposed during the brainstorming session.\\"",
      "\\"**A series of** policy failures contributed to the erosion of public trust.\\"",
      "Approximators: **approximately, roughly, around, some, about, nearly, almost**",
      "\\"**Approximately** 40% of participants reported significant improvement in symptoms.\\"",
      "\\"**Some** researchers argue that the causal link has not yet been conclusively proven.\\"",
    ]
  }
];`,
    examples: [
      `"**The majority of** economists surveyed anticipated a gradual reduction in inflationary pressure." → Majority of`,
      `"**A significant proportion of** the company's revenue now derives from emerging markets." → A proportion of`,
      `"**Neither** the government's stimulus package **nor** the monetary policy has proven sufficient." → Neither...nor`,
      `"**A series of** administrative errors led to the complete breakdown of the procurement process." → A series of`,
      `"**Numerous** longitudinal studies have demonstrated a clear correlation between diet and cognitive decline." → Numerous`,
      `"**Approximately** three-quarters of respondents indicated they would welcome stricter environmental regulation." → Approximately`,
    ]
  },
  // L18: Conjunctions B2
  18: {
    theory: `const THEORY: TheoryBlock[] = [
  {
    name: "Subordinating Conjunctions: Concession & Contrast",
    color: "blue",
    icon: "↔️",
    points: [
      "**Although / Even though / Though**: introduce concessive clauses (despite the fact that).",
      "\\"**Although** the evidence is compelling, further investigation is warranted.\\"",
      "\\"**Even though** she had extensive experience, the role required additional training.\\"",
      "**While / Whereas**: contrast two simultaneous or parallel ideas.",
      "\\"**While** urban unemployment has fallen, rural areas continue to face economic hardship.\\"",
      "**Despite / In spite of** + noun/gerund (NOT + clause): \\"**Despite** the obstacles, progress was made.\\"",
    ]
  },
  {
    name: "Conjunctions for Cause & Condition",
    color: "indigo",
    icon: "🔗",
    points: [
      "**Since / As / Given that**: introduce cause or reason in formal contexts.",
      "\\"**Since** the proposal was incomplete, the committee deferred its decision.\\"",
      "\\"**As** resources are limited, priorities must be clearly established.\\"",
      "**Provided (that) / Providing (that) / As long as / On condition that**: conditional.",
      "\\"The project will proceed **provided that** funding is secured by the end of the quarter.\\"",
      "**Unless**: conditional negative — \\"**Unless** all parties agree, the deal cannot be finalised.\\"",
    ]
  },
  {
    name: "Multi-word Conjunctions & Correlatives",
    color: "amber",
    icon: "🔑",
    points: [
      "Correlative conjunctions: **both...and | either...or | neither...nor | not only...but also**",
      "\\"**Both** the methodology **and** the analysis require revision before submission.\\"",
      "\\"The report was **not only** poorly written **but also** factually inaccurate.\\"",
      "**Whether...or**: \\"**Whether** the economy recovers quickly **or** slowly, reform is essential.\\"",
      "Multi-word: **as a result of / in order to / so as to / for the purpose of**",
      "\\"Regulations were introduced **in order to** prevent further environmental damage.\\"",
    ]
  }
];`,
    examples: [
      `"**Although** overall crime rates have fallen, violent crime in urban centres continues to rise." → Although (concession)`,
      `"The initiative will be launched **provided that** all safety protocols are approved by month end." → Provided that`,
      `"The findings apply **not only** to children **but also** to the adult population in similar circumstances." → Not only...but also`,
      `"**Since** the original data cannot be verified, the conclusions of the study are called into question." → Since (reason)`,
      `"**Whether** the policy succeeds **or** fails will depend largely on public engagement and compliance." → Whether...or`,
      `"**In order to** ensure accuracy, all calculations must be independently verified by a third party." → In order to`,
    ]
  },
  // L19: Error Recognition
  19: {
    theory: `const THEORY: TheoryBlock[] = [
  {
    name: "Agreement Errors at B2 Level",
    color: "red",
    icon: "⚠️",
    points: [
      "**Subject-verb agreement** errors with complex subjects:",
      "Collective nouns: \\"The committee **has** (not have) reached a decision.\\" (UK: have also possible)",
      "Quantifiers: \\"**Neither** of the proposals **was** (not were) adequate.\\"",
      "Relative clause interruptions: \\"The report that **was** (not were) submitted by the three teams...\\"",
      "Inverted structures: \\"**There is** considerable evidence (not there are considerable evidence)\\"",
      "**Noun/verb forms**: common errors — \\"The government **is looking** into the issue (not looks into)\\"",
    ]
  },
  {
    name: "Tense & Aspect Errors",
    color: "indigo",
    icon: "⏱️",
    points: [
      "**Present Perfect vs Past Simple errors**:",
      "❌ \\"Yesterday, she **has submitted** the report.\\" (yesterday → Past Simple)",
      "✅ \\"Yesterday, she **submitted** the report.\\"",
      "❌ \\"I **saw** him three times this week.\\" (this week = ongoing → Present Perfect)",
      "✅ \\"I **have seen** him three times this week.\\"",
      "**Conditional tense errors**: mixing Type 2 and 3: ❌ \\"If I would know...\\" → ✅ \\"If I knew/had known...\\"",
    ]
  },
  {
    name: "Preposition & Collocation Errors",
    color: "amber",
    icon: "🔍",
    points: [
      "Preposition errors are a major source of B2 learner mistakes:",
      "**Dependent prepositions**: \\"interested **in**\\" / \\"responsible **for**\\" / \\"capable **of**\\"",
      "❌ \\"She is responsible **of** the project.\\" → ✅ \\"She is responsible **for** the project.\\"",
      "❌ \\"He insisted **about** leaving.\\" → ✅ \\"He insisted **on** leaving.\\"",
      "**Collocation errors**: word combinations that native speakers expect:",
      "\\"**make** a decision / **take** a decision (both possible in formal English)\\"",
      "❌ \\"He did a serious mistake.\\" → ✅ \\"He **made** a serious mistake.\\"",
    ]
  }
];`,
    examples: [
      `❌ "The data shows that pollution *have* increased." → ✅ "The data **shows** (uncountable) / the data points **show** (plural)"`,
      `❌ "She has submitted the report yesterday." → ✅ "She **submitted** the report yesterday." (specific past time)`,
      `❌ "If the policy would be clearer, implementation would have been easier." → ✅ "If the policy **were** clearer..." (Type 2)`,
      `❌ "The government is responsible of the outcome." → ✅ "The government is responsible **for** the outcome."`,
      `❌ "This research makes clear evidences for the theory." → ✅ "This research **provides clear evidence** for the theory."`,
      `❌ "Neither the CEO nor the board were informed." → ✅ "Neither the CEO nor the board **was** informed." (singular)`,
    ]
  },
  // L20: Grammar Review & Application
  20: {
    theory: `const THEORY: TheoryBlock[] = [
  {
    name: "B2 Grammar: Integrated Review",
    color: "blue",
    icon: "🎓",
    points: [
      "Pada level B2, Anda diharapkan mampu menggunakan grammar dengan akurasi tinggi dalam konteks kompleks.",
      "**Perfect Tenses**: menggunakan present, past, dan future perfect dengan ketepatan tense.",
      "**Conditionals**: tipe 2, 3, dan mixed conditionals; inversion conditional formal.",
      "**Passive Voice**: semua tense; passive reporting verbs; passive + infinitive.",
      "**Modal Verbs**: epistemic modals (must/can't/might have + pp) untuk deduksi dan spekulasi.",
      "**Subjunctive**: mandative subjunctive setelah suggest/recommend/essential that...",
    ]
  },
  {
    name: "Advanced B2 Structures",
    color: "indigo",
    icon: "🔑",
    points: [
      "**Inversion**: after negative adverbials (never, rarely, not only, no sooner, hardly).",
      "**Cleft Sentences**: it-cleft (It was X that...) dan what-cleft (What I need is...).",
      "**Participle Clauses**: having + pp (prior action); past participle (passive/conditional).",
      "**Relative Clauses**: defining vs non-defining; preposition + relative pronoun; quantifiers + relative.",
      "**Nominalization**: verb/adj → noun for formal, academic register.",
      "**Comparative**: double comparative (the more...the more); as/not as...as; far/much + comparative.",
    ]
  },
  {
    name: "Register & Style at B2 Level",
    color: "green",
    icon: "✍️",
    points: [
      "**Register** = kesesuaian antara bahasa dengan konteks dan audiens.",
      "Academic/formal registers menggunakan: passive voice, nominalization, hedging modals, complex conjunctions.",
      "**Hedging language**: \\"It may be argued that... / This could suggest... / Evidence appears to indicate...\\"",
      "**Discourse markers**: consequently, nevertheless, furthermore, in contrast, in light of, given that...",
      "Praktikkan semua struktur ini dalam integrated tasks: essay writing, formal speaking, listening comprehension.",
      "B2 grammar mastery = akurasi + ketepatan konteks + variasi struktur + kohesi teks.",
    ]
  }
];`,
    examples: [
      `"**It is widely believed that** increasing investment in education yields the highest long-term social returns." → Reporting passive`,
      `"**Having considered** all available evidence, the committee unanimously endorsed the proposal." → Perfect participle`,
      `"**Not only** did the policy reduce emissions, **but** it **also** stimulated green technology investment." → Inversion`,
      `"**What the data suggest** is a correlation, not a causal relationship — further research is needed." → What-cleft`,
      `"The reform, **widely regarded as** transformative, was implemented after decades of advocacy." → Reduced relative (passive)`,
      `"**The more** transparent the process becomes, **the greater** public confidence in the outcome will be." → Double comparative`,
    ]
  }
};

function escapeForRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function buildTHEORYStr(theory) {
  return theory;
}

function buildEXAMPLESStr(examples) {
  const items = examples.map(e => `  "${e.replace(/"/g, '\\"')}"`).join(',\n');
  return `const EXAMPLES: string[] = [\n${items}\n];`;
}

let successCount = 0;
let errorCount = 0;

for (let lessonNum = 1; lessonNum <= 20; lessonNum++) {
  const lessonFile = path.join(BASE, `Lesson${lessonNum}.tsx`);
  if (!fs.existsSync(lessonFile)) {
    console.log(`⚠️  Lesson${lessonNum}.tsx not found, skipping.`);
    continue;
  }

  const enh = ENHANCEMENTS[lessonNum];
  if (!enh) {
    console.log(`ℹ️  No enhancement for Lesson${lessonNum}, skipping.`);
    continue;
  }

  let content = fs.readFileSync(lessonFile, 'utf8');
  let changed = false;

  // Replace THEORY if provided
  if (enh.theory) {
    // Match from 'const THEORY' to the closing '];' of the array
    const theoryRegex = /const THEORY: TheoryBlock\[\] = \[[\s\S]*?\];/;
    if (theoryRegex.test(content)) {
      content = content.replace(theoryRegex, enh.theory);
      changed = true;
      console.log(`  ✅ Replaced THEORY in Lesson${lessonNum}`);
    } else {
      console.log(`  ⚠️  Could not find THEORY in Lesson${lessonNum}`);
    }
  }

  // Replace EXAMPLES if provided
  if (enh.examples) {
    const examplesStr = buildEXAMPLESStr(enh.examples);
    const examplesRegex = /const EXAMPLES: string\[\] = \[[\s\S]*?\];/;
    if (examplesRegex.test(content)) {
      content = content.replace(examplesRegex, examplesStr);
      changed = true;
      console.log(`  ✅ Replaced EXAMPLES in Lesson${lessonNum}`);
    } else {
      console.log(`  ⚠️  Could not find EXAMPLES in Lesson${lessonNum}`);
    }
  }

  if (changed) {
    fs.writeFileSync(lessonFile, content, 'utf8');
    console.log(`✅ Lesson${lessonNum} enhanced successfully.`);
    successCount++;
  } else {
    console.log(`ℹ️  Lesson${lessonNum}: no changes made.`);
  }
}

console.log(`\n🎯 Grammar Enhancement Complete: ${successCount} lessons enhanced, ${errorCount} errors.`);
