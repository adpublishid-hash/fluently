import type { LessonCoreTuple } from '../types';

// Reading N2 — one entry per lesson (index = lesson - 1).
export const reading: LessonCoreTuple[] = [
  ['Editorial N2', ['Editorial: isu → analisis → posisi → tuntutan.', 'Cari kalimat dengan 〜べきだ, 〜ではないか, 〜が求められる.'], [
    ['働き方改革が叫ばれて久しいが、長時間労働は依然として残っている。', 'Hatarakikata kaikaku ga sakebarete hisashii ga, choujikan roudou wa izen to shite nokotte iru.', 'Reformasi cara kerja sudah lama diserukan, tetapi jam kerja panjang masih tetap ada.'],
    ['制度を作るだけでは、職場の意識は変わらない。', 'Seido o tsukuru dake de wa, shokuba no ishiki wa kawaranai.', 'Hanya membuat sistem tidak akan mengubah kesadaran di tempat kerja.'],
    ['経営者自らが率先して休む姿勢を示すべきではないか。', 'Keieisha mizukara ga sossen shite yasumu shisei o shimesu beki de wa nai ka.', 'Bukankah para pimpinan sendiri seharusnya memberi contoh dengan mengambil libur?'],
    ['真の改革には、文化そのものの見直しが求められる。', 'Shin no kaikaku ni wa, bunka sono mono no minaoshi ga motomerareru.', 'Reformasi sejati menuntut peninjauan ulang budaya itu sendiri.'],
  ]],
  ['Ringkasan penelitian', ['Ringkasan penelitian: tujuan → metode → hasil → kesimpulan.', 'Kata kunci: 本研究, 対象, 結果, 示唆される.'], [
    ['本研究の目的は、睡眠時間と学業成績の関係を明らかにすることである。', 'Honkenkyuu no mokuteki wa, suimin jikan to gakugyou seiseki no kankei o akiraka ni suru koto de aru.', 'Tujuan penelitian ini adalah memperjelas hubungan jam tidur dan prestasi akademik.'],
    ['大学生五百人を対象に、三か月間の調査を行った。', 'Daigakusei gohyakunin o taishou ni, sankagetsukan no chousa o okonatta.', 'Survei selama tiga bulan dilakukan terhadap lima ratus mahasiswa.'],
    ['その結果、七時間以上眠る学生の成績が高い傾向が見られた。', 'Sono kekka, nanajikan ijou nemuru gakusei no seiseki ga takai keikou ga mirareta.', 'Hasilnya, terlihat kecenderungan nilai mahasiswa yang tidur tujuh jam lebih itu tinggi.'],
    ['十分な睡眠が学習効果を高めることが示唆される。', 'Juubun na suimin ga gakushuu kouka o takameru koto ga shisa sareru.', 'Ini mengisyaratkan bahwa tidur yang cukup meningkatkan efek belajar.'],
  ]],
  ['Laporan bisnis', ['Laporan bisnis: ringkasan angka → faktor → tantangan → rencana.', 'Kata kunci: 前年同期比, 要因, 見込み.'], [
    ['第二四半期の売上高は、前年同期比で八パーセント増となった。', 'Dai ni shihanki no uriagedaka wa, zennen douki hi de hachi paasento zou to natta.', 'Penjualan kuartal kedua naik delapan persen dibanding periode yang sama tahun lalu.'],
    ['主な要因は、海外市場での販売好調である。', 'Omo na youin wa, kaigai shijou de no hanbai kouchou de aru.', 'Faktor utamanya adalah penjualan yang bagus di pasar luar negeri.'],
    ['一方、国内では競争の激化により利益率が低下した。', 'Ippou, kokunai de wa kyousou no gekika ni yori riekiritsu ga teika shita.', 'Sementara itu, di dalam negeri margin keuntungan turun karena persaingan makin ketat.'],
    ['下半期は新製品の投入により、さらなる成長が見込まれる。', 'Shimohanki wa shinseihin no tounyuu ni yori, saranaru seichou ga mikomareru.', 'Pada paruh kedua, pertumbuhan lebih lanjut diperkirakan dengan peluncuran produk baru.'],
  ]],
  ['Artikel kebijakan', ['Artikel kebijakan: isi kebijakan → tujuan → kritik → evaluasi.', 'Bedakan fakta kebijakan dan penilaian penulis.'], [
    ['政府は、若者の地方移住を支援する補助金制度を新設した。', 'Seifu wa, wakamono no chihou ijuu o shien suru hojokin seido o shinsetsu shita.', 'Pemerintah membuat sistem subsidi baru untuk mendukung anak muda pindah ke daerah.'],
    ['移住者一人あたり最大百万円が支給される。', 'Ijuusha hitori atari saidai hyakuman en ga shikyuu sareru.', 'Setiap pendatang diberi maksimal satu juta yen.'],
    ['しかし、一時的な金銭支援だけでは定住につながらないとの批判もある。', 'Shikashi, ichijiteki na kinsen shien dake de wa teijuu ni tsunagaranai to no hihan mo aru.', 'Namun, ada kritik bahwa bantuan uang sementara saja tidak akan membuat orang menetap.'],
    ['雇用の創出と組み合わせた政策が必要だろう。', 'Koyou no soushutsu to kumiawaseta seisaku ga hitsuyou darou.', 'Diperlukan kebijakan yang dipadukan dengan penciptaan lapangan kerja.'],
  ]],
  ['Analisis argumen', ['Analisis argumen: temukan premis, kesimpulan, dan asumsi tersembunyi.', 'Tanya: apakah buktinya cukup untuk kesimpulan?'], [
    ['読書量の多い子どもは、成績がよい。', 'Dokushoryou no ooi kodomo wa, seiseki ga yoi.', 'Anak yang banyak membaca nilainya bagus.'],
    ['したがって、読書をさせれば成績は上がる、と筆者は主張する。', 'Shitagatte, dokusho o sasereba seiseki wa agaru, to hissha wa shuchou suru.', 'Karena itu, penulis menyatakan bahwa jika anak disuruh membaca, nilainya akan naik.'],
    ['しかし、相関関係が因果関係を意味するとは限らない。', 'Shikashi, soukan kankei ga inga kankei o imi suru to wa kagiranai.', 'Namun, korelasi belum tentu berarti kausalitas.'],
    ['家庭環境という第三の要因が影響している可能性もある。', 'Katei kankyou to iu daisan no youin ga eikyou shite iru kanousei mo aru.', 'Ada kemungkinan faktor ketiga, yaitu lingkungan keluarga, ikut berpengaruh.'],
  ]],
  ['Pengantar esai sastra', ['Esai sastra memakai gambaran indah dan refleksi pribadi.', 'Cari perasaan dan makna di balik deskripsi.'], [
    ['秋の夕暮れには、どこか懐かしい匂いがする。', 'Aki no yuugure ni wa, dokoka natsukashii nioi ga suru.', 'Senja musim gugur entah mengapa beraroma rindu.'],
    ['焼き芋の煙が、子どものころの記憶を呼び起こす。', 'Yakiimo no kemuri ga, kodomo no koro no kioku o yobiokosu.', 'Asap ubi bakar membangkitkan kenangan masa kecil.'],
    ['あの頃は、時間が永遠に続くと信じていた。', 'Ano koro wa, jikan ga eien ni tsuzuku to shinjite ita.', 'Waktu itu, saya percaya waktu akan berlangsung selamanya.'],
    ['失われたものの重さを、季節が教えてくれる。', 'Ushinawareta mono no omosa o, kisetsu ga oshiete kureru.', 'Musimlah yang mengajarkan beratnya hal-hal yang telah hilang.'],
  ]],
  ['Bacaan abstrak', ['Bacaan abstrak: definisi ulang konsep yang dianggap biasa.', 'Penanda: 〜と考えがちだが, 実は, 本来.'], [
    ['私たちは、便利さを進歩と考えがちである。', 'Watashitachi wa, benrisa o shinpo to kangaegachi de aru.', 'Kita cenderung menganggap kepraktisan sebagai kemajuan.'],
    ['だが、便利さは同時に、何かを失わせてもいる。', 'Da ga, benrisa wa douji ni, nanika o ushinawasete mo iru.', 'Namun, kepraktisan sekaligus juga membuat kita kehilangan sesuatu.'],
    ['手紙を書く時間には、相手を思う時間が含まれていた。', 'Tegami o kaku jikan ni wa, aite o omou jikan ga fukumarete ita.', 'Waktu menulis surat dulu mengandung waktu untuk memikirkan si penerima.'],
    ['本来、豊かさとは手間の中にあるのかもしれない。', 'Honrai, yutakasa to wa tema no naka ni aru no kamo shirenai.', 'Pada hakikatnya, kekayaan hidup mungkin justru ada di dalam jerih payah.'],
  ]],
  ['Membandingkan pandangan', ['Dua teks dengan pandangan berbeda: temukan persamaan dan perbedaan.', 'Penanda: A氏は〜と述べる一方、B氏は〜と反論する.'], [
    ['A氏は、外国語教育は早いほうがよいと述べる。', 'Ee shi wa, gaikokugo kyouiku wa hayai hou ga yoi to noberu.', 'Tuan A menyatakan pendidikan bahasa asing lebih baik dimulai sejak dini.'],
    ['一方、B氏は母語の土台が先だと反論する。', 'Ippou, bii shi wa bogo no dodai ga saki da to hanron suru.', 'Sementara itu, Tuan B membantah bahwa fondasi bahasa ibu harus lebih dulu.'],
    ['両者とも、言語能力の重要性は認めている。', 'Ryousha tomo, gengo nouryoku no juuyousei wa mitomete iru.', 'Keduanya mengakui pentingnya kemampuan bahasa.'],
    ['違いは、何を優先するかという点にある。', 'Chigai wa, nani o yuusen suru ka to iu ten ni aru.', 'Perbedaannya terletak pada apa yang diprioritaskan.'],
  ]],
  ['Makna tersirat', ['Penulis sering menyiratkan kritik lewat ironi atau contoh.', 'Tanya: mengapa penulis memilih contoh ini?'], [
    ['会議は二時間続いたが、決まったのは次の会議の日程だけだった。', 'Kaigi wa nijikan tsuzuita ga, kimatta no wa tsugi no kaigi no nittei dake datta.', 'Rapat berlangsung dua jam, tapi yang diputuskan hanya jadwal rapat berikutnya.'],
    ['参加者は皆、満足そうに部屋を出ていった。', 'Sankasha wa mina, manzokusou ni heya o dete itta.', 'Semua peserta keluar ruangan dengan wajah puas.'],
    ['誰もが仕事をした気になっていた。', 'Dare mo ga shigoto o shita ki ni natte ita.', 'Semua orang merasa sudah bekerja.'],
    ['これこそが、この組織の問題なのである。', 'Kore koso ga, kono soshiki no mondai na no de aru.', 'Justru inilah masalah organisasi ini.'],
  ]],
  ['Sikap penulis', ['Sikap penulis: setuju, menolak, ragu, atau netral.', 'Kata kunci sikap: 疑問が残る, 評価できる, 看過できない.'], [
    ['新制度の導入自体は評価できる。', 'Shinseido no dounyuu jitai wa hyouka dekiru.', 'Penerapan sistem baru itu sendiri patut diapresiasi.'],
    ['しかし、現場への説明が不十分だった点には疑問が残る。', 'Shikashi, genba e no setsumei ga fujuubun datta ten ni wa gimon ga nokoru.', 'Namun, kurangnya penjelasan ke lapangan menyisakan tanda tanya.'],
    ['特に、高齢者が取り残されている現状は看過できない。', 'Toku ni, koureisha ga torinokosarete iru genjou wa kanka dekinai.', 'Terutama, kenyataan bahwa lansia tertinggal tidak bisa diabaikan.'],
    ['今後の改善に期待したい。', 'Kongo no kaizen ni kitai shitai.', 'Saya berharap ada perbaikan ke depan.'],
  ]],
  ['Email panjang', ['Email panjang: cari maksud utama (biasanya setelah salam) dan permintaan.', 'Abaikan basa-basi; fokus pada 〜ていただけないでしょうか.'], [
    ['平素より大変お世話になっております。', 'Heiso yori taihen osewa ni natte orimasu.', 'Terima kasih atas bantuan Anda selama ini.'],
    ['さて、先日ご依頼いただいた件につきまして、ご報告いたします。', 'Sate, senjitsu goirai itadaita ken ni tsukimashite, gohoukoku itashimasu.', 'Selanjutnya, saya laporkan mengenai hal yang Anda minta beberapa hari lalu.'],
    ['誠に恐縮ですが、納期を一週間延長していただけないでしょうか。', 'Makoto ni kyoushuku desu ga, nouki o isshuukan enchou shite itadakenai deshou ka.', 'Dengan segala hormat, bisakah tenggatnya diperpanjang satu minggu?'],
    ['ご検討のほど、何卒よろしくお願い申し上げます。', 'Gokentou no hodo, nanitozo yoroshiku onegai moushiagemasu.', 'Mohon kiranya dapat dipertimbangkan.'],
  ]],
  ['Pemberitahuan kontrak', ['Teks kontrak: syarat, kewajiban, pengecualian.', 'Kata kunci: 甲・乙 (pihak pertama/kedua), 〜ものとする, 〜を除く.'], [
    ['本契約の期間は、二年間とする。', 'Honkeiyaku no kikan wa, ninenkan to suru.', 'Jangka waktu kontrak ini ditetapkan dua tahun.'],
    ['乙は、毎月末日までに賃料を支払うものとする。', 'Otsu wa, maitsuki matsujitsu made ni chinryou o shiharau mono to suru.', 'Pihak kedua wajib membayar sewa paling lambat hari terakhir setiap bulan.'],
    ['ただし、天災による損害を除く。', 'Tadashi, tensai ni yoru songai o nozoku.', 'Namun, kerugian akibat bencana alam dikecualikan.'],
    ['解約する場合は、一か月前までに書面で通知すること。', 'Kaiyaku suru baai wa, ikkagetsu mae made ni shomen de tsuuchi suru koto.', 'Jika membatalkan, harus memberitahukan secara tertulis paling lambat sebulan sebelumnya.'],
  ]],
  ['Kebijakan publik', ['Teks kebijakan publik: latar → isi → sasaran → jadwal.', 'Kata kunci: 施策, 推進, 対象者, 実施時期.'], [
    ['市は、子育て世帯の負担軽減に向けた施策を推進している。', 'Shi wa, kosodate setai no futan keigen ni muketa shisaku o suishin shite iru.', 'Pemerintah kota mendorong langkah-langkah untuk meringankan beban keluarga yang mengasuh anak.'],
    ['来年度から、中学生までの医療費を無料にする。', 'Rainendo kara, chuugakusei made no iryouhi o muryou ni suru.', 'Mulai tahun fiskal depan, biaya kesehatan sampai usia SMP digratiskan.'],
    ['対象者には、四月中に案内が郵送される。', 'Taishousha ni wa, shigatsuchuu ni annai ga yuusou sareru.', 'Pemberitahuan akan dikirim lewat pos kepada yang berhak selama bulan April.'],
    ['財源は、市の基金を活用する予定である。', 'Zaigen wa, shi no kikin o katsuyou suru yotei de aru.', 'Sumber dananya direncanakan memakai dana cadangan kota.'],
  ]],
  ['Artikel data', ['Artikel data: baca angka dengan teliti, termasuk satuan dan periode.', 'Penanda: 〜を上回る, 〜を下回る, 〜に達する.'], [
    ['昨年の出生数は七十万人を下回り、過去最少となった。', 'Sakunen no shusshousuu wa nanajuuman nin o shitamawari, kako saishou to natta.', 'Jumlah kelahiran tahun lalu di bawah tujuh ratus ribu, terendah sepanjang sejarah.'],
    ['一方、六十五歳以上の人口は全体の三割に達している。', 'Ippou, rokujuugosai ijou no jinkou wa zentai no sanwari ni tasshite iru.', 'Sementara itu, penduduk usia 65 tahun ke atas mencapai tiga puluh persen dari keseluruhan.'],
    ['死亡数が出生数を大きく上回る状態が続いている。', 'Shibousuu ga shusshousuu o ookiku uwamawaru joutai ga tsuzuite iru.', 'Keadaan jumlah kematian jauh melebihi jumlah kelahiran terus berlanjut.'],
    ['人口減少のスピードは、予測よりも速い。', 'Jinkou genshou no supiido wa, yosoku yori mo hayai.', 'Laju penurunan penduduk lebih cepat dari perkiraan.'],
  ]],
  ['Kritik', ['Kritik yang baik menilai kekuatan dan kelemahan secara adil.', 'Penanda: 〜点は高く評価できるが, 〜に欠ける.'], [
    ['この映画は、映像の美しさという点では高く評価できる。', 'Kono eiga wa, eizou no utsukushisa to iu ten de wa takaku hyouka dekiru.', 'Film ini patut diapresiasi tinggi dari segi keindahan gambarnya.'],
    ['しかし、物語の展開には説得力が欠けている。', 'Shikashi, monogatari no tenkai ni wa settokuryoku ga kakete iru.', 'Namun, alur ceritanya kurang meyakinkan.'],
    ['主人公の心の変化が、十分に描かれていないのだ。', 'Shujinkou no kokoro no henka ga, juubun ni egakarete inai no da.', 'Perubahan hati tokoh utama tidak digambarkan dengan cukup.'],
    ['美しいだけの作品に終わってしまったのが惜しい。', 'Utsukushii dake no sakuhin ni owatte shimatta no ga oshii.', 'Sayang sekali hasilnya hanya menjadi karya yang indah semata.'],
  ]],
  ['Kanji N2 dalam teks', ['Kanji N2 umum: 依存, 傾向, 維持, 促進, 抑制, 確保.', 'Kenali pasangan kata yang berlawanan: 促進/抑制.'], [
    ['スマートフォンへの依存が社会問題となっている。', 'Sumaatofon e no izon ga shakai mondai to natte iru.', 'Ketergantungan pada ponsel pintar menjadi masalah sosial.'],
    ['医療体制を維持するには、人材の確保が欠かせない。', 'Iryou taisei o iji suru ni wa, jinzai no kakuho ga kakasenai.', 'Untuk mempertahankan sistem kesehatan, pengamanan SDM tak bisa diabaikan.'],
    ['政府は、地域経済の活性化を促進している。', 'Seifu wa, chiiki keizai no kasseika o sokushin shite iru.', 'Pemerintah mendorong revitalisasi ekonomi daerah.'],
    ['薬によって症状の悪化を抑制する。', 'Kusuri ni yotte shoujou no akka o yokusei suru.', 'Memburuknya gejala ditekan dengan obat.'],
  ]],
  ['Logika paragraf', ['Kenali fungsi tiap kalimat: klaim, alasan, contoh, sanggahan, kesimpulan.', 'Konektor memberi petunjuk fungsi: なぜなら, たとえば, もっとも, したがって.'], [
    ['都市の緑化は、気温の上昇を抑える効果がある。', 'Toshi no ryokuka wa, kion no joushou o osaeru kouka ga aru.', 'Penghijauan kota berefek menekan kenaikan suhu.'],
    ['なぜなら、植物が水分を蒸発させ、周囲を冷やすからだ。', 'Nazenara, shokubutsu ga suibun o jouhatsu sase, shuui o hiyasu kara da.', 'Sebab, tumbuhan menguapkan air dan mendinginkan sekitarnya.'],
    ['もっとも、維持管理には多額の費用がかかる。', 'Motto mo, iji kanri ni wa tagaku no hiyou ga kakaru.', 'Meskipun demikian, pemeliharaannya memakan biaya besar.'],
    ['したがって、長期的な計画に基づく導入が望ましい。', 'Shitagatte, choukiteki na keikaku ni motozuku dounyuu ga nozomashii.', 'Karena itu, penerapan berdasarkan rencana jangka panjang lebih diinginkan.'],
  ]],
  ['Inferensi lanjutan', ['Inferensi lanjutan: simpulkan maksud penulis dari struktur dan pilihan kata.', 'Tanya: apa yang tidak dikatakan penulis, tapi jelas dimaksud?'], [
    ['彼の机の上には、開かれたままの辞書が何冊も積まれていた。', 'Kare no tsukue no ue ni wa, hirakareta mama no jisho ga nansatsu mo tsumarete ita.', 'Di atas mejanya bertumpuk banyak kamus yang masih terbuka.'],
    ['ゴミ箱は、書き損じた原稿でいっぱいだった。', 'Gomibako wa, kakisonjita genkou de ippai datta.', 'Tempat sampah penuh naskah yang gagal ditulis.'],
    ['窓の外は、すでに白み始めていた。', 'Mado no soto wa, sude ni shiramihajimete ita.', 'Di luar jendela, langit sudah mulai memutih.'],
    ['翻訳の締め切りが、すぐそこまで迫っていたのだ。', 'Hon-yaku no shimekiri ga, sugu soko made sematte ita no da.', 'Tenggat terjemahan sudah sangat dekat.'],
  ]],
  ['Tugas meringkas', ['Ringkasan baik: ide pokok + alasan utama, tanpa contoh.', 'Panjang ringkasan sekitar sepertiga teks asli.'], [
    ['この文章の要旨は、失敗を恐れない文化の大切さである。', 'Kono bunshou no youshi wa, shippai o osorenai bunka no taisetsusa de aru.', 'Inti tulisan ini adalah pentingnya budaya yang tidak takut gagal.'],
    ['筆者は、日本の組織が減点主義に陥っていると指摘する。', 'Hissha wa, Nihon no soshiki ga gentenshugi ni ochiitte iru to shiteki suru.', 'Penulis menunjukkan bahwa organisasi Jepang terjebak dalam sistem pengurangan poin.'],
    ['その結果、新しい挑戦が生まれにくくなっているという。', 'Sono kekka, atarashii chousen ga umarenikuku natte iru to iu.', 'Akibatnya, tantangan baru sulit muncul.'],
    ['挑戦そのものを評価する仕組みが必要だと結論づけている。', 'Chousen sono mono o hyouka suru shikumi ga hitsuyou da to ketsuronzukete iru.', 'Penulis menyimpulkan perlunya mekanisme yang menghargai tantangan itu sendiri.'],
  ]],
  ['Ulasan reading N2', ['Gabungkan: editorial, data, sikap penulis, dan ringkasan.', 'Baca dengan pertanyaan: apa klaim, apa bukti, apa sikap?'], [
    ['キャッシュレス決済の普及率は、この五年で倍増した。', 'Kyasshuresu kessai no fukyuuritsu wa, kono gonen de baizou shita.', 'Tingkat penggunaan pembayaran nontunai berlipat dua dalam lima tahun ini.'],
    ['利便性が高まった一方で、高齢者の利用は伸び悩んでいる。', 'Ribensei ga takamatta ippou de, koureisha no riyou wa nobinayande iru.', 'Kepraktisan meningkat, sementara penggunaan oleh lansia tersendat.'],
    ['誰もが使える仕組みでなければ、真の普及とは言えまい。', 'Dare mo ga tsukaeru shikumi de nakereba, shin no fukyuu to wa iemai.', 'Kalau bukan sistem yang bisa dipakai semua orang, tak bisa disebut penyebaran sejati.'],
    ['技術と同じくらい、使う人への配慮が問われている。', 'Gijutsu to onaji kurai, tsukau hito e no hairyo ga towarete iru.', 'Sama pentingnya dengan teknologi, kepedulian pada penggunanya juga dipertanyakan.'],
  ]],
];
