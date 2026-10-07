// Mandarin vocabulary for Word Match, Letter Quest, Listen & Tap, Memory Card,
// Find Words, Speed Quiz and Typing Sprint: [hanzi, pinyin, meaning, icon, color], 30 per level.
export type VocabTuple = [word: string, reading: string, meaning: string, icon: string, color: string];

export const easyVocab: VocabTuple[] = [
  ['书', 'shū', 'Buku', '📘', '#2563EB'], ['笔', 'bǐ', 'Pulpen', '🖊️', '#0EA5E9'], ['水', 'shuǐ', 'Air', '💧', '#0284C7'],
  ['茶', 'chá', 'Teh', '🍵', '#16A34A'], ['米饭', 'mǐfàn', 'Nasi', '🍚', '#CA8A04'], ['苹果', 'píngguǒ', 'Apel', '🍎', '#EF4444'],
  ['猫', 'māo', 'Kucing', '🐱', '#FBBF24'], ['狗', 'gǒu', 'Anjing', '🐶', '#F59E0B'], ['鱼', 'yú', 'Ikan', '🐟', '#38BDF8'],
  ['鸟', 'niǎo', 'Burung', '🐦', '#0EA5E9'], ['家', 'jiā', 'Rumah', '🏠', '#64748B'], ['学校', 'xuéxiào', 'Sekolah', '🏫', '#4FA3D1'],
  ['老师', 'lǎoshī', 'Guru', '👩‍🏫', '#0EA5E9'], ['学生', 'xuésheng', 'Pelajar', '🎓', '#7C3AED'], ['朋友', 'péngyou', 'Teman', '🤝', '#10B981'],
  ['太阳', 'tàiyáng', 'Matahari', '☀️', '#F59E0B'], ['月亮', 'yuèliang', 'Bulan', '🌙', '#A78BFA'], ['花', 'huā', 'Bunga', '🌸', '#FB7185'],
  ['树', 'shù', 'Pohon', '🌳', '#166534'], ['车', 'chē', 'Mobil', '🚗', '#DC2626'], ['门', 'mén', 'Pintu', '🚪', '#92400E'],
  ['手', 'shǒu', 'Tangan', '✋', '#F97316'], ['眼睛', 'yǎnjing', 'Mata', '👁️', '#475569'], ['牛奶', 'niúnǎi', 'Susu', '🥛', '#94A3B8'],
  ['鸡蛋', 'jīdàn', 'Telur', '🥚', '#FBBF24'], ['面包', 'miànbāo', 'Roti', '🍞', '#D97706'], ['桌子', 'zhuōzi', 'Meja', '🪵', '#92400E'],
  ['椅子', 'yǐzi', 'Kursi', '🪑', '#A16207'], ['帽子', 'màozi', 'Topi', '🧢', '#2563EB'], ['鞋', 'xié', 'Sepatu', '👟', '#F97316'],
];

