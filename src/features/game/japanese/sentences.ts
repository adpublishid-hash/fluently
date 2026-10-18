// Japanese Sentence Builder: [Indonesian prompt, space-separated phrase chunks], 30 per level.
import type { SentenceTuple } from '../mandarin/sentences';

export const easySentences: SentenceTuple[] = [
  ['Saya pelajar.', '私は 学生 です'], ['Ini buku saya.', 'これは 私の 本 です'], ['Setiap pagi saya minum kopi.', '毎朝 コーヒーを 飲みます'],
  ['Saya pergi ke sekolah.', '学校へ 行きます'], ['Saya suka kucing.', '猫が 好き です'], ['Hari ini panas.', '今日は 暑い です'],
  ['Saya menonton film dengan teman.', '友達と 映画を 見ます'], ['Stasiun ada di mana?', '駅は どこ ですか'],
  ['Saya tidak makan daging.', '私は 肉を 食べません'], ['Saya belajar bahasa Jepang.', '日本語を 勉強します'],
  ['Nama saya Tanaka.', '私の 名前は 田中 です'], ['Ini pena.', 'これは ペン です'], ['Saya minum air.', '水を 飲みます'],
  ['Ayah saya dokter.', '父は 医者 です'], ['Kucing ini kecil.', 'この 猫は 小さい です'], ['Toilet ada di sana.', 'トイレは あそこ です'],
  ['Saya punya dua teman.', '友達が 二人 います'], ['Ibu ada di rumah.', '母は 家に います'], ['Saya suka musik.', '音楽が 好き です'],
  ['Dia tidak minum kopi.', '彼は コーヒーを 飲みません'], ['Sekarang jam delapan.', '今 八時 です'], ['Buku itu menarik.', 'その 本は おもしろい です'],
  ['Saya orang Indonesia.', '私は インドネシア人 です'], ['Saya bangun jam enam.', '六時に 起きます'], ['Saya pergi ke toko.', '店へ 行きます'],
  ['Teh ini tidak mahal.', 'この お茶は 高くない です'], ['Selamat pagi, Guru.', '先生 おはよう ございます'], ['Saya makan roti.', 'パンを 食べます'],
  ['Di taman ada anjing.', '公園に 犬が います'], ['Saya pulang naik bus.', 'バスで 帰ります'],
];

export const mediumSentences: SentenceTuple[] = [
  ['Kemarin saya menonton film dengan teman.', '昨日 友達と 映画を 見ました'], ['Bolehkah saya membuka jendela?', '窓を 開けても いい ですか'],
  ['Saya pernah pergi ke Jepang.', '日本へ 行った ことが あります'], ['Saya belajar sambil mendengarkan musik.', '音楽を 聞きながら 勉強します'],
  ['Saya menyikat gigi sebelum tidur.', '寝る 前に 歯を 磨きます'], ['Sebaiknya tidur lebih awal.', '早く 寝た ほうが いい です'],
  ['Saya bisa membaca sedikit kanji.', '漢字が 少し 読めます'], ['Besok mungkin hujan.', '明日は 雨が 降る かもしれません'],
  ['Kalau sudah sampai stasiun, tolong telepon.', '駅に 着いたら 電話して ください'], ['Tolong tunggu sebentar.', '少し 待って ください'],
  ['Saya sedang belajar di perpustakaan.', '図書館で 勉強して います'], ['Dia pernah ke Kyoto dua kali.', '彼は 京都へ 二回 行った ことが あります'],
  ['Rumah saya dekat dari stasiun.', '私の 家は 駅から 近い です'], ['Setiap hari saya ke kantor naik kereta.', '毎日 電車で 会社へ 行きます'],
  ['Kami sudah makan siang.', '私たちは もう 昼ご飯を 食べました'], ['Tolong bicara sedikit lebih pelan.', 'もう 少し ゆっくり 話して ください'],
  ['Hari ini lebih dingin daripada kemarin.', '今日は 昨日より 寒い です'], ['Saya ingin membeli dua tiket.', '切符を 二枚 買いたい です'],
  ['Dia sedang menelepon.', '彼は 電話して います'], ['Akhir pekan saya biasanya berbelanja.', '週末は たいてい 買い物を します'],
  ['Bolehkah saya duduk di sini?', 'ここに 座っても いい ですか'], ['Film ini sangat menarik.', 'この 映画は とても おもしろい です'],
  ['Saya ketinggalan payung.', '傘を 忘れました'], ['Dia larinya sangat cepat.', '彼は 走るのが とても 速い です'],
  ['Supermarket buka jam sembilan.', 'スーパーは 九時に 開きます'], ['Saya ingin pergi ke Jepang.', '日本へ 行きたい です'],
  ['Ayo pergi ke taman bersama.', '一緒に 公園へ 行きましょう'], ['Kamar ini sangat bersih.', 'この 部屋は とても きれい です'],
  ['Setelah mandi, saya tidur.', 'お風呂に 入ってから 寝ます'], ['Tolong jangan merokok di sini.', 'ここで たばこを 吸わないで ください'],
];

