import type { LessonCoreTuple } from '../types';

// Writing N1 — one entry per lesson (index = lesson - 1).
export const writing: LessonCoreTuple[] = [
  ['Esai akademik', ['Esai akademik N1: rumusan masalah, tinjauan pustaka singkat, argumen, kesimpulan.', 'Gunakan gaya である dan kata kerja akademik: 論じる, 考察する, 検討する.'], [
    ['本稿の目的は、地方都市における若年層流出の要因を考察することにある。', 'Honkou no mokuteki wa, chihou toshi ni okeru jakunensou ryuushutsu no youin o kousatsu suru koto ni aru.', 'Tujuan tulisan ini adalah mengkaji faktor-faktor keluarnya generasi muda dari kota daerah.'],
    ['従来の研究は、主に雇用機会の不足に着目してきた。', 'Juurai no kenkyuu wa, omo ni koyou kikai no fusoku ni chakumoku shite kita.', 'Penelitian sebelumnya terutama berfokus pada kurangnya kesempatan kerja.'],
    ['しかし、本稿は文化的な閉塞感という観点からこの問題を捉え直す。', 'Shikashi, honkou wa bunkateki na heisokukan to iu kanten kara kono mondai o toraenaosu.', 'Namun, tulisan ini memandang ulang masalah tersebut dari sudut rasa terkungkung secara budaya.'],
    ['この視点は、従来の政策が見落としてきた側面を照らし出すであろう。', 'Kono shiten wa, juurai no seisaku ga miotoshite kita sokumen o terashidasu de arou.', 'Sudut pandang ini diharapkan menyoroti sisi yang selama ini terlewatkan oleh kebijakan.'],
  ]],
  ['Kertas kebijakan', ['Kertas kebijakan: ringkasan eksekutif, analisis, opsi, rekomendasi.', 'Rekomendasi ditulis tegas dengan 〜すべきである / 〜を提言する.'], [
    ['現行制度は、非正規雇用者を十分に保護しているとは言い難い。', 'Genkou seido wa, hiseiki koyousha o juubun ni hogo shite iru to wa iigatai.', 'Sulit dikatakan bahwa sistem saat ini cukup melindungi pekerja tidak tetap.'],
    ['社会保険の適用範囲を拡大することを提言する。', 'Shakai hoken no tekiyou han-i o kakudai suru koto o teigen suru.', 'Kami merekomendasikan perluasan cakupan asuransi sosial.'],
    ['あわせて、中小企業への移行支援策を講じるべきである。', 'Awasete, chuushou kigyou e no ikou shiensaku o koujiru beki de aru.', 'Bersamaan dengan itu, langkah dukungan transisi bagi usaha kecil menengah harus diambil.'],
    ['段階的な導入により、経済への影響を最小限に抑えることが可能となる。', 'Dankaiteki na dounyuu ni yori, keizai e no eikyou o saishougen ni osaeru koto ga kanou to naru.', 'Dengan penerapan bertahap, dampak terhadap ekonomi dapat ditekan seminimal mungkin.'],
  ]],
  ['Ulasan kritis', ['Ulasan kritis buku: ringkasan isi → kontribusi → kelemahan → penilaian akhir.', 'Gunakan bahasa yang adil: 〜は評価に値するが, 〜の点で物足りない.'], [
    ['本書は、戦後日本の住宅政策を包括的に論じた労作である。', 'Honsho wa, sengo Nihon no juutaku seisaku o houkatsuteki ni ronjita rousaku de aru.', 'Buku ini adalah karya serius yang membahas kebijakan perumahan Jepang pascaperang secara komprehensif.'],
    ['膨大な一次資料を丹念に読み解いた点は、高く評価に値する。', 'Boudai na ichiji shiryou o tannen ni yomitoita ten wa, takaku hyouka ni atai suru.', 'Ketelitiannya membaca sumber primer yang sangat banyak patut diapresiasi tinggi.'],
    ['一方、地方の事例が乏しく、都市中心の分析に偏っている感は否めない。', 'Ippou, chihou no jirei ga toboshiku, toshi chuushin no bunseki ni katayotte iru kan wa inamenai.', 'Di sisi lain, contoh dari daerah minim, dan tak dapat dipungkiri analisisnya condong ke perkotaan.'],
    ['とはいえ、本分野の研究者にとって必読の一冊であることに変わりはない。', 'To wa ie, honbun-ya no kenkyuusha ni totte hitsudoku no issatsu de aru koto ni kawari wa nai.', 'Meski demikian, buku ini tetap wajib dibaca peneliti bidang ini.'],
  ]],
  ['Abstrak penelitian', ['Abstrak 200–400 karakter: latar, tujuan, metode, hasil, implikasi.', 'Tanpa kutipan dan tanpa singkatan yang tidak dijelaskan.'], [
    ['近年、高齢者の社会的孤立が深刻な問題となっている。', 'Kinnen, koureisha no shakaiteki koritsu ga shinkoku na mondai to natte iru.', 'Belakangan ini, isolasi sosial lansia menjadi masalah serius.'],
    ['本研究は、地域の居場所づくりが孤立の緩和に与える効果を検証した。', 'Honkenkyuu wa, chiiki no ibasho zukuri ga koritsu no kanwa ni ataeru kouka o kenshou shita.', 'Penelitian ini memverifikasi efek penciptaan ruang komunitas terhadap peredaan isolasi.'],
    ['三つの自治体で参加者への聞き取り調査を行った。', 'Mittsu no jichitai de sankasha e no kikitori chousa o okonatta.', 'Wawancara dilakukan terhadap peserta di tiga pemerintah daerah.'],
    ['その結果、定期的な交流が精神的な健康を改善することが明らかになった。', 'Sono kekka, teikiteki na kouryuu ga seishinteki na kenkou o kaizen suru koto ga akiraka ni natta.', 'Hasilnya menunjukkan bahwa interaksi rutin memperbaiki kesehatan mental.'],
  ]],
  ['Ringkasan eksekutif', ['Ringkasan eksekutif: kesimpulan dan rekomendasi di awal, detail di belakang.', 'Kalimat pendek dan padat; pembaca adalah pengambil keputusan.'], [
    ['結論：海外拠点の新設は、二年後を目途に実施すべきである。', 'Ketsuron: kaigai kyoten no shinsetsu wa, ninengo o meado ni jisshi subeki de aru.', 'Kesimpulan: pendirian basis luar negeri sebaiknya dilaksanakan dengan target dua tahun lagi.'],
    ['理由は、現地の規制緩和が来年度に予定されているためである。', 'Riyuu wa, genchi no kisei kanwa ga rainendo ni yotei sarete iru tame de aru.', 'Alasannya, pelonggaran regulasi setempat dijadwalkan tahun fiskal depan.'],
    ['初期投資は約十億円、五年以内の黒字化を見込む。', 'Shoki toushi wa yaku juuoku en, gonen inai no kurojika o mikomu.', 'Investasi awal sekitar satu miliar yen, diperkirakan untung dalam lima tahun.'],
    ['為替リスクについては、別紙にて詳述する。', 'Kawase risuku ni tsuite wa, besshi nite shoujutsu suru.', 'Mengenai risiko kurs, akan diuraikan rinci di lampiran terpisah.'],
  ]],
  ['Draf pidato formal', ['Draf pidato: salam formal → pesan inti → kisah singkat → harapan.', 'Tulis untuk didengar: kalimat lebih pendek, pengulangan yang disengaja.'], [
    ['本日、創立五十周年という節目を皆様と迎えられることを、心より嬉しく思います。', 'Honjitsu, souritsu gojuushuunen to iu fushime o minasama to mukaerareru koto o, kokoro yori ureshiku omoimasu.', 'Saya sungguh berbahagia dapat menyambut tonggak lima puluh tahun berdirinya bersama Anda semua hari ini.'],
    ['五十年前、この会社はわずか三人で始まりました。', 'Gojuunen mae, kono kaisha wa wazuka sannin de hajimarimashita.', 'Lima puluh tahun lalu, perusahaan ini dimulai hanya oleh tiga orang.'],
    ['今日の私たちがあるのは、先人たちの情熱と努力のおかげです。', 'Kyou no watashitachi ga aru no wa, senjintachi no jounetsu to doryoku no okage desu.', 'Kita ada hari ini berkat semangat dan usaha para pendahulu.'],
    ['次の五十年に向けて、共に新たな一歩を踏み出しましょう。', 'Tsugi no gojuunen ni mukete, tomo ni arata na ippo o fumidashimashou.', 'Menuju lima puluh tahun berikutnya, mari bersama melangkah ke langkah baru.'],
  ]],
  ['Sintesis argumen', ['Sintesis tertulis: sajikan dua posisi secara adil, lalu tawarkan kerangka yang menggabungkan.', 'Ungkapan: 〜という立場と〜という立場がある, 両者を架橋する.'], [
    ['安楽死をめぐっては、自己決定権を重視する立場と生命の尊厳を重視する立場がある。', 'Anrakushi o megutte wa, jiko ketteiken o juushi suru tachiba to seimei no songen o juushi suru tachiba ga aru.', 'Seputar eutanasia, ada posisi yang mementingkan hak menentukan diri dan posisi yang mementingkan martabat hidup.'],
    ['両者は一見、相容れないように思われる。', 'Ryousha wa ikken, aiirenai you ni omowareru.', 'Keduanya sekilas tampak tidak bisa didamaikan.'],
    ['だが、いずれも人間の尊厳を守ろうとする点では共通している。', 'Da ga, izure mo ningen no songen o mamorou to suru ten de wa kyoutsuu shite iru.', 'Namun, keduanya sama-sama berusaha melindungi martabat manusia.'],
    ['両者を架橋する鍵は、十分な緩和ケアの保障にあるのではないか。', 'Ryousha o kakyou suru kagi wa, juubun na kanwa kea no hoshou ni aru no de wa nai ka.', 'Bukankah kunci yang menjembatani keduanya terletak pada jaminan perawatan paliatif yang memadai?'],
  ]],
  ['Tanggapan sastra', ['Tanggapan sastra: tesis tafsiran → bukti dari teks → konteks → makna masa kini.', 'Kutip teks secara singkat dengan 「」.'], [
    ['芥川龍之介の「羅生門」は、極限状況における人間の倫理を問う作品である。', 'Akutagawa Ryuunosuke no "Rashoumon" wa, kyokugen joukyou ni okeru ningen no rinri o tou sakuhin de aru.', '"Rashomon" karya Akutagawa Ryunosuke adalah karya yang mempertanyakan etika manusia dalam situasi ekstrem.'],
    ['下人は老婆の論理を借りて、自らの悪を正当化する。', 'Genin wa rouba no ronri o karite, mizukara no aku o seitouka suru.', 'Sang pelayan meminjam logika si nenek untuk membenarkan kejahatannya sendiri.'],
    ['「下人の行方は、誰も知らない」という結末は、読者に判断を委ねている。', '"Genin no yukue wa, dare mo shiranai" to iu ketsumatsu wa, dokusha ni handan o yudanete iru.', 'Akhir cerita "Ke mana sang pelayan pergi, tak seorang pun tahu" menyerahkan penilaian kepada pembaca.'],
    ['百年を経た今も、この問いは私たちに突きつけられている。', 'Hyakunen o heta ima mo, kono toi wa watashitachi ni tsukitsukerarete iru.', 'Bahkan setelah seratus tahun, pertanyaan ini masih dihadapkan kepada kita.'],
  ]],
  ['Kritik media', ['Kritik media tertulis: kasus → teknik framing → dampak → usulan.', 'Gunakan bukti konkret: judul, gambar, pilihan narasumber.'], [
    ['ある事件の報道では、容疑者の生い立ちばかりが強調された。', 'Aru jiken no houdou de wa, yougisha no oitachi bakari ga kyouchou sareta.', 'Dalam pemberitaan sebuah kasus, latar belakang tersangka saja yang ditonjolkan.'],
    ['その結果、事件の社会的背景は見えにくくなった。', 'Sono kekka, jiken no shakaiteki haikei wa mienikuku natta.', 'Akibatnya, latar sosial kasus itu menjadi sulit terlihat.'],
    ['個人の問題として消費される報道は、構造的な問題を覆い隠す。', 'Kojin no mondai to shite shouhi sareru houdou wa, kouzouteki na mondai o ooikakusu.', 'Pemberitaan yang dikonsumsi sebagai masalah pribadi menutupi masalah struktural.'],
    ['報道機関には、事実の背後にある文脈を伝える責任がある。', 'Houdou kikan ni wa, jijitsu no haigo ni aru bunmyaku o tsutaeru sekinin ga aru.', 'Lembaga pers bertanggung jawab menyampaikan konteks di balik fakta.'],
  ]],
  ['Memo risiko', ['Memo risiko: risiko utama, probabilitas, dampak, mitigasi, penanggung jawab.', 'Ditulis ringkas dalam poin bernomor.'], [
    ['リスク一：主要取引先の経営悪化による売上減少。', 'Risuku ichi: shuyou torihikisaki no keiei akka ni yoru uriage genshou.', 'Risiko 1: penurunan penjualan akibat memburuknya kondisi mitra utama.'],
    ['発生確率は中程度だが、影響は極めて大きい。', 'Hassei kakuritsu wa chuuteido da ga, eikyou wa kiwamete ookii.', 'Probabilitasnya sedang, tetapi dampaknya sangat besar.'],
    ['対応策として、取引先の分散を今期中に進める。', 'Taiousaku to shite, torihikisaki no bunsan o konkichuu ni susumeru.', 'Sebagai langkah, diversifikasi mitra dilakukan dalam periode ini.'],
    ['責任者は営業本部長とし、四半期ごとに進捗を報告する。', 'Sekininsha wa eigyou honbuchou to shi, shihanki goto ni shinchoku o houkoku suru.', 'Penanggung jawabnya kepala divisi penjualan, dengan laporan kemajuan setiap kuartal.'],
  ]],
  ['Posisi etis', ['Posisi etis: nyatakan prinsip, terapkan pada kasus, akui keberatan.', 'Ungkapan: 〜という原則に立てば, 〜は正当化され得ない.'], [
    ['個人情報は、本人の同意なく利用されるべきではない。', 'Kojin jouhou wa, honnin no doui naku riyou sareru beki de wa nai.', 'Informasi pribadi tidak seharusnya dipakai tanpa persetujuan yang bersangkutan.'],
    ['この原則に立てば、利便性を理由とした無断収集は正当化され得ない。', 'Kono gensoku ni tateba, ribensei o riyuu to shita mudan shuushuu wa seitouka sareenai.', 'Berdasarkan prinsip ini, pengumpulan tanpa izin dengan alasan kepraktisan tidak dapat dibenarkan.'],
    ['公衆衛生上の緊急時は例外だとする意見もあろう。', 'Koushuu eiseijou no kinkyuuji wa reigai da to suru iken mo arou.', 'Mungkin ada pendapat bahwa keadaan darurat kesehatan masyarakat adalah pengecualian.'],
    ['その場合でも、目的と期間を厳格に限定する必要がある。', 'Sono baai demo, mokuteki to kikan o genkaku ni gentei suru hitsuyou ga aru.', 'Bahkan dalam hal itu, tujuan dan jangka waktunya perlu dibatasi dengan ketat.'],
  ]],
  ['Email negosiasi profesional', ['Email negosiasi: apresiasi → posisi → usulan alternatif → ajakan bertemu.', 'Nada tetap sopan meskipun menolak.'], [
    ['ご提示いただいた条件について、社内で慎重に検討いたしました。', 'Goteiji itadaita jouken ni tsuite, shanai de shinchou ni kentou itashimashita.', 'Kami telah membahas syarat yang Anda ajukan dengan hati-hati di internal.'],
    ['誠に恐縮ながら、現行の価格での合意は難しいとの結論に至りました。', 'Makoto ni kyoushuku nagara, genkou no kakaku de no goui wa muzukashii to no ketsuron ni itarimashita.', 'Dengan segala hormat, kami sampai pada kesimpulan bahwa kesepakatan dengan harga saat ini sulit.'],
    ['つきましては、納品数量の調整による代替案をご提案申し上げます。', 'Tsukimashite wa, nouhin suuryou no chousei ni yoru daitaian o goteian moushiagemasu.', 'Karena itu, kami mengajukan usulan alternatif dengan penyesuaian jumlah pengiriman.'],
    ['一度、直接お話しする機会を頂戴できれば幸甚です。', 'Ichido, chokusetsu ohanashi suru kikai o choudai dekireba koujin desu.', 'Kami akan sangat berterima kasih jika diberi kesempatan berbicara langsung.'],
  ]],
  ['Proposal hibah', ['Proposal hibah: kebaruan, kelayakan, dampak sosial, rencana anggaran.', 'Ungkapan: 独創性, 実現可能性, 波及効果.'], [
    ['本研究の独創性は、方言音声をAIで再現する点にある。', 'Honkenkyuu no dokusousei wa, hougen onsei o eeai de saigen suru ten ni aru.', 'Orisinalitas penelitian ini terletak pada pembuatan ulang suara dialek dengan AI.'],
    ['既に予備調査で十時間分の音声データを収集済みである。', 'Sude ni yobi chousa de juujikanbun no onsei deeta o shuushuuzumi de aru.', 'Data suara sepanjang sepuluh jam sudah dikumpulkan dalam survei pendahuluan.'],
    ['成果は、消滅危機言語の保存に大きな波及効果をもたらすと期待される。', 'Seika wa, shoumetsu kiki gengo no hozon ni ookina hakyuu kouka o motarasu to kitai sareru.', 'Hasilnya diharapkan membawa efek berantai besar bagi pelestarian bahasa yang terancam punah.'],
    ['申請額の内訳は、人件費が六割、機材費が三割である。', 'Shinseigaku no uchiwake wa, jinkenhi ga rokuwari, kizaihi ga sanwari de aru.', 'Rincian dana yang diajukan: biaya tenaga kerja enam puluh persen, biaya peralatan tiga puluh persen.'],
  ]],
  ['Pembuka retoris', ['Pembuka retoris: kutipan, pertanyaan, paradoks, atau adegan konkret.', 'Kalimat pertama harus membuat pembaca ingin lanjut.'], [
    ['「便利さは、人から考える時間を奪う」――ある哲学者はそう書いた。', '"Benrisa wa, hito kara kangaeru jikan o ubau" -- aru tetsugakusha wa sou kaita.', '"Kepraktisan merampas waktu manusia untuk berpikir" — begitu tulis seorang filsuf.'],
    ['私たちは、かつてないほど速く答えにたどり着けるようになった。', 'Watashitachi wa, katsute nai hodo hayaku kotae ni tadoritsukeru you ni natta.', 'Kita kini bisa sampai pada jawaban lebih cepat dari sebelumnya.'],
    ['しかし、その答えは本当に私たち自身のものだろうか。', 'Shikashi, sono kotae wa hontou ni watashitachi jishin no mono darou ka.', 'Namun, apakah jawaban itu benar-benar milik kita sendiri?'],
    ['本稿では、この素朴な問いから出発したい。', 'Honkou de wa, kono soboku na toi kara shuppatsu shitai.', 'Tulisan ini ingin berangkat dari pertanyaan sederhana tersebut.'],
  ]],
  ['Menguasai sanggahan', ['Sanggahan tingkat lanjut: sajikan keberatan terkuat, lalu jawab dengan presisi.', 'Ungkapan: 想定される反論として, この批判は〜を見落としている.'], [
    ['想定される反論として、規制は技術革新を妨げるという主張がある。', 'Soutei sareru hanron to shite, kisei wa gijutsu kakushin o samatageru to iu shuchou ga aru.', 'Sebagai sanggahan yang mungkin muncul, ada klaim bahwa regulasi menghambat inovasi teknologi.'],
    ['確かに、過度な規制が新規参入を阻んだ例は少なくない。', 'Tashika ni, kado na kisei ga shinki sannyuu o habanda rei wa sukunaku nai.', 'Memang, contoh regulasi berlebihan yang menghalangi pendatang baru tidak sedikit.'],
    ['だが、この批判は規制が信頼の基盤となる側面を見落としている。', 'Da ga, kono hihan wa kisei ga shinrai no kiban to naru sokumen o miotoshite iru.', 'Namun, kritik ini melewatkan sisi bahwa regulasi menjadi fondasi kepercayaan.'],
    ['問題は規制の有無ではなく、その設計の巧拙なのである。', 'Mondai wa kisei no umu de wa naku, sono sekkei no kousetsu na no de aru.', 'Masalahnya bukan ada tidaknya regulasi, melainkan baik buruknya rancangannya.'],
  ]],
  ['Menulis dengan kanji N1', ['Pilih kanji N1 yang tepat konteks: 顧みる/省みる, 異議/意義, 追及/追求/追究.', 'Kesalahan homofon menurunkan kredibilitas tulisan.'], [
    ['責任の所在を追及する声が高まっている。', 'Sekinin no shozai o tsuikyuu suru koe ga takamatte iru.', 'Suara yang menuntut kejelasan siapa yang bertanggung jawab semakin keras.'],
    ['利益の追求だけが、企業の目的ではない。', 'Rieki no tsuikyuu dake ga, kigyou no mokuteki de wa nai.', 'Mengejar keuntungan bukan satu-satunya tujuan perusahaan.'],
    ['真理の追究こそが、学問の本分である。', 'Shinri no tsuikyuu koso ga, gakumon no honbun de aru.', 'Menelusuri kebenaran adalah tugas hakiki ilmu pengetahuan.'],
    ['過去を顧みて、自らの行いを省みる。', 'Kako o kaerimite, mizukara no okonai o kaerimiru.', 'Menengok masa lalu dan merenungkan perbuatan sendiri.'],
  ]],
  ['Memperhalus gaya', ['Perhalus gaya: hindari pengulangan, variasikan panjang kalimat, pilih kata yang presisi.', 'Ganti kata umum (する, ある) dengan kata kerja spesifik.'], [
    ['問題が起きた → 問題が生じた', 'Mondai ga okita / mondai ga shoujita', 'masalah terjadi → masalah timbul (lebih formal)'],
    ['大きく変わった → 劇的な変化を遂げた', 'Ookiku kawatta / gekiteki na henka o togeta', 'berubah besar → mengalami perubahan dramatis'],
    ['よく考える必要がある → 慎重な検討を要する', 'Yoku kangaeru hitsuyou ga aru / shinchou na kentou o yousuru', 'perlu dipikirkan baik-baik → memerlukan kajian hati-hati'],
    ['影響がある → 影響を及ぼす', 'Eikyou ga aru / eikyou o oyobosu', 'ada pengaruh → memberikan pengaruh'],
  ]],
  ['Audit koherensi', ['Audit koherensi: apakah tiap paragraf mendukung tesis? apakah transisi logis?', 'Periksa kata tunjuk (これ, その) merujuk pada hal yang jelas.'], [
    ['各段落の冒頭文だけを読んで、論旨が通るか確認する。', 'Kaku danraku no boutoubun dake o yonde, ronshi ga tooru ka kakunin suru.', 'Baca kalimat pembuka tiap paragraf saja untuk memastikan alur argumen tersambung.'],
    ['指示語が何を指しているか、曖昧な箇所に印をつける。', 'Shijigo ga nani o sashite iru ka, aimai na kasho ni shirushi o tsukeru.', 'Tandai bagian di mana rujukan kata tunjuk tidak jelas.'],
    ['主張と無関係な具体例は、思い切って削除する。', 'Shuchou to mukankei na gutairei wa, omoikitte sakujo suru.', 'Contoh konkret yang tidak berkaitan dengan klaim dihapus dengan tegas.'],
    ['結論が序論の問いに答えているか、最後に照合する。', 'Ketsuron ga joron no toi ni kotaete iru ka, saigo ni shougou suru.', 'Terakhir, cocokkan apakah kesimpulan menjawab pertanyaan di pendahuluan.'],
  ]],
  ['Esai 800 karakter', ['Esai 800 karakter: 序論 (15%), 本論 (70%, dua sub-argumen + sanggahan), 結論 (15%).', 'Kerangka dulu, baru tulis; sisakan waktu untuk merevisi.'], [
    ['技術の進歩は、果たして人間を自由にしたのだろうか。', 'Gijutsu no shinpo wa, hatashite ningen o jiyuu ni shita no darou ka.', 'Apakah kemajuan teknologi benar-benar membebaskan manusia?'],
    ['確かに、家事や移動にかかる時間は大幅に短縮された。', 'Tashika ni, kaji ya idou ni kakaru jikan wa oohaba ni tanshuku sareta.', 'Memang, waktu untuk pekerjaan rumah dan perjalanan sangat dipersingkat.'],
    ['しかし、生まれた余暇は、新たな仕事や情報処理に費やされている。', 'Shikashi, umareta yoka wa, arata na shigoto ya jouhou shori ni tsuiyasarete iru.', 'Namun, waktu luang yang tercipta dihabiskan untuk pekerjaan baru dan pengolahan informasi.'],
    ['真の自由は、技術そのものではなく、それをどう使うかという選択の中にある。', 'Shin no jiyuu wa, gijutsu sono mono de wa naku, sore o dou tsukau ka to iu sentaku no naka ni aru.', 'Kebebasan sejati ada pada pilihan cara menggunakannya, bukan pada teknologi itu sendiri.'],
  ]],
  ['Ulasan writing N1', ['Periksa: kedalaman argumen, presisi kata, register akademik, dan koherensi.', 'Revisi minimal dua kali: isi dulu, lalu bahasa.'], [
    ['文章の質は、推敲の回数に比例すると言っても過言ではない。', 'Bunshou no shitsu wa, suikou no kaisuu ni hirei suru to itte mo kagon de wa nai.', 'Tidak berlebihan jika dikatakan kualitas tulisan sebanding dengan jumlah revisinya.'],
    ['一度目は論理の流れを、二度目は語の選択を見直す。', 'Ichidome wa ronri no nagare o, nidome wa go no sentaku o minaosu.', 'Revisi pertama untuk alur logika, revisi kedua untuk pilihan kata.'],
    ['時間をおいて読み返すと、思わぬ欠点に気づくものだ。', 'Jikan o oite yomikaesu to, omowanu ketten ni kizuku mono da.', 'Jika dibaca ulang setelah jeda waktu, kita akan menyadari kekurangan tak terduga.'],
    ['書くことは、考えることそのものなのである。', 'Kaku koto wa, kangaeru koto sono mono na no de aru.', 'Menulis adalah berpikir itu sendiri.'],
  ]],
];
