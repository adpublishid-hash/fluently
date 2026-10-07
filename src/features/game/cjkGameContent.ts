// Game banks for Mandarin and Japanese, shaped like arabicGameContent so the
// arcade can swap them in by target language.
import { hashSeed, seededRandom, seededShuffle } from '../../utils/quiz';
import { easyAspect, hardAspect, mediumAspect, type AspectTuple } from './mandarin/aspect';
import { complementForm, contrastForms, easyComplements, hardComplements, mediumComplements, type ComplementForm, type ComplementTuple } from './mandarin/complements';
import { easyConditionals, hardConditionals, mediumConditionals } from './mandarin/conditionals';
import { easyErrors, hardErrors, mediumErrors, type ErrorFixTuple } from './mandarin/errorFix';
import { easyMeasureWords, hardMeasureWords, mediumMeasureWords } from './mandarin/measureWords';
import { easyModals, hardModals, mediumModals } from './mandarin/modals';
import { easyQuestions, hardQuestions, mediumQuestions, type ChoiceTuple } from './mandarin/questions';
import { easySentences, hardSentences, mediumSentences, type SentenceTuple } from './mandarin/sentences';
import { easyVocab, hardVocab, mediumVocab, type VocabTuple } from './mandarin/vocab';

type LevelLabel = 'Easy' | 'Medium' | 'Hard';
type ByLevel<T> = Record<LevelLabel, T[]>;

type ChoiceQuestion = ReturnType<typeof choiceItem>;

export type CjkGameContent = {
  wordBank: Array<{ word: string; answer: string; options: string[]; hint: string }>;
  listenTapQuestions: Array<{ word: string; answer: string; options: string[]; hint: string; level: LevelLabel }>;
  letterQuestQuestions: Array<{ word: string; icon: string; color: string; level: LevelLabel; letters: string[] }>;
  sentenceBuilderQuestions: Array<{ prompt: string; answer: string[]; words: string[]; level: LevelLabel }>;
  tenseMasterQuestions: ChoiceQuestion[];
  questionBuilderQuestions: ChoiceQuestion[];
  verbFormsQuestions?: ReturnType<typeof buildComplements>;
  articleDashQuestions?: ChoiceQuestion[];
  modalQuestQuestions?: ChoiceQuestion[];
  conditionalRunQuestions?: ChoiceQuestion[];
  errorFixQuestions?: ReturnType<typeof buildErrorFix>;
  fillerCharacters: string;
};

const LEVELS: LevelLabel[] = ['Easy', 'Medium', 'Hard'];

/** Deterministic shuffle so every build serves the same, non-predictable option order. */
function shuffleFor<T>(items: T[], ...seed: Array<string | number>) {
  return seededShuffle(items, seededRandom(hashSeed('cjk-game', ...seed)));
}

function buildVocabBanks(vocab: ByLevel<VocabTuple>) {
  const listenTapQuestions = LEVELS.flatMap((level) =>
    vocab[level].map(([word, reading, meaning]) => {
      const others = shuffleFor(vocab[level].filter((item) => item[2] !== meaning).map((item) => item[2]), 'listen', level, word);
      return { word, answer: meaning, options: shuffleFor([meaning, ...others.slice(0, 3)], 'listen-options', level, word), hint: reading, level };
    }),
  );
  const allCharacters = [...new Set(LEVELS.flatMap((level) => vocab[level].flatMap(([word]) => word.split(''))))];
  const letterQuestQuestions = LEVELS.flatMap((level) =>
    vocab[level].map(([word, , , icon, color], index) => {
      const distractors = shuffleFor(allCharacters.filter((character) => !word.includes(character)), 'letters', level, word);
      let letters = shuffleFor([...word.split(''), ...distractors.slice(0, Math.max(6, 10 - word.length))], 'board', level, word, index);
      // Never spell the word out in the first tiles.
      if (letters.slice(0, word.length).join('') === word) letters = [...letters.slice(word.length), ...letters.slice(0, word.length)];
      return { word, icon, color, level, letters };
    }),
  );
  return {
    wordBank: listenTapQuestions.filter((item) => item.level === 'Easy').slice(0, 8),
    listenTapQuestions,
    letterQuestQuestions,
    fillerCharacters: allCharacters.join(''),
  };
}

