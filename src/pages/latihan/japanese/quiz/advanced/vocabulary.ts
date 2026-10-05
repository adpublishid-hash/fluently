import type { JapaneseQuizTopic } from '../types';

// Latihan Vocabulary N2 — one entry per topic (index = topic - 1): [Basic, Advanced].
export const vocabulary: JapaneseQuizTopic[] = [
  // 1. Kata benda abstrak
  [
    [
      ["価値観が異なる", "Kachikan ga kotonaru", "nilai-nilainya berbeda"],
      ["存在意義", "Sonzai igi", "makna keberadaan"],
      ["抽象的な議論", "Chuushouteki na giron", "diskusi yang abstrak"],
      ["根本的な原因", "Konponteki na gen-in", "penyebab mendasar", ["Lawan kata 抽象的 (abstrak) adalah...", "具体的", "根本的", "一般的", "積極的"]],
    ],
    [
      ["世代によって価値観が異なるのは当然のことだ。", "Sedai ni yotte kachikan ga kotonaru no wa touzen no koto da.", "Wajar jika nilai-nilai berbeda menurut generasi."],
      ["抽象的な議論ばかりでは、具体的な解決策は生まれない。", "Chuushouteki na giron bakari de wa, gutaiteki na kaiketsusaku wa umarenai.", "Kalau hanya diskusi abstrak, solusi konkret tidak akan lahir."],
      ["問題の根本的な原因を突き止める必要がある。", "Mondai no konponteki na gen-in o tsukitomeru hitsuyou ga aru.", "Penyebab mendasar masalah itu perlu diungkap."],
      ["働くことの意味を改めて問い直したい。", "Hataraku koto no imi o aratamete toinaoshitai.", "Saya ingin mempertanyakan kembali makna bekerja."],
    ],
  ],
  // 2. Kebijakan
  [
    [
      ["減税措置", "Genzei sochi", "langkah pengurangan pajak"],
      ["補助金を出す", "Hojokin o dasu", "memberikan subsidi"],
      ["規制が強化される", "Kisei ga kyouka sareru", "regulasi diperketat"],
      ["見直しを迫られる", "Minaoshi o semarareru", "didesak untuk meninjau ulang", ["Lawan kata 規制を緩和する (melonggarkan regulasi) adalah...", "規制を強化する", "規制を施行する", "規制を廃止する", "規制を導入する"]],
    ],
    [
      ["政府は子育て世帯に補助金を出すことを決めた。", "Seifu wa kosodate setai ni hojokin o dasu koto o kimeta.", "Pemerintah memutuskan memberi subsidi kepada keluarga yang mengasuh anak."],
      ["飲酒運転に対する規制が強化された。", "Inshu unten ni taisuru kisei ga kyouka sareta.", "Regulasi terhadap mengemudi dalam keadaan mabuk diperketat."],
      ["景気対策として、一時的な減税措置が取られた。", "Keiki taisaku to shite, ichijiteki na genzei sochi ga torareta.", "Sebagai langkah ekonomi, diambil kebijakan pengurangan pajak sementara."],
      ["世論の批判を受け、政府は計画の見直しを迫られている。", "Yoron no hihan o uke, seifu wa keikaku no minaoshi o semararete iru.", "Menerima kritik publik, pemerintah didesak meninjau ulang rencana itu."],
    ],
  ],
  // 3. Bisnis
  [
    [
      ["売り上げが落ち込む", "Uriage ga ochikomu", "penjualan merosot"],
      ["新規事業", "Shinki jigyou", "bisnis baru"],
      ["競争が激しい", "Kyousou ga hageshii", "persaingannya ketat"],
      ["赤字になる", "Akaji ni naru", "merugi", ["Lawan kata 赤字 (rugi) adalah...", "黒字", "白字", "青字", "金字"]],
    ],
    [
      ["円高の影響で、輸出企業の売り上げが落ち込んだ。", "Endaka no eikyou de, yushutsu kigyou no uriage ga ochikonda.", "Akibat yen menguat, penjualan perusahaan eksportir merosot."],
      ["当社は来年、海外で新規事業を立ち上げる予定だ。", "Tousha wa rainen, kaigai de shinki jigyou o tachiageru yotei da.", "Perusahaan kami berencana meluncurkan bisnis baru di luar negeri tahun depan."],
      ["スマホ市場は競争が激しく、利益を出すのが難しい。", "Sumaho shijou wa kyousou ga hageshiku, rieki o dasu no ga muzukashii.", "Pasar ponsel pintar persaingannya ketat, sulit meraih untung."],
      ["三年連続の赤字で、経営陣が交代した。", "Sannen renzoku no akaji de, keieijin ga koutai shita.", "Karena merugi tiga tahun berturut-turut, jajaran manajemen diganti."],
    ],
  ],
  // 4. Penelitian
  [
    [
      ["実験を行う", "Jikken o okonau", "melakukan eksperimen"],
      ["先行研究", "Senkou kenkyuu", "penelitian terdahulu"],
      ["結論を導く", "Ketsuron o michibiku", "menarik kesimpulan"],
      ["論文を発表する", "Ronbun o happyou suru", "mempublikasikan makalah", ["Kata 仮説 berarti...", "hipotesis", "kesimpulan", "literatur", "data"]],
    ],
    [
      ["まず先行研究を整理し、問題点を明らかにする。", "Mazu senkou kenkyuu o seiri shi, mondaiten o akiraka ni suru.", "Pertama, penelitian terdahulu disusun untuk memperjelas masalahnya."],
      ["百人を対象に、三か月間の実験を行った。", "Hyakunin o taishou ni, sankagetsukan no jikken o okonatta.", "Eksperimen selama tiga bulan dilakukan terhadap seratus orang."],
      ["得られたデータから、次のような結論を導いた。", "Erareta deeta kara, tsugi no you na ketsuron o michibiita.", "Dari data yang diperoleh, ditarik kesimpulan seperti berikut."],
      ["研究成果は国際学会で発表される予定だ。", "Kenkyuu seika wa kokusai gakkai de happyou sareru yotei da.", "Hasil penelitian dijadwalkan dipresentasikan di konferensi internasional."],
    ],
  ],
  // 5. Data
  [
    [
      ["前年比", "Zennenhi", "dibandingkan tahun sebelumnya"],
      ["増加傾向", "Zouka keikou", "kecenderungan meningkat"],
      ["過半数", "Kahansuu", "mayoritas / lebih dari setengah"],
      ["下回る", "Shitamawaru", "di bawah (angka)", ["Lawan kata 上回る (melebihi) adalah...", "下回る", "横ばい", "推移する", "増加する"]],
    ],
    [
      ["今年の観光客数は前年比で一割増えた。", "Kotoshi no kankoukyakusuu wa zennenhi de ichiwari fueta.", "Jumlah wisatawan tahun ini naik sepuluh persen dibanding tahun sebelumnya."],
      ["在宅勤務をする人の数は増加傾向にある。", "Zaitaku kinmu o suru hito no kazu wa zouka keikou ni aru.", "Jumlah orang yang bekerja dari rumah cenderung meningkat."],
      ["回答者の過半数が、現状に不満を持っている。", "Kaitousha no kahansuu ga, genjou ni fuman o motte iru.", "Mayoritas responden tidak puas dengan kondisi saat ini."],
      ["今月の売り上げは目標を大きく下回った。", "Kongetsu no uriage wa mokuhyou o ookiku shitamawatta.", "Penjualan bulan ini jauh di bawah target."],
    ],
  ],
  // 6. Risiko
  [
    [
      ["リスクを避ける", "Risuku o sakeru", "menghindari risiko"],
      ["不安が高まる", "Fuan ga takamaru", "kecemasan meningkat"],
      ["万一に備える", "Man-ichi ni sonaeru", "bersiap untuk kemungkinan terburuk"],
      ["深刻な影響", "Shinkoku na eikyou", "dampak serius", ["Kata 懸念 berarti...", "kekhawatiran", "harapan", "keputusan", "keuntungan"]],
    ],
    [
      ["投資にはリスクがつきものだ。", "Toushi ni wa risuku ga tsukimono da.", "Investasi selalu disertai risiko."],
      ["地震に備えて、非常食を用意しておく。", "Jishin ni sonaete, hijoushoku o youi shite oku.", "Untuk bersiap menghadapi gempa, sediakan makanan darurat."],
      ["物価の上昇で、市民の不安が高まっている。", "Bukka no joushou de, shimin no fuan ga takamatte iru.", "Dengan naiknya harga-harga, kecemasan warga meningkat."],
      ["干ばつは農業に深刻な影響を与えた。", "Kanbatsu wa nougyou ni shinkoku na eikyou o ataeta.", "Kekeringan memberi dampak serius pada pertanian."],
    ],
  ],
  // 7. Pemangku kepentingan
  [
    [
      ["話し合いの場", "Hanashiai no ba", "forum diskusi"],
      ["意見を調整する", "Iken o chousei suru", "menyelaraskan pendapat"],
      ["住民説明会", "Juumin setsumeikai", "sosialisasi kepada warga"],
      ["反発を招く", "Hanpatsu o maneku", "memicu penolakan", ["Kata 合意 berarti...", "kesepakatan", "penolakan", "kerugian", "kebijakan"]],
    ],
    [
      ["建設計画について、住民説明会が開かれた。", "Kensetsu keikaku ni tsuite, juumin setsumeikai ga hirakareta.", "Diadakan sosialisasi kepada warga tentang rencana pembangunan."],
      ["一方的な決定は、住民の反発を招いた。", "Ippouteki na kettei wa, juumin no hanpatsu o maneita.", "Keputusan sepihak memicu penolakan warga."],
      ["双方の意見を調整するのに半年かかった。", "Souhou no iken o chousei suru no ni hantoshi kakatta.", "Butuh setengah tahun untuk menyelaraskan pendapat kedua pihak."],
      ["今後も話し合いの場を設けていく方針だ。", "Kongo mo hanashiai no ba o mouketeiku houshin da.", "Kebijakannya, forum diskusi akan terus diadakan ke depannya."],
    ],
  ],
  // 8. Penghubung formal
  [
    [
      ["にもかかわらず賛成した", "Ni mo kakawarazu sansei shita", "meskipun begitu tetap setuju"],
      ["したがって", "Shitagatte", "dengan demikian"],
      ["その反面", "Sono hanmen", "di sisi lain / sebaliknya"],
      ["要するに", "You suru ni", "singkatnya", ["Penghubung yang berarti 'meskipun demikian' adalah...", "とはいえ", "それゆえ", "加えて", "要するに"]],
    ],
    [
      ["準備不足にもかかわらず、発表は成功した。", "Junbi busoku ni mo kakawarazu, happyou wa seikou shita.", "Meskipun persiapannya kurang, presentasinya berhasil."],
      ["便利になった。とはいえ、問題がないわけではない。", "Benri ni natta. To wa ie, mondai ga nai wake de wa nai.", "Sudah menjadi praktis. Meskipun demikian, bukan berarti tidak ada masalah."],
      ["データは不十分である。それゆえ、結論は保留とする。", "Deeta wa fujuubun de aru. Sore yue, ketsuron wa horyuu to suru.", "Datanya tidak memadai. Oleh sebab itu, kesimpulan ditangguhkan."],
      ["価格が安い。加えて、品質も高い。", "Kakaku ga yasui. Kuwaete, hinshitsu mo takai.", "Harganya murah. Selain itu, kualitasnya juga tinggi."],
    ],
  ],
  // 9. Sanggahan
  [
    [
      ["根拠に乏しい", "Konkyo ni toboshii", "minim dasar"],
      ["説得力に欠ける", "Settokuryoku ni kakeru", "kurang meyakinkan"],
      ["反証を挙げる", "Hanshou o ageru", "mengajukan bukti tandingan"],
      ["一面的な見方", "Ichimenteki na mikata", "cara pandang sepihak", ["Kata 異論 berarti...", "keberatan / pendapat berbeda", "persetujuan", "kesimpulan", "contoh"]],
    ],
    [
      ["その主張は根拠に乏しく、説得力に欠ける。", "Sono shuchou wa konkyo ni toboshiku, settokuryoku ni kakeru.", "Klaim itu minim dasar dan kurang meyakinkan."],
      ["彼は具体的なデータを示して反証を挙げた。", "Kare wa gutaiteki na deeta o shimeshite hanshou o ageta.", "Dia mengajukan bukti tandingan dengan menunjukkan data konkret."],
      ["それは一面的な見方にすぎない。", "Sore wa ichimenteki na mikata ni suginai.", "Itu hanyalah cara pandang sepihak."],
      ["その意見には、いくつか疑問が残る。", "Sono iken ni wa, ikutsuka gimon ga nokoru.", "Masih tersisa beberapa keraguan atas pendapat itu."],
    ],
  ],
  // 10. Editorial
  [
    [
      ["社説", "Shasetsu", "tajuk rencana"],
      ["論じる", "Ronjiru", "membahas / berargumen"],
      ["見逃せない", "Minogasenai", "tidak bisa diabaikan"],
      ["問われている", "Towarete iru", "sedang dipertanyakan", ["Kata 世論 berarti...", "opini publik", "berita dunia", "teori sosial", "tajuk rencana"]],
    ],
    [
      ["今朝の新聞の社説は、教育改革について論じている。", "Kesa no shinbun no shasetsu wa, kyouiku kaikaku ni tsuite ronjite iru.", "Tajuk rencana koran pagi ini membahas reformasi pendidikan."],
      ["増税の是非をめぐって、世論が二つに分かれている。", "Zouzei no zehi o megutte, yoron ga futatsu ni wakarete iru.", "Opini publik terbelah dua soal benar-tidaknya kenaikan pajak."],
      ["若者の政治離れは見逃せない問題だ。", "Wakamono no seiji banare wa minogasenai mondai da.", "Menjauhnya anak muda dari politik adalah masalah yang tidak bisa diabaikan."],
      ["政府の説明責任が今、問われている。", "Seifu no setsumei sekinin ga ima, towarete iru.", "Akuntabilitas pemerintah kini sedang dipertanyakan."],
    ],
  ],
  // 11. Pemberitahuan hukum
  [
    [
      ["利用規約", "Riyou kiyaku", "syarat dan ketentuan penggunaan"],
      ["同意する", "Doui suru", "menyetujui"],
      ["責任を負わない", "Sekinin o owanai", "tidak bertanggung jawab"],
      ["禁止事項", "Kinshi jikou", "hal-hal yang dilarang", ["Kata 免責 berarti...", "pembebasan dari tanggung jawab", "kewajiban", "sanksi", "pelanggaran"]],
    ],
    [
      ["サービスを利用する前に、利用規約に同意してください。", "Saabisu o riyou suru mae ni, riyou kiyaku ni doui shite kudasai.", "Sebelum memakai layanan, harap menyetujui syarat dan ketentuan."],
      ["当社は、利用者間のトラブルについて責任を負いません。", "Tousha wa, riyoushakan no toraburu ni tsuite sekinin o oimasen.", "Perusahaan kami tidak bertanggung jawab atas masalah antarpengguna."],
      ["禁止事項に違反した場合、アカウントを停止します。", "Kinshi jikou ni ihan shita baai, akaunto o teishi shimasu.", "Jika melanggar hal yang dilarang, akun akan dihentikan."],
      ["本規約は予告なく変更されることがあります。", "Hon kiyaku wa yokoku naku henkou sareru koto ga arimasu.", "Ketentuan ini dapat diubah tanpa pemberitahuan sebelumnya."],
    ],
  ],
  // 12. Keuangan
  [
    [
      ["株価が下落する", "Kabuka ga geraku suru", "harga saham turun"],
      ["住宅ローン", "Juutaku roon", "kredit rumah"],
      ["貯蓄に回す", "Chochiku ni mawasu", "dialihkan ke tabungan"],
      ["物価上昇", "Bukka joushou", "kenaikan harga", ["Kata 融資 berarti...", "pinjaman / pembiayaan", "investasi saham", "pajak", "bunga tabungan"]],
    ],
    [
      ["株価が急に下落して、多くの投資家が損をした。", "Kabuka ga kyuu ni geraku shite, ooku no toushika ga son o shita.", "Harga saham tiba-tiba turun, banyak investor merugi."],
      ["三十五年の住宅ローンを組んで家を買った。", "Sanjuugonen no juutaku roon o kunde ie o katta.", "Saya membeli rumah dengan kredit rumah tiga puluh lima tahun."],
      ["ボーナスの半分は貯蓄に回すことにしている。", "Boonasu no hanbun wa chochiku ni mawasu koto ni shite iru.", "Saya membiasakan mengalihkan separuh bonus ke tabungan."],
      ["物価上昇に給料の伸びが追いついていない。", "Bukka joushou ni kyuuryou no nobi ga oitsuite inai.", "Kenaikan gaji tidak mampu mengejar kenaikan harga."],
    ],
  ],
  // 13. Teknologi
  [
    [
      ["実用化", "Jitsuyouka", "penerapan praktis"],
      ["急速に普及する", "Kyuusoku ni fukyuu suru", "menyebar dengan cepat"],
      ["効率化を図る", "Kouritsuka o hakaru", "mengupayakan efisiensi"],
      ["個人情報", "Kojin jouhou", "data pribadi", ["Kata 普及 berarti...", "penyebaran / meluas", "pengembangan", "penemuan", "penghentian"]],
    ],
    [
      ["自動運転の技術は実用化に近づいている。", "Jidou unten no gijutsu wa jitsuyouka ni chikazuite iru.", "Teknologi kendaraan otonom mendekati penerapan praktis."],
      ["スマートフォンはここ十年で急速に普及した。", "Sumaatofon wa koko juunen de kyuusoku ni fukyuu shita.", "Ponsel pintar menyebar dengan cepat dalam sepuluh tahun terakhir."],
      ["AIを使って業務の効率化を図る企業が増えている。", "Ee ai o tsukatte gyoumu no kouritsuka o hakaru kigyou ga fuete iru.", "Perusahaan yang mengupayakan efisiensi kerja dengan AI bertambah."],
      ["個人情報の管理には十分な注意が必要だ。", "Kojin jouhou no kanri ni wa juubun na chuui ga hitsuyou da.", "Pengelolaan data pribadi memerlukan perhatian yang cukup."],
    ],
  ],
  // 14. Masyarakat
  [
    [
      ["地域格差", "Chiiki kakusa", "kesenjangan antardaerah"],
      ["人口減少", "Jinkou genshou", "penurunan jumlah penduduk"],
      ["多様性を認める", "Tayousei o mitomeru", "mengakui keberagaman"],
      ["社会保障", "Shakai hoshou", "jaminan sosial", ["Kata 格差 berarti...", "kesenjangan", "kesetaraan", "kerja sama", "pertumbuhan"]],
    ],
    [
      ["都市と地方の地域格差が広がっている。", "Toshi to chihou no chiiki kakusa ga hirogatte iru.", "Kesenjangan antara kota dan daerah semakin melebar."],
      ["人口減少により、多くの学校が閉校した。", "Jinkou genshou ni yori, ooku no gakkou ga heikou shita.", "Akibat penurunan penduduk, banyak sekolah ditutup."],
      ["互いの多様性を認め合う社会を目指したい。", "Tagai no tayousei o mitomeau shakai o mezashitai.", "Saya ingin mewujudkan masyarakat yang saling mengakui keberagaman."],
      ["高齢化で社会保障の費用が増え続けている。", "Koureika de shakai hoshou no hiyou ga fuetsuzukete iru.", "Karena penuaan penduduk, biaya jaminan sosial terus meningkat."],
    ],
  ],
  // 15. Kritik budaya
  [
    [
      ["流行に流される", "Ryuukou ni nagasareru", "terbawa tren"],
      ["大量消費", "Tairyou shouhi", "konsumsi massal"],
      ["均一化", "Kin-itsuka", "penyeragaman"],
      ["独自性", "Dokujisei", "keunikan / orisinalitas", ["Kata 画一的 berarti...", "seragam / monoton", "unik", "beragam", "kreatif"]],
    ],
    [
      ["流行に流されず、自分の好みを大切にしたい。", "Ryuukou ni nagasarezu, jibun no konomi o taisetsu ni shitai.", "Saya ingin menghargai selera sendiri tanpa terbawa tren."],
      ["大量消費の時代は、環境に大きな負担をかけた。", "Tairyou shouhi no jidai wa, kankyou ni ooki na futan o kaketa.", "Era konsumsi massal memberi beban besar pada lingkungan."],
      ["グローバル化によって、町並みの均一化が進んでいる。", "Guroobaruka ni yotte, machinami no kin-itsuka ga susunde iru.", "Akibat globalisasi, penyeragaman wajah kota semakin maju."],
      ["地方の祭りには、その土地の独自性が表れている。", "Chihou no matsuri ni wa, sono tochi no dokujisei ga arawarete iru.", "Dalam festival daerah tercermin keunikan tempat tersebut."],
    ],
  ],
  // 16. Kanji N2
  [
    [
      ["検討を重ねる", "Kentou o kasaneru", "berulang kali mempertimbangkan"],
      ["著しい成長", "Ichijirushii seichou", "pertumbuhan yang pesat"],
      ["促進する", "Sokushin suru", "mendorong / mempercepat"],
      ["維持する", "Iji suru", "mempertahankan", ["Bacaan kanji 把握 adalah...", "haaku", "haku", "hakaku", "baaku"]],
    ],
    [
      ["検討を重ねた結果、計画を延期することにした。", "Kentou o kasaneta kekka, keikaku o enki suru koto ni shita.", "Setelah berulang kali dipertimbangkan, rencana diputuskan ditunda."],
      ["この地域は近年、著しい成長を遂げている。", "Kono chiiki wa kinnen, ichijirushii seichou o togete iru.", "Wilayah ini beberapa tahun terakhir mencapai pertumbuhan pesat."],
      ["政府は再生可能エネルギーの利用を促進している。", "Seifu wa saisei kanou enerugii no riyou o sokushin shite iru.", "Pemerintah mendorong pemanfaatan energi terbarukan."],
      ["健康を維持するために、毎日運動している。", "Kenkou o iji suru tame ni, mainichi undou shite iru.", "Untuk mempertahankan kesehatan, saya berolahraga setiap hari."],
    ],
  ],
  // 17. Idiom N2
  [
    [
      ["頭が上がらない", "Atama ga agaranai", "merasa sangat berutang budi"],
      ["耳が痛い", "Mimi ga itai", "tersindir / menyakitkan didengar"],
      ["手を抜く", "Te o nuku", "bekerja asal-asalan"],
      ["顔が広い", "Kao ga hiroi", "punya banyak kenalan", ["Idiom 腕を磨く berarti...", "mengasah keterampilan", "melukai lengan", "bekerja sama", "menolak"]],
    ],
    [
      ["彼女にはいつも助けてもらっていて、頭が上がらない。", "Kanojo ni wa itsumo tasukete moratte ite, atama ga agaranai.", "Saya selalu dibantunya, saya sangat berutang budi."],
      ["先生の注意は耳が痛かったが、正しいと思った。", "Sensei no chuui wa mimi ga itakatta ga, tadashii to omotta.", "Teguran guru menyakitkan didengar, tapi saya pikir benar."],
      ["どんな小さな仕事でも、手を抜いてはいけない。", "Donna chiisa na shigoto demo, te o nuite wa ikenai.", "Sekecil apa pun pekerjaannya, tidak boleh asal-asalan."],
      ["部長は顔が広いので、いろいろな人を紹介してくれた。", "Buchou wa kao ga hiroi node, iroiro na hito o shoukai shite kureta.", "Manajer punya banyak kenalan, jadi dia memperkenalkan berbagai orang."],
    ],
  ],
  // 18. Keigo
  [
    [
      ["いらっしゃる", "Irassharu", "datang / ada (hormat)"],
      ["伺う", "Ukagau", "berkunjung / bertanya (merendah)"],
      ["おっしゃる", "Ossharu", "berkata (hormat)"],
      ["存じる", "Zonjiru", "tahu / berpikir (merendah)", ["Bentuk hormat (sonkeigo) dari 食べる adalah...", "召し上がる", "いただく", "頂戴する", "食べられる"]],
    ],
    [
      ["明日の午後、御社に伺ってもよろしいでしょうか。", "Ashita no gogo, onsha ni ukagatte mo yoroshii deshou ka.", "Bolehkah saya berkunjung ke perusahaan Anda besok siang?"],
      ["社長は何時ごろいらっしゃいますか。", "Shachou wa nanji goro irasshaimasu ka.", "Kira-kira pukul berapa direktur datang?"],
      ["先生のおっしゃる通りだと思います。", "Sensei no ossharu toori da to omoimasu.", "Saya pikir memang seperti yang dikatakan Bapak/Ibu guru."],
      ["その件については、よく存じております。", "Sono ken ni tsuite wa, yoku zonjite orimasu.", "Saya sangat mengetahui perihal itu."],
    ],
  ],
  // 19. Kata kerja bernuansa
  [
    [
      ["解決を図る", "Kaiketsu o hakaru", "mengupayakan penyelesaian"],
      ["サービス向上に努める", "Saabisu koujou ni tsutomeru", "berupaya meningkatkan layanan"],
      ["健康を心がける", "Kenkou o kokorogakeru", "berusaha menjaga kesehatan"],
      ["合格と見なす", "Goukaku to minasu", "menganggapnya lulus", ["Kata kerja 見なす berarti...", "menganggap / memperlakukan sebagai", "melihat sekilas", "mengabaikan", "mencari"]],
    ],
    [
      ["両国は話し合いによって問題の解決を図っている。", "Ryoukoku wa hanashiai ni yotte mondai no kaiketsu o hakatte iru.", "Kedua negara mengupayakan penyelesaian masalah melalui dialog."],
      ["お客様の満足度向上に努めております。", "Okyakusama no manzokudo koujou ni tsutomete orimasu.", "Kami berupaya meningkatkan kepuasan pelanggan."],
      ["毎日、バランスのよい食事を心がけている。", "Mainichi, baransu no yoi shokuji o kokorogakete iru.", "Setiap hari saya berusaha makan dengan gizi seimbang."],
      ["連絡なしに休んだ場合は、欠勤と見なされる。", "Renraku nashi ni yasunda baai wa, kekkin to minasareru.", "Jika libur tanpa kabar, dianggap mangkir."],
    ],
  ],
  // 20. Ulasan kosakata N2
  [
    [
      ["視野を広げる", "Shiya o hirogeru", "memperluas wawasan"],
      ["信頼を得る", "Shinrai o eru", "mendapatkan kepercayaan"],
      ["困難を乗り越える", "Konnan o norikoeru", "mengatasi kesulitan"],
      ["期待に応える", "Kitai ni kotaeru", "memenuhi harapan", ["Kolokasi yang benar untuk 'memenuhi harapan' adalah...", "期待に応える", "期待を答える", "期待で応える", "期待が応える"]],
    ],
    [
      ["海外での経験は、私の視野を大きく広げてくれた。", "Kaigai de no keiken wa, watashi no shiya o ookiku hirogete kureta.", "Pengalaman di luar negeri sangat memperluas wawasan saya."],
      ["誠実な対応で、お客様の信頼を得ることができた。", "Seijitsu na taiou de, okyakusama no shinrai o eru koto ga dekita.", "Dengan pelayanan yang tulus, kami bisa mendapatkan kepercayaan pelanggan."],
      ["チーム全員で協力して、困難を乗り越えた。", "Chiimu zen-in de kyouryoku shite, konnan o norikoeta.", "Seluruh tim bekerja sama dan mengatasi kesulitan."],
      ["両親の期待に応えるために、懸命に努力した。", "Ryoushin no kitai ni kotaeru tame ni, kenmei ni doryoku shita.", "Saya berusaha keras untuk memenuhi harapan orang tua."],
    ],
  ],
];
