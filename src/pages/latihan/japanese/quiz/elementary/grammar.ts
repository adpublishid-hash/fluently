import type { JapaneseQuizTopic } from '../types';

// Latihan Grammar N4 — one entry per topic (index = topic - 1): [Basic, Advanced].
export const grammar: JapaneseQuizTopic[] = [
  // 1. Sistem bentuk て
  [
    [
      ["書いて", "Kaite", "menulis (bentuk te)"],
      ["飲んで", "Nonde", "minum (bentuk te)"],
      ["待って", "Matte", "menunggu (bentuk te)", ["Bentuk て dari 行く adalah...", "行って", "行いて", "行んで", "行きて"]],
      ["して", "Shite", "melakukan (bentuk te)"],
    ],
    [
      ["朝起きて、顔を洗って、朝ご飯を食べます。", "Asa okite, kao o aratte, asagohan o tabemasu.", "Pagi hari saya bangun, mencuci muka, lalu sarapan."],
      ["バスを降りて、五分歩きました。", "Basu o orite, gofun arukimashita.", "Saya turun dari bus lalu berjalan lima menit."],
      ["この部屋は広くて、明るいです。", "Kono heya wa hirokute, akarui desu.", "Kamar ini luas dan terang.", ["Bentuk て dari kata sifat 広い adalah...", "広くて", "広いて", "広って", "広で"]],
      ["彼は親切で、まじめな人です。", "Kare wa shinsetsu de, majime na hito desu.", "Dia orang yang ramah dan serius."],
    ],
  ],
  // 2. Keadaan berlangsung ている
  [
    [
      ["読んでいる", "Yonde iru", "sedang membaca"],
      ["住んでいる", "Sunde iru", "tinggal (menetap)"],
      ["知っている", "Shitte iru", "tahu / kenal"],
      ["閉まっている", "Shimatte iru", "dalam keadaan tertutup", ["Bentuk negatif dari 知っています adalah...", "知りません", "知っていません", "知らないています", "知りていません"]],
    ],
    [
      ["父は今、居間で新聞を読んでいます。", "Chichi wa ima, ima de shinbun o yonde imasu.", "Ayah sedang membaca koran di ruang keluarga."],
      ["私は大阪に住んでいます。", "Watashi wa Oosaka ni sunde imasu.", "Saya tinggal di Osaka."],
      ["店のドアが閉まっています。", "Mise no doa ga shimatte imasu.", "Pintu toko itu tertutup."],
      ["兄は銀行に勤めています。", "Ani wa ginkou ni tsutomete imasu.", "Kakak laki-laki saya bekerja di bank.", ["〜ています pada 勤めています menunjukkan...", "keadaan / kebiasaan yang berlanjut", "rencana", "larangan", "perintah"]],
    ],
  ],
  // 3. Bentuk ない
  [
    [
      ["行かない", "Ikanai", "tidak pergi"],
      ["食べない", "Tabenai", "tidak makan"],
      ["しない", "Shinai", "tidak melakukan"],
      ["来ない", "Konai", "tidak datang", ["Bentuk ない dari 買う adalah...", "買わない", "買あない", "買いない", "買らない"]],
    ],
    [
      ["私は肉を食べない。", "Watashi wa niku o tabenai.", "Saya tidak makan daging."],
      ["授業中は携帯電話を使わないでください。", "Jugyouchuu wa keitai denwa o tsukawanaide kudasai.", "Tolong jangan memakai ponsel saat pelajaran."],
      ["急がなくても大丈夫です。", "Isoganakute mo daijoubu desu.", "Tidak perlu terburu-buru."],
      ["今日は誰も来ないと思います。", "Kyou wa dare mo konai to omoimasu.", "Saya pikir hari ini tidak ada yang datang.", ["Bentuk ない dari 来る adalah...", "来ない (konai)", "来らない", "来ない (kinai)", "来かない"]],
    ],
  ],
  // 4. Bentuk た
  [
    [
      ["行った", "Itta", "sudah pergi"],
      ["見た", "Mita", "sudah melihat"],
      ["書いた", "Kaita", "sudah menulis"],
      ["泳いだ", "Oyoida", "sudah berenang", ["Bentuk た dari 飲む adalah...", "飲んだ", "飲った", "飲いた", "飲みた"]],
    ],
    [
      ["昨日、新しい靴を買った。", "Kinou, atarashii kutsu o katta.", "Kemarin saya membeli sepatu baru."],
      ["もう宿題を全部やった？", "Mou shukudai o zenbu yatta?", "PR-nya sudah dikerjakan semua?"],
      ["休みの日は本を読んだり、映画を見たりします。", "Yasumi no hi wa hon o yondari, eiga o mitari shimasu.", "Di hari libur saya membaca buku, menonton film, dan lain-lain."],
      ["子どものころ、よく川で遊んだ。", "Kodomo no koro, yoku kawa de asonda.", "Waktu kecil saya sering bermain di sungai."],
    ],
  ],
  // 5. Pengalaman ことがある
  [
    [
      ["見たことがある", "Mita koto ga aru", "pernah melihat"],
      ["行ったことがない", "Itta koto ga nai", "belum pernah pergi"],
      ["一回", "Ikkai", "sekali"],
      ["何回も", "Nankai mo", "berkali-kali", ["Bentuk yang benar untuk 'pernah makan' adalah...", "食べたことがある", "食べることがある", "食べてことがある", "食べたのことがある"]],
    ],
    [
      ["私は一回だけ北海道に行ったことがあります。", "Watashi wa ikkai dake Hokkaidou ni itta koto ga arimasu.", "Saya pernah ke Hokkaido sekali saja."],
      ["日本のお祭りを見たことがありますか。", "Nihon no omatsuri o mita koto ga arimasu ka.", "Pernahkah kamu melihat festival Jepang?"],
      ["まだすき焼きを食べたことがありません。", "Mada sukiyaki o tabeta koto ga arimasen.", "Saya belum pernah makan sukiyaki."],
      ["この歌は何回も聞いたことがあります。", "Kono uta wa nankai mo kiita koto ga arimasu.", "Lagu ini sudah sering saya dengar."],
    ],
  ],
  // 6. Saran ほうがいい
  [
    [
      ["休んだほうがいい", "Yasunda hou ga ii", "sebaiknya istirahat"],
      ["行かないほうがいい", "Ikanai hou ga ii", "sebaiknya jangan pergi"],
      ["聞いたほうがいい", "Kiita hou ga ii", "sebaiknya bertanya"],
      ["持っていったほうがいい", "Motte itta hou ga ii", "sebaiknya membawa", ["Saran 'sebaiknya jangan minum' yang benar adalah...", "飲まないほうがいい", "飲んだないほうがいい", "飲まなかったほうがいい", "飲まないのほうがいい"]],
    ],
    [
      ["わからないときは、先生に聞いたほうがいいですよ。", "Wakaranai toki wa, sensei ni kiita hou ga ii desu yo.", "Kalau tidak mengerti, sebaiknya tanya guru."],
      ["雨が降りそうだから、傘を持っていったほうがいい。", "Ame ga furisou da kara, kasa o motte itta hou ga ii.", "Sepertinya akan hujan, jadi sebaiknya bawa payung."],
      ["甘いものはあまり食べないほうがいいです。", "Amai mono wa amari tabenai hou ga ii desu.", "Sebaiknya jangan terlalu banyak makan makanan manis."],
      ["もっと野菜を食べたほうがいいと思います。", "Motto yasai o tabeta hou ga ii to omoimasu.", "Menurut saya sebaiknya makan lebih banyak sayur."],
    ],
  ],
  // 7. Pendapat dan dugaan と思う
  [
    [
      ["いいと思う", "Ii to omou", "menurut saya bagus"],
      ["降ると思う", "Furu to omou", "menurut saya akan turun (hujan)"],
      ["行こうと思う", "Ikou to omou", "berniat pergi"],
      ["静かだと思う", "Shizuka da to omou", "menurut saya tenang", ["Untuk menyatakan niat 'saya berniat belajar', yang benar adalah...", "勉強しようと思います", "勉強すると思います", "勉強したと思います", "勉強しますと思います"]],
    ],
    [
      ["週末は家でゆっくりしようと思います。", "Shuumatsu wa ie de yukkuri shiyou to omoimasu.", "Akhir pekan saya berniat bersantai di rumah."],
      ["この計画は少し難しいと思う。", "Kono keikaku wa sukoshi muzukashii to omou.", "Menurut saya rencana ini agak sulit."],
      ["彼はたぶん来ないと思います。", "Kare wa tabun konai to omoimasu.", "Saya pikir dia mungkin tidak datang."],
      ["将来、通訳になりたいと思っています。", "Shourai, tsuuyaku ni naritai to omotte imasu.", "Saya bercita-cita menjadi penerjemah lisan di masa depan."],
    ],
  ],
  // 8. Kutipan と言う
  [
    [
      ["と言いました", "To iimashita", "berkata bahwa…"],
      ["と言っていました", "To itte imashita", "dia bilang bahwa…"],
      ["という", "To iu", "yang bernama…"],
      ["何と言いますか", "Nan to iimasu ka", "disebut apa?", ["Kutipan tidak langsung memakai bentuk...", "biasa (plain form)", "ます", "perintah", "て saja"]],
    ],
    [
      ["母は「早く寝なさい」と言いました。", "Haha wa \"hayaku nenasai\" to iimashita.", "Ibu berkata, \"Cepat tidur.\""],
      ["田中さんは来週引っ越すと言っていました。", "Tanaka san wa raishuu hikkosu to itte imashita.", "Tanaka bilang dia akan pindah minggu depan."],
      ["「ひまわり」という花を知っていますか。", "\"Himawari\" to iu hana o shitte imasu ka.", "Kamu tahu bunga yang bernama 'himawari'?"],
      ["天気予報で明日は晴れると言っていました。", "Tenki yohou de ashita wa hareru to itte imashita.", "Di prakiraan cuaca dikatakan besok cerah."],
    ],
  ],
  // 9. Alasan halus ので
  [
    [
      ["雨なので", "Ame na node", "karena hujan"],
      ["忙しいので", "Isogashii node", "karena sibuk"],
      ["遅れたので", "Okureta node", "karena terlambat"],
      ["静かなので", "Shizuka na node", "karena tenang", ["Kata benda sebelum ので memakai...", "な (雨なので)", "だ (雨だので)", "の (雨ので)", "を (雨をので)"]],
    ],
    [
      ["頭が痛いので、今日は早く帰ります。", "Atama ga itai node, kyou wa hayaku kaerimasu.", "Karena kepala saya sakit, hari ini saya pulang lebih awal."],
      ["電車が止まったので、タクシーで来ました。", "Densha ga tomatta node, takushii de kimashita.", "Karena keretanya berhenti, saya datang naik taksi."],
      ["ここは病院なので、静かにしてください。", "Koko wa byouin na node, shizuka ni shite kudasai.", "Karena ini rumah sakit, harap tenang."],
      ["荷物が重いので、手伝ってもらえますか。", "Nimotsu ga omoi node, tetsudatte moraemasu ka.", "Karena barangnya berat, bisakah kamu membantu?"],
    ],
  ],
  // 10. Kontras kecewa のに
  [
    [
      ["約束したのに", "Yakusoku shita noni", "padahal sudah berjanji"],
      ["休みなのに", "Yasumi na noni", "padahal hari libur"],
      ["安いのに", "Yasui noni", "padahal murah"],
      ["練習したのに", "Renshuu shita noni", "padahal sudah berlatih", ["のに mengandung nuansa...", "kecewa atau heran", "senang", "permintaan", "saran"]],
    ],
    [
      ["一生懸命練習したのに、試合に負けました。", "Isshoukenmei renshuu shita noni, shiai ni makemashita.", "Padahal sudah berlatih keras, saya kalah dalam pertandingan."],
      ["春なのに、まだ寒いです。", "Haru na noni, mada samui desu.", "Padahal sudah musim semi, masih dingin."],
      ["この店は安いのに、とてもおいしいです。", "Kono mise wa yasui noni, totemo oishii desu.", "Toko ini murah, tapi (mengejutkan) sangat enak."],
      ["電話したのに、誰も出ませんでした。", "Denwa shita noni, dare mo demasen deshita.", "Padahal sudah menelepon, tidak ada yang mengangkat."],
    ],
  ],
  // 11. Bersamaan ながら
  [
    [
      ["歌いながら", "Utainagara", "sambil bernyanyi"],
      ["食べながら", "Tabenagara", "sambil makan"],
      ["見ながら", "Minagara", "sambil melihat"],
      ["考えながら", "Kangaenagara", "sambil berpikir", ["Bentuk ながら dari 聞く adalah...", "聞きながら", "聞くながら", "聞いてながら", "聞いながら"]],
    ],
    [
      ["テレビを見ながら晩ご飯を食べます。", "Terebi o minagara bangohan o tabemasu.", "Saya makan malam sambil menonton TV."],
      ["地図を見ながら、ホテルを探しました。", "Chizu o minagara, hoteru o sagashimashita.", "Saya mencari hotel sambil melihat peta."],
      ["歌を歌いながら、料理をしています。", "Uta o utainagara, ryouri o shite imasu.", "Saya memasak sambil bernyanyi."],
      ["学生たちはノートを取りながら話を聞いていた。", "Gakuseitachi wa nooto o torinagara hanashi o kiite ita.", "Para siswa mendengarkan sambil mencatat."],
    ],
  ],
  // 12. Sebelum dan sesudah: 前に・後で
  [
    [
      ["寝る前に", "Neru mae ni", "sebelum tidur"],
      ["食事の前に", "Shokuji no mae ni", "sebelum makan"],
      ["終わった後で", "Owatta ato de", "setelah selesai"],
      ["仕事の後で", "Shigoto no ato de", "setelah kerja", ["Kata kerja sebelum 前に memakai bentuk...", "kamus (寝る前に)", "た (寝た前に)", "て (寝て前に)", "ます (寝ます前に)"]],
    ],
    [
      ["出かける前に、窓を閉めてください。", "Dekakeru mae ni, mado o shimete kudasai.", "Sebelum keluar, tutup jendela."],
      ["仕事の後で、同僚と食事に行きました。", "Shigoto no ato de, douryou to shokuji ni ikimashita.", "Setelah kerja, saya makan bersama rekan kerja."],
      ["試験が終わった後で、ゆっくり休みたいです。", "Shiken ga owatta ato de, yukkuri yasumitai desu.", "Setelah ujian selesai, saya ingin istirahat dengan santai."],
      ["使う前に、説明書をよく読んでください。", "Tsukau mae ni, setsumeisho o yoku yonde kudasai.", "Sebelum dipakai, bacalah petunjuknya baik-baik."],
    ],
  ],
  // 13. Rencana 予定です
  [
    [
      ["行く予定", "Iku yotei", "rencana pergi"],
      ["会議の予定", "Kaigi no yotei", "jadwal rapat"],
      ["帰るつもり", "Kaeru tsumori", "berniat pulang"],
      ["結婚する予定", "Kekkon suru yotei", "rencana menikah", ["Beda 予定 dan つもり: 予定 untuk...", "jadwal yang sudah pasti", "niat pribadi yang belum pasti", "kebiasaan", "larangan"]],
    ],
    [
      ["来年の春に結婚する予定です。", "Rainen no haru ni kekkon suru yotei desu.", "Musim semi tahun depan rencananya kami menikah."],
      ["飛行機は七時に到着する予定です。", "Hikouki wa shichiji ni touchaku suru yotei desu.", "Pesawat dijadwalkan tiba pukul tujuh."],
      ["卒業したら、国へ帰るつもりです。", "Sotsugyou shitara, kuni e kaeru tsumori desu.", "Setelah lulus, saya berniat pulang ke negara asal."],
      ["今週の土曜日は何も予定がありません。", "Konshuu no doyoubi wa nani mo yotei ga arimasen.", "Sabtu minggu ini tidak ada rencana apa pun."],
    ],
  ],
  // 14. Perubahan ようになる
  [
    [
      ["読めるようになる", "Yomeru you ni naru", "menjadi bisa membaca"],
      ["泳げるようになった", "Oyogeru you ni natta", "sudah bisa berenang"],
      ["食べなくなる", "Tabenaku naru", "tidak lagi makan"],
      ["話すようになる", "Hanasu you ni naru", "mulai berbicara", ["Untuk 'menjadi bisa menulis kanji', yang benar adalah...", "漢字が書けるようになる", "漢字が書くようになる", "漢字を書けるになる", "漢字が書けるようにする"]],
    ],
    [
      ["練習して、自転車に乗れるようになりました。", "Renshuu shite, jitensha ni noreru you ni narimashita.", "Setelah berlatih, saya jadi bisa naik sepeda."],
      ["日本に来てから、納豆が食べられるようになりました。", "Nihon ni kite kara, nattou ga taberareru you ni narimashita.", "Sejak datang ke Jepang, saya jadi bisa makan natto."],
      ["弟は最近よく勉強するようになりました。", "Otouto wa saikin yoku benkyou suru you ni narimashita.", "Adik saya akhir-akhir ini mulai rajin belajar."],
      ["スマホを買ってから、本を読まなくなりました。", "Sumaho o katte kara, hon o yomanaku narimashita.", "Sejak membeli ponsel pintar, saya tidak lagi membaca buku."],
    ],
  ],
  // 15. Kemungkinan かもしれない
  [
    [
      ["雨かもしれない", "Ame kamoshirenai", "mungkin hujan"],
      ["遅れるかもしれない", "Okureru kamoshirenai", "mungkin terlambat"],
      ["本当かもしれない", "Hontou kamoshirenai", "mungkin benar"],
      ["忘れたかもしれない", "Wasureta kamoshirenai", "mungkin lupa", ["かもしれない menunjukkan kepastian sekitar...", "50% (mungkin)", "100% (pasti)", "0% (tidak mungkin)", "90% (hampir pasti)"]],
    ],
    [
      ["明日は台風が来るかもしれません。", "Ashita wa taifuu ga kuru kamoshiremasen.", "Besok mungkin topan datang."],
      ["かぎを家に忘れたかもしれない。", "Kagi o ie ni wasureta kamoshirenai.", "Mungkin kuncinya tertinggal di rumah."],
      ["その話は本当かもしれません。", "Sono hanashi wa hontou kamoshiremasen.", "Cerita itu mungkin benar."],
      ["道が混んでいるので、少し遅れるかもしれません。", "Michi ga konde iru node, sukoshi okureru kamoshiremasen.", "Karena jalanan macet, saya mungkin sedikit terlambat."],
    ],
  ],
  // 16. Keharusan なければならない
  [
    [
      ["行かなければならない", "Ikanakereba naranai", "harus pergi"],
      ["書かなければならない", "Kakanakereba naranai", "harus menulis"],
      ["しなくてはいけない", "Shinakute wa ikenai", "harus melakukan"],
      ["帰らなきゃ", "Kaeranakya", "harus pulang (lisan)", ["Bentuk keharusan dari 食べる adalah...", "食べなければならない", "食べらなければならない", "食べないければならない", "食べなかればならない"]],
    ],
    [
      ["明日までにレポートを書かなければなりません。", "Ashita made ni repooto o kakanakereba narimasen.", "Saya harus menulis laporan paling lambat besok."],
      ["病院では静かにしなくてはいけません。", "Byouin de wa shizuka ni shinakute wa ikemasen.", "Di rumah sakit harus tenang."],
      ["もう遅いから、帰らなきゃ。", "Mou osoi kara, kaeranakya.", "Sudah larut, saya harus pulang."],
      ["パスポートを更新しなければならない。", "Pasupooto o koushin shinakereba naranai.", "Saya harus memperbarui paspor."],
    ],
  ],
  // 17. Pengantar bentuk pasif
  [
    [
      ["しかられる", "Shikarareru", "dimarahi"],
      ["呼ばれる", "Yobareru", "dipanggil"],
      ["盗まれる", "Nusumareru", "dicuri"],
      ["作られる", "Tsukurareru", "dibuat", ["Bentuk pasif dari 読む adalah...", "読まれる", "読められる", "読むられる", "読みれる"]],
    ],
    [
      ["宿題を忘れて、先生にしかられました。", "Shukudai o wasurete, sensei ni shikararemashita.", "Saya lupa PR dan dimarahi guru."],
      ["電車の中で財布を盗まれました。", "Densha no naka de saifu o nusumaremashita.", "Dompet saya dicuri di kereta."],
      ["このお菓子は北海道で作られています。", "Kono okashi wa Hokkaidou de tsukurarete imasu.", "Kue ini dibuat di Hokkaido."],
      ["友達にパーティーに招待されました。", "Tomodachi ni paatii ni shoutai saremashita.", "Saya diundang ke pesta oleh teman.", ["Pelaku dalam kalimat pasif ditandai dengan partikel...", "に", "を", "で", "が"]],
    ],
  ],
  // 18. Bentuk potensial
  [
    [
      ["話せる", "Hanaseru", "bisa berbicara"],
      ["見られる", "Mirareru", "bisa melihat"],
      ["できる", "Dekiru", "bisa melakukan"],
      ["来られる", "Korareru", "bisa datang", ["Bentuk potensial dari 書く adalah...", "書ける", "書かれる", "書きられる", "書くれる"]],
    ],
    [
      ["私は少し中国語が話せます。", "Watashi wa sukoshi Chuugokugo ga hanasemasu.", "Saya bisa sedikit berbahasa Mandarin."],
      ["ここから富士山が見られます。", "Koko kara Fujisan ga miraremasu.", "Dari sini Gunung Fuji bisa terlihat."],
      ["辛い料理はあまり食べられません。", "Karai ryouri wa amari taberaremasen.", "Saya kurang bisa makan masakan pedas."],
      ["明日の会議に来られますか。", "Ashita no kaigi ni koraremasu ka.", "Bisakah kamu datang ke rapat besok?"],
    ],
  ],
  // 19. Pengandaian と dan たら
  [
    [
      ["押すと", "Osu to", "kalau ditekan"],
      ["右に曲がると", "Migi ni magaru to", "kalau belok kanan"],
      ["着いたら", "Tsuitara", "kalau sudah sampai"],
      ["暇だったら", "Hima dattara", "kalau senggang", ["Pengandaian untuk akibat yang selalu terjadi (alami) memakai...", "〜と", "〜たら saja", "〜ので", "〜のに"]],
    ],
    [
      ["この道をまっすぐ行くと、駅があります。", "Kono michi o massugu iku to, eki ga arimasu.", "Kalau jalan lurus di jalan ini, ada stasiun."],
      ["冬になると、この湖は凍ります。", "Fuyu ni naru to, kono mizuumi wa koorimasu.", "Kalau musim dingin tiba, danau ini membeku."],
      ["仕事が終わったら、飲みに行きませんか。", "Shigoto ga owattara, nomi ni ikimasen ka.", "Setelah kerja selesai, mau pergi minum?"],
      ["もし時間があったら、手伝ってください。", "Moshi jikan ga attara, tetsudatte kudasai.", "Kalau ada waktu, tolong bantu saya."],
    ],
  ],
  // 20. Ulasan grammar N4
  [
    [
      ["行ったことがある", "Itta koto ga aru", "pernah pergi"],
      ["読めるようになった", "Yomeru you ni natta", "sudah bisa membaca"],
      ["来るかもしれない", "Kuru kamoshirenai", "mungkin datang"],
      ["寝たほうがいい", "Neta hou ga ii", "sebaiknya tidur", ["Pola untuk 'harus' adalah...", "〜なければならない", "〜たことがある", "〜ながら", "〜かもしれない"]],
    ],
    [
      ["日本語の新聞が少し読めるようになりました。", "Nihongo no shinbun ga sukoshi yomeru you ni narimashita.", "Saya sudah bisa sedikit membaca koran berbahasa Jepang."],
      ["週末は雨が降るかもしれないので、傘を買っておきます。", "Shuumatsu wa ame ga furu kamoshirenai node, kasa o katte okimasu.", "Karena akhir pekan mungkin hujan, saya membeli payung terlebih dulu."],
      ["卒業する前に、一度ヨーロッパへ行ってみたいです。", "Sotsugyou suru mae ni, ichido Yooroppa e itte mitai desu.", "Sebelum lulus, saya ingin mencoba pergi ke Eropa sekali."],
      ["先生に褒められて、とてもうれしかったです。", "Sensei ni homerarete, totemo ureshikatta desu.", "Saya dipuji guru dan sangat senang."],
    ],
  ],
];