function buildSentences(sentences: ByLevel<SentenceTuple>) {
  return LEVELS.flatMap((level) =>
    sentences[level].map(([prompt, tokens]) => {
      const answer = tokens.split(' ');
      let words = shuffleFor(answer, 'sentence', level, tokens);
      // Never hand out the puzzle already solved.
      for (let shift = 1; words.join(' ') === tokens && shift < answer.length; shift += 1) {
        words = [...answer.slice(shift), ...answer.slice(0, shift)];
      }
      return { prompt, answer, words, level };
    }),
  );
}

function choiceItem([prompt, translation, answer, distractors, label, rule]: ChoiceTuple, level: LevelLabel, extra: { time?: string } = {}) {
  return {
    word: prompt,
    prompt,
    translation,
    answer,
    options: shuffleFor([answer, ...distractors].slice(0, 4), 'choice', level, prompt, translation),
    level,
    hint: translation,
    tense: label,
    tone: label,
    type: label,
    formula: rule,
    rule,
    ...extra,
  };
}

function buildChoices(items: ByLevel<ChoiceTuple>) {
  return LEVELS.flatMap((level) => items[level].map((item) => choiceItem(item, level)));
}

function buildAspect(items: ByLevel<AspectTuple>) {
  return LEVELS.flatMap((level) => items[level].map((item) => choiceItem(item.slice(0, 6) as ChoiceTuple, level, { time: item[6] })));
}

const FORM_COPY: Record<ComplementForm, { label: string; pattern: string }> = {
  Hasil: { label: 'Komplemen hasil', pattern: 'V + komplemen (sudah / belum)' },
  Belum: { label: 'Komplemen hasil', pattern: 'V + komplemen (sudah / belum)' },
  Bisa: { label: 'Komplemen potensial', pattern: 'V + 得/不 + komplemen' },
  'Tidak bisa': { label: 'Komplemen potensial', pattern: 'V + 得/不 + komplemen' },
};

function buildComplements(items: ByLevel<ComplementTuple>) {
  return LEVELS.flatMap((level) =>
    items[level].map(([verb, pinyin, verbMeaning, complement, form, translation, wrongComplement], index) => {
      const answer = complementForm(verb, complement, form);
      // One option swaps the complement (meaning check), two keep it but change the structure (form check).
      const wrong = [complementForm(verb, wrongComplement, form), ...contrastForms[form].map((other) => complementForm(verb, complement, other))];
      const directional = complement.length > 1 && /[来去]$/.test(complement);
      const copy = directional && FORM_COPY[form].label === 'Komplemen hasil' ? { label: 'Komplemen arah', pattern: 'V + arah (sudah / belum)' } : FORM_COPY[form];
      return {
        word: verb,
        prompt: `${verb} (${pinyin}) — ${verbMeaning}`,
        translation,
        answer,
        options: shuffleFor([answer, ...wrong], 'complement', level, verb, translation),
        forms: { 'Kata kerja': verb, Pinyin: pinyin, Arti: verbMeaning, Bentuk: answer },
        activeForm: 'Bentuk',
        formLabel: copy.label,
        pattern: copy.pattern,
        level,
        hint: translation,
        id: `${level}-${verb}-${index}`,
      };
    }),
  );
}

function buildErrorFix(items: ByLevel<ErrorFixTuple>) {
  return LEVELS.flatMap((level) =>
    items[level].map(([wrong, correct, translation, type, rule, alternatives]) => ({
      word: wrong,
      prompt: wrong,
      translation,
      answer: correct,
      options: shuffleFor([correct, wrong, ...alternatives], 'fix', level, wrong),
      type,
      rule,
      level,
      hint: translation,
    })),
  );
}

