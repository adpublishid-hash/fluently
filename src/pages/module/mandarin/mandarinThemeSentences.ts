import type { MandarinLevelId } from './mandarinModuleData';

export type MandarinThemeSentence = { hanzi: string; pinyin: string; meaning: string };
type SentenceTuple = [hanzi: string, pinyin: string, meaning: string];

// Three example sentences per theme lesson (1-20) for HSK 5-9. Each sentence
// uses at least one word from the lesson theme so quizzes can blank it out.
// Pinyin is generated from the Hanzi: npm run content:pinyin
const sentenceBank: Partial<Record<MandarinLevelId, SentenceTuple[][]>> = {
  advanced: [
    [
      ['城市化让很多年轻人离开家乡，到大城市寻找机会。', 'Chéng shì huà ràng hěn duō nián qīng rén lí kāi jiā xiāng, dào dà chéng shì xún zhǎo jī huì.', 'Urbanisasi membuat banyak anak muda meninggalkan kampung halaman untuk mencari peluang di kota besar.'],
      ['大城市的生活节奏很快，人们常常觉得时间不够用。', 'Dà chéng shì de shēng huó jié zòu hěn kuài, rén men cháng cháng jué de shí jiān bú gòu yòng.', 'Ritme hidup di kota besar sangat cepat; orang sering merasa waktunya tidak cukup.'],
      ['每天通勤两个小时，让他几乎没有时间陪家人。', 'Měi tiān tōng qín liǎng gè xiǎo shí, ràng tā jī hū méi yǒu shí jiān péi jiā rén.', 'Perjalanan kerja dua jam setiap hari membuatnya hampir tidak punya waktu untuk keluarga.'],
    ],
    [
      ['手机应用收集了大量数据，引发了人们对隐私的担忧。', 'Shǒu jī yìng yòng shōu jí le dà liàng shù jù, yǐn fā le rén men duì yǐn sī de dān yōu.', 'Aplikasi ponsel mengumpulkan banyak data dan memicu kekhawatiran orang tentang privasi.'],
      ['任何新技术都有风险，关键在于如何管理。', 'Rèn hé xīn jì shù dōu yǒu fēng xiǎn, guān jiàn zài yú rú hé guǎn lǐ.', 'Setiap teknologi baru memiliki risiko; kuncinya adalah bagaimana mengelolanya.'],
      ['科学研究也应该遵守伦理，不能没有边界。', 'Kē xué yán jiū yě yīng gāi zūn shǒu lún lǐ, bù néng méi yǒu biān jiè.', 'Penelitian ilmiah juga harus mematuhi etika dan tidak boleh tanpa batas.'],
    ],
    [
      ['这次教育改革的目的是减轻学生的负担。', 'Zhè cì jiào yù gǎi gé de mù dì shì jiǎn qīng xué shēng de fù dān.', 'Tujuan reformasi pendidikan kali ini adalah meringankan beban siswa.'],
      ['考试压力太大，会让学生失去学习的兴趣。', 'Kǎo shì yā lì tài dà, huì ràng xué shēng shī qù xué xí de xìng qù.', 'Tekanan ujian yang terlalu besar dapat membuat siswa kehilangan minat belajar.'],
      ['大学生应该培养自主学习的能力。', 'Dà xué shēng yīng gāi péi yǎng zì zhǔ xué xí de néng lì.', 'Mahasiswa sebaiknya mengembangkan kemampuan belajar mandiri.'],
    ],
    [
      ['经常加班不一定代表工作效率高。', 'Jīng cháng jiā bān bù yí dìng dài biǎo gōng zuò xiào lǜ gāo.', 'Sering lembur belum tentu berarti efisiensi kerja tinggi.'],
      ['这个项目的成功离不开团队合作。', 'Zhè ge xiàng mù dì chéng gōng lí bù kāi tuán duì hé zuò.', 'Keberhasilan proyek ini tidak lepas dari kerja tim.'],
      ['良好的沟通可以减少很多误会。', 'Liáng hǎo de gōu tōng kě yǐ jiǎn shǎo hěn duō wù huì.', 'Komunikasi yang baik dapat mengurangi banyak kesalahpahaman.'],
    ],
    [
      ['政府出台了新的政策来减少塑料垃圾。', 'Zhèng fǔ chū tái le xīn de zhèng cè lái jiǎn shǎo sù liào lā jī.', 'Pemerintah mengeluarkan kebijakan baru untuk mengurangi sampah plastik.'],
      ['空气污染已经影响到居民的健康。', 'Kōng qì wū rǎn yǐ jīng yǐng xiǎng dào jū mín de jiàn kāng.', 'Polusi udara sudah memengaruhi kesehatan warga.'],
      ['我们应该节约资源，而不是无限制地消费。', 'Wǒ men yīng gāi jié yuē zī yuán, ér bú shì wú xiàn zhì dì xiāo fèi.', 'Kita harus menghemat sumber daya, bukan mengonsumsi tanpa batas.'],
    ],
    [
      ['在网上看到消息时，要先分清事实和观点。', 'Zài wǎng shàng kàn dào xiāo xī shí, yào xiān fēn qīng shì shí hé guān diǎn.', 'Saat melihat berita di internet, bedakan dulu fakta dan opini.'],
      ['谣言往往比真相传播得更快。', 'Yáo yán wǎng wǎng bǐ zhēn xiàng chuán bō de gèng kuài.', 'Rumor sering menyebar lebih cepat daripada kebenaran.'],
      ['每个人都有偏见，关键是要意识到它。', 'Měi gè rén dōu yǒu piān jiàn, guān jiàn shì yào yì shí dào tā.', 'Setiap orang punya bias; kuncinya adalah menyadarinya.'],
    ],
    [
      ['很多消费者买东西时更重视性价比。', 'Hěn duō xiāo fèi zhě mǎi dōng xi shí gèng zhòng shì xìng jià bǐ.', 'Banyak konsumen lebih mementingkan rasio harga dan kualitas saat berbelanja.'],
      ['广告常常让我们买一些并不需要的东西。', 'Guǎng gào cháng cháng ràng wǒ men mǎi yì xiē bìng bù xū yào de dōng xi.', 'Iklan sering membuat kita membeli barang yang sebenarnya tidak dibutuhkan.'],
      ['年轻人越来越喜欢支持本土品牌。', 'Nián qīng rén yuè lái yuè xǐ huan zhī chí běn tǔ pǐn pái.', 'Anak muda semakin suka mendukung merek lokal.'],
    ],
    [
      ['长期的压力会影响一个人的睡眠和情绪。', 'Cháng qī de yā lì huì yǐng xiǎng yí gè rén de shuì mián hé qíng xù.', 'Tekanan jangka panjang dapat memengaruhi tidur dan suasana hati seseorang.'],
      ['在工作和生活之间找到平衡并不容易。', 'Zài gōng zuò hé shēng huó zhī jiān zhǎo dào píng héng bìng bù róng yì.', 'Menemukan keseimbangan antara kerja dan kehidupan tidaklah mudah.'],
      ['养成运动的习惯对心理健康很有帮助。', 'Yǎng chéng yùn dòng de xí guàn duì xīn lǐ jiàn kāng hěn yǒu bāng zhù.', 'Membiasakan olahraga sangat membantu kesehatan psikologis.'],
    ],
    [
      ['在全球化的时代，保护传统文化变得更加重要。', 'Zài quán qiú huà de shí dài, bǎo hù chuán tǒng wén huà biàn de gèng jiā zhòng yào.', 'Di era globalisasi, melindungi budaya tradisional menjadi semakin penting.'],
      ['留学生需要时间适应新的环境。', 'Liú xué shēng xū yào shí jiān shì yìng xīn de huán jìng.', 'Mahasiswa internasional membutuhkan waktu untuk beradaptasi dengan lingkungan baru.'],
      ['语言是文化认同的重要部分。', 'Yǔ yán shì wén huà rèn tóng de zhòng yào bù fen.', 'Bahasa adalah bagian penting dari identitas budaya.'],
    ],
    [
      ['今年的经济增长速度比去年慢了一些。', 'Jīn nián de jīng jì zēng zhǎng sù dù bǐ qù nián màn le yì xiē.', 'Laju pertumbuhan ekonomi tahun ini sedikit lebih lambat daripada tahun lalu.'],
      ['通货膨胀让普通家庭的生活成本不断上升。', 'Tōng huò péng zhàng ràng pǔ tōng jiā tíng de shēng huó chéng běn bú duàn shàng shēng.', 'Inflasi membuat biaya hidup keluarga biasa terus naik.'],
      ['政府鼓励投资新能源产业，以创造更多就业。', 'Zhèng fǔ gǔ lì tóu zī xīn néng yuán chǎn yè, yǐ chuàng zào gèng duō jiù yè.', 'Pemerintah mendorong investasi di industri energi baru untuk menciptakan lebih banyak lapangan kerja.'],
    ],
    [
      ['发展公共交通是解决城市问题的有效办法。', 'Fā zhǎn gōng gòng jiāo tōng shì jiě jué chéng shì wèn tí de yǒu xiào bàn fǎ.', 'Mengembangkan transportasi umum adalah cara efektif mengatasi masalah kota.'],
      ['上下班时间地铁里总是挤满了人。', 'Shàng xià bān shí jiān dì tiě lǐ zǒng shì jǐ mǎn le rén.', 'Pada jam berangkat dan pulang kerja, kereta bawah tanah selalu penuh sesak.'],
      ['交通拥堵不仅浪费时间，还加重了空气污染。', 'Jiāo tōng yōng dǔ bù jǐn làng fèi shí jiān, hái jiā zhòng le kōng qì wū rǎn.', 'Kemacetan tidak hanya membuang waktu, tetapi juga memperparah polusi udara.'],
    ],
    [
      ['人工智能已经进入了医疗和教育领域。', 'Rén gōng zhì néng yǐ jīng jìn rù le yī liáo hé jiào yù lǐng yù.', 'Kecerdasan buatan sudah masuk ke bidang kesehatan dan pendidikan.'],
      ['有人担心机器会取代人类的工作。', 'Yǒu rén dān xīn jī qì huì qǔ dài rén lèi de gōng zuò.', 'Sebagian orang khawatir mesin akan menggantikan pekerjaan manusia.'],
      ['新技术的发展需要合理的监管。', 'Xīn jì shù de fā zhǎn xū yào hé lǐ de jiān guǎn.', 'Perkembangan teknologi baru membutuhkan regulasi yang wajar.'],
    ],
    [
      ['人口老龄化给社会带来了新的挑战。', 'Rén kǒu lǎo líng huà gěi shè huì dài lái le xīn de tiǎo zhàn.', 'Penuaan penduduk membawa tantangan baru bagi masyarakat.'],
      ['很多年轻人在城市工作，很难照顾家乡的父母养老。', 'Hěn duō nián qīng rén zài chéng shì gōng zuò, hěn nán zhào gù jiā xiāng de fù mǔ yǎng lǎo.', 'Banyak anak muda bekerja di kota sehingga sulit merawat orang tua di kampung pada masa tua.'],
      ['我爷爷退休以后开始学习书法。', 'Wǒ yé ye tuì xiū yǐ hòu kāi shǐ xué xí shū fǎ.', 'Kakek saya mulai belajar kaligrafi setelah pensiun.'],
    ],
    [
      ['上网课需要很强的自律能力。', 'Shàng wǎng kè xū yào hěn qiáng de zì lǜ néng lì.', 'Mengikuti kelas daring membutuhkan disiplin diri yang kuat.'],
      ['在线学习的时间安排比较灵活。', 'Zài xiàn xué xí de shí jiān ān pái bǐ jiào líng huó.', 'Pengaturan waktu belajar daring relatif fleksibel.'],
      ['老师和学生之间缺少互动，是网课的一个问题。', 'Lǎo shī hé xué shēng zhī jiān quē shǎo hù dòng, shì wǎng kè de yí gè wèn tí.', 'Kurangnya interaksi antara guru dan siswa adalah salah satu masalah kelas daring.'],
    ],
    [
      ['周末有很多志愿者去社区帮助老人。', 'Zhōu mò yǒu hěn duō zhì yuàn zhě qù shè qū bāng zhù lǎo rén.', 'Pada akhir pekan banyak relawan pergi ke komunitas untuk membantu lansia.'],
      ['参加公益活动让我认识了很多有爱心的人。', 'Cān jiā gōng yì huó dòng ràng wǒ rèn shi le hěn duō yǒu ài xīn de rén.', 'Mengikuti kegiatan sosial membuat saya mengenal banyak orang yang penuh kasih.'],
      ['奉献不一定是大事，也可以从小事做起。', 'Fèng xiàn bù yí dìng shì dà shì, yě kě yǐ cóng xiǎo shì zuò qǐ.', 'Pengabdian tidak harus hal besar; bisa dimulai dari hal kecil.'],
    ],
    [
      ['做职业规划时，应该先了解自己的兴趣。', 'Zuò zhí yè guī huà shí, yīng gāi xiān liǎo jiě zì jǐ de xìng qù.', 'Saat membuat perencanaan karier, pahami dulu minat sendiri.'],
      ['有的人喜欢稳定的工作，有的人喜欢挑战。', 'Yǒu de rén xǐ huan wěn dìng de gōng zuò, yǒu de rén xǐ huan tiǎo zhàn.', 'Sebagian orang menyukai pekerjaan yang stabil, sebagian lagi menyukai tantangan.'],
      ['这家公司虽然工资不高，但发展空间很大。', 'Zhè jiā gōng sī suī rán gōng zī bù gāo, dàn fā zhǎn kōng jiān hěn dà.', 'Perusahaan ini gajinya tidak tinggi, tetapi ruang berkembangnya besar.'],
    ],
    [
      ['这篇文章的论点在第一段就提出来了。', 'Zhè piān wén zhāng de lùn diǎn zài dì yī duàn jiù tí chū lái le.', 'Tesis artikel ini sudah dikemukakan di paragraf pertama.'],
      ['作者用具体的数据作为论据。', 'Zuò zhě yòng jù tǐ de shù jù zuò wéi lùn jù.', 'Penulis menggunakan data konkret sebagai bukti pendukung.'],
      ['读抽象的文章时，要注意句子背后的含义。', 'Dú chōu xiàng de wén zhāng shí, yào zhù yì jù zi bèi hòu de hán yì.', 'Saat membaca artikel abstrak, perhatikan makna tersirat di balik kalimat.'],
    ],
    [
      ['正式的信件要注意称呼和格式。', 'Zhèng shì de xìn jiàn yào zhù yì chēng hu hé gé shì.', 'Surat formal harus memperhatikan sapaan dan format.'],
      ['每个段落最好只讨论一个中心意思。', 'Měi gè duàn luò zuì hǎo zhǐ tǎo lùn yí gè zhōng xīn yì si.', 'Setiap paragraf sebaiknya hanya membahas satu gagasan pokok.'],
      ['文章的结论应该回应开头提出的问题。', 'Wén zhāng de jié lùn yīng gāi huí yìng kāi tóu tí chū de wèn tí.', 'Kesimpulan tulisan harus menjawab pertanyaan yang diajukan di awal.'],
    ],
    [
      ['说话时语调太平，听的人容易觉得无聊。', 'Shuō huà shí yǔ diào tài píng, tīng de rén róng yì jué de wú liáo.', 'Jika intonasi terlalu datar saat berbicara, pendengar mudah merasa bosan.'],
      ['在重要的信息前面停顿一下，效果会更好。', 'Zài zhòng yào de xìn xī qián miàn tíng dùn yí xià, xiào guǒ huì gèng hǎo.', 'Berhenti sejenak sebelum informasi penting akan memberi efek yang lebih baik.'],
      ['想说得流利，就要每天大声朗读。', 'Xiǎng shuō de liú lì, jiù yào měi tiān dà shēng lǎng dú.', 'Jika ingin berbicara lancar, bacalah dengan suara keras setiap hari.'],
    ],
    [
      ['学期结束时，老师让我们写一份学习总结。', 'Xué qī jié shù shí, lǎo shī ràng wǒ men xiě yí fèn xué xí zǒng jié.', 'Di akhir semester, guru meminta kami menulis rangkuman belajar.'],
      ['通过反思，我发现了自己的不足。', 'Tōng guò fǎn sī, wǒ fā xiàn le zì jǐ de bù zú.', 'Melalui refleksi, saya menemukan kekurangan saya sendiri.'],
      ['我下一个目标是通过HSK六级考试。', 'Wǒ xià yí gè mù biāo shì tōng guò HSK liù jí kǎo shì.', 'Target saya berikutnya adalah lulus ujian HSK level 6.'],
    ],
  ],
  proficiency: [
    [
      ['公共信任一旦失去，就很难在短时间内恢复。', 'Gōng gòng xìn rèn yí dàn shī qù, jiù hěn nán zài duǎn shí jiān nèi huī fù.', 'Sekali kepercayaan publik hilang, sulit dipulihkan dalam waktu singkat.'],
      ['政策的合法性不仅来自法律，也来自公众的认可。', 'Zhèng cè de hé fǎ xìng bù jǐn lái zì fǎ lǜ, yě lái zì gōng zhòng de rèn kě.', 'Legitimasi kebijakan tidak hanya berasal dari hukum, tetapi juga dari pengakuan publik.'],
      ['提高决策的透明度，有助于建立有效的问责机制。', 'Tí gāo jué cè de tòu míng dù, yǒu zhù yú jiàn lì yǒu xiào de wèn zé jī zhì.', 'Meningkatkan transparansi keputusan membantu membangun mekanisme akuntabilitas yang efektif.'],
    ],
    [
      ['过度的技术依赖可能削弱人的独立思考能力。', 'Guò dù de jì shù yī lài kě néng xuē ruò rén de dú lì sī kǎo néng lì.', 'Ketergantungan berlebihan pada teknologi dapat melemahkan kemampuan berpikir mandiri.'],
      ['如果训练数据不全面，算法偏见就难以避免。', 'Rú guǒ xùn liàn shù jù bù quán miàn, suàn fǎ piān jiàn jiù nán yǐ bì miǎn.', 'Jika data pelatihan tidak menyeluruh, bias algoritma sulit dihindari.'],
      ['在技术面前，人的主体性应该得到尊重。', 'Zài jì shù miàn qián, rén de zhǔ tǐ xìng yīng gāi dé dào zūn zhòng.', 'Di hadapan teknologi, otonomi manusia sebagai subjek harus dihormati.'],
    ],
    [
      ['教育公平是社会公平的重要基础。', 'Jiào yù gōng píng shì shè huì gōng píng de zhòng yào jī chǔ.', 'Keadilan pendidikan adalah fondasi penting keadilan sosial.'],
      ['城乡之间的资源分配仍然存在明显差距。', 'Chéng xiāng zhī jiān de zī yuán fēn pèi réng rán cún zài míng xiǎn chā jù.', 'Distribusi sumber daya antara kota dan desa masih menunjukkan kesenjangan yang jelas.'],
      ['机会不均会进一步阻碍阶层流动。', 'Jī huì bù jūn huì jìn yí bù zǔ ài jiē céng liú dòng.', 'Ketidakmerataan peluang akan semakin menghambat mobilitas kelas sosial.'],
    ],
    [
      ['经济发展不能忽视生态成本。', 'Jīng jì fā zhǎn bù néng hū shì shēng tài chéng běn.', 'Pembangunan ekonomi tidak boleh mengabaikan biaya ekologis.'],
      ['绿色转型需要政府、企业和个人共同努力。', 'Lǜ sè zhuǎn xíng xū yào zhèng fǔ, qǐ yè hé gè rén gòng tóng nǔ lì.', 'Transisi hijau membutuhkan upaya bersama pemerintah, perusahaan, dan individu.'],
      ['代际公平要求我们为后代留下足够的资源。', 'Dài jì gōng píng yāo qiú wǒ men wèi hòu dài liú xià zú gòu de zī yuán.', 'Keadilan antargenerasi menuntut kita meninggalkan sumber daya yang cukup bagi generasi mendatang.'],
    ],
    [
      ['算法推荐容易让用户陷入信息茧房。', 'Suàn fǎ tuī jiàn róng yì ràng yòng hù xiàn rù xìn xī jiǎn fáng.', 'Rekomendasi algoritma mudah membuat pengguna terjebak dalam echo chamber informasi.'],
      ['提高媒介素养是应对虚假信息的关键。', 'Tí gāo méi jiè sù yǎng shì yìng duì xū jiǎ xìn xī de guān jiàn.', 'Meningkatkan literasi media adalah kunci menghadapi disinformasi.'],
      ['谁掌握了话语权，谁就能影响议题的方向。', 'Shuí zhǎng wò le huà yǔ quán, shuí jiù néng yǐng xiǎng yì tí de fāng xiàng.', 'Siapa yang menguasai kuasa wacana, dialah yang dapat memengaruhi arah isu.'],
    ],
    [
      ['自动化使一些岗位面临被替代的风险。', 'Zì dòng huà shǐ yì xiē gǎng wèi miàn lín bèi tì dài de fēng xiǎn.', 'Otomatisasi membuat sebagian posisi kerja menghadapi risiko tergantikan.'],
      ['劳动者需要通过终身学习完成技能转型。', 'Láo dòng zhě xū yào tōng guò zhōng shēn xué xí wán chéng jì néng zhuǎn xíng.', 'Pekerja perlu menyelesaikan transformasi keterampilan melalui belajar sepanjang hayat.'],
      ['灵活就业增加了收入来源，却削弱了劳动保障。', 'Líng huó jiù yè zēng jiā le shōu rù lái yuán, què xuē ruò le láo dòng bǎo zhàng.', 'Kerja fleksibel menambah sumber pendapatan, tetapi melemahkan perlindungan tenaga kerja.'],
    ],
    [
      ['文化传承并不意味着拒绝变化。', 'Wén huà chuán chéng bìng bú yì wèi zhe jù jué biàn huà.', 'Pewarisan budaya tidak berarti menolak perubahan.'],
      ['在现代性的冲击下，年轻人重新思考自己的身份认同。', 'Zài xiàn dài xìng de chōng jī xià, nián qīng rén chóng xīn sī kǎo zì jǐ de shēn fèn rèn tóng.', 'Di bawah guncangan modernitas, anak muda memikirkan kembali identitas dirinya.'],
      ['外来观念需要放在本土语境中重新理解。', 'Wài lái guān niàn xū yào fàng zài běn tǔ yǔ jìng zhōng chóng xīn lǐ jiě.', 'Gagasan dari luar perlu dipahami ulang dalam konteks lokal.'],
    ],
    [
      ['城市治理的核心是提供公平的公共服务。', 'Chéng shì zhì lǐ de hé xīn shì tí gōng gōng píng de gōng gòng fú wù.', 'Inti tata kelola kota adalah menyediakan layanan publik yang adil.'],
      ['老旧小区的基础设施急需更新。', 'Lǎo jiù xiǎo qū de jī chǔ shè shī jí xū gēng xīn.', 'Infrastruktur di kompleks perumahan lama sangat perlu diperbarui.'],
      ['空间正义关注不同群体能否平等使用城市空间。', 'Kōng jiān zhèng yì guān zhù bù tóng qún tǐ néng fǒu píng děng shǐ yòng chéng shì kōng jiān.', 'Keadilan ruang memperhatikan apakah berbagai kelompok dapat menggunakan ruang kota secara setara.'],
    ],
    [
      ['疫情期间，个人自由和集体利益之间出现了张力。', 'Yì qíng qī jiān, gè rén zì yóu hé jí tǐ lì yì zhī jiān chū xiàn le zhāng lì.', 'Selama pandemi, muncul ketegangan antara kebebasan individu dan kepentingan kolektif.'],
      ['公共卫生政策的效果取决于公众的配合。', 'Gōng gòng wèi shēng zhèng cè de xiào guǒ qǔ jué yú gōng zhòng de pèi hé.', 'Efektivitas kebijakan kesehatan publik bergantung pada kerja sama masyarakat.'],
      ['及时、诚实的风险沟通能够减少恐慌。', 'Jí shí, chéng shí de fēng xiǎn gōu tōng néng gòu jiǎn shǎo kǒng huāng.', 'Komunikasi risiko yang cepat dan jujur dapat mengurangi kepanikan.'],
    ],
    [
      ['健康的创新生态允许失败，并降低试错成本。', 'Jiàn kāng de chuàng xīn shēng tài yǔn xǔ shī bài, bìng jiàng dī shì cuò chéng běn.', 'Ekosistem inovasi yang sehat memberi ruang untuk gagal dan menurunkan biaya trial-and-error.'],
      ['监管框架既要防范风险，又不能扼杀创新。', 'Jiān guǎn kuàng jià jì yào fáng fàn fēng xiǎn, yòu bù néng è shā chuàng xīn.', 'Kerangka regulasi harus mencegah risiko tanpa mematikan inovasi.'],
      ['风险治理需要专家、企业和公众共同参与。', 'Fēng xiǎn zhì lǐ xū yào zhuān jiā, qǐ yè hé gōng zhòng gòng tóng cān yù.', 'Tata kelola risiko membutuhkan partisipasi bersama pakar, perusahaan, dan publik.'],
    ],
    [
      ['全球化使各国经济高度相互依存。', 'Quán qiú huà shǐ gè guó jīng jì gāo dù xiāng hù yī cún.', 'Globalisasi membuat ekonomi berbagai negara sangat saling bergantung.'],
      ['地方能动性决定了一个社区如何回应外部变化。', 'Dì fāng néng dòng xìng jué dìng le yí gè shè qū rú hé huí yìng wài bù biàn huà.', 'Agency lokal menentukan bagaimana sebuah komunitas merespons perubahan dari luar.'],
      ['移民家庭往往要经历漫长的文化适应过程。', 'Yí mín jiā tíng wǎng wǎng yào jīng lì màn cháng de wén huà shì yìng guò chéng.', 'Keluarga migran sering harus melalui proses adaptasi budaya yang panjang.'],
    ],
    [
      ['制度改革的难点往往不在设计，而在执行力。', 'Zhì dù gǎi gé de nán diǎn wǎng wǎng bú zài shè jì, ér zài zhí xíng lì.', 'Kesulitan reformasi institusi sering bukan pada rancangan, melainkan pada kapasitas eksekusi.'],
      ['没有独立的监督体系，改革很容易流于形式。', 'Méi yǒu dú lì de jiān dū tǐ xì, gǎi gé hěn róng yì liú yú xíng shì.', 'Tanpa sistem pengawasan yang independen, reformasi mudah menjadi formalitas.'],
      ['路径依赖使旧制度具有很强的惯性。', 'Lù jìng yī lài shǐ jiù zhì dù jù yǒu hěn qiáng de guàn xìng.', 'Path dependency membuat institusi lama memiliki inersia yang kuat.'],
    ],
    [
      ['教育是促进社会流动最重要的途径之一。', 'Jiào yù shì cù jìn shè huì liú dòng zuì zhòng yào de tú jìng zhī yī.', 'Pendidikan adalah salah satu jalur terpenting untuk mendorong mobilitas sosial.'],
      ['家庭的文化资本会影响孩子的学业表现。', 'Jiā tíng de wén huà zī běn huì yǐng xiǎng hái zi de xué yè biǎo xiàn.', 'Modal budaya keluarga memengaruhi prestasi akademik anak.'],
      ['如果机会结构长期不变，就可能出现阶层固化。', 'Rú guǒ jī huì jié gòu cháng qī bú biàn, jiù kě néng chū xiàn jiē céng gù huà.', 'Jika struktur peluang tidak berubah dalam jangka panjang, pengerasan kelas sosial dapat terjadi.'],
    ],
    [
      ['环境正义要求污染负担不应落在弱势群体身上。', 'Huán jìng zhèng yì yāo qiú wū rǎn fù dān bú yìng luò zài ruò shì qún tǐ shēn shàng.', 'Keadilan lingkungan menuntut agar beban polusi tidak jatuh pada kelompok rentan.'],
      ['受影响的村民应该通过补偿机制获得赔偿。', 'Shòu yǐng xiǎng de cūn mín yīng gāi tōng guò bǔ cháng jī zhì huò dé péi cháng.', 'Warga desa yang terdampak harus mendapat ganti rugi melalui mekanisme kompensasi.'],
      ['企业必须承担相应的生态责任。', 'Qǐ yè bì xū chéng dān xiāng yìng de shēng tài zé rèn.', 'Perusahaan harus memikul tanggung jawab ekologis yang sesuai.'],
    ],
    [
      ['跨文化沟通中，沉默也可能有不同的含义。', 'Kuà wén huà gōu tōng zhōng, chén mò yě kě néng yǒu bù tóng de hán yì.', 'Dalam komunikasi lintas budaya, diam pun bisa bermakna berbeda.'],
      ['双方在谈判立场上分歧很大，但仍有共同利益。', 'Shuāng fāng zài tán pàn lì chǎng shàng fēn qí hěn dà, dàn réng yǒu gòng tóng lì yì.', 'Kedua pihak sangat berbeda posisi negosiasinya, tetapi tetap memiliki kepentingan bersama.'],
      ['为了避免误读，翻译时要考虑文化背景。', 'Wèi le bì miǎn wù dú, fān yì shí yào kǎo lǜ wén huà bèi jǐng.', 'Untuk menghindari salah tafsir, latar budaya harus dipertimbangkan saat menerjemahkan.'],
    ],
    [
      ['好的文献综述不是简单罗列，而是观点整合。', 'Hǎo de wén xiàn zōng shù bú shì jiǎn dān luó liè, ér shì guān diǎn zhěng hé.', 'Literature review yang baik bukan sekadar daftar, melainkan integrasi pandangan.'],
      ['研究者需要先说明自己的理论框架。', 'Yán jiū zhě xū yào xiān shuō míng zì jǐ de lǐ lùn kuàng jià.', 'Peneliti perlu terlebih dahulu menjelaskan kerangka teorinya.'],
      ['论证链条中任何一环断裂，结论都会受到质疑。', 'Lùn zhèng liàn tiáo zhōng rèn hé yì huán duàn liè, jié lùn dōu huì shòu dào zhì yí.', 'Jika satu mata rantai argumentasi putus, kesimpulannya akan diragukan.'],
    ],
    [
      ['批判性阅读要求读者主动发现文章的隐含假设。', 'Pī pàn xìng yuè dú yāo qiú dú zhě zhǔ dòng fā xiàn wén zhāng de yǐn hán jiǎ shè.', 'Membaca kritis menuntut pembaca aktif menemukan asumsi implisit dalam artikel.'],
      ['这项研究样本太小，证据强度不足。', 'Zhè xiàng yán jiū yàng běn tài xiǎo, zhèng jù qiáng dù bù zú.', 'Sampel penelitian ini terlalu kecil sehingga kekuatan buktinya kurang.'],
      ['作者从个别案例推出普遍结论，存在逻辑漏洞。', 'Zuò zhě cóng gè bié àn lì tuī chū pǔ biàn jié lùn, cún zài luó jí lòu dòng.', 'Penulis menarik kesimpulan umum dari kasus tunggal, sehingga ada celah logika.'],
    ],
    [
      ['执行摘要应该让领导在一分钟内抓住重点。', 'Zhí xíng zhāi yào yīng gāi ràng lǐng dǎo zài yì fēn zhōng nèi zhuā zhù zhòng diǎn.', 'Executive summary harus membuat pimpinan menangkap inti dalam satu menit.'],
      ['我们需要根据优先级分配有限的预算。', 'Wǒ men xū yào gēn jù yōu xiān jí fēn pèi yǒu xiàn de yù suàn.', 'Kita perlu membagi anggaran yang terbatas berdasarkan prioritas.'],
      ['报告最后列出了三个关键风险和应对方案。', 'Bào gào zuì hòu liè chū le sān gè guān jiàn fēng xiǎn hé yìng duì fāng àn.', 'Di bagian akhir laporan tercantum tiga risiko kunci beserta langkah penanganannya.'],
    ],
    [
      ['演讲者巧妙地运用了对比的修辞策略。', 'Yǎn jiǎng zhě qiǎo miào dì yùn yòng le duì bǐ de xiū cí cè lüè.', 'Pembicara dengan cerdik menggunakan strategi retorika kontras.'],
      ['在谈判中，语气控制比用词更重要。', 'Zài tán pàn zhōng, yǔ qì kòng zhì bǐ yòng cí gèng zhòng yào.', 'Dalam negosiasi, kontrol nada bicara lebih penting daripada pilihan kata.'],
      ['合理的节奏安排能让听众保持注意力。', 'Hé lǐ de jié zòu ān pái néng ràng tīng zhòng bǎo chí zhù yì lì.', 'Pengaturan ritme yang tepat dapat membuat pendengar tetap fokus.'],
    ],
    [
      ['这次成果展示全面体现了学生的综合能力。', 'Zhè cì chéng guǒ zhǎn shì quán miàn tǐ xiàn le xué shēng de zōng hé néng lì.', 'Presentasi hasil kali ini sepenuhnya menunjukkan kemampuan terpadu siswa.'],
      ['我坚持每周写反思日志，记录学习的变化。', 'Wǒ jiān chí měi zhōu xiě fǎn sī rì zhì, jì lù xué xí de biàn huà.', 'Saya rutin menulis jurnal refleksi setiap minggu untuk mencatat perubahan belajar.'],
      ['语言学习没有终点，重要的是持续改进。', 'Yǔ yán xué xí méi yǒu zhōng diǎn, zhòng yào de shì chí xù gǎi jìn.', 'Belajar bahasa tidak ada garis akhirnya; yang penting adalah perbaikan berkelanjutan.'],
    ],
  ],
  'hsk-7': [
    [
      ['城市更新不应只追求高楼，而应重视居民的生活质量。', 'Chéng shì gēng xīn bú yìng zhǐ zhuī qiú gāo lóu, ér yìng zhòng shì jū mín de shēng huó zhì liàng.', 'Pembaruan kota tidak seharusnya hanya mengejar gedung tinggi, tetapi harus mementingkan kualitas hidup warga.'],
      ['旧城改造过程中，如何保护历史街区是一大难题。', 'Jiù chéng gǎi zào guò chéng zhōng, rú hé bǎo hù lì shǐ jiē qū shì yí dà nán tí.', 'Dalam renovasi kota lama, cara melindungi kawasan bersejarah adalah masalah besar.'],
      ['增加公共空间有助于增强社区参与。', 'Zēng jiā gōng gòng kōng jiān yǒu zhù yú zēng qiáng shè qū cān yù.', 'Menambah ruang publik membantu meningkatkan partisipasi komunitas.'],
    ],
    [
      ['数字鸿沟使一部分老年人难以享受便利的公共服务。', 'Shù zì hóng gōu shǐ yí bù fen lǎo nián rén nán yǐ xiǎng shòu biàn lì de gōng gòng fú wù.', 'Kesenjangan digital membuat sebagian lansia sulit menikmati layanan publik yang praktis.'],
      ['提高信息素养是缩小差距的关键一步。', 'Tí gāo xìn xī sù yǎng shì suō xiǎo chā jù de guān jiàn yí bù.', 'Meningkatkan literasi informasi adalah langkah kunci untuk mempersempit kesenjangan.'],
      ['偏远地区的网络基础设施仍然相对薄弱。', 'Piān yuǎn dì qū de wǎng luò jī chǔ shè shī réng rán xiāng duì bó ruò.', 'Infrastruktur jaringan di daerah terpencil masih relatif lemah.'],
    ],
    [
      ['人口老龄化将对养老保障体系形成长期压力。', 'Rén kǒu lǎo líng huà jiāng duì yǎng lǎo bǎo zhàng tǐ xì xíng chéng zhǎng qī yā lì.', 'Penuaan penduduk akan memberi tekanan jangka panjang pada sistem jaminan hari tua.'],
      ['家庭规模缩小，改变了传统的代际关系。', 'Jiā tíng guī mó suō xiǎo, gǎi biàn le chuán tǒng de dài jì guān xì.', 'Mengecilnya ukuran keluarga mengubah relasi antargenerasi yang tradisional.'],
      ['一些行业已经出现了劳动力短缺的现象。', 'Yì xiē háng yè yǐ jīng chū xiàn le láo dòng lì duǎn quē de xiàn xiàng.', 'Beberapa sektor sudah mengalami kekurangan tenaga kerja.'],
    ],
    [
      ['教育公平的核心在于每个孩子都有发展的机会。', 'Jiào yù gōng píng de hé xīn zài yú měi gè hái zi dōu yǒu fā zhǎn de jī huì.', 'Inti keadilan pendidikan adalah setiap anak memiliki kesempatan untuk berkembang.'],
      ['优质资源分配不均，加剧了择校竞争。', 'Yōu zhì zī yuán fēn pèi bù jūn, jiā jù le zé xiào jìng zhēng.', 'Distribusi sumber daya unggulan yang tidak merata memperketat persaingan memilih sekolah.'],
      ['从应试教育走向素质教育，需要评价方式的改变。', 'Cóng yìng shì jiào yù zǒu xiàng sù zhì jiào yù, xū yào píng jià fāng shì de gǎi biàn.', 'Beralih dari pendidikan berorientasi ujian ke pendidikan kompetensi membutuhkan perubahan cara penilaian.'],
    ],
    [
      ['减少碳排放已经成为各国的共同目标。', 'Jiǎn shǎo tàn pái fàng yǐ jīng chéng wéi gè guó de gòng tóng mù biāo.', 'Mengurangi emisi karbon telah menjadi tujuan bersama berbagai negara.'],
      ['实现碳中和离不开可再生能源的大规模应用。', 'Shí xiàn tàn zhōng hé lí bù kāi kě zài shēng néng yuán de dà guī mó yìng yòng.', 'Mencapai netralitas karbon tidak lepas dari penggunaan energi terbarukan secara besar-besaran.'],
      ['近年来，极端天气出现得越来越频繁。', 'Jìn nián lái, jí duān tiān qì chū xiàn dé yuè lái yuè pín fán.', 'Dalam beberapa tahun terakhir, cuaca ekstrem semakin sering terjadi.'],
    ],
    [
      ['算法偏见可能在招聘中造成隐性歧视。', 'Suàn fǎ piān jiàn kě néng zài zhāo pìn zhōng zào chéng yǐn xìng qí shì.', 'Bias algoritma dapat menimbulkan diskriminasi terselubung dalam rekrutmen.'],
      ['保护数据隐私是赢得用户信任的前提。', 'Bǎo hù shù jù yǐn sī shì yíng dé yòng hù xìn rèn de qián tí.', 'Melindungi privasi data adalah prasyarat untuk memenangkan kepercayaan pengguna.'],
      ['只有提高透明度，问责机制才能真正发挥作用。', 'Zhǐ yǒu tí gāo tòu míng dù, wèn zé jī zhì cái néng zhēn zhèng fā huī zuò yòng.', 'Hanya dengan meningkatkan transparansi, mekanisme akuntabilitas dapat benar-benar berfungsi.'],
    ],
    [
      ['长期只看同类内容，容易形成信息茧房。', 'Cháng qī zhǐ kàn tóng lèi nèi róng, róng yì xíng chéng xìn xī jiǎn fáng.', 'Terlalu lama hanya melihat konten sejenis mudah menciptakan gelembung informasi.'],
      ['虚假信息往往借助情绪化的标题迅速传播。', 'Xū jiǎ xìn xī wǎng wǎng jiè zhù qíng xù huà de biāo tí xùn sù chuán bō.', 'Disinformasi sering menyebar cepat dengan bantuan judul yang emosional.'],
      ['媒体通过议程设置影响舆论的关注点。', 'Méi tǐ tōng guò yì chéng shè zhì yǐng xiǎng yú lùn de guān zhù diǎn.', 'Media memengaruhi fokus opini publik melalui penentuan agenda.'],
    ],
    [
      ['消费主义把幸福等同于不断购买。', 'Xiāo fèi zhǔ yì bǎ xìng fú děng tóng yú bú duàn gòu mǎi.', 'Konsumerisme menyamakan kebahagiaan dengan membeli terus-menerus.'],
      ['名牌包的价值更多体现为符号消费。', 'Míng pái bāo de jià zhí gèng duō tǐ xiàn wèi fú hào xiāo fèi.', 'Nilai tas bermerek lebih banyak tampil sebagai konsumsi simbolik.'],
      ['可持续消费提倡少买、买好、用久。', 'Kě chí xù xiāo fèi tí chàng shǎo mǎi, mǎi hǎo, yòng jiǔ.', 'Konsumsi berkelanjutan menganjurkan membeli lebih sedikit, membeli yang baik, dan memakai lebih lama.'],
    ],
    [
      ['外国品牌进入中国市场时，通常需要本土化。', 'Wài guó pǐn pái jìn rù zhōng guó shì chǎng shí, tōng cháng xū yào běn tǔ huà.', 'Merek asing yang masuk ke pasar Tiongkok biasanya perlu melakukan lokalisasi.'],
      ['文化自信来自对自身传统的深入理解。', 'Wén huà zì xìn lái zì duì zì shēn chuán tǒng de shēn rù lǐ jiě.', 'Kepercayaan diri budaya berasal dari pemahaman mendalam atas tradisi sendiri.'],
      ['影视作品已经成为文化输出的重要渠道。', 'Yǐng shì zuò pǐn yǐ jīng chéng wéi wén huà shū chū de zhòng yào qú dào.', 'Karya film dan televisi telah menjadi saluran penting ekspor budaya.'],
    ],
    [
      ['公共卫生体系的强弱在疫情中暴露无遗。', 'Gōng gòng wèi shēng tǐ xì de qiáng ruò zài yì qíng zhōng bào lù wú yí.', 'Kuat lemahnya sistem kesehatan masyarakat terlihat jelas selama pandemi.'],
      ['疫苗接种率的提高有效降低了重症比例。', 'Yì miáo jiē zhòng lǜ de tí gāo yǒu xiào jiàng dī le zhòng zhèng bǐ lì.', 'Meningkatnya cakupan vaksinasi secara efektif menurunkan proporsi kasus berat.'],
      ['坚持预防为主，可以节约大量医疗资源。', 'Jiān chí yù fáng wéi zhǔ, kě yǐ jié yuē dà liàng yī liáo zī yuán.', 'Konsisten mengutamakan pencegahan dapat menghemat banyak sumber daya medis.'],
    ],
    [
      ['乡村振兴的关键在于产业和人才。', 'Xiāng cūn zhèn xīng de guān jiàn zài yú chǎn yè hé rén cái.', 'Kunci revitalisasi desa terletak pada industri dan talenta.'],
      ['缩小城乡差距需要长期的政策支持。', 'Suō xiǎo chéng xiāng chā jù xū yào cháng qī de zhèng cè zhī chí.', 'Mempersempit kesenjangan kota-desa membutuhkan dukungan kebijakan jangka panjang.'],
      ['越来越多的大学毕业生选择回到家乡创业，出现了人才回流。', 'Yuè lái yuè duō de dà xué bì yè shēng xuǎn zé huí dào jiā xiāng chuàng yè, chū xiàn le rén cái huí liú.', 'Semakin banyak lulusan universitas kembali ke kampung untuk berwirausaha, sehingga terjadi kembalinya talenta.'],
    ],
    [
      ['共享经济提高了闲置资源的利用效率。', 'Gòng xiǎng jīng jì tí gāo le xián zhì zī yuán de lì yòng xiào lǜ.', 'Ekonomi berbagi meningkatkan efisiensi pemanfaatan sumber daya yang menganggur.'],
      ['外卖骑手是零工经济的典型代表。', 'Wài mài qí shǒu shì líng gōng jīng jì de diǎn xíng dài biǎo.', 'Kurir pesan-antar makanan adalah contoh khas ekonomi gig.'],
      ['平台经济快速发展，劳动权益保障却相对滞后。', 'Píng tái jīng jì kuài sù fā zhǎn, láo dòng quán yì bǎo zhàng què xiāng duì zhì hòu.', 'Ekonomi platform berkembang pesat, tetapi perlindungan hak pekerja relatif tertinggal.'],
    ],
    [
      ['心理健康问题常常因为污名化而被忽视。', 'Xīn lǐ jiàn kāng wèn tí cháng cháng yīn wèi wū míng huà ér bèi hū shì.', 'Masalah kesehatan mental sering diabaikan karena stigmatisasi.'],
      ['适度的焦虑能促使人进步，过度则会损害健康。', 'Shì dù de jiāo lǜ néng cù shǐ rén jìn bù, guò dù zé huì sǔn hài jiàn kāng.', 'Kecemasan yang wajar dapat mendorong kemajuan, tetapi yang berlebihan merusak kesehatan.'],
      ['来自家人和朋友的社会支持非常重要。', 'Lái zì jiā rén hé péng yǒu de shè huì zhī chí fēi cháng zhòng yào.', 'Dukungan sosial dari keluarga dan teman sangat penting.'],
    ],
    [
      ['科技创新是推动产业升级的核心动力。', 'Kē jì chuàng xīn shì tuī dòng chǎn yè shēng jí de hé xīn dòng lì.', 'Inovasi iptek adalah pendorong utama peningkatan industri.'],
      ['企业加大研发投入，才能掌握核心技术。', 'Qǐ yè jiā dà yán fā tóu rù, cái néng zhǎng wò hé xīn jì shù.', 'Perusahaan harus meningkatkan investasi litbang agar menguasai teknologi inti.'],
      ['保护知识产权有利于科研成果转化。', 'Bǎo hù zhī shi chǎn quán yǒu lì yú kē yán chéng guǒ zhuǎn huà.', 'Perlindungan hak kekayaan intelektual mendukung hilirisasi hasil riset.'],
    ],
    [
      ['语言政策影响着少数民族语言的未来。', 'Yǔ yán zhèng cè yǐng xiǎng zhe shǎo shù mín zú yǔ yán de wèi lái.', 'Kebijakan bahasa memengaruhi masa depan bahasa-bahasa minoritas.'],
      ['双语教育可以兼顾交流需要和文化传承。', 'Shuāng yǔ jiào yù kě yǐ jiān gù jiāo liú xū yào hé wén huà chuán chéng.', 'Pendidikan dwibahasa dapat memenuhi kebutuhan komunikasi sekaligus pewarisan budaya.'],
      ['方言保护的意义在于维持语言活力。', 'Fāng yán bǎo hù de yì yì zài yú wéi chí yǔ yán huó lì.', 'Makna pelestarian dialek terletak pada menjaga vitalitas bahasa.'],
    ],
    [
      ['产业升级正在改变整个就业结构。', 'Chǎn yè shēng jí zhèng zài gǎi biàn zhěng gè jiù yè jié gòu.', 'Peningkatan industri sedang mengubah seluruh struktur ketenagakerjaan.'],
      ['技能错配导致企业招不到人，毕业生找不到工作。', 'Jì néng cuò pèi dǎo zhì qǐ yè zhāo bú dào rén, bì yè shēng zhǎo bú dào gōng zuò.', 'Ketidaksesuaian keterampilan membuat perusahaan sulit merekrut dan lulusan sulit mendapat kerja.'],
      ['灵活就业为年轻人提供了更多选择。', 'Líng huó jiù yè wèi nián qīng rén tí gōng le gèng duō xuǎn zé.', 'Kerja fleksibel memberikan lebih banyak pilihan bagi anak muda.'],
    ],
    [
      ['昆曲被列入了非物质文化遗产名录。', 'Kūn qǔ bèi liè rù le fēi wù zhì wén huà yí chǎn míng lù.', 'Opera Kunqu dimasukkan ke dalam daftar warisan budaya takbenda.'],
      ['活态传承强调让传统技艺回到日常生活中。', 'Huó tài chuán chéng qiáng diào ràng chuán tǒng jì yì huí dào rì cháng shēng huó zhōng.', 'Pewarisan hidup menekankan agar keterampilan tradisional kembali ke kehidupan sehari-hari.'],
      ['旅游业的过度开发可能破坏文化遗产的原貌。', 'Lǚ yóu yè de guò dù kāi fā kě néng pò huài wén huà yí chǎn de yuán mào.', 'Eksploitasi berlebihan oleh pariwisata dapat merusak keaslian warisan budaya.'],
    ],
    [
      ['学术诚信是科研工作的底线。', 'Xué shù chéng xìn shì kē yán gōng zuò de dǐ xiàn.', 'Integritas akademik adalah batas minimal dalam kerja riset.'],
      ['抄袭他人成果会受到严厉处分。', 'Chāo xí tā rén chéng guǒ huì shòu dào yán lì chǔ fèn.', 'Plagiarisme atas karya orang lain akan dikenai sanksi berat.'],
      ['论文发表前需要经过严格的同行评审。', 'Lùn wén fā biǎo qián xū yào jīng guò yán gé de tóng háng píng shěn.', 'Sebelum terbit, makalah harus melalui telaah sejawat yang ketat.'],
    ],
    [
      ['面对全球性挑战，国际合作比以往任何时候都重要。', 'Miàn duì quán qiú xìng tiǎo zhàn, guó jì hé zuò bǐ yǐ wǎng rèn hé shí hòu dōu zhòng yào.', 'Menghadapi tantangan global, kerja sama internasional lebih penting daripada kapan pun.'],
      ['多边主义有助于维护公平的国际秩序。', 'Duō biān zhǔ yì yǒu zhù yú wéi hù gōng píng de guó jì zhì xù.', 'Multilateralisme membantu menjaga tatanan internasional yang adil.'],
      ['建立互信需要长期而稳定的交流。', 'Jiàn lì hù xìn xū yào cháng qī ér wěn dìng de jiāo liú.', 'Membangun saling percaya membutuhkan pertukaran yang panjang dan stabil.'],
    ],
    [
      ['答辩时，要先用一句话说明研究的核心论点。', 'Dá biàn shí, yào xiān yòng yí jù huà shuō míng yán jiū de hé xīn lùn diǎn.', 'Saat sidang pembelaan, jelaskan dulu argumen inti penelitian dalam satu kalimat.'],
      ['这份学术报告对已有研究做了综合评述。', 'Zhè fèn xué shù bào gào duì yǐ yǒu yán jiū zuò le zōng hé píng shù.', 'Presentasi akademik ini menyajikan tinjauan komprehensif atas penelitian terdahulu.'],
      ['论点提炼得越清楚，听众越容易理解。', 'Lùn diǎn tí liàn de yuè qīng chu, tīng zhòng yuè róng yì lǐ jiě.', 'Semakin tajam argumen dirumuskan, semakin mudah pendengar memahaminya.'],
    ],
  ],
  'hsk-8': [
    [
      ['产业政策的有效性取决于政策工具的选择。', 'Chǎn yè zhèng cè de yǒu xiào xìng qǔ jué yú zhèng cè gōng jù de xuǎn zé.', 'Efektivitas kebijakan industri bergantung pada pilihan instrumen kebijakan.'],
      ['长期补贴可能削弱企业的竞争意识。', 'Cháng qī bǔ tiē kě néng xuē ruò qǐ yè de jìng zhēng yì shí.', 'Subsidi jangka panjang dapat melemahkan semangat bersaing perusahaan.'],
      ['在市场失灵的领域，政府干预才具有合理性。', 'Zài shì chǎng shī líng de lǐng yù, zhèng fǔ gān yù cái jù yǒu hé lǐ xìng.', 'Intervensi pemerintah baru memiliki justifikasi di bidang yang mengalami kegagalan pasar.'],
    ],
    [
      ['财政赤字持续扩大，会增加债务风险。', 'Cái zhèng chì zì chí xù kuò dà, huì zēng jiā zhài wù fēng xiǎn.', 'Defisit fiskal yang terus melebar akan meningkatkan risiko utang.'],
      ['中央向地方的转移支付有助于缩小地区差距。', 'Zhōng yāng xiàng dì fāng de zhuǎn yí zhī fù yǒu zhù yú suō xiǎo dì qū chā jù.', 'Transfer fiskal dari pusat ke daerah membantu mempersempit kesenjangan wilayah.'],
      ['优化税收结构是实现财政可持续性的重要途径。', 'Yōu huà shuì shōu jié gòu shì shí xiàn cái zhèng kě chí xù xìng de zhòng yào tú jìng.', 'Mengoptimalkan struktur pajak adalah jalan penting menuju keberlanjutan fiskal.'],
    ],
    [
      ['社会保障的覆盖面还需要进一步扩大。', 'Shè huì bǎo zhàng de fù gài miàn hái xū yào jìn yí bù kuò dà.', 'Cakupan jaminan sosial masih perlu diperluas lebih lanjut.'],
      ['提高社保的可携带性，有利于劳动力跨地区流动。', 'Tí gāo shè bǎo de kě xié dài xìng, yǒu lì yú láo dòng lì kuà dì qū liú dòng.', 'Meningkatkan portabilitas jaminan sosial mendukung mobilitas tenaga kerja antarwilayah.'],
      ['兜底保障体现了社会对最弱势群体的责任。', 'Dōu dǐ bǎo zhàng tǐ xiàn le shè huì duì zuì ruò shì qún tǐ de zé rèn.', 'Jaring pengaman dasar mencerminkan tanggung jawab masyarakat terhadap kelompok paling rentan.'],
    ],
    [
      ['户籍制度曾经限制了人口的自由流动。', 'Hù jí zhì dù céng jīng xiàn zhì le rén kǒu de zì yóu liú dòng.', 'Sistem registrasi penduduk pernah membatasi mobilitas penduduk secara bebas.'],
      ['推进城镇化必须实现公共服务均等化。', 'Tuī jìn chéng zhèn huà bì xū shí xiàn gōng gòng fú wù jūn děng huà.', 'Mendorong urbanisasi harus disertai pemerataan layanan publik.'],
      ['流动人口的子女教育问题值得高度关注。', 'Liú dòng rén kǒu de zǐ nǚ jiào yù wèn tí zhí dé gāo dù guān zhù.', 'Masalah pendidikan anak-anak penduduk migran layak mendapat perhatian besar.'],
    ],
    [
      ['能源转型不仅是技术问题，也是制度问题。', 'Néng yuán zhuǎn xíng bù jǐn shì jì shù wèn tí, yě shì zhì dù wèn tí.', 'Transisi energi bukan hanya masalah teknologi, tetapi juga masalah institusional.'],
      ['储能技术的突破将改变电网的运行方式。', 'Chǔ néng jì shù de tū pò jiāng gǎi biàn diàn wǎng de yùn xíng fāng shì.', 'Terobosan teknologi penyimpanan energi akan mengubah cara kerja jaringan listrik.'],
      ['光伏发电的成本曲线在过去十年大幅下降。', 'Guāng fú fā diàn de chéng běn qū xiàn zài guò qù shí nián dà fú xià jiàng.', 'Kurva biaya pembangkit listrik tenaga surya turun tajam dalam sepuluh tahun terakhir.'],
    ],
    [
      ['数据治理需要平衡安全与发展。', 'Shù jù zhì lǐ xū yào píng héng ān quán yǔ fā zhǎn.', 'Tata kelola data perlu menyeimbangkan keamanan dan pembangunan.'],
      ['数据确权是建立数据市场的前提。', 'Shù jù què quán shì jiàn lì shù jù shì chǎng de qián tí.', 'Penetapan hak atas data adalah prasyarat membangun pasar data.'],
      ['企业在处理数据跨境流动时必须确保合规。', 'Qǐ yè zài chǔ lǐ shù jù kuà jìng liú dòng shí bì xū què bǎo hé guī.', 'Perusahaan harus memastikan kepatuhan regulasi saat menangani aliran data lintas batas.'],
    ],
    [
      ['科研评价不应只看影响因子。', 'Kē yán píng jià bú yìng zhǐ kàn yǐng xiǎng yīn zǐ.', 'Evaluasi riset tidak seharusnya hanya melihat faktor dampak.'],
      ['破除唯论文倾向，才能鼓励长期的原创研究。', 'Pò chú wéi lùn wén qīng xiàng, cái néng gǔ lì cháng qī de yuán chuàng yán jiū.', 'Hanya dengan menghapus orientasi semata pada publikasi, riset orisinal jangka panjang dapat didorong.'],
      ['同行评议的质量决定了学术评价的公信力。', 'Tóng háng píng yì de zhì liàng jué dìng le xué shù píng jià de gōng xìn lì.', 'Kualitas penilaian sejawat menentukan kredibilitas evaluasi akademik.'],
    ],
    [
      ['完善应急管理体系是提升城市韧性的基础。', 'Wán shàn yìng jí guǎn lǐ tǐ xì shì tí shēng chéng shì rèn xìng de jī chǔ.', 'Menyempurnakan sistem manajemen darurat adalah dasar meningkatkan ketahanan kota.'],
      ['风险沟通不及时，容易引发公众的不信任。', 'Fēng xiǎn gōu tōng bù jí shí, róng yì yǐn fā gōng zhòng de bú xìn rèn.', 'Komunikasi risiko yang terlambat mudah memicu ketidakpercayaan publik.'],
      ['各部门之间需要建立高效的协同机制。', 'Gè bù mén zhī jiān xū yào jiàn lì gāo xiào de xié tóng jī zhì.', 'Antarlembaga perlu membangun mekanisme koordinasi yang efisien.'],
    ],
    [
      ['新的评价体系更加重视学生的全面发展。', 'Xīn de píng jià tǐ xì gèng jiā zhòng shì xué shēng de quán miàn fā zhǎn.', 'Sistem penilaian baru lebih mementingkan perkembangan menyeluruh siswa.'],
      ['过程性评价关注学生在学习中的进步。', 'Guò chéng xìng píng jià guān zhù xué shēng zài xué xí zhōng de jìn bù.', 'Penilaian proses memperhatikan kemajuan siswa selama belajar.'],
      ['减负的目的不是降低要求，而是提高效率。', 'Jiǎn fù de mù dì bú shì jiàng dī yāo qiú, ér shì tí gāo xiào lǜ.', 'Tujuan mengurangi beban belajar bukan menurunkan standar, melainkan meningkatkan efisiensi.'],
    ],
    [
      ['女性劳动参与率的变化反映了社会观念的转变。', 'Nǚ xìng láo dòng cān yù lǜ de biàn huà fǎn yìng le shè huì guān niàn de zhuǎn biàn.', 'Perubahan tingkat partisipasi kerja perempuan mencerminkan pergeseran pandangan sosial.'],
      ['产业转型期往往伴随着结构性失业。', 'Chǎn yè zhuǎn xíng qī wǎng wǎng bàn suí zhe jié gòu xìng shī yè.', 'Masa transformasi industri sering disertai pengangguran struktural.'],
      ['提高最低工资可能对小企业造成压力。', 'Tí gāo zuì dī gōng zī kě néng duì xiǎo qǐ yè zào chéng yā lì.', 'Menaikkan upah minimum dapat menekan usaha kecil.'],
    ],
    [
      ['金融监管的首要任务是防范系统性风险。', 'Jīn róng jiān guǎn de shǒu yào rèn wu shì fáng fàn xì tǒng xìng fēng xiǎn.', 'Tugas utama regulasi keuangan adalah mencegah risiko sistemik.'],
      ['杠杆率过高会放大市场波动。', 'Gàng gǎn lǜ guò gāo huì fàng dà shì chǎng bō dòng.', 'Rasio leverage yang terlalu tinggi akan memperbesar gejolak pasar.'],
      ['宏观审慎政策关注整个金融体系的稳定。', 'Hóng guān shěn shèn zhèng cè guān zhù zhěng gè jīn róng tǐ xì de wěn dìng.', 'Kebijakan makroprudensial memperhatikan stabilitas seluruh sistem keuangan.'],
    ],
    [
      ['污染是一种典型的负外部性。', 'Wū rǎn shì yì zhǒng diǎn xíng de fù wài bù xìng.', 'Polusi adalah contoh khas eksternalitas negatif.'],
      ['碳交易市场用价格机制引导企业减排。', 'Tàn jiāo yì shì chǎng yòng jià gé jī zhì yǐn dǎo qǐ yè jiǎn pái.', 'Pasar perdagangan karbon memakai mekanisme harga untuk mendorong perusahaan mengurangi emisi.'],
      ['环境规制的效果取决于执法力度。', 'Huán jìng guī zhì de xiào guǒ qǔ jué yú zhí fǎ lì dù.', 'Efektivitas regulasi lingkungan bergantung pada ketegasan penegakan hukum.'],
    ],
    [
      ['网络效应使大型平台更容易形成市场支配地位。', 'Wǎng luò xiào yìng shǐ dà xíng píng tái gèng róng yì xíng chéng shì chǎng zhī pèi dì wèi.', 'Efek jaringan membuat platform besar lebih mudah memperoleh posisi dominan di pasar.'],
      ['反垄断执法需要适应数字经济的新特点。', 'Fǎn lǒng duàn zhí fǎ xū yào shì yìng shù zì jīng jì de xīn tè diǎn.', 'Penegakan antimonopoli perlu menyesuaikan diri dengan ciri baru ekonomi digital.'],
      ['算法合谋比传统的价格协议更难发现。', 'Suàn fǎ hé móu bǐ chuán tǒng de jià gé xié yì gèng nán fā xiàn.', 'Kolusi algoritmik lebih sulit dideteksi daripada kesepakatan harga tradisional.'],
    ],
    [
      ['生育率持续下降已成为许多国家的共同问题。', 'Shēng yù lǜ chí xù xià jiàng yǐ chéng wéi xǔ duō guó jiā de gòng tóng wèn tí.', 'Tingkat kelahiran yang terus menurun telah menjadi masalah bersama banyak negara.'],
      ['高昂的育儿成本影响了年轻人的生育意愿。', 'Gāo áng de yù ér chéng běn yǐng xiǎng le nián qīng rén de shēng yù yì yuàn.', 'Biaya pengasuhan anak yang tinggi memengaruhi keinginan anak muda untuk memiliki anak.'],
      ['人口红利正在逐渐减弱。', 'Rén kǒu hóng lì zhèng zài zhú jiàn jiǎn ruò.', 'Bonus demografi perlahan-lahan melemah.'],
    ],
    [
      ['区域协调发展要求发挥中心城市的辐射效应。', 'Qū yù xié tiáo fā zhǎn yāo qiú fā huī zhōng xīn chéng shì de fú shè xiào yìng.', 'Pembangunan regional yang terkoordinasi menuntut optimalisasi efek limpahan kota inti.'],
      ['产业转移为中西部地区带来了新的机遇。', 'Chǎn yè zhuǎn yí wèi zhōng xī bù dì qū dài lái le xīn de jī yù.', 'Relokasi industri membawa peluang baru bagi wilayah tengah dan barat.'],
      ['打破行政壁垒，才能促进要素流动。', 'Dǎ pò xíng zhèng bì lěi, cái néng cù jìn yào sù liú dòng.', 'Hanya dengan meruntuhkan sekat administratif, mobilitas faktor produksi dapat didorong.'],
    ],
    [
      ['公共文化服务应该覆盖农村和偏远地区。', 'Gōng gòng wén huà fú wù yīng gāi fù gài nóng cūn hé piān yuǎn dì qū.', 'Layanan budaya publik harus menjangkau pedesaan dan daerah terpencil.'],
      ['博物馆的数字化转型吸引了更多年轻观众。', 'Bó wù guǎn de shù zì huà zhuǎn xíng xī yǐn le gèng duō nián qīng guān zhòng.', 'Transformasi digital museum menarik lebih banyak pengunjung muda.'],
      ['提高居民参与度是评估文化供给的重要指标。', 'Tí gāo jū mín cān yù dù shì píng gū wén huà gōng jǐ de zhòng yào zhǐ biāo.', 'Meningkatkan tingkat partisipasi warga adalah indikator penting dalam menilai penyediaan budaya.'],
    ],
    [
      ['关税壁垒的提高扰乱了全球贸易秩序。', 'Guān shuì bì lěi de tí gāo rǎo luàn le quán qiú mào yì zhì xù.', 'Naiknya hambatan tarif mengganggu tatanan perdagangan global.'],
      ['疫情让各国更加重视供应链韧性。', 'Yì qíng ràng gè guó gèng jiā zhòng shì gōng yìng liàn rèn xìng.', 'Pandemi membuat berbagai negara lebih memperhatikan ketahanan rantai pasok.'],
      ['原产地规则决定了商品能否享受优惠关税。', 'Yuán chǎn dì guī zé jué dìng le shāng pǐn néng fǒu xiǎng shòu yōu huì guān shuì.', 'Aturan negara asal menentukan apakah barang dapat menikmati tarif preferensial.'],
    ],
    [
      ['相关关系并不等于因果关系，因果推断需要更严格的方法。', 'Xiāng guān guān xì bìng bù děng yú yīn guǒ guān xì, yīn guǒ tuī duàn xū yào gèng yán gé de fāng fǎ.', 'Korelasi tidak sama dengan kausalitas; inferensi kausal membutuhkan metode yang lebih ketat.'],
      ['如果忽视内生性问题，估计结果可能有偏差。', 'Rú guǒ hū shì nèi shēng xìng wèn tí, gū jì jié guǒ kě néng yǒu piān chā.', 'Jika masalah endogenitas diabaikan, hasil estimasi bisa bias.'],
      ['作者做了多项稳健性检验，结论依然成立。', 'Zuò zhě zuò le duō xiàng wěn jiàn xìng jiǎn yàn, jié lùn yī rán chéng lì.', 'Penulis melakukan beberapa uji robustitas dan kesimpulannya tetap berlaku.'],
    ],
    [
      ['政策评估需要回答一个反事实问题：如果没有这项政策会怎样？', 'Zhèng cè píng gū xū yào huí dá yí gè fǎn shì shí wèn tí: rú guǒ méi yǒu zhè xiàng zhèng cè huì zěn yàng?', 'Evaluasi kebijakan perlu menjawab pertanyaan kontrafaktual: apa yang terjadi jika kebijakan ini tidak ada?'],
      ['成本收益分析帮助决策者比较不同方案。', 'Chéng běn shōu yì fēn xī bāng zhù jué cè zhě bǐ jiào bù tóng fāng àn.', 'Analisis biaya-manfaat membantu pembuat keputusan membandingkan berbagai opsi.'],
      ['科学的指标体系是客观评估的基础。', 'Kē xué de zhǐ biāo tǐ xì shì kè guān píng gū de jī chǔ.', 'Sistem indikator yang ilmiah adalah dasar evaluasi yang objektif.'],
    ],
    [
      ['政策建议书应该先给出结论，再说明依据。', 'Zhèng cè jiàn yì shū yīng gāi xiān gěi chū jié lùn, zài shuō míng yī jù.', 'Naskah rekomendasi kebijakan harus menyajikan kesimpulan dulu, lalu menjelaskan dasarnya.'],
      ['研究综述部分需要指出现有文献的不足。', 'Yán jiū zōng shù bù fen xū yào zhǐ chū xiàn yǒu wén xiàn de bù zú.', 'Bagian tinjauan riset perlu menunjukkan kekurangan literatur yang ada.'],
      ['诚实地说明研究的局限性，反而会增加报告的可信度。', 'Chéng shí dì shuō míng yán jiū de jú xiàn xìng, fǎn ér huì zēng jiā bào gào de kě xìn dù.', 'Menjelaskan keterbatasan penelitian secara jujur justru menambah kredibilitas laporan.'],
    ],
  ],
  'hsk-9': [
    [
      ['现代性在带来效率的同时，也带来了人的异化。', 'Xiàn dài xìng zài dài lái xiào lǜ de tóng shí, yě dài lái le rén de yì huà.', 'Modernitas membawa efisiensi sekaligus alienasi manusia.'],
      ['韦伯认为，理性化是现代社会的基本趋势。', 'Wéi bó rèn wéi, lǐ xìng huà shì xiàn dài shè huì de jī běn qū shì.', 'Weber berpendapat bahwa rasionalisasi adalah kecenderungan dasar masyarakat modern.'],
      ['反思性意味着社会不断审视自身的前提。', 'Fǎn sī xìng yì wèi zhe shè huì bú duàn shěn shì zì shēn de qián tí.', 'Refleksivitas berarti masyarakat terus-menerus menelaah premis-premisnya sendiri.'],
    ],
    [
      ['知识并非纯粹客观，而是社会知识建构的产物。', 'Zhī shi bìng fēi chún cuì kè guān, ér shì shè huì zhī shi jiàn gòu de chǎn wù.', 'Pengetahuan tidak murni objektif, melainkan hasil konstruksi pengetahuan secara sosial.'],
      ['谁拥有话语权，谁就能定义什么是真理。', 'Shuí yōng yǒu huà yǔ quán, shuí jiù néng dìng yì shén me shì zhēn lǐ.', 'Siapa yang memiliki otoritas wacana dapat mendefinisikan apa itu kebenaran.'],
      ['认识论追问的是我们如何获得可靠的知识。', 'Rèn shi lùn zhuī wèn de shì wǒ men rú hé huò dé kě kào de zhī shi.', 'Epistemologi mempertanyakan bagaimana kita memperoleh pengetahuan yang andal.'],
    ],
    [
      ['技术决定论忽视了人在技术发展中的选择。', 'Jì shù jué dìng lùn hū shì le rén zài jì shù fā zhǎn zhōng de xuǎn zé.', 'Determinisme teknologi mengabaikan pilihan manusia dalam perkembangan teknologi.'],
      ['当工具理性压倒价值理性时，手段就变成了目的。', 'Dāng gōng jù lǐ xìng yā dǎo jià zhí lǐ xìng shí, shǒu duàn jiù biàn chéng le mù dì.', 'Ketika rasionalitas instrumental mengalahkan rasionalitas nilai, sarana berubah menjadi tujuan.'],
      ['后人类的讨论挑战了以人为中心的传统观念。', 'Hòu rén lèi de tǎo lùn tiǎo zhàn le yǐ rén wéi zhōng xīn de chuán tǒng guān niàn.', 'Diskusi pascamanusia menantang pandangan tradisional yang berpusat pada manusia.'],
    ],
    [
      ['公共理性要求公民用他人也能接受的理由进行讨论。', 'Gōng gòng lǐ xìng yāo qiú gōng mín yòng tā rén yě néng jiē shòu de lǐ yóu jìn xíng tǎo lùn.', 'Nalar publik menuntut warga berdiskusi dengan alasan yang juga dapat diterima orang lain.'],
      ['协商民主强调对话而不是简单的投票。', 'Xié shāng mín zhǔ qiáng diào duì huà ér bú shì jiǎn dān de tóu piào.', 'Demokrasi deliberatif menekankan dialog, bukan sekadar pemungutan suara.'],
      ['在价值多元的社会里，共识需要耐心建立。', 'Zài jià zhí duō yuán de shè huì lǐ, gòng shí xū yào nài xīn jiàn lì.', 'Dalam masyarakat dengan pluralitas nilai, konsensus harus dibangun dengan sabar.'],
    ],
    [
      ['文明互鉴的前提是承认差异、尊重他者。', 'Wén míng hù jiàn de qián tí shì chéng rèn chā yì, zūn zhòng tā zhě.', 'Prasyarat saling belajar antarperadaban adalah mengakui perbedaan dan menghormati liyan.'],
      ['文化间性强调在交流中产生新的理解。', 'Wén huà jiān xìng qiáng diào zài jiāo liú zhōng chǎn shēng xīn de lǐ jiě.', 'Interkulturalitas menekankan lahirnya pemahaman baru dalam pertukaran.'],
      ['任何普遍性都需要在具体语境中接受检验。', 'Rèn hé pǔ biàn xìng dōu xū yào zài jù tǐ yǔ jìng zhōng jiē shòu jiǎn yàn.', 'Setiap klaim universalitas perlu diuji dalam konteks yang konkret.'],
    ],
    [
      ['生态伦理要求我们重新思考人与自然的关系。', 'Shēng tài lún lǐ yāo qiú wǒ men chóng xīn sī kǎo rén yǔ zì rán de guān xì.', 'Etika ekologis menuntut kita memikirkan ulang hubungan manusia dan alam.'],
      ['人类中心主义把自然仅仅看作资源。', 'Rén lèi zhōng xīn zhǔ yì bǎ zì rán jǐn jǐn kàn zuò zī yuán.', 'Antroposentrisme memandang alam semata-mata sebagai sumber daya.'],
      ['气候问题本质上是一个代际正义问题。', 'Qì hòu wèn tí běn zhì shàng shì yí gè dài jì zhèng yì wèn tí.', 'Masalah iklim pada dasarnya adalah masalah keadilan antargenerasi.'],
    ],
    [
      ['集体记忆往往通过节日和纪念仪式得以延续。', 'Jí tǐ jì yì wǎng wǎng tōng guò jié rì hé jì niàn yí shì dé yǐ yán xù.', 'Memori kolektif sering dilestarikan melalui hari raya dan upacara peringatan.'],
      ['历史书写总是包含着选择和遗忘。', 'Lì shǐ shū xiě zǒng shì bāo hán zhe xuǎn zé hé yí wàng.', 'Penulisan sejarah selalu mengandung pemilihan dan pelupaan.'],
      ['叙事建构影响着一个民族的身份认同。', 'Xù shì jiàn gòu yǐng xiǎng zhe yí gè mín zú de shēn fèn rèn tóng.', 'Konstruksi naratif memengaruhi identitas diri suatu bangsa.'],
    ],
    [
      ['语言霸权使弱势语言的使用空间不断缩小。', 'Yǔ yán bà quán shǐ ruò shì yǔ yán de shǐ yòng kōng jiān bú duàn suō xiǎo.', 'Hegemoni bahasa membuat ruang penggunaan bahasa-bahasa lemah terus menyempit.'],
      ['话语分析揭示了文本背后的意识形态。', 'Huà yǔ fēn xī jiē shì le wén běn bèi hòu de yì shí xíng tài.', 'Analisis wacana mengungkap ideologi di balik teks.'],
      ['解构并不是否定一切，而是揭示意义的不稳定性。', 'Jiě gòu bìng bú shì fǒu dìng yí qiè, ér shì jiē shì yì yì de bù wěn dìng xìng.', 'Dekonstruksi bukan menyangkal segalanya, melainkan mengungkap ketidakstabilan makna.'],
    ],
    [
      ['经典之所以是经典，是因为它经得起反复阅读。', 'Jīng diǎn zhī suǒ yǐ shì jīng diǎn, shì yīn wèi tā jīng dé qǐ fǎn fù yuè dú.', 'Karya klasik menjadi klasik karena tahan dibaca berulang kali.'],
      ['每一代读者都会对经典作出新的阐释。', 'Měi yí dài dú zhě dōu huì duì jīng diǎn zuò chū xīn de chǎn shì.', 'Setiap generasi pembaca akan memberikan interpretasi baru atas karya klasik.'],
      ['语境化的阅读帮助我们理解作者所处的时代。', 'Yǔ jìng huà de yuè dú bāng zhù wǒ men lǐ jiě zuò zhě suǒ chù de shí dài.', 'Pembacaan yang dikontekstualisasi membantu kita memahami zaman pengarang.'],
    ],
    [
      ['复杂系统中的整体行为无法简单还原为部分之和。', 'Fù zá xì tǒng zhōng de zhěng tǐ xíng wéi wú fǎ jiǎn dān huán yuán wèi bù fen zhī hé.', 'Perilaku keseluruhan dalam sistem kompleks tidak bisa direduksi menjadi jumlah bagian-bagiannya.'],
      ['蚁群的秩序是一种典型的涌现现象。', 'Yǐ qún de zhì xù shì yì zhǒng diǎn xíng de yǒng xiàn xiàn xiàng.', 'Keteraturan koloni semut adalah fenomena emergensi yang khas.'],
      ['在非线性系统中，微小的变化可能引起巨大的后果。', 'Zài fēi xiàn xìng xì tǒng zhōng, wēi xiǎo de biàn huà kě néng yǐn qǐ jù dà de hòu guǒ.', 'Dalam sistem nonlinear, perubahan kecil dapat menimbulkan akibat besar.'],
    ],
    [
      ['贝克提出，我们生活在一个风险社会之中。', 'Bèi kè tí chū, wǒ men shēng huó zài yí gè fēng xiǎn shè huì zhī zhōng.', 'Beck mengemukakan bahwa kita hidup dalam masyarakat risiko.'],
      ['面对不确定性，公众越来越依赖专家系统。', 'Miàn duì bú què dìng xìng, gōng zhòng yuè lái yuè yī lài zhuān jiā xì tǒng.', 'Menghadapi ketidakpastian, publik semakin bergantung pada sistem pakar.'],
      ['一旦专家判断失误，就可能引发信任危机。', 'Yí dàn zhuān jiā pàn duàn shī wù, jiù kě néng yǐn fā xìn rèn wēi jī.', 'Sekali penilaian pakar keliru, krisis kepercayaan dapat terjadi.'],
    ],
    [
      ['全球治理的难点在于缺乏超越主权的权威。', 'Quán qiú zhì lǐ de nán diǎn zài yú quē fá chāo yuè zhǔ quán de quán wēi.', 'Kesulitan tata kelola global terletak pada ketiadaan otoritas di atas kedaulatan.'],
      ['气候稳定是一种典型的全球公共产品。', 'Qì hòu wěn dìng shì yì zhǒng diǎn xíng de quán qiú gōng gòng chǎn pǐn.', 'Stabilitas iklim adalah contoh khas barang publik global.'],
      ['发展中国家希望提升在国际组织中的制度性话语权。', 'Fā zhǎn zhōng guó jiā xī wàng tí shēng zài guó jì zǔ zhī zhōng de zhì dù xìng huà yǔ quán.', 'Negara berkembang berharap meningkatkan pengaruh institusional di organisasi internasional.'],
    ],
    [
      ['中国古典诗歌追求情景交融的意境。', 'Zhōng guó gǔ diǎn shī gē zhuī qiú qíng jǐng jiāo róng de yì jìng.', 'Puisi klasik Tiongkok mengejar suasana artistik yang memadukan perasaan dan pemandangan.'],
      ['审美经验既是个人的，也是历史的。', 'Shěn měi jīng yàn jì shì gè rén de, yě shì lì shǐ de.', 'Pengalaman estetis bersifat pribadi sekaligus historis.'],
      ['优秀的作品往往实现了形式与内容的统一。', 'Yōu xiù de zuò pǐn wǎng wǎng shí xiàn le xíng shì yǔ nèi róng de tǒng yī.', 'Karya yang unggul sering mewujudkan kesatuan bentuk dan isi.'],
    ],
    [
      ['波普尔认为，可证伪性是区分科学与非科学的标准。', 'Bō pǔ ěr rèn wéi, kě zhèng wěi xìng shì qū fēn kē xué yǔ fēi kē xué de biāo zhǔn.', 'Popper berpendapat bahwa falsifiabilitas adalah kriteria pembeda sains dan nonsains.'],
      ['库恩指出，科学革命意味着范式的转换。', 'Kù ēn zhǐ chū, kē xué gé mìng yì wèi zhe fàn shì de zhuǎn huàn.', 'Kuhn menunjukkan bahwa revolusi ilmiah berarti pergantian paradigma.'],
      ['观察并不中立，它总是带有理论负载。', 'Guān chá bìng bù zhōng lì, tā zǒng shì dài yǒu lǐ lùn fù zài.', 'Observasi tidak netral; ia selalu membawa muatan teori.'],
    ],
    [
      ['罗尔斯的正义理论重视分配正义。', 'Luó ěr sī de zhèng yì lǐ lùn zhòng shì fēn pèi zhèng yì.', 'Teori keadilan Rawls menekankan keadilan distributif.'],
      ['程序正义保证了结果能够被各方接受。', 'Chéng xù zhèng yì bǎo zhèng le jié guǒ néng gòu bèi gè fāng jiē shòu.', 'Keadilan prosedural menjamin hasilnya dapat diterima semua pihak.'],
      ['机会平等并不等于结果平等。', 'Jī huì píng děng bìng bù děng yú jié guǒ píng děng.', 'Kesetaraan kesempatan tidak sama dengan kesetaraan hasil.'],
    ],
    [
      ['绅士化让老街区的原住民被迫离开。', 'Shēn shì huà ràng lǎo jiē qū de yuán zhù mín bèi pò lí kāi.', 'Gentrifikasi membuat penghuni asli kawasan lama terpaksa pergi.'],
      ['空间正义关心谁有权利使用和塑造城市。', 'Kōng jiān zhèng yì guān xīn shuí yǒu quán lì shǐ yòng hé sù zào chéng shì.', 'Keadilan spasial memperhatikan siapa yang berhak menggunakan dan membentuk kota.'],
      ['一条老街承载着居民的地方感和记忆。', 'Yì tiáo lǎo jiē chéng zài zhe jū mín de dì fāng gǎn hé jì yì.', 'Sebuah jalan tua memikul rasa tempat dan kenangan para penghuninya.'],
    ],
    [
      ['在注意力经济中，用户的时间成为了商品。', 'Zài zhù yì lì jīng jì zhōng, yòng hù de shí jiān chéng wéi le shāng pǐn.', 'Dalam ekonomi perhatian, waktu pengguna menjadi komoditas.'],
      ['算法治理需要公开、可解释和可问责。', 'Suàn fǎ zhì lǐ xū yào gōng kāi, kě jiě shì hé kě wèn zé.', 'Tata kelola algoritma harus terbuka, dapat dijelaskan, dan dapat dimintai pertanggungjawaban.'],
      ['数字人文为研究古代文献提供了新方法。', 'Shù zì rén wén wèi yán jiū gǔ dài wén xiàn tí gōng le xīn fāng fǎ.', 'Humaniora digital menyediakan metode baru untuk meneliti dokumen kuno.'],
    ],
    [
      ['跨学科研究往往从真实的问题出发，即问题导向。', 'Kuà xué kē yán jiū wǎng wǎng cóng zhēn shí de wèn tí chū fā, jí wèn tí dǎo xiàng.', 'Riset lintas disiplin biasanya berangkat dari masalah nyata, yaitu berorientasi masalah.'],
      ['方法融合可以弥补单一学科的局限。', 'Fāng fǎ róng hé kě yǐ mí bǔ dān yī xué kē de jú xiàn.', 'Integrasi metode dapat menutupi keterbatasan satu disiplin ilmu.'],
      ['打破学科壁垒需要制度上的支持。', 'Dǎ pò xué kē bì lěi xū yào zhì dù shàng de zhī chí.', 'Meruntuhkan sekat antardisiplin membutuhkan dukungan institusional.'],
    ],
    [
      ['学术共同体依靠共同遵守的学术规范运行。', 'Xué shù gòng tóng tǐ yī kào gòng tóng zūn shǒu de xué shù guī fàn yùn xíng.', 'Komunitas akademik berjalan berdasarkan norma akademik yang dipatuhi bersama.'],
      ['学术自由是知识创新的重要保障。', 'Xué shù zì yóu shì zhī shi chuàng xīn de zhòng yào bǎo zhàng.', 'Kebebasan akademik adalah jaminan penting bagi inovasi pengetahuan.'],
      ['公共知识分子把专业知识带入公共讨论。', 'Gōng gòng zhī shi fēn zǐ bǎ zhuān yè zhī shi dài rù gōng gòng tǎo lùn.', 'Intelektual publik membawa pengetahuan keahlian ke dalam diskusi publik.'],
    ],
    [
      ['一篇好的学术论文始于一个清晰的研究问题。', 'Yì piān hǎo de xué shù lùn wén shǐ yú yí gè qīng xī de yán jiū wèn tí.', 'Makalah akademik yang baik dimulai dari pertanyaan penelitian yang jelas.'],
      ['论文的理论贡献应该在引言中明确说明。', 'Lùn wén de lǐ lùn gòng xiàn yīng gāi zài yǐn yán zhōng míng què shuō míng.', 'Kontribusi teoretis makalah harus dijelaskan dengan tegas di pendahuluan.'],
      ['学术对话要求我们既回应前人，也启发后人。', 'Xué shù duì huà yāo qiú wǒ men jì huí yìng qián rén, yě qǐ fā hòu rén.', 'Dialog akademik menuntut kita menanggapi pendahulu sekaligus menginspirasi penerus.'],
    ],
  ],
};

export function getMandarinThemeSentences(level: MandarinLevelId, lesson: number): MandarinThemeSentence[] {
  return (sentenceBank[level]?.[lesson - 1] ?? []).map(([hanzi, pinyin, meaning]) => ({ hanzi, pinyin, meaning }));
}

export function getMandarinLevelThemeSentences(level: MandarinLevelId): MandarinThemeSentence[] {
  return (sentenceBank[level] ?? []).flat().map(([hanzi, pinyin, meaning]) => ({ hanzi, pinyin, meaning }));
}
