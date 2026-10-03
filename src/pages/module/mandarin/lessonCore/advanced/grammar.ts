import type { LessonCoreTuple } from '../types';

// Grammar HSK 5 — one entry per lesson (index = lesson - 1). Titles come from the topic list.
export const grammar: LessonCoreTuple[] = [
  [null, ['尽管 A，(但是) B 仍然/还是 C: meskipun A (fakta), B tetap C.', 'Berbeda dari 虽然, 尽管 lebih formal dan sering dipasangkan dengan 仍然.'], [
    ['尽管城市生活压力很大，年轻人仍然愿意留在大城市。', 'Jǐn guǎn chéng shì shēng huó yā lì hěn dà, nián qīng rén réng rán yuàn yì liú zài dà chéng shì.', 'Meskipun tekanan hidup di kota besar, anak muda tetap mau tinggal di kota besar.'],
    ['尽管房租一再上涨，他仍然不打算搬家。', 'Jǐn guǎn fáng zū yí zài shàng zhǎng, tā réng rán bù dǎ suàn bān jiā.', 'Meskipun sewa rumah terus naik, dia tetap tidak berniat pindah.'],
    ['尽管遇到了很多困难，项目还是按时完成了。', 'Jǐn guǎn yù dào le hěn duō kùn nán, xiàng mù hái shì àn shí wán chéng le.', 'Meskipun menghadapi banyak kesulitan, proyek tetap selesai tepat waktu.'],
    ['尽管如此，我们仍然不能放松警惕。', 'Jǐn guǎn rú cǐ, wǒ men réng rán bù néng fàng sōng jǐng tì.', 'Meski demikian, kita tetap tidak boleh lengah.'],
  ]],
  [null, ['一方面…，另一方面… menyajikan dua sisi yang setara dari satu isu.', 'Setelah kedua sisi, tambahkan kesimpulan dengan 因此 atau 总之.'], [
    ['一方面，科技提高了工作效率；另一方面，它也带来了隐私风险。', 'Yì fāng miàn, kē jì tí gāo le gōng zuò xiào lǜ; lìng yì fāng miàn, tā yě dài lái le yǐn sī fēng xiǎn.', 'Di satu sisi, teknologi meningkatkan efisiensi kerja; di sisi lain, ia juga membawa risiko privasi.'],
    ['一方面要鼓励创新，另一方面要加强监管。', 'Yì fāng miàn yào gǔ lì chuàng xīn, lìng yì fāng miàn yào jiā qiáng jiān guǎn.', 'Di satu sisi inovasi harus didorong, di sisi lain pengawasan harus diperkuat.'],
    ['一方面，他想出国深造；另一方面，他又放不下年迈的父母。', 'Yì fāng miàn, tā xiǎng chū guó shēn zào; lìng yì fāng miàn, tā yòu fàng bú xià nián mài de fù mǔ.', 'Di satu sisi, dia ingin melanjutkan studi ke luar negeri; di sisi lain, dia tidak tega meninggalkan orang tuanya yang sudah tua.'],
    ['因此，我们需要在两者之间找到平衡。', 'Yīn cǐ, wǒ men xū yào zài liǎng zhě zhī jiān zhǎo dào píng héng.', 'Oleh karena itu, kita perlu menemukan keseimbangan di antara keduanya.'],
  ]],
  [null, ['之所以 A，是因为 B: A terjadi justru karena B (menekankan alasan).', 'Hasil disebut dulu, alasan ditekankan di akhir.'], [
    ['他之所以成功，是因为从不轻易放弃。', 'Tā zhī suǒ yǐ chéng gōng, shì yīn wèi cóng bù qīng yì fàng qì.', 'Dia berhasil justru karena tidak pernah mudah menyerah.'],
    ['这项改革之所以受欢迎，是因为它回应了百姓的需求。', 'Zhè xiàng gǎi gé zhī suǒ yǐ shòu huān yíng, shì yīn wèi tā huí yìng le bǎi xìng de xū qiú.', 'Reformasi ini disambut baik justru karena menjawab kebutuhan rakyat.'],
    ['我之所以选择这个专业，是因为对教育有兴趣。', 'Wǒ zhī suǒ yǐ xuǎn zé zhè ge zhuān yè, shì yīn wèi duì jiào yù yǒu xìng qù.', 'Saya memilih jurusan ini karena tertarik pada pendidikan.'],
    ['问题之所以难以解决，是因为涉及多方利益。', 'Wèn tí zhī suǒ yǐ nán yǐ jiě jué, shì yīn wèi shè jí duō fāng lì yì.', 'Masalah ini sulit diselesaikan karena melibatkan kepentingan banyak pihak.'],
  ]],
  [null, ['从…角度来看 = dilihat dari sudut...; menandai perspektif analisis.', 'Variasi: 从…来说, 就…而言 (lebih formal).'], [
    ['从经济角度来看，这个方案成本太高。', 'Cóng jīng jì jiǎo dù lái kàn, zhè ge fāng àn chéng běn tài gāo.', 'Dilihat dari sudut ekonomi, rencana ini biayanya terlalu tinggi.'],
    ['从员工的角度来看，弹性工作制更受欢迎。', 'Cóng yuán gōng de jiǎo dù lái kàn, tán xìng gōng zuò zhì gèng shòu huān yíng.', 'Dari sudut pandang karyawan, sistem kerja fleksibel lebih disukai.'],
    ['就环境而言，这种做法利大于弊。', 'Jiù huán jìng ér yán, zhè zhǒng zuò fǎ lì dà yú bì.', 'Dari segi lingkungan, cara ini lebih banyak manfaat daripada kerugiannya.'],
    ['换个角度看，危机也是机会。', 'Huàn gè jiǎo dù kàn, wēi jī yě shì jī huì.', 'Dilihat dari sudut lain, krisis juga merupakan peluang.'],
  ]],
  [null, ['由于 A，因此 B: pola sebab-akibat formal untuk tulisan.', '由于 bisa diikuti frasa kata benda: 由于资金不足.'], [
    ['由于资金不足，这个项目被迫暂停。', 'Yóu yú zī jīn bù zú, zhè ge xiàng mù bèi pò zàn tíng.', 'Karena kekurangan dana, proyek ini terpaksa dihentikan sementara.'],
    ['由于天气恶劣，因此航班全部取消。', 'Yóu yú tiān qì è liè, yīn cǐ háng bān quán bù qǔ xiāo.', 'Karena cuaca buruk, seluruh penerbangan dibatalkan.'],
    ['由于缺乏沟通，双方产生了误解。', 'Yóu yú quē fá gōu tōng, shuāng fāng chǎn shēng le wù jiě.', 'Karena kurang komunikasi, kedua pihak salah paham.'],
    ['由于政策调整，因此企业必须改变策略。', 'Yóu yú zhèng cè tiáo zhěng, yīn cǐ qǐ yè bì xū gǎi biàn cè lüè.', 'Karena penyesuaian kebijakan, perusahaan harus mengubah strategi.'],
  ]],
  [null, ['然而 = namun (kontras dengan harapan); 相反 = sebaliknya (arah berlawanan).', '然而 di awal klausa; 相反 sering diikuti koma.'], [
    ['人们以为网络会让信息更透明，然而假新闻也越来越多。', 'Rén men yǐ wéi wǎng luò huì ràng xìn xī gèng tòu míng, rán ér jiǎ xīn wén yě yuè lái yuè duō.', 'Orang mengira internet membuat informasi lebih transparan, namun berita palsu juga semakin banyak.'],
    ['限制并没有减少需求，相反，黑市更活跃了。', 'Xiàn zhì bìng méi yǒu jiǎn shǎo xū qiú, xiāng fǎn, hēi shì gèng huó yuè le.', 'Pembatasan tidak mengurangi permintaan, sebaliknya, pasar gelap semakin aktif.'],
    ['他没有生气，相反还笑了。', 'Tā méi yǒu shēng qì, xiāng fǎn hái xiào le.', 'Dia tidak marah, sebaliknya malah tertawa.'],
    ['计划很完美，然而执行起来困难重重。', 'Jì huà hěn wán měi, rán ér zhí xíng qǐ lái kùn nán chóng chóng.', 'Rencananya sempurna, namun pelaksanaannya penuh kesulitan.'],
  ]],
  [null, ['Frasa nominal abstrak: 的 + nomina abstrak (问题的严重性, 发展的可持续性).', 'Membuat tulisan formal padat: 提高…的效率, 加强…的管理.'], [
    ['人们逐渐认识到环境问题的严重性。', 'Rén men zhú jiàn rèn shi dào huán jìng wèn tí de yán zhòng xìng.', 'Orang-orang perlahan menyadari betapa seriusnya masalah lingkungan.'],
    ['我们要提高公共服务的效率。', 'Wǒ men yào tí gāo gōng gòng fú wù de xiào lǜ.', 'Kita harus meningkatkan efisiensi layanan publik.'],
    ['这涉及个人隐私的保护。', 'Zhè shè jí gè rén yǐn sī de bǎo hù.', 'Ini menyangkut perlindungan privasi pribadi.'],
    ['城市发展的可持续性值得关注。', 'Chéng shì fā zhǎn de kě chí xù xìng zhí dé guān zhù.', 'Keberlanjutan pembangunan kota patut diperhatikan.'],
  ]],
  [null, ['限于 = terbatas pada; 取决于 = bergantung pada.', 'Keduanya dipakai untuk membatasi cakupan klaim.'], [
    ['本研究的样本仅限于城市居民。', 'Běn yán jiū de yàng běn jǐn xiàn yú chéng shì jū mín.', 'Sampel penelitian ini terbatas pada penduduk kota.'],
    ['成功与否取决于团队的配合。', 'Chéng gōng yǔ fǒu qǔ jué yú tuán duì de pèi hé.', 'Berhasil atau tidaknya bergantung pada kerja sama tim.'],
    ['价格取决于市场供求关系。', 'Jià gé qǔ jué yú shì chǎng gōng qiú guān xì.', 'Harga bergantung pada hubungan penawaran dan permintaan pasar.'],
    ['限于篇幅，这里不再详细讨论。', 'Xiàn yú piān fú, zhè lǐ bú zài xiáng xì tǎo lùn.', 'Karena keterbatasan ruang, di sini tidak dibahas lebih rinci.'],
  ]],
  [null, ['受到 + nomina + 的影响/欢迎/批评 = mendapat pengaruh/sambutan/kritik.', 'Nuansa pasif yang lebih formal daripada 被.'], [
    ['很多行业受到了疫情的影响。', 'Hěn duō háng yè shòu dào le yì qíng de yǐng xiǎng.', 'Banyak industri terkena dampak pandemi.'],
    ['这部电影受到了观众的欢迎。', 'Zhè bù diàn yǐng shòu dào le guān zhòng de huān yíng.', 'Film ini disambut baik oleh penonton.'],
    ['他的言论受到了广泛批评。', 'Tā de yán lùn shòu dào le guǎng fàn pī píng.', 'Pernyataannya mendapat kritik luas.'],
    ['孩子的性格深受家庭环境影响。', 'Hái zi de xìng gé shēn shòu jiā tíng huán jìng yǐng xiǎng.', 'Karakter anak sangat dipengaruhi lingkungan keluarga.'],
  ]],
  [null, ['Perbandingan lanjut: 不如 (tidak sebaik), 与…相比 (dibandingkan), 远远超过 (jauh melampaui).', '越…越… dan 相比之下 untuk perbandingan dinamis.'], [
    ['与去年相比，今年的出口增长了百分之八。', 'Yǔ qù nián xiāng bǐ, jīn nián de chū kǒu zēng zhǎng le bǎi fēn zhī bā.', 'Dibandingkan tahun lalu, ekspor tahun ini tumbuh delapan persen.'],
    ['网上课程的效果不如面对面教学。', 'Wǎng shàng kè chéng de xiào guǒ bù rú miàn duì miàn jiào xué.', 'Efektivitas kelas online tidak sebaik pengajaran tatap muka.'],
    ['相比之下，农村的医疗资源明显不足。', 'Xiāng bǐ zhī xià, nóng cūn de yī liáo zī yuán míng xiǎn bù zú.', 'Sebagai perbandingan, sumber daya medis di pedesaan jelas kurang.'],
    ['他的收入远远超过了同龄人。', 'Tā de shōu rù yuǎn yuǎn chāo guò le tóng líng rén.', 'Penghasilannya jauh melampaui teman sebayanya.'],
  ]],
  [null, ['只要 A，就 B = asalkan A, maka B (syarat cukup).', '除非 A，否则 B = kecuali A, kalau tidak B (syarat mutlak, nada peringatan).'], [
    ['只要政策到位，问题就能缓解。', 'Zhǐ yào zhèng cè dào wèi, wèn tí jiù néng huǎn jiě.', 'Asalkan kebijakan tepat, masalahnya bisa diredakan.'],
    ['除非大家一起努力，否则计划很难成功。', 'Chú fēi dà jiā yì qǐ nǔ lì, fǒu zé jì huà hěn nán chéng gōng.', 'Kecuali semua berusaha bersama, jika tidak rencana sulit berhasil.'],
    ['除非有特殊情况，会议不会取消。', 'Chú fēi yǒu tè shū qíng kuàng, huì yì bú huì qǔ xiāo.', 'Kecuali ada keadaan khusus, rapat tidak akan dibatalkan.'],
    ['只要方法得当，学习效率会大大提高。', 'Zhǐ yào fāng fǎ dé dàng, xué xí xiào lǜ huì dà dà tí gāo.', 'Asalkan metodenya tepat, efisiensi belajar akan meningkat pesat.'],
  ]],
  [null, ['并非 A，而是 B = bukanlah A, melainkan B (lebih formal dari 不是…而是…).', '并 menegaskan penyangkalan: 并不, 并没有.'], [
    ['失败并非坏事，而是成长的机会。', 'Shī bài bìng fēi huài shì, ér shì chéng zhǎng de jī huì.', 'Kegagalan bukanlah hal buruk, melainkan kesempatan untuk tumbuh.'],
    ['问题的根源并非技术，而是管理。', 'Wèn tí de gēn yuán bìng fēi jì shù, ér shì guǎn lǐ.', 'Akar masalahnya bukan teknologi, melainkan manajemen.'],
    ['他并没有你想的那么冷漠。', 'Tā bìng méi yǒu nǐ xiǎng de nà me lěng mò.', 'Dia sama sekali tidak sedingin yang kamu kira.'],
    ['幸福并不取决于财富的多少。', 'Xìng fú bìng bù qǔ jué yú cái fù de duō shǎo.', 'Kebahagiaan sama sekali tidak bergantung pada banyaknya kekayaan.'],
  ]],
  [null, ['Rantai sebab: 导致 (menyebabkan, negatif), 促进 (mendorong, positif), 反映 (mencerminkan).', 'Kolokasi: 导致失败, 促进发展, 反映问题.'], [
    ['长期熬夜会导致注意力下降。', 'Cháng qī áo yè huì dǎo zhì zhù yì lì xià jiàng.', 'Begadang jangka panjang menyebabkan konsentrasi menurun.'],
    ['旅游业促进了当地经济的发展。', 'Lǚ yóu yè cù jìn le dāng dì jīng jì de fā zhǎn.', 'Pariwisata mendorong perkembangan ekonomi setempat.'],
    ['这些数据反映了消费习惯的变化。', 'Zhè xiē shù jù fǎn yìng le xiāo fèi xí guàn de biàn huà.', 'Data ini mencerminkan perubahan kebiasaan konsumsi.'],
    ['竞争加剧导致利润下降，进而促进了行业整合。', 'Jìng zhēng jiā jù dǎo zhì lì rùn xià jiàng, jìn ér cù jìn le háng yè zhěng hé.', 'Persaingan yang ketat menyebabkan laba turun, dan selanjutnya mendorong konsolidasi industri.'],
  ]],
  [null, ['值得 + kata kerja = layak/patut; 有必要 + kata kerja = perlu.', 'Negasi: 不值得, 没有必要.'], [
    ['这个问题值得深入研究。', 'Zhè ge wèn tí zhí dé shēn rù yán jiū.', 'Masalah ini layak diteliti lebih dalam.'],
    ['我们有必要重新评估这个计划。', 'Wǒ men yǒu bì yào chóng xīn píng gū zhè ge jì huà.', 'Kita perlu mengevaluasi ulang rencana ini.'],
    ['为了一点小事吵架，真不值得。', 'Wèi le yì diǎn xiǎo shì chǎo jià, zhēn bù zhí dé.', 'Bertengkar karena hal kecil sungguh tidak sepadan.'],
    ['没有必要为此感到焦虑。', 'Méi yǒu bì yào wèi cǐ gǎn dào jiāo lǜ.', 'Tidak perlu cemas karena hal ini.'],
  ]],
  [null, ['首先 / 其次 / 此外 / 最后 membangun struktur paragraf formal.', '此外 = selain itu (menambah poin setara).'], [
    ['首先，要明确问题的范围。', 'Shǒu xiān, yào míng què wèn tí de fàn wéi.', 'Pertama, cakupan masalah harus diperjelas.'],
    ['其次，需要收集可靠的数据。', 'Qí cì, xū yào shōu jí kě kào de shù jù.', 'Kedua, perlu mengumpulkan data yang dapat diandalkan.'],
    ['此外，还应该听取各方的意见。', 'Cǐ wài, hái yīng gāi tīng qǔ gè fāng de yì jiàn.', 'Selain itu, pendapat semua pihak juga harus didengarkan.'],
    ['最后，根据分析结果提出建议。', 'Zuì hòu, gēn jù fēn xī jié guǒ tí chū jiàn yì.', 'Terakhir, mengajukan saran berdasarkan hasil analisis.'],
  ]],
  [null, ['虽然如此 / 尽管如此 = meskipun demikian: mengakui argumen lawan lalu kembali ke posisi sendiri.', 'Pola sanggahan: 有人认为… 虽然如此，….'], [
    ['有人认为网购会取代实体店。', 'Yǒu rén rèn wéi wǎng gòu huì qǔ dài shí tǐ diàn.', 'Ada yang berpendapat belanja online akan menggantikan toko fisik.'],
    ['虽然如此，实体店的体验仍然无法替代。', 'Suī rán rú cǐ, shí tǐ diàn de tǐ yàn réng rán wú fǎ tì dài.', 'Meskipun demikian, pengalaman di toko fisik tetap tak tergantikan.'],
    ['这种观点有一定道理，但忽视了人的社交需求。', 'Zhè zhǒng guān diǎn yǒu yí dìng dào lǐ, dàn hū shì le rén de shè jiāo xū qiú.', 'Pandangan ini ada benarnya, tetapi mengabaikan kebutuhan sosial manusia.'],
    ['即便如此，我们也不能否认网购的便利。', 'Jí biàn rú cǐ, wǒ men yě bù néng fǒu rèn wǎng gòu de biàn lì.', 'Sekalipun begitu, kita juga tidak bisa menyangkal kemudahan belanja online.'],
  ]],
  [null, ['可见 = terlihat bahwa (kesimpulan dari bukti yang baru disebut).', '可以推断 = dapat disimpulkan (inferensi yang lebih hati-hati).'], [
    ['报名人数翻了一倍，可见大家对这个活动很感兴趣。', 'Bào míng rén shù fān le yí bèi, kě jiàn dà jiā duì zhè ge huó dòng hěn gǎn xìng qù.', 'Jumlah pendaftar berlipat ganda, terlihat bahwa semua sangat tertarik pada kegiatan ini.'],
    ['从他的表情可以推断，他并不满意。', 'Cóng tā de biǎo qíng kě yǐ tuī duàn, tā bìng bù mǎn yì.', 'Dari ekspresinya dapat disimpulkan bahwa dia tidak puas.'],
    ['由此可以推断，价格还会继续上涨。', 'Yóu cǐ kě yǐ tuī duàn, jià gé hái huì jì xù shàng zhǎng.', 'Dari sini dapat disimpulkan bahwa harga masih akan terus naik.'],
    ['数据说明，改革已初见成效。', 'Shù jù shuō míng, gǎi gé yǐ chū jiàn chéng xiào.', 'Data menunjukkan reformasi sudah mulai membuahkan hasil.'],
  ]],
  [null, ['Register lisan vs tulis: 但是→然而, 所以→因此, 很多→大量, 想→打算/拟.', 'Kalimat tulis lebih padat, memakai 之, 其, 与, 以.'], [
    ['口语：这个问题很多人都在关心。', 'Kǒu yǔ: zhè ge wèn tí hěn duō rén dōu zài guān xīn.', 'Lisan: banyak orang memperhatikan masalah ini.'],
    ['书面语：该问题引起了广泛关注。', 'Shū miàn yǔ: gāi wèn tí yǐn qǐ le guǎng fàn guān zhù.', 'Tulis: masalah tersebut menarik perhatian luas.'],
    ['口语：我们打算下个月开始。', 'Kǒu yǔ: wǒ men dǎ suàn xià gè yuè kāi shǐ.', 'Lisan: kami berencana mulai bulan depan.'],
    ['书面语：本项目拟于下月启动。', 'Shū miàn yǔ: běn xiàng mù nǐ yú xià yuè qǐ dòng.', 'Tulis: proyek ini direncanakan dimulai bulan depan.'],
  ]],
  [null, ['Menyunting kalimat kompleks: pecah kalimat terlalu panjang, perjelas subjek, hapus pengulangan.', 'Periksa: satu kalimat = satu ide utama.'], [
    ['原句：由于因为下雨，所以比赛推迟了。', 'Yuán jù: yóu yú yīn wèi xià yǔ, suǒ yǐ bǐ sài tuī chí le.', 'Kalimat asli: karena sebab hujan, jadi pertandingan ditunda.'],
    ['修改：由于下雨，比赛推迟了。', 'Xiū gǎi: yóu yú xià yǔ, bǐ sài tuī chí le.', 'Revisi: karena hujan, pertandingan ditunda.'],
    ['原句：通过这次活动，使我们认识到团结的重要。', 'Yuán jù: tōng guò zhè cì huó dòng, shǐ wǒ men rèn shi dào tuán jié de zhòng yào.', 'Kalimat asli: melalui kegiatan ini, membuat kami menyadari pentingnya persatuan.'],
    ['修改：这次活动使我们认识到团结的重要。', 'Xiū gǎi: zhè cì huó dòng shǐ wǒ men rèn shi dào tuán jié de zhòng yào.', 'Revisi: kegiatan ini membuat kami menyadari pentingnya persatuan.'],
  ]],
  [null, ['Portfolio HSK 5: esai 400 karakter memakai 8 pola formal (尽管, 之所以, 并非, 由此可见...).', 'Periksa register: tidak ada ungkapan lisan dalam esai formal.'], [
    ['随着人口老龄化加剧，养老问题日益突出。', 'Suí zhe rén kǒu lǎo líng huà jiā jù, yǎng lǎo wèn tí rì yì tū chū.', 'Seiring semakin parahnya penuaan penduduk, masalah perawatan lansia semakin menonjol.'],
    ['之所以如此，是因为家庭规模不断缩小。', 'Zhī suǒ yǐ rú cǐ, shì yīn wèi jiā tíng guī mó bú duàn suō xiǎo.', 'Hal ini terjadi karena ukuran keluarga terus mengecil.'],
    ['养老并非单靠家庭就能解决，而是需要社会共同承担。', 'Yǎng lǎo bìng fēi dān kào jiā tíng jiù néng jiě jué, ér shì xū yào shè huì gòng tóng chéng dān.', 'Perawatan lansia tidak bisa diselesaikan hanya oleh keluarga, melainkan perlu ditanggung bersama oleh masyarakat.'],
    ['由此可见，完善社会保障体系刻不容缓。', 'Yóu cǐ kě jiàn, wán shàn shè huì bǎo zhàng tǐ xì kè bù róng huǎn.', 'Dari sini terlihat bahwa menyempurnakan sistem jaminan sosial sangat mendesak.'],
  ]],
];
