// Japanese Question Builder: question words and particles, 30 per level.
// [prompt, Indonesian translation, answer, three wrong options, label, rule]
// Label and rule are shown before answering, so they explain the meaning without naming the answer.
import type { ChoiceTuple } from '../mandarin/questions';

const WHAT = 'Menanyakan benda/hal (= apa)';
const WHERE = 'Menanyakan tempat (= di mana / ke mana)';
const WHO = 'Menanyakan orang (= siapa)';
const WHEN = 'Menanyakan waktu (= kapan)';
const PRICE = 'Menanyakan harga (= berapa)';
const WHY = 'Menanyakan alasan (= mengapa)';
const HOW = 'Cara melakukan (= bagaimana caranya)';
const HOW_IS = 'Menanyakan keadaan/kesan (= bagaimana)';
const WHICH_PRONOUN = 'Yang mana (berdiri sendiri, 3 pilihan atau lebih)';
const WHICH_NOUN = 'Yang mana + kata benda';
const WHAT_KIND = 'Seperti apa + kata benda';
const WHICH_TWO = 'Yang mana dari dua pilihan / arah (sopan)';
const INDEFINITE = 'Kata tanya + partikel = sesuatu / seseorang';
const NONE = 'Kata tanya + partikel + negatif = tidak … sama sekali';

