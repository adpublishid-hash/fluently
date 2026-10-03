import type { LessonCoreTuple } from '../types';

// Speaking N1 (dialog A/B) — one entry per lesson (index = lesson - 1).
export const speaking: LessonCoreTuple[] = [
  ['Sikap sebagai ahli', ['Ahli menyatakan posisi dengan dasar dan batasan: 専門の立場から申し上げますと.', 'Bedakan fakta yang terbukti dan pendapat pribadi.'], [
    ['専門家として、今回の規制をどう評価されますか。', 'Senmonka to shite, konkai no kisei o dou hyouka saremasu ka.', 'Sebagai ahli, bagaimana Anda menilai regulasi kali ini?'],
    ['専門の立場から申し上げますと、方向性は正しいと考えます。', 'Senmon no tachiba kara moushiagemasu to, houkousei wa tadashii to kangaemasu.', 'Dari sudut pandang keahlian, saya menilai arahnya sudah benar.'],
    ['ただ、効果を測る指標が明確ではありません。', 'Tada, kouka o hakaru shihyou ga meikaku de wa arimasen.', 'Hanya saja, indikator untuk mengukur efeknya belum jelas.'],
    ['ここから先は、あくまで私見ですが、段階的な見直しが必要でしょう。', 'Koko kara saki wa, akumade shiken desu ga, dankaiteki na minaoshi ga hitsuyou deshou.', 'Selanjutnya ini murni pendapat pribadi saya, tetapi peninjauan bertahap mungkin diperlukan.'],
  ]],
  ['Debat akademik', ['Debat akademik: rujuk penelitian, akui keterbatasan, dan tanggapi dengan argumen.', 'Ungkapan: 先行研究では, 〜という点で異論があります.'], [
    ['先行研究では、早期教育の効果は限定的だとされています。', 'Senkou kenkyuu de wa, souki kyouiku no kouka wa genteiteki da to sarete imasu.', 'Dalam penelitian terdahulu, efek pendidikan dini disebut terbatas.'],
    ['その研究は、対象の年齢層が狭いという点で異論があります。', 'Sono kenkyuu wa, taishou no nenreisou ga semai to iu ten de iron ga arimasu.', 'Saya keberatan dengan penelitian itu karena rentang usia subjeknya sempit.'],
    ['ご指摘はもっともですが、ほかの調査でも同様の結果が出ています。', 'Goshiteki wa mottomo desu ga, hoka no chousa demo douyou no kekka ga dete imasu.', 'Masukan Anda masuk akal, tetapi survei lain juga menunjukkan hasil serupa.'],
    ['では、長期的な追跡調査が必要だという点では一致しますね。', 'De wa, choukiteki na tsuiseki chousa ga hitsuyou da to iu ten de wa itchi shimasu ne.', 'Kalau begitu, kita sepakat bahwa diperlukan studi lanjutan jangka panjang.'],
  ]],
  ['Pengarahan kebijakan', ['Pengarahan: latar → opsi → rekomendasi → risiko, dengan ringkas.', 'Ungkapan: 選択肢は三つ考えられます, 推奨いたします.'], [
    ['本件について、選択肢は三つ考えられます。', 'Honken ni tsuite, sentakushi wa mittsu kangaeraremasu.', 'Untuk perkara ini, ada tiga pilihan yang bisa dipertimbangkan.'],
    ['費用対効果の観点から、第二案を推奨いたします。', 'Hiyou tai kouka no kanten kara, daini-an o suishou itashimasu.', 'Dari sudut efektivitas biaya, kami merekomendasikan opsi kedua.'],
    ['実施した場合のリスクは何でしょうか。', 'Jisshi shita baai no risuku wa nan deshou ka.', 'Apa risikonya jika dilaksanakan?'],
    ['短期的には、現場の負担が一時的に増えることが懸念されます。', 'Tankiteki ni wa, genba no futan ga ichijiteki ni fueru koto ga kenen saremasu.', 'Dalam jangka pendek, dikhawatirkan beban di lapangan meningkat sementara.'],
  ]],
  ['Kritik bernuansa', ['Kritik bernuansa: akui nilai, lalu tunjukkan masalah secara spesifik.', 'Ungkapan: 意欲的な試みではあるものの, 〜点が惜しまれる.'], [
    ['この作品は、意欲的な試みではあるものの、完成度に課題が残ります。', 'Kono sakuhin wa, iyokuteki na kokoromi de wa aru mono no, kanseido ni kadai ga nokorimasu.', 'Karya ini memang percobaan yang ambisius, tetapi tingkat kesempurnaannya masih bermasalah.'],
    ['具体的には、どの点でしょうか。', 'Gutaiteki ni wa, dono ten deshou ka.', 'Secara konkret, di bagian mana?'],
    ['後半で主題がぼやけてしまった点が惜しまれます。', 'Kouhan de shudai ga boyakete shimatta ten ga oshimaremasu.', 'Sayang sekali temanya menjadi kabur di paruh kedua.'],
    ['なるほど、構成の問題ということですね。', 'Naruhodo, kousei no mondai to iu koto desu ne.', 'Oh begitu, jadi ini masalah struktur, ya.'],
  ]],
  ['Sintesis abstrak', ['Sintesis: hubungkan beberapa konsep menjadi satu kerangka.', 'Ungkapan: 〜という観点から捉え直すと, 両者に通底するのは.'], [
    ['自由と責任は、対立する概念なのでしょうか。', 'Jiyuu to sekinin wa, tairitsu suru gainen na no deshou ka.', 'Apakah kebebasan dan tanggung jawab konsep yang bertentangan?'],
    ['関係性という観点から捉え直すと、むしろ表裏一体だと思います。', 'Kankeisei to iu kanten kara toraenaosu to, mushiro hyouri ittai da to omoimasu.', 'Kalau dilihat ulang dari sudut hubungan, menurut saya justru dua sisi dari satu hal.'],
    ['両者に通底するのは、他者の存在ですね。', 'Ryousha ni tsuutei suru no wa, tasha no sonzai desu ne.', 'Yang mendasari keduanya adalah keberadaan orang lain, ya.'],
    ['ええ、他者がいて初めて、自由も責任も意味を持つのです。', 'Ee, tasha ga ite hajimete, jiyuu mo sekinin mo imi o motsu no desu.', 'Ya, baru dengan adanya orang lain, kebebasan dan tanggung jawab bermakna.'],
  ]],
  ['Tanggapan sastra', ['Tanggapan sastra: kesan → analisis teknik → tafsiran → relevansi.', 'Ungkapan: 〜が象徴しているのは, 〜と読み解くこともできる.'], [
    ['この小説の最後の雪の場面が印象的でした。', 'Kono shousetsu no saigo no yuki no bamen ga inshouteki deshita.', 'Adegan salju di akhir novel ini sangat berkesan.'],
    ['雪が象徴しているのは、何だと思いますか。', 'Yuki ga shouchou shite iru no wa, nan da to omoimasu ka.', 'Menurut Anda, apa yang dilambangkan oleh salju itu?'],
    ['過去を覆い隠す忘却、と読み解くこともできると思います。', 'Kako o ooikakusu boukyaku, to yomitoku koto mo dekiru to omoimasu.', 'Menurut saya bisa juga ditafsirkan sebagai lupa yang menyelimuti masa lalu.'],
    ['同時に、新たな始まりを予感させますね。', 'Douji ni, arata na hajimari o yokan sasemasu ne.', 'Sekaligus memberi firasat akan awal yang baru, ya.'],
  ]],
  ['Negosiasi profesional', ['Negosiasi tingkat tinggi: bingkai kepentingan bersama, ajukan syarat dengan halus.', 'Ungkapan: 双方にとって, 〜という形であれば, 前向きに検討いたします.'], [
    ['双方にとって納得のいく形を模索したいと考えております。', 'Souhou ni totte nattoku no iku katachi o mosaku shitai to kangaete orimasu.', 'Kami ingin mencari bentuk yang memuaskan bagi kedua pihak.'],
    ['独占契約という形であれば、価格面で譲歩いたします。', 'Dokusen keiyaku to iu katachi de areba, kakakumen de jouho itashimasu.', 'Jika berupa kontrak eksklusif, kami akan memberi konsesi dari segi harga.'],
    ['独占は難しいですが、期間限定であれば前向きに検討いたします。', 'Dokusen wa muzukashii desu ga, kikan gentei de areba maemuki ni kentou itashimasu.', 'Eksklusif sulit, tetapi jika dengan batas waktu kami akan mempertimbangkannya secara positif.'],
    ['では、二年間という条件で詰めさせていただけますか。', 'De wa, ninenkan to iu jouken de tsumesasete itadakemasu ka.', 'Kalau begitu, bolehkah kami matangkan dengan syarat dua tahun?'],
  ]],
  ['Tanya jawab konferensi', ['Pertanyaan konferensi: perkenalan → apresiasi → pertanyaan spesifik.', 'Penjawab: konfirmasi maksud pertanyaan sebelum menjawab.'], [
    ['大変興味深いご発表、ありがとうございました。', 'Taihen kyoumibukai gohappyou, arigatou gozaimashita.', 'Terima kasih atas presentasi yang sangat menarik.'],
    ['調査対象を都市部に限定された理由をお聞かせいただけますか。', 'Chousa taishou o toshibu ni gentei sareta riyuu o okikase itadakemasu ka.', 'Bisakah Anda menjelaskan alasan membatasi subjek survei pada perkotaan?'],
    ['ご質問の意図は、地方との比較が必要ではないか、ということでしょうか。', 'Goshitsumon no ito wa, chihou to no hikaku ga hitsuyou de wa nai ka, to iu koto deshou ka.', 'Maksud pertanyaan Anda, apakah perbandingan dengan daerah diperlukan, begitu?'],
    ['おっしゃる通りで、それは今後の課題と考えております。', 'Ossharu toori de, sore wa kongo no kadai to kangaete orimasu.', 'Tepat sekali, kami menganggap itu tantangan ke depan.'],
  ]],
  ['Risiko dan etika', ['Diskusi etika: identifikasi dilema, nilai yang bertentangan, dan batas.', 'Ungkapan: 倫理的な観点から, 〜と〜の間で板挟みになる.'], [
    ['遺伝子編集技術は、どこまで許されるべきでしょうか。', 'Idenshi henshuu gijutsu wa, doko made yurusareru beki deshou ka.', 'Sampai mana teknologi penyuntingan gen seharusnya diizinkan?'],
    ['倫理的な観点から言えば、治療目的に限るべきだと思います。', 'Rinriteki na kanten kara ieba, chiryou mokuteki ni kagiru beki da to omoimasu.', 'Dari sudut pandang etika, menurut saya harus dibatasi untuk tujuan pengobatan.'],
    ['しかし、治療と能力向上の境界は曖昧ではありませんか。', 'Shikashi, chiryou to nouryoku koujou no kyoukai wa aimai de wa arimasen ka.', 'Tapi, bukankah batas antara pengobatan dan peningkatan kemampuan itu kabur?'],
    ['だからこそ、社会的な合意形成が不可欠なのです。', 'Dakara koso, shakaiteki na goui keisei ga fukaketsu na no desu.', 'Justru karena itu, pembentukan konsensus sosial mutlak diperlukan.'],
  ]],
  ['Analisis media', ['Analisis media: pembingkaian, pemilihan kata, dan apa yang tidak diberitakan.', 'Ungkapan: 報道の仕方に偏りがある, 〜という印象を与える.'], [
    ['この事件の報道の仕方には、偏りがあるように感じます。', 'Kono jiken no houdou no shikata ni wa, katayori ga aru you ni kanjimasu.', 'Saya merasa ada bias dalam cara pemberitaan kasus ini.'],
    ['見出しの言葉選びが、読者に強い印象を与えていますね。', 'Midashi no kotoba erabi ga, dokusha ni tsuyoi inshou o ataete imasu ne.', 'Pilihan kata di judul memberi kesan kuat pada pembaca, ya.'],
    ['しかも、反対側の意見がほとんど取り上げられていません。', 'Shikamo, hantaigawa no iken ga hotondo toriagerarete imasen.', 'Terlebih lagi, pendapat pihak lawan hampir tidak diangkat.'],
    ['複数の媒体を比べて読むことが、ますます重要になっています。', 'Fukusuu no baitai o kurabete yomu koto ga, masumasu juuyou ni natte imasu.', 'Membaca dengan membandingkan beberapa media semakin penting.'],
  ]],
  ['Mempertahankan penelitian', ['Sidang penelitian: jawab kritik dengan data, akui batas, tunjukkan kontribusi.', 'Ungkapan: ご指摘の点は承知しておりますが, 本研究の貢献は.'], [
    ['サンプル数が少ないのではないかというご指摘がありました。', 'Sanpurusuu ga sukunai no de wa nai ka to iu goshiteki ga arimashita.', 'Ada masukan bahwa jumlah sampelnya mungkin terlalu sedikit.'],
    ['ご指摘の点は承知しておりますが、質的調査として十分な数だと考えております。', 'Goshiteki no ten wa shouchi shite orimasu ga, shitsuteki chousa to shite juubun na kazu da to kangaete orimasu.', 'Kami memahami masukan itu, tetapi jumlahnya cukup untuk penelitian kualitatif.'],
    ['では、本研究の独自性はどこにあるのでしょうか。', 'De wa, honkenkyuu no dokujisei wa doko ni aru no deshou ka.', 'Lalu, di mana orisinalitas penelitian ini?'],
    ['当事者の語りを長期にわたって記録した点にあると考えます。', 'Toujisha no katari o chouki ni watatte kiroku shita ten ni aru to kangaemasu.', 'Menurut saya terletak pada perekaman narasi para pelaku dalam jangka panjang.'],
  ]],
  ['Percakapan lintas budaya', ['Lintas budaya: hindari generalisasi, bandingkan dengan rasa ingin tahu.', 'Ungkapan: 私の国では〜ですが、日本ではいかがですか.'], [
    ['日本では、断るときにはっきり言わないことが多いですよね。', 'Nihon de wa, kotowaru toki ni hakkiri iwanai koto ga ooi desu yo ne.', 'Di Jepang, saat menolak sering tidak diucapkan dengan jelas, ya.'],
    ['ええ、相手の面子を傷つけないための配慮なんです。', 'Ee, aite no mentsu o kizutsukenai tame no hairyo nan desu.', 'Ya, itu bentuk kepedulian agar tidak melukai muka lawan bicara.'],
    ['インドネシアにも似た感覚がありますが、表現の仕方が違います。', 'Indoneshia ni mo nita kankaku ga arimasu ga, hyougen no shikata ga chigaimasu.', 'Di Indonesia juga ada rasa serupa, tetapi cara mengungkapkannya berbeda.'],
    ['違いを知ることで、誤解も減りそうですね。', 'Chigai o shiru koto de, gokai mo herisou desu ne.', 'Dengan mengetahui perbedaannya, kesalahpahaman tampaknya bisa berkurang.'],
  ]],
  ['Keigo tingkat tinggi', ['Keigo tinggi untuk tamu penting: 恐悦至極, ご高覧, ご臨席, 賜る.', 'Gunakan secara wajar; berlebihan justru terasa kaku.'], [
    ['本日はご多忙の中、ご臨席を賜り、誠にありがとうございます。', 'Honjitsu wa gotabou no naka, gorinseki o tamawari, makoto ni arigatou gozaimasu.', 'Terima kasih sebesar-besarnya atas kehadiran Anda di tengah kesibukan hari ini.'],
    ['資料をご高覧いただければ幸いに存じます。', 'Shiryou o gokouran itadakereba saiwai ni zonjimasu.', 'Kami akan sangat senang jika Anda berkenan membaca materinya.'],
    ['ご指導ご鞭撻のほど、よろしくお願い申し上げます。', 'Goshidou gobentatsu no hodo, yoroshiku onegai moushiagemasu.', 'Mohon bimbingan dan dorongannya.'],
    ['恐れ入りますが、お名刺を頂戴できますでしょうか。', 'Osoreirimasu ga, omeishi o choudai dekimasu deshou ka.', 'Mohon maaf, bolehkah saya menerima kartu nama Anda?'],
  ]],
  ['Pembingkaian retoris', ['Pembingkaian: mulai dengan pertanyaan atau paradoks untuk menarik perhatian.', 'Ungkapan: 皆さんは〜と思われるかもしれません。しかし.'], [
    ['皆さんは、技術が進めば人は幸せになると思われるかもしれません。', 'Minasan wa, gijutsu ga susumeba hito wa shiawase ni naru to omowareru kamo shiremasen.', 'Anda semua mungkin mengira bahwa jika teknologi maju, manusia akan bahagia.'],
    ['しかし、データはむしろ逆の傾向を示しています。', 'Shikashi, deeta wa mushiro gyaku no keikou o shimeshite imasu.', 'Namun, data justru menunjukkan kecenderungan sebaliknya.'],
    ['では、私たちは何を見落としているのでしょうか。', 'De wa, watashitachi wa nani o miotoshite iru no deshou ka.', 'Lalu, apa yang sebenarnya kita lewatkan?'],
    ['答えは、人と人とのつながりにあるのかもしれません。', 'Kotae wa, hito to hito to no tsunagari ni aru no kamo shiremasen.', 'Jawabannya mungkin ada pada hubungan antarmanusia.'],
  ]],
  ['Pidato spontan', ['Pidato spontan: kerangka cepat — poin, alasan, contoh, penutup.', 'Beri waktu berpikir dengan そうですね, 一言で申しますと.'], [
    ['では、急ですが一言お願いします。', 'De wa, kyuu desu ga hitokoto onegai shimasu.', 'Kalau begitu, mendadak memang, tapi mohon sepatah kata.'],
    ['そうですね、一言で申しますと、感謝の気持ちでいっぱいです。', 'Sou desu ne, hitokoto de moushimasu to, kansha no kimochi de ippai desu.', 'Hmm, singkatnya, saya dipenuhi rasa terima kasih.'],
    ['三年前、右も左も分からなかった私を、皆さんが支えてくださいました。', 'Sannen mae, migi mo hidari mo wakaranakatta watashi o, minasan ga sasaete kudasaimashita.', 'Tiga tahun lalu, Anda semua mendukung saya yang sama sekali belum paham apa-apa.'],
    ['この経験を糧に、新しい職場でも精進してまいります。', 'Kono keiken o kate ni, atarashii shokuba demo shoujin shite mairimasu.', 'Dengan pengalaman ini sebagai bekal, saya akan terus berusaha di tempat kerja yang baru.'],
  ]],
  ['Perbaikan seperti penutur asli', ['Perbaikan alami: いや、そうじゃなくて, 言い方を変えると, というより.', 'Perbaiki tanpa kehilangan alur pembicaraan.'], [
    ['この案は失敗だった、というより、時期が早すぎたんだと思います。', 'Kono an wa shippai datta, to iu yori, jiki ga hayasugitan da to omoimasu.', 'Usulan ini bukan gagal, lebih tepatnya, waktunya terlalu cepat.'],
    ['言い方を変えると、市場がまだ準備できていなかったんです。', 'Iikata o kaeru to, shijou ga mada junbi dekite inakattan desu.', 'Dengan kata lain, pasarnya belum siap.'],
    ['いや、誤解のないように言うと、内容自体は評価しています。', 'Iya, gokai no nai you ni iu to, naiyou jitai wa hyouka shite imasu.', 'Bukan, supaya tidak salah paham, isinya sendiri saya hargai.'],
    ['つまり、タイミングさえ合えば、成功の可能性は十分あるということです。', 'Tsumari, taimingu sae aeba, seikou no kanousei wa juubun aru to iu koto desu.', 'Intinya, asal waktunya tepat, peluang suksesnya cukup besar.'],
  ]],
  ['Ketidaksetujuan halus', ['Tidak setuju secara halus: pertanyaan balik, kekhawatiran, atau usulan alternatif.', 'Ungkapan: 〜という見方もできるのではないでしょうか.'], [
    ['この方針で進めたいと思うのですが。', 'Kono houshin de susumetai to omou no desu ga.', 'Saya ingin melanjutkan dengan kebijakan ini.'],
    ['大筋では賛成ですが、少し気になる点がございます。', 'Oosuji de wa sansei desu ga, sukoshi ki ni naru ten ga gozaimasu.', 'Secara garis besar saya setuju, tetapi ada sedikit hal yang mengganjal.'],
    ['顧客の側から見ると、かえって不便になるという見方もできるのではないでしょうか。', 'Kokyaku no gawa kara miru to, kaette fuben ni naru to iu mikata mo dekiru no de wa nai deshou ka.', 'Bukankah dari sisi pelanggan bisa juga dipandang justru menjadi tidak praktis?'],
    ['なるほど。その点はもう少し詰める必要がありますね。', 'Naruhodo. Sono ten wa mou sukoshi tsumeru hitsuyou ga arimasu ne.', 'Begitu. Hal itu perlu dimatangkan lagi, ya.'],
  ]],
  ['Presentasi sintesis', ['Sintesis presentasi: hubungkan temuan, tarik implikasi, usulkan langkah.', 'Ungkapan: 以上の知見を総合すると, ここから導き出されるのは.'], [
    ['以上の知見を総合すると、三つの傾向が浮かび上がります。', 'Ijou no chiken o sougou suru to, mittsu no keikou ga ukabiagarimasu.', 'Jika temuan di atas digabungkan, muncul tiga kecenderungan.'],
    ['ここから導き出されるのは、地域ごとの対策の必要性です。', 'Koko kara michibikidasareru no wa, chiiki goto no taisaku no hitsuyousei desu.', 'Yang bisa disimpulkan dari sini adalah perlunya langkah per wilayah.'],
    ['画一的な政策では、効果が期待できません。', 'Kakuitsuteki na seisaku de wa, kouka ga kitai dekimasen.', 'Dengan kebijakan yang seragam, efeknya tidak bisa diharapkan.'],
    ['最後に、今後の研究の方向性を提示して締めくくりたいと思います。', 'Saigo ni, kongo no kenkyuu no houkousei o teiji shite shimekukuritai to omoimasu.', 'Terakhir, saya ingin menutup dengan memaparkan arah penelitian ke depan.'],
  ]],
  ['Wawancara dengan ahli', ['Pewawancara: pertanyaan terbuka, tindak lanjut, dan ringkasan.', 'Ungkapan: 〜についてもう少し掘り下げてお伺いしたいのですが.'], [
    ['先生のご研究について、もう少し掘り下げてお伺いしたいのですが。', 'Sensei no gokenkyuu ni tsuite, mou sukoshi horisagete oukagai shitai no desu ga.', 'Saya ingin bertanya lebih dalam tentang penelitian Bapak/Ibu.'],
    ['なぜ、方言の消滅に関心を持たれたのですか。', 'Naze, hougen no shoumetsu ni kanshin o motareta no desu ka.', 'Mengapa Anda tertarik pada punahnya dialek?'],
    ['言葉が消えると、その土地の記憶も消えてしまうからです。', 'Kotoba ga kieru to, sono tochi no kioku mo kiete shimau kara desu.', 'Karena jika bahasanya hilang, ingatan tentang tanah itu juga ikut hilang.'],
    ['つまり、言語の保存は文化の保存でもあるということですね。', 'Tsumari, gengo no hozon wa bunka no hozon demo aru to iu koto desu ne.', 'Jadi, pelestarian bahasa juga berarti pelestarian budaya, ya.'],
  ]],
  ['Ulasan speaking N1', ['Gabungkan: sikap ahli, sanggahan halus, sintesis, dan keigo tinggi.', 'Latih diskusi sepuluh menit dengan topik abstrak.'], [
    ['グローバル化は、文化の多様性を損なうのでしょうか。', 'Guroobaruka wa, bunka no tayousei o sokonau no deshou ka.', 'Apakah globalisasi merusak keberagaman budaya?'],
    ['一概には言えませんが、均質化の圧力は確かに存在します。', 'Ichigai ni wa iemasen ga, kinshitsuka no atsuryoku wa tashika ni sonzai shimasu.', 'Tidak bisa disamaratakan, tetapi tekanan homogenisasi memang ada.'],
    ['一方で、地域文化が再評価される動きも見られますね。', 'Ippou de, chiiki bunka ga saihyouka sareru ugoki mo miraremasu ne.', 'Di sisi lain, terlihat juga gerakan penilaian ulang budaya lokal, ya.'],
    ['結局のところ、グローバルとローカルは補い合う関係にあるのでしょう。', 'Kekkyoku no tokoro, guroobaru to rookaru wa oginaiau kankei ni aru no deshou.', 'Pada akhirnya, global dan lokal mungkin berada dalam hubungan saling melengkapi.'],
  ]],
];
