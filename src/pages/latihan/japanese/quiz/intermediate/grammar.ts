import type { JapaneseQuizTopic } from '../types';

// Latihan Grammar N3 — one entry per topic (index = topic - 1): [Basic, Advanced].
export const grammar: JapaneseQuizTopic[] = [
  // 1. Kesan dan dugaan: そう・よう・みたい
  [
    [
      ["高そう", "Takasou", "kelihatannya mahal"],
      ["落ちそう", "Ochisou", "sepertinya akan jatuh"],
      ["留守のよう", "Rusu no you", "sepertinya tidak di rumah"],
      ["子どもみたい", "Kodomo mitai", "seperti anak kecil", ["Bentuk そう (kelihatannya) dari いい adalah...", "よさそう", "いそう", "いいそう", "よいそう"]],
    ],
    [
      ["その荷物、重そうですね。手伝いましょうか。", "Sono nimotsu, omosou desu ne. Tetsudaimashou ka.", "Barang itu kelihatannya berat. Mau saya bantu?"],
      ["棚の上の箱が今にも落ちそうだ。", "Tana no ue no hako ga ima ni mo ochisou da.", "Kotak di atas rak sepertinya sebentar lagi jatuh."],
      ["電気がついていないから、留守のようだ。", "Denki ga tsuite inai kara, rusu no you da.", "Lampunya tidak menyala, sepertinya tidak ada orang."],
      ["彼はまるで子どもみたいに喜んだ。", "Kare wa marude kodomo mitai ni yorokonda.", "Dia senang sekali seperti anak kecil.", ["みたい adalah bentuk ... dari よう", "lisan / santai", "sangat formal", "tulisan resmi", "kuno"]],
    ],
  ],
  // 2. Kabar dan ciri khas: らしい
  [
    [
      ["結婚するらしい", "Kekkon suru rashii", "katanya akan menikah"],
      ["男らしい", "Otokorashii", "jantan / khas laki-laki"],
      ["夏らしい", "Natsurashii", "khas musim panas"],
      ["彼らしい", "Karerashii", "khas dirinya", ["らしい pada 夏らしい天気 berarti...", "ciri khas (cuaca khas musim panas)", "katanya", "seharusnya", "tidak mungkin"]],
    ],
    [
      ["隣の家族は来月引っ越すらしい。", "Tonari no kazoku wa raigetsu hikkosu rashii.", "Katanya keluarga sebelah akan pindah bulan depan."],
      ["今日は朝から夏らしい暑さだ。", "Kyou wa asa kara natsurashii atsusa da.", "Sejak pagi panasnya khas musim panas."],
      ["遅刻するなんて、まじめな彼らしくない。", "Chikoku suru nante, majime na karerashikunai.", "Terlambat itu bukan khas dirinya yang serius."],
      ["あの店のラーメンはとてもおいしいらしいよ。", "Ano mise no raamen wa totemo oishii rashii yo.", "Katanya ramen di toko itu sangat enak, lho."],
    ],
  ],
  // 3. Pengandaian ば dan なら
  [
    [
      ["行けば", "Ikeba", "kalau pergi"],
      ["安ければ", "Yasukereba", "kalau murah"],
      ["暇なら", "Hima nara", "kalau senggang"],
      ["雨なら", "Ame nara", "kalau hujan", ["Bentuk ば dari 食べる adalah...", "食べれば", "食べば", "食べるば", "食べたば"]],
    ],
    [
      ["この薬を飲めば、すぐ治りますよ。", "Kono kusuri o nomeba, sugu naorimasu yo.", "Kalau minum obat ini, cepat sembuh."],
      ["天気がよければ、富士山が見えます。", "Tenki ga yokereba, Fujisan ga miemasu.", "Kalau cuacanya bagus, Gunung Fuji terlihat."],
      ["暇なら、ちょっと手伝ってくれない？", "Hima nara, chotto tetsudatte kurenai?", "Kalau senggang, bisa bantu sebentar?"],
      ["京都へ行くなら、秋がいちばんいいですよ。", "Kyouto e iku nara, aki ga ichiban ii desu yo.", "Kalau mau ke Kyoto, musim gugur paling bagus."],
    ],
  ],
  // 4. Walaupun: ても
  [
    [
      ["寒くても", "Samukute mo", "walaupun dingin"],
      ["何度読んでも", "Nando yonde mo", "berapa kali pun dibaca"],
      ["子どもでも", "Kodomo demo", "anak kecil pun"],
      ["忙しくても", "Isogashikute mo", "walaupun sibuk", ["Bentuk ても dari 静か (kata sifat な) adalah...", "静かでも", "静かくても", "静かっても", "静かなでも"]],
    ],
    [
      ["どんなに忙しくても、毎日少し勉強しています。", "Donna ni isogashikute mo, mainichi sukoshi benkyou shite imasu.", "Sesibuk apa pun, saya belajar sedikit setiap hari."],
      ["何度読んでも、この文の意味がわからない。", "Nando yonde mo, kono bun no imi ga wakaranai.", "Berapa kali pun dibaca, saya tidak mengerti arti kalimat ini."],
      ["この本は易しいから、子どもでも読めます。", "Kono hon wa yasashii kara, kodomo demo yomemasu.", "Buku ini mudah, jadi anak kecil pun bisa membacanya."],
      ["寒くても、窓を開けて寝るのが好きだ。", "Samukute mo, mado o akete neru no ga suki da.", "Walaupun dingin, saya suka tidur dengan jendela terbuka."],
    ],
  ],
  // 5. Tujuan: ために dan ように
  [
    [
      ["合格するために", "Goukaku suru tame ni", "untuk lulus"],
      ["家族のために", "Kazoku no tame ni", "demi keluarga"],
      ["遅れないように", "Okurenai you ni", "agar tidak terlambat"],
      ["見えるように", "Mieru you ni", "agar terlihat", ["ように biasanya dipakai dengan kata kerja...", "bukan kehendak / potensial / negatif", "kehendak saja", "bentuk た saja", "perintah"]],
    ],
    [
      ["留学するために、毎月お金を貯めています。", "Ryuugaku suru tame ni, maitsuki okane o tamete imasu.", "Untuk belajar ke luar negeri, saya menabung setiap bulan."],
      ["家族のために、一生懸命働いている。", "Kazoku no tame ni, isshoukenmei hataraite iru.", "Demi keluarga, dia bekerja keras."],
      ["遅れないように、目覚まし時計を二つかけた。", "Okurenai you ni, mezamashidokei o futatsu kaketa.", "Agar tidak terlambat, saya memasang dua jam weker."],
      ["みんなに見えるように、字を大きく書いてください。", "Minna ni mieru you ni, ji o ookiku kaite kudasai.", "Tulis hurufnya besar agar terlihat oleh semua."],
    ],
  ],
  // 6. Keputusan pihak lain: ことになる
  [
    [
      ["転勤することになる", "Tenkin suru koto ni naru", "jadi dimutasi"],
      ["延期することになった", "Enki suru koto ni natta", "diputuskan ditunda"],
      ["ことになっている", "Koto ni natte iru", "aturannya adalah"],
      ["担当することになった", "Tantou suru koto ni natta", "jadi bertanggung jawab", ["ことになる menunjukkan keputusan oleh...", "pihak lain / keadaan", "diri sendiri", "tidak ada yang memutuskan", "guru saja"]],
    ],
    [
      ["来年から海外の支社に転勤することになりました。", "Rainen kara kaigai no shisha ni tenkin suru koto ni narimashita.", "Mulai tahun depan saya jadi dimutasi ke kantor cabang luar negeri."],
      ["雨のため、運動会は延期することになった。", "Ame no tame, undoukai wa enki suru koto ni natta.", "Karena hujan, festival olahraga diputuskan ditunda."],
      ["この寮では十時以降は外出できないことになっている。", "Kono ryou de wa juuji ikou wa gaishutsu dekinai koto ni natte iru.", "Aturan asrama ini, setelah pukul sepuluh tidak boleh keluar."],
      ["新しい企画は私が担当することになった。", "Atarashii kikaku wa watashi ga tantou suru koto ni natta.", "Saya jadi bertanggung jawab atas proyek baru."],
    ],
  ],
  // 7. Keputusan sendiri: ことにする
  [
    [
      ["やめることにする", "Yameru koto ni suru", "memutuskan berhenti"],
      ["行かないことにした", "Ikanai koto ni shita", "memutuskan tidak pergi"],
      ["ことにしている", "Koto ni shite iru", "membiasakan diri untuk"],
      ["歩くことにした", "Aruku koto ni shita", "memutuskan berjalan kaki", ["ことにする menunjukkan keputusan oleh...", "pembicara sendiri", "perusahaan", "pemerintah", "cuaca"]],
    ],
    [
      ["健康のために、たばこをやめることにした。", "Kenkou no tame ni, tabako o yameru koto ni shita.", "Demi kesehatan, saya memutuskan berhenti merokok."],
      ["熱があるので、今日のパーティーには行かないことにした。", "Netsu ga aru node, kyou no paatii ni wa ikanai koto ni shita.", "Karena demam, saya memutuskan tidak pergi ke pesta hari ini."],
      ["毎晩寝る前に日記を書くことにしている。", "Maiban neru mae ni nikki o kaku koto ni shite iru.", "Saya membiasakan menulis buku harian setiap malam sebelum tidur."],
      ["天気がいいので、駅まで歩くことにした。", "Tenki ga ii node, eki made aruku koto ni shita.", "Cuacanya bagus, jadi saya memutuskan berjalan kaki ke stasiun."],
    ],
  ],
  // 8. Logika dan kesimpulan: わけ
  [
    [
      ["上手なわけだ", "Jouzu na wake da", "pantas saja pandai"],
      ["わけではない", "Wake de wa nai", "bukan berarti"],
      ["わけがない", "Wake ga nai", "tidak mungkin"],
      ["わけにはいかない", "Wake ni wa ikanai", "tidak bisa (karena alasan moral)", ["わけがない berarti...", "tidak mungkin", "pantas saja", "bukan berarti", "harus"]],
    ],
    [
      ["彼は毎日練習しているから、上手なわけだ。", "Kare wa mainichi renshuu shite iru kara, jouzu na wake da.", "Dia berlatih setiap hari, pantas saja pandai."],
      ["お金があれば幸せになれるわけではない。", "Okane ga areba shiawase ni nareru wake de wa nai.", "Bukan berarti kalau punya uang pasti bahagia."],
      ["こんな難しい問題が、子どもに解けるわけがない。", "Konna muzukashii mondai ga, kodomo ni tokeru wake ga nai.", "Soal sesulit ini tidak mungkin bisa dipecahkan anak kecil."],
      ["明日は試験だから、遊びに行くわけにはいかない。", "Ashita wa shiken da kara, asobi ni iku wake ni wa ikanai.", "Besok ujian, jadi saya tidak bisa pergi bermain."],
    ],
  ],
  // 9. Keyakinan: はず
  [
    [
      ["来るはず", "Kuru hazu", "seharusnya datang"],
      ["はずがない", "Hazu ga nai", "mustahil (berdasarkan alasan)"],
      ["知っているはず", "Shitte iru hazu", "seharusnya tahu"],
      ["はずだった", "Hazu datta", "seharusnya (tapi tidak terjadi)", ["はず menunjukkan...", "keyakinan berdasarkan alasan", "keinginan", "perintah", "izin"]],
    ],
    [
      ["彼は三時に来るはずですが、まだ来ていません。", "Kare wa sanji ni kuru hazu desu ga, mada kite imasen.", "Dia seharusnya datang pukul tiga, tapi belum datang."],
      ["あんなに優しい人が怒るはずがない。", "Anna ni yasashii hito ga okoru hazu ga nai.", "Orang sebaik itu tidak mungkin marah."],
      ["先週メールを送ったから、もう知っているはずだ。", "Senshuu meeru o okutta kara, mou shitte iru hazu da.", "Saya sudah mengirim email minggu lalu, jadi dia seharusnya sudah tahu."],
      ["今日は休みのはずだったのに、急に仕事が入った。", "Kyou wa yasumi no hazu datta noni, kyuu ni shigoto ga haitta.", "Hari ini seharusnya libur, tapi tiba-tiba ada pekerjaan."],
    ],
  ],
  // 10. Kewajiban moral: べき
  [
    [
      ["謝るべき", "Ayamaru beki", "seharusnya minta maaf"],
      ["すべき", "Su beki", "seharusnya melakukan"],
      ["べきではない", "Beki de wa nai", "tidak seharusnya"],
      ["行くべきだった", "Iku beki datta", "seharusnya pergi (tapi tidak)", ["Bentuk べき dari する yang umum adalah...", "すべき / するべき", "しべき", "したべき", "しるべき"]],
    ],
    [
      ["悪いことをしたら、すぐに謝るべきだ。", "Warui koto o shitara, sugu ni ayamaru beki da.", "Kalau berbuat salah, seharusnya segera minta maaf."],
      ["若いうちに、いろいろな経験をすべきだ。", "Wakai uchi ni, iroiro na keiken o su beki da.", "Selagi muda, seharusnya mengalami berbagai hal."],
      ["人の秘密を他の人に話すべきではない。", "Hito no himitsu o hoka no hito ni hanasu beki de wa nai.", "Tidak seharusnya menceritakan rahasia orang kepada orang lain."],
      ["もっと早く病院に行くべきだった。", "Motto hayaku byouin ni iku beki datta.", "Seharusnya saya pergi ke rumah sakit lebih awal."],
    ],
  ],
  // 11. Tingkat: ほど dan くらい
  [
    [
      ["死ぬほど", "Shinu hodo", "sampai mau mati (sangat)"],
      ["去年ほど", "Kyonen hodo", "(tidak) se... tahun lalu"],
      ["それくらい", "Sore kurai", "sebanyak itu / segitu"],
      ["驚くほど", "Odoroku hodo", "sampai mengejutkan", ["AはBほど〜ない berarti...", "A tidak se... B", "A lebih ... dari B", "A sama dengan B", "A paling ..."]],
    ],
    [
      ["昨日は死ぬほど疲れて、すぐに寝てしまった。", "Kinou wa shinu hodo tsukarete, sugu ni nete shimatta.", "Kemarin saya lelah sekali dan langsung tertidur."],
      ["今年の冬は去年ほど寒くない。", "Kotoshi no fuyu wa kyonen hodo samukunai.", "Musim dingin tahun ini tidak sedingin tahun lalu."],
      ["それくらいのことで泣かないで。", "Sore kurai no koto de nakanaide.", "Jangan menangis hanya karena hal segitu."],
      ["その映画は驚くほど人気がある。", "Sono eiga wa odoroku hodo ninki ga aru.", "Film itu populernya sampai mengejutkan."],
    ],
  ],
  // 12. Tidak hanya: だけでなく
  [
    [
      ["だけでなく", "Dake de naku", "tidak hanya"],
      ["ばかりでなく", "Bakari de naku", "bukan hanya"],
      ["それだけでなく", "Sore dake de naku", "tidak hanya itu"],
      ["日本だけでなく", "Nihon dake de naku", "tidak hanya di Jepang", ["Pola 'tidak hanya A tetapi juga B' adalah...", "AだけでなくBも", "AだけBも", "AでなくてBだけ", "AもBもない"]],
    ],
    [
      ["アニメは日本だけでなく、世界中で人気がある。", "Anime wa Nihon dake de naku, sekaijuu de ninki ga aru.", "Anime populer tidak hanya di Jepang, tetapi di seluruh dunia."],
      ["この仕事は体力だけでなく、集中力も必要だ。", "Kono shigoto wa tairyoku dake de naku, shuuchuuryoku mo hitsuyou da.", "Pekerjaan ini tidak hanya butuh stamina, tetapi juga konsentrasi."],
      ["彼女は歌がうまい。それだけでなく、ダンスも上手だ。", "Kanojo wa uta ga umai. Sore dake de naku, dansu mo jouzu da.", "Dia pandai bernyanyi. Tidak hanya itu, dia juga pandai menari."],
      ["彼は勉強ばかりでなく、スポーツも得意だ。", "Kare wa benkyou bakari de naku, supootsu mo tokui da.", "Dia bukan hanya pintar belajar, tetapi juga hebat berolahraga."],
    ],
  ],
  // 13. Sikap dan kontras: に対して
  [
    [
      ["目上の人に対して", "Meue no hito ni taishite", "terhadap orang yang lebih tua/tinggi"],
      ["質問に対して", "Shitsumon ni taishite", "terhadap pertanyaan"],
      ["のに対して", "No ni taishite", "berbeda dengan / sementara"],
      ["子どもに対する", "Kodomo ni taisuru", "terhadap anak-anak", ["に対して bisa menunjukkan...", "sasaran sikap atau kontras", "waktu", "tempat", "alat"]],
    ],
    [
      ["目上の人に対しては、敬語を使ったほうがいい。", "Meue no hito ni taishite wa, keigo o tsukatta hou ga ii.", "Terhadap orang yang lebih tinggi, sebaiknya memakai keigo."],
      ["学生の質問に対して、先生は丁寧に答えた。", "Gakusei no shitsumon ni taishite, sensei wa teinei ni kotaeta.", "Guru menjawab pertanyaan murid dengan sopan."],
      ["姉が明るいのに対して、妹は静かだ。", "Ane ga akarui no ni taishite, imouto wa shizuka da.", "Berbeda dengan kakak yang ceria, adiknya pendiam."],
      ["子どもに対する親の愛情は深い。", "Kodomo ni taisuru oya no aijou wa fukai.", "Kasih sayang orang tua terhadap anak itu dalam."],
    ],
  ],
  // 14. Tentang topik: について
  [
    [
      ["将来について", "Shourai ni tsuite", "tentang masa depan"],
      ["についての", "Ni tsuite no", "tentang ... (sebelum kata benda)"],
      ["に関して", "Ni kanshite", "terkait dengan"],
      ["に関する", "Ni kansuru", "yang terkait dengan", ["Bentuk yang lebih formal dari について adalah...", "に関して", "によって", "に対して", "として"]],
    ],
    [
      ["将来について、両親とよく話し合った。", "Shourai ni tsuite, ryoushin to yoku hanashiatta.", "Saya banyak berdiskusi dengan orang tua tentang masa depan."],
      ["日本の食文化についてのレポートを書いた。", "Nihon no shokubunka ni tsuite no repooto o kaita.", "Saya menulis laporan tentang budaya kuliner Jepang."],
      ["この件に関して、何か質問はありますか。", "Kono ken ni kanshite, nanika shitsumon wa arimasu ka.", "Terkait hal ini, ada pertanyaan?"],
      ["交通安全に関するポスターを作りました。", "Koutsuu anzen ni kansuru posutaa o tsukurimashita.", "Saya membuat poster terkait keselamatan lalu lintas."],
    ],
  ],
  // 15. Peran dan status: として
  [
    [
      ["ボランティアとして", "Borantia to shite", "sebagai relawan"],
      ["親として", "Oya to shite", "sebagai orang tua"],
      ["趣味として", "Shumi to shite", "sebagai hobi"],
      ["代表として", "Daihyou to shite", "sebagai perwakilan", ["として berarti...", "sebagai (peran/status)", "untuk (tujuan)", "tentang", "oleh"]],
    ],
    [
      ["夏休みにボランティアとして病院で働いた。", "Natsuyasumi ni borantia to shite byouin de hataraita.", "Saat liburan musim panas saya bekerja di rumah sakit sebagai relawan."],
      ["親として、子どもの将来を心配するのは当然だ。", "Oya to shite, kodomo no shourai o shinpai suru no wa touzen da.", "Sebagai orang tua, wajar mengkhawatirkan masa depan anak."],
      ["料理は仕事ではなく、趣味として楽しんでいる。", "Ryouri wa shigoto de wa naku, shumi to shite tanoshinde iru.", "Memasak bukan pekerjaan, saya menikmatinya sebagai hobi."],
      ["彼女はクラスの代表としてスピーチをした。", "Kanojo wa kurasu no daihyou to shite supiichi o shita.", "Dia berpidato sebagai perwakilan kelas."],
    ],
  ],
  // 16. Tergantung dan oleh: によって
  [
    [
      ["国によって", "Kuni ni yotte", "tergantung negaranya"],
      ["季節によって", "Kisetsu ni yotte", "tergantung musim"],
      ["によると", "Ni yoru to", "menurut"],
      ["による", "Ni yoru", "yang disebabkan oleh", ["によると dipakai untuk menyebut...", "sumber informasi (menurut ...)", "alat", "waktu", "tujuan"]],
    ],
    [
      ["あいさつの仕方は国によって違う。", "Aisatsu no shikata wa kuni ni yotte chigau.", "Cara memberi salam berbeda tergantung negaranya."],
      ["この山の景色は季節によって変わる。", "Kono yama no keshiki wa kisetsu ni yotte kawaru.", "Pemandangan gunung ini berubah tergantung musim."],
      ["ニュースによると、明日は大雪になるそうだ。", "Nyuusu ni yoru to, ashita wa ooyuki ni naru sou da.", "Menurut berita, besok katanya akan turun salju lebat."],
      ["台風による被害は大きかった。", "Taifuu ni yoru higai wa ookikatta.", "Kerugian akibat topan itu besar."],
    ],
  ],
  // 17. Pasif dan kausatif
  [
    [
      ["行かせる", "Ikaseru", "menyuruh pergi"],
      ["待たせる", "Mataseru", "membuat menunggu"],
      ["待たされる", "Matasareru", "dibuat menunggu"],
      ["休ませてください", "Yasumasete kudasai", "izinkan saya istirahat", ["Bentuk kausatif dari 書く adalah...", "書かせる", "書かれる", "書けさせる", "書きさせる"]],
    ],
    [
      ["父は私を一人で旅行に行かせてくれた。", "Chichi wa watashi o hitori de ryokou ni ikasete kureta.", "Ayah mengizinkan saya berwisata sendirian."],
      ["お待たせしてすみません。", "Omatase shite sumimasen.", "Maaf membuat Anda menunggu."],
      ["病院で一時間も待たされた。", "Byouin de ichijikan mo matasareta.", "Di rumah sakit saya dibuat menunggu sampai satu jam."],
      ["体調が悪いので、今日は休ませてください。", "Taichou ga warui node, kyou wa yasumasete kudasai.", "Karena kurang sehat, izinkan saya libur hari ini."],
    ],
  ],
  // 18. Pengantar keigo
  [
    [
      ["いらっしゃる", "Irassharu", "ada / datang / pergi (hormat)"],
      ["おっしゃる", "Ossharu", "berkata (hormat)"],
      ["申す", "Mousu", "berkata (merendah)"],
      ["拝見する", "Haiken suru", "melihat (merendah)", ["Bentuk merendah (kenjougo) dari 見る adalah...", "拝見する", "ご覧になる", "見られる", "お見えになる"]],
    ],
    [
      ["先生は今、研究室にいらっしゃいます。", "Sensei wa ima, kenkyuushitsu ni irasshaimasu.", "Bapak/Ibu guru sekarang ada di ruang penelitian."],
      ["社長がおっしゃったことをメモしました。", "Shachou ga osshatta koto o memo shimashita.", "Saya mencatat apa yang dikatakan direktur."],
      ["はじめまして、田中と申します。", "Hajimemashite, Tanaka to moushimasu.", "Senang berkenalan, nama saya Tanaka."],
      ["お手紙を拝見しました。", "Otegami o haiken shimashita.", "Saya sudah membaca surat Anda."],
    ],
  ],
  // 19. Nominalisasi: の dan こと
  [
    [
      ["走るのが好き", "Hashiru no ga suki", "suka berlari"],
      ["話すことができる", "Hanasu koto ga dekiru", "bisa berbicara"],
      ["見るのが楽しみ", "Miru no ga tanoshimi", "tidak sabar melihat"],
      ["忘れること", "Wasureru koto", "hal melupakan", ["Dengan kata kerja persepsi (見える, 聞こえる), nominalisasi yang dipakai adalah...", "の", "こと", "もの", "ところ"]],
    ],
    [
      ["窓から子どもたちが遊んでいるのが見える。", "Mado kara kodomotachi ga asonde iru no ga mieru.", "Dari jendela terlihat anak-anak sedang bermain."],
      ["私の趣味は古い映画を見ることです。", "Watashi no shumi wa furui eiga o miru koto desu.", "Hobi saya menonton film lama."],
      ["来週、国の友達に会うのが楽しみだ。", "Raishuu, kuni no tomodachi ni au no ga tanoshimi da.", "Saya tidak sabar bertemu teman dari negara asal minggu depan."],
      ["一番大切なことは、自分を信じることだ。", "Ichiban taisetsu na koto wa, jibun o shinjiru koto da.", "Hal yang paling penting adalah percaya pada diri sendiri."],
    ],
  ],
  // 20. Ulasan grammar N3
  [
    [
      ["降りそうだ", "Furisou da", "sepertinya akan turun (hujan)"],
      ["受けることにした", "Ukeru koto ni shita", "memutuskan untuk mengikuti"],
      ["できるはずだ", "Dekiru hazu da", "seharusnya bisa"],
      ["守るべきだ", "Mamoru beki da", "seharusnya ditaati", ["Pola yang menunjukkan keyakinan berdasarkan alasan adalah...", "〜はずだ", "〜べきだ", "〜ことにする", "〜らしい"]],
    ],
    [
      ["雲が黒くなってきた。雨が降りそうだ。", "Kumo ga kuroku natte kita. Ame ga furisou da.", "Awannya menghitam. Sepertinya akan hujan."],
      ["来年、日本語能力試験のN2を受けることにした。", "Rainen, Nihongo nouryoku shiken no enu ni o ukeru koto ni shita.", "Saya memutuskan untuk ikut JLPT N2 tahun depan."],
      ["毎日勉強しているから、きっと合格できるはずだ。", "Mainichi benkyou shite iru kara, kitto goukaku dekiru hazu da.", "Karena belajar setiap hari, seharusnya pasti bisa lulus."],
      ["社会のルールはみんなが守るべきだと思う。", "Shakai no ruuru wa minna ga mamoru beki da to omou.", "Menurut saya aturan masyarakat seharusnya ditaati semua orang."],
    ],
  ],
];
