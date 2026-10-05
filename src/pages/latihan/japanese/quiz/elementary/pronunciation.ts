import type { JapaneseQuizTopic } from '../types';

// Latihan Pronunciation N4 — one entry per topic (index = topic - 1): [Basic, Advanced].
export const pronunciation: JapaneseQuizTopic[] = [
  // 1. Ritme bentuk て
  [
    [
      ["言って", "Itte", "berkata (bentuk te)"],
      ["頼んで", "Tanonde", "meminta (bentuk te)"],
      ["切って", "Kitte", "memotong (bentuk te)"],
      ["学んで", "Manande", "mempelajari (bentuk te)", ["Romaji yang benar untuk 言って adalah...", "itte", "ite", "iitte", "ittte"]],
    ],
    [
      ["もう一度言ってください。", "Mou ichido itte kudasai.", "Tolong katakan sekali lagi."],
      ["野菜を小さく切って、なべに入れます。", "Yasai o chiisaku kitte, nabe ni iremasu.", "Potong sayur kecil-kecil, lalu masukkan ke panci."],
      ["タクシーを呼んでもらえますか。", "Takushii o yonde moraemasu ka.", "Bisakah dipanggilkan taksi?"],
      ["大学で経済を学んでいます。", "Daigaku de keizai o manande imasu.", "Saya mempelajari ekonomi di universitas."],
    ],
  ],
  // 2. Kalimat panjang
  [
    [
      ["駅前の", "Ekimae no", "di depan stasiun"],
      ["昨日買った", "Kinou katta", "yang kemarin dibeli"],
      ["友達に借りた", "Tomodachi ni karita", "yang dipinjam dari teman"],
      ["寄ってから", "Yotte kara", "setelah mampir", ["Kalimat panjang sebaiknya diucapkan dengan...", "dipenggal menjadi 2–3 kelompok napas", "satu napas tanpa jeda", "jeda di setiap huruf", "sangat cepat"]],
    ],
    [
      ["友達に借りた本を、今週中に返さなければなりません。", "Tomodachi ni karita hon o, konshuuchuu ni kaesanakereba narimasen.", "Buku yang saya pinjam dari teman harus dikembalikan minggu ini."],
      ["郵便局に寄ってから、会社へ行きます。", "Yuubinkyoku ni yotte kara, kaisha e ikimasu.", "Setelah mampir ke kantor pos, saya pergi ke kantor."],
      ["駅前の喫茶店で、高校の先輩に偶然会いました。", "Ekimae no kissaten de, koukou no senpai ni guuzen aimashita.", "Di kafe depan stasiun, saya kebetulan bertemu senior SMA."],
      ["週末に撮った写真を、家族に送りました。", "Shuumatsu ni totta shashin o, kazoku ni okurimashita.", "Foto yang saya ambil akhir pekan saya kirim ke keluarga."],
    ],
  ],
  // 3. Nada pada kata kerja
  [
    [
      ["飲みます", "Nomimasu", "minum"],
      ["帰ります", "Kaerimasu", "pulang"],
      ["覚えました", "Oboemashita", "sudah hafal"],
      ["休みましょう", "Yasumimashou", "mari istirahat", ["Banyak kata kerja ます turun nadanya pada...", "ま", "す", "awal kata", "tidak ada perubahan"]],
    ],
    [
      ["毎朝、コーヒーを一杯飲みます。", "Maiasa, koohii o ippai nomimasu.", "Setiap pagi saya minum secangkir kopi."],
      ["今日は早く家に帰ります。", "Kyou wa hayaku ie ni kaerimasu.", "Hari ini saya pulang cepat."],
      ["新しい単語を十個覚えました。", "Atarashii tango o jukko oboemashita.", "Saya sudah menghafal sepuluh kosakata baru."],
      ["疲れたから、少し休みましょう。", "Tsukareta kara, sukoshi yasumimashou.", "Karena lelah, mari istirahat sebentar."],
    ],
  ],
  // 4. Nada pada kata sifat
  [
    [
      ["安い", "Yasui", "murah"],
      ["暑かった", "Atsukatta", "panas (lampau)"],
      ["楽しい", "Tanoshii", "menyenangkan"],
      ["寒くない", "Samukunai", "tidak dingin", ["Bentuk lampau dari 安い adalah...", "安かった", "安いでした", "安くた", "安いかった"]],
    ],
    [
      ["この店の野菜は安いですね。", "Kono mise no yasai wa yasui desu ne.", "Sayur di toko ini murah, ya."],
      ["去年の夏はとても暑かったです。", "Kyonen no natsu wa totemo atsukatta desu.", "Musim panas tahun lalu sangat panas."],
      ["日本語の授業は毎回楽しいです。", "Nihongo no jugyou wa maikai tanoshii desu.", "Pelajaran bahasa Jepang selalu menyenangkan."],
      ["今日は思ったより寒くないです。", "Kyou wa omotta yori samukunai desu.", "Hari ini tidak sedingin yang saya kira."],
    ],
  ],
  // 5. Nada akhir kalimat
  [
    [
      ["だよ", "Da yo", "lho (memberi tahu)"],
      ["だね", "Da ne", "ya (mengajak setuju)"],
      ["でしょう", "Deshou", "kan? / mungkin"],
      ["かな", "Ka na", "ya? (bertanya pada diri sendiri)", ["Partikel akhir untuk memberi tahu informasi baru adalah...", "よ", "ね", "か", "な"]],
    ],
    [
      ["電車、もう来てるよ。", "Densha, mou kiteru yo.", "Keretanya sudah datang, lho."],
      ["今日はいい天気だね。", "Kyou wa ii tenki da ne.", "Hari ini cuacanya bagus, ya."],
      ["明日、雨が降るかな。", "Ashita, ame ga furu ka na.", "Besok hujan tidak, ya."],
      ["あの人、田中さんでしょう？", "Ano hito, Tanaka san deshou?", "Orang itu Tanaka, kan?"],
    ],
  ],
  // 6. Jeda alami
  [
    [
      ["でも", "Demo", "tetapi"],
      ["そしたら", "Soshitara", "kalau begitu / lalu"],
      ["要するに", "You suru ni", "singkatnya"],
      ["さて", "Sate", "nah / baiklah", ["Jeda alami biasanya diambil setelah...", "topik (〜は) dan konektor", "setiap huruf", "akhir kata kerja saja", "partikel を saja"]],
    ],
    [
      ["兄は、毎晩、ジョギングをしています。", "Ani wa, maiban, jogingu o shite imasu.", "Kakak laki-laki saya, setiap malam, joging."],
      ["でも、昨日は、雨で休みました。", "Demo, kinou wa, ame de yasumimashita.", "Tapi, kemarin, dia libur karena hujan."],
      ["ところで、来週の予定は決まりましたか。", "Tokorode, raishuu no yotei wa kimarimashita ka.", "Ngomong-ngomong, rencana minggu depan sudah ditentukan?"],
      ["実は、まだ何も決めていません。", "Jitsu wa, mada nani mo kimete imasen.", "Sebenarnya, saya belum memutuskan apa pun."],
    ],
  ],
  // 7. Shadowing dialog
  [
    [
      ["ねえ", "Nee", "eh / hei"],
      ["見た見た", "Mita mita", "nonton, nonton!"],
      ["楽しみ", "Tanoshimi", "tidak sabar menantikan"],
      ["また話そう", "Mata hanasou", "nanti ngobrol lagi", ["Shadowing dialog melatih...", "jeda pergantian giliran bicara", "menulis kanji", "menghafal tata bahasa", "menerjemahkan"]],
    ],
    [
      ["ねえ、新しいカフェ、行ってみた？", "Nee, atarashii kafe, itte mita?", "Eh, kafe baru itu, sudah coba ke sana?"],
      ["うん、行った行った！ケーキがおいしかったよ。", "Un, itta itta! Keeki ga oishikatta yo.", "Iya, sudah! Kuenya enak, lho."],
      ["いいなあ。今度一緒に行こうよ。", "Ii naa. Kondo issho ni ikou yo.", "Enaknya. Lain kali kita ke sana bareng, yuk."],
      ["うん、楽しみにしてるね。", "Un, tanoshimi ni shiteru ne.", "Iya, aku tidak sabar."],
    ],
  ],
  // 8. Intonasi meminta izin
  [
    [
      ["あの", "Ano", "anu (pembuka sopan)"],
      ["開けてもいいですか", "Akete mo ii desu ka", "bolehkah saya membuka?"],
      ["使っても", "Tsukatte mo", "meskipun memakai / boleh memakai"],
      ["座っても", "Suwatte mo", "boleh duduk", ["Saat meminta izin, nada di akhir か sebaiknya...", "naik halus, tidak terlalu tinggi", "turun tajam", "sangat tinggi", "datar dan keras"]],
    ],
    [
      ["あの、このいすに座ってもいいですか。", "Ano, kono isu ni suwatte mo ii desu ka.", "Anu, bolehkah saya duduk di kursi ini?"],
      ["トイレを使ってもいいですか。", "Toire o tsukatte mo ii desu ka.", "Bolehkah saya memakai toilet?"],
      ["写真を一枚撮ってもいいですか。", "Shashin o ichimai totte mo ii desu ka.", "Bolehkah saya mengambil satu foto?"],
      ["電話をかけてもいいですか。", "Denwa o kakete mo ii desu ka.", "Bolehkah saya menelepon?"],
    ],
  ],
  // 9. Melembutkan permintaan
  [
    [
      ["もしよかったら", "Moshi yokattara", "kalau tidak keberatan"],
      ["悪いけど", "Warui kedo", "maaf, tapi..."],
      ["ちょっとだけ", "Chotto dake", "sedikit saja"],
      ["くれない？", "Kurenai?", "bisa ... untukku?", ["Permintaan yang lembut biasanya diucapkan dengan...", "suara lebih rendah dan tempo lebih lambat", "suara sangat keras", "tempo sangat cepat", "nada marah"]],
    ],
    [
      ["もしよかったら、一緒に帰らない？", "Moshi yokattara, issho ni kaeranai?", "Kalau tidak keberatan, pulang bareng?"],
      ["悪いけど、窓を閉めてくれない？", "Warui kedo, mado o shimete kurenai?", "Maaf, bisa tutup jendelanya?"],
      ["ちょっとだけ、待っててくれる？", "Chotto dake, mattete kureru?", "Bisa tunggu sebentar saja?"],
      ["すみませんが、もう一度説明していただけますか。", "Sumimasen ga, mou ichido setsumei shite itadakemasu ka.", "Maaf, bisakah dijelaskan sekali lagi?"],
    ],
  ],
  // 10. Nada meminta maaf
  [
    [
      ["すみませんでした", "Sumimasen deshita", "maaf (atas yang sudah terjadi)"],
      ["ご迷惑", "Gomeiwaku", "kerepotan (sopan)"],
      ["不注意", "Fuchuui", "kecerobohan"],
      ["以後", "Igo", "selanjutnya", ["Nada saat meminta maaf sebaiknya...", "rendah dan lambat", "tinggi dan cepat", "riang", "sangat keras"]],
    ],
    [
      ["遅くなって、本当にすみませんでした。", "Osoku natte, hontou ni sumimasen deshita.", "Maaf sekali saya terlambat."],
      ["大変ご迷惑をおかけしました。", "Taihen gomeiwaku o okake shimashita.", "Saya sangat merepotkan Anda."],
      ["私の不注意で、コップを割ってしまいました。", "Watashi no fuchuui de, koppu o watte shimaimashita.", "Karena kecerobohan saya, gelasnya pecah."],
      ["以後、十分気をつけます。", "Igo, juubun ki o tsukemasu.", "Selanjutnya saya akan sangat berhati-hati."],
    ],
  ],
  // 11. Penekanan kontras
  [
    [
      ["じゃなくて", "Ja nakute", "bukan ..., tetapi"],
      ["は…が", "Wa... ga", "(pola kontras) ... tetapi ..."],
      ["のほう", "No hou", "yang ..."],
      ["だけ", "Dake", "hanya", ["Kata yang dikontraskan sebaiknya diucapkan dengan...", "nada lebih tinggi dan jeda kecil", "suara sangat pelan", "dipercepat", "dihilangkan"]],
    ],
    [
      ["コーヒーは飲みますが、紅茶は飲みません。", "Koohii wa nomimasu ga, koucha wa nomimasen.", "Kopi saya minum, tapi teh tidak."],
      ["三時じゃなくて、四時に会いましょう。", "Sanji ja nakute, yoji ni aimashou.", "Bukan jam tiga, mari bertemu jam empat."],
      ["大きいほうじゃなくて、小さいほうをください。", "Ookii hou ja nakute, chiisai hou o kudasai.", "Bukan yang besar, minta yang kecil."],
      ["電車じゃなくて、バスで来ました。", "Densha ja nakute, basu de kimashita.", "Saya datang bukan naik kereta, tapi naik bus."],
    ],
  ],
  // 12. Penyingkatan partikel
  [
    [
      ["てる", "Teru", "sedang ... (singkatan ている)"],
      ["ちゃった", "Chatta", "terlanjur ... (singkatan てしまった)"],
      ["とく", "Toku", "melakukan dulu (singkatan ておく)"],
      ["なきゃ", "Nakya", "harus (singkatan なければ)", ["Bentuk santai dari 食べてしまった adalah...", "食べちゃった", "食べとった", "食べてた", "食べなきゃ"]],
    ],
    [
      ["今、テレビ見てる。", "Ima, terebi miteru.", "Lagi nonton TV."],
      ["傘、電車に忘れちゃった。", "Kasa, densha ni wasurechatta.", "Payungnya ketinggalan di kereta."],
      ["飲み物、買っとくね。", "Nomimono, kattoku ne.", "Minumannya aku belikan dulu, ya."],
      ["もう寝なきゃ。", "Mou nenakya.", "Sudah harus tidur."],
    ],
  ],
  // 13. Mendengar per kelompok kata
  [
    [
      ["毎朝 / 七時に", "Maiasa / shichiji ni", "setiap pagi / pukul tujuh"],
      ["駅まで / 歩いて", "Eki made / aruite", "sampai stasiun / berjalan kaki"],
      ["友達と / 一緒に", "Tomodachi to / issho ni", "dengan teman / bersama"],
      ["この店の / パンは", "Kono mise no / pan wa", "roti / di toko ini", ["Kelompok kata (bunsetsu) terdiri dari...", "kata + partikel", "satu huruf", "satu kanji", "satu kalimat penuh"]],
    ],
    [
      ["私は / 毎朝 / 七時に / 家を出ます。", "Watashi wa / maiasa / shichiji ni / ie o demasu.", "Saya setiap pagi keluar rumah pukul tujuh."],
      ["駅まで / 歩いて / 十分ぐらいです。", "Eki made / aruite / juppun gurai desu.", "Sampai stasiun sekitar sepuluh menit berjalan kaki."],
      ["週末は / 友達と / 一緒に / 映画を見ます。", "Shuumatsu wa / tomodachi to / issho ni / eiga o mimasu.", "Akhir pekan saya menonton film bersama teman."],
      ["この店の / パンは / とても / 人気があります。", "Kono mise no / pan wa / totemo / ninki ga arimasu.", "Roti di toko ini sangat populer."],
    ],
  ],
  // 14. Mengatur kecepatan
  [
    [
      ["ゆっくり", "Yukkuri", "pelan-pelan"],
      ["はっきり", "Hakkiri", "dengan jelas"],
      ["自然に", "Shizen ni", "secara alami"],
      ["速すぎる", "Hayasugiru", "terlalu cepat", ["Urutan latihan kecepatan yang dianjurkan adalah...", "lambat → sedang → alami", "alami → lambat", "cepat → sangat cepat", "sedang saja"]],
    ],
    [
      ["もう少しはっきり話してください。", "Mou sukoshi hakkiri hanashite kudasai.", "Tolong bicara sedikit lebih jelas."],
      ["少し考える時間をください。", "Sukoshi kangaeru jikan o kudasai.", "Beri saya sedikit waktu untuk berpikir."],
      ["駅に着いたら、電話しますね。", "Eki ni tsuitara, denwa shimasu ne.", "Kalau sudah sampai di stasiun, saya telepon, ya."],
      ["お先に失礼します。お疲れさまでした。", "Osaki ni shitsurei shimasu. Otsukaresama deshita.", "Saya pamit duluan. Terima kasih atas kerja kerasnya."],
    ],
  ],
  // 15. Ketepatan mora
  [
    [
      ["びょうき", "Byouki", "sakit / penyakit (3 mora)"],
      ["びよういん", "Biyouin", "salon kecantikan (5 mora)"],
      ["しゅっせき", "Shusseki", "kehadiran (4 mora)"],
      ["きって", "Kitte", "perangko (3 mora)", ["Berapa mora dalam しゅっせき?", "4", "3", "5", "6"]],
    ],
    [
      ["びょうきで学校を休みました。", "Byouki de gakkou o yasumimashita.", "Saya tidak masuk sekolah karena sakit."],
      ["明日、髪を切りにびよういんへ行きます。", "Ashita, kami o kiri ni biyouin e ikimasu.", "Besok saya ke salon untuk potong rambut."],
      ["会議に出席する人は十人です。", "Kaigi ni shusseki suru hito wa juunin desu.", "Orang yang hadir di rapat ada sepuluh."],
      ["郵便局で切手を五枚買いました。", "Yuubinkyoku de kitte o gomai kaimashita.", "Saya membeli lima lembar perangko di kantor pos."],
    ],
  ],
  // 16. Ritme kata kanji
  [
    [
      ["学生", "Gakusei", "pelajar (4 mora)"],
      ["電車", "Densha", "kereta (3 mora)"],
      ["約束", "Yakusoku", "janji (4 mora)"],
      ["写真", "Shashin", "foto (3 mora)", ["Berapa mora dalam 約束 (yakusoku)?", "4", "3", "2", "5"]],
    ],
    [
      ["約束の時間に遅れないでください。", "Yakusoku no jikan ni okurenaide kudasai.", "Jangan terlambat dari jam janjian."],
      ["電車の中で寝てしまいました。", "Densha no naka de nete shimaimashita.", "Saya ketiduran di dalam kereta."],
      ["学生のとき、よく図書館に行きました。", "Gakusei no toki, yoku toshokan ni ikimashita.", "Waktu masih pelajar, saya sering ke perpustakaan."],
      ["卒業式の写真を見せてください。", "Sotsugyoushiki no shashin o misete kudasai.", "Tolong perlihatkan foto upacara kelulusan."],
    ],
  ],
  // 17. Kata majemuk
  [
    [
      ["春休み", "Haruyasumi", "libur musim semi"],
      ["雨水", "Amamizu", "air hujan"],
      ["駅員さん", "Ekiin san", "petugas stasiun"],
      ["自動販売機", "Jidou hanbaiki", "mesin penjual otomatis", ["Kata majemuk biasanya diucapkan dengan...", "satu puncak nada", "nada tinggi di setiap kata", "jeda di tengah", "tanpa nada sama sekali"]],
    ],
    [
      ["春休みに祖母の家へ行きます。", "Haruyasumi ni sobo no ie e ikimasu.", "Saat libur musim semi saya ke rumah nenek."],
      ["自動販売機で冷たいお茶を買いました。", "Jidou hanbaiki de tsumetai ocha o kaimashita.", "Saya membeli teh dingin di mesin penjual otomatis."],
      ["駅員さんに道を聞きました。", "Ekiin san ni michi o kikimashita.", "Saya bertanya jalan kepada petugas stasiun."],
      ["雨水をためて、花にやります。", "Amamizu o tamete, hana ni yarimasu.", "Saya menampung air hujan lalu menyiram bunga."],
    ],
  ],
  // 18. Rekam dan ulangi
  [
    [
      ["ところです", "Tokoro desu", "baru saja / sedang akan"],
      ["延期になった", "Enki ni natta", "jadi ditunda"],
      ["忘れてしまった", "Wasurete shimatta", "terlanjur lupa"],
      ["入っている", "Haitte iru", "ada di dalam", ["Saat merekam diri, sebaiknya kamu memperbaiki...", "satu hal setiap kali", "semua hal sekaligus", "tidak perlu memperbaiki", "hanya kecepatan"]],
    ],
    [
      ["今、ちょうどご飯を食べているところです。", "Ima, choudo gohan o tabete iru tokoro desu.", "Saya sedang makan sekarang."],
      ["かばんの中に財布が入っていません。", "Kaban no naka ni saifu ga haitte imasen.", "Di dalam tas tidak ada dompet."],
      ["彼女の誕生日を忘れてしまいました。", "Kanojo no tanjoubi o wasurete shimaimashita.", "Saya lupa ulang tahun pacar saya."],
      ["明日の旅行は台風で中止になりました。", "Ashita no ryokou wa taifuu de chuushi ni narimashita.", "Perjalanan besok dibatalkan karena topan."],
    ],
  ],
  // 19. Percakapan alami
  [
    [
      ["どっか", "Dokka", "ke mana gitu (santai)"],
      ["とか", "Toka", "misalnya / atau semacamnya"],
      ["調べとく", "Shirabetoku", "akan kucek dulu"],
      ["ありがと", "Arigato", "makasih (santai)", ["Bentuk santai dari どこか adalah...", "どっか", "どこっか", "どか", "どこか (tidak berubah)"]],
    ],
    [
      ["週末、どっか遊びに行こうよ。", "Shuumatsu, dokka asobi ni ikou yo.", "Akhir pekan, ayo main ke mana gitu."],
      ["映画とか、カラオケとか、どう？", "Eiga toka, karaoke toka, dou?", "Film atau karaoke, gimana?"],
      ["じゃ、時間調べとくね。", "Ja, jikan shirabetoku ne.", "Ya sudah, jamnya kucek dulu, ya."],
      ["ありがと。また連絡してね。", "Arigato. Mata renraku shite ne.", "Makasih. Kabari lagi, ya."],
    ],
  ],
  // 20. Ulasan pronunciation N4
  [
    [
      ["もうすぐ", "Mousugu", "sebentar lagi"],
      ["乗り方", "Norikata", "cara naik"],
      ["どこへでも", "Doko e demo", "ke mana pun"],
      ["続けます", "Tsuzukemasu", "terus melanjutkan", ["Romaji yang benar untuk 乗り方 adalah...", "norikata", "norikatta", "noorikata", "norigata"]],
    ],
    [
      ["もうすぐ日本語の試験があります。", "Mousugu Nihongo no shiken ga arimasu.", "Sebentar lagi ada ujian bahasa Jepang."],
      ["最初はバスの乗り方が分かりませんでした。", "Saisho wa basu no norikata ga wakarimasen deshita.", "Awalnya saya tidak tahu cara naik bus."],
      ["今では、自転車でどこへでも行けます。", "Ima de wa, jitensha de doko e demo ikemasu.", "Sekarang saya bisa pergi ke mana pun dengan sepeda."],
      ["これからも、毎日少しずつ話す練習を続けます。", "Korekara mo, mainichi sukoshi zutsu hanasu renshuu o tsuzukemasu.", "Ke depannya pun, saya terus berlatih berbicara sedikit demi sedikit setiap hari."],
    ],
  ],
];
