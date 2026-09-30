import type { LessonCoreTuple } from '../types';

// Grammar HSK 3 — one entry per lesson (index = lesson - 1).
export const grammar: LessonCoreTuple[] = [
  ['Giving opinions: 我觉得 / 我认为', ['我觉得 (menurut saya, santai) dan 我认为 (saya berpendapat, lebih formal) diikuti klausa lengkap.', 'Tambahkan alasan dengan 因为 atau contoh dengan 比如.'], [
    ['我觉得学汉语最难的是声调。', 'Wǒ jué de xué hàn yǔ zuì nán de shì shēng diào.', 'Menurut saya yang paling sulit dalam belajar Mandarin adalah nada.'],
    ['我认为每天练习比上课更重要。', 'Wǒ rèn wéi měi tiān liàn xí bǐ shàng kè gèng zhòng yào.', 'Saya berpendapat berlatih setiap hari lebih penting daripada ikut kelas.'],
    ['我觉得看中文电影很有帮助，比如可以学口语。', 'Wǒ jué de kàn zhōng wén diàn yǐng hěn yǒu bāng zhù, bǐ rú kě yǐ xué kǒu yǔ.', 'Menurut saya menonton film Mandarin sangat membantu, misalnya bisa belajar bahasa lisan.'],
    ['你认为呢？', 'Nǐ rèn wéi ne?', 'Bagaimana pendapatmu?'],
  ]],
  ['Time clauses: 以前 / 以后 / 的时候', ['Klausa + 以前 = sebelum; klausa + 以后 = sesudah; klausa + 的时候 = saat.', 'Klausa waktu selalu diletakkan di depan klausa utama.'], [
    ['来中国以前，我只会说"你好"。', 'Lái zhōng guó yǐ qián, wǒ zhǐ huì shuō " nǐ hǎo ".', 'Sebelum datang ke Tiongkok, saya hanya bisa bilang "halo".'],
    ['上大学以后，我开始学汉字。', 'Shàng dà xué yǐ hòu, wǒ kāi shǐ xué hàn zì.', 'Setelah masuk kuliah, saya mulai belajar Hanzi.'],
    ['考试的时候，我紧张得手都出汗了。', 'Kǎo shì de shí hòu, wǒ jǐn zhāng de shǒu dōu chū hàn le.', 'Saat ujian, saya gugup sampai tangan berkeringat.'],
    ['毕业以前，我想去一次北京。', 'Bì yè yǐ qián, wǒ xiǎng qù yí cì běi jīng.', 'Sebelum lulus, saya ingin sekali pergi ke Beijing.'],
  ]],
  ['Intentions: 打算 / 准备 / 计划', ['打算 (berniat), 准备 (bersiap/berencana segera), 计划 (merencanakan secara formal).', 'Ketiganya diikuti kata kerja: 打算 + 去, 准备 + 考.'], [
    ['这个周末我打算在家好好休息。', 'Zhè ge zhōu mò wǒ dǎ suàn zài jiā hǎo hǎo xiū xi.', 'Akhir pekan ini saya berniat beristirahat dengan baik di rumah.'],
    ['我们准备下个月搬家。', 'Wǒ men zhǔn bèi xià gè yuè bān jiā.', 'Kami bersiap pindah rumah bulan depan.'],
    ['公司计划明年开一家新店。', 'Gōng sī jì huà míng nián kāi yì jiā xīn diàn.', 'Perusahaan berencana membuka toko baru tahun depan.'],
    ['你打算怎么过生日？', 'Nǐ dǎ suàn zěn me guò shēng rì?', 'Kamu berencana merayakan ulang tahun bagaimana?'],
  ]],
  ['Gradual change: 越来越 / 越…越…', ['越来越 + sifat = semakin...; 越 A 越 B = semakin A, semakin B.', 'Jangan pakai 很 setelah 越来越: 越来越好, bukan 越来越很好.'], [
    ['天气越来越热了。', 'Tiān qì yuè lái yuè rè le.', 'Cuaca semakin panas.'],
    ['我们的城市变得越来越干净。', 'Wǒ men de chéng shì biàn de yuè lái yuè gān jìng.', 'Kota kami menjadi semakin bersih.'],
    ['雨越下越大。', 'Yǔ yuè xià yuè dà.', 'Hujan semakin deras.'],
    ['汉语越学越有意思。', 'Hàn yǔ yuè xué yuè yǒu yì si.', 'Bahasa Mandarin semakin dipelajari semakin menarik.'],
  ]],
  ['把 sentences: 把 + object + verb + result', ['把 memindahkan objek ke depan kata kerja untuk menekankan apa yang terjadi padanya.', 'Kata kerja harus punya hasil/arah: 放在, 做完, 打开, 洗干净.'], [
    ['请把窗户打开。', 'Qǐng bǎ chuāng hù dǎ kāi.', 'Tolong buka jendelanya.'],
    ['我把衣服洗干净了。', 'Wǒ bǎ yī fu xǐ gān jìng le.', 'Saya sudah mencuci bersih bajunya.'],
    ['别把手机放在桌子边上。', 'Bié bǎ shǒu jī fàng zài zhuō zi biān shàng.', 'Jangan taruh ponsel di pinggir meja.'],
    ['他把我的名字写错了。', 'Tā bǎ wǒ de míng zì xiě cuò le.', 'Dia salah menulis nama saya.'],
  ]],
  ['被 passive with agent', ['被 + pelaku + kata kerja + hasil: subjek mengalami sesuatu (sering tidak menyenangkan).', 'Pelaku boleh dihilangkan: 我的车被偷了.'], [
    ['我的自行车被人偷了。', 'Wǒ de zì xíng chē bèi rén tōu le.', 'Sepeda saya dicuri orang.'],
    ['蛋糕被弟弟吃完了。', 'Dàn gāo bèi dì di chī wán le.', 'Kuenya sudah dihabiskan oleh adik laki-laki.'],
    ['他被老师批评了。', 'Tā bèi lǎo shī pī píng le.', 'Dia dimarahi oleh guru.'],
    ['那本书被借走了。', 'Nà běn shū bèi jiè zǒu le.', 'Buku itu sudah dipinjam.'],
  ]],
  ['Result complements 完 / 好 / 到 / 懂', ['Kata kerja + hasil: 做完 (selesai), 准备好 (siap), 找到 (ketemu), 听懂 (paham).', 'Negasi dengan 没: 没找到, 没听懂.'], [
    ['你的报告写完了吗？', 'Nǐ de bào gào xiě wán le ma?', 'Laporanmu sudah selesai ditulis?'],
    ['东西都准备好了。', 'Dōng xi dōu zhǔn bèi hǎo le.', 'Semua barang sudah siap.'],
    ['我找了半天，终于找到了钥匙。', 'Wǒ zhǎo le bàn tiān, zhōng yú zhǎo dào le yào shi.', 'Saya mencari lama, akhirnya menemukan kunci.'],
    ['老师说得太快，我没听懂。', 'Lǎo shī shuō de tài kuài, wǒ méi tīng dǒng.', 'Guru bicara terlalu cepat, saya tidak paham.'],
  ]],
  ['Simultaneous actions 一边…一边…', ['一边 A 一边 B = melakukan A sambil B (subjek sama).', 'Kedua kegiatan harus bisa dilakukan bersamaan.'], [
    ['他一边吃早饭一边看新闻。', 'Tā yì biān chī zǎo fàn yì biān kàn xīn wén.', 'Dia sarapan sambil membaca berita.'],
    ['我们一边走一边聊天。', 'Wǒ men yì biān zǒu yì biān liáo tiān.', 'Kami berjalan sambil mengobrol.'],
    ['别一边开车一边打电话。', 'Bié yì biān kāi chē yì biān dǎ diàn huà.', 'Jangan menyetir sambil menelepon.'],
    ['她一边听音乐一边打扫房间。', 'Tā yì biān tīng yīn yuè yì biān dǎ sǎo fáng jiān.', 'Dia membersihkan kamar sambil mendengarkan musik.'],
  ]],
  ['Inclusion and exclusion 除了…以外', ['除了 A 以外，还/也 … = selain A, juga...; 除了 A 以外，都 … = kecuali A, semua....', 'Kata 还/也 atau 都 di klausa kedua menentukan maknanya.'], [
    ['除了游泳以外，我还喜欢打网球。', 'Chú le yóu yǒng yǐ wài, wǒ hái xǐ huan dǎ wǎng qiú.', 'Selain berenang, saya juga suka bermain tenis.'],
    ['除了小王以外，大家都来了。', 'Chú le xiǎo wáng yǐ wài, dà jiā dōu lái le.', 'Kecuali Xiao Wang, semua sudah datang.'],
    ['除了周末，我每天都上班。', 'Chú le zhōu mò, wǒ měi tiān dōu shàng bān.', 'Selain akhir pekan, saya bekerja setiap hari.'],
    ['除了中文以外，她也会说法语。', 'Chú le zhōng wén yǐ wài, tā yě huì shuō fǎ yǔ.', 'Selain bahasa Mandarin, dia juga bisa bahasa Prancis.'],
  ]],
  ['有点儿 vs 一点儿 in complaints', ['有点儿 + sifat = agak (sebelum sifat, bernada keluhan).', 'Sifat + 一点儿 = sedikit lebih (dalam permintaan/perbandingan).'], [
    ['房间有点儿吵，能换一个吗？', 'Fáng jiān yǒu diǎnr chǎo, néng huàn yí gè ma?', 'Kamarnya agak berisik, bisa ganti yang lain?'],
    ['请把空调开小一点儿。', 'Qǐng bǎ kōng tiáo kāi xiǎo yì diǎnr.', 'Tolong kecilkan AC-nya sedikit.'],
    ['这个价格有点儿不合理。', 'Zhè ge jià gé yǒu diǎnr bù hé lǐ.', 'Harga ini agak tidak masuk akal.'],
    ['能不能快一点儿处理？', 'Néng bu néng kuài yì diǎnr chǔ lǐ?', 'Bisakah diproses sedikit lebih cepat?'],
  ]],
  ['Potential complements: 得 / 不 + result', ['Kata kerja + 得/不 + hasil = bisa/tidak bisa mencapai hasil: 做得完, 做不完.', 'Sangat umum untuk kemampuan yang bergantung situasi.'], [
    ['今天的工作我做不完。', 'Jīn tiān de gōng zuò wǒ zuò bù wán.', 'Pekerjaan hari ini tidak bisa saya selesaikan.'],
    ['你看得懂这份合同吗？', 'Nǐ kàn de dǒng zhè fèn hé tong ma?', 'Kamu bisa memahami kontrak ini?'],
    ['声音太小，我听不清楚。', 'Shēng yīn tài xiǎo, wǒ tīng bù qīng chu.', 'Suaranya terlalu kecil, saya tidak bisa mendengar dengan jelas.'],
    ['这么多菜，我们吃得了吗？', 'Zhè me duō cài, wǒ men chī de le ma?', 'Sebanyak ini makanannya, apakah kita bisa menghabiskannya?'],
  ]],
  ['Immediate sequence 一…就…', ['一 A 就 B = begitu A, langsung B.', 'Bisa untuk kebiasaan (setiap kali) atau kejadian sekali.'], [
    ['我一有时间就去画画儿。', 'Wǒ yì yǒu shí jiān jiù qù huà huà ér.', 'Begitu ada waktu, saya langsung melukis.'],
    ['他一回家就打开电视。', 'Tā yì huí jiā jiù dǎ kāi diàn shì.', 'Begitu pulang, dia langsung menyalakan televisi.'],
    ['天一黑，公园里就没人了。', 'Tiān yì hēi, gōng yuán lǐ jiù méi rén le.', 'Begitu hari gelap, taman langsung sepi.'],
    ['我一听这首歌就想起大学生活。', 'Wǒ yì tīng zhè shǒu gē jiù xiǎng qǐ dà xué shēng huó.', 'Begitu mendengar lagu ini, saya teringat kehidupan kuliah.'],
  ]],
  ['Past details with 是…的', ['是…的 menekankan detail kejadian lampau: kapan, di mana, bagaimana, dengan siapa.', '是 boleh dihilangkan dalam kalimat positif; 的 tetap ada.'], [
    ['我们是坐火车去的西安。', 'Wǒ men shì zuò huǒ chē qù de xī ān.', 'Kami pergi ke Xi\'an naik kereta.'],
    ['你是什么时候回来的？', 'Nǐ shì shén me shí hòu huí lái de?', 'Kapan kamu kembali?'],
    ['我是和同学一起去的。', 'Wǒ shì hé tóng xué yì qǐ qù de.', 'Saya pergi bersama teman sekelas.'],
    ['这张照片是在长城上拍的。', 'Zhè zhāng zhào piàn shì zài cháng chéng shàng pāi de.', 'Foto ini diambil di atas Tembok Besar.'],
  ]],
  ['Conditions 如果…就… / 只要…就…', ['如果…就… = jika... maka...; 只要…就… = asalkan... pasti....', '只要 menekankan syarat minimal yang cukup.'], [
    ['如果有问题，请随时联系我。', 'Rú guǒ yǒu wèn tí, qǐng suí shí lián xì wǒ.', 'Jika ada masalah, silakan hubungi saya kapan saja.'],
    ['如果明天不下雨，比赛就照常进行。', 'Rú guǒ míng tiān bú xià yǔ, bǐ sài jiù zhào cháng jìn xíng.', 'Jika besok tidak hujan, pertandingan berlangsung seperti biasa.'],
    ['只要你努力，就一定能通过。', 'Zhǐ yào nǐ nǔ lì, jiù yí dìng néng tōng guò.', 'Asalkan kamu berusaha, pasti bisa lulus.'],
    ['只要有网，就可以在家上课。', 'Zhǐ yào yǒu wǎng, jiù kě yǐ zài jiā shàng kè.', 'Asalkan ada internet, bisa belajar dari rumah.'],
  ]],
  ['Process steps: 首先 / 接着 / 最后', ['首先 (pertama), 接着/然后 (lalu), 最后 (terakhir) untuk instruksi.', 'Setiap langkah = satu kata kerja utama.'], [
    ['首先，把米洗干净。', 'Shǒu xiān, bǎ mǐ xǐ gān jìng.', 'Pertama, cuci beras sampai bersih.'],
    ['接着，加两杯水。', 'Jiē zhe, jiā liǎng bēi shuǐ.', 'Lalu, tambahkan dua gelas air.'],
    ['然后，打开电饭锅的开关。', 'Rán hòu, dǎ kāi diàn fàn guō de kāi guān.', 'Kemudian, nyalakan penanak nasi.'],
    ['最后，等二十分钟就好了。', 'Zuì hòu, děng èr shí fēn zhōng jiù hǎo le.', 'Terakhir, tunggu dua puluh menit dan selesai.'],
  ]],
  ['Advice modals: 应该 / 最好 / 必须', ['应该 (sebaiknya/seharusnya), 最好 (paling baik), 必须 (harus, wajib).', 'Negasi: 不应该, 最好别, 不必 (tidak perlu).'], [
    ['你应该多喝热水。', 'Nǐ yīng gāi duō hē rè shuǐ.', 'Kamu sebaiknya banyak minum air hangat.'],
    ['最好别熬夜。', 'Zuì hǎo bié áo yè.', 'Sebaiknya jangan begadang.'],
    ['上飞机以前必须关手机。', 'Shàng fēi jī yǐ qián bì xū guān shǒu jī.', 'Sebelum naik pesawat harus mematikan ponsel.'],
    ['你不必担心，问题不大。', 'Nǐ bú bì dān xīn, wèn tí bú dà.', 'Kamu tidak perlu khawatir, masalahnya tidak besar.'],
  ]],
  ['Concession 虽然…但是…', ['虽然 A，但是 B = meskipun A, tetapi B. Kedua kata boleh dipakai bersamaan.', 'Sering dipakai dalam ringkasan untuk menyeimbangkan dua sisi.'], [
    ['虽然这篇文章很长，但是内容很简单。', 'Suī rán zhè piān wén zhāng hěn cháng, dàn shì nèi róng hěn jiǎn dān.', 'Meskipun artikel ini panjang, isinya sederhana.'],
    ['虽然他很忙，但是每天都运动。', 'Suī rán tā hěn máng, dàn shì měi tiān dōu yùn dòng.', 'Meskipun dia sibuk, dia berolahraga setiap hari.'],
    ['这家店虽然小，但是很有名。', 'Zhè jiā diàn suī rán xiǎo, dàn shì hěn yǒu míng.', 'Toko ini meskipun kecil, sangat terkenal.'],
    ['虽然失败了，但是我们学到了很多。', 'Suī rán shī bài le, dàn shì wǒ men xué dào le hěn duō.', 'Meskipun gagal, kami belajar banyak.'],
  ]],
  ['Purpose: 为了 + goal', ['为了 + tujuan, + tindakan = demi/untuk...', 'Klausa 为了 biasanya di awal kalimat.'], [
    ['为了提高口语，我每天和中国朋友聊天。', 'Wèi le tí gāo kǒu yǔ, wǒ měi tiān hé zhōng guó péng yǒu liáo tiān.', 'Untuk meningkatkan kemampuan berbicara, saya mengobrol dengan teman Tionghoa setiap hari.'],
    ['为了省钱，他每天自己做饭。', 'Wèi le shěng qián, tā měi tiān zì jǐ zuò fàn.', 'Untuk menghemat uang, dia memasak sendiri setiap hari.'],
    ['为了身体健康，我不喝饮料了。', 'Wèi le shēn tǐ jiàn kāng, wǒ bù hē yǐn liào le.', 'Demi kesehatan, saya berhenti minum minuman manis.'],
    ['为了这次比赛，他们练习了半年。', 'Wèi le zhè cì bǐ sài, tā men liàn xí le bàn nián.', 'Demi pertandingan ini, mereka berlatih setengah tahun.'],
  ]],
  ['Directional complements 回来 / 出去 / 起来', ['Kata kerja + 来/去 menunjukkan arah terhadap pembicara: 回来 (kembali ke sini), 出去 (keluar sana).', '起来 juga berarti "mulai": 笑起来, 热闹起来.'], [
    ['过年的时候，大家都回来了。', 'Guò nián de shí hòu, dà jiā dōu huí lái le.', 'Saat Tahun Baru, semua orang pulang.'],
    ['孩子们跑出去放鞭炮。', 'Hái zi men pǎo chū qù fàng biān pào.', 'Anak-anak berlari keluar untuk menyalakan petasan.'],
    ['街上热闹起来了。', 'Jiē shàng rè nào qǐ lái le.', 'Jalanan mulai ramai.'],
    ['请把灯笼挂上去。', 'Qǐng bǎ dēng long guà shàng qù.', 'Tolong gantungkan lampionnya ke atas.'],
  ]],
  ['HSK 3 grammar portfolio', ['Portfolio HSK 3: satu cerita memakai 把, 被, complement hasil, 是…的, dan 虽然…但是….', 'Periksa ulang: apakah 把-sentence punya hasil? Apakah 是…的 hanya untuk masa lalu?'], [
    ['我是去年九月来中国的。', 'Wǒ shì qù nián jiǔ yuè lái zhōng guó de.', 'Saya datang ke Tiongkok September tahun lalu.'],
    ['刚来的时候，我的钱包被偷了。', 'Gāng lái de shí hòu, wǒ de qián bāo bèi tōu le.', 'Waktu baru datang, dompet saya dicuri.'],
    ['虽然很难过，但是朋友们都帮助我。', 'Suī rán hěn nán guò, dàn shì péng yǒu men dōu bāng zhù wǒ.', 'Meskipun sedih, teman-teman semuanya membantu saya.'],
    ['现在我把每天的事都写在日记里。', 'Xiàn zài wǒ bǎ měi tiān de shì dōu xiě zài rì jì lǐ.', 'Sekarang saya menuliskan kegiatan setiap hari di buku harian.'],
  ]],
];
