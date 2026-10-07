// Mandarin Complement Master (verb-forms mode): result, potential and directional complements, 30 per level.
// [verb, pinyin, verb meaning, complement, form, meaning of the asked form, wrong complement]
// The wrong complement makes a real but different word (听见 vs 听懂, 买不到 vs 买不起),
// so the learner has to read the meaning, not just the pattern.
export type ComplementForm = 'Hasil' | 'Belum' | 'Bisa' | 'Tidak bisa';
export type ComplementTuple = [verb: string, pinyin: string, verbMeaning: string, complement: string, form: ComplementForm, translation: string, wrongComplement: string];

export const easyComplements: ComplementTuple[] = [
  ['听', 'tīng', 'mendengar', '懂', 'Hasil', 'mendengar dan paham', '见'],
  ['看', 'kàn', 'melihat', '见', 'Hasil', 'melihat (tertangkap mata)', '懂'],
  ['做', 'zuò', 'mengerjakan', '完', 'Hasil', 'selesai mengerjakan', '错'],
  ['写', 'xiě', 'menulis', '错', 'Hasil', 'salah menulis', '完'],
  ['找', 'zhǎo', 'mencari', '到', 'Hasil', 'berhasil menemukan', '完'],
  ['吃', 'chī', 'makan', '饱', 'Hasil', 'makan sampai kenyang', '完'],
  ['学', 'xué', 'belajar', '会', 'Hasil', 'belajar sampai bisa', '完'],
  ['洗', 'xǐ', 'mencuci', '干净', 'Hasil', 'mencuci sampai bersih', '错'],
  ['听', 'tīng', 'mendengar', '见', 'Belum', 'tidak mendengar (suaranya)', '懂'],
  ['看', 'kàn', 'membaca', '懂', 'Belum', 'tidak paham saat membaca', '见'],
  ['做', 'zuò', 'membuat', '好', 'Hasil', 'selesai dibuat dengan baik', '错'],
  ['买', 'mǎi', 'membeli', '到', 'Belum', 'tidak berhasil membeli', '完'],
  ['说', 'shuō', 'berbicara', '错', 'Hasil', 'salah bicara', '完'],
  ['喝', 'hē', 'minum', '完', 'Hasil', 'selesai minum (habis)', '错'],
  ['关', 'guān', 'menutup', '上', 'Hasil', 'menutup rapat', '开'],
  ['打', 'dǎ', 'membuka (memukul)', '开', 'Hasil', 'membuka (pintu/kotak)', '完'],
  ['记', 'jì', 'mengingat', '住', 'Hasil', 'mengingat dengan baik (hafal)', '错'],
  ['拿', 'ná', 'mengambil', '走', 'Hasil', 'mengambil dan membawa pergi', '错'],
  ['卖', 'mài', 'menjual', '完', 'Belum', 'belum terjual habis', '错'],
  ['睡', 'shuì', 'tidur', '着', 'Hasil', 'berhasil tertidur', '好'],
  ['找', 'zhǎo', 'mencari', '到', 'Belum', 'tidak berhasil menemukan', '完'],
  ['吃', 'chī', 'makan', '完', 'Belum', 'belum selesai makan', '饱'],
  ['写', 'xiě', 'menulis', '完', 'Hasil', 'selesai menulis', '错'],
  ['看', 'kàn', 'menonton', '完', 'Hasil', 'selesai menonton', '见'],
  ['听', 'tīng', 'mendengar', '清楚', 'Belum', 'tidak mendengar dengan jelas', '完'],
  ['穿', 'chuān', 'memakai (baju)', '好', 'Hasil', 'selesai berpakaian dengan rapi', '错'],
  ['坐', 'zuò', 'duduk', '好', 'Hasil', 'duduk dengan baik di tempatnya', '错'],
  ['学', 'xué', 'belajar', '会', 'Belum', 'belum bisa (walau sudah belajar)', '完'],
  ['准备', 'zhǔnbèi', 'mempersiapkan', '好', 'Hasil', 'sudah siap dipersiapkan', '错'],
  ['回答', 'huídá', 'menjawab', '对', 'Hasil', 'menjawab dengan benar', '错'],
];

