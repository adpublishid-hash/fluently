import { buildChoiceQuestion, hashSeed, seededRandom, shuffleQuestionOptions, type ChoiceQuestion } from '../../../utils/quiz';
import { getMandarinLevelThemeWords, getMandarinTheme } from './mandarinThemeBank';
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
    { hanzi: '学术语境', pinyin: 'xuéshù yǔjìng', meaning: 'konteks akademik' },
    { hanzi: '跨文本综合', pinyin: 'kuà wénběn zōnghé', meaning: 'sintesis lintas teks' },
    { hanzi: '理论视角', pinyin: 'lǐlùn shìjiǎo', meaning: 'perspektif teori' },
    { hanzi: '论证有效性', pinyin: 'lùnzhèng yǒuxiàoxìng', meaning: 'validitas argumen' },
    { hanzi: '概念界定', pinyin: 'gàiniàn jièdìng', meaning: 'definisi konsep' },
    { hanzi: '反例', pinyin: 'fǎnlì', meaning: 'counterexample' },
    { hanzi: '语域', pinyin: 'yǔyù', meaning: 'register bahasa' },
    { hanzi: '推理链', pinyin: 'tuīlǐ liàn', meaning: 'rantai penalaran' },
  ],
  'hsk-8': [
    { hanzi: '研究范式', pinyin: 'yánjiū fànshì', meaning: 'paradigma riset' },
    { hanzi: '政策含义', pinyin: 'zhèngcè hányì', meaning: 'implikasi kebijakan' },
    { hanzi: '方法论', pinyin: 'fāngfǎlùn', meaning: 'metodologi' },
    { hanzi: '实证依据', pinyin: 'shízhèng yījù', meaning: 'bukti empiris' },
    { hanzi: '规范性判断', pinyin: 'guīfànxìng pànduàn', meaning: 'penilaian normatif' },
    { hanzi: '可推广性', pinyin: 'kětuīguǎngxìng', meaning: 'generalisabilitas' },
    { hanzi: '批判框架', pinyin: 'pīpàn kuàngjià', meaning: 'kerangka kritik' },
    { hanzi: '知识生产', pinyin: 'zhīshi shēngchǎn', meaning: 'produksi pengetahuan' },
  ],
  'hsk-9': [
    { hanzi: '原创性论点', pinyin: 'yuánchuàngxìng lùndiǎn', meaning: 'argumen orisinal' },
    { hanzi: '跨学科综合', pinyin: 'kuà xuékē zōnghé', meaning: 'sintesis multidisipliner' },
    { hanzi: '修辞控制', pinyin: 'xiūcí kòngzhì', meaning: 'kontrol retorika' },
    { hanzi: '概念重构', pinyin: 'gàiniàn zhònggòu', meaning: 'rekonstruksi konsep' },
    { hanzi: '话语分析', pinyin: 'huàyǔ fēnxī', meaning: 'analisis wacana' },
    { hanzi: '学术贡献', pinyin: 'xuéshù gòngxiàn', meaning: 'kontribusi akademik' },
    { hanzi: '元分析', pinyin: 'yuán fēnxī', meaning: 'meta-analisis' },
    { hanzi: '范式转换', pinyin: 'fànshì zhuǎnhuàn', meaning: 'pergeseran paradigma' },
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
    { hanzi: '你好', pinyin: 'nǐhǎo', meaning: 'halo' },
    { hanzi: '谢谢', pinyin: 'xièxiè', meaning: 'terima kasih' },
    { hanzi: '我', pinyin: 'wǒ', meaning: 'saya' },
    { hanzi: '你', pinyin: 'nǐ', meaning: 'kamu' },
    { hanzi: '是', pinyin: 'shì', meaning: 'adalah' },
    { hanzi: '不', pinyin: 'bù', meaning: 'tidak' },
    { hanzi: '吗', pinyin: 'ma', meaning: 'partikel tanya' },
    { hanzi: '中国', pinyin: 'zhōngguó', meaning: 'China' },
  ],
  elementary: [
    { hanzi: '今天', pinyin: 'jīntiān', meaning: 'hari ini' },
    { hanzi: '明天', pinyin: 'míngtiān', meaning: 'besok' },
    { hanzi: '喜欢', pinyin: 'xǐhuan', meaning: 'suka' },
    { hanzi: '觉得', pinyin: 'juéde', meaning: 'merasa/berpendapat' },
    { hanzi: '因为', pinyin: 'yīnwèi', meaning: 'karena' },
    { hanzi: '所以', pinyin: 'suǒyǐ', meaning: 'jadi' },
    { hanzi: '可以', pinyin: 'kěyǐ', meaning: 'boleh/bisa' },
    { hanzi: '一起', pinyin: 'yìqǐ', meaning: 'bersama' },
  ],
  intermediate: [
    { hanzi: '虽然', pinyin: 'suīrán', meaning: 'walaupun' },
    { hanzi: '但是', pinyin: 'dànshì', meaning: 'tetapi' },
    { hanzi: '如果', pinyin: 'rúguǒ', meaning: 'jika' },
    { hanzi: '就', pinyin: 'jiù', meaning: 'maka/lalu' },
    { hanzi: '比较', pinyin: 'bǐjiào', meaning: 'lebih/agak' },
    { hanzi: '需要', pinyin: 'xūyào', meaning: 'membutuhkan' },
    { hanzi: '机会', pinyin: 'jīhuì', meaning: 'kesempatan' },
    { hanzi: '经验', pinyin: 'jīngyàn', meaning: 'pengalaman' },
  ],
  'upper-intermediate': [
    { hanzi: '观点', pinyin: 'guāndiǎn', meaning: 'sudut pandang' },
    { hanzi: '影响', pinyin: 'yǐngxiǎng', meaning: 'pengaruh' },
    { hanzi: '发展', pinyin: 'fāzhǎn', meaning: 'berkembang' },
    { hanzi: '环境', pinyin: 'huánjìng', meaning: 'lingkungan' },
    { hanzi: '选择', pinyin: 'xuǎnzé', meaning: 'pilihan' },
    { hanzi: '原因', pinyin: 'yuányīn', meaning: 'alasan' },
    { hanzi: '结果', pinyin: 'jiéguǒ', meaning: 'hasil' },
    { hanzi: '建议', pinyin: 'jiànyì', meaning: 'saran' },
  ],
  advanced: [
    { hanzi: '社会现象', pinyin: 'shèhuì xiànxiàng', meaning: 'fenomena sosial' },
    { hanzi: '价值观', pinyin: 'jiàzhíguān', meaning: 'nilai/pandangan hidup' },
    { hanzi: '效率', pinyin: 'xiàolǜ', meaning: 'efisiensi' },
    { hanzi: '趋势', pinyin: 'qūshì', meaning: 'tren' },
    { hanzi: '挑战', pinyin: 'tiǎozhàn', meaning: 'tantangan' },
    { hanzi: '优势', pinyin: 'yōushì', meaning: 'keunggulan' },
    { hanzi: '限制', pinyin: 'xiànzhì', meaning: 'batasan' },
    { hanzi: '综合', pinyin: 'zōnghé', meaning: 'menyintesis' },
  ],
  proficiency: [
    { hanzi: '不可否认', pinyin: 'bùkě fǒurèn', meaning: 'tidak dapat disangkal' },
    { hanzi: '从某种程度上说', pinyin: 'cóng mǒuzhǒng chéngdù shàngshuō', meaning: 'dalam tingkat tertentu' },
    { hanzi: '权衡利弊', pinyin: 'quánhéng lìbì', meaning: 'menimbang pro dan kontra' },
    { hanzi: '潜在影响', pinyin: 'qiánzài yǐngxiǎng', meaning: 'dampak potensial' },
    { hanzi: '长远来看', pinyin: 'chángyuǎn láikàn', meaning: 'dalam jangka panjang' },
    { hanzi: '核心问题', pinyin: 'héxīn wèntí', meaning: 'masalah inti' },
    { hanzi: '提出论点', pinyin: 'tíchū lùndiǎn', meaning: 'mengajukan argumen' },
    { hanzi: '深入分析', pinyin: 'shēnrù fēnxī', meaning: 'menganalisis mendalam' },
  ],
};

const skillPatterns: Record<MandarinSkillId, MandarinLesson['patterns']> = {
  grammar: [
    { label: 'Basic statement', hanzi: '主语 + 时间 + 地点 + 动词 + 宾语', pinyin: 'zhǔ yǔ + shí jiān + dì diǎn + dòng cí + bīn yǔ', meaning: 'Urutan umum: subjek, waktu, tempat, kata kerja, objek.' },
    { label: 'Question', hanzi: '你喜欢学中文吗？', pinyin: 'Nǐ xǐ huan xué zhōng wén ma?', meaning: 'Apakah kamu suka belajar Mandarin?' },
  ],
  speaking: [
    { label: 'Opening', hanzi: '我想谈一谈...', pinyin: 'Wǒ xiǎng tán yi tán...', meaning: 'Saya ingin membahas...' },
    { label: 'Response', hanzi: '我同意，不过...', pinyin: 'Wǒ tóng yì, bú guò...', meaning: 'Saya setuju, tetapi...' },
  ],
  listening: [
    { label: 'Audio cue', hanzi: '请注意关键词。', pinyin: 'Qǐng zhù yì guān jiàn cí.', meaning: 'Perhatikan kata kunci.' },
    { label: 'Summary', hanzi: '他说的重点是...', pinyin: 'Tā shuō de zhòng diǎn shì...', meaning: 'Poin utama yang dia katakan adalah...' },
  ],
  reading: [
    { label: 'Main idea', hanzi: '这段话主要说明...', pinyin: 'Zhè duàn huà zhǔ yào shuō míng...', meaning: 'Paragraf ini terutama menjelaskan...' },
    { label: 'Detail', hanzi: '根据文章，...', pinyin: 'Gēn jù wén zhāng,...', meaning: 'Berdasarkan teks,...' },
  ],
  writing: [
    { label: 'Paragraph', hanzi: '首先... 其次... 最后...', pinyin: 'Shǒu xiān... qí cì... zuì hòu...', meaning: 'Pertama..., berikutnya..., terakhir...' },
    { label: 'Opinion', hanzi: '我认为... 因为...', pinyin: 'Wǒ rèn wéi... yīn wèi...', meaning: 'Saya berpendapat... karena...' },
  ],
  vocabulary: [
    { label: 'Definition', hanzi: '这个词的意思是...', pinyin: 'Zhè ge cí de yì sī shì...', meaning: 'Arti kata ini adalah...' },
    { label: 'Collocation', hanzi: '常用搭配是...', pinyin: 'Cháng yòng dā pèi shì...', meaning: 'Kolokasi yang sering dipakai adalah...' },
  ],
  pronunciation: [
    { label: 'Tone pair', hanzi: '先听声调，再跟读。', pinyin: 'Xiān tīng shēng diào, zài gēn dú.', meaning: 'Dengarkan nada dulu, lalu tirukan.' },
    { label: 'Shadowing', hanzi: '慢读一遍，正常速度读一遍。', pinyin: 'Màn dú yí biàn, zhèng cháng sù dù dú yí biàn.', meaning: 'Baca pelan sekali, lalu baca dengan kecepatan normal.' },
  ],
};

