import type { JapaneseQuizTopic } from '../types';

// Latihan Listening N2 — one entry per topic (index = topic - 1): [Basic, Advanced].
export const listening: JapaneseQuizTopic[] = [
  // 1. Berita cepat
  [
    [
      ["方針を固める", "Houshin o katameru", "memantapkan kebijakan"],
      ["見通し", "Mitooshi", "perkiraan / prospek"],
      ["とみられる", "To mirareru", "diperkirakan"],
      ["声が上がる", "Koe ga agaru", "muncul suara (pendapat)", ["Dalam berita cepat, yang perlu ditangkap terutama adalah...", "subjek, angka, dan kata kerja akhir", "nama penyiar", "musik latar", "iklan"]],
    ],
    [
      ["政府は、来年度から高校の授業料を無償化する方針を固めました。", "Seifu wa, rainendo kara koukou no jugyouryou o mushouka suru houshin o katamemashita.", "Pemerintah memantapkan kebijakan menggratiskan biaya sekolah SMA mulai tahun fiskal depan.", ["Dari berita itu, kebijakan apa yang dimantapkan?", "menggratiskan biaya SMA", "menaikkan pajak", "menutup sekolah", "menambah jam pelajaran"]],
      ["対象となる世帯は全国で約百万世帯に上る見通しです。", "Taishou to naru setai wa zenkoku de yaku hyakuman setai ni noboru mitooshi desu.", "Rumah tangga sasaran diperkirakan mencapai sekitar satu juta di seluruh negeri."],
      ["財源の確保が課題になるとみられます。", "Zaigen no kakuho ga kadai ni naru to miraremasu.", "Penyediaan sumber dana diperkirakan menjadi tantangan."],
      ["地方自治体からは、歓迎の声が上がっています。", "Chihou jichitai kara wa, kangei no koe ga agatte imasu.", "Dari pemerintah daerah muncul suara yang menyambut baik."],
    ],
  ],
  // 2. Rapat bisnis
  [
    [
      ["ということでよろしいですね", "To iu koto de yoroshii desu ne", "jadi begitu, setuju ya?"],
      ["確認済み", "Kakuninzumi", "sudah dikonfirmasi"],
      ["担当", "Tantou", "penanggung jawab"],
      ["前倒し", "Maedaoshi", "dimajukan (jadwal)", ["Saat mendengarkan rapat, yang perlu dicatat adalah...", "keputusan, penanggung jawab, dan tenggat", "warna ruangan", "nama makanan", "cuaca"]],
    ],
    [
      ["では、新製品の発表は三月ということでよろしいですね。", "De wa, shinseihin no happyou wa sangatsu to iu koto de yoroshii desu ne.", "Jadi, peluncuran produk baru di bulan Maret, setuju ya?"],
      ["広告の準備は、山田さんに担当してもらいます。", "Koukoku no junbi wa, Yamada san ni tantou shite moraimasu.", "Persiapan iklan akan ditangani Yamada.", ["Dari rapat itu, siapa yang menangani persiapan iklan?", "Yamada", "Sato", "pembicara", "direktur"]],
      ["工場の生産スケジュールは確認済みです。", "Koujou no seisan sukejuuru wa kakuninzumi desu.", "Jadwal produksi pabrik sudah dikonfirmasi."],
      ["状況によっては、発表を前倒しする可能性もあります。", "Joukyou ni yotte wa, happyou o maedaoshi suru kanousei mo arimasu.", "Tergantung situasi, ada kemungkinan peluncuran dimajukan."],
    ],
  ],
  // 3. Inti kuliah
  [
    [
      ["今日お話ししたいのは", "Kyou ohanashi shitai no wa", "yang ingin saya bicarakan hari ini"],
      ["重要なのは", "Juuyou na no wa", "yang penting adalah"],
      ["という研究がある", "To iu kenkyuu ga aru", "ada penelitian yang menyatakan ..."],
      ["裏を返せば", "Ura o kaeseba", "sebaliknya / dengan kata lain", ["Dalam kuliah, tesis dosen biasanya ditandai dengan ungkapan...", "重要なのは / 今日お話ししたいのは", "えっと", "じゃあね", "いただきます"]],
    ],
    [
      ["今日お話ししたいのは、睡眠と記憶の関係です。", "Kyou ohanashi shitai no wa, suimin to kioku no kankei desu.", "Yang ingin saya bicarakan hari ini adalah hubungan tidur dan ingatan."],
      ["寝ている間に、脳は一日の情報を整理しています。", "Nete iru aida ni, nou wa ichinichi no jouhou o seiri shite imasu.", "Selama tidur, otak merapikan informasi sepanjang hari."],
      ["徹夜で覚えたことは忘れやすいという研究があります。", "Tetsuya de oboeta koto wa wasureyasui to iu kenkyuu ga arimasu.", "Ada penelitian bahwa yang dihafal sambil begadang mudah dilupakan."],
      ["重要なのは、学んだ後にしっかり眠ることなのです。", "Juuyou na no wa, mananda ato ni shikkari nemuru koto na no desu.", "Yang penting adalah tidur dengan cukup setelah belajar.", ["Tesis kuliah itu adalah...", "tidur cukup setelah belajar itu penting", "begadang membantu menghafal", "otak tidak bekerja saat tidur", "tidur tidak berhubungan dengan ingatan"]],
    ],
  ],
  // 4. Wawancara formal
  [
    [
      ["お聞かせください", "Okikase kudasai", "mohon ceritakan"],
      ["光栄に思う", "Kouei ni omou", "merasa terhormat"],
      ["所存です", "Shozon desu", "bertekad / berniat (formal)"],
      ["支えてくれた", "Sasaete kureta", "yang telah mendukung", ["Ungkapan 所存です dipakai untuk menyatakan...", "tekad atau niat secara formal", "keraguan", "permintaan maaf", "keluhan"]],
    ],
    [
      ["新しい監督に就任されて、今のお気持ちをお聞かせください。", "Atarashii kantoku ni shuunin sarete, ima no okimochi o okikase kudasai.", "Setelah menjabat sebagai pelatih baru, mohon ceritakan perasaan Anda sekarang."],
      ["身の引き締まる思いです。", "Mi no hikishimaru omoi desu.", "Saya merasa harus lebih bersungguh-sungguh."],
      ["選手一人一人と向き合っていきたいと考えております。", "Senshu hitori hitori to mukiatte ikitai to kangaete orimasu.", "Saya ingin menghadapi tiap pemain secara pribadi."],
      ["ファンの皆様の期待に応えられるよう、全力を尽くす所存です。", "Fan no minasama no kitai ni kotaerareru you, zenryoku o tsukusu shozon desu.", "Saya bertekad mengerahkan seluruh kemampuan agar bisa memenuhi harapan para penggemar.", ["Tekad narasumber adalah...", "memenuhi harapan penggemar", "pindah tim", "pensiun", "mengganti semua pemain"]],
    ],
  ],
  // 5. Diskusi kebijakan
  [
    [
      ["賛成の立場から", "Sansei no tachiba kara", "dari posisi setuju"],
      ["慎重な意見", "Shinchou na iken", "pendapat yang berhati-hati"],
      ["財源の確保", "Zaigen no kakuho", "penyediaan sumber dana"],
      ["対象を広げる", "Taishou o hirogeru", "memperluas cakupan", ["Dalam diskusi kebijakan, yang perlu diidentifikasi adalah...", "posisi pro dan kontra serta alasannya", "nama moderator saja", "durasi acara", "warna latar"]],
    ],
    [
      ["週休三日制の導入について、賛成の立場からご意見をお願いします。", "Shuukyuu mikka sei no dounyuu ni tsuite, sansei no tachiba kara goiken o onegaishimasu.", "Mengenai penerapan libur tiga hari seminggu, mohon pendapat dari posisi yang setuju."],
      ["休みが増えれば、仕事の効率も上がると考えます。", "Yasumi ga fuereba, shigoto no kouritsu mo agaru to kangaemasu.", "Saya berpendapat jika libur bertambah, efisiensi kerja juga naik."],
      ["一方で、給料が減るのではという慎重な意見もあります。", "Ippou de, kyuuryou ga heru no de wa to iu shinchou na iken mo arimasu.", "Di sisi lain, ada pendapat hati-hati bahwa gaji mungkin berkurang.", ["Pendapat yang berhati-hati dalam diskusi itu khawatir tentang...", "berkurangnya gaji", "bertambahnya libur", "naiknya efisiensi", "cuaca"]],
      ["まずは希望者を対象に試してみるべきだという声もあります。", "Mazu wa kibousha o taishou ni tameshite miru beki da to iu koe mo arimasu.", "Ada juga suara agar dicoba dulu bagi yang berminat."],
    ],
  ],
  // 6. Penjelasan data
  [
    [
      ["ピーク", "Piiku", "puncak"],
      ["横ばい", "Yokobai", "stagnan / mendatar"],
      ["再び", "Futatabi", "kembali / lagi"],
      ["を占める", "O shimeru", "mencakup / menduduki", ["Kamu mendengar \"yokobai\". Artinya datanya...", "stagnan", "naik tajam", "turun tajam", "hilang"]],
    ],
    [
      ["新車の販売台数は、五年前をピークに減り続けています。", "Shinsha no hanbai daisuu wa, gonen mae o piiku ni heritsuzukete imasu.", "Jumlah penjualan mobil baru terus menurun setelah puncaknya lima tahun lalu."],
      ["昨年は前の年とほぼ横ばいでした。", "Sakunen wa mae no toshi to hobo yokobai deshita.", "Tahun lalu nyaris stagnan dibanding tahun sebelumnya."],
      ["電気自動車の割合は、全体の二割を占めるまでになりました。", "Denki jidousha no wariai wa, zentai no niwari o shimeru made ni narimashita.", "Persentase mobil listrik sudah mencapai dua puluh persen dari keseluruhan.", ["Dari audio itu, mobil listrik mencakup...", "20% dari keseluruhan", "2% dari keseluruhan", "50% dari keseluruhan", "12% dari keseluruhan"]],
      ["今後は再び増加に転じると予測されています。", "Kongo wa futatabi zouka ni tenjiru to yosoku sarete imasu.", "Ke depannya diprediksi akan kembali berbalik naik."],
    ],
  ],
  // 7. Topik abstrak
  [
    [
      ["別の言い方をすると", "Betsu no iikata o suru to", "kalau dikatakan dengan cara lain"],
      ["だからこそ", "Dakara koso", "justru karena itu"],
      ["立ち止まる", "Tachidomaru", "berhenti sejenak"],
      ["という意味で", "To iu imi de", "dalam arti ..."],
    ],
    [
      ["自由というのは、何でも好きにすることではありません。", "Jiyuu to iu no wa, nan demo suki ni suru koto de wa arimasen.", "Kebebasan bukanlah melakukan apa saja sesuka hati."],
      ["言い換えれば、自分の選択に責任を持つことです。", "Iikaereba, jibun no sentaku ni sekinin o motsu koto desu.", "Dengan kata lain, bertanggung jawab atas pilihan sendiri.", ["Menurut pembicara, kebebasan berarti...", "bertanggung jawab atas pilihan sendiri", "melakukan apa saja sesuka hati", "tidak punya aturan", "hidup sendirian"]],
      ["ルールがあるからこそ、安心して自由に行動できるのです。", "Ruuru ga aru kara koso, anshin shite jiyuu ni koudou dekiru no desu.", "Justru karena ada aturan, kita bisa bertindak bebas dengan tenang."],
      ["その意味で、自由と責任は表裏一体だと言えます。", "Sono imi de, jiyuu to sekinin wa hyouri ittai da to iemasu.", "Dalam arti itu, kebebasan dan tanggung jawab bisa dikatakan dua sisi mata uang."],
    ],
  ],
  // 8. Pembicaraan pemangku kepentingan
  [
    [
      ["私どもとしては", "Watakushidomo to shite wa", "bagi pihak kami"],
      ["重視する", "Juushi suru", "mementingkan"],
      ["譲れない", "Yuzurenai", "tidak bisa ditawar"],
      ["つつ", "Tsutsu", "sambil (formal)", ["Kamu mendengar \"hinshitsu wa yuzuremasen\". Artinya...", "kualitas tidak bisa ditawar", "kualitas tidak penting", "harga bisa turun", "pengiriman ditunda"]],
    ],
    [
      ["私どもとしては、安全性を最も重視しております。", "Watakushidomo to shite wa, anzensei o mottomo juushi shite orimasu.", "Bagi pihak kami, keamanan adalah yang paling diutamakan."],
      ["コストを抑えつつ、安全基準を満たす方法を探りましょう。", "Kosuto o osaetsutsu, anzen kijun o mitasu houhou o sagurimashou.", "Mari mencari cara memenuhi standar keamanan sambil menekan biaya."],
      ["その条件でしたら、こちらも譲歩できると思います。", "Sono jouken deshitara, kochira mo jouho dekiru to omoimasu.", "Kalau dengan syarat itu, kami juga bisa mengalah."],
      ["では、次回までに具体的な数字をご用意いただけますか。", "De wa, jikai made ni gutaiteki na suuji o goyoui itadakemasu ka.", "Kalau begitu, bisakah Anda menyiapkan angka konkret sebelum pertemuan berikutnya?"],
    ],
  ],
  // 9. Nuansa pengumuman
  [
    [
      ["誠に勝手ながら", "Makoto ni katte nagara", "dengan segala hormat (permohonan maaf)"],
      ["臨時休業", "Rinji kyuugyou", "tutup sementara"],
      ["当面の間", "Toumen no aida", "untuk sementara waktu"],
      ["深くお詫び申し上げます", "Fukaku owabi moushiagemasu", "kami memohon maaf sedalam-dalamnya", ["Ungkapan 誠に勝手ながら biasanya mengawali...", "kabar kurang menyenangkan dari pihak penyelenggara", "promosi diskon", "ucapan selamat", "lelucon"]],
    ],
    [
      ["誠に勝手ながら、明日は設備点検のため休館とさせていただきます。", "Makoto ni katte nagara, ashita wa setsubi tenken no tame kyuukan to sasete itadakimasu.", "Dengan segala hormat, besok gedung tutup karena pemeriksaan fasilitas."],
      ["当面の間、一部のサービスを停止いたします。", "Toumen no aida, ichibu no saabisu o teishi itashimasu.", "Untuk sementara waktu, sebagian layanan dihentikan."],
      ["再開の時期につきましては、改めてお知らせいたします。", "Saikai no jiki ni tsukimashite wa, aratamete oshirase itashimasu.", "Mengenai waktu dibuka kembali, akan kami umumkan kemudian.", ["Menurut pengumuman, kapan layanan dibuka kembali?", "akan diumumkan kemudian", "besok", "minggu depan", "tidak akan dibuka lagi"]],
      ["ご不便をおかけし、深くお詫び申し上げます。", "Gofuben o okake shi, fukaku owabi moushiagemasu.", "Kami memohon maaf sedalam-dalamnya atas ketidaknyamanannya."],
    ],
  ],
  // 10. Debat
  [
    [
      ["しかしながら", "Shikashinagara", "namun demikian"],
      ["無理がある", "Muri ga aru", "dipaksakan / tidak masuk akal"],
      ["出典", "Shutten", "sumber (data)"],
      ["反論します", "Hanron shimasu", "saya membantah", ["Kamu mendengar \"sono shuchou ni wa muri ga arimasu\". Pembicara sedang...", "membantah klaim lawan", "setuju penuh", "bertanya jam", "berterima kasih"]],
    ],
    [
      ["小学校での英語教育は、早ければ早いほど効果があります。", "Shougakkou de no Eigo kyouiku wa, hayakereba hayai hodo kouka ga arimasu.", "Pendidikan bahasa Inggris di SD semakin dini semakin efektif."],
      ["しかしながら、母語の発達に影響する恐れもあります。", "Shikashinagara, bogo no hattatsu ni eikyou suru osore mo arimasu.", "Namun demikian, ada juga risiko memengaruhi perkembangan bahasa ibu."],
      ["その主張には根拠が不十分ではないでしょうか。", "Sono shuchou ni wa konkyo ga fujuubun de wa nai deshou ka.", "Bukankah dasar klaim itu belum memadai?"],
      ["では、その調査の出典を教えていただけますか。", "De wa, sono chousa no shutten o oshiete itadakemasu ka.", "Kalau begitu, bisakah Anda memberi tahu sumber survei itu?"],
    ],
  ],
  // 11. Tanya jawab
  [
    [
      ["ご質問の趣旨", "Goshitsumon no shushi", "maksud pertanyaan Anda"],
      ["内訳", "Uchiwake", "rincian"],
      ["につきましては", "Ni tsukimashite wa", "mengenai (sangat sopan)"],
      ["記載しております", "Kisai shite orimasu", "sudah tercantum", ["Kamu mendengar \"shiryou ni kisai shite orimasu\". Artinya...", "sudah tercantum di materi", "belum ditulis", "materi hilang", "akan dibuang"]],
    ],
    [
      ["ご質問の趣旨は、導入時期ということでよろしいでしょうか。", "Goshitsumon no shushi wa, dounyuu jiki to iu koto de yoroshii deshou ka.", "Maksud pertanyaan Anda mengenai waktu penerapan, betul?"],
      ["はい、特に地方での開始時期が知りたいです。", "Hai, toku ni chihou de no kaishi jiki ga shiritai desu.", "Ya, terutama saya ingin tahu waktu mulainya di daerah."],
      ["地方につきましては、来年の秋を予定しております。", "Chihou ni tsukimashite wa, rainen no aki o yotei shite orimasu.", "Mengenai daerah, direncanakan musim gugur tahun depan.", ["Dari jawaban itu, penerapan di daerah dimulai...", "musim gugur tahun depan", "bulan depan", "tahun ini", "belum direncanakan"]],
      ["スケジュールの詳細は、配布資料に記載しております。", "Sukejuuru no shousai wa, haifu shiryou ni kisai shite orimasu.", "Rincian jadwal sudah tercantum di materi yang dibagikan."],
    ],
  ],
  // 12. Penyelesaian keluhan
  [
    [
      ["この度は", "Kono tabi wa", "kali ini"],
      ["手違い", "Techigai", "kekeliruan"],
      ["判明する", "Hanmei suru", "terungkap / diketahui"],
      ["再発防止", "Saihatsu boushi", "pencegahan terulang", ["Urutan penyelesaian keluhan yang baik adalah...", "minta maaf → konfirmasi → solusi → pencegahan", "solusi → pamit", "pencegahan saja", "menyalahkan pelanggan"]],
    ],
    [
      ["この度は、請求金額の誤りでご迷惑をおかけしました。", "Kono tabi wa, seikyuu kingaku no ayamari de gomeiwaku o okake shimashita.", "Kali ini kami telah merepotkan Anda karena kesalahan jumlah tagihan."],
      ["確認したところ、システムの設定ミスが判明しました。", "Kakunin shita tokoro, shisutemu no settei misu ga hanmei shimashita.", "Setelah diperiksa, terungkap ada kesalahan pengaturan sistem."],
      ["差額は来月の請求から差し引かせていただきます。", "Sagaku wa raigetsu no seikyuu kara sashihikasete itadakimasu.", "Selisihnya akan kami potong dari tagihan bulan depan.", ["Dari penjelasan itu, selisih uang akan...", "dipotong dari tagihan bulan depan", "tidak dikembalikan", "dikirim tunai hari ini", "dijadikan poin"]],
      ["再発防止のため、チェック体制を見直してまいります。", "Saihatsu boushi no tame, chekku taisei o minaoshite mairimasu.", "Untuk mencegah terulang, kami akan meninjau ulang sistem pemeriksaan."],
    ],
  ],
  // 13. Laporan risiko
  [
    [
      ["可能性", "Kanousei", "kemungkinan"],
      ["警戒が必要", "Keikai ga hitsuyou", "perlu waspada"],
      ["備えておく", "Sonaete oku", "bersiap terlebih dulu"],
      ["避難場所", "Hinan basho", "tempat evakuasi", ["Laporan risiko yang baik menyebutkan...", "tingkat risiko, kemungkinan, dan langkah yang disarankan", "harga tiket", "resep masakan", "jadwal TV"]],
    ],
    [
      ["今夜から明日にかけて、大雨による土砂災害の可能性があります。", "Kon-ya kara ashita ni kakete, ooame ni yoru dosha saigai no kanousei ga arimasu.", "Mulai malam ini hingga besok, ada kemungkinan bencana tanah longsor akibat hujan lebat."],
      ["山沿いの地域では特に警戒が必要です。", "Yamazoi no chiiki de wa toku ni keikai ga hitsuyou desu.", "Wilayah di sepanjang pegunungan terutama perlu waspada.", ["Menurut laporan, wilayah yang terutama perlu waspada adalah...", "sepanjang pegunungan", "pusat kota", "pesisir pantai", "bandara"]],
      ["危険を感じたら、早めに避難してください。", "Kiken o kanjitara, hayame ni hinan shite kudasai.", "Jika merasa bahaya, segeralah mengungsi."],
      ["停電に備えて、懐中電灯を用意しておきましょう。", "Teiden ni sonaete, kaichuu dentou o youi shite okimashou.", "Untuk berjaga-jaga dari pemadaman, siapkan senter."],
    ],
  ],
  // 14. Kuliah mini akademik
  [
    [
      ["という言葉", "To iu kotoba", "istilah ..."],
      ["心理", "Shinri", "psikologi / kejiwaan"],
      ["といった行動", "To itta koudou", "perilaku seperti ..."],
      ["合理的な判断", "Gouriteki na handan", "keputusan rasional", ["Kuliah mini akademik biasanya berurutan...", "konsep → mekanisme → contoh → kritik", "contoh → salam", "kritik saja", "salam → selesai"]],
    ],
    [
      ["「確証バイアス」という言葉を聞いたことがありますか。", "\"Kakushou baiasu\" to iu kotoba o kiita koto ga arimasu ka.", "Pernahkah Anda mendengar istilah 'bias konfirmasi'?"],
      ["自分の考えに合う情報ばかり集めてしまう心理です。", "Jibun no kangae ni au jouhou bakari atsumete shimau shinri desu.", "Psikologi yang membuat kita hanya mengumpulkan informasi yang sesuai pikiran sendiri."],
      ["例えば、好きな商品の良い口コミだけを読むといった行動です。", "Tatoeba, suki na shouhin no yoi kuchikomi dake o yomu to itta koudou desu.", "Misalnya, perilaku hanya membaca ulasan baik tentang produk yang disukai."],
      ["合理的な判断には、反対の意見にも目を向けることが必要です。", "Gouriteki na handan ni wa, hantai no iken ni mo me o mukeru koto ga hitsuyou desu.", "Untuk keputusan rasional, perlu juga memperhatikan pendapat yang berlawanan.", ["Saran dosen untuk menghindari bias itu adalah...", "memperhatikan pendapat yang berlawanan", "membaca ulasan baik saja", "mengikuti mayoritas", "tidak membaca apa pun"]],
    ],
  ],
  // 15. Kontras pendapat
  [
    [
      ["のに対して", "No ni taishite", "sementara / berbeda dengan"],
      ["派", "Ha", "kubu / golongan"],
      ["とは逆に", "To wa gyaku ni", "sebaliknya"],
      ["ゆとり", "Yutori", "kelonggaran", ["Saat mendengar dua pendapat yang dikontraskan, yang perlu ditangkap adalah...", "isi tiap pendapat dan siapa yang memegangnya", "nama tempat saja", "jumlah peserta", "jam acara"]],
    ],
    [
      ["紙の本を好む人が多いのに対して、若い世代は電子書籍を選ぶ傾向があります。", "Kami no hon o konomu hito ga ooi no ni taishite, wakai sedai wa denshi shoseki o erabu keikou ga arimasu.", "Sementara banyak orang menyukai buku kertas, generasi muda cenderung memilih e-book."],
      ["紙派は、手触りや読みやすさを重視します。", "Kamiha wa, tezawari ya yomiyasusa o juushi shimasu.", "Kubu kertas mementingkan sentuhan dan kenyamanan membaca."],
      ["とは逆に、電子派は持ち運びの便利さを評価しています。", "To wa gyaku ni, denshiha wa mochihakobi no benrisa o hyouka shite imasu.", "Sebaliknya, kubu digital menghargai kemudahan dibawa.", ["Menurut audio itu, kubu digital menghargai...", "kemudahan dibawa", "sentuhan kertas", "harga mahal", "bau buku"]],
      ["目的によって使い分ける人も増えているようです。", "Mokuteki ni yotte tsukaiwakeru hito mo fuete iru you desu.", "Tampaknya yang memakai keduanya sesuai tujuan juga bertambah."],
    ],
  ],
  // 16. Makna tersirat
  [
    [
      ["考えておきます", "Kangaete okimasu", "akan saya pikirkan (sering = menolak halus)"],
      ["ちょっと…", "Chotto...", "agak... (penolakan halus)"],
      ["そっか", "Sokka", "oh, begitu"],
      ["機会があれば", "Kikai ga areba", "kalau ada kesempatan", ["Dalam percakapan Jepang, 考えておきます sering berarti...", "penolakan halus", "persetujuan penuh", "kemarahan", "kebingungan"]],
    ],
    [
      ["今度の日曜日、引っ越しを手伝ってもらえないかな。", "Kondo no nichiyoubi, hikkoshi o tetsudatte moraenai ka na.", "Minggu ini, bisa bantu pindahan tidak, ya?"],
      ["日曜日はちょっと…。家族の用事があって。", "Nichiyoubi wa chotto... Kazoku no youji ga atte.", "Hari Minggu agak... Ada urusan keluarga.", ["Dari jawaban itu, orang kedua...", "menolak dengan halus", "setuju membantu", "akan datang terlambat", "mengajak orang lain"]],
      ["そっか、無理しなくていいよ。", "Sokka, muri shinakute ii yo.", "Oh begitu, tidak usah memaksakan diri."],
      ["また機会があれば、ぜひ声をかけてね。", "Mata kikai ga areba, zehi koe o kakete ne.", "Kalau ada kesempatan lagi, panggil aku, ya."],
    ],
  ],
  // 17. Sikap pembicara
  [
    [
      ["だけあって", "Dake atte", "memang pantas karena"],
      ["せっかく", "Sekkaku", "susah payah"],
      ["いかにも", "Ika ni mo", "benar-benar khas"],
      ["さすが", "Sasuga", "memang hebat", ["Kamu mendengar \"sekkaku junbi shita noni\". Sikap pembicara...", "kecewa", "senang", "takut", "kagum"]],
    ],
    [
      ["プロだけあって、仕上がりが見事ですね。", "Puro dake atte, shiagari ga migoto desu ne.", "Memang pantas profesional, hasilnya luar biasa."],
      ["せっかくの休みなのに、雨で出かけられなかった。", "Sekkaku no yasumi na noni, ame de dekakerarenakatta.", "Padahal hari libur yang dinanti, tidak bisa keluar karena hujan."],
      ["いかにも子どもが喜びそうなデザインですね。", "Ika ni mo kodomo ga yorokobisou na dezain desu ne.", "Desainnya benar-benar khas yang disukai anak-anak."],
      ["さすがに三日連続の徹夜は無理だよ。", "Sasuga ni mikka renzoku no tetsuya wa muri da yo.", "Begadang tiga hari berturut-turut itu tentu saja mustahil."],
    ],
  ],
  // 18. Percakapan cepat banyak giliran
  [
    [
      ["結局", "Kekkyoku", "akhirnya"],
      ["とりあえず", "Toriaezu", "untuk sementara"],
      ["決めちゃおう", "Kimechaou", "ayo putuskan saja"],
      ["んじゃない？", "N ja nai?", "bukankah ...? (lisan)", ["Dalam percakapan cepat, ciri yang sering muncul adalah...", "penyingkatan dan kalimat yang tidak selesai", "keigo panjang", "kalimat sangat formal", "bahasa tulisan"]],
    ],
    [
      ["で、旅行の行き先、結局どこにする？", "De, ryokou no ikisaki, kekkyoku doko ni suru?", "Jadi, tujuan wisatanya akhirnya ke mana?"],
      ["とりあえず、候補を三つに絞ろうよ。", "Toriaezu, kouho o mittsu ni shiborou yo.", "Untuk sementara, persempit pilihannya jadi tiga, yuk."],
      ["え、もう面倒だから、沖縄に決めちゃおうよ。", "E, mou mendou da kara, Okinawa ni kimechaou yo.", "Hah, sudah repot, putuskan Okinawa saja, yuk."],
      ["それなら、早めに飛行機取ったほうがいいんじゃない？", "Sore nara, hayame ni hikouki totta hou ga ii n ja nai?", "Kalau begitu, bukankah lebih baik pesan pesawat lebih awal?", ["Dari percakapan itu, tujuan yang diusulkan adalah...", "Okinawa", "Hokkaido", "Kyoto", "belum ada"]],
    ],
  ],
  // 19. Memilih ringkasan
  [
    [
      ["要点", "Youten", "inti / poin utama"],
      ["活気を与える", "Kakki o ataeru", "memberi semangat / menghidupkan"],
      ["再生", "Saisei", "kebangkitan / regenerasi"],
      ["移住者", "Ijuusha", "pendatang (yang pindah menetap)", ["Ringkasan yang baik mencakup...", "inti, bukan detail menarik", "semua detail kecil", "pendapat pribadi panjang", "hanya angka"]],
    ],
    [
      ["この商店街は、一時はシャッター通りと呼ばれていました。", "Kono shoutengai wa, ichiji wa shattaa doori to yobarete imashita.", "Kawasan pertokoan ini pernah disebut 'jalan rolling door' (banyak toko tutup)."],
      ["若い店主たちが古い店を改装して、新しい店を始めました。", "Wakai tenshutachi ga furui mise o kaisou shite, atarashii mise o hajimemashita.", "Para pemilik toko muda merenovasi toko lama dan memulai usaha baru."],
      ["週末にはイベントが開かれ、客足が戻ってきています。", "Shuumatsu ni wa ibento ga hirakare, kyakuashi ga modotte kite imasu.", "Setiap akhir pekan diadakan acara, dan pengunjung mulai kembali."],
      ["つまり、若い世代が商店街を生き返らせているのです。", "Tsumari, wakai sedai ga shoutengai o ikikaerasete iru no desu.", "Intinya, generasi muda menghidupkan kembali kawasan pertokoan.", ["Ringkasan terbaik untuk audio itu adalah...", "generasi muda menghidupkan kembali kawasan pertokoan", "semua toko di sana tutup", "acara hanya ada di hari kerja", "pemilik lama pindah ke kota"]],
    ],
  ],
  // 20. Ulasan listening N2
  [
    [
      ["冷え込む", "Hiekomu", "mendingin (lesu)"],
      ["高騰", "Koutou", "melonjak (harga)"],
      ["代替品", "Daitaihin", "barang pengganti"],
      ["動向", "Doukou", "perkembangan / tren", ["Kata 高騰 berarti...", "melonjak (harga)", "turun drastis", "stabil", "habis"]],
    ],
    [
      ["円安の影響で、海外旅行の費用が高騰しています。", "En-yasu no eikyou de, kaigai ryokou no hiyou ga koutou shite imasu.", "Akibat yen melemah, biaya wisata ke luar negeri melonjak."],
      ["そのため、国内旅行を選ぶ人が増えているということです。", "Sono tame, kokunai ryokou o erabu hito ga fuete iru to iu koto desu.", "Karena itu, dilaporkan orang yang memilih wisata domestik bertambah.", ["Dari berita itu, akibat biaya luar negeri melonjak, orang...", "lebih memilih wisata domestik", "berhenti bepergian sama sekali", "pindah ke luar negeri", "membeli mobil"]],
      ["観光地の旅館は、予約で埋まりつつあります。", "Kankouchi no ryokan wa, yoyaku de umaritsutsu arimasu.", "Penginapan di tempat wisata mulai penuh oleh reservasi."],
      ["専門家は、この傾向がしばらく続くとみています。", "Senmonka wa, kono keikou ga shibaraku tsuzuku to mite imasu.", "Para ahli memperkirakan tren ini akan berlanjut untuk sementara."],
    ],
  ],
];
