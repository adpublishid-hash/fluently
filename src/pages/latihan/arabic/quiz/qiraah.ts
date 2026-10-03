import type { QuizTopic } from './types';

// Latihan Qiraah — one entry per topic (index = topic - 1): [Basic, Intermediate, Advanced].
export const qiraah: QuizTopic[] = [
  // 1. Huruf dan Kata Pendek
  [
    [
      ["بَابٌ", "Babun", "pintu", ["Huruf pertama pada بَابٌ adalah...", "ب", "ت", "ن", "ي"]],
      ["وَلَدٌ", "Waladun", "anak laki-laki"],
      ["زَيْتٌ", "Zaitun", "minyak"],
      ["فِيلٌ", "Filun", "gajah"],
    ],
    [
      ["هٰذَا وَلَدٌ صَغِيرٌ.", "Hadza waladun shaghirun.", "Ini anak kecil."],
      ["الزَّيْتُ فِي الزُّجَاجَةِ.", "Az-zaitu fiz zujajati.", "Minyak ada di dalam botol."],
      ["رَأَيْتُ فِيلًا كَبِيرًا.", "Ra'aitu filan kabiran.", "Saya melihat gajah besar."],
      ["فَتَحَ الْوَلَدُ الْبَابَ.", "Fatahal waladul baba.", "Anak itu membuka pintu.", ["Siapa yang membuka pintu?", "anak laki-laki", "ayah", "guru", "anak perempuan"]],
    ],
    [
      ["عِنْدَ جَدِّي شَجَرَةُ زَيْتُونٍ قَدِيمَةٌ فِي الْحَدِيقَةِ.", "'Inda jaddi syajaratu zaitunin qadimatun fil hadiqati.", "Kakekku punya pohon zaitun tua di taman."],
      ["كَتَبَ الْوَلَدُ اسْمَهُ عَلَى الْوَرَقَةِ بِحُرُوفٍ كَبِيرَةٍ.", "Katabal waladusmahu 'alal waraqati bihurufin kabiratin.", "Anak itu menulis namanya di kertas dengan huruf besar."],
      ["تَعَلَّمْنَا الْيَوْمَ ثَلَاثَةَ حُرُوفٍ جَدِيدَةٍ.", "Ta'allamnal yauma tsalatsata hurufin jadidatin.", "Hari ini kami belajar tiga huruf baru."],
      ["قَرَأَتِ الْبِنْتُ الْكَلِمَةَ بِبُطْءٍ ثُمَّ بِسُرْعَةٍ.", "Qara'atil bintul kalimata bibuth'in tsumma bisur'atin.", "Anak perempuan itu membaca kata itu pelan lalu cepat."],
    ],
  ],
  // 2. Salam Tertulis
  [
    [
      ["عِيدٌ سَعِيدٌ", "'Idun sa'idun", "selamat hari raya"],
      ["مَبْرُوكٌ", "Mabrukun", "selamat (atas keberhasilan)", ["Tulisan مَبْرُوكٌ cocok di kartu untuk...", "kelulusan / pernikahan", "orang sakit", "duka cita", "permintaan maaf"]],
      ["رَمَضَانُ كَرِيمٌ", "Ramadhanu karimun", "Ramadan yang mulia"],
      ["مَعَ تَحِيَّاتِي", "Ma'a tahiyyati", "salam hormatku"],
    ],
    [
      ["عَزِيزِي أَحْمَدُ، السَّلَامُ عَلَيْكُمْ.", "'Azizi Ahmadu, assalamu 'alaikum.", "Ahmad yang terkasih, assalamualaikum."],
      ["أَرْجُو أَنْ تَكُونَ بِخَيْرٍ.", "Arju an takuna bikhairin.", "Saya harap kamu dalam keadaan baik."],
      ["مَعَ أَطْيَبِ التَّمَنِّيَاتِ.", "Ma'a athyabit tamanniyati.", "Dengan harapan terbaik."],
      ["أَلْفُ مَبْرُوكٍ عَلَى النَّجَاحِ!", "Alfu mabrukin 'alan najahi!", "Seribu selamat atas keberhasilanmu!", ["Kartu ini dikirim karena penerimanya...", "berhasil / lulus", "sakit", "pindah rumah", "berulang tahun"]],
    ],
    [
      ["أُخْتِي الْعَزِيزَةُ، وَصَلَتْنِي رِسَالَتُكِ وَفَرِحْتُ بِهَا كَثِيرًا.", "Ukhtiyal 'azizatu, washalatni risalatuki wa farihtu biha katsiran.", "Adikku tersayang, suratmu sampai kepadaku dan aku sangat senang."],
      ["تَقَبَّلَ اللهُ مِنَّا وَمِنْكُمْ صَالِحَ الْأَعْمَالِ.", "Taqabbalallahu minna wa minkum shalihal a'mali.", "Semoga Allah menerima amal saleh dari kami dan dari kalian."],
      ["بِمُنَاسَبَةِ زَوَاجِكُمَا، نَتَمَنَّى لَكُمَا حَيَاةً سَعِيدَةً.", "Bimunasabati zawajikuma, natamanna lakuma hayatan sa'idatan.", "Dalam rangka pernikahan kalian, kami doakan kehidupan yang bahagia."],
      ["فِي الْخِتَامِ، أَبْلِغْ سَلَامِي إِلَى أُسْرَتِكَ.", "Fil khitami, abligh salami ila usratika.", "Sebagai penutup, sampaikan salamku kepada keluargamu."],
    ],
  ],
  // 3. Nama dan Asal
  [
    [
      ["الِاسْمُ", "Al-ismu", "nama"],
      ["الْجِنْسِيَّةُ", "Al-jinsiyyatu", "kewarganegaraan", ["Pada formulir, kolom الْجِنْسِيَّةُ diisi dengan...", "kewarganegaraan", "nama lengkap", "nomor telepon", "pekerjaan"]],
      ["الْعُنْوَانُ", "Al-'unwanu", "alamat"],
      ["مَكَانُ الْمِيلَادِ", "Makanul miladi", "tempat lahir"],
    ],
    [
      ["اسْمِي زَيْدٌ وَأَنَا مِنْ مَدِينَةِ مَكَّةَ.", "Ismi Zaidun wa ana min madinati Makkata.", "Nama saya Zaid dan saya dari kota Mekah."],
      ["لَيْلَى طَالِبَةٌ مِنْ تُونِسَ.", "Laila thalibatun min Tunisa.", "Laila adalah siswi dari Tunisia."],
      ["هُوَ يَسْكُنُ فِي جَاكَرْتَا لٰكِنَّهُ مِنْ أَتْشِيه.", "Huwa yaskunu fi Jakarta lakinnahu min Aceh.", "Dia tinggal di Jakarta tetapi berasal dari Aceh.", ["Dari mana asal orang ini?", "Aceh", "Jakarta", "Mekah", "Tunisia"]],
      ["جِنْسِيَّتِي إِنْدُونِيسِيَّةٌ.", "Jinsiyyati indunisiyyatun.", "Kewarganegaraanku Indonesia."],
    ],
    [
      ["الِاسْمُ: سَعِيدٌ، الْعُمْرُ: اثْنَانِ وَعِشْرُونَ، الْبَلَدُ: الْكُوَيْتُ.", "Al-ismu: Sa'idun, al-'umru: itsnani wa 'isyruna, al-baladu: al-kuwaitu.", "Nama: Said, umur: dua puluh dua, negara: Kuwait."],
      ["وُلِدَتْ هِنْدُ فِي الْقَاهِرَةِ وَانْتَقَلَتْ إِلَى عَمَّانَ.", "Wulidat Hindu fil qahirati wantaqalat ila 'Ammana.", "Hindun lahir di Kairo lalu pindah ke Amman."],
      ["الطَّالِبُ الْجَدِيدُ اسْمُهُ مَالِكٌ، وَهُوَ مِنْ قَرْيَةٍ صَغِيرَةٍ فِي الْيَمَنِ.", "Ath-thalibul jadidusmuhu Malikun, wa huwa min qaryatin shaghiratin fil yamani.", "Siswa baru itu bernama Malik, dan dia dari desa kecil di Yaman."],
      ["كَتَبَ الْمُوَظَّفُ اسْمِي وَعُنْوَانِي فِي الِاسْتِمَارَةِ.", "Katabal muwazhzhafusmi wa 'unwani fil istimarati.", "Pegawai itu menulis nama dan alamatku di formulir."],
    ],
  ],
  // 4. Keluarga
  [
    [
      ["الْوَالِدَانِ", "Al-walidani", "kedua orang tua"],
      ["الْأَقَارِبُ", "Al-aqaribu", "kerabat"],
      ["الْعَائِلَةُ", "Al-'a'ilatu", "keluarga"],
      ["الْأَبْنَاءُ", "Al-abna'u", "anak-anak", ["Bentuk tunggal dari الْأَبْنَاءُ adalah...", "ابْنٌ", "بِنْتٌ", "بَنَاتٌ", "بَانٍ"]],
    ],
    [
      ["عَائِلَةُ سَالِمٍ تَسْكُنُ فِي بَيْتٍ كَبِيرٍ.", "'A'ilatu Salimin taskunu fi baitin kabirin.", "Keluarga Salim tinggal di rumah besar."],
      ["لِسَالِمٍ ابْنٌ وَبِنْتَانِ.", "Lisalimin ibnun wa bintani.", "Salim punya satu anak laki-laki dan dua anak perempuan.", ["Berapa jumlah anak Salim?", "tiga", "dua", "satu", "empat"]],
      ["زَوْجَةُ سَالِمٍ مُعَلِّمَةٌ فِي مَدْرَسَةٍ قَرِيبَةٍ.", "Zaujatu Salimin mu'allimatun fi madrasatin qaribatin.", "Istri Salim guru di sekolah terdekat."],
      ["الْجَدُّ يَعِيشُ مَعَهُمْ أَيْضًا.", "Al-jaddu ya'isyu ma'ahum aidhan.", "Kakek juga tinggal bersama mereka."],
    ],
    [
      ["فِي يَوْمِ الْجُمُعَةِ يَجْتَمِعُ الْأَقَارِبُ عَلَى الْغَدَاءِ فِي بَيْتِ الْجَدِّ.", "Fi yaumil jumu'ati yajtami'ul aqaribu 'alal ghada'i fi baitil jaddi.", "Pada hari Jumat para kerabat berkumpul makan siang di rumah kakek."],
      ["تَطْبُخُ الْجَدَّةُ أَطْبَاقًا كَثِيرَةً، وَيُسَاعِدُهَا الْأَحْفَادُ.", "Tathbukhul jaddatu athbaqan katsiratan, wa yusa'iduhal ahfadu.", "Nenek memasak banyak hidangan, dan para cucu membantunya."],
      ["بَعْدَ الْغَدَاءِ يَحْكِي الْجَدُّ قِصَصًا عَنْ شَبَابِهِ.", "Ba'dal ghada'i yahkil jaddu qishashan 'an syababihi.", "Setelah makan siang, kakek menceritakan kisah tentang masa mudanya."],
      ["هٰذَا الِاجْتِمَاعُ الْأُسْبُوعِيُّ يُقَوِّي الرَّوَابِطَ بَيْنَ أَفْرَادِ الْعَائِلَةِ.", "Hadzal ijtima'ul usbu'iyyu yuqawwir rawabitha baina afradil 'a'ilati.", "Pertemuan mingguan ini menguatkan ikatan antaranggota keluarga."],
    ],
  ],
  // 5. Sekolah
  [
    [
      ["الْمُدِيرُ", "Al-mudiru", "kepala sekolah / direktur"],
      ["التِّلْمِيذُ", "At-tilmidzu", "murid"],
      ["الْجَدْوَلُ", "Al-jadwalu", "jadwal"],
      ["الْمَلْعَبُ", "Al-mal'abu", "lapangan bermain", ["Di الْمَلْعَبُ biasanya murid...", "berolahraga / bermain", "makan siang", "membaca buku", "tidur"]],
    ],
    [
      ["تَبْدَأُ الدِّرَاسَةُ فِي السَّاعَةِ السَّابِعَةِ.", "Tabda'ud dirasatu fis sa'atis sabi'ati.", "Sekolah dimulai jam tujuh."],
      ["فِي مَدْرَسَتِنَا مَكْتَبَةٌ وَمُخْتَبَرٌ.", "Fi madrasatina maktabatun wa mukhtabarun.", "Di sekolah kami ada perpustakaan dan laboratorium."],
      ["يُحِبُّ التَّلَامِيذُ دَرْسَ الرَّسْمِ.", "Yuhibbut talamidzu darsar rasmi.", "Para murid suka pelajaran menggambar.", ["Pelajaran yang disukai murid adalah...", "menggambar", "matematika", "sejarah", "olahraga"]],
      ["الْمُدِيرُ يَزُورُ الْفُصُولَ كُلَّ صَبَاحٍ.", "Al-mudiru yazurul fushula kulla shabahin.", "Kepala sekolah mengunjungi kelas-kelas setiap pagi."],
    ],
    [
      ["مَدْرَسَتِي قَرِيبَةٌ مِنْ بَيْتِي، أَذْهَبُ إِلَيْهَا مَشْيًا.", "Madrasati qaribatun min baiti, adzhabu ilaiha masyyan.", "Sekolahku dekat rumahku, aku pergi ke sana berjalan kaki."],
      ["فِي الْفُسْحَةِ نَأْكُلُ فِي الْمَقْصَفِ ثُمَّ نَلْعَبُ فِي السَّاحَةِ.", "Fil fushati na'kulu fil maqshafi tsumma nal'abu fis sahati.", "Saat istirahat kami makan di kantin lalu bermain di halaman."],
      ["يَنْتَهِي الْيَوْمُ الدِّرَاسِيُّ فِي الثَّانِيَةِ ظُهْرًا.", "Yantahil yaumud dirasiyyu fits tsaniyati zhuhran.", "Hari sekolah berakhir jam dua siang."],
      ["حَصَلَ صَفُّنَا عَلَى جَائِزَةِ أَنْظَفِ فَصْلٍ هٰذَا الشَّهْرَ.", "Hashala shaffuna 'ala ja'izati anzhafi fashlin hadzasy syahra.", "Kelas kami mendapat penghargaan kelas terbersih bulan ini."],
    ],
  ],
  // 6. Rumah
  [
    [
      ["الطَّابِقُ", "Ath-thabiqu", "lantai / tingkat"],
      ["الدَّرَجُ", "Ad-daraju", "tangga"],
      ["السَّطْحُ", "As-sathhu", "atap / loteng terbuka"],
      ["الشُّرْفَةُ", "Asy-syurfatu", "balkon", ["الشُّرْفَةُ adalah bagian rumah yang...", "menonjol keluar (balkon)", "di bawah tanah", "tempat memasak", "tempat mandi"]],
    ],
    [
      ["بَيْتُ خَالِدٍ مِنْ طَابِقَيْنِ.", "Baitu Khalidin min thabiqaini.", "Rumah Khalid terdiri dari dua lantai.", ["Berapa lantai rumah Khalid?", "dua", "satu", "tiga", "empat"]],
      ["غُرْفَةُ النَّوْمِ فِي الطَّابِقِ الْعُلْوِيِّ.", "Ghurfatun naumi fith thabiqil 'ulwiyyi.", "Kamar tidur ada di lantai atas."],
      ["فِي الشُّرْفَةِ نَبَاتَاتٌ خَضْرَاءُ.", "Fisy syurfati nabatatun khadhra'u.", "Di balkon ada tanaman hijau."],
      ["الْمَطْبَخُ بِجَانِبِ غُرْفَةِ الطَّعَامِ.", "Al-mathbakhu bijanibi ghurfatith tha'ami.", "Dapur ada di samping ruang makan."],
    ],
    [
      ["انْتَقَلَتْ عَائِلَتِي إِلَى بَيْتٍ جَدِيدٍ فِي حَيٍّ هَادِئٍ.", "Intaqalat 'a'ilati ila baitin jadidin fi hayyin hadi'in.", "Keluargaku pindah ke rumah baru di lingkungan yang tenang."],
      ["لِكُلِّ وَاحِدٍ مِنَّا غُرْفَةٌ خَاصَّةٌ بِهِ.", "Likulli wahidin minna ghurfatun khashshatun bihi.", "Masing-masing dari kami punya kamar sendiri."],
      ["نَجْلِسُ عَلَى السَّطْحِ فِي لَيَالِي الصَّيْفِ لِنَرَى النُّجُومَ.", "Najlisu 'alas sathhi fi layalish shaifi linaran nujuma.", "Kami duduk di atap pada malam musim panas untuk melihat bintang."],
      ["أَجْمَلُ مَا فِي الْبَيْتِ حَدِيقَتُهُ الْخَلْفِيَّةُ.", "Ajmalu ma fil baiti hadiqatuhul khalfiyyatu.", "Yang paling indah di rumah itu adalah taman belakangnya."],
    ],
  ],
  // 7. Waktu Harian
  [
    [
      ["الْفَجْرُ", "Al-fajru", "fajar / subuh"],
      ["الظُّهْرُ", "Azh-zhuhru", "tengah hari / zuhur"],
      ["الْعَصْرُ", "Al-'ashru", "sore / asar"],
      ["اللَّيْلُ", "Al-lailu", "malam", ["Lawan kata اللَّيْلُ adalah...", "النَّهَارُ", "الْفَجْرُ", "الْمَسَاءُ", "الْغُرُوبُ"]],
    ],
    [
      ["يَسْتَيْقِظُ عَلِيٌّ قَبْلَ الْفَجْرِ.", "Yastaiqizhu 'Aliyyun qablal fajri.", "Ali bangun sebelum fajar."],
      ["يَتَنَاوَلُ الْغَدَاءَ بَعْدَ الظُّهْرِ.", "Yatanawalul ghada'a ba'dazh zhuhri.", "Dia makan siang setelah zuhur."],
      ["يَلْعَبُ مَعَ أَصْدِقَائِهِ فِي الْعَصْرِ.", "Yal'abu ma'a ashdiqa'ihi fil 'ashri.", "Dia bermain dengan teman-temannya di sore hari.", ["Kapan Ali bermain dengan temannya?", "sore hari", "pagi hari", "tengah malam", "sebelum fajar"]],
      ["يَنَامُ مُبَكِّرًا فِي اللَّيْلِ.", "Yanamu mubakkiran fil laili.", "Dia tidur lebih awal di malam hari."],
    ],
    [
      ["يَبْدَأُ يَوْمُ فَاطِمَةَ بِصَلَاةِ الْفَجْرِ ثُمَّ قِرَاءَةِ الْقُرْآنِ.", "Yabda'u yaumu Fathimata bishalatil fajri tsumma qira'atil qur'ani.", "Hari Fatimah dimulai dengan salat Subuh lalu membaca Al-Qur'an."],
      ["تَذْهَبُ إِلَى الْجَامِعَةِ فِي السَّابِعَةِ وَتَرْجِعُ فِي الثَّالِثَةِ.", "Tadzhabu ilal jami'ati fis sabi'ati wa tarji'u fits tsalitsati.", "Dia pergi ke universitas jam tujuh dan pulang jam tiga."],
      ["بَعْدَ الْمَغْرِبِ تُرَاجِعُ دُرُوسَهَا مَعَ صَدِيقَتِهَا.", "Ba'dal maghribi turaji'u durusaha ma'a shadiqatiha.", "Setelah magrib dia mengulang pelajaran bersama sahabatnya."],
      ["لَا تَسْهَرُ كَثِيرًا لِأَنَّهَا تُحِبُّ الِاسْتِيقَاظَ مُبَكِّرًا.", "La tasharu katsiran li'annaha tuhibbul istiqazha mubakkiran.", "Dia tidak banyak begadang karena suka bangun pagi."],
    ],
  ],
  // 8. Angka 1-20
  [
    [
      ["اثْنَانِ", "Itsnani", "dua"],
      ["سَبْعَةٌ", "Sab'atun", "tujuh"],
      ["اثْنَا عَشَرَ", "Itsna 'asyara", "dua belas"],
      ["سِتَّةَ عَشَرَ", "Sittata 'asyara", "enam belas", ["Angka سِتَّةَ عَشَرَ ditulis...", "16", "60", "6", "26"]],
    ],
    [
      ["فِي الْبُسْتَانِ عِشْرُونَ نَخْلَةً.", "Fil bustani 'isyruna nakhlatan.", "Di kebun ada dua puluh pohon kurma."],
      ["اشْتَرَتْ أُمِّي سِتَّ بَيْضَاتٍ.", "Isytarat ummi sitta baidhatin.", "Ibuku membeli enam butir telur."],
      ["فِي الشَّهْرِ أَرْبَعَةُ أَسَابِيعَ.", "Fisy syahri arba'atu asabi'a.", "Dalam sebulan ada empat minggu."],
      ["يَسْكُنُ عُمَرُ فِي الطَّابِقِ الرَّابِعَ عَشَرَ.", "Yaskunu 'Umaru fith thabiqir rabi'a 'asyara.", "Umar tinggal di lantai empat belas.", ["Di lantai berapa Umar tinggal?", "14", "4", "40", "24"]],
    ],
    [
      ["فِي الْقِطَارِ عَشْرُ عَرَبَاتٍ، وَفِي كُلِّ عَرَبَةٍ خَمْسُونَ مَقْعَدًا.", "Fil qithari 'asyru 'arabatin, wa fi kulli 'arabatin khamsuna maq'adan.", "Di kereta ada sepuluh gerbong, dan di setiap gerbong ada lima puluh kursi."],
      ["حَفِظَ أَخِي ثَلَاثَةَ عَشَرَ جُزْءًا مِنَ الْقُرْآنِ.", "Hafizha akhi tsalatsata 'asyara juz'an minal qur'ani.", "Kakakku menghafal tiga belas juz Al-Qur'an."],
      ["يَدْفَعُ الطَّالِبُ تِسْعَةَ عَشَرَ دِينَارًا لِلْكُتُبِ.", "Yadfa'uth thalibu tis'ata 'asyara dinaran lil kutubi.", "Siswa membayar sembilan belas dinar untuk buku-buku."],
      ["تَتَكَوَّنُ الْفِرْقَةُ مِنْ أَحَدَ عَشَرَ لَاعِبًا.", "Tatakawwanul firqatu min ahada 'asyara la'iban.", "Tim itu terdiri dari sebelas pemain."],
    ],
  ],
  // 9. Warna dan Benda
  [
    [
      ["وَرْدَةٌ حَمْرَاءُ", "Wardatun hamra'u", "mawar merah"],
      ["سَمَاءٌ زَرْقَاءُ", "Sama'un zarqa'u", "langit biru"],
      ["عُشْبٌ أَخْضَرُ", "'Usybun akhdharu", "rumput hijau"],
      ["لَيْمُونٌ أَصْفَرُ", "Laimunun ashfaru", "lemon kuning", ["Mengapa أَصْفَرُ (bukan صَفْرَاءُ) untuk لَيْمُونٌ?", "karena لَيْمُونٌ mudzakkar", "karena لَيْمُونٌ jamak", "karena salah tulis", "karena warnanya tua"]],
    ],
    [
      ["قَلَمِي أَزْرَقُ وَقَلَمُ أُخْتِي أَحْمَرُ.", "Qalami azraqu wa qalamu ukhti ahmaru.", "Penaku biru dan pena adikku merah."],
      ["الْغُيُومُ بَيْضَاءُ كَالْقُطْنِ.", "Al-ghuyumu baidha'u kal quthni.", "Awan-awan putih seperti kapas."],
      ["لَبِسَ الْعَرِيسُ ثَوْبًا أَبْيَضَ.", "Labisal 'arisu tsauban abyadha.", "Pengantin pria memakai gamis putih."],
      ["لَوْنُ الْغُرَابِ أَسْوَدُ.", "Launul ghurabi aswadu.", "Warna burung gagak hitam.", ["Menurut teks, apa warna burung gagak?", "hitam", "putih", "cokelat", "abu-abu"]],
    ],
    [
      ["فِي سُوقِ الزُّهُورِ وُرُودٌ حَمْرَاءُ وَصَفْرَاءُ وَبَيْضَاءُ.", "Fi suqiz zuhuri wurudun hamra'u wa shafra'u wa baidha'u.", "Di pasar bunga ada mawar merah, kuning, dan putih."],
      ["اخْتَارَتْ مَرْيَمُ فُسْتَانًا أَخْضَرَ لِحَفْلَةِ أُخْتِهَا.", "Ikhtarat Maryamu fustanan akhdhara lihaflati ukhtiha.", "Maryam memilih gaun hijau untuk pesta kakaknya."],
      ["تُصْبِحُ أَوْرَاقُ الشَّجَرِ صَفْرَاءَ ثُمَّ تَسْقُطُ.", "Tushbihu auraqusy syajari shafra'a tsumma tasquthu.", "Daun-daun pohon menjadi kuning lalu gugur."],
      ["لَوْنُ الْعَلَمِ الْفِلَسْطِينِيِّ أَسْوَدُ وَأَبْيَضُ وَأَخْضَرُ وَأَحْمَرُ.", "Launul 'alamil filasthiniyyi aswadu wa abyadhu wa akhdharu wa ahmaru.", "Warna bendera Palestina hitam, putih, hijau, dan merah."],
    ],
  ],
  // 10. Makanan Sederhana
  [
    [
      ["فَطِيرَةٌ", "Fathiratun", "kue / pai"],
      ["فَاكِهَةٌ", "Fakihatun", "buah-buahan"],
      ["حَسَاءٌ", "Hasa'un", "sup"],
      ["مِلْحٌ", "Milhun", "garam", ["Benda yang rasanya asin adalah...", "مِلْحٌ", "سُكَّرٌ", "عَسَلٌ", "تَمْرٌ"]],
    ],
    [
      ["الْحَسَاءُ سَاخِنٌ جِدًّا.", "Al-hasa'u sakhinun jiddan.", "Supnya sangat panas."],
      ["أَضَافَ الطَّبَّاخُ الْمِلْحَ إِلَى الطَّعَامِ.", "Adhafath thabbakhul milha ilath tha'ami.", "Juru masak menambahkan garam ke makanan."],
      ["نَأْكُلُ الْفَاكِهَةَ بَعْدَ الْغَدَاءِ.", "Na'kulul fakihata ba'dal ghada'i.", "Kami makan buah setelah makan siang."],
      ["فِي الصَّحْنِ أَرُزٌّ وَخُضَارٌ.", "Fish shahni aruzzun wa khudharun.", "Di piring ada nasi dan sayuran.", ["Apa yang ada di piring?", "nasi dan sayuran", "roti dan keju", "ikan dan sup", "buah dan madu"]],
    ],
    [
      ["قَائِمَةُ الطَّعَامِ: حَسَاءُ الْعَدَسِ، أَرُزٌّ بِاللَّحْمِ، وَسَلَطَةٌ.", "Qa'imatuth tha'ami: hasa'ul 'adasi, aruzzun bil lahmi, wa salathatun.", "Menu: sup kacang lentil, nasi dengan daging, dan salad."],
      ["تُفَضِّلُ نُورُ الْفُطُورَ الْخَفِيفَ: خُبْزًا وَزَيْتُونًا وَشَايًا.", "Tufadhdhilu Nurul futhural khafifa: khubzan wa zaitunan wa syayan.", "Nur lebih suka sarapan ringan: roti, zaitun, dan teh."],
      ["الطَّعَامُ الصِّحِّيُّ يَحْتَوِي عَلَى الْخُضَارِ وَالْفَوَاكِهِ.", "Ath-tha'amush shihhiyyu yahtawi 'alal khudhari wal fawakihi.", "Makanan sehat mengandung sayuran dan buah-buahan."],
      ["لَا تُكْثِرْ مِنَ السُّكَّرِ وَالْمِلْحِ فِي طَعَامِكَ.", "La tuktsir minas sukkari wal milhi fi tha'amika.", "Jangan terlalu banyak gula dan garam dalam makananmu."],
    ],
  ],
  // 11. Pasar Kecil
  [
    [
      ["الْبَائِعُ", "Al-ba'i'u", "penjual"],
      ["الْمُشْتَرِي", "Al-musytari", "pembeli"],
      ["السِّعْرُ", "As-si'ru", "harga"],
      ["الدُّكَّانُ", "Ad-dukkanu", "toko kecil / kios", ["Kata الدُّكَّانُ berarti...", "kios / toko kecil", "pasar besar", "gudang", "restoran"]],
    ],
    [
      ["يَبِيعُ الْبَائِعُ الْخُضَارَ فِي السُّوقِ.", "Yabi'ul ba'i'ul khudhara fis suqi.", "Penjual menjual sayuran di pasar."],
      ["سِعْرُ الْبُرْتُقَالِ رَخِيصٌ الْيَوْمَ.", "Si'rul burtuqali rakhishun al-yauma.", "Harga jeruk murah hari ini.", ["Menurut teks, bagaimana harga jeruk hari ini?", "murah", "mahal", "naik", "tidak ada"]],
      ["اشْتَرَى الرَّجُلُ كِيسًا مِنَ الْأَرُزِّ.", "Isytarar rajulu kisan minal aruzzi.", "Pria itu membeli sekantong beras."],
      ["الدُّكَّانُ مَفْتُوحٌ مِنَ الصَّبَاحِ.", "Ad-dukkanu maftuhun minash shabahi.", "Kios itu buka sejak pagi."],
    ],
    [
      ["ذَهَبَتْ سُعَادُ إِلَى السُّوقِ لِتَشْتَرِيَ خُضَارًا لِلْعَشَاءِ.", "Dzahabat Su'adu ilas suqi litasytariya khudharan lil 'asya'i.", "Suad pergi ke pasar untuk membeli sayuran untuk makan malam."],
      ["وَجَدَتِ الطَّمَاطِمَ غَالِيَةً فَاشْتَرَتْ نِصْفَ كِيلُو فَقَطْ.", "Wajadatith thamathima ghaliyatan fasytarat nishfa kilu faqath.", "Dia mendapati tomat mahal, jadi hanya membeli setengah kilo."],
      ["أَعْطَاهَا الْبَائِعُ حَبَّةَ بَصَلٍ هَدِيَّةً.", "A'thahal ba'i'u habbata basalin hadiyyatan.", "Penjual memberinya sebutir bawang sebagai hadiah."],
      ["رَجَعَتْ إِلَى الْبَيْتِ مَسْرُورَةً بِمُعَامَلَةِ الْبَائِعِ.", "Raja'at ilal baiti masruratan bimu'amalatil ba'i'i.", "Dia pulang ke rumah dengan senang atas perlakuan penjual."],
    ],
  ],
  // 12. Masjid dan Tempat Umum
  [
    [
      ["الْمِحْرَابُ", "Al-mihrabu", "mihrab"],
      ["الْمِئْذَنَةُ", "Al-mi'dzanatu", "menara masjid", ["Dari الْمِئْذَنَةُ biasanya terdengar...", "azan", "pengumuman pasar", "musik", "bel sekolah"]],
      ["الْمَوْقِفُ", "Al-mauqifu", "tempat parkir / halte"],
      ["الْبَلَدِيَّةُ", "Al-baladiyyatu", "kantor kota / pemda"],
    ],
    [
      ["يُؤَذِّنُ الْمُؤَذِّنُ خَمْسَ مَرَّاتٍ فِي الْيَوْمِ.", "Yu'adzdzinul mu'adzdzinu khamsa marratin fil yaumi.", "Muazin mengumandangkan azan lima kali sehari."],
      ["يَقِفُ الْإِمَامُ فِي الْمِحْرَابِ.", "Yaqiful imamu fil mihrabi.", "Imam berdiri di mihrab."],
      ["الْمَسْجِدُ الْكَبِيرُ فِي وَسَطِ الْمَدِينَةِ.", "Al-masjidul kabiru fi wasathil madinati.", "Masjid besar ada di tengah kota.", ["Di mana letak masjid besar?", "di tengah kota", "di pinggir kota", "di desa", "di dekat pantai"]],
      ["مَوْقِفُ الْحَافِلَاتِ أَمَامَ السُّوقِ.", "Mauqiful hafilati amamas suqi.", "Halte bus ada di depan pasar."],
    ],
    [
      ["بُنِيَ هٰذَا الْمَسْجِدُ قَبْلَ مِائَتَيْ سَنَةٍ وَمَا زَالَ جَمِيلًا.", "Buniya hadzal masjidu qabla mi'atai sanatin wa ma zala jamilan.", "Masjid ini dibangun dua ratus tahun lalu dan masih indah."],
      ["فِي الْمَسْجِدِ مَكْتَبَةٌ صَغِيرَةٌ وَفَصْلٌ لِتَعْلِيمِ الْقُرْآنِ.", "Fil masjidi maktabatun shaghiratun wa fashlun lita'limil qur'ani.", "Di masjid ada perpustakaan kecil dan kelas untuk mengajar Al-Qur'an."],
      ["تُنَظِّمُ الْبَلَدِيَّةُ سُوقًا شَعْبِيًّا كُلَّ يَوْمِ أَحَدٍ.", "Tunazhzhimul baladiyyatu suqan sya'biyyan kulla yaumi ahadin.", "Pemerintah kota mengadakan pasar rakyat setiap hari Minggu."],
      ["نَظَافَةُ الْأَمَاكِنِ الْعَامَّةِ مَسْؤُولِيَّةُ الْجَمِيعِ.", "Nazhafatul amakinil 'ammati mas'uliyyatul jami'i.", "Kebersihan tempat umum adalah tanggung jawab semua orang."],
    ],
  ],
  // 13. Cuaca
  [
    [
      ["غَيْمٌ", "Ghaimun", "awan"],
      ["بَرْقٌ", "Barqun", "kilat"],
      ["رَعْدٌ", "Ra'dun", "guntur", ["Suara keras saat badai disebut...", "رَعْدٌ", "بَرْقٌ", "ثَلْجٌ", "ضَبَابٌ"]],
      ["ضَبَابٌ", "Dhababun", "kabut"],
    ],
    [
      ["الطَّقْسُ الْيَوْمَ مُشْمِسٌ.", "Ath-thaqsul yauma musymisun.", "Cuaca hari ini cerah dan bermatahari."],
      ["سَمِعْنَا صَوْتَ الرَّعْدِ فِي اللَّيْلِ.", "Sami'na shautar ra'di fil laili.", "Kami mendengar suara guntur di malam hari."],
      ["الضَّبَابُ كَثِيفٌ فِي الصَّبَاحِ.", "Adh-dhababu katsifun fish shabahi.", "Kabutnya tebal di pagi hari.", ["Kapan kabut tebal menurut teks?", "pagi hari", "siang hari", "sore hari", "malam hari"]],
      ["تَوَقَّفَ الْمَطَرُ بَعْدَ سَاعَةٍ.", "Tawaqqafal matharu ba'da sa'atin.", "Hujan berhenti setelah satu jam."],
    ],
    [
      ["نَشْرَةُ الطَّقْسِ: سَمَاءٌ غَائِمَةٌ مَعَ أَمْطَارٍ خَفِيفَةٍ مَسَاءً.", "Nasyratuth thaqsi: sama'un gha'imatun ma'a amtharin khafifatin masa'an.", "Prakiraan cuaca: langit berawan dengan hujan ringan di sore hari."],
      ["بِسَبَبِ الضَّبَابِ تَأَخَّرَتْ بَعْضُ الرِّحْلَاتِ فِي الْمَطَارِ.", "Bisababidh dhababi ta'akhkharat ba'dhur rihlati fil mathari.", "Karena kabut, beberapa penerbangan di bandara tertunda."],
      ["يَنْصَحُ الْأَطِبَّاءُ بِشُرْبِ الْمَاءِ كَثِيرًا فِي الْأَيَّامِ الْحَارَّةِ.", "Yanshahul athibba'u bisyurbil ma'i katsiran fil ayyamil harrati.", "Dokter menyarankan banyak minum air pada hari-hari panas."],
      ["بَعْدَ الْعَاصِفَةِ ظَهَرَ قَوْسُ قُزَحَ فِي السَّمَاءِ.", "Ba'dal 'ashifati zhahara qausu quzaha fis sama'i.", "Setelah badai, pelangi muncul di langit."],
    ],
  ],
  // 14. Hobi
  [
    [
      ["الْمُطَالَعَةُ", "Al-muthala'atu", "membaca (untuk kesenangan)"],
      ["الرِّحْلَاتُ", "Ar-rihlatu", "bertamasya"],
      ["الْكِتَابَةُ", "Al-kitabatu", "menulis"],
      ["الشِّطْرَنْجُ", "Asy-syithranju", "catur", ["Permainan الشِّطْرَنْجُ dimainkan di atas...", "papan", "lapangan bola", "kolam", "panggung"]],
    ],
    [
      ["يُحِبُّ يُوسُفُ الْمُطَالَعَةَ كَثِيرًا.", "Yuhibbu Yusuful muthala'ata katsiran.", "Yusuf sangat suka membaca."],
      ["يَذْهَبُ إِلَى الْمَكْتَبَةِ كُلَّ أُسْبُوعٍ.", "Yadzhabu ilal maktabati kulla usbu'in.", "Dia pergi ke perpustakaan setiap minggu."],
      ["قَرَأَ عِشْرِينَ كِتَابًا هٰذَا الْعَامَ.", "Qara'a 'isyrina kitaban hadzal 'ama.", "Dia membaca dua puluh buku tahun ini.", ["Berapa buku yang dibaca Yusuf tahun ini?", "dua puluh", "dua belas", "sepuluh", "tiga puluh"]],
      ["أُخْتُهُ تُحِبُّ الرَّسْمَ بِالْأَلْوَانِ الْمَائِيَّةِ.", "Ukhtuhu tuhibbur rasma bil alwanil ma'iyyati.", "Adiknya suka melukis dengan cat air."],
    ],
    [
      ["هِوَايَةُ جَدِّي زِرَاعَةُ الْوُرُودِ، وَحَدِيقَتُهُ أَجْمَلُ حَدِيقَةٍ فِي الْحَيِّ.", "Hiwayatu jaddi zira'atul wurudi, wa hadiqatuhu ajmalu hadiqatin fil hayyi.", "Hobi kakekku menanam mawar, dan tamannya paling indah di lingkungan itu."],
      ["يَسْقِي الْوُرُودَ كُلَّ صَبَاحٍ وَيُزِيلُ الْأَعْشَابَ الضَّارَّةَ.", "Yasqil wuruda kulla shabahin wa yuzilul a'syabadh dharrata.", "Dia menyiram mawar setiap pagi dan membuang rumput liar."],
      ["يَقُولُ جَدِّي: الزِّرَاعَةُ تُعَلِّمُ الصَّبْرَ.", "Yaqulu jaddi: az-zira'atu tu'allimush shabra.", "Kakekku berkata: bercocok tanam mengajarkan kesabaran."],
      ["فِي الْعَامِ الْمَاضِي فَازَ بِجَائِزَةِ أَجْمَلِ حَدِيقَةٍ.", "Fil 'amil madhi faza bija'izati ajmali hadiqatin.", "Tahun lalu dia memenangkan penghargaan taman terindah."],
    ],
  ],
  // 15. Transportasi
  [
    [
      ["الْمِيتْرُو", "Al-mitru", "kereta bawah tanah (metro)"],
      ["الشَّاحِنَةُ", "Asy-syahinatu", "truk"],
      ["الْمِينَاءُ", "Al-mina'u", "pelabuhan", ["Kapal berlabuh di...", "الْمِينَاءُ", "الْمَطَارُ", "الْمَحَطَّةُ", "الْمَوْقِفُ"]],
      ["الرَّاكِبُ", "Ar-rakibu", "penumpang"],
    ],
    [
      ["يَرْكَبُ أَبِي الْمِيتْرُو إِلَى عَمَلِهِ.", "Yarkabu abil mitru ila 'amalihi.", "Ayahku naik metro ke tempat kerjanya."],
      ["تَصِلُ السَّفِينَةُ إِلَى الْمِينَاءِ مَسَاءً.", "Tashilus safinatu ilal mina'i masa'an.", "Kapal tiba di pelabuhan pada sore hari."],
      ["الشَّاحِنَةُ تَحْمِلُ الْبَضَائِعَ.", "Asy-syahinatu tahmilul badha'i'a.", "Truk mengangkut barang-barang.", ["Menurut teks, apa yang diangkut truk?", "barang-barang", "penumpang", "hewan", "air"]],
      ["كَانَ الْقِطَارُ مُزْدَحِمًا بِالرُّكَّابِ.", "Kanal qitharu muzdahiman bir rukkabi.", "Kereta itu penuh sesak dengan penumpang."],
    ],
    [
      ["يُفَضِّلُ كَثِيرٌ مِنَ النَّاسِ الْمِيتْرُو لِأَنَّهُ سَرِيعٌ وَلَا يَتَأَثَّرُ بِالزِّحَامِ.", "Yufadhdhilu katsirun minan nasil mitru li'annahu sari'un wa la yata'atstsaru biz zihami.", "Banyak orang lebih suka metro karena cepat dan tidak terpengaruh macet."],
      ["أُعْلِنَ فِي الْمَحَطَّةِ أَنَّ الْقِطَارَ سَيَتَأَخَّرُ عِشْرِينَ دَقِيقَةً.", "U'lina fil mahaththati annal qithara sayata'akhkharu 'isyrina daqiqatan.", "Diumumkan di stasiun bahwa kereta akan terlambat dua puluh menit."],
      ["سَافَرَتِ الْعَائِلَةُ بِالسَّفِينَةِ مِنْ جَاوَةَ إِلَى بَالِي.", "Safaratil 'a'ilatu bis safinati min Jawata ila Bali.", "Keluarga itu bepergian dengan kapal dari Jawa ke Bali."],
      ["يَجِبُ عَلَى الرُّكَّابِ أَنْ يَرْبِطُوا أَحْزِمَةَ الْأَمَانِ.", "Yajibu 'alar rukkabi an yarbithu ahzimatal amani.", "Para penumpang wajib memasang sabuk pengaman."],
    ],
  ],
  // 16. Arah Sederhana
  [
    [
      ["الشَّرْقُ", "Asy-syarqu", "timur"],
      ["الْغَرْبُ", "Al-gharbu", "barat", ["Matahari terbenam di arah...", "الْغَرْبُ", "الشَّرْقُ", "الشَّمَالُ", "الْجَنُوبُ"]],
      ["الْجَنُوبُ", "Al-janubu", "selatan"],
      ["الزَّاوِيَةُ", "Az-zawiyatu", "sudut / pojok"],
    ],
    [
      ["الْمَدْرَسَةُ شَرْقَ الْحَدِيقَةِ.", "Al-madrasatu syarqal hadiqati.", "Sekolah ada di sebelah timur taman."],
      ["الْمَخْبَزُ عِنْدَ زَاوِيَةِ الشَّارِعِ.", "Al-makhbazu 'inda zawiyatisy syari'i.", "Toko roti ada di sudut jalan."],
      ["امْشِ مِائَةَ مِتْرٍ ثُمَّ انْعَطِفْ.", "Imsyi mi'ata mitrin tsumman'athif.", "Berjalanlah seratus meter lalu berbelok."],
      ["الْبَحْرُ فِي غَرْبِ الْمَدِينَةِ.", "Al-bahru fi gharbil madinati.", "Laut ada di barat kota.", ["Di mana laut menurut teks?", "di barat kota", "di timur kota", "di tengah kota", "di utara kota"]],
    ],
    [
      ["مِنْ بَيْتِي إِلَى الْمَدْرَسَةِ: أَمْشِي إِلَى الشَّمَالِ ثُمَّ أَنْعَطِفُ يَمِينًا عِنْدَ الْمَسْجِدِ.", "Min baiti ilal madrasati: amsyi ilasy syamali tsumma an'athifu yaminan 'indal masjidi.", "Dari rumahku ke sekolah: aku berjalan ke utara lalu belok kanan di masjid."],
      ["تَقَعُ الْقَرْيَةُ جَنُوبَ الْجَبَلِ عَلَى ضِفَّةِ النَّهْرِ.", "Taqa'ul qaryatu janubal jabali 'ala dhiffatin nahri.", "Desa itu terletak di selatan gunung di tepi sungai."],
      ["وَضَعَ الْمُرْشِدُ خَرِيطَةً وَأَشَارَ إِلَى الطَّرِيقِ الصَّحِيحِ.", "Wadha'al mursyidu kharithatan wa asyara ilath thariqish shahihi.", "Pemandu meletakkan peta dan menunjukkan jalan yang benar."],
      ["الْقِبْلَةُ فِي إِنْدُونِيسِيَا نَحْوَ الشَّمَالِ الْغَرْبِيِّ.", "Al-qiblatu fi Indunisiya nahwasy syamalil gharbiyyi.", "Kiblat di Indonesia mengarah ke barat laut."],
    ],
  ],
  // 17. Kesehatan Dasar
  [
    [
      ["دَوَاءٌ", "Dawa'un", "obat"],
      ["حُمَّى", "Humma", "demam"],
      ["سُعَالٌ", "Su'alun", "batuk"],
      ["صَيْدَلِيٌّ", "Shaidaliyyun", "apoteker", ["Orang yang memberi obat di apotek disebut...", "صَيْدَلِيٌّ", "طَبَّاخٌ", "فَلَّاحٌ", "شُرْطِيٌّ"]],
    ],
    [
      ["عِنْدَ أَخِي حُمَّى وَسُعَالٌ.", "'Inda akhi humma wa su'alun.", "Adikku demam dan batuk."],
      ["ذَهَبَ إِلَى الطَّبِيبِ فِي الصَّبَاحِ.", "Dzahaba ilath thabibi fish shabahi.", "Dia pergi ke dokter di pagi hari."],
      ["كَتَبَ الطَّبِيبُ لَهُ دَوَاءً.", "Katabath thabibu lahu dawa'an.", "Dokter menuliskan resep obat untuknya."],
      ["يَجِبُ أَنْ يَرْتَاحَ ثَلَاثَةَ أَيَّامٍ.", "Yajibu an yartaha tsalatsata ayyamin.", "Dia harus beristirahat tiga hari.", ["Berapa hari dia harus beristirahat?", "tiga hari", "satu minggu", "dua hari", "sehari"]],
    ],
    [
      ["قَالَ الطَّبِيبُ: تَنَاوَلِ الدَّوَاءَ بَعْدَ الْأَكْلِ مَرَّتَيْنِ يَوْمِيًّا.", "Qalath thabibu: tanawalid dawa'a ba'dal akli marrataini yaumiyyan.", "Dokter berkata: minum obat setelah makan dua kali sehari."],
      ["النَّوْمُ الْكَافِي وَالرِّيَاضَةُ يُحَافِظَانِ عَلَى صِحَّةِ الْجِسْمِ.", "An-naumul kafi war riyadhatu yuhafizhani 'ala shihhatil jismi.", "Tidur yang cukup dan olahraga menjaga kesehatan tubuh."],
      ["غَسْلُ الْيَدَيْنِ بِالصَّابُونِ يَحْمِي مِنْ كَثِيرٍ مِنَ الْأَمْرَاضِ.", "Ghaslul yadaini bish shabuni yahmi min katsirin minal amradhi.", "Mencuci tangan dengan sabun melindungi dari banyak penyakit."],
      ["إِذَا ارْتَفَعَتِ الْحَرَارَةُ فَاذْهَبْ إِلَى الْمُسْتَشْفَى فَوْرًا.", "Idzartafa'atil hararatu fadzhab ilal mustasyfa fauran.", "Jika suhu badan naik, segera pergi ke rumah sakit."],
    ],
  ],
  // 18. Pekerjaan
  [
    [
      ["مُوَظَّفٌ", "Muwazhzhafun", "pegawai"],
      ["نَجَّارٌ", "Najjarun", "tukang kayu"],
      ["سَائِقٌ", "Sa'iqun", "sopir"],
      ["مُحَامٍ", "Muhamin", "pengacara", ["Pekerjaan مُحَامٍ berhubungan dengan...", "hukum / pengadilan", "kesehatan", "pertanian", "memasak"]],
    ],
    [
      ["النَّجَّارُ يَصْنَعُ الْكَرَاسِيَّ مِنَ الْخَشَبِ.", "An-najjaru yashna'ul karasiyya minal khasyabi.", "Tukang kayu membuat kursi dari kayu.", ["Dari apa tukang kayu membuat kursi?", "kayu", "besi", "plastik", "batu"]],
      ["يَعْمَلُ السَّائِقُ فِي شَرِكَةِ نَقْلٍ.", "Ya'malus sa'iqu fi syarikati naqlin.", "Sopir itu bekerja di perusahaan transportasi."],
      ["الْمُوَظَّفُونَ يَبْدَؤُونَ الْعَمَلَ فِي الثَّامِنَةِ.", "Al-muwazhzhafuna yabda'unal 'amala fits tsaminati.", "Para pegawai mulai bekerja jam delapan."],
      ["أُخْتِي مُحَامِيَةٌ مَشْهُورَةٌ.", "Ukhti muhamiyatun masyhuratun.", "Kakakku pengacara (pr) terkenal."],
    ],
    [
      ["يَعْمَلُ حَسَنٌ مُمَرِّضًا فِي مُسْتَشْفَى الْأَطْفَالِ مُنْذُ خَمْسِ سَنَوَاتٍ.", "Ya'malu Hasanun mumarridhan fi mustasyfal athfali mundzu khamsi sanawatin.", "Hasan bekerja sebagai perawat di rumah sakit anak sejak lima tahun."],
      ["يُحِبُّ عَمَلَهُ لِأَنَّهُ يُسَاعِدُ الْمَرْضَى الصِّغَارَ.", "Yuhibbu 'amalahu li'annahu yusa'idul mardhash shighara.", "Dia mencintai pekerjaannya karena membantu pasien-pasien kecil."],
      ["أَحْيَانًا يَعْمَلُ فِي اللَّيْلِ وَيَرْتَاحُ فِي النَّهَارِ.", "Ahyanan ya'malu fil laili wa yartahu fin nahari.", "Kadang dia bekerja di malam hari dan beristirahat di siang hari."],
      ["يَحْلُمُ أَنْ يَفْتَحَ عِيَادَةً فِي قَرْيَتِهِ.", "Yahlumu an yaftaha 'iyadatan fi qaryatihi.", "Dia bermimpi membuka klinik di desanya."],
    ],
  ],
  // 19. Undangan Pendek
  [
    [
      ["دَعْوَةٌ", "Da'watun", "undangan"],
      ["حَفْلَةٌ", "Haflatun", "pesta / acara"],
      ["الْمَوْعِدُ", "Al-mau'idu", "waktu / jadwal janji"],
      ["الْمَكَانُ", "Al-makanu", "tempat", ["Pada undangan, kolom الْمَكَانُ berisi...", "lokasi acara", "jam acara", "nama tamu", "menu makanan"]],
    ],
    [
      ["يَدْعُوكُمْ أَحْمَدُ إِلَى حَفْلَةِ عِيدِ مِيلَادِهِ.", "Yad'ukum Ahmadu ila haflati 'idi miladihi.", "Ahmad mengundang kalian ke pesta ulang tahunnya."],
      ["الْمَوْعِدُ: يَوْمُ الْخَمِيسِ، السَّاعَةُ الْخَامِسَةُ.", "Al-mau'idu: yaumul khamisi, as-sa'atul khamisatu.", "Waktu: hari Kamis, jam lima.", ["Kapan acaranya?", "Kamis jam lima", "Jumat jam lima", "Kamis jam lima belas", "Sabtu jam empat"]],
      ["الْمَكَانُ: قَاعَةُ الْمَدْرَسَةِ.", "Al-makanu: qa'atul madrasati.", "Tempat: aula sekolah."],
      ["نَرْجُو تَأْكِيدَ الْحُضُورِ.", "Narju ta'kidal hudhuri.", "Mohon konfirmasi kehadiran."],
    ],
    [
      ["يَتَشَرَّفُ آلُ مُحَمَّدٍ بِدَعْوَتِكُمْ لِحُضُورِ حَفْلِ زِفَافِ ابْنَتِهِمْ.", "Yatasyarrafu alu Muhammadin bida'watikum lihudhuri hafli zifafibnatihim.", "Keluarga Muhammad merasa terhormat mengundang Anda menghadiri resepsi pernikahan putri mereka."],
      ["وَذٰلِكَ مَسَاءَ السَّبْتِ الْقَادِمِ فِي قَاعَةِ الْأَفْرَاحِ.", "Wa dzalika masa'as sabtil qadimi fi qa'atil afrahi.", "Pada Sabtu malam mendatang di gedung resepsi."],
      ["حُضُورُكُمْ يُسْعِدُنَا وَيُشَرِّفُنَا.", "Hudhurukum yus'iduna wa yusyarrifuna.", "Kehadiran Anda membahagiakan dan memuliakan kami."],
      ["يُرْجَى الِاتِّصَالُ عَلَى الرَّقْمِ الْمَذْكُورِ لِلِاعْتِذَارِ.", "Yurjal ittishalu 'alar raqmil madzkuri lil i'tidzari.", "Jika berhalangan, harap menghubungi nomor yang tercantum."],
    ],
  ],
  // 20. Cerita Mini
  [
    [
      ["قِصَّةٌ", "Qishshatun", "cerita"],
      ["بَطَلٌ", "Bathalun", "tokoh utama / pahlawan"],
      ["نِهَايَةٌ", "Nihayatun", "akhir", ["Lawan kata نِهَايَةٌ adalah...", "بِدَايَةٌ", "قِصَّةٌ", "حِكَايَةٌ", "عِبْرَةٌ"]],
      ["عِبْرَةٌ", "'Ibratun", "pelajaran / hikmah"],
    ],
    [
      ["كَانَ لِلْفَلَّاحِ حِمَارٌ كَسُولٌ.", "Kana lil fallahi himarun kasulun.", "Petani itu punya keledai yang malas."],
      ["كَانَ الْحِمَارُ يَحْمِلُ الْمِلْحَ إِلَى السُّوقِ.", "Kanal himaru yahmilul milha ilas suqi.", "Keledai itu membawa garam ke pasar."],
      ["سَقَطَ فِي النَّهْرِ فَذَابَ الْمِلْحُ.", "Saqatha fin nahri fadzabal milhu.", "Ia jatuh ke sungai sehingga garamnya larut."],
      ["فَرِحَ الْحِمَارُ لِأَنَّ الْحِمْلَ صَارَ خَفِيفًا.", "Fariha al-himaru li'annal himla shara khafifan.", "Keledai senang karena bebannya menjadi ringan.", ["Mengapa keledai itu senang?", "bebannya menjadi ringan", "dia diberi makan", "dia sampai di pasar", "petani memujinya"]],
    ],
    [
      ["فِي الْيَوْمِ التَّالِي وَضَعَ الْفَلَّاحُ عَلَى ظَهْرِهِ إِسْفَنْجًا.", "Fil yaumit tali wadha'al fallahu 'ala zhahrihi isfanjan.", "Keesokan harinya petani meletakkan spons di punggungnya."],
      ["أَلْقَى الْحِمَارُ نَفْسَهُ فِي النَّهْرِ مَرَّةً أُخْرَى.", "Alqal himaru nafsahu fin nahri marratan ukhra.", "Keledai itu menjatuhkan diri ke sungai sekali lagi."],
      ["امْتَلَأَ الْإِسْفَنْجُ بِالْمَاءِ فَصَارَ الْحِمْلُ ثَقِيلًا جِدًّا.", "Imtala'al isfanju bil ma'i fashara al-himlu tsaqilan jiddan.", "Spons itu penuh air sehingga bebannya menjadi sangat berat."],
      ["وَمُنْذُ ذٰلِكَ الْيَوْمِ تَرَكَ الْحِمَارُ الْحِيلَةَ وَالْكَسَلَ.", "Wa mundzu dzalikal yaumi tarakal himarul hilata wal kasala.", "Sejak hari itu keledai meninggalkan tipu daya dan kemalasan."],
    ],
  ],
];
