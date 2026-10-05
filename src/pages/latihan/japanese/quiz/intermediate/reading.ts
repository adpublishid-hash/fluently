import type { JapaneseQuizTopic } from '../types';

// Latihan Reading N3 — one entry per topic (index = topic - 1): [Basic, Advanced].
export const reading: JapaneseQuizTopic[] = [
  // 1. Esai opini
  [
    [
      ["力を入れる", "Chikara o ireru", "memfokuskan tenaga / serius menggarap"],
      ["のではないだろうか", "No de wa nai darou ka", "bukankah ...? (pendapat halus)"],
      ["急速に進む", "Kyuusoku ni susumu", "berkembang pesat"],
      ["可能性を広げる", "Kanousei o hirogeru", "memperluas kemungkinan", ["Dalam esai opini, klaim utama biasanya ada di...", "awal (dan ditegaskan di akhir)", "tengah saja", "catatan kaki", "judul gambar"]],
    ],
    [
      ["若者はもっと地方で働くことを考えるべきだ。", "Wakamono wa motto chihou de hataraku koto o kangaeru beki da.", "Anak muda seharusnya lebih mempertimbangkan bekerja di daerah."],
      ["地方には都会にない豊かな自然と人のつながりがある。", "Chihou ni wa tokai ni nai yutaka na shizen to hito no tsunagari ga aru.", "Di daerah ada alam yang kaya dan hubungan antarmanusia yang tidak ada di kota."],
      ["インターネットがあれば、場所を選ばずに働ける時代だ。", "Intaanetto ga areba, basho o erabazu ni hatarakeru jidai da.", "Ini zaman di mana dengan internet orang bisa bekerja di mana saja."],
      ["地方で働くことは、新しい生き方の一つではないだろうか。", "Chihou de hataraku koto wa, atarashii ikikata no hitotsu de wa nai darou ka.", "Bukankah bekerja di daerah adalah salah satu cara hidup baru?", ["Posisi penulis esai itu adalah...", "mendorong anak muda bekerja di daerah", "menolak bekerja di daerah", "tidak punya pendapat", "anak muda harus tinggal di kota"]],
    ],
  ],
  // 2. Artikel berita
  [
    [
      ["過去最多", "Kako saita", "terbanyak sepanjang sejarah"],
      ["にのぼる", "Ni noboru", "mencapai (jumlah besar)"],
      ["目立つ", "Medatsu", "mencolok"],
      ["自治体", "Jichitai", "pemerintah daerah", ["Paragraf pertama artikel berita berisi...", "ringkasan inti berita", "pendapat pembaca", "iklan", "daftar pustaka"]],
    ],
    [
      ["昨年、日本を訪れた外国人旅行者が過去最多となった。", "Sakunen, Nihon o otozureta gaikokujin ryokousha ga kako saita to natta.", "Tahun lalu, jumlah wisatawan asing yang mengunjungi Jepang mencapai rekor tertinggi."],
      ["観光庁によると、その数は三千万人にのぼる。", "Kankouchou ni yoru to, sono kazu wa sanzenmannin ni noboru.", "Menurut Badan Pariwisata, jumlahnya mencapai tiga puluh juta orang.", ["Menurut artikel, jumlah wisatawan asing mencapai...", "30 juta orang", "3 juta orang", "300 ribu orang", "3 miliar orang"]],
      ["特にアジアからの旅行者の増加が目立っている。", "Toku ni Ajia kara no ryokousha no zouka ga medatte iru.", "Peningkatan wisatawan dari Asia terutama mencolok."],
      ["一方で、観光地の混雑が新たな課題となっている。", "Ippou de, kankouchi no konzatsu ga arata na kadai to natte iru.", "Di sisi lain, kepadatan tempat wisata menjadi tantangan baru."],
    ],
  ],
  // 3. Email kerja
  [
    [
      ["皆様", "Minasama", "Bapak/Ibu sekalian"],
      ["ご連絡いたします", "Gorenraku itashimasu", "saya informasikan"],
      ["割り当て", "Wariate", "pembagian / alokasi"],
      ["ご確認のほど", "Gokakunin no hodo", "mohon untuk diperiksa", ["Email kerja internal di Jepang sering dibuka dengan...", "お疲れさまです。", "拝啓", "やあ！", "こんばんは。"]],
    ],
    [
      ["総務部の皆様、お疲れさまです。", "Soumubu no minasama, otsukaresama desu.", "Rekan-rekan divisi umum, terima kasih atas kerja kerasnya."],
      ["来週の避難訓練について、ご連絡いたします。", "Raishuu no hinan kunren ni tsuite, gorenraku itashimasu.", "Saya informasikan mengenai latihan evakuasi minggu depan."],
      ["当日は午後二時に一階ロビーに集合してください。", "Toujitsu wa gogo niji ni ikkai robii ni shuugou shite kudasai.", "Pada hari itu, berkumpul di lobi lantai satu pukul dua siang.", ["Menurut email, karyawan berkumpul di...", "lobi lantai satu", "ruang rapat", "atap gedung", "tempat parkir"]],
      ["ご不明な点は、総務部の山田までお問い合わせください。", "Gofumei na ten wa, soumubu no Yamada made otoiawase kudasai.", "Jika ada yang kurang jelas, silakan tanyakan kepada Yamada dari divisi umum."],
    ],
  ],
  // 4. Pemberitahuan layanan
  [
    [
      ["一時停止", "Ichiji teishi", "dihentikan sementara"],
      ["メンテナンス", "Mentenansu", "pemeliharaan"],
      ["ご不便", "Gofuben", "ketidaknyamanan"],
      ["ご理解", "Gorikai", "pengertian", ["Pemberitahuan layanan biasanya ditutup dengan...", "permintaan maaf dan permohonan pengertian", "promosi produk", "pertanyaan kuis", "nomor rekening"]],
    ],
    [
      ["工事のため、来週月曜日はプールの利用を一時停止いたします。", "Kouji no tame, raishuu getsuyoubi wa puuru no riyou o ichiji teishi itashimasu.", "Karena pekerjaan konstruksi, penggunaan kolam renang dihentikan sementara hari Senin depan."],
      ["再開は火曜日の午前十時からを予定しております。", "Saikai wa kayoubi no gozen juuji kara o yotei shite orimasu.", "Dijadwalkan dibuka kembali hari Selasa mulai pukul sepuluh pagi.", ["Menurut pemberitahuan, kolam renang dibuka kembali...", "Selasa pukul 10 pagi", "Senin pukul 10 pagi", "Rabu", "minggu depan"]],
      ["期間中の回数券は、有効期限を一日延長します。", "Kikanchuu no kaisuuken wa, yuukou kigen o ichinichi enchou shimasu.", "Masa berlaku kupon selama periode itu diperpanjang sehari."],
      ["ご迷惑をおかけしますが、ご理解のほどお願い申し上げます。", "Gomeiwaku o okake shimasu ga, gorikai no hodo onegai moushiagemasu.", "Mohon maaf atas ketidaknyamanannya, mohon pengertiannya."],
    ],
  ],
  // 5. Argumen dalam blog
  [
    [
      ["続けてみた", "Tsuzukete mita", "mencoba melanjutkan"],
      ["驚くほど集中できる", "Odoroku hodo shuuchuu dekiru", "bisa sangat berkonsentrasi"],
      ["ただし", "Tadashi", "namun / hanya saja"],
      ["向いている", "Muite iru", "cocok"],
    ],
    [
      ["一か月間、スマホを使わない生活をしてみた。", "Ikkagetsukan, sumaho o tsukawanai seikatsu o shite mita.", "Saya mencoba hidup tanpa ponsel pintar selama sebulan."],
      ["最初の一週間は不安で仕方がなかった。", "Saisho no isshuukan wa fuan de shikata ga nakatta.", "Minggu pertama saya cemas sekali."],
      ["しかし、本を読む時間が驚くほど増えた。", "Shikashi, hon o yomu jikan ga odoroku hodo fueta.", "Namun, waktu membaca buku bertambah luar biasa."],
      ["ただし、仕事の連絡には困ることもあった。", "Tadashi, shigoto no renraku ni wa komaru koto mo atta.", "Hanya saja, kadang repot untuk komunikasi pekerjaan.", ["Menurut blog itu, kekurangan hidup tanpa ponsel adalah...", "repot untuk komunikasi kerja", "tidak bisa membaca buku", "tidak bisa tidur", "biayanya mahal"]],
    ],
  ],
  // 6. Teks wawancara
  [
    [
      ["大切にしている", "Taisetsu ni shite iru", "yang diutamakan / dijaga"],
      ["想像する", "Souzou suru", "membayangkan"],
      ["てこそ", "Te koso", "justru karena / baru ... kalau"],
      ["職人", "Shokunin", "pengrajin", ["Pola 〜てこそ berarti...", "baru bermakna kalau ...", "meskipun ...", "sebelum ...", "tanpa ..."]],
    ],
    [
      ["職人になって何年になりますか。", "Shokunin ni natte nannen ni narimasu ka.", "Sudah berapa tahun Anda menjadi pengrajin?"],
      ["今年でちょうど三十年になります。", "Kotoshi de choudo sanjuunen ni narimasu.", "Tahun ini tepat tiga puluh tahun."],
      ["失敗を重ねてこそ、本当の技術が身につくんです。", "Shippai o kasanete koso, hontou no gijutsu ga mi ni tsuku n desu.", "Justru dengan banyak gagal, keterampilan sejati bisa dikuasai."],
      ["若い人には、まず手を動かしてほしいですね。", "Wakai hito ni wa, mazu te o ugokashite hoshii desu ne.", "Saya ingin anak muda pertama-tama mulai bekerja dengan tangannya.", ["Pesan narasumber untuk anak muda adalah...", "mulailah praktik dengan tangan sendiri", "jangan menjadi pengrajin", "belajar dari buku saja", "pindah ke kota"]],
    ],
  ],
  // 7. Teks penjelasan
  [
    [
      ["とは", "To wa", "yang disebut ... adalah"],
      ["計算になる", "Keisan ni naru", "secara hitungan menjadi"],
      ["有効な対策", "Yuukou na taisaku", "langkah yang efektif"],
      ["年間", "Nenkan", "per tahun", ["Teks penjelasan biasanya berurutan...", "definisi → mekanisme → contoh", "contoh → salam", "pendapat → pamit", "harga → alamat"]],
    ],
    [
      ["「ヒートアイランド」とは、都市の気温が周りより高くなる現象だ。", "\"Hiito airando\" to wa, toshi no kion ga mawari yori takaku naru genshou da.", "'Heat island' adalah fenomena suhu kota menjadi lebih tinggi dari sekitarnya."],
      ["原因は、アスファルトや建物が熱をためることにある。", "Gen-in wa, asufaruto ya tatemono ga netsu o tameru koto ni aru.", "Penyebabnya adalah aspal dan bangunan menyimpan panas."],
      ["緑を増やすことは、有効な対策の一つである。", "Midori o fuyasu koto wa, yuukou na taisaku no hitotsu de aru.", "Menambah tanaman hijau adalah salah satu langkah yang efektif."],
      ["例えば、屋上に庭を作るビルも増えている。", "Tatoeba, okujou ni niwa o tsukuru biru mo fuete iru.", "Misalnya, gedung yang membuat taman di atap juga bertambah.", ["Menurut teks, penyebab heat island adalah...", "aspal dan bangunan menyimpan panas", "terlalu banyak pohon", "angin laut", "hujan"]],
    ],
  ],
  // 8. Instruksi kompleks
  [
    [
      ["場合は", "Baai wa", "dalam hal / jika"],
      ["委任状", "Inin-jou", "surat kuasa"],
      ["記入漏れ", "Kinyuu more", "isian yang terlewat"],
      ["以外", "Igai", "selain", ["Kata ただし dalam instruksi berarti...", "namun / dengan pengecualian", "karena itu", "pertama", "akhirnya"]],
    ],
    [
      ["パスポートの申請には、写真が二枚必要です。", "Pasupooto no shinsei ni wa, shashin ga nimai hitsuyou desu.", "Untuk permohonan paspor diperlukan dua lembar foto."],
      ["未成年の場合は、親の同意書も提出してください。", "Miseinen no baai wa, oya no doisho mo teishutsu shite kudasai.", "Jika belum dewasa, serahkan juga surat persetujuan orang tua.", ["Menurut instruksi, surat persetujuan orang tua diperlukan jika...", "pemohon belum dewasa", "pemohon orang asing", "fotonya hilang", "pemohon berusia lanjut"]],
      ["ただし、写真は六か月以内に撮影したものに限ります。", "Tadashi, shashin wa rokkagetsu inai ni satsuei shita mono ni kagirimasu.", "Namun, foto terbatas yang diambil dalam enam bulan terakhir."],
      ["土日・祝日以外は、平日の朝九時から受け付けます。", "Donichi shukujitsu igai wa, heijitsu no asa kuji kara uketsukemasu.", "Selain Sabtu, Minggu, dan hari libur, dilayani pada hari kerja mulai pukul sembilan pagi."],
    ],
  ],
  // 9. Artikel perbandingan
  [
    [
      ["それに対して", "Sore ni taishite", "sebaliknya"],
      ["いずれにしても", "Izure ni shite mo", "bagaimanapun juga"],
      ["異なる", "Kotonaru", "berbeda"],
      ["求められている", "Motomerarete iru", "dibutuhkan / dituntut", ["Artikel perbandingan biasanya diakhiri dengan...", "kesimpulan", "iklan", "daftar harga", "pertanyaan acak"]],
    ],
    [
      ["若い世代はネットでニュースを読むことが多い。", "Wakai sedai wa netto de nyuusu o yomu koto ga ooi.", "Generasi muda banyak membaca berita di internet."],
      ["それに対して、高齢者は新聞やテレビを好む傾向がある。", "Sore ni taishite, koureisha wa shinbun ya terebi o konomu keikou ga aru.", "Sebaliknya, lansia cenderung lebih menyukai koran dan televisi."],
      ["情報の受け取り方は世代によって大きく異なる。", "Jouhou no uketorikata wa sedai ni yotte ookiku kotonaru.", "Cara menerima informasi sangat berbeda menurut generasi."],
      ["いずれにしても、情報を正しく判断する力が求められている。", "Izure ni shite mo, jouhou o tadashiku handan suru chikara ga motomerarete iru.", "Bagaimanapun, kemampuan menilai informasi dengan benar sangat dibutuhkan.", ["Kesimpulan artikel itu adalah...", "kemampuan menilai informasi itu penting", "koran harus dilarang", "anak muda tidak membaca berita", "TV lebih baik dari internet"]],
    ],
  ],
  // 10. Teks budaya
  [
    [
      ["お辞儀", "Ojigi", "membungkuk (memberi hormat)"],
      ["敬意を示す", "Keii o shimesu", "menunjukkan rasa hormat"],
      ["角度", "Kakudo", "sudut"],
      ["態度", "Taido", "sikap", ["Menurut teks budaya, membungkuk sangat dalam dilakukan saat...", "meminta maaf", "makan", "berbelanja", "berolahraga"]],
    ],
    [
      ["日本では、食事の前に「いただきます」と言う。", "Nihon de wa, shokuji no mae ni \"itadakimasu\" to iu.", "Di Jepang, sebelum makan orang mengucapkan 'itadakimasu'."],
      ["これは、食べ物や作った人への感謝を表す言葉だ。", "Kore wa, tabemono ya tsukutta hito e no kansha o arawasu kotoba da.", "Ini adalah ungkapan terima kasih kepada makanan dan orang yang membuatnya."],
      ["命をいただくという意味も込められている。", "Inochi o itadaku to iu imi mo komerarete iru.", "Juga terkandung makna 'menerima kehidupan'."],
      ["小さな言葉の中に、日本人の価値観が表れているのだ。", "Chiisa na kotoba no naka ni, Nihonjin no kachikan ga arawarete iru no da.", "Dalam ungkapan kecil itu tercermin nilai-nilai orang Jepang.", ["Menurut teks, いただきます mengungkapkan...", "rasa terima kasih", "rasa lapar", "permintaan maaf", "salam perpisahan"]],
    ],
  ],
  // 11. Teks ulasan
  [
    [
      ["描く", "Egaku", "menggambarkan"],
      ["ものの", "Mono no", "meskipun"],
      ["展開", "Tenkai", "alur / perkembangan cerita"],
      ["一冊", "Issatsu", "satu buku", ["Ulasan buku biasanya berurutan...", "ringkasan → penilaian → rekomendasi", "rekomendasi → salam", "harga → alamat", "judul → pamit"]],
    ],
    [
      ["この映画は、夢を追いかける若い料理人を描いている。", "Kono eiga wa, yume o oikakeru wakai ryourinin o egaite iru.", "Film ini menggambarkan juru masak muda yang mengejar impian."],
      ["ストーリーは単純なものの、俳優の演技が素晴らしい。", "Sutoorii wa tanjun na mono no, haiyuu no engi ga subarashii.", "Meskipun ceritanya sederhana, akting para pemerannya luar biasa."],
      ["ただ、音楽が少しうるさく感じる場面もあった。", "Tada, ongaku ga sukoshi urusaku kanjiru bamen mo atta.", "Hanya saja, ada adegan yang musiknya terasa agak berisik.", ["Kritik penulis terhadap film itu adalah...", "musiknya kadang berisik", "aktingnya buruk", "ceritanya terlalu rumit", "terlalu pendek"]],
      ["料理が好きな人には特におすすめしたい。", "Ryouri ga suki na hito ni wa toku ni osusume shitai.", "Terutama ingin saya rekomendasikan kepada penyuka memasak."],
    ],
  ],
  // 12. Surat keluhan
  [
    [
      ["先日", "Senjitsu", "beberapa hari lalu"],
      ["問い合わせたところ", "Toiawaseta tokoro", "ketika saya menanyakan"],
      ["早急に", "Soukyuu ni", "segera"],
      ["存じます", "Zonjimasu", "saya berpikir / berharap (merendah)", ["Urutan surat keluhan yang baik adalah...", "kronologi → masalah → kerugian → permintaan", "permintaan → salam", "pujian saja", "harga → alamat"]],
    ],
    [
      ["先日、御社のホテルに二泊いたしました。", "Senjitsu, onsha no hoteru ni nihaku itashimashita.", "Beberapa hari lalu saya menginap dua malam di hotel Anda."],
      ["しかし、部屋の暖房が故障しており、一晩中寒い思いをしました。", "Shikashi, heya no danbou ga koshou shite ori, hitobanjuu samui omoi o shimashita.", "Namun, pemanas kamar rusak dan saya kedinginan semalaman."],
      ["フロントに伝えたところ、対応は翌朝になるとのことでした。", "Furonto ni tsutaeta tokoro, taiou wa yokuasa ni naru to no koto deshita.", "Ketika saya sampaikan ke resepsionis, katanya penanganannya baru keesokan pagi."],
      ["今後このようなことがないよう、改善をお願いしたく存じます。", "Kongo kono you na koto ga nai you, kaizen o onegai shitaku zonjimasu.", "Saya mohon perbaikan agar hal seperti ini tidak terjadi lagi.", ["Permintaan penulis surat itu adalah...", "perbaikan layanan ke depannya", "uang dikembalikan dua kali lipat", "kamar gratis selamanya", "hotel ditutup"]],
    ],
  ],
  // 13. Informasi pendaftaran
  [
    [
      ["応募資格", "Oubo shikaku", "syarat pendaftaran"],
      ["応募方法", "Oubo houhou", "cara mendaftar"],
      ["書類審査", "Shorui shinsa", "pemeriksaan berkas"],
      ["合格者のみ", "Goukakusha nomi", "hanya yang lolos", ["Kata のみ dalam 合格者のみ berarti...", "hanya", "semua", "tidak", "termasuk"]],
    ],
    [
      ["応募資格は、日本語能力試験N3以上をお持ちの方です。", "Oubo shikaku wa, Nihongo nouryoku shiken enu san ijou o omochi no kata desu.", "Syarat pendaftaran: memiliki JLPT N3 ke atas."],
      ["履歴書と作文を郵送してください。", "Rirekisho to sakubun o yuusou shite kudasai.", "Kirimkan riwayat hidup dan karangan lewat pos."],
      ["締め切りは四月三十日（当日消印有効）です。", "Shimekiri wa shigatsu sanjuunichi (toujitsu keshiin yuukou) desu.", "Tenggatnya 30 April (cap pos hari itu berlaku).", ["Menurut informasi, tenggat pendaftaran adalah...", "30 April", "3 April", "30 Maret", "13 April"]],
      ["面接は書類審査の通過者のみに行います。", "Mensetsu wa shorui shinsa no tsuukasha nomi ni okonaimasu.", "Wawancara hanya dilakukan untuk yang lolos pemeriksaan berkas."],
    ],
  ],
  // 14. Hasil survei
  [
    [
      ["四割", "Yonwari", "empat puluh persen"],
      ["ポイント下がる", "Pointo sagaru", "turun ... poin"],
      ["最も多い", "Mottomo ooi", "paling banyak"],
      ["と考えられる", "To kangaerareru", "diperkirakan / dapat dianggap", ["四割 berarti...", "40%", "4%", "14%", "44%"]],
    ],
    [
      ["「毎日料理をする」と答えた人は全体の六割だった。", "\"Mainichi ryouri o suru\" to kotaeta hito wa zentai no rokuwari datta.", "Yang menjawab 'memasak setiap hari' sebanyak enam puluh persen dari keseluruhan.", ["Menurut survei, berapa persen yang memasak setiap hari?", "60%", "6%", "16%", "66%"]],
      ["十年前と比べて、十ポイント減っている。", "Juunen mae to kurabete, juu pointo hette iru.", "Dibandingkan sepuluh tahun lalu, berkurang sepuluh poin."],
      ["料理をしない理由で最も多かったのは「時間がない」だった。", "Ryouri o shinai riyuu de mottomo ookatta no wa \"jikan ga nai\" datta.", "Alasan tidak memasak yang terbanyak adalah 'tidak ada waktu'."],
      ["共働きの家庭が増えたことが影響していると考えられる。", "Tomobataraki no katei ga fueta koto ga eikyou shite iru to kangaerareru.", "Bertambahnya keluarga dengan suami-istri bekerja diperkirakan berpengaruh."],
    ],
  ],
  // 15. Editorial pendek
  [
    [
      ["相次ぐ", "Aitsugu", "terjadi berturut-turut"],
      ["限界がある", "Genkai ga aru", "ada batasnya"],
      ["両立", "Ryouritsu", "keseimbangan / menjalankan keduanya"],
      ["整える", "Totonoeru", "menyiapkan / menata", ["Editorial koran biasanya berisi...", "isu, posisi, alasan, dan tuntutan", "jadwal TV", "iklan saja", "resep"]],
    ],
    [
      ["子どもの読書離れが指摘されて久しい。", "Kodomo no dokusho banare ga shiteki sarete hisashii.", "Sudah lama ditunjukkan bahwa anak-anak menjauhi kegiatan membaca."],
      ["学校の努力だけに任せるのには限界がある。", "Gakkou no doryoku dake ni makaseru no ni wa genkai ga aru.", "Menyerahkan hanya pada usaha sekolah ada batasnya."],
      ["家庭でも、親が本を読む姿を見せることが大切だ。", "Katei demo, oya ga hon o yomu sugata o miseru koto ga taisetsu da.", "Di rumah pun, penting bagi orang tua memperlihatkan dirinya membaca."],
      ["地域の図書館も、子どもが通いたくなる環境を整えるべきだ。", "Chiiki no toshokan mo, kodomo ga kayoitaku naru kankyou o totonoeru beki da.", "Perpustakaan daerah juga seharusnya menata lingkungan yang membuat anak ingin datang.", ["Tuntutan editorial itu adalah...", "rumah dan perpustakaan ikut mendorong anak membaca", "melarang ponsel", "menutup perpustakaan", "menambah PR"]],
    ],
  ],
  // 16. Kanji N3 dalam teks
  [
    [
      ["回復", "Kaifuku", "pemulihan"],
      ["向上", "Koujou", "peningkatan"],
      ["達成", "Tassei", "pencapaian"],
      ["国際", "Kokusai", "internasional", ["Bacaan kanji 達成 adalah...", "tassei", "tatsusei", "dassei", "tasshou"]],
    ],
    [
      ["売り上げの目標を三か月で達成した。", "Uriage no mokuhyou o sankagetsu de tassei shita.", "Target penjualan tercapai dalam tiga bulan."],
      ["病気が回復して、仕事に戻ることができた。", "Byouki ga kaifuku shite, shigoto ni modoru koto ga dekita.", "Penyakit saya pulih dan saya bisa kembali bekerja."],
      ["技術の向上には毎日の練習が欠かせない。", "Gijutsu no koujou ni wa mainichi no renshuu ga kakasenai.", "Untuk meningkatkan keterampilan, latihan setiap hari sangat diperlukan."],
      ["国際会議で日本の代表として発表した。", "Kokusai kaigi de Nihon no daihyou to shite happyou shita.", "Saya berpresentasi sebagai wakil Jepang di konferensi internasional."],
    ],
  ],
  // 17. Latihan inferensi
  [
    [
      ["言うまでもない", "Iu made mo nai", "tak perlu dikatakan lagi"],
      ["ずぶぬれ", "Zubunure", "basah kuyup"],
      ["震える", "Furueru", "gemetar"],
      ["ということは", "To iu koto wa", "artinya / itu berarti", ["Inferensi berarti...", "menyimpulkan hal yang tidak ditulis langsung", "menyalin teks", "menerjemahkan kata per kata", "membaca keras"]],
    ],
    [
      ["彼は駅で時計を何度も見ていた。", "Kare wa eki de tokei o nando mo mite ita.", "Dia berkali-kali melihat jam di stasiun."],
      ["電車が来ると、急いで乗り込んだ。", "Densha ga kuru to, isoide norikonda.", "Begitu kereta datang, dia bergegas naik."],
      ["手には小さな花束を持っていた。", "Te ni wa chiisa na hanataba o motte ita.", "Di tangannya dia membawa buket bunga kecil."],
      ["大切な人に会いに行くところなのだろう。", "Taisetsu na hito ni ai ni iku tokoro na no darou.", "Mungkin dia sedang dalam perjalanan menemui orang yang berharga.", ["Dari teks itu, kita bisa menyimpulkan bahwa pria itu...", "akan menemui orang yang penting", "sedang pulang kerja", "kehilangan bunga", "ketinggalan kereta"]],
    ],
  ],
  // 18. Ide pokok
  [
    [
      ["材料", "Zairyou", "bahan"],
      ["恐れる", "Osoreru", "takut"],
      ["である", "De aru", "adalah (gaya tulisan)"],
      ["要するに", "You suru ni", "singkatnya", ["Ide pokok paragraf sering terletak di...", "kalimat pertama atau terakhir", "tengah kalimat ketiga", "catatan kaki", "judul gambar"]],
    ],
    [
      ["睡眠は健康を支える基本である。", "Suimin wa kenkou o sasaeru kihon de aru.", "Tidur adalah dasar penopang kesehatan."],
      ["寝不足が続くと、集中力や記憶力が落ちる。", "Nebusoku ga tsuzuku to, shuuchuuryoku ya kiokuryoku ga ochiru.", "Kalau kurang tidur terus, konsentrasi dan daya ingat menurun."],
      ["また、病気になりやすくなるとも言われている。", "Mata, byouki ni nariyasuku naru to mo iwarete iru.", "Juga dikatakan menjadi lebih mudah sakit."],
      ["忙しくても、睡眠時間を削るべきではない。", "Isogashikute mo, suimin jikan o kezuru beki de wa nai.", "Meskipun sibuk, waktu tidur seharusnya tidak dikurangi.", ["Ide pokok paragraf itu adalah...", "tidur itu penting bagi kesehatan", "orang sibuk tidak perlu tidur", "daya ingat tidak penting", "penyakit tidak bisa dicegah"]],
    ],
  ],
  // 19. Memindai detail
  [
    [
      ["料金", "Ryoukin", "tarif"],
      ["開館時間", "Kaikan jikan", "jam buka (gedung)"],
      ["休館日", "Kyuukanbi", "hari tutup (gedung)"],
      ["団体", "Dantai", "rombongan / kelompok", ["Saat memindai (scanning), kamu sebaiknya...", "mencari informasi tertentu tanpa membaca semua", "membaca setiap kata dengan teliti", "membaca dari belakang", "menerjemahkan semua"]],
    ],
    [
      ["入場料は大人八百円、高校生以下は半額です。", "Nyuujouryou wa otona happyakuen, koukousei ika wa hangaku desu.", "Tiket masuk dewasa 800 yen, siswa SMA ke bawah setengah harga.", ["Menurut informasi, harga tiket untuk siswa SMA adalah...", "400 yen", "800 yen", "gratis", "200 yen"]],
      ["最終入場は閉館の三十分前までです。", "Saishuu nyuujou wa heikan no sanjuppun mae made desu.", "Masuk terakhir paling lambat tiga puluh menit sebelum tutup."],
      ["年末年始は休館いたします。", "Nenmatsu nenshi wa kyuukan itashimasu.", "Tutup selama akhir dan awal tahun."],
      ["館内での写真撮影は、フラッシュを使わなければ可能です。", "Kannai de no shashin satsuei wa, furasshu o tsukawanakereba kanou desu.", "Memotret di dalam gedung boleh asalkan tanpa lampu kilat."],
    ],
  ],
  // 20. Ulasan reading N3
  [
    [
      ["気を使う", "Ki o tsukau", "sungkan / memperhatikan perasaan orang"],
      ["孤独", "Kodoku", "kesepian"],
      ["自由", "Jiyuu", "kebebasan"],
      ["設ける", "Moukeru", "menyediakan / mendirikan", ["Kata 孤独 berarti...", "kesepian", "kebebasan", "kebahagiaan", "keramaian"]],
    ],
    [
      ["最近、休日に一人で旅行する人が増えている。", "Saikin, kyuujitsu ni hitori de ryokou suru hito ga fuete iru.", "Akhir-akhir ini orang yang berwisata sendirian di hari libur bertambah."],
      ["行き先や予定を自分だけで決められるのが魅力らしい。", "Ikisaki ya yotei o jibun dake de kimerareru no ga miryoku rashii.", "Rupanya daya tariknya adalah bisa menentukan tujuan dan jadwal sendiri."],
      ["旅館の中にも、一人旅向けのプランを設けるところが出てきた。", "Ryokan no naka ni mo, hitoritabi muke no puran o moukeru tokoro ga dete kita.", "Di antara penginapan pun, mulai ada yang menyediakan paket untuk wisata sendirian."],
      ["一人の時間を楽しむ文化が広がっているのかもしれない。", "Hitori no jikan o tanoshimu bunka ga hirogatte iru no kamoshirenai.", "Mungkin budaya menikmati waktu sendirian sedang menyebar.", ["Menurut penulis, tren itu mungkin menunjukkan...", "budaya menikmati waktu sendiri menyebar", "orang tidak suka berwisata", "penginapan akan tutup", "wisata kelompok dilarang"]],
    ],
  ],
];
