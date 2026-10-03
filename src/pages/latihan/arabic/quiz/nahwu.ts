import type { QuizTopic } from './types';

// Latihan Nahwu — one entry per topic (index = topic - 1): [Basic, Intermediate, Advanced].
export const nahwu: QuizTopic[] = [
  // 1. Isim dan Fiil
  [
    [
      ["قَلَمٌ", "Qalamun", "pena", ["Jenis kata قَلَمٌ adalah...", "isim", "fiil", "harf", "fiil amr"]],
      ["جَلَسَ", "Jalasa", "dia telah duduk", ["Jenis kata جَلَسَ adalah...", "fiil", "isim", "harf", "dhamir"]],
      ["عَلَى", "'Ala", "di atas", ["Jenis kata عَلَى adalah...", "harf", "isim", "fiil", "isim isyarah"]],
      ["مَدِينَةٌ", "Madinatun", "kota"],
    ],
    [
      ["ذَهَبَ الْوَلَدُ إِلَى السُّوقِ.", "Dzahabal waladu ilas suqi.", "Anak itu pergi ke pasar.", ["Dalam ذَهَبَ الْوَلَدُ إِلَى السُّوقِ, kata إِلَى adalah...", "harf", "isim", "fiil", "fa'il"]],
      ["يَقْرَأُ أَحْمَدُ كِتَابًا.", "Yaqra'u Ahmadu kitaban.", "Ahmad membaca sebuah buku."],
      ["الشَّمْسُ تَطْلُعُ مِنَ الشَّرْقِ.", "Asy-syamsu tathlu'u minasy syarqi.", "Matahari terbit dari timur."],
      ["فَتَحَ الْمُدِيرُ الْبَابَ.", "Fatahal mudirul baba.", "Direktur membuka pintu.", ["Fiil dalam kalimat فَتَحَ الْمُدِيرُ الْبَابَ adalah...", "فَتَحَ", "الْمُدِيرُ", "الْبَابَ", "tidak ada fiil"]],
    ],
    [
      ["كَتَبَ الطَّالِبُ الدَّرْسَ فِي الدَّفْتَرِ بِسُرْعَةٍ.", "Katabath thalibud darsa fid daftari bisur'atin.", "Siswa itu menulis pelajaran di buku tulis dengan cepat."],
      ["فِي الْحَدِيقَةِ أَشْجَارٌ كَثِيرَةٌ وَأَزْهَارٌ جَمِيلَةٌ.", "Fil hadiqati asyjarun katsiratun wa azharun jamilatun.", "Di taman ada banyak pohon dan bunga yang indah.", ["Kalimat ini tidak mengandung...", "fiil", "isim", "harf", "sifat"]],
      ["سَمِعْتُ صَوْتًا جَمِيلًا مِنَ الْمَسْجِدِ.", "Sami'tu shautan jamilan minal masjidi.", "Saya mendengar suara indah dari masjid."],
      ["يَنْزِلُ الْمَطَرُ عَلَى الْجِبَالِ فِي الشِّتَاءِ.", "Yanzilul matharu 'alal jibali fisy syita'i.", "Hujan turun di pegunungan pada musim dingin."],
    ],
  ],
  // 2. Mubtada dan Khabar
  [
    [
      ["الْجَوُّ جَمِيلٌ", "Al-jawwu jamilun", "cuacanya indah", ["Mubtada dalam الْجَوُّ جَمِيلٌ adalah...", "الْجَوُّ", "جَمِيلٌ", "keduanya", "tidak ada"]],
      ["الْكُرْسِيُّ مَكْسُورٌ", "Al-kursiyyu maksurun", "kursi itu rusak"],
      ["أَحْمَدُ مُهَنْدِسٌ", "Ahmadu muhandisun", "Ahmad seorang insinyur", ["Khabar dalam أَحْمَدُ مُهَنْدِسٌ adalah...", "مُهَنْدِسٌ", "أَحْمَدُ", "keduanya", "tidak ada"]],
      ["الْقَهْوَةُ سَاخِنَةٌ", "Al-qahwatu sakhinatun", "kopinya panas"],
    ],
    [
      ["الطَّالِبَةُ مُجْتَهِدَةٌ فِي دِرَاسَتِهَا.", "Ath-thalibatu mujtahidatun fi dirasatiha.", "Siswi itu rajin dalam belajarnya.", ["Mengapa khabarnya مُجْتَهِدَةٌ (dengan ة)?", "karena mubtadanya muannats", "karena mubtadanya jamak", "karena kalimatnya lampau", "karena ada huruf jar"]],
      ["الْمُعَلِّمُونَ فِي الْفَصْلِ.", "Al-mu'allimuna fil fashli.", "Para guru ada di kelas."],
      ["الْبَابُ مَفْتُوحٌ وَالنَّافِذَةُ مُغْلَقَةٌ.", "Al-babu maftuhun wan nafidzatu mughlaqatun.", "Pintu terbuka dan jendela tertutup."],
      ["الْبُرْتُقَالُ حُلْوٌ.", "Al-burtuqalu hulwun.", "Jeruk itu manis."],
    ],
    [
      ["الْعِلْمُ نُورٌ وَالْجَهْلُ ظَلَامٌ.", "Al-'ilmu nurun wal jahlu zhalamun.", "Ilmu adalah cahaya dan kebodohan adalah kegelapan."],
      ["الْمُسْلِمُونَ إِخْوَةٌ فِي كُلِّ مَكَانٍ.", "Al-muslimuna ikhwatun fi kulli makanin.", "Kaum muslimin bersaudara di mana pun."],
      ["الصِّدْقُ طَرِيقُ النَّجَاحِ.", "Ash-shidqu thariqun najahi.", "Kejujuran adalah jalan keberhasilan.", ["Khabar dalam الصِّدْقُ طَرِيقُ النَّجَاحِ berupa...", "idhafah (طَرِيقُ النَّجَاحِ)", "fiil", "huruf jar", "dhamir"]],
      ["الْجَامِعَةُ الْإِسْلَامِيَّةُ قَرِيبَةٌ مِنْ بَيْتِي.", "Al-jami'atul islamiyyatu qaribatun min baiti.", "Universitas Islam itu dekat dari rumahku."],
    ],
  ],
  // 3. Kata Tunjuk
  [
    [
      ["هٰذَا كِتَابٌ", "Hadza kitabun", "ini sebuah buku"],
      ["هٰذِهِ سَاعَةٌ", "Hadzihi sa'atun", "ini sebuah jam", ["Mengapa memakai هٰذِهِ untuk سَاعَةٌ?", "karena سَاعَةٌ muannats", "karena سَاعَةٌ jauh", "karena سَاعَةٌ jamak", "karena سَاعَةٌ fiil"]],
      ["ذٰلِكَ جَبَلٌ", "Dzalika jabalun", "itu sebuah gunung"],
      ["تِلْكَ سَفِينَةٌ", "Tilka safinatun", "itu sebuah kapal"],
    ],
    [
      ["هٰذَا الرَّجُلُ طَبِيبٌ مَشْهُورٌ.", "Hadzar rajulu thabibun masyhurun.", "Pria ini dokter terkenal."],
      ["تِلْكَ الْبِنْتُ أُخْتُ زَيْنَبَ.", "Tilkal bintu ukhtu Zainaba.", "Anak perempuan itu adik Zainab."],
      ["هٰؤُلَاءِ طُلَّابٌ جُدُدٌ.", "Ha'ula'i thullabun judadun.", "Mereka ini siswa-siswa baru.", ["Kata tunjuk هٰؤُلَاءِ dipakai untuk...", "jamak (manusia), dekat", "mufrad muannats, dekat", "mufrad mudzakkar, jauh", "mutsanna, jauh"]],
      ["ذٰلِكَ الْبَيْتُ قَدِيمٌ جِدًّا.", "Dzalikal baitu qadimun jiddan.", "Rumah itu sangat tua."],
    ],
    [
      ["هٰذَانِ الْكِتَابَانِ مُفِيدَانِ لِلْمُبْتَدِئِينَ.", "Hadzanil kitabani mufidani lil mubtadi'ina.", "Dua buku ini bermanfaat bagi pemula.", ["Kata tunjuk untuk dua benda mudzakkar (dekat) adalah...", "هٰذَانِ", "هٰذِهِ", "هٰؤُلَاءِ", "ذٰلِكَ"]],
      ["أُولٰئِكَ الْعُلَمَاءُ كَتَبُوا كُتُبًا كَثِيرَةً.", "Ula'ikal 'ulama'u katabu kutuban katsiratan.", "Para ulama itu menulis banyak buku."],
      ["هٰذِهِ الْمَدْرَسَةُ أَكْبَرُ مِنْ تِلْكَ الْمَدْرَسَةِ.", "Hadzihil madrasatu akbaru min tilkal madrasati.", "Sekolah ini lebih besar daripada sekolah itu."],
      ["هَاتَانِ الطَّالِبَتَانِ تَدْرُسَانِ الطِّبَّ.", "Hatanith thalibatani tadrusanith thibba.", "Dua siswi ini belajar kedokteran."],
    ],
  ],
  // 4. Dhamir Munfashil
  [
    [
      ["أَنَا", "Ana", "saya"],
      ["أَنْتِ", "Anti", "kamu (perempuan)", ["Dhamir أَنْتِ dipakai untuk...", "kamu (perempuan)", "kamu (laki-laki)", "dia (perempuan)", "kami"]],
      ["هُمْ", "Hum", "mereka (laki-laki)"],
      ["نَحْنُ", "Nahnu", "kami / kita"],
    ],
    [
      ["هُوَ مُدَرِّسٌ وَهِيَ مُمَرِّضَةٌ.", "Huwa mudarrisun wa hiya mumarridhatun.", "Dia (lk) guru dan dia (pr) perawat."],
      ["أَنْتُمْ ضُيُوفٌ كِرَامٌ.", "Antum dhuyufun kiramun.", "Kalian adalah tamu-tamu yang mulia."],
      ["هُنَّ طَالِبَاتٌ نَشِيطَاتٌ.", "Hunna thalibatun nasyithatun.", "Mereka (pr) siswi-siswi yang aktif.", ["Dhamir هُنَّ untuk...", "mereka (perempuan, jamak)", "mereka (laki-laki)", "kalian berdua", "dia (perempuan)"]],
      ["أَنْتَ صَدِيقِي الْعَزِيزُ.", "Anta shadiqiyal 'azizu.", "Kamu sahabatku yang tercinta."],
    ],
    [
      ["نَحْنُ مِنْ إِنْدُونِيسِيَا وَهُمْ مِنْ مَالِيزِيَا.", "Nahnu min Indunisiya wa hum min Maliziya.", "Kami dari Indonesia dan mereka dari Malaysia."],
      ["أَنْتُمَا أَخَوَانِ مُتَعَاوِنَانِ.", "Antuma akhawani muta'awinani.", "Kalian berdua saudara yang saling menolong.", ["Dhamir أَنْتُمَا dipakai untuk...", "kalian berdua", "kalian (banyak)", "mereka berdua", "kami"]],
      ["هِيَ الَّتِي فَازَتْ فِي الْمُسَابَقَةِ.", "Hiyal lati fazat fil musabaqati.", "Dialah (pr) yang menang dalam perlombaan."],
      ["أَنَا وَأَنْتَ نَدْرُسُ فِي الْجَامِعَةِ نَفْسِهَا.", "Ana wa anta nadrusu fil jami'ati nafsiha.", "Saya dan kamu belajar di universitas yang sama."],
    ],
  ],
  // 5. Mudzakkar dan Muannats
  [
    [
      ["مُعَلِّمَةٌ", "Mu'allimatun", "guru (perempuan)", ["Bentuk mudzakkar dari مُعَلِّمَةٌ adalah...", "مُعَلِّمٌ", "مُعَلِّمُونَ", "تَعْلِيمٌ", "عَالِمٌ"]],
      ["شَمْسٌ", "Syamsun", "matahari (muannats)"],
      ["طَاوِلَةٌ", "Thawilatun", "meja"],
      ["كَرِيمٌ", "Karimun", "mulia / dermawan (mudzakkar)"],
    ],
    [
      ["الطَّبِيبَةُ مَاهِرَةٌ.", "Ath-thabibatu mahiratun.", "Dokter perempuan itu terampil."],
      ["الْأَرْضُ وَاسِعَةٌ.", "Al-ardhu wasi'atun.", "Bumi itu luas.", ["Mengapa khabar الْأَرْضُ memakai ة (وَاسِعَةٌ)?", "karena الْأَرْضُ muannats sima'i", "karena الْأَرْضُ jamak", "karena salah tulis", "karena الْأَرْضُ fiil"]],
      ["الْمُهَنْدِسُ مَشْغُولٌ.", "Al-muhandisu masygulun.", "Insinyur itu sibuk."],
      ["الْمَدِينَةُ نَظِيفَةٌ وَهَادِئَةٌ.", "Al-madinatu nazhifatun wa hadi'atun.", "Kota itu bersih dan tenang."],
    ],
    [
      ["الْمُمَرِّضَةُ الْجَدِيدَةُ تَعْمَلُ فِي اللَّيْلِ.", "Al-mumarridhatul jadidatu ta'malu fil laili.", "Perawat baru itu bekerja di malam hari."],
      ["خَدِيجَةُ امْرَأَةٌ صَالِحَةٌ.", "Khadijatum ra'atun shalihatun.", "Khadijah perempuan yang salehah."],
      ["الْحَرْبُ شَدِيدَةٌ وَالسِّلْمُ جَمِيلٌ.", "Al-harbu syadidatun was silmu jamilun.", "Perang itu dahsyat dan perdamaian itu indah.", ["Kata الْحَرْبُ termasuk...", "muannats tanpa tanda ة", "mudzakkar", "jamak", "fiil"]],
      ["حَمْزَةُ رَجُلٌ شُجَاعٌ.", "Hamzatu rajulun syuja'un.", "Hamzah pria pemberani."],
    ],
  ],
  // 6. Mufrad, Mutsanna, dan Jamak
  [
    [
      ["طَالِبَانِ", "Thalibani", "dua siswa", ["طَالِبَانِ menunjukkan jumlah...", "dua", "satu", "tiga atau lebih", "tidak tentu"]],
      ["مُسْلِمُونَ", "Muslimuna", "orang-orang muslim (laki-laki)"],
      ["طَالِبَاتٌ", "Thalibatun", "siswi-siswi"],
      ["كُتُبٌ", "Kutubun", "buku-buku", ["كُتُبٌ termasuk jenis jamak...", "taksir", "mudzakkar salim", "muannats salim", "mutsanna"]],
    ],
    [
      ["فِي الْفَصْلِ مُدَرِّسَانِ.", "Fil fashli mudarrisani.", "Di kelas ada dua guru."],
      ["الْمُهَنْدِسُونَ يَعْمَلُونَ فِي الْمَصْنَعِ.", "Al-muhandisuna ya'maluna fil mashna'i.", "Para insinyur bekerja di pabrik."],
      ["اشْتَرَيْتُ قَلَمَيْنِ.", "Isytaraitu qalamaini.", "Saya membeli dua pena.", ["Mengapa قَلَمَيْنِ (bukan قَلَمَانِ)?", "karena menjadi maf'ul bih (manshub)", "karena muannats", "karena jamak", "karena setelah huruf jar"]],
      ["الْمُسْلِمَاتُ يُصَلِّينَ فِي الْمَسْجِدِ.", "Al-muslimatu yushallina fil masjidi.", "Para muslimah salat di masjid."],
    ],
    [
      ["رَأَيْتُ الْمُعَلِّمِينَ فِي الْمَكْتَبَةِ.", "Ra'aitul mu'allimina fil maktabati.", "Saya melihat para guru di perpustakaan."],
      ["لِلْبَيْتِ بَابَانِ وَأَرْبَعُ نَوَافِذَ.", "Lil baiti babani wa arba'u nawafidza.", "Rumah itu punya dua pintu dan empat jendela."],
      ["الْأَوْلَادُ يَلْعَبُونَ وَالْبَنَاتُ يَقْرَأْنَ.", "Al-auladu yal'abuna wal banatu yaqra'na.", "Anak-anak lelaki bermain dan anak-anak perempuan membaca."],
      ["سَافَرَ الصَّدِيقَانِ إِلَى مَكَّةَ مَعًا.", "Safarash shadiqani ila Makkata ma'an.", "Dua sahabat itu bepergian ke Mekah bersama."],
    ],
  ],
  // 7. Huruf Jar
  [
    [
      ["مِنَ الْبَيْتِ", "Minal baiti", "dari rumah", ["Harakat akhir الْبَيْتِ setelah مِنْ adalah kasrah karena...", "majrur oleh huruf jar", "menjadi mubtada", "menjadi fa'il", "menjadi maf'ul bih"]],
      ["إِلَى الْمَدْرَسَةِ", "Ilal madrasati", "ke sekolah"],
      ["فِي الْغُرْفَةِ", "Fil ghurfati", "di dalam kamar"],
      ["بِالْقَلَمِ", "Bil qalami", "dengan pena"],
    ],
    [
      ["الْكِتَابُ عَلَى الْمَكْتَبِ.", "Al-kitabu 'alal maktabi.", "Buku itu di atas meja kerja."],
      ["رَجَعَ أَبِي مِنَ السَّفَرِ.", "Raja'a abi minas safari.", "Ayahku pulang dari perjalanan."],
      ["كَتَبْتُ رِسَالَةً لِصَدِيقِي.", "Katabtu risalatan lishadiqi.", "Saya menulis surat untuk sahabatku.", ["Huruf jar لِ dalam لِصَدِيقِي bermakna...", "untuk", "dari", "di atas", "bersama"]],
      ["تَكَلَّمْنَا عَنِ الِامْتِحَانِ.", "Takallamna 'anil imtihani.", "Kami berbicara tentang ujian."],
    ],
    [
      ["سَافَرْنَا مِنْ جَاكَرْتَا إِلَى الْقَاهِرَةِ بِالطَّائِرَةِ.", "Safarna min Jakarta ilal qahirati bith tha'irati.", "Kami bepergian dari Jakarta ke Kairo dengan pesawat."],
      ["وَضَعَتِ الْأُمُّ الطَّعَامَ عَلَى الْمَائِدَةِ لِلضُّيُوفِ.", "Wadha'atil ummuth tha'ama 'alal ma'idati lidh dhuyufi.", "Ibu meletakkan makanan di atas meja untuk para tamu."],
      ["خَرَجَ الطُّلَّابُ مِنَ الْفَصْلِ بَعْدَ الدَّرْسِ.", "Kharajath thullabu minal fashli ba'dad darsi.", "Para siswa keluar dari kelas setelah pelajaran."],
      ["يَعِيشُ السَّمَكُ فِي الْمَاءِ وَلَا يَعِيشُ عَلَى الْيَابِسَةِ.", "Ya'isyus samaku fil ma'i wa la ya'isyu 'alal yabisati.", "Ikan hidup di air dan tidak hidup di daratan."],
    ],
  ],
  // 8. Jumlah Ismiyyah
  [
    [
      ["اللهُ رَحِيمٌ", "Allahu rahimun", "Allah Maha Penyayang"],
      ["السَّيَّارَةُ سَرِيعَةٌ", "As-sayyaratu sari'atun", "mobil itu cepat"],
      ["الْقَمَرُ مُنِيرٌ", "Al-qamaru munirun", "bulan itu bercahaya", ["الْقَمَرُ مُنِيرٌ termasuk jumlah...", "ismiyyah", "fi'liyyah", "syarthiyyah", "istifhamiyyah"]],
      ["الطَّعَامُ جَاهِزٌ", "Ath-tha'amu jahizun", "makanannya siap"],
    ],
    [
      ["الْمُسْتَشْفَى بَعِيدٌ عَنِ الْقَرْيَةِ.", "Al-mustasyfa ba'idun 'anil qaryati.", "Rumah sakit itu jauh dari desa."],
      ["أَخِي طَالِبٌ فِي كُلِّيَّةِ الْهَنْدَسَةِ.", "Akhi thalibun fi kulliyyatil handasati.", "Kakakku mahasiswa di fakultas teknik."],
      ["الْمَاءُ ضَرُورِيٌّ لِلْحَيَاةِ.", "Al-ma'u dharuriyyun lil hayati.", "Air penting bagi kehidupan."],
      ["الْفَلَّاحُ يَزْرَعُ الْأَرُزَّ.", "Al-fallahu yazra'ul aruzza.", "Petani menanam padi.", ["Khabar dalam الْفَلَّاحُ يَزْرَعُ الْأَرُزَّ berupa...", "jumlah fi'liyyah", "isim mufrad", "huruf jar", "dhamir"]],
    ],
    [
      ["الْمَدْرَسَةُ الَّتِي أَدْرُسُ فِيهَا كَبِيرَةٌ وَجَمِيلَةٌ.", "Al-madrasatul lati adrusu fiha kabiratun wa jamilatun.", "Sekolah tempat saya belajar besar dan indah."],
      ["الصَّبْرُ مِفْتَاحُ الْفَرَجِ.", "Ash-shabru miftahul faraji.", "Sabar adalah kunci kelapangan."],
      ["الْأَطْفَالُ فِي الْحَدِيقَةِ يَلْعَبُونَ بِالْكُرَةِ.", "Al-athfalu fil hadiqati yal'abuna bil kurati.", "Anak-anak di taman sedang bermain bola."],
      ["هٰذَا الْمَسْجِدُ أَقْدَمُ مَسْجِدٍ فِي الْمَدِينَةِ.", "Hadzal masjidu aqdamu masjidin fil madinati.", "Masjid ini masjid tertua di kota."],
    ],
  ],
  // 9. Jumlah Fi'liyyah
  [
    [
      ["نَامَ الطِّفْلُ", "Namath thiflu", "anak kecil itu tidur", ["Fa'il dalam نَامَ الطِّفْلُ adalah...", "الطِّفْلُ", "نَامَ", "tidak ada", "keduanya"]],
      ["قَرَأَ زَيْدٌ", "Qara'a Zaidun", "Zaid membaca"],
      ["ضَحِكَتِ الْبِنْتُ", "Dhahikatil bintu", "anak perempuan itu tertawa"],
      ["وَصَلَ الضَّيْفُ", "Washaladh dhaifu", "tamu itu tiba"],
    ],
    [
      ["شَرِبَ الْوَلَدُ الْحَلِيبَ.", "Syaribal waladul haliba.", "Anak itu minum susu.", ["Maf'ul bih dalam شَرِبَ الْوَلَدُ الْحَلِيبَ adalah...", "الْحَلِيبَ", "الْوَلَدُ", "شَرِبَ", "tidak ada"]],
      ["يَزْرَعُ الْفَلَّاحُ الْقَمْحَ.", "Yazra'ul fallahul qamha.", "Petani menanam gandum."],
      ["كَتَبَتِ الطَّالِبَةُ الْوَاجِبَ.", "Katabatith thalibatul wajiba.", "Siswi itu menulis PR."],
      ["فَهِمَ التَّلَامِيذُ الدَّرْسَ.", "Fahimat talamidzud darsa.", "Para murid memahami pelajaran."],
    ],
    [
      ["حَضَرَ الطُّلَّابُ الْمُحَاضَرَةَ فِي الْقَاعَةِ الْكَبِيرَةِ.", "Hadharath thullabul muhadharata fil qa'atil kabirati.", "Para mahasiswa menghadiri kuliah di aula besar."],
      ["يُسَاعِدُ الْأَبْنَاءُ آبَاءَهُمْ فِي أَعْمَالِ الْبَيْتِ.", "Yusa'idul abna'u aba'ahum fi a'malil baiti.", "Anak-anak membantu orang tua mereka dalam pekerjaan rumah."],
      ["أَرْسَلَ الْمُدِيرُ رِسَالَةً إِلَى جَمِيعِ الْمُوَظَّفِينَ.", "Arsalal mudiru risalatan ila jami'il muwazhzhafina.", "Direktur mengirim surat kepada semua pegawai."],
      ["تَعَلَّمَ الْإِنْسَانُ الْكِتَابَةَ مُنْذُ آلَافِ السِّنِينَ.", "Ta'allamal insanul kitabata mundzu alafis sinina.", "Manusia belajar menulis sejak ribuan tahun lalu."],
    ],
  ],
  // 10. Kata Tanya
  [
    [
      ["مَنْ هٰذَا؟", "Man hadza?", "siapa ini?", ["Kata tanya مَنْ menanyakan...", "orang", "tempat", "waktu", "jumlah"]],
      ["مَا هٰذَا؟", "Ma hadza?", "apa ini?"],
      ["أَيْنَ أَنْتَ؟", "Aina anta?", "di mana kamu?"],
      ["مَتَى السَّفَرُ؟", "Mata as-safaru?", "kapan perjalanannya?"],
    ],
    [
      ["كَيْفَ ذَهَبْتَ إِلَى الْمَطَارِ؟", "Kaifa dzahabta ilal mathari?", "Bagaimana kamu pergi ke bandara?"],
      ["كَمْ طَالِبًا فِي الْفَصْلِ؟", "Kam thaliban fil fashli?", "Berapa siswa di kelas?", ["Mengapa طَالِبًا berharakat fathatain setelah كَمْ?", "karena menjadi tamyiz", "karena mubtada", "karena majrur", "karena fa'il"]],
      ["لِمَاذَا تَأَخَّرْتَ الْيَوْمَ؟", "Limadza ta'akhkharta al-yauma?", "Mengapa kamu terlambat hari ini?"],
      ["هَلْ تَتَكَلَّمُ الْعَرَبِيَّةَ؟", "Hal tatakallamul 'arabiyyata?", "Apakah kamu berbicara bahasa Arab?"],
    ],
    [
      ["مِنْ أَيْنَ اشْتَرَيْتَ هٰذِهِ الْحَقِيبَةَ الْجَمِيلَةَ؟", "Min aina isytaraita hadzihil haqibatal jamilata?", "Dari mana kamu membeli tas yang indah ini?"],
      ["مَاذَا تَفْعَلُ بَعْدَ صَلَاةِ الْعِشَاءِ؟", "Madza taf'alu ba'da shalatil 'isya'i?", "Apa yang kamu lakukan setelah salat Isya?"],
      ["أَيُّ كِتَابٍ تُفَضِّلُ أَنْ تَقْرَأَ؟", "Ayyu kitabin tufadhdhilu an taqra'a?", "Buku mana yang lebih kamu sukai untuk dibaca?", ["Kata tanya أَيُّ bermakna...", "yang mana", "berapa", "mengapa", "bagaimana"]],
      ["مُنْذُ مَتَى تَدْرُسُ فِي هٰذِهِ الْجَامِعَةِ؟", "Mundzu mata tadrusu fi hadzihil jami'ati?", "Sejak kapan kamu belajar di universitas ini?"],
    ],
  ],
  // 11. Na'at dan Man'ut
  [
    [
      ["بَيْتٌ وَاسِعٌ", "Baitun wasi'un", "rumah yang luas", ["Na'at dalam بَيْتٌ وَاسِعٌ adalah...", "وَاسِعٌ", "بَيْتٌ", "keduanya", "tidak ada"]],
      ["بِنْتٌ ذَكِيَّةٌ", "Bintun dzakiyyatun", "anak perempuan yang cerdas"],
      ["الْقَلَمُ الْأَحْمَرُ", "Al-qalamul ahmaru", "pena merah itu"],
      ["رَجُلٌ طَوِيلٌ", "Rajulun thawilun", "pria yang tinggi"],
    ],
    [
      ["قَرَأْتُ قِصَّةً قَصِيرَةً.", "Qara'tu qishshatan qashiratan.", "Saya membaca sebuah cerita pendek."],
      ["سَكَنَ فِي الْبَيْتِ الْكَبِيرِ.", "Sakana fil baitil kabiri.", "Dia tinggal di rumah besar itu.", ["Mengapa الْكَبِيرِ berharakat kasrah?", "karena mengikuti man'ut-nya yang majrur", "karena khabar", "karena fa'il", "karena mubtada"]],
      ["هٰذِهِ سَيَّارَةٌ جَدِيدَةٌ.", "Hadzihi sayyaratun jadidatun.", "Ini mobil baru."],
      ["الطُّلَّابُ الْمُجْتَهِدُونَ نَجَحُوا.", "Ath-thullabul mujtahiduna najahu.", "Para siswa yang rajin itu lulus."],
    ],
    [
      ["زُرْنَا مَدِينَةً قَدِيمَةً ذَاتَ تَارِيخٍ عَرِيقٍ.", "Zurna madinatan qadimatan dzata tarikhin 'ariqin.", "Kami mengunjungi kota tua yang punya sejarah panjang."],
      ["رَأَيْتُ طَائِرًا صَغِيرًا عَلَى الشَّجَرَةِ الْعَالِيَةِ.", "Ra'aitu tha'iran shaghiran 'alasy syajaratil 'aliyati.", "Saya melihat burung kecil di atas pohon yang tinggi."],
      ["الْمُعَلِّمَاتُ الْمُخْلِصَاتُ يُحِبُّهُنَّ الطُّلَّابُ.", "Al-mu'allimatul mukhlishatu yuhibbuhunnath thullabu.", "Guru-guru perempuan yang tulus dicintai para siswa."],
      ["اشْتَرَى أَبِي سَيَّارَتَيْنِ جَدِيدَتَيْنِ.", "Isytara abi sayyarataini jadidataini.", "Ayahku membeli dua mobil baru."],
    ],
  ],
  // 12. Idafah Dasar
  [
    [
      ["بَابُ الْبَيْتِ", "Babul baiti", "pintu rumah", ["Mudhaf ilaih dalam بَابُ الْبَيْتِ adalah...", "الْبَيْتِ", "بَابُ", "keduanya", "tidak ada"]],
      ["كِتَابُ أَحْمَدَ", "Kitabu Ahmada", "buku Ahmad"],
      ["مِفْتَاحُ السَّيَّارَةِ", "Miftahus sayyarati", "kunci mobil"],
      ["مَاءُ الْبَحْرِ", "Ma'ul bahri", "air laut"],
    ],
    [
      ["غُرْفَةُ الْمُدِيرِ فِي الطَّابِقِ الثَّانِي.", "Ghurfatul mudiri fith thabiqits tsani.", "Ruang direktur ada di lantai dua."],
      ["قَرَأْتُ كِتَابَ التَّارِيخِ.", "Qara'tu kitabat tarikhi.", "Saya membaca buku sejarah.", ["Mengapa كِتَابَ tidak memakai ال dan tanwin?", "karena menjadi mudhaf", "karena fiil", "karena majrur", "karena jamak"]],
      ["سَيَّارَةُ أَبِي بَيْضَاءُ.", "Sayyaratu abi baidha'u.", "Mobil ayahku putih."],
      ["صَوْتُ الْمُؤَذِّنِ جَمِيلٌ.", "Shautul mu'adzdzini jamilun.", "Suara muazin itu indah."],
    ],
    [
      ["مَكْتَبَةُ الْجَامِعَةِ مَفْتُوحَةٌ طُولَ الْيَوْمِ.", "Maktabatul jami'ati maftuhatun thulal yaumi.", "Perpustakaan universitas buka sepanjang hari."],
      ["زُرْتُ بَيْتَ صَدِيقِ أَخِي.", "Zurtu baita shadiqi akhi.", "Saya mengunjungi rumah teman kakakku."],
      ["طُلَّابُ الْمَعْهَدِ يَحْفَظُونَ الْقُرْآنَ.", "Thullabul ma'hadi yahfazhunal qur'ana.", "Para santri pesantren menghafal Al-Qur'an."],
      ["عَاصِمَةُ إِنْدُونِيسِيَا مَدِينَةٌ مُزْدَحِمَةٌ.", "'Ashimatu Indunisiya madinatun muzdahimatun.", "Ibu kota Indonesia adalah kota yang padat."],
    ],
  ],
  // 13. Fi'il Madhi
  [
    [
      ["كَتَبْتُ", "Katabtu", "saya telah menulis", ["Pelaku dalam كَتَبْتُ adalah...", "saya", "kamu (lk)", "dia (lk)", "mereka"]],
      ["ذَهَبُوا", "Dzahabu", "mereka telah pergi"],
      ["شَرِبَتْ", "Syaribat", "dia (pr) telah minum"],
      ["أَكَلْنَا", "Akalna", "kami telah makan"],
    ],
    [
      ["سَافَرْتُ إِلَى بَالِي فِي الْعُطْلَةِ.", "Safartu ila Bali fil 'uthlati.", "Saya bepergian ke Bali saat liburan."],
      ["هَلْ فَهِمْتُمُ الدَّرْسَ؟", "Hal fahimtumud darsa?", "Apakah kalian sudah memahami pelajaran?", ["Akhiran تُمْ dalam فَهِمْتُمْ menunjukkan...", "kalian (jamak)", "saya", "kami", "dia (pr)"]],
      ["نَجَحَتْ أُخْتِي فِي الِامْتِحَانِ.", "Najahat ukhti fil imtihani.", "Kakakku lulus ujian."],
      ["رَجَعْنَا مِنَ الْمَسْجِدِ.", "Raja'na minal masjidi.", "Kami pulang dari masjid."],
    ],
    [
      ["دَرَسْتُ الْعَرَبِيَّةَ سَنَتَيْنِ ثُمَّ سَافَرْتُ إِلَى مِصْرَ.", "Darastul 'arabiyyata sanataini tsumma safartu ila Mishra.", "Saya belajar bahasa Arab dua tahun lalu pergi ke Mesir."],
      ["لَمَّا وَصَلْنَا، كَانَ الْقِطَارُ قَدْ غَادَرَ.", "Lamma washalna, kanal qitharu qad ghadara.", "Ketika kami tiba, kereta sudah berangkat."],
      ["الطَّالِبَاتُ كَتَبْنَ الْبَحْثَ مَعًا.", "Ath-thalibatu katabnal bahtsa ma'an.", "Para siswi menulis penelitian bersama.", ["Akhiran نَ dalam كَتَبْنَ menunjukkan pelaku...", "mereka (perempuan)", "kami", "kamu (pr)", "dia (lk)"]],
      ["أَمْسِ زَارَنَا جَدِّي وَأَحْضَرَ هَدَايَا.", "Amsi zarana jaddi wa ahdhara hadaya.", "Kemarin kakekku mengunjungi kami dan membawa hadiah."],
    ],
  ],
  // 14. Fi'il Mudhari'
  [
    [
      ["يَكْتُبُ", "Yaktubu", "dia (lk) sedang menulis"],
      ["تَشْرَبُ", "Tasyrabu", "kamu (lk) / dia (pr) minum"],
      ["نَدْرُسُ", "Nadrusu", "kami belajar", ["Huruf ن di awal نَدْرُسُ menunjukkan pelaku...", "kami", "dia (lk)", "kamu", "mereka"]],
      ["أَعْرِفُ", "A'rifu", "saya tahu"],
    ],
    [
      ["يَلْعَبُ الْأَطْفَالُ فِي الشَّارِعِ.", "Yal'abul athfalu fisy syari'i.", "Anak-anak bermain di jalan."],
      ["تَطْبُخُ أُمِّي الْأَرُزَّ.", "Tathbukhu ummil aruzza.", "Ibuku memasak nasi."],
      ["الطُّلَّابُ يَكْتُبُونَ الدَّرْسَ.", "Ath-thullabu yaktubunad darsa.", "Para siswa menulis pelajaran.", ["Akhiran ونَ dalam يَكْتُبُونَ menunjukkan...", "mereka (laki-laki, jamak)", "dia berdua", "kamu (pr)", "saya"]],
      ["أَنْتِ تَتَكَلَّمِينَ بِسُرْعَةٍ.", "Anti tatakallamina bisur'atin.", "Kamu (pr) berbicara dengan cepat."],
    ],
    [
      ["سَأُسَافِرُ إِلَى مَكَّةَ لِأَدَاءِ الْعُمْرَةِ.", "Sa'usafiru ila Makkata li'ada'il 'umrati.", "Saya akan bepergian ke Mekah untuk menunaikan umrah.", ["Huruf سَ di awal سَأُسَافِرُ bermakna...", "akan (masa depan dekat)", "tidak", "sudah", "jangan"]],
      ["يَدْرُسُ أَخِي الطِّبَّ وَيَعْمَلُ فِي الْمَسَاءِ.", "Yadrusu akhith thibba wa ya'malu fil masa'i.", "Kakakku belajar kedokteran dan bekerja di sore hari."],
      ["الْمُسْلِمُونَ يَصُومُونَ فِي شَهْرِ رَمَضَانَ.", "Al-muslimuna yashumuna fi syahri ramadhana.", "Kaum muslim berpuasa di bulan Ramadan."],
      ["لَنْ أَنْسَى هٰذَا الْيَوْمَ أَبَدًا.", "Lan ansa hadzal yauma abadan.", "Saya tidak akan pernah melupakan hari ini."],
    ],
  ],
  // 15. Fi'il Amr
  [
    [
      ["اكْتُبْ", "Uktub", "tulislah!"],
      ["اجْلِسْ", "Ijlis", "duduklah!", ["Fi'il amr dari يَجْلِسُ adalah...", "اجْلِسْ", "جَلَسَ", "جَالِسٌ", "مَجْلِسٌ"]],
      ["اسْمَعِي", "Isma'i", "dengarlah! (pr)"],
      ["قُومُوا", "Qumu", "berdirilah kalian!"],
    ],
    [
      ["افْتَحِ النَّافِذَةَ مِنْ فَضْلِكَ.", "Iftahin nafidzata min fadhlika.", "Tolong buka jendelanya."],
      ["اقْرَئِي الْقِصَّةَ بِصَوْتٍ عَالٍ.", "Iqra'il qishshata bishautin 'alin.", "Bacalah (pr) cerita itu dengan suara keras."],
      ["ادْرُسُوا جَيِّدًا قَبْلَ الِامْتِحَانِ.", "Udrusu jayyidan qablal imtihani.", "Belajarlah kalian dengan baik sebelum ujian.", ["Fi'il amr ادْرُسُوا ditujukan kepada...", "kalian (jamak lk)", "kamu (lk)", "kamu (pr)", "kalian berdua"]],
      ["تَعَالَ هُنَا يَا مُحَمَّدُ.", "Ta'ala huna ya Muhammadu.", "Kemarilah, wahai Muhammad."],
    ],
    [
      ["احْفَظْ لِسَانَكَ وَلَا تَتَكَلَّمْ إِلَّا بِخَيْرٍ.", "Ihfazh lisanaka wa la tatakallam illa bikhairin.", "Jagalah lisanmu dan jangan berbicara kecuali yang baik."],
      ["أَكْرِمُوا ضُيُوفَكُمْ وَأَحْسِنُوا إِلَى جِيرَانِكُمْ.", "Akrimu dhuyufakum wa ahsinu ila jiranikum.", "Muliakanlah tamu kalian dan berbuat baiklah kepada tetangga kalian."],
      ["خُذْ هٰذَا الدَّوَاءَ ثَلَاثَ مَرَّاتٍ يَوْمِيًّا.", "Khudz hadzad dawa'a tsalatsa marratin yaumiyyan.", "Minumlah obat ini tiga kali sehari."],
      ["سَاعِدَا أُمَّكُمَا فِي تَنْظِيفِ الْبَيْتِ.", "Sa'ida ummakuma fi tanzhifil baiti.", "Bantulah (kalian berdua) ibu kalian membersihkan rumah."],
    ],
  ],
  // 16. Negasi Laa
  [
    [
      ["لَا أَعْرِفُ", "La a'rifu", "saya tidak tahu"],
      ["لَا تَنَمْ", "La tanam", "jangan tidur!", ["لَا dalam لَا تَنَمْ adalah...", "la nahiyah (larangan)", "la nafiyah (peniadaan)", "la nafiyah lil jins", "bukan huruf"]],
      ["لَا بَأْسَ", "La ba'sa", "tidak apa-apa"],
      ["لَا رَيْبَ", "La raiba", "tidak ada keraguan"],
    ],
    [
      ["لَا أُحِبُّ الْقَهْوَةَ الْمُرَّةَ.", "La uhibbul qahwatal murrata.", "Saya tidak suka kopi pahit."],
      ["لَا تَلْعَبُوا فِي الشَّارِعِ.", "La tal'abu fisy syari'i.", "Jangan bermain di jalan."],
      ["لَا يَذْهَبُ أَبِي إِلَى الْعَمَلِ يَوْمَ الْأَحَدِ.", "La yadzhabu abi ilal 'amali yaumal ahadi.", "Ayahku tidak pergi bekerja pada hari Minggu."],
      ["لَا طَالِبَ فِي الْفَصْلِ الْآنَ.", "La thaliba fil fashli al-ana.", "Tidak ada seorang siswa pun di kelas sekarang.", ["Harakat طَالِبَ setelah لَا nafiyah lil jins adalah...", "fathah tanpa tanwin", "dhammah", "kasrah", "sukun"]],
    ],
    [
      ["لَا تُؤَجِّلْ عَمَلَ الْيَوْمِ إِلَى الْغَدِ.", "La tu'ajjil 'amalal yaumi ilal ghadi.", "Jangan menunda pekerjaan hari ini sampai besok."],
      ["لَا يَسْتَطِيعُ الْمَرِيضُ أَنْ يَمْشِيَ وَحْدَهُ.", "La yastathi'ul maridhu an yamsyiya wahdahu.", "Orang sakit itu tidak mampu berjalan sendirian."],
      ["لَا إِلٰهَ إِلَّا اللهُ مُحَمَّدٌ رَسُولُ اللهِ.", "La ilaha illallahu Muhammadun rasulullahi.", "Tiada tuhan selain Allah, Muhammad utusan Allah."],
      ["لَا تَحْزَنْ، إِنَّ مَعَ الْعُسْرِ يُسْرًا.", "La tahzan, inna ma'al 'usri yusran.", "Jangan bersedih, sesungguhnya bersama kesulitan ada kemudahan."],
    ],
  ],
  // 17. Negasi Maa
  [
    [
      ["مَا ذَهَبْتُ", "Ma dzahabtu", "saya tidak pergi"],
      ["مَا أَكَلَ", "Ma akala", "dia tidak makan", ["مَا dalam مَا أَكَلَ berfungsi sebagai...", "peniadaan (nafiyah)", "kata tanya", "isim maushul", "larangan"]],
      ["مَا فَهِمْنَا", "Ma fahimna", "kami tidak paham"],
      ["مَا نَامُوا", "Ma namu", "mereka tidak tidur"],
    ],
    [
      ["مَا حَضَرَ الْمُدَرِّسُ الْيَوْمَ.", "Ma hadharal mudarrisu al-yauma.", "Guru tidak hadir hari ini."],
      ["مَا رَأَيْتُ هٰذَا الْفِيلْمَ.", "Ma ra'aitu hadzal filma.", "Saya belum melihat film ini."],
      ["مَا هٰذَا بَشَرًا.", "Ma hadza basyaran.", "Ini bukan manusia.", ["مَا dalam مَا هٰذَا بَشَرًا beramal seperti...", "لَيْسَ (meniadakan, khabar manshub)", "لَا nahiyah", "هَلْ", "إِنَّ"]],
      ["مَا وَجَدْتُ الْمِفْتَاحَ فِي الْحَقِيبَةِ.", "Ma wajadtul miftaha fil haqibati.", "Saya tidak menemukan kunci di dalam tas."],
    ],
    [
      ["مَا كُنْتُ أَعْرِفُ أَنَّهُ مَرِيضٌ.", "Ma kuntu a'rifu annahu maridhun.", "Saya tidak tahu bahwa dia sakit."],
      ["مَا تَأَخَّرَ الْقِطَارُ إِلَّا خَمْسَ دَقَائِقَ.", "Ma ta'akhkharal qitharu illa khamsa daqa'iqa.", "Kereta hanya terlambat lima menit."],
      ["مَا ضَاعَ حَقٌّ وَرَاءَهُ مُطَالِبٌ.", "Ma dha'a haqqun wara'ahu muthalibun.", "Hak tidak akan hilang selama ada yang menuntutnya."],
      ["مَا نَجَحَ إِلَّا مَنِ اجْتَهَدَ.", "Ma najaha illa manijtahada.", "Tidak ada yang berhasil kecuali yang bersungguh-sungguh."],
    ],
  ],
  // 18. Urutan Kata
  [
    [
      ["قَامَ الْإِمَامُ", "Qamal imamu", "imam berdiri"],
      ["الْإِمَامُ قَامَ", "Al-imamu qama", "imam itu berdiri (diawali isim)", ["Perbedaan قَامَ الْإِمَامُ dan الْإِمَامُ قَامَ adalah...", "jenis kalimatnya (fi'liyyah vs ismiyyah)", "artinya berlawanan", "yang kedua salah", "waktunya berbeda"]],
      ["فِي الْبَيْتِ رَجُلٌ", "Fil baiti rajulun", "di rumah ada seorang pria"],
      ["عِنْدِي سُؤَالٌ", "'Indi su'alun", "saya punya pertanyaan"],
    ],
    [
      ["ذَهَبَ الطُّلَّابُ إِلَى الْمَتْحَفِ.", "Dzahabath thullabu ilal mathafi.", "Para siswa pergi ke museum.", ["Dalam ذَهَبَ الطُّلَّابُ, mengapa fiil tetap mufrad padahal pelakunya jamak?", "karena fiil di depan pelaku tetap mufrad", "karena salah ketik", "karena pelakunya muannats", "karena kalimatnya ismiyyah"]],
      ["الطُّلَّابُ ذَهَبُوا إِلَى الْمَتْحَفِ.", "Ath-thullabu dzahabu ilal mathafi.", "Para siswa itu pergi ke museum (diawali isim)."],
      ["فِي الْفَصْلِ سَبُّورَةٌ جَدِيدَةٌ.", "Fil fashli sabburatun jadidatun.", "Di kelas ada papan tulis baru."],
      ["أَكَلَ الْقِطُّ السَّمَكَةَ.", "Akalal qiththus samakata.", "Kucing itu memakan ikan."],
    ],
    [
      ["إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ.", "Iyyaka na'budu wa iyyaka nasta'inu.", "Hanya kepada-Mu kami menyembah dan hanya kepada-Mu kami memohon pertolongan.", ["Maf'ul bih إِيَّاكَ didahulukan untuk...", "pengkhususan (hanya)", "pertanyaan", "larangan", "masa lampau"]],
      ["فِي الْمَكْتَبَةِ كُتُبٌ نَادِرَةٌ لَا تُوجَدُ فِي غَيْرِهَا.", "Fil maktabati kutubun nadiratun la tujadu fi ghairiha.", "Di perpustakaan ada buku-buku langka yang tidak ada di tempat lain."],
      ["كَتَبَ الرِّسَالَةَ الطَّالِبُ الْجَدِيدُ.", "Katabar risalatath thalibul jadidu.", "Yang menulis surat itu adalah siswa baru."],
      ["أَمَامَ الْبَيْتِ حَدِيقَةٌ صَغِيرَةٌ مَلِيئَةٌ بِالْوُرُودِ.", "Amamal baiti hadiqatun shaghiratun mali'atun bil wurudi.", "Di depan rumah ada taman kecil yang penuh bunga mawar."],
    ],
  ],
  // 19. Kalimat Sederhana
  [
    [
      ["أَنَا جَائِعٌ", "Ana ja'i'un", "saya lapar"],
      ["هُوَ مَرِيضٌ", "Huwa maridhun", "dia sakit"],
      ["نَحْنُ مُسْتَعِدُّونَ", "Nahnu musta'idduna", "kami siap", ["Mengapa مُسْتَعِدُّونَ berakhiran ونَ?", "karena mubtadanya نَحْنُ (jamak)", "karena muannats", "karena fiil", "karena majrur"]],
      ["الْبَابُ مُغْلَقٌ", "Al-babu mughlaqun", "pintunya tertutup"],
    ],
    [
      ["أَدْرُسُ فِي الْجَامِعَةِ كُلَّ يَوْمٍ.", "Adrusu fil jami'ati kulla yaumin.", "Saya belajar di universitas setiap hari."],
      ["عِنْدَنَا امْتِحَانٌ غَدًا.", "'Indana imtihanun ghadan.", "Kami ada ujian besok."],
      ["أُحِبُّ أَنْ أَقْرَأَ قَبْلَ النَّوْمِ.", "Uhibbu an aqra'a qablan naumi.", "Saya suka membaca sebelum tidur.", ["Mengapa أَقْرَأَ berharakat fathah di akhir?", "karena didahului أَنْ (manshub)", "karena lampau", "karena majrur", "karena perintah"]],
      ["بَيْتِي قَرِيبٌ مِنَ الْمَسْجِدِ.", "Baiti qaribun minal masjidi.", "Rumahku dekat dengan masjid."],
    ],
    [
      ["أَسْتَيْقِظُ مُبَكِّرًا وَأُصَلِّي ثُمَّ أَذْهَبُ إِلَى الْعَمَلِ.", "Astaiqizhu mubakkiran wa ushalli tsumma adzhabu ilal 'amali.", "Saya bangun pagi, salat, lalu pergi bekerja."],
      ["أَخِي الصَّغِيرُ يُحِبُّ الرَّسْمَ كَثِيرًا.", "Akhish shaghiru yuhibbur rasma katsiran.", "Adik laki-lakiku sangat suka menggambar."],
      ["إِذَا اجْتَهَدْتَ نَجَحْتَ.", "Idzajtahadta najahta.", "Jika kamu bersungguh-sungguh, kamu berhasil."],
      ["كَانَ الْجَوُّ بَارِدًا فَلَبِسْتُ الْمِعْطَفَ.", "Kanal jawwu baridan falabistul mi'thafa.", "Cuacanya dingin, maka saya memakai mantel.", ["Mengapa بَارِدًا manshub setelah كَانَ?", "karena menjadi khabar كَانَ", "karena maf'ul bih", "karena hal", "karena majrur"]],
    ],
  ],
  // 20. Review Nahwu Pemula
  [
    [
      ["هٰذِهِ مَدْرَسَتِي", "Hadzihi madrasati", "ini sekolahku"],
      ["تِلْكَ أُمُّهُ", "Tilka ummuhu", "itu ibunya"],
      ["هُمَا أَخَوَانِ", "Huma akhawani", "mereka berdua bersaudara", ["Dhamir هُمَا dipakai untuk...", "mereka berdua", "kalian", "kami", "dia (pr)"]],
      ["صَدِيقُكَ هُنَا", "Shadiquka huna", "temanmu ada di sini"],
    ],
    [
      ["هٰذَا الطَّالِبُ يَدْرُسُ فِي مَكْتَبَةِ الْمَدْرَسَةِ.", "Hadzath thalibu yadrusu fi maktabatil madrasati.", "Siswa ini belajar di perpustakaan sekolah."],
      ["لَا تَأْكُلْ فِي الْفَصْلِ.", "La ta'kul fil fashli.", "Jangan makan di kelas."],
      ["مَا ذَهَبْنَا إِلَى السُّوقِ أَمْسِ.", "Ma dzahabna ilas suqi amsi.", "Kami tidak pergi ke pasar kemarin."],
      ["أَيْنَ مِفْتَاحُ الْغُرْفَةِ؟", "Aina miftahul ghurfati?", "Di mana kunci kamar?", ["مِفْتَاحُ الْغُرْفَةِ adalah contoh...", "idhafah", "na'at-man'ut", "jumlah fi'liyyah", "jar-majrur"]],
    ],
    [
      ["هٰؤُلَاءِ الطُّلَّابُ الْجُدُدُ جَاءُوا مِنْ بُلْدَانٍ مُخْتَلِفَةٍ.", "Ha'ula'ith thullabul jududu ja'u min buldanin mukhtalifatin.", "Para siswa baru ini datang dari negara-negara yang berbeda."],
      ["كَتَبَتِ الْمُعَلِّمَةُ الدَّرْسَ عَلَى السَّبُّورَةِ فَنَقَلْنَاهُ فِي دَفَاتِرِنَا.", "Katabatil mu'allimatud darsa 'alas sabburati fanaqalnahu fi dafatirina.", "Guru (pr) menulis pelajaran di papan, lalu kami menyalinnya di buku kami."],
      ["لَا تَنْسَ أَنْ تُغْلِقَ بَابَ السَّيَّارَةِ.", "La tansa an tughliqa babas sayyarati.", "Jangan lupa menutup pintu mobil."],
      ["مَا سَافَرَ أَبِي لِأَنَّ الطَّقْسَ كَانَ سَيِّئًا.", "Ma safara abi li'annath thaqsa kana sayyi'an.", "Ayahku tidak bepergian karena cuacanya buruk."],
    ],
  ],
];
