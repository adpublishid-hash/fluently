import { buildChoiceQuestion, hashSeed, seededRandom, seededShuffle, type ChoiceQuestion } from '../../../utils/quiz';
import { japaneseGrammarBank, type JapaneseGrammarPoint } from './japaneseGrammarBank';
import { japaneseLevels, type JapaneseLevelId, type JapaneseSkillId } from './japaneseModuleData';
import { getJapaneseLevelWords, getJapaneseVocabularySet, type JapaneseWord } from './japaneseVocabularyBank';
import { buildJapanesePractice } from './japanesePracticeGenerator';
import { japanesePassages } from '../../../features/passages/japanesePassages';
import { japanesePassagesBasic } from '../../../features/passages/japanesePassagesBasic';

type JapanesePattern = { label: string; japanese: string; romaji: string; meaning: string };
type JapaneseExample = { japanese: string; romaji: string; meaning: string };

export type JapaneseLesson = {
  title: string;
  subtitle: string;
  objective: string;
  explanation: string[];
  focus: string[];
  patterns: JapanesePattern[];
  vocabulary: JapaneseWord[];
  examples: JapaneseExample[];
  grammarNotes: Array<{ title: string; detail: string; example: string }>;
  kanjiFocus: Array<{ kanji: string; reading: string; meaning: string; tip: string }>;
  dialogue: Array<{ speaker: string; japanese: string; romaji: string; meaning: string }>;
  listeningScript: JapaneseExample;
  shadowingDrill: string[];
  culturalNotes: string[];
  productionSteps: string[];
  practice: ChoiceQuestion[];
  task: string;
  modelOutput?: JapaneseExample & { title: string };
  rubric?: string[];
  reviewPlan?: string[];
};

const skillTitle: Record<JapaneseSkillId, string> = {
  grammar: 'Grammar',
  speaking: 'Speaking',
  listening: 'Listening',
  reading: 'Reading',
  writing: 'Writing',
  vocabulary: 'Vocabulary',
  pronunciation: 'Pronunciation',
};

