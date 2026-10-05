import type { JapaneseQuizTopic } from '../types';

// Latihan Speaking N4 — one entry per topic (index = topic - 1): [Basic, Advanced].
export const speaking: JapaneseQuizTopic[] = [
  // 1. Membuat rencana
  [
    [
      ["予定がある", "Yotei ga aru", "ada rencana"],
      ["のはどうですか", "No wa dou desu ka", "bagaimana kalau ...?"],
      ["待ち合わせ", "Machiawase", "janjian bertemu"],
      ["都合がいい", "Tsugou ga ii", "waktunya cocok", ["Untuk mengusulkan 'bagaimana kalau ke laut?', yang wajar adalah...", "海に行くのはどうですか。", "海に行きましたか。", "海に行ってはいけません。", "海に行ったことがあります。"]],
    ],
    [
      ["来週の金曜日、都合はどうですか。", "Raishuu no kinyoubi, tsugou wa dou desu ka.", "Jumat minggu depan, bagaimana waktunya?"],
      ["待ち合わせは駅の東口にしましょう。", "Machiawase wa eki no higashiguchi ni shimashou.", "Ayo janjian di pintu timur stasiun."],
      ["映画の後で、カフェに寄るのはどうですか。", "Eiga no ato de, kafe ni yoru no wa dou desu ka.", "Bagaimana kalau mampir ke kafe setelah film?"],
      ["じゃ、日曜日の一時に決めましょう。", "Ja, nichiyoubi no ichiji ni kimemashou.", "Kalau begitu, kita tetapkan hari Minggu pukul satu."],
    ],
  ],
  // 2. Meminta izin
  [
    [
      ["てもいいですか", "Te mo ii desu ka", "bolehkah ...?"],
      ["てもよろしいですか", "Te mo yoroshii desu ka", "bolehkah ... (lebih sopan)?"],
      ["かまいません", "Kamaimasen", "tidak masalah"],
      ["ご遠慮ください", "Goenryo kudasai", "mohon tidak dilakukan", ["Jawaban sopan untuk mengizinkan adalah...", "ええ、かまいませんよ。", "いいえ、けっこうです。", "だめです。", "知りません。"]],
    ],
    [
      ["このパソコンを少し使ってもいいですか。", "Kono pasokon o sukoshi tsukatte mo ii desu ka.", "Bolehkah saya memakai komputer ini sebentar?"],
      ["明日、会議を欠席してもよろしいですか。", "Ashita, kaigi o kesseki shite mo yoroshii desu ka.", "Bolehkah saya tidak hadir rapat besok?"],
      ["申し訳ありませんが、ここでの撮影はご遠慮ください。", "Moushiwake arimasen ga, koko de no satsuei wa goenryo kudasai.", "Mohon maaf, harap tidak memotret di sini."],
      ["窓を少し開けてもかまいませんか。", "Mado o sukoshi akete mo kamaimasen ka.", "Tidak apa-apa kalau saya membuka jendela sedikit?"],
    ],
  ],
  // 3. Menjelaskan gejala sakit
  [
    [
      ["んです", "N desu", "(menjelaskan keadaan)"],
      ["寒気がする", "Samuke ga suru", "merasa menggigil"],
      ["吐き気がする", "Hakike ga suru", "merasa mual"],
      ["めまいがする", "Memai ga suru", "merasa pusing", ["Untuk menjelaskan keluhan kepada dokter, bentuk yang wajar adalah...", "のどが痛いんです。", "のどが痛いでした。", "のどを痛います。", "のどが痛くてください。"]],
    ],
    [
      ["昨日の夜から寒気がするんです。", "Kinou no yoru kara samuke ga suru n desu.", "Sejak kemarin malam saya menggigil."],
      ["少し吐き気がして、何も食べられません。", "Sukoshi hakike ga shite, nani mo taberaremasen.", "Saya agak mual dan tidak bisa makan apa pun."],
      ["立つと、めまいがします。", "Tatsu to, memai ga shimasu.", "Kalau berdiri, saya pusing."],
      ["三日前からせきが止まらないんです。", "Mikka mae kara seki ga tomaranai n desu.", "Sejak tiga hari lalu batuk saya tidak berhenti."],
    ],
  ],
  // 4. Masalah saat bepergian
  [
    [
      ["てしまいました", "Te shimaimashita", "(tak sengaja) sudah ..."],
      ["なくす", "Nakusu", "menghilangkan"],
      ["乗り過ごす", "Norisugosu", "kelewatan stasiun"],
      ["遅延", "Chien", "keterlambatan", ["Bentuk yang menunjukkan penyesalan 'tidak sengaja kehilangan' adalah...", "なくしてしまいました", "なくしています", "なくしましょう", "なくしたいです"]],
    ],
    [
      ["寝てしまって、駅を乗り過ごしてしまいました。", "Nete shimatte, eki o norisugoshite shimaimashita.", "Saya ketiduran dan kelewatan stasiun."],
      ["切符をなくしてしまったんですが、どうすればいいですか。", "Kippu o nakushite shimatta n desu ga, dou sureba ii desu ka.", "Saya kehilangan tiket, apa yang harus saya lakukan?"],
      ["電車が遅れていて、約束の時間に間に合いません。", "Densha ga okurete ite, yakusoku no jikan ni ma ni aimasen.", "Keretanya terlambat, saya tidak sempat tiba di jam janjian."],
      ["荷物を預けたいんですが、どこでできますか。", "Nimotsu o azuketai n desu ga, doko de dekimasu ka.", "Saya ingin menitipkan barang, di mana bisa?"],
    ],
  ],
  // 5. Permintaan di restoran
  [
    [
      ["抜きで", "Nuki de", "tanpa ..."],
      ["少なめ", "Sukuname", "agak sedikit (porsi)"],
      ["持ち帰り", "Mochikaeri", "dibawa pulang"],
      ["取り皿", "Torizara", "piring kecil untuk berbagi", ["Untuk memesan tanpa es, kamu bilang...", "氷抜きでお願いします。", "氷を食べます。", "氷がありません。", "氷でください。"]],
    ],
    [
      ["ご飯を少なめにしてもらえますか。", "Gohan o sukuname ni shite moraemasu ka.", "Bisakah nasinya dibuat sedikit?"],
      ["これは持ち帰りでお願いします。", "Kore wa mochikaeri de onegaishimasu.", "Yang ini tolong dibungkus untuk dibawa pulang."],
      ["取り皿を二枚もらえますか。", "Torizara o nimai moraemasu ka.", "Boleh minta dua piring kecil?"],
      ["注文したものがまだ来ていないんですが。", "Chuumon shita mono ga mada kite inai n desu ga.", "Pesanan saya belum datang."],
    ],
  ],
  // 6. Jadwal kerja
  [
    [
      ["シフトに入る", "Shifuto ni hairu", "masuk shift"],
      ["代わる", "Kawaru", "menggantikan"],
      ["休みを取る", "Yasumi o toru", "mengambil cuti"],
      ["残業", "Zangyou", "lembur", ["Untuk meminta rekan menggantikan shift, kamu bilang...", "代わってもらえませんか。", "代わってはいけません。", "代わったことがあります。", "代わりましょう。"]],
    ],
    [
      ["来週の月曜日、休みを取ってもいいですか。", "Raishuu no getsuyoubi, yasumi o totte mo ii desu ka.", "Bolehkah saya cuti Senin depan?"],
      ["今日は残業できないんです。", "Kyou wa zangyou dekinai n desu.", "Hari ini saya tidak bisa lembur."],
      ["日曜日のシフトに入れる人はいますか。", "Nichiyoubi no shifuto ni haireru hito wa imasu ka.", "Ada yang bisa masuk shift hari Minggu?"],
      ["急用ができたので、代わってもらえませんか。", "Kyuuyou ga dekita node, kawatte moraemasen ka.", "Saya ada urusan mendadak, bisakah kamu menggantikan saya?"],
    ],
  ],
  // 7. Meminta tolong
  [
    [
      ["てもらえませんか", "Te moraemasen ka", "bisakah kamu ... (untuk saya)?"],
      ["ていただけませんか", "Te itadakemasen ka", "bisakah Anda ... (sangat sopan)?"],
      ["お願いがある", "Onegai ga aru", "punya permintaan"],
      ["助かる", "Tasukaru", "terbantu", ["Permintaan paling sopan kepada atasan adalah...", "見ていただけませんか。", "見て。", "見てくれる？", "見ろ。"]],
    ],
    [
      ["この荷物を二階まで運んでもらえませんか。", "Kono nimotsu o nikai made hakonde moraemasen ka.", "Bisakah kamu membawakan barang ini ke lantai dua?"],
      ["この書類をチェックしていただけませんか。", "Kono shorui o chekku shite itadakemasen ka.", "Bisakah Anda memeriksa dokumen ini?"],
      ["すみません、ちょっとお願いがあるんですが。", "Sumimasen, chotto onegai ga aru n desu ga.", "Maaf, saya punya sedikit permintaan."],
      ["手伝ってもらえると、本当に助かります。", "Tetsudatte moraeru to, hontou ni tasukarimasu.", "Kalau kamu bisa membantu, saya sungguh terbantu."],
    ],
  ],
  // 8. Menceritakan pengalaman
  [
    [
      ["したことがある", "Shita koto ga aru", "pernah melakukan"],
      ["どうでしたか", "Dou deshita ka", "bagaimana rasanya?"],
      ["印象", "Inshou", "kesan"],
      ["思ったより", "Omotta yori", "dibanding yang dibayangkan", ["Untuk menanyakan kesan pengalaman, kamu bertanya...", "どうでしたか。", "いつですか。", "いくらですか。", "どこですか。"]],
    ],
    [
      ["着物を着たことがありますか。", "Kimono o kita koto ga arimasu ka.", "Pernahkah kamu memakai kimono?"],
      ["去年のお正月に一度着ました。", "Kyonen no oshougatsu ni ichido kimashita.", "Tahun Baru lalu saya memakainya sekali."],
      ["思ったより重くて、大変でした。", "Omotta yori omokute, taihen deshita.", "Lebih berat dari yang saya bayangkan, repot sekali."],
      ["初めて富士山を見たとき、感動しました。", "Hajimete Fujisan o mita toki, kandou shimashita.", "Saat pertama melihat Gunung Fuji, saya terharu."],
    ],
  ],
  // 9. Memberi saran
  [
    [
      ["たほうがいい", "Ta hou ga ii", "sebaiknya ..."],
      ["たらどうですか", "Tara dou desu ka", "bagaimana kalau ...?"],
      ["無理しないで", "Muri shinaide", "jangan memaksakan diri"],
      ["気をつけて", "Ki o tsukete", "hati-hati", ["Saran yang lebih lembut adalah...", "病院に行ったらどうですか。", "病院に行きなさい。", "病院に行け。", "病院に行かなければならない。"]],
    ],
    [
      ["疲れているなら、少し休んだらどうですか。", "Tsukarete iru nara, sukoshi yasundara dou desu ka.", "Kalau lelah, bagaimana kalau istirahat sebentar?"],
      ["無理しないで、早く帰ってください。", "Muri shinaide, hayaku kaette kudasai.", "Jangan memaksakan diri, pulanglah lebih awal."],
      ["面接の前に、よく練習したほうがいいですよ。", "Mensetsu no mae ni, yoku renshuu shita hou ga ii desu yo.", "Sebaiknya berlatih dengan baik sebelum wawancara."],
      ["夜道は暗いから、気をつけてね。", "Yomichi wa kurai kara, ki o tsukete ne.", "Jalan malam gelap, hati-hati ya."],
    ],
  ],
  // 10. Meminta maaf dengan alasan
  [
    [
      ["申し訳ない", "Moushiwake nai", "sangat menyesal"],
      ["うっかり", "Ukkari", "tanpa sengaja / lalai"],
      ["二度と", "Nido to", "tidak akan lagi (dengan negatif)"],
      ["これから", "Korekara", "mulai sekarang", ["Urutan permintaan maaf yang baik adalah...", "maaf → alasan → solusi → janji", "janji → maaf → pamit", "alasan → pamit → maaf", "solusi → pamit"]],
    ],
    [
      ["うっかりして、メールを送るのを忘れてしまいました。", "Ukkari shite, meeru o okuru no o wasurete shimaimashita.", "Karena lalai, saya lupa mengirim email."],
      ["お待たせしてしまって、申し訳ありません。", "Omatase shite shimatte, moushiwake arimasen.", "Mohon maaf telah membuat Anda menunggu."],
      ["二度とこんなことがないようにします。", "Nido to konna koto ga nai you ni shimasu.", "Saya akan berusaha agar hal seperti ini tidak terjadi lagi."],
      ["寝坊してしまって、遅れました。すみません。", "Nebou shite shimatte, okuremashita. Sumimasen.", "Saya kesiangan, jadi terlambat. Maaf."],
    ],
  ],
  // 11. Tersesat dan bertanya jalan
  [
    [
      ["迷子になる", "Maigo ni naru", "tersesat (anak/orang hilang)"],
      ["目印", "Mejirushi", "patokan"],
      ["突き当たり", "Tsukiatari", "ujung jalan"],
      ["交差点", "Kousaten", "perempatan", ["Saat tersesat, kamu menjelaskan posisi sekarang dengan...", "今、〜の前にいるんですが。", "〜へ行きました。", "〜がありません。", "〜を食べています。"]],
    ],
    [
      ["すみません、道に迷ってしまったんですが。", "Sumimasen, michi ni mayotte shimatta n desu ga.", "Permisi, saya tersesat."],
      ["何か目印になるものはありますか。", "Nanika mejirushi ni naru mono wa arimasu ka.", "Ada sesuatu yang bisa jadi patokan?"],
      ["この道の突き当たりを右に曲がってください。", "Kono michi no tsukiatari o migi ni magatte kudasai.", "Belok kanan di ujung jalan ini."],
      ["大きい交差点を渡ると、左側に見えます。", "Ookii kousaten o wataru to, hidarigawa ni miemasu.", "Kalau menyeberangi perempatan besar, terlihat di sisi kiri."],
    ],
  ],
  // 12. Bertelepon
  [
    [
      ["いらっしゃいますか", "Irasshaimasu ka", "apakah (beliau) ada?"],
      ["お電話", "Odenwa", "telepon (sopan)"],
      ["折り返し", "Orikaeshi", "menelepon balik"],
      ["伝えておきます", "Tsutaete okimasu", "akan saya sampaikan", ["Untuk menanyakan apakah Pak Tanaka ada, kamu bilang...", "田中さんはいらっしゃいますか。", "田中さんはいますか？行きます。", "田中さんがありますか。", "田中さんを知っていますか。"]],
    ],
    [
      ["山田でございます。部長はいらっしゃいますか。", "Yamada de gozaimasu. Buchou wa irasshaimasu ka.", "Saya Yamada. Apakah manajernya ada?"],
      ["戻りましたら、折り返しお電話いたします。", "Modorimashitara, orikaeshi odenwa itashimasu.", "Begitu beliau kembali, kami akan menelepon balik."],
      ["申し訳ありません、お電話が遠いようです。", "Moushiwake arimasen, odenwa ga tooi you desu.", "Maaf, suaranya kurang jelas."],
      ["では、明日もう一度お電話します。", "De wa, ashita mou ichido odenwa shimasu.", "Kalau begitu, besok saya telepon lagi."],
    ],
  ],
  // 13. Acara sekolah
  [
    [
      ["劇", "Geki", "drama"],
      ["役", "Yaku", "peran"],
      ["出し物", "Dashimono", "pertunjukan / atraksi"],
      ["練習", "Renshuu", "latihan", ["Pertanyaan 'kamu memerankan apa?' adalah...", "何の役ですか。", "何の劇ですか。", "どこの学校ですか。", "何時からですか。"]],
    ],
    [
      ["私たちのクラスの出し物はお化け屋敷です。", "Watashitachi no kurasu no dashimono wa obakeyashiki desu.", "Pertunjukan kelas kami adalah rumah hantu."],
      ["放課後、毎日劇の練習をしています。", "Houkago, mainichi geki no renshuu o shite imasu.", "Sepulang sekolah, setiap hari kami berlatih drama."],
      ["運動会でリレーの選手に選ばれました。", "Undoukai de riree no senshu ni erabaremashita.", "Saya terpilih sebagai pelari estafet di festival olahraga."],
      ["当日はぜひ見に来てください。", "Toujitsu wa zehi mi ni kite kudasai.", "Pada harinya, datanglah menonton."],
    ],
  ],
  // 14. Membandingkan saat belanja
  [
    [
      ["どちらが", "Dochira ga", "mana yang (dari dua)"],
      ["のほうが", "No hou ga", "yang ... lebih"],
      ["一番", "Ichiban", "paling"],
      ["売れている", "Urete iru", "laris", ["Untuk membandingkan dua barang, pola yang benar adalah...", "AとBとどちらが安いですか。", "AとBとどれが一番ですか。", "AよりBを安いです。", "AもBも安いですか。"]],
    ],
    [
      ["このカメラとあのカメラと、どちらが使いやすいですか。", "Kono kamera to ano kamera to, dochira ga tsukaiyasui desu ka.", "Kamera ini dan kamera itu, mana yang lebih mudah dipakai?"],
      ["こちらのほうが軽くて、便利ですよ。", "Kochira no hou ga karukute, benri desu yo.", "Yang ini lebih ringan dan praktis."],
      ["この三つの中で、どれが一番安いですか。", "Kono mittsu no naka de, dore ga ichiban yasui desu ka.", "Di antara tiga ini, mana yang paling murah?"],
      ["値段はあまり変わりませんね。", "Nedan wa amari kawarimasen ne.", "Harganya tidak terlalu berbeda, ya."],
    ],
  ],
  // 15. Mencari tempat tinggal
  [
    [
      ["予算", "Yosan", "anggaran"],
      ["ペット可", "Petto ka", "boleh membawa hewan peliharaan"],
      ["敷金", "Shikikin", "uang jaminan sewa"],
      ["間取り", "Madori", "tata letak ruangan", ["Kata 予算 berarti...", "anggaran", "sewa", "alamat", "kontrak"]],
    ],
    [
      ["ペットを飼ってもいい部屋はありますか。", "Petto o katte mo ii heya wa arimasu ka.", "Ada kamar yang boleh memelihara hewan?"],
      ["敷金と礼金はいくらですか。", "Shikikin to reikin wa ikura desu ka.", "Berapa uang jaminan dan uang terima kasihnya?"],
      ["一度部屋を見せていただけますか。", "Ichido heya o misete itadakemasu ka.", "Bisakah saya melihat kamarnya sekali?"],
      ["もう少し広い部屋を探しています。", "Mou sukoshi hiroi heya o sagashite imasu.", "Saya sedang mencari kamar yang sedikit lebih luas."],
    ],
  ],
  // 16. Aturan dan larangan
  [
    [
      ["ことになっている", "Koto ni natte iru", "aturannya adalah ..."],
      ["門限", "Mongen", "jam malam (batas pulang)"],
      ["寮", "Ryou", "asrama"],
      ["許可", "Kyoka", "izin", ["Pola untuk menjelaskan aturan yang berlaku adalah...", "〜ことになっています", "〜たことがあります", "〜ようと思います", "〜かもしれません"]],
    ],
    [
      ["この寮の門限は夜十一時です。", "Kono ryou no mongen wa yoru juuichiji desu.", "Jam malam asrama ini pukul sebelas malam."],
      ["部屋でたばこを吸ってはいけないことになっています。", "Heya de tabako o sutte wa ikenai koto ni natte imasu.", "Aturannya, tidak boleh merokok di kamar."],
      ["友達を泊めるときは、許可が必要です。", "Tomodachi o tomeru toki wa, kyoka ga hitsuyou desu.", "Kalau teman menginap, perlu izin."],
      ["洗濯機は夜九時までに使ってください。", "Sentakuki wa yoru kuji made ni tsukatte kudasai.", "Pakailah mesin cuci sebelum pukul sembilan malam."],
    ],
  ],
  // 17. Rencana masa depan
  [
    [
      ["つもりです", "Tsumori desu", "berniat"],
      ["ようと思っています", "You to omotte imasu", "sedang berniat"],
      ["夢", "Yume", "impian"],
      ["興味がある", "Kyoumi ga aru", "tertarik", ["Niat 'saya berniat melanjutkan kuliah' adalah...", "大学院に進むつもりです。", "大学院に進んだつもりです。", "大学院に進みつもりです。", "大学院に進むのつもりです。"]],
    ],
    [
      ["来年、日本の大学院に進むつもりです。", "Rainen, Nihon no daigakuin ni susumu tsumori desu.", "Tahun depan saya berniat melanjutkan ke pascasarjana di Jepang."],
      ["将来の夢は自分の店を持つことです。", "Shourai no yume wa jibun no mise o motsu koto desu.", "Impian saya di masa depan adalah punya toko sendiri."],
      ["料理の仕事に興味があります。", "Ryouri no shigoto ni kyoumi ga arimasu.", "Saya tertarik dengan pekerjaan di bidang masak."],
      ["お金を貯めて、世界を旅行しようと思っています。", "Okane o tamete, sekai o ryokou shiyou to omotte imasu.", "Saya berniat menabung lalu berkeliling dunia."],
    ],
  ],
  // 18. Basa-basi
  [
    [
      ["最近", "Saikin", "akhir-akhir ini"],
      ["相変わらず", "Aikawarazu", "seperti biasa"],
      ["週末", "Shuumatsu", "akhir pekan"],
      ["そうなんですか", "Sou nan desu ka", "oh, begitu ya?", ["Respons yang menunjukkan minat dalam basa-basi adalah...", "へえ、そうなんですか。", "いいえ、知りません。", "だめです。", "わかりません。"]],
    ],
    [
      ["最近、忙しいですか。", "Saikin, isogashii desu ka.", "Akhir-akhir ini sibuk?"],
      ["ええ、相変わらず忙しいです。", "Ee, aikawarazu isogashii desu.", "Ya, sibuk seperti biasa."],
      ["週末は何をしていましたか。", "Shuumatsu wa nani o shite imashita ka.", "Akhir pekan kamu melakukan apa?"],
      ["もうすぐ桜が咲きますね。", "Mousugu sakura ga sakimasu ne.", "Sebentar lagi sakura mekar, ya."],
    ],
  ],
  // 19. Pendapat dengan alasan
  [
    [
      ["賛成", "Sansei", "setuju"],
      ["反対", "Hantai", "tidak setuju / menentang"],
      ["確かに", "Tashika ni", "memang benar"],
      ["なぜなら", "Nazenara", "karena / sebab", ["Lawan kata 賛成 (setuju) adalah...", "反対", "相談", "賛美", "反省"]],
    ],
    [
      ["私はその意見に賛成です。", "Watashi wa sono iken ni sansei desu.", "Saya setuju dengan pendapat itu."],
      ["確かにそうですが、お金がかかると思います。", "Tashika ni sou desu ga, okane ga kakaru to omoimasu.", "Memang benar, tapi menurut saya butuh biaya."],
      ["私は反対です。時間が足りないからです。", "Watashi wa hantai desu. Jikan ga tarinai kara desu.", "Saya tidak setuju. Karena waktunya tidak cukup."],
      ["学校でスマホを使うのはいいと思います。", "Gakkou de sumaho o tsukau no wa ii to omoimasu.", "Menurut saya memakai ponsel di sekolah itu baik."],
    ],
  ],
  // 20. Ulasan speaking N4
  [
    [
      ["実は", "Jitsu wa", "sebenarnya"],
      ["ことになった", "Koto ni natta", "sudah diputuskan bahwa ..."],
      ["寂しくなる", "Sabishiku naru", "akan merasa kehilangan"],
      ["お世話になりました", "Osewa ni narimashita", "terima kasih atas bantuan selama ini", ["Ungkapan saat berpamitan setelah lama dibantu adalah...", "お世話になりました。", "いただきます。", "おかえりなさい。", "いらっしゃいませ。"]],
    ],
    [
      ["実は、来月から大阪の支店で働くことになりました。", "Jitsu wa, raigetsu kara Oosaka no shiten de hataraku koto ni narimashita.", "Sebenarnya, mulai bulan depan saya akan bekerja di cabang Osaka."],
      ["今まで本当にお世話になりました。", "Ima made hontou ni osewa ni narimashita.", "Terima kasih banyak atas bantuan selama ini."],
      ["向こうに行っても、連絡してくださいね。", "Mukou ni itte mo, renraku shite kudasai ne.", "Meskipun sudah ke sana, tetap kabari, ya."],
      ["送別会はいつがいいですか。", "Soubetsukai wa itsu ga ii desu ka.", "Pesta perpisahannya kapan yang cocok?"],
    ],
  ],
];
