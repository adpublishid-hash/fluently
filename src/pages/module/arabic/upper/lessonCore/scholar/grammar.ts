import type { LessonCoreTuple } from '../types';

// Grammar Scholar — one entry per lesson (index = lesson - 1).
export const grammar: LessonCoreTuple[] = [
  [['Uslub akademik Arab: kalimat nominal untuk fakta, verbal untuk proses; hindari gaya lisan.', 'Ciri: masdar, pasif, penghubung logis (إِذْ، حَيْثُ، مِمَّا).'], [
    ['الْبَحْثُ الْعِلْمِيُّ عَمَلِيَّةٌ مُنَظَّمَةٌ لِلْوُصُولِ إِلَى الْمَعْرِفَةِ.', "Al-bahtsul 'ilmiyyu 'amaliyyatun munazhzhamatun lil wushuli ilal ma'rifati.", 'Penelitian ilmiah adalah proses terstruktur untuk mencapai pengetahuan.'],
    ['إِذْ يَنْطَلِقُ مِنْ مُشْكِلَةٍ وَيَنْتَهِي بِنَتَائِجَ قَابِلَةٍ لِلتَّحَقُّقِ.', "Idz yanthaliqu min musykilatin wa yantahi binata'ija qabilatin lit tahaqquqi.", 'Karena ia berangkat dari masalah dan berakhir dengan hasil yang dapat diverifikasi.'],
    ['مِمَّا يُمَيِّزُهُ عَنِ التَّأَمُّلِ الْحُرِّ.', "Mimma yumayyizuhu 'anit ta'ammulil hurri.", 'Hal yang membedakannya dari perenungan bebas.'],
    ['حَيْثُ يَخْضَعُ كُلُّ حُكْمٍ فِيهِ لِلدَّلِيلِ.', "Haitsu yakhdha'u kullu hukmin fihi lid dalili.", 'Di mana setiap penilaian di dalamnya tunduk pada bukti.'],
  ]],
  [['Struktur abstrak: fi\'il mudhari\' untuk tujuan, madhi (sering pasif) untuk prosedur dan hasil.', 'Subjek sering الدِّرَاسَةُ/الْبَحْثُ → kata kerja muannats/mudzakkar sesuai.'], [
    ['تَسْعَى الدِّرَاسَةُ إِلَى كَشْفِ أَنْمَاطِ التَّنَاوُبِ اللُّغَوِيِّ.', "Tas'ad dirasatu ila kasyfi anmathit tanawubil lughawiyyi.", 'Studi ini berupaya mengungkap pola alih kode.'],
    ['وَيَسْعَى الْبَحْثُ كَذٰلِكَ إِلَى تَفْسِيرِ دَوَافِعِهِ.', "Wa yas'al bahtsu kadzalika ila tafsiri dawafi'ihi.", 'Penelitian ini juga berupaya menjelaskan motif-motifnya.'],
    ['سُجِّلَتْ عِشْرُونَ مُحَادَثَةً وَفُرِّغَتْ كِتَابِيًّا.', "Sujjilat 'isyruna muhadatsatan wa furrighat kitabiyyan.", 'Dua puluh percakapan direkam dan ditranskripsikan.'],
    ['وَتَبَيَّنَ أَنَّ التَّنَاوُبَ يَكْثُرُ عِنْدَ الْحَدِيثِ عَنِ الدِّينِ.', "Wa tabayyana annat tanawuba yaktsuru 'indal haditsi 'anid dini.", 'Ternyata alih kode sering terjadi saat berbicara tentang agama.'],
  ]],
  [['Jumlah ta\'lil dalam riset: لِأَنَّ، إِذْ، نَظَرًا لِـ، بِسَبَبِ، لِـ + masdar (maf\'ul li ajlih).', 'Maf\'ul li ajlih: اخْتِصَارًا لِلْوَقْتِ = demi menghemat waktu.'], [
    ['اقْتَصَرْنَا عَلَى النُّصُوصِ الْمَنْشُورَةِ نَظَرًا لِصُعُوبَةِ الْوُصُولِ إِلَى الْمَخْطُوطَاتِ.', "Iqtasharna 'alan nushushil mansyurati nazharan lish shu'ubatil wushuli ilal makhthuthati.", 'Kami membatasi pada teks yang sudah terbit mengingat sulitnya mengakses manuskrip.'],
    ['وَاسْتَبْعَدْنَا الشِّعْرَ الْعَامِّيَّ تَوْحِيدًا لِلْمُسْتَوَى اللُّغَوِيِّ.', "Wastab'adnasy syi'ral 'ammiyya tauhidan lil mustawal lughawiyyi.", 'Kami mengecualikan puisi amiyah demi menyeragamkan ragam bahasa.'],
    ['إِذْ إِنَّ الْمُقَارَنَةَ بَيْنَ مُسْتَوَيَيْنِ تُضْعِفُ النَّتَائِجَ.', "Idz innal muqaranata baina mustawayaini tudh'ifun nata'ija.", 'Karena perbandingan antara dua ragam melemahkan hasil.'],
    ['وَرَتَّبْنَا الْبَيَانَاتِ زَمَنِيًّا لِرَصْدِ التَّطَوُّرِ.', "Wa rattabnal bayanati zamaniyyan lirashdit tathawwuri.", 'Kami menyusun data secara kronologis untuk mencatat perkembangan.'],
  ]],
  [['Syarat dalam argumen ilmiah: إِذَا (realistis)، إِنْ (mungkin)، لَوْ (hipotetis) — pilih sesuai kekuatan klaim.', 'Jawab لَوْ dengan لَـ: لَوْ صَحَّ هٰذَا لَتَغَيَّرَ...'], [
    ['إِذَا ثَبَتَ صِدْقُ الْأَدَاةِ أَمْكَنَ تَعْمِيمُ اسْتِخْدَامِهَا.', "Idza tsabata shidqul adati amkana ta'mimustikhdamiha.", 'Jika validitas instrumen terbukti, penggunaannya dapat diperluas.'],
    ['وَإِنْ صَحَّتِ الْفَرَضِيَّةُ فَسَيَتَغَيَّرُ فَهْمُنَا لِلظَّاهِرَةِ.', "Wa in shahhatil faradhiyyatu fasayataghayyaru fahmuna lizh zhahirati.", 'Dan jika hipotesis itu benar, pemahaman kita atas fenomena itu akan berubah.'],
    ['وَلَوْ كَانَتِ الْعَيِّنَةُ أَكْبَرَ لَكَانَتِ النَّتَائِجُ أَدَقَّ.', "Wa lau kanatil 'ayyinatu akbara lakanatin nata'iju adaqqa.", 'Seandainya sampelnya lebih besar, hasilnya akan lebih akurat.'],
    ['تَبْقَى النَّتِيجَةُ أَوَّلِيَّةً مَا لَمْ تُكَرَّرِ التَّجْرِبَةُ.', "Tabqan natijatu awwaliyyatan ma lam tukarraratit tajribatu.", 'Hasilnya tetap bersifat awal selama eksperimen belum diulang.'],
  ]],
  [['Hasr dalam tesis: إِنَّمَا، مَا... إِلَّا، تَقْدِيمُ مَا حَقُّهُ التَّأْخِيرُ — untuk mempertegas klaim sentral.', 'Gunakan hemat: hasr membuat klaim terdengar mutlak.'], [
    ['إِنَّمَا تُفْهَمُ الْقَصِيدَةُ فِي سِيَاقِ عَصْرِهَا.', "Innama tufhamul qashidatu fi siyaqi 'ashriha.", 'Puisi itu hanya dapat dipahami dalam konteks zamannya.'],
    ['مَا الْمُعْجَمُ إِلَّا ذَاكِرَةُ الْجَمَاعَةِ اللُّغَوِيَّةِ.', "Mal mu'jamu illa dzakiratul jama'atil lughawiyyati.", 'Kamus tidak lain adalah ingatan komunitas bahasa.'],
    ['عَلَى النُّصُوصِ اعْتَمَدْنَا، لَا عَلَى الشُّرُوحِ.', "'Alan nushushi'tamadna, la 'alasy syuruhi.", 'Pada teks-teks aslilah kami bersandar, bukan pada syarahnya.'],
    ['وَفِي الْخَاتِمَةِ وَحْدَهَا نَعْرِضُ التَّوْصِيَاتِ.', "Wa fil khatimati wahdaha na'ridhut taushiyati.", 'Hanya di penutup kami memaparkan rekomendasi.'],
  ]],
  [['Taqyid dan ithlaq: batasi klaim dengan sifat, hal, zharaf, atau syarat agar presisi.', 'Klaim mutlak: اللُّغَةُ تَتَغَيَّرُ. Klaim terbatas: اللُّغَةُ الْمَنْطُوقَةُ تَتَغَيَّرُ بِسُرْعَةٍ فِي الْمُدُنِ.'], [
    ['اللُّغَةُ الْمَنْطُوقَةُ تَتَغَيَّرُ أَسْرَعَ مِنَ الْمَكْتُوبَةِ.', "Al-lughatul manthuqatu tataghayyaru asra'a minal maktubati.", 'Bahasa lisan berubah lebih cepat daripada bahasa tulis.'],
    ['وَلَا سِيَّمَا فِي الْمُدُنِ الْكُبْرَى.', "Wa la siyyama fil mudunil kubra.", 'Terutama di kota-kota besar.'],
    ['وَفِي أَوْسَاطِ الشَّبَابِ تَحْدِيدًا.', "Wa fi ausathisy syababi tahdidan.", 'Dan khususnya di kalangan anak muda.'],
    ['وَذٰلِكَ فِي حُدُودِ الْمُدَوَّنَةِ الْمَدْرُوسَةِ.', "Wa dzalika fi hududil mudawwanatil madrusati.", 'Dan hal itu dalam batas korpus yang dikaji.'],
  ]],
  [['Isnad ilmiah: kalimat yang menisbahkan pendapat — نَسَبَهُ إِلَى، يُرْوَى عَنْ، حَكَاهُ، نَقَلَهُ.', 'Kata kerja pasif يُرْوَى/يُحْكَى menandai riwayat yang belum pasti.'], [
    ['نَسَبَ الْمُؤَلِّفُ هٰذَا الرَّأْيَ إِلَى الْكُوفِيِّينَ.', "Nasabal mu'allifu hadzar ra'ya ilal kufiyyina.", 'Penulis menisbahkan pendapat ini kepada ulama Kufah.'],
    ['وَحَكَاهُ ابْنُ الْأَنْبَارِيِّ فِي "الْإِنْصَافِ".', "Wa hakahu Ibnul Anbariyyu fil Inshafi.", 'Dan Ibnul Anbari menceritakannya dalam kitab "al-Inshaf".'],
    ['وَيُرْوَى عَنِ الْكِسَائِيِّ خِلَافُهُ.', "Wa yurwa 'anil Kisa'iyyi khilafuhu.", 'Dan diriwayatkan dari al-Kisa\'i pendapat yang berlawanan.'],
    ['وَنَقَلَهُ الْمُتَأَخِّرُونَ دُونَ تَحْقِيقٍ.', "Wa naqalahul muta'akhkhiruna duna tahqiqin.", 'Dan ulama belakangan menukilnya tanpa verifikasi.'],
  ]],
  [['Rujukan dhamir di paper: pastikan setiap هُوَ/هِيَ/ـهُ/ـهَا jelas rujukannya; ulangi nomina bila ambigu.', 'Paper dengan banyak nomina muannats rawan ambigu (الدِّرَاسَةُ، النَّظَرِيَّةُ، الْعَيِّنَةُ).'], [
    ['قَارَنَتِ الدِّرَاسَةُ النَّظَرِيَّةَ بِالتَّطْبِيقِ، فَوَجَدَتْهَا قَاصِرَةً.', "Qaranatid dirasatun nazhariyyata bit tathbiqi, fawajadat-ha qashiratan.", 'Studi membandingkan teori dengan penerapan, lalu mendapatinya kurang (ambigu: -ha = teori?).'],
    ['وَالْأَوْضَحُ: فَوَجَدَتِ النَّظَرِيَّةَ قَاصِرَةً.', "Wal audhahu: fawajadatin nazhariyyata qashiratan.", 'Yang lebih jelas: lalu mendapati teori itu kurang.'],
    ['وَكَذٰلِكَ: عَدَّلَ الْبَاحِثُ الْأَدَاةَ بَعْدَ تَجْرِيبِهَا.', "Wa kadzalika: 'addalal bahitsul adata ba'da tajribiha.", 'Demikian pula: peneliti merevisi instrumen setelah mengujinya.'],
    ['فَضَمِيرُ "تَجْرِيبِهَا" يَعُودُ عَلَى الْأَدَاةِ بِلَا لَبْسٍ.', "Fadhamiru tajribiha ya'udu 'alal adati bila labsin.", 'Dhamir pada "tajribiha" kembali kepada instrumen tanpa kerancuan.'],
  ]],
  [['Badal dalam definisi: jelaskan istilah dengan badal agar definisi melekat pada kata.', 'Badal kull: الْمُصْطَلَحُ "التَّنَاصُّ"... / badal ba\'dh: قَرَأْتُ الْكِتَابَ نِصْفَهُ.'], [
    ['يَعْتَمِدُ الْبَحْثُ عَلَى مَفْهُومٍ مَرْكَزِيٍّ: التَّنَاصِّ.', "Ya'tamidul bahtsu 'ala mafhumin markaziyyin: at-tanashshi.", 'Penelitian bersandar pada satu konsep sentral: intertekstualitas.'],
    ['أَيْ تَدَاخُلِ النُّصُوصِ بَعْضِهَا فِي بَعْضٍ.', "Ai tadakhulin nushushi ba'dhiha fi ba'dhin.", 'Yakni saling berkelindannya teks satu dengan yang lain.'],
    ['وَقَدْ أَسَّسَتْهُ النَّاقِدَةُ جُولْيَا كْرِيسْتِيفَا.', "Wa qad assasat-hun naqidatu Julya Kristifa.", 'Konsep itu dirumuskan oleh kritikus Julia Kristeva.'],
    ['وَقَرَأْتُ مُعْظَمَ أَعْمَالِهَا، تَرْجَمَاتِهَا الْعَرَبِيَّةَ تَحْدِيدًا.', "Wa qara'tu mu'zhama a'maliha, tarjamatihal 'arabiyyata tahdidan.", 'Saya membaca sebagian besar karyanya, khususnya terjemahan Arabnya.'],
  ]],
  [['Taukid dalam klaim: إِنَّ، لَقَدْ، نَفْسُهُ/عَيْنُهُ، مِمَّا لَا شَكَّ فِيهِ — pakai proporsional.', 'Klaim yang terlalu banyak taukid terdengar defensif.'], [
    ['إِنَّ هٰذِهِ النَّتِيجَةَ تُخَالِفُ الشَّائِعَ.', "Inna hadzihin natijata tukhalifusy sya'i'a.", 'Sesungguhnya hasil ini menyelisihi anggapan umum.'],
    ['وَلَقَدْ تَكَرَّرَتْ فِي الْعَيِّنَتَيْنِ كِلْتَيْهِمَا.', "Wa laqad takarrarat fil 'ayyinataini kiltaihima.", 'Dan sungguh hasil itu berulang pada kedua sampel.'],
    ['وَالْمُؤَلِّفُ نَفْسُهُ أَقَرَّ بِذٰلِكَ فِي طَبْعَةٍ لَاحِقَةٍ.', "Wal mu'allifu nafsuhu aqarra bidzalika fi thab'atin lahiqatin.", 'Pengarangnya sendiri mengakui hal itu dalam cetakan berikutnya.'],
    ['وَمِمَّا لَا شَكَّ فِيهِ أَنَّ الْمَسْأَلَةَ تَسْتَحِقُّ الْمُرَاجَعَةَ.', "Wa mimma la syakka fihi annal mas'alata tastahiqqul muraja'ata.", 'Tidak diragukan lagi bahwa masalah ini layak ditinjau ulang.'],
  ]],
  [['Masdar muawwal akademik: أَنْ/أَنَّ + kalimat ≈ masdar; memadatkan klausa panjang.', 'يَجِبُ أَنْ نُرَاجِعَ = تَجِبُ مُرَاجَعَةُ...'], [
    ['يُلَاحَظُ أَنَّ الْكَاتِبَ يُكْثِرُ مِنَ الِاقْتِبَاسِ.', "Yulahazhu annal katiba yuktsiru minal iqtibasi.", 'Terlihat bahwa penulis banyak mengutip.'],
    ['أَيْ: يُلَاحَظُ إِكْثَارُ الْكَاتِبِ مِنَ الِاقْتِبَاسِ.', "Ai: yulahazhu iktsarul katibi minal iqtibasi.", 'Yakni: terlihat banyaknya kutipan penulis.'],
    ['وَيَنْبَغِي أَنْ يُعَادَ النَّظَرُ فِي التَّصْنِيفِ.', "Wa yanbaghi an yu'adan nazharu fit tashnifi.", 'Seharusnya klasifikasi itu ditinjau kembali.'],
    ['أَيْ: تَنْبَغِي إِعَادَةُ النَّظَرِ فِي التَّصْنِيفِ.', "Ai: tanbaghi i'adatun nazhari fit tashnifi.", 'Yakni: peninjauan ulang klasifikasi itu diperlukan.'],
  ]],
  [['Kohesi sitasi: hubungkan kutipan dengan argumenmu — وَهُوَ مَا... / وَهٰذَا يَتَّفِقُ مَعَ... / بَيْدَ أَنَّ...', 'Jangan menumpuk kutipan tanpa kalimat penghubung.'], [
    ['يَقُولُ الْجَاحِظُ: "الْمَعَانِي مَطْرُوحَةٌ فِي الطَّرِيقِ".', "Yaqulul Jahizh: al-ma'ani mathruhatun fith thariqi.", 'Al-Jahizh berkata: "Makna-makna itu tergeletak di jalan."'],
    ['وَهُوَ مَا يَعْنِي أَنَّ الْفَضْلَ لِلصِّيَاغَةِ لَا لِلْفِكْرَةِ.', "Wa huwa ma ya'ni annal fadhla lish shiyaghati la lil fikrati.", 'Itu berarti keunggulan terletak pada perumusan, bukan pada gagasan.'],
    ['وَهٰذَا يَتَّفِقُ مَعَ نَظَرِيَّةِ النَّظْمِ لَاحِقًا.', "Wa hadza yattafiqu ma'a nazhariyyatin nazhmi lahiqan.", 'Hal ini sejalan dengan teori nazhm di kemudian hari.'],
    ['بَيْدَ أَنَّ الْجُرْجَانِيَّ أَعْطَى الْمَعْنَى دَوْرًا أَكْبَرَ.', "Baida annal Jurjaniyya a'thal ma'na dauran akbara.", 'Namun al-Jurjani memberikan peran yang lebih besar kepada makna.'],
  ]],
  [['Kalimat pasif ilmiah: fokus pada proses, bukan pelaku — أُجْرِيَتْ، طُبِّقَتْ، اسْتُخْدِمَ.', 'Pasif dengan حَرْف jar: اسْتُعِينَ بِـ / أُشِيرَ إِلَى (na\'ib fa\'il = jar-majrur).'], [
    ['أُجْرِيَتِ التَّجْرِبَةُ عَلَى مَدَى فَصْلٍ دِرَاسِيٍّ كَامِلٍ.', "Ujriyatit tajribatu 'ala mada fashlin dirasiyyin kamilin.", 'Eksperimen dilakukan selama satu semester penuh.'],
    ['وَاسْتُعِينَ بِبَرْنَامَجٍ إِحْصَائِيٍّ لِتَحْلِيلِ النَّتَائِجِ.', "Wasta'ina bibarnamajin ihsha'iyyin litahlilin nata'iji.", 'Sebuah program statistik digunakan untuk menganalisis hasil.'],
    ['وَأُشِيرَ إِلَى حُدُودِ الدِّرَاسَةِ فِي الْخَاتِمَةِ.', "Wa usyira ila hududid dirasati fil khatimati.", 'Batasan studi disebutkan di penutup.'],
    ['وَلَمْ يُسْتَبْعَدْ أَيُّ مُشَارِكٍ مِنَ التَّحْلِيلِ.', "Wa lam yustab'ad ayyu musyarikin minat tahlili.", 'Tidak ada partisipan yang dikeluarkan dari analisis.'],
  ]],
  [['Nominalisasi Arab: ubah kalimat verbal menjadi frasa masdar untuk padat dan formal.', 'Perhatikan i\'rab setelah masdar: masdar + fa\'il (idhafah) + maf\'ul (manshub/لِـ).'], [
    ['تَحْلِيلُ الْبَاحِثِ النُّصُوصَ كَشَفَ أَنْمَاطًا جَدِيدَةً.', "Tahlilul bahitsin nushusha kasyafa anmathan jadidatan.", 'Analisis peneliti terhadap teks-teks itu mengungkap pola-pola baru.'],
    ['وَتَطْبِيقُ النَّمُوذَجِ عَلَى الْمُدَوَّنَةِ أَكَّدَ صَلَاحِيَّتَهُ.', "Wa tathbiqun namudzaji 'alal mudawwanati akkada shalahiyyatahu.", 'Penerapan model pada korpus menegaskan kelayakannya.'],
    ['وَإِهْمَالُ السِّيَاقِ يُؤَدِّي إِلَى سُوءِ التَّأْوِيلِ.', "Wa ihmalus siyaqi yu'addi ila su'it ta'wili.", 'Pengabaian konteks menyebabkan kesalahan penafsiran.'],
    ['وَمُرَاجَعَةُ الْمُحَكِّمِينَ لِلْبَحْثِ حَسَّنَتْ مَنْهَجَهُ.', "Wa muraja'atul muhakkimina lil bahtsi hassanat manhajahu.", 'Telaah para penilai terhadap penelitian itu memperbaiki metodenya.'],
  ]],
  [['Parsing footnote: analisis struktur catatan kaki — sering berupa kalimat elips (حَذْفُ الْمُبْتَدَأِ/الْفِعْلِ).', 'يُنْظَرُ = fi\'il pasif; الْمَرْجِعُ السَّابِقُ = khabar dari mubtada\' terbuang (هُوَ).'], [
    ['يُنْظَرُ: الْمَصْدَرُ نَفْسُهُ.', "Yunzharu: al-mashdaru nafsuhu.", 'Lihat: sumber yang sama.'],
    ['فَـ"الْمَصْدَرُ" نَائِبُ فَاعِلٍ، وَ"نَفْسُهُ" تَوْكِيدٌ مَعْنَوِيٌّ.', "Fal mashdaru na'ibu fa'ilin, wa nafsuhu taukidun ma'nawiyyun.", '"Al-mashdar" adalah na\'ib fa\'il, dan "nafsuhu" adalah taukid maknawi.'],
    ['السَّابِقُ، ص٣٠: أَيْ هٰذَا مَنْقُولٌ مِنَ الْمَرْجِعِ السَّابِقِ.', "As-sabiq, shafhah 30: ai hadza manqulun minal marji'is sabiqi.", 'Sebelumnya, hlm. 30: yakni ini dikutip dari rujukan sebelumnya.'],
    ['فَفِي الْحَاشِيَةِ حَذْفٌ يُقَدَّرُ مِنَ السِّيَاقِ.', "Fafil hasyiyati hadzfun yuqaddaru minas siyaqi.", 'Di catatan kaki ada penghilangan yang diperkirakan dari konteks.'],
  ]],
  [['Balaghah akademik: gunakan tasybih dan isti\'arah hemat untuk menjelaskan konsep abstrak.', 'Hindari hiasan yang mengaburkan presisi; satu metafora kuat cukup.'], [
    ['الْمَنْهَجُ لِلْبَاحِثِ كَالْبُوصَلَةِ لِلْمُسَافِرِ.', "Al-manhaju lil bahitsi kal bushalati lil musafiri.", 'Metode bagi peneliti seperti kompas bagi musafir.'],
    ['يَدُلُّهُ وَلَا يَسِيرُ عَنْهُ.', "Yadulluhu wa la yasiru 'anhu.", 'Ia menunjukkan arah, tetapi tidak berjalan menggantikannya.'],
    ['وَالْمُدَوَّنَةُ مَنْجَمٌ لَمْ تُسْتَخْرَجْ كُنُوزُهُ بَعْدُ.', "Wal mudawwanatu manjamun lam tustakhraj kunuzuhu ba'du.", 'Korpus itu tambang yang harta karunnya belum digali.'],
    ['وَهِيَ اسْتِعَارَةٌ تَصْرِيحِيَّةٌ تُقَرِّبُ الْفِكْرَةَ لِلْقَارِئِ.', "Wa hiya isti'aratun tashrihiyyatun tuqarribul fikrata lil qari'i.", 'Itu adalah isti\'arah tashrihiyyah yang mendekatkan gagasan kepada pembaca.'],
  ]],
  [['Uslub tarjih riset: pola memilih pendapat terkuat — وَالرَّاجِحُ، وَالْأَوْلَى، وَهُوَ الْأَقْرَبُ لِـ.', 'Sebutkan alasan tarjih: kekuatan dalil, kesesuaian konteks, dukungan data.'], [
    ['وَالرَّاجِحُ عِنْدَنَا الرَّأْيُ الثَّانِي.', "War rajihu 'indanar ra'yuts tsani.", 'Yang lebih kuat menurut kami adalah pendapat kedua.'],
    ['لِقُوَّةِ شَوَاهِدِهِ وَكَثْرَتِهَا.', "Liquwwati syawahidihi wa katsratiha.", 'Karena kuat dan banyaknya bukti yang mendukungnya.'],
    ['وَهُوَ الْأَقْرَبُ لِطَبِيعَةِ اللُّغَةِ.', "Wa huwal aqrabu lithabi'atil lughati.", 'Dan itu yang paling dekat dengan tabiat bahasa.'],
    ['وَالْأَوْلَى عَدَمُ الْجَزْمِ حَتَّى تَكْتَمِلَ الْأَدِلَّةُ.', "Wal aula 'adamul jazmi hatta taktamilal adillatu.", 'Yang lebih utama adalah tidak memastikan sampai bukti-bukti lengkap.'],
  ]],
  [['Transformasi kutipan: ubah kutipan langsung menjadi tidak langsung — dhamir, kala, dan أَنَّ.', 'Langsung: قَالَ: "أَنَا أُخَالِفُهُمْ". Tidak langsung: ذَكَرَ أَنَّهُ يُخَالِفُهُمْ.'], [
    ['قَالَ الْمُؤَلِّفُ: "أَنَا لَا أَرَى هٰذَا الرَّأْيَ".', "Qalal mu'allifu: ana la ara hadzar ra'ya.", 'Pengarang berkata: "Saya tidak berpendapat demikian."'],
    ['ذَكَرَ الْمُؤَلِّفُ أَنَّهُ لَا يَرَى ذٰلِكَ الرَّأْيَ.', "Dzakaral mu'allifu annahu la yara dzalikar ra'ya.", 'Pengarang menyebutkan bahwa ia tidak berpendapat demikian.'],
    ['وَسَأَلَ: "هَلْ دَرَسْتُمُ النُّسَخَ كُلَّهَا؟"', "Wa sa'ala: hal darastumun nusakha kullaha?", 'Ia bertanya: "Apakah kalian sudah mengkaji semua naskah?"'],
    ['فَسَأَلَ عَمَّا إِذَا كَانُوا قَدْ دَرَسُوا النُّسَخَ كُلَّهَا.', "Fasa'ala 'amma idza kanu qad darasun nusakha kullaha.", 'Ia bertanya apakah mereka sudah mengkaji semua naskah.'],
  ]],
  [['I\'rab paper mini: urai satu paragraf abstrak — posisi tiap kata dan alasan harakatnya.', 'Fokus: masdar beramal, na\'ib fa\'il, hal, maf\'ul li ajlih.'], [
    ['اسْتُخْدِمَ الْمَنْهَجُ الْوَصْفِيُّ تَحْقِيقًا لِأَهْدَافِ الْبَحْثِ.', "Ustukhdimal manhajul washfiyyu tahqiqan li ahdafil bahtsi.", 'Metode deskriptif digunakan untuk mencapai tujuan penelitian.'],
    ['"الْمَنْهَجُ" نَائِبُ فَاعِلٍ مَرْفُوعٌ، وَ"الْوَصْفِيُّ" نَعْتٌ لَهُ.', "Al-manhaju na'ibu fa'ilin marfu'un, wal washfiyyu na'tun lahu.", '"Al-manhaju" adalah na\'ib fa\'il yang marfu\', dan "al-washfiyyu" sifatnya.'],
    ['وَ"تَحْقِيقًا" مَفْعُولٌ لِأَجْلِهِ مَنْصُوبٌ.', "Wa tahqiqan maf'ulun li ajlihi manshubun.", '"Tahqiqan" adalah maf\'ul li ajlih yang manshub.'],
    ['وَ"لِأَهْدَافِ" جَارٌّ وَمَجْرُورٌ مُتَعَلِّقٌ بِالْمَصْدَرِ.', "Wa li ahdafi jarrun wa majrurun muta'alliqun bil mashdari.", '"Li ahdafi" adalah jar-majrur yang terkait dengan masdar.'],
  ]],
  [['Portfolio grammar scholar: analisis gramatikal atas satu artikel jurnal Arab — pola, pilihan, efek.', 'Tunjukkan bagaimana tata bahasa melayani presisi dan kekuatan argumen.'], [
    ['حَلَّلْتُ مَقَالًا مُحَكَّمًا تَحْلِيلًا نَحْوِيًّا بَلَاغِيًّا.', "Hallaltu maqalan muhakkaman tahlilan nahwiyyan balaghiyyan.", 'Saya menganalisis sebuah artikel jurnal secara nahwu dan balaghah.'],
    ['فَوَجَدْتُ الْمَبْنِيَّ لِلْمَجْهُولِ فِي ثُلُثِ أَفْعَالِهِ.', "Fawajadtul mabniyya lil majhuli fi tsulutsi af'alihi.", 'Saya mendapati bentuk pasif pada sepertiga kata kerjanya.'],
    ['وَالْمَصَادِرَ تَحْمِلُ أَغْلَبَ الْمَعْلُومَاتِ.', "Wal mashadira tahmilu aghlabal ma'lumati.", 'Dan masdar membawa sebagian besar informasinya.'],
    ['مِمَّا يَمْنَحُ النَّصَّ طَابَعًا مَوْضُوعِيًّا مُكَثَّفًا.', "Mimma yamnahun nashsha thabi'an maudhu'iyyan mukatstsafan.", 'Hal yang memberi teks karakter objektif dan padat.'],
  ]],
];
