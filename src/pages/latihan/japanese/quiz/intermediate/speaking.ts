import type { JapaneseQuizTopic } from '../types';

// Latihan Speaking N3 — one entry per topic (index = topic - 1): [Basic, Advanced].
export const speaking: JapaneseQuizTopic[] = [
  // 1. Pendapat dan alasan
  [
    [
      ["個人的には", "Kojinteki ni wa", "secara pribadi"],
      ["ある程度", "Aru teido", "sampai batas tertentu"],
      ["というのは", "To iu no wa", "sebab / yang dimaksud"],
      ["そういうわけで", "Sou iu wake de", "karena itulah", ["Urutan menyampaikan pendapat model PREP adalah...", "pendapat → alasan → contoh → pendapat", "contoh → salam → pamit", "alasan → pamit", "pertanyaan → jawaban saja"]],
    ],
    [
      ["個人的には、在宅勤務のほうが効率がいいと思います。", "Kojinteki ni wa, zaitaku kinmu no hou ga kouritsu ga ii to omoimasu.", "Secara pribadi, menurut saya kerja dari rumah lebih efisien."],
      ["というのは、通勤の時間を勉強に使えるからです。", "To iu no wa, tsuukin no jikan o benkyou ni tsukaeru kara desu.", "Sebab waktu perjalanan ke kantor bisa dipakai untuk belajar."],
      ["実際、私は去年それで資格を一つ取りました。", "Jissai, watashi wa kyonen sore de shikaku o hitotsu torimashita.", "Kenyataannya, tahun lalu saya mendapat satu sertifikat dengan cara itu."],
      ["そういうわけで、在宅勤務に賛成です。", "Sou iu wake de, zaitaku kinmu ni sansei desu.", "Karena itulah, saya setuju dengan kerja dari rumah."],
    ],
  ],
  // 2. Memecahkan masalah
  [
    [
      ["うまくいっていない", "Umaku itte inai", "tidak berjalan lancar"],
      ["原因は何だと思いますか", "Gen-in wa nan da to omoimasu ka", "menurutmu apa penyebabnya?"],
      ["てみてはどうでしょうか", "Te mite wa dou deshou ka", "bagaimana kalau mencoba ...?"],
      ["様子を見る", "Yousu o miru", "melihat perkembangan", ["Usulan solusi yang sopan adalah...", "〜てみてはどうでしょうか。", "〜しなさい。", "〜するな。", "〜てはいけません。"]],
    ],
    [
      ["最近、会議が長すぎて、仕事が進まないんです。", "Saikin, kaigi ga nagasugite, shigoto ga susumanai n desu.", "Akhir-akhir ini rapatnya terlalu lama, pekerjaan jadi tidak maju."],
      ["議題を事前に決めておかないのが原因だと思います。", "Gidai o jizen ni kimete okanai no ga gen-in da to omoimasu.", "Menurut saya penyebabnya agenda tidak ditentukan sebelumnya."],
      ["会議を三十分以内にしてみてはどうでしょうか。", "Kaigi o sanjuppun inai ni shite mite wa dou deshou ka.", "Bagaimana kalau mencoba membatasi rapat dalam tiga puluh menit?"],
      ["まず一か月試して、様子を見ましょう。", "Mazu ikkagetsu tameshite, yousu o mimashou.", "Mari coba dulu sebulan, lalu lihat perkembangannya."],
    ],
  ],
  // 3. Percakapan di kantor
  [
    [
      ["よろしいでしょうか", "Yoroshii deshou ka", "apakah sekarang ada waktu? (sopan)"],
      ["ご報告", "Gohoukoku", "laporan (sopan)"],
      ["先方", "Senpou", "pihak mitra"],
      ["引き続き", "Hikitsuzuki", "selanjutnya / terus berlanjut", ["Prinsip kerja Jepang 報連相 terdiri dari...", "lapor, kabari, konsultasi", "makan, minum, tidur", "datang, kerja, pulang", "baca, tulis, hitung"]],
    ],
    [
      ["部長、少しお時間よろしいでしょうか。", "Buchou, sukoshi ojikan yoroshii deshou ka.", "Pak/Bu manajer, apakah ada sedikit waktu?"],
      ["新しい企画について、ご相談したいことがあります。", "Atarashii kikaku ni tsuite, gosoudan shitai koto ga arimasu.", "Ada yang ingin saya konsultasikan tentang proyek baru."],
      ["先方から、納品を一日早めてほしいと連絡がありました。", "Senpou kara, nouhin o ichinichi hayamete hoshii to renraku ga arimashita.", "Pihak mitra mengabari bahwa mereka ingin pengiriman dipercepat sehari."],
      ["では、引き続きよろしくお願いします。", "De wa, hikitsuzuki yoroshiku onegaishimasu.", "Kalau begitu, mohon dilanjutkan."],
    ],
  ],
  // 4. Meringkas berita
  [
    [
      ["ニュースによると", "Nyuusu ni yoru to", "menurut berita"],
      ["平均で", "Heikin de", "rata-rata"],
      ["ということです", "To iu koto desu", "katanya / dilaporkan"],
      ["一割", "Ichiwari", "sepuluh persen", ["Saat meringkas berita, yang pertama disampaikan adalah...", "inti berita", "pendapat pribadi", "salam penutup", "nama penyiar"]],
    ],
    [
      ["ニュースによると、来月からバス代が上がるそうです。", "Nyuusu ni yoru to, raigetsu kara basudai ga agaru sou desu.", "Menurut berita, ongkos bus akan naik mulai bulan depan."],
      ["平均で二十円ぐらい高くなるということです。", "Heikin de nijuuen gurai takaku naru to iu koto desu.", "Katanya rata-rata naik sekitar dua puluh yen."],
      ["燃料の値段が上がったことが原因だそうです。", "Nenryou no nedan ga agatta koto ga gen-in da sou desu.", "Katanya penyebabnya kenaikan harga bahan bakar."],
      ["毎日バスで通う人には大きな影響がありますね。", "Mainichi basu de kayou hito ni wa ooki na eikyou ga arimasu ne.", "Bagi yang setiap hari naik bus, dampaknya besar, ya."],
    ],
  ],
  // 5. Pengalaman secara rinci
  [
    [
      ["最初は", "Saisho wa", "awalnya"],
      ["うちに", "Uchi ni", "selama / sementara"],
      ["おかげで", "Okage de", "berkat itu"],
      ["上達する", "Joutatsu suru", "meningkat (kemampuan)", ["Urutan cerita pengalaman yang rinci adalah...", "latar → kejadian → perasaan → pelajaran", "pelajaran → salam", "perasaan saja", "kejadian → pamit"]],
    ],
    [
      ["去年、農村で一か月ボランティアをしました。", "Kyonen, nouson de ikkagetsu borantia o shimashita.", "Tahun lalu saya menjadi relawan sebulan di desa pertanian."],
      ["最初は朝早く起きるのがつらかったです。", "Saisho wa asa hayaku okiru no ga tsurakatta desu.", "Awalnya bangun pagi itu berat."],
      ["働いているうちに、村の人と仲良くなりました。", "Hataraite iru uchi ni, mura no hito to nakayoku narimashita.", "Selama bekerja, saya jadi akrab dengan warga desa."],
      ["その経験のおかげで、食べ物を大切にするようになりました。", "Sono keiken no okage de, tabemono o taisetsu ni suru you ni narimashita.", "Berkat pengalaman itu, saya jadi lebih menghargai makanan."],
    ],
  ],
  // 6. Argumen perbandingan
  [
    [
      ["メリット", "Meritto", "kelebihan / keuntungan"],
      ["デメリット", "Demeritto", "kekurangan / kerugian"],
      ["総合的に", "Sougouteki ni", "secara keseluruhan"],
      ["使い分ける", "Tsukaiwakeru", "memakai sesuai keperluan", ["Lawan kata メリット adalah...", "デメリット", "リスク", "コスト", "ポイント"]],
    ],
    [
      ["電車とバス、通勤にはどちらがいいと思いますか。", "Densha to basu, tsuukin ni wa dochira ga ii to omoimasu ka.", "Kereta dan bus, menurutmu mana yang lebih baik untuk ke kantor?"],
      ["電車のメリットは、時間が正確なことです。", "Densha no meritto wa, jikan ga seikaku na koto desu.", "Kelebihan kereta adalah waktunya tepat."],
      ["一方で、朝は混んでいるというデメリットもあります。", "Ippou de, asa wa konde iru to iu demeritto mo arimasu.", "Di sisi lain, ada juga kekurangan, pagi hari penuh sesak."],
      ["総合的に考えると、私は電車のほうがいいと思います。", "Sougouteki ni kangaeru to, watashi wa densha no hou ga ii to omoimasu.", "Kalau dipikir secara keseluruhan, menurut saya kereta lebih baik."],
    ],
  ],
  // 7. Memberi rekomendasi
  [
    [
      ["おすすめです", "Osusume desu", "saya rekomendasikan"],
      ["それなら", "Sore nara", "kalau begitu"],
      ["効率よく", "Kouritsu yoku", "secara efisien"],
      ["初心者向け", "Shoshinsha muke", "untuk pemula", ["Untuk memberi rekomendasi, ungkapan yang tepat adalah...", "〜がおすすめですよ。", "〜はだめです。", "〜しなさい。", "〜を知りません。"]],
    ],
    [
      ["京都で静かなお寺に行きたいんですが。", "Kyouto de shizuka na otera ni ikitai n desu ga.", "Saya ingin pergi ke kuil yang tenang di Kyoto."],
      ["それなら、朝早く大原のお寺に行くのがおすすめですよ。", "Sore nara, asa hayaku Oohara no otera ni iku no ga osusume desu yo.", "Kalau begitu, saya sarankan pergi pagi-pagi ke kuil di Ohara."],
      ["この料理教室は初心者向けなので、安心して参加できます。", "Kono ryouri kyoushitsu wa shoshinsha muke na node, anshin shite sanka dekimasu.", "Kelas memasak ini untuk pemula, jadi bisa ikut dengan tenang."],
      ["ただ、週末は混むので予約したほうがいいです。", "Tada, shuumatsu wa komu node yoyaku shita hou ga ii desu.", "Hanya saja, akhir pekan ramai, jadi sebaiknya reservasi."],
    ],
  ],
  // 8. Mengeluh dengan sopan
  [
    [
      ["恐れ入りますが", "Osoreirimasu ga", "mohon maaf, tetapi..."],
      ["ていただけますか", "Te itadakemasu ka", "bisakah Anda ...?"],
      ["申し訳ございません", "Moushiwake gozaimasen", "mohon maaf sekali"],
      ["確認いたします", "Kakunin itashimasu", "akan kami periksa", ["Keluhan yang sopan sebaiknya dibuka dengan...", "恐れ入りますが、", "おい、", "ちょっと！", "早くしろ。"]],
    ],
    [
      ["恐れ入りますが、部屋のエアコンがつかないんですが。", "Osoreirimasu ga, heya no eakon ga tsukanai n desu ga.", "Mohon maaf, AC di kamar tidak menyala."],
      ["隣の部屋が少しうるさいので、注意していただけますか。", "Tonari no heya ga sukoshi urusai node, chuui shite itadakemasu ka.", "Kamar sebelah agak berisik, bisakah ditegur?"],
      ["大変申し訳ございません。すぐに係の者を伺わせます。", "Taihen moushiwake gozaimasen. Sugu ni kakari no mono o ukagawasemasu.", "Mohon maaf sekali. Kami akan segera mengirim petugas."],
      ["もし直らなければ、部屋を替えていただけますか。", "Moshi naoranakereba, heya o kaete itadakemasu ka.", "Kalau tidak bisa diperbaiki, bisakah kamar saya diganti?"],
    ],
  ],
  // 9. Wawancara kerja
  [
    [
      ["志望動機", "Shibou douki", "motivasi melamar"],
      ["長所", "Chousho", "kelebihan"],
      ["御社", "Onsha", "perusahaan Anda (lisan)"],
      ["粘り強い", "Nebarizuyoi", "gigih", ["Saat wawancara, perusahaan lawan bicara disebut...", "御社", "弊社", "うちの会社", "あの会社"]],
    ],
    [
      ["御社の製品を通して、人々の生活を支えたいと考えています。", "Onsha no seihin o tooshite, hitobito no seikatsu o sasaetai to kangaete imasu.", "Saya ingin menopang kehidupan orang lewat produk perusahaan Anda."],
      ["私の長所は、誰とでもすぐに打ち解けられることです。", "Watashi no chousho wa, dare to demo sugu ni uchitokerareru koto desu.", "Kelebihan saya adalah bisa cepat akrab dengan siapa pun."],
      ["大学では留学生支援のサークルでリーダーを務めました。", "Daigaku de wa ryuugakusei shien no saakuru de riidaa o tsutomemashita.", "Di universitas saya menjadi ketua klub pendamping mahasiswa asing."],
      ["入社後は、海外営業に挑戦したいと思っております。", "Nyuusha go wa, kaigai eigyou ni chousen shitai to omotte orimasu.", "Setelah bergabung, saya ingin mencoba bidang penjualan luar negeri."],
    ],
  ],
  // 10. Membuka presentasi
  [
    [
      ["本日は", "Honjitsu wa", "hari ini (formal)"],
      ["についてお話しします", "Ni tsuite ohanashi shimasu", "akan berbicara tentang ..."],
      ["まず", "Mazu", "pertama-tama"],
      ["最後に", "Saigo ni", "terakhir", ["Urutan pembukaan presentasi yang baik adalah...", "salam → topik → struktur → durasi", "kesimpulan → salam", "pertanyaan → pamit", "topik → pamit"]],
    ],
    [
      ["本日は、私たちの調査結果についてお話しします。", "Honjitsu wa, watashitachi no chousa kekka ni tsuite ohanashi shimasu.", "Hari ini saya akan berbicara tentang hasil survei kami."],
      ["発表は十五分ほどを予定しております。", "Happyou wa juugofun hodo o yotei shite orimasu.", "Presentasi direncanakan sekitar lima belas menit."],
      ["まず調査の目的、次に結果をご説明します。", "Mazu chousa no mokuteki, tsugi ni kekka o gosetsumei shimasu.", "Pertama saya jelaskan tujuan survei, lalu hasilnya."],
      ["ご質問は、最後にまとめてお受けいたします。", "Goshitsumon wa, saigo ni matomete ouke itashimasu.", "Pertanyaan akan kami terima sekaligus di akhir."],
    ],
  ],
  // 11. Menceritakan ulang cerita
  [
    [
      ["昔々", "Mukashi mukashi", "dahulu kala"],
      ["それから間もなく", "Sorekara mamonaku", "tak lama setelah itu"],
      ["その結果", "Sono kekka", "akibatnya"],
      ["めでたしめでたし", "Medetashi medetashi", "tamat dengan bahagia", ["Pembuka dongeng Jepang yang khas adalah...", "昔々", "最近", "来週", "さて"]],
    ],
    [
      ["昔々、山の中に小さな村がありました。", "Mukashi mukashi, yama no naka ni chiisa na mura ga arimashita.", "Dahulu kala, di tengah gunung ada sebuah desa kecil."],
      ["ある日、おじいさんは山で傷ついた鳥を助けました。", "Aru hi, ojiisan wa yama de kizutsuita tori o tasukemashita.", "Suatu hari, kakek menolong burung yang terluka di gunung."],
      ["すると、次の日、家の前に宝物が置いてありました。", "Suruto, tsugi no hi, ie no mae ni takaramono ga oite arimashita.", "Lalu, keesokan harinya, ada harta karun di depan rumah."],
      ["おじいさんはそれを村のみんなと分けたそうです。", "Ojiisan wa sore o mura no minna to waketa sou desu.", "Konon kakek membaginya dengan seluruh warga desa."],
    ],
  ],
  // 12. Topik budaya
  [
    [
      ["お中元", "Ochuugen", "hadiah musim panas"],
      ["お歳暮", "Oseibo", "hadiah akhir tahun"],
      ["感謝の気持ち", "Kansha no kimochi", "rasa terima kasih"],
      ["似ている", "Nite iru", "mirip", ["Hadiah akhir tahun di Jepang disebut...", "お歳暮", "お中元", "お年玉", "お土産"]],
    ],
    [
      ["日本では年末にお歳暮を贈る習慣があります。", "Nihon de wa nenmatsu ni oseibo o okuru shuukan ga arimasu.", "Di Jepang ada kebiasaan mengirim hadiah akhir tahun."],
      ["お世話になった人に感謝の気持ちを伝えるためです。", "Osewa ni natta hito ni kansha no kimochi o tsutaeru tame desu.", "Tujuannya menyampaikan rasa terima kasih kepada orang yang telah membantu."],
      ["インドネシアにも、レバランに親戚を訪ねる習慣があります。", "Indoneshia ni mo, Rebaran ni shinseki o tazuneru shuukan ga arimasu.", "Di Indonesia juga ada kebiasaan mengunjungi kerabat saat Lebaran."],
      ["人とのつながりを大切にする点が似ていると思います。", "Hito to no tsunagari o taisetsu ni suru ten ga nite iru to omoimasu.", "Menurut saya miripnya ada pada sisi menghargai hubungan antarmanusia."],
    ],
  ],
  // 13. Dialog layanan
  [
    [
      ["かしこまりました", "Kashikomarimashita", "baik, saya mengerti (sopan)"],
      ["ただいまお持ちします", "Tadaima omochi shimasu", "segera saya bawakan"],
      ["お届け先", "Otodokesaki", "alamat tujuan pengiriman"],
      ["でございます", "De gozaimasu", "adalah (sangat sopan)", ["Bentuk sangat sopan dari です adalah...", "でございます", "だ", "である", "っす"]],
    ],
    [
      ["この服をクリーニングに出したいんですが。", "Kono fuku o kuriiningu ni dashitai n desu ga.", "Saya ingin memasukkan baju ini ke laundry."],
      ["かしこまりました。お受け取りは木曜日になります。", "Kashikomarimashita. Ouketori wa mokuyoubi ni narimasu.", "Baik. Pengambilannya hari Kamis."],
      ["少々お待ちください。ただいま在庫を確認いたします。", "Shoushou omachi kudasai. Tadaima zaiko o kakunin itashimasu.", "Mohon tunggu sebentar. Saya periksa stoknya sekarang."],
      ["こちらがお探しの商品でございます。", "Kochira ga osagashi no shouhin de gozaimasu.", "Ini barang yang Anda cari."],
    ],
  ],
  // 14. Meminta klarifikasi
  [
    [
      ["要点", "Youten", "inti / poin utama"],
      ["ということですか", "To iu koto desu ka", "maksudnya ... ?"],
      ["もう少し詳しく", "Mou sukoshi kuwashiku", "sedikit lebih rinci"],
      ["聞き取れなかった", "Kikitorenakatta", "tidak bisa menangkap (pendengaran)", ["Untuk memastikan pemahaman, kamu bertanya...", "つまり、〜ということですか。", "わかりました。", "さようなら。", "いただきます。"]],
    ],
    [
      ["すみません、最後のところが聞き取れなかったんですが。", "Sumimasen, saigo no tokoro ga kikitorenakatta n desu ga.", "Maaf, bagian terakhir tidak tertangkap."],
      ["つまり、締め切りが一日早くなったということですか。", "Tsumari, shimekiri ga ichinichi hayaku natta to iu koto desu ka.", "Jadi maksudnya tenggatnya maju sehari?"],
      ["もう少し詳しく説明していただけますか。", "Mou sukoshi kuwashiku setsumei shite itadakemasu ka.", "Bisakah dijelaskan sedikit lebih rinci?"],
      ["「至急」というのは、今日中という意味ですか。", "\"Shikyuu\" to iu no wa, kyoujuu to iu imi desu ka.", "Yang dimaksud 'segera' itu artinya hari ini juga?"],
    ],
  ],
  // 15. Negosiasi dasar
  [
    [
      ["その代わりに", "Sono kawari ni", "sebagai gantinya"],
      ["と助かるんですが", "To tasukaru n desu ga", "akan sangat membantu kalau..."],
      ["難しいですね", "Muzukashii desu ne", "agak sulit, ya (penolakan halus)"],
      ["それなら問題ありません", "Sore nara mondai arimasen", "kalau begitu tidak masalah", ["Dalam negosiasi, 難しいですね biasanya berarti...", "penolakan halus", "setuju penuh", "tidak mengerti", "pujian"]],
    ],
    [
      ["もう少し値段を下げていただけると助かるんですが。", "Mou sukoshi nedan o sagete itadakeru to tasukaru n desu ga.", "Akan sangat membantu kalau harganya bisa diturunkan sedikit."],
      ["一割引きは難しいですが、五パーセントなら可能です。", "Ichiwaribiki wa muzukashii desu ga, go paasento nara kanou desu.", "Diskon sepuluh persen sulit, tapi lima persen bisa."],
      ["その代わりに、来月も同じ量を注文します。", "Sono kawari ni, raigetsu mo onaji ryou o chuumon shimasu.", "Sebagai gantinya, bulan depan kami memesan jumlah yang sama."],
      ["分かりました。それなら問題ありません。", "Wakarimashita. Sore nara mondai arimasen.", "Baik. Kalau begitu tidak masalah."],
    ],
  ],
  // 16. Menyatakan ketidakpastian
  [
    [
      ["はっきりとは言えませんが", "Hakkiri to wa iemasen ga", "belum bisa dipastikan, tapi..."],
      ["たぶん", "Tabun", "mungkin"],
      ["かもしれません", "Kamoshiremasen", "mungkin"],
      ["確かではありませんが", "Tashika de wa arimasen ga", "tidak pasti, tapi...", ["Ungkapan ketidakpastian yang sopan adalah...", "はっきりとは言えませんが、", "絶対に", "必ず", "もちろん"]],
    ],
    [
      ["はっきりとは言えませんが、来月には完成すると思います。", "Hakkiri to wa iemasen ga, raigetsu ni wa kansei suru to omoimasu.", "Belum bisa dipastikan, tapi saya pikir bulan depan selesai."],
      ["道が混んでいたら、少し遅れるかもしれません。", "Michi ga konde itara, sukoshi okureru kamoshiremasen.", "Kalau jalanan macet, saya mungkin sedikit terlambat."],
      ["確かではありませんが、会議は三時からだったと思います。", "Tashika de wa arimasen ga, kaigi wa sanji kara datta to omoimasu.", "Tidak pasti, tapi seingat saya rapatnya mulai pukul tiga."],
      ["決まり次第、すぐにご連絡します。", "Kimari shidai, sugu ni gorenraku shimasu.", "Begitu diputuskan, saya akan segera menghubungi Anda."],
    ],
  ],
  // 17. Menjelaskan proses
  [
    [
      ["一口の大きさ", "Hitokuchi no ookisa", "seukuran sekali suap"],
      ["次に", "Tsugi ni", "selanjutnya"],
      ["それから", "Sorekara", "setelah itu"],
      ["できあがり", "Dekiagari", "selesai / jadi", ["Penanda urutan proses yang benar adalah...", "まず → 次に → 最後に", "最後に → まず", "でも → だから", "つまり → まず"]],
    ],
    [
      ["カレーの作り方を説明しますね。", "Karee no tsukurikata o setsumei shimasu ne.", "Saya jelaskan cara membuat kari, ya."],
      ["まず、野菜と肉を一口の大きさに切ります。", "Mazu, yasai to niku o hitokuchi no ookisa ni kirimasu.", "Pertama, potong sayur dan daging seukuran sekali suap."],
      ["次に、なべで炒めてから水を入れて煮ます。", "Tsugi ni, nabe de itamete kara mizu o irete nimasu.", "Selanjutnya, tumis di panci lalu masukkan air dan rebus."],
      ["最後にルーを入れて、十分煮込めばできあがりです。", "Saigo ni ruu o irete, juppun nikomeba dekiagari desu.", "Terakhir masukkan bumbu kari, rebus sepuluh menit, dan selesai."],
    ],
  ],
  // 18. Setuju dan tidak setuju
  [
    [
      ["おっしゃる通りです", "Ossharu toori desu", "Anda benar sekali"],
      ["確かに", "Tashika ni", "memang benar"],
      ["そうかもしれませんが", "Sou kamoshiremasen ga", "mungkin begitu, tapi..."],
      ["一理ある", "Ichiri aru", "ada benarnya", ["Ungkapan tidak setuju yang halus adalah...", "そうかもしれませんが、", "違います！", "だめです。", "おかしいです。"]],
    ],
    [
      ["おっしゃる通り、安全が一番大切です。", "Ossharu toori, anzen ga ichiban taisetsu desu.", "Seperti yang Anda katakan, keselamatan paling penting."],
      ["確かにその意見にも一理ありますね。", "Tashika ni sono iken ni mo ichiri arimasu ne.", "Memang pendapat itu juga ada benarnya."],
      ["そうかもしれませんが、費用の問題もあると思います。", "Sou kamoshiremasen ga, hiyou no mondai mo aru to omoimasu.", "Mungkin begitu, tapi menurut saya ada juga masalah biaya."],
      ["では、両方の案を比べてから決めましょう。", "De wa, ryouhou no an o kurabete kara kimemashou.", "Kalau begitu, mari putuskan setelah membandingkan kedua usulan."],
    ],
  ],
  // 19. Debat mini
  [
    [
      ["という立場です", "To iu tachiba desu", "posisi saya adalah ..."],
      ["反論", "Hanron", "sanggahan"],
      ["根拠", "Konkyo", "dasar / bukti"],
      ["面", "Men", "segi / aspek", ["Urutan debat yang baik adalah...", "klaim → bukti → sanggahan → tanggapan", "sanggahan → pamit", "bukti saja", "salam → selesai"]],
    ],
    [
      ["私は、小学生に英語教育は必要だという立場です。", "Watashi wa, shougakusei ni Eigo kyouiku wa hitsuyou da to iu tachiba desu.", "Posisi saya: pendidikan bahasa Inggris perlu bagi anak SD."],
      ["根拠は、早く始めるほど発音がよくなるという研究です。", "Konkyo wa, hayaku hajimeru hodo hatsuon ga yoku naru to iu kenkyuu desu.", "Dasarnya adalah penelitian bahwa semakin dini mulai, pelafalan semakin baik."],
      ["国語の時間が減るという反論もありますが。", "Kokugo no jikan ga heru to iu hanron mo arimasu ga.", "Ada juga sanggahan bahwa jam pelajaran bahasa Jepang berkurang."],
      ["それは時間割を工夫すれば解決できると思います。", "Sore wa jikanwari o kufuu sureba kaiketsu dekiru to omoimasu.", "Menurut saya itu bisa diatasi dengan mengatur jadwal pelajaran."],
    ],
  ],
  // 20. Ulasan speaking N3
  [
    [
      ["足りない", "Tarinai", "kurang / tidak cukup"],
      ["例えば", "Tatoeba", "misalnya"],
      ["があればいい", "Ga areba ii", "alangkah baiknya ada ..."],
      ["交流", "Kouryuu", "interaksi / pertukaran", ["Untuk meminta contoh, kamu bertanya...", "例えば、どんな〜ですか。", "どうしてですか。", "いつですか。", "誰ですか。"]],
    ],
    [
      ["この学校に足りないのは、留学生との交流の場だと思います。", "Kono gakkou ni tarinai no wa, ryuugakusei to no kouryuu no ba da to omoimasu.", "Menurut saya yang kurang di sekolah ini adalah tempat interaksi dengan mahasiswa asing."],
      ["例えば、どんな活動がいいですか。", "Tatoeba, donna katsudou ga ii desu ka.", "Misalnya, kegiatan seperti apa yang bagus?"],
      ["月に一度、料理を作って食べる会があればいいですね。", "Tsuki ni ichido, ryouri o tsukutte taberu kai ga areba ii desu ne.", "Alangkah baiknya ada acara memasak dan makan bersama sebulan sekali."],
      ["それはいいアイデアですね。先生に提案してみましょう。", "Sore wa ii aidea desu ne. Sensei ni teian shite mimashou.", "Itu ide bagus. Mari coba usulkan ke guru."],
    ],
  ],
];
