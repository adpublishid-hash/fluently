import { getLevelLabel } from './vocabulary';
import { getSessionScoreCategory } from './scoring';

const slugGrammarTopic = (label: string) =>
  label
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

const grammarChallengeLabels = [
  'Subject Pronouns & Be Verb',
  'Articles: A, An, The',
  'Singular & Plural Nouns',
  'This, That, These, Those',
  'Possessive Adjectives & Possessive Nouns',
  'Basic Word Order: Subject + Verb + Object',
  'There Is & There Are',
  'Prepositions of Place: In, On, At, Under',
  'Prepositions of Time: In, On, At',
  'Simple Present: Daily Routines',
  'Simple Present: He, She, It + S/ES',
  'Adverbs of Frequency',
  'Can & Cannot for Ability',
  'Imperatives & Classroom Instructions',
  'Basic Questions: What, Where, When, Who',
  'Countable & Uncountable Nouns',
  'Some, Any, Much, Many',
  'How Much & How Many',
  'Comparatives: Bigger, Better, More',
  'Superlatives: The Best, The Most',
  'Present Continuous: Actions Now',
  'Present Continuous vs Simple Present',
  'Simple Past: Regular Verbs',
  'Simple Past: Irregular Verbs',
  'Past Time Expressions',
  'Be Going To for Plans',
  'Will for Future Decisions',
  'Future: Will vs Going To',
  'Modals: Should for Advice',
  'Modals: Must & Have To',
  'Modals: May, Might, Could',
  'Object Pronouns',
  'Gerunds After Like, Love, Enjoy',
  'Infinitives: Want To, Need To, Plan To',
  'Conjunctions: And, But, Or, Because',
  'Too, Enough, Very',
  'Past Continuous',
  'Past Continuous vs Simple Past',
  'Present Perfect: Experience',
  'Present Perfect with Ever & Never',
  'Present Perfect with For & Since',
  'Present Perfect vs Simple Past',
  'Used To for Past Habits',
  'First Conditional',
  'Zero Conditional',
  'Second Conditional',
  'Relative Clauses: Who, Which, That',
  'Defining Relative Clauses',
  'Passive Voice: Present Simple',
  'Passive Voice: Past Simple',
  'Reported Speech: Statements',
  'Reported Speech: Questions',
  'Question Tags',
  'Indirect Questions',
  'Phrasal Verbs: Separable & Inseparable',
  'Adjective Order',
  'Adverbs of Manner',
  'Comparative Structures: As...As',
  'So, Such, Too, Enough',
  'Future Continuous',
  'Future Perfect',
  'Past Perfect',
  'Past Perfect vs Simple Past',
  'Third Conditional',
  'Mixed Conditionals',
  'Wish & If Only',
  'Causative: Have/Get Something Done',
  'Passive Voice: Modals',
  'Passive Voice: Perfect Tenses',
  'Reported Speech: Commands & Requests',
  'Non-Defining Relative Clauses',
  'Reduced Relative Clauses',
  'Participle Clauses',
  'Gerund vs Infinitive',
  'Advanced Modals of Deduction',
  'Modal Perfect: Should Have, Could Have',
  'Inversion After Negative Adverbials',
  'Cleft Sentences: What/It',
  'Emphasis with Do/Does/Did',
  'Subjunctive Mood',
  'Advanced Linking Words',
  'Concession Clauses: Although, Even Though',
  'Purpose Clauses: So That, In Order To',
  'Result Clauses: So...That, Such...That',
  'Noun Clauses',
  'Nominalization',
  'Parallel Structure',
  'Ellipsis & Substitution',
  'Register: Formal vs Informal Grammar',
  'Review & Mastery Check',
];

const grammarTopicOptions = [
  ...grammarChallengeLabels.map((label, index) => ({
    value: slugGrammarTopic(label),
    label: `Day ${index + 1} - ${label}`,
  })),
  { value: 'custom-grammar', label: 'Tulis topik sendiri' },
];
const buildGrammarGreeting = () => 'Hi! Sebelum mulai, siapa namamu? 😊';

const buildGrammarTopicQuestion = (name: string) => `Hai, ${name}! 👋
Makasih sudah belajar hari ini ya! Kita bakal belajar grammar dengan cara seru 😄🔥

${name}, kamu mau belajar grammar apa hari ini?
GRAMMAR_TOPIC_SELECT`;

