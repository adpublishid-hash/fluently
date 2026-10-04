import type { JapaneseQuizTopic } from '../types';

// Latihan Listening N5 — one entry per topic (index = topic - 1): [Basic, Advanced].
export const listening: JapaneseQuizTopic[] = [
  // 1. Mendengar salam
  [
    [
      ["ただいま", "Tadaima", "saya pulang (saat tiba di rumah)"],
      ["おかえりなさい", "Okaerinasai", "selamat datang kembali (di rumah)", ["Kamu mendengar \"tadaima\". Jawaban yang tepat adalah...", "おかえりなさい", "いってらっしゃい", "いただきます", "おやすみなさい"]],
      ["いってらっしゃい", "Itterasshai", "hati-hati di jalan (yang ditinggal)"],
      ["ごちそうさま", "Gochisousama", "terima kasih atas makanannya"],
    ],
    [
      ["おはよう。今日は早いね。", "Ohayou. Kyou wa hayai ne.", "Pagi. Hari ini kamu datang awal, ya."],
      ["ただいま。ああ、疲れた。", "Tadaima. Aa, tsukareta.", "Saya pulang. Aduh, capek."],
      ["いってらっしゃい。気をつけてね。", "Itterasshai. Ki o tsukete ne.", "Hati-hati di jalan, ya."],
      ["お先に失礼します。また明日。", "Osaki ni shitsurei shimasu. Mata ashita.", "Saya pamit duluan. Sampai besok.", ["Kamu mendengar kalimat itu di kantor. Pembicara sedang...", "pulang lebih dulu", "baru datang", "meminta maaf", "memesan makanan"]],
    ],
  ],
  // 2. Angka dan waktu
  [
    [
      ["三時", "Sanji", "pukul tiga"],
      ["十分", "Juppun", "sepuluh menit"],
      ["八時", "Hachiji", "pukul delapan"],
      ["四十五分", "Yonjuugofun", "empat puluh lima menit", ["Kamu mendengar \"kuji\". Jamnya adalah...", "pukul 9", "pukul 4", "pukul 7", "pukul 6"]],
    ],
    [
      ["バスは九時二十分に来ます。", "Basu wa kuji nijuppun ni kimasu.", "Bus datang pukul sembilan lewat dua puluh.", ["Dari audio itu, bus datang pukul...", "09.20", "02.09", "09.02", "12.20"]],
      ["会議は四時から五時半までです。", "Kaigi wa yoji kara goji han made desu.", "Rapat dari pukul empat sampai setengah enam."],
      ["私の番号は〇九〇の五六七八です。", "Watashi no bangou wa zero kyuu zero no go roku nana hachi desu.", "Nomor saya 090-5678."],
      ["店は朝十時に開きます。", "Mise wa asa juuji ni akimasu.", "Toko buka pukul sepuluh pagi."],
    ],
  ],
  // 3. Instruksi di kelas
  [
    [
      ["書いてください", "Kaite kudasai", "tolong tulis"],
      ["読んでください", "Yonde kudasai", "tolong baca"],
      ["立ってください", "Tatte kudasai", "tolong berdiri", ["Kamu mendengar \"suwatte kudasai\". Guru meminta kamu...", "duduk", "berdiri", "menulis", "membaca"]],
      ["閉じてください", "Tojite kudasai", "tolong tutup (buku)"],
    ],
    [
      ["教科書を閉じてください。", "Kyoukasho o tojite kudasai.", "Tolong tutup buku pelajaran."],
      ["名前を大きく書いてください。", "Namae o ookiku kaite kudasai.", "Tolong tulis nama dengan besar."],
      ["となりの人と話してください。", "Tonari no hito to hanashite kudasai.", "Silakan berbicara dengan orang di sebelahmu."],
      ["CDをもう一回聞きましょう。", "CD o mou ikkai kikimashou.", "Mari dengarkan CD sekali lagi.", ["Dari audio itu, guru mengajak murid untuk...", "mendengarkan lagi", "menulis lagi", "pulang", "membaca buku"]],
    ],
  ],
  // 4. Pengumuman stasiun
  [
    [
      ["まもなく", "Mamonaku", "sebentar lagi"],
      ["番線", "Bansen", "jalur (peron)"],
      ["行き", "Yuki", "tujuan (kereta)"],
      ["ドアが閉まります", "Doa ga shimarimasu", "pintu akan ditutup", ["Kamu mendengar \"mamonaku\" di stasiun. Artinya...", "sebentar lagi", "terlambat", "berhenti", "terakhir"]],
    ],
    [
      ["まもなく、二番線に大阪行きの電車が参ります。", "Mamonaku, nibansen ni Oosaka yuki no densha ga mairimasu.", "Sebentar lagi kereta tujuan Osaka tiba di jalur dua.", ["Dari pengumuman itu, kereta tiba di jalur...", "2", "1", "3", "4"]],
      ["ドアが閉まります。ご注意ください。", "Doa ga shimarimasu. Go chuui kudasai.", "Pintu akan ditutup. Harap berhati-hati."],
      ["次は渋谷、渋谷です。", "Tsugi wa Shibuya, Shibuya desu.", "Berikutnya Shibuya, Shibuya."],
      ["この電車は各駅に止まります。", "Kono densha wa kakueki ni tomarimasu.", "Kereta ini berhenti di setiap stasiun."],
    ],
  ],
  // 5. Dialog di toko
  [
    [
      ["お弁当", "Obentou", "bekal / nasi kotak"],
      ["おつり", "Otsuri", "kembalian"],
      ["レシート", "Reshiito", "struk belanja"],
      ["温めますか", "Atatamemasu ka", "perlu dihangatkan?", ["Kasir bertanya \"atatamemasu ka\". Ia menawarkan untuk...", "menghangatkan makanan", "membungkus hadiah", "memberi diskon", "memberi kantong"]],
    ],
    [
      ["こちらのお弁当は温めますか。", "Kochira no obentou wa atatamemasu ka.", "Bekal ini perlu dihangatkan?"],
      ["はい、お願いします。", "Hai, onegaishimasu.", "Ya, tolong."],
      ["全部で千二百円です。", "Zenbu de sen nihyakuen desu.", "Semuanya seribu dua ratus yen.", ["Jika kamu membayar 2.000 yen untuk total itu, kembaliannya...", "800 yen", "1.200 yen", "200 yen", "1.000 yen"]],
      ["レシートはいりますか。", "Reshiito wa irimasu ka.", "Perlu struk?"],
    ],
  ],
  // 6. Dialog di restoran
  [
    [
      ["何名様", "Nanmeisama", "berapa orang (sopan)"],
      ["禁煙席", "Kin-enseki", "kursi bebas rokok"],
      ["ご注文", "Gochuumon", "pesanan"],
      ["お決まりですか", "Okimari desu ka", "sudah memutuskan?", ["Pelayan bertanya \"nanmeisama desu ka\". Ia ingin tahu...", "jumlah orang", "pesanan", "cara bayar", "jam kedatangan"]],
    ],
    [
      ["いらっしゃいませ。何名様ですか。", "Irasshaimase. Nanmeisama desu ka.", "Selamat datang. Untuk berapa orang?"],
      ["三人です。禁煙席をお願いします。", "Sannin desu. Kin-enseki o onegaishimasu.", "Tiga orang. Minta kursi bebas rokok."],
      ["ご注文を繰り返します。", "Gochuumon o kurikaeshimasu.", "Saya ulangi pesanannya."],
      ["お飲み物は何になさいますか。", "Onomimono wa nani ni nasaimasu ka.", "Minumannya mau apa?"],
    ],
  ],
  // 7. Mendengar rutinitas
  [
    [
      ["まず", "Mazu", "pertama-tama"],
      ["次に", "Tsugi ni", "selanjutnya"],
      ["最後に", "Saigo ni", "terakhir"],
      ["朝ご飯の後で", "Asagohan no ato de", "setelah sarapan", ["Urutan penanda yang benar adalah...", "まず → 次に → 最後に", "最後に → まず → 次に", "次に → 最後に → まず", "まず → 最後に → 次に"]],
    ],
    [
      ["朝起きて、まずコーヒーを飲みます。", "Asa okite, mazu koohii o nomimasu.", "Setelah bangun pagi, pertama-tama saya minum kopi."],
      ["次に、新聞を読みます。", "Tsugi ni, shinbun o yomimasu.", "Selanjutnya, saya membaca koran."],
      ["夜はたいてい九時ごろ家に帰ります。", "Yoru wa taitei kuji goro ie ni kaerimasu.", "Malam hari biasanya saya pulang sekitar pukul sembilan."],
      ["週末は朝十時まで寝ています。", "Shuumatsu wa asa juuji made nete imasu.", "Akhir pekan saya tidur sampai pukul sepuluh pagi.", ["Dari audio itu, akhir pekan ia tidur sampai...", "pukul 10 pagi", "pukul 9 malam", "pukul 7 pagi", "pukul 12 siang"]],
    ],
  ],
  // 8. Percakapan tentang keluarga
  [
    [
      ["祖父", "Sofu", "kakek (sendiri)"],
      ["両親", "Ryoushin", "orang tua"],
      ["兄弟", "Kyoudai", "saudara kandung"],
      ["奥さん", "Okusan", "istri (orang lain)", ["Kamu mendengar \"ryoushin\". Yang dimaksud adalah...", "ayah dan ibu", "kakek dan nenek", "kakak dan adik", "suami dan istri"]],
    ],
    [
      ["両親は名古屋に住んでいます。", "Ryoushin wa Nagoya ni sunde imasu.", "Orang tua saya tinggal di Nagoya."],
      ["弟は今、大学で勉強しています。", "Otouto wa ima, daigaku de benkyou shite imasu.", "Adik laki-laki saya sekarang belajar di universitas."],
      ["祖父は毎朝公園を散歩します。", "Sofu wa maiasa kouen o sanpo shimasu.", "Kakek saya berjalan-jalan di taman setiap pagi."],
      ["姉は結婚して、子どもが二人います。", "Ane wa kekkon shite, kodomo ga futari imasu.", "Kakak perempuan saya sudah menikah dan punya dua anak.", ["Dari audio itu, kakak perempuannya punya...", "dua anak", "satu anak", "tiga anak", "tidak punya anak"]],
    ],
  ],
  // 9. Prakiraan cuaca
  [
    [
      ["晴れのちくもり", "Hare nochi kumori", "cerah lalu berawan"],
      ["最低気温", "Saitei kion", "suhu terendah"],
      ["何度", "Nando", "berapa derajat"],
      ["台風", "Taifuu", "topan", ["Kamu mendengar \"hare nochi ame\". Cuacanya...", "cerah lalu hujan", "hujan lalu cerah", "cerah terus", "salju"]],
    ],
    [
      ["今日は一日中くもりでしょう。", "Kyou wa ichinichijuu kumori deshou.", "Hari ini kemungkinan berawan seharian."],
      ["最低気温は五度です。", "Saitei kion wa godo desu.", "Suhu terendah lima derajat."],
      ["午後から強い風が吹くでしょう。", "Gogo kara tsuyoi kaze ga fuku deshou.", "Mulai siang kemungkinan angin bertiup kencang."],
      ["週末は台風が来るかもしれません。", "Shuumatsu wa taifuu ga kuru kamoshiremasen.", "Akhir pekan mungkin topan datang."],
    ],
  ],
  // 10. Arah sederhana
  [
    [
      ["前", "Mae", "depan"],
      ["後ろ", "Ushiro", "belakang"],
      ["隣", "Tonari", "sebelah"],
      ["間", "Aida", "antara", ["Kamu mendengar \"ushiro\". Posisinya di...", "belakang", "depan", "sebelah", "atas"]],
    ],
    [
      ["郵便局は駅の後ろにあります。", "Yuubinkyoku wa eki no ushiro ni arimasu.", "Kantor pos ada di belakang stasiun."],
      ["本屋はスーパーの向かいです。", "Hon-ya wa suupaa no mukai desu.", "Toko buku ada di seberang supermarket."],
      ["二つ目の角を右に曲がってすぐです。", "Futatsume no kado o migi ni magatte sugu desu.", "Belok kanan di tikungan kedua, langsung sampai."],
      ["学校と病院の間に公園があります。", "Gakkou to byouin no aida ni kouen ga arimasu.", "Di antara sekolah dan rumah sakit ada taman.", ["Dari audio itu, taman berada...", "di antara sekolah dan rumah sakit", "di depan sekolah", "di belakang rumah sakit", "di sebelah stasiun"]],
    ],
  ],
  // 11. Pesan telepon
  [
    [
      ["もしもし", "Moshimoshi", "halo (di telepon)"],
      ["伝言", "Dengon", "pesan titipan"],
      ["かけ直します", "Kakenaoshimasu", "akan menelepon lagi"],
      ["留守", "Rusu", "sedang tidak di rumah", ["Kamu mendengar \"ato de kakenaoshimasu\". Penelepon akan...", "menelepon lagi nanti", "datang ke rumah", "menunggu di stasiun", "mengirim surat"]],
    ],
    [
      ["もしもし、山本さんのお宅ですか。", "Moshimoshi, Yamamoto san no otaku desu ka.", "Halo, apakah ini rumah keluarga Yamamoto?"],
      ["父は今、出かけています。", "Chichi wa ima, dekakete imasu.", "Ayah sedang keluar sekarang."],
      ["では、また後でかけ直します。", "De wa, mata ato de kakenaoshimasu.", "Kalau begitu, saya akan menelepon lagi nanti."],
      ["明日の会議は十時からだと伝えてください。", "Ashita no kaigi wa juuji kara da to tsutaete kudasai.", "Tolong sampaikan bahwa rapat besok mulai pukul sepuluh.", ["Dari pesan itu, rapat besok dimulai pukul...", "10", "2", "9", "12"]],
    ],
  ],
  // 12. Jadwal mingguan
  [
    [
      ["火曜日", "Kayoubi", "hari Selasa"],
      ["水曜日", "Suiyoubi", "hari Rabu"],
      ["木曜日", "Mokuyoubi", "hari Kamis"],
      ["土曜日", "Doyoubi", "hari Sabtu", ["Kamu mendengar \"mokuyoubi\". Harinya...", "Kamis", "Rabu", "Selasa", "Jumat"]],
    ],
    [
      ["木曜日の午後は会議があります。", "Mokuyoubi no gogo wa kaigi ga arimasu.", "Kamis sore ada rapat."],
      ["水曜日はアルバイトの日です。", "Suiyoubi wa arubaito no hi desu.", "Hari Rabu adalah hari kerja paruh waktu."],
      ["毎週土曜日にピアノを習っています。", "Maishuu doyoubi ni piano o naratte imasu.", "Setiap Sabtu saya belajar piano."],
      ["日曜日は何も予定がありません。", "Nichiyoubi wa nani mo yotei ga arimasen.", "Hari Minggu tidak ada rencana apa pun.", ["Dari audio itu, hari tanpa rencana adalah...", "Minggu", "Sabtu", "Rabu", "Kamis"]],
    ],
  ],
  // 13. Obrolan hobi
  [
    [
      ["ときどき", "Tokidoki", "kadang-kadang"],
      ["いつも", "Itsumo", "selalu"],
      ["あまり", "Amari", "tidak terlalu (dengan negatif)"],
      ["全然", "Zenzen", "sama sekali tidak", ["Urutan frekuensi dari paling sering adalah...", "いつも → よく → ときどき → 全然", "全然 → いつも → よく → ときどき", "ときどき → いつも → 全然 → よく", "よく → 全然 → ときどき → いつも"]],
    ],
    [
      ["私はよく図書館で本を読みます。", "Watashi wa yoku toshokan de hon o yomimasu.", "Saya sering membaca buku di perpustakaan."],
      ["弟は毎日ゲームをしています。", "Otouto wa mainichi geemu o shite imasu.", "Adik laki-laki saya bermain game setiap hari."],
      ["テニスは全然しません。", "Tenisu wa zenzen shimasen.", "Saya sama sekali tidak bermain tenis."],
      ["日曜日にときどき釣りに行きます。", "Nichiyoubi ni tokidoki tsuri ni ikimasu.", "Hari Minggu kadang-kadang saya pergi memancing."],
    ],
  ],
  // 14. Ajakan singkat
  [
    [
      ["カラオケ", "Karaoke", "karaoke"],
      ["残念ですが", "Zannen desu ga", "sayang sekali, tetapi..."],
      ["用事", "Youji", "urusan / keperluan"],
      ["また今度", "Mata kondo", "lain kali", ["Kamu mendengar \"zannen desu ga, youji ga arimasu\". Temanmu...", "menolak ajakan", "menerima ajakan", "terlambat", "sakit"]],
    ],
    [
      ["土曜日、一緒に買い物に行かない？", "Doyoubi, issho ni kaimono ni ikanai?", "Sabtu, mau belanja bareng?"],
      ["うん、いいよ。何時にする？", "Un, ii yo. Nanji ni suru?", "Iya, boleh. Jam berapa?"],
      ["ごめん、その日は用事があるんだ。", "Gomen, sono hi wa youji ga aru n da.", "Maaf, hari itu aku ada urusan.", ["Dari audio itu, temanmu...", "tidak bisa karena ada urusan", "setuju pergi", "lupa janji", "sakit"]],
      ["じゃ、駅の改札で十時に会おう。", "Ja, eki no kaisatsu de juuji ni aou.", "Kalau begitu, ketemu di gerbang tiket stasiun jam sepuluh."],
    ],
  ],
  // 15. Barang hilang
  [
    [
      ["財布", "Saifu", "dompet"],
      ["忘れ物", "Wasuremono", "barang tertinggal"],
      ["茶色", "Chairo", "cokelat (warna)"],
      ["交番", "Kouban", "pos polisi", ["Barang hilang biasanya dilaporkan ke...", "交番", "銀行", "郵便局", "本屋"]],
    ],
    [
      ["電車にかさを忘れました。", "Densha ni kasa o wasuremashita.", "Payung saya tertinggal di kereta."],
      ["黒くて大きいかばんです。", "Kurokute ookii kaban desu.", "Tasnya hitam dan besar.", ["Dari audio itu, ciri tasnya adalah...", "hitam dan besar", "cokelat dan kecil", "putih dan besar", "hitam dan kecil"]],
      ["中にパスポートが入っています。", "Naka ni pasupooto ga haitte imasu.", "Di dalamnya ada paspor."],
      ["交番に届けましたか。", "Kouban ni todokemashita ka.", "Sudah dilaporkan ke pos polisi?"],
    ],
  ],
  // 16. Transportasi
  [
    [
      ["二十分かかります", "Nijuppun kakarimasu", "butuh dua puluh menit"],
      ["乗ります", "Norimasu", "naik (kendaraan)"],
      ["降ります", "Orimasu", "turun (kendaraan)"],
      ["新幹線", "Shinkansen", "kereta cepat Shinkansen", ["Kamu mendengar \"orimasu\". Artinya...", "turun", "naik", "transit", "menunggu"]],
    ],
    [
      ["東京から大阪まで新幹線で二時間半かかります。", "Toukyou kara Oosaka made shinkansen de nijikan han kakarimasu.", "Dari Tokyo ke Osaka naik Shinkansen butuh dua setengah jam.", ["Dari audio itu, perjalanan memakan waktu...", "2,5 jam", "2 jam", "30 menit", "3,5 jam"]],
      ["駅からバスに乗って十五分です。", "Eki kara basu ni notte juugofun desu.", "Dari stasiun naik bus lima belas menit."],
      ["タクシーで空港へ行きました。", "Takushii de kuukou e ikimashita.", "Saya pergi ke bandara naik taksi."],
      ["毎朝、電車がとても混んでいます。", "Maiasa, densha ga totemo konde imasu.", "Setiap pagi keretanya sangat penuh."],
    ],
  ],
  // 17. Ke dokter
  [
    [
      ["熱", "Netsu", "demam"],
      ["せき", "Seki", "batuk"],
      ["のど", "Nodo", "tenggorokan"],
      ["薬", "Kusuri", "obat", ["Dokter bertanya \"dou shimashita ka\". Artinya...", "ada keluhan apa?", "mau obat apa?", "datang dari mana?", "kapan pulang?"]],
    ],
    [
      ["せきが出て、のどが痛いです。", "Seki ga dete, nodo ga itai desu.", "Saya batuk dan tenggorokan sakit."],
      ["熱は三十八度あります。", "Netsu wa sanjuuhachido arimasu.", "Demamnya 38 derajat."],
      ["今日はお風呂に入らないでください。", "Kyou wa ofuro ni hairanaide kudasai.", "Hari ini jangan mandi berendam."],
      ["この薬は食事の後で飲んでください。", "Kono kusuri wa shokuji no ato de nonde kudasai.", "Minum obat ini setelah makan.", ["Dari audio itu, obat diminum...", "setelah makan", "sebelum makan", "sebelum tidur", "saat bangun"]],
    ],
  ],
  // 18. Permintaan sederhana
  [
    [
      ["手伝って", "Tetsudatte", "tolong bantu"],
      ["貸してください", "Kashite kudasai", "tolong pinjamkan"],
      ["消してください", "Keshite kudasai", "tolong matikan / hapus"],
      ["開けてくれませんか", "Akete kuremasen ka", "bisakah kamu membukakan?", ["Kamu mendengar \"kashite kudasai\". Orang itu ingin...", "meminjam sesuatu", "mengembalikan sesuatu", "membeli sesuatu", "membuang sesuatu"]],
    ],
    [
      ["すみません、ペンを貸してください。", "Sumimasen, pen o kashite kudasai.", "Permisi, tolong pinjamkan pulpen."],
      ["ちょっと窓を開けてくれませんか。", "Chotto mado o akete kuremasen ka.", "Bisakah kamu membukakan jendela sebentar?"],
      ["テレビの音を小さくしてください。", "Terebi no oto o chiisaku shite kudasai.", "Tolong kecilkan suara TV."],
      ["この箱を運ぶのを手伝ってくれませんか。", "Kono hako o hakobu no o tetsudatte kuremasen ka.", "Bisakah kamu membantu mengangkat kotak ini?"],
    ],
  ],
  // 19. Cerita pendek
  [
    [
      ["ある日", "Aru hi", "suatu hari"],
      ["びっくりしました", "Bikkuri shimashita", "terkejut"],
      ["うれしかった", "Ureshikatta", "senang (lampau)"],
      ["それで", "Sorede", "karena itu / lalu", ["Kata pembuka cerita 'suatu hari' adalah...", "ある日", "毎日", "今日", "明日"]],
    ],
    [
      ["ある日、駅で古い友達に会いました。", "Aru hi, eki de furui tomodachi ni aimashita.", "Suatu hari, saya bertemu teman lama di stasiun."],
      ["私はとてもびっくりしました。", "Watashi wa totemo bikkuri shimashita.", "Saya sangat terkejut."],
      ["二人で喫茶店に入って、たくさん話しました。", "Futari de kissaten ni haitte, takusan hanashimashita.", "Kami berdua masuk ke kafe dan banyak mengobrol."],
      ["その日はとても楽しい一日でした。", "Sono hi wa totemo tanoshii ichinichi deshita.", "Hari itu adalah hari yang sangat menyenangkan.", ["Dari cerita itu, perasaan pembicara di akhir adalah...", "senang", "sedih", "marah", "takut"]],
    ],
  ],
  // 20. Ulasan listening N5
  [
    [
      ["何階", "Nangai", "lantai berapa"],
      ["休み", "Yasumi", "libur / istirahat"],
      ["一枚", "Ichimai", "selembar"],
      ["来ません", "Kimasen", "tidak datang", ["Kamu mendengar \"sangai\". Artinya...", "lantai tiga", "tiga kali", "tiga lembar", "tiga orang"]],
    ],
    [
      ["トイレは二階の奥にあります。", "Toire wa nikai no oku ni arimasu.", "Toilet ada di ujung lantai dua."],
      ["この美術館は月曜日が休館日です。", "Kono bijutsukan wa getsuyoubi ga kyuukanbi desu.", "Museum seni ini tutup setiap hari Senin."],
      ["大人は五百円、子どもは二百円です。", "Otona wa gohyakuen, kodomo wa nihyakuen desu.", "Dewasa lima ratus yen, anak-anak dua ratus yen.", ["Dari audio itu, harga untuk dua dewasa adalah...", "1.000 yen", "700 yen", "500 yen", "400 yen"]],
      ["鈴木さんは風邪で今日は休みです。", "Suzuki san wa kaze de kyou wa yasumi desu.", "Suzuki hari ini tidak masuk karena flu."],
    ],
  ],
];
