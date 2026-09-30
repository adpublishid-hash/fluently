import type { LessonCoreTuple } from '../types';

// Grammar HSK 1 — one entry per lesson (index = lesson - 1). Titles come from the topic list.
export const grammar: LessonCoreTuple[] = [
  [null, ['Pola dasar: Subjek + 是 + keterangan benda/identitas. 是 tidak dipakai di depan kata sifat.', 'Urutan kata Mandarin tetap: siapa dulu, lalu 是, lalu siapa/apa dia.'], [
    ['我是学生。', 'Wǒ shì xué shēng.', 'Saya pelajar.'],
    ['他是老师。', 'Tā shì lǎo shī.', 'Dia (laki-laki) guru.'],
    ['我们是朋友。', 'Wǒ men shì péng yǒu.', 'Kami teman.'],
    ['她是我的同学。', 'Tā shì wǒ de tóng xué.', 'Dia (perempuan) teman sekelas saya.'],
  ]],
  [null, ['Tambahkan 吗 di akhir kalimat pernyataan untuk membuat pertanyaan ya/tidak.', 'Urutan kata tidak berubah; jawab dengan mengulang kata kerja: 是 / 不是.'], [
    ['你是老师吗？', 'Nǐ shì lǎo shī ma?', 'Apakah kamu guru?'],
    ['你喝茶吗？', 'Nǐ hē chá ma?', 'Apakah kamu minum teh?'],
    ['他在家吗？', 'Tā zài jiā ma?', 'Apakah dia ada di rumah?'],
    ['是，我是中国人。', 'Shì, wǒ shì zhōng guó rén.', 'Ya, saya orang Tiongkok.'],
  ]],
  [null, ['不 diletakkan tepat di depan kata kerja atau kata sifat untuk menyangkal.', '不 berubah menjadi bú di depan nada keempat: 不是 bú shì, 不去 bú qù.'], [
    ['我不是医生。', 'Wǒ bú shì yī shēng.', 'Saya bukan dokter.'],
    ['他不喝咖啡。', 'Tā bù hē kā fēi.', 'Dia tidak minum kopi.'],
    ['今天不冷。', 'Jīn tiān bù lěng.', 'Hari ini tidak dingin.'],
    ['我不去商店。', 'Wǒ bú qù shāng diàn.', 'Saya tidak pergi ke toko.'],
  ]],
  [null, ['叫 dipakai untuk menyebut nama: 我叫 + nama.', 'Pertanyaan nama: 你叫什么名字？ — 什么 berada di posisi jawaban.'], [
    ['我叫王小明。', 'Wǒ jiào wáng xiǎo míng.', 'Nama saya Wang Xiaoming.'],
    ['你叫什么名字？', 'Nǐ jiào shén me míng zì?', 'Siapa namamu?'],
    ['她叫李月。', 'Tā jiào lǐ yuè.', 'Namanya Li Yue.'],
    ['我的老师叫张文。', 'Wǒ de lǎo shī jiào zhāng wén.', 'Guru saya bernama Zhang Wen.'],
  ]],
  [null, ['Kebangsaan: nama negara + 人, misalnya 印尼人, 中国人.', 'Tanya asal: 你是哪国人？ — 哪 berarti "yang mana".'], [
    ['我是印度尼西亚人。', 'Wǒ shì yìn dù ní xī yà rén.', 'Saya orang Indonesia.'],
    ['你是哪国人？', 'Nǐ shì nǎ guó rén?', 'Kamu orang negara mana?'],
    ['他不是日本人。', 'Tā bú shì rì běn rén.', 'Dia bukan orang Jepang.'],
    ['我们都是中国人。', 'Wǒ men dōu shì zhōng guó rén.', 'Kami semua orang Tiongkok.'],
  ]],
  [null, ['的 menandai kepemilikan: pemilik + 的 + benda (我的书).', 'Untuk keluarga dan orang dekat, 的 sering dihilangkan: 我妈妈, 我朋友.'], [
    ['这是我的书。', 'Zhè shì wǒ de shū.', 'Ini buku saya.'],
    ['那是老师的杯子。', 'Nà shì lǎo shī de bēi zi.', 'Itu gelas milik guru.'],
    ['我妈妈是医生。', 'Wǒ mā ma shì yī shēng.', 'Ibu saya dokter.'],
    ['他的中文很好。', 'Tā de zhōng wén hěn hǎo.', 'Bahasa Mandarinnya sangat bagus.'],
  ]],
  [null, ['Angka + kata satuan + benda: 三个人, 两本书.', 'Untuk jumlah "dua" di depan kata satuan pakai 两, bukan 二.'], [
    ['我有两个姐姐。', 'Wǒ yǒu liǎng gè jiě jie.', 'Saya punya dua kakak perempuan.'],
    ['他买了三本书。', 'Tā mǎi le sān běn shū.', 'Dia membeli tiga buku.'],
    ['我家有四口人。', 'Wǒ jiā yǒu sì kǒu rén.', 'Keluarga saya ada empat orang.'],
    ['桌子上有五个杯子。', 'Zhuō zi shàng yǒu wǔ gè bēi zi.', 'Di atas meja ada lima gelas.'],
  ]],
  [null, ['个 adalah kata satuan paling umum untuk orang dan banyak benda.', 'Setelah 这/那/几 juga perlu kata satuan: 这个, 那个, 几个.'], [
    ['这个人是谁？', 'Zhè ge rén shì shuí?', 'Orang ini siapa?'],
    ['我想买一个苹果。', 'Wǒ xiǎng mǎi yí gè píng guǒ.', 'Saya ingin membeli sebuah apel.'],
    ['你有几个朋友？', 'Nǐ yǒu jǐ gè péng yǒu?', 'Kamu punya berapa teman?'],
    ['那个学生是我儿子。', 'Nà ge xué shēng shì wǒ ér zi.', 'Murid itu anak laki-laki saya.'],
  ]],
  [null, ['这 = ini (dekat), 那 = itu (jauh). Keduanya bisa langsung diikuti 是.', 'Dengan benda tertentu tambahkan kata satuan: 这本书, 那个杯子.'], [
    ['这是什么？', 'Zhè shì shén me?', 'Ini apa?'],
    ['那是我的电脑。', 'Nà shì wǒ de diàn nǎo.', 'Itu komputer saya.'],
    ['这本书很好。', 'Zhè běn shū hěn hǎo.', 'Buku ini bagus.'],
    ['那个饭馆很大。', 'Nà ge fàn guǎn hěn dà.', 'Restoran itu besar.'],
  ]],
  [null, ['们 ditambahkan pada kata ganti orang untuk bentuk jamak: 我们, 你们, 他们.', 'Jangan tambahkan 们 setelah angka: 三个学生, bukan 三个学生们.'], [
    ['他们是医生。', 'Tā men shì yī shēng.', 'Mereka dokter.'],
    ['你们好！', 'Nǐ men hǎo!', 'Halo semuanya!'],
    ['我们去学校。', 'Wǒ men qù xué xiào.', 'Kami pergi ke sekolah.'],
    ['她们都喜欢喝茶。', 'Tā men dōu xǐ huan hē chá.', 'Mereka (perempuan) semua suka minum teh.'],
  ]],
  [null, ['有 berarti "punya" (我有...) dan juga "ada" untuk tempat (桌子上有...).', 'Negasi 有 selalu 没有, tidak pernah 不有.'], [
    ['我有一个哥哥。', 'Wǒ yǒu yí gè gē ge.', 'Saya punya seorang kakak laki-laki.'],
    ['他没有电脑。', 'Tā méi yǒu diàn nǎo.', 'Dia tidak punya komputer.'],
    ['学校里有很多学生。', 'Xué xiào lǐ yǒu hěn duō xué shēng.', 'Di sekolah ada banyak murid.'],
    ['你有中文书吗？', 'Nǐ yǒu zhōng wén shū ma?', 'Apakah kamu punya buku Mandarin?'],
  ]],
  [null, ['想 + kata kerja = ingin melakukan sesuatu.', 'Negasinya 不想: 我不想去.'], [
    ['我想喝水。', 'Wǒ xiǎng hē shuǐ.', 'Saya ingin minum air.'],
    ['你想吃什么？', 'Nǐ xiǎng chī shén me?', 'Kamu ingin makan apa?'],
    ['他不想看电视。', 'Tā bù xiǎng kàn diàn shì.', 'Dia tidak ingin menonton televisi.'],
    ['我们想去中国。', 'Wǒ men xiǎng qù zhōng guó.', 'Kami ingin pergi ke Tiongkok.'],
  ]],
  [null, ['喜欢 bisa diikuti benda (喜欢猫) atau kata kerja (喜欢看书).', 'Tambahkan 很 untuk "sangat suka": 很喜欢.'], [
    ['我喜欢猫。', 'Wǒ xǐ huan māo.', 'Saya suka kucing.'],
    ['她很喜欢看书。', 'Tā hěn xǐ huan kàn shū.', 'Dia sangat suka membaca buku.'],
    ['你喜欢吃米饭吗？', 'Nǐ xǐ huan chī mǐ fàn ma?', 'Apakah kamu suka makan nasi?'],
    ['我爸爸不喜欢狗。', 'Wǒ bà ba bù xǐ huan gǒu.', 'Ayah saya tidak suka anjing.'],
  ]],
  [null, ['Kata waktu (今天, 明天, 昨天) diletakkan sebelum kata kerja, bisa sebelum atau sesudah subjek.', 'Tidak ada perubahan bentuk kata kerja karena waktu.'], [
    ['今天我很忙。', 'Jīn tiān wǒ hěn máng.', 'Hari ini saya sangat sibuk.'],
    ['我明天去北京。', 'Wǒ míng tiān qù běi jīng.', 'Besok saya pergi ke Beijing.'],
    ['昨天是星期三。', 'Zuó tiān shì xīng qī sān.', 'Kemarin hari Rabu.'],
    ['你今天工作吗？', 'Nǐ jīn tiān gōng zuò ma?', 'Apakah hari ini kamu bekerja?'],
  ]],
  [null, ['在 + tempat = berada di. Sebagai kata kerja: 我在家.', 'Tanya lokasi: 在哪儿？ — jawaban menggantikan 哪儿.'], [
    ['我在学校。', 'Wǒ zài xué xiào.', 'Saya di sekolah.'],
    ['你的手机在哪儿？', 'Nǐ de shǒu jī zài nǎr?', 'Ponselmu di mana?'],
    ['妈妈在医院。', 'Mā ma zài yī yuàn.', 'Ibu ada di rumah sakit.'],
    ['猫在桌子下面。', 'Māo zài zhuō zi xià miàn.', 'Kucing ada di bawah meja.'],
  ]],
  [null, ['谁 = siapa, 什么 = apa. Kata tanya diletakkan di posisi jawaban.', 'Kalimat dengan 谁/什么 tidak memakai 吗.'], [
    ['他是谁？', 'Tā shì shuí?', 'Dia siapa?'],
    ['你看什么？', 'Nǐ kàn shén me?', 'Kamu melihat apa?'],
    ['谁是你的老师？', 'Shuí shì nǐ de lǎo shī?', 'Siapa gurumu?'],
    ['你买什么东西？', 'Nǐ mǎi shén me dōng xi?', 'Kamu membeli barang apa?'],
  ]],
  [null, ['几 menanyakan jumlah kecil (biasanya di bawah 10) dan wajib diikuti kata satuan.', 'Untuk jumlah besar atau harga, pakai 多少.'], [
    ['你家有几口人？', 'Nǐ jiā yǒu jǐ kǒu rén?', 'Keluargamu ada berapa orang?'],
    ['现在几点？', 'Xiàn zài jǐ diǎn?', 'Sekarang jam berapa?'],
    ['你有几本中文书？', 'Nǐ yǒu jǐ běn zhōng wén shū?', 'Kamu punya berapa buku Mandarin?'],
    ['今天几号？', 'Jīn tiān jǐ hào?', 'Hari ini tanggal berapa?'],
  ]],
  [null, ['Kata sifat langsung menjadi predikat tanpa 是: 我很好 (bukan 我是好).', '很 di sini sering hanya penghubung netral, tidak selalu berarti "sangat".'], [
    ['我很好。', 'Wǒ hěn hǎo.', 'Saya baik.'],
    ['这个杯子很小。', 'Zhè ge bēi zi hěn xiǎo.', 'Gelas ini kecil.'],
    ['北京很大。', 'Běi jīng hěn dà.', 'Beijing besar.'],
    ['今天太热了。', 'Jīn tiān tài rè le.', 'Hari ini terlalu panas.'],
  ]],
  [null, ['请 + kata kerja = tolong/silakan (permintaan sopan).', '请 di awal kalimat membuat perintah terdengar ramah.'], [
    ['请坐。', 'Qǐng zuò.', 'Silakan duduk.'],
    ['请喝茶。', 'Qǐng hē chá.', 'Silakan minum teh.'],
    ['请看黑板。', 'Qǐng kàn hēi bǎn.', 'Tolong lihat papan tulis.'],
    ['请你说慢一点儿。', 'Qǐng nǐ shuō màn yì diǎnr.', 'Tolong bicara sedikit lebih pelan.'],
  ]],
  [null, ['Review HSK 1: 是, 吗, 不, 的, 有, 在, 想, 喜欢, kata tanya, dan kata satuan.', 'Uji diri: ubah satu pernyataan menjadi negasi dan pertanyaan.'], [
    ['我不是老师，我是学生。', 'Wǒ bú shì lǎo shī, wǒ shì xué shēng.', 'Saya bukan guru, saya murid.'],
    ['你有没有中国朋友？', 'Nǐ yǒu méi yǒu zhōng guó péng yǒu?', 'Kamu punya teman orang Tiongkok atau tidak?'],
    ['我想在家看书。', 'Wǒ xiǎng zài jiā kàn shū.', 'Saya ingin membaca buku di rumah.'],
    ['她喜欢的水果是苹果。', 'Tā xǐ huan de shuǐ guǒ shì píng guǒ.', 'Buah yang dia suka adalah apel.'],
  ]],
];
