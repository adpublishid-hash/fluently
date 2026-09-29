import type { LessonCoreTuple } from '../types';

// Nahwu-sharaf B1 — one entry per lesson (index = lesson - 1).
export const grammar: LessonCoreTuple[] = [
  [['Fi\'il madhi pola فَعَلَ/فَعِلَ/فَعُلَ; akhiran menunjukkan pelaku: ـتُ، ـتَ، ـتِ، ـنَا، ـوا.', 'Dhamir هُوَ tanpa akhiran: كَتَبَ; هِيَ dengan ـَتْ: كَتَبَتْ.'], [
    ['فَتَحَ الْحَارِسُ الْبَابَ.', 'Fatahal harisul baba.', 'Penjaga membuka pintu.'],
    ['شَرِبَتِ الْبِنْتُ الْعَصِيرَ.', "Syaribatil bintul 'ashira.", 'Anak perempuan itu meminum jus.'],
    ['كَبُرَ الطِّفْلُ بِسُرْعَةٍ.', "Kaburath thiflu bisur'atin.", 'Anak itu cepat besar.'],
    ['رَجَعُوا مِنَ السُّوقِ مُتَأَخِّرِينَ.', "Raja'u minas suqi muta'akhkhirina.", 'Mereka pulang dari pasar terlambat.'],
  ]],
  [['Mudhari\' marfu\' berakhiran dhammah jika tidak didahului nashib atau jazim.', 'Af\'al khamsah marfu\' dengan nun: يَكْتُبُونَ، تَكْتُبِينَ، يَكْتُبَانِ.'], [
    ['يَكْتُبُ الطَّالِبُ الدَّرْسَ.', 'Yaktubuth thalibud darsa.', 'Siswa itu menulis pelajaran.'],
    ['الطُّلَّابُ يَكْتُبُونَ الْوَاجِبَ.', 'Ath-thullabu yaktubunal wajiba.', 'Para siswa menulis PR.'],
    ['أَنْتِ تَدْرُسِينَ فِي الْمَكْتَبَةِ.', 'Anti tadrusina fil maktabati.', 'Kamu (pr) belajar di perpustakaan.'],
    ['الْوَلَدَانِ يَلْعَبَانِ فِي الْحَدِيقَةِ.', "Al-waladani yal'abani fil hadiqati.", 'Kedua anak laki-laki itu bermain di taman.'],
  ]],
  [['أَنْ، لَنْ، كَيْ، حَتَّى membuat mudhari\' manshub (fathah).', 'Af\'al khamsah manshub dengan membuang nun: لَنْ يَكْتُبُوا.'], [
    ['أُرِيدُ أَنْ أَتَعَلَّمَ السِّبَاحَةَ.', "Uridu an ata'allamas sibahata.", 'Saya ingin belajar berenang.'],
    ['لَنْ يَنْجَحَ الْكَسُولُ.', 'Lan yanjahal kasulu.', 'Orang malas tidak akan berhasil.'],
    ['جِئْتُ كَيْ أُسَاعِدَكَ.', "Ji'tu kai usa'idaka.", 'Saya datang agar bisa membantumu.'],
    ['لَنْ يَتَأَخَّرُوا عَنِ الْمَوْعِدِ.', "Lan yata'akhkharu 'anil mau'idi.", 'Mereka tidak akan terlambat dari jadwal.'],
  ]],
  [['لَمْ، لَا النَّاهِيَة، لَامُ الْأَمْرِ membuat mudhari\' majzum (sukun).', 'Fi\'il mu\'tal akhir dibuang hurufnya saat majzum: يَمْشِي ← لَمْ يَمْشِ.'], [
    ['لَمْ يَحْضُرْ أَحْمَدُ الدَّرْسَ.', 'Lam yahdhur Ahmadud darsa.', 'Ahmad tidak menghadiri pelajaran.'],
    ['لَمْ يَمْشِ الْمَرِيضُ الْيَوْمَ.', 'Lam yamsyil maridhul yauma.', 'Orang sakit itu tidak berjalan hari ini.'],
    ['لِيَقْرَأْ كُلُّ طَالِبٍ صَفْحَةً.', "Liyaqra' kullu thalibin shafhatan.", 'Hendaklah setiap siswa membaca satu halaman.'],
    ['لَمْ يَفْهَمُوا السُّؤَالَ.', "Lam yafhamus su'ala.", 'Mereka tidak memahami pertanyaannya.'],
  ]],
  [['Fa\'il marfu\' (pelaku), maf\'ul bih manshub (objek).', 'Maf\'ul bih bisa mendahului fa\'il bila fa\'il berupa isim zhahir: أَكَلَ الطَّعَامَ الضَّيْفُ.'], [
    ['قَرَأَ الْإِمَامُ الْقُرْآنَ.', "Qara'al imamul Qur'ana.", "Imam membaca Al-Qur'an."],
    ['رَسَمَتْ سَلْمَى صُورَةً جَمِيلَةً.', 'Rasamat Salma shuratan jamilatan.', 'Salma menggambar gambar yang indah.'],
    ['أَصْلَحَ الْمِيكَانِيكِيُّ السَّيَّارَةَ.', 'Ashlahal mikanikiyyus sayyarata.', 'Montir memperbaiki mobil itu.'],
    ['زَارَ الطُّلَّابَ الْوَزِيرُ.', 'Zarath thullabal waziru.', 'Menteri mengunjungi para siswa.'],
  ]],
  [['Naibul fa\'il: pelaku dihapus, objek menjadi marfu\'. Madhi: فُعِلَ; mudhari\': يُفْعَلُ.', 'Dipakai saat pelaku tidak diketahui atau tidak penting.'], [
    ['كُتِبَ الدَّرْسُ عَلَى السَّبُّورَةِ.', "Kutibad darsu 'alas sabburati.", 'Pelajaran ditulis di papan tulis.'],
    ['سُرِقَتِ الدَّرَّاجَةُ لَيْلًا.', 'Suriqatid darrajatu lailan.', 'Sepeda itu dicuri pada malam hari.'],
    ['يُفْتَحُ الْمَتْحَفُ فِي التَّاسِعَةِ.', "Yuftahul mathafu fit tasi'ati.", 'Museum dibuka pukul sembilan.'],
    ['تُقَدَّمُ الْجَوَائِزُ لِلْفَائِزِينَ.', "Tuqaddamul jawa'izu lil fa'izina.", 'Hadiah diberikan kepada para pemenang.'],
  ]],
  [['كَانَ وَأَخَوَاتُهَا: isim marfu\', khabar manshub.', 'Saudaranya: أَصْبَحَ (menjadi, di pagi), صَارَ (menjadi), مَا زَالَ (masih), لَيْسَ (bukan).'], [
    ['كَانَ الْجَوُّ مُمْطِرًا أَمْسِ.', 'Kanal jawwu mumthiran amsi.', 'Cuaca kemarin hujan.'],
    ['أَصْبَحَ الطَّرِيقُ مُزْدَحِمًا.', 'Ashbahath thariqu muzdahiman.', 'Jalanan menjadi padat.'],
    ['صَارَ أَخِي طَبِيبًا مَشْهُورًا.', 'Shara akhi thabiban masyhuran.', 'Saudara saya menjadi dokter terkenal.'],
    ['مَا زَالَ الْمَطْعَمُ مَفْتُوحًا.', "Ma zalal math'amu maftuhan.", 'Restoran itu masih buka.'],
  ]],
  [['إِنَّ وَأَخَوَاتُهَا: isim manshub, khabar marfu\'.', 'أَنَّ (bahwa), كَأَنَّ (seakan-akan), لٰكِنَّ (tetapi), لَيْتَ (andai), لَعَلَّ (semoga/barangkali).'], [
    ['إِنَّ الصِّدْقَ طَرِيقُ النَّجَاةِ.', 'Innash shidqa thariqun najati.', 'Sesungguhnya kejujuran adalah jalan keselamatan.'],
    ['كَأَنَّ الْقَمَرَ مِصْبَاحٌ كَبِيرٌ.', "Ka'annal qamara mishbahun kabirun.", 'Seakan-akan bulan itu lampu yang besar.'],
    ['لَيْتَ الْعُطْلَةَ طَوِيلَةٌ.', "Laital 'uthlata thawilatun.", 'Andai saja liburannya panjang.'],
    ['عَلِمْتُ أَنَّ الْقِطَارَ مُتَأَخِّرٌ.', "'Alimtu annal qithara muta'akhkhirun.", 'Saya tahu bahwa keretanya terlambat.'],
  ]],
  [['Idhafah berlapis: setiap mudhaf ilaih majrur, hanya kata terakhir yang boleh ber-ال.', 'Na\'at untuk mudhaf diletakkan setelah seluruh rangkaian idhafah.'], [
    ['بَابُ غُرْفَةِ الْمُدِيرِ مُغْلَقٌ.', 'Babu ghurfatil mudiri mughlaqun.', 'Pintu ruangan direktur tertutup.'],
    ['قَرَأْتُ مَقَالَ أُسْتَاذِ الْجَامِعَةِ.', "Qara'tu maqala ustadzil jami'ati.", 'Saya membaca artikel dosen universitas.'],
    ['سَيَّارَةُ صَدِيقِ أَبِي الْجَدِيدَةُ.', 'Sayyaratu shadiqi abil jadidatu.', 'Mobil baru milik teman ayah saya.'],
    ['نَتَائِجُ امْتِحَانِ نِهَايَةِ الْعَامِ.', "Nata'iju imtihani nihayatil 'ami.", 'Hasil ujian akhir tahun.'],
  ]],
  [['Na\'at mengikuti man\'ut dalam 4 hal: i\'rab, jenis, jumlah, ma\'rifah/nakirah.', 'Jamak taksir tak berakal sering diberi na\'at mufrad mu\'annats: كُتُبٌ مُفِيدَةٌ.'], [
    ['اشْتَرَيْتُ كُتُبًا مُفِيدَةً.', 'Isytaraitu kutuban mufidatan.', 'Saya membeli buku-buku yang bermanfaat.'],
    ['حَضَرَ الْمُعَلِّمُونَ الْجُدُدُ.', "Hadharal mu'allimunal judud.", 'Guru-guru baru telah hadir.'],
    ['هٰذِهِ مَدِينَةٌ قَدِيمَةٌ جَمِيلَةٌ.', 'Hadzihi madinatun qadimatun jamilatun.', 'Ini kota tua yang indah.'],
    ['سَلَّمْتُ عَلَى الطَّالِبَتَيْنِ الْمُجْتَهِدَتَيْنِ.', "Sallamtu 'alath thalibatainil mujtahidataini.", 'Saya menyapa kedua siswi yang rajin itu.'],
  ]],
  [['Hal: isim nakirah manshub yang menjelaskan keadaan pelaku/objek saat kejadian.', 'Menjawab pertanyaan كَيْفَ؟: جَاءَ مُسْرِعًا (datang dengan tergesa).'], [
    ['جَاءَ الضَّيْفُ مُبْتَسِمًا.', "Ja'adh dhaifu mubtasiman.", 'Tamu itu datang sambil tersenyum.'],
    ['رَجَعَ اللَّاعِبُونَ فَرِحِينَ.', "Raja'al la'ibuna farihina.", 'Para pemain pulang dengan gembira.'],
    ['شَرِبْتُ الْقَهْوَةَ سَاخِنَةً.', 'Syaribtul qahwata sakhinatan.', 'Saya meminum kopi dalam keadaan panas.'],
    ['دَخَلَتِ الْبِنْتُ الْفَصْلَ مُسْرِعَةً.', "Dakhalatil bintul fashla musri'atan.", 'Anak perempuan itu masuk kelas dengan tergesa.'],
  ]],
  [['Tamyiz: isim nakirah manshub yang memperjelas yang samar (ukuran, jumlah, atau aspek).', 'Setelah bilangan 11-99, ma\'dud adalah tamyiz mufrad manshub: عِشْرُونَ طَالِبًا.'], [
    ['اشْتَرَيْتُ كِيلُو تُفَّاحًا.', 'Isytaraitu kilu tuffahan.', 'Saya membeli satu kilo apel.'],
    ['فِي الْفَصْلِ عِشْرُونَ طَالِبًا.', "Fil fashli 'isyruna thaliban.", 'Di kelas ada dua puluh siswa.'],
    ['زَيْدٌ أَكْثَرُ مِنْكَ مَالًا.', 'Zaidun aktsaru minka malan.', 'Zaid lebih banyak hartanya daripadamu.'],
    ['امْتَلَأَ الْكُوبُ مَاءً.', "Imtala'al kubu ma'an.", 'Gelas itu penuh dengan air.'],
  ]],
  [['Khabar bisa berupa jumlah (kalimat) yang memuat dhamir rujukan ke mubtada\'.', 'Jumlah fi\'liyyah: الطَّالِبُ نَجَحَ; jumlah ismiyyah: الْبَيْتُ بَابُهُ وَاسِعٌ.'], [
    ['الْمُهَنْدِسُ يَبْنِي جِسْرًا.', 'Al-muhandisu yabni jisran.', 'Insinyur itu sedang membangun jembatan.'],
    ['الْحَدِيقَةُ أَشْجَارُهَا عَالِيَةٌ.', "Al-hadiqatu asyjaruha 'aliyatun.", 'Taman itu pohon-pohonnya tinggi.'],
    ['الْمُسَافِرُونَ وَصَلُوا صَبَاحًا.', 'Al-musafiruna washalu shabahan.', 'Para musafir tiba pada pagi hari.'],
    ['هٰذَا الرَّجُلُ أَخْلَاقُهُ كَرِيمَةٌ.', 'Hadzar rajulu akhlaquhu karimatun.', 'Laki-laki ini akhlaknya mulia.'],
  ]],
  [['Isim maushul lengkap: الَّذِي، الَّتِي، اللَّذَانِ، اللَّتَانِ، الَّذِينَ، اللَّاتِي.', 'مَنْ (siapa yang) untuk yang berakal, مَا (apa yang) untuk yang tak berakal.'], [
    ['الطَّالِبَانِ اللَّذَانِ نَجَحَا مِنْ قَرْيَتِي.', 'Ath-thalibanil ladzani najaha min qaryati.', 'Dua siswa yang lulus itu dari desa saya.'],
    ['الْمُعَلِّمَاتُ اللَّاتِي حَضَرْنَ نَشِيطَاتٌ.', "Al-mu'allimatul lati hadharna nasyithatun.", 'Guru-guru perempuan yang hadir itu giat.'],
    ['أَحْتَرِمُ مَنْ يَقُولُ الْحَقَّ.', 'Ahtarimu man yaqulul haqqa.', 'Saya menghormati orang yang berkata benar.'],
    ['فَهِمْتُ مَا قَالَهُ الْأُسْتَاذُ.', 'Fahimtu ma qalahul ustadzu.', 'Saya memahami apa yang dikatakan guru.'],
  ]],
  [['Dhamir muttashil bisa melekat pada isim (milik), fi\'il (objek), dan huruf (مِنْهُ، إِلَيْهَا).', 'Pada fi\'il, ya\' mutakallim didahului nun wiqayah: سَاعَدَنِي.'], [
    ['سَاعَدَنِي زَمِيلِي فِي الْبَحْثِ.', "Sa'adani zamili fil bahtsi.", 'Rekan saya membantu saya dalam penelitian.'],
    ['أَرْسَلْتُ إِلَيْهَا رِسَالَةً.', 'Arsaltu ilaiha risalatan.', 'Saya mengirim surat kepadanya (pr).'],
    ['زُرْنَاهُمْ فِي بَيْتِهِمْ.', 'Zurnahum fi baitihim.', 'Kami mengunjungi mereka di rumah mereka.'],
    ['أَخَذْتُ مِنْهُ الْكِتَابَ وَقَرَأْتُهُ.', "Akhadztu minhul kitaba wa qara'tuhu.", 'Saya mengambil buku darinya lalu membacanya.'],
  ]],
  [['Mujarrad: semua huruf asli (كَتَبَ); mazid: ditambah huruf (كَاتَبَ، اسْتَكْتَبَ).', 'Tambahan huruf mengubah makna: عَلِمَ (tahu) → عَلَّمَ (mengajar) → تَعَلَّمَ (belajar).'], [
    ['عَلِمَ الْخَبَرَ مِنَ الْإِذَاعَةِ.', "'Alimal khabara minal idza'ati.", 'Ia mengetahui berita itu dari radio.'],
    ['عَلَّمَ الْأَبُ ابْنَهُ السِّبَاحَةَ.', "'Allamal abubnahus sibahata.", 'Ayah mengajari anaknya berenang.'],
    ['تَعَلَّمَ الْوَلَدُ الْقِرَاءَةَ بِسُرْعَةٍ.', "Ta'allamal waladul qira'ata bisur'atin.", 'Anak itu belajar membaca dengan cepat.'],
    ['اسْتَعْلَمَ الْمُسَافِرُ عَنْ مَوْعِدِ الرِّحْلَةِ.', "Ista'lamal musafiru 'an mau'idir rihlati.", 'Musafir itu menanyakan jadwal perjalanan.'],
  ]],
  [['Wazan فَعَّلَ - يُفَعِّلُ: tasydid pada ain fi\'il, sering bermakna transitif atau intensif.', 'Contoh: نَظُفَ (bersih) → نَظَّفَ (membersihkan); كَسَرَ → كَسَّرَ (menghancurkan).'], [
    ['نَظَّفَتْ فَاطِمَةُ الْمَطْبَخَ.', 'Nazhzhafat Fathimatul mathbakha.', 'Fatimah membersihkan dapur.'],
    ['يُدَرِّسُ أَبِي فِي مَدْرَسَةٍ ثَانَوِيَّةٍ.', 'Yudarrisu abi fi madrasatin tsanawiyyatin.', 'Ayah saya mengajar di sebuah SMA.'],
    ['جَهَّزْنَا الْقَاعَةَ لِلْحَفْلِ.', "Jahhazna al-qa'ata lil hafli.", 'Kami menyiapkan aula untuk acara.'],
    ['غَيَّرَ الْمُدِيرُ مَوْعِدَ الِاجْتِمَاعِ.', "Ghayyaral mudiru mau'idal ijtima'i.", 'Direktur mengubah jadwal rapat.'],
  ]],
  [['Wazan فَاعَلَ - يُفَاعِلُ: sering bermakna saling atau melakukan bersama pihak lain.', 'Masdarnya مُفَاعَلَةٌ atau فِعَالٌ: مُشَارَكَةٌ، جِهَادٌ.'], [
    ['شَارَكَ الطُّلَّابُ فِي الْمُسَابَقَةِ.', 'Syarakath thullabu fil musabaqati.', 'Para siswa ikut serta dalam lomba.'],
    ['يُسَاعِدُ الْجَارُ جَارَهُ.', "Yusa'idul jaru jarahu.", 'Tetangga membantu tetangganya.'],
    ['قَابَلْتُ الْمُدِيرَ صَبَاحَ الْيَوْمِ.', 'Qabaltul mudira shabahal yaumi.', 'Saya menemui direktur pagi ini.'],
    ['تُحَاوِلُ الْفِرْقَةُ الْفَوْزَ.', 'Tuhawilul firqatul fauza.', 'Tim itu berusaha untuk menang.'],
  ]],
  [['Syarat: إِنْ + dua fi\'il majzum (fi\'il syarat dan jawab).', 'Jika jawab bukan fi\'il yang bisa langsung dijazm, beri فَـ: إِنْ تَدْرُسْ فَأَنْتَ نَاجِحٌ.'], [
    ['إِنْ تَجْتَهِدْ تَنْجَحْ.', 'In tajtahid tanjah.', 'Jika kamu bersungguh-sungguh, kamu akan berhasil.'],
    ['مَنْ يَزْرَعْ يَحْصُدْ.', "Man yazra' yahshud.", 'Siapa yang menanam akan menuai.'],
    ['إِنْ جَاءَ الضَّيْفُ فَأَكْرِمْهُ.', "In ja'adh dhaifu fa akrimhu.", 'Jika tamu datang, muliakanlah dia.'],
    ['إِذَا دَرَسْتَ جَيِّدًا فَسَتَفْهَمُ الدَّرْسَ.', 'Idza darasta jayyidan fasatafhamud darsa.', 'Jika kamu belajar dengan baik, kamu akan memahami pelajaran.'],
  ]],
  [['Review nahwu-sharaf B1: kenali tanda i\'rab (rafa\', nashab, jar, jazm) dan pemicunya.', 'Latihan terbaik: i\'rab satu kalimat setiap hari dengan menyebut sebab harakat akhirnya.'], [
    ['لَنْ يُسَافِرَ الْوَفْدُ قَبْلَ الْغَدِ.', 'Lan yusafiral wafdu qablal ghadi.', 'Delegasi tidak akan berangkat sebelum besok.'],
    ['كَانَ الطُّلَّابُ حَاضِرِينَ مُبَكِّرًا.', 'Kanath thullabu hadhirina mubakkiran.', 'Para siswa telah hadir lebih awal.'],
    ['إِنَّ الْمُعَلِّمَةَ الَّتِي دَرَّسَتْنَا مَاهِرَةٌ.', "Innal mu'allimatal lati darrasatna mahiratun.", 'Sesungguhnya guru perempuan yang mengajar kami itu terampil.'],
    ['رَجَعَ الْحُجَّاجُ سَالِمِينَ إِلَى وَطَنِهِمْ.', "Raja'al hujjaju salimina ila wathanihim.", 'Para jamaah haji kembali ke tanah air mereka dengan selamat.'],
  ]],
];
