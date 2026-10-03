import type { LessonCoreTuple } from '../types';

// Listening HSK 8 (Kuliah umum + policy theme) — one entry per lesson (index = lesson - 1).
export const listening: LessonCoreTuple[] = [
  [null, ['Kuliah kebijakan industri: bedakan kebijakan vertikal (sektor tertentu) dan horizontal (semua sektor).', 'Catat contoh untuk masing-masing.'], [
    ['产业政策可以分为选择性政策和功能性政策。', 'Chǎn yè zhèng cè kě yǐ fēn wéi xuǎn zé xìng zhèng cè hé gōng néng xìng zhèng cè.', 'Kebijakan industri dapat dibagi menjadi kebijakan selektif dan kebijakan fungsional.'],
    ['选择性政策针对特定行业给予扶持。', 'Xuǎn zé xìng zhèng cè zhēn duì tè dìng háng yè jǐ yǔ fú chí.', 'Kebijakan selektif memberi dukungan kepada industri tertentu.'],
    ['功能性政策则改善所有企业共享的环境。', 'Gōng néng xìng zhèng cè zé gǎi shàn suǒ yǒu qǐ yè gòng xiǎng de huán jìng.', 'Kebijakan fungsional memperbaiki lingkungan yang dinikmati semua perusahaan.'],
    ['比如教育、基础设施和研发补贴。', 'Bǐ rú jiào yù, jī chǔ shè shī hé yán fā bǔ tiē.', 'Misalnya pendidikan, infrastruktur, dan subsidi riset.'],
  ]],
  [null, ['Kuliah fiskal: istilah 赤字率, 债务率, 可持续 dan ambang batas yang disebut.', 'Tangkap angka dan apakah dosen setuju dengan ambang itu.'], [
    ['国际上常把百分之三的赤字率作为警戒线。', 'Guó jì shàng cháng bǎ bǎi fēn zhī sān de chì zì lǜ zuò wéi jǐng jiè xiàn.', 'Secara internasional rasio defisit tiga persen sering dijadikan garis waspada.'],
    ['但这个标准并没有严格的理论依据。', 'Dàn zhè ge biāo zhǔn bìng méi yǒu yán gé de lǐ lùn yī jù.', 'Tetapi standar ini tidak punya dasar teori yang ketat.'],
    ['关键要看利率与增长率的关系。', 'Guān jiàn yào kàn lì lǜ yǔ zēng zhǎng lǜ de guān xì.', 'Kuncinya melihat hubungan antara suku bunga dan tingkat pertumbuhan.'],
    ['只要增长快于利率，债务就是可持续的。', 'Zhǐ yào zēng zhǎng kuài yú lì lǜ, zhài wù jiù shì kě chí xù de.', 'Asal pertumbuhan lebih cepat dari suku bunga, utang itu berkelanjutan.'],
  ]],
  [null, ['Kuliah jaminan sosial: model pembiayaan (现收现付 vs 基金积累).', 'Catat kelebihan dan risiko tiap model.'], [
    ['养老金制度主要有现收现付和基金积累两种模式。', 'Yǎng lǎo jīn zhì dù zhǔ yào yǒu xiàn shōu xiàn fù hé jī jīn jī lěi liǎng zhǒng mó shì.', 'Sistem pensiun terutama punya dua model: bayar sambil jalan dan akumulasi dana.'],
    ['现收现付由在职一代供养退休一代。', 'Xiàn shōu xiàn fù yóu zài zhí yí dài gòng yǎng tuì xiū yí dài.', 'Model bayar sambil jalan: generasi bekerja menanggung generasi pensiun.'],
    ['在老龄化背景下，这一模式面临压力。', 'Zài lǎo líng huà bèi jǐng xià, zhè yì mó shì miàn lín yā lì.', 'Dalam latar penuaan, model ini menghadapi tekanan.'],
    ['基金积累模式则面临投资风险。', 'Jī jīn jī lěi mó shì zé miàn lín tóu zī fēng xiǎn.', 'Model akumulasi dana menghadapi risiko investasi.'],
  ]],
  [null, ['Kuliah hukou: data migran dan kesenjangan layanan.', 'Tangkap istilah 常住人口 vs 户籍人口.'], [
    ['城镇常住人口城镇化率已超过百分之六十五。', 'Chéng zhèn cháng zhù rén kǒu chéng zhèn huà lǜ yǐ chāo guò bǎi fēn zhī liù shí wǔ.', 'Tingkat urbanisasi berdasarkan penduduk tetap sudah melebihi enam puluh lima persen.'],
    ['但户籍人口城镇化率要低十几个百分点。', 'Dàn hù jí rén kǒu chéng zhèn huà lǜ yào dī shí jǐ gè bǎi fēn diǎn.', 'Tetapi tingkat urbanisasi berdasarkan hukou lebih rendah belasan poin persentase.'],
    ['这个差距就是没有落户的城市居民。', 'Zhè ge chā jù jiù shì méi yǒu luò hù de chéng shì jū mín.', 'Selisih itu adalah penduduk kota yang belum terdaftar hukou setempat.'],
    ['他们在子女教育等方面仍面临障碍。', 'Tā men zài zǐ nǚ jiào yù děng fāng miàn réng miàn lín zhàng ài.', 'Mereka masih menghadapi hambatan dalam hal seperti pendidikan anak.'],
  ]],
  [null, ['Kuliah transisi energi: komposisi bauran energi dan targetnya.', 'Catat persentase per sumber energi.'], [
    ['目前煤炭仍占一次能源消费的一半以上。', 'Mù qián méi tàn réng zhàn yí cì néng yuán xiāo fèi de yí bàn yǐ shàng.', 'Saat ini batu bara masih menyumbang lebih dari setengah konsumsi energi primer.'],
    ['非化石能源的比重正在稳步提高。', 'Fēi huà shí néng yuán de bǐ zhòng zhèng zài wěn bù tí gāo.', 'Porsi energi non-fosil sedang meningkat dengan stabil.'],
    ['储能技术是新能源大规模应用的瓶颈。', 'Chǔ néng jì shù shì xīn néng yuán dà guī mó yìng yòng de píng jǐng.', 'Teknologi penyimpanan energi adalah hambatan penerapan energi baru skala besar.'],
    ['电网的灵活性也需要同步提升。', 'Diàn wǎng de líng huó xìng yě xū yào tóng bù tí shēng.', 'Fleksibilitas jaringan listrik juga perlu ditingkatkan bersamaan.'],
  ]],
  [null, ['Kuliah tata kelola data: bandingkan model regulasi tiga kawasan.', 'Catat kata kunci pembeda: 个人权利, 市场创新, 国家安全.'], [
    ['欧盟模式以个人数据权利为核心。', 'Ōu méng mó shì yǐ gè rén shù jù quán lì wéi hé xīn.', 'Model Uni Eropa berpusat pada hak data pribadi.'],
    ['美国模式更强调市场创新和行业自律。', 'Měi guó mó shì gèng qiáng diào shì chǎng chuàng xīn hé háng yè zì lǜ.', 'Model Amerika lebih menekankan inovasi pasar dan pengaturan mandiri industri.'],
    ['中国模式则兼顾发展与安全。', 'Zhōng guó mó shì zé jiān gù fā zhǎn yǔ ān quán.', 'Model Tiongkok mempertimbangkan pembangunan dan keamanan sekaligus.'],
    ['跨境数据流动成为三种模式冲突的焦点。', 'Kuà jìng shù jù liú dòng chéng wéi sān zhǒng mó shì chōng tū de jiāo diǎn.', 'Aliran data lintas batas menjadi titik benturan ketiga model.'],
  ]],
  [null, ['Kuliah evaluasi riset: metrik bibliometrik dan kritiknya.', 'Tangkap istilah: 影响因子, 引用次数, 代表作.'], [
    ['影响因子衡量的是期刊，而不是单篇论文。', 'Yǐng xiǎng yīn zǐ héng liáng de shì qī kān, ér bú shì dān piān lùn wén.', 'Faktor dampak mengukur jurnal, bukan makalah tunggal.'],
    ['用它评价个人，本身就存在逻辑问题。', 'Yòng tā píng jià gè rén, běn shēn jiù cún zài luó jí wèn tí.', 'Memakainya untuk menilai individu sendiri sudah mengandung masalah logika.'],
    ['引用次数也受到学科规模的影响。', 'Yǐn yòng cì shù yě shòu dào xué kē guī mó de yǐng xiǎng.', 'Jumlah sitasi juga dipengaruhi ukuran bidang ilmu.'],
    ['代表作制度试图回归对内容的判断。', 'Dài biǎo zuò zhì dù shì tú huí guī duì nèi róng de pàn duàn.', 'Sistem karya representatif mencoba kembali menilai isi.'],
  ]],
  [null, ['Kuliah tata kelola kesehatan publik: kerangka "One Health" dan koordinasi antarsektor.', 'Catat sektor yang disebut.'], [
    ['"同一健康"理念强调人类、动物和环境健康的整体性。', '" tóng yí jiàn kāng " lǐ niàn qiáng diào rén lèi, dòng wù hé huán jìng jiàn kāng de zhěng tǐ xìng.', 'Konsep "Satu Kesehatan" menekankan keterpaduan kesehatan manusia, hewan, dan lingkungan.'],
    ['许多新发传染病来源于动物。', 'Xǔ duō xīn fā chuán rǎn bìng lái yuán yú dòng wù.', 'Banyak penyakit menular baru berasal dari hewan.'],
    ['因此需要卫生、农业和环保部门协同。', 'Yīn cǐ xū yào wèi shēng, nóng yè hé huán bǎo bù mén xié tóng.', 'Oleh karena itu sektor kesehatan, pertanian, dan lingkungan perlu bekerja sama.'],
    ['信息共享是协同的前提。', 'Xìn xī gòng xiǎng shì xié tóng de qián tí.', 'Berbagi informasi adalah prasyarat kerja sama.'],
  ]],
  [null, ['Kuliah reformasi penilaian pendidikan: sejarah ujian dan arah reformasi.', 'Tangkap tahun dan perubahan kebijakan.'], [
    ['高考制度恢复于一九七七年。', 'Gāo kǎo zhì dù huī fù yú yī jiǔ qī qī nián.', 'Sistem ujian masuk perguruan tinggi dipulihkan pada 1977.'],
    ['四十多年来，它为社会流动提供了重要通道。', 'Sì shí duō nián lái, tā wèi shè huì liú dòng tí gōng le zhòng yào tōng dào.', 'Selama lebih dari empat puluh tahun, ujian ini menjadi jalur penting mobilitas sosial.'],
    ['新高考改革引入了选考科目。', 'Xīn gāo kǎo gǎi gé yǐn rù le xuǎn kǎo kē mù.', 'Reformasi ujian baru memperkenalkan mata pelajaran pilihan.'],
    ['目的是给学生更多选择权。', 'Mù dì shì gěi xué shēng gèng duō xuǎn zé quán.', 'Tujuannya memberi murid lebih banyak hak memilih.'],
  ]],
  [null, ['Kuliah pasar tenaga kerja: teori pasar kerja tersegmentasi.', 'Catat ciri pasar primer dan sekunder.'], [
    ['劳动力市场分割理论把市场分为主要和次要两部分。', 'Láo dòng lì shì chǎng fēn gē lǐ lùn bǎ shì chǎng fēn wéi zhǔ yào hé cì yào liǎng bù fen.', 'Teori segmentasi pasar kerja membagi pasar menjadi bagian primer dan sekunder.'],
    ['主要市场工资高、稳定、有晋升机会。', 'Zhǔ yào shì chǎng gōng zī gāo, wěn dìng, yǒu jìn shēng jī huì.', 'Pasar primer bergaji tinggi, stabil, dan ada peluang naik jabatan.'],
    ['次要市场则相反。', 'Cì yào shì chǎng zé xiāng fǎn.', 'Pasar sekunder sebaliknya.'],
    ['两个市场之间的流动非常困难。', 'Liǎng gè shì chǎng zhī jiān de liú dòng fēi cháng kùn nán.', 'Perpindahan antara dua pasar ini sangat sulit.'],
  ]],
  [null, ['Kuliah regulasi keuangan: pelajaran dari krisis keuangan global.', 'Tangkap rantai sebab krisis.'], [
    ['二零零八年金融危机始于美国的次贷市场。', 'Èr líng líng bā nián jīn róng wēi jī shǐ yú měi guó de cì dài shì chǎng.', 'Krisis keuangan 2008 bermula dari pasar subprime Amerika.'],
    ['复杂的金融衍生品放大了风险。', 'Fù zá de jīn róng yǎn shēng pǐn fàng dà le fēng xiǎn.', 'Derivatif keuangan yang rumit memperbesar risiko.'],
    ['监管的缺位让风险在体系内迅速传染。', 'Jiān guǎn de quē wèi ràng fēng xiǎn zài tǐ xì nèi xùn sù chuán rǎn.', 'Absennya pengawasan membuat risiko cepat menular di dalam sistem.'],
    ['危机后，各国普遍加强了资本充足率要求。', 'Wēi jī hòu, gè guó pǔ biàn jiā qiáng le zī běn chōng zú lǜ yāo qiú.', 'Setelah krisis, negara-negara umumnya memperketat persyaratan rasio kecukupan modal.'],
  ]],
  [null, ['Kuliah regulasi lingkungan: konsep eksternalitas negatif.', 'Tangkap definisi dan contoh.'], [
    ['污染是一种典型的负外部性。', 'Wū rǎn shì yì zhǒng diǎn xíng de fù wài bù xìng.', 'Polusi adalah eksternalitas negatif yang khas.'],
    ['企业不承担污染成本，社会却要付出代价。', 'Qǐ yè bù chéng dān wū rǎn chéng běn, shè huì què yào fù chū dài jià.', 'Perusahaan tidak menanggung biaya polusi, tetapi masyarakat harus membayar harganya.'],
    ['环境规制的目的是让外部成本内部化。', 'Huán jìng guī zhì de mù dì shì ràng wài bù chéng běn nèi bù huà.', 'Tujuan regulasi lingkungan adalah menginternalisasi biaya eksternal.'],
    ['庇古税就是经典的解决方案。', 'Bì gǔ shuì jiù shì jīng diǎn de jiě jué fāng àn.', 'Pajak Pigou adalah solusi klasik.'],
  ]],
  [null, ['Kuliah antimonopoli: ciri ekonomi platform (efek jaringan, data) yang mempersulit regulasi.', 'Catat istilah: 网络效应, 赢者通吃.'], [
    ['平台经济具有显著的网络效应。', 'Píng tái jīng jì jù yǒu xiǎn zhù de wǎng luò xiào yìng.', 'Ekonomi platform memiliki efek jaringan yang signifikan.'],
    ['用户越多，平台对新用户越有吸引力。', 'Yòng hù yuè duō, píng tái duì xīn yòng hù yuè yǒu xī yǐn lì.', 'Semakin banyak pengguna, semakin menarik platform bagi pengguna baru.'],
    ['这容易形成"赢者通吃"的格局。', 'Zhè róng yì xíng chéng " yíng zhě tōng chī " de gé jú.', 'Ini mudah membentuk pola "pemenang mengambil semua".'],
    ['传统的市场份额标准难以准确衡量其支配力。', 'Chuán tǒng de shì chǎng fèn é biāo zhǔn nán yǐ zhǔn què héng liáng qí zhī pèi lì.', 'Standar pangsa pasar tradisional sulit mengukur daya dominasinya secara tepat.'],
  ]],
  [null, ['Kuliah kebijakan kependudukan: indikator demografi dasar.', 'Tangkap istilah: 总和生育率, 更替水平.'], [
    ['总和生育率低于二点一，人口长期将会减少。', 'Zǒng hé shēng yù lǜ dī yú èr diǎn yī, rén kǒu cháng qī jiāng huì jiǎn shǎo.', 'Jika angka kelahiran total di bawah 2,1, penduduk dalam jangka panjang akan berkurang.'],
    ['二点一被称为更替水平。', 'Èr diǎn yí bèi chēng wéi gēng tì shuǐ píng.', 'Angka 2,1 disebut tingkat penggantian.'],
    ['东亚多国的生育率已降至一点二以下。', 'Dōng yà duō guó de shēng yù lǜ yǐ jiàng zhì yì diǎn èr yǐ xià.', 'Angka kelahiran di banyak negara Asia Timur sudah turun di bawah 1,2.'],
    ['这在人类历史上是前所未有的。', 'Zhè zài rén lèi lì shǐ shàng shì qián suǒ wèi yǒu de.', 'Ini belum pernah terjadi dalam sejarah manusia.'],
  ]],
  [null, ['Kuliah pembangunan regional: teori kutub pertumbuhan dan efek limpahan.', 'Tangkap istilah: 增长极, 虹吸效应, 辐射带动.'], [
    ['增长极理论认为，发展首先集中在少数中心。', 'Zēng zhǎng jí lǐ lùn rèn wéi, fā zhǎn shǒu xiān jí zhōng zài shǎo shù zhōng xīn.', 'Teori kutub pertumbuhan berpendapat pembangunan pertama-tama terpusat di sedikit pusat.'],
    ['中心城市对周边有虹吸效应。', 'Zhōng xīn chéng shì duì zhōu biān yǒu hóng xī xiào yìng.', 'Kota pusat memiliki efek menyedot terhadap sekitarnya.'],
    ['但发展到一定阶段后，会产生辐射带动作用。', 'Dàn fā zhǎn dào yí dìng jiē duàn hòu, huì chǎn shēng fú shè dài dòng zuò yòng.', 'Tetapi setelah berkembang sampai tahap tertentu, akan muncul efek limpahan yang menarik daerah sekitar.'],
    ['政策的任务是加快从虹吸到辐射的转变。', 'Zhèng cè de rèn wu shì jiā kuài cóng hóng xī dào fú shè de zhuǎn biàn.', 'Tugas kebijakan adalah mempercepat peralihan dari menyedot ke melimpahkan.'],
  ]],
  [null, ['Kuliah layanan budaya publik: model pendanaan dan partisipasi sosial.', 'Catat peran negara, pasar, dan masyarakat.'], [
    ['公共文化服务以政府为主导。', 'Gōng gòng wén huà fú wù yǐ zhèng fǔ wéi zhǔ dǎo.', 'Layanan budaya publik dipimpin oleh pemerintah.'],
    ['同时鼓励社会力量参与。', 'Tóng shí gǔ lì shè huì lì liàng cān yù.', 'Sekaligus mendorong partisipasi kekuatan masyarakat.'],
    ['政府购买服务是一种常见的方式。', 'Zhèng fǔ gòu mǎi fú wù shì yì zhǒng cháng jiàn de fāng shì.', 'Pengadaan layanan oleh pemerintah adalah cara yang umum.'],
    ['关键是建立以群众评价为核心的考核机制。', 'Guān jiàn shì jiàn lì yǐ qún zhòng píng jià wéi hé xīn de kǎo hé jī zhì.', 'Kuncinya membangun mekanisme penilaian yang berpusat pada penilaian masyarakat.'],
  ]],
  [null, ['Kuliah perdagangan internasional: evolusi sistem perdagangan multilateral.', 'Tangkap urutan: GATT → WTO → perjanjian regional.'], [
    ['战后建立的关贸总协定推动了关税大幅下降。', 'Zhàn hòu jiàn lì de guān mào zǒng xié dìng tuī dòng le guān shuì dà fú xià jiàng.', 'GATT yang didirikan setelah perang mendorong penurunan tarif secara besar-besaran.'],
    ['世界贸易组织于一九九五年成立。', 'Shì jiè mào yì zǔ zhī yú yī jiǔ jiǔ wǔ nián chéng lì.', 'Organisasi Perdagangan Dunia didirikan pada 1995.'],
    ['近年来，多边谈判陷入停滞。', 'Jìn nián lái, duō biān tán pàn xiàn rù tíng zhì.', 'Beberapa tahun terakhir, negosiasi multilateral mandek.'],
    ['区域贸易协定因此迅速增加。', 'Qū yù mào yì xié dìng yīn cǐ xùn sù zēng jiā.', 'Karena itu perjanjian perdagangan regional bertambah pesat.'],
  ]],
  [null, ['Kuliah metode empiris: hierarki bukti dari korelasi hingga eksperimen acak.', 'Catat kelebihan dan batas tiap metode.'], [
    ['随机对照试验被视为因果推断的"金标准"。', 'Suí jī duì zhào shì yàn bèi shì wéi yīn guǒ tuī duàn de " jīn biāo zhǔn ".', 'Uji acak terkontrol dianggap "standar emas" inferensi kausal.'],
    ['但在政策研究中往往难以实施。', 'Dàn zài zhèng cè yán jiū zhōng wǎng wǎng nán yǐ shí shī.', 'Tetapi dalam penelitian kebijakan sering sulit dilaksanakan.'],
    ['自然实验提供了一种替代方案。', 'Zì rán shí yàn tí gōng le yì zhǒng tì dài fāng àn.', 'Eksperimen alami memberi sebuah solusi alternatif.'],
    ['工具变量法也是常用的识别策略。', 'Gōng jù biàn liàng fǎ yě shì cháng yòng de shí bié cè lüè.', 'Metode variabel instrumental juga strategi identifikasi yang umum dipakai.'],
  ]],
  [null, ['Kuliah evaluasi kebijakan: evaluasi proses vs evaluasi dampak.', 'Catat pertanyaan yang dijawab masing-masing.'], [
    ['过程评估回答的是：政策是否按计划执行？', 'Guò chéng píng gū huí dá de shì: zhèng cè shì fǒu àn jì huà zhí xíng?', 'Evaluasi proses menjawab: apakah kebijakan dilaksanakan sesuai rencana?'],
    ['影响评估回答的是：政策是否产生了预期效果？', 'Yǐng xiǎng píng gū huí dá de shì: zhèng cè shì fǒu chǎn shēng le yù qī xiào guǒ?', 'Evaluasi dampak menjawab: apakah kebijakan menghasilkan efek yang diharapkan?'],
    ['二者缺一，评估都不完整。', 'Èr zhě quē yī, píng gū dōu bù wán zhěng.', 'Kurang salah satu, evaluasinya tidak lengkap.'],
    ['执行走样常常是效果不佳的原因。', 'Zhí xíng zǒu yàng cháng cháng shì xiào guǒ bù jiā de yuán yīn.', 'Pelaksanaan yang menyimpang sering menjadi penyebab hasil yang buruk.'],
  ]],
  [null, ['Menyimak presentasi policy paper (portfolio): catat rekomendasi dan pertanyaan yang ingin diajukan.', 'Fokus pada asumsi biaya dan kelayakan.'], [
    ['报告提出了三项具体建议。', 'Bào gào tí chū le sān xiàng jù tǐ jiàn yì.', 'Laporan mengajukan tiga rekomendasi konkret.'],
    ['第一项涉及财政投入，预计每年两亿元。', 'Dì yī xiàng shè jí cái zhèng tóu rù, yù jì měi nián liǎng yì yuán.', 'Rekomendasi pertama menyangkut anggaran, diperkirakan dua ratus juta yuan per tahun.'],
    ['但报告没有说明资金来源。', 'Dàn bào gào méi yǒu shuō míng zī jīn lái yuán.', 'Tetapi laporan tidak menjelaskan sumber dananya.'],
    ['我会就此向报告人提问。', 'Wǒ huì jiù cǐ xiàng bào gào rén tí wèn.', 'Saya akan bertanya kepada penyaji tentang hal ini.'],
  ]],
];
