import type { MandarinLevelId, MandarinSkillId } from './mandarinModuleData';

export type MandarinLesson = {
  skillId: MandarinSkillId;
  title: string;
  subtitle: string;
  objective: string;
  focus: string[];
  explanation: string[];
  patterns: Array<{ label: string; hanzi: string; pinyin: string; meaning: string }>;
  vocabulary: Array<{ hanzi: string; pinyin: string; meaning: string }>;
  examples: Array<{ hanzi: string; pinyin: string; meaning: string }>;
  productionSteps: string[];
  practice: Array<{ question: string; options: string[]; answer: string }>;
  modelOutput?: {
    title: string;
    hanzi: string;
    pinyin: string;
    meaning: string;
  };
  rubric?: string[];
  task: string;
};

const levelMeta: Record<MandarinLevelId, { code: string; name: string; complexity: string }> = {
  beginner: { code: 'HSK 1', name: 'Beginner', complexity: 'frasa dasar, pinyin, nada, dan kalimat sangat pendek' },
  elementary: { code: 'HSK 2', name: 'Elementary', complexity: 'kalimat harian, waktu, tempat, kebutuhan, dan respons sederhana' },
  intermediate: { code: 'HSK 3', name: 'Intermediate', complexity: 'narasi familiar, opini dasar, konektor, dan percakapan rutin' },
  'upper-intermediate': { code: 'HSK 4', name: 'Upper-Intermediate', complexity: 'teks menengah, argumen sederhana, perbandingan, dan ekspresi natural' },
  advanced: { code: 'HSK 5', name: 'Advanced', complexity: 'berita, opini, tulisan formal, kosakata abstrak, dan diskusi kompleks' },
  proficiency: { code: 'HSK 6', name: 'Proficiency', complexity: 'wacana kompleks, idiom, nuansa, presentasi profesional, dan sintesis gagasan' },
  'hsk-7': { code: 'HSK 7', name: 'Expert', complexity: 'wacana akademik, sintesis lintas teks, seminar, kritik argumen, dan register formal' },
  'hsk-8': { code: 'HSK 8', name: 'Scholar', complexity: 'analisis riset, policy paper, debat profesional, abstraksi tinggi, dan penulisan akademik' },
  'hsk-9': { code: 'HSK 9', name: 'Mastery', complexity: 'komunikasi akademik native-like, retorika ahli, kritik sumber, dan sintesis multidisipliner' },
};

const topics: Record<string, any[]> = {
  grammar: [
    'Word order SVO', 'Question particle 吗', 'Negation 不 and 没', 'Measure words 个 and 本', 'Possession with 的',
    'Time before verb', 'Location with 在', 'Existence with 有', 'Adjective predicate', 'Serial verbs',
    'Aspect particle 了', 'Experience particle 过', 'Progressive 在', 'Comparison 比', 'Degree complement 得',
    'Result complement', '把 sentence basics', '被 passive basics', 'Condition 如果...就...', 'Grammar review portfolio',
  ],
  speaking: [
    'Greetings and name', 'Nationality and language', 'Family introduction', 'Ordering drinks', 'Asking prices',
    'Daily routine', 'Making appointments', 'Asking directions', 'Shopping roleplay', 'Restaurant conversation',
    'Talking about hobbies', 'Describing weather', 'Discussing study plans', 'Giving simple opinions', 'Solving small problems',
    'Travel conversation', 'Phone call practice', 'Short presentation', 'Interview practice', 'Speaking portfolio',
  ],
  listening: [
    'Tone recognition', 'Numbers and dates', 'Names and countries', 'Classroom instructions', 'Family audio',
    'Shopping audio', 'Restaurant audio', 'Time and schedule', 'Transportation audio', 'Weather report',
    'Hobby dialogue', 'School conversation', 'Work routine', 'Travel announcement', 'Opinion keywords',
    'Short story audio', 'Two-speaker dialogue', 'Key detail listening', 'Summary listening', 'Listening portfolio',
  ],
  reading: [
    'Pinyin and Hanzi match', 'Basic signs', 'Personal profile', 'Family text', 'Daily schedule',
    'Menu reading', 'Shopping receipt', 'Simple message', 'Directions text', 'Weather note',
    'Short diary', 'Invitation card', 'School announcement', 'Travel note', 'Opinion paragraph',
    'Mini story', 'Comparison text', 'Information page', 'Reading strategy', 'Reading portfolio',
  ],
  writing: [
    'Stroke order basics', 'Write numbers and dates', 'Self-introduction', 'Family paragraph', 'Daily routine',
    'Short message', 'Shopping list', 'Invitation reply', 'Direction note', 'Weather description',
    'Hobby paragraph', 'Study plan', 'Travel plan', 'Opinion sentence', 'Problem solution',
    'Mini diary', 'Email basics', 'Summary writing', 'Revision practice', 'Writing portfolio',
  ],
  vocabulary: [
    'Pronouns and people', 'Countries and languages', 'Family words', 'Numbers and money', 'Food and drinks',
    'Time words', 'Places in town', 'Transportation', 'Weather and seasons', 'School words',
    'Work words', 'Hobbies', 'Shopping words', 'Health basics', 'Travel words',
    'Opinion words', 'Connectors', 'Adjectives', 'Common verbs', 'Vocabulary portfolio',
  ],
  pronunciation: [
    'Four tones', 'Neutral tone', 'Initials b p m f', 'Initials d t n l', 'Initials g k h',
    'J q x sounds', 'Zh ch sh r sounds', 'Z c s sounds', 'Finals a o e', 'Finals ai ei ao ou',
    'Finals an en ang eng', 'Ü sound', 'Third tone sandhi', 'Bu tone sandhi', 'Yi tone sandhi',
    'Tone pairs', 'Sentence stress', 'Shadowing dialogue', 'Reading aloud', 'Pronunciation portfolio',
  ],
  'hsk-7': [
    { hanzi: '学术语境', pinyin: 'xue shu yu jing', meaning: 'konteks akademik' },
    { hanzi: '跨文本综合', pinyin: 'kua wen ben zong he', meaning: 'sintesis lintas teks' },
    { hanzi: '理论视角', pinyin: 'li lun shi jiao', meaning: 'perspektif teori' },
    { hanzi: '论证有效性', pinyin: 'lun zheng you xiao xing', meaning: 'validitas argumen' },
    { hanzi: '概念界定', pinyin: 'gai nian jie ding', meaning: 'definisi konsep' },
    { hanzi: '反例', pinyin: 'fan li', meaning: 'counterexample' },
    { hanzi: '语域', pinyin: 'yu yu', meaning: 'register bahasa' },
    { hanzi: '推理链', pinyin: 'tui li lian', meaning: 'rantai penalaran' },
  ],
  'hsk-8': [
    { hanzi: '研究范式', pinyin: 'yan jiu fan shi', meaning: 'paradigma riset' },
    { hanzi: '政策含义', pinyin: 'zheng ce han yi', meaning: 'implikasi kebijakan' },
    { hanzi: '方法论', pinyin: 'fang fa lun', meaning: 'metodologi' },
    { hanzi: '实证依据', pinyin: 'shi zheng yi ju', meaning: 'bukti empiris' },
    { hanzi: '规范性判断', pinyin: 'gui fan xing pan duan', meaning: 'penilaian normatif' },
    { hanzi: '可推广性', pinyin: 'ke tui guang xing', meaning: 'generalisabilitas' },
    { hanzi: '批判框架', pinyin: 'pi pan kuang jia', meaning: 'kerangka kritik' },
    { hanzi: '知识生产', pinyin: 'zhi shi sheng chan', meaning: 'produksi pengetahuan' },
  ],
  'hsk-9': [
    { hanzi: '原创性论点', pinyin: 'yuan chuang xing lun dian', meaning: 'argumen orisinal' },
    { hanzi: '跨学科综合', pinyin: 'kua xue ke zong he', meaning: 'sintesis multidisipliner' },
    { hanzi: '修辞控制', pinyin: 'xiu ci kong zhi', meaning: 'kontrol retorika' },
    { hanzi: '概念重构', pinyin: 'gai nian chong gou', meaning: 'rekonstruksi konsep' },
    { hanzi: '话语分析', pinyin: 'hua yu fen xi', meaning: 'analisis wacana' },
    { hanzi: '学术贡献', pinyin: 'xue shu gong xian', meaning: 'kontribusi akademik' },
    { hanzi: '元分析', pinyin: 'yuan fen xi', meaning: 'meta-analisis' },
    { hanzi: '范式转换', pinyin: 'fan shi zhuan huan', meaning: 'pergeseran paradigma' },
  ],
};

const beginnerTopics: Record<MandarinSkillId, string[]> = {
  grammar: [
    'Basic word order: 我 + 是 + ...', 'Yes/no questions with 吗', 'Negation with 不', 'Name sentences with 叫', 'Nationality with 是...人',
    'Possession with 的', 'Numbers in simple sentences', 'Measure word 个', 'This and that: 这 / 那', 'Plural pronoun 们',
    'Have/there is with 有', 'Want with 想', 'Like with 喜欢', 'Time word 今天', 'Location with 在',
    'Question words 谁 and 什么', 'How many with 几', 'Adjective predicate 很好', 'Simple request 请', 'HSK 1 grammar review',
  ],
  speaking: [
    'Say hello and goodbye', 'Say your name', 'Ask someone name', 'Say nationality', 'Introduce family',
    'Say phone number', 'Ask simple price', 'Order tea or coffee', 'Say what you like', 'Talk about today',
    'Ask time', 'Say where you are', 'Ask where something is', 'Say you want something', 'Classroom phrases',
    'Apologize and thank someone', 'Ask yes/no questions', 'Short self-introduction', 'Mini dialogue with friend', 'HSK 1 speaking review',
  ],
  listening: [
    'Hear the four tones', 'Hear hello and goodbye', 'Hear names', 'Hear countries', 'Hear numbers 0-10',
    'Hear phone numbers', 'Hear family words', 'Hear tea, water, coffee', 'Hear yes/no questions', 'Hear 不 in sentences',
    'Hear time words', 'Hear location words', 'Hear 谁 and 什么', 'Hear 几 and 多少', 'Hear classroom commands',
    'Hear short shopping dialogue', 'Hear short family dialogue', 'Hear simple self-introduction', 'Hear mini conversation', 'HSK 1 listening review',
  ],
  reading: [
    'Read basic pinyin', 'Match Hanzi and pinyin', 'Read 你好 and 再见', 'Read pronouns 我你他', 'Read 是 and 不',
    'Read numbers 一到十', 'Read family Hanzi', 'Read food and drink words', 'Read date words 今天明天', 'Read question particle 吗',
    'Read simple name card', 'Read classroom signs', 'Read a short SMS', 'Read a mini menu', 'Read simple price',
    'Read location sentence', 'Read 3-sentence profile', 'Read a simple invitation', 'Read mini dialogue', 'HSK 1 reading review',
  ],
  writing: [
    'Write pinyin with tone marks', 'Write basic strokes', 'Write 一二三十', 'Write 我 and 你', 'Write 是 and 不',
    'Write name sentence', 'Write nationality sentence', 'Write family words', 'Write numbers and date', 'Write 这 and 那',
    'Write short greeting', 'Write simple question with 吗', 'Write 我喜欢...', 'Write 我想...', 'Write location sentence',
    'Write 3 self-introduction sentences', 'Write short SMS', 'Write mini shopping note', 'Write 5-sentence profile', 'HSK 1 writing review',
  ],
  vocabulary: [
    'Pronouns 我你他', 'Greetings 你好再见', 'Polite words 谢谢不客气', 'Countries and people', 'Numbers 0-10',
    'Family words', 'Food and drinks', 'School objects', 'Time words', 'Days and today',
    'Question words', 'Basic verbs', 'Like and want', 'Places', 'Money and price',
    'Adjectives 好大小', 'Classroom phrases', 'Common measure words', 'Mini HSK 1 word set', 'HSK 1 vocabulary review',
  ],
  pronunciation: [
    'Tone 1 high flat', 'Tone 2 rising', 'Tone 3 dipping', 'Tone 4 falling', 'Neutral tone',
    'Tone pairs 1-1 and 1-4', 'Tone pairs 2-2 and 2-4', 'Third tone sandhi basics', 'Pinyin initials b p m f', 'Pinyin initials d t n l',
    'Pinyin initials g k h', 'Finals a o e', 'Finals i u ü', 'Finals ai ei ao ou', 'Finals an en ang eng',
    'Syllable ni hao', 'Syllable xie xie', 'Read name slowly', 'Shadowing mini dialogue', 'HSK 1 pronunciation review',
  ],
};

const advancedTopics: Record<MandarinSkillId, string[]> = {
  grammar: [
    'Concession with 尽管...仍然...', 'Two-sided analysis 一方面...另一方面...', 'Reason emphasis 之所以...是因为...', 'Perspective phrase 从...角度来看', 'Formal causality 由于...因此...',
    'Contrast 然而 and 相反', 'Abstract nominal phrases', 'Degree and scope 限于 / 取决于', 'Passive nuance 受到...影响', 'Comparison beyond 比',
    'Condition and consequence 只要 / 除非', 'Emphasis 并非...而是...', 'Cause chain 导致 / 促进 / 反映', 'Evaluation 值得 / 有必要', 'Formal sequence 首先 / 其次 / 此外',
    'Counterargument 虽然如此...', 'Inference 可见 / 可推断', 'Register shift spoken vs written', 'Complex sentence editing', 'HSK 5 grammar portfolio',
  ],
  speaking: [
    'Urban lifestyle analysis', 'Technology ethics debate', 'Education reform opinion', 'Workplace culture presentation', 'Environmental policy discussion',
    'Media literacy response', 'Consumer behaviour argument', 'Mental health and balance', 'Cultural identity talk', 'Economic trend briefing',
    'Public transport proposal', 'AI and jobs debate', 'Aging society response', 'Online learning evaluation', 'Volunteerism presentation',
    'Career planning interview', 'Abstract essay oral summary', 'Formal meeting opinion', 'Advanced Q&A repair', 'HSK 5 speaking portfolio',
  ],
  listening: [
    'Identify implied stance', 'Follow two-sided argument', 'Catch concession and contrast', 'Recognise evidence cues', 'Summarise formal talk',
    'News commentary listening', 'Interview with abstract vocabulary', 'Lecture-style sequence markers', 'Policy discussion audio', 'Business meeting audio',
    'Media bias listening', 'Data and trend interpretation', 'Problem-solution talk', 'Opinion shift in dialogue', 'Rhetorical question recognition',
    'Fast natural speech chunks', 'Inference from tone', 'Long audio note-taking', 'Summary from multiple points', 'HSK 5 listening portfolio',
  ],
  reading: [
    'Find thesis in essay', 'Separate fact and opinion', 'Identify counterargument', 'Infer author attitude', 'Read social phenomenon text',
    'Read technology commentary', 'Read education opinion', 'Read workplace article', 'Read environmental report', 'Read media literacy text',
    'Read consumer behaviour article', 'Read health and society text', 'Read cultural identity essay', 'Read economic trend paragraph', 'Read policy proposal',
    'Track cohesion and reference', 'Infer from context', 'Summarise abstract essay', 'Compare two viewpoints', 'HSK 5 reading portfolio',
  ],
  writing: [
    'Formal essay opening', 'Balanced argument paragraph', 'Evidence and example paragraph', 'Counterargument and concession', 'Conclusion with synthesis',
    'Urbanisation essay', 'Technology ethics essay', 'Education reform essay', 'Workplace culture essay', 'Environment policy essay',
    'Media literacy essay', 'Consumer behaviour essay', 'Mental health essay', 'Cultural identity essay', 'Economic trend essay',
    'Formal email and proposal', 'Summary writing from reading', 'Edit for cohesion', 'Advanced transition practice', 'HSK 5 writing portfolio',
  ],
  vocabulary: [
    'Abstract nouns and values', 'Society and policy words', 'Technology and ethics words', 'Education reform words', 'Workplace and efficiency words',
    'Environment and responsibility words', 'Media and bias words', 'Consumer and brand words', 'Health and pressure words', 'Culture and identity words',
    'Economy and trend words', 'Transport and city words', 'AI and regulation words', 'Aging society words', 'Volunteerism words',
    'Career planning words', 'Argument connectors', 'Evaluation adjectives', 'Formal collocations', 'HSK 5 vocabulary portfolio',
  ],
  pronunciation: [
    'Prosody in long sentences', 'Rhetorical pause after topic phrase', 'Concession intonation', 'Contrast stress', 'Abstract phrase rhythm',
    'Formal presentation flow', 'News-style reading aloud', 'Chunking with 一方面/另一方面', 'Emphasis with 并非/而是', 'Conclusion intonation',
    'Tone stability in 4-clause sentences', 'Natural speed shadowing', 'Repair and self-correction', 'Data and percentage rhythm', 'Formal Q&A intonation',
    'Stress key nouns', 'Reduce Indonesian accent patterns', 'Paragraph-level reading', '2-minute speech recording', 'HSK 5 pronunciation portfolio',
  ],
};

const proficiencyTopics: Record<MandarinSkillId, string[]> = {
  grammar: [
    'Nuanced concession 即便...也...', 'Counterfactual nuance 要不是...就...', 'Idiomatic argument structures', 'Nominalisation in formal discourse', 'Rhetorical contrast 与其说...不如说...',
    'Causal layering 并非由于...而是由于...', 'Implicit subject and ellipsis', 'Advanced passive and affectedness', 'Parallelism and cadence', 'Register control in complex syntax',
    'Abstract condition 凡是...都...', 'Evaluation frame 值得一提的是', 'Stance softening 未必 / 不见得', 'Dialectic 虽说...但归根结底...', 'Summative inference 归根结底',
    'Academic cohesion devices', 'Long-sentence compression', 'Editing over-complex sentences', 'Style transformation', 'HSK 6 grammar portfolio',
  ],
  speaking: [
    'Policy briefing', 'Academic seminar response', 'Professional negotiation', 'Crisis communication', 'Cultural commentary',
    'Economic policy debate', 'Technology governance forum', 'Education inequality discussion', 'Sustainability panel', 'Media ethics critique',
    'Leadership and organisation talk', 'Public health argument', 'Social trust discussion', 'Innovation and risk debate', 'Cross-cultural mediation',
    'Impromptu abstract speech', 'Defending a thesis', 'Socratic Q&A', 'Executive summary speech', 'HSK 6 speaking portfolio',
  ],
  listening: [
    'Infer speaker ideology', 'Track hidden assumptions', 'Understand sarcasm and restraint', 'Follow multi-speaker debate', 'Academic lecture note-taking',
    'Policy briefing listening', 'Media commentary listening', 'Panel discussion synthesis', 'Fast formal speech', 'Ambiguous stance listening',
    'Argument hierarchy listening', 'Evidence reliability listening', 'Concession and refutation', 'Metaphor and idiom recognition', 'Discourse marker mapping',
    'Long audio synthesis', 'Tone-based implication', 'Summarise conflicting viewpoints', 'Critical listening portfolio', 'HSK 6 listening portfolio',
  ],
  reading: [
    'Read editorial thesis', 'Identify ideological framing', 'Infer unstated premise', 'Track metaphor and idiom', 'Analyse rhetorical strategy',
    'Compare academic viewpoints', 'Evaluate evidence quality', 'Read policy commentary', 'Read cultural criticism', 'Read economic analysis',
    'Read technology governance essay', 'Read education inequality essay', 'Read public health argument', 'Read sustainability article', 'Read media ethics critique',
    'Synthesize two texts', 'Extract abstract structure', 'Critical summary', 'Style and register analysis', 'HSK 6 reading portfolio',
  ],
  writing: [
    'Thesis-driven essay', 'Counterargument integration', 'Policy recommendation memo', 'Critical commentary', 'Literary-style reflection',
    'Academic summary', 'Comparative essay', 'Problem-cause-solution essay', 'Evidence evaluation paragraph', 'Synthesis of two viewpoints',
    'Formal rebuttal', 'Professional proposal', 'Executive summary', 'Nuanced conclusion', 'Style transformation',
    'Cohesion and compression', 'Advanced paragraph editing', 'Argument portfolio draft', 'Final HSK 6 essay', 'HSK 6 writing portfolio',
  ],
  vocabulary: [
    'Idioms for argument', 'Policy and governance terms', 'Academic discourse verbs', 'Evaluation and stance words', 'Risk and uncertainty words',
    'Society and institution words', 'Economy and labour terms', 'Technology governance terms', 'Education inequality terms', 'Sustainability terms',
    'Media ethics vocabulary', 'Public health vocabulary', 'Culture and identity idioms', 'Leadership and organisation words', 'Metaphor and figurative phrases',
    'Register pairs formal-informal', 'Synonym precision', 'Collocation expansion', 'Discourse marker bank', 'HSK 6 vocabulary portfolio',
  ],
  pronunciation: [
    'Paragraph-level prosody', 'Executive briefing intonation', 'Academic lecture rhythm', 'Debate stress and rebuttal', 'Subtle stance intonation',
    'Long sentence breath control', 'Idioms as fixed chunks', 'Rhetorical question delivery', 'Contrastive emphasis', 'Softening tone',
    'Fast but clear formal speech', 'Pause before conclusion', 'Multi-clause cadence', 'Reading editorial aloud', 'Panel discussion response',
    '3-minute speech recording', 'Self-correction flow', 'Native-like linking', 'Final portfolio recording', 'HSK 6 pronunciation portfolio',
  ],
};

const levelVocabulary: Record<Exclude<MandarinLevelId, 'hsk-7' | 'hsk-8' | 'hsk-9'>, MandarinLesson['vocabulary']> & Partial<Record<MandarinLevelId, MandarinLesson['vocabulary']>> = {
  beginner: [
    { hanzi: '你好', pinyin: 'ni hao', meaning: 'halo' },
    { hanzi: '谢谢', pinyin: 'xie xie', meaning: 'terima kasih' },
    { hanzi: '我', pinyin: 'wo', meaning: 'saya' },
    { hanzi: '你', pinyin: 'ni', meaning: 'kamu' },
    { hanzi: '是', pinyin: 'shi', meaning: 'adalah' },
    { hanzi: '不', pinyin: 'bu', meaning: 'tidak' },
    { hanzi: '吗', pinyin: 'ma', meaning: 'partikel tanya' },
    { hanzi: '中国', pinyin: 'Zhongguo', meaning: 'China' },
  ],
  elementary: [
    { hanzi: '今天', pinyin: 'jin tian', meaning: 'hari ini' },
    { hanzi: '明天', pinyin: 'ming tian', meaning: 'besok' },
    { hanzi: '喜欢', pinyin: 'xi huan', meaning: 'suka' },
    { hanzi: '觉得', pinyin: 'jue de', meaning: 'merasa/berpendapat' },
    { hanzi: '因为', pinyin: 'yin wei', meaning: 'karena' },
    { hanzi: '所以', pinyin: 'suo yi', meaning: 'jadi' },
    { hanzi: '可以', pinyin: 'ke yi', meaning: 'boleh/bisa' },
    { hanzi: '一起', pinyin: 'yi qi', meaning: 'bersama' },
  ],
  intermediate: [
    { hanzi: '虽然', pinyin: 'sui ran', meaning: 'walaupun' },
    { hanzi: '但是', pinyin: 'dan shi', meaning: 'tetapi' },
    { hanzi: '如果', pinyin: 'ru guo', meaning: 'jika' },
    { hanzi: '就', pinyin: 'jiu', meaning: 'maka/lalu' },
    { hanzi: '比较', pinyin: 'bi jiao', meaning: 'lebih/agak' },
    { hanzi: '需要', pinyin: 'xu yao', meaning: 'membutuhkan' },
    { hanzi: '机会', pinyin: 'ji hui', meaning: 'kesempatan' },
    { hanzi: '经验', pinyin: 'jing yan', meaning: 'pengalaman' },
  ],
  'upper-intermediate': [
    { hanzi: '观点', pinyin: 'guan dian', meaning: 'sudut pandang' },
    { hanzi: '影响', pinyin: 'ying xiang', meaning: 'pengaruh' },
    { hanzi: '发展', pinyin: 'fa zhan', meaning: 'berkembang' },
    { hanzi: '环境', pinyin: 'huan jing', meaning: 'lingkungan' },
    { hanzi: '选择', pinyin: 'xuan ze', meaning: 'pilihan' },
    { hanzi: '原因', pinyin: 'yuan yin', meaning: 'alasan' },
    { hanzi: '结果', pinyin: 'jie guo', meaning: 'hasil' },
    { hanzi: '建议', pinyin: 'jian yi', meaning: 'saran' },
  ],
  advanced: [
    { hanzi: '社会现象', pinyin: 'she hui xian xiang', meaning: 'fenomena sosial' },
    { hanzi: '价值观', pinyin: 'jia zhi guan', meaning: 'nilai/pandangan hidup' },
    { hanzi: '效率', pinyin: 'xiao lu', meaning: 'efisiensi' },
    { hanzi: '趋势', pinyin: 'qu shi', meaning: 'tren' },
    { hanzi: '挑战', pinyin: 'tiao zhan', meaning: 'tantangan' },
    { hanzi: '优势', pinyin: 'you shi', meaning: 'keunggulan' },
    { hanzi: '限制', pinyin: 'xian zhi', meaning: 'batasan' },
    { hanzi: '综合', pinyin: 'zong he', meaning: 'menyintesis' },
  ],
  proficiency: [
    { hanzi: '不可否认', pinyin: 'bu ke fou ren', meaning: 'tidak dapat disangkal' },
    { hanzi: '从某种程度上说', pinyin: 'cong mou zhong cheng du shang shuo', meaning: 'dalam tingkat tertentu' },
    { hanzi: '权衡利弊', pinyin: 'quan heng li bi', meaning: 'menimbang pro dan kontra' },
    { hanzi: '潜在影响', pinyin: 'qian zai ying xiang', meaning: 'dampak potensial' },
    { hanzi: '长远来看', pinyin: 'chang yuan lai kan', meaning: 'dalam jangka panjang' },
    { hanzi: '核心问题', pinyin: 'he xin wen ti', meaning: 'masalah inti' },
    { hanzi: '提出论点', pinyin: 'ti chu lun dian', meaning: 'mengajukan argumen' },
    { hanzi: '深入分析', pinyin: 'shen ru fen xi', meaning: 'menganalisis mendalam' },
  ],
};

const skillPatterns: Record<MandarinSkillId, MandarinLesson['patterns']> = {
  grammar: [
    { label: 'Basic statement', hanzi: '主语 + 时间 + 地点 + 动词 + 宾语', pinyin: 'zhu yu + shi jian + di dian + dong ci + bin yu', meaning: 'Urutan umum: subjek, waktu, tempat, kata kerja, objek.' },
    { label: 'Question', hanzi: '你喜欢学中文吗？', pinyin: 'Ni xi huan xue Zhongwen ma?', meaning: 'Apakah kamu suka belajar Mandarin?' },
  ],
  speaking: [
    { label: 'Opening', hanzi: '我想谈一谈...', pinyin: 'Wo xiang tan yi tan...', meaning: 'Saya ingin membahas...' },
    { label: 'Response', hanzi: '我同意，不过...', pinyin: 'Wo tong yi, bu guo...', meaning: 'Saya setuju, tetapi...' },
  ],
  listening: [
    { label: 'Audio cue', hanzi: '请注意关键词。', pinyin: 'Qing zhu yi guan jian ci.', meaning: 'Perhatikan kata kunci.' },
    { label: 'Summary', hanzi: '他说的重点是...', pinyin: 'Ta shuo de zhong dian shi...', meaning: 'Poin utama yang dia katakan adalah...' },
  ],
  reading: [
    { label: 'Main idea', hanzi: '这段话主要说明...', pinyin: 'Zhe duan hua zhu yao shuo ming...', meaning: 'Paragraf ini terutama menjelaskan...' },
    { label: 'Detail', hanzi: '根据文章，...', pinyin: 'Gen ju wen zhang,...', meaning: 'Berdasarkan teks,...' },
  ],
  writing: [
    { label: 'Paragraph', hanzi: '首先... 其次... 最后...', pinyin: 'Shou xian... qi ci... zui hou...', meaning: 'Pertama..., berikutnya..., terakhir...' },
    { label: 'Opinion', hanzi: '我认为... 因为...', pinyin: 'Wo ren wei... yin wei...', meaning: 'Saya berpendapat... karena...' },
  ],
  vocabulary: [
    { label: 'Definition', hanzi: '这个词的意思是...', pinyin: 'Zhe ge ci de yi si shi...', meaning: 'Arti kata ini adalah...' },
    { label: 'Collocation', hanzi: '常用搭配是...', pinyin: 'Chang yong da pei shi...', meaning: 'Kolokasi yang sering dipakai adalah...' },
  ],
  pronunciation: [
    { label: 'Tone pair', hanzi: '先听声调，再跟读。', pinyin: 'Xian ting sheng diao, zai gen du.', meaning: 'Dengarkan nada dulu, lalu tirukan.' },
    { label: 'Shadowing', hanzi: '慢读一遍，正常速度读一遍。', pinyin: 'Man du yi bian, zheng chang su du du yi bian.', meaning: 'Baca pelan sekali, lalu baca dengan kecepatan normal.' },
  ],
};

const skillExamples: Record<MandarinSkillId, MandarinLesson['examples']> = {
  grammar: [
    { hanzi: '我今天在家学习中文。', pinyin: 'Wo jin tian zai jia xue xi Zhongwen.', meaning: 'Hari ini saya belajar Mandarin di rumah.' },
    { hanzi: '如果你有时间，我们就一起练习。', pinyin: 'Ru guo ni you shi jian, wo men jiu yi qi lian xi.', meaning: 'Jika kamu punya waktu, kita berlatih bersama.' },
  ],
  speaking: [
    { hanzi: '你好，我叫卡丽娜。我想练习中文。', pinyin: 'Ni hao, wo jiao Kalina. Wo xiang lian xi Zhongwen.', meaning: 'Halo, nama saya Karina. Saya ingin berlatih Mandarin.' },
    { hanzi: '我觉得这个方法很有用。', pinyin: 'Wo jue de zhe ge fang fa hen you yong.', meaning: 'Saya merasa metode ini sangat berguna.' },
  ],
  listening: [
    { hanzi: '请听问题，然后选择正确答案。', pinyin: 'Qing ting wen ti, ran hou xuan ze zheng que da an.', meaning: 'Dengarkan pertanyaan, lalu pilih jawaban yang benar.' },
    { hanzi: '他说他明天上午九点有课。', pinyin: 'Ta shuo ta ming tian shang wu jiu dian you ke.', meaning: 'Dia bilang besok jam 9 pagi ada kelas.' },
  ],
  reading: [
    { hanzi: '小王每天坐地铁去学校。', pinyin: 'Xiao Wang mei tian zuo di tie qu xue xiao.', meaning: 'Xiao Wang naik MRT ke sekolah setiap hari.' },
    { hanzi: '这篇文章介绍了学习语言的方法。', pinyin: 'Zhe pian wen zhang jie shao le xue xi yu yan de fang fa.', meaning: 'Artikel ini memperkenalkan metode belajar bahasa.' },
  ],
  writing: [
    { hanzi: '我每天晚上复习生词。', pinyin: 'Wo mei tian wan shang fu xi sheng ci.', meaning: 'Saya mengulang kosakata baru setiap malam.' },
    { hanzi: '我认为学习中文需要坚持和练习。', pinyin: 'Wo ren wei xue xi Zhongwen xu yao jian chi he lian xi.', meaning: 'Menurut saya belajar Mandarin membutuhkan konsistensi dan latihan.' },
  ],
  vocabulary: [
    { hanzi: '学习', pinyin: 'xue xi', meaning: 'belajar' },
    { hanzi: '练习', pinyin: 'lian xi', meaning: 'berlatih' },
  ],
  pronunciation: [
    { hanzi: '妈妈 骂马 吗', pinyin: 'ma ma / ma ma / ma', meaning: 'Latihan kontras nada ma.' },
    { hanzi: '你好，很高兴认识你。', pinyin: 'Ni hao, hen gao xing ren shi ni.', meaning: 'Halo, senang mengenalmu.' },
  ],
};