const levelTopics: Record<JapaneseLevelId, Record<JapaneseSkillId, string[]>> = {
  beginner: {
    grammar: ['です/じゃありません', 'は dan が', 'これ/それ/あれ', 'を dan ます', 'に dan で', 'い-adjective', 'な-adjective', 'past tense', 'から/まで', 'と/や', 'ませんか', 'たいです', 'てください', 'てもいいです', 'てはいけません', 'があります', 'ができます', 'から reason', 'と思います dasar', 'review N5'],
    speaking: ['self-introduction', 'greetings', 'ordering food', 'asking price', 'asking time', 'daily routine', 'likes and dislikes', 'invitation', 'shopping', 'directions', 'family', 'hobbies', 'weather', 'school', 'work basics', 'travel phrases', 'apology', 'thanks', 'simple opinion', 'N5 speaking review'],
    listening: ['greetings audio', 'numbers and time', 'classroom words', 'station announcement', 'shop dialogue', 'restaurant dialogue', 'daily routine', 'family talk', 'weather report', 'simple directions', 'phone message', 'schedule', 'hobby talk', 'short invitation', 'lost item', 'transport', 'doctor visit', 'simple request', 'mini story', 'N5 listening review'],
    reading: ['hiragana words', 'katakana words', 'simple signs', 'menu reading', 'schedule', 'short message', 'family profile', 'school notice', 'map instruction', 'weather note', 'shopping receipt', 'email basic', 'postcard', 'diary', 'station sign', 'event poster', 'simple article', 'form reading', 'kanji N5', 'N5 reading review'],
    writing: ['hiragana practice', 'katakana practice', 'self profile', 'daily routine sentences', 'shopping note', 'short invitation', 'simple email', 'diary 5 sentences', 'family paragraph', 'hobby paragraph', 'weather note', 'travel plan', 'apology note', 'thank-you note', 'directions', 'kanji N5 sentences', 'question writing', 'answer writing', 'mini composition', 'N5 writing review'],
    vocabulary: ['people', 'family', 'numbers', 'time', 'days', 'food', 'drink', 'places', 'transport', 'school', 'work', 'home', 'adjectives', 'verbs daily', 'shopping', 'weather', 'body', 'hobbies', 'travel', 'N5 vocab review'],
    pronunciation: ['mora rhythm', 'a i u e o', 'ka sa ta rows', 'small tsu', 'long vowel', 'n sound', 'r sound', 'double consonant', 'pitch accent intro', 'question intonation', 'particle wa/e/o', 'katakana rhythm', 'shadowing short', 'sentence chunks', 'polite ending', 'contrast pairs', 'slow to natural', 'listening mimic', 'recording check', 'N5 pronunciation review'],
  },
  elementary: {
    grammar: ['te-form system', 'ている', 'ない form', 'た form', 'ことがある', 'ほうがいい', 'と思う', 'と言う', 'ので', 'のに', 'ながら', '前に/後で', '予定です', 'ようになる', 'かもしれない', 'must forms', 'passive intro', 'potential form', 'conditional と/たら', 'review N4'],
    speaking: ['making plans', 'asking permission', 'explaining symptoms', 'travel problem', 'restaurant request', 'work schedule', 'asking favors', 'describing experience', 'giving advice', 'apologizing detail', 'lost directions', 'phone call', 'school event', 'shopping comparison', 'housing', 'rules', 'future plans', 'small talk', 'opinion with reason', 'N4 speaking review'],
    listening: ['te-form requests', 'station detail', 'weather and plan', 'doctor dialogue', 'school notice', 'work shift', 'travel issue', 'house rules', 'shopping comparison', 'restaurant booking', 'phone message', 'event information', 'experience story', 'advice dialogue', 'permission dialogue', 'schedule change', 'simple news', 'radio notice', 'conversation inference', 'N4 listening review'],
    reading: ['short emails', 'event notices', 'travel brochure', 'rules poster', 'daily blog', 'restaurant review', 'health advice', 'school announcement', 'work memo', 'housing ad', 'schedule table', 'product description', 'simple news', 'opinion paragraph', 'experience text', 'instructions', 'comparison text', 'kanji N4', 'mixed kana-kanji', 'N4 reading review'],
    writing: ['request email', 'experience paragraph', 'advice message', 'schedule explanation', 'travel plan', 'apology email', 'restaurant review', 'rules summary', 'health note', 'school notice', 'work memo', 'comparison paragraph', 'future plan', 'opinion with reason', 'diary 120 chars', 'kanji N4 sentences', 'form response', 'social post', 'mini essay', 'N4 writing review'],
    vocabulary: ['te-form verbs', 'health', 'travel', 'school events', 'work shift', 'housing', 'rules', 'comparison', 'experience', 'advice', 'booking', 'shopping', 'emotion', 'weather plan', 'public places', 'instructions', 'events', 'kanji N4', 'linking words', 'N4 vocab review'],
    pronunciation: ['te-form rhythm', 'long sentences', 'pitch in verbs', 'adjective pitch', 'sentence-final tone', 'natural pauses', 'shadowing dialogue', 'permission intonation', 'request softness', 'apology tone', 'contrastive stress', 'particle reduction', 'listening chunks', 'speed control', 'mora accuracy', 'kanji word rhythm', 'compound words', 'record-repeat', 'natural conversation', 'N4 pronunciation review'],
  },
  intermediate: {
    grammar: ['そう/よう/みたい', 'らしい', 'ば/なら', 'ても', 'ために/ように', 'ことになる', 'ことにする', 'わけ', 'はず', 'べき', 'ほど/くらい', 'だけでなく', 'に対して', 'について', 'として', 'によって', 'passive/causative', 'keigo intro', 'nominalization', 'review N3'],
    speaking: ['opinion and reason', 'problem solving', 'workplace talk', 'news summary', 'experience detail', 'comparison argument', 'recommendation', 'complaint polite', 'interview', 'presentation intro', 'story retell', 'cultural topic', 'service dialogue', 'clarification', 'negotiation basic', 'express uncertainty', 'explain process', 'agree disagree', 'mini debate', 'N3 speaking review'],
    listening: ['news gist', 'workplace conversation', 'customer service', 'university notice', 'problem solution', 'opinion dialogue', 'interview clip', 'recommendation', 'complaint', 'presentation', 'story retell', 'public announcement', 'cultural explanation', 'schedule conflict', 'instruction sequence', 'reason inference', 'attitude inference', 'fast dialogue', 'multi-speaker', 'N3 listening review'],
    reading: ['opinion essay', 'news article', 'work email', 'service notice', 'blog argument', 'interview text', 'explanation passage', 'instructions complex', 'comparison article', 'cultural text', 'review text', 'complaint letter', 'application info', 'survey result', 'editorial short', 'kanji N3', 'inference practice', 'main idea', 'detail scan', 'N3 reading review'],
    writing: ['opinion paragraph', 'formal email', 'complaint email', 'summary writing', 'recommendation', 'process explanation', 'comparison essay', 'experience reflection', 'news summary', 'proposal note', 'interview answer', 'cultural paragraph', 'argument outline', 'reason evidence', 'transition practice', 'kanji N3 writing', 'editing clarity', 'polite register', 'mini essay 250 chars', 'N3 writing review'],
    vocabulary: ['opinion words', 'workplace', 'news', 'service', 'university', 'problem solving', 'culture', 'argument', 'inference', 'formal email', 'complaint', 'survey', 'proposal', 'process', 'emotion nuance', 'adverbs N3', 'kanji N3', 'connectors', 'register', 'N3 vocab review'],
    pronunciation: ['natural speed', 'pitch accent N3', 'sentence grouping', 'discourse markers', 'formal speech rhythm', 'news shadowing', 'presentation pauses', 'repair phrases', 'soft disagreement', 'emphasis', 'compound kanji', 'adverb rhythm', 'keigo pronunciation', 'fast listening mimic', 'intonation patterns', 'long turns', 'clarification tone', 'recording analysis', 'fluency drill', 'N3 pronunciation review'],
  },
  advanced: {
    grammar: ['に違いない/に相違ない', 'ざるを得ない', 'かねない', 'に伴って', 'に応じて', 'にもかかわらず', 'ものの', '一方で', '上で', '次第', '限り', 'に基づいて', 'をめぐって', 'を通じて', 'わけではない', 'ないことはない', 'というものだ', 'にほかならない', 'keigo N2', 'review N2'],
    speaking: ['abstract opinion', 'professional meeting', 'formal disagreement', 'data commentary', 'social issue', 'policy suggestion', 'work report', 'academic explanation', 'interview advanced', 'negotiation', 'risk explanation', 'cause effect', 'stakeholder view', 'counterargument', 'formal presentation', 'Q&A handling', 'nuance repair', 'persuasive talk', 'synthesis', 'N2 speaking review'],
    listening: ['fast news', 'business meeting', 'lecture gist', 'formal interview', 'policy discussion', 'data explanation', 'abstract topic', 'stakeholder talk', 'announcement nuance', 'debate', 'Q&A', 'complaint resolution', 'risk report', 'academic mini lecture', 'opinion contrast', 'implicit meaning', 'speaker stance', 'fast multi-turn', 'summary selection', 'N2 listening review'],
    reading: ['editorial N2', 'research summary', 'business report', 'policy article', 'argument analysis', 'literary essay intro', 'abstract passage', 'comparison of views', 'implicit meaning', 'author stance', 'long email', 'contract notice', 'public policy', 'data article', 'critique', 'kanji N2', 'paragraph logic', 'inference advanced', 'summary task', 'N2 reading review'],
    writing: ['formal opinion essay', 'business proposal', 'meeting minutes', 'policy response', 'data commentary', 'argument with counterpoint', 'research summary', 'formal request', 'complaint response', 'abstract explanation', 'professional profile', 'risk analysis', 'stakeholder memo', 'persuasive email', 'editorial response', 'kanji N2 writing', 'register control', 'cohesion', 'essay 500 chars', 'N2 writing review'],
    vocabulary: ['abstract nouns', 'policy', 'business', 'research', 'data', 'risk', 'stakeholders', 'formal connectors', 'counterargument', 'editorial', 'legal notice', 'finance', 'technology', 'society', 'culture critique', 'kanji N2', 'idiom N2', 'keigo', 'nuance verbs', 'N2 vocab review'],
    pronunciation: ['formal presentation', 'pitch nuance', 'fast native chunks', 'news rhythm', 'keigo smoothness', 'contrastive intonation', 'stance marking', 'Q&A response', 'persuasive tone', 'data commentary rhythm', 'academic pauses', 'repair fluency', 'long sentence breath', 'implicit emotion', 'multi-clause phrasing', 'advanced shadowing', 'register switching', 'recording rubric', 'natural compression', 'N2 pronunciation review'],
  },
  proficiency: {
    grammar: ['や否や', 'そばから', 'ともなく', 'に至って', 'を余儀なくされる', 'に堪えない', 'までもない', 'に即して', 'をもって', 'と相まって', 'いかんによって', 'べく', 'まじき', 'ずにはおかない', 'ならでは', 'を皮切りに', 'といったところだ', '極まりない', 'formal rhetoric', 'review N1'],
    speaking: ['expert stance', 'academic debate', 'policy briefing', 'nuanced critique', 'abstract synthesis', 'literary response', 'professional negotiation', 'conference Q&A', 'risk and ethics', 'media analysis', 'research defense', 'cross-cultural talk', 'high keigo', 'rhetorical framing', 'impromptu speech', 'native-like repair', 'subtle disagreement', 'synthesis presentation', 'expert interview', 'N1 speaking review'],
    listening: ['academic lecture', 'expert interview', 'policy debate', 'implicit stance', 'media commentary', 'rapid discussion', 'literary talk', 'conference Q&A', 'business negotiation', 'ethics panel', 'research defense', 'rhetorical cues', 'sarcasm nuance', 'register shift', 'complex announcement', 'native conversation', 'argument structure', 'speaker intention', 'long synthesis', 'N1 listening review'],
    reading: ['N1 editorial', 'academic essay', 'policy paper', 'literary critique', 'research abstract', 'legal-style notice', 'philosophical passage', 'media criticism', 'argument synthesis', 'author intention', 'dense kanji', 'rhetorical structure', 'implicit critique', 'long-form article', 'multiple texts', 'kanji N1', 'summary evaluation', 'evidence mapping', 'critical reading', 'N1 reading review'],
    writing: ['academic essay', 'policy paper', 'critical review', 'research abstract', 'executive summary', 'formal speech draft', 'argument synthesis', 'literary response', 'media critique', 'risk memo', 'ethics position', 'professional negotiation email', 'grant-style proposal', 'rhetorical intro', 'counterargument mastery', 'kanji N1 writing', 'style refinement', 'coherence audit', 'essay 800 chars', 'N1 writing review'],
    vocabulary: ['academic nouns', 'policy terms', 'research verbs', 'rhetorical connectors', 'legal register', 'media critique', 'ethics', 'economy', 'technology', 'environment', 'literature', 'philosophy', 'high keigo', 'idioms N1', 'yojijukugo', 'kanji N1', 'stance markers', 'nuance adjectives', 'abstract verbs', 'N1 vocab review'],
    pronunciation: ['native-like flow', 'academic speech rhythm', 'rhetorical pauses', 'conference Q&A', 'high keigo pitch', 'rapid discourse', 'stance intonation', 'subtle emotion', 'expert presentation', 'panel discussion', 'argument emphasis', 'long-form shadowing', 'register switching', 'native repair', 'media commentary', 'literary reading', 'breath control', 'pitch audit', 'fluency benchmark', 'N1 pronunciation review'],
  },
};

