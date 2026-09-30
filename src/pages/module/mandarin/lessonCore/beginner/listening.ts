import type { LessonCoreTuple } from '../types';

// Listening HSK 1 — one entry per lesson (index = lesson - 1). Titles come from the topic list.
export const listening: LessonCoreTuple[] = [
  [null, ['Dengarkan kontur nada: 1 datar tinggi, 2 naik, 3 turun-naik, 4 turun tajam.', 'Suku kata sama dengan nada berbeda = kata berbeda: 妈 mā, 马 mǎ, 骂 mà.'], [
    ['妈妈骑马。', 'Mā ma qí mǎ.', 'Ibu menunggang kuda.'],
    ['马很大。', 'Mǎ hěn dà.', 'Kudanya besar.'],
    ['我买一本书。', 'Wǒ mǎi yì běn shū.', 'Saya membeli sebuah buku.'],
    ['他卖水果。', 'Tā mài shuǐ guǒ.', 'Dia menjual buah.'],
  ]],
  [null, ['Salam biasanya di awal percakapan, 再见 di akhir — dengarkan posisinya.', 'Nada naik di akhir 吗 menandai pertanyaan.'], [
    ['你们好，我是新老师。', 'Nǐ men hǎo, wǒ shì xīn lǎo shī.', 'Halo semuanya, saya guru baru.'],
    ['好久不见！', 'Hǎo jiǔ bú jiàn!', 'Lama tidak bertemu!'],
    ['晚上好！', 'Wǎn shàng hǎo!', 'Selamat malam!'],
    ['我走了，再见！', 'Wǒ zǒu le, zài jiàn!', 'Saya pergi dulu, sampai jumpa!'],
  ]],
  [null, ['Nama Tionghoa: marga satu suku kata di depan (王, 李, 张), lalu nama diri.', 'Dengarkan kata 叫 atau 姓 sebagai penanda nama.'], [
    ['她姓张，叫张丽。', 'Tā xìng zhāng, jiào zhāng lì.', 'Marganya Zhang, namanya Zhang Li.'],
    ['我的朋友叫王大海。', 'Wǒ de péng yǒu jiào wáng dà hǎi.', 'Teman saya bernama Wang Dahai.'],
    ['那个医生姓什么？', 'Nà ge yī shēng xìng shén me?', 'Dokter itu bermarga apa?'],
    ['我儿子叫小龙。', 'Wǒ ér zi jiào xiǎo lóng.', 'Anak laki-laki saya bernama Xiaolong.'],
  ]],
  [null, ['Nama negara sering berakhir dengan 国: 中国, 美国, 英国, 法国.', 'Dengarkan 人 setelah nama negara untuk menandai kebangsaan.'], [
    ['她是英国人。', 'Tā shì yīng guó rén.', 'Dia orang Inggris.'],
    ['我朋友是法国人。', 'Wǒ péng yǒu shì fǎ guó rén.', 'Teman saya orang Prancis.'],
    ['他们从中国来。', 'Tā men cóng zhōng guó lái.', 'Mereka datang dari Tiongkok.'],
    ['王老师不是北京人。', 'Wáng lǎo shī bú shì běi jīng rén.', 'Guru Wang bukan orang Beijing.'],
  ]],
  [null, ['Angka 0–10: 零 一 二 三 四 五 六 七 八 九 十.', 'Bedakan 四 sì (4) dan 十 shí (10) dari nadanya.'], [
    ['我有十块钱。', 'Wǒ yǒu shí kuài qián.', 'Saya punya sepuluh yuan.'],
    ['她四岁。', 'Tā sì suì.', 'Dia berumur empat tahun.'],
    ['我们班有九个学生。', 'Wǒ men bān yǒu jiǔ gè xué shēng.', 'Kelas kami punya sembilan murid.'],
    ['今天是七月一号。', 'Jīn tiān shì qī yuè yī hào.', 'Hari ini tanggal satu Juli.'],
  ]],
  [null, ['Nomor telepon diucapkan per digit; 一 sering dibaca yāo.', 'Tulis angka sambil mendengar, lalu cek kembali.'], [
    ['我的电话是八六五四三。', 'Wǒ de diàn huà shì bā liù wǔ sì sān.', 'Nomor telepon saya delapan-enam-lima-empat-tiga.'],
    ['他的手机号是一三九。', 'Tā de shǒu jī hào shì yī sān jiǔ.', 'Nomor ponselnya satu-tiga-sembilan.'],
    ['请打这个电话。', 'Qǐng dǎ zhè ge diàn huà.', 'Tolong telepon nomor ini.'],
    ['我没有她的电话。', 'Wǒ méi yǒu tā de diàn huà.', 'Saya tidak punya nomor teleponnya.'],
  ]],
  [null, ['Kata keluarga: 爸爸, 妈妈, 哥哥, 姐姐, 弟弟, 妹妹, 儿子, 女儿.', 'Pasangan kata dengan suku kata berulang memudahkan menangkapnya.'], [
    ['我哥哥在北京工作。', 'Wǒ gē ge zài běi jīng gōng zuò.', 'Kakak laki-laki saya bekerja di Beijing.'],
    ['她有一个女儿。', 'Tā yǒu yí gè nǚ ér.', 'Dia punya seorang anak perempuan.'],
    ['我妹妹很小。', 'Wǒ mèi mei hěn xiǎo.', 'Adik perempuan saya masih kecil.'],
    ['他爸爸是司机。', 'Tā bà ba shì sī jī.', 'Ayahnya seorang sopir.'],
  ]],
  [null, ['Minuman: 茶, 水, 咖啡, 牛奶. Kata satuan: 一杯.', 'Tangkap kata kerja 喝 sebagai petunjuk topik minuman.'], [
    ['我爸爸喝咖啡。', 'Wǒ bà ba hē kā fēi.', 'Ayah saya minum kopi.'],
    ['她不喝牛奶。', 'Tā bù hē niú nǎi.', 'Dia tidak minum susu.'],
    ['请给我一杯水。', 'Qǐng gěi wǒ yì bēi shuǐ.', 'Tolong beri saya segelas air.'],
    ['这杯茶很热。', 'Zhè bēi chá hěn rè.', 'Teh ini panas.'],
  ]],
  [null, ['Pertanyaan ya/tidak berakhir dengan 吗 atau pola A-不-A (去不去).', 'Dengarkan jawaban: 是/对 = ya, 不/不是 = tidak.'], [
    ['你去不去商店？', 'Nǐ qù bu qù shāng diàn?', 'Kamu pergi ke toko atau tidak?'],
    ['她是你妹妹吗？', 'Tā shì nǐ mèi mei ma?', 'Apakah dia adik perempuanmu?'],
    ['对，她是我妹妹。', 'Duì, tā shì wǒ mèi mei.', 'Benar, dia adik perempuan saya.'],
    ['你喜欢不喜欢狗？', 'Nǐ xǐ huan bù xǐ huan gǒu?', 'Kamu suka anjing atau tidak?'],
  ]],
  [null, ['不 terdengar bù, tetapi bú di depan nada 4.', 'Kalimat dengan 不 membalik makna — tangkap kata ini lebih dulu.'], [
    ['我不认识他。', 'Wǒ bú rèn shi tā.', 'Saya tidak kenal dia.'],
    ['今天我不在家。', 'Jīn tiān wǒ bú zài jiā.', 'Hari ini saya tidak di rumah.'],
    ['这个菜不好吃。', 'Zhè ge cài bù hǎo chī.', 'Masakan ini tidak enak.'],
    ['他不会开车。', 'Tā bú huì kāi chē.', 'Dia tidak bisa menyetir mobil.'],
  ]],
  [null, ['Kata waktu: 今天, 明天, 昨天, 上午, 中午, 下午, 晚上.', 'Kata waktu biasanya muncul di awal kalimat.'], [
    ['我上午学习，下午工作。', 'Wǒ shàng wǔ xué xí, xià wǔ gōng zuò.', 'Saya belajar pagi hari, bekerja siang hari.'],
    ['明天中午我们吃米饭。', 'Míng tiān zhōng wǔ wǒ men chī mǐ fàn.', 'Besok siang kita makan nasi.'],
    ['昨天晚上我看电视了。', 'Zuó tiān wǎn shàng wǒ kàn diàn shì le.', 'Tadi malam saya menonton televisi.'],
    ['你明天上午来吗？', 'Nǐ míng tiān shàng wǔ lái ma?', 'Besok pagi kamu datang?'],
  ]],
  [null, ['Kata lokasi: 上 (atas), 下 (bawah), 里 (dalam), 前面 (depan), 后面 (belakang).', 'Pola: benda + 在 + tempat + kata lokasi.'], [
    ['杯子在桌子上。', 'Bēi zi zài zhuō zi shàng.', 'Gelas ada di atas meja.'],
    ['狗在椅子下面。', 'Gǒu zài yǐ zi xià miàn.', 'Anjing ada di bawah kursi.'],
    ['书在包里。', 'Shū zài bāo lǐ.', 'Buku ada di dalam tas.'],
    ['出租车在商店前面。', 'Chū zū chē zài shāng diàn qián miàn.', 'Taksi ada di depan toko.'],
  ]],
  [null, ['谁 menanyakan orang, 什么 menanyakan benda/hal.', 'Posisi kata tanya menunjukkan bagian yang ditanyakan.'], [
    ['谁在那儿？', 'Shuí zài nàr?', 'Siapa di sana?'],
    ['她在写什么？', 'Tā zài xiě shén me?', 'Dia sedang menulis apa?'],
    ['这是谁的衣服？', 'Zhè shì shuí de yī fu?', 'Ini baju siapa?'],
    ['你们说什么呢？', 'Nǐ men shuō shén me ne?', 'Kalian sedang membicarakan apa?'],
  ]],
  [null, ['几 untuk jumlah kecil dengan kata satuan; 多少 untuk jumlah besar dan harga.', 'Dengarkan kata satuan setelah 几: 几个, 几本, 几点.'], [
    ['你们班有多少学生？', 'Nǐ men bān yǒu duō shǎo xué shēng?', 'Kelas kalian punya berapa murid?'],
    ['这件衣服多少钱？', 'Zhè jiàn yī fu duō shǎo qián?', 'Baju ini berapa harganya?'],
    ['你要几个苹果？', 'Nǐ yào jǐ gè píng guǒ?', 'Kamu mau berapa apel?'],
    ['你有几个孩子？', 'Nǐ yǒu jǐ gè hái zi?', 'Kamu punya berapa anak?'],
  ]],
  [null, ['Perintah kelas: 请听 (dengarkan), 请看 (lihat), 请读 (baca), 请写 (tulis).', 'Tangkap kata kerja setelah 请 untuk tahu apa yang diminta.'], [
    ['请听录音。', 'Qǐng tīng lù yīn.', 'Silakan dengarkan rekaman.'],
    ['请打开书。', 'Qǐng dǎ kāi shū.', 'Silakan buka buku.'],
    ['请写汉字。', 'Qǐng xiě hàn zì.', 'Silakan tulis Hanzi.'],
    ['请大家跟我读。', 'Qǐng dà jiā gēn wǒ dú.', 'Semuanya, ikuti saya membaca.'],
  ]],
  [null, ['Dialog belanja: tanya barang → harga → jumlah → bayar.', 'Tangkap angka + 块 untuk harga.'], [
    ['你要买什么？', 'Nǐ yào mǎi shén me?', 'Kamu mau membeli apa?'],
    ['我要买两个杯子。', 'Wǒ yào mǎi liǎng gè bēi zi.', 'Saya mau membeli dua gelas.'],
    ['一共二十块。', 'Yí gòng èr shí kuài.', 'Totalnya dua puluh yuan.'],
    ['给你钱。', 'Gěi nǐ qián.', 'Ini uangnya.'],
  ]],
  [null, ['Dialog keluarga: tanya jumlah anggota, pekerjaan, dan umur.', 'Umur ditanyakan dengan 几岁 (anak) atau 多大 (dewasa).'], [
    ['你儿子几岁了？', 'Nǐ ér zi jǐ suì le?', 'Anak laki-lakimu berumur berapa?'],
    ['他六岁了。', 'Tā liù suì le.', 'Dia sudah enam tahun.'],
    ['你妈妈多大了？', 'Nǐ mā ma duō dà le?', 'Ibumu berumur berapa?'],
    ['我妈妈五十岁。', 'Wǒ mā ma wǔ shí suì.', 'Ibu saya berumur lima puluh tahun.'],
  ]],
  [null, ['Perkenalan diri biasanya: nama → negara → pekerjaan → hobi.', 'Catat satu kata kunci untuk setiap bagian.'], [
    ['我叫玛丽，是美国人。', 'Wǒ jiào mǎ lì, shì měi guó rén.', 'Nama saya Mary, orang Amerika.'],
    ['我在医院工作。', 'Wǒ zài yī yuàn gōng zuò.', 'Saya bekerja di rumah sakit.'],
    ['我喜欢听音乐。', 'Wǒ xǐ huan tīng yīn yuè.', 'Saya suka mendengarkan musik.'],
    ['很高兴认识大家。', 'Hěn gāo xìng rèn shi dà jiā.', 'Senang berkenalan dengan semuanya.'],
  ]],
  [null, ['Percakapan mini: siapa, di mana, kapan, melakukan apa.', 'Jawab pertanyaan pemahaman dengan satu kata dari audio.'], [
    ['你在做什么？', 'Nǐ zài zuò shén me?', 'Kamu sedang apa?'],
    ['我在家做饭。', 'Wǒ zài jiā zuò fàn.', 'Saya sedang memasak di rumah.'],
    ['晚上你来我家吃饭吧。', 'Wǎn shàng nǐ lái wǒ jiā chī fàn ba.', 'Malam ini datanglah makan di rumahku.'],
    ['好的，我七点到。', 'Hǎo de, wǒ qī diǎn dào.', 'Baik, saya tiba jam tujuh.'],
  ]],
  [null, ['Review menyimak HSK 1: nada, angka, keluarga, waktu, lokasi, dan kata tanya.', 'Dengarkan tiap kalimat dua kali: pertama untuk inti, kedua untuk detail.'], [
    ['下午三点我去医院。', 'Xià wǔ sān diǎn wǒ qù yī yuàn.', 'Jam tiga siang saya pergi ke rumah sakit.'],
    ['她的猫叫什么名字？', 'Tā de māo jiào shén me míng zì?', 'Kucingnya bernama apa?'],
    ['我住在学校后面。', 'Wǒ zhù zài xué xiào hòu miàn.', 'Saya tinggal di belakang sekolah.'],
    ['我们明天一起去吧。', 'Wǒ men míng tiān yì qǐ qù ba.', 'Besok ayo kita pergi bersama.'],
  ]],
];