const beginnerLessonPacks: Array<{
  goal: string;
  vocabulary: MandarinLesson['vocabulary'];
  examples: MandarinLesson['examples'];
  quiz: MandarinLesson['practice'];
}> = [
  {
    goal: 'Ucapkan salam, kenali tone dasar, dan pakai 你好 / 再见 dalam dialog pendek.',
    vocabulary: [
      { hanzi: '你好', pinyin: 'ni hao', meaning: 'halo' },
      { hanzi: '再见', pinyin: 'zai jian', meaning: 'sampai jumpa' },
      { hanzi: '谢谢', pinyin: 'xie xie', meaning: 'terima kasih' },
      { hanzi: '不客气', pinyin: 'bu ke qi', meaning: 'sama-sama' },
      { hanzi: '请', pinyin: 'qing', meaning: 'silakan/tolong' },
      { hanzi: '对不起', pinyin: 'dui bu qi', meaning: 'maaf' },
    ],
    examples: [
      { hanzi: '你好！', pinyin: 'Ni hao!', meaning: 'Halo!' },
      { hanzi: '谢谢你。', pinyin: 'Xie xie ni.', meaning: 'Terima kasih.' },
      { hanzi: '再见！', pinyin: 'Zai jian!', meaning: 'Sampai jumpa!' },
    ],
    quiz: [
      { question: '你好 berarti...', options: ['halo', 'sampai jumpa', 'maaf'], answer: 'halo' },
      { question: '再见 dipakai saat...', options: ['berpisah', 'memesan teh', 'menyebut angka'], answer: 'berpisah' },
    ],
  },
  {
    goal: 'Perkenalkan nama dengan 我叫... dan tanyakan nama orang lain.',
    vocabulary: [
      { hanzi: '我', pinyin: 'wo', meaning: 'saya' },
      { hanzi: '你', pinyin: 'ni', meaning: 'kamu' },
      { hanzi: '叫', pinyin: 'jiao', meaning: 'bernama/dipanggil' },
      { hanzi: '名字', pinyin: 'ming zi', meaning: 'nama' },
      { hanzi: '什么', pinyin: 'shen me', meaning: 'apa' },
      { hanzi: '呢', pinyin: 'ne', meaning: 'bagaimana dengan...' },
    ],
    examples: [
      { hanzi: '我叫安娜。', pinyin: 'Wo jiao Anna.', meaning: 'Nama saya Anna.' },
      { hanzi: '你叫什么名字？', pinyin: 'Ni jiao shen me ming zi?', meaning: 'Siapa namamu?' },
      { hanzi: '我叫安娜，你呢？', pinyin: 'Wo jiao Anna, ni ne?', meaning: 'Nama saya Anna, kamu?' },
    ],
    quiz: [
      { question: '我叫安娜 berarti...', options: ['Nama saya Anna', 'Saya suka Anna', 'Anna di rumah'], answer: 'Nama saya Anna' },
      { question: '什么 berarti...', options: ['apa', 'siapa', 'berapa'], answer: 'apa' },
    ],
  },
  {
    goal: 'Tanyakan nama orang dengan 谁 dan bedakan 我 / 你 / 他 / 她.',
    vocabulary: [
      { hanzi: '他', pinyin: 'ta', meaning: 'dia laki-laki' },
      { hanzi: '她', pinyin: 'ta', meaning: 'dia perempuan' },
      { hanzi: '谁', pinyin: 'shei', meaning: 'siapa' },
      { hanzi: '朋友', pinyin: 'peng you', meaning: 'teman' },
      { hanzi: '同学', pinyin: 'tong xue', meaning: 'teman sekelas' },
      { hanzi: '老师', pinyin: 'lao shi', meaning: 'guru' },
    ],
    examples: [
      { hanzi: '他是谁？', pinyin: 'Ta shi shei?', meaning: 'Dia siapa?' },
      { hanzi: '她是我的朋友。', pinyin: 'Ta shi wo de peng you.', meaning: 'Dia teman saya.' },
      { hanzi: '你是老师吗？', pinyin: 'Ni shi lao shi ma?', meaning: 'Apakah kamu guru?' },
    ],
    quiz: [
      { question: '谁 berarti...', options: ['siapa', 'apa', 'di mana'], answer: 'siapa' },
      { question: '朋友 berarti...', options: ['teman', 'guru', 'siswa'], answer: 'teman' },
    ],
  },
  {
    goal: 'Sebutkan negara dan kebangsaan dengan 是...人.',
    vocabulary: [
      { hanzi: '中国', pinyin: 'Zhongguo', meaning: 'China' },
      { hanzi: '印尼', pinyin: 'Yinni', meaning: 'Indonesia' },
      { hanzi: '美国', pinyin: 'Meiguo', meaning: 'Amerika Serikat' },
      { hanzi: '英国', pinyin: 'Yingguo', meaning: 'Inggris' },
      { hanzi: '人', pinyin: 'ren', meaning: 'orang' },
      { hanzi: '中文', pinyin: 'Zhongwen', meaning: 'bahasa Mandarin' },
    ],
    examples: [
      { hanzi: '我是印尼人。', pinyin: 'Wo shi Yinni ren.', meaning: 'Saya orang Indonesia.' },
      { hanzi: '他是中国人。', pinyin: 'Ta shi Zhongguo ren.', meaning: 'Dia orang China.' },
      { hanzi: '我学中文。', pinyin: 'Wo xue Zhongwen.', meaning: 'Saya belajar Mandarin.' },
    ],
    quiz: [
      { question: '印尼人 berarti...', options: ['orang Indonesia', 'bahasa Indonesia', 'orang China'], answer: 'orang Indonesia' },
      { question: '中文 berarti...', options: ['bahasa Mandarin', 'China', 'orang China'], answer: 'bahasa Mandarin' },
    ],
  },
  {
    goal: 'Gunakan anggota keluarga dasar dalam kalimat pendek.',
    vocabulary: [
      { hanzi: '家', pinyin: 'jia', meaning: 'keluarga/rumah' },
      { hanzi: '爸爸', pinyin: 'ba ba', meaning: 'ayah' },
      { hanzi: '妈妈', pinyin: 'ma ma', meaning: 'ibu' },
      { hanzi: '哥哥', pinyin: 'ge ge', meaning: 'kakak laki-laki' },
      { hanzi: '姐姐', pinyin: 'jie jie', meaning: 'kakak perempuan' },
      { hanzi: '妹妹', pinyin: 'mei mei', meaning: 'adik perempuan' },
    ],
    examples: [
      { hanzi: '这是我妈妈。', pinyin: 'Zhe shi wo ma ma.', meaning: 'Ini ibu saya.' },
      { hanzi: '我家有四个人。', pinyin: 'Wo jia you si ge ren.', meaning: 'Keluarga saya ada empat orang.' },
      { hanzi: '他是我哥哥。', pinyin: 'Ta shi wo ge ge.', meaning: 'Dia kakak laki-laki saya.' },
    ],
    quiz: [
      { question: '妈妈 berarti...', options: ['ibu', 'ayah', 'adik'], answer: 'ibu' },
      { question: '我家有四个人 berarti...', options: ['Keluarga saya ada empat orang', 'Rumah saya besar', 'Saya punya empat buku'], answer: 'Keluarga saya ada empat orang' },
    ],
  },
  {
    goal: 'Dengar dan ucapkan angka 0-10 untuk nomor telepon sederhana.',
    vocabulary: [
      { hanzi: '零', pinyin: 'ling', meaning: 'nol' },
      { hanzi: '一', pinyin: 'yi', meaning: 'satu' },
      { hanzi: '二', pinyin: 'er', meaning: 'dua' },
      { hanzi: '三', pinyin: 'san', meaning: 'tiga' },
      { hanzi: '四', pinyin: 'si', meaning: 'empat' },
      { hanzi: '五', pinyin: 'wu', meaning: 'lima' },
      { hanzi: '电话', pinyin: 'dian hua', meaning: 'telepon' },
    ],
    examples: [
      { hanzi: '我的电话是一二三四五。', pinyin: 'Wo de dian hua shi yi er san si wu.', meaning: 'Nomor telepon saya 12345.' },
      { hanzi: '这是我的电话。', pinyin: 'Zhe shi wo de dian hua.', meaning: 'Ini nomor telepon saya.' },
      { hanzi: '一，二，三，四，五。', pinyin: 'Yi, er, san, si, wu.', meaning: 'Satu, dua, tiga, empat, lima.' },
    ],
    quiz: [
      { question: '电话 berarti...', options: ['telepon', 'teh', 'kelas'], answer: 'telepon' },
      { question: '三 berarti angka...', options: ['3', '4', '5'], answer: '3' },
    ],
  },
  {
    goal: 'Tanyakan harga paling dasar dengan 多少钱.',
    vocabulary: [
      { hanzi: '钱', pinyin: 'qian', meaning: 'uang' },
      { hanzi: '多少', pinyin: 'duo shao', meaning: 'berapa' },
      { hanzi: '块', pinyin: 'kuai', meaning: 'yuan/kuai' },
      { hanzi: '买', pinyin: 'mai', meaning: 'membeli' },
      { hanzi: '这个', pinyin: 'zhe ge', meaning: 'ini' },
      { hanzi: '那个', pinyin: 'na ge', meaning: 'itu' },
    ],
    examples: [
      { hanzi: '这个多少钱？', pinyin: 'Zhe ge duo shao qian?', meaning: 'Ini berapa harganya?' },
      { hanzi: '这个五块。', pinyin: 'Zhe ge wu kuai.', meaning: 'Ini lima yuan.' },
      { hanzi: '我买这个。', pinyin: 'Wo mai zhe ge.', meaning: 'Saya membeli yang ini.' },
    ],
    quiz: [
      { question: '多少钱 berarti...', options: ['berapa harganya', 'di mana', 'siapa namamu'], answer: 'berapa harganya' },
      { question: '买 berarti...', options: ['membeli', 'minum', 'belajar'], answer: 'membeli' },
    ],
  },
  {
    goal: 'Pesan minuman sederhana dengan 我要...',
    vocabulary: [
      { hanzi: '茶', pinyin: 'cha', meaning: 'teh' },
      { hanzi: '水', pinyin: 'shui', meaning: 'air' },
      { hanzi: '咖啡', pinyin: 'ka fei', meaning: 'kopi' },
      { hanzi: '喝', pinyin: 'he', meaning: 'minum' },
      { hanzi: '要', pinyin: 'yao', meaning: 'mau/ingin' },
      { hanzi: '杯', pinyin: 'bei', meaning: 'gelas/cup' },
    ],
    examples: [
      { hanzi: '我要一杯茶。', pinyin: 'Wo yao yi bei cha.', meaning: 'Saya mau segelas teh.' },
      { hanzi: '你喝咖啡吗？', pinyin: 'Ni he ka fei ma?', meaning: 'Apakah kamu minum kopi?' },
      { hanzi: '我不喝咖啡。', pinyin: 'Wo bu he ka fei.', meaning: 'Saya tidak minum kopi.' },
    ],
    quiz: [
      { question: '我要一杯茶 berarti...', options: ['Saya mau segelas teh', 'Saya suka guru', 'Saya di sekolah'], answer: 'Saya mau segelas teh' },
      { question: '喝 berarti...', options: ['minum', 'membeli', 'menulis'], answer: 'minum' },
    ],
  },
  {
    goal: 'Nyatakan suka dan tidak suka dengan 喜欢 / 不喜欢.',
    vocabulary: [
      { hanzi: '喜欢', pinyin: 'xi huan', meaning: 'suka' },
      { hanzi: '吃', pinyin: 'chi', meaning: 'makan' },
      { hanzi: '米饭', pinyin: 'mi fan', meaning: 'nasi' },
      { hanzi: '水果', pinyin: 'shui guo', meaning: 'buah' },
      { hanzi: '苹果', pinyin: 'ping guo', meaning: 'apel' },
      { hanzi: '也', pinyin: 'ye', meaning: 'juga' },
    ],
    examples: [
      { hanzi: '我喜欢吃米饭。', pinyin: 'Wo xi huan chi mi fan.', meaning: 'Saya suka makan nasi.' },
      { hanzi: '她喜欢苹果。', pinyin: 'Ta xi huan ping guo.', meaning: 'Dia suka apel.' },
      { hanzi: '我也喜欢。', pinyin: 'Wo ye xi huan.', meaning: 'Saya juga suka.' },
    ],
    quiz: [
      { question: '喜欢 berarti...', options: ['suka', 'tidak', 'berapa'], answer: 'suka' },
      { question: '也 berarti...', options: ['juga', 'maaf', 'di sana'], answer: 'juga' },
    ],
  },
  {
    goal: 'Gunakan 今天 untuk membicarakan aktivitas hari ini.',
    vocabulary: [
      { hanzi: '今天', pinyin: 'jin tian', meaning: 'hari ini' },
      { hanzi: '明天', pinyin: 'ming tian', meaning: 'besok' },
      { hanzi: '昨天', pinyin: 'zuo tian', meaning: 'kemarin' },
      { hanzi: '学习', pinyin: 'xue xi', meaning: 'belajar' },
      { hanzi: '工作', pinyin: 'gong zuo', meaning: 'bekerja' },
      { hanzi: '很', pinyin: 'hen', meaning: 'sangat/agak' },
    ],
    examples: [
      { hanzi: '我今天学习中文。', pinyin: 'Wo jin tian xue xi Zhongwen.', meaning: 'Hari ini saya belajar Mandarin.' },
      { hanzi: '你今天工作吗？', pinyin: 'Ni jin tian gong zuo ma?', meaning: 'Apakah kamu bekerja hari ini?' },
      { hanzi: '今天很好。', pinyin: 'Jin tian hen hao.', meaning: 'Hari ini baik.' },
    ],
    quiz: [
      { question: '今天 berarti...', options: ['hari ini', 'besok', 'kemarin'], answer: 'hari ini' },
      { question: '学习 berarti...', options: ['belajar', 'membeli', 'minum'], answer: 'belajar' },
    ],
  },
  {
    goal: 'Tanyakan dan jawab waktu sederhana dengan 几点.',
    vocabulary: [
      { hanzi: '现在', pinyin: 'xian zai', meaning: 'sekarang' },
      { hanzi: '几点', pinyin: 'ji dian', meaning: 'jam berapa' },
      { hanzi: '点', pinyin: 'dian', meaning: 'jam' },
      { hanzi: '上午', pinyin: 'shang wu', meaning: 'pagi' },
      { hanzi: '下午', pinyin: 'xia wu', meaning: 'sore/siang setelah tengah hari' },
      { hanzi: '晚上', pinyin: 'wan shang', meaning: 'malam' },
    ],
    examples: [
      { hanzi: '现在几点？', pinyin: 'Xian zai ji dian?', meaning: 'Sekarang jam berapa?' },
      { hanzi: '现在三点。', pinyin: 'Xian zai san dian.', meaning: 'Sekarang jam tiga.' },
      { hanzi: '我晚上学习。', pinyin: 'Wo wan shang xue xi.', meaning: 'Saya belajar malam hari.' },
    ],
    quiz: [
      { question: '现在几点 berarti...', options: ['Sekarang jam berapa?', 'Siapa namamu?', 'Ini berapa harganya?'], answer: 'Sekarang jam berapa?' },
      { question: '晚上 berarti...', options: ['malam', 'pagi', 'uang'], answer: 'malam' },
    ],
  },
  {
    goal: 'Sebutkan lokasi diri dengan 在.',
    vocabulary: [
      { hanzi: '在', pinyin: 'zai', meaning: 'di/berada di' },
      { hanzi: '家', pinyin: 'jia', meaning: 'rumah' },
      { hanzi: '学校', pinyin: 'xue xiao', meaning: 'sekolah' },
      { hanzi: '公司', pinyin: 'gong si', meaning: 'perusahaan/kantor' },
      { hanzi: '商店', pinyin: 'shang dian', meaning: 'toko' },
      { hanzi: '哪里', pinyin: 'na li', meaning: 'di mana' },
    ],
    examples: [
      { hanzi: '我在家。', pinyin: 'Wo zai jia.', meaning: 'Saya di rumah.' },
      { hanzi: '你在哪里？', pinyin: 'Ni zai na li?', meaning: 'Kamu di mana?' },
      { hanzi: '她在学校。', pinyin: 'Ta zai xue xiao.', meaning: 'Dia di sekolah.' },
    ],
    quiz: [
      { question: '在哪里 berarti...', options: ['di mana', 'berapa', 'apa'], answer: 'di mana' },
      { question: '学校 berarti...', options: ['sekolah', 'rumah', 'toko'], answer: 'sekolah' },
    ],
  },
  {
    goal: 'Tanyakan benda dengan 什么 dan jawab memakai 这是...',
    vocabulary: [
      { hanzi: '这', pinyin: 'zhe', meaning: 'ini' },
      { hanzi: '那', pinyin: 'na', meaning: 'itu' },
      { hanzi: '书', pinyin: 'shu', meaning: 'buku' },
      { hanzi: '笔', pinyin: 'bi', meaning: 'pena' },
      { hanzi: '手机', pinyin: 'shou ji', meaning: 'ponsel' },
      { hanzi: '电脑', pinyin: 'dian nao', meaning: 'komputer' },
    ],
    examples: [
      { hanzi: '这是什么？', pinyin: 'Zhe shi shen me?', meaning: 'Ini apa?' },
      { hanzi: '这是书。', pinyin: 'Zhe shi shu.', meaning: 'Ini buku.' },
      { hanzi: '那是我的手机。', pinyin: 'Na shi wo de shou ji.', meaning: 'Itu ponsel saya.' },
    ],
    quiz: [
      { question: '书 berarti...', options: ['buku', 'pena', 'ponsel'], answer: 'buku' },
      { question: '这是什么 berarti...', options: ['Ini apa?', 'Kamu siapa?', 'Di mana buku?'], answer: 'Ini apa?' },
    ],
  },
  {
    goal: 'Gunakan 想 untuk menyatakan keinginan sederhana.',
    vocabulary: [
      { hanzi: '想', pinyin: 'xiang', meaning: 'ingin' },
      { hanzi: '去', pinyin: 'qu', meaning: 'pergi' },
      { hanzi: '看', pinyin: 'kan', meaning: 'melihat/menonton' },
      { hanzi: '电影', pinyin: 'dian ying', meaning: 'film' },
      { hanzi: '北京', pinyin: 'Beijing', meaning: 'Beijing' },
      { hanzi: '一起', pinyin: 'yi qi', meaning: 'bersama' },
    ],
    examples: [
      { hanzi: '我想去北京。', pinyin: 'Wo xiang qu Beijing.', meaning: 'Saya ingin pergi ke Beijing.' },
      { hanzi: '你想看电影吗？', pinyin: 'Ni xiang kan dian ying ma?', meaning: 'Apakah kamu ingin menonton film?' },
      { hanzi: '我们一起去。', pinyin: 'Wo men yi qi qu.', meaning: 'Kita pergi bersama.' },
    ],
    quiz: [
      { question: '想 berarti...', options: ['ingin', 'membeli', 'sangat'], answer: 'ingin' },
      { question: '一起 berarti...', options: ['bersama', 'kemarin', 'siapa'], answer: 'bersama' },
    ],
  },
  {
    goal: 'Gunakan frasa kelas dasar untuk meminta guru mengulang.',
    vocabulary: [
      { hanzi: '请说', pinyin: 'qing shuo', meaning: 'tolong katakan' },
      { hanzi: '再', pinyin: 'zai', meaning: 'lagi' },
      { hanzi: '一遍', pinyin: 'yi bian', meaning: 'sekali/one time' },
      { hanzi: '听', pinyin: 'ting', meaning: 'mendengar' },
      { hanzi: '读', pinyin: 'du', meaning: 'membaca' },
      { hanzi: '写', pinyin: 'xie', meaning: 'menulis' },
    ],
    examples: [
      { hanzi: '请再说一遍。', pinyin: 'Qing zai shuo yi bian.', meaning: 'Tolong katakan sekali lagi.' },
      { hanzi: '请听。', pinyin: 'Qing ting.', meaning: 'Silakan dengarkan.' },
      { hanzi: '请读这个。', pinyin: 'Qing du zhe ge.', meaning: 'Silakan baca ini.' },
    ],
    quiz: [
      { question: '请再说一遍 berarti...', options: ['Tolong katakan sekali lagi', 'Tolong beli ini', 'Saya di rumah'], answer: 'Tolong katakan sekali lagi' },
      { question: '写 berarti...', options: ['menulis', 'mendengar', 'minum'], answer: 'menulis' },
    ],
  },
  {
    goal: 'Minta maaf dan berterima kasih dalam situasi harian.',
    vocabulary: [
      { hanzi: '没关系', pinyin: 'mei guan xi', meaning: 'tidak apa-apa' },
      { hanzi: '不好意思', pinyin: 'bu hao yi si', meaning: 'maaf/permisi' },
      { hanzi: '谢谢', pinyin: 'xie xie', meaning: 'terima kasih' },
      { hanzi: '不用谢', pinyin: 'bu yong xie', meaning: 'tidak perlu berterima kasih' },
      { hanzi: '可以', pinyin: 'ke yi', meaning: 'boleh/bisa' },
      { hanzi: '请问', pinyin: 'qing wen', meaning: 'permisi, boleh tanya' },
    ],
    examples: [
      { hanzi: '对不起。', pinyin: 'Dui bu qi.', meaning: 'Maaf.' },
      { hanzi: '没关系。', pinyin: 'Mei guan xi.', meaning: 'Tidak apa-apa.' },
      { hanzi: '请问，可以吗？', pinyin: 'Qing wen, ke yi ma?', meaning: 'Permisi, boleh?' },
    ],
    quiz: [
      { question: '没关系 berarti...', options: ['tidak apa-apa', 'terima kasih', 'sampai jumpa'], answer: 'tidak apa-apa' },
      { question: '请问 dipakai untuk...', options: ['memulai pertanyaan sopan', 'menghitung uang', 'menolak semua hal'], answer: 'memulai pertanyaan sopan' },
    ],
  },
  {
    goal: 'Ubah kalimat biasa menjadi pertanyaan ya/tidak memakai 吗.',
    vocabulary: [
      { hanzi: '吗', pinyin: 'ma', meaning: 'partikel pertanyaan yes/no' },
      { hanzi: '好', pinyin: 'hao', meaning: 'baik' },
      { hanzi: '忙', pinyin: 'mang', meaning: 'sibuk' },
      { hanzi: '累', pinyin: 'lei', meaning: 'lelah' },
      { hanzi: '热', pinyin: 're', meaning: 'panas' },
      { hanzi: '冷', pinyin: 'leng', meaning: 'dingin' },
    ],
    examples: [
      { hanzi: '你忙吗？', pinyin: 'Ni mang ma?', meaning: 'Apakah kamu sibuk?' },
      { hanzi: '你累吗？', pinyin: 'Ni lei ma?', meaning: 'Apakah kamu lelah?' },
      { hanzi: '今天热吗？', pinyin: 'Jin tian re ma?', meaning: 'Apakah hari ini panas?' },
    ],
    quiz: [
      { question: 'Kalimat tanya yes/no paling sederhana memakai...', options: ['吗', '的', '个'], answer: '吗' },
      { question: '忙 berarti...', options: ['sibuk', 'dingin', 'baik'], answer: 'sibuk' },
    ],
  },
  {
    goal: 'Buat self-introduction pendek 4 kalimat.',
    vocabulary: [
      { hanzi: '名字', pinyin: 'ming zi', meaning: 'nama' },
      { hanzi: '岁', pinyin: 'sui', meaning: 'umur/tahun usia' },
      { hanzi: '学习', pinyin: 'xue xi', meaning: 'belajar' },
      { hanzi: '中文', pinyin: 'Zhongwen', meaning: 'bahasa Mandarin' },
      { hanzi: '喜欢', pinyin: 'xi huan', meaning: 'suka' },
      { hanzi: '朋友', pinyin: 'peng you', meaning: 'teman' },
    ],
    examples: [
      { hanzi: '你好，我叫安娜。', pinyin: 'Ni hao, wo jiao Anna.', meaning: 'Halo, nama saya Anna.' },
      { hanzi: '我是印尼人。', pinyin: 'Wo shi Yinni ren.', meaning: 'Saya orang Indonesia.' },
      { hanzi: '我学习中文。', pinyin: 'Wo xue xi Zhongwen.', meaning: 'Saya belajar Mandarin.' },
      { hanzi: '我喜欢中文。', pinyin: 'Wo xi huan Zhongwen.', meaning: 'Saya suka bahasa Mandarin.' },
    ],
    quiz: [
      { question: 'Self-introduction HSK 1 sebaiknya memuat...', options: ['nama, asal, belajar, suka', 'teori abstrak', 'paragraf jurnal'], answer: 'nama, asal, belajar, suka' },
      { question: '岁 dipakai untuk...', options: ['umur', 'harga', 'lokasi'], answer: 'umur' },
    ],
  },
  {
    goal: 'Bangun mini dialog 4 giliran dengan sapaan, nama, dan pertanyaan.',
    vocabulary: [
      { hanzi: '认识', pinyin: 'ren shi', meaning: 'mengenal' },
      { hanzi: '高兴', pinyin: 'gao xing', meaning: 'senang' },
      { hanzi: '也', pinyin: 'ye', meaning: 'juga' },
      { hanzi: '我们', pinyin: 'wo men', meaning: 'kami/kita' },
      { hanzi: '说', pinyin: 'shuo', meaning: 'berbicara/mengatakan' },
      { hanzi: '汉语', pinyin: 'Han yu', meaning: 'bahasa Mandarin' },
    ],
    examples: [
      { hanzi: '很高兴认识你。', pinyin: 'Hen gao xing ren shi ni.', meaning: 'Senang mengenalmu.' },
      { hanzi: '我也很高兴。', pinyin: 'Wo ye hen gao xing.', meaning: 'Saya juga senang.' },
      { hanzi: '我们说汉语。', pinyin: 'Wo men shuo Han yu.', meaning: 'Kita berbicara Mandarin.' },
    ],
    quiz: [
      { question: '很高兴认识你 berarti...', options: ['Senang mengenalmu', 'Saya membeli teh', 'Kamu di mana'], answer: 'Senang mengenalmu' },
      { question: '我们 berarti...', options: ['kami/kita', 'dia', 'itu'], answer: 'kami/kita' },
    ],
  },
  {
    goal: 'Review HSK 1: gabungkan salam, identitas, angka, suka, dan lokasi.',
    vocabulary: [
      { hanzi: '复习', pinyin: 'fu xi', meaning: 'review/mengulang' },
      { hanzi: '生词', pinyin: 'sheng ci', meaning: 'kosakata baru' },
      { hanzi: '句子', pinyin: 'ju zi', meaning: 'kalimat' },
      { hanzi: '声调', pinyin: 'sheng diao', meaning: 'tone/nada' },
      { hanzi: '汉字', pinyin: 'Han zi', meaning: 'karakter Hanzi' },
      { hanzi: '拼音', pinyin: 'pin yin', meaning: 'pinyin' },
    ],
    examples: [
      { hanzi: '我复习生词。', pinyin: 'Wo fu xi sheng ci.', meaning: 'Saya mengulang kosakata baru.' },
      { hanzi: '请读这个句子。', pinyin: 'Qing du zhe ge ju zi.', meaning: 'Silakan baca kalimat ini.' },
      { hanzi: '我会读拼音。', pinyin: 'Wo hui du pin yin.', meaning: 'Saya bisa membaca pinyin.' },
    ],
    quiz: [
      { question: '拼音 berarti...', options: ['pinyin', 'Hanzi', 'kalimat'], answer: 'pinyin' },
      { question: '复习 berarti...', options: ['mengulang/review', 'membeli', 'minum'], answer: 'mengulang/review' },
    ],
  },
];

const upperIntermediateExtraLessonPacks: Array<{
  goal: string;
  vocabulary: MandarinLesson['vocabulary'];
  examples: MandarinLesson['examples'];
  quiz: MandarinLesson['practice'];
}> = [
  {
    goal: 'Tulis tanggapan semi-formal tentang layanan publik memakai 反映, 改善, dan 负责.',
    vocabulary: [
      { hanzi: '反映', pinyin: 'fan ying', meaning: 'menyampaikan/menanggapi masalah' },
      { hanzi: '改善', pinyin: 'gai shan', meaning: 'memperbaiki/meningkatkan' },
      { hanzi: '服务', pinyin: 'fu wu', meaning: 'layanan' },
      { hanzi: '负责', pinyin: 'fu ze', meaning: 'bertanggung jawab' },
      { hanzi: '态度', pinyin: 'tai du', meaning: 'sikap' },
      { hanzi: '及时', pinyin: 'ji shi', meaning: 'tepat waktu/segera' },
    ],
    examples: [
      { hanzi: '我想反映一下这个服务的问题。', pinyin: 'Wo xiang fan ying yi xia zhe ge fu wu de wen ti.', meaning: 'Saya ingin menyampaikan masalah tentang layanan ini.' },
      { hanzi: '如果能及时改善，用户的满意度会提高。', pinyin: 'Ru guo neng ji shi gai shan, yong hu de man yi du hui ti gao.', meaning: 'Jika bisa segera diperbaiki, kepuasan pengguna akan meningkat.' },
      { hanzi: '工作人员的态度既专业又友好。', pinyin: 'Gong zuo ren yuan de tai du ji zhuan ye you you hao.', meaning: 'Sikap staf profesional sekaligus ramah.' },
    ],
    quiz: [
      { question: '反映问题 berarti...', options: ['menyampaikan masalah', 'membandingkan harga', 'melatih nada'], answer: 'menyampaikan masalah' },
      { question: '改善 berarti...', options: ['memperbaiki/meningkatkan', 'menghapus', 'menolak'], answer: 'memperbaiki/meningkatkan' },
    ],
  },
  {
    goal: 'Buat presentasi ringkas HSK 4 dengan pembuka, argumen, data, contoh, dan kesimpulan.',
    vocabulary: [
      { hanzi: '演讲', pinyin: 'yan jiang', meaning: 'presentasi/pidato' },
      { hanzi: '主题', pinyin: 'zhu ti', meaning: 'tema' },
      { hanzi: '首先', pinyin: 'shou xian', meaning: 'pertama-tama' },
      { hanzi: '其次', pinyin: 'qi ci', meaning: 'selanjutnya' },
      { hanzi: '总之', pinyin: 'zong zhi', meaning: 'singkatnya/kesimpulannya' },
      { hanzi: '例子', pinyin: 'li zi', meaning: 'contoh' },
    ],
    examples: [
      { hanzi: '今天我演讲的主题是如何提高学习效率。', pinyin: 'Jin tian wo yan jiang de zhu ti shi ru he ti gao xue xi xiao lu.', meaning: 'Tema presentasi saya hari ini adalah cara meningkatkan efisiensi belajar.' },
      { hanzi: '首先，我们需要明确目标；其次，要坚持复习。', pinyin: 'Shou xian, wo men xu yao ming que mu biao; qi ci, yao jian chi fu xi.', meaning: 'Pertama, kita perlu memperjelas target; selanjutnya, harus konsisten review.' },
      { hanzi: '总之，好的方法比长时间学习更重要。', pinyin: 'Zong zhi, hao de fang fa bi chang shi jian xue xi geng zhong yao.', meaning: 'Kesimpulannya, metode yang baik lebih penting daripada belajar lama.' },
    ],
    quiz: [
      { question: '首先 dan 其次 menandai...', options: ['urutan argumen', 'kalimat pasif', 'warna benda'], answer: 'urutan argumen' },
      { question: '总之 dipakai untuk...', options: ['menutup dengan kesimpulan', 'menanyakan alamat', 'menolak undangan'], answer: 'menutup dengan kesimpulan' },
    ],
  },
];

