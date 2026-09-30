import type { LessonCoreTuple } from '../types';

// Reading HSK 1 — one entry per lesson (index = lesson - 1). Titles come from the topic list.
export const reading: LessonCoreTuple[] = [
  [null, ['Baca pinyin per suku kata: inisial + final + tanda nada di atas vokal.', 'Tanda nada ditulis di atas a/e bila ada; pada ou di atas o; pada iu/ui di vokal terakhir.'], [
    ['爸爸', 'bà ba', 'ayah'],
    ['喝水', 'hē shuǐ', 'minum air'],
    ['你好吗？', 'Nǐ hǎo ma?', 'Apa kabar?'],
    ['很忙', 'hěn máng', 'sangat sibuk'],
  ]],
  [null, ['Cocokkan Hanzi dengan pinyin: satu Hanzi = satu suku kata.', 'Hitung jumlah Hanzi dan jumlah suku kata pinyin, harus sama.'], [
    ['中文', 'zhōng wén', 'bahasa Mandarin'],
    ['学生', 'xué shēng', 'murid'],
    ['朋友', 'péng yǒu', 'teman'],
    ['老师好', 'lǎo shī hǎo', 'halo, Guru'],
  ]],
  [null, ['你好 = 你 (kamu) + 好 (baik): salam "semoga kamu baik".', '再见 = 再 (lagi) + 见 (bertemu): "bertemu lagi".'], [
    ['你好，老师！', 'Nǐ hǎo, lǎo shī!', 'Halo, Guru!'],
    ['再见，朋友们！', 'Zài jiàn, péng yǒu men!', 'Sampai jumpa, teman-teman!'],
    ['我对他说你好。', 'Wǒ duì tā shuō nǐ hǎo.', 'Saya menyapanya dengan "halo".'],
    ['我们下午见。', 'Wǒ men xià wǔ jiàn.', 'Sampai jumpa nanti siang.'],
  ]],
  [null, ['Kata ganti: 我 (saya), 你 (kamu), 他 (dia laki-laki), 她 (dia perempuan), 它 (benda/hewan).', 'Bedakan 他 dan 她 dari radikal kiri: 亻 (orang) vs 女 (perempuan).'], [
    ['他是我哥哥。', 'Tā shì wǒ gē ge.', 'Dia kakak laki-laki saya.'],
    ['她是你妹妹。', 'Tā shì nǐ mèi mei.', 'Dia adik perempuanmu.'],
    ['它是我的猫。', 'Tā shì wǒ de māo.', 'Itu kucing saya.'],
    ['你们是好朋友。', 'Nǐ men shì hǎo péng yǒu.', 'Kalian teman baik.'],
  ]],
  [null, ['是 menyamakan dua hal; 不是 menyangkalnya.', 'Baca sampai akhir kalimat: 不 dapat membalik seluruh makna.'], [
    ['这不是我的包。', 'Zhè bú shì wǒ de bāo.', 'Ini bukan tas saya.'],
    ['我妈妈不是老师。', 'Wǒ mā ma bú shì lǎo shī.', 'Ibu saya bukan guru.'],
    ['那是一本中文书。', 'Nà shì yì běn zhōng wén shū.', 'Itu sebuah buku Mandarin.'],
    ['他是我的中文老师。', 'Tā shì wǒ de zhōng wén lǎo shī.', 'Dia guru Mandarin saya.'],
  ]],
  [null, ['Angka Hanzi 一 sampai 十; 11–19 = 十 + angka; 20 = 二十.', 'Tanggal: 月 (bulan) dan 号 (tanggal).'], [
    ['三月八号', 'sān yuè bā hào', 'tanggal 8 Maret'],
    ['十二个人', 'shí\'èr gèrén', 'dua belas orang'],
    ['二十岁', 'èr shí suì', 'dua puluh tahun'],
    ['九十九块', 'jiǔ shí jiǔ kuài', 'sembilan puluh sembilan yuan'],
  ]],
  [null, ['Hanzi keluarga sering berulang: 爸爸, 妈妈, 哥哥, 姐姐.', 'Radikal 女 muncul di banyak kata keluarga perempuan: 妈, 姐, 妹.'], [
    ['我爸爸和我妈妈', 'wǒ bà ba hé wǒ mā ma', 'ayah dan ibu saya'],
    ['姐姐的女儿', 'jiějie de nǚ\'ér', 'anak perempuan kakak perempuan'],
    ['我有两个弟弟。', 'Wǒ yǒu liǎng gè dì di.', 'Saya punya dua adik laki-laki.'],
    ['他们是我的家人。', 'Tā men shì wǒ de jiā rén.', 'Mereka keluarga saya.'],
  ]],
  [null, ['Kata makanan: 米饭, 面条, 菜, 水果, 苹果. Kata minuman: 茶, 水, 咖啡.', 'Radikal 饣 (makanan) muncul pada 饭, 馆.'], [
    ['米饭和菜', 'mǐ fàn hé cài', 'nasi dan lauk'],
    ['我中午吃面条。', 'Wǒ zhōng wǔ chī miàn tiáo.', 'Siang ini saya makan mi.'],
    ['她喜欢吃水果。', 'Tā xǐ huan chī shuǐ guǒ.', 'Dia suka makan buah.'],
    ['这个饭馆的茶很好喝。', 'Zhè ge fàn guǎn de chá hěn hǎo hē.', 'Teh di restoran ini enak.'],
  ]],
  [null, ['今天 (hari ini), 明天 (besok), 昨天 (kemarin) — semua memakai 天.', 'Hari dalam minggu: 星期 + angka; Minggu = 星期天/星期日.'], [
    ['明天星期六。', 'Míng tiān xīng qī liù.', 'Besok hari Sabtu.'],
    ['昨天星期天。', 'Zuó tiān xīng qī tiān.', 'Kemarin hari Minggu.'],
    ['今天是我的生日。', 'Jīn tiān shì wǒ de shēng rì.', 'Hari ini ulang tahun saya.'],
    ['明天你在家吗？', 'Míng tiān nǐ zài jiā ma?', 'Besok kamu di rumah?'],
  ]],
  [null, ['Kalimat yang diakhiri 吗 dan tanda ？ adalah pertanyaan ya/tidak.', 'Baca kalimatnya dulu sebagai pernyataan, lalu jadikan pertanyaan.'], [
    ['你是医生吗？', 'Nǐ shì yī shēng ma?', 'Apakah kamu dokter?'],
    ['你喜欢北京吗？', 'Nǐ xǐ huan běi jīng ma?', 'Apakah kamu suka Beijing?'],
    ['她今天来吗？', 'Tā jīn tiān lái ma?', 'Apakah dia datang hari ini?'],
    ['这是你的车吗？', 'Zhè shì nǐ de chē ma?', 'Apakah ini mobilmu?'],
  ]],
  [null, ['Kartu nama memuat: 姓名 (nama), 电话 (telepon), 公司/学校.', 'Cari kata kunci di depan tanda titik dua.'], [
    ['姓名：李明', 'xìng míng: lǐ míng', 'Nama: Li Ming'],
    ['学校：北京大学', 'xué xiào: běi jīng dà xué', 'Sekolah: Universitas Peking'],
    ['电话：一三六', 'diàn huà: yī sān liù', 'Telepon: satu-tiga-enam'],
    ['工作：老师', 'gōng zuò: lǎo shī', 'Pekerjaan: guru'],
  ]],
  [null, ['Tanda di kelas/sekolah pendek dan langsung: 请..., 不要....', 'Kenali 出口 (keluar), 入口 (masuk), 洗手间 (toilet).'], [
    ['请安静', 'qǐng ān jìng', 'Harap tenang'],
    ['出口', 'chū kǒu', 'Pintu keluar'],
    ['请不要吃东西', 'qǐng bú yào chī dōng xi', 'Harap tidak makan'],
    ['洗手间在左边', 'xǐ shǒu jiān zài zuǒ biān', 'Toilet di sebelah kiri'],
  ]],
  [null, ['SMS singkat berisi waktu, tempat, dan ajakan.', 'Cari kata waktu (点, 明天) dan tempat (在...).'], [
    ['明天下午三点见。', 'Míng tiān xià wǔ sān diǎn jiàn.', 'Sampai jumpa besok jam tiga siang.'],
    ['我在商店前面。', 'Wǒ zài shāng diàn qián miàn.', 'Saya di depan toko.'],
    ['你到了吗？', 'Nǐ dào le ma?', 'Kamu sudah sampai?'],
    ['我马上到。', 'Wǒ mǎ shàng dào.', 'Saya segera sampai.'],
  ]],
  [null, ['Menu: nama makanan + harga (块/元).', '元 adalah tulisan resmi untuk yuan; 块 dipakai lisan.'], [
    ['米饭：两元', 'mǐ fàn: liǎng yuán', 'Nasi: dua yuan'],
    ['面条：十二元', 'miàn tiáo: shí èr yuán', 'Mi: dua belas yuan'],
    ['茶：五元一杯', 'chá: wǔ yuán yì bēi', 'Teh: lima yuan per gelas'],
    ['今天的菜很便宜。', 'Jīn tiān de cài hěn pián yi.', 'Hidangan hari ini murah.'],
  ]],
  [null, ['Harga tertulis dengan angka + 元 atau 块.', 'Bandingkan harga dua barang untuk memilih yang lebih murah.'], [
    ['一个杯子八块。', 'Yí gè bēi zi bā kuài.', 'Satu gelas delapan yuan.'],
    ['这本书三十块钱。', 'Zhè běn shū sān shí kuài qián.', 'Buku ini tiga puluh yuan.'],
    ['那件衣服很贵。', 'Nà jiàn yī fu hěn guì.', 'Baju itu mahal.'],
    ['苹果一块钱一个。', 'Píng guǒ yí kuài qián yí gè.', 'Apel satu yuan per buah.'],
  ]],
  [null, ['Kalimat lokasi: siapa/apa + 在 + tempat.', 'Kata lokasi setelah tempat menunjukkan posisi tepat.'], [
    ['我的家在医院旁边。', 'Wǒ de jiā zài yī yuàn páng biān.', 'Rumah saya di samping rumah sakit.'],
    ['老师在学校里。', 'Lǎo shī zài xué xiào lǐ.', 'Guru ada di dalam sekolah.'],
    ['他们在饭馆吃饭。', 'Tā men zài fàn guǎn chī fàn.', 'Mereka makan di restoran.'],
    ['电脑在桌子上面。', 'Diàn nǎo zài zhuō zi shàng miàn.', 'Komputer ada di atas meja.'],
  ]],
  [null, ['Profil tiga kalimat: nama, asal/umur, dan pekerjaan/hobi.', 'Garis bawahi satu fakta dari setiap kalimat.'], [
    ['她叫王芳，今年二十岁。', 'Tā jiào wáng fāng, jīn nián èr shí suì.', 'Namanya Wang Fang, tahun ini dua puluh tahun.'],
    ['她是北京大学的学生。', 'Tā shì běi jīng dà xué de xué shēng.', 'Dia mahasiswa Universitas Peking.'],
    ['她很喜欢看电影。', 'Tā hěn xǐ huan kàn diàn yǐng.', 'Dia sangat suka menonton film.'],
    ['她家有五口人。', 'Tā jiā yǒu wǔ kǒu rén.', 'Keluarganya ada lima orang.'],
  ]],
  [null, ['Undangan sederhana: acara, waktu, tempat, dan ajakan.', 'Ajakan sering memakai 来...吧 atau 请你来....'], [
    ['请你来我家吃饭。', 'Qǐng nǐ lái wǒ jiā chī fàn.', 'Silakan datang makan di rumah saya.'],
    ['星期六晚上六点。', 'Xīng qī liù wǎn shàng liù diǎn.', 'Sabtu malam jam enam.'],
    ['我们一起看电影吧。', 'Wǒ men yì qǐ kàn diàn yǐng ba.', 'Ayo kita menonton film bersama.'],
    ['我等你。', 'Wǒ děng nǐ.', 'Saya menunggumu.'],
  ]],
  [null, ['Dialog tertulis: A dan B bergantian; baca tanda tanya untuk menemukan pertanyaan.', 'Setiap jawaban biasanya mengulang kata kerja pertanyaan.'], [
    ['A：你去哪儿？', 'A: nǐ qù nǎr?', 'A: Kamu pergi ke mana?'],
    ['B：我去商店。', 'B: wǒ qù shāng diàn.', 'B: Saya pergi ke toko.'],
    ['A：你买什么？', 'A: nǐ mǎi shén me?', 'A: Kamu membeli apa?'],
    ['B：我买水果。', 'B: wǒ mǎi shuǐ guǒ.', 'B: Saya membeli buah.'],
  ]],
  [null, ['Review membaca HSK 1: pinyin, Hanzi dasar, angka, tanda, SMS, menu, dan profil.', 'Baca keras-keras, lalu jawab: siapa, apa, kapan, di mana.'], [
    ['我叫小明，我是中国人。', 'Wǒ jiào xiǎo míng, wǒ shì zhōng guó rén.', 'Nama saya Xiaoming, saya orang Tiongkok.'],
    ['我家在上海。', 'Wǒ jiā zài shàng hǎi.', 'Rumah saya di Shanghai.'],
    ['我每天六点起来。', 'Wǒ měi tiān liù diǎn qǐ lái.', 'Setiap hari saya bangun jam enam.'],
    ['这是我的学校。', 'Zhè shì wǒ de xué xiào.', 'Ini sekolah saya.'],
  ]],
];