const japaneseVocab: Record<LevelLabel, VocabTuple[]> = {
  Easy: [
    ['本', 'hon', 'Buku', '📘', '#2563EB'], ['ペン', 'pen', 'Pulpen', '🖊️', '#0EA5E9'], ['水', 'mizu', 'Air', '💧', '#0284C7'],
    ['お茶', 'ocha', 'Teh', '🍵', '#16A34A'], ['ご飯', 'gohan', 'Nasi', '🍚', '#CA8A04'], ['りんご', 'ringo', 'Apel', '🍎', '#EF4444'],
    ['猫', 'neko', 'Kucing', '🐱', '#FBBF24'], ['犬', 'inu', 'Anjing', '🐶', '#F59E0B'], ['魚', 'sakana', 'Ikan', '🐟', '#38BDF8'],
    ['鳥', 'tori', 'Burung', '🐦', '#0EA5E9'], ['家', 'ie', 'Rumah', '🏠', '#64748B'], ['学校', 'gakkou', 'Sekolah', '🏫', '#4FA3D1'],
    ['先生', 'sensei', 'Guru', '👩‍🏫', '#0EA5E9'], ['学生', 'gakusei', 'Pelajar', '🎓', '#7C3AED'], ['友達', 'tomodachi', 'Teman', '🤝', '#10B981'],
    ['太陽', 'taiyou', 'Matahari', '☀️', '#F59E0B'], ['月', 'tsuki', 'Bulan', '🌙', '#A78BFA'], ['花', 'hana', 'Bunga', '🌸', '#FB7185'],
    ['木', 'ki', 'Pohon', '🌳', '#166534'], ['車', 'kuruma', 'Mobil', '🚗', '#DC2626'], ['ドア', 'doa', 'Pintu', '🚪', '#92400E'],
    ['手', 'te', 'Tangan', '✋', '#F97316'], ['目', 'me', 'Mata', '👁️', '#475569'], ['牛乳', 'gyuunyuu', 'Susu', '🥛', '#94A3B8'],
  ],
  Medium: [
    ['電車', 'densha', 'Kereta', '🚆', '#475569'], ['飛行機', 'hikouki', 'Pesawat', '✈️', '#38BDF8'], ['病院', 'byouin', 'Rumah sakit', '🏥', '#DC2626'],
    ['医者', 'isha', 'Dokter', '🩺', '#EF4444'], ['レストラン', 'resutoran', 'Restoran', '🍽️', '#EA580C'], ['スーパー', 'suupaa', 'Supermarket', '🛒', '#F59E0B'],
    ['携帯', 'keitai', 'Ponsel', '📱', '#14B8A6'], ['パソコン', 'pasokon', 'Komputer', '💻', '#2563EB'], ['お金', 'okane', 'Uang', '💰', '#CA8A04'],
    ['服', 'fuku', 'Pakaian', '👕', '#0EA5E9'], ['傘', 'kasa', 'Payung', '☂️', '#8B5CF6'], ['雨', 'ame', 'Hujan', '🌧️', '#64748B'],
    ['誕生日', 'tanjoubi', 'Ulang tahun', '🎂', '#EC4899'], ['映画', 'eiga', 'Film', '🎬', '#1E293B'], ['音楽', 'ongaku', 'Musik', '🎵', '#7C3AED'],
    ['サッカー', 'sakkaa', 'Sepak bola', '⚽', '#22C55E'], ['地図', 'chizu', 'Peta', '🗺️', '#65A30D'], ['鍵', 'kagi', 'Kunci', '🔑', '#CA8A04'],
    ['コーヒー', 'koohii', 'Kopi', '☕', '#92400E'], ['ラーメン', 'raamen', 'Ramen', '🍜', '#F97316'], ['ケーキ', 'keeki', 'Kue', '🍰', '#FB7185'],
    ['眼鏡', 'megane', 'Kacamata', '👓', '#334155'], ['自転車', 'jitensha', 'Sepeda', '🚲', '#16A34A'], ['部屋', 'heya', 'Kamar', '🛏️', '#6366F1'],
  ],
  Hard: [
    ['環境', 'kankyou', 'Lingkungan', '🌿', '#16A34A'], ['経済', 'keizai', 'Ekonomi', '📈', '#0EA5E9'], ['文化', 'bunka', 'Budaya', '🏮', '#DC2626'],
    ['歴史', 'rekishi', 'Sejarah', '📜', '#A16207'], ['科学', 'kagaku', 'Sains', '🔬', '#2563EB'], ['技術', 'gijutsu', 'Teknologi', '🛠️', '#475569'],
    ['健康', 'kenkou', 'Kesehatan', '💪', '#EF4444'], ['交通', 'koutsuu', 'Lalu lintas', '🚦', '#F59E0B'], ['旅行', 'ryokou', 'Perjalanan', '🧳', '#0EA5E9'],
    ['機会', 'kikai', 'Kesempatan', '🚪', '#F59E0B'], ['成功', 'seikou', 'Sukses', '🏆', '#CA8A04'], ['問題', 'mondai', 'Masalah', '❓', '#9333EA'],
    ['方法', 'houhou', 'Cara / metode', '🔑', '#10B981'], ['経験', 'keiken', 'Pengalaman', '🧭', '#7C3AED'], ['試合', 'shiai', 'Pertandingan', '🏅', '#F97316'],
    ['会議', 'kaigi', 'Rapat', '👥', '#0F766E'], ['ニュース', 'nyuusu', 'Berita', '📰', '#334155'], ['図書館', 'toshokan', 'Perpustakaan', '📚', '#4FA3D1'],
    ['博物館', 'hakubutsukan', 'Museum', '🏛️', '#64748B'], ['大学', 'daigaku', 'Universitas', '🎓', '#6366F1'], ['都市', 'toshi', 'Kota', '🏙️', '#2563EB'],
    ['季節', 'kisetsu', 'Musim', '🍂', '#EA580C'], ['贈り物', 'okurimono', 'Hadiah', '🎁', '#EC4899'], ['パスポート', 'pasupooto', 'Paspor', '🛂', '#1E293B'],
  ],
};

