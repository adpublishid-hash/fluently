import type { PassageSource } from './types';

// Short reading/listening passages for Arabic Pemula and Elementary
// (level ids follow the study bank).
export const arabicFoundationPassages: PassageSource[] = [
  // ---------------------------------------------------------------- Pemula
  {
    id: 'ar-beginner-usrah', level: 'beginner', title: 'Keluargaku', native: 'أُسْرَتِي',
    sentences: [
      ['هٰذِهِ أُسْرَتِي.', 'Hadzihi usrati.', 'Ini keluargaku.'],
      ['هٰذَا أَبِي، هُوَ مُدَرِّسٌ.', 'Hadza abi, huwa mudarrisun.', 'Ini ayahku, dia seorang guru.'],
      ['وَهٰذِهِ أُمِّي، هِيَ طَبِيبَةٌ.', 'Wa hadzihi ummi, hiya thabibah.', 'Dan ini ibuku, dia seorang dokter.'],
      ['لِي أَخٌ وَاحِدٌ وَأُخْتٌ وَاحِدَةٌ.', 'Li akhun wahidun wa ukhtun wahidah.', 'Aku punya satu saudara laki-laki dan satu saudara perempuan.'],
      ['بَيْتُنَا صَغِيرٌ وَجَمِيلٌ.', 'Baituna shaghirun wa jamil.', 'Rumah kami kecil dan indah.'],
    ],
    glossary: [['أُسْرَةٌ', 'usratun', 'keluarga'], ['مُدَرِّسٌ', 'mudarrisun', 'guru'], ['طَبِيبَةٌ', 'thabibatun', 'dokter (perempuan)'], ['بَيْتٌ', 'baitun', 'rumah']],
    questions: [
      ['Apa pekerjaan ayah penulis?', 'Guru', ['Dokter', 'Pedagang', 'Sopir']],
      ['Apa pekerjaan ibu penulis?', 'Dokter', ['Guru', 'Perawat', 'Pedagang']],
      ['Bagaimana rumah mereka?', 'Kecil dan indah', ['Besar dan baru', 'Jauh dari kota', 'Tua dan gelap']],
    ],
  },
  {
    id: 'ar-beginner-madrasah', level: 'beginner', title: 'Di sekolah', native: 'فِي الْمَدْرَسَةِ',
    sentences: [
      ['أَنَا طَالِبٌ فِي مَدْرَسَةٍ كَبِيرَةٍ.', "Ana thalibun fi madrasatin kabirah.", 'Aku murid di sebuah sekolah besar.'],
      ['فِي الْفَصْلِ سَبُّورَةٌ وَمَكْتَبٌ.', 'Fil fashli sabburatun wa maktab.', 'Di kelas ada papan tulis dan meja.'],
      ['الْمُدَرِّسُ يَكْتُبُ عَلَى السَّبُّورَةِ.', "Al-mudarrisu yaktubu 'alas sabburah.", 'Guru menulis di papan tulis.'],
      ['نَحْنُ نَقْرَأُ الْكِتَابَ مَعًا.', "Nahnu naqra'ul kitaba ma'an.", 'Kami membaca buku bersama.'],
      ['صَدِيقِي أَحْمَدُ يَجْلِسُ بِجَانِبِي.', 'Shadiqi Ahmadu yajlisu bijanibi.', 'Temanku Ahmad duduk di sampingku.'],
    ],
    glossary: [['طَالِبٌ', 'thalibun', 'murid'], ['فَصْلٌ', 'fashlun', 'kelas'], ['سَبُّورَةٌ', 'sabburatun', 'papan tulis'], ['كِتَابٌ', 'kitabun', 'buku']],
    questions: [
      ['Di mana guru menulis?', 'Di papan tulis', ['Di buku', 'Di meja', 'Di dinding']],
      ['Apa yang ada di kelas?', 'Papan tulis dan meja', ['Komputer dan televisi', 'Lemari dan kasur', 'Hanya kursi']],
      ['Siapa yang duduk di samping penulis?', 'Ahmad', ['Guru', 'Adiknya', 'Fatimah']],
    ],
  },
  {
    id: 'ar-beginner-yaumi', level: 'beginner', title: 'Hariku', native: 'يَوْمِي',
    sentences: [
      ['أَسْتَيْقِظُ فِي السَّاعَةِ الْخَامِسَةِ صَبَاحًا.', "Astaiqizhu fis sa'atil khamisati shabahan.", 'Aku bangun jam lima pagi.'],
      ['أُصَلِّي الْفَجْرَ ثُمَّ أَشْرَبُ الشَّايَ.', 'Ushallil fajra tsumma asyrabusy syay.', 'Aku shalat subuh lalu minum teh.'],
      ['أَذْهَبُ إِلَى الْمَدْرَسَةِ بِالدَّرَّاجَةِ.', 'Adzhabu ilal madrasati bid darrajah.', 'Aku pergi ke sekolah naik sepeda.'],
      ['أَرْجِعُ إِلَى الْبَيْتِ فِي السَّاعَةِ الْوَاحِدَةِ.', "Arji'u ilal baiti fis sa'atil wahidah.", 'Aku pulang ke rumah jam satu.'],
      ['فِي اللَّيْلِ أُرَاجِعُ دُرُوسِي ثُمَّ أَنَامُ.', "Fil laili uraji'u durusi tsumma anam.", 'Malam hari aku mengulang pelajaran lalu tidur.'],
    ],
    glossary: [['أَسْتَيْقِظُ', 'astaiqizhu', 'aku bangun'], ['دَرَّاجَةٌ', 'darrajatun', 'sepeda'], ['أَرْجِعُ', "arji'u", 'aku pulang'], ['أَنَامُ', 'anamu', 'aku tidur']],
    questions: [
      ['Jam berapa penulis bangun?', 'Jam lima', ['Jam enam', 'Jam tujuh', 'Jam empat']],
      ['Naik apa penulis ke sekolah?', 'Sepeda', ['Mobil', 'Bus', 'Jalan kaki']],
      ['Apa yang dilakukan penulis malam hari?', 'Mengulang pelajaran lalu tidur', ['Menonton televisi', 'Bermain bola', 'Memasak']],
    ],
  },
  {
    id: 'ar-beginner-suq', level: 'beginner', title: 'Di pasar', native: 'فِي السُّوقِ',
    sentences: [
      ['ذَهَبْتُ مَعَ أُمِّي إِلَى السُّوقِ.', "Dzahabtu ma'a ummi ilas suq.", 'Aku pergi bersama ibu ke pasar.'],
      ['اشْتَرَيْنَا خُبْزًا وَحَلِيبًا وَتُفَّاحًا.', 'Isytaraina khubzan wa haliban wa tuffahan.', 'Kami membeli roti, susu, dan apel.'],
      ['قَالَتْ أُمِّي: بِكَمْ هٰذَا التُّفَّاحُ؟', 'Qalat ummi: bikam hadzat tuffah?', 'Ibu berkata: berapa harga apel ini?'],
      ['قَالَ الْبَائِعُ: بِعَشَرَةِ رِيَالَاتٍ.', "Qalal ba'i'u: bi'asyarati riyalat.", 'Penjual berkata: sepuluh riyal.'],
      ['رَجَعْنَا إِلَى الْبَيْتِ بِسَيَّارَةِ أُجْرَةٍ.', "Raja'na ilal baiti bisayyarati ujrah.", 'Kami pulang ke rumah naik taksi.'],
    ],
    glossary: [['سُوقٌ', 'suqun', 'pasar'], ['خُبْزٌ', 'khubzun', 'roti'], ['حَلِيبٌ', 'halibun', 'susu'], ['بَائِعٌ', "ba'i'un", 'penjual']],
    questions: [
      ['Apa yang mereka beli?', 'Roti, susu, dan apel', ['Nasi, ikan, dan sayur', 'Daging dan telur', 'Teh dan gula']],
      ['Berapa harga apelnya?', 'Sepuluh riyal', ['Lima riyal', 'Dua puluh riyal', 'Lima belas riyal']],
      ['Bagaimana mereka pulang?', 'Naik taksi', ['Jalan kaki', 'Naik bus', 'Naik sepeda']],
    ],
  },
  {
    id: 'ar-beginner-ghurfah', level: 'beginner', title: 'Kamarku', native: 'غُرْفَتِي',
    sentences: [
      ['هٰذِهِ غُرْفَتِي، هِيَ نَظِيفَةٌ.', 'Hadzihi ghurfati, hiya nazhifah.', 'Ini kamarku, kamarnya bersih.'],
      ['السَّرِيرُ بِجَانِبِ النَّافِذَةِ.', 'As-sariru bijanibin nafidzah.', 'Tempat tidur ada di samping jendela.'],
      ['عَلَى الْمَكْتَبِ حَاسُوبٌ وَقَلَمٌ.', "'Alal maktabi hasubun wa qalam.", 'Di atas meja ada komputer dan pena.'],
      ['الْمَلَابِسُ فِي الْخِزَانَةِ.', 'Al-malabisu fil khizanah.', 'Pakaian ada di lemari.'],
      ['أُحِبُّ غُرْفَتِي كَثِيرًا.', 'Uhibbu ghurfati katsiran.', 'Aku sangat menyukai kamarku.'],
    ],
    glossary: [['غُرْفَةٌ', 'ghurfatun', 'kamar'], ['سَرِيرٌ', 'sarirun', 'tempat tidur'], ['نَافِذَةٌ', 'nafidzatun', 'jendela'], ['خِزَانَةٌ', 'khizanatun', 'lemari']],
    questions: [
      ['Di mana tempat tidurnya?', 'Di samping jendela', ['Di bawah meja', 'Dekat pintu', 'Di tengah kamar']],
      ['Apa yang ada di atas meja?', 'Komputer dan pena', ['Buku dan tas', 'Lampu dan jam', 'Piring dan gelas']],
      ['Di mana pakaiannya?', 'Di lemari', ['Di tempat tidur', 'Di atas meja', 'Di lantai']],
    ],
  },
  {
    id: 'ar-beginner-thaam', level: 'beginner', title: 'Makanan kami', native: 'طَعَامُنَا',
    sentences: [
      ['أُحِبُّ الْأَرُزَّ وَالدَّجَاجَ.', 'Uhibbul aruzza wad dajaj.', 'Aku suka nasi dan ayam.'],
      ['أُخْتِي تُحِبُّ السَّمَكَ.', 'Ukhti tuhibbus samak.', 'Saudara perempuanku suka ikan.'],
      ['نَأْكُلُ الْغَدَاءَ مَعًا فِي الْبَيْتِ.', "Na'kulul ghada'a ma'an fil bait.", 'Kami makan siang bersama di rumah.'],
      ['بَعْدَ الْأَكْلِ نَشْرَبُ الْعَصِيرَ.', "Ba'dal akli nasyrabul 'ashir.", 'Setelah makan kami minum jus.'],
      ['الطَّعَامُ لَذِيذٌ، الْحَمْدُ لِلّٰهِ.', "Ath-tha'amu ladzidz, alhamdulillah.", 'Makanannya lezat, alhamdulillah.'],
    ],
    glossary: [['أَرُزٌّ', 'aruzzun', 'nasi'], ['دَجَاجٌ', 'dajajun', 'ayam'], ['سَمَكٌ', 'samakun', 'ikan'], ['عَصِيرٌ', "'ashirun", 'jus']],
    questions: [
      ['Apa yang disukai saudara perempuan penulis?', 'Ikan', ['Ayam', 'Nasi', 'Daging']],
      ['Di mana mereka makan siang?', 'Di rumah', ['Di restoran', 'Di sekolah', 'Di taman']],
      ['Apa yang mereka minum setelah makan?', 'Jus', ['Teh', 'Kopi', 'Susu']],
    ],
  },
  {
    id: 'ar-beginner-masjid', level: 'beginner', title: 'Ke masjid', native: 'إِلَى الْمَسْجِدِ',
    sentences: [
      ['يَوْمُ الْجُمُعَةِ يَوْمٌ مُبَارَكٌ.', "Yaumul jumu'ati yaumun mubarak.", 'Hari Jumat adalah hari yang diberkahi.'],
      ['أَذْهَبُ مَعَ أَبِي إِلَى الْمَسْجِدِ.', "Adzhabu ma'a abi ilal masjid.", 'Aku pergi bersama ayah ke masjid.'],
      ['الْمَسْجِدُ قَرِيبٌ مِنْ بَيْتِنَا.', 'Al-masjidu qaribun min baitina.', 'Masjid itu dekat dari rumah kami.'],
      ['نَسْمَعُ الْخُطْبَةَ ثُمَّ نُصَلِّي.', "Nasma'ul khuthbata tsumma nushalli.", 'Kami mendengarkan khutbah lalu shalat.'],
      ['بَعْدَ الصَّلَاةِ نُسَلِّمُ عَلَى الْجِيرَانِ.', "Ba'dash shalati nusallimu 'alal jiran.", 'Setelah shalat kami menyalami para tetangga.'],
    ],
    glossary: [['مُبَارَكٌ', 'mubarakun', 'diberkahi'], ['مَسْجِدٌ', 'masjidun', 'masjid'], ['خُطْبَةٌ', 'khuthbatun', 'khutbah'], ['جِيرَانٌ', 'jiranun', 'tetangga']],
    questions: [
      ['Dengan siapa penulis ke masjid?', 'Ayahnya', ['Ibunya', 'Kakaknya', 'Temannya']],
      ['Di mana letak masjidnya?', 'Dekat dari rumah', ['Jauh di kota', 'Di sekolah', 'Di pasar']],
      ['Apa yang mereka lakukan setelah shalat?', 'Menyalami tetangga', ['Makan siang', 'Tidur', 'Belajar']],
    ],
  },
  {
    id: 'ar-beginner-shadiq', level: 'beginner', title: 'Temanku', native: 'صَدِيقِي',
    sentences: [
      ['اسْمُ صَدِيقِي يُوسُفُ.', 'Ismu shadiqi Yusuf.', 'Nama temanku Yusuf.'],
      ['هُوَ مِنْ مِصْرَ، وَيَسْكُنُ فِي جَاكَرْتَا.', 'Huwa min Mishra, wa yaskunu fi Jakarta.', 'Dia dari Mesir dan tinggal di Jakarta.'],
      ['يُوسُفُ طَوِيلٌ وَنَشِيطٌ.', 'Yusufu thawilun wa nasyith.', 'Yusuf tinggi dan aktif.'],
      ['هُوَ يُحِبُّ كُرَةَ الْقَدَمِ.', 'Huwa yuhibbu kuratal qadam.', 'Dia suka sepak bola.'],
      ['نَلْعَبُ مَعًا يَوْمَ السَّبْتِ.', "Nal'abu ma'an yaumas sabt.", 'Kami bermain bersama pada hari Sabtu.'],
    ],
    glossary: [['صَدِيقٌ', 'shadiqun', 'teman'], ['يَسْكُنُ', 'yaskunu', 'tinggal'], ['طَوِيلٌ', 'thawilun', 'tinggi'], ['كُرَةُ الْقَدَمِ', 'kuratul qadam', 'sepak bola']],
    questions: [
      ['Dari negara mana Yusuf berasal?', 'Mesir', ['Arab Saudi', 'Indonesia', 'Maroko']],
      ['Apa yang disukai Yusuf?', 'Sepak bola', ['Membaca', 'Berenang', 'Memasak']],
      ['Kapan mereka bermain bersama?', 'Hari Sabtu', ['Hari Jumat', 'Hari Minggu', 'Hari Senin']],
    ],
  },
  // ---------------------------------------------------------------- Elementary
  {
    id: 'ar-elementary-bandung', level: 'elementary', title: 'Perjalanan ke Bandung', native: 'رِحْلَةٌ إِلَى بَانْدُونْج',
    sentences: [
      ['فِي الْعُطْلَةِ الْمَاضِيَةِ سَافَرْنَا إِلَى بَانْدُونْج.', "Fil 'uthlatil madhiyati safarna ila Bandung.", 'Pada liburan lalu kami bepergian ke Bandung.'],
      ['رَكِبْنَا الْقِطَارَ مِنْ جَاكَرْتَا، وَكَانَتِ الرِّحْلَةُ ثَلَاثَ سَاعَاتٍ.', "Rakibnal qithara min Jakarta, wa kanatir rihlatu tsalatsa sa'at.", 'Kami naik kereta dari Jakarta, dan perjalanannya tiga jam.'],
      ['الْجَوُّ فِي بَانْدُونْج بَارِدٌ وَجَمِيلٌ.', 'Al-jawwu fi Bandung baridun wa jamil.', 'Cuaca di Bandung sejuk dan indah.'],
      ['زُرْنَا مَزْرَعَةَ الشَّايِ وَالْبُحَيْرَةَ.', "Zurna mazra'atasy syayi wal buhairah.", 'Kami mengunjungi kebun teh dan danau.'],
      ['أَكَلْنَا طَعَامًا سُونْدَاوِيًّا لَذِيذًا.', "Akalna tha'aman sundawiyyan ladzidzan.", 'Kami makan masakan Sunda yang lezat.'],
      ['رَجَعْنَا مَسْرُورِينَ بَعْدَ ثَلَاثَةِ أَيَّامٍ.', "Raja'na masrurina ba'da tsalatsati ayyam.", 'Kami pulang dengan gembira setelah tiga hari.'],
    ],
    glossary: [['عُطْلَةٌ', "'uthlatun", 'liburan'], ['قِطَارٌ', 'qitharun', 'kereta'], ['مَزْرَعَةٌ', "mazra'atun", 'kebun/ladang'], ['بُحَيْرَةٌ', 'buhairatun', 'danau']],
    questions: [
      ['Naik apa mereka ke Bandung?', 'Kereta', ['Pesawat', 'Bus', 'Mobil']],
      ['Bagaimana cuaca di Bandung?', 'Sejuk dan indah', ['Panas', 'Hujan terus', 'Berangin kencang']],
      ['Berapa lama mereka di sana?', 'Tiga hari', ['Seminggu', 'Dua hari', 'Sehari']],
    ],
  },
  {
    id: 'ar-elementary-thabib', level: 'elementary', title: 'Di dokter', native: 'عِنْدَ الطَّبِيبِ',
    sentences: [
      ['أَمْسِ شَعَرْتُ بِأَلَمٍ فِي رَأْسِي وَبَطْنِي.', "Amsi sya'artu bi-alamin fi ra'si wa bathni.", 'Kemarin aku merasa sakit di kepala dan perut.'],
      ['ذَهَبْتُ إِلَى الطَّبِيبِ فِي الْمَسَاءِ.', "Dzahabtu ilath thabibi fil masa'.", 'Aku pergi ke dokter pada sore hari.'],
      ['سَأَلَنِي الطَّبِيبُ: مَاذَا أَكَلْتَ الْيَوْمَ؟', "Sa'alanith thabibu: madza akaltal yaum?", 'Dokter bertanya kepadaku: apa yang kamu makan hari ini?'],
      ['قُلْتُ: أَكَلْتُ طَعَامًا حَارًّا جِدًّا.', "Qultu: akaltu tha'aman harran jiddan.", 'Aku menjawab: aku makan makanan yang sangat pedas.'],
      ['أَعْطَانِي الطَّبِيبُ دَوَاءً وَقَالَ: اشْرَبْ مَاءً كَثِيرًا.', "A'thanith thabibu dawa'an wa qal: isyrab ma'an katsiran.", 'Dokter memberiku obat dan berkata: minumlah banyak air.'],
      ['الْيَوْمَ أَنَا بِخَيْرٍ، الْحَمْدُ لِلّٰهِ.', 'Al-yauma ana bikhair, alhamdulillah.', 'Hari ini aku baik-baik saja, alhamdulillah.'],
    ],
    glossary: [['أَلَمٌ', 'alamun', 'rasa sakit'], ['بَطْنٌ', 'bathnun', 'perut'], ['حَارٌّ', 'harrun', 'pedas/panas'], ['دَوَاءٌ', "dawa'un", 'obat']],
    questions: [
      ['Di mana penulis merasa sakit?', 'Di kepala dan perut', ['Di gigi', 'Di kaki dan tangan', 'Di punggung']],
      ['Apa penyebab sakitnya?', 'Makanan yang sangat pedas', ['Kurang tidur', 'Kehujanan', 'Terlalu lelah']],
      ['Apa nasihat dokter?', 'Minum banyak air', ['Tidur seharian', 'Jangan makan', 'Berolahraga']],
    ],
  },
  {
    id: 'ar-elementary-ramadhan', level: 'elementary', title: 'Ramadan di rumah kami', native: 'رَمَضَانُ فِي بَيْتِنَا',
    sentences: [
      ['فِي رَمَضَانَ نَسْتَيْقِظُ قَبْلَ الْفَجْرِ لِلسَّحُورِ.', 'Fi Ramadhana nastaiqizhu qablal fajri lis sahur.', 'Di bulan Ramadan kami bangun sebelum subuh untuk sahur.'],
      ['نَصُومُ مِنَ الْفَجْرِ إِلَى الْمَغْرِبِ.', 'Nashumu minal fajri ilal maghrib.', 'Kami berpuasa dari subuh sampai magrib.'],
      ['تُحَضِّرُ أُمِّي طَعَامَ الْإِفْطَارِ مَعَ أُخْتِي.', "Tuhadhdhiru ummi tha'amal ifthari ma'a ukhti.", 'Ibu menyiapkan makanan berbuka bersama saudara perempuanku.'],
      ['نُفْطِرُ عَلَى التَّمْرِ وَالْمَاءِ أَوَّلًا.', "Nufthiru 'alat tamri wal ma'i awwalan.", 'Kami berbuka dengan kurma dan air terlebih dahulu.'],
      ['بَعْدَ الْعِشَاءِ نُصَلِّي التَّرَاوِيحَ فِي الْمَسْجِدِ.', "Ba'dal 'isya'i nushallit tarawiha fil masjid.", 'Setelah isya kami shalat tarawih di masjid.'],
      ['رَمَضَانُ شَهْرُ الصَّبْرِ وَالْخَيْرِ.', 'Ramadhanu syahrush shabri wal khair.', 'Ramadan adalah bulan kesabaran dan kebaikan.'],
    ],
    glossary: [['سَحُورٌ', 'sahurun', 'sahur'], ['نَصُومُ', 'nashumu', 'kami berpuasa'], ['إِفْطَارٌ', 'ifthar', 'berbuka puasa'], ['تَمْرٌ', 'tamrun', 'kurma']],
    questions: [
      ['Kapan mereka makan sahur?', 'Sebelum subuh', ['Setelah subuh', 'Tengah malam', 'Setelah isya']],
      ['Dengan apa mereka berbuka pertama kali?', 'Kurma dan air', ['Teh manis', 'Kue', 'Nasi']],
      ['Di mana mereka shalat tarawih?', 'Di masjid', ['Di rumah', 'Di sekolah', 'Di lapangan']],
    ],
  },
  {
    id: 'ar-elementary-maktabah', level: 'elementary', title: 'Di perpustakaan', native: 'فِي الْمَكْتَبَةِ',
    sentences: [
      ['ذَهَبْتُ إِلَى مَكْتَبَةِ الْجَامِعَةِ بَعْدَ الظُّهْرِ.', "Dzahabtu ila maktabatil jami'ati ba'dazh zhuhr.", 'Aku pergi ke perpustakaan kampus setelah zuhur.'],
      ['الْمَكْتَبَةُ هَادِئَةٌ وَفِيهَا كُتُبٌ كَثِيرَةٌ.', "Al-maktabatu hadi'atun wa fiha kutubun katsirah.", 'Perpustakaannya tenang dan bukunya banyak.'],
      ['بَحَثْتُ عَنْ كِتَابٍ فِي تَارِيخِ الْإِسْلَامِ.', "Bahatstu 'an kitabin fi tarikhil islam.", 'Aku mencari buku tentang sejarah Islam.'],
      ['سَاعَدَتْنِي الْمُوَظَّفَةُ فِي الْبَحْثِ.', "Sa'adatnil muwazhzhafatu fil bahts.", 'Petugas perempuan membantuku mencarinya.'],
      ['اسْتَعَرْتُ الْكِتَابَ لِمُدَّةِ أُسْبُوعَيْنِ.', "Ista'artul kitaba limuddati usbu'ain.", 'Aku meminjam buku itu selama dua minggu.'],
      ['سَأَقْرَأُ فَصْلًا كُلَّ يَوْمٍ.', "Sa-aqra'u fashlan kulla yaum.", 'Aku akan membaca satu bab setiap hari.'],
    ],
    glossary: [['مَكْتَبَةٌ', 'maktabatun', 'perpustakaan'], ['هَادِئٌ', "hadi'un", 'tenang'], ['اسْتَعَرْتُ', "ista'artu", 'aku meminjam'], ['فَصْلٌ', 'fashlun', 'bab']],
    questions: [
      ['Buku apa yang dicari penulis?', 'Sejarah Islam', ['Bahasa Inggris', 'Matematika', 'Novel']],
      ['Siapa yang membantu penulis?', 'Petugas perempuan', ['Temannya', 'Dosennya', 'Ayahnya']],
      ['Berapa lama buku itu dipinjam?', 'Dua minggu', ['Seminggu', 'Sebulan', 'Tiga hari']],
    ],
  },
  {
    id: 'ar-elementary-hiwayah', level: 'elementary', title: 'Hobiku', native: 'هِوَايَتِي',
    sentences: [
      ['هِوَايَتِي الْمُفَضَّلَةُ هِيَ الرَّسْمُ.', 'Hiwayatil mufadhdhalatu hiyar rasm.', 'Hobi favoritku adalah menggambar.'],
      ['بَدَأْتُ الرَّسْمَ عِنْدَمَا كُنْتُ صَغِيرًا.', "Bada'tur rasma 'indama kuntu shaghiran.", 'Aku mulai menggambar ketika masih kecil.'],
      ['أَرْسُمُ الْجِبَالَ وَالْأَشْجَارَ وَالْبَحْرَ.', 'Arsumul jibala wal asyjara wal bahr.', 'Aku menggambar gunung, pohon, dan laut.'],
      ['فِي الشَّهْرِ الْمَاضِي شَارَكْتُ فِي مُسَابَقَةٍ لِلرَّسْمِ.', 'Fisy syahril madhi syaraktu fi musabaqatin lir rasm.', 'Bulan lalu aku ikut lomba menggambar.'],
      ['حَصَلْتُ عَلَى الْمَرْكَزِ الثَّانِي.', "Hashaltu 'alal markazits tsani.", 'Aku meraih juara kedua.'],
      ['أُرِيدُ أَنْ أَدْرُسَ الْفَنَّ فِي الْجَامِعَةِ.', "Uridu an adrusal fanna fil jami'ah.", 'Aku ingin belajar seni di universitas.'],
    ],
    glossary: [['هِوَايَةٌ', 'hiwayatun', 'hobi'], ['رَسْمٌ', 'rasmun', 'menggambar'], ['مُسَابَقَةٌ', 'musabaqatun', 'lomba'], ['فَنٌّ', 'fannun', 'seni']],
    questions: [
      ['Apa hobi penulis?', 'Menggambar', ['Menyanyi', 'Membaca', 'Berenang']],
      ['Juara berapa penulis di lomba itu?', 'Kedua', ['Pertama', 'Ketiga', 'Harapan']],
      ['Apa rencana penulis?', 'Belajar seni di universitas', ['Menjadi guru', 'Membuka toko', 'Bekerja di luar negeri']],
    ],
  },
  {
    id: 'ar-elementary-fushul', level: 'elementary', title: 'Musim di Indonesia', native: 'الْفُصُولُ فِي إِنْدُونِيسِيَا',
    sentences: [
      ['فِي إِنْدُونِيسِيَا فَصْلَانِ: فَصْلُ الْمَطَرِ وَفَصْلُ الْجَفَافِ.', 'Fi Indunisiya fashlani: fashlul mathari wa fashlul jafaf.', 'Di Indonesia ada dua musim: musim hujan dan musim kemarau.'],
      ['يَبْدَأُ فَصْلُ الْمَطَرِ عَادَةً فِي شَهْرِ نُوفَمْبِرَ.', "Yabda'u fashlul mathari 'adatan fi syahri Nufambir.", 'Musim hujan biasanya mulai pada bulan November.'],
      ['فِي هٰذَا الْفَصْلِ يَنْزِلُ الْمَطَرُ كُلَّ يَوْمٍ تَقْرِيبًا.', 'Fi hadzal fashli yanzilul matharu kulla yaumin taqriban.', 'Pada musim ini hujan turun hampir setiap hari.'],
      ['وَأَحْيَانًا تَحْدُثُ فَيَضَانَاتٌ فِي الْمُدُنِ.', 'Wa ahyanan tahdutsu fayadhanatun fil mudun.', 'Terkadang terjadi banjir di kota-kota.'],
      ['أَمَّا فَصْلُ الْجَفَافِ فَالْجَوُّ فِيهِ حَارٌّ وَمُشْمِسٌ.', 'Amma fashlul jafafi fal jawwu fihi harrun wa musymis.', 'Adapun musim kemarau, cuacanya panas dan cerah.'],
      ['أَنَا أُفَضِّلُ فَصْلَ الْمَطَرِ لِأَنَّهُ بَارِدٌ.', 'Ana ufadhdhilu fashlal mathari li-annahu barid.', 'Aku lebih suka musim hujan karena udaranya sejuk.'],
    ],
    glossary: [['فَصْلٌ', 'fashlun', 'musim'], ['مَطَرٌ', 'matharun', 'hujan'], ['جَفَافٌ', 'jafafun', 'kemarau'], ['فَيَضَانٌ', 'fayadhanun', 'banjir']],
    questions: [
      ['Kapan musim hujan biasanya mulai?', 'November', ['Januari', 'Mei', 'Agustus']],
      ['Apa yang kadang terjadi di kota-kota?', 'Banjir', ['Gempa bumi', 'Kebakaran hutan', 'Salju']],
      ['Musim apa yang disukai penulis?', 'Musim hujan karena sejuk', ['Musim kemarau karena cerah', 'Musim kemarau karena libur', 'Musim hujan karena banjir']],
    ],
  },
  {
    id: 'ar-elementary-risalah', level: 'elementary', title: 'Surat untuk teman', native: 'رِسَالَةٌ إِلَى صَدِيقٍ',
    sentences: [
      ['عَزِيزِي خَالِدٌ، السَّلَامُ عَلَيْكُمْ.', "'Azizi Khalid, assalamu 'alaikum.", 'Khalid yang baik, assalamu alaikum.'],
      ['كَيْفَ حَالُكَ وَحَالُ أُسْرَتِكَ؟', 'Kaifa haluka wa halu usratik?', 'Bagaimana kabarmu dan kabar keluargamu?'],
      ['أَنَا الْآنَ أَدْرُسُ اللُّغَةَ الْعَرَبِيَّةَ فِي مَعْهَدٍ بِالْقَاهِرَةِ.', "Anal ana adrusul lughatal 'arabiyyata fi ma'hadin bil Qahirah.", 'Sekarang aku belajar bahasa Arab di sebuah lembaga di Kairo.'],
      ['الدِّرَاسَةُ صَعْبَةٌ قَلِيلًا، وَلٰكِنَّهَا مُمْتِعَةٌ.', "Ad-dirasatu sha'batun qalilan, wa lakinnaha mumti'ah.", 'Belajarnya agak sulit, tetapi menyenangkan.'],
      ['سَأَرْجِعُ إِلَى إِنْدُونِيسِيَا فِي الصَّيْفِ الْقَادِمِ.', "Sa-arji'u ila Indunisiya fish shaifil qadim.", 'Aku akan pulang ke Indonesia pada musim panas mendatang.'],
      ['أَرْجُو أَنْ نَلْتَقِيَ قَرِيبًا. مَعَ السَّلَامَةِ.', "Arju an naltaqiya qariban. Ma'as salamah.", 'Semoga kita segera bertemu. Salam.'],
    ],
    glossary: [['عَزِيزِي', "'azizi", 'yang kusayangi'], ['مَعْهَدٌ', "ma'hadun", 'lembaga pendidikan'], ['مُمْتِعٌ', "mumti'un", 'menyenangkan'], ['نَلْتَقِي', 'naltaqi', 'kita bertemu']],
    questions: [
      ['Di kota mana penulis belajar?', 'Kairo', ['Madinah', 'Jakarta', 'Amman']],
      ['Bagaimana belajarnya menurut penulis?', 'Agak sulit tetapi menyenangkan', ['Sangat mudah', 'Membosankan', 'Terlalu sulit']],
      ['Kapan penulis pulang ke Indonesia?', 'Musim panas mendatang', ['Bulan depan', 'Akhir tahun ini', 'Minggu depan']],
    ],
  },
  {
    id: 'ar-elementary-mathbakh', level: 'elementary', title: 'Di dapur', native: 'فِي الْمَطْبَخِ',
    sentences: [
      ['يَوْمَ الْأَحَدِ طَبَخْتُ مَعَ جَدَّتِي.', "Yaumal ahadi thabakhtu ma'a jaddati.", 'Hari Minggu aku memasak bersama nenek.'],
      ['طَبَخْنَا الْأَرُزَّ الْمَقْلِيَّ بِالدَّجَاجِ.', 'Thabakhnal aruzzal maqliyya bid dajaj.', 'Kami memasak nasi goreng ayam.'],
      ['قَطَعْتُ الْبَصَلَ وَالطَّمَاطِمَ بِالسِّكِّينِ.', "Qatha'tul bashala wath thamathima bis sikkin.", 'Aku memotong bawang dan tomat dengan pisau.'],
      ['وَضَعَتْ جَدَّتِي قَلِيلًا مِنَ الْمِلْحِ وَالْفُلْفُلِ.', "Wadha'at jaddati qalilan minal milhi wal fulful.", 'Nenek menaruh sedikit garam dan merica.'],
      ['بَعْدَ عِشْرِينَ دَقِيقَةً كَانَ الطَّعَامُ جَاهِزًا.', "Ba'da 'isyrina daqiqatan kanath tha'amu jahizan.", 'Setelah dua puluh menit makanannya siap.'],
      ['أَكَلَتِ الْأُسْرَةُ كُلُّهَا وَقَالُوا: لَذِيذٌ جِدًّا!', 'Akalatil usratu kulluha wa qalu: ladzidzun jiddan!', 'Seluruh keluarga makan dan berkata: lezat sekali!'],
    ],
    glossary: [['طَبَخَ', 'thabakha', 'memasak'], ['بَصَلٌ', 'bashalun', 'bawang'], ['سِكِّينٌ', 'sikkinun', 'pisau'], ['مِلْحٌ', 'milhun', 'garam']],
    questions: [
      ['Dengan siapa penulis memasak?', 'Nenek', ['Ibu', 'Kakak', 'Teman']],
      ['Apa yang mereka masak?', 'Nasi goreng ayam', ['Sup ikan', 'Mi goreng', 'Sate']],
      ['Berapa lama memasaknya?', 'Dua puluh menit', ['Sepuluh menit', 'Satu jam', 'Setengah jam']],
    ],
  },
];
