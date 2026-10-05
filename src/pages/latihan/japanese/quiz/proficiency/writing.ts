import type { JapaneseQuizTopic } from '../types';

// Latihan Writing N1 — one entry per topic (index = topic - 1): [Basic, Advanced].
export const writing: JapaneseQuizTopic[] = [
  // 1. Esai akademik
  [
    [
      ["本稿の目的", "Honkou no mokuteki", "tujuan tulisan ini"],
      ["に着目する", "Ni chakumoku suru", "berfokus pada"],
      ["観点から捉え直す", "Kanten kara toraenaosu", "memandang ulang dari sudut"],
      ["照らし出す", "Terashidasu", "menyoroti"],
    ],
    [
      ["本稿の目的は、日本語教育における母語の役割を再検討することにある。", "Honkou no mokuteki wa, nihongo kyouiku ni okeru bogo no yakuwari o saikentou suru koto ni aru.", "Tujuan tulisan ini adalah meninjau ulang peran bahasa ibu dalam pendidikan bahasa Jepang."],
      ["先行研究の多くは、母語の干渉という負の側面に着目してきた。", "Senkou kenkyuu no ooku wa, bogo no kanshou to iu fu no sokumen ni chakumoku shite kita.", "Banyak penelitian terdahulu berfokus pada sisi negatif, yaitu interferensi bahasa ibu.", ["Menurut esai, penelitian terdahulu berfokus pada...", "sisi negatif interferensi bahasa ibu", "manfaat bahasa ibu", "metode mengajar kanji", "ujian kemampuan"]],
      ["本稿は、母語を学習の資源とみなす観点から、この問題を捉え直す。", "Honkou wa, bogo o gakushuu no shigen to minasu kanten kara, kono mondai o toraenaosu.", "Tulisan ini memandang ulang masalah tersebut dari sudut yang menganggap bahasa ibu sebagai sumber belajar."],
      ["この試みは、多言語環境の教室運営に新たな示唆を与えるであろう。", "Kono kokoromi wa, tagengo kankyou no kyoushitsu unei ni arata na shisa o ataeru de arou.", "Upaya ini diharapkan memberikan isyarat baru bagi pengelolaan kelas berlingkungan multibahasa."],
    ],
  ],
  // 2. Kertas kebijakan
  [
    [
      ["とは言い難い", "To wa iigatai", "sulit dikatakan"],
      ["適用範囲を拡大する", "Tekiyou hani o kakudai suru", "memperluas cakupan penerapan"],
      ["移行措置", "Ikou sochi", "langkah transisi"],
      ["最小限に抑える", "Saishougen ni osaeru", "menekan seminimal mungkin", ["Kertas kebijakan biasanya diawali dengan...", "ringkasan eksekutif", "puisi", "daftar pustaka", "ucapan terima kasih panjang"]],
    ],
    [
      ["現行の育児休業制度が、男性の取得を十分に促しているとは言い難い。", "Genkou no ikuji kyuugyou seido ga, dansei no shutoku o juubun ni unagashite iru to wa iigatai.", "Sulit dikatakan bahwa sistem cuti pengasuhan anak saat ini cukup mendorong pria untuk mengambilnya."],
      ["休業中の給付率を、現行の六割から八割に引き上げることを提言する。", "Kyuugyouchuu no kyuufuritsu o, genkou no rokuwari kara hachiwari ni hikiageru koto o teigen suru.", "Kami merekomendasikan menaikkan tingkat tunjangan selama cuti dari enam puluh persen saat ini menjadi delapan puluh persen.", ["Rekomendasi kertas kebijakan itu adalah menaikkan tunjangan cuti menjadi...", "80%", "60%", "70%", "100%"]],
      ["あわせて、代替要員を確保する中小企業への助成を設けるべきである。", "Awasete, daitai youin o kakuho suru chuushou kigyou e no josei o moukeru beki de aru.", "Bersamaan dengan itu, perlu disediakan subsidi bagi UKM yang menyiapkan tenaga pengganti."],
      ["三年間の移行措置を設け、企業の負担を最小限に抑える。", "Sannenkan no ikou sochi o mouke, kigyou no futan o saishougen ni osaeru.", "Dengan langkah transisi tiga tahun, beban perusahaan ditekan seminimal mungkin."],
    ],
  ],
  // 3. Ulasan kritis
  [
    [
      ["労作", "Rousaku", "karya serius / hasil jerih payah"],
      ["評価に値する", "Hyouka ni atai suru", "patut diapresiasi"],
      ["感は否めない", "Kan wa inamenai", "kesan itu tak dapat dipungkiri"],
      ["必読の一冊", "Hitsudoku no issatsu", "buku wajib baca", ["Urutan ulasan kritis buku adalah...", "ringkasan → kontribusi → kelemahan → penilaian akhir", "kelemahan saja", "harga → penerbit", "biografi penulis saja"]],
    ],
    [
      ["本書は、明治期の女性雑誌を通して近代の家族観を描き出した労作である。", "Honsho wa, Meijiki no josei zasshi o tooshite kindai no kazokukan o egakidashita rousaku de aru.", "Buku ini adalah karya serius yang menggambarkan pandangan keluarga modern melalui majalah wanita era Meiji."],
      ["読者投稿欄という見過ごされがちな資料に光を当てた点は、評価に値する。", "Dokusha toukouran to iu misugosaregachi na shiryou ni hikari o ateta ten wa, hyouka ni atai suru.", "Upayanya menyoroti kolom kiriman pembaca, sumber yang sering terabaikan, patut diapresiasi."],
      ["ただし、分析が都市部の中流層に限られている感は否めない。", "Tadashi, bunseki ga toshibu no chuuryuusou ni kagirarete iru kan wa inamenai.", "Namun, tak dapat dipungkiri kesan bahwa analisisnya terbatas pada kelas menengah perkotaan.", ["Kelemahan buku itu menurut ulasan adalah...", "analisis terbatas pada kelas menengah perkotaan", "terlalu banyak sumber", "bahasanya terlalu santai", "tidak membahas era Meiji"]],
      ["それでも、近代史研究を志す者にとって必読の一冊と言えよう。", "Soredemo, kindaishi kenkyuu o kokorozasu mono ni totte hitsudoku no issatsu to ieyou.", "Meski begitu, buku ini bisa disebut wajib baca bagi yang bercita-cita meneliti sejarah modern."],
    ],
  ],
  // 4. Abstrak penelitian
  [
    [
      ["効果を検証する", "Kouka o kenshou suru", "memverifikasi efek"],
      ["聞き取り調査", "Kikitori chousa", "survei wawancara"],
      ["が明らかになった", "Ga akiraka ni natta", "menjadi jelas bahwa"],
      ["示唆を得た", "Shisa o eta", "memperoleh isyarat", ["Panjang abstrak N1 yang umum adalah...", "200–400 karakter", "20 karakter", "5.000 karakter", "satu halaman penuh"]],
    ],
    [
      ["外国人観光客の増加に伴い、多言語案内の質が問われている。", "Gaikokujin kankoukyaku no zouka ni tomonai, tagengo annai no shitsu ga towarete iru.", "Seiring bertambahnya wisatawan asing, kualitas panduan multibahasa dipertanyakan."],
      ["本研究は、やさしい日本語による案内表示の効果を検証した。", "Hon kenkyuu wa, yasashii nihongo ni yoru annai hyouji no kouka o kenshou shita.", "Penelitian ini memverifikasi efek papan petunjuk menggunakan bahasa Jepang sederhana."],
      ["京都市内の観光地で、訪日客百五十名への聞き取り調査を行った。", "Kyoutoshinai no kankouchi de, hounichikyaku hyaku gojuumei e no kikitori chousa o okonatta.", "Survei wawancara dilakukan terhadap 150 wisatawan asing di tempat wisata dalam kota Kyoto.", ["Berapa wisatawan yang diwawancarai?", "150 orang", "15 orang", "1.500 orang", "50 orang"]],
      ["その結果、英語が母語でない旅行者ほど理解度が高まることが明らかになった。", "Sono kekka, eigo ga bogo de nai ryokousha hodo rikaido ga takamaru koto ga akiraka ni natta.", "Hasilnya menunjukkan bahwa makin bukan penutur asli bahasa Inggris, makin tinggi tingkat pemahamannya."],
    ],
  ],
  // 5. Ringkasan eksekutif
  [
    [
      ["結論から述べる", "Ketsuron kara noberu", "menyampaikan mulai dari kesimpulan"],
      ["を目途に", "O meto ni", "dengan target"],
      ["黒字化を見込む", "Kuroji ka o mikomu", "memperkirakan menjadi untung"],
      ["別紙にて詳述する", "Besshi nite shoujutsu suru", "diuraikan rinci di lampiran", ["Ciri utama ringkasan eksekutif adalah...", "kesimpulan dan rekomendasi diletakkan di awal", "detail teknis di awal", "tanpa kesimpulan", "berisi cerita panjang"]],
    ],
    [
      ["結論から述べると、旧工場の売却を本年度中に実施すべきである。", "Ketsuron kara noberu to, kyuu koujou no baikyaku o honnendochuu ni jisshi subeki de aru.", "Langsung pada kesimpulan, penjualan pabrik lama sebaiknya dilaksanakan dalam tahun fiskal ini.", ["Rekomendasi utama ringkasan eksekutif itu adalah...", "menjual pabrik lama tahun fiskal ini", "membangun pabrik baru", "menambah karyawan", "menunda semua keputusan"]],
      ["維持費が年々増加し、収益を圧迫しているためである。", "Ijihi ga nennen zouka shi, shuueki o appaku shite iru tame de aru.", "Sebab biaya pemeliharaan meningkat tiap tahun dan menekan pendapatan."],
      ["売却益は、新製品の開発に充てることを想定している。", "Baikyakueki wa, shinseihin no kaihatsu ni ateru koto o soutei shite iru.", "Keuntungan penjualan direncanakan dialokasikan untuk pengembangan produk baru."],
      ["従業員の配置転換については、別紙にて詳述する。", "Juugyouin no haichi tenkan ni tsuite wa, besshi nite shoujutsu suru.", "Mengenai rotasi penempatan karyawan, akan diuraikan rinci di lampiran."],
    ],
  ],
  // 6. Draf pidato formal
  [
    [
      ["節目を迎える", "Fushime o mukaeru", "menyambut tonggak"],
      ["先人たちの努力", "Senjintachi no doryoku", "usaha para pendahulu"],
      ["心より御礼申し上げます", "Kokoro yori onrei moushiagemasu", "dari lubuk hati kami berterima kasih"],
      ["結びに", "Musubi ni", "sebagai penutup", ["Struktur draf pidato formal yang baik adalah...", "salam formal → pesan inti → kisah singkat → harapan", "lelucon → selesai", "data teknis saja", "kritik → pamit"]],
    ],
    [
      ["本日、ご来賓の皆様にご臨席いただき、心より御礼申し上げます。", "Honjitsu, goraihin no minasama ni gorinseki itadaki, kokoro yori onrei moushiagemasu.", "Hari ini, dari lubuk hati kami berterima kasih atas kehadiran para tamu kehormatan."],
      ["本校は今年、開校百年という節目を迎えました。", "Honkou wa kotoshi, kaikou hyakunen to iu fushime o mukaemashita.", "Sekolah kami tahun ini menyambut tonggak seratus tahun berdirinya.", ["Tonggak apa yang dirayakan dalam pidato itu?", "seratus tahun berdirinya sekolah", "lima puluh tahun perusahaan", "kelulusan siswa", "pembukaan gedung baru"]],
      ["戦火で校舎を失った時も、先人たちは青空の下で授業を続けました。", "Senka de kousha o ushinatta toki mo, senjintachi wa aozora no moto de jugyou o tsuzukemashita.", "Bahkan saat kehilangan gedung sekolah akibat perang, para pendahulu terus mengajar di bawah langit terbuka."],
      ["結びに、本校のさらなる発展を祈念し、ご挨拶といたします。", "Musubi ni, honkou no sara naru hatten o kinen shi, goaisatsu to itashimasu.", "Sebagai penutup, saya mendoakan perkembangan sekolah kita lebih lanjut, demikian sambutan saya."],
    ],
  ],
  // 7. Sintesis argumen
  [
    [
      ["相容れない", "Aiirenai", "tidak bisa didamaikan"],
      ["という点で共通している", "To iu ten de kyoutsuu shite iru", "sama dalam hal ..."],
      ["架橋する", "Kakyou suru", "menjembatani"],
      ["をめぐっては", "O megutte wa", "seputar ..."],
    ],
    [
      ["原子力発電をめぐっては、安定供給を重視する立場と安全を最優先する立場がある。", "Genshiryoku hatsuden o megutte wa, antei kyoukyuu o juushi suru tachiba to anzen o saiyuusen suru tachiba ga aru.", "Seputar pembangkit listrik tenaga nuklir, ada posisi yang mementingkan pasokan stabil dan posisi yang memprioritaskan keamanan."],
      ["両者の主張は、一見相容れないように見える。", "Ryousha no shuchou wa, ikken aiirenai you ni mieru.", "Klaim keduanya sekilas tampak tidak bisa didamaikan."],
      ["しかし、将来世代への責任を果たそうとする点で共通している。", "Shikashi, shourai sedai e no sekinin o hatasou to suru ten de kyoutsuu shite iru.", "Namun, keduanya sama dalam hal berusaha memenuhi tanggung jawab kepada generasi mendatang.", ["Persamaan kedua posisi menurut teks adalah...", "tanggung jawab kepada generasi mendatang", "keinginan menaikkan harga listrik", "penolakan terhadap energi apa pun", "dukungan pada batu bara"]],
      ["両者を架橋するのは、透明性の高い情報公開と段階的な移行計画であろう。", "Ryousha o kakyou suru no wa, toumeisei no takai jouhou koukai to dankaiteki na ikou keikaku de arou.", "Yang menjembatani keduanya mungkin keterbukaan informasi yang transparan dan rencana transisi bertahap."],
    ],
  ],
  // 8. Tanggapan sastra
  [
    [
      ["を正当化する", "O seitouka suru", "membenarkan"],
      ["判断を委ねる", "Handan o yudaneru", "menyerahkan penilaian"],
      ["突きつけられる", "Tsukitsukerareru", "dihadapkan"],
      ["極限状況", "Kyokugen joukyou", "situasi ekstrem", ["Tanggapan sastra yang baik berurutan...", "tesis tafsiran → bukti dari teks → konteks → makna masa kini", "ringkasan saja", "biografi → harga buku", "pendapat tanpa bukti"]],
    ],
    [
      ["宮沢賢治の「よだかの星」は、自己犠牲と救済を描いた作品である。", "Miyazawa Kenji no \"Yodaka no hoshi\" wa, jiko gisei to kyuusai o egaita sakuhin de aru.", "\"Yodaka no Hoshi\" karya Miyazawa Kenji adalah karya yang menggambarkan pengorbanan diri dan keselamatan."],
      ["醜いと蔑まれたよだかは、生きることそのものに罪悪感を抱く。", "Minikui to sagesumareta yodaka wa, ikiru koto sono mono ni zaiakukan o idaku.", "Burung yodaka yang dihina karena buruk rupa memendam rasa bersalah atas hidup itu sendiri.", ["Perasaan burung yodaka dalam cerita itu adalah...", "rasa bersalah karena hidup", "bangga pada dirinya", "marah pada bintang", "bahagia bersama teman"]],
      ["星となって燃え続ける結末は、苦しみの昇華として読むことができる。", "Hoshi to natte moetsuzukeru ketsumatsu wa, kurushimi no shouka to shite yomu koto ga dekiru.", "Akhir cerita di mana ia menjadi bintang yang terus menyala bisa dibaca sebagai sublimasi penderitaan."],
      ["生きる意味を問うこの物語は、現代の読者にも重い問いを突きつける。", "Ikiru imi o tou kono monogatari wa, gendai no dokusha ni mo omoi toi o tsukitsukeru.", "Cerita yang mempertanyakan makna hidup ini juga menghadapkan pertanyaan berat kepada pembaca masa kini."],
    ],
  ],
  // 9. Kritik media
  [
    [
      ["強調される", "Kyouchou sareru", "ditonjolkan"],
      ["見えにくくなる", "Mienikuku naru", "menjadi sulit terlihat"],
      ["構造的な問題", "Kouzouteki na mondai", "masalah struktural"],
      ["文脈を伝える", "Bunmyaku o tsutaeru", "menyampaikan konteks", ["Struktur kritik media tertulis adalah...", "kasus → teknik framing → dampak → usulan", "iklan → harga", "usulan saja", "biografi wartawan"]],
    ],
    [
      ["生活保護をめぐる報道では、不正受給の事例ばかりが繰り返し取り上げられる。", "Seikatsu hogo o meguru houdou de wa, fusei jukyuu no jirei bakari ga kurikaeshi toriagerareru.", "Dalam pemberitaan seputar bantuan sosial, hanya kasus penerimaan curang yang diangkat berulang-ulang."],
      ["実際には、不正受給の割合は全体の一パーセントにも満たない。", "Jissai ni wa, fusei jukyuu no wariai wa zentai no ichi paasento ni mo mitanai.", "Kenyataannya, proporsi penerimaan curang bahkan kurang dari satu persen dari keseluruhan.", ["Menurut data dalam teks, proporsi penerimaan curang adalah...", "kurang dari 1%", "sekitar 10%", "lebih dari separuh", "sekitar 30%"]],
      ["偏った報道は、本当に支援を必要とする人々を申請から遠ざけてしまう。", "Katayotta houdou wa, hontou ni shien o hitsuyou to suru hitobito o shinsei kara toozakete shimau.", "Pemberitaan yang bias justru menjauhkan orang yang benar-benar membutuhkan dari pengajuan bantuan."],
      ["報道機関は、数字の文脈を正確に伝える責任を果たすべきである。", "Houdou kikan wa, suuji no bunmyaku o seikaku ni tsutaeru sekinin o hatasu beki de aru.", "Lembaga pers seharusnya memenuhi tanggung jawab menyampaikan konteks angka secara akurat."],
    ],
  ],
  // 10. Memo risiko
  [
    [
      ["発生確率", "Hassei kakuritsu", "probabilitas kejadian"],
      ["影響度", "Eikyoudo", "tingkat dampak"],
      ["対応策", "Taiousaku", "langkah penanganan"],
      ["責任者", "Sekininsha", "penanggung jawab", ["Memo risiko yang lengkap memuat...", "risiko, probabilitas, dampak, mitigasi, penanggung jawab", "salam pembuka panjang", "riwayat perusahaan", "daftar menu kantin"]],
    ],
    [
      ["リスク二：システム障害による受注業務の停止。", "Risuku ni: shisutemu shougai ni yoru juchuu gyoumu no teishi.", "Risiko 2: terhentinya pekerjaan penerimaan pesanan akibat gangguan sistem."],
      ["発生確率は低いものの、影響度は極めて高い。", "Hassei kakuritsu wa hikui mono no, eikyoudo wa kiwamete takai.", "Meskipun probabilitasnya rendah, tingkat dampaknya sangat tinggi.", ["Penilaian risiko 2 menurut memo adalah...", "probabilitas rendah, dampak sangat tinggi", "probabilitas tinggi, dampak rendah", "keduanya rendah", "keduanya sedang"]],
      ["対応策として、予備サーバーを別地域に設置する。", "Taiousaku to shite, yobi saabaa o betsu chiiki ni setchi suru.", "Sebagai langkah penanganan, server cadangan dipasang di wilayah lain."],
      ["責任者は情報システム部長とし、半期ごとに訓練を実施する。", "Sekininsha wa jouhou shisutemu buchou to shi, hanki goto ni kunren o jisshi suru.", "Penanggung jawabnya kepala divisi sistem informasi, dengan latihan dilaksanakan setiap semester."],
    ],
  ],
  // 11. Posisi etis
  [
    [
      ["この原則に立てば", "Kono gensoku ni tateba", "berdasarkan prinsip ini"],
      ["正当化され得ない", "Seitouka sareenai", "tidak dapat dibenarkan"],
      ["例外を認める", "Reigai o mitomeru", "mengakui pengecualian"],
      ["厳格に限定する", "Genkaku ni gentei suru", "membatasi dengan ketat", ["Struktur posisi etis adalah...", "nyatakan prinsip → terapkan pada kasus → akui keberatan", "cerita pribadi saja", "statistik saja", "hanya mengkritik orang lain"]],
    ],
    [
      ["動物の命は、人間の娯楽のために奪われるべきではない。", "Doubutsu no inochi wa, ningen no goraku no tame ni ubawareru beki de wa nai.", "Nyawa hewan tidak seharusnya direnggut demi hiburan manusia."],
      ["この原則に立てば、娯楽目的の狩猟は正当化され得ない。", "Kono gensoku ni tateba, goraku mokuteki no shuryou wa seitouka sareenai.", "Berdasarkan prinsip ini, perburuan untuk hiburan tidak dapat dibenarkan.", ["Kesimpulan dari prinsip itu adalah...", "perburuan untuk hiburan tidak dapat dibenarkan", "semua perburuan boleh", "hewan tidak perlu dilindungi", "hiburan lebih penting"]],
      ["ただし、生態系を守るための個体数調整は例外と考える余地がある。", "Tadashi, seitaikei o mamoru tame no kotaisuu chousei wa reigai to kangaeru yochi ga aru.", "Namun, ada ruang untuk menganggap pengaturan populasi demi menjaga ekosistem sebagai pengecualian."],
      ["その場合も、方法と規模を厳格に限定しなければならない。", "Sono baai mo, houhou to kibo o genkaku ni gentei shinakereba naranai.", "Dalam hal itu pun, metode dan skalanya harus dibatasi dengan ketat."],
    ],
  ],
  // 12. Email negosiasi profesional
  [
    [
      ["との結論に至りました", "To no ketsuron ni itarimashita", "kami sampai pada kesimpulan bahwa"],
      ["代替案", "Daitaian", "usulan alternatif"],
      ["幸甚です", "Koujin desu", "kami akan sangat berterima kasih"],
      ["ご提示いただいた条件", "Goteiji itadaita jouken", "syarat yang Anda ajukan", ["Urutan email negosiasi profesional adalah...", "apresiasi → posisi → usulan alternatif → ajakan bertemu", "penolakan → selesai", "ancaman → tuntutan", "harga saja"]],
    ],
    [
      ["この度は、共同開発のご提案をいただき、誠にありがとうございます。", "Kono tabi wa, kyoudou kaihatsu no goteian o itadaki, makoto ni arigatou gozaimasu.", "Terima kasih banyak atas usulan pengembangan bersama kali ini."],
      ["慎重に検討いたしました結果、費用の折半は難しいとの結論に至りました。", "Shinchou ni kentou itashimashita kekka, hiyou no seppan wa muzukashii to no ketsuron ni itarimashita.", "Setelah mempertimbangkan dengan hati-hati, kami sampai pada kesimpulan bahwa pembagian biaya rata sulit dilakukan.", ["Hal yang ditolak dalam email itu adalah...", "pembagian biaya secara rata", "pengembangan bersama secara keseluruhan", "pertemuan langsung", "jadwal proyek"]],
      ["代替案として、弊社が技術者を派遣する形はいかがでしょうか。", "Daitaian to shite, heisha ga gijutsusha o haken suru katachi wa ikaga deshou ka.", "Sebagai usulan alternatif, bagaimana jika kami mengirimkan teknisi?"],
      ["ご多忙中恐縮ですが、来週中にご面談の機会をいただければ幸甚です。", "Gotabouchuu kyoushuku desu ga, raishuuchuu ni gomendan no kikai o itadakereba koujin desu.", "Mohon maaf mengganggu kesibukan Anda, kami akan sangat berterima kasih jika diberi kesempatan bertemu dalam minggu depan."],
    ],
  ],
  // 13. Proposal hibah
  [
    [
      ["独創性", "Dokusousei", "orisinalitas"],
      ["予備調査", "Yobi chousa", "survei pendahuluan"],
      ["波及効果", "Hakyuu kouka", "efek berantai"],
      ["申請額の内訳", "Shinseigaku no uchiwake", "rincian dana yang diajukan", ["Proposal hibah yang kuat menekankan...", "kebaruan, kelayakan, dampak sosial, dan anggaran", "jumlah halaman", "jabatan peneliti saja", "hobi peneliti"]],
    ],
    [
      ["本研究の独創性は、高齢者の会話データから孤立の兆候を検出する点にある。", "Hon kenkyuu no dokusousei wa, koureisha no kaiwa deeta kara koritsu no choukou o kenshutsu suru ten ni aru.", "Orisinalitas penelitian ini terletak pada pendeteksian tanda isolasi dari data percakapan lansia.", ["Orisinalitas penelitian itu adalah...", "mendeteksi tanda isolasi dari data percakapan lansia", "membangun panti jompo", "mengajar lansia bahasa asing", "mengukur tinggi badan lansia"]],
      ["予備調査では、二つの自治体の協力を既に得ている。", "Yobi chousa de wa, futatsu no jichitai no kyouryoku o sude ni ete iru.", "Dalam survei pendahuluan, kerja sama dari dua pemerintah daerah sudah diperoleh."],
      ["成果は、見守りサービスの改善に大きな波及効果をもたらすであろう。", "Seika wa, mimamori saabisu no kaizen ni ookina hakyuu kouka o motarasu de arou.", "Hasilnya diharapkan membawa efek berantai besar bagi perbaikan layanan pemantauan."],
      ["申請額の内訳は、データ分析費が五割、人件費が四割である。", "Shinseigaku no uchiwake wa, deeta bunsekihi ga gowari, jinkenhi ga yonwari de aru.", "Rincian dana yang diajukan: biaya analisis data lima puluh persen, biaya tenaga kerja empat puluh persen."],
    ],
  ],
  // 14. Pembuka retoris
  [
    [
      ["ある哲学者はそう書いた", "Aru tetsugakusha wa sou kaita", "begitu tulis seorang filsuf"],
      ["素朴な問い", "Soboku na toi", "pertanyaan sederhana"],
      ["から出発したい", "Kara shuppatsu shitai", "ingin berangkat dari"],
      ["一つの光景", "Hitotsu no koukei", "sebuah pemandangan", ["Pembuka retoris bisa berupa...", "kutipan, pertanyaan, paradoks, atau adegan konkret", "daftar isi", "ucapan terima kasih", "biodata penulis"]],
    ],
    [
      ["朝の満員電車で、誰もが手元の画面を見つめている。", "Asa no manin densha de, dare mo ga temoto no gamen o mitsumete iru.", "Di kereta penuh sesak pagi hari, semua orang menatap layar di tangannya."],
      ["これほど多くの人に囲まれながら、私たちは誰ともつながっていない。", "Kore hodo ooku no hito ni kakomarenagara, watashitachi wa dare to mo tsunagatte inai.", "Meski dikelilingi begitu banyak orang, kita tidak terhubung dengan siapa pun.", ["Paradoks yang disampaikan pembuka itu adalah...", "dikelilingi banyak orang tetapi tidak terhubung", "kereta selalu kosong", "semua orang saling berbicara", "ponsel tidak dipakai"]],
      ["つながりとは、本来どのようなものなのだろうか。", "Tsunagari to wa, honrai dono you na mono na no darou ka.", "Sebenarnya, keterhubungan itu seperti apa?"],
      ["以下では、画面の外にあるつながりの意味から考えてみたい。", "Ika de wa, gamen no soto ni aru tsunagari no imi kara kangaete mitai.", "Berikut ini, saya ingin memikirkannya mulai dari makna keterhubungan di luar layar."],
    ],
  ],
  // 15. Menguasai sanggahan
  [
    [
      ["想定される反論", "Soutei sareru hanron", "sanggahan yang mungkin muncul"],
      ["見落としている", "Miotoshite iru", "melewatkan"],
      ["巧拙", "Kousetsu", "baik-buruknya (kepiawaian)"],
      ["有無ではなく", "Umu de wa naku", "bukan ada tidaknya", ["Teknik sanggahan tingkat lanjut adalah...", "menyajikan keberatan terkuat lalu menjawabnya dengan presisi", "mengabaikan keberatan", "menyerang pribadi lawan", "mengulang klaim tanpa alasan"]],
    ],
    [
      ["想定される反論として、外国語教育の早期化は母語の発達を妨げるという主張がある。", "Soutei sareru hanron to shite, gaikokugo kyouiku no soukika wa bogo no hattatsu o samatageru to iu shuchou ga aru.", "Sebagai sanggahan yang mungkin muncul, ada klaim bahwa pendidikan bahasa asing sejak dini menghambat perkembangan bahasa ibu."],
      ["確かに、指導法によっては混乱を招く例も報告されている。", "Tashika ni, shidouhou ni yotte wa konran o maneku rei mo houkoku sarete iru.", "Memang, ada laporan contoh yang menimbulkan kebingungan tergantung metode pengajarannya."],
      ["だが、この主張は多言語環境で育つ子どもの豊かな発達を見落としている。", "Daga, kono shuchou wa tagengo kankyou de sodatsu kodomo no yutaka na hattatsu o miotoshite iru.", "Namun, klaim ini melewatkan perkembangan kaya anak-anak yang tumbuh di lingkungan multibahasa."],
      ["問われるべきは開始時期の早さではなく、指導の質なのである。", "Towareru beki wa kaishi jiki no hayasa de wa naku, shidou no shitsu na no de aru.", "Yang seharusnya dipertanyakan bukanlah seberapa dini dimulai, melainkan kualitas pengajarannya.", ["Kesimpulan penulis setelah menjawab sanggahan adalah...", "yang penting kualitas pengajaran, bukan usia mulai", "bahasa asing harus dilarang untuk anak", "semakin dini semakin buruk", "bahasa ibu tidak penting"]],
    ],
  ],
  // 16. Menulis dengan kanji N1
  [
    [
      ["異議を唱える", "Igi o tonaeru", "menyatakan keberatan"],
      ["意義深い", "Igibukai", "sangat bermakna"],
      ["責任を追及する", "Sekinin o tsuikyuu suru", "menuntut pertanggungjawaban"],
      ["幸福を追求する", "Koufuku o tsuikyuu suru", "mengejar kebahagiaan", ["Kanji yang tepat untuk 'tsuikyuu' dalam 'menelusuri kebenaran ilmiah' adalah...", "追究", "追及", "追求", "追窮"]],
    ],
    [
      ["株主の一人が、役員人事に異議を唱えた。", "Kabunushi no hitori ga, yakuin jinji ni igi o tonaeta.", "Salah satu pemegang saham menyatakan keberatan atas penunjukan direksi."],
      ["地域の高校生と留学生が交流したのは、意義深い試みだった。", "Chiiki no koukousei to ryuugakusei ga kouryuu shita no wa, igibukai kokoromi datta.", "Interaksi antara siswa SMA setempat dan mahasiswa asing adalah upaya yang sangat bermakna."],
      ["野党は、首相の説明責任を厳しく追及した。", "Yatou wa, shushou no setsumei sekinin o kibishiku tsuikyuu shita.", "Partai oposisi dengan keras menuntut pertanggungjawaban penjelasan perdana menteri.", ["Kanji 追及 dalam kalimat itu bermakna...", "menuntut pertanggungjawaban", "mengejar keuntungan", "meneliti kebenaran", "menyusul"]],
      ["人は誰しも、自分なりの幸福を追求する権利を持つ。", "Hito wa dareshimo, jibun nari no koufuku o tsuikyuu suru kenri o motsu.", "Setiap orang memiliki hak untuk mengejar kebahagiaannya sendiri."],
    ],
  ],
  // 17. Memperhalus gaya
  [
    [
      ["問題が生じた", "Mondai ga shoujita", "masalah timbul"],
      ["劇的な変化を遂げた", "Gekiteki na henka o togeta", "mengalami perubahan dramatis"],
      ["影響を及ぼす", "Eikyou o oyobosu", "memberikan pengaruh"],
      ["慎重な検討を要する", "Shinchou na kentou o yousuru", "memerlukan kajian hati-hati", ["Versi yang lebih formal dari 'よく考える必要がある' adalah...", "慎重な検討を要する", "めっちゃ考えなきゃ", "よく考えよう", "考えたほうがいいかも"]],
    ],
    [
      ["運用開始直後に、予期せぬ問題が生じた。", "Unyou kaishi chokugo ni, yokisenu mondai ga shoujita.", "Tepat setelah operasi dimulai, timbul masalah yang tak terduga."],
      ["通信技術は、この二十年で劇的な変化を遂げた。", "Tsuushin gijutsu wa, kono nijuunen de gekiteki na henka o togeta.", "Teknologi komunikasi mengalami perubahan dramatis dalam dua puluh tahun ini."],
      ["円安は、輸入品の価格に大きな影響を及ぼしている。", "Enyasu wa, yunyuuhin no kakaku ni ookina eikyou o oyoboshite iru.", "Melemahnya yen memberikan pengaruh besar pada harga barang impor."],
      ["制度の変更は、利用者への影響も含め、慎重な検討を要する。", "Seido no henkou wa, riyousha e no eikyou mo fukume, shinchou na kentou o yousuru.", "Perubahan sistem memerlukan kajian hati-hati, termasuk dampaknya pada pengguna.", ["Gaya bahasa kalimat itu adalah...", "formal tulisan", "santai lisan", "slang anak muda", "dialek daerah"]],
    ],
  ],
  // 18. Audit koherensi
  [
    [
      ["論旨が通る", "Ronshi ga tooru", "alur argumen tersambung"],
      ["指示語", "Shijigo", "kata tunjuk"],
      ["思い切って削除する", "Omoikitte sakujo suru", "menghapus dengan tegas"],
      ["序論の問いと照合する", "Joron no toi to shougou suru", "mencocokkan dengan pertanyaan pendahuluan", ["Cara cepat memeriksa koherensi tulisan adalah...", "membaca kalimat pembuka tiap paragraf saja", "menghitung jumlah huruf", "membaca dari paragraf terakhir saja", "mengganti semua kata"]],
    ],
    [
      ["第三段落の「これ」が何を指すのか、読み手には判断しにくい。", "Daisan danraku no \"kore\" ga nani o sasu no ka, yomite ni wa handan shinikui.", "Pembaca sulit menentukan apa yang dirujuk oleh \"kore\" di paragraf ketiga.", ["Masalah koherensi yang ditemukan adalah...", "rujukan kata tunjuk tidak jelas", "paragraf terlalu pendek", "terlalu banyak data", "judul tidak menarik"]],
      ["各段落の冒頭文をつなげると、論旨が途中で飛躍している。", "Kaku danraku no boutoubun o tsunageru to, ronshi ga tochuu de hiyaku shite iru.", "Jika kalimat pembuka tiap paragraf disambungkan, alur argumennya melompat di tengah."],
      ["第二段落と第四段落の間に、両者をつなぐ説明が必要である。", "Daini danraku to daiyon danraku no aida ni, ryousha o tsunagu setsumei ga hitsuyou de aru.", "Di antara paragraf kedua dan keempat, diperlukan penjelasan yang menghubungkan keduanya."],
      ["結論は序論の問いに答えているものの、根拠の要約が不足している。", "Ketsuron wa joron no toi ni kotaete iru mono no, konkyo no youyaku ga fusoku shite iru.", "Kesimpulannya memang menjawab pertanyaan pendahuluan, tetapi ringkasan dasarnya kurang."],
    ],
  ],
  // 19. Esai 800 karakter
  [
    [
      ["序論は全体の一割五分", "Joron wa zentai no ichiwari gobu", "pendahuluan lima belas persen dari keseluruhan"],
      ["二つの下位論点", "Futatsu no kai ronten", "dua sub-argumen"],
      ["反論への応答", "Hanron e no outou", "jawaban terhadap sanggahan"],
      ["字数配分", "Jisuu haibun", "pembagian jumlah karakter", ["Pembagian esai 800 karakter yang dianjurkan adalah...", "pendahuluan 15%, isi 70%, kesimpulan 15%", "pendahuluan 50%, kesimpulan 50%", "isi 100%", "pendahuluan 70%, isi 30%"]],
    ],
    [
      ["都市への一極集中は、果たして避けられない流れなのだろうか。", "Toshi e no ikkyoku shuuchuu wa, hatashite sakerarenai nagare na no darou ka.", "Apakah pemusatan ke kota benar-benar arus yang tak terhindarkan?"],
      ["確かに、仕事や教育の機会は都市に集中している。", "Tashika ni, shigoto ya kyouiku no kikai wa toshi ni shuuchuu shite iru.", "Memang, kesempatan kerja dan pendidikan terpusat di kota."],
      ["しかし、通信技術の発達により、場所を選ばない働き方が広がりつつある。", "Shikashi, tsuushin gijutsu no hattatsu ni yori, basho o erabanai hatarakikata ga hirogaritsutsu aru.", "Namun, berkat kemajuan teknologi komunikasi, cara kerja yang tidak terikat tempat perlahan meluas."],
      ["地方の再生は、住む場所を自由に選べる社会の実現にかかっている。", "Chihou no saisei wa, sumu basho o jiyuu ni eraberu shakai no jitsugen ni kakatte iru.", "Kebangkitan daerah bergantung pada terwujudnya masyarakat yang bebas memilih tempat tinggal.", ["Kesimpulan esai itu adalah kebangkitan daerah bergantung pada...", "masyarakat yang bebas memilih tempat tinggal", "pembangunan gedung tinggi", "penutupan kota besar", "kenaikan pajak"]],
    ],
  ],
  // 20. Ulasan writing N1
  [
    [
      ["推敲の回数", "Suikou no kaisuu", "jumlah revisi"],
      ["語の選択", "Go no sentaku", "pilihan kata"],
      ["論証の深さ", "Ronshou no fukasa", "kedalaman argumentasi"],
      ["学術的な文体", "Gakujutsuteki na buntai", "gaya bahasa akademik", ["Aspek yang diperiksa dalam ulasan writing N1 adalah...", "kedalaman argumen, presisi kata, register, dan koherensi", "warna tinta", "jumlah gambar", "jenis kertas"]],
    ],
    [
      ["よい文章は、一度で書き上げられるものではない。", "Yoi bunshou wa, ichido de kakiagerareru mono de wa nai.", "Tulisan yang baik tidak bisa diselesaikan dalam sekali tulis."],
      ["論証の深さは、反対意見にどこまで向き合ったかで決まる。", "Ronshou no fukasa wa, hantai iken ni doko made mukiatta ka de kimaru.", "Kedalaman argumentasi ditentukan oleh sejauh mana menghadapi pendapat yang berlawanan.", ["Menurut kalimat itu, kedalaman argumentasi ditentukan oleh...", "sejauh mana menghadapi pendapat berlawanan", "panjang tulisan", "jumlah kosakata sulit", "kecepatan menulis"]],
      ["語の選択一つで、文章の説得力は大きく変わる。", "Go no sentaku hitotsu de, bunshou no settokuryoku wa ookiku kawaru.", "Hanya dengan satu pilihan kata, daya yakin tulisan berubah besar."],
      ["読み手を想定しながら書くことが、何よりの上達の近道である。", "Yomite o soutei shinagara kaku koto ga, nani yori no joutatsu no chikamichi de aru.", "Menulis sambil membayangkan pembaca adalah jalan pintas terbaik untuk mahir."],
    ],
  ],
];
