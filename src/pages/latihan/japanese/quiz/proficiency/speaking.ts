import type { JapaneseQuizTopic } from '../types';

// Latihan Speaking N1 — one entry per topic (index = topic - 1): [Basic, Advanced].
export const speaking: JapaneseQuizTopic[] = [
  // 1. Sikap sebagai ahli
  [
    [
      ["あくまで私見ですが", "Akumade shiken desu ga", "ini murni pendapat pribadi saya"],
      ["データが示す限りでは", "Deeta ga shimesu kagiri de wa", "sejauh yang ditunjukkan data"],
      ["断定はできませんが", "Dantei wa dekimasen ga", "saya tidak bisa memastikan, tetapi"],
      ["専門外ではありますが", "Senmongai de wa arimasu ga", "meski di luar bidang keahlian saya", ["Saat berbicara sebagai ahli, sebaiknya kamu...", "menyatakan posisi beserta dasar dan batasannya", "menjawab semua dengan pasti tanpa dasar", "menghindari semua pertanyaan", "hanya memakai bahasa santai"]],
    ],
    [
      ["データが示す限りでは、感染は減少傾向にあると言えます。", "Deeta ga shimesu kagiri de wa, kansen wa genshou keikou ni aru to iemasu.", "Sejauh yang ditunjukkan data, bisa dikatakan infeksi cenderung menurun."],
      ["現時点で断定はできませんが、季節的な要因も考えられます。", "Genjiten de dantei wa dekimasen ga, kisetsuteki na youin mo kangaeraremasu.", "Saat ini saya tidak bisa memastikan, tetapi faktor musiman juga bisa dipertimbangkan."],
      ["専門外ではありますが、経済への影響も無視できないでしょう。", "Senmongai de wa arimasu ga, keizai e no eikyou mo mushi dekinai deshou.", "Meski di luar bidang keahlian saya, dampak terhadap ekonomi mungkin juga tidak bisa diabaikan.", ["Apa yang disampaikan pembicara di luar keahliannya?", "dampak terhadap ekonomi tidak bisa diabaikan", "infeksi pasti naik", "data tidak bisa dipercaya", "musim tidak berpengaruh"]],
      ["結論を急がず、もう少し経過を見守るべきだと考えます。", "Ketsuron o isogazu, mou sukoshi keika o mimamoru beki da to kangaemasu.", "Menurut saya, sebaiknya jangan terburu-buru menyimpulkan dan pantau perkembangannya sedikit lagi."],
    ],
  ],
  // 2. Debat akademik
  [
    [
      ["異論があります", "Iron ga arimasu", "saya punya keberatan"],
      ["ご指摘はもっともですが", "Goshiteki wa mottomo desu ga", "masukan Anda masuk akal, tetapi"],
      ["反証となるデータ", "Hanshou to naru deeta", "data yang menjadi bukti tandingan"],
      ["論点を整理すると", "Ronten o seiri suru to", "jika pokok bahasan dirangkum", ["Dalam debat akademik, menanggapi kritik sebaiknya dengan...", "argumen dan data", "nada marah", "diam saja", "mengganti topik"]],
    ],
    [
      ["その解釈には、いくつか異論があります。", "Sono kaishaku ni wa, ikutsuka iron ga arimasu.", "Saya punya beberapa keberatan terhadap tafsiran itu."],
      ["実は、その仮説に対する反証となるデータも報告されています。", "Jitsu wa, sono kasetsu ni taisuru hanshou to naru deeta mo houkoku sarete imasu.", "Sebenarnya, data yang menjadi bukti tandingan terhadap hipotesis itu juga sudah dilaporkan.", ["Apa yang disampaikan pembicara tentang hipotesis itu?", "ada data yang membantahnya", "hipotesis itu terbukti benar", "tidak ada yang meneliti", "hipotesis itu miliknya"]],
      ["論点を整理すると、争点は測定方法の妥当性にあります。", "Ronten o seiri suru to, souten wa sokutei houhou no datousei ni arimasu.", "Jika pokok bahasan dirangkum, inti perdebatannya ada pada kesahihan metode pengukuran."],
      ["その点については、立場の違いを認めた上で議論を続けましょう。", "Sono ten ni tsuite wa, tachiba no chigai o mitometa ue de giron o tsuzukemashou.", "Mengenai hal itu, mari lanjutkan diskusi setelah mengakui perbedaan posisi."],
    ],
  ],
  // 3. Pengarahan kebijakan
  [
    [
      ["選択肢は三つ", "Sentakushi wa mittsu", "ada tiga pilihan"],
      ["第二案を推奨します", "Daini an o suishou shimasu", "merekomendasikan opsi kedua"],
      ["要点のみ申し上げます", "Youten nomi moushiagemasu", "saya sampaikan poin pentingnya saja"],
      ["留意点", "Ryuuiten", "hal yang perlu diperhatikan", ["Urutan pengarahan kebijakan yang ringkas adalah...", "latar → opsi → rekomendasi → risiko", "risiko → salam", "opsi saja tanpa rekomendasi", "cerita pribadi → selesai"]],
    ],
    [
      ["お時間が限られておりますので、要点のみ申し上げます。", "Ojikan ga kagirarete orimasu node, youten nomi moushiagemasu.", "Karena waktunya terbatas, saya sampaikan poin pentingnya saja."],
      ["第一案は即効性がありますが、財政負担が大きすぎます。", "Daiichi an wa sokkousei ga arimasu ga, zaisei futan ga ookisugimasu.", "Opsi pertama berefek cepat, tetapi beban fiskalnya terlalu besar.", ["Kelemahan opsi pertama menurut pengarahan adalah...", "beban fiskal terlalu besar", "efeknya lambat", "tidak sah secara hukum", "tidak populer"]],
      ["留意点として、地方への周知に時間がかかることが挙げられます。", "Ryuuiten to shite, chihou e no shuuchi ni jikan ga kakaru koto ga ageraremasu.", "Sebagai hal yang perlu diperhatikan, sosialisasi ke daerah membutuhkan waktu."],
      ["ご判断いただければ、来月から準備に着手いたします。", "Gohandan itadakereba, raigetsu kara junbi ni chakushu itashimasu.", "Jika Anda memutuskannya, kami akan mulai persiapan bulan depan."],
    ],
  ],
  // 4. Kritik bernuansa
  [
    [
      ["意欲作ではありますが", "Iyokusaku de wa arimasu ga", "memang karya ambisius, tetapi"],
      ["惜しまれる", "Oshimareru", "patut disayangkan"],
      ["粗削りな部分", "Arakezuri na bubun", "bagian yang masih kasar"],
      ["光るものがある", "Hikaru mono ga aru", "ada hal yang bersinar", ["Kritik bernuansa sebaiknya dimulai dengan...", "mengakui nilai karya itu", "langsung menyebut kegagalannya", "menyerang pembuatnya", "membandingkan dengan karya buruk"]],
    ],
    [
      ["粗削りな部分はありますが、新人とは思えない光るものがあります。", "Arakezuri na bubun wa arimasu ga, shinjin to wa omoenai hikaru mono ga arimasu.", "Ada bagian yang masih kasar, tetapi ada hal bersinar yang tak terkira dari seorang pendatang baru."],
      ["映像は美しいのですが、台詞が説明的すぎる点が惜しまれます。", "Eizou wa utsukushii no desu ga, serifu ga setsumeiteki sugiru ten ga oshimaremasu.", "Visualnya indah, tetapi sayang dialognya terlalu bersifat menjelaskan.", ["Kelemahan film menurut kritik itu adalah...", "dialog terlalu bersifat menjelaskan", "visualnya jelek", "musiknya terlalu keras", "terlalu pendek"]],
      ["テーマの選び方は鋭いだけに、掘り下げの浅さが目立ちます。", "Teema no erabikata wa surudoi dake ni, horisage no asasa ga medachimasu.", "Justru karena pemilihan temanya tajam, dangkalnya pendalaman jadi mencolok."],
      ["次回作では、人物の内面をもっと描いてほしいですね。", "Jikaisaku de wa, jinbutsu no naimen o motto egaite hoshii desu ne.", "Di karya berikutnya, saya ingin batin para tokoh lebih digambarkan, ya."],
    ],
  ],
  // 5. Sintesis abstrak
  [
    [
      ["表裏一体", "Hyouri ittai", "dua sisi dari satu hal"],
      ["通底する", "Tsuutei suru", "mendasari / mengalir di bawah"],
      ["捉え直す", "Toraenaosu", "memahami ulang"],
      ["補完し合う", "Hokan shiau", "saling melengkapi", ["Sintesis abstrak bertujuan untuk...", "menghubungkan beberapa konsep menjadi satu kerangka", "memilih satu konsep dan membuang lainnya", "menghafal definisi", "menghindari diskusi"]],
    ],
    [
      ["伝統と革新は、対立するものとして語られがちです。", "Dentou to kakushin wa, tairitsu suru mono to shite kataregachi desu.", "Tradisi dan inovasi cenderung dibicarakan sebagai hal yang bertentangan."],
      ["しかし、時間軸で捉え直すと、両者は補完し合っているとも言えます。", "Shikashi, jikanjiku de toraenaosu to, ryousha wa hokan shiatte iru to mo iemasu.", "Namun, jika dipahami ulang dari sumbu waktu, keduanya bisa dikatakan saling melengkapi.", ["Menurut pembicara, tradisi dan inovasi sebenarnya...", "saling melengkapi", "tidak berhubungan", "saling menghancurkan", "sama persis"]],
      ["今日の革新も、いずれは明日の伝統になるからです。", "Kyou no kakushin mo, izure wa ashita no dentou ni naru kara desu.", "Sebab inovasi hari ini pun suatu saat akan menjadi tradisi esok hari."],
      ["両者に通底しているのは、より良いものを求める人間の営みでしょう。", "Ryousha ni tsuutei shite iru no wa, yori yoi mono o motomeru ningen no itonami deshou.", "Yang mendasari keduanya mungkin adalah upaya manusia mencari yang lebih baik."],
    ],
  ],
  // 6. Tanggapan sastra
  [
    [
      ["象徴している", "Shouchou shite iru", "melambangkan"],
      ["読み解く", "Yomitoku", "menafsirkan"],
      ["余白を残す", "Yohaku o nokosu", "menyisakan ruang (tafsir)"],
      ["予感させる", "Yokan saseru", "memberi firasat", ["Urutan tanggapan sastra yang baik adalah...", "kesan → analisis teknik → tafsiran → relevansi", "ringkasan saja", "harga buku → penerbit", "biografi penulis saja"]],
    ],
    [
      ["主人公が最後に窓を開ける場面が、強く心に残りました。", "Shujinkou ga saigo ni mado o akeru bamen ga, tsuyoku kokoro ni nokorimashita.", "Adegan tokoh utama membuka jendela di akhir sangat membekas di hati."],
      ["あの窓は、閉ざされた心が外へ開かれることを象徴しているのでしょう。", "Ano mado wa, tozasareta kokoro ga soto e hirakareru koto o shouchou shite iru no deshou.", "Jendela itu mungkin melambangkan hati yang tertutup terbuka ke dunia luar.", ["Menurut tafsiran itu, jendela melambangkan...", "hati yang tertutup mulai terbuka", "rumah yang baru", "cuaca yang cerah", "kematian tokoh"]],
      ["作者は結末をはっきり書かず、読者に余白を残しています。", "Sakusha wa ketsumatsu o hakkiri kakazu, dokusha ni yohaku o nokoshite imasu.", "Pengarang tidak menuliskan akhir cerita dengan jelas dan menyisakan ruang tafsir bagi pembaca."],
      ["だからこそ、読む人の人生によって受け取り方が変わるのだと思います。", "Dakara koso, yomu hito no jinsei ni yotte uketorikata ga kawaru no da to omoimasu.", "Justru karena itu, menurut saya cara memaknainya berubah tergantung kehidupan pembaca."],
    ],
  ],
  // 7. Negosiasi profesional
  [
    [
      ["譲歩いたします", "Jouho itashimasu", "kami akan memberi konsesi"],
      ["落としどころ", "Otoshidokoro", "titik kompromi"],
      ["持ち帰って検討します", "Mochikaette kentou shimasu", "akan kami bawa pulang untuk dipertimbangkan"],
      ["条件を詰める", "Jouken o tsumeru", "mematangkan syarat", ["Dalam negosiasi profesional, ungkapan 持ち帰って検討します berarti...", "belum bisa memutuskan di tempat", "langsung setuju", "menolak tegas", "ingin pulang lebih awal"]],
    ],
    [
      ["納期を一か月延ばしていただければ、価格面で譲歩いたします。", "Nouki o ikkagetsu nobashite itadakereba, kakakumen de jouho itashimasu.", "Jika tenggat pengiriman bisa diperpanjang sebulan, kami akan memberi konsesi dari segi harga.", ["Syarat yang diajukan untuk konsesi harga adalah...", "tenggat pengiriman diperpanjang sebulan", "jumlah pesanan dikurangi", "pembayaran di muka", "kontrak lima tahun"]],
      ["お互いの落としどころを探るため、もう一度数字を見直しませんか。", "Otagai no otoshidokoro o saguru tame, mou ichido suuji o minaoshimasen ka.", "Untuk mencari titik kompromi bersama, bagaimana kalau kita tinjau ulang angkanya sekali lagi?"],
      ["その件は一度持ち帰って、社内で検討させてください。", "Sono ken wa ichido mochikaette, shanai de kentou sasete kudasai.", "Mohon izinkan kami membawa perkara itu pulang dulu untuk dipertimbangkan di internal."],
      ["では、来週の打ち合わせで細かい条件を詰めましょう。", "Dewa, raishuu no uchiawase de komakai jouken o tsumemashou.", "Kalau begitu, mari matangkan syarat terperinci pada rapat minggu depan."],
    ],
  ],
  // 8. Tanya jawab konferensi
  [
    [
      ["示唆に富むご発表", "Shisa ni tomu gohappyou", "presentasi yang kaya wawasan"],
      ["一点だけ伺いたい", "Itten dake ukagaitai", "ingin menanyakan satu hal saja"],
      ["ご質問の意図", "Goshitsumon no ito", "maksud pertanyaan Anda"],
      ["今後の課題としたい", "Kongo no kadai to shitai", "ingin dijadikan tantangan ke depan", ["Pertanyaan di konferensi sebaiknya berurutan...", "perkenalan → apresiasi → pertanyaan spesifik", "kritik panjang → tanpa pertanyaan", "pertanyaan umum yang kabur", "cerita pribadi saja"]],
    ],
    [
      ["東西大学の山本と申します。示唆に富むご発表をありがとうございました。", "Touzai daigaku no Yamamoto to moushimasu. Shisa ni tomu gohappyou o arigatou gozaimashita.", "Saya Yamamoto dari Universitas Tozai. Terima kasih atas presentasi yang kaya wawasan."],
      ["一点だけ伺いたいのですが、データの収集時期はいつでしょうか。", "Itten dake ukagaitai no desu ga, deeta no shuushuu jiki wa itsu deshou ka.", "Saya ingin menanyakan satu hal saja, kapan waktu pengumpulan datanya?", ["Apa yang ditanyakan Yamamoto?", "waktu pengumpulan data", "jumlah peneliti", "biaya penelitian", "nama universitas"]],
      ["二〇二〇年の春ですので、感染症の影響は否定できません。", "Nisen nijuu nen no haru desu node, kansenshou no eikyou wa hitei dekimasen.", "Karena pada musim semi 2020, pengaruh wabah penyakit menular tidak bisa disangkal."],
      ["その点は、今後の課題としたいと思います。", "Sono ten wa, kongo no kadai to shitai to omoimasu.", "Hal itu ingin saya jadikan tantangan ke depan."],
    ],
  ],
  // 9. Risiko dan etika
  [
    [
      ["倫理的な観点から", "Rinriteki na kanten kara", "dari sudut pandang etika"],
      ["線引きが難しい", "Senbiki ga muzukashii", "sulit menarik batas"],
      ["合意形成", "Goui keisei", "pembentukan konsensus"],
      ["歯止めが利かない", "Hadome ga kikanai", "tidak bisa direm", ["Diskusi etika yang baik biasanya mengidentifikasi...", "dilema, nilai yang bertentangan, dan batasnya", "siapa yang paling kaya", "jawaban yang pasti benar", "harga teknologi saja"]],
    ],
    [
      ["AIによる採用判定は、どこまで任せてよいのでしょうか。", "Eeai ni yoru saiyou hantei wa, doko made makasete yoi no deshou ka.", "Sampai mana penilaian rekrutmen boleh diserahkan kepada AI?"],
      ["効率は上がりますが、偏見が再生産される危険もあります。", "Kouritsu wa agarimasu ga, henken ga saiseisan sareru kiken mo arimasu.", "Efisiensi naik, tetapi ada juga bahaya prasangka direproduksi.", ["Bahaya yang disebutkan tentang AI rekrutmen adalah...", "prasangka direproduksi", "biaya terlalu murah", "pelamar terlalu sedikit", "AI terlalu lambat"]],
      ["補助と決定の線引きが難しいところですね。", "Hojo to kettei no senbiki ga muzukashii tokoro desu ne.", "Sulitnya ada pada menarik batas antara membantu dan memutuskan, ya."],
      ["一度認めてしまうと、歯止めが利かなくなるおそれもあります。", "Ichido mitomete shimau to, hadome ga kikanaku naru osore mo arimasu.", "Begitu diizinkan, ada kekhawatiran tidak bisa direm lagi."],
    ],
  ],
  // 10. Analisis media
  [
    [
      ["報道の切り口", "Houdou no kirikuchi", "sudut pandang pemberitaan"],
      ["印象を誘導する", "Inshou o yuudou suru", "menggiring kesan"],
      ["一次情報に当たる", "Ichiji jouhou ni ataru", "merujuk sumber primer"],
      ["報じられていない側面", "Houjirarete inai sokumen", "sisi yang tidak diberitakan", ["Analisis media memperhatikan...", "pembingkaian, pilihan kata, dan yang tidak diberitakan", "jumlah iklan saja", "warna logo media", "jam tayang saja"]],
    ],
    [
      ["同じ出来事でも、報道の切り口によって受ける印象は大きく異なります。", "Onaji dekigoto demo, houdou no kirikuchi ni yotte ukeru inshou wa ookiku kotonarimasu.", "Meski peristiwanya sama, kesan yang diterima sangat berbeda tergantung sudut pandang pemberitaan."],
      ["この写真の選び方は、明らかに印象を誘導していますね。", "Kono shashin no erabikata wa, akiraka ni inshou o yuudou shite imasu ne.", "Cara memilih foto ini jelas menggiring kesan, ya."],
      ["SNSの情報をうのみにせず、一次情報に当たることが大切です。", "Esuenuesu no jouhou o unomi ni sezu, ichiji jouhou ni ataru koto ga taisetsu desu.", "Penting untuk tidak menelan mentah informasi media sosial dan merujuk sumber primer.", ["Saran pembicara tentang informasi media sosial adalah...", "jangan ditelan mentah, rujuk sumber primer", "selalu percaya", "jangan pernah membaca berita", "sebarkan secepatnya"]],
      ["被害者の側から見た、報じられていない側面もあるはずです。", "Higaisha no gawa kara mita, houjirarete inai sokumen mo aru hazu desu.", "Pasti ada juga sisi yang tidak diberitakan bila dilihat dari pihak korban."],
    ],
  ],
  // 11. Mempertahankan penelitian
  [
    [
      ["ご指摘の点は承知しております", "Goshiteki no ten wa shouchi shite orimasu", "kami memahami masukan itu"],
      ["本研究の独自性", "Hon kenkyuu no dokujisei", "orisinalitas penelitian ini"],
      ["限界として", "Genkai to shite", "sebagai keterbatasan"],
      ["学術的な貢献", "Gakujutsuteki na kouken", "kontribusi akademik", ["Saat sidang penelitian, menanggapi kritik sebaiknya dengan...", "data, pengakuan batas, dan kontribusi", "menyangkal semua kritik", "meminta maaf terus-menerus", "mengganti topik penelitian"]],
    ],
    [
      ["分析の手法が恣意的ではないかというご質問をいただきました。", "Bunseki no shuhou ga shiiteki de wa nai ka to iu goshitsumon o itadakimashita.", "Saya menerima pertanyaan apakah metode analisisnya tidak sewenang-wenang."],
      ["コード化は二名が独立して行い、一致率を確認しております。", "Koodoka wa nimei ga dokuritsu shite okonai, itchiritsu o kakunin shite orimasu.", "Pengodean dilakukan secara terpisah oleh dua orang, dan tingkat kesesuaiannya sudah diperiksa.", ["Bagaimana peneliti menjawab tuduhan metode sewenang-wenang?", "pengodean dilakukan dua orang secara terpisah", "menyangkal tanpa alasan", "mengganti metode", "menghapus datanya"]],
      ["限界として、調査地域が一か所に限られている点が挙げられます。", "Genkai to shite, chousa chiiki ga ikkasho ni kagirarete iru ten ga ageraremasu.", "Sebagai keterbatasan, wilayah survei hanya terbatas pada satu tempat."],
      ["それでも、新たな分析の枠組みを示した点に学術的な貢献があると考えます。", "Soredemo, arata na bunseki no wakugumi o shimeshita ten ni gakujutsuteki na kouken ga aru to kangaemasu.", "Meski begitu, saya menilai ada kontribusi akademik dalam menunjukkan kerangka analisis baru."],
    ],
  ],
  // 12. Percakapan lintas budaya
  [
    [
      ["一概には言えませんが", "Ichigai ni wa iemasen ga", "tidak bisa disamaratakan, tetapi"],
      ["面子を立てる", "Mentsu o tateru", "menjaga muka (orang lain)"],
      ["文化的背景", "Bunkateki haikei", "latar belakang budaya"],
      ["ステレオタイプ", "Sutereotaipu", "stereotip", ["Dalam percakapan lintas budaya, sebaiknya kamu...", "menghindari generalisasi dan bertanya dengan rasa ingin tahu", "menganggap budaya sendiri paling benar", "menyamaratakan semua orang", "menghindari topik budaya"]],
    ],
    [
      ["一概には言えませんが、日本では沈黙も会話の一部だと考えられています。", "Ichigai ni wa iemasen ga, Nihon de wa chinmoku mo kaiwa no ichibu da to kangaerarete imasu.", "Tidak bisa disamaratakan, tetapi di Jepang diam juga dianggap bagian dari percakapan."],
      ["インドネシアでは、目上の人の面子を立てることがとても大切です。", "Indoneshia de wa, meue no hito no mentsu o tateru koto ga totemo taisetsu desu.", "Di Indonesia, menjaga muka orang yang lebih tua atau lebih tinggi posisinya sangat penting."],
      ["その行動の文化的背景を知ると、見え方が変わりますね。", "Sono koudou no bunkateki haikei o shiru to, miekata ga kawarimasu ne.", "Kalau tahu latar belakang budaya perilaku itu, cara pandangnya jadi berubah, ya.", ["Menurut kalimat itu, apa yang mengubah cara pandang?", "mengetahui latar belakang budaya", "belajar tata bahasa", "pindah negara", "menonton film"]],
      ["国籍だけで人を判断するのは、ステレオタイプにすぎません。", "Kokuseki dake de hito o handan suru no wa, sutereotaipu ni sugimasen.", "Menilai orang hanya dari kewarganegaraannya tidak lebih dari stereotip."],
    ],
  ],
  // 13. Keigo tingkat tinggi
  [
    [
      ["ご高覧いただく", "Gokouran itadaku", "berkenan membaca (sangat hormat)"],
      ["ご指導ご鞭撻", "Goshidou gobentatsu", "bimbingan dan dorongan"],
      ["恐悦至極に存じます", "Kyouetsu shigoku ni zonjimasu", "merasa sangat terhormat"],
      ["頂戴いたします", "Choudai itashimasu", "saya terima (sangat hormat)", ["Ungkapan ご高覧 dipakai untuk meminta orang terhormat...", "membaca / melihat dokumen", "datang ke acara", "membayar", "pulang"]],
    ],
    [
      ["過分なお言葉を賜り、恐悦至極に存じます。", "Kabun na okotoba o tamawari, kyouetsu shigoku ni zonjimasu.", "Saya merasa sangat terhormat menerima kata-kata yang melebihi kepantasan saya.", ["Perasaan pembicara dalam kalimat itu adalah...", "sangat terhormat dan bersyukur", "kecewa", "marah", "bingung"]],
      ["ご意見を頂戴できれば、今後の参考にさせていただきます。", "Goiken o choudai dekireba, kongo no sankou ni sasete itadakimasu.", "Jika kami dapat menerima pendapat Anda, akan kami jadikan acuan ke depan."],
      ["先生には、これまで大変お世話になりました。", "Sensei ni wa, kore made taihen osewa ni narimashita.", "Saya sangat berutang budi kepada Bapak/Ibu selama ini."],
      ["今後とも変わらぬご厚誼を賜りますよう、お願い申し上げます。", "Kongo tomo kawaranu gokougi o tamawarimasu you, onegai moushiagemasu.", "Kami mohon persahabatan yang tak berubah untuk seterusnya."],
    ],
  ],
  // 14. Pembingkaian retoris
  [
    [
      ["皆さんは〜と思われるかもしれません", "Minasan wa ~ to omowareru kamoshiremasen", "Anda semua mungkin mengira ..."],
      ["逆説的ですが", "Gyakusetsuteki desu ga", "secara paradoks"],
      ["問いを立てる", "Toi o tateru", "mengajukan pertanyaan"],
      ["想像してみてほしい", "Souzou shite mite hoshii", "saya ingin Anda membayangkan", ["Pembingkaian retoris sering dimulai dengan...", "pertanyaan atau paradoks", "daftar pustaka", "ucapan selamat tinggal", "angka acak"]],
    ],
    [
      ["逆説的ですが、選択肢が多いほど、人は選べなくなるのです。", "Gyakusetsuteki desu ga, sentakushi ga ooi hodo, hito wa erabenaku naru no desu.", "Secara paradoks, makin banyak pilihan, manusia justru makin tidak bisa memilih.", ["Paradoks yang disampaikan pembicara adalah...", "makin banyak pilihan, makin sulit memilih", "makin sedikit pilihan, makin sulit memilih", "pilihan tidak berpengaruh", "manusia selalu memilih yang terbaik"]],
      ["ここで一つ、問いを立ててみましょう。", "Koko de hitotsu, toi o tatete mimashou.", "Di sini, mari kita ajukan satu pertanyaan."],
      ["もし明日、すべての広告が消えたら、私たちの消費はどう変わるでしょうか。", "Moshi ashita, subete no koukoku ga kietara, watashitachi no shouhi wa dou kawaru deshou ka.", "Jika besok semua iklan lenyap, bagaimana konsumsi kita akan berubah?"],
      ["その答えの中に、本当の欲求が隠れているのかもしれません。", "Sono kotae no naka ni, hontou no yokkyuu ga kakurete iru no kamoshiremasen.", "Mungkin di dalam jawaban itu tersembunyi keinginan yang sebenarnya."],
    ],
  ],
  // 15. Pidato spontan
  [
    [
      ["僭越ながら", "Senetsu nagara", "dengan segala kerendahan hati (lancang)"],
      ["一言で申しますと", "Hitokoto de moushimasu to", "jika diungkapkan dalam sepatah kata"],
      ["右も左も分からない", "Migi mo hidari mo wakaranai", "sama sekali belum paham apa-apa"],
      ["糧にする", "Kate ni suru", "menjadikan bekal", ["Kerangka cepat untuk pidato spontan adalah...", "poin → alasan → contoh → penutup", "contoh → contoh → contoh", "salam saja", "kesimpulan tanpa isi"]],
    ],
    [
      ["僭越ながら、乾杯の音頭を取らせていただきます。", "Senetsu nagara, kanpai no ondo o torasete itadakimasu.", "Dengan segala kerendahan hati, izinkan saya memimpin bersulang."],
      ["一言で申しますと、このチームは私の誇りです。", "Hitokoto de moushimasu to, kono chiimu wa watashi no hokori desu.", "Singkatnya, tim ini adalah kebanggaan saya."],
      ["失敗した日も、皆さんの笑顔に何度も救われました。", "Shippai shita hi mo, minasan no egao ni nando mo sukuwaremashita.", "Di hari-hari saya gagal pun, senyum Anda semua berkali-kali menyelamatkan saya.", ["Apa yang menyelamatkan pembicara saat gagal?", "senyum rekan-rekannya", "bonus perusahaan", "liburan", "nasihat keluarga"]],
      ["皆様のますますのご活躍を祈念して、乾杯！", "Minasama no masumasu no gokatsuyaku o kinen shite, kanpai!", "Mendoakan kesuksesan Anda semua yang semakin gemilang, bersulang!"],
    ],
  ],
  // 16. Perbaikan seperti penutur asli
  [
    [
      ["というより", "To iu yori", "lebih tepatnya"],
      ["誤解のないように言うと", "Gokai no nai you ni iu to", "supaya tidak salah paham"],
      ["言い直しますと", "Iinaoshimasu to", "saya ulangi dengan kata lain"],
      ["そういう意味ではなく", "Sou iu imi de wa naku", "bukan dalam arti itu"],
    ],
    [
      ["反対している、というより、まだ判断材料が足りないんです。", "Hantai shite iru, to iu yori, mada handan zairyou ga tarinai n desu.", "Bukan menentang, lebih tepatnya, bahan pertimbangannya masih kurang."],
      ["誤解のないように言うと、彼の能力を疑っているわけではありません。", "Gokai no nai you ni iu to, kare no nouryoku o utagatte iru wake de wa arimasen.", "Supaya tidak salah paham, bukan berarti saya meragukan kemampuannya.", ["Apa yang ingin diluruskan pembicara?", "dia tidak meragukan kemampuan orang itu", "dia meragukan kemampuan orang itu", "dia ingin memecat orang itu", "dia tidak kenal orang itu"]],
      ["先ほどの説明を言い直しますと、費用は前払いではなく後払いです。", "Sakihodo no setsumei o iinaoshimasu to, hiyou wa maebarai de wa naku atobarai desu.", "Jika penjelasan tadi saya ulangi dengan kata lain, biayanya dibayar belakangan, bukan di muka."],
      ["「簡単」と言ったのは、そういう意味ではなく、手順が少ないということです。", "\"Kantan\" to itta no wa, sou iu imi de wa naku, tejun ga sukunai to iu koto desu.", "Saya bilang \"mudah\" bukan dalam arti itu, melainkan langkah-langkahnya sedikit."],
    ],
  ],
  // 17. Ketidaksetujuan halus
  [
    [
      ["大筋では賛成ですが", "Oosuji de wa sansei desu ga", "secara garis besar setuju, tetapi"],
      ["少し気になる点", "Sukoshi ki ni naru ten", "sedikit hal yang mengganjal"],
      ["別の見方もできる", "Betsu no mikata mo dekiru", "bisa juga dipandang lain"],
      ["慎重を期したい", "Shinchou o kishitai", "ingin berhati-hati sepenuhnya", ["Cara tidak setuju secara halus yang tepat adalah...", "menyampaikan kekhawatiran atau alternatif", "berkata 'Anda salah' langsung", "diam lalu pergi", "menaikkan suara"]],
    ],
    [
      ["ご提案の趣旨はよく分かるのですが、時期については慎重を期したいと思います。", "Goteian no shushi wa yoku wakaru no desu ga, jiki ni tsuite wa shinchou o kishitai to omoimasu.", "Saya sangat memahami maksud usulan Anda, tetapi mengenai waktunya saya ingin berhati-hati sepenuhnya.", ["Hal yang dipermasalahkan pembicara adalah...", "waktu pelaksanaan", "maksud usulan", "biaya", "orang yang mengusulkan"]],
      ["現場の負担という点から見ると、別の見方もできるかと存じます。", "Genba no futan to iu ten kara miru to, betsu no mikata mo dekiru ka to zonjimasu.", "Jika dilihat dari segi beban di lapangan, saya kira bisa juga dipandang lain."],
      ["例えば、試験的に一部の部署から始めてはいかがでしょうか。", "Tatoeba, shikenteki ni ichibu no busho kara hajimete wa ikaga deshou ka.", "Misalnya, bagaimana jika dimulai secara uji coba dari sebagian divisi?"],
      ["そうすれば、問題点も早めに把握できるかと思います。", "Sou sureba, mondaiten mo hayame ni haaku dekiru ka to omoimasu.", "Dengan begitu, saya kira masalahnya juga bisa dipahami lebih awal."],
    ],
  ],
  // 18. Presentasi sintesis
  [
    [
      ["総合すると", "Sougou suru to", "jika digabungkan"],
      ["浮かび上がる", "Ukabiagaru", "muncul ke permukaan"],
      ["導き出される", "Michibikidasareru", "bisa disimpulkan"],
      ["締めくくる", "Shimekukuru", "menutup", ["Presentasi sintesis bertujuan untuk...", "menghubungkan temuan, menarik implikasi, dan mengusulkan langkah", "membaca data satu per satu", "mengulang judul", "menghibur penonton"]],
    ],
    [
      ["三つの調査結果を総合すると、共通の課題が浮かび上がります。", "Mittsu no chousa kekka o sougou suru to, kyoutsuu no kadai ga ukabiagarimasu.", "Jika tiga hasil survei digabungkan, muncul tantangan yang sama."],
      ["それは、若い世代ほど相談相手がいないという点です。", "Sore wa, wakai sedai hodo soudan aite ga inai to iu ten desu.", "Yaitu, makin muda generasinya, makin tidak punya teman untuk berkonsultasi.", ["Tantangan bersama yang muncul dari survei adalah...", "generasi muda kurang punya teman berkonsultasi", "lansia kurang olahraga", "gaji terlalu rendah", "sekolah terlalu jauh"]],
      ["ここから導き出されるのは、身近な相談窓口を増やす必要性です。", "Koko kara michibikidasareru no wa, mijika na soudan madoguchi o fuyasu hitsuyousei desu.", "Yang bisa disimpulkan dari sini adalah perlunya menambah layanan konsultasi yang mudah dijangkau."],
      ["以上の提言をもって、本日の発表を締めくくらせていただきます。", "Ijou no teigen o motte, honjitsu no happyou o shimekukurasete itadakimasu.", "Dengan usulan di atas, izinkan saya menutup presentasi hari ini."],
    ],
  ],
  // 19. Wawancara dengan ahli
  [
    [
      ["掘り下げて伺いたい", "Horisagete ukagaitai", "ingin bertanya lebih dalam"],
      ["きっかけは何だったのですか", "Kikkake wa nan datta no desu ka", "apa yang menjadi pemicunya?"],
      ["と申しますと", "To moushimasu to", "maksudnya bagaimana?"],
      ["要するに", "You suru ni", "singkatnya"],
    ],
    [
      ["この研究を始められたきっかけは何だったのですか。", "Kono kenkyuu o hajimerareta kikkake wa nan datta no desu ka.", "Apa yang menjadi pemicu Anda memulai penelitian ini?"],
      ["祖母の介護を通して、高齢者の孤独を身近に感じたからです。", "Sobo no kaigo o tooshite, koureisha no kodoku o mijika ni kanjita kara desu.", "Karena melalui merawat nenek, saya merasakan langsung kesepian lansia.", ["Apa pemicu ahli itu memulai penelitiannya?", "pengalaman merawat neneknya", "tugas dari kampus", "permintaan pemerintah", "membaca buku"]],
      ["「孤独は病気と同じ」とおっしゃいましたが、と申しますと？", "\"Kodoku wa byouki to onaji\" to osshaimashita ga, to moushimasu to?", "Anda mengatakan \"kesepian sama dengan penyakit\", maksudnya bagaimana?"],
      ["要するに、孤独は個人ではなく社会全体の問題だということですね。", "You suru ni, kodoku wa kojin de wa naku shakai zentai no mondai da to iu koto desu ne.", "Singkatnya, kesepian bukan masalah individu, tetapi masalah seluruh masyarakat, ya."],
    ],
  ],
  // 20. Ulasan speaking N1
  [
    [
      ["均質化", "Kinshitsuka", "homogenisasi"],
      ["再評価", "Saihyouka", "penilaian ulang"],
      ["結局のところ", "Kekkyoku no tokoro", "pada akhirnya"],
      ["恩恵を受ける", "Onkei o ukeru", "menerima manfaat", ["Speaking N1 yang baik menggabungkan...", "sikap ahli, sanggahan halus, sintesis, dan keigo", "kecepatan bicara saja", "kosakata sulit saja", "bahasa santai saja"]],
    ],
    [
      ["観光の拡大は、地域の暮らしを豊かにするのでしょうか。", "Kankou no kakudai wa, chiiki no kurashi o yutaka ni suru no deshou ka.", "Apakah perluasan pariwisata memperkaya kehidupan daerah?"],
      ["経済面での恩恵は確かですが、住民の負担も見過ごせません。", "Keizaimen de no onkei wa tashika desu ga, juumin no futan mo misugosemasen.", "Manfaat ekonominya memang pasti, tetapi beban warga juga tidak bisa diabaikan."],
      ["一方で、観光をきっかけに伝統行事が再評価された例もあります。", "Ippou de, kankou o kikkake ni dentou gyouji ga saihyouka sareta rei mo arimasu.", "Di sisi lain, ada juga contoh acara tradisional dinilai ulang berkat pariwisata."],
      ["結局のところ、住民が主体となれるかどうかが鍵でしょう。", "Kekkyoku no tokoro, juumin ga shutai to nareru ka dou ka ga kagi deshou.", "Pada akhirnya, kuncinya mungkin apakah warga bisa menjadi pelaku utama.", ["Menurut pembicara, kunci pariwisata yang baik adalah...", "warga menjadi pelaku utama", "jumlah turis sebanyak mungkin", "hotel mewah", "iklan besar-besaran"]],
    ],
  ],
];
