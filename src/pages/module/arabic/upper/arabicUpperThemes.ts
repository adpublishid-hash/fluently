export type ArabicUpperLevel = 'intermediate' | 'upper-intermediate' | 'advanced' | 'proficiency' | 'mastery' | 'scholar';
export type ArabicThemeWord = { arabic: string; transliteration: string; meaning: string };
export type ArabicTheme = { title: string; vocabulary: ArabicThemeWord[] };

type WordTuple = [arabic: string, transliteration: string, meaning: string];
type ThemeTuple = [title: string, words: WordTuple[]];

const toThemes = (themes: ThemeTuple[]): ArabicTheme[] =>
  themes.map(([title, words]) => ({
    title,
    vocabulary: words.map(([arabic, transliteration, meaning]) => ({ arabic, transliteration, meaning })),
  }));

// One vocabulary theme per lesson number (1-20) for B1 and above, shared by
// every skill of that level so the level builds a coherent word bank.
export const arabicUpperThemes: Record<ArabicUpperLevel, ArabicTheme[]> = {
  intermediate: toThemes([
    ['Pendidikan', [['تَعْلِيمٌ', "ta'limun", 'pendidikan'], ['مَنْهَجٌ', 'manhajun', 'kurikulum'], ['شَهَادَةٌ', 'syahadatun', 'ijazah'], ['مُحَاضَرَةٌ', 'muhadharatun', 'kuliah / ceramah']]],
    ['Dunia kerja', [['وَظِيفَةٌ', 'wazhifatun', 'pekerjaan / jabatan'], ['رَاتِبٌ', 'ratibun', 'gaji'], ['خِبْرَةٌ', 'khibratun', 'pengalaman kerja'], ['مُقَابَلَةٌ', 'muqabalatun', 'wawancara']]],
    ['Kesehatan', [['عِيَادَةٌ', "'iyadatun", 'klinik'], ['عِلَاجٌ', "'ilajun", 'pengobatan'], ['وِقَايَةٌ', 'wiqayatun', 'pencegahan'], ['غِذَاءٌ صِحِّيٌّ', "ghidza'un shihhiyyun", 'makanan sehat']]],
    ['Perjalanan', [['سِيَاحَةٌ', 'siyahatun', 'pariwisata'], ['حَجْزٌ', 'hajzun', 'pemesanan'], ['جَوْلَةٌ', 'jaulatun', 'tur / perjalanan keliling'], ['مَعْلَمٌ', "ma'lamun", 'objek wisata terkenal']]],
    ['Teknologi', [['تِقْنِيَةٌ', 'tiqniyyatun', 'teknologi'], ['جِهَازٌ', 'jihazun', 'perangkat'], ['شَبَكَةٌ', 'syabakatun', 'jaringan'], ['بَرْنَامَجٌ', 'barnamajun', 'program / aplikasi']]],
    ['Lingkungan', [['بِيئَةٌ', "bi'atun", 'lingkungan'], ['تَلَوُّثٌ', 'talawwutsun', 'polusi'], ['نَظَافَةٌ', 'nazhafatun', 'kebersihan'], ['إِعَادَةُ التَّدْوِيرِ', "i'adatut tadwir", 'daur ulang']]],
    ['Masyarakat', [['مُجْتَمَعٌ', "mujtama'un", 'masyarakat'], ['جِيرَانٌ', 'jiranun', 'tetangga-tetangga'], ['تَعَاوُنٌ', "ta'awunun", 'kerja sama'], ['عَادَاتٌ', "'adatun", 'adat kebiasaan']]],
    ['Keuangan harian', [['مِيزَانِيَّةٌ', 'mizaniyyatun', 'anggaran'], ['ادِّخَارٌ', 'iddikharun', 'tabungan'], ['أَسْعَارٌ', "as'arun", 'harga-harga'], ['تَخْفِيضَاتٌ', 'takhfidhatun', 'potongan harga']]],
    ['Media', [['أَخْبَارٌ', 'akhbarun', 'berita'], ['صَحِيفَةٌ', 'shahifatun', 'surat kabar'], ['مُذِيعٌ', "mudzi'un", 'penyiar'], ['إِعْلَانٌ', "i'lanun", 'iklan / pengumuman']]],
    ['Olahraga', [['تَمْرِينٌ', 'tamrinun', 'latihan'], ['بُطُولَةٌ', 'buthulatun', 'kejuaraan'], ['فَوْزٌ', 'fauzun', 'kemenangan'], ['هَزِيمَةٌ', 'hazimatun', 'kekalahan']]],
    ['Budaya', [['ثَقَافَةٌ', 'tsaqafatun', 'budaya'], ['تُرَاثٌ', 'turatsun', 'warisan'], ['مِهْرَجَانٌ', 'mihrajanun', 'festival'], ['فُنُونٌ', 'funun', 'seni-seni']]],
    ['Kehidupan kota', [['مُوَاصَلَاتٌ', 'muwashalatun', 'transportasi'], ['زَحْمَةٌ', 'zahmatun', 'kemacetan'], ['حَيٌّ', 'hayyun', 'kampung / kawasan'], ['وَسَطُ الْمَدِينَةِ', 'wasathul madinah', 'pusat kota']]],
    ['Pendapat', [['اقْتِنَاعٌ', "iqtina'un", 'keyakinan'], ['مُوَافَقَةٌ', 'muwafaqatun', 'persetujuan'], ['اعْتِرَاضٌ', "i'tiradhun", 'keberatan'], ['وُجْهَةُ نَظَرٍ', 'wijhatu nazharin', 'sudut pandang']]],
    ['Masalah dan solusi', [['مُشْكِلَةٌ', 'musykilatun', 'masalah'], ['حَلٌّ', 'hallun', 'solusi'], ['سَبَبٌ', 'sababun', 'sebab'], ['نَتِيجَةٌ', 'natijatun', 'hasil / akibat']]],
    ['Rencana dan target', [['هَدَفٌ', 'hadafun', 'tujuan / target'], ['مَوْعِدٌ نِهَائِيٌّ', "mau'idun niha'iyyun", 'tenggat waktu'], ['أَوْلَوِيَّةٌ', 'awlawiyyatun', 'prioritas'], ['تَنْظِيمٌ', 'tanzhimun', 'pengaturan']]],
    ['Layanan publik', [['خِدْمَةٌ', 'khidmatun', 'layanan'], ['طَلَبٌ', 'thalabun', 'permohonan'], ['اسْتِمَارَةٌ', 'istimaratun', 'formulir'], ['مَوْعِدُ الْمُرَاجَعَةِ', "mau'idul muraja'ah", 'jadwal kunjungan layanan']]],
    ['Komunikasi', [['حِوَارٌ', 'hiwarun', 'dialog'], ['نِقَاشٌ', 'niqasyun', 'diskusi'], ['إِقْنَاعٌ', "iqna'un", 'persuasi'], ['تَوَاصُلٌ', 'tawashulun', 'komunikasi']]],
    ['Makanan dan gizi', [['وَجْبَةٌ', 'wajbatun', 'hidangan / waktu makan'], ['طَبْخٌ', 'thabkhun', 'memasak'], ['مُكَوِّنَاتٌ', 'mukawwinatun', 'bahan-bahan'], ['سُعُرَاتٌ حَرَارِيَّةٌ', "su'uratun harariyyatun", 'kalori']]],
    ['Pengalaman hidup', [['ذِكْرَيَاتٌ', 'dzikrayatun', 'kenangan-kenangan'], ['مُغَامَرَةٌ', 'mughamaratun', 'petualangan'], ['تَحَدٍّ', 'tahaddin', 'tantangan'], ['إِنْجَازٌ', 'injazun', 'pencapaian']]],
    ['Review B1', [['مُرَاجَعَةٌ', "muraja'atun", 'pengulangan / review'], ['تَلْخِيصٌ', 'talkhishun', 'ringkasan'], ['تَقْيِيمٌ', 'taqyimun', 'penilaian'], ['تَقَدُّمٌ', 'taqaddumun', 'kemajuan']]],
  ]),
  'upper-intermediate': toThemes([
    ['Globalisasi', [['عَوْلَمَةٌ', "'aulamatun", 'globalisasi'], ['تَبَادُلٌ', 'tabadulun', 'pertukaran'], ['انْفِتَاحٌ', 'infitahun', 'keterbukaan'], ['هُوِيَّةٌ', 'huwiyyatun', 'identitas']]],
    ['Pendidikan tinggi', [['بَحْثٌ عِلْمِيٌّ', "bahtsun 'ilmiyyun", 'penelitian ilmiah'], ['مِنْحَةٌ', 'minhatun', 'beasiswa'], ['تَخَصُّصٌ', 'takhashshushun', 'spesialisasi / jurusan'], ['أُطْرُوحَةٌ', 'uthruhatun', 'disertasi / tesis']]],
    ['Ekonomi', [['اقْتِصَادٌ', 'iqtishadun', 'ekonomi'], ['تَضَخُّمٌ', 'tadhakhkhumun', 'inflasi'], ['بَطَالَةٌ', 'bathalatun', 'pengangguran'], ['اسْتِثْمَارٌ', 'istitsmarun', 'investasi']]],
    ['Media sosial', [['وَسَائِلُ التَّوَاصُلِ', "wasa'ilut tawashul", 'media sosial'], ['مُتَابِعٌ', "mutabi'un", 'pengikut'], ['مُحْتَوًى', 'muhtawan', 'konten'], ['شَائِعَةٌ', "sya'i'atun", 'rumor']]],
    ['Perubahan iklim', [['تَغَيُّرُ الْمُنَاخِ', 'taghayyurul munakh', 'perubahan iklim'], ['طَاقَةٌ مُتَجَدِّدَةٌ', 'thaqatun mutajaddidatun', 'energi terbarukan'], ['احْتِبَاسٌ حَرَارِيٌّ', 'ihtibasun harariyyun', 'pemanasan global'], ['تَصَحُّرٌ', 'tashahhurun', 'penggurunan']]],
    ['Kesehatan masyarakat', [['وَبَاءٌ', "waba'un", 'wabah'], ['لِقَاحٌ', 'liqahun', 'vaksin'], ['تَوْعِيَةٌ', "tau'iyatun", 'penyuluhan'], ['رِعَايَةٌ صِحِّيَّةٌ', "ri'ayatun shihhiyyatun", 'layanan kesehatan']]],
    ['Hak dan kewajiban', [['حُقُوقٌ', 'huququn', 'hak-hak'], ['وَاجِبَاتٌ', 'wajibatun', 'kewajiban-kewajiban'], ['مُوَاطَنَةٌ', 'muwathanatun', 'kewarganegaraan'], ['مَسْؤُولِيَّةٌ', "mas'uliyyatun", 'tanggung jawab']]],
    ['Teknologi masa depan', [['ذَكَاءٌ اصْطِنَاعِيٌّ', "dzaka'un ishthina'iyyun", 'kecerdasan buatan'], ['أَتْمَتَةٌ', 'atmatatun', 'otomatisasi'], ['بَيَانَاتٌ', 'bayanatun', 'data'], ['ابْتِكَارٌ', 'ibtikarun', 'inovasi']]],
    ['Dunia kerja modern', [['رِيَادَةُ الْأَعْمَالِ', "riyadatul a'mal", 'kewirausahaan'], ['عَمَلٌ عَنْ بُعْدٍ', "'amalun 'an bu'din", 'kerja jarak jauh'], ['إِنْتَاجِيَّةٌ', 'intajiyyatun', 'produktivitas'], ['كَفَاءَةٌ', "kafa'atun", 'kompetensi']]],
    ['Urbanisasi', [['تَحَضُّرٌ', 'tahadhdhurun', 'urbanisasi'], ['هِجْرَةٌ', 'hijratun', 'migrasi'], ['سَكَنٌ', 'sakanun', 'perumahan'], ['بِنْيَةٌ تَحْتِيَّةٌ', 'binyatun tahtiyyatun', 'infrastruktur']]],
    ['Keluarga modern', [['تَرْبِيَةٌ', 'tarbiyatun', 'pengasuhan / pendidikan'], ['جِيلٌ', 'jilun', 'generasi'], ['تَوَازُنٌ', 'tawazunun', 'keseimbangan'], ['اسْتِقْلَالِيَّةٌ', 'istiqlaliyyatun', 'kemandirian']]],
    ['Wisata budaya', [['آثَارٌ', 'atsarun', 'peninggalan purbakala'], ['حَضَارَةٌ', 'hadharatun', 'peradaban'], ['ضِيَافَةٌ', 'dhiyafatun', 'keramahan menjamu tamu'], ['مَتَاحِفُ', 'matahifu', 'museum-museum']]],
    ['Bahasa dan identitas', [['لَهْجَةٌ', 'lahjatun', 'dialek'], ['الْفُصْحَى', 'al-fush-ha', 'bahasa Arab baku'], ['تَرْجَمَةٌ', 'tarjamatun', 'terjemahan'], ['ثُنَائِيَّةٌ لُغَوِيَّةٌ', "tsuna'iyyatun lughawiyyatun", 'bilingualisme']]],
    ['Argumentasi', [['حُجَّةٌ', 'hujjatun', 'argumen'], ['دَلِيلٌ', 'dalilun', 'bukti'], ['اسْتِنْتَاجٌ', 'istintajun', 'kesimpulan'], ['تَنَاقُضٌ', 'tanaqudhun', 'kontradiksi']]],
    ['Kesehatan mental', [['قَلَقٌ', 'qalaqun', 'kecemasan'], ['ضَغْطٌ نَفْسِيٌّ', 'dhaghthun nafsiyyun', 'tekanan psikologis'], ['دَعْمٌ', "da'mun", 'dukungan'], ['طُمَأْنِينَةٌ', "thuma'ninatun", 'ketenangan batin']]],
    ['Konsumsi', [['اسْتِهْلَاكٌ', 'istihlakun', 'konsumsi'], ['إِسْرَافٌ', 'israfun', 'pemborosan'], ['جَوْدَةٌ', 'jaudatun', 'kualitas'], ['مُسْتَهْلِكٌ', 'mustahlikun', 'konsumen']]],
    ['Transportasi', [['ازْدِحَامٌ', 'izdihamun', 'kepadatan'], ['النَّقْلُ الْعَامُّ', "an-naqlul 'amm", 'transportasi umum'], ['سَلَامَةٌ', 'salamatun', 'keselamatan'], ['وَقُودٌ', 'waqudun', 'bahan bakar']]],
    ['Kerelawanan', [['تَطَوُّعٌ', "tathawwu'un", 'kerelawanan'], ['جَمْعِيَّةٌ خَيْرِيَّةٌ', "jam'iyyatun khairiyyatun", 'lembaga amal'], ['تَبَرُّعٌ', "tabarru'un", 'donasi'], ['تَكَافُلٌ', 'takafulun', 'solidaritas sosial']]],
    ['Sains populer', [['اكْتِشَافٌ', 'iktisyafun', 'penemuan'], ['تَجْرِبَةٌ', 'tajribatun', 'eksperimen'], ['فَرْضِيَّةٌ', 'fardhiyyatun', 'hipotesis'], ['نَظَرِيَّةٌ', 'nazhariyyatun', 'teori']]],
    ['Review B2', [['عَرْضٌ تَقْدِيمِيٌّ', "'ardhun taqdimiyyun", 'presentasi'], ['مُنَاظَرَةٌ', 'munazharatun', 'debat'], ['تَحْلِيلٌ', 'tahlilun', 'analisis'], ['خُلَاصَةٌ', 'khulashatun', 'intisari']]],
  ]),
  advanced: toThemes([
    ['Kebijakan publik', [['سِيَاسَةٌ عَامَّةٌ', "siyasatun 'ammatun", 'kebijakan publik'], ['تَشْرِيعٌ', "tasyri'un", 'legislasi'], ['حَوْكَمَةٌ', 'hawkamatun', 'tata kelola'], ['مُسَاءَلَةٌ', "musa'alatun", 'akuntabilitas']]],
    ['Ekonomi global', [['تِجَارَةٌ دَوْلِيَّةٌ', 'tijaratun dauliyyatun', 'perdagangan internasional'], ['رُكُودٌ', 'rukudun', 'resesi'], ['نُمُوٌّ', 'numuwwun', 'pertumbuhan'], ['عَجْزٌ', "'ajzun", 'defisit']]],
    ['Wacana media', [['خِطَابٌ', 'khithabun', 'wacana'], ['رَأْيٌ عَامٌّ', "ra'yun 'ammun", 'opini publik'], ['تَحَيُّزٌ', 'tahayyuzun', 'bias'], ['مِصْدَاقِيَّةٌ', 'mishdaqiyyatun', 'kredibilitas']]],
    ['Etika teknologi', [['خُصُوصِيَّةٌ', 'khushushiyyatun', 'privasi'], ['أَخْلَاقِيَّاتٌ', 'akhlaqiyyatun', 'etika'], ['رَقَابَةٌ', 'raqabatun', 'pengawasan'], ['أَمْنٌ سِيبْرَانِيٌّ', 'amnun sibraniyyun', 'keamanan siber']]],
    ['Pembangunan berkelanjutan', [['تَنْمِيَةٌ مُسْتَدَامَةٌ', 'tanmiyatun mustadamatun', 'pembangunan berkelanjutan'], ['مَوَارِدُ', 'mawaridu', 'sumber daya'], ['تَوَازُنٌ بِيئِيٌّ', "tawazunun bi'iyyun", 'keseimbangan ekologis'], ['أَجْيَالٌ قَادِمَةٌ', 'ajyalun qadimatun', 'generasi mendatang']]],
    ['Reformasi pendidikan', [['إِصْلَاحٌ', 'ishlahun', 'reformasi'], ['جَوْدَةُ التَّعْلِيمِ', "jaudatut ta'lim", 'mutu pendidikan'], ['تَكَافُؤُ الْفُرَصِ', "takafu'ul furash", 'kesetaraan kesempatan'], ['تَقْوِيمٌ', 'taqwimun', 'evaluasi']]],
    ['Diplomasi', [['دِبْلُومَاسِيَّةٌ', 'diblumasiyyatun', 'diplomasi'], ['مُفَاوَضَاتٌ', 'mufawadhatun', 'perundingan'], ['اتِّفَاقِيَّةٌ', 'ittifaqiyyatun', 'perjanjian'], ['وَسَاطَةٌ', 'wasathatun', 'mediasi']]],
    ['Hukum', [['قَانُونٌ', 'qanunun', 'undang-undang'], ['قَضَاءٌ', "qadha'un", 'peradilan'], ['عَدَالَةٌ', "'adalatun", 'keadilan'], ['دُسْتُورٌ', 'dusturun', 'konstitusi']]],
    ['Metodologi riset', [['مَنْهَجِيَّةٌ', 'manhajiyyatun', 'metodologi'], ['عَيِّنَةٌ', "'ayyinatun", 'sampel'], ['مُتَغَيِّرٌ', 'mutaghayyirun', 'variabel'], ['مَوْثُوقِيَّةٌ', 'mautsuqiyyatun', 'reliabilitas']]],
    ['Demografi', [['سُكَّانٌ', 'sukkanun', 'penduduk'], ['شَيْخُوخَةٌ', 'syaikhukhatun', 'penuaan'], ['خُصُوبَةٌ', 'khushubatun', 'fertilitas'], ['كَثَافَةٌ سُكَّانِيَّةٌ', 'katsafatun sukkaniyyatun', 'kepadatan penduduk']]],
    ['Sastra dan seni', [['أَدَبٌ', 'adabun', 'sastra'], ['نَقْدٌ', 'naqdun', 'kritik'], ['إِبْدَاعٌ', "ibda'un", 'kreativitas'], ['جَمَالِيَّاتٌ', 'jamaliyyatun', 'estetika']]],
    ['Ketahanan pangan', [['أَمْنٌ غِذَائِيٌّ', "amnun ghidza'iyyun", 'ketahanan pangan'], ['زِرَاعَةٌ', "zira'atun", 'pertanian'], ['إِمْدَادَاتٌ', 'imdadatun', 'pasokan'], ['نُدْرَةٌ', 'nudratun', 'kelangkaan']]],
    ['Energi', [['نِفْطٌ', 'nifthun', 'minyak bumi'], ['طَاقَةٌ شَمْسِيَّةٌ', 'thaqatun syamsiyyatun', 'energi surya'], ['اسْتِهْلَاكُ الطَّاقَةِ', 'istihlakuth thaqah', 'konsumsi energi'], ['انْبِعَاثَاتٌ', "inbi'atsatun", 'emisi']]],
    ['Hak asasi manusia', [['حُقُوقُ الْإِنْسَانِ', 'huququl insan', 'hak asasi manusia'], ['حُرِّيَّةُ التَّعْبِيرِ', "hurriyyatut ta'bir", 'kebebasan berekspresi'], ['مُسَاوَاةٌ', 'musawatun', 'kesetaraan'], ['تَمْيِيزٌ', 'tamyizun', 'diskriminasi']]],
    ['Ekonomi digital', [['اقْتِصَادٌ رَقْمِيٌّ', 'iqtishadun raqmiyyun', 'ekonomi digital'], ['تِجَارَةٌ إِلِكْتُرُونِيَّةٌ', 'tijaratun iliktruniyyatun', 'perdagangan elektronik'], ['مِنَصَّةٌ', 'minashshatun', 'platform'], ['دَفْعٌ إِلِكْتُرُونِيٌّ', "daf'un iliktruniyyun", 'pembayaran elektronik']]],
    ['Kesehatan global', [['جَائِحَةٌ', "ja'ihatun", 'pandemi'], ['نِظَامٌ صِحِّيٌّ', 'nizhamun shihhiyyun', 'sistem kesehatan'], ['تَأْمِينٌ صِحِّيٌّ', "ta'minun shihhiyyun", 'asuransi kesehatan'], ['مَنَاعَةٌ', "mana'atun", 'imunitas']]],
    ['Migrasi', [['لُجُوءٌ', "luju'un", 'suaka / pengungsian'], ['مُهَاجِرٌ', 'muhajirun', 'migran'], ['انْدِمَاجٌ', 'indimajun', 'integrasi'], ['حُدُودٌ', 'hududun', 'perbatasan']]],
    ['Retorika', [['بَلَاغَةٌ', 'balaghatun', 'retorika'], ['إِيجَازٌ', 'ijazun', 'keringkasan'], ['إِطْنَابٌ', 'ithnabun', 'elaborasi'], ['أُسْلُوبٌ', 'uslubun', 'gaya bahasa']]],
    ['Kepemimpinan', [['قِيَادَةٌ', 'qiyadatun', 'kepemimpinan'], ['رُؤْيَةٌ', "ru'yatun", 'visi'], ['صُنْعُ الْقَرَارِ', "shun'ul qarar", 'pengambilan keputusan'], ['تَفْوِيضٌ', 'tafwidhun', 'delegasi wewenang']]],
    ['Review C1', [['مُلَخَّصٌ', 'mulakhkhashun', 'ringkasan'], ['تَوْصِيَةٌ', 'taushiyatun', 'rekomendasi'], ['مَرَاجِعُ', "maraji'u", 'referensi'], ['خَاتِمَةٌ', 'khatimatun', 'penutup']]],
  ]),
  proficiency: toThemes([
    ['Epistemologi', [['مَعْرِفَةٌ', "ma'rifatun", 'pengetahuan'], ['يَقِينٌ', 'yaqinun', 'kepastian'], ['شَكٌّ مَنْهَجِيٌّ', 'syakkun manhajiyyun', 'keraguan metodis'], ['بُرْهَانٌ', 'burhanun', 'bukti demonstratif']]],
    ['Filsafat bahasa', [['دَلَالَةٌ', 'dalalatun', 'makna / signifikasi'], ['سِيَاقٌ', 'siyaqun', 'konteks'], ['تَأْوِيلٌ', "ta'wilun", 'interpretasi'], ['مَجَازٌ', 'majazun', 'makna kiasan']]],
    ['Struktur sosial', [['بِنْيَةٌ اجْتِمَاعِيَّةٌ', "binyatun ijtima'iyyatun", 'struktur sosial'], ['طَبَقَةٌ', 'thabaqatun', 'kelas sosial'], ['حَرَاكٌ اجْتِمَاعِيٌّ', "harakun ijtima'iyyun", 'mobilitas sosial'], ['تَمَاسُكٌ', 'tamasukun', 'kohesi']]],
    ['Kritik sastra', [['سَرْدٌ', 'sardun', 'narasi'], ['رَمْزِيَّةٌ', 'ramziyyatun', 'simbolisme'], ['تَنَاصٌّ', 'tanashshun', 'intertekstualitas'], ['شِعْرِيَّةٌ', "syi'riyyatun", 'poetika']]],
    ['Pemikiran politik', [['شَرْعِيَّةٌ', "syar'iyyatun", 'legitimasi'], ['تَعَدُّدِيَّةٌ', "ta'addudiyyatun", 'pluralisme'], ['عَقْدٌ اجْتِمَاعِيٌّ', "'aqdun ijtima'iyyun", 'kontrak sosial'], ['سُلْطَةٌ', 'sulthatun', 'kekuasaan']]],
    ['Etika terapan', [['ضَمِيرٌ', 'dhamirun', 'hati nurani'], ['كَرَامَةٌ', 'karamatun', 'martabat'], ['مَصْلَحَةٌ', 'mashlahatun', 'kemaslahatan'], ['مُعْضِلَةٌ أَخْلَاقِيَّةٌ', "mu'dhilatun akhlaqiyyatun", 'dilema moral']]],
    ['Ekonomi politik', [['رَأْسُ الْمَالِ', "ra'sul mal", 'modal'], ['احْتِكَارٌ', 'ihtikarun', 'monopoli'], ['عَدَالَةٌ اجْتِمَاعِيَّةٌ', "'adalatun ijtima'iyyatun", 'keadilan sosial'], ['تَوْزِيعُ الثَّرْوَةِ', "tauzi'uts tsarwah", 'distribusi kekayaan']]],
    ['Historiografi', [['تَأْرِيخٌ', "ta'rikhun", 'historiografi'], ['رِوَايَةٌ تَارِيخِيَّةٌ', 'riwayatun tarikhiyyatun', 'narasi sejarah'], ['مَصْدَرٌ أَوَّلِيٌّ', 'mashdarun awwaliyyun', 'sumber primer'], ['حِقْبَةٌ', 'hiqbatun', 'era']]],
    ['Hermeneutika teks', [['نَصٌّ', 'nashshun', 'teks'], ['قِرَاءَةٌ نَقْدِيَّةٌ', "qira'atun naqdiyyatun", 'pembacaan kritis'], ['مَقَاصِدُ', 'maqashidu', 'tujuan-tujuan'], ['سِيَاقٌ تَارِيخِيٌّ', 'siyaqun tarikhiyyun', 'konteks historis']]],
    ['Sains dan etika', [['هَنْدَسَةٌ وِرَاثِيَّةٌ', 'handasatun wiratsiyyatun', 'rekayasa genetika'], ['أَخْلَاقِيَّاتُ الْبَحْثِ', 'akhlaqiyyatul bahts', 'etika penelitian'], ['مَسْؤُولِيَّةٌ عِلْمِيَّةٌ', "mas'uliyyatun 'ilmiyyatun", 'tanggung jawab ilmiah'], ['مُوَافَقَةٌ مُسْتَنِيرَةٌ', 'muwafaqatun mustaniratun', 'persetujuan berbasis informasi']]],
    ['Globalisasi budaya', [['هَيْمَنَةٌ', 'haimanatun', 'hegemoni'], ['تَهْجِينٌ', 'tahjinun', 'hibriditas'], ['خُصُوصِيَّةٌ ثَقَافِيَّةٌ', 'khushushiyyatun tsaqafiyyatun', 'kekhasan budaya'], ['مَرْكَزِيَّةٌ', 'markaziyyatun', 'sentrisme']]],
    ['Integritas tata kelola', [['فَسَادٌ', 'fasadun', 'korupsi'], ['شَفَافِيَّةٌ', 'syafafiyyatun', 'transparansi'], ['نَزَاهَةٌ', 'nazahatun', 'integritas'], ['رَقَابَةٌ مُسْتَقِلَّةٌ', 'raqabatun mustaqillatun', 'pengawasan independen']]],
    ['Bahasa dan masyarakat', [['ازْدِوَاجِيَّةٌ لُغَوِيَّةٌ', 'izdiwajiyyatun lughawiyyatun', 'diglosia'], ['تَعْرِيبٌ', "ta'ribun", 'arabisasi'], ['اقْتِرَاضٌ لُغَوِيٌّ', 'iqtiradhun lughawiyyun', 'peminjaman kata'], ['سِيَاسَةٌ لُغَوِيَّةٌ', 'siyasatun lughawiyyatun', 'kebijakan bahasa']]],
    ['Media dan kekuasaan', [['تَضْلِيلٌ', 'tadhlilun', 'disinformasi'], ['صِنَاعَةُ الرَّأْيِ', "shina'atur ra'yi", 'rekayasa opini'], ['اسْتِقْطَابٌ', 'istiqthabun', 'polarisasi'], ['حِيَادٌ', 'hiyadun', 'netralitas']]],
    ['Pembangunan manusia', [['تَمْكِينٌ', 'tamkinun', 'pemberdayaan'], ['رَأْسُ مَالٍ بَشَرِيٌّ', "ra'su malin basyariyyun", 'modal manusia'], ['هَشَاشَةٌ', 'hasyasyatun', 'kerentanan'], ['مُؤَشِّرٌ', "mu'asysyirun", 'indikator']]],
    ['Peradaban Islam', [['حَضَارَةٌ إِسْلَامِيَّةٌ', 'hadharatun islamiyyatun', 'peradaban Islam'], ['بَيْتُ الْحِكْمَةِ', 'baitul hikmah', 'Baitul Hikmah'], ['تَرْجَمَةٌ عِلْمِيَّةٌ', "tarjamatun 'ilmiyyatun", 'penerjemahan ilmiah'], ['نَهْضَةٌ', 'nahdhatun', 'kebangkitan']]],
    ['Logika argumen', [['مُقَدِّمَةٌ مَنْطِقِيَّةٌ', 'muqaddimatun manthiqiyyatun', 'premis'], ['اسْتِدْلَالٌ', 'istidlalun', 'penalaran'], ['مُغَالَطَةٌ', 'mughalathatun', 'kekeliruan logika'], ['نَتِيجَةٌ لَازِمَةٌ', 'natijatun lazimatun', 'konklusi niscaya']]],
    ['Kota dan ruang', [['عُمْرَانٌ', "'umranun", 'urbanisme / peradaban kota'], ['تَخْطِيطٌ', 'takhthithun', 'perencanaan'], ['فَضَاءٌ عَامٌّ', "fadha'un 'ammun", 'ruang publik'], ['تَهْمِيشٌ', 'tahmisyun', 'marginalisasi']]],
    ['Masa depan kerja', [['تَحَوُّلٌ رَقْمِيٌّ', 'tahawwulun raqmiyyun', 'transformasi digital'], ['مَهَارَاتٌ مُسْتَقْبَلِيَّةٌ', 'maharatun mustaqbaliyyatun', 'keterampilan masa depan'], ['تَعَلُّمٌ مُسْتَمِرٌّ', "ta'allumun mustamirrun", 'belajar berkelanjutan'], ['مُرُونَةٌ', 'murunatun', 'fleksibilitas']]],
    ['Review C2', [['أُطْرُوحَةٌ', 'uthruhatun', 'tesis'], ['نَقْدٌ ذَاتِيٌّ', 'naqdun dzatiyyun', 'kritik diri'], ['تَرْكِيبٌ', 'tarkibun', 'sintesis'], ['أَصَالَةٌ', 'ashalatun', 'orisinalitas']]],
  ]),
  mastery: toThemes([
    ['Balaghah: bayan', [['تَشْبِيهٌ', 'tasybihun', 'perumpamaan'], ['اسْتِعَارَةٌ', "isti'aratun", 'metafora'], ['كِنَايَةٌ', 'kinayatun', 'kiasan tidak langsung'], ['بَدِيعٌ', "badi'un", 'ornamen retoris']]],
    ["Ilmu ma'ani", [['خَبَرٌ وَإِنْشَاءٌ', "khabarun wa insya'un", 'kalimat berita dan performatif'], ['تَقْدِيمٌ وَتَأْخِيرٌ', "taqdimun wa ta'khirun", 'mendahulukan dan mengakhirkan'], ['حَذْفٌ', 'hadzfun', 'elipsis'], ['قَصْرٌ', 'qashrun', 'pembatasan (restriksi)']]],
    ['Teks turats', [['مَخْطُوطٌ', 'makhthuthun', 'manuskrip'], ['شَرْحٌ', 'syarhun', 'syarah / komentar'], ['حَاشِيَةٌ', 'hasyiyatun', 'catatan pinggir'], ['مَتْنٌ', 'matnun', 'teks inti']]],
    ['Metodologi klasik', [['اجْتِهَادٌ', 'ijtihadun', 'ijtihad'], ['قِيَاسٌ', 'qiyasun', 'analogi'], ['اسْتِقْرَاءٌ', "istiqra'un", 'induksi'], ['مَنْهَجٌ نَقْدِيٌّ', 'manhajun naqdiyyun', 'metode kritis']]],
    ['Debat ahli', [['مُنَاظَرَةٌ', 'munazharatun', 'debat'], ['رَدٌّ', 'raddun', 'bantahan'], ['حُجَّةٌ دَامِغَةٌ', 'hujjatun damighatun', 'argumen telak'], ['تَسْلِيمٌ جَدَلِيٌّ', 'taslimun jadaliyyun', 'konsesi dialektis']]],
    ['Media akademik', [['مَجَلَّةٌ مُحَكَّمَةٌ', 'majallatun muhakkamatun', 'jurnal bertelaah sejawat'], ['افْتِتَاحِيَّةٌ', 'iftitahiyyatun', 'tajuk / editorial'], ['مُرَاجَعَةُ كِتَابٍ', "muraja'atu kitabin", 'resensi buku'], ['مُؤْتَمَرٌ', "mu'tamarun", 'konferensi']]],
    ['Penerjemahan', [['تَرْجَمَةٌ حَرْفِيَّةٌ', 'tarjamatun harfiyyatun', 'terjemahan harfiah'], ['تَرْجَمَةٌ دَلَالِيَّةٌ', 'tarjamatun dalaliyyatun', 'terjemahan makna'], ['تَكَافُؤٌ', "takafu'un", 'ekuivalensi'], ['مُصْطَلَحٌ', 'mushthalahun', 'istilah teknis']]],
    ['Sastra klasik', [['مُعَلَّقَاتٌ', "mu'allaqatun", "Mu'allaqat"], ['قَصِيدَةٌ', 'qashidatun', 'kasidah / puisi'], ['وَزْنٌ', 'waznun', 'metrum'], ['قَافِيَةٌ', 'qafiyatun', 'rima']]],
    ['Sastra modern', [['رِوَايَةٌ', 'riwayatun', 'novel'], ['قِصَّةٌ قَصِيرَةٌ', 'qishshatun qashiratun', 'cerita pendek'], ['شِعْرٌ حُرٌّ', "syi'run hurrun", 'puisi bebas'], ['وَاقِعِيَّةٌ', "waqi'iyyatun", 'realisme']]],
    ['Seni berpidato', [['خَطَابَةٌ', 'khathabatun', 'seni berpidato'], ['جُمْهُورٌ', 'jumhurun', 'audiens'], ['تَأْثِيرٌ', "ta'tsirun", 'pengaruh'], ['إِلْقَاءٌ', "ilqa'un", 'penyampaian']]],
    ['Fikih kontemporer', [['نَوَازِلُ', 'nawazilu', 'kasus-kasus baru'], ['فَتْوَى', 'fatwa', 'fatwa'], ['مَقَاصِدُ الشَّرِيعَةِ', "maqashidusy syari'ah", 'tujuan-tujuan syariah'], ['تَرْجِيحٌ', 'tarjihun', 'pentarjihan pendapat']]],
    ['Kajian kawasan', [['الشَّرْقُ الْأَوْسَطُ', 'asy-syarqul ausath', 'Timur Tengah'], ['جُغْرَافِيَا سِيَاسِيَّةٌ', 'jughrafiya siyasiyyatun', 'geopolitik'], ['اسْتِقْرَارٌ', 'istiqrarun', 'stabilitas'], ['نِزَاعٌ', "niza'un", 'konflik']]],
    ['Ekonomi Islam', [['مُضَارَبَةٌ', 'mudharabatun', 'mudarabah'], ['رِبًا', 'riban', 'riba'], ['زَكَاةٌ', 'zakatun', 'zakat'], ['وَقْفٌ', 'waqfun', 'wakaf']]],
    ['Filsafat Islam', [['فَلْسَفَةٌ', 'falsafatun', 'filsafat'], ['عَقْلٌ', "'aqlun", 'akal'], ['وُجُودٌ', 'wujudun', 'eksistensi'], ['عِلِّيَّةٌ', "'illiyyatun", 'kausalitas']]],
    ['Keluarga dan peran', [['أُسْرَةٌ نَوَوِيَّةٌ', 'usratun nawawiyyatun', 'keluarga inti'], ['أَدْوَارٌ', 'adwarun', 'peran-peran'], ['شَرَاكَةٌ', 'syarakatun', 'kemitraan'], ['حَضَانَةٌ', 'hadhanatun', 'hak asuh']]],
    ['Jurnalistik', [['تَحْقِيقٌ صَحَفِيٌّ', 'tahqiqun shahafiyyun', 'liputan investigasi'], ['مَصَادِرُ', 'mashadiru', 'sumber-sumber'], ['تَحْرِيرٌ', 'tahrirun', 'penyuntingan'], ['عُنْوَانٌ رَئِيسِيٌّ', "'unwanun ra'isiyyun", 'judul utama']]],
    ['Dialog antaragama', [['حِوَارُ الْأَدْيَانِ', 'hiwarul adyan', 'dialog antaragama'], ['تَسَامُحٌ', 'tasamuhun', 'toleransi'], ['تَعَايُشٌ', "ta'ayusyun", 'koeksistensi'], ['احْتِرَامٌ مُتَبَادَلٌ', 'ihtiramun mutabadalun', 'saling menghormati']]],
    ['Pedagogi bahasa Arab', [['نَاطِقٌ بِغَيْرِهَا', 'nathiqun bighairiha', 'penutur non-Arab'], ['كِفَايَةٌ لُغَوِيَّةٌ', 'kifayatun lughawiyyatun', 'kompetensi bahasa'], ['مَهَارَاتٌ', 'maharatun', 'keterampilan'], ['تَقْوِيمٌ لُغَوِيٌّ', 'taqwimun lughawiyyun', 'asesmen bahasa']]],
    ['Penulisan profesional', [['مُرَاسَلَةٌ رَسْمِيَّةٌ', 'murasalatun rasmiyyatun', 'korespondensi resmi'], ['تَقْرِيرٌ', 'taqrirun', 'laporan'], ['مُذَكِّرَةٌ', 'mudzakkiratun', 'memo'], ['صِيَاغَةٌ', 'shiyaghatun', 'perumusan']]],
    ['Portofolio mastery', [['إِتْقَانٌ', 'itqanun', 'penguasaan sempurna'], ['عُمْقٌ', "'umqun", 'kedalaman'], ['دِقَّةٌ', 'diqqatun', 'ketelitian'], ['سَلَاسَةٌ', 'salasatun', 'kelancaran']]],
  ]),
  scholar: toThemes([
    ['Problem riset', [['إِشْكَالِيَّةٌ', 'isykaliyyatun', 'problematika'], ['سُؤَالُ الْبَحْثِ', "su'alul bahts", 'pertanyaan penelitian'], ['فَرْضِيَّةُ الْبَحْثِ', 'fardhiyyatul bahts', 'hipotesis penelitian'], ['أَهْدَافُ الْبَحْثِ', 'ahdaful bahts', 'tujuan penelitian']]],
    ['Tinjauan pustaka', [['الدِّرَاسَاتُ السَّابِقَةُ', 'ad-dirasatus sabiqah', 'studi terdahulu'], ['فَجْوَةٌ بَحْثِيَّةٌ', 'fajwatun bahtsiyyatun', 'celah penelitian'], ['إِطَارٌ نَظَرِيٌّ', 'itharun nazhariyyun', 'kerangka teori'], ['مَرْجِعٌ', "marji'un", 'rujukan']]],
    ['Tahqiq manuskrip', [['تَحْقِيقٌ', 'tahqiqun', 'edisi kritis (tahqiq)'], ['نُسْخَةٌ', 'nuskhatun', 'salinan naskah'], ['مُقَابَلَةُ النُّسَخِ', 'muqabalatun nusakh', 'kolasi naskah'], ['تَصْحِيفٌ', 'tashhifun', 'kesalahan salin']]],
    ['Kritik sumber', [['نَقْدُ الْمَصَادِرِ', 'naqdul mashadir', 'kritik sumber'], ['مَوْثُوقِيَّةُ الْمَصْدَرِ', 'mautsuqiyyatul mashdar', 'keterpercayaan sumber'], ['سَنَدٌ', 'sanadun', 'rantai periwayatan'], ['تَوْثِيقٌ', 'tautsiqun', 'verifikasi / dokumentasi']]],
    ['Metode kualitatif', [['مُقَابَلَةٌ مُعَمَّقَةٌ', "muqabalatun mu'ammaqatun", 'wawancara mendalam'], ['مُلَاحَظَةٌ', 'mulahazhatun', 'observasi'], ['تَحْلِيلُ الْمَضْمُونِ', 'tahlilul madhmun', 'analisis isi'], ['دِرَاسَةُ حَالَةٍ', 'dirasatu halatin', 'studi kasus']]],
    ['Metode kuantitatif', [['اسْتِبَانَةٌ', 'istibanatun', 'kuesioner'], ['إِحْصَاءٌ', "ihsha'un", 'statistik'], ['مُتَوَسِّطٌ', 'mutawassithun', 'rata-rata'], ['ارْتِبَاطٌ', 'irtibathun', 'korelasi']]],
    ['Etika penelitian', [['أَمَانَةٌ عِلْمِيَّةٌ', "amanatun 'ilmiyyatun", 'kejujuran ilmiah'], ['انْتِحَالٌ', 'intihalun', 'plagiarisme'], ['سِرِّيَّةٌ', 'sirriyyatun', 'kerahasiaan'], ['إِذْنٌ مُسْبَقٌ', 'idznun musbaqun', 'izin sebelumnya']]],
    ['Penulisan makalah', [['مُسْتَخْلَصٌ', 'mustakhlashun', 'abstrak'], ['تَمْهِيدٌ', 'tamhidun', 'pendahuluan'], ['مَبْحَثٌ', 'mabhatsun', 'subbab'], ['هَامِشٌ', 'hamisyun', 'catatan kaki']]],
    ['Sitasi dan rujukan', [['اقْتِبَاسٌ', 'iqtibasun', 'kutipan'], ['تَوْثِيقُ الْمَرَاجِعِ', "tautsiqul maraji'", 'penulisan referensi'], ['قَائِمَةُ الْمَصَادِرِ', "qa'imatul mashadir", 'daftar pustaka'], ['إِحَالَةٌ', 'ihalatun', 'rujukan silang']]],
    ['Seminar akademik', [['نَدْوَةٌ', 'nadwatun', 'seminar'], ['وَرَقَةٌ بَحْثِيَّةٌ', 'waraqatun bahtsiyyatun', 'makalah penelitian'], ['مُعَقِّبٌ', "mu'aqqibun", 'penanggap'], ['نِقَاشٌ مَفْتُوحٌ', 'niqasyun maftuhun', 'diskusi terbuka']]],
    ['Analisis wacana', [['تَحْلِيلُ الْخِطَابِ', 'tahlilul khithab', 'analisis wacana'], ['بِنْيَةُ النَّصِّ', 'binyatun nashsh', 'struktur teks'], ['تَمَاسُكٌ نَصِّيٌّ', 'tamasukun nashshiyyun', 'kohesi teks'], ['انْسِجَامٌ', 'insijamun', 'koherensi']]],
    ['Linguistik korpus', [['مُدَوَّنَةٌ لُغَوِيَّةٌ', 'mudawwanatun lughawiyyatun', 'korpus bahasa'], ['تَوَاتُرٌ', 'tawaturun', 'frekuensi kemunculan'], ['تَلَازُمٌ لَفْظِيٌّ', 'talazumun lafzhiyyun', 'kolokasi'], ['وَسْمٌ', 'wasmun', 'penandaan (tagging)']]],
    ['Kajian turats lanjutan', [['فَهْرَسَةٌ', 'fahrasatun', 'katalogisasi'], ['تَرَاجِمُ', 'tarajimu', 'biografi tokoh'], ['طَبَقَاتٌ', 'thabaqatun', 'lapisan generasi ulama'], ['إِسْنَادٌ', 'isnadun', 'penyandaran sanad']]],
    ['Teori sastra', [['بِنْيَوِيَّةٌ', 'binyawiyyatun', 'strukturalisme'], ['تَفْكِيكِيَّةٌ', 'tafkikiyyatun', 'dekonstruksi'], ['نَظَرِيَّةُ التَّلَقِّي', 'nazhariyyatut talaqqi', 'teori resepsi'], ['سِيمْيَائِيَّةٌ', "simiya'iyyatun", 'semiotika']]],
    ['Linguistik terapan', [['اكْتِسَابُ اللُّغَةِ', 'iktisabul lughah', 'pemerolehan bahasa'], ['تَدَاخُلٌ لُغَوِيٌّ', 'tadakhulun lughawiyyun', 'interferensi bahasa'], ['تَحْلِيلُ الْأَخْطَاءِ', "tahlilul akhtha'", 'analisis kesalahan'], ['لِسَانِيَّاتٌ', 'lisaniyyatun', 'linguistik']]],
    ['Publikasi ilmiah', [['نَشْرٌ عِلْمِيٌّ', "nasyrun 'ilmiyyun", 'publikasi ilmiah'], ['تَحْكِيمٌ', 'tahkimun', 'penelaahan sejawat'], ['قَبُولٌ مَشْرُوطٌ', 'qabulun masyruthun', 'diterima bersyarat'], ['مُعَامِلُ التَّأْثِيرِ', "mu'amilut ta'tsir", 'faktor dampak']]],
    ['Hasil dan pembahasan', [['نَتَائِجُ', "nata'iju", 'hasil-hasil'], ['مُنَاقَشَةٌ', 'munaqasyatun', 'pembahasan'], ['تَفْسِيرٌ', 'tafsirun', 'penafsiran'], ['تَعْمِيمٌ', "ta'mimun", 'generalisasi']]],
    ['Sidang akademik', [['مُنَاقَشَةُ الرِّسَالَةِ', 'munaqasyatur risalah', 'sidang tesis'], ['لَجْنَةٌ', 'lajnatun', 'komite penguji'], ['مُشْرِفٌ', 'musyrifun', 'pembimbing'], ['تَعْدِيلَاتٌ', "ta'dilatun", 'revisi']]],
    ['Proposal hibah', [['مُقْتَرَحٌ بَحْثِيٌّ', 'muqtarahun bahtsiyyun', 'proposal penelitian'], ['تَمْوِيلٌ', 'tamwilun', 'pendanaan'], ['جَدْوَى', 'jadwa', 'kelayakan'], ['مُخْرَجَاتٌ', 'mukhrajatun', 'luaran']]],
    ['Portofolio scholar', [['إِسْهَامٌ عِلْمِيٌّ', "ishamun 'ilmiyyun", 'kontribusi ilmiah'], ['جِدَّةٌ', 'jiddatun', 'kebaruan'], ['آفَاقٌ بَحْثِيَّةٌ', 'afaqun bahtsiyyatun', 'prospek riset'], ['حُدُودُ الدِّرَاسَةِ', 'hududud dirasah', 'batasan studi']]],
  ]),
};

export function isArabicUpperLevel(level: string): level is ArabicUpperLevel {
  return level in arabicUpperThemes;
}

export function getArabicUpperTheme(level: ArabicUpperLevel, lesson: number): ArabicTheme | undefined {
  return arabicUpperThemes[level][lesson - 1];
}

export function getArabicUpperLevelWords(level: ArabicUpperLevel): ArabicThemeWord[] {
  return arabicUpperThemes[level].flatMap((theme) => theme.vocabulary);
}