const grammarGuides: Record<string, { title: string; function: string; pattern: string; examples: string[]; focus: string }> = {
  'simple present': {
    title: 'Simple Present',
    function: 'Untuk kebiasaan, fakta, dan rutinitas.',
    pattern: 'Subject + V1 / V1+s-es',
    examples: ['I study English every day.', 'She works at a school.', 'They like coffee.'],
    focus: 'verb dasar dan tambahan s/es untuk he, she, it',
  },
  'simple past': {
    title: 'Simple Past',
    function: 'Untuk kejadian yang sudah selesai di masa lalu.',
    pattern: 'Subject + V2',
    examples: ['I visited Bali last year.', 'She watched a movie yesterday.', 'They finished the task.'],
    focus: 'verb 2 dan penanda waktu lampau',
  },
  'present continuous': {
    title: 'Present Continuous',
    function: 'Untuk kegiatan yang sedang berlangsung sekarang.',
    pattern: 'Subject + am/is/are + V-ing',
    examples: ['I am learning English now.', 'She is reading a book.', 'They are playing football.'],
    focus: 'to be + verb-ing',
  },
  'future tense': {
    title: 'Future Tense',
    function: 'Untuk rencana, prediksi, atau hal yang akan terjadi.',
    pattern: 'Subject + will + V1 / Subject + am/is/are going to + V1',
    examples: ['I will call you tomorrow.', 'She is going to study tonight.', 'They will visit us next week.'],
    focus: 'will/going to + verb dasar',
  },
  'passive voice': {
    title: 'Passive Voice',
    function: 'Untuk menekankan objek/hasil, bukan pelaku.',
    pattern: 'Subject + be + V3',
    examples: ['The cake is made by my mother.', 'The report was sent yesterday.', 'English is spoken here.'],
    focus: 'be + past participle',
  },
  preposition: {
    title: 'Preposition',
    function: 'Untuk menunjukkan tempat, waktu, arah, atau hubungan antar kata.',
    pattern: 'in/on/at/to/from + noun',
    examples: ['I live in Jakarta.', 'The meeting is on Monday.', 'She is at school.'],
    focus: 'pilihan in, on, at, to, from',
  },
  articles: {
    title: 'Articles (a, an, the)',
    function: 'Untuk menunjukkan benda umum atau spesifik.',
    pattern: 'a/an + singular noun, the + specific noun',
    examples: ['I have a book.', 'She eats an apple.', 'The book is on the table.'],
    focus: 'a/an untuk umum, the untuk spesifik',
  },
};

const normalizeGrammarTopic = (value: string) => {
  const text = value.toLowerCase().trim();
  if (text.includes('passive')) return 'passive voice';
  if (text.includes('preposition')) return 'preposition';
  if (text.includes('article') || text.includes('a an the')) return 'articles';
  if (text.includes('future') || text.includes('will') || text.includes('going to')) return 'future tense';
  if (text.includes('continuous') || text.includes('verb ing') || text.includes('actions now')) return 'present continuous';
  if (text.includes('past')) return 'simple past';
  if (text.includes('present')) return 'simple present';
  if (
    text.includes('pronoun') ||
    text.includes('be verb') ||
    text.includes('word order') ||
    text.includes('there is') ||
    text.includes('there are') ||
    text.includes('question') ||
    text.includes('countable') ||
    text.includes('uncountable') ||
    text.includes('some') ||
    text.includes('any') ||
    text.includes('much') ||
    text.includes('many') ||
    text.includes('comparative') ||
    text.includes('superlative') ||
    text.includes('modal') ||
    text.includes('gerund') ||
    text.includes('infinitive') ||
    text.includes('conditional') ||
    text.includes('relative') ||
    text.includes('reported') ||
    text.includes('tag') ||
    text.includes('indirect') ||
    text.includes('phrasal') ||
    text.includes('adjective') ||
    text.includes('adverb') ||
    text.includes('perfect') ||
    text.includes('wish') ||
    text.includes('causative') ||
    text.includes('participle') ||
    text.includes('inversion') ||
    text.includes('cleft') ||
    text.includes('subjunctive') ||
    text.includes('clause') ||
    text.includes('nominalization') ||
    text.includes('parallel') ||
    text.includes('ellipsis') ||
    text.includes('register') ||
    text.includes('review')
  ) return text;
  return text || 'simple present';
};

const getGrammarGuide = (topic: string) => {
  const normalized = normalizeGrammarTopic(topic);
  return grammarGuides[normalized] || {
    title: topic,
    function: 'Untuk membantu kamu memakai struktur kalimat dengan lebih tepat.',
    pattern: 'Subject + verb + object/complement',
    examples: [
      'I practice English every day.',
      'She speaks clearly in class.',
      'They write better sentences now.',
    ],
    focus: 'struktur kalimat, verb, dan word order',
  };
};

const buildGrammarLesson = (name: string, topic: string, levelId?: string) => {
  const guide = getGrammarGuide(topic);
  return `Siap, ${name}! Kita belajar ${guide.title} di level CEFR ${getLevelLabel(levelId)}.

Fungsi:
${guide.function}

Pola simpel:
${guide.pattern}

Contoh:
1. ${guide.examples[0]}
2. ${guide.examples[1]}
3. ${guide.examples[2]}

${name}, sekarang coba buat 3 kalimat menggunakan grammar ini ya ✍️`;
};

