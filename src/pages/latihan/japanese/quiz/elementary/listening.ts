import type { JapaneseQuizTopic } from '../types';

// Latihan Listening N4 — one entry per topic (index = topic - 1): [Basic, Advanced].
export const listening: JapaneseQuizTopic[] = [
  // 1. Permintaan bentuk て
  [
    [
      ["置いてくれる", "Oite kureru", "bisa taruhkan?"],
      ["持ってきて", "Motte kite", "tolong bawakan"],
      ["見せてもらえますか", "Misete moraemasu ka", "bisakah diperlihatkan?"],
      ["片付けて", "Katazukete", "tolong rapikan", ["Kamu mendengar \"motte kite\". Kamu diminta...", "membawakan sesuatu", "membuang sesuatu", "membeli sesuatu", "menunggu"]],
    ],
    [
      ["悪いけど、ゴミを出しておいてくれる？", "Warui kedo, gomi o dashite oite kureru?", "Maaf, bisa buangkan sampahnya?"],
      ["会議の資料を十部コピーしてください。", "Kaigi no shiryou o juubu kopii shite kudasai.", "Tolong fotokopi materi rapat sepuluh rangkap.", ["Dari audio itu, berapa rangkap yang diminta?", "10", "5", "15", "1"]],
      ["使い終わったら、元の場所に片付けてね。", "Tsukaiowattara, moto no basho ni katazukete ne.", "Setelah selesai dipakai, rapikan ke tempat semula, ya."],
      ["ちょっとそのはさみを取ってくれない？", "Chotto sono hasami o totte kurenai?", "Bisa ambilkan gunting itu?"],
    ],
  ],
  // 2. Detail di stasiun
  [
    [
      ["号車", "Gousha", "nomor gerbong"],
      ["特急", "Tokkyuu", "kereta ekspres terbatas"],
      ["発車ベル", "Hassha beru", "bel keberangkatan kereta"],
      ["運転見合わせ", "Unten miawase", "operasional dihentikan sementara", ["Kamu mendengar \"sangousha\". Artinya...", "gerbong nomor tiga", "jalur tiga", "kereta ketiga", "tiga menit"]],
    ],
    [
      ["自由席は一号車から三号車です。", "Jiyuuseki wa ichigousha kara sangousha desu.", "Kursi bebas ada di gerbong satu sampai tiga."],
      ["大雨のため、現在運転を見合わせております。", "Ooame no tame, genzai unten o miawasete orimasu.", "Karena hujan lebat, saat ini operasional dihentikan sementara."],
      ["まもなく発車いたします。", "Mamonaku hassha itashimasu.", "Kereta akan segera berangkat."],
      ["お乗り換えのお客様は次の駅でお降りください。", "Onorikae no okyakusama wa tsugi no eki de oori kudasai.", "Penumpang yang akan berganti kereta, silakan turun di stasiun berikutnya."],
    ],
  ],
  // 3. Cuaca dan rencana
  [
    [
      ["晴れたら", "Haretara", "kalau cerah"],
      ["中止", "Chuushi", "dibatalkan"],
      ["延期", "Enki", "ditunda"],
      ["そうです", "Sou desu", "katanya", ["Kamu mendengar \"enki\". Acara itu...", "ditunda", "dibatalkan", "dipercepat", "tetap berlangsung"]],
    ],
    [
      ["明日晴れたら、みんなでバーベキューをしよう。", "Ashita haretara, minna de baabekyuu o shiyou.", "Kalau besok cerah, ayo barbekyu bersama-sama."],
      ["雨のため、花火大会は来週に延期されました。", "Ame no tame, hanabi taikai wa raishuu ni enki saremashita.", "Karena hujan, festival kembang api ditunda ke minggu depan.", ["Dari audio itu, festival kembang api...", "ditunda ke minggu depan", "dibatalkan", "tetap malam ini", "pindah tempat"]],
      ["天気予報では、午後から晴れるそうです。", "Tenki yohou de wa, gogo kara hareru sou desu.", "Menurut prakiraan cuaca, mulai siang katanya cerah."],
      ["雪がひどかったら、学校は休みになります。", "Yuki ga hidokattara, gakkou wa yasumi ni narimasu.", "Kalau saljunya parah, sekolah diliburkan."],
    ],
  ],
  // 4. Dialog dengan dokter
  [
    [
      ["錠", "Jou", "tablet (obat)"],
      ["食後", "Shokugo", "setelah makan"],
      ["食前", "Shokuzen", "sebelum makan"],
      ["安静にする", "Ansei ni suru", "istirahat total", ["Kamu mendengar \"shokuzen ni nonde kudasai\". Obat diminum...", "sebelum makan", "setelah makan", "saat tidur", "saat sakit saja"]],
    ],
    [
      ["この薬は一日二回、朝と夜に飲んでください。", "Kono kusuri wa ichinichi nikai, asa to yoru ni nonde kudasai.", "Minum obat ini dua kali sehari, pagi dan malam.", ["Dari audio itu, obat diminum...", "pagi dan malam", "tiga kali sehari", "sekali sehari", "saat lapar"]],
      ["二、三日は安静にしてください。", "Ni, sannichi wa ansei ni shite kudasai.", "Istirahat total selama dua tiga hari."],
      ["お酒はしばらく飲まないでください。", "Osake wa shibaraku nomanaide kudasai.", "Untuk sementara jangan minum alkohol."],
      ["一週間後にもう一度来てください。", "Isshuukan go ni mou ichido kite kudasai.", "Datang lagi seminggu kemudian."],
    ],
  ],
  // 5. Pengumuman sekolah
  [
    [
      ["提出", "Teishutsu", "penyerahan / pengumpulan"],
      ["締め切り", "Shimekiri", "tenggat waktu"],
      ["保護者", "Hogosha", "orang tua / wali"],
      ["担任", "Tannin", "wali kelas", ["Kamu mendengar \"shimekiri wa kinyoubi\". Artinya...", "tenggatnya Jumat", "mulai Jumat", "libur Jumat", "ujian Jumat"]],
    ],
    [
      ["作文は来週の月曜日までに提出してください。", "Sakubun wa raishuu no getsuyoubi made ni teishutsu shite kudasai.", "Kumpulkan karangan paling lambat Senin depan."],
      ["保護者会は三時から図書室で行います。", "Hogoshakai wa sanji kara toshoshitsu de okonaimasu.", "Pertemuan orang tua diadakan pukul tiga di ruang perpustakaan."],
      ["体操服を忘れないように持ってきてください。", "Taisoufuku o wasurenai you ni motte kite kudasai.", "Jangan lupa membawa baju olahraga."],
      ["質問がある人は担任の先生に聞いてください。", "Shitsumon ga aru hito wa tannin no sensei ni kiite kudasai.", "Yang punya pertanyaan, tanyakan kepada wali kelas.", ["Dari pengumuman itu, pertanyaan diajukan kepada...", "wali kelas", "kepala sekolah", "orang tua", "ketua kelas"]],
    ],
  ],
  // 6. Shift kerja
  [
    [
      ["早番", "Hayaban", "shift pagi"],
      ["遅番", "Osoban", "shift malam / sore"],
      ["休憩", "Kyuukei", "istirahat"],
      ["交代", "Koutai", "pergantian", ["Kamu mendengar \"ashita wa hayaban\". Besok dia masuk...", "shift pagi", "shift malam", "libur", "lembur"]],
    ],
    [
      ["今週は火曜日と木曜日が早番です。", "Konshuu wa kayoubi to mokuyoubi ga hayaban desu.", "Minggu ini shift pagi hari Selasa dan Kamis."],
      ["一時から一時半まで休憩してください。", "Ichiji kara ichiji han made kyuukei shite kudasai.", "Silakan istirahat dari pukul satu sampai setengah dua.", ["Dari audio itu, istirahatnya berapa lama?", "30 menit", "1 jam", "15 menit", "2 jam"]],
      ["五時に次の人と交代します。", "Goji ni tsugi no hito to koutai shimasu.", "Pukul lima saya bergantian dengan orang berikutnya."],
      ["金曜日の遅番、だれか入れる人いない？", "Kinyoubi no osoban, dareka haireru hito inai?", "Shift malam Jumat, ada yang bisa masuk?"],
    ],
  ],
  // 7. Masalah saat perjalanan
  [
    [
      ["欠航", "Kekkou", "penerbangan dibatalkan"],
      ["振り替え", "Furikae", "pengalihan (jadwal)"],
      ["払い戻し", "Haraimodoshi", "pengembalian uang"],
      ["手荷物", "Tenimotsu", "barang bawaan", ["Kamu mendengar \"kekkou ni narimashita\". Penerbangannya...", "dibatalkan", "terlambat sedikit", "dipercepat", "sudah mendarat"]],
    ],
    [
      ["台風の影響で、全便欠航となりました。", "Taifuu no eikyou de, zenbin kekkou to narimashita.", "Akibat topan, semua penerbangan dibatalkan."],
      ["チケットは明日の同じ時間の便に振り替えられます。", "Chiketto wa ashita no onaji jikan no bin ni furikaeraremasu.", "Tiket bisa dialihkan ke penerbangan besok di jam yang sama."],
      ["払い戻しは窓口で受け付けております。", "Haraimodoshi wa madoguchi de uketsukete orimasu.", "Pengembalian uang dilayani di loket."],
      ["手荷物が届いていないんですが。", "Tenimotsu ga todoite inai n desu ga.", "Bagasi saya belum sampai."],
    ],
  ],
  // 8. Aturan rumah
  [
    [
      ["分別", "Bunbetsu", "pemilahan (sampah)"],
      ["燃えるゴミ", "Moeru gomi", "sampah yang bisa dibakar"],
      ["共用", "Kyouyou", "dipakai bersama"],
      ["禁止されている", "Kinshi sarete iru", "dilarang", ["Kamu mendengar \"moeru gomi wa getsuyoubi\". Artinya...", "sampah bakar dibuang hari Senin", "sampah plastik hari Senin", "Senin tidak ada sampah", "sampah dibakar di rumah"]],
    ],
    [
      ["燃えるゴミは火曜日と金曜日に出してください。", "Moeru gomi wa kayoubi to kinyoubi ni dashite kudasai.", "Buang sampah bakar pada hari Selasa dan Jumat."],
      ["台所は共用なので、使ったらきれいにしてね。", "Daidokoro wa kyouyou na node, tsukattara kirei ni shite ne.", "Dapur dipakai bersama, jadi bersihkan setelah dipakai, ya."],
      ["ベランダでたばこを吸うのは禁止されています。", "Beranda de tabako o suu no wa kinshi sarete imasu.", "Merokok di balkon dilarang."],
      ["夜遅くに洗濯機を使わないでください。", "Yoru osoku ni sentakuki o tsukawanaide kudasai.", "Jangan memakai mesin cuci larut malam."],
    ],
  ],
  // 9. Membandingkan barang
  [
    [
      ["より", "Yori", "daripada"],
      ["ほうが", "Hou ga", "yang lebih"],
      ["それほど", "Sorehodo", "tidak begitu (dengan negatif)"],
      ["同じくらい", "Onaji kurai", "kira-kira sama", ["Kamu mendengar \"A no hou ga yasui\". Yang lebih murah adalah...", "A", "B", "keduanya sama", "tidak disebut"]],
    ],
    [
      ["こっちのかばんのほうが丈夫ですよ。", "Kocchi no kaban no hou ga joubu desu yo.", "Tas yang ini lebih kuat, lho."],
      ["値段は同じくらいですが、デザインが違います。", "Nedan wa onaji kurai desu ga, dezain ga chigaimasu.", "Harganya kira-kira sama, tetapi desainnya berbeda."],
      ["あのパソコンはこれより三万円安いです。", "Ano pasokon wa kore yori sanman-en yasui desu.", "Komputer itu tiga puluh ribu yen lebih murah dari ini.", ["Dari audio itu, komputer yang mana lebih murah?", "komputer itu (ano)", "komputer ini (kore)", "sama saja", "tidak disebut"]],
      ["大きさはそれほど変わりません。", "Ookisa wa sorehodo kawarimasen.", "Ukurannya tidak begitu berbeda."],
    ],
  ],
  // 10. Reservasi restoran
  [
    [
      ["個室", "Koshitsu", "ruang privat"],
      ["禁煙", "Kin-en", "bebas rokok"],
      ["お名前", "Onamae", "nama (sopan)"],
      ["承知しました", "Shouchi shimashita", "baik, kami mengerti", ["Kamu mendengar \"koshitsu ga aite orimasu\". Artinya...", "ruang privat masih kosong", "semua kursi penuh", "restoran tutup", "harus antre"]],
    ],
    [
      ["金曜日の夜、六人で予約をお願いしたいんですが。", "Kinyoubi no yoru, rokunin de yoyaku o onegai shitai n desu ga.", "Saya ingin memesan untuk enam orang Jumat malam.", ["Dari audio itu, reservasi untuk berapa orang?", "6", "4", "8", "2"]],
      ["お名前とお電話番号をお願いします。", "Onamae to odenwa bangou o onegaishimasu.", "Mohon nama dan nomor teleponnya."],
      ["誕生日なので、ケーキを用意してもらえますか。", "Tanjoubi na node, keeki o youi shite moraemasu ka.", "Karena ulang tahun, bisakah disiapkan kue?"],
      ["承知しました。お待ちしております。", "Shouchi shimashita. Omachi shite orimasu.", "Baik, kami mengerti. Kami menantikan kedatangan Anda."],
    ],
  ],
  // 11. Pesan telepon
  [
    [
      ["お手数ですが", "Otesuu desu ga", "maaf merepotkan, tetapi..."],
      ["ご連絡", "Gorenraku", "kabar / hubungan (sopan)"],
      ["番号", "Bangou", "nomor"],
      ["至急", "Shikyuu", "segera / mendesak", ["Kamu mendengar \"shikyuu gorenraku kudasai\". Penelepon meminta...", "segera dihubungi", "tidak usah menghubungi", "datang besok", "mengirim surat"]],
    ],
    [
      ["もしもし、さくら病院の受付です。", "Moshimoshi, Sakura byouin no uketsuke desu.", "Halo, ini resepsionis Rumah Sakit Sakura."],
      ["明日の予約の時間が三時に変わりました。", "Ashita no yoyaku no jikan ga sanji ni kawarimashita.", "Jam janji besok berubah menjadi pukul tiga.", ["Dari pesan itu, jam janji yang baru adalah...", "pukul 3", "pukul 2", "pukul 1", "pukul 4"]],
      ["お手数ですが、至急ご連絡ください。", "Otesuu desu ga, shikyuu gorenraku kudasai.", "Maaf merepotkan, mohon segera hubungi kami."],
      ["電話番号は〇四五の二二二の三三四四です。", "Denwa bangou wa zero yon go no ni ni ni no san san yon yon desu.", "Nomor teleponnya 045-222-3344."],
    ],
  ],
  // 12. Informasi acara
  [
    [
      ["参加費", "Sankahi", "biaya ikut serta"],
      ["定員", "Teiin", "kuota / kapasitas"],
      ["申し込み", "Moushikomi", "pendaftaran"],
      ["先着順", "Senchakujun", "siapa cepat dia dapat", ["Kamu mendengar \"teiin wa nijuunin\". Artinya...", "kuotanya dua puluh orang", "biayanya dua puluh yen", "dua puluh hari lagi", "dua puluh menit"]],
    ],
    [
      ["参加費は一人五百円です。", "Sankahi wa hitori gohyakuen desu.", "Biaya ikut lima ratus yen per orang."],
      ["定員になり次第、締め切ります。", "Teiin ni nari shidai, shimekirimasu.", "Begitu kuota terpenuhi, pendaftaran ditutup."],
      ["申し込みは先着順で受け付けます。", "Moushikomi wa senchakujun de uketsukemasu.", "Pendaftaran diterima berdasarkan siapa cepat dia dapat."],
      ["当日は動きやすい服で来てください。", "Toujitsu wa ugokiyasui fuku de kite kudasai.", "Pada harinya, datanglah dengan pakaian yang nyaman untuk bergerak."],
    ],
  ],
  // 13. Cerita pengalaman
  [
    [
      ["最初は", "Saisho wa", "awalnya"],
      ["慣れる", "Nareru", "terbiasa"],
      ["結局", "Kekkyoku", "akhirnya"],
      ["そのあと", "Sono ato", "setelah itu", ["Urutan cerita yang wajar adalah...", "最初は → そのあと → 結局", "結局 → 最初は → そのあと", "そのあと → 結局 → 最初は", "結局 → そのあと → 最初は"]],
    ],
    [
      ["最初は箸が上手に使えませんでした。", "Saisho wa hashi ga jouzu ni tsukaemasen deshita.", "Awalnya saya tidak bisa memakai sumpit dengan baik."],
      ["毎日練習して、だんだん慣れてきました。", "Mainichi renshuu shite, dandan narete kimashita.", "Setelah berlatih setiap hari, saya mulai terbiasa."],
      ["道に迷いましたが、結局親切な人が案内してくれました。", "Michi ni mayoimashita ga, kekkyoku shinsetsu na hito ga annai shite kuremashita.", "Saya tersesat, tetapi akhirnya ada orang baik yang mengantar saya.", ["Dari cerita itu, akhirnya pembicara...", "diantar oleh orang baik", "pulang sendiri", "naik taksi", "menelepon polisi"]],
      ["その経験は今でもいい思い出です。", "Sono keiken wa ima demo ii omoide desu.", "Pengalaman itu sampai sekarang masih kenangan indah."],
    ],
  ],
  // 14. Dialog memberi saran
  [
    [
      ["たら？", "Tara?", "bagaimana kalau ...? (akrab)"],
      ["減らす", "Herasu", "mengurangi"],
      ["やってみる", "Yatte miru", "mencoba melakukan"],
      ["そうだね", "Sou da ne", "benar juga", ["Kamu mendengar \"sou da ne, yatte miru\". Temanmu...", "menerima saran", "menolak saran", "marah", "tidak mengerti"]],
    ],
    [
      ["眠れないなら、寝る前にお風呂に入ったら？", "Nemurenai nara, neru mae ni ofuro ni haittara?", "Kalau tidak bisa tidur, bagaimana kalau berendam sebelum tidur?"],
      ["コーヒーを飲む量を減らしたほうがいいよ。", "Koohii o nomu ryou o herashita hou ga ii yo.", "Sebaiknya kurangi jumlah kopi yang kamu minum."],
      ["うーん、それはちょっと難しいなあ。", "Uun, sore wa chotto muzukashii naa.", "Hmm, itu agak sulit, ya.", ["Dari audio itu, pembicara...", "merasa saran itu sulit dilakukan", "langsung setuju", "berterima kasih", "marah"]],
      ["わかった。今晩からやってみるよ。", "Wakatta. Konban kara yatte miru yo.", "Oke. Mulai malam ini akan kucoba."],
    ],
  ],
  // 15. Dialog meminta izin
  [
    [
      ["てもいい", "Te mo ii", "boleh ..."],
      ["だめ", "Dame", "tidak boleh"],
      ["なら", "Nara", "kalau (dengan syarat)"],
      ["持ち出す", "Mochidasu", "membawa keluar", ["Kamu mendengar \"kopii nara ii desu yo\". Izin diberikan...", "dengan syarat (hanya fotokopi)", "sepenuhnya", "tidak sama sekali", "besok saja"]],
    ],
    [
      ["すみません、ここで電話してもいいですか。", "Sumimasen, koko de denwa shite mo ii desu ka.", "Permisi, bolehkah saya menelepon di sini?"],
      ["外でなら、かまいませんよ。", "Soto de nara, kamaimasen yo.", "Kalau di luar, tidak masalah."],
      ["この本は図書館の外に持ち出せません。", "Kono hon wa toshokan no soto ni mochidasemasen.", "Buku ini tidak bisa dibawa keluar perpustakaan."],
      ["先生、明日休んでもいいですか。", "Sensei, ashita yasunde mo ii desu ka.", "Pak/Bu guru, bolehkah saya tidak masuk besok?"],
    ],
  ],
  // 16. Perubahan jadwal
  [
    [
      ["日程の変更", "Nittei no henkou", "perubahan jadwal"],
      ["繰り上げ", "Kuriage", "dimajukan"],
      ["繰り下げ", "Kurisage", "dimundurkan"],
      ["予定通り", "Yotei doori", "sesuai rencana", ["Kamu mendengar \"yotei doori okonaimasu\". Acara...", "berjalan sesuai rencana", "ditunda", "dibatalkan", "dimajukan"]],
    ],
    [
      ["試験の開始時間が十時から九時半に繰り上げになりました。", "Shiken no kaishi jikan ga juuji kara kuji han ni kuriage ni narimashita.", "Jam mulai ujian dimajukan dari pukul sepuluh ke setengah sepuluh.", ["Dari audio itu, ujian sekarang mulai pukul...", "09.30", "10.00", "10.30", "09.00"]],
      ["明日の練習は予定通り行います。", "Ashita no renshuu wa yotei doori okonaimasu.", "Latihan besok berjalan sesuai rencana."],
      ["面接の日にちが水曜日に変更になりました。", "Mensetsu no hinichi ga suiyoubi ni henkou ni narimashita.", "Tanggal wawancara diubah ke hari Rabu."],
      ["会場は二階から三階に変わります。", "Kaijou wa nikai kara sangai ni kawarimasu.", "Tempat acara pindah dari lantai dua ke lantai tiga."],
    ],
  ],
  // 17. Berita sederhana
  [
    [
      ["ニュース", "Nyuusu", "berita"],
      ["開花", "Kaika", "mulai mekar"],
      ["見ごろ", "Migoro", "waktu terbaik untuk dilihat"],
      ["観光客", "Kankoukyaku", "wisatawan", ["Kamu mendengar \"migoro wa raishuu\". Artinya...", "waktu terbaik melihatnya minggu depan", "sudah layu minggu depan", "dibuka minggu depan", "ditutup minggu depan"]],
    ],
    [
      ["今朝、北海道で初雪が降りました。", "Kesa, Hokkaidou de hatsuyuki ga furimashita.", "Pagi ini salju pertama turun di Hokkaido."],
      ["去年より一週間遅いそうです。", "Kyonen yori isshuukan osoi sou desu.", "Katanya seminggu lebih lambat dari tahun lalu."],
      ["紅葉の見ごろは今月の終わりごろです。", "Kouyou no migoro wa kongetsu no owari goro desu.", "Waktu terbaik melihat daun merah sekitar akhir bulan ini."],
      ["連休中、多くの観光客が京都を訪れました。", "Renkyuuchuu, ooku no kankoukyaku ga Kyouto o otozuremashita.", "Selama libur panjang, banyak wisatawan mengunjungi Kyoto."],
    ],
  ],
  // 18. Pengumuman radio
  [
    [
      ["交通情報", "Koutsuu jouhou", "informasi lalu lintas"],
      ["渋滞", "Juutai", "kemacetan"],
      ["通行止め", "Tsuukoudome", "jalan ditutup"],
      ["迂回", "Ukai", "jalan memutar", ["Kamu mendengar \"tsuukoudome\". Artinya...", "jalan ditutup", "jalan lancar", "jalan baru", "jalan tol gratis"]],
    ],
    [
      ["国道一号線で五キロの渋滞が発生しています。", "Kokudou ichigousen de gokiro no juutai ga hassei shite imasu.", "Terjadi kemacetan lima kilometer di jalan nasional nomor satu.", ["Dari pengumuman itu, panjang kemacetan adalah...", "5 km", "1 km", "15 km", "50 km"]],
      ["事故のため、橋は通行止めになっています。", "Jiko no tame, hashi wa tsuukoudome ni natte imasu.", "Karena kecelakaan, jembatan ditutup."],
      ["迂回して、川沿いの道をご利用ください。", "Ukai shite, kawazoi no michi o goriyou kudasai.", "Silakan memutar dan gunakan jalan di sepanjang sungai."],
      ["午後六時ごろには解消する見込みです。", "Gogo rokuji goro ni wa kaishou suru mikomi desu.", "Diperkirakan akan lancar sekitar pukul enam sore."],
    ],
  ],
  // 19. Menyimpulkan maksud percakapan
  [
    [
      ["ちょっと…", "Chotto...", "agak... (penolakan halus)"],
      ["いいね", "Ii ne", "bagus! (setuju)"],
      ["考えておく", "Kangaete oku", "akan dipikirkan dulu"],
      ["また今度ね", "Mata kondo ne", "lain kali ya", ["Kamu mendengar \"kangaete oku ne\". Biasanya artinya...", "belum setuju / menolak halus", "langsung setuju", "marah", "sudah memutuskan"]],
    ],
    [
      ["今夜飲みに行かない？うーん、明日早いから、ちょっと…。", "Kon-ya nomi ni ikanai? Uun, ashita hayai kara, chotto...", "Malam ini minum yuk? Hmm, besok berangkat pagi, jadi agak...", ["Dari dialog itu, orang kedua...", "menolak dengan halus", "setuju", "akan datang terlambat", "mengajak orang lain"]],
      ["その映画、いいね！私も見たかったんだ。", "Sono eiga, ii ne! Watashi mo mitakatta n da.", "Film itu bagus! Aku juga ingin menontonnya."],
      ["ありがとう。考えておくね。", "Arigatou. Kangaete oku ne.", "Terima kasih. Akan kupikirkan dulu, ya."],
      ["悪いけど、また今度誘ってね。", "Warui kedo, mata kondo sasotte ne.", "Maaf ya, ajak aku lagi lain kali."],
    ],
  ],
  // 20. Ulasan listening N4
  [
    [
      ["先に", "Saki ni", "duluan"],
      ["買っておく", "Katte oku", "membeli terlebih dulu"],
      ["あと十分", "Ato juppun", "sepuluh menit lagi"],
      ["間に合う？", "Ma ni au?", "sempat?", ["Kamu mendengar \"saki ni itte te\". Artinya...", "pergilah duluan", "tunggu aku", "jangan pergi", "aku sudah sampai"]],
    ],
    [
      ["電車が遅れてて、十分ぐらい遅れそう。", "Densha ga okurete te, juppun gurai okuresou.", "Keretanya terlambat, sepertinya aku telat sekitar sepuluh menit.", ["Dari audio itu, pembicara akan terlambat sekitar...", "10 menit", "1 jam", "30 menit", "5 menit"]],
      ["先に店に入って、席を取っておいて。", "Saki ni mise ni haitte, seki o totte oite.", "Masuk duluan ke toko dan tolong ambilkan tempat duduk."],
      ["飲み物は何でもいいよ。", "Nomimono wa nan demo ii yo.", "Minumannya apa saja boleh."],
      ["着いたら、また連絡するね。", "Tsuitara, mata renraku suru ne.", "Kalau sudah sampai, aku kabari lagi, ya."],
    ],
  ],
];
