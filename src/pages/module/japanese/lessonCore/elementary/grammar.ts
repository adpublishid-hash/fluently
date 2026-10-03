import type { LessonCoreTuple } from '../types';

// Grammar N4 — one entry per lesson (index = lesson - 1).
export const grammar: LessonCoreTuple[] = [
  ['Sistem bentuk て', ['Golongan 1: う/つ/る → って, む/ぶ/ぬ → んで, く → いて, ぐ → いで, す → して.', 'Pengecualian: 行く → 行って; golongan 2: る → て; する → して, 来る → 来て.'], [
    ['駅まで走って、電車に乗りました。', 'Eki made hashitte, densha ni norimashita.', 'Saya berlari sampai stasiun lalu naik kereta.'],
    ['手紙を読んで、泣きました。', 'Tegami o yonde, nakimashita.', 'Saya membaca surat itu lalu menangis.'],
    ['服を脱いで、お風呂に入ります。', 'Fuku o nuide, ofuro ni hairimasu.', 'Saya melepas baju lalu masuk ke bak mandi.'],
    ['友達が来て、一緒に話しました。', 'Tomodachi ga kite, issho ni hanashimashita.', 'Teman datang, lalu kami mengobrol bersama.'],
  ]],
  ['Keadaan berlangsung ている', ['〜ている: aksi sedang berlangsung (食べている) atau keadaan hasil (結婚している).', 'Kata kerja seperti 知る, 住む, 持つ hampir selalu memakai ている.'], [
    ['弟は今、宿題をしています。', 'Otouto wa ima, shukudai o shite imasu.', 'Adik laki-laki sedang mengerjakan PR.'],
    ['姉は結婚しています。', 'Ane wa kekkon shite imasu.', 'Kakak perempuan saya sudah menikah.'],
    ['この人を知っていますか。', 'Kono hito o shitte imasu ka.', 'Apakah kamu kenal orang ini?'],
    ['窓が開いています。', 'Mado ga aite imasu.', 'Jendelanya terbuka.'],
  ]],
  ['Bentuk ない', ['Golongan 1: u → anai (書く → 書かない, 買う → 買わない); golongan 2: る → ない.', 'Pola terkait: 〜ないでください (tolong jangan), 〜なくてもいい (tidak perlu).'], [
    ['今日はお酒を飲まない。', 'Kyou wa osake o nomanai.', 'Hari ini saya tidak minum alkohol.'],
    ['ここに荷物を置かないでください。', 'Koko ni nimotsu o okanaide kudasai.', 'Tolong jangan menaruh barang di sini.'],
    ['明日は来なくてもいいです。', 'Ashita wa konakute mo ii desu.', 'Besok tidak perlu datang.'],
    ['心配しないでください。', 'Shinpai shinaide kudasai.', 'Jangan khawatir.'],
  ]],
  ['Bentuk た', ['Bentuk た dibuat seperti bentuk て, tetapi て/で → た/だ.', 'Dipakai dalam gaya biasa dan pola seperti 〜たり〜たりする.'], [
    ['昨日はどこへ行った？', 'Kinou wa doko e itta?', 'Kemarin pergi ke mana?'],
    ['もう昼ご飯を食べた。', 'Mou hirugohan o tabeta.', 'Saya sudah makan siang.'],
    ['週末は掃除したり、洗濯したりしました。', 'Shuumatsu wa souji shitari, sentaku shitari shimashita.', 'Akhir pekan saya bersih-bersih, mencuci, dan lain-lain.'],
    ['宿題はもう出した？', 'Shukudai wa mou dashita?', 'PR-nya sudah dikumpulkan?'],
  ]],
  ['Pengalaman ことがある', ['Bentuk た + ことがあります = pernah.', 'Negatif: 〜たことがありません = belum pernah.'], [
    ['富士山に登ったことがあります。', 'Fujisan ni nobotta koto ga arimasu.', 'Saya pernah mendaki Gunung Fuji.'],
    ['馬に乗ったことがありますか。', 'Uma ni notta koto ga arimasu ka.', 'Pernahkah kamu naik kuda?'],
    ['一度もありません。', 'Ichido mo arimasen.', 'Belum pernah sekali pun.'],
    ['着物を着たことがありません。', 'Kimono o kita koto ga arimasen.', 'Saya belum pernah memakai kimono.'],
  ]],
  ['Saran ほうがいい', ['Bentuk た + ほうがいい = sebaiknya; bentuk ない + ほうがいい = sebaiknya jangan.', 'Lembutkan saran dengan と思います atau よ.'], [
    ['熱があるなら、休んだほうがいいですよ。', 'Netsu ga aru nara, yasunda hou ga ii desu yo.', 'Kalau demam, sebaiknya istirahat.'],
    ['夜遅く一人で歩かないほうがいいです。', 'Yoru osoku hitori de arukanai hou ga ii desu.', 'Sebaiknya jangan berjalan sendirian larut malam.'],
    ['早めに予約したほうがいいと思います。', 'Hayame ni yoyaku shita hou ga ii to omoimasu.', 'Saya pikir sebaiknya memesan lebih awal.'],
    ['辞書を使ったほうがいいですか。', 'Jisho o tsukatta hou ga ii desu ka.', 'Apakah sebaiknya memakai kamus?'],
  ]],
  ['Pendapat dan dugaan と思う', ['Bentuk biasa + と思う: pendapat; 〜と思っている: pendapat yang dipegang lama.', 'Rencana: bentuk ajakan + と思う (行こうと思う).'], [
    ['来年、留学しようと思っています。', 'Rainen, ryuugaku shiyou to omotte imasu.', 'Tahun depan saya berniat belajar ke luar negeri.'],
    ['この問題は簡単だと思う。', 'Kono mondai wa kantan da to omou.', 'Menurut saya soal ini mudah.'],
    ['田中さんはもう帰ったと思います。', 'Tanaka san wa mou kaetta to omoimasu.', 'Saya pikir Tanaka sudah pulang.'],
    ['あの映画は見ないと思います。', 'Ano eiga wa minai to omoimasu.', 'Saya rasa saya tidak akan menonton film itu.'],
  ]],
  ['Kutipan と言う', ['Kutipan langsung: 「…」と言いました; tidak langsung: bentuk biasa + と言っていました.', '〜という + benda: 「さくら」という店 = toko bernama Sakura.'], [
    ['先生は「明日はテストです」と言いました。', 'Sensei wa "ashita wa tesuto desu" to iimashita.', 'Guru berkata, "Besok ada tes."'],
    ['山田さんは今日休むと言っていました。', 'Yamada san wa kyou yasumu to itte imashita.', 'Yamada bilang hari ini dia libur.'],
    ['「さくら」という喫茶店を知っていますか。', '"Sakura" to iu kissaten o shitte imasu ka.', 'Kamu tahu kafe yang bernama "Sakura"?'],
    ['これは日本語で何と言いますか。', 'Kore wa nihongo de nan to iimasu ka.', 'Ini dalam bahasa Jepang disebut apa?'],
  ]],
  ['Alasan halus ので', ['〜ので memberi alasan objektif dan terdengar lebih sopan daripada から.', 'Kata benda/な: 〜なので (雨なので).'], [
    ['道が混んでいたので、遅れました。', 'Michi ga konde ita node, okuremashita.', 'Karena jalanan macet, saya terlambat.'],
    ['体調が悪いので、早退してもいいですか。', 'Taichou ga warui node, soutai shite mo ii desu ka.', 'Karena kurang sehat, bolehkah saya pulang lebih awal?'],
    ['明日は祝日なので、会社は休みです。', 'Ashita wa shukujitsu na node, kaisha wa yasumi desu.', 'Besok hari libur nasional, jadi kantor libur.'],
    ['静かなので、よく眠れました。', 'Shizuka na node, yoku nemuremashita.', 'Karena tenang, saya bisa tidur nyenyak.'],
  ]],
  ['Kontras kecewa のに', ['〜のに = padahal; mengandung rasa kecewa atau heran.', 'Jangan dipakai untuk kontras netral; untuk itu pakai が/けど.'], [
    ['たくさん勉強したのに、試験に落ちました。', 'Takusan benkyou shita noni, shiken ni ochimashita.', 'Padahal sudah banyak belajar, saya gagal ujian.'],
    ['約束したのに、彼は来ませんでした。', 'Yakusoku shita noni, kare wa kimasen deshita.', 'Padahal sudah berjanji, dia tidak datang.'],
    ['日曜日なのに、仕事をしなければなりません。', 'Nichiyoubi na noni, shigoto o shinakereba narimasen.', 'Padahal hari Minggu, saya harus bekerja.'],
    ['高いのに、全然おいしくない。', 'Takai noni, zenzen oishikunai.', 'Padahal mahal, sama sekali tidak enak.'],
  ]],
  ['Bersamaan ながら', ['Akar ます + ながら = sambil; aksi utama ada di akhir kalimat.', 'Kedua aksi harus dilakukan oleh orang yang sama.'], [
    ['音楽を聞きながら、勉強します。', 'Ongaku o kikinagara, benkyou shimasu.', 'Saya belajar sambil mendengarkan musik.'],
    ['歩きながら電話するのは危ないです。', 'Arukinagara denwa suru no wa abunai desu.', 'Menelepon sambil berjalan itu berbahaya.'],
    ['コーヒーを飲みながら、新聞を読みました。', 'Koohii o nominagara, shinbun o yomimashita.', 'Saya membaca koran sambil minum kopi.'],
    ['働きながら大学に通っています。', 'Hatarakinagara daigaku ni kayotte imasu.', 'Saya kuliah sambil bekerja.'],
  ]],
  ['Sebelum dan sesudah: 前に・後で', ['Kata kerja kamus + 前に = sebelum; bentuk た + 後で = sesudah.', 'Kata benda: 食事の前に, 授業の後で.'], [
    ['寝る前に、歯をみがきます。', 'Neru mae ni, ha o migakimasu.', 'Sebelum tidur saya menyikat gigi.'],
    ['授業の後で、図書館へ行きます。', 'Jugyou no ato de, toshokan e ikimasu.', 'Setelah pelajaran, saya ke perpustakaan.'],
    ['食べた後で、薬を飲んでください。', 'Tabeta ato de, kusuri o nonde kudasai.', 'Minumlah obat setelah makan.'],
    ['日本に来る前に、少し日本語を習いました。', 'Nihon ni kuru mae ni, sukoshi nihongo o naraimashita.', 'Sebelum datang ke Jepang, saya belajar sedikit bahasa Jepang.'],
  ]],
  ['Rencana 予定です', ['Kata kerja kamus / Benda の + 予定です = rencananya (jadwal pasti).', 'Bandingkan つもりです = niat pribadi.'], [
    ['来月、引っ越す予定です。', 'Raigetsu, hikkosu yotei desu.', 'Bulan depan rencananya saya pindah rumah.'],
    ['会議は三時に終わる予定です。', 'Kaigi wa sanji ni owaru yotei desu.', 'Rapat dijadwalkan selesai jam tiga.'],
    ['夏休みはアルバイトをするつもりです。', 'Natsuyasumi wa arubaito o suru tsumori desu.', 'Saya berniat kerja paruh waktu saat libur musim panas.'],
    ['出発は朝八時の予定です。', 'Shuppatsu wa asa hachiji no yotei desu.', 'Keberangkatan dijadwalkan jam delapan pagi.'],
  ]],
  ['Perubahan ようになる', ['Kata kerja kamus/potensial + ようになる = menjadi bisa / mulai terbiasa.', 'Negatif: 〜なくなる = jadi tidak lagi.'], [
    ['日本語が話せるようになりました。', 'Nihongo ga hanaseru you ni narimashita.', 'Saya jadi bisa berbicara bahasa Jepang.'],
    ['毎朝早く起きるようになりました。', 'Maiasa hayaku okiru you ni narimashita.', 'Saya jadi terbiasa bangun pagi setiap hari.'],
    ['子どもが野菜を食べるようになった。', 'Kodomo ga yasai o taberu you ni natta.', 'Anak saya mulai mau makan sayur.'],
    ['最近、テレビを見なくなりました。', 'Saikin, terebi o minaku narimashita.', 'Akhir-akhir ini saya tidak lagi menonton TV.'],
  ]],
  ['Kemungkinan かもしれない', ['Bentuk biasa + かもしれません = mungkin (kepastian sekitar 50%).', 'Kata benda/な langsung: 雨かもしれません.'], [
    ['午後から雪が降るかもしれません。', 'Gogo kara yuki ga furu kamo shiremasen.', 'Mungkin turun salju mulai sore.'],
    ['あの人は先生かもしれません。', 'Ano hito wa sensei kamo shiremasen.', 'Orang itu mungkin guru.'],
    ['電車が遅れるかもしれないから、早く出よう。', 'Densha ga okureru kamo shirenai kara, hayaku deyou.', 'Keretanya mungkin terlambat, jadi ayo berangkat lebih awal.'],
    ['彼女はもう知っているかもしれない。', 'Kanojo wa mou shitte iru kamo shirenai.', 'Dia mungkin sudah tahu.'],
  ]],
  ['Keharusan なければならない', ['Bentuk ない: ない → なければなりません = harus.', 'Lisan santai: 〜なきゃ / 〜ないと.'], [
    ['毎日薬を飲まなければなりません。', 'Mainichi kusuri o nomanakereba narimasen.', 'Saya harus minum obat setiap hari.'],
    ['レポートを金曜日までに出さなければならない。', 'Repooto o kinyoubi made ni dasanakereba naranai.', 'Laporan harus diserahkan paling lambat Jumat.'],
    ['もう帰らなきゃ。', 'Mou kaeranakya.', 'Saya sudah harus pulang.'],
    ['明日は早く起きないと。', 'Ashita wa hayaku okinai to.', 'Besok saya harus bangun pagi.'],
  ]],
  ['Pengantar bentuk pasif', ['Pasif: golongan 1 u → areru (読まれる); golongan 2 る → られる.', 'Pelaku ditandai に: 先生にほめられました.'], [
    ['先生にほめられました。', 'Sensei ni homeraremashita.', 'Saya dipuji oleh guru.'],
    ['犬にかまれました。', 'Inu ni kamaremashita.', 'Saya digigit anjing.'],
    ['電車で足を踏まれました。', 'Densha de ashi o fumaremashita.', 'Kaki saya terinjak di kereta.'],
    ['この寺は六百年前に建てられました。', 'Kono tera wa roppyakunen mae ni tateraremashita.', 'Kuil ini dibangun enam ratus tahun yang lalu.'],
  ]],
  ['Bentuk potensial', ['Golongan 1: u → eru (書ける); golongan 2: る → られる; する → できる, 来る → 来られる.', 'Objek bentuk potensial biasanya memakai が.'], [
    ['刺身が食べられますか。', 'Sashimi ga taberaremasu ka.', 'Bisakah kamu makan sashimi?'],
    ['この漢字が読めません。', 'Kono kanji ga yomemasen.', 'Saya tidak bisa membaca kanji ini.'],
    ['百メートル泳げます。', 'Hyaku meetoru oyogemasu.', 'Saya bisa berenang seratus meter.'],
    ['明日のパーティーには来られません。', 'Ashita no paatii ni wa koraremasen.', 'Saya tidak bisa datang ke pesta besok.'],
  ]],
  ['Pengandaian と dan たら', ['〜と: akibat yang selalu terjadi (alami, mesin, petunjuk arah).', '〜たら: jika/setelah — paling serbaguna, boleh diikuti permintaan dan ajakan.'], [
    ['このボタンを押すと、お湯が出ます。', 'Kono botan o osu to, oyu ga demasu.', 'Kalau tombol ini ditekan, air panas keluar.'],
    ['春になると、桜が咲きます。', 'Haru ni naru to, sakura ga sakimasu.', 'Kalau musim semi tiba, bunga sakura mekar.'],
    ['駅に着いたら、電話してください。', 'Eki ni tsuitara, denwa shite kudasai.', 'Kalau sudah sampai di stasiun, teleponlah saya.'],
    ['宝くじが当たったら、家を買いたい。', 'Takarakuji ga atattara, ie o kaitai.', 'Kalau menang lotre, saya ingin membeli rumah.'],
  ]],
  ['Ulasan grammar N4', ['Gabungkan te-form, ている, ことがある, ほうがいい, かもしれない, dan たら.', 'Periksa pemilihan bentuk biasa vs sopan sesuai lawan bicara.'], [
    ['日本に来てから、自炊するようになりました。', 'Nihon ni kite kara, jisui suru you ni narimashita.', 'Sejak datang ke Jepang, saya jadi memasak sendiri.'],
    ['京都には三回行ったことがあります。', 'Kyouto ni wa sankai itta koto ga arimasu.', 'Saya sudah tiga kali pergi ke Kyoto.'],
    ['雨が降ったら、試合は中止になるかもしれません。', 'Ame ga futtara, shiai wa chuushi ni naru kamo shiremasen.', 'Kalau hujan, pertandingan mungkin dibatalkan.'],
    ['疲れているなら、無理しないほうがいいよ。', 'Tsukarete iru nara, muri shinai hou ga ii yo.', 'Kalau lelah, sebaiknya jangan memaksakan diri.'],
  ]],
];
