import type { LessonCoreTuple } from '../types';

// Grammar HSK 6 — one entry per lesson (index = lesson - 1). Titles come from the topic list.
export const grammar: LessonCoreTuple[] = [
  [null, ['即便/即使 A，也 B = sekalipun A (hipotetis atau ekstrem), tetap B.', 'Lebih kuat dari 虽然: A belum tentu fakta, hanya diandaikan.'], [
    ['即便条件再艰苦，他也从未放弃过研究。', 'Jí biàn tiáo jiàn zài jiān kǔ, tā yě cóng wèi fàng qì guò yán jiū.', 'Sekalipun kondisinya sangat berat, dia tidak pernah menyerah dalam penelitiannya.'],
    ['即使政策出台，落实也需要相当长的时间。', 'Jí shǐ zhèng cè chū tái, luò shí yě xū yào xiāng dāng cháng de shí jiān.', 'Sekalipun kebijakan dikeluarkan, pelaksanaannya tetap butuh waktu cukup lama.'],
    ['即便是专家，也难以准确预测市场走向。', 'Jí biàn shì zhuān jiā, yě nán yǐ zhǔn què yù cè shì chǎng zǒu xiàng.', 'Bahkan pakar pun sulit memprediksi arah pasar secara tepat.'],
    ['即使失败了，这次尝试也有其价值。', 'Jí shǐ shī bài le, zhè cì cháng shì yě yǒu qí jià zhí.', 'Sekalipun gagal, percobaan ini tetap punya nilainya.'],
  ]],
  [null, ['要不是 A，就 B (了) = seandainya bukan karena A, pasti B (kontrafaktual masa lalu).', 'Sering diakhiri 了 dan mengungkap syukur atau penyesalan.'], [
    ['要不是你及时提醒，我就错过截止日期了。', 'Yào bú shì nǐ jí shí tí xǐng, wǒ jiù cuò guò jié zhǐ rì qī le.', 'Seandainya kamu tidak segera mengingatkan, saya pasti melewatkan tenggatnya.'],
    ['要不是那场大雨，比赛早就结束了。', 'Yào bú shì nà chǎng dà yǔ, bǐ sài zǎo jiù jié shù le.', 'Seandainya bukan karena hujan lebat itu, pertandingan sudah lama selesai.'],
    ['要不是政府的补贴，这家工厂恐怕早已倒闭。', 'Yào bú shì zhèng fǔ de bǔ tiē, zhè jiā gōng chǎng kǒng pà zǎo yǐ dǎo bì.', 'Seandainya bukan karena subsidi pemerintah, pabrik ini mungkin sudah lama bangkrut.'],
    ['如果当初选择了另一条路，结果也许完全不同。', 'Rú guǒ dāng chū xuǎn zé le lìng yì tiáo lù, jié guǒ yě xǔ wán quán bù tóng.', 'Seandainya dulu memilih jalan lain, hasilnya mungkin sama sekali berbeda.'],
  ]],
  [null, ['Struktur argumen idiomatik: chengyu sebagai kesimpulan atau penilaian ringkas.', 'Contoh: 事半功倍, 适得其反, 因噎废食, 有利有弊.'], [
    ['方法得当，往往事半功倍。', 'Fāng fǎ dé dàng, wǎng wǎng shì bàn gōng bèi.', 'Dengan metode yang tepat, hasilnya sering berlipat dengan usaha setengah.'],
    ['过度干预反而会适得其反。', 'Guò dù gān yù fǎn ér huì shì dé qí fǎn.', 'Intervensi berlebihan justru membawa hasil sebaliknya.'],
    ['因为一次失败就彻底放弃，无异于因噎废食。', 'Yīn wèi yí cì shī bài jiù chè dǐ fàng qì, wú yì yú yīn yē fèi shí.', 'Menyerah total karena satu kegagalan sama saja dengan berhenti makan karena tersedak sekali.'],
    ['任何改革都有利有弊，关键是权衡。', 'Rèn hé gǎi gé dōu yǒu lì yǒu bì, guān jiàn shì quán héng.', 'Setiap reformasi ada untung ruginya, kuncinya menimbang.'],
  ]],
  [null, ['Nominalisasi: kata kerja menjadi nomina (对…的重视, 对…的依赖) untuk wacana formal.', 'Kalimat menjadi lebih padat dan objektif.'], [
    ['公众对食品安全的关注日益增加。', 'Gōng zhòng duì shí pǐn ān quán de guān zhù rì yì zēng jiā.', 'Perhatian publik terhadap keamanan pangan terus meningkat.'],
    ['社会对技术的过度依赖令人担忧。', 'Shè huì duì jì shù de guò dù yī lài lìng rén dān yōu.', 'Ketergantungan berlebihan masyarakat pada teknologi mengkhawatirkan.'],
    ['政府对此问题的重视程度前所未有。', 'Zhèng fǔ duì cǐ wèn tí de zhòng shì chéng dù qián suǒ wèi yǒu.', 'Tingkat perhatian pemerintah terhadap masalah ini belum pernah terjadi sebelumnya.'],
    ['人口的快速流动带来了治理上的挑战。', 'Rén kǒu de kuài sù liú dòng dài lái le zhì lǐ shàng de tiǎo zhàn.', 'Mobilitas penduduk yang cepat membawa tantangan tata kelola.'],
  ]],
  [null, ['与其说 A，不如说 B = lebih tepat disebut B daripada A (mengoreksi pembingkaian).', 'Berguna untuk analisis yang menantang anggapan umum.'], [
    ['与其说这是一场技术革命，不如说是一场观念革命。', 'Yǔ qí shuō zhè shì yì chǎng jì shù gé mìng, bù rú shuō shì yì chǎng guān niàn gé mìng.', 'Lebih tepat disebut revolusi pemikiran daripada revolusi teknologi.'],
    ['与其说他固执，不如说他有原则。', 'Yǔ qí shuō tā gù zhí, bù rú shuō tā yǒu yuán zé.', 'Daripada disebut keras kepala, lebih tepat dia disebut berprinsip.'],
    ['与其说是运气，不如说是长期准备的结果。', 'Yǔ qí shuō shì yùn qì, bù rú shuō shì cháng qī zhǔn bèi de jié guǒ.', 'Daripada disebut keberuntungan, lebih tepat disebut hasil persiapan panjang.'],
    ['这与其说是危机，不如说是转机。', 'Zhè yǔ qí shuō shì wēi jī, bù rú shuō shì zhuǎn jī.', 'Ini lebih tepat disebut titik balik daripada krisis.'],
  ]],
  [null, ['并非由于 A，而是由于 B: koreksi atribusi sebab secara formal.', 'Gunakan saat membantah penjelasan sebab yang populer.'], [
    ['效率低下并非由于员工懒惰，而是由于流程混乱。', 'Xiào lǜ dī xià bìng fēi yóu yú yuán gōng lǎn duò, ér shì yóu yú liú chéng hùn luàn.', 'Efisiensi rendah bukan karena karyawan malas, melainkan karena alur kerja kacau.'],
    ['房价上涨并非单纯由于需求，而是由于土地供应有限。', 'Fáng jià shàng zhǎng bìng fēi dān chún yóu yú xū qiú, ér shì yóu yú tǔ dì gòng yīng yǒu xiàn.', 'Kenaikan harga rumah bukan semata karena permintaan, melainkan karena pasokan lahan terbatas.'],
    ['他的离开并非出于不满，而是出于家庭原因。', 'Tā de lí kāi bìng fēi chū yú bù mǎn, ér shì chū yú jiā tíng yuán yīn.', 'Kepergiannya bukan karena ketidakpuasan, melainkan karena alasan keluarga.'],
    ['问题的出现并非偶然，而有其深层原因。', 'Wèn tí de chū xiàn bìng fēi ǒu rán, ér yǒu qí shēn céng yuán yīn.', 'Munculnya masalah ini bukan kebetulan, melainkan ada sebab yang mendalam.'],
  ]],
  [null, ['Subjek implisit & elipsis: dalam wacana Mandarin, subjek yang sudah jelas sering dihilangkan.', 'Pastikan rujukan tetap jelas setelah penghilangan.'], [
    ['这本书我读了三遍，每次都有新的收获。', 'Zhè běn shū wǒ dú le sān biàn, měi cì dōu yǒu xīn de shōu huò.', 'Buku ini saya baca tiga kali, setiap kali ada pemahaman baru.'],
    ['问题发现了，原因也找到了，就是没人负责。', 'Wèn tí fā xiàn le, yuán yīn yě zhǎo dào le, jiù shì méi rén fù zé.', 'Masalahnya sudah ditemukan, penyebabnya juga sudah ketemu, hanya saja tidak ada yang bertanggung jawab.'],
    ['到了北京，先去看了长城，又去了故宫。', 'Dào le běi jīng, xiān qù kàn le cháng chéng, yòu qù le gù gōng.', 'Sesampainya di Beijing, pertama pergi melihat Tembok Besar, lalu ke Kota Terlarang.'],
    ['钱是赚到了，身体却垮了。', 'Qián shì zhuàn dào le, shēn tǐ què kuǎ le.', 'Uangnya memang didapat, tetapi badannya ambruk.'],
  ]],
  [null, ['Pasif lanjut: 为…所…, 遭到, 受到, 给…: nuansa terdampak/menderita.', '为…所… sangat formal dan tertulis.'], [
    ['这一现象早已为学界所关注。', 'Zhè yí xiàn xiàng zǎo yǐ wèi xué jiè suǒ guān zhù.', 'Fenomena ini sudah lama menjadi perhatian kalangan akademik.'],
    ['他的提议遭到了多数人的反对。', 'Tā de tí yì zāo dào le duō shù rén de fǎn duì.', 'Usulannya ditentang oleh mayoritas.'],
    ['不少传统手艺正面临被遗忘的命运。', 'Bù shǎo chuán tǒng shǒu yì zhèng miàn lín bèi yí wàng de mìng yùn.', 'Tidak sedikit kerajinan tradisional menghadapi nasib terlupakan.'],
    ['钱包给小偷偷走了。', 'Qián bāo gěi xiǎo tōu tōu zǒu le.', 'Dompetnya dicuri pencopet.'],
  ]],
  [null, ['Paralelisme: klausa dengan struktur dan panjang sama untuk ritme retoris.', 'Umum dalam pidato dan tulisan persuasif (排比).'], [
    ['我们要敢于梦想，勇于尝试，善于反思。', 'Wǒ men yào gǎn yú mèng xiǎng, yǒng yú cháng shì, shàn yú fǎn sī.', 'Kita harus berani bermimpi, berani mencoba, dan pandai merenung.'],
    ['知识改变命运，教育成就未来。', 'Zhī shi gǎi biàn mìng yùn, jiào yù chéng jiù wèi lái.', 'Pengetahuan mengubah nasib, pendidikan mewujudkan masa depan.'],
    ['有人看到困难，有人看到机会。', 'Yǒu rén kàn dào kùn nán, yǒu rén kàn dào jī huì.', 'Ada yang melihat kesulitan, ada yang melihat peluang.'],
    ['城市因人而兴，因文化而美。', 'Chéng shì yīn rén ér xīng, yīn wén huà ér měi.', 'Kota berkembang karena manusianya, indah karena budayanya.'],
  ]],
  [null, ['Kontrol register: gunakan 之, 其, 予以, 加以, 进行 untuk kalimat formal yang kompleks.', '对…加以分析 = menganalisis...; 予以支持 = memberikan dukungan.'], [
    ['对上述问题，有必要加以深入分析。', 'Duì shàng shù wèn tí, yǒu bì yào jiā yǐ shēn rù fēn xī.', 'Terhadap masalah di atas, perlu dianalisis secara mendalam.'],
    ['政府将对符合条件的企业予以支持。', 'Zhèng fǔ jiāng duì fú hé tiáo jiàn de qǐ yè yǔ yǐ zhī chí.', 'Pemerintah akan memberikan dukungan bagi perusahaan yang memenuhi syarat.'],
    ['双方就合作事宜进行了深入交流。', 'Shuāng fāng jiù hé zuò shì yí jìn xíng le shēn rù jiāo liú.', 'Kedua pihak melakukan pertukaran mendalam mengenai hal kerja sama.'],
    ['其影响之深远，远超预期。', 'Qí yǐng xiǎng zhī shēn yuǎn, yuǎn chāo yù qī.', 'Dampaknya yang begitu luas jauh melampaui perkiraan.'],
  ]],
  [null, ['凡是 A，都 B = semua yang termasuk A, pasti B (generalisasi kategoris).', 'Hati-hati: klaim mutlak perlu dibatasi dalam argumen akademik.'], [
    ['凡是参加过培训的员工，都需要通过考核。', 'Fán shì cān jiā guò péi xùn de yuán gōng, dōu xū yào tōng guò kǎo hé.', 'Semua karyawan yang pernah ikut pelatihan harus lulus penilaian.'],
    ['凡是涉及安全的问题，都不能马虎。', 'Fán shì shè jí ān quán de wèn tí, dōu bù néng mǎ hǔ.', 'Semua masalah yang menyangkut keamanan tidak boleh disepelekan.'],
    ['凡事都要讲究方法。', 'Fán shì dōu yào jiǎng jiū fāng fǎ.', 'Segala hal harus memperhatikan metode.'],
    ['并非凡是新的都是好的。', 'Bìng fēi fán shì xīn de dōu shì hǎo de.', 'Tidak semua yang baru itu baik.'],
  ]],
  [null, ['值得一提的是 = yang patut disebutkan adalah: memperkenalkan informasi penting tambahan.', 'Variasi: 需要指出的是, 值得注意的是.'], [
    ['值得一提的是，该项目全部由年轻人完成。', 'Zhí dé yì tí de shì, gāi xiàng mù quán bù yóu nián qīng rén wán chéng.', 'Yang patut disebutkan, proyek ini seluruhnya dikerjakan anak muda.'],
    ['需要指出的是，样本量相对较小。', 'Xū yào zhǐ chū de shì, yàng běn liàng xiāng duì jiào xiǎo.', 'Perlu dicatat bahwa ukuran sampel relatif kecil.'],
    ['值得注意的是，农村地区的增长更快。', 'Zhí dé zhù yì de shì, nóng cūn dì qū de zēng zhǎng gèng kuài.', 'Yang patut diperhatikan, pertumbuhan di wilayah pedesaan lebih cepat.'],
    ['更重要的是，这一模式可以推广。', 'Gèng zhòng yào de shì, zhè yì mó shì kě yǐ tuī guǎng.', 'Yang lebih penting, model ini dapat diperluas penerapannya.'],
  ]],
  [null, ['Pelunakan sikap: 未必 (belum tentu), 不见得 (tidak tentu), 恐怕, 或许.', 'Membuat bantahan terdengar sopan dan ilmiah.'], [
    ['价格高的未必就是质量好的。', 'Jià gé gāo de wèi bì jiù shì zhì liàng hǎo de.', 'Yang harganya mahal belum tentu kualitasnya bagus.'],
    ['这种做法不见得适合所有地区。', 'Zhè zhǒng zuò fǎ bú jiàn de shì hé suǒ yǒu dì qū.', 'Cara ini belum tentu cocok untuk semua daerah.'],
    ['问题恐怕没有那么简单。', 'Wèn tí kǒng pà méi yǒu nà me jiǎn dān.', 'Masalahnya khawatirnya tidak sesederhana itu.'],
    ['或许我们应该换个思路。', 'Huò xǔ wǒ men yīng gāi huàn gè sī lù.', 'Mungkin kita sebaiknya mengganti cara berpikir.'],
  ]],
  [null, ['虽说 A，但归根结底 B: mengakui kompleksitas, lalu menarik ke akar persoalan.', 'Pola dialektis: tesis → antitesis → sintesis.'], [
    ['虽说外部环境不利，但归根结底还是内部管理出了问题。', 'Suī shuō wài bù huán jìng bú lì, dàn guī gēn jié dǐ hái shì nèi bù guǎn lǐ chū le wèn tí.', 'Meskipun lingkungan eksternal tidak mendukung, pada akhirnya masalahnya ada pada manajemen internal.'],
    ['虽说技术进步很快，但归根结底决定发展的是人。', 'Suī shuō jì shù jìn bù hěn kuài, dàn guī gēn jié dǐ jué dìng fā zhǎn de shì rén.', 'Meskipun kemajuan teknologi cepat, pada akhirnya yang menentukan perkembangan adalah manusia.'],
    ['看似矛盾的两种观点，其实可以统一起来。', 'Kàn sì máo dùn de liǎng zhǒng guān diǎn, qí shí kě yǐ tǒng yī qǐ lái.', 'Dua pandangan yang tampak bertentangan sebenarnya bisa dipadukan.'],
    ['问题的两面都需要看到。', 'Wèn tí de liǎng miàn dōu xū yào kàn dào.', 'Kedua sisi masalah perlu dilihat.'],
  ]],
  [null, ['归根结底 / 说到底 / 从根本上说 = pada akhirnya / pada dasarnya (inferensi penutup).', 'Biasanya muncul di akhir paragraf analitis.'], [
    ['归根结底，这是一个信任问题。', 'Guī gēn jié dǐ, zhè shì yí gè xìn rèn wèn tí.', 'Pada akhirnya, ini adalah masalah kepercayaan.'],
    ['说到底，教育的本质是唤醒。', 'Shuō dào dǐ, jiào yù de běn zhì shì huàn xǐng.', 'Pada dasarnya, hakikat pendidikan adalah membangkitkan kesadaran.'],
    ['从根本上说，只有提高生产率才能增加收入。', 'Cóng gēn běn shàng shuō, zhǐ yǒu tí gāo shēng chǎn lǜ cái néng zēng jiā shōu rù.', 'Pada dasarnya, hanya dengan meningkatkan produktivitas pendapatan bisa naik.'],
    ['这一切归根到底取决于制度设计。', 'Zhè yí qiè guī gēn dào dǐ qǔ jué yú zhì dù shè jì.', 'Semua ini pada akhirnya bergantung pada desain sistem.'],
  ]],
  [null, ['Perangkat kohesi akademik: 上述, 前述, 如前所述, 鉴于此, 基于此.', 'Menghubungkan paragraf tanpa mengulang informasi.'], [
    ['如前所述，样本来自三个不同的城市。', 'Rú qián suǒ shù, yàng běn lái zì sān gè bù tóng de chéng shì.', 'Seperti telah disebutkan, sampel berasal dari tiga kota berbeda.'],
    ['鉴于此，本研究采用了混合方法。', 'Jiàn yú cǐ, běn yán jiū cǎi yòng le hùn hé fāng fǎ.', 'Mengingat hal ini, penelitian ini memakai metode campuran.'],
    ['上述结论仍需进一步验证。', 'Shàng shù jié lùn réng xū jìn yí bù yàn zhèng.', 'Kesimpulan di atas masih perlu diverifikasi lebih lanjut.'],
    ['基于以上分析，我们提出三点建议。', 'Jī yú yǐ shàng fēn xī, wǒ men tí chū sān diǎn jiàn yì.', 'Berdasarkan analisis di atas, kami mengajukan tiga saran.'],
  ]],
  [null, ['Memadatkan kalimat panjang: gabungkan klausa dengan frasa nominal dan kata depan (随着, 通过, 在…下).', 'Tujuan: informasi sama, kata lebih sedikit.'], [
    ['随着人口老龄化，医疗需求不断上升。', 'Suí zhe rén kǒu lǎo líng huà, yī liáo xū qiú bú duàn shàng shēng.', 'Seiring penuaan penduduk, kebutuhan layanan kesehatan terus naik.'],
    ['通过数据分析，团队找到了症结所在。', 'Tōng guò shù jù fēn xī, tuán duì zhǎo dào le zhēng jié suǒ zài.', 'Melalui analisis data, tim menemukan akar masalahnya.'],
    ['在各方共同努力下，项目提前完工。', 'Zài gè fāng gòng tóng nǔ lì xià, xiàng mù tí qián wán gōng.', 'Berkat usaha bersama semua pihak, proyek selesai lebih awal.'],
    ['以较低的成本取得了较好的效果。', 'Yǐ jiào dī de chéng běn qǔ dé le jiào hǎo de xiào guǒ.', 'Memperoleh hasil yang cukup baik dengan biaya relatif rendah.'],
  ]],
  [null, ['Menyunting kalimat terlalu kompleks: hapus konektor ganda, kurangi 的 berurutan, pecah kalimat.', 'Satu kalimat sebaiknya memuat maksimal tiga klausa.'], [
    ['原句：我们公司的产品的质量的问题很严重。', 'Yuán jù: wǒ men gōng sī de chǎn pǐn de zhì liàng de wèn tí hěn yán zhòng.', 'Asli: masalah kualitas produk perusahaan kami sangat serius (terlalu banyak 的).'],
    ['修改：本公司产品的质量问题很严重。', 'Xiū gǎi: běn gōng sī chǎn pǐn de zhì liàng wèn tí hěn yán zhòng.', 'Revisi: masalah kualitas produk perusahaan kami sangat serius.'],
    ['原句：虽然他很努力，但是然而结果不理想。', 'Yuán jù: suī rán tā hěn nǔ lì, dàn shì rán ér jié guǒ bù lǐ xiǎng.', 'Asli: meskipun dia berusaha, tetapi namun hasilnya tidak ideal (konektor ganda).'],
    ['修改：他虽然很努力，结果却不理想。', 'Xiū gǎi: tā suī rán hěn nǔ lì, jié guǒ què bù lǐ xiǎng.', 'Revisi: meskipun dia berusaha keras, hasilnya justru tidak ideal.'],
  ]],
  [null, ['Transformasi gaya: lisan ↔ tulis, netral ↔ persuasif, panjang ↔ ringkas.', 'Pilih kosakata dan struktur sesuai pembaca sasaran.'], [
    ['口语：这事儿挺麻烦的，要好好想想。', 'Kǒu yǔ: zhè shì ér tǐng má fán de, yào hǎo hǎo xiǎng xiǎng.', 'Lisan: urusan ini cukup merepotkan, harus dipikirkan baik-baik.'],
    ['书面：此事较为复杂，需审慎考虑。', 'Shū miàn: cǐ shì jiào wéi fù zá, xū shěn shèn kǎo lǜ.', 'Tulis: hal ini cukup kompleks, perlu dipertimbangkan dengan cermat.'],
    ['口语：大家都觉得这个办法不错。', 'Kǒu yǔ: dà jiā dōu jué de zhè ge bàn fǎ bú cuò.', 'Lisan: semua orang merasa cara ini lumayan.'],
    ['书面：该方案获得了普遍认可。', 'Shū miàn: gāi fāng àn huò dé le pǔ biàn rèn kě.', 'Tulis: rencana tersebut memperoleh pengakuan luas.'],
  ]],
  [null, ['Portfolio grammar HSK 6: esai 600 karakter dengan konsesi, kontrafaktual, nominalisasi, dan paralelisme.', 'Beri anotasi pada setiap struktur lanjut yang dipakai.'], [
    ['即便科技日新月异，人文关怀也不可或缺。', 'Jí biàn kē jì rì xīn yuè yì, rén wén guān huái yě bù kě huò quē.', 'Sekalipun teknologi berubah setiap hari, kepedulian kemanusiaan tetap tak tergantikan.'],
    ['与其说我们缺少技术，不如说我们缺少反思。', 'Yǔ qí shuō wǒ men quē shǎo jì shù, bù rú shuō wǒ men quē shǎo fǎn sī.', 'Daripada disebut kita kekurangan teknologi, lebih tepat disebut kita kekurangan refleksi.'],
    ['要不是有前人的积累，今天的成就无从谈起。', 'Yào bú shì yǒu qián rén de jī lěi, jīn tiān de chéng jiù wú cóng tán qǐ.', 'Seandainya bukan karena akumulasi generasi terdahulu, pencapaian hari ini tidak mungkin ada.'],
    ['归根结底，发展的目的在于人。', 'Guī gēn jié dǐ, fā zhǎn de mù dì zài yú rén.', 'Pada akhirnya, tujuan pembangunan terletak pada manusia.'],
  ]],
];
