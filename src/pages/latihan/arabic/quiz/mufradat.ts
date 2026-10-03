import type { QuizTopic } from './types';

// Latihan Mufradat — one entry per topic (index = topic - 1): [Basic, Intermediate, Advanced].
export const mufradat: QuizTopic[] = [
  // 1. Salam
  [
    [
      ["مَرْحَبًا", "Marhaban", "halo / selamat datang"],
      ["صَبَاحُ الْخَيْرِ", "Shabahul khairi", "selamat pagi", ["Jawaban yang tepat untuk صَبَاحُ الْخَيْرِ adalah...", "صَبَاحُ النُّورِ", "مَسَاءُ الْخَيْرِ", "مَعَ السَّلَامَةِ", "أَهْلًا وَسَهْلًا"]],
      ["مَسَاءُ الْخَيْرِ", "Masa'ul khairi", "selamat sore / malam"],
      ["مَعَ السَّلَامَةِ", "Ma'as salamati", "selamat jalan"],
    ],
    [
      ["وَعَلَيْكُمُ السَّلَامُ وَرَحْمَةُ اللهِ.", "Wa 'alaikumus salamu wa rahmatullahi.", "Dan semoga keselamatan dan rahmat Allah atasmu juga."],
      ["أَهْلًا وَسَهْلًا بِكَ فِي بَيْتِنَا.", "Ahlan wa sahlan bika fi baitina.", "Selamat datang di rumah kami."],
      ["إِلَى اللِّقَاءِ يَا صَدِيقِي.", "Ilal liqa'i ya shadiqi.", "Sampai jumpa, wahai temanku."],
      ["تُصْبِحُ عَلَى خَيْرٍ.", "Tushbihu 'ala khairin.", "Selamat tidur (semoga pagimu baik)."],
    ],
    [
      ["السَّلَامُ عَلَيْكُمْ، كَيْفَ حَالُكَ الْيَوْمَ؟", "Assalamu 'alaikum, kaifa haluka al-yauma?", "Assalamualaikum, bagaimana kabarmu hari ini?"],
      ["صَبَاحُ النُّورِ، أَنَا بِخَيْرٍ وَالْحَمْدُ لِلّٰهِ.", "Shabahun nuri, ana bikhairin wal hamdu lillahi.", "Selamat pagi juga, saya baik, alhamdulillah."],
      ["تَشَرَّفْتُ بِمَعْرِفَتِكَ يَا أُسْتَاذُ.", "Tasyarraftu bima'rifatika ya ustadzu.", "Saya merasa terhormat mengenal Anda, Pak Guru.", ["Ungkapan تَشَرَّفْتُ بِمَعْرِفَتِكَ dipakai saat...", "baru berkenalan", "berpamitan pulang", "meminta maaf", "memesan makanan"]],
      ["فِي أَمَانِ اللهِ، نَلْتَقِي غَدًا إِنْ شَاءَ اللهُ.", "Fi amanillahi, naltaqi ghadan in sya'allahu.", "Dalam lindungan Allah, kita bertemu besok insya Allah."],
    ],
  ],
  // 2. Keluarga
  [
    [
      ["أَبٌ", "Abun", "ayah"],
      ["أُمٌّ", "Ummun", "ibu"],
      ["أَخٌ", "Akhun", "saudara laki-laki", ["Bentuk jamak dari أَخٌ adalah...", "إِخْوَةٌ", "أَخَوَاتٌ", "أَخَانِ", "أَخِيرٌ"]],
      ["أُخْتٌ", "Ukhtun", "saudara perempuan"],
    ],
    [
      ["أَبِي يَعْمَلُ فِي الْمُسْتَشْفَى.", "Abi ya'malu fil mustasyfa.", "Ayahku bekerja di rumah sakit."],
      ["جَدَّتِي تَسْكُنُ فِي الْقَرْيَةِ.", "Jaddati taskunu fil qaryati.", "Nenekku tinggal di desa."],
      ["عِنْدِي أَخٌ وَاحِدٌ وَأُخْتَانِ.", "'Indi akhun wahidun wa ukhtani.", "Saya punya satu saudara laki-laki dan dua saudara perempuan."],
      ["عَمِّي مُدَرِّسٌ فِي الْمَدْرَسَةِ.", "'Ammi mudarrisun fil madrasati.", "Paman (dari ayah) saya guru di sekolah.", ["عَمٌّ adalah paman dari pihak...", "ayah", "ibu", "istri", "kakek"]],
    ],
    [
      ["أُسْرَتِي صَغِيرَةٌ، فِيهَا أَرْبَعَةُ أَشْخَاصٍ.", "Usrati shaghiratun, fiha arba'atu asykhashin.", "Keluargaku kecil, ada empat orang di dalamnya."],
      ["خَالِي يَزُورُنَا كُلَّ يَوْمِ جُمُعَةٍ.", "Khali yazuruna kulla yaumi jumu'atin.", "Pamanku (dari ibu) mengunjungi kami setiap hari Jumat."],
      ["يُحِبُّ جَدِّي أَنْ يَحْكِيَ لَنَا الْقِصَصَ.", "Yuhibbu jaddi an yahkiya lanal qishasha.", "Kakekku suka menceritakan kisah kepada kami."],
      ["ابْنُ عَمِّي يَدْرُسُ فِي الْقَاهِرَةِ.", "Ibnu 'ammi yadrusu fil qahirati.", "Sepupuku belajar di Kairo."],
    ],
  ],
  // 3. Kelas
  [
    [
      ["سَبُّورَةٌ", "Sabburatun", "papan tulis"],
      ["كُرْسِيٌّ", "Kursiyyun", "kursi", ["Bentuk jamak dari كُرْسِيٌّ adalah...", "كَرَاسِيُّ", "كُرْسِيَّاتٌ", "أَكْرَاسٌ", "كُرُوسٌ"]],
      ["مِمْحَاةٌ", "Mimhatun", "penghapus"],
      ["دَفْتَرٌ", "Daftarun", "buku tulis"],
    ],
    [
      ["الْمُدَرِّسُ يَكْتُبُ عَلَى السَّبُّورَةِ.", "Al-mudarrisu yaktubu 'alas sabburati.", "Guru menulis di papan tulis."],
      ["الْحَقِيبَةُ تَحْتَ الطَّاوِلَةِ.", "Al-haqibatu tahtath thawilati.", "Tas ada di bawah meja."],
      ["فِي الْفَصْلِ ثَلَاثُونَ طَالِبًا.", "Fil fashli tsalatsuna thaliban.", "Di kelas ada tiga puluh siswa."],
      ["أَيْنَ الْمِسْطَرَةُ يَا أَحْمَدُ؟", "Ainal mistharatu ya Ahmadu?", "Di mana penggaris, wahai Ahmad?"],
    ],
    [
      ["افْتَحُوا الْكُتُبَ عَلَى الصَّفْحَةِ الْعَاشِرَةِ.", "Iftahul kutuba 'alash shafhatil 'asyirati.", "Bukalah buku pada halaman kesepuluh."],
      ["نَسِيتُ قَلَمِي فِي الْبَيْتِ، هَلْ عِنْدَكَ قَلَمٌ؟", "Nasitu qalami fil baiti, hal 'indaka qalamun?", "Penaku tertinggal di rumah, apakah kamu punya pena?"],
      ["يَجْلِسُ الطُّلَّابُ عَلَى الْكَرَاسِيِّ بِهُدُوءٍ.", "Yajlisuth thullabu 'alal karasiyyi bihudu'in.", "Para siswa duduk di kursi dengan tenang."],
      ["الْمَكْتَبَةُ بِجَانِبِ الْفَصْلِ الْكَبِيرِ.", "Al-maktabatu bijanibil fashlil kabiri.", "Perpustakaan ada di samping kelas besar."],
    ],
  ],
  // 4. Rumah
  [
    [
      ["غُرْفَةٌ", "Ghurfatun", "kamar"],
      ["مَطْبَخٌ", "Mathbakhun", "dapur"],
      ["حَمَّامٌ", "Hammamun", "kamar mandi"],
      ["نَافِذَةٌ", "Nafidzatun", "jendela", ["Bentuk jamak dari نَافِذَةٌ adalah...", "نَوَافِذُ", "نَافِذَاتٌ", "نُفُوذٌ", "أَنْفَاذٌ"]],
    ],
    [
      ["بَيْتُنَا فِيهِ ثَلَاثُ غُرَفٍ.", "Baituna fihi tsalatsu ghurafin.", "Rumah kami punya tiga kamar."],
      ["أُمِّي تَطْبُخُ فِي الْمَطْبَخِ.", "Ummi tathbukhu fil mathbakhi.", "Ibuku memasak di dapur."],
      ["السَّرِيرُ فِي غُرْفَةِ النَّوْمِ.", "As-sariru fi ghurfatin naumi.", "Tempat tidur ada di kamar tidur."],
      ["الْحَدِيقَةُ أَمَامَ الْبَيْتِ.", "Al-hadiqatu amamal baiti.", "Taman ada di depan rumah."],
    ],
    [
      ["نَجْلِسُ فِي غُرْفَةِ الْجُلُوسِ بَعْدَ الْعَشَاءِ.", "Najlisu fi ghurfatil julusi ba'dal 'asya'i.", "Kami duduk di ruang keluarga setelah makan malam."],
      ["الثَّلَّاجَةُ فِي الْمَطْبَخِ بِجَانِبِ الْبَابِ.", "Ats-tsallajatu fil mathbakhi bijanibil babi.", "Kulkas ada di dapur di samping pintu."],
      ["أَفْتَحُ النَّافِذَةَ كُلَّ صَبَاحٍ لِيَدْخُلَ الْهَوَاءُ.", "Aftahun nafidzata kulla shabahin liyadkhulal hawa'u.", "Saya membuka jendela setiap pagi agar udara masuk."],
      ["بَيْتُ جَدِّي كَبِيرٌ وَلَهُ حَدِيقَةٌ وَاسِعَةٌ.", "Baitu jaddi kabirun wa lahu hadiqatun wasi'atun.", "Rumah kakekku besar dan punya taman yang luas."],
    ],
  ],
  // 5. Angka 1-20
  [
    [
      ["خَمْسَةٌ", "Khamsatun", "lima"],
      ["ثَمَانِيَةٌ", "Tsamaniyatun", "delapan"],
      ["أَحَدَ عَشَرَ", "Ahada 'asyara", "sebelas"],
      ["عِشْرُونَ", "'Isyruna", "dua puluh", ["Angka عِشْرُونَ sama dengan...", "20", "12", "30", "2"]],
    ],
    [
      ["عِنْدِي ثَلَاثَةُ كُتُبٍ.", "'Indi tsalatsatu kutubin.", "Saya punya tiga buku."],
      ["فِي الْأُسْبُوعِ سَبْعَةُ أَيَّامٍ.", "Fil usbu'i sab'atu ayyamin.", "Dalam seminggu ada tujuh hari."],
      ["عُمْرُ أُخْتِي تِسْعُ سَنَوَاتٍ.", "'Umru ukhti tis'u sanawatin.", "Umur adikku sembilan tahun."],
      ["اشْتَرَيْتُ خَمْسَ بُرْتُقَالَاتٍ.", "Isytaraitu khamsa burtuqalatin.", "Saya membeli lima jeruk.", ["Mengapa خَمْسَ tanpa ة dalam خَمْسَ بُرْتُقَالَاتٍ?", "karena benda yang dihitung muannats", "karena benda yang dihitung mudzakkar", "karena angkanya lebih dari sepuluh", "karena kalimatnya pertanyaan"]],
    ],
    [
      ["فِي فَصْلِنَا خَمْسَةَ عَشَرَ طَالِبًا وَعَشْرُ طَالِبَاتٍ.", "Fi fashlina khamsata 'asyara thaliban wa 'asyru thalibatin.", "Di kelas kami ada lima belas siswa dan sepuluh siswi."],
      ["قَرَأْتُ اثْنَيْ عَشَرَ كِتَابًا هٰذِهِ السَّنَةَ.", "Qara'tutsnai 'asyara kitaban hadzihis sanata.", "Saya membaca dua belas buku tahun ini."],
      ["يَبْدَأُ الدَّرْسُ بَعْدَ عَشْرِ دَقَائِقَ.", "Yabda'ud darsu ba'da 'asyri daqa'iqa.", "Pelajaran dimulai sepuluh menit lagi."],
      ["ثَمَنُ الْكِتَابِ سَبْعَةَ عَشَرَ رِيَالًا.", "Tsamanul kitabi sab'ata 'asyara riyalan.", "Harga buku itu tujuh belas riyal."],
    ],
  ],
  // 6. Warna
  [
    [
      ["أَحْمَرُ", "Ahmaru", "merah", ["Bentuk muannats dari أَحْمَرُ adalah...", "حَمْرَاءُ", "أَحْمَرَةٌ", "حَمِيرَةٌ", "مُحْمَرَّةٌ"]],
      ["أَزْرَقُ", "Azraqu", "biru"],
      ["أَخْضَرُ", "Akhdharu", "hijau"],
      ["أَصْفَرُ", "Ashfaru", "kuning"],
    ],
    [
      ["السَّمَاءُ زَرْقَاءُ الْيَوْمَ.", "As-sama'u zarqa'ul yauma.", "Langit biru hari ini."],
      ["لَوْنُ سَيَّارَتِي أَبْيَضُ.", "Launu sayyarati abyadhu.", "Warna mobilku putih."],
      ["أَلْبَسُ قَمِيصًا أَسْوَدَ.", "Albasu qamishan aswada.", "Saya memakai kemeja hitam."],
      ["الْمَوْزَةُ صَفْرَاءُ.", "Al-mauzatu shafra'u.", "Pisang itu kuning."],
    ],
    [
      ["مَا لَوْنُكَ الْمُفَضَّلُ؟ لَوْنِي الْمُفَضَّلُ أَخْضَرُ.", "Ma launukal mufadhdhalu? Launiyal mufadhdhalu akhdharu.", "Apa warna favoritmu? Warna favoritku hijau."],
      ["الْعَلَمُ الْإِنْدُونِيسِيُّ أَحْمَرُ وَأَبْيَضُ.", "Al-'alamul indunisiyyu ahmaru wa abyadhu.", "Bendera Indonesia merah dan putih."],
      ["اشْتَرَتْ أُمِّي فُسْتَانًا بُنِّيًّا جَمِيلًا.", "Isytarat ummi fustanan bunniyyan jamilan.", "Ibuku membeli gaun cokelat yang indah."],
      ["تَتَحَوَّلُ أَوْرَاقُ الشَّجَرِ إِلَى اللَّوْنِ الْبُرْتُقَالِيِّ فِي الْخَرِيفِ.", "Tatahawwalu auraqusy syajari ilal launil burtuqaliyyi fil kharifi.", "Daun-daun pohon berubah menjadi jingga di musim gugur."],
    ],
  ],
  // 7. Makanan
  [
    [
      ["خُبْزٌ", "Khubzun", "roti"],
      ["أَرُزٌّ", "Aruzzun", "nasi / beras"],
      ["لَحْمٌ", "Lahmun", "daging"],
      ["سَمَكٌ", "Samakun", "ikan"],
    ],
    [
      ["آكُلُ الْأَرُزَّ مَعَ الدَّجَاجِ.", "Akulul aruzza ma'ad dajaji.", "Saya makan nasi dengan ayam."],
      ["هٰذَا الطَّعَامُ لَذِيذٌ جِدًّا.", "Hadzath tha'amu ladzidzun jiddan.", "Makanan ini sangat lezat.", ["Lawan kata لَذِيذٌ (lezat) dalam konteks makanan adalah...", "غَيْرُ لَذِيذٍ", "كَبِيرٌ", "جَدِيدٌ", "سَرِيعٌ"]],
      ["نَأْكُلُ الْفُطُورَ فِي السَّاعَةِ السَّادِسَةِ.", "Na'kulul futhura fis sa'atis sadisati.", "Kami sarapan pada jam enam."],
      ["أُحِبُّ الْبَيْضَ الْمَسْلُوقَ.", "Uhibbul baidhal masluqa.", "Saya suka telur rebus."],
    ],
    [
      ["طَبَخَتْ أُمِّي السَّمَكَ الْمَشْوِيَّ لِلْغَدَاءِ.", "Thabakhat ummis samakal masywiyya lil ghada'i.", "Ibuku memasak ikan bakar untuk makan siang."],
      ["لَا آكُلُ اللَّحْمَ كَثِيرًا، أُفَضِّلُ الْخُضَارَ.", "La akulul lahma katsiran, ufadhdhilul khudhara.", "Saya tidak banyak makan daging, saya lebih suka sayuran."],
      ["فِي الْمَطْعَمِ طَلَبْنَا خُبْزًا وَحُمُّصًا وَسَلَطَةً.", "Fil math'ami thalabna khubzan wa hummushan wa salathatan.", "Di restoran kami memesan roti, hummus, dan salad."],
      ["الطَّعَامُ الْإِنْدُونِيسِيُّ حَارٌّ وَلَذِيذٌ.", "Ath-tha'amul indunisiyyu harrun wa ladzidzun.", "Makanan Indonesia pedas dan lezat."],
    ],
  ],
  // 8. Minuman
  [
    [
      ["مَاءٌ", "Ma'un", "air"],
      ["حَلِيبٌ", "Halibun", "susu"],
      ["شَايٌ", "Syayun", "teh"],
      ["عَصِيرٌ", "'Ashirun", "jus"],
    ],
    [
      ["أَشْرَبُ الْقَهْوَةَ كُلَّ صَبَاحٍ.", "Asyrabul qahwata kulla shabahin.", "Saya minum kopi setiap pagi."],
      ["هَلْ تُرِيدُ شَايًا بِالسُّكَّرِ؟", "Hal turidu syayan bis sukkari?", "Apakah kamu mau teh dengan gula?"],
      ["الْمَاءُ بَارِدٌ فِي الثَّلَّاجَةِ.", "Al-ma'u baridun fits tsallajati.", "Airnya dingin di kulkas."],
      ["أَنَا عَطْشَانُ، أُرِيدُ مَاءً.", "Ana 'athsyanu, uridu ma'an.", "Saya haus, saya mau air.", ["Lawan dari عَطْشَانُ (haus) adalah...", "رَيَّانُ", "جَوْعَانُ", "تَعْبَانُ", "نَعْسَانُ"]],
    ],
    [
      ["أُفَضِّلُ عَصِيرَ الْبُرْتُقَالِ عَلَى عَصِيرِ التُّفَّاحِ.", "Ufadhdhilu 'ashiral burtuqali 'ala 'ashirit tuffahi.", "Saya lebih suka jus jeruk daripada jus apel."],
      ["يَشْرَبُ جَدِّي الْحَلِيبَ الدَّافِئَ قَبْلَ النَّوْمِ.", "Yasyrabu jaddil halibad dafi'a qablan naumi.", "Kakekku minum susu hangat sebelum tidur."],
      ["لَا تَشْرَبِ الْمَاءَ الْبَارِدَ وَأَنْتَ مَرِيضٌ.", "La tasyrabil ma'al barida wa anta maridhun.", "Jangan minum air dingin saat kamu sakit."],
      ["قَدَّمَ لَنَا الْمُضِيفُ قَهْوَةً عَرَبِيَّةً وَتَمْرًا.", "Qaddama lanal mudhifu qahwatan 'arabiyyatan wa tamran.", "Tuan rumah menyuguhkan kopi Arab dan kurma kepada kami."],
    ],
  ],
  // 9. Hari
  [
    [
      ["الْأَحَدُ", "Al-ahadu", "hari Minggu"],
      ["الْإِثْنَيْنِ", "Al-itsnaini", "hari Senin"],
      ["الْخَمِيسُ", "Al-khamisu", "hari Kamis"],
      ["الْجُمُعَةُ", "Al-jumu'atu", "hari Jumat", ["Hari setelah الْخَمِيسُ adalah...", "الْجُمُعَةُ", "السَّبْتُ", "الْأَرْبِعَاءُ", "الْأَحَدُ"]],
    ],
    [
      ["الْيَوْمُ يَوْمُ الثُّلَاثَاءِ.", "Al-yaumu yaumuts tsulatsa'i.", "Hari ini hari Selasa."],
      ["نَذْهَبُ إِلَى الْمَسْجِدِ يَوْمَ الْجُمُعَةِ.", "Nadzhabu ilal masjidi yaumal jumu'ati.", "Kami pergi ke masjid pada hari Jumat."],
      ["عُطْلَتِي يَوْمُ السَّبْتِ.", "'Uthlati yaumus sabti.", "Libur saya hari Sabtu."],
      ["أَمْسِ كَانَ يَوْمَ الْأَرْبِعَاءِ.", "Amsi kana yaumal arbi'a'i.", "Kemarin hari Rabu."],
    ],
    [
      ["أَدْرُسُ اللُّغَةَ الْعَرَبِيَّةَ يَوْمَ الْإِثْنَيْنِ وَيَوْمَ الْخَمِيسِ.", "Adrusul lughatal 'arabiyyata yaumal itsnaini wa yaumal khamisi.", "Saya belajar bahasa Arab hari Senin dan Kamis."],
      ["يَبْدَأُ الْأُسْبُوعُ الدِّرَاسِيُّ فِي بَعْضِ الدُّوَلِ يَوْمَ الْأَحَدِ.", "Yabda'ul usbu'ud dirasiyyu fi ba'dhid duwali yaumal ahadi.", "Di beberapa negara, minggu sekolah dimulai hari Minggu."],
      ["سَنُسَافِرُ إِلَى جَاكَرْتَا يَوْمَ السَّبْتِ الْقَادِمِ.", "Sanusafiru ila Jakarta yaumas sabtil qadimi.", "Kami akan bepergian ke Jakarta Sabtu depan."],
      ["كَمْ يَوْمًا فِي الْأُسْبُوعِ تَعْمَلُ؟", "Kam yauman fil usbu'i ta'malu?", "Berapa hari dalam seminggu kamu bekerja?"],
    ],
  ],
  // 10. Waktu
  [
    [
      ["سَاعَةٌ", "Sa'atun", "jam"],
      ["دَقِيقَةٌ", "Daqiqatun", "menit", ["Bentuk jamak dari دَقِيقَةٌ adalah...", "دَقَائِقُ", "دَقِيقَاتٌ", "أَدْقَاقٌ", "دُقُوقٌ"]],
      ["صَبَاحٌ", "Shabahun", "pagi"],
      ["مَسَاءٌ", "Masa'un", "sore / malam"],
    ],
    [
      ["كَمِ السَّاعَةُ الْآنَ؟", "Kamis sa'atul ana?", "Jam berapa sekarang?"],
      ["السَّاعَةُ الثَّالِثَةُ وَالنِّصْفُ.", "As-sa'atuts tsalitsatu wan nishfu.", "Jam setengah empat (tiga lewat setengah)."],
      ["أَسْتَيْقِظُ فِي الْفَجْرِ.", "Astaiqizhu fil fajri.", "Saya bangun saat fajar."],
      ["سَأَرْجِعُ بَعْدَ رُبْعِ سَاعَةٍ.", "Sa'arji'u ba'da rub'i sa'atin.", "Saya akan kembali seperempat jam lagi."],
    ],
    [
      ["يَبْدَأُ الْعَمَلُ فِي السَّاعَةِ الثَّامِنَةِ صَبَاحًا.", "Yabda'ul 'amalu fis sa'atits tsaminati shabahan.", "Pekerjaan dimulai jam delapan pagi."],
      ["وَصَلَ الْقِطَارُ مُتَأَخِّرًا عِشْرِينَ دَقِيقَةً.", "Washalal qitharu muta'akhkhiran 'isyrina daqiqatan.", "Kereta tiba terlambat dua puluh menit."],
      ["نَتَنَاوَلُ الْعَشَاءَ بَعْدَ صَلَاةِ الْمَغْرِبِ.", "Natanawalul 'asya'a ba'da shalatil maghribi.", "Kami makan malam setelah salat Magrib."],
      ["الْوَقْتُ كَالسَّيْفِ، إِنْ لَمْ تَقْطَعْهُ قَطَعَكَ.", "Al-waqtu kas saifi, in lam taqtha'hu qatha'aka.", "Waktu itu seperti pedang; jika kamu tidak memotongnya, ia memotongmu."],
    ],
  ],
  // 11. Anggota Tubuh
  [
    [
      ["رَأْسٌ", "Ra'sun", "kepala"],
      ["عَيْنٌ", "'Ainun", "mata", ["Bentuk mutsanna (dua) dari عَيْنٌ adalah...", "عَيْنَانِ", "عُيُونٌ", "أَعْيُنٌ", "عَيْنَاتٌ"]],
      ["يَدٌ", "Yadun", "tangan"],
      ["رِجْلٌ", "Rijlun", "kaki"],
    ],
    [
      ["عِنْدِي صُدَاعٌ فِي رَأْسِي.", "'Indi shuda'un fi ra'si.", "Saya sakit kepala."],
      ["نَسْمَعُ بِالْأُذُنَيْنِ.", "Nasma'u bil udzunaini.", "Kita mendengar dengan dua telinga."],
      ["اغْسِلْ يَدَيْكَ قَبْلَ الْأَكْلِ.", "Ighsil yadaika qablal akli.", "Cucilah kedua tanganmu sebelum makan."],
      ["تُؤْلِمُنِي أَسْنَانِي.", "Tu'limuni asnani.", "Gigiku terasa sakit."],
    ],
    [
      ["قَالَ الطَّبِيبُ: افْتَحْ فَمَكَ وَأَخْرِجْ لِسَانَكَ.", "Qalath thabibu: iftah famaka wa akhrij lisanaka.", "Dokter berkata: buka mulutmu dan julurkan lidahmu."],
      ["سَقَطَ أَخِي فَجُرِحَتْ رُكْبَتُهُ.", "Saqatha akhi fajurihat rukbatuhu.", "Adikku jatuh lalu lututnya terluka."],
      ["لِلْإِنْسَانِ قَلْبٌ وَاحِدٌ وَرِئَتَانِ.", "Lil insani qalbun wahidun wa ri'atani.", "Manusia punya satu jantung dan dua paru-paru."],
      ["الرِّيَاضَةُ تُقَوِّي الْعَضَلَاتِ وَالْعِظَامَ.", "Ar-riyadhatu tuqawwil 'adhalati wal 'izhama.", "Olahraga menguatkan otot dan tulang."],
    ],
  ],
  // 12. Pakaian
  [
    [
      ["قَمِيصٌ", "Qamishun", "kemeja"],
      ["سِرْوَالٌ", "Sirwalun", "celana"],
      ["حِذَاءٌ", "Hidza'un", "sepatu"],
      ["قُبَّعَةٌ", "Qubba'atun", "topi"],
    ],
    [
      ["أَلْبَسُ الثَّوْبَ يَوْمَ الْجُمُعَةِ.", "Albasuts tsauba yaumal jumu'ati.", "Saya memakai gamis pada hari Jumat."],
      ["هٰذَا الْقَمِيصُ ضَيِّقٌ عَلَيَّ.", "Hadzal qamishu dhayyiqun 'alayya.", "Kemeja ini sempit untukku.", ["Lawan kata ضَيِّقٌ (sempit) adalah...", "وَاسِعٌ", "قَصِيرٌ", "ثَقِيلٌ", "رَخِيصٌ"]],
      ["خَلَعْتُ حِذَائِي عِنْدَ الْبَابِ.", "Khala'tu hidza'i 'indal babi.", "Saya melepas sepatu di pintu."],
      ["تَلْبَسُ أُخْتِي حِجَابًا أَزْرَقَ.", "Talbasu ukhti hijaban azraqa.", "Kakakku memakai jilbab biru."],
    ],
    [
      ["الْجَوُّ بَارِدٌ، الْبَسْ مِعْطَفَكَ قَبْلَ أَنْ تَخْرُجَ.", "Al-jawwu baridun, ilbas mi'thafaka qabla an takhruja.", "Cuacanya dingin, pakailah mantelmu sebelum keluar."],
      ["اشْتَرَيْتُ قَمِيصًا جَدِيدًا بِخَمْسِينَ رِيَالًا.", "Isytaraitu qamishan jadidan bikhamsina riyalan.", "Saya membeli kemeja baru seharga lima puluh riyal."],
      ["هَلْ عِنْدَكُمْ هٰذَا الْفُسْتَانُ بِمَقَاسٍ أَكْبَرَ؟", "Hal 'indakum hadzal fustanu bimaqasin akbara?", "Apakah kalian punya gaun ini dengan ukuran lebih besar?"],
      ["يَلْبَسُ الْعُمَّالُ خُوذَاتٍ لِحِمَايَةِ رُؤُوسِهِمْ.", "Yalbasul 'ummalu khudzatin lihimayati ru'usihim.", "Para pekerja memakai helm untuk melindungi kepala mereka."],
    ],
  ],
  // 13. Transportasi
  [
    [
      ["سَيَّارَةٌ", "Sayyaratun", "mobil"],
      ["طَائِرَةٌ", "Tha'iratun", "pesawat"],
      ["قِطَارٌ", "Qitharun", "kereta"],
      ["دَرَّاجَةٌ", "Darrajatun", "sepeda"],
    ],
    [
      ["أَذْهَبُ إِلَى الْمَدْرَسَةِ بِالْحَافِلَةِ.", "Adzhabu ilal madrasati bil hafilati.", "Saya pergi ke sekolah naik bus."],
      ["الْمَطَارُ بَعِيدٌ عَنِ الْمَدِينَةِ.", "Al-matharu ba'idun 'anil madinati.", "Bandara jauh dari kota."],
      ["رَكِبْنَا السَّفِينَةَ إِلَى الْجَزِيرَةِ.", "Rakibnas safinata ilal jazirati.", "Kami naik kapal ke pulau."],
      ["أَيْنَ مَحَطَّةُ الْقِطَارِ؟", "Aina mahaththatul qithari?", "Di mana stasiun kereta?", ["Kata مَحَطَّةٌ berarti...", "stasiun / halte", "bandara", "pelabuhan", "jalan raya"]],
    ],
    [
      ["تَسْتَغْرِقُ الرِّحْلَةُ بِالطَّائِرَةِ سَاعَتَيْنِ.", "Tastaghriqur rihlatu bith tha'irati sa'ataini.", "Perjalanan dengan pesawat memakan waktu dua jam."],
      ["الزِّحَامُ شَدِيدٌ فِي الشَّارِعِ صَبَاحًا.", "Az-zihamu syadidun fisy syari'i shabahan.", "Kemacetan parah di jalan pada pagi hari."],
      ["يَقُودُ أَبِي السَّيَّارَةَ بِحَذَرٍ.", "Yaqudu abis sayyarata bihadzarin.", "Ayahku menyetir mobil dengan hati-hati."],
      ["حَجَزْتُ تَذْكِرَةَ الْقِطَارِ عَبْرَ الْإِنْتَرْنِتْ.", "Hajaztu tadzkiratal qithari 'abral internit.", "Saya memesan tiket kereta lewat internet."],
    ],
  ],
  // 14. Tempat Umum
  [
    [
      ["مَسْجِدٌ", "Masjidun", "masjid", ["Bentuk jamak dari مَسْجِدٌ adalah...", "مَسَاجِدُ", "مَسْجِدَاتٌ", "سُجُودٌ", "مَسَاجِيدُ"]],
      ["سُوقٌ", "Suqun", "pasar"],
      ["مُسْتَشْفَى", "Mustasyfa", "rumah sakit"],
      ["مَكْتَبُ الْبَرِيدِ", "Maktabul baridi", "kantor pos"],
    ],
    [
      ["الْبَنْكُ قَرِيبٌ مِنَ السُّوقِ.", "Al-banku qaribun minas suqi.", "Bank dekat dengan pasar."],
      ["نَلْعَبُ الْكُرَةَ فِي الْمَلْعَبِ.", "Nal'abul kurata fil mal'abi.", "Kami bermain bola di lapangan."],
      ["أَسْتَعِيرُ الْكُتُبَ مِنَ الْمَكْتَبَةِ الْعَامَّةِ.", "Asta'irul kutuba minal maktabatil 'ammati.", "Saya meminjam buku dari perpustakaan umum."],
      ["الصَّيْدَلِيَّةُ مُغْلَقَةٌ الْآنَ.", "Ash-shaidaliyyatu mughlaqatun al-ana.", "Apotek tutup sekarang."],
    ],
    [
      ["ذَهَبْنَا إِلَى الْمَتْحَفِ لِنَرَى الْآثَارَ الْقَدِيمَةَ.", "Dzahabna ilal mathafi linaral atsaral qadimata.", "Kami pergi ke museum untuk melihat peninggalan kuno."],
      ["يَقَعُ مَرْكَزُ الشُّرْطَةِ فِي وَسَطِ الْمَدِينَةِ.", "Yaqa'u markazusy syurthati fi wasathil madinati.", "Kantor polisi terletak di tengah kota."],
      ["الْحَدِيقَةُ الْعَامَّةُ مُزْدَحِمَةٌ فِي أَيَّامِ الْعُطْلَةِ.", "Al-hadiqatul 'ammatu muzdahimatun fi ayyamil 'uthlati.", "Taman umum ramai pada hari libur."],
      ["يُصَلِّي النَّاسُ صَلَاةَ الْعِيدِ فِي الْمَيْدَانِ.", "Yushallin nasu shalatal 'idi fil maidani.", "Orang-orang salat Id di lapangan."],
    ],
  ],
  // 15. Profesi
  [
    [
      ["طَبِيبٌ", "Thabibun", "dokter"],
      ["مُهَنْدِسٌ", "Muhandisun", "insinyur"],
      ["فَلَّاحٌ", "Fallahun", "petani"],
      ["مُمَرِّضَةٌ", "Mumarridhatun", "perawat (perempuan)"],
    ],
    [
      ["أَبِي تَاجِرٌ فِي السُّوقِ.", "Abi tajirun fis suqi.", "Ayahku pedagang di pasar."],
      ["الشُّرْطِيُّ يُنَظِّمُ الْمُرُورَ.", "Asy-syurthiyyu yunazhzhimul murura.", "Polisi mengatur lalu lintas."],
      ["أُرِيدُ أَنْ أَكُونَ مُعَلِّمًا.", "Uridu an akuna mu'alliman.", "Saya ingin menjadi guru."],
      ["الْخَبَّازُ يَصْنَعُ الْخُبْزَ.", "Al-khabbazu yashna'ul khubza.", "Tukang roti membuat roti.", ["Pola فَعَّالٌ seperti خَبَّازٌ sering menunjukkan...", "profesi / pelaku yang sering melakukan", "tempat kerja", "alat kerja", "kata kerja lampau"]],
    ],
    [
      ["يَعْمَلُ أَخِي مُهَنْدِسًا فِي شَرِكَةٍ كَبِيرَةٍ.", "Ya'malu akhi muhandisan fi syarikatin kabiratin.", "Kakakku bekerja sebagai insinyur di perusahaan besar."],
      ["الطَّبِيبَةُ تَفْحَصُ الْمَرِيضَ بِعِنَايَةٍ.", "Ath-thabibatu tafhashul maridha bi'inayatin.", "Dokter perempuan itu memeriksa pasien dengan teliti."],
      ["يَحْصُدُ الْفَلَّاحُونَ الْأَرُزَّ فِي الصَّيْفِ.", "Yahshudul fallahunal aruzza fish shaifi.", "Para petani memanen padi di musim panas."],
      ["يَكْتُبُ الصَّحَفِيُّ مَقَالَةً عَنِ الِاقْتِصَادِ.", "Yaktubush shahafiyyu maqalatan 'anil iqtishadi.", "Wartawan menulis artikel tentang ekonomi."],
    ],
  ],
  // 16. Hewan
  [
    [
      ["قِطٌّ", "Qiththun", "kucing"],
      ["كَلْبٌ", "Kalbun", "anjing"],
      ["حِصَانٌ", "Hishanun", "kuda"],
      ["جَمَلٌ", "Jamalun", "unta", ["Bentuk jamak dari جَمَلٌ adalah...", "جِمَالٌ", "جَمَلَاتٌ", "أَجْمُلٌ", "جُمُولٌ"]],
    ],
    [
      ["الْقِطَّةُ تَشْرَبُ الْحَلِيبَ.", "Al-qiththatu tasyrabul haliba.", "Kucing itu minum susu."],
      ["الْأَسَدُ مَلِكُ الْغَابَةِ.", "Al-asadu malikul ghabati.", "Singa adalah raja hutan."],
      ["الطُّيُورُ تَطِيرُ فِي السَّمَاءِ.", "Ath-thuyuru tathiru fis sama'i.", "Burung-burung terbang di langit."],
      ["عِنْدَ جَدِّي بَقَرَةٌ وَغَنَمٌ.", "'Inda jaddi baqaratun wa ghanamun.", "Kakekku punya sapi dan kambing."],
    ],
    [
      ["يَعِيشُ الْجَمَلُ فِي الصَّحْرَاءِ وَيَصْبِرُ عَلَى الْعَطَشِ.", "Ya'isyul jamalu fish shahra'i wa yashbiru 'alal 'athasyi.", "Unta hidup di gurun dan tahan terhadap haus."],
      ["رَأَيْنَا الْفِيلَ وَالزَّرَافَةَ فِي حَدِيقَةِ الْحَيَوَانَاتِ.", "Ra'ainal fila waz zarafata fi hadiqatil hayawanati.", "Kami melihat gajah dan jerapah di kebun binatang."],
      ["تَبْنِي النَّحْلَةُ بَيْتَهَا وَتَصْنَعُ الْعَسَلَ.", "Tabnin nahlatu baitaha wa tashna'ul 'asala.", "Lebah membangun sarangnya dan membuat madu."],
      ["الدَّجَاجَةُ تَبِيضُ كُلَّ يَوْمٍ تَقْرِيبًا.", "Ad-dajajatu tabidhu kulla yaumin taqriban.", "Ayam betina bertelur hampir setiap hari."],
    ],
  ],
  // 17. Cuaca
  [
    [
      ["مَطَرٌ", "Matharun", "hujan"],
      ["شَمْسٌ", "Syamsun", "matahari"],
      ["رِيحٌ", "Rihun", "angin"],
      ["ثَلْجٌ", "Tsaljun", "salju / es"],
    ],
    [
      ["الْجَوُّ حَارٌّ الْيَوْمَ.", "Al-jawwu harrun al-yauma.", "Cuacanya panas hari ini.", ["Lawan kata حَارٌّ (panas) adalah...", "بَارِدٌ", "جَمِيلٌ", "مُمْطِرٌ", "صَافٍ"]],
      ["يَنْزِلُ الْمَطَرُ بِغَزَارَةٍ.", "Yanzilul matharu bighazaratin.", "Hujan turun dengan deras."],
      ["السَّمَاءُ صَافِيَةٌ وَلَا غُيُومَ.", "As-sama'u shafiyatun wa la ghuyuma.", "Langit cerah dan tidak ada awan."],
      ["تَهُبُّ رِيَاحٌ قَوِيَّةٌ.", "Tahubbu riyahun qawiyyatun.", "Angin kencang bertiup."],
    ],
    [
      ["فِي إِنْدُونِيسِيَا مَوْسِمَانِ: مَوْسِمُ الْمَطَرِ وَمَوْسِمُ الْجَفَافِ.", "Fi Indunisiya mausimani: mausimul mathari wa mausimul jafafi.", "Di Indonesia ada dua musim: musim hujan dan musim kemarau."],
      ["خُذْ مِظَلَّتَكَ، يَبْدُو أَنَّهَا سَتُمْطِرُ.", "Khudz mizhallataka, yabdu annaha satumthiru.", "Bawalah payungmu, sepertinya akan hujan."],
      ["دَرَجَةُ الْحَرَارَةِ الْيَوْمَ ثَلَاثُونَ دَرَجَةً.", "Darajatul hararatil yauma tsalatsuna darajatan.", "Suhu hari ini tiga puluh derajat."],
      ["تَنْخَفِضُ الْحَرَارَةُ فِي اللَّيْلِ فِي الصَّحْرَاءِ.", "Tankhafidhul hararatu fil laili fish shahra'i.", "Suhu turun di malam hari di gurun."],
    ],
  ],
  // 18. Hobi
  [
    [
      ["قِرَاءَةٌ", "Qira'atun", "membaca"],
      ["سِبَاحَةٌ", "Sibahatun", "berenang"],
      ["رَسْمٌ", "Rasmun", "menggambar"],
      ["طَبْخٌ", "Thabkhun", "memasak"],
    ],
    [
      ["هِوَايَتِي كُرَةُ الْقَدَمِ.", "Hiwayati kuratul qadami.", "Hobiku sepak bola."],
      ["أُحِبُّ جَمْعَ الطَّوَابِعِ.", "Uhibbu jam'ath thawabi'i.", "Saya suka mengoleksi perangko."],
      ["تَعْزِفُ أُخْتِي عَلَى الْبِيَانُو.", "Ta'zifu ukhti 'alal biyanu.", "Kakakku bermain piano."],
      ["مَا هِوَايَتُكَ؟", "Ma hiwayatuka?", "Apa hobimu?", ["Kata هِوَايَةٌ berarti...", "hobi", "pekerjaan", "pelajaran", "perjalanan"]],
    ],
    [
      ["أَقْضِي وَقْتَ فَرَاغِي فِي قِرَاءَةِ الرِّوَايَاتِ.", "Aqdhi waqta faraghi fi qira'atir riwayati.", "Saya menghabiskan waktu luang dengan membaca novel."],
      ["يَذْهَبُ أَبِي إِلَى الْبَحْرِ لِصَيْدِ السَّمَكِ كُلَّ أُسْبُوعٍ.", "Yadzhabu abi ilal bahri lishaidis samaki kulla usbu'in.", "Ayahku pergi ke laut untuk memancing setiap minggu."],
      ["تَعَلَّمْتُ التَّصْوِيرَ فِي دَوْرَةٍ قَصِيرَةٍ.", "Ta'allamtut tashwira fi dauratin qashiratin.", "Saya belajar fotografi dalam kursus singkat."],
      ["الْمَشْيُ فِي الصَّبَاحِ هِوَايَةٌ مُفِيدَةٌ لِلصِّحَّةِ.", "Al-masyyu fish shabahi hiwayatun mufidatun lish shihhati.", "Jalan pagi adalah hobi yang bermanfaat bagi kesehatan."],
    ],
  ],
  // 19. Kata Kerja Harian
  [
    [
      ["يَسْتَيْقِظُ", "Yastaiqizhu", "bangun tidur"],
      ["يَغْتَسِلُ", "Yaghtasilu", "mandi"],
      ["يَنَامُ", "Yanamu", "tidur", ["Bentuk madhi (lampau) dari يَنَامُ adalah...", "نَامَ", "نَوَّمَ", "نَائِمٌ", "مَنَامٌ"]],
      ["يَرْجِعُ", "Yarji'u", "kembali / pulang"],
    ],
    [
      ["أُصَلِّي الْفَجْرَ ثُمَّ أَقْرَأُ الْقُرْآنَ.", "Ushallil fajra tsumma aqra'ul qur'ana.", "Saya salat Subuh lalu membaca Al-Qur'an."],
      ["يَلْبَسُ أَخِي مَلَابِسَهُ بِسُرْعَةٍ.", "Yalbasu akhi malabisahu bisur'atin.", "Adikku memakai bajunya dengan cepat."],
      ["نَتَنَاوَلُ الْغَدَاءَ مَعًا.", "Natanawalul ghada'a ma'an.", "Kami makan siang bersama."],
      ["تُنَظِّفُ أُمِّي الْبَيْتَ كُلَّ صَبَاحٍ.", "Tunazhzhifu ummil baita kulla shabahin.", "Ibuku membersihkan rumah setiap pagi."],
    ],
    [
      ["بَعْدَ أَنْ أَسْتَيْقِظَ، أَغْسِلُ وَجْهِي وَأُنَظِّفُ أَسْنَانِي.", "Ba'da an astaiqizha, aghsilu wajhi wa unazhzhifu asnani.", "Setelah bangun, saya mencuci muka dan membersihkan gigi."],
      ["أَرْجِعُ مِنَ الْعَمَلِ فِي السَّاعَةِ الْخَامِسَةِ مَسَاءً.", "Arji'u minal 'amali fis sa'atil khamisati masa'an.", "Saya pulang kerja jam lima sore."],
      ["يُرَاجِعُ الطُّلَّابُ دُرُوسَهُمْ قَبْلَ الِامْتِحَانِ.", "Yuraji'uth thullabu durusahum qablal imtihani.", "Para siswa mengulang pelajaran mereka sebelum ujian."],
      ["أَنَامُ مُبَكِّرًا لِأَسْتَيْقِظَ نَشِيطًا.", "Anamu mubakkiran li'astaiqizha nasyithan.", "Saya tidur lebih awal agar bangun dengan segar."],
    ],
  ],
  // 20. Sifat Dasar
  [
    [
      ["كَبِيرٌ", "Kabirun", "besar"],
      ["صَغِيرٌ", "Shaghirun", "kecil"],
      ["طَوِيلٌ", "Thawilun", "panjang / tinggi", ["Lawan kata طَوِيلٌ adalah...", "قَصِيرٌ", "صَغِيرٌ", "قَلِيلٌ", "قَرِيبٌ"]],
      ["جَمِيلٌ", "Jamilun", "indah / cantik"],
    ],
    [
      ["هٰذِهِ الْحَقِيبَةُ ثَقِيلَةٌ.", "Hadzihil haqibatu tsaqilatun.", "Tas ini berat."],
      ["الشَّارِعُ وَاسِعٌ وَنَظِيفٌ.", "Asy-syari'u wasi'un wa nazhifun.", "Jalannya lebar dan bersih."],
      ["السَّيَّارَةُ الْقَدِيمَةُ رَخِيصَةٌ.", "As-sayyaratul qadimatu rakhishatun.", "Mobil tua itu murah."],
      ["الطَّالِبُ الْمُجْتَهِدُ نَاجِحٌ.", "Ath-thalibul mujtahidu najihun.", "Siswa yang rajin itu berhasil."],
    ],
    [
      ["بَيْتُنَا الْجَدِيدُ أَكْبَرُ مِنْ بَيْتِنَا الْقَدِيمِ.", "Baitunal jadidu akbaru min baitinal qadimi.", "Rumah baru kami lebih besar daripada rumah lama kami.", ["أَكْبَرُ adalah bentuk... dari كَبِيرٌ", "perbandingan (lebih besar)", "jamak", "muannats", "kata kerja"]],
      ["هٰذَا الدَّرْسُ سَهْلٌ، لٰكِنَّ الِامْتِحَانَ صَعْبٌ.", "Hadzad darsu sahlun, lakinnal imtihana sha'bun.", "Pelajaran ini mudah, tetapi ujiannya sulit."],
      ["الْمَاءُ فِي النَّهْرِ صَافٍ وَبَارِدٌ.", "Al-ma'u fin nahri shafin wa baridun.", "Air di sungai jernih dan dingin."],
      ["كَانَ الطَّرِيقُ طَوِيلًا وَمُتْعِبًا.", "Kanath thariqu thawilan wa mut'iban.", "Jalannya panjang dan melelahkan."],
    ],
  ],
];
