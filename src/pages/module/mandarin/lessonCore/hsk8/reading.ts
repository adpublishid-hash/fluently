import type { LessonCoreTuple } from '../types';

// Reading HSK 8 (Bacaan kritis + policy theme) — one entry per lesson (index = lesson - 1).
export const reading: LessonCoreTuple[] = [
  [null, ['Bacaan kritis kebijakan industri: bedakan korelasi keberhasilan dengan efek kebijakan.', 'Tanya: apakah industri akan tumbuh tanpa kebijakan itu?'], [
    ['报告把新能源汽车的成功归功于补贴政策。', 'Bào gào bǎ xīn néng yuán qì chē de chéng gōng guī gōng yú bǔ tiē zhèng cè.', 'Laporan menganggap keberhasilan mobil energi baru berkat kebijakan subsidi.'],
    ['但同期全球市场也在快速扩张。', 'Dàn tóng qī quán qiú shì chǎng yě zài kuài sù kuò zhāng.', 'Tetapi pada periode yang sama pasar global juga tumbuh pesat.'],
    ['缺少反事实分析，就难以判断政策的真实贡献。', 'Quē shǎo fǎn shì shí fēn xī, jiù nán yǐ pàn duàn zhèng cè de zhēn shí gòng xiàn.', 'Tanpa analisis kontrafaktual, sulit menilai kontribusi nyata kebijakan.'],
    ['归因需要更严格的证据。', 'Guī yīn xū yào gèng yán gé de zhèng jù.', 'Atribusi membutuhkan bukti yang lebih ketat.'],
  ]],
  [null, ['Bacaan kritis fiskal: periksa apakah tulisan memisahkan utang pusat dan daerah, eksplisit dan implisit.', 'Angka total bisa menyembunyikan risiko.'], [
    ['文章称政府负债率处于"安全区间"。', 'Wén zhāng chēng zhèng fǔ fù zhài lǜ chǔ yú " ān quán qū jiān ".', 'Artikel menyebut rasio utang pemerintah berada di "zona aman".'],
    ['但它只计算了中央政府的显性债务。', 'Dàn tā zhǐ jì suàn le zhōng yāng zhèng fǔ de xiǎn xìng zhài wù.', 'Tetapi artikel hanya menghitung utang eksplisit pemerintah pusat.'],
    ['地方融资平台的债务并未纳入。', 'Dì fāng róng zī píng tái de zhài wù bìng wèi nà rù.', 'Utang platform pembiayaan daerah tidak dimasukkan.'],
    ['口径不同，结论可能截然相反。', 'Kǒu jìng bù tóng, jié lùn kě néng jié rán xiāng fǎn.', 'Dengan cakupan berbeda, kesimpulannya bisa sangat bertolak belakang.'],
  ]],
  [null, ['Bacaan kritis jaminan sosial: perhatikan siapa yang tidak tercakup statistik "cakupan menyeluruh".', 'Cakupan ≠ kecukupan manfaat.'], [
    ['"全民参保"并不意味着"全民有保障"。', '" quán mín cān bǎo " bìng bú yì wèi zhe " quán mín yǒu bǎo zhàng ".', '"Semua rakyat ikut asuransi" tidak berarti "semua rakyat terlindungi".'],
    ['部分农村老人每月的养老金只有一两百元。', 'Bù fen nóng cūn lǎo rén měi yuè de yǎng lǎo jīn zhǐ yǒu yì liǎng bǎi yuán.', 'Sebagian lansia desa hanya menerima pensiun satu-dua ratus yuan per bulan.'],
    ['覆盖率高，保障水平却很低。', 'Fù gài lǜ gāo, bǎo zhàng shuǐ píng què hěn dī.', 'Tingkat cakupannya tinggi, tetapi tingkat perlindungannya rendah.'],
    ['仅看覆盖率会高估制度的成效。', 'Jǐn kàn fù gài lǜ huì gāo gū zhì dù de chéng xiào.', 'Hanya melihat tingkat cakupan akan melebih-lebihkan keberhasilan sistem.'],
  ]],
  [null, ['Bacaan kritis reformasi hukou: periksa kesenjangan antara aturan tertulis dan praktik.', 'Syarat administratif bisa menjadi hambatan terselubung.'], [
    ['政策文件宣布全面放开落户限制。', 'Zhèng cè wén jiàn xuān bù quán miàn fàng kāi luò hù xiàn zhì.', 'Dokumen kebijakan mengumumkan pembatasan pendaftaran hukou dilonggarkan sepenuhnya.'],
    ['但实际办理中仍需提供多项证明材料。', 'Dàn shí jì bàn lǐ zhōng réng xū tí gōng duō xiàng zhèng míng cái liào.', 'Tetapi dalam praktik pengurusannya masih perlu menyerahkan berbagai dokumen bukti.'],
    ['这些隐性门槛让很多人望而却步。', 'Zhè xiē yǐn xìng mén kǎn ràng hěn duō rén wàng ér què bù.', 'Ambang tersembunyi ini membuat banyak orang mundur.'],
    ['评价改革，不能只看文件，还要看执行。', 'Píng jià gǎi gé, bù néng zhǐ kàn wén jiàn, hái yào kàn zhí xíng.', 'Menilai reformasi tidak bisa hanya melihat dokumen, tetapi juga pelaksanaannya.'],
  ]],
  [null, ['Bacaan kritis transisi energi: kepentingan penulis (industri batu bara vs energi baru).', 'Periksa afiliasi dan pendanaan.'], [
    ['这篇唱衰新能源的文章由一家煤炭行业协会发布。', 'Zhè piān chàng shuāi xīn néng yuán de wén zhāng yóu yì jiā méi tàn háng yè xié huì fā bù.', 'Artikel yang meremehkan energi baru ini diterbitkan oleh sebuah asosiasi industri batu bara.'],
    ['作者的立场与其利益高度一致。', 'Zuò zhě de lì chǎng yǔ qí lì yì gāo dù yí zhì.', 'Sikap penulis sangat selaras dengan kepentingannya.'],
    ['这并不自动说明其观点错误。', 'Zhè bìng bú zì dòng shuō míng qí guān diǎn cuò wù.', 'Hal ini tidak otomatis berarti pandangannya salah.'],
    ['但读者需要更仔细地核查其数据。', 'Dàn dú zhě xū yào gèng zǐ xì dì hé chá qí shù jù.', 'Tetapi pembaca perlu memeriksa datanya lebih teliti.'],
  ]],
  [null, ['Bacaan kritis tata kelola data: dilema persetujuan pengguna ("informed consent").', 'Persetujuan formal ≠ persetujuan bermakna.'], [
    ['平台声称所有数据收集都经过了用户同意。', 'Píng tái shēng chēng suǒ yǒu shù jù shōu jí dōu jīng guò le yòng hù tóng yì.', 'Platform mengklaim semua pengumpulan data sudah mendapat persetujuan pengguna.'],
    ['但隐私条款长达上万字，几乎没人读完。', 'Dàn yǐn sī tiáo kuǎn cháng dá shàng wàn zì, jī hū méi rén dú wán.', 'Tetapi ketentuan privasinya puluhan ribu karakter, hampir tidak ada yang membacanya sampai habis.'],
    ['不同意就无法使用服务。', 'Bù tóng yì jiù wú fǎ shǐ yòng fú wù.', 'Jika tidak setuju, layanan tidak bisa dipakai.'],
    ['这样的"同意"是否真正自愿，值得怀疑。', 'Zhè yàng de " tóng yì " shì fǒu zhēn zhèng zì yuàn, zhí dé huái yí.', 'Apakah "persetujuan" seperti ini benar-benar sukarela patut diragukan.'],
  ]],
  [null, ['Bacaan kritis evaluasi riset: data peringkat universitas dan apa yang tidak diukurnya.', 'Indikator membentuk perilaku.'], [
    ['大学排名高度依赖论文和引用数据。', 'Dà xué pái míng gāo dù yī lài lùn wén hé yǐn yòng shù jù.', 'Peringkat universitas sangat bergantung pada data makalah dan sitasi.'],
    ['教学质量和社会服务很难被量化。', 'Jiào xué zhì liàng hé shè huì fú wù hěn nán bèi liáng huà.', 'Kualitas pengajaran dan layanan masyarakat sulit dikuantifikasi.'],
    ['于是高校纷纷把资源投向发表论文。', 'Yú shì gāo xiào fēn fēn bǎ zī yuán tóu xiàng fā biǎo lùn wén.', 'Akibatnya perguruan tinggi ramai-ramai mengarahkan sumber daya ke publikasi.'],
    ['指标本身改变了被测量的对象。', 'Zhǐ biāo běn shēn gǎi biàn le bèi cè liáng de duì xiàng.', 'Indikator itu sendiri mengubah objek yang diukur.'],
  ]],
  [null, ['Bacaan kritis kesehatan publik: kebijakan berbasis bukti vs keputusan reaktif.', 'Cari apakah evaluasi biaya-manfaat disebut.'], [
    ['文章赞扬了某市的快速封控措施。', 'Wén zhāng zàn yáng le mǒu shì de kuài sù fēng kòng cuò shī.', 'Artikel memuji langkah pembatasan cepat sebuah kota.'],
    ['却没有讨论其经济和社会成本。', 'Què méi yǒu tǎo lùn qí jīng jì hé shè huì chéng běn.', 'Tetapi tidak membahas biaya ekonomi dan sosialnya.'],
    ['公共卫生决策需要权衡多重目标。', 'Gōng gòng wèi shēng jué cè xū yào quán héng duō chóng mù biāo.', 'Keputusan kesehatan publik perlu menimbang banyak tujuan.'],
    ['只谈收益不谈成本的评价是片面的。', 'Zhī tán shōu yì bù tán chéng běn de píng jià shì piàn miàn de.', 'Penilaian yang hanya membahas manfaat tanpa biaya adalah sepihak.'],
  ]],
  [null, ['Bacaan kritis penilaian pendidikan: periksa apakah reformasi memperlebar ketimpangan.', 'Kebijakan netral bisa berdampak tidak netral.'], [
    ['综合素质评价鼓励学生发展特长。', 'Zōng hé sù zhì píng jià gǔ lì xué shēng fā zhǎn tè cháng.', 'Penilaian kompetensi menyeluruh mendorong murid mengembangkan bakat.'],
    ['但培养特长需要大量的家庭投入。', 'Dàn péi yǎng tè cháng xū yào dà liàng de jiā tíng tóu rù.', 'Tetapi mengembangkan bakat memerlukan investasi keluarga yang besar.'],
    ['农村学生在这方面明显处于劣势。', 'Nóng cūn xué shēng zài zhè fāng miàn míng xiǎn chǔ yú liè shì.', 'Murid desa jelas tertinggal dalam hal ini.'],
    ['看似公平的改革，可能加剧不公平。', 'Kàn sì gōng píng de gǎi gé, kě néng jiā jù bù gōng píng.', 'Reformasi yang tampak adil bisa memperparah ketidakadilan.'],
  ]],
  [null, ['Bacaan kritis pasar kerja: definisi "pengangguran" dalam statistik.', 'Siapa yang tidak terhitung?'], [
    ['官方失业率只统计正在找工作的人。', 'Guān fāng shī yè lǜ zhǐ tǒng jì zhèng zài zhǎo gōng zuò de rén.', 'Tingkat pengangguran resmi hanya menghitung orang yang sedang mencari kerja.'],
    ['放弃求职的人并不计入其中。', 'Fàng qì qiú zhí de rén bìng bú jì rù qí zhōng.', 'Orang yang berhenti mencari kerja tidak dihitung di dalamnya.'],
    ['因此失业率下降，未必意味着就业改善。', 'Yīn cǐ shī yè lǜ xià jiàng, wèi bì yì wèi zhe jiù yè gǎi shàn.', 'Karena itu turunnya angka pengangguran belum tentu berarti lapangan kerja membaik.'],
    ['还需要结合劳动参与率来判断。', 'Hái xū yào jié hé láo dòng cān yù lǜ lái pàn duàn.', 'Perlu dinilai bersama dengan tingkat partisipasi angkatan kerja.'],
  ]],
  [null, ['Bacaan kritis regulasi keuangan: inovasi keuangan sebagai label untuk menghindari regulasi.', 'Bedakan inovasi nyata dan arbitrase regulasi.'], [
    ['一些互联网金融产品自称"创新"。', 'Yì xiē hù lián wǎng jīn róng chǎn pǐn zì chēng " chuàng xīn ".', 'Beberapa produk keuangan internet menyebut diri sebagai "inovasi".'],
    ['实质上是在规避对传统金融的监管要求。', 'Shí zhì shàng shì zài guī bì duì chuán tǒng jīn róng de jiān guǎn yāo qiú.', 'Pada hakikatnya menghindari persyaratan pengawasan untuk keuangan tradisional.'],
    ['这种监管套利积累了大量风险。', 'Zhè zhǒng jiān guǎn tào lì jī lěi le dà liàng fēng xiǎn.', 'Arbitrase regulasi semacam ini menumpuk banyak risiko.'],
    ['同样的业务应当适用同样的规则。', 'Tóng yàng de yè wù yīng dāng shì yòng tóng yàng de guī zé.', 'Bisnis yang sama seharusnya tunduk pada aturan yang sama.'],
  ]],
  [null, ['Bacaan kritis regulasi lingkungan: "kebocoran karbon" dan batas kebijakan lokal.', 'Tanya: apakah emisi benar berkurang atau hanya pindah?'], [
    ['某地严格的排放标准使本地污染明显下降。', 'Mǒu dì yán gé de pái fàng biāo zhǔn shǐ běn dì wū rǎn míng xiǎn xià jiàng.', 'Standar emisi ketat suatu daerah membuat polusi lokal jelas menurun.'],
    ['但部分高污染企业迁往了标准较松的地区。', 'Dàn bù fen gāo wū rǎn qǐ yè qiān wǎng le biāo zhǔn jiào sōng de dì qū.', 'Tetapi sebagian perusahaan berpolusi tinggi pindah ke daerah yang standarnya lebih longgar.'],
    ['总排放量未必减少。', 'Zǒng pái fàng liàng wèi bì jiǎn shǎo.', 'Total emisi belum tentu berkurang.'],
    ['评价环境政策需要更大的视野。', 'Píng jià huán jìng zhèng cè xū yào gèng dà de shì yě.', 'Menilai kebijakan lingkungan membutuhkan wawasan yang lebih luas.'],
  ]],
  [null, ['Bacaan kritis antimonopoli: argumen "harga murah = konsumen untung" dan batasnya.', 'Monopoli bisa merugikan lewat kualitas, pilihan, dan inovasi.'], [
    ['平台辩称其价格低廉，消费者受益。', 'Píng tái biàn chēng qí jià gé dī lián, xiāo fèi zhě shòu yì.', 'Platform berdalih harganya murah sehingga konsumen diuntungkan.'],
    ['但低价可能是排挤对手的短期策略。', 'Dàn dī jià kě néng shì pái jǐ duì shǒu de duǎn qī cè lüè.', 'Tetapi harga murah bisa jadi strategi jangka pendek untuk menyingkirkan pesaing.'],
    ['一旦形成垄断，价格和服务都可能变化。', 'Yí dàn xíng chéng lǒng duàn, jià gé hé fú wù dōu kě néng biàn huà.', 'Begitu monopoli terbentuk, harga dan layanan bisa berubah.'],
    ['消费者福利不应只用价格来衡量。', 'Xiāo fèi zhě fú lì bù yīng zhǐ yòng jià gé lái héng liáng.', 'Kesejahteraan konsumen tidak sepatutnya hanya diukur dengan harga.'],
  ]],
  [null, ['Bacaan kritis kebijakan kependudukan: insentif finansial dan efektivitasnya.', 'Bandingkan biaya insentif dengan biaya membesarkan anak.'], [
    ['某市宣布每生一个孩子补贴一万元。', 'Mǒu shì xuān bù měi shēng yí gè hái zi bǔ tiē yí wàn yuán.', 'Sebuah kota mengumumkan subsidi sepuluh ribu yuan untuk setiap anak yang lahir.'],
    ['然而养育一个孩子的成本动辄数十万。', 'Rán ér yǎng yù yí gè hái zi de chéng běn dòng zhé shù shí wàn.', 'Namun biaya membesarkan seorang anak sering mencapai ratusan ribu.'],
    ['一次性补贴的激励作用相当有限。', 'Yí cì xìng bǔ tiē de jī lì zuò yòng xiāng dāng yǒu xiàn.', 'Efek insentif subsidi sekali bayar cukup terbatas.'],
    ['住房、教育和托育等配套政策更为关键。', 'Zhù fáng, jiào yù hé tuō yù děng pèi tào zhèng cè gèng wéi guān jiàn.', 'Kebijakan pendukung seperti perumahan, pendidikan, dan penitipan anak lebih penting.'],
  ]],
  [null, ['Bacaan kritis pembangunan regional: angka pertumbuhan daerah tertinggal vs kualitas pertumbuhan.', 'Pertumbuhan dari investasi tunggal bisa rapuh.'], [
    ['报告显示西部某省增速连续三年全国第一。', 'Bào gào xiǎn shì xī bù mǒu shěng zēng sù lián xù sān nián quán guó dì yī.', 'Laporan menunjukkan pertumbuhan sebuah provinsi barat nomor satu nasional tiga tahun berturut-turut.'],
    ['但增长主要依靠基础设施投资拉动。', 'Dàn zēng zhǎng zhǔ yào yī kào jī chǔ shè shī tóu zī lā dòng.', 'Tetapi pertumbuhan itu terutama digerakkan investasi infrastruktur.'],
    ['一旦投资放缓，增长可能难以为继。', 'Yí dàn tóu zī fàng huǎn, zēng zhǎng kě néng nán yǐ wéi jì.', 'Begitu investasi melambat, pertumbuhan mungkin sulit dipertahankan.'],
    ['评价区域发展需要关注内生动力。', 'Píng jià qū yù fā zhǎn xū yào guān zhù nèi shēng dòng lì.', 'Menilai pembangunan regional perlu memperhatikan dorongan internalnya.'],
  ]],
  [null, ['Bacaan kritis layanan budaya publik: angka pengunjung sebagai indikator kinerja.', 'Indikator yang mudah dihitung sering bukan yang terpenting.'], [
    ['考核以举办活动的场次为主要指标。', 'Kǎo hé yǐ jǔ bàn huó dòng de chǎng cì wéi zhǔ yào zhǐ biāo.', 'Penilaian memakai jumlah acara yang diselenggarakan sebagai indikator utama.'],
    ['于是一些单位为凑数而办活动。', 'Yú shì yì xiē dān wèi wèi còu shù ér bàn huó dòng.', 'Akibatnya sebagian unit mengadakan acara hanya untuk menggenapkan angka.'],
    ['活动多了，质量却下降了。', 'Huó dòng duō le, zhì liàng què xià jiàng le.', 'Acaranya bertambah, tetapi kualitasnya menurun.'],
    ['这是典型的指标异化。', 'Zhè shì diǎn xíng de zhǐ biāo yì huà.', 'Ini contoh khas penyimpangan indikator.'],
  ]],
  [null, ['Bacaan kritis aturan perdagangan: istilah "standar tinggi" dan siapa yang menetapkannya.', 'Standar bisa berfungsi sebagai hambatan.'], [
    ['发达国家主张制定"高标准"的贸易规则。', 'Fā dá guó jiā zhǔ zhāng zhì dìng " gāo biāo zhǔn " de mào yì guī zé.', 'Negara maju menganjurkan penyusunan aturan perdagangan "berstandar tinggi".'],
    ['这些标准往往反映的是它们自身的产业优势。', 'Zhè xiē biāo zhǔn wǎng wǎng fǎn yìng de shì tā men zì shēn de chǎn yè yōu shì.', 'Standar-standar ini sering mencerminkan keunggulan industri mereka sendiri.'],
    ['对发展中国家而言，可能构成新的贸易壁垒。', 'Duì fā zhǎn zhōng guó jiā ér yán, kě néng gòu chéng xīn de mào yì bì lěi.', 'Bagi negara berkembang, hal ini bisa menjadi hambatan perdagangan baru.'],
    ['"高标准"并非价值中立的概念。', '" gāo biāo zhǔn " bìng fēi jià zhí zhōng lì de gài niàn.', '"Standar tinggi" bukanlah konsep yang netral nilai.'],
  ]],
  [null, ['Bacaan kritis metode empiris: periksa ukuran sampel, variabel kontrol, dan bias publikasi.', 'Hasil signifikan lebih mudah diterbitkan.'], [
    ['该研究的样本量不足一百。', 'Gāi yán jiū de yàng běn liàng bù zú yì bǎi.', 'Ukuran sampel penelitian itu kurang dari seratus.'],
    ['且没有控制家庭收入这一关键变量。', 'Qiě méi yǒu kòng zhì jiā tíng shōu rù zhè yì guān jiàn biàn liàng.', 'Dan tidak mengendalikan variabel kunci pendapatan keluarga.'],
    ['此外，只有显著的结果更容易被发表。', 'Cǐ wài, zhǐ yǒu xiǎn zhù de jié guǒ gèng róng yì bèi fā biǎo.', 'Selain itu, hanya hasil yang signifikan lebih mudah diterbitkan.'],
    ['单项研究的结论应当谨慎对待。', 'Dān xiàng yán jiū de jié lùn yīng dāng jǐn shèn duì dài.', 'Kesimpulan satu penelitian sebaiknya disikapi dengan hati-hati.'],
  ]],
  [null, ['Bacaan kritis evaluasi kebijakan: evaluasi oleh pelaksana sendiri (konflik kepentingan).', 'Independensi evaluator menentukan kredibilitas.'], [
    ['这份评估报告由政策执行部门自行完成。', 'Zhè fèn píng gū bào gào yóu zhèng cè zhí xíng bù mén zì xíng wán chéng.', 'Laporan evaluasi ini dibuat sendiri oleh instansi pelaksana kebijakan.'],
    ['结论几乎全部是正面的。', 'Jié lùn jī hū quán bù shì zhèng miàn de.', 'Kesimpulannya hampir seluruhnya positif.'],
    ['缺乏独立的第三方评估。', 'Quē fá dú lì de dì sān fāng píng gū.', 'Kurang evaluasi pihak ketiga yang independen.'],
    ['自我评估的可信度天然受限。', 'Zì wǒ píng gū de kě xìn dù tiān rán shòu xiàn.', 'Kredibilitas evaluasi diri secara alami terbatas.'],
  ]],
  [null, ['Bacaan kritis policy paper (portfolio): telaah rekan atas draf sesama mahasiswa.', 'Struktur umpan balik: kekuatan → kelemahan → saran.'], [
    ['这份报告的问题界定清晰，数据翔实。', 'Zhè fèn bào gào de wèn tí jiè dìng qīng xī, shù jù xiáng shí.', 'Laporan ini perumusan masalahnya jelas dan datanya lengkap.'],
    ['但政策选项之间缺乏系统比较。', 'Dàn zhèng cè xuǎn xiàng zhī jiān quē fá xì tǒng bǐ jiào.', 'Tetapi opsi-opsi kebijakan kurang dibandingkan secara sistematis.'],
    ['建议增加成本收益分析。', 'Jiàn yì zēng jiā chéng běn shōu yì fēn xī.', 'Disarankan menambahkan analisis biaya-manfaat.'],
    ['并说明推荐方案的实施风险。', 'Bìng shuō míng tuī jiàn fāng àn de shí shī fēng xiǎn.', 'Dan menjelaskan risiko pelaksanaan opsi yang direkomendasikan.'],
  ]],
];
