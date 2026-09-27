import type { JapaneseLevelId } from './japaneseModuleData';

export type JapaneseSentence = { japanese: string; romaji: string; meaning: string };

export type JapaneseGrammarPoint = {
  pattern: string;
  meaning: string;
  formation: string;
  examples: [JapaneseSentence, JapaneseSentence];
};

// One grammar point per grammar lesson (index = lesson - 1). Lesson 20 of each
// level is a review lesson and is assembled from the other points.
export const japaneseGrammarBank: Record<JapaneseLevelId, JapaneseGrammarPoint[]> = {
  beginner: [
    {
      pattern: 'N です / N じゃありません',
      meaning: 'menyatakan "adalah" / "bukan" secara sopan',
      formation: 'Kata benda + です (positif) atau じゃありません (negatif).',
      examples: [
        { japanese: '私は学生です。', romaji: 'Watashi wa gakusei desu.', meaning: 'Saya pelajar.' },
        { japanese: '田中さんは先生じゃありません。', romaji: 'Tanaka-san wa sensei ja arimasen.', meaning: 'Pak Tanaka bukan guru.' },
      ],
    },
    {
      pattern: 'は vs が',
      meaning: 'は menandai topik; が menandai subjek baru atau jawaban dari kata tanya',
      formation: 'Topik + は + komentar; kata tanya/subjek baru + が + predikat.',
      examples: [
        { japanese: '私は日本語が好きです。', romaji: 'Watashi wa nihongo ga suki desu.', meaning: 'Saya suka bahasa Jepang.' },
        { japanese: '誰が来ましたか。', romaji: 'Dare ga kimashita ka.', meaning: 'Siapa yang datang?' },
      ],
    },
    {
      pattern: 'これ / それ / あれ',
      meaning: 'kata tunjuk: dekat pembicara / dekat pendengar / jauh dari keduanya',
      formation: 'これ・それ・あれ + は + N + です; sebelum kata benda pakai この・その・あの.',
      examples: [
        { japanese: 'これは私の本です。', romaji: 'Kore wa watashi no hon desu.', meaning: 'Ini buku saya.' },
        { japanese: 'あの建物は駅です。', romaji: 'Ano tatemono wa eki desu.', meaning: 'Gedung itu (di sana) stasiun.' },
      ],
    },
    {
      pattern: 'N を V-ます',
      meaning: 'を menandai objek langsung dari kata kerja',
      formation: 'Objek + を + kata kerja bentuk ます.',
      examples: [
        { japanese: '毎朝コーヒーを飲みます。', romaji: 'Maiasa koohii o nomimasu.', meaning: 'Setiap pagi saya minum kopi.' },
        { japanese: '日本語を勉強します。', romaji: 'Nihongo o benkyou shimasu.', meaning: 'Saya belajar bahasa Jepang.' },
      ],
    },
    {
      pattern: 'に vs で',
      meaning: 'に = tujuan, waktu, atau tempat keberadaan; で = tempat aktivitas atau alat',
      formation: 'Tempat + に + 行きます/います; tempat + で + aktivitas.',
      examples: [
        { japanese: '七時に起きます。', romaji: 'Shichi-ji ni okimasu.', meaning: 'Saya bangun jam tujuh.' },
        { japanese: '図書館で本を読みます。', romaji: 'Toshokan de hon o yomimasu.', meaning: 'Saya membaca buku di perpustakaan.' },
      ],
    },
    {
      pattern: 'い-adjective',
      meaning: 'kata sifat berakhiran い yang berubah bentuk sendiri',
      formation: 'Negatif: い → くないです; lampau: い → かったです.',
      examples: [
        { japanese: 'この部屋は広いです。', romaji: 'Kono heya wa hiroi desu.', meaning: 'Kamar ini luas.' },
        { japanese: '今日は寒くないです。', romaji: 'Kyou wa samukunai desu.', meaning: 'Hari ini tidak dingin.' },
      ],
    },
    {
      pattern: 'な-adjective',
      meaning: 'kata sifat yang memakai な sebelum kata benda',
      formation: 'Sebelum kata benda: + な + N; negatif: じゃありません.',
      examples: [
        { japanese: 'ここは静かな町です。', romaji: 'Koko wa shizuka na machi desu.', meaning: 'Ini kota yang tenang.' },
        { japanese: '電車は便利です。', romaji: 'Densha wa benri desu.', meaning: 'Kereta itu praktis.' },
      ],
    },
    {
      pattern: 'V-ました / V-ませんでした',
      meaning: 'bentuk lampau sopan (positif dan negatif)',
      formation: 'ます → ました (sudah), ません → ませんでした (tidak).',
      examples: [
        { japanese: '昨日映画を見ました。', romaji: 'Kinou eiga o mimashita.', meaning: 'Kemarin saya menonton film.' },
        { japanese: '朝ご飯を食べませんでした。', romaji: 'Asagohan o tabemasen deshita.', meaning: 'Saya tidak sarapan.' },
      ],
    },
    {
      pattern: 'から / まで',
      meaning: 'dari ... sampai ... (waktu atau tempat)',
      formation: 'Titik awal + から, titik akhir + まで.',
      examples: [
        { japanese: '九時から五時まで働きます。', romaji: 'Ku-ji kara go-ji made hatarakimasu.', meaning: 'Saya bekerja dari jam 9 sampai jam 5.' },
        { japanese: '家から駅まで歩きます。', romaji: 'Ie kara eki made arukimasu.', meaning: 'Saya berjalan dari rumah ke stasiun.' },
      ],
    },
    {
      pattern: 'と / や',
      meaning: 'と = dan (daftar lengkap); や = dan lain-lain (contoh sebagian)',
      formation: 'N1 + と + N2 (semua disebut); N1 + や + N2 (sebagian).',
      examples: [
        { japanese: 'パンと卵を買いました。', romaji: 'Pan to tamago o kaimashita.', meaning: 'Saya membeli roti dan telur.' },
        { japanese: 'かばんに本やノートがあります。', romaji: 'Kaban ni hon ya nooto ga arimasu.', meaning: 'Di tas ada buku, buku catatan, dan lainnya.' },
      ],
    },
    {
      pattern: 'V-ませんか / V-ましょう',
      meaning: 'mengajak dengan sopan / menyetujui ajakan',
      formation: 'Kata kerja ます → ませんか (ajakan), ましょう (ayo).',
      examples: [
        { japanese: '一緒に昼ご飯を食べませんか。', romaji: 'Issho ni hirugohan o tabemasen ka.', meaning: 'Maukah makan siang bersama?' },
        { japanese: 'いいですね。行きましょう。', romaji: 'Ii desu ne. Ikimashou.', meaning: 'Boleh. Ayo pergi.' },
      ],
    },
    {
      pattern: 'V-たいです',
      meaning: 'ingin melakukan sesuatu',
      formation: 'Kata kerja ます → ganti ます dengan たいです.',
      examples: [
        { japanese: '日本へ行きたいです。', romaji: 'Nihon e ikitai desu.', meaning: 'Saya ingin pergi ke Jepang.' },
        { japanese: '冷たい水が飲みたいです。', romaji: 'Tsumetai mizu ga nomitai desu.', meaning: 'Saya ingin minum air dingin.' },
      ],
    },
    {
      pattern: 'V-てください',
      meaning: 'meminta seseorang melakukan sesuatu',
      formation: 'Bentuk て + ください.',
      examples: [
        { japanese: 'ここに名前を書いてください。', romaji: 'Koko ni namae o kaite kudasai.', meaning: 'Tolong tulis nama di sini.' },
        { japanese: 'もう一度言ってください。', romaji: 'Mou ichido itte kudasai.', meaning: 'Tolong katakan sekali lagi.' },
      ],
    },
    {
      pattern: 'V-てもいいです',
      meaning: 'meminta atau memberi izin',
      formation: 'Bentuk て + もいいです(か).',
      examples: [
        { japanese: '写真を撮ってもいいですか。', romaji: 'Shashin o totte mo ii desu ka.', meaning: 'Bolehkah saya memotret?' },
        { japanese: 'ここに座ってもいいですよ。', romaji: 'Koko ni suwatte mo ii desu yo.', meaning: 'Boleh duduk di sini.' },
      ],
    },
    {
      pattern: 'V-てはいけません',
      meaning: 'larangan: tidak boleh melakukan sesuatu',
      formation: 'Bentuk て + はいけません.',
      examples: [
        { japanese: '教室で食べてはいけません。', romaji: 'Kyoushitsu de tabete wa ikemasen.', meaning: 'Tidak boleh makan di kelas.' },
        { japanese: 'ここでたばこを吸ってはいけません。', romaji: 'Koko de tabako o sutte wa ikemasen.', meaning: 'Tidak boleh merokok di sini.' },
      ],
    },
    {
      pattern: 'N があります / N がいます',
      meaning: 'ada: あります untuk benda mati, います untuk makhluk hidup',
      formation: 'Tempat + に + N + が + あります/います.',
      examples: [
        { japanese: '机の上に本があります。', romaji: 'Tsukue no ue ni hon ga arimasu.', meaning: 'Ada buku di atas meja.' },
        { japanese: '公園に子どもがいます。', romaji: 'Kouen ni kodomo ga imasu.', meaning: 'Ada anak-anak di taman.' },
      ],
    },
    {
      pattern: 'N ができます',
      meaning: 'bisa / mampu melakukan sesuatu',
      formation: 'Kemampuan (N) + が + できます; kata kerja kamus + ことができます.',
      examples: [
        { japanese: '私は水泳ができます。', romaji: 'Watashi wa suiei ga dekimasu.', meaning: 'Saya bisa berenang.' },
        { japanese: '漢字を読むことができます。', romaji: 'Kanji o yomu koto ga dekimasu.', meaning: 'Saya bisa membaca kanji.' },
      ],
    },
    {
      pattern: '〜から (alasan)',
      meaning: 'karena ... (alasan diletakkan sebelum から)',
      formation: 'Alasan + から、hasil.',
      examples: [
        { japanese: '雨ですから、出かけません。', romaji: 'Ame desu kara, dekakemasen.', meaning: 'Karena hujan, saya tidak keluar.' },
        { japanese: '時間がないから、タクシーで行きます。', romaji: 'Jikan ga nai kara, takushii de ikimasu.', meaning: 'Karena tidak ada waktu, saya naik taksi.' },
      ],
    },
    {
      pattern: '〜と思います',
      meaning: 'saya pikir / menurut saya',
      formation: 'Bentuk biasa + と思います (kata benda/な-adj + だ).',
      examples: [
        { japanese: '明日は晴れると思います。', romaji: 'Ashita wa hareru to omoimasu.', meaning: 'Saya pikir besok cerah.' },
        { japanese: 'この店は安いと思います。', romaji: 'Kono mise wa yasui to omoimasu.', meaning: 'Menurut saya toko ini murah.' },
      ],
    },
  ],
  elementary: [
    {
      pattern: 'て-form (urutan aksi)',
      meaning: 'menghubungkan beberapa aksi secara berurutan',
      formation: 'V1-て、V2-て、V3-ます.',
      examples: [
        { japanese: '朝起きて、顔を洗って、学校へ行きます。', romaji: 'Asa okite, kao o aratte, gakkou e ikimasu.', meaning: 'Pagi bangun, cuci muka, lalu ke sekolah.' },
        { japanese: '駅で降りて、右に曲がってください。', romaji: 'Eki de orite, migi ni magatte kudasai.', meaning: 'Turun di stasiun, lalu belok kanan.' },
      ],
    },
    {
      pattern: 'V-ている',
      meaning: 'sedang berlangsung atau keadaan hasil',
      formation: 'Bentuk て + いる/います.',
      examples: [
        { japanese: '今、雨が降っています。', romaji: 'Ima, ame ga futte imasu.', meaning: 'Sekarang sedang hujan.' },
        { japanese: '姉は結婚しています。', romaji: 'Ane wa kekkon shite imasu.', meaning: 'Kakak perempuan saya sudah menikah.' },
      ],
    },
    {
      pattern: 'V-ない form',
      meaning: 'bentuk negatif biasa; dasar untuk ないでください dan なければ',
      formation: 'Golongan 1: う → あない (書く → 書かない); golongan 2: る → ない.',
      examples: [
        { japanese: '今日は肉を食べない。', romaji: 'Kyou wa niku o tabenai.', meaning: 'Hari ini aku tidak makan daging.' },
        { japanese: 'ここで写真を撮らないでください。', romaji: 'Koko de shashin o toranaide kudasai.', meaning: 'Tolong jangan memotret di sini.' },
      ],
    },
    {
      pattern: 'V-た form',
      meaning: 'bentuk lampau biasa (percakapan santai)',
      formation: 'Ubah て → た (書いて → 書いた, 食べて → 食べた).',
      examples: [
        { japanese: '昨日、友達と映画を見た。', romaji: 'Kinou, tomodachi to eiga o mita.', meaning: 'Kemarin aku nonton film dengan teman.' },
        { japanese: 'もう宿題を出した？', romaji: 'Mou shukudai o dashita?', meaning: 'Sudah mengumpulkan PR?' },
      ],
    },
    {
      pattern: 'V-たことがある',
      meaning: 'pernah melakukan sesuatu (pengalaman)',
      formation: 'Bentuk た + ことがあります.',
      examples: [
        { japanese: '富士山に登ったことがあります。', romaji: 'Fujisan ni nobotta koto ga arimasu.', meaning: 'Saya pernah mendaki Gunung Fuji.' },
        { japanese: '納豆を食べたことがありません。', romaji: 'Nattou o tabeta koto ga arimasen.', meaning: 'Saya belum pernah makan natto.' },
      ],
    },
    {
      pattern: 'V-たほうがいい',
      meaning: 'sebaiknya (memberi saran)',
      formation: 'Bentuk た + ほうがいいです; larangan halus: ない + ほうがいい.',
      examples: [
        { japanese: '熱があるなら、休んだほうがいいです。', romaji: 'Netsu ga aru nara, yasunda hou ga ii desu.', meaning: 'Kalau demam, sebaiknya istirahat.' },
        { japanese: '夜遅くまで起きないほうがいいですよ。', romaji: 'Yoru osoku made okinai hou ga ii desu yo.', meaning: 'Sebaiknya jangan begadang.' },
      ],
    },
    {
      pattern: '〜と思う',
      meaning: 'menyampaikan pendapat atau dugaan (bentuk biasa)',
      formation: 'Bentuk biasa + と思う; niat: V-よう + と思う.',
      examples: [
        { japanese: '彼はもう帰ったと思う。', romaji: 'Kare wa mou kaetta to omou.', meaning: 'Kurasa dia sudah pulang.' },
        { japanese: '来年、日本へ留学しようと思っています。', romaji: 'Rainen, Nihon e ryuugaku shiyou to omotte imasu.', meaning: 'Saya berencana kuliah di Jepang tahun depan.' },
      ],
    },
    {
      pattern: '〜と言う',
      meaning: 'mengutip ucapan orang lain',
      formation: '「kutipan langsung」と言いました / bentuk biasa + と言っていました.',
      examples: [
        { japanese: '先生は「明日テストがある」と言いました。', romaji: 'Sensei wa "ashita tesuto ga aru" to iimashita.', meaning: 'Guru berkata, "Besok ada tes."' },
        { japanese: '田中さんは少し遅れると言っていました。', romaji: 'Tanaka-san wa sukoshi okureru to itte imashita.', meaning: 'Tanaka bilang dia akan sedikit terlambat.' },
      ],
    },
    {
      pattern: '〜ので',
      meaning: 'karena (lebih halus dan objektif daripada から)',
      formation: 'Bentuk biasa + ので; kata benda/な-adj + なので.',
      examples: [
        { japanese: '道が混んでいたので、遅れました。', romaji: 'Michi ga konde ita node, okuremashita.', meaning: 'Karena jalan macet, saya terlambat.' },
        { japanese: '明日は休みなので、ゆっくり寝ます。', romaji: 'Ashita wa yasumi na node, yukkuri nemasu.', meaning: 'Karena besok libur, saya tidur santai.' },
      ],
    },
    {
      pattern: '〜のに',
      meaning: 'padahal (hasil tidak sesuai harapan)',
      formation: 'Bentuk biasa + のに; kata benda/な-adj + なのに.',
      examples: [
        { japanese: 'たくさん勉強したのに、試験に落ちました。', romaji: 'Takusan benkyou shita noni, shiken ni ochimashita.', meaning: 'Padahal sudah belajar banyak, saya gagal ujian.' },
        { japanese: '日曜日なのに、仕事があります。', romaji: 'Nichiyoubi na noni, shigoto ga arimasu.', meaning: 'Padahal hari Minggu, ada pekerjaan.' },
      ],
    },
    {
      pattern: 'V-ながら',
      meaning: 'sambil melakukan dua aksi bersamaan',
      formation: 'Kata kerja ます → ganti ます dengan ながら.',
      examples: [
        { japanese: '音楽を聞きながら勉強します。', romaji: 'Ongaku o kikinagara benkyou shimasu.', meaning: 'Saya belajar sambil mendengarkan musik.' },
        { japanese: '歩きながらスマホを見ないでください。', romaji: 'Arukinagara sumaho o minaide kudasai.', meaning: 'Jangan melihat ponsel sambil berjalan.' },
      ],
    },
    {
      pattern: '〜前に / 〜後で',
      meaning: 'sebelum ... / setelah ...',
      formation: 'V kamus + 前に; V-た + 後で; N + の前に / の後で.',
      examples: [
        { japanese: '寝る前に歯を磨きます。', romaji: 'Neru mae ni ha o migakimasu.', meaning: 'Saya sikat gigi sebelum tidur.' },
        { japanese: '授業の後で図書館へ行きます。', romaji: 'Jugyou no ato de toshokan e ikimasu.', meaning: 'Setelah kelas, saya ke perpustakaan.' },
      ],
    },
    {
      pattern: '〜予定です',
      meaning: 'rencana yang sudah dijadwalkan',
      formation: 'V kamus + 予定です; N + の予定です.',
      examples: [
        { japanese: '来週、大阪に出張する予定です。', romaji: 'Raishuu, Oosaka ni shucchou suru yotei desu.', meaning: 'Minggu depan saya dijadwalkan dinas ke Osaka.' },
        { japanese: '会議は三時からの予定です。', romaji: 'Kaigi wa san-ji kara no yotei desu.', meaning: 'Rapat dijadwalkan mulai jam tiga.' },
      ],
    },
    {
      pattern: '〜ようになる',
      meaning: 'menjadi bisa / mulai terbiasa melakukan sesuatu',
      formation: 'V kamus/potensial + ようになる.',
      examples: [
        { japanese: '日本語が話せるようになりました。', romaji: 'Nihongo ga hanaseru you ni narimashita.', meaning: 'Saya jadi bisa berbahasa Jepang.' },
        { japanese: '毎朝運動するようになりました。', romaji: 'Maiasa undou suru you ni narimashita.', meaning: 'Saya jadi rutin berolahraga setiap pagi.' },
      ],
    },
    {
      pattern: '〜かもしれない',
      meaning: 'mungkin (kemungkinan sekitar 50%)',
      formation: 'Bentuk biasa + かもしれません; kata benda/な-adj langsung + かもしれません.',
      examples: [
        { japanese: '午後は雨が降るかもしれません。', romaji: 'Gogo wa ame ga furu kamoshiremasen.', meaning: 'Sore mungkin hujan.' },
        { japanese: 'あの人は先生かもしれません。', romaji: 'Ano hito wa sensei kamoshiremasen.', meaning: 'Orang itu mungkin guru.' },
      ],
    },
    {
      pattern: '〜なければならない',
      meaning: 'harus (kewajiban)',
      formation: 'Bentuk ない → なければなりません (santai: なきゃ).',
      examples: [
        { japanese: '明日までにレポートを出さなければなりません。', romaji: 'Ashita made ni repooto o dasanakereba narimasen.', meaning: 'Saya harus menyerahkan laporan paling lambat besok.' },
        { japanese: '薬を飲まなければなりません。', romaji: 'Kusuri o nomanakereba narimasen.', meaning: 'Saya harus minum obat.' },
      ],
    },
    {
      pattern: 'V-られる (pasif dasar)',
      meaning: 'dikenai tindakan (pasif)',
      formation: 'Golongan 1: う → あれる (叱る → 叱られる); golongan 2: る → られる.',
      examples: [
        { japanese: '先生にほめられました。', romaji: 'Sensei ni homeraremashita.', meaning: 'Saya dipuji oleh guru.' },
        { japanese: '電車で足を踏まれました。', romaji: 'Densha de ashi o fumaremashita.', meaning: 'Kaki saya terinjak di kereta.' },
      ],
    },
    {
      pattern: 'Bentuk potensial',
      meaning: 'bisa / mampu melakukan sesuatu',
      formation: 'Golongan 1: う → える (読む → 読める); golongan 2: る → られる; する → できる.',
      examples: [
        { japanese: '漢字が少し読めます。', romaji: 'Kanji ga sukoshi yomemasu.', meaning: 'Saya bisa sedikit membaca kanji.' },
        { japanese: '朝早く起きられません。', romaji: 'Asa hayaku okiraremasen.', meaning: 'Saya tidak bisa bangun pagi-pagi.' },
      ],
    },
    {
      pattern: '〜と / 〜たら (kondisional)',
      meaning: 'と = setiap kali/otomatis; たら = jika/setelah (satu kejadian)',
      formation: 'V kamus + と; V-た + ら.',
      examples: [
        { japanese: 'このボタンを押すと、ドアが開きます。', romaji: 'Kono botan o osu to, doa ga akimasu.', meaning: 'Kalau tombol ini ditekan, pintu terbuka.' },
        { japanese: '駅に着いたら、電話してください。', romaji: 'Eki ni tsuitara, denwa shite kudasai.', meaning: 'Kalau sudah sampai stasiun, tolong telepon.' },
      ],
    },
  ],
  intermediate: [
    {
      pattern: '〜そう / 〜よう / 〜みたい',
      meaning: 'kelihatannya (penampilan) / sepertinya (dugaan dari bukti)',
      formation: 'Batang ます/adj + そう; bentuk biasa + ようだ / みたいだ.',
      examples: [
        { japanese: 'このケーキはおいしそうです。', romaji: 'Kono keeki wa oishisou desu.', meaning: 'Kue ini kelihatannya enak.' },
        { japanese: '誰か来たようです。', romaji: 'Dareka kita you desu.', meaning: 'Sepertinya ada yang datang.' },
      ],
    },
    {
      pattern: '〜らしい',
      meaning: 'kabarnya / katanya (informasi dari pihak lain)',
      formation: 'Bentuk biasa + らしい; kata benda langsung + らしい.',
      examples: [
        { japanese: '来月、新しい店ができるらしいです。', romaji: 'Raigetsu, atarashii mise ga dekiru rashii desu.', meaning: 'Katanya bulan depan akan ada toko baru.' },
        { japanese: '犯人はまだ見つかっていないらしい。', romaji: 'Hannin wa mada mitsukatte inai rashii.', meaning: 'Kabarnya pelakunya belum ditemukan.' },
      ],
    },
    {
      pattern: '〜ば / 〜なら',
      meaning: 'ば = jika (syarat); なら = kalau soal itu / kalau memang begitu',
      formation: 'V: う → えば (行く → 行けば); bentuk biasa/N + なら.',
      examples: [
        { japanese: '急げば、間に合います。', romaji: 'Isogeba, maniaimasu.', meaning: 'Kalau bergegas, masih sempat.' },
        { japanese: '京都へ行くなら、秋がいいですよ。', romaji: 'Kyouto e iku nara, aki ga ii desu yo.', meaning: 'Kalau mau ke Kyoto, musim gugur bagus.' },
      ],
    },
    {
      pattern: '〜ても',
      meaning: 'walaupun / meskipun',
      formation: 'Bentuk て + も; kata benda/な-adj + でも.',
      examples: [
        { japanese: '雨が降っても、試合は行われます。', romaji: 'Ame ga futte mo, shiai wa okonawaremasu.', meaning: 'Meskipun hujan, pertandingan tetap diadakan.' },
        { japanese: 'いくら考えても、答えが分かりません。', romaji: 'Ikura kangaete mo, kotae ga wakarimasen.', meaning: 'Sekeras apa pun berpikir, saya tidak tahu jawabannya.' },
      ],
    },
    {
      pattern: '〜ために / 〜ように',
      meaning: 'ために = demi tujuan (aksi terkendali); ように = supaya (hasil/kemampuan)',
      formation: 'V kamus/N の + ために; V kamus/potensial/ない + ように.',
      examples: [
        { japanese: '留学するために、お金を貯めています。', romaji: 'Ryuugaku suru tame ni, okane o tamete imasu.', meaning: 'Saya menabung untuk kuliah di luar negeri.' },
        { japanese: '忘れないように、メモします。', romaji: 'Wasurenai you ni, memo shimasu.', meaning: 'Saya mencatat supaya tidak lupa.' },
      ],
    },
    {
      pattern: '〜ことになる',
      meaning: 'diputuskan (oleh pihak lain/keadaan) bahwa ...',
      formation: 'V kamus/ない + ことになりました.',
      examples: [
        { japanese: '来月から大阪で働くことになりました。', romaji: 'Raigetsu kara Oosaka de hataraku koto ni narimashita.', meaning: 'Sudah diputuskan saya bekerja di Osaka mulai bulan depan.' },
        { japanese: '会議は中止することになりました。', romaji: 'Kaigi wa chuushi suru koto ni narimashita.', meaning: 'Rapat diputuskan dibatalkan.' },
      ],
    },
    {
      pattern: '〜ことにする',
      meaning: 'memutuskan sendiri untuk ...',
      formation: 'V kamus/ない + ことにします.',
      examples: [
        { japanese: '毎日三十分歩くことにしました。', romaji: 'Mainichi sanjuppun aruku koto ni shimashita.', meaning: 'Saya memutuskan berjalan 30 menit setiap hari.' },
        { japanese: '甘い物は食べないことにしています。', romaji: 'Amai mono wa tabenai koto ni shite imasu.', meaning: 'Saya membiasakan diri tidak makan manis.' },
      ],
    },
    {
      pattern: '〜わけだ',
      meaning: 'pantas saja / itu sebabnya (kesimpulan logis)',
      formation: 'Bentuk biasa + わけだ; な-adj + なわけだ.',
      examples: [
        { japanese: '十年も住んでいたなら、日本語が上手なわけですね。', romaji: 'Juunen mo sunde ita nara, nihongo ga jouzu na wake desu ne.', meaning: 'Kalau tinggal sepuluh tahun, pantas saja bahasa Jepangnya lancar.' },
        { japanese: '窓が開いている。寒いわけだ。', romaji: 'Mado ga aite iru. Samui wake da.', meaning: 'Jendelanya terbuka. Pantas dingin.' },
      ],
    },
    {
      pattern: '〜はずだ',
      meaning: 'seharusnya (keyakinan berdasar alasan)',
      formation: 'Bentuk biasa + はずだ; N + のはずだ; な-adj + なはずだ.',
      examples: [
        { japanese: '荷物は明日届くはずです。', romaji: 'Nimotsu wa ashita todoku hazu desu.', meaning: 'Paketnya seharusnya sampai besok.' },
        { japanese: '彼は今日休みのはずです。', romaji: 'Kare wa kyou yasumi no hazu desu.', meaning: 'Dia seharusnya libur hari ini.' },
      ],
    },
    {
      pattern: '〜べきだ',
      meaning: 'sepatutnya / wajib secara moral',
      formation: 'V kamus + べきだ (する → すべき); larangan: べきではない.',
      examples: [
        { japanese: '約束は守るべきです。', romaji: 'Yakusoku wa mamoru beki desu.', meaning: 'Janji sepatutnya ditepati.' },
        { japanese: '人の悪口を言うべきではありません。', romaji: 'Hito no waruguchi o iu beki de wa arimasen.', meaning: 'Tidak sepatutnya menjelekkan orang lain.' },
      ],
    },
    {
      pattern: '〜ほど / 〜くらい',
      meaning: 'sampai-sampai / kira-kira (menunjukkan tingkat)',
      formation: 'Bentuk biasa/N + ほど・くらい.',
      examples: [
        { japanese: '泣きたいほど疲れました。', romaji: 'Nakitai hodo tsukaremashita.', meaning: 'Saya capek sampai ingin menangis.' },
        { japanese: '駅まで十分くらいかかります。', romaji: 'Eki made juppun kurai kakarimasu.', meaning: 'Ke stasiun kira-kira sepuluh menit.' },
      ],
    },
    {
      pattern: '〜だけでなく',
      meaning: 'tidak hanya ... tetapi juga ...',
      formation: 'Bentuk biasa/N + だけでなく、〜も.',
      examples: [
        { japanese: 'この店は安いだけでなく、おいしいです。', romaji: 'Kono mise wa yasui dake de naku, oishii desu.', meaning: 'Toko ini tidak hanya murah, tapi juga enak.' },
        { japanese: '学生だけでなく、社会人も参加できます。', romaji: 'Gakusei dake de naku, shakaijin mo sanka dekimasu.', meaning: 'Tidak hanya pelajar, pekerja juga bisa ikut.' },
      ],
    },
    {
      pattern: '〜に対して',
      meaning: 'terhadap / berbeda dengan',
      formation: 'N + に対して / に対する + N.',
      examples: [
        { japanese: '先生は学生に対して厳しいです。', romaji: 'Sensei wa gakusei ni taishite kibishii desu.', meaning: 'Guru itu tegas terhadap murid.' },
        { japanese: '兄が静かなのに対して、弟はにぎやかです。', romaji: 'Ani ga shizuka na no ni taishite, otouto wa nigiyaka desu.', meaning: 'Berbeda dengan kakaknya yang pendiam, adiknya ramai.' },
      ],
    },
    {
      pattern: '〜について',
      meaning: 'tentang / mengenai',
      formation: 'N + について; sebelum kata benda: についての + N.',
      examples: [
        { japanese: '日本の文化について発表します。', romaji: 'Nihon no bunka ni tsuite happyou shimasu.', meaning: 'Saya akan presentasi tentang budaya Jepang.' },
        { japanese: '環境問題についての記事を読みました。', romaji: 'Kankyou mondai ni tsuite no kiji o yomimashita.', meaning: 'Saya membaca artikel tentang masalah lingkungan.' },
      ],
    },
    {
      pattern: '〜として',
      meaning: 'sebagai (peran atau status)',
      formation: 'N + として.',
      examples: [
        { japanese: '通訳として会議に参加しました。', romaji: 'Tsuuyaku to shite kaigi ni sanka shimashita.', meaning: 'Saya ikut rapat sebagai penerjemah.' },
        { japanese: '京都は観光地として有名です。', romaji: 'Kyouto wa kankouchi to shite yuumei desu.', meaning: 'Kyoto terkenal sebagai tempat wisata.' },
      ],
    },
    {
      pattern: '〜によって',
      meaning: 'oleh (pelaku pasif) / tergantung / dengan cara',
      formation: 'N + によって / による + N.',
      examples: [
        { japanese: 'この絵はピカソによって描かれました。', romaji: 'Kono e wa Pikaso ni yotte egakaremashita.', meaning: 'Lukisan ini dilukis oleh Picasso.' },
        { japanese: '国によって習慣が違います。', romaji: 'Kuni ni yotte shuukan ga chigaimasu.', meaning: 'Kebiasaan berbeda tergantung negaranya.' },
      ],
    },
    {
      pattern: 'Pasif & kausatif (させる)',
      meaning: 'kausatif = menyuruh/membiarkan; pasif-kausatif = dipaksa',
      formation: 'Golongan 1: う → あせる (行く → 行かせる); golongan 2: る → させる.',
      examples: [
        { japanese: '母は弟に野菜を食べさせました。', romaji: 'Haha wa otouto ni yasai o tabesasemashita.', meaning: 'Ibu menyuruh adik makan sayur.' },
        { japanese: '子どものころ、ピアノを習わされました。', romaji: 'Kodomo no koro, piano o narawasaremashita.', meaning: 'Waktu kecil saya dipaksa belajar piano.' },
      ],
    },
    {
      pattern: 'Keigo dasar (尊敬語・謙譲語)',
      meaning: 'hormat untuk tindakan orang lain, merendah untuk tindakan sendiri',
      formation: 'お + batang ます + になる (hormat); お + batang ます + する (merendah).',
      examples: [
        { japanese: '社長はもうお帰りになりました。', romaji: 'Shachou wa mou okaeri ni narimashita.', meaning: 'Direktur sudah pulang.' },
        { japanese: '荷物をお持ちします。', romaji: 'Nimotsu o omochi shimasu.', meaning: 'Saya bawakan barangnya.' },
      ],
    },
    {
      pattern: 'Nominalisasi の / こと',
      meaning: 'mengubah kata kerja menjadi kata benda',
      formation: 'V kamus + の/こと + partikel; persepsi (見る・聞く) memakai の.',
      examples: [
        { japanese: '私の趣味は写真を撮ることです。', romaji: 'Watashi no shumi wa shashin o toru koto desu.', meaning: 'Hobi saya memotret.' },
        { japanese: '子どもたちが歌うのが聞こえます。', romaji: 'Kodomotachi ga utau no ga kikoemasu.', meaning: 'Terdengar anak-anak bernyanyi.' },
      ],
    },
  ],
  advanced: [
    {
      pattern: '〜に違いない / 〜に相違ない',
      meaning: 'pasti / tidak salah lagi (keyakinan kuat)',
      formation: 'Bentuk biasa + に違いない (N/な-adj tanpa だ).',
      examples: [
        { japanese: '電気が消えている。彼はもう寝たに違いない。', romaji: 'Denki ga kiete iru. Kare wa mou neta ni chigainai.', meaning: 'Lampunya mati. Dia pasti sudah tidur.' },
        { japanese: 'この計画は成功するに相違ない。', romaji: 'Kono keikaku wa seikou suru ni soui nai.', meaning: 'Rencana ini tidak diragukan akan berhasil.' },
      ],
    },
    {
      pattern: '〜ざるを得ない',
      meaning: 'terpaksa / mau tidak mau harus',
      formation: 'Bentuk ない tanpa ない + ざるを得ない (する → せざるを得ない).',
      examples: [
        { japanese: '台風のため、旅行を中止せざるを得なかった。', romaji: 'Taifuu no tame, ryokou o chuushi sezaru o enakatta.', meaning: 'Karena topan, kami terpaksa membatalkan perjalanan.' },
        { japanese: '上司の命令なので、行かざるを得ない。', romaji: 'Joushi no meirei na node, ikazaru o enai.', meaning: 'Karena perintah atasan, saya mau tak mau harus pergi.' },
      ],
    },
    {
      pattern: '〜かねない',
      meaning: 'bisa saja (berakibat buruk)',
      formation: 'Batang ます + かねない.',
      examples: [
        { japanese: 'そんな運転をしたら、事故を起こしかねない。', romaji: 'Sonna unten o shitara, jiko o okoshikanenai.', meaning: 'Menyetir seperti itu bisa menyebabkan kecelakaan.' },
        { japanese: '小さなミスが大きな損失につながりかねません。', romaji: 'Chiisa na misu ga ooki na sonshitsu ni tsunagarikanemasen.', meaning: 'Kesalahan kecil bisa berujung kerugian besar.' },
      ],
    },
    {
      pattern: '〜に伴って',
      meaning: 'seiring dengan (perubahan yang berjalan bersama)',
      formation: 'N / V kamus + の + に伴って.',
      examples: [
        { japanese: '人口の増加に伴って、住宅が不足している。', romaji: 'Jinkou no zouka ni tomonatte, juutaku ga fusoku shite iru.', meaning: 'Seiring bertambahnya penduduk, perumahan kurang.' },
        { japanese: '技術が進歩するのに伴って、働き方も変わった。', romaji: 'Gijutsu ga shinpo suru no ni tomonatte, hatarakikata mo kawatta.', meaning: 'Seiring kemajuan teknologi, cara kerja pun berubah.' },
      ],
    },
    {
      pattern: '〜に応じて',
      meaning: 'sesuai dengan / menyesuaikan',
      formation: 'N + に応じて / に応じた + N.',
      examples: [
        { japanese: 'レベルに応じてクラスを分けます。', romaji: 'Reberu ni oujite kurasu o wakemasu.', meaning: 'Kelas dibagi sesuai level.' },
        { japanese: '経験に応じた給料を支払います。', romaji: 'Keiken ni oujita kyuuryou o shiharaimasu.', meaning: 'Gaji dibayar sesuai pengalaman.' },
      ],
    },
    {
      pattern: '〜にもかかわらず',
      meaning: 'meskipun / walaupun (fakta berlawanan, formal)',
      formation: 'Bentuk biasa/N + にもかかわらず.',
      examples: [
        { japanese: '雨にもかかわらず、多くの人が集まった。', romaji: 'Ame nimo kakawarazu, ooku no hito ga atsumatta.', meaning: 'Meskipun hujan, banyak orang berkumpul.' },
        { japanese: '十分に説明したにもかかわらず、理解されなかった。', romaji: 'Juubun ni setsumei shita nimo kakawarazu, rikai sarenakatta.', meaning: 'Walaupun sudah dijelaskan dengan cukup, tetap tidak dipahami.' },
      ],
    },
    {
      pattern: '〜ものの',
      meaning: 'meskipun ... (namun hasilnya tidak sesuai)',
      formation: 'Bentuk biasa + ものの.',
      examples: [
        { japanese: '免許は取ったものの、まだ運転に自信がない。', romaji: 'Menkyo wa totta mono no, mada unten ni jishin ga nai.', meaning: 'Meskipun sudah punya SIM, saya belum percaya diri menyetir.' },
        { japanese: '効果はあるものの、費用が高すぎる。', romaji: 'Kouka wa aru mono no, hiyou ga takasugiru.', meaning: 'Meskipun efektif, biayanya terlalu mahal.' },
      ],
    },
    {
      pattern: '〜一方で',
      meaning: 'di satu sisi ... di sisi lain ...',
      formation: 'Bentuk biasa + 一方で (N/な-adj: である一方で).',
      examples: [
        { japanese: '都会は便利な一方で、生活費が高い。', romaji: 'Tokai wa benri na ippou de, seikatsuhi ga takai.', meaning: 'Kota itu praktis, tetapi biaya hidupnya mahal.' },
        { japanese: '輸出が増える一方で、国内の消費は減っている。', romaji: 'Yushutsu ga fueru ippou de, kokunai no shouhi wa hette iru.', meaning: 'Ekspor meningkat, sementara konsumsi dalam negeri menurun.' },
      ],
    },
    {
      pattern: '〜上で',
      meaning: 'setelah (sebagai dasar untuk langkah berikutnya) / dalam hal',
      formation: 'V-た + 上で; N + の上で; V kamus + 上で (dalam hal).',
      examples: [
        { japanese: '家族と相談した上で、決めます。', romaji: 'Kazoku to soudan shita ue de, kimemasu.', meaning: 'Saya akan memutuskan setelah berdiskusi dengan keluarga.' },
        { japanese: '外国語を学ぶ上で、発音は大切だ。', romaji: 'Gaikokugo o manabu ue de, hatsuon wa taisetsu da.', meaning: 'Dalam belajar bahasa asing, pelafalan itu penting.' },
      ],
    },
    {
      pattern: '〜次第',
      meaning: 'segera setelah ... / tergantung pada ...',
      formation: 'Batang ます + 次第 (segera setelah); N + 次第 (tergantung).',
      examples: [
        { japanese: '結果が分かり次第、ご連絡します。', romaji: 'Kekka ga wakari shidai, gorenraku shimasu.', meaning: 'Begitu hasilnya diketahui, kami akan menghubungi Anda.' },
        { japanese: '成功するかどうかは努力次第だ。', romaji: 'Seikou suru ka dou ka wa doryoku shidai da.', meaning: 'Berhasil atau tidak tergantung usaha.' },
      ],
    },
    {
      pattern: '〜限り',
      meaning: 'selama ... / sebatas ...',
      formation: 'V kamus/ている/ない + 限り; N + である限り.',
      examples: [
        { japanese: '体が元気な限り、働き続けたい。', romaji: 'Karada ga genki na kagiri, hatarakitsuzuketai.', meaning: 'Selama badan sehat, saya ingin terus bekerja.' },
        { japanese: '私の知る限り、彼は信頼できる人です。', romaji: 'Watashi no shiru kagiri, kare wa shinrai dekiru hito desu.', meaning: 'Sejauh yang saya tahu, dia orang yang bisa dipercaya.' },
      ],
    },
    {
      pattern: '〜に基づいて',
      meaning: 'berdasarkan',
      formation: 'N + に基づいて / に基づく + N.',
      examples: [
        { japanese: '調査結果に基づいて、計画を修正した。', romaji: 'Chousa kekka ni motozuite, keikaku o shuusei shita.', meaning: 'Rencana direvisi berdasarkan hasil survei.' },
        { japanese: 'この映画は実話に基づいている。', romaji: 'Kono eiga wa jitsuwa ni motozuite iru.', meaning: 'Film ini berdasarkan kisah nyata.' },
      ],
    },
    {
      pattern: '〜をめぐって',
      meaning: 'seputar / terkait (isu yang diperdebatkan)',
      formation: 'N + をめぐって / をめぐる + N.',
      examples: [
        { japanese: '新しい空港の建設をめぐって、議論が続いている。', romaji: 'Atarashii kuukou no kensetsu o megutte, giron ga tsuzuite iru.', meaning: 'Perdebatan seputar pembangunan bandara baru terus berlanjut.' },
        { japanese: '遺産をめぐる争いが起きた。', romaji: 'Isan o meguru arasoi ga okita.', meaning: 'Terjadi perselisihan seputar warisan.' },
      ],
    },
    {
      pattern: '〜を通じて',
      meaning: 'melalui / sepanjang (periode)',
      formation: 'N + を通じて / を通して.',
      examples: [
        { japanese: '友人を通じて、彼と知り合った。', romaji: 'Yuujin o tsuujite, kare to shiriatta.', meaning: 'Saya kenal dia melalui teman.' },
        { japanese: 'この地域は一年を通じて暖かい。', romaji: 'Kono chiiki wa ichinen o tsuujite atatakai.', meaning: 'Daerah ini hangat sepanjang tahun.' },
      ],
    },
    {
      pattern: '〜わけではない',
      meaning: 'bukan berarti ... (menyangkal sebagian)',
      formation: 'Bentuk biasa + わけではない (な-adj + な).',
      examples: [
        { japanese: '高い物がいつも良いわけではない。', romaji: 'Takai mono ga itsumo yoi wake de wa nai.', meaning: 'Barang mahal belum tentu selalu bagus.' },
        { japanese: '肉が嫌いなわけではありません。', romaji: 'Niku ga kirai na wake de wa arimasen.', meaning: 'Bukan berarti saya tidak suka daging.' },
      ],
    },
    {
      pattern: '〜ないことはない',
      meaning: 'bukannya tidak bisa / sebenarnya bisa (tapi ragu)',
      formation: 'Bentuk ない + ことはない.',
      examples: [
        { japanese: '急げば、間に合わないことはない。', romaji: 'Isogeba, maniawanai koto wa nai.', meaning: 'Kalau bergegas, bukannya tidak mungkin sempat.' },
        { japanese: '辛い料理も食べられないことはないです。', romaji: 'Karai ryouri mo taberarenai koto wa nai desu.', meaning: 'Makanan pedas pun sebenarnya bisa saya makan.' },
      ],
    },
    {
      pattern: '〜というものだ',
      meaning: 'itulah yang namanya ... (penilaian umum)',
      formation: 'Bentuk biasa/N + というものだ.',
      examples: [
        { japanese: '困っている人を助けるのが友達というものだ。', romaji: 'Komatte iru hito o tasukeru no ga tomodachi to iu mono da.', meaning: 'Menolong orang yang kesulitan, itulah namanya teman.' },
        { japanese: '一度の失敗であきらめるのは早すぎるというものだ。', romaji: 'Ichido no shippai de akirameru no wa hayasugiru to iu mono da.', meaning: 'Menyerah karena sekali gagal itu terlalu cepat.' },
      ],
    },
    {
      pattern: '〜にほかならない',
      meaning: 'tidak lain adalah ...',
      formation: 'N + にほかならない; alasan: から + にほかならない.',
      examples: [
        { japanese: '今回の成功は、皆さんの努力の結果にほかなりません。', romaji: 'Konkai no seikou wa, minasan no doryoku no kekka ni hoka narimasen.', meaning: 'Keberhasilan ini tidak lain adalah hasil usaha Anda semua.' },
        { japanese: '彼が厳しいのは、君に期待しているからにほかならない。', romaji: 'Kare ga kibishii no wa, kimi ni kitai shite iru kara ni hoka naranai.', meaning: 'Dia tegas tidak lain karena berharap padamu.' },
      ],
    },
    {
      pattern: 'Keigo N2 (特別な尊敬語・謙譲語)',
      meaning: 'bentuk hormat/merendah khusus untuk situasi bisnis',
      formation: 'いらっしゃる・おっしゃる・召し上がる (hormat); 参る・申す・拝見する (merendah).',
      examples: [
        { japanese: '部長は何とおっしゃいましたか。', romaji: 'Buchou wa nan to osshaimashita ka.', meaning: 'Apa yang dikatakan manajer?' },
        { japanese: '資料を拝見しました。', romaji: 'Shiryou o haiken shimashita.', meaning: 'Saya sudah melihat dokumennya.' },
      ],
    },
  ],
  proficiency: [
    {
      pattern: '〜や否や',
      meaning: 'begitu ... langsung ...',
      formation: 'V kamus + や否や.',
      examples: [
        { japanese: 'ドアが開くや否や、客が店に入ってきた。', romaji: 'Doa ga aku ya ina ya, kyaku ga mise ni haitte kita.', meaning: 'Begitu pintu terbuka, pelanggan langsung masuk ke toko.' },
        { japanese: '彼は帰宅するや否や、寝てしまった。', romaji: 'Kare wa kitaku suru ya ina ya, nete shimatta.', meaning: 'Begitu tiba di rumah, dia langsung tertidur.' },
      ],
    },
    {
      pattern: '〜そばから',
      meaning: 'baru saja ... sudah ... lagi (berulang)',
      formation: 'V kamus/V-た + そばから.',
      examples: [
        { japanese: '覚えるそばから忘れてしまう。', romaji: 'Oboeru soba kara wasurete shimau.', meaning: 'Baru dihafal, sudah lupa lagi.' },
        { japanese: '片付けたそばから、子どもが散らかす。', romaji: 'Katazuketa soba kara, kodomo ga chirakasu.', meaning: 'Baru saja dirapikan, anak-anak sudah mengacak lagi.' },
      ],
    },
    {
      pattern: '〜ともなく',
      meaning: 'tanpa sengaja / tanpa maksud khusus',
      formation: 'V kamus + ともなく + V (kata kerja yang sama atau terkait).',
      examples: [
        { japanese: '見るともなくテレビを見ていた。', romaji: 'Miru tomo naku terebi o mite ita.', meaning: 'Saya menonton TV tanpa benar-benar memperhatikan.' },
        { japanese: '聞くともなく隣の会話が耳に入った。', romaji: 'Kiku tomo naku tonari no kaiwa ga mimi ni haitta.', meaning: 'Tanpa sengaja percakapan di sebelah terdengar.' },
      ],
    },
    {
      pattern: '〜に至って',
      meaning: 'sampai pada tahap ... (barulah)',
      formation: 'N / V kamus + に至って(は) / に至るまで.',
      examples: [
        { japanese: '死者が出るに至って、ようやく対策が取られた。', romaji: 'Shisha ga deru ni itatte, youyaku taisaku ga torareta.', meaning: 'Baru setelah ada korban jiwa, langkah penanganan diambil.' },
        { japanese: '服装から言葉遣いに至るまで注意された。', romaji: 'Fukusou kara kotobazukai ni itaru made chuui sareta.', meaning: 'Saya ditegur mulai dari pakaian sampai cara bicara.' },
      ],
    },
    {
      pattern: '〜を余儀なくされる',
      meaning: 'terpaksa (oleh keadaan di luar kendali)',
      formation: 'N (tindakan) + を余儀なくされる.',
      examples: [
        { japanese: '大雨のため、試合は延期を余儀なくされた。', romaji: 'Ooame no tame, shiai wa enki o yogi naku sareta.', meaning: 'Karena hujan lebat, pertandingan terpaksa ditunda.' },
        { japanese: '経営悪化で、工場は閉鎖を余儀なくされた。', romaji: 'Keiei akka de, koujou wa heisa o yogi naku sareta.', meaning: 'Karena kondisi usaha memburuk, pabrik terpaksa ditutup.' },
      ],
    },
    {
      pattern: '〜に堪えない',
      meaning: 'tidak tahan untuk ... / sungguh (perasaan sangat kuat)',
      formation: 'V kamus + に堪えない (tak layak); N perasaan + に堪えない (sangat).',
      examples: [
        { japanese: 'その番組は見るに堪えない内容だった。', romaji: 'Sono bangumi wa miru ni taenai naiyou datta.', meaning: 'Acara itu isinya tak layak ditonton.' },
        { japanese: '皆様のご支援に感謝の念に堪えません。', romaji: 'Minasama no goshien ni kansha no nen ni taemasen.', meaning: 'Kami sungguh berterima kasih atas dukungan Anda semua.' },
      ],
    },
    {
      pattern: '〜までもない',
      meaning: 'tidak perlu sampai ... (sudah jelas)',
      formation: 'V kamus + までもない.',
      examples: [
        { japanese: '言うまでもなく、健康が一番大切だ。', romaji: 'Iu made mo naku, kenkou ga ichiban taisetsu da.', meaning: 'Tak perlu dikatakan, kesehatan yang paling penting.' },
        { japanese: 'この程度の問題なら、専門家に聞くまでもない。', romaji: 'Kono teido no mondai nara, senmonka ni kiku made mo nai.', meaning: 'Masalah sekecil ini tidak perlu sampai bertanya ke ahli.' },
      ],
    },
    {
      pattern: '〜に即して',
      meaning: 'sesuai dengan / berpijak pada (fakta, aturan)',
      formation: 'N + に即して / に即した + N.',
      examples: [
        { japanese: '事実に即して報告してください。', romaji: 'Jijitsu ni sokushite houkoku shite kudasai.', meaning: 'Tolong laporkan sesuai fakta.' },
        { japanese: '現場の実情に即した対策が必要だ。', romaji: 'Genba no jitsujou ni sokushita taisaku ga hitsuyou da.', meaning: 'Diperlukan langkah yang sesuai kondisi lapangan.' },
      ],
    },
    {
      pattern: '〜をもって',
      meaning: 'dengan (cara/alat, formal) / per (batas waktu)',
      formation: 'N + をもって.',
      examples: [
        { japanese: '本日をもって閉店いたします。', romaji: 'Honjitsu o motte heiten itashimasu.', meaning: 'Per hari ini toko kami tutup.' },
        { japanese: '書面をもってご通知いたします。', romaji: 'Shomen o motte gotsuuchi itashimasu.', meaning: 'Kami akan memberitahukan secara tertulis.' },
      ],
    },
    {
      pattern: '〜と相まって',
      meaning: 'berpadu dengan / ditambah dengan (efek gabungan)',
      formation: 'N + と相まって.',
      examples: [
        { japanese: '好天と相まって、祭りは大いににぎわった。', romaji: 'Kouten to aimatte, matsuri wa ooi ni nigiwatta.', meaning: 'Berpadu dengan cuaca cerah, festival sangat ramai.' },
        { japanese: '才能が努力と相まって、彼は成功した。', romaji: 'Sainou ga doryoku to aimatte, kare wa seikou shita.', meaning: 'Bakat yang berpadu dengan usaha membuatnya sukses.' },
      ],
    },
    {
      pattern: '〜いかんによって',
      meaning: 'tergantung pada (formal)',
      formation: 'N + の + いかんによって / いかんでは.',
      examples: [
        { japanese: '試験の結果いかんによっては、進級できない。', romaji: 'Shiken no kekka ikan ni yotte wa, shinkyuu dekinai.', meaning: 'Tergantung hasil ujian, bisa saja tidak naik tingkat.' },
        { japanese: '対応のいかんによって、顧客の信頼が決まる。', romaji: 'Taiou no ikan ni yotte, kokyaku no shinrai ga kimaru.', meaning: 'Kepercayaan pelanggan ditentukan oleh cara penanganannya.' },
      ],
    },
    {
      pattern: '〜べく',
      meaning: 'untuk / dengan tujuan (formal)',
      formation: 'V kamus + べく (する → すべく).',
      examples: [
        { japanese: '夢を実現すべく、毎日練習している。', romaji: 'Yume o jitsugen subeku, mainichi renshuu shite iru.', meaning: 'Saya berlatih setiap hari untuk mewujudkan mimpi.' },
        { japanese: '問題を解決すべく、専門チームが作られた。', romaji: 'Mondai o kaiketsu subeku, senmon chiimu ga tsukurareta.', meaning: 'Tim khusus dibentuk untuk menyelesaikan masalah.' },
      ],
    },
    {
      pattern: '〜まじき',
      meaning: 'yang tidak pantas dilakukan (oleh seseorang dengan status tertentu)',
      formation: 'N + として + V kamus + まじき + N (する → すまじき).',
      examples: [
        { japanese: '教師にあるまじき行為だ。', romaji: 'Kyoushi ni arumajiki koui da.', meaning: 'Itu perbuatan yang tidak pantas bagi seorang guru.' },
        { japanese: '政治家として許すまじき発言だ。', romaji: 'Seijika to shite yurusumajiki hatsugen da.', meaning: 'Itu ucapan yang tak bisa dibenarkan dari seorang politisi.' },
      ],
    },
    {
      pattern: '〜ずにはおかない',
      meaning: 'pasti akan (menimbulkan efek) / tak mungkin tidak',
      formation: 'Bentuk ない tanpa ない + ずにはおかない (する → せずにはおかない).',
      examples: [
        { japanese: 'この映画は観客を感動させずにはおかない。', romaji: 'Kono eiga wa kankyaku o kandou sasezu ni wa okanai.', meaning: 'Film ini pasti membuat penonton terharu.' },
        { japanese: '彼の発言は議論を呼ばずにはおかないだろう。', romaji: 'Kare no hatsugen wa giron o yobazu ni wa okanai darou.', meaning: 'Ucapannya pasti akan memicu perdebatan.' },
      ],
    },
    {
      pattern: '〜ならでは',
      meaning: 'khas / hanya bisa dari ...',
      formation: 'N + ならでは + の + N.',
      examples: [
        { japanese: 'これは京都ならではの景色だ。', romaji: 'Kore wa Kyouto nara de wa no keshiki da.', meaning: 'Ini pemandangan khas Kyoto.' },
        { japanese: '子どもならではの自由な発想が面白い。', romaji: 'Kodomo nara de wa no jiyuu na hassou ga omoshiroi.', meaning: 'Ide bebas khas anak-anak itu menarik.' },
      ],
    },
    {
      pattern: '〜を皮切りに',
      meaning: 'dimulai dengan ... (lalu berlanjut)',
      formation: 'N + を皮切りに(して).',
      examples: [
        { japanese: '東京公演を皮切りに、全国ツアーが始まる。', romaji: 'Toukyou kouen o kawakiri ni, zenkoku tsuaa ga hajimaru.', meaning: 'Dimulai dengan konser Tokyo, tur nasional dimulai.' },
        { japanese: '彼の発言を皮切りに、次々と反対意見が出た。', romaji: 'Kare no hatsugen o kawakiri ni, tsugitsugi to hantai iken ga deta.', meaning: 'Diawali ucapannya, pendapat menentang bermunculan.' },
      ],
    },
    {
      pattern: '〜といったところだ',
      meaning: 'kira-kira sebatas ... (tidak lebih)',
      formation: 'N / V kamus + といったところだ.',
      examples: [
        { japanese: '参加者は多くても五十人といったところだ。', romaji: 'Sankasha wa ookute mo gojuunin to itta tokoro da.', meaning: 'Pesertanya paling banyak sekitar lima puluh orang.' },
        { japanese: '私の料理の腕は、まあまあといったところです。', romaji: 'Watashi no ryouri no ude wa, maamaa to itta tokoro desu.', meaning: 'Kemampuan masak saya ya lumayan saja.' },
      ],
    },
    {
      pattern: '〜極まりない',
      meaning: 'sangat / luar biasa (biasanya negatif)',
      formation: 'な-adj + 極まりない / 極まる.',
      examples: [
        { japanese: '彼の態度は失礼極まりない。', romaji: 'Kare no taido wa shitsurei kiwamarinai.', meaning: 'Sikapnya sangat tidak sopan.' },
        { japanese: '夜の山道を一人で歩くのは危険極まりない。', romaji: 'Yoru no yamamichi o hitori de aruku no wa kiken kiwamarinai.', meaning: 'Berjalan sendirian di jalan gunung malam hari sangat berbahaya.' },
      ],
    },
    {
      pattern: 'Retorika formal (〜と言わざるを得ない・〜ではなかろうか)',
      meaning: 'menyampaikan kesimpulan atau keraguan secara akademik',
      formation: 'Klaim + と言わざるを得ない; dugaan halus: V/N + ではなかろうか.',
      examples: [
        { japanese: 'この政策は失敗だったと言わざるを得ない。', romaji: 'Kono seisaku wa shippai datta to iwazaru o enai.', meaning: 'Harus diakui bahwa kebijakan ini gagal.' },
        { japanese: '問題の根本は教育にあるのではなかろうか。', romaji: 'Mondai no konpon wa kyouiku ni aru no de wa nakarou ka.', meaning: 'Bukankah akar masalahnya ada pada pendidikan?' },
      ],
    },
  ],
};
