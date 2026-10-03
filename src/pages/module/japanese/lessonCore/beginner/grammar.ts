import type { LessonCoreTuple } from '../types';

// Grammar N5 — one entry per lesson (index = lesson - 1).
export const grammar: LessonCoreTuple[] = [
  ['Kalimat benda: です dan じゃありません', ['です menutup kalimat benda dengan sopan: A は B です = A adalah B.', 'Bentuk negatifnya じゃありません (lisan) atau ではありません (lebih formal).'], [
    ['田中さんは先生です。', 'Tanaka san wa sensei desu.', 'Pak/Bu Tanaka adalah guru.'],
    ['私はインドネシア人です。', 'Watashi wa Indoneshiajin desu.', 'Saya orang Indonesia.'],
    ['あの人は医者じゃありません。', 'Ano hito wa isha ja arimasen.', 'Orang itu bukan dokter.'],
    ['今日は日曜日ではありません。', 'Kyou wa nichiyoubi de wa arimasen.', 'Hari ini bukan hari Minggu.'],
  ]],
  ['Topik は dan subjek が', ['は menandai topik yang sudah diketahui; が menyorot subjek atau informasi baru.', 'Kata tanya seperti 誰 dan 何 sebagai subjek selalu memakai が, bukan は.'], [
    ['誰が来ましたか。', 'Dare ga kimashita ka.', 'Siapa yang datang?'],
    ['山田さんが来ました。', 'Yamada san ga kimashita.', 'Yamada yang datang.'],
    ['象は鼻が長いです。', 'Zou wa hana ga nagai desu.', 'Gajah itu belalainya panjang.'],
    ['私は猫が好きです。', 'Watashi wa neko ga suki desu.', 'Saya suka kucing.'],
  ]],
  ['Penunjuk これ・それ・あれ', ['これ dekat pembicara, それ dekat pendengar, あれ jauh dari keduanya.', 'Di depan kata benda pakai この・その・あの: この本, その傘.'], [
    ['これは私のかばんです。', 'Kore wa watashi no kaban desu.', 'Ini tas saya.'],
    ['それは何ですか。', 'Sore wa nan desu ka.', 'Itu (dekatmu) apa?'],
    ['あれは駅です。', 'Are wa eki desu.', 'Itu (di sana) stasiun.'],
    ['この傘は誰のですか。', 'Kono kasa wa dare no desu ka.', 'Payung ini milik siapa?'],
  ]],
  ['Objek を dan kata kerja ます', ['を menandai objek langsung; kata kerja ます diletakkan di akhir kalimat.', 'Negatif sopan: 〜ません. Urutan: Subjek は Objek を Kata kerja.'], [
    ['毎朝パンを食べます。', 'Maiasa pan o tabemasu.', 'Setiap pagi saya makan roti.'],
    ['兄はコーヒーを飲みません。', 'Ani wa koohii o nomimasen.', 'Kakak laki-laki saya tidak minum kopi.'],
    ['夜、テレビを見ます。', 'Yoru, terebi o mimasu.', 'Malam hari saya menonton TV.'],
    ['友達に手紙を書きます。', 'Tomodachi ni tegami o kakimasu.', 'Saya menulis surat untuk teman.'],
  ]],
  ['Partikel に dan で', ['に menandai tujuan, waktu tertentu, dan tempat keberadaan.', 'で menandai tempat terjadinya aktivitas dan alat/cara.'], [
    ['七時に起きます。', 'Shichiji ni okimasu.', 'Saya bangun jam tujuh.'],
    ['図書館で本を読みます。', 'Toshokan de hon o yomimasu.', 'Saya membaca buku di perpustakaan.'],
    ['バスで会社に行きます。', 'Basu de kaisha ni ikimasu.', 'Saya pergi ke kantor naik bus.'],
    ['箸でご飯を食べます。', 'Hashi de gohan o tabemasu.', 'Saya makan nasi dengan sumpit.'],
  ]],
  ['Kata sifat い', ['Kata sifat い langsung diikuti です; negatifnya い diganti くないです.', 'Di depan benda langsung: 高い山 (gunung tinggi). Pengecualian: いい → よくないです.'], [
    ['この部屋は広いです。', 'Kono heya wa hiroi desu.', 'Kamar ini luas.'],
    ['今日はあまり寒くないです。', 'Kyou wa amari samukunai desu.', 'Hari ini tidak terlalu dingin.'],
    ['富士山は高い山です。', 'Fujisan wa takai yama desu.', 'Gunung Fuji adalah gunung yang tinggi.'],
    ['天気はよくないです。', 'Tenki wa yokunai desu.', 'Cuacanya tidak bagus.'],
  ]],
  ['Kata sifat な', ['Kata sifat な memakai です langsung; negatifnya じゃありません.', 'Di depan benda tambahkan な: 静かな町 (kota yang tenang).'], [
    ['この町は静かです。', 'Kono machi wa shizuka desu.', 'Kota ini tenang.'],
    ['母は料理が上手です。', 'Haha wa ryouri ga jouzu desu.', 'Ibu saya pandai memasak.'],
    ['ここは有名なお寺です。', 'Koko wa yuumei na otera desu.', 'Ini kuil yang terkenal.'],
    ['この仕事は大変じゃありません。', 'Kono shigoto wa taihen ja arimasen.', 'Pekerjaan ini tidak berat.'],
  ]],
  ['Bentuk lampau ました dan でした', ['Kata kerja lampau: 〜ました, negatif 〜ませんでした.', 'Kalimat benda/な lampau: でした; kata sifat い lampau: 〜かったです.'], [
    ['昨日、映画を見ました。', 'Kinou, eiga o mimashita.', 'Kemarin saya menonton film.'],
    ['先週は忙しかったです。', 'Senshuu wa isogashikatta desu.', 'Minggu lalu saya sibuk.'],
    ['旅行は楽しかったです。', 'Ryokou wa tanoshikatta desu.', 'Perjalanannya menyenangkan.'],
    ['昨日は休みでした。', 'Kinou wa yasumi deshita.', 'Kemarin hari libur.'],
  ]],
  ['Rentang から dan まで', ['から = dari (waktu/tempat), まで = sampai.', 'Bisa dipakai sendiri: 九時からです, 五時までです.'], [
    ['授業は九時から十二時までです。', 'Jugyou wa kuji kara juuniji made desu.', 'Pelajaran dari jam sembilan sampai jam dua belas.'],
    ['家から駅まで歩きます。', 'Ie kara eki made arukimasu.', 'Saya berjalan dari rumah sampai stasiun.'],
    ['銀行は三時までです。', 'Ginkou wa sanji made desu.', 'Bank buka sampai jam tiga.'],
    ['夏休みは来週からです。', 'Natsuyasumi wa raishuu kara desu.', 'Libur musim panas mulai minggu depan.'],
  ]],
  ['Daftar benda と dan や', ['と menyebut semua anggota daftar secara lengkap.', 'や menyebut beberapa contoh saja; sering ditutup dengan など.'], [
    ['りんごとみかんを買いました。', 'Ringo to mikan o kaimashita.', 'Saya membeli apel dan jeruk.'],
    ['机の上に本やノートなどがあります。', 'Tsukue no ue ni hon ya nooto nado ga arimasu.', 'Di atas meja ada buku, buku catatan, dan lain-lain.'],
    ['友達と海へ行きました。', 'Tomodachi to umi e ikimashita.', 'Saya pergi ke laut bersama teman.'],
    ['かばんにペンや辞書が入っています。', 'Kaban ni pen ya jisho ga haitte imasu.', 'Di dalam tas ada pena, kamus, dan sebagainya.'],
  ]],
  ['Ajakan ませんか dan ましょう', ['〜ませんか mengajak dengan halus; 〜ましょう mengajak dengan bersemangat.', 'Jawaban setuju: いいですね。〜ましょう。'], [
    ['一緒に昼ご飯を食べませんか。', 'Issho ni hirugohan o tabemasen ka.', 'Maukah makan siang bersama?'],
    ['いいですね。食べましょう。', 'Ii desu ne. Tabemashou.', 'Boleh juga. Ayo makan.'],
    ['ちょっと休みましょう。', 'Chotto yasumimashou.', 'Mari istirahat sebentar.'],
    ['週末、テニスをしませんか。', 'Shuumatsu, tenisu o shimasen ka.', 'Akhir pekan ini, mau main tenis?'],
  ]],
  ['Keinginan たいです', ['Akar ます + たいです = ingin melakukan; dipakai untuk diri sendiri.', 'Objek boleh memakai を atau が: 水が飲みたいです.'], [
    ['日本へ行きたいです。', 'Nihon e ikitai desu.', 'Saya ingin pergi ke Jepang.'],
    ['冷たい水が飲みたいです。', 'Tsumetai mizu ga nomitai desu.', 'Saya ingin minum air dingin.'],
    ['今日は何もしたくないです。', 'Kyou wa nani mo shitakunai desu.', 'Hari ini saya tidak ingin melakukan apa pun.'],
    ['何が食べたいですか。', 'Nani ga tabetai desu ka.', 'Kamu ingin makan apa?'],
  ]],
  ['Permintaan てください', ['Bentuk て + ください = tolong lakukan.', 'Tambah すみません atau ちょっと agar terdengar lebih lembut.'], [
    ['ここに名前を書いてください。', 'Koko ni namae o kaite kudasai.', 'Tolong tulis nama di sini.'],
    ['もう一度言ってください。', 'Mou ichido itte kudasai.', 'Tolong katakan sekali lagi.'],
    ['すみません、ちょっと待ってください。', 'Sumimasen, chotto matte kudasai.', 'Maaf, tolong tunggu sebentar.'],
    ['ゆっくり話してください。', 'Yukkuri hanashite kudasai.', 'Tolong bicara pelan-pelan.'],
  ]],
  ['Izin てもいいです', ['Bentuk て + もいいです = boleh melakukan.', 'Untuk meminta izin, tambah か: 〜てもいいですか。'], [
    ['写真を撮ってもいいですか。', 'Shashin o totte mo ii desu ka.', 'Bolehkah saya memotret?'],
    ['はい、撮ってもいいですよ。', 'Hai, totte mo ii desu yo.', 'Ya, boleh memotret.'],
    ['窓を開けてもいいですか。', 'Mado o akete mo ii desu ka.', 'Bolehkah saya membuka jendela?'],
    ['ここに座ってもいいです。', 'Koko ni suwatte mo ii desu.', 'Boleh duduk di sini.'],
  ]],
  ['Larangan てはいけません', ['Bentuk て + はいけません = tidak boleh melakukan.', 'Biasa muncul pada aturan sekolah, museum, dan tempat umum.'], [
    ['ここでたばこを吸ってはいけません。', 'Koko de tabako o sutte wa ikemasen.', 'Tidak boleh merokok di sini.'],
    ['美術館で写真を撮ってはいけません。', 'Bijutsukan de shashin o totte wa ikemasen.', 'Tidak boleh memotret di museum seni.'],
    ['授業中に寝てはいけません。', 'Jugyouchuu ni nete wa ikemasen.', 'Tidak boleh tidur saat pelajaran.'],
    ['この水を飲んではいけません。', 'Kono mizu o nonde wa ikemasen.', 'Air ini tidak boleh diminum.'],
  ]],
  ['Keberadaan あります dan います', ['あります untuk benda mati dan tumbuhan; います untuk manusia dan hewan.', 'Pola tempat: Tempat に Benda が あります/います.'], [
    ['公園に大きい木があります。', 'Kouen ni ookii ki ga arimasu.', 'Di taman ada pohon besar.'],
    ['教室に学生が十人います。', 'Kyoushitsu ni gakusei ga juunin imasu.', 'Di kelas ada sepuluh siswa.'],
    ['冷蔵庫に牛乳がありません。', 'Reizouko ni gyuunyuu ga arimasen.', 'Di kulkas tidak ada susu.'],
    ['庭に犬がいます。', 'Niwa ni inu ga imasu.', 'Di halaman ada anjing.'],
  ]],
  ['Kemampuan ができます', ['Benda/kegiatan + ができます = bisa melakukan.', 'Kata kerja kamus + ことができます: 泳ぐことができます.'], [
    ['妹はピアノができます。', 'Imouto wa piano ga dekimasu.', 'Adik perempuan saya bisa bermain piano.'],
    ['私は漢字を読むことができます。', 'Watashi wa kanji o yomu koto ga dekimasu.', 'Saya bisa membaca kanji.'],
    ['ここでお金を払うことができます。', 'Koko de okane o harau koto ga dekimasu.', 'Di sini bisa membayar.'],
    ['父は運転ができません。', 'Chichi wa unten ga dekimasen.', 'Ayah saya tidak bisa menyetir.'],
  ]],
  ['Alasan dengan から', ['Alasan + から, hasil di belakang: 雨ですから、行きません.', 'Menjawab なぜ/どうして juga bisa diakhiri 〜からです.'], [
    ['時間がありませんから、タクシーで行きます。', 'Jikan ga arimasen kara, takushii de ikimasu.', 'Karena tidak ada waktu, saya pergi naik taksi.'],
    ['どうして休みましたか。', 'Doushite yasumimashita ka.', 'Kenapa kamu tidak masuk?'],
    ['頭が痛かったからです。', 'Atama ga itakatta kara desu.', 'Karena kepala saya sakit.'],
    ['暑いですから、窓を開けましょう。', 'Atsui desu kara, mado o akemashou.', 'Karena panas, ayo buka jendela.'],
  ]],
  ['Pendapat sederhana と思います', ['Bentuk biasa + と思います = saya pikir.', 'Kata benda/な memakai だ: いい人だと思います.'], [
    ['明日は雨が降ると思います。', 'Ashita wa ame ga furu to omoimasu.', 'Saya pikir besok akan hujan.'],
    ['この本はおもしろいと思います。', 'Kono hon wa omoshiroi to omoimasu.', 'Menurut saya buku ini menarik.'],
    ['あの店は安いと思います。', 'Ano mise wa yasui to omoimasu.', 'Saya pikir toko itu murah.'],
    ['山本さんはいい人だと思います。', 'Yamamoto san wa ii hito da to omoimasu.', 'Menurut saya Yamamoto orang baik.'],
  ]],
  ['Ulasan grammar N5', ['Gabungkan pola N5: です, partikel, ます, たい, てください, dan から dalam satu cerita.', 'Periksa ulang partikel は・が・を・に・で sebelum kata kerja.'], [
    ['私は毎日電車で学校に行きます。', 'Watashi wa mainichi densha de gakkou ni ikimasu.', 'Saya setiap hari pergi ke sekolah naik kereta.'],
    ['昼休みに友達と弁当を食べました。', 'Hiruyasumi ni tomodachi to bentou o tabemashita.', 'Saat istirahat siang saya makan bekal bersama teman.'],
    ['日本語は難しいですが、楽しいです。', 'Nihongo wa muzukashii desu ga, tanoshii desu.', 'Bahasa Jepang sulit, tetapi menyenangkan.'],
    ['来年、日本で働きたいです。', 'Rainen, Nihon de hatarakitai desu.', 'Tahun depan saya ingin bekerja di Jepang.'],
  ]],
];
