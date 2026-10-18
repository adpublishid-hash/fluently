import type { PassageExtension } from './types';

// Scholar: two more sentences and one more question for each passage in ../scholar.ts (same order).
export const scholarExtensions: PassageExtension[] = [
  [
    [
      ['وَيَخْتَارُ مَنْهَجًا يُنَاسِبُ طَبِيعَةَ الْأَسْئِلَةِ.', "Wa yakhtaru manhajan yunasibu thabi'atal as'ilah.", 'Dia memilih metode yang sesuai dengan sifat pertanyaan-pertanyaannya.'],
      ['فَالسُّؤَالُ الْغَامِضُ يُنْتِجُ بَحْثًا مُشَتَّتًا.', "Fas su'alul ghamidhu yuntiju bahtsan musyattatan.", 'Pertanyaan yang kabur menghasilkan penelitian yang tercerai-berai.'],
    ],
    ['Apa akibat pertanyaan penelitian yang kabur?', 'Penelitian yang tercerai-berai', ['Penelitian yang lebih cepat', 'Dana yang lebih besar', 'Hasil yang pasti benar']],
  ],
  [
    [
      ['وَيُرَاعِي أَنْ تَكُونَ الْمَرَاجِعُ حَدِيثَةً وَمُحَكَّمَةً.', "Wa yura'i an takunal maraji'u haditsatan wa muhakkamah.", 'Dia memperhatikan agar referensinya mutakhir dan telah ditelaah sejawat.'],
      ['وَلَا يُهْمِلُ الْأَعْمَالَ الْكِلَاسِيكِيَّةَ الَّتِي أَسَّسَتِ الْمَجَالَ.', "Wa la yuhmilul a'malal klasikiyyatal lati assasatil majal.", 'Dia juga tidak mengabaikan karya-karya klasik yang meletakkan dasar bidang itu.'],
    ],
    ['Referensi seperti apa yang diperhatikan peneliti?', 'Mutakhir dan telah ditelaah sejawat', ['Murah dan tipis', 'Hanya dari media sosial', 'Hanya terjemahan']],
  ],
  [
    [
      ['وَيُخَرِّجُ الْآيَاتِ وَالْأَحَادِيثَ الْوَارِدَةَ فِي النَّصِّ.', "Wa yukharrijul ayati wal ahaditsal waridata fin nashsh.", 'Dia melacak sumber ayat-ayat dan hadis-hadis yang terdapat dalam teks.'],
      ['وَيَصْنَعُ فَهَارِسَ لِلْأَعْلَامِ وَالْأَمَاكِنِ فِي آخِرِ الْكِتَابِ.', "Wa yashna'u faharisa lil a'lami wal amakini fi akhiril kitab.", 'Dia membuat indeks tokoh dan tempat di akhir kitab.'],
    ],
    ['Indeks apa yang dibuat pentahqiq di akhir kitab?', 'Tokoh dan tempat', ['Harga dan penjual', 'Warna dan ukuran', 'Tanggal cetak saja']],
  ],
  [
    [
      ['وَيُقَارِنُ الْمُؤَرِّخُ بَيْنَ الرِّوَايَاتِ الْمُتَعَارِضَةِ لِلْحَدَثِ الْوَاحِدِ.', "Wa yuqarinul mu'arrikhu bainar riwayatil muta'aridhati lil hadatsil wahid.", 'Sejarawan membandingkan riwayat-riwayat yang bertentangan tentang satu peristiwa.'],
      ['فَإِنْ لَمْ يُمْكِنِ التَّرْجِيحُ تَوَقَّفَ وَصَرَّحَ بِذٰلِكَ.', "Fa in lam yumkinit tarjihu tawaqqafa wa sharraha bidzalik.", 'Jika tidak mungkin menguatkan salah satunya, dia menahan diri dan menyatakannya terus terang.'],
    ],
    ['Apa yang dilakukan sejarawan jika tidak bisa menguatkan satu riwayat?', 'Menahan diri dan menyatakannya terus terang', ['Memilih secara acak', 'Menghapus semua riwayat', 'Mengarang riwayat baru']],
  ],
  [
    [
      ['وَعَرَضَتْ نَتَائِجَهَا عَلَى الْمُشَارِكِينَ لِلتَّحَقُّقِ مِنْ دِقَّتِهَا.', "Wa 'aradhat nata'ijaha 'alal musyarikina lit tahaqquqi min diqqatiha.", 'Dia menunjukkan hasilnya kepada para partisipan untuk memastikan ketepatannya.'],
      ['وَاعْتَرَفَتْ بِأَنَّ نَتَائِجَهَا لَا تُعَمَّمُ عَلَى كُلِّ الْمَدَارِسِ.', "Wa'tarafat bi'anna nata'ijaha la tu'ammamu 'ala kullil madaris.", 'Dia mengakui bahwa hasilnya tidak dapat digeneralisasi ke semua sekolah.'],
    ],
    ['Mengapa peneliti menunjukkan hasilnya kepada partisipan?', 'Untuk memastikan ketepatannya', ['Untuk meminta bayaran', 'Untuk menghibur mereka', 'Untuk menghapus data']],
  ],
  [
    [
      ['وَاخْتِيرَتِ الْعَيِّنَةُ عَشْوَائِيًّا لِتُمَثِّلَ الْمُجْتَمَعَ تَمْثِيلًا جَيِّدًا.', "Wakhtiratil 'ayyinatu 'asywa'iyyan litumatstsilal mujtama'a tamtsilan jayyidan.", 'Sampel dipilih secara acak agar mewakili populasi dengan baik.'],
      ['وَبَلَغَ مُعَامِلُ الثَّبَاتِ لِلِاسْتِبَانَةِ مُسْتَوًى مُرْتَفِعًا.', "Wa balagha mu'amiluts tsabati lil istibanati mustawan murtafi'an.", 'Koefisien reliabilitas kuesioner mencapai tingkat yang tinggi.'],
    ],
    ['Bagaimana sampel dipilih?', 'Secara acak', ['Hanya teman peneliti', 'Hanya mahasiswa terbaik', 'Berdasarkan abjad nama']],
  ],
  [
    [
      ['وَلِلْمُشَارِكِ حَقُّ الِانْسِحَابِ مِنَ الدِّرَاسَةِ فِي أَيِّ وَقْتٍ.', "Wa lil musyariki haqqul insihabi minad dirasati fi ayyi waqt.", 'Partisipan berhak mengundurkan diri dari penelitian kapan saja.'],
      ['وَتُرَاجِعُ لَجْنَةُ الْأَخْلَاقِيَّاتِ خُطَّةَ الْبَحْثِ قَبْلَ الْبَدْءِ.', "Wa turaji'u lajnatul akhlaqiyyati khuththatal bahtsi qablal bad'.", 'Komite etik meninjau rencana penelitian sebelum dimulai.'],
    ],
    ['Siapa yang meninjau rencana penelitian sebelum dimulai?', 'Komite etik', ['Penerbit jurnal', 'Para partisipan', 'Bagian keuangan']],
  ],
  [
    [
      ['وَتَعْرِضُ الْخَاتِمَةُ أَهَمَّ النَّتَائِجِ وَالتَّوْصِيَاتِ بِإِيجَازٍ.', "Wa ta'ridhul khatimatu ahamman nata'iji wat taushiyati bi'ijaz.", 'Penutup menyajikan hasil dan rekomendasi terpenting secara ringkas.'],
      ['وَيُرَاجِعُ الْكَاتِبُ لُغَةَ الْمَقَالِ قَبْلَ إِرْسَالِهِ.', "Wa yuraji'ul katibu lughatal maqali qabla irsalih.", 'Penulis memeriksa bahasa makalah sebelum mengirimkannya.'],
    ],
    ['Apa isi bagian penutup makalah?', 'Hasil dan rekomendasi terpenting secara ringkas', ['Biografi penulis', 'Data mentah lengkap', 'Daftar hadir seminar']],
  ],
  [
    [
      ['أَمَّا إِعَادَةُ الصِّيَاغَةِ فَتَكُونُ بِأُسْلُوبِ الْبَاحِثِ نَفْسِهِ.', "Amma i'adatush shiyaghati fatakunu bi'uslubil bahitsi nafsih.", 'Adapun parafrase dilakukan dengan gaya bahasa peneliti sendiri.'],
      ['وَلٰكِنَّهَا تَحْتَاجُ أَيْضًا إِلَى ذِكْرِ الْمَصْدَرِ.', "Walakinnaha tahtaju aidhan ila dzikril mashdar.", 'Namun parafrase juga tetap memerlukan penyebutan sumber.'],
    ],
    ['Apakah parafrase perlu menyebut sumber?', 'Ya, tetap perlu', ['Tidak perlu sama sekali', 'Hanya jika panjang', 'Hanya di seminar']],
  ],
  [
    [
      ['وَنُشِرَتِ الْأَوْرَاقُ الْمَقْبُولَةُ فِي كِتَابِ أَعْمَالِ النَّدْوَةِ.', "Wa nusyiratil auraqul maqbulatu fi kitabi a'malin nadwah.", 'Makalah-makalah yang diterima diterbitkan dalam buku prosiding seminar.'],
      ['وَتَعَرَّفَ الْبَاحِثُونَ الشَّبَابُ إِلَى أَسَاتِذَةٍ مِنْ جَامِعَاتٍ أُخْرَى.', "Wa ta'arrafal bahitsunasy syababu ila asatidzatin min jami'atin ukhra.", 'Para peneliti muda berkenalan dengan dosen-dosen dari universitas lain.'],
    ],
    ['Di mana makalah yang diterima diterbitkan?', 'Buku prosiding seminar', ['Koran harian', 'Majalah anak', 'Papan pengumuman']],
  ],
  [
    [
      ['وَيُرَاعِي الْمُحَلِّلُ الْمَقَامَ وَالْعَلَاقَةَ بَيْنَ الْمُتَكَلِّمِ وَالْمُخَاطَبِ.', "Wa yura'il muhallilul maqama wal 'alaqata bainal mutakallimi wal mukhathab.", 'Analis memperhatikan situasi tutur dan hubungan antara penutur dan mitra tutur.'],
      ['وَتُعَدُّ الْخُطَبُ السِّيَاسِيَّةُ مَادَّةً غَنِيَّةً لِهٰذَا التَّحْلِيلِ.', "Wa tu'addul khuthabus siyasiyyatu maddatan ghaniyyatan lihadzat tahlil.", 'Pidato-pidato politik dianggap bahan yang kaya untuk analisis ini.'],
    ],
    ['Bahan apa yang dianggap kaya untuk analisis wacana?', 'Pidato politik', ['Resep masakan', 'Tabel statistik', 'Peta jalan']],
  ],
  [
    [
      ['وَتُوَسَّمُ الْكَلِمَاتُ فِي الْمُدَوَّنَةِ بِأَقْسَامِهَا الصَّرْفِيَّةِ.', "Wa tuwassamul kalimatu fil mudawwanati bi'aqsamihash sharfiyyah.", 'Kata-kata dalam korpus diberi tanda sesuai kelas morfologisnya.'],
      ['وَيُتِيحُ ذٰلِكَ الْبَحْثَ عَنْ أَنْمَاطٍ نَحْوِيَّةٍ بِسُرْعَةٍ.', "Wa yutihu dzalikal bahtsa 'an anmathin nahwiyyatin bisur'ah.", 'Hal itu memungkinkan pencarian pola-pola gramatikal dengan cepat.'],
    ],
    ['Apa manfaat pemberian tanda kelas kata dalam korpus?', 'Mencari pola gramatikal dengan cepat', ['Mempercantik tampilan teks', 'Menerjemahkan otomatis', 'Mengurangi jumlah kata']],
  ],
  [
    [
      ['وَيُقَارِنُ الْبَاحِثُ بَيْنَ الْمَصَادِرِ لِيَتَأَكَّدَ مِنْ تَوَارِيخِ الْوَفَيَاتِ.', "Wa yuqarinul bahitsu bainal mashadiri liyata'akkada min tawarikhil wafayat.", 'Peneliti membandingkan sumber-sumber untuk memastikan tanggal wafat.'],
      ['فَكَثِيرًا مَا يَخْتَلِفُ الْمُؤَرِّخُونَ فِي سَنَةِ وَفَاةِ الْعَالِمِ.', "Fa katsiran ma yakhtaliful mu'arrikhuna fi sanati wafatil 'alim.", 'Sebab para sejarawan sering berbeda pendapat tentang tahun wafat seorang ulama.'],
    ],
    ['Apa yang sering diperselisihkan para sejarawan menurut teks?', 'Tahun wafat seorang ulama', ['Judul kitab', 'Warna sampul', 'Jumlah murid']],
  ],
  [
    [
      ['وَيَرْبِطُ النَّقْدُ الثَّقَافِيُّ النَّصَّ بِسِيَاقِهِ الِاجْتِمَاعِيِّ وَالتَّارِيخِيِّ.', "Wa yarbithun naqdust tsaqafiyyun nashsha bisiyaqihil ijtima'iyyi wat tarikhiyy.", 'Kritik budaya menghubungkan teks dengan konteks sosial dan sejarahnya.'],
      ['وَلَا تُغْنِي نَظَرِيَّةٌ وَاحِدَةٌ عَنْ غَيْرِهَا فِي فَهْمِ الْأَدَبِ.', "Wa la tughni nazhariyyatun wahidatun 'an ghairiha fi fahmil adab.", 'Tidak ada satu teori pun yang cukup tanpa teori lain dalam memahami sastra.'],
    ],
    ['Dengan apa kritik budaya menghubungkan teks?', 'Konteks sosial dan sejarahnya', ['Harga bukunya', 'Jenis kertasnya', 'Nama percetakannya']],
  ],
  [
    [
      ['وَيُرَكِّزُ الْمُدَرِّسُ عَلَى الْأَخْطَاءِ الْمُتَكَرِّرَةِ لَا الْعَارِضَةِ.', "Wa yurakkizul mudarrisu 'alal akhtha'il mutakarrirati lal 'aridhah.", 'Pengajar berfokus pada kesalahan yang berulang, bukan yang kebetulan.'],
      ['فَالْخَطَأُ الْمُتَكَرِّرُ يَدُلُّ عَلَى قَاعِدَةٍ لَمْ تُكْتَسَبْ بَعْدُ.', "Fal khatha'ul mutakarriru yadullu 'ala qa'idatin lam tuktasab ba'd.", 'Kesalahan yang berulang menunjukkan kaidah yang belum dikuasai.'],
    ],
    ['Apa yang ditunjukkan oleh kesalahan yang berulang?', 'Kaidah yang belum dikuasai', ['Pelajar yang malas', 'Guru yang buruk', 'Buku yang salah cetak']],
  ],
  [
    [
      ['وَبَعْدَ أَشْهُرٍ صَدَرَ الْمَقَالُ فِي الْعَدَدِ الْجَدِيدِ مِنَ الْمَجَلَّةِ.', "Wa ba'da asyhurin shadaral maqalu fil 'adadil jadidi minal majallah.", 'Beberapa bulan kemudian artikel itu terbit di edisi baru jurnal.'],
      ['وَسُرْعَانَ مَا اسْتَشْهَدَ بِهِ بَاحِثُونَ آخَرُونَ فِي أَعْمَالِهِمْ.', "Wa sur'ana mastasyhada bihi bahitsuna akharuna fi a'malihim.", 'Tidak lama kemudian peneliti lain mengutipnya dalam karya-karya mereka.'],
    ],
    ['Apa yang terjadi setelah artikel itu terbit?', 'Peneliti lain mengutipnya', ['Artikel itu ditarik', 'Jurnal itu ditutup', 'Peneliti berhenti meneliti']],
  ],
  [
    [
      ['وَيُشِيرُ إِلَى الْآثَارِ الْعَمَلِيَّةِ لِلنَّتَائِجِ فِي الْمَيْدَانِ.', "Wa yusyiru ilal atsaril 'amaliyyati lin nata'iji fil maidan.", 'Dia menunjukkan dampak praktis hasil penelitian di lapangan.'],
      ['وَيَقْتَرِحُ دِرَاسَاتٍ مُسْتَقْبَلِيَّةً تَسُدُّ مَا بَقِيَ مِنْ ثَغَرَاتٍ.', "Wa yaqtarihu dirasatin mustaqbaliyyatan tasuddu ma baqiya min tsagharat.", 'Dia mengusulkan studi lanjutan untuk menutup celah yang masih tersisa.'],
    ],
    ['Untuk apa peneliti mengusulkan studi lanjutan?', 'Menutup celah yang masih tersisa', ['Mengulang studi yang sama', 'Membantah semua hasil', 'Menambah biaya']],
  ],
  [
    [
      ['ثُمَّ هَنَّأَهُ زُمَلَاؤُهُ وَأُسْرَتُهُ فِي الْقَاعَةِ.', "Tsumma hanna'ahu zumala'uhu wa usratuhu fil qa'ah.", 'Kemudian rekan-rekan dan keluarganya memberinya ucapan selamat di aula.'],
      ['وَأَمْهَلَتْهُ اللَّجْنَةُ شَهْرًا لِتَسْلِيمِ النُّسْخَةِ النِّهَائِيَّةِ.', "Wa amhalathul lajnatu syahran litaslimin nuskhatin niha'iyyah.", 'Komite memberinya waktu satu bulan untuk menyerahkan naskah final.'],
    ],
    ['Berapa lama waktu untuk menyerahkan naskah final?', 'Satu bulan', ['Satu minggu', 'Satu tahun', 'Satu hari']],
  ],
  [
    [
      ['وَيَتَضَمَّنُ الْمُقْتَرَحُ جَدْوَلًا زَمَنِيًّا لِمَرَاحِلِ الْعَمَلِ.', "Wa yatadhammanul muqtarahu jadwalan zamaniyyan limarahilil 'amal.", 'Proposal memuat jadwal waktu untuk tahapan-tahapan pekerjaan.'],
      ['وَيُرْفَقُ بِهِ السِّيرَةُ الذَّاتِيَّةُ لِكُلِّ عُضْوٍ فِي الْفَرِيقِ.', "Wa yurfaqu bihis siratudz dzatiyyatu likulli 'udhwin fil fariq.", 'Riwayat hidup setiap anggota tim dilampirkan bersamanya.'],
    ],
    ['Apa yang dilampirkan bersama proposal?', 'Riwayat hidup setiap anggota tim', ['Foto keluarga', 'Rekening pribadi', 'Ijazah SD saja']],
  ],
  [
    [
      ['وَيُضِيفُ قَائِمَةً بِالْمُؤْتَمَرَاتِ الَّتِي شَارَكَ فِيهَا.', "Wa yudhifu qa'imatan bil mu'tamaratil lati syaraka fiha.", 'Dia menambahkan daftar konferensi yang pernah dia ikuti.'],
      ['وَيَذْكُرُ الطُّلَّابَ الَّذِينَ أَشْرَفَ عَلَى رَسَائِلِهِمْ.', "Wa yadzkuruth thullabal ladzina asyrafa 'ala rasa'ilihim.", 'Dia menyebutkan mahasiswa yang tesisnya pernah dia bimbing.'],
    ],
    ['Siapa yang disebutkan peneliti dalam portofolionya?', 'Mahasiswa yang tesisnya dia bimbing', ['Tetangganya', 'Penjual buku', 'Para wartawan']],
  ],
];
