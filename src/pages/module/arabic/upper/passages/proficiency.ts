import type { PassageTuple } from './types';

// C2 reading passages, one per theme in arabicUpperThemes.proficiency (same order).
export const proficiencyPassages: PassageTuple[] = [
  [
    [
      ['تَسْأَلُ نَظَرِيَّةُ الْمَعْرِفَةِ: كَيْفَ نَعْرِفُ مَا نَعْرِفُ؟', "Tas'alu nazhariyyatul ma'rifah: kaifa na'rifu ma na'rif?", 'Teori pengetahuan bertanya: bagaimana kita mengetahui apa yang kita ketahui?'],
      ['اتَّخَذَ الْغَزَالِيُّ الشَّكَّ الْمَنْهَجِيَّ طَرِيقًا إِلَى الْيَقِينِ.', "Ittakhadzal Ghazaliyyusy syakkal manhajiyya thariqan ilal yaqin.", 'Al-Ghazali menjadikan keraguan metodis sebagai jalan menuju kepastian.'],
      ['فَلَمْ يَقْبَلْ رَأْيًا لَمْ يَقُمْ عَلَيْهِ بُرْهَانٌ.', "Falam yaqbal ra'yan lam yaqum 'alaihi burhan.", 'Dia tidak menerima pendapat yang tidak ditegakkan oleh bukti demonstratif.'],
      ['وَالشَّكُّ هُنَا وَسِيلَةٌ لِلْبِنَاءِ لَا غَايَةٌ فِي ذَاتِهِ.', "Wasy syakku huna wasilatun lil bina'i la ghayatun fi dzatih.", 'Keraguan di sini adalah sarana untuk membangun, bukan tujuan itu sendiri.'],
    ],
    [
      ['Menurut teks, apa jalan Al-Ghazali menuju kepastian?', 'Keraguan metodis', ['Taklid buta', 'Mimpi', 'Tradisi lisan saja']],
      ['Apa status keraguan dalam teks?', 'Sarana untuk membangun, bukan tujuan', ['Tujuan akhir', 'Sesuatu yang terlarang', 'Tanda kebodohan']],
    ],
  ],
  [
    [
      ['لَا تَتَحَدَّدُ دَلَالَةُ الْكَلِمَةِ بِالْمُعْجَمِ وَحْدَهُ.', "La tatahaddadu dalalatul kalimati bil mu'jami wahdah.", 'Makna sebuah kata tidak ditentukan oleh kamus saja.'],
      ['فَالسِّيَاقُ يَمْنَحُهَا ظِلَالًا جَدِيدَةً مِنَ الْمَعْنَى.', "Fas siyaqu yamnahuha zhilalan jadidatan minal ma'na.", 'Konteks memberinya nuansa-nuansa makna baru.'],
      ['وَيَنْتَقِلُ اللَّفْظُ بِالْمَجَازِ مِنْ مَعْنَاهُ الْأَصْلِيِّ إِلَى مَعْنًى آخَرَ.', "Wa yantaqilul lafzhu bil majazi min ma'nahul ashliyyi ila ma'nan akhar.", 'Melalui majas, lafaz berpindah dari makna aslinya ke makna lain.'],
      ['لِذٰلِكَ يَظَلُّ التَّأْوِيلُ مُمَارَسَةً مَفْتُوحَةً عَلَى الِاحْتِمَالِ.', "Lidzalika yazhallut ta'wilu mumarasatan maftuhatan 'alal ihtimal.", 'Karena itu interpretasi tetap menjadi praktik yang terbuka pada berbagai kemungkinan.'],
    ],
    [
      ['Apa yang memberi nuansa makna baru pada kata?', 'Konteks', ['Kamus', 'Ejaan', 'Panjang kata']],
      ['Mengapa interpretasi tetap terbuka?', 'Karena makna bergantung pada konteks dan majas', ['Karena kamus salah', 'Karena bahasa tidak punya aturan', 'Karena penulis selalu berbohong']],
    ],
  ],
  [
    [
      ['يَنْقَسِمُ الْمُجْتَمَعُ إِلَى طَبَقَاتٍ تَخْتَلِفُ فِي الدَّخْلِ وَالنُّفُوذِ.', "Yanqasimul mujtama'u ila thabaqatin takhtalifu fid dakhli wan nufudz.", 'Masyarakat terbagi menjadi kelas-kelas yang berbeda dalam pendapatan dan pengaruh.'],
      ['وَيُقَاسُ عَدْلُ الْبِنْيَةِ الِاجْتِمَاعِيَّةِ بِمَدَى الْحَرَاكِ الِاجْتِمَاعِيِّ فِيهَا.', "Wa yuqasu 'adlul binyatil ijtima'iyyati bimadal harakil ijtima'iyyi fiha.", 'Keadilan struktur sosial diukur dari seberapa besar mobilitas sosial di dalamnya.'],
      ['فَإِذَا وَرِثَ الْأَبْنَاءُ فَقْرَ آبَائِهِمْ تَجَمَّدَ الْمُجْتَمَعُ.', "Fa idza waritsal abna'u faqra aba'ihim tajammadal mujtama'.", 'Jika anak-anak mewarisi kemiskinan orang tua mereka, masyarakat menjadi beku.'],
      ['وَالتَّعْلِيمُ هُوَ السُّلَّمُ الْأَهَمُّ لِلصُّعُودِ.', "Wat ta'limu huwas sullamul ahammu lish shu'ud.", 'Pendidikan adalah tangga terpenting untuk naik.'],
    ],
    [
      ['Dengan apa keadilan struktur sosial diukur?', 'Tingkat mobilitas sosial', ['Jumlah gedung tinggi', 'Luas wilayah', 'Banyaknya pesta']],
      ['Apa tangga terpenting untuk naik kelas sosial?', 'Pendidikan', ['Warisan', 'Keberuntungan', 'Popularitas']],
    ],
  ],
  [
    [
      ['يَعْتَمِدُ السَّرْدُ فِي هٰذِهِ الرِّوَايَةِ عَلَى رَاوٍ غَيْرِ مَوْثُوقٍ.', "Ya'tamidus sardu fi hadzihir riwayati 'ala rawin ghairi mautsuq.", 'Narasi dalam novel ini bertumpu pada narator yang tidak dapat dipercaya.'],
      ['وَتَحْمِلُ صُورَةُ الْبَحْرِ رَمْزِيَّةً لِلْحُرِّيَّةِ وَالْخَوْفِ مَعًا.', "Wa tahmilu shuratul bahri ramziyyatan lil hurriyyati wal khaufi ma'an.", 'Citra laut membawa simbolisme kebebasan sekaligus ketakutan.'],
      ['وَيَظْهَرُ التَّنَاصُّ فِي اسْتِدْعَاءِ قِصَّةِ نُوحٍ.', "Wa yazhharut tanashshu fis tid'a'i qishshati Nuh.", 'Intertekstualitas tampak dalam pemanggilan kisah Nabi Nuh.'],
      ['فَتَتَحَوَّلُ الرِّحْلَةُ الْفَرْدِيَّةُ إِلَى سُؤَالٍ إِنْسَانِيٍّ عَامٍّ.', "Fa tatahawwalur rihlatul fardiyyatu ila su'alin insaniyyin 'amm.", 'Perjalanan individual pun berubah menjadi pertanyaan kemanusiaan yang universal.'],
    ],
    [
      ['Apa yang disimbolkan oleh laut dalam novel?', 'Kebebasan sekaligus ketakutan', ['Kekayaan', 'Kematian saja', 'Kampung halaman']],
      ['Di mana intertekstualitas tampak?', 'Dalam pemanggilan kisah Nabi Nuh', ['Dalam judul novel', 'Dalam nama penerbit', 'Dalam sampul buku']],
    ],
  ],
  [
    [
      ['تَقُومُ فِكْرَةُ الْعَقْدِ الِاجْتِمَاعِيِّ عَلَى رِضَا الْمَحْكُومِينَ.', "Taqumu fikratul 'aqdil ijtima'iyyi 'ala ridhal mahkumin.", 'Gagasan kontrak sosial bertumpu pada kerelaan pihak yang diperintah.'],
      ['فَالسُّلْطَةُ لَا تَكْتَسِبُ الشَّرْعِيَّةَ بِالْقُوَّةِ وَحْدَهَا.', "Fas sulthatu la taktasibusy syar'iyyata bil quwwati wahdaha.", 'Kekuasaan tidak memperoleh legitimasi dengan kekuatan semata.'],
      ['وَتَحْمِي التَّعَدُّدِيَّةُ الْمُجْتَمَعَ مِنْ طُغْيَانِ الرَّأْيِ الْوَاحِدِ.', "Wa tahmit ta'addudiyyatul mujtama'a min thughyanir ra'yil wahid.", 'Pluralisme melindungi masyarakat dari tirani satu pendapat.'],
      ['وَمِنْ ثَمَّ يَصِيرُ الِاخْتِلَافُ مَصْدَرَ قُوَّةٍ لَا تَهْدِيدًا.', "Wa min tsamma yashirul ikhtilafu mashdara quwwatin la tahdidan.", 'Dengan demikian perbedaan menjadi sumber kekuatan, bukan ancaman.'],
    ],
    [
      ['Kontrak sosial bertumpu pada apa?', 'Kerelaan pihak yang diperintah', ['Kekuatan militer', 'Kekayaan penguasa', 'Keturunan raja']],
      ['Apa fungsi pluralisme menurut teks?', 'Melindungi dari tirani satu pendapat', ['Menghapus perbedaan', 'Memperkuat satu partai', 'Membatasi kebebasan']],
    ],
  ],
  [
    [
      ['يُوَاجِهُ الطَّبِيبُ أَحْيَانًا مُعْضِلَةً أَخْلَاقِيَّةً صَعْبَةً.', "Yuwajihuth thabibu ahyanan mu'dhilatan akhlaqiyyatan sha'bah.", 'Seorang dokter kadang menghadapi dilema moral yang sulit.'],
      ['هَلْ يُخْبِرُ الْمَرِيضَ بِالْحَقِيقَةِ كَامِلَةً أَمْ يُخَفِّفُهَا؟', "Hal yukhbirul maridha bil haqiqati kamilatan am yukhaffifuha?", 'Apakah dia memberi tahu pasien kebenaran seutuhnya atau meringankannya?'],
      ['يَحْتَكِمُ هُنَا إِلَى ضَمِيرِهِ وَإِلَى كَرَامَةِ الْمَرِيضِ.', "Yahtakimu huna ila dhamirihi wa ila karamatil maridh.", 'Di sini dia berpegang pada hati nuraninya dan pada martabat pasien.'],
      ['فَالْمَصْلَحَةُ الْحَقِيقِيَّةُ تَجْمَعُ بَيْنَ الصِّدْقِ وَالرَّحْمَةِ.', "Fal mashlahatul haqiqiyyatu tajma'u bainash shidqi war rahmah.", 'Kemaslahatan sejati memadukan kejujuran dan kasih sayang.'],
    ],
    [
      ['Apa dilema dokter dalam teks?', 'Menyampaikan kebenaran utuh atau meringankannya', ['Memilih rumah sakit', 'Menentukan tarif', 'Memilih libur']],
      ['Kemaslahatan sejati memadukan apa?', 'Kejujuran dan kasih sayang', ['Keuntungan dan kecepatan', 'Hukum dan hukuman', 'Diam dan menghindar']],
    ],
  ],
  [
    [
      ['يَتَرَكَّزُ رَأْسُ الْمَالِ فِي أَيْدِي قِلَّةٍ مِنَ الشَّرِكَاتِ.', "Yatarakkazu ra'sul mali fi aidi qillatin minasy syarikat.", 'Modal terkonsentrasi di tangan segelintir perusahaan.'],
      ['وَيُؤَدِّي الِاحْتِكَارُ إِلَى رَفْعِ الْأَسْعَارِ وَإِضْعَافِ الْمُنَافَسَةِ.', "Wa yu'addil ihtikaru ila raf'il as'ari wa idh'afil munafasah.", 'Monopoli menyebabkan kenaikan harga dan melemahnya persaingan.'],
      ['وَتُطَالِبُ الْعَدَالَةُ الِاجْتِمَاعِيَّةُ بِإِعَادَةِ تَوْزِيعِ الثَّرْوَةِ.', "Wa tuthalibul 'adalatul ijtima'iyyatu bi'i'adati tauzi'its tsarwah.", 'Keadilan sosial menuntut redistribusi kekayaan.'],
      ['وَيَبْقَى السُّؤَالُ: مَا دَوْرُ الدَّوْلَةِ فِي السُّوقِ؟', "Wa yabqas su'al: ma daurud daulati fis suq?", 'Pertanyaannya tetap: apa peran negara di pasar?'],
    ],
    [
      ['Apa akibat monopoli menurut teks?', 'Harga naik dan persaingan melemah', ['Harga turun', 'Persaingan meningkat', 'Pajak dihapus']],
      ['Apa tuntutan keadilan sosial?', 'Redistribusi kekayaan', ['Penghapusan negara', 'Monopoli yang lebih besar', 'Penurunan upah']],
    ],
  ],
  [
    [
      ['لَيْسَ التَّأْرِيخُ مُجَرَّدَ تَسْجِيلٍ لِلْأَحْدَاثِ.', "Laisat ta'rikhu mujarrada tasjilin lil ahdats.", 'Historiografi bukan sekadar pencatatan peristiwa.'],
      ['فَكُلُّ رِوَايَةٍ تَارِيخِيَّةٍ تَعْكِسُ مَوْقِعَ صَاحِبِهَا.', "Fa kullu riwayatin tarikhiyyatin ta'kisu mauqi'a shahibiha.", 'Setiap narasi sejarah mencerminkan posisi penulisnya.'],
      ['لِذٰلِكَ يُقَارِنُ الْمُؤَرِّخُ بَيْنَ الْمَصَادِرِ الْأَوَّلِيَّةِ الْمُخْتَلِفَةِ.', "Lidzalika yuqarinul mu'arrikhu bainal mashadiril awwaliyyatil mukhtalifah.", 'Karena itu sejarawan membandingkan berbagai sumber primer.'],
      ['وَقَدْ دَعَا ابْنُ خَلْدُونَ إِلَى نَقْدِ الْأَخْبَارِ بِمِيزَانِ الْعَقْلِ.', "Wa qad da'abnu Khalduna ila naqdil akhbari bimizanil 'aql.", 'Ibnu Khaldun menyerukan kritik terhadap berita dengan timbangan akal.'],
    ],
    [
      ['Apa yang dicerminkan setiap narasi sejarah?', 'Posisi penulisnya', ['Kebenaran mutlak', 'Pendapat pembaca', 'Kehendak raja saja']],
      ['Siapa yang menyerukan kritik berita dengan timbangan akal?', 'Ibnu Khaldun', ['Al-Mutanabbi', 'Sibawaih', 'Ibnu Battuta']],
    ],
  ],
  [
    [
      ['يَقْرَأُ الْبَاحِثُ النَّصَّ قِرَاءَةً نَقْدِيَّةً مُتَأَنِّيَةً.', "Yaqra'ul bahitsun nashsha qira'atan naqdiyyatan muta'anniyah.", 'Peneliti membaca teks dengan pembacaan kritis yang cermat.'],
      ['فَيَسْأَلُ عَنِ السِّيَاقِ التَّارِيخِيِّ الَّذِي نَشَأَ فِيهِ.', "Fa yas'alu 'anis siyaqit tarikhiyyil ladzi nasya'a fih.", 'Dia bertanya tentang konteks sejarah tempat teks itu lahir.'],
      ['وَيَبْحَثُ عَنْ مَقَاصِدِ الْمُؤَلِّفِ وَرَاءَ الْأَلْفَاظِ.', "Wa yabhatsu 'an maqashidil mu'allifi wara'al alfazh.", 'Dia mencari tujuan-tujuan pengarang di balik lafaz-lafaz.'],
      ['وَيَحْذَرُ مِنْ إِسْقَاطِ هُمُومِ الْحَاضِرِ عَلَى الْمَاضِي.', "Wa yahdzaru min isqathi humumil hadhiri 'alal madhi.", 'Dia berhati-hati agar tidak memproyeksikan kegelisahan masa kini ke masa lalu.'],
    ],
    [
      ['Apa yang ditanyakan peneliti tentang teks?', 'Konteks sejarah kelahirannya', ['Harga cetakannya', 'Jumlah pembacanya', 'Warna sampulnya']],
      ['Apa yang dihindari peneliti?', 'Memproyeksikan masa kini ke masa lalu', ['Membaca teks', 'Mencari tujuan pengarang', 'Bertanya tentang konteks']],
    ],
  ],
  [
    [
      ['فَتَحَتِ الْهَنْدَسَةُ الْوِرَاثِيَّةُ آفَاقًا لِعِلَاجِ أَمْرَاضٍ مُسْتَعْصِيَةٍ.', "Fatahatil handasatul wiratsiyyatu afaqan li'ilaji amradhin musta'shiyah.", 'Rekayasa genetika membuka cakrawala untuk mengobati penyakit yang sulit disembuhkan.'],
      ['لٰكِنَّهَا تُثِيرُ مَخَاوِفَ مِنَ التَّلَاعُبِ بِطَبِيعَةِ الْإِنْسَانِ.', "Lakinnaha tutsiru makhawifa minat tala'ubi bithabi'atil insan.", 'Namun ia memunculkan kekhawatiran akan manipulasi kodrat manusia.'],
      ['لِذٰلِكَ وُضِعَتْ أَخْلَاقِيَّاتُ الْبَحْثِ لِتَضْبِطَ التَّجَارِبَ.', "Lidzalika wudhi'at akhlaqiyyatul bahtsi litadhbithat tajarib.", 'Karena itu etika penelitian disusun untuk mengendalikan eksperimen.'],
      ['فَالْمَسْؤُولِيَّةُ الْعِلْمِيَّةُ لَا تَنْفَصِلُ عَنِ الْقِيَمِ.', "Fal mas'uliyyatul 'ilmiyyatu la tanfashilu 'anil qiyam.", 'Tanggung jawab ilmiah tidak terpisah dari nilai-nilai.'],
    ],
    [
      ['Apa kekhawatiran terhadap rekayasa genetika?', 'Manipulasi kodrat manusia', ['Biaya kertas', 'Kekurangan dokter', 'Kurangnya laboratorium']],
      ['Untuk apa etika penelitian disusun?', 'Mengendalikan eksperimen', ['Mempercepat publikasi', 'Menambah dana', 'Menghapus pengawasan']],
    ],
  ],
  [
    [
      ['تُتَّهَمُ الْعَوْلَمَةُ بِفَرْضِ هَيْمَنَةٍ ثَقَافِيَّةٍ غَرْبِيَّةٍ.', "Tuttahamul 'aulamatu bifardhi haimanatin tsaqafiyyatin gharbiyyah.", 'Globalisasi dituduh memaksakan hegemoni budaya Barat.'],
      ['وَيَرَى بَعْضُ الْمُفَكِّرِينَ فِي ذٰلِكَ نَوْعًا مِنَ الْمَرْكَزِيَّةِ.', "Wa yara ba'dhul mufakkirina fi dzalika nau'an minal markaziyyah.", 'Sebagian pemikir melihat hal itu sebagai semacam sentrisme.'],
      ['وَلٰكِنَّ الثَّقَافَاتِ لَا تَسْتَقْبِلُ الْوَافِدَ بِسَلْبِيَّةٍ.', "Walakinnats tsaqafati la tastaqbilul wafida bisalbiyyah.", 'Tetapi budaya-budaya tidak menerima yang datang secara pasif.'],
      ['بَلْ تُنْتِجُ أَشْكَالًا مِنَ التَّهْجِينِ تَحْفَظُ خُصُوصِيَّتَهَا.', "Bal tuntiju asykalan minat tahjini tahfazhu khushushiyyataha.", 'Melainkan menghasilkan bentuk-bentuk hibriditas yang menjaga kekhasannya.'],
    ],
    [
      ['Globalisasi dituduh memaksakan apa?', 'Hegemoni budaya Barat', ['Bahasa Arab', 'Kemiskinan', 'Perang']],
      ['Bagaimana budaya merespons pengaruh luar menurut teks?', 'Menghasilkan hibriditas yang menjaga kekhasan', ['Menerima secara pasif', 'Menolak total', 'Menghilang']],
    ],
  ],
  [
    [
      ['يَنْخُرُ الْفَسَادُ ثِقَةَ الْمُوَاطِنِينَ بِالْمُؤَسَّسَاتِ.', "Yankhurul fasadu tsiqatal muwathinina bil mu'assasat.", 'Korupsi menggerogoti kepercayaan warga terhadap lembaga-lembaga.'],
      ['وَالشَّفَافِيَّةُ تَجْعَلُ الْقَرَارَاتِ وَالْمِيزَانِيَّاتِ مُعْلَنَةً لِلْجَمِيعِ.', "Wasy syafafiyyatu taj'alul qararati wal mizaniyyati mu'lanatan lil jami'.", 'Transparansi membuat keputusan dan anggaran terbuka bagi semua.'],
      ['أَمَّا الرَّقَابَةُ الْمُسْتَقِلَّةُ فَتَكْشِفُ الْمُخَالَفَاتِ دُونَ خَوْفٍ.', "Ammar raqabatul mustaqillatu fa taksyiful mukhalafati duna khauf.", 'Adapun pengawasan independen mengungkap pelanggaran tanpa rasa takut.'],
      ['وَتَبْدَأُ النَّزَاهَةُ مِنَ الْفَرْدِ قَبْلَ أَنْ تَصِيرَ نِظَامًا.', "Wa tabda'un nazahatu minal fardi qabla an tashira nizhaman.", 'Integritas dimulai dari individu sebelum menjadi sistem.'],
    ],
    [
      ['Apa yang digerogoti oleh korupsi?', 'Kepercayaan warga terhadap lembaga', ['Jumlah penduduk', 'Luas hutan', 'Kualitas cuaca']],
      ['Dari mana integritas dimulai menurut teks?', 'Dari individu', ['Dari undang-undang', 'Dari media', 'Dari bank']],
    ],
  ],
  [
    [
      ['يَعِيشُ الْمُجْتَمَعُ الْعَرَبِيُّ حَالَةَ ازْدِوَاجِيَّةٍ لُغَوِيَّةٍ.', "Ya'isyul mujtama'ul 'arabiyyu halata izdiwajiyyatin lughawiyyah.", 'Masyarakat Arab hidup dalam situasi diglosia.'],
      ['فَالْفُصْحَى لِلْمَقَامَاتِ الرَّسْمِيَّةِ وَالْعَامِّيَّةُ لِلْحَيَاةِ الْيَوْمِيَّةِ.', "Fal fush-ha lil maqamatir rasmiyyati wal 'ammiyyatu lil hayatil yaumiyyah.", 'Bahasa baku untuk situasi resmi dan bahasa pasaran untuk kehidupan sehari-hari.'],
      ['وَتَدْخُلُ كَلِمَاتٌ أَجْنَبِيَّةٌ كَثِيرَةٌ عَنْ طَرِيقِ الِاقْتِرَاضِ اللُّغَوِيِّ.', "Wa tadkhulu kalimatun ajnabiyyatun katsiratun 'an thariqil iqtiradhil lughawiyy.", 'Banyak kata asing masuk melalui peminjaman bahasa.'],
      ['وَتَسْعَى مَجَامِعُ اللُّغَةِ إِلَى التَّعْرِيبِ وَوَضْعِ الْمُصْطَلَحَاتِ.', "Wa tas'a majami'ul lughati ilat ta'ribi wa wadh'il mushthalahat.", 'Akademi-akademi bahasa berupaya melakukan arabisasi dan menyusun istilah.'],
    ],
    [
      ['Kapan bahasa baku digunakan menurut teks?', 'Dalam situasi resmi', ['Di pasar', 'Dalam keluarga saja', 'Tidak pernah']],
      ['Apa yang diupayakan akademi bahasa?', 'Arabisasi dan penyusunan istilah', ['Menghapus fusha', 'Melarang dialek', 'Mengganti huruf Arab']],
    ],
  ],
  [
    [
      ['لَمْ يَعُدِ التَّضْلِيلُ يَحْتَاجُ إِلَى الْكَذِبِ الصَّرِيحِ.', "Lam ya'udit tadhlilu yahtaju ilal kadzibish sharih.", 'Disinformasi kini tidak lagi membutuhkan kebohongan terang-terangan.'],
      ['يَكْفِي أَنْ تُخْتَارَ الْحَقَائِقُ بِعِنَايَةٍ وَيُحْذَفَ السِّيَاقُ.', "Yakfi an tukhtaral haqa'iqu bi'inayatin wa yuhdzafas siyaq.", 'Cukup dengan memilih fakta secara cermat dan membuang konteksnya.'],
      ['وَهٰكَذَا تَتِمُّ صِنَاعَةُ الرَّأْيِ وَيَزْدَادُ الِاسْتِقْطَابُ.', "Wa hakadza tatimmu shina'atur ra'yi wa yazdadul istiqthab.", 'Dengan begitu opini direkayasa dan polarisasi meningkat.'],
      ['أَمَّا الْحِيَادُ الْكَامِلُ فَمَثَلٌ أَعْلَى نَادِرُ التَّحَقُّقِ.', "Ammal hiyadul kamilu fa matsalun a'la nadirut tahaqquq.", 'Adapun netralitas sempurna adalah cita-cita yang jarang terwujud.'],
    ],
    [
      ['Bagaimana disinformasi bekerja menurut teks?', 'Memilih fakta dan membuang konteks', ['Selalu dengan kebohongan terang', 'Dengan menerbitkan semua fakta', 'Dengan menghapus media']],
      ['Bagaimana teks menilai netralitas sempurna?', 'Cita-cita yang jarang terwujud', ['Hal yang mudah dicapai', 'Sesuatu yang berbahaya', 'Kewajiban hukum']],
    ],
  ],
  [
    [
      ['لَا تُقَاسُ التَّنْمِيَةُ الْبَشَرِيَّةُ بِالدَّخْلِ فَقَطْ.', "La tuqasut tanmiyatul basyariyyatu bid dakhli faqath.", 'Pembangunan manusia tidak diukur dengan pendapatan saja.'],
      ['فَالْمُؤَشِّرُ يَشْمَلُ الصِّحَّةَ وَالتَّعْلِيمَ وَمُسْتَوَى الْمَعِيشَةِ.', "Fal mu'asysyiru yasymulush shihhata wat ta'lima wa mustawal ma'isyah.", 'Indikatornya mencakup kesehatan, pendidikan, dan taraf hidup.'],
      ['وَالِاسْتِثْمَارُ فِي رَأْسِ الْمَالِ الْبَشَرِيِّ يُقَلِّلُ الْهَشَاشَةَ.', "Wal istitsmaru fi ra'sil malil basyariyyi yuqallilul hasyasyah.", 'Investasi pada modal manusia mengurangi kerentanan.'],
      ['وَيَعْنِي التَّمْكِينُ أَنْ يَمْلِكَ الْإِنْسَانُ قَرَارَ حَيَاتِهِ.', "Wa ya'nit tamkinu an yamlikal insanu qarara hayatih.", 'Pemberdayaan berarti manusia memegang keputusan atas hidupnya.'],
    ],
    [
      ['Apa yang dicakup indikator pembangunan manusia?', 'Kesehatan, pendidikan, dan taraf hidup', ['Pendapatan saja', 'Jumlah jalan tol', 'Kekuatan militer']],
      ['Apa arti pemberdayaan menurut teks?', 'Manusia memegang keputusan atas hidupnya', ['Mendapat bantuan tunai', 'Bekerja tanpa upah', 'Mengikuti perintah']],
    ],
  ],
  [
    [
      ['أُسِّسَ بَيْتُ الْحِكْمَةِ فِي بَغْدَادَ فِي الْعَصْرِ الْعَبَّاسِيِّ.', "Ussisa baitul hikmati fi Baghdada fil 'ashril 'abbasiyy.", 'Baitul Hikmah didirikan di Baghdad pada masa Abbasiyah.'],
      ['وَنَشِطَتْ فِيهِ التَّرْجَمَةُ الْعِلْمِيَّةُ مِنَ الْيُونَانِيَّةِ وَالْفَارِسِيَّةِ.', "Wa nasyithat fihit tarjamatul 'ilmiyyatu minal yunaniyyati wal farisiyyah.", 'Di sana penerjemahan ilmiah dari bahasa Yunani dan Persia berkembang pesat.'],
      ['وَلَمْ يَكْتَفِ الْعُلَمَاءُ بِالنَّقْلِ بَلْ أَضَافُوا وَنَقَدُوا.', "Wa lam yaktafil 'ulama'u bin naqli bal adhafu wa naqadu.", 'Para ilmuwan tidak cukup dengan menyalin, tetapi juga menambah dan mengkritik.'],
      ['فَكَانَتِ الْحَضَارَةُ الْإِسْلَامِيَّةُ جِسْرًا بَيْنَ الْقَدِيمِ وَالْحَدِيثِ.', "Fa kanatil hadharatul islamiyyatu jisran bainal qadimi wal hadits.", 'Maka peradaban Islam menjadi jembatan antara dunia kuno dan modern.'],
    ],
    [
      ['Di mana Baitul Hikmah didirikan?', 'Baghdad', ['Kairo', 'Damaskus', 'Kordoba']],
      ['Apa yang dilakukan ilmuwan selain menyalin?', 'Menambah dan mengkritik', ['Membakar naskah', 'Menjual buku', 'Menyembunyikan ilmu']],
    ],
  ],
  [
    [
      ['يَتَكَوَّنُ الِاسْتِدْلَالُ مِنْ مُقَدِّمَاتٍ تُفْضِي إِلَى نَتِيجَةٍ.', "Yatakawwanul istidlalu min muqaddimatin tufdhi ila natijah.", 'Penalaran terdiri atas premis-premis yang mengantar pada kesimpulan.'],
      ['فَإِذَا فَسَدَتْ مُقَدِّمَةٌ فَسَدَتِ النَّتِيجَةُ.', "Fa idza fasadat muqaddimatun fasadatin natijah.", 'Jika satu premis rusak, kesimpulannya pun rusak.'],
      ['وَمِنَ الْمُغَالَطَاتِ الشَّائِعَةِ مُهَاجَمَةُ الشَّخْصِ بَدَلَ الْحُجَّةِ.', "Wa minal mughalathatisy sya'i'ati muhajamatusy syakhshi badalal hujjah.", 'Salah satu kekeliruan logika yang umum adalah menyerang orangnya, bukan argumennya.'],
      ['وَالتَّفْكِيرُ النَّقْدِيُّ يَكْشِفُ هٰذِهِ الْحِيَلَ بِسُرْعَةٍ.', "Wat tafkirun naqdiyyu yaksyifu hadzihil hiyala bisur'ah.", 'Berpikir kritis dengan cepat mengungkap tipuan-tipuan ini.'],
    ],
    [
      ['Apa yang terjadi jika satu premis rusak?', 'Kesimpulannya ikut rusak', ['Kesimpulan tetap benar', 'Argumen menjadi lebih kuat', 'Tidak ada pengaruhnya']],
      ['Contoh kekeliruan logika dalam teks adalah...', 'Menyerang orang, bukan argumennya', ['Memberi bukti', 'Menyusun premis', 'Menarik kesimpulan']],
    ],
  ],
  [
    [
      ['لَا يَقْتَصِرُ الْعُمْرَانُ عَلَى الْمَبَانِي وَالشَّوَارِعِ.', "La yaqtashirul 'umranu 'alal mabani wasy syawari'.", 'Urbanisme tidak terbatas pada gedung dan jalan.'],
      ['فَالْفَضَاءُ الْعَامُّ مَكَانٌ لِلِقَاءِ النَّاسِ وَتَبَادُلِ الْآرَاءِ.', "Fal fadha'ul 'ammu makanun liliqa'in nasi wa tabadulil ara'.", 'Ruang publik adalah tempat orang bertemu dan bertukar pendapat.'],
      ['وَإِذَا غَابَ التَّخْطِيطُ الْعَادِلُ ظَهَرَ تَهْمِيشُ الْأَحْيَاءِ الْفَقِيرَةِ.', "Wa idza ghabat takhthithul 'adilu zhahara tahmisyul ahya'il faqirah.", 'Jika perencanaan yang adil tidak ada, muncullah marginalisasi kawasan miskin.'],
      ['وَقَدْ رَبَطَ ابْنُ خَلْدُونَ بَيْنَ الْعُمْرَانِ وَقِيَامِ الدُّوَلِ.', "Wa qad rabathabnu Khalduna bainal 'umrani wa qiyamid duwal.", 'Ibnu Khaldun mengaitkan peradaban kota dengan tegaknya negara.'],
    ],
    [
      ['Apa fungsi ruang publik menurut teks?', 'Tempat bertemu dan bertukar pendapat', ['Tempat parkir saja', 'Kawasan industri', 'Lahan pertanian']],
      ['Apa akibat tidak adanya perencanaan yang adil?', 'Marginalisasi kawasan miskin', ['Kota menjadi lebih hijau', 'Harga rumah turun', 'Jalan menjadi lebar']],
    ],
  ],
  [
    [
      ['يُغَيِّرُ التَّحَوُّلُ الرَّقْمِيُّ طَبِيعَةَ الْوَظَائِفِ بِسُرْعَةٍ.', "Yughayyirut tahawwulur raqmiyyu thabi'atal wazha'ifi bisur'ah.", 'Transformasi digital mengubah sifat pekerjaan dengan cepat.'],
      ['فَتَخْتَفِي مِهَنٌ وَتَظْهَرُ مِهَنٌ لَمْ نَسْمَعْ بِهَا مِنْ قَبْلُ.', "Fa takhtafi mihanun wa tazhharu mihanun lam nasma' biha min qabl.", 'Sebagian profesi lenyap dan muncul profesi yang belum pernah kita dengar.'],
      ['وَلِهٰذَا أَصْبَحَ التَّعَلُّمُ مَدَى الْحَيَاةِ ضَرُورَةً لَا تَرَفًا.', "Wa lihadza ashbahat ta'allumu madal hayati dharuratan la tarafan.", 'Karena itu belajar sepanjang hayat menjadi kebutuhan, bukan kemewahan.'],
      ['وَمِنْ أَهَمِّ الْمَهَارَاتِ الْمُسْتَقْبَلِيَّةِ التَّفْكِيرُ النَّقْدِيُّ وَالتَّعَاوُنُ.', "Wa min ahammil maharatil mustaqbaliyyatit tafkirun naqdiyyu wat ta'awun.", 'Di antara keterampilan masa depan terpenting adalah berpikir kritis dan kolaborasi.'],
    ],
    [
      ['Mengapa belajar sepanjang hayat menjadi kebutuhan?', 'Karena pekerjaan berubah cepat', ['Karena sekolah ditutup', 'Karena gaji turun', 'Karena teknologi berhenti']],
      ['Keterampilan masa depan apa yang disebut?', 'Berpikir kritis dan kolaborasi', ['Menghafal dan menyalin', 'Mengetik cepat saja', 'Bekerja sendirian']],
    ],
  ],
  [
    [
      ['يُقَدِّمُ الطَّالِبُ فِي خِتَامِ الْمُسْتَوَى أُطْرُوحَةً قَصِيرَةً.', "Yuqaddimuth thalibu fi khitamil mustawa uthruhatan qashirah.", 'Di akhir level siswa menyajikan sebuah tesis pendek.'],
      ['يُطْلَبُ مِنْهُ تَرْكِيبٌ بَيْنَ آرَاءٍ مُتَعَارِضَةٍ.', "Yuthlabu minhu tarkibun baina ara'in muta'aridhah.", 'Dia diminta membuat sintesis dari pendapat-pendapat yang bertentangan.'],
      ['وَيُمَارِسُ نَقْدًا ذَاتِيًّا يُبَيِّنُ حُدُودَ عَمَلِهِ.', "Wa yumarisu naqdan dzatiyyan yubayyinu hududa 'amalih.", 'Dia melakukan kritik diri yang menunjukkan batas-batas karyanya.'],
      ['وَتُقَدَّرُ الْأَصَالَةُ أَكْثَرَ مِنْ كَثْرَةِ الِاقْتِبَاسِ.', "Wa tuqaddarul ashalatu aktsara min katsratil iqtibas.", 'Orisinalitas lebih dihargai daripada banyaknya kutipan.'],
    ],
    [
      ['Apa yang diminta dari siswa dalam tesisnya?', 'Sintesis pendapat yang bertentangan', ['Menyalin satu buku', 'Menulis puisi', 'Menerjemahkan kamus']],
      ['Apa yang lebih dihargai daripada banyak kutipan?', 'Orisinalitas', ['Panjang tulisan', 'Jumlah halaman', 'Huruf yang indah']],
    ],
  ],
];
