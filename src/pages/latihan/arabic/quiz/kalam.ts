import type { QuizTopic } from './types';

// Latihan Kalam — one entry per topic (index = topic - 1): [Basic, Intermediate, Advanced].
export const kalam: QuizTopic[] = [
  // 1. Salam dan Sapaan
  [
    [
      ["السَّلَامُ عَلَيْكَ", "Assalamu 'alaika", "semoga keselamatan atasmu (satu orang)"],
      ["وَعَلَيْكَ السَّلَامُ", "Wa 'alaikas salamu", "dan atasmu juga keselamatan", ["Jawaban yang tepat untuk السَّلَامُ عَلَيْكَ adalah...", "وَعَلَيْكَ السَّلَامُ", "صَبَاحَ النُّورِ", "عَفْوًا", "إِلَى اللِّقَاءِ"]],
      ["صَبَاحَ النُّورِ", "Shabahan nuri", "selamat pagi juga"],
      ["مَسَاءَ الْخَيْرِ يَا عَمِّي", "Masa'al khairi ya 'ammi", "selamat sore, Paman"],
    ],
    [
      ["أَهْلًا يَا سَارَةُ، مُنْذُ زَمَنٍ لَمْ أَرَكِ!", "Ahlan ya Saratu, mundzu zamanin lam araki!", "Halo Sarah, sudah lama aku tidak melihatmu!"],
      ["أَهْلًا وَسَهْلًا، تَفَضَّلْ بِالدُّخُولِ.", "Ahlan wa sahlan, tafadhdhal bid dukhuli.", "Selamat datang, silakan masuk."],
      ["نَهَارُكَ سَعِيدٌ.", "Naharuka sa'idun.", "Semoga harimu menyenangkan.", ["Balasan yang tepat untuk نَهَارُكَ سَعِيدٌ adalah...", "وَنَهَارُكَ سَعِيدٌ أَيْضًا", "وَعَلَيْكُمُ السَّلَامُ", "لَا بَأْسَ", "بِكَمْ هٰذَا؟"]],
      ["مَعَ السَّلَامَةِ، أَرَاكُمْ بَعْدَ الدَّرْسِ.", "Ma'as salamati, arakum ba'dad darsi.", "Selamat tinggal, sampai jumpa setelah pelajaran."],
    ],
    [
      ["السَّلَامُ عَلَيْكُمْ يَا جَمَاعَةُ، هَلْ تَأَخَّرْتُ كَثِيرًا؟", "Assalamu 'alaikum ya jama'atu, hal ta'akhkhartu katsiran?", "Assalamualaikum semuanya, apakah aku sangat terlambat?"],
      ["أَهْلًا بِكَ يَا أَخِي، لَا، وَصَلْتَ فِي الْوَقْتِ الْمُنَاسِبِ.", "Ahlan bika ya akhi, la, washalta fil waqtil munasibi.", "Selamat datang, saudaraku, tidak, kamu tiba tepat waktu."],
      ["صَبَاحُ الْخَيْرِ يَا أُسْتَاذُ، كَيْفَ كَانَتْ إِجَازَتُكَ؟", "Shabahul khairi ya ustadzu, kaifa kanat ijazatuka?", "Selamat pagi, Pak Guru, bagaimana liburan Anda?"],
      ["تُصْبِحُونَ عَلَى خَيْرٍ، نَلْتَقِي فِي الصَّبَاحِ.", "Tushbihuna 'ala khairin, naltaqi fish shabahi.", "Selamat tidur semuanya, kita bertemu pagi nanti."],
    ],
  ],
  // 2. Memperkenalkan Nama
  [
    [
      ["اسْمِي عُمَرُ", "Ismi 'Umaru", "nama saya Umar"],
      ["مَا اسْمُكَ؟", "Masmuka?", "siapa namamu? (lk)", ["Jawaban yang tepat untuk مَا اسْمُكَ؟ adalah...", "اسْمِي أَحْمَدُ", "أَنَا بِخَيْرٍ", "مِنْ جَاكَرْتَا", "شُكْرًا"]],
      ["تَشَرَّفْنَا", "Tasyarrafna", "senang berkenalan"],
      ["أَنَا اسْمِي نُورٌ", "Ana ismi Nurun", "nama saya Nur"],
    ],
    [
      ["اسْمِي رِضْوَانُ، وَأَنَا طَالِبٌ جَدِيدٌ.", "Ismi Ridhwanu, wa ana thalibun jadidun.", "Nama saya Ridwan, dan saya siswa baru."],
      ["هٰذَا صَدِيقِي، اسْمُهُ حَسَنٌ.", "Hadza shadiqi, ismuhu Hasanun.", "Ini temanku, namanya Hasan."],
      ["مَا اسْمُ أُخْتِكَ؟", "Masmu ukhtika?", "Siapa nama saudara perempuanmu?"],
      ["فُرْصَةٌ سَعِيدَةٌ.", "Fursatun sa'idatun.", "Senang bertemu (kesempatan yang membahagiakan).", ["Ungkapan فُرْصَةٌ سَعِيدَةٌ diucapkan saat...", "baru berkenalan", "meminta maaf", "menawar harga", "berpamitan tidur"]],
    ],
    [
      ["أُقَدِّمُ لَكُمْ نَفْسِي: اسْمِي سَلْمَى، وَعُمْرِي عِشْرُونَ سَنَةً.", "Uqaddimu lakum nafsi: ismi Salma, wa 'umri 'isyruna sanatan.", "Saya perkenalkan diri: nama saya Salma, dan umur saya dua puluh tahun."],
      ["اسْمِي الْكَامِلُ مُحَمَّد رِضَا، لٰكِنْ يُنَادُونَنِي رِضَا.", "Ismiyal kamilu Muhammad Ridha, lakin yunadunani Ridha.", "Nama lengkap saya Muhammad Ridha, tetapi mereka memanggil saya Ridha."],
      ["هَلْ يُمْكِنُ أَنْ تُكَرِّرَ اسْمَكَ؟ لَمْ أَسْمَعْهُ جَيِّدًا.", "Hal yumkinu an tukarrirasmaka? Lam asma'hu jayyidan.", "Bisakah kamu ulangi namamu? Saya tidak mendengarnya dengan baik."],
      ["سُرِرْتُ بِلِقَائِكَ، وَأَرْجُو أَنْ نَكُونَ أَصْدِقَاءَ.", "Surirtu biliqa'ika, wa arju an nakuna ashdiqa'a.", "Saya senang bertemu denganmu, dan berharap kita bisa berteman."],
    ],
  ],
  // 3. Asal Negara
  [
    [
      ["مِنْ أَيْنَ أَنْتَ؟", "Min aina anta?", "kamu dari mana? (lk)", ["Jawaban yang tepat untuk مِنْ أَيْنَ أَنْتَ؟ adalah...", "أَنَا مِنْ إِنْدُونِيسِيَا", "أَنَا طَالِبٌ", "اسْمِي عَلِيٌّ", "أَنَا بِخَيْرٍ"]],
      ["أَنَا مِنْ بَانْدُونْغَ", "Ana min Bandung", "saya dari Bandung"],
      ["هُوَ عِرَاقِيٌّ", "Huwa 'iraqiyyun", "dia orang Irak"],
      ["نَحْنُ آسِيَوِيُّونَ", "Nahnu asiyawiyyuna", "kami orang Asia"],
    ],
    [
      ["أَنَا مِنْ مَدِينَةِ مَيْدَانَ فِي سُومَطْرَةَ.", "Ana min madinati Medan fi Sumathrata.", "Saya dari kota Medan di Sumatra."],
      ["هَلْ أَنْتِ مِنْ لُبْنَانَ؟ لَا، أَنَا مِنْ سُورِيَا.", "Hal anti min Lubnana? La, ana min Suriya.", "Apakah kamu dari Lebanon? Tidak, saya dari Suriah."],
      ["عَاصِمَةُ بَلَدِي جَاكَرْتَا.", "'Ashimatu baladi Jakarta.", "Ibu kota negaraku Jakarta."],
      ["أَيْنَ تَقَعُ بِلَادُكَ؟", "Aina taqa'u biladuka?", "Di mana letak negaramu?", ["Pertanyaan أَيْنَ تَقَعُ بِلَادُكَ؟ menanyakan...", "letak negara", "nama negara", "bahasa negara", "jumlah penduduk"]],
    ],
    [
      ["وُلِدْتُ فِي يُوغْيَاكَرْتَا لٰكِنِّي أَسْكُنُ الْآنَ فِي الرِّيَاضِ.", "Wulidtu fi Yogyakarta lakinni askunul ana fir riyadhi.", "Saya lahir di Yogyakarta tetapi sekarang tinggal di Riyadh."],
      ["بِلَادِي جُزُرٌ كَثِيرَةٌ، وَأَكْبَرُهَا كَالِيمَانْتَانُ.", "Biladi juzurun katsiratun, wa akbaruha Kalimantanu.", "Negaraku terdiri dari banyak pulau, dan yang terbesar Kalimantan."],
      ["أَبِي مِنْ مِصْرَ وَأُمِّي مِنْ إِنْدُونِيسِيَا، فَأَنَا أَتَكَلَّمُ اللُّغَتَيْنِ.", "Abi min Mishra wa ummi min Indunisiya, fa ana atakallamul lughataini.", "Ayahku dari Mesir dan ibuku dari Indonesia, jadi saya berbicara dua bahasa."],
      ["هَلْ زُرْتَ بَلَدًا عَرَبِيًّا مِنْ قَبْلُ؟", "Hal zurta baladan 'arabiyyan min qablu?", "Apakah kamu pernah mengunjungi negara Arab sebelumnya?"],
    ],
  ],
  // 4. Menanyakan Kabar
  [
    [
      ["كَيْفَ الْحَالُ؟", "Kaifal halu?", "apa kabar?"],
      ["بِخَيْرٍ، وَأَنْتَ؟", "Bikhairin, wa anta?", "baik, kalau kamu?"],
      ["لَسْتُ بِخَيْرٍ", "Lastu bikhairin", "saya tidak baik", ["Jika temanmu berkata لَسْتُ بِخَيْرٍ, respons yang tepat adalah...", "سَلَامَتُكَ، مَاذَا حَدَثَ؟", "مَبْرُوكٌ!", "أَهْلًا وَسَهْلًا", "بِكَمْ؟"]],
      ["مَاشِي الْحَالُ", "Masyil halu", "lumayan / biasa saja"],
    ],
    [
      ["كَيْفَ حَالُكِ يَا أُمِّي؟", "Kaifa haluki ya ummi?", "Bagaimana kabarmu, Ibu?"],
      ["أَنَا بِخَيْرٍ وَلِلّٰهِ الْحَمْدُ.", "Ana bikhairin wa lillahil hamdu.", "Saya baik, segala puji bagi Allah."],
      ["سَلَامَتُكَ، أَتَمَنَّى لَكَ الشِّفَاءَ.", "Salamatuka, atamanna lakasy syifa'a.", "Semoga lekas sembuh, saya doakan kesembuhanmu.", ["Ungkapan سَلَامَتُكَ diucapkan kepada orang yang...", "sakit", "menikah", "lulus ujian", "baru datang"]],
      ["كَيْفَ حَالُ الدِّرَاسَةِ؟", "Kaifa halud dirasati?", "Bagaimana kuliahnya?"],
    ],
    [
      ["الْحَمْدُ لِلّٰهِ، كُلُّ شَيْءٍ عَلَى مَا يُرَامُ.", "Alhamdu lillahi, kullu syai'in 'ala ma yuramu.", "Alhamdulillah, semuanya baik-baik saja."],
      ["أَنَا مُتْعَبَةٌ قَلِيلًا بِسَبَبِ الِامْتِحَانَاتِ.", "Ana mut'abatun qalilan bisababil imtihanati.", "Saya (pr) sedikit lelah karena ujian."],
      ["طَمِّنِّي عَلَيْكَ، هَلْ وَصَلْتَ بِسَلَامٍ؟", "Thammin-ni 'alaika, hal washalta bisalamin?", "Kabari aku, apakah kamu tiba dengan selamat?"],
      ["أَخْبِرْنِي عَنْ أَحْوَالِكَ فِي الْعَمَلِ الْجَدِيدِ.", "Akhbirni 'an ahwalika fil 'amalil jadidi.", "Ceritakan kepadaku keadaanmu di pekerjaan baru."],
    ],
  ],
  // 5. Ucapan Terima Kasih
  [
    [
      ["شُكْرًا جَزِيلًا", "Syukran jazilan", "terima kasih banyak", ["Balasan yang tepat untuk شُكْرًا جَزِيلًا adalah...", "الْعَفْوُ", "وَعَلَيْكُمُ السَّلَامُ", "صَبَاحَ النُّورِ", "مَعَ السَّلَامَةِ"]],
      ["الْعَفْوُ", "Al-'afwu", "sama-sama"],
      ["جَزَاكَ اللهُ خَيْرًا", "Jazakallahu khairan", "semoga Allah membalasmu dengan kebaikan"],
      ["وَإِيَّاكَ", "Wa iyyaka", "dan kamu juga"],
    ],
    [
      ["شُكْرًا عَلَى الْهَدِيَّةِ الْجَمِيلَةِ.", "Syukran 'alal hadiyyatil jamilati.", "Terima kasih atas hadiah yang indah."],
      ["أَشْكُرُكَ عَلَى مُسَاعَدَتِكَ.", "Asykuruka 'ala musa'adatika.", "Saya berterima kasih atas bantuanmu."],
      ["لَا شُكْرَ عَلَى وَاجِبٍ.", "La syukra 'ala wajibin.", "Tidak perlu berterima kasih atas kewajiban.", ["لَا شُكْرَ عَلَى وَاجِبٍ adalah balasan saat seseorang...", "berterima kasih", "meminta maaf", "memberi salam", "bertanya arah"]],
      ["شُكْرًا لَكُمْ عَلَى حُسْنِ الِاسْتِقْبَالِ.", "Syukran lakum 'ala husnil istiqbali.", "Terima kasih atas sambutan yang baik."],
    ],
    [
      ["لَا أَعْرِفُ كَيْفَ أَشْكُرُكَ، لَوْلَاكَ لَمَا نَجَحْتُ.", "La a'rifu kaifa asykuruka, laulaka lama najahtu.", "Saya tidak tahu bagaimana berterima kasih, tanpamu saya tidak akan berhasil."],
      ["أَتَقَدَّمُ بِالشُّكْرِ لِكُلِّ مَنْ سَاعَدَنِي فِي هٰذَا الْمَشْرُوعِ.", "Ataqaddamu bisy syukri likulli man sa'adani fi hadzal masyru'i.", "Saya menyampaikan terima kasih kepada semua yang membantu saya dalam proyek ini."],
      ["بَارَكَ اللهُ فِيكَ عَلَى هٰذِهِ النَّصِيحَةِ الْمُفِيدَةِ.", "Barakallahu fika 'ala hadzihin nashihatil mufidati.", "Semoga Allah memberkahimu atas nasihat yang bermanfaat ini."],
      ["كَانَتْ زِيَارَتُكُمْ شَرَفًا لَنَا، شُكْرًا مِنَ الْقَلْبِ.", "Kanat ziyaratukum syarafan lana, syukran minal qalbi.", "Kunjungan kalian adalah kehormatan bagi kami, terima kasih dari hati."],
    ],
  ],
  // 6. Permintaan Maaf
  [
    [
      ["آسِفٌ", "Asifun", "maaf (lk)"],
      ["آسِفَةٌ", "Asifatun", "maaf (pr)", ["Perempuan yang meminta maaf mengatakan...", "آسِفَةٌ", "آسِفٌ", "آسِفُونَ", "أَسَفٌ"]],
      ["لَا بَأْسَ عَلَيْكَ", "La ba'sa 'alaika", "tidak apa-apa"],
      ["سَامِحْنِي", "Samihni", "maafkan aku"],
    ],
    [
      ["آسِفٌ عَلَى التَّأْخِيرِ.", "Asifun 'alat ta'khiri.", "Maaf atas keterlambatannya."],
      ["عُذْرًا، لَمْ أَقْصِدْ ذٰلِكَ.", "'Udzran, lam aqshid dzalika.", "Maaf, saya tidak bermaksud begitu."],
      ["أَعْتَذِرُ عَنْ كَسْرِ الْكُوبِ.", "A'tadziru 'an kasril kubi.", "Saya minta maaf karena memecahkan gelas."],
      ["مُسَامَحٌ، لَا تَقْلَقْ.", "Musamahun, la taqlaq.", "Dimaafkan, jangan khawatir.", ["Respons مُسَامَحٌ menunjukkan bahwa...", "permintaan maaf diterima", "dia marah", "dia sedang sakit", "dia tidak mendengar"]],
    ],
    [
      ["أَعْتَذِرُ عَنْ عَدَمِ الْحُضُورِ أَمْسِ، كُنْتُ مَرِيضًا.", "A'tadziru 'an 'adamil hudhuri amsi, kuntu maridhan.", "Saya minta maaf tidak hadir kemarin, saya sakit."],
      ["آسِفَةٌ جِدًّا، نَسِيتُ مَوْعِدَنَا تَمَامًا.", "Asifatun jiddan, nasitu mau'idana tamaman.", "Maaf sekali, saya benar-benar lupa janji kita."],
      ["أَرْجُو أَنْ تَقْبَلَ اعْتِذَارِي، لَنْ يَتَكَرَّرَ هٰذَا.", "Arju an taqbala'tidzari, lan yatakarrara hadza.", "Saya harap kamu menerima permintaan maafku, ini tidak akan terulang."],
      ["لَا عَلَيْكَ، كُلُّنَا نُخْطِئُ أَحْيَانًا.", "La 'alaika, kulluna nukhthi'u ahyanan.", "Tidak apa-apa, kita semua kadang berbuat salah."],
    ],
  ],
  // 7. Izin dan Permisi
  [
    [
      ["مِنْ فَضْلِكَ", "Min fadhlika", "tolong / silakan (lk)"],
      ["لَوْ سَمَحْتَ", "Lau samahta", "permisi / kalau boleh"],
      ["هَلْ يُمْكِنُ؟", "Hal yumkinu?", "bolehkah?"],
      ["تَفَضَّلِي", "Tafadhdhali", "silakan (pr)", ["Kata تَفَضَّلِي ditujukan kepada...", "perempuan", "laki-laki", "banyak orang", "dua orang"]],
    ],
    [
      ["هَلْ يُمْكِنُنِي أَنْ أَدْخُلَ؟", "Hal yumkinuni an adkhula?", "Bolehkah saya masuk?", ["Jawaban yang mengizinkan adalah...", "نَعَمْ، تَفَضَّلْ", "لَا شُكْرًا", "مَعَ السَّلَامَةِ", "أَنَا آسِفٌ"]],
      ["لَوْ سَمَحْتَ، أَيْنَ دَوْرَةُ الْمِيَاهِ؟", "Lau samahta, aina dauratul miyahi?", "Permisi, di mana toilet?"],
      ["أَسْتَأْذِنُكَ، يَجِبُ أَنْ أَذْهَبَ الْآنَ.", "Asta'dzinuka, yajibu an adzhabal ana.", "Saya mohon izin, saya harus pergi sekarang."],
      ["هَلْ تَسْمَحُ لِي بِاسْتِخْدَامِ قَلَمِكَ؟", "Hal tasmahu li bistikhdami qalamika?", "Apakah kamu mengizinkan saya memakai penamu?"],
    ],
    [
      ["يَا أُسْتَاذُ، هَلْ تَسْمَحُ لِي بِالْخُرُوجِ لِلْحَظَاتٍ؟", "Ya ustadzu, hal tasmahu li bil khuruji lilahazhatin?", "Pak Guru, apakah Anda mengizinkan saya keluar sebentar?"],
      ["عَفْوًا، هَلْ هٰذَا الْمَقْعَدُ مَحْجُوزٌ؟", "'Afwan, hal hadzal maq'adu mahjuzun?", "Maaf, apakah kursi ini sudah dipesan?"],
      ["مِنْ فَضْلِكَ، هَلْ يُمْكِنُ أَنْ تُخَفِّضَ صَوْتَ الْمُوسِيقَى؟", "Min fadhlika, hal yumkinu an tukhaffidha shautal musiqa?", "Tolong, bisakah kamu mengecilkan suara musik?"],
      ["أَسْتَأْذِنُكُمْ فِي الِانْصِرَافِ، فَعِنْدِي مَوْعِدٌ مُهِمٌّ.", "Asta'dzinukum fil inshirafi, fa'indi mau'idun muhimmun.", "Saya mohon izin pamit, karena saya punya janji penting."],
    ],
  ],
  // 8. Keluarga Dekat
  [
    [
      ["وَالِدِي", "Walidi", "ayahku (formal)"],
      ["وَالِدَتِي", "Walidati", "ibuku (formal)"],
      ["ابْنَتِي", "Ibnati", "anak perempuanku"],
      ["إِخْوَتِي", "Ikhwati", "saudara-saudaraku", ["Kata إِخْوَتِي adalah bentuk jamak dari...", "أَخِي", "أُخْتِي", "ابْنِي", "أَبِي"]],
    ],
    [
      ["كَمْ أَخًا عِنْدَكَ؟", "Kam akhan 'indaka?", "Berapa saudara laki-laki yang kamu punya?", ["Jawaban yang tepat untuk كَمْ أَخًا عِنْدَكَ؟ adalah...", "عِنْدِي أَخَوَانِ", "أَخِي طَبِيبٌ", "اسْمُ أَخِي عَلِيٌّ", "أَخِي فِي الْبَيْتِ"]],
      ["أَنَا الِابْنُ الْأَصْغَرُ فِي أُسْرَتِي.", "Anal ibnul ashgharu fi usrati.", "Saya anak bungsu di keluargaku."],
      ["وَالِدِي يَعْمَلُ فِي شَرِكَةٍ.", "Walidi ya'malu fi syarikatin.", "Ayahku bekerja di sebuah perusahaan."],
      ["زَوْجِي مُدَرِّسُ لُغَةٍ.", "Zauji mudarrisu lughatin.", "Suamiku guru bahasa."],
    ],
    [
      ["أُسْرَتِي كَبِيرَةٌ: أَبِي وَأُمِّي وَخَمْسَةُ إِخْوَةٍ.", "Usrati kabiratun: abi wa ummi wa khamsatu ikhwatin.", "Keluargaku besar: ayah, ibu, dan lima saudara."],
      ["أُخْتِي الْكُبْرَى مُتَزَوِّجَةٌ وَتَسْكُنُ فِي مَدِينَةٍ أُخْرَى.", "Ukhtiyal kubra mutazawwijatun wa taskunu fi madinatin ukhra.", "Kakak perempuan sulungku sudah menikah dan tinggal di kota lain."],
      ["أَتَّصِلُ بِوَالِدَيَّ كُلَّ يَوْمٍ لِأَطْمَئِنَّ عَلَيْهِمَا.", "Attashilu biwalidayya kulla yaumin litathma'inna 'alaihima.", "Saya menelepon kedua orang tuaku setiap hari untuk memastikan keadaan mereka."],
      ["مَنْ أَقْرَبُ شَخْصٍ إِلَيْكَ فِي عَائِلَتِكَ؟", "Man aqrabu syakhshin ilaika fi 'a'ilatika?", "Siapa orang yang paling dekat denganmu di keluargamu?"],
    ],
  ],
  // 9. Benda di Kelas
  [
    [
      ["مَا هٰذِهِ؟", "Ma hadzihi?", "apa ini? (benda muannats)"],
      ["هٰذِهِ مِسْطَرَةٌ", "Hadzihi mistharatun", "ini penggaris", ["Jawaban yang tepat untuk مَا هٰذِهِ؟ (sambil menunjuk penggaris) adalah...", "هٰذِهِ مِسْطَرَةٌ", "هٰذَا مِسْطَرَةٌ", "هُوَ مِسْطَرَةٌ", "تِلْكَ قَلَمٌ"]],
      ["عِنْدِي مُعْجَمٌ", "'Indi mu'jamun", "saya punya kamus"],
      ["لَيْسَ عِنْدِي قَلَمٌ", "Laisa 'indi qalamun", "saya tidak punya pena"],
    ],
    [
      ["هَلْ عِنْدَكَ مِمْحَاةٌ؟", "Hal 'indaka mimhatun?", "Apakah kamu punya penghapus?"],
      ["نَعَمْ، تَفَضَّلْ هٰذِهِ الْمِمْحَاةَ.", "Na'am, tafadhdhal hadzihil mimhata.", "Ya, silakan ini penghapusnya."],
      ["أَيْنَ وَضَعْتَ كِتَابِي؟", "Aina wadha'ta kitabi?", "Di mana kamu menaruh bukuku?"],
      ["هٰذَا الْقَلَمُ لِي وَذٰلِكَ لَكَ.", "Hadzal qalamu li wa dzalika laka.", "Pena ini milikku dan itu milikmu.", ["Kata لِي dalam kalimat ini bermakna...", "milikku", "untukmu", "di sini", "lagi"]],
    ],
    [
      ["هَلْ يُمْكِنُ أَنْ تُعِيرَنِي دَفْتَرَكَ؟ أُرِيدُ أَنْ أَنْقُلَ الدَّرْسَ.", "Hal yumkinu an tu'irani daftaraka? Uridu an anqulad darsa.", "Bisakah kamu meminjamkan buku tulismu? Saya ingin menyalin pelajaran."],
      ["لَا أَجِدُ حَقِيبَتِي، هَلْ رَآهَا أَحَدٌ؟", "La ajidu haqibati, hal ra'aha ahadun?", "Saya tidak menemukan tasku, apakah ada yang melihatnya?"],
      ["الْحَاسُوبُ الَّذِي فِي الْفَصْلِ لَا يَعْمَلُ مُنْذُ أُسْبُوعٍ.", "Al-hasubul ladzi fil fashli la ya'malu mundzu usbu'in.", "Komputer yang ada di kelas tidak berfungsi sejak seminggu."],
      ["سَأُعِيدُ لَكَ الْكِتَابَ بَعْدَ أَنْ أَقْرَأَهُ.", "Sa'u'idu lakal kitaba ba'da an aqra'ahu.", "Saya akan mengembalikan bukumu setelah saya membacanya."],
    ],
  ],
  // 10. Aktivitas Harian
  [
    [
      ["أَسْتَيْقِظُ مُبَكِّرًا", "Astaiqizhu mubakkiran", "saya bangun pagi"],
      ["أُفْطِرُ", "Ufthiru", "saya sarapan"],
      ["أَذْهَبُ إِلَى الْعَمَلِ", "Adzhabu ilal 'amali", "saya pergi bekerja"],
      ["أَرْتَاحُ قَلِيلًا", "Artahu qalilan", "saya istirahat sebentar", ["Jika ditanya مَاذَا تَفْعَلُ بَعْدَ الْغَدَاءِ؟, jawaban yang cocok...", "أَرْتَاحُ قَلِيلًا", "أَسْتَيْقِظُ مُبَكِّرًا", "اسْمِي حَسَنٌ", "أَنَا مِنْ مِصْرَ"]],
    ],
    [
      ["مَاذَا تَفْعَلُ فِي الصَّبَاحِ؟", "Madza taf'alu fish shabahi?", "Apa yang kamu lakukan di pagi hari?"],
      ["أَقْرَأُ الْجَرِيدَةَ وَأَشْرَبُ الشَّايَ.", "Aqra'ul jaridata wa asyrabusy syaya.", "Saya membaca koran dan minum teh."],
      ["مَتَى تَرْجِعُ إِلَى الْبَيْتِ؟", "Mata tarji'u ilal baiti?", "Kapan kamu pulang ke rumah?"],
      ["أُرَاجِعُ دُرُوسِي كُلَّ مَسَاءٍ.", "Uraji'u durusi kulla masa'in.", "Saya mengulang pelajaranku setiap sore."],
    ],
    [
      ["بَعْدَ صَلَاةِ الْفَجْرِ أَمْشِي نِصْفَ سَاعَةٍ ثُمَّ أَسْتَحِمُّ.", "Ba'da shalatil fajri amsyi nishfa sa'atin tsumma astahimmu.", "Setelah salat Subuh saya berjalan setengah jam lalu mandi."],
      ["فِي عُطْلَةِ نِهَايَةِ الْأُسْبُوعِ أُسَاعِدُ أُمِّي فِي الْمَطْبَخِ.", "Fi 'uthlati nihayatil usbu'i usa'idu ummi fil mathbakhi.", "Saat libur akhir pekan saya membantu ibu di dapur."],
      ["يَوْمِي مَشْغُولٌ جِدًّا، أَعْمَلُ مِنَ الصَّبَاحِ إِلَى الْمَسَاءِ.", "Yaumi masygulun jiddan, a'malu minash shabahi ilal masa'i.", "Hariku sangat sibuk, saya bekerja dari pagi sampai sore."],
      ["قَبْلَ النَّوْمِ أَكْتُبُ مَا فَعَلْتُهُ فِي مُذَكِّرَتِي.", "Qablan naumi aktubu ma fa'altuhu fi mudzakkirati.", "Sebelum tidur saya menulis apa yang saya lakukan di buku harianku."],
    ],
  ],
  // 11. Makanan dan Minuman
  [
    [
      ["أَنَا جَوْعَانُ", "Ana jau'anu", "saya lapar"],
      ["أُرِيدُ مَاءً بَارِدًا", "Uridu ma'an baridan", "saya mau air dingin"],
      ["بِالْهَنَاءِ وَالشِّفَاءِ", "Bil hana'i wasy syifa'i", "selamat menikmati", ["Ungkapan بِالْهَنَاءِ وَالشِّفَاءِ diucapkan saat...", "orang akan/selesai makan", "orang bepergian", "orang sakit", "orang menikah"]],
      ["الْحِسَابُ مِنْ فَضْلِكَ", "Al-hisabu min fadhlika", "minta tagihannya"],
    ],
    [
      ["مَاذَا تُرِيدُ أَنْ تَأْكُلَ؟", "Madza turidu an ta'kula?", "Kamu mau makan apa?", ["Jawaban yang tepat untuk مَاذَا تُرِيدُ أَنْ تَأْكُلَ؟ adalah...", "أُرِيدُ أَرُزًّا بِالدَّجَاجِ", "أَنَا بِخَيْرٍ", "فِي السَّاعَةِ الثَّامِنَةِ", "مِنْ إِنْدُونِيسِيَا"]],
      ["أُرِيدُ سَلَطَةً وَعَصِيرَ لَيْمُونٍ.", "Uridu salathatan wa 'ashira laimunin.", "Saya mau salad dan jus lemon."],
      ["هَلِ الطَّعَامُ حَارٌّ؟", "Halith tha'amu harrun?", "Apakah makanannya pedas?"],
      ["الطَّعَامُ لَذِيذٌ، سَلِمَتْ يَدَاكِ.", "Ath-tha'amu ladzidzun, salimat yadaki.", "Makanannya enak, terima kasih atas masakanmu (semoga tanganmu selamat)."],
    ],
    [
      ["أَنَا نَبَاتِيٌّ، هَلْ عِنْدَكُمْ أَطْبَاقٌ بِدُونِ لَحْمٍ؟", "Ana nabatiyyun, hal 'indakum athbaqun biduni lahmin?", "Saya vegetarian, apakah ada hidangan tanpa daging?"],
      ["أَرْجُو أَلَّا يَكُونَ الطَّعَامُ حَارًّا جِدًّا، فَأَنَا لَا أَتَحَمَّلُ الْفُلْفُلَ.", "Arju alla yakunath tha'amu harran jiddan, fa ana la atahammalul fulfula.", "Saya harap makanannya tidak terlalu pedas, karena saya tidak tahan cabai."],
      ["هَلْ تُحِبُّ أَنْ تُجَرِّبَ الْكُسْكُسَ الْمَغْرِبِيَّ؟", "Hal tuhibbu an tujarribal kuskusal maghribiyya?", "Apakah kamu mau mencoba couscous Maroko?"],
      ["شَبِعْتُ وَالْحَمْدُ لِلّٰهِ، لَا أَسْتَطِيعُ أَنْ آكُلَ أَكْثَرَ.", "Syabi'tu wal hamdu lillahi, la astathi'u an akula aktsara.", "Saya sudah kenyang, alhamdulillah, saya tidak bisa makan lagi."],
    ],
  ],
  // 12. Angka Sederhana
  [
    [
      ["كَمْ عُمْرُكَ؟", "Kam 'umruka?", "berapa umurmu?"],
      ["عُمْرِي خَمْسَ عَشْرَةَ سَنَةً", "'Umri khamsa 'asyrata sanatan", "umurku lima belas tahun"],
      ["كَمْ وَلَدًا عِنْدَكَ؟", "Kam waladan 'indaka?", "berapa anakmu?"],
      ["عِنْدِي ثَلَاثَةُ أَوْلَادٍ", "'Indi tsalatsatu auladin", "saya punya tiga anak", ["Jawaban عِنْدِي ثَلَاثَةُ أَوْلَادٍ cocok untuk pertanyaan...", "كَمْ وَلَدًا عِنْدَكَ؟", "كَمْ عُمْرُكَ؟", "كَمِ السَّاعَةُ؟", "بِكَمْ هٰذَا؟"]],
    ],
    [
      ["مَا رَقْمُ هَاتِفِكَ؟", "Ma raqmu hatifika?", "Berapa nomor teleponmu?"],
      ["رَقْمُ بَيْتِي أَرْبَعَةٌ وَعِشْرُونَ.", "Raqmu baiti arba'atun wa 'isyruna.", "Nomor rumahku dua puluh empat."],
      ["كَمْ طَالِبًا حَضَرَ الْيَوْمَ؟", "Kam thaliban hadharal yauma?", "Berapa siswa yang hadir hari ini?"],
      ["حَضَرَ سَبْعَةَ عَشَرَ طَالِبًا.", "Hadhara sab'ata 'asyara thaliban.", "Tujuh belas siswa hadir.", ["Berapa siswa yang hadir menurut jawaban ini?", "17", "7", "70", "27"]],
    ],
    [
      ["فِي مَدْرَسَتِنَا أَرْبَعُونَ مُعَلِّمًا وَسِتُّمِائَةِ طَالِبٍ.", "Fi madrasatina arba'una mu'alliman wa sittumi'ati thalibin.", "Di sekolah kami ada empat puluh guru dan enam ratus siswa."],
      ["اتَّصِلْ بِي عَلَى الرَّقْمِ صِفْرٌ ثَمَانِيَةٌ وَاحِدٌ اثْنَانِ.", "Ittashil bi 'alar raqmi shifrun tsamaniyatun wahidun itsnani.", "Hubungi saya di nomor nol, delapan, satu, dua."],
      ["كَمْ سَنَةً دَرَسْتَ الْعَرَبِيَّةَ؟ دَرَسْتُهَا ثَلَاثَ سَنَوَاتٍ.", "Kam sanatan darastal 'arabiyyata? Darastuha tsalatsa sanawatin.", "Berapa tahun kamu belajar bahasa Arab? Saya mempelajarinya tiga tahun."],
      ["عِنْدِي مَوْعِدٌ فِي الطَّابِقِ الْحَادِيَ عَشَرَ.", "'Indi mau'idun fith thabiqil hadiya 'asyara.", "Saya ada janji di lantai sebelas."],
    ],
  ],
  // 13. Waktu dan Jam
  [
    [
      ["كَمِ السَّاعَةُ؟", "Kamis sa'atu?", "jam berapa?"],
      ["السَّاعَةُ الثَّانِيَةُ", "As-sa'atuts tsaniyatu", "jam dua"],
      ["بَعْدَ قَلِيلٍ", "Ba'da qalilin", "sebentar lagi"],
      ["الْآنَ", "Al-ana", "sekarang", ["Jika temanmu berkata تَعَالَ الْآنَ, kapan kamu harus datang?", "sekarang", "besok", "nanti sore", "minggu depan"]],
    ],
    [
      ["مَتَى يَبْدَأُ الدَّرْسُ؟", "Mata yabda'ud darsu?", "Kapan pelajaran dimulai?", ["Jawaban yang tepat untuk مَتَى يَبْدَأُ الدَّرْسُ؟ adalah...", "فِي السَّاعَةِ الثَّامِنَةِ", "فِي الْفَصْلِ", "مَعَ الْمُعَلِّمِ", "الدَّرْسُ سَهْلٌ"]],
      ["يَبْدَأُ فِي السَّاعَةِ السَّابِعَةِ وَالنِّصْفِ.", "Yabda'u fis sa'atis sabi'ati wan nishfi.", "Dimulai jam setengah delapan."],
      ["أَنَا مَشْغُولٌ حَتَّى الْعَصْرِ.", "Ana masygulun hattal 'ashri.", "Saya sibuk sampai asar."],
      ["سَنَلْتَقِي بَعْدَ سَاعَتَيْنِ.", "Sanaltaqi ba'da sa'ataini.", "Kita akan bertemu dua jam lagi."],
    ],
    [
      ["عَفْوًا، هَلْ تَعْرِفُ كَمِ السَّاعَةُ؟ نَسِيتُ هَاتِفِي.", "'Afwan, hal ta'rifu kamis sa'atu? Nasitu hatifi.", "Maaf, apakah kamu tahu jam berapa? Saya lupa ponselku."],
      ["السَّاعَةُ الْآنَ الْعَاشِرَةُ إِلَّا عَشْرَ دَقَائِقَ.", "As-sa'atul anal 'asyiratu illa 'asyra daqa'iqa.", "Sekarang jam sepuluh kurang sepuluh menit."],
      ["يَجِبُ أَنْ أَكُونَ فِي الْمَطَارِ قَبْلَ الْخَامِسَةِ.", "Yajibu an akuna fil mathari qablal khamisati.", "Saya harus berada di bandara sebelum jam lima."],
      ["كَمْ مِنَ الْوَقْتِ تَسْتَغْرِقُ الطَّرِيقُ إِلَى الْجَامِعَةِ؟", "Kam minal waqti tastaghriquth thariqu ilal jami'ati?", "Berapa lama perjalanan ke universitas?"],
    ],
  ],
  // 14. Arah Sederhana
  [
    [
      ["أَيْنَ الْمَسْجِدُ؟", "Ainal masjidu?", "di mana masjid?"],
      ["هُنَاكَ", "Hunaka", "di sana"],
      ["عَلَى الْيَمِينِ", "'Alal yamini", "di sebelah kanan"],
      ["قَرِيبٌ جِدًّا", "Qaribun jiddan", "dekat sekali", ["Jika ditanya هَلِ الْمَسْجِدُ بَعِيدٌ؟ dan jaraknya hanya dua menit, jawaban yang tepat...", "لَا، قَرِيبٌ جِدًّا", "نَعَمْ، بَعِيدٌ جِدًّا", "هُوَ كَبِيرٌ", "أَنَا آسِفٌ"]],
    ],
    [
      ["كَيْفَ أَذْهَبُ إِلَى الْمَحَطَّةِ؟", "Kaifa adzhabu ilal mahaththati?", "Bagaimana saya pergi ke stasiun?", ["Pertanyaan ini meminta...", "petunjuk arah", "harga tiket", "jam keberangkatan", "nama stasiun"]],
      ["خُذِ الشَّارِعَ الْأَوَّلَ عَلَى الْيَسَارِ.", "Khudzisy syari'al awwala 'alal yasari.", "Ambil jalan pertama di sebelah kiri."],
      ["الصَّيْدَلِيَّةُ بِجَانِبِ الْمَخْبَزِ.", "Ash-shaidaliyyatu bijanibil makhbazi.", "Apotek ada di samping toko roti."],
      ["هَلِ الْبَنْكُ بَعِيدٌ عَنْ هُنَا؟", "Halil banku ba'idun 'an huna?", "Apakah bank jauh dari sini?"],
    ],
    [
      ["عَفْوًا، أَنَا ضَائِعٌ، كَيْفَ أَصِلُ إِلَى فُنْدُقِ النُّورِ؟", "'Afwan, ana dha'i'un, kaifa ashilu ila funduqin nuri?", "Maaf, saya tersesat, bagaimana saya sampai ke Hotel An-Nur?"],
      ["امْشِ مِئَتَيْ مِتْرٍ ثُمَّ اعْبُرِ الشَّارِعَ عِنْدَ الْإِشَارَةِ.", "Imsyi mi'atai mitrin tsumma'burisy syari'a 'indal isyarati.", "Berjalanlah dua ratus meter lalu seberangi jalan di lampu lalu lintas."],
      ["الْمَكَانُ بَعِيدٌ قَلِيلًا، الْأَفْضَلُ أَنْ تَأْخُذَ سَيَّارَةَ أُجْرَةٍ.", "Al-makanu ba'idun qalilan, al-afdhalu an ta'khudza sayyarata ujratin.", "Tempatnya agak jauh, sebaiknya kamu naik taksi."],
      ["سَأَمْشِي مَعَكَ إِلَى هُنَاكَ، فَأَنَا ذَاهِبٌ فِي الِاتِّجَاهِ نَفْسِهِ.", "Sa'amsyi ma'aka ila hunaka, fa ana dzahibun fil ittijahi nafsihi.", "Saya akan berjalan bersamamu ke sana, karena saya menuju arah yang sama."],
    ],
  ],
  // 15. Berbelanja Ringan
  [
    [
      ["بِكَمْ هٰذَا؟", "Bikam hadza?", "berapa harga ini?", ["Jawaban yang tepat untuk بِكَمْ هٰذَا؟ adalah...", "بِعَشَرَةِ رِيَالَاتٍ", "هٰذَا قَمِيصٌ", "أَنَا مِنْ مِصْرَ", "نَعَمْ، شُكْرًا"]],
      ["أُرِيدُ هٰذَا", "Uridu hadza", "saya mau ini"],
      ["هَلْ يُوجَدُ تَخْفِيضٌ؟", "Hal yujadu takhfidhun?", "apakah ada diskon?"],
      ["خُذِ الْبَاقِيَ", "Khudzil baqiya", "ambil kembaliannya"],
    ],
    [
      ["أُرِيدُ قَمِيصًا بِمَقَاسٍ مُتَوَسِّطٍ.", "Uridu qamishan bimaqasin mutawassithin.", "Saya mau kemeja ukuran sedang."],
      ["هٰذَا غَالٍ جِدًّا، أَعْطِنِي سِعْرًا أَقَلَّ.", "Hadza ghalin jiddan, a'thini si'ran aqalla.", "Ini terlalu mahal, beri saya harga lebih rendah.", ["Pembeli dalam kalimat ini sedang...", "menawar harga", "membayar", "bertanya ukuran", "mengembalikan barang"]],
      ["هَلْ أَسْتَطِيعُ أَنْ أُجَرِّبَهُ؟", "Hal astathi'u an ujarribahu?", "Bolehkah saya mencobanya?"],
      ["سَأَدْفَعُ نَقْدًا.", "Sa'adfa'u naqdan.", "Saya akan membayar tunai."],
    ],
    [
      ["هَلْ عِنْدَكُمْ هٰذَا الْحِذَاءُ بِلَوْنٍ آخَرَ؟", "Hal 'indakum hadzal hidza'u bilaunin akhara?", "Apakah kalian punya sepatu ini dalam warna lain?"],
      ["إِذَا اشْتَرَيْتُ ثَلَاثَ قِطَعٍ، هَلْ تُعْطِينِي تَخْفِيضًا؟", "Idzasytaraitu tsalatsa qitha'in, hal tu'thini takhfidhan?", "Jika saya membeli tiga potong, apakah kamu memberi saya diskon?"],
      ["أُرِيدُ أَنْ أُبَدِّلَ هٰذَا الْقَمِيصَ لِأَنَّهُ صَغِيرٌ.", "Uridu an ubaddila hadzal qamisha li'annahu shaghirun.", "Saya ingin menukar kemeja ini karena kekecilan."],
      ["تَفَضَّلِ الْإِيصَالَ، وَيُمْكِنُكَ الْإِرْجَاعُ خِلَالَ أُسْبُوعٍ.", "Tafadhdhalil ishala, wa yumkinukal irja'u khilala usbu'in.", "Silakan struknya, dan kamu bisa mengembalikan dalam seminggu."],
    ],
  ],
  // 16. Transportasi
  [
    [
      ["بِالسَّيَّارَةِ", "Bis sayyarati", "dengan mobil"],
      ["مَشْيًا عَلَى الْأَقْدَامِ", "Masyyan 'alal aqdami", "dengan berjalan kaki"],
      ["تَذْكِرَةُ ذَهَابٍ", "Tadzkiratu dzahabin", "tiket sekali jalan"],
      ["كَيْفَ تَذْهَبُ؟", "Kaifa tadzhabu?", "bagaimana kamu pergi?", ["Jawaban yang tepat untuk كَيْفَ تَذْهَبُ إِلَى الْمَدْرَسَةِ؟ adalah...", "بِالدَّرَّاجَةِ", "فِي الصَّبَاحِ", "مَعَ أَخِي فِي الْفَصْلِ", "الْمَدْرَسَةُ كَبِيرَةٌ"]],
    ],
    [
      ["أُرِيدُ تَذْكِرَةً إِلَى بَانْدُونْغَ مِنْ فَضْلِكَ.", "Uridu tadzkiratan ila Bandung min fadhlika.", "Saya mau tiket ke Bandung, tolong."],
      ["مَتَى تَصِلُ الْحَافِلَةُ؟", "Mata tashilul hafilatu?", "Kapan bus tiba?"],
      ["أَيْنَ أَنْزِلُ؟", "Aina anzilu?", "Di mana saya turun?", ["Pertanyaan أَيْنَ أَنْزِلُ؟ diucapkan oleh...", "penumpang", "sopir", "penjual tiket", "polisi"]],
      ["خُذْنِي إِلَى الْمَطَارِ مِنْ فَضْلِكَ.", "Khudzni ilal mathari min fadhlika.", "Tolong antar saya ke bandara."],
    ],
    [
      ["هَلْ هٰذَا الْقِطَارُ يَذْهَبُ إِلَى الْمَدِينَةِ الْمُنَوَّرَةِ؟", "Hal hadzal qitharu yadzhabu ilal madinatil munawwarati?", "Apakah kereta ini pergi ke Madinah?"],
      ["فَاتَتْنِي الْحَافِلَةُ، مَتَى الْحَافِلَةُ الْقَادِمَةُ؟", "Fatatnil hafilatu, matal hafilatul qadimatu?", "Saya ketinggalan bus, kapan bus berikutnya?"],
      ["كَمْ أُجْرَةُ التَّاكْسِي إِلَى وَسَطِ الْمَدِينَةِ؟", "Kam ujratut taksi ila wasathil madinati?", "Berapa ongkos taksi ke pusat kota?"],
      ["أُفَضِّلُ الْقِطَارَ لِأَنَّهُ أَسْرَعُ وَأَرْخَصُ مِنَ الطَّائِرَةِ.", "Ufadhdhilul qithara li'annahu asra'u wa arkhashu minath tha'irati.", "Saya lebih suka kereta karena lebih cepat dan lebih murah dari pesawat."],
    ],
  ],
  // 17. Hobi
  [
    [
      ["مَا هِوَايَتُكِ؟", "Ma hiwayatuki?", "apa hobimu? (pr)", ["Jawaban yang tepat untuk مَا هِوَايَتُكِ؟ adalah...", "هِوَايَتِي الطَّبْخُ", "أَنَا طَالِبَةٌ", "عُمْرِي عِشْرُونَ", "أَسْكُنُ فِي جَاكَرْتَا"]],
      ["أُحِبُّ الرَّسْمَ", "Uhibbur rasma", "saya suka menggambar"],
      ["لَا أُحِبُّ الرِّيَاضَةَ", "La uhibbur riyadhata", "saya tidak suka olahraga"],
      ["فِي وَقْتِ الْفَرَاغِ", "Fi waqtil faraghi", "di waktu luang"],
    ],
    [
      ["مَاذَا تَفْعَلُ فِي وَقْتِ فَرَاغِكَ؟", "Madza taf'alu fi waqti faraghika?", "Apa yang kamu lakukan di waktu luangmu?"],
      ["أُشَاهِدُ مُبَارَيَاتِ كُرَةِ الْقَدَمِ.", "Usyahidu mubarayati kuratil qadami.", "Saya menonton pertandingan sepak bola."],
      ["هَلْ تُحِبُّ الْقِرَاءَةَ؟ نَعَمْ، كَثِيرًا.", "Hal tuhibbul qira'ata? Na'am, katsiran.", "Apakah kamu suka membaca? Ya, sangat."],
      ["أَيُّ رِيَاضَةٍ تُمَارِسُ؟", "Ayyu riyadhatin tumarisu?", "Olahraga apa yang kamu lakukan?", ["Jawaban yang cocok untuk أَيُّ رِيَاضَةٍ تُمَارِسُ؟ adalah...", "أُمَارِسُ كُرَةَ الرِّيشَةِ", "أُحِبُّ الْأَرُزَّ", "أَنَا فِي الْبَيْتِ", "مِنَ السُّوقِ"]],
    ],
    [
      ["بَدَأْتُ أَتَعَلَّمُ الْعَزْفَ عَلَى الْعُودِ مُنْذُ سَنَةٍ.", "Bada'tu ata'allamul 'azfa 'alal 'udi mundzu sanatin.", "Saya mulai belajar bermain oud sejak setahun lalu."],
      ["هِوَايَتِي تَصْوِيرُ الطَّبِيعَةِ، خَاصَّةً عِنْدَ الشُّرُوقِ.", "Hiwayati tashwiruth thabi'ati, khashshatan 'indasy syuruqi.", "Hobiku memotret alam, terutama saat matahari terbit."],
      ["لَوْ كَانَ عِنْدِي وَقْتٌ أَكْثَرُ لَتَعَلَّمْتُ الْخَطَّ الْعَرَبِيَّ.", "Lau kana 'indi waqtun aktsaru lata'allamtul khaththal 'arabiyya.", "Seandainya saya punya lebih banyak waktu, saya akan belajar kaligrafi Arab."],
      ["هَلْ تُرِيدُ أَنْ تَنْضَمَّ إِلَى نَادِي الْقِرَاءَةِ مَعِي؟", "Hal turidu an tandhamma ila nadil qira'ati ma'i?", "Apakah kamu mau bergabung dengan klub membaca bersamaku?"],
    ],
  ],
  // 18. Cuaca
  [
    [
      ["كَيْفَ الْجَوُّ؟", "Kaifal jawwu?", "bagaimana cuacanya?"],
      ["الْجَوُّ مُعْتَدِلٌ", "Al-jawwu mu'tadilun", "cuacanya sejuk / sedang"],
      ["الدُّنْيَا تُمْطِرُ", "Ad-dunya tumthiru", "sedang hujan"],
      ["الْجَوُّ غَائِمٌ", "Al-jawwu gha'imun", "cuacanya berawan", ["Jika langit penuh awan, kita berkata...", "الْجَوُّ غَائِمٌ", "الْجَوُّ مُشْمِسٌ", "الْجَوُّ حَارٌّ جِدًّا", "الْجَوُّ صَحْوٌ"]],
    ],
    [
      ["كَيْفَ الطَّقْسُ عِنْدَكُمْ الْيَوْمَ؟", "Kaifath thaqsu 'indakumul yauma?", "Bagaimana cuaca di tempat kalian hari ini?"],
      ["الْجَوُّ حَارٌّ وَرَطْبٌ.", "Al-jawwu harrun wa rathbun.", "Cuacanya panas dan lembap."],
      ["أَظُنُّ أَنَّهَا سَتُمْطِرُ بَعْدَ الظُّهْرِ.", "Azhunnu annaha satumthiru ba'dazh zhuhri.", "Saya kira akan hujan setelah zuhur.", ["Pembicara memperkirakan hujan...", "setelah zuhur", "pagi ini", "malam nanti", "besok"]],
      ["لَا تَنْسَ الْمِظَلَّةَ.", "La tansal mizhallata.", "Jangan lupa payung."],
    ],
    [
      ["الْجَوُّ فِي بَلَدِي حَارٌّ طُولَ السَّنَةِ تَقْرِيبًا.", "Al-jawwu fi baladi harrun thulas sanati taqriban.", "Cuaca di negaraku panas hampir sepanjang tahun."],
      ["أُحِبُّ فَصْلَ الرَّبِيعِ لِأَنَّ الْجَوَّ فِيهِ لَطِيفٌ.", "Uhibbu fashlar rabi'i li'annal jawwa fihi lathifun.", "Saya suka musim semi karena cuacanya nyaman."],
      ["أُلْغِيَتِ الرِّحْلَةُ بِسَبَبِ سُوءِ الْأَحْوَالِ الْجَوِّيَّةِ.", "Ulghiyatir rihlatu bisababi su'il ahwalil jawwiyyati.", "Perjalanan dibatalkan karena cuaca buruk."],
      ["يَقُولُ التِّلْفَازُ إِنَّ الْحَرَارَةَ سَتَنْخَفِضُ غَدًا.", "Yaqulut tilfazu innal hararata satankhafidhu ghadan.", "Televisi mengatakan suhu akan turun besok."],
    ],
  ],
  // 19. Janji Bertemu
  [
    [
      ["مَتَى نَلْتَقِي؟", "Mata naltaqi?", "kapan kita bertemu?"],
      ["غَدًا صَبَاحًا", "Ghadan shabahan", "besok pagi"],
      ["أَيْنَ نَلْتَقِي؟", "Aina naltaqi?", "di mana kita bertemu?"],
      ["أَمَامَ الْمَكْتَبَةِ", "Amamal maktabati", "di depan perpustakaan", ["Jawaban أَمَامَ الْمَكْتَبَةِ cocok untuk pertanyaan...", "أَيْنَ نَلْتَقِي؟", "مَتَى نَلْتَقِي؟", "كَيْفَ حَالُكَ؟", "بِكَمْ هٰذَا؟"]],
    ],
    [
      ["هَلْ أَنْتَ مَشْغُولٌ يَوْمَ السَّبْتِ؟", "Hal anta masygulun yaumas sabti?", "Apakah kamu sibuk hari Sabtu?"],
      ["لَا، أَنَا فَارِغٌ، لِمَاذَا؟", "La, ana farighun, limadza?", "Tidak, saya luang, kenapa?"],
      ["لِنَلْتَقِ فِي الْمَقْهَى السَّاعَةَ الرَّابِعَةَ.", "Linaltaqi fil maqha as-sa'atar rabi'ata.", "Mari bertemu di kafe jam empat.", ["Di mana dan kapan mereka akan bertemu?", "di kafe, jam empat", "di masjid, jam empat", "di kafe, jam empat belas", "di rumah, jam dua"]],
      ["مُوَافِقٌ، إِلَى اللِّقَاءِ.", "Muwafiqun, ilal liqa'i.", "Setuju, sampai jumpa."],
    ],
    [
      ["آسِفٌ، لَا أَسْتَطِيعُ الْحُضُورَ غَدًا، هَلْ نُؤَجِّلُ الْمَوْعِدَ؟", "Asifun, la astathi'ul hudhura ghadan, hal nu'ajjilul mau'ida?", "Maaf, saya tidak bisa hadir besok, bagaimana kalau janjinya ditunda?"],
      ["مَا رَأْيُكَ أَنْ نَلْتَقِيَ بَعْدَ صَلَاةِ الْعَصْرِ؟", "Ma ra'yuka an naltaqiya ba'da shalatil 'ashri?", "Bagaimana pendapatmu kalau kita bertemu setelah salat asar?"],
      ["سَأَنْتَظِرُكَ عِنْدَ الْبَوَّابَةِ الرَّئِيسِيَّةِ لِلْجَامِعَةِ.", "Sa'antazhiruka 'indal bawwabatir ra'isiyyati lil jami'ati.", "Saya akan menunggumu di gerbang utama universitas."],
      ["إِذَا تَأَخَّرْتُ فَاتَّصِلْ بِي، سَأَكُونُ فِي الطَّرِيقِ.", "Idza ta'akhkhartu fattashil bi, sa'akunu fith thariqi.", "Kalau saya terlambat, teleponlah saya, saya sedang di jalan."],
    ],
  ],
  // 20. Review Dialog Pemula
  [
    [
      ["نَعَمْ", "Na'am", "ya"],
      ["لَا، شُكْرًا", "La, syukran", "tidak, terima kasih"],
      ["طَبْعًا", "Thab'an", "tentu saja"],
      ["إِنْ شَاءَ اللهُ", "In sya'allahu", "jika Allah menghendaki", ["Ungkapan إِنْ شَاءَ اللهُ biasa diucapkan saat membicarakan...", "rencana di masa depan", "kejadian yang sudah lewat", "nama seseorang", "harga barang"]],
    ],
    [
      ["هَلْ تُرِيدُ أَنْ تَشْرَبَ شَيْئًا؟", "Hal turidu an tasyraba syai'an?", "Apakah kamu mau minum sesuatu?", ["Respons sopan untuk menolak tawaran minum adalah...", "لَا، شُكْرًا، لَسْتُ عَطْشَانَ", "أَنَا مِنْ مِصْرَ", "السَّاعَةُ الْخَامِسَةُ", "عَلَى الْيَمِينِ"]],
      ["أَيْنَ تَسْكُنُ الْآنَ؟", "Aina taskunul ana?", "Di mana kamu tinggal sekarang?"],
      ["أَسْكُنُ قَرِيبًا مِنَ الْجَامِعَةِ.", "Askunu qariban minal jami'ati.", "Saya tinggal dekat universitas."],
      ["هَلْ تَتَكَلَّمِينَ الْإِنْجِلِيزِيَّةَ؟", "Hal tatakallaminal injiliziyyata?", "Apakah kamu (pr) berbicara bahasa Inggris?"],
    ],
    [
      ["عَرِّفْنَا بِنَفْسِكَ: مَا اسْمُكَ، وَمِنْ أَيْنَ أَنْتَ، وَمَاذَا تَدْرُسُ؟", "'Arrifna binafsika: masmuka, wa min aina anta, wa madza tadrusu?", "Perkenalkan dirimu: siapa namamu, dari mana asalmu, dan apa yang kamu pelajari?"],
      ["اسْمِي بِلَالٌ، مِنْ إِنْدُونِيسِيَا، وَأَدْرُسُ الِاقْتِصَادَ الْإِسْلَامِيَّ.", "Ismi Bilalun, min Indunisiya, wa adrusul iqtishadal islamiyya.", "Nama saya Bilal, dari Indonesia, dan saya belajar ekonomi Islam."],
      ["مَا الَّذِي جَعَلَكَ تَتَعَلَّمُ اللُّغَةَ الْعَرَبِيَّةَ؟", "Mal ladzi ja'alaka tata'allamul lughatal 'arabiyyata?", "Apa yang membuatmu belajar bahasa Arab?"],
      ["لِأَنِّي أُرِيدُ أَنْ أَفْهَمَ الْقُرْآنَ وَأَتَحَدَّثَ مَعَ الْعَرَبِ.", "Li'anni uridu an afhamal qur'ana wa atahaddatsa ma'al 'arabi.", "Karena saya ingin memahami Al-Qur'an dan berbicara dengan orang Arab."],
    ],
  ],
];
