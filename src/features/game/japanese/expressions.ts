// Japanese Expression Quest (modal-quest mode): wants, permission, obligation, guesses, 30 per level.
// [prompt, Indonesian translation, answer, three wrong options, tone, rule]
// Tone and rule are the clue shown before answering, so they never contain the answer.
// Wrong options leave out synonyms that would also fit (いけません/だめです, どうして/なぜ).
import type { ChoiceTuple } from '../mandarin/questions';

const WANT = 'ingin melakukan sesuatu';
const PERMIT = 'izin (boleh)';
const BAN = 'larangan (tidak boleh)';
const MUST = 'kewajiban (harus)';
const NO_NEED = 'tidak perlu';
const GUESS = 'perkiraan (mungkin / barangkali)';
const HEARSAY = 'kabar dari orang lain (katanya)';
const LOOKS = 'kesan dari penampilan (kelihatannya)';
const INVITE = 'mengajak (ayo)';

export const easyExpressions: ChoiceTuple[] = [
  ['日本へ 行き____。', 'Saya ingin pergi ke Jepang.', 'たいです', ['ましょう', 'ません', 'ました'], 'Keinginan', WANT],
  ['ここで 写真を 撮っても ____ か。', 'Bolehkah memotret di sini?', 'いいです', ['いけません', 'なりません', 'ください'], 'Izin', PERMIT],
  ['ここで たばこを 吸っては ____。', 'Tidak boleh merokok di sini.', 'いけません', ['いいです', 'ください', 'あります'], 'Larangan', BAN],
  ['毎日 薬を 飲まなければ ____。', 'Setiap hari harus minum obat.', 'なりません', ['いけます', 'いいです', 'ください'], 'Kewajiban', MUST],
  ['明日は 来なくても ____。', 'Besok tidak perlu datang.', 'いいです', ['いけません', 'なりません', 'ください'], 'Tidak perlu', NO_NEED],
  ['早く 寝た ____ が いいですよ。', 'Sebaiknya tidur lebih awal.', 'ほう', ['こと', 'もの', 'ところ'], 'Saran', 'nasihat: sebaiknya'],
  ['日本語を 話す ____ が できます。', 'Saya bisa berbicara bahasa Jepang.', 'こと', ['ほう', 'もの', 'ところ'], 'Kemampuan', 'kemampuan: bisa melakukan'],
  ['明日は 雨が 降る ____。', 'Besok mungkin hujan (perkiraan).', 'でしょう', ['ましょう', 'ください', 'たいです'], 'Perkiraan', GUESS],
  ['一緒に 帰り____ か。', 'Maukah pulang bersama?', 'ません', ['たい', 'ました', 'なさい'], 'Ajakan halus', 'mengajak dengan bertanya "tidakkah …?"'],
  ['窓を 開け____ か。', 'Bagaimana kalau saya bukakan jendela?', 'ましょう', ['たい', 'なさい', 'ました'], 'Menawarkan', 'menawarkan bantuan (bagaimana kalau saya …)'],
  ['ちょっと 休み____。', 'Ayo istirahat sebentar.', 'ましょう', ['たい', 'なさい', 'ません'], 'Ajakan', INVITE],
  ['野菜も 食べ____。', 'Makan sayurnya juga! (perintah orang tua)', 'なさい', ['たい', 'ません', 'ました'], 'Perintah lembut', 'perintah dari orang tua/guru'],
  ['新しい パソコンが ____。', 'Saya ingin komputer baru.', 'ほしいです', ['たいです', 'いいです', 'できます'], 'Keinginan benda', 'ingin memiliki benda'],
  ['ピアノが ____。', 'Saya bisa bermain piano.', '弾けます', ['弾きたい', '弾かれます', '弾かせます'], 'Kemampuan', 'bentuk potensial'],
  ['この 部屋で 食べては ____。', 'Tidak boleh makan di kamar ini.', 'いけません', ['いいです', 'ください', 'ほしいです'], 'Larangan', BAN],
  ['宿題を しなくても ____ か。', 'Apakah tidak perlu mengerjakan PR?', 'いいです', ['いけません', 'なりません', 'ください'], 'Tidak perlu', NO_NEED],
  ['明日 テストが ある ____ です。', 'Katanya besok ada tes.', 'そう', ['ほう', 'こと', 'ため'], 'Kabar', HEARSAY],
  ['日曜日は 家で 休む ____ です。', 'Hari Minggu saya berniat istirahat di rumah.', 'つもり', ['ほう', 'こと', 'そう'], 'Niat', 'niat / rencana pribadi'],
  ['雨が 降り____ です。', 'Kelihatannya akan hujan.', 'そう', ['たい', 'ほう', 'こと'], 'Kesan', LOOKS],
  ['外は 寒い ____ しれません。', 'Di luar mungkin dingin.', 'かも', ['でも', 'から', 'まで'], 'Kemungkinan', GUESS],
  ['ここに 名前を 書いて ____。', 'Tolong tulis nama di sini.', 'ください', ['いけません', 'なりません', 'しまいます'], 'Permintaan', 'meminta tolong dengan sopan'],
  ['もう 少し ゆっくり 話して ____ ませんか。', 'Bisakah bicara sedikit lebih pelan?', 'くれ', ['いけ', 'なり', 'しまい'], 'Permintaan halus', 'meminta tolong secara halus'],
  ['早く 帰った ほうが ____。', 'Sebaiknya cepat pulang.', 'いいです', ['いけません', 'なりません', 'ください'], 'Saran', 'nasihat: sebaiknya'],
  ['ここで 泳いでは ____。', 'Tidak boleh berenang di sini.', 'だめです', ['いいです', 'ください', 'ほしいです'], 'Larangan lisan', BAN],
  ['この 漢字が ____ か。', 'Bisakah kamu membaca kanji ini?', '読めます', ['読みたい', '読まれます', '読ませます'], 'Kemampuan', 'bentuk potensial'],
  ['日本の 映画が 見____ です。', 'Saya ingin menonton film Jepang.', 'たい', ['ほしい', 'ましょう', 'なさい'], 'Keinginan', WANT],
  ['明日は 晴れる ____。', 'Besok mungkin cerah.', 'でしょう', ['ましょう', 'ください', 'たいです'], 'Perkiraan', GUESS],
  ['田中さんは もう 帰った ____ です。', 'Sepertinya Tanaka sudah pulang.', 'よう', ['ほう', 'こと', 'つもり'], 'Dugaan', 'dugaan dari situasi (sepertinya)'],
  ['来年 結婚する ____ です。', 'Tahun depan saya dijadwalkan menikah.', '予定', ['ほう', 'こと', 'ため'], 'Jadwal', 'rencana yang sudah dijadwalkan'],
  ['夜 遅く 電話しない____ ください。', 'Tolong jangan menelepon larut malam.', 'で', ['て', 'と', 'に'], 'Larangan halus', 'meminta agar tidak melakukan'],
];