const skillExamples: Record<MandarinSkillId, MandarinLesson['examples']> = {
  grammar: [
    { hanzi: '我今天在家学习中文。', pinyin: 'Wǒ jīn tiān zài jiā xué xí zhōng wén.', meaning: 'Hari ini saya belajar Mandarin di rumah.' },
    { hanzi: '如果你有时间，我们就一起练习。', pinyin: 'Rú guǒ nǐ yǒu shí jiān, wǒ men jiù yì qǐ liàn xí.', meaning: 'Jika kamu punya waktu, kita berlatih bersama.' },
  ],
  speaking: [
    { hanzi: '你好，我叫卡丽娜。我想练习中文。', pinyin: 'Nǐ hǎo, wǒ jiào kǎ lì nà. wǒ xiǎng liàn xí zhōng wén.', meaning: 'Halo, nama saya Karina. Saya ingin berlatih Mandarin.' },
    { hanzi: '我觉得这个方法很有用。', pinyin: 'Wǒ jué de zhè ge fāng fǎ hěn yǒu yòng.', meaning: 'Saya merasa metode ini sangat berguna.' },
  ],
  listening: [
    { hanzi: '请听问题，然后选择正确答案。', pinyin: 'Qǐng tīng wèn tí, rán hòu xuǎn zé zhèng què dá àn.', meaning: 'Dengarkan pertanyaan, lalu pilih jawaban yang benar.' },
    { hanzi: '他说他明天上午九点有课。', pinyin: 'Tā shuō tā míng tiān shàng wǔ jiǔ diǎn yǒu kè.', meaning: 'Dia bilang besok jam 9 pagi ada kelas.' },
  ],
  reading: [
    { hanzi: '小王每天坐地铁去学校。', pinyin: 'Xiǎo wáng měi tiān zuò dì tiě qù xué xiào.', meaning: 'Xiao Wang naik MRT ke sekolah setiap hari.' },
    { hanzi: '这篇文章介绍了学习语言的方法。', pinyin: 'Zhè piān wén zhāng jiè shào le xué xí yǔ yán de fāng fǎ.', meaning: 'Artikel ini memperkenalkan metode belajar bahasa.' },
  ],
  writing: [
    { hanzi: '我每天晚上复习生词。', pinyin: 'Wǒ měi tiān wǎn shàng fù xí shēng cí.', meaning: 'Saya mengulang kosakata baru setiap malam.' },
    { hanzi: '我认为学习中文需要坚持和练习。', pinyin: 'Wǒ rèn wéi xué xí zhōng wén xū yào jiān chí hé liàn xí.', meaning: 'Menurut saya belajar Mandarin membutuhkan konsistensi dan latihan.' },
  ],
  vocabulary: [
    { hanzi: '学习', pinyin: 'xuéxí', meaning: 'belajar' },
    { hanzi: '练习', pinyin: 'liànxí', meaning: 'berlatih' },
  ],
  pronunciation: [
    { hanzi: '妈妈 骂马 吗', pinyin: 'mā ma mà mǎ ma', meaning: 'Latihan kontras nada ma.' },
    { hanzi: '你好，很高兴认识你。', pinyin: 'Nǐ hǎo, hěn gāo xìng rèn shi nǐ.', meaning: 'Halo, senang mengenalmu.' },
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
      { hanzi: '你好', pinyin: 'nǐhǎo', meaning: 'halo' },
      { hanzi: '再见', pinyin: 'zàijiàn', meaning: 'sampai jumpa' },
      { hanzi: '谢谢', pinyin: 'xièxiè', meaning: 'terima kasih' },
      { hanzi: '不客气', pinyin: 'búkèqì', meaning: 'sama-sama' },
      { hanzi: '请', pinyin: 'qǐng', meaning: 'silakan/tolong' },
      { hanzi: '对不起', pinyin: 'duìbùqǐ', meaning: 'maaf' },
    ],
    examples: [
      { hanzi: '你好！', pinyin: 'Nǐ hǎo!', meaning: 'Halo!' },
      { hanzi: '谢谢你。', pinyin: 'Xiè xiè nǐ.', meaning: 'Terima kasih.' },
      { hanzi: '再见！', pinyin: 'Zài jiàn!', meaning: 'Sampai jumpa!' },
    ],
    quiz: [
      { question: '你好 berarti...', options: ['halo', 'sampai jumpa', 'maaf'], answer: 'halo' },
      { question: '再见 dipakai saat...', options: ['berpisah', 'memesan teh', 'menyebut angka'], answer: 'berpisah' },
    ],
  },
  {
    goal: 'Perkenalkan nama dengan 我叫... dan tanyakan nama orang lain.',
    vocabulary: [
      { hanzi: '我', pinyin: 'wǒ', meaning: 'saya' },
      { hanzi: '你', pinyin: 'nǐ', meaning: 'kamu' },
      { hanzi: '叫', pinyin: 'jiào', meaning: 'bernama/dipanggil' },
      { hanzi: '名字', pinyin: 'míngzì', meaning: 'nama' },
      { hanzi: '什么', pinyin: 'shénme', meaning: 'apa' },
      { hanzi: '呢', pinyin: 'ne', meaning: 'bagaimana dengan...' },
    ],
    examples: [
      { hanzi: '我叫安娜。', pinyin: 'Wǒ jiào ān nà.', meaning: 'Nama saya Anna.' },
      { hanzi: '你叫什么名字？', pinyin: 'Nǐ jiào shén me míng zì?', meaning: 'Siapa namamu?' },
      { hanzi: '我叫安娜，你呢？', pinyin: 'Wǒ jiào ān nà, nǐ ne?', meaning: 'Nama saya Anna, kamu?' },
    ],
    quiz: [
      { question: '我叫安娜 berarti...', options: ['Nama saya Anna', 'Saya suka Anna', 'Anna di rumah'], answer: 'Nama saya Anna' },
      { question: '什么 berarti...', options: ['apa', 'siapa', 'berapa'], answer: 'apa' },
    ],
  },
  {
    goal: 'Tanyakan nama orang dengan 谁 dan bedakan 我 / 你 / 他 / 她.',
    vocabulary: [
      { hanzi: '他', pinyin: 'tā', meaning: 'dia laki-laki' },
      { hanzi: '她', pinyin: 'tā', meaning: 'dia perempuan' },
      { hanzi: '谁', pinyin: 'shuí', meaning: 'siapa' },
      { hanzi: '朋友', pinyin: 'péngyǒu', meaning: 'teman' },
      { hanzi: '同学', pinyin: 'tóngxué', meaning: 'teman sekelas' },
      { hanzi: '老师', pinyin: 'lǎoshī', meaning: 'guru' },
    ],
    examples: [
      { hanzi: '他是谁？', pinyin: 'Tā shì shuí?', meaning: 'Dia siapa?' },
      { hanzi: '她是我的朋友。', pinyin: 'Tā shì wǒ de péng yǒu.', meaning: 'Dia teman saya.' },
      { hanzi: '你是老师吗？', pinyin: 'Nǐ shì lǎo shī ma?', meaning: 'Apakah kamu guru?' },
    ],
    quiz: [
      { question: '谁 berarti...', options: ['siapa', 'apa', 'di mana'], answer: 'siapa' },
      { question: '朋友 berarti...', options: ['teman', 'guru', 'siswa'], answer: 'teman' },
    ],
  },
  {
    goal: 'Sebutkan negara dan kebangsaan dengan 是...人.',
    vocabulary: [
      { hanzi: '中国', pinyin: 'zhōngguó', meaning: 'China' },
      { hanzi: '印尼', pinyin: 'yìnní', meaning: 'Indonesia' },
      { hanzi: '美国', pinyin: 'měiguó', meaning: 'Amerika Serikat' },
      { hanzi: '英国', pinyin: 'yīngguó', meaning: 'Inggris' },
      { hanzi: '人', pinyin: 'rén', meaning: 'orang' },
      { hanzi: '中文', pinyin: 'zhōngwén', meaning: 'bahasa Mandarin' },
    ],
    examples: [
      { hanzi: '我是印尼人。', pinyin: 'Wǒ shì yìn ní rén.', meaning: 'Saya orang Indonesia.' },
      { hanzi: '他是中国人。', pinyin: 'Tā shì zhōng guó rén.', meaning: 'Dia orang China.' },
      { hanzi: '我学中文。', pinyin: 'Wǒ xué zhōng wén.', meaning: 'Saya belajar Mandarin.' },
    ],
    quiz: [
      { question: '印尼人 berarti...', options: ['orang Indonesia', 'bahasa Indonesia', 'orang China'], answer: 'orang Indonesia' },
      { question: '中文 berarti...', options: ['bahasa Mandarin', 'China', 'orang China'], answer: 'bahasa Mandarin' },
    ],
  },
  {
    goal: 'Gunakan anggota keluarga dasar dalam kalimat pendek.',
    vocabulary: [
      { hanzi: '家', pinyin: 'jiā', meaning: 'keluarga/rumah' },
      { hanzi: '爸爸', pinyin: 'bàba', meaning: 'ayah' },
      { hanzi: '妈妈', pinyin: 'māma', meaning: 'ibu' },
      { hanzi: '哥哥', pinyin: 'gēge', meaning: 'kakak laki-laki' },
      { hanzi: '姐姐', pinyin: 'jiějie', meaning: 'kakak perempuan' },
      { hanzi: '妹妹', pinyin: 'mèimei', meaning: 'adik perempuan' },
    ],
    examples: [
      { hanzi: '这是我妈妈。', pinyin: 'Zhè shì wǒ mā ma.', meaning: 'Ini ibu saya.' },
      { hanzi: '我家有四个人。', pinyin: 'Wǒ jiā yǒu sì gè rén.', meaning: 'Keluarga saya ada empat orang.' },
      { hanzi: '他是我哥哥。', pinyin: 'Tā shì wǒ gē ge.', meaning: 'Dia kakak laki-laki saya.' },
    ],
    quiz: [
      { question: '妈妈 berarti...', options: ['ibu', 'ayah', 'adik'], answer: 'ibu' },
      { question: '我家有四个人 berarti...', options: ['Keluarga saya ada empat orang', 'Rumah saya besar', 'Saya punya empat buku'], answer: 'Keluarga saya ada empat orang' },
    ],
  },
  {
    goal: 'Dengar dan ucapkan angka 0-10 untuk nomor telepon sederhana.',
    vocabulary: [
      { hanzi: '零', pinyin: 'líng', meaning: 'nol' },
      { hanzi: '一', pinyin: 'yī', meaning: 'satu' },
      { hanzi: '二', pinyin: 'èr', meaning: 'dua' },
      { hanzi: '三', pinyin: 'sān', meaning: 'tiga' },
      { hanzi: '四', pinyin: 'sì', meaning: 'empat' },
      { hanzi: '五', pinyin: 'wǔ', meaning: 'lima' },
      { hanzi: '电话', pinyin: 'diànhuà', meaning: 'telepon' },
    ],
    examples: [
      { hanzi: '我的电话是一二三四五。', pinyin: 'Wǒ de diàn huà shì yī èr sān sì wǔ.', meaning: 'Nomor telepon saya 12345.' },
      { hanzi: '这是我的电话。', pinyin: 'Zhè shì wǒ de diàn huà.', meaning: 'Ini nomor telepon saya.' },
      { hanzi: '一，二，三，四，五。', pinyin: 'Yī, èr, sān, sì, wǔ.', meaning: 'Satu, dua, tiga, empat, lima.' },
    ],
    quiz: [
      { question: '电话 berarti...', options: ['telepon', 'teh', 'kelas'], answer: 'telepon' },
      { question: '三 berarti angka...', options: ['3', '4', '5'], answer: '3' },
    ],
  },
  {
    goal: 'Tanyakan harga paling dasar dengan 多少钱.',
    vocabulary: [
      { hanzi: '钱', pinyin: 'qián', meaning: 'uang' },
      { hanzi: '多少', pinyin: 'duōshǎo', meaning: 'berapa' },
      { hanzi: '块', pinyin: 'kuài', meaning: 'yuan/kuai' },
      { hanzi: '买', pinyin: 'mǎi', meaning: 'membeli' },
      { hanzi: '这个', pinyin: 'zhège', meaning: 'ini' },
      { hanzi: '那个', pinyin: 'nàge', meaning: 'itu' },
    ],
    examples: [
      { hanzi: '这个多少钱？', pinyin: 'Zhè ge duō shǎo qián?', meaning: 'Ini berapa harganya?' },
      { hanzi: '这个五块。', pinyin: 'Zhè ge wǔ kuài.', meaning: 'Ini lima yuan.' },
      { hanzi: '我买这个。', pinyin: 'Wǒ mǎi zhè ge.', meaning: 'Saya membeli yang ini.' },
    ],
    quiz: [
      { question: '多少钱 berarti...', options: ['berapa harganya', 'di mana', 'siapa namamu'], answer: 'berapa harganya' },
      { question: '买 berarti...', options: ['membeli', 'minum', 'belajar'], answer: 'membeli' },
    ],
  },
  {
    goal: 'Pesan minuman sederhana dengan 我要...',
    vocabulary: [
      { hanzi: '茶', pinyin: 'chá', meaning: 'teh' },
      { hanzi: '水', pinyin: 'shuǐ', meaning: 'air' },
      { hanzi: '咖啡', pinyin: 'kāfēi', meaning: 'kopi' },
      { hanzi: '喝', pinyin: 'hē', meaning: 'minum' },
      { hanzi: '要', pinyin: 'yào', meaning: 'mau/ingin' },
      { hanzi: '杯', pinyin: 'bēi', meaning: 'gelas/cup' },
    ],
    examples: [
      { hanzi: '我要一杯茶。', pinyin: 'Wǒ yào yì bēi chá.', meaning: 'Saya mau segelas teh.' },
      { hanzi: '你喝咖啡吗？', pinyin: 'Nǐ hē kā fēi ma?', meaning: 'Apakah kamu minum kopi?' },
      { hanzi: '我不喝咖啡。', pinyin: 'Wǒ bù hē kā fēi.', meaning: 'Saya tidak minum kopi.' },
    ],
    quiz: [
      { question: '我要一杯茶 berarti...', options: ['Saya mau segelas teh', 'Saya suka guru', 'Saya di sekolah'], answer: 'Saya mau segelas teh' },
      { question: '喝 berarti...', options: ['minum', 'membeli', 'menulis'], answer: 'minum' },
    ],
  },
  {
    goal: 'Nyatakan suka dan tidak suka dengan 喜欢 / 不喜欢.',
    vocabulary: [
      { hanzi: '喜欢', pinyin: 'xǐhuan', meaning: 'suka' },
      { hanzi: '吃', pinyin: 'chī', meaning: 'makan' },
      { hanzi: '米饭', pinyin: 'mǐfàn', meaning: 'nasi' },
      { hanzi: '水果', pinyin: 'shuǐguǒ', meaning: 'buah' },
      { hanzi: '苹果', pinyin: 'píngguǒ', meaning: 'apel' },
      { hanzi: '也', pinyin: 'yě', meaning: 'juga' },
    ],
    examples: [
      { hanzi: '我喜欢吃米饭。', pinyin: 'Wǒ xǐ huan chī mǐ fàn.', meaning: 'Saya suka makan nasi.' },
      { hanzi: '她喜欢苹果。', pinyin: 'Tā xǐ huan píng guǒ.', meaning: 'Dia suka apel.' },
      { hanzi: '我也喜欢。', pinyin: 'Wǒ yě xǐ huan.', meaning: 'Saya juga suka.' },
    ],
    quiz: [
      { question: '喜欢 berarti...', options: ['suka', 'tidak', 'berapa'], answer: 'suka' },
      { question: '也 berarti...', options: ['juga', 'maaf', 'di sana'], answer: 'juga' },
    ],
  },
  {
    goal: 'Gunakan 今天 untuk membicarakan aktivitas hari ini.',
    vocabulary: [
      { hanzi: '今天', pinyin: 'jīntiān', meaning: 'hari ini' },
      { hanzi: '明天', pinyin: 'míngtiān', meaning: 'besok' },
      { hanzi: '昨天', pinyin: 'zuótiān', meaning: 'kemarin' },
      { hanzi: '学习', pinyin: 'xuéxí', meaning: 'belajar' },
      { hanzi: '工作', pinyin: 'gōngzuò', meaning: 'bekerja' },
      { hanzi: '很', pinyin: 'hěn', meaning: 'sangat/agak' },
    ],
    examples: [
      { hanzi: '我今天学习中文。', pinyin: 'Wǒ jīn tiān xué xí zhōng wén.', meaning: 'Hari ini saya belajar Mandarin.' },
      { hanzi: '你今天工作吗？', pinyin: 'Nǐ jīn tiān gōng zuò ma?', meaning: 'Apakah kamu bekerja hari ini?' },
      { hanzi: '今天很好。', pinyin: 'Jīn tiān hěn hǎo.', meaning: 'Hari ini baik.' },
    ],
    quiz: [
      { question: '今天 berarti...', options: ['hari ini', 'besok', 'kemarin'], answer: 'hari ini' },
      { question: '学习 berarti...', options: ['belajar', 'membeli', 'minum'], answer: 'belajar' },
    ],
  },
  {
    goal: 'Tanyakan dan jawab waktu sederhana dengan 几点.',
    vocabulary: [
      { hanzi: '现在', pinyin: 'xiànzài', meaning: 'sekarang' },
      { hanzi: '几点', pinyin: 'jǐdiǎn', meaning: 'jam berapa' },
      { hanzi: '点', pinyin: 'diǎn', meaning: 'jam' },
      { hanzi: '上午', pinyin: 'shàngwǔ', meaning: 'pagi' },
      { hanzi: '下午', pinyin: 'xiàwǔ', meaning: 'sore/siang setelah tengah hari' },
      { hanzi: '晚上', pinyin: 'wǎnshàng', meaning: 'malam' },
    ],
    examples: [
      { hanzi: '现在几点？', pinyin: 'Xiàn zài jǐ diǎn?', meaning: 'Sekarang jam berapa?' },
      { hanzi: '现在三点。', pinyin: 'Xiàn zài sān diǎn.', meaning: 'Sekarang jam tiga.' },
      { hanzi: '我晚上学习。', pinyin: 'Wǒ wǎn shàng xué xí.', meaning: 'Saya belajar malam hari.' },
    ],
    quiz: [
      { question: '现在几点 berarti...', options: ['Sekarang jam berapa?', 'Siapa namamu?', 'Ini berapa harganya?'], answer: 'Sekarang jam berapa?' },
      { question: '晚上 berarti...', options: ['malam', 'pagi', 'uang'], answer: 'malam' },
    ],
  },
  {
    goal: 'Sebutkan lokasi diri dengan 在.',
    vocabulary: [
      { hanzi: '在', pinyin: 'zài', meaning: 'di/berada di' },
      { hanzi: '家', pinyin: 'jiā', meaning: 'rumah' },
      { hanzi: '学校', pinyin: 'xuéxiào', meaning: 'sekolah' },
      { hanzi: '公司', pinyin: 'gōngsī', meaning: 'perusahaan/kantor' },
      { hanzi: '商店', pinyin: 'shāngdiàn', meaning: 'toko' },
      { hanzi: '哪里', pinyin: 'nǎlǐ', meaning: 'di mana' },
    ],
    examples: [
      { hanzi: '我在家。', pinyin: 'Wǒ zài jiā.', meaning: 'Saya di rumah.' },
      { hanzi: '你在哪里？', pinyin: 'Nǐ zài nǎ lǐ?', meaning: 'Kamu di mana?' },
      { hanzi: '她在学校。', pinyin: 'Tā zài xué xiào.', meaning: 'Dia di sekolah.' },
    ],
    quiz: [
      { question: '在哪里 berarti...', options: ['di mana', 'berapa', 'apa'], answer: 'di mana' },
      { question: '学校 berarti...', options: ['sekolah', 'rumah', 'toko'], answer: 'sekolah' },
    ],
  },
  {
    goal: 'Tanyakan benda dengan 什么 dan jawab memakai 这是...',
    vocabulary: [
      { hanzi: '这', pinyin: 'zhè', meaning: 'ini' },
      { hanzi: '那', pinyin: 'nà', meaning: 'itu' },
      { hanzi: '书', pinyin: 'shū', meaning: 'buku' },
      { hanzi: '笔', pinyin: 'bǐ', meaning: 'pena' },
      { hanzi: '手机', pinyin: 'shǒujī', meaning: 'ponsel' },
      { hanzi: '电脑', pinyin: 'diànnǎo', meaning: 'komputer' },
    ],
    examples: [
      { hanzi: '这是什么？', pinyin: 'Zhè shì shén me?', meaning: 'Ini apa?' },
      { hanzi: '这是书。', pinyin: 'Zhè shì shū.', meaning: 'Ini buku.' },
      { hanzi: '那是我的手机。', pinyin: 'Nà shì wǒ de shǒu jī.', meaning: 'Itu ponsel saya.' },
    ],
    quiz: [
      { question: '书 berarti...', options: ['buku', 'pena', 'ponsel'], answer: 'buku' },
      { question: '这是什么 berarti...', options: ['Ini apa?', 'Kamu siapa?', 'Di mana buku?'], answer: 'Ini apa?' },
    ],
  },
  {
    goal: 'Gunakan 想 untuk menyatakan keinginan sederhana.',
    vocabulary: [
      { hanzi: '想', pinyin: 'xiǎng', meaning: 'ingin' },
      { hanzi: '去', pinyin: 'qù', meaning: 'pergi' },
      { hanzi: '看', pinyin: 'kàn', meaning: 'melihat/menonton' },
      { hanzi: '电影', pinyin: 'diànyǐng', meaning: 'film' },
      { hanzi: '北京', pinyin: 'běijīng', meaning: 'Beijing' },
      { hanzi: '一起', pinyin: 'yìqǐ', meaning: 'bersama' },
    ],
    examples: [
      { hanzi: '我想去北京。', pinyin: 'Wǒ xiǎng qù běi jīng.', meaning: 'Saya ingin pergi ke Beijing.' },
      { hanzi: '你想看电影吗？', pinyin: 'Nǐ xiǎng kàn diàn yǐng ma?', meaning: 'Apakah kamu ingin menonton film?' },
      { hanzi: '我们一起去。', pinyin: 'Wǒ men yì qǐ qù.', meaning: 'Kita pergi bersama.' },
    ],
    quiz: [
      { question: '想 berarti...', options: ['ingin', 'membeli', 'sangat'], answer: 'ingin' },
      { question: '一起 berarti...', options: ['bersama', 'kemarin', 'siapa'], answer: 'bersama' },
    ],
  },
  {
    goal: 'Gunakan frasa kelas dasar untuk meminta guru mengulang.',
    vocabulary: [
      { hanzi: '请说', pinyin: 'qǐngshuō', meaning: 'tolong katakan' },
      { hanzi: '再', pinyin: 'zài', meaning: 'lagi' },
      { hanzi: '一遍', pinyin: 'yíbiàn', meaning: 'sekali/one time' },
      { hanzi: '听', pinyin: 'tīng', meaning: 'mendengar' },
      { hanzi: '读', pinyin: 'dú', meaning: 'membaca' },
      { hanzi: '写', pinyin: 'xiě', meaning: 'menulis' },
    ],
    examples: [
      { hanzi: '请再说一遍。', pinyin: 'Qǐng zài shuō yí biàn.', meaning: 'Tolong katakan sekali lagi.' },
      { hanzi: '请听。', pinyin: 'Qǐng tīng.', meaning: 'Silakan dengarkan.' },
      { hanzi: '请读这个。', pinyin: 'Qǐng dú zhè ge.', meaning: 'Silakan baca ini.' },
    ],
    quiz: [
      { question: '请再说一遍 berarti...', options: ['Tolong katakan sekali lagi', 'Tolong beli ini', 'Saya di rumah'], answer: 'Tolong katakan sekali lagi' },
      { question: '写 berarti...', options: ['menulis', 'mendengar', 'minum'], answer: 'menulis' },
    ],
  },
  {
    goal: 'Minta maaf dan berterima kasih dalam situasi harian.',
    vocabulary: [
      { hanzi: '没关系', pinyin: 'méiguānxì', meaning: 'tidak apa-apa' },
      { hanzi: '不好意思', pinyin: 'bùhǎoyìsi', meaning: 'maaf/permisi' },
      { hanzi: '谢谢', pinyin: 'xièxiè', meaning: 'terima kasih' },
      { hanzi: '不用谢', pinyin: 'búyòng xiè', meaning: 'tidak perlu berterima kasih' },
      { hanzi: '可以', pinyin: 'kěyǐ', meaning: 'boleh/bisa' },
      { hanzi: '请问', pinyin: 'qǐngwèn', meaning: 'permisi, boleh tanya' },
    ],
    examples: [
      { hanzi: '对不起。', pinyin: 'Duì bù qǐ.', meaning: 'Maaf.' },
      { hanzi: '没关系。', pinyin: 'Méi guān xì.', meaning: 'Tidak apa-apa.' },
      { hanzi: '请问，可以吗？', pinyin: 'Qǐng wèn, kě yǐ ma?', meaning: 'Permisi, boleh?' },
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
      { hanzi: '好', pinyin: 'hǎo', meaning: 'baik' },
      { hanzi: '忙', pinyin: 'máng', meaning: 'sibuk' },
      { hanzi: '累', pinyin: 'lèi', meaning: 'lelah' },
      { hanzi: '热', pinyin: 'rè', meaning: 'panas' },
      { hanzi: '冷', pinyin: 'lěng', meaning: 'dingin' },
    ],
    examples: [
      { hanzi: '你忙吗？', pinyin: 'Nǐ máng ma?', meaning: 'Apakah kamu sibuk?' },
      { hanzi: '你累吗？', pinyin: 'Nǐ lèi ma?', meaning: 'Apakah kamu lelah?' },
      { hanzi: '今天热吗？', pinyin: 'Jīn tiān rè ma?', meaning: 'Apakah hari ini panas?' },
    ],
    quiz: [
      { question: 'Kalimat tanya yes/no paling sederhana memakai...', options: ['吗', 'ma', '个'], answer: '吗' },
      { question: '忙 berarti...', options: ['sibuk', 'dingin', 'baik'], answer: 'sibuk' },
    ],
  },
  {
    goal: 'Buat self-introduction pendek 4 kalimat.',
    vocabulary: [
      { hanzi: '名字', pinyin: 'míngzì', meaning: 'nama' },
      { hanzi: '岁', pinyin: 'suì', meaning: 'umur/tahun usia' },
      { hanzi: '学习', pinyin: 'xuéxí', meaning: 'belajar' },
      { hanzi: '中文', pinyin: 'zhōngwén', meaning: 'bahasa Mandarin' },
      { hanzi: '喜欢', pinyin: 'xǐhuan', meaning: 'suka' },
      { hanzi: '朋友', pinyin: 'péngyǒu', meaning: 'teman' },
    ],
    examples: [
      { hanzi: '你好，我叫安娜。', pinyin: 'Nǐ hǎo, wǒ jiào ān nà.', meaning: 'Halo, nama saya Anna.' },
      { hanzi: '我是印尼人。', pinyin: 'Wǒ shì yìn ní rén.', meaning: 'Saya orang Indonesia.' },
      { hanzi: '我学习中文。', pinyin: 'Wǒ xué xí zhōng wén.', meaning: 'Saya belajar Mandarin.' },
      { hanzi: '我喜欢中文。', pinyin: 'Wǒ xǐ huan zhōng wén.', meaning: 'Saya suka bahasa Mandarin.' },
    ],
    quiz: [
      { question: 'Self-introduction HSK 1 sebaiknya memuat...', options: ['nama, asal, belajar, suka', 'teori abstrak', 'paragraf jurnal'], answer: 'nama, asal, belajar, suka' },
      { question: '岁 dipakai untuk...', options: ['umur', 'harga', 'lokasi'], answer: 'umur' },
    ],
  },
  {
    goal: 'Bangun mini dialog 4 giliran dengan sapaan, nama, dan pertanyaan.',
    vocabulary: [
      { hanzi: '认识', pinyin: 'rènshi', meaning: 'mengenal' },
      { hanzi: '高兴', pinyin: 'gāoxìng', meaning: 'senang' },
      { hanzi: '也', pinyin: 'yě', meaning: 'juga' },
      { hanzi: '我们', pinyin: 'wǒmen', meaning: 'kami/kita' },
      { hanzi: '说', pinyin: 'shuō', meaning: 'berbicara/mengatakan' },
      { hanzi: '汉语', pinyin: 'hànyǔ', meaning: 'bahasa Mandarin' },
    ],
    examples: [
      { hanzi: '很高兴认识你。', pinyin: 'Hěn gāo xìng rèn shi nǐ.', meaning: 'Senang mengenalmu.' },
      { hanzi: '我也很高兴。', pinyin: 'Wǒ yě hěn gāo xìng.', meaning: 'Saya juga senang.' },
      { hanzi: '我们说汉语。', pinyin: 'Wǒ men shuō hàn yǔ.', meaning: 'Kita berbicara Mandarin.' },
    ],
    quiz: [
      { question: '很高兴认识你 berarti...', options: ['Senang mengenalmu', 'Saya membeli teh', 'Kamu di mana'], answer: 'Senang mengenalmu' },
      { question: '我们 berarti...', options: ['kami/kita', 'dia', 'itu'], answer: 'kami/kita' },
    ],
  },
  {
    goal: 'Review HSK 1: gabungkan salam, identitas, angka, suka, dan lokasi.',
    vocabulary: [
      { hanzi: '复习', pinyin: 'fùxí', meaning: 'review/mengulang' },
      { hanzi: '生词', pinyin: 'shēngcí', meaning: 'kosakata baru' },
      { hanzi: '句子', pinyin: 'jùzi', meaning: 'kalimat' },
      { hanzi: '声调', pinyin: 'shēngdiào', meaning: 'tone/nada' },
      { hanzi: '汉字', pinyin: 'hànzì', meaning: 'karakter Hanzi' },
      { hanzi: '拼音', pinyin: 'pīnyīn', meaning: 'pinyin' },
    ],
    examples: [
      { hanzi: '我复习生词。', pinyin: 'Wǒ fù xí shēng cí.', meaning: 'Saya mengulang kosakata baru.' },
      { hanzi: '请读这个句子。', pinyin: 'Qǐng dú zhè ge jù zi.', meaning: 'Silakan baca kalimat ini.' },
      { hanzi: '我会读拼音。', pinyin: 'Wǒ huì dú pīn yīn.', meaning: 'Saya bisa membaca pinyin.' },
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
      { hanzi: '反映', pinyin: 'fǎnyìng', meaning: 'menyampaikan/menanggapi masalah' },
      { hanzi: '改善', pinyin: 'gǎishàn', meaning: 'memperbaiki/meningkatkan' },
      { hanzi: '服务', pinyin: 'fúwù', meaning: 'layanan' },
      { hanzi: '负责', pinyin: 'fùzé', meaning: 'bertanggung jawab' },
      { hanzi: '态度', pinyin: 'tàidù', meaning: 'sikap' },
      { hanzi: '及时', pinyin: 'jíshí', meaning: 'tepat waktu/segera' },
    ],
    examples: [
      { hanzi: '我想反映一下这个服务的问题。', pinyin: 'Wǒ xiǎng fǎn yìng yí xià zhè ge fú wù de wèn tí.', meaning: 'Saya ingin menyampaikan masalah tentang layanan ini.' },
      { hanzi: '如果能及时改善，用户的满意度会提高。', pinyin: 'Rú guǒ néng jí shí gǎi shàn, yòng hù de mǎn yì dù huì tí gāo.', meaning: 'Jika bisa segera diperbaiki, kepuasan pengguna akan meningkat.' },
      { hanzi: '工作人员的态度既专业又友好。', pinyin: 'Gōng zuò rén yuán de tài dù jì zhuān yè yòu yǒu hǎo.', meaning: 'Sikap staf profesional sekaligus ramah.' },
    ],
    quiz: [
      { question: '反映问题 berarti...', options: ['menyampaikan masalah', 'membandingkan harga', 'melatih nada'], answer: 'menyampaikan masalah' },
      { question: '改善 berarti...', options: ['memperbaiki/meningkatkan', 'menghapus', 'menolak'], answer: 'memperbaiki/meningkatkan' },
    ],
  },
  {
    goal: 'Buat presentasi ringkas HSK 4 dengan pembuka, argumen, data, contoh, dan kesimpulan.',
    vocabulary: [
      { hanzi: '演讲', pinyin: 'yǎnjiǎng', meaning: 'presentasi/pidato' },
      { hanzi: '主题', pinyin: 'zhǔtí', meaning: 'tema' },
      { hanzi: '首先', pinyin: 'shǒuxiān', meaning: 'pertama-tama' },
      { hanzi: '其次', pinyin: 'qícì', meaning: 'selanjutnya' },
      { hanzi: '总之', pinyin: 'zǒngzhī', meaning: 'singkatnya/kesimpulannya' },
      { hanzi: '例子', pinyin: 'lìzǐ', meaning: 'contoh' },
    ],
    examples: [
      { hanzi: '今天我演讲的主题是如何提高学习效率。', pinyin: 'Jīn tiān wǒ yǎn jiǎng de zhǔ tí shì rú hé tí gāo xué xí xiào lǜ.', meaning: 'Tema presentasi saya hari ini adalah cara meningkatkan efisiensi belajar.' },
      { hanzi: '首先，我们需要明确目标；其次，要坚持复习。', pinyin: 'Shǒu xiān, wǒ men xū yào míng què mù biāo; qí cì, yào jiān chí fù xí.', meaning: 'Pertama, kita perlu memperjelas target; selanjutnya, harus konsisten review.' },
      { hanzi: '总之，好的方法比长时间学习更重要。', pinyin: 'Zǒng zhī, hǎo de fāng fǎ bǐ cháng shí jiān xué xí gèng zhòng yào.', meaning: 'Kesimpulannya, metode yang baik lebih penting daripada belajar lama.' },
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
      { hanzi: '早上', pinyin: 'zǎoshàng', meaning: 'pagi' },
      { hanzi: '起床', pinyin: 'qǐchuáng', meaning: 'bangun tidur' },
      { hanzi: '早饭', pinyin: 'zǎofàn', meaning: 'sarapan' },
      { hanzi: '上课', pinyin: 'shàngkè', meaning: 'masuk kelas' },
      { hanzi: '学校', pinyin: 'xuéxiào', meaning: 'sekolah' },
      { hanzi: '每天', pinyin: 'měitiān', meaning: 'setiap hari' },
    ],
    examples: [
      { hanzi: '我每天早上七点起床。', pinyin: 'Wǒ měi tiān zǎo shàng qī diǎn qǐ chuáng.', meaning: 'Saya bangun jam tujuh setiap pagi.' },
      { hanzi: '我吃早饭以后去学校。', pinyin: 'Wǒ chī zǎo fàn yǐ hòu qù xué xiào.', meaning: 'Setelah sarapan saya pergi ke sekolah.' },
      { hanzi: '我八点上课。', pinyin: 'Wǒ bā diǎn shàng kè.', meaning: 'Saya masuk kelas jam delapan.' },
    ],
    quiz: [
      { question: '起床 berarti...', options: ['bangun tidur', 'makan malam', 'naik bus'], answer: 'bangun tidur' },
      { question: '每天 berarti...', options: ['setiap hari', 'kemarin', 'di sana'], answer: 'setiap hari' },
    ],
  },
  {
    goal: 'Buat janji sederhana memakai 今天, 明天, 现在, dan 有空.',
    vocabulary: [
      { hanzi: '有空', pinyin: 'yǒukōng', meaning: 'punya waktu luang' },
      { hanzi: '见面', pinyin: 'jiànmiàn', meaning: 'bertemu' },
      { hanzi: '现在', pinyin: 'xiànzài', meaning: 'sekarang' },
      { hanzi: '明天', pinyin: 'míngtiān', meaning: 'besok' },
      { hanzi: '下午', pinyin: 'xiàwǔ', meaning: 'sore/siang setelah tengah hari' },
      { hanzi: '可以', pinyin: 'kěyǐ', meaning: 'boleh/bisa' },
    ],
    examples: [
      { hanzi: '你明天下午有空吗？', pinyin: 'Nǐ míng tiān xià wǔ yǒu kōng ma?', meaning: 'Apakah kamu punya waktu besok sore?' },
      { hanzi: '我们可以三点见面。', pinyin: 'Wǒ men kě yǐ sān diǎn jiàn miàn.', meaning: 'Kita bisa bertemu jam tiga.' },
      { hanzi: '现在不可以，明天可以。', pinyin: 'Xiàn zài bù kě yǐ, míng tiān kě yǐ.', meaning: 'Sekarang tidak bisa, besok bisa.' },
    ],
    quiz: [
      { question: '有空 berarti...', options: ['punya waktu luang', 'sangat mahal', 'belum makan'], answer: 'punya waktu luang' },
      { question: '见面 berarti...', options: ['bertemu', 'menulis', 'mendengar'], answer: 'bertemu' },
    ],
  },
  {
    goal: 'Deskripsikan keluarga lebih lengkap memakai 也, 都, dan 有.',
    vocabulary: [
      { hanzi: '家人', pinyin: 'jiārén', meaning: 'anggota keluarga' },
      { hanzi: '弟弟', pinyin: 'dìdi', meaning: 'adik laki-laki' },
      { hanzi: '妹妹', pinyin: 'mèimei', meaning: 'adik perempuan' },
      { hanzi: '都', pinyin: 'dōu', meaning: 'semua' },
      { hanzi: '也', pinyin: 'yě', meaning: 'juga' },
      { hanzi: '工作', pinyin: 'gōngzuò', meaning: 'bekerja/pekerjaan' },
    ],
    examples: [
      { hanzi: '我家有五个人。', pinyin: 'Wǒ jiā yǒu wǔ gè rén.', meaning: 'Keluarga saya ada lima orang.' },
      { hanzi: '爸爸妈妈都工作。', pinyin: 'Bà ba mā ma dōu gōng zuò.', meaning: 'Ayah dan ibu sama-sama bekerja.' },
      { hanzi: '我妹妹也学习中文。', pinyin: 'Wǒ mèi mei yě xué xí zhōng wén.', meaning: 'Adik perempuan saya juga belajar Mandarin.' },
    ],
    quiz: [
      { question: '都 berarti...', options: ['semua', 'juga', 'tidak'], answer: 'semua' },
      { question: '也 berarti...', options: ['juga', 'berapa', 'sekarang'], answer: 'juga' },
    ],
  },
  {
    goal: 'Pesan makanan di restoran memakai 要, 一点儿, dan 服务员.',
    vocabulary: [
      { hanzi: '饭馆', pinyin: 'fànguǎn', meaning: 'restoran' },
      { hanzi: '服务员', pinyin: 'fúwù yuán', meaning: 'pelayan' },
      { hanzi: '菜单', pinyin: 'càidān', meaning: 'menu' },
      { hanzi: '一点儿', pinyin: 'yìdiǎn ér', meaning: 'sedikit' },
      { hanzi: '米饭', pinyin: 'mǐfàn', meaning: 'nasi' },
      { hanzi: '菜', pinyin: 'cài', meaning: 'masakan/sayur' },
    ],
    examples: [
      { hanzi: '服务员，请给我菜单。', pinyin: 'Fú wù yuán, qǐng gěi wǒ cài dān.', meaning: 'Pelayan, tolong beri saya menu.' },
      { hanzi: '我要米饭和一点儿菜。', pinyin: 'Wǒ yào mǐ fàn hé yì diǎn ér cài.', meaning: 'Saya mau nasi dan sedikit lauk/sayur.' },
      { hanzi: '这个菜很好吃。', pinyin: 'Zhè ge cài hěn hǎo chī.', meaning: 'Masakan ini enak.' },
    ],
    quiz: [
      { question: '菜单 berarti...', options: ['menu', 'uang', 'sekolah'], answer: 'menu' },
      { question: '一点儿 berarti...', options: ['sedikit', 'semua', 'besok'], answer: 'sedikit' },
    ],
  },
  {
    goal: 'Belanja dan negosiasi ringan memakai 太...了 dan 便宜.',
    vocabulary: [
      { hanzi: '买', pinyin: 'mǎi', meaning: 'membeli' },
      { hanzi: '卖', pinyin: 'mài', meaning: 'menjual' },
      { hanzi: '贵', pinyin: 'guì', meaning: 'mahal' },
      { hanzi: '便宜', pinyin: 'piányi', meaning: 'murah' },
      { hanzi: '太', pinyin: 'tài', meaning: 'terlalu' },
      { hanzi: '了', pinyin: 'liǎo', meaning: 'partikel perubahan/penekanan' },
    ],
    examples: [
      { hanzi: '这个太贵了。', pinyin: 'Zhè ge tài guì le.', meaning: 'Ini terlalu mahal.' },
      { hanzi: '有没有便宜一点儿的？', pinyin: 'Yǒu méi yǒu pián yi yì diǎn ér de?', meaning: 'Ada yang sedikit lebih murah?' },
      { hanzi: '我想买这个。', pinyin: 'Wǒ xiǎng mǎi zhè ge.', meaning: 'Saya ingin membeli ini.' },
    ],
    quiz: [
      { question: '太贵了 berarti...', options: ['terlalu mahal', 'sangat jauh', 'tidak enak'], answer: 'terlalu mahal' },
      { question: '便宜 berarti...', options: ['murah', 'mahal', 'sibuk'], answer: 'murah' },
    ],
  },
  {
    goal: 'Gunakan 因为...所以... untuk memberi alasan sederhana.',
    vocabulary: [
      { hanzi: '因为', pinyin: 'yīnwèi', meaning: 'karena' },
      { hanzi: '所以', pinyin: 'suǒyǐ', meaning: 'jadi/maka' },
      { hanzi: '忙', pinyin: 'máng', meaning: 'sibuk' },
      { hanzi: '累', pinyin: 'lèi', meaning: 'lelah' },
      { hanzi: '休息', pinyin: 'xiūxi', meaning: 'beristirahat' },
      { hanzi: '今天', pinyin: 'jīntiān', meaning: 'hari ini' },
    ],
    examples: [
      { hanzi: '因为我很忙，所以我不能去。', pinyin: 'Yīn wèi wǒ hěn máng, suǒ yǐ wǒ bù néng qù.', meaning: 'Karena saya sibuk, jadi saya tidak bisa pergi.' },
      { hanzi: '因为她很累，所以她想休息。', pinyin: 'Yīn wèi tā hěn lèi, suǒ yǐ tā xiǎng xiū xi.', meaning: 'Karena dia lelah, jadi dia ingin istirahat.' },
      { hanzi: '今天我不忙。', pinyin: 'Jīn tiān wǒ bù máng.', meaning: 'Hari ini saya tidak sibuk.' },
    ],
    quiz: [
      { question: '因为 berarti...', options: ['karena', 'tetapi', 'di mana'], answer: 'karena' },
      { question: '所以 berarti...', options: ['jadi/maka', 'kemarin', 'buku'], answer: 'jadi/maka' },
    ],
  },
  {
    goal: 'Ceritakan aktivitas yang sudah terjadi memakai 了.',
    vocabulary: [
      { hanzi: '了', pinyin: 'liǎo', meaning: 'partikel selesai/perubahan' },
      { hanzi: '吃饭', pinyin: 'chīfàn', meaning: 'makan' },
      { hanzi: '看电影', pinyin: 'kàn diànyǐng', meaning: 'menonton film' },
      { hanzi: '昨天', pinyin: 'zuótiān', meaning: 'kemarin' },
      { hanzi: '回家', pinyin: 'huíjiā', meaning: 'pulang ke rumah' },
      { hanzi: '以后', pinyin: 'yǐhòu', meaning: 'setelah' },
    ],
    examples: [
      { hanzi: '我昨天看电影了。', pinyin: 'Wǒ zuó tiān kàn diàn yǐng le.', meaning: 'Kemarin saya sudah menonton film.' },
      { hanzi: '他吃饭以后回家了。', pinyin: 'Tā chī fàn yǐ hòu huí jiā le.', meaning: 'Setelah makan, dia pulang.' },
      { hanzi: '我学了两个小时中文。', pinyin: 'Wǒ xué le liǎng gè xiǎo shí zhōng wén.', meaning: 'Saya belajar Mandarin selama dua jam.' },
    ],
    quiz: [
      { question: '了 bisa menandai...', options: ['aksi selesai/perubahan', 'harga saja', 'nama negara'], answer: 'aksi selesai/perubahan' },
      { question: '昨天 berarti...', options: ['kemarin', 'hari ini', 'besok'], answer: 'kemarin' },
    ],
  },
  {
    goal: 'Gunakan 过 untuk pengalaman sederhana.',
    vocabulary: [
      { hanzi: '过', pinyin: 'guò', meaning: 'pernah' },
      { hanzi: '去过', pinyin: 'qùguò', meaning: 'pernah pergi' },
      { hanzi: '吃过', pinyin: 'chīguò', meaning: 'pernah makan/sudah makan' },
      { hanzi: '中国菜', pinyin: 'zhōngguó cài', meaning: 'masakan China' },
      { hanzi: '北京', pinyin: 'běijīng', meaning: 'Beijing' },
      { hanzi: '没有', pinyin: 'méiyǒu', meaning: 'tidak punya/belum' },
    ],
    examples: [
      { hanzi: '你去过北京吗？', pinyin: 'Nǐ qù guò běi jīng ma?', meaning: 'Apakah kamu pernah pergi ke Beijing?' },
      { hanzi: '我没去过中国。', pinyin: 'Wǒ méi qù guò zhōng guó.', meaning: 'Saya belum pernah pergi ke China.' },
      { hanzi: '我吃过中国菜。', pinyin: 'Wǒ chī guò zhōng guó cài.', meaning: 'Saya pernah makan masakan China.' },
    ],
    quiz: [
      { question: '过 sering dipakai untuk...', options: ['pengalaman pernah', 'harga barang', 'jam sekarang'], answer: 'pengalaman pernah' },
      { question: '没去过 berarti...', options: ['belum pernah pergi', 'sedang pergi', 'ingin pergi'], answer: 'belum pernah pergi' },
    ],
  },
  {
    goal: 'Tanyakan arah dan lokasi memakai 在哪儿 dan 怎么走.',
    vocabulary: [
      { hanzi: '哪儿', pinyin: 'nǎ\'ér', meaning: 'di mana' },
      { hanzi: '怎么走', pinyin: 'zěnme zǒu', meaning: 'bagaimana jalannya' },
      { hanzi: '左边', pinyin: 'zuǒbiān', meaning: 'sebelah kiri' },
      { hanzi: '右边', pinyin: 'yòubiān', meaning: 'sebelah kanan' },
      { hanzi: '前面', pinyin: 'qiánmiàn', meaning: 'depan' },
      { hanzi: '后面', pinyin: 'hòumiàn', meaning: 'belakang' },
    ],
    examples: [
      { hanzi: '学校在哪儿？', pinyin: 'Xué xiào zài nǎ ér?', meaning: 'Sekolah di mana?' },
      { hanzi: '商店在左边。', pinyin: 'Shāng diàn zài zuǒ biān.', meaning: 'Toko ada di sebelah kiri.' },
      { hanzi: '去医院怎么走？', pinyin: 'Qù yī yuàn zěn me zǒu?', meaning: 'Bagaimana jalan ke rumah sakit?' },
    ],
    quiz: [
      { question: '左边 berarti...', options: ['sebelah kiri', 'sebelah kanan', 'belakang'], answer: 'sebelah kiri' },
      { question: '怎么走 dipakai untuk...', options: ['menanyakan arah', 'menanyakan umur', 'membeli makanan'], answer: 'menanyakan arah' },
    ],
  },
  {
    goal: 'Bicarakan transportasi dasar memakai 坐, 开, dan 到.',
    vocabulary: [
      { hanzi: '坐', pinyin: 'zuò', meaning: 'naik/duduk' },
      { hanzi: '车', pinyin: 'chē', meaning: 'kendaraan/mobil' },
      { hanzi: '公共汽车', pinyin: 'gōnggòng qìchē', meaning: 'bus' },
      { hanzi: '出租车', pinyin: 'chūzū chē', meaning: 'taksi' },
      { hanzi: '到', pinyin: 'dào', meaning: 'sampai/ke' },
      { hanzi: '分钟', pinyin: 'fēnzhōng', meaning: 'menit' },
    ],
    examples: [
      { hanzi: '我坐公共汽车去学校。', pinyin: 'Wǒ zuò gōng gòng qì chē qù xué xiào.', meaning: 'Saya naik bus ke sekolah.' },
      { hanzi: '到公司要二十分钟。', pinyin: 'Dào gōng sī yào èr shí fēn zhōng.', meaning: 'Ke kantor butuh 20 menit.' },
      { hanzi: '我们坐出租车吧。', pinyin: 'Wǒ men zuò chū zū chē ba.', meaning: 'Ayo kita naik taksi.' },
    ],
    quiz: [
      { question: '公共汽车 berarti...', options: ['bus', 'taksi', 'sepeda'], answer: 'bus' },
      { question: '分钟 berarti...', options: ['menit', 'jam', 'hari'], answer: 'menit' },
    ],
  },
  {
    goal: 'Deskripsikan cuaca dan rencana sederhana.',
    vocabulary: [
      { hanzi: '天气', pinyin: 'tiānqì', meaning: 'cuaca' },
      { hanzi: '下雨', pinyin: 'xiàyǔ', meaning: 'hujan' },
      { hanzi: '冷', pinyin: 'lěng', meaning: 'dingin' },
      { hanzi: '热', pinyin: 'rè', meaning: 'panas' },
      { hanzi: '出去', pinyin: 'chūqù', meaning: 'keluar' },
      { hanzi: '运动', pinyin: 'yùndòng', meaning: 'olahraga' },
    ],
    examples: [
      { hanzi: '今天天气很好。', pinyin: 'Jīn tiān tiān qì hěn hǎo.', meaning: 'Cuaca hari ini bagus.' },
      { hanzi: '明天会下雨吗？', pinyin: 'Míng tiān huì xià yǔ ma?', meaning: 'Apakah besok akan hujan?' },
      { hanzi: '天气太热了，我不想出去。', pinyin: 'Tiān qì tài rè le, wǒ bù xiǎng chū qù.', meaning: 'Cuaca terlalu panas, saya tidak ingin keluar.' },
    ],
    quiz: [
      { question: '天气 berarti...', options: ['cuaca', 'makanan', 'sekolah'], answer: 'cuaca' },
      { question: '下雨 berarti...', options: ['hujan', 'panas', 'olahraga'], answer: 'hujan' },
    ],
  },
  {
    goal: 'Ceritakan hobi dan frekuensi sederhana.',
    vocabulary: [
      { hanzi: '爱好', pinyin: 'àihào', meaning: 'hobi' },
      { hanzi: '唱歌', pinyin: 'chànggē', meaning: 'menyanyi' },
      { hanzi: '跳舞', pinyin: 'tiàowǔ', meaning: 'menari' },
      { hanzi: '看书', pinyin: 'kànshū', meaning: 'membaca buku' },
      { hanzi: '常常', pinyin: 'chángcháng', meaning: 'sering' },
      { hanzi: '有时候', pinyin: 'yǒu shíhòu', meaning: 'kadang-kadang' },
    ],
    examples: [
      { hanzi: '我的爱好是看书。', pinyin: 'Wǒ de ài hào shì kàn shū.', meaning: 'Hobi saya membaca buku.' },
      { hanzi: '我常常听中文歌。', pinyin: 'Wǒ cháng cháng tīng zhōng wén gē.', meaning: 'Saya sering mendengar lagu Mandarin.' },
      { hanzi: '她有时候跳舞。', pinyin: 'Tā yǒu shí hòu tiào wǔ.', meaning: 'Dia kadang-kadang menari.' },
    ],
    quiz: [
      { question: '爱好 berarti...', options: ['hobi', 'cuaca', 'harga'], answer: 'hobi' },
      { question: '常常 berarti...', options: ['sering', 'belum', 'terlalu'], answer: 'sering' },
    ],
  },
  {
    goal: 'Deskripsikan kesehatan ringan dan kebutuhan.',
    vocabulary: [
      { hanzi: '身体', pinyin: 'shēntǐ', meaning: 'tubuh/kesehatan' },
      { hanzi: '生病', pinyin: 'shēngbìng', meaning: 'sakit' },
      { hanzi: '医院', pinyin: 'yīyuàn', meaning: 'rumah sakit' },
      { hanzi: '药', pinyin: 'yào', meaning: 'obat' },
      { hanzi: '需要', pinyin: 'xūyào', meaning: 'membutuhkan' },
      { hanzi: '休息', pinyin: 'xiūxi', meaning: 'istirahat' },
    ],
    examples: [
      { hanzi: '我今天身体不舒服。', pinyin: 'Wǒ jīn tiān shēn tǐ bù shū fú.', meaning: 'Hari ini badan saya tidak enak.' },
      { hanzi: '他生病了，需要休息。', pinyin: 'Tā shēng bìng le, xū yào xiū xi.', meaning: 'Dia sakit dan perlu istirahat.' },
      { hanzi: '我要去医院。', pinyin: 'Wǒ yào qù yī yuàn.', meaning: 'Saya mau pergi ke rumah sakit.' },
    ],
    quiz: [
      { question: '生病 berarti...', options: ['sakit', 'murah', 'bertemu'], answer: 'sakit' },
      { question: '需要 berarti...', options: ['membutuhkan', 'membeli', 'menyanyi'], answer: 'membutuhkan' },
    ],
  },
  {
    goal: 'Bandingkan dua benda/orang secara sederhana memakai 比.',
    vocabulary: [
      { hanzi: '比', pinyin: 'bǐ', meaning: 'dibandingkan dengan' },
      { hanzi: '高', pinyin: 'gāo', meaning: 'tinggi' },
      { hanzi: '矮', pinyin: 'ǎi', meaning: 'pendek' },
      { hanzi: '大', pinyin: 'dà', meaning: 'besar' },
      { hanzi: '小', pinyin: 'xiǎo', meaning: 'kecil' },
      { hanzi: '新', pinyin: 'xīn', meaning: 'baru' },
    ],
    examples: [
      { hanzi: '我哥哥比我高。', pinyin: 'Wǒ gē ge bǐ wǒ gāo.', meaning: 'Kakak laki-laki saya lebih tinggi dari saya.' },
      { hanzi: '这个手机比那个手机新。', pinyin: 'Zhè ge shǒu jī bǐ nà ge shǒu jī xīn.', meaning: 'Ponsel ini lebih baru daripada ponsel itu.' },
      { hanzi: '我的房间比你的房间大。', pinyin: 'Wǒ de fáng jiān bǐ nǐ de fáng jiān dà.', meaning: 'Kamar saya lebih besar daripada kamarmu.' },
    ],
    quiz: [
      { question: '比 dipakai untuk...', options: ['perbandingan', 'sapaan', 'lokasi'], answer: 'perbandingan' },
      { question: '高 berarti...', options: ['tinggi', 'kecil', 'baru'], answer: 'tinggi' },
    ],
  },
  {
    goal: 'Gunakan 得 untuk menggambarkan cara melakukan sesuatu.',
    vocabulary: [
      { hanzi: '得', pinyin: 'dé', meaning: 'partikel complement' },
      { hanzi: '说', pinyin: 'shuō', meaning: 'berbicara' },
      { hanzi: '写', pinyin: 'xiě', meaning: 'menulis' },
      { hanzi: '快', pinyin: 'kuài', meaning: 'cepat' },
      { hanzi: '慢', pinyin: 'màn', meaning: 'pelan' },
      { hanzi: '好', pinyin: 'hǎo', meaning: 'baik/bagus' },
    ],
    examples: [
      { hanzi: '他说中文说得很好。', pinyin: 'Tā shuō zhōng wén shuō dé hěn hǎo.', meaning: 'Dia berbicara Mandarin dengan sangat baik.' },
      { hanzi: '你写汉字写得很快。', pinyin: 'Nǐ xiě hàn zì xiě dé hěn kuài.', meaning: 'Kamu menulis Hanzi dengan cepat.' },
      { hanzi: '请说慢一点儿。', pinyin: 'Qǐng shuō màn yì diǎn ér.', meaning: 'Tolong bicara sedikit lebih pelan.' },
    ],
    quiz: [
      { question: '说得很好 berarti...', options: ['berbicara dengan baik', 'membeli dengan murah', 'pergi ke sekolah'], answer: 'berbicara dengan baik' },
      { question: '慢 berarti...', options: ['pelan', 'cepat', 'mahal'], answer: 'pelan' },
    ],
  },
  {
    goal: 'Gunakan 正在 untuk aktivitas yang sedang berlangsung.',
    vocabulary: [
      { hanzi: '正在', pinyin: 'zhèngzài', meaning: 'sedang' },
      { hanzi: '看电视', pinyin: 'kàn diànshì', meaning: 'menonton TV' },
      { hanzi: '听音乐', pinyin: 'tīng yīnyuè', meaning: 'mendengarkan musik' },
      { hanzi: '做饭', pinyin: 'zuòfàn', meaning: 'memasak' },
      { hanzi: '等', pinyin: 'děng', meaning: 'menunggu' },
      { hanzi: '朋友', pinyin: 'péngyǒu', meaning: 'teman' },
    ],
    examples: [
      { hanzi: '我正在看电视。', pinyin: 'Wǒ zhèng zài kàn diàn shì.', meaning: 'Saya sedang menonton TV.' },
      { hanzi: '妈妈正在做饭。', pinyin: 'Mā ma zhèng zài zuò fàn.', meaning: 'Ibu sedang memasak.' },
      { hanzi: '他正在等朋友。', pinyin: 'Tā zhèng zài děng péng yǒu.', meaning: 'Dia sedang menunggu teman.' },
    ],
    quiz: [
      { question: '正在 berarti...', options: ['sedang', 'sudah pernah', 'terlalu'], answer: 'sedang' },
      { question: '做饭 berarti...', options: ['memasak', 'menonton TV', 'menunggu'], answer: 'memasak' },
    ],
  },
  {
    goal: 'Tulis pesan pendek untuk janji bertemu.',
    vocabulary: [
      { hanzi: '短信', pinyin: 'duǎnxìn', meaning: 'SMS/pesan singkat' },
      { hanzi: '告诉', pinyin: 'gàosù', meaning: 'memberitahu' },
      { hanzi: '等一下', pinyin: 'děng yíxià', meaning: 'tunggu sebentar' },
      { hanzi: '晚一点', pinyin: 'wǎn yìdiǎn', meaning: 'sedikit lebih malam/telat' },
      { hanzi: '没问题', pinyin: 'méi wèntí', meaning: 'tidak masalah' },
      { hanzi: '到时候', pinyin: 'dào shíhòu', meaning: 'saat waktunya nanti' },
    ],
    examples: [
      { hanzi: '我会晚一点到。', pinyin: 'Wǒ huì wǎn yì diǎn dào.', meaning: 'Saya akan tiba sedikit terlambat.' },
      { hanzi: '没问题，我等你。', pinyin: 'Méi wèn tí, wǒ děng nǐ.', meaning: 'Tidak masalah, saya menunggumu.' },
      { hanzi: '到时候我告诉你。', pinyin: 'Dào shí hòu wǒ gào sù nǐ.', meaning: 'Nanti saat waktunya saya beri tahu kamu.' },
    ],
    quiz: [
      { question: '短信 berarti...', options: ['pesan singkat', 'rumah sakit', 'restoran'], answer: 'pesan singkat' },
      { question: '没问题 berarti...', options: ['tidak masalah', 'sangat mahal', 'sedang belajar'], answer: 'tidak masalah' },
    ],
  },
  {
    goal: 'Gabungkan HSK 2 dalam dialog sehari-hari 6-8 kalimat.',
    vocabulary: [
      { hanzi: '复习', pinyin: 'fùxí', meaning: 'review/mengulang' },
      { hanzi: '语法', pinyin: 'yǔfǎ', meaning: 'grammar' },
      { hanzi: '句子', pinyin: 'jùzi', meaning: 'kalimat' },
      { hanzi: '对话', pinyin: 'duìhuà', meaning: 'dialog' },
      { hanzi: '练习', pinyin: 'liànxí', meaning: 'latihan' },
      { hanzi: '进步', pinyin: 'jìnbù', meaning: 'kemajuan' },
    ],
    examples: [
      { hanzi: '我每天复习语法和生词。', pinyin: 'Wǒ měi tiān fù xí yǔ fǎ hé shēng cí.', meaning: 'Saya mengulang grammar dan kosakata setiap hari.' },
      { hanzi: '我们一起练习对话吧。', pinyin: 'Wǒ men yì qǐ liàn xí duì huà ba.', meaning: 'Ayo kita berlatih dialog bersama.' },
      { hanzi: '你的中文进步很快。', pinyin: 'Nǐ de zhōng wén jìn bù hěn kuài.', meaning: 'Mandarinmu berkembang cepat.' },
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
      { hanzi: '觉得', pinyin: 'juéde', meaning: 'merasa/berpendapat' },
      { hanzi: '容易', pinyin: 'róngyì', meaning: 'mudah' },
      { hanzi: '难', pinyin: 'nán', meaning: 'sulit' },
      { hanzi: '进步', pinyin: 'jìnbù', meaning: 'kemajuan' },
      { hanzi: '方法', pinyin: 'fāngfǎ', meaning: 'metode' },
      { hanzi: '坚持', pinyin: 'jiānchí', meaning: 'konsisten/bertahan' },
    ],
    examples: [
      { hanzi: '我觉得学中文不容易，但是很有意思。', pinyin: 'Wǒ jué de xué zhōng wén bù róng yì, dàn shì hěn yǒu yì sī.', meaning: 'Menurut saya belajar Mandarin tidak mudah, tetapi menarik.' },
      { hanzi: '如果每天练习，进步会很快。', pinyin: 'Rú guǒ měi tiān liàn xí, jìn bù huì hěn kuài.', meaning: 'Jika berlatih setiap hari, kemajuan akan cepat.' },
      { hanzi: '这个方法对我很有帮助。', pinyin: 'Zhè ge fāng fǎ duì wǒ hěn yǒu bāng zhù.', meaning: 'Metode ini sangat membantu saya.' },
    ],
    quiz: [
      { question: '我觉得 dipakai untuk...', options: ['menyampaikan pendapat', 'menanyakan harga', 'menyebut lokasi'], answer: 'menyampaikan pendapat' },
      { question: '坚持 berarti...', options: ['konsisten/bertahan', 'menjual', 'terlambat'], answer: 'konsisten/bertahan' },
    ],
  },
  {
    goal: 'Ceritakan pengalaman belajar dengan 过, 了, dan 以前.',
    vocabulary: [
      { hanzi: '以前', pinyin: 'yǐqián', meaning: 'sebelumnya/dulu' },
      { hanzi: '以后', pinyin: 'yǐhòu', meaning: 'setelah/nanti' },
      { hanzi: '参加', pinyin: 'cānjiā', meaning: 'mengikuti/berpartisipasi' },
      { hanzi: '考试', pinyin: 'kǎoshì', meaning: 'ujian' },
      { hanzi: '成绩', pinyin: 'chéngjì', meaning: 'nilai/hasil' },
      { hanzi: '提高', pinyin: 'tígāo', meaning: 'meningkatkan' },
    ],
    examples: [
      { hanzi: '我以前参加过一次中文考试。', pinyin: 'Wǒ yǐ qián cān jiā guò yí cì zhōng wén kǎo shì.', meaning: 'Dulu saya pernah mengikuti ujian Mandarin sekali.' },
      { hanzi: '考试以后，我每天复习生词。', pinyin: 'Kǎo shì yǐ hòu, wǒ měi tiān fù xí shēng cí.', meaning: 'Setelah ujian, saya mengulang kosakata setiap hari.' },
      { hanzi: '我的听力提高了很多。', pinyin: 'Wǒ de tīng lì tí gāo le hěn duō.', meaning: 'Listening saya meningkat banyak.' },
    ],
    quiz: [
      { question: '参加考试 berarti...', options: ['mengikuti ujian', 'membeli makanan', 'menunggu teman'], answer: 'mengikuti ujian' },
      { question: '提高 berarti...', options: ['meningkatkan', 'menolak', 'turun'], answer: 'meningkatkan' },
    ],
  },
  {
    goal: 'Buat rencana akhir pekan memakai 打算 dan 准备.',
    vocabulary: [
      { hanzi: '打算', pinyin: 'dǎsuàn', meaning: 'berencana' },
      { hanzi: '准备', pinyin: 'zhǔnbèi', meaning: 'bersiap/berencana' },
      { hanzi: '周末', pinyin: 'zhōumò', meaning: 'akhir pekan' },
      { hanzi: '旅行', pinyin: 'lǚxíng', meaning: 'bepergian/travel' },
      { hanzi: '安排', pinyin: 'ānpái', meaning: 'mengatur/jadwal' },
      { hanzi: '决定', pinyin: 'juédìng', meaning: 'memutuskan' },
    ],
    examples: [
      { hanzi: '这个周末你打算做什么？', pinyin: 'Zhè ge zhōu mò nǐ dǎ suàn zuò shén me?', meaning: 'Akhir pekan ini kamu berencana melakukan apa?' },
      { hanzi: '我准备和朋友去旅行。', pinyin: 'Wǒ zhǔn bèi hé péng yǒu qù lǚ xíng.', meaning: 'Saya berencana bepergian dengan teman.' },
      { hanzi: '我们还没有决定时间。', pinyin: 'Wǒ men hái méi yǒu jué dìng shí jiān.', meaning: 'Kami belum menentukan waktunya.' },
    ],
    quiz: [
      { question: '打算 berarti...', options: ['berencana', 'sudah selesai', 'terlalu mahal'], answer: 'berencana' },
      { question: '周末 berarti...', options: ['akhir pekan', 'kemarin', 'kantor'], answer: 'akhir pekan' },
    ],
  },
  {
    goal: 'Deskripsikan perubahan memakai 越来越 dan 比以前.',
    vocabulary: [
      { hanzi: '越来越', pinyin: 'yuèláiyuè', meaning: 'semakin lama semakin' },
      { hanzi: '比以前', pinyin: 'bǐ yǐqián', meaning: 'dibanding sebelumnya' },
      { hanzi: '流利', pinyin: 'liúlì', meaning: 'lancar' },
      { hanzi: '清楚', pinyin: 'qīngchǔ', meaning: 'jelas' },
      { hanzi: '习惯', pinyin: 'xíguàn', meaning: 'terbiasa/kebiasaan' },
      { hanzi: '改变', pinyin: 'gǎibiàn', meaning: 'berubah/mengubah' },
    ],
    examples: [
      { hanzi: '我的中文越来越流利。', pinyin: 'Wǒ de zhōng wén yuè lái yuè liú lì.', meaning: 'Mandarin saya semakin lancar.' },
      { hanzi: '现在我比以前说得清楚。', pinyin: 'Xiàn zài wǒ bǐ yǐ qián shuō dé qīng chǔ.', meaning: 'Sekarang saya berbicara lebih jelas daripada sebelumnya.' },
      { hanzi: '每天练习已经成为我的习惯。', pinyin: 'Měi tiān liàn xí yǐ jīng chéng wéi wǒ de xí guàn.', meaning: 'Latihan setiap hari sudah menjadi kebiasaan saya.' },
    ],
    quiz: [
      { question: '越来越 berarti...', options: ['semakin lama semakin', 'tidak pernah', 'di sebelah kiri'], answer: 'semakin lama semakin' },
      { question: '流利 berarti...', options: ['lancar', 'mahal', 'dingin'], answer: 'lancar' },
    ],
  },
  {
    goal: 'Gunakan 把 dasar untuk menekankan objek yang dipindah/diatur.',
    vocabulary: [
      { hanzi: '把', pinyin: 'bǎ', meaning: 'struktur ba untuk objek terdampak' },
      { hanzi: '放', pinyin: 'fàng', meaning: 'meletakkan' },
      { hanzi: '拿', pinyin: 'ná', meaning: 'mengambil/membawa' },
      { hanzi: '桌子', pinyin: 'zhuōzi', meaning: 'meja' },
      { hanzi: '房间', pinyin: 'fángjiān', meaning: 'kamar' },
      { hanzi: '整理', pinyin: 'zhěnglǐ', meaning: 'merapikan' },
    ],
    examples: [
      { hanzi: '请把书放在桌子上。', pinyin: 'Qǐng bǎ shū fàng zài zhuō zi shàng.', meaning: 'Tolong letakkan buku di atas meja.' },
      { hanzi: '我把房间整理好了。', pinyin: 'Wǒ bǎ fáng jiān zhěng lǐ hǎo le.', meaning: 'Saya sudah merapikan kamar.' },
      { hanzi: '他把手机拿走了。', pinyin: 'Tā bǎ shǒu jī ná zǒu le.', meaning: 'Dia membawa pergi ponselnya.' },
    ],
    quiz: [
      { question: '把 sentence biasanya menekankan...', options: ['objek yang terdampak aksi', 'nama orang saja', 'nada pertama'], answer: 'objek yang terdampak aksi' },
      { question: '整理 berarti...', options: ['merapikan', 'makan', 'bertanya'], answer: 'merapikan' },
    ],
  },
  {
    goal: 'Kenali 被 passive dasar untuk kejadian yang dialami subjek.',
    vocabulary: [
      { hanzi: '被', pinyin: 'bèi', meaning: 'penanda pasif' },
      { hanzi: '拿走', pinyin: 'názǒu', meaning: 'diambil pergi' },
      { hanzi: '忘记', pinyin: 'wàngjì', meaning: 'lupa' },
      { hanzi: '发现', pinyin: 'fāxiàn', meaning: 'menemukan/menyadari' },
      { hanzi: '钱包', pinyin: 'qiánbāo', meaning: 'dompet' },
      { hanzi: '问题', pinyin: 'wèntí', meaning: 'masalah/pertanyaan' },
    ],
    examples: [
      { hanzi: '我的钱包被人拿走了。', pinyin: 'Wǒ de qián bāo bèi rén ná zǒu le.', meaning: 'Dompet saya diambil orang.' },
      { hanzi: '这个问题被老师发现了。', pinyin: 'Zhè ge wèn tí bèi lǎo shī fā xiàn le.', meaning: 'Masalah ini ditemukan guru.' },
      { hanzi: '我忘记带书了。', pinyin: 'Wǒ wàng jì dài shū le.', meaning: 'Saya lupa membawa buku.' },
    ],
    quiz: [
      { question: '被 menandai...', options: ['pasif', 'harga murah', 'pertanyaan yes/no'], answer: 'pasif' },
      { question: '钱包 berarti...', options: ['dompet', 'meja', 'ujian'], answer: 'dompet' },
    ],
  },
  {
    goal: 'Pakai complement hasil seperti 好, 完, 到.',
    vocabulary: [
      { hanzi: '做完', pinyin: 'zuòwán', meaning: 'selesai mengerjakan' },
      { hanzi: '写好', pinyin: 'xiěhǎo', meaning: 'selesai menulis dengan baik' },
      { hanzi: '找到', pinyin: 'zhǎodào', meaning: 'berhasil menemukan' },
      { hanzi: '听懂', pinyin: 'tīngdǒng', meaning: 'mengerti setelah mendengar' },
      { hanzi: '看见', pinyin: 'kànjiàn', meaning: 'melihat/terlihat' },
      { hanzi: '完成', pinyin: 'wánchéng', meaning: 'menyelesaikan' },
    ],
    examples: [
      { hanzi: '我做完作业了。', pinyin: 'Wǒ zuò wán zuò yè le.', meaning: 'Saya sudah menyelesaikan PR.' },
      { hanzi: '你听懂了吗？', pinyin: 'Nǐ tīng dǒng le ma?', meaning: 'Apakah kamu sudah mengerti setelah mendengar?' },
      { hanzi: '我找到了我的书。', pinyin: 'Wǒ zhǎo dào le wǒ de shū.', meaning: 'Saya berhasil menemukan buku saya.' },
    ],
    quiz: [
      { question: '听懂 berarti...', options: ['mengerti setelah mendengar', 'menulis cepat', 'pergi pulang'], answer: 'mengerti setelah mendengar' },
      { question: '做完 berarti...', options: ['selesai mengerjakan', 'baru mulai', 'terlalu sibuk'], answer: 'selesai mengerjakan' },
    ],
  },
  {
    goal: 'Gunakan 一边...一边... untuk dua aktivitas bersamaan.',
    vocabulary: [
      { hanzi: '一边', pinyin: 'yìbiān', meaning: 'sambil/di satu sisi' },
      { hanzi: '听音乐', pinyin: 'tīng yīnyuè', meaning: 'mendengarkan musik' },
      { hanzi: '做作业', pinyin: 'zuò zuòyè', meaning: 'mengerjakan PR' },
      { hanzi: '聊天', pinyin: 'liáotiān', meaning: 'mengobrol' },
      { hanzi: '走路', pinyin: 'zǒulù', meaning: 'berjalan kaki' },
      { hanzi: '吃饭', pinyin: 'chīfàn', meaning: 'makan' },
    ],
    examples: [
      { hanzi: '我一边听音乐一边做作业。', pinyin: 'Wǒ yì biān tīng yīn yuè yì biān zuò zuò yè.', meaning: 'Saya mengerjakan PR sambil mendengarkan musik.' },
      { hanzi: '他们一边走路一边聊天。', pinyin: 'Tā men yì biān zǒu lù yì biān liáo tiān.', meaning: 'Mereka berjalan sambil mengobrol.' },
      { hanzi: '不要一边吃饭一边看手机。', pinyin: 'Bú yào yì biān chī fàn yì biān kàn shǒu jī.', meaning: 'Jangan makan sambil melihat ponsel.' },
    ],
    quiz: [
      { question: '一边...一边... berarti...', options: ['sambil melakukan dua aktivitas', 'karena...jadi...', 'lebih...daripada...'], answer: 'sambil melakukan dua aktivitas' },
      { question: '聊天 berarti...', options: ['mengobrol', 'menemukan', 'ujian'], answer: 'mengobrol' },
    ],
  },
  {
    goal: 'Gunakan 除了...以外 untuk menambah informasi.',
    vocabulary: [
      { hanzi: '除了', pinyin: 'chúle', meaning: 'selain' },
      { hanzi: '以外', pinyin: 'yǐwài', meaning: 'di luar/selain' },
      { hanzi: '还', pinyin: 'hái', meaning: 'juga/masih' },
      { hanzi: '别的', pinyin: 'biéde', meaning: 'yang lain' },
      { hanzi: '运动', pinyin: 'yùndòng', meaning: 'olahraga' },
      { hanzi: '音乐', pinyin: 'yīnyuè', meaning: 'musik' },
    ],
    examples: [
      { hanzi: '除了中文以外，我还学英语。', pinyin: 'Chú le zhōng wén yǐ wài, wǒ hái xué yīng yǔ.', meaning: 'Selain Mandarin, saya juga belajar bahasa Inggris.' },
      { hanzi: '除了看书以外，他还喜欢运动。', pinyin: 'Chú le kàn shū yǐ wài, tā hái xǐ huan yùn dòng.', meaning: 'Selain membaca, dia juga suka olahraga.' },
      { hanzi: '你还有别的问题吗？', pinyin: 'Nǐ hái yǒu bié de wèn tí ma?', meaning: 'Apakah kamu masih punya pertanyaan lain?' },
    ],
    quiz: [
      { question: '除了...以外 berarti...', options: ['selain...', 'sedang...', 'terlalu...'], answer: 'selain...' },
      { question: '还 dalam pola ini berarti...', options: ['juga/masih', 'mahal', 'pasif'], answer: 'juga/masih' },
    ],
  },
  {
    goal: 'Ceritakan keluhan sederhana dan beri solusi.',
    vocabulary: [
      { hanzi: '麻烦', pinyin: 'máfán', meaning: 'merepotkan/masalah' },
      { hanzi: '解决', pinyin: 'jiějué', meaning: 'menyelesaikan' },
      { hanzi: '办法', pinyin: 'bànfǎ', meaning: 'cara/solusi' },
      { hanzi: '建议', pinyin: 'jiànyì', meaning: 'saran' },
      { hanzi: '应该', pinyin: 'yīnggāi', meaning: 'seharusnya' },
      { hanzi: '试试', pinyin: 'shìshì', meaning: 'mencoba' },
    ],
    examples: [
      { hanzi: '这个问题有点儿麻烦。', pinyin: 'Zhè ge wèn tí yǒu diǎn er má fán.', meaning: 'Masalah ini agak merepotkan.' },
      { hanzi: '你应该试试这个办法。', pinyin: 'Nǐ yīng gāi shì shì zhè ge bàn fǎ.', meaning: 'Kamu seharusnya mencoba cara ini.' },
      { hanzi: '谢谢你的建议。', pinyin: 'Xiè xiè nǐ de jiàn yì.', meaning: 'Terima kasih atas saranmu.' },
    ],
    quiz: [
      { question: '建议 berarti...', options: ['saran', 'cuaca', 'dompet'], answer: 'saran' },
      { question: '应该 berarti...', options: ['seharusnya', 'pernah', 'semakin'], answer: 'seharusnya' },
    ],
  },
  {
    goal: 'Bicarakan pekerjaan dan tugas harian.',
    vocabulary: [
      { hanzi: '工作', pinyin: 'gōngzuò', meaning: 'pekerjaan/bekerja' },
      { hanzi: '同事', pinyin: 'tóngshì', meaning: 'rekan kerja' },
      { hanzi: '会议', pinyin: 'huìyì', meaning: 'rapat' },
      { hanzi: '任务', pinyin: 'rènwu', meaning: 'tugas' },
      { hanzi: '老板', pinyin: 'lǎobǎn', meaning: 'bos' },
      { hanzi: '准时', pinyin: 'zhǔnshí', meaning: 'tepat waktu' },
    ],
    examples: [
      { hanzi: '我今天有一个重要的会议。', pinyin: 'Wǒ jīn tiān yǒu yí gè zhòng yào de huì yì.', meaning: 'Hari ini saya punya rapat penting.' },
      { hanzi: '老板让我准时完成任务。', pinyin: 'Lǎo bǎn ràng wǒ zhǔn shí wán chéng rèn wu.', meaning: 'Bos meminta saya menyelesaikan tugas tepat waktu.' },
      { hanzi: '我的同事很友好。', pinyin: 'Wǒ de tóng shì hěn yǒu hǎo.', meaning: 'Rekan kerja saya ramah.' },
    ],
    quiz: [
      { question: '会议 berarti...', options: ['rapat', 'restoran', 'hobi'], answer: 'rapat' },
      { question: '准时 berarti...', options: ['tepat waktu', 'terlambat', 'semakin cepat'], answer: 'tepat waktu' },
    ],
  },
  {
    goal: 'Diskusikan hobi, frekuensi, dan alasan.',
    vocabulary: [
      { hanzi: '兴趣', pinyin: 'xìngqù', meaning: 'minat' },
      { hanzi: '平时', pinyin: 'píngshí', meaning: 'biasanya' },
      { hanzi: '经常', pinyin: 'jīngcháng', meaning: 'sering' },
      { hanzi: '偶尔', pinyin: 'ǒu\'ěr', meaning: 'sesekali' },
      { hanzi: '放松', pinyin: 'fàngsōng', meaning: 'rileks' },
      { hanzi: '有意思', pinyin: 'yǒuyìsī', meaning: 'menarik' },
    ],
    examples: [
      { hanzi: '我平时经常看中文电影。', pinyin: 'Wǒ píng shí jīng cháng kàn zhòng wén diàn yǐng.', meaning: 'Saya biasanya sering menonton film Mandarin.' },
      { hanzi: '这个爱好让我很放松。', pinyin: 'Zhè ge ài hào ràng wǒ hěn fàng sōng.', meaning: 'Hobi ini membuat saya rileks.' },
      { hanzi: '我觉得学习汉字很有意思。', pinyin: 'Wǒ jué de xué xí hàn zì hěn yǒu yì sī.', meaning: 'Menurut saya belajar Hanzi menarik.' },
    ],
    quiz: [
      { question: '平时 berarti...', options: ['biasanya', 'selain', 'pasif'], answer: 'biasanya' },
      { question: '放松 berarti...', options: ['rileks', 'ujian', 'meletakkan'], answer: 'rileks' },
    ],
  },
  {
    goal: 'Ceritakan perjalanan singkat dengan urutan waktu.',
    vocabulary: [
      { hanzi: '先', pinyin: 'xiān', meaning: 'terlebih dahulu' },
      { hanzi: '然后', pinyin: 'ránhòu', meaning: 'lalu' },
      { hanzi: '最后', pinyin: 'zuìhòu', meaning: 'terakhir' },
      { hanzi: '到达', pinyin: 'dàodá', meaning: 'tiba' },
      { hanzi: '出发', pinyin: 'chūfā', meaning: 'berangkat' },
      { hanzi: '机场', pinyin: 'jīchǎng', meaning: 'bandara' },
    ],
    examples: [
      { hanzi: '我们先去机场，然后坐飞机。', pinyin: 'Wǒ men xiān qù jī chǎng, rán hòu zuò fēi jī.', meaning: 'Kami pergi ke bandara dulu, lalu naik pesawat.' },
      { hanzi: '明天早上八点出发。', pinyin: 'Míng tiān zǎo shàng bā diǎn chū fā.', meaning: 'Besok pagi berangkat jam delapan.' },
      { hanzi: '我们下午到达北京。', pinyin: 'Wǒ men xià wǔ dào dá běi jīng.', meaning: 'Kami tiba di Beijing sore hari.' },
    ],
    quiz: [
      { question: '先...然后...最后... dipakai untuk...', options: ['urutan kejadian', 'perbandingan', 'pasif'], answer: 'urutan kejadian' },
      { question: '出发 berarti...', options: ['berangkat', 'tiba', 'menunggu'], answer: 'berangkat' },
    ],
  },
  {
    goal: 'Baca dan tulis pesan formal ringan.',
    vocabulary: [
      { hanzi: '通知', pinyin: 'tōngzhī', meaning: 'pengumuman/notifikasi' },
      { hanzi: '请假', pinyin: 'qǐngjià', meaning: 'meminta izin absen' },
      { hanzi: '原因', pinyin: 'yuányīn', meaning: 'alasan' },
      { hanzi: '如果', pinyin: 'rúguǒ', meaning: 'jika' },
      { hanzi: '必须', pinyin: 'bìxū', meaning: 'harus' },
      { hanzi: '联系', pinyin: 'liánxì', meaning: 'menghubungi' },
    ],
    examples: [
      { hanzi: '如果你不能来，请联系老师。', pinyin: 'Rú guǒ nǐ bù néng lái, qǐng lián xì lǎo shī.', meaning: 'Jika kamu tidak bisa datang, hubungi guru.' },
      { hanzi: '我想请假一天，因为我生病了。', pinyin: 'Wǒ xiǎng qǐng jiǎ yī tiān, yīn wèi wǒ shēng bìng le.', meaning: 'Saya ingin izin satu hari karena saya sakit.' },
      { hanzi: '这个通知很重要。', pinyin: 'Zhè ge tōng zhī hěn zhòng yào.', meaning: 'Pengumuman ini penting.' },
    ],
    quiz: [
      { question: '通知 berarti...', options: ['pengumuman', 'hobi', 'perbandingan'], answer: 'pengumuman' },
      { question: '必须 berarti...', options: ['harus', 'boleh jadi', 'pernah'], answer: 'harus' },
    ],
  },
  {
    goal: 'Beri instruksi proses sederhana dengan langkah-langkah.',
    vocabulary: [
      { hanzi: '步骤', pinyin: 'bùzhòu', meaning: 'langkah' },
      { hanzi: '打开', pinyin: 'dǎkāi', meaning: 'membuka/menyalakan' },
      { hanzi: '关闭', pinyin: 'guānbì', meaning: 'menutup/mematikan' },
      { hanzi: '选择', pinyin: 'xuǎnzé', meaning: 'memilih' },
      { hanzi: '输入', pinyin: 'shūrù', meaning: 'memasukkan input' },
      { hanzi: '完成', pinyin: 'wánchéng', meaning: 'menyelesaikan' },
    ],
    examples: [
      { hanzi: '第一步，打开手机。', pinyin: 'Dì yī bù, dǎ kāi shǒu jī.', meaning: 'Langkah pertama, buka ponsel.' },
      { hanzi: '然后，输入你的名字。', pinyin: 'Rán hòu, shū rù nǐ de míng zì.', meaning: 'Lalu, masukkan namamu.' },
      { hanzi: '最后，选择中文。', pinyin: 'Zuì hòu, xuǎn zé zhōng wén.', meaning: 'Terakhir, pilih bahasa Mandarin.' },
    ],
    quiz: [
      { question: '步骤 berarti...', options: ['langkah', 'saran', 'dompet'], answer: 'langkah' },
      { question: '输入 berarti...', options: ['memasukkan input', 'menutup', 'pergi'], answer: 'memasukkan input' },
    ],
  },
  {
    goal: 'Sampaikan saran dan respons memakai 应该, 可以, dan 最好.',
    vocabulary: [
      { hanzi: '最好', pinyin: 'zuìhǎo', meaning: 'sebaiknya/paling baik' },
      { hanzi: '应该', pinyin: 'yīnggāi', meaning: 'seharusnya' },
      { hanzi: '可以', pinyin: 'kěyǐ', meaning: 'boleh/bisa' },
      { hanzi: '注意', pinyin: 'zhùyì', meaning: 'memperhatikan' },
      { hanzi: '健康', pinyin: 'jiànkāng', meaning: 'sehat/kesehatan' },
      { hanzi: '早点', pinyin: 'zǎodiǎn', meaning: 'lebih awal' },
    ],
    examples: [
      { hanzi: '你最好早点休息。', pinyin: 'Nǐ zuì hǎo zǎo diǎn xiū xi.', meaning: 'Sebaiknya kamu istirahat lebih awal.' },
      { hanzi: '学习的时候应该注意声调。', pinyin: 'Xué xí de shí hòu yīng gāi zhù yì shēng diào.', meaning: 'Saat belajar seharusnya memperhatikan tone.' },
      { hanzi: '你可以每天练习十分钟。', pinyin: 'Nǐ kě yǐ měi tiān liàn xí shí fēn zhōng.', meaning: 'Kamu bisa berlatih 10 menit setiap hari.' },
    ],
    quiz: [
      { question: '最好 berarti...', options: ['sebaiknya/paling baik', 'sudah selesai', 'pasif'], answer: 'sebaiknya/paling baik' },
      { question: '注意 berarti...', options: ['memperhatikan', 'membeli', 'membuka'], answer: 'memperhatikan' },
    ],
  },
  {
    goal: 'Tulis ringkasan singkat dari dialog/teks HSK 3.',
    vocabulary: [
      { hanzi: '总结', pinyin: 'zǒngjié', meaning: 'meringkas/ringkasan' },
      { hanzi: '主要', pinyin: 'zhǔyào', meaning: 'utama' },
      { hanzi: '内容', pinyin: 'nèiróng', meaning: 'isi/konten' },
      { hanzi: '意思', pinyin: 'yìsī', meaning: 'makna/maksud' },
      { hanzi: '重点', pinyin: 'zhòngdiǎn', meaning: 'poin penting' },
      { hanzi: '最后', pinyin: 'zuìhòu', meaning: 'akhirnya/terakhir' },
    ],
    examples: [
      { hanzi: '这段话的主要内容是学习方法。', pinyin: 'Zhè duàn huà de zhǔ yào nèi róng shì xué xí fāng fǎ.', meaning: 'Isi utama paragraf ini adalah metode belajar.' },
      { hanzi: '重点是每天练习。', pinyin: 'Zhòng diǎn shì měi tiān liàn xí.', meaning: 'Poin pentingnya adalah berlatih setiap hari.' },
      { hanzi: '最后，他决定参加考试。', pinyin: 'Zuì hòu, tā jué dìng cān jiā kǎo shì.', meaning: 'Akhirnya, dia memutuskan mengikuti ujian.' },
    ],
    quiz: [
      { question: '主要内容 berarti...', options: ['isi utama', 'harga murah', 'sebelah kanan'], answer: 'isi utama' },
      { question: '重点 berarti...', options: ['poin penting', 'orang asing', 'restoran'], answer: 'poin penting' },
    ],
  },
  {
    goal: 'Buat portfolio HSK 3: dialog, paragraf, listening summary, dan pronunciation review.',
    vocabulary: [
      { hanzi: '复习', pinyin: 'fùxí', meaning: 'review/mengulang' },
      { hanzi: '水平', pinyin: 'shuǐpíng', meaning: 'level/kemampuan' },
      { hanzi: '目标', pinyin: 'mùbiāo', meaning: 'target' },
      { hanzi: '计划', pinyin: 'jìhuà', meaning: 'rencana' },
      { hanzi: '表达', pinyin: 'biǎodá', meaning: 'mengekspresikan' },
      { hanzi: '自信', pinyin: 'zìxìn', meaning: 'percaya diri' },
    ],
    examples: [
      { hanzi: '我的目标是提高口语水平。', pinyin: 'Wǒ de mù biāo shì tí gāo kǒu yǔ shuǐ píng.', meaning: 'Target saya adalah meningkatkan level speaking.' },
      { hanzi: '我可以用中文表达简单的想法。', pinyin: 'Wǒ kě yǐ yòng zhōng wén biǎo dá jiǎn dān de xiǎng fǎ.', meaning: 'Saya bisa mengekspresikan ide sederhana dalam Mandarin.' },
      { hanzi: '复习以后，我更有自信了。', pinyin: 'Fù xí yǐ hòu, wǒ gèng yǒu zì xìn le.', meaning: 'Setelah review, saya lebih percaya diri.' },
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
      { hanzi: '认为', pinyin: 'rènwéi', meaning: 'berpendapat' },
      { hanzi: '关键', pinyin: 'guānjiàn', meaning: 'kunci/inti' },
      { hanzi: '因此', pinyin: 'yīncǐ', meaning: 'oleh karena itu' },
      { hanzi: '效率', pinyin: 'xiàolǜ', meaning: 'efisiensi' },
      { hanzi: '习惯', pinyin: 'xíguàn', meaning: 'kebiasaan' },
      { hanzi: '坚持', pinyin: 'jiānchí', meaning: 'konsisten/bertahan' },
    ],
    examples: [
      { hanzi: '我认为学习语言的关键不是时间长，而是效率高。', pinyin: 'Wǒ rèn wéi xué xí yǔ yán de guān jiàn bú shì shí jiān cháng, ér shì xiào lǜ gāo.', meaning: 'Menurut saya kunci belajar bahasa bukan durasi panjang, melainkan efisiensi tinggi.' },
      { hanzi: '每天坚持复习可以帮助我们形成好习惯。', pinyin: 'Měi tiān jiān chí fù xí kě yǐ bāng zhù wǒ men xíng chéng hǎo xí guàn.', meaning: 'Review setiap hari dapat membantu kita membentuk kebiasaan baik.' },
      { hanzi: '因此，我建议每天练习三十分钟。', pinyin: 'Yīn cǐ, wǒ jiàn yì měi tiān liàn xí sān shí fēn zhōng.', meaning: 'Oleh karena itu, saya menyarankan latihan 30 menit setiap hari.' },
    ],
    quiz: [
      { question: '因此 berarti...', options: ['oleh karena itu', 'selain itu', 'sebelumnya'], answer: 'oleh karena itu' },
      { question: '关键 berarti...', options: ['kunci/inti', 'cuaca', 'transportasi'], answer: 'kunci/inti' },
    ],
  },
  {
    goal: 'Diskusikan dampak teknologi dalam belajar memakai 影响 dan 方便.',
    vocabulary: [
      { hanzi: '科技', pinyin: 'kējì', meaning: 'teknologi' },
      { hanzi: '影响', pinyin: 'yǐngxiǎng', meaning: 'pengaruh/dampak' },
      { hanzi: '方便', pinyin: 'fāngbiàn', meaning: 'praktis/mudah' },
      { hanzi: '网络', pinyin: 'wǎngluò', meaning: 'internet/jaringan' },
      { hanzi: '资料', pinyin: 'zīliào', meaning: 'materi/data' },
      { hanzi: '缺点', pinyin: 'quēdiǎn', meaning: 'kekurangan' },
    ],
    examples: [
      { hanzi: '网络让学习变得更方便。', pinyin: 'Wǎng luò ràng xué xí biàn de gèng fāng biàn.', meaning: 'Internet membuat belajar menjadi lebih praktis.' },
      { hanzi: '不过，科技也有一些缺点。', pinyin: 'Bú guò, kē jì yě yǒu yì xiē quē diǎn.', meaning: 'Namun, teknologi juga memiliki beberapa kekurangan.' },
      { hanzi: '我们需要选择可靠的学习资料。', pinyin: 'Wǒ men xū yào xuǎn zé kě kào de xué xí zī liào.', meaning: 'Kita perlu memilih materi belajar yang dapat dipercaya.' },
    ],
    quiz: [
      { question: '影响 berarti...', options: ['pengaruh/dampak', 'kebiasaan', 'rapat'], answer: 'pengaruh/dampak' },
      { question: '方便 berarti...', options: ['praktis/mudah', 'sulit', 'mahal'], answer: 'praktis/mudah' },
    ],
  },
  {
    goal: 'Bandingkan dua pilihan memakai 与其...不如... dan 比起.',
    vocabulary: [
      { hanzi: '与其', pinyin: 'yǔqí', meaning: 'daripada' },
      { hanzi: '不如', pinyin: 'bùrú', meaning: 'lebih baik' },
      { hanzi: '比起', pinyin: 'bǐqǐ', meaning: 'dibandingkan dengan' },
      { hanzi: '选择', pinyin: 'xuǎnzé', meaning: 'pilihan/memilih' },
      { hanzi: '适合', pinyin: 'shìhé', meaning: 'cocok' },
      { hanzi: '浪费', pinyin: 'làngfèi', meaning: 'membuang-buang' },
    ],
    examples: [
      { hanzi: '与其浪费时间，不如马上开始练习。', pinyin: 'Yǔ qí làng fèi shí jiān, bù rú mǎ shàng kāi shǐ liàn xí.', meaning: 'Daripada membuang waktu, lebih baik segera mulai latihan.' },
      { hanzi: '比起一个人学习，我更喜欢和同学练习。', pinyin: 'Bǐ qǐ yí gè rén xué xí, wǒ gèng xǐ huan hé tóng xué liàn xí.', meaning: 'Dibanding belajar sendiri, saya lebih suka latihan dengan teman.' },
      { hanzi: '这个方法不一定适合每个人。', pinyin: 'Zhè ge fāng fǎ bù yí dìng shì hé měi gè rén.', meaning: 'Metode ini belum tentu cocok untuk semua orang.' },
    ],
    quiz: [
      { question: '与其...不如... berarti...', options: ['daripada..., lebih baik...', 'karena..., jadi...', 'selain..., juga...'], answer: 'daripada..., lebih baik...' },
      { question: '适合 berarti...', options: ['cocok', 'lupa', 'sakit'], answer: 'cocok' },
    ],
  },
  {
    goal: 'Gunakan 不但...而且... untuk menambah argumen.',
    vocabulary: [
      { hanzi: '不但', pinyin: 'búdàn', meaning: 'tidak hanya' },
      { hanzi: '而且', pinyin: 'érqiě', meaning: 'tetapi juga' },
      { hanzi: '提高', pinyin: 'tígāo', meaning: 'meningkatkan' },
      { hanzi: '能力', pinyin: 'nénglì', meaning: 'kemampuan' },
      { hanzi: '信心', pinyin: 'xìnxīn', meaning: 'percaya diri' },
      { hanzi: '交流', pinyin: 'jiāoliú', meaning: 'berkomunikasi/bertukar pikiran' },
    ],
    examples: [
      { hanzi: '学习中文不但能提高语言能力，而且能增加交流机会。', pinyin: 'Xué xí zhōng wén bú dàn néng tí gāo yǔ yán néng lì, ér qiě néng zēng jiā jiāo liú jī huì.', meaning: 'Belajar Mandarin tidak hanya meningkatkan kemampuan bahasa, tetapi juga menambah kesempatan komunikasi.' },
      { hanzi: '多说话可以增加信心。', pinyin: 'Duō shuō huà kě yǐ zēng jiā xìn xīn.', meaning: 'Lebih banyak berbicara dapat menambah percaya diri.' },
      { hanzi: '语言能力需要长期练习。', pinyin: 'Yǔ yán néng lì xū yào cháng qī liàn xí.', meaning: 'Kemampuan bahasa membutuhkan latihan jangka panjang.' },
    ],
    quiz: [
      { question: '不但...而且... dipakai untuk...', options: ['menambahkan argumen', 'menandai pasif', 'menanyakan lokasi'], answer: 'menambahkan argumen' },
      { question: '能力 berarti...', options: ['kemampuan', 'waktu', 'harga'], answer: 'kemampuan' },
    ],
  },
  {
    goal: 'Pakai 既...又... untuk mendeskripsikan dua kualitas sekaligus.',
    vocabulary: [
      { hanzi: '既', pinyin: 'jì', meaning: 'baik/sekali' },
      { hanzi: '又', pinyin: 'yòu', meaning: 'juga' },
      { hanzi: '实用', pinyin: 'shíyòng', meaning: 'praktis/berguna' },
      { hanzi: '有趣', pinyin: 'yǒuqù', meaning: 'menarik' },
      { hanzi: '复杂', pinyin: 'fùzá', meaning: 'kompleks' },
      { hanzi: '简单', pinyin: 'jiǎndān', meaning: 'sederhana' },
    ],
    examples: [
      { hanzi: '这个应用既实用又有趣。', pinyin: 'Zhè ge yìng yòng jì shí yòng yòu yǒu qù.', meaning: 'Aplikasi ini praktis sekaligus menarik.' },
      { hanzi: '中文语法有时候既简单又复杂。', pinyin: 'Zhōng wén yǔ fǎ yǒu shí hòu jì jiǎn dān yòu fù zá.', meaning: 'Grammar Mandarin kadang sederhana sekaligus kompleks.' },
      { hanzi: '这个解释很清楚。', pinyin: 'Zhè ge jiě shì hěn qīng chǔ.', meaning: 'Penjelasan ini jelas.' },
    ],
    quiz: [
      { question: '既...又... menyatakan...', options: ['dua kualitas sekaligus', 'urutan waktu', 'harga'], answer: 'dua kualitas sekaligus' },
      { question: '实用 berarti...', options: ['praktis/berguna', 'kompleks', 'terlambat'], answer: 'praktis/berguna' },
    ],
  },
  {
    goal: 'Gunakan 连...都... untuk penekanan.',
    vocabulary: [
      { hanzi: '连', pinyin: 'lián', meaning: 'bahkan' },
      { hanzi: '都', pinyin: 'dōu', meaning: 'pun/semua' },
      { hanzi: '忘', pinyin: 'wàng', meaning: 'lupa' },
      { hanzi: '记得', pinyin: 'jìde', meaning: 'ingat' },
      { hanzi: '简单', pinyin: 'jiǎndān', meaning: 'sederhana' },
      { hanzi: '紧张', pinyin: 'jǐnzhāng', meaning: 'gugup/tegang' },
    ],
    examples: [
      { hanzi: '他太紧张了，连自己的名字都忘了。', pinyin: 'Tā tài jǐn zhāng le, lián zì jǐ de míng zì dōu wàng le.', meaning: 'Dia terlalu gugup, bahkan namanya sendiri pun lupa.' },
      { hanzi: '这个字很简单，连初学者都会写。', pinyin: 'Zhè ge zì hěn jiǎn dān, lián chū xué zhě dōu huì xiě.', meaning: 'Karakter ini sederhana, bahkan pemula pun bisa menulisnya.' },
      { hanzi: '你还记得这个词吗？', pinyin: 'Nǐ hái jì de zhè ge cí ma?', meaning: 'Apakah kamu masih ingat kata ini?' },
    ],
    quiz: [
      { question: '连...都... dipakai untuk...', options: ['penekanan', 'lokasi', 'warna'], answer: 'penekanan' },
      { question: '紧张 berarti...', options: ['gugup/tegang', 'lancar', 'murah'], answer: 'gugup/tegang' },
    ],
  },
  {
    goal: 'Diskusikan budaya dan kebiasaan dengan 差异 dan 尊重.',
    vocabulary: [
      { hanzi: '文化', pinyin: 'wénhuà', meaning: 'budaya' },
      { hanzi: '差异', pinyin: 'chāyì', meaning: 'perbedaan' },
      { hanzi: '尊重', pinyin: 'zūnzhòng', meaning: 'menghormati' },
      { hanzi: '习俗', pinyin: 'xísú', meaning: 'adat/kebiasaan' },
      { hanzi: '了解', pinyin: 'liǎojiě', meaning: 'memahami' },
      { hanzi: '适应', pinyin: 'shìyìng', meaning: 'beradaptasi' },
    ],
    examples: [
      { hanzi: '了解文化差异可以减少误会。', pinyin: 'Liǎo jiě wén huà chā yì kě yǐ jiǎn shǎo wù huì.', meaning: 'Memahami perbedaan budaya dapat mengurangi salah paham.' },
      { hanzi: '我们应该尊重不同的习俗。', pinyin: 'Wǒ men yīng gāi zūn zhòng bù tóng de xí sú.', meaning: 'Kita seharusnya menghormati adat yang berbeda.' },
      { hanzi: '刚到一个新国家时，需要时间适应。', pinyin: 'Gāng dào yí gè xīn guó jiā shí, xū yào shí jiān shì yìng.', meaning: 'Saat baru tiba di negara baru, perlu waktu untuk beradaptasi.' },
    ],
    quiz: [
      { question: '差异 berarti...', options: ['perbedaan', 'kemajuan', 'jadwal'], answer: 'perbedaan' },
      { question: '尊重 berarti...', options: ['menghormati', 'membandingkan', 'menunggu'], answer: 'menghormati' },
    ],
  },
  {
    goal: 'Bahas pekerjaan dan tekanan dengan 压力, 负责, dan 经验.',
    vocabulary: [
      { hanzi: '压力', pinyin: 'yālì', meaning: 'tekanan/stres' },
      { hanzi: '负责', pinyin: 'fùzé', meaning: 'bertanggung jawab atas' },
      { hanzi: '经验', pinyin: 'jīngyàn', meaning: 'pengalaman' },
      { hanzi: '同事', pinyin: 'tóngshì', meaning: 'rekan kerja' },
      { hanzi: '合作', pinyin: 'hézuò', meaning: 'bekerja sama' },
      { hanzi: '解决', pinyin: 'jiějué', meaning: 'menyelesaikan' },
    ],
    examples: [
      { hanzi: '工作压力大的时候，合作很重要。', pinyin: 'Gōng zuò yā lì dà de shí hòu, hé zuò hěn zhòng yào.', meaning: 'Saat tekanan kerja besar, kerja sama sangat penting.' },
      { hanzi: '我负责这个项目的一部分。', pinyin: 'Wǒ fù zé zhè ge xiàng mù dì yí bù fen.', meaning: 'Saya bertanggung jawab atas sebagian proyek ini.' },
      { hanzi: '他的经验可以帮助我们解决问题。', pinyin: 'Tā de jīng yàn kě yǐ bāng zhù wǒ men jiě jué wèn tí.', meaning: 'Pengalamannya dapat membantu kami menyelesaikan masalah.' },
    ],
    quiz: [
      { question: '负责 berarti...', options: ['bertanggung jawab atas', 'beradaptasi', 'menonton'], answer: 'bertanggung jawab atas' },
      { question: '压力 berarti...', options: ['tekanan/stres', 'kepercayaan diri', 'budaya'], answer: 'tekanan/stres' },
    ],
  },
  {
    goal: 'Baca dan ringkas berita pendek memakai 事件, 原因, 结果.',
    vocabulary: [
      { hanzi: '新闻', pinyin: 'xīnwén', meaning: 'berita' },
      { hanzi: '事件', pinyin: 'shìjiàn', meaning: 'peristiwa' },
      { hanzi: '原因', pinyin: 'yuányīn', meaning: 'alasan/penyebab' },
      { hanzi: '结果', pinyin: 'jiéguǒ', meaning: 'hasil/akibat' },
      { hanzi: '报道', pinyin: 'bàodào', meaning: 'laporan berita' },
      { hanzi: '社会', pinyin: 'shèhuì', meaning: 'masyarakat' },
    ],
    examples: [
      { hanzi: '这篇新闻报道了一个社会事件。', pinyin: 'Zhè piān xīn wén bào dào le yí gè shè huì shì jiàn.', meaning: 'Berita ini melaporkan sebuah peristiwa sosial.' },
      { hanzi: '文章先说明原因，然后介绍结果。', pinyin: 'Wén zhāng xiān shuō míng yuán yīn, rán hòu jiè shào jié guǒ.', meaning: 'Artikel menjelaskan penyebab dulu, lalu memperkenalkan hasil.' },
      { hanzi: '我们需要抓住主要信息。', pinyin: 'Wǒ men xū yào zhuā zhù zhǔ yào xìn xī.', meaning: 'Kita perlu menangkap informasi utama.' },
    ],
    quiz: [
      { question: '新闻 berarti...', options: ['berita', 'hobi', 'transportasi'], answer: 'berita' },
      { question: '原因 dan 结果 berarti...', options: ['penyebab dan hasil', 'kiri dan kanan', 'murah dan mahal'], answer: 'penyebab dan hasil' },
    ],
  },
  {
    goal: 'Jelaskan masalah lingkungan ringan dengan 环境 dan 减少.',
    vocabulary: [
      { hanzi: '环境', pinyin: 'huánjìng', meaning: 'lingkungan' },
      { hanzi: '污染', pinyin: 'wūrǎn', meaning: 'polusi' },
      { hanzi: '减少', pinyin: 'jiǎnshǎo', meaning: 'mengurangi' },
      { hanzi: '保护', pinyin: 'bǎohù', meaning: 'melindungi' },
      { hanzi: '垃圾', pinyin: 'lājī', meaning: 'sampah' },
      { hanzi: '影响', pinyin: 'yǐngxiǎng', meaning: 'dampak/pengaruh' },
    ],
    examples: [
      { hanzi: '环境污染会影响我们的生活。', pinyin: 'Huán jìng wū rǎn huì yǐng xiǎng wǒ men de shēng huó.', meaning: 'Polusi lingkungan akan memengaruhi hidup kita.' },
      { hanzi: '减少垃圾是保护环境的一个办法。', pinyin: 'Jiǎn shǎo lā jī shì bǎo hù huán jìng de yí gè bàn fǎ.', meaning: 'Mengurangi sampah adalah salah satu cara melindungi lingkungan.' },
      { hanzi: '每个人都可以做一点儿。', pinyin: 'Měi gè rén dōu kě yǐ zuò yì diǎn ér.', meaning: 'Setiap orang bisa melakukan sedikit.' },
    ],
    quiz: [
      { question: '污染 berarti...', options: ['polusi', 'efisiensi', 'kebiasaan'], answer: 'polusi' },
      { question: '保护 berarti...', options: ['melindungi', 'melupakan', 'menjelaskan'], answer: 'melindungi' },
    ],
  },
  {
    goal: 'Diskusikan kesehatan dan gaya hidup memakai 保持 dan 规律.',
    vocabulary: [
      { hanzi: '健康', pinyin: 'jiànkāng', meaning: 'kesehatan/sehat' },
      { hanzi: '保持', pinyin: 'bǎochí', meaning: 'menjaga/mempertahankan' },
      { hanzi: '规律', pinyin: 'guīlǜ', meaning: 'teratur' },
      { hanzi: '饮食', pinyin: 'yǐnshí', meaning: 'pola makan' },
      { hanzi: '锻炼', pinyin: 'duànliàn', meaning: 'berolahraga/melatih' },
      { hanzi: '精神', pinyin: 'jīngshén', meaning: 'energi/mental' },
    ],
    examples: [
      { hanzi: '保持健康需要规律的饮食和锻炼。', pinyin: 'Bǎo chí jiàn kāng xū yào guī lǜ de yǐn shí hé duàn liàn.', meaning: 'Menjaga kesehatan membutuhkan pola makan dan olahraga yang teratur.' },
      { hanzi: '睡得好，精神就会更好。', pinyin: 'Shuì dé hǎo, jīng shén jiù huì gèng hǎo.', meaning: 'Jika tidur baik, energi/mental akan lebih baik.' },
      { hanzi: '我打算每天锻炼半个小时。', pinyin: 'Wǒ dǎ suàn měi tiān duàn liàn bàn gè xiǎo shí.', meaning: 'Saya berencana berolahraga setengah jam setiap hari.' },
    ],
    quiz: [
      { question: '保持健康 berarti...', options: ['menjaga kesehatan', 'membuang sampah', 'mengirim pesan'], answer: 'menjaga kesehatan' },
      { question: '规律 berarti...', options: ['teratur', 'gugup', 'kompleks'], answer: 'teratur' },
    ],
  },
  {
    goal: 'Berikan saran bernuansa dengan 最好, 尽量, dan 避免.',
    vocabulary: [
      { hanzi: '尽量', pinyin: 'jǐnliàng', meaning: 'sebisa mungkin' },
      { hanzi: '避免', pinyin: 'bìmiǎn', meaning: 'menghindari' },
      { hanzi: '最好', pinyin: 'zuìhǎo', meaning: 'sebaiknya' },
      { hanzi: '建议', pinyin: 'jiànyì', meaning: 'saran' },
      { hanzi: '情况', pinyin: 'qíngkuàng', meaning: 'situasi' },
      { hanzi: '改变', pinyin: 'gǎibiàn', meaning: 'mengubah/perubahan' },
    ],
    examples: [
      { hanzi: '你最好根据自己的情况安排时间。', pinyin: 'Nǐ zuì hǎo gēn jù zì jǐ de qíng kuàng ān pái shí jiān.', meaning: 'Sebaiknya kamu mengatur waktu berdasarkan situasimu sendiri.' },
      { hanzi: '学习时尽量避免看手机。', pinyin: 'Xué xí shí jǐn liàng bì miǎn kàn shǒu jī.', meaning: 'Saat belajar, sebisa mungkin hindari melihat ponsel.' },
      { hanzi: '这个建议可以改变你的学习习惯。', pinyin: 'Zhè ge jiàn yì kě yǐ gǎi biàn nǐ de xué xí xí guàn.', meaning: 'Saran ini bisa mengubah kebiasaan belajarmu.' },
    ],
    quiz: [
      { question: '尽量 berarti...', options: ['sebisa mungkin', 'bahkan', 'pasif'], answer: 'sebisa mungkin' },
      { question: '避免 berarti...', options: ['menghindari', 'menambah', 'berangkat'], answer: 'menghindari' },
    ],
  },
  {
    goal: 'Gunakan 把/被 dalam konteks masalah dan solusi.',
    vocabulary: [
      { hanzi: '文件', pinyin: 'wénjiàn', meaning: 'dokumen/file' },
      { hanzi: '保存', pinyin: 'bǎocún', meaning: 'menyimpan' },
      { hanzi: '删除', pinyin: 'shānchú', meaning: 'menghapus' },
      { hanzi: '恢复', pinyin: 'huīfù', meaning: 'memulihkan' },
      { hanzi: '系统', pinyin: 'xìtǒng', meaning: 'sistem' },
      { hanzi: '错误', pinyin: 'cuòwù', meaning: 'kesalahan/error' },
    ],
    examples: [
      { hanzi: '我把文件保存好了。', pinyin: 'Wǒ bǎ wén jiàn bǎo cún hǎo le.', meaning: 'Saya sudah menyimpan file dengan baik.' },
      { hanzi: '文件被系统删除了。', pinyin: 'Wén jiàn bèi xì tǒng shān chú le.', meaning: 'File dihapus oleh sistem.' },
      { hanzi: '我们需要恢复这些文件。', pinyin: 'Wǒ men xū yào huī fù zhè xiē wén jiàn.', meaning: 'Kami perlu memulihkan file-file ini.' },
    ],
    quiz: [
      { question: '保存 berarti...', options: ['menyimpan', 'menghapus', 'membandingkan'], answer: 'menyimpan' },
      { question: '文件被系统删除了 memakai pola...', options: ['被 passive', 'bèi passive', '既...又...'], answer: '被 passive' },
    ],
  },
  {
    goal: 'Baca teks menengah dan identifikasi sikap penulis.',
    vocabulary: [
      { hanzi: '态度', pinyin: 'tàidù', meaning: 'sikap' },
      { hanzi: '支持', pinyin: 'zhīchí', meaning: 'mendukung' },
      { hanzi: '反对', pinyin: 'fǎnduì', meaning: 'menentang' },
      { hanzi: '观点', pinyin: 'guāndiǎn', meaning: 'sudut pandang' },
      { hanzi: '理由', pinyin: 'lǐyóu', meaning: 'alasan' },
      { hanzi: '明显', pinyin: 'míngxiǎn', meaning: 'jelas/nyata' },
    ],
    examples: [
      { hanzi: '作者的态度比较明显，他支持这个观点。', pinyin: 'Zuò zhě de tài dù bǐ jiào míng xiǎn, tā zhī chí zhè ge guān diǎn.', meaning: 'Sikap penulis cukup jelas, dia mendukung pandangan ini.' },
      { hanzi: '他反对这个做法的主要理由是效率低。', pinyin: 'Tā fǎn duì zhè ge zuò fǎ de zhǔ yào lǐ yóu shì xiào lǜ dī.', meaning: 'Alasan utama dia menentang cara ini adalah efisiensinya rendah.' },
      { hanzi: '阅读时要注意作者的观点。', pinyin: 'Yuè dú shí yào zhù yì zuò zhě de guān diǎn.', meaning: 'Saat membaca, perhatikan sudut pandang penulis.' },
    ],
    quiz: [
      { question: '态度 berarti...', options: ['sikap', 'lingkungan', 'rapat'], answer: 'sikap' },
      { question: '支持 dan 反对 berarti...', options: ['mendukung dan menentang', 'besar dan kecil', 'sebelum dan sesudah'], answer: 'mendukung dan menentang' },
    ],
  },
  {
    goal: 'Tulis paragraf sebab-akibat dengan 因此, 导致, dan 结果.',
    vocabulary: [
      { hanzi: '导致', pinyin: 'dǎozhì', meaning: 'menyebabkan' },
      { hanzi: '结果', pinyin: 'jiéguǒ', meaning: 'hasil/akibat' },
      { hanzi: '原因', pinyin: 'yuányīn', meaning: 'penyebab' },
      { hanzi: '变化', pinyin: 'biànhuà', meaning: 'perubahan' },
      { hanzi: '严重', pinyin: 'yánzhòng', meaning: 'serius/parah' },
      { hanzi: '因此', pinyin: 'yīncǐ', meaning: 'oleh karena itu' },
    ],
    examples: [
      { hanzi: '长时间看手机会导致眼睛不舒服。', pinyin: 'Cháng shí jiān kàn shǒu jī huì dǎo zhì yǎn jīng bù shū fú.', meaning: 'Melihat ponsel terlalu lama dapat menyebabkan mata tidak nyaman.' },
      { hanzi: '这个问题越来越严重，因此需要改变。', pinyin: 'Zhè ge wèn tí yuè lái yuè yán zhòng, yīn cǐ xū yào gǎi biàn.', meaning: 'Masalah ini semakin serius, oleh karena itu perlu perubahan.' },
      { hanzi: '原因和结果都很清楚。', pinyin: 'Yuán yīn hé jié guǒ dōu hěn qīng chǔ.', meaning: 'Penyebab dan hasilnya sama-sama jelas.' },
    ],
    quiz: [
      { question: '导致 berarti...', options: ['menyebabkan', 'menghormati', 'menyimpan'], answer: 'menyebabkan' },
      { question: '严重 berarti...', options: ['serius/parah', 'praktis', 'murah'], answer: 'serius/parah' },
    ],
  },
  {
    goal: 'Presentasikan data sederhana dengan 百分比, 增加, 减少.',
    vocabulary: [
      { hanzi: '数据', pinyin: 'shùjù', meaning: 'data' },
      { hanzi: '百分比', pinyin: 'bǎifēnbǐ', meaning: 'persentase' },
      { hanzi: '增加', pinyin: 'zēngjiā', meaning: 'meningkat/menambah' },
      { hanzi: '减少', pinyin: 'jiǎnshǎo', meaning: 'berkurang/mengurangi' },
      { hanzi: '大约', pinyin: 'dàyuē', meaning: 'sekitar/kira-kira' },
      { hanzi: '说明', pinyin: 'shuōmíng', meaning: 'menjelaskan/menunjukkan' },
    ],
    examples: [
      { hanzi: '这个数据说明学习人数增加了。', pinyin: 'Zhè ge shù jù shuō míng xué xí rén shù zēng jiā le.', meaning: 'Data ini menunjukkan jumlah pelajar meningkat.' },
      { hanzi: '大约百分之三十的学生每天练习。', pinyin: 'Dà yuē bǎi fēn zhī sān shí de xué shēng měi tiān liàn xí.', meaning: 'Sekitar 30 persen siswa berlatih setiap hari.' },
      { hanzi: '错误的数量减少了。', pinyin: 'Cuò wù de shù liàng jiǎn shǎo le.', meaning: 'Jumlah kesalahan berkurang.' },
    ],
    quiz: [
      { question: '数据 berarti...', options: ['data', 'budaya', 'saran'], answer: 'data' },
      { question: '增加 dan 减少 berarti...', options: ['meningkat dan berkurang', 'mendukung dan menentang', 'besar dan kecil'], answer: 'meningkat dan berkurang' },
    ],
  },
  {
    goal: 'Kelola diskusi dengan setuju, tidak setuju, dan kompromi.',
    vocabulary: [
      { hanzi: '同意', pinyin: 'tóngyì', meaning: 'setuju' },
      { hanzi: '不同意', pinyin: 'bù tóngyì', meaning: 'tidak setuju' },
      { hanzi: '看法', pinyin: 'kànfǎ', meaning: 'pandangan' },
      { hanzi: '讨论', pinyin: 'tǎolùn', meaning: 'diskusi' },
      { hanzi: '接受', pinyin: 'jiēshòu', meaning: 'menerima' },
      { hanzi: '改变主意', pinyin: 'gǎibiàn zhǔyì', meaning: 'mengubah pikiran' },
    ],
    examples: [
      { hanzi: '我同意你的看法，但是还需要更多资料。', pinyin: 'Wǒ tóng yì nǐ de kàn fǎ, dàn shì hái xū yào gèng duō zī liào.', meaning: 'Saya setuju dengan pandanganmu, tetapi masih perlu lebih banyak data.' },
      { hanzi: '我不太同意这个决定。', pinyin: 'Wǒ bú tài tóng yì zhè ge jué dìng.', meaning: 'Saya tidak terlalu setuju dengan keputusan ini.' },
      { hanzi: '讨论以后，他改变主意了。', pinyin: 'Tǎo lùn yǐ hòu, tā gǎi biàn zhǔ yì le.', meaning: 'Setelah diskusi, dia berubah pikiran.' },
    ],
    quiz: [
      { question: '看法 berarti...', options: ['pandangan', 'file', 'persentase'], answer: 'pandangan' },
      { question: '不太同意 berarti...', options: ['tidak terlalu setuju', 'sangat setuju', 'belum mengerti'], answer: 'tidak terlalu setuju' },
    ],
  },
  {
    goal: 'Review HSK 4 dengan esai pendek, dialog, dan summary.',
    vocabulary: [
      { hanzi: '复习', pinyin: 'fùxí', meaning: 'review' },
      { hanzi: '总结', pinyin: 'zǒngjié', meaning: 'meringkas' },
      { hanzi: '表达', pinyin: 'biǎodá', meaning: 'mengekspresikan' },
      { hanzi: '逻辑', pinyin: 'luójí', meaning: 'logika' },
      { hanzi: '结构', pinyin: 'jiégòu', meaning: 'struktur' },
      { hanzi: '自然', pinyin: 'zìrán', meaning: 'natural' },
    ],
    examples: [
      { hanzi: '复习的重点是表达清楚、结构自然。', pinyin: 'Fù xí de zhòng diǎn shì biǎo dá qīng chǔ, jié gòu zì rán.', meaning: 'Fokus review adalah ekspresi jelas dan struktur natural.' },
      { hanzi: '写作时要注意逻辑。', pinyin: 'Xiě zuò shí yào zhù yì luó jí.', meaning: 'Saat menulis perlu memperhatikan logika.' },
      { hanzi: '我可以总结一篇短文的主要内容。', pinyin: 'Wǒ kě yǐ zǒng jié yì piān duǎn wén de zhǔ yào nèi róng.', meaning: 'Saya bisa merangkum isi utama sebuah teks pendek.' },
    ],
    quiz: [
      { question: '逻辑 berarti...', options: ['logika', 'polusi', 'menu'], answer: 'logika' },
      { question: '结构 berarti...', options: ['struktur', 'sistem error', 'hobi'], answer: 'struktur' },
    ],
  },
];