export const mediumComplements: ComplementTuple[] = [
  ['听', 'tīng', 'mendengar', '懂', 'Bisa', 'bisa paham saat mendengar', '见'],
  ['听', 'tīng', 'mendengar', '懂', 'Tidak bisa', 'tidak bisa paham saat mendengar', '见'],
  ['看', 'kàn', 'melihat', '见', 'Tidak bisa', 'tidak bisa melihat (terhalang/jauh)', '懂'],
  ['看', 'kàn', 'melihat', '清楚', 'Bisa', 'bisa melihat dengan jelas', '完'],
  ['吃', 'chī', 'makan', '完', 'Tidak bisa', 'tidak sanggup menghabiskan makanan', '饱'],
  ['吃', 'chī', 'makan', '饱', 'Tidak bisa', 'tidak bisa kenyang (porsinya kurang)', '完'],
  ['买', 'mǎi', 'membeli', '到', 'Tidak bisa', 'tidak bisa didapat (barangnya habis)', '起'],
  ['做', 'zuò', 'mengerjakan', '完', 'Bisa', 'bisa selesai mengerjakan', '好'],
  ['找', 'zhǎo', 'mencari', '到', 'Tidak bisa', 'tidak bisa menemukan', '完'],
  ['记', 'jì', 'mengingat', '住', 'Tidak bisa', 'tidak bisa menghafal', '错'],
  ['写', 'xiě', 'menulis', '完', 'Bisa', 'bisa selesai menulis', '好'],
  ['学', 'xué', 'belajar', '会', 'Bisa', 'bisa menguasai setelah belajar', '完'],
  ['睡', 'shuì', 'tidur', '着', 'Tidak bisa', 'tidak bisa tertidur', '好'],
  ['关', 'guān', 'menutup', '上', 'Tidak bisa', 'tidak bisa ditutup rapat', '开'],
  ['打', 'dǎ', 'membuka', '开', 'Tidak bisa', 'tidak bisa dibuka', '完'],
  ['听', 'tīng', 'mendengar', '见', 'Bisa', 'bisa mendengar (suaranya)', '懂'],
  ['拿', 'ná', 'mengangkat', '动', 'Tidak bisa', 'tidak kuat mengangkat (terlalu berat)', '走'],
  ['走', 'zǒu', 'berjalan', '动', 'Tidak bisa', 'tidak sanggup berjalan lagi (lelah)', '完'],
  ['来', 'lái', 'datang', '及', 'Bisa', 'masih sempat', '到'],
  ['来', 'lái', 'datang', '及', 'Tidak bisa', 'tidak sempat', '到'],
  ['说', 'shuō', 'berbicara', '清楚', 'Tidak bisa', 'tidak bisa menjelaskan dengan jelas', '完'],
  ['洗', 'xǐ', 'mencuci', '干净', 'Tidak bisa', 'tidak bisa dicuci bersih', '完'],
  ['修', 'xiū', 'memperbaiki', '好', 'Bisa', 'bisa diperbaiki', '完'],
  ['修', 'xiū', 'memperbaiki', '好', 'Tidak bisa', 'tidak bisa diperbaiki', '完'],
  ['用', 'yòng', 'memakai', '完', 'Tidak bisa', 'tidak akan habis dipakai', '好'],
  ['看', 'kàn', 'membaca', '懂', 'Bisa', 'bisa paham saat membaca', '见'],
  ['回', 'huí', 'kembali', '去', 'Tidak bisa', 'tidak bisa pulang ke sana', '来'],
  ['进', 'jìn', 'masuk', '去', 'Bisa', 'bisa masuk ke dalam sana', '来'],
  ['买', 'mǎi', 'membeli', '起', 'Tidak bisa', 'tidak mampu membeli (terlalu mahal)', '到'],
  ['买', 'mǎi', 'membeli', '起', 'Bisa', 'mampu membeli', '到'],
];

