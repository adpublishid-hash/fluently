import type { LessonCoreTuple } from '../types';

// Writing N2 — one entry per lesson (index = lesson - 1).
export const writing: LessonCoreTuple[] = [
  ['Esai opini formal', ['Esai formal: pendahuluan dengan isu, tesis jelas, dua argumen, sanggahan, kesimpulan.', 'Gunakan gaya である dan hindari bentuk lisan.'], [
    ['近年、AIを教育に活用する動きが広がっている。', 'Kinnen, eeai o kyouiku ni katsuyou suru ugoki ga hirogatte iru.', 'Belakangan ini, gerakan memanfaatkan AI dalam pendidikan meluas.'],
    ['筆者は、AIは教師の役割を補うものであり、代わるものではないと考える。', 'Hissha wa, eeai wa kyoushi no yakuwari o oginau mono de ari, kawaru mono de wa nai to kangaeru.', 'Penulis berpendapat AI melengkapi peran guru, bukan menggantikannya.'],
    ['確かに、AIは個人の理解度に応じた学習を可能にする。', 'Tashika ni, eeai wa kojin no rikaido ni oujita gakushuu o kanou ni suru.', 'Memang, AI memungkinkan pembelajaran sesuai tingkat pemahaman individu.'],
    ['しかし、学ぶ意欲を引き出すのは、やはり人間の役割である。', 'Shikashi, manabu iyoku o hikidasu no wa, yahari ningen no yakuwari de aru.', 'Namun, membangkitkan semangat belajar tetaplah peran manusia.'],
  ]],
  ['Proposal bisnis', ['Proposal: latar → masalah → solusi → anggaran → jadwal → efek.', 'Ungkapan: 本企画は〜を目的とする, 〜が期待される.'], [
    ['本企画は、若年層の新規顧客獲得を目的とする。', 'Honkikaku wa, jakunensou no shinki kokyaku kakutoku o mokuteki to suru.', 'Proyek ini bertujuan memperoleh pelanggan baru dari kalangan muda.'],
    ['現状、当社の顧客の七割が五十代以上である。', 'Genjou, tousha no kokyaku no nanawari ga gojuudai ijou de aru.', 'Saat ini, tujuh puluh persen pelanggan kami berusia lima puluhan ke atas.'],
    ['そこで、SNSを活用した広告キャンペーンを提案する。', 'Soko de, esu enu esu o katsuyou shita koukoku kyanpeen o teian suru.', 'Karena itu, kami mengusulkan kampanye iklan yang memanfaatkan media sosial.'],
    ['予算は三百万円、期間は六か月を予定している。', 'Yosan wa sanbyakuman en, kikan wa rokkagetsu o yotei shite iru.', 'Anggarannya tiga juta yen dan periodenya direncanakan enam bulan.'],
  ]],
  ['Notulen rapat', ['Notulen: tanggal, peserta, agenda, keputusan, tugas lanjutan.', 'Tulis keputusan dengan bentuk ringkas: 〜ことで合意した.'], [
    ['日時：五月十二日（月）十時〜十一時', 'Nichiji: gogatsu juuninichi (getsu) juuji kara juuichiji', 'Waktu: 12 Mei (Senin) 10.00–11.00'],
    ['議題：新システム導入のスケジュールについて', 'Gidai: shin shisutemu dounyuu no sukejuuru ni tsuite', 'Agenda: jadwal penerapan sistem baru'],
    ['決定事項：七月からの段階的な導入で合意した。', 'Kettei jikou: shichigatsu kara no dankaiteki na dounyuu de goui shita.', 'Keputusan: disepakati penerapan bertahap mulai Juli.'],
    ['次回までの課題：各部署で研修の日程を調整すること。', 'Jikai made no kadai: kaku busho de kenshuu no nittei o chousei suru koto.', 'Tugas hingga rapat berikutnya: setiap divisi menyesuaikan jadwal pelatihan.'],
  ]],
  ['Tanggapan atas kebijakan', ['Tanggapan kebijakan: rangkum kebijakan → evaluasi → usulan perbaikan.', 'Ungkapan: 〜という点で評価できる, 〜を検討すべきである.'], [
    ['市が発表した自転車専用道路の計画について、意見を述べたい。', 'Shi ga happyou shita jitensha sen-you douro no keikaku ni tsuite, iken o nobetai.', 'Saya ingin menyampaikan pendapat tentang rencana jalur khusus sepeda yang diumumkan kota.'],
    ['環境と健康の両面で効果があるという点で評価できる。', 'Kankyou to kenkou no ryoumen de kouka ga aru to iu ten de hyouka dekiru.', 'Rencana ini patut diapresiasi karena efektif dari sisi lingkungan dan kesehatan.'],
    ['ただし、商店街の前は道幅が狭く、事故の危険がある。', 'Tadashi, shoutengai no mae wa michihaba ga semaku, jiko no kiken ga aru.', 'Namun, jalan di depan pertokoan sempit dan berisiko kecelakaan.'],
    ['この区間については、別のルートを検討すべきである。', 'Kono kukan ni tsuite wa, betsu no ruuto o kentou subeki de aru.', 'Untuk ruas ini, rute lain sebaiknya dipertimbangkan.'],
  ]],
  ['Komentar data', ['Komentar data: deskripsi tren → angka kunci → interpretasi → keterbatasan.', 'Ungkapan: 〜ことが分かる, 〜と推測される, ただし〜点に留意が必要.'], [
    ['グラフから、在宅勤務の利用率が年々上昇していることが分かる。', 'Gurafu kara, zaitaku kinmu no riyouritsu ga nennen joushou shite iru koto ga wakaru.', 'Dari grafik terlihat tingkat penggunaan kerja dari rumah naik setiap tahun.'],
    ['特に、子育て世代での伸びが顕著である。', 'Toku ni, kosodate sedai de no nobi ga kencho de aru.', 'Terutama, peningkatan pada generasi yang mengasuh anak sangat mencolok.'],
    ['柔軟な働き方へのニーズが高いと推測される。', 'Juunan na hatarakikata e no niizu ga takai to suisoku sareru.', 'Diperkirakan kebutuhan akan cara kerja fleksibel tinggi.'],
    ['ただし、業種による差が大きい点に留意が必要である。', 'Tadashi, gyoushu ni yoru sa ga ookii ten ni ryuui ga hitsuyou de aru.', 'Namun, perlu diperhatikan bahwa perbedaannya besar menurut jenis industri.'],
  ]],
  ['Argumen dengan sanggahan', ['Sertakan sanggahan agar argumen lebih kuat (確かに〜しかし).', 'Tanggapi sanggahan dengan bukti, bukan penolakan.'], [
    ['確かに、観光客の増加は地域経済を潤す。', 'Tashika ni, kankoukyaku no zouka wa chiiki keizai o uruosu.', 'Memang, bertambahnya turis memakmurkan ekonomi daerah.'],
    ['しかし、住民の生活環境が悪化しているという声も無視できない。', 'Shikashi, juumin no seikatsu kankyou ga akka shite iru to iu koe mo mushi dekinai.', 'Namun, suara bahwa lingkungan hidup warga memburuk juga tidak bisa diabaikan.'],
    ['実際、京都では路線バスの混雑が深刻化している。', 'Jissai, Kyouto de wa rosen basu no konzatsu ga shinkokuka shite iru.', 'Kenyataannya, di Kyoto kepadatan bus kota makin parah.'],
    ['観光と生活の両立を図る仕組みづくりが急務である。', 'Kankou to seikatsu no ryouritsu o hakaru shikumi zukuri ga kyuumu de aru.', 'Membangun mekanisme yang menyeimbangkan pariwisata dan kehidupan warga adalah tugas mendesak.'],
  ]],
  ['Ringkasan penelitian', ['Ringkasan penelitian: siapa, apa, bagaimana, hasil, makna.', 'Gunakan kata kerja pelaporan: 明らかにした, 報告している, 示した.'], [
    ['田中（二〇二二）は、高校生の睡眠習慣について調査した。', 'Tanaka (nisen nijuuni) wa, koukousei no suimin shuukan ni tsuite chousa shita.', 'Tanaka (2022) meneliti kebiasaan tidur siswa SMA.'],
    ['その結果、半数以上が六時間未満しか眠っていないことを明らかにした。', 'Sono kekka, hansuu ijou ga rokujikan miman shika nemutte inai koto o akiraka ni shita.', 'Hasilnya mengungkap bahwa lebih dari separuh tidur kurang dari enam jam.'],
    ['また、睡眠不足と集中力の低下に関連があることを示した。', 'Mata, suimin busoku to shuuchuuryoku no teika ni kanren ga aru koto o shimeshita.', 'Selain itu, ditunjukkan adanya kaitan antara kurang tidur dan menurunnya konsentrasi.'],
    ['この研究は、学校の始業時間を見直す根拠となり得る。', 'Kono kenkyuu wa, gakkou no shigyou jikan o minaosu konkyo to nariuru.', 'Penelitian ini bisa menjadi dasar untuk meninjau ulang jam masuk sekolah.'],
  ]],
  ['Permintaan formal', ['Permintaan formal: alasan → permintaan → syarat → terima kasih di muka.', 'Ungkapan: 〜ていただきたく、お願い申し上げます.'], [
    ['貴社の工場を見学させていただきたく、ご連絡いたしました。', 'Kisha no koujou o kengaku sasete itadakitaku, gorenraku itashimashita.', 'Kami menghubungi karena ingin mengunjungi pabrik perusahaan Anda.'],
    ['本学の学生二十名が、環境技術を学んでおります。', 'Hongaku no gakusei nijuumei ga, kankyou gijutsu o manande orimasu.', 'Dua puluh mahasiswa kami sedang mempelajari teknologi lingkungan.'],
    ['ご都合のよい日程をお知らせいただけますと幸いです。', 'Gotsugou no yoi nittei o oshirase itadakemasu to saiwai desu.', 'Kami akan senang jika Anda memberi tahu jadwal yang sesuai.'],
    ['ご多忙のところ恐縮ですが、ご検討のほどお願い申し上げます。', 'Gotabou no tokoro kyoushuku desu ga, gokentou no hodo onegai moushiagemasu.', 'Mohon maaf mengganggu kesibukan Anda, kami mohon pertimbangannya.'],
  ]],
  ['Menanggapi keluhan', ['Tanggapan keluhan: maaf → penyebab → tindakan → pencegahan.', 'Hindari membela diri; tunjukkan tanggung jawab.'], [
    ['この度は、弊社商品の不具合によりご迷惑をおかけし、誠に申し訳ございません。', 'Kono tabi wa, heisha shouhin no fuguai ni yori gomeiwaku o okake shi, makoto ni moushiwake gozaimasen.', 'Kami mohon maaf sebesar-besarnya atas ketidaknyamanan akibat kerusakan produk kami.'],
    ['調査の結果、製造工程での確認漏れが原因と判明いたしました。', 'Chousa no kekka, seizou koutei de no kakunin more ga gen-in to hanmei itashimashita.', 'Hasil penyelidikan menunjukkan penyebabnya adalah kelalaian pemeriksaan di proses produksi.'],
    ['代替品を本日発送いたしましたので、ご確認ください。', 'Daitaihin o honjitsu hassou itashimashita node, gokakunin kudasai.', 'Barang pengganti sudah kami kirim hari ini, mohon diperiksa.'],
    ['今後は検査体制を強化し、品質向上に努めてまいります。', 'Kongo wa kensa taisei o kyouka shi, hinshitsu koujou ni tsutomete mairimasu.', 'Ke depan kami akan memperkuat sistem pemeriksaan dan berupaya meningkatkan kualitas.'],
  ]],
  ['Menjelaskan konsep abstrak', ['Konsep abstrak: definisi → contoh konkret → batas pemakaian.', 'Ungkapan: 〜とは〜を指す, 身近な例で言えば.'], [
    ['「多様性」とは、異なる背景や価値観を持つ人々が共に存在する状態を指す。', '"Tayousei" to wa, kotonaru haikei ya kachikan o motsu hitobito ga tomo ni sonzai suru joutai o sasu.', '"Keberagaman" merujuk pada keadaan orang-orang dengan latar dan nilai berbeda hidup bersama.'],
    ['身近な例で言えば、さまざまな国籍の社員が働く職場がそうだ。', 'Mijika na rei de ieba, samazama na kokuseki no shain ga hataraku shokuba ga sou da.', 'Contoh dekatnya adalah tempat kerja dengan karyawan dari berbagai kewarganegaraan.'],
    ['多様性は新しい発想を生む源となる。', 'Tayousei wa atarashii hassou o umu minamoto to naru.', 'Keberagaman menjadi sumber gagasan baru.'],
    ['ただし、互いを尊重する仕組みがなければ、対立の原因にもなり得る。', 'Tadashi, tagai o sonchou suru shikumi ga nakereba, tairitsu no gen-in ni mo nariuru.', 'Namun, tanpa mekanisme saling menghormati, ia juga bisa menjadi sumber konflik.'],
  ]],
  ['Profil profesional', ['Profil profesional: posisi sekarang → pengalaman → keahlian → tujuan.', 'Tulis dengan bentuk である atau です secara konsisten.'], [
    ['現在、IT企業でプロジェクトマネージャーを務めている。', 'Genzai, ai tii kigyou de purojekuto maneejaa o tsutomete iru.', 'Saat ini saya menjabat manajer proyek di perusahaan IT.'],
    ['これまでに、十件以上の海外プロジェクトを担当してきた。', 'Kore made ni, jikken ijou no kaigai purojekuto o tantou shite kita.', 'Sejauh ini saya telah menangani lebih dari sepuluh proyek luar negeri.'],
    ['日本語、英語、インドネシア語の三か国語を使いこなせる。', 'Nihongo, eigo, Indoneshiago no sankakokugo o tsukaikonaseru.', 'Saya fasih menggunakan tiga bahasa: Jepang, Inggris, dan Indonesia.'],
    ['今後は、日本とアジアをつなぐ架け橋になりたい。', 'Kongo wa, Nihon to Ajia o tsunagu kakehashi ni naritai.', 'Ke depan, saya ingin menjadi jembatan antara Jepang dan Asia.'],
  ]],
  ['Analisis risiko', ['Analisis risiko: identifikasi → kemungkinan → dampak → penanganan.', 'Tabel risiko dapat ditulis sebagai poin dengan 〜おそれがある.'], [
    ['第一のリスクは、為替の変動による原価の上昇である。', 'Daiichi no risuku wa, kawase no hendou ni yoru genka no joushou de aru.', 'Risiko pertama adalah naiknya biaya pokok akibat fluktuasi kurs.'],
    ['円安が進めば、利益が大幅に減少するおそれがある。', 'En-yasu ga susumeba, rieki ga oohaba ni genshou suru osore ga aru.', 'Jika yen terus melemah, keuntungan berisiko turun drastis.'],
    ['対策として、複数の国から部品を調達することが考えられる。', 'Taisaku to shite, fukusuu no kuni kara buhin o choutatsu suru koto ga kangaerareru.', 'Sebagai langkah, bisa dipertimbangkan pengadaan suku cadang dari beberapa negara.'],
    ['あわせて、為替予約の活用も検討すべきである。', 'Awasete, kawase yoyaku no katsuyou mo kentou subeki de aru.', 'Bersamaan dengan itu, pemanfaatan kontrak kurs berjangka juga patut dipertimbangkan.'],
  ]],
  ['Memo pemangku kepentingan', ['Memo untuk berbagai pihak: siapa terdampak, bagaimana, apa yang diminta.', 'Gunakan judul jelas dan poin bernomor.'], [
    ['件名：オフィス移転に伴う影響について', 'Kenmei: ofisu iten ni tomonau eikyou ni tsuite', 'Perihal: dampak pemindahan kantor'],
    ['社員の皆様には、通勤経路の変更をお願いすることになります。', 'Shain no minasama ni wa, tsuukin keiro no henkou o onegai suru koto ni narimasu.', 'Karyawan akan diminta mengubah rute perjalanan ke kantor.'],
    ['取引先には、新住所を今月中にご案内します。', 'Torihikisaki ni wa, shin juusho o kongetsuchuu ni goannai shimasu.', 'Alamat baru akan diinformasikan kepada mitra bisnis dalam bulan ini.'],
    ['ご不明な点は、総務部までお問い合わせください。', 'Gofumei na ten wa, soumubu made otoiawase kudasai.', 'Untuk hal yang belum jelas, silakan hubungi divisi umum.'],
  ]],
  ['Email persuasif', ['Email persuasif: manfaat bagi penerima dulu, lalu permintaan.', 'Ungkapan: 〜にとってもメリットがある, ぜひご一緒できれば.'], [
    ['貴社の技術と弊社の販売網を組み合わせれば、大きな相乗効果が期待できます。', 'Kisha no gijutsu to heisha no hanbaimou o kumiawasereba, ookina soujou kouka ga kitai dekimasu.', 'Jika teknologi Anda dipadukan dengan jaringan penjualan kami, sinergi besar dapat diharapkan.'],
    ['東南アジア市場への進出は、貴社にとってもメリットがあるかと存じます。', 'Tounan Ajia shijou e no shinshutsu wa, kisha ni totte mo meritto ga aru ka to zonjimasu.', 'Ekspansi ke pasar Asia Tenggara saya kira juga menguntungkan bagi perusahaan Anda.'],
    ['まずは一度、オンラインでお話しする機会をいただけないでしょうか。', 'Mazu wa ichido, onrain de ohanashi suru kikai o itadakenai deshou ka.', 'Bisakah kami mendapat kesempatan berbicara daring sekali terlebih dahulu?'],
    ['ぜひご一緒できれば幸いです。', 'Zehi goissho dekireba saiwai desu.', 'Kami akan sangat senang bila dapat bekerja sama.'],
  ]],
  ['Tanggapan atas editorial', ['Tanggapan editorial: rangkum klaim koran → setuju/tidak → alasan → usulan.', 'Kutip secara adil: 社説は〜と主張している.'], [
    ['社説は、大学の授業料を無償化すべきだと主張している。', 'Shasetsu wa, daigaku no jugyouryou o mushouka subeki da to shuchou shite iru.', 'Editorial itu menyatakan uang kuliah universitas seharusnya digratiskan.'],
    ['教育の機会均等という理念には賛成である。', 'Kyouiku no kikai kintou to iu rinen ni wa sansei de aru.', 'Saya setuju dengan prinsip kesetaraan kesempatan pendidikan.'],
    ['しかし、財源の問題が十分に論じられていない。', 'Shikashi, zaigen no mondai ga juubun ni ronjirarete inai.', 'Namun, masalah sumber dana belum dibahas dengan memadai.'],
    ['まずは所得に応じた段階的な支援から始めるべきではないか。', 'Mazu wa shotoku ni oujita dankaiteki na shien kara hajimeru beki de wa nai ka.', 'Bukankah sebaiknya dimulai dari bantuan bertahap sesuai penghasilan?'],
  ]],
  ['Menulis dengan kanji N2', ['Gunakan kanji N2 yang tepat: 把握, 検討, 対処, 実施, 妥当.', 'Periksa homofon: 対象/対照/対称, 保証/保障/補償.'], [
    ['現状を正確に把握した上で、対処方法を検討する。', 'Genjou o seikaku ni haaku shita ue de, taisho houhou o kentou suru.', 'Setelah memahami kondisi dengan tepat, cara penanganannya dipertimbangkan.'],
    ['被害者への補償が、まだ十分ではない。', 'Higaisha e no hoshou ga, mada juubun de wa nai.', 'Kompensasi bagi korban masih belum memadai.'],
    ['この製品には一年間の保証が付いている。', 'Kono seihin ni wa ichinenkan no hoshou ga tsuite iru.', 'Produk ini bergaransi satu tahun.'],
    ['二つの案を対照して、妥当な方を選んだ。', 'Futatsu no an o taishou shite, datou na hou o eranda.', 'Saya membandingkan dua usulan dan memilih yang paling tepat.'],
  ]],
  ['Mengendalikan register', ['Ubah ragam lisan ke tulisan: でも → しかし, だから → そのため, すごく → 非常に.', 'Hindari ちゃう, じゃない, って dalam tulisan formal.'], [
    ['非常に興味深い結果が得られた。', 'Hijou ni kyoumibukai kekka ga erareta.', 'Diperoleh hasil yang sangat menarik.'],
    ['そのため、計画の見直しが必要となった。', 'Sono tame, keikaku no minaoshi ga hitsuyou to natta.', 'Karena itu, peninjauan ulang rencana menjadi perlu.'],
    ['しかしながら、課題も少なくない。', 'Shikashinagara, kadai mo sukunaku nai.', 'Namun demikian, tantangannya juga tidak sedikit.'],
    ['この点については、改めて検討したい。', 'Kono ten ni tsuite wa, aratamete kentou shitai.', 'Mengenai hal ini, saya ingin mengkajinya kembali.'],
  ]],
  ['Kohesi', ['Kohesi: kata tunjuk (この, その), pengulangan kata kunci, dan konektor.', 'Hindari kalimat yang berdiri sendiri tanpa hubungan.'], [
    ['日本では空き家が増え続けている。', 'Nihon de wa akiya ga fuetsuzukete iru.', 'Di Jepang rumah kosong terus bertambah.'],
    ['この問題の背景には、人口減少と高齢化がある。', 'Kono mondai no haikei ni wa, jinkou genshou to koureika ga aru.', 'Di balik masalah ini ada penurunan penduduk dan penuaan.'],
    ['そうした空き家を、若者向けの住宅に改修する動きもある。', 'Sou shita akiya o, wakamono muke no juutaku ni kaishuu suru ugoki mo aru.', 'Ada juga gerakan merenovasi rumah kosong semacam itu menjadi hunian bagi anak muda.'],
    ['こうした取り組みが、地域の再生につながると期待される。', 'Kou shita torikumi ga, chiiki no saisei ni tsunagaru to kitai sareru.', 'Upaya seperti ini diharapkan berujung pada kebangkitan daerah.'],
  ]],
  ['Esai 500 karakter', ['Esai 500 karakter: 序論 (1 paragraf), 本論 (2 paragraf), 結論 (1 paragraf).', 'Setiap paragraf satu ide pokok.'], [
    ['近年、若者の車離れが進んでいると言われる。', 'Kinnen, wakamono no kurumabanare ga susunde iru to iwareru.', 'Belakangan ini dikatakan anak muda makin menjauhi mobil.'],
    ['その背景には、経済的な理由と価値観の変化がある。', 'Sono haikei ni wa, keizaiteki na riyuu to kachikan no henka ga aru.', 'Di baliknya ada alasan ekonomi dan perubahan nilai-nilai.'],
    ['所有するより、必要なときだけ借りるほうが合理的だと考える人が増えた。', 'Shoyuu suru yori, hitsuyou na toki dake kariru hou ga gouriteki da to kangaeru hito ga fueta.', 'Makin banyak orang yang menganggap menyewa saat perlu lebih masuk akal daripada memiliki.'],
    ['今後は、所有から共有への流れがさらに強まるだろう。', 'Kongo wa, shoyuu kara kyouyuu e no nagare ga sara ni tsuyomaru darou.', 'Ke depan, arus dari kepemilikan ke berbagi pakai akan semakin kuat.'],
  ]],
  ['Ulasan writing N2', ['Periksa: tesis jelas, argumen berlapis, sanggahan, kohesi, register.', 'Baca ulang dari sudut pandang pembaca yang tidak setuju.'], [
    ['論理的な文章を書くには、まず構成を決めることが重要だ。', 'Ronriteki na bunshou o kaku ni wa, mazu kousei o kimeru koto ga juuyou da.', 'Untuk menulis tulisan logis, pertama-tama penting menentukan susunannya.'],
    ['主張と根拠が対応しているか、常に確認する必要がある。', 'Shuchou to konkyo ga taiou shite iru ka, tsune ni kakunin suru hitsuyou ga aru.', 'Perlu selalu memeriksa apakah klaim dan dasar saling sesuai.'],
    ['反対意見に触れることで、議論に深みが生まれる。', 'Hantai iken ni fureru koto de, giron ni fukami ga umareru.', 'Dengan menyinggung pendapat yang berlawanan, diskusi menjadi lebih dalam.'],
    ['最後に、読み手の立場で全体を見直したい。', 'Saigo ni, yomite no tachiba de zentai o minaoshitai.', 'Terakhir, saya ingin meninjau keseluruhan dari sudut pandang pembaca.'],
  ]],
];
