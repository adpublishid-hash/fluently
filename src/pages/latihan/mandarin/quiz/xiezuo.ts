import type { QuizTopic } from './types';

// Latihan Xiězuò — one entry per topic (index = topic - 1): [Basic, Intermediate, Advanced].
export const xiezuo: QuizTopic[] = [
  // 1. Stroke Basics and Simple Hanzi
  [
    [
      ["一", "yī", "satu", ["Goresan dasar pada Hanzi 一 adalah...", "garis mendatar (横)", "garis tegak (竖)", "titik (点)", "sapuan kiri (撇)"]],
      ["十", "shí", "sepuluh"],
      ["人", "rén", "orang"],
      ["大", "dà", "besar"],
    ],
    [
      ["我是大人。", "Wǒ shì dàrén.", "Saya orang dewasa."],
      ["十个人。", "Shí ge rén.", "Sepuluh orang."],
      ["山上有人。", "Shān shang yǒu rén.", "Ada orang di atas gunung.", ["Aturan umum urutan goresan adalah...", "atas ke bawah, kiri ke kanan", "bawah ke atas", "kanan ke kiri", "bebas"]],
      ["天上有云。", "Tiān shang yǒu yún.", "Di langit ada awan."],
    ],
    [
      ["小孩子不是大人。", "Xiǎo háizi bú shì dàrén.", "Anak kecil bukan orang dewasa."],
      ["中国有很多大山。", "Zhōngguó yǒu hěn duō dà shān.", "Tiongkok punya banyak gunung besar."],
      ["一个人走在大路上。", "Yí ge rén zǒu zài dà lù shang.", "Seseorang berjalan di jalan besar."],
      ["天上的月亮很大。", "Tiān shang de yuèliang hěn dà.", "Bulan di langit sangat besar.", ["Hanzi 人 dan 入 berbeda pada...", "arah sapuan yang lebih panjang", "jumlah titik", "garis mendatar", "tidak ada perbedaan"]],
    ],
  ],
  // 2. Radicals and Basic Shapes
  [
    [
      ["口", "kǒu", "mulut"],
      ["日", "rì", "matahari / hari", ["Radikal 氵 (tiga titik air) muncul pada Hanzi...", "河 (sungai)", "树 (pohon)", "妈 (ibu)", "说 (berbicara)"]],
      ["月", "yuè", "bulan"],
      ["木", "mù", "kayu / pohon"],
    ],
    [
      ["今天是好日子。", "Jīntiān shì hǎo rìzi.", "Hari ini hari yang baik."],
      ["树木很高。", "Shùmù hěn gāo.", "Pepohonan itu tinggi."],
      ["我喝河水。", "Wǒ hē hé shuǐ.", "Saya minum air sungai."],
      ["妈妈说话。", "Māma shuōhuà.", "Ibu berbicara.", ["Radikal 女 pada 妈 berkaitan dengan makna...", "perempuan", "air", "kayu", "mulut"]],
    ],
    [
      ["明天是星期日，我们去森林。", "Míngtiān shì xīngqīrì, wǒmen qù sēnlín.", "Besok hari Minggu, kita pergi ke hutan."],
      ["“明”是“日”和“月”组成的。", "“Míng” shì “rì” hé “yuè” zǔchéng de.", "Hanzi 明 tersusun dari 日 dan 月.", ["Hanzi 明 (terang) terdiri dari...", "日 + 月", "目 + 月", "日 + 木", "口 + 月"]],
      ["“林”有两个“木”，“森”有三个“木”。", "“Lín” yǒu liǎng ge “mù”, “sēn” yǒu sān ge “mù”.", "林 punya dua 木, 森 punya tiga 木."],
      ["很多和水有关的字有三点水。", "Hěn duō hé shuǐ yǒuguān de zì yǒu sān diǎn shuǐ.", "Banyak Hanzi yang berkaitan dengan air memiliki radikal tiga titik air."],
    ],
  ],
  // 3. Pronouns in Writing
  [
    [
      ["她", "tā", "dia (perempuan)", ["Hanzi untuk 'dia (benda/hewan)' adalah...", "它", "他", "她", "们"]],
      ["它", "tā", "dia (benda / hewan)"],
      ["您", "nín", "Anda (sopan)"],
      ["她们", "tāmen", "mereka (perempuan)"],
    ],
    [
      ["她是我姐姐。", "Tā shì wǒ jiějie.", "Dia kakak perempuan saya."],
      ["它是我的猫。", "Tā shì wǒ de māo.", "Itu kucing saya."],
      ["您是李老师吗？", "Nín shì Lǐ lǎoshī ma?", "Apakah Anda Guru Li?", ["Hanzi 您 terdiri dari 你 + ...", "心 (hati)", "口 (mulut)", "女 (perempuan)", "人 (orang)"]],
      ["他们是我同学。", "Tāmen shì wǒ tóngxué.", "Mereka teman sekelas saya."],
    ],
    [
      ["我们班的老师是她，不是他。", "Wǒmen bān de lǎoshī shì tā, bú shì tā.", "Guru kelas kami adalah dia (perempuan), bukan dia (laki-laki)."],
      ["这只小狗很可爱，它叫豆豆。", "Zhè zhī xiǎogǒu hěn kě'ài, tā jiào Dòudou.", "Anak anjing ini lucu, namanya Doudou."],
      ["你们和我们都是好朋友。", "Nǐmen hé wǒmen dōu shì hǎo péngyou.", "Kalian dan kami semuanya sahabat."],
      ["王老师，您明天来学校吗？", "Wáng lǎoshī, nín míngtiān lái xuéxiào ma?", "Guru Wang, apakah Anda besok datang ke sekolah?"],
    ],
  ],
  // 4. Name and Identity Sentences
  [
    [
      ["姓", "xìng", "bermarga"],
      ["叫", "jiào", "bernama"],
      ["是", "shì", "adalah", ["Hanzi 叫 memiliki radikal...", "口 (mulut)", "女 (perempuan)", "木 (kayu)", "日 (matahari)"]],
      ["名字", "míngzi", "nama"],
    ],
    [
      ["我姓林。", "Wǒ xìng Lín.", "Marga saya Lin."],
      ["我叫林大明。", "Wǒ jiào Lín Dàmíng.", "Nama saya Lin Daming."],
      ["我是公司职员。", "Wǒ shì gōngsī zhíyuán.", "Saya karyawan perusahaan."],
      ["你叫什么名字？", "Nǐ jiào shénme míngzi?", "Siapa namamu?", ["Penulisan yang benar untuk 'siapa namamu?' adalah...", "你叫什么名字？", "你叫什么名子？", "你叫什么明字？", "你叫什么各字？"]],
    ],
    [
      ["我姓陈，叫陈小美，是高中生。", "Wǒ xìng Chén, jiào Chén Xiǎoměi, shì gāozhōngshēng.", "Marga saya Chen, nama saya Chen Xiaomei, siswa SMA."],
      ["他叫马力，是我们的汉语老师。", "Tā jiào Mǎ Lì, shì wǒmen de Hànyǔ lǎoshī.", "Namanya Ma Li, guru bahasa Mandarin kami."],
      ["我的名字是爸爸给我起的。", "Wǒ de míngzi shì bàba gěi wǒ qǐ de.", "Nama saya diberikan oleh ayah."],
      ["她不是学生，她是医生。", "Tā bú shì xuésheng, tā shì yīshēng.", "Dia bukan pelajar, dia dokter."],
    ],
  ],
  // 5. Family Sentences
  [
    [
      ["家", "jiā", "rumah / keluarga", ["Radikal 宀 (atap) pada 家 berkaitan dengan makna...", "rumah / bangunan", "air", "tangan", "mulut"]],
      ["爸", "bà", "ayah"],
      ["妈", "mā", "ibu"],
      ["姐", "jiě", "kakak perempuan"],
    ],
    [
      ["我家很大。", "Wǒ jiā hěn dà.", "Rumah saya besar."],
      ["我爸爸很高。", "Wǒ bàba hěn gāo.", "Ayah saya tinggi."],
      ["我妈妈很漂亮。", "Wǒ māma hěn piàoliang.", "Ibu saya cantik."],
      ["我姐姐的猫很小。", "Wǒ jiějie de māo hěn xiǎo.", "Kucing kakak perempuan saya kecil.", ["Hanzi 妈, 姐, 妹 sama-sama memiliki radikal...", "女", "口", "木", "人"]],
    ],
    [
      ["我爸爸妈妈都很忙，可是很爱我。", "Wǒ bàba māma dōu hěn máng, kěshì hěn ài wǒ.", "Ayah dan ibu saya sangat sibuk, tetapi sangat menyayangi saya."],
      ["我姐姐的女儿很可爱。", "Wǒ jiějie de nǚ'ér hěn kě'ài.", "Putri kakak perempuan saya sangat lucu."],
      ["我弟弟比我小三岁。", "Wǒ dìdi bǐ wǒ xiǎo sān suì.", "Adik laki-laki saya tiga tahun lebih muda dari saya."],
      ["我们家的人都喜欢吃饺子。", "Wǒmen jiā de rén dōu xǐhuan chī jiǎozi.", "Semua orang di keluarga kami suka makan pangsit."],
    ],
  ],
  // 6. Numbers and Measure Words
  [
    [
      ["本", "běn", "kata ukur untuk buku"],
      ["张", "zhāng", "kata ukur untuk benda pipih"],
      ["杯", "bēi", "cangkir / gelas"],
      ["只", "zhī", "kata ukur untuk hewan kecil", ["Kata ukur untuk kertas atau meja adalah...", "张", "本", "只", "杯"]],
    ],
    [
      ["我有三本书。", "Wǒ yǒu sān běn shū.", "Saya punya tiga buku."],
      ["桌子上有两张纸。", "Zhuōzi shang yǒu liǎng zhāng zhǐ.", "Di atas meja ada dua lembar kertas."],
      ["我要一杯水。", "Wǒ yào yì bēi shuǐ.", "Saya mau segelas air."],
      ["他家有五只猫。", "Tā jiā yǒu wǔ zhī māo.", "Di rumahnya ada lima ekor kucing.", ["Penulisan yang benar untuk 'tiga buku' adalah...", "三本书", "三木书", "三个书本", "三书"]],
    ],
    [
      ["我买了六个苹果和两杯咖啡。", "Wǒ mǎi le liù ge píngguǒ hé liǎng bēi kāfēi.", "Saya membeli enam apel dan dua cangkir kopi."],
      ["这张桌子上有九本中文书。", "Zhè zhāng zhuōzi shang yǒu jiǔ běn Zhōngwén shū.", "Di atas meja ini ada sembilan buku Mandarin."],
      ["我们家有一只狗和两只鸟。", "Wǒmen jiā yǒu yì zhī gǒu hé liǎng zhī niǎo.", "Di rumah kami ada seekor anjing dan dua ekor burung."],
      ["请给我七张票。", "Qǐng gěi wǒ qī zhāng piào.", "Tolong beri saya tujuh lembar tiket."],
    ],
  ],
  // 7. Time Words in Sentences
  [
    [
      ["今年", "jīnnián", "tahun ini"],
      ["明年", "míngnián", "tahun depan"],
      ["去年", "qùnián", "tahun lalu", ["Penulisan yang benar untuk 'hari ini' adalah...", "今天", "令天", "今夫", "金天"]],
      ["早上", "zǎoshang", "pagi hari"],
    ],
    [
      ["今天我很忙。", "Jīntiān wǒ hěn máng.", "Hari ini saya sangat sibuk."],
      ["明天我去北京。", "Míngtiān wǒ qù Běijīng.", "Besok saya pergi ke Beijing."],
      ["昨天下雨了。", "Zuótiān xià yǔ le.", "Kemarin hujan."],
      ["现在八点。", "Xiànzài bā diǎn.", "Sekarang pukul delapan.", ["Hanzi 昨, 明, 时 sama-sama memiliki radikal...", "日 (matahari)", "目 (mata)", "月 (bulan)", "口 (mulut)"]],
    ],
    [
      ["我去年来中国，明年回国。", "Wǒ qùnián lái Zhōngguó, míngnián huí guó.", "Saya datang ke Tiongkok tahun lalu, tahun depan pulang."],
      ["今天早上我七点起床。", "Jīntiān zǎoshang wǒ qī diǎn qǐchuáng.", "Pagi ini saya bangun pukul tujuh."],
      ["现在是晚上十点，我要睡觉了。", "Xiànzài shì wǎnshang shí diǎn, wǒ yào shuìjiào le.", "Sekarang pukul sepuluh malam, saya mau tidur."],
      ["昨天晚上我看了一个电影。", "Zuótiān wǎnshang wǒ kàn le yí ge diànyǐng.", "Kemarin malam saya menonton sebuah film."],
    ],
  ],
  // 8. Location with 在
  [
    [
      ["在", "zài", "di / berada"],
      ["上面", "shàngmiàn", "di atas"],
      ["里面", "lǐmiàn", "di dalam"],
      ["外面", "wàimiàn", "di luar", ["Penulisan yang benar untuk 'di dalam' adalah...", "里面", "理面", "里而", "黑面"]],
    ],
    [
      ["我在家。", "Wǒ zài jiā.", "Saya di rumah."],
      ["书在桌子上。", "Shū zài zhuōzi shang.", "Buku ada di atas meja."],
      ["猫在房间里。", "Māo zài fángjiān li.", "Kucing ada di dalam kamar."],
      ["他在外面等你。", "Tā zài wàimiàn děng nǐ.", "Dia menunggumu di luar.", ["Hanzi 在 dan 再 sering tertukar. 'Sampai jumpa' ditulis...", "再见", "在见", "再现", "在现"]],
    ],
    [
      ["我的手机在书包里面。", "Wǒ de shǒujī zài shūbāo lǐmiàn.", "Ponsel saya ada di dalam tas."],
      ["老师在教室里写汉字。", "Lǎoshī zài jiàoshì li xiě Hànzì.", "Guru menulis Hanzi di ruang kelas."],
      ["我们在公园门口见面。", "Wǒmen zài gōngyuán ménkǒu jiànmiàn.", "Kita bertemu di gerbang taman."],
      ["医院在学校的后面。", "Yīyuàn zài xuéxiào de hòumiàn.", "Rumah sakit ada di belakang sekolah."],
    ],
  ],
  // 9. Possession with 的
  [
    [
      ["我的", "wǒ de", "milik saya"],
      ["你的", "nǐ de", "milikmu"],
      ["谁的", "shéi de", "milik siapa"],
      ["老师的", "lǎoshī de", "milik guru", ["Partikel kepemilikan yang benar ditulis...", "的", "得", "地", "白"]],
    ],
    [
      ["这是我的书。", "Zhè shì wǒ de shū.", "Ini buku saya."],
      ["那是你的笔吗？", "Nà shì nǐ de bǐ ma?", "Itu penamu?"],
      ["这是谁的手机？", "Zhè shì shéi de shǒujī?", "Ini ponsel siapa?"],
      ["我朋友的车很新。", "Wǒ péngyou de chē hěn xīn.", "Mobil teman saya baru.", ["Penulisan yang benar untuk 'mobil teman saya' adalah...", "我朋友的车", "我朋友得车", "我朋又的车", "我明友的车"]],
    ],
    [
      ["这本书是我的，那本是我同学的。", "Zhè běn shū shì wǒ de, nà běn shì wǒ tóngxué de.", "Buku ini milik saya, yang itu milik teman sekelas saya."],
      ["我们老师的家在学校旁边。", "Wǒmen lǎoshī de jiā zài xuéxiào pángbiān.", "Rumah guru kami ada di samping sekolah."],
      ["我喜欢你的新衣服。", "Wǒ xǐhuan nǐ de xīn yīfu.", "Saya suka baju barumu."],
      ["他的中文名字很好听。", "Tā de Zhōngwén míngzi hěn hǎotīng.", "Nama Mandarinnya enak didengar."],
    ],
  ],
  // 10. Likes and Wants
  [
    [
      ["想", "xiǎng", "ingin / berpikir", ["Radikal 心 di bawah 想 berkaitan dengan...", "hati / perasaan", "air", "tangan", "kaki"]],
      ["要", "yào", "mau / perlu"],
      ["爱", "ài", "cinta / suka sekali"],
      ["喜欢", "xǐhuan", "suka"],
    ],
    [
      ["我想喝水。", "Wǒ xiǎng hē shuǐ.", "Saya ingin minum air."],
      ["我喜欢看书。", "Wǒ xǐhuan kàn shū.", "Saya suka membaca."],
      ["她爱吃水果。", "Tā ài chī shuǐguǒ.", "Dia sangat suka makan buah."],
      ["你要什么？", "Nǐ yào shénme?", "Kamu mau apa?", ["Penulisan yang benar untuk 'saya ingin minum air' adalah...", "我想喝水。", "我想渴水。", "我想喝永。", "找想喝水。"]],
    ],
    [
      ["我很喜欢中国菜，特别是饺子。", "Wǒ hěn xǐhuan Zhōngguó cài, tèbié shì jiǎozi.", "Saya sangat suka masakan Tiongkok, terutama pangsit."],
      ["周末我想和朋友去看电影。", "Zhōumò wǒ xiǎng hé péngyou qù kàn diànyǐng.", "Akhir pekan saya ingin menonton film bersama teman."],
      ["我不喜欢冬天，我喜欢夏天。", "Wǒ bù xǐhuan dōngtiān, wǒ xǐhuan xiàtiān.", "Saya tidak suka musim dingin, saya suka musim panas."],
      ["我要买一个新手机。", "Wǒ yào mǎi yí ge xīn shǒujī.", "Saya mau membeli ponsel baru."],
    ],
  ],
  // 11. Food and Drink Writing
  [
    [
      ["吃饭", "chī fàn", "makan nasi / makan"],
      ["喝水", "hē shuǐ", "minum air"],
      ["米", "mǐ", "beras"],
      ["菜", "cài", "sayur / masakan", ["Hanzi 吃 dan 喝 sama-sama memiliki radikal...", "口 (mulut)", "氵 (air)", "饣 (makanan)", "木 (kayu)"]],
    ],
    [
      ["我吃米饭。", "Wǒ chī mǐfàn.", "Saya makan nasi."],
      ["他喝牛奶。", "Tā hē niúnǎi.", "Dia minum susu."],
      ["这个菜很好吃。", "Zhège cài hěn hǎochī.", "Masakan ini enak."],
      ["我渴了，想喝水。", "Wǒ kě le, xiǎng hē shuǐ.", "Saya haus, ingin minum.", ["渴 (haus) dan 喝 (minum) berbeda pada radikal...", "氵 vs 口", "日 vs 目", "木 vs 本", "人 vs 入"]],
    ],
    [
      ["早上我喝一杯牛奶，吃两个鸡蛋。", "Zǎoshang wǒ hē yì bēi niúnǎi, chī liǎng ge jīdàn.", "Pagi hari saya minum segelas susu dan makan dua telur."],
      ["中午我在饭馆吃了一碗面。", "Zhōngwǔ wǒ zài fànguǎn chī le yì wǎn miàn.", "Siang tadi saya makan semangkuk mi di rumah makan."],
      ["我不喜欢喝咖啡，我喜欢喝茶。", "Wǒ bù xǐhuan hē kāfēi, wǒ xǐhuan hē chá.", "Saya tidak suka kopi, saya suka teh."],
      ["妈妈做的菜比饭馆的好吃。", "Māma zuò de cài bǐ fànguǎn de hǎochī.", "Masakan ibu lebih enak daripada masakan rumah makan."],
    ],
  ],
  // 12. Shopping Notes
  [
    [
      ["买", "mǎi", "membeli"],
      ["卖", "mài", "menjual", ["Beda tulisan 买 (membeli) dan 卖 (menjual) adalah...", "卖 punya tambahan 十 di atas", "买 punya tambahan 十 di atas", "keduanya sama", "卖 tidak punya titik"]],
      ["块", "kuài", "yuan (satuan uang)"],
      ["一共", "yígòng", "total"],
    ],
    [
      ["要买：牛奶、面包、鸡蛋。", "Yào mǎi: niúnǎi, miànbāo, jīdàn.", "Yang perlu dibeli: susu, roti, telur."],
      ["苹果十块钱。", "Píngguǒ shí kuài qián.", "Apel sepuluh yuan."],
      ["一共三十五块。", "Yígòng sānshíwǔ kuài.", "Total tiga puluh lima yuan."],
      ["这个商店卖水果。", "Zhège shāngdiàn mài shuǐguǒ.", "Toko ini menjual buah.", ["Penulisan yang benar untuk 'toko ini menjual buah' adalah...", "这个商店卖水果。", "这个商店买水果。", "这个商店卖水里。", "这个商店卖永果。"]],
    ],
    [
      ["我买了两斤苹果，一共十六块钱。", "Wǒ mǎi le liǎng jīn píngguǒ, yígòng shíliù kuài qián.", "Saya membeli dua jin apel, totalnya enam belas yuan."],
      ["那家店卖的衣服又好又便宜。", "Nà jiā diàn mài de yīfu yòu hǎo yòu piányi.", "Baju yang dijual toko itu bagus dan murah."],
      ["明天要买：米、油、水果和牙膏。", "Míngtiān yào mǎi: mǐ, yóu, shuǐguǒ hé yágāo.", "Besok perlu membeli: beras, minyak, buah, dan pasta gigi."],
      ["这件衣服打八折以后是一百块。", "Zhè jiàn yīfu dǎ bā zhé yǐhòu shì yìbǎi kuài.", "Setelah diskon 20%, baju ini seratus yuan."],
    ],
  ],
  // 13. Question Sentences
  [
    [
      ["吗", "ma", "partikel tanya ya/tidak"],
      ["呢", "ne", "partikel tanya balik"],
      ["哪", "nǎ", "mana", ["Hanzi 哪 (mana) dan 那 (itu) berbeda karena 哪 punya radikal...", "口", "女", "氵", "木"]],
      ["几", "jǐ", "berapa"],
    ],
    [
      ["你是老师吗？", "Nǐ shì lǎoshī ma?", "Apakah kamu guru?"],
      ["我很好，你呢？", "Wǒ hěn hǎo, nǐ ne?", "Saya baik, kamu?"],
      ["你家在哪儿？", "Nǐ jiā zài nǎr?", "Rumahmu di mana?", ["Penulisan yang benar untuk 'rumahmu di mana?' adalah...", "你家在哪儿？", "你家在那儿？", "你家再哪儿？", "你家在哪几？"]],
      ["你有几个朋友？", "Nǐ yǒu jǐ ge péngyou?", "Kamu punya berapa teman?"],
    ],
    [
      ["这是什么？那是谁的书包？", "Zhè shì shénme? Nà shì shéi de shūbāo?", "Ini apa? Itu tas siapa?"],
      ["你明天几点去学校？", "Nǐ míngtiān jǐ diǎn qù xuéxiào?", "Besok kamu ke sekolah jam berapa?"],
      ["你喜欢哪个颜色？红色还是蓝色？", "Nǐ xǐhuan nǎge yánsè? Hóngsè háishi lánsè?", "Kamu suka warna yang mana? Merah atau biru?"],
      ["你们学校有多少个学生？", "Nǐmen xuéxiào yǒu duōshao ge xuésheng?", "Sekolah kalian punya berapa murid?"],
    ],
  ],
  // 14. Weather Journal
  [
    [
      ["晴", "qíng", "cerah", ["Hanzi 晴 (cerah) dan 睛 (bola mata) berbeda pada radikal...", "日 vs 目", "口 vs 日", "月 vs 目", "木 vs 日"]],
      ["雨", "yǔ", "hujan"],
      ["雪", "xuě", "salju"],
      ["风", "fēng", "angin"],
    ],
    [
      ["今天是晴天。", "Jīntiān shì qíngtiān.", "Hari ini cerah."],
      ["昨天下了大雨。", "Zuótiān xià le dà yǔ.", "Kemarin turun hujan deras."],
      ["今天风很大。", "Jīntiān fēng hěn dà.", "Hari ini anginnya kencang."],
      ["外面下雪了。", "Wàimiàn xià xuě le.", "Di luar turun salju.", ["Hanzi 雪 (salju) memiliki radikal 雨 di atas karena...", "berkaitan dengan cuaca / hujan", "berkaitan dengan air minum", "berkaitan dengan api", "berkaitan dengan pohon"]],
    ],
    [
      ["十月五日，星期一，晴，二十六度。", "Shí yuè wǔ rì, xīngqīyī, qíng, èrshíliù dù.", "5 Oktober, Senin, cerah, dua puluh enam derajat."],
      ["今天早上下雨，下午天晴了。", "Jīntiān zǎoshang xià yǔ, xiàwǔ tiān qíng le.", "Pagi ini hujan, sore cuacanya cerah."],
      ["今天很冷，我穿了很多衣服。", "Jīntiān hěn lěng, wǒ chuān le hěn duō yīfu.", "Hari ini dingin, saya memakai banyak baju."],
      ["天气预报说明天会下雪。", "Tiānqì yùbào shuō míngtiān huì xià xuě.", "Prakiraan cuaca bilang besok akan turun salju."],
    ],
  ],
  // 15. Daily Routine
  [
    [
      ["起床", "qǐchuáng", "bangun tidur"],
      ["上学", "shàngxué", "berangkat sekolah"],
      ["回家", "huí jiā", "pulang ke rumah"],
      ["睡觉", "shuìjiào", "tidur", ["Penulisan yang benar untuk 'pulang ke rumah' adalah...", "回家", "回字", "四家", "回豕"]],
    ],
    [
      ["我六点起床。", "Wǒ liù diǎn qǐchuáng.", "Saya bangun pukul enam."],
      ["我七点上学。", "Wǒ qī diǎn shàngxué.", "Saya berangkat sekolah pukul tujuh."],
      ["我下午四点回家。", "Wǒ xiàwǔ sì diǎn huí jiā.", "Saya pulang pukul empat sore."],
      ["我晚上十点睡觉。", "Wǒ wǎnshang shí diǎn shuìjiào.", "Saya tidur pukul sepuluh malam.", ["Hanzi 午 (siang) sering tertukar dengan...", "牛 (sapi)", "千 (ribu)", "干 (kering)", "半 (setengah)"]],
    ],
    [
      ["我每天早上六点起床，然后跑步。", "Wǒ měitiān zǎoshang liù diǎn qǐchuáng, ránhòu pǎobù.", "Setiap pagi saya bangun pukul enam, lalu berlari."],
      ["中午我在学校吃饭，下午学习汉语。", "Zhōngwǔ wǒ zài xuéxiào chī fàn, xiàwǔ xuéxí Hànyǔ.", "Siang saya makan di sekolah, sore belajar bahasa Mandarin."],
      ["回家以后我先做作业，再看电视。", "Huí jiā yǐhòu wǒ xiān zuò zuòyè, zài kàn diànshì.", "Setelah pulang saya mengerjakan PR dulu, lalu menonton TV."],
      ["睡觉以前我给妈妈打电话。", "Shuìjiào yǐqián wǒ gěi māma dǎ diànhuà.", "Sebelum tidur saya menelepon ibu."],
    ],
  ],
  // 16. Classroom Mini Notes
  [
    [
      ["书", "shū", "buku"],
      ["笔", "bǐ", "pena", ["Radikal ⺮ (bambu) pada 笔 menunjukkan bahwa pena dulu dibuat dari...", "bambu", "batu", "besi", "kertas"]],
      ["本子", "běnzi", "buku catatan"],
      ["字", "zì", "huruf / karakter"],
    ],
    [
      ["请带书和笔。", "Qǐng dài shū hé bǐ.", "Harap bawa buku dan pena."],
      ["明天考第三课。", "Míngtiān kǎo dì sān kè.", "Besok ujian pelajaran tiga."],
      ["生词写五遍。", "Shēngcí xiě wǔ biàn.", "Tulis kosakata baru lima kali."],
      ["这个字我不会写。", "Zhège zì wǒ bú huì xiě.", "Saya tidak bisa menulis huruf ini.", ["Penulisan yang benar untuk 'huruf ini' adalah...", "这个字", "这个子", "这个学", "这个宇"]],
    ],
    [
      ["星期一要交汉字作业，别忘了。", "Xīngqīyī yào jiāo Hànzì zuòyè, bié wàng le.", "Senin harus mengumpulkan PR Hanzi, jangan lupa."],
      ["老师说下课以后去图书馆借书。", "Lǎoshī shuō xiàkè yǐhòu qù túshūguǎn jiè shū.", "Guru bilang setelah kelas pergi meminjam buku di perpustakaan."],
      ["上课不能用手机，可以用词典。", "Shàngkè bù néng yòng shǒujī, kěyǐ yòng cídiǎn.", "Saat kelas tidak boleh pakai ponsel, boleh pakai kamus."],
      ["我的本子上写满了新汉字。", "Wǒ de běnzi shang xiě mǎn le xīn Hànzì.", "Buku catatan saya penuh dengan Hanzi baru."],
    ],
  ],
  // 17. Travel Mini Sentences
  [
    [
      ["车", "chē", "kendaraan / mobil"],
      ["票", "piào", "tiket"],
      ["坐车", "zuò chē", "naik kendaraan", ["Penulisan yang benar untuk 'naik kendaraan' adalah...", "坐车", "座车", "坐东", "生车"]],
      ["旅行", "lǚxíng", "perjalanan wisata"],
    ],
    [
      ["我坐火车去上海。", "Wǒ zuò huǒchē qù Shànghǎi.", "Saya naik kereta ke Shanghai."],
      ["他开车去公司。", "Tā kāichē qù gōngsī.", "Dia menyetir ke kantor."],
      ["我买了两张票。", "Wǒ mǎi le liǎng zhāng piào.", "Saya membeli dua tiket."],
      ["我们坐飞机去旅行。", "Wǒmen zuò fēijī qù lǚxíng.", "Kami berwisata naik pesawat.", ["Hanzi 坐 (duduk/naik) dan 座 (kursi) berbeda karena 座 punya tambahan...", "广 di luar", "口 di bawah", "氵 di kiri", "亻 di kiri"]],
    ],
    [
      ["下个月我要和家人坐飞机去北京旅行。", "Xià ge yuè wǒ yào hé jiārén zuò fēijī qù Běijīng lǚxíng.", "Bulan depan saya akan berwisata ke Beijing naik pesawat bersama keluarga."],
      ["从我家到火车站要坐二十分钟的车。", "Cóng wǒ jiā dào huǒchēzhàn yào zuò èrshí fēnzhōng de chē.", "Dari rumah saya ke stasiun kereta perlu naik kendaraan dua puluh menit."],
      ["我的座位是十二号，在窗户旁边。", "Wǒ de zuòwèi shì shí'èr hào, zài chuānghu pángbiān.", "Kursi saya nomor dua belas, di samping jendela."],
      ["这次旅行我拍了很多照片。", "Zhè cì lǚxíng wǒ pāi le hěn duō zhàopiàn.", "Dalam perjalanan ini saya mengambil banyak foto."],
    ],
  ],
  // 18. Short Dialogue Writing
  [
    [
      ["你好", "nǐ hǎo", "halo"],
      ["请问", "qǐngwèn", "permisi, mau tanya"],
      ["谢谢", "xièxie", "terima kasih"],
      ["不客气", "bú kèqi", "sama-sama", ["Penulisan yang benar untuk 'permisi, mau tanya' adalah...", "请问", "清问", "请间", "情问"]],
    ],
    [
      ["A：你好！B：你好！", "A: Nǐ hǎo! B: Nǐ hǎo!", "A: Halo! B: Halo!"],
      ["A：你叫什么名字？B：我叫小文。", "A: Nǐ jiào shénme míngzi? B: Wǒ jiào Xiǎowén.", "A: Siapa namamu? B: Nama saya Xiaowen."],
      ["A：谢谢你！B：不客气。", "A: Xièxie nǐ! B: Bú kèqi.", "A: Terima kasih! B: Sama-sama."],
      ["A：对不起！B：没关系。", "A: Duìbuqǐ! B: Méi guānxi.", "A: Maaf! B: Tidak apa-apa.", ["Dalam dialog, jawaban untuk 对不起 ditulis...", "没关系", "没关糸", "设关系", "没开系"]],
    ],
    [
      ["A：请问，图书馆在哪儿？B：在食堂旁边。", "A: Qǐngwèn, túshūguǎn zài nǎr? B: Zài shítáng pángbiān.", "A: Permisi, perpustakaan di mana? B: Di samping kantin."],
      ["A：你是哪国人？B：我是印度尼西亚人。", "A: Nǐ shì nǎ guó rén? B: Wǒ shì Yìndùníxīyà rén.", "A: Kamu orang mana? B: Saya orang Indonesia."],
      ["A：你明天有空吗？B：有，什么事？", "A: Nǐ míngtiān yǒu kòng ma? B: Yǒu, shénme shì?", "A: Besok kamu ada waktu? B: Ada, ada apa?"],
      ["A：这个多少钱？B：二十块。", "A: Zhège duōshao qián? B: Èrshí kuài.", "A: Ini berapa? B: Dua puluh yuan."],
    ],
  ],
  // 19. Mini Paragraph About Self
  [
    [
      ["我叫小月", "wǒ jiào Xiǎoyuè", "nama saya Xiaoyue"],
      ["今年十八岁", "jīnnián shíbā suì", "tahun ini delapan belas tahun"],
      ["我住在万隆", "wǒ zhù zài Wànlóng", "saya tinggal di Bandung"],
      ["我会说汉语", "wǒ huì shuō Hànyǔ", "saya bisa berbahasa Mandarin", ["Paragraf tentang diri biasanya dimulai dengan...", "nama", "hobi", "rencana", "penutup"]],
    ],
    [
      ["我叫小月，是高中生。", "Wǒ jiào Xiǎoyuè, shì gāozhōngshēng.", "Nama saya Xiaoyue, siswi SMA."],
      ["我住在万隆，我家有四口人。", "Wǒ zhù zài Wànlóng, wǒ jiā yǒu sì kǒu rén.", "Saya tinggal di Bandung, keluarga saya empat orang."],
      ["我喜欢学习汉语和画画儿。", "Wǒ xǐhuan xuéxí Hànyǔ hé huà huàr.", "Saya suka belajar bahasa Mandarin dan menggambar."],
      ["我想去中国上大学。", "Wǒ xiǎng qù Zhōngguó shàng dàxué.", "Saya ingin kuliah di Tiongkok.", ["Kalimat yang cocok sebagai penutup paragraf adalah...", "这就是我，谢谢！", "你好，我叫小月。", "我今年十八岁。", "我住在万隆。"]],
    ],
    [
      ["我叫小月，今年十八岁，是印度尼西亚人。", "Wǒ jiào Xiǎoyuè, jīnnián shíbā suì, shì Yìndùníxīyà rén.", "Nama saya Xiaoyue, tahun ini delapan belas tahun, orang Indonesia."],
      ["我学了两年汉语，我觉得汉字很有意思。", "Wǒ xué le liǎng nián Hànyǔ, wǒ juéde Hànzì hěn yǒu yìsi.", "Saya sudah belajar Mandarin dua tahun, menurut saya Hanzi sangat menarik."],
      ["我有一个好朋友，她也喜欢中国文化。", "Wǒ yǒu yí ge hǎo péngyou, tā yě xǐhuan Zhōngguó wénhuà.", "Saya punya sahabat, dia juga suka budaya Tiongkok."],
      ["我的梦想是当一名翻译。", "Wǒ de mèngxiǎng shì dāng yì míng fānyì.", "Impian saya menjadi penerjemah."],
    ],
  ],
  // 20. HSK 1 Writing Review
  [
    [
      ["学校", "xuéxiào", "sekolah"],
      ["朋友", "péngyou", "teman", ["Penulisan yang benar untuk 'teman' adalah...", "朋友", "明友", "朋又", "用友"]],
      ["中文", "Zhōngwén", "bahasa Mandarin (tulis)"],
      ["电话", "diànhuà", "telepon"],
    ],
    [
      ["我在学校学中文。", "Wǒ zài xuéxiào xué Zhōngwén.", "Saya belajar bahasa Mandarin di sekolah."],
      ["我的朋友是北京人。", "Wǒ de péngyou shì Běijīng rén.", "Teman saya orang Beijing."],
      ["我给他打电话。", "Wǒ gěi tā dǎ diànhuà.", "Saya meneleponnya."],
      ["我认识这个字。", "Wǒ rènshi zhège zì.", "Saya kenal huruf ini.", ["Penulisan yang benar untuk 'saya kenal huruf ini' adalah...", "我认识这个字。", "我队识这个字。", "我认识这个子。", "我认只这个字。"]],
    ],
    [
      ["你好！我叫丽丽，是这个学校的学生。", "Nǐ hǎo! Wǒ jiào Lìli, shì zhège xuéxiào de xuésheng.", "Halo! Nama saya Lili, murid sekolah ini."],
      ["我每天坐公交车去学校，路上要半个小时。", "Wǒ měitiān zuò gōngjiāochē qù xuéxiào, lùshang yào bàn ge xiǎoshí.", "Setiap hari saya naik bus ke sekolah, perjalanan setengah jam."],
      ["周末我常常和朋友去公园，有时候去看电影。", "Zhōumò wǒ chángcháng hé péngyou qù gōngyuán, yǒu shíhou qù kàn diànyǐng.", "Akhir pekan saya sering ke taman bersama teman, kadang menonton film."],
      ["我很喜欢学中文，因为中文很有意思。", "Wǒ hěn xǐhuan xué Zhōngwén, yīnwèi Zhōngwén hěn yǒu yìsi.", "Saya sangat suka belajar Mandarin, karena bahasa Mandarin menarik."],
    ],
  ],
];
