import type { JapaneseQuizTopic } from '../types';

// Latihan Grammar N1 — one entry per topic (index = topic - 1): [Basic, Advanced].
export const grammar: JapaneseQuizTopic[] = [
  // 1. や否や
  [
    [
      ["幕が上がるや否や", "Maku ga agaru ya ina ya", "begitu tirai terangkat"],
      ["ドアが開くや否や", "Doa ga aku ya ina ya", "begitu pintu terbuka"],
      ["結果を見るや否や", "Kekka o miru ya ina ya", "begitu melihat hasilnya"],
      ["帰宅するや否や", "Kitaku suru ya ina ya", "begitu tiba di rumah", ["Pola や否や disambung dengan kata kerja bentuk...", "kamus", "て", "ない", "lampau た saja"]],
    ],
    [
      ["幕が上がるや否や、会場は大きな拍手に包まれた。", "Maku ga agaru ya ina ya, kaijou wa ooki na hakushu ni tsutsumareta.", "Begitu tirai terangkat, aula langsung diselimuti tepuk tangan meriah."],
      ["電車のドアが開くや否や、乗客が一斉に降りてきた。", "Densha no doa ga aku ya ina ya, joukyaku ga issei ni orite kita.", "Begitu pintu kereta terbuka, penumpang serentak turun."],
      ["彼女は合格発表を見るや否や、母親に電話をかけた。", "Kanojo wa goukaku happyou o miru ya ina ya, hahaoya ni denwa o kaketa.", "Begitu melihat pengumuman kelulusan, dia langsung menelepon ibunya.", ["Apa yang dilakukan wanita itu begitu melihat pengumuman?", "langsung menelepon ibunya", "menangis lama", "pergi tidur", "mengulang ujian"]],
      ["夫は帰宅するや否や、ソファーに倒れ込んだ。", "Otto wa kitaku suru ya ina ya, sofaa ni taorekonda.", "Begitu tiba di rumah, suami saya langsung merebahkan diri di sofa."],
    ],
  ],
  // 2. そばから
  [
    [
      ["掃除するそばから", "Souji suru soba kara", "baru saja dibersihkan"],
      ["教わったそばから", "Osowatta soba kara", "baru saja diajari"],
      ["直したそばから", "Naoshita soba kara", "baru saja diperbaiki"],
      ["作るそばから", "Tsukuru soba kara", "baru saja dibuat", ["Pola そばから biasanya mengungkapkan...", "hal yang terulang dan mengecewakan", "harapan masa depan", "permintaan sopan", "perbandingan"]],
    ],
    [
      ["掃除するそばから、犬が庭の土を持ち込んでくる。", "Souji suru soba kara, inu ga niwa no tsuchi o mochikonde kuru.", "Baru saja dibersihkan, anjing langsung membawa masuk tanah dari halaman."],
      ["教わったそばから操作方法を忘れてしまい、恥ずかしい。", "Osowatta soba kara sousa houhou o wasurete shimai, hazukashii.", "Baru saja diajari, saya langsung lupa cara mengoperasikannya, malu rasanya."],
      ["直したそばから、別の箇所が壊れる。", "Naoshita soba kara, betsu no kasho ga kowareru.", "Baru saja diperbaiki, bagian lain langsung rusak."],
      ["母が作るそばから、子どもたちがおにぎりを食べてしまう。", "Haha ga tsukuru soba kara, kodomotachi ga onigiri o tabete shimau.", "Baru saja ibu membuatnya, anak-anak langsung menghabiskan onigirinya.", ["Situasi yang digambarkan adalah...", "onigiri langsung dimakan begitu dibuat", "ibu tidak mau membuat onigiri", "anak-anak membantu memasak", "onigiri tidak laku"]],
    ],
  ],
  // 3. ともなく
  [
    [
      ["テレビを見るともなく", "Terebi o miru tomo naku", "menonton TV tanpa maksud"],
      ["誰に言うともなく", "Dare ni iu tomo naku", "tanpa ditujukan pada siapa pun"],
      ["いつからともなく", "Itsu kara tomo naku", "entah sejak kapan"],
      ["考えるともなく", "Kangaeru tomo naku", "memikirkan sambil lalu", ["Arti どこからともなく adalah...", "entah dari mana", "dari mana saja boleh", "tidak dari mana pun", "dari tempat yang jauh sekali"]],
    ],
    [
      ["テレビを見るともなく見ていると、故郷の町が映った。", "Terebi o miru tomo naku miteiru to, furusato no machi ga utsutta.", "Saat menonton TV tanpa maksud apa-apa, kota kampung halaman saya muncul di layar."],
      ["彼は誰に言うともなく、「疲れたなあ」とつぶやいた。", "Kare wa dare ni iu tomo naku, \"tsukareta naa\" to tsubuyaita.", "Dia bergumam \"capeknya\" tanpa ditujukan pada siapa pun."],
      ["いつからともなく、二人は互いを名前で呼ぶようになった。", "Itsu kara tomo naku, futari wa tagai o namae de yobu you ni natta.", "Entah sejak kapan, keduanya mulai saling memanggil dengan nama.", ["Makna いつからともなく dalam kalimat itu adalah...", "tidak jelas sejak kapan", "sejak hari pertama", "sejak kemarin", "sejak lama sekali dan pasti"]],
      ["将来のことを考えるともなく考えながら、川沿いを歩いた。", "Shourai no koto o kangaeru tomo naku kangaenagara, kawazoi o aruita.", "Saya berjalan menyusuri sungai sambil memikirkan masa depan sambil lalu."],
    ],
  ],
  // 4. に至って
  [
    [
      ["被害が出るに至って", "Higai ga deru ni itatte", "baru setelah muncul kerugian"],
      ["死者が出るに至って", "Shisha ga deru ni itatte", "baru setelah jatuh korban jiwa"],
      ["社長に至っては", "Shachou ni itatte wa", "bahkan direktur"],
      ["細部に至るまで", "Saibu ni itaru made", "sampai ke detail terkecil", ["Pola 〜に至って biasanya menunjukkan...", "baru bertindak setelah keadaan ekstrem", "tindakan sebelum masalah", "harapan kecil", "kebiasaan sehari-hari"]],
    ],
    [
      ["住民に健康被害が出るに至って、行政はようやく調査に乗り出した。", "Juumin ni kenkou higai ga deru ni itatte, gyousei wa youyaku chousa ni noridashita.", "Baru setelah warga mengalami gangguan kesehatan, pemerintah akhirnya turun melakukan penyelidikan.", ["Kapan pemerintah mulai menyelidiki?", "setelah warga mengalami gangguan kesehatan", "sebelum ada masalah", "setelah diminta media asing", "tidak pernah"]],
      ["死者が出るに至って、初めてその交差点に信号が設置された。", "Shisha ga deru ni itatte, hajimete sono kousaten ni shingou ga setchi sareta.", "Baru setelah jatuh korban jiwa, lampu lalu lintas dipasang di persimpangan itu."],
      ["社員は皆遅くまで働くが、社長に至っては会社に泊まり込んでいる。", "Shain wa mina osoku made hataraku ga, shachou ni itatte wa kaisha ni tomarikonde iru.", "Semua karyawan bekerja sampai larut, bahkan direktur menginap di kantor."],
      ["このホテルは、家具から照明に至るまで、すべて職人の手作りだ。", "Kono hoteru wa, kagu kara shoumei ni itaru made, subete shokunin no tezukuri da.", "Hotel ini, mulai dari perabot sampai pencahayaan, semuanya buatan tangan pengrajin."],
    ],
  ],
  // 5. を余儀なくされる
  [
    [
      ["延期を余儀なくされる", "Enki o yogi naku sareru", "terpaksa ditunda"],
      ["撤退を余儀なくされる", "Tettai o yogi naku sareru", "terpaksa mundur"],
      ["避難を余儀なくされる", "Hinan o yogi naku sareru", "terpaksa mengungsi"],
      ["変更を余儀なくされる", "Henkou o yogi naku sareru", "terpaksa diubah", ["Pola を余儀なくされる menunjukkan...", "terpaksa karena keadaan di luar kendali", "keinginan sendiri", "larangan dari orang tua", "kebiasaan yang disukai"]],
    ],
    [
      ["台風の接近により、花火大会は延期を余儀なくされた。", "Taifuu no sekkin ni yori, hanabi taikai wa enki o yogi naku sareta.", "Karena topan mendekat, festival kembang api terpaksa ditunda.", ["Mengapa festival kembang api ditunda?", "karena topan mendekat", "karena kurang dana", "karena penonton sedikit", "karena keinginan panitia"]],
      ["競争の激化で、同社は海外市場からの撤退を余儀なくされた。", "Kyousou no gekika de, dousha wa kaigai shijou kara no tettai o yogi naku sareta.", "Karena persaingan makin ketat, perusahaan itu terpaksa mundur dari pasar luar negeri."],
      ["噴火の影響で、島の住民は長期の避難を余儀なくされている。", "Funka no eikyou de, shima no juumin wa chouki no hinan o yogi naku sarete iru.", "Akibat letusan gunung, warga pulau terpaksa mengungsi dalam waktu lama."],
      ["予算の削減で、計画は大幅な変更を余儀なくされた。", "Yosan no sakugen de, keikaku wa oohaba na henkou o yogi naku sareta.", "Karena pemotongan anggaran, rencana terpaksa diubah secara besar-besaran."],
    ],
  ],
  // 6. に堪えない
  [
    [
      ["読むに堪えない", "Yomu ni taenai", "tak tertahankan untuk dibaca"],
      ["見るに堪えない光景", "Miru ni taenai koukei", "pemandangan yang tak sanggup dilihat"],
      ["慚愧に堪えない", "Zanki ni taenai", "sangat malu dan menyesal"],
      ["喜びに堪えない", "Yorokobi ni taenai", "tak terhingga gembiranya", ["Dalam 感謝の念に堪えません, pola に堪えない bermakna...", "perasaan yang tak terhingga", "tidak sanggup melihat", "tidak boleh", "pasti akan"]],
    ],
    [
      ["その記事は、根拠のない憶測ばかりで読むに堪えない。", "Sono kiji wa, konkyo no nai okusoku bakari de yomu ni taenai.", "Artikel itu penuh dugaan tanpa dasar sehingga tak tertahankan untuk dibaca."],
      ["被災地の惨状は、見るに堪えない光景だった。", "Hisaichi no sanjou wa, miru ni taenai koukei datta.", "Kondisi menyedihkan di daerah bencana adalah pemandangan yang tak sanggup dilihat."],
      ["部下の不祥事を防げなかったことは、慚愧に堪えない。", "Buka no fushouji o fusegenakatta koto wa, zanki ni taenai.", "Saya sangat malu dan menyesal tidak bisa mencegah skandal bawahan saya."],
      ["本日このような賞をいただき、喜びに堪えません。", "Honjitsu kono you na shou o itadaki, yorokobi ni taemasen.", "Hari ini saya menerima penghargaan seperti ini, tak terhingga gembiranya.", ["Perasaan pembicara dalam kalimat itu adalah...", "sangat gembira", "tidak tahan dan marah", "menyesal", "bosan"]],
    ],
  ],
  // 7. までもない
  [
    [
      ["説明するまでもない", "Setsumei suru made mo nai", "tidak perlu dijelaskan"],
      ["医者に行くまでもない", "Isha ni iku made mo nai", "tidak perlu sampai ke dokter"],
      ["議論するまでもない", "Giron suru made mo nai", "tidak perlu diperdebatkan"],
      ["改めて言うまでもないが", "Aratamete iu made mo nai ga", "tak perlu dikatakan ulang, tetapi", ["Pola までもない berarti...", "tidak perlu sampai (karena sudah jelas)", "harus segera", "tidak boleh", "sangat ingin"]],
    ],
    [
      ["このくらいの傷なら、医者に行くまでもない。", "Kono kurai no kizu nara, isha ni iku made mo nai.", "Kalau lukanya sekecil ini, tidak perlu sampai ke dokter."],
      ["彼の実力は、改めて説明するまでもないだろう。", "Kare no jitsuryoku wa, aratamete setsumei suru made mo nai darou.", "Kemampuannya mungkin tidak perlu dijelaskan lagi."],
      ["どちらが正しいかは、議論するまでもなく明らかだ。", "Dochira ga tadashii ka wa, giron suru made mo naku akiraka da.", "Mana yang benar jelas tanpa perlu diperdebatkan."],
      ["改めて言うまでもないが、締め切りは厳守してほしい。", "Aratamete iu made mo nai ga, shimekiri wa genshu shite hoshii.", "Tak perlu dikatakan ulang, tetapi saya ingin tenggat waktu dipatuhi ketat.", ["Permintaan pembicara adalah...", "mematuhi tenggat waktu", "memperpanjang tenggat", "tidak perlu mengumpulkan", "menjelaskan ulang"]],
    ],
  ],
  // 8. に即して
  [
    [
      ["規則に即して", "Kisoku ni sokushite", "sesuai peraturan"],
      ["実情に即した", "Jitsujou ni sokushita", "yang sesuai keadaan sebenarnya"],
      ["経験に即して", "Keiken ni sokushite", "berdasarkan pengalaman"],
      ["ニーズに即した", "Niizu ni sokushita", "yang sesuai kebutuhan", ["Pola 〜に即して paling dekat artinya dengan...", "sesuai / berdasarkan (secara konkret)", "melawan", "tanpa memedulikan", "sebelum"]],
    ],
    [
      ["違反者には、規則に即して厳正に対処する。", "Ihansha ni wa, kisoku ni sokushite gensei ni taisho suru.", "Pelanggar akan ditangani dengan tegas sesuai peraturan."],
      ["地域の実情に即した支援策が求められている。", "Chiiki no jitsujou ni sokushita shiensaku ga motomerarete iru.", "Dibutuhkan langkah bantuan yang sesuai dengan keadaan sebenarnya di daerah."],
      ["講師は自らの経験に即して、具体的に話してくれた。", "Koushi wa mizukara no keiken ni sokushite, gutaiteki ni hanashite kureta.", "Pengajar berbicara secara konkret berdasarkan pengalamannya sendiri."],
      ["利用者のニーズに即したサービスでなければ、長続きしない。", "Riyousha no niizu ni sokushita saabisu de nakereba, nagatsuzuki shinai.", "Layanan yang tidak sesuai kebutuhan pengguna tidak akan bertahan lama.", ["Menurut kalimat itu, layanan bertahan lama jika...", "sesuai kebutuhan pengguna", "harganya mahal", "iklannya banyak", "pegawainya sedikit"]],
    ],
  ],
  // 9. をもって
  [
    [
      ["今月末をもって", "Kongetsumatsu o motte", "terhitung akhir bulan ini"],
      ["拍手をもって", "Hakushu o motte", "dengan tepuk tangan"],
      ["誠意をもって", "Seii o motte", "dengan ketulusan"],
      ["メールをもって", "Meeru o motte", "melalui email", ["Dalam 本日をもちまして, pola をもって menunjukkan...", "batas waktu (terhitung)", "alat makan", "alasan negatif", "perbandingan"]],
    ],
    [
      ["当店は、今月末をもって閉店いたします。", "Touten wa, kongetsumatsu o motte heiten itashimasu.", "Toko kami akan tutup terhitung akhir bulan ini.", ["Kapan toko itu tutup?", "akhir bulan ini", "awal bulan depan", "hari ini", "akhir tahun"]],
      ["新会長の就任を、盛大な拍手をもって迎えましょう。", "Shin kaichou no shuunin o, seidai na hakushu o motte mukaemashou.", "Mari sambut pelantikan ketua baru dengan tepuk tangan meriah."],
      ["お客様には、誠意をもって対応するよう心がけている。", "Okyakusama ni wa, seii o motte taiou suru you kokorogakete iru.", "Kami berusaha melayani pelanggan dengan ketulusan."],
      ["合否は、後日メールをもってお知らせいたします。", "Gouhi wa, gojitsu meeru o motte oshirase itashimasu.", "Hasil lulus atau tidak akan kami beritahukan melalui email di kemudian hari."],
    ],
  ],
  // 10. と相まって
  [
    [
      ["好景気と相まって", "Koukeiki to aimatte", "berpadu dengan ekonomi yang baik"],
      ["話題性と相まって", "Wadaisei to aimatte", "berpadu dengan daya tarik pemberitaan"],
      ["演技力と相まって", "Engiryoku to aimatte", "berpadu dengan kemampuan akting"],
      ["相乗効果", "Soujou kouka", "efek sinergi", ["Pola AとBが相まって menunjukkan...", "A dan B berpadu menghasilkan efek lebih kuat", "A bertentangan dengan B", "A menggantikan B", "A terjadi sebelum B"]],
    ],
    [
      ["好景気と相まって、ボーナスは過去最高を記録した。", "Koukeiki to aimatte, boonasu wa kako saikou o kiroku shita.", "Berpadu dengan ekonomi yang baik, bonus mencatat rekor tertinggi."],
      ["人気俳優の起用が話題性と相まって、映画は大ヒットした。", "Ninki haiyuu no kiyou ga wadaisei to aimatte, eiga wa daihitto shita.", "Pemilihan aktor populer berpadu dengan daya tarik pemberitaan, sehingga film itu sangat sukses."],
      ["美しい脚本が俳優の演技力と相まって、観客の涙を誘った。", "Utsukushii kyakuhon ga haiyuu no engiryoku to aimatte, kankyaku no namida o sasotta.", "Naskah yang indah berpadu dengan kemampuan akting pemain, sehingga membuat penonton menangis.", ["Apa yang membuat penonton menangis?", "naskah indah dan akting pemain", "harga tiket", "durasi film", "musik yang keras"]],
      ["二つの政策が相まって、大きな相乗効果を生んだ。", "Futatsu no seisaku ga aimatte, ookina soujou kouka o unda.", "Dua kebijakan berpadu dan menghasilkan efek sinergi yang besar."],
    ],
  ],
  // 11. いかんによって
  [
    [
      ["努力いかんで", "Doryoku ikan de", "tergantung usaha"],
      ["対応いかんによっては", "Taiou ikan ni yotte wa", "tergantung penanganannya"],
      ["事情のいかんを問わず", "Jijou no ikan o towazu", "apa pun keadaannya"],
      ["天候いかんでは", "Tenkou ikan de wa", "tergantung cuaca", ["Pola 理由のいかんにかかわらず berarti...", "apa pun alasannya", "karena alasan tertentu", "tanpa alasan sama sekali", "alasan yang jelas"]],
    ],
    [
      ["合格できるかどうかは、今後の努力いかんだ。", "Goukaku dekiru ka dou ka wa, kongo no doryoku ikan da.", "Lulus atau tidak tergantung usaha ke depan."],
      ["会社の対応いかんによっては、訴訟に発展するおそれもある。", "Kaisha no taiou ikan ni yotte wa, soshou ni hatten suru osore mo aru.", "Tergantung penanganan perusahaan, masalah ini bisa berkembang menjadi gugatan hukum.", ["Menurut kalimat itu, apa yang menentukan apakah terjadi gugatan?", "penanganan perusahaan", "cuaca", "jumlah karyawan", "harga saham"]],
      ["事情のいかんを問わず、一度支払われた料金は返金できません。", "Jijou no ikan o towazu, ichido shiharawareta ryoukin wa henkin dekimasen.", "Apa pun keadaannya, biaya yang sudah dibayar tidak dapat dikembalikan."],
      ["天候いかんでは、登山を中止することもあります。", "Tenkou ikan de wa, tozan o chuushi suru koto mo arimasu.", "Tergantung cuaca, pendakian bisa saja dibatalkan."],
    ],
  ],
  // 12. べく
  [
    [
      ["夢をかなえるべく", "Yume o kanaeru beku", "demi mewujudkan mimpi"],
      ["真相を究明すべく", "Shinsou o kyuumei subeku", "demi mengusut kebenaran"],
      ["遅れを取り戻すべく", "Okure o torimodosu beku", "demi mengejar ketertinggalan"],
      ["知るべくもない", "Shiru beku mo nai", "tak mungkin mengetahui", ["Bentuk べく dari する adalah...", "すべく", "しべく", "するべくて", "さべく"]],
    ],
    [
      ["夢をかなえるべく、彼女は単身で渡米した。", "Yume o kanaeru beku, kanojo wa tanshin de tobei shita.", "Demi mewujudkan mimpinya, dia pergi sendirian ke Amerika."],
      ["警察は、事件の真相を究明すべく捜査を続けている。", "Keisatsu wa, jiken no shinsou o kyuumei subeku sousa o tsuzukete iru.", "Polisi terus menyelidiki demi mengusut kebenaran kasus itu."],
      ["工事の遅れを取り戻すべく、作業員を増やした。", "Kouji no okure o torimodosu beku, sagyouin o fuyashita.", "Demi mengejar ketertinggalan proyek konstruksi, jumlah pekerja ditambah.", ["Mengapa jumlah pekerja ditambah?", "untuk mengejar ketertinggalan proyek", "karena proyek selesai", "karena ada pekerja yang berhenti", "untuk menghemat biaya"]],
      ["当時の私には、彼の苦しみなど知るべくもなかった。", "Touji no watashi ni wa, kare no kurushimi nado shiru beku mo nakatta.", "Saya yang dulu tak mungkin mengetahui penderitaannya."],
    ],
  ],
  // 13. まじき
  [
    [
      ["警察官にあるまじき", "Keisatsukan ni aru majiki", "yang tak pantas bagi polisi"],
      ["社会人にあるまじき", "Shakaijin ni aru majiki", "yang tak pantas bagi orang dewasa pekerja"],
      ["許すまじき行為", "Yurusu majiki koui", "perbuatan yang tak termaafkan"],
      ["親にあるまじき", "Oya ni aru majiki", "yang tak pantas bagi orang tua", ["Pola にあるまじき dipakai untuk mengkritik perbuatan yang...", "tidak pantas bagi peran atau status tertentu", "sangat terpuji", "biasa saja", "belum pernah terjadi"]],
    ],
    [
      ["飲酒運転は、警察官にあるまじき行為だ。", "Inshu unten wa, keisatsukan ni aru majiki koui da.", "Mengemudi dalam keadaan mabuk adalah perbuatan yang tak pantas bagi polisi."],
      ["無断で欠勤するなど、社会人にあるまじき態度だ。", "Mudan de kekkin suru nado, shakaijin ni aru majiki taido da.", "Absen tanpa izin dan sejenisnya adalah sikap yang tak pantas bagi orang dewasa pekerja."],
      ["弱い立場の人を狙った詐欺は、許すまじき犯罪である。", "Yowai tachiba no hito o neratta sagi wa, yurusu majiki hanzai de aru.", "Penipuan yang menyasar orang lemah adalah kejahatan yang tak termaafkan."],
      ["子どもを置いて遊びに行くとは、親にあるまじきことだ。", "Kodomo o oite asobi ni iku to wa, oya ni aru majiki koto da.", "Meninggalkan anak untuk pergi bersenang-senang adalah hal yang tak pantas bagi orang tua.", ["Kalimat itu mengkritik perbuatan...", "orang tua yang meninggalkan anaknya", "anak yang bermain", "guru yang terlambat", "polisi yang mabuk"]],
    ],
  ],
  // 14. ずにはおかない
  [
    [
      ["感動させずにはおかない", "Kandou sasezu ni wa okanai", "pasti akan menggugah hati"],
      ["反発を招かずにはおかない", "Hanpatsu o manekazu ni wa okanai", "pasti akan mengundang penolakan"],
      ["考えさせずにはおかない", "Kangaesasezu ni wa okanai", "pasti akan membuat berpikir"],
      ["突き止めずにはおかない", "Tsukitomezu ni wa okanai", "pasti akan melacak sampai tuntas", ["Pola ずにはおかない menunjukkan...", "pasti akan menyebabkan / melakukan", "tidak mungkin terjadi", "tidak perlu", "baru saja terjadi"]],
    ],
    [
      ["彼女の歌声は、聞く人を感動させずにはおかない。", "Kanojo no utagoe wa, kiku hito o kandou sasezu ni wa okanai.", "Suara nyanyiannya pasti akan menggugah hati pendengarnya."],
      ["突然の増税は、国民の反発を招かずにはおかないだろう。", "Totsuzen no zouzei wa, kokumin no hanpatsu o manekazu ni wa okanai darou.", "Kenaikan pajak yang mendadak pasti akan mengundang penolakan rakyat.", ["Menurut kalimat itu, kenaikan pajak mendadak akan...", "pasti mengundang penolakan rakyat", "disambut gembira", "tidak diperhatikan", "segera dibatalkan"]],
      ["戦争の悲惨さを描いたこの写真は、見る者に平和を考えさせずにはおかない。", "Sensou no hisansa o egaita kono shashin wa, miru mono ni heiwa o kangaesasezu ni wa okanai.", "Foto yang menggambarkan kekejaman perang ini pasti akan membuat yang melihatnya memikirkan perdamaian."],
      ["刑事は、犯人を必ず突き止めずにはおかないと決意した。", "Keiji wa, hannin o kanarazu tsukitomezu ni wa okanai to ketsui shita.", "Detektif itu bertekad pasti akan melacak pelaku sampai tuntas."],
    ],
  ],
  // 15. ならでは
  [
    [
      ["京都ならではの", "Kyouto naradewa no", "yang khas Kyoto"],
      ["プロならではの", "Puro naradewa no", "yang khas profesional"],
      ["この季節ならではの", "Kono kisetsu naradewa no", "yang khas musim ini"],
      ["手作りならではの", "Tezukuri naradewa no", "yang khas buatan tangan", ["Pola ならでは(の) berarti...", "khas / hanya bisa dari", "selain", "tanpa", "sebagai ganti"]],
    ],
    [
      ["京都ならではの町並みを楽しみながら散策した。", "Kyouto naradewa no machinami o tanoshiminagara sansaku shita.", "Saya berjalan-jalan sambil menikmati deretan bangunan khas Kyoto."],
      ["プロならではの細やかな気配りに感心した。", "Puro naradewa no komayaka na kikubari ni kanshin shita.", "Saya kagum pada perhatian detail yang khas seorang profesional."],
      ["この季節ならではの紅葉を見に、多くの人が訪れる。", "Kono kisetsu naradewa no kouyou o mi ni, ooku no hito ga otozureru.", "Banyak orang datang untuk melihat dedaunan merah yang khas musim ini.", ["Mengapa banyak orang datang?", "untuk melihat dedaunan merah khas musim itu", "untuk belanja murah", "untuk bekerja", "untuk melihat salju"]],
      ["手作りならではの温かみが、この器の魅力だ。", "Tezukuri naradewa no atatakami ga, kono utsuwa no miryoku da.", "Kehangatan khas buatan tangan adalah daya tarik wadah ini."],
    ],
  ],
  // 16. を皮切りに
  [
    [
      ["大阪を皮切りに", "Oosaka o kawakiri ni", "dimulai dari Osaka"],
      ["今回の発表を皮切りに", "Konkai no happyou o kawakiri ni", "diawali pengumuman kali ini"],
      ["一社の値上げを皮切りに", "Issha no neage o kawakiri ni", "diawali kenaikan harga satu perusahaan"],
      ["デビュー作を皮切りに", "Debyuusaku o kawakiri ni", "diawali karya debut", ["Pola を皮切りに menunjukkan...", "awal dari serangkaian kejadian berturut-turut", "akhir dari kejadian", "alasan kejadian", "pengecualian"]],
    ],
    [
      ["新作映画は、大阪を皮切りに全国で順次公開される。", "Shinsaku eiga wa, Oosaka o kawakiri ni zenkoku de junji koukai sareru.", "Film baru akan dirilis berturut-turut di seluruh negeri dimulai dari Osaka."],
      ["一社の値上げを皮切りに、各社が相次いで価格を引き上げた。", "Issha no neage o kawakiri ni, kakusha ga aitsuide kakaku o hikiageta.", "Diawali kenaikan harga satu perusahaan, perusahaan-perusahaan lain berturut-turut menaikkan harga.", ["Apa yang terjadi setelah satu perusahaan menaikkan harga?", "perusahaan lain ikut menaikkan harga", "harga kembali turun", "perusahaan itu bangkrut", "pemerintah melarang"]],
      ["デビュー作を皮切りに、彼女は次々とヒット作を生み出した。", "Debyuusaku o kawakiri ni, kanojo wa tsugitsugi to hittosaku o umidashita.", "Diawali karya debutnya, dia terus menghasilkan karya-karya laris."],
      ["今回の発表を皮切りに、各地で説明会が開かれる予定だ。", "Konkai no happyou o kawakiri ni, kakuchi de setsumeikai ga hirakareru yotei da.", "Diawali pengumuman kali ini, sesi penjelasan dijadwalkan diadakan di berbagai tempat."],
    ],
  ],
  // 17. といったところだ
  [
    [
      ["せいぜい三千円といったところ", "Seizei sanzen-en to itta tokoro", "paling-paling sekitar tiga ribu yen"],
      ["まずまずといったところ", "Mazumazu to itta tokoro", "kira-kira lumayan"],
      ["週に一度といったところ", "Shuu ni ichido to itta tokoro", "kira-kira seminggu sekali"],
      ["日常会話程度といったところ", "Nichijou kaiwa teido to itta tokoro", "kira-kira sebatas percakapan sehari-hari", ["Pola といったところだ menunjukkan jumlah atau tingkat yang...", "tidak terlalu besar / sebatas", "sangat besar", "tidak diketahui", "melebihi harapan"]],
    ],
    [
      ["このバッグの値段は、せいぜい三千円といったところだろう。", "Kono baggu no nedan wa, seizei sanzen-en to itta tokoro darou.", "Harga tas ini paling-paling sekitar tiga ribu yen."],
      ["今年の売り上げは、まずまずといったところです。", "Kotoshi no uriage wa, mazumazu to itta tokoro desu.", "Penjualan tahun ini kira-kira lumayan."],
      ["ジムに通うのは、週に一度といったところだ。", "Jimu ni kayou no wa, shuu ni ichido to itta tokoro da.", "Ke gym kira-kira hanya seminggu sekali.", ["Seberapa sering pembicara ke gym?", "kira-kira seminggu sekali", "setiap hari", "sebulan sekali", "tidak pernah"]],
      ["私の英語は、日常会話程度といったところです。", "Watashi no eigo wa, nichijou kaiwa teido to itta tokoro desu.", "Bahasa Inggris saya kira-kira sebatas percakapan sehari-hari."],
    ],
  ],
  // 18. 極まりない
  [
    [
      ["無責任極まりない", "Musekinin kiwamarinai", "sangat tidak bertanggung jawab"],
      ["非常識極まりない", "Hijoushiki kiwamarinai", "sangat tidak tahu aturan"],
      ["迷惑極まりない", "Meiwaku kiwamarinai", "sangat mengganggu"],
      ["感極まる", "Kan kiwamaru", "perasaan memuncak (terharu)", ["Pola 極まりない biasanya dipakai untuk...", "menekankan hal negatif secara ekstrem", "memuji dengan halus", "bertanya sopan", "menyatakan rencana"]],
    ],
    [
      ["事故の説明もせずに逃げるとは、無責任極まりない。", "Jiko no setsumei mo sezu ni nigeru to wa, musekinin kiwamarinai.", "Kabur tanpa menjelaskan kecelakaan itu sangat tidak bertanggung jawab."],
      ["深夜に大声で電話するなんて、非常識極まりない。", "Shinya ni oogoe de denwa suru nante, hijoushiki kiwamarinai.", "Menelepon dengan suara keras tengah malam sungguh sangat tidak tahu aturan."],
      ["駅前の違法駐輪は、通行人にとって迷惑極まりない。", "Ekimae no ihou chuurin wa, tsuukounin ni totte meiwaku kiwamarinai.", "Parkir sepeda ilegal di depan stasiun sangat mengganggu bagi pejalan kaki.", ["Menurut kalimat itu, yang sangat mengganggu pejalan kaki adalah...", "parkir sepeda ilegal di depan stasiun", "suara kereta", "pedagang kaki lima", "lampu jalan"]],
      ["優勝が決まった瞬間、選手は感極まって涙を流した。", "Yuushou ga kimatta shunkan, senshu wa kan kiwamatte namida o nagashita.", "Saat kemenangan dipastikan, atlet itu terharu hingga meneteskan air mata."],
    ],
  ],
  // 19. Retorika formal
  [
    [
      ["にほかならない", "Ni hoka naranai", "tak lain adalah"],
      ["と言っても過言ではない", "To itte mo kagon de wa nai", "tidak berlebihan jika dikatakan"],
      ["と言わざるを得ない", "To iwazaru o enai", "terpaksa harus dikatakan"],
      ["ではなかろうか", "De wa nakarou ka", "bukankah ... (sangat formal)", ["Pola にほかならない berfungsi untuk...", "menegaskan bahwa hanya itulah jawabannya", "menyatakan keraguan", "memberi izin", "menyatakan larangan"]],
    ],
    [
      ["今回の成功は、社員全員の努力の結果にほかならない。", "Konkai no seikou wa, shain zenin no doryoku no kekka ni hoka naranai.", "Keberhasilan kali ini tak lain adalah hasil usaha seluruh karyawan.", ["Menurut kalimat itu, keberhasilan kali ini adalah hasil...", "usaha seluruh karyawan", "keberuntungan semata", "usaha direktur saja", "bantuan pemerintah"]],
      ["スマートフォンは、現代人の生活を一変させたと言っても過言ではない。", "Sumaatofon wa, gendaijin no seikatsu o ippen saseta to itte mo kagon de wa nai.", "Tidak berlebihan jika dikatakan ponsel pintar mengubah total kehidupan manusia modern."],
      ["この計画には、根本的な欠陥があると言わざるを得ない。", "Kono keikaku ni wa, konponteki na kekkan ga aru to iwazaru o enai.", "Terpaksa harus dikatakan bahwa rencana ini memiliki cacat mendasar."],
      ["教育の目的を、改めて問い直すべき時期に来ているのではなかろうか。", "Kyouiku no mokuteki o, aratamete toinaosu beki jiki ni kite iru no de wa nakarou ka.", "Bukankah sudah tiba saatnya kita mempertanyakan ulang tujuan pendidikan?"],
    ],
  ],
  // 20. Ulasan grammar N1
  [
    [
      ["発売されるや否や", "Hatsubai sareru ya ina ya", "begitu dirilis"],
      ["縮小を余儀なくされた", "Shukushou o yogi naku sareta", "terpaksa diperkecil"],
      ["巻き返すべく", "Makikaesu beku", "demi bangkit kembali"],
      ["品質と価格が相まって", "Hinshitsu to kakaku ga aimatte", "kualitas dan harga berpadu", ["Pola べく paling dekat artinya dengan...", "demi / agar (tujuan)", "karena", "meskipun", "begitu ... langsung"]],
    ],
    [
      ["その家電は発売されるや否や、品切れが続出した。", "Sono kaden wa hatsubai sareru ya ina ya, shinagire ga zokushutsu shita.", "Begitu peralatan elektronik itu dirilis, stok kosong terjadi di mana-mana."],
      ["高い品質と手頃な価格が相まって、若い世代に支持された。", "Takai hinshitsu to tegoro na kakaku ga aimatte, wakai sedai ni shiji sareta.", "Kualitas tinggi dan harga terjangkau berpadu, sehingga didukung generasi muda."],
      ["しかし、部品不足により、生産の縮小を余儀なくされた。", "Shikashi, buhin busoku ni yori, seisan no shukushou o yogi naku sareta.", "Namun, akibat kekurangan suku cadang, produksi terpaksa diperkecil.", ["Mengapa produksi diperkecil?", "karena kekurangan suku cadang", "karena tidak laku", "karena harga naik", "karena pabrik pindah"]],
      ["メーカーは巻き返すべく、新たな調達先を開拓している。", "Meekaa wa makikaesu beku, arata na choutatsusaki o kaitaku shite iru.", "Demi bangkit kembali, produsen sedang merintis pemasok baru."],
    ],
  ],
];