// HSK 7-9 lessons share one theme per lesson number; the skill decides the angle.
const postHskSkillFrame: Record<MandarinSkillId, string> = {
  grammar: 'Struktur wacana',
  speaking: 'Seminar',
  listening: 'Kuliah umum',
  reading: 'Bacaan kritis',
  writing: 'Esai akademik',
  vocabulary: 'Kosakata tematik',
  pronunciation: 'Retorika lisan',
};

/** Vocabulary questions for a lesson theme (HSK 5 and HSK 7-9). */
function themeQuestions(level: MandarinLevelId, skillId: MandarinSkillId, lesson: number): ChoiceQuestion[] {
  const theme = getMandarinTheme(level, lesson);
  if (!theme) return [];
  const random = seededRandom(hashSeed('mandarin-theme', level, skillId, lesson));
  const pool = getMandarinLevelThemeWords(level).map((word) => word.meaning);
  return theme.vocabulary
    .map((word) => buildChoiceQuestion(`${word.hanzi} (${word.pinyin}) berarti...`, word.meaning, pool, random))
    .filter((question): question is ChoiceQuestion => question !== null);
}

export function getMandarinLessonPreview(skillId: MandarinSkillId, lesson: number, level: MandarinLevelId = 'beginner') {
  const safeLesson = Math.max(1, Math.min(20, lesson));
  if (level === 'beginner') return beginnerTopics[skillId][safeLesson - 1] ?? `HSK 1 ${skillId} Lesson ${safeLesson}`;
  if (level === 'advanced') return advancedTopics[skillId][safeLesson - 1] ?? `HSK 5 ${skillId} Lesson ${safeLesson}`;
  if (level === 'proficiency') return proficiencyTopics[skillId][safeLesson - 1] ?? `HSK 6 ${skillId} Lesson ${safeLesson}`;
  if (level === 'hsk-7' || level === 'hsk-8' || level === 'hsk-9') {
    const theme = getMandarinTheme(level, safeLesson);
    return theme ? `${postHskSkillFrame[skillId]}: ${theme.title} (${theme.hanzi})` : `${skillId} Lesson ${safeLesson}`;
  }
  return topics[skillId][safeLesson - 1] ?? `Lesson ${safeLesson}`;
}