const levelPattern: Record<JapaneseLevelId, JapanesePattern[]> = {
  beginner: [
    { label: 'Identitas', japanese: '私は学生です。', romaji: 'Watashi wa gakusei desu.', meaning: 'Saya adalah pelajar.' },
    { label: 'Objek', japanese: '水を飲みます。', romaji: 'Mizu o nomimasu.', meaning: 'Saya minum air.' },
    { label: 'Lokasi', japanese: '学校で勉強します。', romaji: 'Gakkou de benkyou shimasu.', meaning: 'Saya belajar di sekolah.' },
  ],
  elementary: [
    { label: 'Te-form Request', japanese: '少し待ってください。', romaji: 'Sukoshi matte kudasai.', meaning: 'Tolong tunggu sebentar.' },
    { label: 'Experience', japanese: '日本へ行ったことがあります。', romaji: 'Nihon e itta koto ga arimasu.', meaning: 'Saya pernah pergi ke Jepang.' },
    { label: 'Advice', japanese: '早く寝たほうがいいです。', romaji: 'Hayaku neta hou ga ii desu.', meaning: 'Sebaiknya tidur lebih awal.' },
  ],
  intermediate: [
    { label: 'Opinion', japanese: 'この方法は便利だと思います。', romaji: 'Kono houhou wa benri da to omoimasu.', meaning: 'Saya pikir cara ini praktis.' },
    { label: 'Purpose', japanese: '合格するために毎日勉強しています。', romaji: 'Goukaku suru tame ni mainichi benkyou shite imasu.', meaning: 'Saya belajar setiap hari agar lulus.' },
    { label: 'Contrast', japanese: '便利な一方で、費用が高いです。', romaji: 'Benri na ippou de, hiyou ga takai desu.', meaning: 'Di satu sisi praktis, tetapi biayanya mahal.' },
  ],
  advanced: [
    { label: 'Evidence-based Claim', japanese: 'データに基づいて判断する必要があります。', romaji: 'Deeta ni motozuite handan suru hitsuyou ga arimasu.', meaning: 'Perlu menilai berdasarkan data.' },
    { label: 'Concession', japanese: '効果があるものの、課題も残っています。', romaji: 'Kouka ga aru mono no, kadai mo nokotte imasu.', meaning: 'Walau efektif, masih ada masalah.' },
    { label: 'Risk', japanese: '準備不足は失敗につながりかねません。', romaji: 'Junbi busoku wa shippai ni tsunagari kanemasen.', meaning: 'Kurang persiapan bisa berujung kegagalan.' },
  ],
  proficiency: [
    { label: 'Academic Framing', japanese: '本稿では、この問題を批判的に再検討します。', romaji: 'Honkou de wa, kono mondai o hihanteki ni saikentou shimasu.', meaning: 'Tulisan ini meninjau ulang isu tersebut secara kritis.' },
    { label: 'Implication', japanese: 'この結果は制度設計に重要な示唆を与えます。', romaji: 'Kono kekka wa seido sekkei ni juuyou na shisa o ataemasu.', meaning: 'Hasil ini memberi implikasi penting bagi desain sistem.' },
    { label: 'Nuanced Claim', japanese: '一概に否定すべきではないものの、慎重な検討が求められます。', romaji: 'Ichigai ni hitei subeki de wa nai mono no, shinchou na kentou ga motomeraremasu.', meaning: 'Tidak seharusnya ditolak begitu saja, tetapi perlu kajian hati-hati.' },
  ],
};

