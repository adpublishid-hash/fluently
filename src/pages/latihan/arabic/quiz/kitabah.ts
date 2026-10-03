import type { QuizTopic } from './types';

// Latihan Kitabah — one entry per topic (index = topic - 1): [Basic, Intermediate, Advanced].
export const kitabah: QuizTopic[] = [
  // 1. Menulis Huruf Sambung
  [
    [
      ["سَمَكَةٌ", "Samakatun", "seekor ikan", ["Huruf س pada سَمَكَةٌ ditulis dalam bentuk...", "awal (bersambung ke kiri)", "tengah", "akhir", "terpisah"]],
      ["طَبْلٌ", "Thablun", "gendang"],
      ["صَحْنٌ", "Shahnun", "piring"],
      ["عَيْنُ مَاءٍ", "'Ainu ma'in", "mata air"],
    ],
    [
      ["الطِّفْلُ يَرْسُمُ سَمَكَةً.", "Ath-thiflu yarsumu samakatan.", "Anak kecil itu menggambar ikan."],
      ["هٰذَا صَحْنٌ نَظِيفٌ.", "Hadza shahnun nazhifun.", "Ini piring yang bersih."],
      ["يَضْرِبُ الْوَلَدُ الطَّبْلَ.", "Yadhribul waladuth thabla.", "Anak itu memukul gendang.", ["Huruf yang TIDAK bisa disambung ke huruf sesudahnya adalah...", "د", "ب", "س", "ع"]],
      ["كَتَبْتُ الْحُرُوفَ مُتَّصِلَةً.", "Katabtul hurufa muttashilatan.", "Saya menulis huruf-huruf secara bersambung."],
    ],
    [
      ["الْحُرُوفُ السِّتَّةُ الَّتِي لَا تَتَّصِلُ بِمَا بَعْدَهَا هِيَ: ا د ذ ر ز و.", "Al-hurufus sittatul lati la tattashilu bima ba'daha hiya: alif, dal, dzal, ra, zai, wau.", "Enam huruf yang tidak bersambung dengan huruf sesudahnya adalah: alif, dal, dzal, ra, zai, wau."],
      ["تَتَغَيَّرُ صُورَةُ الْهَاءِ فِي أَوَّلِ الْكَلِمَةِ وَوَسَطِهَا وَآخِرِهَا.", "Tataghayyaru shuratul ha'i fi awwalil kalimati wa wasathiha wa akhiriha.", "Bentuk huruf ha berubah di awal, tengah, dan akhir kata."],
      ["اكْتُبْ كَلِمَةَ مَدْرَسَةٍ بِخَطٍّ وَاضِحٍ.", "Uktub kalimata madrasatin bikhaththin wadhihin.", "Tulislah kata madrasah dengan tulisan yang jelas."],
      ["الْخَطُّ الْجَمِيلُ يَحْتَاجُ إِلَى تَدْرِيبٍ يَوْمِيٍّ.", "Al-khaththul jamilu yahtaju ila tadribin yaumiyyin.", "Tulisan yang indah memerlukan latihan harian."],
    ],
  ],
  // 2. Menyalin Kata Berharakat
  [
    [
      ["شَجَرَةٌ", "Syajaratun", "pohon"],
      ["قَمَرٌ", "Qamarun", "bulan"],
      ["مِفْتَاحٌ", "Miftahun", "kunci", ["Harakat pada huruf م dalam مِفْتَاحٌ adalah...", "kasrah", "fathah", "dhammah", "sukun"]],
      ["دُبٌّ", "Dubbun", "beruang"],
    ],
    [
      ["الْقَمَرُ مُنِيرٌ فِي اللَّيْلِ.", "Al-qamaru munirun fil laili.", "Bulan bersinar di malam hari."],
      ["تَحْتَ الشَّجَرَةِ ظِلٌّ بَارِدٌ.", "Tahtasy syajarati zhillun baridun.", "Di bawah pohon ada naungan yang sejuk."],
      ["ضَاعَ مِفْتَاحُ الْخِزَانَةِ.", "Dha'a miftahul khizanati.", "Kunci lemari hilang."],
      ["الدُّبُّ يُحِبُّ الْعَسَلَ.", "Ad-dubbu yuhibbul 'asala.", "Beruang suka madu.", ["Tanda ّ di atas ب pada الدُّبُّ disebut...", "syaddah", "sukun", "tanwin", "maddah"]],
    ],
    [
      ["نَقَلَ الطَّالِبُ الْفِقْرَةَ مِنَ الْكِتَابِ مَعَ الْحَرَكَاتِ كَامِلَةً.", "Naqalath thalibul fiqrata minal kitabi ma'al harakati kamilatan.", "Siswa menyalin paragraf dari buku lengkap dengan harakatnya."],
      ["الشَّدَّةُ تَدُلُّ عَلَى حَرْفَيْنِ مُتَشَابِهَيْنِ.", "Asy-syaddatu tadullu 'ala harfaini mutasyabihaini.", "Syaddah menunjukkan dua huruf yang sama."],
      ["التَّنْوِينُ لَا يُكْتَبُ مَعَ أَلِ التَّعْرِيفِ.", "At-tanwinu la yuktabu ma'a alit ta'rifi.", "Tanwin tidak ditulis bersama alif lam ta'rif."],
      ["رَاجِعْ حَرَكَاتِ الْكَلِمَاتِ قَبْلَ أَنْ تُسَلِّمَ الْوَرَقَةَ.", "Raji' harakatil kalimati qabla an tusallimal waraqata.", "Periksa harakat kata-kata sebelum kamu menyerahkan kertas."],
    ],
  ],
  // 3. Menulis Salam
  [
    [
      ["سَلَامٌ", "Salamun", "salam / damai"],
      ["تَحِيَّةٌ", "Tahiyyatun", "salam / penghormatan", ["Huruf terakhir pada تَحِيَّةٌ adalah...", "ة (ta marbuthah)", "ه (ha)", "ت (ta panjang)", "ي (ya)"]],
      ["مَرْحَبًا بِكُمْ", "Marhaban bikum", "selamat datang (kalian)"],
      ["أَطْيَبُ التَّحِيَّاتِ", "Athyabut tahiyyati", "salam terbaik"],
    ],
    [
      ["السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ.", "Assalamu 'alaikum wa rahmatullahi wa barakatuhu.", "Semoga keselamatan, rahmat Allah, dan keberkahan-Nya atas kalian."],
      ["تَحِيَّةً طَيِّبَةً وَبَعْدُ.", "Tahiyyatan thayyibatan wa ba'du.", "Salam sejahtera, dan selanjutnya.", ["Ungkapan تَحِيَّةً طَيِّبَةً وَبَعْدُ biasa ditulis di...", "awal surat", "akhir surat", "judul buku", "papan nama"]],
      ["إِلَى صَدِيقِي الْعَزِيزِ خَالِدٍ.", "Ila shadiqiyal 'azizi Khalidin.", "Kepada sahabatku tercinta, Khalid."],
      ["وَالسَّلَامُ عَلَيْكُمْ.", "Was salamu 'alaikum.", "Dan salam atas kalian (penutup)."],
    ],
    [
      ["أَكْتُبُ إِلَيْكَ هٰذِهِ الرِّسَالَةَ مِنْ مَدِينَةِ الْقَاهِرَةِ.", "Aktubu ilaika hadzihir risalata min madinatil qahirati.", "Saya menulis surat ini kepadamu dari kota Kairo."],
      ["أَبْعَثُ إِلَيْكُمْ تَحِيَّاتِي وَأَشْوَاقِي.", "Ab'atsu ilaikum tahiyyati wa asywaqi.", "Saya kirimkan salam dan kerinduanku kepada kalian."],
      ["أَرْجُو أَنْ تَصِلَكَ رِسَالَتِي وَأَنْتَ فِي أَحْسَنِ حَالٍ.", "Arju an tashilaka risalati wa anta fi ahsani halin.", "Saya harap suratku sampai kepadamu dalam keadaan terbaik."],
      ["صَدِيقُكَ الْمُخْلِصُ: يُوسُفُ.", "Shadiqukal mukhlishu: Yusufu.", "Sahabatmu yang tulus: Yusuf."],
    ],
  ],
  // 4. Menulis Identitas Diri
  [
    [
      ["الِاسْمُ الْكَامِلُ", "Al-ismul kamilu", "nama lengkap"],
      ["تَارِيخُ الْمِيلَادِ", "Tarikhul miladi", "tanggal lahir"],
      ["الْمِهْنَةُ", "Al-mihnatu", "pekerjaan"],
      ["رَقْمُ الْهَاتِفِ", "Raqmul hatifi", "nomor telepon", ["Kata هَاتِفٌ berarti...", "telepon", "alamat", "kota", "surat"]],
    ],
    [
      ["اسْمِي صَالِحٌ وَعُمْرِي ثَمَانِيَ عَشْرَةَ سَنَةً.", "Ismi Shalihun wa 'umri tsamaniya 'asyrata sanatan.", "Nama saya Saleh dan umur saya delapan belas tahun."],
      ["أَسْكُنُ فِي شَارِعِ الْحُرِّيَّةِ رَقْمِ سَبْعَةٍ.", "Askunu fi syari'il hurriyyati raqmi sab'atin.", "Saya tinggal di Jalan Kemerdekaan nomor tujuh."],
      ["أَنَا طَالِبَةٌ فِي كُلِّيَّةِ الطِّبِّ.", "Ana thalibatun fi kulliyyatith thibbi.", "Saya mahasiswi di fakultas kedokteran.", ["Mengapa ditulis طَالِبَةٌ (dengan ة)?", "karena penulisnya perempuan", "karena jamak", "karena kata kerja", "karena majrur"]],
      ["وُلِدْتُ فِي الْعَاشِرِ مِنْ يُونْيُو.", "Wulidtu fil 'asyiri min Yunyu.", "Saya lahir pada tanggal sepuluh Juni."],
    ],
    [
      ["اسْمِي حَمْزَةُ عَبْدُ اللهِ، وَأَنَا مِنْ مَدِينَةِ سِيمَارَانْغَ فِي إِنْدُونِيسِيَا.", "Ismi Hamzatu 'Abdullahi, wa ana min madinati Semarang fi Indunisiya.", "Nama saya Hamzah Abdullah, dan saya dari kota Semarang di Indonesia."],
      ["أَدْرُسُ الْهَنْدَسَةَ الْمَدَنِيَّةَ فِي السَّنَةِ الثَّالِثَةِ.", "Adrusul handasatal madaniyyata fis sanatits tsalitsati.", "Saya belajar teknik sipil di tahun ketiga."],
      ["أُتْقِنُ ثَلَاثَ لُغَاتٍ: الْعَرَبِيَّةَ وَالْإِنْجِلِيزِيَّةَ وَالْإِنْدُونِيسِيَّةَ.", "Utqinu tsalatsa lughatin: al-'arabiyyata wal injiliziyyata wal indunisiyyata.", "Saya menguasai tiga bahasa: Arab, Inggris, dan Indonesia."],
      ["مِنْ هِوَايَاتِي السِّبَاحَةُ وَكِتَابَةُ الْقِصَصِ الْقَصِيرَةِ.", "Min hiwayatis sibahatu wa kitabatul qishashil qashirati.", "Di antara hobiku adalah berenang dan menulis cerpen."],
    ],
  ],
  // 5. Jumlah Ismiyyah Sederhana
  [
    [
      ["الْغُرْفَةُ نَظِيفَةٌ", "Al-ghurfatu nazhifatun", "kamar itu bersih"],
      ["الطَّرِيقُ طَوِيلٌ", "Ath-thariqu thawilun", "jalannya panjang"],
      ["السَّمَكَةُ صَغِيرَةٌ", "As-samakatu shaghiratun", "ikan itu kecil"],
      ["الصُّورَةُ جَمِيلَةٌ", "Ash-shuratu jamilatun", "gambar itu indah", ["Penulisan yang benar untuk \"gambar itu indah\" adalah...", "الصُّورَةُ جَمِيلَةٌ", "الصُّورَةُ جَمِيلٌ", "صُورَةٌ الْجَمِيلَةُ", "الصُّورَهُ جَمِيلَهٌ"]],
    ],
    [
      ["الْمُعَلِّمُ صَبُورٌ مَعَ الطُّلَّابِ.", "Al-mu'allimu shaburun ma'ath thullabi.", "Guru itu sabar terhadap para siswa."],
      ["الطَّاوِلَةُ ثَقِيلَةٌ جِدًّا.", "Ath-thawilatu tsaqilatun jiddan.", "Meja itu sangat berat."],
      ["الشَّمْسُ سَاطِعَةٌ الْيَوْمَ.", "Asy-syamsu sathi'atun al-yauma.", "Matahari bersinar terang hari ini."],
      ["الْحَدِيقَةُ مَلِيئَةٌ بِالْأَزْهَارِ.", "Al-hadiqatu mali'atun bil azhari.", "Taman itu penuh bunga.", ["Hamzah pada مَلِيئَةٌ ditulis di atas...", "ya (ئ)", "alif (أ)", "wau (ؤ)", "garis (ء)"]],
    ],
    [
      ["الصَّدِيقُ الْوَفِيُّ كَنْزٌ ثَمِينٌ.", "Ash-shadiqul wafiyyu kanzun tsaminun.", "Sahabat yang setia adalah harta yang berharga."],
      ["الْمَكْتَبَةُ الْعَامَّةُ مَفْتُوحَةٌ لِلْجَمِيعِ.", "Al-maktabatul 'ammatu maftuhatun lil jami'i.", "Perpustakaan umum terbuka untuk semua."],
      ["الطَّالِبَاتُ مُجْتَهِدَاتٌ فِي دُرُوسِهِنَّ.", "Ath-thalibatu mujtahidatun fi durusihinna.", "Para siswi rajin dalam pelajaran mereka."],
      ["الصِّحَّةُ أَغْلَى مِنَ الْمَالِ.", "Ash-shihhatu aghla minal mali.", "Kesehatan lebih berharga daripada harta."],
    ],
  ],
  // 6. Kata Tunjuk
  [
    [
      ["هٰذِهِ حَقِيبَةٌ", "Hadzihi haqibatun", "ini tas"],
      ["ذٰلِكَ صُنْدُوقٌ", "Dzalika shunduqun", "itu kotak"],
      ["هٰؤُلَاءِ ضُيُوفٌ", "Ha'ula'i dhuyufun", "mereka ini tamu-tamu", ["Penulisan هٰؤُلَاءِ menggunakan hamzah di atas...", "wau (ؤ)", "alif (أ)", "ya (ئ)", "tidak ada hamzah"]],
      ["تِلْكَ طَائِرَةٌ", "Tilka tha'iratun", "itu pesawat"],
    ],
    [
      ["هٰذِهِ الْقِصَّةُ مُمْتِعَةٌ.", "Hadzihil qishshatu mumti'atun.", "Cerita ini menyenangkan."],
      ["ذٰلِكَ الصُّنْدُوقُ ثَقِيلٌ.", "Dzalikash shunduqu tsaqilun.", "Kotak itu berat."],
      ["تِلْكَ الطَّائِرَةُ سَرِيعَةٌ.", "Tilkath tha'iratu sari'atun.", "Pesawat itu cepat."],
      ["هٰذَا الطَّعَامُ صِحِّيٌّ.", "Hadzath tha'amu shihhiyyun.", "Makanan ini sehat.", ["Kata هٰذَا ditulis dengan alif kecil (ـٰ) karena...", "alif panjangnya tidak ditulis penuh", "salah ketik", "menandakan jamak", "menandakan muannats"]],
    ],
    [
      ["هٰذَا الْكِتَابُ الَّذِي اشْتَرَيْتُهُ أَمْسِ مُفِيدٌ جِدًّا.", "Hadzal kitabul ladzisytaraituhu amsi mufidun jiddan.", "Buku yang saya beli kemarin ini sangat bermanfaat."],
      ["تِلْكَ الْمَدِينَةُ مَشْهُورَةٌ بِأَسْوَاقِهَا الْقَدِيمَةِ.", "Tilkal madinatu masyhuratun bi aswaqihal qadimati.", "Kota itu terkenal dengan pasar-pasar lamanya."],
      ["أُولٰئِكَ الطُّلَّابُ فَازُوا فِي مُسَابَقَةِ الْخَطِّ.", "Ula'ikath thullabu fazu fi musabaqatil khaththi.", "Para siswa itu menang dalam lomba kaligrafi."],
      ["هٰذِهِ صُورَةُ جَدِّي فِي شَبَابِهِ.", "Hadzihi shuratu jaddi fi syababihi.", "Ini foto kakekku saat muda."],
    ],
  ],
  // 7. Dhamir Dasar
  [
    [
      ["كِتَابُهُ", "Kitabuhu", "bukunya (lk)"],
      ["قَلَمُهَا", "Qalamuha", "penanya (pr)", ["Dhamir هَا pada قَلَمُهَا menunjukkan pemilik...", "perempuan", "laki-laki", "saya", "kamu"]],
      ["بَيْتُنَا", "Baituna", "rumah kami"],
      ["سَيَّارَتُكَ", "Sayyaratuka", "mobilmu (lk)"],
    ],
    [
      ["هِيَ تُحِبُّ مَدْرَسَتَهَا.", "Hiya tuhibbu madrasataha.", "Dia (pr) mencintai sekolahnya."],
      ["نَحْنُ نَزُورُ جَدَّتَنَا.", "Nahnu nazuru jaddatana.", "Kami mengunjungi nenek kami."],
      ["أَيْنَ حَقِيبَتُكِ يَا سَلْمَى؟", "Aina haqibatuki ya Salma?", "Di mana tasmu, Salma?", ["Mengapa ditulis حَقِيبَتُكِ (bukan حَقِيبَةُكِ)?", "ta marbuthah berubah jadi ت saat bersambung dhamir", "karena jamak", "karena mudzakkar", "karena salah ketik"]],
      ["هُمْ يَكْتُبُونَ وَاجِبَاتِهِمْ.", "Hum yaktubuna wajibatihim.", "Mereka menulis tugas-tugas mereka."],
    ],
    [
      ["أَخَذْتُ قَلَمَهُ بِالْخَطَأِ ثُمَّ أَعَدْتُهُ إِلَيْهِ.", "Akhadztu qalamahu bil khatha'i tsumma a'adtuhu ilaihi.", "Saya mengambil penanya karena keliru lalu mengembalikannya kepadanya."],
      ["زُرْنَا عَمَّتَنَا وَأَعْطَتْنَا هَدَايَا جَمِيلَةً.", "Zurna 'ammatana wa a'thatna hadaya jamilatan.", "Kami mengunjungi bibi kami dan dia memberi kami hadiah-hadiah indah."],
      ["يَا طُلَّابُ، رَتِّبُوا كُتُبَكُمْ عَلَى مَكَاتِبِكُمْ.", "Ya thullabu, rattibu kutubakum 'ala makatibikum.", "Wahai para siswa, rapikan buku kalian di meja kalian."],
      ["سَأَلَتْهُ أُمُّهُ عَنْ دِرَاسَتِهِ فَأَخْبَرَهَا بِنَتِيجَتِهِ.", "Sa'alathu ummuhu 'an dirasatihi fa akhbaraha binatijatihi.", "Ibunya bertanya tentang pelajarannya, lalu dia memberitahunya hasilnya."],
    ],
  ],
  // 8. Benda di Kelas
  [
    [
      ["طَبْشُورَةٌ", "Thabsyuratun", "sebatang kapur"],
      ["لَوْحَةٌ", "Lauhatun", "papan / lukisan"],
      ["سَاعَةُ الْحَائِطِ", "Sa'atul ha'ithi", "jam dinding"],
      ["مَقْعَدٌ", "Maq'adun", "bangku", ["Ejaan yang benar untuk \"bangku\" adalah...", "مَقْعَدٌ", "مَكْعَدٌ", "مَقْأَدٌ", "مَقْعَضٌ"]],
    ],
    [
      ["عَلَى الْحَائِطِ سَاعَةٌ كَبِيرَةٌ.", "'Alal ha'ithi sa'atun kabiratun.", "Di dinding ada jam besar."],
      ["الطَّبْشُورَةُ بَيْضَاءُ وَقَصِيرَةٌ.", "Ath-thabsyuratu baidha'u wa qashiratun.", "Kapur itu putih dan pendek."],
      ["يَجْلِسُ كُلُّ طَالِبٍ عَلَى مَقْعَدِهِ.", "Yajlisu kullu thalibin 'ala maq'adihi.", "Setiap siswa duduk di bangkunya."],
      ["فِي الْفَصْلِ نَافِذَتَانِ كَبِيرَتَانِ.", "Fil fashli nafidzatani kabiratani.", "Di kelas ada dua jendela besar.", ["Bentuk mutsanna نَافِذَتَانِ ditulis dengan ت karena...", "ta marbuthah berubah saat ditambah akhiran", "jamak", "fiil", "mudzakkar"]],
    ],
    [
      ["عَلَّقَ الْمُعَلِّمُ لَوْحَةً عَلَيْهَا الْحُرُوفُ الْهِجَائِيَّةُ.", "'Allaqal mu'allimu lauhatan 'alaihal hurufal hija'iyyatu.", "Guru menggantung papan yang berisi huruf-huruf hijaiyah."],
      ["نَظَّفَ الطُّلَّابُ الْفَصْلَ وَرَتَّبُوا الْمَقَاعِدَ فِي صُفُوفٍ.", "Nazhzhafath thullabul fashla wa rattabul maqa'ida fi shufufin.", "Para siswa membersihkan kelas dan menata bangku dalam barisan."],
      ["تُوجَدُ فِي زَاوِيَةِ الْفَصْلِ خِزَانَةٌ لِلْكُتُبِ وَالْأَدَوَاتِ.", "Tujadu fi zawiyatil fashli khizanatun lil kutubi wal adawati.", "Di sudut kelas ada lemari untuk buku dan alat-alat."],
      ["أَحْضِرْ مَعَكَ غَدًا دَفْتَرًا جَدِيدًا وَقَلَمَ رَصَاصٍ.", "Ahdhir ma'aka ghadan daftaran jadidan wa qalama rashashin.", "Besok bawalah buku tulis baru dan pensil."],
    ],
  ],
  // 9. Keluarga Saya
  [
    [
      ["أُسْرَةٌ", "Usratun", "keluarga"],
      ["طِفْلَةٌ", "Thiflatun", "anak perempuan kecil"],
      ["عَمَّةٌ", "'Ammatun", "bibi (dari ayah)"],
      ["خَالَةٌ", "Khalatun", "bibi (dari ibu)", ["Bibi dari pihak ibu ditulis...", "خَالَةٌ", "عَمَّةٌ", "خَالَهٌ", "حَالَةٌ"]],
    ],
    [
      ["أُسْرَتِي سَعِيدَةٌ وَمُتَعَاوِنَةٌ.", "Usrati sa'idatun wa muta'awinatun.", "Keluargaku bahagia dan saling membantu."],
      ["عَمَّتِي طَبِيبَةُ أَسْنَانٍ.", "'Ammati thabibatu asnanin.", "Bibiku (dari ayah) dokter gigi."],
      ["أُخْتِي الصَّغِيرَةُ فِي الرَّوْضَةِ.", "Ukhtish shaghiratu fir raudhati.", "Adik perempuanku di taman kanak-kanak."],
      ["أُمِّي امْرَأَةٌ صَبُورَةٌ.", "Ummi imra'atun shaburatun.", "Ibuku perempuan yang sabar.", ["Hamzah pada امْرَأَةٌ ditulis di atas...", "alif (أ)", "wau (ؤ)", "ya (ئ)", "garis (ء)"]],
    ],
    [
      ["أَعِيشُ مَعَ أُسْرَتِي فِي بَيْتٍ بَسِيطٍ قُرْبَ الْبَحْرِ.", "A'isyu ma'a usrati fi baitin basithin qurbal bahri.", "Saya tinggal bersama keluargaku di rumah sederhana dekat laut."],
      ["أَبِي صَيَّادٌ مَاهِرٌ، وَأُمِّي تَبِيعُ السَّمَكَ فِي السُّوقِ.", "Abi shayyadun mahirun, wa ummi tabi'us samaka fis suqi.", "Ayahku nelayan yang terampil, dan ibuku menjual ikan di pasar."],
      ["أَخِي الْأَكْبَرُ يَدْرُسُ فِي الْعَاصِمَةِ وَيَزُورُنَا فِي الْإِجَازَةِ.", "Akhiyal akbaru yadrusu fil 'ashimati wa yazuruna fil ijazati.", "Kakak sulungku belajar di ibu kota dan mengunjungi kami saat liburan."],
      ["أَشْكُرُ اللهَ عَلَى نِعْمَةِ الْأُسْرَةِ.", "Asykurullaha 'ala ni'matil usrati.", "Saya bersyukur kepada Allah atas nikmat keluarga."],
    ],
  ],
  // 10. Rutinitas Pagi
  [
    [
      ["أَتَوَضَّأُ", "Atawadhdha'u", "saya berwudu", ["Hamzah di akhir أَتَوَضَّأُ ditulis di atas...", "alif (أ)", "wau (ؤ)", "ya (ئ)", "garis (ء)"]],
      ["أُصَلِّي", "Ushalli", "saya salat"],
      ["أُرَتِّبُ سَرِيرِي", "Urattibu sariri", "saya merapikan tempat tidurku"],
      ["أَلْبَسُ الزِّيَّ", "Albasuz ziyya", "saya memakai seragam"],
    ],
    [
      ["أَسْتَيْقِظُ فِي السَّاعَةِ الْخَامِسَةِ.", "Astaiqizhu fis sa'atil khamisati.", "Saya bangun jam lima."],
      ["أَتَنَاوَلُ الْفُطُورَ مَعَ أُسْرَتِي.", "Atanawalul futhura ma'a usrati.", "Saya sarapan bersama keluargaku."],
      ["أُنَظِّفُ أَسْنَانِي بِالْفُرْشَاةِ.", "Unazhzhifu asnani bil fursyati.", "Saya membersihkan gigi dengan sikat."],
      ["أَخْرُجُ مِنَ الْبَيْتِ فِي السَّادِسَةِ وَالنِّصْفِ.", "Akhruju minal baiti fis sadisati wan nishfi.", "Saya keluar rumah jam setengah tujuh.", ["Ejaan yang benar untuk \"setengah\" adalah...", "النِّصْفُ", "النِّسْفُ", "النِّصْبُ", "النِّضْفُ"]],
    ],
    [
      ["أَبْدَأُ يَوْمِي بِصَلَاةِ الْفَجْرِ ثُمَّ أَقْرَأُ صَفْحَةً مِنَ الْقُرْآنِ.", "Abda'u yaumi bishalatil fajri tsumma aqra'u shafhatan minal qur'ani.", "Saya memulai hari dengan salat Subuh lalu membaca satu halaman Al-Qur'an."],
      ["بَعْدَ ذٰلِكَ أُمَارِسُ الرِّيَاضَةَ عَشْرَ دَقَائِقَ فِي الْحَدِيقَةِ.", "Ba'da dzalika umarisur riyadhata 'asyra daqa'iqa fil hadiqati.", "Setelah itu saya berolahraga sepuluh menit di taman."],
      ["أُحَضِّرُ حَقِيبَتِي فِي اللَّيْلِ حَتَّى لَا أَتَأَخَّرَ صَبَاحًا.", "Uhadhdhiru haqibati fil laili hatta la ata'akhkhara shabahan.", "Saya menyiapkan tas di malam hari agar tidak terlambat pagi harinya."],
      ["أَرْكَبُ الْحَافِلَةَ الْمَدْرَسِيَّةَ مَعَ أَصْدِقَائِي.", "Arkabul hafilatal madrasiyyata ma'a ashdiqa'i.", "Saya naik bus sekolah bersama teman-temanku."],
    ],
  ],
  // 11. Kalimat Tanya
  [
    [
      ["مَاذَا تَكْتُبُ؟", "Madza taktubu?", "apa yang kamu tulis?"],
      ["مَنْ أَنْتِ؟", "Man anti?", "siapa kamu? (pr)"],
      ["لِمَنْ هٰذَا؟", "Liman hadza?", "milik siapa ini?"],
      ["أَيْنَ الصَّفُّ؟", "Ainash shaffu?", "di mana kelasnya?", ["Tanda baca di akhir kalimat tanya bahasa Arab adalah...", "؟", "?", "!", "،"]],
    ],
    [
      ["مَتَى تَبْدَأُ الْعُطْلَةُ الصَّيْفِيَّةُ؟", "Mata tabda'ul 'uthlatush shaifiyyatu?", "Kapan liburan musim panas dimulai?"],
      ["كَمْ سَاعَةً تَدْرُسُ فِي الْيَوْمِ؟", "Kam sa'atan tadrusu fil yaumi?", "Berapa jam kamu belajar dalam sehari?"],
      ["هَلْ زُرْتَ الْمَتْحَفَ الْوَطَنِيَّ؟", "Hal zurtal mathafal wathaniyya?", "Apakah kamu pernah mengunjungi museum nasional?"],
      ["لِمَاذَا أَغْلَقْتَ النَّافِذَةَ؟", "Limadza aghlaqtan nafidzata?", "Mengapa kamu menutup jendela?", ["Penulisan لِمَاذَا yang benar adalah...", "لِمَاذَا (satu kata)", "لِ مَاذَا (terpisah)", "لِمَازَا", "لِمَادَا"]],
    ],
    [
      ["مَا الْكِتَابُ الَّذِي تَنْصَحُنِي بِقِرَاءَتِهِ هٰذَا الشَّهْرَ؟", "Mal kitabul ladzi tanshahuni biqira'atihi hadzasy syahra?", "Buku apa yang kamu sarankan untuk kubaca bulan ini?"],
      ["كَيْفَ تَتَعَلَّمُ الْكَلِمَاتِ الْجَدِيدَةَ بِسُرْعَةٍ؟", "Kaifa tata'allamul kalimatil jadidata bisur'atin?", "Bagaimana kamu mempelajari kata-kata baru dengan cepat?"],
      ["أَيْنَ سَتَقْضِي إِجَازَتَكَ الْقَادِمَةَ، وَمَعَ مَنْ؟", "Aina sataqdhi ijazatakal qadimata, wa ma'a man?", "Di mana kamu akan menghabiskan liburan berikutnya, dan bersama siapa?"],
      ["هَلْ تُفَضِّلُ الدِّرَاسَةَ فِي الصَّبَاحِ أَمْ فِي الْمَسَاءِ؟", "Hal tufadhdhilud dirasata fish shabahi am fil masa'i?", "Apakah kamu lebih suka belajar pagi atau sore?"],
    ],
  ],
  // 12. Jawaban Ya/Tidak
  [
    [
      ["نَعَمْ، أَنَا طَالِبٌ", "Na'am, ana thalibun", "ya, saya siswa"],
      ["لَا، لَسْتُ مُدَرِّسًا", "La, lastu mudarrisan", "tidak, saya bukan guru", ["Mengapa ditulis مُدَرِّسًا (fathatain) setelah لَسْتُ?", "karena khabar لَيْسَ manshub", "karena majrur", "karena mubtada", "karena fa'il"]],
      ["بَلَى", "Bala", "tentu (menjawab pertanyaan negatif)"],
      ["أَجَلْ", "Ajal", "ya, benar"],
    ],
    [
      ["هَلْ أَنْتَ جَائِعٌ؟ لَا، أَكَلْتُ قَبْلَ قَلِيلٍ.", "Hal anta ja'i'un? La, akaltu qabla qalilin.", "Apakah kamu lapar? Tidak, saya baru saja makan."],
      ["هَلْ هٰذِهِ سَيَّارَتُكَ؟ نَعَمْ، هِيَ سَيَّارَتِي.", "Hal hadzihi sayyaratuka? Na'am, hiya sayyarati.", "Apakah ini mobilmu? Ya, ini mobilku."],
      ["أَلَسْتَ مِنْ مِصْرَ؟ بَلَى، أَنَا مِنْ مِصْرَ.", "Alasta min Mishra? Bala, ana min Mishra.", "Bukankah kamu dari Mesir? Benar, saya dari Mesir.", ["Kata بَلَى dipakai untuk menjawab pertanyaan yang...", "negatif (menyatakan ya)", "positif (menyatakan tidak)", "menanyakan tempat", "menanyakan waktu"]],
      ["هَلْ فَهِمْتِ الدَّرْسَ؟ نَعَمْ، فَهِمْتُهُ جَيِّدًا.", "Hal fahimtid darsa? Na'am, fahimtuhu jayyidan.", "Apakah kamu (pr) paham pelajaran? Ya, saya memahaminya dengan baik."],
    ],
    [
      ["هَلْ سَتُسَافِرُ غَدًا؟ لَا، أَجَّلْتُ السَّفَرَ إِلَى الْأُسْبُوعِ الْقَادِمِ.", "Hal satusafiru ghadan? La, ajjaltus safara ilal usbu'il qadimi.", "Apakah kamu akan bepergian besok? Tidak, saya menunda perjalanan ke minggu depan."],
      ["هَلْ قَرَأْتَ الرِّسَالَةَ؟ نَعَمْ، وَرَدَدْتُ عَلَيْهَا فَوْرًا.", "Hal qara'tar risalata? Na'am, wa radadtu 'alaiha fauran.", "Apakah kamu sudah membaca suratnya? Ya, dan saya langsung membalasnya."],
      ["أَلَمْ تُشَاهِدِ الْمُبَارَاةَ أَمْسِ؟ بَلَى، شَاهَدْتُهَا مَعَ أَبِي.", "Alam tusyahidil mubarata amsi? Bala, syahadtuha ma'a abi.", "Bukankah kamu menonton pertandingan kemarin? Tentu, saya menontonnya bersama ayah."],
      ["هَلْ كُلُّ الطُّلَّابِ حَاضِرُونَ؟ لَا، غَابَ اثْنَانِ مِنْهُمْ.", "Hal kullath thullabi hadhiruna? La, ghabatsnani minhum.", "Apakah semua siswa hadir? Tidak, dua di antara mereka absen."],
    ],
  ],
  // 13. Preposisi Dasar
  [
    [
      ["عَنِ الْمَدْرَسَةِ", "'Anil madrasati", "tentang sekolah"],
      ["مَعَ الصَّدِيقِ", "Ma'ash shadiqi", "bersama teman"],
      ["حَتَّى الْمَسَاءِ", "Hattal masa'i", "sampai sore"],
      ["فِي الصُّنْدُوقِ", "Fish shunduqi", "di dalam kotak", ["Penulisan yang benar untuk \"di dalam kotak\" adalah...", "فِي الصُّنْدُوقِ", "فِي الصُّنْدُوقُ", "فِ الصُّنْدُوقِ", "فِي السُّنْدُوقِ"]],
    ],
    [
      ["وَضَعْتُ الْكِتَابَ عَلَى الرَّفِّ.", "Wadha'tul kitaba 'alar raffi.", "Saya meletakkan buku di atas rak."],
      ["سَافَرَتْ مِنَ الرِّيَاضِ إِلَى جُدَّةَ.", "Safarat minar riyadhi ila Juddata.", "Dia (pr) bepergian dari Riyadh ke Jeddah."],
      ["تَكَلَّمَ الْمُدِيرُ عَنِ النَّظَافَةِ.", "Takallamal mudiru 'anin nazhafati.", "Direktur berbicara tentang kebersihan."],
      ["أَدْرُسُ مِنَ الصَّبَاحِ حَتَّى الظُّهْرِ.", "Adrusu minash shabahi hattazh zhuhri.", "Saya belajar dari pagi sampai zuhur.", ["Mengapa الظُّهْرِ berharakat kasrah?", "karena didahului huruf jar حَتَّى", "karena mubtada", "karena khabar", "karena maf'ul bih"]],
    ],
    [
      ["خَرَجَ الطُّلَّابُ مِنَ الْقَاعَةِ إِلَى السَّاحَةِ بَعْدَ الْمُحَاضَرَةِ.", "Kharajath thullabu minal qa'ati ilas sahati ba'dal muhadharati.", "Para siswa keluar dari aula ke halaman setelah kuliah."],
      ["كَتَبْتُ مَقَالَةً عَنْ أَهَمِّيَّةِ الْقِرَاءَةِ لِلْأَطْفَالِ.", "Katabtu maqalatan 'an ahammiyyatil qira'ati lil athfali.", "Saya menulis artikel tentang pentingnya membaca bagi anak-anak."],
      ["جَلَسْنَا تَحْتَ الشَّجَرَةِ هَرَبًا مِنْ حَرَارَةِ الشَّمْسِ.", "Jalasna tahtasy syajarati haraban min hararatisy syamsi.", "Kami duduk di bawah pohon untuk menghindari panas matahari."],
      ["ذَهَبْتُ مَعَ أَبِي إِلَى الْمَسْجِدِ لِصَلَاةِ الْجُمُعَةِ.", "Dzahabtu ma'a abi ilal masjidi lishalatil jumu'ati.", "Saya pergi bersama ayah ke masjid untuk salat Jumat."],
    ],
  ],
  // 14. Deskripsi Warna
  [
    [
      ["بَيْضَاءُ", "Baidha'u", "putih (pr)"],
      ["زَرْقَاءُ", "Zarqa'u", "biru (pr)", ["Bentuk mudzakkar dari زَرْقَاءُ adalah...", "أَزْرَقُ", "زَرِيقٌ", "زُرْقَةٌ", "مُزْرَقٌّ"]],
      ["خَضْرَاءُ", "Khadhra'u", "hijau (pr)"],
      ["صَفْرَاءُ", "Shafra'u", "kuning (pr)"],
    ],
    [
      ["الْحَقِيبَةُ سَوْدَاءُ وَالْقَلَمُ أَسْوَدُ.", "Al-haqibatu sauda'u wal qalamu aswadu.", "Tasnya hitam dan penanya hitam.", ["Mengapa سَوْدَاءُ untuk حَقِيبَةٌ dan أَسْوَدُ untuk قَلَمٌ?", "menyesuaikan muannats dan mudzakkar", "karena jumlahnya berbeda", "karena warnanya berbeda", "karena salah tulis"]],
      ["لَوْنُ الْبَيْتِ أَبْيَضُ وَبَابُهُ أَخْضَرُ.", "Launul baiti abyadhu wa babuhu akhdharu.", "Warna rumah itu putih dan pintunya hijau."],
      ["السَّيَّارَةُ الْحَمْرَاءُ سَرِيعَةٌ.", "As-sayyaratul hamra'u sari'atun.", "Mobil merah itu cepat."],
      ["الْوَرْدَةُ الصَّفْرَاءُ جَمِيلَةٌ.", "Al-wardatush shafra'u jamilatun.", "Mawar kuning itu indah."],
    ],
    [
      ["تَلْبَسُ الْعَرُوسُ فُسْتَانًا أَبْيَضَ طَوِيلًا مُزَيَّنًا بِالْوُرُودِ.", "Talbasul 'arusu fustanan abyadha thawilan muzayyanan bil wurudi.", "Pengantin perempuan memakai gaun putih panjang berhias mawar."],
      ["أَحَبُّ الْأَلْوَانِ إِلَيَّ الْأَزْرَقُ لِأَنَّهُ لَوْنُ السَّمَاءِ وَالْبَحْرِ.", "Ahabbul alwani ilayyal azraqu li'annahu launus sama'i wal bahri.", "Warna yang paling kusukai adalah biru karena warna langit dan laut."],
      ["فِي الْخَرِيفِ تَتَحَوَّلُ الْأَوْرَاقُ الْخَضْرَاءُ إِلَى صَفْرَاءَ.", "Fil kharifi tatahawwalul auraqul khadhra'u ila shafra'a.", "Di musim gugur daun-daun hijau berubah menjadi kuning."],
      ["رَسَمَتْ أُخْتِي قِطَّةً رَمَادِيَّةً ذَاتَ عُيُونٍ خَضْرَاءَ.", "Rasamat ukhti qiththatan ramadiyyatan dzata 'uyunin khadhra'a.", "Adikku menggambar kucing abu-abu yang bermata hijau."],
    ],
  ],
  // 15. Angka dalam Kalimat
  [
    [
      ["ثَلَاثُ بَنَاتٍ", "Tsalatsu banatin", "tiga anak perempuan", ["Mengapa ثَلَاثُ (tanpa ة) untuk بَنَاتٍ?", "karena yang dihitung muannats", "karena yang dihitung mudzakkar", "karena angka di atas sepuluh", "karena salah tulis"]],
      ["خَمْسَةُ رِجَالٍ", "Khamsatu rijalin", "lima orang pria"],
      ["عَشْرُ سَاعَاتٍ", "'Asyru sa'atin", "sepuluh jam"],
      ["سِتَّةُ أَيَّامٍ", "Sittatu ayyamin", "enam hari"],
    ],
    [
      ["فِي الْأُسْرَةِ أَرْبَعَةُ أَوْلَادٍ وَبِنْتَانِ.", "Fil usrati arba'atu auladin wa bintani.", "Dalam keluarga itu ada empat anak laki-laki dan dua anak perempuan."],
      ["قَرَأْتُ سَبْعَ صَفَحَاتٍ.", "Qara'tu sab'a shafahatin.", "Saya membaca tujuh halaman."],
      ["اشْتَرَى أَبِي ثَمَانِيَةَ أَقْلَامٍ.", "Isytara abi tsamaniyata aqlamin.", "Ayahku membeli delapan pena."],
      ["سَافَرْنَا تِسْعَ سَاعَاتٍ بِالْقِطَارِ.", "Safarna tis'a sa'atin bil qithari.", "Kami bepergian sembilan jam dengan kereta.", ["Penulisan angka yang benar untuk سَاعَاتٍ (muannats) adalah...", "تِسْعَ سَاعَاتٍ", "تِسْعَةَ سَاعَاتٍ", "تِسْعُونَ سَاعَاتٍ", "تَاسِعَ سَاعَاتٍ"]],
    ],
    [
      ["يَحْتَوِي الْكِتَابُ عَلَى عِشْرِينَ دَرْسًا وَثَلَاثَةِ مُلْحَقَاتٍ.", "Yahtawil kitabu 'ala 'isyrina darsan wa tsalatsati mulhaqatin.", "Buku itu berisi dua puluh pelajaran dan tiga lampiran."],
      ["زُرْنَا خَمْسَ مُدُنٍ فِي أُسْبُوعَيْنِ.", "Zurna khamsa mudunin fi usbu'aini.", "Kami mengunjungi lima kota dalam dua minggu."],
      ["فِي الْعِمَارَةِ اثْنَتَا عَشْرَةَ شَقَّةً.", "Fil 'imarati itsnata 'asyrata syaqqatan.", "Di gedung itu ada dua belas apartemen."],
      ["حَضَرَ الدَّرْسَ سَبْعَةَ عَشَرَ طَالِبًا وَخَمْسَ عَشْرَةَ طَالِبَةً.", "Hadharad darsa sab'ata 'asyara thaliban wa khamsa 'asyrata thalibatan.", "Tujuh belas siswa dan lima belas siswi menghadiri pelajaran."],
    ],
  ],
  // 16. Pesan Pendek
  [
    [
      ["سَأَتَأَخَّرُ", "Sa'ata'akhkharu", "saya akan terlambat"],
      ["اتَّصِلْ بِي", "Ittashil bi", "teleponlah aku"],
      ["أَنَا فِي الطَّرِيقِ", "Ana fith thariqi", "saya dalam perjalanan"],
      ["لَا تَنْسَ", "La tansa", "jangan lupa", ["Penulisan yang benar untuk \"jangan lupa\" (lk) adalah...", "لَا تَنْسَ", "لَا تَنْسَى", "لَا تَنْسِ", "لَا تَنْسُ"]],
    ],
    [
      ["سَأَصِلُ بَعْدَ عَشْرِ دَقَائِقَ.", "Sa'ashilu ba'da 'asyri daqa'iqa.", "Saya akan tiba sepuluh menit lagi."],
      ["لَا تَنْسَ إِحْضَارَ الْكِتَابِ غَدًا.", "La tansa ihdharal kitabi ghadan.", "Jangan lupa membawa buku besok."],
      ["الِاجْتِمَاعُ فِي السَّاعَةِ الرَّابِعَةِ.", "Al-ijtima'u fis sa'atir rabi'ati.", "Rapatnya jam empat."],
      ["أَنَا مَرِيضٌ وَلَنْ أَحْضُرَ الْيَوْمَ.", "Ana maridhun wa lan ahdhural yauma.", "Saya sakit dan tidak akan hadir hari ini.", ["Isi pesan ini adalah...", "pemberitahuan tidak hadir karena sakit", "undangan pesta", "permintaan maaf terlambat", "ucapan selamat"]],
    ],
    [
      ["أُمِّي، سَأَتَأَخَّرُ فِي الْمَدْرَسَةِ بِسَبَبِ نَشَاطٍ رِيَاضِيٍّ.", "Ummi, sa'ata'akhkharu fil madrasati bisababi nasyathin riyadhiyyin.", "Ibu, saya akan pulang terlambat dari sekolah karena kegiatan olahraga."],
      ["يَا أَحْمَدُ، هَلْ يُمْكِنُكَ أَنْ تُرْسِلَ لِي صُوَرَ الدَّرْسِ؟", "Ya Ahmadu, hal yumkinuka an tursila li shuwarad darsi?", "Ahmad, bisakah kamu mengirimkan foto-foto pelajaran kepadaku?"],
      ["تَمَّ تَأْجِيلُ الِامْتِحَانِ إِلَى يَوْمِ الثُّلَاثَاءِ، أَخْبِرِ الزُّمَلَاءَ.", "Tamma ta'jilul imtihani ila yaumits tsulatsa'i, akhbiriz zumala'a.", "Ujian ditunda ke hari Selasa, beri tahu teman-teman."],
      ["شُكْرًا عَلَى الْهَدِيَّةِ، وَصَلَتْ أَمْسِ وَهِيَ رَائِعَةٌ.", "Syukran 'alal hadiyyati, washalat amsi wa hiya ra'i'atun.", "Terima kasih atas hadiahnya, sampai kemarin dan sangat bagus."],
    ],
  ],
  // 17. Paragraf 3 Kalimat
  [
    [
      ["أَوَّلًا", "Awwalan", "pertama"],
      ["ثُمَّ", "Tsumma", "kemudian"],
      ["أَخِيرًا", "Akhiran", "terakhir"],
      ["لِذٰلِكَ", "Lidzalika", "oleh karena itu", ["Kata penghubung untuk menyatakan akibat adalah...", "لِذٰلِكَ", "ثُمَّ", "أَوَّلًا", "لٰكِنْ"]],
    ],
    [
      ["أُحِبُّ فَصْلَ الشِّتَاءِ.", "Uhibbu fashlasy syita'i.", "Saya suka musim dingin."],
      ["فِيهِ يَنْزِلُ الْمَطَرُ وَيَبْرُدُ الْجَوُّ.", "Fihi yanzilul matharu wa yabrudul jawwu.", "Di dalamnya hujan turun dan udara menjadi dingin."],
      ["لِذٰلِكَ أَشْرَبُ الشَّايَ السَّاخِنَ كَثِيرًا.", "Lidzalika asyrabusy syayas sakhina katsiran.", "Oleh karena itu saya banyak minum teh panas."],
      ["أَوَّلًا أَغْسِلُ يَدَيَّ ثُمَّ آكُلُ.", "Awwalan aghsilu yadayya tsumma akulu.", "Pertama saya mencuci tangan lalu makan.", ["Urutan kegiatan dalam kalimat ini adalah...", "mencuci tangan, lalu makan", "makan, lalu mencuci tangan", "makan dan minum", "mencuci piring, lalu makan"]],
    ],
    [
      ["مَدِينَتِي صَغِيرَةٌ لٰكِنَّهَا جَمِيلَةٌ وَهَادِئَةٌ.", "Madinati shaghiratun lakinnaha jamilatun wa hadi'atun.", "Kotaku kecil tetapi indah dan tenang."],
      ["فِيهَا حَدَائِقُ كَثِيرَةٌ وَسُوقٌ قَدِيمٌ مَشْهُورٌ بِالْحِرَفِ الْيَدَوِيَّةِ.", "Fiha hada'iqu katsiratun wa suqun qadimun masyhurun bil hirafil yadawiyyati.", "Di sana ada banyak taman dan pasar lama yang terkenal dengan kerajinan tangan."],
      ["لِذٰلِكَ يَزُورُهَا السُّيَّاحُ مِنْ كُلِّ مَكَانٍ.", "Lidzalika yazuruhas suyyahu min kulli makanin.", "Oleh karena itu para wisatawan dari segala tempat mengunjunginya."],
      ["أَخِيرًا، أَتَمَنَّى أَنْ تَزُورَ مَدِينَتِي يَوْمًا مَا.", "Akhiran, atamanna an tazura madinati yauman ma.", "Akhirnya, saya berharap kamu mengunjungi kotaku suatu hari."],
    ],
  ],
  // 18. Dialog Mini
  [
    [
      ["أ: كَيْفَ حَالُكِ؟", "A: kaifa haluki?", "A: Bagaimana kabarmu? (pr)"],
      ["ب: بِخَيْرٍ وَالْحَمْدُ لِلّٰهِ", "B: bikhairin wal hamdu lillahi", "B: Baik, alhamdulillah"],
      ["أ: إِلَى أَيْنَ؟", "A: ila aina?", "A: Mau ke mana?"],
      ["ب: إِلَى الْمَكْتَبَةِ", "B: ilal maktabati", "B: Ke perpustakaan", ["Dalam dialog tertulis, huruf أ dan ب menandai...", "pembicara pertama dan kedua", "nomor halaman", "jawaban benar", "judul"]],
    ],
    [
      ["أ: هَلْ أَنْتَ مَشْغُولٌ الْآنَ؟", "A: hal anta masygulun al-ana?", "A: Apakah kamu sibuk sekarang?"],
      ["ب: قَلِيلًا، أَكْتُبُ تَقْرِيرًا.", "B: qalilan, aktubu taqriran.", "B: Sedikit, saya sedang menulis laporan."],
      ["أ: مَتَى تَنْتَهِي مِنْهُ؟", "A: mata tantahi minhu?", "A: Kapan kamu selesai?"],
      ["ب: بَعْدَ نِصْفِ سَاعَةٍ إِنْ شَاءَ اللهُ.", "B: ba'da nishfi sa'atin in sya'allahu.", "B: Setengah jam lagi, insya Allah.", ["Kapan B selesai menulis laporan?", "setengah jam lagi", "satu jam lagi", "besok", "sekarang"]],
    ],
    [
      ["أ: أُرِيدُ أَنْ أَحْجِزَ غُرْفَةً لِشَخْصَيْنِ لِمُدَّةِ ثَلَاثِ لَيَالٍ.", "A: uridu an ahjiza ghurfatan lisyakhshaini limuddati tsalatsi layalin.", "A: Saya ingin memesan kamar untuk dua orang selama tiga malam."],
      ["ب: عِنْدَنَا غُرْفَةٌ مُطِلَّةٌ عَلَى الْبَحْرِ، هَلْ تُنَاسِبُكَ؟", "B: 'indana ghurfatun muthillatun 'alal bahri, hal tunasibuka?", "B: Kami punya kamar yang menghadap laut, apakah cocok untukmu?"],
      ["أ: نَعَمْ، وَهَلْ يَشْمَلُ السِّعْرُ الْفُطُورَ؟", "A: na'am, wa hal yasymalus si'rul futhura?", "A: Ya, dan apakah harganya termasuk sarapan?"],
      ["ب: طَبْعًا، الْفُطُورُ مَجَّانِيٌّ مِنَ السَّادِسَةِ إِلَى الْعَاشِرَةِ.", "B: thab'an, al-futhuru majjaniyyun minas sadisati ilal 'asyirati.", "B: Tentu, sarapan gratis dari jam enam sampai jam sepuluh."],
    ],
  ],
  // 19. Kartu Perkenalan
  [
    [
      ["بِطَاقَةُ تَعَارُفٍ", "Bithaqatu ta'arufin", "kartu perkenalan"],
      ["الْبَرِيدُ الْإِلِكْتُرُونِيُّ", "Al-baridul iliktruniyyu", "surel / email"],
      ["الْهِوَايَاتُ", "Al-hiwayatu", "hobi-hobi"],
      ["اللُّغَاتُ", "Al-lughatu", "bahasa-bahasa", ["Bentuk tunggal dari اللُّغَاتُ adalah...", "اللُّغَةُ", "اللَّغْوُ", "اللُّغَى", "اللَّاغِي"]],
    ],
    [
      ["الِاسْمُ: نُورُ الْهُدَى", "Al-ismu: Nurul Huda", "Nama: Nurul Huda"],
      ["الْمَدِينَةُ: سُورَابَايَا", "Al-madinatu: Surabaya", "Kota: Surabaya"],
      ["الْعَمَلُ: مُعَلِّمَةُ رِيَاضِيَّاتٍ", "Al-'amalu: mu'allimatu riyadhiyyatin", "Pekerjaan: guru matematika (pr)"],
      ["الْهِوَايَاتُ: الْقِرَاءَةُ وَالسَّفَرُ", "Al-hiwayatu: al-qira'atu was safaru", "Hobi: membaca dan bepergian", ["Ejaan yang benar untuk \"perjalanan / bepergian\" adalah...", "السَّفَرُ", "الصَّفَرُ", "السَّفَرَةُ", "الثَّفَرُ"]],
    ],
    [
      ["مَرْحَبًا، أَنَا عَادِلٌ، مُهَنْدِسُ بَرْمَجِيَّاتٍ مِنْ جَاكَرْتَا.", "Marhaban, ana 'Adilun, muhandisu barmajiyyatin min Jakarta.", "Halo, saya Adil, insinyur perangkat lunak dari Jakarta."],
      ["أَبْحَثُ عَنْ أَصْدِقَاءَ لِتَبَادُلِ اللُّغَةِ: الْعَرَبِيَّةِ مُقَابِلَ الْإِنْدُونِيسِيَّةِ.", "Abhatsu 'an ashdiqa'a litabadulil lughati: al-'arabiyyati muqabilal indunisiyyati.", "Saya mencari teman untuk bertukar bahasa: Arab dengan Indonesia."],
      ["أُحِبُّ الطَّبْخَ وَالتَّصْوِيرَ وَالْمَشْيَ فِي الطَّبِيعَةِ.", "Uhibbuth thabkha wat tashwira wal masyya fith thabi'ati.", "Saya suka memasak, fotografi, dan berjalan di alam."],
      ["يُمْكِنُكُمْ مُرَاسَلَتِي عَلَى عُنْوَانِي الْإِلِكْتُرُونِيِّ.", "Yumkinukum murasalati 'ala 'unwaniyal iliktruniyyi.", "Kalian bisa menghubungiku lewat alamat emailku."],
    ],
  ],
  // 20. Review Tulisan Pemula
  [
    [
      ["مُسْتَشْفًى", "Mustasyfan", "sebuah rumah sakit", ["Huruf terakhir مُسْتَشْفًى ditulis dengan ى (alif maqshurah), bukan...", "ا (alif)", "ي (ya bertitik)", "ة (ta marbuthah)", "ه (ha)"]],
      ["مَسْؤُولٌ", "Mas'ulun", "penanggung jawab"],
      ["سُؤَالٌ", "Su'alun", "pertanyaan"],
      ["رَئِيسٌ", "Ra'isun", "ketua / presiden"],
    ],
    [
      ["الرَّئِيسُ يَزُورُ الْمُسْتَشْفَى الْجَدِيدَ.", "Ar-ra'isu yazurul mustasyfal jadida.", "Presiden mengunjungi rumah sakit baru."],
      ["عِنْدِي سُؤَالٌ عَنِ الدَّرْسِ.", "'Indi su'alun 'anid darsi.", "Saya punya pertanyaan tentang pelajaran."],
      ["الْمُدِيرُ مَسْؤُولٌ عَنِ الْمَدْرَسَةِ.", "Al-mudiru mas'ulun 'anil madrasati.", "Direktur bertanggung jawab atas sekolah."],
      ["قَرَأْتُ الْقِصَّةَ وَكَتَبْتُ مُلَخَّصَهَا.", "Qara'tul qishshata wa katabtu mulakhkhashaha.", "Saya membaca cerita itu dan menulis ringkasannya.", ["Hamzah pada قَرَأْتُ ditulis di atas alif karena...", "harakat sebelumnya fathah", "harakat sebelumnya kasrah", "harakat sebelumnya dhammah", "di awal kata"]],
    ],
    [
      ["اكْتُبْ فِقْرَةً عَنْ يَوْمِكَ مُسْتَخْدِمًا خَمْسَ كَلِمَاتٍ جَدِيدَةٍ.", "Uktub fiqratan 'an yaumika mustakhdiman khamsa kalimatin jadidatin.", "Tulislah paragraf tentang harimu dengan menggunakan lima kata baru."],
      ["انْتَبِهْ إِلَى كِتَابَةِ الْهَمْزَةِ وَالتَّاءِ الْمَرْبُوطَةِ.", "Intabih ila kitabatil hamzati wat ta'il marbuthati.", "Perhatikan penulisan hamzah dan ta marbuthah."],
      ["الْكِتَابَةُ الصَّحِيحَةُ تُسَاعِدُ الْقَارِئَ عَلَى الْفَهْمِ.", "Al-kitabatush shahihatu tusa'idul qari'a 'alal fahmi.", "Penulisan yang benar membantu pembaca untuk memahami."],
      ["بَعْدَ شَهْرٍ مِنَ التَّدْرِيبِ أَصْبَحَ خَطِّي أَوْضَحَ وَأَجْمَلَ.", "Ba'da syahrin minat tadribi ashbaha khaththi audhaha wa ajmala.", "Setelah sebulan berlatih, tulisanku menjadi lebih jelas dan lebih indah."],
    ],
  ],
];
