import type { LessonCoreTuple } from '../types';

// Kitabah C1 — one entry per lesson (index = lesson - 1).
export const kitabah: LessonCoreTuple[] = [
  [['Esai akademik C1: pendahuluan memuat konteks, celah, pertanyaan, dan peta esai.', 'Peta esai: يَتَنَاوَلُ الْقِسْمُ الْأَوَّلُ... ثُمَّ يُنَاقِشُ الثَّانِي...'], [
    ['شَهِدَتِ الْعُقُودُ الْأَخِيرَةُ اهْتِمَامًا مُتَزَايِدًا بِتَعْلِيمِ الْعَرَبِيَّةِ لِغَيْرِ النَّاطِقِينَ بِهَا.', "Syahidatil 'uqudul akhiratu ihtimaman mutazayidan bita'limil 'arabiyyati lighairin nathiqina biha.", 'Dekade-dekade terakhir menyaksikan perhatian yang makin besar pada pengajaran bahasa Arab bagi penutur asing.'],
    ['غَيْرَ أَنَّ الدِّرَاسَاتِ الَّتِي تَنَاوَلَتِ الْمُتَعَلِّمِينَ الْإِنْدُونِيسِيِّينَ قَلِيلَةٌ.', "Ghaira annad dirasatil lati tanawalatil muta'allimina indunisiyyina qalilatun.", 'Namun penelitian yang membahas pembelajar Indonesia masih sedikit.'],
    ['يَتَنَاوَلُ الْقِسْمُ الْأَوَّلُ الْإِطَارَ النَّظَرِيَّ.', "Yatanawalul qismul awwalul itharan nazhariyya.", 'Bagian pertama membahas kerangka teoretis.'],
    ['ثُمَّ يُنَاقِشُ الثَّانِي نَتَائِجَ الِاسْتِبَانَةِ.', "Tsumma yunaqisyuts tsani nata'ijal istibanati.", 'Kemudian bagian kedua membahas hasil kuesioner.'],
  ]],
  [['Artikel opini panjang: hook, tesis, 3 argumen dengan bukti, bantahan, penutup berkesan.', 'Variasikan panjang kalimat: kalimat pendek untuk penekanan.'], [
    ['كُلَّ صَبَاحٍ يَقِفُ مَلَايِينُ النَّاسِ فِي زَحْمَةٍ لَا تَنْتَهِي.', "Kulla shabahin yaqifu malayinun nasi fi zahmatin la tantahi.", 'Setiap pagi jutaan orang terjebak dalam kemacetan yang tak berujung.'],
    ['السَّاعَاتُ تَضِيعُ. الْأَعْصَابُ تَتَوَتَّرُ. وَالْهَوَاءُ يَفْسُدُ.', "As-sa'atu tadhi'u. Al-a'shabu tatawattaru. Wal hawa'u yafsudu.", 'Waktu terbuang. Saraf menegang. Dan udara tercemar.'],
    ['وَالْحَلُّ لَيْسَ طُرُقًا أَعْرَضَ، بَلْ مُدُنًا أَذْكَى.', "Wal hallu laisa thuruqan a'radha, bal mudunan adzka.", 'Solusinya bukan jalan yang lebih lebar, melainkan kota yang lebih cerdas.'],
    ['فَالْمَدِينَةُ الَّتِي تُحِبُّ سُكَّانَهَا تُقَرِّبُ مِنْهُمْ حَاجَاتِهِمْ.', 'Fal madinatul lati tuhibbu sukkanaha tuqarribu minhum hajatihim.', 'Kota yang mencintai penduduknya mendekatkan kebutuhan mereka.'],
  ]],
  [['Policy brief: masalah (1 paragraf), opsi (tabel), rekomendasi (berbutir), biaya.', 'Tulis untuk pembuat keputusan yang sibuk: kalimat pendek, poin tegas.'], [
    ['الْمُشْكِلَةُ: تَسَرُّبُ ثَلَاثِينَ فِي الْمِئَةِ مِنْ طُلَّابِ الْقُرَى.', "Al-musykilatu: tasarrubu tsalatsina fil mi'ah min thullabil qura.", 'Masalah: tiga puluh persen siswa desa putus sekolah.'],
    ['الْخِيَارُ الْأَوَّلُ: حَافِلَاتٌ مَدْرَسِيَّةٌ مَجَّانِيَّةٌ.', 'Al-khiyarul awwalu: hafilatun madrasiyyatun majjaniyyatun.', 'Opsi pertama: bus sekolah gratis.'],
    ['الْخِيَارُ الثَّانِي: مِنَحٌ نَقْدِيَّةٌ مَشْرُوطَةٌ بِالْحُضُورِ.', 'Al-khiyarut tsani: minahun naqdiyyatun masyruthatun bil hudhuri.', 'Opsi kedua: bantuan tunai bersyarat kehadiran.'],
    ['التَّوْصِيَةُ: الْبَدْءُ بِالْخِيَارِ الثَّانِي فِي ثَلَاثِ مُحَافَظَاتٍ.', "At-taushiyatu: al-bad'u bil khiyarits tsani fi tsalatsi muhafazhatin.", 'Rekomendasi: memulai opsi kedua di tiga provinsi.'],
  ]],
  [['Laporan analitis: bukan hanya "apa" tetapi "mengapa" dan "lalu apa".', 'Struktur tiap temuan: data → interpretasi → implikasi.'], [
    ['ارْتَفَعَتْ شِكَايَاتُ الْعُمَلَاءِ بِنِسْبَةِ عِشْرِينَ فِي الْمِئَةِ.', "Irtafa'at syikayatul 'umala'i binisbati 'isyrina fil mi'ah.", 'Keluhan pelanggan naik sebesar dua puluh persen.'],
    ['وَيُعْزَى ذٰلِكَ أَسَاسًا إِلَى تَغْيِيرِ نِظَامِ الدَّفْعِ.', "Wa yu'za dzalika asasan ila taghyiri nizhamid daf'i.", 'Hal itu terutama disebabkan oleh perubahan sistem pembayaran.'],
    ['مِمَّا يُشِيرُ إِلَى ضَعْفِ التَّوَاصُلِ قَبْلَ التَّطْبِيقِ.', 'Mimma yusyiru ila dha\'fit tawashuli qablat tathbiqi.', 'Yang menunjukkan lemahnya komunikasi sebelum penerapan.'],
    ['وَيَسْتَدْعِي ذٰلِكَ خُطَّةً تَوْعَوِيَّةً عَاجِلَةً.', "Wa yastad'i dzalika khuththatan tau'awiyyatan 'ajilatan.", 'Dan itu menuntut rencana sosialisasi yang mendesak.'],
  ]],
  [['Tanggapan kritis C1: ringkas adil, evaluasi metode dan asumsi, tawarkan pembacaan alternatif.', 'Frasa: وَإِنْ كُنْتُ أَتَّفِقُ مَعَ الْكَاتِبِ فِي... فَإِنِّي أَخْتَلِفُ مَعَهُ فِي...'], [
    ['وَإِنْ كُنْتُ أَتَّفِقُ مَعَ الْكَاتِبِ فِي تَشْخِيصِ الْمُشْكِلَةِ.', "Wa in kuntu attafiqu ma'al katibi fi tasykhishil musykilati.", 'Meskipun saya sependapat dengan penulis dalam mendiagnosis masalah.'],
    ['فَإِنِّي أَخْتَلِفُ مَعَهُ فِي تَفْسِيرِ أَسْبَابِهَا.', "Fa inni akhtalifu ma'ahu fi tafsiri asbabiha.", 'Saya berbeda dengannya dalam menafsirkan penyebabnya.'],
    ['إِذْ يَفْتَرِضُ ضِمْنِيًّا أَنَّ السُّوقَ تُصَحِّحُ نَفْسَهَا.', 'Idz yaftaridhu dhimniyyan annas suqa tushahhihu nafsaha.', 'Karena ia secara implisit mengasumsikan bahwa pasar mengoreksi dirinya sendiri.'],
    ['وَيُمْكِنُ قِرَاءَةُ الْبَيَانَاتِ نَفْسِهَا قِرَاءَةً مُعَاكِسَةً.', "Wa yumkinu qira'atul bayanati nafsiha qira'atan mu'akisatan.", 'Data yang sama dapat dibaca dengan tafsiran sebaliknya.'],
  ]],
  [['Sintesis dua sumber: organisasi tematik, bukan sumber per sumber.', 'Atribusi jelas: يُؤَكِّدُ (أ)... فِي حِينِ يُضِيفُ (ب)...'], [
    ['يُؤَكِّدُ الْمَصْدَرُ الْأَوَّلُ أَهَمِّيَّةَ اللَّعِبِ فِي نُمُوِّ الطِّفْلِ.', "Yu'akkidul mashdarul awwalu ahammiyyatal la'ibi fi numuwwith thifli.", 'Sumber pertama menegaskan pentingnya bermain bagi perkembangan anak.'],
    ['فِي حِينِ يُضِيفُ الثَّانِي بُعْدًا لُغَوِيًّا لِهٰذَا الدَّوْرِ.', "Fi hini yudhifuts tsani bu'dan lughawiyyan lihadzad daur.", 'Sementara yang kedua menambahkan dimensi bahasa pada peran ini.'],
    ['وَيَتَّفِقَانِ عَلَى أَنَّ السَّنَوَاتِ الْخَمْسَ الْأُولَى حَاسِمَةٌ.', "Wa yattafiqani 'ala annas sanawatil khamsal ula hasimatun.", 'Keduanya sepakat bahwa lima tahun pertama sangat menentukan.'],
    ['وَيَخْتَلِفَانِ فِي تَقْدِيرِ دَوْرِ الشَّاشَاتِ.', 'Wa yakhtalifani fi taqdiri dauris syasyati.', 'Dan keduanya berbeda dalam menilai peran layar.'],
  ]],
  [['Proposal akademik: judul, latar, rumusan masalah, tujuan, metode, jadwal, rujukan.', 'Tujuan ditulis terukur: تَهْدِفُ الدِّرَاسَةُ إِلَى قِيَاسِ... / رَصْدِ... / مُقَارَنَةِ...'], [
    ['عُنْوَانُ الْبَحْثِ: أَثَرُ الْقِرَاءَةِ الْمُوَسَّعَةِ فِي الطَّلَاقَةِ الْكِتَابِيَّةِ.', "'Unwanul bahtsi: atsarul qira'atil muwassa'ati fith thalaqatil kitabiyyati.", 'Judul penelitian: pengaruh membaca ekstensif terhadap kelancaran menulis.'],
    ['تَهْدِفُ الدِّرَاسَةُ إِلَى قِيَاسِ التَّغَيُّرِ خِلَالَ فَصْلٍ دِرَاسِيٍّ.', 'Tahdifud dirasatu ila qiyasit taghayyuri khilala fashlin dirasiyyin.', 'Penelitian bertujuan mengukur perubahan selama satu semester.'],
    ['وَسَتَعْتَمِدُ عَلَى اخْتِبَارٍ قَبْلِيٍّ وَبَعْدِيٍّ لِمَجْمُوعَتَيْنِ.', "Wa sata'tamidu 'alakhtibarin qabliyyin wa ba'diyyin limajmu'ataini.", 'Dan akan menggunakan pre-test dan post-test untuk dua kelompok.'],
    ['وَيُتَوَقَّعُ الِانْتِهَاءُ مِنْهَا فِي سِتَّةِ أَشْهُرٍ.', "Wa yutawaqqa'ul intiha'u minha fi sittati asyhurin.", 'Penelitian diperkirakan selesai dalam enam bulan.'],
  ]],
  [['Surat formal lanjutan: bahasa diplomatis untuk menolak, meminta ulang, atau menegosiasi.', 'Penolakan halus: يُؤْسِفُنَا إِبْلَاغُكُمْ بِتَعَذُّرِ...'], [
    ['يُؤْسِفُنَا إِبْلَاغُكُمْ بِتَعَذُّرِ قَبُولِ الْعَرْضِ فِي صِيغَتِهِ الْحَالِيَّةِ.', "Yu'sifuna iblaghukum bita'adzdzuri qabulil 'ardhi fi shighatihil haliyyati.", 'Dengan menyesal kami beri tahu bahwa penawaran tidak dapat diterima dalam bentuknya saat ini.'],
    ['مَعَ تَقْدِيرِنَا الْكَبِيرِ لِلْجُهْدِ الْمَبْذُولِ فِي إِعْدَادِهِ.', "Ma'a taqdirinal kabiri lil juhdil mabdzuli fi i'dadihi.", 'Dengan penghargaan besar kami atas upaya dalam menyiapkannya.'],
    ['وَنَأْمُلُ أَنْ تَتَكَرَّمُوا بِتَعْدِيلِ الْبَنْدِ الْخَامِسِ.', "Wa na'mulu an tatakarramu bita'dilil bandil khamisi.", 'Dan kami berharap Anda berkenan mengubah butir kelima.'],
    ['وَنَبْقَى عَلَى اسْتِعْدَادٍ تَامٍّ لِمُوَاصَلَةِ الْحِوَارِ.', "Wa nabqa 'ala isti'dadin tammin limuwashalatil hiwari.", 'Dan kami tetap siap sepenuhnya untuk melanjutkan dialog.'],
  ]],
  [['Editorial mini (250 kata): posisi tegas sejak kalimat pertama, satu argumen utama, seruan akhir.', 'Gunakan "kita" untuk mengajak pembaca berpihak.'], [
    ['لَا يَحْتَمِلُ التَّعْلِيمُ مَزِيدًا مِنَ التَّجَارِبِ الْمُرْتَجَلَةِ.', "La yahtamilut ta'limu mazidan minat tajaribil murtajalati.", 'Pendidikan tidak sanggup menanggung lebih banyak eksperimen dadakan.'],
    ['فَكُلُّ وَزِيرٍ جَدِيدٍ يَأْتِي بِمَنْهَجٍ جَدِيدٍ.', "Fakullu wazirin jadidin ya'ti bimanhajin jadidin.", 'Setiap menteri baru datang dengan kurikulum baru.'],
    ['وَيَدْفَعُ أَبْنَاؤُنَا ثَمَنَ هٰذَا الِاضْطِرَابِ.', "Wa yadfa'u abna'una tsamana hadzal idhthirabi.", 'Dan anak-anak kita menanggung akibat kekacauan ini.'],
    ['آنَ الْأَوَانُ لِرُؤْيَةٍ وَطَنِيَّةٍ ثَابِتَةٍ تَتَجَاوَزُ الْحُكُومَاتِ.', "Anal awanu liru'yatin wathaniyyatin tsabitatin tatajawazul hukumati.", 'Sudah saatnya ada visi nasional yang tetap, melampaui pemerintahan.'],
  ]],
  [['Resensi kritis C1: posisikan karya dalam tradisi bidangnya dan nilai orisinalitasnya.', 'Bedakan "ringkasan" (sedikit) dan "evaluasi" (banyak).'], [
    ['يَأْتِي هٰذَا الْعَمَلُ امْتِدَادًا لِتَقْلِيدِ الرِّوَايَةِ التَّارِيخِيَّةِ.', "Ya'ti hadzal 'amalu imtidadan litaqlidir riwayatit tarikhiyyati.", 'Karya ini datang sebagai kelanjutan tradisi novel sejarah.'],
    ['لٰكِنَّهُ يَتَمَيَّزُ بِتَعَدُّدِ الْأَصْوَاتِ السَّرْدِيَّةِ.', "Lakinnahu yatamayyazu bita'addudil ashwatis sardiyyati.", 'Tetapi ia unggul dengan banyaknya suara naratif.'],
    ['وَقَدْ نَجَحَ الْكَاتِبُ فِي إِحْيَاءِ لُغَةِ الْعَصْرِ دُونَ تَكَلُّفٍ.', "Wa qad najahal katibu fi ihya'i lughatil 'ashri duna takallufin.", 'Penulis berhasil menghidupkan bahasa zamannya tanpa dibuat-buat.'],
    ['وَإِنْ أَطَالَ فِي الْوَصْفِ أَحْيَانًا عَلَى حِسَابِ الْحَدَثِ.', "Wa in athala fil washfi ahyanan 'ala hisabil hadatsi.", 'Meskipun kadang terlalu panjang dalam deskripsi dengan mengorbankan alur.'],
  ]],
  [['Analisis data naratif: ubah angka menjadi cerita bermakna tanpa mengubah fakta.', 'Mulai dengan temuan paling mengejutkan, lalu jelaskan.'], [
    ['الْمُفَاجَأَةُ الْكُبْرَى فِي الْبَيَانَاتِ أَنَّ كِبَارَ السِّنِّ أَكْثَرُ اسْتِخْدَامًا لِلتَّطْبِيقِ.', "Al-mufaja'atul kubra fil bayanati anna kibaras sinni aktsarustikhdaman lit tathbiqi.", 'Kejutan terbesar dalam data adalah bahwa lansia lebih banyak menggunakan aplikasi itu.'],
    ['وَيُفَسَّرُ ذٰلِكَ بِوَفْرَةِ وَقْتِ الْفَرَاغِ لَدَيْهِمْ.', 'Wa yufassaru dzalika biwafrati waqtil faraghi ladaihim.', 'Hal itu dijelaskan oleh banyaknya waktu luang mereka.'],
    ['أَمَّا الشَّبَابُ فَيَسْتَخْدِمُونَهُ بِكَثَافَةٍ فِي أَوْقَاتٍ قَصِيرَةٍ.', "Ammasy syababu fayastakhdimunahu bikatsafatin fi auqatin qashiratin.", 'Adapun pemuda menggunakannya secara intens dalam waktu singkat.'],
    ['وَهٰذَا يُغَيِّرُ تَصَوُّرَنَا عَنِ الْجُمْهُورِ الْمُسْتَهْدَفِ.', 'Wa hadza yughayyiru tashawwurana \'anil jumhuril mustahdafi.', 'Dan ini mengubah gambaran kita tentang audiens sasaran.'],
  ]],
  [['Counterargument kuat: sajikan keberatan terkuat (steelman), lalu jawab dengan bukti.', 'Frasa: وَأَقْوَى مَا يُعْتَرَضُ بِهِ عَلَى هٰذَا الرَّأْيِ... وَالْجَوَابُ...'], [
    ['وَأَقْوَى مَا يُعْتَرَضُ بِهِ عَلَى هٰذَا الرَّأْيِ ارْتِفَاعُ التَّكْلِفَةِ.', "Wa aqwa ma yu'taradhu bihi 'ala hadzar ra'yirtifa'ut taklifati.", 'Keberatan terkuat terhadap pendapat ini adalah tingginya biaya.'],
    ['وَهُوَ اعْتِرَاضٌ جَادٌّ يَسْتَحِقُّ النَّظَرَ.', "Wa huwa i'tiradhun jaddun yastahiqqun nazhara.", 'Dan itu keberatan serius yang layak dipertimbangkan.'],
    ['وَالْجَوَابُ أَنَّ التَّكْلِفَةَ تُسْتَرَدُّ خِلَالَ خَمْسِ سَنَوَاتٍ.', 'Wal jawabu annat taklifata tustaraddu khilala khamsi sanawatin.', 'Jawabannya, biaya itu kembali dalam lima tahun.'],
    ['كَمَا تُثْبِتُهُ تَجْرِبَةُ مَدِينَتَيْنِ مُمَاثِلَتَيْنِ.', "Kama tutsbituhu tajribatu madinataini mumatsilataini.", 'Sebagaimana dibuktikan oleh pengalaman dua kota serupa.'],
  ]],
  [['Refleksi profesional: situasi kerja nyata → keputusan → akibat → pelajaran untuk praktik.', 'Jujur tentang kesalahan menunjukkan kedewasaan profesional.'], [
    ['وَاجَهْتُ الْعَامَ الْمَاضِي قَرَارًا صَعْبًا بِشَأْنِ مَشْرُوعٍ مُتَعَثِّرٍ.', "Wajahtul 'amal madhi qararan sha'ban bisya'ni masyru'in muta'atstsirin.", 'Tahun lalu saya menghadapi keputusan sulit terkait proyek yang tersendat.'],
    ['وَقَرَّرْتُ الِاسْتِمْرَارَ رَغْمَ الْمُؤَشِّرَاتِ السَّلْبِيَّةِ.', "Wa qarrartul istimrara raghmal mu'asysyiratis salbiyyati.", 'Saya memutuskan untuk melanjutkan meskipun ada indikator negatif.'],
    ['وَكَانَ ذٰلِكَ خَطَأً كَلَّفَ الْفَرِيقَ أَشْهُرًا إِضَافِيَّةً.', "Wa kana dzalika khatha'an kallafal fariqa asyhuran idhafiyyatan.", 'Dan itu kesalahan yang merugikan tim berbulan-bulan tambahan.'],
    ['تَعَلَّمْتُ أَنْ أُقَيِّمَ الْمَشَارِيعَ بِالْبَيَانَاتِ لَا بِالْعَاطِفَةِ.', "Ta'allamtu an uqayyimal masyari'a bil bayanati la bil 'athifati.", 'Saya belajar menilai proyek dengan data, bukan dengan emosi.'],
  ]],
  [['Ringkasan eksekutif: satu halaman, ditulis terakhir, bisa dibaca tanpa dokumen lengkap.', 'Urutan: tujuan, temuan kunci, rekomendasi, kebutuhan keputusan.'], [
    ['يُلَخِّصُ هٰذَا التَّقْرِيرُ نَتَائِجَ تَقْيِيمِ بَرْنَامَجِ التَّدْرِيبِ.', "Yulakhkhishu hadzat taqriru nata'ija taqyimi barnamajit tadribi.", 'Laporan ini merangkum hasil evaluasi program pelatihan.'],
    ['أَبْرَزُ النَّتَائِجِ: تَحَسُّنُ الْأَدَاءِ بِنِسْبَةِ خَمْسَةَ عَشَرَ فِي الْمِئَةِ.', "Abrazun nata'iji: tahassunul ada'i binisbati khamsata 'asyara fil mi'ah.", 'Temuan utama: peningkatan kinerja sebesar lima belas persen.'],
    ['نُوصِي بِتَعْمِيمِ الْبَرْنَامَجِ عَلَى الْفُرُوعِ كَافَّةً.', "Nushi bita'mimil barnamaji 'alal furu'i kaffatan.", 'Kami merekomendasikan perluasan program ke semua cabang.'],
    ['وَيَتَطَلَّبُ ذٰلِكَ اعْتِمَادَ مِيزَانِيَّةٍ إِضَافِيَّةٍ قَبْلَ نِهَايَةِ الرُّبْعِ.', "Wa yatathallabu dzalika'timada mizaniyyatin idhafiyyatin qabla nihayatir rub'i.", 'Dan hal itu memerlukan persetujuan anggaran tambahan sebelum akhir kuartal.'],
  ]],
  [['Revisi register: sesuaikan satu isi untuk tiga pembaca (akademik, jurnalistik, anak muda).', 'Register tidak mengubah fakta, hanya diksi dan struktur.'], [
    ['أَكَادِيمِيًّا: تُشِيرُ الْمُعْطَيَاتُ إِلَى تَرَاجُعِ مُعَدَّلَاتِ الْقِرَاءَةِ.', "Akadimiyyan: tusyirul mu'thayatu ila taraju'i mu'addalatil qira'ati.", 'Akademik: data menunjukkan penurunan tingkat membaca.'],
    ['صَحَفِيًّا: الْعَرَبُ يَقْرَؤُونَ أَقَلَّ، وَالْأَرْقَامُ تَدُقُّ نَاقُوسَ الْخَطَرِ.', "Shahafiyyan: al-'arabu yaqra'una aqalla, wal arqamu taduqqu naqusal khathari.", 'Jurnalistik: orang Arab makin sedikit membaca, dan angka-angka membunyikan lonceng bahaya.'],
    ['لِلشَّبَابِ: مَتَى آخِرُ مَرَّةٍ أَنْهَيْتَ فِيهَا كِتَابًا؟', 'Lisy syababi: mata akhiru marratin anhaita fiha kitaban?', 'Untuk anak muda: kapan terakhir kali kamu menamatkan buku?'],
    ['الْفِكْرَةُ وَاحِدَةٌ، وَالْقَالَبُ يَتَغَيَّرُ بِحَسَبِ الْقَارِئِ.', "Al-fikratu wahidatun, wal qalabu yataghayyaru bihasabil qari'i.", 'Gagasannya satu, bentuknya berubah sesuai pembaca.'],
  ]],
  [['Paragraf kohesif: kata kunci diulang atau diganti sinonim; kalimat baru mulai dari info lama.', 'Pola "lama → baru" membuat pembaca mudah mengikuti.'], [
    ['تُعَدُّ الْمَكْتَبَاتُ الْعَامَّةُ فَضَاءً لِلْمَعْرِفَةِ الْمُتَاحَةِ لِلْجَمِيعِ.', "Tu'addul maktabatul 'ammatu fadha'an lil ma'rifatil mutahati lil jami'i.", 'Perpustakaan umum dianggap ruang pengetahuan yang terbuka bagi semua.'],
    ['وَهٰذَا الْفَضَاءُ لَا يَقْتَصِرُ الْيَوْمَ عَلَى الْكُتُبِ الْوَرَقِيَّةِ.', 'Wa hadzal fadha\'u la yaqtashirul yauma \'alal kutubil waraqiyyati.', 'Dan ruang ini kini tidak terbatas pada buku cetak.'],
    ['فَالْمَصَادِرُ الرَّقْمِيَّةُ صَارَتْ جُزْءًا أَسَاسِيًّا مِنْهُ.', "Fal mashadirur raqmiyyatu sharat juz'an asasiyyan minhu.", 'Sumber-sumber digital telah menjadi bagian pokok darinya.'],
    ['وَتِلْكَ الْمَصَادِرُ تَحْتَاجُ بِدَوْرِهَا إِلَى مَهَارَاتٍ جَدِيدَةٍ.', 'Wa tilkal mashadiru tahtaju bidauriha ila maharatin jadidatin.', 'Dan sumber-sumber itu pada gilirannya memerlukan keterampilan baru.'],
  ]],
  [['Argumentasi bernuansa tertulis: kualifikasi klaim dengan batas waktu, tempat, dan kelompok.', 'Contoh kualifikasi: فِي الْمُدُنِ الْكُبْرَى، عَلَى الْأَقَلِّ حَتَّى الْآنَ، لَدَى فِئَةٍ مُعَيَّنَةٍ.'], [
    ['يَبْدُو أَنَّ الْعَمَلَ الْحُرَّ أَصْبَحَ خِيَارًا جَذَّابًا، فِي الْمُدُنِ الْكُبْرَى عَلَى الْأَقَلِّ.', "Yabdu annal 'amalal hurra ashbaha khiyaran jadzdzaban, fil mudunil kubra 'alal aqalli.", 'Tampaknya kerja lepas menjadi pilihan menarik, setidaknya di kota-kota besar.'],
    ['وَلَا سِيَّمَا لَدَى خِرِّيجِي التَّخَصُّصَاتِ التِّقْنِيَّةِ.', 'Wa la siyyama lada khirriji takhashshushatit tiqniyyati.', 'Terutama di kalangan lulusan jurusan teknik.'],
    ['غَيْرَ أَنَّ هٰذَا الِاتِّجَاهَ قَدْ لَا يَصْمُدُ فِي أَوْقَاتِ الْأَزَمَاتِ.', "Ghaira anna hadzal ittijaha qad la yashmudu fi auqatil azamati.", 'Namun tren ini mungkin tidak bertahan di masa krisis.'],
    ['وَلِذَا يَظَلُّ الْحُكْمُ عَلَيْهِ مُؤَقَّتًا.', "Wa lidza yazhallul hukmu 'alaihi mu'aqqatan.", 'Karena itu penilaian atasnya tetap bersifat sementara.'],
  ]],
  [['Persuasif etis: transparan tentang kepentinganmu, jangan menyembunyikan kelemahan usulan.', 'Kepercayaan pembaca adalah modal persuasi jangka panjang.'], [
    ['أُفْصِحُ مُنْذُ الْبِدَايَةِ أَنَّنِي عُضْوٌ فِي الْجَمْعِيَّةِ الْمُقْتَرِحَةِ.', "Ufshihu mundzul bidayati annani 'udhwun fil jam'iyyatil muqtarihati.", 'Sejak awal saya terus terang bahwa saya anggota perkumpulan pengusul.'],
    ['وَلَا أُخْفِي أَنَّ لِلْمَشْرُوعِ مَخَاطِرَ حَقِيقِيَّةً.', "Wa la ukhfi anna lil masyru'i makhathira haqiqiyyatan.", 'Dan saya tidak menyembunyikan bahwa proyek ini punya risiko nyata.'],
    ['لٰكِنَّ الْفَوَائِدَ الْمُتَوَقَّعَةَ تَفُوقُهَا بِوُضُوحٍ.', "Lakinnal fawa'idal mutawaqqa'ata tafuquha biwudhuhin.", 'Tetapi manfaat yang diharapkan jelas melebihinya.'],
    ['وَأَدْعُوكُمْ إِلَى الْحُكْمِ بِأَنْفُسِكُمْ عَلَى الْأَدِلَّةِ الْمُرْفَقَةِ.', "Wa ad'ukum ilal hukmi bi anfusikum 'alal adillatil murfaqati.", 'Dan saya mengajak Anda menilai sendiri bukti-bukti terlampir.'],
  ]],
  [['Portfolio C1: 6 teks akademik/profesional + komentar revisi dari pembimbing.', 'Tunjukkan rentang: esai, laporan, surat, resensi, policy brief, refleksi.'], [
    ['يَعْكِسُ هٰذَا الْمَلَفُّ تَطَوُّرِي مِنَ الْكِتَابَةِ الْوَصْفِيَّةِ إِلَى التَّحْلِيلِيَّةِ.', "Ya'kisu hadzal malaffu tathawwuri minal kitabatil washfiyyati ilat tahliliyyati.", 'Portofolio ini mencerminkan perkembangan saya dari tulisan deskriptif ke analitis.'],
    ['وَيَضُمُّ نُصُوصًا أَكَادِيمِيَّةً وَمِهْنِيَّةً مُتَنَوِّعَةً.', "Wa yadhummu nushushan akadimiyyatan wa mihniyyatan mutanawwi'atan.", 'Dan memuat beragam teks akademik dan profesional.'],
    ['وَأَرْفَقْتُ مُلَاحَظَاتِ الْمُشْرِفِ وَكَيْفَ تَعَامَلْتُ مَعَهَا.', "Wa arfaqtu mulahazhatil musyrifi wa kaifa ta'amaltu ma'aha.", 'Saya melampirkan catatan pembimbing dan cara saya menanggapinya.'],
    ['وَأَطْمَحُ الْآنَ إِلَى النَّشْرِ فِي مَجَلَّةٍ مُحَكَّمَةٍ.', "Wa athmahul ana ilan nasyri fi majallatin muhakkamatin.", 'Dan kini saya bercita-cita menerbitkan di jurnal ber-reviewer.'],
  ]],
  [['Review kitabah C1: struktur akademik, nuansa, kohesi, register, dan etika argumentasi.', 'Target: esai 800 kata dengan rujukan dan bantahan.'], [
    ['اكْتُبْ مُخَطَّطًا تَفْصِيلِيًّا قَبْلَ الْمُسَوَّدَةِ الْأُولَى.', 'Uktub mukhaththathan tafshiliyyan qablal musawwadatil ula.', 'Tulislah kerangka terperinci sebelum draf pertama.'],
    ['تَأَكَّدْ أَنَّ كُلَّ ادِّعَاءٍ مَسْنُودٌ بِدَلِيلٍ أَوْ مَرْجِعٍ.', "Ta'akkad anna kulla idda'a'in masnudun bidalilin au marji'in.", 'Pastikan setiap klaim didukung bukti atau rujukan.'],
    ['رَاجِعِ التَّرَابُطَ بَيْنَ الْفِقْرَاتِ قَبْلَ التَّدْقِيقِ اللُّغَوِيِّ.', "Raji'it tarabutha bainal fiqarati qablat tadqiqil lughawiyyi.", 'Periksa keterhubungan antarparagraf sebelum koreksi bahasa.'],
    ['وَاطْلُبْ قِرَاءَةً نَقْدِيَّةً مِنْ زَمِيلٍ قَبْلَ التَّسْلِيمِ.', "Wathlub qira'atan naqdiyyatan min zamilin qablat taslimi.", 'Dan mintalah pembacaan kritis dari rekan sebelum menyerahkan.'],
  ]],
];
