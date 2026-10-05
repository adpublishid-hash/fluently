import type { JapaneseQuizTopic } from '../types';

// Latihan Reading N2 — one entry per topic (index = topic - 1): [Basic, Advanced].
export const reading: JapaneseQuizTopic[] = [
  // 1. Editorial N2
  [
    [
      ["叫ばれて久しい", "Sakebarete hisashii", "sudah lama diserukan"],
      ["依然として", "Izen to shite", "masih tetap"],
      ["率先して", "Sossen shite", "memelopori / memberi contoh"],
      ["見直しが求められる", "Minaoshi ga motomerareru", "dituntut peninjauan ulang", ["Ungkapan 〜べきではないか dalam editorial menunjukkan...", "tuntutan atau usulan penulis", "keraguan penulis", "fakta netral", "pertanyaan untuk pembaca menjawab"]],
    ],
    [
      ["食品ロスの削減が叫ばれて久しいが、状況は依然として改善していない。", "Shokuhin rosu no sakugen ga sakebarete hisashii ga, joukyou wa izen to shite kaizen shite inai.", "Pengurangan pemborosan makanan sudah lama diserukan, tetapi kondisinya masih belum membaik."],
      ["消費者の意識改革だけに頼るのは限界がある。", "Shouhisha no ishiki kaikaku dake ni tayoru no wa genkai ga aru.", "Bergantung hanya pada perubahan kesadaran konsumen ada batasnya."],
      ["企業こそが率先して販売の仕組みを見直すべきではないか。", "Kigyou koso ga sossen shite hanbai no shikumi o minaosu beki de wa nai ka.", "Bukankah justru perusahaan yang seharusnya memelopori peninjauan ulang sistem penjualan?", ["Menurut editorial, pihak yang seharusnya memelopori perubahan adalah...", "perusahaan", "konsumen saja", "pemerintah asing", "petani"]],
      ["社会全体で取り組む姿勢が求められている。", "Shakai zentai de torikumu shisei ga motomerarete iru.", "Dibutuhkan sikap menanganinya bersama seluruh masyarakat."],
    ],
  ],
  // 2. Ringkasan penelitian
  [
    [
      ["本研究の目的", "Hon kenkyuu no mokuteki", "tujuan penelitian ini"],
      ["を対象に", "O taishou ni", "terhadap (sasaran)"],
      ["傾向が見られた", "Keikou ga mirareta", "terlihat kecenderungan"],
      ["示唆される", "Shisa sareru", "diisyaratkan", ["Ringkasan penelitian biasanya berurutan...", "tujuan → metode → hasil → kesimpulan", "kesimpulan → salam", "hasil saja", "metode → pamit"]],
    ],
    [
      ["本研究の目的は、運動習慣とストレスの関係を明らかにすることである。", "Hon kenkyuu no mokuteki wa, undou shuukan to sutoresu no kankei o akiraka ni suru koto de aru.", "Tujuan penelitian ini adalah memperjelas hubungan kebiasaan olahraga dan stres."],
      ["会社員三百人を対象に、半年間の調査を行った。", "Kaishain sanbyakunin o taishou ni, hantoshikan no chousa o okonatta.", "Survei selama setengah tahun dilakukan terhadap tiga ratus karyawan."],
      ["その結果、週三回以上運動する人はストレスが低い傾向が見られた。", "Sono kekka, shuu sankai ijou undou suru hito wa sutoresu ga hikui keikou ga mirareta.", "Hasilnya, terlihat kecenderungan orang yang berolahraga tiga kali seminggu atau lebih stresnya rendah.", ["Menurut hasil penelitian, orang yang stresnya rendah adalah yang...", "berolahraga tiga kali seminggu atau lebih", "tidak berolahraga", "bekerja lembur", "tidur sedikit"]],
      ["定期的な運動が心の健康に役立つことが示唆される。", "Teikiteki na undou ga kokoro no kenkou ni yakudatsu koto ga shisa sareru.", "Diisyaratkan bahwa olahraga rutin berguna bagi kesehatan mental."],
    ],
  ],
  // 3. Laporan bisnis
  [
    [
      ["四半期", "Shihanki", "kuartal"],
      ["前年同期比", "Zennen douki hi", "dibanding periode yang sama tahun lalu"],
      ["主な要因", "Omo na youin", "faktor utama"],
      ["見込まれる", "Mikomareru", "diperkirakan", ["Kata 四半期 berarti...", "kuartal (tiga bulan)", "setengah tahun", "satu bulan", "satu minggu"]],
    ],
    [
      ["第三四半期の営業利益は、前年同期比で十二パーセント減少した。", "Dai san shihanki no eigyou rieki wa, zennen douki hi de juuni paasento genshou shita.", "Laba operasional kuartal ketiga turun dua belas persen dibanding periode yang sama tahun lalu.", ["Menurut laporan, laba kuartal ketiga...", "turun 12%", "naik 12%", "naik 3%", "tetap"]],
      ["主な要因は、原材料費の高騰である。", "Omo na youin wa, genzairyouhi no koutou de aru.", "Faktor utamanya adalah melonjaknya biaya bahan baku."],
      ["一方で、オンライン販売は順調に伸びている。", "Ippou de, onrain hanbai wa junchou ni nobite iru.", "Di sisi lain, penjualan daring tumbuh dengan lancar."],
      ["来期は価格の見直しにより、利益の回復が見込まれる。", "Raiki wa kakaku no minaoshi ni yori, rieki no kaifuku ga mikomareru.", "Periode depan, pemulihan laba diperkirakan melalui peninjauan harga."],
    ],
  ],
  // 4. Artikel kebijakan
  [
    [
      ["新設する", "Shinsetsu suru", "membuat (sistem) baru"],
      ["支給される", "Shikyuu sareru", "diberikan / dibayarkan"],
      ["との批判", "To no hihan", "kritik bahwa ..."],
      ["定住", "Teijuu", "menetap", ["Kata 支給される berarti...", "diberikan (uang/barang)", "dipotong", "dipinjam", "dijual"]],
    ],
    [
      ["国は、介護職員の給料を引き上げる制度を新設した。", "Kuni wa, kaigo shokuin no kyuuryou o hikiageru seido o shinsetsu shita.", "Negara membuat sistem baru untuk menaikkan gaji tenaga perawat lansia."],
      ["一人あたり月額一万円が上乗せして支給される。", "Hitori atari getsugaku ichiman-en ga uwanose shite shikyuu sareru.", "Tambahan sepuluh ribu yen per bulan diberikan kepada setiap orang.", ["Menurut artikel, tambahan gaji per orang adalah...", "10.000 yen per bulan", "10.000 yen per tahun", "1.000 yen per bulan", "100.000 yen per bulan"]],
      ["しかし、それだけでは人手不足は解消しないとの批判もある。", "Shikashi, sore dake de wa hitode busoku wa kaishou shinai to no hihan mo aru.", "Namun, ada kritik bahwa itu saja tidak akan mengatasi kekurangan tenaga kerja."],
      ["働く環境そのものの改善が急務だろう。", "Hataraku kankyou sono mono no kaizen ga kyuumu darou.", "Perbaikan lingkungan kerja itu sendiri mungkin hal yang mendesak."],
    ],
  ],
  // 5. Analisis argumen
  [
    [
      ["相関関係", "Soukan kankei", "korelasi"],
      ["因果関係", "Inga kankei", "hubungan sebab-akibat"],
      ["とは限らない", "To wa kagiranai", "belum tentu"],
      ["第三の要因", "Daisan no youin", "faktor ketiga", ["Kesalahan logika yang umum adalah menganggap korelasi sebagai...", "sebab-akibat", "kebetulan", "data palsu", "pendapat"]],
    ],
    [
      ["朝食を食べる学生は成績がよい、というデータがある。", "Choushoku o taberu gakusei wa seiseki ga yoi, to iu deeta ga aru.", "Ada data bahwa siswa yang sarapan nilainya bagus."],
      ["だから朝食を食べれば成績が上がる、と考えるのは早計だ。", "Dakara choushoku o tabereba seiseki ga agaru, to kangaeru no wa soukei da.", "Menyimpulkan bahwa sarapan otomatis menaikkan nilai itu terlalu terburu-buru."],
      ["生活リズムが整っているという第三の要因が考えられる。", "Seikatsu rizumu ga totonotte iru to iu daisan no youin ga kangaerareru.", "Bisa dipikirkan faktor ketiga, yaitu ritme hidup yang teratur.", ["Menurut penulis, faktor ketiga yang mungkin berpengaruh adalah...", "ritme hidup yang teratur", "jenis makanan", "jarak ke sekolah", "jumlah teman"]],
      ["相関関係と因果関係を区別して考える必要がある。", "Soukan kankei to inga kankei o kubetsu shite kangaeru hitsuyou ga aru.", "Perlu membedakan korelasi dan hubungan sebab-akibat."],
    ],
  ],
  // 6. Pengantar esai sastra
  [
    [
      ["懐かしい", "Natsukashii", "membangkitkan rindu"],
      ["呼び起こす", "Yobiokosu", "membangkitkan"],
      ["夕暮れ", "Yuugure", "senja"],
      ["かすかに", "Kasuka ni", "samar-samar", ["Esai sastra biasanya ditandai dengan...", "gambaran indah dan refleksi pribadi", "data statistik", "pasal hukum", "daftar harga"]],
    ],
    [
      ["冬の朝、窓の外は一面の雪で静まり返っていた。", "Fuyu no asa, mado no soto wa ichimen no yuki de shizumarikaette ita.", "Pagi musim dingin, di luar jendela sunyi tertutup salju sejauh mata memandang."],
      ["遠くから、かすかに鐘の音が聞こえてくる。", "Tooku kara, kasuka ni kane no oto ga kikoete kuru.", "Dari kejauhan, samar-samar terdengar suara lonceng."],
      ["その音が、祖母と過ごした日々を呼び起こした。", "Sono oto ga, sobo to sugoshita hibi o yobiokoshita.", "Suara itu membangkitkan hari-hari yang dilalui bersama nenek."],
      ["季節は巡っても、思い出は色あせることがない。", "Kisetsu wa megutte mo, omoide wa iroaseru koto ga nai.", "Meski musim berganti, kenangan tidak pernah memudar.", ["Perasaan yang dominan dalam esai itu adalah...", "kerinduan", "kemarahan", "ketakutan", "kegembiraan meluap"]],
    ],
  ],
  // 7. Bacaan abstrak
  [
    [
      ["がちである", "Gachi de aru", "cenderung (negatif)"],
      ["同時に", "Douji ni", "sekaligus"],
      ["本来", "Honrai", "pada hakikatnya / semestinya"],
      ["手間", "Tema", "jerih payah / kerepotan", ["Bacaan abstrak sering berusaha...", "mendefinisikan ulang konsep yang dianggap biasa", "memberi resep", "menjual produk", "melaporkan cuaca"]],
    ],
    [
      ["私たちは、速さを価値あるものと考えがちである。", "Watashitachi wa, hayasa o kachi aru mono to kangaegachi de aru.", "Kita cenderung menganggap kecepatan sebagai sesuatu yang berharga."],
      ["しかし、急ぐことで見落とすものも少なくない。", "Shikashi, isogu koto de miotosu mono mo sukunaku nai.", "Namun, tidak sedikit hal yang terlewat karena terburu-buru."],
      ["ゆっくり歩くときにしか見えない景色がある。", "Yukkuri aruku toki ni shika mienai keshiki ga aru.", "Ada pemandangan yang hanya terlihat saat berjalan pelan."],
      ["本来、豊かな時間とは、急がない時間のことなのかもしれない。", "Honrai, yutaka na jikan to wa, isoganai jikan no koto na no kamoshirenai.", "Pada hakikatnya, waktu yang kaya mungkin adalah waktu yang tidak terburu-buru.", ["Pandangan penulis adalah...", "waktu yang tidak terburu-buru itu berharga", "kecepatan paling penting", "berjalan cepat lebih sehat", "pemandangan tidak penting"]],
    ],
  ],
  // 8. Membandingkan pandangan
  [
    [
      ["と述べる", "To noberu", "menyatakan"],
      ["と反論する", "To hanron suru", "membantah bahwa"],
      ["両者とも", "Ryousha tomo", "keduanya"],
      ["優先する", "Yuusen suru", "memprioritaskan", ["Saat membandingkan dua pandangan, yang perlu dicari adalah...", "persamaan dan perbedaan", "hanya nama penulis", "jumlah kata", "tanggal terbit"]],
    ],
    [
      ["A氏は、在宅勤務は生産性を高めると述べる。", "Ee shi wa, zaitaku kinmu wa seisansei o takameru to noberu.", "Tuan A menyatakan kerja dari rumah meningkatkan produktivitas."],
      ["一方、B氏は対面でしか生まれない発想があると反論する。", "Ippou, Bii shi wa taimen de shika umarenai hassou ga aru to hanron suru.", "Sementara itu, Tuan B membantah bahwa ada ide yang hanya lahir dari tatap muka."],
      ["両者とも、働き方の柔軟性が必要だという点では一致している。", "Ryousha tomo, hatarakikata no juunansei ga hitsuyou da to iu ten de wa itchi shite iru.", "Keduanya sepakat bahwa fleksibilitas cara kerja diperlukan.", ["Kedua pandangan itu sepakat tentang...", "perlunya fleksibilitas cara kerja", "kerja dari rumah selalu lebih baik", "tatap muka tidak perlu", "jam kerja harus panjang"]],
      ["違いは、効率と創造性のどちらを優先するかにある。", "Chigai wa, kouritsu to souzousei no dochira o yuusen suru ka ni aru.", "Perbedaannya terletak pada mana yang diprioritaskan, efisiensi atau kreativitas."],
    ],
  ],
  // 9. Makna tersirat
  [
    [
      ["気になっていた", "Ki ni natte ita", "merasa (padahal tidak)"],
      ["これこそが", "Kore koso ga", "justru inilah"],
      ["満足そうに", "Manzoku sou ni", "dengan wajah puas"],
      ["皮肉", "Hiniku", "ironi / sindiran", ["Ironi dalam tulisan biasanya dipakai untuk...", "menyiratkan kritik", "memberi petunjuk arah", "menjual barang", "menghitung angka"]],
    ],
    [
      ["新しいシステムが導入され、書類の数は三倍に増えた。", "Atarashii shisutemu ga dounyuu sare, shorui no kazu wa sanbai ni fueta.", "Sistem baru diterapkan, dan jumlah dokumen bertambah tiga kali lipat."],
      ["「効率化」の名のもとに、残業も増えていった。", "\"Kouritsuka\" no na no moto ni, zangyou mo fuete itta.", "Atas nama 'efisiensi', lembur pun semakin bertambah."],
      ["それでも上層部は、改革の成功を誇らしげに発表した。", "Soredemo jousoubu wa, kaikaku no seikou o hokorashige ni happyou shita.", "Meskipun begitu, pimpinan atas dengan bangga mengumumkan keberhasilan reformasi."],
      ["現場の声は、どこにも届いていないようだ。", "Genba no koe wa, doko ni mo todoite inai you da.", "Suara dari lapangan tampaknya tidak sampai ke mana pun.", ["Kritik tersirat penulis adalah...", "reformasi justru memperburuk keadaan di lapangan", "sistem baru sangat berhasil", "pimpinan sangat peduli karyawan", "lembur berkurang"]],
    ],
  ],
  // 10. Sikap penulis
  [
    [
      ["評価できる", "Hyouka dekiru", "patut diapresiasi"],
      ["疑問が残る", "Gimon ga nokoru", "menyisakan tanda tanya"],
      ["看過できない", "Kanka dekinai", "tidak bisa diabaikan"],
      ["期待したい", "Kitai shitai", "ingin berharap", ["Ungkapan 疑問が残る menunjukkan sikap penulis yang...", "ragu / kritis", "sangat setuju", "netral tanpa pendapat", "marah besar"]],
    ],
    [
      ["地域で子育てを支える取り組み自体は評価できる。", "Chiiki de kosodate o sasaeru torikumi jitai wa hyouka dekiru.", "Upaya mendukung pengasuhan anak di daerah itu sendiri patut diapresiasi."],
      ["しかし、利用者の声を十分に聞いたかには疑問が残る。", "Shikashi, riyousha no koe o juubun ni kiita ka ni wa gimon ga nokoru.", "Namun, apakah suara pengguna sudah cukup didengar masih menyisakan tanda tanya."],
      ["特に、ひとり親家庭への配慮が欠けている点は看過できない。", "Toku ni, hitorioya katei e no hairyo ga kakete iru ten wa kanka dekinai.", "Terutama, kurangnya kepedulian pada keluarga orang tua tunggal tidak bisa diabaikan.", ["Menurut penulis, hal yang tidak bisa diabaikan adalah...", "kurangnya kepedulian pada keluarga orang tua tunggal", "biaya terlalu murah", "terlalu banyak pengguna", "lokasi yang jauh"]],
      ["制度がより良いものになることに期待したい。", "Seido ga yori yoi mono ni naru koto ni kitai shitai.", "Saya berharap sistemnya menjadi lebih baik."],
    ],
  ],
  // 11. Email panjang
  [
    [
      ["平素より", "Heiso yori", "selama ini (formal)"],
      ["さて", "Sate", "selanjutnya / nah (pengalih topik)"],
      ["誠に恐縮ですが", "Makoto ni kyoushuku desu ga", "dengan segala hormat (mohon maaf)"],
      ["ご検討のほど", "Gokentou no hodo", "mohon dipertimbangkan", ["Dalam email bisnis panjang, maksud utama biasanya muncul setelah...", "salam pembuka (さて)", "tanda tangan", "lampiran", "subjek saja"]],
    ],
    [
      ["平素より格別のご高配を賜り、厚く御礼申し上げます。", "Heiso yori kakubetsu no gokouhai o tamawari, atsuku onrei moushiagemasu.", "Kami mengucapkan terima kasih sebesar-besarnya atas perhatian istimewa Anda selama ini."],
      ["さて、来月開催予定の説明会についてご案内いたします。", "Sate, raigetsu kaisai yotei no setsumeikai ni tsuite goannai itashimasu.", "Selanjutnya, kami informasikan mengenai sesi penjelasan yang dijadwalkan bulan depan."],
      ["誠に恐縮ですが、出欠を今月末までにご返信いただけますでしょうか。", "Makoto ni kyoushuku desu ga, shukketsu o kongetsumatsu made ni gohenshin itadakemasu deshou ka.", "Dengan segala hormat, bisakah Anda membalas kehadiran paling lambat akhir bulan ini?", ["Permintaan utama email itu adalah...", "membalas kehadiran paling lambat akhir bulan", "membayar biaya", "mengirim dokumen", "menelepon kantor"]],
      ["ご多忙のところ恐れ入りますが、よろしくお願い申し上げます。", "Gotabou no tokoro osoreirimasu ga, yoroshiku onegai moushiagemasu.", "Mohon maaf mengganggu kesibukan Anda, atas perhatiannya terima kasih."],
    ],
  ],
  // 12. Pemberitahuan kontrak
  [
    [
      ["とする", "To suru", "ditetapkan"],
      ["ものとする", "Mono to suru", "wajib / diharuskan (bahasa hukum)"],
      ["を除く", "O nozoku", "kecuali / dikecualikan"],
      ["書面で", "Shomen de", "secara tertulis", ["Dalam kontrak, ungkapan を除く berarti...", "dikecualikan", "ditambahkan", "diwajibkan", "dibatalkan"]],
    ],
    [
      ["本契約は、署名した日から効力を生じるものとする。", "Hon keiyaku wa, shomei shita hi kara kouryoku o shoujiru mono to suru.", "Kontrak ini berlaku sejak tanggal ditandatangani."],
      ["甲は、乙に対して商品を期日までに納入しなければならない。", "Kou wa, otsu ni taishite shouhin o kijitsu made ni nounyuu shinakereba naranai.", "Pihak pertama wajib menyerahkan barang kepada pihak kedua sebelum tanggal yang ditentukan."],
      ["ただし、不可抗力による遅延の場合を除く。", "Tadashi, fukakouryoku ni yoru chien no baai o nozoku.", "Namun, keterlambatan akibat keadaan kahar dikecualikan.", ["Menurut kontrak, keterlambatan yang dikecualikan adalah akibat...", "keadaan kahar (di luar kendali)", "kelalaian pihak pertama", "lupa", "kekurangan staf"]],
      ["契約内容を変更する場合は、双方の合意を必要とする。", "Keiyaku naiyou o henkou suru baai wa, souhou no goui o hitsuyou to suru.", "Perubahan isi kontrak memerlukan persetujuan kedua pihak."],
    ],
  ],
  // 13. Kebijakan publik
  [
    [
      ["施策を推進する", "Shisaku o suishin suru", "mendorong langkah kebijakan"],
      ["負担軽減", "Futan keigen", "keringanan beban"],
      ["対象者", "Taishousha", "orang yang berhak / sasaran"],
      ["基金", "Kikin", "dana cadangan", ["Teks kebijakan publik biasanya memuat...", "latar, isi, sasaran, dan jadwal", "resep", "cerita fiksi", "puisi"]],
    ],
    [
      ["県は、高齢者の交通事故を減らす施策を推進している。", "Ken wa, koureisha no koutsuu jiko o herasu shisaku o suishin shite iru.", "Pemerintah prefektur mendorong langkah untuk mengurangi kecelakaan lalu lintas lansia."],
      ["運転免許を返納した人には、バスの無料券が配られる。", "Unten menkyo o hennou shita hito ni wa, basu no muryouken ga kubarareru.", "Bagi yang mengembalikan SIM, dibagikan tiket bus gratis.", ["Menurut teks, yang mengembalikan SIM akan mendapat...", "tiket bus gratis", "uang tunai", "mobil baru", "diskon belanja"]],
      ["対象者は、七十五歳以上の県民である。", "Taishousha wa, nanajuugosai ijou no kenmin de aru.", "Sasarannya adalah warga prefektur berusia 75 tahun ke atas."],
      ["申請は、来年一月から市町村の窓口で受け付ける。", "Shinsei wa, rainen ichigatsu kara shichouson no madoguchi de uketsukeru.", "Permohonan diterima di loket kota/desa mulai Januari tahun depan."],
    ],
  ],
  // 14. Artikel data
  [
    [
      ["過去最少", "Kako saishou", "terendah sepanjang sejarah"],
      ["に達する", "Ni tassuru", "mencapai"],
      ["上回る状態", "Uwamawaru joutai", "keadaan melebihi"],
      ["予測", "Yosoku", "prediksi", ["Saat membaca artikel data, yang perlu diperhatikan adalah...", "angka beserta satuan dan periodenya", "gaya huruf", "nama penulis saja", "warna grafik saja"]],
    ],
    [
      ["昨年の新規就農者は一万人を下回り、過去最少となった。", "Sakunen no shinki shuunousha wa ichiman-nin o shitamawari, kako saishou to natta.", "Jumlah petani baru tahun lalu di bawah sepuluh ribu orang, terendah sepanjang sejarah."],
      ["農業従事者の平均年齢は六十八歳に達している。", "Nougyou juujisha no heikin nenrei wa rokujuuhassai ni tasshite iru.", "Usia rata-rata pekerja pertanian mencapai 68 tahun.", ["Menurut artikel, usia rata-rata pekerja pertanian adalah...", "68 tahun", "58 tahun", "86 tahun", "48 tahun"]],
      ["耕作されない農地は、この十年で一・五倍に増えた。", "Kousaku sarenai nouchi wa, kono juunen de itten go bai ni fueta.", "Lahan pertanian yang tidak digarap bertambah satu setengah kali lipat dalam sepuluh tahun ini."],
      ["このままでは、食料自給率のさらなる低下が予測される。", "Kono mama de wa, shokuryou jikyuuritsu no sara naru teika ga yosoku sareru.", "Kalau dibiarkan, diprediksi rasio swasembada pangan akan semakin menurun."],
    ],
  ],
  // 15. Kritik
  [
    [
      ["という点では", "To iu ten de wa", "dari segi ..."],
      ["物足りない", "Monotarinai", "kurang memuaskan"],
      ["描かれていない", "Egakarete inai", "tidak digambarkan"],
      ["惜しい", "Oshii", "sayang sekali", ["Kritik yang baik menilai...", "kekuatan dan kelemahan secara adil", "kelemahan saja", "kekuatan saja", "harga saja"]],
    ],
    [
      ["この小説は、方言を生かした会話という点で魅力的だ。", "Kono shousetsu wa, hougen o ikashita kaiwa to iu ten de miryokuteki da.", "Novel ini menarik dari segi percakapan yang memanfaatkan dialek."],
      ["しかし、後半の展開はあまりに都合がよすぎる。", "Shikashi, kouhan no tenkai wa amari ni tsugou ga yosugiru.", "Namun, alur bagian akhir terlalu kebetulan."],
      ["脇役の人物像も十分に描かれていない。", "Wakiyaku no jinbutsuzou mo juubun ni egakarete inai.", "Karakter pemeran pendukung juga tidak digambarkan dengan cukup."],
      ["前半の勢いが最後まで続かなかったのが惜しい。", "Zenhan no ikioi ga saigo made tsuzukanakatta no ga oshii.", "Sayang sekali momentum di bagian awal tidak bertahan sampai akhir.", ["Kesimpulan kritikus tentang novel itu adalah...", "awalnya kuat tetapi akhirnya melemah", "sempurna dari awal sampai akhir", "membosankan sejak awal", "terlalu pendek"]],
    ],
  ],
  // 16. Kanji N2 dalam teks
  [
    [
      ["依存", "Izon", "ketergantungan"],
      ["確保", "Kakuho", "pengamanan / penyediaan"],
      ["抑制", "Yokusei", "penekanan / pengendalian"],
      ["活性化", "Kasseika", "revitalisasi", ["Bacaan kanji 抑制 adalah...", "yokusei", "okusei", "yokushi", "ankusei"]],
    ],
    [
      ["エネルギーの輸入依存を減らすことが課題だ。", "Enerugii no yunyuu izon o herasu koto ga kadai da.", "Mengurangi ketergantungan impor energi menjadi tantangan."],
      ["災害時の水の確保について、計画を立てておく必要がある。", "Saigaiji no mizu no kakuho ni tsuite, keikaku o tatete oku hitsuyou ga aru.", "Perlu menyusun rencana tentang penyediaan air saat bencana."],
      ["政府は物価の上昇を抑制するための対策を発表した。", "Seifu wa bukka no joushou o yokusei suru tame no taisaku o happyou shita.", "Pemerintah mengumumkan langkah untuk menekan kenaikan harga."],
      ["観光客の誘致は、商店街の活性化につながる。", "Kankoukyaku no yuuchi wa, shoutengai no kasseika ni tsunagaru.", "Menarik wisatawan berujung pada revitalisasi kawasan pertokoan."],
    ],
  ],
  // 17. Logika paragraf
  [
    [
      ["もっとも", "Mottomo", "meskipun demikian / hanya saja"],
      ["望ましい", "Nozomashii", "diinginkan / sebaiknya"],
      ["効果がある", "Kouka ga aru", "berefek"],
      ["というのも", "To iu no mo", "sebabnya adalah", ["Kata もっとも di awal kalimat berfungsi sebagai...", "sanggahan atau catatan pembatas", "kesimpulan", "contoh", "pertanyaan"]],
    ],
    [
      ["自転車通勤は、健康と環境の両面で効果がある。", "Jitensha tsuukin wa, kenkou to kankyou no ryoumen de kouka ga aru.", "Bersepeda ke kantor berefek baik dari segi kesehatan maupun lingkungan."],
      ["というのも、運動不足が解消され、排気ガスも出ないからだ。", "To iu no mo, undou busoku ga kaishou sare, haiki gasu mo denai kara da.", "Sebabnya, kurang olahraga teratasi dan tidak ada gas buang."],
      ["もっとも、雨の日や長距離には向かない。", "Mottomo, ame no hi ya choukyori ni wa mukanai.", "Hanya saja, tidak cocok untuk hari hujan atau jarak jauh."],
      ["したがって、電車と組み合わせて利用するのが望ましい。", "Shitagatte, densha to kumiawasete riyou suru no ga nozomashii.", "Karena itu, sebaiknya dipakai dengan dikombinasikan dengan kereta.", ["Kesimpulan paragraf itu adalah...", "sebaiknya sepeda dikombinasikan dengan kereta", "sepeda selalu lebih baik", "jangan bersepeda", "kereta harus dihapus"]],
    ],
  ],
  // 18. Inferensi lanjutan
  [
    [
      ["積まれていた", "Tsumarete ita", "bertumpuk"],
      ["白み始める", "Shiramihajimeru", "mulai memutih (fajar)"],
      ["迫っていた", "Sematte ita", "sudah mendekat"],
      ["ふと", "Futo", "tiba-tiba / tanpa sengaja", ["Inferensi lanjutan dilakukan dengan memperhatikan...", "struktur dan pilihan kata penulis", "jumlah halaman", "harga buku", "nama penerbit"]],
    ],
    [
      ["彼女は駅のホームで、何度も携帯の画面を確かめていた。", "Kanojo wa eki no hoomu de, nando mo keitai no gamen o tashikamete ita.", "Dia berkali-kali memeriksa layar ponselnya di peron stasiun."],
      ["電車が三本通り過ぎても、彼女は乗らなかった。", "Densha ga sanbon toorisugite mo, kanojo wa noranakatta.", "Meskipun tiga kereta sudah lewat, dia tidak naik."],
      ["やがて改札の方から、走ってくる男性の姿が見えた。", "Yagate kaisatsu no hou kara, hashitte kuru dansei no sugata ga mieta.", "Tak lama kemudian, dari arah gerbang tiket terlihat sosok pria yang berlari."],
      ["彼女の顔に、ふっと笑みが浮かんだ。", "Kanojo no kao ni, futto emi ga ukanda.", "Seulas senyum tiba-tiba muncul di wajahnya.", ["Dari teks itu, kita bisa menyimpulkan bahwa wanita itu...", "sedang menunggu pria itu", "ketinggalan kereta", "kehilangan ponsel", "bekerja di stasiun"]],
    ],
  ],
  // 19. Tugas meringkas
  [
    [
      ["要旨", "Youshi", "inti / ringkasan"],
      ["に陥る", "Ni ochiiru", "terjebak dalam"],
      ["と結論づける", "To ketsuronzukeru", "menyimpulkan bahwa"],
      ["減点主義", "Gentenshugi", "sistem penilaian dengan pengurangan poin", ["Ringkasan yang baik berisi...", "ide pokok dan alasan utama tanpa contoh", "semua contoh", "pendapat pembaca", "terjemahan kata per kata"]],
    ],
    [
      ["この文章の要旨は、地域の祭りが持つ社会的役割である。", "Kono bunshou no youshi wa, chiiki no matsuri ga motsu shakaiteki yakuwari de aru.", "Inti tulisan ini adalah peran sosial yang dimiliki festival daerah."],
      ["筆者は、祭りが住民同士をつなぐ場になっていると指摘する。", "Hissha wa, matsuri ga juumin doushi o tsunagu ba ni natte iru to shiteki suru.", "Penulis menunjukkan bahwa festival menjadi tempat yang menghubungkan sesama warga."],
      ["しかし、担い手の高齢化で存続が危ぶまれているという。", "Shikashi, ninaite no koureika de sonzoku ga ayabumarete iru to iu.", "Namun, kelangsungannya terancam karena penerusnya menua."],
      ["若い世代を巻き込む工夫が必要だと結論づけている。", "Wakai sedai o makikomu kufuu ga hitsuyou da to ketsuronzukete iru.", "Penulis menyimpulkan perlunya upaya melibatkan generasi muda.", ["Kesimpulan penulis adalah...", "perlu upaya melibatkan generasi muda", "festival sebaiknya dihapus", "orang tua tidak boleh ikut", "festival tidak berguna"]],
    ],
  ],
  // 20. Ulasan reading N2
  [
    [
      ["倍増する", "Baizou suru", "berlipat dua"],
      ["伸び悩む", "Nobinayamu", "tersendat pertumbuhannya"],
      ["とは言えまい", "To wa iemai", "tidak bisa dikatakan"],
      ["配慮", "Hairyo", "kepedulian / pertimbangan", ["Ungkapan とは言えまい menunjukkan penulis...", "menyangkal secara tegas", "setuju penuh", "ragu-ragu ringan", "bertanya"]],
    ],
    [
      ["オンライン診療の利用者は、この三年で倍増した。", "Onrain shinryou no riyousha wa, kono sannen de baizou shita.", "Pengguna layanan konsultasi dokter daring berlipat dua dalam tiga tahun ini."],
      ["しかし、地方の高齢者の利用は伸び悩んでいる。", "Shikashi, chihou no koureisha no riyou wa nobinayande iru.", "Namun, penggunaan oleh lansia di daerah tersendat."],
      ["必要な人に届かなければ、医療の進歩とは言えまい。", "Hitsuyou na hito ni todokanakereba, iryou no shinpo to wa iemai.", "Jika tidak sampai kepada yang membutuhkan, itu tidak bisa disebut kemajuan medis.", ["Pendapat penulis adalah...", "teknologi medis harus menjangkau yang membutuhkan", "konsultasi daring tidak berguna", "lansia tidak perlu dokter", "kemajuan medis sudah cukup"]],
      ["技術の導入と同時に、使い方を支える仕組みが求められる。", "Gijutsu no dounyuu to douji ni, tsukaikata o sasaeru shikumi ga motomerareru.", "Bersamaan dengan penerapan teknologi, dibutuhkan mekanisme yang mendukung cara penggunaannya."],
    ],
  ],
];
