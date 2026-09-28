import type { PassageSource } from './types';

// Short reading/listening passages for JLPT N5-N4 (level ids follow the study bank).
export const japanesePassagesBasic: PassageSource[] = [
  // ---------------------------------------------------------------- N5
  {
    id: 'n5-jikoshoukai', level: 'beginner', title: 'Perkenalan diri', native: '自己紹介',
    sentences: [
      ['はじめまして。わたしはアニです。', '', 'Perkenalkan. Saya Ani.'],
      ['インドネシアのジャカルタから来ました。', '', 'Saya datang dari Jakarta, Indonesia.'],
      ['いま、東京の日本語学校の学生です。', '', 'Sekarang saya pelajar di sekolah bahasa Jepang di Tokyo.'],
      ['毎日、九時から三時まで勉強します。', '', 'Setiap hari saya belajar dari jam sembilan sampai jam tiga.'],
      ['しゅみは料理と写真です。', '', 'Hobi saya memasak dan fotografi.'],
      ['どうぞよろしくおねがいします。', '', 'Mohon bimbingannya.'],
    ],
    glossary: [['学生', 'がくせい', 'pelajar'], ['毎日', 'まいにち', 'setiap hari'], ['勉強', 'べんきょう', 'belajar'], ['料理', 'りょうり', 'masakan']],
    questions: [
      ['Dari kota mana Ani berasal?', 'Jakarta', ['Bandung', 'Surabaya', 'Tokyo']],
      ['Sampai jam berapa Ani belajar?', 'Jam tiga', ['Jam sembilan', 'Jam lima', 'Jam dua belas']],
      ['Apa hobi Ani?', 'Memasak dan fotografi', ['Membaca dan menyanyi', 'Olahraga dan musik', 'Menggambar dan berenang']],
    ],
  },
  {
    id: 'n5-kazoku', level: 'beginner', title: 'Keluarga saya', native: 'わたしの家族',
    sentences: [
      ['わたしの家族は四人です。', '', 'Keluarga saya berjumlah empat orang.'],
      ['父と母と兄とわたしです。', '', 'Ayah, ibu, kakak laki-laki, dan saya.'],
      ['父は会社員で、母は先生です。', '', 'Ayah pegawai kantor, dan ibu guru.'],
      ['兄は大学生です。サッカーが好きです。', '', 'Kakak saya mahasiswa. Dia suka sepak bola.'],
      ['週末は家族でいっしょに晩ごはんを食べます。', '', 'Pada akhir pekan kami sekeluarga makan malam bersama.'],
      ['わたしは家族が大好きです。', '', 'Saya sangat menyayangi keluarga saya.'],
    ],
    glossary: [['家族', 'かぞく', 'keluarga'], ['会社員', 'かいしゃいん', 'pegawai kantor'], ['大学生', 'だいがくせい', 'mahasiswa'], ['週末', 'しゅうまつ', 'akhir pekan']],
    questions: [
      ['Berapa orang anggota keluarga penulis?', 'Empat', ['Tiga', 'Lima', 'Enam']],
      ['Apa pekerjaan ibu penulis?', 'Guru', ['Pegawai kantor', 'Dokter', 'Perawat']],
      ['Apa yang disukai kakak penulis?', 'Sepak bola', ['Musik', 'Memasak', 'Membaca']],
    ],
  },
  {
    id: 'n5-kaimono', level: 'beginner', title: 'Belanja di supermarket', native: 'スーパーで買い物',
    sentences: [
      ['きのう、スーパーへ買い物に行きました。', '', 'Kemarin saya pergi berbelanja ke supermarket.'],
      ['りんごを三つと牛乳を一本買いました。', '', 'Saya membeli tiga apel dan sebotol susu.'],
      ['りんごは一つ百円でした。', '', 'Apelnya seratus yen per buah.'],
      ['パンも買いたかったですが、ありませんでした。', '', 'Saya juga ingin membeli roti, tetapi tidak ada.'],
      ['ぜんぶで五百円でした。', '', 'Semuanya lima ratus yen.'],
      ['スーパーは家から近いです。', '', 'Supermarket itu dekat dari rumah.'],
    ],
    glossary: [['買い物', 'かいもの', 'belanja'], ['牛乳', 'ぎゅうにゅう', 'susu'], ['全部', 'ぜんぶ', 'semuanya'], ['近い', 'ちかい', 'dekat']],
    questions: [
      ['Berapa apel yang dibeli?', 'Tiga', ['Satu', 'Dua', 'Lima']],
      ['Apa yang ingin dibeli tetapi tidak ada?', 'Roti', ['Apel', 'Susu', 'Telur']],
      ['Berapa total belanjaannya?', 'Lima ratus yen', ['Tiga ratus yen', 'Seratus yen', 'Seribu yen']],
    ],
  },
  {
    id: 'n5-heya', level: 'beginner', title: 'Kamar saya', native: 'わたしのへや',
    sentences: [
      ['これはわたしのへやです。', '', 'Ini kamar saya.'],
      ['へやはあまり広くないですが、明るいです。', '', 'Kamarnya tidak terlalu luas, tetapi terang.'],
      ['まどのちかくにつくえといすがあります。', '', 'Di dekat jendela ada meja dan kursi.'],
      ['つくえの上にパソコンと本があります。', '', 'Di atas meja ada komputer dan buku.'],
      ['ベッドの下にねこがいます。', '', 'Di bawah tempat tidur ada kucing.'],
      ['ねこの名前はタマです。', '', 'Nama kucingnya Tama.'],
    ],
    glossary: [['部屋', 'へや', 'kamar'], ['広い', 'ひろい', 'luas'], ['明るい', 'あかるい', 'terang'], ['机', 'つくえ', 'meja']],
    questions: [
      ['Bagaimana kamar penulis?', 'Tidak terlalu luas tetapi terang', ['Luas dan gelap', 'Kecil dan gelap', 'Sangat luas']],
      ['Di mana kucingnya?', 'Di bawah tempat tidur', ['Di atas meja', 'Di dekat jendela', 'Di luar rumah']],
      ['Siapa nama kucingnya?', 'Tama', ['Mimi', 'Kuro', 'Hana']],
    ],
  },
  {
    id: 'n5-yasumi', level: 'beginner', title: 'Hari Minggu', native: '日曜日',
    sentences: [
      ['日曜日は学校が休みです。', '', 'Hari Minggu sekolah libur.'],
      ['朝はおそく起きます。', '', 'Pagi hari saya bangun siang.'],
      ['十時ごろ、友だちと公園でテニスをします。', '', 'Sekitar jam sepuluh saya bermain tenis dengan teman di taman.'],
      ['昼ごはんは駅の前のレストランで食べます。', '', 'Makan siang di restoran depan stasiun.'],
      ['午後は家で本を読んだり、音楽を聞いたりします。', '', 'Siang harinya saya membaca buku dan mendengarkan musik di rumah.'],
      ['日曜日はとても楽しいです。', '', 'Hari Minggu sangat menyenangkan.'],
    ],
    glossary: [['休み', 'やすみ', 'libur'], ['起きる', 'おきる', 'bangun'], ['公園', 'こうえん', 'taman'], ['午後', 'ごご', 'siang/sore']],
    questions: [
      ['Apa yang dilakukan sekitar jam sepuluh?', 'Bermain tenis di taman', ['Belajar di sekolah', 'Berbelanja', 'Tidur']],
      ['Di mana penulis makan siang?', 'Di restoran depan stasiun', ['Di rumah', 'Di sekolah', 'Di taman']],
      ['Apa yang dilakukan siang harinya?', 'Membaca buku dan mendengarkan musik', ['Bermain tenis', 'Bekerja', 'Memasak']],
    ],
  },
  {
    id: 'n5-tenki', level: 'beginner', title: 'Cuaca minggu ini', native: '今週の天気',
    sentences: [
      ['今週はずっと雨でした。', '', 'Minggu ini hujan terus.'],
      ['月曜日と火曜日は雨がたくさんふりました。', '', 'Hari Senin dan Selasa hujan turun deras.'],
      ['水曜日はすこしさむかったです。', '', 'Hari Rabu agak dingin.'],
      ['木曜日から天気がよくなりました。', '', 'Mulai hari Kamis cuaca membaik.'],
      ['あしたは土曜日です。はれるでしょう。', '', 'Besok hari Sabtu. Mungkin cerah.'],
      ['山へ行きたいです。', '', 'Saya ingin pergi ke gunung.'],
    ],
    glossary: [['天気', 'てんき', 'cuaca'], ['雨', 'あめ', 'hujan'], ['寒い', 'さむい', 'dingin'], ['晴れる', 'はれる', 'cerah']],
    questions: [
      ['Hari apa yang agak dingin?', 'Rabu', ['Senin', 'Kamis', 'Sabtu']],
      ['Mulai hari apa cuaca membaik?', 'Kamis', ['Selasa', 'Rabu', 'Jumat']],
      ['Ke mana penulis ingin pergi?', 'Ke gunung', ['Ke laut', 'Ke kota', 'Ke sekolah']],
    ],
  },
  {
    id: 'n5-resutoran', level: 'beginner', title: 'Di restoran', native: 'レストランで',
    sentences: [
      ['店員：いらっしゃいませ。何名さまですか。', '', 'Pelayan: Selamat datang. Untuk berapa orang?'],
      ['客：二人です。', '', 'Tamu: Dua orang.'],
      ['店員：こちらへどうぞ。ご注文は？', '', 'Pelayan: Silakan ke sini. Mau pesan apa?'],
      ['客：カレーライスを二つと、お茶を二つください。', '', 'Tamu: Tolong dua nasi kari dan dua teh.'],
      ['店員：はい。カレーは少しからいですが、大丈夫ですか。', '', 'Pelayan: Baik. Karinya agak pedas, tidak apa-apa?'],
      ['客：はい、大丈夫です。', '', 'Tamu: Ya, tidak apa-apa.'],
    ],
    glossary: [['店員', 'てんいん', 'pelayan toko'], ['注文', 'ちゅうもん', 'pesanan'], ['辛い', 'からい', 'pedas'], ['大丈夫', 'だいじょうぶ', 'tidak apa-apa']],
    questions: [
      ['Berapa orang tamunya?', 'Dua', ['Satu', 'Tiga', 'Empat']],
      ['Apa yang dipesan tamu?', 'Nasi kari dan teh', ['Ramen dan kopi', 'Sushi dan teh', 'Nasi goreng dan air']],
      ['Bagaimana rasa karinya?', 'Agak pedas', ['Manis', 'Asin', 'Asam']],
    ],
  },
  {
    id: 'n5-densha', level: 'beginner', title: 'Ke sekolah naik kereta', native: '電車で学校へ',
    sentences: [
      ['わたしは毎朝七時に家を出ます。', '', 'Setiap pagi saya keluar rumah jam tujuh.'],
      ['駅まで歩いて十分です。', '', 'Ke stasiun jalan kaki sepuluh menit.'],
      ['電車に三十分乗ります。', '', 'Saya naik kereta tiga puluh menit.'],
      ['電車の中で日本語のことばを覚えます。', '', 'Di dalam kereta saya menghafal kosakata bahasa Jepang.'],
      ['学校は八時半にはじまります。', '', 'Sekolah mulai jam setengah sembilan.'],
      ['ときどき電車がおくれますから、早く出ます。', '', 'Kadang kereta terlambat, jadi saya berangkat lebih awal.'],
    ],
    glossary: [['駅', 'えき', 'stasiun'], ['電車', 'でんしゃ', 'kereta listrik'], ['覚える', 'おぼえる', 'menghafal'], ['遅れる', 'おくれる', 'terlambat']],
    questions: [
      ['Berapa lama penulis naik kereta?', 'Tiga puluh menit', ['Sepuluh menit', 'Satu jam', 'Lima belas menit']],
      ['Apa yang dilakukan di dalam kereta?', 'Menghafal kosakata bahasa Jepang', ['Tidur', 'Membaca koran', 'Bermain gim']],
      ['Mengapa penulis berangkat lebih awal?', 'Kadang kereta terlambat', ['Ingin sarapan di sekolah', 'Rumahnya sangat jauh', 'Ada ujian']],
    ],
  },
  // ---------------------------------------------------------------- N4
  {
    id: 'n4-kaze', level: 'elementary', title: 'Terkena flu', native: '風邪をひいた日',
    sentences: [
      ['先週、ひどい風邪をひいてしまいました。', '', 'Minggu lalu saya terkena flu berat.'],
      ['熱が三十八度もあったので、会社を休みました。', '', 'Demam saya sampai 38 derajat, jadi saya tidak masuk kantor.'],
      ['病院へ行ったら、医者に「三日ぐらいゆっくり休んでください」と言われました。', '', 'Saat ke rumah sakit, dokter berkata, "Istirahatlah dengan tenang sekitar tiga hari."'],
      ['薬を飲んで、たくさん寝ました。', '', 'Saya minum obat dan banyak tidur.'],
      ['友だちがおかゆを作って持ってきてくれました。', '', 'Teman saya membuatkan dan membawakan bubur.'],
      ['おかげで、四日目には元気になりました。', '', 'Berkat itu, pada hari keempat saya sudah sehat.'],
    ],
    glossary: [['風邪', 'かぜ', 'flu/masuk angin'], ['熱', 'ねつ', 'demam'], ['医者', 'いしゃ', 'dokter'], ['薬', 'くすり', 'obat']],
    questions: [
      ['Berapa derajat demam penulis?', '38 derajat', ['37 derajat', '39 derajat', '40 derajat']],
      ['Apa kata dokter?', 'Istirahat sekitar tiga hari', ['Harus dirawat inap', 'Segera kembali bekerja', 'Berolahraga setiap hari']],
      ['Apa yang dibawakan teman?', 'Bubur', ['Buah', 'Obat', 'Sup miso']],
    ],
  },
  {
    id: 'n4-arubaito', level: 'elementary', title: 'Kerja paruh waktu', native: 'コンビニのアルバイト',
    sentences: [
      ['私は週に三回、コンビニでアルバイトをしています。', '', 'Saya bekerja paruh waktu di minimarket tiga kali seminggu.'],
      ['仕事はレジや商品の整理です。', '', 'Pekerjaannya di kasir dan merapikan barang.'],
      ['はじめは敬語が難しくて、よく間違えました。', '', 'Awalnya bahasa hormat sulit, jadi saya sering salah.'],
      ['でも、店長が丁寧に教えてくれたので、だんだん慣れてきました。', '', 'Tetapi manajer mengajari dengan teliti, jadi lama-lama saya terbiasa.'],
      ['アルバイトのお金で、来年日本を旅行するつもりです。', '', 'Dengan uang kerja paruh waktu, saya berencana berwisata keliling Jepang tahun depan.'],
      ['忙しいですが、日本語の練習にもなります。', '', 'Memang sibuk, tetapi juga menjadi latihan bahasa Jepang.'],
    ],
    glossary: [['敬語', 'けいご', 'bahasa hormat'], ['店長', 'てんちょう', 'manajer toko'], ['丁寧', 'ていねい', 'teliti/sopan'], ['慣れる', 'なれる', 'terbiasa']],
    questions: [
      ['Berapa kali seminggu penulis bekerja?', 'Tiga kali', ['Dua kali', 'Empat kali', 'Lima kali']],
      ['Apa yang sulit pada awalnya?', 'Bahasa hormat (keigo)', ['Menghitung uang', 'Bangun pagi', 'Membersihkan toko']],
      ['Untuk apa uang kerjanya?', 'Berwisata di Jepang tahun depan', ['Membeli laptop', 'Membayar kuliah', 'Dikirim ke keluarga']],
    ],
  },
  {
    id: 'n4-tegami', level: 'elementary', title: 'Surat untuk guru', native: '先生への手紙',
    sentences: [
      ['田中先生、お元気ですか。', '', 'Guru Tanaka, apa kabar?'],
      ['インドネシアに帰ってから、もう半年がたちました。', '', 'Sudah setengah tahun sejak saya pulang ke Indonesia.'],
      ['今はジャカルタの日本の会社で通訳の仕事をしています。', '', 'Sekarang saya bekerja sebagai penerjemah lisan di perusahaan Jepang di Jakarta.'],
      ['先生に習った日本語が毎日役に立っています。', '', 'Bahasa Jepang yang saya pelajari dari Anda berguna setiap hari.'],
      ['来年の春、出張で東京へ行くかもしれません。', '', 'Musim semi tahun depan saya mungkin ke Tokyo untuk perjalanan dinas.'],
      ['そのときは、ぜひ会いに行きたいと思っています。', '', 'Saat itu saya ingin sekali datang menemui Anda.'],
    ],
    glossary: [['通訳', 'つうやく', 'penerjemah lisan'], ['役に立つ', 'やくにたつ', 'berguna'], ['出張', 'しゅっちょう', 'perjalanan dinas'], ['半年', 'はんとし', 'setengah tahun']],
    questions: [
      ['Apa pekerjaan penulis sekarang?', 'Penerjemah lisan', ['Guru', 'Pelayan restoran', 'Mahasiswa']],
      ['Kapan penulis mungkin ke Tokyo?', 'Musim semi tahun depan', ['Bulan depan', 'Musim panas ini', 'Akhir tahun ini']],
      ['Sudah berapa lama sejak penulis pulang?', 'Setengah tahun', ['Satu tahun', 'Tiga bulan', 'Dua tahun']],
    ],
  },
  {
    id: 'n4-natsumatsuri', level: 'elementary', title: 'Festival musim panas', native: '夏祭り',
    sentences: [
      ['八月に町で大きな夏祭りがありました。', '', 'Pada bulan Agustus ada festival musim panas besar di kota.'],
      ['私は友だちに浴衣を貸してもらって、初めて着ました。', '', 'Saya dipinjami yukata oleh teman dan memakainya untuk pertama kali.'],
      ['道の両側にたくさんの屋台が並んでいました。', '', 'Banyak kios makanan berjajar di kedua sisi jalan.'],
      ['たこ焼きを食べたり、金魚すくいをしたりしました。', '', 'Saya makan takoyaki dan mencoba menangkap ikan mas.'],
      ['夜九時から花火が上がって、とてもきれいでした。', '', 'Mulai jam sembilan malam kembang api diluncurkan dan sangat indah.'],
      ['来年もまた行きたいと思います。', '', 'Saya ingin pergi lagi tahun depan.'],
    ],
    glossary: [['浴衣', 'ゆかた', 'yukata'], ['屋台', 'やたい', 'kios makanan'], ['花火', 'はなび', 'kembang api'], ['並ぶ', 'ならぶ', 'berjajar']],
    questions: [
      ['Dari mana penulis mendapat yukata?', 'Dipinjami teman', ['Membeli', 'Hadiah ibu', 'Menyewa']],
      ['Jam berapa kembang api dimulai?', 'Jam sembilan malam', ['Jam tujuh malam', 'Jam delapan malam', 'Jam sepuluh malam']],
      ['Apa yang dimakan penulis?', 'Takoyaki', ['Ramen', 'Sushi', 'Onigiri']],
    ],
  },
  {
    id: 'n4-toshokan', level: 'elementary', title: 'Aturan perpustakaan', native: '図書館のルール',
    sentences: [
      ['この図書館は午前九時から午後八時まで開いています。', '', 'Perpustakaan ini buka dari jam 9 pagi sampai jam 8 malam.'],
      ['毎週月曜日は休館日です。', '', 'Setiap hari Senin perpustakaan tutup.'],
      ['本は一人十冊まで、二週間借りることができます。', '', 'Setiap orang bisa meminjam maksimal sepuluh buku selama dua minggu.'],
      ['館内では、飲み物は飲んでもいいですが、食べ物を食べてはいけません。', '', 'Di dalam gedung boleh minum, tetapi tidak boleh makan.'],
      ['電話で話すときは、外に出てください。', '', 'Saat berbicara di telepon, silakan keluar.'],
      ['本を返すのが遅れたら、一週間借りられません。', '', 'Jika terlambat mengembalikan buku, Anda tidak bisa meminjam selama seminggu.'],
    ],
    glossary: [['図書館', 'としょかん', 'perpustakaan'], ['休館日', 'きゅうかんび', 'hari tutup'], ['借りる', 'かりる', 'meminjam'], ['返す', 'かえす', 'mengembalikan']],
    questions: [
      ['Berapa buku yang bisa dipinjam?', 'Sepuluh', ['Lima', 'Tiga', 'Dua puluh']],
      ['Apa yang tidak boleh dilakukan di dalam gedung?', 'Makan', ['Minum', 'Membaca', 'Belajar']],
      ['Apa akibat terlambat mengembalikan buku?', 'Tidak bisa meminjam selama seminggu', ['Denda seribu yen', 'Kartu dibatalkan', 'Harus membeli buku']],
    ],
  },
  {
    id: 'n4-kyoto', level: 'elementary', title: 'Wisata ke Kyoto', native: '京都旅行',
    sentences: [
      ['先月、家族と京都へ旅行に行きました。', '', 'Bulan lalu saya berwisata ke Kyoto bersama keluarga.'],
      ['新幹線で東京から二時間ちょっとで着きました。', '', 'Dengan shinkansen dari Tokyo kami tiba dalam sedikit lebih dari dua jam.'],
      ['有名なお寺をいくつも見学しましたが、どこも人が多かったです。', '', 'Kami mengunjungi beberapa kuil terkenal, tetapi di mana-mana ramai.'],
      ['旅館に泊まって、畳の部屋で寝ました。', '', 'Kami menginap di ryokan dan tidur di kamar bertatami.'],
      ['晩ごはんは京都の伝統的な料理で、とてもおいしかったです。', '', 'Makan malamnya masakan tradisional Kyoto dan sangat enak.'],
      ['今度は人が少ない冬に行ってみたいです。', '', 'Lain kali saya ingin mencoba pergi pada musim dingin saat sepi.'],
    ],
    glossary: [['新幹線', 'しんかんせん', 'kereta cepat'], ['見学', 'けんがく', 'kunjungan'], ['旅館', 'りょかん', 'penginapan tradisional'], ['畳', 'たたみ', 'tatami']],
    questions: [
      ['Berapa lama perjalanan dengan shinkansen?', 'Sedikit lebih dari dua jam', ['Satu jam', 'Empat jam', 'Tiga puluh menit']],
      ['Di mana mereka menginap?', 'Di ryokan', ['Di hotel bisnis', 'Di rumah teman', 'Di asrama']],
      ['Kapan penulis ingin pergi lagi?', 'Musim dingin', ['Musim panas', 'Musim semi', 'Musim gugur']],
    ],
  },
  {
    id: 'n4-gomi', level: 'elementary', title: 'Cara membuang sampah', native: 'ごみの出し方',
    sentences: [
      ['日本では、ごみを種類によって分けて出さなければなりません。', '', 'Di Jepang sampah harus dipilah menurut jenisnya.'],
      ['燃えるごみは月曜日と木曜日に出します。', '', 'Sampah yang bisa dibakar dibuang hari Senin dan Kamis.'],
      ['缶やびんは水曜日です。', '', 'Kaleng dan botol kaca hari Rabu.'],
      ['ごみは朝八時までに決められた場所に出してください。', '', 'Buanglah sampah di tempat yang ditentukan paling lambat jam 8 pagi.'],
      ['前の日の夜に出すと、カラスがごみを散らかしてしまいます。', '', 'Kalau dibuang malam sebelumnya, burung gagak akan mengacak-acaknya.'],
      ['最初は大変でしたが、今はもう慣れました。', '', 'Awalnya repot, tetapi sekarang saya sudah terbiasa.'],
    ],
    glossary: [['種類', 'しゅるい', 'jenis'], ['燃える', 'もえる', 'terbakar'], ['缶', 'かん', 'kaleng'], ['散らかす', 'ちらかす', 'mengacak-acak']],
    questions: [
      ['Kapan sampah yang bisa dibakar dibuang?', 'Senin dan Kamis', ['Hanya Rabu', 'Selasa dan Jumat', 'Sabtu']],
      ['Paling lambat jam berapa sampah dibuang?', 'Jam 8 pagi', ['Jam 6 pagi', 'Jam 10 pagi', 'Jam 8 malam']],
      ['Mengapa sampah tidak dibuang malam sebelumnya?', 'Burung gagak mengacak-acaknya', ['Dilarang polisi', 'Truk datang malam hari', 'Baunya menyebar']],
    ],
  },
  {
    id: 'n4-yume', level: 'elementary', title: 'Cita-cita saya', native: '将来の夢',
    sentences: [
      ['私の夢は日本語の先生になることです。', '', 'Impian saya adalah menjadi guru bahasa Jepang.'],
      ['高校生のとき、日本のアニメを見て日本語に興味を持ちました。', '', 'Waktu SMA saya tertarik pada bahasa Jepang setelah menonton anime Jepang.'],
      ['大学で日本語を専攻して、去年N3に合格しました。', '', 'Saya mengambil jurusan bahasa Jepang di universitas dan tahun lalu lulus N3.'],
      ['今はN2に合格するために、毎日二時間勉強しています。', '', 'Sekarang saya belajar dua jam setiap hari agar lulus N2.'],
      ['卒業したら、日本の大学院で教え方を勉強したいです。', '', 'Setelah lulus saya ingin belajar metode mengajar di pascasarjana di Jepang.'],
      ['夢をかなえるために、あきらめずにがんばります。', '', 'Saya akan berusaha tanpa menyerah untuk mewujudkan impian.'],
    ],
    glossary: [['夢', 'ゆめ', 'impian'], ['興味', 'きょうみ', 'minat'], ['専攻', 'せんこう', 'jurusan'], ['合格', 'ごうかく', 'lulus ujian']],
    questions: [
      ['Apa impian penulis?', 'Menjadi guru bahasa Jepang', ['Menjadi penerjemah', 'Membuat anime', 'Menjadi pemandu wisata']],
      ['Level JLPT apa yang sudah lulus?', 'N3', ['N2', 'N4', 'N1']],
      ['Berapa jam penulis belajar setiap hari?', 'Dua jam', ['Satu jam', 'Tiga jam', 'Lima jam']],
    ],
  },
];
