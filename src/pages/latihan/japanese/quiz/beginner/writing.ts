import type { JapaneseQuizTopic } from '../types';

// Latihan Writing N5 — one entry per topic (index = topic - 1): [Basic, Advanced].
export const writing: JapaneseQuizTopic[] = [
  // 1. Menulis hiragana
  [
    [
      ["せんせい", "Sensei", "guru", ["Penulisan hiragana yang benar untuk 'sensei' adalah...", "せんせい", "せんせ", "せいせい", "ぜんせい"]],
      ["ざぶとん", "Zabuton", "bantal duduk"],
      ["ぎゅうにゅう", "Gyuunyuu", "susu sapi"],
      ["ひこうき", "Hikouki", "pesawat terbang"],
    ],
    [
      ["わたしはがっこうへいきます。", "Watashi wa gakkou e ikimasu.", "Saya pergi ke sekolah.", ["Partikel arah 'ke' yang dibaca e ditulis dengan huruf...", "へ", "え", "は", "を"]],
      ["きのうぎゅうにゅうをのみました。", "Kinou gyuunyuu o nomimashita.", "Kemarin saya minum susu."],
      ["ひこうきでおきなわにいきます。", "Hikouki de Okinawa ni ikimasu.", "Saya pergi ke Okinawa naik pesawat."],
      ["おばあさんにてがみをかきます。", "Obaasan ni tegami o kakimasu.", "Saya menulis surat untuk nenek."],
    ],
  ],
  // 2. Menulis katakana
  [
    [
      ["シャツ", "Shatsu", "kemeja", ["Katakana yang benar untuk 'shatsu' adalah...", "シャツ", "シャシ", "ツャツ", "シヤツ"]],
      ["ノート", "Nooto", "buku catatan"],
      ["ケーキ", "Keeki", "kue"],
      ["ソース", "Soosu", "saus"],
    ],
    [
      ["デパートで白いシャツを買いました。", "Depaato de shiroi shatsu o kaimashita.", "Saya membeli kemeja putih di department store."],
      ["誕生日にケーキを食べます。", "Tanjoubi ni keeki o tabemasu.", "Saya makan kue saat ulang tahun."],
      ["ノートに名前を書いてください。", "Nooto ni namae o kaite kudasai.", "Tolong tulis nama di buku catatan."],
      ["インターネットでホテルを予約しました。", "Intaanetto de hoteru o yoyaku shimashita.", "Saya memesan hotel lewat internet."],
    ],
  ],
  // 3. Profil diri
  [
    [
      ["名前", "Namae", "nama"],
      ["歳", "Sai", "tahun (umur)"],
      ["出身", "Shusshin", "asal / tempat asal", ["Kata untuk 'asal (tempat lahir/kota asal)' adalah...", "出身", "住所", "名前", "仕事"]],
      ["大学生", "Daigakusei", "mahasiswa"],
    ],
    [
      ["私はリサです。十九歳です。", "Watashi wa Risa desu. Juukyuusai desu.", "Saya Lisa. Umur saya sembilan belas tahun."],
      ["出身はジョグジャカルタです。", "Shusshin wa Jogujakaruta desu.", "Saya berasal dari Yogyakarta."],
      ["今、東京の日本語学校で勉強しています。", "Ima, Toukyou no Nihongo gakkou de benkyou shite imasu.", "Sekarang saya belajar di sekolah bahasa Jepang di Tokyo."],
      ["好きな食べ物はラーメンです。", "Suki na tabemono wa raamen desu.", "Makanan kesukaan saya ramen."],
    ],
  ],
  // 4. Kalimat rutinitas
  [
    [
      ["起きます", "Okimasu", "bangun"],
      ["寝ます", "Nemasu", "tidur"],
      ["働きます", "Hatarakimasu", "bekerja"],
      ["帰ります", "Kaerimasu", "pulang", ["Penulisan yang benar untuk 'pukul tujuh' dalam kalimat adalah...", "七時に", "七時で", "七時を", "七時が"]],
    ],
    [
      ["私は毎朝六時半に起きます。", "Watashi wa maiasa rokuji han ni okimasu.", "Saya bangun setiap pagi pukul setengah tujuh."],
      ["八時から五時まで働きます。", "Hachiji kara goji made hatarakimasu.", "Saya bekerja dari pukul delapan sampai pukul lima."],
      ["夕方、スーパーで買い物をします。", "Yuugata, suupaa de kaimono o shimasu.", "Sore hari saya berbelanja di supermarket."],
      ["夜はシャワーを浴びてから寝ます。", "Yoru wa shawaa o abite kara nemasu.", "Malam hari saya mandi lalu tidur."],
    ],
  ],
  // 5. Catatan belanja
  [
    [
      ["にんじん", "Ninjin", "wortel"],
      ["たまねぎ", "Tamanegi", "bawang bombay"],
      ["卵十個", "Tamago jukko", "sepuluh butir telur"],
      ["牛乳一本", "Gyuunyuu ippon", "sebotol susu", ["Penghitung untuk botol adalah...", "本", "枚", "個", "人"]],
    ],
    [
      ["にんじんを二本とたまねぎを三個買う。", "Ninjin o nihon to tamanegi o sanko kau.", "Beli dua batang wortel dan tiga buah bawang bombay."],
      ["パンは買わなくてもいい。", "Pan wa kawanakute mo ii.", "Roti tidak perlu dibeli."],
      ["肉は安い店で買う。", "Niku wa yasui mise de kau.", "Daging dibeli di toko yang murah."],
      ["お米がもうないから、五キロ買う。", "Okome ga mou nai kara, gokiro kau.", "Berasnya sudah habis, jadi beli lima kilo."],
    ],
  ],
  // 6. Undangan singkat
  [
    [
      ["パーティー", "Paatii", "pesta"],
      ["誕生日", "Tanjoubi", "ulang tahun"],
      ["招待", "Shoutai", "undangan"],
      ["ぜひ来てください", "Zehi kite kudasai", "datanglah dengan senang hati", ["Kalimat ajakan dalam undangan biasanya memakai...", "〜ませんか", "〜ました", "〜てはいけません", "〜でした"]],
    ],
    [
      ["今度の日曜日にバーベキューをします。", "Kondo no nichiyoubi ni baabekyuu o shimasu.", "Minggu ini kami mengadakan barbekyu."],
      ["場所は川の近くの公園です。", "Basho wa kawa no chikaku no kouen desu.", "Tempatnya di taman dekat sungai."],
      ["飲み物を持ってきてください。", "Nomimono o motte kite kudasai.", "Tolong bawa minuman."],
      ["ご家族も一緒にどうぞ。", "Gokazoku mo issho ni douzo.", "Silakan datang bersama keluarga juga."],
    ],
  ],
  // 7. Email sederhana
  [
    [
      ["メール", "Meeru", "email"],
      ["お礼", "Orei", "ucapan terima kasih"],
      ["お返しします", "Okaeshi shimasu", "akan saya kembalikan"],
      ["では、また", "De wa, mata", "sampai jumpa lagi", ["Email kepada guru biasanya dibuka dengan...", "〇〇先生", "〇〇くん", "〇〇ちゃん", "おい"]],
    ],
    [
      ["木村先生、こんにちは。リサです。", "Kimura sensei, konnichiwa. Risa desu.", "Halo, Guru Kimura. Ini Lisa."],
      ["昨日は授業を休んで、すみませんでした。", "Kinou wa jugyou o yasunde, sumimasen deshita.", "Maaf kemarin saya tidak masuk pelajaran."],
      ["宿題を教えてくださいませんか。", "Shukudai o oshiete kudasaimasen ka.", "Maukah Bapak/Ibu memberi tahu PR-nya?"],
      ["どうぞよろしくお願いいたします。", "Douzo yoroshiku onegai itashimasu.", "Mohon bantuannya."],
    ],
  ],
  // 8. Buku harian lima kalimat
  [
    [
      ["今日は", "Kyou wa", "hari ini (topik)"],
      ["会いました", "Aimashita", "bertemu (lampau)"],
      ["見ました", "Mimashita", "melihat (lampau)"],
      ["おいしかったです", "Oishikatta desu", "enak (lampau)", ["Bentuk lampau yang benar dari 楽しいです adalah...", "楽しかったです", "楽しいでした", "楽しくでした", "楽しましたです"]],
    ],
    [
      ["今日は午前中に部屋を掃除しました。", "Kyou wa gozenchuu ni heya o souji shimashita.", "Hari ini saya membersihkan kamar di pagi hari."],
      ["午後は友達と映画館へ行きました。", "Gogo wa tomodachi to eigakan e ikimashita.", "Siang hari saya ke bioskop bersama teman."],
      ["映画はとてもおもしろかったです。", "Eiga wa totemo omoshirokatta desu.", "Filmnya sangat menarik."],
      ["明日は早く起きなければなりません。", "Ashita wa hayaku okinakereba narimasen.", "Besok saya harus bangun pagi."],
    ],
  ],
  // 9. Paragraf keluarga
  [
    [
      ["三人家族", "Sannin kazoku", "keluarga tiga orang"],
      ["まじめ", "Majime", "serius / rajin"],
      ["やさしい", "Yasashii", "baik hati"],
      ["にぎやか", "Nigiyaka", "ramai", ["Penulisan yang benar untuk 'keluarga saya empat orang' adalah...", "私は四人家族です。", "私は四人の家族ます。", "私を四人家族です。", "私は四人家族だです。"]],
    ],
    [
      ["私の家族は祖母と両親と兄と私の五人です。", "Watashi no kazoku wa sobo to ryoushin to ani to watashi no gonin desu.", "Keluarga saya lima orang: nenek, orang tua, kakak laki-laki, dan saya."],
      ["兄はエンジニアで、とてもまじめです。", "Ani wa enjinia de, totemo majime desu.", "Kakak laki-laki saya insinyur dan sangat rajin."],
      ["母はやさしくて、料理が上手です。", "Haha wa yasashikute, ryouri ga jouzu desu.", "Ibu saya baik hati dan pandai memasak."],
      ["週末はみんなで晩ご飯を食べます。", "Shuumatsu wa minna de bangohan o tabemasu.", "Akhir pekan kami makan malam bersama-sama."],
    ],
  ],
  // 10. Paragraf hobi
  [
    [
      ["本を読むこと", "Hon o yomu koto", "membaca buku (sebagai hobi)"],
      ["写真を撮ること", "Shashin o toru koto", "memotret (sebagai hobi)"],
      ["釣り", "Tsuri", "memancing"],
      ["集めること", "Atsumeru koto", "mengoleksi", ["Untuk menulis 'hobi saya membaca', yang benar adalah...", "趣味は本を読むことです。", "趣味は本を読みます。", "趣味を本を読むことです。", "趣味は本が読むです。"]],
    ],
    [
      ["私の趣味は切手を集めることです。", "Watashi no shumi wa kitte o atsumeru koto desu.", "Hobi saya mengoleksi perangko."],
      ["今、三百枚ぐらい持っています。", "Ima, sanbyakumai gurai motte imasu.", "Sekarang saya punya sekitar tiga ratus lembar."],
      ["外国の切手が一番好きです。", "Gaikoku no kitte ga ichiban suki desu.", "Saya paling suka perangko luar negeri."],
      ["いつか切手の博物館に行きたいです。", "Itsuka kitte no hakubutsukan ni ikitai desu.", "Suatu hari saya ingin pergi ke museum perangko."],
    ],
  ],
  // 11. Catatan cuaca
  [
    [
      ["大雪", "Ooyuki", "salju lebat"],
      ["くもり空", "Kumorizora", "langit mendung"],
      ["寒い", "Samui", "dingin (cuaca)"],
      ["コート", "Kooto", "mantel", ["Penulisan yang benar untuk 'hari ini hujan' adalah...", "今日は雨です。", "今日は雨ます。", "今日を雨です。", "今日は雨がです。"]],
    ],
    [
      ["今日はくもりで、少し寒いです。", "Kyou wa kumori de, sukoshi samui desu.", "Hari ini berawan dan agak dingin."],
      ["午後から雨が降りました。", "Gogo kara ame ga furimashita.", "Mulai siang hujan turun."],
      ["傘がなかったので、ぬれてしまいました。", "Kasa ga nakatta node, nurete shimaimashita.", "Karena tidak ada payung, saya jadi basah."],
      ["明日は晴れるといいです。", "Ashita wa hareru to ii desu.", "Semoga besok cerah."],
    ],
  ],
  // 12. Rencana perjalanan
  [
    [
      ["旅行の計画", "Ryokou no keikaku", "rencana wisata"],
      ["温泉", "Onsen", "pemandian air panas"],
      ["お寺", "Otera", "kuil Buddha"],
      ["予約", "Yoyaku", "reservasi", ["Penulisan yang benar untuk 'ingin pergi' adalah...", "行きたいです", "行くたいです", "行ってたいです", "行きたです"]],
    ],
    [
      ["冬休みに家族と京都へ行きます。", "Fuyuyasumi ni kazoku to Kyouto e ikimasu.", "Saat liburan musim dingin saya pergi ke Kyoto bersama keluarga."],
      ["古いお寺をたくさん見たいです。", "Furui otera o takusan mitai desu.", "Saya ingin melihat banyak kuil tua."],
      ["二日目は温泉に入りたいです。", "Futsukame wa onsen ni hairitai desu.", "Hari kedua saya ingin berendam di onsen."],
      ["ホテルはもう予約しました。", "Hoteru wa mou yoyaku shimashita.", "Hotelnya sudah saya pesan."],
    ],
  ],
  // 13. Catatan permintaan maaf
  [
    [
      ["すみませんでした", "Sumimasen deshita", "maaf (atas yang sudah terjadi)"],
      ["遅刻", "Chikoku", "terlambat"],
      ["約束", "Yakusoku", "janji"],
      ["気をつけます", "Ki o tsukemasu", "akan berhati-hati", ["Urutan catatan maaf yang baik adalah...", "minta maaf → alasan → janji", "janji → alasan → pamit", "alasan → pamit → minta maaf", "pamit → janji → alasan"]],
    ],
    [
      ["今朝は遅刻して、すみませんでした。", "Kesa wa chikoku shite, sumimasen deshita.", "Maaf tadi pagi saya terlambat."],
      ["目覚まし時計が鳴りませんでした。", "Mezamashidokei ga narimasen deshita.", "Jam weker saya tidak berbunyi."],
      ["借りた本をなくしてしまいました。", "Karita hon o nakushite shimaimashita.", "Saya menghilangkan buku yang saya pinjam."],
      ["新しい本を買って返します。", "Atarashii hon o katte kaeshimasu.", "Saya akan membeli buku baru untuk mengganti."],
    ],
  ],
  // 14. Catatan terima kasih
  [
    [
      ["感謝", "Kansha", "rasa terima kasih"],
      ["プレゼント", "Purezento", "hadiah"],
      ["うれしい", "Ureshii", "senang"],
      ["大切にします", "Taisetsu ni shimasu", "akan saya jaga baik-baik", ["Penulisan terima kasih yang paling sopan adalah...", "ありがとうございました。", "ありがとう。", "サンキュー。", "どうも。"]],
    ],
    [
      ["昨日は駅まで送ってくれて、ありがとう。", "Kinou wa eki made okutte kurete, arigatou.", "Terima kasih kemarin sudah mengantar sampai stasiun."],
      ["きれいな花をありがとうございました。", "Kirei na hana o arigatou gozaimashita.", "Terima kasih atas bunganya yang cantik."],
      ["部屋に飾っています。", "Heya ni kazatte imasu.", "Saya memajangnya di kamar."],
      ["とてもうれしかったです。", "Totemo ureshikatta desu.", "Saya sangat senang."],
    ],
  ],
  // 15. Menulis petunjuk arah
  [
    [
      ["出て", "Dete", "keluar, lalu..."],
      ["渡って", "Watatte", "menyeberang, lalu..."],
      ["曲がって", "Magatte", "berbelok, lalu..."],
      ["まっすぐ歩いて", "Massugu aruite", "berjalan lurus, lalu...", ["Bentuk て dari 渡ります adalah...", "渡って", "渡りて", "渡んで", "渡いて"]],
    ],
    [
      ["駅の西口を出てください。", "Eki no nishiguchi o dete kudasai.", "Silakan keluar dari pintu barat stasiun."],
      ["大きい道を渡って、まっすぐ行ってください。", "Ookii michi o watatte, massugu itte kudasai.", "Seberangi jalan besar, lalu jalan lurus."],
      ["花屋の角を右に曲がってください。", "Hanaya no kado o migi ni magatte kudasai.", "Belok kanan di sudut toko bunga."],
      ["私の家は赤い屋根の家です。", "Watashi no ie wa akai yane no ie desu.", "Rumah saya rumah yang beratap merah."],
    ],
  ],
  // 16. Kalimat dengan kanji N5
  [
    [
      ["学校", "Gakkou", "sekolah"],
      ["時間", "Jikan", "waktu / jam"],
      ["毎日", "Mainichi", "setiap hari"],
      ["先週", "Senshuu", "minggu lalu", ["Kanji yang benar untuk 'sensei' (guru) adalah...", "先生", "先正", "千生", "先性"]],
    ],
    [
      ["毎日一時間日本語を勉強します。", "Mainichi ichijikan Nihongo o benkyou shimasu.", "Setiap hari saya belajar bahasa Jepang satu jam."],
      ["先週の土曜日に友人と会いました。", "Senshuu no doyoubi ni yuujin to aimashita.", "Sabtu minggu lalu saya bertemu teman."],
      ["学校の後ろに小さい川があります。", "Gakkou no ushiro ni chiisai kawa ga arimasu.", "Di belakang sekolah ada sungai kecil."],
      ["来年の三月に大学を出ます。", "Rainen no sangatsu ni daigaku o demasu.", "Bulan Maret tahun depan saya lulus universitas."],
    ],
  ],
  // 17. Menulis pertanyaan
  [
    [
      ["いつ", "Itsu", "kapan"],
      ["どこ", "Doko", "di mana"],
      ["なに", "Nani", "apa"],
      ["だれ", "Dare", "siapa", ["Kalimat tanya formal ditutup dengan...", "か。", "よ。", "ね。", "わ。"]],
    ],
    [
      ["週末はどこへ行きましたか。", "Shuumatsu wa doko e ikimashita ka.", "Akhir pekan kamu pergi ke mana?"],
      ["日本語の授業は何時に始まりますか。", "Nihongo no jugyou wa nanji ni hajimarimasu ka.", "Pelajaran bahasa Jepang dimulai pukul berapa?"],
      ["好きなスポーツは何ですか。", "Suki na supootsu wa nan desu ka.", "Olahraga kesukaanmu apa?"],
      ["誰にそのプレゼントをあげますか。", "Dare ni sono purezento o agemasu ka.", "Hadiah itu akan kamu berikan kepada siapa?"],
    ],
  ],
  // 18. Menulis jawaban
  [
    [
      ["はい", "Hai", "ya"],
      ["いいえ", "Iie", "tidak / bukan"],
      ["国から来ました", "Kuni kara kimashita", "datang dari negara asal"],
      ["家族と住んでいます", "Kazoku to sunde imasu", "tinggal bersama keluarga", ["Jawaban lengkap untuk いつ来ましたか yang benar adalah...", "去年来ました。", "去年です来ました。", "去年を来ました。", "去年が来ました。"]],
    ],
    [
      ["はい、日本の料理が大好きです。", "Hai, Nihon no ryouri ga daisuki desu.", "Ya, saya sangat suka masakan Jepang."],
      ["いいえ、一人で住んでいます。", "Iie, hitori de sunde imasu.", "Tidak, saya tinggal sendiri."],
      ["三年前に日本に来ました。", "Sannen mae ni Nihon ni kimashita.", "Saya datang ke Jepang tiga tahun lalu."],
      ["日本の会社で働きたいからです。", "Nihon no kaisha de hatarakitai kara desu.", "Karena saya ingin bekerja di perusahaan Jepang."],
    ],
  ],
  // 19. Karangan mini
  [
    [
      ["私の町", "Watashi no machi", "kota saya"],
      ["有名", "Yuumei", "terkenal"],
      ["屋台", "Yatai", "warung kaki lima"],
      ["一度", "Ichido", "sekali", ["Karangan mini sebaiknya ditutup dengan...", "perasaan atau harapan", "daftar belanja", "nomor telepon", "pertanyaan baru"]],
    ],
    [
      ["私の町はメダンです。", "Watashi no machi wa Medan desu.", "Kota saya Medan."],
      ["メダンはドリアンで有名です。", "Medan wa dorian de yuumei desu.", "Medan terkenal dengan durian."],
      ["町の人はとても元気で、親切です。", "Machi no hito wa totemo genki de, shinsetsu desu.", "Orang-orang di kota itu sangat bersemangat dan ramah."],
      ["私は自分の町が大好きです。", "Watashi wa jibun no machi ga daisuki desu.", "Saya sangat mencintai kota saya sendiri."],
    ],
  ],
  // 20. Ulasan writing N5
  [
    [
      ["作文", "Sakubun", "karangan"],
      ["漢字", "Kanji", "kanji"],
      ["文", "Bun", "kalimat"],
      ["覚えました", "Oboemashita", "sudah menghafal", ["Penulisan yang benar adalah...", "漢字を覚えました。", "漢字が覚えました。", "漢字に覚えました。", "漢字で覚えました。"]],
    ],
    [
      ["毎日、漢字を五つ書いて練習します。", "Mainichi, kanji o itsutsu kaite renshuu shimasu.", "Setiap hari saya berlatih menulis lima kanji."],
      ["作文を先生に見てもらいました。", "Sakubun o sensei ni mite moraimashita.", "Saya meminta guru memeriksa karangan saya."],
      ["まちがいを赤いペンで直しました。", "Machigai o akai pen de naoshimashita.", "Saya memperbaiki kesalahan dengan pulpen merah."],
      ["来月は日本語で日記を書きたいです。", "Raigetsu wa Nihongo de nikki o kakitai desu.", "Bulan depan saya ingin menulis buku harian dalam bahasa Jepang."],
    ],
  ],
];