const buildGrammarFeedback = (name: string, answer: string, topic: string) => {
  const guide = getGrammarGuide(topic);
  const lines = answer.split(/\n+|(?<=[.!?])\s+/).map((line) => line.trim()).filter(Boolean);
  const checked = (lines.length ? lines : [answer]).slice(0, 6).map((line) => {
    const lower = line.toLowerCase();
    const hasSubject = /\b(i|you|we|they|he|she|it|my|the|a|an)\b/i.test(line);
    const hasVerb = /\b(am|is|are|was|were|will|have|has|had|do|does|did|go|goes|went|study|studies|studied|learn|learns|learned|work|works|worked|play|plays|played|read|reads|write|writes|wrote|written|made|sent|spoken)\b/i.test(line);
    const matchesTopic =
      topic === 'present continuous' ? /\b(am|is|are)\b.+\b\w+ing\b/i.test(line) :
      topic === 'future tense' ? /\b(will|going to)\b/i.test(line) :
      topic === 'simple past' ? /\b(yesterday|last|ago|went|visited|watched|finished|studied|played|worked)\b/i.test(lower) :
      topic === 'passive voice' ? /\b(am|is|are|was|were|be|been)\b.+\b\w+(ed|en)\b/i.test(line) :
      topic === 'articles' ? /\b(a|an|the)\b/i.test(line) :
      topic === 'preposition' ? /\b(in|on|at|to|from|under|over|between|near)\b/i.test(line) :
      hasSubject && hasVerb;
    const status = hasSubject && hasVerb && matchesTopic ? '✅' : hasSubject && hasVerb ? '⚠️' : '❌';
    const improved = line.replace(/\s+/g, ' ').replace(/\.$/, '');
    return `${status} "${line}"
Versi lebih rapi: ${improved}.
Penjelasan: ${matchesTopic ? `Sudah mengarah ke ${guide.title}.` : `Cek lagi fokus grammar: ${guide.focus}.`}
Good effort!`;
  }).join('\n\n');

  if (lines.length < 3) {
    const remainingCount = 3 - lines.length;
    return `Wah, bagus, ${name}! Kamu sudah mulai memakai ${guide.title} dengan cukup jelas.

${checked}

Sekarang tinggal ${remainingCount} kalimat lagi ya. Coba buat kalimat tambahan dengan pola ini:

${guide.pattern}

Tips kecil:
Fokus ke ${guide.focus}. Saya tunggu lanjutannya, ${name}. Semangat! 😊`;
  }

  return `${checked}

Mantap, ${name}! Kamu sudah menyelesaikan 3 kalimat latihan untuk ${guide.title}.

Insight cepat:
Fokus utama topik ini adalah ${guide.focus}.

🎉 +15 XP untuk kamu, ${name}!

🔥 Challenge Time, ${name}!
1. Multiple choice: Mana yang benar?
   A) She go to school every day.
   B) She goes to school every day.
   C) She going to school every day.

2. Fill in the blank:
   I ____ English now.

3. Perbaiki kalimat:
   He go to the office yesterday.`;
};

const buildGrammarGameFeedback = (name: string, answer: string, topic: string) => {
  const text = answer.toLowerCase();
  let score = 40;
  if (text.includes('b') || text.includes('goes')) score += 20;
  if (text.includes('am learning') || text.includes('study') || text.includes('studying')) score += 20;
  if (text.includes('went') || text.includes('went to the office') || text.includes('he went')) score += 20;
  score = Math.min(100, score);
  const category = getSessionScoreCategory(score);

  return `Koreksi mini game:
1. Jawaban terbaik: B) She goes to school every day.
2. Contoh benar: I am learning English now.
3. Perbaikan: He went to the office yesterday.

Skor kamu: ${score}/100
Kategori: ${category}

Adaptive note:
${score >= 80 ? `Mantap! Kamu bisa naik ke variasi yang lebih kompleks dari ${getGrammarGuide(topic).title}.` : `Kita ulangi lagi pola dasar ${getGrammarGuide(topic).title} dengan contoh yang lebih simpel.`}

Mau lanjut, ${name}?
- Level up 🚀
- Ganti topik 🔄
- Latihan lagi 🔁`;
};

export {
  grammarTopicOptions,
  buildGrammarGreeting,
  buildGrammarTopicQuestion,
  normalizeGrammarTopic,
  getGrammarGuide,
  buildGrammarLesson,
  buildGrammarFeedback,
  buildGrammarGameFeedback,
};
