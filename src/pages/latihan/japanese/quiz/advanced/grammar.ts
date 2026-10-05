import type { JapaneseQuizTopic } from '../types';

// Latihan Grammar N2 — one entry per topic (index = topic - 1): [Basic, Advanced].
export const grammar: JapaneseQuizTopic[] = [
  // 1. Keyakinan kuat: に違いない・に相違ない
  [
    [
      ["に違いない", "Ni chigainai", "pasti (keyakinan pribadi)"],
      ["に相違ない", "Ni soui nai", "pasti (formal)"],
      ["本物に違いない", "Honmono ni chigainai", "pasti asli"],
      ["疲れているに違いない", "Tsukarete iru ni chigainai", "pasti sedang lelah", ["に違いない menunjukkan...", "keyakinan kuat berdasar bukti", "keraguan", "larangan", "permintaan"]],
    ],
    [
      ["彼女の顔色を見ると、何かいいことがあったに違いない。", "Kanojo no kaoiro o miru to, nanika ii koto ga atta ni chigainai.", "Melihat raut wajahnya, pasti terjadi sesuatu yang baik."],
      ["このやり方を考えたのは、田中さんに違いない。", "Kono yarikata o kangaeta no wa, Tanaka san ni chigainai.", "Yang memikirkan cara ini pasti Tanaka."],
      ["彼の証言は事実に相違ないと判断された。", "Kare no shougen wa jijitsu ni soui nai to handan sareta.", "Kesaksiannya dinilai pasti sesuai fakta."],
      ["一晩中働いたのだから、疲れているに違いない。", "Hitobanjuu hataraita no da kara, tsukarete iru ni chigainai.", "Dia bekerja semalaman, jadi pasti lelah."],
    ],
  ],
  // 2. Terpaksa: ざるを得ない
  [
    [
      ["行かざるを得ない", "Ikazaru o enai", "terpaksa pergi"],
      ["せざるを得ない", "Sezaru o enai", "terpaksa melakukan"],
      ["認めざるを得ない", "Mitomezaru o enai", "terpaksa mengakui"],
      ["諦めざるを得ない", "Akiramezaru o enai", "terpaksa menyerah", ["Bentuk ざるを得ない dari する adalah...", "せざるを得ない", "しざるを得ない", "すざるを得ない", "さざるを得ない"]],
    ],
    [
      ["電車が止まったので、タクシーで行かざるを得なかった。", "Densha ga tomatta node, takushii de ikazaru o enakatta.", "Karena kereta berhenti, saya terpaksa pergi naik taksi."],
      ["予算が足りず、計画を縮小せざるを得ない。", "Yosan ga tarizu, keikaku o shukushou sezaru o enai.", "Anggarannya kurang, jadi rencana terpaksa diperkecil."],
      ["けがをしたので、大会への出場を諦めざるを得なかった。", "Kega o shita node, taikai e no shutsujou o akiramezaru o enakatta.", "Karena cedera, saya terpaksa batal ikut turnamen."],
      ["彼の実力は認めざるを得ない。", "Kare no jitsuryoku wa mitomezaru o enai.", "Kemampuannya terpaksa harus diakui."],
    ],
  ],
  // 3. Risiko: かねない
  [
    [
      ["なりかねない", "Narikanenai", "bisa saja menjadi"],
      ["起こしかねない", "Okoshikanenai", "bisa saja menyebabkan"],
      ["いたしかねます", "Itashikanemasu", "sulit kami lakukan"],
      ["招きかねない", "Manekikanenai", "bisa saja mengundang", ["かねない biasanya dipakai untuk akibat yang...", "buruk", "baik", "netral", "lucu"]],
    ],
    [
      ["スピードを出しすぎると、事故を起こしかねない。", "Supiido o dashisugiru to, jiko o okoshikanenai.", "Kalau terlalu ngebut, bisa saja menyebabkan kecelakaan."],
      ["一言の失言が、大きな問題になりかねない。", "Hitokoto no shitsugen ga, ooki na mondai ni narikanenai.", "Satu ucapan keliru bisa saja menjadi masalah besar."],
      ["準備不足は、失敗を招きかねない。", "Junbi busoku wa, shippai o manekikanenai.", "Kurang persiapan bisa saja mengundang kegagalan."],
      ["当日のキャンセルには、ご返金いたしかねます。", "Toujitsu no kyanseru ni wa, gohenkin itashikanemasu.", "Untuk pembatalan pada hari H, kami tidak dapat mengembalikan uang."],
    ],
  ],
  // 4. Seiring dengan: に伴って
  [
    [
      ["に伴って", "Ni tomonatte", "seiring dengan"],
      ["に伴い", "Ni tomonai", "seiring dengan (formal)"],
      ["に伴う", "Ni tomonau", "yang menyertai"],
      ["とともに", "To tomo ni", "bersamaan dengan", ["Pola に伴って menunjukkan...", "perubahan yang terjadi seiring perubahan lain", "alasan pribadi", "larangan", "permintaan"]],
    ],
    [
      ["経済の発展に伴って、生活水準が向上した。", "Keizai no hatten ni tomonatte, seikatsu suijun ga koujou shita.", "Seiring perkembangan ekonomi, taraf hidup meningkat."],
      ["社員の増加に伴い、オフィスを移転した。", "Shain no zouka ni tomonai, ofisu o iten shita.", "Seiring bertambahnya karyawan, kantor dipindahkan."],
      ["都市化に伴う環境問題が深刻になっている。", "Toshika ni tomonau kankyou mondai ga shinkoku ni natte iru.", "Masalah lingkungan yang menyertai urbanisasi semakin serius."],
      ["年齢とともに、体力が落ちてきた。", "Nenrei to tomo ni, tairyoku ga ochite kita.", "Bersamaan dengan bertambahnya usia, stamina menurun."],
    ],
  ],
  // 5. Menyesuaikan: に応じて
  [
    [
      ["に応じて", "Ni oujite", "sesuai dengan"],
      ["必要に応じて", "Hitsuyou ni oujite", "sesuai kebutuhan"],
      ["能力に応じた", "Nouryoku ni oujita", "yang sesuai kemampuan"],
      ["希望に応じて", "Kibou ni oujite", "sesuai keinginan", ["に応じて berarti...", "sesuai / menyesuaikan dengan", "meskipun", "tentang", "oleh"]],
    ],
    [
      ["必要に応じて、資料を追加してください。", "Hitsuyou ni oujite, shiryou o tsuika shite kudasai.", "Tambahkan materi sesuai kebutuhan."],
      ["社員の能力に応じた仕事を与えることが大切だ。", "Shain no nouryoku ni oujita shigoto o ataeru koto ga taisetsu da.", "Penting memberikan pekerjaan sesuai kemampuan karyawan."],
      ["お客様のご希望に応じて、料理の量を調整します。", "Okyakusama no gokibou ni oujite, ryouri no ryou o chousei shimasu.", "Kami menyesuaikan porsi masakan sesuai keinginan pelanggan."],
      ["季節に応じて、店の飾りを変えています。", "Kisetsu ni oujite, mise no kazari o kaete imasu.", "Dekorasi toko diganti sesuai musim."],
    ],
  ],
  // 6. Meskipun begitu: にもかかわらず
  [
    [
      ["にもかかわらず", "Ni mo kakawarazu", "meskipun"],
      ["休日にもかかわらず", "Kyuujitsu ni mo kakawarazu", "meskipun hari libur"],
      ["努力したにもかかわらず", "Doryoku shita ni mo kakawarazu", "meskipun sudah berusaha"],
      ["それにもかかわらず", "Sore ni mo kakawarazu", "meskipun demikian", ["にもかかわらず biasanya dipakai dalam ragam...", "formal / tulisan", "sangat akrab", "anak-anak", "gaul"]],
    ],
    [
      ["休日にもかかわらず、多くの社員が出勤した。", "Kyuujitsu ni mo kakawarazu, ooku no shain ga shukkin shita.", "Meskipun hari libur, banyak karyawan masuk kerja."],
      ["何度も注意されたにもかかわらず、彼は同じミスをした。", "Nando mo chuui sareta ni mo kakawarazu, kare wa onaji misu o shita.", "Meskipun sudah ditegur berkali-kali, dia mengulang kesalahan yang sama."],
      ["悪天候にもかかわらず、試合は予定通り行われた。", "Akutenkou ni mo kakawarazu, shiai wa yotei doori okonawareta.", "Meskipun cuaca buruk, pertandingan berlangsung sesuai jadwal."],
      ["彼は若いにもかかわらず、とても落ち着いている。", "Kare wa wakai ni mo kakawarazu, totemo ochitsuite iru.", "Meskipun masih muda, dia sangat tenang."],
    ],
  ],
  // 7. Walau…, tetapi: ものの
  [
    [
      ["ものの", "Mono no", "walaupun"],
      ["買ったものの", "Katta mono no", "walaupun sudah dibeli"],
      ["始めたものの", "Hajimeta mono no", "walaupun sudah dimulai"],
      ["とはいうものの", "To wa iu mono no", "walaupun dikatakan begitu", ["ものの menunjukkan bahwa kenyataannya...", "tidak sesuai harapan", "lebih baik dari dugaan", "pasti terjadi", "dilarang"]],
    ],
    [
      ["ギターを買ったものの、ほとんど練習していない。", "Gitaa o katta mono no, hotondo renshuu shite inai.", "Walau sudah membeli gitar, saya hampir tidak pernah berlatih."],
      ["ダイエットを始めたものの、三日で終わってしまった。", "Daietto o hajimeta mono no, mikka de owatte shimatta.", "Walau sudah mulai diet, berhenti dalam tiga hari."],
      ["春になったとはいうものの、まだ朝晩は寒い。", "Haru ni natta to wa iu mono no, mada asaban wa samui.", "Walau dikatakan sudah musim semi, pagi dan malam masih dingin."],
      ["説明は聞いたものの、よく理解できなかった。", "Setsumei wa kiita mono no, yoku rikai dekinakatta.", "Walau sudah mendengar penjelasan, saya tidak begitu paham."],
    ],
  ],
  // 8. Di satu sisi: 一方で
  [
    [
      ["一方で", "Ippou de", "di sisi lain"],
      ["する一方で", "Suru ippou de", "sementara melakukan"],
      ["増える一方だ", "Fueru ippou da", "terus bertambah"],
      ["悪くなる一方", "Waruku naru ippou", "terus memburuk", ["Pola 〜一方だ berarti...", "terus-menerus (ke satu arah)", "di sisi lain", "satu kali saja", "berhenti"]],
    ],
    [
      ["彼は仕事熱心な一方で、家族も大切にしている。", "Kare wa shigoto nesshin na ippou de, kazoku mo taisetsu ni shite iru.", "Dia tekun bekerja, di sisi lain juga menyayangi keluarga."],
      ["スマホは便利な一方で、依存の問題もある。", "Sumaho wa benri na ippou de, izon no mondai mo aru.", "Ponsel pintar praktis, di sisi lain ada masalah ketergantungan."],
      ["この町の人口は減る一方だ。", "Kono machi no jinkou wa heru ippou da.", "Penduduk kota ini terus berkurang."],
      ["彼の病状は悪くなる一方で、家族は心配している。", "Kare no byoujou wa waruku naru ippou de, kazoku wa shinpai shite iru.", "Kondisi sakitnya terus memburuk, keluarganya khawatir."],
    ],
  ],
  // 9. Setelah / dalam hal: 上で
  [
    [
      ["相談した上で", "Soudan shita ue de", "setelah berkonsultasi"],
      ["確認の上", "Kakunin no ue", "setelah memeriksa"],
      ["生活する上で", "Seikatsu suru ue de", "dalam menjalani hidup"],
      ["上での", "Ue de no", "dalam hal ...", ["Bentuk た + 上で berarti...", "setelah melakukan dengan matang", "sebelum", "sambil", "tanpa"]],
    ],
    [
      ["両親と相談した上で、留学を決めた。", "Ryoushin to soudan shita ue de, ryuugaku o kimeta.", "Setelah berkonsultasi dengan orang tua, saya memutuskan belajar ke luar negeri."],
      ["内容をご確認の上、ご記入ください。", "Naiyou o gokakunin no ue, gokinyuu kudasai.", "Setelah memeriksa isinya, silakan diisi."],
      ["日本で生活する上で、ゴミの分別は重要だ。", "Nihon de seikatsu suru ue de, gomi no bunbetsu wa juuyou da.", "Dalam menjalani hidup di Jepang, memilah sampah itu penting."],
      ["仕事を進める上での問題点を整理しましょう。", "Shigoto o susumeru ue de no mondaiten o seiri shimashou.", "Mari merapikan masalah-masalah dalam menjalankan pekerjaan."],
    ],
  ],
  // 10. Begitu…, segera: 次第
  [
    [
      ["決まり次第", "Kimari shidai", "begitu diputuskan"],
      ["着き次第", "Tsuki shidai", "begitu tiba"],
      ["努力次第", "Doryoku shidai", "tergantung usaha"],
      ["天気次第", "Tenki shidai", "tergantung cuaca", ["Akar ます + 次第 berarti...", "segera setelah", "meskipun", "karena", "tanpa"]],
    ],
    [
      ["結果が分かり次第、すぐにお知らせします。", "Kekka ga wakari shidai, sugu ni oshirase shimasu.", "Begitu hasilnya diketahui, kami segera memberitahukan."],
      ["空港に着き次第、ホテルへ向かいます。", "Kuukou ni tsuki shidai, hoteru e mukaimasu.", "Begitu tiba di bandara, saya menuju hotel."],
      ["成績が上がるかどうかは、本人の努力次第だ。", "Seiseki ga agaru ka dou ka wa, honnin no doryoku shidai da.", "Nilai naik atau tidak tergantung usaha orangnya sendiri."],
      ["明日のピクニックは天気次第です。", "Ashita no pikunikku wa tenki shidai desu.", "Piknik besok tergantung cuaca."],
    ],
  ],
  // 11. Selama / sebatas: 限り
  [
    [
      ["生きている限り", "Ikite iru kagiri", "selama masih hidup"],
      ["しない限り", "Shinai kagiri", "kecuali jika ..."],
      ["知る限り", "Shiru kagiri", "sebatas yang diketahui"],
      ["できる限り", "Dekiru kagiri", "semampunya", ["Pola 〜ない限り berarti...", "kecuali jika", "selama", "segera setelah", "meskipun"]],
    ],
    [
      ["体が動く限り、この仕事を続けたい。", "Karada ga ugoku kagiri, kono shigoto o tsuzuketai.", "Selama tubuh masih bisa bergerak, saya ingin terus melakukan pekerjaan ini."],
      ["練習しない限り、上手にはならない。", "Renshuu shinai kagiri, jouzu ni wa naranai.", "Kecuali berlatih, kamu tidak akan mahir."],
      ["私の知る限り、その店はもう閉店した。", "Watashi no shiru kagiri, sono mise wa mou heiten shita.", "Sebatas yang saya tahu, toko itu sudah tutup."],
      ["できる限り早く返事をください。", "Dekiru kagiri hayaku henji o kudasai.", "Tolong balas secepat mungkin."],
    ],
  ],
  // 12. Berdasarkan: に基づいて
  [
    [
      ["に基づいて", "Ni motozuite", "berdasarkan"],
      ["事実に基づく", "Jijitsu ni motozuku", "berdasarkan fakta"],
      ["データに基づいた", "Deeta ni motozuita", "yang berdasarkan data"],
      ["規則に基づき", "Kisoku ni motozuki", "berdasarkan peraturan", ["に基づいて biasanya diikuti oleh dasar berupa...", "data, aturan, atau fakta", "perasaan saja", "warna", "makanan"]],
    ],
    [
      ["アンケートの結果に基づいて、新商品を開発した。", "Ankeeto no kekka ni motozuite, shinshouhin o kaihatsu shita.", "Berdasarkan hasil angket, produk baru dikembangkan."],
      ["この小説は事実に基づく物語だ。", "Kono shousetsu wa jijitsu ni motozuku monogatari da.", "Novel ini adalah kisah berdasarkan fakta."],
      ["データに基づいた判断が求められている。", "Deeta ni motozuita handan ga motomerarete iru.", "Diperlukan keputusan yang berdasarkan data."],
      ["会社の規則に基づき、処分が決定された。", "Kaisha no kisoku ni motozuki, shobun ga kettei sareta.", "Berdasarkan peraturan perusahaan, sanksinya diputuskan."],
    ],
  ],
  // 13. Seputar perdebatan: をめぐって
  [
    [
      ["をめぐって", "O megutte", "seputar (isu yang diperdebatkan)"],
      ["をめぐる", "O meguru", "yang menyangkut"],
      ["予算をめぐって", "Yosan o megutte", "seputar anggaran"],
      ["土地をめぐる", "Tochi o meguru", "yang menyangkut tanah", ["をめぐって biasanya dipakai untuk isu yang...", "diperdebatkan atau diperebutkan", "sangat pribadi", "tidak penting", "sudah selesai"]],
    ],
    [
      ["予算の使い方をめぐって、会議が長引いた。", "Yosan no tsukaikata o megutte, kaigi ga nagabiita.", "Rapat berlarut-larut seputar cara penggunaan anggaran."],
      ["土地をめぐる争いは、十年以上続いている。", "Tochi o meguru arasoi wa, juunen ijou tsuzuite iru.", "Sengketa yang menyangkut tanah sudah berlangsung lebih dari sepuluh tahun."],
      ["新しい法律をめぐって、さまざまな意見が出ている。", "Atarashii houritsu o megutte, samazama na iken ga dete iru.", "Muncul berbagai pendapat seputar undang-undang baru."],
      ["優勝をめぐる戦いは最後まで分からなかった。", "Yuushou o meguru tatakai wa saigo made wakaranakatta.", "Persaingan memperebutkan juara tidak bisa ditebak sampai akhir."],
    ],
  ],
  // 14. Melalui: を通じて
  [
    [
      ["を通じて", "O tsuujite", "melalui"],
      ["一年を通じて", "Ichinen o tsuujite", "sepanjang tahun"],
      ["仕事を通じて", "Shigoto o tsuujite", "melalui pekerjaan"],
      ["を通して", "O tooshite", "melalui (lebih umum)", ["Dalam 一年を通じて, を通じて berarti...", "sepanjang (periode)", "melalui orang", "meskipun", "sebelum"]],
    ],
    [
      ["仕事を通じて、多くの人と出会うことができた。", "Shigoto o tsuujite, ooku no hito to deau koto ga dekita.", "Melalui pekerjaan, saya bisa bertemu banyak orang."],
      ["この島は一年を通じて観光客が多い。", "Kono shima wa ichinen o tsuujite kankoukyaku ga ooi.", "Pulau ini ramai wisatawan sepanjang tahun."],
      ["大使館を通じて、正式に抗議した。", "Taishikan o tsuujite, seishiki ni kougi shita.", "Melalui kedutaan, protes disampaikan secara resmi."],
      ["スポーツを通して、協力の大切さを学んだ。", "Supootsu o tooshite, kyouryoku no taisetsusa o mananda.", "Melalui olahraga, saya belajar pentingnya kerja sama."],
    ],
  ],
  // 15. Tidak berarti: わけではない
  [
    [
      ["必ずしも", "Kanarazushimo", "belum tentu (dengan negatif)"],
      ["わけではない", "Wake de wa nai", "bukan berarti"],
      ["全部が", "Zenbu ga", "semuanya"],
      ["からといって", "Kara to itte", "hanya karena", ["Pola からといって〜わけではない berarti...", "hanya karena A, bukan berarti B", "karena A, pasti B", "A dan B sama", "A lebih baik dari B"]],
    ],
    [
      ["有名な大学を出た人が、必ずしも成功するわけではない。", "Yuumei na daigaku o deta hito ga, kanarazushimo seikou suru wake de wa nai.", "Lulusan universitas terkenal belum tentu sukses."],
      ["お金持ちだからといって、幸せだとは限らない。", "Okanemochi da kara to itte, shiawase da to wa kagiranai.", "Hanya karena kaya, belum tentu bahagia."],
      ["全部の意見に反対しているわけではない。", "Zenbu no iken ni hantai shite iru wake de wa nai.", "Bukan berarti saya menentang semua pendapat."],
      ["忙しいからといって、約束を忘れていいわけではない。", "Isogashii kara to itte, yakusoku o wasurete ii wake de wa nai.", "Hanya karena sibuk, bukan berarti boleh lupa janji."],
    ],
  ],
  // 16. Bukannya tidak: ないことはない
  [
    [
      ["ないことはない", "Nai koto wa nai", "bukannya tidak"],
      ["行けないことはない", "Ikenai koto wa nai", "bukannya tidak bisa pergi"],
      ["分からないこともない", "Wakaranai koto mo nai", "bukannya tidak paham"],
      ["ないでもない", "Nai demo nai", "bukannya tidak (sedikit banyak)", ["ないことはない menunjukkan sikap...", "ragu-ragu / kurang yakin", "sangat yakin", "menolak keras", "marah"]],
    ],
    [
      ["頑張れば、今日中に終わらせられないことはない。", "Ganbareba, kyoujuu ni owaraserarenai koto wa nai.", "Kalau berusaha keras, bukannya tidak bisa selesai hari ini."],
      ["彼の言いたいことも、分からないことはない。", "Kare no iitai koto mo, wakaranai koto wa nai.", "Apa yang ingin dia katakan bukannya tidak saya pahami."],
      ["納豆は食べられないこともないが、好きではない。", "Nattou wa taberarenai koto mo nai ga, suki de wa nai.", "Natto bukannya tidak bisa saya makan, tapi saya tidak suka."],
      ["行きたい気持ちがないでもないが、今回はやめておく。", "Ikitai kimochi ga nai demo nai ga, konkai wa yamete oku.", "Bukannya tidak ingin pergi, tapi kali ini saya tidak ikut."],
    ],
  ],
  // 17. Memang begitu sifatnya: というものだ
  [
    [
      ["というものだ", "To iu mono da", "memang begitulah"],
      ["というものではない", "To iu mono de wa nai", "bukan berarti begitu"],
      ["それが人生というものだ", "Sore ga jinsei to iu mono da", "itulah hidup"],
      ["親というもの", "Oya to iu mono", "yang namanya orang tua", ["というものではない berarti...", "tidak bisa dikatakan begitu (secara umum)", "pasti begitu", "harus begitu", "dilarang"]],
    ],
    [
      ["うまくいかない日もある。それが人生というものだ。", "Umaku ikanai hi mo aru. Sore ga jinsei to iu mono da.", "Ada hari yang tidak berjalan baik. Itulah hidup."],
      ["高い薬を飲めば早く治るというものではない。", "Takai kusuri o nomeba hayaku naoru to iu mono de wa nai.", "Bukan berarti minum obat mahal pasti cepat sembuh."],
      ["子どもの成長を喜ぶのが、親というものだ。", "Kodomo no seichou o yorokobu no ga, oya to iu mono da.", "Bersuka cita atas tumbuh kembang anak, begitulah orang tua."],
      ["たくさん練習すればいいというものでもない。", "Takusan renshuu sureba ii to iu mono demo nai.", "Bukan berarti berlatih banyak itu otomatis bagus."],
    ],
  ],
  // 18. Tidak lain adalah: にほかならない
  [
    [
      ["にほかならない", "Ni hoka naranai", "tidak lain adalah"],
      ["努力の結果にほかならない", "Doryoku no kekka ni hoka naranai", "tidak lain adalah hasil usaha"],
      ["からにほかならない", "Kara ni hoka naranai", "semata-mata karena"],
      ["愛情にほかならない", "Aijou ni hoka naranai", "tidak lain adalah kasih sayang", ["にほかならない dipakai untuk...", "penegasan kuat", "keraguan", "permintaan", "larangan"]],
    ],
    [
      ["彼の成功は、日々の努力の結果にほかならない。", "Kare no seikou wa, hibi no doryoku no kekka ni hoka naranai.", "Keberhasilannya tidak lain adalah hasil usaha sehari-hari."],
      ["親が厳しいのは、子どもを愛しているからにほかならない。", "Oya ga kibishii no wa, kodomo o aishite iru kara ni hoka naranai.", "Orang tua bersikap keras semata-mata karena menyayangi anaknya."],
      ["この事故は、安全確認の不足にほかならない。", "Kono jiko wa, anzen kakunin no fusoku ni hoka naranai.", "Kecelakaan ini tidak lain adalah akibat kurangnya pemeriksaan keselamatan."],
      ["読書とは、他人の人生を体験することにほかならない。", "Dokusho to wa, tanin no jinsei o taiken suru koto ni hoka naranai.", "Membaca tidak lain adalah mengalami kehidupan orang lain."],
    ],
  ],
  // 19. Keigo N2
  [
    [
      ["お目にかかる", "Ome ni kakaru", "bertemu (merendah)"],
      ["申し上げる", "Moushiageru", "menyampaikan (merendah)"],
      ["お越しになる", "Okoshi ni naru", "datang (hormat)"],
      ["承る", "Uketamawaru", "menerima / mendengar (merendah)", ["Bentuk merendah dari 会う adalah...", "お目にかかる", "お会いになる", "会われる", "ご覧になる"]],
    ],
    [
      ["来週、社長にお目にかかる予定です。", "Raishuu, shachou ni ome ni kakaru yotei desu.", "Minggu depan saya dijadwalkan bertemu direktur."],
      ["心よりお祝い申し上げます。", "Kokoro yori oiwai moushiagemasu.", "Saya menyampaikan ucapan selamat dari lubuk hati."],
      ["お客様が受付にお越しになりました。", "Okyakusama ga uketsuke ni okoshi ni narimashita.", "Tamu sudah datang di resepsionis."],
      ["ご注文を承りました。", "Gochuumon o uketamawarimashita.", "Pesanan Anda sudah kami terima."],
    ],
  ],
  // 20. Ulasan grammar N2
  [
    [
      ["中止せざるを得ない", "Chuushi sezaru o enai", "terpaksa dibatalkan"],
      ["技術の進歩に伴い", "Gijutsu no shinpo ni tomonai", "seiring kemajuan teknologi"],
      ["話し合った上で", "Hanashiatta ue de", "setelah berdiskusi"],
      ["失敗しかねない", "Shippai shikanenai", "bisa saja gagal", ["Pola untuk 'terpaksa harus' adalah...", "〜ざるを得ない", "〜にほかならない", "〜かねない", "〜に基づいて"]],
    ],
    [
      ["売り上げの減少に伴い、支店を閉鎖せざるを得なくなった。", "Uriage no genshou ni tomonai, shiten o heisa sezaru o enaku natta.", "Seiring menurunnya penjualan, kantor cabang terpaksa ditutup."],
      ["社員と十分に話し合った上で、新しい制度を導入した。", "Shain to juubun ni hanashiatta ue de, atarashii seido o dounyuu shita.", "Setelah berdiskusi cukup dengan karyawan, sistem baru diterapkan."],
      ["このまま放置すれば、さらに大きな問題になりかねない。", "Kono mama houchi sureba, sara ni ooki na mondai ni narikanenai.", "Kalau dibiarkan begini, bisa saja menjadi masalah yang lebih besar."],
      ["今回の成功は、地道な努力の積み重ねにほかならない。", "Konkai no seikou wa, jimichi na doryoku no tsumikasane ni hoka naranai.", "Keberhasilan kali ini tidak lain adalah akumulasi usaha yang tekun."],
    ],
  ],
];