export const hardComplements: ComplementTuple[] = [
  ['想', 'xiǎng', 'berpikir', '起来', 'Hasil', 'teringat kembali', '出来'],
  ['想', 'xiǎng', 'berpikir', '起来', 'Tidak bisa', 'tidak bisa teringat', '出来'],
  ['想', 'xiǎng', 'berpikir', '出来', 'Hasil', 'menemukan (ide/cara)', '起来'],
  ['想', 'xiǎng', 'berpikir', '出来', 'Tidak bisa', 'tidak bisa menemukan ide', '起来'],
  ['站', 'zhàn', 'berdiri', '起来', 'Hasil', 'bangkit berdiri', '下去'],
  ['站', 'zhàn', 'berdiri', '起来', 'Tidak bisa', 'tidak bisa bangkit berdiri', '下去'],
  ['拿', 'ná', 'mengambil', '出来', 'Hasil', 'mengeluarkan (mengambil keluar)', '起来'],
  ['拿', 'ná', 'mengambil', '出来', 'Belum', 'belum dikeluarkan', '起来'],
  ['走', 'zǒu', 'berjalan', '进去', 'Hasil', 'berjalan masuk (menjauhi pembicara)', '进来'],
  ['走', 'zǒu', 'berjalan', '进来', 'Hasil', 'berjalan masuk (mendekati pembicara)', '进去'],
  ['跑', 'pǎo', 'berlari', '回来', 'Hasil', 'berlari kembali ke sini', '回去'],
  ['带', 'dài', 'membawa', '回去', 'Hasil', 'membawa pulang ke sana', '回来'],
  ['搬', 'bān', 'mengangkut', '上去', 'Tidak bisa', 'tidak bisa diangkut naik', '下来'],
  ['搬', 'bān', 'mengangkut', '上去', 'Hasil', 'mengangkut naik ke atas sana', '下来'],
  ['坚持', 'jiānchí', 'bertahan', '下去', 'Tidak bisa', 'tidak sanggup terus bertahan', '起来'],
  ['坚持', 'jiānchí', 'bertahan', '下去', 'Bisa', 'sanggup terus bertahan', '起来'],
  ['认', 'rèn', 'mengenali', '出来', 'Hasil', 'berhasil mengenali', '起来'],
  ['认', 'rèn', 'mengenali', '出来', 'Tidak bisa', 'tidak bisa mengenali', '起来'],
  ['听', 'tīng', 'mendengar', '出来', 'Bisa', 'bisa mengenali dari suaranya', '起来'],
  ['看', 'kàn', 'melihat', '出来', 'Tidak bisa', 'tidak bisa menangkap (maksud/perbedaan)', '起来'],
  ['爬', 'pá', 'memanjat', '上去', 'Tidak bisa', 'tidak bisa memanjat naik', '下来'],
  ['爬', 'pá', 'memanjat', '上去', 'Bisa', 'bisa memanjat naik', '下来'],
  ['放', 'fàng', 'menaruh', '进去', 'Tidak bisa', 'tidak muat dimasukkan', '出来'],
  ['放', 'fàng', 'menaruh', '进去', 'Hasil', 'memasukkan ke dalam', '出来'],
  ['笑', 'xiào', 'tertawa', '起来', 'Hasil', 'mulai tertawa', '下去'],
  ['停', 'tíng', 'berhenti', '下来', 'Tidak bisa', 'tidak bisa berhenti', '起来'],
  ['停', 'tíng', 'berhenti', '下来', 'Hasil', 'akhirnya berhenti', '起来'],
  ['记', 'jì', 'mencatat', '下来', 'Hasil', 'mencatat (agar tidak hilang)', '起来'],
  ['记', 'jì', 'mencatat', '下来', 'Belum', 'belum dicatat', '起来'],
  ['拿', 'ná', 'mengambil', '出来', 'Tidak bisa', 'tidak bisa mengeluarkan', '起来'],
];

/** Builds the surface form: 听懂, 没听懂, 听得懂, 听不懂. */
export function complementForm(verb: string, complement: string, form: ComplementForm) {
  if (form === 'Belum') return `没${verb}${complement}`;
  if (form === 'Bisa') return `${verb}得${complement}`;
  if (form === 'Tidak bisa') return `${verb}不${complement}`;
  return `${verb}${complement}`;
}

/** Forms that contrast with the asked one: same complement, different structure. */
export const contrastForms: Record<ComplementForm, [ComplementForm, ComplementForm]> = {
  Hasil: ['Belum', 'Bisa'],
  Belum: ['Hasil', 'Tidak bisa'],
  Bisa: ['Tidak bisa', 'Hasil'],
  'Tidak bisa': ['Bisa', 'Belum'],
};
