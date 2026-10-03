import type { LessonCoreTuple } from '../types';

// Vocabulary HSK 7 (Kosakata tematik + theme) — one entry per lesson (index = lesson - 1).
export const vocabulary: LessonCoreTuple[] = [
  [null, ['Istilah pembaruan kota: 旧城改造, 棚户区, 历史街区, 绅士化, 原住民, 公共空间.', '绅士化 = gentrifikasi (warga lama tergeser oleh pendatang mampu).'], [
    ['棚户区改造改善了居民的居住条件。', 'Péng hù qū gǎi zào gǎi shàn le jū mín de jū zhù tiáo jiàn.', 'Renovasi permukiman kumuh memperbaiki kondisi tempat tinggal warga.'],
    ['绅士化导致原住民被迫外迁。', 'Shēn shì huà dǎo zhì yuán zhù mín bèi pò wài qiān.', 'Gentrifikasi membuat penduduk asli terpaksa pindah keluar.'],
    ['历史街区需要整体保护。', 'Lì shǐ jiē qū xū yào zhěng tǐ bǎo hù.', 'Kawasan bersejarah perlu dilestarikan secara menyeluruh.'],
    ['城市需要更多高质量的公共空间。', 'Chéng shì xū yào gèng duō gāo zhì liàng de gōng gòng kōng jiān.', 'Kota membutuhkan lebih banyak ruang publik berkualitas.'],
  ]],
  [null, ['Istilah kesenjangan digital: 接入, 数字素养, 适老化, 信息无障碍, 数字包容.', 'Kolokasi: 提升数字素养, 推进适老化改造.'], [
    ['提升全民数字素养是一项长期任务。', 'Tí shēng quán mín shù zì sù yǎng shì yí xiàng cháng qī rèn wu.', 'Meningkatkan literasi digital seluruh rakyat adalah tugas jangka panjang.'],
    ['政府网站正在推进适老化改造。', 'Zhèng fǔ wǎng zhàn zhèng zài tuī jìn shì lǎo huà gǎi zào.', 'Situs pemerintah sedang menjalani penyesuaian ramah lansia.'],
    ['信息无障碍关系到残障人士的权利。', 'Xìn xī wú zhàng ài guān xì dào cán zhàng rén shì de quán lì.', 'Aksesibilitas informasi berkaitan dengan hak penyandang disabilitas.'],
    ['数字包容意味着不让任何人掉队。', 'Shù zì bāo róng yì wèi zhe bú ràng rèn hé rén diào duì.', 'Inklusi digital berarti tidak membiarkan siapa pun tertinggal.'],
  ]],
  [null, ['Istilah penuaan: 老龄化, 高龄化, 抚养比, 养老金, 银发经济, 长期护理.', '银发经济 = ekonomi perak (pasar lansia).'], [
    ['银发经济蕴含着巨大的市场潜力。', 'Yín fà jīng jì yùn hán zhe jù dà de shì chǎng qián lì.', 'Ekonomi perak mengandung potensi pasar yang besar.'],
    ['老年抚养比持续攀升。', 'Lǎo nián fǔ yǎng bǐ chí xù pān shēng.', 'Rasio ketergantungan lansia terus naik.'],
    ['养老金的可持续性面临考验。', 'Yǎng lǎo jīn de kě chí xù xìng miàn lín kǎo yàn.', 'Keberlanjutan dana pensiun menghadapi ujian.'],
    ['长期护理服务供不应求。', 'Cháng qī hù lǐ fú wù gōng bú yìng qiú.', 'Layanan perawatan jangka panjang tidak mencukupi permintaan.'],
  ]],
  [null, ['Istilah keadilan pendidikan: 教育公平, 优质均衡, 学区房, 升学, 减负, 补偿性政策.', '学区房 = rumah di zona sekolah unggulan.'], [
    ['学区房价格反映了教育资源的不均衡。', 'Xué qū fáng jià gé fǎn yìng le jiào yù zī yuán de bù jūn héng.', 'Harga rumah di zona sekolah mencerminkan ketimpangan sumber daya pendidikan.'],
    ['补偿性政策向农村学生倾斜。', 'Bǔ cháng xìng zhèng cè xiàng nóng cūn xué shēng qīng xié.', 'Kebijakan kompensasi berpihak pada murid desa.'],
    ['义务教育要实现优质均衡发展。', 'Yì wù jiào yù yào shí xiàn yōu zhì jūn héng fā zhǎn.', 'Pendidikan wajib harus mencapai perkembangan merata yang berkualitas.'],
    ['升学压力层层传导到小学。', 'Shēng xué yā lì céng céng chuán dǎo dào xiǎo xué.', 'Tekanan masuk sekolah lanjutan menjalar lapis demi lapis sampai ke SD.'],
  ]],
  [null, ['Istilah iklim: 温室气体, 碳达峰, 碳中和, 极端天气, 减缓, 适应.', '减缓 (mitigasi) vs 适应 (adaptasi).'], [
    ['碳达峰之后才能逐步走向碳中和。', 'Tàn dá fēng zhī hòu cái néng zhú bù zǒu xiàng tàn zhōng hé.', 'Setelah puncak emisi karbon tercapai, baru bisa bertahap menuju netralitas karbon.'],
    ['应对气候变化需要减缓与适应并重。', 'Yìng duì qì hòu biàn huà xū yào jiǎn huǎn yǔ shì yìng bìng zhòng.', 'Menghadapi perubahan iklim perlu mitigasi dan adaptasi sama-sama diutamakan.'],
    ['极端天气事件的频率明显增加。', 'Jí duān tiān qì shì jiàn de pín lǜ míng xiǎn zēng jiā.', 'Frekuensi peristiwa cuaca ekstrem jelas meningkat.'],
    ['温室气体排放主要来自能源部门。', 'Wēn shì qì tǐ pái fàng zhǔ yào lái zì néng yuán bù mén.', 'Emisi gas rumah kaca terutama berasal dari sektor energi.'],
  ]],
  [null, ['Istilah etika AI: 算法偏见, 可解释性, 自主性, 问责, 人机协作, 深度伪造.', '深度伪造 = deepfake.'], [
    ['深度伪造技术对新闻真实性构成威胁。', 'Shēn dù wěi zào jì shù duì xīn wén zhēn shí xìng gòu chéng wēi xié.', 'Teknologi deepfake menjadi ancaman bagi kebenaran berita.'],
    ['提高模型的可解释性是研究热点。', 'Tí gāo mó xíng de kě jiě shì xìng shì yán jiū rè diǎn.', 'Meningkatkan keterjelasan model adalah topik riset hangat.'],
    ['算法偏见往往源于训练数据。', 'Suàn fǎ piān jiàn wǎng wǎng yuán yú xùn liàn shù jù.', 'Bias algoritma sering berasal dari data latih.'],
    ['未来的工作模式将是人机协作。', 'Wèi lái de gōng zuò mó shì jiāng shì rén jī xié zuò.', 'Pola kerja masa depan adalah kolaborasi manusia-mesin.'],
  ]],
  [null, ['Istilah ekosistem informasi: 信息茧房, 流量, 谣言, 辟谣, 自媒体, 把关人.', '把关人 = penjaga gerbang informasi (gatekeeper).'], [
    ['自媒体的兴起削弱了传统把关人的作用。', 'Zì méi tǐ de xīng qǐ xuē ruò le chuán tǒng bǎ guān rén de zuò yòng.', 'Bangkitnya media mandiri melemahkan peran penjaga gerbang tradisional.'],
    ['有些内容为了流量不择手段。', 'Yǒu xiē nèi róng wèi le liú liàng bù zé shǒu duàn.', 'Sebagian konten menghalalkan segala cara demi trafik.'],
    ['官方及时辟谣，平息了恐慌。', 'Guān fāng jí shí pì yáo, píng xī le kǒng huāng.', 'Pihak resmi segera membantah desas-desus dan meredakan kepanikan.'],
    ['走出信息茧房需要主动接触不同观点。', 'Zǒu chū xìn xī jiǎn fáng xū yào zhǔ dòng jiē chù bù tóng guān diǎn.', 'Keluar dari kepompong informasi perlu aktif berinteraksi dengan pandangan berbeda.'],
  ]],
  [null, ['Istilah konsumerisme: 超前消费, 消费升级, 符号消费, 攀比, 理性消费, 极简.', '符号消费 = konsumsi simbolik (membeli makna/status).'], [
    ['攀比心理推动了超前消费。', 'Pān bǐ xīn lǐ tuī dòng le chāo qián xiāo fèi.', 'Mental ingin menyaingi orang lain mendorong konsumsi melebihi kemampuan.'],
    ['奢侈品消费本质上是一种符号消费。', 'Shē chǐ pǐn xiāo fèi běn zhì shàng shì yì zhǒng fú hào xiāo fèi.', 'Konsumsi barang mewah pada hakikatnya adalah konsumsi simbolik.'],
    ['消费升级不等于盲目追求高价。', 'Xiāo fèi shēng jí bù děng yú máng mù zhuī qiú gāo jià.', 'Peningkatan kualitas konsumsi tidak sama dengan mengejar harga mahal secara membabi buta.'],
    ['越来越多的人选择极简的生活方式。', 'Yuè lái yuè duō de rén xuǎn zé jí jiǎn de shēng huó fāng shì.', 'Semakin banyak orang memilih gaya hidup minimalis.'],
  ]],
  [null, ['Istilah identitas budaya: 文化认同, 本土化, 全球化, 混杂性, 文化自信, 侨民.', '混杂性 = hibriditas budaya.'], [
    ['文化自信来自对自身文化的深刻理解。', 'Wén huà zì xìn lái zì duì zì shēn wén huà de shēn kè lǐ jiě.', 'Kepercayaan diri budaya berasal dari pemahaman mendalam atas budaya sendiri.'],
    ['跨国公司在营销中注重本土化。', 'Kuà guó gōng sī zài yíng xiāo zhōng zhù zhòng běn tǔ huà.', 'Perusahaan multinasional menekankan lokalisasi dalam pemasaran.'],
    ['移民文化呈现出明显的混杂性。', 'Yí mín wén huà chéng xiàn chū míng xiǎn de hùn zá xìng.', 'Budaya imigran menampilkan hibriditas yang jelas.'],
    ['侨民在两国之间扮演着桥梁角色。', 'Qiáo mín zài liǎng guó zhī jiān bàn yǎn zhe qiáo liáng jué sè.', 'Diaspora berperan sebagai jembatan antara dua negara.'],
  ]],
  [null, ['Istilah kesehatan masyarakat: 疾控, 流行病学, 健康素养, 分级诊疗, 公共卫生事件.', '分级诊疗 = sistem rujukan berjenjang.'], [
    ['分级诊疗缓解了大医院的压力。', 'Fēn jí zhěn liáo huǎn jiě le dà yī yuàn de yā lì.', 'Sistem rujukan berjenjang meringankan tekanan rumah sakit besar.'],
    ['居民健康素养水平逐年提高。', 'Jū mín jiàn kāng sù yǎng shuǐ píng zhú nián tí gāo.', 'Tingkat literasi kesehatan warga meningkat dari tahun ke tahun.'],
    ['流行病学调查是防控的第一步。', 'Liú xíng bìng xué diào chá shì fáng kòng de dì yī bù.', 'Penyelidikan epidemiologis adalah langkah pertama pengendalian.'],
    ['突发公共卫生事件考验治理能力。', 'Tū fā gōng gòng wèi shēng shì jiàn kǎo yàn zhì lǐ néng lì.', 'Kejadian darurat kesehatan masyarakat menguji kemampuan tata kelola.'],
  ]],
  [null, ['Istilah revitalisasi desa: 乡村振兴, 返乡创业, 农村电商, 特色产业, 空心村.', '空心村 = desa kosong (ditinggal penduduk usia produktif).'], [
    ['空心村问题在中西部地区较为突出。', 'Kōng xīn cūn wèn tí zài zhōng xī bù dì qū jiào wéi tū chū.', 'Masalah desa kosong cukup menonjol di wilayah tengah dan barat.'],
    ['农村电商帮助农产品打开了市场。', 'Nóng cūn diàn shāng bāng zhù nóng chǎn pǐn dǎ kāi le shì chǎng.', 'E-commerce desa membantu produk pertanian membuka pasar.'],
    ['发展特色产业要因地制宜。', 'Fā zhǎn tè sè chǎn yè yào yīn dì zhì yí.', 'Mengembangkan industri khas harus disesuaikan dengan kondisi setempat.'],
    ['返乡创业的年轻人越来越多。', 'Fǎn xiāng chuàng yè de nián qīng rén yuè lái yuè duō.', 'Semakin banyak anak muda pulang kampung untuk berwirausaha.'],
  ]],
  [null, ['Istilah ekonomi berbagi: 共享经济, 平台经济, 零工, 闲置资源, 使用权, 信用体系.', 'Kolokasi: 盘活闲置资源, 完善信用体系.'], [
    ['共享经济盘活了大量闲置资源。', 'Gòng xiǎng jīng jì pán huó le dà liàng xián zhì zī yuán.', 'Ekonomi berbagi menghidupkan banyak sumber daya yang menganggur.'],
    ['完善的信用体系是共享经济的基础。', 'Wán shàn de xìn yòng tǐ xì shì gòng xiǎng jīng jì de jī chǔ.', 'Sistem kredit yang lengkap adalah dasar ekonomi berbagi.'],
    ['零工劳动者缺乏社会保障。', 'Líng gōng láo dòng zhě quē fá shè huì bǎo zhàng.', 'Pekerja lepas kekurangan jaminan sosial.'],
    ['人们越来越看重使用权而非所有权。', 'Rén men yuè lái yuè kàn zhòng shǐ yòng quán ér fēi suǒ yǒu quán.', 'Orang semakin mementingkan hak pakai daripada hak milik.'],
  ]],
  [null, ['Istilah kesehatan jiwa: 心理健康, 抑郁, 焦虑, 心理韧性, 污名化, 心理干预.', '心理韧性 = resiliensi psikologis.'], [
    ['心理韧性可以通过训练来增强。', 'Xīn lǐ rèn xìng kě yǐ tōng guò xùn liàn lái zēng qiáng.', 'Resiliensi psikologis bisa diperkuat melalui latihan.'],
    ['早期心理干预效果更好。', 'Zǎo qī xīn lǐ gān yù xiào guǒ gèng hǎo.', 'Intervensi psikologis dini lebih efektif.'],
    ['污名化让很多人讳疾忌医。', 'Wū míng huà ràng hěn duō rén huì jí jì yī.', 'Stigma membuat banyak orang enggan mengakui penyakit dan menghindari pengobatan.'],
    ['焦虑情绪在青少年中较为普遍。', 'Jiāo lǜ qíng xù zài qīng shào nián zhōng jiào wéi pǔ biàn.', 'Perasaan cemas cukup umum di kalangan remaja.'],
  ]],
  [null, ['Istilah inovasi: 原始创新, 成果转化, 产学研, 研发投入, 知识产权, 卡脖子.', '卡脖子技术 = teknologi kunci yang membuat bergantung pada pihak lain.'], [
    ['关键技术不能受制于人。', 'Guān jiàn jì shù bù néng shòu zhì yú rén.', 'Teknologi kunci tidak boleh dikendalikan pihak lain.'],
    ['科研成果转化率有待提高。', 'Kē yán chéng guǒ zhuǎn huà lǜ yǒu dài tí gāo.', 'Tingkat penerapan hasil riset masih perlu ditingkatkan.'],
    ['保护知识产权就是保护创新。', 'Bǎo hù zhī shi chǎn quán jiù shì bǎo hù chuàng xīn.', 'Melindungi hak kekayaan intelektual berarti melindungi inovasi.'],
    ['产学研结合能缩短创新周期。', 'Chǎn xué yán jié hé néng suō duǎn chuàng xīn zhōu qī.', 'Perpaduan industri-akademik-riset dapat memperpendek siklus inovasi.'],
  ]],
  [null, ['Istilah kebijakan bahasa: 通用语, 方言, 濒危语言, 双语教育, 语言规范, 语言活力.', '濒危语言 = bahasa terancam punah.'], [
    ['全球有大量濒危语言面临消失。', 'Quán qiú yǒu dà liàng bīn wēi yǔ yán miàn lín xiāo shī.', 'Banyak bahasa terancam punah di dunia menghadapi kepunahan.'],
    ['双语教育有助于保持语言活力。', 'Shuāng yǔ jiào yù yǒu zhù yú bǎo chí yǔ yán huó lì.', 'Pendidikan dwibahasa membantu menjaga vitalitas bahasa.'],
    ['方言是地方文化的重要载体。', 'Fāng yán shì dì fāng wén huà de zhòng yào zǎi tǐ.', 'Dialek adalah wadah penting budaya lokal.'],
    ['语言规范需要兼顾稳定与发展。', 'Yǔ yán guī fàn xū yào jiān gù wěn dìng yǔ fā zhǎn.', 'Pembakuan bahasa perlu mempertimbangkan stabilitas dan perkembangan.'],
  ]],
  [null, ['Istilah ketenagakerjaan: 就业结构, 灵活就业, 结构性失业, 技能错配, 职业教育, 人口红利.', '技能错配 = ketidakcocokan keterampilan.'], [
    ['技能错配导致了结构性失业。', 'Jì néng cuò pèi dǎo zhì le jié gòu xìng shī yè.', 'Ketidakcocokan keterampilan menyebabkan pengangguran struktural.'],
    ['人口红利正在逐渐消失。', 'Rén kǒu hóng lì zhèng zài zhú jiàn xiāo shī.', 'Bonus demografi sedang perlahan menghilang.'],
    ['职业教育要对接产业需求。', 'Zhí yè jiào yù yào duì jiē chǎn yè xū qiú.', 'Pendidikan vokasi harus terhubung dengan kebutuhan industri.'],
    ['灵活就业已成为重要的就业形式。', 'Líng huó jiù yè yǐ chéng wéi zhòng yào de jiù yè xíng shì.', 'Kerja fleksibel sudah menjadi bentuk kerja yang penting.'],
  ]],
  [null, ['Istilah warisan budaya: 非物质文化遗产, 传承人, 活态传承, 修复, 申遗, 文化资源.', '活态传承 = pewarisan hidup (dipraktikkan, bukan hanya diarsipkan).'], [
    ['非物质文化遗产强调活态传承。', 'Fēi wù zhì wén huà yí chǎn qiáng diào huó tài chuán chéng.', 'Warisan budaya tak benda menekankan pewarisan yang hidup.'],
    ['传承人老龄化是一个普遍问题。', 'Chuán chéng rén lǎo líng huà shì yí gè pǔ biàn wèn tí.', 'Penuaan para pewaris adalah masalah umum.'],
    ['申遗成功带来了旅游热潮。', 'Shēn yí chéng gōng dài lái le lǚ yóu rè cháo.', 'Keberhasilan pendaftaran sebagai warisan dunia membawa gelombang wisata.'],
    ['文物修复需要专业技术。', 'Wén wù xiū fù xū yào zhuān yè jì shù.', 'Pemugaran benda budaya memerlukan keahlian profesional.'],
  ]],
  [null, ['Istilah integritas akademik: 学术不端, 剽窃, 查重, 署名, 利益冲突, 同行评审.', '同行评审 = penelaahan sejawat (peer review).'], [
    ['论文发表前要经过同行评审。', 'Lùn wén fā biǎo qián yào jīng guò tóng háng píng shěn.', 'Sebelum diterbitkan, makalah harus melalui penelaahan sejawat.'],
    ['查重只是防范学术不端的手段之一。', 'Chá zhòng zhǐ shì fáng fàn xué shù bù duān de shǒu duàn zhī yī.', 'Pengecekan kemiripan hanyalah salah satu cara mencegah pelanggaran akademik.'],
    ['署名顺序应当反映实际贡献。', 'Shǔ míng shùn xù yīng dāng fǎn yìng shí jì gòng xiàn.', 'Urutan nama penulis seharusnya mencerminkan kontribusi nyata.'],
    ['作者须声明潜在的利益冲突。', 'Zuò zhě xū shēng míng qián zài de lì yì chōng tū.', 'Penulis wajib menyatakan potensi konflik kepentingan.'],
  ]],
  [null, ['Istilah kerja sama internasional: 多边主义, 互利共赢, 全球治理, 共识, 协定, 机制.', 'Kolokasi: 坚持多边主义, 签署协定, 建立机制.'], [
    ['各国签署了应对气候变化的协定。', 'Gè guó qiān shǔ le yìng duì qì hòu biàn huà de xié dìng.', 'Negara-negara menandatangani perjanjian penanganan perubahan iklim.'],
    ['多边主义是维护和平的重要途径。', 'Duō biān zhǔ yì shì wéi hù hé píng de zhòng yào tú jìng.', 'Multilateralisme adalah jalan penting menjaga perdamaian.'],
    ['全球治理体系需要改革和完善。', 'Quán qiú zhì lǐ tǐ xì xū yào gǎi gé hé wán shàn.', 'Sistem tata kelola global perlu direformasi dan disempurnakan.'],
    ['双方在互利共赢的基础上开展合作。', 'Shuāng fāng zài hù lì gòng yíng de jī chǔ shàng kāi zhǎn hé zuò.', 'Kedua pihak bekerja sama atas dasar saling menguntungkan.'],
  ]],
  [null, ['Istilah sidang akademik (答辩): 选题, 研究方法, 创新点, 局限性, 评审意见, 修改稿.', 'Kolokasi: 说明创新点, 回应评审意见, 提交修改稿.'], [
    ['请简要说明论文的创新点。', 'Qǐng jiǎn yào shuō míng lùn wén de chuàng xīn diǎn.', 'Silakan jelaskan singkat poin kebaruan tesis.'],
    ['选题具有较强的现实意义。', 'Xuǎn tí jù yǒu jiào qiáng de xiàn shí yì yì.', 'Pemilihan topiknya memiliki makna praktis yang cukup kuat.'],
    ['答辩人需逐条回应评审意见。', 'Dá biàn rén xū zhú tiáo huí yìng píng shěn yì jiàn.', 'Kandidat harus menanggapi masukan penguji poin demi poin.'],
    ['修改稿须在两周内提交。', 'Xiū gǎi gǎo xū zài liǎng zhōu nèi tí jiāo.', 'Naskah revisi wajib diserahkan dalam dua minggu.'],
  ]],
];
