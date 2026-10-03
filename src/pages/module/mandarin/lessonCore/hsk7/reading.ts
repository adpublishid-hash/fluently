import type { LessonCoreTuple } from '../types';

// Reading HSK 7 (Bacaan kritis + theme) — one entry per lesson (index = lesson - 1).
export const reading: LessonCoreTuple[] = [
  [null, ['Bacaan kritis pembaruan kota: temukan siapa yang diuntungkan dan siapa yang tidak disebut.', 'Pertanyaan kritis: 谁受益？谁的声音缺席？'], [
    ['报道称，改造后的街区房价上涨了三成。', 'Bào dào chēng, gǎi zào hòu de jiē qū fáng jià shàng zhǎng le sān chéng.', 'Laporan menyebut harga rumah di kawasan yang direnovasi naik tiga puluh persen.'],
    ['文章把这视为改造成功的证据。', 'Wén zhāng bǎ zhè shì wéi gǎi zào chéng gōng de zhèng jù.', 'Artikel memandangnya sebagai bukti keberhasilan renovasi.'],
    ['但对租户来说，这意味着被迫离开。', 'Dàn duì zū hù lái shuō, zhè yì wèi zhe bèi pò lí kāi.', 'Tetapi bagi penyewa, ini berarti terpaksa pergi.'],
    ['原住民的声音在文中几乎缺席。', 'Yuán zhù mín de shēng yīn zài wén zhōng jī hū quē xí.', 'Suara penduduk asli hampir tidak ada dalam tulisan itu.'],
  ]],
  [null, ['Bacaan kritis kesenjangan digital: uji apakah solusi yang diusulkan menjawab penyebab yang disebut.', 'Cari ketidaksesuaian antara diagnosis dan resep.'], [
    ['作者认为老年人不会用手机的原因是缺乏培训。', 'Zuò zhě rèn wéi lǎo nián rén bú huì yòng shǒu jī de yuán yīn shì quē fá péi xùn.', 'Penulis berpendapat penyebab lansia tidak bisa memakai ponsel adalah kurang pelatihan.'],
    ['但文章前面的调查显示，主要障碍是界面太复杂。', 'Dàn wén zhāng qián miàn de diào chá xiǎn shì, zhǔ yào zhàng ài shì jiè miàn tài fù zá.', 'Tetapi survei di bagian awal artikel menunjukkan hambatan utamanya antarmuka yang terlalu rumit.'],
    ['诊断与对策之间存在明显的错位。', 'Zhěn duàn yǔ duì cè zhī jiān cún zài míng xiǎn de cuò wèi.', 'Ada ketidaksesuaian jelas antara diagnosis dan solusinya.'],
    ['更有效的对策也许是简化设计。', 'Gèng yǒu xiào de duì cè yě xǔ shì jiǎn huà shè jì.', 'Solusi yang lebih efektif mungkin menyederhanakan desain.'],
  ]],
  [null, ['Bacaan kritis penuaan penduduk: periksa apakah teks menyamakan "tua" dengan "beban".', 'Kata sarat nilai: 负担, 包袱, 银发浪潮.'], [
    ['文章反复使用"负担"一词描述老年人。', 'Wén zhāng fǎn fù shǐ yòng " fù dān " yì cí miáo shù lǎo nián rén.', 'Artikel berulang kali memakai kata "beban" untuk menggambarkan lansia.'],
    ['这种措辞暗含了一种价值判断。', 'Zhè zhǒng cuò cí àn hán le yì zhǒng jià zhí pàn duàn.', 'Pilihan kata ini menyiratkan sebuah penilaian nilai.'],
    ['事实上，许多老年人仍在照顾孙辈、参与志愿服务。', 'Shì shí shàng, xǔ duō lǎo nián rén réng zài zhào gù sūn bèi, cān yù zhì yuàn fú wù.', 'Faktanya, banyak lansia masih mengasuh cucu dan ikut kegiatan relawan.'],
    ['他们的贡献往往没有被计入统计。', 'Tā men de gòng xiàn wǎng wǎng méi yǒu bèi jì rù tǒng jì.', 'Kontribusi mereka sering tidak tercatat dalam statistik.'],
  ]],
  [null, ['Bacaan kritis keadilan pendidikan: cek apakah bukti mendukung klaim kausal.', 'Korelasi ≠ sebab-akibat.'], [
    ['文章指出，上补习班的学生成绩更好。', 'Wén zhāng zhǐ chū, shàng bǔ xí bān de xué shēng chéng jì gèng hǎo.', 'Artikel menunjukkan murid yang ikut bimbel nilainya lebih baik.'],
    ['并由此得出补习有效的结论。', 'Bìng yóu cǐ dé chū bǔ xí yǒu xiào de jié lùn.', 'Dan dari situ menyimpulkan bimbel efektif.'],
    ['然而，这些学生的家庭条件本来就更好。', 'Rán ér, zhè xiē xué shēng de jiā tíng tiáo jiàn běn lái jiù gèng hǎo.', 'Namun, kondisi keluarga murid-murid ini memang sudah lebih baik.'],
    ['不排除家庭背景才是真正的原因。', 'Bù pái chú jiā tíng bèi jǐng cái shì zhēn zhèng de yuán yīn.', 'Tidak tertutup kemungkinan latar belakang keluarga yang menjadi penyebab sebenarnya.'],
  ]],
  [null, ['Bacaan kritis perubahan iklim: bedakan konsensus ilmiah dan opini kolumnis.', 'Cari sumber yang dikutip dan statusnya.'], [
    ['作者声称气候变化的影响被"夸大了"。', 'Zuò zhě shēng chēng qì hòu biàn huà de yǐng xiǎng bèi " kuā dà le ".', 'Penulis mengklaim dampak perubahan iklim "dilebih-lebihkan".'],
    ['但他引用的只是一位非气候专业的学者。', 'Dàn tā yǐn yòng de zhǐ shì yí wèi fēi qì hòu zhuān yè de xué zhě.', 'Tetapi yang dia kutip hanyalah seorang sarjana di luar bidang iklim.'],
    ['这与国际科学评估报告的结论相悖。', 'Zhè yǔ guó jì kē xué píng gū bào gào de jié lùn xiāng bèi.', 'Ini bertentangan dengan kesimpulan laporan penilaian ilmiah internasional.'],
    ['孤证不足以推翻科学共识。', 'Gū zhèng bù zú yǐ tuī fān kē xué gòng shí.', 'Satu bukti tunggal tidak cukup untuk menggugurkan konsensus ilmiah.'],
  ]],
  [null, ['Bacaan kritis etika AI: periksa klaim "teknologi netral".', 'Tanya: siapa yang merancang, untuk tujuan apa, dengan data apa?'], [
    ['文章开头就断言"技术是中立的"。', 'Wén zhāng kāi tóu jiù duàn yán " jì shù shì zhōng lì de ".', 'Artikel sejak awal menegaskan "teknologi itu netral".'],
    ['这一前提本身就值得质疑。', 'Zhè yì qián tí běn shēn jiù zhí dé zhì yí.', 'Premis ini sendiri patut dipertanyakan.'],
    ['技术总是由具体的人、为具体的目的设计的。', 'Jì shù zǒng shì yóu jù tǐ de rén, wèi jù tǐ de mù dì shè jì de.', 'Teknologi selalu dirancang oleh orang tertentu untuk tujuan tertentu.'],
    ['设计中的选择不可避免地带有价值取向。', 'Shè jì zhōng de xuǎn zé bù kě bì miǎn dì dài yǒu jià zhí qǔ xiàng.', 'Pilihan dalam desain tak terhindarkan mengandung orientasi nilai.'],
  ]],
  [null, ['Bacaan kritis ekosistem informasi: nilai sumber artikel itu sendiri (penerbit, pendanaan).', 'Teks tentang berita palsu pun bisa bias.'], [
    ['这篇批评"假新闻"的文章，本身也没有注明数据来源。', 'Zhè piān pī píng " jiǎ xīn wén " de wén zhāng, běn shēn yě méi yǒu zhù míng shù jù lái yuán.', 'Artikel yang mengkritik "berita palsu" ini sendiri juga tidak mencantumkan sumber datanya.'],
    ['发布平台与文中推荐的应用属于同一家公司。', 'Fā bù píng tái yǔ wén zhōng tuī jiàn de yìng yòng shǔ yú tóng yì jiā gōng sī.', 'Platform penerbitnya dan aplikasi yang direkomendasikan dalam tulisan milik perusahaan yang sama.'],
    ['这构成了潜在的利益冲突。', 'Zhè gòu chéng le qián zài de lì yì chōng tū.', 'Ini merupakan potensi konflik kepentingan.'],
    ['读者应当对其结论保持警惕。', 'Dú zhě yīng dāng duì qí jié lùn bǎo chí jǐng tì.', 'Pembaca sebaiknya tetap waspada terhadap kesimpulannya.'],
  ]],
  [null, ['Bacaan kritis konsumerisme: perhatikan nada moralistik dan generalisasi tentang "anak muda".', 'Uji: apakah kritik juga menyasar produsen dan pengiklan?'], [
    ['文章把超前消费归咎于年轻人的虚荣。', 'Wén zhāng bǎ chāo qián xiāo fèi guī jiù yú nián qīng rén de xū róng.', 'Artikel menyalahkan kesombongan anak muda atas konsumsi melebihi kemampuan.'],
    ['却很少提及信贷产品的诱导性营销。', 'Què hěn shǎo tí jí xìn dài chǎn pǐn de yòu dǎo xìng yíng xiāo.', 'Tetapi jarang menyinggung pemasaran produk kredit yang menjerumuskan.'],
    ['把结构性问题个人化，是一种常见的论证偏差。', 'Bǎ jié gòu xìng wèn tí gè rén huà, shì yì zhǒng cháng jiàn de lùn zhèng piān chā.', 'Mengubah masalah struktural menjadi masalah pribadi adalah penyimpangan argumen yang umum.'],
    ['批评应当指向整个消费系统。', 'Pī píng yīng dāng zhǐ xiàng zhěng gè xiāo fèi xì tǒng.', 'Kritik seharusnya diarahkan ke seluruh sistem konsumsi.'],
  ]],
  [null, ['Bacaan kritis identitas budaya: kenali esensialisme ("orang X pasti begini").', 'Cari kata mutlak: 都, 总是, 天生.'], [
    ['文章说"东方人天生注重集体"。', 'Wén zhāng shuō " dōng fāng rén tiān shēng zhù zhòng jí tǐ ".', 'Artikel menyebut "orang Timur secara bawaan mementingkan kolektif".'],
    ['"天生"一词把文化差异本质化了。', '" tiān shēng " yì cí bǎ wén huà chā yì běn zhì huà le.', 'Kata "secara bawaan" membuat perbedaan budaya menjadi esensial.'],
    ['同一文化内部的差异往往比文化之间更大。', 'Tóng yì wén huà nèi bù de chā yì wǎng wǎng bǐ wén huà zhī jiān gèng dà.', 'Perbedaan di dalam satu budaya sering lebih besar daripada antarbudaya.'],
    ['这样的概括容易滑向刻板印象。', 'Zhè yàng de gài kuò róng yì huá xiàng kè bǎn yìn xiàng.', 'Generalisasi seperti ini mudah tergelincir menjadi stereotip.'],
  ]],
  [null, ['Bacaan kritis kesehatan masyarakat: periksa denominator statistik (persentase dari apa?).', 'Angka besar tanpa pembanding bisa menyesatkan.'], [
    ['报道称某病例数"翻了一倍"。', 'Bào dào chēng mǒu bìng lì shù " fān le yí bèi ".', 'Laporan menyebut jumlah kasus suatu penyakit "berlipat dua".'],
    ['但实际上只是从五例增加到十例。', 'Dàn shí jì shang zhǐ shì cóng wǔ lì zēng jiā dào shí lì.', 'Tetapi sebenarnya hanya bertambah dari lima kasus menjadi sepuluh.'],
    ['相对增长率高，绝对数字却很小。', 'Xiāng duì zēng zhǎng lǜ gāo, jué duì shù zì què hěn xiǎo.', 'Tingkat pertumbuhan relatifnya tinggi, tetapi angka absolutnya kecil.'],
    ['只报相对数，容易制造不必要的恐慌。', 'Zhī bào xiāng duì shù, róng yì zhì zào bú bì yào de kǒng huāng.', 'Hanya melaporkan angka relatif mudah menimbulkan kepanikan yang tidak perlu.'],
  ]],
  [null, ['Bacaan kritis revitalisasi desa: kisah sukses tunggal tidak bisa digeneralisasi.', 'Tanya: berapa desa yang mencoba dan gagal?'], [
    ['文章以一个网红村为例，说明乡村旅游的潜力。', 'Wén zhāng yǐ yí gè wǎng hóng cūn wéi lì, shuō míng xiāng cūn lǚ yóu de qián lì.', 'Artikel mengambil satu desa viral sebagai contoh potensi pariwisata desa.'],
    ['但成功案例并不能代表普遍情况。', 'Dàn chéng gōng àn lì bìng bù néng dài biǎo pǔ biàn qíng kuàng.', 'Tetapi kasus sukses tidak bisa mewakili kondisi umum.'],
    ['同期投资旅游的许多村庄并未获得回报。', 'Tóng qī tóu zī lǚ yóu de xǔ duō cūn zhuāng bìng wèi huò dé huí bào.', 'Banyak desa yang berinvestasi pariwisata pada periode yang sama tidak mendapat hasil.'],
    ['文章对失败案例只字未提。', 'Wén zhāng duì shī bài àn lì zhī zì wèi tí.', 'Artikel sama sekali tidak menyebut kasus yang gagal.'],
  ]],
  [null, ['Bacaan kritis ekonomi berbagi: istilah pemasaran vs realitas ekonomi.', 'Bandingkan definisi "berbagi" dengan praktik bisnisnya.'], [
    ['"共享"一词带有利他和平等的色彩。', '" gòng xiǎng " yì cí dài yǒu lì tā hé píng děng de sè cǎi.', 'Kata "berbagi" mengandung warna altruisme dan kesetaraan.'],
    ['但很多平台本质上是一种租赁生意。', 'Dàn hěn duō píng tái běn zhì shàng shì yì zhǒng zū lìn shēng yì.', 'Tetapi banyak platform pada dasarnya bisnis penyewaan.'],
    ['词语的选择淡化了商业属性。', 'Cí yǔ de xuǎn zé dàn huà le shāng yè shǔ xìng.', 'Pilihan kata itu mengaburkan sifat komersialnya.'],
    ['理解概念需要穿透修辞的包装。', 'Lǐ jiě gài niàn xū yào chuān tòu xiū cí de bāo zhuāng.', 'Memahami konsep perlu menembus kemasan retorikanya.'],
  ]],
  [null, ['Bacaan kritis kesehatan jiwa: artikel motivasi vs rujukan ilmiah.', 'Cari kalimat yang menyederhanakan solusi ("cukup berpikir positif").'], [
    ['文章建议抑郁的人"多运动、多晒太阳就好了"。', 'Wén zhāng jiàn yì yì yù de rén " duō yùn dòng, duō shài tài yáng jiù hǎo le ".', 'Artikel menyarankan orang yang depresi "cukup banyak olahraga dan berjemur saja".'],
    ['这种建议对轻度情绪问题或许有帮助。', 'Zhè zhǒng jiàn yì duì qīng dù qíng xù wèn tí huò xǔ yǒu bāng zhù.', 'Saran ini mungkin membantu untuk masalah emosi ringan.'],
    ['但对临床抑郁症来说过于简单化。', 'Dàn duì lín chuáng yì yù zhèng lái shuō guò yú jiǎn dān huà.', 'Tetapi untuk depresi klinis terlalu menyederhanakan.'],
    ['甚至可能让患者延误治疗。', 'Shèn zhì kě néng ràng huàn zhě yán wù zhì liáo.', 'Bahkan bisa membuat penderita menunda pengobatan.'],
  ]],
  [null, ['Bacaan kritis inovasi: periksa definisi "inovasi" yang dipakai indikator (paten, dana, produk).', 'Indikator kuantitas ≠ kualitas.'], [
    ['报告以专利数量衡量地区的创新能力。', 'Bào gào yǐ zhuān lì shù liàng héng liáng dì qū de chuàng xīn néng lì.', 'Laporan mengukur kemampuan inovasi daerah dengan jumlah paten.'],
    ['但专利数量并不等于专利质量。', 'Dàn zhuān lì shù liàng bìng bù děng yú zhuān lì zhì liàng.', 'Tetapi jumlah paten tidak sama dengan kualitas paten.'],
    ['部分专利从未被转化应用。', 'Bù fen zhuān lì cóng wèi bèi zhuǎn huà yìng yòng.', 'Sebagian paten tidak pernah diterapkan.'],
    ['单一指标容易导致"为指标而创新"。', 'Dān yī zhǐ biāo róng yì dǎo zhì " wèi zhǐ biāo ér chuàng xīn ".', 'Indikator tunggal mudah memicu "berinovasi demi indikator".'],
  ]],
  [null, ['Bacaan kritis kebijakan bahasa: bedakan argumen fungsional dan argumen identitas.', 'Tanya: argumen mana yang dipakai penulis, dan mana yang diabaikan?'], [
    ['作者从经济效率出发，主张统一使用通用语。', 'Zuò zhě cóng jīng jì xiào lǜ chū fā, zhǔ zhāng tǒng yī shǐ yòng tōng yòng yǔ.', 'Penulis berangkat dari efisiensi ekonomi dan menganjurkan penggunaan bahasa nasional secara seragam.'],
    ['这一论证忽视了语言的文化与情感价值。', 'Zhè yí lùn zhèng hū shì le yǔ yán de wén huà yǔ qíng gǎn jià zhí.', 'Argumen ini mengabaikan nilai budaya dan emosional bahasa.'],
    ['语言不仅是工具，也是身份的载体。', 'Yǔ yán bù jǐn shì gōng jù, yě shì shēn fèn de zǎi tǐ.', 'Bahasa bukan hanya alat, tetapi juga wadah identitas.'],
    ['只算经济账，难以说服方言使用者。', 'Zhī suàn jīng jì zhàng, nán yǐ shuō fú fāng yán shǐ yòng zhě.', 'Hanya menghitung untung rugi ekonomi sulit meyakinkan penutur dialek.'],
  ]],
  [null, ['Bacaan kritis ketenagakerjaan: proyeksi masa depan sering bergantung pada asumsi tersembunyi.', 'Cari asumsi kecepatan adopsi teknologi.'], [
    ['报告预测十年内一半的工作将被机器取代。', 'Bào gào yù cè shí nián nèi yí bàn de gōng zuò jiāng bèi jī qì qǔ dài.', 'Laporan memprediksi setengah pekerjaan akan digantikan mesin dalam sepuluh tahun.'],
    ['这一预测假设技术会被迅速而全面地采用。', 'Zhè yí yù cè jiǎ shè jì shù huì bèi xùn sù ér quán miàn dì cǎi yòng.', 'Prediksi ini mengasumsikan teknologi akan diadopsi dengan cepat dan menyeluruh.'],
    ['然而，成本、法规和社会接受度都会减缓进程。', 'Rán ér, chéng běn, fǎ guī hé shè huì jiē shòu dù dōu huì jiǎn huǎn jìn chéng.', 'Namun, biaya, regulasi, dan penerimaan sosial akan memperlambat prosesnya.'],
    ['历史上的类似预测大多过于激进。', 'Lì shǐ shàng de lèi sì yù cè dà duō guò yú jī jìn.', 'Prediksi serupa dalam sejarah kebanyakan terlalu radikal.'],
  ]],
  [null, ['Bacaan kritis warisan budaya: siapa yang berhak menentukan apa yang "otentik"?', 'Perhatikan sudut pandang turis vs penduduk.'], [
    ['游客批评古镇"商业化太严重，失去了原汁原味"。', 'Yóu kè pī píng gǔ zhèn " shāng yè huà tài yán zhòng, shī qù le yuán zhī yuán wèi ".', 'Wisatawan mengkritik kota tua "terlalu komersial, kehilangan keasliannya".'],
    ['但对当地居民来说，开店正是谋生的方式。', 'Dàn duì dāng dì jū mín lái shuō, kāi diàn zhèng shì móu shēng de fāng shì.', 'Tetapi bagi warga setempat, membuka toko justru cara mencari nafkah.'],
    ['"原汁原味"往往是外来者的想象。', '" yuán zhī yuán wèi " wǎng wǎng shì wài lái zhě de xiǎng xiàng.', '"Keaslian" sering kali hanyalah bayangan orang luar.'],
    ['遗产保护不应以牺牲居民生活为代价。', 'Yí chǎn bǎo hù bù yīng yǐ xī shēng jū mín shēng huó wèi dài jià.', 'Pelestarian warisan tidak boleh dibayar dengan mengorbankan kehidupan warga.'],
  ]],
  [null, ['Bacaan kritis integritas akademik: kebijakan anti-plagiarisme dan efek sampingnya.', 'Nilai apakah aturan mengukur hal yang benar.'], [
    ['一些学校规定论文重复率不得超过百分之十。', 'Yì xiē xué xiào guī dìng lùn wén chóng fù lǜ bù dé chāo guò bǎi fēn zhī shí.', 'Beberapa kampus menetapkan tingkat kemiripan makalah tidak boleh melebihi sepuluh persen.'],
    ['结果，学生学会了用同义词替换来"降重"。', 'Jié guǒ, xué shēng xué huì le yòng tóng yì cí tì huàn lái " jiàng zhòng ".', 'Akibatnya, mahasiswa belajar mengganti sinonim untuk "menurunkan kemiripan".'],
    ['文字变了，思想仍然是别人的。', 'Wén zì biàn le, sī xiǎng réng rán shì bié rén de.', 'Kata-katanya berubah, gagasannya tetap milik orang lain.'],
    ['技术检测无法替代学术诚信教育。', 'Jì shù jiǎn cè wú fǎ tì dài xué shù chéng xìn jiào yù.', 'Deteksi teknologi tidak bisa menggantikan pendidikan integritas akademik.'],
  ]],
  [null, ['Bacaan kritis kerja sama internasional: retorika "win-win" vs distribusi manfaat nyata.', 'Cari data tentang siapa memperoleh apa.'], [
    ['双方都称合作实现了"双赢"。', 'Shuāng fāng dōu chēng hé zuò shí xiàn le " shuāng yíng ".', 'Kedua pihak menyebut kerja sama mencapai hasil "saling menguntungkan".'],
    ['但文章没有说明收益如何分配。', 'Dàn wén zhāng méi yǒu shuō míng shōu yì rú hé fēn pèi.', 'Tetapi artikel tidak menjelaskan bagaimana keuntungan dibagi.'],
    ['当地就业人数的数据也付之阙如。', 'Dāng dì jiù yè rén shù de shù jù yě fù zhī quē rú.', 'Data jumlah tenaga kerja lokal juga tidak ada.'],
    ['没有数据支撑的"双赢"只是一种修辞。', 'Méi yǒu shù jù zhī chēng de " shuāng yíng " zhǐ shì yì zhǒng xiū cí.', '"Saling menguntungkan" tanpa dukungan data hanyalah retorika.'],
  ]],
  [null, ['Bacaan kritis laporan sidang (答辩): nilai kekuatan jawaban kandidat dalam transkrip.', 'Kriteria: langsung, berbasis bukti, mengakui batas.'], [
    ['答辩人对方法问题的回答直接而具体。', 'Dá biàn rén duì fāng fǎ wèn tí de huí dá zhí jiē ér jù tǐ.', 'Jawaban kandidat atas pertanyaan metode langsung dan konkret.'],
    ['但在解释研究贡献时略显空泛。', 'Dàn zài jiě shì yán jiū gòng xiàn shí lüè xiǎn kōng fàn.', 'Tetapi saat menjelaskan kontribusi penelitian terasa agak kabur.'],
    ['他主动承认了样本的局限，这一点值得肯定。', 'Tā zhǔ dòng chéng rèn le yàng běn de jú xiàn, zhè yì diǎn zhí dé kěn dìng.', 'Dia secara proaktif mengakui keterbatasan sampel, hal ini patut diapresiasi.'],
    ['总体来看，答辩表现良好。', 'Zǒng tǐ lái kàn, dá biàn biǎo xiàn liáng hǎo.', 'Secara keseluruhan, penampilan sidangnya baik.'],
  ]],
];
