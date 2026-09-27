export type ArabicWord = { arabic: string; transliteration: string; meaning: string };
type WordTuple = [arabic: string, transliteration: string, meaning: string];

// Themed word sets. Pemula follows the 40 mufradat topics, elementary the 21
// elementary mufradat topics (the last one or two are review sets built below).
const pemula: WordTuple[][] = [
  [['السَّلَامُ عَلَيْكُمْ', "as-salamu 'alaikum", 'semoga keselamatan atasmu'], ['مَرْحَبًا', 'marhaban', 'halo / selamat datang'], ['صَبَاحُ الْخَيْرِ', 'shabahul khair', 'selamat pagi'], ['مَسَاءُ الْخَيْرِ', "masa'ul khair", 'selamat sore'], ['مَعَ السَّلَامَةِ', "ma'as salamah", 'selamat jalan'], ['أَهْلًا وَسَهْلًا', 'ahlan wa sahlan', 'selamat datang']],
  [['أَبٌ', 'abun', 'ayah'], ['أُمٌّ', 'ummun', 'ibu'], ['أَخٌ', 'akhun', 'saudara laki-laki'], ['أُخْتٌ', 'ukhtun', 'saudara perempuan'], ['جَدٌّ', 'jaddun', 'kakek'], ['جَدَّةٌ', 'jaddatun', 'nenek']],
  [['فَصْلٌ', 'fashlun', 'kelas'], ['سَبُّورَةٌ', 'sabburatun', 'papan tulis'], ['كُرْسِيٌّ', 'kursiyyun', 'kursi'], ['مَكْتَبٌ', 'maktabun', 'meja belajar'], ['مُدَرِّسٌ', 'mudarrisun', 'guru'], ['طَالِبٌ', 'thalibun', 'siswa']],
  [['بَيْتٌ', 'baitun', 'rumah'], ['غُرْفَةٌ', 'ghurfatun', 'kamar'], ['مَطْبَخٌ', 'mathbakhun', 'dapur'], ['بَابٌ', 'babun', 'pintu'], ['نَافِذَةٌ', 'nafidzatun', 'jendela'], ['حَمَّامٌ', 'hammamun', 'kamar mandi']],
  [['وَاحِدٌ', 'wahidun', 'satu'], ['اِثْنَانِ', 'itsnani', 'dua'], ['ثَلَاثَةٌ', 'tsalatsatun', 'tiga'], ['خَمْسَةٌ', 'khamsatun', 'lima'], ['عَشَرَةٌ', "'asyaratun", 'sepuluh'], ['عِشْرُونَ', "'isyruna", 'dua puluh']],
  [['أَحْمَرُ', 'ahmaru', 'merah'], ['أَزْرَقُ', 'azraqu', 'biru'], ['أَخْضَرُ', 'akhdharu', 'hijau'], ['أَصْفَرُ', 'ashfaru', 'kuning'], ['أَبْيَضُ', 'abyadhu', 'putih'], ['أَسْوَدُ', 'aswadu', 'hitam']],
  [['خُبْزٌ', 'khubzun', 'roti'], ['أَرُزٌّ', 'aruzzun', 'nasi / beras'], ['لَحْمٌ', 'lahmun', 'daging'], ['سَمَكٌ', 'samakun', 'ikan'], ['بَيْضٌ', 'baidhun', 'telur'], ['فَاكِهَةٌ', 'fakihatun', 'buah-buahan']],
  [['مَاءٌ', "ma'un", 'air'], ['حَلِيبٌ', 'halibun', 'susu'], ['شَايٌ', 'syayun', 'teh'], ['قَهْوَةٌ', 'qahwatun', 'kopi'], ['عَصِيرٌ', "'ashirun", 'jus'], ['شَرِبَ', 'syariba', 'minum']],
  [['يَوْمُ الْأَحَدِ', 'yaumul ahad', 'hari Minggu'], ['يَوْمُ الْاِثْنَيْنِ', 'yaumul itsnain', 'hari Senin'], ['يَوْمُ الثُّلَاثَاءِ', "yaumuts tsulatsa'", 'hari Selasa'], ['يَوْمُ الْأَرْبِعَاءِ', "yaumul arbi'a'", 'hari Rabu'], ['يَوْمُ الْخَمِيسِ', 'yaumul khamis', 'hari Kamis'], ['يَوْمُ الْجُمُعَةِ', "yaumul jumu'ah", 'hari Jumat']],
  [['سَاعَةٌ', "sa'atun", 'jam'], ['دَقِيقَةٌ', 'daqiqatun', 'menit'], ['صَبَاحٌ', 'shabahun', 'pagi'], ['مَسَاءٌ', "masa'un", 'sore / malam'], ['اَلْيَوْمَ', 'al-yauma', 'hari ini'], ['غَدًا', 'ghadan', 'besok']],
  [['رَأْسٌ', "ra'sun", 'kepala'], ['عَيْنٌ', "'ainun", 'mata'], ['أُذُنٌ', 'udzunun', 'telinga'], ['يَدٌ', 'yadun', 'tangan'], ['رِجْلٌ', 'rijlun', 'kaki'], ['فَمٌ', 'famun', 'mulut']],
  [['قَمِيصٌ', 'qamishun', 'kemeja'], ['سِرْوَالٌ', 'sirwalun', 'celana'], ['حِذَاءٌ', "hidza'un", 'sepatu'], ['طَاقِيَّةٌ', 'thaqiyyatun', 'peci / kopiah'], ['ثَوْبٌ', 'tsaubun', 'gamis / pakaian'], ['جَوْرَبٌ', 'jaurabun', 'kaos kaki']],
  [['سَيَّارَةٌ', 'sayyaratun', 'mobil'], ['حَافِلَةٌ', 'hafilatun', 'bus'], ['طَائِرَةٌ', "tha'iratun", 'pesawat'], ['دَرَّاجَةٌ', 'darrajatun', 'sepeda'], ['قِطَارٌ', 'qitharun', 'kereta'], ['سَفِينَةٌ', 'safinatun', 'kapal']],
  [['مَسْجِدٌ', 'masjidun', 'masjid'], ['سُوقٌ', 'suqun', 'pasar'], ['مُسْتَشْفًى', 'mustasyfan', 'rumah sakit'], ['مَكْتَبَةٌ', 'maktabatun', 'perpustakaan'], ['مَطْعَمٌ', "math'amun", 'restoran'], ['حَدِيقَةٌ', 'hadiqatun', 'taman']],
  [['طَبِيبٌ', 'thabibun', 'dokter'], ['مُهَنْدِسٌ', 'muhandisun', 'insinyur'], ['تَاجِرٌ', 'tajirun', 'pedagang'], ['فَلَّاحٌ', 'fallahun', 'petani'], ['مُوَظَّفٌ', 'muwazhzhafun', 'pegawai'], ['مُمَرِّضَةٌ', 'mumarridhatun', 'perawat (pr)']],
  [['قِطٌّ', 'qiththun', 'kucing'], ['كَلْبٌ', 'kalbun', 'anjing'], ['حِصَانٌ', 'hishanun', 'kuda'], ['بَقَرَةٌ', 'baqaratun', 'sapi'], ['طَائِرٌ', "tha'irun", 'burung'], ['جَمَلٌ', 'jamalun', 'unta']],
  [['حَارٌّ', 'harrun', 'panas'], ['بَارِدٌ', 'baridun', 'dingin'], ['مَطَرٌ', 'matharun', 'hujan'], ['شَمْسٌ', 'syamsun', 'matahari'], ['رِيحٌ', 'rihun', 'angin'], ['غَيْمٌ', 'ghaimun', 'awan']],
  [['قِرَاءَةٌ', "qira'atun", 'membaca'], ['كِتَابَةٌ', 'kitabatun', 'menulis'], ['سِبَاحَةٌ', 'sibahatun', 'berenang'], ['رِيَاضَةٌ', 'riyadhatun', 'olahraga'], ['رَسْمٌ', 'rasmun', 'menggambar'], ['سَفَرٌ', 'safarun', 'bepergian']],
  [['ذَهَبَ', 'dzahaba', 'pergi'], ['رَجَعَ', "raja'a", 'kembali'], ['أَكَلَ', 'akala', 'makan'], ['نَامَ', 'nama', 'tidur'], ['كَتَبَ', 'kataba', 'menulis'], ['قَرَأَ', "qara'a", 'membaca']],
  [['كَبِيرٌ', 'kabirun', 'besar'], ['صَغِيرٌ', 'shaghirun', 'kecil'], ['جَدِيدٌ', 'jadidun', 'baru'], ['قَدِيمٌ', 'qadimun', 'lama / kuno'], ['طَوِيلٌ', 'thawilun', 'panjang / tinggi'], ['قَصِيرٌ', 'qashirun', 'pendek']],
  [['يَمِينٌ', 'yaminun', 'kanan'], ['يَسَارٌ', 'yasarun', 'kiri'], ['أَمَامَ', 'amama', 'di depan'], ['خَلْفَ', 'khalfa', 'di belakang'], ['فَوْقَ', 'fauqa', 'di atas'], ['تَحْتَ', 'tahta', 'di bawah']],
  [['اِشْتَرَى', 'isytara', 'membeli'], ['بَاعَ', "ba'a", 'menjual'], ['ثَمَنٌ', 'tsamanun', 'harga'], ['رَخِيصٌ', 'rakhishun', 'murah'], ['غَالٍ', 'ghalin', 'mahal'], ['نُقُودٌ', 'nuqudun', 'uang']],
  [['قَلَمٌ', 'qalamun', 'pulpen'], ['كِتَابٌ', 'kitabun', 'buku'], ['دَفْتَرٌ', 'daftarun', 'buku tulis'], ['مِسْطَرَةٌ', 'mistharatun', 'penggaris'], ['مِمْحَاةٌ', 'mimhatun', 'penghapus'], ['حَقِيبَةٌ', 'haqibatun', 'tas']],
  [['تُفَّاحٌ', 'tuffahun', 'apel'], ['مَوْزٌ', 'mauzun', 'pisang'], ['بُرْتُقَالٌ', 'burtuqalun', 'jeruk'], ['عِنَبٌ', "'inabun", 'anggur'], ['تَمْرٌ', 'tamrun', 'kurma'], ['بِطِّيخٌ', 'biththikhun', 'semangka']],
  [['طَمَاطِمُ', 'thamathimu', 'tomat'], ['بَصَلٌ', 'bashalun', 'bawang'], ['جَزَرٌ', 'jazarun', 'wortel'], ['بَطَاطِسُ', 'bathathisu', 'kentang'], ['خِيَارٌ', 'khiyarun', 'mentimun'], ['فِلْفِلٌ', 'filfilun', 'cabai / merica']],
  [['سَرِيرٌ', 'sarirun', 'ranjang'], ['مِصْبَاحٌ', 'mishbahun', 'lampu'], ['ثَلَّاجَةٌ', 'tsallajatun', 'kulkas'], ['مِرْآةٌ', "mir'atun", 'cermin'], ['خِزَانَةٌ', 'khizanatun', 'lemari'], ['كُوبٌ', 'kubun', 'gelas']],
  [['إِمَامٌ', 'imamun', 'imam'], ['مُؤَذِّنٌ', "mu'adzdzinun", 'muazin'], ['صَلَاةٌ', 'shalatun', 'shalat'], ['وُضُوءٌ', "wudhu'un", 'wudhu'], ['مِحْرَابٌ', 'mihrabun', 'mihrab'], ['سَجَّادَةٌ', 'sajjadatun', 'sajadah']],
  [['مَدْرَسَةٌ', 'madrasatun', 'sekolah'], ['مُدِيرٌ', 'mudirun', 'kepala sekolah / direktur'], ['دَرْسٌ', 'darsun', 'pelajaran'], ['اِمْتِحَانٌ', 'imtihanun', 'ujian'], ['وَاجِبٌ', 'wajibun', 'PR / tugas'], ['جَامِعَةٌ', "jami'atun", 'universitas']],
  [['مَدِينَةٌ', 'madinatun', 'kota'], ['قَرْيَةٌ', 'qaryatun', 'desa'], ['شَارِعٌ', "syari'un", 'jalan'], ['جِسْرٌ', 'jisrun', 'jembatan'], ['مَطَارٌ', 'matharun', 'bandara'], ['مَحَطَّةٌ', 'mahaththatun', 'stasiun / halte']],
  [['إِنْدُونِيسِيَا', 'Indunisiya', 'Indonesia'], ['مِصْرُ', 'Mishru', 'Mesir'], ['اَلسُّعُودِيَّةُ', "as-Su'udiyyah", 'Arab Saudi'], ['اَلْيَابَانُ', 'al-Yabanu', 'Jepang'], ['مَالِيزِيَا', 'Maliziya', 'Malaysia'], ['تُرْكِيَا', 'Turkiya', 'Turki']],
  [['سَعِيدٌ', "sa'idun", 'bahagia'], ['حَزِينٌ', 'hazinun', 'sedih'], ['غَضْبَانُ', 'ghadhbanu', 'marah'], ['تَعْبَانُ', "ta'banu", 'lelah'], ['جَائِعٌ', "ja'i'un", 'lapar'], ['عَطْشَانُ', "'athsyanu", 'haus']],
  [['مَرِيضٌ', 'maridhun', 'sakit'], ['دَوَاءٌ', "dawa'un", 'obat'], ['صُدَاعٌ', "shuda'un", 'sakit kepala'], ['حُمَّى', 'humma', 'demam'], ['صِحَّةٌ', 'shihhatun', 'kesehatan'], ['شِفَاءٌ', "syifa'un", 'kesembuhan']],
  [['عَمٌّ', "'ammun", 'paman (dari ayah)'], ['خَالٌ', 'khalun', 'paman (dari ibu)'], ['عَمَّةٌ', "'ammatun", 'bibi (dari ayah)'], ['خَالَةٌ', 'khalatun', 'bibi (dari ibu)'], ['اِبْنٌ', 'ibnun', 'anak laki-laki'], ['بِنْتٌ', 'bintun', 'anak perempuan']],
  [['اِسْتَيْقَظَ', 'istaiqazha', 'bangun tidur'], ['اِغْتَسَلَ', 'ightasala', 'mandi'], ['تَوَضَّأَ', "tawadhdha'a", 'berwudhu'], ['صَلَّى', 'shalla', 'shalat'], ['فُطُورٌ', 'futhurun', 'sarapan'], ['لَبِسَ', 'labisa', 'memakai (pakaian)']],
  [['عَشَاءٌ', "'asya'un", 'makan malam'], ['رَاجَعَ', "raja'a", 'mengulang (pelajaran)'], ['جَلَسَ', 'jalasa', 'duduk'], ['تَحَدَّثَ', 'tahaddatsa', 'bercakap-cakap'], ['لَيْلٌ', 'lailun', 'malam'], ['نَوْمٌ', 'naumun', 'tidur (kata benda)']],
  [['مَا', 'ma', 'apa'], ['مَنْ', 'man', 'siapa'], ['أَيْنَ', 'aina', 'di mana'], ['مَتَى', 'mata', 'kapan'], ['كَيْفَ', 'kaifa', 'bagaimana'], ['كَمْ', 'kam', 'berapa']],
  [['وَ', 'wa', 'dan'], ['ثُمَّ', 'tsumma', 'kemudian'], ['أَوْ', 'au', 'atau'], ['لٰكِنْ', 'lakin', 'tetapi'], ['لِأَنَّ', "li'anna", 'karena'], ['فَ', 'fa', 'lalu / maka']],
  [['فِي', 'fi', 'di dalam'], ['عَلَى', "'ala", 'di atas'], ['مِنْ', 'min', 'dari'], ['إِلَى', 'ila', 'ke'], ['مَعَ', "ma'a", 'bersama'], ['عِنْدَ', "'inda", 'di sisi / pada']],
  [['شُكْرًا', 'syukran', 'terima kasih'], ['عَفْوًا', "'afwan", 'sama-sama / maaf'], ['مِنْ فَضْلِكَ', 'min fadhlika', 'tolong / silakan'], ['آسِفٌ', 'asifun', 'maaf (menyesal)'], ['إِنْ شَاءَ اللّٰهُ', "in sya'a Allah", 'jika Allah menghendaki'], ['جَزَاكَ اللّٰهُ خَيْرًا', 'jazakallahu khairan', 'semoga Allah membalasmu dengan kebaikan']],
];

