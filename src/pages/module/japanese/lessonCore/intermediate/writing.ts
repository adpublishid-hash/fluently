import type { LessonCoreTuple } from '../types';

// Writing N3 — one entry per lesson (index = lesson - 1).
export const writing: LessonCoreTuple[] = [
  ['Paragraf opini', ['Paragraf opini: kalimat topik → alasan → contoh → kalimat penutup.', 'Gunakan gaya である untuk tulisan formal.'], [
    ['私は、大学の授業はオンラインと対面を組み合わせるべきだと考える。', 'Watashi wa, daigaku no jugyou wa onrain to taimen o kumiawaseru beki da to kangaeru.', 'Saya berpendapat kuliah sebaiknya memadukan daring dan tatap muka.'],
    ['オンラインは場所を選ばず、復習もしやすい。', 'Onrain wa basho o erabazu, fukushuu mo shiyasui.', 'Daring tidak terikat tempat dan memudahkan mengulang.'],
    ['一方、議論や実験は対面のほうが効果的である。', 'Ippou, giron ya jikken wa taimen no hou ga koukateki de aru.', 'Sementara itu, diskusi dan eksperimen lebih efektif tatap muka.'],
    ['両方の長所を生かすことが、学びの質を高めるだろう。', 'Ryouhou no chousho o ikasu koto ga, manabi no shitsu o takameru darou.', 'Memanfaatkan kelebihan keduanya akan meningkatkan kualitas belajar.'],
  ]],
  ['Email formal', ['Email formal: nama penerima → perkenalan → maksud → detail → penutup.', 'Ungkapan tetap: 突然のご連絡失礼いたします, 何卒よろしくお願い申し上げます.'], [
    ['突然のご連絡失礼いたします。', 'Totsuzen no gorenraku shitsurei itashimasu.', 'Mohon maaf menghubungi secara tiba-tiba.'],
    ['私、インドネシア大学のアディと申します。', 'Watakushi, Indoneshia daigaku no Adi to moushimasu.', 'Saya Adi dari Universitas Indonesia.'],
    ['貴研究室の研究内容について、お伺いしたくご連絡いたしました。', 'Ki kenkyuushitsu no kenkyuu naiyou ni tsuite, oukagai shitaku gorenraku itashimashita.', 'Saya menghubungi karena ingin menanyakan isi penelitian di laboratorium Anda.'],
    ['何卒よろしくお願い申し上げます。', 'Nanitozo yoroshiku onegai moushiagemasu.', 'Atas perhatiannya, saya ucapkan terima kasih sebesar-besarnya.'],
  ]],
  ['Email keluhan', ['Keluhan tertulis: fakta → dampak → permintaan; tanpa emosi berlebihan.', 'Akhiri dengan permintaan tanggapan: ご回答いただけますと幸いです.'], [
    ['八月三日に注文した商品が、まだ届いておりません。', 'Hachigatsu mikka ni chuumon shita shouhin ga, mada todoite orimasen.', 'Barang yang saya pesan tanggal 3 Agustus belum juga tiba.'],
    ['お届け予定日を一週間過ぎております。', 'Otodoke yoteibi o isshuukan sugite orimasu.', 'Sudah lewat seminggu dari tanggal pengiriman yang dijadwalkan.'],
    ['配送状況をご確認いただけますでしょうか。', 'Haisou joukyou o gokakunin itadakemasu deshou ka.', 'Bisakah Anda memeriksa status pengirimannya?'],
    ['ご回答いただけますと幸いです。', 'Gokaitou itadakemasu to saiwai desu.', 'Saya akan senang bila mendapat tanggapan.'],
  ]],
  ['Menulis ringkasan', ['Ringkasan: ambil ide pokok tiap paragraf, buang contoh dan detail.', 'Pakai kata kerja ringkas: 述べている, 指摘している, 主張している.'], [
    ['筆者は、睡眠不足が学習効果を下げると述べている。', 'Hissha wa, suimin busoku ga gakushuu kouka o sageru to nobete iru.', 'Penulis menyatakan bahwa kurang tidur menurunkan efek belajar.'],
    ['その理由として、記憶の整理が寝ている間に行われることを挙げている。', 'Sono riyuu to shite, kioku no seiri ga nete iru aida ni okonawareru koto o agete iru.', 'Sebagai alasannya, ia menyebut bahwa penataan ingatan terjadi saat tidur.'],
    ['さらに、徹夜での勉強は逆効果だと指摘している。', 'Sara ni, tetsuya de no benkyou wa gyakukouka da to shiteki shite iru.', 'Lebih lanjut, ia menunjukkan bahwa belajar semalam suntuk justru kontraproduktif.'],
    ['つまり、十分に眠ることも勉強の一部だという主張である。', 'Tsumari, juubun ni nemuru koto mo benkyou no ichibu da to iu shuchou de aru.', 'Singkatnya, tidur cukup juga bagian dari belajar.'],
  ]],
  ['Menulis rekomendasi', ['Rekomendasi tertulis: untuk siapa → apa → alasan → catatan.', 'Ungkapan: 〜に特におすすめしたい, 〜点も魅力である.'], [
    ['日本語を勉強している人に、特におすすめしたいのがこのドラマだ。', 'Nihongo o benkyou shite iru hito ni, toku ni osusume shitai no ga kono dorama da.', 'Drama inilah yang terutama ingin saya rekomendasikan kepada pembelajar bahasa Jepang.'],
    ['日常会話が多く、自然な表現が学べる。', 'Nichijou kaiwa ga ooku, shizen na hyougen ga manaberu.', 'Banyak percakapan sehari-hari, jadi bisa belajar ungkapan alami.'],
    ['一話が三十分と短い点も魅力である。', 'Ichiwa ga sanjuppun to mijikai ten mo miryoku de aru.', 'Durasi tiap episode yang pendek, tiga puluh menit, juga menarik.'],
    ['字幕なしで見るのは、最初は難しいかもしれない。', 'Jimaku nashi de miru no wa, saisho wa muzukashii kamo shirenai.', 'Menonton tanpa subtitle mungkin sulit pada awalnya.'],
  ]],
  ['Menjelaskan proses', ['Proses tertulis: langkah berurutan + alasan tiap langkah.', 'Penanda: まず, 次に, その際, 最後に.'], [
    ['まず、ゴミを燃えるゴミと燃えないゴミに分ける。', 'Mazu, gomi o moeru gomi to moenai gomi ni wakeru.', 'Pertama, pisahkan sampah menjadi sampah bakar dan tidak bakar.'],
    ['次に、ペットボトルはラベルを外して洗う。', 'Tsugi ni, petto botoru wa raberu o hazushite arau.', 'Selanjutnya, lepaskan label botol plastik lalu cuci.'],
    ['その際、キャップは別の袋に入れる。', 'Sono sai, kyappu wa betsu no fukuro ni ireru.', 'Saat itu, masukkan tutupnya ke kantong terpisah.'],
    ['最後に、決められた曜日の朝八時までに出す。', 'Saigo ni, kimerareta youbi no asa hachiji made ni dasu.', 'Terakhir, buang pada hari yang ditentukan sebelum jam delapan pagi.'],
  ]],
  ['Esai perbandingan', ['Esai perbandingan: kriteria yang sama untuk dua hal.', 'Struktur: A (kelebihan/kekurangan) → B (kelebihan/kekurangan) → kesimpulan.'], [
    ['一人暮らしと実家暮らしには、それぞれ長所がある。', 'Hitorigurashi to jikkagurashi ni wa, sorezore chousho ga aru.', 'Tinggal sendiri dan tinggal di rumah orang tua masing-masing punya kelebihan.'],
    ['一人暮らしは自由だが、生活費がかかる。', 'Hitorigurashi wa jiyuu da ga, seikatsuhi ga kakaru.', 'Tinggal sendiri bebas, tetapi biaya hidupnya besar.'],
    ['実家暮らしはお金がたまりやすいが、自立しにくい面もある。', 'Jikkagurashi wa okane ga tamariyasui ga, jiritsu shinikui men mo aru.', 'Tinggal dengan orang tua memudahkan menabung, tetapi ada sisi sulit untuk mandiri.'],
    ['大切なのは、自分の目的に合った選択をすることだ。', 'Taisetsu na no wa, jibun no mokuteki ni atta sentaku o suru koto da.', 'Yang penting adalah membuat pilihan sesuai tujuan diri sendiri.'],
  ]],
  ['Refleksi pengalaman', ['Refleksi: kejadian → apa yang dirasakan → apa yang dipelajari → rencana.', 'Ungkapan: 〜を通して, 〜ことに気づいた.'], [
    ['ボランティア活動を通して、多くのことを学んだ。', 'Borantia katsudou o tooshite, ooku no koto o mananda.', 'Melalui kegiatan relawan, saya belajar banyak hal.'],
    ['最初は、自分が役に立てるか不安だった。', 'Saisho wa, jibun ga yaku ni tateru ka fuan datta.', 'Awalnya saya cemas apakah saya bisa berguna.'],
    ['しかし、話を聞くだけでも人を支えられることに気づいた。', 'Shikashi, hanashi o kiku dake demo hito o sasaerareru koto ni kizuita.', 'Namun, saya sadar bahwa hanya dengan mendengarkan pun kita bisa mendukung orang lain.'],
    ['これからも、できることから続けていきたい。', 'Korekara mo, dekiru koto kara tsuzukete ikitai.', 'Ke depannya pun saya ingin terus melakukan apa yang bisa saya lakukan.'],
  ]],
  ['Ringkasan berita', ['Ringkasan berita: 5W1H dalam 3–4 kalimat.', 'Hindari opini pribadi dalam ringkasan berita.'], [
    ['十日、北海道で震度五弱の地震があった。', 'Tooka, Hokkaidou de shindo go jaku no jishin ga atta.', 'Tanggal 10, terjadi gempa berkekuatan intensitas 5-lemah di Hokkaido.'],
    ['けが人は三人で、いずれも軽傷だという。', 'Keganin wa sannin de, izuremo keishou da to iu.', 'Korban luka tiga orang, semuanya luka ringan.'],
    ['一部の地域で停電が発生した。', 'Ichibu no chiiki de teiden ga hassei shita.', 'Terjadi pemadaman listrik di sebagian wilayah.'],
    ['気象庁は、一週間程度は余震に注意するよう呼びかけている。', 'Kishouchou wa, isshuukan teido wa yoshin ni chuui suru you yobikakete iru.', 'Badan Meteorologi mengimbau waspada gempa susulan sekitar seminggu.'],
  ]],
  ['Catatan usulan', ['Usulan: latar → usulan → manfaat → biaya/kendala.', 'Ungkapan: 〜を提案します, 〜が期待できます.'], [
    ['社内の紙の使用量が増えている。', 'Shanai no kami no shiyouryou ga fuete iru.', 'Pemakaian kertas di kantor meningkat.'],
    ['そこで、会議資料の電子化を提案します。', 'Soko de, kaigi shiryou no denshika o teian shimasu.', 'Karena itu, saya mengusulkan digitalisasi materi rapat.'],
    ['年間で約二十万円の経費削減が期待できます。', 'Nenkan de yaku nijuuman en no keihi sakugen ga kitai dekimasu.', 'Diharapkan penghematan biaya sekitar dua ratus ribu yen per tahun.'],
    ['ただし、タブレットの購入費用が必要です。', 'Tadashi, taburetto no kounyuu hiyou ga hitsuyou desu.', 'Namun, diperlukan biaya pembelian tablet.'],
  ]],
  ['Menjawab pertanyaan wawancara', ['Jawaban tertulis wawancara: kesimpulan dulu, lalu pengalaman pendukung.', 'Gunakan 〜経験を生かして untuk menghubungkan pengalaman dan pekerjaan.'], [
    ['私の強みは、チームをまとめる力です。', 'Watashi no tsuyomi wa, chiimu o matomeru chikara desu.', 'Kekuatan saya adalah kemampuan menyatukan tim.'],
    ['大学のサークルで部長を務めました。', 'Daigaku no saakuru de buchou o tsutomemashita.', 'Saya pernah menjadi ketua klub di universitas.'],
    ['意見が対立したときは、全員の話を聞くようにしていました。', 'Iken ga tairitsu shita toki wa, zen-in no hanashi o kiku you ni shite imashita.', 'Saat pendapat bertentangan, saya selalu mendengarkan semua orang.'],
    ['この経験を生かして、御社でも貢献したいと考えています。', 'Kono keiken o ikashite, onsha demo kouken shitai to kangaete imasu.', 'Dengan memanfaatkan pengalaman ini, saya ingin berkontribusi di perusahaan Anda.'],
  ]],
  ['Paragraf budaya', ['Jelaskan budaya untuk pembaca asing: definisi → praktik → makna.', 'Bandingkan dengan budaya sendiri di akhir paragraf.'], [
    ['インドネシアには「ゴトン・ロヨン」という考え方がある。', 'Indoneshia ni wa "goton royon" to iu kangaekata ga aru.', 'Di Indonesia ada cara pandang yang disebut "gotong royong".'],
    ['地域の人々が協力して、道の掃除や家の修理をするのだ。', 'Chiiki no hitobito ga kyouryoku shite, michi no souji ya ie no shuuri o suru no da.', 'Warga setempat bekerja sama membersihkan jalan atau memperbaiki rumah.'],
    ['お金ではなく、助け合いの気持ちで成り立っている。', 'Okane de wa naku, tasukeai no kimochi de naritatte iru.', 'Ini berdiri bukan atas uang, melainkan semangat saling membantu.'],
    ['日本の町内会の活動と似ている点も多い。', 'Nihon no chounaikai no katsudou to nite iru ten mo ooi.', 'Banyak kemiripan dengan kegiatan rukun warga di Jepang.'],
  ]],
  ['Kerangka argumen', ['Kerangka: 主張 (klaim) → 根拠 (dasar) → 反論 (sanggahan) → 再反論 (tanggapan).', 'Tulis kerangka dalam poin sebelum menulis esai.'], [
    ['主張：公共の場所での喫煙は全面的に禁止すべきだ。', 'Shuchou: koukyou no basho de no kitsuen wa zenmenteki ni kinshi subeki da.', 'Klaim: merokok di tempat umum harus dilarang sepenuhnya.'],
    ['根拠：受動喫煙は周りの人の健康を害する。', 'Konkyo: judou kitsuen wa mawari no hito no kenkou o gai suru.', 'Dasar: perokok pasif merugikan kesehatan orang di sekitar.'],
    ['反論：喫煙者の権利も守るべきだという意見がある。', 'Hanron: kitsuensha no kenri mo mamoru beki da to iu iken ga aru.', 'Sanggahan: ada pendapat bahwa hak perokok juga harus dilindungi.'],
    ['再反論：喫煙専用の場所を設ければ、両立は可能である。', 'Saihanron: kitsuen sen-you no basho o moukereba, ryouritsu wa kanou de aru.', 'Tanggapan: dengan menyediakan tempat khusus merokok, keduanya bisa berjalan bersama.'],
  ]],
  ['Alasan dan bukti', ['Setiap alasan butuh bukti: data, contoh, atau pengalaman.', 'Penanda bukti: 実際に, 調査によれば, 例えば.'], [
    ['読書は語彙を増やすのに役立つ。', 'Dokusho wa goi o fuyasu no ni yakudatsu.', 'Membaca berguna untuk menambah kosakata.'],
    ['実際に、本をよく読む子どもは語彙テストの点数が高い。', 'Jissai ni, hon o yoku yomu kodomo wa goi tesuto no tensuu ga takai.', 'Kenyataannya, anak yang sering membaca punya nilai tes kosakata lebih tinggi.'],
    ['ある調査によれば、その差は約二割だという。', 'Aru chousa ni yoreba, sono sa wa yaku niwari da to iu.', 'Menurut sebuah survei, selisihnya sekitar dua puluh persen.'],
    ['私自身も、小説を通して多くの表現を覚えた。', 'Watashi jishin mo, shousetsu o tooshite ooku no hyougen o oboeta.', 'Saya sendiri juga mempelajari banyak ungkapan melalui novel.'],
  ]],
  ['Latihan kata transisi', ['Transisi menambah: さらに, また; kontras: しかし, 一方; akibat: そのため, したがって.', 'Jangan mengulang konektor yang sama berturut-turut.'], [
    ['この町は交通の便がよい。さらに、物価も安い。', 'Kono machi wa koutsuu no ben ga yoi. Sara ni, bukka mo yasui.', 'Kota ini aksesnya bagus. Lebih lagi, harga-harganya murah.'],
    ['しかし、仕事の数は多くない。', 'Shikashi, shigoto no kazu wa ookunai.', 'Namun, lapangan kerjanya tidak banyak.'],
    ['そのため、若者は都市へ出ていく傾向がある。', 'Sono tame, wakamono wa toshi e dete iku keikou ga aru.', 'Karena itu, anak muda cenderung pergi ke kota.'],
    ['したがって、地域の産業を育てることが課題である。', 'Shitagatte, chiiki no sangyou o sodateru koto ga kadai de aru.', 'Dengan demikian, mengembangkan industri lokal menjadi tantangan.'],
  ]],
  ['Menulis dengan kanji N3', ['Gunakan kanji N3 untuk kata formal: 状況, 影響, 判断, 経験, 責任.', 'Periksa kata yang sering salah: 以外/意外, 関心/感心.'], [
    ['状況を判断して、行動することが大切だ。', 'Joukyou o handan shite, koudou suru koto ga taisetsu da.', 'Penting untuk menilai situasi lalu bertindak.'],
    ['天候の影響で、出荷が遅れている。', 'Tenkou no eikyou de, shukka ga okurete iru.', 'Karena pengaruh cuaca, pengiriman barang terlambat.'],
    ['リーダーとしての責任を感じている。', 'Riidaa to shite no sekinin o kanjite iru.', 'Saya merasakan tanggung jawab sebagai pemimpin.'],
    ['意外な結果に、関係者は驚いた。', 'Igai na kekka ni, kankeisha wa odoroita.', 'Pihak terkait terkejut dengan hasil yang tak terduga.'],
  ]],
  ['Menyunting agar jelas', ['Kalimat terlalu panjang dipecah menjadi dua.', 'Hapus kata ganda dan perjelas subjek.'], [
    ['会議は長かった。結論は出なかった。', 'Kaigi wa nagakatta. Ketsuron wa denakatta.', 'Rapatnya panjang. Kesimpulan tidak tercapai.'],
    ['担当者は田中さんです。質問は田中さんにお願いします。', 'Tantousha wa Tanaka san desu. Shitsumon wa Tanaka san ni onegai shimasu.', 'Penanggung jawabnya Tanaka. Pertanyaan silakan kepada Tanaka.'],
    ['この方法は、時間も費用も節約できる。', 'Kono houhou wa, jikan mo hiyou mo setsuyaku dekiru.', 'Metode ini menghemat waktu dan biaya.'],
    ['結果は来週、メールで連絡します。', 'Kekka wa raishuu, meeru de renraku shimasu.', 'Hasilnya akan dikabarkan lewat email minggu depan.'],
  ]],
  ['Register sopan', ['Ubah gaya biasa menjadi sopan: 言う → 申す/おっしゃる, する → いたす/なさる.', 'Konsisten satu register dalam satu tulisan.'], [
    ['先日はお時間をいただき、ありがとうございました。', 'Senjitsu wa ojikan o itadaki, arigatou gozaimashita.', 'Terima kasih telah meluangkan waktu beberapa hari lalu.'],
    ['ご提案いただいた件、社内で検討いたします。', 'Goteian itadaita ken, shanai de kentou itashimasu.', 'Usulan yang Anda berikan akan kami pertimbangkan di internal.'],
    ['ご不明な点がございましたら、お気軽にお問い合わせください。', 'Gofumei na ten ga gozaimashitara, okigaru ni otoiawase kudasai.', 'Jika ada yang kurang jelas, jangan ragu untuk bertanya.'],
    ['今後ともよろしくお願い申し上げます。', 'Kongo tomo yoroshiku onegai moushiagemasu.', 'Mohon kerja samanya ke depan.'],
  ]],
  ['Esai mini 250 karakter', ['Esai 250 karakter: 1 klaim, 2 alasan, 1 kesimpulan.', 'Hitung karakter; tanda baca juga dihitung.'], [
    ['私は、子どもにお小遣いを与えるべきだと考える。', 'Watashi wa, kodomo ni okozukai o ataeru beki da to kangaeru.', 'Saya berpendapat anak sebaiknya diberi uang saku.'],
    ['第一に、お金の大切さを実感できるからだ。', 'Daiichi ni, okane no taisetsusa o jikkan dekiru kara da.', 'Pertama, karena anak bisa merasakan langsung pentingnya uang.'],
    ['第二に、計画的に使う習慣が身につくからだ。', 'Daini ni, keikakuteki ni tsukau shuukan ga mi ni tsuku kara da.', 'Kedua, karena terbentuk kebiasaan memakai uang secara terencana.'],
    ['以上の理由から、お小遣いは教育の一つだと言える。', 'Ijou no riyuu kara, okozukai wa kyouiku no hitotsu da to ieru.', 'Dari alasan di atas, uang saku bisa dikatakan bagian dari pendidikan.'],
  ]],
  ['Ulasan writing N3', ['Periksa: struktur paragraf, konektor, register, dan kanji N3.', 'Baca tulisan dari sudut pandang pembaca.'], [
    ['日本語で論理的な文章を書く力がついてきた。', 'Nihongo de ronriteki na bunshou o kaku chikara ga tsuite kita.', 'Kemampuan menulis tulisan logis dalam bahasa Jepang mulai terbentuk.'],
    ['以前は、話し言葉と書き言葉が混ざっていた。', 'Izen wa, hanashikotoba to kakikotoba ga mazatte ita.', 'Dulu, ragam lisan dan tulisan saya tercampur.'],
    ['今は、目的に合わせて文体を選べるようになった。', 'Ima wa, mokuteki ni awasete buntai o eraberu you ni natta.', 'Sekarang saya bisa memilih gaya tulisan sesuai tujuan.'],
    ['次は、より説得力のある意見文に挑戦したい。', 'Tsugi wa, yori settokuryoku no aru ikenbun ni chousen shitai.', 'Selanjutnya saya ingin mencoba menulis opini yang lebih meyakinkan.'],
  ]],
];
