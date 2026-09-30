import type { LessonCoreTuple } from '../types';

// Pronunciation HSK 1 — one entry per lesson (index = lesson - 1). Titles come from the topic list.
export const pronunciation: LessonCoreTuple[] = [
  [null, ['Nada 1 (ˉ) tinggi dan datar, seperti menahan nada "sol" panjang.', 'Jaga tinggi suara sama dari awal sampai akhir suku kata.'], [
    ['他喝咖啡。', 'Tā hē kā fēi.', 'Dia minum kopi.'],
    ['今天星期一。', 'Jīn tiān xīng qī yī.', 'Hari ini hari Senin.'],
    ['医生', 'yī shēng', 'dokter'],
    ['飞机', 'fēi jī', 'pesawat'],
  ]],
  [null, ['Nada 2 (ˊ) naik dari tengah ke tinggi, seperti bertanya "hah?".', 'Jangan mulai terlalu rendah; naik cepat dan jelas.'], [
    ['同学', 'tóng xué', 'teman sekelas'],
    ['学习', 'xué xí', 'belajar'],
    ['人民', 'rén mín', 'rakyat'],
    ['明年回国。', 'Míng nián huí guó.', 'Tahun depan pulang ke negara asal.'],
  ]],
  [null, ['Nada 3 (ˇ) turun rendah lalu sedikit naik; dalam ucapan cepat sering hanya "rendah".', 'Di akhir kalimat ucapkan penuh; di tengah cukup rendah.'], [
    ['你好', 'nǐ hǎo', 'halo'],
    ['我走了。', 'Wǒ zǒu le.', 'Saya pergi.'],
    ['很冷', 'hěn lěng', 'sangat dingin'],
    ['买水果', 'mǎi shuǐ guǒ', 'membeli buah'],
  ]],
  [null, ['Nada 4 (ˋ) turun tajam dari tinggi ke rendah, seperti perintah "ya!".', 'Ucapkan tegas dan pendek, jangan diseret.'], [
    ['再见', 'zài jiàn', 'sampai jumpa'],
    ['电视', 'diàn shì', 'televisi'],
    ['汉字', 'hàn zì', 'Hanzi / aksara Tionghoa'],
    ['饭店', 'fàn diàn', 'hotel / restoran besar'],
  ]],
  [null, ['Nada netral: ringan, pendek, tanpa tanda nada (妈妈 māma, 桌子 zhuōzi).', 'Muncul pada partikel 吗/呢/了 dan suku kedua kata ulang.'], [
    ['你呢？', 'Nǐ ne?', 'Kamu bagaimana?'],
    ['桌子', 'zhuō zi', 'meja'],
    ['东西', 'dōng xi', 'barang'],
    ['他来了吗？', 'Tā lái le ma?', 'Apakah dia sudah datang?'],
  ]],
  [null, ['Pasangan nada 1-1: dua nada tinggi rata (星期, 咖啡).', 'Pasangan 1-4: tinggi datar lalu turun tajam (商店, 医院).'], [
    ['商店', 'shāng diàn', 'toko'],
    ['医院', 'yī yuàn', 'rumah sakit'],
    ['声音', 'shēng yīn', 'suara'],
    ['他今天生病了。', 'Tā jīn tiān shēng bìng le.', 'Hari ini dia sakit.'],
  ]],
  [null, ['Pasangan 2-2: naik dua kali (学习, 同学, 回来).', 'Pasangan 2-4: naik lalu turun (学校, 同事, 迟到).'], [
    ['学校', 'xué xiào', 'sekolah'],
    ['回来', 'huí lái', 'kembali'],
    ['迟到', 'chí dào', 'terlambat'],
    ['他明年结婚。', 'Tā míng nián jié hūn.', 'Tahun depan dia menikah.'],
  ]],
  [null, ['Sandhi nada 3: dua nada 3 berurutan → yang pertama dibaca nada 2 (你好 → ní hǎo).', 'Tulisan pinyin tetap nada 3; perubahan hanya saat diucapkan.'], [
    ['很好', 'hěn hǎo', 'sangat baik'],
    ['可以', 'kě yǐ', 'boleh'],
    ['我想买。', 'Wǒ xiǎng mǎi.', 'Saya ingin membeli.'],
    ['水果很好吃。', 'Shuǐ guǒ hěn hǎo chī.', 'Buahnya enak.'],
  ]],
  [null, ['Inisial b p m f: b tidak beraspirasi, p beraspirasi (ada hembusan udara).', 'Tes dengan kertas di depan mulut: kertas bergerak untuk p, diam untuk b.'], [
    ['爸爸不怕。', 'Bà ba bú pà.', 'Ayah tidak takut.'],
    ['面包', 'miàn bāo', 'roti'],
    ['米饭', 'mǐ fàn', 'nasi'],
    ['跑步', 'pǎo bù', 'lari'],
  ]],
  [null, ['Inisial d t n l: d tanpa hembusan, t dengan hembusan.', 'Bedakan n (hidung) dan l (lidah samping).'], [
    ['弟弟', 'dì di', 'adik laki-laki'],
    ['他听。', 'Tā tīng.', 'Dia mendengarkan.'],
    ['你来了。', 'Nǐ lái le.', 'Kamu sudah datang.'],
    ['女老师', 'nǚ lǎo shī', 'guru perempuan'],
  ]],
  [null, ['Inisial g k h: g tanpa hembusan, k dengan hembusan, h dari tenggorokan (lebih kasar dari h Indonesia).', 'h Mandarin mirip "kh" ringan.'], [
    ['哥哥', 'gē ge', 'kakak laki-laki'],
    ['可口', 'kě kǒu', 'lezat'],
    ['很好喝', 'hěn hǎo hē', 'enak diminum'],
    ['工作很开心。', 'Gōng zuò hěn kāi xīn.', 'Bekerja dengan senang.'],
  ]],
  [null, ['Final a (buka lebar), o (bulat, seperti "uo"), e (seperti "ə" dari belakang tenggorokan).', 'e Mandarin bukan "e" Indonesia pada "enak".'], [
    ['大妈', 'dà mā', 'ibu-ibu / bibi'],
    ['我饿了。', 'Wǒ è le.', 'Saya lapar.'],
    ['喝可乐', 'hē kě lè', 'minum cola'],
    ['婆婆', 'pó po', 'nenek (ibu mertua)'],
  ]],
  [null, ['Final i, u, ü: ü = ucapkan "i" dengan bibir membulat.', 'Setelah j q x y, ü ditulis u tetapi tetap dibaca ü (去 qù).'], [
    ['去哪里？', 'Qù nǎ lǐ?', 'Pergi ke mana?'],
    ['女儿', 'nǚ\'ér', 'anak perempuan'],
    ['下雨了。', 'Xià yǔ le.', 'Hujan turun.'],
    ['五个', 'wǔ gè', 'lima buah'],
  ]],
  [null, ['Diftong ai, ei, ao, ou: meluncur dari vokal pertama ke kedua.', 'ao seperti "au", ou seperti "ou" dengan bibir membulat.'], [
    ['太好了！', 'Tài hǎo le!', 'Bagus sekali!'],
    ['谁没来？', 'Shuí méi lái?', 'Siapa yang belum datang?'],
    ['老师早！', 'Lǎo shī zǎo!', 'Selamat pagi, Guru!'],
    ['狗走了。', 'Gǒu zǒu le.', 'Anjingnya pergi.'],
  ]],
  [null, ['Nasal an/en (ujung lidah, -n) vs ang/eng (belakang, -ng).', 'Bandingkan 三 sān dan 桑 sāng, 门 mén dan 朋 péng.'], [
    ['上班', 'shàng bān', 'masuk kerja'],
    ['看电影', 'kàn diàn yǐng', 'menonton film'],
    ['冷饭', 'lěng fàn', 'nasi dingin'],
    ['房间很干净。', 'Fáng jiān hěn gān jìng.', 'Kamarnya bersih.'],
  ]],
  [null, ['nǐ hǎo: dua nada 3 → dibaca ní hǎo.', 'Tambahkan orang: 你们好 nǐmen hǎo, 老师好 lǎoshī hǎo.'], [
    ['你好，王先生！', 'Nǐ hǎo, wáng xiān shēng!', 'Halo, Tuan Wang!'],
    ['你们好！我是小李。', 'Nǐ men hǎo! wǒ shì xiǎo lǐ.', 'Halo semuanya! Saya Xiao Li.'],
    ['大家好！', 'Dà jiā hǎo!', 'Halo semuanya!'],
    ['你好，你是新同学吗？', 'Nǐ hǎo, nǐ shì xīn tóng xué ma?', 'Halo, apakah kamu teman sekelas baru?'],
  ]],
  [null, ['xièxie: suku pertama nada 4, suku kedua nada netral.', 'x = lidah di belakang gigi bawah, bibir tersenyum, mirip "si" lembut.'], [
    ['谢谢大家！', 'Xiè xiè dà jiā!', 'Terima kasih semuanya!'],
    ['谢谢你的茶。', 'Xiè xiè nǐ de chá.', 'Terima kasih atas tehnya.'],
    ['小学', 'xiǎo xué', 'sekolah dasar'],
    ['写字', 'xiě zì', 'menulis huruf'],
  ]],
  [null, ['Nama diucapkan pelan: marga dulu, lalu nama; jaga nada setiap suku kata.', 'Nama asing diadaptasi ke suku kata Mandarin.'], [
    ['我叫林大明。', 'Wǒ jiào lín dà míng.', 'Nama saya Lin Daming.'],
    ['她叫苏菲。', 'Tā jiào sū fēi.', 'Namanya Sophie.'],
    ['我姓陈，叫陈小红。', 'Wǒ xìng chén, jiào chén xiǎo hóng.', 'Marga saya Chen, nama saya Chen Xiaohong.'],
    ['请叫我阿里。', 'Qǐng jiào wǒ ā lǐ.', 'Tolong panggil saya Ali.'],
  ]],
  [null, ['Shadowing: dengarkan satu kalimat, jeda, tirukan dengan ritme yang sama.', 'Ulang tiga kali: pelan, normal, lalu cepat.'], [
    ['你去哪儿？我去学校。', 'Nǐ qù nǎr? wǒ qù xué xiào.', 'Kamu pergi ke mana? Saya pergi ke sekolah.'],
    ['你吃饭了吗？', 'Nǐ chī fàn le ma?', 'Kamu sudah makan?'],
    ['吃了，你呢？', 'Chī le, nǐ ne?', 'Sudah, kamu?'],
    ['我还没吃。', 'Wǒ hái méi chī.', 'Saya belum makan.'],
  ]],
  [null, ['Review pelafalan HSK 1: 4 nada, nada netral, sandhi nada 3, inisial beraspirasi, ü, dan nasal.', 'Rekam 5 kalimat, bandingkan dengan TTS, tandai suku kata yang meleset.'], [
    ['我很喜欢北京。', 'Wǒ hěn xǐ huan běi jīng.', 'Saya sangat suka Beijing.'],
    ['请你喝一杯茶。', 'Qǐng nǐ hē yì bēi chá.', 'Silakan minum secangkir teh.'],
    ['他们是我的老朋友。', 'Tā men shì wǒ de lǎo péng yǒu.', 'Mereka teman lama saya.'],
    ['我女儿去上学了。', 'Wǒ nǚ ér qù shàng xué le.', 'Anak perempuan saya sudah berangkat sekolah.'],
  ]],
];
