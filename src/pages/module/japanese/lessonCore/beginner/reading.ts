import type { LessonCoreTuple } from '../types';

// Reading N5 — one entry per lesson (index = lesson - 1).
export const reading: LessonCoreTuple[] = [
  ['Membaca kata hiragana', ['Baca per mora: setiap huruf hiragana = satu ketukan.', 'Kata asli Jepang dan partikel ditulis dengan hiragana.'], [
    ['ねこがいます。', 'Neko ga imasu.', 'Ada kucing.'],
    ['あさごはんをたべます。', 'Asagohan o tabemasu.', 'Saya sarapan.'],
    ['おかあさんはやさしいです。', 'Okaasan wa yasashii desu.', 'Ibu itu baik hati.'],
    ['ともだちとあそびます。', 'Tomodachi to asobimasu.', 'Saya bermain dengan teman.'],
  ]],
  ['Membaca kata katakana', ['Katakana untuk kata serapan, nama asing, dan bunyi tiruan.', 'Garis panjang ー memperpanjang vokal sebelumnya: コーヒー = koohii.'], [
    ['コンビニでジュースを買います。', 'Konbini de juusu o kaimasu.', 'Saya membeli jus di minimarket.'],
    ['テストは来週です。', 'Tesuto wa raishuu desu.', 'Tesnya minggu depan.'],
    ['ホテルのレストランは高いです。', 'Hoteru no resutoran wa takai desu.', 'Restoran hotel itu mahal.'],
    ['アイスクリームが好きです。', 'Aisukuriimu ga suki desu.', 'Saya suka es krim.'],
  ]],
  ['Rambu sederhana', ['Rambu memakai kanji pendek: 入口, 出口, 禁煙, 押す, 引く.', 'Baca kanji kunci dulu sebelum seluruh tulisan.'], [
    ['入口はこちらです。', 'Iriguchi wa kochira desu.', 'Pintu masuk di sebelah sini.'],
    ['出口は右です。', 'Deguchi wa migi desu.', 'Pintu keluar di kanan.'],
    ['ここは禁煙です。', 'Koko wa kin-en desu.', 'Di sini dilarang merokok.'],
    ['ドアを押してください。', 'Doa o oshite kudasai.', 'Silakan dorong pintunya.'],
  ]],
  ['Membaca menu', ['Menu Jepang memuat nama makanan, harga, dan kata 定食 (paket), 税込 (termasuk pajak).', 'Cari angka sebelum 円 untuk harga.'], [
    ['カレーライスは六百五十円です。', 'Karee raisu wa roppyaku gojuu en desu.', 'Nasi kari harganya 650 yen.'],
    ['焼き魚定食はみそ汁付きです。', 'Yakizakana teishoku wa misoshiru tsuki desu.', 'Paket ikan bakar sudah termasuk sup miso.'],
    ['飲み物は全部税込です。', 'Nomimono wa zenbu zeikomi desu.', 'Semua minuman sudah termasuk pajak.'],
    ['ランチは十一時から二時までです。', 'Ranchi wa juuichiji kara niji made desu.', 'Makan siang tersedia jam sebelas sampai jam dua.'],
  ]],
  ['Membaca jadwal', ['Jadwal memakai angka, hari (曜日), dan kata 予定 (rencana).', 'Pindai baris yang relevan saja (scanning).'], [
    ['月曜日の一時間目は国語です。', 'Getsuyoubi no ichijikanme wa kokugo desu.', 'Jam pelajaran pertama hari Senin adalah bahasa Jepang.'],
    ['バスは十分ごとに来ます。', 'Basu wa juppun goto ni kimasu.', 'Bus datang setiap sepuluh menit.'],
    ['水曜日の午後は会議です。', 'Suiyoubi no gogo wa kaigi desu.', 'Rabu sore ada rapat.'],
    ['テストの日は六月十日です。', 'Tesuto no hi wa rokugatsu tooka desu.', 'Hari tes tanggal 10 Juni.'],
  ]],
  ['Pesan singkat', ['Pesan singkat biasanya: salam → isi → permintaan → penutup.', 'Cari kata waktu dan kata kerja di akhir kalimat.'], [
    ['ゆいさん、こんにちは。', 'Yui san, konnichiwa.', 'Halo, Yui.'],
    ['明日のパーティーに来られますか。', 'Ashita no paatii ni koraremasu ka.', 'Bisakah kamu datang ke pesta besok?'],
    ['ケーキは私が買います。', 'Keeki wa watashi ga kaimasu.', 'Kuenya saya yang beli.'],
    ['返事を待っています。', 'Henji o matte imasu.', 'Saya menunggu balasanmu.'],
  ]],
  ['Profil keluarga', ['Teks profil memakai pola Orang は Ciri です.', 'Catat setiap anggota keluarga dan satu informasi tentangnya.'], [
    ['私の家族は五人です。', 'Watashi no kazoku wa gonin desu.', 'Keluarga saya lima orang.'],
    ['父は会社員で、毎日忙しいです。', 'Chichi wa kaishain de, mainichi isogashii desu.', 'Ayah saya pegawai kantor dan setiap hari sibuk.'],
    ['母は料理が好きです。', 'Haha wa ryouri ga suki desu.', 'Ibu saya suka memasak.'],
    ['妹は小学生で、犬が大好きです。', 'Imouto wa shougakusei de, inu ga daisuki desu.', 'Adik perempuan saya siswa SD dan sangat suka anjing.'],
  ]],
  ['Pengumuman sekolah', ['Pengumuman memuat apa, kapan, di mana, dan bawa apa (持ってきてください).', 'Garis bawahi tanggal dan tempat.'], [
    ['来週の金曜日に遠足があります。', 'Raishuu no kinyoubi ni ensoku ga arimasu.', 'Jumat minggu depan ada darmawisata.'],
    ['八時に校門の前に集まってください。', 'Hachiji ni koumon no mae ni atsumatte kudasai.', 'Berkumpul jam delapan di depan gerbang sekolah.'],
    ['お弁当と水を持ってきてください。', 'Obentou to mizu o motte kite kudasai.', 'Bawalah bekal dan air.'],
    ['雨の日は中止です。', 'Ame no hi wa chuushi desu.', 'Jika hujan, kegiatan dibatalkan.'],
  ]],
  ['Petunjuk peta', ['Petunjuk arah memakai 〜を出て, 〜を渡って, 〜に着きます.', 'Ikuti urutan kalimat seperti langkah di peta.'], [
    ['駅の北口を出てください。', 'Eki no kitaguchi o dete kudasai.', 'Keluarlah dari pintu utara stasiun.'],
    ['橋を渡って、まっすぐ歩きます。', 'Hashi o watatte, massugu arukimasu.', 'Seberangi jembatan lalu jalan lurus.'],
    ['病院の向かいに図書館があります。', 'Byouin no mukai ni toshokan ga arimasu.', 'Di seberang rumah sakit ada perpustakaan.'],
    ['駅から歩いて五分です。', 'Eki kara aruite gofun desu.', 'Lima menit jalan kaki dari stasiun.'],
  ]],
  ['Catatan cuaca', ['Catatan cuaca berisi hari, cuaca, suhu, dan saran.', 'Kata sifat suhu: 暑い, 寒い, 暖かい, 涼しい.'], [
    ['今日は朝から雨でした。', 'Kyou wa asa kara ame deshita.', 'Hari ini hujan sejak pagi.'],
    ['午後は少し涼しくなりました。', 'Gogo wa sukoshi suzushiku narimashita.', 'Sore hari menjadi agak sejuk.'],
    ['あさっては暖かいでしょう。', 'Asatte wa atatakai deshou.', 'Lusa mungkin hangat.'],
    ['風が強いですから、気をつけてください。', 'Kaze ga tsuyoi desu kara, ki o tsukete kudasai.', 'Anginnya kencang, jadi berhati-hatilah.'],
  ]],
  ['Struk belanja', ['Struk memuat nama barang, jumlah (〜個, 〜本), harga, dan 合計 (total).', 'Cocokkan barang dengan harga per baris.'], [
    ['牛乳二本、三百円。', 'Gyuunyuu nihon, sanbyaku en.', 'Susu dua botol, 300 yen.'],
    ['卵一パック、二百五十円。', 'Tamago hito pakku, nihyaku gojuu en.', 'Telur satu pak, 250 yen.'],
    ['合計は五百五十円です。', 'Goukei wa gohyaku gojuu en desu.', 'Totalnya 550 yen.'],
    ['千円をお預かりしました。', 'Sen en o oazukari shimashita.', 'Kami menerima uang seribu yen.'],
  ]],
  ['Email sederhana', ['Email dibuka dengan 〜さん dan ditutup dengan nama pengirim.', 'Bagian inti biasanya berisi pertanyaan atau permintaan.'], [
    ['先生、お元気ですか。', 'Sensei, ogenki desu ka.', 'Bapak/Ibu guru, apa kabar?'],
    ['来月、日本へ行きます。', 'Raigetsu, Nihon e ikimasu.', 'Bulan depan saya pergi ke Jepang.'],
    ['東京で会いませんか。', 'Toukyou de aimasen ka.', 'Maukah bertemu di Tokyo?'],
    ['お返事をお待ちしています。', 'Ohenji o omachi shite imasu.', 'Saya menantikan balasan Anda.'],
  ]],
  ['Kartu pos', ['Kartu pos liburan menceritakan tempat, kegiatan, dan perasaan.', 'Bentuk lampau dan kata sifat menunjukkan kesan penulis.'], [
    ['今、沖縄にいます。', 'Ima, Okinawa ni imasu.', 'Sekarang saya ada di Okinawa.'],
    ['海がとてもきれいです。', 'Umi ga totemo kirei desu.', 'Lautnya sangat indah.'],
    ['昨日は船に乗りました。', 'Kinou wa fune ni norimashita.', 'Kemarin saya naik kapal.'],
    ['お土産を楽しみにしてください。', 'Omiyage o tanoshimi ni shite kudasai.', 'Nantikan oleh-olehnya.'],
  ]],
  ['Buku harian', ['Buku harian ditulis dengan bentuk lampau dan urutan waktu.', 'Cari perasaan penulis di akhir (楽しかった, 疲れた).'], [
    ['今日は朝九時に起きました。', 'Kyou wa asa kuji ni okimashita.', 'Hari ini saya bangun jam sembilan pagi.'],
    ['午後、姉と買い物に行きました。', 'Gogo, ane to kaimono ni ikimashita.', 'Siang hari saya berbelanja dengan kakak perempuan.'],
    ['新しいかばんを買いました。', 'Atarashii kaban o kaimashita.', 'Saya membeli tas baru.'],
    ['とても楽しい一日でした。', 'Totemo tanoshii ichinichi deshita.', 'Hari yang sangat menyenangkan.'],
  ]],
  ['Papan stasiun', ['Papan stasiun memuat 〜方面 (arah), 〜番線 (jalur), 快速/各駅停車.', 'Cari nama tujuanmu dulu, baru nomor jalur.'], [
    ['品川方面は二番線です。', 'Shinagawa houmen wa nibansen desu.', 'Arah Shinagawa di jalur dua.'],
    ['各駅停車は全部の駅に止まります。', 'Kakuekiteisha wa zenbu no eki ni tomarimasu.', 'Kereta lokal berhenti di semua stasiun.'],
    ['快速はこの駅に止まりません。', 'Kaisoku wa kono eki ni tomarimasen.', 'Kereta cepat tidak berhenti di stasiun ini.'],
    ['切符売り場は改札の左です。', 'Kippu uriba wa kaisatsu no hidari desu.', 'Loket tiket di sebelah kiri gerbang tiket.'],
  ]],
  ['Poster acara', ['Poster acara: nama acara, tanggal, tempat, harga masuk.', 'Kata 無料 = gratis, 先着 = siapa cepat dia dapat.'], [
    ['夏祭りは七月二十日です。', 'Natsumatsuri wa shichigatsu hatsuka desu.', 'Festival musim panas tanggal 20 Juli.'],
    ['場所は市民公園です。', 'Basho wa shimin kouen desu.', 'Tempatnya di taman kota.'],
    ['入場は無料です。', 'Nyuujou wa muryou desu.', 'Masuknya gratis.'],
    ['花火は夜八時からです。', 'Hanabi wa yoru hachiji kara desu.', 'Kembang api mulai jam delapan malam.'],
  ]],
  ['Artikel sederhana', ['Artikel pendek: kalimat pertama menyebut topik, berikutnya menjelaskan.', 'Cari kata kunci yang diulang untuk menemukan ide pokok.'], [
    ['日本ではお正月におせち料理を食べます。', 'Nihon de wa oshougatsu ni osechi ryouri o tabemasu.', 'Di Jepang orang makan masakan osechi saat Tahun Baru.'],
    ['家族がみんな集まります。', 'Kazoku ga minna atsumarimasu.', 'Seluruh keluarga berkumpul.'],
    ['子どもはお年玉をもらいます。', 'Kodomo wa otoshidama o moraimasu.', 'Anak-anak menerima uang Tahun Baru.'],
    ['神社へお参りに行く人も多いです。', 'Jinja e omairi ni iku hito mo ooi desu.', 'Banyak juga orang yang berdoa ke kuil Shinto.'],
  ]],
  ['Membaca formulir', ['Formulir memakai label: 氏名 (nama), 住所 (alamat), 生年月日 (tanggal lahir).', 'Kenali label sebelum mengisi.'], [
    ['氏名を書いてください。', 'Shimei o kaite kudasai.', 'Tulislah nama lengkap.'],
    ['住所と電話番号も書いてください。', 'Juusho to denwa bangou mo kaite kudasai.', 'Tulis juga alamat dan nomor telepon.'],
    ['生年月日は西暦で書いてください。', 'Seinengappi wa seireki de kaite kudasai.', 'Tulis tanggal lahir dalam tahun Masehi.'],
    ['ここにサインをお願いします。', 'Koko ni sain o onegai shimasu.', 'Mohon tanda tangan di sini.'],
  ]],
  ['Kanji N5 dalam kalimat', ['Kanji N5 umum: 日, 月, 山, 川, 人, 大, 小, 上, 下.', 'Satu kanji bisa punya beberapa bacaan: 日 = ni/hi/bi/ka.'], [
    ['山の上に小さい家があります。', 'Yama no ue ni chiisai ie ga arimasu.', 'Di atas gunung ada rumah kecil.'],
    ['川の水はきれいです。', 'Kawa no mizu wa kirei desu.', 'Air sungainya bersih.'],
    ['大きい木の下で休みました。', 'Ookii ki no shita de yasumimashita.', 'Saya beristirahat di bawah pohon besar.'],
    ['毎月一日に本を買います。', 'Maitsuki tsuitachi ni hon o kaimasu.', 'Setiap tanggal satu saya membeli buku.'],
  ]],
  ['Ulasan reading N5', ['Gabungkan hiragana, katakana, dan kanji N5 dalam satu bacaan pendek.', 'Baca dua kali: sekali untuk gambaran, sekali untuk detail.'], [
    ['私はスーパーでアルバイトをしています。', 'Watashi wa suupaa de arubaito o shite imasu.', 'Saya kerja paruh waktu di supermarket.'],
    ['仕事は火曜日と木曜日です。', 'Shigoto wa kayoubi to mokuyoubi desu.', 'Kerjanya hari Selasa dan Kamis.'],
    ['店長はとても親切な人です。', 'Tenchou wa totemo shinsetsu na hito desu.', 'Manajer tokonya orang yang sangat ramah.'],
    ['お金をためて、旅行に行きたいです。', 'Okane o tamete, ryokou ni ikitai desu.', 'Saya ingin menabung lalu pergi berwisata.'],
  ]],
];