const grammarFocusByLevel: Record<JapaneseLevelId, Array<{ title: string; detail: string; example: string }>> = {
  beginner: [
    { title: 'Urutan dasar', detail: 'Bahasa Jepang sering memakai pola Topik + Keterangan + Objek + Predikat. Predikat biasanya muncul di akhir.', example: '私は毎日日本語を勉強します。' },
    { title: 'Partikel sebagai penanda fungsi', detail: 'は menandai topik, を menandai objek, で menandai lokasi aktivitas, dan に menandai arah/waktu.', example: '学校で本を読みます。' },
    { title: 'Bentuk sopan', detail: 'Untuk pemula, pakai です/ます agar terdengar aman, rapi, dan sopan dalam situasi umum.', example: 'これは私の本です。' },
  ],
  elementary: [
    { title: 'Te-form sebagai penghubung', detail: 'Te-form dipakai untuk permintaan, urutan aksi, izin, larangan, dan keadaan yang sedang berlangsung.', example: '窓を開けてください。' },
    { title: 'Pengalaman dan saran', detail: 'ことがある menyatakan pengalaman; ほうがいい memberi saran yang natural.', example: '京都へ行ったことがあります。' },
    { title: 'Alasan yang halus', detail: 'ので terdengar lebih lembut daripada から dalam banyak situasi sopan.', example: '雨なので、行きません。' },
  ],
  intermediate: [
    { title: 'Nuansa pendapat', detail: 'と思います aman untuk opini, sedangkan でしょう/かもしれません memberi prediksi atau kemungkinan.', example: 'この方法は効果的だと思います。' },
    { title: 'Klausa penjelas', detail: 'Bahasa Jepang menaruh penjelas sebelum kata benda, sehingga kalimat bisa panjang tetapi tetap rapi.', example: '昨日買った本を読みました。' },
    { title: 'Konektor wacana', detail: '一方で, そのため, しかし membantu menyusun alasan, kontras, dan akibat.', example: '便利です。一方で、費用が高いです。' },
  ],
  advanced: [
    { title: 'Argumen formal', detail: 'N2 menuntut klaim yang punya dasar, batasan, dan akibat. Gunakan に基づいて, 一方で, ものの.', example: '調査結果に基づいて、改善策を提案します。' },
    { title: 'Keigo dan jarak sosial', detail: 'Pilih bentuk sopan, humble, atau honorific sesuai relasi pembicara dan pendengar.', example: '担当者に確認いたします。' },
    { title: 'Mitigasi klaim', detail: 'Gunakan とは限らない, わけではない untuk menghindari klaim terlalu absolut.', example: 'すべての人に効果があるわけではありません。' },
  ],
  proficiency: [
    { title: 'Retorika akademik', detail: 'N1 menilai kemampuan membingkai isu, membatasi klaim, dan menyusun evaluasi kritis.', example: '本稿では、この見解の妥当性を再検討します。' },
    { title: 'Nominalisasi padat', detail: 'Teks N1 sering memadatkan ide menjadi frasa nominal panjang.', example: '制度設計の再評価が求められています。' },
    { title: 'Nuansa stance', detail: 'Pilih kata seperti 示唆する, 検討する, 問題視する untuk menunjukkan posisi tanpa terdengar kasar.', example: 'この結果は新たな課題を示唆しています。' },
  ],
};

