import type { ArabicWord, FoundationLevel } from './arabicFoundationVocabulary';

export type ArabicSentence = ArabicWord;
type SentenceTuple = [arabic: string, transliteration: string, meaning: string];

const s = (items: SentenceTuple[]): ArabicSentence[] =>
  items.map(([arabic, transliteration, meaning]) => ({ arabic, transliteration, meaning }));

// Short communicative sentence sets used by kalam, istima', qira'ah and kitabah.
export const pemulaSentenceThemes = {
  salam: s([
    ['السَّلَامُ عَلَيْكُمْ.', "As-salamu 'alaikum.", 'Semoga keselamatan atasmu.'],
    ['وَعَلَيْكُمُ السَّلَامُ.', "Wa 'alaikumus salam.", 'Dan semoga keselamatan atasmu juga.'],
    ['صَبَاحَ الْخَيْرِ يَا أُسْتَاذُ.', 'Shabahal khair ya ustadz.', 'Selamat pagi, Pak Guru.'],
  ]),
  nama: s([
    ['مَا اسْمُكَ؟', 'Mas-muka?', 'Siapa namamu?'],
    ['اِسْمِي أَحْمَدُ.', 'Ismi Ahmadu.', 'Namaku Ahmad.'],
    ['تَشَرَّفْنَا.', 'Tasyarrafna.', 'Senang berkenalan.'],
  ]),
  asal: s([
    ['مِنْ أَيْنَ أَنْتَ؟', 'Min aina anta?', 'Kamu berasal dari mana?'],
    ['أَنَا مِنْ إِنْدُونِيسِيَا.', 'Ana min Indunisiya.', 'Saya dari Indonesia.'],
    ['هُوَ مِنْ مِصْرَ.', 'Huwa min Mishra.', 'Dia dari Mesir.'],
  ]),
  kabar: s([
    ['كَيْفَ حَالُكَ؟', 'Kaifa haluka?', 'Bagaimana kabarmu?'],
    ['بِخَيْرٍ، وَالْحَمْدُ لِلّٰهِ.', 'Bikhairin, wal hamdu lillah.', 'Baik, alhamdulillah.'],
    ['أَنَا بِخَيْرٍ أَيْضًا.', 'Ana bikhairin aidhan.', 'Saya juga baik.'],
  ]),
  terimaKasih: s([
    ['شُكْرًا جَزِيلًا.', 'Syukran jazilan.', 'Terima kasih banyak.'],
    ['عَفْوًا.', "'Afwan.", 'Sama-sama.'],
    ['جَزَاكَ اللّٰهُ خَيْرًا.', 'Jazakallahu khairan.', 'Semoga Allah membalasmu dengan kebaikan.'],
  ]),
  maaf: s([
    ['آسِفٌ جِدًّا.', 'Asifun jiddan.', 'Saya sungguh minta maaf.'],
    ['لَا بَأْسَ.', "La ba'sa.", 'Tidak apa-apa.'],
    ['آسِفٌ، أَنَا مُتَأَخِّرٌ.', "Asifun, ana muta'akhkhirun.", 'Maaf, saya terlambat.'],
  ]),
  izin: s([
    ['هَلْ يُمْكِنُ أَنْ أَدْخُلَ؟', 'Hal yumkinu an adkhula?', 'Bolehkah saya masuk?'],
    ['تَفَضَّلْ.', 'Tafadhdhal.', 'Silakan.'],
    ['اِسْمَحْ لِي أَنْ أَسْأَلَ.', "Ismah li an as'ala.", 'Izinkan saya bertanya.'],
  ]),
  keluarga: s([
    ['هٰذَا أَبِي وَهٰذِهِ أُمِّي.', 'Hadza abi wa hadzihi ummi.', 'Ini ayahku dan ini ibuku.'],
    ['لِي أَخٌ وَأُخْتَانِ.', 'Li akhun wa ukhtani.', 'Saya punya seorang saudara laki-laki dan dua saudara perempuan.'],
    ['أُسْرَتِي صَغِيرَةٌ.', 'Usrati shaghiratun.', 'Keluargaku kecil.'],
  ]),
  kelas: s([
    ['هٰذَا فَصْلِي.', 'Hadza fashli.', 'Ini kelasku.'],
    ['السَّبُّورَةُ أَمَامَ الطُّلَّابِ.', 'As-sabburatu amamath thullabi.', 'Papan tulis ada di depan para siswa.'],
    ['الْقَلَمُ عَلَى الْمَكْتَبِ.', "Al-qalamu 'alal maktabi.", 'Pulpen ada di atas meja.'],
  ]),
  rumah: s([
    ['بَيْتِي قَرِيبٌ مِنَ الْمَسْجِدِ.', 'Baiti qaribun minal masjidi.', 'Rumahku dekat dengan masjid.'],
    ['فِي الْبَيْتِ ثَلَاثُ غُرَفٍ.', 'Fil baiti tsalatsu ghurafin.', 'Di rumah ada tiga kamar.'],
    ['أُمِّي فِي الْمَطْبَخِ.', 'Ummi fil mathbakhi.', 'Ibuku ada di dapur.'],
  ]),
  aktivitas: s([
    ['أَسْتَيْقِظُ مُبَكِّرًا.', 'Astaiqizhu mubakkiran.', 'Saya bangun pagi-pagi.'],
    ['أَذْهَبُ إِلَى الْمَدْرَسَةِ.', 'Adzhabu ilal madrasati.', 'Saya pergi ke sekolah.'],
    ['أُرَاجِعُ الدَّرْسَ فِي الْمَسَاءِ.', "Uraji'ud darsa fil masa'i.", 'Saya mengulang pelajaran pada malam hari.'],
  ]),
  makanan: s([
    ['أُرِيدُ خُبْزًا وَمَاءً.', "Uridu khubzan wa ma'an.", 'Saya mau roti dan air.'],
    ['هٰذَا الطَّعَامُ لَذِيذٌ.', "Hadzath tha'amu ladzidzun.", 'Makanan ini lezat.'],
    ['أَنَا جَائِعٌ.', "Ana ja'i'un.", 'Saya lapar.'],
  ]),
  angka: s([
    ['عِنْدِي ثَلَاثَةُ كُتُبٍ.', "'Indi tsalatsatu kutubin.", 'Saya punya tiga buku.'],
    ['كَمْ عُمُرُكَ؟', "Kam 'umuruka?", 'Berapa umurmu?'],
    ['عُمُرِي عِشْرُونَ سَنَةً.', "'Umuri 'isyruna sanatan.", 'Umurku dua puluh tahun.'],
  ]),
  waktu: s([
    ['كَمِ السَّاعَةُ الْآنَ؟', "Kamis sa'atul ana?", 'Jam berapa sekarang?'],
    ['السَّاعَةُ السَّابِعَةُ.', "As-sa'atus sabi'atu.", 'Sekarang jam tujuh.'],
    ['الدَّرْسُ فِي الصَّبَاحِ.', 'Ad-darsu fish shabahi.', 'Pelajarannya pagi hari.'],
  ]),
  arah: s([
    ['أَيْنَ الْمَسْجِدُ؟', 'Ainal masjidu?', 'Di mana masjid?'],
    ['اِذْهَبْ إِلَى الْيَمِينِ.', 'Idzhab ilal yamini.', 'Pergilah ke kanan.'],
    ['الْمَسْجِدُ خَلْفَ الْمَدْرَسَةِ.', 'Al-masjidu khalfal madrasati.', 'Masjid ada di belakang sekolah.'],
  ]),
  belanja: s([
    ['بِكَمْ هٰذَا؟', 'Bikam hadza?', 'Berapa harga ini?'],
    ['هٰذَا بِعَشَرَةِ رِيَالَاتٍ.', "Hadza bi'asyarati riyalatin.", 'Ini sepuluh riyal.'],
    ['هٰذَا غَالٍ، أُرِيدُ الرَّخِيصَ.', 'Hadza ghalin, uridur rakhisha.', 'Ini mahal, saya mau yang murah.'],
  ]),
  transportasi: s([
    ['أَذْهَبُ إِلَى الْمَدْرَسَةِ بِالْحَافِلَةِ.', 'Adzhabu ilal madrasati bil hafilati.', 'Saya pergi ke sekolah naik bus.'],
    ['أَبِي يَرْكَبُ السَّيَّارَةَ.', 'Abi yarkabus sayyarata.', 'Ayahku naik mobil.'],
    ['الْقِطَارُ سَرِيعٌ.', "Al-qitharu sari'un.", 'Kereta itu cepat.'],
  ]),
  hobi: s([
    ['مَا هِوَايَتُكَ؟', 'Ma hiwayatuka?', 'Apa hobimu?'],
    ['هِوَايَتِي الْقِرَاءَةُ.', "Hiwayatil qira'atu.", 'Hobiku membaca.'],
    ['أُحِبُّ السِّبَاحَةَ.', 'Uhibbus sibahata.', 'Saya suka berenang.'],
  ]),
  cuaca: s([
    ['الْجَوُّ حَارٌّ الْيَوْمَ.', 'Al-jawwu harrun al-yauma.', 'Cuaca panas hari ini.'],
    ['يَنْزِلُ الْمَطَرُ.', 'Yanzilul matharu.', 'Hujan turun.'],
    ['الشَّمْسُ مُشْرِقَةٌ.', 'Asy-syamsu musyriqatun.', 'Matahari bersinar.'],
  ]),
  janji: s([
    ['نَلْتَقِي غَدًا إِنْ شَاءَ اللّٰهُ.', "Naltaqi ghadan in sya'a Allah.", 'Kita bertemu besok, insya Allah.'],
    ['مَتَى نَلْتَقِي؟', 'Mata naltaqi?', 'Kapan kita bertemu?'],
    ['فِي السَّاعَةِ الرَّابِعَةِ أَمَامَ الْمَكْتَبَةِ.', "Fis sa'atir rabi'ati amamal maktabati.", 'Jam empat di depan perpustakaan.'],
  ]),
  tempatUmum: s([
    ['نُصَلِّي فِي الْمَسْجِدِ.', 'Nushalli fil masjidi.', 'Kami shalat di masjid.'],
    ['السُّوقُ مُزْدَحِمٌ.', 'As-suqu muzdahimun.', 'Pasar itu ramai.'],
    ['الْمُسْتَشْفَى بَعِيدٌ.', "Al-mustasyfa ba'idun.", 'Rumah sakit itu jauh.'],
  ]),
  kesehatan: s([
    ['أَنَا مَرِيضٌ.', 'Ana maridhun.', 'Saya sakit.'],
    ['عِنْدِي صُدَاعٌ.', "'Indi shuda'un.", 'Saya sakit kepala.'],
    ['اِشْرَبْ هٰذَا الدَّوَاءَ.', "Isyrab hadzad dawa'a.", 'Minumlah obat ini.'],
  ]),
  pekerjaan: s([
    ['أَبِي طَبِيبٌ.', 'Abi thabibun.', 'Ayahku dokter.'],
    ['أُمِّي مُدَرِّسَةٌ.', 'Ummi mudarrisatun.', 'Ibuku guru.'],
    ['أَيْنَ تَعْمَلُ؟', "Aina ta'malu?", 'Di mana kamu bekerja?'],
  ]),
  warna: s([
    ['لَوْنُ السَّيَّارَةِ أَحْمَرُ.', 'Launus sayyarati ahmaru.', 'Warna mobil itu merah.'],
    ['السَّمَاءُ زَرْقَاءُ.', "As-sama'u zarqa'u.", 'Langit berwarna biru.'],
    ['هٰذَا الْقَمِيصُ أَبْيَضُ.', 'Hadzal qamishu abyadhu.', 'Kemeja ini putih.'],
  ]),
  undangan: s([
    ['تَفَضَّلْ إِلَى بَيْتِي.', 'Tafadhdhal ila baiti.', 'Silakan mampir ke rumahku.'],
    ['هَلْ تَحْضُرُ الْحَفْلَةَ؟', 'Hal tahdhurul haflata?', 'Apakah kamu hadir di acara itu?'],
    ['نَعَمْ، سَأَحْضُرُ.', "Na'am, sa'ahdhuru.", 'Ya, saya akan hadir.'],
  ]),
  cerita: s([
    ['كَانَ هُنَاكَ وَلَدٌ صَغِيرٌ.', 'Kana hunaka waladun shaghirun.', 'Dahulu ada seorang anak kecil.'],
    ['ذَهَبَ الْوَلَدُ إِلَى السُّوقِ.', 'Dzahabal waladu ilas suqi.', 'Anak itu pergi ke pasar.'],
    ['اِشْتَرَى تُفَّاحَةً وَرَجَعَ إِلَى الْبَيْتِ.', "Isytara tuffahatan wa raja'a ilal baiti.", 'Dia membeli sebuah apel lalu pulang ke rumah.'],
  ]),
} satisfies Record<string, ArabicSentence[]>;

