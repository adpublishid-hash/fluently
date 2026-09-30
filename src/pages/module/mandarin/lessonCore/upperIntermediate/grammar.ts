import type { LessonCoreTuple } from '../types';

// Grammar HSK 4 — one entry per lesson (index = lesson - 1).
export const grammar: LessonCoreTuple[] = [
  ['Emphatic contrast 不是…而是…', ['不是 A，而是 B = bukan A, melainkan B: membetulkan anggapan yang keliru.', 'Bagian 而是 membawa informasi utama; tekankan saat berbicara.'], [
    ['学习的关键不是时间长，而是方法对。', 'Xué xí de guān jiàn bú shì shí jiān cháng, ér shì fāng fǎ duì.', 'Kunci belajar bukan waktu yang lama, melainkan metode yang tepat.'],
    ['他不是不想来，而是来不了。', 'Tā bú shì bù xiǎng lái, ér shì lái bù liǎo.', 'Dia bukan tidak mau datang, melainkan tidak bisa datang.'],
    ['问题不是钱，而是时间。', 'Wèn tí bú shì qián, ér shì shí jiān.', 'Masalahnya bukan uang, melainkan waktu.'],
    ['成功不是偶然的，而是长期努力的结果。', 'Chéng gōng bú shì ǒu rán de, ér shì cháng qī nǔ lì de jié guǒ.', 'Keberhasilan bukan kebetulan, melainkan hasil usaha jangka panjang.'],
  ]],
  ['Causative 使 / 让 / 令', ['A + 使/让/令 + B + kata kerja/sifat = A membuat B menjadi...', '让 paling lisan, 使 lebih tulis, 令 untuk perasaan (令人感动).'], [
    ['网络使学习变得更加方便。', 'Wǎng luò shǐ xué xí biàn de gèng jiā fāng biàn.', 'Internet membuat belajar menjadi lebih mudah.'],
    ['这个消息让大家都很吃惊。', 'Zhè ge xiāo xī ràng dà jiā dōu hěn chī jīng.', 'Berita ini membuat semua orang terkejut.'],
    ['他的故事令人感动。', 'Tā de gù shì lìng rén gǎn dòng.', 'Kisahnya mengharukan.'],
    ['手机让人很难专心。', 'Shǒu jī ràng rén hěn nán zhuān xīn.', 'Ponsel membuat orang sulit berkonsentrasi.'],
  ]],
  ['Preference 与其…不如…', ['与其 A，不如 B = daripada A, lebih baik B (B dipilih).', 'Kedua bagian biasanya kata kerja dengan panjang seimbang.'], [
    ['与其在家生气，不如出去走走。', 'Yǔ qí zài jiā shēng qì, bù rú chū qù zǒu zǒu.', 'Daripada marah di rumah, lebih baik keluar jalan-jalan.'],
    ['与其租房子，不如贷款买房。', 'Yǔ qí zū fáng zi, bù rú dài kuǎn mǎi fáng.', 'Daripada menyewa rumah, lebih baik membeli dengan pinjaman.'],
    ['与其等别人帮忙，不如自己动手。', 'Yǔ qí děng bié rén bāng máng, bù rú zì jǐ dòng shǒu.', 'Daripada menunggu bantuan orang, lebih baik turun tangan sendiri.'],
    ['比起大城市，我更喜欢小城市的生活。', 'Bǐ qǐ dà chéng shì, wǒ gèng xǐ huan xiǎo chéng shì de shēng huó.', 'Dibandingkan kota besar, saya lebih suka kehidupan kota kecil.'],
  ]],
  ['Progression 不但…而且…', ['不但 A，而且 B = tidak hanya A, tetapi juga B (B lebih kuat).', 'Jika subjek berbeda, subjek kedua ditaruh setelah 而且.'], [
    ['这家饭店不但菜好吃，而且服务也很周到。', 'Zhè jiā fàn diàn bú dàn cài hǎo chī, ér qiě fú wù yě hěn zhōu dào.', 'Restoran ini tidak hanya masakannya enak, tetapi pelayanannya juga sangat baik.'],
    ['她不但会说英语，而且还会说西班牙语。', 'Tā bú dàn huì shuō yīng yǔ, ér qiě hái huì shuō xī bān yá yǔ.', 'Dia tidak hanya bisa bahasa Inggris, tetapi juga bahasa Spanyol.'],
    ['不但学生喜欢他，而且家长也很信任他。', 'Bú dàn xué shēng xǐ huan tā, ér qiě jiā zhǎng yě hěn xìn rèn tā.', 'Tidak hanya murid yang menyukainya, orang tua juga sangat memercayainya.'],
    ['这样做不但浪费钱，而且浪费时间。', 'Zhè yàng zuò bú dàn làng fèi qián, ér qiě làng fèi shí jiān.', 'Cara ini tidak hanya membuang uang, tetapi juga waktu.'],
  ]],
  ['Dual qualities 既…又…', ['既 A 又 B = sekaligus A dan B (dua sifat setara).', 'Subjek sama, A dan B biasanya sifat atau kata kerja.'], [
    ['我的室友既爱干净又很安静。', 'Wǒ de shì yǒu jì ài gān jìng yòu hěn ān jìng.', 'Teman sekamar saya suka kebersihan sekaligus sangat tenang.'],
    ['这份工作既轻松又有意思。', 'Zhè fèn gōng zuò jì qīng sōng yòu yǒu yì si.', 'Pekerjaan ini santai sekaligus menarik.'],
    ['他既是我的老师，又是我的朋友。', 'Tā jì shì wǒ de lǎo shī, yòu shì wǒ de péng yǒu.', 'Dia guru saya sekaligus teman saya.'],
    ['这个方法既省钱又环保。', 'Zhè ge fāng fǎ jì shěng qián yòu huán bǎo.', 'Cara ini hemat uang sekaligus ramah lingkungan.'],
  ]],
  ['Emphasis 连…都/也…', ['连 A 都/也 … = bahkan A pun... (menekankan hal ekstrem).', 'Sering dengan negasi: 连一分钱都没有.'], [
    ['我紧张得连话都说不出来。', 'Wǒ jǐn zhāng de lián huà dōu shuō bù chū lái.', 'Saya begitu gugup sampai bahkan tidak bisa berbicara.'],
    ['这个问题连老师也不知道。', 'Zhè ge wèn tí lián lǎo shī yě bù zhī dào.', 'Pertanyaan ini bahkan guru pun tidak tahu.'],
    ['他忙得连周末都要工作。', 'Tā máng de lián zhōu mò dōu yào gōng zuò.', 'Dia begitu sibuk sampai akhir pekan pun harus bekerja.'],
    ['我连一个人都不认识。', 'Wǒ lián yí gè rén dōu bú rèn shi.', 'Saya bahkan tidak kenal satu orang pun.'],
  ]],
  ['Perspective 对…来说 / 在…看来', ['对 + orang + 来说 = bagi...; 在 + orang + 看来 = menurut pandangan....', 'Dipakai untuk menunjukkan bahwa penilaian bergantung pada budaya/orang.'], [
    ['对中国人来说，春节是最重要的节日。', 'Duì zhōng guó rén lái shuō, chūn jié shì zuì zhòng yào de jié rì.', 'Bagi orang Tiongkok, Imlek adalah hari raya terpenting.'],
    ['在很多西方人看来，直接说"不"很正常。', 'Zài hěn duō xī fāng rén kàn lái, zhí jiē shuō " bù " hěn zhèng cháng.', 'Menurut banyak orang Barat, berkata "tidak" secara langsung itu biasa.'],
    ['对我来说，尊重别人的习惯很重要。', 'Duì wǒ lái shuō, zūn zhòng bié rén de xí guàn hěn zhòng yào.', 'Bagi saya, menghormati kebiasaan orang lain sangat penting.'],
    ['在老一辈看来，这种做法不太礼貌。', 'Zài lǎo yí bèi kàn lái, zhè zhǒng zuò fǎ bú tài lǐ mào.', 'Menurut generasi tua, cara ini kurang sopan.'],
  ]],
  ['Responsibility 对…负责 / 由…负责', ['对 + hal + 负责 = bertanggung jawab atas...; 由 + orang + 负责 = ditangani oleh....', '由 menandai pelaku dalam kalimat tugas formal.'], [
    ['每个人都要对自己的工作负责。', 'Měi gè rén dōu yào duì zì jǐ de gōng zuò fù zé.', 'Setiap orang harus bertanggung jawab atas pekerjaannya.'],
    ['这个项目由李经理负责。', 'Zhè ge xiàng mù yóu lǐ jīng lǐ fù zé.', 'Proyek ini ditangani oleh Manajer Li.'],
    ['出了问题谁负责？', 'Chū le wèn tí shuí fù zé?', 'Kalau ada masalah, siapa yang bertanggung jawab?'],
    ['会议记录由我来整理。', 'Huì yì jì lù yóu wǒ lái zhěng lǐ.', 'Notulen rapat akan saya rapikan.'],
  ]],
  ['Reporting with 据说 / 据报道', ['据说 (katanya), 据报道 (menurut laporan), 据调查 (menurut survei) di awal kalimat.', 'Menandai informasi dari sumber lain, bukan pendapat sendiri.'], [
    ['据报道，昨天市中心发生了一起交通事故。', 'Jù bào dào, zuó tiān shì zhōng xīn fā shēng le yì qǐ jiāo tōng shì gù.', 'Menurut laporan, kemarin terjadi kecelakaan lalu lintas di pusat kota.'],
    ['据说这家店是一百年前开的。', 'Jù shuō zhè jiā diàn shì yì bǎi nián qián kāi de.', 'Katanya toko ini dibuka seratus tahun yang lalu.'],
    ['据调查，七成的年轻人每天用手机超过五小时。', 'Jù diào chá, qī chéng de nián qīng rén měi tiān yòng shǒu jī chāo guò wǔ xiǎo shí.', 'Menurut survei, tujuh puluh persen anak muda memakai ponsel lebih dari lima jam sehari.'],
    ['事故的原因还在调查中。', 'Shì gù de yuán yīn hái zài diào chá zhōng.', 'Penyebab kecelakaan masih diselidiki.'],
  ]],
  ['Only-if 只有…才…', ['只有 A，才 B = hanya jika A, barulah B (A syarat mutlak).', 'Bandingkan 只要…就… (asal..., pasti...) yang syaratnya lebih longgar.'], [
    ['只有大家一起努力，才能保护好环境。', 'Zhǐ yǒu dà jiā yì qǐ nǔ lì, cái néng bǎo hù hǎo huán jìng.', 'Hanya jika semua berusaha bersama, lingkungan bisa terlindungi dengan baik.'],
    ['只有减少浪费，问题才能解决。', 'Zhǐ yǒu jiǎn shǎo làng fèi, wèn tí cái néng jiě jué.', 'Hanya dengan mengurangi pemborosan, masalah bisa diselesaikan.'],
    ['只有亲自试一试，你才知道难不难。', 'Zhǐ yǒu qīn zì shì yi shì, nǐ cái zhī dào nán bu nán.', 'Hanya jika mencoba sendiri, kamu akan tahu sulit atau tidak.'],
    ['只要少用一次性筷子，就能节约很多木头。', 'Zhǐ yào shǎo yòng yí cì xìng kuài zi, jiù néng jié yuē hěn duō mù tou.', 'Asal mengurangi sumpit sekali pakai, banyak kayu bisa dihemat.'],
  ]],
  ['No matter 无论…都…', ['无论 + kata tanya/pilihan, … 都 … = tak peduli..., tetap....', 'Setelah 无论 harus ada pilihan: 什么, 多, 还是, 怎么.'], [
    ['无论工作多忙，他都坚持锻炼。', 'Wú lùn gōng zuò duō máng, tā dōu jiān chí duàn liàn.', 'Tak peduli sesibuk apa pekerjaannya, dia tetap rajin berolahraga.'],
    ['无论刮风还是下雨，她都去跑步。', 'Wú lùn guā fēng hái shì xià yǔ, tā dōu qù pǎo bù.', 'Entah berangin atau hujan, dia tetap pergi lari.'],
    ['无论吃什么，都要注意营养均衡。', 'Wú lùn chī shén me, dōu yào zhù yì yíng yǎng jūn héng.', 'Apa pun yang dimakan, harus memperhatikan keseimbangan gizi.'],
    ['无论几点睡，他都六点起床。', 'Wú lùn jǐ diǎn shuì, tā dōu liù diǎn qǐ chuáng.', 'Jam berapa pun tidurnya, dia bangun jam enam.'],
  ]],
  ['Softeners 尽量 / 最好 / 避免', ['尽量 + kata kerja = sebisa mungkin; 避免 + kata kerja/benda = menghindari.', 'Kombinasi 尽量避免… membuat saran terdengar bijak dan halus.'], [
    ['你最好提前一天准备好材料。', 'Nǐ zuì hǎo tí qián yì tiān zhǔn bèi hǎo cái liào.', 'Sebaiknya kamu menyiapkan bahan sehari sebelumnya.'],
    ['尽量不要在别人面前批评他。', 'Jǐn liàng bú yào zài bié rén miàn qián pī píng tā.', 'Sebisa mungkin jangan mengkritiknya di depan orang lain.'],
    ['为了避免误会，我们还是写清楚吧。', 'Wèi le bì miǎn wù huì, wǒ men hái shì xiě qīng chu ba.', 'Untuk menghindari salah paham, sebaiknya kita tuliskan dengan jelas.'],
    ['面试的时候尽量保持微笑。', 'Miàn shì de shí hòu jǐn liàng bǎo chí wēi xiào.', 'Saat wawancara usahakan tetap tersenyum.'],
  ]],
  ['把 vs 被 in problem solving', ['把 untuk tindakan yang kita lakukan pada masalah; 被 untuk hal yang menimpa kita.', 'Laporan masalah: 被 (apa yang terjadi) → 把 (apa yang kita lakukan).'], [
    ['文件被同事不小心删掉了。', 'Wén jiàn bèi tóng shì bù xiǎo xīn shān diào le.', 'Berkasnya tidak sengaja terhapus oleh rekan kerja.'],
    ['技术部已经把系统修好了。', 'Jì shù bù yǐ jīng bǎ xì tǒng xiū hǎo le.', 'Bagian teknis sudah memperbaiki sistemnya.'],
    ['请把备份的文件发给我。', 'Qǐng bǎ bèi fèn de wén jiàn fā gěi wǒ.', 'Tolong kirimkan berkas cadangannya kepada saya.'],
    ['还好数据没有被破坏。', 'Hái hǎo shù jù méi yǒu bèi pò huài.', 'Untung datanya tidak rusak.'],
  ]],
  ['Attitude adverbs 竟然 / 果然', ['竟然 = ternyata (di luar dugaan, heran); 果然 = benar saja (sesuai dugaan).', 'Adverbia sikap mengungkap perasaan penulis tanpa kata "saya merasa".'], [
    ['这么简单的问题，他竟然答错了。', 'Zhè me jiǎn dān de wèn tí, tā jìng rán dá cuò le.', 'Pertanyaan semudah ini, ternyata dia menjawab salah.'],
    ['天气预报说有雨，果然下雨了。', 'Tiān qì yù bào shuō yǒu yǔ, guǒ rán xià yǔ le.', 'Prakiraan cuaca bilang akan hujan, benar saja hujan turun.'],
    ['作者显然不同意这种做法。', 'Zuò zhě xiǎn rán bù tóng yì zhè zhǒng zuò fǎ.', 'Penulis jelas tidak setuju dengan cara ini.'],
    ['他居然一个人完成了全部工作。', 'Tā jū rán yí gè rén wán chéng le quán bù gōng zuò.', 'Ternyata dia menyelesaikan seluruh pekerjaan sendirian.'],
  ]],
  ['Cause and effect 因此 / 于是 / 结果', ['因此 (oleh karena itu, formal), 于是 (maka lalu, urutan kejadian), 结果 (akhirnya, sering negatif).', 'Letakkan di awal klausa kedua.'], [
    ['他平时不复习，结果考试没通过。', 'Tā píng shí bú fù xí, jié guǒ kǎo shì méi tōng guò.', 'Dia tidak pernah mengulang pelajaran, akhirnya tidak lulus ujian.'],
    ['商店降价了，于是很多人去排队。', 'Shāng diàn jiàng jià le, yú shì hěn duō rén qù pái duì.', 'Toko menurunkan harga, maka banyak orang pergi mengantre.'],
    ['今年雨水少，因此粮食减产了。', 'Jīn nián yǔ shuǐ shǎo, yīn cǐ liáng shí jiǎn chǎn le.', 'Tahun ini curah hujan sedikit, oleh karena itu panen berkurang.'],
    ['长时间熬夜会导致免疫力下降。', 'Cháng shí jiān áo yè huì dǎo zhì miǎn yì lì xià jiàng.', 'Begadang terlalu lama dapat menyebabkan daya tahan tubuh menurun.'],
  ]],
  ['Quantifying change: 增加了 vs 增加到', ['增加了 + jumlah = bertambah sebanyak...; 增加到 + jumlah = bertambah menjadi....', 'Sama untuk 减少了/减少到, 提高了/提高到.'], [
    ['用户人数增加了一倍。', 'Yòng hù rén shù zēng jiā le yí bèi.', 'Jumlah pengguna bertambah dua kali lipat.'],
    ['用户人数增加到了两万。', 'Yòng hù rén shù zēng jiā dào le liǎng wàn.', 'Jumlah pengguna bertambah menjadi dua puluh ribu.'],
    ['成本减少了百分之十五。', 'Chéng běn jiǎn shǎo le bǎi fēn zhī shí wǔ.', 'Biaya berkurang lima belas persen.'],
    ['价格从五十元降到了三十元。', 'Jià gé cóng wǔ shí yuán jiàng dào le sān shí yuán.', 'Harga turun dari lima puluh yuan menjadi tiga puluh yuan.'],
  ]],
  ['Hedging 恐怕 / 似乎 / 也许', ['恐怕 (khawatirnya...), 似乎 (tampaknya), 也许 (mungkin) melunakkan klaim.', 'Berguna saat tidak setuju tanpa terdengar kasar.'], [
    ['恐怕这个计划有点儿冒险。', 'Kǒng pà zhè ge jì huà yǒu diǎnr mào xiǎn.', 'Saya khawatir rencana ini agak berisiko.'],
    ['他似乎对这个建议不太满意。', 'Tā sì hū duì zhè ge jiàn yì bú tài mǎn yì.', 'Tampaknya dia kurang puas dengan usulan ini.'],
    ['也许我们可以换一个角度想想。', 'Yě xǔ wǒ men kě yǐ huàn yí gè jiǎo dù xiǎng xiǎng.', 'Mungkin kita bisa memikirkannya dari sudut lain.'],
    ['这样安排恐怕来不及。', 'Zhè yàng ān pái kǒng pà lái bù jí.', 'Pengaturan seperti ini khawatirnya tidak akan sempat.'],
  ]],
  ['Rhetorical questions 难道…吗', ['难道…吗？ = masa sih...? (pertanyaan retoris untuk menegaskan kebalikannya).', 'Nada retoris: tekankan 难道 dan akhiri dengan nada naik.'], [
    ['难道你不知道明天考试吗？', 'Nán dào nǐ bù zhī dào míng tiān kǎo shì ma?', 'Masa kamu tidak tahu besok ujian?'],
    ['这么重要的事，难道不应该告诉大家吗？', 'Zhè me zhòng yào de shì, nán dào bù yīng gāi gào sù dà jiā ma?', 'Hal sepenting ini, masa tidak seharusnya diberitahukan ke semua orang?'],
    ['难道努力就一定会成功吗？', 'Nán dào nǔ lì jiù yí dìng huì chéng gōng ma?', 'Apakah berusaha pasti akan berhasil?'],
    ['他难道是在开玩笑？', 'Tā nán dào shì zài kāi wán xiào?', 'Masa dia sedang bercanda?'],
  ]],
  ['Formal requests in complaints', ['Permintaan formal: 希望…能…, 请…尽快…, 麻烦…予以处理.', 'Nada tegas tetapi tidak menyerang; fokus pada solusi.'], [
    ['希望贵公司能尽快解决这个问题。', 'Xī wàng guì gōng sī néng jǐn kuài jiě jué zhè ge wèn tí.', 'Kami berharap perusahaan Anda dapat segera menyelesaikan masalah ini.'],
    ['请相关部门予以重视。', 'Qǐng xiāng guān bù mén yǔ yǐ zhòng shì.', 'Mohon bagian terkait memberi perhatian.'],
    ['如果能及时改善，我们会继续支持你们。', 'Rú guǒ néng jí shí gǎi shàn, wǒ men huì jì xù zhī chí nǐ men.', 'Jika bisa segera diperbaiki, kami akan terus mendukung Anda.'],
    ['期待您的答复。', 'Qī dài nín de dá fù.', 'Kami menantikan jawaban Anda.'],
  ]],
  ['HSK 4 grammar portfolio', ['Portfolio: esai 300 karakter yang memakai minimal 8 pola HSK 4.', 'Tandai setiap pola dengan warna dan cek logika penghubungnya.'], [
    ['不管遇到什么困难，我们都不能放弃。', 'Bù guǎn yù dào shén me kùn nán, wǒ men dōu bù néng fàng qì.', 'Apa pun kesulitan yang dihadapi, kita tidak boleh menyerah.'],
    ['与其抱怨环境，不如改变自己。', 'Yǔ qí bào yuàn huán jìng, bù rú gǎi biàn zì jǐ.', 'Daripada mengeluhkan lingkungan, lebih baik mengubah diri sendiri.'],
    ['这次失败不但没有打败他，反而让他更坚强了。', 'Zhè cì shī bài bú dàn méi yǒu dǎ bài tā, fǎn ér ràng tā gèng jiān qiáng le.', 'Kegagalan ini tidak hanya tidak mengalahkannya, malah membuatnya lebih tangguh.'],
    ['由此可见，态度决定一切。', 'Yóu cǐ kě jiàn, tài dù jué dìng yí qiè.', 'Dari sini terlihat bahwa sikap menentukan segalanya.'],
  ]],
];
