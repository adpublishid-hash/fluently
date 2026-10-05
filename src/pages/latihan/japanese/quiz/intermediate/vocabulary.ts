import type { JapaneseQuizTopic } from '../types';

// Latihan Vocabulary N3 — one entry per topic (index = topic - 1): [Basic, Advanced].
export const vocabulary: JapaneseQuizTopic[] = [
  // 1. Kata untuk pendapat
  [
    [
      ["反対意見を出す", "Hantai iken o dasu", "mengajukan pendapat yang menentang"],
      ["立場が違う", "Tachiba ga chigau", "posisinya berbeda"],
      ["考えを改める", "Kangae o aratameru", "mengubah pikiran"],
      ["多数決で決める", "Tasuuketsu de kimeru", "memutuskan dengan suara terbanyak", ["Lawan kata 賛成する (setuju) adalah...", "反対する", "相談する", "提案する", "発表する"]],
    ],
    [
      ["会議では一人一人が自分の意見をはっきり述べた。", "Kaigi de wa hitori hitori ga jibun no iken o hakkiri nobeta.", "Dalam rapat, setiap orang menyampaikan pendapatnya dengan jelas."],
      ["立場が違えば、考え方も変わるものだ。", "Tachiba ga chigaeba, kangaekata mo kawaru mono da.", "Kalau posisinya berbeda, cara berpikir pun wajar berubah."],
      ["最終的には多数決で決めることになった。", "Saishuuteki ni wa tasuuketsu de kimeru koto ni natta.", "Akhirnya diputuskan dengan suara terbanyak."],
      ["彼の説明を聞いて、考えを改めた。", "Kare no setsumei o kiite, kangae o aratameta.", "Setelah mendengar penjelasannya, saya mengubah pikiran.", ["考えを改める berarti...", "mengubah pikiran", "mempertahankan pendapat", "lupa pikiran", "berpikir keras"]],
    ],
  ],
  // 2. Tempat kerja
  [
    [
      ["同僚と協力する", "Douryou to kyouryoku suru", "bekerja sama dengan rekan"],
      ["部下を指導する", "Buka o shidou suru", "membimbing bawahan"],
      ["会議に遅れる", "Kaigi ni okureru", "terlambat rapat"],
      ["有給休暇を取る", "Yuukyuu kyuuka o toru", "mengambil cuti berbayar", ["Lawan kata 上司 (atasan) adalah...", "部下", "同僚", "取引先", "社長"]],
    ],
    [
      ["新しいプロジェクトは同僚と協力して進めています。", "Atarashii purojekuto wa douryou to kyouryoku shite susumete imasu.", "Proyek baru saya jalankan bekerja sama dengan rekan."],
      ["来月、大阪支社に出張することになった。", "Raigetsu, Oosaka shisha ni shutchou suru koto ni natta.", "Bulan depan saya ditugaskan dinas ke kantor cabang Osaka."],
      ["部長は部下の意見をよく聞いてくれる。", "Buchou wa buka no iken o yoku kiite kureru.", "Manajer mau mendengarkan pendapat bawahannya."],
      ["夏に一週間の有給休暇を取るつもりだ。", "Natsu ni isshuukan no yuukyuu kyuuka o toru tsumori da.", "Saya berniat mengambil cuti berbayar seminggu di musim panas."],
    ],
  ],
  // 3. Berita
  [
    [
      ["交通事故が起きる", "Koutsuu jiko ga okiru", "terjadi kecelakaan lalu lintas"],
      ["記者会見", "Kisha kaiken", "konferensi pers"],
      ["死傷者", "Shishousha", "korban tewas dan luka"],
      ["原因を調べる", "Gen-in o shiraberu", "menyelidiki penyebab", ["Kata 被害 berarti...", "kerugian / korban", "keuntungan", "pengumuman", "penyelidikan"]],
    ],
    [
      ["昨夜、高速道路で大きな交通事故が起きた。", "Sakuya, kousoku douro de ooki na koutsuu jiko ga okita.", "Tadi malam terjadi kecelakaan besar di jalan tol."],
      ["警察が事故の原因を詳しく調べている。", "Keisatsu ga jiko no gen-in o kuwashiku shirabete iru.", "Polisi sedang menyelidiki penyebab kecelakaan secara rinci."],
      ["大雨で農作物に大きな被害が出た。", "Ooame de nousakumotsu ni ooki na higai ga deta.", "Hujan lebat menimbulkan kerugian besar pada hasil pertanian."],
      ["政府は午後に記者会見を開く予定だ。", "Seifu wa gogo ni kisha kaiken o hiraku yotei da.", "Pemerintah dijadwalkan mengadakan konferensi pers siang ini."],
    ],
  ],
  // 4. Layanan
  [
    [
      ["手続きをする", "Tetsuzuki o suru", "mengurus prosedur"],
      ["番号札を取る", "Bangoufuda o toru", "mengambil nomor antrean"],
      ["申込書に記入する", "Moushikomisho ni kinyuu suru", "mengisi formulir pendaftaran"],
      ["係の者", "Kakari no mono", "petugas yang bertanggung jawab", ["Kata 窓口 berarti...", "loket layanan", "jendela rumah", "pintu keluar", "ruang tunggu"]],
    ],
    [
      ["まず番号札を取って、お待ちください。", "Mazu bangoufuda o totte, omachi kudasai.", "Pertama ambil nomor antrean, lalu silakan menunggu."],
      ["こちらの申込書にご記入いただけますか。", "Kochira no moushikomisho ni gokinyuu itadakemasu ka.", "Bisakah Anda mengisi formulir pendaftaran ini?"],
      ["詳しいことは係の者がご説明します。", "Kuwashii koto wa kakari no mono ga gosetsumei shimasu.", "Hal yang lebih rinci akan dijelaskan oleh petugas."],
      ["引っ越しの手続きは市役所でできます。", "Hikkoshi no tetsuzuki wa shiyakusho de dekimasu.", "Prosedur pindah alamat bisa diurus di kantor wali kota."],
    ],
  ],
  // 5. Universitas
  [
    [
      ["ゼミに入る", "Zemi ni hairu", "bergabung ke seminar (kelompok studi)"],
      ["レポートを書く", "Repooto o kaku", "menulis laporan / makalah"],
      ["休学する", "Kyuugaku suru", "cuti kuliah"],
      ["学費を払う", "Gakuhi o harau", "membayar biaya kuliah", ["Kata 単位 dalam konteks kampus berarti...", "SKS / kredit", "nilai ujian", "beasiswa", "jurusan"]],
    ],
    [
      ["三年生になったら、経済のゼミに入るつもりだ。", "Sannensei ni nattara, keizai no zemi ni hairu tsumori da.", "Setelah tahun ketiga, saya berniat masuk seminar ekonomi."],
      ["卒業するには百二十四単位が必要だ。", "Sotsugyou suru ni wa hyaku nijuuyon tan-i ga hitsuyou da.", "Untuk lulus diperlukan 124 SKS."],
      ["アルバイトで学費の一部を払っている。", "Arubaito de gakuhi no ichibu o haratte iru.", "Saya membayar sebagian biaya kuliah dari kerja paruh waktu."],
      ["彼は留学のため一年間休学した。", "Kare wa ryuugaku no tame ichinenkan kyuugaku shita.", "Dia cuti kuliah setahun untuk belajar di luar negeri."],
    ],
  ],
  // 6. Pemecahan masalah
  [
    [
      ["状況を改善する", "Joukyou o kaizen suru", "memperbaiki keadaan"],
      ["話し合いで解決する", "Hanashiai de kaiketsu suru", "menyelesaikan lewat diskusi"],
      ["再発を防ぐ", "Saihatsu o fusegu", "mencegah terulang"],
      ["原因がわかる", "Gen-in ga wakaru", "penyebabnya diketahui", ["Kata 対策 berarti...", "langkah penanganan", "penyebab", "hasil", "kerugian"]],
    ],
    [
      ["話し合いで問題を解決することが大切だ。", "Hanashiai de mondai o kaiketsu suru koto ga taisetsu da.", "Penting untuk menyelesaikan masalah lewat diskusi."],
      ["同じミスの再発を防ぐために、チェック表を作った。", "Onaji misu no saihatsu o fusegu tame ni, chekkuhyou o tsukutta.", "Untuk mencegah kesalahan yang sama terulang, saya membuat daftar periksa."],
      ["機械が止まった原因がようやくわかった。", "Kikai ga tomatta gen-in ga youyaku wakatta.", "Penyebab mesin berhenti akhirnya diketahui."],
      ["職場の環境を少しずつ改善していきたい。", "Shokuba no kankyou o sukoshi zutsu kaizen shite ikitai.", "Saya ingin memperbaiki lingkungan kerja sedikit demi sedikit."],
    ],
  ],
  // 7. Budaya
  [
    [
      ["伝統工芸", "Dentou kougei", "kerajinan tradisional"],
      ["お盆休み", "Obon yasumi", "libur Obon"],
      ["郷土料理", "Kyoudo ryouri", "masakan khas daerah"],
      ["受け継ぐ", "Uketsugu", "mewarisi", ["Kata 習慣 berarti...", "kebiasaan", "tradisi tertulis", "festival", "hukum"]],
    ],
    [
      ["この町では伝統工芸が今も受け継がれている。", "Kono machi de wa dentou kougei ga ima mo uketsugarete iru.", "Di kota ini kerajinan tradisional masih diwariskan sampai sekarang."],
      ["お盆休みには多くの人が実家に帰る。", "Obon yasumi ni wa ooku no hito ga jikka ni kaeru.", "Saat libur Obon banyak orang pulang ke kampung halaman."],
      ["旅行先では必ず郷土料理を食べることにしている。", "Ryokousaki de wa kanarazu kyoudo ryouri o taberu koto ni shite iru.", "Di tempat wisata saya selalu membiasakan makan masakan khas daerah."],
      ["地域の祭りは住民の交流の場になっている。", "Chiiki no matsuri wa juumin no kouryuu no ba ni natte iru.", "Festival daerah menjadi tempat interaksi warga."],
    ],
  ],
  // 8. Argumen
  [
    [
      ["主張する", "Shuchou suru", "menegaskan / bersikeras"],
      ["具体例を挙げる", "Gutairei o ageru", "memberikan contoh konkret"],
      ["説得力がある", "Settokuryoku ga aru", "meyakinkan"],
      ["矛盾している", "Mujun shite iru", "bertentangan / kontradiktif", ["Kata 根拠 berarti...", "dasar / bukti", "kesimpulan", "sanggahan", "pertanyaan"]],
    ],
    [
      ["彼は自分の考えが正しいと強く主張した。", "Kare wa jibun no kangae ga tadashii to tsuyoku shuchou shita.", "Dia bersikeras bahwa pikirannya benar."],
      ["具体例を挙げると、説明がわかりやすくなる。", "Gutairei o ageru to, setsumei ga wakariyasuku naru.", "Kalau memberikan contoh konkret, penjelasan jadi mudah dipahami."],
      ["データに基づいた意見は説得力がある。", "Deeta ni motozuita iken wa settokuryoku ga aru.", "Pendapat berdasarkan data itu meyakinkan."],
      ["前に言ったことと今の話は矛盾している。", "Mae ni itta koto to ima no hanashi wa mujun shite iru.", "Yang kamu katakan sebelumnya bertentangan dengan pembicaraan sekarang."],
    ],
  ],
  // 9. Inferensi
  [
    [
      ["様子から判断する", "Yousu kara handan suru", "menilai dari gelagatnya"],
      ["予想通り", "Yosou doori", "sesuai perkiraan"],
      ["ありえない", "Arienai", "tidak mungkin"],
      ["らしい", "Rashii", "kelihatannya / katanya", ["Kata 予想が外れる berarti...", "perkiraan meleset", "perkiraan tepat", "tidak ada perkiraan", "membuat perkiraan"]],
    ],
    [
      ["彼の様子から判断すると、何かあったらしい。", "Kare no yousu kara handan suru to, nanika atta rashii.", "Dilihat dari gelagatnya, sepertinya terjadi sesuatu."],
      ["試合は予想通り、Aチームが勝った。", "Shiai wa yosou doori, ee chiimu ga katta.", "Sesuai perkiraan, tim A menang pertandingan."],
      ["あの真面目な人が嘘をつくなんて、ありえない。", "Ano majime na hito ga uso o tsuku nante, arienai.", "Orang serius itu berbohong? Tidak mungkin."],
      ["電気が消えているから、留守のようだ。", "Denki ga kiete iru kara, rusu no you da.", "Lampunya mati, sepertinya sedang tidak di rumah."],
    ],
  ],
  // 10. Email formal
  [
    [
      ["お世話になっております", "Osewa ni natte orimasu", "terima kasih atas kerja samanya (pembuka email)"],
      ["ご確認ください", "Gokakunin kudasai", "mohon diperiksa"],
      ["資料を送付する", "Shiryou o soufu suru", "mengirimkan materi"],
      ["以上", "Ijou", "demikian", ["Pembuka email bisnis yang umum adalah...", "お世話になっております。", "やあ、元気？", "おやすみなさい。", "いただきます。"]],
    ],
    [
      ["いつもお世話になっております。", "Itsumo osewa ni natte orimasu.", "Terima kasih atas kerja sama Anda selama ini."],
      ["会議の資料を添付いたしますので、ご確認ください。", "Kaigi no shiryou o tenpu itashimasu node, gokakunin kudasai.", "Materi rapat saya lampirkan, mohon diperiksa."],
      ["ご不明な点がございましたら、ご連絡ください。", "Gofumei na ten ga gozaimashitara, gorenraku kudasai.", "Jika ada hal yang kurang jelas, silakan hubungi saya."],
      ["お忙しいところ恐れ入りますが、よろしくお願いいたします。", "Oisogashii tokoro osoreirimasu ga, yoroshiku onegai itashimasu.", "Mohon maaf mengganggu kesibukan Anda, atas perhatiannya terima kasih."],
    ],
  ],
  // 11. Keluhan
  [
    [
      ["商品が壊れている", "Shouhin ga kowarete iru", "barangnya rusak"],
      ["交換してもらう", "Koukan shite morau", "minta ditukar"],
      ["対応が悪い", "Taiou ga warui", "pelayanannya buruk"],
      ["騒音に悩む", "Souon ni nayamu", "terganggu kebisingan", ["Kata 苦情 berarti...", "keluhan", "pujian", "pesanan", "kuitansi"]],
    ],
    [
      ["届いた商品が壊れていたので、交換してもらった。", "Todoita shouhin ga kowarete ita node, koukan shite moratta.", "Barang yang tiba rusak, jadi saya minta ditukar."],
      ["店員の対応が悪くて、気分が悪くなった。", "Ten-in no taiou ga warukute, kibun ga waruku natta.", "Pelayanan pegawai buruk, saya jadi kesal."],
      ["隣の部屋の騒音に毎晩悩まされている。", "Tonari no heya no souon ni maiban nayamasarete iru.", "Setiap malam saya terganggu kebisingan kamar sebelah."],
      ["店長が直接謝りに来てくれた。", "Tenchou ga chokusetsu ayamari ni kite kureta.", "Manajer toko datang langsung untuk meminta maaf."],
    ],
  ],
  // 12. Survei
  [
    [
      ["半数以上", "Hansuu ijou", "lebih dari setengah"],
      ["約三割", "Yaku sanwari", "sekitar tiga puluh persen"],
      ["調査結果", "Chousa kekka", "hasil survei"],
      ["年々増える", "Nennen fueru", "bertambah dari tahun ke tahun", ["Kata 割合 berarti...", "persentase / proporsi", "jumlah total", "pertanyaan", "jawaban"]],
    ],
    [
      ["調査結果によると、半数以上の人が朝食を食べていない。", "Chousa kekka ni yoru to, hansuu ijou no hito ga choushoku o tabete inai.", "Menurut hasil survei, lebih dari setengah orang tidak sarapan."],
      ["約三割の学生がアルバイトをしていると答えた。", "Yaku sanwari no gakusei ga arubaito o shite iru to kotaeta.", "Sekitar tiga puluh persen mahasiswa menjawab bahwa mereka kerja paruh waktu.", ["約三割 berarti sekitar...", "30%", "3%", "13%", "33%"]],
      ["一人暮らしの高齢者は年々増えている。", "Hitorigurashi no koureisha wa nennen fuete iru.", "Lansia yang tinggal sendiri bertambah dari tahun ke tahun."],
      ["若い人ほどスマホで買い物をする傾向がある。", "Wakai hito hodo sumaho de kaimono o suru keikou ga aru.", "Semakin muda, semakin cenderung berbelanja dengan ponsel."],
    ],
  ],
  // 13. Usulan
  [
    [
      ["新しい企画", "Atarashii kikaku", "rencana proyek baru"],
      ["費用がかかる", "Hiyou ga kakaru", "memakan biaya"],
      ["効果が期待できる", "Kouka ga kitai dekiru", "efeknya bisa diharapkan"],
      ["検討する", "Kentou suru", "mempertimbangkan", ["Kata 予算 berarti...", "anggaran", "hasil", "efek", "jadwal"]],
    ],
    [
      ["若者向けの新しい企画を提案したいと思います。", "Wakamono muke no atarashii kikaku o teian shitai to omoimasu.", "Saya ingin mengusulkan rencana proyek baru untuk anak muda."],
      ["この方法なら、費用があまりかかりません。", "Kono houhou nara, hiyou ga amari kakarimasen.", "Dengan cara ini, biayanya tidak terlalu besar."],
      ["売り上げの増加という効果が期待できます。", "Uriage no zouka to iu kouka ga kitai dekimasu.", "Efek berupa kenaikan penjualan bisa diharapkan."],
      ["来週までに上司と検討してお返事します。", "Raishuu made ni joushi to kentou shite ohenji shimasu.", "Saya akan mempertimbangkannya dengan atasan dan memberi jawaban minggu depan."],
    ],
  ],
  // 14. Proses
  [
    [
      ["第一段階", "Dai ichi dankai", "tahap pertama"],
      ["作業手順", "Sagyou tejun", "prosedur kerja"],
      ["完成までの過程", "Kansei made no katei", "proses hingga selesai"],
      ["順番に", "Junban ni", "secara berurutan", ["Kata 仕組み berarti...", "mekanisme / cara kerja", "jadwal", "alat", "hasil"]],
    ],
    [
      ["作業手順を守らないと、事故につながる。", "Sagyou tejun o mamoranai to, jiko ni tsunagaru.", "Kalau tidak mengikuti prosedur kerja, bisa berujung kecelakaan."],
      ["今は計画の第一段階が終わったところだ。", "Ima wa keikaku no dai ichi dankai ga owatta tokoro da.", "Sekarang tahap pertama rencana baru saja selesai."],
      ["映画が完成するまでの過程を紹介します。", "Eiga ga kansei suru made no katei o shoukai shimasu.", "Saya memperkenalkan proses hingga film selesai dibuat."],
      ["名前を呼ばれたら、順番に中へお入りください。", "Namae o yobaretara, junban ni naka e ohairi kudasai.", "Jika nama dipanggil, silakan masuk secara berurutan."],
    ],
  ],
  // 15. Nuansa emosi
  [
    [
      ["ほっとする", "Hotto suru", "merasa lega"],
      ["どきどきする", "Dokidoki suru", "berdebar-debar"],
      ["むっとする", "Mutto suru", "tersinggung / kesal"],
      ["しょんぼりする", "Shonbori suru", "murung / lesu", ["Perasaan saat menunggu pengumuman hasil ujian adalah...", "どきどきする", "しょんぼりする", "むっとする", "うんざりする"]],
    ],
    [
      ["面接の前はどきどきして、眠れなかった。", "Mensetsu no mae wa dokidoki shite, nemurenakatta.", "Sebelum wawancara saya berdebar-debar dan tidak bisa tidur."],
      ["失礼なことを言われて、むっとした。", "Shitsurei na koto o iwarete, mutto shita.", "Saya tersinggung karena dikatai hal yang tidak sopan."],
      ["試合に負けて、弟はしょんぼりしている。", "Shiai ni makete, otouto wa shonbori shite iru.", "Adik saya murung karena kalah bertanding."],
      ["同じ話を何度も聞かされて、うんざりした。", "Onaji hanashi o nando mo kikasarete, unzari shita.", "Saya muak karena dipaksa mendengar cerita yang sama berkali-kali."],
    ],
  ],
  // 16. Adverbia N3
  [
    [
      ["せっかく", "Sekkaku", "susah payah / mumpung"],
      ["どうせ", "Douse", "bagaimanapun juga (pasrah)"],
      ["さっそく", "Sassoku", "segera"],
      ["たまたま", "Tamatama", "kebetulan", ["Kata ようやく berarti...", "akhirnya (setelah lama)", "tiba-tiba", "kebetulan", "segera"]],
    ],
    [
      ["せっかく作ったのに、誰も食べてくれなかった。", "Sekkaku tsukutta noni, dare mo tabete kurenakatta.", "Padahal sudah susah payah dibuat, tidak ada yang mau makan."],
      ["どうせ間に合わないから、ゆっくり行こう。", "Douse ma ni awanai kara, yukkuri ikou.", "Toh tidak akan sempat, jadi kita pergi santai saja."],
      ["新しいパソコンが届いたので、さっそく使ってみた。", "Atarashii pasokon ga todoita node, sassoku tsukatte mita.", "Komputer baru tiba, jadi langsung saya coba pakai."],
      ["駅でたまたま昔の友達に会った。", "Eki de tamatama mukashi no tomodachi ni atta.", "Di stasiun saya kebetulan bertemu teman lama."],
    ],
  ],
  // 17. Kanji N3
  [
    [
      ["輸出", "Yushutsu", "ekspor"],
      ["政府", "Seifu", "pemerintah"],
      ["景気", "Keiki", "kondisi ekonomi"],
      ["環境保護", "Kankyou hogo", "perlindungan lingkungan", ["Lawan kata 輸入 (impor) adalah...", "輸出", "輸送", "出入", "収入"]],
    ],
    [
      ["日本は多くの車を海外へ輸出している。", "Nihon wa ooku no kuruma o kaigai e yushutsu shite iru.", "Jepang mengekspor banyak mobil ke luar negeri."],
      ["政府は新しい経済政策を発表した。", "Seifu wa atarashii keizai seisaku o happyou shita.", "Pemerintah mengumumkan kebijakan ekonomi baru."],
      ["景気が悪くなって、就職が難しくなった。", "Keiki ga waruku natte, shuushoku ga muzukashiku natta.", "Kondisi ekonomi memburuk, mencari kerja jadi sulit."],
      ["環境問題について、もっと考える必要がある。", "Kankyou mondai ni tsuite, motto kangaeru hitsuyou ga aru.", "Kita perlu berpikir lebih banyak tentang masalah lingkungan."],
    ],
  ],
  // 18. Kata penghubung N3
  [
    [
      ["それなのに", "Sorenanoni", "padahal begitu"],
      ["すると", "Suruto", "lalu (ternyata)"],
      ["つまり", "Tsumari", "dengan kata lain"],
      ["そこで", "Sokode", "oleh karena itu (lalu bertindak)", ["Kata penghubung yang berarti 'namun ternyata (di luar dugaan)' adalah...", "ところが", "そのうえ", "したがって", "なお"]],
    ],
    [
      ["毎日練習した。それなのに、試合に出られなかった。", "Mainichi renshuu shita. Sorenanoni, shiai ni derarenakatta.", "Saya berlatih setiap hari. Padahal begitu, saya tidak bisa ikut bertanding."],
      ["ボタンを押した。すると、ドアが開いた。", "Botan o oshita. Suruto, doa ga aita.", "Saya menekan tombol. Lalu pintunya terbuka."],
      ["道がわからなかった。そこで、交番で聞くことにした。", "Michi ga wakaranakatta. Sokode, kouban de kiku koto ni shita.", "Saya tidak tahu jalannya. Karena itu, saya memutuskan bertanya di pos polisi."],
      ["この店は安い。そのうえ、駅からも近い。", "Kono mise wa yasui. Sono ue, eki kara mo chikai.", "Toko ini murah. Selain itu, dekat dari stasiun."],
    ],
  ],
  // 19. Register bahasa
  [
    [
      ["本日", "Honjitsu", "hari ini (formal)"],
      ["明日", "Myounichi", "besok (formal)"],
      ["昨日", "Sakujitsu", "kemarin (formal)"],
      ["いかが", "Ikaga", "bagaimana (sopan)", ["Bentuk formal dari さっき (tadi) adalah...", "先ほど", "後ほど", "本日", "昨日"]],
    ],
    [
      ["本日はお越しいただき、ありがとうございます。", "Honjitsu wa okoshi itadaki, arigatou gozaimasu.", "Terima kasih atas kedatangan Anda hari ini."],
      ["明日の会議は十時から始めます。", "Myounichi no kaigi wa juuji kara hajimemasu.", "Rapat besok dimulai pukul sepuluh."],
      ["お飲み物はいかがですか。", "Onomimono wa ikaga desu ka.", "Bagaimana kalau minum sesuatu?"],
      ["昨日はお休みをいただき、ありがとうございました。", "Sakujitsu wa oyasumi o itadaki, arigatou gozaimashita.", "Terima kasih telah mengizinkan saya libur kemarin."],
    ],
  ],
  // 20. Ulasan kosakata N3
  [
    [
      ["努力を続ける", "Doryoku o tsuzukeru", "terus berusaha"],
      ["自信をつける", "Jishin o tsukeru", "membangun rasa percaya diri"],
      ["夢をかなえる", "Yume o kanaeru", "mewujudkan impian"],
      ["チャンスをつかむ", "Chansu o tsukamu", "meraih kesempatan", ["Kolokasi yang benar untuk 'menetapkan target' adalah...", "目標を立てる", "目標を作る", "目標を置く", "目標を出る"]],
    ],
    [
      ["彼は毎日努力を続けて、夢をかなえた。", "Kare wa mainichi doryoku o tsuzukete, yume o kanaeta.", "Dia terus berusaha setiap hari dan mewujudkan impiannya."],
      ["留学の経験が、彼女に大きな影響を与えた。", "Ryuugaku no keiken ga, kanojo ni ooki na eikyou o ataeta.", "Pengalaman belajar di luar negeri memberi pengaruh besar padanya."],
      ["小さな成功を重ねて、自信をつけていった。", "Chiisa na seikou o kasanete, jishin o tsukete itta.", "Dengan mengumpulkan keberhasilan kecil, dia membangun rasa percaya diri."],
      ["準備ができている人だけがチャンスをつかめる。", "Junbi ga dekite iru hito dake ga chansu o tsukameru.", "Hanya orang yang siap yang bisa meraih kesempatan."],
    ],
  ],
];
