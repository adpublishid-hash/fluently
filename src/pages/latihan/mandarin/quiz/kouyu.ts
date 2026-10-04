import type { QuizTopic } from './types';

// Latihan Kǒuyǔ — one entry per topic (index = topic - 1): [Basic, Intermediate, Advanced].
export const kouyu: QuizTopic[] = [
  // 1. Greetings and Polite Responses
  [
    [
      ["你好吗", "nǐ hǎo ma", "apa kabar?"],
      ["我很好", "wǒ hěn hǎo", "saya baik-baik saja"],
      ["还可以", "hái kěyǐ", "lumayan", ["Temanmu bertanya 你好吗？ Jawaban yang wajar adalah...", "我很好，谢谢。", "不客气。", "没关系。", "再见。"]],
      ["好久不见", "hǎojiǔ bú jiàn", "lama tak jumpa"],
    ],
    [
      ["你好吗？我很好。", "Nǐ hǎo ma? Wǒ hěn hǎo.", "Apa kabar? Saya baik."],
      ["你呢？你最近好吗？", "Nǐ ne? Nǐ zuìjìn hǎo ma?", "Kamu bagaimana? Akhir-akhir ini baik?"],
      ["谢谢，你也好！", "Xièxie, nǐ yě hǎo!", "Terima kasih, kamu juga!"],
      ["慢走！", "Màn zǒu!", "Hati-hati di jalan!", ["Tuan rumah mengucapkan 慢走 kepada tamu saat...", "tamu pulang", "tamu datang", "makan", "minta maaf"]],
    ],
    [
      ["好久不见，你最近忙什么呢？", "Hǎojiǔ bú jiàn, nǐ zuìjìn máng shénme ne?", "Lama tak jumpa, akhir-akhir ini sibuk apa?"],
      ["我最近工作很忙，但是身体很好。", "Wǒ zuìjìn gōngzuò hěn máng, dànshì shēntǐ hěn hǎo.", "Akhir-akhir ini saya sibuk bekerja, tetapi sehat."],
      ["不好意思，打扰您了。", "Bù hǎoyìsi, dǎrǎo nín le.", "Maaf, saya mengganggu Anda.", ["Ungkapan sopan untuk 'maaf mengganggu' adalah...", "不好意思，打扰了。", "没关系。", "不客气。", "欢迎光临。"]],
      ["周末愉快，下星期见！", "Zhōumò yúkuài, xià xīngqī jiàn!", "Selamat berakhir pekan, sampai jumpa minggu depan!"],
    ],
  ],
  // 2. Self Introduction
  [
    [
      ["我叫", "wǒ jiào", "nama saya"],
      ["我是", "wǒ shì", "saya adalah"],
      ["我来自", "wǒ láizì", "saya berasal dari"],
      ["我学汉语", "wǒ xué Hànyǔ", "saya belajar bahasa Mandarin", ["Urutan perkenalan diri yang wajar adalah...", "salam → nama → asal", "asal → salam → pamit", "nama → pamit → salam", "pamit → nama → asal"]],
    ],
    [
      ["大家好，我叫丽莎。", "Dàjiā hǎo, wǒ jiào Lìshā.", "Halo semuanya, nama saya Lisa."],
      ["我来自印度尼西亚。", "Wǒ láizì Yìndùníxīyà.", "Saya berasal dari Indonesia."],
      ["我是大学生，学汉语。", "Wǒ shì dàxuéshēng, xué Hànyǔ.", "Saya mahasiswa, belajar bahasa Mandarin."],
      ["请多关照。", "Qǐng duō guānzhào.", "Mohon bimbingannya.", ["请多关照 biasanya diucapkan...", "di akhir perkenalan", "saat makan", "saat menolak ajakan", "saat menelepon"]],
    ],
    [
      ["大家好，我叫安迪，今年二十二岁。", "Dàjiā hǎo, wǒ jiào Āndí, jīnnián èrshí'èr suì.", "Halo semuanya, nama saya Andi, tahun ini 22 tahun."],
      ["我是泗水人，现在在雅加达工作。", "Wǒ shì Sìshuǐ rén, xiànzài zài Yǎjiādá gōngzuò.", "Saya orang Surabaya, sekarang bekerja di Jakarta."],
      ["我学了一年汉语，说得还不太好。", "Wǒ xué le yì nián Hànyǔ, shuō de hái bú tài hǎo.", "Saya sudah belajar Mandarin setahun, bicara saya belum terlalu bagus."],
      ["我的爱好是唱歌和做饭。", "Wǒ de àihào shì chàng gē hé zuò fàn.", "Hobi saya bernyanyi dan memasak."],
    ],
  ],
  // 3. Names, Nationality and Language
  [
    [
      ["汉语", "Hànyǔ", "bahasa Mandarin (Han)"],
      ["英语", "Yīngyǔ", "bahasa Inggris"],
      ["印尼语", "Yìnníyǔ", "bahasa Indonesia", ["Kata untuk 'bahasa Jepang' adalah...", "日语", "韩语", "英语", "法语"]],
      ["哪国人", "nǎ guó rén", "orang negara mana"],
    ],
    [
      ["你是哪国人？", "Nǐ shì nǎ guó rén?", "Kamu orang negara mana?"],
      ["你会说英语吗？", "Nǐ huì shuō Yīngyǔ ma?", "Kamu bisa berbahasa Inggris?"],
      ["我会说一点儿汉语。", "Wǒ huì shuō yìdiǎnr Hànyǔ.", "Saya bisa sedikit bahasa Mandarin.", ["Untuk merendah tentang kemampuan bahasamu, kamu bilang...", "我会说一点儿汉语。", "我汉语非常好。", "我不是汉语。", "汉语是我。"]],
      ["您贵姓？我姓陈。", "Nín guì xìng? Wǒ xìng Chén.", "Siapa marga Anda? Marga saya Chen."],
    ],
    [
      ["我是印尼人，我会说印尼语和英语。", "Wǒ shì Yìnní rén, wǒ huì shuō Yìnníyǔ hé Yīngyǔ.", "Saya orang Indonesia, saya bisa bahasa Indonesia dan Inggris."],
      ["你的汉语说得真好！哪里哪里。", "Nǐ de Hànyǔ shuō de zhēn hǎo! Nǎli nǎli.", "Bahasa Mandarinmu bagus sekali! Ah, biasa saja.", ["Respons rendah hati saat dipuji adalah...", "哪里哪里", "对对对", "谢谢你的钱", "不客气"]],
      ["这个字用汉语怎么说？", "Zhège zì yòng Hànyǔ zěnme shuō?", "Kata ini dalam bahasa Mandarin bagaimana mengucapkannya?"],
      ["我的中文名字是老师给我起的。", "Wǒ de Zhōngwén míngzi shì lǎoshī gěi wǒ qǐ de.", "Nama Mandarin saya diberikan oleh guru."],
    ],
  ],
  // 4. Family Conversations
  [
    [
      ["你家", "nǐ jiā", "keluargamu / rumahmu"],
      ["几口人", "jǐ kǒu rén", "berapa orang (anggota keluarga)"],
      ["独生子", "dúshēngzǐ", "anak tunggal (laki-laki)"],
      ["兄弟姐妹", "xiōngdì jiěmèi", "saudara kandung", ["Pertanyaan 'kamu punya saudara kandung?' adalah...", "你有兄弟姐妹吗？", "你家在哪儿？", "你几岁？", "你是哪国人？"]],
    ],
    [
      ["你家有几口人？", "Nǐ jiā yǒu jǐ kǒu rén?", "Keluargamu ada berapa orang?"],
      ["你有兄弟姐妹吗？", "Nǐ yǒu xiōngdì jiěmèi ma?", "Apakah kamu punya saudara kandung?"],
      ["我是独生女。", "Wǒ shì dúshēngnǚ.", "Saya anak tunggal (perempuan)."],
      ["你爸爸做什么工作？", "Nǐ bàba zuò shénme gōngzuò?", "Ayahmu bekerja sebagai apa?", ["Jawaban yang tepat untuk 你爸爸做什么工作？ adalah...", "他是工程师。", "他五十岁。", "他很高。", "他在家。"]],
    ],
    [
      ["我家有五口人：爸爸、妈妈、两个妹妹和我。", "Wǒ jiā yǒu wǔ kǒu rén: bàba, māma, liǎng ge mèimei hé wǒ.", "Keluarga saya lima orang: ayah, ibu, dua adik perempuan, dan saya."],
      ["我哥哥已经结婚了，住在别的城市。", "Wǒ gēge yǐjīng jiéhūn le, zhù zài bié de chéngshì.", "Kakak saya sudah menikah, tinggal di kota lain."],
      ["周末我们全家常常一起吃饭。", "Zhōumò wǒmen quán jiā chángcháng yìqǐ chī fàn.", "Akhir pekan seluruh keluarga kami sering makan bersama."],
      ["你长得很像你妈妈。", "Nǐ zhǎng de hěn xiàng nǐ māma.", "Wajahmu sangat mirip ibumu."],
    ],
  ],
  // 5. Classroom Speaking
  [
    [
      ["我不懂", "wǒ bù dǒng", "saya tidak mengerti"],
      ["我知道了", "wǒ zhīdào le", "saya sudah paham"],
      ["老师，我有问题", "lǎoshī, wǒ yǒu wèntí", "Guru, saya punya pertanyaan"],
      ["请慢一点儿", "qǐng màn yìdiǎnr", "tolong lebih pelan", ["Saat guru bicara terlalu cepat, kamu bilang...", "请慢一点儿说。", "请快一点儿说。", "我不想说。", "再见。"]],
    ],
    [
      ["老师，这个字怎么读？", "Lǎoshī, zhège zì zěnme dú?", "Guru, huruf ini dibaca bagaimana?"],
      ["对不起，我听不懂。", "Duìbuqǐ, wǒ tīng bu dǒng.", "Maaf, saya tidak paham (mendengar)."],
      ["我可以用一下你的笔吗？", "Wǒ kěyǐ yòng yíxià nǐ de bǐ ma?", "Bolehkah saya meminjam penamu sebentar?", ["Cara sopan meminta izin memakai barang adalah...", "我可以用一下……吗？", "给我！", "我要你的……", "你的……是我的。"]],
      ["老师，我做完了。", "Lǎoshī, wǒ zuò wán le.", "Guru, saya sudah selesai."],
    ],
    [
      ["老师，“认识”和“知道”有什么不一样？", "Lǎoshī, “rènshi” hé “zhīdào” yǒu shénme bù yíyàng?", "Guru, apa bedanya 'renshi' dan 'zhidao'?"],
      ["对不起，我今天忘了带作业。", "Duìbuqǐ, wǒ jīntiān wàng le dài zuòyè.", "Maaf, hari ini saya lupa membawa PR."],
      ["我们可以用汉语练习对话吗？", "Wǒmen kěyǐ yòng Hànyǔ liànxí duìhuà ma?", "Bolehkah kita berlatih percakapan dalam bahasa Mandarin?"],
      ["请问，明天的考试难不难？", "Qǐngwèn, míngtiān de kǎoshì nán bu nán?", "Permisi, ujian besok sulit tidak?"],
    ],
  ],
  // 6. Numbers, Age and Quantity
  [
    [
      ["多大", "duō dà", "berapa umur (dewasa)"],
      ["几岁", "jǐ suì", "berapa umur (anak)", ["Untuk menanyakan umur anak kecil, gunakan...", "你几岁？", "您多大年纪？", "你多少钱？", "你几点？"]],
      ["多大年纪", "duō dà niánjì", "berapa usia (orang tua)"],
      ["一点儿", "yìdiǎnr", "sedikit"],
    ],
    [
      ["你今年多大？", "Nǐ jīnnián duō dà?", "Tahun ini kamu umur berapa?"],
      ["小朋友，你几岁了？", "Xiǎopéngyou, nǐ jǐ suì le?", "Adik kecil, kamu umur berapa?"],
      ["您多大年纪了？", "Nín duō dà niánjì le?", "Berapa usia Bapak/Ibu?", ["您多大年纪了？ sopan dipakai untuk bertanya kepada...", "orang tua / lansia", "anak kecil", "teman sebaya", "hewan"]],
      ["我要三个包子。", "Wǒ yào sān ge bāozi.", "Saya mau tiga bakpao."],
    ],
    [
      ["我今年二十五岁，属狗。", "Wǒ jīnnián èrshíwǔ suì, shǔ gǒu.", "Tahun ini saya 25 tahun, shio anjing."],
      ["你的房间号是多少？", "Nǐ de fángjiān hào shì duōshao?", "Nomor kamarmu berapa?"],
      ["我们一共有八个人，要一张大桌子。", "Wǒmen yígòng yǒu bā ge rén, yào yì zhāng dà zhuōzi.", "Kami semuanya delapan orang, perlu satu meja besar."],
      ["你家离这儿有多远？", "Nǐ jiā lí zhèr yǒu duō yuǎn?", "Seberapa jauh rumahmu dari sini?"],
    ],
  ],
  // 7. Daily Routine
  [
    [
      ["吃早饭", "chī zǎofàn", "sarapan"],
      ["上班", "shàngbān", "berangkat kerja"],
      ["下课", "xiàkè", "selesai kelas"],
      ["刷牙", "shuā yá", "menggosok gigi", ["Urutan pagi yang wajar adalah...", "起床 → 刷牙 → 吃早饭", "吃早饭 → 起床 → 刷牙", "睡觉 → 起床 → 下班", "下班 → 起床 → 吃早饭"]],
    ],
    [
      ["我每天七点起床。", "Wǒ měitiān qī diǎn qǐchuáng.", "Setiap hari saya bangun pukul tujuh."],
      ["我八点去上班。", "Wǒ bā diǎn qù shàngbān.", "Saya berangkat kerja pukul delapan."],
      ["中午我在公司吃饭。", "Zhōngwǔ wǒ zài gōngsī chī fàn.", "Siang hari saya makan di kantor."],
      ["你一般几点睡觉？", "Nǐ yìbān jǐ diǎn shuìjiào?", "Biasanya kamu tidur jam berapa?", ["一般 dalam kalimat itu berarti...", "biasanya", "sekali", "sama", "setengah"]],
    ],
    [
      ["我起床以后先洗脸，然后吃早饭。", "Wǒ qǐchuáng yǐhòu xiān xǐ liǎn, ránhòu chī zǎofàn.", "Setelah bangun saya cuci muka dulu, lalu sarapan."],
      ["下班以后我去健身房锻炼一个小时。", "Xiàbān yǐhòu wǒ qù jiànshēnfáng duànliàn yí ge xiǎoshí.", "Setelah pulang kerja saya berolahraga di gym satu jam."],
      ["晚上我一边吃饭一边看新闻。", "Wǎnshang wǒ yìbiān chī fàn yìbiān kàn xīnwén.", "Malam hari saya makan sambil menonton berita."],
      ["周末我不用早起，可以睡懒觉。", "Zhōumò wǒ búyòng zǎo qǐ, kěyǐ shuì lǎnjiào.", "Akhir pekan saya tidak perlu bangun pagi, bisa tidur lebih lama."],
    ],
  ],
  // 8. Time and Appointments
  [
    [
      ["见面", "jiànmiàn", "bertemu"],
      ["几点见", "jǐ diǎn jiàn", "ketemu jam berapa"],
      ["约好", "yuē hǎo", "sudah janjian"],
      ["来得及", "láidejí", "masih sempat", ["Kalau kamu bilang 来不及了, artinya...", "sudah tidak sempat", "masih sempat", "sudah datang", "belum datang"]],
    ],
    [
      ["我们明天几点见？", "Wǒmen míngtiān jǐ diǎn jiàn?", "Besok kita ketemu jam berapa?"],
      ["下午两点怎么样？", "Xiàwǔ liǎng diǎn zěnmeyàng?", "Bagaimana kalau pukul dua siang?", ["... 怎么样？ di akhir kalimat dipakai untuk...", "mengusulkan sesuatu", "menolak", "meminta maaf", "bertanya harga"]],
      ["不见不散！", "Bú jiàn bú sàn!", "Sampai bertemu, saya pasti menunggu!"],
      ["我可能晚到十分钟。", "Wǒ kěnéng wǎn dào shí fēnzhōng.", "Saya mungkin terlambat sepuluh menit."],
    ],
    [
      ["星期五晚上七点在咖啡馆见，好吗？", "Xīngqīwǔ wǎnshang qī diǎn zài kāfēiguǎn jiàn, hǎo ma?", "Jumat malam pukul tujuh bertemu di kafe, ya?"],
      ["对不起，那天我有事，改到星期六吧。", "Duìbuqǐ, nà tiān wǒ yǒu shì, gǎi dào xīngqīliù ba.", "Maaf, hari itu saya ada urusan, ganti ke Sabtu saja."],
      ["我已经到了，你在哪儿？", "Wǒ yǐjīng dào le, nǐ zài nǎr?", "Saya sudah sampai, kamu di mana?"],
      ["路上堵车，你别着急，慢慢来。", "Lùshang dǔchē, nǐ bié zháojí, mànmàn lái.", "Jalanan macet, jangan buru-buru, pelan-pelan saja."],
    ],
  ],
  // 9. Shopping Dialogue
  [
    [
      ["试一下", "shì yíxià", "coba sebentar"],
      ["有没有大号", "yǒu méiyǒu dà hào", "ada ukuran besar?"],
      ["便宜点儿", "piányi diǎnr", "lebih murah sedikit"],
      ["我要这个", "wǒ yào zhège", "saya mau yang ini", ["Saat menawar harga, kamu bilang...", "能便宜点儿吗？", "太便宜了！", "我不要钱。", "你多大？"]],
    ],
    [
      ["这件衣服可以试一下吗？", "Zhè jiàn yīfu kěyǐ shì yíxià ma?", "Bolehkah saya mencoba baju ini?"],
      ["有没有小一点儿的？", "Yǒu méiyǒu xiǎo yìdiǎnr de?", "Ada yang lebih kecil?"],
      ["能便宜点儿吗？", "Néng piányi diǎnr ma?", "Bisa lebih murah?"],
      ["好，我买了。", "Hǎo, wǒ mǎi le.", "Baik, saya beli.", ["Penjual bilang 欢迎光临. Artinya...", "selamat datang", "terima kasih", "maaf", "barang habis"]],
    ],
    [
      ["这双鞋有点儿小，有大一号的吗？", "Zhè shuāng xié yǒudiǎnr xiǎo, yǒu dà yí hào de ma?", "Sepatu ini agak kecil, ada yang satu ukuran lebih besar?"],
      ["一百块太贵了，八十块行不行？", "Yìbǎi kuài tài guì le, bāshí kuài xíng bu xíng?", "Seratus yuan terlalu mahal, delapan puluh yuan boleh tidak?"],
      ["这个颜色我不太喜欢，有黑色的吗？", "Zhège yánsè wǒ bú tài xǐhuan, yǒu hēisè de ma?", "Saya kurang suka warna ini, ada yang hitam?"],
      ["可以刷卡吗？我没带现金。", "Kěyǐ shuākǎ ma? Wǒ méi dài xiànjīn.", "Bisa bayar pakai kartu? Saya tidak bawa uang tunai."],
    ],
  ],
  // 10. Restaurant Ordering
  [
    [
      ["点菜", "diǎn cài", "memesan makanan"],
      ["买单", "mǎidān", "minta bon / bayar"],
      ["打包", "dǎbāo", "dibungkus"],
      ["几位", "jǐ wèi", "berapa orang (sopan)", ["Pelayan bertanya 几位？ Jawaban yang tepat adalah...", "两位。", "两块。", "两点。", "两本。"]],
    ],
    [
      ["服务员，我们要点菜。", "Fúwùyuán, wǒmen yào diǎn cài.", "Pelayan, kami mau memesan."],
      ["来一个宫保鸡丁。", "Lái yí ge gōngbǎo jīdīng.", "Pesan satu ayam kung pao.", ["来 dalam 来一个宫保鸡丁 berarti...", "pesan / minta (diberikan)", "datang", "pergi", "membuat"]],
      ["请给我一双筷子。", "Qǐng gěi wǒ yì shuāng kuàizi.", "Tolong beri saya sepasang sumpit."],
      ["剩下的菜帮我打包。", "Shèngxià de cài bāng wǒ dǎbāo.", "Tolong bungkus sisa makanannya."],
    ],
    [
      ["你们这儿有什么特色菜？", "Nǐmen zhèr yǒu shénme tèsè cài?", "Di sini ada menu khas apa?"],
      ["我不吃猪肉，这个菜里有猪肉吗？", "Wǒ bù chī zhūròu, zhège cài li yǒu zhūròu ma?", "Saya tidak makan babi, apakah masakan ini ada babinya?"],
      ["菜还没上，请快一点儿，好吗？", "Cài hái méi shàng, qǐng kuài yìdiǎnr, hǎo ma?", "Makanannya belum datang, tolong lebih cepat ya?"],
      ["服务员，买单！可以用支付宝吗？", "Fúwùyuán, mǎidān! Kěyǐ yòng Zhīfùbǎo ma?", "Pelayan, minta bon! Bisa pakai Alipay?"],
    ],
  ],
  // 11. Directions and Places
  [
    [
      ["怎么走", "zěnme zǒu", "lewat mana / bagaimana ke sana"],
      ["往左拐", "wǎng zuǒ guǎi", "belok kiri"],
      ["往右拐", "wǎng yòu guǎi", "belok kanan"],
      ["十字路口", "shízì lùkǒu", "perempatan", ["Untuk menanyakan jalan ke stasiun, kamu bilang...", "请问，火车站怎么走？", "火车站多少钱？", "火车站几岁？", "火车站是谁？"]],
    ],
    [
      ["请问，地铁站怎么走？", "Qǐngwèn, dìtiězhàn zěnme zǒu?", "Permisi, ke stasiun kereta bawah tanah lewat mana?"],
      ["到了十字路口往右拐。", "Dào le shízì lùkǒu wǎng yòu guǎi.", "Sampai di perempatan belok kanan."],
      ["离这儿远吗？", "Lí zhèr yuǎn ma?", "Jauh dari sini?", ["离 dalam 离这儿远吗 menunjukkan...", "jarak dari suatu tempat", "waktu", "jumlah", "kepemilikan"]],
      ["就在前面，不远。", "Jiù zài qiánmiàn, bù yuǎn.", "Ada di depan, tidak jauh."],
    ],
    [
      ["你一直往前走，过两个红绿灯就到了。", "Nǐ yìzhí wǎng qián zǒu, guò liǎng ge hónglǜdēng jiù dào le.", "Jalan lurus terus, lewati dua lampu merah langsung sampai."],
      ["对不起，我也不是这儿的人。", "Duìbuqǐ, wǒ yě bú shì zhèr de rén.", "Maaf, saya juga bukan orang sini."],
      ["超市在银行对面，你看，就在那儿。", "Chāoshì zài yínháng duìmiàn, nǐ kàn, jiù zài nàr.", "Supermarket ada di seberang bank, lihat, di sana."],
      ["走路太远了，你最好坐公交车。", "Zǒulù tài yuǎn le, nǐ zuìhǎo zuò gōngjiāochē.", "Jalan kaki terlalu jauh, sebaiknya kamu naik bus."],
    ],
  ],
  // 12. Transport and Travel
  [
    [
      ["买票", "mǎi piào", "membeli tiket"],
      ["打车", "dǎchē", "naik taksi"],
      ["换车", "huàn chē", "ganti kendaraan / transit"],
      ["一张票", "yì zhāng piào", "selembar tiket", ["Kata ukur untuk tiket adalah...", "张", "本", "个", "只"]],
    ],
    [
      ["我要一张去上海的票。", "Wǒ yào yì zhāng qù Shànghǎi de piào.", "Saya mau satu tiket ke Shanghai."],
      ["师傅，去机场。", "Shīfu, qù jīchǎng.", "Pak, ke bandara.", ["Kepada sopir taksi di Tiongkok, kamu memanggil...", "师傅", "老师", "同学", "小姐"]],
      ["这辆车到天安门吗？", "Zhè liàng chē dào Tiān'ānmén ma?", "Apakah bus ini sampai ke Tiananmen?"],
      ["我们坐高铁去吧。", "Wǒmen zuò gāotiě qù ba.", "Ayo kita naik kereta cepat."],
    ],
    [
      ["师傅，到了前面的路口请停一下。", "Shīfu, dào le qiánmiàn de lùkǒu qǐng tíng yíxià.", "Pak, tolong berhenti di persimpangan depan."],
      ["从北京到上海坐高铁要四个多小时。", "Cóng Běijīng dào Shànghǎi zuò gāotiě yào sì ge duō xiǎoshí.", "Dari Beijing ke Shanghai naik kereta cepat butuh lebih dari empat jam."],
      ["这个假期我打算去西安旅游。", "Zhège jiàqī wǒ dǎsuàn qù Xī'ān lǚyóu.", "Liburan ini saya berencana berwisata ke Xi'an."],
      ["我想买一张明天上午的往返票。", "Wǒ xiǎng mǎi yì zhāng míngtiān shàngwǔ de wǎngfǎn piào.", "Saya ingin membeli tiket pulang-pergi untuk besok pagi."],
    ],
  ],
  // 13. Hobbies and Preferences
  [
    [
      ["我喜欢", "wǒ xǐhuan", "saya suka"],
      ["我不喜欢", "wǒ bù xǐhuan", "saya tidak suka"],
      ["一般般", "yìbānbān", "biasa saja"],
      ["有兴趣", "yǒu xìngqù", "tertarik", ["Kalau kamu biasa-biasa saja terhadap sesuatu, kamu bilang...", "一般般。", "非常喜欢！", "太好了！", "我最喜欢。"]],
    ],
    [
      ["你喜欢做什么？", "Nǐ xǐhuan zuò shénme?", "Kamu suka melakukan apa?"],
      ["我很喜欢打羽毛球。", "Wǒ hěn xǐhuan dǎ yǔmáoqiú.", "Saya sangat suka bermain bulu tangkis."],
      ["我对画画儿没有兴趣。", "Wǒ duì huà huàr méiyǒu xìngqù.", "Saya tidak tertarik menggambar."],
      ["你也喜欢吗？", "Nǐ yě xǐhuan ma?", "Kamu juga suka?", ["Kalau teman bertanya 你也喜欢吗？ dan kamu juga suka, jawab...", "对，我也喜欢！", "不客气。", "没关系。", "我不知道你。"]],
    ],
    [
      ["比起看电影，我更喜欢看书。", "Bǐqǐ kàn diànyǐng, wǒ gèng xǐhuan kàn shū.", "Dibanding menonton film, saya lebih suka membaca."],
      ["我周末一般去爬山或者游泳。", "Wǒ zhōumò yìbān qù pá shān huòzhě yóuyǒng.", "Akhir pekan biasanya saya mendaki atau berenang."],
      ["我从小就喜欢唱歌。", "Wǒ cóng xiǎo jiù xǐhuan chàng gē.", "Sejak kecil saya sudah suka bernyanyi."],
      ["你有空的时候喜欢干什么？", "Nǐ yǒu kòng de shíhou xǐhuan gàn shénme?", "Saat senggang kamu suka melakukan apa?"],
    ],
  ],
  // 14. Weather and Plans
  [
    [
      ["天气预报", "tiānqì yùbào", "prakiraan cuaca"],
      ["带伞", "dài sǎn", "membawa payung"],
      ["打算", "dǎsuàn", "berencana"],
      ["真热", "zhēn rè", "panas sekali", ["Kalau ramalan bilang akan hujan, saran yang cocok adalah...", "别忘了带伞。", "多穿短裤。", "去游泳吧。", "别喝水。"]],
    ],
    [
      ["今天真热啊！", "Jīntiān zhēn rè a!", "Hari ini panas sekali!"],
      ["明天会下雨吗？", "Míngtiān huì xià yǔ ma?", "Apakah besok akan hujan?", ["会 dalam 明天会下雨吗 berarti...", "akan (kemungkinan)", "bisa (keterampilan)", "rapat", "boleh"]],
      ["你周末打算做什么？", "Nǐ zhōumò dǎsuàn zuò shénme?", "Akhir pekan kamu berencana apa?"],
      ["出门别忘了带伞。", "Chūmén bié wàng le dài sǎn.", "Jangan lupa bawa payung saat keluar."],
    ],
    [
      ["天气预报说明天有大雨，我们改天去吧。", "Tiānqì yùbào shuō míngtiān yǒu dà yǔ, wǒmen gǎitiān qù ba.", "Prakiraan cuaca bilang besok hujan deras, kita pergi lain hari saja."],
      ["要是天气好，我们就去海边玩儿。", "Yàoshi tiānqì hǎo, wǒmen jiù qù hǎibiān wánr.", "Kalau cuacanya bagus, kita main ke pantai."],
      ["这几天越来越冷了，你小心感冒。", "Zhè jǐ tiān yuè lái yuè lěng le, nǐ xiǎoxīn gǎnmào.", "Beberapa hari ini semakin dingin, hati-hati jangan sampai flu."],
      ["我打算寒假回老家过年。", "Wǒ dǎsuàn hánjià huí lǎojiā guònián.", "Saya berencana pulang kampung merayakan Tahun Baru saat libur musim dingin."],
    ],
  ],
  // 15. Phone Conversation
  [
    [
      ["喂", "wéi", "halo (di telepon)", ["Kata pembuka saat mengangkat telepon adalah...", "喂", "再见", "谢谢", "对不起"]],
      ["打电话", "dǎ diànhuà", "menelepon"],
      ["留言", "liúyán", "meninggalkan pesan"],
      ["打错了", "dǎ cuò le", "salah sambung"],
    ],
    [
      ["喂，您好，请问王老师在吗？", "Wéi, nín hǎo, qǐngwèn Wáng lǎoshī zài ma?", "Halo, permisi, apakah Guru Wang ada?"],
      ["他不在，你要留言吗？", "Tā bú zài, nǐ yào liúyán ma?", "Dia tidak ada, kamu mau meninggalkan pesan?"],
      ["对不起，您打错了。", "Duìbuqǐ, nín dǎ cuò le.", "Maaf, Anda salah sambung."],
      ["请他给我回个电话。", "Qǐng tā gěi wǒ huí ge diànhuà.", "Tolong minta dia menelepon saya balik.", ["回电话 berarti...", "menelepon balik", "menutup telepon", "salah sambung", "mengangkat telepon"]],
    ],
    [
      ["喂，我是小李，我现在说话方便吗？", "Wéi, wǒ shì Xiǎo Lǐ, wǒ xiànzài shuōhuà fāngbiàn ma?", "Halo, ini Xiao Li, apakah sekarang waktunya tepat untuk bicara?"],
      ["我听不清楚，你能大声一点儿吗？", "Wǒ tīng bu qīngchu, nǐ néng dàshēng yìdiǎnr ma?", "Saya tidak dengar jelas, bisa lebih keras?"],
      ["我的手机快没电了，我们晚上再聊吧。", "Wǒ de shǒujī kuài méi diàn le, wǒmen wǎnshang zài liáo ba.", "Baterai ponsel saya hampir habis, kita lanjut ngobrol malam saja."],
      ["麻烦你告诉他，明天的会改到十点。", "Máfan nǐ gàosu tā, míngtiān de huì gǎi dào shí diǎn.", "Tolong beri tahu dia, rapat besok diubah ke pukul sepuluh."],
    ],
  ],
  // 16. Health and Doctor
  [
    [
      ["哪儿不舒服", "nǎr bù shūfu", "bagian mana yang tidak enak"],
      ["看病", "kànbìng", "berobat"],
      ["吃药", "chī yào", "minum obat"],
      ["好多了", "hǎo duō le", "sudah jauh lebih baik", ["Dokter bertanya 你哪儿不舒服？ Jawaban yang cocok adalah...", "我头疼。", "我很高兴。", "我不饿。", "我是医生。"]],
    ],
    [
      ["你哪儿不舒服？", "Nǐ nǎr bù shūfu?", "Bagian mana yang sakit?"],
      ["我肚子疼，不想吃东西。", "Wǒ dùzi téng, bù xiǎng chī dōngxi.", "Perut saya sakit, tidak ingin makan."],
      ["先量一下体温。", "Xiān liáng yíxià tǐwēn.", "Ukur suhu badan dulu."],
      ["你好点儿了吗？", "Nǐ hǎo diǎnr le ma?", "Kamu sudah agak baikan?", ["Kalau sudah sehat kembali, kamu menjawab...", "我好多了，谢谢。", "我病了。", "我头疼。", "我要去医院。"]],
    ],
    [
      ["医生，我咳嗽了好几天了，晚上睡不好。", "Yīshēng, wǒ késou le hǎo jǐ tiān le, wǎnshang shuì bu hǎo.", "Dokter, saya sudah batuk beberapa hari, malam tidak bisa tidur nyenyak."],
      ["你感冒了，我给你开点儿药。", "Nǐ gǎnmào le, wǒ gěi nǐ kāi diǎnr yào.", "Kamu flu, saya resepkan sedikit obat."],
      ["这几天别吃辣的，多喝热水。", "Zhè jǐ tiān bié chī là de, duō hē rè shuǐ.", "Beberapa hari ini jangan makan pedas, banyak minum air hangat."],
      ["我想请两天假，在家休息。", "Wǒ xiǎng qǐng liǎng tiān jià, zài jiā xiūxi.", "Saya ingin izin dua hari untuk istirahat di rumah."],
    ],
  ],
  // 17. Invitations and Responses
  [
    [
      ["一起吧", "yìqǐ ba", "bareng yuk"],
      ["没问题", "méi wèntí", "tidak masalah"],
      ["下次吧", "xià cì ba", "lain kali saja"],
      ["改天", "gǎitiān", "lain hari", ["Cara sopan menolak ajakan adalah...", "不好意思，我有事，下次吧。", "我不要你。", "不客气。", "没关系，再见。"]],
    ],
    [
      ["我们一起去吃饭吧。", "Wǒmen yìqǐ qù chī fàn ba.", "Ayo kita makan bersama."],
      ["好啊，没问题！", "Hǎo a, méi wèntí!", "Boleh, tidak masalah!"],
      ["不好意思，今天我有事。", "Bù hǎoyìsi, jīntiān wǒ yǒu shì.", "Maaf, hari ini saya ada urusan."],
      ["那我们下次再约吧。", "Nà wǒmen xià cì zài yuē ba.", "Kalau begitu lain kali kita janjian lagi.", ["那 di awal kalimat itu berarti...", "kalau begitu", "itu (benda)", "di sana", "mana"]],
    ],
    [
      ["这个周末我家有个聚会，你能来吗？", "Zhège zhōumò wǒ jiā yǒu ge jùhuì, nǐ néng lái ma?", "Akhir pekan ini ada pesta di rumah saya, kamu bisa datang?"],
      ["谢谢你的邀请，我一定准时到。", "Xièxie nǐ de yāoqǐng, wǒ yídìng zhǔnshí dào.", "Terima kasih atas undanganmu, saya pasti datang tepat waktu."],
      ["我很想去，可是那天要加班。", "Wǒ hěn xiǎng qù, kěshì nà tiān yào jiābān.", "Saya sangat ingin datang, tapi hari itu harus lembur."],
      ["你想几点来都可以，我们等你。", "Nǐ xiǎng jǐ diǎn lái dōu kěyǐ, wǒmen děng nǐ.", "Kamu mau datang jam berapa pun boleh, kami tunggu."],
    ],
  ],
  // 18. Making Requests
  [
    [
      ["帮个忙", "bāng ge máng", "tolong bantu"],
      ["麻烦你", "máfan nǐ", "maaf merepotkan"],
      ["可以吗", "kěyǐ ma", "boleh?"],
      ["能不能", "néng bu néng", "bisa atau tidak", ["Cara paling sopan meminta bantuan adalah...", "麻烦你帮我一下，可以吗？", "帮我！", "你帮我。", "我要帮。"]],
    ],
    [
      ["你能帮我一个忙吗？", "Nǐ néng bāng wǒ yí ge máng ma?", "Bisakah kamu membantu saya?"],
      ["麻烦你帮我拍张照片。", "Máfan nǐ bāng wǒ pāi zhāng zhàopiàn.", "Maaf merepotkan, tolong fotokan saya."],
      ["我可以坐这儿吗？", "Wǒ kěyǐ zuò zhèr ma?", "Boleh saya duduk di sini?", ["Respons yang mengizinkan adalah...", "可以，请坐。", "不客气。", "没有。", "对不起，我不知道。"]],
      ["你说的我没听懂，能再说一遍吗？", "Nǐ shuō de wǒ méi tīng dǒng, néng zài shuō yí biàn ma?", "Saya tidak paham yang kamu katakan, bisa ulangi?"],
    ],
    [
      ["能不能把空调开小一点儿？有点儿冷。", "Néng bu néng bǎ kōngtiáo kāi xiǎo yìdiǎnr? Yǒudiǎnr lěng.", "Bisa AC-nya dikecilkan? Agak dingin."],
      ["我的行李太重了，你能帮我拿一下吗？", "Wǒ de xíngli tài zhòng le, nǐ néng bāng wǒ ná yíxià ma?", "Koper saya terlalu berat, bisa bantu bawakan?"],
      ["请问，我可以借用一下你的充电器吗？", "Qǐngwèn, wǒ kěyǐ jièyòng yíxià nǐ de chōngdiànqì ma?", "Permisi, bolehkah saya pinjam pengisi dayamu sebentar?"],
      ["“请假”是什么意思？你能解释一下吗？", "“Qǐngjià” shì shénme yìsi? Nǐ néng jiěshì yíxià ma?", "Apa arti 'qingjia'? Bisa kamu jelaskan?"],
    ],
  ],
  // 19. Mini Storytelling
  [
    [
      ["先", "xiān", "pertama-tama"],
      ["然后", "ránhòu", "kemudian"],
      ["最后", "zuìhòu", "akhirnya / terakhir"],
      ["那天", "nà tiān", "hari itu", ["Urutan penghubung cerita yang benar adalah...", "先 → 然后 → 最后", "最后 → 先 → 然后", "然后 → 最后 → 先", "先 → 最后 → 然后"]],
    ],
    [
      ["昨天我先去了超市。", "Zuótiān wǒ xiān qù le chāoshì.", "Kemarin saya pertama-tama pergi ke supermarket."],
      ["然后我回家做饭。", "Ránhòu wǒ huí jiā zuò fàn.", "Kemudian saya pulang dan memasak."],
      ["最后我们一起看了电影。", "Zuìhòu wǒmen yìqǐ kàn le diànyǐng.", "Akhirnya kami menonton film bersama.", ["了 setelah kata kerja (看了) menunjukkan...", "tindakan sudah selesai", "tindakan akan datang", "larangan", "pertanyaan"]],
      ["那天我特别高兴。", "Nà tiān wǒ tèbié gāoxìng.", "Hari itu saya sangat senang."],
    ],
    [
      ["上个周末我和朋友去了动物园。", "Shàng ge zhōumò wǒ hé péngyou qù le dòngwùyuán.", "Akhir pekan lalu saya dan teman pergi ke kebun binatang."],
      ["我们先看了熊猫，然后去吃了午饭。", "Wǒmen xiān kàn le xióngmāo, ránhòu qù chī le wǔfàn.", "Kami melihat panda dulu, lalu pergi makan siang."],
      ["下午突然下雨了，我们只好坐车回家。", "Xiàwǔ tūrán xià yǔ le, wǒmen zhǐhǎo zuò chē huí jiā.", "Sore hari tiba-tiba hujan, kami terpaksa pulang naik mobil."],
      ["虽然有点儿累，但是那天过得很开心。", "Suīrán yǒudiǎnr lèi, dànshì nà tiān guò de hěn kāixīn.", "Meskipun agak lelah, hari itu sangat menyenangkan."],
    ],
  ],
  // 20. HSK 1 Speaking Review
  [
    [
      ["认识一下", "rènshi yíxià", "mari berkenalan"],
      ["我住在", "wǒ zhù zài", "saya tinggal di"],
      ["有时候", "yǒu shíhou", "kadang-kadang"],
      ["明天见", "míngtiān jiàn", "sampai jumpa besok", ["Ungkapan untuk mengakhiri percakapan adalah...", "那我们明天见！", "你好，认识一下。", "你叫什么？", "请问。"]],
    ],
    [
      ["我们认识一下吧，我叫丁丁。", "Wǒmen rènshi yíxià ba, wǒ jiào Dīngding.", "Mari berkenalan, nama saya Dingding."],
      ["我住在学校附近。", "Wǒ zhù zài xuéxiào fùjìn.", "Saya tinggal di dekat sekolah."],
      ["我有时候坐公交车，有时候骑车。", "Wǒ yǒu shíhou zuò gōngjiāochē, yǒu shíhou qí chē.", "Kadang-kadang saya naik bus, kadang-kadang naik sepeda."],
      ["我家有爸爸、妈妈和一只小狗。", "Wǒ jiā yǒu bàba, māma hé yì zhī xiǎogǒu.", "Di rumah ada ayah, ibu, dan seekor anak anjing.", ["Kata ukur untuk hewan kecil seperti anjing adalah...", "只", "个", "本", "张"]],
    ],
    [
      ["我叫马丁，是从印尼来的留学生。", "Wǒ jiào Mǎdīng, shì cóng Yìnní lái de liúxuéshēng.", "Nama saya Martin, mahasiswa asing dari Indonesia."],
      ["我每天上午上课，下午去图书馆。", "Wǒ měitiān shàngwǔ shàngkè, xiàwǔ qù túshūguǎn.", "Setiap hari saya kuliah pagi, sore ke perpustakaan."],
      ["这个星期天我想请朋友们来我家吃饭。", "Zhège xīngqītiān wǒ xiǎng qǐng péngyoumen lái wǒ jiā chī fàn.", "Minggu ini saya ingin mengundang teman-teman makan di rumah."],
      ["学汉语很有意思，我想去中国看看。", "Xué Hànyǔ hěn yǒu yìsi, wǒ xiǎng qù Zhōngguó kànkan.", "Belajar Mandarin sangat menarik, saya ingin melihat Tiongkok."],
    ],
  ],
];
