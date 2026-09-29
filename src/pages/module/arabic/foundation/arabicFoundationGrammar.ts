import type { ArabicSentence } from './arabicFoundationSentences';
import type { ArabicWord } from './arabicFoundationVocabulary';

export type ArabicGrammarPoint = {
  pattern: string;
  meaning: string;
  formation: string;
  examples: [ArabicSentence, ArabicSentence];
};

type Ex = [arabic: string, transliteration: string, meaning: string];
const point = (pattern: string, meaning: string, formation: string, a: Ex, b: Ex): ArabicGrammarPoint => ({
  pattern,
  meaning,
  formation,
  examples: [
    { arabic: a[0], transliteration: a[1], meaning: a[2] },
    { arabic: b[0], transliteration: b[1], meaning: b[2] },
  ],
});

// One nahwu point per grammar lesson (index = lesson - 1); the last lesson of
// each level is a review assembled from the others.
export const pemulaGrammar: ArabicGrammarPoint[] = [
  point('Isim dan fi\'il', 'membedakan kata benda (isim) dan kata kerja (fi\'il)', 'Isim bisa menerima ال dan tanwin; fi\'il menunjukkan perbuatan dan waktu.',
    ['الطَّالِبُ يَكْتُبُ.', 'Ath-thalibu yaktubu.', 'Siswa itu sedang menulis.'],
    ['الْكِتَابُ جَدِيدٌ.', 'Al-kitabu jadidun.', 'Buku itu baru.']),
  point('Mubtada\' dan khabar', 'kalimat nominal: pokok kalimat + keterangan', 'Mubtada\' biasanya ma\'rifah (ber-ال) dan marfu\'; khabar juga marfu\'.',
    ['الْبَيْتُ كَبِيرٌ.', 'Al-baitu kabirun.', 'Rumah itu besar.'],
    ['الْمُدَرِّسُ فِي الْفَصْلِ.', 'Al-mudarrisu fil fashli.', 'Guru ada di kelas.']),
  point('Isim isyarah', 'kata tunjuk: ini dan itu', 'هٰذَا/ذٰلِكَ untuk mudzakkar, هٰذِهِ/تِلْكَ untuk mu\'annats.',
    ['هٰذَا قَلَمٌ.', 'Hadza qalamun.', 'Ini pulpen.'],
    ['تِلْكَ سَيَّارَةٌ.', 'Tilka sayyaratun.', 'Itu mobil.']),
  point('Dhamir munfashil', 'kata ganti orang yang berdiri sendiri', 'أَنَا، أَنْتَ، أَنْتِ، هُوَ، هِيَ، نَحْنُ، هُمْ + khabar.',
    ['أَنَا طَالِبٌ.', 'Ana thalibun.', 'Saya seorang siswa.'],
    ['هِيَ مُدَرِّسَةٌ.', 'Hiya mudarrisatun.', 'Dia (pr) seorang guru.']),
  point('Mudzakkar dan mu\'annats', 'jenis kata: laki-laki dan perempuan', 'Mu\'annats umumnya ditandai ta\' marbuthah (ـة).',
    ['هٰذَا طَالِبٌ وَهٰذِهِ طَالِبَةٌ.', 'Hadza thalibun wa hadzihi thalibatun.', 'Ini siswa dan ini siswi.'],
    ['الْبِنْتُ صَغِيرَةٌ.', 'Al-bintu shaghiratun.', 'Anak perempuan itu kecil.']),
  point('Mufrad, mutsanna, jamak', 'bentuk tunggal, dua, dan banyak', 'Mutsanna: + ـَانِ; jamak bisa beraturan (ـُونَ/ـَاتٌ) atau taksir (كُتُبٌ).',
    ['عِنْدِي كِتَابَانِ.', "'Indi kitabani.", 'Saya punya dua buku.'],
    ['هٰؤُلَاءِ طُلَّابٌ.', "Ha'ula'i thullabun.", 'Mereka ini para siswa.']),
  point('Huruf jar', 'kata depan yang membuat isim sesudahnya majrur (kasrah)', 'فِي، عَلَى، مِنْ، إِلَى + isim majrur.',
    ['الْكِتَابُ عَلَى الْمَكْتَبِ.', "Al-kitabu 'alal maktabi.", 'Buku di atas meja.'],
    ['ذَهَبْتُ إِلَى الْمَسْجِدِ.', 'Dzahabtu ilal masjidi.', 'Saya pergi ke masjid.']),
  point('Jumlah ismiyyah', 'kalimat yang diawali isim', 'Mubtada\' + khabar (keduanya marfu\').',
    ['اَللُّغَةُ الْعَرَبِيَّةُ جَمِيلَةٌ.', "Al-lughatul 'arabiyyatu jamilatun.", 'Bahasa Arab itu indah.'],
    ['أَبِي طَبِيبٌ.', 'Abi thabibun.', 'Ayahku dokter.']),
  point('Jumlah fi\'liyyah', 'kalimat yang diawali fi\'il', 'Fi\'il + fa\'il (marfu\') + maf\'ul bih (manshub).',
    ['كَتَبَ الطَّالِبُ الدَّرْسَ.', 'Katabath thalibud darsa.', 'Siswa itu menulis pelajaran.'],
    ['يَشْرَبُ أَحْمَدُ الْحَلِيبَ.', 'Yasyrabu Ahmadul haliba.', 'Ahmad meminum susu.']),
  point('Kata tanya', 'membuat kalimat tanya', 'مَنْ (siapa), مَا (apa), أَيْنَ (di mana), مَتَى (kapan), هَلْ (apakah).',
    ['مَنْ هٰذَا؟', 'Man hadza?', 'Siapa ini?'],
    ['أَيْنَ الْحَقِيبَةُ؟', 'Ainal haqibatu?', 'Di mana tas itu?']),
  point('Na\'at dan man\'ut', 'kata sifat mengikuti kata benda yang disifati', 'Na\'at mengikuti man\'ut dalam jenis, jumlah, i\'rab, dan ma\'rifah/nakirah.',
    ['هٰذَا بَيْتٌ كَبِيرٌ.', 'Hadza baitun kabirun.', 'Ini rumah yang besar.'],
    ['الطَّالِبَةُ الْمُجْتَهِدَةُ فِي الْفَصْلِ.', 'Ath-thalibatul mujtahidatu fil fashli.', 'Siswi yang rajin itu ada di kelas.']),
  point('Idhafah dasar', 'gabungan dua kata benda (kepemilikan)', 'Mudhaf tanpa ال dan tanwin + mudhaf ilaih majrur.',
    ['كِتَابُ الطَّالِبِ جَدِيدٌ.', 'Kitabuth thalibi jadidun.', 'Buku siswa itu baru.'],
    ['بَابُ الْبَيْتِ مَفْتُوحٌ.', 'Babul baiti maftuhun.', 'Pintu rumah itu terbuka.']),
  point('Fi\'il madhi', 'kata kerja lampau', 'Pola dasar فَعَلَ; akhiran berubah sesuai pelaku (ذَهَبْتُ، ذَهَبْنَا).',
    ['ذَهَبْتُ إِلَى السُّوقِ أَمْسِ.', 'Dzahabtu ilas suqi amsi.', 'Saya pergi ke pasar kemarin.'],
    ['أَكَلْنَا الْفُطُورَ.', 'Akalnal futhura.', 'Kami sudah sarapan.']),
  point('Fi\'il mudhari\'', 'kata kerja sekarang / akan datang', 'Diawali أ، ن، ي، ت sesuai pelaku (أَقْرَأُ، يَلْعَبُ).',
    ["أَقْرَأُ الْقُرْآنَ كُلَّ يَوْمٍ.", "Aqra'ul Qur'ana kulla yaumin.", 'Saya membaca Al-Qur\'an setiap hari.'],
    ['هُوَ يَلْعَبُ كُرَةَ الْقَدَمِ.', "Huwa yal'abu kuratal qadami.", 'Dia bermain sepak bola.']),
  point('Fi\'il amr', 'kata kerja perintah', 'Dari mudhari\': buang huruf awal, tambah hamzah washal bila perlu (اُكْتُبْ).',
    ['اُكْتُبِ اسْمَكَ.', 'Uktubis-maka.', 'Tulislah namamu.'],
    ['اِجْلِسْ هُنَا.', 'Ijlis huna.', 'Duduklah di sini.']),
  point('Negasi لَا', 'meniadakan fi\'il mudhari\' (tidak)', 'لَا + fi\'il mudhari\'.',
    ['لَا أَشْرَبُ الْقَهْوَةَ.', 'La asyrabul qahwata.', 'Saya tidak minum kopi.'],
    ['لَا أَفْهَمُ هٰذَا الدَّرْسَ.', 'La afhamu hadzad darsa.', 'Saya tidak memahami pelajaran ini.']),
  point('Negasi مَا', 'meniadakan fi\'il madhi (tidak / belum)', 'مَا + fi\'il madhi.',
    ['مَا ذَهَبْتُ إِلَى الْمَدْرَسَةِ.', 'Ma dzahabtu ilal madrasati.', 'Saya tidak pergi ke sekolah.'],
    ['مَا أَكَلَ أَحْمَدُ.', 'Ma akala Ahmadu.', 'Ahmad tidak makan.']),
  point('Urutan kata', 'variasi susunan fi\'il dan fa\'il', 'Fi\'il di awal (VSO) atau isim di awal (SVO) dengan makna serupa.',
    ['ذَهَبَ الْوَلَدُ إِلَى الْمَدْرَسَةِ.', 'Dzahabal waladu ilal madrasati.', 'Anak itu pergi ke sekolah.'],
    ['الْوَلَدُ ذَهَبَ إِلَى الْمَدْرَسَةِ.', 'Al-waladu dzahaba ilal madrasati.', 'Anak itu (dia) pergi ke sekolah.']),
  point('Kalimat sederhana', 'menyusun kalimat identitas dan keterangan', 'Dhamir/isim + keterangan tempat atau asal.',
    ['أَنَا مِنْ إِنْدُونِيسِيَا.', 'Ana min Indunisiya.', 'Saya dari Indonesia.'],
    ['أَسْكُنُ فِي جَاكَرْتَا.', 'Askunu fi Jakarta.', 'Saya tinggal di Jakarta.']),
];