const japaneseSentences: Record<LevelLabel, SentenceTuple[]> = {
  Easy: [
    ['Saya pelajar.', '私は 学生 です'], ['Ini buku saya.', 'これは 私の 本 です'], ['Setiap pagi saya minum kopi.', '毎朝 コーヒーを 飲みます'],
    ['Saya pergi ke sekolah.', '学校へ 行きます'], ['Saya suka kucing.', '猫が 好き です'], ['Hari ini panas.', '今日は 暑い です'],
    ['Saya menonton film dengan teman.', '友達と 映画を 見ます'], ['Stasiun ada di mana?', '駅は どこ ですか'],
    ['Saya tidak makan daging.', '私は 肉を 食べません'], ['Saya belajar bahasa Jepang.', '日本語を 勉強します'],
  ],
  Medium: [
    ['Kemarin saya menonton film dengan teman.', '昨日 友達と 映画を 見ました'], ['Bolehkah saya membuka jendela?', '窓を 開けても いい ですか'],
    ['Saya pernah pergi ke Jepang.', '日本へ 行った ことが あります'], ['Saya belajar sambil mendengarkan musik.', '音楽を 聞きながら 勉強します'],
    ['Saya menyikat gigi sebelum tidur.', '寝る 前に 歯を 磨きます'], ['Sebaiknya tidur lebih awal.', '早く 寝た ほうが いい です'],
    ['Saya bisa membaca sedikit kanji.', '漢字が 少し 読めます'], ['Besok mungkin hujan.', '明日は 雨が 降る かもしれません'],
    ['Kalau sudah sampai stasiun, tolong telepon.', '駅に 着いたら 電話して ください'], ['Tolong tunggu sebentar.', '少し 待って ください'],
  ],
  Hard: [
    ['Meskipun hujan, pertandingan tetap diadakan.', '雨が 降っても 試合は 行われます'], ['Saya menabung untuk kuliah di luar negeri.', '留学する ために お金を 貯めています'],
    ['Saya mencatat supaya tidak lupa.', '忘れない ように メモします'], ['Toko ini tidak hanya murah, tetapi juga enak.', 'この 店は 安い だけでなく おいしい です'],
    ['Paketnya seharusnya sampai besok.', '荷物は 明日 届く はず です'], ['Janji sepatutnya ditepati.', '約束は 守る べき です'],
    ['Kebiasaan berbeda tergantung negaranya.', '国に よって 習慣が 違います'], ['Saya ikut rapat sebagai penerjemah.', '通訳として 会議に 参加しました'],
    ['Perlu menilai berdasarkan data.', 'データに 基づいて 判断する 必要が あります'], ['Walau efektif, biayanya terlalu mahal.', '効果は ある ものの 費用が 高すぎます'],
  ],
};

