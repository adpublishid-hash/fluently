import type { QuizTopic } from './types';

// Latihan Yǔfǎ — one entry per topic (index = topic - 1): [Basic, Intermediate, Advanced].
export const yufa: QuizTopic[] = [
  // 1. Basic Word Order: 我 + 是 + ...
  [
    [
      ["我是学生", "wǒ shì xuésheng", "saya pelajar", ["Urutan kalimat identitas Mandarin adalah...", "Subjek + 是 + identitas", "是 + subjek + identitas", "Identitas + subjek + 是", "Subjek + identitas + 是"]],
      ["他是老师", "tā shì lǎoshī", "dia guru"],
      ["我们是朋友", "wǒmen shì péngyou", "kami berteman"],
      ["她是医生", "tā shì yīshēng", "dia (perempuan) dokter"],
    ],
    [
      ["我是印度尼西亚人。", "Wǒ shì Yìndùníxīyà rén.", "Saya orang Indonesia."],
      ["我爸爸是司机。", "Wǒ bàba shì sījī.", "Ayah saya sopir.", ["Kalimat yang urutannya benar adalah...", "我爸爸是司机。", "是我爸爸司机。", "我爸爸司机是。", "司机是我爸爸是。"]],
      ["这是我的老师。", "Zhè shì wǒ de lǎoshī.", "Ini guru saya."],
      ["他们都是学生。", "Tāmen dōu shì xuésheng.", "Mereka semua pelajar."],
    ],
    [
      ["我是大学生，我哥哥是工程师。", "Wǒ shì dàxuéshēng, wǒ gēge shì gōngchéngshī.", "Saya mahasiswa, kakak saya insinyur."],
      ["王老师是我们的汉语老师。", "Wáng lǎoshī shì wǒmen de Hànyǔ lǎoshī.", "Guru Wang adalah guru bahasa Mandarin kami.", ["Kata keterangan 都 (semua) diletakkan...", "sebelum 是", "setelah 是", "di akhir kalimat", "sebelum subjek"]],
      ["我和我的同屋都是留学生。", "Wǒ hé wǒ de tóngwū dōu shì liúxuéshēng.", "Saya dan teman sekamar saya sama-sama mahasiswa asing."],
      ["那位先生是我朋友的爸爸。", "Nà wèi xiānsheng shì wǒ péngyou de bàba.", "Bapak itu ayah teman saya."],
    ],
  ],
  // 2. Yes/No Questions with 吗
  [
    [
      ["好吗", "hǎo ma", "baikkah? / bagaimana kalau?"],
      ["是吗", "shì ma", "oh ya? / benarkah?"],
      ["忙吗", "máng ma", "sibukkah?", ["Partikel 吗 diletakkan...", "di akhir kalimat", "di awal kalimat", "sebelum kata kerja", "setelah subjek"]],
      ["对吗", "duì ma", "benarkah?"],
    ],
    [
      ["你是老师吗？", "Nǐ shì lǎoshī ma?", "Apakah kamu guru?"],
      ["你喜欢喝茶吗？", "Nǐ xǐhuan hē chá ma?", "Apakah kamu suka minum teh?", ["Ubah 'Kamu orang Tiongkok' menjadi pertanyaan:", "你是中国人吗？", "吗你是中国人？", "你吗是中国人？", "你是吗中国人？"]],
      ["他在家吗？", "Tā zài jiā ma?", "Apakah dia di rumah?"],
      ["你会说汉语吗？", "Nǐ huì shuō Hànyǔ ma?", "Apakah kamu bisa berbahasa Mandarin?"],
    ],
    [
      ["你明天有时间吗？我们一起吃饭吧。", "Nǐ míngtiān yǒu shíjiān ma? Wǒmen yìqǐ chī fàn ba.", "Besok kamu ada waktu? Ayo kita makan bersama."],
      ["这是你的手机吗？", "Zhè shì nǐ de shǒujī ma?", "Apakah ini ponselmu?"],
      ["你认识那个穿红衣服的人吗？", "Nǐ rènshi nàge chuān hóng yīfu de rén ma?", "Apakah kamu kenal orang yang berbaju merah itu?", ["Jawaban 'ya' yang tepat untuk 你认识他吗？ adalah...", "认识。", "是。", "吗。", "好。"]],
      ["你们学校的图书馆大吗？", "Nǐmen xuéxiào de túshūguǎn dà ma?", "Apakah perpustakaan sekolah kalian besar?"],
    ],
  ],
  // 3. Negation with 不
  [
    [
      ["不是", "bú shì", "bukan"],
      ["不去", "bú qù", "tidak pergi"],
      ["不好", "bù hǎo", "tidak baik", ["不 diletakkan...", "sebelum kata kerja atau kata sifat", "setelah kata kerja", "di akhir kalimat", "sebelum subjek"]],
      ["不喝", "bù hē", "tidak minum"],
    ],
    [
      ["我不是老师。", "Wǒ bú shì lǎoshī.", "Saya bukan guru."],
      ["他不喝咖啡。", "Tā bù hē kāfēi.", "Dia tidak minum kopi."],
      ["今天不冷。", "Jīntiān bù lěng.", "Hari ini tidak dingin."],
      ["我不想去。", "Wǒ bù xiǎng qù.", "Saya tidak ingin pergi.", ["Bentuk negatif yang benar dari 我想去 adalah...", "我不想去。", "我想不去不。", "不我想去。", "我想去不。"]],
    ],
    [
      ["我明天不去学校，我在家学习。", "Wǒ míngtiān bú qù xuéxiào, wǒ zài jiā xuéxí.", "Besok saya tidak ke sekolah, saya belajar di rumah."],
      ["他不是中国人，他是日本人。", "Tā bú shì Zhōngguó rén, tā shì Rìběn rén.", "Dia bukan orang Tiongkok, dia orang Jepang."],
      ["这个菜不太好吃。", "Zhège cài bú tài hǎochī.", "Masakan ini kurang enak.", ["不太 + kata sifat berarti...", "kurang / tidak terlalu", "sangat", "paling", "terlalu"]],
      ["我妹妹不喜欢吃肉，也不喜欢吃鱼。", "Wǒ mèimei bù xǐhuan chī ròu, yě bù xǐhuan chī yú.", "Adik saya tidak suka daging, juga tidak suka ikan."],
    ],
  ],
  // 4. Name Sentences with 叫
  [
    [
      ["叫什么", "jiào shénme", "bernama apa"],
      ["名字", "míngzi", "nama"],
      ["姓王", "xìng Wáng", "bermarga Wang", ["Beda 姓 dan 叫: 姓 untuk...", "marga saja", "nama lengkap", "nama panggilan", "julukan"]],
      ["叫安娜", "jiào Ānnà", "bernama Anna"],
    ],
    [
      ["我叫安娜。", "Wǒ jiào Ānnà.", "Nama saya Anna."],
      ["你叫什么名字？", "Nǐ jiào shénme míngzi?", "Siapa namamu?", ["Jawaban untuk 你叫什么名字？ adalah...", "我叫大卫。", "我是二十岁。", "我姓什么。", "我叫吗。"]],
      ["他姓李。", "Tā xìng Lǐ.", "Dia bermarga Li."],
      ["她叫什么？", "Tā jiào shénme?", "Siapa nama dia?"],
    ],
    [
      ["我姓张，叫张小文，你呢？", "Wǒ xìng Zhāng, jiào Zhāng Xiǎowén, nǐ ne?", "Marga saya Zhang, nama saya Zhang Xiaowen, kamu?"],
      ["我的中文名字叫马丽。", "Wǒ de Zhōngwén míngzi jiào Mǎ Lì.", "Nama Mandarin saya Ma Li."],
      ["你朋友叫什么名字？", "Nǐ péngyou jiào shénme míngzi?", "Siapa nama temanmu?"],
      ["那只小猫叫花花。", "Nà zhī xiǎomāo jiào Huāhua.", "Anak kucing itu bernama Huahua.", ["Pada 你叫什么名字？, kata tanya 什么 berada...", "di posisi informasi yang ditanyakan", "di awal kalimat", "di akhir kalimat setelah 吗", "sebelum subjek"]],
    ],
  ],
  // 5. Nationality with 是...人
  [
    [
      ["中国人", "Zhōngguó rén", "orang Tiongkok"],
      ["美国人", "Měiguó rén", "orang Amerika"],
      ["日本人", "Rìběn rén", "orang Jepang", ["Pola menyebut kewarganegaraan adalah...", "Negara + 人", "人 + negara", "Negara + 的", "是 + negara"]],
      ["英国人", "Yīngguó rén", "orang Inggris"],
    ],
    [
      ["我是中国人。", "Wǒ shì Zhōngguó rén.", "Saya orang Tiongkok."],
      ["你是哪国人？", "Nǐ shì nǎ guó rén?", "Kamu orang negara mana?", ["Kata tanya untuk 'negara mana' adalah...", "哪国", "哪儿", "什么", "几国"]],
      ["他不是美国人。", "Tā bú shì Měiguó rén.", "Dia bukan orang Amerika."],
      ["她是韩国人吗？", "Tā shì Hánguó rén ma?", "Apakah dia orang Korea?"],
    ],
    [
      ["我是印度尼西亚人，我住在雅加达。", "Wǒ shì Yìndùníxīyà rén, wǒ zhù zài Yǎjiādá.", "Saya orang Indonesia, saya tinggal di Jakarta."],
      ["我们班有日本人，也有法国人。", "Wǒmen bān yǒu Rìběn rén, yě yǒu Fǎguó rén.", "Di kelas kami ada orang Jepang, juga ada orang Prancis."],
      ["他爸爸是英国人，他妈妈是中国人。", "Tā bàba shì Yīngguó rén, tā māma shì Zhōngguó rén.", "Ayahnya orang Inggris, ibunya orang Tiongkok."],
      ["你的老师也是北京人吗？", "Nǐ de lǎoshī yě shì Běijīng rén ma?", "Apakah gurumu juga orang Beijing?"],
    ],
  ],
  // 6. Possession with 的
  [
    [
      ["我的书", "wǒ de shū", "buku saya"],
      ["老师的车", "lǎoshī de chē", "mobil guru"],
      ["我妈妈", "wǒ māma", "ibu saya", ["Untuk keluarga dekat, 的 sering...", "dihilangkan (我妈妈)", "wajib dipakai dua kali", "diletakkan di akhir", "diganti 是"]],
      ["他的电脑", "tā de diànnǎo", "komputernya"],
    ],
    [
      ["这是我的手机。", "Zhè shì wǒ de shǒujī.", "Ini ponsel saya."],
      ["那是谁的包？", "Nà shì shéi de bāo?", "Itu tas siapa?"],
      ["这本书是老师的。", "Zhè běn shū shì lǎoshī de.", "Buku ini milik guru.", ["Arti 是老师的 di akhir kalimat adalah...", "milik guru", "adalah guru", "untuk guru", "dari guru"]],
      ["我朋友的家很大。", "Wǒ péngyou de jiā hěn dà.", "Rumah teman saya besar."],
    ],
    [
      ["我同学的妹妹是我的好朋友。", "Wǒ tóngxué de mèimei shì wǒ de hǎo péngyou.", "Adik teman sekelas saya adalah sahabat saya."],
      ["桌子上的杯子是我的，不是你的。", "Zhuōzi shang de bēizi shì wǒ de, bú shì nǐ de.", "Gelas di atas meja punya saya, bukan punyamu."],
      ["我喜欢妈妈做的菜。", "Wǒ xǐhuan māma zuò de cài.", "Saya suka masakan buatan ibu."],
      ["这是我们学校的图书馆。", "Zhè shì wǒmen xuéxiào de túshūguǎn.", "Ini perpustakaan sekolah kami."],
    ],
  ],
  // 7. Numbers in Simple Sentences
  [
    [
      ["三个人", "sān ge rén", "tiga orang"],
      ["两本书", "liǎng běn shū", "dua buku", ["'Dua buku' yang benar adalah...", "两本书", "二本书", "两书", "二书本"]],
      ["十二岁", "shí'èr suì", "dua belas tahun"],
      ["五块钱", "wǔ kuài qián", "lima yuan"],
    ],
    [
      ["我今年十八岁。", "Wǒ jīnnián shíbā suì.", "Tahun ini saya delapan belas tahun."],
      ["我家有五口人。", "Wǒ jiā yǒu wǔ kǒu rén.", "Keluarga saya ada lima orang."],
      ["一杯茶两块钱。", "Yì bēi chá liǎng kuài qián.", "Secangkir teh dua yuan."],
      ["我们班有二十个学生。", "Wǒmen bān yǒu èrshí ge xuésheng.", "Kelas kami ada dua puluh murid.", ["Angka 20 dibaca...", "二十 èrshí", "两十 liǎngshí", "十二 shí'èr", "二零 èr líng"]],
    ],
    [
      ["我买了三个苹果和两瓶水。", "Wǒ mǎi le sān ge píngguǒ hé liǎng píng shuǐ.", "Saya membeli tiga apel dan dua botol air."],
      ["我的生日是十月二十五号。", "Wǒ de shēngrì shì shí yuè èrshíwǔ hào.", "Ulang tahun saya tanggal dua puluh lima Oktober."],
      ["这个班有十五个男生，十个女生。", "Zhège bān yǒu shíwǔ ge nánshēng, shí ge nǚshēng.", "Kelas ini ada lima belas murid laki-laki dan sepuluh murid perempuan."],
      ["我爷爷今年八十二岁。", "Wǒ yéye jīnnián bāshí'èr suì.", "Kakek saya tahun ini delapan puluh dua tahun."],
    ],
  ],
  // 8. Measure Word 个
  [
    [
      ["一个人", "yí ge rén", "seorang"],
      ["这个", "zhège", "yang ini"],
      ["那个", "nàge", "yang itu"],
      ["几个", "jǐ ge", "berapa buah", ["Kata ukur paling umum dalam Mandarin adalah...", "个", "本", "张", "只"]],
    ],
    [
      ["我有一个姐姐。", "Wǒ yǒu yí ge jiějie.", "Saya punya seorang kakak perempuan."],
      ["这个苹果很大。", "Zhège píngguǒ hěn dà.", "Apel ini besar."],
      ["那个人是谁？", "Nàge rén shì shéi?", "Orang itu siapa?", ["Frasa yang benar adalah...", "那个人", "那人个", "个那人", "那一人个"]],
      ["你要几个？", "Nǐ yào jǐ ge?", "Kamu mau berapa?"],
    ],
    [
      ["我想买一个新的书包。", "Wǒ xiǎng mǎi yí ge xīn de shūbāo.", "Saya ingin membeli tas sekolah baru."],
      ["这个学期我们有三个新老师。", "Zhège xuéqī wǒmen yǒu sān ge xīn lǎoshī.", "Semester ini kami punya tiga guru baru."],
      ["那个饭馆的菜很好吃。", "Nàge fànguǎn de cài hěn hǎochī.", "Masakan di rumah makan itu enak."],
      ["他一个人住在北京。", "Tā yí ge rén zhù zài Běijīng.", "Dia tinggal sendirian di Beijing."],
    ],
  ],
  // 9. This and That: 这 / 那
  [
    [
      ["这儿", "zhèr", "di sini"],
      ["那儿", "nàr", "di sana", ["Lawan kata 这儿 (di sini) adalah...", "那儿", "哪儿", "这个", "那个"]],
      ["这些", "zhèxiē", "ini (jamak)"],
      ["那些", "nàxiē", "itu (jamak)"],
    ],
    [
      ["这是我的家。", "Zhè shì wǒ de jiā.", "Ini rumah saya."],
      ["那是什么？", "Nà shì shénme?", "Itu apa?"],
      ["这些书很新。", "Zhèxiē shū hěn xīn.", "Buku-buku ini baru.", ["这些 dipakai untuk benda...", "jamak yang dekat", "tunggal yang jauh", "jamak yang jauh", "tempat"]],
      ["我们去那儿吧。", "Wǒmen qù nàr ba.", "Ayo kita ke sana."],
    ],
    [
      ["这件衣服是红色的，那件是蓝色的。", "Zhè jiàn yīfu shì hóngsè de, nà jiàn shì lánsè de.", "Baju ini merah, yang itu biru."],
      ["那些学生都是从日本来的。", "Nàxiē xuésheng dōu shì cóng Rìběn lái de.", "Murid-murid itu semuanya datang dari Jepang."],
      ["这儿的东西比那儿便宜。", "Zhèr de dōngxi bǐ nàr piányi.", "Barang di sini lebih murah daripada di sana."],
      ["这位是我的老师，那位是我的同学。", "Zhè wèi shì wǒ de lǎoshī, nà wèi shì wǒ de tóngxué.", "Ini guru saya, itu teman sekelas saya."],
    ],
  ],
  // 10. Plural Pronoun 们
  [
    [
      ["你们", "nǐmen", "kalian"],
      ["他们", "tāmen", "mereka"],
      ["同学们", "tóngxuémen", "teman-teman sekelas"],
      ["咱们", "zánmen", "kita (termasuk pendengar)", ["们 TIDAK dipakai setelah angka, jadi yang benar adalah...", "三个学生", "三个学生们", "三学生们", "学生们三个"]],
    ],
    [
      ["我们是同学。", "Wǒmen shì tóngxué.", "Kami teman sekelas."],
      ["你们好！", "Nǐmen hǎo!", "Halo semuanya!"],
      ["她们是姐妹。", "Tāmen shì jiěmèi.", "Mereka (perempuan) bersaudara.", ["她们 dipakai untuk...", "mereka yang semuanya perempuan", "mereka yang campuran", "benda-benda", "kita"]],
      ["孩子们在玩儿。", "Háizimen zài wánr.", "Anak-anak sedang bermain."],
    ],
    [
      ["同学们，请打开书，看第十页。", "Tóngxuémen, qǐng dǎkāi shū, kàn dì shí yè.", "Anak-anak, buka buku dan lihat halaman sepuluh."],
      ["我们明天一起去你们学校。", "Wǒmen míngtiān yìqǐ qù nǐmen xuéxiào.", "Besok kami bersama-sama ke sekolah kalian."],
      ["他们都喜欢打篮球。", "Tāmen dōu xǐhuan dǎ lánqiú.", "Mereka semua suka bermain basket."],
      ["咱们晚上一起吃饭吧。", "Zánmen wǎnshang yìqǐ chī fàn ba.", "Malam ini kita makan bersama, yuk."],
    ],
  ],
  // 11. Have/There Is with 有
  [
    [
      ["有钱", "yǒu qián", "punya uang"],
      ["没有", "méiyǒu", "tidak punya / tidak ada", ["Bentuk negatif dari 有 adalah...", "没有", "不有", "不是", "没是"]],
      ["有时间", "yǒu shíjiān", "punya waktu"],
      ["有意思", "yǒu yìsi", "menarik"],
    ],
    [
      ["我有一个哥哥。", "Wǒ yǒu yí ge gēge.", "Saya punya seorang kakak laki-laki."],
      ["我没有车。", "Wǒ méiyǒu chē.", "Saya tidak punya mobil."],
      ["桌子上有一本书。", "Zhuōzi shang yǒu yì běn shū.", "Di atas meja ada sebuah buku.", ["Pola 'di suatu tempat ada sesuatu' adalah...", "Tempat + 有 + benda", "Benda + 有 + tempat", "有 + tempat + benda", "Tempat + 是 + 有"]],
      ["你有中文书吗？", "Nǐ yǒu Zhōngwén shū ma?", "Apakah kamu punya buku bahasa Mandarin?"],
    ],
    [
      ["我们学校有一个很大的图书馆。", "Wǒmen xuéxiào yǒu yí ge hěn dà de túshūguǎn.", "Sekolah kami punya perpustakaan yang sangat besar."],
      ["今天下午我没有课，有时间。", "Jīntiān xiàwǔ wǒ méiyǒu kè, yǒu shíjiān.", "Sore ini saya tidak ada kelas, ada waktu."],
      ["冰箱里有没有牛奶？", "Bīngxiāng li yǒu méiyǒu niúnǎi?", "Di kulkas ada susu atau tidak?"],
      ["这个电影很有意思。", "Zhège diànyǐng hěn yǒu yìsi.", "Film ini sangat menarik."],
    ],
  ],
  // 12. Want with 想
  [
    [
      ["想去", "xiǎng qù", "ingin pergi"],
      ["想吃", "xiǎng chī", "ingin makan"],
      ["不想", "bù xiǎng", "tidak ingin", ["想 diletakkan...", "sebelum kata kerja", "setelah kata kerja", "di akhir kalimat", "sebelum subjek"]],
      ["想家", "xiǎng jiā", "rindu rumah"],
    ],
    [
      ["我想喝咖啡。", "Wǒ xiǎng hē kāfēi.", "Saya ingin minum kopi."],
      ["你想去哪儿？", "Nǐ xiǎng qù nǎr?", "Kamu ingin pergi ke mana?"],
      ["他不想学习。", "Tā bù xiǎng xuéxí.", "Dia tidak ingin belajar."],
      ["我很想我妈妈。", "Wǒ hěn xiǎng wǒ māma.", "Saya sangat rindu ibu saya.", ["想 + orang (我想妈妈) berarti...", "rindu", "ingin menjadi", "berpikir tentang soal", "mengundang"]],
    ],
    [
      ["我想明年去中国学习汉语。", "Wǒ xiǎng míngnián qù Zhōngguó xuéxí Hànyǔ.", "Saya ingin tahun depan ke Tiongkok belajar bahasa Mandarin."],
      ["周末你想做什么？", "Zhōumò nǐ xiǎng zuò shénme?", "Akhir pekan kamu ingin melakukan apa?"],
      ["我饿了，想吃一碗面条。", "Wǒ è le, xiǎng chī yì wǎn miàntiáo.", "Saya lapar, ingin makan semangkuk mi."],
      ["她不想一个人去看电影。", "Tā bù xiǎng yí ge rén qù kàn diànyǐng.", "Dia tidak ingin menonton film sendirian."],
    ],
  ],
  // 13. Like with 喜欢
  [
    [
      ["喜欢", "xǐhuan", "suka"],
      ["很喜欢", "hěn xǐhuan", "sangat suka"],
      ["不喜欢", "bù xǐhuan", "tidak suka"],
      ["最喜欢", "zuì xǐhuan", "paling suka", ["最 dalam 最喜欢 berarti...", "paling", "sangat", "juga", "tidak"]],
    ],
    [
      ["我喜欢猫。", "Wǒ xǐhuan māo.", "Saya suka kucing."],
      ["他很喜欢看书。", "Tā hěn xǐhuan kàn shū.", "Dia sangat suka membaca."],
      ["你喜欢什么运动？", "Nǐ xǐhuan shénme yùndòng?", "Kamu suka olahraga apa?"],
      ["我不喜欢下雨。", "Wǒ bù xǐhuan xià yǔ.", "Saya tidak suka hujan.", ["喜欢 bisa diikuti oleh...", "kata benda atau kegiatan", "hanya kata benda", "hanya kata sifat", "hanya angka"]],
    ],
    [
      ["我最喜欢的水果是西瓜。", "Wǒ zuì xǐhuan de shuǐguǒ shì xīguā.", "Buah yang paling saya sukai adalah semangka."],
      ["我妹妹喜欢唱歌，不喜欢跳舞。", "Wǒ mèimei xǐhuan chàng gē, bù xǐhuan tiàowǔ.", "Adik saya suka bernyanyi, tidak suka menari."],
      ["你喜欢喝茶还是喝咖啡？", "Nǐ xǐhuan hē chá háishi hē kāfēi?", "Kamu lebih suka minum teh atau kopi?"],
      ["很多中国人喜欢早上去公园。", "Hěn duō Zhōngguó rén xǐhuan zǎoshang qù gōngyuán.", "Banyak orang Tiongkok suka pergi ke taman pagi hari."],
    ],
  ],
  // 14. Time Word 今天
  [
    [
      ["今天下午", "jīntiān xiàwǔ", "sore ini"],
      ["明天早上", "míngtiān zǎoshang", "besok pagi"],
      ["昨天晚上", "zuótiān wǎnshang", "kemarin malam"],
      ["每天", "měitiān", "setiap hari", ["Kata waktu dalam Mandarin diletakkan...", "di awal kalimat atau setelah subjek", "di akhir kalimat", "setelah kata kerja", "setelah objek"]],
    ],
    [
      ["今天我很忙。", "Jīntiān wǒ hěn máng.", "Hari ini saya sibuk."],
      ["我今天去商店。", "Wǒ jīntiān qù shāngdiàn.", "Hari ini saya pergi ke toko.", ["Kalimat yang posisinya benar adalah...", "我今天去商店。", "我去商店今天。", "我去今天商店。", "去我今天商店。"]],
      ["明天我们考试。", "Míngtiān wǒmen kǎoshì.", "Besok kami ujian."],
      ["他昨天没来。", "Tā zuótiān méi lái.", "Kemarin dia tidak datang."],
    ],
    [
      ["我今天下午三点去医院看病。", "Wǒ jīntiān xiàwǔ sān diǎn qù yīyuàn kànbìng.", "Hari ini pukul tiga sore saya berobat ke rumah sakit."],
      ["今天晚上你在家吃饭吗？", "Jīntiān wǎnshang nǐ zài jiā chī fàn ma?", "Malam ini kamu makan di rumah?"],
      ["我每天早上七点吃早饭。", "Wǒ měitiān zǎoshang qī diǎn chī zǎofàn.", "Setiap pagi saya sarapan pukul tujuh."],
      ["上个星期我和家人去了海边。", "Shàng ge xīngqī wǒ hé jiārén qù le hǎibiān.", "Minggu lalu saya dan keluarga pergi ke pantai."],
    ],
  ],
  // 15. Location with 在
  [
    [
      ["在家", "zài jiā", "di rumah"],
      ["在学校", "zài xuéxiào", "di sekolah"],
      ["在哪儿", "zài nǎr", "di mana"],
      ["在桌子上", "zài zhuōzi shang", "di atas meja", ["Pola lokasi benda adalah...", "Benda + 在 + tempat", "在 + benda + tempat", "Tempat + 在 + benda", "Benda + 有 + 在"]],
    ],
    [
      ["我在家。", "Wǒ zài jiā.", "Saya di rumah."],
      ["你的书在哪儿？", "Nǐ de shū zài nǎr?", "Bukumu ada di mana?"],
      ["猫在椅子下面。", "Māo zài yǐzi xiàmiàn.", "Kucing ada di bawah kursi."],
      ["我在学校吃午饭。", "Wǒ zài xuéxiào chī wǔfàn.", "Saya makan siang di sekolah.", ["Pada 我在学校吃午饭, frasa 在学校 diletakkan...", "sebelum kata kerja", "setelah objek", "di akhir kalimat", "sebelum subjek"]],
    ],
    [
      ["我哥哥在一家银行工作。", "Wǒ gēge zài yì jiā yínháng gōngzuò.", "Kakak saya bekerja di sebuah bank."],
      ["手机在你的书包里吗？", "Shǒujī zài nǐ de shūbāo li ma?", "Apakah ponselnya ada di dalam tasmu?"],
      ["他们在公园里跑步。", "Tāmen zài gōngyuán li pǎobù.", "Mereka berlari di taman."],
      ["医院在超市和银行中间。", "Yīyuàn zài chāoshì hé yínháng zhōngjiān.", "Rumah sakit ada di antara supermarket dan bank."],
    ],
  ],
  // 16. Question Words 谁 and 什么
  [
    [
      ["是谁", "shì shéi", "siapa (itu)"],
      ["谁的", "shéi de", "milik siapa"],
      ["什么书", "shénme shū", "buku apa", ["Kata tanya untuk menanyakan orang adalah...", "谁", "什么", "哪儿", "几"]],
      ["做什么", "zuò shénme", "melakukan apa"],
    ],
    [
      ["他是谁？", "Tā shì shéi?", "Dia siapa?"],
      ["这是谁的书？", "Zhè shì shéi de shū?", "Ini buku siapa?"],
      ["你吃什么？", "Nǐ chī shénme?", "Kamu makan apa?", ["Kalimat tanya yang benar adalah...", "你吃什么？", "什么你吃？", "你什么吃？", "你吃什么吗？"]],
      ["谁是你的老师？", "Shéi shì nǐ de lǎoshī?", "Siapa gurumu?"],
    ],
    [
      ["你周末常常做什么？", "Nǐ zhōumò chángcháng zuò shénme?", "Apa yang sering kamu lakukan di akhir pekan?"],
      ["谁想和我一起去图书馆？", "Shéi xiǎng hé wǒ yìqǐ qù túshūguǎn?", "Siapa yang mau ke perpustakaan bersama saya?"],
      ["你买了什么东西？", "Nǐ mǎi le shénme dōngxi?", "Kamu membeli barang apa?"],
      ["刚才给你打电话的是谁？", "Gāngcái gěi nǐ dǎ diànhuà de shì shéi?", "Siapa yang tadi meneleponmu?"],
    ],
  ],
  // 17. How Many with 几
  [
    [
      ["几岁", "jǐ suì", "umur berapa (anak)"],
      ["几点", "jǐ diǎn", "jam berapa"],
      ["几个人", "jǐ ge rén", "berapa orang"],
      ["几号", "jǐ hào", "tanggal berapa", ["几 dipakai untuk jumlah yang diperkirakan...", "kecil (biasanya di bawah 10)", "sangat besar", "tidak terbatas", "harga saja"]],
    ],
    [
      ["你几岁？", "Nǐ jǐ suì?", "Kamu umur berapa?"],
      ["现在几点了？", "Xiànzài jǐ diǎn le?", "Sekarang sudah jam berapa?"],
      ["你有几个弟弟？", "Nǐ yǒu jǐ ge dìdi?", "Kamu punya berapa adik laki-laki?", ["Setelah 几 harus ada...", "kata ukur (个, 本, 口, ...)", "partikel 吗", "kata 的", "kata 很"]],
      ["今天几号？", "Jīntiān jǐ hào?", "Hari ini tanggal berapa?"],
    ],
    [
      ["你们班有几个中国学生？", "Nǐmen bān yǒu jǐ ge Zhōngguó xuésheng?", "Di kelasmu ada berapa murid Tiongkok?"],
      ["你每天睡几个小时？", "Nǐ měitiān shuì jǐ ge xiǎoshí?", "Setiap hari kamu tidur berapa jam?"],
      ["你一个星期上几天课？", "Nǐ yí ge xīngqī shàng jǐ tiān kè?", "Seminggu kamu masuk kelas berapa hari?"],
      ["你想买几本书？", "Nǐ xiǎng mǎi jǐ běn shū?", "Kamu ingin membeli berapa buku?"],
    ],
  ],
  // 18. Adjective Predicate 很好
  [
    [
      ["很好", "hěn hǎo", "baik"],
      ["很忙", "hěn máng", "sibuk"],
      ["很高", "hěn gāo", "tinggi", ["Dalam 他很高, kata 是...", "tidak dipakai", "wajib sebelum 很", "wajib setelah 很", "diganti 的"]],
      ["非常累", "fēicháng lèi", "sangat lelah"],
    ],
    [
      ["我很好。", "Wǒ hěn hǎo.", "Saya baik."],
      ["他很高。", "Tā hěn gāo.", "Dia tinggi."],
      ["今天很热。", "Jīntiān hěn rè.", "Hari ini panas."],
      ["汉语不难。", "Hànyǔ bù nán.", "Bahasa Mandarin tidak sulit.", ["Kalimat yang benar adalah...", "汉语很难。", "汉语是很难。", "汉语是难。", "汉语难是。"]],
    ],
    [
      ["这个房间很大，也很干净。", "Zhège fángjiān hěn dà, yě hěn gānjìng.", "Kamar ini besar, juga bersih."],
      ["今天我非常累，想早点儿睡觉。", "Jīntiān wǒ fēicháng lèi, xiǎng zǎo diǎnr shuìjiào.", "Hari ini saya sangat lelah, ingin tidur lebih awal."],
      ["他的汉语说得很流利。", "Tā de Hànyǔ shuō de hěn liúlì.", "Bahasa Mandarinnya lancar."],
      ["北京的冬天很冷，夏天很热。", "Běijīng de dōngtiān hěn lěng, xiàtiān hěn rè.", "Musim dingin di Beijing dingin, musim panasnya panas."],
    ],
  ],
  // 19. Simple Request 请
  [
    [
      ["请坐", "qǐng zuò", "silakan duduk"],
      ["请进", "qǐng jìn", "silakan masuk"],
      ["请问", "qǐngwèn", "permisi, mau tanya", ["请问 dipakai untuk...", "memulai pertanyaan dengan sopan", "menolak", "berpamitan", "berterima kasih"]],
      ["请喝茶", "qǐng hē chá", "silakan minum teh"],
    ],
    [
      ["请坐这儿。", "Qǐng zuò zhèr.", "Silakan duduk di sini."],
      ["请问，厕所在哪儿？", "Qǐngwèn, cèsuǒ zài nǎr?", "Permisi, toilet di mana?"],
      ["请再说一遍。", "Qǐng zài shuō yí biàn.", "Tolong ulangi sekali lagi."],
      ["请你帮我一下。", "Qǐng nǐ bāng wǒ yíxià.", "Tolong bantu saya sebentar.", ["请 diletakkan...", "sebelum orang atau tindakan yang diminta", "di akhir kalimat", "setelah kata kerja", "setelah objek"]],
    ],
    [
      ["请大家打开书，看第二十页。", "Qǐng dàjiā dǎkāi shū, kàn dì èrshí yè.", "Semuanya, silakan buka buku halaman dua puluh."],
      ["请问，去火车站怎么走？", "Qǐngwèn, qù huǒchēzhàn zěnme zǒu?", "Permisi, ke stasiun kereta lewat mana?"],
      ["请你明天早上八点来我的办公室。", "Qǐng nǐ míngtiān zǎoshang bā diǎn lái wǒ de bàngōngshì.", "Tolong datang ke kantor saya besok pukul delapan pagi."],
      ["请不要在这儿抽烟。", "Qǐng búyào zài zhèr chōuyān.", "Tolong jangan merokok di sini."],
    ],
  ],
  // 20. HSK 1 Grammar Review
  [
    [
      ["不是吗", "bú shì ma", "bukankah?"],
      ["有没有", "yǒu méiyǒu", "ada atau tidak"],
      ["是不是", "shì bu shì", "benar atau tidak"],
      ["在不在", "zài bu zài", "ada (di tempat) atau tidak", ["Pertanyaan pola A-不-A (是不是) TIDAK memakai...", "吗 di akhir", "kata kerja", "subjek", "tanda tanya"]],
    ],
    [
      ["你是不是学生？", "Nǐ shì bu shì xuésheng?", "Kamu pelajar atau bukan?"],
      ["他今天不在家。", "Tā jīntiān bú zài jiā.", "Hari ini dia tidak di rumah."],
      ["你家有没有猫？", "Nǐ jiā yǒu méiyǒu māo?", "Di rumahmu ada kucing atau tidak?"],
      ["我没有哥哥，我有姐姐。", "Wǒ méiyǒu gēge, wǒ yǒu jiějie.", "Saya tidak punya kakak laki-laki, saya punya kakak perempuan.", ["Pilih yang benar:", "我不是老师，我没有车。", "我没是老师，我不有车。", "我不是老师，我不有车。", "我没是老师，我没有车。"]],
    ],
    [
      ["今天下午你在不在学校？我想找你。", "Jīntiān xiàwǔ nǐ zài bu zài xuéxiào? Wǒ xiǎng zhǎo nǐ.", "Sore ini kamu di sekolah tidak? Saya ingin menemuimu."],
      ["我叫李明，是北京人，今年二十岁。", "Wǒ jiào Lǐ Míng, shì Běijīng rén, jīnnián èrshí suì.", "Nama saya Li Ming, orang Beijing, tahun ini dua puluh tahun."],
      ["这是谁的书？是不是你的？", "Zhè shì shéi de shū? Shì bu shì nǐ de?", "Ini buku siapa? Punyamu bukan?"],
      ["我们班有几个人喜欢打篮球？", "Wǒmen bān yǒu jǐ ge rén xǐhuan dǎ lánqiú?", "Di kelas kita ada berapa orang yang suka main basket?"],
    ],
  ],
];
