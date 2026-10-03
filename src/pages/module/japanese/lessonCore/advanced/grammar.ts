import type { LessonCoreTuple } from '../types';

// Grammar N2 — one entry per lesson (index = lesson - 1).
export const grammar: LessonCoreTuple[] = [
  ['Keyakinan kuat: に違いない・に相違ない', ['〜に違いない = pasti (keyakinan pribadi berdasar bukti).', '〜に相違ない: versi tulisan formal dengan arti yang sama.'], [
    ['電気が消えているから、彼はもう寝たに違いない。', 'Denki ga kiete iru kara, kare wa mou neta ni chigainai.', 'Lampunya mati, jadi dia pasti sudah tidur.'],
    ['この絵は有名な画家の作品に違いありません。', 'Kono e wa yuumei na gaka no sakuhin ni chigai arimasen.', 'Lukisan ini pasti karya pelukis terkenal.'],
    ['犯人は内部の事情に詳しい人物に相違ない。', 'Hannin wa naibu no jijou ni kuwashii jinbutsu ni sou-i nai.', 'Pelakunya pasti orang yang paham urusan internal.'],
    ['あれだけ努力したのだから、合格するに違いない。', 'Are dake doryoku shita no da kara, goukaku suru ni chigainai.', 'Sudah berusaha sekeras itu, pasti lulus.'],
  ]],
  ['Terpaksa: ざるを得ない', ['Bentuk ない tanpa ない + ざるを得ない = terpaksa harus (tidak ada pilihan).', 'する → せざるを得ない.'], [
    ['台風が近づいているので、旅行は中止せざるを得ない。', 'Taifuu ga chikazuite iru node, ryokou wa chuushi sezaru o enai.', 'Topan mendekat, jadi perjalanan terpaksa dibatalkan.'],
    ['上司の命令なら、従わざるを得ません。', 'Joushi no meirei nara, shitagawazaru o emasen.', 'Kalau perintah atasan, terpaksa harus dituruti.'],
    ['この結果を見れば、計画の失敗を認めざるを得ない。', 'Kono kekka o mireba, keikaku no shippai o mitomezaru o enai.', 'Melihat hasil ini, kegagalan rencana terpaksa harus diakui.'],
    ['材料費が上がり、値上げせざるを得なくなった。', 'Zairyouhi ga agari, neage sezaru o enaku natta.', 'Biaya bahan naik, jadi terpaksa menaikkan harga.'],
  ]],
  ['Risiko: かねない', ['Akar ます + かねない = bisa saja berakibat buruk.', 'Hanya untuk akibat negatif; lawannya かねる = sulit untuk (sopan).'], [
    ['睡眠不足は大きな事故につながりかねない。', 'Suimin busoku wa ookina jiko ni tsunagari kanenai.', 'Kurang tidur bisa saja berujung kecelakaan besar.'],
    ['そんな言い方をしたら、誤解されかねませんよ。', 'Sonna iikata o shitara, gokai sare kanemasen yo.', 'Kalau bicara seperti itu, bisa-bisa disalahpahami.'],
    ['このままでは、会社の信用を失いかねない。', 'Kono mama de wa, kaisha no shin-you o ushinai kanenai.', 'Kalau dibiarkan, bisa-bisa kepercayaan perusahaan hilang.'],
    ['申し訳ございませんが、そのご要望にはお応えしかねます。', 'Moushiwake gozaimasen ga, sono goyoubou ni wa okotae shikanemasu.', 'Mohon maaf, permintaan itu sulit kami penuhi.'],
  ]],
  ['Seiring dengan: に伴って', ['〜に伴って = seiring dengan perubahan A, terjadi perubahan B.', 'Bentuk formal; sering dipakai di berita dan laporan.'], [
    ['高齢化に伴って、医療費が増加している。', 'Koureika ni tomonatte, iryouhi ga zouka shite iru.', 'Seiring penuaan penduduk, biaya kesehatan meningkat.'],
    ['技術の進歩に伴い、働き方も変化した。', 'Gijutsu no shinpo ni tomonai, hatarakikata mo henka shita.', 'Seiring kemajuan teknologi, cara bekerja juga berubah.'],
    ['事業の拡大に伴って、社員を募集します。', 'Jigyou no kakudai ni tomonatte, shain o boshuu shimasu.', 'Seiring perluasan usaha, kami merekrut karyawan.'],
    ['気温の上昇に伴う健康被害が心配されている。', 'Kion no joushou ni tomonau kenkou higai ga shinpai sarete iru.', 'Gangguan kesehatan akibat naiknya suhu dikhawatirkan.'],
  ]],
  ['Menyesuaikan: に応じて', ['〜に応じて = sesuai dengan (kebutuhan, kemampuan, situasi).', 'Bentuk sebelum kata benda: 〜に応じた.'], [
    ['収入に応じて、税金の額が変わる。', 'Shuunyuu ni oujite, zeikin no gaku ga kawaru.', 'Besarnya pajak berubah sesuai penghasilan.'],
    ['お客様の予算に応じたプランをご提案します。', 'Okyakusama no yosan ni oujita puran o goteian shimasu.', 'Kami mengusulkan paket sesuai anggaran pelanggan.'],
    ['レベルに応じて、クラスを分けています。', 'Reberu ni oujite, kurasu o wakete imasu.', 'Kelas dibagi sesuai level.'],
    ['状況に応じて、柔軟に対応してください。', 'Joukyou ni oujite, juunan ni taiou shite kudasai.', 'Tanggapilah secara fleksibel sesuai situasi.'],
  ]],
  ['Meskipun begitu: にもかかわらず', ['〜にもかかわらず = meskipun (hasil berlawanan dengan dugaan); formal.', 'Bisa berdiri di awal kalimat: にもかかわらず、….'], [
    ['雨にもかかわらず、多くの人が集まった。', 'Ame ni mo kakawarazu, ooku no hito ga atsumatta.', 'Meskipun hujan, banyak orang berkumpul.'],
    ['十分に注意したにもかかわらず、ミスが起きた。', 'Juubun ni chuui shita ni mo kakawarazu, misu ga okita.', 'Meskipun sudah sangat berhati-hati, kesalahan tetap terjadi.'],
    ['平日にもかかわらず、会場は満員だった。', 'Heijitsu ni mo kakawarazu, kaijou wa man-in datta.', 'Meskipun hari kerja, tempat acaranya penuh.'],
    ['彼は高齢にもかかわらず、毎日十キロ歩いている。', 'Kare wa kourei ni mo kakawarazu, mainichi jukkiro aruite iru.', 'Meskipun sudah lanjut usia, dia berjalan sepuluh kilometer setiap hari.'],
  ]],
  ['Walau…, tetapi: ものの', ['〜ものの = walaupun (diakui), tetapi kenyataannya kurang.', 'Bagian kedua biasanya berisi ketidakpuasan atau hambatan.'], [
    ['免許は取ったものの、まだ一度も運転していない。', 'Menkyo wa totta mono no, mada ichido mo unten shite inai.', 'Walau sudah dapat SIM, saya belum sekali pun menyetir.'],
    ['引き受けたものの、時間が足りるか不安だ。', 'Hikiuketa mono no, jikan ga tariru ka fuan da.', 'Walau sudah menerima tugasnya, saya cemas apakah waktunya cukup.'],
    ['新しい制度はできたものの、利用者は少ない。', 'Atarashii seido wa dekita mono no, riyousha wa sukunai.', 'Walau sistem baru sudah dibuat, penggunanya sedikit.'],
    ['頭では分かっているものの、なかなか実行できない。', 'Atama de wa wakatte iru mono no, nakanaka jikkou dekinai.', 'Walau paham di kepala, tak kunjung bisa dilaksanakan.'],
  ]],
  ['Di satu sisi: 一方で', ['〜一方で = di satu sisi…, di sisi lain (dua sisi suatu hal).', '〜一方だ (lain pola) = terus-menerus (memburuk/meningkat).'], [
    ['この薬はよく効く一方で、副作用もある。', 'Kono kusuri wa yoku kiku ippou de, fukusayou mo aru.', 'Obat ini manjur, di sisi lain juga ada efek sampingnya.'],
    ['都会は便利な一方で、生活費が高い。', 'Tokai wa benri na ippou de, seikatsuhi ga takai.', 'Kota besar praktis, di sisi lain biaya hidupnya tinggi.'],
    ['仕事が増える一方で、給料は変わらない。', 'Shigoto ga fueru ippou de, kyuuryou wa kawaranai.', 'Pekerjaan bertambah, sementara gaji tidak berubah.'],
    ['物価は上がる一方だ。', 'Bukka wa agaru ippou da.', 'Harga-harga terus naik.'],
  ]],
  ['Setelah / dalam hal: 上で', ['Bentuk た + 上で = setelah (melakukan A dengan matang), baru B.', 'Kata kerja kamus + 上で = dalam hal/untuk keperluan.'], [
    ['よく考えた上で、お返事します。', 'Yoku kangaeta ue de, ohenji shimasu.', 'Setelah dipikirkan matang, saya akan menjawab.'],
    ['家族と相談した上で、決めたいと思います。', 'Kazoku to soudan shita ue de, kimetai to omoimasu.', 'Saya ingin memutuskan setelah berdiskusi dengan keluarga.'],
    ['外国語を学ぶ上で、文化の理解は欠かせない。', 'Gaikokugo o manabu ue de, bunka no rikai wa kakasenai.', 'Dalam mempelajari bahasa asing, pemahaman budaya tak bisa ditinggalkan.'],
    ['契約内容を確認の上、署名してください。', 'Keiyaku naiyou o kakunin no ue, shomei shite kudasai.', 'Setelah memeriksa isi kontrak, silakan tanda tangan.'],
  ]],
  ['Begitu…, segera: 次第', ['Akar ます + 次第 = segera setelah (lalu tindakan sengaja).', 'Benda + 次第 = tergantung pada.'], [
    ['詳細が決まり次第、ご連絡いたします。', 'Shousai ga kimari shidai, gorenraku itashimasu.', 'Begitu detailnya ditetapkan, kami akan segera menghubungi.'],
    ['到着し次第、お電話ください。', 'Touchaku shi shidai, odenwa kudasai.', 'Begitu tiba, segera telepon saya.'],
    ['成功するかどうかは、君の努力次第だ。', 'Seikou suru ka dou ka wa, kimi no doryoku shidai da.', 'Berhasil atau tidak tergantung usahamu.'],
    ['天候次第で、イベントは中止になります。', 'Tenkou shidai de, ibento wa chuushi ni narimasu.', 'Tergantung cuaca, acara bisa dibatalkan.'],
  ]],
  ['Selama / sebatas: 限り', ['〜限り = selama (kondisi berlangsung); 〜ない限り = kecuali jika.', '〜限りでは = sebatas yang (saya ketahui/lihat).'], [
    ['この店がある限り、通い続けるつもりだ。', 'Kono mise ga aru kagiri, kayoitsuzukeru tsumori da.', 'Selama toko ini ada, saya akan terus datang.'],
    ['本人が反省しない限り、問題は解決しない。', 'Honnin ga hansei shinai kagiri, mondai wa kaiketsu shinai.', 'Kecuali orangnya sendiri introspeksi, masalah tidak akan selesai.'],
    ['私が知る限りでは、彼はまじめな人です。', 'Watashi ga shiru kagiri de wa, kare wa majime na hito desu.', 'Sebatas yang saya tahu, dia orang yang serius.'],
    ['できる限りのことはしました。', 'Dekiru kagiri no koto wa shimashita.', 'Saya sudah melakukan semampu saya.'],
  ]],
  ['Berdasarkan: に基づいて', ['〜に基づいて = berdasarkan (data, aturan, fakta).', 'Sebelum benda: 〜に基づいた / 〜に基づく.'], [
    ['この映画は実話に基づいて作られた。', 'Kono eiga wa jitsuwa ni motozuite tsukurareta.', 'Film ini dibuat berdasarkan kisah nyata.'],
    ['調査結果に基づく提案をまとめました。', 'Chousa kekka ni motozuku teian o matomemashita.', 'Saya merangkum usulan berdasarkan hasil survei.'],
    ['法律に基づいて、適切に処理します。', 'Houritsu ni motozuite, tekisetsu ni shori shimasu.', 'Kami memprosesnya dengan tepat berdasarkan hukum.'],
    ['経験に基づいたアドバイスは説得力がある。', 'Keiken ni motozuita adobaisu wa settokuryoku ga aru.', 'Saran berdasarkan pengalaman itu meyakinkan.'],
  ]],
  ['Seputar perdebatan: をめぐって', ['〜をめぐって = seputar (isu yang diperdebatkan atau diperebutkan).', 'Kata kerja yang menyertai: 議論, 対立, 争う.'], [
    ['新しい空港の建設をめぐって、住民の意見が分かれている。', 'Atarashii kuukou no kensetsu o megutte, juumin no iken ga wakarete iru.', 'Seputar pembangunan bandara baru, pendapat warga terbelah.'],
    ['遺産をめぐって、兄弟が争った。', 'Isan o megutte, kyoudai ga arasotta.', 'Saudara kandung bertengkar memperebutkan warisan.'],
    ['この問題をめぐる議論はまだ続いている。', 'Kono mondai o meguru giron wa mada tsuzuite iru.', 'Perdebatan seputar masalah ini masih berlanjut.'],
    ['原発の再稼働をめぐって、国会で激しい議論があった。', 'Genpatsu no saikadou o megutte, kokkai de hageshii giron ga atta.', 'Terjadi perdebatan sengit di parlemen seputar pengoperasian kembali PLTN.'],
  ]],
  ['Melalui: を通じて', ['〜を通じて (1) = melalui (perantara/sarana).', '〜を通じて (2) = sepanjang (periode): 一年を通じて.'], [
    ['友人を通じて、彼女と知り合いました。', 'Yuujin o tsuujite, kanojo to shiriaimashita.', 'Saya berkenalan dengannya melalui teman.'],
    ['インターネットを通じて、世界中の人と交流できる。', 'Intaanetto o tsuujite, sekaijuu no hito to kouryuu dekiru.', 'Melalui internet, bisa berinteraksi dengan orang di seluruh dunia.'],
    ['この地域は一年を通じて温暖だ。', 'Kono chiiki wa ichinen o tsuujite ondan da.', 'Wilayah ini hangat sepanjang tahun.'],
    ['ボランティア活動を通じて、地域とのつながりが深まった。', 'Borantia katsudou o tsuujite, chiiki to no tsunagari ga fukamatta.', 'Melalui kegiatan relawan, hubungan dengan warga semakin erat.'],
  ]],
  ['Tidak berarti: わけではない', ['〜わけではない = tidak berarti / bukan berarti (menyangkal sebagian).', '全部〜わけではない = tidak semuanya.'], [
    ['高い店が必ずおいしいわけではない。', 'Takai mise ga kanarazu oishii wake de wa nai.', 'Toko mahal belum tentu enak.'],
    ['仕事が嫌いなわけではないが、少し休みたい。', 'Shigoto ga kirai na wake de wa nai ga, sukoshi yasumitai.', 'Bukan berarti saya benci pekerjaan, tapi saya ingin istirahat sebentar.'],
    ['全員が賛成しているわけではありません。', 'Zen-in ga sansei shite iru wake de wa arimasen.', 'Tidak semua orang setuju.'],
    ['日本人だからといって、敬語が完璧なわけではない。', 'Nihonjin da kara to itte, keigo ga kanpeki na wake de wa nai.', 'Hanya karena orang Jepang, bukan berarti keigo-nya sempurna.'],
  ]],
  ['Bukannya tidak: ないことはない', ['〜ないことはない = bukannya tidak (bisa/mungkin), tapi kurang yakin.', 'Nuansa ragu; sering diikuti が/けど.'], [
    ['辛い料理も食べられないことはないです。', 'Karai ryouri mo taberarenai koto wa nai desu.', 'Masakan pedas pun bukannya tidak bisa saya makan.'],
    ['急げば間に合わないことはないが、難しいだろう。', 'Isogeba maniawanai koto wa nai ga, muzukashii darou.', 'Kalau bergegas bukannya tidak keburu, tapi mungkin sulit.'],
    ['彼の気持ちも分からないことはない。', 'Kare no kimochi mo wakaranai koto wa nai.', 'Perasaannya bukannya tidak bisa saya pahami.'],
    ['できないことはないけど、時間がかかります。', 'Dekinai koto wa nai kedo, jikan ga kakarimasu.', 'Bukannya tidak bisa, tapi makan waktu.'],
  ]],
  ['Memang begitu sifatnya: というものだ', ['〜というものだ = memang begitulah (penilaian umum/akal sehat).', '〜というものではない = tidak bisa dikatakan begitu saja.'], [
    ['困っている人を助けるのが、友達というものだ。', 'Komatte iru hito o tasukeru no ga, tomodachi to iu mono da.', 'Menolong orang yang kesulitan, begitulah teman.'],
    ['一度の失敗であきらめるのは、もったいないというものだ。', 'Ichido no shippai de akirameru no wa, mottainai to iu mono da.', 'Menyerah karena sekali gagal itu sayang sekali.'],
    ['お金さえあれば幸せになれるというものではない。', 'Okane sae areba shiawase ni nareru to iu mono de wa nai.', 'Tidak bisa dikatakan asal punya uang pasti bahagia.'],
    ['長く働けばいいというものではない。', 'Nagaku hatarakeba ii to iu mono de wa nai.', 'Bukan berarti bekerja lama itu otomatis bagus.'],
  ]],
  ['Tidak lain adalah: にほかならない', ['〜にほかならない = tidak lain adalah (penegasan kuat, formal).', 'Sering dengan 〜からにほかならない = semata-mata karena.'], [
    ['この成功は、チーム全員の努力の結果にほかならない。', 'Kono seikou wa, chiimu zen-in no doryoku no kekka ni hoka naranai.', 'Keberhasilan ini tidak lain adalah hasil usaha seluruh tim.'],
    ['彼が厳しく言うのは、君に期待しているからにほかならない。', 'Kare ga kibishiku iu no wa, kimi ni kitai shite iru kara ni hoka naranai.', 'Dia bicara keras semata-mata karena berharap padamu.'],
    ['教育とは、未来への投資にほかならない。', 'Kyouiku to wa, mirai e no toushi ni hoka naranai.', 'Pendidikan tidak lain adalah investasi untuk masa depan.'],
    ['この問題は、管理体制の不備にほかならない。', 'Kono mondai wa, kanri taisei no fubi ni hoka naranai.', 'Masalah ini tidak lain adalah kelemahan sistem pengelolaan.'],
  ]],
  ['Keigo N2', ['Keigo khusus: おっしゃる, ご覧になる, 伺う, 拝見する, 存じる, 申し上げる.', 'Hindari keigo ganda (二重敬語) seperti おっしゃられる.'], [
    ['部長がおっしゃった通りに進めます。', 'Buchou ga osshatta toori ni susumemasu.', 'Akan saya lanjutkan sesuai yang dikatakan kepala bagian.'],
    ['資料を拝見しました。', 'Shiryou o haiken shimashita.', 'Saya sudah melihat materinya.'],
    ['明日、御社に伺ってもよろしいでしょうか。', 'Ashita, onsha ni ukagatte mo yoroshii deshou ka.', 'Bolehkah besok saya berkunjung ke perusahaan Anda?'],
    ['その件は存じております。', 'Sono ken wa zonjite orimasu.', 'Hal itu sudah saya ketahui.'],
  ]],
  ['Ulasan grammar N2', ['Gabungkan pola formal: に伴って, に基づいて, ものの, ざるを得ない, にほかならない.', 'Pilih pola sesuai nuansa: keyakinan, keterpaksaan, konsesi, penegasan.'], [
    ['人口減少に伴い、地方の学校は統合せざるを得なくなった。', 'Jinkou genshou ni tomonai, chihou no gakkou wa tougou sezaru o enaku natta.', 'Seiring berkurangnya penduduk, sekolah di daerah terpaksa digabung.'],
    ['反対意見もあるものの、調査結果に基づいて判断した。', 'Hantai iken mo aru mono no, chousa kekka ni motozuite handan shita.', 'Walau ada pendapat yang menentang, keputusan diambil berdasarkan hasil survei.'],
    ['これは地域の未来を守るための選択にほかならない。', 'Kore wa chiiki no mirai o mamoru tame no sentaku ni hoka naranai.', 'Ini tidak lain adalah pilihan untuk melindungi masa depan daerah.'],
    ['十分な説明がない限り、住民の理解は得られないだろう。', 'Juubun na setsumei ga nai kagiri, juumin no rikai wa erarenai darou.', 'Kecuali ada penjelasan yang memadai, pengertian warga mungkin tidak didapat.'],
  ]],
];
