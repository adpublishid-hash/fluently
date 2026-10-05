import type { JapaneseQuizTopic } from '../types';

// Latihan Vocabulary N4 — one entry per topic (index = topic - 1): [Basic, Advanced].
export const vocabulary: JapaneseQuizTopic[] = [
  // 1. Kata kerja bentuk て
  [
    [
      ["急いで", "Isoide", "buru-buru, lalu…"],
      ["遊んで", "Asonde", "bermain, lalu…"],
      ["話して", "Hanashite", "berbicara, lalu…", ["Bentuk て dari 急ぐ adalah...", "急いで", "急って", "急いて", "急んで"]],
      ["呼んで", "Yonde", "memanggil, lalu…"],
    ],
    [
      ["窓を開けて、空気を入れ替えました。", "Mado o akete, kuuki o irekaemashita.", "Saya membuka jendela dan mengganti udara."],
      ["急いで駅へ行ったが、電車はもう出ていた。", "Isoide eki e itta ga, densha wa mou dete ita.", "Saya bergegas ke stasiun, tetapi keretanya sudah berangkat."],
      ["名前を呼ばれて、前に出ました。", "Namae o yobarete, mae ni demashita.", "Nama saya dipanggil, lalu saya maju ke depan."],
      ["友達と話して、気持ちが楽になりました。", "Tomodachi to hanashite, kimochi ga raku ni narimashita.", "Setelah berbicara dengan teman, perasaan saya menjadi lega.", ["Bentuk て dari 話す adalah...", "話して", "話いて", "話って", "話んで"]],
    ],
  ],
  // 2. Kesehatan
  [
    [
      ["風邪をひく", "Kaze o hiku", "masuk angin / flu"],
      ["せきが出る", "Seki ga deru", "batuk"],
      ["頭痛", "Zutsuu", "sakit kepala"],
      ["入院する", "Nyuuin suru", "dirawat inap", ["Lawan kata 入院する (dirawat inap) adalah...", "退院する", "通院する", "入学する", "休院する"]],
    ],
    [
      ["風邪をひいたので、会社を休みました。", "Kaze o hiita node, kaisha o yasumimashita.", "Karena flu, saya tidak masuk kantor."],
      ["祖父は来週退院できるそうです。", "Sofu wa raishuu taiin dekiru sou desu.", "Katanya kakek bisa keluar rumah sakit minggu depan."],
      ["ひどい頭痛がして、薬を飲みました。", "Hidoi zutsuu ga shite, kusuri o nomimashita.", "Saya sakit kepala parah, jadi minum obat."],
      ["健康のために、毎朝歩いています。", "Kenkou no tame ni, maiasa aruite imasu.", "Demi kesehatan, saya berjalan kaki setiap pagi."],
    ],
  ],
  // 3. Perjalanan
  [
    [
      ["発車", "Hassha", "keberangkatan kereta"],
      ["自由席", "Jiyuuseki", "kursi tanpa reservasi"],
      ["乗り遅れる", "Noriokureru", "ketinggalan kendaraan"],
      ["観光地", "Kankouchi", "tempat wisata", ["Lawan kata 出発 (keberangkatan) adalah...", "到着", "出口", "乗車", "予約"]],
    ],
    [
      ["飛行機は午前十時に出発します。", "Hikouki wa gozen juuji ni shuppatsu shimasu.", "Pesawat berangkat pukul sepuluh pagi."],
      ["自由席は混んでいたので、ずっと立っていました。", "Jiyuuseki wa konde ita node, zutto tatte imashita.", "Kursi bebas penuh, jadi saya terus berdiri."],
      ["寝坊して、バスに乗り遅れてしまいました。", "Nebou shite, basu ni noriokurete shimaimashita.", "Saya kesiangan dan ketinggalan bus."],
      ["京都は有名な観光地です。", "Kyouto wa yuumei na kankouchi desu.", "Kyoto adalah tempat wisata terkenal."],
    ],
  ],
  // 4. Acara sekolah
  [
    [
      ["運動会", "Undoukai", "festival olahraga"],
      ["卒業式", "Sotsugyoushiki", "upacara kelulusan"],
      ["入学式", "Nyuugakushiki", "upacara penerimaan siswa baru"],
      ["文化祭", "Bunkasai", "festival budaya sekolah", ["Acara sekolah dengan lomba lari dan tarik tambang disebut...", "運動会", "卒業式", "入学式", "修学旅行"]],
    ],
    [
      ["運動会で一位になりました。", "Undoukai de ichii ni narimashita.", "Saya juara satu di festival olahraga."],
      ["文化祭でクラスの劇をします。", "Bunkasai de kurasu no geki o shimasu.", "Di festival budaya kelas kami mementaskan drama."],
      ["四月に入学式が行われます。", "Shigatsu ni nyuugakushiki ga okonawaremasu.", "Upacara penerimaan siswa baru diadakan bulan April."],
      ["修学旅行で奈良の大仏を見ました。", "Shuugaku ryokou de Nara no daibutsu o mimashita.", "Saat karyawisata sekolah saya melihat patung Buddha besar di Nara."],
    ],
  ],
  // 5. Shift kerja
  [
    [
      ["時給", "Jikyuu", "upah per jam"],
      ["早退", "Soutai", "pulang lebih awal"],
      ["休憩時間", "Kyuukei jikan", "waktu istirahat"],
      ["夜勤", "Yakin", "shift malam", ["Kata 時給 berarti...", "upah per jam", "gaji bulanan", "bonus", "uang transport"]],
    ],
    [
      ["このコンビニは時給が高いです。", "Kono konbini wa jikyuu ga takai desu.", "Upah per jam di minimarket ini tinggi."],
      ["体調が悪いので、今日は早退させてください。", "Taichou ga warui node, kyou wa soutai sasete kudasai.", "Karena kurang sehat, izinkan saya pulang lebih awal hari ini."],
      ["来週から夜勤が始まります。", "Raishuu kara yakin ga hajimarimasu.", "Mulai minggu depan shift malam dimulai."],
      ["シフトを変えてもらえませんか。", "Shifuto o kaete moraemasen ka.", "Bisakah shift saya diganti?"],
    ],
  ],
  // 6. Tempat tinggal
  [
    [
      ["家賃", "Yachin", "uang sewa rumah"],
      ["引っ越し", "Hikkoshi", "pindahan"],
      ["駅から近い", "Eki kara chikai", "dekat dari stasiun"],
      ["日当たり", "Hiatari", "paparan sinar matahari", ["Orang yang menyewakan rumah disebut...", "大家さん", "店員さん", "駅員さん", "先輩"]],
    ],
    [
      ["この部屋は日当たりがいいです。", "Kono heya wa hiatari ga ii desu.", "Kamar ini mendapat banyak sinar matahari."],
      ["家賃は毎月二十五日までに払ってください。", "Yachin wa maitsuki nijuugonichi made ni haratte kudasai.", "Bayar sewa paling lambat tanggal 25 setiap bulan."],
      ["来月、会社の近くに引っ越すつもりです。", "Raigetsu, kaisha no chikaku ni hikkosu tsumori desu.", "Bulan depan saya berencana pindah ke dekat kantor."],
      ["隣の人にあいさつに行きました。", "Tonari no hito ni aisatsu ni ikimashita.", "Saya pergi menyapa tetangga sebelah."],
    ],
  ],
  // 7. Aturan
  [
    [
      ["禁止", "Kinshi", "larangan"],
      ["守る", "Mamoru", "menaati / melindungi"],
      ["マナー", "Manaa", "tata krama"],
      ["ごみの出し方", "Gomi no dashikata", "cara membuang sampah", ["Lawan kata 規則を守る (menaati aturan) adalah...", "規則を破る", "規則を作る", "規則を読む", "規則を聞く"]],
    ],
    [
      ["ここでは携帯電話の使用は禁止です。", "Koko de wa keitai denwa no shiyou wa kinshi desu.", "Di sini dilarang menggunakan telepon genggam."],
      ["ごみは決められた日に出さなければなりません。", "Gomi wa kimerareta hi ni dasanakereba narimasen.", "Sampah harus dibuang pada hari yang ditentukan."],
      ["電車の中で大きな声で話すのはマナー違反です。", "Densha no naka de ooki na koe de hanasu no wa manaa ihan desu.", "Berbicara keras di dalam kereta melanggar tata krama."],
      ["約束の時間を守ってください。", "Yakusoku no jikan o mamotte kudasai.", "Tolong tepati waktu janjian."],
    ],
  ],
  // 8. Perbandingan
  [
    [
      ["比べる", "Kuraberu", "membandingkan"],
      ["同じ", "Onaji", "sama"],
      ["違う", "Chigau", "berbeda"],
      ["もっと", "Motto", "lebih", ["Kata untuk 'jauh lebih' (perbandingan) adalah...", "ずっと", "まだ", "もう", "すぐ"]],
    ],
    [
      ["東京は大阪より人が多いです。", "Toukyou wa Oosaka yori hito ga ooi desu.", "Tokyo lebih banyak penduduknya daripada Osaka."],
      ["私と姉は好きな食べ物が同じです。", "Watashi to ane wa suki na tabemono ga onaji desu.", "Saya dan kakak perempuan suka makanan yang sama."],
      ["日本とインドネシアは文化がかなり違います。", "Nihon to Indoneshia wa bunka ga kanari chigaimasu.", "Budaya Jepang dan Indonesia cukup berbeda."],
      ["電車はバスよりずっと速いです。", "Densha wa basu yori zutto hayai desu.", "Kereta jauh lebih cepat daripada bus."],
    ],
  ],
  // 9. Pengalaman
  [
    [
      ["経験", "Keiken", "pengalaman"],
      ["初めて", "Hajimete", "pertama kali"],
      ["一度も", "Ichido mo", "sekali pun (dengan negatif)"],
      ["挑戦", "Chousen", "tantangan / mencoba", ["Pola untuk menyatakan pengalaman adalah...", "〜たことがある", "〜ているところ", "〜てしまう", "〜ようにする"]],
    ],
    [
      ["沖縄の海で泳いだことがあります。", "Okinawa no umi de oyoida koto ga arimasu.", "Saya pernah berenang di laut Okinawa."],
      ["納豆は一度も食べたことがありません。", "Nattou wa ichido mo tabeta koto ga arimasen.", "Saya belum pernah sekali pun makan natto."],
      ["初めて雪を見たとき、とても感動しました。", "Hajimete yuki o mita toki, totemo kandou shimashita.", "Saat pertama kali melihat salju, saya sangat terharu."],
      ["新しいことに挑戦するのが好きです。", "Atarashii koto ni chousen suru no ga suki desu.", "Saya suka mencoba hal-hal baru."],
    ],
  ],
  // 10. Saran
  [
    [
      ["相談", "Soudan", "konsultasi"],
      ["勧める", "Susumeru", "menyarankan / merekomendasikan"],
      ["注意する", "Chuui suru", "menegur / berhati-hati"],
      ["〜ほうがいい", "Hou ga ii", "sebaiknya ...", ["Pola saran 'sebaiknya kamu istirahat' adalah...", "休んだほうがいいです", "休むほうがいいでした", "休んでほうがいい", "休みほうがいい"]],
    ],
    [
      ["早く寝たほうがいいですよ。", "Hayaku neta hou ga ii desu yo.", "Sebaiknya kamu tidur lebih awal."],
      ["困ったことがあったら、先生に相談してください。", "Komatta koto ga attara, sensei ni soudan shite kudasai.", "Kalau ada masalah, konsultasikan dengan guru."],
      ["友達にこの本を勧められました。", "Tomodachi ni kono hon o susumeraremashita.", "Teman saya merekomendasikan buku ini."],
      ["夜遅くまでゲームをしないほうがいいです。", "Yoru osoku made geemu o shinai hou ga ii desu.", "Sebaiknya jangan bermain game sampai larut malam."],
    ],
  ],
  // 11. Reservasi
  [
    [
      ["満席", "Manseki", "kursi penuh"],
      ["空席", "Kuuseki", "kursi kosong"],
      ["確認", "Kakunin", "konfirmasi"],
      ["変更", "Henkou", "perubahan", ["Kata 満席 berarti...", "semua kursi penuh", "kursi kosong", "kursi reservasi", "kursi prioritas"]],
    ],
    [
      ["金曜日の夜は満席でございます。", "Kinyoubi no yoru wa manseki de gozaimasu.", "Jumat malam semua kursi sudah penuh."],
      ["予約の確認をお願いします。", "Yoyaku no kakunin o onegaishimasu.", "Tolong konfirmasi reservasi saya."],
      ["人数を四人から六人に変更したいです。", "Ninzuu o yonin kara rokunin ni henkou shitai desu.", "Saya ingin mengubah jumlah orang dari empat menjadi enam."],
      ["窓側の席は空いていますか。", "Madogawa no seki wa aite imasu ka.", "Apakah kursi dekat jendela masih kosong?"],
    ],
  ],
  // 12. Belanja
  [
    [
      ["割引", "Waribiki", "diskon"],
      ["試着室", "Shichakushitsu", "kamar pas"],
      ["サイズ", "Saizu", "ukuran"],
      ["売り切れ", "Urikire", "habis terjual", ["Tempat untuk mencoba baju disebut...", "試着室", "会計", "売り場", "倉庫"]],
    ],
    [
      ["今日は全品二割引です。", "Kyou wa zenpin niwaribiki desu.", "Hari ini semua barang diskon dua puluh persen."],
      ["試着室はあちらにございます。", "Shichakushitsu wa achira ni gozaimasu.", "Kamar pas ada di sebelah sana."],
      ["人気の商品はすぐ売り切れてしまいます。", "Ninki no shouhin wa sugu urikirete shimaimasu.", "Barang populer cepat habis terjual."],
      ["もう少し小さいサイズはありませんか。", "Mou sukoshi chiisai saizu wa arimasen ka.", "Tidak ada ukuran yang sedikit lebih kecil?"],
    ],
  ],
  // 13. Emosi
  [
    [
      ["寂しい", "Sabishii", "kesepian"],
      ["悔しい", "Kuyashii", "kesal / menyesal (karena kalah)"],
      ["恥ずかしい", "Hazukashii", "malu"],
      ["ほっとする", "Hotto suru", "merasa lega", ["Perasaan setelah ujian selesai dan lulus adalah...", "ほっとする", "悔しい", "寂しい", "恥ずかしい"]],
    ],
    [
      ["家族と離れて暮らすのは寂しいです。", "Kazoku to hanarete kurasu no wa sabishii desu.", "Hidup jauh dari keluarga itu sepi."],
      ["決勝で負けて、本当に悔しかったです。", "Kesshou de makete, hontou ni kuyashikatta desu.", "Kalah di final, saya sungguh kesal."],
      ["みんなの前で転んで、恥ずかしかったです。", "Minna no mae de koronde, hazukashikatta desu.", "Saya jatuh di depan semua orang, malu sekali."],
      ["財布が見つかって、ほっとしました。", "Saifu ga mitsukatte, hotto shimashita.", "Dompetnya ditemukan, saya merasa lega."],
    ],
  ],
  // 14. Cuaca dan rencana
  [
    [
      ["天気予報", "Tenki yohou", "prakiraan cuaca"],
      ["梅雨", "Tsuyu", "musim hujan (Juni–Juli)"],
      ["蒸し暑い", "Mushiatsui", "panas lembap"],
      ["降水確率", "Kousui kakuritsu", "peluang hujan", ["Musim hujan di Jepang pada bulan Juni disebut...", "梅雨", "台風", "真夏", "初雪"]],
    ],
    [
      ["天気予報によると、明日は雪だそうです。", "Tenki yohou ni yoru to, ashita wa yuki da sou desu.", "Menurut prakiraan cuaca, besok katanya salju."],
      ["梅雨の間は洗濯物が乾きません。", "Tsuyu no aida wa sentakumono ga kawakimasen.", "Selama musim hujan, cucian tidak kering."],
      ["日本の夏はとても蒸し暑いです。", "Nihon no natsu wa totemo mushiatsui desu.", "Musim panas di Jepang sangat panas lembap."],
      ["雨が降ったら、ピクニックは中止します。", "Ame ga futtara, pikunikku wa chuushi shimasu.", "Kalau hujan, piknik dibatalkan."],
    ],
  ],
  // 15. Fasilitas umum
  [
    [
      ["市役所", "Shiyakusho", "kantor wali kota"],
      ["区役所", "Kuyakusho", "kantor kecamatan (ku)"],
      ["公民館", "Kouminkan", "balai warga"],
      ["窓口", "Madoguchi", "loket layanan", ["Tempat mendaftar alamat bagi warga asing biasanya...", "市役所", "郵便局", "交番", "図書館"]],
    ],
    [
      ["住所が変わったら、区役所に届けてください。", "Juusho ga kawattara, kuyakusho ni todokete kudasai.", "Kalau alamat berubah, laporkan ke kantor kecamatan."],
      ["三番の窓口でお待ちください。", "Sanban no madoguchi de omachi kudasai.", "Silakan menunggu di loket nomor tiga."],
      ["公民館で日本語教室が開かれています。", "Kouminkan de Nihongo kyoushitsu ga hirakarete imasu.", "Di balai warga diadakan kelas bahasa Jepang."],
      ["市役所は土曜日も午前中だけ開いています。", "Shiyakusho wa doyoubi mo gozenchuu dake aite imasu.", "Kantor wali kota hari Sabtu juga buka, hanya pagi hari."],
    ],
  ],
  // 16. Instruksi
  [
    [
      ["入れる", "Ireru", "memasukkan"],
      ["つける", "Tsukeru", "menyalakan"],
      ["消す", "Kesu", "mematikan / menghapus"],
      ["回す", "Mawasu", "memutar", ["Lawan kata 電気をつける (menyalakan lampu) adalah...", "電気を消す", "電気を入れる", "電気を押す", "電気を回す"]],
    ],
    [
      ["お金を入れてから、ボタンを押してください。", "Okane o irete kara, botan o oshite kudasai.", "Masukkan uang, lalu tekan tombolnya."],
      ["部屋を出るときは、電気を消してください。", "Heya o deru toki wa, denki o keshite kudasai.", "Saat keluar kamar, matikan lampunya."],
      ["このつまみを右に回すと、音が大きくなります。", "Kono tsumami o migi ni mawasu to, oto ga ookiku narimasu.", "Kalau kenop ini diputar ke kanan, suaranya membesar."],
      ["使った後は、元の場所に戻してください。", "Tsukatta ato wa, moto no basho ni modoshite kudasai.", "Setelah dipakai, kembalikan ke tempat semula."],
    ],
  ],
  // 17. Acara dan perayaan
  [
    [
      ["お祝い", "Oiwai", "perayaan / ucapan selamat"],
      ["結婚式", "Kekkonshiki", "upacara pernikahan"],
      ["花見", "Hanami", "menikmati bunga sakura"],
      ["招待状", "Shoutaijou", "surat undangan", ["Acara menikmati bunga sakura di musim semi disebut...", "花見", "花火", "月見", "雪祭り"]],
    ],
    [
      ["友達の結婚式でスピーチをしました。", "Tomodachi no kekkonshiki de supiichi o shimashita.", "Saya berpidato di pernikahan teman."],
      ["週末に公園で花見をする予定です。", "Shuumatsu ni kouen de hanami o suru yotei desu.", "Akhir pekan kami berencana hanami di taman."],
      ["合格のお祝いに時計をもらいました。", "Goukaku no oiwai ni tokei o moraimashita.", "Saya mendapat jam sebagai hadiah kelulusan."],
      ["招待状の返事はもう出しましたか。", "Shoutaijou no henji wa mou dashimashita ka.", "Sudah membalas surat undangannya?"],
    ],
  ],
  // 18. Kanji N4
  [
    [
      ["準備", "Junbi", "persiapan"],
      ["説明", "Setsumei", "penjelasan"],
      ["経済", "Keizai", "ekonomi"],
      ["特別", "Tokubetsu", "istimewa / khusus", ["Bacaan kanji 準備 adalah...", "junbi", "junbin", "shunbi", "jumbi"]],
    ],
    [
      ["旅行の準備はもうできましたか。", "Ryokou no junbi wa mou dekimashita ka.", "Persiapan perjalanan sudah selesai?"],
      ["先生の説明はとてもわかりやすかったです。", "Sensei no setsumei wa totemo wakariyasukatta desu.", "Penjelasan guru sangat mudah dipahami."],
      ["何か質問があれば、手を挙げてください。", "Nanika shitsumon ga areba, te o agete kudasai.", "Kalau ada pertanyaan, angkat tangan."],
      ["今日は特別な日なので、レストランで食べます。", "Kyou wa tokubetsu na hi na node, resutoran de tabemasu.", "Hari ini hari istimewa, jadi kami makan di restoran."],
    ],
  ],
  // 19. Kata penghubung
  [
    [
      ["だから", "Dakara", "karena itu"],
      ["しかし", "Shikashi", "akan tetapi"],
      ["それで", "Sorede", "lalu / karena itu"],
      ["または", "Mataha", "atau", ["Kata penghubung untuk pertentangan adalah...", "しかし", "だから", "それに", "または"]],
    ],
    [
      ["雨が降っていました。だから、試合は中止になりました。", "Ame ga futte imashita. Dakara, shiai wa chuushi ni narimashita.", "Hujan turun. Karena itu, pertandingan dibatalkan."],
      ["一生懸命練習した。しかし、負けてしまった。", "Isshoukenmei renshuu shita. Shikashi, makete shimatta.", "Saya berlatih keras. Akan tetapi, saya kalah."],
      ["この店は安い。それに、料理もおいしい。", "Kono mise wa yasui. Sore ni, ryouri mo oishii.", "Toko ini murah. Lagi pula, makanannya juga enak."],
      ["ペンまたは鉛筆で書いてください。", "Pen mataha enpitsu de kaite kudasai.", "Tulislah dengan pulpen atau pensil."],
    ],
  ],
  // 20. Ulasan kosakata N4
  [
    [
      ["忘れ物をする", "Wasuremono o suru", "meninggalkan barang"],
      ["連絡する", "Renraku suru", "menghubungi"],
      ["間に合う", "Ma ni au", "sempat / tepat waktu"],
      ["役に立つ", "Yaku ni tatsu", "berguna", ["Lawan kata 間に合う (sempat) adalah...", "間に合わない / 遅れる", "急ぐ", "待つ", "早く着く"]],
    ],
    [
      ["急げば、まだ電車に間に合います。", "Isogeba, mada densha ni ma ni aimasu.", "Kalau bergegas, masih sempat naik kereta."],
      ["この辞書は勉強にとても役に立ちます。", "Kono jisho wa benkyou ni totemo yaku ni tachimasu.", "Kamus ini sangat berguna untuk belajar."],
      ["着いたら、すぐに連絡してください。", "Tsuitara, sugu ni renraku shite kudasai.", "Begitu tiba, segera hubungi saya."],
      ["電車に忘れ物をしてしまいました。", "Densha ni wasuremono o shite shimaimashita.", "Saya meninggalkan barang di kereta."],
    ],
  ],
];