const kanjiFocusByLevel: Record<JapaneseLevelId, Array<{ kanji: string; reading: string; meaning: string; tip: string }>> = {
  beginner: [
    { kanji: '日', reading: 'にち / ひ', meaning: 'hari, matahari', tip: 'Muncul di 日本 dan 毎日.' },
    { kanji: '本', reading: 'ほん', meaning: 'buku, asal', tip: 'Gabungan 日 + 本 membentuk 日本.' },
    { kanji: '人', reading: 'ひと / じん', meaning: 'orang', tip: 'Dipakai untuk kewarganegaraan: 日本人.' },
    { kanji: '学', reading: 'がく', meaning: 'belajar', tip: 'Muncul di 学生 dan 学校.' },
  ],
  elementary: [
    { kanji: '行', reading: 'い / こう', meaning: 'pergi', tip: 'Perhatikan bentuk 行きます, 行った.' },
    { kanji: '食', reading: 'た / しょく', meaning: 'makan', tip: 'Pola dasar: 食べます.' },
    { kanji: '時', reading: 'じ / とき', meaning: 'waktu/jam', tip: 'Dipakai dalam jadwal dan jam.' },
    { kanji: '験', reading: 'けん', meaning: 'uji/pengalaman', tip: 'Muncul di 経験.' },
  ],
  intermediate: [
    { kanji: '意', reading: 'い', meaning: 'pikiran/maksud', tip: 'Muncul di 意見.' },
    { kanji: '理', reading: 'り', meaning: 'logika/alasan', tip: 'Muncul di 理由.' },
    { kanji: '課', reading: 'か', meaning: 'bagian/tugas', tip: 'Muncul di 課題.' },
    { kanji: '影', reading: 'えい / かげ', meaning: 'bayangan/pengaruh', tip: 'Muncul di 影響.' },
  ],
  advanced: [
    { kanji: '析', reading: 'せき', meaning: 'menganalisis', tip: 'Muncul di 分析.' },
    { kanji: '根', reading: 'こん / ね', meaning: 'akar/dasar', tip: 'Muncul di 根拠.' },
    { kanji: '策', reading: 'さく', meaning: 'strategi', tip: 'Muncul di 改善策.' },
    { kanji: '響', reading: 'きょう', meaning: 'gema/pengaruh', tip: 'Muncul di 影響.' },
  ],
  proficiency: [
    { kanji: '論', reading: 'ろん', meaning: 'argumen/teori', tip: 'Muncul di 論点 dan 論文.' },
    { kanji: '妥', reading: 'だ', meaning: 'tepat/layak', tip: 'Muncul di 妥当性.' },
    { kanji: '示', reading: 'じ / しめ', meaning: 'menunjukkan', tip: 'Muncul di 示唆.' },
    { kanji: '括', reading: 'かつ', meaning: 'mengikat/merangkum', tip: 'Muncul di 包括的.' },
  ],
};