export const easyQuestions: ChoiceTuple[] = [
  ['これは ____ ですか。', 'Ini apa?', '何', ['どこ', 'だれ', 'いつ'], 'Benda', WHAT],
  ['トイレは ____ ですか。', 'Toilet di mana?', 'どこ', ['何', 'だれ', 'いつ'], 'Tempat', WHERE],
  ['あの 人は ____ ですか。', 'Orang itu siapa?', 'だれ', ['何', 'どこ', 'いつ'], 'Orang', WHO],
  ['誕生日は ____ ですか。', 'Kapan ulang tahunmu?', 'いつ', ['何', 'どこ', 'だれ'], 'Waktu', WHEN],
  ['この りんごは ____ ですか。', 'Apel ini berapa harganya?', 'いくら', ['いつ', 'だれ', 'どこ'], 'Harga', PRICE],
  ['今 ____ ですか。', 'Sekarang jam berapa?', '何時', ['何人', 'いくら', 'だれ'], 'Jam', 'Menanyakan jam (= jam berapa)'],
  ['____ 来ましたか。', 'Berapa orang yang datang?', '何人', ['何時', 'どこ', 'だれ'], 'Jumlah orang', 'Menanyakan jumlah orang'],
  ['お名前は ____ ですか。', 'Namamu siapa?', '何', ['だれ', 'どこ', 'いつ'], 'Nama', 'Nama ditanyakan dengan "apa", bukan "siapa"'],
  ['学校は ____ に ありますか。', 'Sekolah ada di mana?', 'どこ', ['何', 'だれ', 'いつ'], 'Tempat', WHERE],
  ['これは ____ の 本ですか。', 'Ini buku siapa?', 'だれ', ['いつ', 'いくら', 'どう'], 'Pemilik', 'Pemilik (= milik siapa) + partikel milik'],
  ['日本語の 先生は ____ ですか。', 'Siapa guru bahasa Jepangmu?', 'だれ', ['何', 'どこ', 'いつ'], 'Orang', WHO],
  ['____ を 飲みますか。', 'Kamu minum apa?', '何', ['だれ', 'どこ', 'いつ'], 'Benda', WHAT],
  ['毎日 ____ に 起きますか。', 'Setiap hari kamu bangun jam berapa?', '何時', ['何人', 'いくら', 'だれ'], 'Jam', 'Menanyakan jam (= jam berapa)'],
  ['駅は ____ ですか。', 'Stasiun di mana?', 'どこ', ['何', 'だれ', 'いつ'], 'Tempat', WHERE],
  ['あなたは 学生です____。', 'Apakah kamu pelajar?', 'か', ['を', 'に', 'が'], 'Ya / tidak', 'Partikel tanya di akhir kalimat'],
  ['____ 曜日に テストが ありますか。', 'Hari apa ada tes?', '何', ['どこ', 'だれ', 'いつ'], 'Hari', 'Apa + hari (= hari apa)'],
  ['その かばんは ____ ですか。', 'Berapa harga tas itu?', 'いくら', ['いつ', 'どこ', 'だれ'], 'Harga', PRICE],
  ['____ へ 行きますか。', 'Kamu pergi ke mana?', 'どこ', ['何', 'だれ', 'いつ'], 'Tujuan', WHERE],
  ['____ と 行きますか。', 'Kamu pergi dengan siapa?', 'だれ', ['何', 'どこ', 'いつ'], 'Teman', WHO],
  ['夏休みは ____ からですか。', 'Libur musim panas mulai kapan?', 'いつ', ['何', 'だれ', 'いくら'], 'Waktu', WHEN],
  ['家族は ____ 人ですか。', 'Keluargamu berapa orang?', '何', ['いくら', 'どこ', 'だれ'], 'Jumlah', 'Apa + penghitung (= berapa …)'],
  ['____ が 好きですか。', 'Kamu suka apa?', '何', ['どこ', 'いつ', 'いくら'], 'Kesukaan', WHAT],
  ['____ で 来ましたか。', 'Kamu datang naik apa?', '何', ['だれ', 'いつ', 'いくら'], 'Kendaraan', 'Apa + partikel alat'],
  ['テストは ____ ですか。', 'Kapan tesnya?', 'いつ', ['何', 'だれ', 'いくら'], 'Waktu', WHEN],
  ['りんごを ____ 買いましたか。', 'Berapa buah apel yang kamu beli?', 'いくつ', ['いくら', 'いつ', '何時'], 'Jumlah benda', 'Menanyakan jumlah benda (= berapa buah)'],
  ['お国は ____ ですか。', 'Kamu berasal dari negara mana?', 'どちら', ['いつ', 'だれ', 'いくら'], 'Asal (sopan)', WHICH_TWO],
  ['____ 時から 授業ですか。', 'Pelajaran mulai jam berapa?', '何', ['いつ', 'どこ', 'だれ'], 'Jam', 'Apa + jam (= jam berapa)'],
  ['____ 月 生まれですか。', 'Kamu lahir bulan apa?', '何', ['いつ', 'どこ', 'だれ'], 'Bulan', 'Apa + bulan (= bulan apa)'],
  ['部屋に ____ が いますか。', 'Siapa yang ada di kamar?', 'だれ', ['どこ', 'いつ', 'いくら'], 'Orang', WHO],
  ['図書館は ____ 時まで ですか。', 'Perpustakaan buka sampai jam berapa?', '何', ['いつ', 'どこ', 'だれ'], 'Jam', 'Apa + jam (= jam berapa)'],
];