export const hardSentences: SentenceTuple[] = [
  ['Meskipun hujan, pertandingan tetap diadakan.', '雨が 降っても 試合は 行われます'], ['Saya menabung untuk kuliah di luar negeri.', '留学する ために お金を 貯めています'],
  ['Saya mencatat supaya tidak lupa.', '忘れない ように メモします'], ['Toko ini tidak hanya murah, tetapi juga enak.', 'この 店は 安い だけでなく おいしい です'],
  ['Paketnya seharusnya sampai besok.', '荷物は 明日 届く はず です'], ['Janji sepatutnya ditepati.', '約束は 守る べき です'],
  ['Kebiasaan berbeda tergantung negaranya.', '国に よって 習慣が 違います'], ['Saya ikut rapat sebagai penerjemah.', '通訳として 会議に 参加しました'],
  ['Perlu menilai berdasarkan data.', 'データに 基づいて 判断する 必要が あります'], ['Walau efektif, biayanya terlalu mahal.', '効果は ある ものの 費用が 高すぎます'],
  ['Dompet saya dicuri.', '財布を 盗まれました'], ['Ibu menyuruh saya membersihkan kamar.', '母は 私に 部屋を 掃除させました'],
  ['Kelihatannya akan hujan.', '雨が 降りそう です'], ['Katanya besok libur.', '明日は 休み だ そう です'],
  ['Semakin dipelajari, semakin menarik.', '勉強すれば するほど おもしろく なります'], ['Saya tidak sempat sarapan.', '朝ご飯を 食べる 時間が ありませんでした'],
  ['Begitu sampai di rumah, hujan mulai turun.', '家に 着いた とたん 雨が 降りだしました'], ['Dia bukan hanya pintar, tetapi juga baik hati.', '彼は 頭が いい だけでなく 優しい です'],
  ['Saya membaca buku sambil menunggu kereta.', '電車を 待ちながら 本を 読みました'], ['Saya sudah terbiasa dengan kehidupan di Tokyo.', '東京の 生活に もう 慣れました'],
  ['Saking lelahnya, saya langsung tertidur.', '疲れて すぐ 寝て しまいました'], ['Selain bahasa Inggris, dia juga bisa bahasa Jepang.', '彼は 英語の ほかに 日本語も 話せます'],
  ['Rapat ditunda sampai minggu depan.', '会議は 来週まで 延期されました'], ['Demi kesehatan, saya lari setiap pagi.', '健康の ために 毎朝 走って います'],
  ['Mendengar kabar itu, semua orang gembira.', 'その 知らせを 聞いて みんな 喜びました'], ['Masalah ini tidak semudah yang kamu pikirkan.', 'この 問題は 思って いる ほど 簡単では ありません'],
  ['Saya diminta guru untuk membaca.', '先生に 読む ように 言われました'], ['Padahal sudah belajar, saya lupa.', '勉強した のに 忘れて しまいました'],
  ['Kalau ke Jepang, Kyoto bagus.', '日本へ 行くなら 京都が いい です'], ['Saya terpaksa pulang karena hujan.', '雨の ため 帰らざるを 得ませんでした'],
];
