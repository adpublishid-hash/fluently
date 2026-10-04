import type { JapaneseQuizTopic } from '../types';

// Latihan Speaking N5 — one entry per topic (index = topic - 1): [Basic, Advanced].
export const speaking: JapaneseQuizTopic[] = [
  // 1. Memperkenalkan diri
  [
    [
      ["はじめまして", "Hajimemashite", "senang berkenalan (pertama kali)"],
      ["お名前は", "Onamae wa", "namanya siapa?"],
      ["お国はどちらですか", "Okuni wa dochira desu ka", "Anda berasal dari negara mana?"],
      ["よろしくお願いします", "Yoroshiku onegaishimasu", "mohon bantuannya / salam kenal", ["Ungkapan penutup perkenalan diri adalah...", "よろしくお願いします", "いただきます", "おやすみなさい", "いってきます"]],
    ],
    [
      ["はじめまして。私はアンディと申します。", "Hajimemashite. Watashi wa Andi to moushimasu.", "Senang berkenalan. Nama saya Andi."],
      ["インドネシアのバンドンから来ました。", "Indoneshia no Bandon kara kimashita.", "Saya datang dari Bandung, Indonesia."],
      ["大学で日本語を勉強しています。", "Daigaku de Nihongo o benkyou shite imasu.", "Saya belajar bahasa Jepang di universitas."],
      ["趣味はサッカーです。どうぞよろしく。", "Shumi wa sakkaa desu. Douzo yoroshiku.", "Hobi saya sepak bola. Salam kenal.", ["と申します adalah bentuk yang lebih sopan dari...", "〜です (menyebut nama)", "〜ました", "〜ください", "〜ません"]],
    ],
  ],
  // 2. Salam sehari-hari
  [
    [
      ["こんにちは", "Konnichiwa", "selamat siang / halo"],
      ["こんばんは", "Konbanwa", "selamat malam (sapaan)"],
      ["おやすみなさい", "Oyasuminasai", "selamat tidur", ["Salam saat bertemu di malam hari adalah...", "こんばんは", "おやすみなさい", "おはようございます", "さようなら"]],
      ["さようなら", "Sayounara", "selamat tinggal"],
    ],
    [
      ["山田さん、こんにちは。", "Yamada san, konnichiwa.", "Halo, Yamada."],
      ["お久しぶりです。お元気でしたか。", "Ohisashiburi desu. Ogenki deshita ka.", "Lama tidak bertemu. Apa kabar selama ini?"],
      ["おかげさまで、元気です。", "Okagesama de, genki desu.", "Berkat doamu, saya baik-baik saja."],
      ["では、また来週会いましょう。", "De wa, mata raishuu aimashou.", "Kalau begitu, mari bertemu lagi minggu depan."],
    ],
  ],
  // 3. Memesan makanan
  [
    [
      ["メニュー", "Menyuu", "menu"],
      ["お水をください", "Omizu o kudasai", "minta air"],
      ["お会計", "Okaikei", "tagihan / pembayaran"],
      ["いただきます", "Itadakimasu", "selamat makan (sebelum makan)", ["Ungkapan setelah selesai makan adalah...", "ごちそうさまでした", "いただきます", "いらっしゃいませ", "お願いします"]],
    ],
    [
      ["すみません、注文をお願いします。", "Sumimasen, chuumon o onegaishimasu.", "Permisi, saya mau memesan."],
      ["カレーライスとサラダをください。", "Karee raisu to sarada o kudasai.", "Minta kari nasi dan salad."],
      ["私も同じものにします。", "Watashi mo onaji mono ni shimasu.", "Saya juga pesan yang sama."],
      ["お会計をお願いします。", "Okaikei o onegaishimasu.", "Minta tagihannya."],
    ],
  ],
  // 4. Menanyakan harga
  [
    [
      ["いくら", "Ikura", "berapa (harga)"],
      ["全部で", "Zenbu de", "semuanya / totalnya"],
      ["千円", "Senen", "seribu yen"],
      ["安いですね", "Yasui desu ne", "murah, ya", ["Untuk menanyakan total harga, kamu bilang...", "全部でいくらですか", "何時ですか", "どこですか", "誰のですか"]],
    ],
    [
      ["このりんごは一つ百円です。", "Kono ringo wa hitotsu hyakuen desu.", "Apel ini seratus yen per buah."],
      ["全部でいくらになりますか。", "Zenbu de ikura ni narimasu ka.", "Semuanya jadi berapa?"],
      ["三千五百円になります。", "Sanzen gohyakuen ni narimasu.", "Totalnya tiga ribu lima ratus yen."],
      ["もう少し安いのはありますか。", "Mou sukoshi yasui no wa arimasu ka.", "Ada yang sedikit lebih murah?"],
    ],
  ],
  // 5. Menanyakan jam
  [
    [
      ["何時", "Nanji", "jam berapa"],
      ["九時半", "Kuji han", "pukul setengah sepuluh"],
      ["七時十五分", "Shichiji juugofun", "pukul tujuh lewat lima belas", ["Bacaan 四時 (pukul empat) adalah...", "yoji", "shiji", "yonji", "yonjikan"]],
      ["午前", "Gozen", "pagi (a.m.)"],
    ],
    [
      ["映画は何時に始まりますか。", "Eiga wa nanji ni hajimarimasu ka.", "Filmnya mulai jam berapa?"],
      ["午後二時から始まります。", "Gogo niji kara hajimarimasu.", "Mulai pukul dua siang."],
      ["今、ちょうど十二時です。", "Ima, choudo juuniji desu.", "Sekarang tepat pukul dua belas."],
      ["銀行は何時までですか。", "Ginkou wa nanji made desu ka.", "Bank buka sampai jam berapa?"],
    ],
  ],
  // 6. Rutinitas harian
  [
    [
      ["毎朝", "Maiasa", "setiap pagi"],
      ["それから", "Sorekara", "setelah itu"],
      ["顔を洗う", "Kao o arau", "mencuci muka"],
      ["家を出る", "Ie o deru", "keluar rumah", ["Kata penghubung untuk 'setelah itu' adalah...", "それから", "でも", "だから", "じゃ"]],
    ],
    [
      ["私はいつも七時に朝ご飯を食べます。", "Watashi wa itsumo shichiji ni asagohan o tabemasu.", "Saya selalu sarapan pukul tujuh."],
      ["学校から帰って、宿題をします。", "Gakkou kara kaette, shukudai o shimasu.", "Setelah pulang sekolah, saya mengerjakan PR."],
      ["晩ご飯の後で、テレビを見ます。", "Bangohan no ato de, terebi o mimasu.", "Setelah makan malam, saya menonton TV."],
      ["寝る前に、少し本を読みます。", "Neru mae ni, sukoshi hon o yomimasu.", "Sebelum tidur, saya membaca buku sebentar."],
    ],
  ],
  // 7. Suka dan tidak suka
  [
    [
      ["好きです", "Suki desu", "suka"],
      ["嫌いです", "Kirai desu", "tidak suka / benci"],
      ["大好き", "Daisuki", "sangat suka"],
      ["あまり好きじゃない", "Amari suki ja nai", "kurang suka", ["Benda yang disukai ditandai dengan partikel...", "が (すしが好きです)", "を (すしを好きです)", "で (すしで好きです)", "に (すしに好きです)"]],
    ],
    [
      ["私は甘いものが大好きです。", "Watashi wa amai mono ga daisuki desu.", "Saya sangat suka makanan manis."],
      ["兄は野菜が嫌いです。", "Ani wa yasai ga kirai desu.", "Kakak laki-laki saya tidak suka sayur."],
      ["どんな音楽が好きですか。", "Donna ongaku ga suki desu ka.", "Musik seperti apa yang kamu suka?"],
      ["ロックはあまり好きじゃありません。", "Rokku wa amari suki ja arimasen.", "Saya kurang suka musik rock."],
    ],
  ],
  // 8. Mengajak teman
  [
    [
      ["遊びに行きませんか", "Asobi ni ikimasen ka", "mau pergi main?"],
      ["いいですね", "Ii desu ne", "boleh juga / bagus"],
      ["ちょっと…", "Chotto...", "agak... (menolak halus)", ["Cara menolak ajakan dengan halus adalah...", "すみません、ちょっと…。", "いいですね。", "ぜひ行きましょう。", "はい、行きます。"]],
      ["ぜひ", "Zehi", "tentu saja / pasti"],
    ],
    [
      ["明日、一緒に昼ご飯を食べに行きませんか。", "Ashita, issho ni hirugohan o tabe ni ikimasen ka.", "Besok, mau pergi makan siang bersama?"],
      ["いいですね。どこで会いましょうか。", "Ii desu ne. Doko de aimashou ka.", "Boleh juga. Kita bertemu di mana?"],
      ["すみません、明日はアルバイトがあります。", "Sumimasen, ashita wa arubaito ga arimasu.", "Maaf, besok saya ada kerja paruh waktu."],
      ["じゃ、また今度誘ってください。", "Ja, mata kondo sasotte kudasai.", "Kalau begitu, ajak saya lagi lain kali."],
    ],
  ],
  // 9. Berbelanja di toko
  [
    [
      ["いらっしゃいませ", "Irasshaimase", "selamat datang (di toko)"],
      ["これをください", "Kore o kudasai", "saya ambil ini"],
      ["見せてください", "Misete kudasai", "tolong perlihatkan"],
      ["袋", "Fukuro", "kantong plastik", ["Untuk meminta melihat barang, kamu bilang...", "それを見せてください。", "それを食べてください。", "それを書いてください。", "それを読んでください。"]],
    ],
    [
      ["すみません、あのかばんを見せてください。", "Sumimasen, ano kaban o misete kudasai.", "Permisi, tolong perlihatkan tas itu."],
      ["もう少し大きいサイズはありますか。", "Mou sukoshi ookii saizu wa arimasu ka.", "Ada ukuran yang sedikit lebih besar?"],
      ["袋はいりません。", "Fukuro wa irimasen.", "Saya tidak perlu kantong."],
      ["この色、とてもいいですね。", "Kono iro, totemo ii desu ne.", "Warna ini bagus sekali, ya."],
    ],
  ],
  // 10. Menanyakan arah
  [
    [
      ["まっすぐ行く", "Massugu iku", "jalan lurus"],
      ["右", "Migi", "kanan"],
      ["左", "Hidari", "kiri"],
      ["信号", "Shingou", "lampu lalu lintas", ["Untuk 'belok kiri', kamu bilang...", "左に曲がってください", "右に曲がってください", "まっすぐ行ってください", "止まってください"]],
    ],
    [
      ["すみません、駅はどこですか。", "Sumimasen, eki wa doko desu ka.", "Permisi, stasiun di mana?"],
      ["あの信号を左に曲がってください。", "Ano shingou o hidari ni magatte kudasai.", "Silakan belok kiri di lampu lalu lintas itu."],
      ["銀行の隣にあります。", "Ginkou no tonari ni arimasu.", "Ada di sebelah bank."],
      ["ここから歩いて五分ぐらいです。", "Koko kara aruite gofun gurai desu.", "Dari sini sekitar lima menit berjalan kaki."],
    ],
  ],
  // 11. Bercerita tentang keluarga
  [
    [
      ["家族", "Kazoku", "keluarga"],
      ["何人家族", "Nannin kazoku", "keluarga berapa orang"],
      ["お兄さん", "Oniisan", "kakak laki-laki (orang lain)"],
      ["一人っ子", "Hitorikko", "anak tunggal", ["Saat menanyakan kakak laki-laki orang lain, kamu memakai...", "お兄さん", "兄", "弟", "お父さん"]],
    ],
    [
      ["私は五人家族です。", "Watashi wa gonin kazoku desu.", "Keluarga saya lima orang."],
      ["父は会社員で、母は先生です。", "Chichi wa kaishain de, haha wa sensei desu.", "Ayah saya karyawan, ibu saya guru."],
      ["お姉さんはどこに住んでいますか。", "Oneesan wa doko ni sunde imasu ka.", "Kakak perempuanmu tinggal di mana?"],
      ["私は一人っ子で、兄弟がいません。", "Watashi wa hitorikko de, kyoudai ga imasen.", "Saya anak tunggal, tidak punya saudara."],
    ],
  ],
  // 12. Hobi
  [
    [
      ["趣味は", "Shumi wa", "hobinya..."],
      ["映画を見ること", "Eiga o miru koto", "menonton film"],
      ["サッカー", "Sakkaa", "sepak bola"],
      ["よく", "Yoku", "sering", ["Untuk mengubah kata kerja menjadi hobi, ditambahkan...", "こと (見ること)", "もの (見るもの)", "ところ (見るところ)", "から (見るから)"]],
    ],
    [
      ["私の趣味は料理をすることです。", "Watashi no shumi wa ryouri o suru koto desu.", "Hobi saya memasak."],
      ["週末はよく友達とサッカーをします。", "Shuumatsu wa yoku tomodachi to sakkaa o shimasu.", "Akhir pekan saya sering bermain sepak bola dengan teman."],
      ["どんな映画をよく見ますか。", "Donna eiga o yoku mimasu ka.", "Film seperti apa yang sering kamu tonton?"],
      ["アニメの映画が一番好きです。", "Anime no eiga ga ichiban suki desu.", "Saya paling suka film anime."],
    ],
  ],
  // 13. Obrolan cuaca
  [
    [
      ["暑いですね", "Atsui desu ne", "panas, ya"],
      ["寒いですね", "Samui desu ne", "dingin, ya"],
      ["天気", "Tenki", "cuaca"],
      ["そうですね", "Sou desu ne", "benar juga / iya, ya", ["Respons setuju yang umum dalam obrolan cuaca adalah...", "そうですね。", "いいえ、違います。", "すみません。", "いただきます。"]],
    ],
    [
      ["今日はずいぶん寒いですね。", "Kyou wa zuibun samui desu ne.", "Hari ini dingin sekali, ya."],
      ["ええ、雪が降りそうですね。", "Ee, yuki ga furisou desu ne.", "Iya, sepertinya akan turun salju."],
      ["明日の天気はどうですか。", "Ashita no tenki wa dou desu ka.", "Bagaimana cuaca besok?"],
      ["雨が降るから、傘を持って行ってください。", "Ame ga furu kara, kasa o motte itte kudasai.", "Karena akan hujan, bawalah payung."],
    ],
  ],
  // 14. Bicara tentang sekolah
  [
    [
      ["科目", "Kamoku", "mata pelajaran"],
      ["数学", "Suugaku", "matematika"],
      ["得意", "Tokui", "pandai / mahir"],
      ["苦手", "Nigate", "lemah / tidak pandai", ["Lawan kata 得意 (pandai) adalah...", "苦手", "上手", "好き", "大切"]],
    ],
    [
      ["私は歴史が得意です。", "Watashi wa rekishi ga tokui desu.", "Saya pandai pelajaran sejarah."],
      ["理科はちょっと苦手です。", "Rika wa chotto nigate desu.", "Saya agak lemah di pelajaran IPA."],
      ["学校まで何で来ますか。", "Gakkou made nan de kimasu ka.", "Kamu datang ke sekolah naik apa?"],
      ["授業の後で、クラブに行きます。", "Jugyou no ato de, kurabu ni ikimasu.", "Setelah pelajaran, saya pergi ke klub."],
    ],
  ],
  // 15. Percakapan kerja dasar
  [
    [
      ["お先に", "Osaki ni", "(saya) duluan"],
      ["お疲れさまです", "Otsukaresama desu", "terima kasih atas kerja kerasnya"],
      ["失礼します", "Shitsurei shimasu", "permisi"],
      ["会議", "Kaigi", "rapat", ["Ungkapan saat masuk ke ruangan atasan adalah...", "失礼します。", "いただきます。", "おやすみなさい。", "ただいま。"]],
    ],
    [
      ["部長、今よろしいですか。", "Buchou, ima yoroshii desu ka.", "Pak manajer, apakah sekarang ada waktu?"],
      ["この書類を見てください。", "Kono shorui o mite kudasai.", "Tolong lihat dokumen ini."],
      ["会議は三時からです。", "Kaigi wa sanji kara desu.", "Rapatnya mulai pukul tiga."],
      ["今日は先に帰ってもいいですか。", "Kyou wa saki ni kaette mo ii desu ka.", "Bolehkah hari ini saya pulang duluan?"],
    ],
  ],
  // 16. Ungkapan saat bepergian
  [
    [
      ["切符売り場", "Kippu uriba", "loket tiket"],
      ["何番線", "Nanbansen", "jalur nomor berapa"],
      ["乗り換え", "Norikae", "ganti kereta / transit"],
      ["片道", "Katamichi", "sekali jalan", ["Kata untuk 'pulang-pergi' adalah...", "往復", "片道", "乗り換え", "切符"]],
    ],
    [
      ["新宿までの切符を一枚ください。", "Shinjuku made no kippu o ichimai kudasai.", "Minta satu tiket sampai Shinjuku."],
      ["この電車は東京駅に止まりますか。", "Kono densha wa Toukyou eki ni tomarimasu ka.", "Apakah kereta ini berhenti di Stasiun Tokyo?"],
      ["どこで乗り換えますか。", "Doko de norikaemasu ka.", "Di mana saya harus ganti kereta?"],
      ["次の駅で降りてください。", "Tsugi no eki de orite kudasai.", "Silakan turun di stasiun berikutnya."],
    ],
  ],
  // 17. Meminta maaf
  [
    [
      ["すみません", "Sumimasen", "maaf / permisi"],
      ["ごめんなさい", "Gomennasai", "maaf (akrab)"],
      ["申し訳ありません", "Moushiwake arimasen", "mohon maaf (sangat formal)", ["Permintaan maaf paling formal adalah...", "申し訳ありません", "ごめんね", "すみません", "ごめんなさい"]],
      ["大丈夫です", "Daijoubu desu", "tidak apa-apa"],
    ],
    [
      ["約束を忘れて、ごめんなさい。", "Yakusoku o wasurete, gomennasai.", "Maaf, saya lupa janjinya."],
      ["お待たせして、すみません。", "Omatase shite, sumimasen.", "Maaf membuatmu menunggu."],
      ["気にしないでください。", "Ki ni shinaide kudasai.", "Jangan dipikirkan."],
      ["本当に申し訳ありませんでした。", "Hontou ni moushiwake arimasen deshita.", "Saya sungguh-sungguh mohon maaf."],
    ],
  ],
  // 18. Berterima kasih
  [
    [
      ["ありがとう", "Arigatou", "terima kasih (akrab)"],
      ["どういたしまして", "Douitashimashite", "sama-sama"],
      ["おかげで", "Okage de", "berkat (bantuanmu)"],
      ["助かりました", "Tasukarimashita", "sangat membantu", ["Ucapan terima kasih untuk bantuan yang sudah selesai adalah...", "ありがとうございました", "ありがとうございます", "どういたしまして", "すみませんでした"]],
    ],
    [
      ["手伝ってくれて、ありがとう。", "Tetsudatte kurete, arigatou.", "Terima kasih sudah membantu."],
      ["本当に助かりました。", "Hontou ni tasukarimashita.", "Sungguh sangat membantu."],
      ["先生のおかげで、試験に合格しました。", "Sensei no okage de, shiken ni goukaku shimashita.", "Berkat Bapak/Ibu guru, saya lulus ujian."],
      ["素敵なプレゼントをありがとうございます。", "Suteki na purezento o arigatou gozaimasu.", "Terima kasih atas hadiah yang indah."],
    ],
  ],
  // 19. Pendapat sederhana
  [
    [
      ["どう思いますか", "Dou omoimasu ka", "bagaimana menurutmu?"],
      ["いいと思います", "Ii to omoimasu", "menurut saya bagus"],
      ["おもしろい", "Omoshiroi", "menarik / lucu"],
      ["つまらない", "Tsumaranai", "membosankan", ["Lawan kata おもしろい (menarik) adalah...", "つまらない", "たのしい", "むずかしい", "やさしい"]],
    ],
    [
      ["この映画はおもしろいと思います。", "Kono eiga wa omoshiroi to omoimasu.", "Menurut saya film ini menarik."],
      ["私は東京より京都が好きです。", "Watashi wa Toukyou yori Kyouto ga suki desu.", "Saya lebih suka Kyoto daripada Tokyo."],
      ["その考えはいいと思います。", "Sono kangae wa ii to omoimasu.", "Menurut saya ide itu bagus."],
      ["この本はちょっと難しいと思います。", "Kono hon wa chotto muzukashii to omoimasu.", "Menurut saya buku ini agak sulit."],
    ],
  ],
  // 20. Ulasan speaking N5
  [
    [
      ["もう一度", "Mou ichido", "sekali lagi"],
      ["ゆっくり", "Yukkuri", "pelan-pelan"],
      ["わかりません", "Wakarimasen", "saya tidak mengerti"],
      ["どういう意味", "Dou iu imi", "apa artinya", ["Saat tidak mengerti, kamu meminta...", "もう一度お願いします。", "いただきます。", "失礼しました。", "おやすみなさい。"]],
    ],
    [
      ["すみません、もう少しゆっくり話してください。", "Sumimasen, mou sukoshi yukkuri hanashite kudasai.", "Maaf, tolong bicara sedikit lebih pelan."],
      ["「おみやげ」はどういう意味ですか。", "\"Omiyage\" wa dou iu imi desu ka.", "Apa arti 'omiyage'?"],
      ["日本語で何と言いますか。", "Nihongo de nan to iimasu ka.", "Dalam bahasa Jepang disebut apa?"],
      ["今日はありがとう。また話しましょう。", "Kyou wa arigatou. Mata hanashimashou.", "Terima kasih untuk hari ini. Mari mengobrol lagi."],
    ],
  ],
];
