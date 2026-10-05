import type { JapaneseQuizTopic } from '../types';

// Latihan Listening N1 — one entry per topic (index = topic - 1): [Basic, Advanced].
export const listening: JapaneseQuizTopic[] = [
  // 1. Kuliah akademik
  [
    [
      ["本題に入る", "Hondai ni hairu", "masuk ke pokok bahasan"],
      ["前置きが長くなりました", "Maeoki ga nagaku narimashita", "pengantarnya jadi panjang"],
      ["一見", "Ikken", "sekilas"],
      ["裏を返せば", "Ura o kaeseba", "jika dibalik / sebaliknya", ["Dalam kuliah N1, tesis dosen biasanya muncul...", "setelah penanda seperti 本題", "di kalimat pertama selalu", "tidak pernah disampaikan", "hanya di slide"]],
    ],
    [
      ["前置きが長くなりましたが、ここからが今日の本題です。", "Maeoki ga nagaku narimashita ga, koko kara ga kyou no hondai desu.", "Pengantarnya jadi panjang, tetapi mulai dari sini adalah pokok bahasan hari ini."],
      ["「時間」は、一見誰にとっても平等に流れているように思えます。", "\"Jikan\" wa, ikken dare ni totte mo byoudou ni nagarete iru you ni omoemasu.", "\"Waktu\" sekilas tampak mengalir sama rata bagi siapa pun."],
      ["しかし、自由に使える時間は、収入や立場によって大きく異なります。", "Shikashi, jiyuu ni tsukaeru jikan wa, shuunyuu ya tachiba ni yotte ookiku kotonarimasu.", "Namun, waktu yang bisa dipakai bebas sangat berbeda menurut penghasilan dan posisi."],
      ["裏を返せば、時間の格差は、社会の格差を映す鏡なのです。", "Ura o kaeseba, jikan no kakusa wa, shakai no kakusa o utsusu kagami na no desu.", "Jika dibalik, kesenjangan waktu adalah cermin yang memantulkan kesenjangan sosial.", ["Tesis dosen dalam kuliah itu adalah...", "kesenjangan waktu mencerminkan kesenjangan sosial", "waktu mengalir sama bagi semua", "orang kaya punya lebih sedikit waktu", "waktu tidak bisa diukur"]],
    ],
  ],
  // 2. Wawancara ahli
  [
    [
      ["条件付きで", "Joukentsuki de", "dengan syarat"],
      ["一概には言えない", "Ichigai ni wa ienai", "tidak bisa disamaratakan"],
      ["見方によっては", "Mikata ni yotte wa", "tergantung cara pandang"],
      ["私の見るところ", "Watashi no miru tokoro", "menurut pengamatan saya", ["Ahli sering memberi jawaban bersyarat karena...", "masalahnya kompleks dan tergantung kondisi", "tidak tahu sama sekali", "tidak mau menjawab", "ingin cepat selesai"]],
    ],
    [
      ["在宅勤務で生産性は上がるのか、という質問ですね。", "Zaitaku kinmu de seisansei wa agaru no ka, to iu shitsumon desu ne.", "Pertanyaannya apakah produktivitas naik dengan kerja dari rumah, ya."],
      ["それは職種によるので、一概には言えません。", "Sore wa shokushu ni yoru node, ichigai ni wa iemasen.", "Itu tergantung jenis pekerjaan, jadi tidak bisa disamaratakan."],
      ["集中を要する作業なら、条件付きで効果があると言えるでしょう。", "Shuuchuu o yousuru sagyou nara, joukentsuki de kouka ga aru to ieru deshou.", "Untuk pekerjaan yang membutuhkan konsentrasi, bisa dikatakan berefek dengan syarat tertentu."],
      ["ただ、私の見るところ、若手の育成には課題が残ります。", "Tada, watashi no miru tokoro, wakate no ikusei ni wa kadai ga nokorimasu.", "Hanya saja, menurut pengamatan saya, pembinaan karyawan muda masih menyisakan masalah.", ["Kekhawatiran ahli tentang kerja dari rumah adalah...", "pembinaan karyawan muda", "biaya listrik", "jam kerja terlalu pendek", "kesehatan mata"]],
    ],
  ],
  // 3. Debat kebijakan
  [
    [
      ["お言葉ですが", "Okotoba desu ga", "maaf (sebelum membantah)"],
      ["論点のすり替え", "Ronten no surikae", "pengalihan pokok masalah"],
      ["根拠をお示しください", "Konkyo o oshimeshi kudasai", "mohon tunjukkan dasarnya"],
      ["現実的ではない", "Genjitsuteki de wa nai", "tidak realistis", ["Ungkapan お言葉ですが biasanya dipakai sebelum...", "membantah dengan sopan", "berterima kasih", "memperkenalkan diri", "menutup acara"]],
    ],
    [
      ["消費税の引き上げは、社会保障を維持するために避けられません。", "Shouhizei no hikiage wa, shakai hoshou o iji suru tame ni sakeraremasen.", "Kenaikan pajak konsumsi tidak bisa dihindari demi mempertahankan jaminan sosial."],
      ["お言葉ですが、まず無駄な支出の削減が先ではありませんか。", "Okotoba desu ga, mazu muda na shishutsu no sakugen ga saki de wa arimasen ka.", "Maaf, bukankah pemangkasan pengeluaran yang sia-sia harus lebih dulu?", ["Posisi pembicara kedua adalah...", "pemangkasan pengeluaran sia-sia harus lebih dulu", "setuju kenaikan pajak segera", "jaminan sosial harus dihapus", "pajak harus diturunkan sekarang juga"]],
      ["削減だけで財源が賄えるという根拠をお示しください。", "Sakugen dake de zaigen ga makanaeru to iu konkyo o oshimeshi kudasai.", "Mohon tunjukkan dasar bahwa sumber dana bisa dicukupi hanya dengan pemangkasan."],
      ["増税ありきの議論こそ、現実的ではないと思います。", "Zouzei ariki no giron koso, genjitsuteki de wa nai to omoimasu.", "Justru diskusi yang berangkat dari kenaikan pajak itulah yang menurut saya tidak realistis."],
    ],
  ],
  // 4. Sikap tersirat
  [
    [
      ["一応", "Ichiou", "untuk sementara / sekadarnya"],
      ["それなりに", "Sorenari ni", "lumayan (sesuai kadarnya)"],
      ["いかにも", "Ikanimo", "benar-benar khas / tampak sekali"],
      ["悪くはない", "Waruku wa nai", "tidak buruk (tapi tidak istimewa)", ["Ungkapan 悪くはない biasanya menyiratkan penilaian...", "biasa saja, tidak istimewa", "sangat bagus", "sangat buruk", "tidak berpendapat"]],
    ],
    [
      ["新しいデザイン案、一応全部見ましたよ。", "Atarashii dezain an, ichiou zenbu mimashita yo.", "Usulan desain barunya, ya, sudah saya lihat semuanya sekadarnya."],
      ["色使いは悪くはないんですけどね。", "Irozukai wa waruku wa nai n desu kedo ne.", "Penggunaan warnanya sih tidak buruk."],
      ["いかにも流行を追いかけましたという感じがします。", "Ikanimo ryuukou o oikakemashita to iu kanji ga shimasu.", "Terasa sekali seperti sekadar mengejar tren."],
      ["もう一度、ターゲットから考え直してもらえますか。", "Mou ichido, taagetto kara kangaenaoshite moraemasu ka.", "Bisakah dipikirkan ulang sekali lagi mulai dari targetnya?", ["Sikap tersirat pembicara terhadap desain itu adalah...", "kurang puas dan meminta revisi", "sangat puas", "tidak peduli", "ingin segera dipakai"]],
    ],
  ],
  // 5. Komentar media
  [
    [
      ["事実として", "Jijitsu to shite", "faktanya"],
      ["私の見立てでは", "Watashi no mitate de wa", "menurut penilaian saya"],
      ["焦点になる", "Shouten ni naru", "menjadi fokus"],
      ["予断を許さない", "Yodan o yurusanai", "belum bisa diprediksi", ["Komentator yang baik memisahkan...", "fakta dan tafsiran", "berita dan iklan", "pagi dan malam", "teks dan gambar"]],
    ],
    [
      ["事実として、今年の出生数は初めて七十万人を下回りました。", "Jijitsu to shite, kotoshi no shusshousuu wa hajimete nanajuuman-nin o shitamawarimashita.", "Faktanya, jumlah kelahiran tahun ini untuk pertama kalinya di bawah tujuh ratus ribu."],
      ["私の見立てでは、若い世代の経済的な不安が大きいと思います。", "Watashi no mitate de wa, wakai sedai no keizaiteki na fuan ga ookii to omoimasu.", "Menurut penilaian saya, kecemasan ekonomi generasi muda besar.", ["Bagian mana yang merupakan tafsiran komentator?", "kecemasan ekonomi generasi muda besar", "kelahiran di bawah 700 ribu", "data tahun ini", "angka resmi pemerintah"]],
      ["政府の新たな支援策が、どこまで効果を上げるかが焦点になります。", "Seifu no arata na shiensaku ga, doko made kouka o ageru ka ga shouten ni narimasu.", "Fokusnya adalah sejauh mana langkah dukungan baru pemerintah membuahkan hasil."],
      ["ただ、状況は依然として予断を許しません。", "Tada, joukyou wa izen to shite yodan o yurushimasen.", "Hanya saja, situasinya masih belum bisa diprediksi."],
    ],
  ],
  // 6. Diskusi cepat
  [
    [
      ["ちょっと待って", "Chotto matte", "tunggu sebentar"],
      ["差し替える", "Sashikaeru", "mengganti (dengan versi lain)"],
      ["ということで", "To iu koto de", "jadi begitu ya (kesimpulan)"],
      ["要は", "You wa", "intinya", ["Dalam diskusi cepat, yang paling penting ditangkap adalah...", "kesimpulan akhirnya", "setiap kata pengisi", "nama semua orang", "jumlah sela"]],
    ],
    [
      ["要は、予算内に収まるかどうかでしょ？", "You wa, yosannai ni osamaru ka dou ka desho?", "Intinya, apakah muat dalam anggaran atau tidak, kan?"],
      ["いや、それだけじゃなくて、納期も厳しいんだよ。", "Iya, sore dake ja nakute, nouki mo kibishii n da yo.", "Bukan, bukan cuma itu, tenggatnya juga ketat."],
      ["じゃあ、外注するしかないか。", "Jaa, gaichuu suru shika nai ka.", "Kalau begitu, terpaksa dialihdayakan, ya."],
      ["うん、見積もりを三社から取るということで。", "Un, mitsumori o sansha kara toru to iu koto de.", "Ya, jadi kita minta penawaran harga dari tiga perusahaan.", ["Kesimpulan diskusi itu adalah...", "meminta penawaran harga dari tiga perusahaan", "membatalkan proyek", "menambah anggaran", "memperpanjang tenggat"]],
    ],
  ],
  // 7. Diskusi sastra
  [
    [
      ["暗示している", "Anji shite iru", "mengisyaratkan"],
      ["読み継がれる", "Yomitsugareru", "terus dibaca turun-temurun"],
      ["時代背景", "Jidai haikei", "latar zaman"],
      ["作者の分身", "Sakusha no bunshin", "cerminan diri pengarang", ["Diskusi sastra biasanya membahas...", "tafsiran, simbol, dan latar penulis", "harga buku", "jumlah halaman", "jenis kertas"]],
    ],
    [
      ["太宰治の作品を読むには、戦後の時代背景を知る必要があります。", "Dazai Osamu no sakuhin o yomu ni wa, sengo no jidai haikei o shiru hitsuyou ga arimasu.", "Untuk membaca karya Dazai Osamu, perlu mengetahui latar zaman pascaperang."],
      ["主人公は、作者の分身と見ることもできるでしょう。", "Shujinkou wa, sakusha no bunshin to miru koto mo dekiru deshou.", "Tokoh utamanya bisa juga dilihat sebagai cerminan diri pengarang."],
      ["題名の「斜陽」は、没落していく貴族を暗示しています。", "Daimei no \"Shayou\" wa, botsuraku shite iku kizoku o anji shite imasu.", "Judul \"Shayo\" (matahari terbenam) mengisyaratkan bangsawan yang semakin merosot.", ["Menurut diskusi, judul 'Shayo' mengisyaratkan...", "bangsawan yang merosot", "pemandangan matahari indah", "awal yang baru", "musim panas"]],
      ["絶望の中にも生きる力を描いた点が、今も読み継がれる理由です。", "Zetsubou no naka ni mo ikiru chikara o egaita ten ga, ima mo yomitsugareru riyuu desu.", "Penggambaran daya hidup di tengah keputusasaan adalah alasan karya itu masih terus dibaca."],
    ],
  ],
  // 8. Tanya jawab konferensi
  [
    [
      ["申し上げられません", "Moushiageraremasen", "tidak bisa kami sampaikan"],
      ["お答えは差し控えます", "Okotae wa sashihikaemasu", "kami menahan diri untuk menjawab"],
      ["現時点では", "Genjiten de wa", "saat ini"],
      ["質問をはぐらかす", "Shitsumon o hagurakasu", "mengelak dari pertanyaan", ["Saat mendengar tanya jawab, perhatikan apakah penjawab...", "menjawab langsung atau mengelak", "berbicara cepat", "memakai jas", "tersenyum"]],
    ],
    [
      ["新製品の価格はいくらになる見込みでしょうか。", "Shinseihin no kakaku wa ikura ni naru mikomi deshou ka.", "Kira-kira berapa harga produk barunya?"],
      ["価格については、現時点ではお答えは差し控えます。", "Kakaku ni tsuite wa, genjiten de wa okotae wa sashihikaemasu.", "Mengenai harga, saat ini kami menahan diri untuk menjawab.", ["Bagaimana penjawab merespons pertanyaan harga?", "tidak menjawab untuk saat ini", "menyebutkan harga pasti", "mengatakan gratis", "mengatakan sangat mahal"]],
      ["ただ、従来品と大きく変わらない水準を考えております。", "Tada, juuraihin to ookiku kawaranai suijun o kangaete orimasu.", "Hanya saja, kami memikirkan tingkat yang tidak jauh berbeda dari produk sebelumnya."],
      ["発売日も含め、詳細は来月の発表会でお知らせします。", "Hatsubaibi mo fukume, shousai wa raigetsu no happyoukai de oshirase shimasu.", "Rinciannya, termasuk tanggal rilis, akan diumumkan pada acara peluncuran bulan depan."],
    ],
  ],
  // 9. Negosiasi bisnis
  [
    [
      ["魅力的なご提案ですが", "Miryokuteki na goteian desu ga", "tawarannya menarik, tetapi"],
      ["短縮することは可能でしょうか", "Tanshuku suru koto wa kanou deshou ka", "apakah mungkin dipersingkat?"],
      ["その代わり", "Sono kawari", "sebagai gantinya"],
      ["最大限努力します", "Saidaigen doryoku shimasu", "akan berusaha semaksimal mungkin", ["Dalam negosiasi, ungkapan その代わり biasanya memperkenalkan...", "syarat balasan", "salam penutup", "permintaan maaf", "perkenalan diri"]],
    ],
    [
      ["単価を五パーセント下げていただけないでしょうか。", "Tanka o go paasento sagete itadakenai deshou ka.", "Bisakah harga satuannya diturunkan lima persen?"],
      ["検討いたしますが、その代わり発注量を増やしていただけますか。", "Kentou itashimasu ga, sono kawari hacchuuryou o fuyashite itadakemasu ka.", "Akan kami pertimbangkan, tetapi sebagai gantinya bisakah jumlah pesanan ditambah?", ["Syarat balasan yang diajukan penjual adalah...", "jumlah pesanan ditambah", "pembayaran tunai", "kontrak lebih pendek", "pengiriman dipercepat"]],
      ["年間で二割増やすことなら、可能だと思います。", "Nenkan de niwari fuyasu koto nara, kanou da to omoimasu.", "Kalau menambah dua puluh persen per tahun, saya kira memungkinkan."],
      ["それでしたら、三パーセントの値下げで最大限努力します。", "Sore deshitara, san paasento no nesage de saidaigen doryoku shimasu.", "Kalau begitu, kami akan berusaha semaksimal mungkin dengan potongan harga tiga persen."],
    ],
  ],
  // 10. Panel etika
  [
    [
      ["本人の意思", "Honnin no ishi", "kehendak yang bersangkutan"],
      ["尊重すべき", "Sonchou subeki", "harus dihormati"],
      ["社会全体の利益", "Shakai zentai no rieki", "kepentingan seluruh masyarakat"],
      ["板挟み", "Itabasami", "terjepit di antara dua pihak", ["Saat mendengar panel etika, yang perlu dicatat adalah...", "nilai yang dibela setiap panelis", "pakaian panelis", "durasi acara", "nama moderator saja"]],
    ],
    [
      ["監視カメラの増設は、犯罪の抑止に役立ちます。", "Kanshi kamera no zousetsu wa, hanzai no yokushi ni yakudachimasu.", "Penambahan kamera pengawas berguna untuk mencegah kejahatan."],
      ["しかし、個人のプライバシーも尊重すべきではないでしょうか。", "Shikashi, kojin no puraibashii mo sonchou subeki de wa nai deshou ka.", "Namun, bukankah privasi individu juga harus dihormati?", ["Nilai yang dibela panelis kedua adalah...", "privasi individu", "pencegahan kejahatan", "efisiensi biaya", "kecepatan polisi"]],
      ["安全とプライバシーの板挟みになっているのが現状です。", "Anzen to puraibashii no itabasami ni natte iru no ga genjou desu.", "Kenyataannya, kita terjepit di antara keamanan dan privasi."],
      ["映像の利用目的を法律で限定することが、一つの解決策でしょう。", "Eizou no riyou mokuteki o houritsu de gentei suru koto ga, hitotsu no kaiketsusaku deshou.", "Membatasi tujuan penggunaan rekaman dengan undang-undang mungkin menjadi salah satu solusi."],
    ],
  ],
  // 11. Sidang penelitian
  [
    [
      ["若干の疑問", "Jakkan no gimon", "sedikit keraguan"],
      ["論文中で明記する", "Ronbunchuu de meiki suru", "mencantumkan dengan jelas dalam tesis"],
      ["サンプルの偏り", "Sanpuru no katayori", "bias sampel"],
      ["再現性", "Saigensei", "keterulangan (hasil penelitian)", ["Dalam sidang penelitian, istilah 再現性 berarti...", "hasil bisa diulang dengan cara yang sama", "jumlah halaman", "orisinalitas judul", "kecepatan menulis"]],
    ],
    [
      ["調査対象が大学生のみというのは、サンプルの偏りではありませんか。", "Chousa taishou ga daigakusei nomi to iu no wa, sanpuru no katayori de wa arimasen ka.", "Subjek survei yang hanya mahasiswa, bukankah itu bias sampel?", ["Kritik penguji terhadap penelitian itu adalah...", "subjeknya hanya mahasiswa (bias sampel)", "terlalu banyak subjek", "judulnya terlalu panjang", "datanya terlalu baru"]],
      ["ご指摘の通りですので、結論の一般化には慎重であるべきだと考えております。", "Goshiteki no toori desu node, ketsuron no ippanka ni wa shinchou de aru beki da to kangaete orimasu.", "Karena benar seperti yang Anda tunjukkan, saya berpendapat harus berhati-hati dalam menggeneralisasi kesimpulan."],
      ["実験の再現性については、どのように確認しましたか。", "Jikken no saigensei ni tsuite wa, dono you ni kakunin shimashita ka.", "Bagaimana Anda memastikan keterulangan eksperimennya?"],
      ["別の時期に同じ条件で二回実施し、同様の結果を得ました。", "Betsu no jiki ni onaji jouken de nikai jisshi shi, douyou no kekka o emashita.", "Kami melaksanakannya dua kali dengan kondisi yang sama pada waktu berbeda dan memperoleh hasil serupa."],
    ],
  ],
  // 12. Isyarat retoris
  [
    [
      ["果たして", "Hatashite", "benarkah / apakah memang"],
      ["かつてないほど", "Katsute nai hodo", "lebih dari sebelumnya"],
      ["それなのに", "Sore na noni", "namun / padahal begitu"],
      ["言うまでもなく", "Iu made mo naku", "tak perlu dikatakan", ["Pertanyaan retoris dalam pidato bertujuan...", "membuat pendengar berpikir", "meminta jawaban langsung", "menunjukkan pembicara tidak tahu", "mengakhiri pidato"]],
    ],
    [
      ["果たして、便利さは私たちを自由にしたのでしょうか。", "Hatashite, benrisa wa watashitachi o jiyuu ni shita no deshou ka.", "Benarkah kenyamanan telah membuat kita bebas?"],
      ["私たちは、かつてないほど速く情報を手に入れられるようになりました。", "Watashitachi wa, katsute nai hodo hayaku jouhou o te ni irerareru you ni narimashita.", "Kita bisa memperoleh informasi lebih cepat dari sebelumnya."],
      ["それなのに、考える時間はむしろ減っているのです。", "Sore na noni, kangaeru jikan wa mushiro hette iru no desu.", "Namun, waktu untuk berpikir justru berkurang."],
      ["速さではなく、深さを取り戻す時が来ているのではないでしょうか。", "Hayasa de wa naku, fukasa o torimodosu toki ga kite iru no de wa nai deshou ka.", "Bukankah sudah tiba saatnya merebut kembali kedalaman, bukan kecepatan?", ["Pesan utama pidato itu adalah...", "merebut kembali kedalaman berpikir", "mempercepat informasi", "meninggalkan teknologi sepenuhnya", "mengurangi waktu tidur"]],
    ],
  ],
  // 13. Nuansa sindiran
  [
    [
      ["ご立派ですね", "Gorippa desu ne", "hebat sekali (bisa sindiran)"],
      ["お気楽でいいですね", "Okiraku de ii desu ne", "enak ya santai sekali (sindiran)"],
      ["さすがですね", "Sasuga desu ne", "memang hebat ya (bisa sindiran)"],
      ["それはそれは", "Sore wa sore wa", "wah wah (bisa sindiran)", ["Sindiran dalam bahasa Jepang sering ditandai dengan...", "pujian berlebihan dengan nada datar", "kata-kata kasar langsung", "teriakan", "bahasa asing"]],
    ],
    [
      ["締め切り当日に休暇ですか。お気楽でいいですね。", "Shimekiri toujitsu ni kyuuka desu ka. Okiraku de ii desu ne.", "Cuti tepat di hari tenggat? Enak ya, santai sekali.", ["Maksud sebenarnya pembicara adalah...", "menyindir orang itu tidak bertanggung jawab", "iri ingin cuti juga", "memuji ketenangannya", "menawarkan bantuan"]],
      ["また書類をなくしたんですか。それはそれは。", "Mata shorui o nakushita n desu ka. Sore wa sore wa.", "Kehilangan dokumen lagi? Wah wah."],
      ["一度も会議に出ずに企画が通るなんて、さすがですね。", "Ichido mo kaigi ni dezu ni kikaku ga tooru nante, sasuga desu ne.", "Proposal lolos tanpa sekali pun ikut rapat, memang hebat, ya."],
      ["人の手柄を自分のものにするのが、本当にお上手ですね。", "Hito no tegara o jibun no mono ni suru no ga, hontou ni ojouzu desu ne.", "Anda benar-benar pandai menjadikan jasa orang lain milik sendiri, ya."],
    ],
  ],
  // 14. Pergeseran register
  [
    [
      ["お越しいただき", "Okoshi itadaki", "telah berkenan datang"],
      ["久しぶり", "Hisashiburi", "lama tak jumpa"],
      ["お約束と違います", "Oyakusoku to chigaimasu", "berbeda dari yang dijanjikan"],
      ["いい加減にして", "Iikagen ni shite", "sudah cukup!", ["Perubahan dari keigo ke bahasa santai secara tiba-tiba bisa menandakan...", "kedekatan atau emosi yang memuncak", "pembicara lupa keigo", "pembicara sedang bercanda selalu", "tidak ada artinya"]],
    ],
    [
      ["申し訳ございませんが、ご予約のお時間を過ぎております。", "Moushiwake gozaimasen ga, goyoyaku no ojikan o sugite orimasu.", "Mohon maaf, waktu reservasi Anda sudah lewat."],
      ["え、佐藤じゃん！こんなところで何してるの？", "E, Satou jan! Konna tokoro de nani shiteru no?", "Eh, Sato, kan! Ngapain di tempat seperti ini?", ["Perubahan register di kalimat itu menandakan...", "pembicara bertemu teman akrab", "pembicara marah", "pembicara melayani pelanggan", "pembicara berpidato"]],
      ["お客様、それはさすがにお受けいたしかねます。", "Okyakusama, sore wa sasuga ni ouke itashikanemasu.", "Bapak/Ibu, permintaan itu benar-benar tidak dapat kami terima."],
      ["もう、何回同じこと言わせるつもり？", "Mou, nankai onaji koto iwaseru tsumori?", "Ah, mau berapa kali kamu membuatku mengatakan hal yang sama?"],
    ],
  ],
  // 15. Pengumuman kompleks
  [
    [
      ["に限り", "Ni kagiri", "hanya untuk / khusus"],
      ["払い戻し", "Haraimodoshi", "pengembalian dana"],
      ["なお", "Nao", "sebagai tambahan"],
      ["対象外", "Taishougai", "tidak termasuk / di luar cakupan", ["Saat mendengar pengumuman berisi banyak syarat, sebaiknya kamu...", "mencatat per poin, termasuk pengecualian", "hanya mendengar kalimat pertama", "menunggu akhir saja", "mengabaikan kata ただし"]],
    ],
    [
      ["強風のため、本日の午後の便はすべて欠航となります。", "Kyoufuu no tame, honjitsu no gogo no bin wa subete kekkou to narimasu.", "Karena angin kencang, semua penerbangan siang hari ini dibatalkan."],
      ["振り替えは、明日の同じ時間帯の便に限り無料で承ります。", "Furikae wa, ashita no onaji jikantai no bin ni kagiri muryou de uketamawarimasu.", "Penggantian jadwal dilayani gratis khusus untuk penerbangan di jam yang sama besok.", ["Penggantian jadwal gratis berlaku untuk...", "penerbangan jam yang sama besok", "penerbangan apa saja minggu ini", "penerbangan malam ini", "penerbangan internasional saja"]],
      ["ただし、割引運賃のチケットは対象外となります。", "Tadashi, waribiki unchin no chiketto wa taishougai to narimasu.", "Namun, tiket tarif diskon tidak termasuk."],
      ["なお、宿泊が必要な方には、ホテルのご案内をいたします。", "Nao, shukuhaku ga hitsuyou na kata ni wa, hoteru no goannai o itashimasu.", "Sebagai tambahan, bagi yang memerlukan penginapan, kami akan memberikan informasi hotel."],
    ],
  ],
  // 16. Percakapan penutur asli
  [
    [
      ["っていうかさ", "Tte iu ka sa", "eh ngomong-ngomong"],
      ["みたいな", "Mitai na", "gitu deh"],
      ["うそでしょ", "Uso desho", "masa sih"],
      ["そっかあ", "Sokkaa", "oh begitu ya", ["Percakapan santai penutur asli sering ditandai dengan...", "ellipsis dan ungkapan setengah", "keigo lengkap", "kalimat sangat panjang dan rapi", "istilah teknis"]],
    ],
    [
      ["っていうかさ、来週の飲み会、中止になったらしいよ。", "Tte iu ka sa, raishuu no nomikai, chuushi ni natta rashii yo.", "Eh ngomong-ngomong, acara minum minggu depan katanya batal."],
      ["うそでしょ、楽しみにしてたのに。", "Uso desho, tanoshimi ni shiteta noni.", "Masa sih, padahal aku menantikannya."],
      ["なんか、幹事が急に出張になった、みたいな。", "Nanka, kanji ga kyuu ni shucchou ni natta, mitai na.", "Katanya sih penanggung jawab acaranya mendadak dinas luar, gitu.", ["Mengapa acara minum dibatalkan?", "penanggung jawabnya mendadak dinas luar", "tempatnya tutup", "peserta sedikit", "hujan deras"]],
      ["そっかあ、じゃあ私たちだけで行っちゃう？", "Sokkaa, jaa watashitachi dake de icchau?", "Oh begitu ya, kalau gitu kita pergi berdua saja?"],
    ],
  ],
  // 17. Struktur argumen
  [
    [
      ["私は〜と考えます", "Watashi wa ~ to kangaemasu", "saya berpendapat ..."],
      ["なぜなら", "Nazenara", "karena"],
      ["もちろん〜という反論もある", "Mochiron ~ to iu hanron mo aru", "tentu ada juga sanggahan bahwa ..."],
      ["以上のことから", "Ijou no koto kara", "dari hal-hal di atas", ["Struktur argumen yang lengkap adalah...", "klaim → dasar → contoh → sanggahan → kesimpulan", "contoh → selesai", "kesimpulan saja", "sanggahan → salam"]],
    ],
    [
      ["私は、公共交通機関を無料にすべきだと考えます。", "Watashi wa, koukyou koutsuu kikan o muryou ni subeki da to kangaemasu.", "Saya berpendapat transportasi umum seharusnya digratiskan."],
      ["なぜなら、車の利用が減り、渋滞と排気ガスが大幅に減るからです。", "Nazenara, kuruma no riyou ga heri, juutai to haiki gasu ga oohaba ni heru kara desu.", "Karena penggunaan mobil berkurang, sehingga kemacetan dan gas buang berkurang drastis.", ["Dasar argumen pembicara adalah...", "kemacetan dan gas buang berkurang", "tiket terlalu mahal", "kereta terlalu lambat", "supir kurang"]],
      ["もちろん、財源をどうするのかという反論もあるでしょう。", "Mochiron, zaigen o dou suru no ka to iu hanron mo aru deshou.", "Tentu ada juga sanggahan tentang bagaimana sumber dananya."],
      ["以上のことから、まずは一部の路線で試験的に導入すべきです。", "Ijou no koto kara, mazu wa ichibu no rosen de shikenteki ni dounyuu subeki desu.", "Dari hal-hal di atas, sebaiknya diterapkan secara uji coba di sebagian jalur lebih dulu."],
    ],
  ],
  // 18. Maksud pembicara
  [
    [
      ["前向きに検討します", "Maemuki ni kentou shimasu", "akan dipertimbangkan secara positif"],
      ["見送らせていただく", "Miokurasete itadaku", "kami memutuskan tidak melanjutkan"],
      ["鑑みますと", "Kangamimasu to", "mengingat / menimbang"],
      ["また機会がございましたら", "Mata kikai ga gozaimashitara", "jika ada kesempatan lain", ["Dalam bisnis Jepang, 検討します kadang bisa berarti...", "penolakan halus", "persetujuan pasti", "permintaan maaf", "perintah"]],
    ],
    [
      ["ご提案、大変興味深く拝見しました。", "Goteian, taihen kyoumibukaku haiken shimashita.", "Kami melihat usulan Anda dengan sangat tertarik."],
      ["ただ、今期の予算を鑑みますと、なかなか難しいところがありまして。", "Tada, konki no yosan o kangamimasu to, nakanaka muzukashii tokoro ga arimashite.", "Hanya saja, mengingat anggaran periode ini, ada bagian yang cukup sulit."],
      ["来期以降、改めて前向きに検討させていただければと思います。", "Raiki ikou, aratamete maemuki ni kentou sasete itadakereba to omoimasu.", "Kami berharap bisa mempertimbangkannya kembali secara positif mulai periode depan.", ["Maksud sebenarnya pembicara kemungkinan besar adalah...", "menolak secara halus untuk saat ini", "langsung setuju", "meminta harga lebih tinggi", "ingin bertemu besok"]],
      ["また機会がございましたら、ぜひお声がけください。", "Mata kikai ga gozaimashitara, zehi okoegake kudasai.", "Jika ada kesempatan lain, silakan hubungi kami."],
    ],
  ],
  // 19. Sintesis panjang
  [
    [
      ["に注目する", "Ni chuumoku suru", "menyoroti"],
      ["最大の要因に挙げる", "Saidai no youin ni ageru", "menyebut sebagai faktor terbesar"],
      ["互いに絡み合う", "Tagai ni karamiau", "saling berkelindan"],
      ["多角的に捉える", "Takakuteki ni toraeru", "memahami dari berbagai sudut", ["Sintesis panjang bertujuan untuk...", "merangkum beberapa sudut pandang menjadi satu kesimpulan", "memilih satu pendapat terbaik", "mengulang semua pendapat", "menghindari kesimpulan"]],
    ],
    [
      ["医師は、睡眠不足の原因をスマートフォンの使用に求めます。", "Ishi wa, suimin busoku no genin o sumaatofon no shiyou ni motomemasu.", "Dokter mencari penyebab kurang tidur pada penggunaan ponsel pintar."],
      ["一方、労働の専門家は、長時間労働を最大の要因に挙げています。", "Ippou, roudou no senmonka wa, choujikan roudou o saidai no youin ni agete imasu.", "Sementara itu, pakar ketenagakerjaan menyebut jam kerja panjang sebagai faktor terbesar."],
      ["教育学者は、幼い頃からの生活習慣に注目しています。", "Kyouikugakusha wa, osanai koro kara no seikatsu shuukan ni chuumoku shite imasu.", "Ahli pendidikan menyoroti kebiasaan hidup sejak kecil."],
      ["睡眠の問題は、多角的に捉えなければ解決できないということです。", "Suimin no mondai wa, takakuteki ni toraenakereba kaiketsu dekinai to iu koto desu.", "Artinya, masalah tidur tidak bisa diselesaikan tanpa memahaminya dari berbagai sudut.", ["Kesimpulan sintesis tentang masalah tidur adalah...", "harus dipahami dari berbagai sudut", "penyebabnya hanya ponsel", "penyebabnya hanya jam kerja", "tidak ada solusi"]],
    ],
  ],
  // 20. Ulasan listening N1
  [
    [
      ["避けて通れない", "Sakete toorenai", "tidak bisa dihindari"],
      ["かといって", "Ka to itte", "meski begitu"],
      ["糸口になる", "Itoguchi ni naru", "menjadi titik terang"],
      ["世代間の公平性", "Sedaikan no kouheisei", "keadilan antargenerasi", ["Ungkapan かといって biasanya memperkenalkan...", "batasan atau pertimbangan sebaliknya", "contoh tambahan", "kesimpulan akhir", "salam"]],
    ],
    [
      ["空き家問題は、人口減少社会において避けて通れない課題です。", "Akiya mondai wa, jinkou genshou shakai ni oite sakete toorenai kadai desu.", "Masalah rumah kosong adalah tantangan yang tak bisa dihindari dalam masyarakat dengan penduduk menurun."],
      ["放置すれば、景観の悪化や犯罪の温床になりかねません。", "Houchi sureba, keikan no akka ya hanzai no onshou ni narikanemasen.", "Jika dibiarkan, bisa saja menjadi perusakan pemandangan atau sarang kejahatan."],
      ["かといって、所有者の同意なく取り壊すことはできません。", "Ka to itte, shoyuusha no doui naku torikowasu koto wa dekimasen.", "Meski begitu, tidak bisa dibongkar tanpa persetujuan pemiliknya.", ["Batasan yang disebutkan dalam kalimat itu adalah...", "tidak bisa dibongkar tanpa persetujuan pemilik", "tidak ada rumah kosong", "pemerintah tidak peduli", "biaya pembongkaran gratis"]],
      ["空き家を地域の交流拠点として活用する試みが、一つの糸口になるでしょう。", "Akiya o chiiki no kouryuu kyoten to shite katsuyou suru kokoromi ga, hitotsu no itoguchi ni naru deshou.", "Upaya memanfaatkan rumah kosong sebagai pusat interaksi warga mungkin menjadi salah satu titik terang."],
    ],
  ],
];
