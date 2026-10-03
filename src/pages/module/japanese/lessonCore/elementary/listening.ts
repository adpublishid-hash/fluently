import type { LessonCoreTuple } from '../types';

// Listening N4 — one entry per lesson (index = lesson - 1).
export const listening: LessonCoreTuple[] = [
  ['Permintaan bentuk て', ['Dengarkan kata kerja sebelum ください/くれる: itulah yang diminta.', 'Bedakan 〜てください (tolong) dan 〜ないでください (jangan).'], [
    ['この箱を棚の上に置いてくれる？', 'Kono hako o tana no ue ni oite kureru?', 'Bisa taruh kotak ini di atas rak?'],
    ['ドアを閉めないでください。', 'Doa o shimenaide kudasai.', 'Tolong jangan tutup pintunya.'],
    ['この紙をコピーしてもらえますか。', 'Kono kami o kopii shite moraemasu ka.', 'Bisakah kertas ini difotokopi?'],
    ['終わったら、机を元に戻してください。', 'Owattara, tsukue o moto ni modoshite kudasai.', 'Setelah selesai, kembalikan meja ke tempat semula.'],
  ]],
  ['Detail di stasiun', ['Tangkap detail: jalur, jam, nomor gerbong (〜号車), dan perubahan.', 'Kata kunci: 遅れ (keterlambatan), 運転見合わせ (perjalanan dihentikan).'], [
    ['事故のため、電車が十分ほど遅れております。', 'Jiko no tame, densha ga juppun hodo okurete orimasu.', 'Karena kecelakaan, kereta terlambat sekitar sepuluh menit.'],
    ['指定席は五号車から八号車です。', 'Shiteiseki wa gogousha kara hachigousha desu.', 'Kursi reservasi di gerbong lima sampai delapan.'],
    ['この電車は次の駅で特急の待ち合わせをします。', 'Kono densha wa tsugi no eki de tokkyuu no machiawase o shimasu.', 'Kereta ini menunggu kereta ekspres di stasiun berikutnya.'],
    ['お忘れ物のないようご注意ください。', 'Owasuremono no nai you gochuui kudasai.', 'Harap periksa agar tidak ada barang tertinggal.'],
  ]],
  ['Cuaca dan rencana', ['Dengarkan bagaimana cuaca mengubah rencana: 〜たら, 〜ので, 〜かもしれない.', 'Catat rencana A dan rencana cadangan.'], [
    ['台風が来るので、明日のキャンプは中止です。', 'Taifuu ga kuru node, ashita no kyanpu wa chuushi desu.', 'Karena topan datang, kemah besok dibatalkan.'],
    ['晴れたら、海に行こう。', 'Haretara, umi ni ikou.', 'Kalau cerah, ayo ke laut.'],
    ['雨だったら、映画館に行きましょう。', 'Ame dattara, eigakan ni ikimashou.', 'Kalau hujan, mari ke bioskop.'],
    ['夕方から風が強くなるそうです。', 'Yuugata kara kaze ga tsuyoku naru sou desu.', 'Katanya angin akan kencang mulai sore.'],
  ]],
  ['Dialog dengan dokter', ['Dengarkan instruksi dokter: dosis, kapan minum obat, dan larangan.', '食後 = setelah makan, 食前 = sebelum makan.'], [
    ['風邪ですね。三日分の薬を出しておきます。', 'Kaze desu ne. Mikkabun no kusuri o dashite okimasu.', 'Ini flu. Saya berikan obat untuk tiga hari.'],
    ['毎食後に一錠ずつ飲んでください。', 'Maishokugo ni ichijou zutsu nonde kudasai.', 'Minum satu tablet setiap selesai makan.'],
    ['今日はお風呂に入らないでください。', 'Kyou wa ofuro ni hairanaide kudasai.', 'Hari ini jangan berendam.'],
    ['熱が下がらなかったら、また来てください。', 'Netsu ga sagaranakattara, mata kite kudasai.', 'Kalau demam tidak turun, datang lagi.'],
  ]],
  ['Pengumuman sekolah', ['Dengarkan apa yang harus dibawa dan tenggat waktunya.', 'Kata kunci: 提出 (pengumpulan), 締め切り (tenggat), 必ず (pasti/harus).'], [
    ['明日の体育は体育館で行います。', 'Ashita no taiiku wa taiikukan de okonaimasu.', 'Pelajaran olahraga besok diadakan di aula olahraga.'],
    ['申込書は金曜日までに担任の先生に提出してください。', 'Moushikomisho wa kinyoubi made ni tannin no sensei ni teishutsu shite kudasai.', 'Serahkan formulir pendaftaran kepada wali kelas paling lambat Jumat.'],
    ['必ず保護者のサインをもらってください。', 'Kanarazu hogosha no sain o moratte kudasai.', 'Pastikan mendapat tanda tangan orang tua.'],
    ['締め切りを過ぎると、参加できません。', 'Shimekiri o sugiru to, sanka dekimasen.', 'Kalau lewat tenggat, tidak bisa ikut.'],
  ]],
  ['Shift kerja', ['Dengarkan siapa bekerja kapan dan perubahan shift.', 'Kata kunci: 早番 (shift pagi), 遅番 (shift malam), 休憩 (istirahat).'], [
    ['明日は早番だから、七時に来てね。', 'Ashita wa hayaban da kara, shichiji ni kite ne.', 'Besok shift pagi, jadi datang jam tujuh, ya.'],
    ['休憩は一時間です。', 'Kyuukei wa ichijikan desu.', 'Istirahatnya satu jam.'],
    ['佐藤さんの代わりに、遅番に入ってもらえる？', 'Satou san no kawari ni, osoban ni haitte moraeru?', 'Bisa masuk shift malam menggantikan Sato?'],
    ['レジが混んだら、手伝ってください。', 'Reji ga kondara, tetsudatte kudasai.', 'Kalau kasir ramai, tolong bantu.'],
  ]],
  ['Masalah saat perjalanan', ['Dengarkan masalah dan solusi yang ditawarkan.', 'Kata kunci: 払い戻し (pengembalian uang), 振替 (pengalihan), 欠航 (penerbangan dibatalkan).'], [
    ['大雪のため、午後の便は欠航になりました。', 'Ooyuki no tame, gogo no bin wa kekkou ni narimashita.', 'Karena salju lebat, penerbangan sore dibatalkan.'],
    ['明日の朝の便に振り替えることができます。', 'Ashita no asa no bin ni furikaeru koto ga dekimasu.', 'Bisa dialihkan ke penerbangan besok pagi.'],
    ['ホテル代は航空会社が払います。', 'Hoterudai wa koukuu gaisha ga haraimasu.', 'Biaya hotel ditanggung maskapai.'],
    ['チケットの払い戻しもできますよ。', 'Chiketto no haraimodoshi mo dekimasu yo.', 'Tiket juga bisa dikembalikan uangnya.'],
  ]],
  ['Aturan rumah', ['Dengarkan aturan rumah/asrama dan alasannya.', 'Pola aturan: 〜ことになっている, 〜てはだめ, 〜なきゃいけない.'], [
    ['ゴミは分けて出さなきゃいけないよ。', 'Gomi wa wakete dasanakya ikenai yo.', 'Sampah harus dibuang terpisah, lho.'],
    ['夜十一時に玄関の鍵を閉めることになっています。', 'Yoru juuichiji ni genkan no kagi o shimeru koto ni natte imasu.', 'Pintu depan dikunci jam sebelas malam.'],
    ['友達を泊めるのはだめです。', 'Tomodachi o tomeru no wa dame desu.', 'Tidak boleh mengajak teman menginap.'],
    ['洗濯機は九時までに使ってね。', 'Sentakki wa kuji made ni tsukatte ne.', 'Pakai mesin cuci sebelum jam sembilan, ya.'],
  ]],
  ['Membandingkan barang', ['Dengarkan perbandingan: AよりBのほうが, 一番, それほど〜ない.', 'Tentukan barang mana yang akhirnya dibeli.'], [
    ['こっちのほうが安いけど、少し重いね。', 'Kocchi no hou ga yasui kedo, sukoshi omoi ne.', 'Yang ini lebih murah, tapi agak berat, ya.'],
    ['あっちはこれより五千円高いです。', 'Acchi wa kore yori gosen en takai desu.', 'Yang itu lima ribu yen lebih mahal dari ini.'],
    ['色はそれほど気にしません。', 'Iro wa sorehodo ki ni shimasen.', 'Saya tidak terlalu peduli soal warna.'],
    ['じゃ、軽いほうにします。', 'Ja, karui hou ni shimasu.', 'Kalau begitu, saya pilih yang ringan.'],
  ]],
  ['Reservasi restoran', ['Dengarkan tanggal, jam, jumlah orang, dan permintaan khusus.', 'Kata kunci: 予約 (reservasi), 個室 (ruang privat), 満席 (penuh).'], [
    ['土曜日の七時に四人で予約したいんですが。', 'Doyoubi no shichiji ni yonin de yoyaku shitain desu ga.', 'Saya ingin memesan untuk empat orang hari Sabtu jam tujuh.'],
    ['申し訳ございません。七時は満席です。', 'Moushiwake gozaimasen. Shichiji wa manseki desu.', 'Mohon maaf. Jam tujuh sudah penuh.'],
    ['八時でしたら、個室が空いております。', 'Hachiji deshitara, koshitsu ga aite orimasu.', 'Kalau jam delapan, ruang privat masih kosong.'],
    ['じゃ、八時でお願いします。', 'Ja, hachiji de onegai shimasu.', 'Kalau begitu, jam delapan saja.'],
  ]],
  ['Pesan telepon', ['Catat: siapa, maksud, permintaan, dan nomor yang harus dihubungi.', 'Pesan suara memakai bahasa sopan: 〜いただけますか.'], [
    ['もしもし、ABC旅行の中村です。', 'Moshimoshi, ee bii shii ryokou no Nakamura desu.', 'Halo, ini Nakamura dari ABC Travel.'],
    ['ご予約のホテルが変更になりました。', 'Goyoyaku no hoteru ga henkou ni narimashita.', 'Hotel yang Anda pesan mengalami perubahan.'],
    ['お手数ですが、折り返しお電話いただけますか。', 'Otesuu desu ga, orikaeshi odenwa itadakemasu ka.', 'Mohon maaf merepotkan, bisakah Anda menelepon balik?'],
    ['番号は〇三の五五五五の一二一二です。', 'Bangou wa zero san no go go go go no ichi ni ichi ni desu.', 'Nomornya 03-5555-1212.'],
  ]],
  ['Informasi acara', ['Dengarkan nama acara, tanggal, syarat ikut, dan biaya.', 'Kata kunci: 参加費 (biaya), 申し込み (pendaftaran), 定員 (kuota).'], [
    ['料理教室は毎月第二土曜日です。', 'Ryouri kyoushitsu wa maitsuki daini doyoubi desu.', 'Kelas memasak diadakan setiap Sabtu kedua tiap bulan.'],
    ['参加費は材料費込みで千円です。', 'Sankahi wa zairyouhi komi de sen en desu.', 'Biayanya seribu yen termasuk bahan.'],
    ['定員は十五人です。', 'Teiin wa juugonin desu.', 'Kuotanya lima belas orang.'],
    ['申し込みはメールでお願いします。', 'Moushikomi wa meeru de onegai shimasu.', 'Pendaftaran melalui email.'],
  ]],
  ['Cerita pengalaman', ['Dengarkan urutan kejadian dan perasaan pembicara.', 'Penanda urutan: 最初は, そのあと, 結局.'], [
    ['最初は日本の生活に慣れなくて、大変でした。', 'Saisho wa Nihon no seikatsu ni narenakute, taihen deshita.', 'Awalnya saya belum terbiasa dengan kehidupan di Jepang, jadi berat.'],
    ['そのあと、近所の人が色々教えてくれました。', 'Sono ato, kinjo no hito ga iroiro oshiete kuremashita.', 'Setelah itu, tetangga mengajari saya banyak hal.'],
    ['結局、一年で友達がたくさんできました。', 'Kekkyoku, ichinen de tomodachi ga takusan dekimashita.', 'Akhirnya, dalam setahun saya punya banyak teman.'],
    ['今では日本が第二のふるさとです。', 'Ima de wa Nihon ga daini no furusato desu.', 'Sekarang Jepang adalah kampung halaman kedua saya.'],
  ]],
  ['Dialog memberi saran', ['Dengarkan masalah, saran, dan apakah saran diterima.', 'Saran: 〜たら？, 〜たほうがいいよ; tanggapan: そうしてみる.'], [
    ['最近、太っちゃって…。', 'Saikin, futocchatte...', 'Akhir-akhir ini saya jadi gemuk…'],
    ['エレベーターじゃなくて、階段を使ったら？', 'Erebeetaa ja nakute, kaidan o tsukattara?', 'Bagaimana kalau pakai tangga, bukan lift?'],
    ['甘い物を少し減らしたほうがいいよ。', 'Amai mono o sukoshi herashita hou ga ii yo.', 'Sebaiknya kurangi sedikit makanan manis.'],
    ['そうだね。明日からそうしてみる。', 'Sou da ne. Ashita kara sou shite miru.', 'Benar juga. Mulai besok akan kucoba.'],
  ]],
  ['Dialog meminta izin', ['Dengarkan apakah izin diberikan, ditolak, atau diberi syarat.', 'Izin bersyarat: 〜なら、いいですよ.'], [
    ['先生、トイレに行ってもいいですか。', 'Sensei, toire ni itte mo ii desu ka.', 'Pak/Bu guru, bolehkah saya ke toilet?'],
    ['この資料を家に持って帰ってもいいですか。', 'Kono shiryou o ie ni motte kaette mo ii desu ka.', 'Bolehkah materi ini saya bawa pulang?'],
    ['コピーなら、持って帰ってもいいですよ。', 'Kopii nara, motte kaette mo ii desu yo.', 'Kalau fotokopinya, boleh dibawa pulang.'],
    ['原本は持ち出さないでください。', 'Genpon wa mochidasanaide kudasai.', 'Dokumen aslinya jangan dibawa keluar.'],
  ]],
  ['Perubahan jadwal', ['Dengarkan jadwal lama dan jadwal baru; catat keduanya.', 'Kata kunci: 変更 (perubahan), 延期 (penundaan), 繰り上げ (dimajukan).'], [
    ['明日の会議は午後二時に変更になりました。', 'Ashita no kaigi wa gogo niji ni henkou ni narimashita.', 'Rapat besok diubah ke jam dua siang.'],
    ['雨のため、運動会は来週に延期します。', 'Ame no tame, undoukai wa raishuu ni enki shimasu.', 'Karena hujan, pesta olahraga ditunda ke minggu depan.'],
    ['授業が三十分早く始まります。', 'Jugyou ga sanjuppun hayaku hajimarimasu.', 'Pelajaran dimulai tiga puluh menit lebih awal.'],
    ['場所は変わりません。', 'Basho wa kawarimasen.', 'Tempatnya tidak berubah.'],
  ]],
  ['Berita sederhana', ['Berita: siapa/apa, kapan, di mana, apa yang terjadi.', 'Bahasa berita memakai bentuk formal: 〜ました, 〜そうです.'], [
    ['昨日、東京で桜が咲き始めました。', 'Kinou, Toukyou de sakura ga sakihajimemashita.', 'Kemarin bunga sakura mulai mekar di Tokyo.'],
    ['去年より五日早いそうです。', 'Kyonen yori itsuka hayai sou desu.', 'Katanya lima hari lebih awal dari tahun lalu.'],
    ['週末は花見の客で公園が混むでしょう。', 'Shuumatsu wa hanami no kyaku de kouen ga komu deshou.', 'Akhir pekan taman mungkin ramai pengunjung hanami.'],
    ['見ごろは来週の水曜日ごろです。', 'Migoro wa raishuu no suiyoubi goro desu.', 'Puncak mekarnya sekitar Rabu minggu depan.'],
  ]],
  ['Pengumuman radio', ['Pengumuman radio cepat: tangkap kata kunci dulu, detail kemudian.', 'Kata kunci: 交通情報 (info lalu lintas), 渋滞 (macet), 通行止め (jalan ditutup).'], [
    ['交通情報です。', 'Koutsuu jouhou desu.', 'Informasi lalu lintas.'],
    ['高速道路で十キロの渋滞が起きています。', 'Kousoku douro de jukkiro no juutai ga okite imasu.', 'Terjadi kemacetan sepanjang sepuluh kilometer di jalan tol.'],
    ['工事のため、駅前の道は通行止めです。', 'Kouji no tame, ekimae no michi wa tsuukoudome desu.', 'Karena konstruksi, jalan depan stasiun ditutup.'],
    ['お出かけの際はご注意ください。', 'Odekake no sai wa gochuui kudasai.', 'Harap berhati-hati saat bepergian.'],
  ]],
  ['Menyimpulkan maksud percakapan', ['Maksud sering tersirat: ちょっと… = penolakan, いいね = setuju.', 'Simpulkan apa yang akan dilakukan pembicara selanjutnya.'], [
    ['この服、どう？', 'Kono fuku, dou?', 'Baju ini bagaimana?'],
    ['うーん、色はいいけど、ちょっと…。', 'Uun, iro wa ii kedo, chotto...', 'Hmm, warnanya bagus, tapi agak…'],
    ['じゃ、ほかのも見てみる。', 'Ja, hoka no mo mite miru.', 'Kalau begitu, aku lihat yang lain juga.'],
    ['あ、それならあっちの店のほうがいいかも。', 'A, sore nara acchi no mise no hou ga ii kamo.', 'Oh, kalau begitu mungkin toko di sana lebih bagus.'],
  ]],
  ['Ulasan listening N4', ['Latih tiga lapis: gist, detail angka/waktu, dan maksud tersirat.', 'Perhatikan bentuk biasa dalam percakapan santai.'], [
    ['ごめん、ちょっと遅れる。先に入ってて。', 'Gomen, chotto okureru. Saki ni haittete.', 'Maaf, aku agak telat. Masuk duluan saja.'],
    ['チケットは私が二枚買っておくね。', 'Chiketto wa watashi ga nimai katte oku ne.', 'Tiketnya aku belikan dua lembar dulu, ya.'],
    ['映画が始まるまであと十五分だよ。', 'Eiga ga hajimaru made ato juugofun da yo.', 'Lima belas menit lagi filmnya mulai.'],
    ['ポップコーンも買っといて。', 'Poppukoon mo kattoite.', 'Belikan popcorn juga, ya.'],
  ]],
];
