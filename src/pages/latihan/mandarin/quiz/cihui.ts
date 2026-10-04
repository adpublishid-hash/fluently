import type { QuizTopic } from './types';

// Latihan Cíhuì — one entry per topic (index = topic - 1): [Basic, Intermediate, Advanced].
export const cihui: QuizTopic[] = [
  // 1. Greetings and Polite Words
  [
    [
      ["你好", "nǐ hǎo", "halo"],
      ["谢谢", "xièxie", "terima kasih"],
      ["对不起", "duìbuqǐ", "maaf", ["Respons yang tepat untuk 对不起 adalah...", "没关系", "不客气", "你好", "再见"]],
      ["再见", "zàijiàn", "sampai jumpa"],
    ],
    [
      ["不客气。", "Bú kèqi.", "Sama-sama."],
      ["没关系。", "Méi guānxi.", "Tidak apa-apa."],
      ["明天见！", "Míngtiān jiàn!", "Sampai jumpa besok!", ["Ucapan pamit untuk bertemu lagi besok adalah...", "明天见", "早上好", "对不起", "谢谢"]],
      ["请进。", "Qǐng jìn.", "Silakan masuk."],
    ],
    [
      ["谢谢你的帮助，再见！", "Xièxie nǐ de bāngzhù, zàijiàn!", "Terima kasih atas bantuanmu, sampai jumpa!"],
      ["对不起，我来晚了。", "Duìbuqǐ, wǒ lái wǎn le.", "Maaf, saya datang terlambat."],
      ["请坐，请喝茶。", "Qǐng zuò, qǐng hē chá.", "Silakan duduk, silakan minum teh."],
      ["您好，欢迎来我家！", "Nín hǎo, huānyíng lái wǒ jiā!", "Halo, selamat datang di rumah saya!"],
    ],
  ],
  // 2. Pronouns and People
  [
    [
      ["我", "wǒ", "saya"],
      ["你", "nǐ", "kamu"],
      ["他", "tā", "dia (laki-laki)", ["Kata ganti untuk 'dia (perempuan)' adalah...", "她", "他", "它", "你"]],
      ["我们", "wǒmen", "kami / kita"],
    ],
    [
      ["她是老师。", "Tā shì lǎoshī.", "Dia (perempuan) seorang guru."],
      ["你们是学生。", "Nǐmen shì xuésheng.", "Kalian adalah pelajar.", ["Kata ganti untuk 'kalian' adalah...", "你们", "我们", "他们", "您"]],
      ["他们是朋友。", "Tāmen shì péngyou.", "Mereka berteman."],
      ["您是王先生吗？", "Nín shì Wáng xiānsheng ma?", "Apakah Anda Tuan Wang?"],
    ],
    [
      ["我们都是中国人，他不是。", "Wǒmen dōu shì Zhōngguó rén, tā bú shì.", "Kami semua orang Tiongkok, dia bukan."],
      ["那个人是我的同学。", "Nàge rén shì wǒ de tóngxué.", "Orang itu teman sekelas saya."],
      ["大家好，我们一起学习吧。", "Dàjiā hǎo, wǒmen yìqǐ xuéxí ba.", "Halo semuanya, ayo kita belajar bersama."],
      ["你们的老师是哪国人？", "Nǐmen de lǎoshī shì nǎ guó rén?", "Guru kalian orang negara mana?"],
    ],
  ],
  // 3. Family Members
  [
    [
      ["爸爸", "bàba", "ayah"],
      ["妈妈", "māma", "ibu"],
      ["哥哥", "gēge", "kakak laki-laki", ["Kata untuk 'adik perempuan' adalah...", "妹妹", "姐姐", "弟弟", "哥哥"]],
      ["姐姐", "jiějie", "kakak perempuan"],
    ],
    [
      ["我有一个弟弟。", "Wǒ yǒu yí ge dìdi.", "Saya punya seorang adik laki-laki."],
      ["她是我妹妹。", "Tā shì wǒ mèimei.", "Dia adik perempuan saya."],
      ["我家有四口人。", "Wǒ jiā yǒu sì kǒu rén.", "Keluarga saya ada empat orang.", ["Kata ukur untuk anggota keluarga dalam 我家有四__人 adalah...", "口", "个", "本", "只"]],
      ["爷爷七十岁了。", "Yéye qīshí suì le.", "Kakek sudah berumur tujuh puluh tahun."],
    ],
    [
      ["我爸爸是医生，我妈妈是老师。", "Wǒ bàba shì yīshēng, wǒ māma shì lǎoshī.", "Ayah saya dokter, ibu saya guru."],
      ["哥哥和姐姐都在北京工作。", "Gēge hé jiějie dōu zài Běijīng gōngzuò.", "Kakak laki-laki dan kakak perempuan sama-sama bekerja di Beijing."],
      ["奶奶每天给我们做饭。", "Nǎinai měitiān gěi wǒmen zuò fàn.", "Nenek memasak untuk kami setiap hari."],
      ["我儿子三岁，我女儿五岁。", "Wǒ érzi sān suì, wǒ nǚ'ér wǔ suì.", "Anak laki-laki saya tiga tahun, anak perempuan saya lima tahun."],
    ],
  ],
  // 4. Numbers Zero to Ten
  [
    [
      ["零", "líng", "nol"],
      ["三", "sān", "tiga"],
      ["八", "bā", "delapan", ["Angka 'sembilan' dalam Hanzi adalah...", "九", "八", "六", "七"]],
      ["十", "shí", "sepuluh"],
    ],
    [
      ["我有两个哥哥。", "Wǒ yǒu liǎng ge gēge.", "Saya punya dua kakak laki-laki.", ["Sebelum kata ukur, angka 2 memakai...", "两 liǎng", "二 èr", "俩 liǎ", "双 shuāng"]],
      ["她六岁。", "Tā liù suì.", "Dia berumur enam tahun."],
      ["这里有五本书。", "Zhèli yǒu wǔ běn shū.", "Di sini ada lima buku."],
      ["我们班有十个学生。", "Wǒmen bān yǒu shí ge xuésheng.", "Kelas kami punya sepuluh murid."],
    ],
    [
      ["我的电话号码是一三九零八七六。", "Wǒ de diànhuà hàomǎ shì yāo sān jiǔ líng bā qī liù.", "Nomor telepon saya 1390876."],
      ["一个苹果四块钱，两个八块钱。", "Yí ge píngguǒ sì kuài qián, liǎng ge bā kuài qián.", "Satu apel empat yuan, dua apel delapan yuan."],
      ["弟弟七岁，妹妹四岁。", "Dìdi qī suì, mèimei sì suì.", "Adik laki-laki tujuh tahun, adik perempuan empat tahun."],
      ["我家住在九号楼三层。", "Wǒ jiā zhù zài jiǔ hào lóu sān céng.", "Rumah saya di gedung nomor sembilan lantai tiga."],
    ],
  ],
  // 5. Days and Time
  [
    [
      ["今天", "jīntiān", "hari ini"],
      ["明天", "míngtiān", "besok"],
      ["昨天", "zuótiān", "kemarin", ["Kata untuk 'sekarang' adalah...", "现在", "昨天", "明天", "上午"]],
      ["现在", "xiànzài", "sekarang"],
    ],
    [
      ["今天星期三。", "Jīntiān xīngqīsān.", "Hari ini hari Rabu."],
      ["现在几点？", "Xiànzài jǐ diǎn?", "Sekarang jam berapa?"],
      ["明天是我的生日。", "Míngtiān shì wǒ de shēngrì.", "Besok ulang tahun saya."],
      ["我上午上课。", "Wǒ shàngwǔ shàngkè.", "Saya masuk kelas pagi hari.", ["Kata untuk 'sore (siang ke sore)' adalah...", "下午", "上午", "中午", "晚上"]],
    ],
    [
      ["昨天是星期日，我在家休息。", "Zuótiān shì xīngqīrì, wǒ zài jiā xiūxi.", "Kemarin hari Minggu, saya beristirahat di rumah."],
      ["现在是下午三点十分。", "Xiànzài shì xiàwǔ sān diǎn shí fēn.", "Sekarang pukul tiga lewat sepuluh sore."],
      ["我们明天晚上七点见面。", "Wǒmen míngtiān wǎnshang qī diǎn jiànmiàn.", "Kita bertemu besok malam pukul tujuh."],
      ["今年我二十岁，明年二十一岁。", "Jīnnián wǒ èrshí suì, míngnián èrshíyī suì.", "Tahun ini saya dua puluh tahun, tahun depan dua puluh satu."],
    ],
  ],
  // 6. Places Around Town
  [
    [
      ["商店", "shāngdiàn", "toko"],
      ["医院", "yīyuàn", "rumah sakit"],
      ["饭馆", "fànguǎn", "rumah makan", ["Tempat untuk menabung uang adalah...", "银行", "饭馆", "学校", "医院"]],
      ["火车站", "huǒchēzhàn", "stasiun kereta"],
    ],
    [
      ["我去商店。", "Wǒ qù shāngdiàn.", "Saya pergi ke toko."],
      ["医院在那儿。", "Yīyuàn zài nàr.", "Rumah sakit ada di sana."],
      ["我们在饭馆吃饭。", "Wǒmen zài fànguǎn chī fàn.", "Kami makan di rumah makan."],
      ["机场很远。", "Jīchǎng hěn yuǎn.", "Bandara sangat jauh.", ["Kata untuk 'bandara' adalah...", "机场", "车站", "商场", "公园"]],
    ],
    [
      ["火车站旁边有一个饭馆。", "Huǒchēzhàn pángbiān yǒu yí ge fànguǎn.", "Di samping stasiun kereta ada rumah makan."],
      ["我妈妈在医院工作，我爸爸在银行工作。", "Wǒ māma zài yīyuàn gōngzuò, wǒ bàba zài yínháng gōngzuò.", "Ibu saya bekerja di rumah sakit, ayah saya bekerja di bank."],
      ["从学校到公园要走十分钟。", "Cóng xuéxiào dào gōngyuán yào zǒu shí fēnzhōng.", "Dari sekolah ke taman perlu berjalan sepuluh menit."],
      ["这个商店的东西很便宜。", "Zhège shāngdiàn de dōngxi hěn piányi.", "Barang di toko ini murah."],
    ],
  ],
  // 7. Classroom Words
  [
    [
      ["老师", "lǎoshī", "guru"],
      ["学生", "xuésheng", "murid / pelajar"],
      ["黑板", "hēibǎn", "papan tulis", ["Benda untuk menulis di kertas adalah...", "笔", "桌子", "黑板", "门"]],
      ["汉字", "Hànzì", "aksara Han (Hanzi)"],
    ],
    [
      ["这是我的书。", "Zhè shì wǒ de shū.", "Ini buku saya."],
      ["老师在教室。", "Lǎoshī zài jiàoshì.", "Guru ada di ruang kelas.", ["Kata untuk 'ruang kelas' adalah...", "教室", "教师", "学校", "宿舍"]],
      ["请看黑板。", "Qǐng kàn hēibǎn.", "Silakan lihat papan tulis."],
      ["我没有笔。", "Wǒ méiyǒu bǐ.", "Saya tidak punya pena."],
    ],
    [
      ["我们的教室里有二十张桌子。", "Wǒmen de jiàoshì li yǒu èrshí zhāng zhuōzi.", "Di ruang kelas kami ada dua puluh meja."],
      ["老师在黑板上写汉字。", "Lǎoshī zài hēibǎn shang xiě Hànzì.", "Guru menulis Hanzi di papan tulis."],
      ["请把你的作业本给我。", "Qǐng bǎ nǐ de zuòyèběn gěi wǒ.", "Tolong berikan buku PR-mu kepada saya."],
      ["这个问题很难，我不懂。", "Zhège wèntí hěn nán, wǒ bù dǒng.", "Pertanyaan ini sulit, saya tidak mengerti."],
    ],
  ],
  // 8. Food and Drink
  [
    [
      ["米饭", "mǐfàn", "nasi"],
      ["面条", "miàntiáo", "mi"],
      ["茶", "chá", "teh", ["Kata untuk 'air' adalah...", "水", "茶", "菜", "饭"]],
      ["牛奶", "niúnǎi", "susu sapi"],
    ],
    [
      ["我喝茶。", "Wǒ hē chá.", "Saya minum teh."],
      ["你吃米饭吗？", "Nǐ chī mǐfàn ma?", "Kamu makan nasi?"],
      ["我想喝水。", "Wǒ xiǎng hē shuǐ.", "Saya ingin minum air."],
      ["中国菜很好吃。", "Zhōngguó cài hěn hǎochī.", "Masakan Tiongkok enak.", ["Kata sifat 'enak (makanan)' adalah...", "好吃", "好看", "好听", "好喝"]],
    ],
    [
      ["早上我喝牛奶，吃面包。", "Zǎoshang wǒ hē niúnǎi, chī miànbāo.", "Pagi hari saya minum susu dan makan roti."],
      ["这家饭馆的面条很有名。", "Zhè jiā fànguǎn de miàntiáo hěn yǒumíng.", "Mi di rumah makan ini terkenal."],
      ["你要喝茶还是喝咖啡？", "Nǐ yào hē chá háishi hē kāfēi?", "Kamu mau minum teh atau kopi?"],
      ["我不吃肉，我喜欢吃菜。", "Wǒ bù chī ròu, wǒ xǐhuan chī cài.", "Saya tidak makan daging, saya suka makan sayur."],
    ],
  ],
  // 9. Fruits
  [
    [
      ["苹果", "píngguǒ", "apel"],
      ["香蕉", "xiāngjiāo", "pisang", ["Kata untuk 'semangka' adalah...", "西瓜", "香蕉", "苹果", "葡萄"]],
      ["西瓜", "xīguā", "semangka"],
      ["葡萄", "pútao", "anggur"],
    ],
    [
      ["我喜欢吃苹果。", "Wǒ xǐhuan chī píngguǒ.", "Saya suka makan apel."],
      ["香蕉很甜。", "Xiāngjiāo hěn tián.", "Pisangnya manis."],
      ["西瓜多少钱？", "Xīguā duōshao qián?", "Berapa harga semangkanya?"],
      ["这些葡萄是谁的？", "Zhèxiē pútao shì shéi de?", "Anggur-anggur ini milik siapa?", ["Kata umum untuk 'buah-buahan' adalah...", "水果", "水饺", "果汁", "蔬菜"]],
    ],
    [
      ["妈妈买了三斤苹果和一个西瓜。", "Māma mǎi le sān jīn píngguǒ hé yí ge xīguā.", "Ibu membeli tiga jin apel dan sebuah semangka."],
      ["夏天我常常吃西瓜。", "Xiàtiān wǒ chángcháng chī xīguā.", "Di musim panas saya sering makan semangka."],
      ["这个橙子有点儿酸。", "Zhège chéngzi yǒudiǎnr suān.", "Jeruk ini agak asam."],
      ["你最喜欢吃什么水果？", "Nǐ zuì xǐhuan chī shénme shuǐguǒ?", "Buah apa yang paling kamu sukai?"],
    ],
  ],
  // 10. Transportation
  [
    [
      ["飞机", "fēijī", "pesawat"],
      ["火车", "huǒchē", "kereta api"],
      ["出租车", "chūzūchē", "taksi"],
      ["自行车", "zìxíngchē", "sepeda", ["Kata untuk 'bus umum' adalah...", "公共汽车", "出租车", "自行车", "火车"]],
    ],
    [
      ["我坐飞机去。", "Wǒ zuò fēijī qù.", "Saya pergi naik pesawat.", ["Kata kerja untuk naik kendaraan (bus, pesawat) adalah...", "坐", "走", "在", "去"]],
      ["他骑自行车。", "Tā qí zìxíngchē.", "Dia naik sepeda."],
      ["我们坐出租车吧。", "Wǒmen zuò chūzūchē ba.", "Ayo kita naik taksi."],
      ["公共汽车来了。", "Gōnggòng qìchē lái le.", "Bus sudah datang."],
    ],
    [
      ["我每天坐地铁去公司。", "Wǒ měitiān zuò dìtiě qù gōngsī.", "Saya naik kereta bawah tanah ke kantor setiap hari."],
      ["坐火车去上海要五个小时。", "Zuò huǒchē qù Shànghǎi yào wǔ ge xiǎoshí.", "Naik kereta ke Shanghai butuh lima jam."],
      ["他开车送孩子去学校。", "Tā kāichē sòng háizi qù xuéxiào.", "Dia mengantar anak ke sekolah dengan mobil."],
      ["骑自行车比走路快。", "Qí zìxíngchē bǐ zǒulù kuài.", "Naik sepeda lebih cepat daripada berjalan kaki."],
    ],
  ],
  // 11. Daily Actions
  [
    [
      ["吃", "chī", "makan"],
      ["喝", "hē", "minum"],
      ["睡觉", "shuìjiào", "tidur"],
      ["起床", "qǐchuáng", "bangun tidur", ["Kata untuk 'bekerja' adalah...", "工作", "睡觉", "起床", "回家"]],
    ],
    [
      ["我七点起床。", "Wǒ qī diǎn qǐchuáng.", "Saya bangun pukul tujuh."],
      ["他在睡觉。", "Tā zài shuìjiào.", "Dia sedang tidur."],
      ["我们回家吧。", "Wǒmen huí jiā ba.", "Ayo kita pulang."],
      ["妈妈在做饭。", "Māma zài zuò fàn.", "Ibu sedang memasak.", ["在 sebelum kata kerja (他在睡觉) menunjukkan...", "sedang berlangsung", "sudah selesai", "akan datang", "larangan"]],
    ],
    [
      ["我每天早上六点半起床。", "Wǒ měitiān zǎoshang liù diǎn bàn qǐchuáng.", "Setiap pagi saya bangun pukul setengah tujuh."],
      ["吃完饭以后，我们去散步。", "Chī wán fàn yǐhòu, wǒmen qù sànbù.", "Setelah selesai makan, kami jalan-jalan."],
      ["爸爸下午五点下班回家。", "Bàba xiàwǔ wǔ diǎn xiàbān huí jiā.", "Ayah pulang kerja pukul lima sore."],
      ["晚上十一点我就睡觉了。", "Wǎnshang shíyī diǎn wǒ jiù shuìjiào le.", "Pukul sebelas malam saya sudah tidur."],
    ],
  ],
  // 12. Learning Actions
  [
    [
      ["学习", "xuéxí", "belajar"],
      ["写", "xiě", "menulis"],
      ["读", "dú", "membaca (bersuara)"],
      ["说", "shuō", "berbicara", ["Kata untuk 'mendengarkan' adalah...", "听", "说", "读", "写"]],
    ],
    [
      ["我学习汉语。", "Wǒ xuéxí Hànyǔ.", "Saya belajar bahasa Mandarin."],
      ["请写你的名字。", "Qǐng xiě nǐ de míngzi.", "Tolong tulis namamu."],
      ["他会说中文。", "Tā huì shuō Zhōngwén.", "Dia bisa berbahasa Mandarin.", ["会 dalam 他会说中文 berarti...", "bisa (keterampilan)", "mau", "harus", "sedang"]],
      ["我们读课文。", "Wǒmen dú kèwén.", "Kami membaca teks pelajaran."],
    ],
    [
      ["我每天学习两个小时汉语。", "Wǒ měitiān xuéxí liǎng ge xiǎoshí Hànyǔ.", "Saya belajar bahasa Mandarin dua jam setiap hari."],
      ["老师让我们听录音，然后回答问题。", "Lǎoshī ràng wǒmen tīng lùyīn, ránhòu huídá wèntí.", "Guru menyuruh kami mendengarkan rekaman lalu menjawab pertanyaan."],
      ["他汉字写得很漂亮。", "Tā Hànzì xiě de hěn piàoliang.", "Dia menulis Hanzi dengan indah."],
      ["你能再说一遍吗？", "Nǐ néng zài shuō yí biàn ma?", "Bisakah kamu mengulanginya sekali lagi?"],
    ],
  ],
  // 13. Basic Adjectives
  [
    [
      ["大", "dà", "besar"],
      ["小", "xiǎo", "kecil"],
      ["多", "duō", "banyak", ["Lawan kata 多 (banyak) adalah...", "少", "小", "大", "好"]],
      ["漂亮", "piàoliang", "cantik"],
    ],
    [
      ["这个房间很大。", "Zhège fángjiān hěn dà.", "Kamar ini besar."],
      ["她很漂亮。", "Tā hěn piàoliang.", "Dia cantik."],
      ["今天人很少。", "Jīntiān rén hěn shǎo.", "Hari ini orangnya sedikit."],
      ["这本书很新。", "Zhè běn shū hěn xīn.", "Buku ini baru.", ["Lawan kata 新 (baru) adalah...", "旧", "老", "少", "小"]],
    ],
    [
      ["我的房间不大，但是很干净。", "Wǒ de fángjiān bú dà, dànshì hěn gānjìng.", "Kamar saya tidak besar, tetapi sangat bersih."],
      ["这件衣服太长了，有没有短的？", "Zhè jiàn yīfu tài cháng le, yǒu méiyǒu duǎn de?", "Baju ini terlalu panjang, ada yang pendek?"],
      ["他的个子很高，他弟弟很矮。", "Tā de gèzi hěn gāo, tā dìdi hěn ǎi.", "Badannya tinggi, adiknya pendek."],
      ["这个问题很容易。", "Zhège wèntí hěn róngyì.", "Soal ini sangat mudah."],
    ],
  ],
  // 14. Colors
  [
    [
      ["红色", "hóngsè", "merah"],
      ["白色", "báisè", "putih"],
      ["黑色", "hēisè", "hitam", ["Kata untuk 'biru' adalah...", "蓝色", "绿色", "黄色", "红色"]],
      ["黄色", "huángsè", "kuning"],
    ],
    [
      ["我喜欢红色。", "Wǒ xǐhuan hóngsè.", "Saya suka warna merah."],
      ["天是蓝色的。", "Tiān shì lánsè de.", "Langit berwarna biru."],
      ["这是白色的猫。", "Zhè shì báisè de māo.", "Ini kucing putih."],
      ["你的包是什么颜色？", "Nǐ de bāo shì shénme yánsè?", "Tasmu warna apa?", ["Kata untuk 'warna' adalah...", "颜色", "红色", "衣服", "样子"]],
    ],
    [
      ["我想买那件绿色的衣服。", "Wǒ xiǎng mǎi nà jiàn lǜsè de yīfu.", "Saya ingin membeli baju hijau itu."],
      ["中国人过年喜欢红色。", "Zhōngguó rén guònián xǐhuan hóngsè.", "Orang Tiongkok menyukai warna merah saat Tahun Baru."],
      ["黑色的车是我的，白色的是我哥哥的。", "Hēisè de chē shì wǒ de, báisè de shì wǒ gēge de.", "Mobil hitam punya saya, yang putih punya kakak saya."],
      ["秋天的树叶变成了黄色。", "Qiūtiān de shùyè biàn chéng le huángsè.", "Daun-daun musim gugur berubah menjadi kuning."],
    ],
  ],
  // 15. Shopping and Money
  [
    [
      ["钱", "qián", "uang"],
      ["买", "mǎi", "membeli", ["Lawan kata 买 (membeli) adalah...", "卖", "实", "头", "来"]],
      ["贵", "guì", "mahal"],
      ["便宜", "piányi", "murah"],
    ],
    [
      ["这个多少钱？", "Zhège duōshao qián?", "Ini berapa harganya?"],
      ["太贵了！", "Tài guì le!", "Terlalu mahal!"],
      ["我买两个。", "Wǒ mǎi liǎng ge.", "Saya beli dua."],
      ["一共三十块。", "Yígòng sānshí kuài.", "Totalnya tiga puluh yuan.", ["Kata untuk 'totalnya' adalah...", "一共", "一起", "一下", "一样"]],
    ],
    [
      ["这件衣服太贵了，便宜一点儿吧。", "Zhè jiàn yīfu tài guì le, piányi yìdiǎnr ba.", "Baju ini terlalu mahal, tolong lebih murah sedikit."],
      ["我可以用手机付钱吗？", "Wǒ kěyǐ yòng shǒujī fù qián ma?", "Bolehkah saya membayar dengan ponsel?"],
      ["商店里的水果卖得很快。", "Shāngdiàn li de shuǐguǒ mài de hěn kuài.", "Buah di toko terjual dengan cepat."],
      ["我给你一百块，找我二十块。", "Wǒ gěi nǐ yìbǎi kuài, zhǎo wǒ èrshí kuài.", "Saya beri seratus yuan, kembaliannya dua puluh yuan."],
    ],
  ],
  // 16. Weather and Temperature
  [
    [
      ["天气", "tiānqì", "cuaca"],
      ["下雨", "xià yǔ", "hujan turun"],
      ["热", "rè", "panas"],
      ["冷", "lěng", "dingin", ["Kata untuk 'cerah' adalah...", "晴天", "下雨", "下雪", "阴天"]],
    ],
    [
      ["今天很热。", "Jīntiān hěn rè.", "Hari ini panas."],
      ["外面下雨了。", "Wàimiàn xià yǔ le.", "Di luar turun hujan."],
      ["明天是晴天。", "Míngtiān shì qíngtiān.", "Besok cerah."],
      ["北京冬天下雪。", "Běijīng dōngtiān xià xuě.", "Di Beijing turun salju saat musim dingin.", ["Kata untuk 'turun salju' adalah...", "下雪", "下雨", "刮风", "出太阳"]],
    ],
    [
      ["今天的天气怎么样？", "Jīntiān de tiānqì zěnmeyàng?", "Bagaimana cuaca hari ini?"],
      ["明天最高气温三十二度。", "Míngtiān zuì gāo qìwēn sānshí'èr dù.", "Suhu tertinggi besok tiga puluh dua derajat."],
      ["下雨的时候我不想出去。", "Xià yǔ de shíhou wǒ bù xiǎng chūqu.", "Saat hujan saya tidak ingin keluar."],
      ["冬天很冷，你要多穿衣服。", "Dōngtiān hěn lěng, nǐ yào duō chuān yīfu.", "Musim dingin sangat dingin, kamu harus berpakaian tebal."],
    ],
  ],
  // 17. Body and Health
  [
    [
      ["头", "tóu", "kepala"],
      ["眼睛", "yǎnjing", "mata"],
      ["肚子", "dùzi", "perut", ["Kata untuk 'tangan' adalah...", "手", "头", "口", "脚"]],
      ["生病", "shēngbìng", "sakit (jatuh sakit)"],
    ],
    [
      ["我头疼。", "Wǒ tóu téng.", "Kepala saya sakit."],
      ["他生病了。", "Tā shēngbìng le.", "Dia jatuh sakit."],
      ["你去看医生吧。", "Nǐ qù kàn yīshēng ba.", "Pergilah ke dokter.", ["看医生 berarti...", "berobat ke dokter", "melihat-lihat dokter", "menjadi dokter", "menelepon dokter"]],
      ["我肚子不舒服。", "Wǒ dùzi bù shūfu.", "Perut saya tidak enak."],
    ],
    [
      ["我昨天发烧了，今天好多了。", "Wǒ zuótiān fāshāo le, jīntiān hǎo duō le.", "Kemarin saya demam, hari ini jauh lebih baik."],
      ["医生说我要多喝水，多休息。", "Yīshēng shuō wǒ yào duō hē shuǐ, duō xiūxi.", "Dokter bilang saya harus banyak minum dan banyak istirahat."],
      ["她的眼睛又大又漂亮。", "Tā de yǎnjing yòu dà yòu piàoliang.", "Matanya besar dan indah."],
      ["每天运动对身体很好。", "Měitiān yùndòng duì shēntǐ hěn hǎo.", "Olahraga setiap hari baik untuk tubuh."],
    ],
  ],
  // 18. Hobbies and Interests
  [
    [
      ["唱歌", "chàng gē", "bernyanyi"],
      ["跳舞", "tiàowǔ", "menari"],
      ["游泳", "yóuyǒng", "berenang", ["Kata untuk 'bermain bola basket' adalah...", "打篮球", "踢足球", "游泳", "跑步"]],
      ["看电影", "kàn diànyǐng", "menonton film"],
    ],
    [
      ["我喜欢唱歌。", "Wǒ xǐhuan chàng gē.", "Saya suka bernyanyi."],
      ["他会游泳。", "Tā huì yóuyǒng.", "Dia bisa berenang."],
      ["我们去看电影吧。", "Wǒmen qù kàn diànyǐng ba.", "Ayo kita menonton film."],
      ["你的爱好是什么？", "Nǐ de àihào shì shénme?", "Apa hobimu?", ["Kata untuk 'hobi' adalah...", "爱好", "喜欢", "工作", "朋友"]],
    ],
    [
      ["周末我常常和朋友去打篮球。", "Zhōumò wǒ chángcháng hé péngyou qù dǎ lánqiú.", "Akhir pekan saya sering bermain basket dengan teman."],
      ["我妹妹跳舞跳得很好。", "Wǒ mèimei tiàowǔ tiào de hěn hǎo.", "Adik perempuan saya menari dengan baik."],
      ["我对中国音乐很感兴趣。", "Wǒ duì Zhōngguó yīnyuè hěn gǎn xìngqù.", "Saya sangat tertarik pada musik Tiongkok."],
      ["他每天早上跑步半个小时。", "Tā měitiān zǎoshang pǎobù bàn ge xiǎoshí.", "Dia berlari setengah jam setiap pagi."],
    ],
  ],
  // 19. Question Words
  [
    [
      ["什么", "shénme", "apa"],
      ["谁", "shéi", "siapa"],
      ["哪儿", "nǎr", "di mana / ke mana", ["Kata tanya untuk 'berapa (jumlah kecil)' adalah...", "几", "谁", "哪儿", "什么"]],
      ["怎么", "zěnme", "bagaimana (caranya)"],
    ],
    [
      ["这是什么？", "Zhè shì shénme?", "Ini apa?"],
      ["他是谁？", "Tā shì shéi?", "Dia siapa?"],
      ["你去哪儿？", "Nǐ qù nǎr?", "Kamu mau ke mana?"],
      ["你为什么不来？", "Nǐ wèishénme bù lái?", "Kenapa kamu tidak datang?", ["Kata tanya untuk 'mengapa' adalah...", "为什么", "什么", "怎么样", "多少"]],
    ],
    [
      ["你怎么去火车站？", "Nǐ zěnme qù huǒchēzhàn?", "Bagaimana kamu pergi ke stasiun kereta?"],
      ["你家有几口人？", "Nǐ jiā yǒu jǐ kǒu rén?", "Keluargamu ada berapa orang?"],
      ["这本书多少钱？", "Zhè běn shū duōshao qián?", "Buku ini berapa harganya?"],
      ["你什么时候去中国？", "Nǐ shénme shíhou qù Zhōngguó?", "Kapan kamu pergi ke Tiongkok?"],
    ],
  ],
  // 20. HSK 1 Vocabulary Review
  [
    [
      ["朋友", "péngyou", "teman"],
      ["东西", "dōngxi", "barang"],
      ["电脑", "diànnǎo", "komputer"],
      ["衣服", "yīfu", "pakaian", ["Kata untuk 'kucing' adalah...", "猫", "狗", "鱼", "鸟"]],
    ],
    [
      ["我和朋友去商店。", "Wǒ hé péngyou qù shāngdiàn.", "Saya pergi ke toko bersama teman."],
      ["桌子上有一台电脑。", "Zhuōzi shang yǒu yì tái diànnǎo.", "Di atas meja ada sebuah komputer."],
      ["我想买新衣服。", "Wǒ xiǎng mǎi xīn yīfu.", "Saya ingin membeli baju baru."],
      ["小狗在椅子下面。", "Xiǎogǒu zài yǐzi xiàmiàn.", "Anak anjing ada di bawah kursi.", ["Kata untuk 'di bawah' adalah...", "下面", "上面", "前面", "里面"]],
    ],
    [
      ["昨天我在商店买了很多东西。", "Zuótiān wǒ zài shāngdiàn mǎi le hěn duō dōngxi.", "Kemarin saya membeli banyak barang di toko."],
      ["我的中国朋友明天来我家吃饭。", "Wǒ de Zhōngguó péngyou míngtiān lái wǒ jiā chī fàn.", "Teman Tiongkok saya besok datang makan di rumah saya."],
      ["他在电脑上看中文电影。", "Tā zài diànnǎo shang kàn Zhōngwén diànyǐng.", "Dia menonton film Mandarin di komputer."],
      ["天气热了，我们去买几件衣服吧。", "Tiānqì rè le, wǒmen qù mǎi jǐ jiàn yīfu ba.", "Cuaca sudah panas, ayo kita beli beberapa baju."],
    ],
  ],
];
