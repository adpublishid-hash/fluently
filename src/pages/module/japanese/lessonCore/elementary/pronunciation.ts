import type { LessonCoreTuple } from '../types';

// Pronunciation N4 — one entry per lesson (index = lesson - 1).
export const pronunciation: LessonCoreTuple[] = [
  ['Ritme bentuk て', ['Bentuk って dan んで: jeda っ satu ketukan penuh, ん satu ketukan penuh.', 'Jangan mempercepat mora kecil: か・っ・て = 3 ketukan.'], [
    ['買って、帰って、待って', 'Katte, kaette, matte', 'beli, pulang, tunggu'],
    ['読んで、遊んで、死んで', 'Yonde, asonde, shinde', 'baca, main, mati'],
    ['書いて、聞いて、歩いて', 'Kaite, kiite, aruite', 'tulis, dengar, jalan'],
    ['急いで、泳いで、脱いで', 'Isoide, oyoide, nuide', 'cepat-cepat, berenang, lepas'],
  ]],
  ['Kalimat panjang', ['Bagi kalimat panjang menjadi 2–3 kelompok napas.', 'Nada naik di awal kelompok, turun pelan sampai akhir.'], [
    ['駅前の本屋で、昨日買った雑誌を、友達に貸しました。', 'Ekimae no honya de, kinou katta zasshi o, tomodachi ni kashimashita.', 'Majalah yang kemarin saya beli di toko buku depan stasiun saya pinjamkan ke teman.'],
    ['仕事が終わったら、スーパーに寄って、晩ご飯の材料を買います。', 'Shigoto ga owattara, suupaa ni yotte, bangohan no zairyou o kaimasu.', 'Setelah kerja selesai, saya mampir ke supermarket dan membeli bahan makan malam.'],
    ['日本に来てから、自転車で通勤するようになりました。', 'Nihon ni kite kara, jitensha de tsuukin suru you ni narimashita.', 'Sejak datang ke Jepang, saya jadi pergi kerja naik sepeda.'],
    ['雨が降りそうなので、洗濯物を中に入れておきます。', 'Ame ga furisou na node, sentakumono o naka ni irete okimasu.', 'Sepertinya akan hujan, jadi saya masukkan jemuran ke dalam.'],
  ]],
  ['Nada pada kata kerja', ['Banyak kata kerja ます turun nadanya pada ま: たべま↘す.', 'Kata kerja kamus berbeda pola: 食べる (ta-BE-ru), 行く (i-KU, datar).'], [
    ['食べます', 'Tabemasu', 'makan'],
    ['行きます', 'Ikimasu', 'pergi'],
    ['分かりました', 'Wakarimashita', 'sudah mengerti'],
    ['始めましょう', 'Hajimemashou', 'mari mulai'],
  ]],
  ['Nada pada kata sifat', ['Kata sifat い sering turun sebelum い terakhir: たか↘い.', 'Bentuk lampau menggeser nada: たか↘かった.'], [
    ['高い、高かった', 'Takai, takakatta', 'mahal/tinggi, (lampau)'],
    ['新しい、新しかった', 'Atarashii, atarashikatta', 'baru, (lampau)'],
    ['赤い、赤かった', 'Akai, akakatta', 'merah, (lampau)'],
    ['おいしい、おいしかった', 'Oishii, oishikatta', 'enak, (lampau)'],
  ]],
  ['Nada akhir kalimat', ['よ (memberi tahu) sedikit naik; ね (mengajak setuju) naik lembut lalu turun.', 'Nada akhir mengubah nuansa, bukan arti dasar.'], [
    ['もう七時だよ。', 'Mou shichiji da yo.', 'Sudah jam tujuh, lho.'],
    ['このケーキ、おいしいね。', 'Kono keeki, oishii ne.', 'Kue ini enak, ya.'],
    ['明日は休みだよね？', 'Ashita wa yasumi da yo ne?', 'Besok libur, kan?'],
    ['そうなんだ。', 'Sou nan da.', 'Oh, begitu ya.'],
  ]],
  ['Jeda alami', ['Jeda setelah topik (〜は) dan konektor (でも, それで).', 'Jeda pendek membuat ucapan terdengar lebih jelas, bukan lebih lambat.'], [
    ['私は、毎朝、コーヒーを飲みます。', 'Watashi wa, maiasa, koohii o nomimasu.', 'Saya, setiap pagi, minum kopi.'],
    ['でも、今日は、紅茶にしました。', 'Demo, kyou wa, koucha ni shimashita.', 'Tapi, hari ini, saya memilih teh.'],
    ['それで、少し、眠いです。', 'Sorede, sukoshi, nemui desu.', 'Karena itu, saya sedikit mengantuk.'],
    ['実は、昨日、遅くまで起きていました。', 'Jitsu wa, kinou, osoku made okite imashita.', 'Sebenarnya, kemarin, saya begadang.'],
  ]],
  ['Shadowing dialog', ['Shadowing dua peran: tiru jeda pergantian giliran bicara.', 'Ucapkan aizuchi dengan nada pendek dan ringan.'], [
    ['ねえ、昨日のドラマ見た？', 'Nee, kinou no dorama mita?', 'Eh, nonton drama kemarin?'],
    ['見た見た！最後びっくりしたね。', 'Mita mita! Saigo bikkuri shita ne.', 'Nonton! Akhirnya mengejutkan, ya.'],
    ['うん、来週が楽しみ。', 'Un, raishuu ga tanoshimi.', 'Iya, tidak sabar minggu depan.'],
    ['じゃ、また話そうね。', 'Ja, mata hanasou ne.', 'Ya sudah, nanti kita ngobrol lagi.'],
  ]],
  ['Intonasi meminta izin', ['〜てもいいですか: nada naik halus di か, jangan terlalu tinggi.', 'Tambahkan あの… di awal untuk kesan sopan dan ragu.'], [
    ['あの、窓を閉めてもいいですか。', 'Ano, mado o shimete mo ii desu ka.', 'Anu, bolehkah saya menutup jendela?'],
    ['ここで待っていてもいいですか。', 'Koko de matte ite mo ii desu ka.', 'Bolehkah saya menunggu di sini?'],
    ['ペンを借りてもいいですか。', 'Pen o karite mo ii desu ka.', 'Bolehkah saya meminjam pena?'],
    ['先に帰ってもいいですか。', 'Saki ni kaette mo ii desu ka.', 'Bolehkah saya pulang duluan?'],
  ]],
  ['Melembutkan permintaan', ['Permintaan lembut: suara lebih rendah, tempo lebih lambat, akhiran memanjang.', 'Ekspresi pelunak: ちょっと, もしよかったら, 〜てもらえる？'], [
    ['もしよかったら、手伝ってもらえる？', 'Moshi yokattara, tetsudatte moraeru?', 'Kalau tidak keberatan, bisa bantu aku?'],
    ['ちょっとだけ、静かにしてくれる？', 'Chotto dake, shizuka ni shite kureru?', 'Bisa sedikit tenang?'],
    ['すみませんが、もう少しゆっくりお願いします。', 'Sumimasen ga, mou sukoshi yukkuri onegai shimasu.', 'Maaf, tolong sedikit lebih pelan.'],
    ['悪いけど、それ取ってくれない？', 'Warui kedo, sore totte kurenai?', 'Maaf ya, bisa ambilkan itu?'],
  ]],
  ['Nada meminta maaf', ['Nada maaf rendah dan lambat; tundukkan kepala sedikit.', 'Jangan menaikkan nada di akhir すみません.'], [
    ['本当にすみませんでした。', 'Hontou ni sumimasen deshita.', 'Saya benar-benar minta maaf.'],
    ['ご迷惑をおかけしました。', 'Gomeiwaku o okake shimashita.', 'Maaf telah merepotkan.'],
    ['私の不注意でした。', 'Watashi no fuchuui deshita.', 'Itu kecerobohan saya.'],
    ['以後、気をつけます。', 'Igo, ki o tsukemasu.', 'Selanjutnya saya akan berhati-hati.'],
  ]],
  ['Penekanan kontras', ['Tekankan kata yang dikontraskan dengan nada lebih tinggi dan jeda kecil.', 'は kontras: 肉は食べますが、魚は食べません.'], [
    ['肉は食べますが、魚は食べません。', 'Niku wa tabemasu ga, sakana wa tabemasen.', 'Daging saya makan, tapi ikan tidak.'],
    ['今日じゃなくて、明日です。', 'Kyou ja nakute, ashita desu.', 'Bukan hari ini, tapi besok.'],
    ['赤じゃなくて、青がいいです。', 'Aka ja nakute, ao ga ii desu.', 'Bukan merah, saya mau biru.'],
    ['私が行くんじゃなくて、兄が行きます。', 'Watashi ga ikun ja nakute, ani ga ikimasu.', 'Bukan saya yang pergi, tapi kakak laki-laki saya.'],
  ]],
  ['Penyingkatan partikel', ['Dalam bicara santai partikel を/は sering hilang: ご飯食べた？', 'ている → てる, ておく → とく, てしまう → ちゃう.'], [
    ['ご飯食べた？', 'Gohan tabeta?', 'Sudah makan?'],
    ['今、何してる？', 'Ima, nani shiteru?', 'Lagi ngapain?'],
    ['宿題、もうやっといた。', 'Shukudai, mou yattoita.', 'PR-nya sudah kukerjakan duluan.'],
    ['ケーキ、全部食べちゃった。', 'Keeki, zenbu tabechatta.', 'Kuenya kumakan habis.'],
  ]],
  ['Mendengar per kelompok kata', ['Dengar dan ulangi per kelompok kata, bukan per kata.', 'Kelompok kata = kata isi + partikel/akhiran.'], [
    ['新しい / 携帯を / 買いました。', 'Atarashii / keitai o / kaimashita.', 'Saya membeli ponsel baru.'],
    ['毎週 / 日曜日に / 母に / 電話します。', 'Maishuu / nichiyoubi ni / haha ni / denwa shimasu.', 'Setiap Minggu saya menelepon ibu.'],
    ['この道を / まっすぐ行くと / 海に出ます。', 'Kono michi o / massugu iku to / umi ni demasu.', 'Kalau jalan lurus di jalan ini, kamu sampai di laut.'],
    ['仕事の後で / 友達と / 飲みに行きました。', 'Shigoto no ato de / tomodachi to / nomi ni ikimashita.', 'Setelah kerja saya pergi minum dengan teman.'],
  ]],
  ['Mengatur kecepatan', ['Latih kalimat yang sama dengan tiga kecepatan: lambat, sedang, alami.', 'Panjang vokal dan っ tetap utuh di semua kecepatan.'], [
    ['もう少し待ってもらえますか。', 'Mou sukoshi matte moraemasu ka.', 'Bisakah menunggu sebentar lagi?'],
    ['ちょっと考えさせてください。', 'Chotto kangaesasete kudasai.', 'Biarkan saya berpikir sebentar.'],
    ['あとで連絡しますね。', 'Ato de renraku shimasu ne.', 'Nanti saya kabari, ya.'],
    ['気をつけて帰ってください。', 'Ki o tsukete kaette kudasai.', 'Hati-hati di jalan pulang.'],
  ]],
  ['Ketepatan mora', ['Hitung mora kata panjang: しゅっぱつ = しゅ・っ・ぱ・つ (4).', 'Bunyi ゃゅょ bergabung dengan huruf sebelumnya menjadi satu mora.'], [
    ['出発', 'Shuppatsu', 'keberangkatan (4 mora)'],
    ['病院と美容院', 'Byouin to biyouin', 'rumah sakit dan salon'],
    ['旅行', 'Ryokou', 'perjalanan (3 mora)'],
    ['きょうと と きよう', 'Kyouto to kiyou', 'Kyoto dan terampil'],
  ]],
  ['Ritme kata kanji', ['Kata kanji dua huruf sering 3–4 mora: 学校 (がっこう), 電話 (でんわ).', 'Jaga panjang vokal pada akhiran -ou, -ei.'], [
    ['先生', 'Sensei', 'guru (4 mora)'],
    ['結婚', 'Kekkon', 'pernikahan (4 mora)'],
    ['質問', 'Shitsumon', 'pertanyaan (4 mora)'],
    ['研究', 'Kenkyuu', 'penelitian (4 mora)'],
  ]],
  ['Kata majemuk', ['Kata majemuk biasanya punya satu puncak nada.', 'Bunyi pertama kata kedua sering bersuara: 本棚 (hondana), 雨傘 (amagasa).'], [
    ['本棚', 'Hondana', 'rak buku'],
    ['雨傘', 'Amagasa', 'payung hujan'],
    ['日本語教室', 'Nihongo kyoushitsu', 'kelas bahasa Jepang'],
    ['夏休み', 'Natsuyasumi', 'libur musim panas'],
  ]],
  ['Rekam dan ulangi', ['Rekam diri, dengarkan, lalu perbaiki satu hal setiap kali.', 'Fokus: nada akhir, っ, vokal panjang.'], [
    ['来週の会議は中止になりました。', 'Raishuu no kaigi wa chuushi ni narimashita.', 'Rapat minggu depan dibatalkan.'],
    ['切符を買うのを忘れてしまいました。', 'Kippu o kau no o wasurete shimaimashita.', 'Saya lupa membeli tiket.'],
    ['ちょうど今、出かけるところです。', 'Choudo ima, dekakeru tokoro desu.', 'Saya baru saja mau keluar.'],
    ['冷蔵庫に牛乳が入っています。', 'Reizouko ni gyuunyuu ga haitte imasu.', 'Di kulkas ada susu.'],
  ]],
  ['Percakapan alami', ['Gabungkan aizuchi, penyingkatan, dan nada akhir dalam dialog santai.', 'Jangan terlalu kaku; ikuti ritme lawan bicara.'], [
    ['ねえ、今度の休み、どっか行かない？', 'Nee, kondo no yasumi, dokka ikanai?', 'Eh, libur nanti mau pergi ke mana gitu?'],
    ['いいね。海とか、どう？', 'Ii ne. Umi toka, dou?', 'Boleh. Laut, misalnya, bagaimana?'],
    ['海いいね！じゃ、電車調べとくね。', 'Umi ii ne! Ja, densha shirabetoku ne.', 'Laut asyik! Kalau begitu, aku cek keretanya dulu.'],
    ['ありがと。楽しみにしてる。', 'Arigato. Tanoshimi ni shiteru.', 'Makasih. Aku menantikannya.'],
  ]],
  ['Ulasan pronunciation N4', ['Gabungkan: bentuk て, nada kata kerja/sifat, jeda, dan nada akhir.', 'Baca keras paragraf pendek dengan dua kecepatan.'], [
    ['日本に来て、もうすぐ一年になります。', 'Nihon ni kite, mou sugu ichinen ni narimasu.', 'Sebentar lagi genap setahun sejak saya datang ke Jepang.'],
    ['最初は、電車の乗り方も分かりませんでした。', 'Saisho wa, densha no norikata mo wakarimasen deshita.', 'Awalnya, cara naik kereta pun saya tidak tahu.'],
    ['今では、一人でどこへでも行けます。', 'Ima de wa, hitori de doko e demo ikemasu.', 'Sekarang saya bisa pergi ke mana saja sendirian.'],
    ['これからも、毎日練習を続けます。', 'Korekara mo, mainichi renshuu o tsuzukemasu.', 'Mulai sekarang pun, saya terus berlatih setiap hari.'],
  ]],
];
