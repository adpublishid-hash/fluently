import type { JapaneseQuizTopic } from '../types';

// Latihan Pronunciation N1 — one entry per topic (index = topic - 1): [Basic, Advanced].
export const pronunciation: JapaneseQuizTopic[] = [
  // 1. Alur seperti penutur asli
  [
    [
      ["なんだかんだ言っても", "Nandakanda itte mo", "bagaimanapun juga"],
      ["言われてみれば", "Iwarete mireba", "kalau dipikir-pikir"],
      ["やるだけやってみる", "Yaru dake yatte miru", "mencoba sebisanya"],
      ["そういうことでしたら", "Sou iu koto deshitara", "kalau begitu halnya", ["Ciri alur bicara seperti penutur asli adalah...", "kata menyatu dalam frasa dengan nada naik-turun halus", "berhenti di setiap kata", "nada datar tanpa perubahan", "setiap mora ditekan keras"]],
    ],
    [
      ["言われてみれば、最近あの人を見かけませんね。", "Iwarete mireba, saikin ano hito o mikakemasen ne.", "Kalau dipikir-pikir, belakangan ini saya tidak melihat orang itu, ya."],
      ["なんだかんだ言っても、彼がいないと困るんですよ。", "Nandakanda itte mo, kare ga inai to komaru n desu yo.", "Bagaimanapun juga, tanpa dia kita kerepotan."],
      ["結果はともかく、やるだけやってみようと思います。", "Kekka wa tomokaku, yaru dake yatte miyou to omoimasu.", "Terlepas dari hasilnya, saya ingin mencoba sebisanya.", ["Sikap pembicara dalam kalimat itu adalah...", "mencoba sebisanya terlepas dari hasil", "menyerah sebelum mencoba", "yakin pasti berhasil", "menunggu orang lain"]],
      ["そういうことでしたら、早めにおっしゃってくださいね。", "Sou iu koto deshitara, hayame ni osshatte kudasai ne.", "Kalau begitu halnya, tolong bilang lebih awal, ya."],
    ],
  ],
  // 2. Ritme pidato akademik
  [
    [
      ["意義", "Igi", "makna / signifikansi"],
      ["通説", "Tsuusetsu", "pendapat umum"],
      ["第一に", "Daiichi ni", "pertama"],
      ["一定の貢献", "Ittei no kouken", "kontribusi tertentu", ["Tempo yang tepat untuk pidato akademik adalah...", "lambat-sedang dengan jeda setelah istilah", "secepat mungkin", "sangat lambat tanpa jeda", "naik-turun penuh emosi"]],
    ],
    [
      ["本日の発表は、三つの部分から構成されています。", "Honjitsu no happyou wa, mittsu no bubun kara kousei sarete imasu.", "Presentasi hari ini terdiri dari tiga bagian."],
      ["まず、研究の背景と問題意識について述べます。", "Mazu, kenkyuu no haikei to mondai ishiki ni tsuite nobemasu.", "Pertama, saya akan menyampaikan latar dan kesadaran masalah penelitian."],
      ["次に、調査の方法と得られた結果をご報告します。", "Tsugi ni, chousa no houhou to erareta kekka o gohoukoku shimasu.", "Selanjutnya, saya akan melaporkan metode survei dan hasil yang diperoleh."],
      ["最後に、今後の課題を示して締めくくります。", "Saigo ni, kongo no kadai o shimeshite shimekukurimasu.", "Terakhir, saya akan menutup dengan menunjukkan tantangan ke depan.", ["Bagian terakhir presentasi itu adalah...", "tantangan ke depan", "latar penelitian", "metode survei", "ucapan selamat datang"]],
    ],
  ],
  // 3. Jeda retoris
  [
    [
      ["それは……", "Sore wa...", "itu adalah..."],
      ["答えは一つ", "Kotae wa hitotsu", "jawabannya satu"],
      ["勇気", "Yuuki", "keberanian"],
      ["切り開く", "Kirihiraku", "membuka (jalan)", ["Jeda retoris sebelum kata kunci bertujuan...", "membuat pendengar menunggu dan fokus", "memberi waktu pembicara minum", "menandakan lupa naskah", "mengakhiri pidato"]],
    ],
    [
      ["この町を変えるのは、政府でも、企業でもありません。", "Kono machi o kaeru no wa, seifu demo, kigyou demo arimasen.", "Yang mengubah kota ini bukan pemerintah, bukan pula perusahaan."],
      ["それは……ここにいる皆さん一人ひとりです。", "Sore wa... koko ni iru minasan hitori hitori desu.", "Itu adalah... Anda semua yang ada di sini, satu per satu.", ["Menurut pidato itu, siapa yang akan mengubah kota?", "setiap hadirin", "pemerintah", "perusahaan", "wisatawan"]],
      ["答えは一つ。今日、行動を始めることです。", "Kotae wa hitotsu. Kyou, koudou o hajimeru koto desu.", "Jawabannya satu. Mulai bertindak hari ini."],
      ["小さな一歩が、やがて大きな道を切り開きます。", "Chiisana ippo ga, yagate ookina michi o kirihirakimasu.", "Langkah kecil pada akhirnya akan membuka jalan besar."],
    ],
  ],
  // 4. Tanya jawab konferensi
  [
    [
      ["ご懸念はもっともです", "Gokenen wa mottomo desu", "kekhawatiran Anda wajar"],
      ["第三者機関", "Daisansha kikan", "lembaga pihak ketiga"],
      ["検証を受ける", "Kenshou o ukeru", "menjalani verifikasi"],
      ["個別にご説明します", "Kobetsu ni gosetsumei shimasu", "akan saya jelaskan secara pribadi", ["Saat menghadapi pertanyaan kritis, nada penjawab sebaiknya...", "tenang dan stabil", "naik dan defensif", "sangat cepat", "berbisik"]],
    ],
    [
      ["鋭いご指摘、ありがとうございます。", "Surudoi goshiteki, arigatou gozaimasu.", "Terima kasih atas masukan yang tajam."],
      ["確かに、サンプルの規模には限界があります。", "Tashika ni, sanpuru no kibo ni wa genkai ga arimasu.", "Memang, skala sampelnya memiliki keterbatasan."],
      ["ただ、傾向自体は複数の調査で一貫しています。", "Tada, keikou jitai wa fukusuu no chousa de ikkan shite imasu.", "Hanya saja, kecenderungannya sendiri konsisten di beberapa survei.", ["Bagaimana penjawab mempertahankan hasilnya?", "kecenderungan konsisten di beberapa survei", "menolak bahwa sampel kecil", "mengganti topik", "meminta maaf dan menarik hasil"]],
      ["規模を拡大した追加調査を、来年度に予定しております。", "Kibo o kakudai shita tsuika chousa o, rainendo ni yotei shite orimasu.", "Survei tambahan dengan skala diperluas dijadwalkan tahun fiskal depan."],
    ],
  ],
  // 5. Nada keigo tingkat tinggi
  [
    [
      ["格別のご配慮", "Kakubetsu no gohairyo", "perhatian istimewa"],
      ["ご期待に沿えず", "Gokitai ni soezu", "tidak dapat memenuhi harapan"],
      ["何卒", "Nanitozo", "mohon dengan sangat"],
      ["ご愛顧", "Goaiko", "dukungan (pelanggan)", ["Nada keigo tingkat tinggi ditandai dengan...", "nada lebih rendah, tempo lambat, akhir lembut", "nada tinggi dan cepat", "suara keras", "nada naik seperti bertanya"]],
    ],
    [
      ["平素は格別のお引き立てを賜り、誠にありがとうございます。", "Heiso wa kakubetsu no ohikitate o tamawari, makoto ni arigatou gozaimasu.", "Terima kasih banyak atas dukungan istimewa Anda selama ini."],
      ["ご不便をおかけしますことを、深くお詫び申し上げます。", "Gofuben o okake shimasu koto o, fukaku owabi moushiagemasu.", "Kami memohon maaf sedalam-dalamnya atas ketidaknyamanan yang ditimbulkan."],
      ["何卒、事情をお汲み取りいただけますと幸いです。", "Nanitozo, jijou o okumitori itadakemasu to saiwai desu.", "Kami sangat berharap Anda berkenan memahami keadaannya.", ["Ungkapan お汲み取りいただけますと berarti meminta lawan bicara...", "memahami keadaan", "membayar", "datang", "mengirim barang"]],
      ["皆様のご健勝を心よりお祈り申し上げます。", "Minasama no gokenshou o kokoro yori oinori moushiagemasu.", "Dari lubuk hati kami mendoakan kesehatan Anda semua."],
    ],
  ],
  // 6. Wacana cepat
  [
    [
      ["先方に相談する", "Senpou ni soudan suru", "berkonsultasi dengan pihak sana"],
      ["中途半端", "Chuuto hanpa", "setengah-setengah"],
      ["優先順位", "Yuusen juni", "skala prioritas"],
      ["一つに絞る", "Hitotsu ni shiboru", "memfokuskan pada satu", ["Saat berbicara cepat, yang tetap harus dijaga adalah...", "keutuhan setiap mora", "volume maksimal", "jeda panjang di tiap kata", "nada datar"]],
    ],
    [
      ["つまり、期限に間に合わないってことですよね。", "Tsumari, kigen ni maniawanai tte koto desu yo ne.", "Jadi, artinya tidak akan sempat sebelum tenggat, kan?"],
      ["だったら、今のうちに先方に相談しておくべきでしょう。", "Dattara, ima no uchi ni senpou ni soudan shite oku beki deshou.", "Kalau begitu, sebaiknya berkonsultasi dengan pihak sana selagi masih sempat."],
      ["黙って遅れるより、正直に言ったほうが信頼されますから。", "Damatte okureru yori, shoujiki ni itta hou ga shinrai saremasu kara.", "Sebab lebih dipercaya jika jujur daripada diam-diam terlambat.", ["Alasan pembicara menyarankan berkonsultasi adalah...", "jujur lebih dipercaya daripada diam-diam terlambat", "pihak sana pasti marah", "tenggat bisa diabaikan", "agar dapat bonus"]],
      ["じゃあ、すぐに電話して、状況を説明しましょう。", "Jaa, sugu ni denwa shite, joukyou o setsumei shimashou.", "Kalau begitu, mari segera menelepon dan menjelaskan situasinya."],
    ],
  ],
  // 7. Intonasi sikap
  [
    [
      ["間違いありません", "Machigai arimasen", "tidak salah lagi"],
      ["そうとも言えますけど", "Sou to mo iemasu kedo", "bisa dibilang begitu juga sih"],
      ["いかがなものでしょうか", "Ikaga na mono deshou ka", "bagaimana, ya (keberatan halus)"],
      ["理解できます", "Rikai dekimasu", "saya bisa memahami", ["Intonasi yang menunjukkan keyakinan adalah...", "turun dengan tegas di akhir", "datar dan memanjang", "naik di akhir", "berbisik"]],
    ],
    [
      ["この方法で必ず成果が出ます。間違いありません。", "Kono houhou de kanarazu seika ga demasu. Machigai arimasen.", "Dengan metode ini pasti ada hasilnya. Tidak salah lagi."],
      ["うーん、それも一つの考え方だとは思いますけど……。", "Uun, sore mo hitotsu no kangaekata da to wa omoimasu kedo...", "Hmm, saya rasa itu juga salah satu cara berpikir sih…", ["Sikap yang terdengar dari kalimat itu adalah...", "ragu-ragu / kurang setuju", "sangat yakin", "sangat gembira", "marah"]],
      ["会議の直前に変更するのは、いかがなものでしょうか。", "Kaigi no chokuzen ni henkou suru no wa, ikaga na mono deshou ka.", "Mengubahnya tepat sebelum rapat, bagaimana, ya."],
      ["お気持ちは理解できますが、規則は規則ですので。", "Okimochi wa rikai dekimasu ga, kisoku wa kisoku desu node.", "Saya bisa memahami perasaan Anda, tetapi aturan tetaplah aturan."],
    ],
  ],
  // 8. Emosi halus
  [
    [
      ["しみじみ", "Shimijimi", "dengan haru / mendalam"],
      ["切ない", "Setsunai", "pilu / menyesakkan"],
      ["名残惜しい", "Nagorioshii", "berat untuk berpisah"],
      ["胸がいっぱい", "Mune ga ippai", "hati penuh (terharu)", ["Emosi halus dalam ucapan biasanya ditunjukkan lewat...", "perubahan kecil pada nada dan tempo", "volume yang sangat keras", "kata-kata kasar", "tertawa keras"]],
    ],
    [
      ["卒業式の日、しみじみと三年間を振り返りました。", "Sotsugyoushiki no hi, shimijimi to sannenkan o furikaerimashita.", "Pada hari wisuda, saya mengenang tiga tahun dengan penuh haru."],
      ["もう会えないと思うと、切なくなります。", "Mou aenai to omou to, setsunaku narimasu.", "Kalau berpikir tidak bisa bertemu lagi, rasanya pilu."],
      ["名残惜しいですが、そろそろ失礼します。", "Nagorioshii desu ga, sorosoro shitsurei shimasu.", "Berat rasanya berpisah, tetapi saya pamit sekarang."],
      ["皆さんの言葉に、胸がいっぱいです。", "Minasan no kotoba ni, mune ga ippai desu.", "Hati saya penuh haru mendengar kata-kata Anda semua.", ["Perasaan pembicara adalah...", "sangat terharu", "kesal", "bosan", "takut"]],
    ],
  ],
  // 9. Presentasi ahli
  [
    [
      ["従来比で", "Juuraihi de", "dibanding sebelumnya"],
      ["に相当します", "Ni soutou shimasu", "setara dengan"],
      ["これに尽きます", "Kore ni tsukimasu", "itulah intinya"],
      ["実証実験", "Jisshou jikken", "uji coba pembuktian", ["Presentasi ahli yang meyakinkan ditandai dengan...", "suara berwibawa dan jeda pada data", "berbicara sangat cepat", "membaca naskah tanpa jeda", "suara bergetar"]],
    ],
    [
      ["実証実験の結果、消費電力は従来比で四割減少しました。", "Jisshou jikken no kekka, shouhi denryoku wa juuraihi de yonwari genshou shimashita.", "Hasil uji coba pembuktian, konsumsi listrik turun empat puluh persen dibanding sebelumnya.", ["Berapa penurunan konsumsi listrik menurut presentasi?", "40%", "4%", "14%", "60%"]],
      ["これは、一般家庭およそ一万世帯分の電力に相当します。", "Kore wa, ippan katei oyoso ichiman setai bun no denryoku ni soutou shimasu.", "Ini setara dengan listrik sekitar sepuluh ribu rumah tangga."],
      ["導入費用は、三年以内に回収できる見込みです。", "Dounyuu hiyou wa, sannen inai ni kaishuu dekiru mikomi desu.", "Biaya penerapan diperkirakan kembali dalam tiga tahun."],
      ["省エネと低コストの両立。これに尽きます。", "Shouene to teikosuto no ryouritsu. Kore ni tsukimasu.", "Hemat energi sekaligus biaya rendah. Itulah intinya."],
    ],
  ],
  // 10. Diskusi panel
  [
    [
      ["一点補足させてください", "Itten hosoku sasete kudasai", "izinkan saya menambahkan satu hal"],
      ["現場の声として", "Genba no koe to shite", "sebagai suara dari lapangan"],
      ["手短に申し上げます", "Temijika ni moushiagemasu", "saya sampaikan dengan singkat"],
      ["会場の皆さん", "Kaijou no minasan", "para hadirin", ["Etika dalam diskusi panel adalah...", "mengambil giliran dengan sopan dan menjaga waktu", "memotong pembicaraan orang lain", "berbicara selama mungkin", "mengabaikan panelis lain"]],
    ],
    [
      ["佐藤先生のご意見に、私も基本的に賛成です。", "Satou sensei no goiken ni, watashi mo kihonteki ni sansei desu.", "Saya pada dasarnya juga setuju dengan pendapat Prof. Sato."],
      ["ただ、現場の声として、一点補足させてください。", "Tada, genba no koe to shite, itten hosoku sasete kudasai.", "Hanya saja, sebagai suara dari lapangan, izinkan saya menambahkan satu hal."],
      ["制度があっても、使いにくければ意味がありません。", "Seido ga atte mo, tsukainikukereba imi ga arimasen.", "Meskipun ada sistemnya, jika sulit digunakan tidak ada artinya.", ["Poin tambahan panelis itu adalah...", "sistem tidak berarti jika sulit digunakan", "sistem tidak diperlukan", "Prof. Sato salah total", "lapangan tidak penting"]],
      ["時間が押しておりますので、手短に申し上げました。", "Jikan ga oshite orimasu node, temijika ni moushiagemashita.", "Karena waktunya sudah mepet, saya sampaikan dengan singkat."],
    ],
  ],
  // 11. Penekanan argumen
  [
    [
      ["むしろ", "Mushiro", "justru"],
      ["必然", "Hitsuzen", "tak terelakkan"],
      ["逆に言えば", "Gyaku ni ieba", "sebaliknya"],
      ["決して", "Kesshite", "sama sekali (tidak)", ["Dalam argumen lisan, kata yang sebaiknya ditekankan adalah...", "kata pembawa argumen seperti むしろ atau 決して", "partikel は dan が", "kata sapaan", "akhir kalimat です"]],
    ],
    [
      ["必要なのは規制の強化ではなく、むしろ教育です。", "Hitsuyou na no wa kisei no kyouka de wa naku, mushiro kyouiku desu.", "Yang diperlukan bukan penguatan regulasi, melainkan justru pendidikan.", ["Menurut pembicara, yang diperlukan adalah...", "pendidikan", "penguatan regulasi", "hukuman berat", "teknologi baru"]],
      ["この失敗は、準備不足による必然の結果でした。", "Kono shippai wa, junbi busoku ni yoru hitsuzen no kekka deshita.", "Kegagalan ini adalah hasil tak terelakkan dari kurangnya persiapan."],
      ["逆に言えば、準備さえすれば防げたのです。", "Gyaku ni ieba, junbi sae sureba fusegeta no desu.", "Sebaliknya, asalkan bersiap, itu bisa dicegah."],
      ["この問題は、決して若者だけの責任ではありません。", "Kono mondai wa, kesshite wakamono dake no sekinin de wa arimasen.", "Masalah ini sama sekali bukan tanggung jawab anak muda saja."],
    ],
  ],
  // 12. Shadowing panjang
  [
    [
      ["書き換えられる", "Kakikaerareru", "ditulis ulang"],
      ["思いがけない", "Omoigakenai", "tak terduga"],
      ["積み重ね", "Tsumikasane", "akumulasi"],
      ["かけがえのない", "Kakegae no nai", "tak tergantikan", ["Kunci shadowing teks panjang adalah...", "mempertahankan ritme sampai akhir", "berhenti di setiap kalimat", "mempercepat di akhir", "hanya meniru kalimat pertama"]],
    ],
    [
      ["毎日の小さな積み重ねが、やがて大きな力になります。", "Mainichi no chiisana tsumikasane ga, yagate ookina chikara ni narimasu.", "Akumulasi kecil setiap hari pada akhirnya menjadi kekuatan besar."],
      ["思いがけない失敗が、新しい発見につながることもあります。", "Omoigakenai shippai ga, atarashii hakken ni tsunagaru koto mo arimasu.", "Kegagalan tak terduga bisa juga berujung pada penemuan baru."],
      ["大切なのは、昨日の自分と比べることです。", "Taisetsu na no wa, kinou no jibun to kuraberu koto desu.", "Yang penting adalah membandingkan dengan diri sendiri kemarin.", ["Menurut teks, yang penting adalah membandingkan diri dengan...", "diri sendiri kemarin", "teman sekelas", "orang terkenal", "guru"]],
      ["今日という日は、二度と来ないかけがえのない一日なのです。", "Kyou to iu hi wa, nido to konai kakegae no nai ichinichi na no desu.", "Hari ini adalah satu hari tak tergantikan yang tak akan datang dua kali."],
    ],
  ],
  // 13. Berpindah register
  [
    [
      ["以上で終わります", "Ijou de owarimasu", "demikian, saya akhiri"],
      ["緊張しました", "Kinchou shimashita", "tadi tegang sekali"],
      ["お忙しいところ", "Oisogashii tokoro", "di tengah kesibukan Anda"],
      ["ご飯行かない？", "Gohan ikanai?", "mau makan, nggak?", ["Berpindah register yang mulus berarti...", "menyesuaikan gaya bicara dengan lawan bicara dan situasi", "selalu memakai keigo tinggi", "selalu memakai bahasa santai", "mencampur semua secara acak"]],
    ],
    [
      ["以上をもちまして、本日の講演を終わらせていただきます。", "Ijou o mochimashite, honjitsu no kouen o owarasete itadakimasu.", "Dengan ini, izinkan saya mengakhiri ceramah hari ini."],
      ["いやあ、思ったより質問が多くて焦りましたよ。", "Iyaa, omotta yori shitsumon ga ookute aserimashita yo.", "Wah, pertanyaannya lebih banyak dari dugaan, saya sampai panik.", ["Register kalimat itu menunjukkan pembicara sedang...", "mengobrol santai setelah ceramah", "memulai ceramah resmi", "berbicara dengan tamu kehormatan", "membaca berita"]],
      ["学長、本日は貴重な機会をいただき、ありがとうございました。", "Gakuchou, honjitsu wa kichou na kikai o itadaki, arigatou gozaimashita.", "Pak/Bu Rektor, terima kasih atas kesempatan berharga hari ini."],
      ["ねえ、打ち上げどこにする？", "Nee, uchiage doko ni suru?", "Eh, pesta penutupnya di mana?"],
    ],
  ],
  // 14. Perbaikan seperti penutur asli
  [
    [
      ["言い間違えました", "Iimachigaemashita", "saya salah ucap"],
      ["撤回させてください", "Tekkai sasete kudasai", "izinkan saya menarik (ucapan)"],
      ["言葉が過ぎました", "Kotoba ga sugimashita", "kata-kata saya berlebihan"],
      ["暫定的な数字", "Zanteiteki na suuji", "angka sementara", ["Perbaikan ucapan yang tetap berwibawa dilakukan dengan...", "mengoreksi singkat lalu melanjutkan", "berhenti lama dan panik", "pura-pura tidak salah", "mengulang dari awal pidato"]],
    ],
    [
      ["参加者は五百人、失礼、五千人を超えました。", "Sankasha wa gohyakunin, shitsurei, gosennin o koemashita.", "Pesertanya lima ratus, maaf, melebihi lima ribu orang.", ["Jumlah peserta yang benar adalah...", "lebih dari 5.000 orang", "500 orang", "50 orang", "50.000 orang"]],
      ["先ほど「全員」と申しましたが、正確には九割です。", "Sakihodo \"zenin\" to moushimashita ga, seikaku ni wa kyuuwari desu.", "Tadi saya bilang \"semua orang\", tetapi tepatnya sembilan puluh persen."],
      ["感情的な言い方になりました。言葉が過ぎました。", "Kanjouteki na iikata ni narimashita. Kotoba ga sugimashita.", "Cara bicara saya jadi emosional. Kata-kata saya berlebihan."],
      ["なお、これは速報値であり、暫定的な数字です。", "Nao, kore wa sokuhouchi de ari, zanteiteki na suuji desu.", "Sebagai tambahan, ini adalah nilai kilat dan merupakan angka sementara."],
    ],
  ],
  // 15. Komentar media
  [
    [
      ["ある意味で", "Aru imi de", "dalam arti tertentu"],
      ["注目すべき点", "Chuumoku subeki ten", "hal yang patut dicermati"],
      ["と見ています", "To mite imasu", "saya memandang bahwa"],
      ["注視したい", "Chuushi shitai", "ingin mencermati", ["Gaya komentator media yang baik adalah...", "analitis dengan tempo stabil dan nada netral", "emosional dan berteriak", "sangat cepat tanpa jeda", "berbisik"]],
    ],
    [
      ["今回の株価の下落は、ある意味で想定の範囲内でした。", "Konkai no kabuka no geraku wa, aru imi de soutei no hani nai deshita.", "Penurunan harga saham kali ini, dalam arti tertentu, masih dalam batas perkiraan."],
      ["注目すべき点は、個人投資家の売りが目立ったことです。", "Chuumoku subeki ten wa, kojin toushika no uri ga medatta koto desu.", "Hal yang patut dicermati adalah mencoloknya penjualan oleh investor perorangan.", ["Hal yang patut dicermati menurut komentator adalah...", "penjualan oleh investor perorangan", "pembelian oleh bank sentral", "kenaikan harga emas", "libur bursa"]],
      ["背景には、金利の先行きへの不安があると見ています。", "Haikei ni wa, kinri no sakiyuki e no fuan ga aru to mite imasu.", "Saya memandang latarnya adalah kecemasan terhadap arah suku bunga."],
      ["来週の日銀の発表を注視したいと思います。", "Raishuu no Nichigin no happyou o chuushi shitai to omoimasu.", "Saya ingin mencermati pengumuman Bank of Japan minggu depan."],
    ],
  ],
  // 16. Membaca karya sastra
  [
    [
      ["雪国", "Yukiguni", "negeri salju"],
      ["夜の底", "Yoru no soko", "dasar malam"],
      ["見当がつかぬ", "Kentou ga tsukanu", "tak bisa diterka"],
      ["朗読", "Roudoku", "pembacaan nyaring (karya sastra)", ["Saat membaca karya sastra dengan suara, sebaiknya...", "tempo lambat dengan jeda pada titik dan koma", "secepat mungkin", "tanpa jeda sama sekali", "dengan nada datar seperti robot"]],
    ],
    [
      ["春はあけぼの。やうやう白くなりゆく山ぎは。", "Haru wa akebono. Youyou shiroku nariyuku yamagiwa.", "Musim semi paling indah saat fajar. Tepi gunung perlahan memutih. (Makura no Soshi)"],
      ["祇園精舎の鐘の声、諸行無常の響きあり。", "Gion shouja no kane no koe, shogyou mujou no hibiki ari.", "Suara lonceng biara Gion bergema tentang ketidakkekalan segala sesuatu. (Heike Monogatari)", ["Tema yang disampaikan kalimat pembuka Heike Monogatari itu adalah...", "ketidakkekalan segala sesuatu", "kebahagiaan abadi", "keindahan musim semi", "kemenangan perang"]],
      ["メロスは激怒した。", "Merosu wa gekido shita.", "Melos murka. (Dazai Osamu)"],
      ["朗読するときは、一文ごとに情景を思い浮かべるとよい。", "Roudoku suru toki wa, ichibun goto ni joukei o omoiukaberu to yoi.", "Saat membaca nyaring, sebaiknya membayangkan pemandangan di setiap kalimat."],
    ],
  ],
  // 17. Mengatur napas
  [
    [
      ["腹式呼吸", "Fukushiki kokyuu", "pernapasan perut"],
      ["息を吸う", "Iki o suu", "menarik napas"],
      ["息が続く", "Iki ga tsuzuku", "napas bertahan"],
      ["歩みを止める", "Ayumi o tomeru", "berhenti melangkah", ["Sebelum mengucapkan kalimat panjang, sebaiknya...", "menarik napas dalam dari perut", "menahan napas", "bernapas pendek-pendek", "berbicara sambil menghembuskan semua napas"]],
    ],
    [
      ["長い文を読む前には、腹式呼吸で深く息を吸いましょう。", "Nagai bun o yomu mae ni wa, fukushiki kokyuu de fukaku iki o suimashou.", "Sebelum membaca kalimat panjang, tariklah napas dalam dengan pernapasan perut."],
      ["創業以来、私どもは品質と誠実さを何よりも大切にし、お客様の信頼に応えるべく努めてまいりました。", "Sougyou irai, watakushidomo wa hinshitsu to seijitsusa o nani yori mo taisetsu ni shi, okyakusama no shinrai ni kotaeru beku tsutomete mairimashita.", "Sejak berdiri, kami mengutamakan kualitas dan ketulusan di atas segalanya, dan berusaha menjawab kepercayaan pelanggan.", ["Hal yang paling diutamakan perusahaan sejak berdiri adalah...", "kualitas dan ketulusan", "keuntungan dan kecepatan", "harga murah", "jumlah cabang"]],
      ["息が続かないときは、読点の位置で軽く吸い直します。", "Iki ga tsuzukanai toki wa, touten no ichi de karuku suinaoshimasu.", "Jika napas tidak bertahan, tarik napas ringan lagi di posisi tanda koma."],
      ["どんな困難があっても、私たちは歩みを止めません。", "Donna konnan ga atte mo, watashitachi wa ayumi o tomemasen.", "Kesulitan apa pun yang ada, kami tidak akan berhenti melangkah."],
    ],
  ],
  // 18. Audit nada
  [
    [
      ["箸と橋", "Hashi to hashi", "sumpit (HA-shi) dan jembatan (ha-SHI)"],
      ["雨と飴", "Ame to ame", "hujan (A-me) dan permen (a-ME)"],
      ["柿と牡蠣", "Kaki to kaki", "kesemek (KA-ki) dan tiram (ka-KI)"],
      ["神と紙", "Kami to kami", "dewa (KA-mi) dan kertas (ka-MI)", ["Mengapa aksen nada penting dalam bahasa Jepang?", "kata dengan bunyi sama bisa berbeda arti", "untuk menunjukkan emosi saja", "karena wajib dalam tulisan", "tidak penting sama sekali"]],
    ],
    [
      ["箸で橋の絵を描くなんて、器用ですね。", "Hashi de hashi no e o kaku nante, kiyou desu ne.", "Menggambar jembatan dengan sumpit, terampil sekali, ya."],
      ["雨の日は、子どもに飴を一つあげています。", "Ame no hi wa, kodomo ni ame o hitotsu agete imasu.", "Pada hari hujan, saya memberi anak satu permen.", ["Dalam kalimat itu, kata 'ame' pertama dan kedua berarti...", "hujan dan permen", "permen dan hujan", "hujan dan hujan", "permen dan permen"]],
      ["秋になると、柿も牡蠣もおいしくなります。", "Aki ni naru to, kaki mo kaki mo oishiku narimasu.", "Kalau musim gugur tiba, kesemek dan tiram sama-sama menjadi lezat."],
      ["神社で、願い事を紙に書きました。", "Jinja de, negaigoto o kami ni kakimashita.", "Di kuil, saya menulis permohonan di kertas."],
    ],
  ],
  // 19. Tolok ukur kelancaran
  [
    [
      ["一分間で語る", "Ippunkan de kataru", "bercerita dalam satu menit"],
      ["実感できる瞬間", "Jikkan dekiru shunkan", "saat bisa merasakan langsung"],
      ["言いよどむ", "Iiyodomu", "tersendat saat bicara"],
      ["つなぎの言葉", "Tsunagi no kotoba", "kata penghubung / pengisi", ["Tolok ukur kelancaran N1 adalah...", "bicara satu menit tentang topik abstrak tanpa jeda tak perlu", "membaca satu kata dengan benar", "menghafal kosakata", "menulis esai"]],
    ],
    [
      ["私にとって成功とは、昨日の自分を少しでも超えることです。", "Watashi ni totte seikou to wa, kinou no jibun o sukoshi demo koeru koto desu.", "Bagi saya, keberhasilan adalah melampaui diri sendiri kemarin, meski sedikit."],
      ["他人と比べ始めると、終わりがありませんから。", "Tanin to kurabehajimeru to, owari ga arimasen kara.", "Sebab jika mulai membandingkan dengan orang lain, tidak ada habisnya.", ["Alasan pembicara tidak membandingkan diri dengan orang lain adalah...", "tidak ada habisnya", "orang lain lebih lemah", "tidak sopan", "dilarang guru"]],
      ["言いよどみそうになったら、「そうですね」などのつなぎの言葉で間を埋めます。", "Iiyodomisou ni nattara, \"sou desu ne\" nado no tsunagi no kotoba de ma o umemasu.", "Jika hampir tersendat, isi jeda dengan kata pengisi seperti \"sou desu ne\"."],
      ["一分間話し続けることで、考えをまとめる力も鍛えられます。", "Ippunkan hanashitsuzukeru koto de, kangae o matomeru chikara mo kitaeraremasu.", "Dengan terus berbicara selama satu menit, kemampuan merangkum pikiran juga terlatih."],
    ],
  ],
  // 20. Ulasan pronunciation N1
  [
    [
      ["一言一言", "Hitokoto hitokoto", "setiap kata"],
      ["橋渡し", "Hashiwatashi", "jembatan penghubung"],
      ["話し続ける", "Hanashitsuzukeru", "terus berbicara"],
      ["世界を広げる", "Sekai o hirogeru", "memperluas dunia", ["Pronunciation N1 yang baik menggabungkan...", "alur alami, jeda retoris, keigo, sikap, dan napas", "kecepatan maksimal", "volume keras saja", "aksen bahasa ibu"]],
    ],
    [
      ["発音の練習は、毎日少しずつ続けることが何より大切です。", "Hatsuon no renshuu wa, mainichi sukoshi zutsu tsuzukeru koto ga nani yori taisetsu desu.", "Dalam latihan pelafalan, yang terpenting adalah terus berlatih sedikit demi sedikit setiap hari."],
      ["録音した自分の声を聞くのは、最初は恥ずかしいものです。", "Rokuon shita jibun no koe o kiku no wa, saisho wa hazukashii mono desu.", "Mendengarkan rekaman suara sendiri memang memalukan pada awalnya."],
      ["けれども、その一言一言が、確かな上達の記録になります。", "Keredomo, sono hitokoto hitokoto ga, tashika na joutatsu no kiroku ni narimasu.", "Akan tetapi, setiap kata itu menjadi catatan kemajuan yang pasti.", ["Menurut teks, rekaman suara sendiri menjadi...", "catatan kemajuan yang pasti", "hal yang sebaiknya dihapus", "bukti kegagalan", "hiburan saja"]],
      ["言葉の橋渡し役として、これからも話し続けていきたいです。", "Kotoba no hashiwatashi yaku to shite, korekara mo hanashitsuzukete ikitai desu.", "Sebagai jembatan penghubung bahasa, saya ingin terus berbicara ke depannya."],
    ],
  ],
];
