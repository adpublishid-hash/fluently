import type { LessonCoreTuple } from '../types';

// Speaking N2 (dialog A/B) — one entry per lesson (index = lesson - 1).
export const speaking: LessonCoreTuple[] = [
  ['Pendapat tentang hal abstrak', ['Topik abstrak (kebahagiaan, sukses, kebebasan): definisikan dulu, baru berpendapat.', 'Ungkapan: 〜とは何かというと, 私にとって〜とは.'], [
    ['成功とは何だと思いますか。', 'Seikou to wa nan da to omoimasu ka.', 'Menurut Anda, apa itu sukses?'],
    ['私にとって成功とは、自分で選んだ道を歩けることです。', 'Watashi ni totte seikou to wa, jibun de eranda michi o arukeru koto desu.', 'Bagi saya, sukses adalah bisa menempuh jalan yang saya pilih sendiri.'],
    ['収入や地位は関係ないということですか。', 'Shuunyuu ya chii wa kankei nai to iu koto desu ka.', 'Maksudnya penghasilan dan jabatan tidak berpengaruh?'],
    ['関係なくはないですが、それだけが基準ではないと思います。', 'Kankei naku wa nai desu ga, sore dake ga kijun de wa nai to omoimasu.', 'Bukannya tidak berpengaruh, tapi menurut saya itu bukan satu-satunya ukuran.'],
  ]],
  ['Rapat profesional', ['Peran dalam rapat: membuka, merangkum, meminta pendapat, menutup.', 'Ungkapan: 本題に入ります, ご意見をいただけますか, 論点を整理すると.'], [
    ['それでは、本題に入りたいと思います。', 'Sore de wa, hondai ni hairitai to omoimasu.', 'Baiklah, mari masuk ke pokok bahasan.'],
    ['新商品の価格について、ご意見をいただけますか。', 'Shinshouhin no kakaku ni tsuite, goiken o itadakemasu ka.', 'Bisakah saya mendapat pendapat mengenai harga produk baru?'],
    ['競合他社と比べると、少し高めではないでしょうか。', 'Kyougou tasha to kuraberu to, sukoshi takame de wa nai deshou ka.', 'Dibandingkan pesaing, bukankah agak mahal?'],
    ['論点を整理すると、価格と品質のバランスですね。', 'Ronten o seiri suru to, kakaku to hinshitsu no baransu desu ne.', 'Kalau dirangkum, pokok masalahnya keseimbangan harga dan kualitas.'],
  ]],
  ['Tidak setuju secara formal', ['Tidak setuju formal: hargai dulu, lalu sampaikan kekhawatiran dengan alasan.', 'Ungkapan: おっしゃることはよく分かりますが, 懸念があります.'], [
    ['来月から全社でリモートワークを導入しましょう。', 'Raigetsu kara zensha de rimooto waaku o dounyuu shimashou.', 'Mari terapkan kerja jarak jauh di seluruh perusahaan mulai bulan depan.'],
    ['おっしゃることはよく分かりますが、一点懸念があります。', 'Ossharu koto wa yoku wakarimasu ga, itten kenen ga arimasu.', 'Saya sangat paham maksud Anda, tapi ada satu kekhawatiran.'],
    ['新人の教育が難しくなるのではないでしょうか。', 'Shinjin no kyouiku ga muzukashiku naru no de wa nai deshou ka.', 'Bukankah pelatihan karyawan baru akan menjadi sulit?'],
    ['確かに、その点は対策が必要ですね。', 'Tashika ni, sono ten wa taisaku ga hitsuyou desu ne.', 'Memang, hal itu perlu langkah penanganan.'],
  ]],
  ['Mengomentari data', ['Komentar data: tren → angka → penyebab → implikasi.', 'Ungkapan: 〜を示しています, 〜傾向にあります, 〜が読み取れます.'], [
    ['このグラフは、若者の新聞離れを示しています。', 'Kono gurafu wa, wakamono no shinbun banare o shimeshite imasu.', 'Grafik ini menunjukkan anak muda meninggalkan koran.'],
    ['二十代の購読率は、十年で半分以下になりました。', 'Nijuudai no koudokuritsu wa, juunen de hanbun ika ni narimashita.', 'Tingkat berlangganan usia dua puluhan turun ke kurang dari separuh dalam sepuluh tahun.'],
    ['ニュースをスマホで読む人が増えたことが原因と考えられます。', 'Nyuusu o sumaho de yomu hito ga fueta koto ga gen-in to kangaeraremasu.', 'Penyebabnya diperkirakan karena orang yang membaca berita di ponsel bertambah.'],
    ['今後もこの傾向は続くと予想されます。', 'Kongo mo kono keikou wa tsuzuku to yosou saremasu.', 'Kecenderungan ini diperkirakan akan terus berlanjut.'],
  ]],
  ['Isu sosial', ['Bahas isu sosial: latar → dampak → pihak terkait → pendapat.', 'Hindari generalisasi; pakai 〜という面もある.'], [
    ['少子化の問題について、どうお考えですか。', 'Shoushika no mondai ni tsuite, dou okangae desu ka.', 'Bagaimana pendapat Anda tentang masalah turunnya angka kelahiran?'],
    ['経済的な不安が大きな原因だと思います。', 'Keizaiteki na fuan ga ookina gen-in da to omoimasu.', 'Menurut saya kecemasan ekonomi adalah penyebab besarnya.'],
    ['価値観の変化という面もあるのではないでしょうか。', 'Kachikan no henka to iu men mo aru no de wa nai deshou ka.', 'Bukankah ada juga sisi perubahan nilai-nilai?'],
    ['ええ、両方の視点から対策を考える必要がありますね。', 'Ee, ryouhou no shiten kara taisaku o kangaeru hitsuyou ga arimasu ne.', 'Ya, perlu memikirkan langkah dari kedua sudut pandang.'],
  ]],
  ['Usulan kebijakan', ['Usulan kebijakan: masalah → usulan → manfaat → biaya/risiko.', 'Ungkapan: 〜を提言します, 〜が見込まれます.'], [
    ['駅前の放置自転車が問題になっています。', 'Ekimae no houchi jitensha ga mondai ni natte imasu.', 'Sepeda yang ditinggalkan di depan stasiun menjadi masalah.'],
    ['そこで、有料の駐輪場を増やすことを提言します。', 'Soko de, yuuryou no chuurinjou o fuyasu koto o teigen shimasu.', 'Karena itu, saya mengusulkan menambah parkir sepeda berbayar.'],
    ['建設費用はどのくらいかかりますか。', 'Kensetsu hiyou wa dono kurai kakarimasu ka.', 'Biaya pembangunannya kira-kira berapa?'],
    ['約三千万円ですが、五年で回収できる見込みです。', 'Yaku sanzenman en desu ga, gonen de kaishuu dekiru mikomi desu.', 'Sekitar tiga puluh juta yen, tetapi diperkirakan balik modal dalam lima tahun.'],
  ]],
  ['Laporan kerja', ['Laporan: kesimpulan dulu (結論から申し上げますと), lalu detail.', 'Sertakan angka, masalah, dan langkah berikutnya.'], [
    ['結論から申し上げますと、目標は達成できました。', 'Ketsuron kara moushiagemasu to, mokuhyou wa tassei dekimashita.', 'Langsung pada kesimpulannya, target berhasil dicapai.'],
    ['売り上げは前年比で十五パーセント増加しました。', 'Uriage wa zennenhi de juugo paasento zouka shimashita.', 'Penjualan naik lima belas persen dibanding tahun lalu.'],
    ['ただし、新規顧客の獲得には課題が残っています。', 'Tadashi, shinki kokyaku no kakutoku ni wa kadai ga nokotte imasu.', 'Namun, perolehan pelanggan baru masih menyisakan tantangan.'],
    ['来期は広告戦略を見直す予定です。', 'Raiki wa koukoku senryaku o minaosu yotei desu.', 'Periode depan kami berencana meninjau ulang strategi iklan.'],
  ]],
  ['Penjelasan akademik', ['Penjelasan akademik: definisi → contoh → batasan konsep.', 'Ungkapan: 〜と定義される, 具体的には, ただし〜場合は除く.'], [
    ['「同調圧力」とは、周りに合わせるよう求める無言の圧力のことです。', '"Douchou atsuryoku" to wa, mawari ni awaseru you motomeru mugon no atsuryoku no koto desu.', '"Tekanan konformitas" adalah tekanan diam-diam agar menyesuaikan diri dengan sekitar.'],
    ['具体的には、残業している同僚がいると帰りにくい、といった状況です。', 'Gutaiteki ni wa, zangyou shite iru douryou ga iru to kaerinikui, to itta joukyou desu.', 'Konkretnya, situasi seperti sungkan pulang karena ada rekan yang lembur.'],
    ['集団の調和を保つ働きもあります。', 'Shuudan no chouwa o tamotsu hataraki mo arimasu.', 'Ada juga fungsinya menjaga keharmonisan kelompok.'],
    ['しかし、個人の意見を抑えてしまう危険性も指摘されています。', 'Shikashi, kojin no iken o osaete shimau kikensei mo shiteki sarete imasu.', 'Namun, bahaya menekan pendapat individu juga ditunjukkan.'],
  ]],
  ['Wawancara lanjutan', ['Pertanyaan sulit: jawab jujur, tunjukkan refleksi dan perbaikan.', 'Struktur STAR: situasi, tugas, tindakan, hasil.'], [
    ['これまでで一番大きな失敗は何ですか。', 'Kore made de ichiban ookina shippai wa nan desu ka.', 'Apa kegagalan terbesar Anda selama ini?'],
    ['前職で、納期を守れなかったことがあります。', 'Zenshoku de, nouki o mamorenakatta koto ga arimasu.', 'Di pekerjaan sebelumnya, saya pernah gagal menepati tenggat.'],
    ['その経験から、何を学びましたか。', 'Sono keiken kara, nani o manabimashita ka.', 'Apa yang Anda pelajari dari pengalaman itu?'],
    ['早い段階で問題を共有することの大切さを学びました。', 'Hayai dankai de mondai o kyouyuu suru koto no taisetsusa o manabimashita.', 'Saya belajar pentingnya berbagi masalah sejak tahap awal.'],
  ]],
  ['Negosiasi', ['Negosiasi: pahami kepentingan lawan, tawarkan alternatif, cari win-win.', 'Ungkapan: 〜という条件でしたら, ご検討いただけないでしょうか.'], [
    ['この価格では、正直なところ厳しいです。', 'Kono kakaku de wa, shoujiki na tokoro kibishii desu.', 'Dengan harga ini, terus terang berat bagi kami.'],
    ['数量を倍にしていただけるという条件でしたら、一割お引きできます。', 'Suuryou o bai ni shite itadakeru to iu jouken deshitara, ichiwari ohiki dekimasu.', 'Dengan syarat jumlahnya dilipatgandakan, kami bisa memberi potongan sepuluh persen.'],
    ['倍は難しいですが、一・五倍ならいかがでしょうか。', 'Bai wa muzukashii desu ga, itten go bai nara ikaga deshou ka.', 'Dua kali lipat sulit, tapi bagaimana kalau satu setengah kali?'],
    ['では、七パーセントでご検討いただけないでしょうか。', 'De wa, nana paasento de gokentou itadakenai deshou ka.', 'Kalau begitu, bisakah dipertimbangkan dengan tujuh persen?'],
  ]],
  ['Menjelaskan risiko', ['Jelaskan risiko: kemungkinan → dampak → pencegahan.', 'Ungkapan: 〜おそれがあります, 〜かねません, 万一の場合.'], [
    ['このまま放置すると、データが流出するおそれがあります。', 'Kono mama houchi suru to, deeta ga ryuushutsu suru osore ga arimasu.', 'Jika dibiarkan, ada risiko data bocor.'],
    ['そうなれば、顧客の信頼を失いかねません。', 'Sou nareba, kokyaku no shinrai o ushinai kanemasen.', 'Kalau sampai begitu, kepercayaan pelanggan bisa hilang.'],
    ['どのような対策が考えられますか。', 'Dono you na taisaku ga kangaeraremasu ka.', 'Langkah apa yang bisa dipertimbangkan?'],
    ['まずパスワードの管理を強化し、万一の場合に備えて手順を決めておくべきです。', 'Mazu pasuwaado no kanri o kyouka shi, man-ichi no baai ni sonaete tejun o kimete oku beki desu.', 'Pertama perketat pengelolaan kata sandi, dan tetapkan prosedur untuk berjaga-jaga.'],
  ]],
  ['Sebab dan akibat', ['Rantai sebab-akibat: A → B → C dengan その結果, それによって.', 'Bedakan penyebab langsung dan tidak langsung.'], [
    ['円安が進んだ結果、輸入品の価格が上がりました。', 'En-yasu ga susunda kekka, yunyuuhin no kakaku ga agarimashita.', 'Akibat yen melemah, harga barang impor naik.'],
    ['それによって、家計の負担が増えています。', 'Sore ni yotte, kakei no futan ga fuete imasu.', 'Karena itu, beban keuangan rumah tangga bertambah.'],
    ['一方で、外国人観光客は増えていますよね。', 'Ippou de, gaikokujin kankoukyaku wa fuete imasu yo ne.', 'Di sisi lain, wisatawan asing bertambah, ya.'],
    ['ええ、観光業にとってはプラスの影響と言えます。', 'Ee, kankougyou ni totte wa purasu no eikyou to iemasu.', 'Ya, bagi industri pariwisata bisa dikatakan dampak positif.'],
  ]],
  ['Sudut pandang pemangku kepentingan', ['Analisis dari berbagai pihak: 利用者, 企業, 行政, 地域住民.', 'Ungkapan: 〜の立場から見ると, 〜にとっては.'], [
    ['ライドシェアの解禁について、どう思いますか。', 'Raido shea no kaikin ni tsuite, dou omoimasu ka.', 'Bagaimana pendapat Anda tentang dilegalkannya ride sharing?'],
    ['利用者の立場から見ると、選択肢が増えるのはいいことです。', 'Riyousha no tachiba kara miru to, sentakushi ga fueru no wa ii koto desu.', 'Dari sudut pandang pengguna, bertambahnya pilihan itu bagus.'],
    ['ただ、タクシー業界にとっては大きな打撃になります。', 'Tada, takushii gyoukai ni totte wa ookina dageki ni narimasu.', 'Hanya saja, bagi industri taksi itu pukulan besar.'],
    ['行政には、安全基準をどう守るかという課題もありますね。', 'Gyousei ni wa, anzen kijun o dou mamoru ka to iu kadai mo arimasu ne.', 'Pemerintah juga punya tantangan bagaimana menjaga standar keselamatan.'],
  ]],
  ['Sanggahan', ['Sanggahan: akui poin lawan → tunjukkan kelemahan → beri bukti.', 'Ungkapan: 一理ありますが, それは必ずしも〜とは限りません.'], [
    ['ゲームは子どもの学力を下げると言われています。', 'Geemu wa kodomo no gakuryoku o sageru to iwarete imasu.', 'Katanya game menurunkan prestasi belajar anak.'],
    ['一理ありますが、必ずしもそうとは限りません。', 'Ichiri arimasu ga, kanarazushimo sou to wa kagirimasen.', 'Ada benarnya, tapi belum tentu begitu.'],
    ['時間を決めて遊べば、問題ないという研究もあります。', 'Jikan o kimete asobeba, mondai nai to iu kenkyuu mo arimasu.', 'Ada juga penelitian yang menyatakan tidak masalah jika waktu bermainnya dibatasi.'],
    ['要は、使い方の問題だということですね。', 'You wa, tsukaikata no mondai da to iu koto desu ne.', 'Intinya, ini soal cara penggunaannya.'],
  ]],
  ['Presentasi formal', ['Presentasi formal: salam → tujuan → isi bertahap → ringkasan → tanya jawab.', 'Ungkapan transisi: 続きまして, 以上を踏まえて, まとめますと.'], [
    ['続きまして、具体的な施策についてご説明いたします。', 'Tsuzukimashite, gutaiteki na shisaku ni tsuite gosetsumei itashimasu.', 'Selanjutnya, saya akan menjelaskan langkah-langkah konkret.'],
    ['第一の施策は、社員研修の充実です。', 'Daiichi no shisaku wa, shain kenshuu no juujitsu desu.', 'Langkah pertama adalah memperkaya pelatihan karyawan.'],
    ['以上を踏まえて、三年間の計画を立てました。', 'Ijou o fumaete, sannenkan no keikaku o tatemashita.', 'Berdasarkan hal di atas, kami menyusun rencana tiga tahun.'],
    ['まとめますと、人材への投資が成長の鍵となります。', 'Matomemasu to, jinzai e no toushi ga seichou no kagi to narimasu.', 'Singkatnya, investasi pada SDM menjadi kunci pertumbuhan.'],
  ]],
  ['Menangani tanya jawab', ['Tanya jawab: terima kasih atas pertanyaan → jawab inti → tawarkan detail.', 'Jika tidak tahu: 確認して後ほどお答えします.'], [
    ['貴重なご質問、ありがとうございます。', 'Kichou na goshitsumon, arigatou gozaimasu.', 'Terima kasih atas pertanyaan yang berharga.'],
    ['ご指摘の点については、現在検討中です。', 'Goshiteki no ten ni tsuite wa, genzai kentouchuu desu.', 'Hal yang Anda sampaikan sedang kami pertimbangkan.'],
    ['詳しいデータは、手元にございませんので、後ほどお送りします。', 'Kuwashii deeta wa, temoto ni gozaimasen node, nochihodo ookuri shimasu.', 'Data rincinya tidak ada di tangan saya, jadi akan saya kirimkan nanti.'],
    ['ほかにご質問はございませんか。', 'Hoka ni goshitsumon wa gozaimasen ka.', 'Apakah ada pertanyaan lain?'],
  ]],
  ['Memperbaiki nuansa', ['Jika ucapan disalahpahami, perbaiki nuansa: 言い方が悪かったです, 〜という意味ではなく.', 'Tenang dan jelaskan maksud sebenarnya.'], [
    ['さっきの発言、ちょっと気になったんですが。', 'Sakki no hatsugen, chotto ki ni nattan desu ga.', 'Ucapan tadi agak mengganjal bagi saya.'],
    ['すみません、言い方が悪かったです。', 'Sumimasen, iikata ga warukatta desu.', 'Maaf, cara bicara saya kurang tepat.'],
    ['反対という意味ではなく、もう少し時間がほしいという意味でした。', 'Hantai to iu imi de wa naku, mou sukoshi jikan ga hoshii to iu imi deshita.', 'Maksudnya bukan menolak, tapi ingin sedikit lebih banyak waktu.'],
    ['そうでしたか。誤解してすみません。', 'Sou deshita ka. Gokai shite sumimasen.', 'Oh begitu. Maaf saya salah paham.'],
  ]],
  ['Bicara persuasif', ['Persuasi: masalah yang dirasakan pendengar → solusi → bukti → ajakan.', 'Ungkapan: 皆さんも〜ではありませんか, ぜひ〜してみてください.'], [
    ['皆さんも、朝の満員電車に疲れていませんか。', 'Minasan mo, asa no man-in densha ni tsukarete imasen ka.', 'Apakah Anda semua juga tidak lelah dengan kereta penuh di pagi hari?'],
    ['時差出勤を取り入れれば、そのストレスは大きく減ります。', 'Jisa shukkin o toriirereba, sono sutoresu wa ookiku herimasu.', 'Jika menerapkan jam kerja bergeser, stres itu akan berkurang drastis.'],
    ['実際に導入した企業では、生産性が上がったそうです。', 'Jissai ni dounyuu shita kigyou de wa, seisansei ga agatta sou desu.', 'Di perusahaan yang benar-benar menerapkannya, produktivitas katanya naik.'],
    ['ぜひ、私たちの職場でも試してみませんか。', 'Zehi, watashitachi no shokuba demo tameshite mimasen ka.', 'Bagaimana kalau kita coba juga di tempat kerja kita?'],
  ]],
  ['Sintesis pendapat', ['Sintesis: rangkum beberapa pendapat, temukan titik temu, usulkan arah.', 'Ungkapan: 皆さんのご意見をまとめると, 共通しているのは.'], [
    ['皆さんのご意見をまとめると、三つに分けられます。', 'Minasan no goiken o matomeru to, mittsu ni wakeraremasu.', 'Kalau dirangkum, pendapat Anda semua terbagi tiga.'],
    ['共通しているのは、顧客満足を最優先にする点です。', 'Kyoutsuu shite iru no wa, kokyaku manzoku o saiyuusen ni suru ten desu.', 'Kesamaannya adalah mengutamakan kepuasan pelanggan.'],
    ['違いは、そのための手段にあるようです。', 'Chigai wa, sono tame no shudan ni aru you desu.', 'Perbedaannya tampaknya ada pada caranya.'],
    ['では、それぞれの案を小規模で試してから決めましょう。', 'De wa, sorezore no an o shoukibo de tameshite kara kimemashou.', 'Kalau begitu, mari coba setiap usulan dalam skala kecil sebelum memutuskan.'],
  ]],
  ['Ulasan speaking N2', ['Gabungkan: pendapat abstrak, data, sanggahan, dan sintesis.', 'Jaga register formal sepanjang diskusi.'], [
    ['AIの普及は、私たちの仕事を奪うのでしょうか。', 'Eeai no fukyuu wa, watashitachi no shigoto o ubau no deshou ka.', 'Apakah meluasnya AI akan merebut pekerjaan kita?'],
    ['単純作業は減るかもしれませんが、新しい仕事も生まれるはずです。', 'Tanjun sagyou wa heru kamo shiremasen ga, atarashii shigoto mo umareru hazu desu.', 'Pekerjaan sederhana mungkin berkurang, tapi seharusnya pekerjaan baru juga lahir.'],
    ['ただ、移行期に取り残される人への支援が欠かせませんね。', 'Tada, ikouki ni torinokosareru hito e no shien ga kakasemasen ne.', 'Hanya saja, dukungan bagi yang tertinggal di masa transisi tak boleh dilupakan.'],
    ['おっしゃる通りです。学び直しの機会を増やすべきだと思います。', 'Ossharu toori desu. Manabinaoshi no kikai o fuyasu beki da to omoimasu.', 'Benar sekali. Menurut saya kesempatan belajar ulang harus diperbanyak.'],
  ]],
];
