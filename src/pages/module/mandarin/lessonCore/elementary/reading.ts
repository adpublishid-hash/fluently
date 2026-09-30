import type { LessonCoreTuple } from '../types';

// Reading HSK 2 — one entry per lesson (index = lesson - 1).
export const reading: LessonCoreTuple[] = [
  ['Reading a daily timetable', ['Jadwal ditulis dengan jam di kiri dan kegiatan di kanan.', 'Cari kata 上午/下午/晚上 untuk membedakan pagi dan malam.'], [
    ['上午八点：语法课', 'shàng wǔ bā diǎn: yǔ fǎ kè', 'Jam 8 pagi: kelas tata bahasa'],
    ['中午十二点：午饭', 'zhōng wǔ shí èr diǎn: wǔ fàn', 'Jam 12 siang: makan siang'],
    ['下午两点到四点：口语课', 'xià wǔ liǎng diǎn dào sì diǎn: kǒu yǔ kè', 'Jam 2 sampai 4 sore: kelas percakapan'],
    ['晚上七点：自习', 'wǎn shàng qī diǎn: zì xí', 'Jam 7 malam: belajar mandiri'],
  ]],
  ['Reading an appointment message', ['Pesan janji memuat tanggal, jam, tempat, dan pertanyaan konfirmasi.', 'Tanda ？ di akhir berarti pengirim menunggu jawaban.'], [
    ['小李，星期五晚上你有空吗？', 'Xiǎo lǐ, xīng qī wǔ wǎn shàng nǐ yǒu kòng ma?', 'Xiao Li, Jumat malam kamu ada waktu?'],
    ['我想请你看电影。', 'Wǒ xiǎng qǐng nǐ kàn diàn yǐng.', 'Saya ingin mengajakmu menonton film.'],
    ['电影七点半开始。', 'Diàn yǐng qī diǎn bàn kāi shǐ.', 'Filmnya mulai jam setengah delapan.'],
    ['我们七点在电影院门口见，好吗？', 'Wǒ men qī diǎn zài diàn yǐng yuàn mén kǒu jiàn, hǎo ma?', 'Kita bertemu jam tujuh di depan bioskop, ya?'],
  ]],
  ['Family blog post', ['Blog keluarga: identifikasi setiap anggota dan satu fakta tentangnya.', 'Kata 都 dan 也 menunjukkan kesamaan antaranggota.'], [
    ['我家有四口人，我们都住在杭州。', 'Wǒ jiā yǒu sì kǒu rén, wǒ men dōu zhù zài háng zhōu.', 'Keluarga saya empat orang, kami semua tinggal di Hangzhou.'],
    ['我爸爸是大学老师。', 'Wǒ bà ba shì dà xué lǎo shī.', 'Ayah saya dosen.'],
    ['我妈妈在一家医院上班。', 'Wǒ mā ma zài yì jiā yī yuàn shàng bān.', 'Ibu saya bekerja di sebuah rumah sakit.'],
    ['我和弟弟都是中学生。', 'Wǒ hé dì di dōu shì zhōng xué shēng.', 'Saya dan adik laki-laki sama-sama pelajar SMP/SMA.'],
  ]],
  ['Reading a restaurant menu', ['Menu dikelompokkan: 凉菜 (hidangan dingin), 热菜 (hidangan panas), 汤, 主食, 饮料.', 'Harga ditulis dengan 元 atau ￥.'], [
    ['热菜：宫保鸡丁 三十二元', 'rè cài: gōng bǎo jī dīng sān shí èr yuán', 'Hidangan panas: ayam kungpao 32 yuan'],
    ['汤：西红柿鸡蛋汤 十八元', 'tāng: xī hóng shì jī dàn tāng shí bā yuán', 'Sup: sup tomat telur 18 yuan'],
    ['主食：米饭 两元一碗', 'zhǔ shí: mǐ fàn liǎng yuán yì wǎn', 'Makanan pokok: nasi 2 yuan per mangkuk'],
    ['饮料：果汁 十元一杯', 'yǐn liào: guǒ zhī shí yuán yì bēi', 'Minuman: jus 10 yuan per gelas'],
  ]],
  ['Sale poster', ['Poster diskon: 打八折 = diskon 20% (bayar 80%), 买一送一 = beli satu gratis satu.', 'Cari tanggal berlaku: 到…为止.'], [
    ['全场打八折！', 'Quán chǎng dǎ bā zhé!', 'Semua barang diskon 20%!'],
    ['买一送一，只有今天。', 'Mǎi yí sòng yī, zhǐ yǒu jīn tiān.', 'Beli satu gratis satu, hanya hari ini.'],
    ['衣服一百元两件。', 'Yī fu yì bǎi yuán liǎng jiàn.', 'Baju seratus yuan dua potong.'],
    ['活动到本月三十号为止。', 'Huó dòng dào běn yuè sān shí hào wéi zhǐ.', 'Promo berlaku sampai tanggal 30 bulan ini.'],
  ]],
  ['Reading reasons in a note', ['Catatan izin memuat alasan dengan 因为 dan permintaan maaf.', 'Temukan: siapa menulis, untuk siapa, alasannya apa.'], [
    ['王老师：因为我发烧了，今天不能去上课。', 'Wáng lǎo shī: yīn wèi wǒ fā shāo le, jīn tiān bù néng qù shàng kè.', 'Guru Wang: karena saya demam, hari ini tidak bisa masuk kelas.'],
    ['所以我想请假一天。', 'Suǒ yǐ wǒ xiǎng qǐng jià yì tiān.', 'Jadi saya ingin izin satu hari.'],
    ['作业我明天交给您。', 'Zuò yè wǒ míng tiān jiāo gěi nín.', 'PR-nya akan saya serahkan kepada Anda besok.'],
    ['学生：张明', 'xué shēng: zhāng míng', 'Murid: Zhang Ming'],
  ]],
  ['Short diary about yesterday', ['Buku harian memakai 了 untuk kejadian dan kalimat perasaan di akhir.', 'Tanggal dan cuaca biasanya di baris pertama.'], [
    ['五月十二日，星期二，晴。', 'Wǔ yuè shí èr rì, xīng qī èr, qíng.', 'Selasa 12 Mei, cerah.'],
    ['今天我和同学去了动物园。', 'Jīn tiān wǒ hé tóng xué qù le dòng wù yuán.', 'Hari ini saya dan teman sekelas pergi ke kebun binatang.'],
    ['我们看了熊猫，它们很可爱。', 'Wǒ men kàn le xióng māo, tā men hěn kě ài.', 'Kami melihat panda, mereka lucu sekali.'],
    ['今天我很累，但是很快乐。', 'Jīn tiān wǒ hěn lèi, dàn shì hěn kuài lè.', 'Hari ini saya capek, tetapi sangat gembira.'],
  ]],
  ['Travel experience post', ['Unggahan perjalanan: tempat, kegiatan, makanan, kesan.', 'Kata 过 menandai pengalaman yang dibagikan.'], [
    ['我第一次来到哈尔滨。', 'Wǒ dì yī cì lái dào hā ěr bīn.', 'Pertama kali saya datang ke Harbin.'],
    ['这里的冬天冷得让人不想出门。', 'Zhè lǐ de dōng tiān lěng de ràng rén bù xiǎng chū mén.', 'Musim dingin di sini begitu dingin sampai orang tidak ingin keluar.'],
    ['我看过很多冰雪的照片，但是真的更美。', 'Wǒ kàn guò hěn duō bīng xuě de zhào piàn, dàn shì zhēn de gèng měi.', 'Saya pernah melihat banyak foto es dan salju, tetapi aslinya lebih indah.'],
    ['下次我还想再来。', 'Xià cì wǒ hái xiǎng zài lái.', 'Lain kali saya masih ingin datang lagi.'],
  ]],
  ['Map and direction note', ['Catatan arah memakai 东/南/西/北 dan patokan (银行, 超市).', 'Baca berurutan dan tandai patokan di peta.'], [
    ['从学校出来往东走。', 'Cóng xué xiào chū lái wǎng dōng zǒu.', 'Keluar dari sekolah, jalan ke timur.'],
    ['超市在第二个路口的南边。', 'Chāo shì zài dì èr gè lù kǒu de nán biān.', 'Supermarket ada di sebelah selatan persimpangan kedua.'],
    ['我家就在超市后面。', 'Wǒ jiā jiù zài chāo shì hòu miàn.', 'Rumah saya persis di belakang supermarket.'],
    ['到了楼下给我发个信息。', 'Dào le lóu xià gěi wǒ fā gè xìn xī.', 'Setelah sampai di bawah, kirimi saya pesan.'],
  ]],
  ['Bus timetable', ['Jadwal bus: 首班车 (bus pertama), 末班车 (bus terakhir), 每…分钟一班.', 'Hitung waktu tunggu dari interval bus.'], [
    ['首班车早上五点半发车。', 'Shǒu bān chē zǎo shàng wǔ diǎn bàn fā chē.', 'Bus pertama berangkat jam setengah enam pagi.'],
    ['末班车晚上十一点。', 'Mò bān chē wǎn shàng shí yī diǎn.', 'Bus terakhir jam sebelas malam.'],
    ['每十五分钟一班。', 'Měi shí wǔ fēn zhōng yì bān.', 'Setiap lima belas menit ada satu bus.'],
    ['全程票价两元。', 'Quán chéng piào jià liǎng yuán.', 'Tarif seluruh rute dua yuan.'],
  ]],
  ['Weather forecast text', ['Teks prakiraan: 晴, 阴, 多云, 小雨, 大风 + suhu.', 'Cari saran di akhir: 请注意…, 记得….'], [
    ['本周前三天都是晴天。', 'Běn zhōu qián sān tiān dōu shì qíng tiān.', 'Tiga hari pertama minggu ini cerah.'],
    ['星期四开始下雨，气温下降。', 'Xīng qī sì kāi shǐ xià yǔ, qì wēn xià jiàng.', 'Mulai Kamis hujan dan suhu turun.'],
    ['周末有大风，请注意安全。', 'Zhōu mò yǒu dà fēng, qǐng zhù yì ān quán.', 'Akhir pekan berangin kencang, harap waspada.'],
    ['出门记得多穿衣服。', 'Chū mén jì de duō chuān yī fu.', 'Saat keluar, ingat pakai baju lebih tebal.'],
  ]],
  ['Club notice', ['Pengumuman klub: kegiatan, jadwal, tempat, cara mendaftar.', '报名 = mendaftar; 欢迎 = selamat datang/terbuka.'], [
    ['学校篮球队欢迎新同学参加。', 'Xué xiào lán qiú duì huān yíng xīn tóng xué cān jiā.', 'Tim basket sekolah menerima murid baru.'],
    ['每周二、周四下午五点练习。', 'Měi zhōu èr, zhōu sì xià wǔ wǔ diǎn liàn xí.', 'Latihan setiap Selasa dan Kamis jam lima sore.'],
    ['地点：学校体育馆。', 'Dì diǎn: xué xiào tǐ yù guǎn.', 'Tempat: gedung olahraga sekolah.'],
    ['想报名的同学请找李老师。', 'Xiǎng bào míng de tóng xué qǐng zhǎo lǐ lǎo shī.', 'Yang ingin mendaftar silakan menemui Guru Li.'],
  ]],
  ['Medicine label', ['Label obat: 用法 (cara pakai), 用量 (dosis), 注意 (perhatian).', '饭前 = sebelum makan, 饭后 = sesudah makan.'], [
    ['用法：口服。', 'Yòng fǎ: kǒu fú.', 'Cara pakai: diminum.'],
    ['用量：一日两次，一次一片。', 'Yòng liàng: yí rì liǎng cì, yí cì yí piàn.', 'Dosis: dua kali sehari, satu tablet setiap kali.'],
    ['儿童请在医生指导下使用。', 'Ér tóng qǐng zài yī shēng zhǐ dǎo xià shǐ yòng.', 'Untuk anak-anak gunakan di bawah petunjuk dokter.'],
    ['请放在孩子拿不到的地方。', 'Qǐng fàng zài hái zi ná bú dào de dì fāng.', 'Simpan di tempat yang tidak terjangkau anak-anak.'],
  ]],
  ['Product comparison', ['Tabel perbandingan: harga, berat, warna, ukuran.', 'Kalimat ringkasan memakai 比 atau 没有…那么.'], [
    ['A款比B款轻一百克。', 'A kuǎn bǐ B kuǎn qīng yì bǎi kè.', 'Model A seratus gram lebih ringan daripada model B.'],
    ['B款的颜色比较多。', 'B kuǎn de yán sè bǐ jiào duō.', 'Model B pilihan warnanya lebih banyak.'],
    ['A款没有B款那么便宜。', 'A kuǎn méi yǒu B kuǎn nà me pián yi.', 'Model A tidak semurah model B.'],
    ['很多年轻人都选择B款。', 'Hěn duō nián qīng rén dōu xuǎn zé B kuǎn.', 'Banyak anak muda memilih model B.'],
  ]],
  ['Teacher comment card', ['Kartu komentar: pujian (…得很好) lalu saran (要多…).', 'Bedakan bagian yang sudah bagus dan yang perlu diperbaiki.'], [
    ['这个学期你学得很认真。', 'Zhè ge xué qī nǐ xué de hěn rèn zhēn.', 'Semester ini kamu belajar dengan sangat tekun.'],
    ['你的口语说得越来越流利。', 'Nǐ de kǒu yǔ shuō de yuè lái yuè liú lì.', 'Bahasa lisanmu semakin lancar.'],
    ['汉字要多写多练。', 'Hàn zì yào duō xiě duō liàn.', 'Hanzi harus banyak ditulis dan dilatih.'],
    ['希望你下学期继续努力。', 'Xī wàng nǐ xià xué qī jì xù nǔ lì.', 'Semoga semester depan kamu terus berusaha.'],
  ]],
  ['Chat messages in progress', ['Pesan singkat obrolan memakai 在…呢 dan 正在 untuk status sekarang.', 'Balasan sering sangat pendek: 好, 行, 马上.'], [
    ['你在干嘛？', 'Nǐ zài gàn má?', 'Kamu lagi apa?'],
    ['我在地铁上呢。', 'Wǒ zài dì tiě shàng ne.', 'Saya sedang di kereta bawah tanah.'],
    ['我们正在吃火锅，快来！', 'Wǒ men zhèng zài chī huǒ guō, kuài lái!', 'Kami sedang makan hotpot, cepat datang!'],
    ['行，我马上过去。', 'Xíng, wǒ mǎ shàng guò qù.', 'Oke, saya segera ke sana.'],
  ]],
  ['Reading a text message about delay', ['Pesan terlambat: 晚点, 堵车, 来不及 + perkiraan waktu.', 'Cari solusi yang diusulkan pengirim.'], [
    ['会议可能要晚半个小时开始。', 'Huì yì kě néng yào wǎn bàn gè xiǎo shí kāi shǐ.', 'Rapat mungkin dimulai setengah jam lebih lambat.'],
    ['王经理的飞机晚点了。', 'Wáng jīng lǐ de fēi jī wǎn diǎn le.', 'Pesawat Manajer Wang terlambat.'],
    ['大家可以先在会议室休息一下。', 'Dà jiā kě yǐ xiān zài huì yì shì xiū xi yí xià.', 'Semua boleh beristirahat dulu di ruang rapat.'],
    ['有变化我再通知大家。', 'Yǒu biàn huà wǒ zài tōng zhī dà jiā.', 'Jika ada perubahan akan saya beri tahu lagi.'],
  ]],
  ['Campus notice board', ['Papan pengumuman: 通知 (pemberitahuan), 考试, 放假, 讲座.', 'Cari siapa sasaran pengumuman (全体学生, 一年级).'], [
    ['通知：下周三下午没有课。', 'Tōng zhī: xià zhōu sān xià wǔ méi yǒu kè.', 'Pemberitahuan: Rabu depan sore tidak ada kelas.'],
    ['全体学生请到礼堂听讲座。', 'Quán tǐ xué shēng qǐng dào lǐ táng tīng jiǎng zuò.', 'Seluruh murid harap ke aula untuk mendengarkan ceramah.'],
    ['一年级的期末考试时间有变化。', 'Yī nián jí de qī mò kǎo shì shí jiān yǒu biàn huà.', 'Jadwal ujian akhir kelas satu berubah.'],
    ['请同学们互相告诉一下。', 'Qǐng tóng xué men hù xiāng gào sù yí xià.', 'Mohon para murid saling memberi tahu.'],
  ]],
  ['Holiday notice', ['Pengumuman libur: tanggal mulai, tanggal selesai, jam layanan.', '放假 = libur, 上班 = masuk kerja kembali, 营业 = buka usaha.'], [
    ['春节放假时间：二月九日到十五日。', 'Chūn jié fàng jià shí jiān: èr yuè jiǔ rì dào shí wǔ rì.', 'Libur Tahun Baru Imlek: 9 sampai 15 Februari.'],
    ['二月十六日正常上班。', 'Èr yuè shí liù rì zhèng cháng shàng bān.', 'Tanggal 16 Februari kembali bekerja seperti biasa.'],
    ['放假期间，商店上午十点开门。', 'Fàng jià qī jiān, shāng diàn shàng wǔ shí diǎn kāi mén.', 'Selama libur, toko buka jam sepuluh pagi.'],
    ['祝大家节日快乐！', 'Zhù dà jiā jié rì kuài lè!', 'Selamat hari raya untuk semuanya!'],
  ]],
  ['HSK 2 reading portfolio', ['Portfolio: baca 5 teks nyata (menu, poster, SMS, jadwal, pengumuman) dan tulis 1 kalimat inti untuk tiap teks.', 'Catat kata yang belum dikenal dan cari artinya dari konteks.'], [
    ['这个月我读了十篇短文。', 'Zhè ge yuè wǒ dú le shí piān duǎn wén.', 'Bulan ini saya membaca sepuluh teks pendek.'],
    ['我最喜欢读别人的旅游日记。', 'Wǒ zuì xǐ huan dú bié rén de lǚ yóu rì jì.', 'Saya paling suka membaca catatan perjalanan orang lain.'],
    ['不认识的字我先猜，再查词典。', 'Bú rèn shi de zì wǒ xiān cāi, zài chá cí diǎn.', 'Karakter yang tidak saya kenal, saya tebak dulu, lalu cek kamus.'],
    ['我读得比以前快了。', 'Wǒ dú de bǐ yǐ qián kuài le.', 'Sekarang saya membaca lebih cepat dari sebelumnya.'],
  ]],
];
