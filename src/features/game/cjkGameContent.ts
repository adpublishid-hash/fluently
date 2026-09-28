// Game banks for Mandarin and Japanese, shaped like arabicGameContent so the
// arcade can swap them in by target language.
import { hashSeed, seededRandom, seededShuffle } from '../../utils/quiz';

type LevelLabel = 'Easy' | 'Medium' | 'Hard';
type VocabTuple = [word: string, reading: string, meaning: string, icon: string, color: string];
type SentenceTuple = [prompt: string, tokens: string];
type ChoiceTuple = [prompt: string, translation: string, answer: string, distractors: string[], label: string, rule: string];

export type CjkGameContent = {
  wordBank: Array<{ word: string; answer: string; options: string[]; hint: string }>;
  listenTapQuestions: Array<{ word: string; answer: string; options: string[]; hint: string; level: LevelLabel }>;
  letterQuestQuestions: Array<{ word: string; icon: string; color: string; level: LevelLabel; letters: string[] }>;
  sentenceBuilderQuestions: Array<{ prompt: string; answer: string[]; words: string[]; level: LevelLabel }>;
  tenseMasterQuestions: ReturnType<typeof choiceItem>[];
  questionBuilderQuestions: ReturnType<typeof choiceItem>[];
  fillerCharacters: string;
};

const LEVELS: LevelLabel[] = ['Easy', 'Medium', 'Hard'];

function rotate<T>(items: T[], by: number) {
  return [...items.slice(by), ...items.slice(0, by)];
}