export function getMandarinLesson(skillId: MandarinSkillId, lesson: number, level: MandarinLevelId): MandarinLesson {
  const generated = buildMandarinLesson(skillId, lesson, level);
  return { ...generated, practice: shuffleQuestionOptions(generated.practice, hashSeed('mandarin', level, skillId, lesson)) };
}

function buildMandarinLesson(skillId: MandarinSkillId, lesson: number, level: MandarinLevelId): MandarinLesson {
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
    { hanzi: '社会现象', pinyin: 'shèhuì xiànxiàng', meaning: 'fenomena sosial' },
    { hanzi: '价值观', pinyin: 'jiàzhíguān', meaning: 'nilai/pandangan hidup' },
    { hanzi: '趋势', pinyin: 'qūshì', meaning: 'tren' },
    { hanzi: '挑战', pinyin: 'tiǎozhàn', meaning: 'tantangan' },
    { hanzi: '优势', pinyin: 'yōushì', meaning: 'keunggulan' },
    { hanzi: '限制', pinyin: 'xiànzhì', meaning: 'batasan' },
    { hanzi: '效率', pinyin: 'xiàolǜ', meaning: 'efisiensi' },
    { hanzi: '承担', pinyin: 'chéngdān', meaning: 'menanggung/memikul' },
    { hanzi: '促进', pinyin: 'cùjìn', meaning: 'mendorong/memajukan' },
    { hanzi: '忽视', pinyin: 'hūshì', meaning: 'mengabaikan' },
    { hanzi: '相反', pinyin: 'xiāngfǎn', meaning: 'sebaliknya' },
    { hanzi: '由此可见', pinyin: 'yóucǐ kějiàn', meaning: 'dari sini dapat terlihat' },
  ];
  const lessonTheme = getMandarinTheme(level, safeLesson);
  const lessonThemeQuiz = themeQuestions(level, skillId, safeLesson);
  const advancedPack = {
    goal: advancedTheme.goal,
    vocabulary: [...(lessonTheme?.vocabulary ?? []), ...advancedCoreVocabulary],
    examples: [
      { hanzi: '这种社会现象反映了人们价值观的变化。', pinyin: 'Zhè zhǒng shè huì xiàn xiàng fǎn yìng le rén men jià zhí guān de biàn huà.', meaning: 'Fenomena sosial ini mencerminkan perubahan nilai masyarakat.' },
      { hanzi: '虽然这种趋势带来了新的机会，但也产生了一些值得注意的挑战。', pinyin: 'Suī rán zhè zhǒng qū shì dài lái le xīn de jī huì, dàn yě chǎn shēng le yì xiē zhí dé zhù yì de tiǎo zhàn.', meaning: 'Walaupun tren ini membawa peluang baru, ia juga menimbulkan tantangan yang perlu diperhatikan.' },
      { hanzi: '由此可见，我们不能只看短期效率，还要考虑长期影响。', pinyin: 'Yóu cǐ kě jiàn, wǒ men bù néng zhī kàn duǎn qī xiào lǜ, hái yào kǎo lǜ cháng qī yǐng xiǎng.', meaning: 'Dari sini terlihat bahwa kita tidak boleh hanya melihat efisiensi jangka pendek, tetapi juga mempertimbangkan dampak jangka panjang.' },
    ],
    quiz: [
      ...lessonThemeQuiz,
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
    { hanzi: '不可否认', pinyin: 'bùkě fǒurèn', meaning: 'tidak dapat disangkal' },
    { hanzi: '归根结底', pinyin: 'guīgēn jiédǐ', meaning: 'pada akhirnya / akar masalahnya' },
    { hanzi: '权衡利弊', pinyin: 'quánhéng lìbì', meaning: 'menimbang untung rugi' },
    { hanzi: '潜在影响', pinyin: 'qiánzài yǐngxiǎng', meaning: 'dampak potensial' },
    { hanzi: '长远来看', pinyin: 'chángyuǎn láikàn', meaning: 'dalam jangka panjang' },
    { hanzi: '结构性问题', pinyin: 'jiégòuxìng wèntí', meaning: 'masalah struktural' },
    { hanzi: '核心矛盾', pinyin: 'héxīn máodùn', meaning: 'kontradiksi inti' },
    { hanzi: '制度安排', pinyin: 'zhìdù ānpái', meaning: 'pengaturan institusional' },
    { hanzi: '舆论', pinyin: 'yúlùn', meaning: 'opini publik' },
    { hanzi: '韧性', pinyin: 'rènxìng', meaning: 'resiliensi/daya lenting' },
    { hanzi: '取舍', pinyin: 'qǔshě', meaning: 'trade-off / pilihan mengorbankan sesuatu' },
    { hanzi: '不容忽视', pinyin: 'bùróng hūshì', meaning: 'tidak boleh diabaikan' },
  ];
  const proficiencyThemeVocabulary: MandarinLesson['vocabulary'][] = [
    [
      { hanzi: '公共信任', pinyin: 'gōnggòng xìnrèn', meaning: 'kepercayaan publik' },
      { hanzi: '合法性', pinyin: 'héfǎxìng', meaning: 'legitimasi' },
      { hanzi: '透明度', pinyin: 'tòumíngdù', meaning: 'transparansi' },
      { hanzi: '问责机制', pinyin: 'wènzé jīzhì', meaning: 'mekanisme akuntabilitas' },
    ],
    [
      { hanzi: '主体性', pinyin: 'zhǔtǐxìng', meaning: 'agency/otonomi subjek' },
      { hanzi: '伦理边界', pinyin: 'lúnlǐ biānjiè', meaning: 'batas etika' },
      { hanzi: '算法偏见', pinyin: 'suànfǎ piānjiàn', meaning: 'bias algoritma' },
      { hanzi: '技术依赖', pinyin: 'jìshù yīlài', meaning: 'ketergantungan teknologi' },
    ],
    [
      { hanzi: '教育公平', pinyin: 'jiàoyù gōngpíng', meaning: 'keadilan pendidikan' },
      { hanzi: '资源分配', pinyin: 'zīyuán fēnpèi', meaning: 'distribusi sumber daya' },
      { hanzi: '阶层流动', pinyin: 'jiēcéng liúdòng', meaning: 'mobilitas kelas sosial' },
      { hanzi: '机会不均', pinyin: 'jīhuì bùjūn', meaning: 'ketidakmerataan peluang' },
    ],
    [
      { hanzi: '可持续性', pinyin: 'kěchíxùxìng', meaning: 'keberlanjutan' },
      { hanzi: '生态成本', pinyin: 'shēngtài chéngběn', meaning: 'biaya ekologis' },
      { hanzi: '代际公平', pinyin: 'dàijì gōngpíng', meaning: 'keadilan antargenerasi' },
      { hanzi: '绿色转型', pinyin: 'lǜsè zhuǎnxíng', meaning: 'transisi hijau' },
    ],
    [
      { hanzi: '舆论引导', pinyin: 'yúlùn yǐndǎo', meaning: 'pengarahan opini publik' },
      { hanzi: '信息茧房', pinyin: 'xìnxī jiǎnfáng', meaning: 'echo chamber informasi' },
      { hanzi: '媒介素养', pinyin: 'méijiè sùyǎng', meaning: 'literasi media' },
      { hanzi: '话语权', pinyin: 'huàyǔ quán', meaning: 'kuasa wacana' },
    ],
    [
      { hanzi: '劳动保障', pinyin: 'láodòng bǎozhàng', meaning: 'perlindungan tenaga kerja' },
      { hanzi: '技能转型', pinyin: 'jìnéng zhuǎnxíng', meaning: 'transformasi keterampilan' },
      { hanzi: '就业弹性', pinyin: 'jiùyè tánxìng', meaning: 'fleksibilitas kerja' },
      { hanzi: '替代风险', pinyin: 'tìdài fēngxiǎn', meaning: 'risiko tergantikan' },
    ],
    [
      { hanzi: '文化传承', pinyin: 'wénhuà chuánchéng', meaning: 'pewarisan budaya' },
      { hanzi: '身份认同', pinyin: 'shēnfèn rèntóng', meaning: 'identitas diri/kolektif' },
      { hanzi: '现代性', pinyin: 'xiàndàixìng', meaning: 'modernitas' },
      { hanzi: '本土语境', pinyin: 'běntǔ yǔjìng', meaning: 'konteks lokal' },
    ],
    [
      { hanzi: '城市治理', pinyin: 'chéngshì zhìlǐ', meaning: 'tata kelola kota' },
      { hanzi: '公共服务', pinyin: 'gōnggòng fúwù', meaning: 'layanan publik' },
      { hanzi: '空间正义', pinyin: 'kōngjiān zhèngyì', meaning: 'keadilan ruang' },
      { hanzi: '基础设施', pinyin: 'jīchǔ shèshī', meaning: 'infrastruktur' },
    ],
    [
      { hanzi: '公共卫生', pinyin: 'gōnggòng wèishēng', meaning: 'kesehatan publik' },
      { hanzi: '个人自由', pinyin: 'gèrén zìyóu', meaning: 'kebebasan individu' },
      { hanzi: '集体利益', pinyin: 'jítǐ lìyì', meaning: 'kepentingan kolektif' },
      { hanzi: '风险沟通', pinyin: 'fēngxiǎn gōutōng', meaning: 'komunikasi risiko' },
    ],
    [
      { hanzi: '风险治理', pinyin: 'fēngxiǎn zhìlǐ', meaning: 'tata kelola risiko' },
      { hanzi: '创新生态', pinyin: 'chuàngxīn shēngtài', meaning: 'ekosistem inovasi' },
      { hanzi: '试错成本', pinyin: 'shìcuò chéngběn', meaning: 'biaya trial-and-error' },
      { hanzi: '监管框架', pinyin: 'jiānguǎn kuàngjià', meaning: 'kerangka regulasi' },
    ],
    [
      { hanzi: '全球化', pinyin: 'quánqiúhuà', meaning: 'globalisasi' },
      { hanzi: '地方能动性', pinyin: 'dìfāng néngdòngxìng', meaning: 'agency lokal' },
      { hanzi: '文化适应', pinyin: 'wénhuà shìyìng', meaning: 'adaptasi budaya' },
      { hanzi: '相互依存', pinyin: 'xiānghù yīcún', meaning: 'saling bergantung' },
    ],
    [
      { hanzi: '制度改革', pinyin: 'zhìdù gǎigé', meaning: 'reformasi institusi' },
      { hanzi: '执行力', pinyin: 'zhíxíng lì', meaning: 'kapasitas eksekusi' },
      { hanzi: '监督体系', pinyin: 'jiāndū tǐxì', meaning: 'sistem pengawasan' },
      { hanzi: '路径依赖', pinyin: 'lùjìng yīlài', meaning: 'path dependency' },
    ],
    [
      { hanzi: '社会流动', pinyin: 'shèhuì liúdòng', meaning: 'mobilitas sosial' },
      { hanzi: '文化资本', pinyin: 'wénhuà zīběn', meaning: 'modal budaya' },
      { hanzi: '阶层固化', pinyin: 'jiēcéng gùhuà', meaning: 'pengerasan kelas sosial' },
      { hanzi: '机会结构', pinyin: 'jīhuì jiégòu', meaning: 'struktur peluang' },
    ],
    [
      { hanzi: '环境正义', pinyin: 'huánjìng zhèngyì', meaning: 'keadilan lingkungan' },
      { hanzi: '污染负担', pinyin: 'wūrǎn fùdān', meaning: 'beban polusi' },
      { hanzi: '补偿机制', pinyin: 'bǔcháng jīzhì', meaning: 'mekanisme kompensasi' },
      { hanzi: '生态责任', pinyin: 'shēngtài zérèn', meaning: 'tanggung jawab ekologis' },
    ],
    [
      { hanzi: '跨文化沟通', pinyin: 'kuà wénhuà gōutōng', meaning: 'komunikasi lintas budaya' },
      { hanzi: '谈判立场', pinyin: 'tánpàn lìchǎng', meaning: 'posisi negosiasi' },
      { hanzi: '共同利益', pinyin: 'gòngtóng lìyì', meaning: 'kepentingan bersama' },
      { hanzi: '误读', pinyin: 'wùdú', meaning: 'salah menafsirkan' },
    ],
    [
      { hanzi: '文献综述', pinyin: 'wénxiàn zōngshù', meaning: 'literature review' },
      { hanzi: '观点整合', pinyin: 'guāndiǎn zhěnghé', meaning: 'integrasi pandangan' },
      { hanzi: '理论框架', pinyin: 'lǐlùn kuàngjià', meaning: 'kerangka teori' },
      { hanzi: '论证链条', pinyin: 'lùnzhèng liàntiáo', meaning: 'rantai argumentasi' },
    ],
    [
      { hanzi: '批判性阅读', pinyin: 'pīpànxìng yuèdú', meaning: 'critical reading' },
      { hanzi: '证据强度', pinyin: 'zhèngjù qiángdù', meaning: 'kekuatan bukti' },
      { hanzi: '逻辑漏洞', pinyin: 'luójí lòudòng', meaning: 'celah logika' },
      { hanzi: '隐含假设', pinyin: 'yǐnhán jiǎshè', meaning: 'asumsi implisit' },
    ],
    [
      { hanzi: '战略建议', pinyin: 'zhànlüè jiànyì', meaning: 'rekomendasi strategis' },
      { hanzi: '执行摘要', pinyin: 'zhíxíng zhāiyào', meaning: 'executive summary' },
      { hanzi: '优先级', pinyin: 'yōuxiān jí', meaning: 'prioritas' },
      { hanzi: '关键风险', pinyin: 'guānjiàn fēngxiǎn', meaning: 'risiko kunci' },
    ],
    [
      { hanzi: '修辞策略', pinyin: 'xiūcí cèlüè', meaning: 'strategi retorika' },
      { hanzi: '语气控制', pinyin: 'yǔqì kòngzhì', meaning: 'kontrol nada bicara' },
      { hanzi: '节奏安排', pinyin: 'jiézòu ānpái', meaning: 'pengaturan ritme' },
      { hanzi: '强调焦点', pinyin: 'qiángdiào jiāodiǎn', meaning: 'fokus penekanan' },
    ],
    [
      { hanzi: '综合能力', pinyin: 'zōnghé nénglì', meaning: 'kemampuan terpadu' },
      { hanzi: '成果展示', pinyin: 'chéngguǒ zhǎnshì', meaning: 'presentasi hasil' },
      { hanzi: '反思日志', pinyin: 'fǎnsī rìzhì', meaning: 'jurnal refleksi' },
      { hanzi: '持续改进', pinyin: 'chíxù gǎijìn', meaning: 'perbaikan berkelanjutan' },
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
      { hanzi: '不可否认，技术进步为社会带来了前所未有的便利，但其潜在影响同样不容忽视。', pinyin: 'Bù kě fǒu rèn, jì shù jìn bù wèi shè huì dài lái le qián suǒ wèi yǒu de biàn lì, dàn qí qián zài yǐng xiǎng tóng yàng bù róng hū shì.', meaning: 'Tidak dapat disangkal, kemajuan teknologi membawa kemudahan yang belum pernah ada, tetapi dampak potensialnya juga tidak boleh diabaikan.' },
      { hanzi: '从长远来看，真正的挑战并不在于资源不足，而在于制度安排是否能够回应结构性问题。', pinyin: 'Cóng cháng yuǎn lái kàn, zhēn zhèng de tiǎo zhàn bìng bú zài yú zī yuán bù zú, ér zài yú zhì dù ān pái shì fǒu néng gòu huí yìng jié gòu xìng wèn tí.', meaning: 'Dalam jangka panjang, tantangan sebenarnya bukan kekurangan sumber daya, melainkan apakah pengaturan institusional mampu merespons masalah struktural.' },
      { hanzi: '归根结底，公共政策需要在效率、公平和社会韧性之间权衡利弊。', pinyin: 'Guī gēn jié dǐ, gōng gòng zhèng cè xū yào zài xiào lǜ, gōng píng hé shè huì rèn xìng zhī jiān quán héng lì bì.', meaning: 'Pada akhirnya, kebijakan publik perlu menimbang untung-rugi antara efisiensi, keadilan, dan resiliensi sosial.' },
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
          { hanzi: '学术语境', pinyin: 'xuéshù yǔjìng', meaning: 'konteks akademik' },
          { hanzi: '跨文本综合', pinyin: 'kuà wénběn zōnghé', meaning: 'sintesis lintas teks' },
          { hanzi: '理论视角', pinyin: 'lǐlùn shìjiǎo', meaning: 'perspektif teori' },
          { hanzi: '论证有效性', pinyin: 'lùnzhèng yǒuxiàoxìng', meaning: 'validitas argumen' },
          { hanzi: '概念界定', pinyin: 'gàiniàn jièdìng', meaning: 'definisi konsep' },
          { hanzi: '反例', pinyin: 'fǎnlì', meaning: 'counterexample' },
        ],
        modelTitle: 'Model seminar HSK 7',
        taskScale: 'esai 500-650 Hanzi atau presentasi seminar 4 menit',
      }
    : isHsk8
    ? {
        code: 'HSK 8',
        goal: 'Bangun analisis scholar: metodologi, bukti empiris, implikasi kebijakan, dan kritik sumber.',
        vocabulary: [
          { hanzi: '研究范式', pinyin: 'yánjiū fànshì', meaning: 'paradigma riset' },
          { hanzi: '政策含义', pinyin: 'zhèngcè hányì', meaning: 'implikasi kebijakan' },
          { hanzi: '方法论', pinyin: 'fāngfǎlùn', meaning: 'metodologi' },
          { hanzi: '实证依据', pinyin: 'shízhèng yījù', meaning: 'bukti empiris' },
          { hanzi: '规范性判断', pinyin: 'guīfànxìng pànduàn', meaning: 'penilaian normatif' },
          { hanzi: '知识生产', pinyin: 'zhīshi shēngchǎn', meaning: 'produksi pengetahuan' },
        ],
        modelTitle: 'Model policy paper HSK 8',
        taskScale: 'policy paper 650-800 Hanzi atau briefing profesional 5 menit',
      }
    : {
        code: 'HSK 9',
        goal: 'Capai mastery akademik: argumen orisinal, rekonstruksi konsep, analisis wacana, dan sintesis multidisipliner.',
        vocabulary: [
          { hanzi: '原创性论点', pinyin: 'yuánchuàngxìng lùndiǎn', meaning: 'argumen orisinal' },
          { hanzi: '跨学科综合', pinyin: 'kuà xuékē zōnghé', meaning: 'sintesis multidisipliner' },
          { hanzi: '修辞控制', pinyin: 'xiūcí kòngzhì', meaning: 'kontrol retorika' },
          { hanzi: '概念重构', pinyin: 'gàiniàn zhònggòu', meaning: 'rekonstruksi konsep' },
          { hanzi: '话语分析', pinyin: 'huàyǔ fēnxī', meaning: 'analisis wacana' },
          { hanzi: '范式转换', pinyin: 'fànshì zhuǎnhuàn', meaning: 'pergeseran paradigma' },
        ],
        modelTitle: 'Model academic mastery HSK 9',
        taskScale: 'esai akademik 800-1000 Hanzi atau colloquium talk 6 menit',
      };
  const postHskPack = {
    goal: `${postHskConfig.goal} Topik lesson: ${topic}.`,
    vocabulary: [...(lessonTheme?.vocabulary ?? []), ...postHskConfig.vocabulary, ...proficiencyPack.vocabulary],
    examples: [
      {
        hanzi: `在${postHskConfig.code}阶段，学习者需要围绕“${topic}”提出更具原创性的论点，并说明其理论意义。`,
        pinyin: `Zai ${postHskConfig.code} jie duan, xue xi zhe xu yao wei rao "${topic}" ti chu geng ju yuan chuang xing de lun dian, bing shuo ming qi li lun yi yi.`,
        meaning: `Pada tahap ${postHskConfig.code}, pelajar perlu mengajukan argumen yang lebih orisinal tentang "${topic}" dan menjelaskan makna teoretisnya.`,
      },
      {
        hanzi: '成熟的表达不只追求复杂，而是能够在复杂之中保持清晰、准确和有说服力。',
        pinyin: 'Chéng shú de biǎo dá bù zhī zhuī qiú fù zá, ér shì néng gòu zài fù zá zhī zhōng bǎo chí qīng xī, zhǔn què hé yǒu shuō fú lì.',
        meaning: 'Ekspresi matang tidak hanya mengejar kompleksitas, tetapi menjaga kejernihan, akurasi, dan daya persuasi di dalam kompleksitas.',
      },
      ...proficiencyPack.examples,
    ],
    quiz: [
      ...lessonThemeQuiz,
      { question: `${postHskConfig.code} output harus menonjolkan...`, options: ['argumen matang dan register akademik', 'sapaan dasar', 'hafalan angka'], answer: 'argumen matang dan register akademik' },
      { question: '原创性论点 berarti...', options: ['argumen orisinal', 'kalimat sapaan', 'jadwal harian'], answer: 'argumen orisinal' },
      ...proficiencyPack.quiz,
    ],
  };

  const beginnerPatterns: Record<MandarinSkillId, MandarinLesson['patterns']> = {
    grammar: [
      { label: 'SVO dasar', hanzi: '我学中文。', pinyin: 'Wǒ xué zhōng wén.', meaning: 'Saya belajar Mandarin.' },
      { label: 'Pertanyaan 吗', hanzi: '你好吗？', pinyin: 'Nǐ hǎo ma?', meaning: 'Apa kabar? / Apakah kamu baik?' },
      { label: 'Negasi 不', hanzi: '我不是老师。', pinyin: 'Wǒ bú shì lǎo shī.', meaning: 'Saya bukan guru.' },
    ],
    speaking: [
      { label: 'Salam', hanzi: '你好！', pinyin: 'Nǐ hǎo!', meaning: 'Halo!' },
      { label: 'Nama', hanzi: '我叫卡丽娜。', pinyin: 'Wǒ jiào kǎ lì nà.', meaning: 'Nama saya Karina.' },
      { label: 'Asal', hanzi: '我是印尼人。', pinyin: 'Wǒ shì yìn ní rén.', meaning: 'Saya orang Indonesia.' },
    ],
    listening: [
      { label: 'Dengarkan sapaan', hanzi: '你好，再见。', pinyin: 'Nǐ hǎo, zài jiàn.', meaning: 'Halo, sampai jumpa.' },
      { label: 'Dengarkan angka', hanzi: '一，二，三，四，五。', pinyin: 'Yī, èr, sān, sì, wǔ.', meaning: 'Satu sampai lima.' },
      { label: 'Dengarkan tanya', hanzi: '你是学生吗？', pinyin: 'Nǐ shì xué shēng ma?', meaning: 'Apakah kamu siswa?' },
    ],
    reading: [
      { label: 'Hanzi + pinyin', hanzi: '我 / 你 / 他', pinyin: 'wǒ / nǐ / tā', meaning: 'saya / kamu / dia laki-laki' },
      { label: 'Sapaan tertulis', hanzi: '你好', pinyin: 'nǐhǎo', meaning: 'halo' },
      { label: 'Kalimat pendek', hanzi: '他是老师。', pinyin: 'Tā shì lǎo shī.', meaning: 'Dia guru.' },
    ],
    writing: [
      { label: 'Stroke dasar', hanzi: '一 二 三', pinyin: 'yī èr sān', meaning: 'satu, dua, tiga' },
      { label: 'Tulis identitas', hanzi: '我是学生。', pinyin: 'Wǒ shì xué shēng.', meaning: 'Saya siswa.' },
      { label: 'Tulis suka', hanzi: '我喜欢茶。', pinyin: 'Wǒ xǐ huan chá.', meaning: 'Saya suka teh.' },
    ],
    vocabulary: [
      { label: 'Kata orang', hanzi: '我 你 他', pinyin: 'wǒ nǐ tā', meaning: 'saya, kamu, dia' },
      { label: 'Kata sopan', hanzi: '谢谢 / 不客气', pinyin: 'xiè xiè / bú kè qì', meaning: 'terima kasih / sama-sama' },
      { label: 'Kata belajar', hanzi: '中文 / 学生 / 老师', pinyin: 'zhōng wén / xué shēng / lǎo shī', meaning: 'Mandarin / siswa / guru' },
    ],
    pronunciation: [
      { label: 'Empat nada', hanzi: '妈 麻 马 骂', pinyin: 'mā má mǎ mà', meaning: 'Latihan empat nada ma.' },
      { label: 'Neutral tone', hanzi: '谢谢', pinyin: 'xièxiè', meaning: 'Suku kata kedua ringan/netral.' },
      { label: 'Tone sandhi', hanzi: '你好', pinyin: 'nǐhǎo', meaning: 'Dua nada ketiga, yang pertama terdengar naik.' },
    ],
  };

  const elementaryPatterns: Record<MandarinSkillId, MandarinLesson['patterns']> = {
    grammar: [
      { label: 'Completion with 了', hanzi: '主语 + 动词 + 了 + 宾语', pinyin: 'zhǔ yǔ + dòng cí + liǎo + bīn yǔ', meaning: 'Menandai aksi yang sudah terjadi: Saya sudah melakukan sesuatu.' },
      { label: 'Reason-result', hanzi: '因为...，所以...', pinyin: 'Yīn wèi..., suǒ yǐ...', meaning: 'Karena..., maka/jadi...' },
      { label: 'Comparison', hanzi: 'A + 比 + B + 形容词', pinyin: 'A + bǐ + B + xíng róng cí', meaning: 'A lebih ... daripada B.' },
      { label: 'Degree complement', hanzi: '动词 + 得 + 很好 / 很快 / 很慢', pinyin: 'dòng cí + dé + hěn hǎo / hěn kuài / hěn màn', meaning: 'Menjelaskan bagaimana sebuah aksi dilakukan.' },
    ],
    speaking: [
      { label: 'Making appointment', hanzi: '你明天下午有空吗？', pinyin: 'Nǐ míng tiān xià wǔ yǒu kōng ma?', meaning: 'Apakah kamu punya waktu besok sore?' },
      { label: 'Giving reason', hanzi: '因为我很忙，所以我不能去。', pinyin: 'Yīn wèi wǒ hěn máng, suǒ yǐ wǒ bù néng qù.', meaning: 'Karena saya sibuk, jadi saya tidak bisa pergi.' },
      { label: 'Polite request', hanzi: '请再说一遍。', pinyin: 'Qǐng zài shuō yí biàn.', meaning: 'Tolong katakan sekali lagi.' },
      { label: 'Suggestion with 吧', hanzi: '我们一起去吧。', pinyin: 'Wǒ men yì qǐ qù ba.', meaning: 'Ayo kita pergi bersama.' },
    ],
    listening: [
      { label: 'Listen for time', hanzi: '明天下午三点见。', pinyin: 'Míng tiān xià wǔ sān diǎn jiàn.', meaning: 'Dengarkan kata waktu: besok sore jam tiga.' },
      { label: 'Listen for reason', hanzi: '因为下雨，所以我不出去。', pinyin: 'Yīn wèi xià yǔ, suǒ yǐ wǒ bù chū qù.', meaning: 'Dengarkan hubungan sebab-akibat.' },
      { label: 'Listen for completed action', hanzi: '他已经回家了。', pinyin: 'Tā yǐ jīng huí jiā le.', meaning: 'Dengarkan tanda aksi selesai.' },
      { label: 'Listen for location', hanzi: '商店在学校左边。', pinyin: 'Shāng diàn zài xué xiào zuǒ biān.', meaning: 'Dengarkan lokasi dan arah.' },
    ],
    reading: [
      { label: 'Find main detail', hanzi: '根据短文，他明天去学校。', pinyin: 'Gēn jù duǎn wén, tā míng tiān qù xué xiào.', meaning: 'Berdasarkan teks pendek, cari waktu dan tempat.' },
      { label: 'Read cause-effect', hanzi: '因为天气很热，所以他不想出去。', pinyin: 'Yīn wèi tiān qì hěn rè, suǒ yǐ tā bù xiǎng chū qù.', meaning: 'Baca alasan dan hasil.' },
      { label: 'Read experience', hanzi: '我去过北京。', pinyin: 'Wǒ qù guò běi jīng.', meaning: 'Saya pernah pergi ke Beijing.' },
      { label: 'Read comparison', hanzi: '这个手机比那个手机新。', pinyin: 'Zhè ge shǒu jī bǐ nà ge shǒu jī xīn.', meaning: 'Ponsel ini lebih baru daripada ponsel itu.' },
    ],
    writing: [
      { label: 'Daily paragraph', hanzi: '我每天早上七点起床，然后去学校。', pinyin: 'Wǒ měi tiān zǎo shàng qī diǎn qǐ chuáng, rán hòu qù xué xiào.', meaning: 'Saya bangun jam tujuh setiap pagi, lalu pergi ke sekolah.' },
      { label: 'Reason sentence', hanzi: '因为我想学中文，所以我每天练习。', pinyin: 'Yīn wèi wǒ xiǎng xué zhōng wén, suǒ yǐ wǒ měi tiān liàn xí.', meaning: 'Karena saya ingin belajar Mandarin, jadi saya berlatih setiap hari.' },
      { label: 'Experience sentence', hanzi: '我吃过中国菜。', pinyin: 'Wǒ chī guò zhōng guó cài.', meaning: 'Saya pernah makan masakan China.' },
      { label: 'Short message', hanzi: '我会晚一点到，请等我。', pinyin: 'Wǒ huì wǎn yì diǎn dào, qǐng děng wǒ.', meaning: 'Saya akan tiba agak terlambat, tolong tunggu saya.' },
    ],
    vocabulary: [
      { label: 'Time collocation', hanzi: '早上起床 / 下午见面 / 晚上复习', pinyin: 'zǎo shàng qǐ chuáng / xià wǔ jiàn miàn / wǎn shàng fù xí', meaning: 'bangun pagi / bertemu sore / review malam' },
      { label: 'Daily verb-object', hanzi: '吃早饭 / 看电影 / 坐车 / 买东西', pinyin: 'chī zǎo fàn / kàn diàn yǐng / zuò chē / mǎi dōng xī', meaning: 'sarapan / menonton film / naik kendaraan / belanja' },
      { label: 'Reason words', hanzi: '因为 / 所以 / 但是 / 也 / 都', pinyin: 'yīn wèi / suǒ yǐ / dàn shì / yě / dōu', meaning: 'karena / jadi / tetapi / juga / semua' },
      { label: 'Direction words', hanzi: '左边 / 右边 / 前面 / 后面', pinyin: 'zuǒ biān / yòu biān / qián miàn / hòu miàn', meaning: 'kiri / kanan / depan / belakang' },
    ],
    pronunciation: [
      { label: 'Tone flow in HSK 2', hanzi: '因为我很忙，所以我不能去。', pinyin: 'Yīn wèi wǒ hěn máng, suǒ yǐ wǒ bù néng qù.', meaning: 'Latih aliran nada dalam kalimat sebab-akibat.' },
      { label: 'Third tone sandhi', hanzi: '我很好。', pinyin: 'Wǒ hěn hǎo.', meaning: 'Beberapa nada ketiga berurutan perlu dibaca natural.' },
      { label: 'Neutral tone words', hanzi: '妈妈 / 朋友 / 什么', pinyin: 'mā ma / péng yǒu / shén me', meaning: 'Suku kata kedua ringan pada kata umum.' },
      { label: 'Chunking sentence', hanzi: '我吃早饭以后 / 去学校。', pinyin: 'Wǒ chī zǎo fàn yǐ hòu / qù xué xiào.', meaning: 'Pisahkan kalimat berdasarkan unit makna.' },
    ],
  };

  const intermediatePatterns: Record<MandarinSkillId, MandarinLesson['patterns']> = {
    grammar: [
      { label: '把 sentence', hanzi: '主语 + 把 + 宾语 + 动词 + 结果', pinyin: 'zhǔ yǔ + bǎ + bīn yǔ + dòng cí + jié guǒ', meaning: 'Menekankan objek yang dipindah/diubah oleh aksi.' },
      { label: '被 passive', hanzi: '主语 + 被 + 人 + 动词 + 了', pinyin: 'zhǔ yǔ + bèi + rén + dòng cí + liǎo', meaning: 'Subjek mengalami aksi dari orang lain.' },
      { label: '一边...一边...', hanzi: '一边听音乐，一边做作业。', pinyin: 'Yì biān tīng yīn yuè, yì biān zuò zuò yè.', meaning: 'Melakukan dua aktivitas bersamaan.' },
      { label: '除了...以外，还...', hanzi: '除了中文以外，我还学英语。', pinyin: 'Chú le zhōng wén yǐ wài, wǒ hái xué yīng yǔ.', meaning: 'Selain..., juga...' },
    ],
    speaking: [
      { label: 'Giving opinion', hanzi: '我觉得...，因为...', pinyin: 'Wǒ jué de..., yīn wèi...', meaning: 'Saya berpendapat..., karena...' },
      { label: 'Planning', hanzi: '我打算周末去旅行。', pinyin: 'Wǒ dǎ suàn zhōu mò qù lǚ xíng.', meaning: 'Saya berencana bepergian akhir pekan.' },
      { label: 'Suggestion', hanzi: '你应该试试这个办法。', pinyin: 'Nǐ yīng gāi shì shì zhè ge bàn fǎ.', meaning: 'Kamu seharusnya mencoba cara ini.' },
      { label: 'Summary', hanzi: '重点是每天练习。', pinyin: 'Zhòng diǎn shì měi tiān liàn xí.', meaning: 'Poin pentingnya adalah latihan setiap hari.' },
    ],
    listening: [
      { label: 'Listen for result complement', hanzi: '你听懂了吗？', pinyin: 'Nǐ tīng dǒng le ma?', meaning: 'Dengarkan hasil dari aksi: sudah paham atau belum.' },
      { label: 'Listen for passive', hanzi: '钱包被人拿走了。', pinyin: 'Qián bāo bèi rén ná zǒu le.', meaning: 'Dengarkan siapa/apa yang mengalami aksi.' },
      { label: 'Listen for sequence', hanzi: '先...然后...最后...', pinyin: 'Xiān... rán hòu... zuì hòu...', meaning: 'Dengarkan urutan kejadian.' },
      { label: 'Listen for comparison', hanzi: '现在比以前清楚。', pinyin: 'Xiàn zài bǐ yǐ qián qīng chǔ.', meaning: 'Dengarkan perubahan dibanding sebelumnya.' },
    ],
    reading: [
      { label: 'Main content', hanzi: '这段话的主要内容是...', pinyin: 'Zhè duàn huà de zhǔ yào nèi róng shì...', meaning: 'Isi utama paragraf ini adalah...' },
      { label: 'Sequence markers', hanzi: '先...然后...最后...', pinyin: 'Xiān... rán hòu... zuì hòu...', meaning: 'Tanda urutan dalam teks.' },
      { label: 'Cause and suggestion', hanzi: '因为...，所以应该...', pinyin: 'Yīn wèi..., suǒ yǐ yīng gāi...', meaning: 'Alasan dan saran dalam satu paragraf.' },
      { label: 'Experience and change', hanzi: '以前...，现在越来越...', pinyin: 'Yǐ qián..., xiàn zài yuè lái yuè...', meaning: 'Dulu..., sekarang semakin...' },
    ],
    writing: [
      { label: 'Opinion paragraph', hanzi: '我觉得...。第一，...。第二，...。所以...', pinyin: 'Wǒ jué de.... dì yī,.... dì èr,.... suǒ yǐ...', meaning: 'Struktur paragraf opini sederhana.' },
      { label: 'Experience paragraph', hanzi: '以前我...，后来...，现在...', pinyin: 'Yǐ qián wǒ..., hòu lái..., xiàn zài...', meaning: 'Urutan pengalaman: dulu, kemudian, sekarang.' },
      { label: 'Plan paragraph', hanzi: '我打算...，因为...。如果...，我就...', pinyin: 'Wǒ dǎ suàn..., yīn wèi.... rú guǒ..., wǒ jiù...', meaning: 'Rencana dengan alasan dan kondisi.' },
      { label: 'Message format', hanzi: '不好意思，我会晚一点到。请等我。', pinyin: 'Bù hǎo yì si, wǒ huì wǎn yì diǎn dào. qǐng děng wǒ.', meaning: 'Pesan pendek dengan alasan/respons.' },
    ],
    vocabulary: [
      { label: 'Opinion set', hanzi: '觉得 / 认为 / 方法 / 进步 / 目标', pinyin: 'jué de / rèn wéi / fāng fǎ / jìn bù / mù biāo', meaning: 'kata untuk opini dan target belajar' },
      { label: 'Result complements', hanzi: '听懂 / 做完 / 找到 / 写好 / 看见', pinyin: 'tīng dǒng / zuò wán / zhǎo dào / xiě hǎo / kàn jiàn', meaning: 'hasil dari aksi' },
      { label: 'Sequence words', hanzi: '先 / 然后 / 最后 / 以前 / 以后', pinyin: 'xiān / rán hòu / zuì hòu / yǐ qián / yǐ hòu', meaning: 'urutan waktu' },
      { label: 'Problem-solution', hanzi: '问题 / 麻烦 / 办法 / 建议 / 解决', pinyin: 'wèn tí / má fán / bàn fǎ / jiàn yì / jiě jué', meaning: 'masalah dan solusi' },
    ],
    pronunciation: [
      { label: 'Long sentence chunking', hanzi: '因为我很忙 / 所以我不能去。', pinyin: 'Yīn wèi wǒ hěn máng / suǒ yǐ wǒ bù néng qù.', meaning: 'Pisahkan klausa sebab dan akibat.' },
      { label: 'Result complement rhythm', hanzi: '你听懂了吗？', pinyin: 'Nǐ tīng dǒng le ma?', meaning: 'Tekankan hasil: 懂.' },
      { label: '把 sentence rhythm', hanzi: '请把书放在桌子上。', pinyin: 'Qǐng bǎ shū fàng zài zhuō zi shàng.', meaning: 'Chunk: 把 + objek + aksi + lokasi.' },
      { label: 'Natural speed', hanzi: '除了中文以外，我还学英语。', pinyin: 'Chú le zhōng wén yǐ wài, wǒ hái xué yīng yǔ.', meaning: 'Latih jeda natural setelah 以外.' },
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
      { label: '不但...而且...', hanzi: '学习中文不但能提高语言能力，而且能增加交流机会。', pinyin: 'Xué xí zhōng wén bú dàn néng tí gāo yǔ yán néng lì, ér qiě néng zēng jiā jiāo liú jī huì.', meaning: 'Tidak hanya meningkatkan kemampuan bahasa, tetapi juga menambah kesempatan komunikasi.' },
      { label: '既...又...', hanzi: '这个方法既实用又有效。', pinyin: 'Zhè ge fāng fǎ jì shí yòng yòu yǒu xiào.', meaning: 'Metode ini praktis sekaligus efektif.' },
      { label: '连...都...', hanzi: '他太紧张了，连简单的问题都答错了。', pinyin: 'Tā tài jǐn zhāng le, lián jiǎn dān de wèn tí dōu dá cuò le.', meaning: 'Dia terlalu gugup, bahkan pertanyaan mudah pun salah dijawab.' },
      { label: '与其...不如...', hanzi: '与其担心考试，不如每天认真复习。', pinyin: 'Yǔ qí dān xīn kǎo shì, bù rú měi tiān rèn zhēn fù xí.', meaning: 'Daripada khawatir ujian, lebih baik review serius setiap hari.' },
    ],
    speaking: [
      { label: 'Structured opinion', hanzi: '我认为...，主要原因有两个。', pinyin: 'Wǒ rèn wéi..., zhǔ yào yuán yīn yǒu liǎng gè.', meaning: 'Menurut saya..., ada dua alasan utama.' },
      { label: 'Partial agreement', hanzi: '我同意你的看法，不过我还想补充一点。', pinyin: 'Wǒ tóng yì nǐ de kàn fǎ, bú guò wǒ hái xiǎng bǔ chōng yì diǎn.', meaning: 'Saya setuju dengan pandanganmu, tetapi ingin menambahkan satu hal.' },
      { label: 'Give evidence', hanzi: '根据这个数据，我们可以看出...', pinyin: 'Gēn jù zhè ge shù jù, wǒ men kě yǐ kàn chū...', meaning: 'Berdasarkan data ini, kita bisa melihat...' },
      { label: 'Close politely', hanzi: '总之，我觉得这个办法比较可行。', pinyin: 'Zǒng zhī, wǒ jué de zhè ge bàn fǎ bǐ jiào kě xíng.', meaning: 'Kesimpulannya, saya merasa cara ini cukup layak.' },
    ],
    listening: [
      { label: 'Listen for stance', hanzi: '作者支持这个观点，因为...', pinyin: 'Zuò zhě zhī chí zhè ge guān diǎn, yīn wèi...', meaning: 'Dengarkan apakah pembicara mendukung atau menentang.' },
      { label: 'Listen for contrast', hanzi: '虽然...，但是...', pinyin: 'Suī rán..., dàn shì...', meaning: 'Tangkap kontras antara dua klausa.' },
      { label: 'Listen for data', hanzi: '大约百分之三十的人选择这个方法。', pinyin: 'Dà yuē bǎi fēn zhī sān shí de rén xuǎn zé zhè ge fāng fǎ.', meaning: 'Tangkap angka dan persentase.' },
      { label: 'Listen for emphasis', hanzi: '连初学者都能理解。', pinyin: 'Lián chū xué zhě dōu néng lǐ jiě.', meaning: '连...都... memberi penekanan.' },
    ],
    reading: [
      { label: 'Author attitude', hanzi: '作者的态度比较明显。', pinyin: 'Zuò zhě de tài dù bǐ jiào míng xiǎn.', meaning: 'Identifikasi sikap penulis.' },
      { label: 'Cause-result chain', hanzi: '这个变化导致了新的问题。', pinyin: 'Zhè ge biàn huà dǎo zhì le xīn de wèn tí.', meaning: 'Cari penyebab dan akibat.' },
      { label: 'Data trend', hanzi: '数据说明人数增加了。', pinyin: 'Shù jù shuō míng rén shù zēng jiā le.', meaning: 'Baca data dan tren.' },
      { label: 'Argument markers', hanzi: '首先...其次...总之...', pinyin: 'Shǒu xiān... qí cì... zǒng zhī...', meaning: 'Gunakan penanda untuk memahami struktur teks.' },
    ],
    writing: [
      { label: 'Opinion paragraph', hanzi: '我认为...。首先，...。其次，...。因此，...。', pinyin: 'Wǒ rèn wéi.... shǒu xiān,.... qí cì,.... yīn cǐ,....', meaning: 'Struktur paragraf opini HSK 4.' },
      { label: 'Cause-effect paragraph', hanzi: '这个问题的原因是...，结果导致...。', pinyin: 'Zhè ge wèn tí de yuán yīn shì..., jié guǒ dǎo zhì....', meaning: 'Tulis penyebab dan akibat dengan jelas.' },
      { label: 'Compare choices', hanzi: '与其选择A，不如选择B，因为...', pinyin: 'Yǔ qí xuǎn zé A, bù rú xuǎn zé B, yīn wèi...', meaning: 'Bandingkan dua pilihan dengan alasan.' },
      { label: 'Data description', hanzi: '数据显示，...增加了，而...减少了。', pinyin: 'Shù jù xiǎn shì,... zēng jiā le, ér... jiǎn shǎo le.', meaning: 'Deskripsikan data sederhana.' },
    ],
    vocabulary: [
      { label: 'Argument set', hanzi: '认为 / 观点 / 理由 / 因此 / 总之', pinyin: 'rèn wéi / guān diǎn / lǐ yóu / yīn cǐ / zǒng zhī', meaning: 'kosakata untuk argumen' },
      { label: 'Society topics', hanzi: '环境 / 科技 / 文化 / 社会 / 服务', pinyin: 'huán jìng / kē jì / wén huà / shè huì / fú wù', meaning: 'topik sosial HSK 4' },
      { label: 'Data verbs', hanzi: '增加 / 减少 / 导致 / 说明 / 改善', pinyin: 'zēng jiā / jiǎn shǎo / dǎo zhì / shuō míng / gǎi shàn', meaning: 'kata kerja untuk tren dan hasil' },
      { label: 'Nuance words', hanzi: '尽量 / 避免 / 及时 / 明显 / 可行', pinyin: 'jǐn liàng / bì miǎn / jí shí / míng xiǎn / kě xíng', meaning: 'kata bernuansa untuk saran dan evaluasi' },
    ],
    pronunciation: [
      { label: 'Argument chunking', hanzi: '我认为 / 学习语言的关键 / 不是时间长 / 而是效率高。', pinyin: 'Wǒ rèn wéi / xué xí yǔ yán de guān jiàn / bú shì shí jiān cháng / ér shì xiào lǜ gāo.', meaning: 'Bagi kalimat panjang menjadi unit argumen.' },
      { label: 'Contrast stress', hanzi: '不是...而是...', pinyin: 'Bú shì... ér shì...', meaning: 'Tekankan kontras pada 而是.' },
      { label: 'Data rhythm', hanzi: '大约百分之三十。', pinyin: 'Dà yuē bǎi fēn zhī sān shí.', meaning: 'Baca angka dan persentase dengan stabil.' },
      { label: 'Emphasis with 连...都...', hanzi: '连初学者都能理解。', pinyin: 'Lián chū xué zhě dōu néng lǐ jiě.', meaning: 'Tekankan unsur setelah 连.' },
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
      { question: 'Untuk membuka argumen HSK 4, frasa yang kuat adalah...', options: ['我认为...主要原因有两个', 'wǒ rèn wéi... zhǔ yào yuán yīn yǒu liǎng gè', '多少钱'], answer: '我认为...主要原因有两个' },
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
      { hanzi: '我是学生。', pinyin: 'Wǒ shì xué shēng.', meaning: 'Saya siswa.' },
      { hanzi: '你是老师吗？', pinyin: 'Nǐ shì lǎo shī ma?', meaning: 'Apakah kamu guru?' },
      { hanzi: '我不喝咖啡。', pinyin: 'Wǒ bù hē kā fēi.', meaning: 'Saya tidak minum kopi.' },
    ],
    speaking: [
      { hanzi: '你好，我叫卡丽娜。', pinyin: 'Nǐ hǎo, wǒ jiào kǎ lì nà.', meaning: 'Halo, nama saya Karina.' },
      { hanzi: '我是印尼人，我学中文。', pinyin: 'Wǒ shì yìn ní rén, wǒ xué zhōng wén.', meaning: 'Saya orang Indonesia, saya belajar Mandarin.' },
      { hanzi: '谢谢，再见！', pinyin: 'Xiè xiè, zài jiàn!', meaning: 'Terima kasih, sampai jumpa!' },
    ],
    listening: [
      { hanzi: '请听：你好吗？', pinyin: 'Qǐng tīng: nǐ hǎo ma?', meaning: 'Dengarkan: Apa kabar?' },
      { hanzi: '他说：我是学生。', pinyin: 'Tā shuō: wǒ shì xué shēng.', meaning: 'Dia berkata: Saya siswa.' },
      { hanzi: '一，二，三，四，五。', pinyin: 'Yī, èr, sān, sì, wǔ.', meaning: 'Satu, dua, tiga, empat, lima.' },
    ],
    reading: [
      { hanzi: '你好！我叫王明。', pinyin: 'Nǐ hǎo! wǒ jiào wáng míng.', meaning: 'Halo! Nama saya Wang Ming.' },
      { hanzi: '我是学生。', pinyin: 'Wǒ shì xué shēng.', meaning: 'Saya siswa.' },
      { hanzi: '我喜欢茶。', pinyin: 'Wǒ xǐ huan chá.', meaning: 'Saya suka teh.' },
    ],
    writing: [
      { hanzi: '我叫安娜。', pinyin: 'Wǒ jiào ān nà.', meaning: 'Nama saya Anna.' },
      { hanzi: '我是印尼人。', pinyin: 'Wǒ shì yìn ní rén.', meaning: 'Saya orang Indonesia.' },
      { hanzi: '我学中文。', pinyin: 'Wǒ xué zhōng wén.', meaning: 'Saya belajar Mandarin.' },
    ],
    vocabulary: [
      { hanzi: '学生', pinyin: 'xuéshēng', meaning: 'siswa' },
      { hanzi: '老师', pinyin: 'lǎoshī', meaning: 'guru' },
      { hanzi: '朋友', pinyin: 'péngyǒu', meaning: 'teman' },
    ],
    pronunciation: [
      { hanzi: '妈 麻 马 骂', pinyin: 'mā má mǎ mà', meaning: 'Empat nada dengan syllable ma.' },
      { hanzi: '你好', pinyin: 'nǐhǎo', meaning: 'Latihan third tone sandhi.' },
      { hanzi: '谢谢你', pinyin: 'xièxiè nǐ', meaning: 'Latihan neutral tone dan tone 3.' },
    ],
  };

  const beginnerVocabulary: MandarinLesson['vocabulary'] = [
    { hanzi: '你好', pinyin: 'nǐhǎo', meaning: 'halo' },
    { hanzi: '再见', pinyin: 'zàijiàn', meaning: 'sampai jumpa' },
    { hanzi: '谢谢', pinyin: 'xièxiè', meaning: 'terima kasih' },
    { hanzi: '不客气', pinyin: 'búkèqì', meaning: 'sama-sama' },
    { hanzi: '我', pinyin: 'wǒ', meaning: 'saya' },
    { hanzi: '你', pinyin: 'nǐ', meaning: 'kamu' },
    { hanzi: '他', pinyin: 'tā', meaning: 'dia laki-laki' },
    { hanzi: '她', pinyin: 'tā', meaning: 'dia perempuan' },
    { hanzi: '是', pinyin: 'shì', meaning: 'adalah' },
    { hanzi: '不', pinyin: 'bù', meaning: 'tidak' },
    { hanzi: '吗', pinyin: 'ma', meaning: 'partikel tanya' },
    { hanzi: '叫', pinyin: 'jiào', meaning: 'dipanggil/bernama' },
    { hanzi: '学生', pinyin: 'xuéshēng', meaning: 'siswa' },
    { hanzi: '老师', pinyin: 'lǎoshī', meaning: 'guru' },
    { hanzi: '中文', pinyin: 'zhōngwén', meaning: 'bahasa Mandarin' },
    { hanzi: '中国', pinyin: 'zhōngguó', meaning: 'China' },
    { hanzi: '印尼', pinyin: 'yìnní', meaning: 'Indonesia' },
    { hanzi: '一', pinyin: 'yī', meaning: 'satu' },
    { hanzi: '二', pinyin: 'èr', meaning: 'dua' },
    { hanzi: '三', pinyin: 'sān', meaning: 'tiga' },
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
      { question: 'Respons sopan untuk menyatakan pendapat adalah...', options: ['我觉得...', 'Wǒ jué de...', '一个'], answer: '我觉得...' },
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
      { question: 'Paragraf opini sederhana bisa memakai...', options: ['我认为...因为...', 'Wǒ rèn wéi... yīn wèi...', '一二三'], answer: '我认为...因为...' },
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
      { question: 'Pada result complement 听懂, tekanan makna ada pada...', options: ['懂', 'dǒng', '吗'], answer: '懂' },
      { question: '在 把 sentence, chunk yang natural adalah...', options: ['把 + objek + aksi + hasil/lokasi', 'Bǎ + objek + aksi + hasil/lokasi', 'pinyin saja'], answer: '把 + objek + aksi + hasil/lokasi' },
      { question: '除了...以外 perlu jeda natural setelah...', options: ['以外', 'yǐwài', '学'], answer: '以外' },
      { question: 'Shadowing Intermediate menuntut...', options: ['tone stabil, jeda jelas, dan ritme natural', 'membaca secepat mungkin', 'menghapus pinyin'], answer: 'tone stabil, jeda jelas, dan ritme natural' },
    ],
  };

  const upperIntermediateModelOutput: Record<MandarinSkillId, MandarinLesson['modelOutput']> = {
    grammar: {
      title: 'Model analisis pola HSK 4',
      hanzi: '我认为学习语言的关键不是时间长，而是方法合适。与其每天背很多生词，不如把常用词放进真实句子里练习。这样不但能提高记忆效率，而且能让表达更自然。',
      pinyin: 'Wǒ rèn wéi xué xí yǔ yán de guān jiàn bú shì shí jiān cháng, ér shì fāng fǎ hé shì. yǔ qí měi tiān bèi hěn duō shēng cí, bù rú bǎ cháng yòng cí fàng jìn zhēn shí jù zi lǐ liàn xí. zhè yàng bú dàn néng tí gāo jì yì xiào lǜ, ér qiě néng ràng biǎo dá gèng zì rán.',
      meaning: 'Menurut saya, kunci belajar bahasa bukan durasi yang panjang, melainkan metode yang cocok. Daripada menghafal banyak kosakata setiap hari, lebih baik memasukkan kata umum ke kalimat nyata. Dengan begitu, kita tidak hanya meningkatkan efisiensi memori, tetapi juga membuat ekspresi lebih natural.',
    },
    speaking: {
      title: 'Model presentasi 1 menit',
      hanzi: '大家好，今天我想谈谈科技对学习的影响。我认为科技让学习变得更方便，因为我们可以随时找到资料。不过，如果没有清楚的计划，网络也会浪费我们的时间。因此，我建议大家先确定目标，再选择合适的工具。',
      pinyin: 'Dà jiā hǎo, jīn tiān wǒ xiǎng tán tán kē jì duì xué xí de yǐng xiǎng. wǒ rèn wéi kē jì ràng xué xí biàn de gèng fāng biàn, yīn wèi wǒ men kě yǐ suí shí zhǎo dào zī liào. bú guò, rú guǒ méi yǒu qīng chǔ de jì huà, wǎng luò yě huì làng fèi wǒ men de shí jiān. yīn cǐ, wǒ jiàn yì dà jiā xiān què dìng mù biāo, zài xuǎn zé hé shì de gōng jù.',
      meaning: 'Halo semuanya, hari ini saya ingin membahas pengaruh teknologi terhadap belajar. Saya berpendapat teknologi membuat belajar lebih praktis karena kita bisa menemukan materi kapan saja. Namun, jika tidak ada rencana yang jelas, internet juga akan membuang waktu kita. Karena itu, saya menyarankan untuk menentukan target dulu, lalu memilih alat yang cocok.',
    },
    listening: {
      title: 'Model ringkasan listening',
      hanzi: '这段录音主要讨论工作压力。说话人认为压力不一定是坏事，关键是我们怎么处理。首先，要把任务分清楚；其次，要及时和同事沟通。总之，好的合作可以减少压力。',
      pinyin: 'Zhè duàn lù yīn zhǔ yào tǎo lùn gōng zuò yā lì. shuō huà rén rèn wéi yā lì bù yí dìng shì huài shì, guān jiàn shì wǒ men zěn me chǔ lǐ. shǒu xiān, yào bǎ rèn wu fēn qīng chǔ; qí cì, yào jí shí hé tóng shì gōu tōng. zǒng zhī, hǎo de hé zuò kě yǐ jiǎn shǎo yā lì.',
      meaning: 'Audio ini terutama membahas tekanan kerja. Pembicara berpendapat tekanan tidak selalu buruk; kuncinya adalah bagaimana kita menanganinya. Pertama, tugas perlu dipisahkan dengan jelas; kedua, perlu berkomunikasi tepat waktu dengan rekan kerja. Kesimpulannya, kerja sama yang baik dapat mengurangi tekanan.',
    },
    reading: {
      title: 'Model strategi membaca HSK 4',
      hanzi: '阅读这类文章时，先找作者的态度，再找理由和例子。如果文章里出现“因此”“不过”“总之”，这些词通常会帮助我们理解逻辑。最后，用一两句话总结主要观点。',
      pinyin: 'Yuè dú zhè lèi wén zhāng shí, xiān zhǎo zuò zhě de tài dù, zài zhǎo lǐ yóu hé lì zǐ. rú guǒ wén zhāng lǐ chū xiàn"yīn cǐ""bú guò""zǒng zhī", zhè xiē cí tōng cháng huì bāng zhù wǒ men lǐ jiě luó jí. zuì hòu, yòng yì liǎng jù huà zǒng jié zhǔ yào guān diǎn.',
      meaning: 'Saat membaca artikel seperti ini, cari dulu sikap penulis, lalu alasan dan contoh. Jika muncul kata seperti “karena itu”, “namun”, dan “kesimpulannya”, kata-kata ini biasanya membantu memahami logika. Terakhir, rangkum pandangan utama dalam satu atau dua kalimat.',
    },
    writing: {
      title: 'Model paragraf opini HSK 4',
      hanzi: '我认为每天短时间学习比周末一次学很久更有效。首先，短时间学习比较容易坚持。其次，每天复习可以帮助我们避免忘记。比如，我每天用二十分钟听录音、读句子、写三句话。总之，稳定的习惯比临时努力更重要。',
      pinyin: 'Wǒ rèn wèi měi tiān duǎn shí jiān xué xí bǐ zhōu mò yí cì xué hěn jiǔ gèng yǒu xiào. shǒu xiān, duǎn shí jiān xué xí bǐ jiào róng yì jiān chí. qí cì, měi tiān fù xí kě yǐ bāng zhù wǒ men bì miǎn wàng jì. bǐ rú, wǒ měi tiān yòng èr shí fēn zhōng tīng lù yīn, dú jù zǐ, xiě sān jù huà. zǒng zhī, wěn dìng de xí guàn bǐ lín shí nǔ lì gèng zhòng yào.',
      meaning: 'Saya berpendapat belajar singkat setiap hari lebih efektif daripada belajar sangat lama sekali di akhir pekan. Pertama, belajar singkat lebih mudah dipertahankan. Kedua, review harian membantu kita menghindari lupa. Misalnya, saya memakai 20 menit setiap hari untuk mendengarkan rekaman, membaca kalimat, dan menulis tiga kalimat. Kesimpulannya, kebiasaan stabil lebih penting daripada usaha dadakan.',
    },
    vocabulary: {
      title: 'Model word bank bernuansa',
      hanzi: '观点：我认为 / 我的看法是。理由：主要原因是 / 关键是。结果：因此 / 导致 / 说明。建议：最好 / 尽量 / 避免。总结：总之 / 也就是说。',
      pinyin: 'Guān diǎn: wǒ rèn wéi / wǒ de kàn fǎ shì. lǐ yóu: zhǔ yào yuán yīn shì / guān jiàn shì. jié guǒ: yīn cǐ / dǎo zhì / shuō míng. jiàn yì: zuì hǎo / jǐn liàng / bì miǎn. zǒng jié: zǒng zhī / yě jiù shì shuō.',
      meaning: 'Kelompok kata: opini, alasan, hasil, saran, dan kesimpulan. Gunakan sebagai bank frasa untuk speaking dan writing HSK 4.',
    },
    pronunciation: {
      title: 'Model chunking pengucapan',
      hanzi: '我认为 / 学习语言的关键 / 不是时间长 / 而是方法合适。总之 / 稳定的习惯 / 比临时努力 / 更重要。',
      pinyin: 'Wǒ rèn wéi / xué xí yǔ yán de guān jiàn / bú shì shí jiān cháng / ér shì fāng fǎ hé shì. zǒng zhī / wěn dìng de xí guàn / bǐ lín shí nǔ lì / gèng zhòng yào.',
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
      { label: '尽管...仍然...', hanzi: '尽管成本很高，这项政策仍然值得尝试。', pinyin: 'Jǐn guǎn chéng běn hěn gāo, zhè xiàng zhèng cè réng rán zhí dé cháng shì.', meaning: 'Meskipun biayanya tinggi, kebijakan ini tetap layak dicoba.' },
      { label: '一方面...另一方面...', hanzi: '一方面，科技提高了效率；另一方面，它也带来了新的风险。', pinyin: 'Yì fāng miàn, kē jì tí gāo le xiào lǜ; lìng yì fāng miàn, tā yě dài lái le xīn de fēng xiǎn.', meaning: 'Di satu sisi teknologi meningkatkan efisiensi; di sisi lain ia membawa risiko baru.' },
      { label: '之所以...是因为...', hanzi: '人们之所以关注这个问题，是因为它影响了日常生活。', pinyin: 'Rén men zhī suǒ yǐ guān zhù zhè ge wèn tí, shì yīn wèi tā yǐng xiǎng le rì cháng shēng huó.', meaning: 'Alasan orang memperhatikan masalah ini adalah karena ia memengaruhi kehidupan sehari-hari.' },
      { label: '从...角度来看', hanzi: '从长期发展的角度来看，教育改革非常重要。', pinyin: 'Cóng cháng qī fā zhǎn de jiǎo dù lái kàn, jiào yù gǎi gé fēi cháng zhòng yào.', meaning: 'Dari sudut pandang perkembangan jangka panjang, reformasi pendidikan sangat penting.' },
    ],
    speaking: [
      { label: 'Academic opening', hanzi: '关于这个话题，我想从三个方面来分析。', pinyin: 'Guān yú zhè ge huà tí, wǒ xiǎng cóng sān gè fāng miàn lái fēn xī.', meaning: 'Tentang topik ini, saya ingin menganalisis dari tiga sisi.' },
      { label: 'Balanced stance', hanzi: '我不完全反对这个观点，但我认为还需要考虑实际情况。', pinyin: 'Wǒ bù wán quán fǎn duì zhè ge guān diǎn, dàn wǒ rèn wéi hái xū yào kǎo lǜ shí jì qíng kuàng.', meaning: 'Saya tidak sepenuhnya menolak pandangan ini, tetapi situasi nyata tetap perlu dipertimbangkan.' },
      { label: 'Evidence cue', hanzi: '一个明显的例子是...', pinyin: 'Yí gè míng xiǎn de lì zǐ shì...', meaning: 'Contoh yang jelas adalah...' },
      { label: 'Synthesis close', hanzi: '综合来看，最合理的做法是...', pinyin: 'Zōng hé lái kàn, zuì hé lǐ de zuò fǎ shì...', meaning: 'Secara menyeluruh, cara paling masuk akal adalah...' },
    ],
    listening: [
      { label: 'Listen for concession', hanzi: '尽管...但是/仍然...', pinyin: 'Jǐn guǎn... dàn shì / réng rán...', meaning: 'Tangkap konsesi dan posisi akhir pembicara.' },
      { label: 'Listen for viewpoint shift', hanzi: '相反 / 然而 / 不过', pinyin: 'xiāng fǎn / rán ér / bú guò', meaning: 'Penanda perubahan arah argumen.' },
      { label: 'Listen for implied meaning', hanzi: '说话人并没有直接反对，而是提出了限制。', pinyin: 'Shuō huà rén bìng méi yǒu zhí jiē fǎn duì, ér shì tí chū le xiàn zhì.', meaning: 'Pembicara tidak menolak langsung, tetapi menyebut batasan.' },
      { label: 'Listen for conclusion', hanzi: '由此可见 / 总的来说 / 综合来看', pinyin: 'yóu cǐ kě jiàn / zǒng de lái shuō / zōng hé lái kàn', meaning: 'Penanda kesimpulan wacana.' },
    ],
    reading: [
      { label: 'Thesis', hanzi: '文章的核心观点是...', pinyin: 'Wén zhāng de hé xīn guān diǎn shì...', meaning: 'Tesis atau pandangan inti bacaan.' },
      { label: 'Counterargument', hanzi: '有些人认为...，然而作者指出...', pinyin: 'Yǒu xiē rén rèn wéi..., rán ér zuò zhě zhǐ chū...', meaning: 'Sanggahan terhadap pandangan lain.' },
      { label: 'Inference', hanzi: '从这句话可以推断出...', pinyin: 'Cóng zhè jù huà kě yǐ tuī duàn chū...', meaning: 'Dari kalimat ini dapat disimpulkan...' },
      { label: 'Structure markers', hanzi: '首先 / 其次 / 此外 / 最后', pinyin: 'shǒu xiān / qí cì / cǐ wài / zuì hòu', meaning: 'Penanda struktur argumentatif.' },
    ],
    writing: [
      { label: 'Formal essay frame', hanzi: '随着...的发展，...已经成为一个值得讨论的问题。', pinyin: 'Suí zhe... de fā zhǎn,... yǐ jīng chéng wéi yí gè zhí dé tǎo lùn de wèn tí.', meaning: 'Seiring perkembangan..., ... telah menjadi masalah yang layak dibahas.' },
      { label: 'Balanced argument', hanzi: '这种做法既有优势，也存在一定的限制。', pinyin: 'Zhè zhǒng zuò fǎ jì yǒu yōu shì, yě cún zài yí dìng de xiàn zhì.', meaning: 'Cara ini punya keunggulan, tetapi juga memiliki batasan tertentu.' },
      { label: 'Evidence paragraph', hanzi: '以...为例，我们可以看到...', pinyin: 'Yǐ... wéi lì, wǒ men kě yǐ kàn dào...', meaning: 'Dengan ... sebagai contoh, kita dapat melihat...' },
      { label: 'Conclusion', hanzi: '因此，关键不在于是否使用它，而在于如何合理地使用它。', pinyin: 'Yīn cǐ, guān jiàn bú zài yú shì fǒu shǐ yòng tā, ér zài yú rú hé hé lǐ dì shǐ yòng tā.', meaning: 'Kuncinya bukan apakah memakainya, tetapi bagaimana memakainya secara rasional.' },
    ],
    vocabulary: [
      { label: 'Abstract nouns', hanzi: '价值观 / 现象 / 趋势 / 影响 / 限制', pinyin: 'jià zhí guān / xiàn xiàng / qū shì / yǐng xiǎng / xiàn zhì', meaning: 'kata benda abstrak untuk esai HSK 5' },
      { label: 'Argument verbs', hanzi: '反映 / 促进 / 导致 / 忽视 / 承担', pinyin: 'fǎn yìng / cù jìn / dǎo zhì / hū shì / chéng dān', meaning: 'kata kerja untuk analisis' },
      { label: 'Stance markers', hanzi: '相反 / 然而 / 尽管 / 仍然 / 由此可见', pinyin: 'xiāng fǎn / rán ér / jǐn guǎn / réng rán / yóu cǐ kě jiàn', meaning: 'penanda sikap dan logika' },
      { label: 'Evaluation words', hanzi: '合理 / 长期 / 明显 / 复杂 / 有限', pinyin: 'hé lǐ / cháng qī / míng xiǎn / fù zá / yǒu xiàn', meaning: 'kata evaluatif untuk nuansa' },
    ],
    pronunciation: [
      { label: 'Rhetorical pause', hanzi: '一方面 / 科技提高了效率；另一方面 / 它也带来了风险。', pinyin: 'Yì fāng miàn / kē jì tí gāo le xiào lǜ; lìng yì fāng miàn / tā yě dài lái le fēng xiǎn.', meaning: 'Gunakan jeda retoris untuk struktur dua sisi.' },
      { label: 'Concession flow', hanzi: '尽管成本很高 / 这项政策仍然值得尝试。', pinyin: 'Jǐn guǎn chéng běn hěn gāo / zhè xiàng zhèng cè réng rán zhí dé cháng shì.', meaning: 'Klausa konsesi naik ringan, posisi utama lebih tegas.' },
      { label: 'Abstract phrase rhythm', hanzi: '社会现象 / 价值观变化 / 长期影响', pinyin: 'shè huì xiàn xiàng / jià zhí guān biàn huà / cháng qī yǐng xiǎng', meaning: 'Latih frasa abstrak sebagai satu unit suara.' },
      { label: 'Conclusion intonation', hanzi: '由此可见 / 我们需要更全面地考虑问题。', pinyin: 'Yóu cǐ kě jiàn / wǒ men xū yào gèng quán miàn dì kǎo lǜ wèn tí.', meaning: 'Turunkan intonasi pada kesimpulan.' },
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
      pinyin: 'Jǐn guǎn rén gōng zhì néng tí gāo le gōng zuò xiào lǜ, rén men réng rán xū yào péi yǎng dú lì sī kǎo de néng lì. yì fāng miàn, jì shù kě yǐ bāng zhù wǒ men chǔ lǐ dà liàng xìn xī; lìng yì fāng miàn, rú guǒ guò fèn yī lài jì shù, wǒ men kě néng huì hū shì pàn duàn lì de zhòng yào xìng.',
      meaning: 'Meskipun AI meningkatkan efisiensi kerja, manusia tetap perlu mengembangkan kemampuan berpikir mandiri. Di satu sisi, teknologi membantu memproses banyak informasi; di sisi lain, jika terlalu bergantung pada teknologi, kita bisa mengabaikan pentingnya daya penilaian.',
    },
    speaking: {
      title: 'Model presentasi HSK 5',
      hanzi: '关于城市生活的压力，我想从工作、交通和人际关系三个方面来分析。城市提供了更多机会，但也带来了更快的生活节奏。综合来看，关键不是逃离城市，而是学会合理安排时间，并建立稳定的支持系统。',
      pinyin: 'Guān yú chéng shì shēng huó de yā lì, wǒ xiǎng cóng gōng zuò, jiāo tōng hé rén jì guān xì sān gè fāng miàn lái fēn xī. chéng shì tí gōng le gèng duō jī huì, dàn yě dài lái le gèng kuài de shēng huó jié zòu. zōng hé lái kàn, guān jiàn bú shì táo lí chéng shì, ér shì xué huì hé lǐ ān pái shí jiān, bìng jiàn lì wěn dìng de zhī chí xì tǒng.',
      meaning: 'Tentang tekanan hidup kota, saya ingin menganalisis dari pekerjaan, transportasi, dan hubungan sosial. Kota memberi lebih banyak kesempatan, tetapi juga ritme hidup lebih cepat. Secara menyeluruh, kuncinya bukan melarikan diri dari kota, tetapi mengatur waktu secara rasional dan membangun sistem dukungan stabil.',
    },
    listening: {
      title: 'Model ringkasan audio HSK 5',
      hanzi: '录音的核心观点是，在线学习并不能完全代替面对面交流。说话人承认在线学习很方便，但他强调学习效果还取决于自律能力和互动质量。由此可见，他的态度是谨慎支持。',
      pinyin: 'Lù yīn de hé xīn guān diǎn shì, zài xiàn xué xí bìng bù néng wán quán dài tì miàn duì miàn jiāo liú. shuō huà rén chéng rèn zài xiàn xué xí hěn fāng biàn, dàn tā qiáng diào xué xí xiào guǒ hái qǔ jué yú zì lǜ néng lì hé hù dòng zhì liàng. yóu cǐ kě jiàn, tā de tài dù shì jǐn shèn zhī chí.',
      meaning: 'Pandangan inti audio adalah pembelajaran online tidak sepenuhnya menggantikan komunikasi tatap muka. Pembicara mengakui belajar online praktis, tetapi hasil belajar juga bergantung pada disiplin diri dan kualitas interaksi. Sikapnya mendukung secara hati-hati.',
    },
    reading: {
      title: 'Model inferensi reading HSK 5',
      hanzi: '文章表面上讨论消费选择，实际上关注的是现代人的价值观变化。作者并不反对消费，而是批评盲目追求品牌的现象。因此，阅读时要区分事实、例子和作者真正的态度。',
      pinyin: 'Wén zhāng biǎo miàn shàng tǎo lùn xiāo fèi xuǎn zé, shí jì shang guān zhù de shì xiàn dài rén de jià zhí guān biàn huà. zuò zhě bìng bù fǎn duì xiāo fèi, ér shì pī píng máng mù zhuī qiú pǐn pái de xiàn xiàng. yīn cǐ, yuè dú shí yào qū fēn shì shí, lì zǐ hé zuò zhě zhēn zhèng de tài dù.',
      meaning: 'Artikel tampaknya membahas pilihan konsumsi, tetapi sebenarnya memperhatikan perubahan nilai manusia modern. Penulis tidak menolak konsumsi, melainkan mengkritik fenomena mengejar merek secara buta. Pembaca harus membedakan fakta, contoh, dan sikap penulis.',
    },
    writing: {
      title: 'Model esai pendek HSK 5',
      hanzi: '随着人工智能的发展，越来越多的人开始担心未来的工作机会。我认为，这种担心可以理解，但不必过分悲观。一方面，人工智能会代替一些重复性的工作；另一方面，它也会创造新的职业需求。因此，最重要的是不断学习，并培养技术无法轻易替代的能力。',
      pinyin: 'Suí zhe rén gōng zhì néng de fā zhǎn, yuè lái yuè duō de rén kāi shǐ dān xīn wèi lái de gōng zuò jī huì. wǒ rèn wéi, zhè zhǒng dān xīn kě yǐ lǐ jiě, dàn bú bì guò fèn bēi guān. yì fāng miàn, rén gōng zhì néng huì dài tì yì xiē chóng fù xìng de gōng zuò; lìng yì fāng miàn, tā yě huì chuàng zào xīn de zhí yè xū qiú. yīn cǐ, zuì zhòng yào de shì bú duàn xué xí, bìng péi yǎng jì shù wú fǎ qīng yì tì dài de néng lì.',
      meaning: 'Seiring perkembangan AI, makin banyak orang khawatir tentang peluang kerja masa depan. Kekhawatiran ini dapat dipahami, tetapi tidak perlu terlalu pesimis. AI akan menggantikan beberapa pekerjaan berulang, tetapi juga menciptakan kebutuhan profesi baru. Yang penting adalah terus belajar dan membangun kemampuan yang tidak mudah digantikan teknologi.',
    },
    vocabulary: {
      title: 'Model lexical set HSK 5',
      hanzi: '现象反映价值观，趋势带来挑战，政策促进发展，限制影响效率。写作时不要只堆词，而要把词放进因果、让步和对比关系中。',
      pinyin: 'Xiàn xiàng fǎn yìng jià zhí guān, qū shì dài lái tiǎo zhàn, zhèng cè cù jìn fā zhǎn, xiàn zhì yǐng xiǎng xiào lǜ. xiě zuò shí bú yào zhī duī cí, ér yào bǎ cí fàng jìn yīn guǒ, ràng bù hé duì bǐ guān xì zhōng.',
      meaning: 'Fenomena mencerminkan nilai, tren membawa tantangan, kebijakan mendorong perkembangan, batasan memengaruhi efisiensi. Saat menulis jangan hanya menumpuk kata, tetapi letakkan kata dalam sebab-akibat, konsesi, dan perbandingan.',
    },
    pronunciation: {
      title: 'Model prosodi HSK 5',
      hanzi: '尽管技术带来了便利 / 我们仍然需要保持独立思考。综合来看 / 关键不在于工具本身 / 而在于我们如何使用它。',
      pinyin: 'Jǐn guǎn jì shù dài lái le biàn lì / wǒ men réng rán xū yào bǎo chí dú lì sī kǎo. zōng hé lái kàn / guān jiàn bú zài yú gōng jù běn shēn / ér zài yú wǒ men rú hé shǐ yòng tā.',
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
      { label: '即便...也...', hanzi: '即便短期内看不到效果，这项改革也具有长远意义。', pinyin: 'Jí biàn duǎn qī nèi kàn bú dào xiào guǒ, zhè xiàng gǎi gé yě jù yǒu cháng yuǎn yì yì.', meaning: 'Walau hasilnya tidak terlihat dalam jangka pendek, reformasi ini tetap punya makna jangka panjang.' },
      { label: '与其说...不如说...', hanzi: '与其说这是技术问题，不如说这是治理能力的问题。', pinyin: 'Yǔ qí shuō zhè shì jì shù wèn tí, bù rú shuō zhè shì zhì lǐ néng lì de wèn tí.', meaning: 'Daripada menyebutnya masalah teknis, lebih tepat menyebutnya masalah kapasitas tata kelola.' },
      { label: '并非...而是...', hanzi: '核心矛盾并非资源不足，而是资源分配不均。', pinyin: 'Hé xīn máo dùn bìng fēi zī yuán bù zú, ér shì zī yuán fēn pèi bù jūn.', meaning: 'Kontradiksi intinya bukan kekurangan sumber daya, melainkan distribusi yang tidak merata.' },
      { label: '归根结底', hanzi: '归根结底，制度是否有效取决于执行和监督。', pinyin: 'Guī gēn jié dǐ, zhì dù shì fǒu yǒu xiào qǔ jué yú zhí xíng hé jiān dū.', meaning: 'Pada akhirnya, efektif tidaknya sistem bergantung pada pelaksanaan dan pengawasan.' },
    ],
    speaking: [
      { label: 'Executive framing', hanzi: '如果把这个问题放在更大的社会背景下来看，我们会发现...', pinyin: 'Rú guǒ bǎ zhè gè wèn tí fàng zài gèng dà de shè huì bèi jǐng xià lái kàn, wǒ men huì fā xiàn...', meaning: 'Jika masalah ini ditempatkan dalam konteks sosial yang lebih luas, kita akan melihat...' },
      { label: 'Nuanced stance', hanzi: '我倾向于支持这个方向，但前提是必须建立有效的监督机制。', pinyin: 'Wǒ qīng xiàng yú zhī chí zhè ge fāng xiàng, dàn qián tí shì bì xū jiàn lì yǒu xiào de jiān dū jī zhì.', meaning: 'Saya cenderung mendukung arah ini, tetapi syaratnya harus ada mekanisme pengawasan efektif.' },
      { label: 'Strategic recommendation', hanzi: '更可行的方案不是全面否定，而是逐步调整。', pinyin: 'Gèng kě xíng de fāng àn bú shì quán miàn fǒu dìng, ér shì zhú bù diào zhěng.', meaning: 'Solusi yang lebih layak bukan menolak total, melainkan menyesuaikan bertahap.' },
      { label: 'Synthesis close', hanzi: '因此，我们需要在效率、公平和可持续性之间找到平衡。', pinyin: 'Yīn cǐ, wǒ men xū yào zài xiào lǜ, gōng píng hé kě chí xù xìng zhī jiān zhǎo dào píng héng.', meaning: 'Karena itu, kita perlu menemukan keseimbangan antara efisiensi, keadilan, dan keberlanjutan.' },
    ],
    listening: [
      { label: 'Hidden premise', hanzi: '说话人真正担心的不是成本，而是执行过程中可能出现的不公平。', pinyin: 'Shuō huà rén zhēn zhèng dān xīn de bú shì chéng běn, ér shì zhí xíng guò chéng zhōng kě néng chū xiàn de bù gōng píng.', meaning: 'Tangkap premis tersembunyi: kekhawatiran bukan biaya, melainkan ketidakadilan saat pelaksanaan.' },
      { label: 'Stance through restraint', hanzi: '他没有直接批评，但语气中带有明显保留。', pinyin: 'Tā méi yǒu zhí jiē pī píng, dàn yǔ qì zhōng dài yǒu míng xiǎn bǎo liú.', meaning: 'Pembicara tidak mengkritik langsung, tetapi nadanya menyimpan keberatan.' },
      { label: 'Argument hierarchy', hanzi: '先区分事实、判断和建议，再总结核心论点。', pinyin: 'Xiān qū fēn shì shí, pàn duàn hé jiàn yì, zài zǒng jié hé xīn lùn diǎn.', meaning: 'Pisahkan fakta, penilaian, dan saran sebelum merangkum argumen inti.' },
      { label: 'Synthesis listening', hanzi: '两位说话人的分歧在于风险由谁承担。', pinyin: 'Liǎng wèi shuō huà rén de fēn qí zài yú fēng xiǎn yóu shuí chéng dān.', meaning: 'Perbedaan dua pembicara terletak pada siapa yang menanggung risiko.' },
    ],
    reading: [
      { label: 'Ideological framing', hanzi: '作者通过选择词语暗示了自己的立场。', pinyin: 'Zuò zhě tōng guò xuǎn zé cí yǔ àn shì le zì jǐ de lì chǎng.', meaning: 'Penulis mengisyaratkan sikap melalui pilihan kata.' },
      { label: 'Unstated premise', hanzi: '文章没有明说的前提是...', pinyin: 'Wén zhāng méi yǒu míng shuō de qián tí shì...', meaning: 'Premis yang tidak disebut langsung dalam teks adalah...' },
      { label: 'Rhetorical strategy', hanzi: '作者先承认对方观点，再转向自己的论证。', pinyin: 'Zuò zhě xiān chéng rèn duì fāng guān diǎn, zài zhuǎn xiàng zì jǐ de lùn zhèng.', meaning: 'Penulis mengakui pandangan lawan terlebih dahulu, lalu beralih ke argumennya sendiri.' },
      { label: 'Synthesis across texts', hanzi: '两篇文章都关注公平，但侧重点不同。', pinyin: 'Liǎng piān wén zhāng dōu guān zhù gōng píng, dàn cè zhòng diǎn bù tóng.', meaning: 'Dua teks sama-sama membahas keadilan, tetapi fokusnya berbeda.' },
    ],
    writing: [
      { label: 'Thesis with nuance', hanzi: '这个问题不能简单地用支持或反对来概括。', pinyin: 'Zhè ge wèn tí bù néng jiǎn dān dì yòng zhī chí huò fǎn duì lái gài kuò.', meaning: 'Masalah ini tidak bisa diringkas sederhana sebagai dukung atau tolak.' },
      { label: 'Policy memo', hanzi: '建议从短期执行、中期评估和长期制度建设三个层面推进。', pinyin: 'Jiàn yì cóng duǎn qī zhí xíng, zhōng qī píng gū hé cháng qī zhì dù jiàn shè sān gè céng miàn tuī jìn.', meaning: 'Disarankan mendorong dari tiga lapis: pelaksanaan jangka pendek, evaluasi menengah, dan pembangunan institusi jangka panjang.' },
      { label: 'Critical review', hanzi: '该论点的不足在于忽略了弱势群体的实际处境。', pinyin: 'Gāi lùn diǎn de bù zú zài yú hū lüè le ruò shì qún tǐ de shí jì chǔ jìng.', meaning: 'Kelemahan argumen ini adalah mengabaikan kondisi nyata kelompok rentan.' },
      { label: 'Synthesis conclusion', hanzi: '真正可持续的方案应当兼顾效率、公平与公众信任。', pinyin: 'Zhēn zhèng kě chí xù de fāng àn yīng dāng jiān gù xiào lǜ, gōng píng yǔ gōng zhòng xìn rèn.', meaning: 'Solusi yang benar-benar berkelanjutan harus mempertimbangkan efisiensi, keadilan, dan kepercayaan publik.' },
    ],
    vocabulary: [
      { label: 'Governance set', hanzi: '治理 / 制度 / 监督 / 透明度 / 问责', pinyin: 'zhì lǐ / zhì dù / jiān dū / tòu míng dù / wèn zé', meaning: 'tata kelola / sistem / pengawasan / transparansi / akuntabilitas' },
      { label: 'Critical stance', hanzi: '质疑 / 反思 / 批判 / 保留 / 前提', pinyin: 'zhì yí / fǎn sī / pī pàn / bǎo liú / qián tí', meaning: 'mempertanyakan / refleksi / kritik / keberatan / premis' },
      { label: 'Synthesis verbs', hanzi: '整合 / 权衡 / 推导 / 概括 / 论证', pinyin: 'zhěng hé / quán héng / tuī dǎo / gài kuò / lùn zhèng', meaning: 'mengintegrasi / menimbang / menurunkan kesimpulan / merangkum / berargumen' },
      { label: 'Nuance markers', hanzi: '未必 / 不见得 / 某种程度上 / 归根结底', pinyin: 'wèi bì / bú jiàn dé / mǒu zhǒng chéng dù shàng / guī gēn jié dǐ', meaning: 'belum tentu / tidak selalu / dalam tingkat tertentu / pada akhirnya' },
    ],
    pronunciation: [
      { label: 'Executive cadence', hanzi: '从长远来看 / 真正的挑战 / 并不在于资源不足 / 而在于制度安排。', pinyin: 'Cóng cháng yuǎn lái kàn / zhēn zhèng de tiǎo zhàn / bìng bú zài yú zī yuán bù zú / ér zài yú zhì dù ān pái.', meaning: 'Jeda seperti briefing profesional.' },
      { label: 'Soft disagreement', hanzi: '我不完全否认这一点 / 但这个结论仍然需要进一步验证。', pinyin: 'Wǒ bù wán quán fǒu rèn zhè yì diǎn / dàn zhè ge jié lùn réng rán xū yào jìn yí bù yàn zhèng.', meaning: 'Nada keberatan halus, tidak agresif.' },
      { label: 'Idiom chunk', hanzi: '权衡利弊 / 归根结底 / 不容忽视', pinyin: 'quán héng lì bì / guī gēn jié dǐ / bù róng hū shì', meaning: 'Idiom dibaca sebagai chunk tetap.' },
      { label: '3-minute flow', hanzi: '提出问题 / 分析原因 / 比较方案 / 得出结论。', pinyin: 'Tí chū wèn tí / fēn xī yuán yīn / bǐ jiào fāng àn / dé chū jié lùn.', meaning: 'Alur napas untuk presentasi panjang.' },
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
      pinyin: 'Yǔ qí shuō gōng zhòng fǎn duì gǎi gé, bù rú shuō tā men duì gǎi gé guò chéng zhōng de tòu míng dù quē fá xìn rèn. guī gēn jié dǐ, wèn tí bìng fēi zhèng cè mù biāo bù hé lǐ, ér shì zhì dù ān pái méi yǒu chōng fèn huí yìng bù tóng qún tǐ de xiàn shí chǔ jìng.',
      meaning: 'Daripada mengatakan publik menolak reformasi, lebih tepat mengatakan mereka kurang percaya pada transparansi proses reformasi. Pada akhirnya, masalahnya bukan tujuan kebijakan tidak rasional, melainkan pengaturan institusional belum cukup merespons kondisi nyata berbagai kelompok.',
    },
    speaking: {
      title: 'Model briefing HSK 6',
      hanzi: '如果把这个问题放在更大的社会背景下来看，我们会发现，真正的矛盾不只是效率和成本之间的取舍，而是公众信任、制度执行和长期韧性之间的平衡。因此，我倾向于支持逐步推进，而不是一次性全面实施。',
      pinyin: 'Rú guǒ bǎ zhè ge wèn tí fàng zài gèng dà de shè huì bèi jǐng xià lái kàn, wǒ men huì fā xiàn, zhēn zhèng de máo dùn bù zhǐ shì xiào lǜ hé chéng běn zhī jiān de qǔ shě, ér shì gōng zhòng xìn rèn, zhì dù zhí xíng hé cháng qī rèn xìng zhī jiān de píng héng. yīn cǐ, wǒ qīng xiàng yú zhī chí zhú bù tuī jìn, ér bú shì yí cì xìng quán miàn shí shī.',
      meaning: 'Jika masalah ini ditempatkan dalam konteks sosial yang lebih luas, kontradiksi sebenarnya bukan hanya trade-off antara efisiensi dan biaya, melainkan keseimbangan antara kepercayaan publik, pelaksanaan institusi, dan resiliensi jangka panjang. Karena itu, saya cenderung mendukung implementasi bertahap, bukan pelaksanaan menyeluruh sekaligus.',
    },
    listening: {
      title: 'Model sintesis listening HSK 6',
      hanzi: '两位说话人表面上都支持创新，但他们的侧重点不同。第一位强调效率和竞争力，第二位则提醒我们关注风险由谁承担。综合来看，分歧并不在于是否创新，而在于创新应当如何被治理。',
      pinyin: 'Liǎng wèi shuō huà rén biǎo miàn shàng dōu zhī chí chuàng xīn, dàn tā men de cè zhòng diǎn bù tóng. dì yī wèi qiáng diào xiào lǜ hé jìng zhēng lì, dì èr wèi zé tí xǐng wǒ men guān zhù fēng xiǎn yóu shuí chéng dān. zōng hé lái kàn, fēn qí bìng bú zài yú shì fǒu chuàng xīn, ér zài yú chuàng xīn yīng dāng rú hé bèi zhì lǐ.',
      meaning: 'Dua pembicara tampaknya sama-sama mendukung inovasi, tetapi fokus mereka berbeda. Yang pertama menekankan efisiensi dan daya saing, sedangkan yang kedua mengingatkan kita untuk memperhatikan siapa yang menanggung risiko. Secara sintesis, perbedaan bukan pada apakah perlu inovasi, tetapi bagaimana inovasi harus ditata kelola.',
    },
    reading: {
      title: 'Model critical reading HSK 6',
      hanzi: '这篇文章的核心并不是介绍某项政策，而是通过政策争议讨论公共信任的形成机制。作者先承认改革的必要性，再指出执行过程中的信息不对称，最后把问题提升到制度建设的层面。',
      pinyin: 'Zhè piān wén zhāng de hé xīn bìng bú shì jiè shào mǒu xiàng zhèng cè, ér shì tōng guò zhèng cè zhēng yì tǎo lùn gōng gòng xìn rèn de xíng chéng jī zhì. zuò zhě xiān chéng rèn gǎi gé de bì yào xìng, zài zhǐ chū zhí xíng guò chéng zhōng de xìn xī bú duì chèn, zuì hòu bǎ wèn tí tí shēng dào zhì dù jiàn shè de céng miàn.',
      meaning: 'Inti artikel ini bukan memperkenalkan suatu kebijakan, melainkan membahas mekanisme terbentuknya kepercayaan publik melalui kontroversi kebijakan. Penulis pertama mengakui perlunya reformasi, lalu menunjukkan asimetri informasi dalam pelaksanaan, dan akhirnya mengangkat masalah ke level pembangunan institusi.',
    },
    writing: {
      title: 'Model esai HSK 6',
      hanzi: '一个成熟的公共决策不应只追求短期效率，还必须考虑公平、透明度和社会韧性。不可否认，快速行动有助于解决眼前问题；然而，如果决策过程缺乏沟通，政策本身即便方向正确，也可能难以获得公众支持。归根结底，治理能力体现在权衡利弊之后仍能建立信任。',
      pinyin: 'Yí gè chéng shú de gōng gòng jué cè bú yìng zhī zhuī qiú duǎn qī xiào lǜ, hái bì xū kǎo lǜ gōng píng, tòu míng dù hé shè huì rèn xìng. bù kě fǒu rèn, kuài sù xíng dòng yǒu zhù yú jiě jué yǎn qián wèn tí; rán ér, rú guǒ jué cè guò chéng quē fá gōu tōng, zhèng cè běn shēn jí biàn fāng xiàng zhèng què, yě kě néng nán yǐ huò dé gōng zhòng zhī chí. guī gēn jié dǐ, zhì lǐ néng lì tǐ xiàn zài quán héng lì bì zhī hòu réng néng jiàn lì xìn rèn.',
      meaning: 'Keputusan publik yang matang tidak seharusnya hanya mengejar efisiensi jangka pendek, tetapi juga mempertimbangkan keadilan, transparansi, dan resiliensi sosial. Tidak dapat disangkal, tindakan cepat membantu menyelesaikan masalah di depan mata; namun jika proses keputusan kurang komunikasi, kebijakan yang arahnya benar pun mungkin sulit mendapat dukungan publik. Pada akhirnya, kapasitas tata kelola terlihat dari kemampuan membangun kepercayaan setelah menimbang untung-rugi.',
    },
    vocabulary: {
      title: 'Model lexical synthesis HSK 6',
      hanzi: '治理需要透明度，改革需要问责，创新需要边界，发展需要韧性。高级表达的关键不是使用生僻词，而是精确地表达立场、前提、取舍和潜在影响。',
      pinyin: 'Zhì lǐ xū yào tòu míng dù, gǎi gé xū yào wèn zé, chuàng xīn xū yào biān jiè, fā zhǎn xū yào rèn xìng. gāo jí biǎo dá de guān jiàn bú shì shǐ yòng shēng pì cí, ér shì jīng què dì biǎo dá lì chǎng, qián tí, qǔ shě hé qián zài yǐng xiǎng.',
      meaning: 'Tata kelola membutuhkan transparansi, reformasi membutuhkan akuntabilitas, inovasi membutuhkan batas, dan pembangunan membutuhkan resiliensi. Kunci ekspresi tingkat tinggi bukan memakai kata langka, melainkan menyampaikan sikap, premis, trade-off, dan dampak potensial secara presisi.',
    },
    pronunciation: {
      title: 'Model prosodi HSK 6',
      hanzi: '不可否认 / 快速行动有助于解决眼前问题；然而 / 如果缺乏沟通 / 政策即便方向正确 / 也可能难以获得公众支持。',
      pinyin: 'Bù kě fǒu rèn / kuài sù xíng dòng yǒu zhù yú jiě jué yǎn qián wèn tí; rán ér / rú guǒ quē fá gōu tōng / zhèng cè jí biàn fāng xiàng zhèng què / yě kě néng nán yǐ huò dé gōng zhòng zhī chí.',
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