export const mediumQuestions: ChoiceTuple[] = [
  ['____ 日本語を 勉強していますか。', 'Mengapa kamu belajar bahasa Jepang?', 'どうして', ['どこ', 'だれ', 'いくら'], 'Alasan', WHY],
  ['駅まで ____ 行きますか。', 'Bagaimana caranya pergi ke stasiun?', 'どうやって', ['どうして', 'いつ', 'だれ'], 'Cara', HOW],
  ['____ 色が 好きですか。', 'Kamu suka warna apa?', '何', ['どこ', 'だれ', 'いつ'], 'Jenis', 'Apa + kata benda'],
  ['あなたの かばんは ____ ですか。', 'Tasmu yang mana?', 'どれ', ['どの', 'どんな', 'どう'], 'Pilihan', WHICH_PRONOUN],
  ['____ かばんが あなたのですか。', 'Tas yang mana punyamu?', 'どの', ['どれ', 'どんな', 'どう'], 'Pilihan', WHICH_NOUN],
  ['京都は ____ 町ですか。', 'Kyoto kota seperti apa?', 'どんな', ['どの', 'どれ', 'どう'], 'Sifat', WHAT_KIND],
  ['日本の 生活は ____ ですか。', 'Bagaimana kehidupan di Jepang?', 'どう', ['どの', 'どれ', 'どんな'], 'Kesan', HOW_IS],
  ['コーヒーは ____ ですか。', 'Bagaimana kalau kopi? (menawarkan dengan sopan)', 'いかが', ['どれ', 'どの', 'どんな'], 'Menawarkan', 'Bentuk sopan untuk menawarkan (= bagaimana)'],
  ['家から 学校まで ____ かかりますか。', 'Berapa lama dari rumah ke sekolah?', 'どのくらい', ['どの', 'どんな', 'どう'], 'Durasi', 'Seberapa (lama/jauh/banyak)'],
  ['コーヒーと 紅茶と ____ が いいですか。', 'Kopi atau teh, mana yang lebih baik?', 'どちら', ['どの', 'どんな', 'どう'], 'Dua pilihan', WHICH_TWO],
  ['____ 遅れたんですか。', 'Kenapa kamu terlambat?', 'どうして', ['どうやって', 'どこ', 'いつ'], 'Alasan', WHY],
  ['この 言葉は ____ 意味ですか。', 'Kata ini maksudnya apa?', 'どういう', ['どの', 'どれ', 'どこ'], 'Makna', 'Seperti apa (isi/makna)'],
  ['昨日の パーティーは ____ でしたか。', 'Bagaimana pesta kemarin?', 'どう', ['どの', 'どれ', 'どんな'], 'Kesan', HOW_IS],
  ['東京まで 新幹線で ____ ですか。', 'Ke Tokyo naik shinkansen berapa harganya?', 'いくら', ['いくつ', 'いつ', '何時'], 'Harga', PRICE],
  ['お子さんは ____ ですか。', 'Anak Anda umur berapa?', 'おいくつ', ['いくら', 'いつ', '何時'], 'Umur (sopan)', 'Menanyakan umur dengan sopan'],
  ['____ 日本へ 来ましたか。', 'Kapan kamu datang ke Jepang?', 'いつ', ['どう', 'どれ', 'どの'], 'Waktu', WHEN],
  ['この 漢字は ____ 読みますか。', 'Kanji ini dibaca bagaimana?', 'どう', ['どれ', 'どの', 'どんな'], 'Cara baca', 'Bagaimana (cara)'],
  ['____ 人が 田中さんですか。', 'Yang mana Pak Tanaka?', 'どの', ['どれ', 'どんな', 'どう'], 'Pilihan', WHICH_NOUN],
  ['週末は ____ を しましたか。', 'Akhir pekan kamu melakukan apa?', '何', ['どこ', 'だれ', 'いつ'], 'Kegiatan', WHAT],
  ['会議は ____ 始まりますか。', 'Rapat dimulai kapan?', 'いつ', ['どう', 'どれ', 'だれ'], 'Waktu', WHEN],
  ['____ 人と 結婚したいですか。', 'Kamu ingin menikah dengan orang seperti apa?', 'どんな', ['どの', 'どれ', 'どう'], 'Sifat', WHAT_KIND],
  ['その 映画は ____ でしたか。', 'Film itu bagaimana?', 'どう', ['どの', 'どれ', 'どんな'], 'Kesan', HOW_IS],
  ['____ この 仕事を 選んだんですか。', 'Mengapa kamu memilih pekerjaan ini?', 'なぜ', ['どこ', 'だれ', 'いくら'], 'Alasan (formal)', WHY],
  ['____ で 日本語を 勉強しましたか。', 'Di mana kamu belajar bahasa Jepang?', 'どこ', ['どう', 'どれ', 'だれ'], 'Tempat', WHERE],
  ['今日は ____ 曜日ですか。', 'Hari ini hari apa?', '何', ['どう', 'どれ', 'いつ'], 'Hari', 'Apa + hari (= hari apa)'],
  ['これと あれと、____ が 安いですか。', 'Ini atau itu, mana yang lebih murah?', 'どちら', ['どの', 'どんな', 'どう'], 'Dua pilihan', WHICH_TWO],
  ['____ 料理が 一番 好きですか。', 'Masakan seperti apa yang paling kamu suka?', 'どんな', ['どれ', 'どう', 'いつ'], 'Sifat', WHAT_KIND],
  ['お茶でも ____ ですか。', 'Bagaimana kalau minum teh?', 'いかが', ['どれ', 'どの', 'どこ'], 'Menawarkan', 'Bentuk sopan untuk menawarkan (= bagaimana)'],
  ['____ 電車に 乗れば いいですか。', 'Kereta yang mana yang harus saya naiki?', 'どの', ['どれ', 'どう', 'どんな'], 'Pilihan', WHICH_NOUN],
  ['この 町に ____ 住んでいますか。', 'Sudah berapa lama tinggal di kota ini?', 'どのくらい', ['どの', 'どんな', 'どう'], 'Durasi', 'Seberapa (lama/jauh/banyak)'],
];

