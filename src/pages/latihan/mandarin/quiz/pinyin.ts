import type { QuizTopic } from './types';

// Latihan Pīnyīn — one entry per topic (index = topic - 1): [Basic, Intermediate, Advanced].
export const pinyin: QuizTopic[] = [
  // 1. Tone 1 High Flat
  [
    [
      ["咖啡", "kāfēi", "kopi", ["Nada pertama (tone 1) ditandai dengan...", "garis datar (ā)", "garis naik (á)", "lengkung (ǎ)", "garis turun (à)"]],
      ["飞机", "fēijī", "pesawat"],
      ["星期", "xīngqī", "minggu (pekan)"],
      ["今天", "jīntiān", "hari ini"],
    ],
    [
      ["他喝咖啡。", "Tā hē kāfēi.", "Dia minum kopi."],
      ["今天星期一。", "Jīntiān xīngqīyī.", "Hari ini hari Senin."],
      ["她听音乐。", "Tā tīng yīnyuè.", "Dia (perempuan) mendengarkan musik.", ["Kata yang semua suku katanya bernada 1 adalah...", "咖啡 kāfēi", "音乐 yīnyuè", "学生 xuésheng", "老师 lǎoshī"]],
      ["医生说中文。", "Yīshēng shuō Zhōngwén.", "Dokter itu berbicara bahasa Mandarin."],
    ],
    [
      ["星期天他们一起喝咖啡。", "Xīngqītiān tāmen yìqǐ hē kāfēi.", "Hari Minggu mereka minum kopi bersama."],
      ["今天我坐飞机去北京。", "Jīntiān wǒ zuò fēijī qù Běijīng.", "Hari ini saya naik pesawat ke Beijing."],
      ["春天的花开了。", "Chūntiān de huā kāi le.", "Bunga musim semi sudah mekar."],
      ["他每天都听中文歌。", "Tā měitiān dōu tīng Zhōngwén gē.", "Dia mendengarkan lagu Mandarin setiap hari."],
    ],
  ],
  // 2. Tone 2 Rising
  [
    [
      ["学习", "xuéxí", "belajar", ["Nada kedua (tone 2) terdengar...", "naik seperti bertanya", "datar tinggi", "turun tegas", "turun lalu naik"]],
      ["银行", "yínháng", "bank"],
      ["人民", "rénmín", "rakyat"],
      ["同学", "tóngxué", "teman sekelas"],
    ],
    [
      ["我们学习中文。", "Wǒmen xuéxí Zhōngwén.", "Kami belajar bahasa Mandarin."],
      ["银行在哪儿？", "Yínháng zài nǎr?", "Bank ada di mana?"],
      ["你是谁？", "Nǐ shì shéi?", "Kamu siapa?", ["Kata tanya 谁 dibaca dengan nada...", "kedua (shéi)", "pertama (shēi)", "ketiga (shěi)", "keempat (shèi)"]],
      ["同学们来了。", "Tóngxuémen lái le.", "Teman-teman sekelas sudah datang."],
    ],
    [
      ["明年我想去中国学习。", "Míngnián wǒ xiǎng qù Zhōngguó xuéxí.", "Tahun depan saya ingin belajar di Tiongkok."],
      ["王同学常常回家吃饭。", "Wáng tóngxué chángcháng huí jiā chī fàn.", "Teman sekelas Wang sering pulang untuk makan."],
      ["这个银行的门很大。", "Zhège yínháng de mén hěn dà.", "Pintu bank ini besar."],
      ["你什么时候回来？", "Nǐ shénme shíhou huílai?", "Kapan kamu kembali?"],
    ],
  ],
  // 3. Tone 3 Dipping
  [
    [
      ["你好", "nǐ hǎo", "halo"],
      ["水果", "shuǐguǒ", "buah-buahan"],
      ["老虎", "lǎohǔ", "harimau"],
      ["小姐", "xiǎojiě", "nona", ["Nada ketiga (tone 3) ditandai dengan...", "lengkung ˇ (ǎ)", "garis datar ˉ (ā)", "garis naik ˊ (á)", "garis turun ˋ (à)"]],
    ],
    [
      ["我很好。", "Wǒ hěn hǎo.", "Saya baik-baik saja."],
      ["我买水果。", "Wǒ mǎi shuǐguǒ.", "Saya membeli buah."],
      ["你几岁？", "Nǐ jǐ suì?", "Kamu umur berapa?"],
      ["请写你的名字。", "Qǐng xiě nǐ de míngzi.", "Tolong tulis namamu.", ["Saat nada 3 berdiri sendiri di akhir kalimat, ia dibaca...", "turun lalu naik penuh", "datar tinggi", "turun tegas", "sangat pendek tanpa nada"]],
    ],
    [
      ["我想买五个苹果。", "Wǒ xiǎng mǎi wǔ ge píngguǒ.", "Saya ingin membeli lima buah apel."],
      ["你早上几点起床？", "Nǐ zǎoshang jǐ diǎn qǐchuáng?", "Kamu bangun jam berapa pagi hari?"],
      ["老师的手表很好看。", "Lǎoshī de shǒubiǎo hěn hǎokàn.", "Jam tangan guru itu bagus."],
      ["小李喜欢喝牛奶。", "Xiǎo Lǐ xǐhuan hē niúnǎi.", "Xiao Li suka minum susu."],
    ],
  ],
  // 4. Tone 4 Falling
  [
    [
      ["再见", "zàijiàn", "sampai jumpa"],
      ["电视", "diànshì", "televisi", ["Nada keempat (tone 4) terdengar...", "jatuh tegas dari tinggi ke rendah", "naik seperti bertanya", "datar dan panjang", "rendah lalu naik"]],
      ["饭店", "fàndiàn", "hotel / restoran"],
      ["睡觉", "shuìjiào", "tidur"],
    ],
    [
      ["我看电视。", "Wǒ kàn diànshì.", "Saya menonton televisi."],
      ["他去饭店。", "Tā qù fàndiàn.", "Dia pergi ke restoran."],
      ["对不起，我错了。", "Duìbuqǐ, wǒ cuò le.", "Maaf, saya salah."],
      ["这是我的座位。", "Zhè shì wǒ de zuòwèi.", "Ini tempat duduk saya.", ["Kata 是 dibaca...", "shì (nada 4)", "shī (nada 1)", "shí (nada 2)", "shǐ (nada 3)"]],
    ],
    [
      ["弟弟在房间里睡觉。", "Dìdi zài fángjiān li shuìjiào.", "Adik laki-laki sedang tidur di kamar."],
      ["下个月我要去上海。", "Xià ge yuè wǒ yào qù Shànghǎi.", "Bulan depan saya akan pergi ke Shanghai."],
      ["这件衣服太贵了。", "Zhè jiàn yīfu tài guì le.", "Baju ini terlalu mahal."],
      ["谢谢你送我到饭店。", "Xièxie nǐ sòng wǒ dào fàndiàn.", "Terima kasih sudah mengantar saya ke hotel."],
    ],
  ],
  // 5. Neutral Tone
  [
    [
      ["妈妈", "māma", "ibu", ["Suku kata kedua pada 妈妈 dibaca dengan...", "nada netral (ringan, pendek)", "nada 1", "nada 3", "nada 4"]],
      ["东西", "dōngxi", "barang"],
      ["朋友", "péngyou", "teman"],
      ["桌子", "zhuōzi", "meja"],
    ],
    [
      ["你忙吗？", "Nǐ máng ma?", "Apakah kamu sibuk?"],
      ["这是我的。", "Zhè shì wǒ de.", "Ini punya saya."],
      ["他们走了。", "Tāmen zǒu le.", "Mereka sudah pergi.", ["Partikel 了, 的, 吗 biasanya dibaca...", "nada netral", "nada 1", "nada 2", "nada 4"]],
      ["我的朋友来了。", "Wǒ de péngyou lái le.", "Teman saya sudah datang."],
    ],
    [
      ["我妈妈在商店买东西。", "Wǒ māma zài shāngdiàn mǎi dōngxi.", "Ibu saya berbelanja di toko."],
      ["桌子上的杯子是谁的？", "Zhuōzi shang de bēizi shì shéi de?", "Gelas di atas meja itu milik siapa?"],
      ["哥哥的衣服很漂亮。", "Gēge de yīfu hěn piàoliang.", "Baju kakak laki-laki sangat bagus."],
      ["你们明天来不来？", "Nǐmen míngtiān lái bu lái?", "Besok kalian datang atau tidak?"],
    ],
  ],
  // 6. Tone Pairs 1-1 and 1-4
  [
    [
      ["公司", "gōngsī", "perusahaan"],
      ["医院", "yīyuàn", "rumah sakit", ["Pola nada pada 医院 yīyuàn adalah...", "1-4", "1-1", "2-4", "4-1"]],
      ["开车", "kāichē", "menyetir"],
      ["音乐", "yīnyuè", "musik"],
    ],
    [
      ["我去公司。", "Wǒ qù gōngsī.", "Saya pergi ke kantor."],
      ["她在医院工作。", "Tā zài yīyuàn gōngzuò.", "Dia bekerja di rumah sakit."],
      ["哥哥开车。", "Gēge kāichē.", "Kakak laki-laki menyetir.", ["Pola nada pada 开车 kāichē adalah...", "1-1", "1-4", "4-1", "2-1"]],
      ["他喜欢听音乐。", "Tā xǐhuan tīng yīnyuè.", "Dia suka mendengarkan musik."],
    ],
    [
      ["我爸爸每天开车去公司。", "Wǒ bàba měitiān kāichē qù gōngsī.", "Ayah saya menyetir ke kantor setiap hari."],
      ["医院旁边有一家商店。", "Yīyuàn pángbiān yǒu yì jiā shāngdiàn.", "Di samping rumah sakit ada sebuah toko."],
      ["她在家听音乐、喝咖啡。", "Tā zài jiā tīng yīnyuè, hē kāfēi.", "Dia di rumah mendengarkan musik dan minum kopi."],
      ["今天天气很好，我们出去吧。", "Jīntiān tiānqì hěn hǎo, wǒmen chūqu ba.", "Hari ini cuacanya bagus, ayo kita keluar."],
    ],
  ],
  // 7. Tone Pairs 2-2 and 2-4
  [
    [
      ["学校", "xuéxiào", "sekolah", ["Pola nada pada 学校 xuéxiào adalah...", "2-4", "2-2", "4-2", "1-4"]],
      ["回来", "huílai", "kembali (ke sini)"],
      ["食堂", "shítáng", "kantin"],
      ["一样", "yíyàng", "sama"],
    ],
    [
      ["我们去学校。", "Wǒmen qù xuéxiào.", "Kami pergi ke sekolah."],
      ["中午在食堂吃饭。", "Zhōngwǔ zài shítáng chī fàn.", "Siang hari makan di kantin."],
      ["他们一样高。", "Tāmen yíyàng gāo.", "Mereka sama tinggi."],
      ["你明白吗？", "Nǐ míngbai ma?", "Apakah kamu mengerti?", ["Pola nada pada 食堂 shítáng adalah...", "2-2", "2-4", "1-2", "4-4"]],
    ],
    [
      ["学校的食堂中午人很多。", "Xuéxiào de shítáng zhōngwǔ rén hěn duō.", "Kantin sekolah ramai saat siang."],
      ["我和同学一起回学校。", "Wǒ hé tóngxué yìqǐ huí xuéxiào.", "Saya kembali ke sekolah bersama teman sekelas."],
      ["他的颜色和你的不一样。", "Tā de yánsè hé nǐ de bù yíyàng.", "Warnanya berbeda dengan punyamu."],
      ["明天你几点回来？", "Míngtiān nǐ jǐ diǎn huílai?", "Besok kamu kembali jam berapa?"],
    ],
  ],
  // 8. Third Tone Sandhi Basics
  [
    [
      ["很好", "hěn hǎo", "sangat baik", ["Dalam 很好 (hěn hǎo), 很 diucapkan seperti nada...", "kedua (hén hǎo)", "pertama", "keempat", "netral"]],
      ["可以", "kěyǐ", "boleh"],
      ["水饺", "shuǐjiǎo", "pangsit rebus"],
      ["老板", "lǎobǎn", "bos / pemilik toko"],
    ],
    [
      ["我也很好。", "Wǒ yě hěn hǎo.", "Saya juga baik."],
      ["你可以走了。", "Nǐ kěyǐ zǒu le.", "Kamu boleh pergi.", ["Aturan sandhi: dua nada 3 berurutan, yang pertama dibaca...", "nada 2", "nada 1", "nada 4", "tetap nada 3"]],
      ["我想买水饺。", "Wǒ xiǎng mǎi shuǐjiǎo.", "Saya ingin membeli pangsit."],
      ["老板，你好！", "Lǎobǎn, nǐ hǎo!", "Halo, Bos!"],
    ],
    [
      ["我也想买五碗水饺。", "Wǒ yě xiǎng mǎi wǔ wǎn shuǐjiǎo.", "Saya juga ingin membeli lima mangkuk pangsit."],
      ["老板说可以早点儿走。", "Lǎobǎn shuō kěyǐ zǎo diǎnr zǒu.", "Bos bilang boleh pergi lebih awal."],
      ["你给我买的雨伞很好。", "Nǐ gěi wǒ mǎi de yǔsǎn hěn hǎo.", "Payung yang kamu belikan untukku bagus."],
      ["小雨也想去北海公园。", "Xiǎo Yǔ yě xiǎng qù Běihǎi Gōngyuán.", "Xiao Yu juga ingin pergi ke Taman Beihai."],
    ],
  ],
  // 9. Pinyin Initials b p m f
  [
    [
      ["爸爸", "bàba", "ayah"],
      ["朋友们", "péngyoumen", "teman-teman"],
      ["米饭", "mǐfàn", "nasi"],
      ["风", "fēng", "angin", ["Initial yang diucapkan dengan gigi atas menyentuh bibir bawah adalah...", "f", "b", "p", "m"]],
    ],
    [
      ["爸爸买面包。", "Bàba mǎi miànbāo.", "Ayah membeli roti."],
      ["我不怕。", "Wǒ bú pà.", "Saya tidak takut.", ["Beda b dan p: p diucapkan dengan...", "hembusan udara kuat", "suara sengau", "bibir bawah dan gigi", "tanpa membuka mulut"]],
      ["妈妈做米饭。", "Māma zuò mǐfàn.", "Ibu memasak nasi."],
      ["外面风很大。", "Wàimiàn fēng hěn dà.", "Di luar anginnya kencang."],
    ],
    [
      ["朋友们爬山以后吃了面包。", "Péngyoumen pá shān yǐhòu chī le miànbāo.", "Teman-teman makan roti setelah mendaki gunung."],
      ["爸爸妈妈不喜欢喝啤酒。", "Bàba māma bù xǐhuan hē píjiǔ.", "Ayah dan ibu tidak suka minum bir."],
      ["飞机八点半飞北京。", "Fēijī bā diǎn bàn fēi Běijīng.", "Pesawat terbang ke Beijing pukul setengah sembilan."],
      ["这本书很便宜。", "Zhè běn shū hěn piányi.", "Buku ini sangat murah."],
    ],
  ],
  // 10. Pinyin Initials d t n l
  [
    [
      ["大学", "dàxué", "universitas"],
      ["他们", "tāmen", "mereka", ["Beda d dan t: t diucapkan dengan...", "hembusan udara kuat", "suara sengau", "lidah di belakang", "bibir rapat"]],
      ["牛奶", "niúnǎi", "susu sapi"],
      ["老师", "lǎoshī", "guru"],
    ],
    [
      ["弟弟上大学。", "Dìdi shàng dàxué.", "Adik laki-laki kuliah di universitas."],
      ["他们都来了。", "Tāmen dōu lái le.", "Mereka semua sudah datang."],
      ["你要牛奶吗？", "Nǐ yào niúnǎi ma?", "Kamu mau susu?"],
      ["老师来了。", "Lǎoshī lái le.", "Guru sudah datang.", ["Pada 老师 lǎoshī, initial suku kata pertama adalah...", "l", "n", "d", "t"]],
    ],
    [
      ["太太的女儿是大学老师。", "Tàitai de nǚ'ér shì dàxué lǎoshī.", "Putri nyonya itu adalah dosen universitas."],
      ["那里的天气不冷也不热。", "Nàli de tiānqì bù lěng yě bú rè.", "Cuaca di sana tidak dingin dan tidak panas."],
      ["你女朋友喜欢喝牛奶吗？", "Nǐ nǚpéngyou xǐhuan hē niúnǎi ma?", "Apakah pacarmu suka minum susu?"],
      ["他点了两个菜。", "Tā diǎn le liǎng ge cài.", "Dia memesan dua hidangan."],
    ],
  ],
  // 11. Pinyin Initials g k h
  [
    [
      ["哥哥", "gēge", "kakak laki-laki"],
      ["可乐", "kělè", "cola"],
      ["喝茶", "hē chá", "minum teh"],
      ["汉语", "Hànyǔ", "bahasa Mandarin", ["Initial g, k, h diucapkan dengan...", "pangkal lidah", "ujung lidah", "bibir", "gigi"]],
    ],
    [
      ["哥哥喝可乐。", "Gēge hē kělè.", "Kakak laki-laki minum cola."],
      ["我会说汉语。", "Wǒ huì shuō Hànyǔ.", "Saya bisa berbahasa Mandarin."],
      ["客人很高兴。", "Kèrén hěn gāoxìng.", "Tamu itu sangat senang.", ["Pada 客人 kèrén, initial suku kata pertama adalah...", "k", "g", "h", "q"]],
      ["他回国了。", "Tā huí guó le.", "Dia sudah pulang ke negaranya."],
    ],
    [
      ["哥哥和姐姐在公园喝茶。", "Gēge hé jiějie zài gōngyuán hē chá.", "Kakak laki-laki dan kakak perempuan minum teh di taman."],
      ["开会以前我喝了一杯可乐。", "Kāihuì yǐqián wǒ hē le yì bēi kělè.", "Sebelum rapat saya minum segelas cola."],
      ["很多客人会说汉语。", "Hěn duō kèrén huì shuō Hànyǔ.", "Banyak tamu bisa berbahasa Mandarin."],
      ["孩子们看书看得很高兴。", "Háizimen kàn shū kàn de hěn gāoxìng.", "Anak-anak membaca buku dengan gembira."],
    ],
  ],
  // 12. Finals a o e
  [
    [
      ["马", "mǎ", "kuda"],
      ["我", "wǒ", "saya", ["Final pada 我 wǒ adalah...", "o (didahului w)", "a", "e", "u"]],
      ["饿", "è", "lapar"],
      ["喝", "hē", "minum"],
    ],
    [
      ["我饿了。", "Wǒ è le.", "Saya lapar."],
      ["他有一匹马。", "Tā yǒu yì pǐ mǎ.", "Dia punya seekor kuda."],
      ["你喝什么？", "Nǐ hē shénme?", "Kamu minum apa?", ["Final e pada 喝 hē dibaca seperti...", "ə (seperti e pada 'emas')", "é pada 'sate'", "a", "o"]],
      ["他是我哥哥。", "Tā shì wǒ gēge.", "Dia kakak laki-laki saya."],
    ],
    [
      ["我饿了，我们去吃饭吧。", "Wǒ è le, wǒmen qù chī fàn ba.", "Saya lapar, ayo kita makan."],
      ["哥哥在河边画马。", "Gēge zài hé biān huà mǎ.", "Kakak laki-laki menggambar kuda di tepi sungai."],
      ["妈妈问我喝不喝茶。", "Māma wèn wǒ hē bu hē chá.", "Ibu bertanya apakah saya mau minum teh."],
      ["我的车是红色的。", "Wǒ de chē shì hóngsè de.", "Mobil saya berwarna merah."],
    ],
  ],
  // 13. Finals i u ü
  [
    [
      ["鱼", "yú", "ikan", ["Untuk ü, bibir dibentuk...", "bulat seperti u sambil mengucap i", "lebar seperti tersenyum", "terbuka lebar", "rapat"]],
      ["书", "shū", "buku"],
      ["七", "qī", "tujuh"],
      ["女", "nǚ", "perempuan"],
    ],
    [
      ["我去旅游。", "Wǒ qù lǚyóu.", "Saya pergi berwisata."],
      ["我有七本书。", "Wǒ yǒu qī běn shū.", "Saya punya tujuh buku."],
      ["她是女医生。", "Tā shì nǚ yīshēng.", "Dia dokter perempuan."],
      ["你去哪儿？", "Nǐ qù nǎr?", "Kamu pergi ke mana?", ["Pada 去 qù, huruf u sebenarnya dibaca...", "ü (karena setelah q)", "u biasa", "i", "o"]],
    ],
    [
      ["下雨了，我们去书店看书吧。", "Xià yǔ le, wǒmen qù shūdiàn kàn shū ba.", "Hujan turun, ayo kita membaca di toko buku."],
      ["女儿喜欢吃鱼和米饭。", "Nǚ'ér xǐhuan chī yú hé mǐfàn.", "Anak perempuan suka makan ikan dan nasi."],
      ["我们七月去北京旅游。", "Wǒmen qī yuè qù Běijīng lǚyóu.", "Kami berwisata ke Beijing pada bulan Juli."],
      ["绿色的衣服是谁的？", "Lǜsè de yīfu shì shéi de?", "Baju hijau itu milik siapa?"],
    ],
  ],
  // 14. Finals ai ei ao ou
  [
    [
      ["买菜", "mǎi cài", "membeli sayur"],
      ["北京", "Běijīng", "Beijing", ["Final pada suku kata 北 běi adalah...", "ei", "ai", "ao", "ou"]],
      ["好", "hǎo", "baik"],
      ["走", "zǒu", "berjalan / pergi"],
    ],
    [
      ["我们走吧。", "Wǒmen zǒu ba.", "Ayo kita pergi."],
      ["妈妈去买菜。", "Māma qù mǎi cài.", "Ibu pergi membeli sayur."],
      ["你会开车吗？", "Nǐ huì kāichē ma?", "Apakah kamu bisa menyetir?"],
      ["我的手机很好。", "Wǒ de shǒujī hěn hǎo.", "Ponsel saya bagus.", ["Final pada 手 shǒu adalah...", "ou", "ao", "ei", "ai"]],
    ],
    [
      ["我没有北京的地图。", "Wǒ méiyǒu Běijīng de dìtú.", "Saya tidak punya peta Beijing."],
      ["老师告诉我们明天考试。", "Lǎoshī gàosu wǒmen míngtiān kǎoshì.", "Guru memberi tahu kami besok ujian."],
      ["小狗跑到楼下去了。", "Xiǎogǒu pǎo dào lóu xià qù le.", "Anak anjing itu berlari ke lantai bawah."],
      ["我还没吃早饭。", "Wǒ hái méi chī zǎofàn.", "Saya belum sarapan."],
    ],
  ],
  // 15. Finals an en ang eng
  [
    [
      ["看", "kàn", "melihat"],
      ["门", "mén", "pintu"],
      ["忙", "máng", "sibuk", ["Final pada 忙 máng adalah...", "ang (nasal belakang)", "an (nasal depan)", "en", "eng"]],
      ["冷", "lěng", "dingin"],
    ],
    [
      ["我很忙。", "Wǒ hěn máng.", "Saya sangat sibuk."],
      ["今天很冷。", "Jīntiān hěn lěng.", "Hari ini dingin."],
      ["请开门。", "Qǐng kāi mén.", "Tolong buka pintunya.", ["Final pada 门 mén adalah...", "en", "eng", "an", "ang"]],
      ["你看电影吗？", "Nǐ kàn diànyǐng ma?", "Apakah kamu menonton film?"],
    ],
    [
      ["晚上很冷，你关上门吧。", "Wǎnshang hěn lěng, nǐ guān shang mén ba.", "Malam ini dingin, tutuplah pintunya."],
      ["很多人在商场看电影。", "Hěn duō rén zài shāngchǎng kàn diànyǐng.", "Banyak orang menonton film di mal."],
      ["我的房间很干净。", "Wǒ de fángjiān hěn gānjìng.", "Kamar saya sangat bersih."],
      ["他认真地学习汉语。", "Tā rènzhēn de xuéxí Hànyǔ.", "Dia belajar bahasa Mandarin dengan sungguh-sungguh."],
    ],
  ],
  // 16. Syllable nǐ hǎo
  [
    [
      ["您好", "nín hǎo", "halo (sopan)", ["您好 dipakai untuk menyapa...", "orang yang lebih tua / dihormati", "anak kecil saja", "hewan", "diri sendiri"]],
      ["你们好", "nǐmen hǎo", "halo semuanya"],
      ["早上好", "zǎoshang hǎo", "selamat pagi"],
      ["晚上好", "wǎnshang hǎo", "selamat malam"],
    ],
    [
      ["你好，我叫小明。", "Nǐ hǎo, wǒ jiào Xiǎomíng.", "Halo, nama saya Xiaoming."],
      ["老师，您好！", "Lǎoshī, nín hǎo!", "Halo, Guru!"],
      ["同学们，早上好！", "Tóngxuémen, zǎoshang hǎo!", "Selamat pagi, anak-anak!"],
      ["你好吗？", "Nǐ hǎo ma?", "Apa kabar?", ["Dalam praktik, 你好 nǐ hǎo diucapkan...", "ní hǎo (sandhi nada 3)", "nǐ hǎo dengan dua nada 3 penuh", "nì hào", "nī hāo"]],
    ],
    [
      ["你好，很高兴认识你。", "Nǐ hǎo, hěn gāoxìng rènshi nǐ.", "Halo, senang berkenalan denganmu."],
      ["大家好，我是新来的同学。", "Dàjiā hǎo, wǒ shì xīn lái de tóngxué.", "Halo semuanya, saya teman sekelas yang baru."],
      ["王老师，您早！", "Wáng lǎoshī, nín zǎo!", "Selamat pagi, Guru Wang!"],
      ["你好，请问洗手间在哪儿？", "Nǐ hǎo, qǐngwèn xǐshǒujiān zài nǎr?", "Halo, permisi, toilet di mana?"],
    ],
  ],
  // 17. Syllable xièxie
  [
    [
      ["谢谢", "xièxie", "terima kasih", ["Suku kata kedua pada 谢谢 xièxie dibaca...", "nada netral", "nada 4 penuh", "nada 1", "nada 2"]],
      ["不客气", "bú kèqi", "sama-sama"],
      ["没关系", "méi guānxi", "tidak apa-apa"],
      ["学校门口", "xuéxiào ménkǒu", "gerbang sekolah"],
    ],
    [
      ["谢谢你！", "Xièxie nǐ!", "Terima kasih!"],
      ["谢谢老师。", "Xièxie lǎoshī.", "Terima kasih, Guru."],
      ["不用谢。", "Bú yòng xiè.", "Tidak usah berterima kasih.", ["Initial x pada 谢 xiè diucapkan...", "lidah datar di belakang gigi bawah, seperti 'si' tipis", "seperti 'sh' Inggris", "seperti 'ks'", "seperti 'h'"]],
      ["小谢写字。", "Xiǎo Xiè xiě zì.", "Xiao Xie menulis huruf."],
    ],
    [
      ["谢谢你帮我写作业。", "Xièxie nǐ bāng wǒ xiě zuòyè.", "Terima kasih sudah membantuku mengerjakan PR."],
      ["他说谢谢，我说不客气。", "Tā shuō xièxie, wǒ shuō bú kèqi.", "Dia bilang terima kasih, saya bilang sama-sama."],
      ["谢谢大家来参加我的生日。", "Xièxie dàjiā lái cānjiā wǒ de shēngrì.", "Terima kasih semuanya sudah datang ke ulang tahun saya."],
      ["鞋子太小了，我想换一双。", "Xiézi tài xiǎo le, wǒ xiǎng huàn yì shuāng.", "Sepatunya terlalu kecil, saya ingin menukar sepasang."],
    ],
  ],
  // 18. Read Name Slowly
  [
    [
      ["王明", "Wáng Míng", "Wang Ming (nama orang)", ["Dalam nama Mandarin, marga ditulis...", "di depan", "di belakang", "di tengah", "tidak ditulis"]],
      ["李华", "Lǐ Huá", "Li Hua (nama orang)"],
      ["张丽", "Zhāng Lì", "Zhang Li (nama orang)"],
      ["陈大卫", "Chén Dàwèi", "Chen Dawei (nama orang)"],
    ],
    [
      ["我姓王，叫王明。", "Wǒ xìng Wáng, jiào Wáng Míng.", "Marga saya Wang, nama saya Wang Ming."],
      ["她叫张丽。", "Tā jiào Zhāng Lì.", "Namanya Zhang Li."],
      ["你贵姓？", "Nǐ guì xìng?", "Siapa marga Anda?", ["Pertanyaan sopan untuk menanyakan marga adalah...", "您贵姓？", "你几岁？", "你去哪儿？", "你好吗？"]],
      ["我的中文名字是李华。", "Wǒ de Zhōngwén míngzi shì Lǐ Huá.", "Nama Mandarin saya Li Hua."],
    ],
    [
      ["我的老师姓刘，叫刘小红。", "Wǒ de lǎoshī xìng Liú, jiào Liú Xiǎohóng.", "Guru saya bermarga Liu, namanya Liu Xiaohong."],
      ["陈大卫是美国人，他的中文很好。", "Chén Dàwèi shì Měiguó rén, tā de Zhōngwén hěn hǎo.", "Chen Dawei orang Amerika, bahasa Mandarinnya bagus."],
      ["请慢慢说你的名字。", "Qǐng mànmàn shuō nǐ de míngzi.", "Tolong sebutkan namamu pelan-pelan."],
      ["他的名字很难写，但是很好听。", "Tā de míngzi hěn nán xiě, dànshì hěn hǎotīng.", "Namanya sulit ditulis, tetapi enak didengar."],
    ],
  ],
  // 19. Shadowing Mini Dialogue
  [
    [
      ["你呢", "nǐ ne", "bagaimana denganmu?"],
      ["我也是", "wǒ yě shì", "saya juga"],
      ["认识你很高兴", "rènshi nǐ hěn gāoxìng", "senang berkenalan denganmu"],
      ["好久不见", "hǎojiǔ bú jiàn", "lama tidak bertemu", ["Jawaban yang cocok untuk 好久不见 adalah...", "是啊，好久不见！", "不客气。", "我叫王明。", "再见。"]],
    ],
    [
      ["我是学生，你呢？", "Wǒ shì xuésheng, nǐ ne?", "Saya pelajar, kamu bagaimana?"],
      ["我也是学生。", "Wǒ yě shì xuésheng.", "Saya juga pelajar."],
      ["你是哪国人？", "Nǐ shì nǎ guó rén?", "Kamu orang mana (negara)?", ["Jawaban yang tepat untuk 你是哪国人？ adalah...", "我是印度尼西亚人。", "我二十岁。", "我叫安娜。", "我很好。"]],
      ["我是印度尼西亚人。", "Wǒ shì Yìndùníxīyà rén.", "Saya orang Indonesia."],
    ],
    [
      ["你好！我叫安娜，你叫什么名字？", "Nǐ hǎo! Wǒ jiào Ānnà, nǐ jiào shénme míngzi?", "Halo! Nama saya Anna, siapa namamu?"],
      ["我叫大卫，认识你很高兴。", "Wǒ jiào Dàwèi, rènshi nǐ hěn gāoxìng.", "Nama saya David, senang berkenalan denganmu."],
      ["我也很高兴，明天见！", "Wǒ yě hěn gāoxìng, míngtiān jiàn!", "Saya juga senang, sampai jumpa besok!"],
      ["你最近忙不忙？", "Nǐ zuìjìn máng bu máng?", "Akhir-akhir ini kamu sibuk tidak?"],
    ],
  ],
  // 20. HSK 1 Pronunciation Review
  [
    [
      ["中国", "Zhōngguó", "Tiongkok", ["Pola nada pada 中国 Zhōngguó adalah...", "1-2", "2-1", "1-4", "4-2"]],
      ["汉字", "Hànzì", "aksara Han (Hanzi)"],
      ["出租车", "chūzūchē", "taksi"],
      ["电脑", "diànnǎo", "komputer"],
    ],
    [
      ["我在中国学汉字。", "Wǒ zài Zhōngguó xué Hànzì.", "Saya belajar Hanzi di Tiongkok."],
      ["我们坐出租车吧。", "Wǒmen zuò chūzūchē ba.", "Ayo kita naik taksi."],
      ["你的电脑在桌子上。", "Nǐ de diànnǎo zài zhuōzi shang.", "Komputermu ada di atas meja."],
      ["我不是老师。", "Wǒ bú shì lǎoshī.", "Saya bukan guru.", ["不 sebelum nada 4 (seperti 是) dibaca...", "bú (nada 2)", "bù (nada 4)", "bū (nada 1)", "bǔ (nada 3)"]],
    ],
    [
      ["昨天下午我和朋友坐出租车去商店。", "Zuótiān xiàwǔ wǒ hé péngyou zuò chūzūchē qù shāngdiàn.", "Kemarin sore saya dan teman naik taksi ke toko."],
      ["这些汉字我都认识，但是不会写。", "Zhèxiē Hànzì wǒ dōu rènshi, dànshì bú huì xiě.", "Saya kenal semua Hanzi ini, tetapi tidak bisa menulisnya."],
      ["一个人在家的时候，我喜欢看电视。", "Yí ge rén zài jiā de shíhou, wǒ xǐhuan kàn diànshì.", "Saat sendirian di rumah, saya suka menonton TV."],
      ["请你再说一遍，好吗？", "Qǐng nǐ zài shuō yí biàn, hǎo ma?", "Tolong ulangi sekali lagi, ya?"],
    ],
  ],
];
