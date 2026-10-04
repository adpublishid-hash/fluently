import type { JapaneseQuizTopic } from '../types';

// Latihan Vocabulary N5 — one entry per topic (index = topic - 1): [Basic, Advanced].
export const vocabulary: JapaneseQuizTopic[] = [
  // 1. Orang di sekitar kita
  [
    [
      ["男の子", "Otoko no ko", "anak laki-laki"],
      ["女の子", "Onna no ko", "anak perempuan"],
      ["大人", "Otona", "orang dewasa", ["Lawan kata 大人 (orang dewasa) adalah...", "子ども", "男の人", "女の人", "友達"]],
      ["あの人", "Ano hito", "orang itu"],
    ],
    [
      ["あの男の人は私の先生です。", "Ano otoko no hito wa watashi no sensei desu.", "Laki-laki itu adalah guru saya."],
      ["公園に子どもが三人います。", "Kouen ni kodomo ga sannin imasu.", "Ada tiga anak di taman."],
      ["隣の部屋に女の人が住んでいます。", "Tonari no heya ni onna no hito ga sunde imasu.", "Seorang perempuan tinggal di kamar sebelah."],
      ["あの人は誰ですか。", "Ano hito wa dare desu ka.", "Orang itu siapa?", ["Kata tanya untuk 'siapa' adalah...", "誰", "何", "どこ", "いつ"]],
    ],
  ],
  // 2. Keluarga
  [
    [
      ["父", "Chichi", "ayah (sendiri)"],
      ["お父さん", "Otousan", "ayah (orang lain / memanggil)", ["Saat bercerita tentang ibumu sendiri kepada orang lain, kamu memakai...", "母", "お母さん", "おばあさん", "姉"]],
      ["妹", "Imouto", "adik perempuan"],
      ["弟", "Otouto", "adik laki-laki"],
    ],
    [
      ["私の家族は四人です。", "Watashi no kazoku wa yonin desu.", "Keluarga saya berempat."],
      ["兄は大学生です。", "Ani wa daigakusei desu.", "Kakak laki-laki saya mahasiswa."],
      ["田中さんのお父さんは医者です。", "Tanaka san no otousan wa isha desu.", "Ayahnya Tanaka seorang dokter."],
      ["妹は今年十歳になりました。", "Imouto wa kotoshi jussai ni narimashita.", "Adik perempuan saya tahun ini berumur sepuluh tahun."],
    ],
  ],
  // 3. Angka dan bilangan
  [
    [
      ["四つ", "Yottsu", "empat (benda)"],
      ["七人", "Shichinin", "tujuh orang"],
      ["二枚", "Nimai", "dua lembar", ["Penghitung untuk benda tipis seperti kertas adalah...", "〜枚", "〜本", "〜人", "〜台"]],
      ["六本", "Roppon", "enam batang"],
    ],
    [
      ["りんごを三つください。", "Ringo o mittsu kudasai.", "Tolong beri saya tiga buah apel."],
      ["切手を五枚買いました。", "Kitte o gomai kaimashita.", "Saya membeli lima lembar perangko."],
      ["クラスに学生が二十人います。", "Kurasu ni gakusei ga nijuunin imasu.", "Di kelas ada dua puluh siswa."],
      ["ペンが一本しかありません。", "Pen ga ippon shika arimasen.", "Pulpennya hanya ada satu batang.", ["Bacaan 一本 (satu batang) adalah...", "ippon", "ichihon", "hitohon", "ichipon"]],
    ],
  ],
  // 4. Waktu
  [
    [
      ["今日", "Kyou", "hari ini"],
      ["明日", "Ashita", "besok"],
      ["昨日", "Kinou", "kemarin", ["Kata untuk 'minggu depan' adalah...", "来週", "先週", "今週", "毎週"]],
      ["来週", "Raishuu", "minggu depan"],
    ],
    [
      ["明日は日曜日です。", "Ashita wa nichiyoubi desu.", "Besok hari Minggu."],
      ["昨日、友達と映画を見ました。", "Kinou, tomodachi to eiga o mimashita.", "Kemarin saya menonton film dengan teman."],
      ["来週、日本へ行きます。", "Raishuu, Nihon e ikimasu.", "Minggu depan saya pergi ke Jepang.", ["Kata waktu relatif seperti 来週 biasanya...", "tidak memakai partikel に", "selalu memakai に", "memakai を", "memakai が"]],
      ["毎朝七時に起きます。", "Maiasa shichiji ni okimasu.", "Setiap pagi saya bangun pukul tujuh."],
    ],
  ],
  // 5. Hari dan tanggal
  [
    [
      ["一日", "Tsuitachi", "tanggal satu", ["Tanggal 1 dibaca...", "tsuitachi", "ichinichi", "ichika", "hitohi"]],
      ["二日", "Futsuka", "tanggal dua"],
      ["月曜日", "Getsuyoubi", "hari Senin"],
      ["金曜日", "Kinyoubi", "hari Jumat"],
    ],
    [
      ["今日は四月一日です。", "Kyou wa shigatsu tsuitachi desu.", "Hari ini tanggal 1 April."],
      ["誕生日は七月七日です。", "Tanjoubi wa shichigatsu nanoka desu.", "Ulang tahun saya tanggal 7 Juli."],
      ["試験は来週の金曜日です。", "Shiken wa raishuu no kinyoubi desu.", "Ujiannya hari Jumat minggu depan."],
      ["今日は何曜日ですか。", "Kyou wa nanyoubi desu ka.", "Hari ini hari apa?", ["Untuk menanyakan tanggal, kamu bertanya...", "何日ですか", "何曜日ですか", "何時ですか", "何人ですか"]],
    ],
  ],
  // 6. Makanan
  [
    [
      ["ご飯", "Gohan", "nasi / makanan"],
      ["魚", "Sakana", "ikan"],
      ["肉", "Niku", "daging", ["Kata kerja yang dipakai dengan makanan adalah...", "食べます", "飲みます", "読みます", "聞きます"]],
      ["卵", "Tamago", "telur"],
    ],
    [
      ["朝ご飯にパンを食べました。", "Asagohan ni pan o tabemashita.", "Saya makan roti untuk sarapan."],
      ["私は魚より肉が好きです。", "Watashi wa sakana yori niku ga suki desu.", "Saya lebih suka daging daripada ikan."],
      ["母は毎晩おいしい料理を作ります。", "Haha wa maiban oishii ryouri o tsukurimasu.", "Ibu saya memasak makanan enak setiap malam."],
      ["この店のすしはとても新鮮です。", "Kono mise no sushi wa totemo shinsen desu.", "Sushi di toko ini sangat segar."],
    ],
  ],
  // 7. Minuman
  [
    [
      ["水", "Mizu", "air"],
      ["お茶", "Ocha", "teh"],
      ["牛乳", "Gyuunyuu", "susu sapi"],
      ["お酒", "Osake", "minuman keras / sake", ["Kata kerja untuk minuman adalah...", "飲みます", "食べます", "見ます", "書きます"]],
    ],
    [
      ["冷たい水を一杯ください。", "Tsumetai mizu o ippai kudasai.", "Tolong beri saya segelas air dingin."],
      ["毎朝コーヒーを飲みます。", "Maiasa koohii o nomimasu.", "Setiap pagi saya minum kopi."],
      ["日本人はよく緑茶を飲みます。", "Nihonjin wa yoku ryokucha o nomimasu.", "Orang Jepang sering minum teh hijau."],
      ["子どもはお酒を飲んではいけません。", "Kodomo wa osake o nonde wa ikemasen.", "Anak-anak tidak boleh minum minuman keras."],
    ],
  ],
  // 8. Tempat
  [
    [
      ["駅", "Eki", "stasiun"],
      ["銀行", "Ginkou", "bank"],
      ["郵便局", "Yuubinkyoku", "kantor pos", ["Tempat membeli buku disebut...", "本屋", "肉屋", "花屋", "八百屋"]],
      ["図書館", "Toshokan", "perpustakaan"],
    ],
    [
      ["銀行は駅の前にあります。", "Ginkou wa eki no mae ni arimasu.", "Bank ada di depan stasiun."],
      ["図書館で本を借ります。", "Toshokan de hon o karimasu.", "Saya meminjam buku di perpustakaan."],
      ["郵便局はどこですか。", "Yuubinkyoku wa doko desu ka.", "Kantor pos di mana?"],
      ["病院の隣に公園があります。", "Byouin no tonari ni kouen ga arimasu.", "Di sebelah rumah sakit ada taman."],
    ],
  ],
  // 9. Transportasi
  [
    [
      ["電車", "Densha", "kereta listrik"],
      ["地下鉄", "Chikatetsu", "kereta bawah tanah"],
      ["車", "Kuruma", "mobil"],
      ["バス停", "Basutei", "halte bus", ["Partikel untuk alat transportasi (naik bus) adalah...", "で (バスで)", "を (バスを)", "が (バスが)", "へ (バスへ)"]],
    ],
    [
      ["毎日電車で会社へ行きます。", "Mainichi densha de kaisha e ikimasu.", "Setiap hari saya pergi ke kantor naik kereta."],
      ["駅まで歩いて十分です。", "Eki made aruite juppun desu.", "Sampai stasiun sepuluh menit berjalan kaki."],
      ["次のバス停で降ります。", "Tsugi no basutei de orimasu.", "Saya turun di halte bus berikutnya."],
      ["父は車で空港まで送ってくれました。", "Chichi wa kuruma de kuukou made okutte kuremashita.", "Ayah mengantar saya ke bandara dengan mobil."],
    ],
  ],
  // 10. Sekolah
  [
    [
      ["教室", "Kyoushitsu", "ruang kelas"],
      ["宿題", "Shukudai", "PR"],
      ["試験", "Shiken", "ujian"],
      ["辞書", "Jisho", "kamus", ["Kata untuk 'pelajaran (jam pelajaran)' adalah...", "授業", "宿題", "教室", "辞書"]],
    ],
    [
      ["教室に学生がたくさんいます。", "Kyoushitsu ni gakusei ga takusan imasu.", "Di ruang kelas ada banyak siswa."],
      ["今日は宿題がありません。", "Kyou wa shukudai ga arimasen.", "Hari ini tidak ada PR."],
      ["授業は九時に始まります。", "Jugyou wa kuji ni hajimarimasu.", "Pelajaran dimulai pukul sembilan."],
      ["わからない言葉を辞書で調べます。", "Wakaranai kotoba o jisho de shirabemasu.", "Saya mencari kata yang tidak saya mengerti di kamus."],
    ],
  ],
  // 11. Pekerjaan
  [
    [
      ["会社員", "Kaishain", "karyawan perusahaan"],
      ["医者", "Isha", "dokter"],
      ["店員", "Ten-in", "pegawai toko"],
      ["先生", "Sensei", "guru", ["Kata untuk 'pegawai toko' adalah...", "店員", "会社員", "医者", "学生"]],
    ],
    [
      ["私は会社員です。", "Watashi wa kaishain desu.", "Saya karyawan perusahaan."],
      ["姉は病院で働いています。", "Ane wa byouin de hataraite imasu.", "Kakak perempuan saya bekerja di rumah sakit."],
      ["父は銀行に勤めています。", "Chichi wa ginkou ni tsutomete imasu.", "Ayah saya bekerja di bank."],
      ["仕事は何時に終わりますか。", "Shigoto wa nanji ni owarimasu ka.", "Pekerjaan selesai pukul berapa?"],
    ],
  ],
  // 12. Rumah
  [
    [
      ["台所", "Daidokoro", "dapur"],
      ["お風呂", "Ofuro", "kamar mandi / bak mandi"],
      ["玄関", "Genkan", "pintu masuk rumah", ["Di rumah Jepang, sepatu dilepas di...", "玄関", "台所", "お風呂", "庭"]],
      ["窓", "Mado", "jendela"],
    ],
    [
      ["私の部屋は二階にあります。", "Watashi no heya wa nikai ni arimasu.", "Kamar saya ada di lantai dua."],
      ["台所で母が料理をしています。", "Daidokoro de haha ga ryouri o shite imasu.", "Ibu sedang memasak di dapur."],
      ["寒いですから、窓を閉めてください。", "Samui desu kara, mado o shimete kudasai.", "Karena dingin, tolong tutup jendelanya."],
      ["夜、お風呂に入ってから寝ます。", "Yoru, ofuro ni haitte kara nemasu.", "Malam hari saya mandi berendam lalu tidur."],
    ],
  ],
  // 13. Kata sifat
  [
    [
      ["大きい", "Ookii", "besar"],
      ["小さい", "Chiisai", "kecil"],
      ["高い", "Takai", "tinggi / mahal", ["Lawan kata 高い (mahal) adalah...", "安い", "低い", "小さい", "古い"]],
      ["暑い", "Atsui", "panas (cuaca)"],
    ],
    [
      ["この部屋はとても広いです。", "Kono heya wa totemo hiroi desu.", "Kamar ini sangat luas."],
      ["東京の夏は暑いです。", "Toukyou no natsu wa atsui desu.", "Musim panas di Tokyo itu panas."],
      ["このかばんは高くないです。", "Kono kaban wa takakunai desu.", "Tas ini tidak mahal.", ["Bentuk negatif dari 高い adalah...", "高くない", "高いじゃない", "高ない", "高くありますん"]],
      ["あの古い建物は図書館です。", "Ano furui tatemono wa toshokan desu.", "Gedung tua itu adalah perpustakaan."],
    ],
  ],
  // 14. Kata kerja harian
  [
    [
      ["起きる", "Okiru", "bangun"],
      ["寝る", "Neru", "tidur"],
      ["洗う", "Arau", "mencuci"],
      ["出かける", "Dekakeru", "pergi keluar", ["Lawan kata 起きる (bangun) adalah...", "寝る", "着る", "見る", "来る"]],
    ],
    [
      ["毎晩十一時に寝ます。", "Maiban juuichiji ni nemasu.", "Setiap malam saya tidur pukul sebelas."],
      ["朝ご飯の後で歯をみがきます。", "Asagohan no ato de ha o migakimasu.", "Setelah sarapan saya menyikat gigi."],
      ["日曜日に車を洗いました。", "Nichiyoubi ni kuruma o araimashita.", "Hari Minggu saya mencuci mobil."],
      ["寒いですから、コートを着て出かけます。", "Samui desu kara, kooto o kite dekakemasu.", "Karena dingin, saya keluar memakai mantel."],
    ],
  ],
  // 15. Belanja
  [
    [
      ["値段", "Nedan", "harga"],
      ["安い", "Yasui", "murah"],
      ["お釣り", "Otsuri", "uang kembalian", ["Untuk menanyakan harga, kamu bertanya...", "いくらですか", "いつですか", "どこですか", "何時ですか"]],
      ["レジ", "Reji", "kasir"],
    ],
    [
      ["あの青いシャツはいくらですか。", "Ano aoi shatsu wa ikura desu ka.", "Kemeja biru itu berapa harganya?"],
      ["それを二つください。", "Sore o futatsu kudasai.", "Tolong beri saya dua yang itu."],
      ["スーパーで野菜と果物を買いました。", "Suupaa de yasai to kudamono o kaimashita.", "Saya membeli sayur dan buah di supermarket."],
      ["カードで払ってもいいですか。", "Kaado de haratte mo ii desu ka.", "Bolehkah saya membayar dengan kartu?"],
    ],
  ],
  // 16. Cuaca
  [
    [
      ["晴れ", "Hare", "cerah"],
      ["雨", "Ame", "hujan"],
      ["雪", "Yuki", "salju"],
      ["くもり", "Kumori", "mendung", ["Kata kerja untuk hujan atau salju turun adalah...", "降る", "吹く", "来る", "落ちる"]],
    ],
    [
      ["今日は晴れていて、気持ちがいいです。", "Kyou wa harete ite, kimochi ga ii desu.", "Hari ini cerah dan terasa nyaman."],
      ["明日は雨が降るでしょう。", "Ashita wa ame ga furu deshou.", "Besok mungkin akan hujan."],
      ["北海道では冬にたくさん雪が降ります。", "Hokkaidou de wa fuyu ni takusan yuki ga furimasu.", "Di Hokkaido banyak salju turun saat musim dingin."],
      ["今朝は風が強かったです。", "Kesa wa kaze ga tsuyokatta desu.", "Tadi pagi anginnya kencang."],
    ],
  ],
  // 17. Bagian tubuh
  [
    [
      ["頭", "Atama", "kepala"],
      ["口", "Kuchi", "mulut"],
      ["おなか", "Onaka", "perut"],
      ["背中", "Senaka", "punggung", ["Kata untuk 'kaki' adalah...", "足", "手", "目", "耳"]],
    ],
    [
      ["頭が痛いですから、薬を飲みます。", "Atama ga itai desu kara, kusuri o nomimasu.", "Karena kepala saya sakit, saya minum obat."],
      ["食事の前に手を洗いましょう。", "Shokuji no mae ni te o araimashou.", "Mari mencuci tangan sebelum makan."],
      ["おなかがすきました。", "Onaka ga sukimashita.", "Saya lapar."],
      ["その女の人は髪が長いです。", "Sono onna no hito wa kami ga nagai desu.", "Perempuan itu rambutnya panjang."],
    ],
  ],
  // 18. Hobi
  [
    [
      ["趣味", "Shumi", "hobi"],
      ["読書", "Dokusho", "membaca buku"],
      ["料理", "Ryouri", "memasak / masakan"],
      ["旅行", "Ryokou", "perjalanan wisata", ["Untuk bertanya 'apa hobimu?', kamu bilang...", "趣味は何ですか", "仕事は何ですか", "名前は何ですか", "お国はどこですか"]],
    ],
    [
      ["私の趣味は写真を撮ることです。", "Watashi no shumi wa shashin o toru koto desu.", "Hobi saya memotret."],
      ["週末はよくテニスをします。", "Shuumatsu wa yoku tenisu o shimasu.", "Akhir pekan saya sering bermain tenis."],
      ["兄はギターを弾くのが上手です。", "Ani wa gitaa o hiku no ga jouzu desu.", "Kakak laki-laki saya pandai bermain gitar."],
      ["暇なとき、何をしますか。", "Hima na toki, nani o shimasu ka.", "Apa yang kamu lakukan saat senggang?"],
    ],
  ],
  // 19. Wisata
  [
    [
      ["空港", "Kuukou", "bandara"],
      ["地図", "Chizu", "peta"],
      ["お土産", "Omiyage", "oleh-oleh", ["Kata untuk 'paspor' adalah...", "パスポート", "チケット", "ホテル", "カメラ"]],
      ["切符", "Kippu", "tiket (kereta)"],
    ],
    [
      ["夏休みに京都へ旅行しました。", "Natsuyasumi ni Kyouto e ryokou shimashita.", "Saat liburan musim panas saya berwisata ke Kyoto."],
      ["駅で切符を買います。", "Eki de kippu o kaimasu.", "Saya membeli tiket di stasiun."],
      ["家族にお土産を買いたいです。", "Kazoku ni omiyage o kaitai desu.", "Saya ingin membeli oleh-oleh untuk keluarga."],
      ["ホテルは空港から近いです。", "Hoteru wa kuukou kara chikai desu.", "Hotelnya dekat dari bandara."],
    ],
  ],
  // 20. Ulasan kosakata N5
  [
    [
      ["友達", "Tomodachi", "teman"],
      ["写真", "Shashin", "foto"],
      ["時計", "Tokei", "jam"],
      ["電話", "Denwa", "telepon", ["Kata untuk 'foto' adalah...", "写真", "時計", "電話", "新聞"]],
    ],
    [
      ["駅で友達に会いました。", "Eki de tomodachi ni aimashita.", "Saya bertemu teman di stasiun."],
      ["ここで写真を撮ってもいいですか。", "Koko de shashin o totte mo ii desu ka.", "Bolehkah saya memotret di sini?"],
      ["新しい時計を買いました。", "Atarashii tokei o kaimashita.", "Saya membeli jam baru."],
      ["夜、母に電話をかけます。", "Yoru, haha ni denwa o kakemasu.", "Malam hari saya menelepon ibu."],
    ],
  ],
];
