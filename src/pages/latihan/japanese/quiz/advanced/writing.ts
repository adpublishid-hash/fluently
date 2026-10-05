import type { JapaneseQuizTopic } from '../types';

// Latihan Writing N2 — one entry per topic (index = topic - 1): [Basic, Advanced].
export const writing: JapaneseQuizTopic[] = [
  // 1. Esai opini formal
  [
    [
      ["筆者は〜と考える", "Hissha wa ~ to kangaeru", "penulis berpendapat ..."],
      ["論点を絞る", "Ronten o shiboru", "memfokuskan pokok bahasan"],
      ["以上の理由から", "Ijou no riyuu kara", "berdasarkan alasan di atas"],
      ["賛否が分かれる", "Sanpi ga wakareru", "pendapat pro dan kontra terbelah", ["Dalam esai formal, akhir kalimat yang tepat adalah...", "bentuk である", "bentuk desu/masu", "bentuk santai じゃん", "bentuk よね"]],
    ],
    [
      ["制服の是非については、賛否が分かれている。", "Seifuku no zehi ni tsuite wa, sanpi ga wakarete iru.", "Mengenai baik-buruknya seragam sekolah, pendapat pro dan kontra terbelah."],
      ["筆者は、制服の着用は生徒の選択に任せるべきだと考える。", "Hissha wa, seifuku no chakuyou wa seito no sentaku ni makaseru beki da to kangaeru.", "Penulis berpendapat pemakaian seragam sebaiknya diserahkan pada pilihan siswa.", ["Pendapat (tesis) penulis tentang seragam adalah...", "diserahkan pada pilihan siswa", "wajib untuk semua", "dihapus sepenuhnya", "hanya untuk guru"]],
      ["確かに、制服には経済的な負担を減らすという利点もある。", "Tashika ni, seifuku ni wa keizaiteki na futan o herasu to iu riten mo aru.", "Memang, seragam juga punya kelebihan mengurangi beban ekonomi."],
      ["以上の理由から、一律の強制は見直すべきである。", "Ijou no riyuu kara, ichiritsu no kyousei wa minaosu beki de aru.", "Berdasarkan alasan di atas, pemaksaan yang seragam sebaiknya ditinjau ulang."],
    ],
  ],
  // 2. Proposal bisnis
  [
    [
      ["企画書", "Kikakusho", "dokumen proposal"],
      ["費用対効果が高い", "Hiyou tai kouka ga takai", "efektivitas biayanya tinggi"],
      ["導入を提案する", "Dounyuu o teian suru", "mengusulkan penerapan"],
      ["効果が見込める", "Kouka ga mikomeru", "efeknya bisa diharapkan", ["Urutan proposal bisnis yang umum adalah...", "latar → masalah → solusi → anggaran → efek", "anggaran → salam → selesai", "efek → tanda tangan", "masalah saja"]],
    ],
    [
      ["社内の会議資料は、現在すべて紙で配布されている。", "Shanai no kaigi shiryou wa, genzai subete kami de haifu sarete iru.", "Saat ini, semua bahan rapat internal dibagikan dalam bentuk kertas."],
      ["そこで、タブレット端末の導入を提案する。", "Soko de, taburetto tanmatsu no dounyuu o teian suru.", "Karena itu, kami mengusulkan penerapan perangkat tablet."],
      ["初期費用は八十万円だが、年間の印刷費を百二十万円削減できる。", "Shoki hiyou wa hachijuuman-en da ga, nenkan no insatsuhi o hyakunijuuman-en sakugen dekiru.", "Biaya awalnya delapan ratus ribu yen, tetapi biaya cetak tahunan bisa dihemat 1,2 juta yen.", ["Menurut proposal, penghematan biaya cetak per tahun adalah...", "1,2 juta yen", "800 ribu yen", "120 ribu yen", "8 juta yen"]],
      ["費用対効果の面からも、早期の導入が望まれる。", "Hiyou tai kouka no men kara mo, souki no dounyuu ga nozomareru.", "Dari segi efektivitas biaya pun, penerapan lebih awal diharapkan."],
    ],
  ],
  // 3. Notulen rapat
  [
    [
      ["出席者", "Shussekisha", "peserta yang hadir"],
      ["欠席者", "Kessekisha", "peserta yang absen"],
      ["継続審議", "Keizoku shingi", "pembahasan dilanjutkan"],
      ["担当者", "Tantousha", "penanggung jawab", ["Hal yang wajib ada dalam notulen adalah...", "keputusan dan tugas lanjutan", "lelucon peserta", "menu makan siang", "cuaca hari itu"]],
    ],
    [
      ["出席者は営業部五名、開発部三名の計八名であった。", "Shussekisha wa eigyoubu gomei, kaihatsubu sanmei no kei hachimei de atta.", "Peserta yang hadir berjumlah delapan orang: lima dari divisi penjualan dan tiga dari divisi pengembangan.", ["Menurut notulen, jumlah peserta yang hadir adalah...", "8 orang", "5 orang", "3 orang", "15 orang"]],
      ["新商品の価格については、意見がまとまらず継続審議となった。", "Shinshouhin no kakaku ni tsuite wa, iken ga matomarazu keizoku shingi to natta.", "Mengenai harga produk baru, pendapat tidak bulat sehingga pembahasan dilanjutkan."],
      ["市場調査の結果は、山田さんが来週までに報告する。", "Shijou chousa no kekka wa, Yamada san ga raishuu made ni houkoku suru.", "Hasil riset pasar akan dilaporkan oleh Yamada paling lambat minggu depan."],
      ["次回の会議は、六月二日の午後に開催する予定である。", "Jikai no kaigi wa, rokugatsu futsuka no gogo ni kaisai suru yotei de aru.", "Rapat berikutnya dijadwalkan pada siang hari 2 Juni."],
    ],
  ],
  // 4. Tanggapan atas kebijakan
  [
    [
      ["意見を述べたい", "Iken o nobetai", "ingin menyampaikan pendapat"],
      ["趣旨には賛同する", "Shushi ni wa sandou suru", "setuju dengan maksudnya"],
      ["懸念される", "Kenen sareru", "dikhawatirkan"],
      ["改善を求める", "Kaizen o motomeru", "menuntut perbaikan", ["Tanggapan kebijakan yang baik berurutan...", "rangkum kebijakan → evaluasi → usulan", "usulan → salam", "kritik tanpa alasan", "cerita pribadi saja"]],
    ],
    [
      ["市はごみ袋の有料化を来年度から実施すると発表した。", "Shi wa gomibukuro no yuuryouka o rainendo kara jisshi suru to happyou shita.", "Kota mengumumkan kantong sampah akan berbayar mulai tahun fiskal depan."],
      ["ごみを減らすという趣旨には賛同する。", "Gomi o herasu to iu shushi ni wa sandou suru.", "Saya setuju dengan maksud untuk mengurangi sampah."],
      ["しかし、不法投棄が増えることが懸念される。", "Shikashi, fuhou touki ga fueru koto ga kenen sareru.", "Namun, dikhawatirkan pembuangan sampah ilegal akan bertambah.", ["Kekhawatiran penulis tentang kebijakan itu adalah...", "pembuangan sampah ilegal bertambah", "harga kantong terlalu murah", "sampah berkurang terlalu cepat", "petugas kebanyakan"]],
      ["導入と同時に、監視体制の強化を求めたい。", "Dounyuu to douji ni, kanshi taisei no kyouka o motometai.", "Bersamaan dengan penerapannya, saya ingin menuntut penguatan sistem pengawasan."],
    ],
  ],
  // 5. Komentar data
  [
    [
      ["横ばいで推移する", "Yokobai de suii suru", "bergerak mendatar"],
      ["減少に転じる", "Genshou ni tenjiru", "berbalik menurun"],
      ["割合を占める", "Wariai o shimeru", "menempati proporsi"],
      ["読み取れる", "Yomitoreru", "bisa dibaca (dari data)", ["Ungkapan 横ばい dalam komentar data berarti...", "stagnan / mendatar", "naik tajam", "turun tajam", "berfluktuasi liar"]],
    ],
    [
      ["国内の映画館の入場者数は、十年間ほぼ横ばいで推移していた。", "Kokunai no eigakan no nyuujousha suu wa, juunenkan hobo yokobai de suii shite ita.", "Jumlah penonton bioskop dalam negeri bergerak hampir mendatar selama sepuluh tahun."],
      ["しかし、二〇二〇年に急激な減少に転じた。", "Shikashi, nisen nijuu nen ni kyuugeki na genshou ni tenjita.", "Namun, pada tahun 2020 berbalik menurun drastis."],
      ["一方、動画配信サービスの利用者は全体の六割を占めるまでになった。", "Ippou, douga haishin saabisu no riyousha wa zentai no rokuwari o shimeru made ni natta.", "Sementara itu, pengguna layanan streaming video sampai menempati enam puluh persen dari keseluruhan.", ["Menurut data, pengguna streaming video menempati...", "60% dari keseluruhan", "6% dari keseluruhan", "16% dari keseluruhan", "seluruhnya"]],
      ["このことから、映画を見る場所が変化していることが読み取れる。", "Kono koto kara, eiga o miru basho ga henka shite iru koto ga yomitoreru.", "Dari hal ini bisa dibaca bahwa tempat menonton film sedang berubah."],
    ],
  ],
  // 6. Argumen dengan sanggahan
  [
    [
      ["一理ある", "Ichiri aru", "ada benarnya"],
      ["役立つ面もある", "Yakudatsu men mo aru", "ada juga sisi bergunanya"],
      ["見過ごせない", "Misugosenai", "tidak bisa dibiarkan"],
      ["反論を想定する", "Hanron o soutei suru", "mengantisipasi sanggahan", ["Tujuan menyertakan sanggahan dalam argumen adalah...", "membuat argumen lebih kuat dan adil", "membingungkan pembaca", "memperpanjang tulisan", "mengubah topik"]],
    ],
    [
      ["スマートフォンは子どもの学習の妨げになるという意見がある。", "Sumaatofon wa kodomo no gakushuu no samatage ni naru to iu iken ga aru.", "Ada pendapat bahwa ponsel pintar mengganggu belajar anak."],
      ["長時間の使用が集中力を奪うという指摘には一理ある。", "Choujikan no shiyou ga shuuchuuryoku o ubau to iu shiteki ni wa ichiri aru.", "Tudingan bahwa pemakaian lama merampas konsentrasi ada benarnya."],
      ["とはいえ、辞書や学習アプリとして役立つ面も見過ごせない。", "To wa ie, jisho ya gakushuu apuri to shite yakudatsu men mo misugosenai.", "Meskipun begitu, sisi kegunaannya sebagai kamus dan aplikasi belajar juga tidak bisa diabaikan."],
      ["重要なのは、禁止ではなく使い方を教えることである。", "Juuyou na no wa, kinshi de wa naku tsukaikata o oshieru koto de aru.", "Yang penting bukanlah melarang, melainkan mengajarkan cara memakainya.", ["Kesimpulan argumen tentang ponsel pintar adalah...", "ajarkan cara memakainya, bukan dilarang", "larang sepenuhnya", "biarkan tanpa aturan", "berikan ponsel lebih banyak"]],
    ],
  ],
  // 7. Ringkasan penelitian
  [
    [
      ["在籍する", "Zaiseki suru", "terdaftar (sebagai mahasiswa)"],
      ["調査対象", "Chousa taishou", "subjek survei"],
      ["を明らかにした", "O akiraka ni shita", "mengungkap"],
      ["今後の課題", "Kongo no kadai", "tantangan ke depan", ["Saat merangkum penelitian, ungkapan と指摘している dipakai untuk...", "menyampaikan temuan peneliti lain", "menyampaikan pendapat pribadi", "memberi perintah", "menulis salam"]],
    ],
    [
      ["佐藤（二〇二一）は、外国人留学生の就職活動について調査した。", "Satou (nisen nijuuichi) wa, gaikokujin ryuugakusei no shuushoku katsudou ni tsuite chousa shita.", "Sato (2021) meneliti kegiatan mencari kerja mahasiswa asing."],
      ["調査対象は、都内の大学に在籍する留学生二百名である。", "Chousa taishou wa, tonai no daigaku ni zaiseki suru ryuugakusei nihyakumei de aru.", "Subjek survei adalah dua ratus mahasiswa asing yang terdaftar di universitas di Tokyo."],
      ["その結果、面接での敬語の使用が大きな壁であることを明らかにした。", "Sono kekka, mensetsu de no keigo no shiyou ga ookina kabe de aru koto o akiraka ni shita.", "Hasilnya mengungkap bahwa penggunaan bahasa hormat dalam wawancara adalah hambatan besar.", ["Menurut penelitian Sato, hambatan besar bagi mahasiswa asing adalah...", "penggunaan bahasa hormat saat wawancara", "biaya hidup", "jarak ke kampus", "kurangnya lowongan"]],
      ["支援の方法については、今後の課題として残されている。", "Shien no houhou ni tsuite wa, kongo no kadai to shite nokosarete iru.", "Cara memberikan dukungan masih tersisa sebagai tantangan ke depan."],
    ],
  ],
  // 8. Permintaan formal
  [
    [
      ["ご協力を賜りたく", "Gokyouryoku o tamawaritaku", "kami mohon kerja samanya"],
      ["お願い申し上げます", "Onegai moushiagemasu", "dengan hormat kami mohon"],
      ["謝礼をお支払いいたします", "Sharei o oshiharai itashimasu", "kami akan membayar honorarium"],
      ["ご都合のよい日時", "Gotsugou no yoi nichiji", "waktu yang sesuai bagi Anda", ["Urutan surat permintaan formal yang baik adalah...", "alasan → permintaan → syarat → terima kasih", "permintaan → ancaman", "terima kasih saja", "syarat → pamit"]],
    ],
    [
      ["弊社では、地域の高齢者向けにパソコン教室を開いております。", "Heisha de wa, chiiki no koureisha muke ni pasokon kyoushitsu o hiraite orimasu.", "Perusahaan kami membuka kelas komputer untuk lansia di daerah."],
      ["つきましては、講師として田中様にご協力を賜りたく、ご連絡いたしました。", "Tsukimashite wa, koushi to shite Tanaka sama ni gokyouryoku o tamawaritaku, gorenraku itashimashita.", "Sehubungan dengan itu, kami menghubungi karena memohon kerja sama Bapak/Ibu Tanaka sebagai pengajar.", ["Permintaan dalam surat itu adalah meminta Tanaka menjadi...", "pengajar", "peserta", "sponsor dana", "penerjemah"]],
      ["謝礼として、一回につき五千円をお支払いいたします。", "Sharei to shite, ikkai ni tsuki gosen-en o oshiharai itashimasu.", "Sebagai honorarium, kami akan membayar lima ribu yen per pertemuan."],
      ["お引き受けいただけるかどうか、今月中にお返事をいただけますと幸いです。", "Ohikiuke itadakeru ka dou ka, kongetsuchuu ni ohenji o itadakemasu to saiwai desu.", "Kami akan senang bila Anda dapat memberi jawaban dalam bulan ini apakah bersedia menerima."],
    ],
  ],
  // 9. Menanggapi keluhan
  [
    [
      ["ご不快な思いをおかけし", "Gofukai na omoi o okake shi", "telah membuat Anda tidak nyaman"],
      ["事情を確認いたしました", "Jijou o kakunin itashimashita", "kami telah memastikan duduk perkaranya"],
      ["再発防止に努めます", "Saihatsu boushi ni tsutomemasu", "kami berupaya mencegah terulang"],
      ["ご指摘いただいた件", "Goshiteki itadaita ken", "hal yang Anda tunjukkan", ["Tanggapan keluhan sebaiknya berurutan...", "maaf → penyebab → tindakan → pencegahan", "alasan → menyalahkan pelanggan", "tindakan saja", "promosi produk baru"]],
    ],
    [
      ["先日は、当店スタッフの対応によりご不快な思いをおかけし、深くお詫び申し上げます。", "Senjitsu wa, touten sutaffu no taiou ni yori gofukai na omoi o okake shi, fukaku owabi moushiagemasu.", "Kami memohon maaf sedalam-dalamnya karena pelayanan staf kami tempo hari membuat Anda tidak nyaman."],
      ["ご指摘いただいた件について、担当者から事情を確認いたしました。", "Goshiteki itadaita ken ni tsuite, tantousha kara jijou o kakunin itashimashita.", "Mengenai hal yang Anda tunjukkan, kami sudah memastikan duduk perkaranya dari staf yang bertugas."],
      ["混雑時の人員不足により、説明が不十分であったことが分かりました。", "Konzatsuji no jinin busoku ni yori, setsumei ga fujuubun de atta koto ga wakarimashita.", "Diketahui bahwa penjelasannya kurang karena kekurangan staf saat ramai.", ["Menurut surat, penyebab masalahnya adalah...", "kekurangan staf saat ramai", "produk rusak", "pelanggan salah", "sistem komputer error"]],
      ["今後は接客研修を徹底し、再発防止に努めます。", "Kongo wa sekkyaku kenshuu o tettei shi, saihatsu boushi ni tsutomemasu.", "Ke depan kami akan menuntaskan pelatihan pelayanan dan berupaya mencegah terulang."],
    ],
  ],
  // 10. Menjelaskan konsep abstrak
  [
    [
      ["とは〜を指す", "To wa ~ o sasu", "... merujuk pada ..."],
      ["具体例を挙げる", "Gutairei o ageru", "memberikan contoh konkret"],
      ["言い換えると", "Iikaeru to", "dengan kata lain"],
      ["混同されやすい", "Kondou sareyasui", "mudah dicampuradukkan", ["Urutan penjelasan konsep abstrak yang baik adalah...", "definisi → contoh konkret → batas", "contoh → salam", "batas saja", "kesimpulan → definisi"]],
    ],
    [
      ["「持続可能性」とは、将来の世代の暮らしを損なわずに発展を続けることを指す。", "\"Jizoku kanousei\" to wa, shourai no sedai no kurashi o sokonawazu ni hatten o tsuzukeru koto o sasu.", "\"Keberlanjutan\" merujuk pada terus berkembang tanpa merusak kehidupan generasi mendatang."],
      ["具体的には、森林を伐採した分だけ植林する取り組みなどが挙げられる。", "Gutaiteki ni wa, shinrin o bassai shita bun dake shokurin suru torikumi nado ga agerareru.", "Secara konkret, contohnya upaya menanam kembali hutan sebanyak yang ditebang."],
      ["言い換えると、今の便利さを未来から借りないということだ。", "Iikaeru to, ima no benrisa o mirai kara karinai to iu koto da.", "Dengan kata lain, tidak meminjam kenyamanan masa kini dari masa depan.", ["Inti konsep 'keberlanjutan' menurut teks adalah...", "tidak merusak kehidupan generasi mendatang", "pertumbuhan secepat mungkin", "menebang hutan lebih banyak", "hidup tanpa teknologi"]],
      ["ただし、単なる節約と混同されやすい点には注意したい。", "Tadashi, tannaru setsuyaku to kondou sareyasui ten ni wa chuui shitai.", "Namun, perlu diperhatikan bahwa konsep ini mudah dicampuradukkan dengan sekadar berhemat."],
    ],
  ],
  // 11. Profil profesional
  [
    [
      ["に従事する", "Ni juuji suru", "bergelut di / bekerja di bidang"],
      ["実績を積む", "Jisseki o tsumu", "menumpuk prestasi kerja"],
      ["強みを生かす", "Tsuyomi o ikasu", "memanfaatkan kekuatan"],
      ["資格を取得する", "Shikaku o shutoku suru", "memperoleh sertifikasi", ["Profil profesional sebaiknya berurutan...", "posisi sekarang → pengalaman → keahlian → tujuan", "hobi → makanan favorit", "tujuan saja", "gaji yang diinginkan"]],
    ],
    [
      ["大学卒業後、八年間ホテル業界で接客業務に従事してきた。", "Daigaku sotsugyougo, hachinenkan hoteru gyoukai de sekkyaku gyoumu ni juuji shite kita.", "Setelah lulus kuliah, saya bekerja di bidang pelayanan tamu di industri perhotelan selama delapan tahun.", ["Menurut profil, pengalaman kerja di industri hotel adalah...", "8 tahun", "3 tahun", "18 tahun", "1 tahun"]],
      ["フロント主任として、新人の育成でも実績を積んだ。", "Furonto shunin to shite, shinjin no ikusei de mo jisseki o tsunda.", "Sebagai kepala resepsionis, saya juga menumpuk prestasi dalam membina karyawan baru."],
      ["在職中に、通訳案内士の資格を取得した。", "Zaishokuchuu ni, tsuuyaku annaishi no shikaku o shutoku shita.", "Selama bekerja, saya memperoleh sertifikasi pemandu wisata penerjemah."],
      ["今後は語学力という強みを生かし、観光の分野で貢献したい。", "Kongo wa gogakuryoku to iu tsuyomi o ikashi, kankou no bunya de kouken shitai.", "Ke depan, saya ingin berkontribusi di bidang pariwisata dengan memanfaatkan kekuatan kemampuan bahasa."],
    ],
  ],
  // 12. Analisis risiko
  [
    [
      ["想定されるリスク", "Soutei sareru risuku", "risiko yang diperkirakan"],
      ["発生する可能性", "Hassei suru kanousei", "kemungkinan terjadi"],
      ["影響が大きい", "Eikyou ga ookii", "dampaknya besar"],
      ["顧客の流出", "Kokyaku no ryuushutsu", "hilangnya pelanggan", ["Urutan analisis risiko yang tepat adalah...", "identifikasi → kemungkinan → dampak → penanganan", "penanganan → identifikasi", "dampak saja", "salam → selesai"]],
    ],
    [
      ["新店舗の出店にあたって想定されるリスクを整理する。", "Shintenpo no shutten ni atatte soutei sareru risuku o seiri suru.", "Kami merangkum risiko yang diperkirakan dalam membuka toko baru."],
      ["近隣に競合店が出店する可能性は、決して低くない。", "Kinrin ni kyougouten ga shutten suru kanousei wa, kesshite hikuku nai.", "Kemungkinan toko pesaing dibuka di dekatnya sama sekali tidak rendah."],
      ["その場合、売上への影響が大きいと考えられる。", "Sono baai, uriage e no eikyou ga ookii to kangaerareru.", "Dalam hal itu, dampaknya terhadap penjualan diperkirakan besar.", ["Menurut analisis, risiko utama toko baru adalah...", "dibukanya toko pesaing di dekatnya", "gempa bumi", "kenaikan pajak", "kekurangan listrik"]],
      ["会員制度を充実させ、顧客の流出を未然に防ぐ必要がある。", "Kaiin seido o juujitsu sase, kokyaku no ryuushutsu o mizen ni fusegu hitsuyou ga aru.", "Perlu memperkuat sistem keanggotaan untuk mencegah hilangnya pelanggan sebelum terjadi."],
    ],
  ],
  // 13. Memo pemangku kepentingan
  [
    [
      ["関係各位", "Kankei kakui", "kepada semua pihak terkait"],
      ["サービスを停止する", "Saabisu o teishi suru", "menghentikan layanan"],
      ["ご理解とご協力", "Gorikai to gokyouryoku", "pengertian dan kerja sama"],
      ["影響を受ける", "Eikyou o ukeru", "terdampak", ["Memo untuk pemangku kepentingan sebaiknya menjelaskan...", "siapa terdampak, bagaimana, dan apa yang diminta", "cerita sejarah perusahaan", "gaji direktur", "resep makanan"]],
    ],
    [
      ["システムの更新に伴い、来週土曜日はサービスを停止します。", "Shisutemu no koushin ni tomonai, raishuu doyoubi wa saabisu o teishi shimasu.", "Seiring pembaruan sistem, layanan akan dihentikan pada hari Sabtu minggu depan.", ["Menurut memo, layanan dihentikan karena...", "pembaruan sistem", "libur nasional", "pindah kantor", "kekurangan staf"]],
      ["この間、オンラインでの注文は受け付けられません。", "Kono aida, onrain de no chuumon wa uketsukeraremasen.", "Selama itu, pesanan daring tidak dapat diterima."],
      ["特に、定期購入のお客様は影響を受けるおそれがあります。", "Toku ni, teiki kounyuu no okyakusama wa eikyou o ukeru osore ga arimasu.", "Terutama, pelanggan langganan berkala mungkin terdampak."],
      ["関係各位のご理解とご協力をお願いいたします。", "Kankei kakui no gorikai to gokyouryoku o onegai itashimasu.", "Kami mohon pengertian dan kerja sama dari semua pihak terkait."],
    ],
  ],
  // 14. Email persuasif
  [
    [
      ["お役に立てる", "Oyaku ni tateru", "bisa membantu (Anda)"],
      ["導入実績", "Dounyuu jisseki", "rekam jejak penerapan"],
      ["無料でお試しいただけます", "Muryou de otameshi itadakemasu", "bisa dicoba gratis"],
      ["お気軽にご相談ください", "Okigaru ni gosoudan kudasai", "silakan berkonsultasi dengan santai", ["Email persuasif sebaiknya dimulai dengan...", "manfaat bagi penerima", "permintaan langsung", "harga produk", "keluhan"]],
    ],
    [
      ["弊社の勤怠管理システムなら、毎月の集計作業を半分に減らせます。", "Heisha no kintai kanri shisutemu nara, maitsuki no shuukei sagyou o hanbun ni herasemasu.", "Dengan sistem manajemen kehadiran kami, pekerjaan rekap bulanan bisa dikurangi separuhnya.", ["Manfaat sistem itu menurut email adalah...", "pekerjaan rekap bulanan berkurang separuh", "gaji karyawan naik", "kantor lebih luas", "rapat lebih panjang"]],
      ["すでに三百社以上の導入実績がございます。", "Sude ni sanbyakusha ijou no dounyuu jisseki ga gozaimasu.", "Kami sudah memiliki rekam jejak penerapan di lebih dari tiga ratus perusahaan."],
      ["最初の一か月は、無料でお試しいただけます。", "Saisho no ikkagetsu wa, muryou de otameshi itadakemasu.", "Bulan pertama bisa dicoba secara gratis."],
      ["ご興味がございましたら、お気軽にご相談ください。", "Gokyoumi ga gozaimashitara, okigaru ni gosoudan kudasai.", "Jika berminat, silakan berkonsultasi dengan santai."],
    ],
  ],
  // 15. Tanggapan atas editorial
  [
    [
      ["社説の主張", "Shasetsu no shuchou", "klaim editorial"],
      ["一面的だ", "Ichimenteki da", "sepihak / hanya satu sisi"],
      ["根拠が乏しい", "Konkyo ga toboshii", "dasarnya lemah"],
      ["同意しかねる", "Doui shikaneru", "sulit untuk menyetujui", ["Ungkapan 同意しかねる menunjukkan penulis...", "tidak setuju dengan sopan", "sangat setuju", "belum membaca", "netral"]],
    ],
    [
      ["社説は、地方の小学校を統合すべきだと主張している。", "Shasetsu wa, chihou no shougakkou o tougou subeki da to shuchou shite iru.", "Editorial menyatakan bahwa sekolah dasar di daerah sebaiknya digabungkan."],
      ["しかし、その主張は経費の面からのみ論じられており、一面的だ。", "Shikashi, sono shuchou wa keihi no men kara nomi ronjirarete ori, ichimenteki da.", "Namun, klaim itu hanya dibahas dari segi biaya sehingga sepihak.", ["Menurut penulis, kelemahan editorial itu adalah...", "hanya membahas dari segi biaya", "terlalu panjang", "tidak memakai data biaya", "terlalu memihak anak"]],
      ["通学時間が長くなる子どもへの影響が考慮されていない。", "Tsuugaku jikan ga nagaku naru kodomo e no eikyou ga kouryo sarete inai.", "Dampak pada anak yang waktu perjalanan sekolahnya menjadi lama tidak dipertimbangkan."],
      ["したがって、筆者は社説の結論には同意しかねる。", "Shitagatte, hissha wa shasetsu no ketsuron ni wa doui shikaneru.", "Oleh karena itu, penulis sulit menyetujui kesimpulan editorial."],
    ],
  ],
  // 16. Menulis dengan kanji N2
  [
    [
      ["実施する", "Jisshi suru", "melaksanakan"],
      ["究明する", "Kyuumei suru", "mengusut"],
      ["削減する", "Sakugen suru", "memangkas"],
      ["徹底する", "Tettei suru", "menuntaskan / menerapkan secara menyeluruh", ["Kanji yang tepat untuk 'tettei suru' (menuntaskan) adalah...", "徹底する", "撤底する", "鉄底する", "徹定する"]],
    ],
    [
      ["来月、全社員を対象に防災訓練を実施する。", "Raigetsu, zenshain o taishou ni bousai kunren o jisshi suru.", "Bulan depan, pelatihan tanggap bencana akan dilaksanakan untuk seluruh karyawan."],
      ["品質を維持しながら、製造費を一割削減した。", "Hinshitsu o iji shinagara, seizouhi o ichiwari sakugen shita.", "Sambil mempertahankan kualitas, biaya produksi dipangkas sepuluh persen."],
      ["個人情報の管理を徹底するよう指示が出た。", "Kojin jouhou no kanri o tettei suru you shiji ga deta.", "Keluar instruksi untuk menerapkan pengelolaan data pribadi secara menyeluruh."],
      ["事故の原因を究明し、責任の所在を明確にする。", "Jiko no genin o kyuumei shi, sekinin no shozai o meikaku ni suru.", "Penyebab kecelakaan diusut dan letak tanggung jawabnya diperjelas."],
    ],
  ],
  // 17. Mengendalikan register
  [
    [
      ["極めて", "Kiwamete", "amat sangat (tulisan)"],
      ["および", "Oyobi", "serta / dan (tulisan)"],
      ["ではないだろうか", "De wa nai darou ka", "bukankah ... (tulisan)"],
      ["ゆえに", "Yue ni", "oleh sebab itu (tulisan)", ["Bentuk tulisan yang tepat untuk lisan 'すごく' adalah...", "極めて / 非常に", "めっちゃ", "超", "マジで"]],
    ],
    [
      ["この問題は、極めて深刻な状況にある。", "Kono mondai wa, kiwamete shinkoku na joukyou ni aru.", "Masalah ini berada dalam situasi yang amat sangat serius."],
      ["参加者の年齢および職業を調査した。", "Sankasha no nenrei oyobi shokugyou o chousa shita.", "Usia serta pekerjaan peserta diteliti."],
      ["原因は、情報の共有不足にあるのではないだろうか。", "Genin wa, jouhou no kyouyuu busoku ni aru no de wa nai darou ka.", "Bukankah penyebabnya terletak pada kurangnya berbagi informasi?"],
      ["今回の結果は、仮説を支持するものであった。", "Konkai no kekka wa, kasetsu o shiji suru mono de atta.", "Hasil kali ini mendukung hipotesis."],
    ],
  ],
  // 18. Kohesi
  [
    [
      ["このような", "Kono you na", "yang seperti ini"],
      ["前述の", "Zenjutsu no", "yang disebutkan sebelumnya"],
      ["それに加えて", "Sore ni kuwaete", "di samping itu"],
      ["試験的に導入する", "Shikenteki ni dounyuu suru", "menerapkan secara uji coba", ["Kata tunjuk この dalam tulisan berfungsi untuk...", "merujuk hal yang baru disebutkan", "memulai topik baru", "menutup tulisan", "menyapa pembaca"]],
    ],
    [
      ["多くの企業が、週休三日制を試験的に導入している。", "Ooku no kigyou ga, shuukyuu mikka sei o shikenteki ni dounyuu shite iru.", "Banyak perusahaan menerapkan sistem libur tiga hari seminggu secara uji coba."],
      ["このような制度は、社員の満足度を高めるとされる。", "Kono you na seido wa, shain no manzokudo o takameru to sareru.", "Sistem seperti ini disebut meningkatkan tingkat kepuasan karyawan."],
      ["それに加えて、優秀な人材の確保にも役立つ。", "Sore ni kuwaete, yuushuu na jinzai no kakuho ni mo yakudatsu.", "Di samping itu, juga berguna untuk mendapatkan SDM unggul."],
      ["前述の利点から、導入を検討する企業は今後も増えるだろう。", "Zenjutsu no riten kara, dounyuu o kentou suru kigyou wa kongo mo fueru darou.", "Karena kelebihan yang disebutkan sebelumnya, perusahaan yang mempertimbangkan penerapannya akan terus bertambah.", ["Frasa 前述の利点 merujuk pada...", "kepuasan karyawan dan mendapatkan SDM unggul", "biaya yang naik", "jam kerja lebih panjang", "kerugian perusahaan"]],
    ],
  ],
  // 19. Esai 500 karakter
  [
    [
      ["序論", "Joron", "pendahuluan"],
      ["本論", "Honron", "isi / pembahasan utama"],
      ["結論", "Ketsuron", "kesimpulan"],
      ["字数制限", "Jisuu seigen", "batas jumlah karakter", ["Susunan esai 500 karakter yang dianjurkan adalah...", "pendahuluan 1 paragraf, isi 2 paragraf, kesimpulan 1 paragraf", "satu paragraf panjang", "kesimpulan saja", "isi 5 paragraf tanpa kesimpulan"]],
    ],
    [
      ["近年、地方へ移住する若者が増えている。", "Kinnen, chihou e ijuu suru wakamono ga fuete iru.", "Belakangan ini, anak muda yang pindah ke daerah bertambah."],
      ["その理由の一つは、オンラインで働ける環境が整ったことだ。", "Sono riyuu no hitotsu wa, onrain de hatarakeru kankyou ga totonotta koto da.", "Salah satu alasannya adalah lingkungan kerja daring sudah tersedia.", ["Menurut esai, salah satu alasan anak muda pindah ke daerah adalah...", "lingkungan kerja daring sudah tersedia", "gaji di daerah lebih tinggi", "kota besar ditutup", "daerah tidak punya internet"]],
      ["また、自然の中で子育てをしたいと考える人も少なくない。", "Mata, shizen no naka de kosodate o shitai to kangaeru hito mo sukunaku nai.", "Selain itu, tidak sedikit orang yang ingin mengasuh anak di tengah alam."],
      ["地方の魅力を発信し続けることが、人口減少への一つの答えとなるだろう。", "Chihou no miryoku o hasshin shitsuzukeru koto ga, jinkou genshou e no hitotsu no kotae to naru darou.", "Terus menyebarkan pesona daerah mungkin menjadi salah satu jawaban atas penurunan penduduk."],
    ],
  ],
  // 20. Ulasan writing N2
  [
    [
      ["推敲する", "Suikou suru", "memoles / menyunting tulisan"],
      ["誤字脱字", "Goji datsuji", "salah ketik dan huruf yang hilang"],
      ["論理の飛躍", "Ronri no hiyaku", "lompatan logika"],
      ["一貫性", "Ikkansei", "konsistensi", ["Saat memeriksa tulisan, 'lompatan logika' berarti...", "kesimpulan tanpa dasar yang cukup", "salah ketik", "tulisan terlalu pendek", "huruf terlalu kecil"]],
    ],
    [
      ["書き終えたら、時間を置いてから推敲するとよい。", "Kakioetara, jikan o oite kara suikou suru to yoi.", "Setelah selesai menulis, sebaiknya disunting setelah memberi jeda waktu."],
      ["誤字脱字は、声に出して読むと見つけやすい。", "Goji datsuji wa, koe ni dashite yomu to mitsukeyasui.", "Salah ketik dan huruf yang hilang mudah ditemukan bila dibaca dengan suara keras.", ["Menurut teks, cara mudah menemukan salah ketik adalah...", "membaca dengan suara keras", "menulis lebih cepat", "memakai huruf besar", "tidak membaca ulang"]],
      ["論理の飛躍がないか、段落ごとに確かめる。", "Ronri no hiyaku ga nai ka, danraku goto ni tashikameru.", "Periksa setiap paragraf apakah ada lompatan logika."],
      ["文体の一貫性も、読みやすさを左右する。", "Buntai no ikkansei mo, yomiyasusa o sayuu suru.", "Konsistensi gaya bahasa juga menentukan kemudahan membaca."],
    ],
  ],
];
