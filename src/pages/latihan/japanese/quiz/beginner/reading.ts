import type { JapaneseQuizTopic } from '../types';

// Latihan Reading N5 — one entry per topic (index = topic - 1): [Basic, Advanced].
export const reading: JapaneseQuizTopic[] = [
  // 1. Membaca kata hiragana
  [
    [
      ["さかな", "Sakana", "ikan"],
      ["いぬ", "Inu", "anjing"],
      ["やま", "Yama", "gunung"],
      ["くつ", "Kutsu", "sepatu", ["Bacaan hiragana いぬ adalah...", "inu", "ine", "anu", "ishi"]],
    ],
    [
      ["わたしはりんごがすきです。", "Watashi wa ringo ga suki desu.", "Saya suka apel."],
      ["きょうはあめです。", "Kyou wa ame desu.", "Hari ini hujan."],
      ["いぬとさんぽします。", "Inu to sanpo shimasu.", "Saya jalan-jalan dengan anjing."],
      ["おとうさんはしんぶんをよみます。", "Otousan wa shinbun o yomimasu.", "Ayah membaca koran.", ["Dalam kalimat, partikel は dibaca...", "wa", "ha", "e", "o"]],
    ],
  ],
  // 2. Membaca kata katakana
  [
    [
      ["パン", "Pan", "roti"],
      ["テレビ", "Terebi", "televisi"],
      ["カメラ", "Kamera", "kamera"],
      ["コーヒー", "Koohii", "kopi", ["Tanda ー dalam katakana berarti...", "vokal dipanjangkan", "huruf kecil", "bunyi berhenti", "tanda tanya"]],
    ],
    [
      ["スーパーでパンを買いました。", "Suupaa de pan o kaimashita.", "Saya membeli roti di supermarket."],
      ["新しいカメラが欲しいです。", "Atarashii kamera ga hoshii desu.", "Saya ingin kamera baru."],
      ["毎晩テレビでニュースを見ます。", "Maiban terebi de nyuusu o mimasu.", "Setiap malam saya menonton berita di TV."],
      ["このレストランのピザはおいしいです。", "Kono resutoran no piza wa oishii desu.", "Pizza di restoran ini enak."],
    ],
  ],
  // 3. Rambu sederhana
  [
    [
      ["入口", "Iriguchi", "pintu masuk"],
      ["出口", "Deguchi", "pintu keluar"],
      ["禁煙", "Kin-en", "dilarang merokok"],
      ["引く", "Hiku", "tarik", ["Rambu 押す pada pintu berarti...", "dorong", "tarik", "tutup", "buka otomatis"]],
    ],
    [
      ["東口は工事中です。", "Higashiguchi wa koujichuu desu.", "Pintu timur sedang dalam perbaikan."],
      ["このドアは引いてください。", "Kono doa wa hiite kudasai.", "Pintu ini silakan ditarik."],
      ["ここに自転車を止めないでください。", "Koko ni jitensha o tomenaide kudasai.", "Jangan parkir sepeda di sini.", ["Rambu 〜ないでください berarti...", "jangan ...", "silakan ...", "boleh ...", "harus ..."]],
      ["トイレは二階にあります。", "Toire wa nikai ni arimasu.", "Toilet ada di lantai dua."],
    ],
  ],
  // 4. Membaca menu
  [
    [
      ["定食", "Teishoku", "paket makan"],
      ["税込", "Zeikomi", "termasuk pajak"],
      ["大盛り", "Oomori", "porsi besar"],
      ["おすすめ", "Osusume", "rekomendasi", ["Di menu, tulisan 税込 berarti harga...", "sudah termasuk pajak", "belum termasuk pajak", "diskon", "gratis"]],
    ],
    [
      ["ラーメンは七百八十円です。", "Raamen wa nanahyaku hachijuuen desu.", "Ramen harganya 780 yen."],
      ["大盛りは百円プラスです。", "Oomori wa hyakuen purasu desu.", "Porsi besar tambah seratus yen.", ["Jika ramen 780 yen dan dipesan porsi besar, harganya...", "880 yen", "780 yen", "980 yen", "680 yen"]],
      ["今日のおすすめは天ぷら定食です。", "Kyou no osusume wa tenpura teishoku desu.", "Rekomendasi hari ini adalah paket tempura."],
      ["コーヒーはおかわり自由です。", "Koohii wa okawari jiyuu desu.", "Kopi bisa diisi ulang gratis."],
    ],
  ],
  // 5. Membaca jadwal
  [
    [
      ["時間割", "Jikanwari", "jadwal pelajaran"],
      ["予定", "Yotei", "rencana / jadwal"],
      ["一時間目", "Ichijikanme", "jam pelajaran pertama"],
      ["毎週", "Maishuu", "setiap minggu", ["Kata 予定 berarti...", "rencana", "tiket", "hadiah", "hari libur"]],
    ],
    [
      ["火曜日の二時間目は英語です。", "Kayoubi no nijikanme wa Eigo desu.", "Jam kedua hari Selasa adalah bahasa Inggris."],
      ["電車は三十分ごとに出ます。", "Densha wa sanjuppun goto ni demasu.", "Kereta berangkat setiap tiga puluh menit."],
      ["土曜日の予定は何もありません。", "Doyoubi no yotei wa nani mo arimasen.", "Sabtu tidak ada rencana apa pun."],
      ["図書館は毎週月曜日が休みです。", "Toshokan wa maishuu getsuyoubi ga yasumi desu.", "Perpustakaan libur setiap hari Senin.", ["Menurut kalimat, perpustakaan tutup pada hari...", "Senin", "Selasa", "Sabtu", "Minggu"]],
    ],
  ],
  // 6. Pesan singkat
  [
    [
      ["返事", "Henji", "balasan"],
      ["待っています", "Matte imasu", "sedang menunggu"],
      ["来られますか", "Koraremasu ka", "bisakah datang?"],
      ["メッセージ", "Messeeji", "pesan", ["Kalimat 返事を待っています berarti...", "saya menunggu balasanmu", "saya sudah membalas", "jangan membalas", "saya lupa membalas"]],
    ],
    [
      ["ごめん、少し遅れます。", "Gomen, sukoshi okuremasu.", "Maaf, saya sedikit terlambat."],
      ["駅の前で待っていてください。", "Eki no mae de matte ite kudasai.", "Tolong tunggu di depan stasiun."],
      ["今日の授業は休みになりました。", "Kyou no jugyou wa yasumi ni narimashita.", "Pelajaran hari ini diliburkan.", ["Menurut pesan itu, pelajaran hari ini...", "diliburkan", "dimulai lebih awal", "pindah kelas", "diperpanjang"]],
      ["明日、一緒に映画に行かない？", "Ashita, issho ni eiga ni ikanai?", "Besok, mau ke bioskop bareng?"],
    ],
  ],
  // 7. Profil keluarga
  [
    [
      ["祖母", "Sobo", "nenek (sendiri)"],
      ["小学生", "Shougakusei", "siswa SD"],
      ["高校生", "Koukousei", "siswa SMA"],
      ["銀行員", "Ginkouin", "pegawai bank", ["Kata 小学生 berarti...", "siswa SD", "siswa SMP", "mahasiswa", "guru"]],
    ],
    [
      ["私の家族は父と母と私の三人です。", "Watashi no kazoku wa chichi to haha to watashi no sannin desu.", "Keluarga saya bertiga: ayah, ibu, dan saya.", ["Menurut kalimat, keluarganya berjumlah...", "tiga orang", "dua orang", "empat orang", "lima orang"]],
      ["兄は高校生で、サッカーが上手です。", "Ani wa koukousei de, sakkaa ga jouzu desu.", "Kakak laki-laki saya siswa SMA dan pandai sepak bola."],
      ["祖母は毎日花の世話をしています。", "Sobo wa mainichi hana no sewa o shite imasu.", "Nenek merawat bunga setiap hari."],
      ["うちには白い猫が一匹います。", "Uchi ni wa shiroi neko ga ippiki imasu.", "Di rumah kami ada seekor kucing putih."],
    ],
  ],
  // 8. Pengumuman sekolah
  [
    [
      ["遠足", "Ensoku", "darmawisata"],
      ["集合", "Shuugou", "berkumpul"],
      ["中止", "Chuushi", "dibatalkan"],
      ["持ち物", "Mochimono", "barang yang dibawa", ["Tulisan 中止 pada pengumuman berarti...", "dibatalkan", "dimulai", "ditunda sebentar", "diperpanjang"]],
    ],
    [
      ["明日は九時に体育館に集合してください。", "Ashita wa kuji ni taiikukan ni shuugou shite kudasai.", "Besok berkumpul di aula olahraga pukul sembilan."],
      ["持ち物はお弁当とタオルです。", "Mochimono wa obentou to taoru desu.", "Barang yang dibawa adalah bekal dan handuk."],
      ["雨の場合は、次の日にします。", "Ame no baai wa, tsugi no hi ni shimasu.", "Jika hujan, diganti ke hari berikutnya.", ["Menurut pengumuman, jika hujan kegiatannya...", "diganti ke hari berikutnya", "tetap dilaksanakan", "dibatalkan selamanya", "pindah ke dalam kelas"]],
      ["四時に学校に帰ります。", "Yoji ni gakkou ni kaerimasu.", "Pukul empat kembali ke sekolah."],
    ],
  ],
  // 9. Petunjuk peta
  [
    [
      ["北口", "Kitaguchi", "pintu utara"],
      ["橋", "Hashi", "jembatan"],
      ["角", "Kado", "tikungan / sudut"],
      ["向かい", "Mukai", "seberang", ["Kata 向かい berarti...", "seberang", "sebelah", "belakang", "di dalam"]],
    ],
    [
      ["南口を出て、右へ行ってください。", "Minamiguchi o dete, migi e itte kudasai.", "Keluar dari pintu selatan, lalu ke kanan."],
      ["コンビニの角を左に曲がります。", "Konbini no kado o hidari ni magarimasu.", "Belok kiri di tikungan minimarket."],
      ["橋の手前に交番があります。", "Hashi no temae ni kouban ga arimasu.", "Sebelum jembatan ada pos polisi."],
      ["学校は公園の向かいにあります。", "Gakkou wa kouen no mukai ni arimasu.", "Sekolah ada di seberang taman."],
    ],
  ],
  // 10. Catatan cuaca
  [
    [
      ["涼しい", "Suzushii", "sejuk"],
      ["暖かい", "Atatakai", "hangat"],
      ["雨の日", "Ame no hi", "hari hujan"],
      ["気温", "Kion", "suhu udara", ["Lawan kata 暖かい (hangat) adalah...", "涼しい", "暑い", "高い", "明るい"]],
    ],
    [
      ["昨日はとても寒かったです。", "Kinou wa totemo samukatta desu.", "Kemarin sangat dingin."],
      ["今日は午後から晴れました。", "Kyou wa gogo kara haremashita.", "Hari ini cerah mulai siang."],
      ["来週は気温が高くなるでしょう。", "Raishuu wa kion ga takaku naru deshou.", "Minggu depan suhu mungkin naik."],
      ["雪が降ったので、道がすべります。", "Yuki ga futta node, michi ga suberimasu.", "Karena turun salju, jalannya licin.", ["Menurut catatan, jalannya licin karena...", "salju", "hujan", "angin", "panas"]],
    ],
  ],
  // 11. Struk belanja
  [
    [
      ["合計", "Goukei", "total"],
      ["個", "Ko", "buah (penghitung benda kecil)"],
      ["お預かり", "Oazukari", "uang diterima"],
      ["小計", "Shoukei", "subtotal", ["Pada struk, 合計 berarti...", "total", "kembalian", "pajak", "diskon"]],
    ],
    [
      ["りんご三個、四百五十円。", "Ringo sanko, yonhyaku gojuuen.", "Apel tiga buah, 450 yen.", ["Dari struk itu, harga satu apel adalah...", "150 yen", "450 yen", "300 yen", "50 yen"]],
      ["パン二個、三百二十円。", "Pan niko, sanbyaku nijuuen.", "Roti dua buah, 320 yen."],
      ["お釣りは二百三十円です。", "Otsuri wa nihyaku sanjuuen desu.", "Kembaliannya 230 yen."],
      ["ポイントカードはお持ちですか。", "Pointo kaado wa omochi desu ka.", "Apakah Anda punya kartu poin?"],
    ],
  ],
  // 12. Email sederhana
  [
    [
      ["件名", "Kenmei", "subjek (email)"],
      ["お元気ですか", "Ogenki desu ka", "apa kabar?"],
      ["また連絡します", "Mata renraku shimasu", "nanti saya hubungi lagi"],
      ["よろしく", "Yoroshiku", "salam / mohon bantuannya", ["Pada email, 件名 adalah bagian...", "subjek", "nama pengirim", "lampiran", "tanggal"]],
    ],
    [
      ["件名は「来週の約束について」です。", "Kenmei wa \"raishuu no yakusoku ni tsuite\" desu.", "Subjeknya 'tentang janji minggu depan'."],
      ["田中さん、メールをありがとうございました。", "Tanaka san, meeru o arigatou gozaimashita.", "Tanaka, terima kasih atas emailnya."],
      ["来週の水曜日は大丈夫です。", "Raishuu no suiyoubi wa daijoubu desu.", "Rabu minggu depan saya bisa."],
      ["駅の近くの喫茶店で会いましょう。", "Eki no chikaku no kissaten de aimashou.", "Mari bertemu di kafe dekat stasiun.", ["Menurut email, mereka akan bertemu di...", "kafe dekat stasiun", "kantor", "rumah Tanaka", "perpustakaan"]],
    ],
  ],
  // 13. Kartu pos
  [
    [
      ["海", "Umi", "laut"],
      ["船", "Fune", "kapal"],
      ["島", "Shima", "pulau"],
      ["景色", "Keshiki", "pemandangan", ["Kata 島 berarti...", "pulau", "gunung", "sungai", "kapal"]],
    ],
    [
      ["北海道の景色はとてもきれいです。", "Hokkaidou no keshiki wa totemo kirei desu.", "Pemandangan Hokkaido sangat indah."],
      ["毎日おいしい魚を食べています。", "Mainichi oishii sakana o tabete imasu.", "Setiap hari saya makan ikan yang enak."],
      ["明日は小さい島へ行く予定です。", "Ashita wa chiisai shima e iku yotei desu.", "Besok saya berencana pergi ke pulau kecil."],
      ["来週の月曜日に帰ります。", "Raishuu no getsuyoubi ni kaerimasu.", "Saya pulang Senin minggu depan.", ["Menurut kartu pos, penulis pulang pada...", "Senin depan", "besok", "hari ini", "Minggu depan"]],
    ],
  ],
  // 14. Buku harian
  [
    [
      ["日記", "Nikki", "buku harian"],
      ["朝", "Asa", "pagi"],
      ["夜", "Yoru", "malam"],
      ["週末", "Shuumatsu", "akhir pekan", ["Buku harian biasanya ditulis dalam bentuk...", "lampau (〜ました)", "perintah (〜てください)", "ajakan (〜ましょう)", "larangan"]],
    ],
    [
      ["今朝は雨で、学校までバスで行きました。", "Kesa wa ame de, gakkou made basu de ikimashita.", "Tadi pagi hujan, jadi saya ke sekolah naik bus."],
      ["昼休みに友達とバレーボールをしました。", "Hiruyasumi ni tomodachi to bareebooru o shimashita.", "Saat istirahat siang saya bermain voli dengan teman."],
      ["夜、母とケーキを作りました。", "Yoru, haha to keeki o tsukurimashita.", "Malam hari saya membuat kue bersama ibu."],
      ["少し疲れましたが、楽しかったです。", "Sukoshi tsukaremashita ga, tanoshikatta desu.", "Agak lelah, tetapi menyenangkan."],
    ],
  ],
  // 15. Papan stasiun
  [
    [
      ["方面", "Houmen", "arah (tujuan)"],
      ["快速", "Kaisoku", "kereta cepat (rapid)"],
      ["各駅停車", "Kakuekiteisha", "kereta lokal (berhenti di setiap stasiun)"],
      ["改札", "Kaisatsu", "gerbang tiket", ["Kereta yang berhenti di semua stasiun disebut...", "各駅停車", "快速", "特急", "新幹線"]],
    ],
    [
      ["横浜方面の電車は三番線です。", "Yokohama houmen no densha wa sanbansen desu.", "Kereta arah Yokohama ada di jalur tiga."],
      ["次の快速は十時五分発です。", "Tsugi no kaisoku wa juuji gofun hatsu desu.", "Kereta cepat berikutnya berangkat pukul 10.05."],
      ["この駅には特急は止まりません。", "Kono eki ni wa tokkyuu wa tomarimasen.", "Kereta ekspres tidak berhenti di stasiun ini."],
      ["改札を出て、左にエレベーターがあります。", "Kaisatsu o dete, hidari ni erebeetaa ga arimasu.", "Setelah keluar gerbang tiket, di kiri ada lift."],
    ],
  ],
  // 16. Poster acara
  [
    [
      ["夏祭り", "Natsumatsuri", "festival musim panas"],
      ["花火", "Hanabi", "kembang api"],
      ["無料", "Muryou", "gratis"],
      ["場所", "Basho", "tempat", ["Tulisan 入場無料 pada poster berarti...", "masuk gratis", "dilarang masuk", "tiket habis", "masuk berbayar"]],
    ],
    [
      ["日時は八月十五日の午後六時からです。", "Nichiji wa hachigatsu juugonichi no gogo rokuji kara desu.", "Waktunya 15 Agustus mulai pukul 6 sore."],
      ["場所は駅前の広場です。", "Basho wa ekimae no hiroba desu.", "Tempatnya di lapangan depan stasiun."],
      ["子どもは入場無料です。", "Kodomo wa nyuujou muryou desu.", "Anak-anak masuk gratis."],
      ["雨の場合は中止になります。", "Ame no baai wa chuushi ni narimasu.", "Jika hujan, acara dibatalkan.", ["Menurut poster, jika hujan...", "acara dibatalkan", "acara ditunda seminggu", "pindah ke aula", "tetap berlangsung"]],
    ],
  ],
  // 17. Artikel sederhana
  [
    [
      ["お正月", "Oshougatsu", "Tahun Baru (Jepang)"],
      ["神社", "Jinja", "kuil Shinto"],
      ["お年玉", "Otoshidama", "uang angpau Tahun Baru"],
      ["習慣", "Shuukan", "kebiasaan / adat", ["お年玉 diberikan kepada...", "anak-anak", "orang tua", "guru", "tetangga"]],
    ],
    [
      ["日本人は家に入るとき、靴を脱ぎます。", "Nihonjin wa ie ni hairu toki, kutsu o nugimasu.", "Orang Jepang melepas sepatu saat masuk rumah."],
      ["春には多くの人が花見をします。", "Haru ni wa ooku no hito ga hanami o shimasu.", "Saat musim semi banyak orang menikmati bunga sakura."],
      ["夏には各地でお祭りがあります。", "Natsu ni wa kakuchi de omatsuri ga arimasu.", "Saat musim panas ada festival di berbagai daerah."],
      ["年末には家をきれいに掃除します。", "Nenmatsu ni wa ie o kirei ni souji shimasu.", "Di akhir tahun rumah dibersihkan sampai rapi.", ["Menurut artikel, di akhir tahun orang Jepang...", "membersihkan rumah", "pergi ke pantai", "menanam bunga", "pindah rumah"]],
    ],
  ],
  // 18. Membaca formulir
  [
    [
      ["氏名", "Shimei", "nama lengkap"],
      ["住所", "Juusho", "alamat"],
      ["生年月日", "Seinengappi", "tanggal lahir"],
      ["国籍", "Kokuseki", "kewarganegaraan", ["Kolom 住所 pada formulir diisi dengan...", "alamat", "nama", "nomor telepon", "pekerjaan"]],
    ],
    [
      ["氏名はカタカナで書いてください。", "Shimei wa katakana de kaite kudasai.", "Tulis nama lengkap dengan katakana."],
      ["電話番号を忘れずに書いてください。", "Denwa bangou o wasurezu ni kaite kudasai.", "Jangan lupa menulis nomor telepon."],
      ["黒いペンで記入してください。", "Kuroi pen de kinyuu shite kudasai.", "Isilah dengan pulpen hitam."],
      ["書いたら、受付に出してください。", "Kaitara, uketsuke ni dashite kudasai.", "Setelah ditulis, serahkan ke resepsionis.", ["Menurut petunjuk, formulir diserahkan ke...", "resepsionis", "guru", "kasir", "polisi"]],
    ],
  ],
  // 19. Kanji N5 dalam kalimat
  [
    [
      ["山", "Yama", "gunung (kanji)"],
      ["川", "Kawa", "sungai (kanji)"],
      ["木", "Ki", "pohon"],
      ["上", "Ue", "atas", ["Kanji 下 berarti...", "bawah", "atas", "tengah", "kanan"]],
    ],
    [
      ["川の近くに大きい木があります。", "Kawa no chikaku ni ookii ki ga arimasu.", "Di dekat sungai ada pohon besar."],
      ["机の下に猫がいます。", "Tsukue no shita ni neko ga imasu.", "Di bawah meja ada kucing."],
      ["日曜日に山に登りました。", "Nichiyoubi ni yama ni noborimashita.", "Hari Minggu saya mendaki gunung."],
      ["来月、中国から友人が来ます。", "Raigetsu, Chuugoku kara yuujin ga kimasu.", "Bulan depan teman saya datang dari Tiongkok."],
    ],
  ],
  // 20. Ulasan reading N5
  [
    [
      ["アルバイト", "Arubaito", "kerja paruh waktu"],
      ["店長", "Tenchou", "manajer toko"],
      ["親切", "Shinsetsu", "ramah / baik hati"],
      ["お金", "Okane", "uang", ["Kata 店長 berarti...", "manajer toko", "pegawai bank", "pelanggan", "kasir"]],
    ],
    [
      ["私は週に三回コンビニでアルバイトをしています。", "Watashi wa shuu ni sankai konbini de arubaito o shite imasu.", "Saya kerja paruh waktu di minimarket tiga kali seminggu.", ["Menurut kalimat, ia bekerja...", "tiga kali seminggu", "setiap hari", "sekali seminggu", "tiga hari sebulan"]],
      ["仕事は夕方五時から九時までです。", "Shigoto wa yuugata goji kara kuji made desu.", "Kerjanya dari pukul lima sore sampai pukul sembilan."],
      ["店の人はみんな親切です。", "Mise no hito wa minna shinsetsu desu.", "Semua orang di toko itu ramah."],
      ["夏休みに友達と沖縄へ行きたいです。", "Natsuyasumi ni tomodachi to Okinawa e ikitai desu.", "Saya ingin pergi ke Okinawa bersama teman saat liburan musim panas."],
    ],
  ],
];
