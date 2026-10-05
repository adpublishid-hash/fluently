import type { JapaneseQuizTopic } from '../types';

// Latihan Listening N3 — one entry per topic (index = topic - 1): [Basic, Advanced].
export const listening: JapaneseQuizTopic[] = [
  // 1. Inti berita
  [
    [
      ["見直す", "Minaosu", "meninjau ulang"],
      ["引き上げる", "Hikiageru", "menaikkan"],
      ["にとどまる", "Ni todomaru", "hanya sebatas / berhenti di"],
      ["方針", "Houshin", "kebijakan / arah", ["Dalam berita, informasi terpenting biasanya ada di...", "kalimat pertama", "kalimat terakhir", "tengah saja", "judul musik"]],
    ],
    [
      ["政府は最低賃金を来年から引き上げると発表しました。", "Seifu wa saitei chingin o rainen kara hikiageru to happyou shimashita.", "Pemerintah mengumumkan akan menaikkan upah minimum mulai tahun depan.", ["Dari berita itu, apa yang akan dinaikkan?", "upah minimum", "pajak", "harga listrik", "tarif kereta"]],
      ["引き上げ額は全国平均で五十円の予定です。", "Hikiage gaku wa zenkoku heikin de gojuuen no yotei desu.", "Besarnya kenaikan direncanakan rata-rata lima puluh yen secara nasional."],
      ["中小企業には支援金を出す方針です。", "Chuushou kigyou ni wa shienkin o dasu houshin desu.", "Kebijakannya, perusahaan kecil dan menengah diberi dana bantuan."],
      ["一方、経営者からは不安の声も出ています。", "Ippou, keieisha kara wa fuan no koe mo dete imasu.", "Sementara itu, ada juga suara kecemasan dari para pengusaha."],
    ],
  ],
  // 2. Percakapan di kantor
  [
    [
      ["部", "Bu", "rangkap (penghitung dokumen)"],
      ["白黒", "Shirokuro", "hitam putih"],
      ["承知しました", "Shouchi shimashita", "baik, saya mengerti"],
      ["並べておく", "Narabete oku", "menata terlebih dulu", ["Kamu mendengar \"juubu kopii shite\". Kamu harus memfotokopi...", "sepuluh rangkap", "sepuluh halaman", "sepuluh menit", "sepuluh orang"]],
    ],
    [
      ["この書類、午後の会議までに十部用意しておいてくれる？", "Kono shorui, gogo no kaigi made ni juubu youi shite oite kureru?", "Dokumen ini, tolong siapkan sepuluh rangkap sebelum rapat sore?"],
      ["プロジェクターの準備もお願いできますか。", "Purojekutaa no junbi mo onegai dekimasu ka.", "Bisakah sekalian menyiapkan proyektornya?"],
      ["会議室は二階から五階に変更になったよ。", "Kaigishitsu wa nikai kara gokai ni henkou ni natta yo.", "Ruang rapatnya pindah dari lantai dua ke lantai lima, lho.", ["Dari percakapan itu, rapat sekarang di lantai...", "5", "2", "3", "4"]],
      ["承知しました。すぐに準備します。", "Shouchi shimashita. Sugu ni junbi shimasu.", "Baik. Segera saya siapkan."],
    ],
  ],
  // 3. Layanan pelanggan
  [
    [
      ["保証書", "Hoshousho", "kartu garansi"],
      ["保証期間", "Hoshou kikan", "masa garansi"],
      ["修理", "Shuuri", "perbaikan"],
      ["いたしかねます", "Itashikanemasu", "tidak dapat kami lakukan", ["Kamu mendengar \"koukan wa itashikanemasu\". Artinya...", "penukaran tidak bisa dilakukan", "penukaran gratis", "penukaran besok", "penukaran wajib"]],
    ],
    [
      ["購入されたのはいつ頃でしょうか。", "Kounyuu sareta no wa itsu goro deshou ka.", "Kira-kira kapan Anda membelinya?"],
      ["保証期間が過ぎていますので、修理は有料になります。", "Hoshou kikan ga sugite imasu node, shuuri wa yuuryou ni narimasu.", "Masa garansi sudah lewat, jadi perbaikannya berbayar.", ["Dari dialog itu, perbaikannya...", "berbayar karena garansi habis", "gratis", "tidak bisa dilakukan", "diganti barang baru"]],
      ["修理には一週間ほどかかります。", "Shuuri ni wa isshuukan hodo kakarimasu.", "Perbaikannya memakan waktu sekitar seminggu."],
      ["申し訳ございませんが、返品はいたしかねます。", "Moushiwake gozaimasen ga, henpin wa itashikanemasu.", "Mohon maaf, pengembalian barang tidak dapat kami lakukan."],
    ],
  ],
  // 4. Pengumuman kampus
  [
    [
      ["休講", "Kyuukou", "kuliah diliburkan"],
      ["補講", "Hokou", "kuliah pengganti"],
      ["履修登録", "Rishuu touroku", "pendaftaran mata kuliah"],
      ["掲示板", "Keijiban", "papan pengumuman", ["Kamu mendengar \"kyuukou\". Artinya...", "kuliah diliburkan", "kuliah pengganti", "ujian", "pendaftaran"]],
    ],
    [
      ["明日の三限の授業は休講となります。", "Ashita no sangen no jugyou wa kyuukou to narimasu.", "Kuliah jam ketiga besok diliburkan."],
      ["補講は来週の土曜日に行います。", "Hokou wa raishuu no doyoubi ni okonaimasu.", "Kuliah pengganti diadakan Sabtu depan.", ["Dari pengumuman itu, kuliah pengganti diadakan...", "Sabtu depan", "besok", "Senin depan", "hari ini"]],
      ["レポートの提出先が変わりましたので注意してください。", "Repooto no teishutsusaki ga kawarimashita node chuui shite kudasai.", "Tempat pengumpulan laporan berubah, harap perhatikan."],
      ["図書館は試験期間中、夜十時まで開いています。", "Toshokan wa shiken kikanchuu, yoru juuji made aite imasu.", "Selama masa ujian, perpustakaan buka sampai pukul sepuluh malam."],
    ],
  ],
  // 5. Masalah dan solusi
  [
    [
      ["いっぱい", "Ippai", "penuh"],
      ["ずらす", "Zurasu", "menggeser"],
      ["無理", "Muri", "tidak mungkin / tidak bisa"],
      ["ことにしよう", "Koto ni shiyou", "ayo kita putuskan ...", ["Kamu mendengar \"sore wa muri\". Usulan itu...", "ditolak", "diterima", "ditunda", "tidak dibahas"]],
    ],
    [
      ["予約していたレストランが急に休みになったんだって。", "Yoyaku shite ita resutoran ga kyuu ni yasumi ni natta n datte.", "Katanya restoran yang sudah dipesan tiba-tiba tutup."],
      ["じゃ、別の店を探すのはどう？", "Ja, betsu no mise o sagasu no wa dou?", "Kalau begitu, bagaimana kalau cari toko lain?"],
      ["今からじゃ、どこもいっぱいだと思うよ。", "Ima kara ja, doko mo ippai da to omou yo.", "Kalau baru sekarang, menurutku semua tempat sudah penuh."],
      ["じゃあ、誰かの家でパーティーをすることにしよう。", "Jaa, dareka no ie de paatii o suru koto ni shiyou.", "Kalau begitu, kita putuskan berpesta di rumah salah satu dari kita.", ["Dari dialog itu, keputusan akhirnya adalah...", "berpesta di rumah seseorang", "mencari restoran lain", "membatalkan pesta", "menunggu restoran buka"]],
    ],
  ],
  // 6. Dialog pendapat
  [
    [
      ["次第", "Shidai", "tergantung"],
      ["どうかなあ", "Dou ka naa", "entahlah"],
      ["そうとは限らない", "Sou to wa kagiranai", "belum tentu begitu"],
      ["賛成だな", "Sansei da na", "aku setuju", ["Kamu mendengar \"dou ka naa\". Sikap pembicara...", "ragu-ragu", "sangat setuju", "marah", "senang"]],
    ],
    [
      ["週に一度は家族で外食したほうがいいと思う。", "Shuu ni ichido wa kazoku de gaishoku shita hou ga ii to omou.", "Menurutku sebaiknya makan di luar bersama keluarga seminggu sekali."],
      ["でも、お金がかかるし、そうとは限らないよ。", "Demo, okane ga kakaru shi, sou to wa kagiranai yo.", "Tapi butuh biaya, belum tentu begitu."],
      ["うーん、どうかなあ。家で作るのも楽しいしね。", "Uun, dou ka naa. Ie de tsukuru no mo tanoshii shi ne.", "Hmm, entahlah. Masak di rumah juga menyenangkan."],
      ["結局、家族次第だよね。", "Kekkyoku, kazoku shidai da yo ne.", "Pada akhirnya tergantung keluarganya, ya."],
    ],
  ],
  // 7. Klip wawancara
  [
    [
      ["きっかけ", "Kikkake", "pemicu / awal mula"],
      ["継ぐ", "Tsugu", "meneruskan (usaha)"],
      ["手伝う", "Tetsudau", "membantu"],
      ["これからの目標", "Korekara no mokuhyou", "target ke depan", ["Pertanyaan \"kikkake wa nan desu ka\" menanyakan...", "awal mula / pemicu", "harga", "lokasi", "jumlah karyawan"]],
    ],
    [
      ["料理人になろうと思ったきっかけは何ですか。", "Ryourinin ni narou to omotta kikkake wa nan desu ka.", "Apa yang membuat Anda ingin menjadi juru masak?"],
      ["高校生のとき、留学先で食べた料理に感動したんです。", "Koukousei no toki, ryuugakusaki de tabeta ryouri ni kandou shita n desu.", "Saat SMA, saya terkesan dengan masakan yang saya makan di tempat studi luar negeri."],
      ["父の店を継ぐかどうか、ずいぶん悩みました。", "Chichi no mise o tsugu ka dou ka, zuibun nayamimashita.", "Saya lama bimbang apakah akan meneruskan toko ayah."],
      ["これからの目標は、地元の野菜を使った店を開くことです。", "Korekara no mokuhyou wa, jimoto no yasai o tsukatta mise o hiraku koto desu.", "Target ke depan adalah membuka toko yang memakai sayur lokal.", ["Dari wawancara itu, target narasumber adalah...", "membuka toko dengan sayur lokal", "pindah ke luar negeri", "menutup toko ayah", "menjadi guru"]],
    ],
  ],
  // 8. Rekomendasi
  [
    [
      ["のがおすすめ", "No ga osusume", "disarankan untuk ..."],
      ["混む", "Komu", "ramai / padat"],
      ["特に", "Toku ni", "terutama"],
      ["ぜひ", "Zehi", "tentu / pastikan", ["Kamu mendengar \"asa hayaku iku no ga osusume\". Saran pembicara...", "pergi pagi-pagi", "pergi malam", "jangan pergi", "pergi siang"]],
    ],
    [
      ["北海道に行くなら、冬の雪まつりがおすすめです。", "Hokkaidou ni iku nara, fuyu no yukimatsuri ga osusume desu.", "Kalau ke Hokkaido, saya sarankan festival salju di musim dingin."],
      ["週末はとても混むので、平日に行ったほうがいいですよ。", "Shuumatsu wa totemo komu node, heijitsu ni itta hou ga ii desu yo.", "Akhir pekan sangat ramai, jadi lebih baik pergi di hari kerja.", ["Dari audio itu, sebaiknya pergi pada...", "hari kerja", "akhir pekan", "hari libur nasional", "malam hari saja"]],
      ["特に夜のライトアップがきれいです。", "Toku ni yoru no raitoappu ga kirei desu.", "Terutama iluminasi malam harinya indah."],
      ["地元のラーメンもぜひ食べてみてください。", "Jimoto no raamen mo zehi tabete mite kudasai.", "Cobalah juga ramen lokalnya."],
    ],
  ],
  // 9. Keluhan
  [
    [
      ["困っている", "Komatte iru", "sedang kesulitan"],
      ["夜中", "Yonaka", "tengah malam"],
      ["管理会社", "Kanri gaisha", "perusahaan pengelola"],
      ["注意を促す", "Chuui o unagasu", "mengingatkan", ["Kamu mendengar \"chotto komatte iru n desu kedo\". Pembicara sedang...", "menyampaikan keluhan dengan halus", "memuji", "memesan", "berterima kasih"]],
    ],
    [
      ["上の階の足音が響いて、ちょっと困っているんです。", "Ue no kai no ashioto ga hibiite, chotto komatte iru n desu.", "Suara langkah dari lantai atas bergema, saya agak kesulitan."],
      ["特に夜中の二時ごろがひどいんです。", "Toku ni yonaka no niji goro ga hidoi n desu.", "Terutama sekitar pukul dua tengah malam parah sekali.", ["Dari keluhan itu, suara paling parah sekitar pukul...", "2 malam", "10 malam", "2 siang", "6 pagi"]],
      ["直接言うのは気まずいので、お願いできますか。", "Chokusetsu iu no wa kimazui node, onegai dekimasu ka.", "Canggung kalau saya bilang langsung, bisakah Anda yang menyampaikan?"],
      ["分かりました。全部の部屋にお知らせを配ります。", "Wakarimashita. Zenbu no heya ni oshirase o kubarimasu.", "Baik. Kami akan membagikan pemberitahuan ke semua kamar."],
    ],
  ],
  // 10. Presentasi
  [
    [
      ["ご覧ください", "Goran kudasai", "silakan lihat"],
      ["倍に増える", "Bai ni fueru", "bertambah dua kali lipat"],
      ["このことから", "Kono koto kara", "dari hal ini"],
      ["と言えます", "To iemasu", "bisa dikatakan", ["Kamu mendengar \"sanbai ni fuemashita\". Artinya...", "naik tiga kali lipat", "turun tiga persen", "naik tiga orang", "sama saja"]],
    ],
    [
      ["こちらの表をご覧ください。", "Kochira no hyou o goran kudasai.", "Silakan lihat tabel ini."],
      ["十年前と比べて、外国人観光客は三倍に増えました。", "Juunen mae to kurabete, gaikokujin kankoukyaku wa sanbai ni fuemashita.", "Dibandingkan sepuluh tahun lalu, wisatawan asing naik tiga kali lipat.", ["Dari presentasi itu, wisatawan asing...", "naik tiga kali lipat", "turun sepertiga", "tetap", "naik tiga persen"]],
      ["このことから、多言語の案内が必要だと言えます。", "Kono koto kara, tagengo no annai ga hitsuyou da to iemasu.", "Dari hal ini bisa dikatakan panduan multibahasa diperlukan."],
      ["以上で発表を終わります。ありがとうございました。", "Ijou de happyou o owarimasu. Arigatou gozaimashita.", "Dengan ini presentasi saya akhiri. Terima kasih."],
    ],
  ],
  // 11. Mendengar cerita
  [
    [
      ["恩返し", "Ongaeshi", "membalas budi"],
      ["鶴", "Tsuru", "burung bangau"],
      ["訪ねてくる", "Tazunete kuru", "datang berkunjung"],
      ["教訓", "Kyoukun", "pelajaran moral", ["Cerita rakyat biasanya diakhiri dengan...", "pelajaran moral", "harga barang", "jadwal kereta", "resep"]],
    ],
    [
      ["ある日、若い漁師が浜でいじめられている亀を助けました。", "Aru hi, wakai ryoushi ga hama de ijimerarete iru kame o tasukemashita.", "Suatu hari, nelayan muda menolong kura-kura yang dirundung di pantai."],
      ["亀はお礼に、漁師を海の中の城へ連れて行きました。", "Kame wa orei ni, ryoushi o umi no naka no shiro e tsurete ikimashita.", "Sebagai balasan, kura-kura membawa nelayan ke istana di dalam laut."],
      ["村に帰ると、何百年もたっていたのです。", "Mura ni kaeru to, nanbyakunen mo tatte ita no desu.", "Saat kembali ke desa, ternyata ratusan tahun telah berlalu.", ["Dari cerita itu, saat nelayan kembali ke desa...", "ratusan tahun telah berlalu", "baru satu hari", "desanya hilang", "dia jadi kaya"]],
      ["この話には、約束を守る大切さという教訓があります。", "Kono hanashi ni wa, yakusoku o mamoru taisetsusa to iu kyoukun ga arimasu.", "Kisah ini memiliki pelajaran tentang pentingnya menepati janji."],
    ],
  ],
  // 12. Pengumuman umum
  [
    [
      ["ご来館", "Goraikan", "kunjungan (ke gedung)"],
      ["閉館", "Heikan", "gedung tutup"],
      ["誠に", "Makoto ni", "sungguh"],
      ["となります", "To narimasu", "menjadi (formal)", ["Pengumuman umum biasanya memakai...", "keigo dan bentuk formal", "bahasa gaul", "bentuk perintah kasar", "dialek"]],
    ],
    [
      ["本日は当店をご利用いただき、誠にありがとうございます。", "Honjitsu wa touten o goriyou itadaki, makoto ni arigatou gozaimasu.", "Terima kasih sebesar-besarnya telah berbelanja di toko kami hari ini."],
      ["まもなく閉店のお時間となります。", "Mamonaku heiten no ojikan to narimasu.", "Sebentar lagi waktunya toko tutup."],
      ["迷子のお知らせをいたします。", "Maigo no oshirase o itashimasu.", "Kami umumkan adanya anak hilang."],
      ["五歳くらいの男の子が一階のサービスカウンターでお待ちです。", "Gosai kurai no otoko no ko ga ikkai no saabisu kauntaa de omachi desu.", "Seorang anak laki-laki sekitar lima tahun menunggu di meja layanan lantai satu.", ["Dari pengumuman itu, anak itu menunggu di...", "meja layanan lantai satu", "pintu keluar", "lantai lima", "tempat parkir"]],
    ],
  ],
  // 13. Penjelasan budaya
  [
    [
      ["もともと", "Motomoto", "awalnya / pada dasarnya"],
      ["季節の変わり目", "Kisetsu no kawarime", "pergantian musim"],
      ["と言われている", "To iwarete iru", "konon / dikatakan"],
      ["由来", "Yurai", "asal-usul", ["Kamu mendengar \"motomoto\". Pembicara sedang menjelaskan...", "makna atau asal awal", "harga", "jadwal", "arah jalan"]],
    ],
    [
      ["七夕は、もともと中国から伝わった行事です。", "Tanabata wa, motomoto Chuugoku kara tsutawatta gyouji desu.", "Tanabata awalnya adalah acara yang datang dari Tiongkok."],
      ["短冊に願い事を書いて、笹に飾ります。", "Tanzaku ni negaigoto o kaite, sasa ni kazarimasu.", "Orang menulis harapan di kertas tanzaku lalu menggantungnya di bambu."],
      ["一年に一度、二つの星が会える日だと言われています。", "Ichinen ni ichido, futatsu no hoshi ga aeru hi da to iwarete imasu.", "Konon ini hari ketika dua bintang bisa bertemu setahun sekali."],
      ["最近は、商店街でも七夕祭りが開かれています。", "Saikin wa, shoutengai demo tanabata matsuri ga hirakarete imasu.", "Akhir-akhir ini festival Tanabata juga diadakan di kawasan pertokoan."],
    ],
  ],
  // 14. Bentrok jadwal
  [
    [
      ["重なる", "Kasanaru", "bertumpuk / bentrok"],
      ["動かせない", "Ugokasenai", "tidak bisa dipindah"],
      ["都合がつく", "Tsugou ga tsuku", "waktunya bisa"],
      ["連絡しておく", "Renraku shite oku", "mengabari terlebih dulu", ["Kamu mendengar \"yotei ga kasanatte iru\". Artinya...", "jadwalnya bentrok", "jadwalnya kosong", "jadwalnya selesai", "jadwalnya dibatalkan"]],
    ],
    [
      ["金曜日、歯医者の予約と飲み会が重なっちゃった。", "Kinyoubi, haisha no yoyaku to nomikai ga kasanacchatta.", "Hari Jumat, janji dokter gigi dan acara minum bentrok."],
      ["歯医者は動かせないから、飲み会は遅れて行くよ。", "Haisha wa ugokasenai kara, nomikai wa okurete iku yo.", "Dokter gigi tidak bisa dipindah, jadi aku datang terlambat ke acara minum.", ["Dari dialog itu, pembicara akan...", "datang terlambat ke acara minum", "membatalkan dokter gigi", "tidak datang ke acara minum", "pindah hari"]],
      ["八時以降なら都合がつくと思う。", "Hachiji ikou nara tsugou ga tsuku to omou.", "Kalau setelah pukul delapan, kurasa aku bisa."],
      ["じゃ、幹事に連絡しておいてね。", "Ja, kanji ni renraku shite oite ne.", "Kalau begitu, kabari panitianya dulu, ya."],
    ],
  ],
  // 15. Urutan instruksi
  [
    [
      ["番号札", "Bangoufuda", "nomor antrean"],
      ["進んでください", "Susunde kudasai", "silakan maju"],
      ["郵送", "Yuusou", "dikirim lewat pos"],
      ["本人確認", "Honnin kakunin", "verifikasi identitas", ["Saat mendengar instruksi bertahap, sebaiknya kamu...", "mencatat langkah dengan nomor", "hanya mengingat langkah terakhir", "tidak mencatat apa pun", "menulis nama saja"]],
    ],
    [
      ["まず、こちらの用紙に必要なことを書いてください。", "Mazu, kochira no youshi ni hitsuyou na koto o kaite kudasai.", "Pertama, tulis hal yang diperlukan di formulir ini."],
      ["次に、身分証明書で本人確認をします。", "Tsugi ni, mibun shoumeisho de honnin kakunin o shimasu.", "Selanjutnya, verifikasi identitas dengan kartu identitas."],
      ["手数料を払ってから、二番の窓口でお待ちください。", "Tesuuryou o haratte kara, niban no madoguchi de omachi kudasai.", "Setelah membayar biaya, silakan tunggu di loket nomor dua.", ["Dari instruksi itu, setelah membayar kamu menunggu di loket...", "nomor 2", "nomor 1", "nomor 3", "nomor 5"]],
      ["証明書は一週間後に郵送されます。", "Shoumeisho wa isshuukan go ni yuusou saremasu.", "Sertifikat akan dikirim lewat pos seminggu kemudian."],
    ],
  ],
  // 16. Menyimpulkan alasan
  [
    [
      ["遠いし", "Tooi shi", "jauh, lagi pula... (alasan berderet)"],
      ["もので", "Mono de", "karena (alasan halus)"],
      ["なるほど", "Naruhodo", "oh, begitu"],
      ["実は", "Jitsu wa", "sebenarnya", ["Kamu mendengar \"tooi shi, takai shi\". Pembicara sedang...", "menyebut beberapa alasan", "memuji", "bertanya", "memesan"]],
    ],
    [
      ["どうして会社を辞めたんですか。", "Doushite kaisha o yameta n desu ka.", "Kenapa kamu keluar dari perusahaan?"],
      ["残業は多いし、休みも少ないし。", "Zangyou wa ooi shi, yasumi mo sukunai shi.", "Lemburnya banyak, liburnya juga sedikit."],
      ["それに、親の介護をすることになったもので。", "Sore ni, oya no kaigo o suru koto ni natta mono de.", "Lagi pula, saya jadi harus merawat orang tua.", ["Dari dialog itu, alasan tambahan pembicara keluar adalah...", "merawat orang tua", "pindah ke luar negeri", "melanjutkan kuliah", "menikah"]],
      ["なるほど、それは大変でしたね。", "Naruhodo, sore wa taihen deshita ne.", "Begitu, itu pasti berat, ya."],
    ],
  ],
  // 17. Menyimpulkan sikap
  [
    [
      ["まあまあ", "Maamaa", "lumayan / biasa saja"],
      ["さすが", "Sasuga", "memang hebat / tak heran"],
      ["まさか", "Masaka", "masa sih / tidak mungkin"],
      ["んだけどね", "N da kedo ne", "sih, tapi... (ada keberatan)", ["Kamu mendengar \"sasuga!\". Sikap pembicara...", "kagum", "kecewa", "marah", "ragu"]],
    ],
    [
      ["新しいレストラン、どうだった？", "Atarashii resutoran, dou datta?", "Restoran baru itu bagaimana?"],
      ["うーん、まあまあかな。値段のわりには普通だった。", "Uun, maamaa ka na. Nedan no wari ni wa futsuu datta.", "Hmm, lumayan sih. Untuk harganya, biasa saja.", ["Dari jawaban itu, pendapat pembicara tentang restoran adalah...", "biasa saja untuk harganya", "sangat enak", "sangat murah", "tidak pernah ke sana"]],
      ["さすが田中さん、仕事が早いですね。", "Sasuga Tanaka san, shigoto ga hayai desu ne.", "Memang hebat Tanaka, kerjanya cepat."],
      ["まさか彼が試験に落ちるなんて思わなかった。", "Masaka kare ga shiken ni ochiru nante omowanakatta.", "Tidak menyangka dia gagal ujian."],
    ],
  ],
  // 18. Dialog cepat
  [
    [
      ["やばい", "Yabai", "gawat / luar biasa (gaul)"],
      ["終電", "Shuuden", "kereta terakhir"],
      ["じゃん", "Jan", "kan / lho (gaul)"],
      ["って", "Tte", "katanya / kan (lisan)", ["Kamu mendengar \"yabai, shuuden itchatta\". Pembicara...", "ketinggalan kereta terakhir", "baru sampai rumah", "memenangkan hadiah", "lapar"]],
    ],
    [
      ["やばい、財布家に忘れてきちゃった。", "Yabai, saifu ie ni wasurete kichatta.", "Gawat, dompetku ketinggalan di rumah."],
      ["じゃ、今日は私がおごるよ。", "Ja, kyou wa watashi ga ogoru yo.", "Ya sudah, hari ini aku yang traktir."],
      ["いいの？明日絶対返すって。", "Ii no? Ashita zettai kaesu tte.", "Boleh? Besok pasti kukembalikan, kok."],
      ["いいって。いつも助けてもらってるじゃん。", "Ii tte. Itsumo tasukete moratteru jan.", "Tidak apa-apa. Kamu kan selalu membantuku."],
    ],
  ],
  // 19. Banyak pembicara
  [
    [
      ["僕", "Boku", "saya (laki-laki)"],
      ["両方", "Ryouhou", "keduanya"],
      ["多数決", "Tasuuketsu", "suara terbanyak"],
      ["賛成の人", "Sansei no hito", "yang setuju", ["Saat banyak pembicara, kamu bisa membedakan mereka dari...", "nama, peran, atau gaya bicara", "warna baju", "tinggi badan", "tidak bisa dibedakan"]],
    ],
    [
      ["じゃ、文化祭の出し物を決めましょう。佐藤さんの案は？", "Ja, bunkasai no dashimono o kimemashou. Satou san no an wa?", "Mari tentukan pertunjukan festival budaya. Usulan Sato apa?"],
      ["僕はお化け屋敷がいいと思います。", "Boku wa obakeyashiki ga ii to omoimasu.", "Saya pikir rumah hantu bagus."],
      ["私は喫茶店がいいけど、お化け屋敷も面白そうですね。", "Watashi wa kissaten ga ii kedo, obakeyashiki mo omoshirosou desu ne.", "Saya lebih suka kafe, tapi rumah hantu juga kelihatannya seru."],
      ["では、多数決で決めましょう。お化け屋敷に賛成の人？", "De wa, tasuuketsu de kimemashou. Obakeyashiki ni sansei no hito?", "Kalau begitu, kita putuskan dengan suara terbanyak. Siapa yang setuju rumah hantu?"],
    ],
  ],
  // 20. Ulasan listening N3
  [
    [
      ["再開発", "Saikaihatsu", "pembangunan ulang"],
      ["期待の声", "Kitai no koe", "suara harapan"],
      ["心配する", "Shinpai suru", "khawatir"],
      ["一体になる", "Ittai ni naru", "menyatu", ["Kamu mendengar \"kitai no koe ga agatte iru\". Artinya warga...", "menyuarakan harapan", "menolak keras", "tidak peduli", "pindah rumah"]],
    ],
    [
      ["市は古い商店街を再開発する計画を発表しました。", "Shi wa furui shoutengai o saikaihatsu suru keikaku o happyou shimashita.", "Pemerintah kota mengumumkan rencana pembangunan ulang kawasan pertokoan lama."],
      ["完成は五年後の予定です。", "Kansei wa gonengo no yotei desu.", "Penyelesaiannya direncanakan lima tahun lagi.", ["Dari berita itu, proyek selesai...", "lima tahun lagi", "tahun depan", "sepuluh tahun lagi", "bulan depan"]],
      ["若い人からは期待の声が上がっています。", "Wakai hito kara wa kitai no koe ga agatte imasu.", "Anak muda menyuarakan harapan."],
      ["一方で、昔からの店がなくなることを心配する人もいます。", "Ippou de, mukashi kara no mise ga nakunaru koto o shinpai suru hito mo imasu.", "Di sisi lain, ada juga yang khawatir toko-toko lama akan hilang."],
    ],
  ],
];