export const elementarySentenceThemes = {
  perkenalan: s([
    ['اِسْمِي سَلْمَى، وَأَنَا طَالِبَةٌ فِي الْجَامِعَةِ.', "Ismi Salma, wa ana thalibatun fil jami'ati.", 'Namaku Salma, saya mahasiswi di universitas.'],
    ['أَدْرُسُ اللُّغَةَ الْعَرَبِيَّةَ مُنْذُ سَنَتَيْنِ.', "Adrusul lughatal 'arabiyyata mundzu sanataini.", 'Saya belajar bahasa Arab sejak dua tahun lalu.'],
    ['أَسْكُنُ مَعَ أُسْرَتِي فِي بَانْدُونْج.', "Askunu ma'a usrati fi Bandung.", 'Saya tinggal bersama keluarga di Bandung.'],
  ]),
  rutinitas: s([
    ['أَسْتَيْقِظُ فِي السَّاعَةِ الْخَامِسَةِ صَبَاحًا.', "Astaiqizhu fis sa'atil khamisati shabahan.", 'Saya bangun jam lima pagi.'],
    ['بَعْدَ الصَّلَاةِ أَتَنَاوَلُ الْفُطُورَ.', "Ba'dash shalati atanawalul futhura.", 'Setelah shalat saya sarapan.'],
    ['أَرْجِعُ إِلَى الْبَيْتِ فِي الْعَصْرِ.', "Arji'u ilal baiti fil 'ashri.", 'Saya pulang ke rumah pada waktu asar.'],
  ]),
  profesi: s([
    ['يَعْمَلُ أَبِي مُهَنْدِسًا فِي شَرِكَةٍ كَبِيرَةٍ.', "Ya'malu abi muhandisan fi syarikatin kabiratin.", 'Ayahku bekerja sebagai insinyur di perusahaan besar.'],
    ['تُعَلِّمُ أُمِّي فِي مَدْرَسَةٍ ابْتِدَائِيَّةٍ.', "Tu'allimu ummi fi madrasatin ibtida'iyyatin.", 'Ibuku mengajar di sekolah dasar.'],
    ['أَخِي الْأَكْبَرُ طَبِيبٌ فِي الْمُسْتَشْفَى.', 'Akhil akbaru thabibun fil mustasyfa.', 'Kakak laki-lakiku dokter di rumah sakit.'],
  ]),
  jadwal: s([
    ['تَبْدَأُ الدِّرَاسَةُ فِي السَّاعَةِ السَّابِعَةِ.', "Tabda'ud dirasatu fis sa'atis sabi'ati.", 'Pelajaran dimulai jam tujuh.'],
    ['عِنْدَنَا خَمْسُ حِصَصٍ كُلَّ يَوْمٍ.', "'Indana khamsu hishashin kulla yaumin.", 'Kami punya lima jam pelajaran setiap hari.'],
    ['الِاسْتِرَاحَةُ بَعْدَ الْحِصَّةِ الثَّالِثَةِ.', "Al-istirahatu ba'dal hishshatits tsalitsati.", 'Istirahat setelah jam pelajaran ketiga.'],
  ]),
  lingkungan: s([
    ['يَقَعُ بَيْتِي فِي شَارِعٍ هَادِئٍ.', "Yaqa'u baiti fi syari'in hadi'in.", 'Rumahku terletak di jalan yang tenang.'],
    ['بِجَانِبِ بَيْتِي حَدِيقَةٌ صَغِيرَةٌ.', 'Bijanibi baiti hadiqatun shaghiratun.', 'Di samping rumahku ada taman kecil.'],
    ['جِيرَانُنَا طَيِّبُونَ.', 'Jiranuna thayyibuna.', 'Tetangga kami baik-baik.'],
  ]),
  restoran: s([
    ['أُرِيدُ قَائِمَةَ الطَّعَامِ مِنْ فَضْلِكَ.', "Uridu qa'imatath tha'ami min fadhlika.", 'Saya minta menunya, tolong.'],
    ['سَآخُذُ الْأَرُزَّ بِالدَّجَاجِ.', "Sa'akhudzul aruzza bid dajaji.", 'Saya pesan nasi dengan ayam.'],
    ['الْحِسَابَ مِنْ فَضْلِكَ.', 'Al-hisaba min fadhlika.', 'Minta tagihannya, tolong.'],
  ]),
  belanja: s([
    ['بِكَمْ هٰذَا الْقَمِيصُ؟', 'Bikam hadzal qamishu?', 'Berapa harga kemeja ini?'],
    ['هَلْ عِنْدَكُمْ لَوْنٌ آخَرُ؟', "Hal 'indakum launun akharu?", 'Apakah kalian punya warna lain?'],
    ['هٰذَا غَالٍ قَلِيلًا، هَلْ فِيهِ تَخْفِيضٌ؟', 'Hadza ghalin qalilan, hal fihi takhfidhun?', 'Ini agak mahal, apakah ada diskon?'],
  ]),
  arahJalan: s([
    ['كَيْفَ أَذْهَبُ إِلَى الْمَحَطَّةِ؟', 'Kaifa adzhabu ilal mahaththati?', 'Bagaimana cara ke stasiun?'],
    ['اِذْهَبْ مُسْتَقِيمًا ثُمَّ دُرْ يَسَارًا.', 'Idzhab mustaqiman tsumma dur yasaran.', 'Jalan lurus, lalu belok kiri.'],
    ['الْمَحَطَّةُ قَرِيبَةٌ مِنَ الصَّيْدَلِيَّةِ.', 'Al-mahaththatu qaribatun minash shaidaliyyati.', 'Stasiun dekat dengan apotek.'],
  ]),
  akhirPekan: s([
    ['مَاذَا سَتَفْعَلُ فِي نِهَايَةِ الْأُسْبُوعِ؟', "Madza sataf'alu fi nihayatil usbu'i?", 'Apa yang akan kamu lakukan di akhir pekan?'],
    ['سَأَزُورُ جَدَّتِي فِي الْقَرْيَةِ.', "Sa'azuru jaddati fil qaryati.", 'Saya akan mengunjungi nenek di desa.'],
    ['رُبَّمَا نَذْهَبُ إِلَى الشَّاطِئِ.', "Rubbama nadzhabu ilasy syathi'i.", 'Mungkin kami pergi ke pantai.'],
  ]),
  kesehatan: s([
    ['أَشْعُرُ بِأَلَمٍ فِي بَطْنِي.', "Asy'uru bi'alamin fi bathni.", 'Saya merasa sakit di perut.'],
    ['ذَهَبْتُ إِلَى الطَّبِيبِ أَمْسِ.', 'Dzahabtu ilath thabibi amsi.', 'Saya pergi ke dokter kemarin.'],
    ['قَالَ الطَّبِيبُ: اِسْتَرِحْ جَيِّدًا.', 'Qalath thabibu: istarih jayyidan.', 'Dokter berkata: istirahatlah dengan baik.'],
  ]),
  hobi: s([
    ['أُحِبُّ كُرَةَ الْقَدَمِ لِأَنَّهَا مُمْتِعَةٌ.', "Uhibbu kuratal qadami li'annaha mumti'atun.", 'Saya suka sepak bola karena menyenangkan.'],
    ['أُمَارِسُ الرِّيَاضَةَ مَرَّتَيْنِ فِي الْأُسْبُوعِ.', "Umarisur riyadhata marrataini fil usbu'i.", 'Saya berolahraga dua kali seminggu.'],
    ['فِي وَقْتِ الْفَرَاغِ أَقْرَأُ الْقِصَصَ.', "Fi waqtil faraghi aqra'ul qishasha.", 'Di waktu luang saya membaca cerita.'],
  ]),
  musim: s([
    ['فِي إِنْدُونِيسِيَا مَوْسِمَانِ: الْمَطَرُ وَالْجَفَافُ.', 'Fi Indunisiya mausimani: al-matharu wal jafafu.', 'Di Indonesia ada dua musim: hujan dan kemarau.'],
    ['الْجَوُّ فِي الشِّتَاءِ بَارِدٌ جِدًّا.', "Al-jawwu fisy syita'i baridun jiddan.", 'Cuaca di musim dingin sangat dingin.'],
    ['دَرَجَةُ الْحَرَارَةِ الْيَوْمَ ثَلَاثُونَ.', 'Darajatul hararatil yauma tsalatsuna.', 'Suhu hari ini tiga puluh derajat.'],
  ]),
  undangan: s([
    ['أَدْعُوكَ إِلَى حَفْلَةِ عِيدِ مِيلَادِي.', "Ad'uka ila haflati 'idi miladi.", 'Saya mengundangmu ke pesta ulang tahunku.'],
    ['مَتَى الْحَفْلَةُ؟', 'Matal haflatu?', 'Kapan acaranya?'],
    ['شُكْرًا عَلَى الدَّعْوَةِ، سَأَحْضُرُ إِنْ شَاءَ اللّٰهُ.', "Syukran 'alad da'wati, sa'ahdhuru in sya'a Allah.", 'Terima kasih atas undangannya, saya akan hadir insya Allah.'],
  ]),
  pengalaman: s([
    ['سَافَرْتُ إِلَى مَكَّةَ فِي السَّنَةِ الْمَاضِيَةِ.', 'Safartu ila Makkata fis sanatil madhiyati.', 'Saya bepergian ke Makkah tahun lalu.'],
    ['رَأَيْتُ الْكَعْبَةَ لِأَوَّلِ مَرَّةٍ.', "Ra'aitul ka'bata li'awwali marratin.", 'Saya melihat Ka\'bah untuk pertama kali.'],
    ['كَانَتْ تَجْرِبَةً مُدْهِشَةً.', 'Kanat tajribatan mudhisyatan.', 'Itu pengalaman yang menakjubkan.'],
  ]),
  masaDepan: s([
    ['أُرِيدُ أَنْ أَدْرُسَ فِي الْقَاهِرَةِ.', 'Uridu an adrusa fil Qahirati.', 'Saya ingin kuliah di Kairo.'],
    ['سَأَجْتَهِدُ لِأُحَقِّقَ حُلْمِي.', "Sa'ajtahidu li'uhaqqiqa hulmi.", 'Saya akan bersungguh-sungguh untuk mewujudkan mimpiku.'],
    ['بَعْدَ التَّخَرُّجِ سَأُصْبِحُ مُدَرِّسًا.', "Ba'dat takharruji sa'ushbihu mudarrisan.", 'Setelah lulus saya akan menjadi guru.'],
  ]),
  deskripsi: s([
    ['صَدِيقِي طَوِيلُ الْقَامَةِ وَنَحِيفٌ.', 'Shadiqi thawilul qamati wa nahifun.', 'Temanku tinggi dan kurus.'],
    ['شَعْرُهَا أَسْوَدُ وَطَوِيلٌ.', "Sya'ruha aswadu wa thawilun.", 'Rambutnya (pr) hitam dan panjang.'],
    ['هُوَ رَجُلٌ كَرِيمٌ وَنَشِيطٌ.', 'Huwa rajulun karimun wa nasyithun.', 'Dia laki-laki yang dermawan dan rajin.'],
  ]),
  tempatUmum: s([
    ['أَشْتَرِي الدَّوَاءَ مِنَ الصَّيْدَلِيَّةِ.', "Asytarid dawa'a minash shaidaliyyati.", 'Saya membeli obat di apotek.'],
    ['أُرْسِلُ الرِّسَالَةَ مِنْ مَكْتَبِ الْبَرِيدِ.', 'Ursilur risalata min maktabil baridi.', 'Saya mengirim surat dari kantor pos.'],
    ['زُرْنَا الْمَتْحَفَ مَعَ الْمُدَرِّسِ.', "Zurnal mathafa ma'al mudarrisi.", 'Kami mengunjungi museum bersama guru.'],
  ]),
  telepon: s([
    ['أَلُو، مَنْ يَتَكَلَّمُ؟', 'Alo, man yatakallamu?', 'Halo, siapa yang berbicara?'],
    ['هَلْ يُمْكِنُ أَنْ أُكَلِّمَ أَحْمَدَ؟', 'Hal yumkinu an ukallima Ahmada?', 'Bisakah saya berbicara dengan Ahmad?'],
    ['سَأَتَّصِلُ بِكَ مَرَّةً أُخْرَى.', "Sa'attashilu bika marratan ukhra.", 'Saya akan menghubungimu lagi.'],
  ]),
  wawancara: s([
    ['مَا اسْمُكَ الْكَامِلُ؟', 'Mas-mukal kamilu?', 'Siapa nama lengkapmu?'],
    ['لِمَاذَا تَتَعَلَّمُ اللُّغَةَ الْعَرَبِيَّةَ؟', "Limadza tata'allamul lughatal 'arabiyyata?", 'Mengapa kamu belajar bahasa Arab?'],
    ['لِأَنِّي أُرِيدُ أَنْ أَفْهَمَ الْقُرْآنَ.', "Li'anni uridu an afhamal Qur'ana.", 'Karena saya ingin memahami Al-Qur\'an.'],
  ]),
  permintaanMaaf: s([
    ['أَعْتَذِرُ عَنِ التَّأَخُّرِ.', "A'tadziru 'anit ta'akhkhuri.", 'Saya mohon maaf atas keterlambatan.'],
    ['لَمْ أَحْضُرْ لِأَنِّي كُنْتُ مَرِيضًا.', "Lam ahdhur li'anni kuntu maridhan.", 'Saya tidak hadir karena sedang sakit.'],
    ['مَعَ خَالِصِ التَّحِيَّاتِ.', "Ma'a khalishit tahiyyati.", 'Dengan salam hormat.'],
  ]),
} satisfies Record<string, ArabicSentence[]>;

export type PemulaSentenceTheme = keyof typeof pemulaSentenceThemes;
export type ElementarySentenceTheme = keyof typeof elementarySentenceThemes;

export function getFoundationSentences(level: FoundationLevel, theme: string): ArabicSentence[] {
  const themes: Record<string, ArabicSentence[]> = level === 'elementary' ? elementarySentenceThemes : pemulaSentenceThemes;
  return themes[theme] ?? [];
}

export function getFoundationLevelSentences(level: FoundationLevel): ArabicSentence[] {
  const themes: Record<string, ArabicSentence[]> = level === 'elementary' ? elementarySentenceThemes : pemulaSentenceThemes;
  return Object.values(themes).flat();
}
