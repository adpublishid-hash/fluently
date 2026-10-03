import type { LessonCoreTuple } from '../types';

// Listening HSK 5 — one entry per lesson (index = lesson - 1). Titles come from the topic list.
export const listening: LessonCoreTuple[] = [
  [null, ['Sikap tersirat terdengar dari kata penilai (未免, 难免, 恐怕) dan pujian yang setengah hati.', 'Tanya: pembicara setuju, ragu, atau menolak — walau tidak berkata "tidak"?'], [
    ['这个计划听起来不错，只是未免太理想化了。', 'Zhè ge jì huà tīng qǐ lái bú cuò, zhǐ shì wèi miǎn tài lǐ xiǎng huà le.', 'Rencana ini terdengar bagus, hanya saja terlalu idealis.'],
    ['他的想法有创意，可惜实际操作起来难度太大。', 'Tā de xiǎng fǎ yǒu chuàng yì, kě xī shí jì cāo zuò qǐ lái nán dù tài dà.', 'Idenya kreatif, sayangnya sulit dilaksanakan dalam praktik.'],
    ['我恐怕不能完全赞成。', 'Wǒ kǒng pà bù néng wán quán zàn chéng.', 'Sepertinya saya tidak bisa sepenuhnya setuju.'],
    ['话是这么说，可做起来就是另一回事了。', 'Huà shì zhè me shuō, kě zuò qǐ lái jiù shì lìng yì huí shì le.', 'Bicara memang begitu, tetapi melakukannya lain cerita.'],
  ]],
  [null, ['Argumen dua sisi: catat dalam dua kolom (支持 / 反对) saat mendengar.', 'Penanda pergantian sisi: 另一方面, 反过来说, 但也有人认为.'], [
    ['支持者认为，延长退休年龄可以缓解养老金压力。', 'Zhī chí zhě rèn wéi, yán cháng tuì xiū nián líng kě yǐ huǎn jiě yǎng lǎo jīn yā lì.', 'Pendukung berpendapat menaikkan usia pensiun dapat meredakan tekanan dana pensiun.'],
    ['反过来说，这也可能减少年轻人的就业机会。', 'Fǎn guò lái shuō, zhè yě kě néng jiǎn shǎo nián qīng rén de jiù yè jī huì.', 'Sebaliknya, hal ini juga bisa mengurangi peluang kerja anak muda.'],
    ['也有人认为，应该让个人自由选择。', 'Yě yǒu rén rèn wéi, yīng gāi ràng gè rén zì yóu xuǎn zé.', 'Ada juga yang berpendapat sebaiknya individu bebas memilih.'],
    ['双方的观点都有一定的道理。', 'Shuāng fāng de guān diǎn dōu yǒu yí dìng de dào lǐ.', 'Pandangan kedua pihak sama-sama ada benarnya.'],
  ]],
  [null, ['Konsesi dan kontras: bagian setelah 但是/然而/不过 biasanya pendapat sebenarnya.', 'Bagian 虽然/尽管 hanya pengakuan, bukan inti.'], [
    ['虽然短视频很受欢迎，但它也让人越来越难以专注。', 'Suī rán duǎn shì pín hěn shòu huān yíng, dàn tā yě ràng rén yuè lái yuè nán yǐ zhuān zhù.', 'Meskipun video pendek sangat populer, ia membuat orang semakin sulit fokus.'],
    ['尽管价格上涨了，销量却没有下降。', 'Jǐn guǎn jià gé shàng zhǎng le, xiāo liàng què méi yǒu xià jiàng.', 'Meskipun harga naik, penjualan justru tidak turun.'],
    ['我承认他很有才华，不过他的态度有问题。', 'Wǒ chéng rèn tā hěn yǒu cái huá, bú guò tā de tài dù yǒu wèn tí.', 'Saya akui dia sangat berbakat, tetapi sikapnya bermasalah.'],
    ['理论上可行，然而现实中阻力很大。', 'Lǐ lùn shàng kě xíng, rán ér xiàn shí zhōng zǔ lì hěn dà.', 'Secara teori bisa, namun dalam kenyataan hambatannya besar.'],
  ]],
  [null, ['Isyarat bukti: 根据…的数据, 研究发现, 比如说, 事实上.', 'Bedakan bukti kuat (data, penelitian) dan anekdot (我认识一个人…).'], [
    ['根据统计局的数据，城镇人口已超过六成。', 'Gēn jù tǒng jì jú de shù jù, chéng zhèn rén kǒu yǐ chāo guò liù chéng.', 'Menurut data biro statistik, penduduk perkotaan sudah melebihi enam puluh persen.'],
    ['研究发现，每天阅读二十分钟能显著提高词汇量。', 'Yán jiū fā xiàn, měi tiān yuè dú èr shí fēn zhōng néng xiǎn zhù tí gāo cí huì liàng.', 'Penelitian menemukan membaca dua puluh menit setiap hari dapat meningkatkan kosakata secara signifikan.'],
    ['事实上，大部分用户从不阅读隐私条款。', 'Shì shí shàng, dà bù fen yòng hù cóng bú yuè dú yǐn sī tiáo kuǎn.', 'Faktanya, sebagian besar pengguna tidak pernah membaca ketentuan privasi.'],
    ['我认识一个人，他就是这样成功的。', 'Wǒ rèn shi yí gè rén, tā jiù shì zhè yàng chéng gōng de.', 'Saya kenal seseorang yang berhasil dengan cara ini.'],
  ]],
  [null, ['Ringkas ceramah formal: tesis + 3 poin + kesimpulan dalam 50 karakter.', 'Abaikan contoh panjang; ambil klaim yang didukungnya.'], [
    ['今天的讲座主要讨论城市绿地的作用。', 'Jīn tiān de jiǎng zuò zhǔ yào tǎo lùn chéng shì lǜ dì de zuò yòng.', 'Ceramah hari ini terutama membahas fungsi ruang hijau kota.'],
    ['绿地不仅能改善空气质量，还能降低城市温度。', 'Lǜ dì bù jǐn néng gǎi shàn kōng qì zhì liàng, hái néng jiàng dī chéng shì wēn dù.', 'Ruang hijau tidak hanya memperbaiki kualitas udara, tetapi juga menurunkan suhu kota.'],
    ['更重要的是，它为居民提供了交流的空间。', 'Gèng zhòng yào de shì, tā wèi jū mín tí gōng le jiāo liú de kōng jiān.', 'Yang lebih penting, ruang hijau menyediakan tempat interaksi bagi warga.'],
    ['因此，城市规划应当优先考虑绿地建设。', 'Yīn cǐ, chéng shì guī huà yīng dāng yōu xiān kǎo lǜ lǜ dì jiàn shè.', 'Oleh karena itu, perencanaan kota sepatutnya memprioritaskan pembangunan ruang hijau.'],
  ]],
  [null, ['Komentar berita: pisahkan fakta yang dilaporkan dan penilaian komentator.', 'Penanda penilaian: 值得反思, 令人担忧, 不难看出.'], [
    ['昨天，某品牌因虚假宣传被罚款五百万元。', 'Zuó tiān, mǒu pǐn pái yīn xū jiǎ xuān chuán bèi fá kuǎn wǔ bǎi wàn yuán.', 'Kemarin, sebuah merek didenda lima juta yuan karena iklan palsu.'],
    ['不难看出，监管部门的态度越来越严格。', 'Bù nán kàn chū, jiān guǎn bù mén de tài dù yuè lái yuè yán gé.', 'Tidak sulit melihat bahwa sikap regulator semakin tegas.'],
    ['这件事值得所有企业反思。', 'Zhè jiàn shì zhí dé suǒ yǒu qǐ yè fǎn sī.', 'Kejadian ini patut menjadi bahan renungan semua perusahaan.'],
    ['诚信才是企业长久发展的基础。', 'Chéng xìn cái shì qǐ yè cháng jiǔ fā zhǎn de jī chǔ.', 'Kejujuranlah dasar perkembangan perusahaan jangka panjang.'],
  ]],
  [null, ['Wawancara kosakata abstrak: tebak makna dari konteks dan contoh yang menyertainya.', 'Kata abstrak sering dijelaskan ulang dengan 也就是说 atau 换句话说.'], [
    ['您怎么理解"内卷"这个词？', 'Nín zěn me lǐ jiě " nèi juàn " zhè ge cí?', 'Bagaimana Anda memahami kata "involusi" (persaingan berlebihan yang tak produktif)?'],
    ['也就是说，大家投入越来越多，回报却没有增加。', 'Yě jiù shì shuō, dà jiā tóu rù yuè lái yuè duō, huí bào què méi yǒu zēng jiā.', 'Artinya, semua orang mengeluarkan upaya makin besar, tetapi hasilnya tidak bertambah.'],
    ['换句话说，这是一种无效的竞争。', 'Huàn jù huà shuō, zhè shì yì zhǒng wú xiào de jìng zhēng.', 'Dengan kata lain, ini persaingan yang tidak efektif.'],
    ['要打破这种局面，需要改变评价标准。', 'Yào dǎ pò zhè zhǒng jú miàn, xū yào gǎi biàn píng jià biāo zhǔn.', 'Untuk memecah situasi ini, standar penilaian perlu diubah.'],
  ]],
  [null, ['Penanda urutan ceramah: 首先, 接下来, 另外一点, 最后我想强调.', 'Catat nomor poin agar struktur kuliah tetap jelas.'], [
    ['首先，我们回顾一下上次课的内容。', 'Shǒu xiān, wǒ men huí gù yí xià shàng cì kè de nèi róng.', 'Pertama, mari kita ulas materi pertemuan lalu.'],
    ['接下来，我们看三个具体的案例。', 'Jiē xià lái, wǒ men kàn sān gè jù tǐ de àn lì.', 'Selanjutnya, kita lihat tiga kasus konkret.'],
    ['另外一点需要注意的是样本的大小。', 'Lìng wài yì diǎn xū yào zhù yì de shì yàng běn de dà xiǎo.', 'Satu hal lain yang perlu diperhatikan adalah ukuran sampel.'],
    ['最后我想强调，结论必须基于证据。', 'Zuì hòu wǒ xiǎng qiáng diào, jié lùn bì xū jī yú zhèng jù.', 'Terakhir saya ingin menegaskan, kesimpulan harus berdasarkan bukti.'],
  ]],
  [null, ['Audio kebijakan: tujuan kebijakan, sasaran, langkah, dan kritik.', 'Kata kunci: 出台, 实施, 措施, 效果.'], [
    ['政府出台了鼓励生育的新政策。', 'Zhèng fǔ chū tái le gǔ lì shēng yù de xīn zhèng cè.', 'Pemerintah mengeluarkan kebijakan baru untuk mendorong kelahiran.'],
    ['主要措施包括延长产假和发放补贴。', 'Zhǔ yào cuò shī bāo kuò yán cháng chǎn jià hé fā fàng bǔ tiē.', 'Langkah utamanya meliputi perpanjangan cuti melahirkan dan pemberian subsidi.'],
    ['专家认为，政策的效果还需要时间观察。', 'Zhuān jiā rèn wéi, zhèng cè de xiào guǒ hái xū yào shí jiān guān chá.', 'Pakar berpendapat efek kebijakan masih perlu waktu untuk diamati.'],
    ['也有人担心补贴太少，作用有限。', 'Yě yǒu rén dān xīn bǔ tiē tài shǎo, zuò yòng yǒu xiàn.', 'Ada juga yang khawatir subsidinya terlalu kecil sehingga dampaknya terbatas.'],
  ]],
  [null, ['Rapat bisnis: tangkap keputusan, penanggung jawab, dan tenggat.', 'Frasa keputusan: 那就这么定了, 由…跟进, 下周五以前.'], [
    ['我们先看一下第三季度的销售情况。', 'Wǒ men xiān kàn yí xià dì sān jì dù de xiāo shòu qíng kuàng.', 'Mari kita lihat dulu kondisi penjualan kuartal ketiga.'],
    ['华东地区的业绩没有达到预期。', 'Huá dōng dì qū de yè jì méi yǒu dá dào yù qī.', 'Kinerja wilayah Tiongkok Timur tidak mencapai target.'],
    ['市场部需要拿出新的推广方案。', 'Shì chǎng bù xū yào ná chū xīn de tuī guǎng fāng àn.', 'Bagian pemasaran perlu mengajukan rencana promosi baru.'],
    ['这件事由张经理跟进，下周五以前给我答复。', 'Zhè jiàn shì yóu zhāng jīng lǐ gēn jìn, xià zhōu wǔ yǐ qián gěi wǒ dá fù.', 'Hal ini ditindaklanjuti oleh Manajer Zhang, beri saya jawaban sebelum Jumat depan.'],
  ]],
  [null, ['Bias media: perhatikan pilihan kata bermuatan emosi dan sisi yang tidak diberi suara.', 'Bandingkan dua laporan tentang kejadian yang sama.'], [
    ['这家报纸称抗议者为"闹事者"。', 'Zhè jiā bào zhǐ chēng kàng yì zhě wèi " nào shì zhě ".', 'Surat kabar ini menyebut para pengunjuk rasa sebagai "pembuat onar".'],
    ['而另一家媒体用的是"维权市民"。', 'Ér lìng yì jiā méi tǐ yòng de shì " wéi quán shì mín ".', 'Sementara media lain memakai sebutan "warga yang membela hak".'],
    ['同一件事，用词不同，读者的印象就完全不同。', 'Tóng yí jiàn shì, yòng cí bù tóng, dú zhě de yìn xiàng jiù wán quán bù tóng.', 'Kejadian yang sama, kata berbeda, kesan pembaca pun berbeda sama sekali.'],
    ['报道中没有采访另一方的意见。', 'Bào dào zhōng méi yǒu cǎi fǎng lìng yì fāng de yì jiàn.', 'Dalam laporan itu tidak ada wawancara dengan pihak lain.'],
  ]],
  [null, ['Interpretasi data lisan: angka, arah tren, penyebab yang disebut pembicara.', 'Kata tren: 回升, 下滑, 持平, 创新高.'], [
    ['房价连续三个月下滑。', 'Fáng jià lián xù sān gè yuè xià huá.', 'Harga rumah turun tiga bulan berturut-turut.'],
    ['旅游收入创下了历史新高。', 'Lǚ yóu shōu rù chuàng xià le lì shǐ xīn gāo.', 'Pendapatan pariwisata mencetak rekor tertinggi sepanjang sejarah.'],
    ['失业率与上月基本持平。', 'Shī yè lǜ yǔ shàng yuè jī běn chí píng.', 'Tingkat pengangguran pada dasarnya sama dengan bulan lalu.'],
    ['分析人士认为，这与消费信心有关。', 'Fēn xī rén shì rèn wéi, zhè yǔ xiāo fèi xìn xīn yǒu guān.', 'Para analis berpendapat hal ini terkait dengan kepercayaan konsumen.'],
  ]],
  [null, ['Ceramah masalah-solusi: masalah, akar penyebab, solusi yang ditawarkan, hambatan.', 'Solusi biasanya diawali 解决的办法是, 我们可以.'], [
    ['很多老旧小区没有电梯，老人上下楼很困难。', 'Hěn duō lǎo jiù xiǎo qū méi yǒu diàn tī, lǎo rén shàng xià lóu hěn kùn nán.', 'Banyak kompleks perumahan lama tidak punya lift, orang tua sulit naik turun.'],
    ['根本原因是当年的设计标准比较低。', 'Gēn běn yuán yīn shì dāng nián de shè jì biāo zhǔn bǐ jiào dī.', 'Akar penyebabnya standar desain waktu itu rendah.'],
    ['解决的办法是政府和居民共同出资加装电梯。', 'Jiě jué de bàn fǎ shì zhèng fǔ hé jū mín gòng tóng chū zī jiā zhuāng diàn tī.', 'Solusinya pemerintah dan warga bersama-sama mendanai pemasangan lift.'],
    ['难点在于低层住户不一定同意。', 'Nán diǎn zài yú dī céng zhù hù bù yí dìng tóng yì.', 'Kesulitannya, penghuni lantai bawah belum tentu setuju.'],
  ]],
  [null, ['Pergeseran opini dalam dialog: dengarkan kapan seseorang berubah pikiran dan karena apa.', 'Penanda: 听你这么一说, 我倒觉得, 原来如此.'], [
    ['我本来觉得养宠物太麻烦了。', 'Wǒ běn lái jué de yǎng chǒng wù tài má fán le.', 'Awalnya saya pikir memelihara hewan terlalu merepotkan.'],
    ['听你这么一说，我倒有点儿心动了。', 'Tīng nǐ zhè me yì shuō, wǒ dào yǒu diǎnr xīn dòng le.', 'Mendengar penjelasanmu, saya malah jadi agak tertarik.'],
    ['原来猫这么好照顾。', 'Yuán lái māo zhè me hǎo zhào gù.', 'Ternyata kucing semudah ini dirawat.'],
    ['那我周末去领养中心看看吧。', 'Nà wǒ zhōu mò qù lǐng yǎng zhōng xīn kàn kàn ba.', 'Kalau begitu akhir pekan ini saya lihat-lihat ke pusat adopsi.'],
  ]],
  [null, ['Pertanyaan retoris bukan meminta jawaban; ia menegaskan kebalikannya.', 'Pola: 难道…吗？, 谁不…呢？, 何必…呢？'], [
    ['难道我们只能眼看着河流被污染吗？', 'Nán dào wǒ men zhǐ néng yǎn kàn zhe hé liú bèi wū rǎn ma?', 'Masa kita hanya bisa melihat sungai tercemar?'],
    ['谁不希望自己的孩子过得幸福呢？', 'Shuí bù xī wàng zì jǐ de hái zi guò de xìng fú ne?', 'Siapa yang tidak ingin anaknya hidup bahagia?'],
    ['何必为了面子花这么多钱呢？', 'Hé bì wèi le miàn zi huā zhè me duō qián ne?', 'Untuk apa menghabiskan uang sebanyak ini demi gengsi?'],
    ['这样的机会，为什么不试一试？', 'Zhè yàng de jī huì, wèi shén me bú shì yi shì?', 'Kesempatan seperti ini, kenapa tidak dicoba?'],
  ]],
  [null, ['Ucapan cepat: dengarkan per kelompok makna (chunk), bukan per kata.', 'Kata fungsi (的, 了, 是) sering sangat ringan dalam ucapan cepat.'], [
    ['我跟你说啊，这事儿没那么简单。', 'Wǒ gēn nǐ shuō a, zhè shì ér méi nà me jiǎn dān.', 'Dengar ya, urusan ini tidak sesederhana itu.'],
    ['你先别急，听我把话说完。', 'Nǐ xiān bié jí, tīng wǒ bǎ huà shuō wán.', 'Jangan buru-buru, dengarkan saya bicara sampai selesai.'],
    ['反正我是觉得不太靠谱。', 'Fǎn zhèng wǒ shì jué de bú tài kào pǔ.', 'Pokoknya menurut saya kurang bisa diandalkan.'],
    ['到时候再说吧，走一步看一步。', 'Dào shí hòu zài shuō ba, zǒu yí bù kàn yí bù.', 'Nanti saja dibicarakan, jalani selangkah demi selangkah.'],
  ]],
  [null, ['Inferensi dari nada: kata yang sama bisa berarti pujian atau sindiran.', 'Perhatikan tekanan, panjang suku kata, dan jeda.'], [
    ['你可真行啊！', 'Nǐ kě zhēn xíng a!', 'Kamu hebat sekali ya! (bisa pujian atau sindiran)'],
    ['好吧，随你的便。', 'Hǎo ba, suí nǐ de biàn.', 'Ya sudah, terserah kamu.'],
    ['这么早就到了？', 'Zhè me zǎo jiù dào le?', 'Sudah sampai sepagi ini?'],
    ['哟，今天怎么这么客气？', 'Yō, jīn tiān zěn me zhè me kè qì?', 'Wah, kenapa hari ini sopan sekali?'],
  ]],
  [null, ['Mencatat audio panjang: gunakan singkatan, panah sebab-akibat, dan simbol +/−.', 'Tulis kata kunci Mandarin atau Indonesia, mana yang lebih cepat.'], [
    ['第一部分讲的是问题的背景。', 'Dì yī bù fen jiǎng de shì wèn tí de bèi jǐng.', 'Bagian pertama membahas latar belakang masalah.'],
    ['第二部分分析了三个主要原因。', 'Dì èr bù fen fēn xī le sān gè zhǔ yào yuán yīn.', 'Bagian kedua menganalisis tiga penyebab utama.'],
    ['第三部分提出了具体的建议。', 'Dì sān bù fen tí chū le jù tǐ de jiàn yì.', 'Bagian ketiga mengajukan saran-saran konkret.'],
    ['讲者在结尾时回答了听众的问题。', 'Jiǎng zhě zài jié wěi shí huí dá le tīng zhòng de wèn tí.', 'Di akhir, pembicara menjawab pertanyaan pendengar.'],
  ]],
  [null, ['Ringkasan dari banyak poin: kelompokkan poin yang mirip, lalu buat satu kalimat payung.', 'Pakai 归纳起来, 总的来看.'], [
    ['归纳起来，嘉宾提到了三个问题。', 'Guī nà qǐ lái, jiā bīn tí dào le sān gè wèn tí.', 'Jika dirangkum, tamu menyebutkan tiga masalah.'],
    ['一是资金，二是人才，三是政策。', 'Yī shì zī jīn, èr shì rén cái, sān shì zhèng cè.', 'Pertama dana, kedua sumber daya manusia, ketiga kebijakan.'],
    ['其中人才问题最为紧迫。', 'Qí zhōng rén cái wèn tí zuì wèi jǐn pò.', 'Di antaranya masalah SDM paling mendesak.'],
    ['总的来看，前景还是乐观的。', 'Zǒng de lái kàn, qián jǐng hái shì lè guān de.', 'Secara umum, prospeknya tetap optimis.'],
  ]],
  [null, ['Portfolio menyimak HSK 5: 5 audio panjang (berita, ceramah, debat, wawancara, rapat) dengan catatan dan ringkasan.', 'Catat tingkat pemahaman awal dan akhir untuk tiap audio.'], [
    ['我现在能听懂大部分的新闻评论。', 'Wǒ xiàn zài néng tīng dǒng dà bù fen de xīn wén píng lùn.', 'Sekarang saya bisa memahami sebagian besar komentar berita.'],
    ['语速太快的访谈还需要听两遍。', 'Yǔ sù tài kuài de fǎng tán hái xū yào tīng liǎng biàn.', 'Wawancara yang terlalu cepat masih perlu didengar dua kali.'],
    ['做笔记的速度比以前快了很多。', 'Zuò bǐ jì de sù dù bǐ yǐ qián kuài le hěn duō.', 'Kecepatan mencatat saya jauh lebih cepat dari sebelumnya.'],
    ['下一步我想挑战没有字幕的纪录片。', 'Xià yí bù wǒ xiǎng tiǎo zhàn méi yǒu zì mù de jì lù piàn.', 'Langkah berikutnya saya ingin menantang diri menonton dokumenter tanpa teks.'],
  ]],
];