export const elementaryGrammar: ArabicGrammarPoint[] = [
  point('Jumlah ismiyyah lanjutan', 'khabar berupa kalimat atau keterangan', 'Khabar bisa jumlah fi\'liyyah atau syibh jumlah (jar-majrur).',
    ['الطَّالِبُ يَدْرُسُ فِي الْمَكْتَبَةِ.', 'Ath-thalibu yadrusu fil maktabati.', 'Siswa itu belajar di perpustakaan.'],
    ['فِي الْفَصْلِ طُلَّابٌ كَثِيرُونَ.', 'Fil fashli thullabun katsiruna.', 'Di kelas ada banyak siswa.']),
  point('Jumlah fi\'liyyah lanjutan', 'kalimat verbal lengkap dengan keterangan', 'Fi\'il + fa\'il + maf\'ul bih + keterangan tempat/waktu.',
    ['قَرَأَ الْمُدَرِّسُ الْكِتَابَ فِي الْفَصْلِ.', "Qara'al mudarrisul kitaba fil fashli.", 'Guru membaca buku di kelas.'],
    ['يَشْتَرِي أَبِي الْخُبْزَ مِنَ السُّوقِ.', 'Yasytari abil khubza minas suqi.', 'Ayahku membeli roti di pasar.']),
  point('Fi\'il madhi dan pelaku', 'perubahan fi\'il madhi sesuai pelaku', 'ـتُ (saya), ـتَ (kamu lk), ـَتْ (dia pr), ـنَا (kami).',
    ['كَتَبَتْ فَاطِمَةُ رِسَالَةً.', 'Katabat Fathimatu risalatan.', 'Fatimah menulis surat.'],
    ['ذَهَبْنَا إِلَى الْحَدِيقَةِ.', 'Dzahabna ilal hadiqati.', 'Kami pergi ke taman.']),
  point('Fi\'il mudhari\' dan pelaku', 'awalan fi\'il mudhari\' sesuai pelaku', 'أَ (saya), نَ (kami), تَ (kamu / dia pr), يَ (dia lk).',
    ['تَذْهَبُ أُخْتِي إِلَى الْجَامِعَةِ.', "Tadzhabu ukhti ilal jami'ati.", 'Saudara perempuanku pergi ke universitas.'],
    ['نَدْرُسُ اللُّغَةَ الْعَرَبِيَّةَ.', "Nadrusul lughatal 'arabiyyata.", 'Kami belajar bahasa Arab.']),
  point('Huruf jar dalam kalimat', 'jar-majrur sebagai keterangan', 'مِنْ ... إِلَى ... (dari ... ke ...); عَلَى / فِي + majrur.',
    ['سَافَرْتُ مِنْ جَاكَرْتَا إِلَى الْقَاهِرَةِ.', 'Safartu min Jakarta ilal Qahirati.', 'Saya bepergian dari Jakarta ke Kairo.'],
    ['جَلَسَ الْوَلَدُ عَلَى الْكُرْسِيِّ.', "Jalasal waladu 'alal kursiyyi.", 'Anak itu duduk di kursi.']),
  point('Idhafah dalam konteks', 'idhafah sebagai mubtada\' atau khabar', 'Mudhaf mengikuti posisi i\'rabnya; mudhaf ilaih selalu majrur.',
    ['سَيَّارَةُ أَبِي جَدِيدَةٌ.', 'Sayyaratu abi jadidatun.', 'Mobil ayahku baru.'],
    ['مُدِيرُ الْمَدْرَسَةِ رَجُلٌ كَرِيمٌ.', 'Mudirul madrasati rajulun karimun.', 'Kepala sekolah itu orang yang dermawan.']),
  point('Na\'at man\'ut lanjutan', 'kesesuaian sifat pada isim ma\'rifah', 'Man\'ut ber-ال → na\'at juga ber-ال, sama i\'rab dan jenisnya.',
    ['قَرَأْتُ الْكِتَابَ الْجَدِيدَ.', "Qara'tul kitabal jadida.", 'Saya membaca buku yang baru itu.'],
    ['هٰذِهِ مَدِينَةٌ جَمِيلَةٌ.', 'Hadzihi madinatun jamilatun.', 'Ini kota yang indah.']),
  point('Kana dan saudaranya', 'kalimat nominal di masa lampau / keadaan', 'كَانَ + isim (marfu\') + khabar (manshub).',
    ['كَانَ الْجَوُّ حَارًّا.', 'Kanal jawwu harran.', 'Cuacanya (tadi) panas.'],
    ['كَانَ أَبِي مُدَرِّسًا.', 'Kana abi mudarrisan.', 'Ayahku dulu seorang guru.']),
  point('Inna dan saudaranya', 'penegasan atau harapan dalam kalimat nominal', 'إِنَّ / لَعَلَّ + isim (manshub) + khabar (marfu\').',
    ['إِنَّ الْعِلْمَ نَافِعٌ.', "Innal 'ilma nafi'un.", 'Sesungguhnya ilmu itu bermanfaat.'],
    ['لَعَلَّ الْمُدَرِّسَ مَرِيضٌ.', "La'allal mudarrisa maridhun.", 'Barangkali guru itu sakit.']),
  point('Dhamir muttashil', 'kata ganti yang menempel pada isim untuk kepemilikan', 'Isim + ـِي (-ku), ـكَ/ـكِ (-mu), ـهُ/ـهَا (-nya), ـنَا (kami); isim tidak memakai ال.',
    ['هٰذَا كِتَابِي وَذٰلِكَ كِتَابُكَ.', 'Hadza kitabi wa dzalika kitabuka.', 'Ini bukuku dan itu bukumu.'],
    ['بَيْتُهَا قَرِيبٌ مِنْ مَدْرَسَتِنَا.', 'Baituha qaribun min madrasatina.', 'Rumahnya (pr) dekat dari sekolah kami.']),
  point('Isyarah mutsanna dan jamak', 'kata tunjuk untuk dua orang/benda dan banyak orang', 'هٰذَانِ/هَاتَانِ (dua, ini), هٰؤُلَاءِ (mereka ini), أُولٰئِكَ (mereka itu).',
    ['هٰذَانِ طَالِبَانِ مُجْتَهِدَانِ.', 'Hadzani thalibani mujtahidani.', 'Ini dua siswa yang rajin.'],
    ['أُولٰئِكَ مُهَنْدِسُونَ.', "Ula'ika muhandisuna.", 'Mereka itu para insinyur.']),
  point('Isim maushul', 'kata sambung "yang" untuk menjelaskan isim ma\'rifah', 'الَّذِي (mudzakkar), الَّتِي (mu\'annats), الَّذِينَ (jamak lk) + kalimat penjelas (shilah).',
    ['الرَّجُلُ الَّذِي يَعْمَلُ فِي الْمَصْرِفِ جَارُنَا.', "Ar-rajulul ladzi ya'malu fil mashrifi jaruna.", 'Laki-laki yang bekerja di bank itu tetangga kami.'],
    ['قَرَأْتُ الْقِصَّةَ الَّتِي كَتَبَتْهَا أُخْتِي.', "Qara'tul qishshatal lati katabatha ukhti.", 'Saya membaca cerita yang ditulis saudara perempuanku.']),
  point('Sa- dan saufa', 'menyatakan rencana atau kejadian di masa depan', 'سَـ (dekat) atau سَوْفَ (lebih jauh) + fi\'il mudhari\'.',
    ['سَأُسَافِرُ إِلَى مَكَّةَ غَدًا.', "Sa'usafiru ila Makkata ghadan.", 'Saya akan bepergian ke Mekah besok.'],
    ['سَوْفَ نَزُورُ جَدَّتَنَا فِي الْعُطْلَةِ.', "Saufa nazuru jaddatana fil 'uthlati.", 'Kami akan mengunjungi nenek kami saat liburan.']),
  point('Negasi lan dan lam', 'meniadakan masa depan (tidak akan) dan masa lampau (tidak/belum)', 'لَنْ + mudhari\' manshub (akhir fathah); لَمْ + mudhari\' majzum (akhir sukun).',
    ['لَنْ أَتَأَخَّرَ عَنِ الدَّرْسِ.', "Lan ata'akhkhara 'anid darsi.", 'Saya tidak akan terlambat masuk pelajaran.'],
    ['لَمْ أَذْهَبْ إِلَى السُّوقِ أَمْسِ.', 'Lam adzhab ilas suqi amsi.', 'Saya tidak pergi ke pasar kemarin.']),
  point('Laisa', 'meniadakan kalimat nominal (bukan / tidak)', 'لَيْسَ + isim (marfu\') + khabar (manshub); bentuknya ikut pelaku: لَسْتُ، لَيْسَتْ، لَسْنَا.',
    ['لَيْسَ الْجَوُّ بَارِدًا الْيَوْمَ.', 'Laisal jawwu baridan al-yauma.', 'Cuaca hari ini tidak dingin.'],
    ['لَسْتُ مَرِيضًا، أَنَا تَعْبَانُ فَقَطْ.', "Lastu maridhan, ana ta'banu faqath.", 'Saya tidak sakit, saya hanya lelah.']),
  point('Bilangan dan ma\'dud', 'menghitung benda dengan bilangan 3-10', 'Bilangan 3-10 berlawanan jenis dengan ma\'dud; ma\'dud berbentuk jamak dan majrur (ثَلَاثَةُ كُتُبٍ، ثَلَاثُ بَنَاتٍ).',
    ['اِشْتَرَيْتُ ثَلَاثَةَ أَقْلَامٍ.', 'Isytaraitu tsalatsata aqlamin.', 'Saya membeli tiga pulpen.'],
    ['فِي الْفَصْلِ خَمْسُ طَالِبَاتٍ.', 'Fil fashli khamsu thalibatin.', 'Di kelas ada lima siswi.']),
  point('Zharaf zaman dan makan', 'keterangan waktu dan tempat dengan kata keterangan', 'قَبْلَ، بَعْدَ، أَمَامَ، خَلْفَ، بَيْنَ + isim majrur sebagai mudhaf ilaih.',
    ['أَغْسِلُ يَدَيَّ قَبْلَ الْأَكْلِ.', 'Aghsilu yadayya qablal akli.', 'Saya mencuci kedua tangan sebelum makan.'],
    ['الْمَصْرِفُ بَيْنَ الْمَسْجِدِ وَالصَّيْدَلِيَّةِ.', 'Al-mashrifu bainal masjidi wash-shaidaliyyati.', 'Bank berada di antara masjid dan apotek.']),
  point('Fi\'il nahyi', 'kalimat larangan (jangan)', 'لَا النَّاهِيَة + fi\'il mudhari\' majzum (لَا تَكْتُبْ، لَا تَذْهَبِي).',
    ['لَا تَلْعَبْ فِي الشَّارِعِ.', "La tal'ab fisy syari'i.", 'Jangan bermain di jalan.'],
    ['لَا تَنْسَيْ وَاجِبَكِ يَا فَاطِمَةُ.', 'La tansai wajibaki ya Fathimatu.', 'Jangan lupakan PR-mu, wahai Fatimah.']),
  point('Huruf \'athaf', 'menyambung kata atau kalimat dengan i\'rab yang sama', 'وَ (dan), فَ (lalu segera), ثُمَّ (kemudian), أَوْ (atau); kata sesudahnya mengikuti i\'rab kata sebelumnya.',
    ['دَخَلَ الْمُدَرِّسُ فَسَلَّمَ عَلَى الطُّلَّابِ.', "Dakhalal mudarrisu fasallama 'alath thullabi.", 'Guru masuk lalu memberi salam kepada para siswa.'],
    ['أَشْرَبُ الشَّايَ أَوِ الْقَهْوَةَ فِي الصَّبَاحِ.', 'Asyrabusy syaya awil qahwata fish shabahi.', 'Saya minum teh atau kopi di pagi hari.']),
];