const cultureByLevel: Record<JapaneseLevelId, string[]> = {
  beginner: [
    'Gunakan です/ます untuk percakapan awal; bentuk ini aman untuk orang baru dikenal.',
    'Aizuchi seperti はい, そうですか, dan いいですね menunjukkan bahwa kamu mendengarkan.',
  ],
  elementary: [
    'Permintaan dengan てください cukup netral, tetapi てもらえますか terdengar lebih lembut.',
    'Saat menolak, orang Jepang sering memberi alasan dulu agar terdengar sopan.',
  ],
  intermediate: [
    'Dalam diskusi, hindari terlalu langsung. Pakai と思います atau かもしれません untuk melunakkan pendapat.',
    'Email dan layanan pelanggan lebih sering memakai pola formal daripada percakapan teman.',
  ],
  advanced: [
    'Keigo bukan hanya grammar; ia menunjukkan jarak sosial, tanggung jawab, dan profesionalitas.',
    'Argumen formal Jepang sering mulai dari konteks, lalu masalah, baru usulan.',
  ],
  proficiency: [
    'Pada level N1, register sangat penting: akademik, editorial, bisnis, dan percakapan ahli punya pilihan kata berbeda.',
    'Kritik yang baik biasanya tidak menyerang langsung, tetapi menilai 妥当性, 根拠, dan 限界.',
  ],
};

const QUIZ_LENGTH = 12;

/** Grammar focus for a lesson; lesson 20 (review) samples the level's points. */
function getGrammarPoint(level: JapaneseLevelId, lessonId: number): JapaneseGrammarPoint {
  const points = japaneseGrammarBank[level];
  const point = points[lessonId - 1];
  if (point) return point;
  const first = points[0];
  const middle = points[Math.floor(points.length / 2)];
  return {
    pattern: `Review ${japaneseLevels[level].badge}`,
    meaning: `mengulang pola utama ${japaneseLevels[level].badge}`,
    formation: points.map((item) => item.pattern).join(' · '),
    examples: [first.examples[0], middle.examples[0]],
  };
}

const topicWords = (text: string) => text.toLowerCase().split(/[^a-z]+/).filter((word) => word.length > 3);

/**
 * Vocabulary lesson n uses theme n. Other skills use the vocabulary theme whose
 * title shares a keyword with the lesson topic, falling back to lesson order.
 */
function vocabularyThemeFor(level: JapaneseLevelId, skill: JapaneseSkillId, lessonId: number, topic: string): number {
  if (skill === 'vocabulary') return lessonId;
  const keywords = topicWords(topic);
  const themes = levelTopics[level].vocabulary;
  const match = themes.findIndex((theme, index) => index < themes.length - 1 && topicWords(theme).some((word) => keywords.includes(word)));
  return match >= 0 ? match + 1 : lessonId;
}

function buildDialogue(point: JapaneseGrammarPoint, word: JapaneseWord): JapaneseLesson['dialogue'] {
  const [first, second] = point.examples;
  return [
    { speaker: 'A', ...first },
    { speaker: 'B', ...second },
    {
      speaker: 'A',
      japanese: `「${word.japanese}」という言葉も使ってみましょう。`,
      romaji: `"${word.romaji}" to iu kotoba mo tsukatte mimashou.`,
      meaning: `Ayo coba pakai juga kata "${word.meaning}".`,
    },
  ];
}

