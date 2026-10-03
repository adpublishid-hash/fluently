import type { LessonCoreTuple } from '../types';

// Grammar N1 — one entry per lesson (index = lesson - 1).
export const grammar: LessonCoreTuple[] = [
  ['Begitu…, langsung: や否や', ['Kata kerja kamus + や否や = begitu A terjadi, B langsung terjadi.', 'Gaya tulisan; B adalah kejadian nyata, bukan kehendak pembicara.'], [
    ['ベルが鳴るや否や、生徒たちは教室を飛び出した。', 'Beru ga naru ya ina ya, seitotachi wa kyoushitsu o tobidashita.', 'Begitu bel berbunyi, para siswa langsung berhamburan keluar kelas.'],
    ['新商品は発売されるや否や、売り切れとなった。', 'Shinshouhin wa hatsubai sareru ya ina ya, urikire to natta.', 'Begitu dirilis, produk baru itu langsung habis terjual.'],
    ['彼は席に着くや否や、資料を広げ始めた。', 'Kare wa seki ni tsuku ya ina ya, shiryou o hirogehajimeta.', 'Begitu duduk, dia langsung mulai membuka materinya.'],
    ['その知らせを聞くや否や、母は泣き出した。', 'Sono shirase o kiku ya ina ya, haha wa nakidashita.', 'Begitu mendengar kabar itu, ibu langsung menangis.'],
  ]],
  ['Berulang sia-sia: そばから', ['〜そばから = baru saja A, langsung B (berulang, sering mengecewakan).', 'Sering dipakai untuk kebiasaan yang membuat frustrasi.'], [
    ['片付けるそばから、子どもが部屋を散らかす。', 'Katazukeru soba kara, kodomo ga heya o chirakasu.', 'Baru saja dirapikan, anak-anak langsung mengacak-acak kamar lagi.'],
    ['覚えたそばから、新しい単語を忘れてしまう。', 'Oboeta soba kara, atarashii tango o wasurete shimau.', 'Baru saja dihafal, kosakata baru langsung terlupa.'],
    ['注意したそばから、また同じミスをした。', 'Chuui shita soba kara, mata onaji misu o shita.', 'Baru saja ditegur, dia sudah mengulang kesalahan yang sama.'],
    ['稼ぐそばから使ってしまうので、お金がたまらない。', 'Kasegu soba kara tsukatte shimau node, okane ga tamaranai.', 'Baru saja dapat uang, langsung dipakai, jadi tidak pernah terkumpul.'],
  ]],
  ['Tanpa sengaja: ともなく', ['Kata kerja + ともなく = tanpa sengaja/tanpa tujuan tertentu (見るともなく見る).', 'Kata tanya + ともなく = entah (どこからともなく = entah dari mana).'], [
    ['窓の外を見るともなく見ていた。', 'Mado no soto o miru tomo naku mite ita.', 'Saya memandangi luar jendela tanpa maksud apa-apa.'],
    ['どこからともなく、花の香りが漂ってきた。', 'Doko kara tomo naku, hana no kaori ga tadayotte kita.', 'Entah dari mana, aroma bunga tercium.'],
    ['ラジオを聞くともなく聞いていたら、懐かしい曲が流れた。', 'Rajio o kiku tomo naku kiite itara, natsukashii kyoku ga nagareta.', 'Saat mendengarkan radio sambil lalu, lagu lama yang dirindukan diputar.'],
    ['誰からともなく、拍手が起こった。', 'Dare kara tomo naku, hakushu ga okotta.', 'Entah siapa yang memulai, tepuk tangan pun pecah.'],
  ]],
  ['Sampai pada titik: に至って', ['〜に至って = baru setelah sampai pada keadaan (ekstrem) itu.', '〜に至っては = bahkan (contoh paling ekstrem); 〜に至るまで = sampai ke.'], [
    ['事故が起きるに至って、ようやく安全対策が見直された。', 'Jiko ga okiru ni itatte, youyaku anzen taisaku ga minaosareta.', 'Baru setelah kecelakaan terjadi, langkah keselamatan akhirnya ditinjau ulang.'],
    ['倒産に至って初めて、社長は経営の失敗を認めた。', 'Tousan ni itatte hajimete, shachou wa keiei no shippai o mitometa.', 'Baru setelah bangkrut, direktur mengakui kegagalan manajemennya.'],
    ['家族は皆忙しく、父に至っては週末も家にいない。', 'Kazoku wa mina isogashiku, chichi ni itatte wa shuumatsu mo ie ni inai.', 'Keluarga saya semuanya sibuk, bahkan ayah akhir pekan pun tidak di rumah.'],
    ['服装から言葉遣いに至るまで、細かく指導された。', 'Fukusou kara kotobazukai ni itaru made, komakaku shidou sareta.', 'Mulai dari pakaian sampai cara bicara, semuanya dibimbing secara rinci.'],
  ]],
  ['Terpaksa oleh keadaan: を余儀なくされる', ['〜を余儀なくされる = terpaksa (oleh keadaan di luar kendali).', '〜を余儀なくさせる = memaksa (keadaan memaksa seseorang).'], [
    ['大雨のため、試合は中止を余儀なくされた。', 'Ooame no tame, shiai wa chuushi o yogi naku sareta.', 'Karena hujan lebat, pertandingan terpaksa dibatalkan.'],
    ['病気のため、彼は引退を余儀なくされた。', 'Byouki no tame, kare wa intai o yogi naku sareta.', 'Karena sakit, dia terpaksa pensiun.'],
    ['工場の閉鎖により、多くの住民が転居を余儀なくされた。', 'Koujou no heisa ni yori, ooku no juumin ga tenkyo o yogi naku sareta.', 'Akibat penutupan pabrik, banyak warga terpaksa pindah.'],
    ['不況が、企業に人員削減を余儀なくさせた。', 'Fukyou ga, kigyou ni jin-in sakugen o yogi naku saseta.', 'Resesi memaksa perusahaan memangkas jumlah karyawan.'],
  ]],
  ['Tak tertahankan: に堪えない', ['〜に堪えない (1) = tidak tahan untuk (melihat/mendengar) karena buruk.', '〜に堪えない (2) = sangat (perasaan): 感謝に堪えない.'], [
    ['その番組は、見るに堪えない内容だった。', 'Sono bangumi wa, miru ni taenai naiyou datta.', 'Acara itu isinya tidak tertahankan untuk ditonton.'],
    ['ネット上の中傷は、聞くに堪えないものばかりだ。', 'Nettojou no chuushou wa, kiku ni taenai mono bakari da.', 'Fitnah di internet semuanya tak tertahankan untuk didengar.'],
    ['皆様のご支援には、感謝の念に堪えません。', 'Minasama no goshien ni wa, kansha no nen ni taemasen.', 'Saya tak terhingga berterima kasih atas dukungan Anda semua.'],
    ['恩師の訃報に接し、悲しみに堪えない。', 'Onshi no fuhou ni sesshi, kanashimi ni taenai.', 'Menerima kabar wafatnya guru tercinta, duka saya tak tertahankan.'],
  ]],
  ['Tidak perlu: までもない', ['Kata kerja + までもない = tidak perlu sampai (karena sudah jelas).', '言うまでもなく = tak perlu dikatakan lagi.'], [
    ['言うまでもなく、健康は何よりも大切だ。', 'Iu made mo naku, kenkou wa nani yori mo taisetsu da.', 'Tak perlu dikatakan lagi, kesehatan lebih penting dari apa pun.'],
    ['この程度の距離なら、タクシーを呼ぶまでもない。', 'Kono teido no kyori nara, takushii o yobu made mo nai.', 'Kalau jaraknya segini, tidak perlu sampai memanggil taksi.'],
    ['結果は確認するまでもなく明らかだ。', 'Kekka wa kakunin suru made mo naku akiraka da.', 'Hasilnya jelas tanpa perlu diperiksa.'],
    ['わざわざ会って話すまでもないことです。', 'Wazawaza atte hanasu made mo nai koto desu.', 'Itu bukan hal yang perlu sampai bertemu untuk dibicarakan.'],
  ]],
  ['Sesuai dengan: に即して', ['〜に即して = sesuai/berdasarkan (fakta, aturan, kenyataan) secara konkret.', 'Sebelum benda: 〜に即した.'], [
    ['事実に即して報告してください。', 'Jijitsu ni sokushite houkoku shite kudasai.', 'Laporkanlah sesuai fakta.'],
    ['法律に即した対応が求められる。', 'Houritsu ni sokushita taiou ga motomerareru.', 'Dibutuhkan penanganan yang sesuai hukum.'],
    ['現場の実態に即して、計画を修正した。', 'Genba no jittai ni sokushite, keikaku o shuusei shita.', 'Rencana direvisi sesuai kondisi nyata di lapangan.'],
    ['時代に即した教育のあり方を考える必要がある。', 'Jidai ni sokushita kyouiku no arikata o kangaeru hitsuyou ga aru.', 'Perlu memikirkan bentuk pendidikan yang sesuai zaman.'],
  ]],
  ['Dengan / per: をもって', ['〜をもって (1) = dengan (sarana/dasar), formal.', '〜をもって (2) = per/terhitung (batas waktu): 本日をもって終了.'], [
    ['本日をもちまして、営業を終了いたします。', 'Honjitsu o mochimashite, eigyou o shuuryou itashimasu.', 'Terhitung hari ini, kami menghentikan operasional.'],
    ['試験の結果は、書面をもってお知らせします。', 'Shiken no kekka wa, shomen o motte oshirase shimasu.', 'Hasil ujian akan diberitahukan secara tertulis.'],
    ['彼は身をもって、命の大切さを教えてくれた。', 'Kare wa mi o motte, inochi no taisetsusa o oshiete kureta.', 'Dia mengajarkan pentingnya nyawa melalui dirinya sendiri.'],
    ['以上をもって、本日の会議を閉会します。', 'Ijou o motte, honjitsu no kaigi o heikai shimasu.', 'Dengan ini, rapat hari ini ditutup.'],
  ]],
  ['Berpadu dengan: と相まって', ['AとBが相まって = A dan B berpadu, menghasilkan efek yang lebih kuat.', 'Bentuk lain: Aと相まって, B….'], [
    ['美しい景色と相まって、料理は一層おいしく感じられた。', 'Utsukushii keshiki to aimatte, ryouri wa issou oishiku kanjirareta.', 'Berpadu dengan pemandangan indah, masakannya terasa makin lezat.'],
    ['才能と努力が相まって、彼は世界的な成功を収めた。', 'Sainou to doryoku ga aimatte, kare wa sekaiteki na seikou o osameta.', 'Bakat dan usaha berpadu, sehingga dia meraih sukses dunia.'],
    ['円安と好天が相まって、観光客が急増した。', 'En-yasu to kouten ga aimatte, kankoukyaku ga kyuuzou shita.', 'Yen yang melemah berpadu dengan cuaca baik, sehingga turis melonjak.'],
    ['音楽と照明が相まって、幻想的な雰囲気を生み出した。', 'Ongaku to shoumei ga aimatte, gensouteki na fun-iki o umidashita.', 'Musik dan pencahayaan berpadu, menciptakan suasana magis.'],
  ]],
  ['Tergantung: いかんによって', ['Benda + のいかんによって = tergantung pada (hasil/keadaan), sangat formal.', '〜いかんにかかわらず = terlepas dari.'], [
    ['検査の結果いかんによって、手術するかどうかを決める。', 'Kensa no kekka ikan ni yotte, shujutsu suru ka dou ka o kimeru.', 'Tergantung hasil pemeriksaan, diputuskan apakah dioperasi atau tidak.'],
    ['今後の交渉いかんでは、契約が白紙になる可能性もある。', 'Kongo no koushou ikan de wa, keiyaku ga hakushi ni naru kanousei mo aru.', 'Tergantung negosiasi ke depan, kontrak bisa saja batal.'],
    ['理由のいかんにかかわらず、遅刻は認められない。', 'Riyuu no ikan ni kakawarazu, chikoku wa mitomerarenai.', 'Apa pun alasannya, keterlambatan tidak diterima.'],
    ['成績いかんによっては、奨学金が停止される。', 'Seiseki ikan ni yotte wa, shougakukin ga teishi sareru.', 'Tergantung nilai, beasiswa bisa dihentikan.'],
  ]],
  ['Demi tujuan: べく', ['Kata kerja kamus + べく = demi/agar (tujuan kuat), gaya tulisan; する → すべく.', '〜べくもない = tidak mungkin sama sekali.'], [
    ['新記録を樹立すべく、彼は毎日練習を重ねた。', 'Shinkiroku o juritsu subeku, kare wa mainichi renshuu o kasaneta.', 'Demi mencetak rekor baru, dia berlatih setiap hari.'],
    ['被災地を支援すべく、多くのボランティアが集まった。', 'Hisaichi o shien subeku, ooku no borantia ga atsumatta.', 'Demi membantu daerah bencana, banyak relawan berkumpul.'],
    ['問題を解決すべく、専門家チームが結成された。', 'Mondai o kaiketsu subeku, senmonka chiimu ga kessei sareta.', 'Demi menyelesaikan masalah, tim ahli dibentuk.'],
    ['素人の私には、プロの技術など望むべくもない。', 'Shirouto no watashi ni wa, puro no gijutsu nado nozomu beku mo nai.', 'Bagi saya yang amatir, teknik profesional tak mungkin diharapkan.'],
  ]],
  ['Tidak pantas: まじき', ['Kata kerja + まじき + benda = yang tidak pantas (dilakukan oleh peran tertentu).', 'Pola: 〜にあるまじき (tidak pantas bagi seorang…).'], [
    ['教師にあるまじき行為だ。', 'Kyoushi ni aru majiki koui da.', 'Itu perbuatan yang tidak pantas bagi seorang guru.'],
    ['人として許すまじき犯罪である。', 'Hito to shite yurusu majiki hanzai de aru.', 'Itu kejahatan yang tak termaafkan sebagai manusia.'],
    ['政治家にあるまじき発言が問題となった。', 'Seijika ni aru majiki hatsugen ga mondai to natta.', 'Ucapan yang tak pantas bagi politikus menjadi masalah.'],
    ['医師として言うまじきことを口にしてしまった。', 'Ishi to shite iu majiki koto o kuchi ni shite shimatta.', 'Saya terlanjur mengucapkan hal yang tak pantas diucapkan seorang dokter.'],
  ]],
  ['Pasti akan: ずにはおかない', ['Bentuk ない tanpa ない + ずにはおかない = pasti akan (membuat/menyebabkan).', 'Subjek sering hal yang menggerakkan perasaan; する → せずにはおかない.'], [
    ['彼の演説は、聴衆を感動させずにはおかない。', 'Kare no enzetsu wa, choushuu o kandou sasezu ni wa okanai.', 'Pidatonya pasti akan menggugah hati pendengar.'],
    ['この映画は、見る人に深い問いを投げかけずにはおかない。', 'Kono eiga wa, miru hito ni fukai toi o nagekakezu ni wa okanai.', 'Film ini pasti akan melontarkan pertanyaan mendalam pada penontonnya.'],
    ['今回の不正は、社会の厳しい批判を招かずにはおかないだろう。', 'Konkai no fusei wa, shakai no kibishii hihan o manekazu ni wa okanai darou.', 'Kecurangan kali ini pasti akan mengundang kritik keras dari masyarakat.'],
    ['真相を明らかにせずにはおかないと、記者は誓った。', 'Shinsou o akiraka ni sezu ni wa okanai to, kisha wa chikatta.', 'Wartawan itu bersumpah pasti akan mengungkap kebenarannya.'],
  ]],
  ['Khas dari: ならでは', ['Benda + ならでは(の) = khas dari, hanya bisa dari.', 'Bernuansa pujian.'], [
    ['金沢ならではの和菓子をお土産に買った。', 'Kanazawa nara de wa no wagashi o omiyage ni katta.', 'Saya membeli kue Jepang khas Kanazawa sebagai oleh-oleh.'],
    ['職人ならではの技が光る作品だ。', 'Shokunin nara de wa no waza ga hikaru sakuhin da.', 'Karya yang memancarkan keterampilan khas seorang pengrajin.'],
    ['子どもならではの自由な発想に驚かされた。', 'Kodomo nara de wa no jiyuu na hassou ni odorokasareta.', 'Saya dikejutkan oleh gagasan bebas yang khas anak-anak.'],
    ['旬の食材ならではの味わいを楽しんでください。', 'Shun no shokuzai nara de wa no ajiwai o tanoshinde kudasai.', 'Nikmatilah cita rasa khas bahan makanan musiman.'],
  ]],
  ['Dimulai dari: を皮切りに', ['〜を皮切りに = dimulai dengan A, lalu berturut-turut B, C.', 'Dipakai untuk rangkaian acara, tur, atau perkembangan.'], [
    ['東京公演を皮切りに、全国ツアーが始まった。', 'Toukyou kouen o kawakiri ni, zenkoku tsuaa ga hajimatta.', 'Dimulai dengan konser Tokyo, tur nasional pun dimulai.'],
    ['一号店の成功を皮切りに、次々と店舗を増やした。', 'Ichigouten no seikou o kawakiri ni, tsugitsugi to tenpo o fuyashita.', 'Dimulai dari sukses toko pertama, toko-toko terus ditambah.'],
    ['彼の発言を皮切りに、反対意見が相次いだ。', 'Kare no hatsugen o kawakiri ni, hantai iken ga aitsuida.', 'Diawali ucapannya, pendapat yang menentang bermunculan berturut-turut.'],
    ['この研究を皮切りに、新たな分野が開拓された。', 'Kono kenkyuu o kawakiri ni, arata na bun-ya ga kaitaku sareta.', 'Diawali penelitian ini, bidang baru pun terbuka.'],
  ]],
  ['Kira-kira sebatas: といったところだ', ['〜といったところだ = kira-kira hanya sebatas (jumlah/tingkat yang tidak besar).', 'Nuansa merendahkan atau menyatakan batas.'], [
    ['参加者は、多くても五十人といったところだ。', 'Sankasha wa, ookute mo gojuunin to itta tokoro da.', 'Pesertanya paling banyak sekitar lima puluh orang.'],
    ['私の料理の腕は、まあ人並みといったところです。', 'Watashi no ryouri no ude wa, maa hitonami to itta tokoro desu.', 'Kemampuan masak saya, yah, sebatas rata-rata.'],
    ['完成度は、八割といったところだろう。', 'Kanseido wa, hachiwari to itta tokoro darou.', 'Tingkat kesempurnaannya mungkin sekitar delapan puluh persen.'],
    ['休みといっても、せいぜい二、三日といったところだ。', 'Yasumi to itte mo, seizei ni, sannichi to itta tokoro da.', 'Walaupun dibilang libur, paling-paling hanya dua tiga hari.'],
  ]],
  ['Sangat sekali: 極まりない', ['Kata sifat な + 極まりない / 極まる = sangat sekali (biasanya negatif).', 'Gaya formal untuk penilaian tegas.'], [
    ['彼の態度は、失礼極まりない。', 'Kare no taido wa, shitsurei kiwamarinai.', 'Sikapnya sungguh sangat tidak sopan.'],
    ['夜道での運転は、危険極まりない。', 'Yomichi de no unten wa, kiken kiwamarinai.', 'Menyetir di jalan malam sangat berbahaya.'],
    ['不愉快極まりない出来事だった。', 'Fuyukai kiwamarinai dekigoto datta.', 'Itu kejadian yang sangat tidak menyenangkan.'],
    ['この計画は、無謀極まりないと言わざるを得ない。', 'Kono keikaku wa, mubou kiwamarinai to iwazaru o enai.', 'Rencana ini terpaksa harus dikatakan sangat nekat.'],
  ]],
  ['Retorika formal', ['Retorika N1: 〜と言わざるを得ない, 〜と言っても過言ではない, 〜にほかならない.', 'Dipakai untuk menegaskan kesimpulan dengan tenang namun kuat.'], [
    ['これは歴史的な転換点と言っても過言ではない。', 'Kore wa rekishiteki na tenkanten to itte mo kagon de wa nai.', 'Tidak berlebihan jika ini disebut titik balik sejarah.'],
    ['対応が遅すぎたと言わざるを得ない。', 'Taiou ga ososugita to iwazaru o enai.', 'Terpaksa harus dikatakan bahwa penanganannya terlalu lambat.'],
    ['問題の根は、想像以上に深いと言えよう。', 'Mondai no ne wa, souzou ijou ni fukai to ieyou.', 'Bisa dikatakan akar masalahnya lebih dalam dari yang dibayangkan.'],
    ['今こそ、発想の転換が求められているのではなかろうか。', 'Ima koso, hassou no tenkan ga motomerarete iru no de wa nakarou ka.', 'Bukankah justru sekaranglah perubahan cara berpikir dibutuhkan?'],
  ]],
  ['Ulasan grammar N1', ['Gabungkan pola N1 dalam paragraf formal: や否や, を余儀なくされる, べく, と相まって.', 'Perhatikan register: kebanyakan pola N1 adalah gaya tulisan.'], [
    ['開業するや否や、店は予約で埋まった。', 'Kaigyou suru ya ina ya, mise wa yoyaku de umatta.', 'Begitu dibuka, toko langsung penuh reservasi.'],
    ['地元の食材と職人の技が相まって、評判を呼んだのだ。', 'Jimoto no shokuzai to shokunin no waza ga aimatte, hyouban o yonda no da.', 'Bahan lokal dan keterampilan pengrajin berpadu, sehingga mengundang reputasi.'],
    ['しかし、感染症の流行により、一時休業を余儀なくされた。', 'Shikashi, kansenshou no ryuukou ni yori, ichiji kyuugyou o yogi naku sareta.', 'Namun, akibat wabah penyakit menular, toko terpaksa tutup sementara.'],
    ['店主は再開すべく、持ち帰りの販売を始めた。', 'Tenshu wa saikai subeku, mochikaeri no hanbai o hajimeta.', 'Demi bisa buka kembali, pemilik toko mulai menjual makanan bawa pulang.'],
  ]],
];
