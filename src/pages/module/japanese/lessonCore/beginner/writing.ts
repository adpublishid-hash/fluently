import type { LessonCoreTuple } from '../types';

// Writing N5 — one entry per lesson (index = lesson - 1).
export const writing: LessonCoreTuple[] = [
  ['Menulis hiragana', ['Tulis hiragana dengan urutan goresan yang benar; perhatikan tenten (゛) dan maru (゜).', 'Huruf kecil っ, ゃ, ゅ, ょ ditulis lebih kecil dan rendah.'], [
    ['きってをかいます。', 'Kitte o kaimasu.', 'Saya membeli perangko.'],
    ['でんしゃにのります。', 'Densha ni norimasu.', 'Saya naik kereta.'],
    ['きょうはげつようびです。', 'Kyou wa getsuyoubi desu.', 'Hari ini hari Senin.'],
    ['ちゃわんをあらいます。', 'Chawan o araimasu.', 'Saya mencuci mangkuk nasi.'],
  ]],
  ['Menulis katakana', ['Bedakan katakana mirip: シ/ツ, ソ/ン, ク/ケ.', 'Vokal panjang katakana memakai ー, bukan huruf vokal tambahan.'], [
    ['パソコンをつかいます。', 'Pasokon o tsukaimasu.', 'Saya memakai komputer.'],
    ['ソファでねます。', 'Sofa de nemasu.', 'Saya tidur di sofa.'],
    ['チョコレートをたべます。', 'Chokoreeto o tabemasu.', 'Saya makan cokelat.'],
    ['タクシーをよびます。', 'Takushii o yobimasu.', 'Saya memanggil taksi.'],
  ]],
  ['Profil diri', ['Profil singkat: nama, umur, asal, pekerjaan/sekolah, hobi.', 'Satu informasi per kalimat agar mudah dibaca.'], [
    ['私の名前はアディです。', 'Watashi no namae wa Adi desu.', 'Nama saya Adi.'],
    ['二十歳です。', 'Hatachi desu.', 'Saya berumur dua puluh tahun.'],
    ['バンドンの大学生です。', 'Bandon no daigakusei desu.', 'Saya mahasiswa di Bandung.'],
    ['趣味はサッカーです。', 'Shumi wa sakkaa desu.', 'Hobi saya sepak bola.'],
  ]],
  ['Kalimat rutinitas', ['Tulis kegiatan harian dengan 〜時に + kata kerja ます.', 'Hubungkan dua kegiatan dengan bentuk て.'], [
    ['五時半に起きます。', 'Goji han ni okimasu.', 'Saya bangun jam setengah enam.'],
    ['朝、ジョギングをします。', 'Asa, jogingu o shimasu.', 'Pagi hari saya joging.'],
    ['昼ご飯を食べて、少し寝ます。', 'Hirugohan o tabete, sukoshi nemasu.', 'Saya makan siang lalu tidur sebentar.'],
    ['十一時ごろ寝ます。', 'Juuichiji goro nemasu.', 'Saya tidur sekitar jam sebelas.'],
  ]],
  ['Catatan belanja', ['Catatan belanja: barang + jumlah dengan kata bantu bilangan (個, 本, 枚).', 'Tambahkan pengingat dengan 〜を忘れないで.'], [
    ['りんごを三個買う。', 'Ringo o sanko kau.', 'Beli tiga buah apel.'],
    ['ビールを六本買う。', 'Biiru o roppon kau.', 'Beli enam botol bir.'],
    ['切手を五枚買う。', 'Kitte o gomai kau.', 'Beli lima lembar perangko.'],
    ['しょうゆを忘れないで。', 'Shouyu o wasurenaide.', 'Jangan lupa kecap asin.'],
  ]],
  ['Undangan singkat', ['Undangan: acara, waktu, tempat, lalu ajakan 〜ませんか.', 'Tutup dengan permintaan balasan: 返事をください.'], [
    ['来週の土曜日は私の誕生日です。', 'Raishuu no doyoubi wa watashi no tanjoubi desu.', 'Sabtu minggu depan ulang tahun saya.'],
    ['うちでパーティーをします。', 'Uchi de paatii o shimasu.', 'Saya mengadakan pesta di rumah.'],
    ['六時から一緒に食べませんか。', 'Rokuji kara issho ni tabemasen ka.', 'Maukah makan bersama mulai jam enam?'],
    ['返事をください。', 'Henji o kudasai.', 'Mohon balasannya.'],
  ]],
  ['Email sederhana', ['Email: sapaan nama → isi → permintaan → penutup → nama pengirim.', 'Penutup umum: よろしくお願いします.'], [
    ['山下さん、こんにちは。', 'Yamashita san, konnichiwa.', 'Halo, Yamashita.'],
    ['この前は本をありがとうございました。', 'Kono mae wa hon o arigatou gozaimashita.', 'Terima kasih untuk bukunya waktu itu.'],
    ['とてもおもしろかったです。', 'Totemo omoshirokatta desu.', 'Sangat menarik.'],
    ['来週、お返しします。', 'Raishuu, okaeshi shimasu.', 'Minggu depan akan saya kembalikan.'],
  ]],
  ['Buku harian lima kalimat', ['Tulis kejadian hari ini dengan bentuk lampau ました.', 'Kalimat terakhir menyatakan perasaan: 〜かったです / 〜でした.'], [
    ['今日は友達の家に行きました。', 'Kyou wa tomodachi no ie ni ikimashita.', 'Hari ini saya pergi ke rumah teman.'],
    ['一緒にケーキを作りました。', 'Issho ni keeki o tsukurimashita.', 'Kami membuat kue bersama.'],
    ['ケーキはちょっと甘かったです。', 'Keeki wa chotto amakatta desu.', 'Kuenya agak manis.'],
    ['夜は早く寝ました。', 'Yoru wa hayaku nemashita.', 'Malamnya saya tidur cepat.'],
  ]],
  ['Paragraf keluarga', ['Mulai dari jumlah anggota keluarga, lalu jelaskan satu per satu.', 'Pakai 〜で、〜 untuk menggabungkan dua informasi.'], [
    ['うちは三人家族です。', 'Uchi wa sannin kazoku desu.', 'Keluarga kami tiga orang.'],
    ['父は先生で、まじめな人です。', 'Chichi wa sensei de, majime na hito desu.', 'Ayah saya guru dan orangnya serius.'],
    ['母は花が好きで、庭が広いです。', 'Haha wa hana ga suki de, niwa ga hiroi desu.', 'Ibu suka bunga, dan halamannya luas.'],
    ['私は家族が大好きです。', 'Watashi wa kazoku ga daisuki desu.', 'Saya sangat sayang keluarga.'],
  ]],
  ['Paragraf hobi', ['Jelaskan hobi: apa, kapan, dengan siapa, mengapa suka.', 'Alasan ditulis dengan 〜から.'], [
    ['私の趣味は料理です。', 'Watashi no shumi wa ryouri desu.', 'Hobi saya memasak.'],
    ['週末によくカレーを作ります。', 'Shuumatsu ni yoku karee o tsukurimasu.', 'Akhir pekan saya sering membuat kari.'],
    ['家族がおいしいと言いますから、うれしいです。', 'Kazoku ga oishii to iimasu kara, ureshii desu.', 'Keluarga bilang enak, jadi saya senang.'],
    ['今度はケーキを作りたいです。', 'Kondo wa keeki o tsukuritai desu.', 'Lain kali saya ingin membuat kue.'],
  ]],
  ['Catatan cuaca', ['Tulis cuaca hari ini dan rencana yang terpengaruh.', 'Pakai 〜から untuk alasan: 雨ですから、うちにいます.'], [
    ['今日は朝から雪です。', 'Kyou wa asa kara yuki desu.', 'Hari ini salju sejak pagi.'],
    ['とても寒いですから、コートを着ます。', 'Totemo samui desu kara, kooto o kimasu.', 'Sangat dingin, jadi saya memakai mantel.'],
    ['道が滑りますから、ゆっくり歩きます。', 'Michi ga suberimasu kara, yukkuri arukimasu.', 'Jalannya licin, jadi saya berjalan pelan.'],
    ['夜は家で鍋を食べます。', 'Yoru wa ie de nabe o tabemasu.', 'Malam ini saya makan nabe di rumah.'],
  ]],
  ['Rencana perjalanan', ['Tulis rencana dengan waktu + tempat + kegiatan; gunakan 〜たいです.', 'Urutkan dengan まず, それから, 最後に.'], [
    ['夏休みに北海道へ行きます。', 'Natsuyasumi ni Hokkaidou e ikimasu.', 'Saat libur musim panas saya pergi ke Hokkaido.'],
    ['まず、札幌でラーメンを食べたいです。', 'Mazu, Sapporo de raamen o tabetai desu.', 'Pertama, saya ingin makan ramen di Sapporo.'],
    ['それから、湖で写真を撮りたいです。', 'Sorekara, mizuumi de shashin o toritai desu.', 'Lalu saya ingin memotret di danau.'],
    ['四日間の旅行です。', 'Yokkakan no ryokou desu.', 'Perjalanannya empat hari.'],
  ]],
  ['Catatan permintaan maaf', ['Catatan maaf: minta maaf → alasan → janji.', 'Gunakan すみませんでした untuk kesalahan yang sudah terjadi.'], [
    ['昨日はすみませんでした。', 'Kinou wa sumimasen deshita.', 'Maaf untuk kemarin.'],
    ['約束の時間を忘れました。', 'Yakusoku no jikan o wasuremashita.', 'Saya lupa jam janjiannya.'],
    ['本当にごめんなさい。', 'Hontou ni gomennasai.', 'Saya benar-benar minta maaf.'],
    ['今度、昼ご飯をごちそうします。', 'Kondo, hirugohan o gochisou shimasu.', 'Lain kali saya traktir makan siang.'],
  ]],
  ['Catatan terima kasih', ['Sebut hal yang disyukuri secara spesifik, lalu kesan dan harapan.', 'Kalimat penutup: これからもよろしくお願いします.'], [
    ['すてきなプレゼントをありがとう。', 'Suteki na purezento o arigatou.', 'Terima kasih untuk hadiahnya yang indah.'],
    ['毎日そのマフラーを使っています。', 'Mainichi sono mafuraa o tsukatte imasu.', 'Saya memakai syal itu setiap hari.'],
    ['とても暖かいです。', 'Totemo atatakai desu.', 'Sangat hangat.'],
    ['これからもよろしくお願いします。', 'Korekara mo yoroshiku onegai shimasu.', 'Mohon terus berteman baik ke depannya.'],
  ]],
  ['Menulis petunjuk arah', ['Tulis langkah dengan bentuk て: 出て, 渡って, 曲がって.', 'Akhiri dengan patokan tujuan: 〜の隣です.'], [
    ['駅の南口を出て、右へ行ってください。', 'Eki no minamiguchi o dete, migi e itte kudasai.', 'Keluar dari pintu selatan stasiun, lalu ke kanan.'],
    ['コンビニの角を左に曲がってください。', 'Konbini no kado o hidari ni magatte kudasai.', 'Belok kiri di sudut minimarket.'],
    ['私のアパートは公園の隣です。', 'Watashi no apaato wa kouen no tonari desu.', 'Apartemen saya di sebelah taman.'],
    ['白い建物の三階です。', 'Shiroi tatemono no sangai desu.', 'Lantai tiga gedung putih.'],
  ]],
  ['Kalimat dengan kanji N5', ['Ganti hiragana dengan kanji N5 yang sudah dipelajari: 学校, 先生, 時間, 毎日.', 'Okurigana tetap hiragana: 行きます, 食べます.'], [
    ['毎週水曜日に先生と話します。', 'Maishuu suiyoubi ni sensei to hanashimasu.', 'Setiap Rabu saya berbicara dengan guru.'],
    ['学校の前に高い木があります。', 'Gakkou no mae ni takai ki ga arimasu.', 'Di depan sekolah ada pohon tinggi.'],
    ['電車で一時間かかります。', 'Densha de ichijikan kakarimasu.', 'Naik kereta butuh satu jam.'],
    ['今年の八月に国へ帰ります。', 'Kotoshi no hachigatsu ni kuni e kaerimasu.', 'Bulan Agustus tahun ini saya pulang ke negara asal.'],
  ]],
  ['Menulis pertanyaan', ['Kalimat tanya ditutup dengan か dan tanda 。 (dalam tulisan formal).', 'Kata tanya: 何, どこ, いつ, 誰, どうして, いくら.'], [
    ['お国はどちらですか。', 'Okuni wa dochira desu ka.', 'Anda berasal dari negara mana?'],
    ['いつ日本に来ましたか。', 'Itsu Nihon ni kimashita ka.', 'Kapan Anda datang ke Jepang?'],
    ['誰と住んでいますか。', 'Dare to sunde imasu ka.', 'Anda tinggal dengan siapa?'],
    ['どうして日本語を勉強していますか。', 'Doushite nihongo o benkyou shite imasu ka.', 'Mengapa Anda belajar bahasa Jepang?'],
  ]],
  ['Menulis jawaban', ['Jawaban lengkap mengulang kata kerja pertanyaan.', 'Untuk alasan, tutup dengan 〜からです.'], [
    ['インドネシアから来ました。', 'Indoneshia kara kimashita.', 'Saya datang dari Indonesia.'],
    ['去年の四月に来ました。', 'Kyonen no shigatsu ni kimashita.', 'Saya datang bulan April tahun lalu.'],
    ['ルームメートと住んでいます。', 'Ruumumeeto to sunde imasu.', 'Saya tinggal dengan teman sekamar.'],
    ['日本のアニメが好きだからです。', 'Nihon no anime ga suki da kara desu.', 'Karena saya suka anime Jepang.'],
  ]],
  ['Karangan mini', ['Karangan mini: pembuka (topik), isi (2–3 fakta), penutup (perasaan/harapan).', 'Judul ditulis di baris pertama, nama di baris kedua.'], [
    ['私の町はスラバヤです。', 'Watashi no machi wa Surabaya desu.', 'Kota saya Surabaya.'],
    ['大きくて、にぎやかな町です。', 'Ookikute, nigiyaka na machi desu.', 'Kota yang besar dan ramai.'],
    ['おいしい屋台がたくさんあります。', 'Oishii yatai ga takusan arimasu.', 'Ada banyak warung kaki lima yang enak.'],
    ['ぜひ一度来てください。', 'Zehi ichido kite kudasai.', 'Datanglah sekali ke sana.'],
  ]],
  ['Ulasan writing N5', ['Periksa tiga hal: partikel, bentuk ます/です, dan kanji N5.', 'Baca keras tulisanmu untuk menemukan kesalahan.'], [
    ['日本語で手紙を書きました。', 'Nihongo de tegami o kakimashita.', 'Saya menulis surat dalam bahasa Jepang.'],
    ['漢字を十個覚えました。', 'Kanji o jukko oboemashita.', 'Saya menghafal sepuluh kanji.'],
    ['作文はまだ短いです。', 'Sakubun wa mada mijikai desu.', 'Karangan saya masih pendek.'],
    ['もっと長い文を書きたいです。', 'Motto nagai bun o kakitai desu.', 'Saya ingin menulis kalimat yang lebih panjang.'],
  ]],
];