export function getFoundationGrammarPoint(points: ArabicGrammarPoint[], lessonId: number, levelLabel: string): ArabicGrammarPoint {
  const found = points[lessonId - 1];
  if (found) return found;
  return {
    pattern: `Review nahwu ${levelLabel}`,
    meaning: `mengulang pola nahwu ${levelLabel}`,
    formation: points.map((item) => item.pattern).join(' · '),
    examples: [points[0].examples[0], points[Math.floor(points.length / 2)].examples[0]],
  };
}

export type ArabicPronunciationDrill = { focus: string; tip: string; words: ArabicWord[] };

type Drill = [focus: string, tip: string, words: Ex[]];
const drill = ([focus, tip, words]: Drill): ArabicPronunciationDrill => ({
  focus,
  tip,
  words: words.map(([arabic, transliteration, meaning]) => ({ arabic, transliteration, meaning })),
});

export const pemulaPronunciation: ArabicPronunciationDrill[] = ([
  ['ء ه ع ح غ خ', 'Huruf tenggorokan: hamzah & ha dari pangkal, ain & ha kecil dari tengah, ghain & kha dari ujung tenggorokan.', [['أَمَلٌ', 'amalun', 'harapan'], ['عِلْمٌ', "'ilmun", 'ilmu'], ['خَيْرٌ', 'khairun', 'kebaikan']]],
  ['ب م و ف', 'Huruf bibir: ب dan م merapatkan dua bibir, ف dari bibir bawah dan gigi atas.', [['بَابٌ', 'babun', 'pintu'], ['مَاءٌ', "ma'un", 'air'], ['فَمٌ', 'famun', 'mulut']]],
  ['ت د ط ث ذ ظ', 'Ujung lidah: ت د ط menyentuh pangkal gigi atas; ث ذ ظ ujung lidah keluar sedikit.', [['تَمْرٌ', 'tamrun', 'kurma'], ['ثَوْبٌ', 'tsaubun', 'pakaian'], ['ذَهَبٌ', 'dzahabun', 'emas']]],
  ['خ ص ض غ ط ق ظ', 'Huruf isti\'la\' (tebal): pangkal lidah naik, suara terdengar penuh.', [['صَبْرٌ', 'shabrun', 'kesabaran'], ['طَرِيقٌ', 'thariqun', 'jalan'], ['قَلْبٌ', 'qalbun', 'hati']]],
  ['س ك ت د', 'Huruf tipis: lidah rendah, jangan ditebalkan.', [['سَمَاءٌ', "sama'un", 'langit'], ['كَلِمَةٌ', 'kalimatun', 'kata'], ['تِينٌ', 'tinun', 'buah tin']]],
  ['Fathah ـَ', 'Fathah dibaca "a" pendek dan jelas, mulut sedikit terbuka.', [['كَتَبَ', 'kataba', 'menulis'], ['ذَهَبَ', 'dzahaba', 'pergi'], ['جَلَسَ', 'jalasa', 'duduk']]],
  ['Kasrah ـِ', 'Kasrah dibaca "i" pendek; bibir sedikit melebar.', [['بِنْتٌ', 'bintun', 'anak perempuan'], ['سِرٌّ', 'sirrun', 'rahasia'], ['كِتَابٌ', 'kitabun', 'buku']]],
  ['Dhammah ـُ', 'Dhammah dibaca "u" pendek dengan bibir membulat.', [['كُتُبٌ', 'kutubun', 'buku-buku'], ['رُسُلٌ', 'rusulun', 'para rasul'], ['قُلْ', 'qul', 'katakanlah']]],
  ['Sukun ـْ', 'Sukun berarti huruf mati: tahan tanpa vokal, jangan tambahkan "e".', [['قَلْبٌ', 'qalbun', 'hati'], ['بَحْرٌ', 'bahrun', 'laut'], ['شَمْسٌ', 'syamsun', 'matahari']]],
  ['Tasydid ـّ', 'Tasydid menggandakan huruf: tahan sebentar sebelum melanjutkan.', [['مُدَرِّسٌ', 'mudarrisun', 'guru'], ['رَبُّ', 'rabbu', 'Tuhan'], ['أُمٌّ', 'ummun', 'ibu']]],
  ['Mad asli (ا و ي)', 'Mad asli dibaca dua harakat: panjangkan secara konsisten.', [['كِتَابٌ', 'kitaabun', 'buku'], ['نُورٌ', 'nuurun', 'cahaya'], ['كَبِيرٌ', 'kabiirun', 'besar']]],
  ['Hamzah ء', 'Hamzah adalah hentakan di pangkal tenggorokan, bukan sekadar vokal.', [['سَأَلَ', "sa'ala", 'bertanya'], ['مُؤْمِنٌ', "mu'minun", 'orang beriman'], ['سَمَاءٌ', "sama'un", 'langit']]],
  ['ع vs ح', 'ع bersuara dan menekan tengah tenggorokan; ح berdesis tanpa suara.', [['عَلِمَ', "'alima", 'mengetahui'], ['حَلِمَ', 'halima', 'bermimpi'], ['عَمَلٌ', "'amalun", 'amal / pekerjaan']]],
  ['ق vs ك', 'ق dari pangkal lidah dan terdengar tebal; ك lebih depan dan tipis.', [['قَلْبٌ', 'qalbun', 'hati'], ['كَلْبٌ', 'kalbun', 'anjing'], ['قَالَ', 'qala', 'berkata']]],
  ['س vs ص', 'ص tebal dengan pangkal lidah terangkat; س tipis.', [['سَيْفٌ', 'saifun', 'pedang'], ['صَيْفٌ', 'shaifun', 'musim panas'], ['صَبَاحٌ', 'shabahun', 'pagi']]],
  ['د vs ض', 'ض keluar dari sisi lidah dan tebal; د ringan dari ujung lidah.', [['دَرْسٌ', 'darsun', 'pelajaran'], ['ضَرْبٌ', 'dharbun', 'pukulan'], ['أَرْضٌ', 'ardhun', 'bumi']]],
  ['Ra tafkhim', 'ر tebal saat berharakat fathah/dhammah, tipis saat kasrah.', [['رَبٌّ', 'rabbun', 'Tuhan'], ['رُزٌّ', 'ruzzun', 'beras'], ['رِجْلٌ', 'rijlun', 'kaki (tipis)']]],
  ['Lam jalalah', 'Lam pada lafaz Allah tebal setelah fathah/dhammah, tipis setelah kasrah.', [['اَللّٰهُ', 'Allahu', 'Allah'], ['عَبْدُ اللّٰهِ', "'Abdullahi", 'hamba Allah'], ['بِسْمِ اللّٰهِ', 'bismillahi', 'dengan nama Allah (tipis)']]],
  ['Waqaf pendek', 'Saat berhenti, akhir kata dibaca sukun; ta\' marbuthah dibaca "h".', [['كِتَابْ', 'kitab', 'buku (waqaf)'], ['مَدْرَسَهْ', 'madrasah', 'sekolah (waqaf)'], ['السَّلَامْ', 'as-salam', 'keselamatan (waqaf)']]],
] as Drill[]).map(drill);