function buildVocabBanks(vocab: Record<LevelLabel, VocabTuple[]>) {
  const listenTapQuestions = LEVELS.flatMap((level) =>
    vocab[level].map(([word, reading, meaning], index, source) => ({
      word,
      answer: meaning,
      // Distractors come from neighbouring words; the arcade shuffles options when rendering.
      options: rotate([meaning, ...rotate(source, index + 1).slice(0, 3).map((item) => item[2])], index % 4),
      hint: reading,
      level,
    })),
  );
  const allCharacters = [...new Set(LEVELS.flatMap((level) => vocab[level].flatMap(([word]) => word.split(''))))];
  const letterQuestQuestions = LEVELS.flatMap((level) =>
    vocab[level].map(([word, , , icon, color], index) => {
      const distractors = rotate(allCharacters.filter((character) => !word.includes(character)), (index * 7) % allCharacters.length);
      const letters = seededShuffle([...word.split(''), ...distractors.slice(0, Math.max(6, 10 - word.length))], seededRandom(hashSeed(word, level, index)));
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

function buildSentences(sentences: Record<LevelLabel, SentenceTuple[]>) {
  return LEVELS.flatMap((level) =>
    sentences[level].map(([prompt, tokens], index) => {
      const answer = tokens.split(' ');
      return { prompt, answer, words: rotate([...answer].reverse(), index % answer.length), level };
    }),
  );
}

function choiceItem([prompt, translation, answer, distractors, label, rule]: ChoiceTuple, level: LevelLabel, index: number) {
  return {
    word: prompt,
    prompt,
    translation,
    answer,
    options: rotate([answer, ...distractors].slice(0, 4), index % 4),
    level,
    hint: translation,
    tense: label,
    type: label,
    formula: rule,
    rule,
  };
}

function buildChoices(items: Record<LevelLabel, ChoiceTuple[]>) {
  return LEVELS.flatMap((level) => items[level].map((item, index) => choiceItem(item, level, index)));
}

const mandarinVocab: Record<LevelLabel, VocabTuple[]> = {
  Easy: [
    ['书', 'shū', 'Buku', '📘', '#2563EB'], ['笔', 'bǐ', 'Pulpen', '🖊️', '#0EA5E9'], ['水', 'shuǐ', 'Air', '💧', '#0284C7'],
    ['茶', 'chá', 'Teh', '🍵', '#16A34A'], ['米饭', 'mǐfàn', 'Nasi', '🍚', '#CA8A04'], ['苹果', 'píngguǒ', 'Apel', '🍎', '#EF4444'],
    ['猫', 'māo', 'Kucing', '🐱', '#FBBF24'], ['狗', 'gǒu', 'Anjing', '🐶', '#F59E0B'], ['鱼', 'yú', 'Ikan', '🐟', '#38BDF8'],
    ['鸟', 'niǎo', 'Burung', '🐦', '#0EA5E9'], ['家', 'jiā', 'Rumah', '🏠', '#64748B'], ['学校', 'xuéxiào', 'Sekolah', '🏫', '#4FA3D1'],
    ['老师', 'lǎoshī', 'Guru', '👩‍🏫', '#0EA5E9'], ['学生', 'xuésheng', 'Pelajar', '🎓', '#7C3AED'], ['朋友', 'péngyou', 'Teman', '🤝', '#10B981'],
    ['太阳', 'tàiyáng', 'Matahari', '☀️', '#F59E0B'], ['月亮', 'yuèliang', 'Bulan', '🌙', '#A78BFA'], ['花', 'huā', 'Bunga', '🌸', '#FB7185'],
    ['树', 'shù', 'Pohon', '🌳', '#166534'], ['车', 'chē', 'Mobil', '🚗', '#DC2626'], ['门', 'mén', 'Pintu', '🚪', '#92400E'],
    ['手', 'shǒu', 'Tangan', '✋', '#F97316'], ['眼睛', 'yǎnjing', 'Mata', '👁️', '#475569'], ['牛奶', 'niúnǎi', 'Susu', '🥛', '#94A3B8'],
  ],
  Medium: [
    ['火车', 'huǒchē', 'Kereta', '🚆', '#475569'], ['飞机', 'fēijī', 'Pesawat', '✈️', '#38BDF8'], ['医院', 'yīyuàn', 'Rumah sakit', '🏥', '#DC2626'],
    ['医生', 'yīshēng', 'Dokter', '🩺', '#EF4444'], ['饭店', 'fàndiàn', 'Restoran', '🍽️', '#EA580C'], ['超市', 'chāoshì', 'Supermarket', '🛒', '#F59E0B'],
    ['手机', 'shǒujī', 'Ponsel', '📱', '#14B8A6'], ['电脑', 'diànnǎo', 'Komputer', '💻', '#2563EB'], ['钱', 'qián', 'Uang', '💰', '#CA8A04'],
    ['衣服', 'yīfu', 'Pakaian', '👕', '#0EA5E9'], ['雨伞', 'yǔsǎn', 'Payung', '☂️', '#8B5CF6'], ['下雨', 'xiàyǔ', 'Hujan', '🌧️', '#64748B'],
    ['生日', 'shēngrì', 'Ulang tahun', '🎂', '#EC4899'], ['电影', 'diànyǐng', 'Film', '🎬', '#1E293B'], ['音乐', 'yīnyuè', 'Musik', '🎵', '#7C3AED'],
    ['足球', 'zúqiú', 'Sepak bola', '⚽', '#22C55E'], ['地图', 'dìtú', 'Peta', '🗺️', '#65A30D'], ['钥匙', 'yàoshi', 'Kunci', '🔑', '#CA8A04'],
    ['咖啡', 'kāfēi', 'Kopi', '☕', '#92400E'], ['面条', 'miàntiáo', 'Mi', '🍜', '#F97316'], ['蛋糕', 'dàngāo', 'Kue', '🍰', '#FB7185'],
    ['眼镜', 'yǎnjìng', 'Kacamata', '👓', '#334155'], ['自行车', 'zìxíngchē', 'Sepeda', '🚲', '#16A34A'], ['房间', 'fángjiān', 'Kamar', '🛏️', '#6366F1'],
  ],
  Hard: [
    ['环境', 'huánjìng', 'Lingkungan', '🌿', '#16A34A'], ['经济', 'jīngjì', 'Ekonomi', '📈', '#0EA5E9'], ['文化', 'wénhuà', 'Budaya', '🏮', '#DC2626'],
    ['历史', 'lìshǐ', 'Sejarah', '📜', '#A16207'], ['科学', 'kēxué', 'Sains', '🔬', '#2563EB'], ['技术', 'jìshù', 'Teknologi', '🛠️', '#475569'],
    ['健康', 'jiànkāng', 'Kesehatan', '💪', '#EF4444'], ['交通', 'jiāotōng', 'Lalu lintas', '🚦', '#F59E0B'], ['旅游', 'lǚyóu', 'Wisata', '🧳', '#0EA5E9'],
    ['机会', 'jīhuì', 'Kesempatan', '🚪', '#F59E0B'], ['成功', 'chénggōng', 'Sukses', '🏆', '#CA8A04'], ['问题', 'wèntí', 'Masalah', '❓', '#9333EA'],
    ['办法', 'bànfǎ', 'Cara / solusi', '🔑', '#10B981'], ['经验', 'jīngyàn', 'Pengalaman', '🧭', '#7C3AED'], ['比赛', 'bǐsài', 'Pertandingan', '🏅', '#F97316'],
    ['会议', 'huìyì', 'Rapat', '👥', '#0F766E'], ['新闻', 'xīnwén', 'Berita', '📰', '#334155'], ['图书馆', 'túshūguǎn', 'Perpustakaan', '📚', '#4FA3D1'],
    ['博物馆', 'bówùguǎn', 'Museum', '🏛️', '#64748B'], ['大学', 'dàxué', 'Universitas', '🎓', '#6366F1'], ['城市', 'chéngshì', 'Kota', '🏙️', '#2563EB'],
    ['季节', 'jìjié', 'Musim', '🍂', '#EA580C'], ['礼物', 'lǐwù', 'Hadiah', '🎁', '#EC4899'], ['护照', 'hùzhào', 'Paspor', '🛂', '#1E293B'],
  ],
};

const mandarinSentences: Record<LevelLabel, SentenceTuple[]> = {
  Easy: [
    ['Saya pelajar.', '我 是 学生'], ['Apa kabar?', '你 好 吗'], ['Saya suka minum teh.', '我 喜欢 喝 茶'],
    ['Dia guru.', '他 是 老师'], ['Saya punya sebuah buku.', '我 有 一 本 书'], ['Ini kucing saya.', '这 是 我的 猫'],
    ['Kami pergi ke sekolah.', '我们 去 学校'], ['Dia sangat senang.', '她 很 高兴'], ['Saya tidak makan daging.', '我 不 吃 肉'],
    ['Hari ini sangat panas.', '今天 很 热'],
  ],
  Medium: [
    ['Saya bangun jam tujuh setiap pagi.', '我 每天 早上 七点 起床'], ['Dia naik kereta ke Beijing.', '他 坐 火车 去 北京'],
    ['Saya ingin membeli sepotong baju.', '我 想 买 一 件 衣服'], ['Kami makan malam di restoran.', '我们 在 饭店 吃 晚饭'],
    ['Bisakah kamu berbahasa Mandarin?', '你 会 说 中文 吗'], ['Kemarin saya menonton sebuah film.', '昨天 我 看 了 一 部 电影'],
    ['Rumah sakit ada di samping sekolah.', '医院 在 学校 旁边'], ['Saya lebih tinggi daripada dia.', '我 比 他 高'],
    ['Besok mungkin akan hujan.', '明天 可能 会 下雨'], ['Saya sudah menyelesaikan PR.', '我 已经 做完 作业 了'],
  ],
  Hard: [
    ['Walaupun capek, saya senang.', '虽然 很 累 但是 我 很 开心'], ['Jika besok hujan, kami tidak pergi.', '如果 明天 下雨 我们 就 不 去'],
    ['Saya menaruh buku di atas meja.', '我 把 书 放在 桌子 上 了'], ['Dia dipuji oleh guru.', '他 被 老师 表扬 了'],
    ['Karena macet, saya terlambat.', '因为 交通 很 堵 所以 我 迟到 了'], ['Semakin belajar, saya semakin suka Mandarin.', '我 越 学 越 喜欢 中文'],
    ['Melindungi lingkungan adalah tanggung jawab semua orang.', '保护 环境 是 每个 人 的 责任'], ['Begitu pulang, dia langsung memasak.', '他 一 回家 就 开始 做饭'],
    ['Buku ini sudah saya baca dua kali.', '这 本 书 我 已经 看了 两 遍'], ['Belajar Mandarin sangat membantu pekerjaan saya.', '学 中文 对 我 的 工作 很 有 帮助'],
  ],
};

const mandarinAspect: Record<LevelLabel, ChoiceTuple[]> = {
  Easy: [
    ['我昨天买____一本书。', 'Kemarin saya membeli sebuah buku.', '了', ['过', '着', '在'], 'Aspek 了', 'V + 了 untuk tindakan yang sudah selesai'],
    ['我____看书。', 'Saya sedang membaca buku.', '在', ['了', '过', '着'], 'Progresif 在', '在 + V untuk aktivitas yang sedang berlangsung'],
    ['我去____北京。', 'Saya pernah ke Beijing.', '过', ['了', '在', '着'], 'Pengalaman 过', 'V + 过 untuk pengalaman'],
    ['门开____。', 'Pintunya (dalam keadaan) terbuka.', '着', ['了', '过', '在'], 'Keadaan 着', 'V + 着 untuk keadaan yang berlanjut'],
    ['我明天____去上海。', 'Besok saya akan ke Shanghai.', '要', ['了', '过', '着'], 'Rencana 要', '要 + V untuk rencana'],
    ['他____在做作业。', 'Dia sedang mengerjakan PR.', '正', ['了', '过', '着'], 'Progresif 正在', '正在 + V untuk aktivitas yang sedang berlangsung'],
  ],
  Medium: [
    ['我从来没去____日本。', 'Saya belum pernah ke Jepang.', '过', ['了', '着', '在'], 'Pengalaman 过', '没 + V + 过 = belum pernah'],
    ['下雨____！', 'Hujan turun (sekarang)!', '了', ['过', '着', '在'], 'Perubahan 了', '了 di akhir kalimat untuk perubahan situasi'],
    ['他笑____说：“好。”', 'Dia berkata sambil tersenyum: "Baik."', '着', ['了', '过', '在'], 'Cara 着', 'V1 + 着 + V2 = melakukan V2 sambil V1'],
    ['我们快要到____。', 'Kita hampir sampai.', '了', ['过', '着', '在'], '快要…了', '快要 + V + 了 = hampir'],
    ['作业我已经写____了。', 'PR-nya sudah selesai saya kerjakan.', '完', ['着', '在', '吗'], 'Komplemen 完', 'V + 完 = selesai melakukan'],
    ['你听____我的话了吗？', 'Apakah kamu memahami ucapanku?', '懂', ['过', '在', '着'], 'Komplemen 懂', 'V + 懂 = memahami setelah mendengar/membaca'],
  ],
  Hard: [
    ['我吃____饭就去。', 'Setelah makan saya langsung pergi.', '了', ['过', '着', '在'], 'V1了…就V2', 'V1 + 了 + 就 + V2 = setelah V1 langsung V2'],
    ['你吃____北京烤鸭吗？', 'Pernahkah kamu makan bebek panggang Peking?', '过', ['了', '着', '在'], 'Pengalaman 过', 'V + 过 + 吗 menanyakan pengalaman'],
    ['墙上挂____一幅画。', 'Di dinding tergantung sebuah lukisan.', '着', ['过', '在', '完'], 'Eksistensi 着', 'Tempat + V + 着 + benda'],
    ['他把作业做____了。', 'Dia sudah menyelesaikan PR-nya.', '完', ['过', '着', '在'], '把 + komplemen', '把 + objek + V + komplemen hasil'],
    ['我们一边吃饭一边____天。', 'Kami makan sambil mengobrol.', '聊', ['了', '过', '着'], '一边…一边', '一边 V1 一边 V2 = melakukan V1 sambil V2'],
    ['我学中文学____三年了。', 'Saya sudah belajar Mandarin selama tiga tahun.', '了', ['过', '着', '在'], 'Durasi 了…了', 'V + 了 + durasi + 了 = sudah dan masih berlangsung'],
  ],
};

const mandarinQuestions: Record<LevelLabel, ChoiceTuple[]> = {
  Easy: [
    ['你叫____名字？', 'Siapa namamu?', '什么', ['哪儿', '谁', '几'], 'Kata tanya 什么', '什么 = apa'],
    ['你住在____？', 'Kamu tinggal di mana?', '哪儿', ['什么', '谁', '几'], 'Kata tanya 哪儿', '哪儿 = di mana'],
    ['他是____？', 'Dia siapa?', '谁', ['什么', '哪儿', '几'], 'Kata tanya 谁', '谁 = siapa'],
    ['你有____个哥哥？', 'Kamu punya berapa kakak laki-laki?', '几', ['什么', '谁', '哪儿'], 'Kata tanya 几', '几 + kata bantu bilangan untuk jumlah kecil'],
  ],
  Medium: [
    ['你是学生____？', 'Apakah kamu pelajar?', '吗', ['呢', '吧', '什么'], 'Partikel 吗', 'Kalimat + 吗 = pertanyaan ya/tidak'],
    ['我很好，你____？', 'Saya baik, kalau kamu?', '呢', ['吗', '什么', '谁'], 'Partikel 呢', '… 呢? = bagaimana dengan …?'],
    ['这件衣服____钱？', 'Baju ini berapa harganya?', '多少', ['几', '什么', '谁'], 'Kata tanya 多少', '多少 untuk jumlah/harga'],
  ],
  Hard: [
    ['你____学中文？', 'Mengapa kamu belajar Mandarin?', '为什么', ['什么', '哪儿', '谁'], 'Kata tanya 为什么', '为什么 = mengapa'],
    ['你____去北京？', 'Kapan kamu pergi ke Beijing?', '什么时候', ['哪儿', '谁', '为什么'], 'Kata tanya 什么时候', '什么时候 = kapan'],
    ['你____去学校？', 'Bagaimana (naik apa) kamu pergi ke sekolah?', '怎么', ['什么', '谁', '几'], 'Kata tanya 怎么', '怎么 + V = bagaimana caranya'],
  ],
};

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
  ...buildVocabBanks(mandarinVocab),
  sentenceBuilderQuestions: buildSentences(mandarinSentences),
  tenseMasterQuestions: buildChoices(mandarinAspect),
  questionBuilderQuestions: buildChoices(mandarinQuestions),
};

export const japaneseGameContent: CjkGameContent = {
  ...buildVocabBanks(japaneseVocab),
  sentenceBuilderQuestions: buildSentences(japaneseSentences),
  tenseMasterQuestions: buildChoices(japaneseForms),
  questionBuilderQuestions: buildChoices(japaneseQuestions),
};
