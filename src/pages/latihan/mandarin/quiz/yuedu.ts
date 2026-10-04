import type { QuizTopic } from './types';

// Latihan Yuèdú — one entry per topic (index = topic - 1): [Basic, Intermediate, Advanced].
export const yuedu: QuizTopic[] = [
  // 1. Greetings and Signs
  [
    [
      ["出口", "chūkǒu", "pintu keluar", ["Papan bertuliskan 入口 berarti...", "pintu masuk", "pintu keluar", "toilet", "dilarang masuk"]],
      ["入口", "rùkǒu", "pintu masuk"],
      ["厕所", "cèsuǒ", "toilet"],
      ["禁止吸烟", "jìnzhǐ xīyān", "dilarang merokok"],
    ],
    [
      ["欢迎光临！", "Huānyíng guānglín!", "Selamat datang!"],
      ["请勿拍照。", "Qǐng wù pāizhào.", "Dilarang memotret.", ["勿 pada papan 请勿拍照 berarti...", "jangan", "silakan", "boleh", "harus"]],
      ["小心地滑。", "Xiǎoxīn dì huá.", "Hati-hati lantai licin."],
      ["营业时间：九点到九点。", "Yíngyè shíjiān: jiǔ diǎn dào jiǔ diǎn.", "Jam buka: pukul sembilan sampai pukul sembilan."],
    ],
    [
      ["本店今天休息，明天正常营业。", "Běn diàn jīntiān xiūxi, míngtiān zhèngcháng yíngyè.", "Toko ini tutup hari ini, besok buka seperti biasa.", ["Menurut papan itu, toko akan buka kembali...", "besok", "hari ini", "minggu depan", "tidak buka lagi"]],
      ["请排队上车，谢谢合作。", "Qǐng páiduì shàng chē, xièxie hézuò.", "Harap antre saat naik, terima kasih atas kerja samanya."],
      ["电梯坏了，请走楼梯。", "Diàntī huài le, qǐng zǒu lóutī.", "Lift rusak, silakan lewat tangga."],
      ["图书馆内请保持安静。", "Túshūguǎn nèi qǐng bǎochí ānjìng.", "Harap tenang di dalam perpustakaan."],
    ],
  ],
  // 2. Self Introduction
  [
    [
      ["名字", "míngzi", "nama"],
      ["年龄", "niánlíng", "usia"],
      ["国籍", "guójí", "kewarganegaraan", ["Pada formulir, kolom 国籍 diisi dengan...", "negara asal", "nama", "umur", "nomor telepon"]],
      ["职业", "zhíyè", "pekerjaan"],
    ],
    [
      ["我叫金美英，是韩国人。", "Wǒ jiào Jīn Měiyīng, shì Hánguó rén.", "Nama saya Kim Mi-young, orang Korea."],
      ["我是一名护士。", "Wǒ shì yì míng hùshi.", "Saya seorang perawat."],
      ["我今年三十岁，还没结婚。", "Wǒ jīnnián sānshí suì, hái méi jiéhūn.", "Tahun ini saya tiga puluh tahun, belum menikah.", ["Dari kalimat itu, status pernikahannya...", "belum menikah", "sudah menikah", "bercerai", "tidak disebut"]],
      ["我在北京学习汉语。", "Wǒ zài Běijīng xuéxí Hànyǔ.", "Saya belajar bahasa Mandarin di Beijing."],
    ],
    [
      ["我叫山田，是日本人，在一家公司工作。", "Wǒ jiào Shāntián, shì Rìběn rén, zài yì jiā gōngsī gōngzuò.", "Nama saya Yamada, orang Jepang, bekerja di sebuah perusahaan."],
      ["我来中国两年了，很喜欢这里的生活。", "Wǒ lái Zhōngguó liǎng nián le, hěn xǐhuan zhèlǐ de shēnghuó.", "Saya sudah dua tahun di Tiongkok, sangat suka kehidupan di sini.", ["Menurut teks, penulis sudah di Tiongkok selama...", "dua tahun", "dua bulan", "dua minggu", "dua puluh tahun"]],
      ["我会说英语和汉语，现在在学广东话。", "Wǒ huì shuō Yīngyǔ hé Hànyǔ, xiànzài zài xué Guǎngdōnghuà.", "Saya bisa bahasa Inggris dan Mandarin, sekarang sedang belajar bahasa Kanton."],
      ["我的梦想是当一名汉语老师。", "Wǒ de mèngxiǎng shì dāng yì míng Hànyǔ lǎoshī.", "Impian saya menjadi guru bahasa Mandarin."],
    ],
  ],
  // 3. Family Reading
  [
    [
      ["家人", "jiārén", "anggota keluarga"],
      ["父母", "fùmǔ", "orang tua", ["父母 berarti...", "ayah dan ibu", "kakek dan nenek", "kakak dan adik", "suami dan istri"]],
      ["孩子", "háizi", "anak"],
      ["丈夫", "zhàngfu", "suami"],
    ],
    [
      ["我的父母都是农民。", "Wǒ de fùmǔ dōu shì nóngmín.", "Kedua orang tua saya petani."],
      ["她丈夫是警察。", "Tā zhàngfu shì jǐngchá.", "Suaminya polisi."],
      ["他们有两个孩子。", "Tāmen yǒu liǎng ge háizi.", "Mereka punya dua anak."],
      ["我外婆住在我们家。", "Wǒ wàipó zhù zài wǒmen jiā.", "Nenek (dari ibu) saya tinggal di rumah kami.", ["外婆 adalah nenek dari pihak...", "ibu", "ayah", "suami", "istri"]],
    ],
    [
      ["小明家有四口人，他是家里最小的。", "Xiǎomíng jiā yǒu sì kǒu rén, tā shì jiā li zuì xiǎo de.", "Keluarga Xiaoming ada empat orang, dia yang paling kecil.", ["Dari teks, Xiaoming adalah...", "anak bungsu", "anak sulung", "anak tunggal", "ayah"]],
      ["他姐姐在上大学，哥哥已经工作了。", "Tā jiějie zài shàng dàxué, gēge yǐjīng gōngzuò le.", "Kakak perempuannya kuliah, kakak laki-lakinya sudah bekerja."],
      ["每个星期天，爷爷都带我去钓鱼。", "Měi ge xīngqītiān, yéye dōu dài wǒ qù diàoyú.", "Setiap hari Minggu, kakek selalu mengajak saya memancing."],
      ["我们一家人的关系非常好。", "Wǒmen yì jiā rén de guānxi fēicháng hǎo.", "Hubungan keluarga kami sangat baik."],
    ],
  ],
  // 4. Classroom Reading
  [
    [
      ["课文", "kèwén", "teks pelajaran"],
      ["生词", "shēngcí", "kosakata baru"],
      ["作业", "zuòyè", "pekerjaan rumah (PR)"],
      ["练习", "liànxí", "latihan", ["Instruksi 熟读课文 berarti...", "baca teks sampai lancar", "tulis kosakata", "kerjakan latihan", "dengarkan rekaman"]],
    ],
    [
      ["请预习第五课。", "Qǐng yùxí dì wǔ kè.", "Silakan pelajari dulu pelajaran kelima."],
      ["把生词写三遍。", "Bǎ shēngcí xiě sān biàn.", "Tulis kosakata baru tiga kali.", ["Instruksi 把生词写三遍 meminta murid...", "menulis kosakata tiga kali", "membaca tiga teks", "menghafal tiga kata", "menjawab tiga soal"]],
      ["明天交作业。", "Míngtiān jiāo zuòyè.", "Besok kumpulkan PR."],
      ["请用这个词造句。", "Qǐng yòng zhège cí zàojù.", "Buatlah kalimat dengan kata ini."],
    ],
    [
      ["今天的作业：读课文两遍，做练习一和练习二。", "Jīntiān de zuòyè: dú kèwén liǎng biàn, zuò liànxí yī hé liànxí èr.", "PR hari ini: baca teks dua kali, kerjakan latihan satu dan dua.", ["Menurut catatan, latihan yang dikerjakan adalah...", "latihan 1 dan 2", "latihan 2 saja", "latihan 1 saja", "latihan 2 dan 3"]],
      ["下星期三听写第四课的生词。", "Xià xīngqīsān tīngxiě dì sì kè de shēngcí.", "Rabu depan dikte kosakata pelajaran empat."],
      ["上课时请关手机，不要迟到。", "Shàngkè shí qǐng guān shǒujī, búyào chídào.", "Saat kelas harap matikan ponsel dan jangan terlambat."],
      ["有不懂的地方，可以下课以后问老师。", "Yǒu bù dǒng de dìfang, kěyǐ xiàkè yǐhòu wèn lǎoshī.", "Bagian yang tidak dimengerti bisa ditanyakan ke guru setelah kelas."],
    ],
  ],
  // 5. Daily Schedule
  [
    [
      ["上午", "shàngwǔ", "pagi (sebelum siang)"],
      ["中午", "zhōngwǔ", "siang"],
      ["下午", "xiàwǔ", "sore"],
      ["晚上", "wǎnshang", "malam", ["Pada jadwal, 中午 berarti sekitar pukul...", "12.00", "08.00", "16.00", "20.00"]],
    ],
    [
      ["七点：起床、吃早饭。", "Qī diǎn: qǐchuáng, chī zǎofàn.", "Pukul 7: bangun, sarapan."],
      ["八点到十二点：上课。", "Bā diǎn dào shí'èr diǎn: shàngkè.", "Pukul 8 sampai 12: kelas.", ["Menurut jadwal, kelas berlangsung selama...", "empat jam", "dua jam", "delapan jam", "dua belas jam"]],
      ["下午两点：去图书馆。", "Xiàwǔ liǎng diǎn: qù túshūguǎn.", "Pukul 2 siang: ke perpustakaan."],
      ["晚上九点：给妈妈打电话。", "Wǎnshang jiǔ diǎn: gěi māma dǎ diànhuà.", "Pukul 9 malam: menelepon ibu."],
    ],
    [
      ["王老师星期一到星期五上午上课，下午在办公室。", "Wáng lǎoshī xīngqīyī dào xīngqīwǔ shàngwǔ shàngkè, xiàwǔ zài bàngōngshì.", "Guru Wang mengajar Senin sampai Jumat pagi, sore di kantor.", ["Jika ingin menemui Guru Wang di kantor, waktu terbaik adalah...", "Selasa sore", "Rabu pagi", "Sabtu pagi", "Minggu sore"]],
      ["我每天六点半起床，七点出门。", "Wǒ měitiān liù diǎn bàn qǐchuáng, qī diǎn chūmén.", "Setiap hari saya bangun pukul setengah tujuh, keluar rumah pukul tujuh."],
      ["星期三下午没有课，我常常去游泳。", "Xīngqīsān xiàwǔ méiyǒu kè, wǒ chángcháng qù yóuyǒng.", "Rabu sore tidak ada kelas, saya sering berenang."],
      ["周末我早上九点才起床。", "Zhōumò wǒ zǎoshang jiǔ diǎn cái qǐchuáng.", "Akhir pekan saya baru bangun pukul sembilan pagi."],
    ],
  ],
  // 6. Places and Directions
  [
    [
      ["东", "dōng", "timur"],
      ["西", "xī", "barat"],
      ["南", "nán", "selatan"],
      ["北", "běi", "utara", ["Papan 北门 menunjukkan gerbang...", "utara", "selatan", "timur", "barat"]],
    ],
    [
      ["邮局在学校东边。", "Yóujú zài xuéxiào dōngbian.", "Kantor pos ada di sebelah timur sekolah."],
      ["从北门进去，往右走。", "Cóng běi mén jìnqu, wǎng yòu zǒu.", "Masuk dari gerbang utara, lalu ke kanan."],
      ["商场在二楼。", "Shāngchǎng zài èr lóu.", "Pusat perbelanjaan ada di lantai dua."],
      ["洗手间在电梯左边。", "Xǐshǒujiān zài diàntī zuǒbian.", "Toilet ada di sebelah kiri lift.", ["Menurut kalimat, toilet ada di...", "kiri lift", "kanan lift", "depan lift", "belakang lift"]],
    ],
    [
      ["我家在公园北边，公园南边是一个大超市。", "Wǒ jiā zài gōngyuán běibian, gōngyuán nánbian shì yí ge dà chāoshì.", "Rumah saya di utara taman, di selatan taman ada supermarket besar.", ["Menurut teks, supermarket berada di...", "selatan taman", "utara taman", "timur rumah", "dalam taman"]],
      ["从地铁站出来，往西走五分钟就到了。", "Cóng dìtiězhàn chūlai, wǎng xī zǒu wǔ fēnzhōng jiù dào le.", "Keluar dari stasiun, jalan ke barat lima menit sampai."],
      ["咖啡馆在书店和花店中间。", "Kāfēiguǎn zài shūdiàn hé huādiàn zhōngjiān.", "Kafe ada di antara toko buku dan toko bunga."],
      ["学校的食堂在图书馆后面。", "Xuéxiào de shítáng zài túshūguǎn hòumiàn.", "Kantin sekolah ada di belakang perpustakaan."],
    ],
  ],
  // 7. Shopping Receipts
  [
    [
      ["单价", "dānjià", "harga satuan"],
      ["数量", "shùliàng", "jumlah"],
      ["合计", "héjì", "total", ["Pada struk belanja, 合计 menunjukkan...", "total harga", "harga satuan", "nama toko", "tanggal"]],
      ["找零", "zhǎolíng", "uang kembalian"],
    ],
    [
      ["牛奶：两盒，十二元。", "Niúnǎi: liǎng hé, shí'èr yuán.", "Susu: dua kotak, dua belas yuan."],
      ["鸡蛋：一斤，六元。", "Jīdàn: yì jīn, liù yuán.", "Telur: satu jin, enam yuan."],
      ["面包：三个，十五元。", "Miànbāo: sān ge, shíwǔ yuán.", "Roti: tiga buah, lima belas yuan.", ["Dari struk itu, harga satu roti adalah...", "5 yuan", "15 yuan", "3 yuan", "45 yuan"]],
      ["合计：三十三元。", "Héjì: sānshísān yuán.", "Total: tiga puluh tiga yuan."],
    ],
    [
      ["实收一百元，找零六十七元。", "Shí shōu yìbǎi yuán, zhǎolíng liùshíqī yuán.", "Diterima seratus yuan, kembalian enam puluh tujuh yuan.", ["Jika dibayar 100 yuan dan kembalian 67 yuan, totalnya...", "33 yuan", "67 yuan", "100 yuan", "167 yuan"]],
      ["本店商品七天内可以退换。", "Běn diàn shāngpǐn qī tiān nèi kěyǐ tuìhuàn.", "Barang toko ini bisa dikembalikan atau ditukar dalam tujuh hari."],
      ["会员购物打九折。", "Huìyuán gòuwù dǎ jiǔ zhé.", "Anggota mendapat diskon sepuluh persen."],
      ["买两件，第二件半价。", "Mǎi liǎng jiàn, dì èr jiàn bànjià.", "Beli dua, yang kedua setengah harga."],
    ],
  ],
  // 8. Menu Reading
  [
    [
      ["饺子", "jiǎozi", "pangsit / jiaozi"],
      ["炒饭", "chǎofàn", "nasi goreng"],
      ["果汁", "guǒzhī", "jus buah"],
      ["啤酒", "píjiǔ", "bir", ["Di menu, bagian 饮料 berisi...", "minuman", "makanan utama", "pencuci mulut", "sup"]],
    ],
    [
      ["主食：米饭、面条、饺子。", "Zhǔshí: mǐfàn, miàntiáo, jiǎozi.", "Makanan pokok: nasi, mi, pangsit."],
      ["饮料：茶、咖啡、果汁。", "Yǐnliào: chá, kāfēi, guǒzhī.", "Minuman: teh, kopi, jus buah."],
      ["西红柿鸡蛋汤：十八元。", "Xīhóngshì jīdàn tāng: shíbā yuán.", "Sup tomat telur: delapan belas yuan."],
      ["今日特价：牛肉面二十元。", "Jīnrì tèjià: niúròu miàn èrshí yuán.", "Promo hari ini: mi daging sapi dua puluh yuan.", ["今日特价 berarti...", "harga spesial hari ini", "menu baru", "habis hari ini", "harga normal"]],
    ],
    [
      ["本店的饺子有猪肉的、牛肉的和素的。", "Běn diàn de jiǎozi yǒu zhūròu de, niúròu de hé sù de.", "Pangsit di toko ini ada isi babi, sapi, dan sayur.", ["Pembeli vegetarian sebaiknya memilih pangsit...", "素的 (isi sayur)", "猪肉的", "牛肉的", "semuanya sama"]],
      ["带辣椒标志的菜比较辣。", "Dài làjiāo biāozhì de cài bǐjiào là.", "Masakan bertanda cabai cukup pedas."],
      ["套餐包括一个主菜、一碗汤和一杯饮料。", "Tàocān bāokuò yí ge zhǔcài, yì wǎn tāng hé yì bēi yǐnliào.", "Paket berisi satu hidangan utama, semangkuk sup, dan segelas minuman."],
      ["早餐时间是早上七点到十点。", "Zǎocān shíjiān shì zǎoshang qī diǎn dào shí diǎn.", "Waktu sarapan pukul tujuh sampai sepuluh pagi."],
    ],
  ],
  // 9. Weather Notes
  [
    [
      ["多云", "duōyún", "berawan"],
      ["小雨", "xiǎoyǔ", "hujan ringan"],
      ["大风", "dàfēng", "angin kencang"],
      ["气温", "qìwēn", "suhu udara", ["Pada laporan cuaca, 多云 berarti...", "berawan", "hujan deras", "cerah", "bersalju"]],
    ],
    [
      ["今天：晴，二十五度。", "Jīntiān: qíng, èrshíwǔ dù.", "Hari ini: cerah, dua puluh lima derajat."],
      ["明天：多云转小雨。", "Míngtiān: duōyún zhuǎn xiǎoyǔ.", "Besok: berawan lalu hujan ringan.", ["转 pada 多云转小雨 berarti cuaca...", "berubah menjadi", "tetap", "berhenti", "lebih panas"]],
      ["后天有大风。", "Hòutiān yǒu dàfēng.", "Lusa ada angin kencang."],
      ["最低气温零下三度。", "Zuì dī qìwēn língxià sān dù.", "Suhu terendah minus tiga derajat."],
    ],
    [
      ["这个星期天气都很好，星期六可能下雨。", "Zhège xīngqī tiānqì dōu hěn hǎo, xīngqīliù kěnéng xià yǔ.", "Minggu ini cuacanya bagus, Sabtu mungkin hujan.", ["Menurut catatan, hari yang mungkin hujan adalah...", "Sabtu", "Senin", "Minggu", "setiap hari"]],
      ["今天早上很冷，中午就暖和了。", "Jīntiān zǎoshang hěn lěng, zhōngwǔ jiù nuǎnhuo le.", "Pagi ini dingin, siang sudah hangat."],
      ["雨后的空气特别新鲜。", "Yǔ hòu de kōngqì tèbié xīnxiān.", "Udara setelah hujan sangat segar."],
      ["这里夏天很长，冬天很短。", "Zhèlǐ xiàtiān hěn cháng, dōngtiān hěn duǎn.", "Di sini musim panas panjang, musim dingin pendek."],
    ],
  ],
  // 10. Transport Reading
  [
    [
      ["车票", "chēpiào", "tiket kendaraan"],
      ["站台", "zhàntái", "peron"],
      ["出发", "chūfā", "berangkat"],
      ["到达", "dàodá", "tiba", ["Pada papan bandara, 到达 berarti...", "kedatangan", "keberangkatan", "transit", "dibatalkan"]],
    ],
    [
      ["G101次列车八点出发。", "G yāo líng yāo cì lièchē bā diǎn chūfā.", "Kereta G101 berangkat pukul delapan."],
      ["请在三号站台上车。", "Qǐng zài sān hào zhàntái shàng chē.", "Silakan naik di peron tiga."],
      ["航班延误一个小时。", "Hángbān yánwù yí ge xiǎoshí.", "Penerbangan tertunda satu jam.", ["延误 pada papan bandara berarti...", "tertunda", "tepat waktu", "dibatalkan", "sudah tiba"]],
      ["地铁末班车十一点。", "Dìtiě mòbānchē shíyī diǎn.", "Kereta bawah tanah terakhir pukul sebelas."],
    ],
    [
      ["车票上写着：北京到天津，二车厢十五号。", "Chēpiào shang xiězhe: Běijīng dào Tiānjīn, èr chēxiāng shíwǔ hào.", "Di tiket tertulis: Beijing ke Tianjin, gerbong 2 kursi 15.", ["Menurut tiket, nomor kursinya adalah...", "15", "2", "25", "12"]],
      ["公交车每十分钟一趟，很方便。", "Gōngjiāochē měi shí fēnzhōng yí tàng, hěn fāngbiàn.", "Bus datang setiap sepuluh menit, sangat praktis."],
      ["坐地铁的时候请给老人让座。", "Zuò dìtiě de shíhou qǐng gěi lǎorén ràngzuò.", "Saat naik kereta bawah tanah, berikan tempat duduk kepada lansia."],
      ["飞机提前二十分钟到达了上海。", "Fēijī tíqián èrshí fēnzhōng dàodá le Shànghǎi.", "Pesawat tiba di Shanghai dua puluh menit lebih awal."],
    ],
  ],
  // 11. Friend Messages
  [
    [
      ["短信", "duǎnxìn", "pesan singkat (SMS)"],
      ["等我", "děng wǒ", "tunggu aku"],
      ["马上到", "mǎshàng dào", "segera sampai"],
      ["收到", "shōudào", "sudah diterima / oke", ["Balasan 收到 pada pesan berarti...", "sudah diterima / dimengerti", "maaf", "terima kasih", "tidak setuju"]],
    ],
    [
      ["我在门口，你快下来。", "Wǒ zài ménkǒu, nǐ kuài xiàlai.", "Aku di depan pintu, cepat turun."],
      ["我堵车了，晚十分钟。", "Wǒ dǔchē le, wǎn shí fēnzhōng.", "Aku kena macet, telat sepuluh menit."],
      ["晚上一起吃火锅？", "Wǎnshang yìqǐ chī huǒguō?", "Malam ini makan hotpot bareng?"],
      ["好的，不见不散！", "Hǎo de, bú jiàn bú sàn!", "Oke, sampai ketemu!", ["Pesan 不见不散 menunjukkan penulis...", "pasti akan menunggu sampai bertemu", "membatalkan janji", "tidak mau bertemu", "sedang sibuk"]],
    ],
    [
      ["明天的电影票我买好了，下午三点，别迟到。", "Míngtiān de diànyǐng piào wǒ mǎi hǎo le, xiàwǔ sān diǎn, bié chídào.", "Tiket film besok sudah aku beli, pukul tiga sore, jangan telat.", ["Menurut pesan, siapa yang membeli tiket?", "penulis pesan", "penerima pesan", "keduanya", "belum dibeli"]],
      ["我到你家楼下了，外面下雨，带把伞。", "Wǒ dào nǐ jiā lóu xià le, wàimiàn xià yǔ, dài bǎ sǎn.", "Aku sudah di bawah rumahmu, di luar hujan, bawa payung."],
      ["生日快乐！祝你天天开心！", "Shēngrì kuàilè! Zhù nǐ tiāntiān kāixīn!", "Selamat ulang tahun! Semoga kamu bahagia setiap hari!"],
      ["今天的会取消了，改到下周一。", "Jīntiān de huì qǔxiāo le, gǎi dào xià zhōuyī.", "Rapat hari ini dibatalkan, diganti ke Senin depan."],
    ],
  ],
  // 12. Hobbies Reading
  [
    [
      ["爱好", "àihào", "hobi"],
      ["运动", "yùndòng", "olahraga"],
      ["旅游", "lǚyóu", "berwisata"],
      ["书法", "shūfǎ", "kaligrafi", ["Orang yang suka 书法 senang...", "menulis kaligrafi", "berenang", "memasak", "menyanyi"]],
    ],
    [
      ["我的爱好是看书。", "Wǒ de àihào shì kàn shū.", "Hobi saya membaca."],
      ["他每天都去健身房。", "Tā měitiān dōu qù jiànshēnfáng.", "Dia pergi ke gym setiap hari."],
      ["她喜欢拍照，也喜欢旅游。", "Tā xǐhuan pāizhào, yě xǐhuan lǚyóu.", "Dia suka memotret, juga suka berwisata."],
      ["我爷爷喜欢写书法。", "Wǒ yéye xǐhuan xiě shūfǎ.", "Kakek saya suka menulis kaligrafi.", ["Menurut kalimat, yang suka kaligrafi adalah...", "kakek", "nenek", "ayah", "penulis"]],
    ],
    [
      ["小王是个足球迷，每场比赛他都看。", "Xiǎo Wáng shì ge zúqiú mí, měi chǎng bǐsài tā dōu kàn.", "Xiao Wang penggemar sepak bola, dia menonton setiap pertandingan.", ["足球迷 berarti...", "penggemar sepak bola", "pemain sepak bola", "pelatih", "wasit"]],
      ["我以前喜欢画画儿，现在更喜欢弹吉他。", "Wǒ yǐqián xǐhuan huà huàr, xiànzài gèng xǐhuan tán jítā.", "Dulu saya suka menggambar, sekarang lebih suka bermain gitar."],
      ["周末我们常常骑自行车去郊外。", "Zhōumò wǒmen chángcháng qí zìxíngchē qù jiāowài.", "Akhir pekan kami sering bersepeda ke pinggiran kota."],
      ["读书能让人知道很多新东西。", "Dú shū néng ràng rén zhīdào hěn duō xīn dōngxi.", "Membaca membuat orang tahu banyak hal baru."],
    ],
  ],
  // 13. Health Reading
  [
    [
      ["药", "yào", "obat"],
      ["医生", "yīshēng", "dokter"],
      ["休息", "xiūxi", "istirahat"],
      ["饭后", "fàn hòu", "setelah makan", ["Petunjuk obat 饭前服用 berarti diminum...", "sebelum makan", "setelah makan", "saat tidur", "saat bangun"]],
    ],
    [
      ["一日三次，一次一片。", "Yí rì sān cì, yí cì yí piàn.", "Tiga kali sehari, satu tablet sekali minum.", ["Menurut petunjuk itu, dalam sehari minum berapa tablet?", "tiga", "satu", "dua", "enam"]],
      ["饭后半小时服用。", "Fàn hòu bàn xiǎoshí fúyòng.", "Diminum setengah jam setelah makan."],
      ["请多喝水，早点儿睡觉。", "Qǐng duō hē shuǐ, zǎo diǎnr shuìjiào.", "Banyak minum air dan tidur lebih awal."],
      ["他感冒了，今天不来上课。", "Tā gǎnmào le, jīntiān bù lái shàngkè.", "Dia flu, hari ini tidak masuk kelas."],
    ],
    [
      ["小李这几天头疼、发烧，医生让他休息三天。", "Xiǎo Lǐ zhè jǐ tiān tóu téng, fāshāo, yīshēng ràng tā xiūxi sān tiān.", "Beberapa hari ini Xiao Li sakit kepala dan demam, dokter menyuruhnya istirahat tiga hari.", ["Menurut teks, dokter menyuruh Xiao Li...", "istirahat tiga hari", "berolahraga", "minum kopi", "pergi bekerja"]],
      ["每天走路半个小时，对身体有好处。", "Měitiān zǒulù bàn ge xiǎoshí, duì shēntǐ yǒu hǎochù.", "Berjalan setengah jam setiap hari bermanfaat bagi tubuh."],
      ["少吃甜的，多吃水果和蔬菜。", "Shǎo chī tián de, duō chī shuǐguǒ hé shūcài.", "Kurangi makanan manis, perbanyak buah dan sayur."],
      ["这个药孩子不能吃，请放在孩子拿不到的地方。", "Zhège yào háizi bù néng chī, qǐng fàng zài háizi ná bu dào de dìfang.", "Obat ini tidak boleh untuk anak, simpan di tempat yang tidak terjangkau anak."],
    ],
  ],
  // 14. Time and Date Reading
  [
    [
      ["年", "nián", "tahun"],
      ["月", "yuè", "bulan"],
      ["号", "hào", "tanggal (angka hari)"],
      ["周末", "zhōumò", "akhir pekan", ["Tulisan 3月8日 dibaca...", "tanggal 8 Maret", "tanggal 3 Agustus", "Maret tahun 8", "pukul 3.08"]],
    ],
    [
      ["今天是二〇二六年十月四日。", "Jīntiān shì èr líng èr liù nián shí yuè sì rì.", "Hari ini tanggal 4 Oktober 2026."],
      ["会议在下午两点半开始。", "Huìyì zài xiàwǔ liǎng diǎn bàn kāishǐ.", "Rapat dimulai pukul setengah tiga sore.", ["Menurut kalimat, rapat dimulai pukul...", "14.30", "12.30", "02.30 pagi", "15.30"]],
      ["国庆节放假七天。", "Guóqìng Jié fàngjià qī tiān.", "Libur Hari Nasional tujuh hari."],
      ["春节是农历一月一日。", "Chūn Jié shì nónglì yī yuè yī rì.", "Imlek jatuh pada tanggal 1 bulan 1 kalender lunar."],
    ],
    [
      ["比赛从九月十号开始，一共三天。", "Bǐsài cóng jiǔ yuè shí hào kāishǐ, yígòng sān tiān.", "Lomba dimulai 10 September, berlangsung tiga hari.", ["Menurut teks, lomba berakhir pada tanggal...", "12 September", "10 September", "13 September", "3 September"]],
      ["我先吃早饭，再去上班，下班后去超市。", "Wǒ xiān chī zǎofàn, zài qù shàngbān, xiàbān hòu qù chāoshì.", "Saya sarapan dulu, lalu bekerja, setelah pulang kerja ke supermarket."],
      ["上个月三号是我妈妈的生日。", "Shàng ge yuè sān hào shì wǒ māma de shēngrì.", "Tanggal tiga bulan lalu adalah ulang tahun ibu saya."],
      ["报名时间截止到这个星期五中午。", "Bàomíng shíjiān jiézhǐ dào zhège xīngqīwǔ zhōngwǔ.", "Pendaftaran ditutup Jumat siang ini."],
    ],
  ],
  // 15. Simple Email
  [
    [
      ["您好", "nín hǎo", "halo / dengan hormat"],
      ["此致敬礼", "cǐ zhì jìnglǐ", "salam hormat (penutup surat)", ["Ungkapan 此致敬礼 biasanya ada di...", "penutup surat", "judul surat", "alamat", "awal surat"]],
      ["附件", "fùjiàn", "lampiran"],
      ["回复", "huífù", "balasan"],
    ],
    [
      ["亲爱的李老师：您好！", "Qīn'ài de Lǐ lǎoshī: nín hǎo!", "Guru Li yang terhormat: Halo!"],
      ["谢谢您的来信。", "Xièxie nín de láixìn.", "Terima kasih atas surat Anda."],
      ["附件是我的作业，请查收。", "Fùjiàn shì wǒ de zuòyè, qǐng cháshōu.", "Lampiran berisi PR saya, mohon diperiksa.", ["Menurut email, isi lampiran adalah...", "PR penulis", "foto", "jadwal ujian", "tiket"]],
      ["期待您的回复。", "Qīdài nín de huífù.", "Menantikan balasan Anda."],
    ],
    [
      ["我下个星期要回国，所以不能参加考试了。", "Wǒ xià ge xīngqī yào huí guó, suǒyǐ bù néng cānjiā kǎoshì le.", "Minggu depan saya harus pulang ke negara saya, jadi tidak bisa ikut ujian.", ["Menurut email, alasan penulis tidak ikut ujian adalah...", "pulang ke negaranya", "sakit", "lupa jadwal", "bekerja"]],
      ["请问我可以提前考试吗？", "Qǐngwèn wǒ kěyǐ tíqián kǎoshì ma?", "Bolehkah saya ikut ujian lebih awal?"],
      ["祝您工作顺利，身体健康！", "Zhù nín gōngzuò shùnlì, shēntǐ jiànkāng!", "Semoga pekerjaan Anda lancar dan sehat selalu!"],
      ["您的学生：马克，十月五日。", "Nín de xuésheng: Mǎkè, shí yuè wǔ rì.", "Murid Anda: Mark, 5 Oktober."],
    ],
  ],
  // 16. School Announcements
  [
    [
      ["报名", "bàomíng", "mendaftar"],
      ["活动", "huódòng", "kegiatan"],
      ["比赛", "bǐsài", "lomba / pertandingan"],
      ["地点", "dìdiǎn", "tempat", ["Pada pengumuman, kolom 地点 menunjukkan...", "tempat acara", "waktu acara", "biaya", "nama panitia"]],
    ],
    [
      ["时间：本周五下午三点。", "Shíjiān: běn zhōuwǔ xiàwǔ sān diǎn.", "Waktu: Jumat ini pukul tiga sore."],
      ["地点：学校大礼堂。", "Dìdiǎn: xuéxiào dà lǐtáng.", "Tempat: aula besar sekolah."],
      ["欢迎同学们报名参加。", "Huānyíng tóngxuémen bàomíng cānjiā.", "Para murid dipersilakan mendaftar."],
      ["报名请找张老师。", "Bàomíng qǐng zhǎo Zhāng lǎoshī.", "Untuk mendaftar silakan temui Guru Zhang.", ["Menurut pengumuman, untuk mendaftar kamu harus menemui...", "Guru Zhang", "kepala sekolah", "Guru Wang", "ketua kelas"]],
    ],
    [
      ["学校将举办汉语演讲比赛，题目是“我的家乡”。", "Xuéxiào jiāng jǔbàn Hànyǔ yǎnjiǎng bǐsài, tímù shì “wǒ de jiāxiāng”.", "Sekolah akan mengadakan lomba pidato Mandarin bertema 'Kampung Halamanku'.", ["Tema lomba pidato tersebut adalah...", "kampung halaman", "keluarga", "sekolah", "hobi"]],
      ["下周一全校停课一天，请大家在家复习。", "Xià zhōuyī quán xiào tíngkè yì tiān, qǐng dàjiā zài jiā fùxí.", "Senin depan seluruh sekolah libur sehari, harap belajar di rumah."],
      ["参加旅行的同学请在早上七点到校门口集合。", "Cānjiā lǚxíng de tóngxué qǐng zài zǎoshang qī diǎn dào xiào ménkǒu jíhé.", "Murid yang ikut wisata harap berkumpul di gerbang sekolah pukul tujuh pagi."],
      ["图书馆新到了一批中文书，欢迎借阅。", "Túshūguǎn xīn dào le yì pī Zhōngwén shū, huānyíng jièyuè.", "Perpustakaan menerima kiriman buku Mandarin baru, silakan dipinjam."],
    ],
  ],
  // 17. Home Mini Story
  [
    [
      ["客厅", "kètīng", "ruang tamu"],
      ["厨房", "chúfáng", "dapur"],
      ["卧室", "wòshì", "kamar tidur"],
      ["阳台", "yángtái", "balkon", ["Tempat memasak di rumah disebut...", "厨房", "客厅", "卧室", "阳台"]],
    ],
    [
      ["妈妈在厨房做饭。", "Māma zài chúfáng zuò fàn.", "Ibu memasak di dapur."],
      ["爸爸在客厅看报纸。", "Bàba zài kètīng kàn bàozhǐ.", "Ayah membaca koran di ruang tamu."],
      ["小猫在阳台上睡觉。", "Xiǎomāo zài yángtái shang shuìjiào.", "Anak kucing tidur di balkon.", ["Menurut kalimat, anak kucing sedang...", "tidur di balkon", "makan di dapur", "bermain di kamar", "keluar rumah"]],
      ["我在卧室写作业。", "Wǒ zài wòshì xiě zuòyè.", "Saya mengerjakan PR di kamar tidur."],
    ],
    [
      ["星期天早上，妈妈做了包子，全家人一起吃早饭。", "Xīngqītiān zǎoshang, māma zuò le bāozi, quán jiā rén yìqǐ chī zǎofàn.", "Minggu pagi, ibu membuat bakpao, seluruh keluarga sarapan bersama.", ["Menurut cerita, siapa yang membuat bakpao?", "ibu", "ayah", "nenek", "penulis"]],
      ["吃完饭，爸爸去洗碗，我和弟弟打扫房间。", "Chī wán fàn, bàba qù xǐ wǎn, wǒ hé dìdi dǎsǎo fángjiān.", "Setelah makan, ayah mencuci piring, saya dan adik membersihkan kamar."],
      ["下午我们在阳台上种了一些花。", "Xiàwǔ wǒmen zài yángtái shang zhòng le yìxiē huā.", "Sore harinya kami menanam beberapa bunga di balkon."],
      ["晚上大家坐在客厅里一起看电视，聊天。", "Wǎnshang dàjiā zuò zài kètīng li yìqǐ kàn diànshì, liáotiān.", "Malam hari semua duduk di ruang tamu menonton TV dan mengobrol."],
    ],
  ],
  // 18. Question Word Reading
  [
    [
      ["为什么", "wèishénme", "mengapa"],
      ["哪里", "nǎlǐ", "di mana"],
      ["多久", "duō jiǔ", "berapa lama"],
      ["怎么办", "zěnme bàn", "bagaimana ini / harus bagaimana", ["Kalimat 我们怎么办？ diucapkan saat...", "bingung harus berbuat apa", "senang", "bertanya harga", "berkenalan"]],
    ],
    [
      ["你在哪里工作？", "Nǐ zài nǎlǐ gōngzuò?", "Kamu bekerja di mana?"],
      ["你学汉语学了多久？", "Nǐ xué Hànyǔ xué le duō jiǔ?", "Sudah berapa lama kamu belajar bahasa Mandarin?", ["Jawaban yang cocok untuk pertanyaan itu adalah...", "一年。", "在北京。", "很好。", "老师。"]],
      ["这是谁写的字？", "Zhè shì shéi xiě de zì?", "Ini tulisan siapa?"],
      ["钱包丢了，怎么办？", "Qiánbāo diū le, zěnme bàn?", "Dompetnya hilang, bagaimana ini?"],
    ],
    [
      ["小张为什么没来上课？因为他生病了。", "Xiǎo Zhāng wèishénme méi lái shàngkè? Yīnwèi tā shēngbìng le.", "Mengapa Xiao Zhang tidak masuk kelas? Karena dia sakit.", ["Menurut teks, Xiao Zhang tidak masuk karena...", "sakit", "terlambat", "liburan", "pindah sekolah"]],
      ["你知道从这里到机场要多长时间吗？", "Nǐ zhīdào cóng zhèlǐ dào jīchǎng yào duō cháng shíjiān ma?", "Apakah kamu tahu berapa lama dari sini ke bandara?"],
      ["你觉得哪件衣服好看？红的还是白的？", "Nǐ juéde nǎ jiàn yīfu hǎokàn? Hóng de háishi bái de?", "Menurutmu baju mana yang bagus? Yang merah atau putih?"],
      ["这个汉字怎么写？我忘了。", "Zhège Hànzì zěnme xiě? Wǒ wàng le.", "Hanzi ini bagaimana menulisnya? Saya lupa."],
    ],
  ],
  // 19. Reading Connectors
  [
    [
      ["因为", "yīnwèi", "karena"],
      ["可是", "kěshì", "tetapi"],
      ["还是", "háishi", "atau (dalam pertanyaan)"],
      ["或者", "huòzhě", "atau (dalam pernyataan)", ["Kata 'atau' dalam kalimat tanya pilihan adalah...", "还是", "或者", "和", "也"]],
    ],
    [
      ["因为下雨，所以比赛取消了。", "Yīnwèi xià yǔ, suǒyǐ bǐsài qǔxiāo le.", "Karena hujan, pertandingan dibatalkan."],
      ["我想买，可是钱不够。", "Wǒ xiǎng mǎi, kěshì qián bú gòu.", "Saya ingin membeli, tetapi uangnya tidak cukup."],
      ["你喝茶还是喝咖啡？", "Nǐ hē chá háishi hē kāfēi?", "Kamu minum teh atau kopi?"],
      ["星期六或者星期天都可以。", "Xīngqīliù huòzhě xīngqītiān dōu kěyǐ.", "Sabtu atau Minggu sama-sama boleh.", ["Arti kalimat itu adalah penulis...", "bisa di kedua hari", "hanya bisa Sabtu", "hanya bisa Minggu", "tidak bisa keduanya"]],
    ],
    [
      ["虽然汉字很难，但是我每天都练习。", "Suīrán Hànzì hěn nán, dànshì wǒ měitiān dōu liànxí.", "Meskipun Hanzi sulit, saya berlatih setiap hari."],
      ["他不但会说汉语，而且会写很多汉字。", "Tā búdàn huì shuō Hànyǔ, érqiě huì xiě hěn duō Hànzì.", "Dia tidak hanya bisa berbahasa Mandarin, tetapi juga bisa menulis banyak Hanzi.", ["不但……而且…… berarti...", "tidak hanya ... tetapi juga ...", "karena ... jadi ...", "meskipun ... tetapi ...", "jika ... maka ..."]],
      ["如果明天不下雨，我们就去公园。", "Rúguǒ míngtiān bú xià yǔ, wǒmen jiù qù gōngyuán.", "Jika besok tidak hujan, kita pergi ke taman."],
      ["我先写完作业，然后才出去玩儿。", "Wǒ xiān xiě wán zuòyè, ránhòu cái chūqu wánr.", "Saya menyelesaikan PR dulu, baru kemudian keluar bermain."],
    ],
  ],
  // 20. HSK 1 Reading Review
  [
    [
      ["学生证", "xuéshēngzhèng", "kartu pelajar"],
      ["电话号", "diànhuà hào", "nomor telepon"],
      ["地址", "dìzhǐ", "alamat"],
      ["日期", "rìqī", "tanggal (kolom formulir)", ["Pada formulir, kolom 地址 diisi dengan...", "alamat", "tanggal lahir", "nama", "pekerjaan"]],
    ],
    [
      ["我叫大卫，是美国留学生。", "Wǒ jiào Dàwèi, shì Měiguó liúxuéshēng.", "Nama saya David, mahasiswa asing dari Amerika."],
      ["我住在学校的留学生宿舍。", "Wǒ zhù zài xuéxiào de liúxuéshēng sùshè.", "Saya tinggal di asrama mahasiswa asing sekolah."],
      ["我每天八点到教室上课。", "Wǒ měitiān bā diǎn dào jiàoshì shàngkè.", "Setiap hari saya tiba di kelas pukul delapan."],
      ["我的同屋是日本人，她很友好。", "Wǒ de tóngwū shì Rìběn rén, tā hěn yǒuhǎo.", "Teman sekamar saya orang Jepang, dia sangat ramah.", ["同屋 berarti...", "teman sekamar", "teman sekelas", "tetangga", "guru"]],
    ],
    [
      ["我来北京一个月了，我很喜欢这个城市。", "Wǒ lái Běijīng yí ge yuè le, wǒ hěn xǐhuan zhège chéngshì.", "Saya sudah sebulan di Beijing, saya sangat suka kota ini.", ["Menurut teks, penulis sudah di Beijing selama...", "satu bulan", "satu tahun", "satu minggu", "satu hari"]],
      ["周末我常常和中国朋友去饭馆吃饭。", "Zhōumò wǒ chángcháng hé Zhōngguó péngyou qù fànguǎn chī fàn.", "Akhir pekan saya sering makan di rumah makan dengan teman Tiongkok."],
      ["我的汉语老师很好，她常常帮助我。", "Wǒ de Hànyǔ lǎoshī hěn hǎo, tā chángcháng bāngzhù wǒ.", "Guru Mandarin saya baik, dia sering membantu saya."],
      ["明年我想去上海和西安看看。", "Míngnián wǒ xiǎng qù Shànghǎi hé Xī'ān kànkan.", "Tahun depan saya ingin berkunjung ke Shanghai dan Xi'an."],
    ],
  ],
];