const elementaryLessonPacks: Array<{
  goal: string;
  vocabulary: MandarinLesson['vocabulary'];
  examples: MandarinLesson['examples'];
  quiz: MandarinLesson['practice'];
}> = [
  {
    goal: 'Ceritakan rutinitas pagi memakai 起床, 吃早饭, dan 去学校.',
    vocabulary: [
      { hanzi: '早上', pinyin: 'zao shang', meaning: 'pagi' },
      { hanzi: '起床', pinyin: 'qi chuang', meaning: 'bangun tidur' },
      { hanzi: '早饭', pinyin: 'zao fan', meaning: 'sarapan' },
      { hanzi: '上课', pinyin: 'shang ke', meaning: 'masuk kelas' },
      { hanzi: '学校', pinyin: 'xue xiao', meaning: 'sekolah' },
      { hanzi: '每天', pinyin: 'mei tian', meaning: 'setiap hari' },
    ],
    examples: [
      { hanzi: '我每天早上七点起床。', pinyin: 'Wo mei tian zao shang qi dian qi chuang.', meaning: 'Saya bangun jam tujuh setiap pagi.' },
      { hanzi: '我吃早饭以后去学校。', pinyin: 'Wo chi zao fan yi hou qu xue xiao.', meaning: 'Setelah sarapan saya pergi ke sekolah.' },
      { hanzi: '我八点上课。', pinyin: 'Wo ba dian shang ke.', meaning: 'Saya masuk kelas jam delapan.' },
    ],
    quiz: [
      { question: '起床 berarti...', options: ['bangun tidur', 'makan malam', 'naik bus'], answer: 'bangun tidur' },
      { question: '每天 berarti...', options: ['setiap hari', 'kemarin', 'di sana'], answer: 'setiap hari' },
    ],
  },
  {
    goal: 'Buat janji sederhana memakai 今天, 明天, 现在, dan 有空.',
    vocabulary: [
      { hanzi: '有空', pinyin: 'you kong', meaning: 'punya waktu luang' },
      { hanzi: '见面', pinyin: 'jian mian', meaning: 'bertemu' },
      { hanzi: '现在', pinyin: 'xian zai', meaning: 'sekarang' },
      { hanzi: '明天', pinyin: 'ming tian', meaning: 'besok' },
      { hanzi: '下午', pinyin: 'xia wu', meaning: 'sore/siang setelah tengah hari' },
      { hanzi: '可以', pinyin: 'ke yi', meaning: 'boleh/bisa' },
    ],
    examples: [
      { hanzi: '你明天下午有空吗？', pinyin: 'Ni ming tian xia wu you kong ma?', meaning: 'Apakah kamu punya waktu besok sore?' },
      { hanzi: '我们可以三点见面。', pinyin: 'Wo men ke yi san dian jian mian.', meaning: 'Kita bisa bertemu jam tiga.' },
      { hanzi: '现在不可以，明天可以。', pinyin: 'Xian zai bu ke yi, ming tian ke yi.', meaning: 'Sekarang tidak bisa, besok bisa.' },
    ],
    quiz: [
      { question: '有空 berarti...', options: ['punya waktu luang', 'sangat mahal', 'belum makan'], answer: 'punya waktu luang' },
      { question: '见面 berarti...', options: ['bertemu', 'menulis', 'mendengar'], answer: 'bertemu' },
    ],
  },
  {
    goal: 'Deskripsikan keluarga lebih lengkap memakai 也, 都, dan 有.',
    vocabulary: [
      { hanzi: '家人', pinyin: 'jia ren', meaning: 'anggota keluarga' },
      { hanzi: '弟弟', pinyin: 'di di', meaning: 'adik laki-laki' },
      { hanzi: '妹妹', pinyin: 'mei mei', meaning: 'adik perempuan' },
      { hanzi: '都', pinyin: 'dou', meaning: 'semua' },
      { hanzi: '也', pinyin: 'ye', meaning: 'juga' },
      { hanzi: '工作', pinyin: 'gong zuo', meaning: 'bekerja/pekerjaan' },
    ],
    examples: [
      { hanzi: '我家有五个人。', pinyin: 'Wo jia you wu ge ren.', meaning: 'Keluarga saya ada lima orang.' },
      { hanzi: '爸爸妈妈都工作。', pinyin: 'Ba ba ma ma dou gong zuo.', meaning: 'Ayah dan ibu sama-sama bekerja.' },
      { hanzi: '我妹妹也学习中文。', pinyin: 'Wo mei mei ye xue xi Zhongwen.', meaning: 'Adik perempuan saya juga belajar Mandarin.' },
    ],
    quiz: [
      { question: '都 berarti...', options: ['semua', 'juga', 'tidak'], answer: 'semua' },
      { question: '也 berarti...', options: ['juga', 'berapa', 'sekarang'], answer: 'juga' },
    ],
  },
  {
    goal: 'Pesan makanan di restoran memakai 要, 一点儿, dan 服务员.',
    vocabulary: [
      { hanzi: '饭馆', pinyin: 'fan guan', meaning: 'restoran' },
      { hanzi: '服务员', pinyin: 'fu wu yuan', meaning: 'pelayan' },
      { hanzi: '菜单', pinyin: 'cai dan', meaning: 'menu' },
      { hanzi: '一点儿', pinyin: 'yi dianr', meaning: 'sedikit' },
      { hanzi: '米饭', pinyin: 'mi fan', meaning: 'nasi' },
      { hanzi: '菜', pinyin: 'cai', meaning: 'masakan/sayur' },
    ],
    examples: [
      { hanzi: '服务员，请给我菜单。', pinyin: 'Fu wu yuan, qing gei wo cai dan.', meaning: 'Pelayan, tolong beri saya menu.' },
      { hanzi: '我要米饭和一点儿菜。', pinyin: 'Wo yao mi fan he yi dianr cai.', meaning: 'Saya mau nasi dan sedikit lauk/sayur.' },
      { hanzi: '这个菜很好吃。', pinyin: 'Zhe ge cai hen hao chi.', meaning: 'Masakan ini enak.' },
    ],
    quiz: [
      { question: '菜单 berarti...', options: ['menu', 'uang', 'sekolah'], answer: 'menu' },
      { question: '一点儿 berarti...', options: ['sedikit', 'semua', 'besok'], answer: 'sedikit' },
    ],
  },
  {
    goal: 'Belanja dan negosiasi ringan memakai 太...了 dan 便宜.',
    vocabulary: [
      { hanzi: '买', pinyin: 'mai', meaning: 'membeli' },
      { hanzi: '卖', pinyin: 'mai', meaning: 'menjual' },
      { hanzi: '贵', pinyin: 'gui', meaning: 'mahal' },
      { hanzi: '便宜', pinyin: 'pian yi', meaning: 'murah' },
      { hanzi: '太', pinyin: 'tai', meaning: 'terlalu' },
      { hanzi: '了', pinyin: 'le', meaning: 'partikel perubahan/penekanan' },
    ],
    examples: [
      { hanzi: '这个太贵了。', pinyin: 'Zhe ge tai gui le.', meaning: 'Ini terlalu mahal.' },
      { hanzi: '有没有便宜一点儿的？', pinyin: 'You mei you pian yi yi dianr de?', meaning: 'Ada yang sedikit lebih murah?' },
      { hanzi: '我想买这个。', pinyin: 'Wo xiang mai zhe ge.', meaning: 'Saya ingin membeli ini.' },
    ],
    quiz: [
      { question: '太贵了 berarti...', options: ['terlalu mahal', 'sangat jauh', 'tidak enak'], answer: 'terlalu mahal' },
      { question: '便宜 berarti...', options: ['murah', 'mahal', 'sibuk'], answer: 'murah' },
    ],
  },
  {
    goal: 'Gunakan 因为...所以... untuk memberi alasan sederhana.',
    vocabulary: [
      { hanzi: '因为', pinyin: 'yin wei', meaning: 'karena' },
      { hanzi: '所以', pinyin: 'suo yi', meaning: 'jadi/maka' },
      { hanzi: '忙', pinyin: 'mang', meaning: 'sibuk' },
      { hanzi: '累', pinyin: 'lei', meaning: 'lelah' },
      { hanzi: '休息', pinyin: 'xiu xi', meaning: 'beristirahat' },
      { hanzi: '今天', pinyin: 'jin tian', meaning: 'hari ini' },
    ],
    examples: [
      { hanzi: '因为我很忙，所以我不能去。', pinyin: 'Yin wei wo hen mang, suo yi wo bu neng qu.', meaning: 'Karena saya sibuk, jadi saya tidak bisa pergi.' },
      { hanzi: '因为她很累，所以她想休息。', pinyin: 'Yin wei ta hen lei, suo yi ta xiang xiu xi.', meaning: 'Karena dia lelah, jadi dia ingin istirahat.' },
      { hanzi: '今天我不忙。', pinyin: 'Jin tian wo bu mang.', meaning: 'Hari ini saya tidak sibuk.' },
    ],
    quiz: [
      { question: '因为 berarti...', options: ['karena', 'tetapi', 'di mana'], answer: 'karena' },
      { question: '所以 berarti...', options: ['jadi/maka', 'kemarin', 'buku'], answer: 'jadi/maka' },
    ],
  },
  {
    goal: 'Ceritakan aktivitas yang sudah terjadi memakai 了.',
    vocabulary: [
      { hanzi: '了', pinyin: 'le', meaning: 'partikel selesai/perubahan' },
      { hanzi: '吃饭', pinyin: 'chi fan', meaning: 'makan' },
      { hanzi: '看电影', pinyin: 'kan dian ying', meaning: 'menonton film' },
      { hanzi: '昨天', pinyin: 'zuo tian', meaning: 'kemarin' },
      { hanzi: '回家', pinyin: 'hui jia', meaning: 'pulang ke rumah' },
      { hanzi: '以后', pinyin: 'yi hou', meaning: 'setelah' },
    ],
    examples: [
      { hanzi: '我昨天看电影了。', pinyin: 'Wo zuo tian kan dian ying le.', meaning: 'Kemarin saya sudah menonton film.' },
      { hanzi: '他吃饭以后回家了。', pinyin: 'Ta chi fan yi hou hui jia le.', meaning: 'Setelah makan, dia pulang.' },
      { hanzi: '我学了两个小时中文。', pinyin: 'Wo xue le liang ge xiao shi Zhongwen.', meaning: 'Saya belajar Mandarin selama dua jam.' },
    ],
    quiz: [
      { question: '了 bisa menandai...', options: ['aksi selesai/perubahan', 'harga saja', 'nama negara'], answer: 'aksi selesai/perubahan' },
      { question: '昨天 berarti...', options: ['kemarin', 'hari ini', 'besok'], answer: 'kemarin' },
    ],
  },
  {
    goal: 'Gunakan 过 untuk pengalaman sederhana.',
    vocabulary: [
      { hanzi: '过', pinyin: 'guo', meaning: 'pernah' },
      { hanzi: '去过', pinyin: 'qu guo', meaning: 'pernah pergi' },
      { hanzi: '吃过', pinyin: 'chi guo', meaning: 'pernah makan/sudah makan' },
      { hanzi: '中国菜', pinyin: 'Zhongguo cai', meaning: 'masakan China' },
      { hanzi: '北京', pinyin: 'Beijing', meaning: 'Beijing' },
      { hanzi: '没有', pinyin: 'mei you', meaning: 'tidak punya/belum' },
    ],
    examples: [
      { hanzi: '你去过北京吗？', pinyin: 'Ni qu guo Beijing ma?', meaning: 'Apakah kamu pernah pergi ke Beijing?' },
      { hanzi: '我没去过中国。', pinyin: 'Wo mei qu guo Zhongguo.', meaning: 'Saya belum pernah pergi ke China.' },
      { hanzi: '我吃过中国菜。', pinyin: 'Wo chi guo Zhongguo cai.', meaning: 'Saya pernah makan masakan China.' },
    ],
    quiz: [
      { question: '过 sering dipakai untuk...', options: ['pengalaman pernah', 'harga barang', 'jam sekarang'], answer: 'pengalaman pernah' },
      { question: '没去过 berarti...', options: ['belum pernah pergi', 'sedang pergi', 'ingin pergi'], answer: 'belum pernah pergi' },
    ],
  },
  {
    goal: 'Tanyakan arah dan lokasi memakai 在哪儿 dan 怎么走.',
    vocabulary: [
      { hanzi: '哪儿', pinyin: 'nar', meaning: 'di mana' },
      { hanzi: '怎么走', pinyin: 'zen me zou', meaning: 'bagaimana jalannya' },
      { hanzi: '左边', pinyin: 'zuo bian', meaning: 'sebelah kiri' },
      { hanzi: '右边', pinyin: 'you bian', meaning: 'sebelah kanan' },
      { hanzi: '前面', pinyin: 'qian mian', meaning: 'depan' },
      { hanzi: '后面', pinyin: 'hou mian', meaning: 'belakang' },
    ],
    examples: [
      { hanzi: '学校在哪儿？', pinyin: 'Xue xiao zai nar?', meaning: 'Sekolah di mana?' },
      { hanzi: '商店在左边。', pinyin: 'Shang dian zai zuo bian.', meaning: 'Toko ada di sebelah kiri.' },
      { hanzi: '去医院怎么走？', pinyin: 'Qu yi yuan zen me zou?', meaning: 'Bagaimana jalan ke rumah sakit?' },
    ],
    quiz: [
      { question: '左边 berarti...', options: ['sebelah kiri', 'sebelah kanan', 'belakang'], answer: 'sebelah kiri' },
      { question: '怎么走 dipakai untuk...', options: ['menanyakan arah', 'menanyakan umur', 'membeli makanan'], answer: 'menanyakan arah' },
    ],
  },
  {
    goal: 'Bicarakan transportasi dasar memakai 坐, 开, dan 到.',
    vocabulary: [
      { hanzi: '坐', pinyin: 'zuo', meaning: 'naik/duduk' },
      { hanzi: '车', pinyin: 'che', meaning: 'kendaraan/mobil' },
      { hanzi: '公共汽车', pinyin: 'gong gong qi che', meaning: 'bus' },
      { hanzi: '出租车', pinyin: 'chu zu che', meaning: 'taksi' },
      { hanzi: '到', pinyin: 'dao', meaning: 'sampai/ke' },
      { hanzi: '分钟', pinyin: 'fen zhong', meaning: 'menit' },
    ],
    examples: [
      { hanzi: '我坐公共汽车去学校。', pinyin: 'Wo zuo gong gong qi che qu xue xiao.', meaning: 'Saya naik bus ke sekolah.' },
      { hanzi: '到公司要二十分钟。', pinyin: 'Dao gong si yao er shi fen zhong.', meaning: 'Ke kantor butuh 20 menit.' },
      { hanzi: '我们坐出租车吧。', pinyin: 'Wo men zuo chu zu che ba.', meaning: 'Ayo kita naik taksi.' },
    ],
    quiz: [
      { question: '公共汽车 berarti...', options: ['bus', 'taksi', 'sepeda'], answer: 'bus' },
      { question: '分钟 berarti...', options: ['menit', 'jam', 'hari'], answer: 'menit' },
    ],
  },
  {
    goal: 'Deskripsikan cuaca dan rencana sederhana.',
    vocabulary: [
      { hanzi: '天气', pinyin: 'tian qi', meaning: 'cuaca' },
      { hanzi: '下雨', pinyin: 'xia yu', meaning: 'hujan' },
      { hanzi: '冷', pinyin: 'leng', meaning: 'dingin' },
      { hanzi: '热', pinyin: 're', meaning: 'panas' },
      { hanzi: '出去', pinyin: 'chu qu', meaning: 'keluar' },
      { hanzi: '运动', pinyin: 'yun dong', meaning: 'olahraga' },
    ],
    examples: [
      { hanzi: '今天天气很好。', pinyin: 'Jin tian tian qi hen hao.', meaning: 'Cuaca hari ini bagus.' },
      { hanzi: '明天会下雨吗？', pinyin: 'Ming tian hui xia yu ma?', meaning: 'Apakah besok akan hujan?' },
      { hanzi: '天气太热了，我不想出去。', pinyin: 'Tian qi tai re le, wo bu xiang chu qu.', meaning: 'Cuaca terlalu panas, saya tidak ingin keluar.' },
    ],
    quiz: [
      { question: '天气 berarti...', options: ['cuaca', 'makanan', 'sekolah'], answer: 'cuaca' },
      { question: '下雨 berarti...', options: ['hujan', 'panas', 'olahraga'], answer: 'hujan' },
    ],
  },
  {
    goal: 'Ceritakan hobi dan frekuensi sederhana.',
    vocabulary: [
      { hanzi: '爱好', pinyin: 'ai hao', meaning: 'hobi' },
      { hanzi: '唱歌', pinyin: 'chang ge', meaning: 'menyanyi' },
      { hanzi: '跳舞', pinyin: 'tiao wu', meaning: 'menari' },
      { hanzi: '看书', pinyin: 'kan shu', meaning: 'membaca buku' },
      { hanzi: '常常', pinyin: 'chang chang', meaning: 'sering' },
      { hanzi: '有时候', pinyin: 'you shi hou', meaning: 'kadang-kadang' },
    ],
    examples: [
      { hanzi: '我的爱好是看书。', pinyin: 'Wo de ai hao shi kan shu.', meaning: 'Hobi saya membaca buku.' },
      { hanzi: '我常常听中文歌。', pinyin: 'Wo chang chang ting Zhongwen ge.', meaning: 'Saya sering mendengar lagu Mandarin.' },
      { hanzi: '她有时候跳舞。', pinyin: 'Ta you shi hou tiao wu.', meaning: 'Dia kadang-kadang menari.' },
    ],
    quiz: [
      { question: '爱好 berarti...', options: ['hobi', 'cuaca', 'harga'], answer: 'hobi' },
      { question: '常常 berarti...', options: ['sering', 'belum', 'terlalu'], answer: 'sering' },
    ],
  },
  {
    goal: 'Deskripsikan kesehatan ringan dan kebutuhan.',
    vocabulary: [
      { hanzi: '身体', pinyin: 'shen ti', meaning: 'tubuh/kesehatan' },
      { hanzi: '生病', pinyin: 'sheng bing', meaning: 'sakit' },
      { hanzi: '医院', pinyin: 'yi yuan', meaning: 'rumah sakit' },
      { hanzi: '药', pinyin: 'yao', meaning: 'obat' },
      { hanzi: '需要', pinyin: 'xu yao', meaning: 'membutuhkan' },
      { hanzi: '休息', pinyin: 'xiu xi', meaning: 'istirahat' },
    ],
    examples: [
      { hanzi: '我今天身体不舒服。', pinyin: 'Wo jin tian shen ti bu shu fu.', meaning: 'Hari ini badan saya tidak enak.' },
      { hanzi: '他生病了，需要休息。', pinyin: 'Ta sheng bing le, xu yao xiu xi.', meaning: 'Dia sakit dan perlu istirahat.' },
      { hanzi: '我要去医院。', pinyin: 'Wo yao qu yi yuan.', meaning: 'Saya mau pergi ke rumah sakit.' },
    ],
    quiz: [
      { question: '生病 berarti...', options: ['sakit', 'murah', 'bertemu'], answer: 'sakit' },
      { question: '需要 berarti...', options: ['membutuhkan', 'membeli', 'menyanyi'], answer: 'membutuhkan' },
    ],
  },
  {
    goal: 'Bandingkan dua benda/orang secara sederhana memakai 比.',
    vocabulary: [
      { hanzi: '比', pinyin: 'bi', meaning: 'dibandingkan dengan' },
      { hanzi: '高', pinyin: 'gao', meaning: 'tinggi' },
      { hanzi: '矮', pinyin: 'ai', meaning: 'pendek' },
      { hanzi: '大', pinyin: 'da', meaning: 'besar' },
      { hanzi: '小', pinyin: 'xiao', meaning: 'kecil' },
      { hanzi: '新', pinyin: 'xin', meaning: 'baru' },
    ],
    examples: [
      { hanzi: '我哥哥比我高。', pinyin: 'Wo ge ge bi wo gao.', meaning: 'Kakak laki-laki saya lebih tinggi dari saya.' },
      { hanzi: '这个手机比那个手机新。', pinyin: 'Zhe ge shou ji bi na ge shou ji xin.', meaning: 'Ponsel ini lebih baru daripada ponsel itu.' },
      { hanzi: '我的房间比你的房间大。', pinyin: 'Wo de fang jian bi ni de fang jian da.', meaning: 'Kamar saya lebih besar daripada kamarmu.' },
    ],
    quiz: [
      { question: '比 dipakai untuk...', options: ['perbandingan', 'sapaan', 'lokasi'], answer: 'perbandingan' },
      { question: '高 berarti...', options: ['tinggi', 'kecil', 'baru'], answer: 'tinggi' },
    ],
  },
  {
    goal: 'Gunakan 得 untuk menggambarkan cara melakukan sesuatu.',
    vocabulary: [
      { hanzi: '得', pinyin: 'de', meaning: 'partikel complement' },
      { hanzi: '说', pinyin: 'shuo', meaning: 'berbicara' },
      { hanzi: '写', pinyin: 'xie', meaning: 'menulis' },
      { hanzi: '快', pinyin: 'kuai', meaning: 'cepat' },
      { hanzi: '慢', pinyin: 'man', meaning: 'pelan' },
      { hanzi: '好', pinyin: 'hao', meaning: 'baik/bagus' },
    ],
    examples: [
      { hanzi: '他说中文说得很好。', pinyin: 'Ta shuo Zhongwen shuo de hen hao.', meaning: 'Dia berbicara Mandarin dengan sangat baik.' },
      { hanzi: '你写汉字写得很快。', pinyin: 'Ni xie Hanzi xie de hen kuai.', meaning: 'Kamu menulis Hanzi dengan cepat.' },
      { hanzi: '请说慢一点儿。', pinyin: 'Qing shuo man yi dianr.', meaning: 'Tolong bicara sedikit lebih pelan.' },
    ],
    quiz: [
      { question: '说得很好 berarti...', options: ['berbicara dengan baik', 'membeli dengan murah', 'pergi ke sekolah'], answer: 'berbicara dengan baik' },
      { question: '慢 berarti...', options: ['pelan', 'cepat', 'mahal'], answer: 'pelan' },
    ],
  },
  {
    goal: 'Gunakan 正在 untuk aktivitas yang sedang berlangsung.',
    vocabulary: [
      { hanzi: '正在', pinyin: 'zheng zai', meaning: 'sedang' },
      { hanzi: '看电视', pinyin: 'kan dian shi', meaning: 'menonton TV' },
      { hanzi: '听音乐', pinyin: 'ting yin yue', meaning: 'mendengarkan musik' },
      { hanzi: '做饭', pinyin: 'zuo fan', meaning: 'memasak' },
      { hanzi: '等', pinyin: 'deng', meaning: 'menunggu' },
      { hanzi: '朋友', pinyin: 'peng you', meaning: 'teman' },
    ],
    examples: [
      { hanzi: '我正在看电视。', pinyin: 'Wo zheng zai kan dian shi.', meaning: 'Saya sedang menonton TV.' },
      { hanzi: '妈妈正在做饭。', pinyin: 'Ma ma zheng zai zuo fan.', meaning: 'Ibu sedang memasak.' },
      { hanzi: '他正在等朋友。', pinyin: 'Ta zheng zai deng peng you.', meaning: 'Dia sedang menunggu teman.' },
    ],
    quiz: [
      { question: '正在 berarti...', options: ['sedang', 'sudah pernah', 'terlalu'], answer: 'sedang' },
      { question: '做饭 berarti...', options: ['memasak', 'menonton TV', 'menunggu'], answer: 'memasak' },
    ],
  },
  {
    goal: 'Tulis pesan pendek untuk janji bertemu.',
    vocabulary: [
      { hanzi: '短信', pinyin: 'duan xin', meaning: 'SMS/pesan singkat' },
      { hanzi: '告诉', pinyin: 'gao su', meaning: 'memberitahu' },
      { hanzi: '等一下', pinyin: 'deng yi xia', meaning: 'tunggu sebentar' },
      { hanzi: '晚一点', pinyin: 'wan yi dian', meaning: 'sedikit lebih malam/telat' },
      { hanzi: '没问题', pinyin: 'mei wen ti', meaning: 'tidak masalah' },
      { hanzi: '到时候', pinyin: 'dao shi hou', meaning: 'saat waktunya nanti' },
    ],
    examples: [
      { hanzi: '我会晚一点到。', pinyin: 'Wo hui wan yi dian dao.', meaning: 'Saya akan tiba sedikit terlambat.' },
      { hanzi: '没问题，我等你。', pinyin: 'Mei wen ti, wo deng ni.', meaning: 'Tidak masalah, saya menunggumu.' },
      { hanzi: '到时候我告诉你。', pinyin: 'Dao shi hou wo gao su ni.', meaning: 'Nanti saat waktunya saya beri tahu kamu.' },
    ],
    quiz: [
      { question: '短信 berarti...', options: ['pesan singkat', 'rumah sakit', 'restoran'], answer: 'pesan singkat' },
      { question: '没问题 berarti...', options: ['tidak masalah', 'sangat mahal', 'sedang belajar'], answer: 'tidak masalah' },
    ],
  },
  {
    goal: 'Gabungkan HSK 2 dalam dialog sehari-hari 6-8 kalimat.',
    vocabulary: [
      { hanzi: '复习', pinyin: 'fu xi', meaning: 'review/mengulang' },
      { hanzi: '语法', pinyin: 'yu fa', meaning: 'grammar' },
      { hanzi: '句子', pinyin: 'ju zi', meaning: 'kalimat' },
      { hanzi: '对话', pinyin: 'dui hua', meaning: 'dialog' },
      { hanzi: '练习', pinyin: 'lian xi', meaning: 'latihan' },
      { hanzi: '进步', pinyin: 'jin bu', meaning: 'kemajuan' },
    ],
    examples: [
      { hanzi: '我每天复习语法和生词。', pinyin: 'Wo mei tian fu xi yu fa he sheng ci.', meaning: 'Saya mengulang grammar dan kosakata setiap hari.' },
      { hanzi: '我们一起练习对话吧。', pinyin: 'Wo men yi qi lian xi dui hua ba.', meaning: 'Ayo kita berlatih dialog bersama.' },
      { hanzi: '你的中文进步很快。', pinyin: 'Ni de Zhongwen jin bu hen kuai.', meaning: 'Mandarinmu berkembang cepat.' },
    ],
    quiz: [
      { question: '进步 berarti...', options: ['kemajuan', 'harga', 'cuaca'], answer: 'kemajuan' },
      { question: '对话 berarti...', options: ['dialog', 'sarapan', 'taksi'], answer: 'dialog' },
    ],
  },
];

const intermediateLessonPacks: Array<{
  goal: string;
  vocabulary: MandarinLesson['vocabulary'];
  examples: MandarinLesson['examples'];
  quiz: MandarinLesson['practice'];
}> = [
  {
    goal: 'Sampaikan opini sederhana tentang belajar Mandarin memakai 我觉得 dan 因为.',
    vocabulary: [
      { hanzi: '觉得', pinyin: 'jue de', meaning: 'merasa/berpendapat' },
      { hanzi: '容易', pinyin: 'rong yi', meaning: 'mudah' },
      { hanzi: '难', pinyin: 'nan', meaning: 'sulit' },
      { hanzi: '进步', pinyin: 'jin bu', meaning: 'kemajuan' },
      { hanzi: '方法', pinyin: 'fang fa', meaning: 'metode' },
      { hanzi: '坚持', pinyin: 'jian chi', meaning: 'konsisten/bertahan' },
    ],
    examples: [
      { hanzi: '我觉得学中文不容易，但是很有意思。', pinyin: 'Wo jue de xue Zhongwen bu rong yi, dan shi hen you yi si.', meaning: 'Menurut saya belajar Mandarin tidak mudah, tetapi menarik.' },
      { hanzi: '如果每天练习，进步会很快。', pinyin: 'Ru guo mei tian lian xi, jin bu hui hen kuai.', meaning: 'Jika berlatih setiap hari, kemajuan akan cepat.' },
      { hanzi: '这个方法对我很有帮助。', pinyin: 'Zhe ge fang fa dui wo hen you bang zhu.', meaning: 'Metode ini sangat membantu saya.' },
    ],
    quiz: [
      { question: '我觉得 dipakai untuk...', options: ['menyampaikan pendapat', 'menanyakan harga', 'menyebut lokasi'], answer: 'menyampaikan pendapat' },
      { question: '坚持 berarti...', options: ['konsisten/bertahan', 'menjual', 'terlambat'], answer: 'konsisten/bertahan' },
    ],
  },
  {
    goal: 'Ceritakan pengalaman belajar dengan 过, 了, dan 以前.',
    vocabulary: [
      { hanzi: '以前', pinyin: 'yi qian', meaning: 'sebelumnya/dulu' },
      { hanzi: '以后', pinyin: 'yi hou', meaning: 'setelah/nanti' },
      { hanzi: '参加', pinyin: 'can jia', meaning: 'mengikuti/berpartisipasi' },
      { hanzi: '考试', pinyin: 'kao shi', meaning: 'ujian' },
      { hanzi: '成绩', pinyin: 'cheng ji', meaning: 'nilai/hasil' },
      { hanzi: '提高', pinyin: 'ti gao', meaning: 'meningkatkan' },
    ],
    examples: [
      { hanzi: '我以前参加过一次中文考试。', pinyin: 'Wo yi qian can jia guo yi ci Zhongwen kao shi.', meaning: 'Dulu saya pernah mengikuti ujian Mandarin sekali.' },
      { hanzi: '考试以后，我每天复习生词。', pinyin: 'Kao shi yi hou, wo mei tian fu xi sheng ci.', meaning: 'Setelah ujian, saya mengulang kosakata setiap hari.' },
      { hanzi: '我的听力提高了很多。', pinyin: 'Wo de ting li ti gao le hen duo.', meaning: 'Listening saya meningkat banyak.' },
    ],
    quiz: [
      { question: '参加考试 berarti...', options: ['mengikuti ujian', 'membeli makanan', 'menunggu teman'], answer: 'mengikuti ujian' },
      { question: '提高 berarti...', options: ['meningkatkan', 'menolak', 'turun'], answer: 'meningkatkan' },
    ],
  },
  {
    goal: 'Buat rencana akhir pekan memakai 打算 dan 准备.',
    vocabulary: [
      { hanzi: '打算', pinyin: 'da suan', meaning: 'berencana' },
      { hanzi: '准备', pinyin: 'zhun bei', meaning: 'bersiap/berencana' },
      { hanzi: '周末', pinyin: 'zhou mo', meaning: 'akhir pekan' },
      { hanzi: '旅行', pinyin: 'lv xing', meaning: 'bepergian/travel' },
      { hanzi: '安排', pinyin: 'an pai', meaning: 'mengatur/jadwal' },
      { hanzi: '决定', pinyin: 'jue ding', meaning: 'memutuskan' },
    ],
    examples: [
      { hanzi: '这个周末你打算做什么？', pinyin: 'Zhe ge zhou mo ni da suan zuo shen me?', meaning: 'Akhir pekan ini kamu berencana melakukan apa?' },
      { hanzi: '我准备和朋友去旅行。', pinyin: 'Wo zhun bei he peng you qu lv xing.', meaning: 'Saya berencana bepergian dengan teman.' },
      { hanzi: '我们还没有决定时间。', pinyin: 'Wo men hai mei you jue ding shi jian.', meaning: 'Kami belum menentukan waktunya.' },
    ],
    quiz: [
      { question: '打算 berarti...', options: ['berencana', 'sudah selesai', 'terlalu mahal'], answer: 'berencana' },
      { question: '周末 berarti...', options: ['akhir pekan', 'kemarin', 'kantor'], answer: 'akhir pekan' },
    ],
  },
  {
    goal: 'Deskripsikan perubahan memakai 越来越 dan 比以前.',
    vocabulary: [
      { hanzi: '越来越', pinyin: 'yue lai yue', meaning: 'semakin lama semakin' },
      { hanzi: '比以前', pinyin: 'bi yi qian', meaning: 'dibanding sebelumnya' },
      { hanzi: '流利', pinyin: 'liu li', meaning: 'lancar' },
      { hanzi: '清楚', pinyin: 'qing chu', meaning: 'jelas' },
      { hanzi: '习惯', pinyin: 'xi guan', meaning: 'terbiasa/kebiasaan' },
      { hanzi: '改变', pinyin: 'gai bian', meaning: 'berubah/mengubah' },
    ],
    examples: [
      { hanzi: '我的中文越来越流利。', pinyin: 'Wo de Zhongwen yue lai yue liu li.', meaning: 'Mandarin saya semakin lancar.' },
      { hanzi: '现在我比以前说得清楚。', pinyin: 'Xian zai wo bi yi qian shuo de qing chu.', meaning: 'Sekarang saya berbicara lebih jelas daripada sebelumnya.' },
      { hanzi: '每天练习已经成为我的习惯。', pinyin: 'Mei tian lian xi yi jing cheng wei wo de xi guan.', meaning: 'Latihan setiap hari sudah menjadi kebiasaan saya.' },
    ],
    quiz: [
      { question: '越来越 berarti...', options: ['semakin lama semakin', 'tidak pernah', 'di sebelah kiri'], answer: 'semakin lama semakin' },
      { question: '流利 berarti...', options: ['lancar', 'mahal', 'dingin'], answer: 'lancar' },
    ],
  },
  {
    goal: 'Gunakan 把 dasar untuk menekankan objek yang dipindah/diatur.',
    vocabulary: [
      { hanzi: '把', pinyin: 'ba', meaning: 'struktur ba untuk objek terdampak' },
      { hanzi: '放', pinyin: 'fang', meaning: 'meletakkan' },
      { hanzi: '拿', pinyin: 'na', meaning: 'mengambil/membawa' },
      { hanzi: '桌子', pinyin: 'zhuo zi', meaning: 'meja' },
      { hanzi: '房间', pinyin: 'fang jian', meaning: 'kamar' },
      { hanzi: '整理', pinyin: 'zheng li', meaning: 'merapikan' },
    ],
    examples: [
      { hanzi: '请把书放在桌子上。', pinyin: 'Qing ba shu fang zai zhuo zi shang.', meaning: 'Tolong letakkan buku di atas meja.' },
      { hanzi: '我把房间整理好了。', pinyin: 'Wo ba fang jian zheng li hao le.', meaning: 'Saya sudah merapikan kamar.' },
      { hanzi: '他把手机拿走了。', pinyin: 'Ta ba shou ji na zou le.', meaning: 'Dia membawa pergi ponselnya.' },
    ],
    quiz: [
      { question: '把 sentence biasanya menekankan...', options: ['objek yang terdampak aksi', 'nama orang saja', 'nada pertama'], answer: 'objek yang terdampak aksi' },
      { question: '整理 berarti...', options: ['merapikan', 'makan', 'bertanya'], answer: 'merapikan' },
    ],
  },
  {
    goal: 'Kenali 被 passive dasar untuk kejadian yang dialami subjek.',
    vocabulary: [
      { hanzi: '被', pinyin: 'bei', meaning: 'penanda pasif' },
      { hanzi: '拿走', pinyin: 'na zou', meaning: 'diambil pergi' },
      { hanzi: '忘记', pinyin: 'wang ji', meaning: 'lupa' },
      { hanzi: '发现', pinyin: 'fa xian', meaning: 'menemukan/menyadari' },
      { hanzi: '钱包', pinyin: 'qian bao', meaning: 'dompet' },
      { hanzi: '问题', pinyin: 'wen ti', meaning: 'masalah/pertanyaan' },
    ],
    examples: [
      { hanzi: '我的钱包被人拿走了。', pinyin: 'Wo de qian bao bei ren na zou le.', meaning: 'Dompet saya diambil orang.' },
      { hanzi: '这个问题被老师发现了。', pinyin: 'Zhe ge wen ti bei lao shi fa xian le.', meaning: 'Masalah ini ditemukan guru.' },
      { hanzi: '我忘记带书了。', pinyin: 'Wo wang ji dai shu le.', meaning: 'Saya lupa membawa buku.' },
    ],
    quiz: [
      { question: '被 menandai...', options: ['pasif', 'harga murah', 'pertanyaan yes/no'], answer: 'pasif' },
      { question: '钱包 berarti...', options: ['dompet', 'meja', 'ujian'], answer: 'dompet' },
    ],
  },
  {
    goal: 'Pakai complement hasil seperti 好, 完, 到.',
    vocabulary: [
      { hanzi: '做完', pinyin: 'zuo wan', meaning: 'selesai mengerjakan' },
      { hanzi: '写好', pinyin: 'xie hao', meaning: 'selesai menulis dengan baik' },
      { hanzi: '找到', pinyin: 'zhao dao', meaning: 'berhasil menemukan' },
      { hanzi: '听懂', pinyin: 'ting dong', meaning: 'mengerti setelah mendengar' },
      { hanzi: '看见', pinyin: 'kan jian', meaning: 'melihat/terlihat' },
      { hanzi: '完成', pinyin: 'wan cheng', meaning: 'menyelesaikan' },
    ],
    examples: [
      { hanzi: '我做完作业了。', pinyin: 'Wo zuo wan zuo ye le.', meaning: 'Saya sudah menyelesaikan PR.' },
      { hanzi: '你听懂了吗？', pinyin: 'Ni ting dong le ma?', meaning: 'Apakah kamu sudah mengerti setelah mendengar?' },
      { hanzi: '我找到了我的书。', pinyin: 'Wo zhao dao le wo de shu.', meaning: 'Saya berhasil menemukan buku saya.' },
    ],
    quiz: [
      { question: '听懂 berarti...', options: ['mengerti setelah mendengar', 'menulis cepat', 'pergi pulang'], answer: 'mengerti setelah mendengar' },
      { question: '做完 berarti...', options: ['selesai mengerjakan', 'baru mulai', 'terlalu sibuk'], answer: 'selesai mengerjakan' },
    ],
  },
  {
    goal: 'Gunakan 一边...一边... untuk dua aktivitas bersamaan.',
    vocabulary: [
      { hanzi: '一边', pinyin: 'yi bian', meaning: 'sambil/di satu sisi' },
      { hanzi: '听音乐', pinyin: 'ting yin yue', meaning: 'mendengarkan musik' },
      { hanzi: '做作业', pinyin: 'zuo zuo ye', meaning: 'mengerjakan PR' },
      { hanzi: '聊天', pinyin: 'liao tian', meaning: 'mengobrol' },
      { hanzi: '走路', pinyin: 'zou lu', meaning: 'berjalan kaki' },
      { hanzi: '吃饭', pinyin: 'chi fan', meaning: 'makan' },
    ],
    examples: [
      { hanzi: '我一边听音乐一边做作业。', pinyin: 'Wo yi bian ting yin yue yi bian zuo zuo ye.', meaning: 'Saya mengerjakan PR sambil mendengarkan musik.' },
      { hanzi: '他们一边走路一边聊天。', pinyin: 'Ta men yi bian zou lu yi bian liao tian.', meaning: 'Mereka berjalan sambil mengobrol.' },
      { hanzi: '不要一边吃饭一边看手机。', pinyin: 'Bu yao yi bian chi fan yi bian kan shou ji.', meaning: 'Jangan makan sambil melihat ponsel.' },
    ],
    quiz: [
      { question: '一边...一边... berarti...', options: ['sambil melakukan dua aktivitas', 'karena...jadi...', 'lebih...daripada...'], answer: 'sambil melakukan dua aktivitas' },
      { question: '聊天 berarti...', options: ['mengobrol', 'menemukan', 'ujian'], answer: 'mengobrol' },
    ],
  },
  {
    goal: 'Gunakan 除了...以外 untuk menambah informasi.',
    vocabulary: [
      { hanzi: '除了', pinyin: 'chu le', meaning: 'selain' },
      { hanzi: '以外', pinyin: 'yi wai', meaning: 'di luar/selain' },
      { hanzi: '还', pinyin: 'hai', meaning: 'juga/masih' },
      { hanzi: '别的', pinyin: 'bie de', meaning: 'yang lain' },
      { hanzi: '运动', pinyin: 'yun dong', meaning: 'olahraga' },
      { hanzi: '音乐', pinyin: 'yin yue', meaning: 'musik' },
    ],
    examples: [
      { hanzi: '除了中文以外，我还学英语。', pinyin: 'Chu le Zhongwen yi wai, wo hai xue Yingyu.', meaning: 'Selain Mandarin, saya juga belajar bahasa Inggris.' },
      { hanzi: '除了看书以外，他还喜欢运动。', pinyin: 'Chu le kan shu yi wai, ta hai xi huan yun dong.', meaning: 'Selain membaca, dia juga suka olahraga.' },
      { hanzi: '你还有别的问题吗？', pinyin: 'Ni hai you bie de wen ti ma?', meaning: 'Apakah kamu masih punya pertanyaan lain?' },
    ],
    quiz: [
      { question: '除了...以外 berarti...', options: ['selain...', 'sedang...', 'terlalu...'], answer: 'selain...' },
      { question: '还 dalam pola ini berarti...', options: ['juga/masih', 'mahal', 'pasif'], answer: 'juga/masih' },
    ],
  },
  {
    goal: 'Ceritakan keluhan sederhana dan beri solusi.',
    vocabulary: [
      { hanzi: '麻烦', pinyin: 'ma fan', meaning: 'merepotkan/masalah' },
      { hanzi: '解决', pinyin: 'jie jue', meaning: 'menyelesaikan' },
      { hanzi: '办法', pinyin: 'ban fa', meaning: 'cara/solusi' },
      { hanzi: '建议', pinyin: 'jian yi', meaning: 'saran' },
      { hanzi: '应该', pinyin: 'ying gai', meaning: 'seharusnya' },
      { hanzi: '试试', pinyin: 'shi shi', meaning: 'mencoba' },
    ],
    examples: [
      { hanzi: '这个问题有点儿麻烦。', pinyin: 'Zhe ge wen ti you dianr ma fan.', meaning: 'Masalah ini agak merepotkan.' },
      { hanzi: '你应该试试这个办法。', pinyin: 'Ni ying gai shi shi zhe ge ban fa.', meaning: 'Kamu seharusnya mencoba cara ini.' },
      { hanzi: '谢谢你的建议。', pinyin: 'Xie xie ni de jian yi.', meaning: 'Terima kasih atas saranmu.' },
    ],
    quiz: [
      { question: '建议 berarti...', options: ['saran', 'cuaca', 'dompet'], answer: 'saran' },
      { question: '应该 berarti...', options: ['seharusnya', 'pernah', 'semakin'], answer: 'seharusnya' },
    ],
  },
  {
    goal: 'Bicarakan pekerjaan dan tugas harian.',
    vocabulary: [
      { hanzi: '工作', pinyin: 'gong zuo', meaning: 'pekerjaan/bekerja' },
      { hanzi: '同事', pinyin: 'tong shi', meaning: 'rekan kerja' },
      { hanzi: '会议', pinyin: 'hui yi', meaning: 'rapat' },
      { hanzi: '任务', pinyin: 'ren wu', meaning: 'tugas' },
      { hanzi: '老板', pinyin: 'lao ban', meaning: 'bos' },
      { hanzi: '准时', pinyin: 'zhun shi', meaning: 'tepat waktu' },
    ],
    examples: [
      { hanzi: '我今天有一个重要的会议。', pinyin: 'Wo jin tian you yi ge zhong yao de hui yi.', meaning: 'Hari ini saya punya rapat penting.' },
      { hanzi: '老板让我准时完成任务。', pinyin: 'Lao ban rang wo zhun shi wan cheng ren wu.', meaning: 'Bos meminta saya menyelesaikan tugas tepat waktu.' },
      { hanzi: '我的同事很友好。', pinyin: 'Wo de tong shi hen you hao.', meaning: 'Rekan kerja saya ramah.' },
    ],
    quiz: [
      { question: '会议 berarti...', options: ['rapat', 'restoran', 'hobi'], answer: 'rapat' },
      { question: '准时 berarti...', options: ['tepat waktu', 'terlambat', 'semakin cepat'], answer: 'tepat waktu' },
    ],
  },
  {
    goal: 'Diskusikan hobi, frekuensi, dan alasan.',
    vocabulary: [
      { hanzi: '兴趣', pinyin: 'xing qu', meaning: 'minat' },
      { hanzi: '平时', pinyin: 'ping shi', meaning: 'biasanya' },
      { hanzi: '经常', pinyin: 'jing chang', meaning: 'sering' },
      { hanzi: '偶尔', pinyin: 'ou er', meaning: 'sesekali' },
      { hanzi: '放松', pinyin: 'fang song', meaning: 'rileks' },
      { hanzi: '有意思', pinyin: 'you yi si', meaning: 'menarik' },
    ],
    examples: [
      { hanzi: '我平时经常看中文电影。', pinyin: 'Wo ping shi jing chang kan Zhongwen dian ying.', meaning: 'Saya biasanya sering menonton film Mandarin.' },
      { hanzi: '这个爱好让我很放松。', pinyin: 'Zhe ge ai hao rang wo hen fang song.', meaning: 'Hobi ini membuat saya rileks.' },
      { hanzi: '我觉得学习汉字很有意思。', pinyin: 'Wo jue de xue xi Hanzi hen you yi si.', meaning: 'Menurut saya belajar Hanzi menarik.' },
    ],
    quiz: [
      { question: '平时 berarti...', options: ['biasanya', 'selain', 'pasif'], answer: 'biasanya' },
      { question: '放松 berarti...', options: ['rileks', 'ujian', 'meletakkan'], answer: 'rileks' },
    ],
  },
  {
    goal: 'Ceritakan perjalanan singkat dengan urutan waktu.',
    vocabulary: [
      { hanzi: '先', pinyin: 'xian', meaning: 'terlebih dahulu' },
      { hanzi: '然后', pinyin: 'ran hou', meaning: 'lalu' },
      { hanzi: '最后', pinyin: 'zui hou', meaning: 'terakhir' },
      { hanzi: '到达', pinyin: 'dao da', meaning: 'tiba' },
      { hanzi: '出发', pinyin: 'chu fa', meaning: 'berangkat' },
      { hanzi: '机场', pinyin: 'ji chang', meaning: 'bandara' },
    ],
    examples: [
      { hanzi: '我们先去机场，然后坐飞机。', pinyin: 'Wo men xian qu ji chang, ran hou zuo fei ji.', meaning: 'Kami pergi ke bandara dulu, lalu naik pesawat.' },
      { hanzi: '明天早上八点出发。', pinyin: 'Ming tian zao shang ba dian chu fa.', meaning: 'Besok pagi berangkat jam delapan.' },
      { hanzi: '我们下午到达北京。', pinyin: 'Wo men xia wu dao da Beijing.', meaning: 'Kami tiba di Beijing sore hari.' },
    ],
    quiz: [
      { question: '先...然后...最后... dipakai untuk...', options: ['urutan kejadian', 'perbandingan', 'pasif'], answer: 'urutan kejadian' },
      { question: '出发 berarti...', options: ['berangkat', 'tiba', 'menunggu'], answer: 'berangkat' },
    ],
  },
  {
    goal: 'Baca dan tulis pesan formal ringan.',
    vocabulary: [
      { hanzi: '通知', pinyin: 'tong zhi', meaning: 'pengumuman/notifikasi' },
      { hanzi: '请假', pinyin: 'qing jia', meaning: 'meminta izin absen' },
      { hanzi: '原因', pinyin: 'yuan yin', meaning: 'alasan' },
      { hanzi: '如果', pinyin: 'ru guo', meaning: 'jika' },
      { hanzi: '必须', pinyin: 'bi xu', meaning: 'harus' },
      { hanzi: '联系', pinyin: 'lian xi', meaning: 'menghubungi' },
    ],
    examples: [
      { hanzi: '如果你不能来，请联系老师。', pinyin: 'Ru guo ni bu neng lai, qing lian xi lao shi.', meaning: 'Jika kamu tidak bisa datang, hubungi guru.' },
      { hanzi: '我想请假一天，因为我生病了。', pinyin: 'Wo xiang qing jia yi tian, yin wei wo sheng bing le.', meaning: 'Saya ingin izin satu hari karena saya sakit.' },
      { hanzi: '这个通知很重要。', pinyin: 'Zhe ge tong zhi hen zhong yao.', meaning: 'Pengumuman ini penting.' },
    ],
    quiz: [
      { question: '通知 berarti...', options: ['pengumuman', 'hobi', 'perbandingan'], answer: 'pengumuman' },
      { question: '必须 berarti...', options: ['harus', 'boleh jadi', 'pernah'], answer: 'harus' },
    ],
  },
  {
    goal: 'Beri instruksi proses sederhana dengan langkah-langkah.',
    vocabulary: [
      { hanzi: '步骤', pinyin: 'bu zhou', meaning: 'langkah' },
      { hanzi: '打开', pinyin: 'da kai', meaning: 'membuka/menyalakan' },
      { hanzi: '关闭', pinyin: 'guan bi', meaning: 'menutup/mematikan' },
      { hanzi: '选择', pinyin: 'xuan ze', meaning: 'memilih' },
      { hanzi: '输入', pinyin: 'shu ru', meaning: 'memasukkan input' },
      { hanzi: '完成', pinyin: 'wan cheng', meaning: 'menyelesaikan' },
    ],
    examples: [
      { hanzi: '第一步，打开手机。', pinyin: 'Di yi bu, da kai shou ji.', meaning: 'Langkah pertama, buka ponsel.' },
      { hanzi: '然后，输入你的名字。', pinyin: 'Ran hou, shu ru ni de ming zi.', meaning: 'Lalu, masukkan namamu.' },
      { hanzi: '最后，选择中文。', pinyin: 'Zui hou, xuan ze Zhongwen.', meaning: 'Terakhir, pilih bahasa Mandarin.' },
    ],
    quiz: [
      { question: '步骤 berarti...', options: ['langkah', 'saran', 'dompet'], answer: 'langkah' },
      { question: '输入 berarti...', options: ['memasukkan input', 'menutup', 'pergi'], answer: 'memasukkan input' },
    ],
  },
  {
    goal: 'Sampaikan saran dan respons memakai 应该, 可以, dan 最好.',
    vocabulary: [
      { hanzi: '最好', pinyin: 'zui hao', meaning: 'sebaiknya/paling baik' },
      { hanzi: '应该', pinyin: 'ying gai', meaning: 'seharusnya' },
      { hanzi: '可以', pinyin: 'ke yi', meaning: 'boleh/bisa' },
      { hanzi: '注意', pinyin: 'zhu yi', meaning: 'memperhatikan' },
      { hanzi: '健康', pinyin: 'jian kang', meaning: 'sehat/kesehatan' },
      { hanzi: '早点', pinyin: 'zao dian', meaning: 'lebih awal' },
    ],
    examples: [
      { hanzi: '你最好早点休息。', pinyin: 'Ni zui hao zao dian xiu xi.', meaning: 'Sebaiknya kamu istirahat lebih awal.' },
      { hanzi: '学习的时候应该注意声调。', pinyin: 'Xue xi de shi hou ying gai zhu yi sheng diao.', meaning: 'Saat belajar seharusnya memperhatikan tone.' },
      { hanzi: '你可以每天练习十分钟。', pinyin: 'Ni ke yi mei tian lian xi shi fen zhong.', meaning: 'Kamu bisa berlatih 10 menit setiap hari.' },
    ],
    quiz: [
      { question: '最好 berarti...', options: ['sebaiknya/paling baik', 'sudah selesai', 'pasif'], answer: 'sebaiknya/paling baik' },
      { question: '注意 berarti...', options: ['memperhatikan', 'membeli', 'membuka'], answer: 'memperhatikan' },
    ],
  },
  {
    goal: 'Tulis ringkasan singkat dari dialog/teks HSK 3.',
    vocabulary: [
      { hanzi: '总结', pinyin: 'zong jie', meaning: 'meringkas/ringkasan' },
      { hanzi: '主要', pinyin: 'zhu yao', meaning: 'utama' },
      { hanzi: '内容', pinyin: 'nei rong', meaning: 'isi/konten' },
      { hanzi: '意思', pinyin: 'yi si', meaning: 'makna/maksud' },
      { hanzi: '重点', pinyin: 'zhong dian', meaning: 'poin penting' },
      { hanzi: '最后', pinyin: 'zui hou', meaning: 'akhirnya/terakhir' },
    ],
    examples: [
      { hanzi: '这段话的主要内容是学习方法。', pinyin: 'Zhe duan hua de zhu yao nei rong shi xue xi fang fa.', meaning: 'Isi utama paragraf ini adalah metode belajar.' },
      { hanzi: '重点是每天练习。', pinyin: 'Zhong dian shi mei tian lian xi.', meaning: 'Poin pentingnya adalah berlatih setiap hari.' },
      { hanzi: '最后，他决定参加考试。', pinyin: 'Zui hou, ta jue ding can jia kao shi.', meaning: 'Akhirnya, dia memutuskan mengikuti ujian.' },
    ],
    quiz: [
      { question: '主要内容 berarti...', options: ['isi utama', 'harga murah', 'sebelah kanan'], answer: 'isi utama' },
      { question: '重点 berarti...', options: ['poin penting', 'orang asing', 'restoran'], answer: 'poin penting' },
    ],
  },
  {
    goal: 'Buat portfolio HSK 3: dialog, paragraf, listening summary, dan pronunciation review.',
    vocabulary: [
      { hanzi: '复习', pinyin: 'fu xi', meaning: 'review/mengulang' },
      { hanzi: '水平', pinyin: 'shui ping', meaning: 'level/kemampuan' },
      { hanzi: '目标', pinyin: 'mu biao', meaning: 'target' },
      { hanzi: '计划', pinyin: 'ji hua', meaning: 'rencana' },
      { hanzi: '表达', pinyin: 'biao da', meaning: 'mengekspresikan' },
      { hanzi: '自信', pinyin: 'zi xin', meaning: 'percaya diri' },
    ],
    examples: [
      { hanzi: '我的目标是提高口语水平。', pinyin: 'Wo de mu biao shi ti gao kou yu shui ping.', meaning: 'Target saya adalah meningkatkan level speaking.' },
      { hanzi: '我可以用中文表达简单的想法。', pinyin: 'Wo ke yi yong Zhongwen biao da jian dan de xiang fa.', meaning: 'Saya bisa mengekspresikan ide sederhana dalam Mandarin.' },
      { hanzi: '复习以后，我更有自信了。', pinyin: 'Fu xi yi hou, wo geng you zi xin le.', meaning: 'Setelah review, saya lebih percaya diri.' },
    ],
    quiz: [
      { question: '水平 berarti...', options: ['level/kemampuan', 'cuaca', 'meja'], answer: 'level/kemampuan' },
      { question: '表达 berarti...', options: ['mengekspresikan', 'membawa pergi', 'menunggu'], answer: 'mengekspresikan' },
    ],
  },
];