export const mediumVocab: VocabTuple[] = [
  ['火车', 'huǒchē', 'Kereta', '🚆', '#475569'], ['飞机', 'fēijī', 'Pesawat', '✈️', '#38BDF8'], ['医院', 'yīyuàn', 'Rumah sakit', '🏥', '#DC2626'],
  ['医生', 'yīshēng', 'Dokter', '🩺', '#EF4444'], ['饭店', 'fàndiàn', 'Restoran', '🍽️', '#EA580C'], ['超市', 'chāoshì', 'Supermarket', '🛒', '#F59E0B'],
  ['手机', 'shǒujī', 'Ponsel', '📱', '#14B8A6'], ['电脑', 'diànnǎo', 'Komputer', '💻', '#2563EB'], ['钱', 'qián', 'Uang', '💰', '#CA8A04'],
  ['衣服', 'yīfu', 'Pakaian', '👕', '#0EA5E9'], ['雨伞', 'yǔsǎn', 'Payung', '☂️', '#8B5CF6'], ['下雨', 'xiàyǔ', 'Hujan', '🌧️', '#64748B'],
  ['生日', 'shēngrì', 'Ulang tahun', '🎂', '#EC4899'], ['电影', 'diànyǐng', 'Film', '🎬', '#1E293B'], ['音乐', 'yīnyuè', 'Musik', '🎵', '#7C3AED'],
  ['足球', 'zúqiú', 'Sepak bola', '⚽', '#22C55E'], ['地图', 'dìtú', 'Peta', '🗺️', '#65A30D'], ['钥匙', 'yàoshi', 'Kunci', '🔑', '#CA8A04'],
  ['咖啡', 'kāfēi', 'Kopi', '☕', '#92400E'], ['面条', 'miàntiáo', 'Mi', '🍜', '#F97316'], ['蛋糕', 'dàngāo', 'Kue', '🍰', '#FB7185'],
  ['眼镜', 'yǎnjìng', 'Kacamata', '👓', '#334155'], ['自行车', 'zìxíngchē', 'Sepeda', '🚲', '#16A34A'], ['房间', 'fángjiān', 'Kamar', '🛏️', '#6366F1'],
  ['机场', 'jīchǎng', 'Bandara', '🛫', '#0EA5E9'], ['公园', 'gōngyuán', 'Taman', '🏞️', '#22C55E'], ['银行', 'yínháng', 'Bank', '🏦', '#475569'],
  ['厨房', 'chúfáng', 'Dapur', '🍳', '#EA580C'], ['报纸', 'bàozhǐ', 'Koran', '🗞️', '#64748B'], ['作业', 'zuòyè', 'PR', '📝', '#7C3AED'],
];

export const hardVocab: VocabTuple[] = [
  ['环境', 'huánjìng', 'Lingkungan', '🌿', '#16A34A'], ['经济', 'jīngjì', 'Ekonomi', '📈', '#0EA5E9'], ['文化', 'wénhuà', 'Budaya', '🏮', '#DC2626'],
  ['历史', 'lìshǐ', 'Sejarah', '📜', '#A16207'], ['科学', 'kēxué', 'Sains', '🔬', '#2563EB'], ['技术', 'jìshù', 'Teknologi', '🛠️', '#475569'],
  ['健康', 'jiànkāng', 'Kesehatan', '💪', '#EF4444'], ['交通', 'jiāotōng', 'Lalu lintas', '🚦', '#F59E0B'], ['旅游', 'lǚyóu', 'Wisata', '🧳', '#0EA5E9'],
  ['机会', 'jīhuì', 'Kesempatan', '🚪', '#F59E0B'], ['成功', 'chénggōng', 'Sukses', '🏆', '#CA8A04'], ['问题', 'wèntí', 'Masalah', '❓', '#9333EA'],
  ['办法', 'bànfǎ', 'Cara / solusi', '🔑', '#10B981'], ['经验', 'jīngyàn', 'Pengalaman', '🧭', '#7C3AED'], ['比赛', 'bǐsài', 'Pertandingan', '🏅', '#F97316'],
  ['会议', 'huìyì', 'Rapat', '👥', '#0F766E'], ['新闻', 'xīnwén', 'Berita', '📰', '#334155'], ['图书馆', 'túshūguǎn', 'Perpustakaan', '📚', '#4FA3D1'],
  ['博物馆', 'bówùguǎn', 'Museum', '🏛️', '#64748B'], ['大学', 'dàxué', 'Universitas', '🎓', '#6366F1'], ['城市', 'chéngshì', 'Kota', '🏙️', '#2563EB'],
  ['季节', 'jìjié', 'Musim', '🍂', '#EA580C'], ['礼物', 'lǐwù', 'Hadiah', '🎁', '#EC4899'], ['护照', 'hùzhào', 'Paspor', '🛂', '#1E293B'],
  ['责任', 'zérèn', 'Tanggung jawab', '🧭', '#7C3AED'], ['研究', 'yánjiū', 'Penelitian', '🔍', '#4FA3D1'], ['信息', 'xìnxī', 'Informasi', 'ℹ️', '#2563EB'],
  ['效率', 'xiàolǜ', 'Efisiensi', '⚡', '#CA8A04'], ['压力', 'yālì', 'Tekanan', '🗜️', '#DC2626'], ['竞争', 'jìngzhēng', 'Persaingan', '⚔️', '#F97316'],
];
