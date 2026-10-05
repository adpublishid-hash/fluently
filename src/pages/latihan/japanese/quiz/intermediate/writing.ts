import type { JapaneseQuizTopic } from '../types';

// Latihan Writing N3 — one entry per topic (index = topic - 1): [Basic, Advanced].
export const writing: JapaneseQuizTopic[] = [
  // 1. Paragraf opini
  [
    [
      ["と考える", "To kangaeru", "berpendapat bahwa"],
      ["組み合わせる", "Kumiawaseru", "memadukan"],
      ["長所を生かす", "Chousho o ikasu", "memanfaatkan kelebihan"],
      ["質を高める", "Shitsu o takameru", "meningkatkan kualitas", ["Urutan paragraf opini yang baik adalah...", "kalimat topik → alasan → contoh → penutup", "contoh → salam", "penutup → alasan", "salam → pamit"]],
    ],
    [
      ["私は、高校生のアルバイトは認めるべきだと考える。", "Watashi wa, koukousei no arubaito wa mitomeru beki da to kangaeru.", "Saya berpendapat kerja paruh waktu siswa SMA sebaiknya diizinkan."],
      ["働くことで、社会のルールを早くから学べるからだ。", "Hataraku koto de, shakai no ruuru o hayaku kara manaberu kara da.", "Sebab dengan bekerja, mereka bisa belajar aturan masyarakat sejak dini."],
      ["ただし、勉強の時間を確保することが前提である。", "Tadashi, benkyou no jikan o kakuho suru koto ga zentei de aru.", "Namun, syaratnya waktu belajar harus tetap terjamin."],
      ["学業と両立できれば、貴重な経験になるだろう。", "Gakugyou to ryouritsu dekireba, kichou na keiken ni naru darou.", "Kalau bisa seimbang dengan sekolah, itu akan menjadi pengalaman berharga."],
    ],
  ],
  // 2. Email formal
  [
    [
      ["突然のご連絡", "Totsuzen no gorenraku", "pesan yang tiba-tiba"],
      ["と申します", "To moushimasu", "nama saya ... (merendah)"],
      ["お伺いしたく", "Oukagai shitaku", "ingin menanyakan (merendah)"],
      ["何卒", "Nanitozo", "dengan sangat (mohon)", ["Ungkapan penutup email formal yang paling sopan adalah...", "何卒よろしくお願い申し上げます。", "じゃあね。", "またね。", "よろしく！"]],
    ],
    [
      ["初めてメールをお送りいたします。", "Hajimete meeru o ookuri itashimasu.", "Ini pertama kalinya saya mengirim email kepada Anda."],
      ["貴社の求人広告を拝見し、ご連絡いたしました。", "Kisha no kyuujin koukoku o haiken shi, gorenraku itashimashita.", "Saya menghubungi setelah membaca iklan lowongan perusahaan Anda."],
      ["応募に必要な書類について、お教えいただけますでしょうか。", "Oubo ni hitsuyou na shorui ni tsuite, ooshie itadakemasu deshou ka.", "Bisakah Anda memberi tahu dokumen yang diperlukan untuk melamar?"],
      ["お忙しいところ恐縮ですが、何卒よろしくお願い申し上げます。", "Oisogashii tokoro kyoushuku desu ga, nanitozo yoroshiku onegai moushiagemasu.", "Mohon maaf mengganggu kesibukan Anda, atas perhatiannya saya ucapkan terima kasih."],
    ],
  ],
  // 3. Email keluhan
  [
    [
      ["届いておりません", "Todoite orimasen", "belum sampai (sopan)"],
      ["予定日を過ぎる", "Yoteibi o sugiru", "lewat dari tanggal yang dijadwalkan"],
      ["ご確認いただけますでしょうか", "Gokakunin itadakemasu deshou ka", "bisakah Anda memeriksa?"],
      ["幸いです", "Saiwai desu", "saya akan senang (bila ...)", ["Email keluhan yang baik sebaiknya...", "menyampaikan fakta tanpa emosi berlebihan", "penuh kata kasar", "tanpa menyebut masalah", "hanya berisi pujian"]],
    ],
    [
      ["先日購入したパソコンが、三日で動かなくなりました。", "Senjitsu kounyuu shita pasokon ga, mikka de ugokanaku narimashita.", "Komputer yang saya beli beberapa hari lalu tidak berfungsi setelah tiga hari."],
      ["電源ボタンを押しても、画面が真っ暗なままです。", "Dengen botan o oshite mo, gamen ga makkura na mama desu.", "Meskipun tombol daya ditekan, layarnya tetap gelap."],
      ["保証期間内ですので、交換をお願いできますでしょうか。", "Hoshou kikannai desu node, koukan o onegai dekimasu deshou ka.", "Karena masih dalam masa garansi, bisakah saya minta penukaran?"],
      ["お手数ですが、ご対応いただけますと幸いです。", "Otesuu desu ga, gotaiou itadakemasu to saiwai desu.", "Mohon maaf merepotkan, saya akan senang bila Anda dapat menanganinya."],
    ],
  ],
  // 4. Menulis ringkasan
  [
    [
      ["筆者", "Hissha", "penulis (teks)"],
      ["と述べている", "To nobete iru", "menyatakan bahwa"],
      ["と指摘している", "To shiteki shite iru", "menunjukkan / menyoroti bahwa"],
      ["という主張", "To iu shuchou", "pendapat bahwa", ["Saat meringkas, yang sebaiknya dibuang adalah...", "contoh dan detail kecil", "ide pokok", "kesimpulan penulis", "topik utama"]],
    ],
    [
      ["筆者は、運動が心の健康にも良いと述べている。", "Hissha wa, undou ga kokoro no kenkou ni mo yoi to nobete iru.", "Penulis menyatakan bahwa olahraga juga baik untuk kesehatan mental."],
      ["その根拠として、気分が明るくなる研究結果を挙げている。", "Sono konkyo to shite, kibun ga akaruku naru kenkyuu kekka o agete iru.", "Sebagai dasarnya, ia menyebut hasil penelitian bahwa suasana hati menjadi cerah."],
      ["さらに、短い散歩でも効果があると指摘している。", "Sara ni, mijikai sanpo demo kouka ga aru to shiteki shite iru.", "Lebih lanjut, ia menunjukkan bahwa jalan kaki singkat pun berefek."],
      ["要するに、毎日少しでも体を動かすべきだという主張である。", "You suru ni, mainichi sukoshi demo karada o ugokasu beki da to iu shuchou de aru.", "Singkatnya, pendapatnya adalah kita sebaiknya bergerak meski sedikit setiap hari."],
    ],
  ],
  // 5. Menulis rekomendasi
  [
    [
      ["特におすすめしたい", "Toku ni osusume shitai", "terutama ingin saya rekomendasikan"],
      ["点も魅力である", "Ten mo miryoku de aru", "hal itu juga menarik"],
      ["初心者でも", "Shoshinsha demo", "pemula pun"],
      ["かもしれない", "Kamoshirenai", "mungkin", ["Tulisan rekomendasi yang baik memuat...", "untuk siapa, apa, alasan, dan catatan", "hanya judul", "hanya harga", "hanya alamat"]],
    ],
    [
      ["料理を始めたい人に、特におすすめしたいのがこの本だ。", "Ryouri o hajimetai hito ni, toku ni osusume shitai no ga kono hon da.", "Buku inilah yang terutama ingin saya rekomendasikan bagi yang ingin mulai memasak."],
      ["写真が多く、初心者でも作り方がよくわかる。", "Shashin ga ooku, shoshinsha demo tsukurikata ga yoku wakaru.", "Banyak fotonya, jadi pemula pun paham cara membuatnya."],
      ["材料がスーパーで買えるものばかりという点も魅力である。", "Zairyou ga suupaa de kaeru mono bakari to iu ten mo miryoku de aru.", "Bahannya semua bisa dibeli di supermarket, itu juga menarik."],
      ["ただ、和食のレシピは少ないかもしれない。", "Tada, washoku no reshipi wa sukunai kamoshirenai.", "Hanya saja, resep masakan Jepangnya mungkin sedikit."],
    ],
  ],
  // 6. Menjelaskan proses
  [
    [
      ["分ける", "Wakeru", "memisahkan"],
      ["外す", "Hazusu", "melepas"],
      ["その際", "Sono sai", "saat itu"],
      ["決められた", "Kimerareta", "yang ditentukan", ["Penulisan proses sebaiknya memuat...", "langkah berurutan dan alasannya", "pendapat pribadi saja", "harga barang", "nama orang"]],
    ],
    [
      ["まず、パソコンの電源を切り、コードを抜く。", "Mazu, pasokon no dengen o kiri, koodo o nuku.", "Pertama, matikan komputer dan cabut kabelnya."],
      ["次に、柔らかい布で画面のほこりを取る。", "Tsugi ni, yawarakai nuno de gamen no hokori o toru.", "Selanjutnya, bersihkan debu layar dengan kain lembut."],
      ["その際、強くこすらないように注意する。", "Sono sai, tsuyoku kosuranai you ni chuui suru.", "Saat itu, berhati-hatilah agar tidak menggosok terlalu keras."],
      ["最後に、完全に乾いてから電源を入れる。", "Saigo ni, kanzen ni kawaite kara dengen o ireru.", "Terakhir, nyalakan setelah benar-benar kering."],
    ],
  ],
  // 7. Esai perbandingan
  [
    [
      ["それぞれ長所がある", "Sorezore chousho ga aru", "masing-masing punya kelebihan"],
      ["面もある", "Men mo aru", "ada juga sisi ..."],
      ["自立", "Jiritsu", "kemandirian"],
      ["合った選択", "Atta sentaku", "pilihan yang sesuai", ["Esai perbandingan yang baik memakai...", "kriteria yang sama untuk kedua hal", "kriteria berbeda tiap hal", "satu hal saja", "tanpa kriteria"]],
    ],
    [
      ["都会の大学と地方の大学には、それぞれ長所がある。", "Tokai no daigaku to chihou no daigaku ni wa, sorezore chousho ga aru.", "Universitas di kota dan di daerah masing-masing punya kelebihan."],
      ["都会の大学は、アルバイトや就職の機会が多い。", "Tokai no daigaku wa, arubaito ya shuushoku no kikai ga ooi.", "Universitas di kota banyak kesempatan kerja paruh waktu dan kerja."],
      ["地方の大学は、生活費が安く、勉強に集中しやすい面もある。", "Chihou no daigaku wa, seikatsuhi ga yasuku, benkyou ni shuuchuu shiyasui men mo aru.", "Universitas di daerah biaya hidupnya murah dan ada sisi mudah fokus belajar."],
      ["結局は、自分の将来の目標に合った選択が大切だ。", "Kekkyoku wa, jibun no shourai no mokuhyou ni atta sentaku ga taisetsu da.", "Pada akhirnya, pilihan yang sesuai target masa depan sendiri itu penting."],
    ],
  ],
  // 8. Refleksi pengalaman
  [
    [
      ["を通して", "O tooshite", "melalui"],
      ["に気づく", "Ni kizuku", "menyadari"],
      ["役に立てる", "Yaku ni tateru", "bisa berguna"],
      ["続けていきたい", "Tsuzukete ikitai", "ingin terus melanjutkan", ["Tulisan refleksi biasanya memuat...", "kejadian, perasaan, pelajaran, dan rencana", "harga dan alamat", "daftar belanja", "jadwal kereta"]],
    ],
    [
      ["留学生活を通して、自分の国を見直すようになった。", "Ryuugaku seikatsu o tooshite, jibun no kuni o minaosu you ni natta.", "Melalui kehidupan studi di luar negeri, saya mulai melihat negara saya dengan cara baru."],
      ["最初は、日本の習慣に戸惑うことが多かった。", "Saisho wa, Nihon no shuukan ni tomadou koto ga ookatta.", "Awalnya saya sering bingung dengan kebiasaan Jepang."],
      ["しかし、違いを知ることで視野が広がると気づいた。", "Shikashi, chigai o shiru koto de shiya ga hirogaru to kizuita.", "Namun, saya sadar bahwa mengenal perbedaan membuat wawasan meluas."],
      ["帰国後は、両国の架け橋になれるよう努力していきたい。", "Kikokugo wa, ryoukoku no kakehashi ni nareru you doryoku shite ikitai.", "Setelah pulang, saya ingin berusaha menjadi jembatan kedua negara."],
    ],
  ],
  // 9. Ringkasan berita
  [
    [
      ["震度", "Shindo", "intensitas gempa (skala Jepang)"],
      ["軽傷", "Keishou", "luka ringan"],
      ["停電", "Teiden", "pemadaman listrik"],
      ["呼びかける", "Yobikakeru", "mengimbau", ["Ringkasan berita sebaiknya memuat...", "5W1H dalam beberapa kalimat", "pendapat pribadi panjang", "iklan", "puisi"]],
    ],
    [
      ["五日、大阪府で大雨による洪水が発生した。", "Itsuka, Oosakafu de ooame ni yoru kouzui ga hassei shita.", "Tanggal 5, terjadi banjir akibat hujan lebat di Prefektur Osaka."],
      ["約二百世帯が避難所に移動したという。", "Yaku nihyaku setai ga hinanjo ni idou shita to iu.", "Dilaporkan sekitar dua ratus rumah tangga pindah ke tempat pengungsian."],
      ["電車は一部の区間で運転を見合わせている。", "Densha wa ichibu no kukan de unten o miawasete iru.", "Kereta menghentikan operasional di sebagian rute."],
      ["市は、川に近づかないよう住民に呼びかけている。", "Shi wa, kawa ni chikazukanai you juumin ni yobikakete iru.", "Pemerintah kota mengimbau warga agar tidak mendekati sungai."],
    ],
  ],
  // 10. Catatan usulan
  [
    [
      ["を提案します", "O teian shimasu", "saya mengusulkan ..."],
      ["経費削減", "Keihi sakugen", "penghematan biaya"],
      ["期待できる", "Kitai dekiru", "bisa diharapkan"],
      ["導入", "Dounyuu", "penerapan / pengenalan", ["Catatan usulan biasanya berurutan...", "latar → usulan → manfaat → kendala", "kendala → pamit", "manfaat saja", "salam → selesai"]],
    ],
    [
      ["社員の残業時間が長くなっている。", "Shain no zangyou jikan ga nagaku natte iru.", "Jam lembur karyawan semakin panjang."],
      ["そこで、フレックスタイム制の導入を提案します。", "Sokode, furekkusu taimu sei no dounyuu o teian shimasu.", "Karena itu, saya mengusulkan penerapan sistem jam kerja fleksibel."],
      ["通勤ラッシュを避けられ、生産性の向上が期待できます。", "Tsuukin rasshu o sakerare, seisansei no koujou ga kitai dekimasu.", "Jam sibuk bisa dihindari dan peningkatan produktivitas bisa diharapkan."],
      ["ただし、会議の時間調整が難しくなる可能性があります。", "Tadashi, kaigi no jikan chousei ga muzukashiku naru kanousei ga arimasu.", "Namun, ada kemungkinan pengaturan jadwal rapat menjadi sulit."],
    ],
  ],
  // 11. Menjawab pertanyaan wawancara
  [
    [
      ["強み", "Tsuyomi", "kekuatan"],
      ["を務める", "O tsutomeru", "menjabat sebagai"],
      ["対立する", "Tairitsu suru", "bertentangan"],
      ["貢献する", "Kouken suru", "berkontribusi", ["Jawaban wawancara tertulis sebaiknya dimulai dengan...", "kesimpulan, lalu pengalaman pendukung", "salam panjang", "pertanyaan balik", "keluhan"]],
    ],
    [
      ["私の強みは、最後まであきらめない粘り強さです。", "Watashi no tsuyomi wa, saigo made akiramenai nebarizuyosa desu.", "Kekuatan saya adalah kegigihan tidak menyerah sampai akhir."],
      ["卒業研究では、三十回以上実験をやり直しました。", "Sotsugyou kenkyuu de wa, sanjikkai ijou jikken o yarinaoshimashita.", "Dalam penelitian kelulusan, saya mengulang eksperimen lebih dari tiga puluh kali."],
      ["その結果、学会で発表する機会をいただきました。", "Sono kekka, gakkai de happyou suru kikai o itadakimashita.", "Hasilnya, saya mendapat kesempatan berpresentasi di forum ilmiah."],
      ["この粘り強さを生かして、御社の発展に貢献したいです。", "Kono nebarizuyosa o ikashite, onsha no hatten ni kouken shitai desu.", "Dengan memanfaatkan kegigihan ini, saya ingin berkontribusi bagi kemajuan perusahaan Anda."],
    ],
  ],
  // 12. Paragraf budaya
  [
    [
      ["という考え方", "To iu kangaekata", "cara pandang yang disebut ..."],
      ["助け合い", "Tasukeai", "saling membantu"],
      ["成り立つ", "Naritatsu", "terbentuk / berdiri atas"],
      ["似ている点", "Nite iru ten", "titik kemiripan", ["Paragraf budaya untuk pembaca asing sebaiknya memuat...", "definisi, praktik, dan makna", "harga tiket", "nomor telepon", "jadwal kereta"]],
    ],
    [
      ["インドネシアには「ムシャワラ」という話し合いの文化がある。", "Indoneshia ni wa \"mushawara\" to iu hanashiai no bunka ga aru.", "Di Indonesia ada budaya musyawarah."],
      ["何かを決めるとき、全員が納得するまで話し合うのだ。", "Nanika o kimeru toki, zen-in ga nattoku suru made hanashiau no da.", "Saat memutuskan sesuatu, semua orang berdiskusi sampai sepakat."],
      ["多数決よりも、全員の合意が大切にされている。", "Tasuuketsu yori mo, zen-in no goui ga taisetsu ni sarete iru.", "Kesepakatan bersama lebih dihargai daripada suara terbanyak."],
      ["日本の「根回し」と似ている点もあると思う。", "Nihon no \"nemawashi\" to nite iru ten mo aru to omou.", "Menurut saya ada juga kemiripan dengan 'nemawashi' di Jepang."],
    ],
  ],
  // 13. Kerangka argumen
  [
    [
      ["主張", "Shuchou", "klaim"],
      ["再反論", "Saihanron", "tanggapan atas sanggahan"],
      ["受動喫煙", "Judou kitsuen", "perokok pasif"],
      ["権利", "Kenri", "hak", ["Urutan kerangka argumen yang benar adalah...", "klaim → dasar → sanggahan → tanggapan", "sanggahan → klaim", "dasar → pamit", "tanggapan → salam"]],
    ],
    [
      ["主張：大学の授業料は無料にすべきだ。", "Shuchou: daigaku no jugyouryou wa muryou ni su beki da.", "Klaim: biaya kuliah universitas seharusnya gratis."],
      ["根拠：経済的な理由で進学をあきらめる若者がいる。", "Konkyo: keizaiteki na riyuu de shingaku o akirameru wakamono ga iru.", "Dasar: ada anak muda yang menyerah melanjutkan studi karena alasan ekonomi."],
      ["反論：国の財政負担が大きくなりすぎるという意見がある。", "Hanron: kuni no zaisei futan ga ookiku narisugiru to iu iken ga aru.", "Sanggahan: ada pendapat bahwa beban keuangan negara akan terlalu besar."],
      ["再反論：教育への投資は将来の税収につながる。", "Saihanron: kyouiku e no toushi wa shourai no zeishuu ni tsunagaru.", "Tanggapan: investasi pendidikan akan berujung pada pendapatan pajak di masa depan."],
    ],
  ],
  // 14. Alasan dan bukti
  [
    [
      ["実際に", "Jissai ni", "kenyataannya"],
      ["調査によれば", "Chousa ni yoreba", "menurut survei"],
      ["私自身", "Watashi jishin", "saya sendiri"],
      ["役立つ", "Yakudatsu", "berguna", ["Setiap alasan dalam argumen sebaiknya didukung oleh...", "data, contoh, atau pengalaman", "perasaan saja", "pertanyaan", "salam"]],
    ],
    [
      ["運動は勉強の効率を上げるのに役立つ。", "Undou wa benkyou no kouritsu o ageru no ni yakudatsu.", "Olahraga berguna untuk meningkatkan efisiensi belajar."],
      ["実際に、運動部の学生は成績が安定している傾向がある。", "Jissai ni, undoubu no gakusei wa seiseki ga antei shite iru keikou ga aru.", "Kenyataannya, siswa klub olahraga cenderung nilainya stabil."],
      ["ある調査によれば、運動の後は記憶力が一割上がるという。", "Aru chousa ni yoreba, undou no ato wa kiokuryoku ga ichiwari agaru to iu.", "Menurut sebuah survei, daya ingat naik sepuluh persen setelah olahraga."],
      ["私自身も、走った後のほうが単語を覚えやすい。", "Watashi jishin mo, hashitta ato no hou ga tango o oboeyasui.", "Saya sendiri juga lebih mudah menghafal kosakata setelah berlari."],
    ],
  ],
  // 15. Latihan kata transisi
  [
    [
      ["さらに", "Sara ni", "lebih lagi"],
      ["そのため", "Sono tame", "karena itu"],
      ["その結果として", "Sono kekka to shite", "sebagai hasilnya"],
      ["一方", "Ippou", "sementara itu", ["Kata transisi yang menunjukkan akibat adalah...", "そのため", "さらに", "一方", "また"]],
    ],
    [
      ["この店は品数が多い。さらに、閉店時間も遅い。", "Kono mise wa shinakazu ga ooi. Sara ni, heiten jikan mo osoi.", "Toko ini jenis barangnya banyak. Lebih lagi, tutupnya juga larut."],
      ["一方、駐車場がないという欠点がある。", "Ippou, chuushajou ga nai to iu ketten ga aru.", "Sementara itu, ada kekurangan tidak adanya tempat parkir."],
      ["そのため、車で来る客は少ない。", "Sono tame, kuruma de kuru kyaku wa sukunai.", "Karena itu, pelanggan yang datang naik mobil sedikit."],
      ["したがって、駐車場の確保が今後の課題である。", "Shitagatte, chuushajou no kakuho ga kongo no kadai de aru.", "Dengan demikian, penyediaan tempat parkir menjadi tantangan ke depan."],
    ],
  ],
  // 16. Menulis dengan kanji N3
  [
    [
      ["状況", "Joukyou", "situasi"],
      ["影響", "Eikyou", "pengaruh"],
      ["判断", "Handan", "penilaian / keputusan"],
      ["責任", "Sekinin", "tanggung jawab", ["Bacaan kanji 影響 adalah...", "eikyou", "eikou", "kageyou", "eiko"]],
    ],
    [
      ["現在の状況では、計画の変更はやむを得ない。", "Genzai no joukyou de wa, keikaku no henkou wa yamu o enai.", "Dalam situasi sekarang, perubahan rencana tidak bisa dihindari."],
      ["スマホの使いすぎは、睡眠に悪い影響を与える。", "Sumaho no tsukaisugi wa, suimin ni warui eikyou o ataeru.", "Terlalu banyak memakai ponsel memberi pengaruh buruk pada tidur."],
      ["最終的な判断は、部長に任せることにした。", "Saishuuteki na handan wa, buchou ni makaseru koto ni shita.", "Keputusan akhir diputuskan diserahkan kepada manajer."],
      ["自分の行動には、自分で責任を持つべきだ。", "Jibun no koudou ni wa, jibun de sekinin o motsu beki da.", "Seseorang seharusnya bertanggung jawab atas tindakannya sendiri."],
    ],
  ],
  // 17. Menyunting agar jelas
  [
    [
      ["文を分ける", "Bun o wakeru", "memecah kalimat"],
      ["主語", "Shugo", "subjek"],
      ["読み手", "Yomite", "pembaca"],
      ["簡潔に", "Kanketsu ni", "secara ringkas", ["Kalimat yang terlalu panjang sebaiknya...", "dipecah menjadi dua", "ditambah lagi", "dihapus seluruhnya", "ditulis dengan katakana"]],
    ],
    [
      ["説明が長すぎる場合は、文を二つに分けるとよい。", "Setsumei ga nagasugiru baai wa, bun o futatsu ni wakeru to yoi.", "Jika penjelasan terlalu panjang, sebaiknya kalimatnya dipecah menjadi dua."],
      ["一つの文には、一つの情報を入れるようにする。", "Hitotsu no bun ni wa, hitotsu no jouhou o ireru you ni suru.", "Usahakan satu kalimat berisi satu informasi."],
      ["読み手が誰かを考えて、言葉を選ぶ。", "Yomite ga dare ka o kangaete, kotoba o erabu.", "Pilih kata dengan memikirkan siapa pembacanya."],
      ["結論を最初に書くと、内容が伝わりやすい。", "Ketsuron o saisho ni kaku to, naiyou ga tsutawariyasui.", "Kalau kesimpulan ditulis di awal, isinya mudah tersampaikan."],
    ],
  ],
  // 18. Register sopan
  [
    [
      ["いたします", "Itashimasu", "melakukan (merendah)"],
      ["なさる", "Nasaru", "melakukan (hormat)"],
      ["ございます", "Gozaimasu", "ada (sangat sopan)"],
      ["申し上げます", "Moushiagemasu", "menyampaikan (sangat merendah)", ["Bentuk merendah dari する adalah...", "いたす", "なさる", "される", "おする"]],
    ],
    [
      ["本日は貴重なお時間をいただき、誠にありがとうございました。", "Honjitsu wa kichou na ojikan o itadaki, makoto ni arigatou gozaimashita.", "Terima kasih sebesar-besarnya telah meluangkan waktu yang berharga hari ini."],
      ["資料は明日までにお送りいたします。", "Shiryou wa ashita made ni ookuri itashimasu.", "Materinya akan saya kirimkan paling lambat besok."],
      ["何かご要望がございましたら、お申し付けください。", "Nanika goyoubou ga gozaimashitara, omoushitsuke kudasai.", "Jika ada permintaan, silakan sampaikan kepada kami."],
      ["心よりお礼申し上げます。", "Kokoro yori orei moushiagemasu.", "Saya mengucapkan terima kasih dari lubuk hati."],
    ],
  ],
  // 19. Esai mini 250 karakter
  [
    [
      ["第一に", "Dai ichi ni", "pertama"],
      ["身につく", "Mi ni tsuku", "terbentuk / dikuasai"],
      ["以上の理由から", "Ijou no riyuu kara", "dari alasan di atas"],
      ["と言える", "To ieru", "bisa dikatakan", ["Esai mini 250 karakter idealnya berisi...", "1 klaim, 2 alasan, 1 kesimpulan", "10 klaim", "tanpa kesimpulan", "hanya contoh"]],
    ],
    [
      ["私は、小学生から料理を習うべきだと考える。", "Watashi wa, shougakusei kara ryouri o narau beki da to kangaeru.", "Saya berpendapat anak sebaiknya belajar memasak sejak SD."],
      ["第一に、食べ物を大切にする心が育つからだ。", "Dai ichi ni, tabemono o taisetsu ni suru kokoro ga sodatsu kara da.", "Pertama, karena tumbuh sikap menghargai makanan."],
      ["第二に、自分の健康を自分で守る力が身につくからだ。", "Dai ni ni, jibun no kenkou o jibun de mamoru chikara ga mi ni tsuku kara da.", "Kedua, karena terbentuk kemampuan menjaga kesehatan sendiri."],
      ["以上の理由から、料理は生きる力を育てる学びだと言える。", "Ijou no riyuu kara, ryouri wa ikiru chikara o sodateru manabi da to ieru.", "Dari alasan di atas, memasak bisa dikatakan pembelajaran yang menumbuhkan kemampuan hidup."],
    ],
  ],
  // 20. Ulasan writing N3
  [
    [
      ["論理的", "Ronriteki", "logis"],
      ["話し言葉", "Hanashikotoba", "ragam lisan"],
      ["書き言葉", "Kakikotoba", "ragam tulisan"],
      ["文体", "Buntai", "gaya tulisan", ["Dalam tulisan formal, sebaiknya kita menghindari...", "ragam lisan (話し言葉)", "kanji", "konektor", "paragraf"]],
    ],
    [
      ["作文では、「すごく」より「非常に」を使うほうがよい。", "Sakubun de wa, \"sugoku\" yori \"hijou ni\" o tsukau hou ga yoi.", "Dalam karangan, lebih baik memakai 'hijou ni' daripada 'sugoku'."],
      ["話し言葉と書き言葉を区別して使えるようになった。", "Hanashikotoba to kakikotoba o kubetsu shite tsukaeru you ni natta.", "Saya jadi bisa membedakan pemakaian ragam lisan dan tulisan."],
      ["段落ごとに一つの主張をまとめるようにしている。", "Danraku goto ni hitotsu no shuchou o matomeru you ni shite iru.", "Saya membiasakan merangkum satu pendapat di setiap paragraf."],
      ["今後は、より論理的な文章が書けるよう練習を続けたい。", "Kongo wa, yori ronriteki na bunshou ga kakeru you renshuu o tsuzuketai.", "Ke depannya saya ingin terus berlatih agar bisa menulis tulisan yang lebih logis."],
    ],
  ],
];