const upperIntermediateLessonPacks: Array<{
  goal: string;
  vocabulary: MandarinLesson['vocabulary'];
  examples: MandarinLesson['examples'];
  quiz: MandarinLesson['practice'];
}> = [
  {
    goal: 'Bangun argumen pendek tentang kebiasaan belajar memakai 认为, 关键, dan 因此.',
    vocabulary: [
      { hanzi: '认为', pinyin: 'ren wei', meaning: 'berpendapat' },
      { hanzi: '关键', pinyin: 'guan jian', meaning: 'kunci/inti' },
      { hanzi: '因此', pinyin: 'yin ci', meaning: 'oleh karena itu' },
      { hanzi: '效率', pinyin: 'xiao lu', meaning: 'efisiensi' },
      { hanzi: '习惯', pinyin: 'xi guan', meaning: 'kebiasaan' },
      { hanzi: '坚持', pinyin: 'jian chi', meaning: 'konsisten/bertahan' },
    ],
    examples: [
      { hanzi: '我认为学习语言的关键不是时间长，而是效率高。', pinyin: 'Wo ren wei xue xi yu yan de guan jian bu shi shi jian chang, er shi xiao lu gao.', meaning: 'Menurut saya kunci belajar bahasa bukan durasi panjang, melainkan efisiensi tinggi.' },
      { hanzi: '每天坚持复习可以帮助我们形成好习惯。', pinyin: 'Mei tian jian chi fu xi ke yi bang zhu wo men xing cheng hao xi guan.', meaning: 'Review setiap hari dapat membantu kita membentuk kebiasaan baik.' },
      { hanzi: '因此，我建议每天练习三十分钟。', pinyin: 'Yin ci, wo jian yi mei tian lian xi san shi fen zhong.', meaning: 'Oleh karena itu, saya menyarankan latihan 30 menit setiap hari.' },
    ],
    quiz: [
      { question: '因此 berarti...', options: ['oleh karena itu', 'selain itu', 'sebelumnya'], answer: 'oleh karena itu' },
      { question: '关键 berarti...', options: ['kunci/inti', 'cuaca', 'transportasi'], answer: 'kunci/inti' },
    ],
  },
  {
    goal: 'Diskusikan dampak teknologi dalam belajar memakai 影响 dan 方便.',
    vocabulary: [
      { hanzi: '科技', pinyin: 'ke ji', meaning: 'teknologi' },
      { hanzi: '影响', pinyin: 'ying xiang', meaning: 'pengaruh/dampak' },
      { hanzi: '方便', pinyin: 'fang bian', meaning: 'praktis/mudah' },
      { hanzi: '网络', pinyin: 'wang luo', meaning: 'internet/jaringan' },
      { hanzi: '资料', pinyin: 'zi liao', meaning: 'materi/data' },
      { hanzi: '缺点', pinyin: 'que dian', meaning: 'kekurangan' },
    ],
    examples: [
      { hanzi: '网络让学习变得更方便。', pinyin: 'Wang luo rang xue xi bian de geng fang bian.', meaning: 'Internet membuat belajar menjadi lebih praktis.' },
      { hanzi: '不过，科技也有一些缺点。', pinyin: 'Bu guo, ke ji ye you yi xie que dian.', meaning: 'Namun, teknologi juga memiliki beberapa kekurangan.' },
      { hanzi: '我们需要选择可靠的学习资料。', pinyin: 'Wo men xu yao xuan ze ke kao de xue xi zi liao.', meaning: 'Kita perlu memilih materi belajar yang dapat dipercaya.' },
    ],
    quiz: [
      { question: '影响 berarti...', options: ['pengaruh/dampak', 'kebiasaan', 'rapat'], answer: 'pengaruh/dampak' },
      { question: '方便 berarti...', options: ['praktis/mudah', 'sulit', 'mahal'], answer: 'praktis/mudah' },
    ],
  },
  {
    goal: 'Bandingkan dua pilihan memakai 与其...不如... dan 比起.',
    vocabulary: [
      { hanzi: '与其', pinyin: 'yu qi', meaning: 'daripada' },
      { hanzi: '不如', pinyin: 'bu ru', meaning: 'lebih baik' },
      { hanzi: '比起', pinyin: 'bi qi', meaning: 'dibandingkan dengan' },
      { hanzi: '选择', pinyin: 'xuan ze', meaning: 'pilihan/memilih' },
      { hanzi: '适合', pinyin: 'shi he', meaning: 'cocok' },
      { hanzi: '浪费', pinyin: 'lang fei', meaning: 'membuang-buang' },
    ],
    examples: [
      { hanzi: '与其浪费时间，不如马上开始练习。', pinyin: 'Yu qi lang fei shi jian, bu ru ma shang kai shi lian xi.', meaning: 'Daripada membuang waktu, lebih baik segera mulai latihan.' },
      { hanzi: '比起一个人学习，我更喜欢和同学练习。', pinyin: 'Bi qi yi ge ren xue xi, wo geng xi huan he tong xue lian xi.', meaning: 'Dibanding belajar sendiri, saya lebih suka latihan dengan teman.' },
      { hanzi: '这个方法不一定适合每个人。', pinyin: 'Zhe ge fang fa bu yi ding shi he mei ge ren.', meaning: 'Metode ini belum tentu cocok untuk semua orang.' },
    ],
    quiz: [
      { question: '与其...不如... berarti...', options: ['daripada..., lebih baik...', 'karena..., jadi...', 'selain..., juga...'], answer: 'daripada..., lebih baik...' },
      { question: '适合 berarti...', options: ['cocok', 'lupa', 'sakit'], answer: 'cocok' },
    ],
  },
  {
    goal: 'Gunakan 不但...而且... untuk menambah argumen.',
    vocabulary: [
      { hanzi: '不但', pinyin: 'bu dan', meaning: 'tidak hanya' },
      { hanzi: '而且', pinyin: 'er qie', meaning: 'tetapi juga' },
      { hanzi: '提高', pinyin: 'ti gao', meaning: 'meningkatkan' },
      { hanzi: '能力', pinyin: 'neng li', meaning: 'kemampuan' },
      { hanzi: '信心', pinyin: 'xin xin', meaning: 'percaya diri' },
      { hanzi: '交流', pinyin: 'jiao liu', meaning: 'berkomunikasi/bertukar pikiran' },
    ],
    examples: [
      { hanzi: '学习中文不但能提高语言能力，而且能增加交流机会。', pinyin: 'Xue xi Zhongwen bu dan neng ti gao yu yan neng li, er qie neng zeng jia jiao liu ji hui.', meaning: 'Belajar Mandarin tidak hanya meningkatkan kemampuan bahasa, tetapi juga menambah kesempatan komunikasi.' },
      { hanzi: '多说话可以增加信心。', pinyin: 'Duo shuo hua ke yi zeng jia xin xin.', meaning: 'Lebih banyak berbicara dapat menambah percaya diri.' },
      { hanzi: '语言能力需要长期练习。', pinyin: 'Yu yan neng li xu yao chang qi lian xi.', meaning: 'Kemampuan bahasa membutuhkan latihan jangka panjang.' },
    ],
    quiz: [
      { question: '不但...而且... dipakai untuk...', options: ['menambahkan argumen', 'menandai pasif', 'menanyakan lokasi'], answer: 'menambahkan argumen' },
      { question: '能力 berarti...', options: ['kemampuan', 'waktu', 'harga'], answer: 'kemampuan' },
    ],
  },
  {
    goal: 'Pakai 既...又... untuk mendeskripsikan dua kualitas sekaligus.',
    vocabulary: [
      { hanzi: '既', pinyin: 'ji', meaning: 'baik/sekali' },
      { hanzi: '又', pinyin: 'you', meaning: 'juga' },
      { hanzi: '实用', pinyin: 'shi yong', meaning: 'praktis/berguna' },
      { hanzi: '有趣', pinyin: 'you qu', meaning: 'menarik' },
      { hanzi: '复杂', pinyin: 'fu za', meaning: 'kompleks' },
      { hanzi: '简单', pinyin: 'jian dan', meaning: 'sederhana' },
    ],
    examples: [
      { hanzi: '这个应用既实用又有趣。', pinyin: 'Zhe ge ying yong ji shi yong you you qu.', meaning: 'Aplikasi ini praktis sekaligus menarik.' },
      { hanzi: '中文语法有时候既简单又复杂。', pinyin: 'Zhongwen yu fa you shi hou ji jian dan you fu za.', meaning: 'Grammar Mandarin kadang sederhana sekaligus kompleks.' },
      { hanzi: '这个解释很清楚。', pinyin: 'Zhe ge jie shi hen qing chu.', meaning: 'Penjelasan ini jelas.' },
    ],
    quiz: [
      { question: '既...又... menyatakan...', options: ['dua kualitas sekaligus', 'urutan waktu', 'harga'], answer: 'dua kualitas sekaligus' },
      { question: '实用 berarti...', options: ['praktis/berguna', 'kompleks', 'terlambat'], answer: 'praktis/berguna' },
    ],
  },
  {
    goal: 'Gunakan 连...都... untuk penekanan.',
    vocabulary: [
      { hanzi: '连', pinyin: 'lian', meaning: 'bahkan' },
      { hanzi: '都', pinyin: 'dou', meaning: 'pun/semua' },
      { hanzi: '忘', pinyin: 'wang', meaning: 'lupa' },
      { hanzi: '记得', pinyin: 'ji de', meaning: 'ingat' },
      { hanzi: '简单', pinyin: 'jian dan', meaning: 'sederhana' },
      { hanzi: '紧张', pinyin: 'jin zhang', meaning: 'gugup/tegang' },
    ],
    examples: [
      { hanzi: '他太紧张了，连自己的名字都忘了。', pinyin: 'Ta tai jin zhang le, lian zi ji de ming zi dou wang le.', meaning: 'Dia terlalu gugup, bahkan namanya sendiri pun lupa.' },
      { hanzi: '这个字很简单，连初学者都会写。', pinyin: 'Zhe ge zi hen jian dan, lian chu xue zhe dou hui xie.', meaning: 'Karakter ini sederhana, bahkan pemula pun bisa menulisnya.' },
      { hanzi: '你还记得这个词吗？', pinyin: 'Ni hai ji de zhe ge ci ma?', meaning: 'Apakah kamu masih ingat kata ini?' },
    ],
    quiz: [
      { question: '连...都... dipakai untuk...', options: ['penekanan', 'lokasi', 'warna'], answer: 'penekanan' },
      { question: '紧张 berarti...', options: ['gugup/tegang', 'lancar', 'murah'], answer: 'gugup/tegang' },
    ],
  },
  {
    goal: 'Diskusikan budaya dan kebiasaan dengan 差异 dan 尊重.',
    vocabulary: [
      { hanzi: '文化', pinyin: 'wen hua', meaning: 'budaya' },
      { hanzi: '差异', pinyin: 'cha yi', meaning: 'perbedaan' },
      { hanzi: '尊重', pinyin: 'zun zhong', meaning: 'menghormati' },
      { hanzi: '习俗', pinyin: 'xi su', meaning: 'adat/kebiasaan' },
      { hanzi: '了解', pinyin: 'liao jie', meaning: 'memahami' },
      { hanzi: '适应', pinyin: 'shi ying', meaning: 'beradaptasi' },
    ],
    examples: [
      { hanzi: '了解文化差异可以减少误会。', pinyin: 'Liao jie wen hua cha yi ke yi jian shao wu hui.', meaning: 'Memahami perbedaan budaya dapat mengurangi salah paham.' },
      { hanzi: '我们应该尊重不同的习俗。', pinyin: 'Wo men ying gai zun zhong bu tong de xi su.', meaning: 'Kita seharusnya menghormati adat yang berbeda.' },
      { hanzi: '刚到一个新国家时，需要时间适应。', pinyin: 'Gang dao yi ge xin guo jia shi, xu yao shi jian shi ying.', meaning: 'Saat baru tiba di negara baru, perlu waktu untuk beradaptasi.' },
    ],
    quiz: [
      { question: '差异 berarti...', options: ['perbedaan', 'kemajuan', 'jadwal'], answer: 'perbedaan' },
      { question: '尊重 berarti...', options: ['menghormati', 'membandingkan', 'menunggu'], answer: 'menghormati' },
    ],
  },
  {
    goal: 'Bahas pekerjaan dan tekanan dengan 压力, 负责, dan 经验.',
    vocabulary: [
      { hanzi: '压力', pinyin: 'ya li', meaning: 'tekanan/stres' },
      { hanzi: '负责', pinyin: 'fu ze', meaning: 'bertanggung jawab atas' },
      { hanzi: '经验', pinyin: 'jing yan', meaning: 'pengalaman' },
      { hanzi: '同事', pinyin: 'tong shi', meaning: 'rekan kerja' },
      { hanzi: '合作', pinyin: 'he zuo', meaning: 'bekerja sama' },
      { hanzi: '解决', pinyin: 'jie jue', meaning: 'menyelesaikan' },
    ],
    examples: [
      { hanzi: '工作压力大的时候，合作很重要。', pinyin: 'Gong zuo ya li da de shi hou, he zuo hen zhong yao.', meaning: 'Saat tekanan kerja besar, kerja sama sangat penting.' },
      { hanzi: '我负责这个项目的一部分。', pinyin: 'Wo fu ze zhe ge xiang mu de yi bu fen.', meaning: 'Saya bertanggung jawab atas sebagian proyek ini.' },
      { hanzi: '他的经验可以帮助我们解决问题。', pinyin: 'Ta de jing yan ke yi bang zhu wo men jie jue wen ti.', meaning: 'Pengalamannya dapat membantu kami menyelesaikan masalah.' },
    ],
    quiz: [
      { question: '负责 berarti...', options: ['bertanggung jawab atas', 'beradaptasi', 'menonton'], answer: 'bertanggung jawab atas' },
      { question: '压力 berarti...', options: ['tekanan/stres', 'kepercayaan diri', 'budaya'], answer: 'tekanan/stres' },
    ],
  },
  {
    goal: 'Baca dan ringkas berita pendek memakai 事件, 原因, 结果.',
    vocabulary: [
      { hanzi: '新闻', pinyin: 'xin wen', meaning: 'berita' },
      { hanzi: '事件', pinyin: 'shi jian', meaning: 'peristiwa' },
      { hanzi: '原因', pinyin: 'yuan yin', meaning: 'alasan/penyebab' },
      { hanzi: '结果', pinyin: 'jie guo', meaning: 'hasil/akibat' },
      { hanzi: '报道', pinyin: 'bao dao', meaning: 'laporan berita' },
      { hanzi: '社会', pinyin: 'she hui', meaning: 'masyarakat' },
    ],
    examples: [
      { hanzi: '这篇新闻报道了一个社会事件。', pinyin: 'Zhe pian xin wen bao dao le yi ge she hui shi jian.', meaning: 'Berita ini melaporkan sebuah peristiwa sosial.' },
      { hanzi: '文章先说明原因，然后介绍结果。', pinyin: 'Wen zhang xian shuo ming yuan yin, ran hou jie shao jie guo.', meaning: 'Artikel menjelaskan penyebab dulu, lalu memperkenalkan hasil.' },
      { hanzi: '我们需要抓住主要信息。', pinyin: 'Wo men xu yao zhua zhu zhu yao xin xi.', meaning: 'Kita perlu menangkap informasi utama.' },
    ],
    quiz: [
      { question: '新闻 berarti...', options: ['berita', 'hobi', 'transportasi'], answer: 'berita' },
      { question: '原因 dan 结果 berarti...', options: ['penyebab dan hasil', 'kiri dan kanan', 'murah dan mahal'], answer: 'penyebab dan hasil' },
    ],
  },
  {
    goal: 'Jelaskan masalah lingkungan ringan dengan 环境 dan 减少.',
    vocabulary: [
      { hanzi: '环境', pinyin: 'huan jing', meaning: 'lingkungan' },
      { hanzi: '污染', pinyin: 'wu ran', meaning: 'polusi' },
      { hanzi: '减少', pinyin: 'jian shao', meaning: 'mengurangi' },
      { hanzi: '保护', pinyin: 'bao hu', meaning: 'melindungi' },
      { hanzi: '垃圾', pinyin: 'la ji', meaning: 'sampah' },
      { hanzi: '影响', pinyin: 'ying xiang', meaning: 'dampak/pengaruh' },
    ],
    examples: [
      { hanzi: '环境污染会影响我们的生活。', pinyin: 'Huan jing wu ran hui ying xiang wo men de sheng huo.', meaning: 'Polusi lingkungan akan memengaruhi hidup kita.' },
      { hanzi: '减少垃圾是保护环境的一个办法。', pinyin: 'Jian shao la ji shi bao hu huan jing de yi ge ban fa.', meaning: 'Mengurangi sampah adalah salah satu cara melindungi lingkungan.' },
      { hanzi: '每个人都可以做一点儿。', pinyin: 'Mei ge ren dou ke yi zuo yi dianr.', meaning: 'Setiap orang bisa melakukan sedikit.' },
    ],
    quiz: [
      { question: '污染 berarti...', options: ['polusi', 'efisiensi', 'kebiasaan'], answer: 'polusi' },
      { question: '保护 berarti...', options: ['melindungi', 'melupakan', 'menjelaskan'], answer: 'melindungi' },
    ],
  },
  {
    goal: 'Diskusikan kesehatan dan gaya hidup memakai 保持 dan 规律.',
    vocabulary: [
      { hanzi: '健康', pinyin: 'jian kang', meaning: 'kesehatan/sehat' },
      { hanzi: '保持', pinyin: 'bao chi', meaning: 'menjaga/mempertahankan' },
      { hanzi: '规律', pinyin: 'gui lv', meaning: 'teratur' },
      { hanzi: '饮食', pinyin: 'yin shi', meaning: 'pola makan' },
      { hanzi: '锻炼', pinyin: 'duan lian', meaning: 'berolahraga/melatih' },
      { hanzi: '精神', pinyin: 'jing shen', meaning: 'energi/mental' },
    ],
    examples: [
      { hanzi: '保持健康需要规律的饮食和锻炼。', pinyin: 'Bao chi jian kang xu yao gui lv de yin shi he duan lian.', meaning: 'Menjaga kesehatan membutuhkan pola makan dan olahraga yang teratur.' },
      { hanzi: '睡得好，精神就会更好。', pinyin: 'Shui de hao, jing shen jiu hui geng hao.', meaning: 'Jika tidur baik, energi/mental akan lebih baik.' },
      { hanzi: '我打算每天锻炼半个小时。', pinyin: 'Wo da suan mei tian duan lian ban ge xiao shi.', meaning: 'Saya berencana berolahraga setengah jam setiap hari.' },
    ],
    quiz: [
      { question: '保持健康 berarti...', options: ['menjaga kesehatan', 'membuang sampah', 'mengirim pesan'], answer: 'menjaga kesehatan' },
      { question: '规律 berarti...', options: ['teratur', 'gugup', 'kompleks'], answer: 'teratur' },
    ],
  },
  {
    goal: 'Berikan saran bernuansa dengan 最好, 尽量, dan 避免.',
    vocabulary: [
      { hanzi: '尽量', pinyin: 'jin liang', meaning: 'sebisa mungkin' },
      { hanzi: '避免', pinyin: 'bi mian', meaning: 'menghindari' },
      { hanzi: '最好', pinyin: 'zui hao', meaning: 'sebaiknya' },
      { hanzi: '建议', pinyin: 'jian yi', meaning: 'saran' },
      { hanzi: '情况', pinyin: 'qing kuang', meaning: 'situasi' },
      { hanzi: '改变', pinyin: 'gai bian', meaning: 'mengubah/perubahan' },
    ],
    examples: [
      { hanzi: '你最好根据自己的情况安排时间。', pinyin: 'Ni zui hao gen ju zi ji de qing kuang an pai shi jian.', meaning: 'Sebaiknya kamu mengatur waktu berdasarkan situasimu sendiri.' },
      { hanzi: '学习时尽量避免看手机。', pinyin: 'Xue xi shi jin liang bi mian kan shou ji.', meaning: 'Saat belajar, sebisa mungkin hindari melihat ponsel.' },
      { hanzi: '这个建议可以改变你的学习习惯。', pinyin: 'Zhe ge jian yi ke yi gai bian ni de xue xi xi guan.', meaning: 'Saran ini bisa mengubah kebiasaan belajarmu.' },
    ],
    quiz: [
      { question: '尽量 berarti...', options: ['sebisa mungkin', 'bahkan', 'pasif'], answer: 'sebisa mungkin' },
      { question: '避免 berarti...', options: ['menghindari', 'menambah', 'berangkat'], answer: 'menghindari' },
    ],
  },
  {
    goal: 'Gunakan 把/被 dalam konteks masalah dan solusi.',
    vocabulary: [
      { hanzi: '文件', pinyin: 'wen jian', meaning: 'dokumen/file' },
      { hanzi: '保存', pinyin: 'bao cun', meaning: 'menyimpan' },
      { hanzi: '删除', pinyin: 'shan chu', meaning: 'menghapus' },
      { hanzi: '恢复', pinyin: 'hui fu', meaning: 'memulihkan' },
      { hanzi: '系统', pinyin: 'xi tong', meaning: 'sistem' },
      { hanzi: '错误', pinyin: 'cuo wu', meaning: 'kesalahan/error' },
    ],
    examples: [
      { hanzi: '我把文件保存好了。', pinyin: 'Wo ba wen jian bao cun hao le.', meaning: 'Saya sudah menyimpan file dengan baik.' },
      { hanzi: '文件被系统删除了。', pinyin: 'Wen jian bei xi tong shan chu le.', meaning: 'File dihapus oleh sistem.' },
      { hanzi: '我们需要恢复这些文件。', pinyin: 'Wo men xu yao hui fu zhe xie wen jian.', meaning: 'Kami perlu memulihkan file-file ini.' },
    ],
    quiz: [
      { question: '保存 berarti...', options: ['menyimpan', 'menghapus', 'membandingkan'], answer: 'menyimpan' },
      { question: '文件被系统删除了 memakai pola...', options: ['被 passive', '把 sentence', '既...又...'], answer: '被 passive' },
    ],
  },
  {
    goal: 'Baca teks menengah dan identifikasi sikap penulis.',
    vocabulary: [
      { hanzi: '态度', pinyin: 'tai du', meaning: 'sikap' },
      { hanzi: '支持', pinyin: 'zhi chi', meaning: 'mendukung' },
      { hanzi: '反对', pinyin: 'fan dui', meaning: 'menentang' },
      { hanzi: '观点', pinyin: 'guan dian', meaning: 'sudut pandang' },
      { hanzi: '理由', pinyin: 'li you', meaning: 'alasan' },
      { hanzi: '明显', pinyin: 'ming xian', meaning: 'jelas/nyata' },
    ],
    examples: [
      { hanzi: '作者的态度比较明显，他支持这个观点。', pinyin: 'Zuo zhe de tai du bi jiao ming xian, ta zhi chi zhe ge guan dian.', meaning: 'Sikap penulis cukup jelas, dia mendukung pandangan ini.' },
      { hanzi: '他反对这个做法的主要理由是效率低。', pinyin: 'Ta fan dui zhe ge zuo fa de zhu yao li you shi xiao lu di.', meaning: 'Alasan utama dia menentang cara ini adalah efisiensinya rendah.' },
      { hanzi: '阅读时要注意作者的观点。', pinyin: 'Yue du shi yao zhu yi zuo zhe de guan dian.', meaning: 'Saat membaca, perhatikan sudut pandang penulis.' },
    ],
    quiz: [
      { question: '态度 berarti...', options: ['sikap', 'lingkungan', 'rapat'], answer: 'sikap' },
      { question: '支持 dan 反对 berarti...', options: ['mendukung dan menentang', 'besar dan kecil', 'sebelum dan sesudah'], answer: 'mendukung dan menentang' },
    ],
  },
  {
    goal: 'Tulis paragraf sebab-akibat dengan 因此, 导致, dan 结果.',
    vocabulary: [
      { hanzi: '导致', pinyin: 'dao zhi', meaning: 'menyebabkan' },
      { hanzi: '结果', pinyin: 'jie guo', meaning: 'hasil/akibat' },
      { hanzi: '原因', pinyin: 'yuan yin', meaning: 'penyebab' },
      { hanzi: '变化', pinyin: 'bian hua', meaning: 'perubahan' },
      { hanzi: '严重', pinyin: 'yan zhong', meaning: 'serius/parah' },
      { hanzi: '因此', pinyin: 'yin ci', meaning: 'oleh karena itu' },
    ],
    examples: [
      { hanzi: '长时间看手机会导致眼睛不舒服。', pinyin: 'Chang shi jian kan shou ji hui dao zhi yan jing bu shu fu.', meaning: 'Melihat ponsel terlalu lama dapat menyebabkan mata tidak nyaman.' },
      { hanzi: '这个问题越来越严重，因此需要改变。', pinyin: 'Zhe ge wen ti yue lai yue yan zhong, yin ci xu yao gai bian.', meaning: 'Masalah ini semakin serius, oleh karena itu perlu perubahan.' },
      { hanzi: '原因和结果都很清楚。', pinyin: 'Yuan yin he jie guo dou hen qing chu.', meaning: 'Penyebab dan hasilnya sama-sama jelas.' },
    ],
    quiz: [
      { question: '导致 berarti...', options: ['menyebabkan', 'menghormati', 'menyimpan'], answer: 'menyebabkan' },
      { question: '严重 berarti...', options: ['serius/parah', 'praktis', 'murah'], answer: 'serius/parah' },
    ],
  },
  {
    goal: 'Presentasikan data sederhana dengan 百分比, 增加, 减少.',
    vocabulary: [
      { hanzi: '数据', pinyin: 'shu ju', meaning: 'data' },
      { hanzi: '百分比', pinyin: 'bai fen bi', meaning: 'persentase' },
      { hanzi: '增加', pinyin: 'zeng jia', meaning: 'meningkat/menambah' },
      { hanzi: '减少', pinyin: 'jian shao', meaning: 'berkurang/mengurangi' },
      { hanzi: '大约', pinyin: 'da yue', meaning: 'sekitar/kira-kira' },
      { hanzi: '说明', pinyin: 'shuo ming', meaning: 'menjelaskan/menunjukkan' },
    ],
    examples: [
      { hanzi: '这个数据说明学习人数增加了。', pinyin: 'Zhe ge shu ju shuo ming xue xi ren shu zeng jia le.', meaning: 'Data ini menunjukkan jumlah pelajar meningkat.' },
      { hanzi: '大约百分之三十的学生每天练习。', pinyin: 'Da yue bai fen zhi san shi de xue sheng mei tian lian xi.', meaning: 'Sekitar 30 persen siswa berlatih setiap hari.' },
      { hanzi: '错误的数量减少了。', pinyin: 'Cuo wu de shu liang jian shao le.', meaning: 'Jumlah kesalahan berkurang.' },
    ],
    quiz: [
      { question: '数据 berarti...', options: ['data', 'budaya', 'saran'], answer: 'data' },
      { question: '增加 dan 减少 berarti...', options: ['meningkat dan berkurang', 'mendukung dan menentang', 'besar dan kecil'], answer: 'meningkat dan berkurang' },
    ],
  },
  {
    goal: 'Kelola diskusi dengan setuju, tidak setuju, dan kompromi.',
    vocabulary: [
      { hanzi: '同意', pinyin: 'tong yi', meaning: 'setuju' },
      { hanzi: '不同意', pinyin: 'bu tong yi', meaning: 'tidak setuju' },
      { hanzi: '看法', pinyin: 'kan fa', meaning: 'pandangan' },
      { hanzi: '讨论', pinyin: 'tao lun', meaning: 'diskusi' },
      { hanzi: '接受', pinyin: 'jie shou', meaning: 'menerima' },
      { hanzi: '改变主意', pinyin: 'gai bian zhu yi', meaning: 'mengubah pikiran' },
    ],
    examples: [
      { hanzi: '我同意你的看法，但是还需要更多资料。', pinyin: 'Wo tong yi ni de kan fa, dan shi hai xu yao geng duo zi liao.', meaning: 'Saya setuju dengan pandanganmu, tetapi masih perlu lebih banyak data.' },
      { hanzi: '我不太同意这个决定。', pinyin: 'Wo bu tai tong yi zhe ge jue ding.', meaning: 'Saya tidak terlalu setuju dengan keputusan ini.' },
      { hanzi: '讨论以后，他改变主意了。', pinyin: 'Tao lun yi hou, ta gai bian zhu yi le.', meaning: 'Setelah diskusi, dia berubah pikiran.' },
    ],
    quiz: [
      { question: '看法 berarti...', options: ['pandangan', 'file', 'persentase'], answer: 'pandangan' },
      { question: '不太同意 berarti...', options: ['tidak terlalu setuju', 'sangat setuju', 'belum mengerti'], answer: 'tidak terlalu setuju' },
    ],
  },
  {
    goal: 'Review HSK 4 dengan esai pendek, dialog, dan summary.',
    vocabulary: [
      { hanzi: '复习', pinyin: 'fu xi', meaning: 'review' },
      { hanzi: '总结', pinyin: 'zong jie', meaning: 'meringkas' },
      { hanzi: '表达', pinyin: 'biao da', meaning: 'mengekspresikan' },
      { hanzi: '逻辑', pinyin: 'luo ji', meaning: 'logika' },
      { hanzi: '结构', pinyin: 'jie gou', meaning: 'struktur' },
      { hanzi: '自然', pinyin: 'zi ran', meaning: 'natural' },
    ],
    examples: [
      { hanzi: '复习的重点是表达清楚、结构自然。', pinyin: 'Fu xi de zhong dian shi biao da qing chu, jie gou zi ran.', meaning: 'Fokus review adalah ekspresi jelas dan struktur natural.' },
      { hanzi: '写作时要注意逻辑。', pinyin: 'Xie zuo shi yao zhu yi luo ji.', meaning: 'Saat menulis perlu memperhatikan logika.' },
      { hanzi: '我可以总结一篇短文的主要内容。', pinyin: 'Wo ke yi zong jie yi pian duan wen de zhu yao nei rong.', meaning: 'Saya bisa merangkum isi utama sebuah teks pendek.' },
    ],
    quiz: [
      { question: '逻辑 berarti...', options: ['logika', 'polusi', 'menu'], answer: 'logika' },
      { question: '结构 berarti...', options: ['struktur', 'sistem error', 'hobi'], answer: 'struktur' },
    ],
  },
];

export function getMandarinLessonPreview(skillId: MandarinSkillId, lesson: number, level: MandarinLevelId = 'beginner') {
  const safeLesson = Math.max(1, Math.min(20, lesson));
  if (level === 'beginner') return beginnerTopics[skillId][safeLesson - 1] ?? `HSK 1 ${skillId} Lesson ${safeLesson}`;
  if (level === 'advanced') return advancedTopics[skillId][safeLesson - 1] ?? `HSK 5 ${skillId} Lesson ${safeLesson}`;
  if (level === 'proficiency') return proficiencyTopics[skillId][safeLesson - 1] ?? `HSK 6 ${skillId} Lesson ${safeLesson}`;
  if (level === 'hsk-7') return `HSK 7 ${proficiencyTopics[skillId][safeLesson - 1] ?? `${skillId} Lesson ${safeLesson}`}`;
  if (level === 'hsk-8') return `HSK 8 ${proficiencyTopics[skillId][safeLesson - 1] ?? `${skillId} Lesson ${safeLesson}`}`;
  if (level === 'hsk-9') return `HSK 9 ${proficiencyTopics[skillId][safeLesson - 1] ?? `${skillId} Lesson ${safeLesson}`}`;
  return topics[skillId][safeLesson - 1] ?? `Lesson ${safeLesson}`;
}