function buildPractice(
  level: JapaneseLevelId,
  skill: JapaneseSkillId,
  lessonId: number,
  point: JapaneseGrammarPoint,
  words: JapaneseWord[],
): ChoiceQuestion[] {
  const random = seededRandom(hashSeed('japanese', level, skill, lessonId));
  const levelWords = getJapaneseLevelWords(level);
  const levelPoints = japaneseGrammarBank[level];
  const levelSentences = levelPoints.flatMap((item) => item.examples);
  const questions: Array<ChoiceQuestion | null> = [];

  seededShuffle(words, random).slice(0, 5).forEach((word) => {
    questions.push(buildChoiceQuestion(`Apa arti「${word.japanese}」?`, word.meaning, levelWords.map((item) => item.meaning), random));
  });
  seededShuffle(words, random).slice(0, 3).forEach((word) => {
    questions.push(buildChoiceQuestion(`Kata Jepang untuk "${word.meaning}" adalah...`, word.japanese, levelWords.map((item) => item.japanese), random));
  });
  seededShuffle(words, random).slice(0, 2).forEach((word) => {
    questions.push(buildChoiceQuestion(`Cara membaca「${word.japanese}」adalah...`, word.romaji, levelWords.map((item) => item.romaji), random));
  });
  point.examples.forEach((example) => {
    questions.push(buildChoiceQuestion(`Arti kalimat「${example.japanese}」adalah...`, example.meaning, levelSentences.map((item) => item.meaning), random));
  });
  if (!point.pattern.startsWith('Review')) {
    questions.push(buildChoiceQuestion(`Pola「${point.pattern}」dipakai untuk...`, point.meaning, levelPoints.map((item) => item.meaning), random));
  } else {
    seededShuffle(levelPoints, random).slice(0, 3).forEach((item) => {
      questions.push(buildChoiceQuestion(`Pola「${item.pattern}」dipakai untuk...`, item.meaning, levelPoints.map((other) => other.meaning), random));
    });
  }

  return seededShuffle(questions.filter((item): item is ChoiceQuestion => item !== null), random).slice(0, QUIZ_LENGTH);
}

const passageSentenceCache = new Map<JapaneseLevelId, Array<{ japanese: string; meaning: string }>>();
function levelPassageSentences(level: JapaneseLevelId) {
  if (!passageSentenceCache.has(level)) {
    passageSentenceCache.set(level, [...japanesePassagesBasic, ...japanesePassages]
      .filter((passage) => passage.level === level)
      .flatMap((passage) => passage.sentences.map(([japanese, , meaning]) => ({ japanese, meaning }))));
  }
  return passageSentenceCache.get(level)!;
}

/** Skill-specific questions first; the shared lesson drills fill the rest of the quiz. */
function lessonPractice(
  level: JapaneseLevelId,
  skill: JapaneseSkillId,
  lessonId: number,
  point: JapaneseGrammarPoint,
  words: JapaneseWord[],
  signature: JapanesePattern,
): ChoiceQuestion[] {
  const passageSentences = levelPassageSentences(level);
  // Each lesson number gets its own two passage sentences.
  const passage = passageSentences.length
    ? [0, 1].map((offset) => passageSentences[((lessonId - 1) * 2 + offset) % passageSentences.length])
    : [];
  const specific = buildJapanesePractice(skill, {
    pattern: point.pattern,
    examples: point.examples,
    signature,
    passage,
    words,
    levelPatterns: japaneseGrammarBank[level].map((item) => item.pattern),
    levelSentences: [...japaneseGrammarBank[level].flatMap((item) => item.examples), ...levelPattern[level], ...passageSentences],
    levelWords: getJapaneseLevelWords(level),
  }, hashSeed('japanese-practice', level, skill, lessonId));
  const seen = new Set<string>();
  const merged = [...specific, ...buildPractice(level, skill, lessonId, point, words)]
    .filter((item) => (seen.has(item.question) ? false : (seen.add(item.question), true)))
    .slice(0, QUIZ_LENGTH);
  return seededShuffle(merged, seededRandom(hashSeed('japanese-order', level, skill, lessonId)));
}

function buildSkillExplanation(skill: JapaneseSkillId, topic: string, level: JapaneseLevelId) {
  const badge = japaneseLevels[level].badge;
  const map: Record<JapaneseSkillId, string> = {
    grammar: `Untuk grammar ${badge}, pecah pola "${topic}" menjadi bentuk dasar, fungsi, lalu batas pemakaian. Jangan hafalkan rumus saja; cek partikel, konjugasi, dan register.`,
    speaking: `Untuk speaking ${badge}, gunakan "${topic}" sebagai fungsi komunikasi. Latih respons pendek, lalu perluas menjadi jawaban 30-90 detik sesuai level.`,
    listening: `Untuk listening ${badge}, dengarkan kata kunci, predikat akhir, dan perubahan intonasi. Ulang audio dua kali: pertama untuk gist, kedua untuk detail.`,
    reading: `Untuk reading ${badge}, cari topik kalimat, konektor, dan predikat akhir. Pada level atas, fokus pada stance penulis dan hubungan antarparagraf.`,
    writing: `Untuk writing ${badge}, mulai dari outline Bahasa Indonesia, lalu ubah menjadi kalimat Jepang dengan pola target. Periksa partikel dan register sebelum selesai.`,
    vocabulary: `Untuk vocabulary ${badge}, pelajari kata sebagai kolokasi, bukan daftar lepas. Hafalkan pasangan kata, contoh, dan situasi pemakaian.`,
    pronunciation: `Untuk pronunciation ${badge}, prioritaskan mora, panjang vokal, small tsu, dan pitch. Rekam suara lalu bandingkan dengan TTS.`,
  };
  return map[skill];
}

