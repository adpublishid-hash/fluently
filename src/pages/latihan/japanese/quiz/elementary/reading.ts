import type { JapaneseQuizTopic } from '../types';

// Latihan Reading N4 — one entry per topic (index = topic - 1): [Basic, Advanced].
export const reading: JapaneseQuizTopic[] = [
  // 1. Email pendek
  [
    [
      ["待ち合わせ場所", "Machiawase basho", "tempat janjian"],
      ["都合が悪い", "Tsugou ga warui", "waktunya tidak cocok"],
      ["返信", "Henshin", "balasan (pesan)"],
      ["いつもの", "Itsumo no", "yang biasa", ["Pada email, kalimat 都合が悪かったら教えて berarti...", "kalau tidak bisa, kabari aku", "aku sakit", "aku sudah sampai", "tolong datang cepat"]],
    ],
    [
      ["ごめん、急に仕事が入って、今日行けなくなった。", "Gomen, kyuu ni shigoto ga haitte, kyou ikenaku natta.", "Maaf, tiba-tiba ada pekerjaan, jadi hari ini aku tidak bisa datang.", ["Menurut email, penulis tidak bisa datang karena...", "ada pekerjaan mendadak", "sakit", "ketinggalan kereta", "lupa janji"]],
      ["来週の土曜日なら空いてるよ。", "Raishuu no doyoubi nara aiteru yo.", "Kalau Sabtu depan aku kosong."],
      ["借りてた本、明日返すね。", "Kariteta hon, ashita kaesu ne.", "Buku yang kupinjam, besok kukembalikan ya."],
      ["返信、待ってるね。", "Henshin, matteru ne.", "Kutunggu balasannya, ya."],
    ],
  ],
  // 2. Pengumuman acara
  [
    [
      ["日時", "Nichiji", "tanggal dan waktu"],
      ["内容", "Naiyou", "isi / kegiatan"],
      ["雨天中止", "Uten chuushi", "batal jika hujan"],
      ["申込先", "Moushikomisaki", "tempat pendaftaran", ["Pada pengumuman, 雨天中止 berarti...", "batal jika hujan", "tetap jalan saat hujan", "pindah ke dalam ruangan", "ditunda seminggu"]],
    ],
    [
      ["秋のスポーツ大会を下記の通り行います。", "Aki no supootsu taikai o kaki no toori okonaimasu.", "Lomba olahraga musim gugur diadakan seperti tercantum di bawah."],
      ["小学生以下は保護者と一緒に参加してください。", "Shougakusei ika wa hogosha to issho ni sanka shite kudasai.", "Anak SD ke bawah harap ikut bersama orang tua."],
      ["参加希望者は九月二十日までに申し込んでください。", "Sanka kibousha wa kugatsu hatsuka made ni moushikonde kudasai.", "Peminat harap mendaftar paling lambat tanggal 20 September."],
      ["雨天の場合は、翌週の日曜日に行います。", "Uten no baai wa, yokushuu no nichiyoubi ni okonaimasu.", "Jika hujan, diadakan hari Minggu minggu berikutnya.", ["Menurut pengumuman, jika hujan acara...", "diadakan Minggu berikutnya", "dibatalkan", "dipindah ke aula", "tetap berlangsung"]],
    ],
  ],
  // 3. Brosur wisata
  [
    [
      ["見どころ", "Midokoro", "tempat yang patut dilihat"],
      ["名物", "Meibutsu", "makanan / produk khas"],
      ["入場料", "Nyuujouryou", "biaya masuk"],
      ["営業時間", "Eigyou jikan", "jam operasional", ["Pada brosur, 名物 berarti...", "makanan atau produk khas", "nama tempat", "harga tiket", "peta"]],
    ],
    [
      ["日光は美しい自然と古い神社で有名です。", "Nikkou wa utsukushii shizen to furui jinja de yuumei desu.", "Nikko terkenal dengan alam yang indah dan kuil Shinto tua."],
      ["秋には紅葉を見に多くの人が訪れます。", "Aki ni wa kouyou o mi ni ooku no hito ga otozuremasu.", "Saat musim gugur banyak orang datang untuk melihat daun merah."],
      ["入場料は大人千円、子ども五百円です。", "Nyuujouryou wa otona sen-en, kodomo gohyakuen desu.", "Biaya masuk dewasa seribu yen, anak-anak lima ratus yen.", ["Menurut brosur, biaya masuk untuk satu dewasa dan satu anak adalah...", "1.500 yen", "1.000 yen", "2.000 yen", "500 yen"]],
      ["営業時間は午前九時から午後五時までです。", "Eigyou jikan wa gozen kuji kara gogo goji made desu.", "Jam operasional dari pukul sembilan pagi sampai pukul lima sore."],
    ],
  ],
  // 4. Poster aturan
  [
    [
      ["飲食禁止", "Inshoku kinshi", "dilarang makan dan minum"],
      ["撮影禁止", "Satsuei kinshi", "dilarang memotret"],
      ["立入禁止", "Tachiiri kinshi", "dilarang masuk"],
      ["土足厳禁", "Dosoku genkin", "dilarang memakai sepatu", ["Poster 立入禁止 berarti...", "dilarang masuk", "dilarang memotret", "dilarang merokok", "dilarang parkir"]],
    ],
    [
      ["この先は関係者以外立入禁止です。", "Kono saki wa kankeisha igai tachiiri kinshi desu.", "Selain yang berkepentingan, dilarang masuk ke area ini."],
      ["館内では大きな声で話さないでください。", "Kannai de wa ooki na koe de hanasanaide kudasai.", "Di dalam gedung jangan berbicara dengan suara keras."],
      ["自転車はここに止めないでください。", "Jitensha wa koko ni tomenaide kudasai.", "Jangan parkir sepeda di sini."],
      ["靴を脱いでお上がりください。", "Kutsu o nuide oagari kudasai.", "Silakan lepas sepatu sebelum masuk.", ["Menurut poster, sebelum masuk kamu harus...", "melepas sepatu", "membeli tiket", "mencuci tangan", "mematikan ponsel"]],
    ],
  ],
  // 5. Blog harian
  [
    [
      ["ブログ", "Burogu", "blog"],
      ["感動した", "Kandou shita", "terharu"],
      ["予想以上", "Yosou ijou", "melebihi perkiraan"],
      ["次は", "Tsugi wa", "lain kali", ["Gaya bahasa blog pribadi biasanya...", "santai (だ/である)", "sangat formal (でございます)", "perintah", "bahasa iklan"]],
    ],
    [
      ["週末、友達と初めてキャンプに行った。", "Shuumatsu, tomodachi to hajimete kyanpu ni itta.", "Akhir pekan, saya pertama kali berkemah dengan teman."],
      ["テントを立てるのは思ったより難しかった。", "Tento o tateru no wa omotta yori muzukashikatta.", "Mendirikan tenda lebih sulit dari yang saya bayangkan."],
      ["夜、星がたくさん見えて感動した。", "Yoru, hoshi ga takusan miete kandou shita.", "Malam hari banyak bintang terlihat, saya terharu."],
      ["次はもっと準備をしてから行きたい。", "Tsugi wa motto junbi o shite kara ikitai.", "Lain kali saya ingin pergi setelah bersiap lebih baik."],
    ],
  ],
  // 6. Ulasan restoran
  [
    [
      ["量", "Ryou", "porsi / jumlah"],
      ["味", "Aji", "rasa"],
      ["雰囲気", "Fun-iki", "suasana"],
      ["サービス", "Saabisu", "pelayanan", ["Pada ulasan restoran, 雰囲気 berarti...", "suasana", "harga", "porsi", "lokasi"]],
    ],
    [
      ["スープの味が濃くて、とてもおいしかったです。", "Suupu no aji ga kokute, totemo oishikatta desu.", "Rasa supnya kental dan sangat enak."],
      ["店の雰囲気が落ち着いていて、ゆっくりできました。", "Mise no fun-iki ga ochitsuite ite, yukkuri dekimashita.", "Suasana tokonya tenang, saya bisa bersantai."],
      ["値段は少し高めですが、量は多いです。", "Nedan wa sukoshi takame desu ga, ryou wa ooi desu.", "Harganya agak mahal, tetapi porsinya banyak.", ["Menurut ulasan, kekurangan restoran itu adalah...", "harganya agak mahal", "porsinya sedikit", "rasanya hambar", "pelayanannya kasar"]],
      ["また家族と来たいと思います。", "Mata kazoku to kitai to omoimasu.", "Saya ingin datang lagi bersama keluarga."],
    ],
  ],
  // 7. Saran kesehatan
  [
    [
      ["睡眠", "Suimin", "tidur"],
      ["栄養", "Eiyou", "gizi"],
      ["運動不足", "Undou busoku", "kurang olahraga"],
      ["ようにしましょう", "You ni shimashou", "usahakan untuk ...", ["Pola ようにしましょう dipakai untuk...", "mengajak membiasakan sesuatu", "melarang", "menyatakan pengalaman", "menyatakan dugaan"]],
    ],
    [
      ["毎日七時間以上寝るようにしましょう。", "Mainichi nanajikan ijou neru you ni shimashou.", "Usahakan tidur lebih dari tujuh jam setiap hari."],
      ["朝ご飯を抜くと、体に良くありません。", "Asagohan o nuku to, karada ni yoku arimasen.", "Melewatkan sarapan tidak baik untuk tubuh."],
      ["運動不足の人はエレベーターより階段を使いましょう。", "Undou busoku no hito wa erebeetaa yori kaidan o tsukaimashou.", "Bagi yang kurang olahraga, gunakan tangga daripada lift."],
      ["野菜や果物をバランスよく食べることが大切です。", "Yasai ya kudamono o baransu yoku taberu koto ga taisetsu desu.", "Penting untuk makan sayur dan buah secara seimbang.", ["Menurut teks, yang penting adalah...", "makan sayur dan buah secara seimbang", "makan banyak daging", "tidak sarapan", "minum kopi setiap hari"]],
    ],
  ],
  // 8. Pemberitahuan sekolah
  [
    [
      ["期末試験", "Kimatsu shiken", "ujian akhir semester"],
      ["学生証", "Gakuseishou", "kartu pelajar"],
      ["筆記用具", "Hikki yougu", "alat tulis"],
      ["延長", "Enchou", "perpanjangan", ["Pada pemberitahuan, 筆記用具 berarti...", "alat tulis", "buku pelajaran", "kartu pelajar", "seragam"]],
    ],
    [
      ["試験の時間割は掲示板で確認してください。", "Shiken no jikanwari wa keijiban de kakunin shite kudasai.", "Periksa jadwal ujian di papan pengumuman."],
      ["遅刻した場合、二十分以降は入室できません。", "Chikoku shita baai, nijuppun ikou wa nyuushitsu dekimasen.", "Jika terlambat lebih dari dua puluh menit, tidak boleh masuk ruangan.", ["Menurut pemberitahuan, siswa yang terlambat 25 menit...", "tidak boleh masuk", "boleh masuk", "harus ujian ulang besok", "mendapat nilai nol langsung"]],
      ["試験中は携帯電話の電源を切ってください。", "Shikenchuu wa keitai denwa no dengen o kitte kudasai.", "Selama ujian, matikan ponsel."],
      ["結果は来月の初めに発表されます。", "Kekka wa raigetsu no hajime ni happyou saremasu.", "Hasilnya diumumkan awal bulan depan."],
    ],
  ],
  // 9. Memo kantor
  [
    [
      ["伝言メモ", "Dengon memo", "memo pesan titipan"],
      ["報告書", "Houkokusho", "laporan"],
      ["故障", "Koshou", "rusak / kerusakan"],
      ["各自", "Kakuji", "masing-masing orang", ["Memo 至急ご確認ください berarti...", "mohon segera diperiksa", "tidak perlu diperiksa", "periksa minggu depan", "sudah diperiksa"]],
    ],
    [
      ["田中さんへ：山本様から電話がありました。", "Tanaka san e: Yamamoto sama kara denwa ga arimashita.", "Untuk Tanaka: ada telepon dari Bapak/Ibu Yamamoto."],
      ["三時までに折り返し電話してほしいそうです。", "Sanji made ni orikaeshi denwa shite hoshii sou desu.", "Katanya beliau ingin ditelepon balik sebelum pukul tiga.", ["Menurut memo, Tanaka harus menelepon balik sebelum...", "pukul 3", "pukul 2", "besok", "pukul 5"]],
      ["エアコンが故障したので、修理を頼みました。", "Eakon ga koshou shita node, shuuri o tanomimashita.", "AC-nya rusak, jadi saya minta diperbaiki."],
      ["明日の会議は第二会議室で行います。", "Ashita no kaigi wa daini kaigishitsu de okonaimasu.", "Rapat besok diadakan di ruang rapat dua."],
    ],
  ],
  // 10. Iklan tempat tinggal
  [
    [
      ["徒歩", "Toho", "berjalan kaki"],
      ["築", "Chiku", "umur bangunan (sejak dibangun)"],
      ["管理費", "Kanrihi", "biaya pengelolaan"],
      ["南向き", "Minamimuki", "menghadap selatan", ["Iklan 駅から徒歩五分 berarti...", "lima menit jalan kaki dari stasiun", "lima menit naik bus", "lima kilometer dari stasiun", "lima lantai"]],
    ],
    [
      ["南向きで日当たりのいい部屋です。", "Minamimuki de hiatari no ii heya desu.", "Kamar menghadap selatan dengan cahaya matahari yang baik."],
      ["家賃は月六万円、管理費は三千円です。", "Yachin wa tsuki rokuman-en, kanrihi wa sanzen-en desu.", "Sewa enam puluh ribu yen per bulan, biaya pengelolaan tiga ribu yen.", ["Menurut iklan, total biaya bulanan adalah...", "63.000 yen", "60.000 yen", "66.000 yen", "3.000 yen"]],
      ["築五年のきれいなマンションです。", "Chiku gonen no kirei na manshon desu.", "Apartemen bersih yang berumur lima tahun."],
      ["近くにスーパーとコンビニがあって便利です。", "Chikaku ni suupaa to konbini ga atte benri desu.", "Ada supermarket dan minimarket di dekatnya, jadi praktis."],
    ],
  ],
  // 11. Tabel jadwal
  [
    [
      ["平日", "Heijitsu", "hari kerja"],
      ["始発", "Shihatsu", "kendaraan pertama"],
      ["最終", "Saishuu", "terakhir"],
      ["土日祝", "Donichishuku", "Sabtu, Minggu, dan hari libur", ["Pada jadwal, 始発 berarti...", "kendaraan pertama", "kendaraan terakhir", "kendaraan ekspres", "pemberhentian"]],
    ],
    [
      ["平日は十五分おきにバスが出ています。", "Heijitsu wa juugofun oki ni basu ga dete imasu.", "Pada hari kerja bus berangkat setiap lima belas menit."],
      ["日曜日は一時間に二本しかありません。", "Nichiyoubi wa ichijikan ni nihon shika arimasen.", "Hari Minggu hanya ada dua bus per jam.", ["Menurut jadwal, hari Minggu ada berapa bus per jam?", "2", "4", "1", "15"]],
      ["始発は朝五時半です。", "Shihatsu wa asa goji han desu.", "Kendaraan pertama pukul setengah enam pagi."],
      ["最終電車に間に合わなかったので、タクシーで帰った。", "Saishuu densha ni ma ni awanakatta node, takushii de kaetta.", "Karena tidak sempat naik kereta terakhir, saya pulang naik taksi."],
    ],
  ],
  // 12. Deskripsi produk
  [
    [
      ["保温", "Hoon", "menjaga suhu panas"],
      ["重さ", "Omosa", "berat"],
      ["使用方法", "Shiyou houhou", "cara penggunaan"],
      ["注意", "Chuui", "perhatian", ["Pada deskripsi produk, 使用方法 berarti...", "cara penggunaan", "harga", "garansi", "bahan"]],
    ],
    [
      ["このかばんは軽くて、雨にも強いです。", "Kono kaban wa karukute, ame ni mo tsuyoi desu.", "Tas ini ringan dan tahan hujan."],
      ["電池は約三十時間使えます。", "Denchi wa yaku sanjuujikan tsukaemasu.", "Baterainya bisa dipakai sekitar tiga puluh jam."],
      ["電子レンジでは使用しないでください。", "Denshi renji de wa shiyou shinaide kudasai.", "Jangan digunakan di microwave.", ["Menurut deskripsi, produk itu tidak boleh dipakai di...", "microwave", "kulkas", "tas", "mobil"]],
      ["子どもの手の届かない所に置いてください。", "Kodomo no te no todokanai tokoro ni oite kudasai.", "Letakkan di tempat yang tidak terjangkau anak-anak."],
    ],
  ],
  // 13. Berita sederhana
  [
    [
      ["オープン", "Oopun", "pembukaan"],
      ["訪れる", "Otozureru", "mengunjungi"],
      ["以上", "Ijou", "lebih dari"],
      ["ということです", "To iu koto desu", "kabarnya", ["Pada berita, ということです berarti...", "kabarnya / dilaporkan bahwa", "saya pikir", "harus", "jangan"]],
    ],
    [
      ["駅の近くに大きな水族館がオープンしました。", "Eki no chikaku ni ooki na suizokukan ga oopun shimashita.", "Akuarium besar dibuka di dekat stasiun."],
      ["週末には三千人以上が訪れました。", "Shuumatsu ni wa sanzennin ijou ga otozuremashita.", "Akhir pekan dikunjungi lebih dari tiga ribu orang."],
      ["一番人気はイルカのショーだということです。", "Ichiban ninki wa iruka no shoo da to iu koto desu.", "Kabarnya yang paling populer adalah pertunjukan lumba-lumba.", ["Menurut berita, yang paling populer adalah...", "pertunjukan lumba-lumba", "restoran", "toko suvenir", "taman bermain"]],
      ["入館料は大人二千円です。", "Nyuukanryou wa otona nisen-en desu.", "Biaya masuk dewasa dua ribu yen."],
    ],
  ],
  // 14. Paragraf opini
  [
    [
      ["意見", "Iken", "pendapat"],
      ["例えば", "Tatoeba", "misalnya"],
      ["つまり", "Tsumari", "dengan kata lain"],
      ["結論", "Ketsuron", "kesimpulan", ["Kata untuk memberi contoh dalam paragraf opini adalah...", "例えば", "つまり", "しかし", "ところで"]],
    ],
    [
      ["私は外国語を早く学ぶほうがいいと思う。", "Watashi wa gaikokugo o hayaku manabu hou ga ii to omou.", "Menurut saya lebih baik belajar bahasa asing sejak dini."],
      ["なぜなら、子どもは音をまねるのが上手だからだ。", "Nazenara, kodomo wa oto o maneru no ga jouzu da kara da.", "Karena anak-anak pandai meniru bunyi."],
      ["例えば、私の妹は三歳で英語の歌を覚えた。", "Tatoeba, watashi no imouto wa sansai de Eigo no uta o oboeta.", "Misalnya, adik saya hafal lagu bahasa Inggris pada umur tiga tahun."],
      ["つまり、早く始めるほど自然に身につくのだ。", "Tsumari, hayaku hajimeru hodo shizen ni mi ni tsuku no da.", "Dengan kata lain, semakin cepat mulai semakin alami dikuasai.", ["Kesimpulan paragraf itu adalah...", "semakin dini belajar semakin alami dikuasai", "anak-anak tidak perlu belajar bahasa", "bahasa Inggris paling sulit", "orang dewasa lebih cepat belajar"]],
    ],
  ],
  // 15. Teks pengalaman
  [
    [
      ["ボランティア", "Borantia", "relawan"],
      ["収穫", "Shuukaku", "panen"],
      ["感謝", "Kansha", "berterima kasih"],
      ["ようになった", "You ni natta", "menjadi (berubah)", ["Teks pengalaman biasanya ditutup dengan...", "refleksi atau perubahan diri", "daftar harga", "pertanyaan", "alamat"]],
    ],
    [
      ["高校生のとき、老人ホームでボランティアをしました。", "Koukousei no toki, roujin hoomu de borantia o shimashita.", "Saat SMA, saya menjadi relawan di panti jompo."],
      ["最初は何を話せばいいかわかりませんでした。", "Saisho wa nani o hanaseba ii ka wakarimasen deshita.", "Awalnya saya tidak tahu harus bicara apa."],
      ["でも、おばあさんたちが昔の話をしてくれました。", "Demo, obaasantachi ga mukashi no hanashi o shite kuremashita.", "Tetapi, para nenek menceritakan kisah masa lalu."],
      ["それから、お年寄りと話すのが好きになりました。", "Sorekara, otoshiyori to hanasu no ga suki ni narimashita.", "Sejak itu, saya jadi suka berbicara dengan orang tua.", ["Menurut teks, perubahan penulis adalah...", "jadi suka berbicara dengan orang tua", "jadi ingin menjadi dokter", "berhenti menjadi relawan", "pindah sekolah"]],
    ],
  ],
  // 16. Petunjuk penggunaan
  [
    [
      ["電源", "Dengen", "daya / sumber listrik"],
      ["画面", "Gamen", "layar"],
      ["入力", "Nyuuryoku", "input / memasukkan"],
      ["完了", "Kanryou", "selesai", ["Urutan petunjuk biasanya memakai...", "まず → 次に → 最後に", "最後に → まず → 次に", "次に → まず", "だから → しかし"]],
    ],
    [
      ["まず、本体に電池を入れてください。", "Mazu, hontai ni denchi o irete kudasai.", "Pertama, masukkan baterai ke badan alat."],
      ["次に、時間を合わせます。", "Tsugi ni, jikan o awasemasu.", "Selanjutnya, atur waktunya."],
      ["画面に「OK」と出たら、ボタンを離してください。", "Gamen ni \"OK\" to detara, botan o hanashite kudasai.", "Kalau di layar muncul 'OK', lepaskan tombolnya."],
      ["最後に、ふたをしっかり閉めてください。", "Saigo ni, futa o shikkari shimete kudasai.", "Terakhir, tutup penutupnya dengan rapat."],
    ],
  ],
  // 17. Teks perbandingan
  [
    [
      ["一方", "Ippou", "sementara itu"],
      ["それに対して", "Sore ni taishite", "sebaliknya"],
      ["それぞれ", "Sorezore", "masing-masing"],
      ["長所", "Chousho", "kelebihan", ["Lawan kata 長所 (kelebihan) adalah...", "短所", "長期", "短期", "所長"]],
    ],
    [
      ["都会は便利だが、家賃が高い。", "Tokai wa benri da ga, yachin ga takai.", "Kota besar praktis, tetapi sewanya mahal."],
      ["一方、田舎は自然が多くて静かだ。", "Ippou, inaka wa shizen ga ookute shizuka da.", "Sementara itu, desa banyak alam dan tenang."],
      ["それに対して、田舎は交通が不便なことが多い。", "Sore ni taishite, inaka wa koutsuu ga fuben na koto ga ooi.", "Sebaliknya, di desa transportasi sering tidak praktis."],
      ["どちらにもそれぞれ長所と短所がある。", "Dochira ni mo sorezore chousho to tansho ga aru.", "Keduanya masing-masing punya kelebihan dan kekurangan.", ["Kesimpulan teks itu adalah...", "keduanya punya kelebihan dan kekurangan", "kota selalu lebih baik", "desa selalu lebih baik", "semua orang harus pindah ke desa"]],
    ],
  ],
  // 18. Kanji N4 dalam kalimat
  [
    [
      ["送る", "Okuru", "mengirim"],
      ["届く", "Todoku", "sampai (kiriman)"],
      ["集める", "Atsumeru", "mengumpulkan"],
      ["動く", "Ugoku", "bergerak", ["Bacaan kanji 借りる adalah...", "kariru", "kasu", "kaeru", "kakeru"]],
    ],
    [
      ["母に誕生日のプレゼントを送りました。", "Haha ni tanjoubi no purezento o okurimashita.", "Saya mengirim hadiah ulang tahun untuk ibu."],
      ["注文した本がまだ届きません。", "Chuumon shita hon ga mada todokimasen.", "Buku yang saya pesan belum sampai."],
      ["子どものころから切手を集めています。", "Kodomo no koro kara kitte o atsumete imasu.", "Sejak kecil saya mengoleksi perangko."],
      ["エレベーターが動かなくなりました。", "Erebeetaa ga ugokanaku narimashita.", "Liftnya tidak bergerak lagi."],
    ],
  ],
  // 19. Campuran kana dan kanji
  [
    [
      ["ホームページ", "Hoomupeeji", "situs web"],
      ["ご覧ください", "Goran kudasai", "silakan lihat"],
      ["手数料", "Tesuuryou", "biaya administrasi"],
      ["クレジットカード", "Kurejitto kaado", "kartu kredit", ["Kata serapan dari bahasa asing biasanya ditulis dengan...", "katakana", "hiragana", "kanji", "romaji"]],
    ],
    [
      ["オンラインで申し込むと、手数料が無料になります。", "Onrain de moushikomu to, tesuuryou ga muryou ni narimasu.", "Kalau mendaftar online, biaya administrasinya gratis."],
      ["メールアドレスを正しく入力してください。", "Meeru adoresu o tadashiku nyuuryoku shite kudasai.", "Masukkan alamat email dengan benar."],
      ["スマートフォンのアプリでポイントが貯まります。", "Sumaatofon no apuri de pointo ga tamarimasu.", "Poin bisa dikumpulkan lewat aplikasi ponsel pintar."],
      ["詳細はパンフレットをご覧ください。", "Shousai wa panfuretto o goran kudasai.", "Untuk detailnya, silakan lihat brosur."],
    ],
  ],
  // 20. Ulasan reading N4
  [
    [
      ["開店", "Kaiten", "toko buka"],
      ["閉店", "Heiten", "toko tutup"],
      ["人気", "Ninki", "populer / popularitas"],
      ["売り切れる", "Urikireru", "habis terjual", ["Lawan kata 開店 adalah...", "閉店", "開始", "出店", "来店"]],
    ],
    [
      ["近所に新しい本屋ができた。", "Kinjo ni atarashii hon-ya ga dekita.", "Toko buku baru dibuka di dekat rumah."],
      ["店の中にカフェがあって、本を読みながらコーヒーが飲める。", "Mise no naka ni kafe ga atte, hon o yominagara koohii ga nomeru.", "Di dalam toko ada kafe, jadi bisa minum kopi sambil membaca buku."],
      ["閉店は夜十時なので、仕事の後でも寄れる。", "Heiten wa yoru juuji na node, shigoto no ato demo yoreru.", "Tutup pukul sepuluh malam, jadi bisa mampir setelah kerja.", ["Menurut teks, toko tutup pukul...", "22.00", "20.00", "18.00", "24.00"]],
      ["週末はいつも人が多くて、席がなかなか空かない。", "Shuumatsu wa itsumo hito ga ookute, seki ga nakanaka akanai.", "Akhir pekan selalu ramai, kursinya susah kosong."],
    ],
  ],
];