const japaneseForms: Record<LevelLabel, ChoiceTuple[]> = {
  Easy: [
    ['昨日 映画を ____。', 'Kemarin saya menonton film.', '見ました', ['見ます', '見ません', '見て'], 'Lampau sopan', 'ます → ました untuk masa lalu'],
    ['毎日 日本語を ____。', 'Setiap hari saya belajar bahasa Jepang.', '勉強します', ['勉強しました', '勉強して', '勉強しない'], 'Sekarang/kebiasaan', 'Bentuk ます untuk kebiasaan'],
    ['私は お酒を ____。', 'Saya tidak minum alkohol.', '飲みません', ['飲みました', '飲みます', '飲んで'], 'Negatif sopan', 'ます → ません'],
    ['昨日は 学校へ ____。', 'Kemarin saya tidak pergi ke sekolah.', '行きませんでした', ['行きません', '行きました', '行って'], 'Negatif lampau', 'ません → ませんでした'],
    ['ここに 名前を ____ ください。', 'Tolong tulis nama di sini.', '書いて', ['書き', '書く', '書いた'], 'て-form', 'Bentuk て + ください untuk permintaan'],
    ['一緒に ____ か。', 'Maukah makan bersama?', '食べません', ['食べました', '食べて', '食べる'], 'Ajakan', 'V-ませんか untuk mengajak'],
  ],
  Medium: [
    ['今、雨が ____ います。', 'Sekarang sedang hujan.', '降って', ['降り', '降る', '降った'], 'ている', 'Bentuk て + いる untuk yang sedang berlangsung'],
    ['日本へ ____ ことが あります。', 'Saya pernah ke Jepang.', '行った', ['行く', '行って', '行き'], 'Pengalaman', 'Bentuk た + ことがある'],
    ['写真を ____ ください。', 'Tolong jangan memotret.', '撮らないで', ['撮って', '撮らない', '撮った'], 'Larangan halus', 'Bentuk ない + で + ください'],
    ['早く ____ ほうが いいです。', 'Sebaiknya tidur lebih awal.', '寝た', ['寝る', '寝て', '寝ない'], 'Saran', 'Bentuk た + ほうがいい'],
    ['音楽を ____ ながら 勉強します。', 'Saya belajar sambil mendengarkan musik.', '聞き', ['聞いて', '聞く', '聞いた'], 'Sambil', 'Batang ます + ながら'],
    ['漢字が 少し ____。', 'Saya bisa membaca sedikit kanji.', '読めます', ['読みます', '読んで', '読まれます'], 'Potensial', 'う → える (読む → 読める)'],
  ],
  Hard: [
    ['先生に ____。', 'Saya dipuji oleh guru.', 'ほめられました', ['ほめました', 'ほめさせました', 'ほめて'], 'Pasif', 'る → られる'],
    ['母は 弟に 野菜を ____。', 'Ibu menyuruh adik makan sayur.', '食べさせました', ['食べました', '食べられました', '食べて'], 'Kausatif', 'る → させる'],
    ['駅に ____ら、電話して ください。', 'Kalau sudah sampai stasiun, tolong telepon.', '着いた', ['着く', '着いて', '着き'], 'Kondisional たら', 'Bentuk た + ら'],
    ['雨が ____ も、試合は 行われます。', 'Meskipun hujan, pertandingan tetap diadakan.', '降って', ['降る', '降った', '降り'], 'Konsesi ても', 'Bentuk て + も'],
    ['明日までに レポートを 出さ____。', 'Saya harus menyerahkan laporan paling lambat besok.', 'なければなりません', ['なくてもいいです', 'ないでください', 'ましょう'], 'Kewajiban', 'Bentuk ない → なければなりません'],
    ['急げ____、間に合います。', 'Kalau bergegas, masih sempat.', 'ば', ['たら', 'と', 'なら'], 'Kondisional ば', 'う → えば (急ぐ → 急げば)'],
  ],
};