const elementary: WordTuple[][] = [
  [['عَادَةً', "'adatan", 'biasanya'], ['كُلَّ يَوْمٍ', 'kulla yaumin', 'setiap hari'], ['يَسْتَيْقِظُ', 'yastaiqizhu', 'bangun tidur'], ['يَذْهَبُ', 'yadzhabu', 'pergi'], ['يَرْجِعُ', "yarji'u", 'pulang / kembali'], ['يَنَامُ', 'yanamu', 'tidur']],
  [['جَدْوَلٌ', 'jadwalun', 'jadwal'], ['حِصَّةٌ', 'hishshatun', 'jam pelajaran'], ['مَادَّةٌ', 'maddatun', 'mata pelajaran'], ['اِسْتِرَاحَةٌ', 'istirahatun', 'istirahat'], ['يَبْدَأُ', "yabda'u", 'dimulai'], ['يَنْتَهِي', 'yantahi', 'berakhir']],
  [['زَوْجٌ', 'zaujun', 'suami'], ['زَوْجَةٌ', 'zaujatun', 'istri'], ['يَعْمَلُ', "ya'malu", 'bekerja'], ['شَرِكَةٌ', 'syarikatun', 'perusahaan'], ['مُعَلِّمٌ', "mu'allimun", 'guru / pengajar'], ['مُحَاسِبٌ', 'muhasibun', 'akuntan']],
  [['بِكَمْ', 'bikam', 'berapa harganya'], ['رِيَالٌ', 'riyalun', 'riyal'], ['تَخْفِيضٌ', 'takhfidhun', 'diskon'], ['دَفَعَ', "dafa'a", 'membayar'], ['فَاتُورَةٌ', 'faturatun', 'nota / tagihan'], ['كِيسٌ', 'kisun', 'kantong']],
  [['قَائِمَةُ الطَّعَامِ', "qa'imatuth tha'am", 'menu'], ['نَادِلٌ', 'nadilun', 'pelayan'], ['طَلَبَ', 'thalaba', 'memesan / meminta'], ['طَبَقٌ', 'thabaqun', 'piring / hidangan'], ['لَذِيذٌ', 'ladzidzun', 'lezat'], ['حِسَابٌ', 'hisabun', 'bon / tagihan']],
  [['غُرْفَةُ النَّوْمِ', 'ghurfatun naum', 'kamar tidur'], ['غُرْفَةُ الْجُلُوسِ', 'ghurfatul julus', 'ruang keluarga'], ['طَابِقٌ', 'thabiqun', 'lantai / tingkat'], ['دَرَجٌ', 'darajun', 'tangga'], ['سَقْفٌ', 'saqfun', 'atap / langit-langit'], ['جِدَارٌ', 'jidarun', 'dinding']],
  [['قَرِيبٌ', 'qaribun', 'dekat'], ['بَعِيدٌ', "ba'idun", 'jauh'], ['تَقَاطُعٌ', "taqathu'un", 'persimpangan'], ['مُسْتَقِيمًا', 'mustaqiman', 'lurus'], ['دُرْ', 'dur', 'beloklah'], ['إِشَارَةُ الْمُرُورِ', 'isyaratul murur', 'lampu lalu lintas']],
  [['مُسْتَوْصَفٌ', 'mustaushafun', 'klinik'], ['فَحْصٌ', 'fahshun', 'pemeriksaan'], ['أَلَمٌ', 'alamun', 'rasa sakit'], ['سُعَالٌ', "su'alun", 'batuk'], ['زُكَامٌ', 'zukamun', 'pilek'], ['وَصْفَةٌ', 'washfatun', 'resep']],
  [['كُرَةُ الْقَدَمِ', 'kuratul qadam', 'sepak bola'], ['مُبَارَاةٌ', 'mubaratun', 'pertandingan'], ['فَرِيقٌ', 'fariqun', 'tim'], ['لَاعِبٌ', "la'ibun", 'pemain'], ['يُمَارِسُ', 'yumarisu', 'melakukan / berlatih'], ['وَقْتُ الْفَرَاغِ', 'waqtul faragh', 'waktu luang']],
  [['صَيْفٌ', 'shaifun', 'musim panas'], ['شِتَاءٌ', "syita'un", 'musim dingin'], ['رَبِيعٌ', "rabi'un", 'musim semi'], ['خَرِيفٌ', 'kharifun', 'musim gugur'], ['مُعْتَدِلٌ', "mu'tadilun", 'sejuk / sedang'], ['دَرَجَةُ الْحَرَارَةِ', 'darajatul hararah', 'suhu']],
  [['رِحْلَةٌ', 'rihlatun', 'perjalanan'], ['جَوَازُ السَّفَرِ', 'jawazus safar', 'paspor'], ['تَذْكِرَةٌ', 'tadzkiratun', 'tiket'], ['فُنْدُقٌ', 'funduqun', 'hotel'], ['حَقِيبَةُ السَّفَرِ', 'haqibatus safar', 'koper'], ['وُصُولٌ', 'wushulun', 'kedatangan']],
  [['هَاتِفٌ', 'hatifun', 'telepon'], ['حَاسُوبٌ', 'hasubun', 'komputer'], ['رِسَالَةٌ', 'risalatun', 'pesan / surat'], ['بَرِيدٌ إِلِكْتُرُونِيٌّ', 'baridun iliktruniyyun', 'email'], ['شَاشَةٌ', 'syasyatun', 'layar'], ['تَطْبِيقٌ', 'tathbiqun', 'aplikasi']],
  [['أَظُنُّ', 'azhunnu', 'saya kira'], ['أُحِبُّ', 'uhibbu', 'saya suka'], ['أُفَضِّلُ', 'ufadhdhilu', 'saya lebih suka'], ['رَأْيٌ', "ra'yun", 'pendapat'], ['مُمْتِعٌ', "mumti'un", 'menyenangkan'], ['مُمِلٌّ', 'mumillun', 'membosankan']],
  [['سَافَرَ', 'safara', 'bepergian'], ['زَارَ', 'zara', 'mengunjungi'], ['رَأَى', "ra'a", 'melihat'], ['سَمِعَ', "sami'a", 'mendengar'], ['قَالَ', 'qala', 'berkata'], ['وَجَدَ', 'wajada', 'menemukan']],
  [['سَوْفَ', 'saufa', 'akan'], ['سَأَذْهَبُ', "sa'adzhabu", 'saya akan pergi'], ['يُرِيدُ', 'yuridu', 'ingin'], ['خُطَّةٌ', 'khuththatun', 'rencana'], ['الْأُسْبُوعُ الْقَادِمُ', "al-usbu'ul qadim", 'minggu depan'], ['عُطْلَةٌ', "'uthlatun", 'liburan']],
  [['طَوِيلُ الْقَامَةِ', 'thawilul qamah', 'tinggi badannya'], ['نَحِيفٌ', 'nahifun', 'kurus'], ['شَعْرٌ', "sya'run", 'rambut'], ['جَمِيلٌ', 'jamilun', 'indah / cantik'], ['كَرِيمٌ', 'karimun', 'dermawan / mulia'], ['نَشِيطٌ', 'nasyithun', 'rajin / aktif']],
  [['مَكْتَبُ الْبَرِيدِ', 'maktabul barid', 'kantor pos'], ['مَصْرِفٌ', 'mashrifun', 'bank'], ['صَيْدَلِيَّةٌ', 'shaidaliyyatun', 'apotek'], ['مَلْعَبٌ', "mal'abun", 'lapangan / stadion'], ['مَتْحَفٌ', 'mathafun', 'museum'], ['مَوْقِفٌ', 'mauqifun', 'halte / tempat parkir']],
  [['دَعْوَةٌ', "da'watun", 'undangan'], ['حَفْلَةٌ', 'haflatun', 'pesta / acara'], ['عِيدُ الْمِيلَادِ', "'idul milad", 'ulang tahun'], ['زِفَافٌ', 'zifafun', 'pernikahan'], ['يَحْضُرُ', 'yahdhuru', 'hadir'], ['مَوْعِدٌ', "mau'idun", 'janji temu']],
  [['تَجْرِبَةٌ', 'tajribatun', 'pengalaman'], ['مِنْ قَبْلُ', 'min qablu', 'sebelumnya'], ['لِأَوَّلِ مَرَّةٍ', "li'awwali marratin", 'untuk pertama kali'], ['ذِكْرَى', 'dzikra', 'kenangan'], ['مُدْهِشٌ', 'mudhisyun', 'menakjubkan'], ['تَعَلَّمَ', "ta'allama", 'mempelajari']],
];

function toWords(tuples: WordTuple[]): ArabicWord[] {
  return tuples.map(([arabic, transliteration, meaning]) => ({ arabic, transliteration, meaning }));
}

export type FoundationLevel = 'beginner' | 'elementary';

const banks: Record<FoundationLevel, WordTuple[][]> = { beginner: pemula, elementary };

/** Word set for theme index (0-based). Indices past the authored themes become review mixes. */
export function getFoundationWordSet(level: FoundationLevel, themeIndex: number): ArabicWord[] {
  const themes = banks[level];
  const theme = themes[themeIndex];
  if (theme) return toWords(theme);
  const offset = themeIndex - themes.length;
  return toWords(themes.map((set, index) => set[(index + offset) % set.length]).slice(0, 12));
}

export function getFoundationLevelWords(level: FoundationLevel): ArabicWord[] {
  return toWords(banks[level].flat());
}

export function foundationThemeCount(level: FoundationLevel) {
  return banks[level].length;
}
