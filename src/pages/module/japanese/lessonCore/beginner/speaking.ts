import type { LessonCoreTuple } from '../types';

// Speaking N5 (dialog A/B) — one entry per lesson (index = lesson - 1).
export const speaking: LessonCoreTuple[] = [
  ['Memperkenalkan diri', ['Urutan jikoshoukai: はじめまして → nama → asal → どうぞよろしくお願いします.', 'Sebut nama keluarga atau nama panggilan, lalu tunduk ringan saat salam penutup.'], [
    ['はじめまして。リナです。', 'Hajimemashite. Rina desu.', 'Senang berkenalan. Saya Rina.'],
    ['はじめまして。佐藤です。', 'Hajimemashite. Satou desu.', 'Senang berkenalan. Saya Sato.'],
    ['ジャカルタから来ました。', 'Jakaruta kara kimashita.', 'Saya datang dari Jakarta.'],
    ['どうぞよろしくお願いします。', 'Douzo yoroshiku onegai shimasu.', 'Mohon bantuannya / salam kenal.'],
  ]],
  ['Salam sehari-hari', ['Salam berubah sesuai waktu: おはようございます (pagi), こんにちは (siang), こんばんは (malam).', 'Balas お元気ですか dengan はい、元気です + pertanyaan balik.'], [
    ['おはようございます。', 'Ohayou gozaimasu.', 'Selamat pagi.'],
    ['お元気ですか。', 'Ogenki desu ka.', 'Apa kabar?'],
    ['はい、元気です。リナさんは？', 'Hai, genki desu. Rina san wa?', 'Ya, baik. Kalau Rina?'],
    ['じゃ、また明日。', 'Ja, mata ashita.', 'Kalau begitu, sampai besok.'],
  ]],
  ['Memesan makanan', ['Pesan dengan Nama makanan + をください atau 〜にします.', 'Pelayan sering bertanya ご注文は？ dan お飲み物は？'], [
    ['すみません、メニューをお願いします。', 'Sumimasen, menyuu o onegai shimasu.', 'Permisi, minta menunya.'],
    ['ご注文はお決まりですか。', 'Gochuumon wa okimari desu ka.', 'Sudah menentukan pesanan?'],
    ['ラーメンを一つください。', 'Raamen o hitotsu kudasai.', 'Minta satu ramen.'],
    ['飲み物はお茶にします。', 'Nomimono wa ocha ni shimasu.', 'Minumannya saya pilih teh.'],
  ]],
  ['Menanyakan harga', ['Tanya harga dengan いくらですか; tunjuk barang dengan これ/それ.', 'Angka harga: 百 (hyaku), 千 (sen), 万 (man) + 円 (en).'], [
    ['このシャツはいくらですか。', 'Kono shatsu wa ikura desu ka.', 'Kemeja ini berapa harganya?'],
    ['二千円です。', 'Nisen en desu.', 'Dua ribu yen.'],
    ['ちょっと高いですね。', 'Chotto takai desu ne.', 'Agak mahal, ya.'],
    ['じゃ、こちらは千五百円です。', 'Ja, kochira wa sen gohyaku en desu.', 'Kalau begitu, yang ini seribu lima ratus yen.'],
  ]],
  ['Menanyakan jam', ['Tanya jam dengan 今、何時ですか; jawab 〜時〜分です.', 'Perhatikan bacaan khusus: 四時 (yoji), 九時 (kuji), 半 = setengah.'], [
    ['すみません、今何時ですか。', 'Sumimasen, ima nanji desu ka.', 'Permisi, sekarang jam berapa?'],
    ['四時半です。', 'Yoji han desu.', 'Jam setengah lima.'],
    ['会議は何時からですか。', 'Kaigi wa nanji kara desu ka.', 'Rapatnya mulai jam berapa?'],
    ['五時十分からです。', 'Goji juppun kara desu.', 'Mulai jam lima lewat sepuluh.'],
  ]],
  ['Rutinitas harian', ['Ceritakan urutan kegiatan dengan それから (lalu) dan 〜時に.', 'Pertanyaan umum: 何時に寝ますか / 朝ご飯を食べますか.'], [
    ['毎朝何時に起きますか。', 'Maiasa nanji ni okimasu ka.', 'Setiap pagi kamu bangun jam berapa?'],
    ['六時に起きて、シャワーを浴びます。', 'Rokuji ni okite, shawaa o abimasu.', 'Saya bangun jam enam lalu mandi.'],
    ['それから、何をしますか。', 'Sorekara, nani o shimasu ka.', 'Setelah itu, apa yang kamu lakukan?'],
    ['朝ご飯を食べて、会社へ行きます。', 'Asagohan o tabete, kaisha e ikimasu.', 'Saya sarapan lalu pergi ke kantor.'],
  ]],
  ['Suka dan tidak suka', ['好きです / 嫌いです memakai が untuk benda yang disukai.', 'Lembutkan penolakan dengan あまり好きじゃありません.'], [
    ['どんな食べ物が好きですか。', 'Donna tabemono ga suki desu ka.', 'Makanan seperti apa yang kamu suka?'],
    ['すしが大好きです。', 'Sushi ga daisuki desu.', 'Saya sangat suka sushi.'],
    ['納豆はどうですか。', 'Nattou wa dou desu ka.', 'Kalau natto bagaimana?'],
    ['納豆はあまり好きじゃありません。', 'Nattou wa amari suki ja arimasen.', 'Saya kurang suka natto.'],
  ]],
  ['Mengajak teman', ['Ajak dengan 〜ませんか; terima dengan ぜひ, tolak halus dengan ちょっと….', 'Penolakan Jepang jarang langsung: 土曜日はちょっと… sudah cukup.'], [
    ['土曜日、映画を見に行きませんか。', 'Doyoubi, eiga o mi ni ikimasen ka.', 'Hari Sabtu, mau pergi menonton film?'],
    ['すみません、土曜日はちょっと…。', 'Sumimasen, doyoubi wa chotto...', 'Maaf, hari Sabtu agak… (tidak bisa).'],
    ['じゃ、日曜日はどうですか。', 'Ja, nichiyoubi wa dou desu ka.', 'Kalau begitu, hari Minggu bagaimana?'],
    ['日曜日なら大丈夫です。ぜひ。', 'Nichiyoubi nara daijoubu desu. Zehi.', 'Kalau Minggu bisa. Tentu saja.'],
  ]],
  ['Berbelanja di toko', ['Tanya ketersediaan dengan 〜はありますか; minta lihat dengan 見せてください.', 'Penjual menjawab dengan sopan: こちらです, かしこまりました.'], [
    ['いらっしゃいませ。', 'Irasshaimase.', 'Selamat datang.'],
    ['黒い靴はありますか。', 'Kuroi kutsu wa arimasu ka.', 'Ada sepatu hitam?'],
    ['はい、こちらです。', 'Hai, kochira desu.', 'Ya, ini dia.'],
    ['じゃ、これをください。', 'Ja, kore o kudasai.', 'Kalau begitu, saya ambil ini.'],
  ]],
  ['Menanyakan arah', ['Tanya lokasi: 〜はどこですか; arah: まっすぐ, 右, 左, 曲がってください.', 'Akhiri dengan ありがとうございました setelah dibantu.'], [
    ['すみません、郵便局はどこですか。', 'Sumimasen, yuubinkyoku wa doko desu ka.', 'Permisi, kantor pos di mana?'],
    ['この道をまっすぐ行ってください。', 'Kono michi o massugu itte kudasai.', 'Silakan jalan lurus di jalan ini.'],
    ['二つ目の角を右に曲がってください。', 'Futatsume no kado o migi ni magatte kudasai.', 'Belok kanan di tikungan kedua.'],
    ['わかりました。ありがとうございました。', 'Wakarimashita. Arigatou gozaimashita.', 'Saya mengerti. Terima kasih banyak.'],
  ]],
  ['Bercerita tentang keluarga', ['Keluarga sendiri: 父, 母, 兄, 姉; keluarga orang lain: お父さん, お母さん.', 'Hitung orang: 一人, 二人, 三人, 四人 (yonin), 五人.'], [
    ['何人家族ですか。', 'Nannin kazoku desu ka.', 'Keluargamu berapa orang?'],
    ['四人家族です。父と母と弟がいます。', 'Yonin kazoku desu. Chichi to haha to otouto ga imasu.', 'Keluarga empat orang. Ada ayah, ibu, dan adik laki-laki.'],
    ['弟さんは何歳ですか。', 'Otouto san wa nansai desu ka.', 'Adik laki-lakimu umur berapa?'],
    ['十五歳で、高校生です。', 'Juugosai de, koukousei desu.', 'Lima belas tahun, siswa SMA.'],
  ]],
  ['Hobi', ['Tanya hobi: 趣味は何ですか; jawab 趣味は〜です atau 〜ことです.', 'Tambahkan frekuensi: よく, ときどき, 毎週.'], [
    ['趣味は何ですか。', 'Shumi wa nan desu ka.', 'Hobimu apa?'],
    ['写真を撮ることです。', 'Shashin o toru koto desu.', 'Memotret.'],
    ['どこでよく撮りますか。', 'Doko de yoku torimasu ka.', 'Biasanya memotret di mana?'],
    ['週末は公園でよく撮ります。', 'Shuumatsu wa kouen de yoku torimasu.', 'Akhir pekan saya sering memotret di taman.'],
  ]],
  ['Obrolan cuaca', ['Obrolan ringan sering dibuka dengan cuaca: いい天気ですね.', 'Partikel ね mengajak lawan bicara setuju; balas そうですね.'], [
    ['今日はいい天気ですね。', 'Kyou wa ii tenki desu ne.', 'Hari ini cuacanya bagus, ya.'],
    ['そうですね。でも、ちょっと暑いです。', 'Sou desu ne. Demo, chotto atsui desu.', 'Benar. Tapi agak panas.'],
    ['明日も晴れますか。', 'Ashita mo haremasu ka.', 'Besok juga cerah?'],
    ['いいえ、明日は雨だと思いますよ。', 'Iie, ashita wa ame da to omoimasu yo.', 'Tidak, saya pikir besok hujan.'],
  ]],
  ['Bicara tentang sekolah', ['Tanya pelajaran favorit: どの科目が好きですか.', 'Tingkat sekolah: 小学生, 中学生, 高校生, 大学生.'], [
    ['どの科目が好きですか。', 'Dono kamoku ga suki desu ka.', 'Mata pelajaran apa yang kamu suka?'],
    ['数学が好きです。英語は苦手です。', 'Suugaku ga suki desu. Eigo wa nigate desu.', 'Saya suka matematika. Bahasa Inggris saya lemah.'],
    ['学校は何時に終わりますか。', 'Gakkou wa nanji ni owarimasu ka.', 'Sekolah selesai jam berapa?'],
    ['三時に終わります。', 'Sanji ni owarimasu.', 'Selesai jam tiga.'],
  ]],
  ['Percakapan kerja dasar', ['Salam kantor: おはようございます saat datang, お先に失礼します saat pulang lebih dulu.', 'Balas rekan yang pulang dengan お疲れさまでした.'], [
    ['お仕事は何ですか。', 'Oshigoto wa nan desu ka.', 'Pekerjaanmu apa?'],
    ['銀行で働いています。', 'Ginkou de hataraite imasu.', 'Saya bekerja di bank.'],
    ['お先に失礼します。', 'Osaki ni shitsurei shimasu.', 'Saya pamit duluan.'],
    ['お疲れさまでした。', 'Otsukaresama deshita.', 'Terima kasih atas kerja kerasnya hari ini.'],
  ]],
  ['Ungkapan saat bepergian', ['Di stasiun: 〜までいくらですか, 〜行きはどれですか.', 'Minta bantuan dengan すみません di awal kalimat.'], [
    ['京都までいくらですか。', 'Kyouto made ikura desu ka.', 'Sampai Kyoto berapa?'],
    ['大阪行きの電車はどれですか。', 'Oosaka iki no densha wa dore desu ka.', 'Kereta tujuan Osaka yang mana?'],
    ['三番線です。', 'Sanbansen desu.', 'Jalur tiga.'],
    ['トイレはどこにありますか。', 'Toire wa doko ni arimasu ka.', 'Toilet ada di mana?'],
  ]],
  ['Meminta maaf', ['すみません untuk kesalahan kecil; ごめんなさい lebih akrab; 申し訳ありません sangat formal.', 'Sertakan alasan singkat lalu janji: 気をつけます.'], [
    ['遅れて、すみません。', 'Okurete, sumimasen.', 'Maaf, saya terlambat.'],
    ['電車が止まりました。', 'Densha ga tomarimashita.', 'Keretanya berhenti.'],
    ['大丈夫ですよ。', 'Daijoubu desu yo.', 'Tidak apa-apa.'],
    ['次から気をつけます。', 'Tsugi kara ki o tsukemasu.', 'Lain kali saya akan berhati-hati.'],
  ]],
  ['Berterima kasih', ['ありがとうございます untuk sekarang, ありがとうございました untuk yang sudah selesai.', 'Balas terima kasih dengan いいえ、どういたしまして.'], [
    ['これ、プレゼントです。', 'Kore, purezento desu.', 'Ini hadiah untukmu.'],
    ['わあ、ありがとうございます。', 'Waa, arigatou gozaimasu.', 'Wah, terima kasih.'],
    ['昨日は本当にありがとうございました。', 'Kinou wa hontou ni arigatou gozaimashita.', 'Terima kasih banyak untuk kemarin.'],
    ['いいえ、どういたしまして。', 'Iie, douitashimashite.', 'Sama-sama.'],
  ]],
  ['Pendapat sederhana', ['Tanya pendapat dengan どうですか / どう思いますか.', 'Jawab dengan 〜と思います dan alasan singkat 〜から.'], [
    ['日本の生活はどうですか。', 'Nihon no seikatsu wa dou desu ka.', 'Bagaimana kehidupan di Jepang?'],
    ['便利ですが、物価が高いと思います。', 'Benri desu ga, bukka ga takai to omoimasu.', 'Praktis, tapi menurut saya harga-harga mahal.'],
    ['日本の食べ物はどう思いますか。', 'Nihon no tabemono wa dou omoimasu ka.', 'Bagaimana pendapatmu tentang makanan Jepang?'],
    ['とてもおいしいと思います。', 'Totemo oishii to omoimasu.', 'Menurut saya sangat enak.'],
  ]],
  ['Ulasan speaking N5', ['Rangkai salam, perkenalan, pertanyaan, dan ajakan dalam satu percakapan pendek.', 'Gunakan aizuchi: そうですか, いいですね, なるほど.'], [
    ['日本語の勉強はどうですか。', 'Nihongo no benkyou wa dou desu ka.', 'Bagaimana belajar bahasa Jepangnya?'],
    ['毎日少しずつ勉強しています。', 'Mainichi sukoshi zutsu benkyou shite imasu.', 'Saya belajar sedikit demi sedikit setiap hari.'],
    ['そうですか。すごいですね。', 'Sou desu ka. Sugoi desu ne.', 'Begitu ya. Hebat.'],
    ['今度一緒に練習しましょう。', 'Kondo issho ni renshuu shimashou.', 'Lain kali ayo berlatih bersama.'],
  ]],
];