export const mediumExpressions: ChoiceTuple[] = [
  ['約束は 守る ____ です。', 'Janji sepatutnya ditepati.', 'べき', ['はず', 'つもり', 'よう'], 'Kepatutan', 'seharusnya secara moral'],
  ['荷物は 明日 届く ____ です。', 'Paketnya seharusnya sampai besok.', 'はず', ['べき', 'つもり', 'ほう'], 'Perkiraan kuat', 'seharusnya (berdasarkan alasan)'],
  ['毎日 日本語で 日記を 書く ____ に しています。', 'Saya membiasakan menulis buku harian setiap hari.', 'よう', ['はず', 'べき', 'つもり'], 'Usaha kebiasaan', 'berusaha membiasakan'],
  ['来月から ジムに 通う ____ に しました。', 'Saya memutuskan untuk ke gym mulai bulan depan.', 'こと', ['はず', 'べき', 'わけ'], 'Keputusan sendiri', 'memutuskan sendiri'],
  ['日本語が 話せる ____ に なりました。', 'Saya jadi bisa berbicara bahasa Jepang.', 'よう', ['こと', 'はず', 'べき'], 'Perubahan', 'perubahan keadaan/kemampuan'],
  ['来週 出張する ____ に なりました。', 'Diputuskan saya akan dinas minggu depan.', 'こと', ['よう', 'はず', 'べき'], 'Keputusan pihak lain', 'diputuskan (bukan oleh diri sendiri)'],
  ['証拠が あるから、彼が 犯人 ____ ない。', 'Ada buktinya, dia pasti pelakunya.', 'に違い', ['かもしれ', 'はずが', 'わけが'], 'Keyakinan', 'yakin sekali (pasti)'],
  ['この 仕事は 今日中に 終わる ____ が ない。', 'Tidak mungkin pekerjaan ini selesai hari ini.', 'はず', ['べき', 'つもり', 'よう'], 'Kemustahilan', 'tidak mungkin (berdasarkan alasan)'],
  ['あの 店は 高い ____ です。', 'Kabarnya toko itu mahal.', 'らしい', ['べき', 'つもり', 'ため'], 'Kabar', 'kabar yang didengar (kabarnya)'],
  ['子どもの ____ 泣いて いる。', 'Dia menangis seperti anak kecil.', 'ように', ['ために', 'はずに', 'べきに'], 'Perumpamaan', 'seperti …'],
  ['遅れる ____ なら 連絡して ください。', 'Kalau sepertinya akan terlambat, tolong hubungi.', 'よう', ['こと', 'はず', 'べき'], 'Kemungkinan', 'kalau tampaknya …'],
  ['時間が ないので、タクシーで 行く ____ ない。', 'Karena tidak ada waktu, terpaksa naik taksi.', 'しか', ['だけ', 'ほど', 'ばかり'], 'Satu-satunya pilihan', 'tidak ada pilihan lain'],
  ['彼女は 今日 来ない ____ もしれない。', 'Mungkin dia tidak datang hari ini.', 'か', ['が', 'を', 'に'], 'Kemungkinan', GUESS],
  ['疲れた ____ だね。早く 寝たら？', 'Kelihatannya kamu lelah ya. Tidurlah lebih awal.', 'よう', ['べき', 'はず', 'つもり'], 'Dugaan', 'dugaan dari situasi (sepertinya)'],
  ['電車が 止まった。このまま では 間に合わない ____ だ。', 'Keretanya berhenti. Katanya kalau begini tidak akan keburu.', 'そう', ['べき', 'つもり', 'ほう'], 'Kabar', HEARSAY],
  ['健康の ために 野菜を 食べる ____ です。', 'Demi kesehatan, sepatutnya makan sayur.', 'べき', ['はず', 'つもり', 'ところ'], 'Kepatutan', 'seharusnya secara moral'],
  ['ここに 車を 止めても ____ ですか。', 'Bolehkah parkir di sini?', 'かまいません', ['いけません', 'なりません', 'しかたありません'], 'Izin sopan', 'tidak keberatan (boleh)'],
  ['急が____ 間に合わない。', 'Kalau tidak bergegas, tidak akan keburu.', 'ないと', ['なくても', 'ないで', 'なさい'], 'Syarat wajib', 'kalau tidak …, (akibat buruk)'],
  ['雨が 降り____ だから、傘を 持って 行こう。', 'Sepertinya akan hujan, ayo bawa payung.', 'そう', ['よう', 'べき', 'はず'], 'Kesan', LOOKS],
  ['宿題を 忘れない ____ に 気を つけて ください。', 'Hati-hati supaya tidak lupa PR.', 'よう', ['こと', 'はず', 'べき'], 'Tujuan', 'supaya (hasil yang diharapkan)'],
  ['今から 出かける ____ です。', 'Saya baru akan berangkat sekarang.', 'ところ', ['はず', 'べき', 'よう'], 'Tepat akan', 'tepat pada saat akan …'],
  ['十年 住んでいたから、日本語が 上手な ____ だ。', 'Pantas saja bahasa Jepangnya bagus, dia tinggal sepuluh tahun di sana.', 'わけ', ['べき', 'つもり', 'ところ'], 'Pantas saja', 'kesimpulan yang masuk akal (pantas saja)'],
  ['何度 説明しても わからない ____ だ。', 'Sepertinya dia tidak mengerti walau dijelaskan berkali-kali.', 'よう', ['べき', 'つもり', 'ところ'], 'Dugaan', 'dugaan dari situasi (sepertinya)'],
  ['もう 遅いから、帰らな____。', 'Sudah larut, harus pulang.', 'きゃ', ['くて', 'いで', 'さい'], 'Kewajiban lisan', 'harus (bahasa lisan)'],
  ['一人で 行っても ____ けど、一緒に 行こう。', 'Pergi sendiri juga tidak apa-apa, tapi ayo bersama.', 'いい', ['だめ', 'べき', 'はず'], 'Izin', PERMIT],
  ['会いたくても 忙しくて 会え____。', 'Meskipun ingin bertemu, karena sibuk tidak bisa.', 'ない', ['たい', 'よう', 'そう'], 'Ketidakmampuan', 'potensial negatif'],
  ['早く 夏休みに なれば いい____ なあ。', 'Andai libur musim panas cepat datang.', 'のに', ['から', 'ので', 'まで'], 'Harapan', 'berharap (andai saja)'],
  ['日本語を 勉強する ____ に 日本へ 来ました。', 'Saya datang ke Jepang untuk belajar bahasa Jepang.', 'ため', ['よう', 'はず', 'べき'], 'Tujuan', 'untuk (tindakan yang disengaja)'],
  ['この 薬は 一日 三回 飲む ____ に なって います。', 'Obat ini aturannya diminum tiga kali sehari.', 'こと', ['よう', 'はず', 'べき'], 'Aturan', 'aturan yang berlaku'],
  ['彼は きっと 来る ____ だ。', 'Dia seharusnya pasti datang (ada alasannya).', 'はず', ['べき', 'つもり', 'ところ'], 'Perkiraan kuat', 'seharusnya (berdasarkan alasan)'],
];