const japaneseQuestions: Record<LevelLabel, ChoiceTuple[]> = {
  Easy: [
    ['これは ____ ですか。', 'Ini apa?', '何', ['どこ', 'だれ', 'いつ'], 'Kata tanya 何', '何 (nan/nani) = apa'],
    ['トイレは ____ ですか。', 'Toilet di mana?', 'どこ', ['何', 'だれ', 'いつ'], 'Kata tanya どこ', 'どこ = di mana'],
    ['あの 人は ____ ですか。', 'Orang itu siapa?', 'だれ', ['何', 'どこ', 'いつ'], 'Kata tanya だれ', 'だれ = siapa'],
    ['誕生日は ____ ですか。', 'Kapan ulang tahunmu?', 'いつ', ['何', 'どこ', 'だれ'], 'Kata tanya いつ', 'いつ = kapan'],
  ],
  Medium: [
    ['この りんごは ____ ですか。', 'Apel ini berapa harganya?', 'いくら', ['いつ', 'だれ', 'どこ'], 'Kata tanya いくら', 'いくら = berapa (harga)'],
    ['今 ____ ですか。', 'Sekarang jam berapa?', '何時', ['何人', 'いくら', 'だれ'], 'Kata tanya 何時', '何時 (nanji) = jam berapa'],
    ['____ 人が 来ましたか。', 'Berapa orang yang datang?', '何人', ['何時', 'どこ', 'だれ'], 'Kata tanya 何人', '何人 (nannin) = berapa orang'],
  ],
  Hard: [
    ['____ 日本語を 勉強していますか。', 'Mengapa kamu belajar bahasa Jepang?', 'どうして', ['どこ', 'だれ', 'いくら'], 'Kata tanya どうして', 'どうして = mengapa'],
    ['駅まで ____ 行きますか。', 'Bagaimana caranya pergi ke stasiun?', 'どうやって', ['どうして', 'いつ', 'だれ'], 'Kata tanya どうやって', 'どうやって = dengan cara apa'],
    ['____ 色が 好きですか。', 'Kamu suka warna apa?', '何', ['どこ', 'だれ', 'いつ'], 'Kata tanya 何 + N', '何 + kata benda = N apa'],
  ],
};

export const mandarinGameContent: CjkGameContent = {
  ...buildVocabBanks({ Easy: easyVocab, Medium: mediumVocab, Hard: hardVocab }),
  sentenceBuilderQuestions: buildSentences({ Easy: easySentences, Medium: mediumSentences, Hard: hardSentences }),
  tenseMasterQuestions: buildAspect({ Easy: easyAspect, Medium: mediumAspect, Hard: hardAspect }),
  questionBuilderQuestions: buildChoices({ Easy: easyQuestions, Medium: mediumQuestions, Hard: hardQuestions }),
  verbFormsQuestions: buildComplements({ Easy: easyComplements, Medium: mediumComplements, Hard: hardComplements }),
  articleDashQuestions: buildChoices({ Easy: easyMeasureWords, Medium: mediumMeasureWords, Hard: hardMeasureWords }),
  modalQuestQuestions: buildChoices({ Easy: easyModals, Medium: mediumModals, Hard: hardModals }),
  conditionalRunQuestions: buildChoices({ Easy: easyConditionals, Medium: mediumConditionals, Hard: hardConditionals }),
  errorFixQuestions: buildErrorFix({ Easy: easyErrors, Medium: mediumErrors, Hard: hardErrors }),
};

export const japaneseGameContent: CjkGameContent = {
  ...buildVocabBanks(japaneseVocab),
  sentenceBuilderQuestions: buildSentences(japaneseSentences),
  tenseMasterQuestions: buildChoices(japaneseForms),
  questionBuilderQuestions: buildChoices(japaneseQuestions),
};
