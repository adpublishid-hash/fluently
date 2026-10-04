import type { JapaneseQuizTopic } from '../types';

// Latihan Grammar N5 — one entry per topic (index = topic - 1): [Basic, Advanced].
export const grammar: JapaneseQuizTopic[] = [
  // 1. Kalimat benda: です dan じゃありません
  [
    [
      ["学生です", "Gakusei desu", "(saya) pelajar"],
      ["会社員じゃありません", "Kaishain ja arimasen", "bukan karyawan perusahaan", ["Bentuk negatif sopan dari 学生です adalah...", "学生じゃありません", "学生くないです", "学生ませんです", "学生でしたじゃない"]],
      ["日本人ですか", "Nihonjin desu ka", "apakah orang Jepang?"],
      ["先生ではありません", "Sensei de wa arimasen", "bukan guru (formal)"],
    ],
    [
      ["私は大学の一年生です。", "Watashi wa daigaku no ichinensei desu.", "Saya mahasiswa tahun pertama."],
      ["リーさんは中国人じゃありません。韓国人です。", "Rii san wa Chuugokujin ja arimasen. Kankokujin desu.", "Lee bukan orang Tiongkok. Dia orang Korea."],
      ["それは日本語の本ですか。", "Sore wa Nihongo no hon desu ka.", "Apakah itu buku bahasa Jepang?", ["Partikel di akhir kalimat untuk membuat pertanyaan adalah...", "か", "ね", "よ", "を"]],
      ["明日は休みではありません。", "Ashita wa yasumi de wa arimasen.", "Besok bukan hari libur."],
    ],
  ],
  // 2. Topik は dan subjek が
  [
    [
      ["私は", "Watashi wa", "saya (sebagai topik)"],
      ["誰が", "Dare ga", "siapa (yang)", ["Setelah kata tanya seperti 誰 sebagai subjek, partikel yang dipakai adalah...", "が", "は", "を", "で"]],
      ["雨が", "Ame ga", "hujan (sebagai subjek)"],
      ["田中さんは", "Tanaka san wa", "Tanaka (sebagai topik)"],
    ],
    [
      ["この町は人が多いです。", "Kono machi wa hito ga ooi desu.", "Kota ini orangnya banyak."],
      ["何が好きですか。", "Nani ga suki desu ka.", "Kamu suka apa?"],
      ["私が行きます。", "Watashi ga ikimasu.", "Saya yang akan pergi.", ["Kalimat 私が行きます menekankan bahwa...", "sayalah (bukan orang lain) yang pergi", "saya tidak pergi", "saya sudah pergi", "saya ingin pergi"]],
      ["姉は髪が短いです。", "Ane wa kami ga mijikai desu.", "Kakak perempuan saya rambutnya pendek."],
    ],
  ],
  // 3. Penunjuk これ・それ・あれ
  [
    [
      ["これ", "Kore", "ini (dekat pembicara)"],
      ["それ", "Sore", "itu (dekat pendengar)"],
      ["あれ", "Are", "itu (jauh dari keduanya)", ["Sebelum kata benda (…buku), bentuk yang dipakai adalah...", "この本", "これ本", "これの本", "ここ本"]],
      ["どれ", "Dore", "yang mana"],
    ],
    [
      ["これは誰のかさですか。", "Kore wa dare no kasa desu ka.", "Ini payung siapa?"],
      ["あの建物は何ですか。", "Ano tatemono wa nan desu ka.", "Gedung itu apa?"],
      ["その時計は日本製です。", "Sono tokei wa Nihonsei desu.", "Jam itu buatan Jepang."],
      ["あなたのかばんはどれですか。", "Anata no kaban wa dore desu ka.", "Tasmu yang mana?"],
    ],
  ],
  // 4. Objek を dan kata kerja ます
  [
    [
      ["水を飲みます", "Mizu o nomimasu", "minum air"],
      ["新聞を読みます", "Shinbun o yomimasu", "membaca koran"],
      ["音楽を聞きます", "Ongaku o kikimasu", "mendengarkan musik"],
      ["料理を作りません", "Ryouri o tsukurimasen", "tidak memasak", ["Bentuk negatif sopan dari 飲みます adalah...", "飲みません", "飲みないです", "飲まないます", "飲みくない"]],
    ],
    [
      ["私は毎晩日本語を勉強します。", "Watashi wa maiban Nihongo o benkyou shimasu.", "Saya belajar bahasa Jepang setiap malam."],
      ["父は朝ご飯を食べません。", "Chichi wa asagohan o tabemasen.", "Ayah saya tidak sarapan."],
      ["週末に部屋を掃除します。", "Shuumatsu ni heya o souji shimasu.", "Akhir pekan saya membersihkan kamar."],
      ["弟はゲームをします。", "Otouto wa geemu o shimasu.", "Adik laki-laki saya bermain game.", ["Partikel penanda objek langsung adalah...", "を", "が", "に", "で"]],
    ],
  ],
  // 5. Partikel に dan で
  [
    [
      ["学校に行く", "Gakkou ni iku", "pergi ke sekolah"],
      ["六時に起きる", "Rokuji ni okiru", "bangun pukul enam"],
      ["公園で遊ぶ", "Kouen de asobu", "bermain di taman", ["Tempat terjadinya kegiatan ditandai dengan partikel...", "で", "に", "を", "が"]],
      ["ペンで書く", "Pen de kaku", "menulis dengan pulpen"],
    ],
    [
      ["私は毎日八時に家を出ます。", "Watashi wa mainichi hachiji ni ie o demasu.", "Setiap hari saya keluar rumah pukul delapan."],
      ["レストランで晩ご飯を食べました。", "Resutoran de bangohan o tabemashita.", "Saya makan malam di restoran."],
      ["日曜日に友達の家に行きます。", "Nichiyoubi ni tomodachi no ie ni ikimasu.", "Hari Minggu saya pergi ke rumah teman."],
      ["英語でメールを書きました。", "Eigo de meeru o kakimashita.", "Saya menulis email dalam bahasa Inggris.", ["で pada 英語で menunjukkan...", "alat / cara (dalam bahasa Inggris)", "tujuan", "waktu", "objek"]],
    ],
  ],
  // 6. Kata sifat い
  [
    [
      ["寒いです", "Samui desu", "dingin"],
      ["おいしくないです", "Oishikunai desu", "tidak enak"],
      ["いい天気", "Ii tenki", "cuaca yang bagus"],
      ["新しい車", "Atarashii kuruma", "mobil baru", ["Bentuk negatif dari いい (bagus) adalah...", "よくない", "いくない", "いいじゃない", "よいない"]],
    ],
    [
      ["このラーメンはとてもおいしいです。", "Kono raamen wa totemo oishii desu.", "Ramen ini sangat enak."],
      ["私の部屋はあまり広くないです。", "Watashi no heya wa amari hirokunai desu.", "Kamar saya tidak terlalu luas.", ["あまり biasanya dipasangkan dengan bentuk...", "negatif", "positif", "lampau positif", "ajakan"]],
      ["今日は暑くて、天気がいいです。", "Kyou wa atsukute, tenki ga ii desu.", "Hari ini panas dan cuacanya bagus."],
      ["それは高い時計ですね。", "Sore wa takai tokei desu ne.", "Itu jam yang mahal, ya."],
    ],
  ],
  // 7. Kata sifat な
  [
    [
      ["静かな公園", "Shizuka na kouen", "taman yang tenang"],
      ["元気です", "Genki desu", "sehat / bersemangat"],
      ["きれいじゃありません", "Kirei ja arimasen", "tidak bersih / tidak cantik", ["Sebelum kata benda, kata sifat な memakai...", "な (静かな町)", "い (静かい町)", "の (静かの町)", "tanpa apa pun (静か町)"]],
      ["好きな食べ物", "Suki na tabemono", "makanan kesukaan"],
    ],
    [
      ["京都はきれいな町です。", "Kyouto wa kirei na machi desu.", "Kyoto adalah kota yang indah."],
      ["この公園はにぎやかじゃありません。", "Kono kouen wa nigiyaka ja arimasen.", "Taman ini tidak ramai."],
      ["私の好きな季節は秋です。", "Watashi no suki na kisetsu wa aki desu.", "Musim kesukaan saya adalah musim gugur."],
      ["山田さんは親切な人です。", "Yamada san wa shinsetsu na hito desu.", "Yamada orang yang baik hati.", ["きれい meskipun berakhiran い termasuk kata sifat...", "な", "い", "kata kerja", "kata keterangan"]],
    ],
  ],
  // 8. Bentuk lampau ました dan でした
  [
    [
      ["行きました", "Ikimashita", "sudah pergi"],
      ["食べませんでした", "Tabemasen deshita", "tidak makan (lampau)"],
      ["楽しかったです", "Tanoshikatta desu", "(tadi) menyenangkan"],
      ["雨でした", "Ame deshita", "(tadi) hujan", ["Bentuk lampau dari 寒いです adalah...", "寒かったです", "寒いでした", "寒くでした", "寒いましたです"]],
    ],
    [
      ["先週、京都へ行きました。", "Senshuu, Kyouto e ikimashita.", "Minggu lalu saya pergi ke Kyoto."],
      ["昨日の試験は難しかったです。", "Kinou no shiken wa muzukashikatta desu.", "Ujian kemarin sulit."],
      ["今朝は何も食べませんでした。", "Kesa wa nani mo tabemasen deshita.", "Tadi pagi saya tidak makan apa pun."],
      ["子どものとき、町は静かでした。", "Kodomo no toki, machi wa shizuka deshita.", "Waktu saya kecil, kotanya tenang.", ["Bentuk lampau dari 静かです adalah...", "静かでした", "静かかったです", "静かました", "静くでした"]],
    ],
  ],
  // 9. Rentang から dan まで
  [
    [
      ["月曜日から", "Getsuyoubi kara", "mulai hari Senin"],
      ["五時まで", "Goji made", "sampai pukul lima"],
      ["東京から大阪まで", "Toukyou kara Oosaka made", "dari Tokyo sampai Osaka", ["Partikel untuk 'sampai' (batas akhir) adalah...", "まで", "から", "に", "で"]],
      ["駅まで", "Eki made", "sampai stasiun"],
    ],
    [
      ["店は朝十時から夜八時までです。", "Mise wa asa juuji kara yoru hachiji made desu.", "Toko buka dari pukul sepuluh pagi sampai pukul delapan malam."],
      ["家から学校まで自転車で行きます。", "Ie kara gakkou made jitensha de ikimasu.", "Saya pergi dari rumah ke sekolah naik sepeda."],
      ["テストは何時からですか。", "Tesuto wa nanji kara desu ka.", "Tesnya mulai pukul berapa?"],
      ["月曜日から金曜日まで働きます。", "Getsuyoubi kara kinyoubi made hatarakimasu.", "Saya bekerja dari Senin sampai Jumat."],
    ],
  ],
  // 10. Daftar benda と dan や
  [
    [
      ["パンと牛乳", "Pan to gyuunyuu", "roti dan susu"],
      ["本やノート", "Hon ya nooto", "buku, buku catatan, dan lain-lain", ["Beda と dan や: や dipakai untuk menyebut...", "sebagian contoh saja", "semua anggota daftar", "alasan", "waktu"]],
      ["母と", "Haha to", "bersama ibu"],
      ["犬や猫など", "Inu ya neko nado", "anjing, kucing, dan sebagainya"],
    ],
    [
      ["朝、パンと卵を食べました。", "Asa, pan to tamago o tabemashita.", "Pagi tadi saya makan roti dan telur."],
      ["部屋にベッドや机などがあります。", "Heya ni beddo ya tsukue nado ga arimasu.", "Di kamar ada tempat tidur, meja, dan lain-lain."],
      ["週末、家族と買い物に行きました。", "Shuumatsu, kazoku to kaimono ni ikimashita.", "Akhir pekan saya berbelanja bersama keluarga.", ["と pada 家族と berarti...", "bersama", "dan lain-lain", "dari", "sampai"]],
      ["冷蔵庫に野菜や果物が入っています。", "Reizouko ni yasai ya kudamono ga haitte imasu.", "Di kulkas ada sayur, buah, dan sebagainya."],
    ],
  ],
  // 11. Ajakan ませんか dan ましょう
  [
    [
      ["行きませんか", "Ikimasen ka", "maukah pergi (bersama)?"],
      ["帰りましょう", "Kaerimashou", "ayo pulang"],
      ["一緒に", "Issho ni", "bersama-sama"],
      ["始めましょうか", "Hajimemashou ka", "bagaimana kalau kita mulai?", ["Ajakan yang paling halus adalah...", "映画を見ませんか。", "映画を見ましょう。", "映画を見ます。", "映画を見てください。"]],
    ],
    [
      ["今晩、一緒に映画を見ませんか。", "Konban, issho ni eiga o mimasen ka.", "Malam ini, maukah menonton film bersama?"],
      ["ええ、見ましょう。", "Ee, mimashou.", "Ya, ayo kita menonton."],
      ["駅の前で会いましょう。", "Eki no mae de aimashou.", "Mari bertemu di depan stasiun."],
      ["暑いですね。何か飲みませんか。", "Atsui desu ne. Nanika nomimasen ka.", "Panas, ya. Mau minum sesuatu?", ["Jawaban menerima ajakan 飲みませんか adalah...", "ええ、飲みましょう。", "いいえ、飲みました。", "飲みません。どうぞ。", "飲んではいけません。"]],
    ],
  ],
  // 12. Keinginan たいです
  [
    [
      ["行きたい", "Ikitai", "ingin pergi"],
      ["見たいです", "Mitai desu", "ingin melihat"],
      ["買いたくない", "Kaitakunai", "tidak ingin membeli", ["Bentuk たい dari 食べます adalah...", "食べたい", "食べるたい", "食べてたい", "食べったい"]],
      ["休みたいです", "Yasumitai desu", "ingin beristirahat"],
    ],
    [
      ["新しいパソコンが欲しいです。", "Atarashii pasokon ga hoshii desu.", "Saya ingin komputer baru."],
      ["夏休みに北海道へ行きたいです。", "Natsuyasumi ni Hokkaidou e ikitai desu.", "Saya ingin pergi ke Hokkaido saat liburan musim panas."],
      ["今日は疲れたから、早く寝たいです。", "Kyou wa tsukareta kara, hayaku netai desu.", "Hari ini lelah, jadi saya ingin tidur lebih awal."],
      ["将来、何になりたいですか。", "Shourai, nani ni naritai desu ka.", "Di masa depan kamu ingin menjadi apa?"],
    ],
  ],
  // 13. Permintaan てください
  [
    [
      ["見てください", "Mite kudasai", "tolong lihat"],
      ["来てください", "Kite kudasai", "tolong datang"],
      ["座ってください", "Suwatte kudasai", "silakan duduk"],
      ["教えてください", "Oshiete kudasai", "tolong ajari / beri tahu", ["Bentuk て dari 書きます adalah...", "書いて", "書きて", "書って", "書んで"]],
    ],
    [
      ["この漢字の読み方を教えてください。", "Kono kanji no yomikata o oshiete kudasai.", "Tolong beri tahu cara membaca kanji ini."],
      ["明日、九時に来てください。", "Ashita, kuji ni kite kudasai.", "Besok tolong datang pukul sembilan."],
      ["すみません、塩を取ってください。", "Sumimasen, shio o totte kudasai.", "Maaf, tolong ambilkan garam."],
      ["ここで靴を脱いでください。", "Koko de kutsu o nuide kudasai.", "Tolong lepas sepatu di sini.", ["Bentuk て dari 脱ぎます adalah...", "脱いで", "脱いて", "脱って", "脱んで"]],
    ],
  ],
  // 14. Izin てもいいです
  [
    [
      ["入ってもいい", "Haitte mo ii", "boleh masuk"],
      ["使ってもいいですか", "Tsukatte mo ii desu ka", "bolehkah saya memakai?"],
      ["帰ってもいいです", "Kaette mo ii desu", "boleh pulang"],
      ["食べてもいい", "Tabete mo ii", "boleh makan", ["Jawaban 'ya, silakan' untuk てもいいですか adalah...", "はい、どうぞ。", "いいえ、どうぞ。", "はい、いけません。", "すみません、ください。"]],
    ],
    [
      ["この辞書を使ってもいいですか。", "Kono jisho o tsukatte mo ii desu ka.", "Bolehkah saya memakai kamus ini?"],
      ["ええ、どうぞ使ってください。", "Ee, douzo tsukatte kudasai.", "Ya, silakan dipakai."],
      ["テストのとき、辞書を見てもいいです。", "Tesuto no toki, jisho o mite mo ii desu.", "Saat tes, boleh melihat kamus."],
      ["ちょっと早く帰ってもいいですか。", "Chotto hayaku kaette mo ii desu ka.", "Bolehkah saya pulang sedikit lebih awal?"],
    ],
  ],
  // 15. Larangan てはいけません
  [
    [
      ["入ってはいけません", "Haitte wa ikemasen", "tidak boleh masuk"],
      ["話してはいけない", "Hanashite wa ikenai", "tidak boleh berbicara"],
      ["忘れてはいけません", "Wasurete wa ikemasen", "tidak boleh lupa"],
      ["走ってはいけない", "Hashitte wa ikenai", "tidak boleh berlari", ["Larangan 'tidak boleh merokok' adalah...", "たばこを吸ってはいけません。", "たばこを吸ってもいいです。", "たばこを吸ってください。", "たばこを吸いたいです。"]],
    ],
    [
      ["図書館で大きい声で話してはいけません。", "Toshokan de ookii koe de hanashite wa ikemasen.", "Di perpustakaan tidak boleh berbicara dengan suara keras."],
      ["廊下を走ってはいけません。", "Rouka o hashitte wa ikemasen.", "Tidak boleh berlari di lorong."],
      ["宿題を忘れてはいけませんよ。", "Shukudai o wasurete wa ikemasen yo.", "Jangan lupa PR-nya, ya."],
      ["この部屋に入ってはいけません。", "Kono heya ni haitte wa ikemasen.", "Tidak boleh masuk ke kamar ini."],
    ],
  ],
  // 16. Keberadaan あります dan います
  [
    [
      ["猫がいます", "Neko ga imasu", "ada kucing"],
      ["本があります", "Hon ga arimasu", "ada buku", ["Untuk keberadaan hewan (anjing), kata kerjanya adalah...", "います", "あります", "です", "します"]],
      ["誰もいません", "Dare mo imasen", "tidak ada siapa pun"],
      ["何もありません", "Nani mo arimasen", "tidak ada apa pun"],
    ],
    [
      ["机の上に辞書があります。", "Tsukue no ue ni jisho ga arimasu.", "Di atas meja ada kamus."],
      ["教室に先生がいます。", "Kyoushitsu ni sensei ga imasu.", "Di ruang kelas ada guru."],
      ["部屋には誰もいません。", "Heya ni wa dare mo imasen.", "Di kamar tidak ada siapa pun."],
      ["駅の近くにコンビニがありますか。", "Eki no chikaku ni konbini ga arimasu ka.", "Apakah ada minimarket di dekat stasiun?"],
    ],
  ],
  // 17. Kemampuan ができます
  [
    [
      ["日本語ができます", "Nihongo ga dekimasu", "bisa bahasa Jepang"],
      ["料理ができません", "Ryouri ga dekimasen", "tidak bisa memasak"],
      ["泳ぐことができる", "Oyogu koto ga dekiru", "bisa berenang", ["Pola kemampuan yang benar adalah...", "泳ぐことができます", "泳ぎことができます", "泳いでことができます", "泳ぐをできます"]],
      ["スキーができる", "Sukii ga dekiru", "bisa bermain ski"],
    ],
    [
      ["私は英語と日本語ができます。", "Watashi wa Eigo to Nihongo ga dekimasu.", "Saya bisa bahasa Inggris dan bahasa Jepang."],
      ["兄は車を運転することができます。", "Ani wa kuruma o unten suru koto ga dekimasu.", "Kakak laki-laki saya bisa menyetir mobil."],
      ["このカードで買い物ができますか。", "Kono kaado de kaimono ga dekimasu ka.", "Apakah bisa berbelanja dengan kartu ini?"],
      ["まだ漢字を書くことができません。", "Mada kanji o kaku koto ga dekimasen.", "Saya belum bisa menulis kanji."],
    ],
  ],
  // 18. Alasan dengan から
  [
    [
      ["雨ですから", "Ame desu kara", "karena hujan"],
      ["忙しいから", "Isogashii kara", "karena sibuk"],
      ["どうして", "Doushite", "mengapa", ["Dalam pola alasan から, alasannya diletakkan...", "sebelum から", "setelah から", "di akhir kalimat", "sebelum subjek"]],
      ["眠いから", "Nemui kara", "karena mengantuk"],
    ],
    [
      ["雨ですから、今日は出かけません。", "Ame desu kara, kyou wa dekakemasen.", "Karena hujan, hari ini saya tidak keluar."],
      ["お金がないから、何も買いません。", "Okane ga nai kara, nani mo kaimasen.", "Karena tidak punya uang, saya tidak membeli apa pun."],
      ["どうして昨日来ませんでしたか。", "Doushite kinou kimasen deshita ka.", "Mengapa kemarin kamu tidak datang?"],
      ["熱があったからです。", "Netsu ga atta kara desu.", "Karena saya demam.", ["Jawaban alasan biasanya diakhiri dengan...", "〜からです", "〜までです", "〜ませんか", "〜ましょう"]],
    ],
  ],
  // 19. Pendapat sederhana と思います
  [
    [
      ["高いと思う", "Takai to omou", "menurut saya mahal"],
      ["来ると思います", "Kuru to omoimasu", "saya pikir (dia) akan datang"],
      ["便利だと思う", "Benri da to omou", "menurut saya praktis", ["Kata benda/kata sifat な sebelum と思います memakai...", "だ (便利だと思います)", "です (便利ですと思います)", "な (便利なと思います)", "の (便利のと思います)"]],
      ["そう思います", "Sou omoimasu", "saya pikir begitu"],
    ],
    [
      ["日本の電車は便利だと思います。", "Nihon no densha wa benri da to omoimasu.", "Menurut saya kereta di Jepang praktis."],
      ["田中さんはもう帰ったと思います。", "Tanaka san wa mou kaetta to omoimasu.", "Saya pikir Tanaka sudah pulang."],
      ["このケーキはちょっと甘すぎると思います。", "Kono keeki wa chotto amasugiru to omoimasu.", "Menurut saya kue ini agak terlalu manis."],
      ["明日はたぶん晴れると思います。", "Ashita wa tabun hareru to omoimasu.", "Saya pikir besok mungkin cerah."],
    ],
  ],
  // 20. Ulasan grammar N5
  [
    [
      ["電車で", "Densha de", "naik kereta"],
      ["友達と", "Tomodachi to", "bersama teman"],
      ["九時から", "Kuji kara", "mulai pukul sembilan"],
      ["駅に", "Eki ni", "ke stasiun", ["Partikel yang tepat: 毎朝七時＿起きます。", "に", "で", "を", "が"]],
    ],
    [
      ["私は毎朝六時に起きて、ジョギングをします。", "Watashi wa maiasa rokuji ni okite, jogingu o shimasu.", "Setiap pagi saya bangun pukul enam lalu jogging."],
      ["昨日は雨でしたから、家で本を読みました。", "Kinou wa ame deshita kara, ie de hon o yomimashita.", "Kemarin hujan, jadi saya membaca buku di rumah."],
      ["この店のケーキは安くておいしいです。", "Kono mise no keeki wa yasukute oishii desu.", "Kue di toko ini murah dan enak."],
      ["週末、一緒に動物園へ行きませんか。", "Shuumatsu, issho ni doubutsuen e ikimasen ka.", "Akhir pekan ini, maukah pergi ke kebun binatang bersama?"],
    ],
  ],
];
