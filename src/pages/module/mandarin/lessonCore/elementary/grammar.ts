import type { LessonCoreTuple } from '../types';

// Grammar HSK 2 — one entry per lesson (index = lesson - 1).
export const grammar: LessonCoreTuple[] = [
  ['Time sequence: 每天 + time + verb', ['Urutan HSK 2: subjek + kata waktu (每天/早上/七点) + kata kerja.', 'Hubungkan kegiatan berurutan dengan 然后 atau 以后.'], [
    ['我每天早上六点半起床。', 'Wǒ měi tiān zǎo shàng liù diǎn bàn qǐ chuáng.', 'Setiap pagi saya bangun jam setengah tujuh.'],
    ['起床以后，我先洗脸。', 'Qǐ chuáng yǐ hòu, wǒ xiān xǐ liǎn.', 'Setelah bangun, saya cuci muka dulu.'],
    ['她七点吃早饭，然后去公司。', 'Tā qī diǎn chī zǎo fàn, rán hòu qù gōng sī.', 'Dia sarapan jam tujuh, lalu pergi ke kantor.'],
    ['我们每天晚上十一点睡觉。', 'Wǒ men měi tiān wǎn shàng shí yī diǎn shuì jiào.', 'Kami tidur setiap malam jam sebelas.'],
  ]],
  ['Asking availability: 有空吗 / 什么时候', ['有空 = ada waktu luang. Pertanyaan: 你 + waktu + 有空吗？', '什么时候 menanyakan kapan; letaknya sebelum kata kerja.'], [
    ['你星期六有空吗？', 'Nǐ xīng qī liù yǒu kòng ma?', 'Kamu ada waktu luang hari Sabtu?'],
    ['我们什么时候见面？', 'Wǒ men shén me shí hòu jiàn miàn?', 'Kapan kita bertemu?'],
    ['下午我没有空，晚上可以。', 'Xià wǔ wǒ méi yǒu kòng, wǎn shàng kě yǐ.', 'Siang saya tidak ada waktu, malam bisa.'],
    ['你什么时候方便？', 'Nǐ shén me shí hòu fāng biàn?', 'Kapan kamu senggang?'],
  ]],
  ['Adverbs 也 and 都', ['也 (juga) dan 都 (semua) adalah adverbia: letakkan sebelum kata kerja, bukan sebelum subjek.', 'Jika dipakai bersama, urutannya 也都: 他们也都来了.'], [
    ['我哥哥也是医生。', 'Wǒ gē ge yě shì yī shēng.', 'Kakak laki-laki saya juga dokter.'],
    ['我们家的人都喜欢吃鱼。', 'Wǒ men jiā de rén dōu xǐ huan chī yú.', 'Orang di keluarga kami semuanya suka makan ikan.'],
    ['我姐姐和妹妹都在上海。', 'Wǒ jiě jie hé mèi mei dōu zài shàng hǎi.', 'Kakak dan adik perempuan saya sama-sama di Shanghai.'],
    ['他们也都认识王老师。', 'Tā men yě dōu rèn shi wáng lǎo shī.', 'Mereka juga semuanya kenal Guru Wang.'],
  ]],
  ['Requests with 给 + person + object', ['给 + orang + benda = memberi sesuatu kepada seseorang.', '请给我... adalah pola sopan saat memesan atau meminta.'], [
    ['请给我们两碗米饭。', 'Qǐng gěi wǒ men liǎng wǎn mǐ fàn.', 'Tolong beri kami dua mangkuk nasi.'],
    ['服务员，给我一双筷子。', 'Fú wù yuán, gěi wǒ yì shuāng kuài zi.', 'Pelayan, beri saya sepasang sumpit.'],
    ['我给你介绍一下这个菜。', 'Wǒ gěi nǐ jiè shào yí xià zhè ge cài.', 'Saya perkenalkan hidangan ini untukmu.'],
    ['妈妈给我做了一个蛋糕。', 'Mā ma gěi wǒ zuò le yí gè dàn gāo.', 'Ibu membuatkan saya sebuah kue.'],
  ]],
  ['Degree with 太…了 and 有点儿', ['太 + sifat + 了 = terlalu/sangat (sering bernada mengeluh atau kagum).', '有点儿 + sifat = agak (biasanya untuk hal yang kurang menyenangkan).'], [
    ['这双鞋太贵了。', 'Zhè shuāng xié tài guì le.', 'Sepatu ini terlalu mahal.'],
    ['这件衣服有点儿大。', 'Zhè jiàn yī fu yǒu diǎnr dà.', 'Baju ini agak besar.'],
    ['今天的西瓜太甜了！', 'Jīn tiān de xī guā tài tián le!', 'Semangka hari ini manis sekali!'],
    ['这个颜色有点儿不好看。', 'Zhè ge yán sè yǒu diǎnr bù hǎo kàn.', 'Warna ini agak kurang bagus.'],
  ]],
  ['Cause and result 因为…所以…', ['因为 memperkenalkan sebab, 所以 memperkenalkan akibat; keduanya boleh dipakai bersamaan.', 'Pertanyaan alasan: 为什么...？ — jawab dengan 因为....'], [
    ['因为下雨，所以我们不去公园了。', 'Yīn wèi xià yǔ, suǒ yǐ wǒ men bú qù gōng yuán le.', 'Karena hujan, jadi kami tidak jadi ke taman.'],
    ['你为什么不吃饭？', 'Nǐ wèi shén me bù chī fàn?', 'Kenapa kamu tidak makan?'],
    ['因为我不饿。', 'Yīn wèi wǒ bú è.', 'Karena saya tidak lapar.'],
    ['他生病了，所以没来上课。', 'Tā shēng bìng le, suǒ yǐ méi lái shàng kè.', 'Dia sakit, jadi tidak masuk kelas.'],
  ]],
  ['Completed action 了 (and 没 negation)', ['Kata kerja + 了 = tindakan sudah selesai.', 'Negasinya 没 + kata kerja, tanpa 了: 我没去.'], [
    ['我昨天买了一件新衣服。', 'Wǒ zuó tiān mǎi le yí jiàn xīn yī fu.', 'Kemarin saya membeli sebuah baju baru.'],
    ['他没去上班。', 'Tā méi qù shàng bān.', 'Dia tidak masuk kerja.'],
    ['你吃了早饭没有？', 'Nǐ chī le zǎo fàn méi yǒu?', 'Kamu sudah sarapan belum?'],
    ['我们看了两个小时电视。', 'Wǒ men kàn le liǎng gè xiǎo shí diàn shì.', 'Kami menonton televisi selama dua jam.'],
  ]],
  ['Experience 过 vs 了', ['Kata kerja + 过 = pernah mengalami; kata kerja + 了 = sudah terjadi (sekali).', 'Negasi pengalaman: 没 + kata kerja + 过.'], [
    ['我去过上海两次。', 'Wǒ qù guò shàng hǎi liǎng cì.', 'Saya pernah ke Shanghai dua kali.'],
    ['我没吃过北京烤鸭。', 'Wǒ méi chī guò běi jīng kǎo yā.', 'Saya belum pernah makan bebek panggang Beijing.'],
    ['你学过日语吗？', 'Nǐ xué guò rì yǔ ma?', 'Kamu pernah belajar bahasa Jepang?'],
    ['她以前在这儿工作过。', 'Tā yǐ qián zài zhè ér gōng zuò guò.', 'Dulu dia pernah bekerja di sini.'],
  ]],
  ['Asking the way: 怎么 + verb', ['怎么 + kata kerja = bagaimana cara...: 怎么走, 怎么去.', 'Arah: 往 + 前/左/右 + 走.'], [
    ['请问，火车站怎么走？', 'Qǐng wèn, huǒ chē zhàn zěn me zǒu?', 'Permisi, ke stasiun kereta lewat mana?'],
    ['一直往前走。', 'Yì zhí wǎng qián zǒu.', 'Jalan lurus terus ke depan.'],
    ['到路口往右拐。', 'Dào lù kǒu wǎng yòu guǎi.', 'Sampai persimpangan belok kanan.'],
    ['去机场怎么去最快？', 'Qù jī chǎng zěn me qù zuì kuài?', 'Ke bandara bagaimana caranya paling cepat?'],
  ]],
  ['Means of transport: 坐/骑 + vehicle + 去', ['坐 untuk kendaraan yang diduduki penumpang (bus, kereta, pesawat); 骑 untuk yang ditunggangi (sepeda, motor).', 'Urutan: subjek + 坐/骑 + kendaraan + 去 + tempat.'], [
    ['我每天坐地铁去公司。', 'Wǒ měi tiān zuò dì tiě qù gōng sī.', 'Setiap hari saya naik kereta bawah tanah ke kantor.'],
    ['他骑自行车去学校。', 'Tā qí zì xíng chē qù xué xiào.', 'Dia naik sepeda ke sekolah.'],
    ['我们坐飞机去广州。', 'Wǒ men zuò fēi jī qù guǎng zhōu.', 'Kami naik pesawat ke Guangzhou.'],
    ['从这儿到那儿要四十分钟。', 'Cóng zhè ér dào nàr yào sì shí fēn zhōng.', 'Dari sini ke sana butuh empat puluh menit.'],
  ]],
  ['Plans and predictions: 要 / 会', ['要 + kata kerja = akan (rencana dekat).', '会 + kata kerja = akan/mungkin (perkiraan): 明天会下雨.'], [
    ['明天会下雨吗？', 'Míng tiān huì xià yǔ ma?', 'Apakah besok akan hujan?'],
    ['天气预报说明天会很冷。', 'Tiān qì yù bào shuō míng tiān huì hěn lěng.', 'Prakiraan cuaca bilang besok akan sangat dingin.'],
    ['周末我要去爬山。', 'Zhōu mò wǒ yào qù pá shān.', 'Akhir pekan saya akan pergi mendaki gunung.'],
    ['如果天晴，我们就去海边。', 'Rú guǒ tiān qíng, wǒ men jiù qù hǎi biān.', 'Kalau cerah, kami akan pergi ke pantai.'],
  ]],
  ['Frequency words: 常常 / 有时候 / 每…', ['常常 (sering), 有时候 (kadang-kadang), 每 + satuan waktu (setiap...).', 'Kata frekuensi diletakkan setelah subjek, sebelum kata kerja.'], [
    ['我常常去游泳。', 'Wǒ cháng cháng qù yóu yǒng.', 'Saya sering pergi berenang.'],
    ['他有时候去跑步。', 'Tā yǒu shí hòu qù pǎo bù.', 'Dia kadang-kadang pergi jogging.'],
    ['我每个星期踢两次足球。', 'Wǒ měi gè xīng qī tī liǎng cì zú qiú.', 'Saya bermain sepak bola dua kali seminggu.'],
    ['她每天都唱歌。', 'Tā měi tiān dōu chàng gē.', 'Dia bernyanyi setiap hari.'],
  ]],
  ['Change of state with 了', ['了 di akhir kalimat menandai perubahan keadaan: 我病了 (saya jadi sakit).', '不…了 = sudah tidak... lagi: 不疼了.'], [
    ['我感冒了。', 'Wǒ gǎn mào le.', 'Saya kena flu.'],
    ['吃了药以后，头不疼了。', 'Chī le yào yǐ hòu, tóu bù téng le.', 'Setelah minum obat, kepala sudah tidak sakit.'],
    ['他的身体好多了。', 'Tā de shēn tǐ hǎo duō le.', 'Badannya sudah jauh lebih baik.'],
    ['天黑了，我们回家吧。', 'Tiān hēi le, wǒ men huí jiā ba.', 'Hari sudah gelap, ayo kita pulang.'],
  ]],
  ['Comparison: 比 / 没有…那么', ['A + 比 + B + sifat: A lebih ... dari B. Jangan pakai 很 di sini.', 'A + 没有 + B + (那么) + sifat: A tidak se... B.'], [
    ['这个手机比那个便宜。', 'Zhè ge shǒu jī bǐ nà ge pián yi.', 'Ponsel ini lebih murah daripada yang itu.'],
    ['弟弟比我高一点儿。', 'Dì di bǐ wǒ gāo yì diǎnr.', 'Adik laki-laki saya sedikit lebih tinggi dari saya.'],
    ['今天没有昨天那么热。', 'Jīn tiān méi yǒu zuó tiān nà me rè.', 'Hari ini tidak sepanas kemarin.'],
    ['坐地铁比坐出租车快多了。', 'Zuò dì tiě bǐ zuò chū zū chē kuài duō le.', 'Naik kereta bawah tanah jauh lebih cepat daripada naik taksi.'],
  ]],
  ['Degree complement 得', ['Kata kerja + 得 + penilaian: 说得很好 (berbicara dengan baik).', 'Jika ada objek, ulangi kata kerja: 他说汉语说得很好.'], [
    ['她跳舞跳得很好。', 'Tā tiào wǔ tiào de hěn hǎo.', 'Dia menari dengan sangat baik.'],
    ['你写字写得真漂亮！', 'Nǐ xiě zì xiě de zhēn piào liang!', 'Tulisanmu indah sekali!'],
    ['他跑得不快。', 'Tā pǎo de bú kuài.', 'Dia berlari tidak cepat.'],
    ['我妈妈做菜做得非常好吃。', 'Wǒ mā ma zuò cài zuò de fēi cháng hǎo chī.', 'Masakan ibu saya sangat enak.'],
  ]],
  ['Progressive 正在…呢', ['正在 + kata kerja (+ 呢) = sedang melakukan.', 'Negasi: 没在 + kata kerja: 我没在睡觉.'], [
    ['我正在做作业呢。', 'Wǒ zhèng zài zuò zuò yè ne.', 'Saya sedang mengerjakan PR.'],
    ['妈妈正在打电话。', 'Mā ma zhèng zài dǎ diàn huà.', 'Ibu sedang menelepon.'],
    ['他们在开会呢。', 'Tā men zài kāi huì ne.', 'Mereka sedang rapat.'],
    ['我没在睡觉，我在看书。', 'Wǒ méi zài shuì jiào, wǒ zài kàn shū.', 'Saya tidak sedang tidur, saya sedang membaca.'],
  ]],
  ['Near future: 快…了 / 就要…了', ['快 + kata kerja/kata sifat + 了 = hampir/segera.', '就要…了 bisa dipakai dengan kata waktu: 明天就要考试了.'], [
    ['火车快开了。', 'Huǒ chē kuài kāi le.', 'Kereta sebentar lagi berangkat.'],
    ['我快到了，等我一下。', 'Wǒ kuài dào le, děng wǒ yí xià.', 'Saya hampir sampai, tunggu saya sebentar.'],
    ['下个星期就要放假了。', 'Xià gè xīng qī jiù yào fàng jià le.', 'Minggu depan sudah mulai libur.'],
    ['电影快开始了，我们进去吧。', 'Diàn yǐng kuài kāi shǐ le, wǒ men jìn qù ba.', 'Filmnya hampir mulai, ayo kita masuk.'],
  ]],
  ['Question forms review: 吗 / 呢 / A不A / 吧', ['吗 = ya/tidak netral; A不A = ya/tidak dengan pilihan; 吧 = menduga/minta konfirmasi.', '呢 = "bagaimana dengan...?" setelah kata benda.'], [
    ['你是新来的同学吧？', 'Nǐ shì xīn lái de tóng xué ba?', 'Kamu teman sekelas yang baru, kan?'],
    ['你觉得难不难？', 'Nǐ jué de nán bu nán?', 'Menurutmu sulit atau tidak?'],
    ['我喝咖啡，你呢？', 'Wǒ hē kā fēi, nǐ ne?', 'Saya minum kopi, kamu?'],
    ['你的作业做完了吗？', 'Nǐ de zuò yè zuò wán le ma?', 'PR-mu sudah selesai?'],
  ]],
  ['Duration: verb + 了 + time', ['Durasi diletakkan setelah kata kerja: 玩了三天 (bermain tiga hari).', 'Jika ada objek: kata kerja + 了 + durasi + (的) + objek, atau ulang kata kerja.'], [
    ['我们在海南玩了五天。', 'Wǒ men zài hǎi nán wán le wǔ tiān.', 'Kami berlibur di Hainan selama lima hari.'],
    ['他等了你半个小时。', 'Tā děng le nǐ bàn gè xiǎo shí.', 'Dia menunggumu setengah jam.'],
    ['我学了一年汉语。', 'Wǒ xué le yì nián hàn yǔ.', 'Saya belajar bahasa Mandarin selama setahun.'],
    ['坐火车坐了八个小时。', 'Zuò huǒ chē zuò le bā gè xiǎo shí.', 'Naik kereta selama delapan jam.'],
  ]],
  ['HSK 2 grammar portfolio', ['Portfolio HSK 2: gunakan 了, 过, 正在, 比, 得, 因为…所以… dalam satu cerita.', 'Periksa: negasi 了 memakai 没, perbandingan 比 tanpa 很.'], [
    ['去年我去过西安，玩得很开心。', 'Qù nián wǒ qù guò xī ān, wán de hěn kāi xīn.', 'Tahun lalu saya pernah ke Xi\'an, bermain dengan sangat senang.'],
    ['因为天气好，所以我们每天出去。', 'Yīn wèi tiān qì hǎo, suǒ yǐ wǒ men měi tiān chū qù.', 'Karena cuacanya bagus, kami keluar setiap hari.'],
    ['西安比我想的大多了。', 'Xī ān bǐ wǒ xiǎng de dà duō le.', 'Xi\'an jauh lebih besar dari yang saya bayangkan.'],
    ['现在我正在准备下一次旅行。', 'Xiàn zài wǒ zhèng zài zhǔn bèi xià yí cì lǚ xíng.', 'Sekarang saya sedang mempersiapkan perjalanan berikutnya.'],
  ]],
];
