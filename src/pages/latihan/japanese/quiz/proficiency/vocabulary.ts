import type { JapaneseQuizTopic } from '../types';

// Latihan Vocabulary N1 — one entry per topic (index = topic - 1): [Basic, Advanced].
export const vocabulary: JapaneseQuizTopic[] = [
  // 1. Kata benda akademik
  [
    [
      ["普遍性を持つ", "Fuhensei o motsu", "memiliki universalitas"],
      ["知見を蓄積する", "Chiken o chikuseki suru", "menghimpun temuan"],
      ["枠組みを再構築する", "Wakugumi o saikouchiku suru", "merekonstruksi kerangka"],
      ["前提が崩れる", "Zentei ga kuzureru", "premisnya runtuh", ["Kata 妥当性 paling dekat maknanya dengan...", "kesahihan / kelayakan", "kecepatan", "kesederhanaan", "keindahan"]],
    ],
    [
      ["本研究は、従来の理論の普遍性に疑問を投げかけるものである。", "Hon kenkyuu wa, juurai no riron no fuhensei ni gimon o nagekakeru mono de aru.", "Penelitian ini mempertanyakan universalitas teori yang ada selama ini."],
      ["現場で得られた知見を蓄積し、共有する仕組みが求められる。", "Genba de erareta chiken o chikuseki shi, kyouyuu suru shikumi ga motomerareru.", "Dibutuhkan mekanisme untuk menghimpun dan membagikan temuan dari lapangan."],
      ["調査の前提が崩れれば、結論の妥当性も揺らぐ。", "Chousa no zentei ga kuzurereba, ketsuron no datousei mo yuragu.", "Jika premis survei runtuh, kesahihan kesimpulan pun goyah.", ["Menurut kalimat itu, jika premis runtuh maka...", "kesahihan kesimpulan goyah", "kesimpulan makin kuat", "survei otomatis selesai", "data bertambah"]],
      ["既存の枠組みでは、この現象を十分に説明できない。", "Kizon no wakugumi de wa, kono genshou o juubun ni setsumei dekinai.", "Dengan kerangka yang ada, fenomena ini tidak bisa dijelaskan secara memadai."],
    ],
  ],
  // 2. Istilah kebijakan
  [
    [
      ["規制緩和を進める", "Kisei kanwa o susumeru", "mendorong deregulasi"],
      ["財源が乏しい", "Zaigen ga toboshii", "sumber dananya minim"],
      ["是正を求める", "Zesei o motomeru", "menuntut koreksi"],
      ["抜本的な見直し", "Bapponteki na minaoshi", "peninjauan ulang secara mendasar", ["Kata 抜本的 berarti...", "mendasar / sampai ke akar", "sementara", "sebagian kecil", "simbolis"]],
    ],
    [
      ["政府は、新規参入を促すため規制緩和を進める方針だ。", "Seifu wa, shinki sannyuu o unagasu tame kisei kanwa o susumeru houshin da.", "Pemerintah berencana mendorong deregulasi untuk mendorong masuknya pelaku baru."],
      ["地方自治体の多くは財源が乏しく、独自の施策を打ち出しにくい。", "Chihou jichitai no ooku wa zaigen ga toboshiku, dokuji no shisaku o uchidashinikui.", "Banyak pemerintah daerah minim sumber dana sehingga sulit meluncurkan kebijakan sendiri.", ["Menurut kalimat itu, pemerintah daerah sulit membuat kebijakan sendiri karena...", "sumber dananya minim", "terlalu banyak pegawai", "tidak ada masalah", "dilarang pusat"]],
      ["男女の賃金格差について、国際機関が日本に是正を求めた。", "Danjo no chingin kakusa ni tsuite, kokusai kikan ga Nihon ni zesei o motometa.", "Mengenai kesenjangan upah pria dan wanita, lembaga internasional menuntut Jepang melakukan koreksi."],
      ["年金制度は、抜本的な見直しを迫られている。", "Nenkin seido wa, bapponteki na minaoshi o semararete iru.", "Sistem pensiun didesak untuk ditinjau ulang secara mendasar."],
    ],
  ],
  // 3. Kata kerja penelitian
  [
    [
      ["メカニズムを解明する", "Mekanizumu o kaimei suru", "mengungkap mekanisme"],
      ["因果関係を立証する", "Inga kankei o risshou suru", "membuktikan hubungan sebab-akibat"],
      ["先行研究を援用する", "Senkou kenkyuu o enyou suru", "merujuk penelitian terdahulu"],
      ["結果が示唆するところ", "Kekka ga shisa suru tokoro", "apa yang diisyaratkan hasil", ["Kata kerja 立証する berarti...", "membuktikan", "meragukan", "menyembunyikan", "menyederhanakan"]],
    ],
    [
      ["研究チームは、記憶が定着するメカニズムの一端を解明した。", "Kenkyuu chiimu wa, kioku ga teichaku suru mekanizumu no ittan o kaimei shita.", "Tim peneliti mengungkap sebagian mekanisme melekatnya ingatan."],
      ["喫煙と疾患の因果関係を立証するには、長期的な追跡調査が必要だ。", "Kitsuen to shikkan no inga kankei o risshou suru ni wa, choukiteki na tsuiseki chousa ga hitsuyou da.", "Untuk membuktikan hubungan sebab-akibat merokok dan penyakit, diperlukan survei pelacakan jangka panjang.", ["Menurut kalimat itu, untuk membuktikan hubungan sebab-akibat diperlukan...", "survei pelacakan jangka panjang", "satu kali wawancara", "pendapat ahli saja", "data satu hari"]],
      ["本稿では、社会学の理論を教育の分野に援用する。", "Honkou de wa, shakaigaku no riron o kyouiku no bunya ni enyou suru.", "Dalam tulisan ini, teori sosiologi dipinjam untuk bidang pendidikan."],
      ["この結果は、従来の定説を覆すものと言える。", "Kono kekka wa, juurai no teisetsu o kutsugaesu mono to ieru.", "Hasil ini bisa dikatakan menjungkirbalikkan teori yang mapan selama ini."],
    ],
  ],
  // 4. Penghubung retoris
  [
    [
      ["のみならず〜も", "Nominarazu ~ mo", "bukan hanya ... tetapi juga"],
      ["ひいては〜にもつながる", "Hiite wa ~ ni mo tsunagaru", "pada gilirannya juga berujung pada"],
      ["さりとて〜わけにもいかない", "Saritote ~ wake ni mo ikanai", "meski demikian, tidak bisa juga ..."],
      ["いわんや〜をや", "Iwan ya ~ o ya", "apalagi ..."],
    ],
    [
      ["この問題は、若者のみならず高齢者にも深刻な影響を与えている。", "Kono mondai wa, wakamono nominarazu koureisha ni mo shinkoku na eikyou o ataete iru.", "Masalah ini berdampak serius bukan hanya pada anak muda, tetapi juga lansia."],
      ["一人ひとりの節電が、ひいては地球環境の保護にもつながる。", "Hitori hitori no setsuden ga, hiite wa chikyuu kankyou no hogo ni mo tsunagaru.", "Penghematan listrik tiap orang pada gilirannya juga berujung pada perlindungan lingkungan bumi."],
      ["反対意見は多いが、さりとて計画を白紙に戻すわけにもいかない。", "Hantai iken wa ooi ga, saritote keikaku o hakushi ni modosu wake ni mo ikanai.", "Pendapat yang menentang banyak, meski demikian rencana tidak bisa dibatalkan begitu saja.", ["Sikap pembicara terhadap rencana itu adalah...", "tidak bisa membatalkannya meski banyak penentang", "langsung membatalkannya", "tidak tahu ada penentang", "senang rencana dibatalkan"]],
      ["専門家でさえ判断に迷うのだから、いわんや素人をや。", "Senmonka de sae handan ni mayou no da kara, iwan ya shirouto o ya.", "Ahli saja bingung memutuskan, apalagi orang awam."],
    ],
  ],
  // 5. Register hukum
  [
    [
      ["準拠法", "Junkyohou", "hukum yang berlaku (yang dirujuk)"],
      ["義務を履行する", "Gimu o rikou suru", "melaksanakan kewajiban"],
      ["法に抵触する恐れ", "Hou ni teishoku suru osore", "risiko melanggar hukum"],
      ["瑕疵担保責任", "Kashi tanpo sekinin", "tanggung jawab atas cacat tersembunyi", ["Kata 遵守 berarti...", "mematuhi", "melanggar", "mengubah", "menafsirkan"]],
    ],
    [
      ["本契約の準拠法は、日本法とする。", "Hon keiyaku no junkyohou wa, Nihon hou to suru.", "Hukum yang berlaku untuk kontrak ini adalah hukum Jepang."],
      ["売主が義務を履行しない場合、買主は契約を解除できる。", "Urinushi ga gimu o rikou shinai baai, kainushi wa keiyaku o kaijo dekiru.", "Jika penjual tidak melaksanakan kewajibannya, pembeli dapat memutus kontrak.", ["Menurut ketentuan itu, pembeli dapat memutus kontrak bila...", "penjual tidak melaksanakan kewajiban", "pembeli berubah pikiran", "harga naik", "barang terlambat satu jam"]],
      ["この広告表現は、景品表示法に抵触する恐れがある。", "Kono koukoku hyougen wa, keihin hyoujihou ni teishoku suru osore ga aru.", "Ungkapan iklan ini berisiko melanggar undang-undang tentang label dan hadiah."],
      ["引き渡し後に瑕疵が見つかった場合は、無償で修補する。", "Hikiwatashigo ni kashi ga mitsukatta baai wa, mushou de shuuho suru.", "Jika ditemukan cacat setelah serah terima, perbaikan dilakukan tanpa biaya."],
    ],
  ],
  // 6. Kritik media
  [
    [
      ["不安を煽る", "Fuan o aoru", "mengobarkan kecemasan"],
      ["報道の中立性", "Houdou no chuuritsusei", "netralitas pemberitaan"],
      ["事実確認を怠る", "Jijitsu kakunin o okotaru", "lalai memeriksa fakta"],
      ["切り取り報道", "Kiritori houdou", "pemberitaan yang memotong konteks", ["Istilah 偏向報道 berarti...", "pemberitaan yang bias", "pemberitaan langsung", "pemberitaan cuaca", "pemberitaan resmi pemerintah"]],
    ],
    [
      ["過剰な見出しは、いたずらに読者の不安を煽る。", "Kajou na midashi wa, itazura ni dokusha no fuan o aoru.", "Judul yang berlebihan mengobarkan kecemasan pembaca tanpa alasan."],
      ["報道の中立性は、民主主義を支える柱の一つだ。", "Houdou no chuuritsusei wa, minshushugi o sasaeru hashira no hitotsu da.", "Netralitas pemberitaan adalah salah satu pilar penopang demokrasi."],
      ["速報を急ぐあまり、事実確認を怠ったことが誤報の原因だった。", "Sokuhou o isogu amari, jijitsu kakunin o okotatta koto ga gohou no genin datta.", "Penyebab berita keliru itu adalah lalai memeriksa fakta karena terlalu terburu-buru menyiarkan kabar kilat.", ["Menurut kalimat itu, penyebab berita keliru adalah...", "lalai memeriksa fakta karena terburu-buru", "narasumber berbohong", "kesalahan cetak", "sensor pemerintah"]],
      ["発言の一部だけを切り取った報道は、誤解を招きやすい。", "Hatsugen no ichibu dake o kiritotta houdou wa, gokai o manekiyasui.", "Pemberitaan yang hanya memotong sebagian pernyataan mudah menimbulkan salah paham."],
    ],
  ],
  // 7. Etika
  [
    [
      ["倫理観が問われる", "Rinrikan ga towareru", "pandangan etisnya dipertanyakan"],
      ["尊厳を守る", "Songen o mamoru", "menjaga martabat"],
      ["公正さを欠く", "Kouseisa o kaku", "kurang adil"],
      ["良心の呵責", "Ryoushin no kashaku", "rasa bersalah / siksaan hati nurani", ["Kata 葛藤 berarti...", "konflik batin", "kebahagiaan", "kemenangan", "kebosanan"]],
    ],
    [
      ["遺伝子編集の研究では、研究者の倫理観が問われている。", "Idenshi henshuu no kenkyuu de wa, kenkyuusha no rinrikan ga towarete iru.", "Dalam penelitian penyuntingan gen, pandangan etis peneliti dipertanyakan."],
      ["終末期医療では、患者の尊厳を守ることが何より重要だ。", "Shuumatsuki iryou de wa, kanja no songen o mamoru koto ga nani yori juuyou da.", "Dalam perawatan menjelang ajal, menjaga martabat pasien adalah yang terpenting."],
      ["一部の受験生だけを優遇するのは、公正さを欠く。", "Ichibu no jukensei dake o yuuguu suru no wa, kouseisa o kaku.", "Mengistimewakan sebagian peserta ujian saja itu kurang adil."],
      ["彼は嘘をついたことに、長年良心の呵責を感じていた。", "Kare wa uso o tsuita koto ni, naganen ryoushin no kashaku o kanjite ita.", "Bertahun-tahun dia merasa tersiksa hati nuraninya karena telah berbohong.", ["Perasaan pria itu selama bertahun-tahun adalah...", "rasa bersalah", "bangga", "lega", "marah pada orang lain"]],
    ],
  ],
  // 8. Ekonomi
  [
    [
      ["景気の先行き", "Keiki no sakiyuki", "prospek perekonomian"],
      ["需要が冷え込む", "Juyou ga hiekomu", "permintaan mendingin"],
      ["物価上昇率", "Bukka joushouritsu", "tingkat inflasi"],
      ["回復の兆し", "Kaifuku no kizashi", "tanda-tanda pemulihan", ["Ungkapan 需給が逼迫する berarti...", "pasokan tidak mencukupi permintaan", "pasokan berlebihan", "harga turun tajam", "pasar ditutup"]],
    ],
    [
      ["景気の先行きに対する不透明感が強まっている。", "Keiki no sakiyuki ni taisuru futoumeikan ga tsuyomatte iru.", "Ketidakpastian terhadap prospek perekonomian semakin menguat."],
      ["金利の上昇で、住宅の需要が冷え込んでいる。", "Kinri no joushou de, juutaku no juyou ga hiekonde iru.", "Akibat kenaikan suku bunga, permintaan perumahan mendingin.", ["Menurut kalimat itu, penyebab permintaan perumahan mendingin adalah...", "kenaikan suku bunga", "harga rumah turun", "penduduk bertambah", "gaji naik"]],
      ["物価上昇率は、日銀の目標である二パーセントを上回った。", "Bukka joushouritsu wa, Nichigin no mokuhyou de aru ni paasento o uwamawatta.", "Tingkat inflasi melampaui target Bank of Japan sebesar dua persen."],
      ["観光業には、ようやく回復の兆しが見えてきた。", "Kankougyou ni wa, youyaku kaifuku no kizashi ga miete kita.", "Industri pariwisata akhirnya mulai menunjukkan tanda-tanda pemulihan."],
    ],
  ],
  // 9. Teknologi
  [
    [
      ["汎用人工知能", "Hanyou jinkou chinou", "kecerdasan buatan umum"],
      ["脆弱性を修正する", "Zeijakusei o shuusei suru", "memperbaiki kerentanan"],
      ["演算能力", "Enzan nouryoku", "kemampuan komputasi"],
      ["社会実装", "Shakai jissou", "penerapan di masyarakat", ["Kata 脆弱性 dalam konteks teknologi berarti...", "kerentanan (keamanan)", "kecepatan", "kapasitas memori", "desain tampilan"]],
    ],
    [
      ["汎用人工知能の実現時期については、専門家の間でも意見が分かれる。", "Hanyou jinkou chinou no jitsugen jiki ni tsuite wa, senmonka no aida de mo iken ga wakareru.", "Mengenai kapan kecerdasan buatan umum terwujud, para ahli pun berbeda pendapat."],
      ["開発元は、発見された脆弱性を修正するパッチを公開した。", "Kaihatsumoto wa, hakken sareta zeijakusei o shuusei suru pacchi o koukai shita.", "Pengembang merilis tambalan untuk memperbaiki kerentanan yang ditemukan.", ["Yang dirilis pengembang adalah...", "tambalan untuk memperbaiki kerentanan", "versi produk baru", "laporan keuangan", "iklan"]],
      ["量子コンピューターは、従来とは桁違いの演算能力を持つ。", "Ryoushi konpyuutaa wa, juurai to wa ketachigai no enzan nouryoku o motsu.", "Komputer kuantum memiliki kemampuan komputasi yang jauh berlipat dibanding sebelumnya."],
      ["自動運転の社会実装には、法整備が欠かせない。", "Jidou unten no shakai jissou ni wa, hou seibi ga kakasenai.", "Untuk penerapan mengemudi otomatis di masyarakat, penyusunan hukum tidak bisa diabaikan."],
    ],
  ],
  // 10. Lingkungan
  [
    [
      ["温室効果ガス", "Onshitsu kouka gasu", "gas rumah kaca"],
      ["生物多様性", "Seibutsu tayousei", "keanekaragaman hayati"],
      ["脱炭素", "Datsutanso", "dekarbonisasi"],
      ["水資源の枯渇", "Mizushigen no kokatsu", "habisnya sumber daya air", ["Istilah 循環型社会 berarti masyarakat yang...", "berbasis daur ulang sumber daya", "berpindah-pindah tempat", "tanpa teknologi", "hanya bertani"]],
    ],
    [
      ["温室効果ガスの排出を、二〇五〇年までに実質ゼロにする目標が掲げられた。", "Onshitsu kouka gasu no haishutsu o, nisen gojuu nen made ni jisshitsu zero ni suru mokuhyou ga kakagerareta.", "Dicanangkan target emisi gas rumah kaca nol bersih pada tahun 2050.", ["Target emisi nol bersih ditetapkan untuk tahun...", "2050", "2030", "2025", "2100"]],
      ["開発による森林の減少は、生物多様性を脅かしている。", "Kaihatsu ni yoru shinrin no genshou wa, seibutsu tayousei o obiyakashite iru.", "Berkurangnya hutan akibat pembangunan mengancam keanekaragaman hayati."],
      ["脱炭素社会の実現には、再生可能エネルギーの拡大が不可欠だ。", "Datsutanso shakai no jitsugen ni wa, saisei kanou enerugii no kakudai ga fukaketsu da.", "Untuk mewujudkan masyarakat dekarbonisasi, perluasan energi terbarukan mutlak diperlukan."],
      ["気候変動により、水資源の枯渇が懸念される地域が増えている。", "Kikou hendou ni yori, mizushigen no kokatsu ga kenen sareru chiiki ga fuete iru.", "Akibat perubahan iklim, wilayah yang dikhawatirkan kehabisan sumber daya air bertambah."],
    ],
  ],
  // 11. Sastra
  [
    [
      ["情景描写", "Joukei byousha", "penggambaran suasana"],
      ["伏線を回収する", "Fukusen o kaishuu suru", "menuntaskan petunjuk tersembunyi"],
      ["文体に味わいがある", "Buntai ni ajiwai ga aru", "gaya bahasanya bercita rasa"],
      ["行間を読む", "Gyoukan o yomu", "membaca yang tersirat", ["Ungkapan 余韻が残る berarti...", "kesannya masih membekas", "ceritanya membosankan", "ceritanya terlalu panjang", "tulisannya penuh kesalahan"]],
    ],
    [
      ["冒頭の情景描写が、物語全体の雰囲気を決定づけている。", "Boutou no joukei byousha ga, monogatari zentai no funiki o ketteizukete iru.", "Penggambaran suasana di awal menentukan atmosfer keseluruhan cerita."],
      ["終盤で伏線が見事に回収され、読者は思わず息をのむ。", "Shuuban de fukusen ga migoto ni kaishuu sare, dokusha wa omowazu iki o nomu.", "Di bagian akhir, petunjuk tersembunyi dituntaskan dengan apik hingga pembaca tanpa sadar menahan napas."],
      ["淡々とした文体の中に、作者の深い悲しみがにじみ出ている。", "Tantan to shita buntai no naka ni, sakusha no fukai kanashimi ga nijimidete iru.", "Di balik gaya bahasa yang datar, kesedihan mendalam pengarang merembes keluar.", ["Menurut kalimat itu, yang tersirat di balik gaya bahasa datar adalah...", "kesedihan mendalam pengarang", "kegembiraan pengarang", "kemarahan tokoh utama", "kebosanan pembaca"]],
      ["詩を味わうには、行間を読む想像力が必要だ。", "Shi o ajiwau ni wa, gyoukan o yomu souzouryoku ga hitsuyou da.", "Untuk menikmati puisi, diperlukan daya imajinasi untuk membaca yang tersirat."],
    ],
  ],
  // 12. Filsafat
  [
    [
      ["自己同一性", "Jiko douitsusei", "identitas diri"],
      ["自由意志", "Jiyuu ishi", "kehendak bebas"],
      ["本質を見抜く", "Honshitsu o minuku", "menembus hakikat"],
      ["価値観の相対化", "Kachikan no soutaika", "relativisasi nilai", ["Kata 超越する berarti...", "melampaui", "mengikuti", "menolak", "meniru"]],
    ],
    [
      ["人は他者との関係の中で、自己同一性を形成していく。", "Hito wa tasha to no kankei no naka de, jiko douitsusei o keisei shite iku.", "Manusia membentuk identitas dirinya dalam hubungan dengan orang lain."],
      ["脳科学の進歩は、自由意志の存在に新たな問いを投げかけている。", "Nou kagaku no shinpo wa, jiyuu ishi no sonzai ni arata na toi o nagekakete iru.", "Kemajuan ilmu otak melontarkan pertanyaan baru tentang keberadaan kehendak bebas."],
      ["表面的な現象にとらわれず、物事の本質を見抜く力を養いたい。", "Hyoumenteki na genshou ni torawarezu, monogoto no honshitsu o minuku chikara o yashinaitai.", "Saya ingin memupuk kemampuan menembus hakikat sesuatu tanpa terpaku pada fenomena di permukaan."],
      ["異文化に触れることは、自らの価値観を相対化する契機となる。", "Ibunka ni fureru koto wa, mizukara no kachikan o soutaika suru keiki to naru.", "Bersentuhan dengan budaya lain menjadi kesempatan untuk merelatifkan nilai-nilai sendiri.", ["Menurut kalimat itu, bersentuhan dengan budaya lain menjadi kesempatan untuk...", "merelatifkan nilai-nilai sendiri", "meninggalkan budaya sendiri", "menolak budaya lain", "menghafal bahasa asing"]],
    ],
  ],
  // 13. Keigo tingkat tinggi
  [
    [
      ["ご臨席を賜る", "Gorinseki o tamawaru", "berkenan hadir (sangat hormat)"],
      ["ご笑納ください", "Goshounou kudasai", "mohon diterima (hadiah kecil)"],
      ["ご自愛ください", "Gojiai kudasai", "mohon jaga kesehatan"],
      ["拝受いたしました", "Haiju itashimashita", "telah saya terima (sangat hormat)", ["Ungkapan ご査収ください dipakai saat...", "meminta penerima memeriksa dan menerima dokumen", "meminta maaf", "mengundang makan", "menolak permintaan"]],
    ],
    [
      ["本日はご多用の中、ご臨席を賜り、誠にありがとうございます。", "Honjitsu wa gotayou no naka, gorinseki o tamawari, makoto ni arigatou gozaimasu.", "Terima kasih banyak telah berkenan hadir hari ini di tengah kesibukan Anda."],
      ["心ばかりの品ですが、どうぞご笑納ください。", "Kokorobakari no shina desu ga, douzo goshounou kudasai.", "Ini hanya sekadar tanda hati, mohon diterima.", ["Ungkapan ご笑納ください dipakai saat...", "memberikan hadiah dengan rendah hati", "meminta pembayaran", "menolak hadiah", "meminta maaf atas kesalahan"]],
      ["季節の変わり目ですので、どうぞご自愛ください。", "Kisetsu no kawarime desu node, douzo gojiai kudasai.", "Karena sedang pergantian musim, mohon jaga kesehatan Anda."],
      ["お送りいただいた資料、確かに拝受いたしました。", "Ookuri itadaita shiryou, tashika ni haiju itashimashita.", "Materi yang Anda kirimkan telah saya terima dengan baik."],
    ],
  ],
  // 14. Idiom N1
  [
    [
      ["肝に銘じる", "Kimo ni meijiru", "menanamkan dalam hati"],
      ["白羽の矢が立つ", "Shiraha no ya ga tatsu", "terpilih (untuk tugas)"],
      ["二の足を踏む", "Ni no ashi o fumu", "ragu-ragu melangkah"],
      ["固唾をのむ", "Katazu o nomu", "menahan napas (tegang)", ["Idiom 襟を正す berarti...", "membenahi sikap dengan serius", "merapikan pakaian saja", "meminta maaf", "pergi diam-diam"]],
    ],
    [
      ["先輩の忠告を肝に銘じて、同じ失敗は繰り返さない。", "Senpai no chuukoku o kimo ni meijite, onaji shippai wa kurikaesanai.", "Saya menanamkan nasihat senior dalam hati dan tidak akan mengulangi kegagalan yang sama."],
      ["新プロジェクトのリーダーとして、入社三年目の彼に白羽の矢が立った。", "Shin purojekuto no riidaa to shite, nyuusha sannenme no kare ni shiraha no ya ga tatta.", "Dia yang baru tiga tahun bekerja terpilih sebagai pemimpin proyek baru.", ["Makna kalimat itu adalah pria tersebut...", "terpilih menjadi pemimpin proyek", "dipecat", "menolak proyek", "pindah perusahaan"]],
      ["費用が高額なため、導入に二の足を踏む企業も多い。", "Hiyou ga kougaku na tame, dounyuu ni ni no ashi o fumu kigyou mo ooi.", "Karena biayanya mahal, banyak perusahaan yang ragu-ragu menerapkannya."],
      ["観客は固唾をのんで、最後のシュートを見守った。", "Kankyaku wa katazu o nonde, saigo no shuuto o mimamotta.", "Penonton menahan napas menyaksikan tembakan terakhir."],
    ],
  ],
  // 15. Yojijukugo
  [
    [
      ["一長一短", "Icchou ittan", "ada kelebihan dan kekurangan"],
      ["臨機応変", "Rinki ouhen", "menyesuaikan dengan keadaan"],
      ["前代未聞", "Zendai mimon", "belum pernah terjadi sebelumnya"],
      ["自業自得", "Jigou jitoku", "menuai akibat perbuatan sendiri", ["Yojijukugo 本末転倒 berarti...", "memutarbalikkan prioritas", "berhasil sempurna", "sejak awal sampai akhir", "berganti-ganti pikiran"]],
    ],
    [
      ["どちらの案も一長一短で、簡単には決められない。", "Dochira no an mo icchou ittan de, kantan ni wa kimerarenai.", "Kedua usulan sama-sama ada kelebihan dan kekurangannya, sehingga tidak mudah diputuskan."],
      ["マニュアルに頼らず、臨機応変に対応することが求められる。", "Manyuaru ni tayorazu, rinki ouhen ni taiou suru koto ga motomerareru.", "Dituntut untuk menangani dengan menyesuaikan keadaan tanpa bergantung pada manual."],
      ["現職の大臣が逮捕されるという前代未聞の事態となった。", "Genshoku no daijin ga taiho sareru to iu zendai mimon no jitai to natta.", "Terjadi peristiwa yang belum pernah ada sebelumnya, yaitu menteri yang sedang menjabat ditangkap.", ["Arti 前代未聞 dalam kalimat itu adalah...", "belum pernah terjadi sebelumnya", "sudah sering terjadi", "sudah diperkirakan", "tidak penting"]],
      ["準備を怠って失敗したのだから、自業自得だ。", "Junbi o okotatte shippai shita no da kara, jigou jitoku da.", "Gagal karena lalai bersiap, itu akibat perbuatan sendiri."],
    ],
  ],
  // 16. Kanji N1
  [
    [
      ["懸念を払拭する", "Kenen o fusshoku suru", "menghapus kekhawatiran"],
      ["均衡が崩れる", "Kinkou ga kuzureru", "keseimbangan runtuh"],
      ["措置を講じる", "Sochi o koujiru", "mengambil tindakan"],
      ["顕著な傾向", "Kencho na keikou", "kecenderungan yang mencolok", ["Bacaan kanji 拮抗 adalah...", "kikkou", "kitsukou", "kekkou", "kikou"]],
    ],
    [
      ["政府は、市場の懸念を払拭するため緊急会見を開いた。", "Seifu wa, shijou no kenen o fusshoku suru tame kinkyuu kaiken o hiraita.", "Pemerintah menggelar konferensi pers darurat untuk menghapus kekhawatiran pasar."],
      ["一国の撤退により、地域の力の均衡が崩れかねない。", "Ikkoku no tettai ni yori, chiiki no chikara no kinkou ga kuzurekanenai.", "Penarikan satu negara bisa saja meruntuhkan keseimbangan kekuatan di kawasan."],
      ["被害の拡大を防ぐため、直ちに必要な措置を講じるべきだ。", "Higai no kakudai o fusegu tame, tadachi ni hitsuyou na sochi o koujiru beki da.", "Untuk mencegah meluasnya kerugian, tindakan yang diperlukan harus segera diambil."],
      ["都市部への人口集中は、近年ますます顕著になっている。", "Toshibu e no jinkou shuuchuu wa, kinnen masumasu kencho ni natte iru.", "Pemusatan penduduk ke perkotaan makin mencolok belakangan ini.", ["Menurut kalimat itu, hal yang makin mencolok adalah...", "pemusatan penduduk ke perkotaan", "penurunan harga rumah", "migrasi ke desa", "kenaikan angka kelahiran"]],
    ],
  ],
  // 17. Penanda sikap
  [
    [
      ["到底〜ない", "Toutei ~ nai", "sama sekali tidak mungkin"],
      ["あながち〜ない", "Anagachi ~ nai", "tidak sepenuhnya"],
      ["いささか", "Isasaka", "sedikit / agak"],
      ["甚だ", "Hanahada", "sangat (formal)", ["Kata あながち biasanya diikuti oleh...", "bentuk negatif (〜ない)", "bentuk perintah", "bentuk lampau positif", "bentuk ajakan"]],
    ],
    [
      ["この金額では、到底生活できない。", "Kono kingaku de wa, toutei seikatsu dekinai.", "Dengan jumlah uang ini, sama sekali tidak mungkin bisa hidup."],
      ["彼の予想は、あながち外れてもいなかった。", "Kare no yosou wa, anagachi hazurete mo inakatta.", "Perkiraannya tidak sepenuhnya meleset.", ["Makna kalimat itu adalah perkiraan pria itu...", "sebagian ada benarnya", "sepenuhnya salah", "tepat seratus persen", "tidak pernah dibuat"]],
      ["その説明には、いささか無理があるように思う。", "Sono setsumei ni wa, isasaka muri ga aru you ni omou.", "Saya rasa penjelasan itu agak dipaksakan."],
      ["公の場でのあのような発言は、甚だ不適切である。", "Ooyake no ba de no ano you na hatsugen wa, hanahada futekisetsu de aru.", "Pernyataan seperti itu di tempat umum sangat tidak pantas."],
    ],
  ],
  // 18. Kata sifat bernuansa
  [
    [
      ["曖昧な態度", "Aimai na taido", "sikap yang tidak jelas"],
      ["緻密な分析", "Chimitsu na bunseki", "analisis yang cermat"],
      ["冗長な説明", "Jouchou na setsumei", "penjelasan yang bertele-tele"],
      ["安易な判断", "Ani na handan", "keputusan yang gegabah", ["Kata 杜撰 bermakna...", "ceroboh / asal-asalan", "teliti", "indah", "mahal"]],
    ],
    [
      ["会社側の曖昧な態度が、社員の不信感を招いた。", "Kaishagawa no aimai na taido ga, shain no fushinkan o maneita.", "Sikap perusahaan yang tidak jelas menimbulkan rasa tidak percaya karyawan."],
      ["緻密な分析に基づいた提言は、説得力がある。", "Chimitsu na bunseki ni motozuita teigen wa, settokuryoku ga aru.", "Usulan yang berdasarkan analisis cermat itu meyakinkan."],
      ["冗長な説明を省いて、要点だけを伝えてほしい。", "Jouchou na setsumei o habuite, youten dake o tsutaete hoshii.", "Saya ingin penjelasan bertele-tele dihilangkan dan hanya poin pentingnya yang disampaikan.", ["Permintaan pembicara adalah...", "hanya menyampaikan poin penting", "menjelaskan lebih panjang", "menambah contoh", "mengulang dari awal"]],
      ["数字だけを見て結論を出すのは、安易な判断と言わざるを得ない。", "Suuji dake o mite ketsuron o dasu no wa, ani na handan to iwazaru o enai.", "Menarik kesimpulan hanya dari angka terpaksa dikatakan sebagai keputusan yang gegabah."],
    ],
  ],
  // 19. Kata kerja abstrak
  [
    [
      ["協調性を培う", "Kyouchousei o tsuchikau", "memupuk kemampuan bekerja sama"],
      ["役割を担う", "Yakuwari o ninau", "mengemban peran"],
      ["自立を促す", "Jiritsu o unagasu", "mendorong kemandirian"],
      ["健康を損なう", "Kenkou o sokonau", "merusak kesehatan", ["Kata kerja 阻む berarti...", "menghalangi", "mendorong", "memupuk", "mengemban"]],
    ],
    [
      ["部活動を通じて、子どもたちは協調性を培っていく。", "Bukatsudou o tsuujite, kodomotachi wa kyouchousei o tsuchikatte iku.", "Melalui kegiatan klub, anak-anak memupuk kemampuan bekerja sama."],
      ["地方の中小企業は、地域経済を支える重要な役割を担っている。", "Chihou no chuushou kigyou wa, chiiki keizai o sasaeru juuyou na yakuwari o ninatte iru.", "Usaha kecil dan menengah di daerah mengemban peran penting menopang ekonomi lokal."],
      ["過度な手助けは、かえって子どもの自立を阻む。", "Kado na tedasuke wa, kaette kodomo no jiritsu o habamu.", "Bantuan yang berlebihan justru menghalangi kemandirian anak.", ["Menurut kalimat itu, bantuan berlebihan justru...", "menghalangi kemandirian anak", "mendorong kemandirian anak", "membuat anak lebih pintar", "tidak berpengaruh"]],
      ["睡眠不足が続くと、健康を損なうおそれがある。", "Suimin busoku ga tsuzuku to, kenkou o sokonau osore ga aru.", "Jika kurang tidur terus berlanjut, kesehatan bisa rusak."],
    ],
  ],
  // 20. Ulasan kosakata N1
  [
    [
      ["波紋を呼ぶ", "Hamon o yobu", "menimbulkan riak (reaksi)"],
      ["危機感を募らせる", "Kikikan o tsunoraseru", "rasa krisis makin memuncak"],
      ["歯止めをかける", "Hadome o kakeru", "mengerem / menghentikan laju"],
      ["一線を画す", "Issen o kakusu", "menarik garis pemisah / berbeda jelas", ["Ungkapan 物議を醸す berarti...", "menimbulkan kontroversi", "menyelesaikan masalah", "menyatukan pendapat", "membuat orang tertawa"]],
    ],
    [
      ["大臣の不用意な発言が、国内外に波紋を呼んでいる。", "Daijin no fuyoui na hatsugen ga, kokunaigai ni hamon o yonde iru.", "Pernyataan ceroboh menteri menimbulkan riak reaksi di dalam dan luar negeri."],
      ["少子化に歯止めをかけるため、政府は新たな対策を打ち出した。", "Shoushika ni hadome o kakeru tame, seifu wa arata na taisaku o uchidashita.", "Untuk mengerem penurunan angka kelahiran, pemerintah meluncurkan langkah baru.", ["Tujuan langkah baru pemerintah adalah...", "mengerem penurunan angka kelahiran", "menaikkan pajak", "mengurangi sekolah", "menambah lansia"]],
      ["人口流出が続く町では、住民が危機感を募らせている。", "Jinkou ryuushutsu ga tsuzuku machi de wa, juumin ga kikikan o tsunorasete iru.", "Di kota yang penduduknya terus keluar, rasa krisis warga makin memuncak."],
      ["彼の作品は、従来のミステリーとは一線を画している。", "Kare no sakuhin wa, juurai no misuterii to wa issen o kakushite iru.", "Karyanya jelas berbeda dari cerita misteri pada umumnya."],
    ],
  ],
];
