import type { JapaneseQuizTopic } from '../types';

// Latihan Pronunciation N5 — one entry per topic (index = topic - 1): [Basic, Advanced].
export const pronunciation: JapaneseQuizTopic[] = [
  // 1. Ritme mora
  [
    [
      ["にほん", "Nihon", "Jepang (3 mora)", ["Berapa mora dalam にほん?", "3", "2", "4", "5"]],
      ["きもの", "Kimono", "kimono (3 mora)"],
      ["ひらがな", "Hiragana", "hiragana (4 mora)"],
      ["とうきょう", "Toukyou", "Tokyo (4 mora)"],
    ],
    [
      ["にほんごを べんきょうします。", "Nihongo o benkyou shimasu.", "Saya belajar bahasa Jepang."],
      ["とうきょうは おおきい まちです。", "Toukyou wa ookii machi desu.", "Tokyo adalah kota besar.", ["Kata とうきょう terdiri dari berapa mora?", "4", "2", "3", "5"]],
      ["きものを きて しゃしんを とりました。", "Kimono o kite shashin o torimashita.", "Saya memakai kimono dan berfoto."],
      ["みなさん、さようなら。", "Minasan, sayounara.", "Semuanya, selamat tinggal."],
    ],
  ],
  // 2. Lima vokal a i u e o
  [
    [
      ["あお", "Ao", "biru (nuansa hijau-biru)"],
      ["いけ", "Ike", "kolam"],
      ["うみ", "Umi", "laut", ["Vokal u dalam bahasa Jepang diucapkan dengan bibir...", "tidak dibulatkan", "sangat dibulatkan", "terbuka lebar", "ditarik ke bawah"]],
      ["えき", "Eki", "stasiun"],
    ],
    [
      ["あおい うみが みえます。", "Aoi umi ga miemasu.", "Laut biru terlihat."],
      ["いえの まえに いけが あります。", "Ie no mae ni ike ga arimasu.", "Di depan rumah ada kolam."],
      ["えきで ともだちを まちます。", "Eki de tomodachi o machimasu.", "Saya menunggu teman di stasiun."],
      ["おおきい えを かきました。", "Ookii e o kakimashita.", "Saya menggambar gambar yang besar."],
    ],
  ],
  // 3. Baris ka, sa, ta
  [
    [
      ["すし", "Sushi", "sushi"],
      ["ちず", "Chizu", "peta"],
      ["つき", "Tsuki", "bulan", ["Huruf つ dibaca...", "tsu", "tu", "su", "chu"]],
      ["かさ", "Kasa", "payung"],
    ],
    [
      ["つきが きれいですね。", "Tsuki ga kirei desu ne.", "Bulannya indah, ya."],
      ["ちずを みて ください。", "Chizu o mite kudasai.", "Tolong lihat petanya."],
      ["しずかな ところで すしを たべました。", "Shizuka na tokoro de sushi o tabemashita.", "Saya makan sushi di tempat yang tenang."],
      ["かさを わすれないで ください。", "Kasa o wasurenaide kudasai.", "Jangan lupa payungnya.", ["Huruf し dibaca...", "shi", "si", "chi", "tsi"]],
    ],
  ],
  // 4. Tsu kecil (っ)
  [
    [
      ["にっき", "Nikki", "buku harian"],
      ["せっけん", "Sekken", "sabun"],
      ["ろっぽん", "Roppon", "enam batang"],
      ["はっぱ", "Happa", "daun", ["Tanda っ (tsu kecil) diucapkan sebagai...", "jeda satu ketukan", "bunyi tsu penuh", "vokal panjang", "bunyi n"]],
    ],
    [
      ["まいにち にっきを かきます。", "Mainichi nikki o kakimasu.", "Setiap hari saya menulis buku harian."],
      ["せっけんで てを あらいましょう。", "Sekken de te o araimashou.", "Mari mencuci tangan dengan sabun."],
      ["きっさてんで まって います。", "Kissaten de matte imasu.", "Saya menunggu di kafe."],
      ["あさって がっこうへ いきます。", "Asatte gakkou e ikimasu.", "Lusa saya pergi ke sekolah."],
    ],
  ],
  // 5. Vokal panjang
  [
    [
      ["おかあさん", "Okaasan", "ibu"],
      ["おにいさん", "Oniisan", "kakak laki-laki"],
      ["くうこう", "Kuukou", "bandara"],
      ["とけい", "Tokei", "jam (ei panjang)", ["Beda おばさん dan おばあさん adalah...", "おばあさん punya vokal panjang (nenek)", "tidak ada beda", "おばさん lebih sopan", "おばあさん punya tsu kecil"]],
    ],
    [
      ["おかあさんは りょうりが じょうずです。", "Okaasan wa ryouri ga jouzu desu.", "Ibu pandai memasak."],
      ["くうこうまで バスで いきます。", "Kuukou made basu de ikimasu.", "Saya pergi ke bandara naik bus."],
      ["おにいさんは こうこうせいです。", "Oniisan wa koukousei desu.", "Kakak laki-laki itu siswa SMA."],
      ["せんせいに もういちど ききます。", "Sensei ni mou ichido kikimasu.", "Saya bertanya sekali lagi kepada guru.", ["Kata せんせい dibaca...", "sensei (ei panjang)", "sense", "sensee pendek", "sennsei"]],
    ],
  ],
  // 6. Bunyi ん
  [
    [
      ["ほん", "Hon", "buku"],
      ["でんわ", "Denwa", "telepon"],
      ["えんぴつ", "Enpitsu", "pensil"],
      ["かんじ", "Kanji", "kanji", ["Huruf ん dihitung sebagai...", "satu mora penuh", "setengah mora", "tidak dihitung", "dua mora"]],
    ],
    [
      ["えんぴつで なまえを かきます。", "Enpitsu de namae o kakimasu.", "Saya menulis nama dengan pensil."],
      ["でんわばんごうを おしえて ください。", "Denwa bangou o oshiete kudasai.", "Tolong beri tahu nomor teleponmu."],
      ["かんじの ほんを かいました。", "Kanji no hon o kaimashita.", "Saya membeli buku kanji."],
      ["こんばん えいがを みます。", "Konban eiga o mimasu.", "Malam ini saya menonton film."],
    ],
  ],
  // 7. Bunyi r Jepang
  [
    [
      ["さら", "Sara", "piring"],
      ["そら", "Sora", "langit"],
      ["くすり", "Kusuri", "obat"],
      ["ろうか", "Rouka", "lorong", ["Bunyi r Jepang diucapkan dengan...", "sentuhan ringan ujung lidah", "getaran lidah panjang", "bibir dibulatkan", "suara dari tenggorokan"]],
    ],
    [
      ["そらが あおくて きれいです。", "Sora ga aokute kirei desu.", "Langitnya biru dan indah."],
      ["さらを あらって ください。", "Sara o aratte kudasai.", "Tolong cuci piringnya."],
      ["ろうかを はしらないで ください。", "Rouka o hashiranaide kudasai.", "Tolong jangan berlari di lorong."],
      ["くすりを のんで やすみます。", "Kusuri o nonde yasumimasu.", "Saya minum obat lalu beristirahat."],
    ],
  ],
  // 8. Konsonan ganda
  [
    [
      ["ざっか", "Zakka", "barang kelontong"],
      ["ほっかいどう", "Hokkaidou", "Hokkaido"],
      ["しっぱい", "Shippai", "kegagalan"],
      ["きっさてん", "Kissaten", "kafe", ["Romaji yang benar untuk しっぱい adalah...", "shippai", "shipai", "shippaai", "shipppai"]],
    ],
    [
      ["ほっかいどうは ゆきが おおいです。", "Hokkaidou wa yuki ga ooi desu.", "Hokkaido banyak salju."],
      ["しっぱいしても だいじょうぶです。", "Shippai shite mo daijoubu desu.", "Gagal pun tidak apa-apa."],
      ["きっぷを にまい かいました。", "Kippu o nimai kaimashita.", "Saya membeli dua lembar tiket."],
      ["いっしょに がっこうへ いきましょう。", "Issho ni gakkou e ikimashou.", "Mari pergi ke sekolah bersama."],
    ],
  ],
  // 9. Pengantar pitch accent
  [
    [
      ["かみ", "Kami", "kertas / rambut / dewa (beda nada)"],
      ["はな", "Hana", "bunga / hidung (beda nada)"],
      ["かき", "Kaki", "kesemek / tiram (beda nada)", ["Bahasa Jepang membedakan kata seperti はし (sumpit/jembatan) dengan...", "tinggi-rendah nada", "tekanan keras", "panjang konsonan", "huruf berbeda saat diucapkan"]],
      ["いち", "Ichi", "satu / posisi (beda nada)"],
    ],
    [
      ["にわに きれいな はなが さいて います。", "Niwa ni kirei na hana ga saite imasu.", "Di halaman bunga yang indah sedang mekar."],
      ["かみに なまえを かいて ください。", "Kami ni namae o kaite kudasai.", "Tolong tulis nama di kertas."],
      ["あきは かきが おいしいです。", "Aki wa kaki ga oishii desu.", "Musim gugur buah kesemek enak."],
      ["かのじょは かみが ながいです。", "Kanojo wa kami ga nagai desu.", "Dia (perempuan) rambutnya panjang."],
    ],
  ],
  // 10. Intonasi tanya
  [
    [
      ["そうですか", "Sou desu ka", "oh, begitu (turun) / begitukah? (naik)"],
      ["いいですか", "Ii desu ka", "bolehkah?"],
      ["だれですか", "Dare desu ka", "siapa?"],
      ["ほんとう", "Hontou", "benar / sungguh", ["Kalimat tanya dengan か biasanya diucapkan dengan nada...", "naik di akhir", "turun di akhir", "datar", "naik di awal"]],
    ],
    [
      ["これは だれの かさですか。", "Kore wa dare no kasa desu ka.", "Ini payung siapa?"],
      ["あしたも がっこうが ありますか。", "Ashita mo gakkou ga arimasu ka.", "Besok juga ada sekolah?"],
      ["ここに すわっても いいですか。", "Koko ni suwatte mo ii desu ka.", "Bolehkah saya duduk di sini?"],
      ["なんじに かえりますか。", "Nanji ni kaerimasu ka.", "Kamu pulang jam berapa?"],
    ],
  ],
  // 11. Partikel wa, e, o
  [
    [
      ["わたしは", "Watashi wa", "saya (topik)"],
      ["うちへ", "Uchi e", "ke rumah"],
      ["みずを", "Mizu o", "air (objek)"],
      ["ごはんは", "Gohan wa", "nasinya (sebagai topik)", ["Huruf は terakhir pada ごはんは dibaca...", "wa", "ha", "ba", "e"]],
    ],
    [
      ["ちちは かいしゃへ いきます。", "Chichi wa kaisha e ikimasu.", "Ayah pergi ke kantor."],
      ["わたしは まいあさ みずを のみます。", "Watashi wa maiasa mizu o nomimasu.", "Saya minum air setiap pagi."],
      ["ははは にわへ でました。", "Haha wa niwa e demashita.", "Ibu keluar ke halaman.", ["Dalam ははは, huruf は ketiga dibaca...", "wa", "ha", "e", "o"]],
      ["あにを えきへ むかえに いきます。", "Ani o eki e mukae ni ikimasu.", "Saya pergi menjemput kakak ke stasiun."],
    ],
  ],
  // 12. Ritme katakana
  [
    [
      ["タクシー", "Takushii", "taksi"],
      ["ボールペン", "Boorupen", "pulpen"],
      ["アイスコーヒー", "Aisu koohii", "kopi es"],
      ["スマートフォン", "Sumaatofon", "ponsel pintar", ["Romaji yang benar untuk タクシー adalah...", "takushii", "takushi", "taxi", "takusii"]],
    ],
    [
      ["アイスコーヒーを ください。", "Aisu koohii o kudasai.", "Minta kopi es."],
      ["ボールペンを かして ください。", "Boorupen o kashite kudasai.", "Tolong pinjamkan pulpen."],
      ["タクシーで ホテルへ いきます。", "Takushii de hoteru e ikimasu.", "Saya pergi ke hotel naik taksi."],
      ["あたらしい スマートフォンを かいました。", "Atarashii sumaatofon o kaimashita.", "Saya membeli ponsel pintar baru."],
    ],
  ],
  // 13. Shadowing pendek
  [
    [
      ["いってきます", "Ittekimasu", "saya berangkat"],
      ["おやすみ", "Oyasumi", "selamat tidur (akrab)"],
      ["おめでとう", "Omedetou", "selamat!"],
      ["どうぞ", "Douzo", "silakan", ["Shadowing dilakukan dengan cara...", "mengulang segera setelah audio", "membaca tanpa audio", "menulis apa yang didengar", "menerjemahkan"]],
    ],
    [
      ["おたんじょうび おめでとう。", "Otanjoubi omedetou.", "Selamat ulang tahun."],
      ["いってきます。いってらっしゃい。", "Ittekimasu. Itterasshai.", "Saya berangkat. Hati-hati di jalan."],
      ["どうぞ、おはいり ください。", "Douzo, ohairi kudasai.", "Silakan masuk."],
      ["おつかれさまでした。", "Otsukaresama deshita.", "Terima kasih atas kerja kerasnya."],
    ],
  ],
  // 14. Memenggal kalimat
  [
    [
      ["えきの まえで", "Eki no mae de", "di depan stasiun"],
      ["ともだちと", "Tomodachi to", "bersama teman"],
      ["まいばん", "Maiban", "setiap malam"],
      ["としょかんで", "Toshokan de", "di perpustakaan", ["Kalimat panjang sebaiknya dipenggal per...", "frasa (kata + partikel)", "huruf", "kanji", "vokal"]],
    ],
    [
      ["まいばん、へやで、にほんごを、べんきょうします。", "Maiban, heya de, Nihongo o, benkyou shimasu.", "Setiap malam, di kamar, saya belajar bahasa Jepang."],
      ["どようびに、ともだちと、こうえんで、あそびました。", "Doyoubi ni, tomodachi to, kouen de, asobimashita.", "Hari Sabtu, bersama teman, saya bermain di taman."],
      ["としょかんで、ほんを、にさつ、かりました。", "Toshokan de, hon o, nisatsu, karimashita.", "Di perpustakaan, saya meminjam dua buku."],
      ["えきの まえで、ははを、まって います。", "Eki no mae de, haha o, matte imasu.", "Di depan stasiun, saya menunggu ibu."],
    ],
  ],
  // 15. Akhiran sopan
  [
    [
      ["です", "Desu", "adalah (sopan)"],
      ["ます", "Masu", "akhiran kata kerja sopan"],
      ["でした", "Deshita", "adalah (lampau sopan)"],
      ["ません", "Masen", "tidak (sopan)", ["Huruf u di akhir です sering terdengar...", "hampir tidak terdengar (des)", "sangat panjang", "seperti o", "seperti i"]],
    ],
    [
      ["わたしは がくせいです。", "Watashi wa gakusei desu.", "Saya pelajar."],
      ["あした また きます。", "Ashita mata kimasu.", "Besok saya datang lagi."],
      ["きのうは やすみでした。", "Kinou wa yasumi deshita.", "Kemarin hari libur."],
      ["きょうは いきません。", "Kyou wa ikimasen.", "Hari ini saya tidak pergi."],
    ],
  ],
  // 16. Pasangan kata mirip
  [
    [
      ["おばさん", "Obasan", "bibi"],
      ["おばあちゃん", "Obaachan", "nenek (akrab)", ["Romaji untuk おばあちゃん (nenek) adalah...", "obaachan", "obachan", "obbachan", "obaacchan"]],
      ["きて", "Kite", "datang (bentuk te)"],
      ["きた", "Kita", "utara"],
    ],
    [
      ["おばさんは とうきょうに すんで います。", "Obasan wa Toukyou ni sunde imasu.", "Bibi tinggal di Tokyo."],
      ["おばあさんは はちじゅっさいです。", "Obaasan wa hachijussai desu.", "Nenek berumur delapan puluh tahun."],
      ["はやく きて ください。", "Hayaku kite kudasai.", "Tolong cepat datang."],
      ["ケーキを はんぶんに きって ください。", "Keeki o hanbun ni kitte kudasai.", "Tolong potong kuenya menjadi dua."],
    ],
  ],
  // 17. Dari lambat ke alami
  [
    [
      ["もういちど", "Mou ichido", "sekali lagi"],
      ["ゆっくり おねがいします", "Yukkuri onegaishimasu", "tolong pelan-pelan"],
      ["わかりました", "Wakarimashita", "saya mengerti"],
      ["だいじょうぶ", "Daijoubu", "tidak apa-apa", ["Urutan latihan kalimat yang dianjurkan adalah...", "per mora → per frasa → kecepatan alami", "kecepatan alami → per mora", "per frasa → per huruf", "langsung cepat"]],
    ],
    [
      ["すみません、ゆっくり いって ください。", "Sumimasen, yukkuri itte kudasai.", "Maaf, tolong bicara pelan-pelan."],
      ["はい、わかりました。", "Hai, wakarimashita.", "Ya, saya mengerti."],
      ["もういちど いって くれませんか。", "Mou ichido itte kuremasen ka.", "Bisakah kamu mengatakannya sekali lagi?"],
      ["きょうは どうも ありがとう。", "Kyou wa doumo arigatou.", "Terima kasih banyak untuk hari ini."],
    ],
  ],
  // 18. Meniru ucapan
  [
    [
      ["そうだね", "Sou da ne", "iya, ya (akrab)"],
      ["へえ", "Hee", "wah / oh ya? (kagum)"],
      ["えっ", "E", "eh? (terkejut)"],
      ["まあね", "Maa ne", "yah, begitulah", ["Ungkapan へえ biasanya menunjukkan...", "kagum atau tertarik", "marah", "menolak", "minta maaf"]],
    ],
    [
      ["へえ、そうなんだ。", "Hee, sou nan da.", "Wah, begitu ya."],
      ["えっ、ほんとう？", "E, hontou?", "Eh, beneran?"],
      ["うん、わかった。", "Un, wakatta.", "Iya, aku mengerti."],
      ["まあ、いいか。", "Maa, ii ka.", "Yah, ya sudahlah."],
    ],
  ],
  // 19. Cek rekaman
  [
    [
      ["いっしゅうかん", "Isshuukan", "satu minggu"],
      ["じっぷん", "Jippun", "sepuluh menit"],
      ["びょういん", "Byouin", "rumah sakit"],
      ["びよういん", "Biyouin", "salon kecantikan", ["Beda びょういん dan びよういん adalah...", "rumah sakit vs salon kecantikan", "sama artinya", "nama kota", "lampau vs sekarang"]],
    ],
    [
      ["いっしゅうかん とうきょうに いました。", "Isshuukan Toukyou ni imashita.", "Saya berada di Tokyo selama seminggu."],
      ["えきまで あるいて じっぷんです。", "Eki made aruite jippun desu.", "Sampai stasiun sepuluh menit berjalan kaki."],
      ["あしたは びよういんへ いきます。", "Ashita wa biyouin e ikimasu.", "Besok saya pergi ke salon kecantikan."],
      ["ちちは びょういんで はたらいて います。", "Chichi wa byouin de hataraite imasu.", "Ayah bekerja di rumah sakit."],
    ],
  ],
  // 20. Ulasan pronunciation N5
  [
    [
      ["しゅくだい", "Shukudai", "PR"],
      ["りょこう", "Ryokou", "perjalanan wisata"],
      ["きょうしつ", "Kyoushitsu", "ruang kelas"],
      ["ちゅうごく", "Chuugoku", "Tiongkok", ["Romaji yang benar untuk りょこう adalah...", "ryokou", "riyokou", "ryoko", "rokou"]],
    ],
    [
      ["きょうしつで しゅくだいを しました。", "Kyoushitsu de shukudai o shimashita.", "Saya mengerjakan PR di ruang kelas."],
      ["ちゅうごくから りゅうがくせいが きました。", "Chuugoku kara ryuugakusei ga kimashita.", "Seorang pelajar asing datang dari Tiongkok."],
      ["きょねん かぞくと りょこうしました。", "Kyonen kazoku to ryokou shimashita.", "Tahun lalu saya berwisata bersama keluarga."],
      ["にほんの おんがくを ききましょう。", "Nihon no ongaku o kikimashou.", "Mari mendengarkan musik Jepang."],
    ],
  ],
];