export function getMandarinLesson(skillId: MandarinSkillId, lesson: number, level: MandarinLevelId): MandarinLesson {
  const safeLesson = Math.max(1, Math.min(20, lesson));
  const topic = getMandarinLessonPreview(skillId, safeLesson, level);
  const meta = levelMeta[level];
  const skillName = skillId.charAt(0).toUpperCase() + skillId.slice(1);
  const isBeginner = level === 'beginner';
  const isElementary = level === 'elementary';
  const isIntermediate = level === 'intermediate';
  const isUpperIntermediate = level === 'upper-intermediate';
  const isAdvanced = level === 'advanced';
  const isProficiency = level === 'proficiency';
  const isHsk7 = level === 'hsk-7';
  const isHsk8 = level === 'hsk-8';
  const isHsk9 = level === 'hsk-9';
  const isPostHsk = isHsk7 || isHsk8 || isHsk9;
  const beginnerPack = beginnerLessonPacks[safeLesson - 1] ?? beginnerLessonPacks[0];
  const elementaryPack = elementaryLessonPacks[safeLesson - 1] ?? elementaryLessonPacks[0];
  const intermediatePack = intermediateLessonPacks[safeLesson - 1] ?? intermediateLessonPacks[0];
  const upperIntermediatePacks = [...upperIntermediateLessonPacks, ...upperIntermediateExtraLessonPacks];
  const upperIntermediatePack = upperIntermediatePacks[safeLesson - 1] ?? upperIntermediatePacks[0];
  const advancedThemes = [
    { title: 'Urbanisation and Lifestyle', goal: 'Analisis dampak urbanisasi terhadap gaya hidup dan hubungan sosial.' },
    { title: 'Technology Ethics', goal: 'Bahas manfaat, risiko, dan batas etika teknologi dalam kehidupan modern.' },
    { title: 'Education Reform', goal: 'Evaluasi metode belajar, tekanan ujian, dan pembelajaran mandiri.' },
    { title: 'Workplace Culture', goal: 'Jelaskan budaya kerja, efisiensi, tanggung jawab, dan komunikasi profesional.' },
    { title: 'Environmental Policy', goal: 'Susun argumen tentang kebijakan lingkungan dan tanggung jawab masyarakat.' },
    { title: 'Media Literacy', goal: 'Bedakan fakta, opini, bias, dan kesimpulan dalam berita atau media sosial.' },
    { title: 'Consumer Behaviour', goal: 'Analisis keputusan konsumen, iklan, harga, kualitas, dan nilai merek.' },
    { title: 'Health and Mental Balance', goal: 'Diskusikan kesehatan mental, tekanan hidup, dan kebiasaan jangka panjang.' },
    { title: 'Cultural Identity', goal: 'Jelaskan identitas budaya, tradisi, globalisasi, dan adaptasi lintas budaya.' },
    { title: 'Economic Trends', goal: 'Interpretasikan tren ekonomi sederhana, peluang, tantangan, dan dampaknya.' },
    { title: 'Public Transportation', goal: 'Bandingkan solusi transportasi kota dari sisi biaya, efisiensi, dan lingkungan.' },
    { title: 'Artificial Intelligence', goal: 'Bahas AI sebagai alat bantu, ancaman pekerjaan, dan kebutuhan regulasi.' },
    { title: 'Aging Society', goal: 'Analisis populasi menua, keluarga, layanan publik, dan tanggung jawab sosial.' },
    { title: 'Online Learning', goal: 'Evaluasi kelebihan dan keterbatasan pembelajaran online secara seimbang.' },
    { title: 'Volunteerism', goal: 'Jelaskan nilai kegiatan sukarela bagi individu dan masyarakat.' },
    { title: 'Career Planning', goal: 'Buat argumen tentang pilihan karier, minat, stabilitas, dan pengembangan diri.' },
    { title: 'Reading Abstract Essays', goal: 'Latih membaca esai abstrak dengan mencari tesis, argumen, dan implikasi.' },
    { title: 'Formal Writing', goal: 'Tulis paragraf formal dengan transisi, bukti, sanggahan, dan kesimpulan.' },
    { title: 'Advanced Pronunciation Flow', goal: 'Latih intonasi wacana panjang, jeda retoris, dan penekanan kata kunci.' },
    { title: 'HSK 5 Portfolio', goal: 'Gabungkan speaking, reading, writing, vocabulary, grammar, listening, dan pronunciation dalam output akhir.' },
  ];
  const advancedTheme = advancedThemes[safeLesson - 1] ?? advancedThemes[0];
  const advancedCoreVocabulary: MandarinLesson['vocabulary'] = [
    { hanzi: '社会现象', pinyin: 'she hui xian xiang', meaning: 'fenomena sosial' },
    { hanzi: '价值观', pinyin: 'jia zhi guan', meaning: 'nilai/pandangan hidup' },
    { hanzi: '趋势', pinyin: 'qu shi', meaning: 'tren' },
    { hanzi: '挑战', pinyin: 'tiao zhan', meaning: 'tantangan' },
    { hanzi: '优势', pinyin: 'you shi', meaning: 'keunggulan' },
    { hanzi: '限制', pinyin: 'xian zhi', meaning: 'batasan' },
    { hanzi: '效率', pinyin: 'xiao lu', meaning: 'efisiensi' },
    { hanzi: '承担', pinyin: 'cheng dan', meaning: 'menanggung/memikul' },
    { hanzi: '促进', pinyin: 'cu jin', meaning: 'mendorong/memajukan' },
    { hanzi: '忽视', pinyin: 'hu shi', meaning: 'mengabaikan' },
    { hanzi: '相反', pinyin: 'xiang fan', meaning: 'sebaliknya' },
    { hanzi: '由此可见', pinyin: 'you ci ke jian', meaning: 'dari sini dapat terlihat' },
  ];
  const advancedPack = {
    goal: advancedTheme.goal,
    vocabulary: advancedCoreVocabulary,
    examples: [
      { hanzi: '这种社会现象反映了人们价值观的变化。', pinyin: 'Zhe zhong she hui xian xiang fan ying le ren men jia zhi guan de bian hua.', meaning: 'Fenomena sosial ini mencerminkan perubahan nilai masyarakat.' },
      { hanzi: '虽然这种趋势带来了新的机会，但也产生了一些值得注意的挑战。', pinyin: 'Sui ran zhe zhong qu shi dai lai le xin de ji hui, dan ye chan sheng le yi xie zhi de zhu yi de tiao zhan.', meaning: 'Walaupun tren ini membawa peluang baru, ia juga menimbulkan tantangan yang perlu diperhatikan.' },
      { hanzi: '由此可见，我们不能只看短期效率，还要考虑长期影响。', pinyin: 'You ci ke jian, wo men bu neng zhi kan duan qi xiao lu, hai yao kao lv chang qi ying xiang.', meaning: 'Dari sini terlihat bahwa kita tidak boleh hanya melihat efisiensi jangka pendek, tetapi juga mempertimbangkan dampak jangka panjang.' },
    ],
    quiz: [
      { question: '由此可见 biasanya dipakai untuk...', options: ['menarik kesimpulan dari argumen', 'menanyakan nama', 'membuka harga'], answer: 'menarik kesimpulan dari argumen' },
      { question: '趋势 berarti...', options: ['tren/arah perkembangan', 'kamar tidur', 'nada netral'], answer: 'tren/arah perkembangan' },
      { question: '忽视 berarti...', options: ['mengabaikan', 'mempercepat', 'membayar'], answer: 'mengabaikan' },
    ],
  };
  const proficiencyThemes = [
    { title: 'Governance and Public Trust', goal: 'Sintesis isu tata kelola, legitimasi, dan kepercayaan publik dengan argumen bernuansa.' },
    { title: 'Technology and Human Agency', goal: 'Bahas hubungan teknologi, otonomi manusia, etika, dan tanggung jawab sosial.' },
    { title: 'Education Inequality', goal: 'Analisis ketimpangan pendidikan dari sudut struktural, budaya, dan kebijakan.' },
    { title: 'Sustainable Development', goal: 'Evaluasi pertumbuhan ekonomi, lingkungan, dan kesejahteraan jangka panjang.' },
    { title: 'Media and Public Opinion', goal: 'Kritisi pembentukan opini publik, framing media, bias, dan literasi informasi.' },
    { title: 'Labour Market Transformation', goal: 'Sintesis perubahan pasar kerja, otomatisasi, keterampilan, dan perlindungan sosial.' },
    { title: 'Cultural Continuity', goal: 'Diskusikan kesinambungan budaya, modernitas, dan negosiasi identitas.' },
    { title: 'Urban Governance', goal: 'Analisis kota sebagai sistem sosial: mobilitas, perumahan, layanan publik, dan inklusi.' },
    { title: 'Public Health Ethics', goal: 'Bahas pilihan kebijakan kesehatan antara kebebasan individu dan kepentingan kolektif.' },
    { title: 'Innovation and Risk', goal: 'Evaluasi inovasi sebagai peluang sekaligus sumber risiko yang perlu dikelola.' },
    { title: 'Globalisation and Local Agency', goal: 'Bahas globalisasi tanpa mengabaikan konteks lokal dan kapasitas masyarakat.' },
    { title: 'Institutional Reform', goal: 'Susun argumen tentang reformasi institusi, transparansi, dan akuntabilitas.' },
    { title: 'Social Mobility', goal: 'Analisis mobilitas sosial, kesempatan, modal budaya, dan hambatan struktural.' },
    { title: 'Environmental Justice', goal: 'Diskusikan keadilan lingkungan dan distribusi beban pembangunan.' },
    { title: 'Cross-cultural Negotiation', goal: 'Latih mediasi gagasan lintas budaya dengan register profesional.' },
    { title: 'Academic Text Synthesis', goal: 'Gabungkan dua sudut pandang menjadi sintesis yang koheren.' },
    { title: 'Critical Review', goal: 'Tulis kritik terhadap argumen dengan bukti, asumsi, dan implikasi.' },
    { title: 'Executive Briefing', goal: 'Ringkas isu kompleks menjadi rekomendasi strategis singkat.' },
    { title: 'Rhetorical Mastery', goal: 'Kuasai intonasi, jeda, dan retorika untuk wacana panjang.' },
    { title: 'HSK 6 Capstone', goal: 'Buat portfolio akhir berupa esai, presentasi, ringkasan audio, dan refleksi kosakata.' },
  ];
  const proficiencyTheme = proficiencyThemes[safeLesson - 1] ?? proficiencyThemes[0];
  const proficiencyCoreVocabulary: MandarinLesson['vocabulary'] = [
    { hanzi: '不可否认', pinyin: 'bu ke fou ren', meaning: 'tidak dapat disangkal' },
    { hanzi: '归根结底', pinyin: 'gui gen jie di', meaning: 'pada akhirnya / akar masalahnya' },
    { hanzi: '权衡利弊', pinyin: 'quan heng li bi', meaning: 'menimbang untung rugi' },
    { hanzi: '潜在影响', pinyin: 'qian zai ying xiang', meaning: 'dampak potensial' },
    { hanzi: '长远来看', pinyin: 'chang yuan lai kan', meaning: 'dalam jangka panjang' },
    { hanzi: '结构性问题', pinyin: 'jie gou xing wen ti', meaning: 'masalah struktural' },
    { hanzi: '核心矛盾', pinyin: 'he xin mao dun', meaning: 'kontradiksi inti' },
    { hanzi: '制度安排', pinyin: 'zhi du an pai', meaning: 'pengaturan institusional' },
    { hanzi: '舆论', pinyin: 'yu lun', meaning: 'opini publik' },
    { hanzi: '韧性', pinyin: 'ren xing', meaning: 'resiliensi/daya lenting' },
    { hanzi: '取舍', pinyin: 'qu she', meaning: 'trade-off / pilihan mengorbankan sesuatu' },
    { hanzi: '不容忽视', pinyin: 'bu rong hu shi', meaning: 'tidak boleh diabaikan' },
  ];
  const proficiencyThemeVocabulary: MandarinLesson['vocabulary'][] = [
    [
      { hanzi: '公共信任', pinyin: 'gong gong xin ren', meaning: 'kepercayaan publik' },
      { hanzi: '合法性', pinyin: 'he fa xing', meaning: 'legitimasi' },
      { hanzi: '透明度', pinyin: 'tou ming du', meaning: 'transparansi' },
      { hanzi: '问责机制', pinyin: 'wen ze ji zhi', meaning: 'mekanisme akuntabilitas' },
    ],
    [
      { hanzi: '主体性', pinyin: 'zhu ti xing', meaning: 'agency/otonomi subjek' },
      { hanzi: '伦理边界', pinyin: 'lun li bian jie', meaning: 'batas etika' },
      { hanzi: '算法偏见', pinyin: 'suan fa pian jian', meaning: 'bias algoritma' },
      { hanzi: '技术依赖', pinyin: 'ji shu yi lai', meaning: 'ketergantungan teknologi' },
    ],
    [
      { hanzi: '教育公平', pinyin: 'jiao yu gong ping', meaning: 'keadilan pendidikan' },
      { hanzi: '资源分配', pinyin: 'zi yuan fen pei', meaning: 'distribusi sumber daya' },
      { hanzi: '阶层流动', pinyin: 'jie ceng liu dong', meaning: 'mobilitas kelas sosial' },
      { hanzi: '机会不均', pinyin: 'ji hui bu jun', meaning: 'ketidakmerataan peluang' },
    ],
    [
      { hanzi: '可持续性', pinyin: 'ke chi xu xing', meaning: 'keberlanjutan' },
      { hanzi: '生态成本', pinyin: 'sheng tai cheng ben', meaning: 'biaya ekologis' },
      { hanzi: '代际公平', pinyin: 'dai ji gong ping', meaning: 'keadilan antargenerasi' },
      { hanzi: '绿色转型', pinyin: 'lv se zhuan xing', meaning: 'transisi hijau' },
    ],
    [
      { hanzi: '舆论引导', pinyin: 'yu lun yin dao', meaning: 'pengarahan opini publik' },
      { hanzi: '信息茧房', pinyin: 'xin xi jian fang', meaning: 'echo chamber informasi' },
      { hanzi: '媒介素养', pinyin: 'mei jie su yang', meaning: 'literasi media' },
      { hanzi: '话语权', pinyin: 'hua yu quan', meaning: 'kuasa wacana' },
    ],
    [
      { hanzi: '劳动保障', pinyin: 'lao dong bao zhang', meaning: 'perlindungan tenaga kerja' },
      { hanzi: '技能转型', pinyin: 'ji neng zhuan xing', meaning: 'transformasi keterampilan' },
      { hanzi: '就业弹性', pinyin: 'jiu ye tan xing', meaning: 'fleksibilitas kerja' },
      { hanzi: '替代风险', pinyin: 'ti dai feng xian', meaning: 'risiko tergantikan' },
    ],
    [
      { hanzi: '文化传承', pinyin: 'wen hua chuan cheng', meaning: 'pewarisan budaya' },
      { hanzi: '身份认同', pinyin: 'shen fen ren tong', meaning: 'identitas diri/kolektif' },
      { hanzi: '现代性', pinyin: 'xian dai xing', meaning: 'modernitas' },
      { hanzi: '本土语境', pinyin: 'ben tu yu jing', meaning: 'konteks lokal' },
    ],
    [
      { hanzi: '城市治理', pinyin: 'cheng shi zhi li', meaning: 'tata kelola kota' },
      { hanzi: '公共服务', pinyin: 'gong gong fu wu', meaning: 'layanan publik' },
      { hanzi: '空间正义', pinyin: 'kong jian zheng yi', meaning: 'keadilan ruang' },
      { hanzi: '基础设施', pinyin: 'ji chu she shi', meaning: 'infrastruktur' },
    ],
    [
      { hanzi: '公共卫生', pinyin: 'gong gong wei sheng', meaning: 'kesehatan publik' },
      { hanzi: '个人自由', pinyin: 'ge ren zi you', meaning: 'kebebasan individu' },
      { hanzi: '集体利益', pinyin: 'ji ti li yi', meaning: 'kepentingan kolektif' },
      { hanzi: '风险沟通', pinyin: 'feng xian gou tong', meaning: 'komunikasi risiko' },
    ],
    [
      { hanzi: '风险治理', pinyin: 'feng xian zhi li', meaning: 'tata kelola risiko' },
      { hanzi: '创新生态', pinyin: 'chuang xin sheng tai', meaning: 'ekosistem inovasi' },
      { hanzi: '试错成本', pinyin: 'shi cuo cheng ben', meaning: 'biaya trial-and-error' },
      { hanzi: '监管框架', pinyin: 'jian guan kuang jia', meaning: 'kerangka regulasi' },
    ],
    [
      { hanzi: '全球化', pinyin: 'quan qiu hua', meaning: 'globalisasi' },
      { hanzi: '地方能动性', pinyin: 'di fang neng dong xing', meaning: 'agency lokal' },
      { hanzi: '文化适应', pinyin: 'wen hua shi ying', meaning: 'adaptasi budaya' },
      { hanzi: '相互依存', pinyin: 'xiang hu yi cun', meaning: 'saling bergantung' },
    ],
    [
      { hanzi: '制度改革', pinyin: 'zhi du gai ge', meaning: 'reformasi institusi' },
      { hanzi: '执行力', pinyin: 'zhi xing li', meaning: 'kapasitas eksekusi' },
      { hanzi: '监督体系', pinyin: 'jian du ti xi', meaning: 'sistem pengawasan' },
      { hanzi: '路径依赖', pinyin: 'lu jing yi lai', meaning: 'path dependency' },
    ],
    [
      { hanzi: '社会流动', pinyin: 'she hui liu dong', meaning: 'mobilitas sosial' },
      { hanzi: '文化资本', pinyin: 'wen hua zi ben', meaning: 'modal budaya' },
      { hanzi: '阶层固化', pinyin: 'jie ceng gu hua', meaning: 'pengerasan kelas sosial' },
      { hanzi: '机会结构', pinyin: 'ji hui jie gou', meaning: 'struktur peluang' },
    ],
    [
      { hanzi: '环境正义', pinyin: 'huan jing zheng yi', meaning: 'keadilan lingkungan' },
      { hanzi: '污染负担', pinyin: 'wu ran fu dan', meaning: 'beban polusi' },
      { hanzi: '补偿机制', pinyin: 'bu chang ji zhi', meaning: 'mekanisme kompensasi' },
      { hanzi: '生态责任', pinyin: 'sheng tai ze ren', meaning: 'tanggung jawab ekologis' },
    ],
    [
      { hanzi: '跨文化沟通', pinyin: 'kua wen hua gou tong', meaning: 'komunikasi lintas budaya' },
      { hanzi: '谈判立场', pinyin: 'tan pan li chang', meaning: 'posisi negosiasi' },
      { hanzi: '共同利益', pinyin: 'gong tong li yi', meaning: 'kepentingan bersama' },
      { hanzi: '误读', pinyin: 'wu du', meaning: 'salah menafsirkan' },
    ],
    [
      { hanzi: '文献综述', pinyin: 'wen xian zong shu', meaning: 'literature review' },
      { hanzi: '观点整合', pinyin: 'guan dian zheng he', meaning: 'integrasi pandangan' },
      { hanzi: '理论框架', pinyin: 'li lun kuang jia', meaning: 'kerangka teori' },
      { hanzi: '论证链条', pinyin: 'lun zheng lian tiao', meaning: 'rantai argumentasi' },
    ],
    [
      { hanzi: '批判性阅读', pinyin: 'pi pan xing yue du', meaning: 'critical reading' },
      { hanzi: '证据强度', pinyin: 'zheng ju qiang du', meaning: 'kekuatan bukti' },
      { hanzi: '逻辑漏洞', pinyin: 'luo ji lou dong', meaning: 'celah logika' },
      { hanzi: '隐含假设', pinyin: 'yin han jia she', meaning: 'asumsi implisit' },
    ],
    [
      { hanzi: '战略建议', pinyin: 'zhan lue jian yi', meaning: 'rekomendasi strategis' },
      { hanzi: '执行摘要', pinyin: 'zhi xing zhai yao', meaning: 'executive summary' },
      { hanzi: '优先级', pinyin: 'you xian ji', meaning: 'prioritas' },
      { hanzi: '关键风险', pinyin: 'guan jian feng xian', meaning: 'risiko kunci' },
    ],
    [
      { hanzi: '修辞策略', pinyin: 'xiu ci ce lue', meaning: 'strategi retorika' },
      { hanzi: '语气控制', pinyin: 'yu qi kong zhi', meaning: 'kontrol nada bicara' },
      { hanzi: '节奏安排', pinyin: 'jie zou an pai', meaning: 'pengaturan ritme' },
      { hanzi: '强调焦点', pinyin: 'qiang diao jiao dian', meaning: 'fokus penekanan' },
    ],
    [
      { hanzi: '综合能力', pinyin: 'zong he neng li', meaning: 'kemampuan terpadu' },
      { hanzi: '成果展示', pinyin: 'cheng guo zhan shi', meaning: 'presentasi hasil' },
      { hanzi: '反思日志', pinyin: 'fan si ri zhi', meaning: 'jurnal refleksi' },
      { hanzi: '持续改进', pinyin: 'chi xu gai jin', meaning: 'perbaikan berkelanjutan' },
    ],
  ];
  const proficiencyThemeVocab = proficiencyThemeVocabulary[safeLesson - 1] ?? proficiencyThemeVocabulary[0];
  const proficiencyThemeExamples: MandarinLesson['examples'] = [
    {
      hanzi: `围绕“${proficiencyTheme.title}”这一议题，学习者需要先识别核心矛盾，再判断不同方案背后的价值取舍。`,
      pinyin: `Wei rao "${proficiencyTheme.title}" zhe yi yi ti, xue xi zhe xu yao xian shi bie he xin mao dun, zai pan duan bu tong fang an bei hou de jia zhi qu she.`,
      meaning: `Untuk isu "${proficiencyTheme.title}", pelajar perlu mengidentifikasi kontradiksi inti, lalu menilai trade-off nilai di balik berbagai solusi.`,
    },
    {
      hanzi: `如果只从单一角度理解“${proficiencyTheme.title}”，就容易忽略其制度、文化和长期影响。`,
      pinyin: `Ru guo zhi cong dan yi jiao du li jie "${proficiencyTheme.title}", jiu rong yi hu lue qi zhi du, wen hua he chang qi ying xiang.`,
      meaning: `Jika "${proficiencyTheme.title}" hanya dipahami dari satu sudut, aspek institusional, budaya, dan dampak jangka panjangnya mudah terabaikan.`,
    },
  ];
  const proficiencyPack = {
    goal: proficiencyTheme.goal,
    vocabulary: [...proficiencyThemeVocab, ...proficiencyCoreVocabulary],
    examples: [
      ...proficiencyThemeExamples,
      { hanzi: '不可否认，技术进步为社会带来了前所未有的便利，但其潜在影响同样不容忽视。', pinyin: 'Bu ke fou ren, ji shu jin bu wei she hui dai lai le qian suo wei you de bian li, dan qi qian zai ying xiang tong yang bu rong hu shi.', meaning: 'Tidak dapat disangkal, kemajuan teknologi membawa kemudahan yang belum pernah ada, tetapi dampak potensialnya juga tidak boleh diabaikan.' },
      { hanzi: '从长远来看，真正的挑战并不在于资源不足，而在于制度安排是否能够回应结构性问题。', pinyin: 'Cong chang yuan lai kan, zhen zheng de tiao zhan bing bu zai yu zi yuan bu zu, er zai yu zhi du an pai shi fou neng gou hui ying jie gou xing wen ti.', meaning: 'Dalam jangka panjang, tantangan sebenarnya bukan kekurangan sumber daya, melainkan apakah pengaturan institusional mampu merespons masalah struktural.' },
      { hanzi: '归根结底，公共政策需要在效率、公平和社会韧性之间权衡利弊。', pinyin: 'Gui gen jie di, gong gong zheng ce xu yao zai xiao lu, gong ping he she hui ren xing zhi jian quan heng li bi.', meaning: 'Pada akhirnya, kebijakan publik perlu menimbang untung-rugi antara efisiensi, keadilan, dan resiliensi sosial.' },
    ],
    quiz: [
      { question: '归根结底 dipakai untuk...', options: ['menyimpulkan akar persoalan', 'menanyakan harga', 'menyebut tanggal'], answer: 'menyimpulkan akar persoalan' },
      { question: '权衡利弊 berarti...', options: ['menimbang untung rugi', 'membeli tiket', 'mengulang nada'], answer: 'menimbang untung rugi' },
      { question: '结构性问题 berarti...', options: ['masalah struktural', 'masalah ejaan saja', 'kata sapaan'], answer: 'masalah struktural' },
    ],
  };

  const postHskConfig = isHsk7
    ? {
        code: 'HSK 7',
        goal: 'Kembangkan respons akademik tingkat expert: definisi konsep, sintesis dua teks, kritik argumen, dan presentasi seminar.',
        vocabulary: [
          { hanzi: '学术语境', pinyin: 'xue shu yu jing', meaning: 'konteks akademik' },
          { hanzi: '跨文本综合', pinyin: 'kua wen ben zong he', meaning: 'sintesis lintas teks' },
          { hanzi: '理论视角', pinyin: 'li lun shi jiao', meaning: 'perspektif teori' },
          { hanzi: '论证有效性', pinyin: 'lun zheng you xiao xing', meaning: 'validitas argumen' },
          { hanzi: '概念界定', pinyin: 'gai nian jie ding', meaning: 'definisi konsep' },
          { hanzi: '反例', pinyin: 'fan li', meaning: 'counterexample' },
        ],
        modelTitle: 'Model seminar HSK 7',
        taskScale: 'esai 500-650 Hanzi atau presentasi seminar 4 menit',
      }
    : isHsk8
    ? {
        code: 'HSK 8',
        goal: 'Bangun analisis scholar: metodologi, bukti empiris, implikasi kebijakan, dan kritik sumber.',
        vocabulary: [
          { hanzi: '研究范式', pinyin: 'yan jiu fan shi', meaning: 'paradigma riset' },
          { hanzi: '政策含义', pinyin: 'zheng ce han yi', meaning: 'implikasi kebijakan' },
          { hanzi: '方法论', pinyin: 'fang fa lun', meaning: 'metodologi' },
          { hanzi: '实证依据', pinyin: 'shi zheng yi ju', meaning: 'bukti empiris' },
          { hanzi: '规范性判断', pinyin: 'gui fan xing pan duan', meaning: 'penilaian normatif' },
          { hanzi: '知识生产', pinyin: 'zhi shi sheng chan', meaning: 'produksi pengetahuan' },
        ],
        modelTitle: 'Model policy paper HSK 8',
        taskScale: 'policy paper 650-800 Hanzi atau briefing profesional 5 menit',
      }
    : {
        code: 'HSK 9',
        goal: 'Capai mastery akademik: argumen orisinal, rekonstruksi konsep, analisis wacana, dan sintesis multidisipliner.',
        vocabulary: [
          { hanzi: '原创性论点', pinyin: 'yuan chuang xing lun dian', meaning: 'argumen orisinal' },
          { hanzi: '跨学科综合', pinyin: 'kua xue ke zong he', meaning: 'sintesis multidisipliner' },
          { hanzi: '修辞控制', pinyin: 'xiu ci kong zhi', meaning: 'kontrol retorika' },
          { hanzi: '概念重构', pinyin: 'gai nian chong gou', meaning: 'rekonstruksi konsep' },
          { hanzi: '话语分析', pinyin: 'hua yu fen xi', meaning: 'analisis wacana' },
          { hanzi: '范式转换', pinyin: 'fan shi zhuan huan', meaning: 'pergeseran paradigma' },
        ],
        modelTitle: 'Model academic mastery HSK 9',
        taskScale: 'esai akademik 800-1000 Hanzi atau colloquium talk 6 menit',
      };
  const postHskPack = {
    goal: `${postHskConfig.goal} Topik lesson: ${topic}.`,
    vocabulary: [...postHskConfig.vocabulary, ...proficiencyPack.vocabulary],
    examples: [
      {
        hanzi: `在${postHskConfig.code}阶段，学习者需要围绕“${topic}”提出更具原创性的论点，并说明其理论意义。`,
        pinyin: `Zai ${postHskConfig.code} jie duan, xue xi zhe xu yao wei rao "${topic}" ti chu geng ju yuan chuang xing de lun dian, bing shuo ming qi li lun yi yi.`,
        meaning: `Pada tahap ${postHskConfig.code}, pelajar perlu mengajukan argumen yang lebih orisinal tentang "${topic}" dan menjelaskan makna teoretisnya.`,
      },
      {
        hanzi: '成熟的表达不只追求复杂，而是能够在复杂之中保持清晰、准确和有说服力。',
        pinyin: 'Cheng shu de biao da bu zhi zhui qiu fu za, er shi neng gou zai fu za zhi zhong bao chi qing xi, zhun que he you shuo fu li.',
        meaning: 'Ekspresi matang tidak hanya mengejar kompleksitas, tetapi menjaga kejernihan, akurasi, dan daya persuasi di dalam kompleksitas.',
      },
      ...proficiencyPack.examples,
    ],
    quiz: [
      { question: `${postHskConfig.code} output harus menonjolkan...`, options: ['argumen matang dan register akademik', 'sapaan dasar', 'hafalan angka'], answer: 'argumen matang dan register akademik' },
      { question: '原创性论点 berarti...', options: ['argumen orisinal', 'kalimat sapaan', 'jadwal harian'], answer: 'argumen orisinal' },
      ...proficiencyPack.quiz,
    ],
  };

  const beginnerPatterns: Record<MandarinSkillId, MandarinLesson['patterns']> = {
    grammar: [
      { label: 'SVO dasar', hanzi: '我学中文。', pinyin: 'Wo xue Zhongwen.', meaning: 'Saya belajar Mandarin.' },
      { label: 'Pertanyaan 吗', hanzi: '你好吗？', pinyin: 'Ni hao ma?', meaning: 'Apa kabar? / Apakah kamu baik?' },
      { label: 'Negasi 不', hanzi: '我不是老师。', pinyin: 'Wo bu shi lao shi.', meaning: 'Saya bukan guru.' },
    ],
    speaking: [
      { label: 'Salam', hanzi: '你好！', pinyin: 'Ni hao!', meaning: 'Halo!' },
      { label: 'Nama', hanzi: '我叫卡丽娜。', pinyin: 'Wo jiao Kalina.', meaning: 'Nama saya Karina.' },
      { label: 'Asal', hanzi: '我是印尼人。', pinyin: 'Wo shi Yinni ren.', meaning: 'Saya orang Indonesia.' },
    ],
    listening: [
      { label: 'Dengarkan sapaan', hanzi: '你好，再见。', pinyin: 'Ni hao, zai jian.', meaning: 'Halo, sampai jumpa.' },
      { label: 'Dengarkan angka', hanzi: '一，二，三，四，五。', pinyin: 'Yi, er, san, si, wu.', meaning: 'Satu sampai lima.' },
      { label: 'Dengarkan tanya', hanzi: '你是学生吗？', pinyin: 'Ni shi xue sheng ma?', meaning: 'Apakah kamu siswa?' },
    ],
    reading: [
      { label: 'Hanzi + pinyin', hanzi: '我 / 你 / 他', pinyin: 'wo / ni / ta', meaning: 'saya / kamu / dia laki-laki' },
      { label: 'Sapaan tertulis', hanzi: '你好', pinyin: 'ni hao', meaning: 'halo' },
      { label: 'Kalimat pendek', hanzi: '他是老师。', pinyin: 'Ta shi lao shi.', meaning: 'Dia guru.' },
    ],
    writing: [
      { label: 'Stroke dasar', hanzi: '一 二 三', pinyin: 'yi er san', meaning: 'satu, dua, tiga' },
      { label: 'Tulis identitas', hanzi: '我是学生。', pinyin: 'Wo shi xue sheng.', meaning: 'Saya siswa.' },
      { label: 'Tulis suka', hanzi: '我喜欢茶。', pinyin: 'Wo xi huan cha.', meaning: 'Saya suka teh.' },
    ],
    vocabulary: [
      { label: 'Kata orang', hanzi: '我 你 他', pinyin: 'wo ni ta', meaning: 'saya, kamu, dia' },
      { label: 'Kata sopan', hanzi: '谢谢 / 不客气', pinyin: 'xie xie / bu ke qi', meaning: 'terima kasih / sama-sama' },
      { label: 'Kata belajar', hanzi: '中文 / 学生 / 老师', pinyin: 'Zhongwen / xue sheng / lao shi', meaning: 'Mandarin / siswa / guru' },
    ],
    pronunciation: [
      { label: 'Empat nada', hanzi: '妈 麻 马 骂', pinyin: 'ma1 ma2 ma3 ma4', meaning: 'Latihan empat nada ma.' },
      { label: 'Neutral tone', hanzi: '谢谢', pinyin: 'xie xie', meaning: 'Suku kata kedua ringan/netral.' },
      { label: 'Tone sandhi', hanzi: '你好', pinyin: 'ni hao', meaning: 'Dua nada ketiga, yang pertama terdengar naik.' },
    ],
  };

  const elementaryPatterns: Record<MandarinSkillId, MandarinLesson['patterns']> = {
    grammar: [
      { label: 'Completion with 了', hanzi: '主语 + 动词 + 了 + 宾语', pinyin: 'zhu yu + dong ci + le + bin yu', meaning: 'Menandai aksi yang sudah terjadi: Saya sudah melakukan sesuatu.' },
      { label: 'Reason-result', hanzi: '因为...，所以...', pinyin: 'yin wei..., suo yi...', meaning: 'Karena..., maka/jadi...' },
      { label: 'Comparison', hanzi: 'A + 比 + B + 形容词', pinyin: 'A + bi + B + xing rong ci', meaning: 'A lebih ... daripada B.' },
      { label: 'Degree complement', hanzi: '动词 + 得 + 很好 / 很快 / 很慢', pinyin: 'dong ci + de + hen hao / hen kuai / hen man', meaning: 'Menjelaskan bagaimana sebuah aksi dilakukan.' },
    ],
    speaking: [
      { label: 'Making appointment', hanzi: '你明天下午有空吗？', pinyin: 'Ni ming tian xia wu you kong ma?', meaning: 'Apakah kamu punya waktu besok sore?' },
      { label: 'Giving reason', hanzi: '因为我很忙，所以我不能去。', pinyin: 'Yin wei wo hen mang, suo yi wo bu neng qu.', meaning: 'Karena saya sibuk, jadi saya tidak bisa pergi.' },
      { label: 'Polite request', hanzi: '请再说一遍。', pinyin: 'Qing zai shuo yi bian.', meaning: 'Tolong katakan sekali lagi.' },
      { label: 'Suggestion with 吧', hanzi: '我们一起去吧。', pinyin: 'Wo men yi qi qu ba.', meaning: 'Ayo kita pergi bersama.' },
    ],
    listening: [
      { label: 'Listen for time', hanzi: '明天下午三点见。', pinyin: 'Ming tian xia wu san dian jian.', meaning: 'Dengarkan kata waktu: besok sore jam tiga.' },
      { label: 'Listen for reason', hanzi: '因为下雨，所以我不出去。', pinyin: 'Yin wei xia yu, suo yi wo bu chu qu.', meaning: 'Dengarkan hubungan sebab-akibat.' },
      { label: 'Listen for completed action', hanzi: '他已经回家了。', pinyin: 'Ta yi jing hui jia le.', meaning: 'Dengarkan tanda aksi selesai.' },
      { label: 'Listen for location', hanzi: '商店在学校左边。', pinyin: 'Shang dian zai xue xiao zuo bian.', meaning: 'Dengarkan lokasi dan arah.' },
    ],
    reading: [
      { label: 'Find main detail', hanzi: '根据短文，他明天去学校。', pinyin: 'Gen ju duan wen, ta ming tian qu xue xiao.', meaning: 'Berdasarkan teks pendek, cari waktu dan tempat.' },
      { label: 'Read cause-effect', hanzi: '因为天气很热，所以他不想出去。', pinyin: 'Yin wei tian qi hen re, suo yi ta bu xiang chu qu.', meaning: 'Baca alasan dan hasil.' },
      { label: 'Read experience', hanzi: '我去过北京。', pinyin: 'Wo qu guo Beijing.', meaning: 'Saya pernah pergi ke Beijing.' },
      { label: 'Read comparison', hanzi: '这个手机比那个手机新。', pinyin: 'Zhe ge shou ji bi na ge shou ji xin.', meaning: 'Ponsel ini lebih baru daripada ponsel itu.' },
    ],
    writing: [
      { label: 'Daily paragraph', hanzi: '我每天早上七点起床，然后去学校。', pinyin: 'Wo mei tian zao shang qi dian qi chuang, ran hou qu xue xiao.', meaning: 'Saya bangun jam tujuh setiap pagi, lalu pergi ke sekolah.' },
      { label: 'Reason sentence', hanzi: '因为我想学中文，所以我每天练习。', pinyin: 'Yin wei wo xiang xue Zhongwen, suo yi wo mei tian lian xi.', meaning: 'Karena saya ingin belajar Mandarin, jadi saya berlatih setiap hari.' },
      { label: 'Experience sentence', hanzi: '我吃过中国菜。', pinyin: 'Wo chi guo Zhongguo cai.', meaning: 'Saya pernah makan masakan China.' },
      { label: 'Short message', hanzi: '我会晚一点到，请等我。', pinyin: 'Wo hui wan yi dian dao, qing deng wo.', meaning: 'Saya akan tiba agak terlambat, tolong tunggu saya.' },
    ],
    vocabulary: [
      { label: 'Time collocation', hanzi: '早上起床 / 下午见面 / 晚上复习', pinyin: 'zao shang qi chuang / xia wu jian mian / wan shang fu xi', meaning: 'bangun pagi / bertemu sore / review malam' },
      { label: 'Daily verb-object', hanzi: '吃早饭 / 看电影 / 坐车 / 买东西', pinyin: 'chi zao fan / kan dian ying / zuo che / mai dong xi', meaning: 'sarapan / menonton film / naik kendaraan / belanja' },
      { label: 'Reason words', hanzi: '因为 / 所以 / 但是 / 也 / 都', pinyin: 'yin wei / suo yi / dan shi / ye / dou', meaning: 'karena / jadi / tetapi / juga / semua' },
      { label: 'Direction words', hanzi: '左边 / 右边 / 前面 / 后面', pinyin: 'zuo bian / you bian / qian mian / hou mian', meaning: 'kiri / kanan / depan / belakang' },
    ],
    pronunciation: [
      { label: 'Tone flow in HSK 2', hanzi: '因为我很忙，所以我不能去。', pinyin: 'Yin wei wo hen mang, suo yi wo bu neng qu.', meaning: 'Latih aliran nada dalam kalimat sebab-akibat.' },
      { label: 'Third tone sandhi', hanzi: '我很好。', pinyin: 'Wo hen hao.', meaning: 'Beberapa nada ketiga berurutan perlu dibaca natural.' },
      { label: 'Neutral tone words', hanzi: '妈妈 / 朋友 / 什么', pinyin: 'ma ma / peng you / shen me', meaning: 'Suku kata kedua ringan pada kata umum.' },
      { label: 'Chunking sentence', hanzi: '我吃早饭以后 / 去学校。', pinyin: 'Wo chi zao fan yi hou / qu xue xiao.', meaning: 'Pisahkan kalimat berdasarkan unit makna.' },
    ],
  };

  const intermediatePatterns: Record<MandarinSkillId, MandarinLesson['patterns']> = {
    grammar: [
      { label: '把 sentence', hanzi: '主语 + 把 + 宾语 + 动词 + 结果', pinyin: 'zhu yu + ba + bin yu + dong ci + jie guo', meaning: 'Menekankan objek yang dipindah/diubah oleh aksi.' },
      { label: '被 passive', hanzi: '主语 + 被 + 人 + 动词 + 了', pinyin: 'zhu yu + bei + ren + dong ci + le', meaning: 'Subjek mengalami aksi dari orang lain.' },
      { label: '一边...一边...', hanzi: '一边听音乐，一边做作业。', pinyin: 'Yi bian ting yin yue, yi bian zuo zuo ye.', meaning: 'Melakukan dua aktivitas bersamaan.' },
      { label: '除了...以外，还...', hanzi: '除了中文以外，我还学英语。', pinyin: 'Chu le Zhongwen yi wai, wo hai xue Yingyu.', meaning: 'Selain..., juga...' },
    ],
    speaking: [
      { label: 'Giving opinion', hanzi: '我觉得...，因为...', pinyin: 'Wo jue de..., yin wei...', meaning: 'Saya berpendapat..., karena...' },
      { label: 'Planning', hanzi: '我打算周末去旅行。', pinyin: 'Wo da suan zhou mo qu lv xing.', meaning: 'Saya berencana bepergian akhir pekan.' },
      { label: 'Suggestion', hanzi: '你应该试试这个办法。', pinyin: 'Ni ying gai shi shi zhe ge ban fa.', meaning: 'Kamu seharusnya mencoba cara ini.' },
      { label: 'Summary', hanzi: '重点是每天练习。', pinyin: 'Zhong dian shi mei tian lian xi.', meaning: 'Poin pentingnya adalah latihan setiap hari.' },
    ],
    listening: [
      { label: 'Listen for result complement', hanzi: '你听懂了吗？', pinyin: 'Ni ting dong le ma?', meaning: 'Dengarkan hasil dari aksi: sudah paham atau belum.' },
      { label: 'Listen for passive', hanzi: '钱包被人拿走了。', pinyin: 'Qian bao bei ren na zou le.', meaning: 'Dengarkan siapa/apa yang mengalami aksi.' },
      { label: 'Listen for sequence', hanzi: '先...然后...最后...', pinyin: 'xian... ran hou... zui hou...', meaning: 'Dengarkan urutan kejadian.' },
      { label: 'Listen for comparison', hanzi: '现在比以前清楚。', pinyin: 'Xian zai bi yi qian qing chu.', meaning: 'Dengarkan perubahan dibanding sebelumnya.' },
    ],
    reading: [
      { label: 'Main content', hanzi: '这段话的主要内容是...', pinyin: 'Zhe duan hua de zhu yao nei rong shi...', meaning: 'Isi utama paragraf ini adalah...' },
      { label: 'Sequence markers', hanzi: '先...然后...最后...', pinyin: 'xian... ran hou... zui hou...', meaning: 'Tanda urutan dalam teks.' },
      { label: 'Cause and suggestion', hanzi: '因为...，所以应该...', pinyin: 'yin wei..., suo yi ying gai...', meaning: 'Alasan dan saran dalam satu paragraf.' },
      { label: 'Experience and change', hanzi: '以前...，现在越来越...', pinyin: 'yi qian..., xian zai yue lai yue...', meaning: 'Dulu..., sekarang semakin...' },
    ],
    writing: [
      { label: 'Opinion paragraph', hanzi: '我觉得...。第一，...。第二，...。所以...', pinyin: 'Wo jue de... Di yi... Di er... Suo yi...', meaning: 'Struktur paragraf opini sederhana.' },
      { label: 'Experience paragraph', hanzi: '以前我...，后来...，现在...', pinyin: 'Yi qian wo..., hou lai..., xian zai...', meaning: 'Urutan pengalaman: dulu, kemudian, sekarang.' },
      { label: 'Plan paragraph', hanzi: '我打算...，因为...。如果...，我就...', pinyin: 'Wo da suan..., yin wei... Ru guo..., wo jiu...', meaning: 'Rencana dengan alasan dan kondisi.' },
      { label: 'Message format', hanzi: '不好意思，我会晚一点到。请等我。', pinyin: 'Bu hao yi si, wo hui wan yi dian dao. Qing deng wo.', meaning: 'Pesan pendek dengan alasan/respons.' },
    ],
    vocabulary: [
      { label: 'Opinion set', hanzi: '觉得 / 认为 / 方法 / 进步 / 目标', pinyin: 'jue de / ren wei / fang fa / jin bu / mu biao', meaning: 'kata untuk opini dan target belajar' },
      { label: 'Result complements', hanzi: '听懂 / 做完 / 找到 / 写好 / 看见', pinyin: 'ting dong / zuo wan / zhao dao / xie hao / kan jian', meaning: 'hasil dari aksi' },
      { label: 'Sequence words', hanzi: '先 / 然后 / 最后 / 以前 / 以后', pinyin: 'xian / ran hou / zui hou / yi qian / yi hou', meaning: 'urutan waktu' },
      { label: 'Problem-solution', hanzi: '问题 / 麻烦 / 办法 / 建议 / 解决', pinyin: 'wen ti / ma fan / ban fa / jian yi / jie jue', meaning: 'masalah dan solusi' },
    ],
    pronunciation: [
      { label: 'Long sentence chunking', hanzi: '因为我很忙 / 所以我不能去。', pinyin: 'Yin wei wo hen mang / suo yi wo bu neng qu.', meaning: 'Pisahkan klausa sebab dan akibat.' },
      { label: 'Result complement rhythm', hanzi: '你听懂了吗？', pinyin: 'Ni ting dong le ma?', meaning: 'Tekankan hasil: 懂.' },
      { label: '把 sentence rhythm', hanzi: '请把书放在桌子上。', pinyin: 'Qing ba shu fang zai zhuo zi shang.', meaning: 'Chunk: 把 + objek + aksi + lokasi.' },
      { label: 'Natural speed', hanzi: '除了中文以外，我还学英语。', pinyin: 'Chu le Zhongwen yi wai, wo hai xue Yingyu.', meaning: 'Latih jeda natural setelah 以外.' },
    ],
  };

  const intermediateOutputGuide: Record<MandarinSkillId, string> = {
    grammar: 'Analisis minimal 4 kalimat: tandai pola HSK 3 yang dipakai, lalu buat 4 kalimat baru dengan pola yang sama.',
    speaking: 'Buat roleplay 8-10 baris dengan pembuka, alasan, respons, dan tindak lanjut. Rekam dengan tone stabil.',
    listening: 'Dengarkan contoh TTS 3 kali, tulis ringkasan 5 poin: siapa, topik, masalah, alasan, hasil.',
    reading: 'Baca contoh, tandai konektor/pola, lalu tulis ringkasan 80-120 kata Indonesia plus 5 kosakata Mandarin kunci.',
    writing: 'Tulis paragraf 100-160 Hanzi dengan pembuka, dua detail, alasan/hasil, dan penutup singkat.',
    vocabulary: 'Buat word map 12 kosakata: Hanzi, pinyin, arti, kolokasi, dan 1 contoh kalimat sendiri.',
    pronunciation: 'Rekam shadowing 1-2 menit. Fokus pada chunking klausa, tone sandhi, result complement, dan jeda natural.',
  };

  const upperIntermediatePatterns: Record<MandarinSkillId, MandarinLesson['patterns']> = {
    grammar: [
      { label: '不但...而且...', hanzi: '学习中文不但能提高语言能力，而且能增加交流机会。', pinyin: 'Xue xi Zhongwen bu dan neng ti gao yu yan neng li, er qie neng zeng jia jiao liu ji hui.', meaning: 'Tidak hanya meningkatkan kemampuan bahasa, tetapi juga menambah kesempatan komunikasi.' },
      { label: '既...又...', hanzi: '这个方法既实用又有效。', pinyin: 'Zhe ge fang fa ji shi yong you you xiao.', meaning: 'Metode ini praktis sekaligus efektif.' },
      { label: '连...都...', hanzi: '他太紧张了，连简单的问题都答错了。', pinyin: 'Ta tai jin zhang le, lian jian dan de wen ti dou da cuo le.', meaning: 'Dia terlalu gugup, bahkan pertanyaan mudah pun salah dijawab.' },
      { label: '与其...不如...', hanzi: '与其担心考试，不如每天认真复习。', pinyin: 'Yu qi dan xin kao shi, bu ru mei tian ren zhen fu xi.', meaning: 'Daripada khawatir ujian, lebih baik review serius setiap hari.' },
    ],
    speaking: [
      { label: 'Structured opinion', hanzi: '我认为...，主要原因有两个。', pinyin: 'Wo ren wei..., zhu yao yuan yin you liang ge.', meaning: 'Menurut saya..., ada dua alasan utama.' },
      { label: 'Partial agreement', hanzi: '我同意你的看法，不过我还想补充一点。', pinyin: 'Wo tong yi ni de kan fa, bu guo wo hai xiang bu chong yi dian.', meaning: 'Saya setuju dengan pandanganmu, tetapi ingin menambahkan satu hal.' },
      { label: 'Give evidence', hanzi: '根据这个数据，我们可以看出...', pinyin: 'Gen ju zhe ge shu ju, wo men ke yi kan chu...', meaning: 'Berdasarkan data ini, kita bisa melihat...' },
      { label: 'Close politely', hanzi: '总之，我觉得这个办法比较可行。', pinyin: 'Zong zhi, wo jue de zhe ge ban fa bi jiao ke xing.', meaning: 'Kesimpulannya, saya merasa cara ini cukup layak.' },
    ],
    listening: [
      { label: 'Listen for stance', hanzi: '作者支持这个观点，因为...', pinyin: 'Zuo zhe zhi chi zhe ge guan dian, yin wei...', meaning: 'Dengarkan apakah pembicara mendukung atau menentang.' },
      { label: 'Listen for contrast', hanzi: '虽然...，但是...', pinyin: 'Sui ran..., dan shi...', meaning: 'Tangkap kontras antara dua klausa.' },
      { label: 'Listen for data', hanzi: '大约百分之三十的人选择这个方法。', pinyin: 'Da yue bai fen zhi san shi de ren xuan ze zhe ge fang fa.', meaning: 'Tangkap angka dan persentase.' },
      { label: 'Listen for emphasis', hanzi: '连初学者都能理解。', pinyin: 'Lian chu xue zhe dou neng li jie.', meaning: '连...都... memberi penekanan.' },
    ],
    reading: [
      { label: 'Author attitude', hanzi: '作者的态度比较明显。', pinyin: 'Zuo zhe de tai du bi jiao ming xian.', meaning: 'Identifikasi sikap penulis.' },
      { label: 'Cause-result chain', hanzi: '这个变化导致了新的问题。', pinyin: 'Zhe ge bian hua dao zhi le xin de wen ti.', meaning: 'Cari penyebab dan akibat.' },
      { label: 'Data trend', hanzi: '数据说明人数增加了。', pinyin: 'Shu ju shuo ming ren shu zeng jia le.', meaning: 'Baca data dan tren.' },
      { label: 'Argument markers', hanzi: '首先...其次...总之...', pinyin: 'Shou xian... qi ci... zong zhi...', meaning: 'Gunakan penanda untuk memahami struktur teks.' },
    ],
    writing: [
      { label: 'Opinion paragraph', hanzi: '我认为...。首先，...。其次，...。因此，...。', pinyin: 'Wo ren wei... Shou xian... Qi ci... Yin ci...', meaning: 'Struktur paragraf opini HSK 4.' },
      { label: 'Cause-effect paragraph', hanzi: '这个问题的原因是...，结果导致...。', pinyin: 'Zhe ge wen ti de yuan yin shi..., jie guo dao zhi...', meaning: 'Tulis penyebab dan akibat dengan jelas.' },
      { label: 'Compare choices', hanzi: '与其选择A，不如选择B，因为...', pinyin: 'Yu qi xuan ze A, bu ru xuan ze B, yin wei...', meaning: 'Bandingkan dua pilihan dengan alasan.' },
      { label: 'Data description', hanzi: '数据显示，...增加了，而...减少了。', pinyin: 'Shu ju xian shi, ... zeng jia le, er ... jian shao le.', meaning: 'Deskripsikan data sederhana.' },
    ],
    vocabulary: [
      { label: 'Argument set', hanzi: '认为 / 观点 / 理由 / 因此 / 总之', pinyin: 'ren wei / guan dian / li you / yin ci / zong zhi', meaning: 'kosakata untuk argumen' },
      { label: 'Society topics', hanzi: '环境 / 科技 / 文化 / 社会 / 服务', pinyin: 'huan jing / ke ji / wen hua / she hui / fu wu', meaning: 'topik sosial HSK 4' },
      { label: 'Data verbs', hanzi: '增加 / 减少 / 导致 / 说明 / 改善', pinyin: 'zeng jia / jian shao / dao zhi / shuo ming / gai shan', meaning: 'kata kerja untuk tren dan hasil' },
      { label: 'Nuance words', hanzi: '尽量 / 避免 / 及时 / 明显 / 可行', pinyin: 'jin liang / bi mian / ji shi / ming xian / ke xing', meaning: 'kata bernuansa untuk saran dan evaluasi' },
    ],
    pronunciation: [
      { label: 'Argument chunking', hanzi: '我认为 / 学习语言的关键 / 不是时间长 / 而是效率高。', pinyin: 'Wo ren wei / xue xi yu yan de guan jian / bu shi shi jian chang / er shi xiao lu gao.', meaning: 'Bagi kalimat panjang menjadi unit argumen.' },
      { label: 'Contrast stress', hanzi: '不是...而是...', pinyin: 'bu shi... er shi...', meaning: 'Tekankan kontras pada 而是.' },
      { label: 'Data rhythm', hanzi: '大约百分之三十。', pinyin: 'Da yue bai fen zhi san shi.', meaning: 'Baca angka dan persentase dengan stabil.' },
      { label: 'Emphasis with 连...都...', hanzi: '连初学者都能理解。', pinyin: 'Lian chu xue zhe dou neng li jie.', meaning: 'Tekankan unsur setelah 连.' },
    ],
  };

  const upperIntermediateSkillPractice: Record<MandarinSkillId, MandarinLesson['practice']> = {
    grammar: [
      { question: '不但...而且... dipakai untuk...', options: ['menambahkan dua argumen positif', 'menandai pasif', 'menanyakan harga'], answer: 'menambahkan dua argumen positif' },
      { question: '与其担心考试，不如每天复习 berarti...', options: ['Daripada khawatir ujian, lebih baik review setiap hari', 'Jika ujian selesai, pulang', 'Karena hujan, tidak keluar'], answer: 'Daripada khawatir ujian, lebih baik review setiap hari' },
      { question: '连...都... menunjukkan...', options: ['penekanan bahkan...', 'urutan waktu', 'arah lokasi'], answer: 'penekanan bahkan...' },
      { question: '既实用又有效 berarti...', options: ['praktis sekaligus efektif', 'tidak praktis dan mahal', 'sedang berlatih'], answer: 'praktis sekaligus efektif' },
    ],
    speaking: [
      { question: 'Untuk membuka argumen HSK 4, frasa yang kuat adalah...', options: ['我认为...主要原因有两个', '你叫什么名字', '多少钱'], answer: '我认为...主要原因有两个' },
      { question: '不过我还想补充一点 dipakai untuk...', options: ['menambah pendapat dengan sopan', 'menutup telepon', 'memesan makanan'], answer: 'menambah pendapat dengan sopan' },
      { question: '根据这个数据 berarti...', options: ['berdasarkan data ini', 'di sebelah kiri', 'belum pernah'], answer: 'berdasarkan data ini' },
      { question: '总之 paling cocok di bagian...', options: ['kesimpulan', 'sapaan awal nama', 'angka 1-10'], answer: 'kesimpulan' },
    ],
    listening: [
      { question: 'Saat mendengar 作者支持这个观点, fokusnya adalah...', options: ['sikap pembicara/penulis', 'harga barang', 'urutan stroke'], answer: 'sikap pembicara/penulis' },
      { question: '虽然...但是... menandai...', options: ['kontras', 'pasif', 'kepemilikan'], answer: 'kontras' },
      { question: '百分之三十 adalah...', options: ['30 persen', '13 orang', '3 menit'], answer: '30 persen' },
      { question: '连初学者都能理解 berarti...', options: ['bahkan pemula pun bisa paham', 'hanya guru yang paham', 'tidak ada yang paham'], answer: 'bahkan pemula pun bisa paham' },
    ],
    reading: [
      { question: '态度 dalam reading berarti...', options: ['sikap penulis', 'lokasi toko', 'nada ketiga'], answer: 'sikap penulis' },
      { question: '导致 biasanya menghubungkan...', options: ['sebab ke akibat', 'nama ke umur', 'warna ke harga'], answer: 'sebab ke akibat' },
      { question: '首先, 其次, 总之 membantu pembaca melihat...', options: ['struktur argumen', 'jenis makanan', 'jumlah karakter'], answer: 'struktur argumen' },
      { question: '数据显示 berarti...', options: ['data menunjukkan', 'guru berkata', 'hari ini hujan'], answer: 'data menunjukkan' },
    ],
    writing: [
      { question: 'Paragraf opini HSK 4 sebaiknya punya...', options: ['posisi, alasan, contoh, kesimpulan', 'satu kata saja', 'hanya pinyin'], answer: 'posisi, alasan, contoh, kesimpulan' },
      { question: '因此 dipakai untuk...', options: ['menarik kesimpulan/akibat', 'membuka sapaan', 'menyebut jam'], answer: 'menarik kesimpulan/akibat' },
      { question: '而 dalam 数据增加了，而错误减少了 menunjukkan...', options: ['kontras dua tren', 'pasif', 'pertanyaan'], answer: 'kontras dua tren' },
      { question: 'Tugas writing HSK 4 idealnya memakai...', options: ['konektor dan kosakata bernuansa', 'hanya angka', 'tanpa Hanzi'], answer: 'konektor dan kosakata bernuansa' },
    ],
    vocabulary: [
      { question: '观点, 理由, 因此 termasuk kelompok...', options: ['argumen', 'keluarga', 'buah'], answer: 'argumen' },
      { question: '环境, 科技, 社会 cocok untuk topik...', options: ['isu sosial', 'sapaan dasar', 'angka dasar'], answer: 'isu sosial' },
      { question: '增加 dan 减少 adalah pasangan...', options: ['naik dan turun/berkurang', 'setuju dan menolak', 'besar dan kecil'], answer: 'naik dan turun/berkurang' },
      { question: '可行 berarti...', options: ['layak/dapat dilakukan', 'lupa', 'terlalu murah'], answer: 'layak/dapat dilakukan' },
    ],
    pronunciation: [
      { question: 'Kalimat argumen panjang perlu...', options: ['chunking dan jeda logis', 'dibaca tanpa berhenti', 'diucapkan satu tone'], answer: 'chunking dan jeda logis' },
      { question: '不是...而是... perlu penekanan pada...', options: ['kontras', 'lokasi', 'angka kecil'], answer: 'kontras' },
      { question: 'Persentase seperti 百分之三十 harus dibaca...', options: ['stabil dan jelas', 'dengan tone dihapus', 'tanpa angka'], answer: 'stabil dan jelas' },
      { question: 'Shadowing HSK 4 menargetkan...', options: ['ritme argumen, tone stabil, dan intonasi natural', 'membaca secepat mungkin', 'menghafal arti Indonesia saja'], answer: 'ritme argumen, tone stabil, dan intonasi natural' },
    ],
  };

  const upperIntermediateOutputGuide: Record<MandarinSkillId, string> = {
    grammar: 'Buat 8 kalimat HSK 4: gunakan minimal 4 pola, jelaskan fungsi tiap pola, lalu ubah konteksnya.',
    speaking: 'Buat presentasi/roleplay 10-12 baris dengan posisi, alasan, contoh, respons, dan kesimpulan. Rekam 2 menit.',
    listening: 'Dengarkan contoh TTS 3 kali, lalu tulis ringkasan sikap, alasan, data/angka, dan kesimpulan pembicara.',
    reading: 'Baca contoh, tandai attitude, cause-effect, data, dan konektor. Tulis ringkasan 120-180 kata Indonesia.',
    writing: 'Tulis paragraf 160-220 Hanzi dengan pembuka, dua argumen, satu contoh/data, kontras, dan kesimpulan.',
    vocabulary: 'Buat word bank 18 kata: Hanzi, pinyin, arti, kolokasi, sinonim/antonim bila ada, dan 1 kalimat HSK 4.',
    pronunciation: 'Rekam shadowing 2 menit. Fokus pada chunking kalimat panjang, kontras, persentase, dan penekanan 连...都.',
  };

  const beginnerExamples: Record<MandarinSkillId, MandarinLesson['examples']> = {
    grammar: [
      { hanzi: '我是学生。', pinyin: 'Wo shi xue sheng.', meaning: 'Saya siswa.' },
      { hanzi: '你是老师吗？', pinyin: 'Ni shi lao shi ma?', meaning: 'Apakah kamu guru?' },
      { hanzi: '我不喝咖啡。', pinyin: 'Wo bu he ka fei.', meaning: 'Saya tidak minum kopi.' },
    ],
    speaking: [
      { hanzi: '你好，我叫卡丽娜。', pinyin: 'Ni hao, wo jiao Kalina.', meaning: 'Halo, nama saya Karina.' },
      { hanzi: '我是印尼人，我学中文。', pinyin: 'Wo shi Yinni ren, wo xue Zhongwen.', meaning: 'Saya orang Indonesia, saya belajar Mandarin.' },
      { hanzi: '谢谢，再见！', pinyin: 'Xie xie, zai jian!', meaning: 'Terima kasih, sampai jumpa!' },
    ],
    listening: [
      { hanzi: '请听：你好吗？', pinyin: 'Qing ting: ni hao ma?', meaning: 'Dengarkan: Apa kabar?' },
      { hanzi: '他说：我是学生。', pinyin: 'Ta shuo: wo shi xue sheng.', meaning: 'Dia berkata: Saya siswa.' },
      { hanzi: '一，二，三，四，五。', pinyin: 'Yi, er, san, si, wu.', meaning: 'Satu, dua, tiga, empat, lima.' },
    ],
    reading: [
      { hanzi: '你好！我叫王明。', pinyin: 'Ni hao! Wo jiao Wang Ming.', meaning: 'Halo! Nama saya Wang Ming.' },
      { hanzi: '我是学生。', pinyin: 'Wo shi xue sheng.', meaning: 'Saya siswa.' },
      { hanzi: '我喜欢茶。', pinyin: 'Wo xi huan cha.', meaning: 'Saya suka teh.' },
    ],
    writing: [
      { hanzi: '我叫安娜。', pinyin: 'Wo jiao Anna.', meaning: 'Nama saya Anna.' },
      { hanzi: '我是印尼人。', pinyin: 'Wo shi Yinni ren.', meaning: 'Saya orang Indonesia.' },
      { hanzi: '我学中文。', pinyin: 'Wo xue Zhongwen.', meaning: 'Saya belajar Mandarin.' },
    ],
    vocabulary: [
      { hanzi: '学生', pinyin: 'xue sheng', meaning: 'siswa' },
      { hanzi: '老师', pinyin: 'lao shi', meaning: 'guru' },
      { hanzi: '朋友', pinyin: 'peng you', meaning: 'teman' },
    ],
    pronunciation: [
      { hanzi: '妈 麻 马 骂', pinyin: 'ma1 ma2 ma3 ma4', meaning: 'Empat nada dengan syllable ma.' },
      { hanzi: '你好', pinyin: 'ni hao', meaning: 'Latihan third tone sandhi.' },
      { hanzi: '谢谢你', pinyin: 'xie xie ni', meaning: 'Latihan neutral tone dan tone 3.' },
    ],
  };

  const beginnerVocabulary: MandarinLesson['vocabulary'] = [
    { hanzi: '你好', pinyin: 'ni hao', meaning: 'halo' },
    { hanzi: '再见', pinyin: 'zai jian', meaning: 'sampai jumpa' },
    { hanzi: '谢谢', pinyin: 'xie xie', meaning: 'terima kasih' },
    { hanzi: '不客气', pinyin: 'bu ke qi', meaning: 'sama-sama' },
    { hanzi: '我', pinyin: 'wo', meaning: 'saya' },
    { hanzi: '你', pinyin: 'ni', meaning: 'kamu' },
    { hanzi: '他', pinyin: 'ta', meaning: 'dia laki-laki' },
    { hanzi: '她', pinyin: 'ta', meaning: 'dia perempuan' },
    { hanzi: '是', pinyin: 'shi', meaning: 'adalah' },
    { hanzi: '不', pinyin: 'bu', meaning: 'tidak' },
    { hanzi: '吗', pinyin: 'ma', meaning: 'partikel tanya' },
    { hanzi: '叫', pinyin: 'jiao', meaning: 'dipanggil/bernama' },
    { hanzi: '学生', pinyin: 'xue sheng', meaning: 'siswa' },
    { hanzi: '老师', pinyin: 'lao shi', meaning: 'guru' },
    { hanzi: '中文', pinyin: 'Zhongwen', meaning: 'bahasa Mandarin' },
    { hanzi: '中国', pinyin: 'Zhongguo', meaning: 'China' },
    { hanzi: '印尼', pinyin: 'Yinni', meaning: 'Indonesia' },
    { hanzi: '一', pinyin: 'yi', meaning: 'satu' },
    { hanzi: '二', pinyin: 'er', meaning: 'dua' },
    { hanzi: '三', pinyin: 'san', meaning: 'tiga' },
  ];

  const practiceBase: MandarinLesson['practice'] = [
    { question: 'Mandarin standar memakai sistem romanisasi...', options: ['Pinyin', 'Kana', 'Hangul'], answer: 'Pinyin' },
    { question: 'Jumlah nada utama dalam Mandarin adalah...', options: ['4 nada utama plus neutral tone', '2 nada saja', '7 nada utama'], answer: '4 nada utama plus neutral tone' },
    { question: 'Pola umum kalimat Mandarin dasar adalah...', options: ['Subject + Verb + Object', 'Object + Verb + Subject', 'Verb + Subject + Object'], answer: 'Subject + Verb + Object' },
    { question: 'Partikel 吗 biasanya dipakai untuk...', options: ['membuat pertanyaan yes/no', 'menandai lampau saja', 'menghitung benda'], answer: 'membuat pertanyaan yes/no' },
    { question: `Lesson ini membahas topik "${topic}" pada level...`, options: [meta.code, 'TOEFL', 'CEFR C2 English'], answer: meta.code },
    { question: 'Saat belajar Hanzi, yang perlu dilatih adalah...', options: ['bentuk, makna, pinyin, dan contoh kalimat', 'warna kartu saja', 'menghapus nada'], answer: 'bentuk, makna, pinyin, dan contoh kalimat' },
    { question: 'TTS Mandarin berguna untuk...', options: ['mendengar nada dan ritme kalimat', 'mengganti latihan berbicara total', 'menghapus pinyin'], answer: 'mendengar nada dan ritme kalimat' },
    { question: 'Latihan shadowing berarti...', options: ['mendengar lalu menirukan ujaran', 'membaca tanpa suara', 'menerjemahkan kata per kata saja'], answer: 'mendengar lalu menirukan ujaran' },
  ];

  const skillPractice: Record<MandarinSkillId, MandarinLesson['practice']> = {
    grammar: [
      { question: 'Dalam Mandarin, keterangan waktu biasanya diletakkan...', options: ['sebelum kata kerja', 'selalu setelah objek', 'hanya di akhir kalimat'], answer: 'sebelum kata kerja' },
      { question: '的 sering dipakai untuk...', options: ['kepemilikan atau modifier', 'pertanyaan yes/no', 'nada ketiga'], answer: 'kepemilikan atau modifier' },
    ],
    speaking: [
      { question: 'Respons sopan untuk menyatakan pendapat adalah...', options: ['我觉得...', '吗吗吗', '一个'], answer: '我觉得...' },
      { question: 'Roleplay speaking harus melatih...', options: ['respons natural dan konteks', 'hafalan tanpa lawan bicara', 'hanya menulis Hanzi'], answer: 'respons natural dan konteks' },
    ],
    listening: [
      { question: 'Saat listening, fokus pertama adalah...', options: ['kata kunci, nada, angka, waktu, dan konteks', 'menghafal semua kata sekaligus', 'melihat terjemahan dulu'], answer: 'kata kunci, nada, angka, waktu, dan konteks' },
      { question: 'Kalimat 他说... berarti...', options: ['dia berkata...', 'saya makan...', 'berapa harga...'], answer: 'dia berkata...' },
    ],
    reading: [
      { question: 'Reading Mandarin perlu menghubungkan...', options: ['Hanzi, pinyin, makna, dan konteks', 'Hanzi saja tanpa makna', 'pinyin tanpa nada'], answer: 'Hanzi, pinyin, makna, dan konteks' },
      { question: '根据文章 berarti...', options: ['berdasarkan artikel/teks', 'selamat pagi', 'terima kasih'], answer: 'berdasarkan artikel/teks' },
    ],
    writing: [
      { question: 'Writing Hanzi dimulai dari...', options: ['stroke order dan struktur karakter', 'menebak bentuk bebas', 'mengabaikan radikal'], answer: 'stroke order dan struktur karakter' },
      { question: 'Paragraf opini sederhana bisa memakai...', options: ['我认为...因为...', '你好吗', '一二三'], answer: '我认为...因为...' },
    ],
    vocabulary: [
      { question: '生词 berarti...', options: ['kosakata baru', 'kalimat pasif', 'transportasi'], answer: 'kosakata baru' },
      { question: 'Kolokasi membantu pengguna...', options: ['memakai kata secara natural', 'menghafal tanpa contoh', 'menghindari kalimat'], answer: 'memakai kata secara natural' },
    ],
    pronunciation: [
      { question: 'Nada ketiga sebelum nada ketiga biasanya...', options: ['berubah seperti nada kedua', 'hilang total', 'menjadi neutral tone selalu'], answer: 'berubah seperti nada kedua' },
      { question: 'Initial zh ch sh r perlu dilatih karena...', options: ['posisi lidah berbeda dari z c s', 'tidak punya suara', 'selalu dibaca seperti bahasa Inggris'], answer: 'posisi lidah berbeda dari z c s' },
    ],
  };

  const elementarySkillPractice: Record<MandarinSkillId, MandarinLesson['practice']> = {
    grammar: [
      { question: 'Pola 因为...所以... dipakai untuk...', options: ['sebab dan akibat', 'menanyakan nama', 'menghitung angka'], answer: 'sebab dan akibat' },
      { question: 'Dalam 我昨天看电影了, 了 menunjukkan...', options: ['aksi sudah terjadi', 'pertanyaan yes/no', 'lokasi benda'], answer: 'aksi sudah terjadi' },
      { question: 'A 比 B 高 berarti...', options: ['A lebih tinggi dari B', 'A sama tinggi dengan B', 'B tidak tinggi'], answer: 'A lebih tinggi dari B' },
      { question: '说得很好 memakai 得 untuk...', options: ['menjelaskan kualitas aksi', 'menandai kepemilikan', 'membuat negasi'], answer: 'menjelaskan kualitas aksi' },
    ],
    speaking: [
      { question: 'Kalimat untuk membuat janji adalah...', options: ['你明天下午有空吗？', '这个字怎么写？', '我不喝咖啡。'], answer: '你明天下午有空吗？' },
      { question: 'Respons sopan saat terlambat adalah...', options: ['不好意思，我会晚一点到。', '你叫什么名字？', '这是书。'], answer: '不好意思，我会晚一点到。' },
      { question: '我们一起去吧 berarti...', options: ['Ayo kita pergi bersama', 'Saya tidak punya uang', 'Cuaca dingin'], answer: 'Ayo kita pergi bersama' },
      { question: '请再说一遍 dipakai saat...', options: ['meminta orang mengulang', 'memesan nasi', 'membandingkan harga'], answer: 'meminta orang mengulang' },
    ],
    listening: [
      { question: 'Saat mendengar 明天下午三点, informasi utamanya adalah...', options: ['waktu', 'harga', 'anggota keluarga'], answer: 'waktu' },
      { question: 'Kata 因为 dalam audio menandai...', options: ['alasan', 'arah kanan', 'nomor telepon'], answer: 'alasan' },
      { question: '已经...了 biasanya berarti...', options: ['sudah', 'belum pernah', 'sedang'], answer: 'sudah' },
      { question: '左边 dan 右边 adalah kata untuk...', options: ['arah/lokasi', 'cuaca', 'hobi'], answer: 'arah/lokasi' },
    ],
    reading: [
      { question: '根据短文 berarti...', options: ['berdasarkan teks pendek', 'tolong ulangi', 'di sebelah kiri'], answer: 'berdasarkan teks pendek' },
      { question: '我去过北京 berarti...', options: ['Saya pernah pergi ke Beijing', 'Saya sedang pergi ke Beijing', 'Saya tidak tahu Beijing'], answer: 'Saya pernah pergi ke Beijing' },
      { question: '这个手机比那个手机新 berarti...', options: ['Ponsel ini lebih baru dari ponsel itu', 'Ponsel ini lebih mahal', 'Ponsel itu hilang'], answer: 'Ponsel ini lebih baru dari ponsel itu' },
      { question: 'Dalam teks HSK 2, cari dulu...', options: ['waktu, orang, tempat, alasan', 'warna tombol', 'jumlah halaman'], answer: 'waktu, orang, tempat, alasan' },
    ],
    writing: [
      { question: 'Paragraf HSK 2 yang baik biasanya memakai...', options: ['waktu, subjek, aksi, alasan sederhana', 'idiom sastra kompleks', 'hanya satu Hanzi'], answer: 'waktu, subjek, aksi, alasan sederhana' },
      { question: '我每天早上七点起床 cocok untuk topik...', options: ['rutinitas harian', 'belanja mahal', 'arah jalan'], answer: 'rutinitas harian' },
      { question: '我会晚一点到 cocok untuk...', options: ['pesan janji bertemu', 'deskripsi keluarga', 'angka 1-10'], answer: 'pesan janji bertemu' },
      { question: 'Dalam writing HSK 2, pinyin membantu...', options: ['cek tone dan pembacaan', 'menghapus Hanzi', 'mengganti arti'], answer: 'cek tone dan pembacaan' },
    ],
    vocabulary: [
      { question: '起床, 上课, 回家 termasuk kosakata...', options: ['rutinitas harian', 'warna', 'buah'], answer: 'rutinitas harian' },
      { question: '左边, 右边, 前面, 后面 termasuk...', options: ['arah/lokasi', 'keluarga', 'minuman'], answer: 'arah/lokasi' },
      { question: '贵 dan 便宜 adalah pasangan makna...', options: ['mahal dan murah', 'panas dan dingin', 'besar dan kecil'], answer: 'mahal dan murah' },
      { question: '常常 dan 有时候 menjelaskan...', options: ['frekuensi', 'kepemilikan', 'ukuran'], answer: 'frekuensi' },
    ],
    pronunciation: [
      { question: 'Tone sandhi perlu diperhatikan saat...', options: ['beberapa nada ketiga berdekatan', 'menulis arti Indonesia', 'membuka menu'], answer: 'beberapa nada ketiga berdekatan' },
      { question: 'Neutral tone terdengar...', options: ['ringan dan pendek', 'selalu sangat tinggi', 'selalu turun tajam'], answer: 'ringan dan pendek' },
      { question: 'Chunking kalimat berarti...', options: ['membagi kalimat berdasarkan unit makna', 'membaca semua tanpa jeda', 'menghapus pinyin'], answer: 'membagi kalimat berdasarkan unit makna' },
      { question: 'Dalam shadowing HSK 2, pengguna harus...', options: ['dengar, tirukan tone, lalu ulangi dengan ritme natural', 'menerjemahkan tanpa suara', 'menebak Hanzi saja'], answer: 'dengar, tirukan tone, lalu ulangi dengan ritme natural' },
    ],
  };

  const intermediateSkillPractice: Record<MandarinSkillId, MandarinLesson['practice']> = {
    grammar: [
      { question: '把 sentence paling cocok saat...', options: ['objek terdampak jelas oleh aksi', 'hanya menyapa orang', 'menyebut angka 1-10'], answer: 'objek terdampak jelas oleh aksi' },
      { question: '被 sentence dipakai untuk...', options: ['subjek mengalami tindakan dari pihak lain', 'menanyakan harga', 'menyatakan suka'], answer: 'subjek mengalami tindakan dari pihak lain' },
      { question: '听懂, 做完, 找到 adalah contoh...', options: ['result complement', 'measure word', 'pronoun'], answer: 'result complement' },
      { question: '一边...一边... menunjukkan...', options: ['dua aktivitas dilakukan bersamaan', 'perbandingan harga', 'kalimat pasif'], answer: 'dua aktivitas dilakukan bersamaan' },
      { question: '除了中文以外，我还学英语 berarti...', options: ['Selain Mandarin, saya juga belajar Inggris', 'Saya hanya belajar Mandarin', 'Saya tidak belajar bahasa'], answer: 'Selain Mandarin, saya juga belajar Inggris' },
    ],
    speaking: [
      { question: 'Untuk membuka opini HSK 3, frasa yang tepat adalah...', options: ['我觉得...', '多少钱？', '再见！'], answer: '我觉得...' },
      { question: 'Untuk memberi saran, gunakan...', options: ['你应该...', '我叫...', '这是...'], answer: '你应该...' },
      { question: '如果每天练习，进步会很快 berarti...', options: ['Jika berlatih tiap hari, kemajuan akan cepat', 'Saya membeli buku', 'Dia belum datang'], answer: 'Jika berlatih tiap hari, kemajuan akan cepat' },
      { question: 'Dialog HSK 3 sebaiknya punya...', options: ['alasan, respons, dan tindak lanjut', 'satu kata saja', 'hanya angka'], answer: 'alasan, respons, dan tindak lanjut' },
      { question: '我打算... dipakai untuk...', options: ['menyatakan rencana', 'menandai pasif', 'meminta ulang'], answer: 'menyatakan rencana' },
    ],
    listening: [
      { question: 'Dalam audio HSK 3, kata 先, 然后, 最后 menandai...', options: ['urutan kejadian', 'keluarga', 'harga'], answer: 'urutan kejadian' },
      { question: 'Saat mendengar 被, fokus utama adalah...', options: ['siapa/apa yang terkena tindakan', 'jumlah uang', 'tone pertama'], answer: 'siapa/apa yang terkena tindakan' },
      { question: '听懂了吗？ menanyakan...', options: ['apakah sudah paham dari listening', 'apakah sudah makan', 'apakah mau belanja'], answer: 'apakah sudah paham dari listening' },
      { question: '越来越 dalam audio menunjukkan...', options: ['perubahan bertahap', 'lokasi kiri', 'harga murah'], answer: 'perubahan bertahap' },
      { question: 'Ringkasan listening HSK 3 perlu memuat...', options: ['orang, masalah, alasan, hasil', 'warna UI', 'semua Hanzi tanpa makna'], answer: 'orang, masalah, alasan, hasil' },
    ],
    reading: [
      { question: '主要内容 berarti...', options: ['isi utama', 'arah kanan', 'segelas teh'], answer: 'isi utama' },
      { question: '重点 dalam bacaan berarti...', options: ['poin penting', 'nama keluarga', 'angka nol'], answer: 'poin penting' },
      { question: '以前...现在... biasanya membandingkan...', options: ['dulu dan sekarang', 'kanan dan kiri', 'harga dan uang'], answer: 'dulu dan sekarang' },
      { question: 'Dalam teks HSK 3, 找到 menunjukkan...', options: ['berhasil menemukan', 'belum mencari', 'sedang membeli'], answer: 'berhasil menemukan' },
      { question: 'Strategi reading HSK 3 yang baik adalah...', options: ['tandai konektor dan result complement', 'abaikan semua partikel', 'baca Hanzi tanpa konteks'], answer: 'tandai konektor dan result complement' },
    ],
    writing: [
      { question: 'Paragraf opini HSK 3 bisa dibuka dengan...', options: ['我觉得...', '请问多少钱？', '一二三四五'], answer: '我觉得...' },
      { question: 'Untuk menulis urutan kejadian, pakai...', options: ['先...然后...最后...', '除了...以外...', '被...了'], answer: '先...然后...最后...' },
      { question: 'Kalimat 我把房间整理好了 cocok untuk tulisan tentang...', options: ['hasil aksi merapikan kamar', 'perkenalan nama', 'cuaca besok'], answer: 'hasil aksi merapikan kamar' },
      { question: 'Tulisan HSK 3 sebaiknya memiliki...', options: ['kalimat pembuka, detail, alasan/hasil, penutup', 'hanya daftar kata', 'tanpa pinyin'], answer: 'kalimat pembuka, detail, alasan/hasil, penutup' },
      { question: '总结 dipakai saat...', options: ['meringkas isi teks/dialog', 'memesan makanan', 'menanyakan umur'], answer: 'meringkas isi teks/dialog' },
    ],
    vocabulary: [
      { question: '方法, 目标, 计划 termasuk kosakata...', options: ['belajar dan rencana', 'makanan', 'anggota keluarga dasar'], answer: 'belajar dan rencana' },
      { question: '麻烦, 办法, 解决 membentuk tema...', options: ['masalah dan solusi', 'warna', 'angka'], answer: 'masalah dan solusi' },
      { question: '出发, 到达, 机场 berhubungan dengan...', options: ['perjalanan', 'keluarga', 'hobi rumah'], answer: 'perjalanan' },
      { question: '任务, 会议, 同事 berhubungan dengan...', options: ['pekerjaan', 'restoran', 'cuaca'], answer: 'pekerjaan' },
      { question: '表达 berarti...', options: ['mengekspresikan', 'meletakkan', 'menjual'], answer: 'mengekspresikan' },
    ],
    pronunciation: [
      { question: 'Kalimat panjang HSK 3 harus dibaca dengan...', options: ['chunking berdasarkan klausa', 'tanpa jeda sama sekali', 'satu tone datar'], answer: 'chunking berdasarkan klausa' },
      { question: 'Pada result complement 听懂, tekanan makna ada pada...', options: ['懂', '听', '吗'], answer: '懂' },
      { question: '在 把 sentence, chunk yang natural adalah...', options: ['把 + objek + aksi + hasil/lokasi', 'subjek saja', 'pinyin saja'], answer: '把 + objek + aksi + hasil/lokasi' },
      { question: '除了...以外 perlu jeda natural setelah...', options: ['以外', '我', '学'], answer: '以外' },
      { question: 'Shadowing Intermediate menuntut...', options: ['tone stabil, jeda jelas, dan ritme natural', 'membaca secepat mungkin', 'menghapus pinyin'], answer: 'tone stabil, jeda jelas, dan ritme natural' },
    ],
  };

  const upperIntermediateModelOutput: Record<MandarinSkillId, MandarinLesson['modelOutput']> = {
    grammar: {
      title: 'Model analisis pola HSK 4',
      hanzi: '我认为学习语言的关键不是时间长，而是方法合适。与其每天背很多生词，不如把常用词放进真实句子里练习。这样不但能提高记忆效率，而且能让表达更自然。',
      pinyin: 'Wo ren wei xue xi yu yan de guan jian bu shi shi jian chang, er shi fang fa he shi. Yu qi mei tian bei hen duo sheng ci, bu ru ba chang yong ci fang jin zhen shi ju zi li lian xi. Zhe yang bu dan neng ti gao ji yi xiao lu, er qie neng rang biao da geng zi ran.',
      meaning: 'Menurut saya, kunci belajar bahasa bukan durasi yang panjang, melainkan metode yang cocok. Daripada menghafal banyak kosakata setiap hari, lebih baik memasukkan kata umum ke kalimat nyata. Dengan begitu, kita tidak hanya meningkatkan efisiensi memori, tetapi juga membuat ekspresi lebih natural.',
    },
    speaking: {
      title: 'Model presentasi 1 menit',
      hanzi: '大家好，今天我想谈谈科技对学习的影响。我认为科技让学习变得更方便，因为我们可以随时找到资料。不过，如果没有清楚的计划，网络也会浪费我们的时间。因此，我建议大家先确定目标，再选择合适的工具。',
      pinyin: 'Da jia hao, jin tian wo xiang tan tan ke ji dui xue xi de ying xiang. Wo ren wei ke ji rang xue xi bian de geng fang bian, yin wei wo men ke yi sui shi zhao dao zi liao. Bu guo, ru guo mei you qing chu de ji hua, wang luo ye hui lang fei wo men de shi jian. Yin ci, wo jian yi da jia xian que ding mu biao, zai xuan ze he shi de gong ju.',
      meaning: 'Halo semuanya, hari ini saya ingin membahas pengaruh teknologi terhadap belajar. Saya berpendapat teknologi membuat belajar lebih praktis karena kita bisa menemukan materi kapan saja. Namun, jika tidak ada rencana yang jelas, internet juga akan membuang waktu kita. Karena itu, saya menyarankan untuk menentukan target dulu, lalu memilih alat yang cocok.',
    },
    listening: {
      title: 'Model ringkasan listening',
      hanzi: '这段录音主要讨论工作压力。说话人认为压力不一定是坏事，关键是我们怎么处理。首先，要把任务分清楚；其次，要及时和同事沟通。总之，好的合作可以减少压力。',
      pinyin: 'Zhe duan lu yin zhu yao tao lun gong zuo ya li. Shuo hua ren ren wei ya li bu yi ding shi huai shi, guan jian shi wo men zen me chu li. Shou xian, yao ba ren wu fen qing chu; qi ci, yao ji shi he tong shi gou tong. Zong zhi, hao de he zuo ke yi jian shao ya li.',
      meaning: 'Audio ini terutama membahas tekanan kerja. Pembicara berpendapat tekanan tidak selalu buruk; kuncinya adalah bagaimana kita menanganinya. Pertama, tugas perlu dipisahkan dengan jelas; kedua, perlu berkomunikasi tepat waktu dengan rekan kerja. Kesimpulannya, kerja sama yang baik dapat mengurangi tekanan.',
    },
    reading: {
      title: 'Model strategi membaca HSK 4',
      hanzi: '阅读这类文章时，先找作者的态度，再找理由和例子。如果文章里出现“因此”“不过”“总之”，这些词通常会帮助我们理解逻辑。最后，用一两句话总结主要观点。',
      pinyin: 'Yue du zhe lei wen zhang shi, xian zhao zuo zhe de tai du, zai zhao li you he li zi. Ru guo wen zhang li chu xian "yin ci", "bu guo", "zong zhi", zhe xie ci tong chang hui bang zhu wo men li jie luo ji. Zui hou, yong yi liang ju hua zong jie zhu yao guan dian.',
      meaning: 'Saat membaca artikel seperti ini, cari dulu sikap penulis, lalu alasan dan contoh. Jika muncul kata seperti “karena itu”, “namun”, dan “kesimpulannya”, kata-kata ini biasanya membantu memahami logika. Terakhir, rangkum pandangan utama dalam satu atau dua kalimat.',
    },
    writing: {
      title: 'Model paragraf opini HSK 4',
      hanzi: '我认为每天短时间学习比周末一次学很久更有效。首先，短时间学习比较容易坚持。其次，每天复习可以帮助我们避免忘记。比如，我每天用二十分钟听录音、读句子、写三句话。总之，稳定的习惯比临时努力更重要。',
      pinyin: 'Wo ren wei mei tian duan shi jian xue xi bi zhou mo yi ci xue hen jiu geng you xiao. Shou xian, duan shi jian xue xi bi jiao rong yi jian chi. Qi ci, mei tian fu xi ke yi bang zhu wo men bi mian wang ji. Bi ru, wo mei tian yong er shi fen zhong ting lu yin, du ju zi, xie san ju hua. Zong zhi, wen ding de xi guan bi lin shi nu li geng zhong yao.',
      meaning: 'Saya berpendapat belajar singkat setiap hari lebih efektif daripada belajar sangat lama sekali di akhir pekan. Pertama, belajar singkat lebih mudah dipertahankan. Kedua, review harian membantu kita menghindari lupa. Misalnya, saya memakai 20 menit setiap hari untuk mendengarkan rekaman, membaca kalimat, dan menulis tiga kalimat. Kesimpulannya, kebiasaan stabil lebih penting daripada usaha dadakan.',
    },
    vocabulary: {
      title: 'Model word bank bernuansa',
      hanzi: '观点：我认为 / 我的看法是。理由：主要原因是 / 关键是。结果：因此 / 导致 / 说明。建议：最好 / 尽量 / 避免。总结：总之 / 也就是说。',
      pinyin: 'Guan dian: wo ren wei / wo de kan fa shi. Li you: zhu yao yuan yin shi / guan jian shi. Jie guo: yin ci / dao zhi / shuo ming. Jian yi: zui hao / jin liang / bi mian. Zong jie: zong zhi / ye jiu shi shuo.',
      meaning: 'Kelompok kata: opini, alasan, hasil, saran, dan kesimpulan. Gunakan sebagai bank frasa untuk speaking dan writing HSK 4.',
    },
    pronunciation: {
      title: 'Model chunking pengucapan',
      hanzi: '我认为 / 学习语言的关键 / 不是时间长 / 而是方法合适。总之 / 稳定的习惯 / 比临时努力 / 更重要。',
      pinyin: 'Wo ren wei / xue xi yu yan de guan jian / bu shi shi jian chang / er shi fang fa he shi. Zong zhi / wen ding de xi guan / bi lin shi nu li / geng zhong yao.',
      meaning: 'Baca dengan jeda logis. Tekankan kontras pada 不是...而是..., lalu turunkan intonasi pada 总之 untuk memberi sinyal kesimpulan.',
    },
  };

  const upperIntermediateRubric: Record<MandarinSkillId, string[]> = {
    grammar: ['Memakai minimal 4 pola HSK 4 dengan fungsi yang tepat.', 'Membedakan penambahan argumen, kontras, penekanan, dan pilihan.', 'Kalimat tetap natural, tidak hanya menerjemahkan kata per kata.'],
    speaking: ['Ada pembuka, posisi, dua alasan, contoh/data, dan kesimpulan.', 'Intonasi tidak datar dan jeda antar-klausa jelas.', 'Menggunakan minimal 8 kosakata HSK 4 dari lesson.'],
    listening: ['Menangkap sikap pembicara, bukan hanya kata kunci.', 'Mencatat data/angka dan hubungan sebab-akibat.', 'Meringkas isi audio tanpa menyalin semua kalimat.'],
    reading: ['Menandai konektor seperti 因此, 不过, 总之, 首先, 其次.', 'Menemukan sikap penulis dan alasan pendukung.', 'Membedakan ide utama, detail, contoh, dan kesimpulan.'],
    writing: ['Paragraf 160-220 Hanzi punya struktur jelas.', 'Memakai konektor HSK 4 dan minimal satu contoh/data.', 'Ada revisi: cek urutan kata, partikel, dan pilihan kosakata.'],
    vocabulary: ['Membuat kolokasi, bukan daftar kata lepas.', 'Mengelompokkan kata berdasarkan fungsi komunikasi.', 'Setiap kata dipakai dalam kalimat HSK 4 sendiri.'],
    pronunciation: ['Chunking kalimat panjang terdengar jelas.', 'Tone tetap stabil saat kalimat makin panjang.', 'Kontras, persentase, dan penekanan 连...都 dibaca natural.'],
  };

  const advancedPatterns: Record<MandarinSkillId, MandarinLesson['patterns']> = {
    grammar: [
      { label: '尽管...仍然...', hanzi: '尽管成本很高，这项政策仍然值得尝试。', pinyin: 'Jin guan cheng ben hen gao, zhe xiang zheng ce reng ran zhi de chang shi.', meaning: 'Meskipun biayanya tinggi, kebijakan ini tetap layak dicoba.' },
      { label: '一方面...另一方面...', hanzi: '一方面，科技提高了效率；另一方面，它也带来了新的风险。', pinyin: 'Yi fang mian, ke ji ti gao le xiao lu; ling yi fang mian, ta ye dai lai le xin de feng xian.', meaning: 'Di satu sisi teknologi meningkatkan efisiensi; di sisi lain ia membawa risiko baru.' },
      { label: '之所以...是因为...', hanzi: '人们之所以关注这个问题，是因为它影响了日常生活。', pinyin: 'Ren men zhi suo yi guan zhu zhe ge wen ti, shi yin wei ta ying xiang le ri chang sheng huo.', meaning: 'Alasan orang memperhatikan masalah ini adalah karena ia memengaruhi kehidupan sehari-hari.' },
      { label: '从...角度来看', hanzi: '从长期发展的角度来看，教育改革非常重要。', pinyin: 'Cong chang qi fa zhan de jiao du lai kan, jiao yu gai ge fei chang zhong yao.', meaning: 'Dari sudut pandang perkembangan jangka panjang, reformasi pendidikan sangat penting.' },
    ],
    speaking: [
      { label: 'Academic opening', hanzi: '关于这个话题，我想从三个方面来分析。', pinyin: 'Guan yu zhe ge hua ti, wo xiang cong san ge fang mian lai fen xi.', meaning: 'Tentang topik ini, saya ingin menganalisis dari tiga sisi.' },
      { label: 'Balanced stance', hanzi: '我不完全反对这个观点，但我认为还需要考虑实际情况。', pinyin: 'Wo bu wan quan fan dui zhe ge guan dian, dan wo ren wei hai xu yao kao lv shi ji qing kuang.', meaning: 'Saya tidak sepenuhnya menolak pandangan ini, tetapi situasi nyata tetap perlu dipertimbangkan.' },
      { label: 'Evidence cue', hanzi: '一个明显的例子是...', pinyin: 'Yi ge ming xian de li zi shi...', meaning: 'Contoh yang jelas adalah...' },
      { label: 'Synthesis close', hanzi: '综合来看，最合理的做法是...', pinyin: 'Zong he lai kan, zui he li de zuo fa shi...', meaning: 'Secara menyeluruh, cara paling masuk akal adalah...' },
    ],
    listening: [
      { label: 'Listen for concession', hanzi: '尽管...但是/仍然...', pinyin: 'jin guan... dan shi / reng ran...', meaning: 'Tangkap konsesi dan posisi akhir pembicara.' },
      { label: 'Listen for viewpoint shift', hanzi: '相反 / 然而 / 不过', pinyin: 'xiang fan / ran er / bu guo', meaning: 'Penanda perubahan arah argumen.' },
      { label: 'Listen for implied meaning', hanzi: '说话人并没有直接反对，而是提出了限制。', pinyin: 'Shuo hua ren bing mei you zhi jie fan dui, er shi ti chu le xian zhi.', meaning: 'Pembicara tidak menolak langsung, tetapi menyebut batasan.' },
      { label: 'Listen for conclusion', hanzi: '由此可见 / 总的来说 / 综合来看', pinyin: 'you ci ke jian / zong de lai shuo / zong he lai kan', meaning: 'Penanda kesimpulan wacana.' },
    ],
    reading: [
      { label: 'Thesis', hanzi: '文章的核心观点是...', pinyin: 'Wen zhang de he xin guan dian shi...', meaning: 'Tesis atau pandangan inti bacaan.' },
      { label: 'Counterargument', hanzi: '有些人认为...，然而作者指出...', pinyin: 'You xie ren ren wei..., ran er zuo zhe zhi chu...', meaning: 'Sanggahan terhadap pandangan lain.' },
      { label: 'Inference', hanzi: '从这句话可以推断出...', pinyin: 'Cong zhe ju hua ke yi tui duan chu...', meaning: 'Dari kalimat ini dapat disimpulkan...' },
      { label: 'Structure markers', hanzi: '首先 / 其次 / 此外 / 最后', pinyin: 'shou xian / qi ci / ci wai / zui hou', meaning: 'Penanda struktur argumentatif.' },
    ],
    writing: [
      { label: 'Formal essay frame', hanzi: '随着...的发展，...已经成为一个值得讨论的问题。', pinyin: 'Sui zhe... de fa zhan, ... yi jing cheng wei yi ge zhi de tao lun de wen ti.', meaning: 'Seiring perkembangan..., ... telah menjadi masalah yang layak dibahas.' },
      { label: 'Balanced argument', hanzi: '这种做法既有优势，也存在一定的限制。', pinyin: 'Zhe zhong zuo fa ji you you shi, ye cun zai yi ding de xian zhi.', meaning: 'Cara ini punya keunggulan, tetapi juga memiliki batasan tertentu.' },
      { label: 'Evidence paragraph', hanzi: '以...为例，我们可以看到...', pinyin: 'Yi... wei li, wo men ke yi kan dao...', meaning: 'Dengan ... sebagai contoh, kita dapat melihat...' },
      { label: 'Conclusion', hanzi: '因此，关键不在于是否使用它，而在于如何合理地使用它。', pinyin: 'Yin ci, guan jian bu zai yu shi fou shi yong ta, er zai yu ru he he li de shi yong ta.', meaning: 'Kuncinya bukan apakah memakainya, tetapi bagaimana memakainya secara rasional.' },
    ],
    vocabulary: [
      { label: 'Abstract nouns', hanzi: '价值观 / 现象 / 趋势 / 影响 / 限制', pinyin: 'jia zhi guan / xian xiang / qu shi / ying xiang / xian zhi', meaning: 'kata benda abstrak untuk esai HSK 5' },
      { label: 'Argument verbs', hanzi: '反映 / 促进 / 导致 / 忽视 / 承担', pinyin: 'fan ying / cu jin / dao zhi / hu shi / cheng dan', meaning: 'kata kerja untuk analisis' },
      { label: 'Stance markers', hanzi: '相反 / 然而 / 尽管 / 仍然 / 由此可见', pinyin: 'xiang fan / ran er / jin guan / reng ran / you ci ke jian', meaning: 'penanda sikap dan logika' },
      { label: 'Evaluation words', hanzi: '合理 / 长期 / 明显 / 复杂 / 有限', pinyin: 'he li / chang qi / ming xian / fu za / you xian', meaning: 'kata evaluatif untuk nuansa' },
    ],
    pronunciation: [
      { label: 'Rhetorical pause', hanzi: '一方面 / 科技提高了效率；另一方面 / 它也带来了风险。', pinyin: 'Yi fang mian / ke ji ti gao le xiao lu; ling yi fang mian / ta ye dai lai le feng xian.', meaning: 'Gunakan jeda retoris untuk struktur dua sisi.' },
      { label: 'Concession flow', hanzi: '尽管成本很高 / 这项政策仍然值得尝试。', pinyin: 'Jin guan cheng ben hen gao / zhe xiang zheng ce reng ran zhi de chang shi.', meaning: 'Klausa konsesi naik ringan, posisi utama lebih tegas.' },
      { label: 'Abstract phrase rhythm', hanzi: '社会现象 / 价值观变化 / 长期影响', pinyin: 'she hui xian xiang / jia zhi guan bian hua / chang qi ying xiang', meaning: 'Latih frasa abstrak sebagai satu unit suara.' },
      { label: 'Conclusion intonation', hanzi: '由此可见 / 我们需要更全面地考虑问题。', pinyin: 'You ci ke jian / wo men xu yao geng quan mian de kao lv wen ti.', meaning: 'Turunkan intonasi pada kesimpulan.' },
    ],
  };

  const advancedSkillPractice: Record<MandarinSkillId, MandarinLesson['practice']> = {
    grammar: [
      { question: '尽管...仍然... menunjukkan...', options: ['konsesi dan posisi utama', 'pertanyaan harga', 'lokasi benda'], answer: 'konsesi dan posisi utama' },
      { question: '一方面...另一方面... dipakai untuk...', options: ['menganalisis dua sisi', 'menyebut jam', 'meminta ulang'], answer: 'menganalisis dua sisi' },
      { question: '之所以...是因为... menekankan...', options: ['alasan utama', 'angka ordinal', 'sapaan'], answer: 'alasan utama' },
    ],
    speaking: [
      { question: 'Pembuka presentasi HSK 5 yang paling tepat adalah...', options: ['关于这个话题，我想从三个方面来分析。', '你好，我叫...', '多少钱？'], answer: '关于这个话题，我想从三个方面来分析。' },
      { question: '综合来看 dipakai untuk...', options: ['menyintesis kesimpulan', 'menanyakan nama', 'membeli tiket'], answer: 'menyintesis kesimpulan' },
      { question: '我不完全反对... menunjukkan sikap...', options: ['seimbang/bernuansa', 'sangat dasar', 'tidak relevan'], answer: 'seimbang/bernuansa' },
    ],
    listening: [
      { question: '然而 dalam audio menandai...', options: ['perubahan arah argumen', 'angka tanggal', 'sapaan'], answer: 'perubahan arah argumen' },
      { question: 'Makna tersirat berarti...', options: ['maksud yang tidak selalu disebut langsung', 'pinyin tanpa nada', 'daftar kosakata'], answer: 'maksud yang tidak selalu disebut langsung' },
      { question: '由此可见 menandai...', options: ['kesimpulan', 'urutan stroke', 'restoran'], answer: 'kesimpulan' },
    ],
    reading: [
      { question: '核心观点 berarti...', options: ['pandangan inti', 'alamat rumah', 'harga barang'], answer: 'pandangan inti' },
      { question: '推断 berarti...', options: ['menyimpulkan/inferensi', 'mengucapkan tone', 'membayar'], answer: 'menyimpulkan/inferensi' },
      { question: '然而作者指出... biasanya memperkenalkan...', options: ['sanggahan atau koreksi', 'nama keluarga', 'menu makanan'], answer: 'sanggahan atau koreksi' },
    ],
    writing: [
      { question: '随着...的发展 cocok untuk...', options: ['membuka esai formal', 'menutup telepon', 'menghitung uang'], answer: 'membuka esai formal' },
      { question: '既有优势，也存在限制 berarti...', options: ['ada keunggulan dan batasan', 'hanya buruk', 'tidak ada masalah'], answer: 'ada keunggulan dan batasan' },
      { question: 'Esai HSK 5 harus punya...', options: ['tesis, argumen, contoh, sanggahan, kesimpulan', 'satu kalimat saja', 'hanya pinyin'], answer: 'tesis, argumen, contoh, sanggahan, kesimpulan' },
    ],
    vocabulary: [
      { question: '价值观 termasuk...', options: ['kata benda abstrak', 'kata benda dapur', 'partikel tanya'], answer: 'kata benda abstrak' },
      { question: '促进 berarti...', options: ['mendorong/memajukan', 'mengabaikan', 'tertidur'], answer: 'mendorong/memajukan' },
      { question: '合理 berarti...', options: ['rasional/masuk akal', 'sangat murah', 'sebelah kanan'], answer: 'rasional/masuk akal' },
    ],
    pronunciation: [
      { question: 'Jeda retoris membantu...', options: ['membuat struktur argumen terdengar jelas', 'menghilangkan tone', 'membaca tanpa arti'], answer: 'membuat struktur argumen terdengar jelas' },
      { question: 'Pada 由此可见, intonasi biasanya...', options: ['memberi sinyal kesimpulan', 'selalu naik seperti pertanyaan', 'dihilangkan'], answer: 'memberi sinyal kesimpulan' },
      { question: 'Frasa abstrak seperti 社会现象 sebaiknya...', options: ['dibaca sebagai satu unit makna', 'dipisah per huruf', 'diabaikan'], answer: 'dibaca sebagai satu unit makna' },
    ],
  };

  const advancedModelOutput: Record<MandarinSkillId, MandarinLesson['modelOutput']> = {
    grammar: {
      title: 'Model analisis grammar HSK 5',
      hanzi: '尽管人工智能提高了工作效率，人们仍然需要培养独立思考的能力。一方面，技术可以帮助我们处理大量信息；另一方面，如果过分依赖技术，我们可能会忽视判断力的重要性。',
      pinyin: 'Jin guan ren gong zhi neng ti gao le gong zuo xiao lu, ren men reng ran xu yao pei yang du li si kao de neng li. Yi fang mian, ji shu ke yi bang zhu wo men chu li da liang xin xi; ling yi fang mian, ru guo guo fen yi lai ji shu, wo men ke neng hui hu shi pan duan li de zhong yao xing.',
      meaning: 'Meskipun AI meningkatkan efisiensi kerja, manusia tetap perlu mengembangkan kemampuan berpikir mandiri. Di satu sisi, teknologi membantu memproses banyak informasi; di sisi lain, jika terlalu bergantung pada teknologi, kita bisa mengabaikan pentingnya daya penilaian.',
    },
    speaking: {
      title: 'Model presentasi HSK 5',
      hanzi: '关于城市生活的压力，我想从工作、交通和人际关系三个方面来分析。城市提供了更多机会，但也带来了更快的生活节奏。综合来看，关键不是逃离城市，而是学会合理安排时间，并建立稳定的支持系统。',
      pinyin: 'Guan yu cheng shi sheng huo de ya li, wo xiang cong gong zuo, jiao tong he ren ji guan xi san ge fang mian lai fen xi. Cheng shi ti gong le geng duo ji hui, dan ye dai lai le geng kuai de sheng huo jie zou. Zong he lai kan, guan jian bu shi tao li cheng shi, er shi xue hui he li an pai shi jian, bing jian li wen ding de zhi chi xi tong.',
      meaning: 'Tentang tekanan hidup kota, saya ingin menganalisis dari pekerjaan, transportasi, dan hubungan sosial. Kota memberi lebih banyak kesempatan, tetapi juga ritme hidup lebih cepat. Secara menyeluruh, kuncinya bukan melarikan diri dari kota, tetapi mengatur waktu secara rasional dan membangun sistem dukungan stabil.',
    },
    listening: {
      title: 'Model ringkasan audio HSK 5',
      hanzi: '录音的核心观点是，在线学习并不能完全代替面对面交流。说话人承认在线学习很方便，但他强调学习效果还取决于自律能力和互动质量。由此可见，他的态度是谨慎支持。',
      pinyin: 'Lu yin de he xin guan dian shi, zai xian xue xi bing bu neng wan quan dai ti mian dui mian jiao liu. Shuo hua ren cheng ren zai xian xue xi hen fang bian, dan ta qiang diao xue xi xiao guo hai qu jue yu zi lv neng li he hu dong zhi liang. You ci ke jian, ta de tai du shi jin shen zhi chi.',
      meaning: 'Pandangan inti audio adalah pembelajaran online tidak sepenuhnya menggantikan komunikasi tatap muka. Pembicara mengakui belajar online praktis, tetapi hasil belajar juga bergantung pada disiplin diri dan kualitas interaksi. Sikapnya mendukung secara hati-hati.',
    },
    reading: {
      title: 'Model inferensi reading HSK 5',
      hanzi: '文章表面上讨论消费选择，实际上关注的是现代人的价值观变化。作者并不反对消费，而是批评盲目追求品牌的现象。因此，阅读时要区分事实、例子和作者真正的态度。',
      pinyin: 'Wen zhang biao mian shang tao lun xiao fei xuan ze, shi ji shang guan zhu de shi xian dai ren de jia zhi guan bian hua. Zuo zhe bing bu fan dui xiao fei, er shi pi ping mang mu zhui qiu pin pai de xian xiang. Yin ci, yue du shi yao qu fen shi shi, li zi he zuo zhe zhen zheng de tai du.',
      meaning: 'Artikel tampaknya membahas pilihan konsumsi, tetapi sebenarnya memperhatikan perubahan nilai manusia modern. Penulis tidak menolak konsumsi, melainkan mengkritik fenomena mengejar merek secara buta. Pembaca harus membedakan fakta, contoh, dan sikap penulis.',
    },
    writing: {
      title: 'Model esai pendek HSK 5',
      hanzi: '随着人工智能的发展，越来越多的人开始担心未来的工作机会。我认为，这种担心可以理解，但不必过分悲观。一方面，人工智能会代替一些重复性的工作；另一方面，它也会创造新的职业需求。因此，最重要的是不断学习，并培养技术无法轻易替代的能力。',
      pinyin: 'Sui zhe ren gong zhi neng de fa zhan, yue lai yue duo de ren kai shi dan xin wei lai de gong zuo ji hui. Wo ren wei, zhe zhong dan xin ke yi li jie, dan bu bi guo fen bei guan. Yi fang mian, ren gong zhi neng hui dai ti yi xie chong fu xing de gong zuo; ling yi fang mian, ta ye hui chuang zao xin de zhi ye xu qiu. Yin ci, zui zhong yao de shi bu duan xue xi, bing pei yang ji shu wu fa qing yi dai ti de neng li.',
      meaning: 'Seiring perkembangan AI, makin banyak orang khawatir tentang peluang kerja masa depan. Kekhawatiran ini dapat dipahami, tetapi tidak perlu terlalu pesimis. AI akan menggantikan beberapa pekerjaan berulang, tetapi juga menciptakan kebutuhan profesi baru. Yang penting adalah terus belajar dan membangun kemampuan yang tidak mudah digantikan teknologi.',
    },
    vocabulary: {
      title: 'Model lexical set HSK 5',
      hanzi: '现象反映价值观，趋势带来挑战，政策促进发展，限制影响效率。写作时不要只堆词，而要把词放进因果、让步和对比关系中。',
      pinyin: 'Xian xiang fan ying jia zhi guan, qu shi dai lai tiao zhan, zheng ce cu jin fa zhan, xian zhi ying xiang xiao lu. Xie zuo shi bu yao zhi dui ci, er yao ba ci fang jin yin guo, rang bu he dui bi guan xi zhong.',
      meaning: 'Fenomena mencerminkan nilai, tren membawa tantangan, kebijakan mendorong perkembangan, batasan memengaruhi efisiensi. Saat menulis jangan hanya menumpuk kata, tetapi letakkan kata dalam sebab-akibat, konsesi, dan perbandingan.',
    },
    pronunciation: {
      title: 'Model prosodi HSK 5',
      hanzi: '尽管技术带来了便利 / 我们仍然需要保持独立思考。综合来看 / 关键不在于工具本身 / 而在于我们如何使用它。',
      pinyin: 'Jin guan ji shu dai lai le bian li / wo men reng ran xu yao bao chi du li si kao. Zong he lai kan / guan jian bu zai yu gong ju ben shen / er zai yu wo men ru he shi yong ta.',
      meaning: 'Gunakan jeda setelah klausa konsesi dan penanda kesimpulan. Tekankan kontras pada 不在于...而在于....',
    },
  };

  const advancedRubric: Record<MandarinSkillId, string[]> = {
    grammar: ['Memakai struktur HSK 5 untuk konsesi, dua sisi argumen, sebab utama, dan sudut pandang.', 'Kalimat kompleks tetap jelas dan tidak terlalu panjang.', 'Struktur grammar mendukung argumen, bukan hanya dipamerkan.'],
    speaking: ['Presentasi punya tesis, tiga poin analisis, contoh, dan sintesis.', 'Sikap terdengar bernuansa, bukan hanya setuju/tidak setuju.', 'Pengucapan stabil saat memakai frasa abstrak.'],
    listening: ['Menangkap sikap tersirat dan perubahan arah argumen.', 'Membedakan fakta, contoh, batasan, dan kesimpulan.', 'Ringkasan memakai bahasa sendiri.'],
    reading: ['Menemukan tesis, sanggahan, bukti, dan implikasi.', 'Membaca penanda logika untuk memahami struktur teks.', 'Menyimpulkan sikap penulis secara akurat.'],
    writing: ['Esai 220-320 Hanzi punya pembuka formal, dua sisi argumen, contoh, dan kesimpulan.', 'Memakai transisi HSK 5 seperti 尽管, 然而, 由此可见, 综合来看.', 'Ada revisi untuk koherensi, register, dan pilihan kata abstrak.'],
    vocabulary: ['Kosakata dikelompokkan berdasarkan fungsi argumen.', 'Setiap kata punya kolokasi dan contoh konteks.', 'Menghindari repetisi dengan sinonim yang tepat.'],
    pronunciation: ['Jeda retoris menandai tesis, contoh, kontras, dan kesimpulan.', 'Tone tetap stabil dalam kalimat panjang.', 'Frasa abstrak dibaca sebagai unit makna.'],
  };

  const proficiencyPatterns: Record<MandarinSkillId, MandarinLesson['patterns']> = {
    grammar: [
      { label: '即便...也...', hanzi: '即便短期内看不到效果，这项改革也具有长远意义。', pinyin: 'Ji bian duan qi nei kan bu dao xiao guo, zhe xiang gai ge ye ju you chang yuan yi yi.', meaning: 'Walau hasilnya tidak terlihat dalam jangka pendek, reformasi ini tetap punya makna jangka panjang.' },
      { label: '与其说...不如说...', hanzi: '与其说这是技术问题，不如说这是治理能力的问题。', pinyin: 'Yu qi shuo zhe shi ji shu wen ti, bu ru shuo zhe shi zhi li neng li de wen ti.', meaning: 'Daripada menyebutnya masalah teknis, lebih tepat menyebutnya masalah kapasitas tata kelola.' },
      { label: '并非...而是...', hanzi: '核心矛盾并非资源不足，而是资源分配不均。', pinyin: 'He xin mao dun bing fei zi yuan bu zu, er shi zi yuan fen pei bu jun.', meaning: 'Kontradiksi intinya bukan kekurangan sumber daya, melainkan distribusi yang tidak merata.' },
      { label: '归根结底', hanzi: '归根结底，制度是否有效取决于执行和监督。', pinyin: 'Gui gen jie di, zhi du shi fou you xiao qu jue yu zhi xing he jian du.', meaning: 'Pada akhirnya, efektif tidaknya sistem bergantung pada pelaksanaan dan pengawasan.' },
    ],
    speaking: [
      { label: 'Executive framing', hanzi: '如果把这个问题放在更大的社会背景下来看，我们会发现...', pinyin: 'Ru guo ba zhe ge wen ti fang zai geng da de she hui bei jing xia lai kan, wo men hui fa xian...', meaning: 'Jika masalah ini ditempatkan dalam konteks sosial yang lebih luas, kita akan melihat...' },
      { label: 'Nuanced stance', hanzi: '我倾向于支持这个方向，但前提是必须建立有效的监督机制。', pinyin: 'Wo qing xiang yu zhi chi zhe ge fang xiang, dan qian ti shi bi xu jian li you xiao de jian du ji zhi.', meaning: 'Saya cenderung mendukung arah ini, tetapi syaratnya harus ada mekanisme pengawasan efektif.' },
      { label: 'Strategic recommendation', hanzi: '更可行的方案不是全面否定，而是逐步调整。', pinyin: 'Geng ke xing de fang an bu shi quan mian fou ding, er shi zhu bu tiao zheng.', meaning: 'Solusi yang lebih layak bukan menolak total, melainkan menyesuaikan bertahap.' },
      { label: 'Synthesis close', hanzi: '因此，我们需要在效率、公平和可持续性之间找到平衡。', pinyin: 'Yin ci, wo men xu yao zai xiao lu, gong ping he ke chi xu xing zhi jian zhao dao ping heng.', meaning: 'Karena itu, kita perlu menemukan keseimbangan antara efisiensi, keadilan, dan keberlanjutan.' },
    ],
    listening: [
      { label: 'Hidden premise', hanzi: '说话人真正担心的不是成本，而是执行过程中可能出现的不公平。', pinyin: 'Shuo hua ren zhen zheng dan xin de bu shi cheng ben, er shi zhi xing guo cheng zhong ke neng chu xian de bu gong ping.', meaning: 'Tangkap premis tersembunyi: kekhawatiran bukan biaya, melainkan ketidakadilan saat pelaksanaan.' },
      { label: 'Stance through restraint', hanzi: '他没有直接批评，但语气中带有明显保留。', pinyin: 'Ta mei you zhi jie pi ping, dan yu qi zhong dai you ming xian bao liu.', meaning: 'Pembicara tidak mengkritik langsung, tetapi nadanya menyimpan keberatan.' },
      { label: 'Argument hierarchy', hanzi: '先区分事实、判断和建议，再总结核心论点。', pinyin: 'Xian qu fen shi shi, pan duan he jian yi, zai zong jie he xin lun dian.', meaning: 'Pisahkan fakta, penilaian, dan saran sebelum merangkum argumen inti.' },
      { label: 'Synthesis listening', hanzi: '两位说话人的分歧在于风险由谁承担。', pinyin: 'Liang wei shuo hua ren de fen qi zai yu feng xian you shei cheng dan.', meaning: 'Perbedaan dua pembicara terletak pada siapa yang menanggung risiko.' },
    ],
    reading: [
      { label: 'Ideological framing', hanzi: '作者通过选择词语暗示了自己的立场。', pinyin: 'Zuo zhe tong guo xuan ze ci yu an shi le zi ji de li chang.', meaning: 'Penulis mengisyaratkan sikap melalui pilihan kata.' },
      { label: 'Unstated premise', hanzi: '文章没有明说的前提是...', pinyin: 'Wen zhang mei you ming shuo de qian ti shi...', meaning: 'Premis yang tidak disebut langsung dalam teks adalah...' },
      { label: 'Rhetorical strategy', hanzi: '作者先承认对方观点，再转向自己的论证。', pinyin: 'Zuo zhe xian cheng ren dui fang guan dian, zai zhuan xiang zi ji de lun zheng.', meaning: 'Penulis mengakui pandangan lawan terlebih dahulu, lalu beralih ke argumennya sendiri.' },
      { label: 'Synthesis across texts', hanzi: '两篇文章都关注公平，但侧重点不同。', pinyin: 'Liang pian wen zhang dou guan zhu gong ping, dan ce zhong dian bu tong.', meaning: 'Dua teks sama-sama membahas keadilan, tetapi fokusnya berbeda.' },
    ],
    writing: [
      { label: 'Thesis with nuance', hanzi: '这个问题不能简单地用支持或反对来概括。', pinyin: 'Zhe ge wen ti bu neng jian dan de yong zhi chi huo fan dui lai gai kuo.', meaning: 'Masalah ini tidak bisa diringkas sederhana sebagai dukung atau tolak.' },
      { label: 'Policy memo', hanzi: '建议从短期执行、中期评估和长期制度建设三个层面推进。', pinyin: 'Jian yi cong duan qi zhi xing, zhong qi ping gu he chang qi zhi du jian she san ge ceng mian tui jin.', meaning: 'Disarankan mendorong dari tiga lapis: pelaksanaan jangka pendek, evaluasi menengah, dan pembangunan institusi jangka panjang.' },
      { label: 'Critical review', hanzi: '该论点的不足在于忽略了弱势群体的实际处境。', pinyin: 'Gai lun dian de bu zu zai yu hu lue le ruo shi qun ti de shi ji chu jing.', meaning: 'Kelemahan argumen ini adalah mengabaikan kondisi nyata kelompok rentan.' },
      { label: 'Synthesis conclusion', hanzi: '真正可持续的方案应当兼顾效率、公平与公众信任。', pinyin: 'Zhen zheng ke chi xu de fang an ying dang jian gu xiao lu, gong ping yu gong zhong xin ren.', meaning: 'Solusi yang benar-benar berkelanjutan harus mempertimbangkan efisiensi, keadilan, dan kepercayaan publik.' },
    ],
    vocabulary: [
      { label: 'Governance set', hanzi: '治理 / 制度 / 监督 / 透明度 / 问责', pinyin: 'zhi li / zhi du / jian du / tou ming du / wen ze', meaning: 'tata kelola / sistem / pengawasan / transparansi / akuntabilitas' },
      { label: 'Critical stance', hanzi: '质疑 / 反思 / 批判 / 保留 / 前提', pinyin: 'zhi yi / fan si / pi pan / bao liu / qian ti', meaning: 'mempertanyakan / refleksi / kritik / keberatan / premis' },
      { label: 'Synthesis verbs', hanzi: '整合 / 权衡 / 推导 / 概括 / 论证', pinyin: 'zheng he / quan heng / tui dao / gai kuo / lun zheng', meaning: 'mengintegrasi / menimbang / menurunkan kesimpulan / merangkum / berargumen' },
      { label: 'Nuance markers', hanzi: '未必 / 不见得 / 某种程度上 / 归根结底', pinyin: 'wei bi / bu jian de / mou zhong cheng du shang / gui gen jie di', meaning: 'belum tentu / tidak selalu / dalam tingkat tertentu / pada akhirnya' },
    ],
    pronunciation: [
      { label: 'Executive cadence', hanzi: '从长远来看 / 真正的挑战 / 并不在于资源不足 / 而在于制度安排。', pinyin: 'Cong chang yuan lai kan / zhen zheng de tiao zhan / bing bu zai yu zi yuan bu zu / er zai yu zhi du an pai.', meaning: 'Jeda seperti briefing profesional.' },
      { label: 'Soft disagreement', hanzi: '我不完全否认这一点 / 但这个结论仍然需要进一步验证。', pinyin: 'Wo bu wan quan fou ren zhe yi dian / dan zhe ge jie lun reng ran xu yao jin yi bu yan zheng.', meaning: 'Nada keberatan halus, tidak agresif.' },
      { label: 'Idiom chunk', hanzi: '权衡利弊 / 归根结底 / 不容忽视', pinyin: 'quan heng li bi / gui gen jie di / bu rong hu shi', meaning: 'Idiom dibaca sebagai chunk tetap.' },
      { label: '3-minute flow', hanzi: '提出问题 / 分析原因 / 比较方案 / 得出结论。', pinyin: 'Ti chu wen ti / fen xi yuan yin / bi jiao fang an / de chu jie lun.', meaning: 'Alur napas untuk presentasi panjang.' },
    ],
  };

  const proficiencySkillPractice: Record<MandarinSkillId, MandarinLesson['practice']> = {
    grammar: [
      { question: '与其说A，不如说B menunjukkan...', options: ['reframing: B lebih tepat daripada A', 'harga barang', 'sapaan'], answer: 'reframing: B lebih tepat daripada A' },
      { question: '并非...而是... dipakai untuk...', options: ['mengoreksi asumsi dan menegaskan inti', 'menanyakan umur', 'menulis angka'], answer: 'mengoreksi asumsi dan menegaskan inti' },
      { question: '归根结底 menandai...', options: ['kesimpulan akar masalah', 'arah kanan', 'menu restoran'], answer: 'kesimpulan akar masalah' },
    ],
    speaking: [
      { question: 'HSK 6 speaking perlu menunjukkan...', options: ['tesis, nuansa, sintesis, dan rekomendasi', 'jawaban satu kata', 'hanya pinyin'], answer: 'tesis, nuansa, sintesis, dan rekomendasi' },
      { question: '我倾向于支持..., 但前提是... menunjukkan...', options: ['dukungan bersyarat', 'penolakan kasar', 'sapaan dasar'], answer: 'dukungan bersyarat' },
      { question: '更可行的方案不是..., 而是... berarti...', options: ['membandingkan solusi secara strategis', 'membeli barang', 'minta alamat'], answer: 'membandingkan solusi secara strategis' },
    ],
    listening: [
      { question: 'Hidden premise dalam listening adalah...', options: ['asumsi yang mendasari argumen tetapi tidak selalu diucapkan', 'suara paling keras', 'jumlah kata'], answer: 'asumsi yang mendasari argumen tetapi tidak selalu diucapkan' },
      { question: '语气中带有保留 berarti pembicara...', options: ['punya keberatan/keraguan halus', 'sangat marah selalu', 'sedang menyapa'], answer: 'punya keberatan/keraguan halus' },
      { question: 'Synthesis listening meminta user...', options: ['menggabungkan posisi beberapa pembicara', 'menyalin semua kalimat', 'mengabaikan konteks'], answer: 'menggabungkan posisi beberapa pembicara' },
    ],
    reading: [
      { question: 'Ideological framing berarti...', options: ['cara teks membingkai isu melalui pilihan kata/sudut pandang', 'jumlah paragraf', 'pinyin teks'], answer: 'cara teks membingkai isu melalui pilihan kata/sudut pandang' },
      { question: '前提 berarti...', options: ['premis/asumsi dasar', 'kesimpulan akhir saja', 'nada pertama'], answer: 'premis/asumsi dasar' },
      { question: 'Rhetorical strategy membaca...', options: ['bagaimana penulis membangun dan mengarahkan argumen', 'hanya arti kata', 'warna UI'], answer: 'bagaimana penulis membangun dan mengarahkan argumen' },
    ],
    writing: [
      { question: 'Policy memo HSK 6 idealnya mencakup...', options: ['masalah, analisis, opsi, risiko, rekomendasi', 'sapaan saja', 'daftar angka'], answer: 'masalah, analisis, opsi, risiko, rekomendasi' },
      { question: '不能简单地用支持或反对来概括 menunjukkan...', options: ['nuansa masalah kompleks', 'kalimat pemula', 'harga murah'], answer: 'nuansa masalah kompleks' },
      { question: 'Critical review harus menilai...', options: ['asumsi, bukti, kelemahan, dan implikasi', 'hanya tulisan bagus', 'hanya pinyin'], answer: 'asumsi, bukti, kelemahan, dan implikasi' },
    ],
    vocabulary: [
      { question: '问责 berarti...', options: ['akuntabilitas/pertanggungjawaban', 'minuman', 'alamat'], answer: 'akuntabilitas/pertanggungjawaban' },
      { question: '权衡, 整合, 论证 adalah kata kerja untuk...', options: ['sintesis dan argumen akademik', 'makanan', 'transportasi dasar'], answer: 'sintesis dan argumen akademik' },
      { question: '未必 berarti...', options: ['belum tentu', 'pasti benar', 'kemarin'], answer: 'belum tentu' },
    ],
    pronunciation: [
      { question: 'Executive cadence berarti...', options: ['ritme bicara briefing yang jelas dan terstruktur', 'membaca secepat mungkin', 'menghapus tone'], answer: 'ritme bicara briefing yang jelas dan terstruktur' },
      { question: 'Soft disagreement membutuhkan...', options: ['intonasi terkendali dan tidak agresif', 'teriakan', 'tanpa jeda'], answer: 'intonasi terkendali dan tidak agresif' },
      { question: 'Idiom chunk seperti 权衡利弊 sebaiknya...', options: ['dibaca sebagai satu unit tetap', 'dipisah acak', 'dihilangkan'], answer: 'dibaca sebagai satu unit tetap' },
    ],
  };

  const proficiencyModelOutput: Record<MandarinSkillId, MandarinLesson['modelOutput']> = {
    grammar: {
      title: 'Model sintaksis HSK 6',
      hanzi: '与其说公众反对改革，不如说他们对改革过程中的透明度缺乏信任。归根结底，问题并非政策目标不合理，而是制度安排没有充分回应不同群体的现实处境。',
      pinyin: 'Yu qi shuo gong zhong fan dui gai ge, bu ru shuo ta men dui gai ge guo cheng zhong de tou ming du que fa xin ren. Gui gen jie di, wen ti bing fei zheng ce mu biao bu he li, er shi zhi du an pai mei you chong fen hui ying bu tong qun ti de xian shi chu jing.',
      meaning: 'Daripada mengatakan publik menolak reformasi, lebih tepat mengatakan mereka kurang percaya pada transparansi proses reformasi. Pada akhirnya, masalahnya bukan tujuan kebijakan tidak rasional, melainkan pengaturan institusional belum cukup merespons kondisi nyata berbagai kelompok.',
    },
    speaking: {
      title: 'Model briefing HSK 6',
      hanzi: '如果把这个问题放在更大的社会背景下来看，我们会发现，真正的矛盾不只是效率和成本之间的取舍，而是公众信任、制度执行和长期韧性之间的平衡。因此，我倾向于支持逐步推进，而不是一次性全面实施。',
      pinyin: 'Ru guo ba zhe ge wen ti fang zai geng da de she hui bei jing xia lai kan, wo men hui fa xian, zhen zheng de mao dun bu zhi shi xiao lu he cheng ben zhi jian de qu she, er shi gong zhong xin ren, zhi du zhi xing he chang qi ren xing zhi jian de ping heng. Yin ci, wo qing xiang yu zhi chi zhu bu tui jin, er bu shi yi ci xing quan mian shi shi.',
      meaning: 'Jika masalah ini ditempatkan dalam konteks sosial yang lebih luas, kontradiksi sebenarnya bukan hanya trade-off antara efisiensi dan biaya, melainkan keseimbangan antara kepercayaan publik, pelaksanaan institusi, dan resiliensi jangka panjang. Karena itu, saya cenderung mendukung implementasi bertahap, bukan pelaksanaan menyeluruh sekaligus.',
    },
    listening: {
      title: 'Model sintesis listening HSK 6',
      hanzi: '两位说话人表面上都支持创新，但他们的侧重点不同。第一位强调效率和竞争力，第二位则提醒我们关注风险由谁承担。综合来看，分歧并不在于是否创新，而在于创新应当如何被治理。',
      pinyin: 'Liang wei shuo hua ren biao mian shang dou zhi chi chuang xin, dan ta men de ce zhong dian bu tong. Di yi wei qiang diao xiao lu he jing zheng li, di er wei ze ti xing wo men guan zhu feng xian you shei cheng dan. Zong he lai kan, fen qi bing bu zai yu shi fou chuang xin, er zai yu chuang xin ying dang ru he bei zhi li.',
      meaning: 'Dua pembicara tampaknya sama-sama mendukung inovasi, tetapi fokus mereka berbeda. Yang pertama menekankan efisiensi dan daya saing, sedangkan yang kedua mengingatkan kita untuk memperhatikan siapa yang menanggung risiko. Secara sintesis, perbedaan bukan pada apakah perlu inovasi, tetapi bagaimana inovasi harus ditata kelola.',
    },
    reading: {
      title: 'Model critical reading HSK 6',
      hanzi: '这篇文章的核心并不是介绍某项政策，而是通过政策争议讨论公共信任的形成机制。作者先承认改革的必要性，再指出执行过程中的信息不对称，最后把问题提升到制度建设的层面。',
      pinyin: 'Zhe pian wen zhang de he xin bing bu shi jie shao mou xiang zheng ce, er shi tong guo zheng ce zheng yi tao lun gong gong xin ren de xing cheng ji zhi. Zuo zhe xian cheng ren gai ge de bi yao xing, zai zhi chu zhi xing guo cheng zhong de xin xi bu dui cheng, zui hou ba wen ti ti sheng dao zhi du jian she de ceng mian.',
      meaning: 'Inti artikel ini bukan memperkenalkan suatu kebijakan, melainkan membahas mekanisme terbentuknya kepercayaan publik melalui kontroversi kebijakan. Penulis pertama mengakui perlunya reformasi, lalu menunjukkan asimetri informasi dalam pelaksanaan, dan akhirnya mengangkat masalah ke level pembangunan institusi.',
    },
    writing: {
      title: 'Model esai HSK 6',
      hanzi: '一个成熟的公共决策不应只追求短期效率，还必须考虑公平、透明度和社会韧性。不可否认，快速行动有助于解决眼前问题；然而，如果决策过程缺乏沟通，政策本身即便方向正确，也可能难以获得公众支持。归根结底，治理能力体现在权衡利弊之后仍能建立信任。',
      pinyin: 'Yi ge cheng shu de gong gong jue ce bu ying zhi zhui qiu duan qi xiao lu, hai bi xu kao lv gong ping, tou ming du he she hui ren xing. Bu ke fou ren, kuai su xing dong you zhu yu jie jue yan qian wen ti; ran er, ru guo jue ce guo cheng que fa gou tong, zheng ce ben shen ji bian fang xiang zheng que, ye ke neng nan yi huo de gong zhong zhi chi. Gui gen jie di, zhi li neng li ti xian zai quan heng li bi zhi hou reng neng jian li xin ren.',
      meaning: 'Keputusan publik yang matang tidak seharusnya hanya mengejar efisiensi jangka pendek, tetapi juga mempertimbangkan keadilan, transparansi, dan resiliensi sosial. Tidak dapat disangkal, tindakan cepat membantu menyelesaikan masalah di depan mata; namun jika proses keputusan kurang komunikasi, kebijakan yang arahnya benar pun mungkin sulit mendapat dukungan publik. Pada akhirnya, kapasitas tata kelola terlihat dari kemampuan membangun kepercayaan setelah menimbang untung-rugi.',
    },
    vocabulary: {
      title: 'Model lexical synthesis HSK 6',
      hanzi: '治理需要透明度，改革需要问责，创新需要边界，发展需要韧性。高级表达的关键不是使用生僻词，而是精确地表达立场、前提、取舍和潜在影响。',
      pinyin: 'Zhi li xu yao tou ming du, gai ge xu yao wen ze, chuang xin xu yao bian jie, fa zhan xu yao ren xing. Gao ji biao da de guan jian bu shi shi yong sheng pi ci, er shi jing que de biao da li chang, qian ti, qu she he qian zai ying xiang.',
      meaning: 'Tata kelola membutuhkan transparansi, reformasi membutuhkan akuntabilitas, inovasi membutuhkan batas, dan pembangunan membutuhkan resiliensi. Kunci ekspresi tingkat tinggi bukan memakai kata langka, melainkan menyampaikan sikap, premis, trade-off, dan dampak potensial secara presisi.',
    },
    pronunciation: {
      title: 'Model prosodi HSK 6',
      hanzi: '不可否认 / 快速行动有助于解决眼前问题；然而 / 如果缺乏沟通 / 政策即便方向正确 / 也可能难以获得公众支持。',
      pinyin: 'Bu ke fou ren / kuai su xing dong you zhu yu jie jue yan qian wen ti; ran er / ru guo que fa gou tong / zheng ce ji bian fang xiang zheng que / ye ke neng nan yi huo de gong zhong zhi chi.',
      meaning: 'Gunakan jeda setelah 不可否认 dan 然而. Klausa 即便...也... dibaca dengan alur konsesi yang terkendali, lalu turunkan intonasi pada kesimpulan.',
    },
  };

  const proficiencyRubric: Record<MandarinSkillId, string[]> = {
    grammar: ['Menggunakan struktur HSK 6 untuk reframing, konsesi, koreksi asumsi, dan sintesis.', 'Kalimat panjang tetap koheren dengan referensi yang jelas.', 'Grammar mendukung nuansa, bukan sekadar kompleksitas.'],
    speaking: ['Menyampaikan briefing 3 menit dengan tesis, konteks, trade-off, dan rekomendasi.', 'Mengelola sanggahan dengan nada profesional.', 'Menggunakan idiom/frasa HSK 6 tanpa terdengar dipaksakan.'],
    listening: ['Menangkap premis tersembunyi, keberatan halus, dan hierarki argumen.', 'Menyintesis beberapa pembicara tanpa kehilangan posisi masing-masing.', 'Membedakan fakta, evaluasi, dan rekomendasi.'],
    reading: ['Menganalisis framing, strategi retorika, asumsi, dan implikasi.', 'Membandingkan dua teks atau dua posisi secara kritis.', 'Menulis ringkasan kritis dengan bahasa sendiri.'],
    writing: ['Esai 350-500 Hanzi punya tesis bernuansa, counterargument, sintesis, dan rekomendasi.', 'Register formal konsisten dan kohesi antarparagraf jelas.', 'Argumen menilai bukti, asumsi, risiko, dan dampak jangka panjang.'],
    vocabulary: ['Memilih kata sesuai register, kolokasi, dan presisi makna.', 'Membedakan sinonim tingkat tinggi seperti 质疑, 批判, 反思.', 'Menggunakan discourse markers untuk membangun alur argumen.'],
    pronunciation: ['Prosodi paragraf terdengar natural dan profesional.', 'Jeda retoris mengarahkan pendengar pada struktur argumen.', 'Nada tetap stabil dalam speech 3 menit.'],
  };
  const proficiencyOutputGuide: Record<MandarinSkillId, string> = {
    grammar: 'Analisis 6 kalimat kompleks: tandai struktur, fungsi retoris, premis, dan revisi agar kalimat tetap padat.',
    speaking: 'Sampaikan briefing 3 menit: konteks, tesis, dua posisi, trade-off, rekomendasi, dan jawaban untuk satu sanggahan.',
    listening: 'Dengarkan model TTS 3 kali, lalu tulis sintesis: posisi tiap pembicara, premis tersembunyi, keberatan halus, dan kesimpulan.',
    reading: 'Baca teks/argumen, lalu buat critical summary: framing, asumsi, bukti, celah logika, dan implikasi jangka panjang.',
    writing: 'Tulis esai 350-500 Hanzi dengan tesis bernuansa, counterargument, sintesis dua posisi, rekomendasi, dan penutup strategis.',
    vocabulary: 'Buat lexical dossier: 20 kata HSK 6, kolokasi, register, sinonim dekat, contoh kalimat, dan konteks yang tidak cocok.',
    pronunciation: 'Rekam 3 menit dengan prosodi profesional: jeda retoris, penekanan idiom, soft disagreement, dan intonasi kesimpulan.',
  };
  const postHskModelOutput: MandarinLesson['modelOutput'] = {
    title: postHskConfig.modelTitle,
    hanzi: `围绕“${topic}”，高阶学习者不能只复述材料，而要界定概念、比较论证路径，并提出具有解释力的综合判断。换句话说，关键不在于语言形式有多复杂，而在于论点是否清晰、证据是否可靠、推理是否经得起反驳。`,
    pinyin: `Wei rao "${topic}", gao jie xue xi zhe bu neng zhi fu shu cai liao, er yao jie ding gai nian, bi jiao lun zheng lu jing, bing ti chu ju you jie shi li de zong he pan duan. Huan ju hua shuo, guan jian bu zai yu yu yan xing shi you duo fu za, er zai yu lun dian shi fou qing xi, zheng ju shi fou ke kao, tui li shi fou jing de qi fan bo.`,
    meaning: `Untuk topik "${topic}", pelajar tingkat tinggi tidak cukup mengulang materi. Mereka harus mendefinisikan konsep, membandingkan jalur argumentasi, dan menyampaikan sintesis yang punya daya jelaskan. Kuncinya bukan seberapa kompleks bentuk bahasa, tetapi apakah argumen jelas, bukti dapat dipercaya, dan penalaran tahan terhadap sanggahan.`,
  };

  return {
    skillId,
    title: `${skillName} ${meta.code} - Lesson ${safeLesson}`,
    subtitle: topic,
    objective: `Menguasai Mandarin ${meta.name} (${meta.code}) bertema ${topic.toLowerCase()} dengan ${meta.complexity}, contoh TTS, latihan interaktif, dan tugas produksi mandiri.`,
    focus: [
      isBeginner ? 'Bangun fondasi HSK 1: pinyin, 4 tone, neutral tone, Hanzi dasar, dan kalimat pendek.' : isElementary ? 'Bangun fondasi HSK 2: kalimat harian, waktu, lokasi, alasan, pengalaman, dan dialog praktis.' : isIntermediate ? 'Bangun kemampuan HSK 3: opini, pengalaman, rencana, complement, 把/被 dasar, dan paragraf pendek.' : `Bangun fondasi ${meta.code}: ${meta.complexity}.`,
      `Gunakan tema "${topic}" untuk latihan Hanzi, pinyin, arti, dan produksi kalimat.`,
      isBeginner ? 'Latih urutan belajar pemula: dengarkan, tirukan tone, baca pinyin, kenali Hanzi, lalu ucapkan kalimat.' : isElementary ? 'Latih HSK 2 secara praktis: pahami pola, dengarkan contoh, jawab dialog, lalu tulis 5-8 kalimat.' : isIntermediate ? 'Latih HSK 3 secara terpadu: pahami pola, analisis contoh, jawab quiz, lalu produksi dialog/paragraf 100-160 Hanzi.' : 'Latih Mandarin secara terpadu: dengarkan contoh, tirukan nada, pahami pola, lalu produksi kalimat sendiri.',
      ...(isBeginner ? [beginnerPack.goal] : isElementary ? [elementaryPack.goal] : isIntermediate ? [intermediatePack.goal] : []),
      'Simpan progres lesson agar pengguna bisa kembali untuk review.',
    ],
    explanation: [
      isBeginner
        ? `Lesson HSK 1 ini fokus pada "${topic}". Pengguna mulai dari bunyi dan pinyin, lalu masuk ke Hanzi, arti, dan kalimat pendek yang bisa langsung dipakai.`
        : isElementary
        ? `Lesson HSK 2 ini fokus pada "${topic}". Pengguna mulai memakai Mandarin untuk kebutuhan harian: membuat janji, memberi alasan, bercerita singkat, dan memahami dialog praktis.`
        : isIntermediate
        ? `Lesson HSK 3 ini fokus pada "${topic}". Pengguna mulai menyusun Mandarin yang lebih mandiri: opini, pengalaman, rencana, solusi, dan ringkasan pendek.`
        : `Lesson ini menempatkan ${topic} sebagai fokus utama ${skillName.toLowerCase()} Mandarin. Materi dibuat untuk membantu pengguna melihat hubungan antara Hanzi, pinyin, nada, dan makna.`,
      isBeginner
        ? 'Di level Beginner, jangan mengejar banyak struktur sekaligus. Prioritaskan tone yang jelas, kata paling sering dipakai, dan pola kalimat yang bisa diulang.'
        : isElementary
        ? 'Di level Elementary, pengguna mulai menggabungkan dua klausa sederhana, memakai partikel 了/过, dan memperluas kalimat dengan waktu, tempat, alasan, atau frekuensi.'
        : isIntermediate
        ? 'Di level Intermediate, pengguna perlu menghubungkan ide dengan urutan, alasan, hasil, pengalaman, dan perbandingan. Fokusnya bukan hanya benar, tetapi cukup natural untuk percakapan harian.'
        : `Pada level ${meta.code}, pengguna tidak hanya menghafal kata. Mereka perlu memakai pola dalam konteks nyata: dialog, teks pendek, respons, atau paragraf sesuai skill.`,
      ...(isBeginner ? [`Target praktis lesson ini: ${beginnerPack.goal}`] : isElementary ? [`Target praktis lesson ini: ${elementaryPack.goal}`] : isIntermediate ? [`Target praktis lesson ini: ${intermediatePack.goal}`] : isUpperIntermediate ? [`Target praktis HSK 4 lesson ini: ${upperIntermediatePack.goal}`] : []),
      ...(isUpperIntermediate ? ['Output akhir harus menunjukkan posisi, alasan, contoh/data, dan kesimpulan dengan konektor HSK 4 yang tepat.'] : []),
      ...(isAdvanced ? [`Target praktis HSK 5 lesson ini: ${advancedPack.goal}`, 'Output akhir harus menunjukkan tesis, dua sisi argumen, bukti/contoh, sanggahan ringan, dan kesimpulan yang bernuansa.'] : []),
      ...(isProficiency ? [`Target praktis HSK 6 lesson ini: ${proficiencyPack.goal}`, 'Output akhir harus menunjukkan sintesis gagasan, premis tersembunyi, trade-off, implikasi jangka panjang, dan register profesional.'] : []),
      ...(isPostHsk ? [`Target praktis ${postHskConfig.code} lesson ini: ${postHskPack.goal}`, 'Output akhir harus menunjukkan kontribusi argumen, validitas bukti, ketepatan register akademik, dan kemampuan mempertahankan tesis dari sanggahan.'] : []),
      'Dengarkan contoh dengan tombol TTS, ulangi dengan suara sendiri, lalu cek apakah nada, ritme, dan urutan kata sudah stabil.',
    ],
    patterns: isBeginner ? beginnerPatterns[skillId] : isElementary ? elementaryPatterns[skillId] : isIntermediate ? intermediatePatterns[skillId] : isUpperIntermediate ? upperIntermediatePatterns[skillId] : isAdvanced ? advancedPatterns[skillId] : (isProficiency || isPostHsk) ? proficiencyPatterns[skillId] : skillPatterns[skillId],
    vocabulary: isBeginner ? [...beginnerPack.vocabulary, ...beginnerVocabulary].slice(0, 20) : isElementary ? [...elementaryPack.vocabulary, ...levelVocabulary.elementary, ...levelVocabulary.beginner.slice(0, 4)].slice(0, 20) : isIntermediate ? [...intermediatePack.vocabulary, ...levelVocabulary.intermediate, ...levelVocabulary.elementary.slice(0, 4)].slice(0, 20) : isUpperIntermediate ? [...upperIntermediatePack.vocabulary, ...levelVocabulary['upper-intermediate'], ...levelVocabulary.intermediate.slice(0, 4)].slice(0, 22) : isAdvanced ? [...advancedPack.vocabulary, ...levelVocabulary.advanced, ...levelVocabulary['upper-intermediate'].slice(0, 4)].slice(0, 24) : isProficiency ? [...proficiencyPack.vocabulary, ...levelVocabulary.proficiency, ...levelVocabulary.advanced.slice(0, 4)].slice(0, 26) : isPostHsk ? [...postHskPack.vocabulary, ...(levelVocabulary[level] ?? []), ...levelVocabulary.proficiency.slice(0, 4)].slice(0, 30) : [...(levelVocabulary[level] ?? levelVocabulary.beginner), ...levelVocabulary.beginner.slice(0, 4)],
    examples: isBeginner ? [...beginnerPack.examples, ...beginnerExamples[skillId]].slice(0, 6) : isElementary ? [...elementaryPack.examples, ...skillExamples[skillId]].slice(0, 6) : isIntermediate ? [...intermediatePack.examples, ...skillExamples[skillId]].slice(0, 6) : isUpperIntermediate ? [...upperIntermediatePack.examples, ...skillExamples[skillId]].slice(0, 7) : isAdvanced ? [...advancedPack.examples, ...skillExamples[skillId]].slice(0, 8) : isProficiency ? [...proficiencyPack.examples, ...skillExamples[skillId]].slice(0, 8) : isPostHsk ? [...postHskPack.examples, ...skillExamples[skillId]].slice(0, 9) : skillExamples[skillId],
    productionSteps: isBeginner ? ['Dengarkan TTS pelan', 'Tirukan tone per syllable', 'Baca Hanzi + pinyin', 'Buat 3 kalimat HSK 1'] : isElementary ? ['Dengarkan dialog TTS', 'Tandai pola HSK 2', 'Ganti subjek/waktu/tempat', 'Buat dialog atau paragraf pendek'] : isIntermediate ? ['Analisis pola HSK 3', 'Shadowing contoh TTS', 'Ganti konteks dan kosakata', 'Buat paragraf/dialog mandiri'] : isUpperIntermediate ? ['Analisis argumen HSK 4', 'Tandai konektor dan sikap', 'Shadowing TTS dengan chunking', 'Buat output argumentatif'] : isAdvanced ? ['Identifikasi tesis HSK 5', 'Analisis bukti dan sikap tersirat', 'Latih prosodi wacana panjang', 'Buat esai/presentasi formal'] : isProficiency ? ['Bongkar premis HSK 6', 'Sintesis beberapa posisi', 'Latih briefing 3 menit', 'Buat portfolio profesional'] : isPostHsk ? ['Definisikan konsep kunci', 'Uji validitas argumen', 'Sintesis lintas sumber', 'Presentasikan kontribusi sendiri'] : ['Dengarkan contoh TTS', 'Tandai Hanzi dan pinyin', 'Latih pola inti', 'Buat output mandiri'],
    practice: isBeginner ? [...beginnerPack.quiz, ...practiceBase, ...skillPractice[skillId]].slice(0, 12) : isElementary ? [...elementaryPack.quiz, ...elementarySkillPractice[skillId], ...practiceBase, ...skillPractice[skillId]].slice(0, 14) : isIntermediate ? [...intermediatePack.quiz, ...intermediateSkillPractice[skillId], ...practiceBase, ...skillPractice[skillId]].slice(0, 16) : isUpperIntermediate ? [...upperIntermediatePack.quiz, ...upperIntermediateSkillPractice[skillId], ...practiceBase, ...skillPractice[skillId]].slice(0, 18) : isAdvanced ? [...advancedPack.quiz, ...advancedSkillPractice[skillId], ...practiceBase, ...skillPractice[skillId]].slice(0, 20) : isProficiency ? [...proficiencyPack.quiz, ...proficiencySkillPractice[skillId], ...practiceBase, ...skillPractice[skillId]].slice(0, 20) : isPostHsk ? [...postHskPack.quiz, ...proficiencySkillPractice[skillId], ...practiceBase, ...skillPractice[skillId]].slice(0, 20) : [...practiceBase, ...skillPractice[skillId]],
    modelOutput: isUpperIntermediate ? upperIntermediateModelOutput[skillId] : isAdvanced ? advancedModelOutput[skillId] : isProficiency ? proficiencyModelOutput[skillId] : isPostHsk ? postHskModelOutput : undefined,
    rubric: isUpperIntermediate ? upperIntermediateRubric[skillId] : isAdvanced ? advancedRubric[skillId] : (isProficiency || isPostHsk) ? proficiencyRubric[skillId] : undefined,
    task: isBeginner
      ? `Buat output HSK 1 untuk topik ${topic.toLowerCase()}: ${beginnerPack.goal} Tulis 3-5 kalimat memakai Hanzi + pinyin + arti Indonesia, lalu rekam pembacaanmu selama 30-45 detik.`
      : isElementary
      ? `Buat output HSK 2 untuk topik ${topic.toLowerCase()}: ${elementaryPack.goal} Tulis dialog 6-8 baris atau paragraf 80-120 Hanzi pendek. Sertakan pinyin, arti Indonesia, dan rekaman TTS/shadowing 1 menit.`
      : isIntermediate
      ? `Buat output HSK 3 untuk topik ${topic.toLowerCase()}: ${intermediatePack.goal} ${intermediateOutputGuide[skillId]} Sertakan pinyin, arti Indonesia, minimal 8 kosakata HSK 3, dan rekaman shadowing 1-2 menit.`
      : isUpperIntermediate
      ? `Buat output HSK 4 untuk topik ${topic.toLowerCase()}: ${upperIntermediatePack.goal} ${upperIntermediateOutputGuide[skillId]} Sertakan pinyin, arti Indonesia, minimal 10 kosakata HSK 4, dan rekaman TTS/shadowing 2 menit.`
      : isAdvanced
      ? `Buat output HSK 5 untuk topik ${advancedTheme.title}: ${advancedPack.goal} Susun esai 220-320 Hanzi atau presentasi 2-3 menit dengan tesis, dua sisi argumen, contoh, sanggahan ringan, kesimpulan, pinyin, arti Indonesia, dan minimal 12 kosakata HSK 5.`
      : isProficiency
      ? `Buat output HSK 6 untuk topik ${proficiencyTheme.title}: ${proficiencyPack.goal} ${proficiencyOutputGuide[skillId]} Sertakan pinyin, arti Indonesia, minimal 15 kosakata HSK 6, dan refleksi singkat tentang register yang kamu pilih.`
      : isPostHsk
      ? `Buat output ${postHskConfig.code} untuk topik ${topic}: ${postHskPack.goal} Susun ${postHskConfig.taskScale} dengan definisi konsep, tesis orisinal, sintesis sumber, counterargument, implikasi, pinyin, arti Indonesia, dan minimal 18 kosakata akademik.`
      : `Buat output Mandarin untuk topik ${topic.toLowerCase()}: 8-12 kalimat atau rekaman 1-2 menit. Sertakan Hanzi, pinyin, arti Indonesia, dan minimal 5 kosakata dari lesson ini.`,
  };
}
