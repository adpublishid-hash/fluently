import type { JapaneseQuizTopic } from '../types';

// Latihan Speaking N2 — one entry per topic (index = topic - 1): [Basic, Advanced].
export const speaking: JapaneseQuizTopic[] = [
  // 1. Pendapat tentang hal abstrak
  [
    [
      ["私にとって", "Watashi ni totte", "bagi saya"],
      ["とは何か", "To wa nani ka", "apakah ... itu"],
      ["基準", "Kijun", "ukuran / standar"],
      ["一概には言えない", "Ichigai ni wa ienai", "tidak bisa dipukul rata", ["Saat membahas topik abstrak, sebaiknya kamu...", "mendefinisikan dulu, lalu berpendapat", "langsung menolak", "hanya bertanya balik", "diam saja"]],
    ],
    [
      ["幸せとは何か、一概には言えないと思います。", "Shiawase to wa nani ka, ichigai ni wa ienai to omoimasu.", "Menurut saya, apa itu kebahagiaan tidak bisa dipukul rata."],
      ["私にとって幸せとは、大切な人と過ごす時間です。", "Watashi ni totte shiawase to wa, taisetsu na hito to sugosu jikan desu.", "Bagi saya, kebahagiaan adalah waktu bersama orang yang berharga."],
      ["自由には、責任が伴うものではないでしょうか。", "Jiyuu ni wa, sekinin ga tomonau mono de wa nai deshou ka.", "Bukankah kebebasan selalu disertai tanggung jawab?"],
      ["人によって基準が違うので、正解はないと思います。", "Hito ni yotte kijun ga chigau node, seikai wa nai to omoimasu.", "Karena ukurannya berbeda tiap orang, menurut saya tidak ada jawaban yang benar."],
    ],
  ],
  // 2. Rapat profesional
  [
    [
      ["本題に入る", "Hondai ni hairu", "masuk ke pokok bahasan"],
      ["論点を整理する", "Ronten o seiri suru", "merangkum pokok persoalan"],
      ["ご意見をいただけますか", "Goiken o itadakemasu ka", "bisakah saya mendapat pendapat Anda?"],
      ["議事録", "Gijiroku", "notulen rapat", ["Ungkapan untuk masuk ke pokok bahasan dalam rapat adalah...", "それでは、本題に入りたいと思います。", "おやすみなさい。", "いただきます。", "お先に失礼します。"]],
    ],
    [
      ["本日の議題は、来年度の予算案についてです。", "Honjitsu no gidai wa, rainendo no yosan-an ni tsuite desu.", "Agenda hari ini adalah rancangan anggaran tahun depan."],
      ["営業部から、ご意見をいただけますか。", "Eigyoubu kara, goiken o itadakemasu ka.", "Bisakah divisi penjualan memberikan pendapat?"],
      ["時間も限られていますので、論点を三つに絞りましょう。", "Jikan mo kagirarete imasu node, ronten o mittsu ni shiborimashou.", "Karena waktunya terbatas, mari persempit pokok persoalan menjadi tiga."],
      ["では、次回までに各部署で検討をお願いします。", "De wa, jikai made ni kaku busho de kentou o onegaishimasu.", "Kalau begitu, mohon tiap divisi mempertimbangkannya sebelum pertemuan berikutnya."],
    ],
  ],
  // 3. Tidak setuju secara formal
  [
    [
      ["一点懸念があります", "Itten kenen ga arimasu", "ada satu kekhawatiran"],
      ["よく分かりますが", "Yoku wakarimasu ga", "saya sangat paham, tapi..."],
      ["のではないでしょうか", "No de wa nai deshou ka", "bukankah ...?"],
      ["再考", "Saikou", "pertimbangan ulang", ["Cara tidak setuju yang formal adalah...", "hargai dulu, lalu sampaikan kekhawatiran dengan alasan", "langsung bilang 'itu salah'", "diam dan pergi", "tertawa"]],
    ],
    [
      ["ご提案の趣旨はよく分かりますが、一点懸念があります。", "Goteian no shushi wa yoku wakarimasu ga, itten kenen ga arimasu.", "Saya sangat paham maksud usulan Anda, tapi ada satu kekhawatiran."],
      ["その方法では、コストが大幅に増えるのではないでしょうか。", "Sono houhou de wa, kosuto ga oohaba ni fueru no de wa nai deshou ka.", "Bukankah dengan cara itu biayanya akan naik drastis?"],
      ["もう少し時間をかけて再考する必要があると思います。", "Mou sukoshi jikan o kakete saikou suru hitsuyou ga aru to omoimasu.", "Menurut saya perlu dipertimbangkan ulang dengan waktu yang sedikit lebih lama."],
      ["代わりに、段階的に導入する案はいかがでしょうか。", "Kawari ni, dankaiteki ni dounyuu suru an wa ikaga deshou ka.", "Sebagai gantinya, bagaimana dengan usulan menerapkannya secara bertahap?"],
    ],
  ],
  // 4. Mengomentari data
  [
    [
      ["このグラフは", "Kono gurafu wa", "grafik ini"],
      ["半分以下", "Hanbun ika", "kurang dari separuh"],
      ["と考えられます", "To kangaeraremasu", "diperkirakan"],
      ["と予想されます", "To yosou saremasu", "diprediksi", ["Urutan mengomentari data yang baik adalah...", "tren → angka → penyebab → implikasi", "penyebab → salam", "angka saja", "implikasi → pamit"]],
    ],
    [
      ["このグラフは、海外旅行者数の推移を示しています。", "Kono gurafu wa, kaigai ryokoushasuu no suii o shimeshite imasu.", "Grafik ini menunjukkan perkembangan jumlah wisatawan ke luar negeri."],
      ["二〇二〇年に大きく減少し、その後回復しています。", "Nisen nijuu nen ni ookiku genshou shi, sono go kaifuku shite imasu.", "Pada tahun 2020 turun drastis, lalu pulih setelahnya."],
      ["感染症の流行が主な原因と考えられます。", "Kansenshou no ryuukou ga omo na gen-in to kangaeraremasu.", "Penyebab utamanya diperkirakan wabah penyakit menular."],
      ["来年には以前の水準を上回ると予想されます。", "Rainen ni wa izen no suijun o uwamawaru to yosou saremasu.", "Tahun depan diprediksi akan melampaui tingkat sebelumnya."],
    ],
  ],
  // 5. Isu sosial
  [
    [
      ["どうお考えですか", "Dou okangae desu ka", "bagaimana pendapat Anda?"],
      ["経済的な不安", "Keizaiteki na fuan", "kecemasan ekonomi"],
      ["という面もある", "To iu men mo aru", "ada juga sisi ..."],
      ["両方の視点", "Ryouhou no shiten", "dua sudut pandang", ["Pertanyaan sopan untuk meminta pendapat adalah...", "どうお考えですか。", "どうする？", "知ってる？", "なんで？"]],
    ],
    [
      ["食品ロスの問題について、どうお考えですか。", "Shokuhin rosu no mondai ni tsuite, dou okangae desu ka.", "Bagaimana pendapat Anda tentang masalah pemborosan makanan?"],
      ["消費者の意識を変えることが第一だと思います。", "Shouhisha no ishiki o kaeru koto ga dai ichi da to omoimasu.", "Menurut saya yang utama adalah mengubah kesadaran konsumen."],
      ["企業の売り方にも問題があるという面もありますね。", "Kigyou no urikata ni mo mondai ga aru to iu men mo arimasu ne.", "Ada juga sisi bahwa cara perusahaan menjual juga bermasalah."],
      ["消費者と企業、両方の視点から考える必要があります。", "Shouhisha to kigyou, ryouhou no shiten kara kangaeru hitsuyou ga arimasu.", "Perlu dipikirkan dari dua sudut pandang, konsumen dan perusahaan."],
    ],
  ],
  // 6. Usulan kebijakan
  [
    [
      ["を提言します", "O teigen shimasu", "saya mengusulkan ..."],
      ["回収できる見込み", "Kaishuu dekiru mikomi", "diperkirakan bisa balik modal"],
      ["費用対効果", "Hiyou tai kouka", "efektivitas biaya"],
      ["財源", "Zaigen", "sumber dana", ["Usulan kebijakan yang baik memuat...", "masalah, usulan, manfaat, dan biaya/risiko", "hanya keluhan", "hanya pujian", "hanya salam"]],
    ],
    [
      ["高齢者の移動手段が不足しています。", "Koureisha no idou shudan ga fusoku shite imasu.", "Sarana transportasi bagi lansia masih kurang."],
      ["そこで、地域の乗り合いバスの導入を提言します。", "Sokode, chiiki no noriai basu no dounyuu o teigen shimasu.", "Karena itu, saya mengusulkan penerapan bus komunitas di daerah."],
      ["費用対効果を考えても、十分に意義があると思います。", "Hiyou tai kouka o kangaete mo, juubun ni igi ga aru to omoimasu.", "Dilihat dari efektivitas biaya pun, menurut saya cukup bermakna."],
      ["財源は、国の補助金と市の予算で確保できます。", "Zaigen wa, kuni no hojokin to shi no yosan de kakuho dekimasu.", "Sumber dananya bisa dijamin dari subsidi negara dan anggaran kota."],
    ],
  ],
  // 7. Laporan kerja
  [
    [
      ["結論から申し上げますと", "Ketsuron kara moushiagemasu to", "langsung pada kesimpulannya"],
      ["顧客満足度", "Kokyaku manzokudo", "tingkat kepuasan pelanggan"],
      ["課題が残る", "Kadai ga nokoru", "masih tersisa tantangan"],
      ["来期", "Raiki", "periode depan", ["Laporan kerja di Jepang sebaiknya dimulai dengan...", "kesimpulan", "latar belakang panjang", "permintaan maaf", "lelucon"]],
    ],
    [
      ["結論から申し上げますと、プロジェクトは予定通り進んでいます。", "Ketsuron kara moushiagemasu to, purojekuto wa yotei doori susunde imasu.", "Langsung pada kesimpulannya, proyek berjalan sesuai jadwal."],
      ["顧客満足度は前回の調査より十ポイント上がりました。", "Kokyaku manzokudo wa zenkai no chousa yori juu pointo agarimashita.", "Tingkat kepuasan pelanggan naik sepuluh poin dari survei sebelumnya."],
      ["ただし、人手不足という課題が残っています。", "Tadashi, hitode busoku to iu kadai ga nokotte imasu.", "Namun, masih tersisa tantangan berupa kekurangan tenaga kerja."],
      ["来期は採用を強化する方針です。", "Raiki wa saiyou o kyouka suru houshin desu.", "Periode depan kebijakannya memperkuat rekrutmen."],
    ],
  ],
  // 8. Penjelasan akademik
  [
    [
      ["とは…のことです", "To wa... no koto desu", "yang dimaksud ... adalah ..."],
      ["具体的には", "Gutaiteki ni wa", "secara konkret"],
      ["という働き", "To iu hataraki", "fungsi berupa ..."],
      ["指摘されている", "Shiteki sarete iru", "telah ditunjukkan / disorot", ["Penjelasan akademik yang baik berurutan...", "definisi → contoh → batasan konsep", "contoh → salam", "batasan → pamit", "salam → selesai"]],
    ],
    [
      ["「ワークライフバランス」とは、仕事と生活の調和のことです。", "\"Waaku raifu baransu\" to wa, shigoto to seikatsu no chouwa no koto desu.", "'Work-life balance' adalah keselarasan antara pekerjaan dan kehidupan."],
      ["具体的には、残業を減らし、家族との時間を確保することです。", "Gutaiteki ni wa, zangyou o herashi, kazoku to no jikan o kakuho suru koto desu.", "Secara konkret, mengurangi lembur dan menjamin waktu bersama keluarga."],
      ["社員の健康を守るという働きもあります。", "Shain no kenkou o mamoru to iu hataraki mo arimasu.", "Ada juga fungsi menjaga kesehatan karyawan."],
      ["一方で、業種によっては実現が難しいことも指摘されています。", "Ippou de, gyoushu ni yotte wa jitsugen ga muzukashii koto mo shiteki sarete imasu.", "Di sisi lain, juga disorot bahwa di beberapa bidang usaha sulit diwujudkan."],
    ],
  ],
  // 9. Wawancara lanjutan
  [
    [
      ["一番大きな失敗", "Ichiban ooki na shippai", "kegagalan terbesar"],
      ["前職", "Zenshoku", "pekerjaan sebelumnya"],
      ["何を学びましたか", "Nani o manabimashita ka", "apa yang Anda pelajari?"],
      ["早い段階で", "Hayai dankai de", "sejak tahap awal", ["Saat ditanya kegagalan dalam wawancara, sebaiknya kamu...", "jujur dan menunjukkan refleksi serta perbaikan", "bilang tidak pernah gagal", "menyalahkan orang lain", "menolak menjawab"]],
    ],
    [
      ["前職では、チームの意見をまとめられずに苦労しました。", "Zenshoku de wa, chiimu no iken o matomerarezu ni kurou shimashita.", "Di pekerjaan sebelumnya, saya kesulitan karena tidak bisa menyatukan pendapat tim."],
      ["その経験から、一人一人と話す時間を作るようになりました。", "Sono keiken kara, hitori hitori to hanasu jikan o tsukuru you ni narimashita.", "Dari pengalaman itu, saya jadi meluangkan waktu berbicara dengan tiap orang."],
      ["なぜ転職を考えたのですか。", "Naze tenshoku o kangaeta no desu ka.", "Mengapa Anda mempertimbangkan pindah kerja?"],
      ["より大きな規模で、自分の力を試したいと思ったからです。", "Yori ooki na kibo de, jibun no chikara o tameshitai to omotta kara desu.", "Karena saya ingin menguji kemampuan saya dalam skala yang lebih besar."],
    ],
  ],
  // 10. Negosiasi
  [
    [
      ["正直なところ", "Shoujiki na tokoro", "terus terang"],
      ["という条件でしたら", "To iu jouken deshitara", "dengan syarat ..."],
      ["ご検討いただけないでしょうか", "Gokentou itadakenai deshou ka", "bisakah dipertimbangkan?"],
      ["歩み寄る", "Ayumiyoru", "saling mengalah / berkompromi", ["Negosiasi yang baik bertujuan untuk...", "mencari solusi yang menguntungkan kedua pihak", "mengalahkan lawan", "menolak semua tawaran", "mengakhiri hubungan"]],
    ],
    [
      ["正直なところ、この納期では対応が難しいです。", "Shoujiki na tokoro, kono nouki de wa taiou ga muzukashii desu.", "Terus terang, dengan tenggat ini sulit bagi kami."],
      ["長期契約という条件でしたら、価格の見直しも可能です。", "Chouki keiyaku to iu jouken deshitara, kakaku no minaoshi mo kanou desu.", "Dengan syarat kontrak jangka panjang, peninjauan harga juga memungkinkan."],
      ["お互いに少し歩み寄れればと思います。", "Otagai ni sukoshi ayumiyorereba to omoimasu.", "Saya harap kita bisa saling berkompromi sedikit."],
      ["では、送料を当社が負担するということで、ご検討いただけないでしょうか。", "De wa, souryou o tousha ga futan suru to iu koto de, gokentou itadakenai deshou ka.", "Kalau begitu, dengan kami menanggung ongkos kirim, bisakah dipertimbangkan?"],
    ],
  ],
  // 11. Menjelaskan risiko
  [
    [
      ["おそれがある", "Osore ga aru", "ada risiko / dikhawatirkan"],
      ["失いかねない", "Ushinaikanenai", "bisa saja kehilangan"],
      ["万一の場合", "Man-ichi no baai", "dalam keadaan darurat"],
      ["未然に防ぐ", "Mizen ni fusegu", "mencegah sebelum terjadi", ["Penjelasan risiko yang baik berurutan...", "kemungkinan → dampak → pencegahan", "pencegahan → salam", "dampak saja", "salam → selesai"]],
    ],
    [
      ["この設備は古く、故障するおそれがあります。", "Kono setsubi wa furuku, koshou suru osore ga arimasu.", "Peralatan ini sudah tua dan berisiko rusak."],
      ["そうなれば、生産が一週間止まりかねません。", "Sou nareba, seisan ga isshuukan tomarikanemasen.", "Kalau sampai begitu, produksi bisa saja terhenti seminggu."],
      ["定期的な点検で、事故を未然に防ぐことができます。", "Teikiteki na tenken de, jiko o mizen ni fusegu koto ga dekimasu.", "Dengan pemeriksaan berkala, kecelakaan bisa dicegah sebelum terjadi."],
      ["万一の場合に備えて、予備の部品を用意しておくべきです。", "Man-ichi no baai ni sonaete, yobi no buhin o youi shite oku beki desu.", "Untuk berjaga-jaga, sebaiknya disiapkan suku cadang cadangan."],
    ],
  ],
  // 12. Sebab dan akibat
  [
    [
      ["その結果", "Sono kekka", "akibatnya"],
      ["それによって", "Sore ni yotte", "karena itu"],
      ["プラスの影響", "Purasu no eikyou", "dampak positif"],
      ["悪循環", "Akujunkan", "lingkaran setan", ["Kata 悪循環 berarti...", "lingkaran setan (akibat buruk yang berulang)", "keberuntungan", "kemajuan", "perbaikan"]],
    ],
    [
      ["原材料の価格が上がった結果、商品の値上げが続いています。", "Genzairyou no kakaku ga agatta kekka, shouhin no neage ga tsuzuite imasu.", "Akibat naiknya harga bahan baku, kenaikan harga barang terus berlanjut."],
      ["それによって、消費者の買い控えが広がっています。", "Sore ni yotte, shouhisha no kaibikae ga hirogatte imasu.", "Karena itu, konsumen semakin menahan belanja."],
      ["売り上げが減り、さらに値上げをするという悪循環です。", "Uriage ga heri, sara ni neage o suru to iu akujunkan desu.", "Penjualan turun lalu harga dinaikkan lagi, sebuah lingkaran setan."],
      ["一方、国内旅行の需要にはプラスの影響が出ています。", "Ippou, kokunai ryokou no juyou ni wa purasu no eikyou ga dete imasu.", "Di sisi lain, ada dampak positif pada permintaan wisata domestik."],
    ],
  ],
  // 13. Sudut pandang pemangku kepentingan
  [
    [
      ["の立場から見ると", "No tachiba kara miru to", "dilihat dari posisi ..."],
      ["打撃になる", "Dageki ni naru", "menjadi pukulan"],
      ["行政", "Gyousei", "pemerintah / administrasi"],
      ["利用者", "Riyousha", "pengguna", ["Analisis pemangku kepentingan berarti melihat masalah dari...", "berbagai pihak yang terkait", "satu pihak saja", "pendapat pribadi saja", "data cuaca"]],
    ],
    [
      ["二十四時間営業の見直しについて、どう思いますか。", "Nijuuyojikan eigyou no minaoshi ni tsuite, dou omoimasu ka.", "Bagaimana pendapat Anda tentang peninjauan ulang operasional 24 jam?"],
      ["店員の立場から見ると、負担が減るのは大歓迎です。", "Ten-in no tachiba kara miru to, futan ga heru no wa daikangei desu.", "Dari posisi pegawai toko, berkurangnya beban sangat disambut."],
      ["しかし、夜に買い物をする利用者には不便になります。", "Shikashi, yoru ni kaimono o suru riyousha ni wa fuben ni narimasu.", "Namun, bagi pengguna yang berbelanja malam hari jadi tidak praktis."],
      ["経営者にとっては、売り上げへの打撃が心配ですね。", "Keieisha ni totte wa, uriage e no dageki ga shinpai desu ne.", "Bagi pengusaha, pukulan terhadap penjualan mengkhawatirkan."],
    ],
  ],
  // 14. Sanggahan
  [
    [
      ["一理ありますが", "Ichiri arimasu ga", "ada benarnya, tapi..."],
      ["必ずしもそうとは限らない", "Kanarazushimo sou to wa kagiranai", "belum tentu begitu"],
      ["要は", "You wa", "intinya"],
      ["という研究もある", "To iu kenkyuu mo aru", "ada juga penelitian yang menyatakan ...", ["Sanggahan yang baik dimulai dengan...", "mengakui poin lawan", "menghina lawan", "mengubah topik", "diam"]],
    ],
    [
      ["若者は本を読まなくなったと言われています。", "Wakamono wa hon o yomanaku natta to iwarete imasu.", "Katanya anak muda tidak lagi membaca buku."],
      ["一理ありますが、電子書籍で読む人は増えています。", "Ichiri arimasu ga, denshi shoseki de yomu hito wa fuete imasu.", "Ada benarnya, tapi orang yang membaca lewat e-book bertambah."],
      ["読む量自体は減っていないという調査もあります。", "Yomu ryou jitai wa hette inai to iu chousa mo arimasu.", "Ada juga survei yang menyatakan jumlah bacaannya sendiri tidak berkurang."],
      ["要は、読む形が変わっただけだということです。", "You wa, yomu katachi ga kawatta dake da to iu koto desu.", "Intinya, hanya bentuk membacanya yang berubah."],
    ],
  ],
  // 15. Presentasi formal
  [
    [
      ["続きまして", "Tsuzukimashite", "selanjutnya"],
      ["施策", "Shisaku", "langkah kebijakan"],
      ["以上を踏まえて", "Ijou o fumaete", "berdasarkan hal di atas"],
      ["まとめますと", "Matomemasu to", "kalau dirangkum", ["Urutan presentasi formal yang baik adalah...", "salam → tujuan → isi bertahap → ringkasan → tanya jawab", "tanya jawab → salam", "ringkasan saja", "isi → pamit"]],
    ],
    [
      ["続きまして、調査の結果をご報告いたします。", "Tsuzukimashite, chousa no kekka o gohoukoku itashimasu.", "Selanjutnya, saya laporkan hasil survei."],
      ["回答者の七割が、現在のサービスに満足していると答えました。", "Kaitousha no nanawari ga, genzai no saabisu ni manzoku shite iru to kotaemashita.", "Tujuh puluh persen responden menjawab puas dengan layanan saat ini."],
      ["以上を踏まえて、次の三つの施策を提案いたします。", "Ijou o fumaete, tsugi no mittsu no shisaku o teian itashimasu.", "Berdasarkan hal di atas, kami mengusulkan tiga langkah berikut."],
      ["まとめますと、利用者の声を反映することが最も重要です。", "Matomemasu to, riyousha no koe o han-ei suru koto ga mottomo juuyou desu.", "Kalau dirangkum, yang terpenting adalah mencerminkan suara pengguna."],
    ],
  ],
  // 16. Menangani tanya jawab
  [
    [
      ["貴重なご質問", "Kichou na goshitsumon", "pertanyaan yang berharga"],
      ["ご指摘の点", "Goshiteki no ten", "hal yang Anda sampaikan"],
      ["後ほどお送りします", "Nochihodo ookuri shimasu", "akan saya kirimkan nanti"],
      ["ほかにご質問は", "Hoka ni goshitsumon wa", "ada pertanyaan lain?", ["Saat menjawab pertanyaan yang belum bisa dijawab, sebaiknya kamu...", "berjanji mengirim informasi nanti", "mengarang jawaban", "mengabaikan pertanyaan", "marah"]],
    ],
    [
      ["ご質問の趣旨は、費用の内訳についてということでよろしいでしょうか。", "Goshitsumon no shushi wa, hiyou no uchiwake ni tsuite to iu koto de yoroshii deshou ka.", "Apakah maksud pertanyaan Anda mengenai rincian biaya?"],
      ["ご指摘の点は、次の段階で改善する予定です。", "Goshiteki no ten wa, tsugi no dankai de kaizen suru yotei desu.", "Hal yang Anda sampaikan dijadwalkan diperbaiki pada tahap berikutnya."],
      ["正確な数字は確認して、後ほどメールでお送りします。", "Seikaku na suuji wa kakunin shite, nochihodo meeru de ookuri shimasu.", "Angka pastinya akan saya periksa dan kirimkan lewat email nanti."],
      ["時間になりましたので、これで質疑応答を終わります。", "Jikan ni narimashita node, kore de shitsugi outou o owarimasu.", "Karena waktunya sudah habis, sesi tanya jawab kami akhiri."],
    ],
  ],
  // 17. Memperbaiki nuansa
  [
    [
      ["言い方が悪かった", "Iikata ga warukatta", "cara bicaraku kurang tepat"],
      ["という意味ではなく", "To iu imi de wa naku", "maksudnya bukan ..."],
      ["誤解を招く", "Gokai o maneku", "menimbulkan salah paham"],
      ["言葉足らず", "Kotoba tarazu", "kurang penjelasan", ["Jika ucapanmu disalahpahami, sebaiknya kamu...", "memperbaiki nuansa dan menjelaskan maksud", "diam saja", "menyalahkan pendengar", "mengulang dengan keras"]],
    ],
    [
      ["誤解を招くような言い方をして、申し訳ありません。", "Gokai o maneku you na iikata o shite, moushiwake arimasen.", "Mohon maaf atas cara bicara yang menimbulkan salah paham."],
      ["批判するという意味ではなく、心配していただけなんです。", "Hihan suru to iu imi de wa naku, shinpai shite ita dake nan desu.", "Maksudnya bukan mengkritik, saya hanya khawatir."],
      ["私の言葉足らずでした。改めてご説明します。", "Watashi no kotoba tarazu deshita. Aratamete gosetsumei shimasu.", "Penjelasan saya kurang. Akan saya jelaskan kembali."],
      ["つまり、もう少し準備期間がほしいということです。", "Tsumari, mou sukoshi junbi kikan ga hoshii to iu koto desu.", "Maksudnya, saya ingin masa persiapan yang sedikit lebih lama."],
    ],
  ],
  // 18. Bicara persuasif
  [
    [
      ["皆さんも", "Minasan mo", "Anda semua juga"],
      ["取り入れる", "Toriireru", "menerapkan / mengadopsi"],
      ["実際に", "Jissai ni", "kenyataannya"],
      ["試してみませんか", "Tameshite mimasen ka", "bagaimana kalau kita coba?", ["Pidato persuasif sebaiknya diawali dengan...", "masalah yang dirasakan pendengar", "data acak", "permintaan maaf", "lelucon panjang"]],
    ],
    [
      ["皆さんも、会議が長すぎると感じたことはありませんか。", "Minasan mo, kaigi ga nagasugiru to kanjita koto wa arimasen ka.", "Pernahkah Anda semua merasa rapat terlalu lama?"],
      ["立ったまま会議をすれば、時間が半分になるそうです。", "Tatta mama kaigi o sureba, jikan ga hanbun ni naru sou desu.", "Katanya kalau rapat sambil berdiri, waktunya jadi separuh."],
      ["実際に取り入れた会社では、残業も減ったといいます。", "Jissai ni toriireta kaisha de wa, zangyou mo hetta to iimasu.", "Di perusahaan yang benar-benar menerapkannya, lembur juga berkurang."],
      ["来週の会議から、さっそく試してみませんか。", "Raishuu no kaigi kara, sassoku tameshite mimasen ka.", "Bagaimana kalau mulai rapat minggu depan kita langsung coba?"],
    ],
  ],
  // 19. Sintesis pendapat
  [
    [
      ["ご意見をまとめると", "Goiken o matomeru to", "kalau pendapat dirangkum"],
      ["共通している", "Kyoutsuu shite iru", "memiliki kesamaan"],
      ["手段", "Shudan", "cara / sarana"],
      ["小規模で試す", "Shoukibo de tamesu", "mencoba dalam skala kecil", ["Sintesis pendapat berarti...", "merangkum beberapa pendapat dan mencari titik temu", "memilih satu pendapat saja", "menolak semua pendapat", "menunda keputusan selamanya"]],
    ],
    [
      ["皆さんのご意見をまとめると、大きく二つに分かれます。", "Minasan no goiken o matomeru to, ookiku futatsu ni wakaremasu.", "Kalau pendapat Anda semua dirangkum, garis besarnya terbagi dua."],
      ["どちらも、社員の負担を減らしたいという点で共通しています。", "Dochira mo, shain no futan o herashitai to iu ten de kyoutsuu shite imasu.", "Keduanya sama-sama ingin mengurangi beban karyawan."],
      ["違いは、システムで解決するか、人を増やすかという手段です。", "Chigai wa, shisutemu de kaiketsu suru ka, hito o fuyasu ka to iu shudan desu.", "Perbedaannya pada cara: diselesaikan dengan sistem atau menambah orang."],
      ["まずは一つの部署で、小規模に試してみましょう。", "Mazu wa hitotsu no busho de, shoukibo ni tameshite mimashou.", "Mari coba dulu dalam skala kecil di satu divisi."],
    ],
  ],
  // 20. Ulasan speaking N2
  [
    [
      ["仕事を奪う", "Shigoto o ubau", "merebut pekerjaan"],
      ["取り残される", "Torinokosareru", "tertinggal"],
      ["学び直し", "Manabinaoshi", "belajar ulang"],
      ["移行期", "Ikouki", "masa transisi", ["Kata 取り残される berarti...", "tertinggal", "terpilih", "terlindungi", "terlambat bangun"]],
    ],
    [
      ["在宅勤務は、これからも続けるべきでしょうか。", "Zaitaku kinmu wa, korekara mo tsuzukeru beki deshou ka.", "Apakah kerja dari rumah seharusnya terus dilanjutkan?"],
      ["通勤がない分、集中できる時間が増えたという声は多いです。", "Tsuukin ga nai bun, shuuchuu dekiru jikan ga fueta to iu koe wa ooi desu.", "Banyak yang bilang waktu fokus bertambah karena tidak perlu ke kantor."],
      ["ただ、新人が取り残されないような工夫が必要ですね。", "Tada, shinjin ga torinokosarenai you na kufuu ga hitsuyou desu ne.", "Hanya saja, perlu upaya agar karyawan baru tidak tertinggal."],
      ["出社と在宅を組み合わせるのが現実的だと思います。", "Shussha to zaitaku o kumiawaseru no ga genjitsuteki da to omoimasu.", "Menurut saya memadukan masuk kantor dan kerja dari rumah itu realistis."],
    ],
  ],
];