export function getJapaneseTopicList(level: JapaneseLevelId, skill: JapaneseSkillId): string[] {
  return levelTopics[level][skill];
}

export function getJapaneseLessonPreview(skill: JapaneseSkillId, lessonId: number, level: JapaneseLevelId) {
  return `${japaneseLevels[level].badge} ${skillTitle[skill]} - ${levelTopics[level][skill][lessonId - 1] ?? 'review'}`;
}

export function getJapaneseLesson(skill: JapaneseSkillId, lessonId: number, level: JapaneseLevelId): JapaneseLesson {
  const topic = levelTopics[level][skill][lessonId - 1] ?? 'review';
  const levelInfo = japaneseLevels[level];
  const title = `${levelInfo.badge} ${skillTitle[skill]}: ${topic}`;
  const point = getGrammarPoint(level, lessonId);
  const words = getJapaneseVocabularySet(level, vocabularyThemeFor(level, skill, lessonId, topic));
  const signature = levelPattern[level][(lessonId - 1) % levelPattern[level].length];
  const [first, second] = point.examples;

  return {
    title,
    subtitle: `${skillTitle[skill]} lesson ${lessonId} - ${levelInfo.title}`,
    objective: `Menguasai ${topic} pada standar ${levelInfo.badge}, dengan pola fokus「${point.pattern}」dan ${words.length} kosakata tematik.`,
    explanation: [
      `Pola fokus lesson ini adalah「${point.pattern}」: ${point.meaning}. Rumus: ${point.formation}`,
      buildSkillExplanation(skill, topic, level),
      `Fokus utamanya adalah memahami kapan pola dipakai, bukan hanya menerjemahkan kata per kata.`,
      `Saat membaca atau mendengar contoh Jepang, perhatikan partikel, urutan informasi, level kesopanan, dan kata kunci topik.`,
    ],
    focus: [
      `Kenali fungsi「${point.pattern}」.`,
      `Kuasai ${words.slice(0, 3).map((word) => word.japanese).join('、')} dan kosakata tematik lainnya.`,
      `Gunakan contoh untuk membuat jawaban pribadi tentang ${topic}.`,
      `Review dengan suara keras agar ritme Jepang terasa natural.`,
    ],
    patterns: [
      { label: point.pattern, ...first },
      { label: point.pattern, ...second },
      signature,
    ],
    vocabulary: words,
    examples: [first, second, { japanese: signature.japanese, romaji: signature.romaji, meaning: signature.meaning }],
    grammarNotes: [
      { title: point.pattern, detail: `${point.meaning}. ${point.formation}`, example: first.japanese },
      ...grammarFocusByLevel[level],
    ],
    kanjiFocus: kanjiFocusByLevel[level],
    dialogue: buildDialogue(point, words[(lessonId - 1) % words.length]),
    listeningScript: {
      japanese: `${first.japanese}${second.japanese}`,
      romaji: `${first.romaji} ${second.romaji}`,
      meaning: `Dengarkan dua kalimat inti untuk topik ${topic}, lalu catat predikat akhir dan kata kunci.`,
    },
    shadowingDrill: [first.japanese, second.japanese, signature.japanese],
    culturalNotes: cultureByLevel[level],
    productionSteps: ['Pahami pola', 'Tiru contoh dengan suara', 'Ganti kosakata sesuai topik', 'Buat output pribadi'],
    practice: lessonPractice(level, skill, lessonId, point, words, signature),
    task: `Buat 5-8 kalimat Jepang bertema ${topic}. Pakai pola「${point.pattern}」, minimal 3 kosakata dari lesson ini (${words.slice(0, 3).map((word) => word.japanese).join('、')}), romaji, dan arti Bahasa Indonesia.`,
    modelOutput: {
      title: `Model Output ${levelInfo.badge}`,
      ...first,
    },
    rubric: [
      'Pola kalimat sesuai level.',
      'Partikel dan konjugasi diperiksa.',
      'Kosakata relevan dengan topik.',
      'Pelafalan mengikuti mora dan intonasi Jepang.',
      'Output punya arti jelas dalam Bahasa Indonesia.',
    ],
    reviewPlan: [
      'Hari 1: baca materi dan dengarkan semua contoh TTS.',
      'Hari 2: tulis ulang pola dan ganti 3 kosakata.',
      'Hari 3: rekam shadowing 3 kali, lalu bandingkan ritmenya.',
      'Hari 4: kerjakan ulang quiz tanpa melihat catatan.',
    ],
  };
}
