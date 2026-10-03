import type { QuizTopic } from './types';

// Latihan Istima — one entry per topic (index = topic - 1): [Basic, Intermediate, Advanced].
export const istima: QuizTopic[] = [
  // 1. Bunyi Pendek dan Panjang
  [
    [
      ["قَالَ", "Qala", "dia berkata (a panjang)", ["Kamu mendengar \"qaala\" dengan a panjang. Tulisannya...", "قَالَ", "قَلَّ", "قَلَ", "قِيلَ"]],
      ["قُلْ", "Qul", "katakanlah! (u pendek)"],
      ["نُورٌ", "Nurun", "cahaya (u panjang)"],
      ["دِينٌ", "Dinun", "agama (i panjang)", ["Bunyi panjang pada دِينٌ ditandai huruf...", "ي", "و", "ا", "ن"]],
    ],
    [
      ["كَتَبَ كِتَابًا طَوِيلًا.", "Kataba kitaban thawilan.", "Dia menulis buku yang panjang."],
      ["سَمِعْتُ صَوْتَ الْبَابِ.", "Sami'tu shautal babi.", "Saya mendengar suara pintu."],
      ["الْفِيلُ حَيَوَانٌ كَبِيرٌ.", "Al-filu hayawanun kabirun.", "Gajah adalah hewan besar."],
      ["جَمِيلٌ وَجَمَلٌ كَلِمَتَانِ مُخْتَلِفَتَانِ.", "Jamilun wa jamalun kalimatani mukhtalifatani.", "Jamil dan jamal adalah dua kata yang berbeda.", ["Perbedaan جَمِيلٌ dan جَمَلٌ terletak pada...", "panjang pendek bunyi mi/ma", "huruf pertama", "tanwin", "tidak ada perbedaan"]],
    ],
    [
      ["الطَّالِبُ يَقُولُ: أُرِيدُ أَنْ أَتَعَلَّمَ الْقِرَاءَةَ الصَّحِيحَةَ.", "Ath-thalibu yaqulu: uridu an ata'allamal qira'atash shahihata.", "Siswa itu berkata: saya ingin belajar bacaan yang benar."],
      ["إِذَا مَدَدْتَ الْحَرْفَ الْقَصِيرَ تَغَيَّرَ الْمَعْنَى.", "Idza madadtal harfal qashira taghayyaral ma'na.", "Jika kamu memanjangkan huruf pendek, maknanya berubah."],
      ["اسْتَمِعْ إِلَى الْكَلِمَةِ مَرَّتَيْنِ ثُمَّ اكْتُبْهَا.", "Istami' ilal kalimati marrataini tsummaktubha.", "Dengarkan kata itu dua kali lalu tulislah."],
      ["سَمِعَ الْمُعَلِّمُ خَطَأً فِي قِرَاءَتِي فَصَحَّحَهُ.", "Sami'al mu'allimu khatha'an fi qira'ati fashahhahahu.", "Guru mendengar kesalahan dalam bacaanku lalu membetulkannya."],
    ],
  ],
  // 2. Salam Terdengar
  [
    [
      ["أَهْلًا", "Ahlan", "halo / selamat datang"],
      ["شُكْرًا", "Syukran", "terima kasih", ["Jawaban yang tepat setelah mendengar شُكْرًا adalah...", "عَفْوًا", "مَعَ السَّلَامَةِ", "صَبَاحَ الْخَيْرِ", "نَعَمْ"]],
      ["عَفْوًا", "'Afwan", "sama-sama / maaf"],
      ["تَفَضَّلْ", "Tafadhdhal", "silakan"],
    ],
    [
      ["السَّلَامُ عَلَيْكُمْ يَا أَصْدِقَاءُ.", "Assalamu 'alaikum ya ashdiqa'u.", "Assalamualaikum, wahai teman-teman."],
      ["مَسَاءَ النُّورِ يَا أُسْتَاذَةُ.", "Masa'an nuri ya ustadzatu.", "Selamat sore juga, Bu Guru.", ["مَسَاءَ النُّورِ adalah jawaban untuk...", "مَسَاءَ الْخَيْرِ", "صَبَاحَ الْخَيْرِ", "شُكْرًا", "مَعَ السَّلَامَةِ"]],
      ["كَيْفَ أَصْبَحْتَ الْيَوْمَ؟", "Kaifa ashbahtal yauma?", "Bagaimana keadaanmu pagi ini?"],
      ["أَرَاكَ غَدًا إِنْ شَاءَ اللهُ.", "Araka ghadan in sya'allahu.", "Sampai jumpa besok, insya Allah."],
    ],
    [
      ["أَهْلًا بِكُمْ فِي الدَّرْسِ الْأَوَّلِ مِنْ دُرُوسِ الْعَرَبِيَّةِ.", "Ahlan bikum fid darsil awwali min durusil 'arabiyyati.", "Selamat datang di pelajaran pertama dari pelajaran bahasa Arab."],
      ["سَلَّمَ الضَّيْفُ عَلَى أَهْلِ الْبَيْتِ ثُمَّ جَلَسَ.", "Sallamadh dhaifu 'ala ahlil baiti tsumma jalasa.", "Tamu itu memberi salam kepada penghuni rumah lalu duduk."],
      ["عِيدٌ مُبَارَكٌ، كُلُّ عَامٍ وَأَنْتُمْ بِخَيْرٍ.", "'Idun mubarakun, kullu 'amin wa antum bikhairin.", "Selamat hari raya, semoga kalian baik setiap tahun."],
      ["رَدَّ الطُّلَّابُ التَّحِيَّةَ بِصَوْتٍ وَاحِدٍ.", "Raddath thullabut tahiyyata bishautin wahidin.", "Para siswa membalas salam dengan satu suara."],
    ],
  ],
  // 3. Nama Orang
  [
    [
      ["اسْمِي فَاطِمَةُ", "Ismi Fathimatu", "nama saya Fatimah"],
      ["اسْمُهُ يُوسُفُ", "Ismuhu Yusufu", "namanya Yusuf"],
      ["مَا اسْمُكِ؟", "Masmuki?", "siapa namamu? (pr)", ["Pertanyaan مَا اسْمُكِ؟ ditujukan kepada...", "perempuan", "laki-laki", "banyak orang", "dua orang"]],
      ["أَنَا عَلِيٌّ", "Ana 'Aliyyun", "saya Ali"],
    ],
    [
      ["اسْمُ أَبِي إِبْرَاهِيمُ.", "Ismu abi Ibrahimu.", "Nama ayahku Ibrahim."],
      ["هٰذِهِ صَدِيقَتِي مَرْيَمُ.", "Hadzihi shadiqati Maryamu.", "Ini sahabatku Maryam."],
      ["مَنْ هٰذَا الرَّجُلُ؟ هٰذَا الْأُسْتَاذُ خَالِدٌ.", "Man hadzar rajulu? Hadzal ustadzu Khalidun.", "Siapa pria ini? Ini Ustaz Khalid.", ["Nama yang disebut dalam dialog ini adalah...", "Khalid", "Ibrahim", "Yusuf", "Ali"]],
      ["يُنَادِي النَّاسُ أَخِي بِأَبِي سَعِيدٍ.", "Yunadin nasu akhi bi Abi Sa'idin.", "Orang-orang memanggil kakakku Abu Said."],
    ],
    [
      ["عَرَّفَتِ الطَّالِبَةُ نَفْسَهَا: اسْمِي عَائِشَةُ وَأَنَا مِنْ سُورَابَايَا.", "'Arrafatith thalibatu nafsaha: ismi 'A'isyatu wa ana min Surabaya.", "Siswi itu memperkenalkan diri: nama saya Aisyah dan saya dari Surabaya."],
      ["سَمَّى الْأَبُ ابْنَهُ عَبْدَ الرَّحْمٰنِ.", "Sammal abubnahu 'Abdar rahmani.", "Sang ayah menamai anaknya Abdurrahman."],
      ["نَسِيتُ اسْمَ الْمُدِيرِ الْجَدِيدِ، هَلْ تَذْكُرُهُ؟", "Nasitusmal mudiril jadidi, hal tadzkuruhu?", "Saya lupa nama direktur baru, apakah kamu ingat?"],
      ["كُنْيَةُ أَبِي بَكْرٍ الصِّدِّيقِ مَشْهُورَةٌ.", "Kunyatu Abi Bakrinish shiddiqi masyhuratun.", "Julukan Abu Bakar Ash-Shiddiq terkenal."],
    ],
  ],
  // 4. Asal Negara
  [
    [
      ["مِنْ مِصْرَ", "Min Mishra", "dari Mesir"],
      ["مِنَ الْيَابَانِ", "Minal yabani", "dari Jepang"],
      ["سُعُودِيٌّ", "Su'udiyyun", "orang Saudi", ["Seseorang dari السُّعُودِيَّةُ disebut...", "سُعُودِيٌّ", "سَعِيدٌ", "سُعُودٌ", "مُسْعِدٌ"]],
      ["مَالِيزِيٌّ", "Maliziyyun", "orang Malaysia"],
    ],
    [
      ["أَنَا إِنْدُونِيسِيٌّ مِنْ جَاوَةَ.", "Ana indunisiyyun min Jawata.", "Saya orang Indonesia dari Jawa."],
      ["صَدِيقِي مِنَ الْمَغْرِبِ.", "Shadiqi minal maghribi.", "Sahabatku dari Maroko."],
      ["مِنْ أَيِّ بَلَدٍ أَنْتِ؟", "Min ayyi baladin anti?", "Kamu (pr) dari negara mana?"],
      ["هِيَ تُرْكِيَّةٌ تَسْكُنُ فِي إِسْطَنْبُولَ.", "Hiya turkiyyatun taskunu fi Isthanbula.", "Dia perempuan Turki yang tinggal di Istanbul.", ["Asal perempuan dalam audio adalah...", "Turki", "Mesir", "Maroko", "Jepang"]],
    ],
    [
      ["فِي فَصْلِنَا طُلَّابٌ مِنْ سَبْعِ دُوَلٍ مُخْتَلِفَةٍ.", "Fi fashlina thullabun min sab'i duwalin mukhtalifatin.", "Di kelas kami ada siswa dari tujuh negara berbeda."],
      ["جَاءَ أُسْتَاذُنَا مِنَ الْأُرْدُنِّ لِيُعَلِّمَنَا الْعَرَبِيَّةَ.", "Ja'a ustadzuna minal urdunni liyu'allimanal 'arabiyyata.", "Guru kami datang dari Yordania untuk mengajari kami bahasa Arab."],
      ["عَاشَتْ عَائِلَتِي فِي السُّودَانِ عَشْرَ سَنَوَاتٍ.", "'Asyat 'a'ilati fis sudani 'asyra sanawatin.", "Keluargaku tinggal di Sudan selama sepuluh tahun."],
      ["أَنَا مِنْ بُرُونَايْ وَزَوْجَتِي مِنْ سِنْغَافُورَةَ.", "Ana min Brunai wa zaujati min Singhafurata.", "Saya dari Brunei dan istri saya dari Singapura."],
    ],
  ],
  // 5. Kata Kelas
  [
    [
      ["طَبَاشِيرُ", "Thabasyiru", "kapur tulis"],
      ["مِقْلَمَةٌ", "Miqlamatun", "kotak pensil"],
      ["حَقِيبَةٌ", "Haqibatun", "tas"],
      ["مِبْرَاةٌ", "Mibratun", "rautan", ["Kata مِبْرَاةٌ berarti...", "rautan", "penggaris", "penghapus", "gunting"]],
    ],
    [
      ["أَيْنَ دَفْتَرُ الْوَاجِبِ؟", "Aina daftarul wajibi?", "Di mana buku PR?"],
      ["الْمِسْطَرَةُ فِي الْمِقْلَمَةِ.", "Al-mistharatu fil miqlamati.", "Penggaris ada di kotak pensil."],
      ["عَلَى الْمَكْتَبِ حَاسُوبٌ جَدِيدٌ.", "'Alal maktabi hasubun jadidun.", "Di atas meja ada komputer baru.", ["Benda yang disebut dalam audio adalah...", "komputer", "papan tulis", "tas", "kamus"]],
      ["خُذِ الْقَلَمَ الْأَزْرَقَ مِنْ فَضْلِكَ.", "Khudzil qalamal azraqa min fadhlika.", "Tolong ambil pena biru."],
    ],
    [
      ["نَسِيَ الطَّالِبُ مُعْجَمَهُ فِي الْفَصْلِ فَرَجَعَ إِلَيْهِ.", "Nasiyath thalibu mu'jamahu fil fashli faraja'a ilaihi.", "Siswa itu lupa kamusnya di kelas lalu kembali ke sana."],
      ["وَزَّعَ الْمُعَلِّمُ أَوْرَاقَ الِامْتِحَانِ عَلَى الطُّلَّابِ.", "Wazza'al mu'allimu auraqal imtihani 'alath thullabi.", "Guru membagikan lembar ujian kepada para siswa."],
      ["فِي زَاوِيَةِ الْفَصْلِ خَرِيطَةٌ كَبِيرَةٌ لِلْعَالَمِ.", "Fi zawiyatil fashli kharithatun kabiratun lil 'alami.", "Di sudut kelas ada peta dunia yang besar."],
      ["اشْتَرَيْتُ دَفَاتِرَ وَأَقْلَامًا قَبْلَ بِدَايَةِ السَّنَةِ الدِّرَاسِيَّةِ.", "Isytaraitu dafatira wa aqlaman qabla bidayatis sanatid dirasiyyati.", "Saya membeli buku tulis dan pena sebelum awal tahun ajaran."],
    ],
  ],
  // 6. Kata Rumah
  [
    [
      ["سَرِيرٌ", "Sarirun", "tempat tidur"],
      ["مِرْآةٌ", "Mir'atun", "cermin"],
      ["سَجَّادَةٌ", "Sajjadatun", "karpet / sajadah"],
      ["مِصْبَاحٌ", "Mishbahun", "lampu", ["Kamu mendengar \"mishbaahun\". Benda itu dipakai untuk...", "menerangi ruangan", "duduk", "tidur", "memasak"]],
    ],
    [
      ["الْمِرْآةُ فِي الْحَمَّامِ.", "Al-mir'atu fil hammami.", "Cermin ada di kamar mandi."],
      ["أَطْفِئِ الْمِصْبَاحَ قَبْلَ النَّوْمِ.", "Athfi'il mishbaha qablan naumi.", "Matikan lampu sebelum tidur."],
      ["الْمَطْبَخُ صَغِيرٌ وَنَظِيفٌ.", "Al-mathbakhu shaghirun wa nazhifun.", "Dapurnya kecil dan bersih.", ["Ruangan yang dibicarakan adalah...", "dapur", "kamar tidur", "kamar mandi", "ruang tamu"]],
      ["عَلَى الْجِدَارِ صُورَةٌ جَمِيلَةٌ.", "'Alal jidari shuratun jamilatun.", "Di dinding ada gambar yang indah."],
    ],
    [
      ["فِي شَقَّتِنَا غُرْفَتَانِ وَمَطْبَخٌ وَحَمَّامٌ وَاحِدٌ.", "Fi syaqqatina ghurfatani wa mathbakhun wa hammamun wahidun.", "Di apartemen kami ada dua kamar, satu dapur, dan satu kamar mandi."],
      ["رَتَّبَتْ أُخْتِي الْكُتُبَ عَلَى الرُّفُوفِ.", "Rattabat ukhtil kutuba 'alar rufufi.", "Adikku menata buku-buku di rak."],
      ["الْغَسَّالَةُ مُعَطَّلَةٌ مُنْذُ أَمْسِ.", "Al-ghassalatu mu'aththalatun mundzu amsi.", "Mesin cuci rusak sejak kemarin."],
      ["يَجْتَمِعُ أَفْرَادُ الْأُسْرَةِ فِي الصَّالَةِ مَسَاءً.", "Yajtami'u afradul usrati fish shalati masa'an.", "Anggota keluarga berkumpul di ruang tengah pada sore hari."],
    ],
  ],
  // 7. Angka Terdengar
  [
    [
      ["وَاحِدٌ", "Wahidun", "satu"],
      ["ثَلَاثَةٌ", "Tsalatsatun", "tiga"],
      ["تِسْعَةٌ", "Tis'atun", "sembilan", ["Kamu mendengar \"tis'atun\". Angkanya...", "9", "3", "7", "19"]],
      ["عَشَرَةٌ", "'Asyaratun", "sepuluh"],
    ],
    [
      ["رَقْمُ هَاتِفِي سِتَّةٌ، أَرْبَعَةٌ، صِفْرٌ.", "Raqmu hatifi sittatun, arba'atun, shifrun.", "Nomor teleponku enam, empat, nol.", ["Angka yang disebut berurutan adalah...", "6, 4, 0", "4, 6, 0", "6, 0, 4", "7, 4, 0"]],
      ["فِي الْحَافِلَةِ اثْنَا عَشَرَ رَاكِبًا.", "Fil hafilati itsna 'asyara rakiban.", "Di bus ada dua belas penumpang."],
      ["عُمْرِي سِتَّ عَشْرَةَ سَنَةً.", "'Umri sitta 'asyrata sanatan.", "Umurku enam belas tahun."],
      ["الْغُرْفَةُ رَقْمُ ثَلَاثَةَ عَشَرَ.", "Al-ghurfatu raqmu tsalatsata 'asyara.", "Kamar nomor tiga belas."],
    ],
    [
      ["ثَمَنُ الْقَمِيصِ ثَمَانِيَةَ عَشَرَ دِينَارًا فَقَطْ.", "Tsamanul qamishi tsamaniyata 'asyara dinaran faqath.", "Harga kemeja itu hanya delapan belas dinar."],
      ["يَبْعُدُ الْمَطَارُ عَنِ الْفُنْدُقِ أَرْبَعَةَ عَشَرَ كِيلُومِتْرًا.", "Yab'udul matharu 'anil funduqi arba'ata 'asyara kilumitran.", "Bandara berjarak empat belas kilometer dari hotel."],
      ["وُلِدَ أَخِي فِي الْيَوْمِ السَّابِعِ مِنْ شَهْرِ مَارِسَ.", "Wulida akhi fil yaumis sabi'i min syahri Marisa.", "Adikku lahir pada hari ketujuh bulan Maret."],
      ["حَضَرَ الِاجْتِمَاعَ تِسْعَةَ عَشَرَ مُوَظَّفًا.", "Hadharal ijtima'a tis'ata 'asyara muwazhzhafan.", "Sembilan belas pegawai menghadiri rapat."],
    ],
  ],
  // 8. Warna Terdengar
  [
    [
      ["أَبْيَضُ", "Abyadhu", "putih"],
      ["أَسْوَدُ", "Aswadu", "hitam"],
      ["بُنِّيٌّ", "Bunniyyun", "cokelat"],
      ["رَمَادِيٌّ", "Ramadiyyun", "abu-abu", ["Kamu mendengar \"ramaadiyyun\". Warna itu...", "abu-abu", "ungu", "merah muda", "jingga"]],
    ],
    [
      ["الْقِطَّةُ الْبَيْضَاءُ نَائِمَةٌ.", "Al-qiththatul baidha'u na'imatun.", "Kucing putih itu sedang tidur."],
      ["اشْتَرَيْتُ حِذَاءً أَسْوَدَ.", "Isytaraitu hidza'an aswada.", "Saya membeli sepatu hitam."],
      ["لَوْنُ الْبَحْرِ أَزْرَقُ دَاكِنٌ.", "Launul bahri azraqu dakinun.", "Warna laut biru tua."],
      ["تُحِبُّ أُخْتِي اللَّوْنَ الْوَرْدِيَّ.", "Tuhibbu ukhtil launal wardiyya.", "Adikku suka warna merah muda.", ["Warna kesukaan adik dalam audio adalah...", "merah muda", "merah", "ungu", "kuning"]],
    ],
    [
      ["تَغَيَّرَ لَوْنُ السَّمَاءِ إِلَى الْبُرْتُقَالِيِّ عِنْدَ الْغُرُوبِ.", "Taghayyara launus sama'i ilal burtuqaliyyi 'indal ghurubi.", "Warna langit berubah menjadi jingga saat matahari terbenam."],
      ["الْعَلَمُ الْيَابَانِيُّ أَبْيَضُ وَفِي وَسَطِهِ دَائِرَةٌ حَمْرَاءُ.", "Al-'alamul yabaniyyu abyadhu wa fi wasathihi da'iratun hamra'u.", "Bendera Jepang putih dan di tengahnya ada lingkaran merah."],
      ["أَبْحَثُ عَنْ حَقِيبَةٍ خَضْرَاءَ لَهَا جُيُوبٌ كَثِيرَةٌ.", "Abhatsu 'an haqibatin khadhra'a laha juyubun katsiratun.", "Saya mencari tas hijau yang punya banyak kantong."],
      ["صَبَغَ أَبِي جُدْرَانَ الْبَيْتِ بِاللَّوْنِ الْأَصْفَرِ الْفَاتِحِ.", "Shabagha abi judranal baiti bil launil ashfaril fatihi.", "Ayahku mengecat dinding rumah dengan warna kuning muda."],
    ],
  ],
  // 9. Instruksi Kelas
  [
    [
      ["اسْتَمِعْ", "Istami'", "dengarkan!"],
      ["كَرِّرْ", "Karrir", "ulangi!", ["Instruksi كَرِّرْ meminta kita untuk...", "mengulangi", "menulis", "duduk", "diam"]],
      ["انْظُرْ", "Unzhur", "lihatlah!"],
      ["أَجِبْ", "Ajib", "jawablah!"],
    ],
    [
      ["أَغْلِقُوا الْكُتُبَ مِنْ فَضْلِكُمْ.", "Aghliqul kutuba min fadhlikum.", "Tolong tutup buku kalian."],
      ["ارْفَعْ يَدَكَ إِذَا عَرَفْتَ الْجَوَابَ.", "Irfa' yadaka idza 'arafta al-jawaba.", "Angkat tanganmu jika kamu tahu jawabannya.", ["Apa yang harus dilakukan siswa jika tahu jawabannya?", "mengangkat tangan", "berdiri", "menulis di papan", "keluar kelas"]],
      ["اقْرَأِ الْجُمْلَةَ الْأُولَى.", "Iqra'il jumlatal ula.", "Bacalah kalimat pertama."],
      ["اكْتُبُوا التَّارِيخَ فِي أَعْلَى الصَّفْحَةِ.", "Uktubut tarikha fi a'lash shafhati.", "Tulislah tanggal di bagian atas halaman."],
    ],
    [
      ["قَسِّمُوا أَنْفُسَكُمْ إِلَى مَجْمُوعَاتٍ، كُلُّ مَجْمُوعَةٍ أَرْبَعَةُ طُلَّابٍ.", "Qassimu anfusakum ila majmu'atin, kullu majmu'atin arba'atu thullabin.", "Bagilah diri kalian menjadi kelompok, tiap kelompok empat siswa."],
      ["اسْتَمِعُوا إِلَى الْحِوَارِ ثُمَّ أَجِيبُوا عَنِ الْأَسْئِلَةِ.", "Istami'u ilal hiwari tsumma ajibu 'anil as'ilati.", "Dengarkan dialognya lalu jawablah pertanyaan-pertanyaannya."],
      ["لَا تَسْتَعْمِلُوا الْمُعْجَمَ فِي هٰذَا التَّمْرِينِ.", "La tasta'milul mu'jama fi hadzat tamrini.", "Jangan memakai kamus dalam latihan ini."],
      ["سَلِّمُوا الْوَاجِبَ قَبْلَ يَوْمِ الْخَمِيسِ.", "Sallimul wajiba qabla yaumil khamisi.", "Serahkan PR sebelum hari Kamis."],
    ],
  ],
  // 10. Makanan dan Minuman
  [
    [
      ["تَمْرٌ", "Tamrun", "kurma"],
      ["عَسَلٌ", "'Asalun", "madu"],
      ["جُبْنٌ", "Jubnun", "keju"],
      ["قَهْوَةٌ", "Qahwatun", "kopi", ["Kamu mendengar \"qahwatun\". Itu adalah...", "kopi", "teh", "susu", "jus"]],
    ],
    [
      ["أُرِيدُ كُوبًا مِنَ الشَّايِ بِالنَّعْنَاعِ.", "Uridu kuban minasy syayi bin na'na'i.", "Saya mau segelas teh dengan daun mint."],
      ["هَلْ تُحِبُّ الدَّجَاجَ الْمَقْلِيَّ؟", "Hal tuhibbud dajajal maqliyya?", "Apakah kamu suka ayam goreng?"],
      ["الْعَصِيرُ بَارِدٌ وَلَذِيذٌ.", "Al-'ashiru baridun wa ladzidzun.", "Jusnya dingin dan enak."],
      ["أَكَلْنَا الْفَلَافِلَ فِي الْفُطُورِ.", "Akalnal falafila fil futhuri.", "Kami makan falafel saat sarapan.", ["Kapan mereka makan falafel?", "saat sarapan", "saat makan siang", "saat makan malam", "saat camilan sore"]],
    ],
    [
      ["طَلَبَ أَبِي صَحْنَ أَرُزٍّ وَطَلَبَتْ أُمِّي سَمَكًا.", "Thalaba abi shahna aruzzin wa thalabat ummi samakan.", "Ayah memesan sepiring nasi dan ibu memesan ikan."],
      ["لَا أَشْرَبُ الْقَهْوَةَ فِي الْمَسَاءِ لِأَنَّهَا تَمْنَعُنِي مِنَ النَّوْمِ.", "La asyrabul qahwata fil masa'i li'annaha tamna'uni minan naumi.", "Saya tidak minum kopi di malam hari karena membuatku tak bisa tidur."],
      ["أَفْطَرْنَا عَلَى التَّمْرِ وَالْمَاءِ ثُمَّ صَلَّيْنَا.", "Aftharna 'alat tamri wal ma'i tsumma shallaina.", "Kami berbuka dengan kurma dan air lalu salat."],
      ["فِي هٰذَا الْمَطْعَمِ أَطْبَاقٌ عَرَبِيَّةٌ وَآسِيَوِيَّةٌ.", "Fi hadzal math'ami athbaqun 'arabiyyatun wa asiyawiyyatun.", "Di restoran ini ada hidangan Arab dan Asia."],
    ],
  ],
  // 11. Apa Kabar
  [
    [
      ["بِخَيْرٍ", "Bikhairin", "baik"],
      ["الْحَمْدُ لِلّٰهِ", "Alhamdu lillahi", "segala puji bagi Allah"],
      ["تَعْبَانُ", "Ta'banu", "lelah"],
      ["مَسْرُورٌ", "Masrurun", "senang", ["Kamu mendengar \"ana masruurun\". Perasaan pembicara...", "senang", "sedih", "lelah", "marah"]],
    ],
    [
      ["كَيْفَ حَالُ أُسْرَتِكَ؟", "Kaifa halu usratika?", "Bagaimana kabar keluargamu?"],
      ["أَنَا مَرِيضٌ قَلِيلًا الْيَوْمَ.", "Ana maridhun qalilan al-yauma.", "Saya sedikit sakit hari ini.", ["Bagaimana keadaan pembicara?", "sedikit sakit", "sangat senang", "lapar", "sibuk"]],
      ["كُلُّنَا بِخَيْرٍ، شُكْرًا لِسُؤَالِكَ.", "Kulluna bikhairin, syukran lisu'alika.", "Kami semua baik, terima kasih atas pertanyaanmu."],
      ["كَيْفَ كَانَ يَوْمُكَ؟", "Kaifa kana yaumuka?", "Bagaimana harimu?"],
    ],
    [
      ["الْحَمْدُ لِلّٰهِ، صِحَّتِي أَفْضَلُ مِنَ الْأُسْبُوعِ الْمَاضِي.", "Alhamdu lillahi, shihhati afdhalu minal usbu'il madhi.", "Alhamdulillah, kesehatanku lebih baik dari minggu lalu."],
      ["سَمِعْتُ أَنَّكَ كُنْتَ مَرِيضًا، هَلْ تَحَسَّنْتَ؟", "Sami'tu annaka kunta maridhan, hal tahassanta?", "Saya dengar kamu sakit, apakah sudah membaik?"],
      ["أَنَا مُتْعَبٌ لِأَنِّي عَمِلْتُ طُولَ اللَّيْلِ.", "Ana mut'abun li'anni 'amiltu thulal laili.", "Saya lelah karena bekerja sepanjang malam."],
      ["طَمْئِنِّي عَلَى أَخْبَارِ وَالِدَيْكَ.", "Thamin'inni 'ala akhbari walidaika.", "Kabari aku tentang keadaan kedua orang tuamu."],
    ],
  ],
  // 12. Jam Sederhana
  [
    [
      ["الْوَاحِدَةُ", "Al-wahidatu", "jam satu"],
      ["الرَّابِعَةُ", "Ar-rabi'atu", "jam empat"],
      ["التَّاسِعَةُ", "At-tasi'atu", "jam sembilan", ["Kamu mendengar \"as-saa'atut taasi'atu\". Jam berapa?", "09.00", "07.00", "04.00", "11.00"]],
      ["الْعَاشِرَةُ", "Al-'asyiratu", "jam sepuluh"],
    ],
    [
      ["السَّاعَةُ الْخَامِسَةُ إِلَّا رُبْعًا.", "As-sa'atul khamisatu illa rub'an.", "Jam lima kurang seperempat.", ["Jam berapa yang disebut?", "04.45", "05.15", "05.45", "04.15"]],
      ["السَّاعَةُ السَّادِسَةُ وَالرُّبْعُ.", "As-sa'atus sadisatu war rub'u.", "Jam enam lewat seperempat."],
      ["تَبْدَأُ الْمُحَاضَرَةُ فِي الثَّامِنَةِ.", "Tabda'ul muhadharatu fits tsaminati.", "Kuliah dimulai jam delapan."],
      ["أَنَامُ فِي الْحَادِيَةَ عَشْرَةَ لَيْلًا.", "Anamu fil hadiyata 'asyrata lailan.", "Saya tidur jam sebelas malam."],
    ],
    [
      ["يُغَادِرُ الْقِطَارُ فِي السَّاعَةِ الثَّانِيَةِ وَعَشْرِ دَقَائِقَ.", "Yughadirul qitharu fis sa'atits tsaniyati wa 'asyri daqa'iqa.", "Kereta berangkat jam dua lewat sepuluh menit."],
      ["مَوْعِدُ الطَّبِيبِ فِي الْعَاشِرَةِ وَالنِّصْفِ صَبَاحًا.", "Mau'idu ath-thabibi fil 'asyirati wan nishfi shabahan.", "Janji dengan dokter jam setengah sebelas pagi."],
      ["يُفْتَحُ الْمَتْجَرُ مِنَ التَّاسِعَةِ حَتَّى الْعَاشِرَةِ مَسَاءً.", "Yuftahul matjaru minat tasi'ati hattal 'asyirati masa'an.", "Toko buka dari jam sembilan sampai jam sepuluh malam."],
      ["وَصَلْتُ إِلَى الْبَيْتِ فِي السَّابِعَةِ إِلَّا خَمْسَ دَقَائِقَ.", "Washaltu ilal baiti fis sabi'ati illa khamsa daqa'iqa.", "Saya tiba di rumah jam tujuh kurang lima menit."],
    ],
  ],
  // 13. Lokasi Benda
  [
    [
      ["فَوْقَ", "Fauqa", "di atas"],
      ["تَحْتَ", "Tahta", "di bawah"],
      ["أَمَامَ", "Amama", "di depan", ["Lawan kata أَمَامَ adalah...", "خَلْفَ", "فَوْقَ", "تَحْتَ", "بَيْنَ"]],
      ["بَيْنَ", "Baina", "di antara"],
    ],
    [
      ["الْقِطَّةُ تَحْتَ السَّرِيرِ.", "Al-qiththatu tahtas sariri.", "Kucing itu di bawah tempat tidur.", ["Di mana kucing itu?", "di bawah tempat tidur", "di atas meja", "di depan pintu", "di dalam lemari"]],
      ["الْمِفْتَاحُ فَوْقَ الثَّلَّاجَةِ.", "Al-miftahu fauqats tsallajati.", "Kunci ada di atas kulkas."],
      ["السَّيَّارَةُ خَلْفَ الْبَيْتِ.", "As-sayyaratu khalfal baiti.", "Mobil ada di belakang rumah."],
      ["الْمَكْتَبَةُ بَيْنَ الْمَسْجِدِ وَالْمَدْرَسَةِ.", "Al-maktabatu bainal masjidi wal madrasati.", "Perpustakaan ada di antara masjid dan sekolah."],
    ],
    [
      ["وَضَعْتُ النَّظَّارَةَ دَاخِلَ الدُّرْجِ الْأَيْمَنِ.", "Wadha'tun nazhzharata dakhilad durjil aimani.", "Saya menaruh kacamata di dalam laci kanan."],
      ["الْهَاتِفُ بِجَانِبِ الْحَاسُوبِ عَلَى الْمَكْتَبِ.", "Al-hatifu bijanibil hasubi 'alal maktabi.", "Telepon ada di samping komputer di atas meja."],
      ["الْأَحْذِيَةُ عِنْدَ الْبَابِ، لَا تُدْخِلْهَا إِلَى الْبَيْتِ.", "Al-ahdziyatu 'indal babi, la tudkhilha ilal baiti.", "Sepatu ada di dekat pintu, jangan dibawa masuk ke rumah."],
      ["عَلَّقْتُ الْمِعْطَفَ خَلْفَ بَابِ الْغُرْفَةِ.", "'Allaqtul mi'thafa khalfa babil ghurfati.", "Saya menggantung mantel di balik pintu kamar."],
    ],
  ],
  // 14. Keluarga Terdengar
  [
    [
      ["جَدٌّ", "Jaddun", "kakek"],
      ["حَفِيدٌ", "Hafidun", "cucu (lk)"],
      ["زَوْجٌ", "Zaujun", "suami"],
      ["زَوْجَةٌ", "Zaujatun", "istri", ["Kamu mendengar \"zaujatii\". Maksudnya...", "istriku", "suamiku", "anakku", "ibuku"]],
    ],
    [
      ["عِنْدِي ثَلَاثَةُ أَحْفَادٍ.", "'Indi tsalatsatu ahfadin.", "Saya punya tiga cucu."],
      ["أُمُّ أَبِي هِيَ جَدَّتِي.", "Ummu abi hiya jaddati.", "Ibu dari ayahku adalah nenekku."],
      ["خَالَتِي تُدَرِّسُ فِي الْجَامِعَةِ.", "Khalati tudarrisu fil jami'ati.", "Bibiku (dari ibu) mengajar di universitas.", ["Siapa yang mengajar di universitas?", "bibi dari pihak ibu", "bibi dari pihak ayah", "nenek", "kakak perempuan"]],
      ["ابْنِي الْكَبِيرُ فِي الصَّفِّ السَّادِسِ.", "Ibniyal kabiru fish shaffis sadisi.", "Anak sulungku di kelas enam."],
    ],
    [
      ["تَزَوَّجَتْ أُخْتِي الْكُبْرَى فِي الشَّهْرِ الْمَاضِي.", "Tazawwajat ukhtiyal kubra fisy syahril madhi.", "Kakak perempuan sulungku menikah bulan lalu."],
      ["نَزُورُ أَقَارِبَنَا فِي الْقَرْيَةِ فِي الْعِيدِ.", "Nazuru aqaribana fil qaryati fil 'idi.", "Kami mengunjungi kerabat di desa saat hari raya."],
      ["عَمَّتِي لَهَا أَرْبَعَةُ أَوْلَادٍ كُلُّهُمْ أَطِبَّاءُ.", "'Ammati laha arba'atu auladin kulluhum athibba'u.", "Bibiku (dari ayah) punya empat anak, semuanya dokter."],
      ["يَعِيشُ جَدِّي وَجَدَّتِي مَعَنَا فِي الْبَيْتِ نَفْسِهِ.", "Ya'isyu jaddi wa jaddati ma'ana fil baiti nafsihi.", "Kakek dan nenekku tinggal bersama kami di rumah yang sama."],
    ],
  ],
  // 15. Hobi Terdengar
  [
    [
      ["الرِّيَاضَةُ", "Ar-riyadhatu", "olahraga"],
      ["الْخَطُّ", "Al-khaththu", "kaligrafi"],
      ["الْغِنَاءُ", "Al-ghina'u", "menyanyi"],
      ["الزِّرَاعَةُ", "Az-zira'atu", "bercocok tanam", ["Kamu mendengar \"hiwaayatiz ziraa'atu\". Hobinya...", "bercocok tanam", "memasak", "menyanyi", "berenang"]],
    ],
    [
      ["أَلْعَبُ كُرَةَ السَّلَّةِ مَعَ أَصْدِقَائِي.", "Al'abu kuratas sallati ma'a ashdiqa'i.", "Saya bermain bola basket bersama teman-temanku."],
      ["هِوَايَةُ أُخْتِي الْخِيَاطَةُ.", "Hiwayatu ukhtil khiyathatu.", "Hobi kakakku menjahit."],
      ["يُحِبُّ أَبِي رُكُوبَ الدَّرَّاجَةِ.", "Yuhibbu abi rukubad darrajati.", "Ayahku suka bersepeda.", ["Hobi ayah dalam audio adalah...", "bersepeda", "berenang", "memancing", "membaca"]],
      ["أَكْتُبُ الشِّعْرَ فِي وَقْتِ الْفَرَاغِ.", "Aktubusy syi'ra fi waqtil faraghi.", "Saya menulis puisi di waktu luang."],
    ],
    [
      ["أَتَدَرَّبُ عَلَى السِّبَاحَةِ ثَلَاثَ مَرَّاتٍ فِي الْأُسْبُوعِ.", "Atadarrabu 'alas sibahati tsalatsa marratin fil usbu'i.", "Saya berlatih renang tiga kali seminggu."],
      ["اشْتَرَكَ أَخِي فِي نَادٍ لِلشِّطْرَنْجِ.", "Isytaraka akhi fi nadin lisy syithranji.", "Kakakku bergabung dengan klub catur."],
      ["تَعَلَّمْتُ الْخَطَّ الْعَرَبِيَّ مِنْ خَطَّاطٍ مَشْهُورٍ.", "Ta'allamtul khaththal 'arabiyya min khaththathin masyhurin.", "Saya belajar kaligrafi Arab dari kaligrafer terkenal."],
      ["نَذْهَبُ إِلَى الْجِبَالِ لِلتَّخْيِيمِ فِي الْعُطْلَةِ.", "Nadzhabu ilal jibali lit takhyimi fil 'uthlati.", "Kami pergi ke pegunungan untuk berkemah saat liburan."],
    ],
  ],
  // 16. Arah Sederhana
  [
    [
      ["يَمِينٌ", "Yaminun", "kanan"],
      ["يَسَارٌ", "Yasarun", "kiri", ["Lawan kata يَسَارٌ adalah...", "يَمِينٌ", "أَمَامٌ", "فَوْقٌ", "قَرِيبٌ"]],
      ["مُسْتَقِيمًا", "Mustaqiman", "lurus"],
      ["شَمَالٌ", "Syamalun", "utara"],
    ],
    [
      ["اذْهَبْ مُسْتَقِيمًا ثُمَّ إِلَى الْيَمِينِ.", "Idzhab mustaqiman tsumma ilal yamini.", "Jalan lurus lalu ke kanan.", ["Urutan arah dalam audio adalah...", "lurus, lalu kanan", "kanan, lalu lurus", "lurus, lalu kiri", "kiri, lalu kanan"]],
      ["الْبَنْكُ عَلَى الْيَسَارِ.", "Al-banku 'alal yasari.", "Bank ada di sebelah kiri."],
      ["الْمَسْجِدُ قَرِيبٌ مِنْ هُنَا.", "Al-masjidu qaribun min huna.", "Masjid dekat dari sini."],
      ["عِنْدَ الْإِشَارَةِ انْعَطِفْ يَسَارًا.", "'Indal isyarati in'athif yasaran.", "Di lampu lalu lintas, belok kiri."],
    ],
    [
      ["امْشِ حَتَّى نِهَايَةِ الشَّارِعِ، وَالْمُسْتَشْفَى عَلَى يَمِينِكَ.", "Imsyi hatta nihayatisy syari'i, wal mustasyfa 'ala yaminika.", "Berjalanlah sampai ujung jalan, dan rumah sakit ada di sebelah kananmu."],
      ["اعْبُرِ الْجِسْرَ ثُمَّ خُذِ الطَّرِيقَ الثَّانِيَ.", "U'burul jisra tsumma khudzith thariqats tsaniya.", "Seberangi jembatan lalu ambil jalan kedua."],
      ["تَقَعُ الْمَحَطَّةُ جَنُوبَ الْمَدِينَةِ.", "Taqa'ul mahaththatu janubal madinati.", "Stasiun terletak di selatan kota."],
      ["الْفُنْدُقُ مُقَابِلَ الْحَدِيقَةِ الْعَامَّةِ تَمَامًا.", "Al-funduqu muqabilal hadiqatil 'ammati tamaman.", "Hotel tepat di seberang taman umum."],
    ],
  ],
  // 17. Dialog Pasar
  [
    [
      ["بِكَمْ؟", "Bikam?", "berapa harganya?"],
      ["غَالٍ", "Ghalin", "mahal"],
      ["رَخِيصٌ", "Rakhishun", "murah", ["Lawan kata رَخِيصٌ adalah...", "غَالٍ", "كَبِيرٌ", "جَدِيدٌ", "قَلِيلٌ"]],
      ["كِيلُو", "Kilu", "kilo"],
    ],
    [
      ["بِكَمْ كِيلُو الطَّمَاطِمِ؟", "Bikam kilut thamathimi?", "Berapa harga sekilo tomat?"],
      ["بِخَمْسَةِ رِيَالَاتٍ.", "Bikhamsati riyalatin.", "Lima riyal.", ["Berapa harga yang disebut penjual?", "lima riyal", "lima belas riyal", "lima puluh riyal", "tiga riyal"]],
      ["هٰذَا غَالٍ، هَلْ عِنْدَكَ أَرْخَصُ؟", "Hadza ghalin, hal 'indaka arkhashu?", "Ini mahal, apakah ada yang lebih murah?"],
      ["أَعْطِنِي كِيلُوَيْنِ مِنَ الْبَطَاطِسِ.", "A'thini kiluwaini minal bathathisi.", "Berikan saya dua kilo kentang."],
    ],
    [
      ["الْبَائِعُ: هٰذَا التُّفَّاحُ طَازَجٌ، وَصَلَ صَبَاحَ الْيَوْمِ.", "Al-ba'i'u: hadzat tuffahu thazajun, washala shabahal yaumi.", "Penjual: apel ini segar, baru tiba pagi ini."],
      ["الْمُشْتَرِي: سَآخُذُ ثَلَاثَةَ كِيلُوَاتٍ إِذَا أَعْطَيْتَنِي تَخْفِيضًا.", "Al-musytari: sa'akhudzu tsalatsata kiluwatin idza a'thaitani takhfidhan.", "Pembeli: saya ambil tiga kilo kalau kamu beri saya diskon."],
      ["تَفَضَّلْ، هٰذَا الْبَاقِي وَشُكْرًا لِشِرَائِكَ.", "Tafadhdhal, hadzal baqi wa syukran lisyira'ika.", "Silakan, ini kembaliannya dan terima kasih atas pembelianmu."],
      ["لَا يُوجَدُ عِنْدِي فَكَّةٌ، هَلْ تَقْبَلُ الْبِطَاقَةَ؟", "La yujadu 'indi fakkatun, hal taqbalul bithaqata?", "Saya tidak punya uang kecil, apakah kamu terima kartu?"],
    ],
  ],
  // 18. Dialog Sekolah
  [
    [
      ["حِصَّةٌ", "Hishshatun", "jam pelajaran"],
      ["فُسْحَةٌ", "Fushatun", "jam istirahat"],
      ["وَاجِبٌ", "Wajibun", "PR / tugas", ["Kamu mendengar \"'indanaa waajibun\". Artinya...", "kami punya PR", "kami libur", "kami terlambat", "kami lapar"]],
      ["نَتِيجَةٌ", "Natijatun", "hasil / nilai"],
    ],
    [
      ["مَا الْحِصَّةُ الْأُولَى الْيَوْمَ؟", "Mal hishshatul ula al-yauma?", "Apa jam pelajaran pertama hari ini?"],
      ["الْحِصَّةُ الْأُولَى رِيَاضِيَّاتٌ.", "Al-hishshatul ula riyadhiyyatun.", "Jam pelajaran pertama matematika.", ["Pelajaran pertama hari ini adalah...", "matematika", "bahasa Arab", "sejarah", "olahraga"]],
      ["هَلْ أَنْهَيْتَ الْوَاجِبَ؟", "Hal anhaital wajiba?", "Apakah kamu sudah menyelesaikan PR?"],
      ["لَيْسَ بَعْدُ، سَأُنْهِيهِ فِي الْفُسْحَةِ.", "Laisa ba'du, sa'unhihi fil fushati.", "Belum, akan saya selesaikan saat istirahat."],
    ],
    [
      ["الطَّالِبُ: يَا أُسْتَاذُ، لَمْ أَفْهَمِ السُّؤَالَ الثَّالِثَ.", "Ath-thalibu: ya ustadzu, lam afhamis su'alats tsalitsa.", "Siswa: Pak Guru, saya belum paham soal ketiga."],
      ["الْمُعَلِّمُ: اقْرَأْهُ مَرَّةً أُخْرَى، وَانْتَبِهْ إِلَى الْكَلِمَةِ الْأَخِيرَةِ.", "Al-mu'allimu: iqra'hu marratan ukhra, wantabih ilal kalimatil akhirati.", "Guru: bacalah sekali lagi dan perhatikan kata terakhir."],
      ["أُعْلِنَتْ نَتَائِجُ الِامْتِحَانِ، وَنَجَحَ جَمِيعُ الطُّلَّابِ.", "U'linat nata'ijul imtihani, wa najaha jami'uth thullabi.", "Hasil ujian sudah diumumkan, dan semua siswa lulus."],
      ["سَنَذْهَبُ فِي رِحْلَةٍ مَدْرَسِيَّةٍ إِلَى الْمَتْحَفِ الْوَطَنِيِّ.", "Sanadzhabu fi rihlatin madrasiyyatin ilal mathafil wathaniyyi.", "Kami akan pergi karyawisata sekolah ke museum nasional."],
    ],
  ],
  // 19. Pengumuman Pendek
  [
    [
      ["تَنْبِيهٌ", "Tanbihun", "peringatan / pemberitahuan"],
      ["إِعْلَانٌ", "I'lanun", "pengumuman"],
      ["مُغْلَقٌ", "Mughlaqun", "tutup"],
      ["مَفْتُوحٌ", "Maftuhun", "buka", ["Lawan kata مَفْتُوحٌ adalah...", "مُغْلَقٌ", "مَكْسُورٌ", "مَشْغُولٌ", "مَمْنُوعٌ"]],
    ],
    [
      ["الْمَكْتَبَةُ مُغْلَقَةٌ يَوْمَ الْجُمُعَةِ.", "Al-maktabatu mughlaqatun yaumal jumu'ati.", "Perpustakaan tutup pada hari Jumat.", ["Kapan perpustakaan tutup?", "hari Jumat", "hari Sabtu", "hari Kamis", "setiap hari"]],
      ["الرَّجَاءُ إِغْلَاقُ الْهَوَاتِفِ.", "Ar-raja'u ighlaqul hawatifi.", "Mohon matikan telepon."],
      ["تَأَخَّرَتِ الرِّحْلَةُ سَاعَةً وَاحِدَةً.", "Ta'akhkharatir rihlatu sa'atan wahidatan.", "Penerbangan tertunda satu jam."],
      ["مَمْنُوعٌ التَّدْخِينُ هُنَا.", "Mamnu'un at-tadkhinu huna.", "Dilarang merokok di sini."],
    ],
    [
      ["نُعْلِنُ عَنْ بَدْءِ التَّسْجِيلِ فِي الدَّوْرَةِ الصَّيْفِيَّةِ يَوْمَ الْأَحَدِ.", "Nu'linu 'an bad'it tasjili fid dauratish shaifiyyati yaumal ahadi.", "Kami mengumumkan pendaftaran kursus musim panas dimulai hari Minggu."],
      ["عَلَى الْمُسَافِرِينَ إِلَى دُبَيّ التَّوَجُّهُ إِلَى الْبَوَّابَةِ الْخَامِسَةِ.", "'Alal musafirina ila Dubai at-tawajjuhu ilal bawwabatil khamisati.", "Para penumpang ke Dubai harap menuju gerbang lima."],
      ["سَتَنْقَطِعُ الْمِيَاهُ غَدًا مِنَ الثَّامِنَةِ حَتَّى الظُّهْرِ.", "Satanqathi'ul miyahu ghadan minats tsaminati hattazh zhuhri.", "Air akan mati besok dari jam delapan sampai zuhur."],
      ["يُرْجَى مِنْ صَاحِبِ السَّيَّارَةِ الْبَيْضَاءِ تَحْرِيكُهَا فَوْرًا.", "Yurja min shahibis sayyaratil baidha'i tahrikuha fauran.", "Pemilik mobil putih diharap segera memindahkannya."],
    ],
  ],
  // 20. Cerita Audio Mini
  [
    [
      ["كَانَ يَا مَا كَانَ", "Kana ya ma kana", "pada zaman dahulu"],
      ["ذَاتَ يَوْمٍ", "Dzata yaumin", "suatu hari"],
      ["فِي النِّهَايَةِ", "Fin nihayati", "pada akhirnya"],
      ["فَجْأَةً", "Faj'atan", "tiba-tiba", ["Kata فَجْأَةً dalam cerita menunjukkan kejadian yang...", "tiba-tiba", "berulang", "lambat", "direncanakan"]],
    ],
    [
      ["خَرَجَ الصَّيَّادُ إِلَى الْبَحْرِ مُبَكِّرًا.", "Kharajash shayyadu ilal bahri mubakkiran.", "Nelayan itu pergi ke laut pagi-pagi."],
      ["فَجْأَةً هَبَّتْ عَاصِفَةٌ قَوِيَّةٌ.", "Faj'atan habbat 'ashifatun qawiyyatun.", "Tiba-tiba badai kencang bertiup."],
      ["رَجَعَ إِلَى الشَّاطِئِ بِسَلَامٍ.", "Raja'a ilasy syathi'i bisalamin.", "Dia kembali ke pantai dengan selamat.", ["Bagaimana akhir cerita nelayan itu?", "kembali dengan selamat", "hilang di laut", "kapalnya tenggelam", "tidak pernah pergi"]],
      ["فَرِحَتْ أُسْرَتُهُ بِعَوْدَتِهِ.", "Farihat usratuhu bi'audatihi.", "Keluarganya gembira atas kepulangannya."],
    ],
    [
      ["كَانَ هُنَاكَ وَلَدٌ فَقِيرٌ يُحِبُّ الْقِرَاءَةَ كَثِيرًا.", "Kana hunaka waladun faqirun yuhibbul qira'ata katsiran.", "Ada seorang anak miskin yang sangat suka membaca."],
      ["كَانَ يَسْتَعِيرُ الْكُتُبَ مِنْ جَارِهِ الْعَجُوزِ كُلَّ أُسْبُوعٍ.", "Kana yasta'irul kutuba min jarihil 'ajuzi kulla usbu'in.", "Ia meminjam buku dari tetangganya yang tua setiap minggu."],
      ["بَعْدَ سِنِينَ أَصْبَحَ الْوَلَدُ كَاتِبًا مَشْهُورًا.", "Ba'da sinina ashbahal waladu katiban masyhuran.", "Bertahun-tahun kemudian anak itu menjadi penulis terkenal."],
      ["أَهْدَى أَوَّلَ كِتَابٍ كَتَبَهُ إِلَى جَارِهِ الْقَدِيمِ.", "Ahda awwala kitabin katabahu ila jarihil qadimi.", "Ia menghadiahkan buku pertama yang ditulisnya kepada tetangga lamanya."],
    ],
  ],
];