export const hardExpressions: ChoiceTuple[] = [
  ['上司に 頼まれたので、断る ____ には いかない。', 'Karena diminta atasan, tidak mungkin menolak.', 'わけ', ['はず', 'べき', 'こと'], 'Tidak mungkin', 'tidak bisa begitu saja (karena keadaan)'],
  ['台風で 電車が 止まったので、会社を 休ま____ を得なかった。', 'Kereta berhenti karena topan, terpaksa tidak masuk kerja.', 'ざる', ['ない', 'なく', 'ず'], 'Terpaksa', 'tidak ada pilihan selain …'],
  ['彼の 話が 本当だ____ 思えない。', 'Ceritanya sulit dipercaya sebagai kenyataan.', 'とは', ['では', 'には', 'のは'], 'Keraguan', 'kutipan + penekanan (sulit dianggap …)'],
  ['試験に 合格する ____ には、毎日 勉強しなければ ならない。', 'Untuk lulus ujian, harus belajar setiap hari.', 'ため', ['よう', 'はず', 'べき'], 'Tujuan', 'untuk mencapai …'],
  ['そんな ことを 言う ____ では ない。', 'Kamu tidak sepatutnya berkata begitu.', 'べき', ['はず', 'つもり', 'ところ'], 'Teguran', 'tidak sepatutnya'],
  ['この 計画は 成功する ____ が ない。', 'Rencana ini tidak mungkin berhasil.', 'わけ', ['べき', 'つもり', 'ところ'], 'Kemustahilan', 'sama sekali tidak mungkin'],
  ['あんな ことを されたら、彼が 怒るのも ____ は ない。', 'Diperlakukan begitu, wajar saja dia marah.', '無理', ['理由', '意味', '必要'], 'Kewajaran', 'tidak mengherankan'],
  ['子どもが 寝ている ____ に 掃除を 済ませた。', 'Selagi anak tidur, saya selesaikan bersih-bersih.', 'うち', ['ため', 'ほう', 'はず'], 'Selagi', 'selama keadaan masih berlangsung'],
  ['何度 失敗しても、諦める ____ は ない。', 'Berapa kali pun gagal, tidak perlu menyerah.', 'こと', ['べき', 'わけ', 'はず'], 'Tidak perlu', 'tidak perlu sampai …'],
  ['彼は 知っている ____ に、何も 言わない。', 'Padahal tahu, dia tidak berkata apa-apa (menyebalkan).', 'くせ', ['ため', 'はず', 'よう'], 'Kritik', 'padahal … (bernada mencela)'],
  ['部長は もう お帰りに ____。', 'Manajer sudah pulang (hormat).', 'なりました', ['しました', 'されました', 'いたしました'], 'Sonkeigo', 'menghormati tindakan atasan'],
  ['明日 こちらから ご連絡 ____。', 'Besok saya yang akan menghubungi Anda (rendah hati).', 'いたします', ['なさいます', 'になります', 'されます'], 'Kenjougo', 'merendahkan tindakan sendiri'],
  ['日本に いる ____ に、富士山に 登りたい。', 'Selagi di Jepang, saya ingin mendaki Gunung Fuji.', 'うち', ['ため', 'はず', 'こと'], 'Selagi', 'selama keadaan masih berlangsung'],
  ['彼は 医者 ____ くせに、たばこを 吸って いる。', 'Padahal dokter, dia merokok.', 'の', ['な', 'が', 'を'], 'Kritik', 'kata benda + penghubung + "padahal"'],
  ['もう 二度と 遅刻 ____ ように 気を つけます。', 'Saya akan hati-hati agar tidak terlambat lagi.', 'しない', ['する', 'しよう', 'した'], 'Tekad', 'supaya tidak …'],
  ['雨が 止む ____ 待ちましょう。', 'Mari kita tunggu sampai hujan berhenti.', 'まで', ['までに', 'ため', 'ほど'], 'Batas waktu', 'terus menunggu sampai …'],
  ['今さら 謝った ____ もう 遅い。', 'Sekarang minta maaf pun sudah terlambat.', 'ところで', ['ばかりに', 'からこそ', 'ために'], 'Sia-sia', 'meskipun … pun percuma'],
  ['寝坊した ____ に、試験に 遅れて しまった。', 'Gara-gara kesiangan, saya terlambat ujian.', 'ばかり', ['ところ', 'うち', 'まま'], 'Penyesalan', 'gara-gara satu hal itu saja'],
  ['この 問題は 簡単な ____、間違える 人が 多い。', 'Walaupun soal ini mudah, banyak yang salah.', 'わりに', ['ために', 'ばかりに', 'からこそ'], 'Tidak sebanding', 'tidak sesuai dengan yang diharapkan'],
  ['一度 決めた ____ は、最後まで やるべきだ。', 'Karena sudah diputuskan, harus dilakukan sampai akhir.', '以上', ['うち', 'まま', 'ところ'], 'Konsekuensi', 'karena sudah …, maka harus'],
  ['彼女は 泣き ____ な 顔で 話した。', 'Dia bercerita dengan wajah hampir menangis.', 'そう', ['たい', 'ながら', 'べき'], 'Kesan', LOOKS],
  ['このまま では、会社は 倒産し ____ ない。', 'Kalau begini terus, perusahaan bisa saja bangkrut.', 'かね', ['える', 'がち', 'つつ'], 'Risiko', 'bisa saja terjadi (hal buruk)'],
  ['彼は 忙しい ____、毎日 ジムに 通って いる。', 'Meskipun sibuk, dia rutin ke gym setiap hari.', 'ながらも', ['ばかりに', 'からこそ', 'ために'], 'Konsesi', 'meskipun begitu, tetap'],
  ['最近 物を 忘れ____ に なった。', 'Akhir-akhir ini saya jadi pelupa.', 'っぽく', ['たく', 'べく', 'させ'], 'Kecenderungan', 'cenderung bersifat …'],
  ['説明書を 読まず ____ 使い始めた。', 'Dia mulai memakai tanpa membaca petunjuk.', 'に', ['で', 'と', 'を'], 'Tanpa', 'tanpa melakukan … (formal)'],
  ['彼の 実力 ____、優勝も 夢では ない。', 'Melihat kemampuannya, juara pun bukan mimpi.', 'からすれば', ['にしては', 'ものの', 'わりに'], 'Sudut pandang', 'dilihat dari …'],
  ['そんなに 食べたら、太る ____ 決まって いる。', 'Kalau makan sebanyak itu, sudah pasti gemuk.', 'に', ['を', 'で', 'が'], 'Kepastian', 'sudah pasti …'],
  ['一生懸命 練習した ____、優勝できた。', 'Berkat berlatih keras, bisa juara.', 'おかげで', ['せいで', 'くせに', 'わりに'], 'Sebab baik', 'berkat (hasil baik)'],
  ['道が 混んでいた ____、遅刻した。', 'Gara-gara jalan macet, saya terlambat.', 'せいで', ['おかげで', 'くせに', 'わりに'], 'Sebab buruk', 'gara-gara (hasil buruk)'],
  ['これは 子ども____ の 映画です。', 'Ini film yang ditujukan untuk anak-anak.', '向け', ['ため', 'らしい', 'っぽい'], 'Sasaran', 'ditujukan untuk (kalangan tertentu)'],
];
