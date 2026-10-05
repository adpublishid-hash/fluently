import type { JapaneseQuizTopic } from '../types';

// Latihan Pronunciation N3 — one entry per topic (index = topic - 1): [Basic, Advanced].
export const pronunciation: JapaneseQuizTopic[] = [
  // 1. Kecepatan alami
  [
    [
      ["行きます", "Ikimasu", "pergi (u akhir melemah)"],
      ["です", "Desu", "adalah (u akhir melemah)"],
      ["下さい", "Kudasai", "tolong (u melemah)"],
      ["近く", "Chikaku", "dekat (i melemah)", ["Pada kecepatan alami, vokal yang sering melemah adalah...", "i dan u di antara konsonan tak bersuara", "a dan o", "e saja", "semua vokal"]],
    ],
    [
      ["すみません、ちょっと通してください。", "Sumimasen, chotto tooshite kudasai.", "Permisi, tolong beri jalan sebentar."],
      ["駅の近くに住んでいます。", "Eki no chikaku ni sunde imasu.", "Saya tinggal di dekat stasiun."],
      ["明日は九時に出発します。", "Ashita wa kuji ni shuppatsu shimasu.", "Besok berangkat pukul sembilan."],
      ["来週の会議、資料をお願いします。", "Raishuu no kaigi, shiryou o onegaishimasu.", "Untuk rapat minggu depan, mohon materinya."],
    ],
  ],
  // 2. Pitch accent N3
  [
    [
      ["雨と飴", "Ame to ame", "hujan dan permen (nada berbeda)"],
      ["橋を渡る", "Hashi o wataru", "menyeberangi jembatan"],
      ["箸で食べる", "Hashi de taberu", "makan dengan sumpit"],
      ["花と鼻", "Hana to hana", "bunga dan hidung (nada berbeda)", ["Kata 雨 dan 飴 dibedakan oleh...", "tinggi-rendah nada", "panjang vokal", "konsonan ganda", "jumlah mora"]],
    ],
    [
      ["雨の日は飴をなめながら本を読む。", "Ame no hi wa ame o namenagara hon o yomu.", "Saat hari hujan saya membaca buku sambil mengulum permen."],
      ["この橋の端で写真を撮りましょう。", "Kono hashi no hashi de shashin o torimashou.", "Mari berfoto di ujung jembatan ini."],
      ["庭の花のにおいを鼻で感じる。", "Niwa no hana no nioi o hana de kanjiru.", "Mencium aroma bunga di halaman dengan hidung."],
      ["紙に神社の名前を書いてください。", "Kami ni jinja no namae o kaite kudasai.", "Tolong tulis nama kuil di kertas."],
    ],
  ],
  // 3. Pengelompokan kalimat
  [
    [
      ["去年の夏に", "Kyonen no natsu ni", "pada musim panas tahun lalu"],
      ["駅前の", "Ekimae no", "di depan stasiun"],
      ["早く終わった日は", "Hayaku owatta hi wa", "pada hari yang selesai cepat"],
      ["勧められた本を", "Susumerareta hon o", "buku yang direkomendasikan", ["Satu kelompok makna biasanya diucapkan dengan...", "satu kurva nada: naik di awal, turun bertahap", "nada datar", "nada naik terus", "tanpa jeda"]],
    ],
    [
      ["週末に、友達と、新しくできた水族館へ行きました。", "Shuumatsu ni, tomodachi to, atarashiku dekita suizokukan e ikimashita.", "Akhir pekan, bersama teman, saya pergi ke akuarium yang baru dibuka."],
      ["雨が降りそうなので、傘を持っていったほうがいいですよ。", "Ame ga furisou na node, kasa o motte itta hou ga ii desu yo.", "Karena sepertinya akan hujan, sebaiknya membawa payung."],
      ["子どものころによく遊んだ公園が、なくなってしまいました。", "Kodomo no koro ni yoku asonda kouen ga, nakunatte shimaimashita.", "Taman tempat saya sering bermain waktu kecil sudah tidak ada."],
      ["来月から、毎朝三十分早く家を出ることにしました。", "Raigetsu kara, maiasa sanjuppun hayaku ie o deru koto ni shimashita.", "Mulai bulan depan, saya memutuskan keluar rumah tiga puluh menit lebih awal setiap pagi."],
    ],
  ],
  // 4. Penanda wacana
  [
    [
      ["えっと", "Etto", "hmm (sedang berpikir)"],
      ["ちなみに", "Chinami ni", "ngomong-ngomong / sebagai info"],
      ["あのう", "Anou", "anu (ragu memulai)"],
      ["なんか", "Nanka", "semacam / rasanya (lisan)", ["Penanda wacana sebaiknya diucapkan dengan...", "jeda singkat setelahnya", "suara sangat keras", "tanpa jeda", "nada marah"]],
    ],
    [
      ["えっと、駅からどう行けばいいんでしたっけ。", "Etto, eki kara dou ikeba ii n deshita kke.", "Hmm, dari stasiun lewat mana ya tadi?"],
      ["ちなみに、この店は日曜日が休みです。", "Chinami ni, kono mise wa nichiyoubi ga yasumi desu.", "Sebagai info, toko ini libur hari Minggu."],
      ["あのう、ちょっとお聞きしたいんですが。", "Anou, chotto okiki shitai n desu ga.", "Anu, saya ingin bertanya sedikit."],
      ["なんか、今日は元気がないね。", "Nanka, kyou wa genki ga nai ne.", "Rasanya hari ini kamu kurang bersemangat, ya."],
    ],
  ],
  // 5. Ritme bicara formal
  [
    [
      ["始めさせていただきます", "Hajimesasete itadakimasu", "izinkan saya memulai"],
      ["お手元", "Otemoto", "yang ada di tangan Anda"],
      ["お受けいたします", "Ouke itashimasu", "kami terima"],
      ["以上で", "Ijou de", "demikian / dengan ini", ["Bicara formal sebaiknya...", "tempo stabil dan tanpa penyingkatan", "cepat dan banyak singkatan", "memakai bahasa gaul", "nada naik-turun drastis"]],
    ],
    [
      ["それでは、説明会を始めさせていただきます。", "Soredewa, setsumeikai o hajimesasete itadakimasu.", "Baiklah, izinkan saya memulai sesi penjelasan."],
      ["お手元のパンフレットの三ページをご覧ください。", "Otemoto no panfuretto no sanpeeji o goran kudasai.", "Silakan lihat halaman tiga brosur di tangan Anda."],
      ["休憩は十分間とさせていただきます。", "Kyuukei wa juppunkan to sasete itadakimasu.", "Istirahatnya kami tetapkan sepuluh menit."],
      ["以上で本日の説明を終わります。", "Ijou de honjitsu no setsumei o owarimasu.", "Dengan ini penjelasan hari ini kami akhiri."],
    ],
  ],
  // 6. Shadowing berita
  [
    [
      ["きょう午前", "Kyou gozen", "pagi ini"],
      ["全焼", "Zenshou", "habis terbakar"],
      ["とのことです", "To no koto desu", "kabarnya / dilaporkan"],
      ["調べています", "Shirabete imasu", "sedang menyelidiki", ["Bahasa berita biasanya diucapkan dengan...", "tempo cepat dan nada datar", "nada sangat ekspresif", "bahasa gaul", "jeda di setiap kata"]],
    ],
    [
      ["きのう夜、大阪市内で交通事故がありました。", "Kinou yoru, Oosaka shinai de koutsuu jiko ga arimashita.", "Kemarin malam terjadi kecelakaan lalu lintas di Kota Osaka."],
      ["この事故で、男性一人が軽いけがをしました。", "Kono jiko de, dansei hitori ga karui kega o shimashita.", "Akibat kecelakaan ini, seorang pria luka ringan."],
      ["現場は見通しのいい交差点だということです。", "Genba wa mitooshi no ii kousaten da to iu koto desu.", "Dilaporkan lokasinya perempatan dengan jarak pandang yang baik."],
      ["警察が当時の状況を詳しく調べています。", "Keisatsu ga touji no joukyou o kuwashiku shirabete imasu.", "Polisi sedang menyelidiki situasi saat itu secara rinci."],
    ],
  ],
  // 7. Jeda dalam presentasi
  [
    [
      ["では", "De wa", "baiklah / lalu"],
      ["なぜでしょうか", "Naze deshou ka", "mengapa demikian?"],
      ["答えは", "Kotae wa", "jawabannya adalah"],
      ["ポイント", "Pointo", "poin", ["Jeda 1–2 detik sebelum poin penting berfungsi untuk...", "membuat audiens fokus", "menghabiskan waktu", "menunjukkan lupa", "mengakhiri presentasi"]],
    ],
    [
      ["では、なぜ若者は新聞を読まないのでしょうか。", "De wa, naze wakamono wa shinbun o yomanai no deshou ka.", "Lalu, mengapa anak muda tidak membaca koran?"],
      ["答えは、スマートフォンにあります。", "Kotae wa, sumaatofon ni arimasu.", "Jawabannya ada pada ponsel pintar."],
      ["つまり、情報の入り口が、変わったのです。", "Tsumari, jouhou no iriguchi ga, kawatta no desu.", "Artinya, pintu masuk informasi telah berubah."],
      ["これが、本日の結論です。", "Kore ga, honjitsu no ketsuron desu.", "Inilah kesimpulan hari ini."],
    ],
  ],
  // 8. Frasa perbaikan
  [
    [
      ["いや", "Iya", "eh, bukan (koreksi)"],
      ["じゃなくて", "Ja nakute", "bukan ..., melainkan"],
      ["言い直します", "Iinaoshimasu", "saya ulangi (dengan benar)"],
      ["正確に言うと", "Seikaku ni iu to", "tepatnya", ["Saat salah bicara dalam situasi formal, kamu bilang...", "失礼しました。言い直します。", "まあいいや。", "知らない。", "やめた。"]],
    ],
    [
      ["集合は八時、いや、八時半です。", "Shuugou wa hachiji, iya, hachiji han desu.", "Berkumpul pukul delapan, eh, setengah sembilan."],
      ["火曜日じゃなくて、木曜日に変更になりました。", "Kayoubi ja nakute, mokuyoubi ni henkou ni narimashita.", "Bukan Selasa, sudah diubah menjadi Kamis."],
      ["正確に言うと、参加者は百二十三人でした。", "Seikaku ni iu to, sankasha wa hyaku nijuusannin deshita.", "Tepatnya, pesertanya seratus dua puluh tiga orang."],
      ["すみません、今の数字は間違いです。言い直します。", "Sumimasen, ima no suuji wa machigai desu. Iinaoshimasu.", "Maaf, angka barusan salah. Saya ulangi."],
    ],
  ],
  // 9. Menyatakan tidak setuju dengan lembut
  [
    [
      ["そうですね…", "Sou desu ne...", "benar juga... (ragu)"],
      ["分かるんですけど", "Wakaru n desu kedo", "saya paham, tapi..."],
      ["かなと思いまして", "Ka na to omoimashite", "saya pikir mungkin..."],
      ["検討させていただけますか", "Kentou sasete itadakemasu ka", "bolehkah kami pertimbangkan dulu?", ["Untuk tidak setuju dengan lembut, sebaiknya...", "turunkan volume dan perpanjang akhiran", "berbicara sangat keras", "langsung bilang 'salah'", "diam saja"]],
    ],
    [
      ["おっしゃることは分かるんですけど、予算が少し…。", "Ossharu koto wa wakaru n desu kedo, yosan ga sukoshi...", "Saya paham maksud Anda, tapi anggarannya agak..."],
      ["別のやり方もあるかなと思いまして。", "Betsu no yarikata mo aru ka na to omoimashite.", "Saya pikir mungkin ada cara lain juga."],
      ["そうですね…今回は少し難しいかもしれません。", "Sou desu ne... konkai wa sukoshi muzukashii kamoshiremasen.", "Benar juga... kali ini mungkin agak sulit."],
      ["社内で一度、検討させていただけますか。", "Shanai de ichido, kentou sasete itadakemasu ka.", "Bolehkah kami pertimbangkan dulu di internal?"],
    ],
  ],
  // 10. Penekanan
  [
    [
      ["絶対に", "Zettai ni", "sama sekali / pasti"],
      ["必ず", "Kanarazu", "pasti / wajib"],
      ["本当に", "Hontou ni", "sungguh"],
      ["ではなく", "De wa naku", "bukan ..., melainkan", ["Kata kunci yang ditekankan sebaiknya diucapkan...", "dengan nada lebih tinggi dan sedikit lebih lambat", "lebih cepat", "sangat pelan", "tanpa suara"]],
    ],
    [
      ["パスワードは絶対に他の人に教えないでください。", "Pasuwaado wa zettai ni hoka no hito ni oshienaide kudasai.", "Jangan sekali-kali memberitahukan kata sandi kepada orang lain."],
      ["提出は必ず金曜日までにお願いします。", "Teishutsu wa kanarazu kinyoubi made ni onegaishimasu.", "Pengumpulan wajib paling lambat hari Jumat."],
      ["皆さんの協力に、本当に感謝しています。", "Minasan no kyouryoku ni, hontou ni kansha shite imasu.", "Saya sungguh berterima kasih atas kerja sama semuanya."],
      ["大切なのはスピードではなく、正確さです。", "Taisetsu na no wa supiido de wa naku, seikakusa desu.", "Yang penting bukan kecepatan, melainkan ketepatan."],
    ],
  ],
  // 11. Kata majemuk kanji
  [
    [
      ["国際会議", "Kokusai kaigi", "konferensi internasional"],
      ["地球温暖化", "Chikyuu ondanka", "pemanasan global"],
      ["少子高齢化", "Shoushi koureika", "penurunan angka kelahiran dan penuaan penduduk"],
      ["人工知能", "Jinkou chinou", "kecerdasan buatan", ["Kata majemuk kanji panjang sebaiknya diucapkan...", "sebagai satu unit dengan satu puncak nada", "dengan jeda di setiap kanji", "dengan nada naik terus", "sangat cepat tanpa nada"]],
    ],
    [
      ["地球温暖化は世界全体の問題だ。", "Chikyuu ondanka wa sekai zentai no mondai da.", "Pemanasan global adalah masalah seluruh dunia."],
      ["日本では少子高齢化が急速に進んでいる。", "Nihon de wa shoushi koureika ga kyuusoku ni susunde iru.", "Di Jepang, penurunan angka kelahiran dan penuaan penduduk berlangsung pesat."],
      ["人工知能の発達で、仕事のやり方が変わってきた。", "Jinkou chinou no hattatsu de, shigoto no yarikata ga kawatte kita.", "Dengan perkembangan kecerdasan buatan, cara kerja mulai berubah."],
      ["来月、東京で国際会議が開かれる。", "Raigetsu, Toukyou de kokusai kaigi ga hirakareru.", "Bulan depan diadakan konferensi internasional di Tokyo."],
    ],
  ],
  // 12. Ritme adverbia
  [
    [
      ["しっかり", "Shikkari", "dengan sungguh-sungguh / kuat"],
      ["さっぱり", "Sappari", "segar / sama sekali (tidak)"],
      ["びっくり", "Bikkuri", "terkejut"],
      ["のんびり", "Nonbiri", "santai", ["Adverbia seperti はっきり punya ritme...", "dua ketukan ganda dengan jeda っ", "satu ketukan", "tanpa ritme", "lima ketukan acak"]],
    ],
    [
      ["朝ご飯はしっかり食べたほうがいい。", "Asagohan wa shikkari tabeta hou ga ii.", "Sebaiknya sarapan dengan cukup."],
      ["説明を聞いても、さっぱり分からなかった。", "Setsumei o kiite mo, sappari wakaranakatta.", "Meskipun mendengar penjelasannya, saya sama sekali tidak mengerti."],
      ["急に名前を呼ばれて、びっくりした。", "Kyuu ni namae o yobarete, bikkuri shita.", "Saya terkejut tiba-tiba nama saya dipanggil."],
      ["休みの日は、家でのんびり過ごしたい。", "Yasumi no hi wa, ie de nonbiri sugoshitai.", "Di hari libur, saya ingin bersantai di rumah."],
    ],
  ],
  // 13. Pelafalan keigo
  [
    [
      ["お呼びいたします", "Oyobi itashimasu", "akan saya panggilkan"],
      ["頂戴する", "Choudai suru", "menerima (merendah)"],
      ["お召し上がり", "Omeshiagari", "makan (hormat)"],
      ["お越し", "Okoshi", "kedatangan (hormat)", ["Keigo yang panjang sebaiknya diucapkan dengan...", "ritme stabil tanpa tersendat", "dipercepat sekali", "dipotong-potong", "nada marah"]],
    ],
    [
      ["少々お待ちください。ただいま確認してまいります。", "Shoushou omachi kudasai. Tadaima kakunin shite mairimasu.", "Mohon tunggu sebentar. Saya akan memeriksanya sekarang."],
      ["お電話番号を頂戴してもよろしいでしょうか。", "Odenwa bangou o choudai shite mo yoroshii deshou ka.", "Bolehkah saya meminta nomor telepon Anda?"],
      ["お飲み物は何になさいますか。", "Onomimono wa nani ni nasaimasu ka.", "Minumannya mau pilih apa?"],
      ["本日はお越しいただき、ありがとうございました。", "Honjitsu wa okoshi itadaki, arigatou gozaimashita.", "Terima kasih atas kedatangan Anda hari ini."],
    ],
  ],
  // 14. Meniru ucapan cepat
  [
    [
      ["そりゃ", "Sorya", "itu sih (singkatan それは)"],
      ["やっとく", "Yattoku", "kukerjakan dulu (singkatan やっておく)"],
      ["んだもん", "N da mon", "habisnya... (alasan manja)"],
      ["じゃない？", "Ja nai?", "bukankah...? (lisan)", ["Bentuk cepat dari それは adalah...", "そりゃ", "そっか", "それっ", "そら"]],
    ],
    [
      ["そりゃ、怒るのも無理ないよ。", "Sorya, okoru no mo muri nai yo.", "Wajar sih kalau marah."],
      ["掃除、私がやっとくね。", "Souji, watashi ga yattoku ne.", "Bersih-bersihnya aku kerjakan dulu, ya."],
      ["だって、誰も教えてくれなかったんだもん。", "Datte, dare mo oshiete kurenakatta n da mon.", "Habisnya tidak ada yang memberitahuku."],
      ["それ、ちょっと高すぎるんじゃない？", "Sore, chotto takasugiru n ja nai?", "Bukankah itu agak terlalu mahal?"],
    ],
  ],
  // 15. Pola intonasi
  [
    [
      ["本当？", "Hontou?", "benarkah? (nada naik)"],
      ["本当。", "Hontou.", "benar. (nada turun)"],
      ["へえー", "Hee", "wah... (kagum, panjang)"],
      ["別に", "Betsu ni", "tidak juga / terserah", ["Intonasi naik di akhir biasanya menunjukkan...", "pertanyaan atau keheranan", "kesimpulan", "perintah", "permintaan maaf"]],
    ],
    [
      ["えっ、もう終わったの？", "E, mou owatta no?", "Eh, sudah selesai?"],
      ["うん、もう終わったよ。", "Un, mou owatta yo.", "Iya, sudah selesai."],
      ["へえー、そんなこともあるんだ。", "Hee, sonna koto mo aru n da.", "Wah, ternyata ada juga hal seperti itu."],
      ["別に、どっちでもいいけど。", "Betsu ni, docchi demo ii kedo.", "Tidak juga, yang mana pun boleh sih."],
    ],
  ],
  // 16. Giliran bicara panjang
  [
    [
      ["手料理", "Teryouri", "masakan rumahan"],
      ["だんだん", "Dandan", "lama-kelamaan"],
      ["に進む", "Ni susumu", "melanjutkan ke"],
      ["目標", "Mokuhyou", "target / tujuan", ["Dalam giliran bicara panjang, struktur ditandai dengan...", "まず, それから, 最後に", "えっと saja", "はい saja", "tidak perlu penanda"]],
    ],
    [
      ["料理に興味を持ったきっかけは、祖母の手料理です。", "Ryouri ni kyoumi o motta kikkake wa, sobo no teryouri desu.", "Awal ketertarikan saya pada memasak adalah masakan rumahan nenek."],
      ["最初は手伝うだけでしたが、だんだん自分で作るようになりました。", "Saisho wa tetsudau dake deshita ga, dandan jibun de tsukuru you ni narimashita.", "Awalnya hanya membantu, tapi lama-kelamaan saya mulai memasak sendiri."],
      ["高校を卒業してから、調理の専門学校に進みました。", "Koukou o sotsugyou shite kara, chouri no senmon gakkou ni susumimashita.", "Setelah lulus SMA, saya melanjutkan ke sekolah kejuruan tata boga."],
      ["今は、自分の店を持つことが目標です。", "Ima wa, jibun no mise o motsu koto ga mokuhyou desu.", "Sekarang, target saya adalah memiliki toko sendiri."],
    ],
  ],
  // 17. Nada meminta klarifikasi
  [
    [
      ["ですか？", "Desu ka?", "begitukah? (nada naik ringan)"],
      ["もう一度", "Mou ichido", "sekali lagi"],
      ["という意味ですか", "To iu imi desu ka", "maksudnya ...?"],
      ["ですね？", "Desu ne?", "begitu, ya? (memastikan)", ["Saat meminta klarifikasi, nada di akhir kalimat...", "naik ringan dengan tempo pelan", "turun tajam", "sangat tinggi dan cepat", "datar dan keras"]],
    ],
    [
      ["集合場所は、東口ですか？", "Shuugou basho wa, higashiguchi desu ka?", "Tempat berkumpulnya di pintu timur?"],
      ["すみません、最後のところをもう一度お願いできますか。", "Sumimasen, saigo no tokoro o mou ichido onegai dekimasu ka.", "Maaf, bisakah bagian terakhir diulang sekali lagi?"],
      ["締め切りは、来週の月曜日ですね？", "Shimekiri wa, raishuu no getsuyoubi desu ne?", "Tenggatnya Senin depan, ya?"],
      ["「早めに」というのは、今日中という意味ですか。", "\"Hayame ni\" to iu no wa, kyoujuu to iu imi desu ka.", "Yang dimaksud 'lebih awal' itu artinya hari ini juga?"],
    ],
  ],
  // 18. Analisis rekaman
  [
    [
      ["囲まれた", "Kakomareta", "dikelilingi"],
      ["にぎやかになる", "Nigiyaka ni naru", "menjadi ramai"],
      ["星が見える", "Hoshi ga mieru", "bintang terlihat"],
      ["遊びに来る", "Asobi ni kuru", "datang berkunjung", ["Saat menganalisis rekaman, yang perlu dicek adalah...", "jeda, nada akhir, dan kecepatan", "warna baju", "jumlah kanji", "panjang rambut"]],
    ],
    [
      ["私の国は、一年中暑い南の国です。", "Watashi no kuni wa, ichinenjuu atsui minami no kuni desu.", "Negara saya adalah negara selatan yang panas sepanjang tahun."],
      ["たくさんの島があって、それぞれ文化が違います。", "Takusan no shima ga atte, sorezore bunka ga chigaimasu.", "Ada banyak pulau, dan budayanya berbeda-beda."],
      ["特に、料理の種類がとても豊富です。", "Toku ni, ryouri no shurui ga totemo houfu desu.", "Terutama, jenis masakannya sangat beragam."],
      ["機会があれば、ぜひ遊びに来てください。", "Kikai ga areba, zehi asobi ni kite kudasai.", "Jika ada kesempatan, silakan datang berkunjung."],
    ],
  ],
  // 19. Latihan kelancaran
  [
    [
      ["できるだけ", "Dekiru dake", "sebisa mungkin"],
      ["お返事いたします", "Ohenji itashimasu", "akan saya balas"],
      ["確認してから", "Kakunin shite kara", "setelah memeriksa"],
      ["申し訳ありません", "Moushiwake arimasen", "mohon maaf", ["Latihan kelancaran dilakukan dengan cara...", "mengulang kalimat yang sama beberapa kali", "membaca satu kali saja", "menulis tanpa berbicara", "menerjemahkan"]],
    ],
    [
      ["できるだけ早く資料をお送りいたします。", "Dekiru dake hayaku shiryou o ookuri itashimasu.", "Saya akan mengirimkan materinya secepat mungkin."],
      ["お待たせしてしまい、申し訳ありません。", "Omatase shite shimai, moushiwake arimasen.", "Mohon maaf telah membuat Anda menunggu."],
      ["日程を確認してから、改めてご連絡します。", "Nittei o kakunin shite kara, aratamete gorenraku shimasu.", "Setelah memeriksa jadwal, saya akan menghubungi Anda kembali."],
      ["今後ともよろしくお願いいたします。", "Kongo tomo yoroshiku onegai itashimasu.", "Mohon kerja samanya ke depan."],
    ],
  ],
  // 20. Ulasan pronunciation N3
  [
    [
      ["皆さん", "Minasan", "semuanya"],
      ["食文化", "Shokubunka", "budaya makan"],
      ["合理的", "Gouriteki", "rasional / masuk akal"],
      ["驚くかもしれません", "Odoroku kamoshiremasen", "mungkin akan terkejut", ["Romaji yang benar untuk 合理的 adalah...", "gouriteki", "goriteki", "gourittei", "kouriteki"]],
    ],
    [
      ["皆さん、今日は私の町の祭りを紹介します。", "Minasan, kyou wa watashi no machi no matsuri o shoukai shimasu.", "Semuanya, hari ini saya memperkenalkan festival di kota saya."],
      ["毎年八月に、三日間かけて行われます。", "Maitoshi hachigatsu ni, mikkakan kakete okonawaremasu.", "Setiap bulan Agustus, diadakan selama tiga hari."],
      ["夜になると、町中が明かりで飾られます。", "Yoru ni naru to, machijuu ga akari de kazararemasu.", "Begitu malam tiba, seluruh kota dihiasi lampu."],
      ["一度見たら、きっと忘れられないと思います。", "Ichido mitara, kitto wasurerarenai to omoimasu.", "Saya pikir sekali melihatnya, pasti tidak akan terlupakan."],
    ],
  ],
];
