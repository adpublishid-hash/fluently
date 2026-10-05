import type { JapaneseQuizTopic } from '../types';

// Latihan Pronunciation N2 — one entry per topic (index = topic - 1): [Basic, Advanced].
export const pronunciation: JapaneseQuizTopic[] = [
  // 1. Presentasi formal
  [
    [
      ["概要", "Gaiyou", "garis besar"],
      ["推定", "Suitei", "perkiraan"],
      ["集約", "Shuuyaku", "pemusatan / rangkuman"],
      ["ご清聴", "Goseichou", "perhatian (saat mendengarkan)", ["Saat presentasi formal, akhir kalimat sebaiknya diucapkan...", "jelas sampai mora terakhir", "dipercepat dan ditelan", "dengan nada naik seperti bertanya", "berbisik"]],
    ],
    [
      ["まず、調査の背景からお話しいたします。", "Mazu, chousa no haikei kara ohanashi itashimasu.", "Pertama, saya akan berbicara mulai dari latar belakang survei."],
      ["次に、具体的な数字をご覧ください。", "Tsugi ni, gutaiteki na suuji o goran kudasai.", "Selanjutnya, silakan lihat angka konkretnya."],
      ["以上の点から、早期の着手が必要だと考えております。", "Ijou no ten kara, souki no chakushu ga hitsuyou da to kangaete orimasu.", "Dari poin-poin di atas, kami berpendapat perlu segera memulai."],
      ["最後に、今後のスケジュールをご説明いたします。", "Saigo ni, kongo no sukejuuru o gosetsumei itashimasu.", "Terakhir, saya akan menjelaskan jadwal ke depan.", ["Kata penanda urutan 最後に dibaca...", "saigo ni", "saikou ni", "sago ni", "saigou ni"]],
    ],
  ],
  // 2. Nuansa nada
  [
    [
      ["実は", "Jitsu wa", "sebenarnya"],
      ["残念ながら", "Zannen nagara", "sayang sekali"],
      ["なんと", "Nanto", "astaga / ternyata (terkejut)"],
      ["ひょっとして", "Hyotto shite", "jangan-jangan", ["Nada tinggi di awal kalimat biasanya menandakan...", "informasi baru atau penting", "kalimat sudah selesai", "pembicara bosan", "pertanyaan retoris"]],
    ],
    [
      ["なんと、応募者が千人を超えました。", "Nanto, oubosha ga sennin o koemashita.", "Astaga, pendaftarnya melebihi seribu orang."],
      ["ひょっとして、昨日のことを怒っていますか。", "Hyotto shite, kinou no koto o okotte imasu ka.", "Jangan-jangan, kamu marah soal kemarin?"],
      ["実を言うと、まだ一ページも読んでいないんです。", "Jitsu o iu to, mada ichi peeji mo yonde inai n desu.", "Terus terang, saya belum membaca satu halaman pun."],
      ["せっかく準備したのに、雨で中止だなんて。", "Sekkaku junbi shita noni, ame de chuushi da nante.", "Padahal sudah susah payah disiapkan, malah batal karena hujan.", ["Nada kalimat itu mengungkapkan perasaan...", "kecewa", "gembira", "takut", "bangga"]],
    ],
  ],
  // 3. Rangkaian ucapan cepat penutur asli
  [
    [
      ["言っとく", "Ittoku", "kubilang dulu (言っておく)"],
      ["しなきゃ", "Shinakya", "harus (しなければ)"],
      ["見てる", "Miteru", "sedang melihat (見ている)"],
      ["忘れちゃった", "Wasurechatta", "terlanjur lupa (忘れてしまった)", ["Bentuk santai cepat dari 〜ておく adalah...", "〜とく", "〜ちゃう", "〜きゃ", "〜てる"]],
    ],
    [
      ["先に言っとくけど、明日は無理だからね。", "Saki ni ittoku kedo, ashita wa muri da kara ne.", "Kubilang dulu ya, besok aku tidak bisa."],
      ["早く寝なきゃ、明日起きられないよ。", "Hayaku nenakya, ashita okirarenai yo.", "Kalau tidak cepat tidur, besok tidak bisa bangun, lho."],
      ["さっきから何見てるの？", "Sakki kara nani miteru no?", "Dari tadi lihat apa?"],
      ["パスワード、また忘れちゃった。", "Pasuwaado, mata wasurechatta.", "Kata sandinya, aku lupa lagi.", ["Bentuk lengkap dari 忘れちゃった adalah...", "忘れてしまった", "忘れておいた", "忘れなければ", "忘れている"]],
    ],
  ],
  // 4. Ritme berita
  [
    [
      ["閣議決定", "Kakugi kettei", "keputusan rapat kabinet"],
      ["にのぼる", "Ni noboru", "mencapai (jumlah)"],
      ["方針です", "Houshin desu", "berencana / kebijakannya"],
      ["見通しです", "Mitooshi desu", "diperkirakan", ["Ritme pembaca berita biasanya...", "tenang dengan jeda di setiap klausa", "sangat cepat tanpa jeda", "naik-turun penuh emosi", "berhenti di tengah kata"]],
    ],
    [
      ["気象庁によりますと、台風十号は明日の朝、九州に上陸する見通しです。", "Kishouchou ni yorimasu to, taifuu juugou wa ashita no asa, Kyuushuu ni jouriku suru mitooshi desu.", "Menurut Badan Meteorologi, topan nomor 10 diperkirakan mendarat di Kyushu besok pagi.", ["Menurut berita, topan diperkirakan mendarat...", "besok pagi di Kyushu", "malam ini di Tokyo", "besok malam di Hokkaido", "minggu depan di Osaka"]],
      ["けが人の数は、これまでに三十人にのぼっています。", "Keganin no kazu wa, kore made ni sanjuunin ni nobotte imasu.", "Jumlah korban luka sejauh ini mencapai tiga puluh orang."],
      ["警察は、事故の詳しい原因を調べています。", "Keisatsu wa, jiko no kuwashii genin o shirabete imasu.", "Polisi sedang menyelidiki penyebab rinci kecelakaan."],
      ["続いて、スポーツのニュースです。", "Tsuzuite, supootsu no nyuusu desu.", "Berikutnya, berita olahraga."],
    ],
  ],
  // 5. Kelancaran keigo
  [
    [
      ["お手数をおかけします", "Otesuu o okake shimasu", "maaf merepotkan"],
      ["少々お待ちくださいませ", "Shoushou omachi kudasaimase", "mohon tunggu sebentar"],
      ["かしこまりました", "Kashikomarimashita", "baik, saya mengerti (sopan)"],
      ["おそれいりますが", "Osoreirimasu ga", "mohon maaf, tetapi", ["Kunci mengucapkan keigo panjang dengan baik adalah...", "mulus tanpa tersendat di tengah frasa", "berhenti setiap dua mora", "mengucapkan dengan nada marah", "menyingkat semua kata"]],
    ],
    [
      ["かしこまりました。担当の者に申し伝えます。", "Kashikomarimashita. Tantou no mono ni moushitsutaemasu.", "Baik, saya mengerti. Akan saya sampaikan kepada petugas yang bertanggung jawab."],
      ["おそれいりますが、お名前をもう一度お願いできますか。", "Osoreirimasu ga, onamae o mou ichido onegai dekimasu ka.", "Mohon maaf, bisakah Anda menyebutkan nama sekali lagi?"],
      ["本日はご来店いただき、誠にありがとうございます。", "Honjitsu wa goraiten itadaki, makoto ni arigatou gozaimasu.", "Terima kasih banyak atas kunjungan Anda ke toko kami hari ini."],
      ["お荷物は、こちらでお預かりいたします。", "Onimotsu wa, kochira de oazukari itashimasu.", "Barang bawaan Anda akan kami simpan di sini.", ["Ungkapan お預かりいたします berarti...", "akan kami simpan / titipkan", "akan kami buang", "akan kami jual", "akan kami kirim"]],
    ],
  ],
  // 6. Intonasi kontras
  [
    [
      ["量より質", "Ryou yori shitsu", "kualitas daripada kuantitas"],
      ["建前と本音", "Tatemae to honne", "basa-basi dan isi hati"],
      ["理想と現実", "Risou to genjitsu", "ideal dan kenyataan"],
      ["表と裏", "Omote to ura", "depan dan belakang / luar dan dalam", ["Dalam kalimat kontras, nada tinggi diberikan pada...", "kedua hal yang dibandingkan", "partikel saja", "akhir kalimat saja", "kata kerja saja"]],
    ],
    [
      ["建前では賛成でも、本音では反対の人が多いです。", "Tatemae de wa sansei demo, honne de wa hantai no hito ga ooi desu.", "Banyak orang yang di luar setuju, tetapi dalam hati menentang."],
      ["理想と現実の差は、思ったより大きかったです。", "Risou to genjitsu no sa wa, omotta yori ookikatta desu.", "Jarak antara ideal dan kenyataan lebih besar dari dugaan."],
      ["値段は高いけれど、その分長く使えます。", "Nedan wa takai keredo, sono bun nagaku tsukaemasu.", "Harganya mahal, tetapi sebanding karena bisa dipakai lama."],
      ["話すのは得意ですが、書くのは苦手です。", "Hanasu no wa tokui desu ga, kaku no wa nigate desu.", "Saya pandai berbicara, tetapi lemah dalam menulis.", ["Dalam kalimat itu, yang dikontraskan adalah...", "berbicara dan menulis", "membaca dan mendengar", "pandai dan pintar", "harga dan kualitas"]],
    ],
  ],
  // 7. Menandai sikap
  [
    [
      ["やはり", "Yahari", "ternyata memang (sesuai dugaan)"],
      ["まさか", "Masaka", "tidak mungkin / tak disangka"],
      ["さすがプロ", "Sasuga puro", "memang profesional"],
      ["どうせ", "Douse", "toh / bagaimanapun juga (pasrah)", ["Kata どうせ biasanya menandakan sikap...", "pasrah atau pesimis", "sangat gembira", "kagum", "terkejut senang"]],
    ],
    [
      ["さすがプロですね、仕上がりが違います。", "Sasuga puro desu ne, shiagari ga chigaimasu.", "Memang profesional, ya, hasilnya beda."],
      ["どうせ私が言っても、聞いてくれないでしょう。", "Douse watashi ga itte mo, kiite kurenai deshou.", "Toh meskipun aku yang bilang, kamu tidak akan mendengarkan, kan?", ["Sikap pembicara dalam kalimat itu adalah...", "pasrah dan kecewa", "kagum", "bersemangat", "bersyukur"]],
      ["まさか彼が優勝するなんて、誰も思わなかった。", "Masaka kare ga yuushou suru nante, dare mo omowanakatta.", "Tak ada yang menyangka dia akan juara."],
      ["やはり、最初の案のほうがよかったですね。", "Yahari, saisho no an no hou ga yokatta desu ne.", "Ternyata memang usulan pertama yang lebih baik, ya."],
    ],
  ],
  // 8. Menjawab dalam tanya jawab
  [
    [
      ["改めてお答えします", "Aratamete okotae shimasu", "akan saya jawab kembali"],
      ["おっしゃる通りです", "Ossharu toori desu", "benar seperti yang Anda katakan"],
      ["補足いたしますと", "Hosoku itashimasu to", "sebagai tambahan"],
      ["確認してお答えします", "Kakunin shite okotae shimasu", "akan saya periksa lalu jawab", ["Nada yang tepat saat menjawab pertanyaan di presentasi adalah...", "tenang dan jelas", "terburu-buru", "defensif dan keras", "sangat pelan sampai tak terdengar"]],
    ],
    [
      ["おっしゃる通り、コストは課題の一つです。", "Ossharu toori, kosuto wa kadai no hitotsu desu.", "Benar seperti yang Anda katakan, biaya adalah salah satu tantangan."],
      ["補足いたしますと、すでに対策を検討しております。", "Hosoku itashimasu to, sude ni taisaku o kentou shite orimasu.", "Sebagai tambahan, kami sudah mempertimbangkan langkah penanganannya."],
      ["その点は、確認してから改めてお答えします。", "Sono ten wa, kakunin shite kara aratamete okotae shimasu.", "Soal itu, akan saya periksa dulu lalu saya jawab kembali.", ["Jawaban itu tepat dipakai saat...", "belum bisa menjawab dengan pasti", "sangat yakin dengan jawabannya", "tidak mau menjawab sama sekali", "pertanyaannya tidak sopan"]],
      ["ほかにご質問がなければ、これで終わります。", "Hoka ni goshitsumon ga nakereba, kore de owarimasu.", "Jika tidak ada pertanyaan lain, sesi ini saya akhiri."],
    ],
  ],
  // 9. Nada persuasif
  [
    [
      ["今こそ", "Ima koso", "justru sekarang"],
      ["必ず", "Kanarazu", "pasti"],
      ["一緒に", "Issho ni", "bersama-sama"],
      ["想像してみてください", "Souzou shite mite kudasai", "cobalah bayangkan", ["Saat menyampaikan poin utama secara persuasif, tempo sebaiknya...", "sedikit diperlambat", "dipercepat drastis", "sama dengan bacaan cepat", "dihentikan lama sekali"]],
    ],
    [
      ["十年後の自分の姿を、想像してみてください。", "Juunengo no jibun no sugata o, souzou shite mite kudasai.", "Cobalah bayangkan sosok diri Anda sepuluh tahun lagi."],
      ["小さな習慣が、必ず大きな結果につながります。", "Chiisana shuukan ga, kanarazu ookina kekka ni tsunagarimasu.", "Kebiasaan kecil pasti berujung pada hasil besar."],
      ["迷っている時間は、もうありません。", "Mayotte iru jikan wa, mou arimasen.", "Sudah tidak ada waktu untuk ragu."],
      ["一緒に、この町の未来をつくりましょう。", "Issho ni, kono machi no mirai o tsukurimashou.", "Mari bersama-sama membangun masa depan kota ini.", ["Ajakan dalam kalimat itu adalah...", "membangun masa depan kota bersama", "meninggalkan kota", "menunda keputusan", "mengkritik pemerintah"]],
    ],
  ],
  // 10. Ritme komentar data
  [
    [
      ["三億二千万", "San oku nisen man", "tiga ratus dua puluh juta"],
      ["四分の三", "Yon bun no san", "tiga perempat"],
      ["五・八パーセント", "Go ten hachi paasento", "5,8 persen"],
      ["百二十万人", "Hyaku nijuuman nin", "1,2 juta orang", ["Angka 三億二千万 sebaiknya dibaca dengan jeda...", "setelah 三億", "setelah 三", "setelah 二", "tanpa jeda sama sekali"]],
    ],
    [
      ["来場者数は、前年の一・五倍に増えました。", "Raijousha suu wa, zennen no itten go bai ni fuemashita.", "Jumlah pengunjung bertambah satu setengah kali dari tahun sebelumnya."],
      ["回答者の四分の三が、制度の継続を希望しています。", "Kaitousha no yon bun no san ga, seido no keizoku o kibou shite imasu.", "Tiga perempat responden menginginkan sistem itu dilanjutkan.", ["Menurut data, responden yang ingin sistem dilanjutkan adalah...", "tiga perempat", "sepertiga", "setengah", "seperempat"]],
      ["失業率は五・八パーセントまで上昇しました。", "Shitsugyouritsu wa go ten hachi paasento made joushou shimashita.", "Tingkat pengangguran naik hingga 5,8 persen."],
      ["会員数は、半年で百二十万人に達しました。", "Kaiin suu wa, hantoshi de hyaku nijuuman nin ni tasshimashita.", "Jumlah anggota mencapai 1,2 juta orang dalam setengah tahun."],
    ],
  ],
  // 11. Jeda akademik
  [
    [
      ["仮説", "Kasetsu", "hipotesis"],
      ["検証", "Kenshou", "verifikasi / pengujian"],
      ["定義", "Teigi", "definisi"],
      ["概念", "Gainen", "konsep", ["Dalam presentasi akademik, jeda sebaiknya diberikan...", "setelah istilah teknis", "di tengah kata", "sebelum partikel", "tidak pernah"]],
    ],
    [
      ["この考え方を、「同調圧力」と言います。", "Kono kangaekata o, \"douchou atsuryoku\" to iimasu.", "Cara berpikir ini disebut \"tekanan untuk menyesuaikan diri\"."],
      ["まず、仮説を立て、それを実験で検証しました。", "Mazu, kasetsu o tate, sore o jikken de kenshou shimashita.", "Pertama, kami membuat hipotesis, lalu mengujinya dengan eksperimen."],
      ["ここでは、「若者」を十八歳から二十九歳と定義します。", "Koko de wa, \"wakamono\" o juuhassai kara nijuukyuusai to teigi shimasu.", "Di sini, \"anak muda\" didefinisikan sebagai usia 18 hingga 29 tahun.", ["Menurut definisi itu, 'anak muda' adalah usia...", "18 sampai 29 tahun", "13 sampai 19 tahun", "20 sampai 39 tahun", "15 sampai 24 tahun"]],
      ["この概念は、教育の分野でも応用されています。", "Kono gainen wa, kyouiku no bunya de mo ouyou sarete imasu.", "Konsep ini juga diterapkan di bidang pendidikan."],
    ],
  ],
  // 12. Kelancaran saat memperbaiki ucapan
  [
    [
      ["というか", "To iu ka", "eh, maksudnya"],
      ["正確には", "Seikaku ni wa", "tepatnya"],
      ["失礼しました", "Shitsurei shimashita", "maaf (saya keliru)"],
      ["訂正します", "Teisei shimasu", "saya koreksi", ["Saat salah ucap dalam presentasi, sebaiknya...", "segera mengoreksi tanpa berhenti lama", "diam lama lalu mulai dari awal", "pura-pura tidak salah", "tertawa lama"]],
    ],
    [
      ["失礼しました。正しくは、二〇二三年のデータです。", "Shitsurei shimashita. Tadashiku wa, nisen nijuusan nen no deeta desu.", "Maaf, yang benar adalah data tahun 2023."],
      ["先ほどの数字を訂正します。三割ではなく、四割です。", "Sakihodo no suuji o teisei shimasu. Sanwari de wa naku, yonwari desu.", "Saya koreksi angka tadi. Bukan tiga puluh persen, melainkan empat puluh persen.", ["Angka yang benar setelah dikoreksi adalah...", "40%", "30%", "34%", "3%"]],
      ["会議は午後、というか、夕方からになりそうです。", "Kaigi wa gogo, to iu ka, yuugata kara ni narisou desu.", "Rapatnya siang, eh, maksudnya sepertinya mulai sore."],
      ["参加者は二十人、正確には二十二人です。", "Sankasha wa nijuunin, seikaku ni wa nijuuninin desu.", "Pesertanya dua puluh orang, tepatnya dua puluh dua orang."],
    ],
  ],
  // 13. Napas untuk kalimat panjang
  [
    [
      ["息継ぎ", "Ikitsugi", "mengambil napas (saat bicara)"],
      ["区切り", "Kugiri", "batas / jeda"],
      ["読点", "Touten", "tanda koma Jepang (、)"],
      ["一息で", "Hitoiki de", "dalam satu tarikan napas", ["Tempat terbaik mengambil napas dalam kalimat panjang adalah...", "di batas klausa (koma)", "di tengah kata", "di antara kata dan partikelnya", "sebelum mora terakhir"]],
    ],
    [
      ["新しい制度が始まることで、手続きが簡単になり、待ち時間も短くなる見込みです。", "Atarashii seido ga hajimaru koto de, tetsuzuki ga kantan ni nari, machijikan mo mijikaku naru mikomi desu.", "Dengan dimulainya sistem baru, prosedur diperkirakan menjadi mudah dan waktu tunggu juga lebih singkat."],
      ["駅前の再開発については、住民の意見を聞きながら、慎重に進めていく予定です。", "Ekimae no saikaihatsu ni tsuite wa, juumin no iken o kikinagara, shinchou ni susumete iku yotei desu.", "Mengenai pembangunan ulang depan stasiun, direncanakan berjalan hati-hati sambil mendengar pendapat warga."],
      ["今回の調査では、参加者の約半数が、運動不足を感じていると答えました。", "Konkai no chousa de wa, sankasha no yaku hansuu ga, undou busoku o kanjite iru to kotaemashita.", "Dalam survei kali ini, sekitar separuh peserta menjawab merasa kurang olahraga.", ["Menurut survei, yang merasa kurang olahraga adalah...", "sekitar separuh peserta", "semua peserta", "sepertiga peserta", "sedikit sekali peserta"]],
      ["読点のところで息を吸うと、長い文でも落ち着いて読めます。", "Touten no tokoro de iki o suu to, nagai bun demo ochitsuite yomemasu.", "Jika menarik napas di tanda koma, kalimat panjang pun bisa dibaca dengan tenang."],
    ],
  ],
  // 14. Emosi tersirat
  [
    [
      ["別にいいけど", "Betsu ni ii kedo", "ya sudahlah (tidak puas)"],
      ["ほっとした", "Hotto shita", "lega"],
      ["がっかり", "Gakkari", "kecewa"],
      ["照れくさい", "Terekusai", "malu-malu"],
    ],
    [
      ["別にいいけど、一言言ってほしかったな。", "Betsu ni ii kedo, hitokoto itte hoshikatta na.", "Ya sudahlah, tapi aku ingin kamu bilang sepatah kata.", ["Perasaan tersirat dalam kalimat itu adalah...", "agak kesal / tidak puas", "sangat gembira", "lega", "takut"]],
      ["全員無事だと聞いて、本当にほっとしました。", "Zenin buji da to kiite, hontou ni hotto shimashita.", "Saya sungguh lega mendengar semua orang selamat."],
      ["楽しみにしていたのに、がっかりです。", "Tanoshimi ni shite ita noni, gakkari desu.", "Padahal sudah menantikannya, saya kecewa."],
      ["そんなに褒められると、照れくさいです。", "Sonna ni homerareru to, terekusai desu.", "Kalau dipuji sebegitunya, saya jadi malu-malu."],
    ],
  ],
  // 15. Frasa berklausa banyak
  [
    [
      ["ながら", "Nagara", "sambil"],
      ["おかげで", "Okage de", "berkat"],
      ["結果的に", "Kekkateki ni", "pada akhirnya"],
      ["道が混んでいた", "Michi ga konde ita", "jalan sedang macet", ["Pada kalimat berklausa banyak, nada sebaiknya...", "dinaikkan lagi di awal tiap klausa baru", "turun terus sampai akhir", "datar tanpa perubahan", "naik di setiap partikel"]],
    ],
    [
      ["道が混んでいたにもかかわらず、彼は時間通りに到着しました。", "Michi ga konde ita ni mo kakawarazu, kare wa jikan doori ni touchaku shimashita.", "Meskipun jalan macet, dia tiba tepat waktu."],
      ["音楽を聞きながら走ると、疲れを感じにくくなります。", "Ongaku o kikinagara hashiru to, tsukare o kanjinikuku narimasu.", "Jika berlari sambil mendengarkan musik, rasa lelah jadi lebih sulit terasa."],
      ["先生のアドバイスのおかげで、苦手な科目を克服できました。", "Sensei no adobaisu no okage de, nigate na kamoku o kokufuku dekimashita.", "Berkat saran guru, saya bisa mengatasi mata pelajaran yang saya lemah."],
      ["電車が遅れて焦りましたが、結果的には間に合いました。", "Densha ga okurete aserimashita ga, kekkateki ni wa maniaimashita.", "Kereta terlambat dan saya panik, tetapi pada akhirnya sempat.", ["Bagaimana akhirnya menurut kalimat itu?", "pembicara sempat tepat waktu", "pembicara terlambat", "keretanya batal", "pembicara tidak berangkat"]],
    ],
  ],
  // 16. Shadowing lanjutan
  [
    [
      ["困難", "Konnan", "kesulitan"],
      ["通過点", "Tsuukaten", "titik yang dilalui"],
      ["踏み出す", "Fumidasu", "melangkah maju"],
      ["恐れない", "Osorenai", "tidak takut", ["Dalam shadowing pidato, yang perlu ditiru adalah...", "tempo, jeda, dan penekanan pembicara", "hanya kosakatanya", "hanya ekspresi wajah", "hanya volume suara"]],
    ],
    [
      ["失敗は、成功への通過点にすぎません。", "Shippai wa, seikou e no tsuukaten ni sugimasen.", "Kegagalan hanyalah titik yang dilalui menuju keberhasilan."],
      ["夢を語ることは、恥ずかしいことではありません。", "Yume o kataru koto wa, hazukashii koto de wa arimasen.", "Membicarakan mimpi bukanlah hal yang memalukan."],
      ["私たちには、まだできることがたくさんあります。", "Watashitachi ni wa, mada dekiru koto ga takusan arimasu.", "Masih banyak hal yang bisa kita lakukan."],
      ["次の世代のために、今、行動を起こしましょう。", "Tsugi no sedai no tame ni, ima, koudou o okoshimashou.", "Demi generasi berikutnya, mari bertindak sekarang.", ["Pesan utama pidato itu adalah...", "bertindak sekarang demi generasi berikutnya", "menunggu generasi berikutnya", "berhenti bermimpi", "takut gagal"]],
    ],
  ],
  // 17. Berpindah register
  [
    [
      ["お持ちしました", "Omochi shimashita", "saya bawakan (keigo)"],
      ["もらえますか", "Moraemasu ka", "bisa tolong ... ? (sopan biasa)"],
      ["すごくない？", "Sugokunai?", "keren, kan? (santai)"],
      ["申し訳ございません", "Moushiwake gozaimasen", "mohon maaf (sangat sopan)", ["Kepada atasan, ungkapan yang tepat untuk 'saya bawakan' adalah...", "お持ちしました", "持ってきたよ", "持ってきた", "持ってくるね"]],
    ],
    [
      ["課長、明日の会議の資料をお送りしました。", "Kachou, ashita no kaigi no shiryou o ookuri shimashita.", "Pak/Bu kepala seksi, materi rapat besok sudah saya kirimkan."],
      ["佐藤さん、ちょっとこれ手伝ってもらえますか。", "Satou san, chotto kore tetsudatte moraemasu ka.", "Sato, bisa tolong bantu ini sebentar?"],
      ["ねえ、昨日のドラマ見た？最後、泣けたよね。", "Nee, kinou no dorama mita? Saigo, naketa yo ne.", "Eh, nonton drama kemarin? Akhirnya bikin nangis, ya.", ["Register kalimat itu cocok untuk berbicara dengan...", "teman akrab", "atasan", "pelanggan", "orang yang baru dikenal"]],
      ["お客様、大変申し訳ございません。ただいま満席でございます。", "Okyakusama, taihen moushiwake gozaimasen. Tadaima manseki de gozaimasu.", "Mohon maaf sekali, Bapak/Ibu. Saat ini kursi sedang penuh."],
    ],
  ],
  // 18. Rubrik rekaman
  [
    [
      ["正確さ", "Seikakusa", "ketepatan"],
      ["流暢さ", "Ryuuchousa", "kelancaran"],
      ["表現力", "Hyougenryoku", "daya ekspresi"],
      ["聞き返す", "Kikikaesu", "mendengarkan ulang", ["Aspek 'ryuuchousa' dalam rubrik menilai...", "kelancaran tanpa jeda tak wajar", "ketepatan nada", "pilihan kosakata", "ekspresi sikap"]],
    ],
    [
      ["録音を聞き返して、言いよどんだ箇所に印をつけましょう。", "Rokuon o kikikaeshite, iiyodonda kasho ni shirushi o tsukemashou.", "Dengarkan ulang rekaman dan tandai bagian yang tersendat.", ["Menurut instruksi, bagian yang perlu ditandai adalah...", "bagian yang tersendat", "bagian yang paling lancar", "bagian kosakata baru", "bagian awal saja"]],
      ["長音と促音が正しく発音できているか、確かめてください。", "Chouon to sokuon ga tadashiku hatsuon dekite iru ka, tashikamete kudasai.", "Periksa apakah vokal panjang dan konsonan rangkap sudah diucapkan dengan benar."],
      ["話す速さが一定かどうかも、評価の対象になります。", "Hanasu hayasa ga ittei ka dou ka mo, hyouka no taishou ni narimasu.", "Apakah kecepatan berbicara konstan juga menjadi objek penilaian."],
      ["一週間後にもう一度録音して、変化を比べましょう。", "Isshuukango ni mou ichido rokuon shite, henka o kurabemashou.", "Rekam sekali lagi seminggu kemudian dan bandingkan perubahannya."],
    ],
  ],
  // 19. Pemadatan alami
  [
    [
      ["やっぱ", "Yappa", "memang (dari やはり)"],
      ["わかんない", "Wakannai", "tidak tahu (dari わからない)"],
      ["すいません", "Suimasen", "maaf / permisi (dari すみません)"],
      ["ってか", "Tteka", "eh / maksudnya (dari というか)", ["Bentuk padat dari わからない adalah...", "わかんない", "わかない", "わからん", "わかりない"]],
    ],
    [
      ["やっぱ、家がいちばん落ち着くね。", "Yappa, ie ga ichiban ochitsuku ne.", "Memang rumah yang paling menenangkan, ya."],
      ["何言ってるか、全然わかんないんだけど。", "Nani itteru ka, zenzen wakannai n da kedo.", "Aku sama sekali tidak paham kamu bilang apa."],
      ["ってか、もうこんな時間じゃん。", "Tteka, mou konna jikan jan.", "Eh, ternyata sudah jam segini.", ["Bentuk lengkap dari じゃん dalam kalimat itu kira-kira...", "じゃないか", "ではありません", "じゃない？ (pertanyaan murni)", "でしょうか"]],
      ["すいません、これ、いくらですか。", "Suimasen, kore, ikura desu ka.", "Permisi, ini berapa harganya?"],
    ],
  ],
  // 20. Ulasan pronunciation N2
  [
    [
      ["共生", "Kyousei", "hidup berdampingan"],
      ["交流", "Kouryuu", "pertukaran / interaksi"],
      ["抑揚", "Yokuyou", "intonasi naik-turun"],
      ["間の取り方", "Ma no torikata", "cara mengambil jeda", ["Presentasi N2 yang baik menggabungkan...", "ritme, keigo mulus, kontras, sikap, dan napas", "kecepatan maksimal saja", "volume keras saja", "nada datar tanpa jeda"]],
    ],
    [
      ["抑揚をつけて話すと、聞き手の印象に残りやすくなります。", "Yokuyou o tsukete hanasu to, kikite no inshou ni nokoriyasuku narimasu.", "Jika berbicara dengan intonasi naik-turun, lebih mudah membekas di benak pendengar."],
      ["間の取り方ひとつで、説得力は大きく変わります。", "Ma no torikata hitotsu de, settokuryoku wa ookiku kawarimasu.", "Hanya dengan cara mengambil jeda, daya bujuk berubah besar.", ["Menurut kalimat itu, daya bujuk sangat dipengaruhi oleh...", "cara mengambil jeda", "jumlah slide", "warna pakaian", "panjang naskah"]],
      ["地域の交流イベントで、日本語でスピーチをしました。", "Chiiki no kouryuu ibento de, nihongo de supiichi o shimashita.", "Saya berpidato dalam bahasa Jepang di acara interaksi daerah."],
      ["発表の前には、必ず声に出して三回練習しています。", "Happyou no mae ni wa, kanarazu koe ni dashite sankai renshuu shite imasu.", "Sebelum presentasi, saya selalu berlatih tiga kali dengan bersuara."],
    ],
  ],
];