export const hardQuestions: ChoiceTuple[] = [
  ['明日 雨が 降る ____ わかりません。', 'Saya tidak tahu apakah besok hujan atau tidak.', 'かどうか', ['ので', 'と', 'けど'], 'Ya/tidak tak langsung', 'Pertanyaan ya/tidak di dalam kalimat (= apakah … atau tidak)'],
  ['彼が どこに 住んでいる ____ 知っていますか。', 'Tahukah kamu dia tinggal di mana?', 'か', ['かどうか', 'ので', 'と'], 'Kata tanya tak langsung', 'Pertanyaan dengan kata tanya di dalam kalimat'],
  ['____ どうしたんですか。', 'Sebenarnya ada apa?', '一体', ['何か', 'だれか', 'どこか'], 'Penegasan', 'Adverbia "sebenarnya" dalam pertanyaan'],
  ['日本語が 上手に なるには ____ いいですか。', 'Bagaimana supaya bahasa Jepang jadi mahir?', 'どうすれば', ['どうして', 'どうやって', 'どこで'], 'Minta saran', 'Bagaimana (syarat) + ii desu ka'],
  ['____ 飲みませんか。', 'Mau minum sesuatu?', '何か', ['何も', 'だれか', 'どこか'], 'Tak tentu', INDEFINITE],
  ['____ 来ましたか。', 'Apakah ada seseorang yang datang?', 'だれか', ['だれも', '何か', 'どこか'], 'Tak tentu', INDEFINITE],
  ['昨日は ____ 行きませんでした。', 'Kemarin saya tidak pergi ke mana pun.', 'どこへも', ['どこか', 'だれも', '何か'], 'Tidak sama sekali', NONE],
  ['冷蔵庫に ____ ありません。', 'Di kulkas tidak ada apa-apa.', '何も', ['何か', 'だれも', 'どこか'], 'Tidak sama sekali', NONE],
  ['____ 静かな ところへ 行きたい。', 'Saya ingin pergi ke suatu tempat yang tenang.', 'どこか', ['どこも', '何か', 'だれか'], 'Tak tentu', INDEFINITE],
  ['教室には ____ いません。', 'Di kelas tidak ada siapa pun.', 'だれも', ['だれか', '何も', 'どこも'], 'Tidak sama sekali', NONE],
  ['____ そんな ことを 言ったの？', 'Kok kamu bilang begitu?', 'なんで', ['何か', 'どれ', 'どの'], 'Alasan (lisan)', 'Menanyakan alasan dalam bahasa lisan'],
  ['すみません、駅は どちら ____。', 'Permisi, stasiun di sebelah mana? (sangat sopan)', 'でしょうか', ['ましょうか', 'でしたか', 'ませんか'], 'Sangat sopan', 'Akhiran tanya yang lebih halus'],
  ['これは ____ ための 道具ですか。', 'Ini alat untuk apa?', '何の', ['どの', 'どこの', 'だれの'], 'Tujuan', 'Apa + partikel milik (= untuk apa)'],
  ['肉と 魚と ____ が 好きですか。', 'Antara daging dan ikan, mana yang lebih kamu suka?', 'どちら', ['どの', 'どんな', 'どう'], 'Dua pilihan', WHICH_TWO],
  ['この 中で ____ が 一番 高いですか。', 'Di antara ini, mana yang paling mahal?', 'どれ', ['どちら', 'どの', 'どんな'], 'Tiga pilihan atau lebih', WHICH_PRONOUN],
  ['____ 待っても 彼は 来なかった。', 'Berapa lama pun menunggu, dia tidak datang.', 'いくら', ['いくつ', 'いつ', 'どれ'], 'Konsesi', 'Kata tanya + -te mo = sebanyak apa pun'],
  ['____ 言っても 彼は 聞かない。', 'Apa pun yang dikatakan, dia tidak mendengar.', '何を', ['どこを', 'だれを', 'いつを'], 'Konsesi', 'Kata tanya + -te mo = apa pun'],
  ['彼が 来るか ____ か わかりません。', 'Saya tidak tahu dia datang atau tidak.', '来ない', ['来る', '来た', '来て'], 'Positif-negatif', 'V-ka + V negatif-ka'],
  ['どうして 遅れた ____ ですか。', 'Mengapa (bisa) terlambat?', 'ん', ['か', 'ね', 'よ'], 'Minta penjelasan', 'Partikel penjelasan + desu ka'],
  ['試験は ____ でしたか。', 'Bagaimana ujiannya? (sopan)', 'いかが', ['いかに', 'いくら', 'いくつ'], 'Kesan (sopan)', 'Bentuk sopan dari "bagaimana"'],
  ['何を ____ いいか 教えて ください。', 'Tolong beri tahu apa yang sebaiknya saya lakukan.', 'すれば', ['する', 'した', 'しよう'], 'Minta saran', 'Kata tanya + syarat -eba + ii ka'],
  ['____ 人でも 参加できます。', 'Orang seperti apa pun boleh ikut.', 'どんな', ['どれ', 'どう', 'どこ'], 'Siapa pun', 'Kata tanya + demo = … apa pun'],
  ['____ でも いいです。', 'Kapan pun boleh.', 'いつ', ['どの', 'どう', 'だれか'], 'Kapan pun', 'Kata tanya + demo = … pun'],
  ['この 料理は ____ 作るんですか。', 'Masakan ini dibuat bagaimana?', 'どうやって', ['どうして', 'どこか', 'だれか'], 'Cara', HOW],
  ['彼女が ____ 怒っているのか わかりません。', 'Saya tidak mengerti kenapa dia marah.', 'なぜ', ['何か', 'どこか', 'だれか'], 'Alasan tak langsung', WHY],
  ['あの 方は ____ ですか。', 'Beliau siapa? (sopan)', 'どなた', ['どれ', 'どの', 'いくら'], 'Orang (sopan)', 'Bentuk sopan dari "siapa"'],
  ['ご出身は ____ ですか。', 'Anda berasal dari mana? (sopan)', 'どちら', ['どなた', 'どれ', 'いくら'], 'Asal (sopan)', WHICH_TWO],
  ['何時に 行けば ____ ですか。', 'Sebaiknya pergi jam berapa?', 'いい', ['なる', 'する', 'ある'], 'Minta saran', 'Syarat -eba + "baik?"'],
  ['____ 食べても 太らない 人が いる。', 'Ada orang yang tidak gemuk walau makan sebanyak apa pun.', 'いくら', ['いくつ', 'いつ', 'どれ'], 'Konsesi', 'Kata tanya + -te mo = sebanyak apa pun'],
  ['____ か 質問は ありますか。', 'Ada pertanyaan?', '何', ['どこ', 'いつ', 'どう'], 'Tak tentu', INDEFINITE],
];
