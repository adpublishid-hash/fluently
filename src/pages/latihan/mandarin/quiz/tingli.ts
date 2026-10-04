import type { QuizTopic } from './types';

// Latihan Tīnglì — one entry per topic (index = topic - 1): [Basic, Intermediate, Advanced].
export const tingli: QuizTopic[] = [
  // 1. Greetings and Names
  [
    [
      ["早上好", "zǎoshang hǎo", "selamat pagi"],
      ["您贵姓", "nín guì xìng", "siapa marga Anda (sopan)"],
      ["认识你", "rènshi nǐ", "berkenalan denganmu"],
      ["欢迎", "huānyíng", "selamat datang", ["Kamu mendengar \"huānyíng\". Situasi yang paling cocok adalah...", "menyambut tamu", "berpamitan", "meminta maaf", "menanyakan harga"]],
    ],
    [
      ["你好，我叫马克。", "Nǐ hǎo, wǒ jiào Mǎkè.", "Halo, nama saya Mark."],
      ["我姓林，叫林小雨。", "Wǒ xìng Lín, jiào Lín Xiǎoyǔ.", "Marga saya Lin, nama saya Lin Xiaoyu.", ["Kamu mendengar \"Wǒ xìng Lín, jiào Lín Xiǎoyǔ.\" Marga pembicara adalah...", "Lin", "Xiaoyu", "Wang", "Li"]],
      ["很高兴认识你。", "Hěn gāoxìng rènshi nǐ.", "Senang berkenalan denganmu."],
      ["老师好！", "Lǎoshī hǎo!", "Selamat pagi/siang, Guru!"],
    ],
    [
      ["你好，我是新同学，我叫阿里。", "Nǐ hǎo, wǒ shì xīn tóngxué, wǒ jiào Ālǐ.", "Halo, saya teman sekelas baru, nama saya Ali."],
      ["这位是王老师，那位是张老师。", "Zhè wèi shì Wáng lǎoshī, nà wèi shì Zhāng lǎoshī.", "Ini Guru Wang, itu Guru Zhang."],
      ["我的英文名字叫杰克，中文名字叫李杰。", "Wǒ de Yīngwén míngzi jiào Jiékè, Zhōngwén míngzi jiào Lǐ Jié.", "Nama Inggris saya Jack, nama Mandarin saya Li Jie.", ["Dari audio tersebut, nama Mandarin pembicara adalah...", "Li Jie", "Jack", "Jieke", "Li Ke"]],
      ["晚上好，欢迎大家来我家。", "Wǎnshang hǎo, huānyíng dàjiā lái wǒ jiā.", "Selamat malam, selamat datang semuanya di rumah saya."],
    ],
  ],
  // 2. Classroom Instructions
  [
    [
      ["请听", "qǐng tīng", "silakan dengarkan"],
      ["请读", "qǐng dú", "silakan baca"],
      ["请跟我说", "qǐng gēn wǒ shuō", "silakan ikuti saya"],
      ["打开书", "dǎkāi shū", "buka buku", ["Kamu mendengar \"hé shang shū\". Artinya...", "tutup buku", "buka buku", "baca buku", "beli buku"]],
    ],
    [
      ["请大家听录音。", "Qǐng dàjiā tīng lùyīn.", "Semuanya, silakan dengarkan rekaman."],
      ["请把书合上。", "Qǐng bǎ shū hé shang.", "Tolong tutup bukunya."],
      ["请看第五页。", "Qǐng kàn dì wǔ yè.", "Silakan lihat halaman lima.", ["Kamu mendengar \"Qǐng kàn dì wǔ yè.\" Halaman yang diminta adalah...", "5", "4", "15", "50"]],
      ["请再读一遍。", "Qǐng zài dú yí biàn.", "Silakan baca sekali lagi."],
    ],
    [
      ["先听两遍，然后回答问题。", "Xiān tīng liǎng biàn, ránhòu huídá wèntí.", "Dengarkan dua kali dulu, lalu jawab pertanyaan."],
      ["请把生词写在本子上。", "Qǐng bǎ shēngcí xiě zài běnzi shang.", "Tolong tulis kosakata baru di buku catatan."],
      ["有问题的同学请举手。", "Yǒu wèntí de tóngxué qǐng jǔ shǒu.", "Murid yang punya pertanyaan silakan angkat tangan."],
      ["今天的作业是第三课的练习。", "Jīntiān de zuòyè shì dì sān kè de liànxí.", "PR hari ini adalah latihan pelajaran tiga.", ["Dari audio itu, PR hari ini adalah latihan pelajaran...", "ketiga", "kedua", "kelima", "kesepuluh"]],
    ],
  ],
  // 3. Numbers and Age
  [
    [
      ["十五", "shíwǔ", "lima belas"],
      ["五十", "wǔshí", "lima puluh", ["Kamu mendengar \"wǔshí\". Angkanya adalah...", "50", "15", "5", "500"]],
      ["四十四", "sìshísì", "empat puluh empat"],
      ["一百", "yìbǎi", "seratus"],
    ],
    [
      ["我今年十九岁。", "Wǒ jīnnián shíjiǔ suì.", "Tahun ini saya sembilan belas tahun."],
      ["我奶奶六十八岁。", "Wǒ nǎinai liùshíbā suì.", "Nenek saya enam puluh delapan tahun."],
      ["我们班有三十个人。", "Wǒmen bān yǒu sānshí ge rén.", "Kelas kami ada tiga puluh orang."],
      ["他的孩子两岁了。", "Tā de háizi liǎng suì le.", "Anaknya sudah dua tahun.", ["Kamu mendengar \"Tā de háizi liǎng suì le.\" Umur anaknya adalah...", "2 tahun", "10 tahun", "12 tahun", "20 tahun"]],
    ],
    [
      ["我哥哥二十七岁，我姐姐二十四岁。", "Wǒ gēge èrshíqī suì, wǒ jiějie èrshísì suì.", "Kakak laki-laki saya 27 tahun, kakak perempuan saya 24 tahun.", ["Dari audio itu, umur kakak perempuan adalah...", "24", "27", "14", "42"]],
      ["这个学校有一千多个学生。", "Zhège xuéxiào yǒu yìqiān duō ge xuésheng.", "Sekolah ini punya lebih dari seribu murid."],
      ["我爸爸比我妈妈大三岁。", "Wǒ bàba bǐ wǒ māma dà sān suì.", "Ayah saya tiga tahun lebih tua dari ibu saya."],
      ["今天来了十一个客人。", "Jīntiān lái le shíyī ge kèrén.", "Hari ini datang sebelas tamu."],
    ],
  ],
  // 4. Family Introductions
  [
    [
      ["我爷爷", "wǒ yéye", "kakek saya (dari ayah)"],
      ["我奶奶", "wǒ nǎinai", "nenek saya (dari ayah)"],
      ["我弟弟", "wǒ dìdi", "adik laki-laki saya"],
      ["我妹妹", "wǒ mèimei", "adik perempuan saya", ["Kamu mendengar \"wǒ mèimei\". Yang dimaksud adalah...", "adik perempuan", "kakak perempuan", "adik laki-laki", "ibu"]],
    ],
    [
      ["这是我爸爸。", "Zhè shì wǒ bàba.", "Ini ayah saya."],
      ["我有两个姐姐。", "Wǒ yǒu liǎng ge jiějie.", "Saya punya dua kakak perempuan."],
      ["我弟弟是小学生。", "Wǒ dìdi shì xiǎoxuéshēng.", "Adik laki-laki saya murid SD."],
      ["我家有三口人。", "Wǒ jiā yǒu sān kǒu rén.", "Keluarga saya ada tiga orang.", ["Kamu mendengar \"Wǒ jiā yǒu sān kǒu rén.\" Jumlah anggota keluarganya...", "tiga orang", "empat orang", "dua orang", "tiga puluh orang"]],
    ],
    [
      ["我家有爸爸、妈妈、哥哥和我。", "Wǒ jiā yǒu bàba, māma, gēge hé wǒ.", "Di keluarga saya ada ayah, ibu, kakak laki-laki, dan saya.", ["Dari audio itu, keluarganya berjumlah...", "empat orang", "tiga orang", "lima orang", "dua orang"]],
      ["我妈妈是护士，她在医院工作。", "Wǒ māma shì hùshi, tā zài yīyuàn gōngzuò.", "Ibu saya perawat, dia bekerja di rumah sakit."],
      ["我姐姐结婚了，她有一个儿子。", "Wǒ jiějie jiéhūn le, tā yǒu yí ge érzi.", "Kakak perempuan saya sudah menikah, dia punya seorang putra."],
      ["我爷爷奶奶住在农村。", "Wǒ yéye nǎinai zhù zài nóngcūn.", "Kakek dan nenek saya tinggal di desa."],
    ],
  ],
  // 5. Time and Daily Schedule
  [
    [
      ["八点", "bā diǎn", "pukul delapan"],
      ["七点半", "qī diǎn bàn", "pukul setengah delapan", ["Kamu mendengar \"qī diǎn bàn\". Jamnya adalah...", "07.30", "08.30", "07.15", "06.30"]],
      ["十二点", "shí'èr diǎn", "pukul dua belas"],
      ["差五分九点", "chà wǔ fēn jiǔ diǎn", "pukul sembilan kurang lima"],
    ],
    [
      ["我八点上课。", "Wǒ bā diǎn shàngkè.", "Saya masuk kelas pukul delapan."],
      ["他中午十二点吃饭。", "Tā zhōngwǔ shí'èr diǎn chī fàn.", "Dia makan pukul dua belas siang."],
      ["我们五点下课。", "Wǒmen wǔ diǎn xiàkè.", "Kami pulang kelas pukul lima."],
      ["我晚上十点半睡觉。", "Wǒ wǎnshang shí diǎn bàn shuìjiào.", "Saya tidur pukul setengah sebelas malam.", ["Dari audio itu, ia tidur pukul...", "22.30", "10.00", "21.30", "23.30"]],
    ],
    [
      ["我早上六点起床，七点吃早饭。", "Wǒ zǎoshang liù diǎn qǐchuáng, qī diǎn chī zǎofàn.", "Saya bangun pukul enam pagi, sarapan pukul tujuh.", ["Dari audio itu, ia sarapan pukul...", "7", "6", "8", "9"]],
      ["下午两点到四点我在图书馆学习。", "Xiàwǔ liǎng diǎn dào sì diǎn wǒ zài túshūguǎn xuéxí.", "Pukul dua sampai empat sore saya belajar di perpustakaan."],
      ["电影七点开始，九点结束。", "Diànyǐng qī diǎn kāishǐ, jiǔ diǎn jiéshù.", "Film dimulai pukul tujuh dan selesai pukul sembilan."],
      ["星期六我不上班，在家休息。", "Xīngqīliù wǒ bú shàngbān, zài jiā xiūxi.", "Hari Sabtu saya tidak bekerja, beristirahat di rumah."],
    ],
  ],
  // 6. Places and Directions
  [
    [
      ["前面", "qiánmiàn", "depan"],
      ["后面", "hòumiàn", "belakang"],
      ["左边", "zuǒbian", "sebelah kiri", ["Kamu mendengar \"yòubian\". Artinya...", "sebelah kanan", "sebelah kiri", "depan", "belakang"]],
      ["旁边", "pángbiān", "samping"],
    ],
    [
      ["银行在前面。", "Yínháng zài qiánmiàn.", "Bank ada di depan."],
      ["厕所在右边。", "Cèsuǒ zài yòubian.", "Toilet ada di sebelah kanan."],
      ["超市在学校旁边。", "Chāoshì zài xuéxiào pángbiān.", "Supermarket ada di samping sekolah."],
      ["一直往前走。", "Yìzhí wǎng qián zǒu.", "Jalan lurus terus ke depan.", ["Kamu mendengar \"Yìzhí wǎng qián zǒu.\" Kamu harus...", "jalan lurus", "belok kiri", "belok kanan", "putar balik"]],
    ],
    [
      ["往前走两百米，然后往左拐。", "Wǎng qián zǒu liǎngbǎi mǐ, ránhòu wǎng zuǒ guǎi.", "Jalan ke depan dua ratus meter, lalu belok kiri.", ["Dari audio itu, setelah berjalan lurus kamu harus...", "belok kiri", "belok kanan", "berhenti", "naik bus"]],
      ["医院在银行和邮局中间。", "Yīyuàn zài yínháng hé yóujú zhōngjiān.", "Rumah sakit ada di antara bank dan kantor pos."],
      ["地铁站就在公园对面。", "Dìtiězhàn jiù zài gōngyuán duìmiàn.", "Stasiun kereta bawah tanah ada tepat di seberang taman."],
      ["我家离学校不远，走路十分钟。", "Wǒ jiā lí xuéxiào bù yuǎn, zǒulù shí fēnzhōng.", "Rumah saya tidak jauh dari sekolah, sepuluh menit jalan kaki."],
    ],
  ],
  // 7. Food and Drink Orders
  [
    [
      ["菜单", "càidān", "menu"],
      ["服务员", "fúwùyuán", "pelayan"],
      ["一碗饭", "yì wǎn fàn", "semangkuk nasi"],
      ["一杯茶", "yì bēi chá", "secangkir teh", ["Kamu mendengar \"liǎng bēi kāfēi\". Pesanannya adalah...", "dua cangkir kopi", "satu cangkir kopi", "dua cangkir teh", "dua botol air"]],
    ],
    [
      ["服务员，请给我菜单。", "Fúwùyuán, qǐng gěi wǒ càidān.", "Pelayan, tolong berikan saya menu."],
      ["我要一碗牛肉面。", "Wǒ yào yì wǎn niúròu miàn.", "Saya mau semangkuk mi daging sapi."],
      ["我们要两杯咖啡。", "Wǒmen yào liǎng bēi kāfēi.", "Kami mau dua cangkir kopi."],
      ["不要放辣椒。", "Búyào fàng làjiāo.", "Jangan pakai cabai.", ["Kamu mendengar \"Búyào fàng làjiāo.\" Pelanggan itu...", "tidak mau pedas", "mau lebih pedas", "mau tambah garam", "mau minuman dingin"]],
    ],
    [
      ["我要一个鸡蛋炒饭和一瓶水。", "Wǒ yào yí ge jīdàn chǎofàn hé yì píng shuǐ.", "Saya mau satu nasi goreng telur dan sebotol air.", ["Dari audio itu, minuman yang dipesan adalah...", "sebotol air", "secangkir teh", "segelas susu", "secangkir kopi"]],
      ["这个菜太辣了，我吃不了。", "Zhège cài tài là le, wǒ chī bu liǎo.", "Masakan ini terlalu pedas, saya tidak sanggup makan."],
      ["服务员，买单！一共多少钱？", "Fúwùyuán, mǎidān! Yígòng duōshao qián?", "Pelayan, minta bon! Totalnya berapa?"],
      ["你们这儿有什么好吃的菜？", "Nǐmen zhèr yǒu shénme hǎochī de cài?", "Di sini ada masakan apa yang enak?"],
    ],
  ],
  // 8. Shopping and Prices
  [
    [
      ["十块", "shí kuài", "sepuluh yuan"],
      ["八毛", "bā máo", "delapan puluh sen (0,8 yuan)"],
      ["多少钱", "duōshao qián", "berapa harganya"],
      ["打折", "dǎzhé", "diskon", ["Kamu mendengar \"dǎ bā zhé\". Artinya harga menjadi...", "80% dari harga awal", "diskon 8%", "naik 80%", "8 yuan"]],
    ],
    [
      ["苹果五块一斤。", "Píngguǒ wǔ kuài yì jīn.", "Apel lima yuan per jin."],
      ["这件衣服一百二十块。", "Zhè jiàn yīfu yìbǎi èrshí kuài.", "Baju ini seratus dua puluh yuan.", ["Kamu mendengar \"yìbǎi èrshí kuài\". Harganya...", "120 yuan", "102 yuan", "1.200 yuan", "12 yuan"]],
      ["你要几斤？", "Nǐ yào jǐ jīn?", "Kamu mau berapa jin?"],
      ["太贵了，便宜点儿吧。", "Tài guì le, piányi diǎnr ba.", "Terlalu mahal, kurangi sedikit, ya."],
    ],
    [
      ["这双鞋原来三百块，现在打八折。", "Zhè shuāng xié yuánlái sānbǎi kuài, xiànzài dǎ bā zhé.", "Sepatu ini awalnya tiga ratus yuan, sekarang diskon 20%.", ["Dari audio itu, harga sepatu sekarang adalah...", "240 yuan", "300 yuan", "80 yuan", "220 yuan"]],
      ["香蕉三块五一斤，你买两斤吧。", "Xiāngjiāo sān kuài wǔ yì jīn, nǐ mǎi liǎng jīn ba.", "Pisang tiga setengah yuan per jin, belilah dua jin."],
      ["我没有零钱，可以用微信付吗？", "Wǒ méiyǒu língqián, kěyǐ yòng Wēixìn fù ma?", "Saya tidak punya uang kecil, boleh bayar pakai WeChat?"],
      ["这个大的比那个小的贵十块。", "Zhège dà de bǐ nàge xiǎo de guì shí kuài.", "Yang besar ini sepuluh yuan lebih mahal daripada yang kecil itu."],
    ],
  ],
  // 9. Weather and Plans
  [
    [
      ["晴天", "qíngtiān", "hari cerah"],
      ["阴天", "yīntiān", "mendung"],
      ["刮风", "guā fēng", "berangin"],
      ["下雪", "xià xuě", "turun salju", ["Kamu mendengar \"xià yǔ\". Cuacanya...", "hujan", "salju", "cerah", "berangin"]],
    ],
    [
      ["明天下雨。", "Míngtiān xià yǔ.", "Besok hujan."],
      ["今天三十度。", "Jīntiān sānshí dù.", "Hari ini tiga puluh derajat.", ["Kamu mendengar \"Jīntiān sānshí dù.\" Suhunya...", "30 derajat", "13 derajat", "3 derajat", "33 derajat"]],
      ["下午可能刮大风。", "Xiàwǔ kěnéng guā dà fēng.", "Sore nanti mungkin angin kencang."],
      ["周末天气很好。", "Zhōumò tiānqì hěn hǎo.", "Cuaca akhir pekan bagus."],
    ],
    [
      ["明天是晴天，我们去爬山吧。", "Míngtiān shì qíngtiān, wǒmen qù pá shān ba.", "Besok cerah, ayo kita mendaki gunung."],
      ["如果下雨，我们就在家看电影。", "Rúguǒ xià yǔ, wǒmen jiù zài jiā kàn diànyǐng.", "Kalau hujan, kita menonton film di rumah saja.", ["Dari audio itu, kalau hujan mereka akan...", "menonton film di rumah", "mendaki gunung", "berenang", "pergi belanja"]],
      ["今天比昨天冷，你多穿一点儿。", "Jīntiān bǐ zuótiān lěng, nǐ duō chuān yìdiǎnr.", "Hari ini lebih dingin dari kemarin, pakailah baju lebih tebal."],
      ["天气预报说晚上有雪。", "Tiānqì yùbào shuō wǎnshang yǒu xuě.", "Prakiraan cuaca bilang malam ini ada salju."],
    ],
  ],
  // 10. Transportation Messages
  [
    [
      ["地铁", "dìtiě", "kereta bawah tanah"],
      ["公交车", "gōngjiāochē", "bus kota"],
      ["车站", "chēzhàn", "halte / stasiun"],
      ["下车", "xià chē", "turun dari kendaraan", ["Kamu mendengar \"shàng chē\". Artinya...", "naik kendaraan", "turun kendaraan", "berganti kendaraan", "menyetir"]],
    ],
    [
      ["我坐地铁回家。", "Wǒ zuò dìtiě huí jiā.", "Saya pulang naik kereta bawah tanah."],
      ["公交车来了，快上车！", "Gōngjiāochē lái le, kuài shàng chē!", "Busnya datang, cepat naik!"],
      ["下一站是北京站。", "Xià yí zhàn shì Běijīng zhàn.", "Stasiun berikutnya Stasiun Beijing.", ["Kamu mendengar \"Xià yí zhàn shì Běijīng zhàn.\" Ini adalah...", "pengumuman stasiun berikutnya", "harga tiket", "jadwal pesawat", "ajakan makan"]],
      ["我在车站等你。", "Wǒ zài chēzhàn děng nǐ.", "Saya menunggumu di halte."],
    ],
    [
      ["坐三号线，在人民广场换二号线。", "Zuò sān hào xiàn, zài Rénmín Guǎngchǎng huàn èr hào xiàn.", "Naik jalur 3, ganti ke jalur 2 di Alun-Alun Rakyat.", ["Dari audio itu, kamu harus berganti ke jalur...", "2", "3", "1", "4"]],
      ["火车晚了二十分钟，请大家等一下。", "Huǒchē wǎn le èrshí fēnzhōng, qǐng dàjiā děng yíxià.", "Kereta terlambat dua puluh menit, harap semuanya menunggu."],
      ["飞机下午三点到，我去机场接你。", "Fēijī xiàwǔ sān diǎn dào, wǒ qù jīchǎng jiē nǐ.", "Pesawat tiba pukul tiga sore, saya akan menjemputmu di bandara."],
      ["打车去比坐公交车快多了。", "Dǎchē qù bǐ zuò gōngjiāochē kuài duō le.", "Naik taksi jauh lebih cepat daripada naik bus."],
    ],
  ],
  // 11. Phone Numbers and Dates
  [
    [
      ["电话号码", "diànhuà hàomǎ", "nomor telepon"],
      ["一月一号", "yī yuè yī hào", "tanggal 1 Januari"],
      ["星期五", "xīngqīwǔ", "hari Jumat", ["Kamu mendengar \"xīngqīrì\". Harinya adalah...", "Minggu", "Senin", "Jumat", "Sabtu"]],
      ["二零二六年", "èr líng èr liù nián", "tahun 2026"],
    ],
    [
      ["我的手机号是一三八。", "Wǒ de shǒujī hào shì yāo sān bā.", "Nomor ponsel saya diawali 138.", ["Dalam nomor telepon, angka 1 sering dibaca...", "yāo", "yī", "yí", "shí"]],
      ["今天是五月二十号。", "Jīntiān shì wǔ yuè èrshí hào.", "Hari ini tanggal 20 Mei."],
      ["我的生日是八月八号。", "Wǒ de shēngrì shì bā yuè bā hào.", "Ulang tahun saya tanggal 8 Agustus."],
      ["下个星期一考试。", "Xià ge xīngqīyī kǎoshì.", "Senin depan ujian."],
    ],
    [
      ["我的电话是一五九八七六五四三二一。", "Wǒ de diànhuà shì yāo wǔ jiǔ bā qī liù wǔ sì sān èr yāo.", "Nomor telepon saya 15987654321."],
      ["我们十二月二十五号去旅行。", "Wǒmen shí'èr yuè èrshíwǔ hào qù lǚxíng.", "Kami berangkat berwisata tanggal 25 Desember.", ["Dari audio itu, mereka berangkat tanggal...", "25 Desember", "12 Mei", "25 Februari", "20 Desember"]],
      ["他是二零零五年出生的。", "Tā shì èr líng líng wǔ nián chūshēng de.", "Dia lahir tahun 2005."],
      ["会议改到星期四下午了。", "Huìyì gǎi dào xīngqīsì xiàwǔ le.", "Rapat dipindah ke Kamis sore."],
    ],
  ],
  // 12. Hobbies and Free Time
  [
    [
      ["踢足球", "tī zúqiú", "bermain sepak bola"],
      ["画画儿", "huà huàr", "menggambar"],
      ["听音乐", "tīng yīnyuè", "mendengarkan musik"],
      ["上网", "shàngwǎng", "berselancar internet", ["Kamu mendengar \"wán yóuxì\". Artinya...", "bermain game", "menonton TV", "membaca buku", "berenang"]],
    ],
    [
      ["我喜欢踢足球。", "Wǒ xǐhuan tī zúqiú.", "Saya suka bermain sepak bola."],
      ["她周末常常画画儿。", "Tā zhōumò chángcháng huà huàr.", "Dia sering menggambar di akhir pekan."],
      ["我弟弟喜欢玩游戏。", "Wǒ dìdi xǐhuan wán yóuxì.", "Adik saya suka bermain game."],
      ["你有什么爱好？", "Nǐ yǒu shénme àihào?", "Apa hobimu?", ["Kamu mendengar \"Nǐ yǒu shénme àihào?\" Jawaban yang cocok...", "我喜欢游泳。", "我二十岁。", "我是学生。", "我在北京。"]],
    ],
    [
      ["我不喜欢运动，我喜欢在家看书。", "Wǒ bù xǐhuan yùndòng, wǒ xǐhuan zài jiā kàn shū.", "Saya tidak suka olahraga, saya suka membaca di rumah.", ["Dari audio itu, pembicara suka...", "membaca di rumah", "berolahraga", "bermain game", "bernyanyi"]],
      ["每个星期六下午他去学弹钢琴。", "Měi ge xīngqīliù xiàwǔ tā qù xué tán gāngqín.", "Setiap Sabtu sore dia belajar bermain piano."],
      ["我们一起去公园拍照吧。", "Wǒmen yìqǐ qù gōngyuán pāizhào ba.", "Ayo kita pergi berfoto di taman."],
      ["放假的时候，我喜欢去旅游。", "Fàngjià de shíhou, wǒ xǐhuan qù lǚyóu.", "Saat libur, saya suka berwisata."],
    ],
  ],
  // 13. School Announcements
  [
    [
      ["通知", "tōngzhī", "pengumuman"],
      ["考试", "kǎoshì", "ujian"],
      ["放假", "fàngjià", "libur", ["Kamu mendengar \"tōngzhī\". Ini adalah...", "pengumuman", "ujian", "liburan", "pelajaran"]],
      ["开会", "kāihuì", "rapat"],
    ],
    [
      ["明天上午考试。", "Míngtiān shàngwǔ kǎoshì.", "Besok pagi ujian."],
      ["下星期一放假。", "Xià xīngqīyī fàngjià.", "Senin depan libur."],
      ["今天下午三点开会。", "Jīntiān xiàwǔ sān diǎn kāihuì.", "Hari ini rapat pukul tiga sore."],
      ["请大家去操场。", "Qǐng dàjiā qù cāochǎng.", "Semuanya harap ke lapangan.", ["Kamu mendengar \"Qǐng dàjiā qù cāochǎng.\" Semua orang harus ke...", "lapangan", "kantin", "perpustakaan", "kelas"]],
    ],
    [
      ["同学们，明天的汉语课改在二零三教室。", "Tóngxuémen, míngtiān de Hànyǔ kè gǎi zài èr líng sān jiàoshì.", "Anak-anak, kelas Mandarin besok pindah ke ruang 203.", ["Dari pengumuman itu, kelas Mandarin pindah ke ruang...", "203", "230", "302", "320"]],
      ["图书馆星期天不开门。", "Túshūguǎn xīngqītiān bù kāi mén.", "Perpustakaan tutup pada hari Minggu."],
      ["期末考试从六月十号开始。", "Qīmò kǎoshì cóng liù yuè shí hào kāishǐ.", "Ujian akhir semester dimulai tanggal 10 Juni."],
      ["参加比赛的同学请到办公室报名。", "Cānjiā bǐsài de tóngxué qǐng dào bàngōngshì bàomíng.", "Murid yang ikut lomba harap mendaftar di kantor."],
    ],
  ],
  // 14. Friend Invitations
  [
    [
      ["一起去", "yìqǐ qù", "pergi bersama"],
      ["有空", "yǒu kòng", "ada waktu luang"],
      ["好啊", "hǎo a", "boleh! / ayo!"],
      ["没空", "méi kòng", "tidak ada waktu", ["Kamu mendengar \"Duìbuqǐ, wǒ méi kòng.\" Artinya temanmu...", "menolak ajakan", "menerima ajakan", "terlambat", "sakit"]],
    ],
    [
      ["你今天晚上有空吗？", "Nǐ jīntiān wǎnshang yǒu kòng ma?", "Malam ini kamu ada waktu?"],
      ["我们一起去喝咖啡吧。", "Wǒmen yìqǐ qù hē kāfēi ba.", "Ayo kita minum kopi bersama."],
      ["好啊，几点见？", "Hǎo a, jǐ diǎn jiàn?", "Boleh, ketemu jam berapa?", ["Kamu mendengar \"Hǎo a, jǐ diǎn jiàn?\" Temanmu...", "setuju dan menanyakan jam", "menolak", "bertanya tempat", "minta maaf"]],
      ["对不起，我明天没空。", "Duìbuqǐ, wǒ míngtiān méi kòng.", "Maaf, besok saya tidak ada waktu."],
    ],
    [
      ["星期六是我的生日，你来我家吃饭吧。", "Xīngqīliù shì wǒ de shēngrì, nǐ lái wǒ jiā chī fàn ba.", "Sabtu ulang tahun saya, datanglah makan di rumah saya."],
      ["我们六点在电影院门口见，好吗？", "Wǒmen liù diǎn zài diànyǐngyuàn ménkǒu jiàn, hǎo ma?", "Kita bertemu pukul enam di depan bioskop, ya?", ["Dari audio itu, mereka bertemu di...", "depan bioskop", "rumah makan", "stasiun", "sekolah"]],
      ["我今天要加班，我们改天吧。", "Wǒ jīntiān yào jiābān, wǒmen gǎitiān ba.", "Hari ini saya harus lembur, lain hari saja ya."],
      ["太好了，我一定去！", "Tài hǎo le, wǒ yídìng qù!", "Bagus sekali, saya pasti datang!"],
    ],
  ],
  // 15. Health and Body
  [
    [
      ["头疼", "tóu téng", "sakit kepala"],
      ["发烧", "fāshāo", "demam"],
      ["感冒", "gǎnmào", "flu / pilek", ["Kamu mendengar \"késou\". Keluhannya adalah...", "batuk", "demam", "sakit kepala", "sakit gigi"]],
      ["咳嗽", "késou", "batuk"],
    ],
    [
      ["我感冒了。", "Wǒ gǎnmào le.", "Saya flu."],
      ["我嗓子疼。", "Wǒ sǎngzi téng.", "Tenggorokan saya sakit."],
      ["你要多喝水。", "Nǐ yào duō hē shuǐ.", "Kamu harus banyak minum air.", ["Kamu mendengar \"Nǐ yào duō hē shuǐ.\" Ini adalah...", "saran", "keluhan", "pertanyaan harga", "ajakan makan"]],
      ["一天吃三次药。", "Yì tiān chī sān cì yào.", "Minum obat tiga kali sehari."],
    ],
    [
      ["我从昨天开始发烧，还有点儿咳嗽。", "Wǒ cóng zuótiān kāishǐ fāshāo, hái yǒudiǎnr késou.", "Saya demam sejak kemarin, dan sedikit batuk.", ["Dari audio itu, pasien demam sejak...", "kemarin", "hari ini", "minggu lalu", "tadi pagi"]],
      ["医生说我要休息三天。", "Yīshēng shuō wǒ yào xiūxi sān tiān.", "Dokter bilang saya harus istirahat tiga hari."],
      ["这个药饭后吃，一次两片。", "Zhège yào fàn hòu chī, yí cì liǎng piàn.", "Obat ini diminum setelah makan, dua tablet sekali minum."],
      ["你脸色不好，快去医院看看吧。", "Nǐ liǎnsè bù hǎo, kuài qù yīyuàn kànkan ba.", "Wajahmu pucat, cepat periksa ke rumah sakit."],
    ],
  ],
  // 16. Home Routines
  [
    [
      ["洗澡", "xǐzǎo", "mandi"],
      ["洗衣服", "xǐ yīfu", "mencuci baju"],
      ["打扫", "dǎsǎo", "membersihkan / menyapu", ["Kamu mendengar \"xǐ wǎn\". Artinya...", "mencuci piring", "mencuci baju", "mandi", "memasak"]],
      ["做作业", "zuò zuòyè", "mengerjakan PR"],
    ],
    [
      ["我每天晚上洗澡。", "Wǒ měitiān wǎnshang xǐzǎo.", "Saya mandi setiap malam."],
      ["妈妈在洗衣服。", "Māma zài xǐ yīfu.", "Ibu sedang mencuci baju."],
      ["吃完饭我洗碗。", "Chī wán fàn wǒ xǐ wǎn.", "Setelah makan saya mencuci piring."],
      ["弟弟在房间做作业。", "Dìdi zài fángjiān zuò zuòyè.", "Adik sedang mengerjakan PR di kamar.", ["Kamu mendengar \"Dìdi zài fángjiān zuò zuòyè.\" Adik sedang...", "mengerjakan PR", "tidur", "bermain game", "mandi"]],
    ],
    [
      ["星期天上午我们全家一起打扫房间。", "Xīngqītiān shàngwǔ wǒmen quán jiā yìqǐ dǎsǎo fángjiān.", "Minggu pagi seluruh keluarga kami membersihkan rumah bersama."],
      ["爸爸做饭，我和妹妹洗碗。", "Bàba zuò fàn, wǒ hé mèimei xǐ wǎn.", "Ayah memasak, saya dan adik mencuci piring.", ["Dari audio itu, yang memasak adalah...", "ayah", "ibu", "adik", "pembicara"]],
      ["我写完作业以后才看电视。", "Wǒ xiě wán zuòyè yǐhòu cái kàn diànshì.", "Saya baru menonton TV setelah selesai mengerjakan PR."],
      ["睡觉以前我总是刷牙。", "Shuìjiào yǐqián wǒ zǒngshì shuā yá.", "Sebelum tidur saya selalu menggosok gigi."],
    ],
  ],
  // 17. Travel and Hotel
  [
    [
      ["酒店", "jiǔdiàn", "hotel"],
      ["房间", "fángjiān", "kamar"],
      ["护照", "hùzhào", "paspor", ["Kamu mendengar \"hùzhào\". Benda itu adalah...", "paspor", "kunci kamar", "tiket", "peta"]],
      ["行李", "xíngli", "bagasi / koper"],
    ],
    [
      ["我想订一个房间。", "Wǒ xiǎng dìng yí ge fángjiān.", "Saya ingin memesan satu kamar."],
      ["请给我看看您的护照。", "Qǐng gěi wǒ kànkan nín de hùzhào.", "Tolong perlihatkan paspor Anda."],
      ["您的房间在八楼。", "Nín de fángjiān zài bā lóu.", "Kamar Anda di lantai delapan.", ["Kamu mendengar \"Nín de fángjiān zài bā lóu.\" Kamarnya di lantai...", "8", "18", "4", "80"]],
      ["早饭几点开始？", "Zǎofàn jǐ diǎn kāishǐ?", "Sarapan mulai jam berapa?"],
    ],
    [
      ["我们住三个晚上，十号离开。", "Wǒmen zhù sān ge wǎnshang, shí hào líkāi.", "Kami menginap tiga malam, berangkat tanggal sepuluh.", ["Dari audio itu, mereka menginap...", "tiga malam", "sepuluh malam", "dua malam", "satu minggu"]],
      ["酒店离机场很近，坐车十五分钟。", "Jiǔdiàn lí jīchǎng hěn jìn, zuò chē shíwǔ fēnzhōng.", "Hotel dekat bandara, lima belas menit naik mobil."],
      ["房间里的空调坏了，可以换一个房间吗？", "Fángjiān li de kōngtiáo huài le, kěyǐ huàn yí ge fángjiān ma?", "AC di kamar rusak, bolehkah ganti kamar?"],
      ["这次旅行我去了上海和杭州。", "Zhè cì lǚxíng wǒ qù le Shànghǎi hé Hángzhōu.", "Dalam perjalanan ini saya pergi ke Shanghai dan Hangzhou."],
    ],
  ],
  // 18. Question Words in Audio
  [
    [
      ["哪个", "nǎge", "yang mana"],
      ["多少", "duōshao", "berapa (jumlah)"],
      ["怎么样", "zěnmeyàng", "bagaimana (keadaannya)"],
      ["什么时候", "shénme shíhou", "kapan", ["Kamu mendengar \"shénme shíhou\". Penanya ingin tahu...", "waktu", "tempat", "orang", "harga"]],
    ],
    [
      ["你什么时候来？", "Nǐ shénme shíhou lái?", "Kapan kamu datang?"],
      ["你觉得这本书怎么样？", "Nǐ juéde zhè běn shū zěnmeyàng?", "Menurutmu buku ini bagaimana?"],
      ["你要哪个？", "Nǐ yào nǎge?", "Kamu mau yang mana?", ["Kamu mendengar \"Nǐ yào nǎge?\" Jawaban yang cocok...", "我要这个。", "我要两点。", "我在家。", "我是老师。"]],
      ["谁在门口？", "Shéi zài ménkǒu?", "Siapa yang ada di depan pintu?"],
    ],
    [
      ["你是怎么来的？坐地铁还是打车？", "Nǐ shì zěnme lái de? Zuò dìtiě háishi dǎchē?", "Kamu datang dengan apa? Naik kereta bawah tanah atau taksi?", ["Dari audio itu, penanya ingin tahu...", "cara datang", "waktu datang", "teman datang", "tempat asal"]],
      ["你们学校有多少个老师？", "Nǐmen xuéxiào yǒu duōshao ge lǎoshī?", "Sekolahmu punya berapa guru?"],
      ["你为什么学习汉语？", "Nǐ wèishénme xuéxí Hànyǔ?", "Mengapa kamu belajar bahasa Mandarin?"],
      ["你昨天去哪儿了？我给你打电话你没接。", "Nǐ zuótiān qù nǎr le? Wǒ gěi nǐ dǎ diànhuà nǐ méi jiē.", "Kemarin kamu ke mana? Saya meneleponmu tapi tidak diangkat."],
    ],
  ],
  // 19. Connectors and Contrast
  [
    [
      ["和", "hé", "dan"],
      ["也", "yě", "juga"],
      ["但是", "dànshì", "tetapi", ["Kamu mendengar \"suǒyǐ\". Artinya...", "jadi / maka", "tetapi", "dan", "juga"]],
      ["所以", "suǒyǐ", "jadi / maka"],
    ],
    [
      ["我和他是同学。", "Wǒ hé tā shì tóngxué.", "Saya dan dia teman sekelas."],
      ["我也喜欢喝茶。", "Wǒ yě xǐhuan hē chá.", "Saya juga suka minum teh."],
      ["我很累，但是很高兴。", "Wǒ hěn lèi, dànshì hěn gāoxìng.", "Saya lelah, tetapi senang.", ["Kamu mendengar \"Wǒ hěn lèi, dànshì hěn gāoxìng.\" Perasaan pembicara...", "lelah tetapi senang", "lelah dan sedih", "senang dan lapar", "tidak lelah"]],
      ["下雨了，所以我不去。", "Xià yǔ le, suǒyǐ wǒ bú qù.", "Hujan turun, jadi saya tidak pergi."],
    ],
    [
      ["因为今天很冷，所以我们不出去了。", "Yīnwèi jīntiān hěn lěng, suǒyǐ wǒmen bù chūqu le.", "Karena hari ini dingin, jadi kami tidak keluar.", ["Dari audio itu, alasan mereka tidak keluar adalah...", "cuaca dingin", "hujan", "sakit", "sibuk"]],
      ["这件衣服很漂亮，但是太贵了。", "Zhè jiàn yīfu hěn piàoliang, dànshì tài guì le.", "Baju ini cantik, tetapi terlalu mahal."],
      ["我会说英语，也会说一点儿汉语。", "Wǒ huì shuō Yīngyǔ, yě huì shuō yìdiǎnr Hànyǔ.", "Saya bisa berbahasa Inggris, juga bisa sedikit bahasa Mandarin."],
      ["他想去，可是没有时间。", "Tā xiǎng qù, kěshì méiyǒu shíjiān.", "Dia ingin pergi, tetapi tidak punya waktu."],
    ],
  ],
  // 20. HSK 1 Listening Review
  [
    [
      ["对", "duì", "benar"],
      ["不对", "bú duì", "salah / tidak benar"],
      ["知道", "zhīdào", "tahu"],
      ["不知道", "bù zhīdào", "tidak tahu", ["Kamu mendengar \"Wǒ bù zhīdào.\" Pembicara...", "tidak tahu", "tahu", "setuju", "tidak mau"]],
    ],
    [
      ["我在学校门口等你。", "Wǒ zài xuéxiào ménkǒu děng nǐ.", "Saya menunggumu di gerbang sekolah."],
      ["她女儿今年八岁。", "Tā nǚ'ér jīnnián bā suì.", "Putrinya tahun ini delapan tahun."],
      ["我们坐几路车？", "Wǒmen zuò jǐ lù chē?", "Kita naik bus nomor berapa?"],
      ["这个杯子多少钱？", "Zhège bēizi duōshao qián?", "Gelas ini berapa harganya?", ["Kamu mendengar \"Zhège bēizi duōshao qián?\" Penanya sedang...", "menanyakan harga gelas", "membeli teh", "menanyakan jam", "memesan makanan"]],
    ],
    [
      ["明天上午九点，我们在火车站见。", "Míngtiān shàngwǔ jiǔ diǎn, wǒmen zài huǒchēzhàn jiàn.", "Besok pukul sembilan pagi, kita bertemu di stasiun kereta.", ["Dari audio itu, mereka bertemu pukul...", "09.00 pagi", "09.00 malam", "10.00 pagi", "07.00 pagi"]],
      ["我是坐飞机来的，路上很顺利。", "Wǒ shì zuò fēijī lái de, lùshang hěn shùnlì.", "Saya datang naik pesawat, perjalanannya lancar."],
      ["她喜欢看电影，她男朋友喜欢看书。", "Tā xǐhuan kàn diànyǐng, tā nánpéngyou xǐhuan kàn shū.", "Dia suka menonton film, pacarnya suka membaca."],
      ["今天天气不太好，我们明天再去吧。", "Jīntiān tiānqì bú tài hǎo, wǒmen míngtiān zài qù ba.", "Hari ini cuacanya kurang bagus, kita pergi besok saja."],
    ],
  ],
];
