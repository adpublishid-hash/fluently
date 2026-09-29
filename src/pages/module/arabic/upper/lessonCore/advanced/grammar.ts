import type { LessonCoreTuple } from '../types';

// Nahwu-balaghah C1 — one entry per lesson (index = lesson - 1).
export const grammar: LessonCoreTuple[] = [
  [['I\'rab wacana: fungsi kata ditentukan dalam hubungan antarkalimat, bukan hanya dalam kalimatnya.', 'Kalimat yang tidak punya posisi i\'rab (لَا مَحَلَّ لَهَا) — misalnya kalimat pembuka dan shilah.'], [
    ['إِنَّ الْمَعْرِفَةَ الَّتِي لَا تُطَبَّقُ عِبْءٌ عَلَى صَاحِبِهَا.', "Innal ma'rifatal lati la tuthabbaqu 'ib'un 'ala shahibiha.", 'Sesungguhnya pengetahuan yang tidak diterapkan adalah beban bagi pemiliknya.'],
    ['وَالْجُمْلَةُ "لَا تُطَبَّقُ" صِلَةُ الْمَوْصُولِ لَا مَحَلَّ لَهَا.', "Wal jumlatu 'la tuthabbaqu' shilatul maushuli la mahalla laha.", 'Kalimat "tidak diterapkan" adalah shilah maushul yang tidak punya posisi i\'rab.'],
    ['أَمَّا "عِبْءٌ" فَخَبَرُ إِنَّ مَرْفُوعٌ.', "Amma 'ib'un fakhabaru inna marfu'un.", 'Adapun "beban" adalah khabar inna yang marfu\'.'],
    ['وَ"عَلَى صَاحِبِهَا" جَارٌّ وَمَجْرُورٌ مُتَعَلِّقٌ بِالْخَبَرِ.', "Wa 'ala shahibiha jarrun wa majrurun muta'alliqun bil khabari.", '"Bagi pemiliknya" adalah jar-majrur yang terkait dengan khabar.'],
  ]],
  [['Ta\'wil masdar: أَنْ/أَنَّ/مَا/كَيْ + kalimat bisa berfungsi sebagai fa\'il, maf\'ul, atau mubtada\'.', 'Contoh: وَأَنْ تَصُومُوا خَيْرٌ لَكُمْ → صِيَامُكُمْ خَيْرٌ لَكُمْ.'], [
    ['وَأَنْ تَعْفُوا أَقْرَبُ لِلتَّقْوَى.', "Wa an ta'fu aqrabu lit taqwa.", 'Dan memaafkan itu lebih dekat kepada takwa.'],
    ['يَسُرُّنِي مَا حَقَّقْتُمُوهُ هٰذَا الْعَامَ.', "Yasurruni ma haqqaqtumuhu hadzal 'ama.", 'Saya senang dengan apa yang telah kalian capai tahun ini.'],
    ['عَجِبْتُ مِنْ أَنَّكَ لَمْ تَحْضُرْ.', "'Ajibtu min annaka lam tahdhur.", 'Saya heran bahwa kamu tidak hadir.'],
    ['جِئْتُ كَيْ أَسْتَفِيدَ مِنْ خِبْرَتِكُمْ.', "Ji'tu kai astafida min khibratikum.", 'Saya datang agar dapat mengambil manfaat dari pengalaman Anda.'],
  ]],
  [['Uslub hashr: membatasi predikat pada subjek dengan نَفْيٌ + إِلَّا atau إِنَّمَا.', 'مَا الْعِلْمُ إِلَّا نُورٌ = ilmu tidak lain hanyalah cahaya.'], [
    ['مَا النَّجَاحُ إِلَّا ثَمَرَةُ الصَّبْرِ.', 'Man najahu illa tsamaratush shabri.', 'Keberhasilan tidak lain adalah buah kesabaran.'],
    ['إِنَّمَا الْأُمَمُ الْأَخْلَاقُ مَا بَقِيَتْ.', 'Innamal umamul akhlaqu ma baqiyat.', 'Sesungguhnya bangsa itu hanyalah akhlaknya selama akhlak itu ada.'],
    ['لَا يُفْلِحُ إِلَّا الْمُجْتَهِدُ.', 'La yuflihu illal mujtahidu.', 'Tidak ada yang beruntung kecuali orang yang bersungguh-sungguh.'],
    ['إِنَّمَا يَعْرِفُ الْفَضْلَ ذَوُوهُ.', "Innama ya'riful fadhla dzawuhu.", 'Hanya orang yang memiliki keutamaan yang mengenal keutamaan.'],
  ]],
  [['Qashr dengan taqdim (mendahulukan) yang biasanya di belakang: إِيَّاكَ نَعْبُدُ.', 'Mendahulukan objek/keterangan menghasilkan makna "hanya".'], [
    ['إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ.', "Iyyaka na'budu wa iyyaka nasta'inu.", 'Hanya kepada-Mu kami menyembah dan hanya kepada-Mu kami memohon pertolongan.'],
    ['عَلَى اللّٰهِ تَوَكَّلْنَا.', "'Alallahi tawakkalna.", 'Hanya kepada Allah kami bertawakal.'],
    ['بِالْعِلْمِ تُبْنَى الْحَضَارَاتُ.', "Bil 'ilmi tubnal hadharatu.", 'Dengan ilmulah peradaban dibangun.'],
    ['إِلَى الشَّبَابِ نُوَجِّهُ هٰذِهِ الرِّسَالَةَ.', 'Ilasy syababi nuwajjihu hadzihir risalata.', 'Kepada para pemudalah kami tujukan pesan ini.'],
  ]],
  [['Syarat kompleks: syarat bertumpuk, syarat dengan قَدْ/سَـ/لَنْ di jawab (wajib فَـ), dan لَمَّا.', 'لَمَّا + madhi = ketika (kausal-temporal): لَمَّا وَصَلَ بَدَأَ الْعَمَلُ.'], [
    ['إِنْ تُخْلِصْ فِي عَمَلِكَ فَلَنْ يَضِيعَ جُهْدُكَ.', "In tukhlish fi 'amalika falan yadhi'a juhduka.", 'Jika kamu ikhlas dalam bekerja, usahamu tidak akan sia-sia.'],
    ['لَمَّا اشْتَدَّتِ الْأَزْمَةُ تَدَخَّلَتِ الْحُكُومَةُ.', 'Lammasytaddatil azmatu tadakhkhalatil hukumatu.', 'Ketika krisis memuncak, pemerintah turun tangan.'],
    ['مَنْ جَدَّ وَجَدَ، وَمَنْ زَرَعَ حَصَدَ.', 'Man jadda wajada, wa man zara\'a hashada.', 'Siapa bersungguh-sungguh akan berhasil, siapa menanam akan menuai.'],
    ['إِذَا لَمْ تَسْتَحِ فَاصْنَعْ مَا شِئْتَ.', "Idza lam tastahi fashna' ma syi'ta.", 'Jika kamu tidak malu, berbuatlah sesukamu.'],
  ]],
  [['Badal (kull, ba\'dh, isytimal) dan taukid (lafzhi dan maknawi: نَفْسُ، عَيْنُ، كُلُّ، جَمِيعُ).', 'Taukid maknawi harus bersambung dhamir yang merujuk pada yang ditegaskan.'], [
    ['أَعْجَبَنِي الْكِتَابُ أُسْلُوبُهُ.', "A'jabanil kitabu usluubuhu.", 'Buku itu membuat saya kagum, gayanya. (badal isytimal)'],
    ['جَاءَ الْمُدِيرُ نَفْسُهُ لِاسْتِقْبَالِنَا.', "Ja'al mudiru nafsuhu listiqbalina.", 'Direktur sendiri datang untuk menyambut kami.'],
    ['حَفِظْتُ الْقَصِيدَةَ ثُلُثَهَا.', 'Hafizhtul qashidata tsulutsaha.', 'Saya menghafal kasidah itu, sepertiganya. (badal ba\'dh)'],
    ['الصَّبْرَ الصَّبْرَ عِنْدَ الشَّدَائِدِ.', "Ash-shabrash shabra 'indasy syada'idi.", 'Sabar, sabarlah ketika menghadapi kesulitan. (taukid lafzhi)'],
  ]],
  [['Maf\'ul muthlaq pengganti: sifat, isim isyarah, كُلَّ/بَعْضَ, atau sinonim masdar.', 'Contoh: أَحْبَبْتُهُ كُلَّ الْحُبِّ، قُمْتُ وُقُوفًا.'], [
    ['أَحْبَبْتُ الْمَدِينَةَ كُلَّ الْحُبِّ.', 'Ahbabtul madinata kullal hubbi.', 'Saya mencintai kota itu dengan sepenuh cinta.'],
    ['اسْتَعَدَّ الْفَرِيقُ أَحْسَنَ اسْتِعْدَادٍ.', "Ista'addal fariqu ahsana isti'dadin.", 'Tim itu bersiap dengan persiapan terbaik.'],
    ['اهْتَمَّ بِالْقَضِيَّةِ بَعْضَ الِاهْتِمَامِ.', 'Ihtamma bil qadhiyyati ba\'dhal ihtimami.', 'Ia memberi sedikit perhatian pada persoalan itu.'],
    ['قَعَدْتُ جُلُوسًا طَوِيلًا أَمَامَ الْحَاسُوبِ.', 'Qa\'adtu julusan thawilan amamal hasubi.', 'Saya duduk lama di depan komputer.'],
  ]],
  [['Maf\'ul li-ajlih dalam argumen: menyatakan motif kebijakan atau tindakan.', 'Bisa manshub langsung (حِرْصًا عَلَى) atau dengan لِـ (لِلْحِرْصِ).'], [
    ['أُغْلِقَتِ الْمَدَارِسُ حِرْصًا عَلَى سَلَامَةِ الطُّلَّابِ.', "Ughliqatil madarisu hirshan 'ala salamatith thullabi.", 'Sekolah-sekolah ditutup demi menjaga keselamatan siswa.'],
    ['رُفِعَتِ الضَّرَائِبُ سَعْيًا إِلَى تَقْلِيصِ الْعَجْزِ.', "Rufi'atidh dhara'ibu sa'yan ila taqlishil 'ajzi.", 'Pajak dinaikkan dalam upaya mengurangi defisit.'],
    ['تَنَازَلَ عَنْ حَقِّهِ رَغْبَةً فِي الصُّلْحِ.', 'Tanazala \'an haqqihi raghbatan fish shulhi.', 'Ia melepaskan haknya karena menginginkan perdamaian.'],
    ['صَمَتَ الشَّاهِدُ خَشْيَةَ الِانْتِقَامِ.', 'Shamatasy syahidu khasyyatal intiqami.', 'Saksi itu diam karena takut akan balas dendam.'],
  ]],
  [['Hal berupa jumlah ismiyyah (dengan وَ) atau fi\'liyyah (mudhari\' tanpa وَ).', 'Hal jumlah menggambarkan keadaan bersamaan dengan kejadian utama.'], [
    ['خَرَجَ الْمُتَظَاهِرُونَ يَرْفَعُونَ اللَّافِتَاتِ.', "Kharajal mutazhahiruna yarfa'unal lafitati.", 'Para demonstran keluar sambil mengangkat spanduk.'],
    ['دَخَلَتِ الْقَاعَةَ وَالْجَمِيعُ صَامِتُونَ.', "Dakhalatil qa'ata wal jami'u shamituna.", 'Ia (pr) masuk aula sementara semua orang diam.'],
    ['أَنْهَى الطَّالِبُ الْبَحْثَ وَقَدْ أَرْهَقَهُ السَّهَرُ.', "Anhath thalibul bahtsa wa qad arhaqahus saharu.", 'Siswa itu menyelesaikan penelitiannya dalam keadaan lelah karena begadang.'],
    ['وَقَفَ الْخَطِيبُ يَنْظُرُ إِلَى الْحُضُورِ.', 'Waqafal khathibu yanzhuru ilal hudhuri.', 'Khatib berdiri sambil memandang hadirin.'],
  ]],
  [['Tamyiz nisbah: memperjelas aspek dari hubungan kalimat (bukan dari kata tunggal).', 'Sering setelah isim tafdhil atau fi\'il seperti طَابَ، ازْدَادَ، امْتَلَأَ.'], [
    ['ازْدَادَ الْبَاحِثُ خِبْرَةً بَعْدَ الرِّحْلَةِ.', "Izdadal bahitsu khibratan ba'dar rihlati.", 'Peneliti itu bertambah pengalamannya setelah perjalanan.'],
    ['هٰذِهِ الرِّوَايَةُ أَعْمَقُ فِكْرًا مِنْ سَابِقَتِهَا.', 'Hadzihir riwayatu a\'maqu fikran min sabiqatiha.', 'Novel ini lebih dalam gagasannya daripada yang sebelumnya.'],
    ['طِبْتُمْ نَفْسًا بِهٰذَا الْإِنْجَازِ.', 'Thibtum nafsan bihadzal injazi.', 'Hati kalian menjadi lega dengan pencapaian ini.'],
    ['تَفَجَّرَتِ الْأَرْضُ عُيُونًا.', "Tafajjaratil ardhu 'uyunan.", 'Bumi memancarkan mata air-mata air.'],
  ]],
  [['Isim fa\'il/maf\'ul bisa bekerja seperti fi\'il (beramal): menashabkan objek atau merafa\'kan fa\'il.', 'Contoh: أَنَا فَاهِمٌ الدَّرْسَ (saya memahami pelajaran) — الدَّرْسَ maf\'ul bih isim fa\'il.'], [
    ['هَلْ أَنْتَ حَافِظٌ الْقَصِيدَةَ كُلَّهَا؟', 'Hal anta hafizhun al-qashidata kullaha?', 'Apakah kamu hafal seluruh kasidah itu?'],
    ['الطَّالِبُ الْفَاهِمُ دَرْسَهُ لَا يَخَافُ.', 'Ath-thalibul fahimu darsahu la yakhafu.', 'Siswa yang memahami pelajarannya tidak takut.'],
    ['رَأَيْتُ رَجُلًا مَكْسُورًا قَلْبُهُ.', "Ra'aitu rajulan maksuran qalbuhu.", 'Saya melihat seorang pria yang hancur hatinya.'],
    ['الْمُعَلِّمُ مُكْرِمٌ طُلَّابَهُ.', "Al-mu'allimu mukrimun thullabahu.", 'Guru itu memuliakan murid-muridnya.'],
  ]],
  [['Fi\'il mazid dan makna tambahan: فَعَّلَ (intensif), أَفْعَلَ (kausatif), تَفَعَّلَ (menerima akibat), اسْتَفْعَلَ (meminta).', 'Satu akar, banyak makna: خَرَجَ، أَخْرَجَ، تَخَرَّجَ، اسْتَخْرَجَ.'], [
    ['خَرَجَ الطُّلَّابُ مِنَ الْقَاعَةِ.', "Kharajath thullabu minal qa'ati.", 'Para siswa keluar dari aula.'],
    ['أَخْرَجَ الْمُخْرِجُ فِيلْمًا جَدِيدًا.', 'Akhrajal mukhriju filman jadidan.', 'Sutradara itu menyutradarai film baru.'],
    ['تَخَرَّجَتْ أُخْتِي فِي كُلِّيَّةِ الطِّبِّ.', 'Takharrajat ukhti fi kulliyyatith thibbi.', 'Saudara perempuan saya lulus dari fakultas kedokteran.'],
    ['اسْتَخْرَجَ الْبَاحِثُ النَّتَائِجَ مِنَ الْبَيَانَاتِ.', "Istakhrajal bahitsun nata'ija minal bayanati.", 'Peneliti itu menggali hasil dari data.'],
  ]],
  [['Jumlah i\'tiradhiyyah: kalimat sisipan di antara dua unsur yang terkait, tanpa posisi i\'rab.', 'Biasanya berupa doa atau keterangan: وَالْحَمْدُ لِلّٰهِ، رَحِمَهُ اللّٰهُ، وَهٰذَا مُهِمٌّ.'], [
    ['إِنَّ الْأُسْتَاذَ — رَحِمَهُ اللّٰهُ — كَانَ مِثَالًا لِلتَّوَاضُعِ.', "Innal ustadza — rahimahullah — kana mitsalan lit tawadhu'i.", 'Sesungguhnya guru itu — semoga Allah merahmatinya — adalah teladan kerendahan hati.'],
    ['وَصَلْنَا — وَالْحَمْدُ لِلّٰهِ — سَالِمِينَ.', 'Washalna — wal hamdu lillah — salimina.', 'Kami tiba — segala puji bagi Allah — dengan selamat.'],
    ['الْمَشْرُوعُ — وَهٰذَا مَا لَا يَعْرِفُهُ كَثِيرُونَ — مُمَوَّلٌ ذَاتِيًّا.', "Al-masyru'u — wa hadza ma la ya'rifuhu katsiruna — mumawwalun dzatiyyan.", 'Proyek itu — dan ini yang tidak diketahui banyak orang — didanai secara mandiri.'],
    ['الْعِلْمُ — لَوْ تَعْلَمُونَ — أَغْلَى مِنَ الذَّهَبِ.', "Al-'ilmu — lau ta'lamuna — aghla minadz dzahabi.", 'Ilmu — seandainya kalian tahu — lebih berharga daripada emas.'],
  ]],
  [['Rabth antarjumlah: hubungan kalimat lewat وَ، فَـ، ثُمَّ، بَلْ، لٰكِنْ، حَتَّى dengan makna berbeda.', 'فَـ = segera/akibat; ثُمَّ = jeda waktu; بَلْ = koreksi.'], [
    ['دَرَسَ فَنَجَحَ.', 'Darasa fanajaha.', 'Ia belajar, maka ia berhasil. (akibat langsung)'],
    ['تَخَرَّجَ ثُمَّ سَافَرَ بَعْدَ سَنَوَاتٍ.', "Takharraja tsumma safara ba'da sanawatin.", 'Ia lulus, kemudian bepergian beberapa tahun kemudian. (jeda)'],
    ['لَيْسَ الْأَمْرُ سَهْلًا، بَلْ هُوَ فِي غَايَةِ التَّعْقِيدِ.', "Laisal amru sahlan, bal huwa fi ghayatit ta'qidi.", 'Perkaranya tidak mudah, bahkan sangat rumit. (koreksi)'],
    ['قَرَأْتُ الْكِتَابَ حَتَّى الصَّفْحَةِ الْأَخِيرَةِ.', "Qara'tul kitaba hattash shafhatil akhirati.", 'Saya membaca buku itu hingga halaman terakhir.'],
  ]],
  [['Kohesi dhamir dalam wacana panjang: satu dhamir bisa merujuk jauh ke belakang; pastikan tidak ambigu.', 'Jika ambigu, ulangi kata bendanya daripada memakai dhamir.'], [
    ['الْتَقَى الْوَزِيرُ بِالسَّفِيرِ، وَنَاقَشَ مَعَهُ الِاتِّفَاقِيَّةَ.', "Iltaqal waziru bis safiri, wa naqasya ma'ahul ittifaqiyyata.", 'Menteri bertemu duta besar, dan membahas perjanjian bersamanya.'],
    ['وَقَدْ أَكَّدَ الْوَزِيرُ — لَا السَّفِيرُ — ضَرُورَةَ التَّعْجِيلِ.', "Wa qad akkadal waziru — las safiru — dharuratat ta'jili.", 'Menteri — bukan duta besar — menegaskan perlunya percepatan.'],
    ['وَكَانَتِ الِاتِّفَاقِيَّةُ قَدْ تَعَثَّرَتْ مُنْذُ سَنَوَاتٍ.', "Wa kanatil ittifaqiyyatu qad ta'atstsarat mundzu sanawatin.", 'Perjanjian itu telah tersendat bertahun-tahun.'],
    ['وَيَأْمُلُ الطَّرَفَانِ إِحْيَاءَهَا قَبْلَ نِهَايَةِ الْعَامِ.', "Wa ya'mulut tharafani ihya'aha qabla nihayatil 'ami.", 'Kedua pihak berharap menghidupkannya kembali sebelum akhir tahun.'],
  ]],
  [['Tasybih: musyabbah, musyabbah bih, adat (كَـ، مِثْلُ، كَأَنَّ), wajh syabah.', 'Tasybih baligh: tanpa adat dan wajh syabah — الْعِلْمُ نُورٌ.'], [
    ['الْعِلْمُ كَالنُّورِ يُضِيءُ الطَّرِيقَ.', "Al-'ilmu kan nuri yudhi'uth thariqa.", 'Ilmu bagaikan cahaya yang menerangi jalan.'],
    ['كَأَنَّ الْمَدِينَةَ لَيْلًا عِقْدٌ مِنَ اللُّؤْلُؤِ.', "Ka'annal madinata lailan 'iqdun minal lu'lu'i.", 'Seolah-olah kota itu pada malam hari adalah kalung mutiara.'],
    ['الْكِتَابُ صَدِيقٌ.', 'Al-kitabu shadiqun.', 'Buku adalah sahabat. (tasybih baligh)'],
    ['انْتَشَرَ الْخَبَرُ انْتِشَارَ النَّارِ فِي الْهَشِيمِ.', 'Intasyaral khabaru intisyaran nari fil hasyimi.', 'Kabar itu menyebar bagai api di jerami kering.'],
  ]],
  [['Kinayah: ungkapan yang bermakna lain dari makna harfiahnya tanpa menafikan makna harfiah.', 'Contoh: كَثِيرُ الرَّمَادِ = dermawan (karena sering memasak untuk tamu).'], [
    ['فُلَانٌ كَثِيرُ الرَّمَادِ.', 'Fulanun katsirur ramadi.', 'Si fulan banyak abunya. (kinayah: sangat dermawan)'],
    ['هِيَ نَظِيفَةُ الْيَدِ.', 'Hiya nazhifatul yadi.', 'Ia bersih tangannya. (kinayah: jujur, tidak korup)'],
    ['عَضَّ أَصَابِعَ النَّدَمِ.', "'Adhdha ashabi'an nadami.", 'Ia menggigit jari penyesalan. (kinayah: sangat menyesal)'],
    ['طَوِيلُ النِّجَادِ.', 'Thawilun nijadi.', 'Panjang sarung pedangnya. (kinayah: berbadan tinggi / pemberani)'],
  ]],
  [['Konektor argumentatif C1: عَلَاوَةً عَلَى، فِي الْمُقَابِلِ، بِنَاءً عَلَيْهِ، وَمِنْ ثَمَّ، وَعَلَيْهِ.', 'Setiap konektor menandai fungsi logis; jangan dipakai sembarangan.'], [
    ['عِلَاوَةً عَلَى التَّكْلِفَةِ، يَسْتَغْرِقُ الْمَشْرُوعُ وَقْتًا طَوِيلًا.', "'Ilawatan 'alat taklifati, yastaghriqul masyru'u waqtan thawilan.", 'Selain biaya, proyek itu memakan waktu lama.'],
    ['وَفِي الْمُقَابِلِ، يُوَفِّرُ حُلُولًا مُسْتَدَامَةً.', 'Wa fil muqabili, yuwaffiru hululan mustadamatan.', 'Sebaliknya, proyek itu menyediakan solusi berkelanjutan.'],
    ['وَبِنَاءً عَلَيْهِ نَرَى الْمُضِيَّ فِيهِ.', "Wa bina'an 'alaihi naral mudhiyya fihi.", 'Berdasarkan itu kami memandang perlu melanjutkannya.'],
    ['وَعَلَيْهِ، فَإِنَّ التَّمْوِيلَ يَجِبُ أَنْ يُضْمَنَ مُبَكِّرًا.', "Wa 'alaihi, fa innat tamwila yajibu an yudhmana mubakkiran.", 'Karena itu, pendanaan harus dijamin sejak awal.'],
  ]],
  [['Parsing paragraf: bagi paragraf menjadi kalimat inti, lalu tentukan hubungan dan i\'rab tiap unsur kunci.', 'Gunakan kurung untuk menandai frasa: [mubtada\'] [khabar] [jar-majrur].'], [
    ['لَمْ يَكُنِ التَّحَوُّلُ الرَّقْمِيُّ خِيَارًا، بَلْ ضَرُورَةً فَرَضَتْهَا الظُّرُوفُ.', 'Lam yakunit tahawwulur raqmiyyu khiyaran, bal dharuratan faradhathaz zhurufu.', 'Transformasi digital bukanlah pilihan, melainkan kebutuhan yang dipaksakan keadaan.'],
    ['فَحِينَ أُغْلِقَتِ الْمَكَاتِبُ، انْتَقَلَ الْعَمَلُ إِلَى الْبُيُوتِ.', "Fahina ughliqatil makatibu, intaqalal 'amalu ilal buyuti.", 'Ketika kantor-kantor ditutup, pekerjaan pindah ke rumah-rumah.'],
    ['وَصَارَتِ الشَّاشَةُ نَافِذَةَ الْمُوَظَّفِ الْوَحِيدَةَ عَلَى زُمَلَائِهِ.', "Wa sharatisy syasyatu nafidzatal muwazhzhafil wahidata 'ala zumala'ihi.", 'Dan layar menjadi satu-satunya jendela pegawai menuju rekan-rekannya.'],
    ['وَهُوَ تَغْيِيرٌ لَنْ يَزُولَ بِزَوَالِ الْأَزْمَةِ.', 'Wa huwa taghyirun lan yazula bizawalil azmati.', 'Dan itu perubahan yang tidak akan hilang dengan berlalunya krisis.'],
  ]],
  [['Review nahwu-balaghah C1: hashr, qashr, ta\'wil masdar, hal jumlah, i\'tiradh, tasybih, kinayah.', 'Target: menganalisis teks sastra pendek dari sisi nahwu dan balaghah.'], [
    ['مَا الْحَيَاةُ إِلَّا رِحْلَةٌ قَصِيرَةٌ كَظِلِّ غَيْمَةٍ.', "Mal hayatu illa rihlatun qashiratun kazhilli ghaimatin.", 'Hidup tidak lain adalah perjalanan singkat bagaikan bayangan awan.'],
    ['وَإِنَّمَا يَبْقَى مِنْهَا مَا زَرَعْنَاهُ فِي قُلُوبِ النَّاسِ.', "Wa innama yabqa minha ma zara'nahu fi qulubin nasi.", 'Yang tersisa darinya hanyalah apa yang kita tanam di hati manusia.'],
    ['فَكُنْ — رَعَاكَ اللّٰهُ — نَظِيفَ الْيَدِ طَيِّبَ الْقَلْبِ.', "Fakun — ra'akallah — nazhifal yadi thayyibal qalbi.", 'Maka jadilah — semoga Allah menjagamu — bersih tangan dan baik hati.'],
    ['وَسِرْ فِي الدُّنْيَا تَزْرَعُ الْخَيْرَ أَيْنَمَا حَلَلْتَ.', "Wa sir fid dunya tazra'ul khaira ainama halalta.", 'Dan berjalanlah di dunia sambil menanam kebaikan di mana pun kamu singgah.'],
  ]],
];
