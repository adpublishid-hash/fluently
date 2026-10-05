import type { JapaneseQuizTopic } from '../types';

// Latihan Writing N4 — one entry per topic (index = topic - 1): [Basic, Advanced].
export const writing: JapaneseQuizTopic[] = [
  // 1. Email permintaan
  [
    [
      ["お忙しいところ", "Oisogashii tokoro", "di tengah kesibukan Anda"],
      ["お願いがあります", "Onegai ga arimasu", "saya punya permintaan"],
      ["書いていただけませんか", "Kaite itadakemasen ka", "bersediakah Anda menuliskan?"],
      ["よろしくお願いいたします", "Yoroshiku onegai itashimasu", "atas perhatiannya terima kasih", ["Penutup email permintaan yang sopan adalah...", "よろしくお願いいたします。", "じゃあね。", "またね。", "バイバイ。"]],
    ],
    [
      ["突然のご連絡、失礼いたします。", "Totsuzen no gorenraku, shitsurei itashimasu.", "Mohon maaf atas pesan yang tiba-tiba ini."],
      ["来週の面談の日程を変えていただけませんか。", "Raishuu no mendan no nittei o kaete itadakemasen ka.", "Bersediakah Anda mengubah jadwal pertemuan minggu depan?"],
      ["お返事は金曜日までにいただけると助かります。", "Ohenji wa kinyoubi made ni itadakeru to tasukarimasu.", "Saya akan terbantu jika bisa mendapat balasan paling lambat Jumat."],
      ["お手数をおかけしますが、よろしくお願いいたします。", "Otesuu o okake shimasu ga, yoroshiku onegai itashimasu.", "Mohon maaf merepotkan, atas perhatiannya terima kasih."],
    ],
  ],
  // 2. Paragraf pengalaman
  [
    [
      ["三年前", "Sannen mae", "tiga tahun lalu"],
      ["そのとき", "Sono toki", "saat itu"],
      ["忘れられない", "Wasurerarenai", "tidak terlupakan"],
      ["いつか", "Itsuka", "suatu saat", ["Penulisan yang benar untuk 'saya pernah naik kapal' adalah...", "船に乗ったことがあります。", "船に乗ることがあります。", "船を乗ったことがあります。", "船に乗ったことをあります。"]],
    ],
    [
      ["小学生のとき、一度だけ入院したことがあります。", "Shougakusei no toki, ichido dake nyuuin shita koto ga arimasu.", "Saat SD, saya pernah dirawat inap sekali saja."],
      ["そのとき、看護師さんがとても優しくしてくれました。", "Sono toki, kangoshi san ga totemo yasashiku shite kuremashita.", "Saat itu, perawat sangat baik kepada saya."],
      ["その経験は今でも忘れられません。", "Sono keiken wa ima demo wasureraremasen.", "Pengalaman itu sampai sekarang tidak terlupakan."],
      ["それで、私も看護師になりたいと思いました。", "Sorede, watashi mo kangoshi ni naritai to omoimashita.", "Karena itu, saya juga ingin menjadi perawat."],
    ],
  ],
  // 3. Pesan berisi saran
  [
    [
      ["たほうがいいと思うよ", "Ta hou ga ii to omou yo", "menurutku sebaiknya ..."],
      ["てみたら？", "Te mitara?", "bagaimana kalau mencoba ...?"],
      ["がんばってね", "Ganbatte ne", "semangat, ya"],
      ["無理しないでね", "Muri shinaide ne", "jangan memaksakan diri, ya", ["Saran yang lembut dalam pesan kepada teman adalah...", "早く寝たほうがいいと思うよ。", "早く寝なさい。", "早く寝ろ。", "早く寝なければならない。"]],
    ],
    [
      ["風邪なら、今日は早く帰ったほうがいいと思うよ。", "Kaze nara, kyou wa hayaku kaetta hou ga ii to omou yo.", "Kalau flu, menurutku hari ini sebaiknya pulang cepat."],
      ["その本、図書館で探してみたら？", "Sono hon, toshokan de sagashite mitara?", "Buku itu, bagaimana kalau coba cari di perpustakaan?"],
      ["発表の前に、一回練習してみるといいよ。", "Happyou no mae ni, ikkai renshuu shite miru to ii yo.", "Sebelum presentasi, ada baiknya berlatih sekali."],
      ["何かあったら、いつでも連絡してね。", "Nanika attara, itsudemo renraku shite ne.", "Kalau ada apa-apa, hubungi aku kapan saja, ya."],
    ],
  ],
  // 4. Menjelaskan jadwal
  [
    [
      ["当日", "Toujitsu", "pada hari H"],
      ["集合", "Shuugou", "berkumpul"],
      ["てから", "Te kara", "setelah ..."],
      ["解散", "Kaisan", "bubar / selesai", ["Untuk menulis 'setelah makan, kita pergi', yang benar adalah...", "食べてから、出かけます。", "食べたから、出かけます。", "食べるから、出かけます。", "食べてまで、出かけます。"]],
    ],
    [
      ["八時半に学校の前に集合してください。", "Hachiji han ni gakkou no mae ni shuugou shite kudasai.", "Berkumpul di depan sekolah pukul setengah sembilan."],
      ["美術館を見学してから、昼ご飯を食べます。", "Bijutsukan o kengaku shite kara, hirugohan o tabemasu.", "Setelah mengunjungi museum seni, kita makan siang."],
      ["午後は自由時間です。", "Gogo wa jiyuu jikan desu.", "Siang hari adalah waktu bebas."],
      ["五時に駅で解散する予定です。", "Goji ni eki de kaisan suru yotei desu.", "Dijadwalkan bubar di stasiun pukul lima."],
    ],
  ],
  // 5. Rencana perjalanan
  [
    [
      ["一日目", "Ichinichime", "hari pertama"],
      ["二日目", "Futsukame", "hari kedua"],
      ["最終日", "Saishuubi", "hari terakhir"],
      ["見学するつもりです", "Kengaku suru tsumori desu", "berencana berkunjung (melihat-lihat)", ["Penulisan rencana yang benar adalah...", "京都へ行くつもりです。", "京都へ行ったつもりです。", "京都へ行きつもりです。", "京都へ行くのつもりです。"]],
    ],
    [
      ["一日目は東京タワーに登るつもりです。", "Ichinichime wa Toukyou tawaa ni noboru tsumori desu.", "Hari pertama saya berencana naik Menara Tokyo."],
      ["二日目は浅草でお寺を見学します。", "Futsukame wa Asakusa de otera o kengaku shimasu.", "Hari kedua saya mengunjungi kuil di Asakusa."],
      ["夜は温泉旅館に泊まる予定です。", "Yoru wa onsen ryokan ni tomaru yotei desu.", "Malamnya dijadwalkan menginap di penginapan onsen."],
      ["最終日は空港で家族にお土産を買います。", "Saishuubi wa kuukou de kazoku ni omiyage o kaimasu.", "Hari terakhir saya membeli oleh-oleh untuk keluarga di bandara."],
    ],
  ],
  // 6. Email permintaan maaf
  [
    [
      ["申し訳ありませんでした", "Moushiwake arimasen deshita", "mohon maaf (atas yang terjadi)"],
      ["今後", "Kongo", "ke depannya"],
      ["確認不足", "Kakunin busoku", "kurang teliti memeriksa"],
      ["気をつけます", "Ki o tsukemasu", "akan berhati-hati", ["Kalimat penutup permintaan maaf yang tepat adalah...", "今後は気をつけます。", "また遅刻します。", "気にしないでください。", "ありがとうございました。"]],
    ],
    [
      ["先日はご迷惑をおかけして、申し訳ありませんでした。", "Senjitsu wa gomeiwaku o okake shite, moushiwake arimasen deshita.", "Mohon maaf telah merepotkan beberapa hari lalu."],
      ["私の確認不足で、間違った資料を送ってしまいました。", "Watashi no kakunin busoku de, machigatta shiryou o okutte shimaimashita.", "Karena kurang teliti, saya mengirim materi yang salah."],
      ["正しい資料を添付いたしましたので、ご確認ください。", "Tadashii shiryou o tenpu itashimashita node, gokakunin kudasai.", "Materi yang benar sudah saya lampirkan, mohon diperiksa."],
      ["今後は十分注意いたします。", "Kongo wa juubun chuui itashimasu.", "Ke depannya saya akan sangat berhati-hati."],
    ],
  ],
  // 7. Ulasan restoran
  [
    [
      ["注文", "Chuumon", "pesanan"],
      ["雰囲気がいい", "Fun-iki ga ii", "suasananya bagus"],
      ["また来たい", "Mata kitai", "ingin datang lagi"],
      ["おすすめしたい", "Osusume shitai", "ingin merekomendasikan", ["Ulasan restoran sebaiknya ditutup dengan...", "rekomendasi", "nomor telepon pribadi", "daftar belanja", "pertanyaan"]],
    ],
    [
      ["昨日、友達と駅前のカレー屋に行きました。", "Kinou, tomodachi to ekimae no karee-ya ni ikimashita.", "Kemarin saya ke kedai kari depan stasiun bersama teman."],
      ["私はチーズカレーを注文しました。", "Watashi wa chiizu karee o chuumon shimashita.", "Saya memesan kari keju."],
      ["少し辛かったですが、とてもおいしかったです。", "Sukoshi karakatta desu ga, totemo oishikatta desu.", "Agak pedas, tetapi sangat enak."],
      ["値段も安いので、学生におすすめしたいです。", "Nedan mo yasui node, gakusei ni osusume shitai desu.", "Harganya juga murah, jadi saya ingin merekomendasikannya kepada pelajar."],
    ],
  ],
  // 8. Ringkasan aturan
  [
    [
      ["こと", "Koto", "(penanda aturan tertulis)"],
      ["必ず", "Kanarazu", "pasti / wajib"],
      ["前日まで", "Zenjitsu made", "paling lambat sehari sebelumnya"],
      ["元の場所", "Moto no basho", "tempat semula", ["Aturan tertulis singkat biasanya diakhiri dengan...", "〜こと。", "〜ね。", "〜よ。", "〜かな。"]],
    ],
    [
      ["遅れるときは必ず連絡すること。", "Okureru toki wa kanarazu renraku suru koto.", "Jika terlambat, wajib memberi kabar."],
      ["部屋を出るときは電気を消すこと。", "Heya o deru toki wa denki o kesu koto.", "Saat keluar ruangan, matikan lampu."],
      ["実験室では食べたり飲んだりしないこと。", "Jikkenshitsu de wa tabetari nondari shinai koto.", "Di laboratorium dilarang makan dan minum."],
      ["借りた本は二週間以内に返すこと。", "Karita hon wa nishuukan inai ni kaesu koto.", "Buku yang dipinjam harus dikembalikan dalam dua minggu."],
    ],
  ],
  // 9. Catatan kesehatan
  [
    [
      ["症状", "Shoujou", "gejala"],
      ["体温", "Taion", "suhu tubuh"],
      ["ようにしている", "You ni shite iru", "membiasakan diri untuk ..."],
      ["治る", "Naoru", "sembuh", ["Untuk menulis 'saya membiasakan tidur cepat', yang benar adalah...", "早く寝るようにしています。", "早く寝るようになっています。", "早く寝たようにします。", "早く寝てようにしています。"]],
    ],
    [
      ["今朝の体温は三十七度五分でした。", "Kesa no taion wa sanjuunana do gobu deshita.", "Suhu tubuh tadi pagi 37,5 derajat."],
      ["頭が痛くて、食欲もありません。", "Atama ga itakute, shokuyoku mo arimasen.", "Kepala saya sakit dan tidak nafsu makan."],
      ["水をたくさん飲むようにしています。", "Mizu o takusan nomu you ni shite imasu.", "Saya membiasakan banyak minum air."],
      ["薬を飲んだので、明日には治ると思います。", "Kusuri o nonda node, ashita ni wa naoru to omoimasu.", "Karena sudah minum obat, saya pikir besok sudah sembuh."],
    ],
  ],
  // 10. Pemberitahuan sekolah
  [
    [
      ["お知らせ", "Oshirase", "pemberitahuan"],
      ["上履き", "Uwabaki", "sepatu dalam ruangan"],
      ["お持ちください", "Omochi kudasai", "harap membawa"],
      ["までお願いします", "Made onegaishimasu", "harap disampaikan kepada ...", ["Pemberitahuan resmi biasanya dimulai dengan...", "judul (〜のお知らせ)", "salam akrab", "tanda tangan", "harga"]],
    ],
    [
      ["遠足のお知らせをよく読んでください。", "Ensoku no oshirase o yoku yonde kudasai.", "Bacalah pemberitahuan darmawisata dengan baik."],
      ["五月十日に動物園へ遠足に行きます。", "Gogatsu tooka ni doubutsuen e ensoku ni ikimasu.", "Tanggal 10 Mei kami berdarmawisata ke kebun binatang."],
      ["お弁当と水筒をお持ちください。", "Obentou to suitou o omochi kudasai.", "Harap membawa bekal dan botol minum."],
      ["雨の場合は、普通の授業をします。", "Ame no baai wa, futsuu no jugyou o shimasu.", "Jika hujan, pelajaran berjalan seperti biasa."],
    ],
  ],
  // 11. Memo kantor
  [
    [
      ["山本様", "Yamamoto sama", "Bapak/Ibu Yamamoto (sangat sopan)"],
      ["お電話がありました", "Odenwa ga arimashita", "ada telepon"],
      ["見積書", "Mitsumorisho", "surat penawaran harga"],
      ["ておきました", "Te okimashita", "sudah saya ... (sebelumnya)", ["Memo kantor biasanya dimulai dengan...", "nama penerima (〜さんへ)", "harga", "salam penutup", "tanggal lahir"]],
    ],
    [
      ["鈴木課長、お疲れさまです。", "Suzuki kachou, otsukaresama desu.", "Kepala Seksi Suzuki, terima kasih atas kerja kerasnya."],
      ["午前十時に佐藤様がいらっしゃいました。", "Gozen juuji ni Satou sama ga irasshaimashita.", "Bapak/Ibu Sato datang pukul sepuluh pagi."],
      ["新しいカタログを置いていかれました。", "Atarashii katarogu o oite ikaremashita.", "Beliau meninggalkan katalog baru."],
      ["お手すきの際に、お電話をお願いします。", "Otesuki no sai ni, odenwa o onegaishimasu.", "Saat senggang, mohon menelepon beliau."],
    ],
  ],
  // 12. Paragraf perbandingan
  [
    [
      ["バスより速い", "Basu yori hayai", "lebih cepat daripada bus"],
      ["それに比べて", "Sore ni kurabete", "dibandingkan dengan itu"],
      ["それぞれのよさ", "Sorezore no yosa", "kelebihan masing-masing"],
      ["違い", "Chigai", "perbedaan", ["Penulisan perbandingan yang benar adalah...", "電車はバスより速いです。", "電車はバスほど速いです。", "電車はバスより速いでした。", "電車をバスより速いです。"]],
    ],
    [
      ["日本の夏はインドネシアより短いです。", "Nihon no natsu wa Indoneshia yori mijikai desu.", "Musim panas di Jepang lebih pendek daripada di Indonesia."],
      ["インドネシアは一年中暑いです。", "Indoneshia wa ichinenjuu atsui desu.", "Indonesia panas sepanjang tahun."],
      ["一方、日本には四つの季節があります。", "Ippou, Nihon ni wa yottsu no kisetsu ga arimasu.", "Sementara itu, Jepang punya empat musim."],
      ["どちらの国にもそれぞれのよさがあると思います。", "Dochira no kuni ni mo sorezore no yosa ga aru to omoimasu.", "Menurut saya kedua negara punya kelebihan masing-masing."],
    ],
  ],
  // 13. Rencana masa depan
  [
    [
      ["合格する", "Goukaku suru", "lulus (ujian)"],
      ["そのために", "Sono tame ni", "untuk itu"],
      ["専門学校", "Senmon gakkou", "sekolah kejuruan"],
      ["自分の店", "Jibun no mise", "toko sendiri", ["Untuk menulis tujuan 'agar lulus ujian', yang benar adalah...", "試験に合格するために、勉強します。", "試験を合格するために、勉強します。", "試験に合格したために、勉強します。", "試験に合格ために、勉強します。"]],
    ],
    [
      ["来年、大学の入学試験に合格したいです。", "Rainen, daigaku no nyuugaku shiken ni goukaku shitai desu.", "Tahun depan saya ingin lulus ujian masuk universitas."],
      ["そのために、毎晩二時間勉強しています。", "Sono tame ni, maiban nijikan benkyou shite imasu.", "Untuk itu, saya belajar dua jam setiap malam."],
      ["大学では経済を勉強するつもりです。", "Daigaku de wa keizai o benkyou suru tsumori desu.", "Di universitas saya berniat belajar ekonomi."],
      ["将来は国際的な仕事がしたいです。", "Shourai wa kokusaiteki na shigoto ga shitai desu.", "Di masa depan saya ingin melakukan pekerjaan internasional."],
    ],
  ],
  // 14. Pendapat dengan alasan
  [
    [
      ["理由", "Riyuu", "alasan"],
      ["第一に", "Dai ichi ni", "pertama"],
      ["第二に", "Dai ni ni", "kedua"],
      ["以上の理由で", "Ijou no riyuu de", "dengan alasan-alasan di atas", ["Esai pendapat yang baik memuat...", "pendapat dan alasan", "hanya daftar kata", "hanya pertanyaan", "hanya salam"]],
    ],
    [
      ["私は制服がないほうがいいと思います。", "Watashi wa seifuku ga nai hou ga ii to omoimasu.", "Menurut saya lebih baik tidak ada seragam."],
      ["第一に、自分の好きな服を着られるからです。", "Dai ichi ni, jibun no suki na fuku o kirareru kara desu.", "Pertama, karena bisa memakai baju yang disukai."],
      ["第二に、制服は値段が高いからです。", "Dai ni ni, seifuku wa nedan ga takai kara desu.", "Kedua, karena harga seragam mahal."],
      ["以上の理由で、制服は必要ないと考えます。", "Ijou no riyuu de, seifuku wa hitsuyou nai to kangaemasu.", "Dengan alasan di atas, saya berpendapat seragam tidak perlu."],
    ],
  ],
  // 15. Buku harian 120 karakter
  [
    [
      ["初日", "Shonichi", "hari pertama (kegiatan baru)"],
      ["頭がいっぱい", "Atama ga ippai", "kepala penuh"],
      ["安心した", "Anshin shita", "merasa lega"],
      ["だった", "Datta", "adalah (lampau, biasa)", ["Buku harian dengan gaya biasa memakai...", "だ / だった", "でございます", "ませんでした saja", "ください"]],
    ],
    [
      ["今日は新しい学校の初日だった。", "Kyou wa atarashii gakkou no shonichi datta.", "Hari ini hari pertama di sekolah baru."],
      ["知らない人ばかりで、少し緊張した。", "Shiranai hito bakari de, sukoshi kinchou shita.", "Semuanya orang yang tidak kukenal, aku agak gugup."],
      ["でも、隣の席の子が話しかけてくれて、安心した。", "Demo, tonari no seki no ko ga hanashikakete kurete, anshin shita.", "Tapi anak di kursi sebelah mengajakku bicara, aku lega."],
      ["明日はもっとたくさんの人と話してみたい。", "Ashita wa motto takusan no hito to hanashite mitai.", "Besok aku ingin mencoba berbicara dengan lebih banyak orang."],
    ],
  ],
  // 16. Kalimat dengan kanji N4
  [
    [
      ["問題", "Mondai", "masalah / soal"],
      ["海外旅行", "Kaigai ryokou", "wisata ke luar negeri"],
      ["経験者", "Keikensha", "orang yang berpengalaman"],
      ["反対意見", "Hantai iken", "pendapat yang menentang", ["Bacaan kanji 経験 adalah...", "keiken", "kyouken", "keigen", "kenkei"]],
    ],
    [
      ["この問題は難しくて、答えがわかりません。", "Kono mondai wa muzukashikute, kotae ga wakarimasen.", "Soal ini sulit, saya tidak tahu jawabannya."],
      ["会議でみんなの意見を聞きました。", "Kaigi de minna no iken o kikimashita.", "Saya mendengarkan pendapat semua orang di rapat."],
      ["去年、一人で海外旅行をしました。", "Kyonen, hitori de kaigai ryokou o shimashita.", "Tahun lalu saya berwisata ke luar negeri sendirian."],
      ["いろいろな経験をして、成長したいです。", "Iroiro na keiken o shite, seichou shitai desu.", "Saya ingin tumbuh dengan mengalami berbagai hal."],
    ],
  ],
  // 17. Menjawab formulir
  [
    [
      ["志望動機", "Shibou douki", "motivasi melamar"],
      ["特技", "Tokugi", "keahlian khusus"],
      ["勤務可能日", "Kinmu kanoubi", "hari yang bisa bekerja"],
      ["連絡先", "Renrakusaki", "kontak", ["Kolom 志望動機 diisi dengan...", "alasan melamar", "alamat rumah", "tanggal lahir", "nama orang tua"]],
    ],
    [
      ["人と話すのが好きなので、接客の仕事を希望します。", "Hito to hanasu no ga suki na node, sekkyaku no shigoto o kibou shimasu.", "Karena suka berbicara dengan orang, saya ingin pekerjaan melayani pelanggan."],
      ["土日は一日中働けます。", "Donichi wa ichinichijuu hatarakemasu.", "Sabtu dan Minggu saya bisa bekerja seharian."],
      ["パソコンで簡単な資料が作れます。", "Pasokon de kantan na shiryou ga tsukuremasu.", "Saya bisa membuat dokumen sederhana dengan komputer."],
      ["日本語能力試験のN4に合格しています。", "Nihongo nouryoku shiken no enu yon ni goukaku shite imasu.", "Saya sudah lulus JLPT N4."],
    ],
  ],
  // 18. Postingan media sosial
  [
    [
      ["最高", "Saikou", "terbaik"],
      ["びっくりした", "Bikkuri shita", "kaget"],
      ["また行きたい", "Mata ikitai", "ingin pergi lagi"],
      ["今日の一枚", "Kyou no ichimai", "foto hari ini", ["Gaya bahasa postingan media sosial biasanya...", "santai dan singkat", "sangat formal", "seperti surat resmi", "bahasa hukum"]],
    ],
    [
      ["今日は友達と初めてディズニーランドに行った！", "Kyou wa tomodachi to hajimete Dizuniirando ni itta!", "Hari ini pertama kali ke Disneyland bersama teman!"],
      ["人が多すぎて、びっくりした。", "Hito ga oosugite, bikkuri shita.", "Orangnya terlalu banyak, aku kaget."],
      ["でも、パレードがきれいで最高だった。", "Demo, pareedo ga kirei de saikou datta.", "Tapi paradenya indah, luar biasa."],
      ["次は家族と来たいな。", "Tsugi wa kazoku to kitai na.", "Lain kali aku ingin datang bersama keluarga."],
    ],
  ],
  // 19. Esai mini
  [
    [
      ["このように", "Kono you ni", "dengan demikian"],
      ["例を挙げる", "Rei o ageru", "memberi contoh"],
      ["習慣", "Shuukan", "kebiasaan"],
      ["環境", "Kankyou", "lingkungan", ["Esai mini sebaiknya ditutup dengan...", "pendapat atau kesimpulan", "pertanyaan baru", "daftar harga", "nomor telepon"]],
    ],
    [
      ["最近、マイバッグを使う人が増えています。", "Saikin, mai baggu o tsukau hito ga fuete imasu.", "Akhir-akhir ini orang yang memakai tas belanja sendiri bertambah."],
      ["例えば、私の母は毎日買い物に袋を持っていきます。", "Tatoeba, watashi no haha wa mainichi kaimono ni fukuro o motte ikimasu.", "Misalnya, ibu saya setiap hari membawa tas saat berbelanja."],
      ["そうすれば、プラスチックのごみが減ります。", "Sou sureba, purasuchikku no gomi ga herimasu.", "Dengan begitu, sampah plastik berkurang."],
      ["このように、一人一人の行動が大切だと思います。", "Kono you ni, hitori hitori no koudou ga taisetsu da to omoimasu.", "Dengan demikian, menurut saya tindakan setiap orang itu penting."],
    ],
  ],
  // 20. Ulasan writing N4
  [
    [
      ["助詞", "Joshi", "partikel"],
      ["敬語", "Keigo", "bahasa hormat"],
      ["文章", "Bunshou", "tulisan / karangan"],
      ["直す", "Naosu", "memperbaiki", ["Dalam satu tulisan, gaya bahasa sebaiknya...", "konsisten (sopan semua atau biasa semua)", "dicampur bebas", "selalu bahasa lisan", "tanpa partikel"]],
    ],
    [
      ["書いた文章をもう一度読み直しましょう。", "Kaita bunshou o mou ichido yominaoshimashou.", "Mari membaca ulang tulisan yang sudah ditulis."],
      ["です・ます形と普通形を混ぜないようにしましょう。", "Desu masu kei to futsuukei o mazenai you ni shimashou.", "Usahakan tidak mencampur bentuk desu/masu dengan bentuk biasa."],
      ["漢字が正しいかどうか辞書で確かめました。", "Kanji ga tadashii ka dou ka jisho de tashikamemashita.", "Saya memastikan di kamus apakah kanjinya benar."],
      ["来年は日本語でレポートが書けるようになりたいです。", "Rainen wa Nihongo de repooto ga kakeru you ni naritai desu.", "Tahun depan saya ingin bisa menulis laporan dalam bahasa Jepang."],
    ],
  ],
];