export const elementaryPronunciation: ArabicPronunciationDrill[] = ([
  ['Kontras bunyi sulit', 'Bandingkan pasangan huruf mirip dalam satu tarikan napas.', [['ذَلِيلٌ', 'dzalilun', 'hina'], ['ظَلِيلٌ', 'zhalilun', 'teduh'], ['دَلِيلٌ', 'dalilun', 'petunjuk']]],
  ['Mad yang stabil', 'Jaga panjang mad tetap sama di awal, tengah, dan akhir kalimat.', [['قَالُوا', 'qaaluu', 'mereka berkata'], ['سَمَاوَاتٌ', 'samaawaatun', 'langit-langit'], ['مَسَاكِينُ', 'masaakiinu', 'orang-orang miskin']]],
  ['Tekanan kata', 'Tekanan jatuh pada suku kata panjang atau yang berakhir konsonan.', [['مَدْرَسَةٌ', 'madrasatun', 'sekolah'], ['مُسْتَشْفًى', 'mustasyfan', 'rumah sakit'], ['طَالِبَةٌ', 'thaalibatun', 'siswi']]],
  ['Intonasi tanya', 'Nada naik pada kata tanya هَلْ dan turun pada مَنْ/مَا/أَيْنَ di akhir.', [['هَلْ أَنْتَ طَالِبٌ؟', 'Hal anta thalibun?', 'Apakah kamu siswa?'], ['أَيْنَ تَسْكُنُ؟', 'Aina taskunu?', 'Di mana kamu tinggal?'], ['مَتَى تَرْجِعُ؟', "Mata tarji'u?", 'Kapan kamu pulang?']]],
  ['Intonasi dialog', 'Beri jeda singkat antar giliran bicara dan jawab dengan nada turun.', [['كَيْفَ حَالُكَ؟', 'Kaifa haluka?', 'Bagaimana kabarmu?'], ['بِخَيْرٍ، شُكْرًا.', 'Bikhairin, syukran.', 'Baik, terima kasih.'], ['وَأَنْتَ؟', 'Wa anta?', 'Dan kamu?']]],
  ['Waqaf pada kalimat', 'Berhenti di akhir makna; tanwin fathah dibaca "a" panjang saat waqaf.', [['رَأَيْتُ كِتَابًا', "Ra'aitu kitaaba", 'Saya melihat buku'], ['شُكْرًا', 'Syukraa', 'Terima kasih'], ['جِدًّا', 'Jiddaa', 'Sangat']]],
  ['Ghunnah', 'Nun dan mim bertasydid didengungkan sekitar dua harakat.', [['إِنَّ', 'inna', 'sesungguhnya'], ['ثُمَّ', 'tsumma', 'kemudian'], ['جَنَّةٌ', 'jannatun', 'surga']]],
  ['Idgham ringan', 'Nun mati/tanwin bertemu ي ن م و dilebur dengan dengung.', [['مَنْ يَقُولُ', 'may yaqulu', 'siapa yang berkata'], ['مِنْ مَاءٍ', "mim ma'in", 'dari air'], ['خَيْرٌ وَأَبْقَى', 'khairuw wa abqa', 'lebih baik dan lebih kekal']]],
  ['Ikhfa\' ringan', 'Nun mati disamarkan dengan dengung sebelum huruf ikhfa\'.', [['مِنْ قَبْلُ', 'min qablu', 'sebelumnya'], ['أَنْتَ', 'anta', 'kamu'], ['يَنْصُرُ', 'yanshuru', 'menolong']]],
  ['Qalqalah', 'ق ط ب ج د saat sukun dipantulkan ringan.', [['يَقْرَأُ', "yaqra'u", 'membaca'], ['أَبْوَابٌ', 'abwabun', 'pintu-pintu'], ['يَجْلِسُ', 'yajlisu', 'duduk']]],
  ['Ritme bacaan', 'Baca per frasa, bukan per kata; jaga ketukan yang rata.', [['فِي الصَّبَاحِ الْبَاكِرِ', 'fish shabahil bakiri', 'di pagi buta'], ['بَعْدَ صَلَاةِ الْعَصْرِ', "ba'da shalatil 'ashri", 'setelah shalat asar'], ['مَعَ أُسْرَتِي', "ma'a usrati", 'bersama keluargaku']]],
  ['Pengucapan frasa', 'Sambungkan ال dengan kata sebelumnya (hamzah washal tidak dibaca).', [['إِلَى الْمَدْرَسَةِ', 'ilal madrasati', 'ke sekolah'], ['فِي الْبَيْتِ', 'fil baiti', 'di rumah'], ['مِنَ السُّوقِ', 'minas suqi', 'dari pasar']]],
  ['Lam syamsiyyah & qamariyyah', 'ال dilebur pada huruf syamsiyyah, dibaca jelas pada huruf qamariyyah.', [['الشَّمْسُ', 'asy-syamsu', 'matahari'], ['الْقَمَرُ', 'al-qamaru', 'bulan'], ['النُّورُ', 'an-nuru', 'cahaya']]],
  ['Minimal pair', 'Latih pasangan kata yang hanya beda satu bunyi.', [['نَظَرَ', 'nazhara', 'melihat'], ['نَذَرَ', 'nadzara', 'bernazar'], ['نَصَرَ', 'nashara', 'menolong']]],
  ['Koreksi mandiri', 'Rekam, dengarkan, lalu tandai huruf yang masih tipis/tebal keliru.', [['صَدِيقٌ', 'shadiqun', 'teman'], ['ضَيْفٌ', 'dhaifun', 'tamu'], ['طَبِيبٌ', 'thabibun', 'dokter']]],
  ['Membaca dialog', 'Bedakan suara penanya dan penjawab; beri jeda natural.', [['مَا اسْمُكَ؟', 'Mas-muka?', 'Siapa namamu?'], ['اِسْمِي سَلْمَى.', 'Ismi Salma.', 'Namaku Salma.'], ['تَشَرَّفْنَا.', 'Tasyarrafna.', 'Senang berkenalan.']]],
  ['Membaca paragraf', 'Tarik napas di akhir kalimat, bukan di tengah idhafah.', [['بَيْتُ صَدِيقِي', 'baitu shadiqi', 'rumah temanku'], ['مُدِيرُ الْمَدْرَسَةِ', 'mudirul madrasati', 'kepala sekolah'], ['كِتَابُ اللُّغَةِ', 'kitabul lughati', 'buku bahasa']]],
  ['Rekam ulang', 'Bandingkan rekamanmu dengan TTS: panjang mad, tasydid, dan waqaf.', [['مُسْتَقْبَلٌ', 'mustaqbalun', 'masa depan'], ['اِجْتِمَاعٌ', "ijtima'un", 'pertemuan'], ['مُحَادَثَةٌ', 'muhadatsatun', 'percakapan']]],
  ['Fluency pendek', 'Baca tiga kalimat tanpa berhenti di tengah kata.', [['أَنَا أَدْرُسُ كُلَّ يَوْمٍ', 'Ana adrusu kulla yaumin', 'Saya belajar setiap hari'], ['نَحْنُ نُحِبُّ الْعَرَبِيَّةَ', "Nahnu nuhibbul 'arabiyyata", 'Kami mencintai bahasa Arab'], ['هُوَ يَعْمَلُ بِجِدٍّ', "Huwa ya'malu bijiddin", 'Dia bekerja dengan sungguh-sungguh']]],
] as Drill[]).map(drill);
