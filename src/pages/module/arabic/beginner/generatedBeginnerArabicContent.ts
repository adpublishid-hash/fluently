import type { ArabicSkillId } from '../arabicModuleData';
import { buildChoiceQuestion, hashSeed, seededRandom, shuffleQuestionOptions, type ChoiceQuestion } from '../../../../utils/quiz';
import { getArabicUpperLevelWords, getArabicUpperTheme, isArabicUpperLevel } from '../upper/arabicUpperThemes';
import { getFoundationLesson, getFoundationTopic } from '../foundation/arabicFoundationLessons';
import { getArabicUpperPassage, type ArabicPassageSentence } from '../upper/passages';
import { buildArabicThemePractice } from '../upper/arabicThemePractice';
import { arabicThemeSentences, getArabicThemeSentences } from '../upper/themeSentences';

export type GeneratedArabicContentLevel = 'beginner' | 'elementary' | 'intermediate' | 'upper-intermediate' | 'advanced' | 'proficiency' | 'mastery' | 'scholar';

export type GeneratedArabicLesson = {
  skillId: ArabicSkillId;
  title: string;
  subtitle: string;
  objective: string;
  focus: string[];
  explanation?: string[];
  patterns?: Array<{ label: string; arabic: string; transliteration: string; meaning: string }>;
  vocabulary?: Array<{ arabic: string; transliteration: string; meaning: string }>;
  examples: Array<{ arabic: string; transliteration: string; meaning: string }>;
  /** B1+ theme passage (reading text for qiraah/kitabah, listening script for istima/kalam). */
  passage?: { title: string; sentences: ArabicPassageSentence[]; listenFirst: boolean };
  productionSteps?: string[];
  practice: Array<{ question: string; options: string[]; answer: string }>;
  task: string;
};

const intermediateTopics: Record<ArabicSkillId, string[]> = {
  kalam: [
    'Menyampaikan opini dengan alasan', 'Setuju dan tidak setuju secara sopan', 'Menceritakan pengalaman belajar', 'Rencana masa depan dan target', 'Membahas masalah sehari-hari',
    'Memberi solusi dan saran', 'Wawancara pendidikan/kerja', 'Presentasi singkat 1 menit', 'Negosiasi ringan', 'Membandingkan dua pilihan',
    'Menceritakan kejadian lampau', 'Diskusi perjalanan', 'Mengklarifikasi maksud lawan bicara', 'Menyimpulkan percakapan', 'Debat ringan',
    'Diskusi budaya', 'Percakapan layanan publik', 'Menjelaskan proses', 'Memberi feedback sopan', 'Review kalam B1',
  ],
  istima: [
    'Menangkap opini pembicara', 'Membedakan fakta dan alasan', 'Narasi lampau berurutan', 'Rencana masa depan', 'Pengumuman umum',
    'Instruksi bertahap', 'Wawancara singkat', 'Podcast pendek', 'Berita sederhana', 'Diskusi kelas',
    'Keluhan dan respons', 'Saran dan solusi', 'Perbandingan pilihan', 'Cerita pengalaman', 'Percakapan telepon',
    'Presentasi mini', 'Dialog perjalanan', 'Transaksi layanan', 'Inti argumen', 'Review istima B1',
  ],
  qiraah: [
    'Artikel pendek informatif', 'Biografi tokoh', 'Pengalaman pribadi', 'Teks opini sederhana', 'Jadwal dan pengumuman',
    'Instruksi prosedur', 'Surat formal ringan', 'Deskripsi budaya', 'Cerita lampau', 'Rencana masa depan',
    'Teks perbandingan', 'Teks sebab-akibat', 'Iklan dan informasi', 'Berita sederhana', 'Ringkasan cerita',
    'Dialog tertulis', 'Teks argumentasi ringan', 'Laporan pendek', 'Membaca intensif', 'Review qiraah B1',
  ],
  kitabah: [
    'Paragraf opini', 'Email semi-formal', 'Cerita pengalaman', 'Ringkasan teks', 'Deskripsi proses',
    'Surat permintaan', 'Pesan keluhan sopan', 'Perbandingan dua hal', 'Rencana belajar', 'Laporan singkat',
    'Sebab dan akibat', 'Kalimat penghubung', 'Narasi lampau', 'Argumen sederhana', 'Review tulisan teman',
    'Teks instruksi', 'Catatan presentasi', 'Dialog tertulis panjang', 'Portfolio B1', 'Review kitabah B1',
  ],
  mufradat: [
    'Opini dan argumen', 'Pendidikan', 'Pekerjaan', 'Media dan teknologi', 'Lingkungan',
    'Kesehatan dan gaya hidup', 'Perjalanan', 'Budaya', 'Ekonomi harian', 'Layanan publik',
    'Kata penghubung', 'Kata kerja abstrak', 'Ungkapan sebab-akibat', 'Ungkapan perbandingan', 'Ungkapan saran',
    'Kolokasi umum', 'Sinonim dasar', 'Antonim dasar', 'Frasa presentasi', 'Review mufradat B1',
  ],
  grammar: [
    'Fiil madhi pola dasar', 'Fiil mudhari marfu', 'Manshub setelah an dan lan', 'Majzum setelah lam', 'Faail dan maful bih',
    'Naibul faail dasar', 'Kana dan khabar', 'Inna dan isimnya', 'Idafah kompleks', 'Naat manuut kompleks',
    'Hal sederhana', 'Tamyiz dasar', 'Jumlah sebagai khabar', 'Isim maushul', 'Dhamir muttashil',
    'Fiil mujarad dan mazid', 'Wazan faala', 'Wazan faaala/yufaailu', 'Kalimat syarat sederhana', 'Review nahwu-sharaf B1',
  ],
  pronunciation: [
    'Kelancaran frasa', 'Intonasi opini', 'Intonasi narasi', 'Waqaf berdasarkan makna', 'Mad dalam kalimat',
    'Ghunnah stabil', 'Qalqalah kuat', 'Huruf tebal dalam konteks', 'Kontras sad dan sin', 'Kontras dad dan dal',
    'Ain natural', 'Qaf konsisten', 'Hamzah di tengah', 'Ritme paragraf', 'Mengurangi jeda panjang',
    'Membaca berita pendek', 'Membaca presentasi', 'Shadowing dialog', 'Rekaman evaluasi', 'Review pronunciation B1',
  ],
};

const upperIntermediateTopics: Record<ArabicSkillId, string[]> = {
  kalam: [
    'Diskusi isu pendidikan', 'Argumen pro dan kontra', 'Menanggapi opini kompleks', 'Presentasi analitis', 'Diskusi media sosial',
    'Debat lingkungan', 'Negosiasi formal', 'Menyampaikan kritik sopan', 'Membela sudut pandang', 'Menyimpulkan forum',
    'Diskusi budaya lintas negara', 'Wawancara profesional', 'Problem solving kelompok', 'Menganalisis berita', 'Menjelaskan data sederhana',
    'Membandingkan kebijakan', 'Menyampaikan hipotesis', 'Moderator diskusi', 'Pidato singkat', 'Review kalam B2',
  ],
  istima: [
    'Kuliah pendek', 'Debat dua pembicara', 'Wawancara profesional', 'Berita analitis', 'Opini radio',
    'Diskusi panel', 'Instruksi akademik', 'Ceramah tematik', 'Podcast argumentatif', 'Keluhan formal',
    'Presentasi data', 'Percakapan cepat natural', 'Inferensi makna tersirat', 'Nada setuju dan ragu', 'Kesimpulan pembicara',
    'Detail pendukung argumen', 'Membedakan fakta-opini', 'Catatan listening B2', 'Review audio panjang', 'Review istima B2',
  ],
  qiraah: [
    'Artikel argumentatif', 'Esai opini', 'Teks akademik ringan', 'Laporan berita', 'Analisis budaya',
    'Teks sebab-akibat kompleks', 'Perbandingan kebijakan', 'Resensi buku/film', 'Surat formal', 'Editorial pendek',
    'Data dan infografik', 'Biografi analitis', 'Teks persuasi', 'Instruksi resmi', 'Abstrak penelitian sederhana',
    'Ringkasan artikel', 'Membaca kritis', 'Inferensi penulis', 'Evaluasi argumen', 'Review qiraah B2',
  ],
  kitabah: [
    'Esai opini terstruktur', 'Paragraf argumentatif', 'Email formal', 'Laporan singkat', 'Ringkasan artikel',
    'Tanggapan kritis', 'Surat keluhan formal', 'Proposal kegiatan', 'Analisis sebab-akibat', 'Perbandingan dua pandangan',
    'Resensi pendek', 'Teks persuasi', 'Catatan rapat', 'Komentar berita', 'Deskripsi data',
    'Refleksi belajar', 'Esai solusi masalah', 'Revisi gaya formal', 'Portfolio tulisan B2', 'Review kitabah B2',
  ],
  mufradat: [
    'Akademik dan riset', 'Isu sosial', 'Lingkungan dan kebijakan', 'Media dan opini', 'Ekonomi masyarakat',
    'Teknologi digital', 'Budaya dan identitas', 'Kesehatan publik', 'Pendidikan tinggi', 'Dunia kerja',
    'Kolokasi argumentatif', 'Frasa sebab-akibat', 'Frasa konsesi', 'Frasa evaluasi', 'Sinonim tingkat lanjut',
    'Antonim konseptual', 'Ungkapan formal', 'Register akademik', 'Nuansa makna', 'Review mufradat B2',
  ],
  grammar: [
    'Kana/inna dalam teks panjang', 'Jumlah sebagai sifat', 'Hal dan tamyiz lanjutan', 'Naibul faail', 'Maf‘ul mutlaq dasar',
    'Maf‘ul li-ajlih', 'Isim tafdhil', 'Isim faail dan isim maful', 'Masdar muawwal', 'Syarat kompleks',
    'Manshubat dalam paragraf', 'Majrurat dan idafah panjang', 'Tawabi: naat-athaf-badal', 'Dhamir rujukan teks', 'Fiil mazid pola lanjutan',
    'Konektor wacana Arab', 'Uslub istitsna dasar', 'Uslub taajjub ringan', 'Analisis i‘rab paragraf', 'Review nahwu-sharaf B2',
  ],
  pronunciation: [
    'Fluency paragraf panjang', 'Intonasi debat', 'Tekanan fokus makna', 'Waqaf pada teks argumentatif', 'Mad dalam pidato',
    'Ghunnah natural', 'Qalqalah dalam bacaan cepat', 'Tafkhim-tarqiq stabil', 'Hamzah washal dan qatha', 'Ain dalam ujaran cepat',
    'Qaf dalam register formal', 'Ritme presentasi', 'Chunking kalimat panjang', 'Shadowing berita', 'Membaca esai',
    'Rekaman pidato 2 menit', 'Koreksi diri fonetik', 'Kecepatan natural', 'Ekspresi prosodi', 'Review pronunciation B2',
  ],
};

const advancedTopics: Record<ArabicSkillId, string[]> = {
  kalam: [
    'Retorika pidato formal', 'Diskusi akademik mendalam', 'Debat kebijakan publik', 'Argumentasi bernuansa', 'Menangani interupsi',
    'Presentasi riset', 'Panel profesional', 'Analisis isu kontemporer', 'Persuasi etis', 'Negosiasi tingkat lanjut',
    'Wawancara ahli', 'Moderasi forum kompleks', 'Kritik konstruktif', 'Membangun konsensus', 'Menjawab pertanyaan sulit',
    'Pidato reflektif', 'Diskusi sastra/budaya', 'Sintesis beberapa pandangan', 'Improvisasi formal', 'Review kalam C1',
  ],
  istima: [
    'Kuliah akademik panjang', 'Debat cepat natural', 'Wawancara ahli', 'Ceramah retoris', 'Podcast konseptual',
    'Analisis berita mendalam', 'Diskusi panel kompleks', 'Inferensi sikap implisit', 'Humor dan ironi ringan', 'Argumen bertingkat',
    'Catatan kuliah C1', 'Evaluasi bukti audio', 'Konflik sudut pandang', 'Register formal dan informal', 'Kesimpulan implisit',
    'Nada kritik sopan', 'Tanggapan audiens', 'Sintesis beberapa pembicara', 'Review listening panjang', 'Review istima C1',
  ],
  qiraah: [
    'Artikel opini kompleks', 'Esai akademik Arab', 'Editorial mendalam', 'Analisis wacana', 'Teks budaya klasik ringan',
    'Laporan riset populer', 'Kritik sastra pendek', 'Perbandingan ideologi', 'Teks hukum/administratif ringan', 'Analisis retorika',
    'Membaca antarbaris', 'Evaluasi bias penulis', 'Sintesis dua teks', 'Abstrak akademik', 'Argumentasi filosofis ringan',
    'Resensi kritis', 'Makna idiomatik', 'Struktur kohesi teks', 'Membaca ekstensif', 'Review qiraah C1',
  ],
  kitabah: [
    'Esai akademik C1', 'Artikel opini panjang', 'Policy brief sederhana', 'Laporan analitis', 'Tanggapan kritis',
    'Sintesis dua sumber', 'Proposal akademik', 'Surat formal tingkat lanjut', 'Editorial mini', 'Resensi kritis',
    'Analisis data naratif', 'Counterargument kuat', 'Refleksi profesional', 'Ringkasan eksekutif', 'Revisi register',
    'Paragraf kohesif', 'Argumentasi bernuansa', 'Tulisan persuasif etis', 'Portfolio C1', 'Review kitabah C1',
  ],
  mufradat: [
    'Retorika dan persuasi', 'Akademik lanjutan', 'Kebijakan publik', 'Ekonomi dan masyarakat', 'Etika teknologi',
    'Identitas dan budaya', 'Kolokasi akademik C1', 'Istilah evaluatif', 'Frasa sintesis', 'Frasa nuansa/konsesi',
    'Idiom formal', 'Metafora konseptual', 'Sinonim presisi', 'Antonim argumentatif', 'Register profesional',
    'Bahasa laporan', 'Bahasa kritik', 'Frasa moderasi diskusi', 'Ekspresi retoris', 'Review mufradat C1',
  ],
  grammar: [
    'Analisis i‘rab wacana', 'Masdar dan ta‘wil lanjutan', 'Uslub hasr', 'Uslub qashr', 'Uslub syarth kompleks',
    'Badal dan taukid', 'Maf‘ul muthlaq lanjutan', 'Maf‘ul li-ajlih dalam argumen', 'Hal jumlah', 'Tamyiz nisbah',
    'Isim faail/maful dalam teks', 'Fiil mazid dan makna', 'Jumlah i‘tiradhiyyah', 'Rabt antarjumlah', 'Kohesi dhamir',
    'Balaghah dasar: tashbih', 'Balaghah dasar: kinayah', 'Konektor argumentatif', 'Parsing paragraf', 'Review nahwu-balaghah C1',
  ],
  pronunciation: [
    'Prosodi pidato formal', 'Chunking teks akademik', 'Intonasi persuasi', 'Penekanan kontras', 'Waqaf retoris',
    'Kecepatan natural stabil', 'Hamzah dalam register formal', 'Ain/ghain saat cepat', 'Qaf dan kaf presisi', 'Tafkhim-tarqiq panjang',
    'Shadowing kuliah', 'Membaca editorial', 'Rekaman presentasi riset', 'Nada kritik sopan', 'Ritme debat',
    'Pacing 3 menit', 'Kejelasan artikulasi', 'Self-correction fonetik', 'Delivery profesional', 'Review pronunciation C1',
  ],
};

const proficiencyTopics: Record<ArabicSkillId, string[]> = {
  kalam: [
    'Orasi akademik tingkat mahir', 'Debat spontan bernuansa', 'Sintesis lintas disiplin', 'Retorika diplomatik', 'Menjawab sanggahan tajam',
    'Pidato persuasif panjang', 'Forum ahli', 'Moderasi konflik gagasan', 'Argumentasi etis kompleks', 'Kritik kebijakan mendalam',
    'Dialog sastra dan budaya', 'Improvisasi profesional', 'Negosiasi konseptual', 'Menyederhanakan ide kompleks', 'Diskusi filosofis ringan',
    'Narasi reflektif tinggi', 'Mengelola ambiguitas', 'Rangkuman eksekutif lisan', 'Delivery C2', 'Review kalam C2',
  ],
  istima: [
    'Kuliah panjang autentik', 'Debat cepat multi-pembicara', 'Wacana implisit', 'Ironi dan nuansa sikap', 'Diskusi ahli',
    'Pidato retoris', 'Analisis argumen bertingkat', 'Sumber audio beraksen beragam', 'Sintesis audio kompleks', 'Catatan akademik C2',
    'Inferensi konseptual', 'Evaluasi strategi pembicara', 'Konflik kerangka berpikir', 'Register tinggi', 'Humor intelektual ringan',
    'Respons audiens tersirat', 'Kesimpulan tersembunyi', 'Listening ekstensif', 'Rekonstruksi argumen', 'Review istima C2',
  ],
  qiraah: [
    'Esai akademik padat', 'Opini konseptual', 'Kritik wacana', 'Teks sastra modern ringan', 'Artikel filosofis ringan',
    'Sintesis dua sumber', 'Analisis ideologi', 'Teks kebijakan publik', 'Resensi akademik', 'Membaca retorika halus',
    'Makna intertekstual', 'Ambiguitas dan implikatur', 'Kohesi tingkat wacana', 'Evaluasi metodologi ringan', 'Abstraksi konsep',
    'Membaca ekstensif C2', 'Teks klasik adaptif', 'Analisis gaya penulis', 'Kritik argumen', 'Review qiraah C2',
  ],
  kitabah: [
    'Esai akademik mahir', 'Artikel opini publik', 'Sintesis literatur ringan', 'Policy memo', 'Kritik konseptual',
    'Proposal profesional', 'Executive summary', 'Resensi akademik', 'Tulisan reflektif tinggi', 'Editorial bernuansa',
    'Analisis retorika', 'Tanggapan terhadap sanggahan', 'Tulisan sastra nonfiksi', 'Laporan strategis', 'Revisi gaya C2',
    'Kohesi paragraf kompleks', 'Diksi presisi', 'Tulisan persuasif matang', 'Portfolio C2', 'Review kitabah C2',
  ],
  mufradat: [
    'Diksi konseptual', 'Istilah wacana', 'Retorika tingkat tinggi', 'Kolokasi akademik C2', 'Nuansa evaluatif',
    'Abstraksi sosial', 'Bahasa kebijakan', 'Bahasa kritik', 'Ungkapan diplomatik', 'Idiom formal lanjutan',
    'Metafora akademik', 'Sinonim bernuansa', 'Antonim ideologis', 'Register sastra modern', 'Frasa sintesis',
    'Frasa implikatur', 'Leksikon argumentatif', 'Ekspresi konsensus', 'Ekspresi reservasi', 'Review mufradat C2',
  ],
  grammar: [
    'I‘rab wacana kompleks', 'Balaghah: majaz ringan', 'Balaghah: kinayah lanjut', 'Hasr dan qashr dalam argumen', 'Jumlah i‘tiradhiyyah panjang',
    'Rabt dan kohesi tingkat teks', 'Dhamir dan marji‘ jauh', 'Syarat bertingkat', 'Taqdim-ta’khir retoris', 'Iltifat dasar',
    'Masdar muawwal dalam wacana', 'Tawabi dalam paragraf', 'Fiil mazid bernuansa', 'Analisis uslub', 'Sintaksis teks panjang',
    'Transformasi struktur', 'Parafrasa nahwi', 'Balaghah dalam opini', 'Parsing C2', 'Review nahwu-balaghah C2',
  ],
  pronunciation: [
    'Oratory C2', 'Pacing pidato panjang', 'Prosodi akademik', 'Retorika jeda', 'Tekanan ide utama',
    'Nuansa emosi terkontrol', 'Artikulasi register tinggi', 'Shadowing kuliah autentik', 'Debat cepat jelas', 'Self-repair natural',
    'Waqaf strategis', 'Intonasi sintesis', 'Delivery diplomatik', 'Bacaan sastra modern', 'Presentasi 5 menit',
    'Konsistensi makharij', 'Aksen netral formal', 'Ekspresi final', 'Evaluasi rekaman C2', 'Review pronunciation C2',
  ],
};

const masteryTopics: Record<ArabicSkillId, string[]> = {
  kalam: [
    'Majelis ilmiah dan adab ikhtilaf', 'Debat turats dan kontemporer', 'Khutbah tematik bernuansa', 'Forum akademik bilingual', 'Menjawab kritik metodologis',
    'Retorika islah sosial', 'Diskusi maqasid dan realitas', 'Munasabah gagasan panjang', 'Moderasi halaqah ilmiah', 'Improvisasi ceramah 7 menit',
    'Dialog pemikiran klasik-modern', 'Argumentasi ushuliyah ringan', 'Sidang panel ahli', 'Meringkas kitab untuk awam', 'Menengahi perbedaan istilah',
    'Pidato kebudayaan Arab-Islam', 'Tanya jawab spontan tingkat ahli', 'Presentasi risalah ilmiah', 'Orasi penutup bernas', 'Portfolio kalam mastery',
  ],
  istima: [
    'Dars turats autentik', 'Ceramah akademik cepat', 'Debat pemikiran Arab', 'Khutbah dengan saj dan retorika', 'Podcast intelektual panjang',
    'Panel ulama dan akademisi', 'Istidlal dalam audio', 'Humor dan sindiran halus', 'Peralihan istilah teknis', 'Mencatat sanad ide',
    'Listening teks klasik dibaca', 'Perbandingan dua narasumber', 'Inferensi sikap mazhab', 'Membedah qiyas lisan', 'Rekonstruksi fatwa populer',
    'Audio berita Arab tingkat tinggi', 'Kuliah balaghah', 'Diskusi sastra Arab', 'Review audio 15 menit', 'Portfolio istima mastery',
  ],
  qiraah: [
    'Teks turats adaptif', 'Muqaddimah kitab', 'Artikel jurnal Arab', 'Editorial politik Arab', 'Resensi kitab modern',
    'Analisis maqasid dalam teks', 'Membaca istilah ushul', 'Balaghah dalam paragraf', 'Munasabah antarparagraf', 'Intertekstualitas Quran-hadith adaptif',
    'Teks sastra Arab modern', 'Biografi ulama intelektual', 'Kritik metodologi', 'Teks hukum populer', 'Perbandingan dua madrasah',
    'Abstrak risalah ilmiah', 'Teks opini filsafat ringan', 'Komentar kitab pendek', 'Sintesis bacaan panjang', 'Portfolio qiraah mastery',
  ],
  kitabah: [
    'Makalah ilmiah Arab', 'Ta liq atas kutipan', 'Resensi kitab', 'Ringkasan risalah', 'Policy brief dunia Arab',
    'Editorial Arab formal', 'Catatan halaqah ilmiah', 'Analisis istilah', 'Tanggapan metodologis', 'Mukadimah esai bernas',
    'Parafrasa turats ke modern', 'Perbandingan dua pendapat', 'Kesimpulan risalah', 'Memo akademik', 'Tulisan dakwah intelektual',
    'Revisi uslub formal', 'Sintesis tiga sumber', 'Abstrak akademik Arab', 'Portfolio tulisan mastery', 'Review kitabah mastery',
  ],
  mufradat: [
    'Leksikon turats dasar', 'Istilah ushul ringan', 'Istilah balaghah', 'Istilah maqasid', 'Kolokasi akademik Arab',
    'Ungkapan ta liq kitab', 'Frasa tarjih dan taqyid', 'Kosakata kritik ilmiah', 'Diksi dakwah intelektual', 'Metafora Arab klasik',
    'Istilah sosial-politik Arab', 'Sinonim register tinggi', 'Antonim konseptual turats', 'Frasa penutup risalah', 'Ekspresi ikhtilaf sopan',
    'Leksikon sastra modern', 'Mufradat media Arab', 'Kolokasi kitabah ilmiah', 'Glosarium personal', 'Portfolio mufradat mastery',
  ],
  grammar: [
    'I rab teks turats adaptif', 'Jumlah mu taridhah dalam kitab', 'Hasr-qashr tingkat wacana', 'Taqdim-taakhir balaghi', 'Iltifat dan efeknya',
    'Isnad dan ta liq makna', 'Masdar muawwal kompleks', 'Syarat dan jawab panjang', 'Maf ul mutlaq retoris', 'Badal-taukid dalam argumen',
    'Dhamir dan marji lintas paragraf', 'Rabt nasshi turats', 'Kinayah dan majaz', 'Tasybih-tamtsil', 'Uslub istifham retoris',
    'Tarkib istilah ilmiah', 'Sharaf dan nuansa makna', 'Parsing kutipan kitab', 'Transformasi uslub klasik-modern', 'Portfolio nahwu-balaghah mastery',
  ],
  pronunciation: [
    'Tilawah teks ilmiah berharakat', 'Pembacaan turats perlahan', 'Waqaf maknawi panjang', 'Prosodi khutbah', 'Pacing dars 7 menit',
    'Tekanan istilah teknis', 'Makharij saat teks padat', 'Tafkhim tarqiq dalam retorika', 'Qalqalah dan waqaf ilmiah', 'Ghunnah natural cepat',
    'Intonasi tanya retoris', 'Shadowing ceramah ulama', 'Delivery panel ahli', 'Membaca kutipan kitab', 'Membaca sastra modern',
    'Self-correction formal', 'Aksen fusha netral', 'Rekaman risalah lisan', 'Evaluasi prosodi mastery', 'Portfolio pronunciation mastery',
  ],
};

const scholarTopics: Record<ArabicSkillId, string[]> = {
  kalam: [
    'Seminar proposal riset Arab', 'Munaqasyah metodologi', 'Defense makalah ilmiah', 'Diskusi kritik sumber', 'Presentasi tahqiq ringan',
    'Forum kajian manuskrip', 'Debat teori dan aplikasi', 'Kuliah tamu akademik', 'Responding to peer review', 'Panel riset lintas disiplin',
    'Orasi konferensi Arab', 'Membahas temuan penelitian', 'Menjawab pertanyaan penguji', 'Mengelola sanggahan akademik', 'Pitch riset 5 menit',
    'Review literatur lisan', 'Sintesis teori Arab', 'Etika riset dan amanah ilmiah', 'Kolokium mini', 'Portfolio kalam scholar',
  ],
  istima: [
    'Mendengar seminar akademik', 'Mencatat munaqasyah', 'Peer review lisan', 'Diskusi tahqiq manuskrip', 'Kuliah metodologi Arab',
    'Panel jurnal Arab', 'Sanggahan penguji', 'Q&A konferensi', 'Istilah riset dalam audio', 'Membedah argumen dosen',
    'Listening risalah dibacakan', 'Perbedaan tesis dan data', 'Menangkap kritik halus', 'Audio akademik cepat', 'Sintesis tiga pembicara',
    'Kuliah ushul lanjutan', 'Debat historiografi', 'Rekonstruksi research gap', 'Review audio scholar', 'Portfolio istima scholar',
  ],
  qiraah: [
    'Abstrak jurnal Arab', 'Pendahuluan risalah', 'Kajian pustaka Arab', 'Metodologi penelitian', 'Catatan tahqiq',
    'Kritik sanad sumber', 'Perbandingan naskah', 'Footnote ilmiah', 'Artikel indeks jurnal', 'Resensi akademik panjang',
    'Bibliografi Arab', 'Argumentasi tesis', 'Research gap dalam teks', 'Analisis data kualitatif', 'Kesimpulan risalah',
    'Artikel ensiklopedia Arab', 'Historiografi singkat', 'Kajian istilah ilmiah', 'Sintesis lima bacaan', 'Portfolio qiraah scholar',
  ],
  kitabah: [
    'Abstrak riset Arab', 'Proposal penelitian', 'Rumusan masalah', 'Kajian pustaka', 'Metodologi ringkas',
    'Catatan tahqiq', 'Footnote dan sitasi', 'Review artikel ilmiah', 'Tanggapan peer review', 'Analisis data naratif',
    'Kesimpulan akademik', 'Resensi jurnal', 'Artikel konferensi', 'Annotated bibliography', 'Laporan riset mini',
    'Revisi akademik', 'Parafrasa sumber', 'Etika kutipan', 'Paper scholar', 'Portfolio kitabah scholar',
  ],
  mufradat: [
    'Istilah metodologi', 'Istilah tahqiq', 'Istilah manuskrip', 'Istilah jurnal', 'Istilah peer review',
    'Kosakata research gap', 'Frasa sitasi Arab', 'Kolokasi abstrak', 'Frasa metodologi', 'Diksi kritik ilmiah',
    'Istilah historiografi', 'Istilah data kualitatif', 'Istilah analisis teks', 'Register konferensi', 'Ungkapan akademik sopan',
    'Frasa bibliografi', 'Istilah validitas', 'Istilah argumentasi', 'Glosarium scholar', 'Portfolio mufradat scholar',
  ],
  grammar: [
    'Uslub akademik Arab', 'Struktur abstrak', 'Jumlah ta lil riset', 'Syarat dalam argumen ilmiah', 'Hasr dalam tesis',
    'Taqyid dan itlaq', 'Isnad ilmiah', 'Rujukan dhamir di paper', 'Badal dalam definisi', 'Taukid dalam klaim',
    'Masdar muawwal akademik', 'Kohesi sitasi', 'Kalimat pasif ilmiah', 'Nominalisasi Arab', 'Parsing footnote',
    'Balaghah akademik', 'Uslub tarjih riset', 'Transformasi kutipan', 'I rab paper mini', 'Portfolio grammar scholar',
  ],
  pronunciation: [
    'Delivery seminar akademik', 'Membaca abstrak Arab', 'Membaca footnote', 'Pacing presentasi riset', 'Tekanan istilah metodologi',
    'Waqaf dalam paper', 'Intonasi menjawab penguji', 'Prosodi peer review', 'Membaca kutipan manuskrip', 'Artikulasi istilah asing-Arab',
    'Rekaman konferensi mini', 'Chunking paragraf akademik', 'Nada objektif', 'Penutup presentasi', 'Self-correction seminar',
    'Aksen fusha akademik', 'Membaca bibliografi', 'Presentasi poster lisan', 'Evaluasi delivery scholar', 'Portfolio pronunciation scholar',
  ],
};

const advancedVocabulary: Record<ArabicSkillId, GeneratedArabicLesson['vocabulary']> = {
  kalam: [
    { arabic: 'مِنْ مُنْطَلَقِ', transliteration: 'min munthalaqi', meaning: 'bertolak dari' },
    { arabic: 'لَا يَخْفَى أَنَّ', transliteration: 'la yakhfa anna', meaning: 'tidak dapat dipungkiri bahwa' },
    { arabic: 'يَسْتَوْجِبُ', transliteration: 'yastaujibu', meaning: 'menuntut/mengharuskan' },
    { arabic: 'تَوَازُنٌ دَقِيقٌ', transliteration: 'tawazunun daqiq', meaning: 'keseimbangan yang halus' },
    { arabic: 'إِعَادَةُ صِيَاغَةٍ', transliteration: 'iadatu shiyaghah', meaning: 'reformulasi' },
    { arabic: 'رُؤْيَةٌ مُتَكَامِلَةٌ', transliteration: 'ru-yatun mutakamilah', meaning: 'visi yang terpadu' },
  ],
  istima: [
    { arabic: 'النَّبْرَةُ الضِّمْنِيَّةُ', transliteration: 'an-nabratu adh-dhimniyyah', meaning: 'nada implisit' },
    { arabic: 'تَحَوُّلُ الْمَوْقِفِ', transliteration: 'tahawwulu al-mauqif', meaning: 'pergeseran posisi' },
    { arabic: 'اسْتِدْرَاكٌ', transliteration: 'istidrak', meaning: 'koreksi/pengecualian setelah pernyataan' },
    { arabic: 'إِحَالَةٌ', transliteration: 'ihalah', meaning: 'rujukan/referensi' },
    { arabic: 'تَرَابُطُ الْأَفْكَارِ', transliteration: 'tarabuthu al-afkar', meaning: 'keterkaitan ide' },
    { arabic: 'اسْتِنْتَاجٌ ضِمْنِيٌّ', transliteration: 'istintajun dhimni', meaning: 'kesimpulan tersirat' },
  ],
  qiraah: [
    { arabic: 'الْخِطَابُ', transliteration: 'al-khithab', meaning: 'wacana/discourse' },
    { arabic: 'الافْتِرَاضُ الضِّمْنِيُّ', transliteration: 'al-iftiradhu adh-dhimni', meaning: 'asumsi implisit' },
    { arabic: 'الْبِنْيَةُ الْحِجَاجِيَّةُ', transliteration: 'al-binyatu al-hijajiyyah', meaning: 'struktur argumentatif' },
    { arabic: 'التَّنَاصُّ', transliteration: 'at-tanashsh', meaning: 'intertekstualitas' },
    { arabic: 'الْإِطَارُ الْمَفَاهِيمِيُّ', transliteration: 'al-itharu al-mafahimi', meaning: 'kerangka konseptual' },
    { arabic: 'الدَّلَالَةُ', transliteration: 'ad-dalalah', meaning: 'makna/semantik' },
  ],
  kitabah: [
    { arabic: 'تَسْعَى هٰذِهِ الْوَرَقَةُ إِلَى', transliteration: 'tasa hadzihi al-waraqatu ila', meaning: 'tulisan ini berupaya untuk' },
    { arabic: 'يَنْبَغِي التَّمْيِيزُ بَيْنَ', transliteration: 'yanbaghi at-tamyizu baina', meaning: 'perlu dibedakan antara' },
    { arabic: 'تُفْضِي إِلَى', transliteration: 'tufdhi ila', meaning: 'mengarah/berujung pada' },
    { arabic: 'مِنْ زَاوِيَةٍ تَحْلِيلِيَّةٍ', transliteration: 'min zawiyatin tahliliyyah', meaning: 'dari sudut analitis' },
    { arabic: 'فَرْضِيَّةٌ مَرْكَزِيَّةٌ', transliteration: 'fardhiyyatun markaziyyah', meaning: 'hipotesis utama' },
    { arabic: 'خُلَاصَةُ الْقَوْلِ', transliteration: 'khulashatu al-qaul', meaning: 'kesimpulannya' },
  ],
  mufradat: [
    { arabic: 'الْحَوْكَمَةُ', transliteration: 'al-haukamah', meaning: 'tata kelola' },
    { arabic: 'الْمَشْرُوعِيَّةُ', transliteration: 'al-masyru iyyah', meaning: 'legitimasi' },
    { arabic: 'التَّفَاوُتُ', transliteration: 'at-tafawut', meaning: 'ketimpangan' },
    { arabic: 'التَّمَاسُكُ الاجْتِمَاعِيُّ', transliteration: 'at-tamasuku al-ijtima i', meaning: 'kohesi sosial' },
    { arabic: 'الْجَدَلِيَّةُ', transliteration: 'al-jadaliyyah', meaning: 'dialektika/perdebatan konseptual' },
    { arabic: 'تَحَوُّلٌ بُنْيَوِيٌّ', transliteration: 'tahawwalun bunyawi', meaning: 'perubahan struktural' },
  ],
  grammar: [
    { arabic: 'أُسْلُوبُ الْحَصْرِ', transliteration: 'uslubu al-hashr', meaning: 'pembatasan/penegasan eksklusif' },
    { arabic: 'جُمْلَةٌ اعْتِرَاضِيَّةٌ', transliteration: 'jumlah i tiradhiyyah', meaning: 'kalimat sisipan' },
    { arabic: 'الرَّبْطُ النَّصِّيُّ', transliteration: 'ar-rabthu an-nashshi', meaning: 'kohesi tekstual' },
    { arabic: 'الْإِحَالَةُ الضَّمِيرِيَّةُ', transliteration: 'al-ihalah adh-dhamiriyyah', meaning: 'rujukan pronominal' },
    { arabic: 'التَّشْبِيهُ', transliteration: 'at-tasybih', meaning: 'simile/perumpamaan' },
    { arabic: 'الْكِنَايَةُ', transliteration: 'al-kinayah', meaning: 'ungkapan tidak langsung' },
  ],
  pronunciation: [
    { arabic: 'الْإِلْقَاءُ', transliteration: 'al-ilqa', meaning: 'delivery/pembawaan pidato' },
    { arabic: 'نَبْرَةُ الاقْتِنَاعِ', transliteration: 'nabratu al-iqtina', meaning: 'nada meyakinkan' },
    { arabic: 'وَقْفَةٌ بَلَاغِيَّةٌ', transliteration: 'waqfatun balaghiyyah', meaning: 'jeda retoris' },
    { arabic: 'تَدَفُّقُ الْكَلَامِ', transliteration: 'tadaffuqu al-kalam', meaning: 'kelancaran ujaran' },
    { arabic: 'تَصْحِيحٌ ذَاتِيٌّ', transliteration: 'tashhihun dzati', meaning: 'self-correction' },
    { arabic: 'نَغْمَةُ الْخِتَامِ', transliteration: 'naghmatu al-khitam', meaning: 'intonasi penutup' },
  ],
};

const advancedPatterns: Record<ArabicSkillId, GeneratedArabicLesson['patterns']> = {
  kalam: [
    { label: 'Pembuka retoris', arabic: 'لَا يَخْفَى أَنَّ ... غَيْرَ أَنَّ السُّؤَالَ الْأَعْمَقَ هُوَ ...', transliteration: 'La yakhfa anna ... ghaira anna as-suala al-amaq huwa ...', meaning: 'Tidak dapat dipungkiri bahwa ..., namun pertanyaan yang lebih dalam adalah ...' },
    { label: 'Sintesis pandangan', arabic: 'إِذَا جَمَعْنَا بَيْنَ الرَّأْيَيْنِ، ظَهَرَ أَنَّ ...', transliteration: 'Idza jama na baina ar-rayyain, zhahara anna ...', meaning: 'Jika kita menggabungkan dua pandangan, tampak bahwa ...' },
    { label: 'Penutup bernuansa', arabic: 'خُلَاصَةُ الْقَوْلِ أَنَّ الْحَلَّ لَا يَكْمُنُ فِي ... فَحَسْبُ، بَلْ فِي ...', transliteration: 'Khulashatu al-qaul anna al-halla la yakmunu fi ... fahasb, bal fi ...', meaning: 'Kesimpulannya, solusi bukan hanya terletak pada ..., tetapi pada ...' },
  ],
  istima: [
    { label: 'Sikap implisit', arabic: 'النَّبْرَةُ تُوحِي بِأَنَّ الْمُتَكَلِّمَ لَا يَرْفُضُ الْفِكْرَةَ، بَلْ يَتَحَفَّظُ عَلَيْهَا.', transliteration: 'An-nabratu tuhi bi-anna al-mutakallima la yarfudhu al-fikrah, bal yatahaffazhu alaiha.', meaning: 'Nadanya mengisyaratkan bahwa pembicara tidak menolak ide, melainkan memberi reservasi.' },
    { label: 'Pergeseran posisi', arabic: 'يَنْتَقِلُ الْمُتَكَلِّمُ مِنَ الْعَرْضِ إِلَى النَّقْدِ عِنْدَمَا يَقُولُ ...', transliteration: 'Yantaqilu al-mutakallimu mina al-ardhi ila an-naqdi indama yaqulu ...', meaning: 'Pembicara beralih dari pemaparan ke kritik ketika ia berkata ...' },
    { label: 'Sintesis audio', arabic: 'يُمْكِنُ تَلْخِيصُ مَوْقِفِ الْمُتَحَدِّثَيْنِ فِي أَنَّ ...', transliteration: 'Yumkinu talkhishu mauqifi al-mutahadditsaini fi anna ...', meaning: 'Posisi dua pembicara dapat diringkas bahwa ...' },
  ],
  qiraah: [
    { label: 'Analisis wacana', arabic: 'يَبْنِي الْكَاتِبُ حُجَّتَهُ عَلَى افْتِرَاضٍ ضِمْنِيٍّ مَفَادُهُ أَنَّ ...', transliteration: 'Yabni al-katibu hujjatahu ala iftiradhin dhimni mafaduhu anna ...', meaning: 'Penulis membangun argumennya di atas asumsi implisit bahwa ...' },
    { label: 'Evaluasi retorika', arabic: 'يَسْتَخْدِمُ النَّصُّ التَّقَابُلَ بَيْنَ ... وَ ... لِتَقْوِيَةِ الْحُجَّةِ.', transliteration: 'Yastakhdimu an-nashshu at-taqabula baina ... wa ... li-taqwiyati al-hujjah.', meaning: 'Teks memakai kontras antara ... dan ... untuk memperkuat argumen.' },
    { label: 'Sintesis teks', arabic: 'عِنْدَ مُقَارَنَةِ النَّصَّيْنِ، نَجِدُ أَنَّ كِلَيْهِمَا يَنْطَلِقُ مِنْ ...', transliteration: 'Inda muqaranati an-nashshain, najidu anna kilaihima yanthaliqu min ...', meaning: 'Saat membandingkan dua teks, keduanya bertolak dari ...' },
  ],
  kitabah: [
    { label: 'Tesis C1', arabic: 'تَسْعَى هٰذِهِ الْوَرَقَةُ إِلَى بَيَانِ أَنَّ ... لَيْسَتْ مُشْكِلَةً تِقْنِيَّةً فَحَسْبُ، بَلْ قَضِيَّةٌ اجْتِمَاعِيَّةٌ أَيْضًا.', transliteration: 'Tasa hadzihi al-waraqatu ila bayani anna ... laisat musykilatan tiqniyyatan fahasb, bal qadhiyyatun ijtimaiyyah aidhan.', meaning: 'Tulisan ini menunjukkan bahwa ... bukan hanya masalah teknis, tetapi juga isu sosial.' },
    { label: 'Transisi analitis', arabic: 'مِنْ زَاوِيَةٍ تَحْلِيلِيَّةٍ، يَنْبَغِي التَّمْيِيزُ بَيْنَ ... وَ ...', transliteration: 'Min zawiyatin tahliliyyah, yanbaghi at-tamyizu baina ... wa ...', meaning: 'Dari sudut analitis, perlu dibedakan antara ... dan ...' },
    { label: 'Kesimpulan eksekutif', arabic: 'خُلَاصَةُ الْقَوْلِ أَنَّ النَّهْجَ الْأَكْثَرَ اتِّزَانًا هُوَ الَّذِي يَجْمَعُ بَيْنَ ... وَ ...', transliteration: 'Khulashatu al-qaul anna an-nahja al-aktsara ittizanan huwa alladzi yajmau baina ... wa ...', meaning: 'Kesimpulannya, pendekatan paling seimbang adalah yang menggabungkan ... dan ...' },
  ],
  mufradat: [
    { label: 'Kohesi sosial', arabic: 'تَعْزِيزُ التَّمَاسُكِ الاجْتِمَاعِيِّ', transliteration: 'Tazizu at-tamasuki al-ijtima i', meaning: 'Memperkuat kohesi sosial' },
    { label: 'Legitimasi kebijakan', arabic: 'تَقْوِيَةُ مَشْرُوعِيَّةِ السِّيَاسَةِ الْعَامَّةِ', transliteration: 'Taqwiyatu masyru iyyati as-siyasati al-ammah', meaning: 'Memperkuat legitimasi kebijakan publik' },
    { label: 'Transformasi struktural', arabic: 'إِحْدَاثُ تَحَوُّلٍ بُنْيَوِيٍّ', transliteration: 'Ihdatsu tahawwulin bunyawi', meaning: 'Mewujudkan perubahan struktural' },
  ],
  grammar: [
    { label: 'Hasr', arabic: 'مَا النَّجَاحُ إِلَّا نَتِيجَةُ صَبْرٍ وَتَخْطِيطٍ.', transliteration: 'Ma an-najahu illa natijatu shabrin wa takhthith.', meaning: 'Keberhasilan tidak lain hanyalah hasil kesabaran dan perencanaan.' },
    { label: 'Jumlah i‘tiradhiyyah', arabic: 'إِنَّ هٰذَا الْقَرَارَ، وَإِنْ بَدَا صَعْبًا، ضَرُورِيٌّ.', transliteration: 'Inna hadza al-qarara, wa in bada shaban, dharuri.', meaning: 'Keputusan ini, meski tampak sulit, penting.' },
    { label: 'Kinayah', arabic: 'هُوَ طَوِيلُ الْيَدِ فِي الْخَيْرِ.', transliteration: 'Huwa thawilu al-yadi fi al-khair.', meaning: 'Ia sangat dermawan. Ungkapan tidak langsung, bukan makna literal.' },
  ],
  pronunciation: [
    { label: 'Waqaf retoris', arabic: 'لَا يَكْفِي أَنْ نَتَحَدَّثَ عَنِ الْمُشْكِلَةِ | بَلْ يَنْبَغِي أَنْ نُعِيدَ صِيَاغَةَ السُّؤَالِ.', transliteration: 'La yakfi an natahadatsa ani al-musykilah | bal yanbaghi an nuid shiyaghata as-sual.', meaning: 'Jeda setelah klaim pertama untuk memberi efek retoris.' },
    { label: 'Tekanan kontras', arabic: 'لَيْسَ الْمَقْصُودُ رَفْضَ الْفِكْرَةِ، بَلْ تَقْيِيدَهَا بِشُرُوطٍ وَاضِحَةٍ.', transliteration: 'Laisa al-maqshudu rafdha al-fikrah, bal taqyidaha bi-syuruthin wadhihah.', meaning: 'Tekan laisa dan bal untuk kontras.' },
    { label: 'Delivery formal', arabic: 'خُلَاصَةُ الْقَوْلِ أَنَّ التَّوَازُنَ بَيْنَ الْمَبْدَإِ وَالْوَاقِعِ ضَرُورِيٌّ.', transliteration: 'Khulashatu al-qaul anna at-tawazuna baina al-mabda-i wal-waqi dharuri.', meaning: 'Latihan intonasi penutup formal.' },
  ],
};

const intermediateVocabulary: Record<ArabicSkillId, GeneratedArabicLesson['vocabulary']> = {
  kalam: [
    { arabic: 'فِي رَأْيِي', transliteration: "fi ra'yi", meaning: 'menurut saya' },
    { arabic: 'أُوَافِقُ', transliteration: 'uwafiqu', meaning: 'saya setuju' },
    { arabic: 'لَا أُوَافِقُ', transliteration: 'la uwafiqu', meaning: 'saya tidak setuju' },
    { arabic: 'السَّبَبُ', transliteration: 'as-sababu', meaning: 'alasan/sebab' },
    { arabic: 'الْحَلُّ', transliteration: 'al-hallu', meaning: 'solusi' },
    { arabic: 'مِنْ نَاحِيَةٍ أُخْرَى', transliteration: 'min nahiyatin ukhraa', meaning: 'di sisi lain' },
  ],
  istima: [
    { arabic: 'اسْتَمِعْ', transliteration: "istami'", meaning: 'dengarkan' },
    { arabic: 'الْفِكْرَةُ الرَّئِيسِيَّةُ', transliteration: 'al-fikratu ar-ra-isiyyah', meaning: 'gagasan utama' },
    { arabic: 'التَّفَاصِيلُ', transliteration: 'at-tafashil', meaning: 'detail' },
    { arabic: 'يُعْلِنُ', transliteration: "yu'linu", meaning: 'mengumumkan' },
    { arabic: 'يَقْتَرِحُ', transliteration: 'yaqtarikhu', meaning: 'menyarankan' },
    { arabic: 'يُوَضِّحُ', transliteration: 'yuwaddhihu', meaning: 'menjelaskan' },
  ],
  qiraah: [
    { arabic: 'النَّصُّ', transliteration: 'an-nashshu', meaning: 'teks' },
    { arabic: 'الْفِقْرَةُ', transliteration: 'al-fiqratu', meaning: 'paragraf' },
    { arabic: 'الْعُنْوَانُ', transliteration: "al-'unwanu", meaning: 'judul' },
    { arabic: 'الْخُلَاصَةُ', transliteration: 'al-khulashatu', meaning: 'ringkasan' },
    { arabic: 'السَّبَبُ وَالنَّتِيجَةُ', transliteration: 'as-sababu wan-natijah', meaning: 'sebab dan akibat' },
    { arabic: 'يُقَارِنُ', transliteration: 'yuqarinu', meaning: 'membandingkan' },
  ],
  kitabah: [
    { arabic: 'أَوَّلًا', transliteration: 'awwalan', meaning: 'pertama' },
    { arabic: 'ثَانِيًا', transliteration: 'tsaniyan', meaning: 'kedua' },
    { arabic: 'لِذٰلِكَ', transliteration: 'lidzalika', meaning: 'oleh karena itu' },
    { arabic: 'مَعَ ذٰلِكَ', transliteration: "ma'a dzalika", meaning: 'meskipun begitu' },
    { arabic: 'أَطْلُبُ مِنْكُمْ', transliteration: 'athlubu minkum', meaning: 'saya meminta kepada Anda sekalian' },
    { arabic: 'مَعَ خَالِصِ الشُّكْرِ', transliteration: "ma'a khalishi asy-syukri", meaning: 'dengan penuh terima kasih' },
  ],
  mufradat: [
    { arabic: 'التَّعْلِيمُ', transliteration: "at-ta'limu", meaning: 'pendidikan' },
    { arabic: 'الْبِيئَةُ', transliteration: 'al-bi-atu', meaning: 'lingkungan' },
    { arabic: 'التِّقْنِيَّةُ', transliteration: 'at-tiqniyyah', meaning: 'teknologi' },
    { arabic: 'الْمُجْتَمَعُ', transliteration: "al-mujtama'u", meaning: 'masyarakat' },
    { arabic: 'التَّحَدِّي', transliteration: 'at-tahaddi', meaning: 'tantangan' },
    { arabic: 'الفُرْصَةُ', transliteration: 'al-furshah', meaning: 'kesempatan' },
  ],
  grammar: [
    { arabic: 'فِعْلٌ مَاضٍ', transliteration: "fi'lun madhin", meaning: 'kata kerja lampau' },
    { arabic: 'فِعْلٌ مُضَارِعٌ', transliteration: "fi'lun mudhari'un", meaning: 'kata kerja sekarang/akan' },
    { arabic: 'فَاعِلٌ', transliteration: "fa'ilun", meaning: 'pelaku/subjek verbal' },
    { arabic: 'مَفْعُولٌ بِهِ', transliteration: "maf'ulun bihi", meaning: 'objek' },
    { arabic: 'مَنْصُوبٌ', transliteration: 'manshubun', meaning: 'ber-i‘rab fathah/posisi nasab' },
    { arabic: 'مَجْزُومٌ', transliteration: 'majzumun', meaning: 'ber-i‘rab sukun/posisi jazm' },
  ],
  pronunciation: [
    { arabic: 'التَّفْخِيمُ', transliteration: 'at-tafkhim', meaning: 'menebalkan bunyi' },
    { arabic: 'التَّرْقِيقُ', transliteration: 'at-tarqiq', meaning: 'menipiskan bunyi' },
    { arabic: 'الْغُنَّةُ', transliteration: 'al-ghunnah', meaning: 'dengung' },
    { arabic: 'الْقَلْقَلَةُ', transliteration: 'al-qalqalah', meaning: 'pantulan bunyi' },
    { arabic: 'الْوَقْفُ', transliteration: 'al-waqfu', meaning: 'berhenti saat membaca' },
    { arabic: 'النَّبْرُ', transliteration: 'an-nabru', meaning: 'tekanan suara' },
  ],
};

const intermediatePatterns: Record<ArabicSkillId, GeneratedArabicLesson['patterns']> = {
  kalam: [
    { label: 'Opini', arabic: 'فِي رَأْيِي، ... لِأَنَّ ...', transliteration: "Fi ra'yi, ... li-anna ...", meaning: 'Menurut saya, ... karena ...' },
    { label: 'Kontras', arabic: 'أُوَافِقُ، وَلٰكِنْ ...', transliteration: 'Uwafiqu, walakin ...', meaning: 'Saya setuju, tetapi ...' },
    { label: 'Saran', arabic: 'أَنْصَحُكَ أَنْ ...', transliteration: 'Anshahuka an ...', meaning: 'Saya menyarankan kamu untuk ...' },
  ],
  istima: [
    { label: 'Gagasan utama', arabic: 'الْمُتَكَلِّمُ يَتَحَدَّثُ عَنْ ...', transliteration: 'Al-mutakallimu yatahadatsu an ...', meaning: 'Pembicara berbicara tentang ...' },
    { label: 'Detail', arabic: 'ذَكَرَ ثَلَاثَ نِقَاطٍ: ...', transliteration: 'Dzakara tsalatsa niqathin ...', meaning: 'Ia menyebut tiga poin: ...' },
    { label: 'Kesimpulan', arabic: 'الْخُلَاصَةُ أَنَّ ...', transliteration: 'Al-khulashatu anna ...', meaning: 'Kesimpulannya bahwa ...' },
  ],
  qiraah: [
    { label: 'Identifikasi teks', arabic: 'هٰذَا النَّصُّ يَتَحَدَّثُ عَنْ ...', transliteration: 'Hadza an-nashshu yatahadatsu an ...', meaning: 'Teks ini membahas tentang ...' },
    { label: 'Sebab akibat', arabic: 'بِسَبَبِ ...، حَدَثَ ...', transliteration: 'Bi-sababi ..., hadatsa ...', meaning: 'Karena ..., terjadilah ...' },
    { label: 'Ringkasan', arabic: 'بِاخْتِصَارٍ، ...', transliteration: 'Bi-ikhtisharin, ...', meaning: 'Secara singkat, ...' },
  ],
  kitabah: [
    { label: 'Pembuka paragraf', arabic: 'أَوَّلًا، أُرِيدُ أَنْ أُوَضِّحَ أَنَّ ...', transliteration: 'Awwalan, uridu an uwaddhih anna ...', meaning: 'Pertama, saya ingin menjelaskan bahwa ...' },
    { label: 'Penghubung', arabic: 'مِنْ نَاحِيَةٍ أُخْرَى، ...', transliteration: 'Min nahiyatin ukhraa, ...', meaning: 'Di sisi lain, ...' },
    { label: 'Penutup', arabic: 'لِذٰلِكَ، أَرَى أَنَّ ...', transliteration: 'Lidzalika, ara anna ...', meaning: 'Karena itu, saya melihat bahwa ...' },
  ],
  mufradat: [
    { label: 'Kolokasi', arabic: 'يُوَاجِهُ تَحَدِّيًا', transliteration: 'Yuwajihu tahaddiyan', meaning: 'Menghadapi tantangan' },
    { label: 'Kesempatan', arabic: 'يَسْتَغِلُّ الْفُرْصَةَ', transliteration: 'Yastaghillu al-furshata', meaning: 'Memanfaatkan kesempatan' },
    { label: 'Dampak', arabic: 'يُؤَثِّرُ فِي الْمُجْتَمَعِ', transliteration: "Yu-atstsiru fi al-mujtama'i", meaning: 'Berpengaruh pada masyarakat' },
  ],
  grammar: [
    { label: 'Manshub', arabic: 'أُرِيدُ أَنْ أَتَعَلَّمَ.', transliteration: "Uridu an ata'allama.", meaning: 'Saya ingin belajar. Fiil setelah أَنْ menjadi manshub.' },
    { label: 'Majzum', arabic: 'لَمْ أَذْهَبْ إِلَى الْمَدْرَسَةِ.', transliteration: 'Lam adzhab ila al-madrasah.', meaning: 'Saya tidak pergi ke sekolah. Fiil setelah لَمْ menjadi majzum.' },
    { label: 'Kana', arabic: 'كَانَ الطَّالِبُ مُجْتَهِدًا.', transliteration: 'Kana ath-thalibu mujtahidan.', meaning: 'Siswa itu dulu rajin. Khabar kana manshub.' },
  ],
  pronunciation: [
    { label: 'Waqaf makna', arabic: 'أُحِبُّ اللُّغَةَ الْعَرَبِيَّةَ | لِأَنَّهَا جَمِيلَةٌ.', transliteration: 'Uhibbu al-lughata al-arabiyyah | li-annaha jamilah.', meaning: 'Berhenti setelah satu makna selesai.' },
    { label: 'Kontras tebal-tipis', arabic: 'صَبَرَ - سَفَرَ', transliteration: 'Shabara - safara.', meaning: 'Bedakan shad tebal dan sin tipis.' },
    { label: 'Qalqalah', arabic: 'قَلْبٌ - يَكْتُبْ', transliteration: 'Qalbun - yaktub.', meaning: 'Pantulkan huruf qalqalah saat sukun/waqaf.' },
  ],
};

function makeIntermediatePractice(skillId: ArabicSkillId, topic: string, lesson: number): GeneratedArabicLesson['practice'] {
  const base = [
    {
      question: 'Ungkapan yang paling tepat untuk membuka opini adalah...',
      options: ['فِي رَأْيِي', 'أَيْنَ الْقَلَمُ؟', 'صَبَاحُ الْخَيْرِ'],
      answer: 'فِي رَأْيِي',
    },
    {
      question: 'Arti "لِأَنَّ" adalah...',
      options: ['karena', 'di mana', 'sebelum'],
      answer: 'karena',
    },
    {
      question: 'Kalimat B1 yang lebih lengkap biasanya memiliki...',
      options: ['opini, alasan, dan penghubung', 'satu kata tanpa konteks', 'huruf tanpa makna'],
      answer: 'opini, alasan, dan penghubung',
    },
    {
      question: 'Pilih penghubung untuk menunjukkan kontras.',
      options: ['وَلٰكِنْ', 'هٰذَا', 'مَنْ'],
      answer: 'وَلٰكِنْ',
    },
    {
      question: 'Apa fungsi "بِاخْتِصَارٍ" dalam ringkasan?',
      options: ['menandai kesimpulan singkat', 'menanyakan nama', 'menolak semua ide'],
      answer: 'menandai kesimpulan singkat',
    },
  ];

  const skillQuestions: Record<ArabicSkillId, GeneratedArabicLesson['practice']> = {
    kalam: [
      { question: 'Saat tidak setuju secara sopan, pilihan terbaik adalah...', options: ['لَا أُوَافِقُ تَمَامًا، وَلٰكِنْ أَفْهَمُ رَأْيَكَ.', 'اِسْمِي أَحْمَدُ.', 'أَيْنَ الْبَيْتُ؟'], answer: 'لَا أُوَافِقُ تَمَامًا، وَلٰكِنْ أَفْهَمُ رَأْيَكَ.' },
      { question: 'Dalam presentasi 1 menit, urutan yang rapi adalah...', options: ['pembuka, poin utama, contoh, penutup', 'penutup, diam, topik acak', 'contoh tanpa topik'], answer: 'pembuka, poin utama, contoh, penutup' },
      { question: 'Ungkapan "أَنْصَحُكَ أَنْ..." dipakai untuk...', options: ['memberi saran', 'menyebut warna', 'menghitung angka'], answer: 'memberi saran' },
      { question: `Target produksi untuk topik "${topic}" adalah...`, options: ['dialog dengan alasan dan respons', 'menyalin huruf saja', 'membaca satu bunyi'], answer: 'dialog dengan alasan dan respons' },
      { question: 'Saat lupa kata ketika berbicara, strategi B1 yang baik adalah...', options: ['parafrase dengan kata yang sudah dikenal', 'berhenti total', 'mengganti topik tanpa konteks'], answer: 'parafrase dengan kata yang sudah dikenal' },
    ],
    istima: [
      { question: 'Saat mendengar audio B1 pertama kali, fokus utama adalah...', options: ['gagasan utama', 'semua harakat kecil', 'menulis seluruh transkrip'], answer: 'gagasan utama' },
      { question: 'Kata "يَقْتَرِحُ" berarti...', options: ['menyarankan', 'melupakan', 'membeli'], answer: 'menyarankan' },
      { question: 'Jika pembicara menyebut "ثَلَاثَ نِقَاطٍ", ia sedang menyebut...', options: ['tiga poin', 'tiga warna', 'tiga rumah'], answer: 'tiga poin' },
      { question: 'Latihan listening B1 sebaiknya mencatat...', options: ['siapa, topik, alasan, dan kesimpulan', 'hanya satu huruf', 'warna tombol'], answer: 'siapa, topik, alasan, dan kesimpulan' },
      { question: 'Ungkapan "الْخُلَاصَةُ أَنَّ..." berarti...', options: ['kesimpulannya bahwa...', 'selamat pagi...', 'berapa harganya...'], answer: 'kesimpulannya bahwa...' },
    ],
    qiraah: [
      { question: 'Untuk membaca artikel pendek, langkah awal terbaik adalah...', options: ['lihat judul dan kata kunci', 'terjemahkan acak', 'abaikan paragraf'], answer: 'lihat judul dan kata kunci' },
      { question: 'Kata "السَّبَبُ وَالنَّتِيجَةُ" berarti...', options: ['sebab dan akibat', 'nama dan asal', 'makanan dan minuman'], answer: 'sebab dan akibat' },
      { question: 'Ungkapan "هٰذَا النَّصُّ يَتَحَدَّثُ عَنْ..." dipakai untuk...', options: ['menyebut topik teks', 'meminta izin', 'mengucapkan salam'], answer: 'menyebut topik teks' },
      { question: 'Ringkasan bacaan B1 sebaiknya berisi...', options: ['gagasan utama dan 1-2 detail pendukung', 'semua kata tanpa makna', 'hanya judul'], answer: 'gagasan utama dan 1-2 detail pendukung' },
      { question: 'Kata "يُقَارِنُ" berarti...', options: ['membandingkan', 'mendengar', 'menutup'], answer: 'membandingkan' },
    ],
    kitabah: [
      { question: 'Paragraf opini B1 yang baik memiliki...', options: ['kalimat topik, alasan, contoh, penutup', 'satu kata saja', 'tanpa penghubung'], answer: 'kalimat topik, alasan, contoh, penutup' },
      { question: 'Penghubung "لِذٰلِكَ" berarti...', options: ['oleh karena itu', 'kemarin', 'siapa'], answer: 'oleh karena itu' },
      { question: 'Email semi-formal sebaiknya memakai gaya bahasa...', options: ['sopan dan jelas', 'terlalu santai tanpa salam', 'acak'], answer: 'sopan dan jelas' },
      { question: 'Frasa "مَعَ خَالِصِ الشُّكْرِ" cocok untuk...', options: ['penutup pesan sopan', 'menolak membaca', 'menanyakan umur'], answer: 'penutup pesan sopan' },
      { question: 'Saat merevisi tulisan, periksa...', options: ['urutan ide, penghubung, i‘rab penting', 'warna ikon saja', 'jumlah klik'], answer: 'urutan ide, penghubung, i‘rab penting' },
    ],
    mufradat: [
      { question: 'Kata "التَّحَدِّي" berarti...', options: ['tantangan', 'meja', 'pintu'], answer: 'tantangan' },
      { question: 'Kolokasi "يُوَاجِهُ تَحَدِّيًا" berarti...', options: ['menghadapi tantangan', 'membuka buku', 'menutup pintu'], answer: 'menghadapi tantangan' },
      { question: 'Cara terbaik menguasai mufradat B1 adalah...', options: ['pakai dalam kolokasi dan kalimat', 'hafal tanpa konteks', 'hanya baca arti Indonesia'], answer: 'pakai dalam kolokasi dan kalimat' },
      { question: 'Kata "الفُرْصَةُ" berarti...', options: ['kesempatan', 'kesalahan', 'kamar'], answer: 'kesempatan' },
      { question: 'Untuk tema teknologi, contoh kata yang tepat adalah...', options: ['التِّقْنِيَّةُ', 'الْخُبْزُ', 'النَّافِذَةُ'], answer: 'التِّقْنِيَّةُ' },
    ],
    grammar: [
      { question: 'Setelah "أَنْ", fiil mudhari biasanya menjadi...', options: ['manshub', 'majrur', 'mabni majhul selalu'], answer: 'manshub' },
      { question: 'Setelah "لَمْ", fiil mudhari biasanya menjadi...', options: ['majzum', 'manshub', 'mutsanna'], answer: 'majzum' },
      { question: 'Dalam "كَانَ الطَّالِبُ مُجْتَهِدًا", kata "مُجْتَهِدًا" adalah...', options: ['khabar kana manshub', 'faail marfu', 'huruf jar'], answer: 'khabar kana manshub' },
      { question: 'Faail dalam jumlah fi‘liyyah biasanya...', options: ['marfu', 'majrur karena huruf jar', 'selalu fathah'], answer: 'marfu' },
      { question: 'Maf‘ul bih biasanya berada pada posisi...', options: ['manshub', 'majrur', 'jazm'], answer: 'manshub' },
    ],
    pronunciation: [
      { question: 'Tafkhim berarti...', options: ['menebalkan bunyi', 'menghapus bunyi', 'menerjemahkan kata'], answer: 'menebalkan bunyi' },
      { question: 'Qalqalah dilatih pada huruf yang...', options: ['memantul saat sukun/waqaf', 'selalu panjang enam harakat', 'tidak diucapkan'], answer: 'memantul saat sukun/waqaf' },
      { question: 'Waqaf berdasarkan makna berarti...', options: ['berhenti saat satu unit makna selesai', 'berhenti di setiap huruf', 'tidak pernah berhenti'], answer: 'berhenti saat satu unit makna selesai' },
      { question: 'Minimal pair "صَبَرَ - سَفَرَ" melatih...', options: ['shad dan sin', 'ba dan mim', 'nun dan lam'], answer: 'shad dan sin' },
      { question: 'Shadowing dialog dilakukan dengan cara...', options: ['meniru audio seketika dengan ritme serupa', 'membaca tanpa suara', 'menulis arti saja'], answer: 'meniru audio seketika dengan ritme serupa' },
    ],
  };

  return [...base, ...skillQuestions[skillId]];
}

function getIntermediateExamples(skillId: ArabicSkillId): GeneratedArabicLesson['examples'] {
  const examples: Record<ArabicSkillId, GeneratedArabicLesson['examples']> = {
    kalam: [
      { arabic: 'فِي رَأْيِي، التَّعَلُّمُ الْمُسْتَمِرُّ مُهِمٌّ لِأَنَّهُ يَفْتَحُ فُرَصًا جَدِيدَةً.', transliteration: "Fi ra'yi, at-ta'allumu al-mustamirru muhimmun li-annahu yaftahu furashan jadidah.", meaning: 'Menurut saya, belajar berkelanjutan penting karena membuka kesempatan baru.' },
      { arabic: 'أُوَافِقُكَ فِي بَعْضِ النِّقَاطِ، وَلٰكِنْ عِنْدِي رَأْيٌ آخَرُ.', transliteration: "Uwafiquka fi ba'dhi an-niqath, walakin 'indi ra'yun akhar.", meaning: 'Saya setuju dengan beberapa poinmu, tetapi saya punya pendapat lain.' },
      { arabic: 'أَنْصَحُكَ أَنْ تَكْتُبَ خُطَّةً صَغِيرَةً كُلَّ أُسْبُوعٍ.', transliteration: 'Anshahuka an taktuba khutthatan shaghiratan kulla usbuuin.', meaning: 'Saya menyarankanmu menulis rencana kecil setiap minggu.' },
    ],
    istima: [
      { arabic: 'الْمُتَكَلِّمُ يَتَحَدَّثُ عَنْ أَهَمِّيَّةِ الْوَقْتِ فِي الدِّرَاسَةِ.', transliteration: "Al-mutakallimu yatahadatsu an ahammiyyati al-waqti fi ad-dirasah.", meaning: 'Pembicara berbicara tentang pentingnya waktu dalam belajar.' },
      { arabic: 'ذَكَرَ ثَلَاثَ نِقَاطٍ: التَّخْطِيطَ، وَالْمُرَاجَعَةَ، وَالصَّبْرَ.', transliteration: 'Dzakara tsalatsa niqath: at-takhthitha, wal-murajaah, wash-shabra.', meaning: 'Ia menyebut tiga poin: perencanaan, review, dan kesabaran.' },
      { arabic: 'الْخُلَاصَةُ أَنَّ التَّدْرِيبَ الْيَوْمِيَّ يُحَسِّنُ الْمَهَارَةَ.', transliteration: 'Al-khulashatu anna at-tadriba al-yaumiyya yuhassinu al-maharah.', meaning: 'Kesimpulannya, latihan harian meningkatkan keterampilan.' },
    ],
    qiraah: [
      { arabic: 'يَتَحَدَّثُ النَّصُّ عَنْ دَوْرِ التِّقْنِيَّةِ فِي التَّعْلِيمِ الْحَدِيثِ.', transliteration: 'Yatahadatsu an-nashshu an dauri at-tiqniyyati fi at-ta limi al-hadits.', meaning: 'Teks membahas peran teknologi dalam pendidikan modern.' },
      { arabic: 'بِسَبَبِ التَّنْظِيمِ الْجَيِّدِ، أَصْبَحَتِ الدِّرَاسَةُ أَسْهَلَ.', transliteration: 'Bi-sababi at-tanzhimi al-jayyid, ashbahati ad-dirasatu ashal.', meaning: 'Karena pengaturan yang baik, belajar menjadi lebih mudah.' },
      { arabic: 'بِاخْتِصَارٍ، يَدْعُو الْكَاتِبُ إِلَى التَّعَلُّمِ النَّشِيطِ.', transliteration: "Bi-ikhtisharin, yad'u al-katibu ila at-ta'allumi an-nasyith.", meaning: 'Secara singkat, penulis mengajak kepada pembelajaran aktif.' },
    ],
    kitabah: [
      { arabic: 'أَوَّلًا، أُرِيدُ أَنْ أُوَضِّحَ أَنَّ الْقِرَاءَةَ تُوَسِّعُ الْمَعْرِفَةَ.', transliteration: 'Awwalan, uridu an uwaddhih anna al-qiraata tuwassi u al-marifah.', meaning: 'Pertama, saya ingin menjelaskan bahwa membaca memperluas pengetahuan.' },
      { arabic: 'مِنْ نَاحِيَةٍ أُخْرَى، يَحْتَاجُ الطَّالِبُ إِلَى وَقْتٍ لِلْمُرَاجَعَةِ.', transliteration: 'Min nahiyatin ukhraa, yahtaju ath-thalibu ila waqtin lil-murajaah.', meaning: 'Di sisi lain, siswa membutuhkan waktu untuk review.' },
      { arabic: 'لِذٰلِكَ، أَرَى أَنَّ خُطَّةً صَغِيرَةً أَفْضَلُ مِنْ كَلَامٍ كَثِيرٍ.', transliteration: 'Lidzalika, ara anna khutthatan shaghiratan afdhalu min kalamin katsir.', meaning: 'Karena itu, saya melihat rencana kecil lebih baik daripada banyak bicara.' },
    ],
    mufradat: [
      { arabic: 'يُوَاجِهُ الطَّالِبُ تَحَدِّيًا جَدِيدًا فِي كُلِّ مَرْحَلَةٍ.', transliteration: 'Yuwajihu ath-thalibu tahaddiyan jadidan fi kulli marhalah.', meaning: 'Siswa menghadapi tantangan baru di setiap tahap.' },
      { arabic: 'التِّقْنِيَّةُ تُعْطِينَا فُرَصًا كَثِيرَةً لِلتَّعَلُّمِ.', transliteration: 'At-tiqniyyatu tuthina furashan katsiratan lit-taallum.', meaning: 'Teknologi memberi kita banyak kesempatan untuk belajar.' },
      { arabic: 'يُؤَثِّرُ الْإِعْلَامُ فِي الْمُجْتَمَعِ بِطُرُقٍ مُخْتَلِفَةٍ.', transliteration: "Yu-atstsiru al-i'lamu fi al-mujtama'i bi-thuruqin mukhtalifah.", meaning: 'Media memengaruhi masyarakat dengan berbagai cara.' },
    ],
    grammar: [
      { arabic: 'أُرِيدُ أَنْ أَتَعَلَّمَ الْعَرَبِيَّةَ كُلَّ يَوْمٍ.', transliteration: "Uridu an ata'allama al-arabiyyata kulla yaum.", meaning: 'Saya ingin belajar bahasa Arab setiap hari.' },
      { arabic: 'لَمْ يَذْهَبْ أَحْمَدُ إِلَى الْمَكْتَبَةِ أَمْسِ.', transliteration: 'Lam yadzhab Ahmad ila al-maktabati amsi.', meaning: 'Ahmad tidak pergi ke perpustakaan kemarin.' },
      { arabic: 'كَانَتِ الدِّرَاسَةُ مُفِيدَةً جِدًّا.', transliteration: 'Kanati ad-dirasatu mufidatan jiddan.', meaning: 'Pelajaran itu sangat bermanfaat.' },
    ],
    pronunciation: [
      { arabic: 'قَرَأَ الطَّالِبُ فِقْرَةً قَصِيرَةً بِصَوْتٍ وَاضِحٍ.', transliteration: "Qara'a ath-thalibu fiqratan qashiratan bi-shautin wadhih.", meaning: 'Latihan qaf, hamzah, dan ritme frasa.' },
      { arabic: 'صَبَرَ صَاحِبِي فِي السَّفَرِ الطَّوِيلِ.', transliteration: 'Shabara shahibi fi as-safari ath-thawil.', meaning: 'Latihan shad, sin, dan tafkhim.' },
      { arabic: 'عِنْدِي رَأْيٌ آخَرُ فِي هٰذَا الْمَوْضُوعِ.', transliteration: "Indi ra'yun akharu fi hadza al-maudhu.", meaning: 'Latihan ain, hamzah, dan waqaf makna.' },
    ],
  };

  return examples[skillId];
}

const upperIntermediateVocabulary: Record<ArabicSkillId, GeneratedArabicLesson['vocabulary']> = {
  kalam: [
    { arabic: 'مِنْ وِجْهَةِ نَظَرِي', transliteration: 'min wijhati nazhari', meaning: 'dari sudut pandang saya' },
    { arabic: 'عَلَى الرَّغْمِ مِنْ ذٰلِكَ', transliteration: "ala ar-raghmi min dzalik", meaning: 'meskipun demikian' },
    { arabic: 'يَجْدُرُ بِنَا أَنْ', transliteration: 'yajduru bina an', meaning: 'sebaiknya kita...' },
    { arabic: 'أُقِرُّ بِأَنَّ', transliteration: 'uqirru bi-anna', meaning: 'saya mengakui bahwa' },
    { arabic: 'لَا يَقْتَصِرُ عَلَى', transliteration: 'la yaqtashiru ala', meaning: 'tidak terbatas pada' },
    { arabic: 'وَمِنْ ثَمَّ', transliteration: 'wa min tsamma', meaning: 'oleh sebab itu/kemudian' },
  ],
  istima: [
    { arabic: 'النَّبْرَةُ', transliteration: 'an-nabrah', meaning: 'nada/tekanan suara' },
    { arabic: 'الْمَوْقِفُ', transliteration: 'al-mauqif', meaning: 'posisi/sikap' },
    { arabic: 'الدَّلِيلُ', transliteration: 'ad-dalil', meaning: 'bukti' },
    { arabic: 'الاعْتِرَاضُ', transliteration: 'al-iitiradh', meaning: 'keberatan/sanggahan' },
    { arabic: 'يَسْتَنْتِجُ', transliteration: 'yastantiju', meaning: 'menyimpulkan' },
    { arabic: 'يُشِيرُ إِلَى', transliteration: 'yushiru ila', meaning: 'menunjukkan kepada' },
  ],
  qiraah: [
    { arabic: 'الادِّعَاءُ', transliteration: 'al-iddi a', meaning: 'klaim' },
    { arabic: 'الْحُجَّةُ', transliteration: 'al-hujjah', meaning: 'argumen' },
    { arabic: 'الْبُرْهَانُ', transliteration: 'al-burhan', meaning: 'bukti/dalil' },
    { arabic: 'الانْحِيَازُ', transliteration: 'al-inhiyaz', meaning: 'bias/keberpihakan' },
    { arabic: 'السِّيَاقُ', transliteration: 'as-siyaq', meaning: 'konteks' },
    { arabic: 'يُقَيِّمُ', transliteration: 'yuqayyimu', meaning: 'mengevaluasi' },
  ],
  kitabah: [
    { arabic: 'تَتَمَثَّلُ الْمُشْكِلَةُ فِي', transliteration: 'tatamatstsalu al-musykilatu fi', meaning: 'masalahnya terletak pada' },
    { arabic: 'مِنَ الْجَدِيرِ بِالذِّكْرِ أَنَّ', transliteration: 'mina al-jadiri bidz-dzikri anna', meaning: 'perlu disebutkan bahwa' },
    { arabic: 'عَلَى خِلَافِ ذٰلِكَ', transliteration: 'ala khilafi dzalik', meaning: 'berbeda dengan itu' },
    { arabic: 'وَبِنَاءً عَلَى ذٰلِكَ', transliteration: 'wa bina-an ala dzalik', meaning: 'berdasarkan hal itu' },
    { arabic: 'تُظْهِرُ الْبَيَانَاتُ أَنَّ', transliteration: 'tuzhhiru al-bayanatu anna', meaning: 'data menunjukkan bahwa' },
    { arabic: 'خِتَامًا', transliteration: 'khitaman', meaning: 'sebagai penutup' },
  ],
  mufradat: [
    { arabic: 'الاسْتِدَامَةُ', transliteration: 'al-istidamah', meaning: 'keberlanjutan' },
    { arabic: 'التَّحَوُّلُ الرَّقْمِيُّ', transliteration: 'at-tahawwulu ar-raqmi', meaning: 'transformasi digital' },
    { arabic: 'الْمُسَاءَلَةُ', transliteration: 'al-musa-alah', meaning: 'akuntabilitas' },
    { arabic: 'الْفَجْوَةُ', transliteration: 'al-fajwah', meaning: 'kesenjangan' },
    { arabic: 'النَّهْجُ', transliteration: 'an-nahj', meaning: 'pendekatan' },
    { arabic: 'الْجَدْوَى', transliteration: 'al-jadwa', meaning: 'kelayakan/manfaat praktis' },
  ],
  grammar: [
    { arabic: 'مَصْدَرٌ مُؤَوَّلٌ', transliteration: 'mashdarun muawwal', meaning: 'masdar takwil dari an + fiil' },
    { arabic: 'مَفْعُولٌ مُطْلَقٌ', transliteration: 'maf ulun muthlaq', meaning: 'objek mutlak/penegas fiil' },
    { arabic: 'مَفْعُولٌ لِأَجْلِهِ', transliteration: 'maf ulun li-ajlih', meaning: 'keterangan tujuan/sebab' },
    { arabic: 'اسْمُ التَّفْضِيلِ', transliteration: 'ismu at-tafdhil', meaning: 'bentuk perbandingan/superlatif' },
    { arabic: 'الاسْتِثْنَاءُ', transliteration: 'al-istitsna', meaning: 'pengecualian' },
    { arabic: 'التَّوَابِعُ', transliteration: 'at-tawabi', meaning: 'naat, athaf, badal, taukid' },
  ],
  pronunciation: [
    { arabic: 'تَقْسِيمُ الْجُمْلَةِ', transliteration: 'taqsimu al-jumlah', meaning: 'chunking kalimat' },
    { arabic: 'نَبْرُ الْمَعْنَى', transliteration: 'nabru al-mana', meaning: 'tekanan makna' },
    { arabic: 'إِيقَاعُ الْخِطَابِ', transliteration: 'iqau al-khithab', meaning: 'ritme pidato' },
    { arabic: 'هَمْزَةُ الْوَصْلِ', transliteration: 'hamzatu al-washl', meaning: 'hamzah sambung' },
    { arabic: 'هَمْزَةُ الْقَطْعِ', transliteration: 'hamzatu al-qath', meaning: 'hamzah putus' },
    { arabic: 'التَّنْغِيمُ', transliteration: 'at-tanghim', meaning: 'intonasi/prosodi' },
  ],
};

const upperIntermediatePatterns: Record<ArabicSkillId, GeneratedArabicLesson['patterns']> = {
  kalam: [
    { label: 'Argumen seimbang', arabic: 'مِنْ وِجْهَةِ نَظَرِي، ... غَيْرَ أَنَّ ...', transliteration: 'Min wijhati nazhari, ... ghaira anna ...', meaning: 'Dari sudut pandang saya, ... namun ...' },
    { label: 'Konsesi', arabic: 'أُقِرُّ بِأَنَّ ... وَلٰكِنَّنِي أَرَى أَنَّ ...', transliteration: 'Uqirru bi-anna ... walakinnani ara anna ...', meaning: 'Saya mengakui bahwa ..., tetapi saya melihat bahwa ...' },
    { label: 'Kesimpulan forum', arabic: 'وَمِنْ ثَمَّ، يَجْدُرُ بِنَا أَنْ ...', transliteration: 'Wa min tsamma, yajduru bina an ...', meaning: 'Oleh sebab itu, sebaiknya kita ...' },
  ],
  istima: [
    { label: 'Posisi pembicara', arabic: 'يَبْدُو أَنَّ الْمُتَكَلِّمَ يَمِيلُ إِلَى ...', transliteration: 'Yabdu anna al-mutakallima yamilu ila ...', meaning: 'Tampaknya pembicara condong kepada ...' },
    { label: 'Makna tersirat', arabic: 'لَا يَقُولُ ذٰلِكَ صَرَاحَةً، وَلٰكِنَّهُ يُشِيرُ إِلَى ...', transliteration: 'La yaqulu dzalika sharahatan, walakinnahu yushiru ila ...', meaning: 'Ia tidak mengatakannya langsung, tetapi menunjukkan ...' },
    { label: 'Bukti audio', arabic: 'الدَّلِيلُ عَلَى ذٰلِكَ أَنَّهُ قَالَ ...', transliteration: 'Ad-dalilu ala dzalika annahu qala ...', meaning: 'Buktinya adalah ia mengatakan ...' },
  ],
  qiraah: [
    { label: 'Klaim penulis', arabic: 'يَدَّعِي الْكَاتِبُ أَنَّ ...', transliteration: 'Yaddai al-katibu anna ...', meaning: 'Penulis mengklaim bahwa ...' },
    { label: 'Evaluasi bukti', arabic: 'تَبْدُو الْحُجَّةُ قَوِيَّةً لِأَنَّهَا تَسْتَنِدُ إِلَى ...', transliteration: 'Tabdu al-hujjatu qawiyyatan li-annaha tastanidu ila ...', meaning: 'Argumen tampak kuat karena bersandar pada ...' },
    { label: 'Bias penulis', arabic: 'قَدْ يَكُونُ فِي النَّصِّ نَوْعٌ مِنَ الانْحِيَازِ نَحْوَ ...', transliteration: 'Qad yakunu fi an-nashshi nauun mina al-inhiyazi nahwa ...', meaning: 'Mungkin ada bias dalam teks terhadap ...' },
  ],
  kitabah: [
    { label: 'Tesis esai', arabic: 'تَتَمَثَّلُ الْقَضِيَّةُ الرَّئِيسِيَّةُ فِي أَنَّ ...', transliteration: 'Tatamatstsalu al-qadhiyyatu ar-raisiyyatu fi anna ...', meaning: 'Isu utama terletak pada bahwa ...' },
    { label: 'Counterpoint', arabic: 'عَلَى الرَّغْمِ مِنْ أَهَمِّيَّةِ هٰذَا الرَّأْيِ، فَإِنَّهُ لَا يَكْفِي لِـ ...', transliteration: 'Ala ar-raghmi min ahammiyyati hadza ar-rayi, fa-innahu la yakfi li...', meaning: 'Meski pendapat ini penting, ia belum cukup untuk ...' },
    { label: 'Penutup formal', arabic: 'خِتَامًا، يُمْكِنُ الْقَوْلُ إِنَّ ...', transliteration: 'Khitaman, yumkinu al-qaulu inna ...', meaning: 'Sebagai penutup, dapat dikatakan bahwa ...' },
  ],
  mufradat: [
    { label: 'Kebijakan', arabic: 'تَطْبِيقُ سِيَاسَةٍ مُسْتَدَامَةٍ', transliteration: 'Tathbiqu siyasatin mustadamah', meaning: 'Menerapkan kebijakan berkelanjutan' },
    { label: 'Dampak sosial', arabic: 'تَقْلِيلُ الْفَجْوَةِ الاجْتِمَاعِيَّةِ', transliteration: 'Taqlilu al-fajwati al-ijtima iyyah', meaning: 'Mengurangi kesenjangan sosial' },
    { label: 'Pendekatan', arabic: 'اتِّبَاعُ نَهْجٍ أَكْثَرَ فَعَالِيَّةً', transliteration: 'Ittibau nahjin aktsara faaliyyah', meaning: 'Mengikuti pendekatan yang lebih efektif' },
  ],
  grammar: [
    { label: 'Masdar muawwal', arabic: 'مِنَ الْمُهِمِّ أَنْ نُطَوِّرَ مَهَارَاتِنَا.', transliteration: 'Mina al-muhimmi an nuthawwira maharatina.', meaning: 'Penting untuk mengembangkan keterampilan kita. أَنْ نُطَوِّرَ berfungsi seperti masdar.' },
    { label: 'Maf‘ul li-ajlih', arabic: 'دَرَسَ الطَّالِبُ اجْتِهَادًا لِلنَّجَاحِ.', transliteration: 'Darasa ath-thalibu ijtihadan lin-najah.', meaning: 'Siswa belajar dengan sungguh-sungguh demi keberhasilan.' },
    { label: 'Istitsna', arabic: 'حَضَرَ الطُّلَّابُ إِلَّا طَالِبًا وَاحِدًا.', transliteration: 'Hadhara ath-thullabu illa thaliban wahidan.', meaning: 'Para siswa hadir kecuali satu siswa.' },
  ],
  pronunciation: [
    { label: 'Chunking B2', arabic: 'مِنْ وِجْهَةِ نَظَرِي | هٰذِهِ الْقَضِيَّةُ مُعَقَّدَةٌ | وَلٰكِنَّهَا مُهِمَّةٌ.', transliteration: 'Min wijhati nazhari | hadzihi al-qadhiyyatu muaqqadah | walakinnaha muhimmmah.', meaning: 'Bagi kalimat panjang menjadi unit makna.' },
    { label: 'Hamzah', arabic: 'اِسْتِدَامَةٌ - أَثَرٌ - مَسْؤُولِيَّةٌ', transliteration: 'Istidamah - atsar - mas-uliyyah.', meaning: 'Bedakan hamzah washal, qatha, dan hamzah tengah.' },
    { label: 'Prosodi debat', arabic: 'أُقِرُّ بِذٰلِكَ، وَلٰكِنَّ الدَّلِيلَ غَيْرُ كَافٍ.', transliteration: 'Uqirru bidzalika, walakinna ad-dalila ghairu kafin.', meaning: 'Tekan kata konsesi dan sanggahan.' },
  ],
};

function getUpperIntermediateExamples(skillId: ArabicSkillId): GeneratedArabicLesson['examples'] {
  const examples: Record<ArabicSkillId, GeneratedArabicLesson['examples']> = {
    kalam: [
      { arabic: 'مِنْ وِجْهَةِ نَظَرِي، لَا تَقْتَصِرُ جَوْدَةُ التَّعْلِيمِ عَلَى الْمَنَاهِجِ، بَلْ تَشْمَلُ طَرِيقَةَ التَّفْكِيرِ.', transliteration: 'Min wijhati nazhari, la taqtashiru jaudatu at-ta limi ala al-manahij, bal tasyml tariqata at-tafkir.', meaning: 'Menurut saya, kualitas pendidikan tidak terbatas pada kurikulum, tetapi juga mencakup cara berpikir.' },
      { arabic: 'أُقِرُّ بِأَنَّ التِّقْنِيَّةَ مُفِيدَةٌ، وَلٰكِنَّ اسْتِخْدَامَهَا دُونَ وَعْيٍ قَدْ يُسَبِّبُ مُشْكِلَاتٍ.', transliteration: 'Uqirru bi-anna at-tiqniyyata mufidah, walakinna istikhdamaha duna wayin qad yusabbibu musykilat.', meaning: 'Saya mengakui teknologi bermanfaat, tetapi penggunaannya tanpa kesadaran dapat menimbulkan masalah.' },
      { arabic: 'وَمِنْ ثَمَّ، يَجْدُرُ بِنَا أَنْ نَبْحَثَ عَنْ حُلُولٍ وَاقِعِيَّةٍ وَمُسْتَدَامَةٍ.', transliteration: 'Wa min tsamma, yajduru bina an nabhatsa an hululin waqiiyyah wa mustadamah.', meaning: 'Karena itu, sebaiknya kita mencari solusi realistis dan berkelanjutan.' },
    ],
    istima: [
      { arabic: 'يَبْدُو أَنَّ الْمُتَكَلِّمَ لَا يَرْفُضُ الْفِكْرَةَ كَامِلَةً، بَلْ يَعْتَرِضُ عَلَى طَرِيقَةِ تَطْبِيقِهَا.', transliteration: 'Yabdu anna al-mutakallima la yarfudhu al-fikrata kamilah, bal yatiridhu ala tariqati tathbiqiha.', meaning: 'Tampaknya pembicara tidak menolak seluruh ide, melainkan keberatan pada cara penerapannya.' },
      { arabic: 'الدَّلِيلُ عَلَى مَوْقِفِهِ أَنَّهُ ذَكَرَ تَجْرِبَةً وَاقِعِيَّةً فِي نِهَايَةِ الْحِوَارِ.', transliteration: 'Ad-dalilu ala mauqifihi annahu dzakara tajribatan waqiiyyatan fi nihayati al-hiwar.', meaning: 'Bukti posisinya adalah ia menyebut pengalaman nyata di akhir dialog.' },
      { arabic: 'الْخُلَاصَةُ الضِّمْنِيَّةُ هِيَ أَنَّ الْحَلَّ يَحْتَاجُ إِلَى تَعَاوُنٍ بَيْنَ عِدَّةِ أَطْرَافٍ.', transliteration: 'Al-khulashatu adh-dhimniyyatu hiya anna al-halla yahtaju ila taawunin baina iddati athraf.', meaning: 'Kesimpulan tersiratnya adalah solusi membutuhkan kerja sama beberapa pihak.' },
    ],
    qiraah: [
      { arabic: 'يَدَّعِي الْكَاتِبُ أَنَّ التَّحَوُّلَ الرَّقْمِيَّ فُرْصَةٌ، لٰكِنَّهُ يُحَذِّرُ مِنْ تَوْسِيعِ الْفَجْوَةِ بَيْنَ النَّاسِ.', transliteration: 'Yaddai al-katibu anna at-tahawwula ar-raqmi furshah, lakinnahu yuhadzdziru min tawsi i al-fajwah baina an-nas.', meaning: 'Penulis mengklaim transformasi digital adalah peluang, tetapi memperingatkan pelebaran kesenjangan antar manusia.' },
      { arabic: 'تَبْدُو الْحُجَّةُ مُقْنِعَةً لِأَنَّهَا تَجْمَعُ بَيْنَ الْبَيَانَاتِ وَالْأَمْثِلَةِ الْوَاقِعِيَّةِ.', transliteration: 'Tabdu al-hujjatu muqniah li-annaha tajmau baina al-bayanat wal-amtsilah al-waqiiyyah.', meaning: 'Argumen tampak meyakinkan karena menggabungkan data dan contoh nyata.' },
      { arabic: 'وَمَعَ ذٰلِكَ، يَظْهَرُ فِي النَّصِّ انْحِيَازٌ وَاضِحٌ نَحْوَ الْحُلُولِ التِّقْنِيَّةِ.', transliteration: 'Wa maa dzalik, yazhharu fi an-nashshi inhiyazun wadhihun nahwa al-hululi at-tiqniyyah.', meaning: 'Namun, tampak bias jelas dalam teks ke arah solusi teknologi.' },
    ],
    kitabah: [
      { arabic: 'تَتَمَثَّلُ الْمُشْكِلَةُ الرَّئِيسِيَّةُ فِي أَنَّ الْحُلُولَ السَّرِيعَةَ لَا تُعَالِجُ أَسْبَابَ الْقَضِيَّةِ.', transliteration: 'Tatamatstsalu al-musykilatu ar-raisiyyatu fi anna al-hulula as-sariah la tualiju asbaba al-qadhiyyah.', meaning: 'Masalah utama terletak pada solusi cepat yang tidak menangani penyebab isu.' },
      { arabic: 'عَلَى الرَّغْمِ مِنْ أَنَّ هٰذَا الاقْتِرَاحَ جَذَّابٌ، فَإِنَّ تَطْبِيقَهُ يَحْتَاجُ إِلَى مَوَارِدَ كَافِيَةٍ.', transliteration: 'Ala ar-raghmi min anna hadza al-iqtiraha jadzdzab, fa-inna tathbiqahu yahtaju ila mawarida kafiyah.', meaning: 'Meski usulan ini menarik, penerapannya membutuhkan sumber daya yang cukup.' },
      { arabic: 'خِتَامًا، يُمْكِنُ الْقَوْلُ إِنَّ النَّهْجَ الْمُتَوَازِنَ أَكْثَرُ فَعَالِيَّةً مِنَ الْقَرَارَاتِ الْمُتَسَرِّعَةِ.', transliteration: 'Khitaman, yumkinu al-qaulu inna an-nahja al-mutawazina aktsaru faaliyyatan mina al-qararat al-mutasarriah.', meaning: 'Sebagai penutup, pendekatan seimbang lebih efektif daripada keputusan tergesa-gesa.' },
    ],
    mufradat: [
      { arabic: 'يَتَطَلَّبُ تَحْقِيقُ الاسْتِدَامَةِ نَهْجًا طَوِيلَ الْمَدَى وَمُشَارَكَةً مُجْتَمَعِيَّةً.', transliteration: 'Yatathallabu tahqiqu al-istidamah nahjan thawila al-mada wa musyarakatan mujtamaiyyah.', meaning: 'Mewujudkan keberlanjutan membutuhkan pendekatan jangka panjang dan partisipasi masyarakat.' },
      { arabic: 'قَدْ يُسَاعِدُ التَّحَوُّلُ الرَّقْمِيُّ فِي تَقْلِيلِ الْفَجْوَةِ إِذَا صَاحَبَتْهُ مُسَاءَلَةٌ وَاضِحَةٌ.', transliteration: 'Qad yusaidu at-tahawwulu ar-raqmi fi taqlili al-fajwah idza shahabathu musa-alah wadhihah.', meaning: 'Transformasi digital dapat mengurangi kesenjangan jika disertai akuntabilitas yang jelas.' },
      { arabic: 'لَا بُدَّ مِنْ دِرَاسَةِ الْجَدْوَى قَبْلَ تَبَنِّي أَيِّ سِيَاسَةٍ جَدِيدَةٍ.', transliteration: 'La budda min dirasati al-jadwa qabla tabanni ayyi siyasatin jadidah.', meaning: 'Perlu studi kelayakan sebelum mengadopsi kebijakan baru.' },
    ],
    grammar: [
      { arabic: 'مِنَ الضَّرُورِيِّ أَنْ نُقَيِّمَ النَّتَائِجَ قَبْلَ اتِّخَاذِ الْقَرَارِ.', transliteration: 'Mina adh-dharuri an nuqayyima an-nataija qabla ittikhadzi al-qarar.', meaning: 'Penting untuk mengevaluasi hasil sebelum mengambil keputusan.' },
      { arabic: 'سَعَى الْفَرِيقُ سَعْيًا جَادًّا لِتَحْقِيقِ الْهَدَفِ.', transliteration: 'Saa al-fariqu sayan jaddan li-tahqiqi al-hadaf.', meaning: 'Tim berusaha dengan sungguh-sungguh untuk mencapai tujuan.' },
      { arabic: 'شَارَكَ الْحَاضِرُونَ كُلُّهُمْ إِلَّا مُمَثِّلًا وَاحِدًا.', transliteration: 'Syaraka al-hadhiruna kulluhum illa mumatstsilan wahidan.', meaning: 'Semua peserta ikut kecuali satu perwakilan.' },
    ],
    pronunciation: [
      { arabic: 'مِنْ وِجْهَةِ نَظَرِي، هٰذِهِ الْمَسْأَلَةُ تَحْتَاجُ إِلَى نِقَاشٍ أَعْمَقَ.', transliteration: 'Min wijhati nazhari, hadzihi al-mas-alatu tahtaju ila niqashin amaq.', meaning: 'Latihan hamzah tengah, ain, dan chunking.' },
      { arabic: 'عَلَى الرَّغْمِ مِنْ ذٰلِكَ، تَبْقَى الْحُجَّةُ قَابِلَةً لِلنِّقَاشِ.', transliteration: 'Ala ar-raghmi min dzalik, tabqa al-hujjatu qabilatan lin-niqash.', meaning: 'Latihan qaf, ghain, dan waqaf logis.' },
      { arabic: 'الاسْتِدَامَةُ لَيْسَتْ شِعَارًا فَقَطْ، بَلْ مَسْؤُولِيَّةٌ مُشْتَرَكَةٌ.', transliteration: 'Al-istidamatu laisat shi aran faqath, bal mas-uliyyatun musytarakah.', meaning: 'Latihan hamzah washal, qaf, dan ritme pidato.' },
    ],
  };

  return examples[skillId];
}

function getIntermediateFocus(skillId: ArabicSkillId): string[] {
  const shared = [
    'Pakai materi sebagai input dan output: dengar/baca, lalu ucapkan/tulis ulang',
    'Tambahkan alasan, contoh, atau penghubung supaya kalimat naik ke level B1',
  ];

  const skillFocus: Record<ArabicSkillId, string[]> = {
    kalam: ['Bangun jawaban 4 langkah: pendapat, alasan, contoh, kesimpulan', 'Latih respons sopan saat setuju, tidak setuju, dan meminta klarifikasi'],
    istima: ['Dengarkan untuk menangkap gagasan utama sebelum detail', 'Catat kata sinyal seperti karena, tetapi, pertama, dan kesimpulannya'],
    qiraah: ['Pindai judul dan kata kunci sebelum membaca intensif', 'Bedakan informasi utama, detail pendukung, dan opini penulis'],
    kitabah: ['Susun paragraf dengan kalimat topik, alasan, contoh, dan penutup', 'Gunakan penghubung supaya tulisan terasa rapi dan koheren'],
    mufradat: ['Pelajari kosakata sebagai kolokasi, bukan kata terpisah', 'Gunakan sinonim/antonim sederhana untuk memperluas ekspresi'],
    grammar: ['Kenali fungsi i‘rab dalam kalimat: marfu, manshub, majrur, majzum', 'Terapkan pola nahwu-sharaf dalam kalimat komunikatif'],
    pronunciation: ['Latih makharij dalam kalimat penuh, bukan bunyi terpisah saja', 'Rekam dan cek ritme, waqaf, tafkhim, tarqiq, dan panjang mad'],
  };

  return [...skillFocus[skillId], ...shared];
}

function getUpperIntermediateFocus(skillId: ArabicSkillId): string[] {
  const shared = [
    'Bangun respons B2 dengan tesis, alasan, contoh, konsesi, dan kesimpulan',
    'Perhatikan register: bedakan gaya santai, formal, akademik ringan, dan presentasi',
  ];

  const skillFocus: Record<ArabicSkillId, string[]> = {
    kalam: ['Sampaikan argumen 90-120 detik dengan struktur jelas', 'Gunakan frasa konsesi sebelum menolak atau membatasi pendapat'],
    istima: ['Tangkap makna tersirat, nada ragu, dan posisi pembicara', 'Buat catatan poin utama, bukti, dan kesimpulan saat audio berjalan'],
    qiraah: ['Evaluasi kekuatan argumen penulis, bukan hanya isi teks', 'Identifikasi klaim, bukti, contoh, konsesi, dan kesimpulan'],
    kitabah: ['Tulis esai B2 dengan tesis, paragraf pendukung, counterpoint, dan penutup', 'Revisi koherensi, register formal, dan variasi struktur kalimat'],
    mufradat: ['Gunakan kolokasi akademik dan frasa argumentatif dalam konteks', 'Bedakan nuansa sinonim agar pilihan kata lebih presisi'],
    grammar: ['Analisis struktur dalam paragraf panjang dan hubungan antarklausa', 'Pakai pola nahwu-sharaf lanjutan untuk memperjelas argumen'],
    pronunciation: ['Jaga prosodi saat membaca teks panjang dan argumentatif', 'Latih chunking supaya kalimat panjang tetap jelas dan natural'],
  };

  return [...skillFocus[skillId], ...shared];
}

function getAdvancedFocus(skillId: ArabicSkillId): string[] {
  const shared = [
    'Gunakan sintesis, nuansa, dan register akademik/profesional yang konsisten',
    'Kontrol struktur wacana: tesis, argumentasi, counterpoint, bukti, dan penutup retoris',
  ];

  const skillFocus: Record<ArabicSkillId, string[]> = {
    kalam: ['Bangun respons panjang yang tetap koheren saat ada interupsi', 'Gunakan retorika sopan untuk menguatkan atau membatasi klaim'],
    istima: ['Tangkap sikap implisit, pergeseran posisi, dan kesimpulan tidak langsung', 'Sintesis beberapa pembicara tanpa bergantung pada transkrip penuh'],
    qiraah: ['Analisis asumsi, bias, struktur wacana, dan strategi retorika penulis', 'Bandingkan dua teks dan simpulkan posisi konseptualnya'],
    kitabah: ['Tulis esai/laporan dengan tesis bernuansa dan kohesi antargagasan', 'Revisi diksi, register, dan transisi agar terdengar profesional'],
    mufradat: ['Pilih diksi presisi untuk argumen abstrak dan akademik', 'Gunakan kolokasi formal serta idiom retoris secara alami'],
    grammar: ['Gunakan nahwu, sharaf, dan balaghah dasar untuk membangun wacana', 'Analisis i‘rab dan rujukan dhamir dalam paragraf utuh'],
    pronunciation: ['Kelola pacing, jeda retoris, tekanan kontras, dan self-correction', 'Sampaikan teks panjang dengan artikulasi stabil dan intonasi matang'],
  };

  return [...skillFocus[skillId], ...shared];
}

function getProficiencyFocus(skillId: ArabicSkillId): string[] {
  const shared = [
    'Kelola nuansa C2: sintesis lintas gagasan, ambiguitas terkontrol, dan register akademik/sastra/profesional',
    'Produksi wacana panjang yang presisi, kohesif, dan tetap natural saat menghadapi sanggahan atau teks kompleks',
  ];

  const skillFocus: Record<ArabicSkillId, string[]> = {
    kalam: ['Bangun orasi, debat, atau forum ahli dengan alur retoris yang matang', 'Sederhanakan ide kompleks tanpa kehilangan presisi konsep'],
    istima: ['Tangkap ironi, implikatur, perubahan kerangka berpikir, dan strategi pembicara', 'Rekonstruksi argumen panjang dari beberapa pembicara atau sumber audio'],
    qiraah: ['Baca teks padat secara kritis: asumsi, intertekstualitas, kohesi, dan implikasi ideologis', 'Sintesis beberapa sumber menjadi posisi konseptual yang utuh'],
    kitabah: ['Tulis esai, memo, resensi, atau laporan strategis dengan gaya C2 yang presisi', 'Revisi diksi, kohesi, dan retorika agar setiap paragraf memiliki fungsi argumentatif'],
    mufradat: ['Pilih leksikon konseptual, idiom formal, metafora, dan kolokasi tingkat mahir', 'Bedakan sinonim bernuansa agar sikap penulis/pembicara terlihat tepat'],
    grammar: ['Analisis nahwu-balaghah dalam wacana panjang dan gunakan struktur retoris secara sadar', 'Kontrol hasr, qashr, iltifat, taqdim-taakhir, dan rujukan dhamir jauh'],
    pronunciation: ['Sampaikan teks panjang dengan prosodi matang, jeda retoris, dan tekanan ide utama', 'Jaga artikulasi makharij saat berbicara cepat, formal, atau spontan'],
  };

  return [...skillFocus[skillId], ...shared];
}

function getIntermediateExplanation(skillId: ArabicSkillId, topic: string): string[] {
  const intro = `Lesson ini memakai tema "${topic}" untuk mendorong kemampuan Arabic intermediate: memahami konteks, memilih struktur yang tepat, dan memproduksi kalimat yang lebih panjang.`;
  const explanations: Record<ArabicSkillId, string[]> = {
    kalam: [intro, 'Target kalam B1 adalah mampu berbicara spontan dalam dialog terkontrol: memberi opini, bertanya balik, menolak secara sopan, dan menutup ide dengan ringkasan singkat.'],
    istima: [intro, 'Target istima B1 adalah menangkap gagasan utama walaupun tidak semua kata dipahami. Dengarkan sinyal wacana seperti أَوَّلًا, وَلٰكِنْ, لِذٰلِكَ, dan الْخُلَاصَةُ.'],
    qiraah: [intro, 'Target qiraah B1 adalah membaca teks pendek-menengah dengan strategi: prediksi isi dari judul, cari kata kunci, lalu rangkum tanpa menerjemahkan setiap kata.'],
    kitabah: [intro, 'Target kitabah B1 adalah menulis paragraf koheren. Setiap tulisan perlu satu gagasan utama, dua alasan/detail, dan penutup yang tidak mengulang kata persis.'],
    mufradat: [intro, 'Target mufradat B1 adalah memakai kata dalam pasangan umum atau kolokasi. Satu kata baru harus masuk ke frasa, kalimat, dan konteks dialog/tulisan.'],
    grammar: [intro, 'Target grammar B1 adalah mengenali pola nahwu-sharaf saat membaca dan memakainya saat menulis: fiil, faail, maf‘ul, kana/inna, idafah, naat, manshub, dan majzum.'],
    pronunciation: [intro, 'Target pronunciation B1 adalah stabil saat membaca frasa panjang: bunyi tebal-tipis jelas, mad tidak hilang, waqaf sesuai makna, dan ritme kalimat terdengar natural.'],
  };

  return explanations[skillId];
}

function getUpperIntermediateExplanation(skillId: ArabicSkillId, topic: string): string[] {
  const intro = `Lesson B2 ini memakai tema "${topic}" untuk melatih Arabic upper-intermediate: memahami ide kompleks, menyusun argumen, dan memakai register yang lebih matang.`;
  const explanations: Record<ArabicSkillId, string[]> = {
    kalam: [intro, 'Target kalam B2 adalah berbicara lebih panjang dan terstruktur: buka dengan tesis, dukung dengan alasan, akui sisi lain, lalu simpulkan posisi secara sopan.'],
    istima: [intro, 'Target istima B2 adalah memahami hubungan ide dalam audio panjang: klaim, contoh, keberatan, sikap pembicara, dan kesimpulan yang kadang tidak diucapkan secara langsung.'],
    qiraah: [intro, 'Target qiraah B2 adalah membaca kritis. Jangan berhenti pada arti umum; cari bagaimana penulis membangun argumen dan apakah bukti yang diberikan cukup kuat.'],
    kitabah: [intro, 'Target kitabah B2 adalah menulis esai, email formal, laporan, dan tanggapan kritis dengan koherensi, register tepat, dan transisi antargagasan.'],
    mufradat: [intro, 'Target mufradat B2 adalah memilih kata yang presisi sesuai konteks, memakai kolokasi formal, dan menghindari pengulangan kata yang terlalu dasar.'],
    grammar: [intro, 'Target grammar B2 adalah memakai struktur nahwu-sharaf untuk membaca teks panjang dan membangun kalimat kompleks: hal, tamyiz, masdar muawwal, syarat, dan konektor wacana.'],
    pronunciation: [intro, 'Target pronunciation B2 adalah kejelasan dalam teks panjang: tekanan makna, jeda logis, stabilitas huruf sulit, dan intonasi presentasi atau debat.'],
  };

  return explanations[skillId];
}

function getAdvancedExplanation(skillId: ArabicSkillId, topic: string): string[] {
  const intro = `Lesson C1 ini memakai tema "${topic}" untuk melatih Arabic advanced: memahami nuansa, menyusun sintesis, dan memakai register akademik/profesional dengan kontrol tinggi.`;
  const explanations: Record<ArabicSkillId, string[]> = {
    kalam: [intro, 'Target kalam C1 adalah berbicara panjang, spontan, dan bernuansa: membangun argumen, menangani interupsi, menyintesis pandangan, dan menjaga kesopanan retoris.'],
    istima: [intro, 'Target istima C1 adalah menangkap struktur argumen panjang, sikap implisit, ironi ringan, dan hubungan antarpembicara tanpa bergantung pada transkrip.'],
    qiraah: [intro, 'Target qiraah C1 adalah membaca kritis dan analitis: mengenali bias, asumsi, kohesi teks, strategi retorika, dan ide yang tersirat di balik kalimat.'],
    kitabah: [intro, 'Target kitabah C1 adalah menulis esai, laporan, proposal, dan tanggapan kritis dengan tesis bernuansa, kohesi kuat, register formal, dan transisi elegan.'],
    mufradat: [intro, 'Target mufradat C1 adalah memilih diksi presisi, kolokasi akademik, idiom formal, dan ekspresi retoris sesuai tujuan komunikasi.'],
    grammar: [intro, 'Target grammar C1 adalah mengontrol nahwu-sharaf dan balaghah dasar dalam wacana: hasr, qashr, syarth kompleks, badal, taukid, hal jumlah, dan kohesi dhamir.'],
    pronunciation: [intro, 'Target pronunciation C1 adalah delivery profesional: prosodi, pacing, waqaf retoris, tekanan kontras, artikulasi jelas, dan self-correction natural.'],
  };

  return explanations[skillId];
}

function getProficiencyExplanation(skillId: ArabicSkillId, topic: string): string[] {
  const intro = `Lesson C2 ini memakai tema "${topic}" untuk melatih Arabic proficiency: memahami wacana sangat kompleks, mengolah nuansa, dan menghasilkan bahasa Arab yang presisi, kohesif, serta matang secara retoris.`;
  const explanations: Record<ArabicSkillId, string[]> = {
    kalam: [intro, 'Target kalam C2 adalah mampu berbicara seperti peserta forum ahli: spontan, terstruktur, bernuansa, mampu merespons sanggahan tajam, dan tetap menjaga adab serta ketepatan istilah.'],
    istima: [intro, 'Target istima C2 adalah memahami audio autentik yang cepat atau padat: implikatur, ironi, pergeseran posisi, konflik kerangka berpikir, dan kesimpulan yang tidak selalu dinyatakan eksplisit.'],
    qiraah: [intro, 'Target qiraah C2 adalah membaca teks akademik, opini, kebijakan, atau sastra modern secara kritis: melihat asumsi, strategi retorika, intertekstualitas, dan implikasi argumen.'],
    kitabah: [intro, 'Target kitabah C2 adalah menulis teks bernilai tinggi: esai akademik, policy memo, resensi, laporan strategis, atau editorial dengan tesis kuat, kohesi halus, dan diksi presisi.'],
    mufradat: [intro, 'Target mufradat C2 adalah menguasai kosakata konseptual, kolokasi akademik, metafora, idiom formal, dan pilihan kata yang menunjukkan sikap: reservasi, konsensus, kritik, atau penekanan.'],
    grammar: [intro, 'Target grammar C2 adalah memakai nahwu, sharaf, dan balaghah untuk membangun makna tingkat wacana: hasr, qashr, kinayah, majaz, syarat bertingkat, dan rujukan dhamir lintas paragraf.'],
    pronunciation: [intro, 'Target pronunciation C2 adalah delivery mahir: pacing terukur, waqaf strategis, tekanan ide, artikulasi stabil, self-repair natural, dan intonasi yang sesuai dengan konteks formal atau sastra.'],
  };

  return explanations[skillId];
}

function getAdvancedExamples(skillId: ArabicSkillId): GeneratedArabicLesson['examples'] {
  const examples: Record<ArabicSkillId, GeneratedArabicLesson['examples']> = {
    kalam: [
      { arabic: 'لَا يَخْفَى أَنَّ التَّغَيُّرَاتِ الرَّقْمِيَّةَ سَرِيعَةٌ، غَيْرَ أَنَّ السُّؤَالَ الْأَعْمَقَ هُوَ: كَيْفَ نَضْمَنُ عَدَالَتَهَا؟', transliteration: 'La yakhfa anna at-taghayyurati ar-raqmiyyata sari ah, ghaira anna as-suala al-amaq huwa: kaifa nadhmanu adalataha?', meaning: 'Tidak dapat dipungkiri perubahan digital cepat, tetapi pertanyaan lebih dalam adalah bagaimana menjamin keadilannya.' },
      { arabic: 'إِذَا جَمَعْنَا بَيْنَ الْحُرِّيَّةِ وَالْمَسْؤُولِيَّةِ، ظَهَرَ أَنَّ الْحَلَّ يَحْتَاجُ إِلَى رُؤْيَةٍ مُتَكَامِلَةٍ.', transliteration: 'Idza jama na baina al-hurriyyati wal-mas-uliyyah, zhahara anna al-halla yahtaju ila ru-yatin mutakamilah.', meaning: 'Jika kebebasan dan tanggung jawab dipadukan, solusi membutuhkan visi terpadu.' },
      { arabic: 'خُلَاصَةُ الْقَوْلِ أَنَّ الْقَضِيَّةَ لَيْسَتْ تِقْنِيَّةً فَحَسْبُ، بَلْ إِنْسَانِيَّةٌ أَيْضًا.', transliteration: 'Khulashatu al-qaul anna al-qadhiyyata laisat tiqniyyatan fahasb, bal insaniyyatun aidhan.', meaning: 'Kesimpulannya, isu ini bukan hanya teknis, tetapi juga kemanusiaan.' },
    ],
    istima: [
      { arabic: 'النَّبْرَةُ الضِّمْنِيَّةُ تُوحِي بِأَنَّ الْمُحَاضِرَ يَتَحَفَّظُ عَلَى الْحَلِّ السَّهْلِ.', transliteration: 'An-nabratu adh-dhimniyyatu tuhi bi-anna al-muhadhira yatahaffazhu ala al-halli as-sahl.', meaning: 'Nada implisit menunjukkan dosen memberi reservasi terhadap solusi mudah.' },
      { arabic: 'يَنْتَقِلُ الْمُتَكَلِّمُ مِنَ الْوَصْفِ إِلَى التَّحْلِيلِ عِنْدَمَا يَرْبِطُ الْمِثَالَ بِالسِّيَاقِ الْعَامِّ.', transliteration: 'Yantaqilu al-mutakallimu mina al-washfi ila at-tahlil indama yarbithu al-mitsala bis-siyaqi al-amm.', meaning: 'Pembicara beralih dari deskripsi ke analisis saat mengaitkan contoh dengan konteks umum.' },
      { arabic: 'الاسْتِنْتَاجُ الضِّمْنِيُّ هُوَ أَنَّ الْمُشْكِلَةَ أَعْمَقُ مِنْ مُجَرَّدِ نَقْصٍ فِي الْمَوَارِدِ.', transliteration: 'Al-istintaju adh-dhimni huwa anna al-musykilata amaqu min mujarradi naqshin fi al-mawarid.', meaning: 'Kesimpulan tersiratnya adalah masalah lebih dalam dari sekadar kekurangan sumber daya.' },
    ],
    qiraah: [
      { arabic: 'يَبْنِي الْكَاتِبُ خِطَابَهُ عَلَى افْتِرَاضٍ ضِمْنِيٍّ مَفَادُهُ أَنَّ التَّقَدُّمَ يُقَاسُ بِالسُّرْعَةِ.', transliteration: 'Yabni al-katibu khithabahu ala iftiradhin dhimni mafaduhu anna at-taqadduma yuqasu bis-surah.', meaning: 'Penulis membangun wacana di atas asumsi implisit bahwa kemajuan diukur dengan kecepatan.' },
      { arabic: 'يَسْتَخْدِمُ النَّصُّ التَّقَابُلَ بَيْنَ الْمَرْكَزِ وَالْهَامِشِ لِتَوْضِيحِ التَّفَاوُتِ.', transliteration: 'Yastakhdimu an-nashshu at-taqabula baina al-markazi wal-hamisy li-taudhihi at-tafawut.', meaning: 'Teks memakai kontras pusat dan pinggiran untuk menjelaskan ketimpangan.' },
      { arabic: 'عِنْدَ مُقَارَنَةِ النَّصَّيْنِ، نَجِدُ أَنَّ كِلَيْهِمَا يَنْطَلِقُ مِنْ مَفْهُومِ الْعَدَالَةِ.', transliteration: 'Inda muqaranati an-nashshain, najidu anna kilaihima yanthaliqu min mafhumi al-adalah.', meaning: 'Saat membandingkan dua teks, keduanya bertolak dari konsep keadilan.' },
    ],
    kitabah: [
      { arabic: 'تَسْعَى هٰذِهِ الْوَرَقَةُ إِلَى بَيَانِ أَنَّ التَّحَوُّلَ الرَّقْمِيَّ لَيْسَ مَسَارًا تِقْنِيًّا فَحَسْبُ.', transliteration: 'Tasa hadzihi al-waraqatu ila bayani anna at-tahawwula ar-raqmi laisa masaran tiqniyyan fahasb.', meaning: 'Tulisan ini menunjukkan bahwa transformasi digital bukan sekadar jalur teknis.' },
      { arabic: 'مِنْ زَاوِيَةٍ تَحْلِيلِيَّةٍ، يَنْبَغِي التَّمْيِيزُ بَيْنَ الْوُصُولِ إِلَى الْمَعْلُومَةِ وَالْقُدْرَةِ عَلَى تَفْسِيرِهَا.', transliteration: 'Min zawiyatin tahliliyyah, yanbaghi at-tamyizu baina al-wushuli ila al-malumah wal-qudrati ala tafsiriha.', meaning: 'Secara analitis, akses informasi perlu dibedakan dari kemampuan menafsirkannya.' },
      { arabic: 'خُلَاصَةُ الْقَوْلِ أَنَّ النَّهْجَ الْمُتَوَازِنَ يَجْمَعُ بَيْنَ الْمَبْدَإِ وَالْوَاقِعِ.', transliteration: 'Khulashatu al-qaul anna an-nahja al-mutawazina yajmau baina al-mabda-i wal-waqi.', meaning: 'Kesimpulannya, pendekatan seimbang memadukan prinsip dan realitas.' },
    ],
    mufradat: [
      { arabic: 'تُسَاهِمُ الْحَوْكَمَةُ الرَّشِيدَةُ فِي تَقْوِيَةِ مَشْرُوعِيَّةِ الْقَرَارِ.', transliteration: 'Tusahimu al-haukamatu ar-rasyidah fi taqwiyati masyru iyyati al-qarar.', meaning: 'Tata kelola yang baik memperkuat legitimasi keputusan.' },
      { arabic: 'قَدْ يُهَدِّدُ التَّفَاوُتُ الاقْتِصَادِيُّ التَّمَاسُكَ الاجْتِمَاعِيَّ عَلَى الْمَدَى الطَّوِيلِ.', transliteration: 'Qad yuhaddidu at-tafawutu al-iqtishadi at-tamasuka al-ijtima i ala al-mada ath-thawil.', meaning: 'Ketimpangan ekonomi dapat mengancam kohesi sosial jangka panjang.' },
      { arabic: 'تَكْشِفُ هٰذِهِ الْجَدَلِيَّةُ عَنْ تَحَوُّلٍ بُنْيَوِيٍّ فِي طَرِيقَةِ التَّفْكِيرِ.', transliteration: 'Taksyifu hadzihi al-jadaliyyatu an tahawwulin bunyawi fi tariqati at-tafkir.', meaning: 'Dialektika ini mengungkap perubahan struktural dalam cara berpikir.' },
    ],
    grammar: [
      { arabic: 'مَا الْإِصْلَاحُ إِلَّا عَمَلِيَّةٌ طَوِيلَةٌ تَحْتَاجُ إِلَى صَبْرٍ.', transliteration: 'Ma al-ishlahu illa amaliyyatun thawilah tahtaju ila shabr.', meaning: 'Reformasi tidak lain adalah proses panjang yang membutuhkan kesabaran.' },
      { arabic: 'إِنَّ هٰذَا الْمَوْقِفَ، وَإِنْ بَدَا مُتَشَدِّدًا، يَقُومُ عَلَى اعْتِبَارٍ أَخْلَاقِيٍّ.', transliteration: 'Inna hadza al-mauqifa, wa in bada mutasyaddidan, yaqumu ala itibarin akhlaqi.', meaning: 'Posisi ini, meski tampak keras, berdasar pada pertimbangan etis.' },
      { arabic: 'لَيْسَتِ الْكِنَايَةُ تَزْيِينًا لِلْكَلَامِ فَقَطْ، بَلْ وَسِيلَةٌ لِتَوْسِيعِ الدَّلَالَةِ.', transliteration: 'Laisati al-kinayatu tazyinan lil-kalam faqath, bal wasilatun li-tausii ad-dalalah.', meaning: 'Kinayah bukan hiasan bahasa saja, tetapi sarana memperluas makna.' },
    ],
    pronunciation: [
      { arabic: 'لَا يَكْفِي أَنْ نَصِفَ الْوَاقِعَ | بَلْ يَنْبَغِي أَنْ نُحَلِّلَ شُرُوطَهُ.', transliteration: 'La yakfi an nashifa al-waqi | bal yanbaghi an nuhallila syuruthah.', meaning: 'Latihan jeda retoris dan tekanan kontras.' },
      { arabic: 'خُلَاصَةُ الْقَوْلِ أَنَّ الْمَسْؤُولِيَّةَ مُشْتَرَكَةٌ، وَلَا تَقَعُ عَلَى طَرَفٍ وَاحِدٍ.', transliteration: 'Khulashatu al-qaul anna al-mas-uliyyata musytarakah, wa la taqau ala tharafin wahid.', meaning: 'Latihan hamzah, qaf, dan intonasi penutup.' },
      { arabic: 'إِنَّ التَّوَازُنَ بَيْنَ السُّرْعَةِ وَالدِّقَّةِ شَرْطٌ لِكُلِّ خِطَابٍ مِهْنِيٍّ.', transliteration: 'Inna at-tawazuna baina as-surati wad-diqqati syarthun likulli khithabin mihni.', meaning: 'Latihan delivery formal dan ritme C1.' },
    ],
  };

  return examples[skillId];
}

function getAdvancedSteps(skillId: ArabicSkillId): string[] {
  const steps: Record<ArabicSkillId, string[]> = {
    kalam: ['Formulasikan tesis bernuansa', 'Sintesis dua posisi berbeda', 'Tangani keberatan dengan sopan', 'Tutup dengan rekomendasi retoris'],
    istima: ['Petakan struktur argumen audio', 'Catat perubahan sikap pembicara', 'Tentukan makna implisit', 'Sintesis posisi beberapa pembicara'],
    qiraah: ['Identifikasi asumsi implisit', 'Analisis strategi retorika', 'Bandingkan dua teks/sudut pandang', 'Tulis evaluasi kritis'],
    kitabah: ['Bangun tesis akademik', 'Susun argumen dan counterargument', 'Gunakan transisi formal', 'Revisi kohesi dan register C1'],
    mufradat: ['Pilih diksi presisi', 'Bangun kolokasi akademik', 'Gunakan idiom formal secara wajar', 'Uji kata dalam konteks argumentatif'],
    grammar: ['Parsing paragraf utuh', 'Tandai hasr, syarth, badal, dan dhamir', 'Ubah struktur tanpa mengubah makna', 'Terapkan balaghah dasar'],
    pronunciation: ['Tentukan jeda retoris', 'Latih tekanan kontras', 'Jaga pacing 3 menit', 'Lakukan self-correction natural'],
  };

  return steps[skillId];
}

function makeAdvancedPractice(skillId: ArabicSkillId, topic: string): GeneratedArabicLesson['practice'] {
  const shared = [
    { question: 'Ciri utama output C1 adalah...', options: ['nuansa, sintesis, register tepat, dan kontrol struktur', 'kalimat satu kata', 'hafalan tanpa konteks'], answer: 'nuansa, sintesis, register tepat, dan kontrol struktur' },
    { question: 'Ungkapan “لَا يَخْفَى أَنَّ” berfungsi untuk...', options: ['membuka argumen yang dianggap jelas/umum', 'menanyakan tempat', 'mengucapkan salam'], answer: 'membuka argumen yang dianggap jelas/umum' },
    { question: '“خُلَاصَةُ الْقَوْلِ” berarti...', options: ['kesimpulannya', 'di pagi hari', 'siapa namamu'], answer: 'kesimpulannya' },
    { question: `Dalam topik "${topic}", tugas C1 menuntut...`, options: ['analisis dan sintesis beberapa sudut pandang', 'jawaban ya/tidak saja', 'menyalin kata'], answer: 'analisis dan sintesis beberapa sudut pandang' },
    { question: 'Register akademik/profesional berarti...', options: ['diksi presisi, transisi jelas, dan nada terkontrol', 'bahasa acak', 'tanpa struktur'], answer: 'diksi presisi, transisi jelas, dan nada terkontrol' },
  ];

  const bySkill: Record<ArabicSkillId, GeneratedArabicLesson['practice']> = {
    kalam: [
      { question: 'Saat menangani interupsi dalam diskusi C1, respons terbaik adalah...', options: ['mengakui poin lawan lalu kembali ke tesis utama', 'mengabaikan semua orang', 'mengulang salam'], answer: 'mengakui poin lawan lalu kembali ke tesis utama' },
      { question: '“إِذَا جَمَعْنَا بَيْنَ الرَّأْيَيْنِ” menunjukkan...', options: ['sintesis dua pandangan', 'penolakan total', 'pertanyaan lokasi'], answer: 'sintesis dua pandangan' },
    ],
    istima: [
      { question: 'Listening C1 menuntut pemahaman...', options: ['sikap implisit dan struktur argumen', 'kata pertama saja', 'warna suara saja'], answer: 'sikap implisit dan struktur argumen' },
      { question: '“اسْتِنْتَاجٌ ضِمْنِيٌّ” berarti...', options: ['kesimpulan tersirat', 'alat tulis', 'harga barang'], answer: 'kesimpulan tersirat' },
    ],
    qiraah: [
      { question: '“الافْتِرَاضُ الضِّمْنِيُّ” berarti...', options: ['asumsi implisit', 'kata kerja lampau', 'alamat rumah'], answer: 'asumsi implisit' },
      { question: 'Analisis wacana membaca teks dari sisi...', options: ['struktur argumen, bias, dan strategi retorika', 'jumlah titik saja', 'warna halaman'], answer: 'struktur argumen, bias, dan strategi retorika' },
    ],
    kitabah: [
      { question: 'Tesis tulisan C1 sebaiknya...', options: ['bernuansa dan dapat diperdebatkan', 'terlalu umum', 'satu kata'], answer: 'bernuansa dan dapat diperdebatkan' },
      { question: '“يَنْبَغِي التَّمْيِيزُ بَيْنَ” berarti...', options: ['perlu dibedakan antara', 'selamat sore', 'di mana'], answer: 'perlu dibedakan antara' },
    ],
    mufradat: [
      { question: '“الْحَوْكَمَةُ” berarti...', options: ['tata kelola', 'buku kecil', 'warna merah'], answer: 'tata kelola' },
      { question: '“التَّمَاسُكُ الاجْتِمَاعِيُّ” berarti...', options: ['kohesi sosial', 'alat transportasi', 'hari libur'], answer: 'kohesi sosial' },
    ],
    grammar: [
      { question: '“مَا ... إِلَّا ...” sering membentuk...', options: ['uslub hasr', 'kata tanya tempat', 'jumlah angka'], answer: 'uslub hasr' },
      { question: 'Jumlah i‘tiradhiyyah adalah...', options: ['kalimat sisipan yang memberi nuansa tambahan', 'kata benda tunggal', 'huruf sambung'], answer: 'kalimat sisipan yang memberi nuansa tambahan' },
    ],
    pronunciation: [
      { question: 'Waqaf retoris dipakai untuk...', options: ['menekankan unit makna dan memberi ruang pada pendengar', 'menghapus arti', 'membaca tanpa jeda'], answer: 'menekankan unit makna dan memberi ruang pada pendengar' },
      { question: 'Delivery C1 yang baik menjaga...', options: ['pacing, tekanan kontras, artikulasi, dan intonasi penutup', 'semua kata datar', 'kecepatan acak'], answer: 'pacing, tekanan kontras, artikulasi, dan intonasi penutup' },
    ],
  };

  return [...shared, ...bySkill[skillId]];
}

function getIntermediateTask(skillId: ArabicSkillId, topic: string) {
  const tasks: Record<ArabicSkillId, string> = {
    kalam: `Rekam dialog 60-90 detik tentang ${topic.toLowerCase()}. Gunakan minimal 2 ungkapan opini, 1 alasan dengan لِأَنَّ, dan 1 respons klarifikasi.`,
    istima: `Putar contoh TTS 3 kali. Catat gagasan utama, 3 detail, dan kesimpulan. Setelah itu ucapkan ulang ringkasannya dalam bahasa Indonesia atau Arab sederhana.`,
    qiraah: `Baca contoh Arab dengan suara pelan, tandai kata penghubung, lalu tulis ringkasan 3 kalimat tentang ${topic.toLowerCase()}.`,
    kitabah: `Tulis paragraf Arab 6-8 kalimat tentang ${topic.toLowerCase()}. Pakai أَوَّلًا, مِنْ نَاحِيَةٍ أُخْرَى, dan لِذٰلِكَ.`,
    mufradat: `Buat 10 kalimat dari kosakata lesson ini. Minimal 5 kalimat harus memakai kolokasi, bukan kata tunggal.`,
    grammar: `Analisis 5 contoh: tentukan fiil, faail, maf‘ul/khabar, lalu buat 5 kalimat baru dengan pola yang sama.`,
    pronunciation: `Rekam bacaan contoh sebanyak 2 versi: lambat dan natural. Tandai bagian tafkhim, ghunnah, qalqalah, dan waqaf.`,
  };

  return tasks[skillId];
}

function getProficiencyVocabulary(skillId: ArabicSkillId): GeneratedArabicLesson['vocabulary'] {
  const extra: Record<ArabicSkillId, GeneratedArabicLesson['vocabulary']> = {
    kalam: [
      { arabic: 'مِنْ زَاوِيَةٍ أُخْرَى', transliteration: 'min zawiyatin ukhra', meaning: 'dari sudut lain' },
      { arabic: 'لَا يَقْتَصِرُ الْأَمْرُ عَلَى', transliteration: 'la yaqtashiru al-amru ala', meaning: 'persoalannya tidak terbatas pada' },
      { arabic: 'رُؤْيَةٌ مُتَعَدِّدَةُ الْأَبْعَادِ', transliteration: 'ru-yatun mutaaddidatu al-abad', meaning: 'pandangan multidimensi' },
      { arabic: 'تَسْوِيَةٌ مَبْدَئِيَّةٌ', transliteration: 'taswiyatun mabda-iyyah', meaning: 'kompromi berbasis prinsip' },
    ],
    istima: [
      { arabic: 'مَا بَيْنَ السُّطُورِ', transliteration: 'ma baina as-suthur', meaning: 'makna di balik ujaran' },
      { arabic: 'نَبْرَةٌ تَهَكُّمِيَّةٌ', transliteration: 'nabratu tahakkumiyyah', meaning: 'nada sindiran/ironi' },
      { arabic: 'قَرِينَةٌ صَوْتِيَّةٌ', transliteration: 'qarinatun shautiyyah', meaning: 'petunjuk audio/kontekstual' },
      { arabic: 'إِعَادَةُ بِنَاءِ الْمَعْنَى', transliteration: 'iadatu bina-i al-mana', meaning: 'rekonstruksi makna' },
    ],
    qiraah: [
      { arabic: 'قِرَاءَةٌ تَأْوِيلِيَّةٌ', transliteration: 'qira-atun ta-wiliyyah', meaning: 'pembacaan interpretatif' },
      { arabic: 'بِنْيَةٌ خِطَابِيَّةٌ', transliteration: 'binyatun khithabiyyah', meaning: 'struktur wacana' },
      { arabic: 'افْتِرَاضٌ غَيْرُ مُصَرَّحٍ بِهِ', transliteration: 'iftiradhun ghairu musharrahin bih', meaning: 'asumsi yang tidak dinyatakan' },
      { arabic: 'تَفْكِيكُ الْحُجَّةِ', transliteration: 'tafkiku al-hujjah', meaning: 'membedah argumen' },
    ],
    kitabah: [
      { arabic: 'تَسْعَى هَذِهِ الدِّرَاسَةُ إِلَى', transliteration: 'tasa hadzihi ad-dirasatu ila', meaning: 'kajian ini berupaya untuk' },
      { arabic: 'مَعَ التَّحَفُّظِ عَلَى', transliteration: 'maa at-tahaffuzh ala', meaning: 'dengan catatan/reservasi terhadap' },
      { arabic: 'يَتَعَيَّنُ إِعَادَةُ النَّظَرِ فِي', transliteration: 'yataayyanu iadatu an-nazhar fi', meaning: 'perlu ditinjau kembali' },
      { arabic: 'خِلَافًا لِلتَّصَوُّرِ الشَّائِعِ', transliteration: 'khilafan lit-tashawwuri asy-sya-i', meaning: 'berbeda dari anggapan umum' },
    ],
    mufradat: [
      { arabic: 'الْمُفَارَقَةُ', transliteration: 'al-mufaraqah', meaning: 'paradoks/ironi konseptual' },
      { arabic: 'التَّرَاتُبِيَّةُ', transliteration: 'at-taratubiyyah', meaning: 'hierarki' },
      { arabic: 'الْمُسَاءَلَةُ', transliteration: 'al-musa-alah', meaning: 'akuntabilitas' },
      { arabic: 'التَّدَاخُلُ', transliteration: 'at-tadakhul', meaning: 'interseksi/tumpang tindih' },
    ],
    grammar: [
      { arabic: 'التَّقْدِيمُ وَالتَّأْخِيرُ', transliteration: 'at-taqdim wat-ta-khir', meaning: 'pemindahan urutan untuk efek retoris' },
      { arabic: 'الْاِلْتِفَاتُ', transliteration: 'al-iltifat', meaning: 'pergeseran sudut tutur' },
      { arabic: 'الْقَصْرُ بِالنَّفْيِ وَالْاِسْتِثْنَاءِ', transliteration: 'al-qashru bin-nafyi wal-istitsna', meaning: 'pembatasan dengan negasi dan pengecualian' },
      { arabic: 'تَرَابُطٌ دَلَالِيٌّ', transliteration: 'tarabuthun dalali', meaning: 'kohesi semantik' },
    ],
    pronunciation: [
      { arabic: 'نَبْرُ الْكَلِمَةِ الْمِحْوَرِيَّةِ', transliteration: 'nabru al-kalimati al-mihwariyyah', meaning: 'tekanan pada kata kunci' },
      { arabic: 'تَدَرُّجُ النَّغْمَةِ', transliteration: 'tadarruju an-naghmah', meaning: 'gradasi intonasi' },
      { arabic: 'وَقْفٌ اِسْتِرَاتِيجِيٌّ', transliteration: 'waqfun istiratiji', meaning: 'jeda strategis' },
      { arabic: 'وُضُوحُ الْمَخَارِجِ', transliteration: 'wudhuhu al-makharij', meaning: 'kejelasan titik artikulasi' },
    ],
  };

  return [...(advancedVocabulary[skillId] ?? []), ...(extra[skillId] ?? [])];
}

function getProficiencyPatterns(skillId: ArabicSkillId): GeneratedArabicLesson['patterns'] {
  const extra: Record<ArabicSkillId, GeneratedArabicLesson['patterns']> = {
    kalam: [
      { label: 'Reframing C2', arabic: 'لَعَلَّ الْأَدَقَّ أَنْ نُعِيدَ صِيَاغَةَ السُّؤَالِ: ...', transliteration: 'Laalla al-adaqqa an nuida shiyaghata as-sual: ...', meaning: 'Mungkin yang lebih tepat adalah merumuskan ulang pertanyaannya: ...' },
      { label: 'Sintesis kritis', arabic: 'لَا يَكْمُنُ الْإِشْكَالُ فِي ... فَحَسْبُ، بَلْ فِي ... أَيْضًا.', transliteration: 'La yakmunu al-isygalu fi ... fahasb, bal fi ... aidhan.', meaning: 'Masalahnya bukan hanya pada ..., tetapi juga pada ...' },
    ],
    istima: [
      { label: 'Inferensi implisit', arabic: 'يُفْهَمُ مِنْ نَبْرَةِ الْمُتَحَدِّثِ أَنَّهُ يَتَحَفَّظُ عَلَى ...', transliteration: 'Yufhamu min nabrati al-mutahadditsi annahu yatahaffazhu ala ...', meaning: 'Dari nada pembicara dapat dipahami bahwa ia memberi reservasi terhadap ...' },
      { label: 'Rekonstruksi argumen', arabic: 'إِذَا جَمَعْنَا الْإِشَارَاتِ الصَّوْتِيَّةَ وَالسِّيَاقَ، بَدَا أَنَّ ...', transliteration: 'Idza jamana al-isyarat ash-shautiyyah was-siyaq, bada anna ...', meaning: 'Jika petunjuk audio dan konteks digabungkan, tampak bahwa ...' },
    ],
    qiraah: [
      { label: 'Analisis asumsi', arabic: 'يَنْطَلِقُ النَّصُّ مِنْ افْتِرَاضٍ غَيْرِ مُصَرَّحٍ بِهِ، وَهُوَ أَنَّ ...', transliteration: 'Yanthaliqu an-nashshu min iftiradhin ghairi musharrahin bih, wa huwa anna ...', meaning: 'Teks bertolak dari asumsi tersirat, yaitu bahwa ...' },
      { label: 'Evaluasi wacana', arabic: 'تَكْمُنُ قُوَّةُ الْحُجَّةِ فِي ... غَيْرَ أَنَّ ضَعْفَهَا يَظْهَرُ فِي ...', transliteration: 'Takmunu quwwatu al-hujjah fi ... ghaira anna dhafaha yazhharu fi ...', meaning: 'Kekuatan argumen ada pada ..., tetapi kelemahannya tampak pada ...' },
    ],
    kitabah: [
      { label: 'Tesis C2', arabic: 'تُجَادِلُ هَذِهِ الْمَقَالَةُ بِأَنَّ ... لَا يُفْهَمُ إِلَّا فِي ضَوْءِ ...', transliteration: 'Tujadilu hadzihi al-maqalah bi-anna ... la yufhamu illa fi dhau-i ...', meaning: 'Esai ini berargumen bahwa ... tidak dapat dipahami kecuali dalam terang ...' },
      { label: 'Reservasi akademik', arabic: 'وَمَعَ أَنَّ هَذَا الطَّرْحَ وَجِيهٌ، فَإِنَّهُ يَغْفُلُ عَنْ ...', transliteration: 'Wa maa anna hadza ath-tharha wajih, fa-innahu yaghfulu an ...', meaning: 'Meskipun gagasan ini masuk akal, ia mengabaikan ...' },
    ],
    mufradat: [
      { label: 'Nuansa evaluatif', arabic: 'لَيْسَتِ الْقَضِيَّةُ مُجَرَّدَ ... بَلْ هِيَ تَجَلٍّ لِـ ...', transliteration: 'Laisati al-qadhiyyatu mujarrada ..., bal hiya tajallin li ...', meaning: 'Isu ini bukan sekadar ..., melainkan manifestasi dari ...' },
      { label: 'Presisi konsep', arabic: 'يَنْبَغِي التَّمْيِيزُ بَيْنَ ... وَ ... لِأَنَّ الْخَلْطَ بَيْنَهُمَا يُفْضِي إِلَى ...', transliteration: 'Yanbaghi at-tamyizu baina ... wa ... li-anna al-khaltha bainahuma yufdhi ila ...', meaning: 'Perlu dibedakan antara ... dan ... karena pencampurannya mengarah pada ...' },
    ],
    grammar: [
      { label: 'Qashr retoris', arabic: 'مَا ... إِلَّا ...', transliteration: 'Ma ... illa ...', meaning: 'Pola pembatasan: tidak lain hanyalah ...' },
      { label: 'Jumlah sisipan', arabic: 'إِنَّ هَذَا الْمَوْقِفَ، وَإِنْ بَدَا ...، يَقُومُ عَلَى ...', transliteration: 'Inna hadza al-mauqifa, wa in bada ..., yaqumu ala ...', meaning: 'Klausa sisipan untuk memberi nuansa konsesi.' },
    ],
    pronunciation: [
      { label: 'Jeda retoris', arabic: 'لَا يَكْفِي أَنْ نَصِفَ الْوَاقِعَ | بَلْ يَنْبَغِي أَنْ نُحَلِّلَ شُرُوطَهُ.', transliteration: 'La yakfi an nashifa al-waqi | bal yanbaghi an nuhallila syuruthah.', meaning: 'Gunakan jeda untuk memisahkan klaim dan penguatan.' },
      { label: 'Tekanan kontras', arabic: 'لَيْسَ الْمَقْصُودُ هُنَا السُّرْعَةَ، بَلِ الدِّقَّةَ.', transliteration: 'Laisa al-maqshudu huna as-surah, bal ad-diqqah.', meaning: 'Tekankan kata kontras: bukan kecepatan, tetapi presisi.' },
    ],
  };

  return [...(advancedPatterns[skillId] ?? []), ...(extra[skillId] ?? [])];
}

function getProficiencyExamples(skillId: ArabicSkillId): GeneratedArabicLesson['examples'] {
  const extra: Record<ArabicSkillId, GeneratedArabicLesson['examples']> = {
    kalam: [
      { arabic: 'لَعَلَّ الْأَدَقَّ أَنْ نَقُولَ إِنَّ الْقَضِيَّةَ لَا تَتَعَلَّقُ بِالْوَسِيلَةِ فَحَسْبُ، بَلْ بِالْإِطَارِ الَّذِي نَفْهَمُ مِنْ خِلَالِهِ الْوَسِيلَةَ.', transliteration: 'Laalla al-adaqqa an naqula inna al-qadhiyyata la tataallaqu bil-wasilati fahasb, bal bil-ithari alladzi nafhamu min khilalihi al-wasilah.', meaning: 'Isu ini bukan hanya terkait alat, tetapi kerangka untuk memahami alat itu.' },
      { arabic: 'أَتَفَهَّمُ هَذَا الِاعْتِرَاضَ، غَيْرَ أَنَّهُ يَفْتَرِضُ أَنَّ الْحَلَّ التِّقْنِيَّ كَافٍ بِذَاتِهِ.', transliteration: 'Atafahhamu hadza al-itiradh, ghaira annahu yaftaridhu anna al-halla at-tiqniya kafin bidzatih.', meaning: 'Saya memahami keberatan ini, tetapi ia mengasumsikan solusi teknis cukup dengan sendirinya.' },
    ],
    istima: [
      { arabic: 'يَنْتَقِلُ الْمُتَحَدِّثُ مِنَ الْوَصْفِ إِلَى النَّقْدِ عِنْدَمَا يُغَيِّرُ نَبْرَتَهُ وَيَسْتَخْدِمُ كَلِمَةَ "غَيْرَ أَنَّ".', transliteration: 'Yantaqilu al-mutahadditsu mina al-washfi ila an-naqdi indama yughayyiru nabratahu wa yastakhdimu kalimata ghaira anna.', meaning: 'Pembicara beralih dari deskripsi ke kritik saat mengubah nada dan memakai “namun”.' },
      { arabic: 'الْمَعْنَى الضِّمْنِيُّ لَيْسَ فِي الْجُمْلَةِ الْأَخِيرَةِ فَقَطْ، بَلْ فِي تَرَاكُمِ الْإِشَارَاتِ طُولَ الْحِوَارِ.', transliteration: 'Al-mana adh-dhimni laisa fi al-jumlati al-akhirati faqath, bal fi tarakumi al-isyarat thula al-hiwar.', meaning: 'Makna implisit muncul dari akumulasi petunjuk sepanjang dialog.' },
    ],
    qiraah: [
      { arabic: 'يُقَدِّمُ النَّصُّ نَفْسَهُ كَتَحْلِيلٍ مُحَايِدٍ، لَكِنَّ اخْتِيَارَ الْأَمْثِلَةِ يَكْشِفُ مَيْلًا تَفْسِيرِيًّا وَاضِحًا.', transliteration: 'Yuqaddimu an-nashshu nafsahu katahlilin muhayid, lakinna ikhtiyara al-amtsilah yaksyifu mailan tafsiriyyan wadihan.', meaning: 'Teks tampak netral, tetapi pilihan contohnya mengungkap kecenderungan interpretatif.' },
      { arabic: 'لَا يَكْفِي تَلْخِيصُ الْفِكْرَةِ؛ بَلْ يَنْبَغِي تَحْلِيلُ مَا يَفْتَرِضُهُ الْكَاتِبُ وَلَا يُصَرِّحُ بِهِ.', transliteration: 'La yakfi talkhishu al-fikrah; bal yanbaghi tahlilu ma yaftaridhuhu al-katibu wa la yusharrihu bih.', meaning: 'Tidak cukup merangkum ide; perlu menganalisis asumsi penulis yang tidak dinyatakan.' },
    ],
    kitabah: [
      { arabic: 'تُجَادِلُ هَذِهِ الْوَرَقَةُ بِأَنَّ الْإِصْلَاحَ لَا يُقَاسُ بِسُرْعَةِ التَّنْفِيذِ فَقَطْ، بَلْ بِقُدْرَتِهِ عَلَى إِنْتَاجِ عَدَالَةٍ مُسْتَدَامَةٍ.', transliteration: 'Tujadilu hadzihi al-waraqatu bi-anna al-ishlaha la yuqasu bisurati at-tanfidz faqath, bal biqudratihi ala intaji adalatin mustadamah.', meaning: 'Reformasi tidak hanya diukur dari kecepatan, tetapi dari keadilan berkelanjutan.' },
      { arabic: 'وَمَعَ وُجَاهَةِ هَذَا الطَّرْحِ، فَإِنَّهُ يَتَجَاهَلُ الْعَوَامِلَ الثَّقَافِيَّةَ الَّتِي تُشَكِّلُ سُلُوكَ الْأَفْرَادِ.', transliteration: 'Wa maa wajahati hadza ath-tharh, fa-innahu yatajahalu al-awamila ats-tsaqafiyyata allati tusyakkilu suluka al-afrad.', meaning: 'Meski gagasan ini kuat, ia mengabaikan faktor budaya yang membentuk perilaku individu.' },
    ],
    mufradat: [
      { arabic: 'تُسْتَخْدَمُ كَلِمَةُ "الْمُسَاءَلَةِ" لِلْإِشَارَةِ إِلَى رَبْطِ السُّلْطَةِ بِالْمَسْؤُولِيَّةِ.', transliteration: 'Tustakhdamu kalimatu al-musa-alah lil-isyarati ila rabthi as-sulthati bil-mas-uliyyah.', meaning: 'Kata “akuntabilitas” menghubungkan kekuasaan dengan tanggung jawab.' },
      { arabic: 'الْمُفَارَقَةُ أَنَّ الْوَسَائِلَ الَّتِي تُقَرِّبُ النَّاسَ قَدْ تُعَمِّقُ شُعُورَهُمْ بِالْعُزْلَةِ.', transliteration: 'Al-mufaraqatu anna al-wasaila allati tuqarribu an-nasa qad tuammiqu syuurahum bil-uzlah.', meaning: 'Paradoksnya, alat yang mendekatkan manusia dapat memperdalam rasa kesepian.' },
    ],
    grammar: [
      { arabic: 'مَا الْإِصْلَاحُ إِلَّا مُحَاوَلَةٌ لِإِعَادَةِ تَرْتِيبِ الْعَلَاقَةِ بَيْنَ الْمَبْدَإِ وَالْوَاقِعِ.', transliteration: 'Ma al-ishlahu illa muhawalatun li-iadati tartibi al-alaqati baina al-mabda-i wal-waqi.', meaning: 'Reformasi tidak lain adalah upaya menata ulang hubungan prinsip dan realitas.' },
      { arabic: 'إِنَّ هَذَا الْخِطَابَ، وَإِنْ بَدَا مُحَايِدًا، يُخْفِي افْتِرَاضًا قِيمِيًّا عَمِيقًا.', transliteration: 'Inna hadza al-khithaba, wa in bada muhayidan, yukhfi iftiradhan qimiyyan amiqan.', meaning: 'Wacana ini, meski tampak netral, menyembunyikan asumsi nilai yang dalam.' },
    ],
    pronunciation: [
      { arabic: 'لَيْسَ الْمَقْصُودُ أَنْ نَتَكَلَّمَ أَسْرَعَ، بَلْ أَنْ نَتَكَلَّمَ أَدَقَّ.', transliteration: 'Laisa al-maqshudu an natakallama asra, bal an natakallama adaqq.', meaning: 'Latihan tekanan kontras: bukan lebih cepat, melainkan lebih presisi.' },
      { arabic: 'خُلَاصَةُ الْقَوْلِ | أَنَّ الْوُضُوحَ لَا يَنْفَصِلُ عَنِ الْإِيقَاعِ وَالْوَقْفِ.', transliteration: 'Khulashatu al-qaul | anna al-wudhuha la yanfashilu ani al-iqa wal-waqf.', meaning: 'Latihan jeda strategis sebelum kesimpulan.' },
    ],
  };

  return [...getAdvancedExamples(skillId), ...(extra[skillId] ?? [])];
}

function getProficiencySteps(skillId: ArabicSkillId): string[] {
  const steps: Record<ArabicSkillId, string[]> = {
    kalam: ['Tentukan tesis dan batas klaim', 'Antisipasi sanggahan paling kuat', 'Sintesiskan dua sudut pandang', 'Tutup dengan rekomendasi bernuansa'],
    istima: ['Dengar untuk peta argumen', 'Catat petunjuk nada dan implikatur', 'Rekonstruksi posisi pembicara', 'Bandingkan dengan kemungkinan tafsir lain'],
    qiraah: ['Petakan klaim dan asumsi', 'Bedah strategi retorika penulis', 'Evaluasi bukti dan celah argumen', 'Tulis sintesis kritis 120 kata'],
    kitabah: ['Bangun tesis C2 yang dapat diperdebatkan', 'Susun paragraf dengan fungsi jelas', 'Masukkan reservasi dan counterargument', 'Revisi diksi, kohesi, dan register'],
    mufradat: ['Kelompokkan kosakata berdasarkan fungsi wacana', 'Buat kolokasi dan antonim bernuansa', 'Pakai dalam paragraf konseptual', 'Ucapkan ulang dalam respons lisan'],
    grammar: ['Tandai struktur retoris', 'Analisis rujukan dhamir dan kohesi', 'Ubah struktur tanpa mengubah makna', 'Pakai pola dalam paragraf C2'],
    pronunciation: ['Bagi teks menjadi unit wacana', 'Tentukan kata yang diberi tekanan', 'Latih jeda retoris dan intonasi akhir', 'Rekam versi formal 4 menit'],
  };

  return steps[skillId];
}

function makeProficiencyPractice(skillId: ArabicSkillId, topic: string): GeneratedArabicLesson['practice'] {
  const c2Shared: GeneratedArabicLesson['practice'] = [
    { question: 'Output C2 yang paling kuat ditandai oleh...', options: ['sintesis, presisi konsep, konsesi matang, dan kohesi wacana', 'hafalan frasa pendek tanpa konteks', 'kalimat acak tanpa tesis'], answer: 'sintesis, presisi konsep, konsesi matang, dan kohesi wacana' },
    { question: 'Frasa “لَعَلَّ الْأَدَقَّ أَنْ...” dipakai untuk...', options: ['mereformulasi ide dengan presisi lebih tinggi', 'menanyakan lokasi benda', 'menyebut angka dasar'], answer: 'mereformulasi ide dengan presisi lebih tinggi' },
    { question: 'Dalam level C2, “nuansa” berarti...', options: ['membedakan sikap, batas klaim, implikasi, dan register', 'mempercepat bicara tanpa makna', 'menghindari struktur kompleks'], answer: 'membedakan sikap, batas klaim, implikasi, dan register' },
    { question: `Untuk topik "${topic}", respons C2 sebaiknya...`, options: ['membandingkan kerangka, mengevaluasi bukti, lalu menyimpulkan posisi', 'menjawab satu kata saja', 'mengulang terjemahan literal'], answer: 'membandingkan kerangka, mengevaluasi bukti, lalu menyimpulkan posisi' },
    { question: '“مَعَ التَّحَفُّظِ عَلَى...” menunjukkan...', options: ['reservasi atau pembatasan terhadap klaim', 'salam pembuka informal', 'arah jalan'], answer: 'reservasi atau pembatasan terhadap klaim' },
    { question: 'Strategi terbaik saat menghadapi ambiguitas adalah...', options: ['menyebut beberapa tafsir dan memberi alasan memilih tafsir paling kuat', 'mengabaikan ambiguitas', 'menghapus semua detail'], answer: 'menyebut beberapa tafsir dan memberi alasan memilih tafsir paling kuat' },
    { question: 'Pola “مَا ... إِلَّا ...” berfungsi untuk...', options: ['qashr/pembatasan makna', 'menambah kata tanya', 'membentuk jamak mudzakkar'], answer: 'qashr/pembatasan makna' },
    { question: 'Sintesis berbeda dari ringkasan karena sintesis...', options: ['menggabungkan beberapa ide menjadi posisi baru yang koheren', 'hanya memotong teks', 'hanya menerjemahkan kata'], answer: 'menggabungkan beberapa ide menjadi posisi baru yang koheren' },
    { question: 'Kriteria revisi C2 paling penting adalah...', options: ['presisi diksi, kohesi antargagasan, register, dan daya argumen', 'panjang teks saja', 'jumlah simbol'], answer: 'presisi diksi, kohesi antargagasan, register, dan daya argumen' },
    { question: 'Kontrol register C2 berarti...', options: ['menyesuaikan gaya akademik, profesional, diplomatik, atau sastra sesuai konteks', 'semua konteks memakai gaya yang sama', 'menghindari diksi formal'], answer: 'menyesuaikan gaya akademik, profesional, diplomatik, atau sastra sesuai konteks' },
  ];

  return [...c2Shared, ...makeAdvancedPractice(skillId, topic)];
}

function getProficiencyTask(skillId: ArabicSkillId, topic: string): string {
  const tasks: Record<ArabicSkillId, string> = {
    kalam: `Rekam orasi C2 4-5 menit tentang ${topic.toLowerCase()}. Wajib ada tesis, reframing, 2 bukti, sanggahan kuat, respons diplomatik, dan kesimpulan retoris.`,
    istima: `Dengarkan contoh TTS dan audio referensi Arab lain tentang ${topic.toLowerCase()}. Buat catatan: klaim utama, nada implisit, 4 detail, 2 asumsi, dan rekonstruksi argumen 120 kata.`,
    qiraah: `Baca teks Arab panjang bertema ${topic.toLowerCase()}. Tulis analisis 180 kata: klaim, asumsi tersembunyi, strategi retorika, bias, dan evaluasi bukti.`,
    kitabah: `Tulis teks C2 280-350 kata tentang ${topic.toLowerCase()}: tesis presisi, 3 paragraf argumen, counterargument, reservasi akademik, implikasi, dan penutup kuat.`,
    mufradat: `Buat glosarium C2 untuk ${topic.toLowerCase()}: 20 istilah, 10 kolokasi, 5 metafora/idiom formal, lalu pakai minimal 12 item dalam paragraf konseptual.`,
    grammar: `Analisis satu paragraf Arab kompleks tentang ${topic.toLowerCase()}: tandai hasr/qashr, jumlah sisipan, rujukan dhamir, taqdim-taakhir, lalu tulis ulang dengan struktur berbeda.`,
    pronunciation: `Rekam pembacaan formal 4 menit tentang ${topic.toLowerCase()}. Tandai jeda retoris, tekanan kata kunci, waqaf, tafkhim-tarqiq, dan lakukan self-correction di akhir.`,
  };

  return tasks[skillId];
}

function getIntermediateSteps(skillId: ArabicSkillId): string[] {
  const steps: Record<ArabicSkillId, string[]> = {
    kalam: ['Siapkan 3 poin utama sebelum bicara', 'Ucapkan opini dengan فِي رَأْيِي', 'Tambahkan alasan dengan لِأَنَّ', 'Tutup dengan kesimpulan pendek'],
    istima: ['Dengar pertama untuk topik', 'Dengar kedua untuk detail angka/nama/alasan', 'Dengar ketiga sambil ulangi frasa kunci', 'Rangkum tanpa membuka terjemahan'],
    qiraah: ['Prediksi isi dari judul', 'Lingkari kata penghubung', 'Pisahkan fakta dan opini', 'Tulis ringkasan 2-3 kalimat'],
    kitabah: ['Tentukan kalimat topik', 'Tambahkan dua alasan', 'Gunakan minimal tiga penghubung', 'Revisi i‘rab dan kejelasan ide'],
    mufradat: ['Ucapkan kata dengan harakat', 'Gabungkan ke kolokasi', 'Masukkan ke kalimat pribadi', 'Ulangi dalam dialog/tulisan'],
    grammar: ['Baca pola', 'Tentukan fungsi setiap kata', 'Ganti subjek/objek', 'Tulis contoh baru dengan konteks berbeda'],
    pronunciation: ['Dengar contoh TTS', 'Ucapkan perlahan', 'Rekam versi natural', 'Bandingkan bunyi sulit dan ulangi'],
  };

  return steps[skillId];
}

function getUpperIntermediateSteps(skillId: ArabicSkillId): string[] {
  const steps: Record<ArabicSkillId, string[]> = {
    kalam: ['Buka dengan tesis yang jelas', 'Akui sisi lawan bicara dengan konsesi', 'Berikan bukti atau contoh spesifik', 'Tutup dengan rekomendasi realistis'],
    istima: ['Catat klaim pembicara', 'Pisahkan bukti dari opini', 'Tandai nada ragu/setuju/menolak', 'Simpulkan makna tersirat'],
    qiraah: ['Identifikasi klaim utama', 'Evaluasi bukti dan contoh', 'Cari bias atau asumsi tersembunyi', 'Tulis ringkasan kritis'],
    kitabah: ['Tulis tesis satu kalimat', 'Kembangkan dua paragraf argumen', 'Tambahkan counterpoint dan refutation', 'Revisi register formal dan transisi'],
    mufradat: ['Pilih 6 kolokasi formal', 'Buat sinonim dan antonim konteks', 'Gunakan dalam paragraf argumen', 'Ulangi dalam presentasi singkat'],
    grammar: ['Tandai struktur kompleks', 'Analisis i‘rab kata kunci', 'Ubah pola menjadi kalimat baru', 'Pakai pola dalam paragraf B2'],
    pronunciation: ['Bagi teks menjadi unit makna', 'Tekan kata fokus', 'Jaga mad dan waqaf saat cepat', 'Rekam presentasi 90 detik'],
  };

  return steps[skillId];
}

function makeUpperIntermediatePractice(skillId: ArabicSkillId, topic: string): GeneratedArabicLesson['practice'] {
  const shared = [
    {
      question: 'Frasa yang paling tepat untuk membuka argumen B2 adalah...',
      options: ['مِنْ وِجْهَةِ نَظَرِي', 'كِتَابٌ', 'أَيْنَ الْقَلَمُ؟'],
      answer: 'مِنْ وِجْهَةِ نَظَرِي',
    },
    {
      question: 'Ungkapan konsesi “عَلَى الرَّغْمِ مِنْ ذٰلِكَ” berarti...',
      options: ['meskipun demikian', 'di bawah meja', 'siapa namamu'],
      answer: 'meskipun demikian',
    },
    {
      question: 'Output B2 yang baik harus memiliki...',
      options: ['tesis, alasan, bukti, konsesi, dan kesimpulan', 'satu kata tanpa konteks', 'terjemahan kata demi kata saja'],
      answer: 'tesis, alasan, bukti, konsesi, dan kesimpulan',
    },
    {
      question: `Untuk topik "${topic}", fokus B2 yang paling tepat adalah...`,
      options: ['analisis dan evaluasi ide', 'hafalan huruf tunggal', 'menyalin tanpa memahami'],
      answer: 'analisis dan evaluasi ide',
    },
    {
      question: 'Frasa “وَبِنَاءً عَلَى ذٰلِكَ” dipakai untuk...',
      options: ['menarik kesimpulan berdasarkan argumen sebelumnya', 'menanyakan lokasi', 'membuka salam informal'],
      answer: 'menarik kesimpulan berdasarkan argumen sebelumnya',
    },
  ];

  const bySkill: Record<ArabicSkillId, GeneratedArabicLesson['practice']> = {
    kalam: [
      { question: 'Dalam debat B2, respons paling matang adalah...', options: ['أُقِرُّ بِأَنَّ ... وَلٰكِنَّنِي أَرَى أَنَّ ...', 'أَنَا طَالِبٌ', 'هٰذَا قَلَمٌ'], answer: 'أُقِرُّ بِأَنَّ ... وَلٰكِنَّنِي أَرَى أَنَّ ...' },
      { question: 'Saat menjadi moderator, fungsi bahasa utama adalah...', options: ['merangkum, mengarahkan, dan menyeimbangkan giliran bicara', 'hanya menyebut nama', 'mengulang satu kata'], answer: 'merangkum, mengarahkan, dan menyeimbangkan giliran bicara' },
      { question: '“يَجْدُرُ بِنَا أَنْ” digunakan untuk...', options: ['memberi rekomendasi kolektif', 'menyebut warna', 'menutup buku'], answer: 'memberi rekomendasi kolektif' },
      { question: 'Argumen lisan B2 sebaiknya berdurasi...', options: ['90-120 detik dengan struktur jelas', '2 detik saja', 'tanpa penutup'], answer: '90-120 detik dengan struktur jelas' },
      { question: 'Kritik sopan dalam Arabic formal sebaiknya...', options: ['mengakui poin lawan lalu membatasi atau menyangkalnya', 'langsung menghina', 'menghindari alasan'], answer: 'mengakui poin lawan lalu membatasi atau menyangkalnya' },
    ],
    istima: [
      { question: 'Saat audio panjang, yang perlu dicatat selain topik adalah...', options: ['klaim, bukti, sikap, dan kesimpulan tersirat', 'hanya kata pertama', 'warna layar'], answer: 'klaim, bukti, sikap, dan kesimpulan tersirat' },
      { question: '“يَبْدُو أَنَّ” menunjukkan...', options: ['inferensi atau kesan pembicara', 'perintah langsung', 'angka pasti'], answer: 'inferensi atau kesan pembicara' },
      { question: 'Kata “الاعْتِرَاضُ” berarti...', options: ['keberatan/sanggahan', 'kamar', 'makanan'], answer: 'keberatan/sanggahan' },
      { question: 'Nada ragu dalam listening biasanya membantu memahami...', options: ['sikap pembicara', 'ejaan nama saja', 'jumlah huruf'], answer: 'sikap pembicara' },
      { question: '“الدَّلِيلُ عَلَى ذٰلِكَ” berarti...', options: ['bukti atas hal itu', 'selamat datang', 'di mana rumah'], answer: 'bukti atas hal itu' },
    ],
    qiraah: [
      { question: '“يَدَّعِي الْكَاتِبُ أَنَّ” digunakan untuk menyebut...', options: ['klaim penulis', 'harga barang', 'nama keluarga'], answer: 'klaim penulis' },
      { question: 'Bacaan kritis B2 perlu mengecek...', options: ['klaim, bukti, bias, dan asumsi', 'hanya jumlah paragraf', 'ukuran font'], answer: 'klaim, bukti, bias, dan asumsi' },
      { question: 'Kata “الانْحِيَازُ” berarti...', options: ['bias/keberpihakan', 'pintu', 'waktu pagi'], answer: 'bias/keberpihakan' },
      { question: 'Argumen kuat biasanya...', options: ['bersandar pada data dan contoh relevan', 'tanpa bukti', 'hanya berisi emosi'], answer: 'bersandar pada data dan contoh relevan' },
      { question: '“السِّيَاقُ” berarti...', options: ['konteks', 'kursi', 'warna'], answer: 'konteks' },
    ],
    kitabah: [
      { question: 'Tesis esai B2 sebaiknya...', options: ['spesifik dan dapat diperdebatkan', 'terlalu umum', 'hanya satu kata'], answer: 'spesifik dan dapat diperdebatkan' },
      { question: 'Counterpoint dalam tulisan berfungsi untuk...', options: ['mengakui pandangan lain sebelum membantah/membatasi', 'menghapus kesimpulan', 'menambah salam saja'], answer: 'mengakui pandangan lain sebelum membantah/membatasi' },
      { question: '“تُظْهِرُ الْبَيَانَاتُ أَنَّ” berarti...', options: ['data menunjukkan bahwa', 'saya tinggal di', 'apa kabar'], answer: 'data menunjukkan bahwa' },
      { question: 'Penutup formal dapat dimulai dengan...', options: ['خِتَامًا', 'أَيْنَ', 'مَنْ'], answer: 'خِتَامًا' },
      { question: 'Register formal berarti...', options: ['pilihan kata sopan, jelas, dan tidak terlalu santai', 'bahasa acak', 'tanpa struktur'], answer: 'pilihan kata sopan, jelas, dan tidak terlalu santai' },
    ],
    mufradat: [
      { question: '“الاسْتِدَامَةُ” berarti...', options: ['keberlanjutan', 'papan tulis', 'roti'], answer: 'keberlanjutan' },
      { question: '“الْفَجْوَةُ” berarti...', options: ['kesenjangan', 'kebun', 'tas'], answer: 'kesenjangan' },
      { question: 'Kolokasi “تَقْلِيلُ الْفَجْوَةِ” berarti...', options: ['mengurangi kesenjangan', 'membuka pintu', 'membeli makanan'], answer: 'mengurangi kesenjangan' },
      { question: 'Kosakata B2 sebaiknya dipakai dalam...', options: ['kolokasi dan konteks argumentatif', 'daftar kata tanpa contoh', 'satu arti saja selamanya'], answer: 'kolokasi dan konteks argumentatif' },
      { question: '“الْجَدْوَى” berarti...', options: ['kelayakan/manfaat praktis', 'jalan raya', 'air dingin'], answer: 'kelayakan/manfaat praktis' },
    ],
    grammar: [
      { question: 'Dalam “أَنْ نُطَوِّرَ”, gabungan ini disebut...', options: ['masdar muawwal', 'huruf jar', 'isim isyarah'], answer: 'masdar muawwal' },
      { question: '“مَفْعُولٌ لِأَجْلِهِ” menjelaskan...', options: ['tujuan atau sebab tindakan', 'warna kata benda', 'jumlah huruf'], answer: 'tujuan atau sebab tindakan' },
      { question: '“إِلَّا” sering dipakai untuk...', options: ['istitsna/pengecualian', 'kata tanya', 'kata tunjuk'], answer: 'istitsna/pengecualian' },
      { question: 'Isim tafdhil biasanya menyatakan...', options: ['perbandingan atau superlatif', 'waktu lampau', 'kata perintah'], answer: 'perbandingan atau superlatif' },
      { question: 'Analisis grammar B2 menuntut...', options: ['memahami fungsi kata dalam paragraf, bukan hanya kalimat tunggal', 'menerjemahkan huruf saja', 'mengabaikan i‘rab'], answer: 'memahami fungsi kata dalam paragraf, bukan hanya kalimat tunggal' },
    ],
    pronunciation: [
      { question: 'Chunking kalimat berarti...', options: ['membagi kalimat panjang menjadi unit makna', 'membaca tanpa jeda', 'menghapus harakat'], answer: 'membagi kalimat panjang menjadi unit makna' },
      { question: '“نَبْرُ الْمَعْنَى” berarti...', options: ['tekanan makna', 'terjemahan bebas', 'huruf mati'], answer: 'tekanan makna' },
      { question: 'Hamzah washal biasanya...', options: ['terhubung dalam aliran bacaan', 'selalu dipantulkan', 'tidak pernah muncul'], answer: 'terhubung dalam aliran bacaan' },
      { question: 'Prosodi debat perlu menonjolkan...', options: ['konsesi, sanggahan, dan kesimpulan', 'semua kata sama datar', 'hanya kata pertama'], answer: 'konsesi, sanggahan, dan kesimpulan' },
      { question: 'Saat membaca cepat, kualitas B2 tetap menuntut...', options: ['mad, waqaf, dan huruf sulit tetap jelas', 'semua bunyi dipendekkan', 'tanpa intonasi'], answer: 'mad, waqaf, dan huruf sulit tetap jelas' },
    ],
  };

  return [...shared, ...bySkill[skillId]];
}

function getMasteryFocus(skillId: ArabicSkillId): string[] {
  const focus: Record<ArabicSkillId, string[]> = {
    kalam: ['Kelola majelis ilmiah: buka masalah, petakan pendapat, beri tarjih, lalu tutup dengan adab ikhtilaf', 'Ubah konsep kitab/risalah menjadi penjelasan lisan yang bisa dipahami audiens umum'],
    istima: ['Tangkap istidlal, istilah teknis, sindiran halus, dan perubahan posisi dalam dars atau panel ahli', 'Rekonstruksi alur argumentasi dari audio panjang tanpa bergantung pada transkrip penuh'],
    qiraah: ['Baca teks turats adaptif dan teks akademik Arab dengan perhatian pada istilah, konteks, dan munasabah', 'Bedakan klaim utama, dalil, ta liq, tarjih, serta implikasi sosial-intelektual teks'],
    kitabah: ['Tulis makalah/resensi/ta liq dengan struktur ilmiah: muqaddimah, masalah, analisis, tarjih, dan khatimah', 'Parafrase gaya klasik ke gaya Arab modern tanpa merusak makna inti'],
    mufradat: ['Bangun glosarium personal untuk istilah turats, balaghah, maqasid, media, dan akademik modern', 'Pakai diksi tingkat ahli dengan kontrol register: kitab, risalah, panel, khutbah, atau artikel'],
    grammar: ['Analisis i rab, rabt nasshi, hasr-qashr, taqdim-taakhir, dan iltifat dalam paragraf panjang', 'Gunakan nahwu-balaghah untuk menjelaskan efek makna, bukan hanya label struktur'],
    pronunciation: ['Baca teks ilmiah, kutipan kitab, dan pidato panjang dengan waqaf maknawi yang matang', 'Jaga makharij, prosodi, dan pacing saat istilah teknis bertumpuk dalam satu kalimat'],
  };

  return [
    ...focus[skillId],
    'Hubungkan fusha modern dengan turats adaptif, media Arab, balaghah, dan kebutuhan komunikasi profesional.',
    'Hasil akhir lesson berupa portfolio: rekaman, tulisan, glosarium, analisis teks, atau presentasi tingkat ahli.',
  ];
}

function getMasteryVocabulary(skillId: ArabicSkillId): GeneratedArabicLesson['vocabulary'] {
  const vocabulary: Record<ArabicSkillId, GeneratedArabicLesson['vocabulary']> = {
    kalam: [
      { arabic: 'أَدَبُ الِاخْتِلَافِ', transliteration: 'adabu al-ikhtilaf', meaning: 'etika berbeda pendapat' },
      { arabic: 'تَحْرِيرُ مَحَلِّ النِّزَاعِ', transliteration: 'tahriru mahalli an-niza', meaning: 'memperjelas titik masalah' },
      { arabic: 'التَّرْجِيحُ', transliteration: 'at-tarjih', meaning: 'memilih pendapat yang lebih kuat' },
      { arabic: 'تَعْلِيقٌ مَنْهَجِيٌّ', transliteration: 'ta liqun manhaji', meaning: 'komentar metodologis' },
    ],
    istima: [
      { arabic: 'سِيَاقُ الْكَلَامِ', transliteration: 'siyaqu al-kalam', meaning: 'konteks ujaran' },
      { arabic: 'مَسَارُ الِاسْتِدْلَالِ', transliteration: 'masaru al-istidlal', meaning: 'alur pengambilan dalil/argumen' },
      { arabic: 'نَبْرَةُ التَّحَفُّظِ', transliteration: 'nabratu at-tahaffuzh', meaning: 'nada reservasi/kehati-hatian' },
      { arabic: 'إِعَادَةُ بِنَاءِ الْحُجَّةِ', transliteration: 'iadatu bina-i al-hujjah', meaning: 'rekonstruksi argumen' },
    ],
    qiraah: [
      { arabic: 'مُقَدِّمَةُ الْكِتَابِ', transliteration: 'muqaddimatu al-kitab', meaning: 'pendahuluan kitab' },
      { arabic: 'مُنَاسَبَةُ الْفِقْرَاتِ', transliteration: 'munasabatu al-fiqrat', meaning: 'hubungan antarparagraf' },
      { arabic: 'مَنْهَجُ الْمُؤَلِّفِ', transliteration: 'manhaju al-muallif', meaning: 'metode penulis' },
      { arabic: 'تَأْوِيلٌ سِيَاقِيٌّ', transliteration: 'ta wilun siyaqi', meaning: 'interpretasi kontekstual' },
    ],
    kitabah: [
      { arabic: 'تَعْلِيقٌ عَلَى النَّصِّ', transliteration: 'ta liqun ala an-nash', meaning: 'komentar atas teks' },
      { arabic: 'يَتَنَاوَلُ هَذَا الْبَحْثُ', transliteration: 'yatanawalu hadza al-bahts', meaning: 'kajian ini membahas' },
      { arabic: 'وَجْهُ الدَّلَالَةِ', transliteration: 'wajhu ad-dalalah', meaning: 'sisi makna/indikasi' },
      { arabic: 'خَاتِمَةٌ تَرْكِيبِيَّةٌ', transliteration: 'khatimatun tarkibiyyah', meaning: 'kesimpulan sintesis' },
    ],
    mufradat: [
      { arabic: 'الْمَقَاصِدُ', transliteration: 'al-maqashid', meaning: 'tujuan/prinsip besar' },
      { arabic: 'الْمَنْهَجِيَّةُ', transliteration: 'al-manhajiyyah', meaning: 'metodologi' },
      { arabic: 'الِاسْتِدْلَالُ', transliteration: 'al-istidlal', meaning: 'argumentasi berbasis dalil' },
      { arabic: 'الْمُوَازَنَةُ', transliteration: 'al-muwazanah', meaning: 'penimbangan/perbandingan' },
    ],
    grammar: [
      { arabic: 'مَحَلٌّ مِنَ الْإِعْرَابِ', transliteration: 'mahallun mina al-irab', meaning: 'posisi sintaksis dalam i rab' },
      { arabic: 'التَّقْدِيمُ لِلِاهْتِمَامِ', transliteration: 'at-taqdimu lil-ihtimam', meaning: 'pendahuluan kata untuk penekanan' },
      { arabic: 'رَبْطٌ نَصِّيٌّ', transliteration: 'rabthun nashshi', meaning: 'kohesi tekstual' },
      { arabic: 'أَثَرٌ بَلَاغِيٌّ', transliteration: 'atsarun balaghi', meaning: 'efek retoris' },
    ],
    pronunciation: [
      { arabic: 'الْوَقْفُ الْمَعْنَوِيُّ', transliteration: 'al-waqfu al-manawi', meaning: 'jeda berdasarkan makna' },
      { arabic: 'إِيقَاعُ الدَّرْسِ', transliteration: 'iqau ad-dars', meaning: 'ritme penyampaian materi' },
      { arabic: 'نَبْرُ الْمُصْطَلَحِ', transliteration: 'nabru al-musthalah', meaning: 'tekanan pada istilah teknis' },
      { arabic: 'خِتَامٌ مُقْنِعٌ', transliteration: 'khitamun muqni', meaning: 'penutup yang meyakinkan' },
    ],
  };

  return [...vocabulary[skillId], ...getProficiencyVocabulary(skillId).slice(0, 6)];
}

function getMasteryPatterns(skillId: ArabicSkillId): GeneratedArabicLesson['patterns'] {
  const patterns: Record<ArabicSkillId, GeneratedArabicLesson['patterns']> = {
    kalam: [
      { label: 'Tahrir masalah', arabic: 'مَحَلُّ النِّزَاعِ هُنَا لَيْسَ فِي ... بَلْ فِي ...', transliteration: 'Mahallu an-nizai huna laisa fi ... bal fi ...', meaning: 'Titik masalahnya bukan pada ..., tetapi pada ...' },
      { label: 'Tarjih sopan', arabic: 'وَالْأَقْرَبُ فِي نَظَرِي أَنَّ ... لِاعْتِبَارَيْنِ', transliteration: 'Wal-aqrabu fi nazhari anna ... li-itibarain', meaning: 'Yang lebih dekat menurut saya adalah ... karena dua pertimbangan.' },
    ],
    istima: [
      { label: 'Peta audio', arabic: 'بَدَأَ الْمُتَكَلِّمُ بِـ ... ثُمَّ انْتَقَلَ إِلَى ... وَخَتَمَ بِـ ...', transliteration: 'Bada-a al-mutakallimu bi ... tsumma intaqala ila ... wa khatama bi ...', meaning: 'Pembicara mulai dengan ..., lalu beralih ke ..., dan menutup dengan ...' },
      { label: 'Nada implisit', arabic: 'تُوحِي نَبْرَتُهُ بِأَنَّهُ لَا يَرْفُضُ الْفِكْرَةَ كُلِّيًّا، بَلْ يُقَيِّدُهَا.', transliteration: 'Tuhi nabratuhu bi-annahu la yarfudhu al-fikrata kulliyyan, bal yuqayyiduha.', meaning: 'Nadanya menunjukkan ia tidak menolak ide sepenuhnya, tetapi membatasinya.' },
    ],
    qiraah: [
      { label: 'Manhaj penulis', arabic: 'يَتَّبِعُ الْمُؤَلِّفُ مَنْهَجًا يَبْدَأُ بِـ ... ثُمَّ يُفَرِّعُ عَلَيْهِ ...', transliteration: 'Yattabiu al-muallifu manhajan yabda-u bi ... tsumma yufarri-u alaih ...', meaning: 'Penulis memakai metode yang dimulai dari ..., lalu menurunkan cabang darinya ...' },
      { label: 'Ta wil konteks', arabic: 'لَا يُفْهَمُ هَذَا النَّصُّ إِلَّا بِمُرَاعَاةِ سِيَاقِهِ وَمَقْصِدِهِ.', transliteration: 'La yufhamu hadza an-nashshu illa bimuraati siyaqihi wa maqshidih.', meaning: 'Teks ini tidak dipahami kecuali dengan memperhatikan konteks dan tujuannya.' },
    ],
    kitabah: [
      { label: 'Pembuka makalah', arabic: 'يَتَنَاوَلُ هَذَا الْبَحْثُ مَسْأَلَةَ ... مِنْ زَاوِيَةٍ تَحْلِيلِيَّةٍ.', transliteration: 'Yatanawalu hadza al-bahtsu mas-alata ... min zawiyatin tahliliyyah.', meaning: 'Kajian ini membahas isu ... dari sudut analitis.' },
      { label: 'Ta liq ilmiah', arabic: 'وَيُمْكِنُ التَّعْلِيقُ عَلَى هَذَا النَّصِّ مِنْ جِهَتَيْنِ...', transliteration: 'Wa yumkinu at-ta liqu ala hadza an-nash min jihatain...', meaning: 'Teks ini dapat dikomentari dari dua sisi...' },
    ],
    mufradat: [
      { label: 'Definisi istilah', arabic: 'يُرَادُ بِـ ... فِي هَذَا السِّيَاقِ ... لَا ...', transliteration: 'Yuradu bi ... fi hadza as-siyaq ... la ...', meaning: 'Yang dimaksud dengan ... dalam konteks ini adalah ..., bukan ...' },
      { label: 'Pembatasan makna', arabic: 'هَذَا الْمُصْطَلَحُ أَضْيَقُ مِنْ ... وَأَوْسَعُ مِنْ ...', transliteration: 'Hadza al-musthalahu adhyaqu min ... wa ausau min ...', meaning: 'Istilah ini lebih sempit dari ... dan lebih luas dari ...' },
    ],
    grammar: [
      { label: 'Efek balaghi', arabic: 'قُدِّمَتْ هَذِهِ الْكَلِمَةُ لِلِاهْتِمَامِ وَتَقْوِيَةِ الْمَعْنَى.', transliteration: 'Quddimat hadzihi al-kalimatu lil-ihtimam wa taqwiyati al-mana.', meaning: 'Kata ini didahulukan untuk perhatian dan penguatan makna.' },
      { label: 'Jumlah sisipan', arabic: 'هَذِهِ جُمْلَةٌ مُعْتَرِضَةٌ تُبَيِّنُ قَيْدًا فِي الْمَعْنَى.', transliteration: 'Hadzihi jumlah mutaridhah tubayyinu qaydan fi al-mana.', meaning: 'Ini kalimat sisipan yang menjelaskan batasan makna.' },
    ],
    pronunciation: [
      { label: 'Waqaf maknawi', arabic: 'إِذَا اكْتَمَلَ الْمَعْنَى | وَقَفْنَا | ثُمَّ اسْتَأْنَفْنَا الْحُجَّةَ.', transliteration: 'Idza iktamala al-mana | waqafna | tsumma istanafna al-hujjah.', meaning: 'Berhenti saat makna selesai, lalu lanjutkan argumen.' },
      { label: 'Tekanan istilah', arabic: 'لَا بُدَّ مِنْ نَبْرِ الْمُصْطَلَحِ الْمِحْوَرِيِّ دُونَ مُبَالَغَةٍ.', transliteration: 'La budda min nabri al-musthalahi al-mihwari duna mubalaghah.', meaning: 'Tekankan istilah utama tanpa berlebihan.' },
    ],
  };

  return [...patterns[skillId], ...getProficiencyPatterns(skillId).slice(0, 3)];
}

function getMasteryExamples(skillId: ArabicSkillId): GeneratedArabicLesson['examples'] {
  const examples: Record<ArabicSkillId, GeneratedArabicLesson['examples']> = {
    kalam: [
      { arabic: 'مَحَلُّ النِّزَاعِ فِي هَذِهِ الْمَسْأَلَةِ لَيْسَ فِي أَصْلِ الْمَبْدَإِ، بَلْ فِي تَنْزِيلِهِ عَلَى الْوَاقِعِ.', transliteration: 'Mahallu an-nizai fi hadzihi al-mas-alah laisa fi ashli al-mabda, bal fi tanzilihi ala al-waqi.', meaning: 'Titik perbedaan bukan pada prinsipnya, tetapi pada penerapannya dalam realitas.' },
      { arabic: 'وَالْأَقْرَبُ أَنْ نُقَرِّبَ الْمَفْهُومَ لِلْمُتَلَقِّي دُونَ أَنْ نُفْقِدَهُ دِقَّتَهُ الْعِلْمِيَّةَ.', transliteration: 'Wal-aqrabu an nuqarriba al-mafhuma lil-mutalaqqi duna an nufqidahu diqqatahu al-ilmiyyah.', meaning: 'Lebih tepat mendekatkan konsep kepada audiens tanpa kehilangan presisi ilmiahnya.' },
    ],
    istima: [
      { arabic: 'يَبْدُو مِنْ سِيَاقِ الْكَلَامِ أَنَّ الْمُحَاضِرَ لَا يَنْقُضُ الرَّأْيَ، بَلْ يُعِيدُ تَرْتِيبَ شُرُوطِهِ.', transliteration: 'Yabdu min siyaqi al-kalam anna al-muhadhira la yanqudhu ar-ray, bal yu-idu tartiba syuruthih.', meaning: 'Dari konteks ujaran, dosen tidak membatalkan pendapat itu, tetapi menata ulang syarat-syaratnya.' },
      { arabic: 'انْتَقَلَ مِنَ التَّقْرِيرِ إِلَى التَّرْجِيحِ حِينَ قَالَ: وَالْأَقْرَبُ عِنْدِي.', transliteration: 'Intaqala mina at-taqrir ila at-tarjih hina qala: wal-aqrabu indi.', meaning: 'Ia beralih dari pemaparan ke tarjih saat berkata: yang lebih dekat menurut saya.' },
    ],
    qiraah: [
      { arabic: 'يَظْهَرُ مَنْهَجُ الْمُؤَلِّفِ فِي تَرْتِيبِ الْمَسْأَلَةِ: تَعْرِيفٌ، ثُمَّ دَلِيلٌ، ثُمَّ تَعْلِيقٌ.', transliteration: 'Yazhharu manhaju al-muallif fi tartibi al-mas-alah: tarif, tsumma dalil, tsumma ta liq.', meaning: 'Metode penulis tampak dalam urutan isu: definisi, dalil, lalu komentar.' },
      { arabic: 'لَا يَنْبَغِي أَنْ نَقْرَأَ الْعِبَارَةَ مَعْزُولَةً عَنْ مَقْصِدِ الْفَصْلِ.', transliteration: 'La yanbaghi an naqra-a al-ibarata mazulatan an maqshidi al-fashl.', meaning: 'Ungkapan itu tidak seharusnya dibaca terpisah dari tujuan bab.' },
    ],
    kitabah: [
      { arabic: 'يَتَنَاوَلُ هَذَا الْبَحْثُ مَفْهُومَ الْمَقَاصِدِ مِنْ جِهَةِ عِلَاقَتِهِ بِتَغَيُّرِ السِّيَاقِ.', transliteration: 'Yatanawalu hadza al-bahtsu mafhuma al-maqashid min jihati ilaqatihi bitaghayyuri as-siyaq.', meaning: 'Kajian ini membahas konsep maqasid dari sisi hubungannya dengan perubahan konteks.' },
      { arabic: 'وَيُمْكِنُ صِيَاغَةُ هَذَا الْمَعْنَى بِلُغَةٍ مُعَاصِرَةٍ مِنْ غَيْرِ إِخْلَالٍ بِأَصْلِهِ.', transliteration: 'Wa yumkinu shiyaghatu hadza al-mana bilughatin muashirah min ghairi ikhlalin bi-ashlih.', meaning: 'Makna ini dapat dirumuskan dengan bahasa modern tanpa merusak asalnya.' },
    ],
    mufradat: [
      { arabic: 'كَلِمَةُ "التَّرْجِيحِ" لَا تَعْنِي مُجَرَّدَ الِاخْتِيَارِ، بَلْ الِاخْتِيَارَ بَعْدَ مُوَازَنَةِ الْأَدِلَّةِ.', transliteration: 'Kalimatu at-tarjih la tani mujarrada al-ikhtiyar, bal al-ikhtiyara bada muwazanati al-adillah.', meaning: 'Tarjih bukan sekadar memilih, tetapi memilih setelah menimbang dalil.' },
      { arabic: 'يُسْتَعْمَلُ مُصْطَلَحُ "التَّقْيِيدِ" حِينَ نُضَيِّقُ دَلَالَةَ اللَّفْظِ بِقَرِينَةٍ.', transliteration: 'Yustamalu musthalahu at-taqyid hina nudhayyiqu dalalata al-lafzhi biqarinah.', meaning: 'Taqyid dipakai saat membatasi makna kata dengan petunjuk konteks.' },
    ],
    grammar: [
      { arabic: 'تَقْدِيمُ الْجَارِّ وَالْمَجْرُورِ هُنَا يُفِيدُ الِاهْتِمَامَ بِالسِّيَاقِ قَبْلَ الْحُكْمِ.', transliteration: 'Taqdimu al-jarri wal-majruri huna yufidu al-ihtimama bis-siyaq qabla al-hukm.', meaning: 'Pendahuluan frasa preposisional menekankan konteks sebelum hukum.' },
      { arabic: 'الْجُمْلَةُ الْمُعْتَرِضَةُ لَا تُغَيِّرُ أَصْلَ الْحُكْمِ، وَلَكِنَّهَا تُقَيِّدُ مَجَالَهُ.', transliteration: 'Al-jumlah al-mutaridhah la tughayyiru ashla al-hukm, walakinnaha tuqayyidu majalah.', meaning: 'Kalimat sisipan tidak mengubah hukum pokok, tetapi membatasi cakupannya.' },
    ],
    pronunciation: [
      { arabic: 'نَقْرَأُ النَّصَّ الْعِلْمِيَّ بِتُؤَدَةٍ | لِأَنَّ الْمَقْصُودَ بَيَانُ الْمَعْنَى لَا مُجَرَّدُ السُّرْعَةِ.', transliteration: 'Naqra-u an-nashsha al-ilmiyya bitu-adah | li-anna al-maqshuda bayanu al-mana la mujarradu as-surah.', meaning: 'Baca teks ilmiah dengan tenang karena tujuannya menjelaskan makna, bukan sekadar cepat.' },
      { arabic: 'عِنْدَ الْمُصْطَلَحِ الْمِحْوَرِيِّ نَرْفَعُ النَّبْرَ قَلِيلًا ثُمَّ نَعُودُ إِلَى الْإِيقَاعِ الطَّبِيعِيِّ.', transliteration: 'Inda al-musthalahi al-mihwari narfau an-nabra qalilan tsumma naud ila al-iqa ath-thabii.', meaning: 'Pada istilah utama, naikkan tekanan sedikit lalu kembali ke ritme alami.' },
    ],
  };

  return [...examples[skillId], ...getProficiencyExamples(skillId).slice(0, 2)];
}

function getMasterySteps(skillId: ArabicSkillId): string[] {
  const steps: Record<ArabicSkillId, string[]> = {
    kalam: ['Tahrir titik masalah', 'Peta dua pendapat', 'Tarjih dengan alasan', 'Rumuskan versi awam'],
    istima: ['Tangkap struktur dars', 'Catat istilah teknis', 'Rekonstruksi istidlal', 'Buat ringkasan kritis'],
    qiraah: ['Baca konteks bab', 'Tandai istilah dan dalil', 'Analisis manhaj penulis', 'Tulis ta liq singkat'],
    kitabah: ['Tentukan masalah ilmiah', 'Susun muqaddimah', 'Tulis analisis dan tarjih', 'Buat khatimah sintesis'],
    mufradat: ['Definisikan istilah', 'Buat kolokasi turats-modern', 'Bandingkan sinonim', 'Pakai dalam paragraf ahli'],
    grammar: ['Tandai i rab kunci', 'Jelaskan efek balaghi', 'Ubah uslub klasik-modern', 'Validasi kohesi makna'],
    pronunciation: ['Tentukan waqaf maknawi', 'Tekan istilah kunci', 'Atur pacing dars', 'Rekam dan evaluasi prosodi'],
  };

  return steps[skillId];
}

function makeMasteryPractice(skillId: ArabicSkillId, topic: string): GeneratedArabicLesson['practice'] {
  const shared: GeneratedArabicLesson['practice'] = [
    { question: 'Dalam Arabic Mastery, “tahrir mahall an-niza” berarti...', options: ['memperjelas titik masalah yang sebenarnya diperdebatkan', 'menghafal huruf tunggal', 'membaca tanpa konteks'], answer: 'memperjelas titik masalah yang sebenarnya diperdebatkan' },
    { question: 'Output Mastery harus berbeda dari C2 biasa karena...', options: ['mampu mengolah turats, istilah ahli, konteks, dan portfolio profesional', 'lebih pendek dari A1', 'hanya memakai terjemahan literal'], answer: 'mampu mengolah turats, istilah ahli, konteks, dan portfolio profesional' },
    { question: `Untuk topik "${topic}", bentuk portfolio paling tepat adalah...`, options: ['analisis, ta liq, rekaman dars, glosarium, atau makalah pendek', 'jawaban ya/tidak', 'daftar angka'], answer: 'analisis, ta liq, rekaman dars, glosarium, atau makalah pendek' },
    { question: 'Tarjih menuntut...', options: ['penimbangan alasan sebelum memilih pendapat', 'pilihan acak', 'menghindari semua argumen'], answer: 'penimbangan alasan sebelum memilih pendapat' },
    { question: 'Membaca turats adaptif harus memperhatikan...', options: ['konteks bab, istilah, tujuan penulis, dan struktur dalil', 'warna halaman saja', 'jumlah spasi'], answer: 'konteks bab, istilah, tujuan penulis, dan struktur dalil' },
    { question: 'Waqaf maknawi dalam pronunciation berarti...', options: ['berhenti berdasarkan satuan makna', 'berhenti setiap kata', 'tanpa jeda sama sekali'], answer: 'berhenti berdasarkan satuan makna' },
  ];

  return [...shared, ...makeProficiencyPractice(skillId, topic)];
}

function getScholarFocus(skillId: ArabicSkillId): string[] {
  const focus: Record<ArabicSkillId, string[]> = {
    kalam: [
      'Bangun presentasi seminar Arab: research gap, pertanyaan riset, batas data, metode, temuan, dan sanggahan.',
      'Latih adab munaqasyah: menjawab penguji, menerima kritik, membatasi klaim, dan merumuskan revisi secara ilmiah.',
      'Ubah catatan bacaan menjadi argumen lisan yang runtut, terukur, dan siap dipertahankan dalam forum akademik.',
    ],
    istima: [
      'Dengarkan seminar, peer review, dan panel riset Arab untuk menangkap klaim, bukti, keberatan, dan revisi posisi.',
      'Pisahkan data, tafsir pembicara, asumsi metodologis, dan implikasi akademik dalam catatan listening.',
      'Rekonstruksi alur diskusi multi-pembicara tanpa kehilangan istilah teknis dan nada kehati-hatian.',
    ],
    qiraah: [
      'Baca abstrak, pendahuluan, footnote, review literatur, dan catatan tahqiq dengan strategi close reading.',
      'Nilai kualitas sumber: jenis naskah, konteks penulis, konsistensi istilah, bukti pendukung, dan bias argumen.',
      'Sintesis beberapa teks Arab menjadi research map: masalah, teori, metode, kontribusi, dan celah riset.',
    ],
    kitabah: [
      'Tulis produk akademik Arab: abstrak, proposal, review literatur, catatan tahqiq, tanggapan peer review, dan paper mini.',
      'Gunakan struktur ilmiah: masalah, tujuan, metode, data, analisis, batasan, kesimpulan, dan daftar istilah.',
      'Latih amanah ilmiah: parafrasa, kutipan, footnote, pembatasan klaim, dan pemisahan data dari interpretasi.',
    ],
    mufradat: [
      'Bangun glosarium riset Arab dengan definisi operasional, kolokasi akademik, sinonim dekat, dan batas pemakaian.',
      'Kuasai istilah metodologi, tahqiq, manuskrip, jurnal, peer review, validitas, dan argumentasi ilmiah.',
      'Pakai kosakata secara presisi sesuai register: proposal, seminar, artikel jurnal, resensi, atau catatan tahqiq.',
    ],
    grammar: [
      'Analisis grammar sebagai alat riset: kohesi rujukan, hasr, taqyid, istitsna, nominalisasi, dan pasif ilmiah.',
      'Gunakan nahwu-balaghah untuk menjelaskan mengapa klaim dibatasi, dikuatkan, atau ditangguhkan oleh penulis.',
      'Latih transformasi kalimat: kutipan langsung ke parafrasa akademik, klaim luas ke klaim terukur, dan data ke simpulan.',
    ],
    pronunciation: [
      'Latih delivery akademik Arab: membaca abstrak, footnote, bibliografi, kutipan manuskrip, dan presentasi seminar.',
      'Atur pacing, waqaf maknawi, tekanan istilah, dan nada objektif agar argumen terdengar ilmiah, bukan retoris kosong.',
      'Gunakan TTS/shadowing untuk membandingkan artikulasi, chunking, intonasi sanggahan, dan penutup presentasi.',
    ],
  };

  return [
    ...focus[skillId],
    'Setiap lesson menghasilkan artefak riset kecil: abstrak, outline paper, annotated bibliography, glosarium, audio seminar, atau catatan kritik sumber.',
    'Standar evaluasi Scholar: presisi istilah, kejelasan metode, kedalaman analisis, adab ilmiah, dan kemampuan merevisi klaim.',
  ];
}

function getScholarVocabulary(skillId: ArabicSkillId): GeneratedArabicLesson['vocabulary'] {
  const shared = [
    { arabic: 'سُؤَالُ الْبَحْثِ', transliteration: 'su-alu al-bahts', meaning: 'pertanyaan riset' },
    { arabic: 'فَجْوَةٌ بَحْثِيَّةٌ', transliteration: 'fajwah bahtsiyyah', meaning: 'research gap' },
    { arabic: 'مَنْهَجِيَّةُ الْبَحْثِ', transliteration: 'manhajiyyatu al-bahts', meaning: 'metodologi penelitian' },
    { arabic: 'حُدُودُ الدِّرَاسَةِ', transliteration: 'hududu ad-dirasah', meaning: 'batasan studi' },
    { arabic: 'مَصَادِرُ أَوَّلِيَّةٌ', transliteration: 'mashadir awwaliyyah', meaning: 'sumber primer' },
    { arabic: 'مُرَاجَعَةُ الْأَدَبِيَّاتِ', transliteration: 'muraja-atu al-adabiyyat', meaning: 'review literatur' },
    { arabic: 'تَوْثِيقٌ عِلْمِيٌّ', transliteration: 'tautsiq ilmiyy', meaning: 'sitasi/dokumentasi ilmiah' },
    { arabic: 'نَتَائِجُ الدِّرَاسَةِ', transliteration: 'nata-iju ad-dirasah', meaning: 'hasil penelitian' },
  ];

  const bySkill: Record<ArabicSkillId, GeneratedArabicLesson['vocabulary']> = {
    kalam: [
      { arabic: 'مُنَاقَشَةٌ عِلْمِيَّةٌ', transliteration: 'munaqasyah ilmiyyah', meaning: 'diskusi akademik' },
      { arabic: 'أُطْرُوحَةٌ', transliteration: 'uthruhah', meaning: 'tesis/argumen utama' },
      { arabic: 'اعْتِرَاضٌ مَنْهَجِيٌّ', transliteration: 'itiradh manhajiyy', meaning: 'keberatan metodologis' },
      { arabic: 'تَعْقِيبٌ', transliteration: 'taqib', meaning: 'tanggapan lanjutan' },
    ],
    istima: [
      { arabic: 'نَبْرَةُ التَّحَفُّظِ', transliteration: 'nabratu at-tahaffuzh', meaning: 'nada kehati-hatian' },
      { arabic: 'تَحَوُّلُ الْمَوْقِفِ', transliteration: 'tahawwulu al-mauqif', meaning: 'perubahan posisi' },
      { arabic: 'دَلِيلٌ سَمْعِيٌّ', transliteration: 'dalil sami', meaning: 'bukti dari audio' },
      { arabic: 'خُلَاصَةُ النِّقَاشِ', transliteration: 'khulasatu an-niqasy', meaning: 'ringkasan diskusi' },
    ],
    qiraah: [
      { arabic: 'قِرَاءَةٌ نَقْدِيَّةٌ', transliteration: 'qira-ah naqdiyyah', meaning: 'bacaan kritis' },
      { arabic: 'حَاشِيَةٌ', transliteration: 'hasyiyah', meaning: 'catatan pinggir/footnote' },
      { arabic: 'مَخْطُوطَةٌ', transliteration: 'makhthuthah', meaning: 'manuskrip' },
      { arabic: 'مَوْثُوقِيَّةُ الْمَصْدَرِ', transliteration: 'mautsuqiyyatu al-mashdar', meaning: 'reliabilitas sumber' },
    ],
    kitabah: [
      { arabic: 'مُلَخَّصُ الْبَحْثِ', transliteration: 'mulakhkhashu al-bahts', meaning: 'abstrak penelitian' },
      { arabic: 'خُطَّةُ الْبَحْثِ', transliteration: 'khuththatu al-bahts', meaning: 'proposal/rencana riset' },
      { arabic: 'إِحَالَةٌ مَرْجِعِيَّةٌ', transliteration: 'ihalah marjiiyyah', meaning: 'rujukan/sitasi' },
      { arabic: 'صِيَاغَةٌ أَكَادِيمِيَّةٌ', transliteration: 'shiyaghah akadimiyyah', meaning: 'formulasi akademik' },
    ],
    mufradat: [
      { arabic: 'تَعْرِيفٌ إِجْرَائِيٌّ', transliteration: 'tarif ijra-iyy', meaning: 'definisi operasional' },
      { arabic: 'مُصْطَلَحٌ مِحْوَرِيٌّ', transliteration: 'musthalah mihwariyy', meaning: 'istilah kunci' },
      { arabic: 'حَقْلٌ دَلَالِيٌّ', transliteration: 'haql dalaliyy', meaning: 'medan makna' },
      { arabic: 'فَرْقٌ دَقِيقٌ', transliteration: 'farq daqiq', meaning: 'perbedaan nuansa' },
    ],
    grammar: [
      { arabic: 'تَقْيِيدُ الدَّلَالَةِ', transliteration: 'taqyidu ad-dalalah', meaning: 'pembatasan makna' },
      { arabic: 'الرَّبْطُ النَّصِّيُّ', transliteration: 'ar-rabthu an-nashshi', meaning: 'kohesi tekstual' },
      { arabic: 'أُسْلُوبُ الْحَصْرِ', transliteration: 'uslubu al-hashr', meaning: 'struktur pembatasan/eksklusivitas' },
      { arabic: 'تَحْوِيلُ الِاقْتِبَاسِ', transliteration: 'tahwilu al-iqtibas', meaning: 'transformasi kutipan' },
    ],
    pronunciation: [
      { arabic: 'إِلْقَاءٌ أَكَادِيمِيٌّ', transliteration: 'ilqa akadimiyy', meaning: 'delivery akademik' },
      { arabic: 'تَقْطِيعُ الْفِقْرَةِ', transliteration: 'taqthiu al-fiqrah', meaning: 'chunking paragraf' },
      { arabic: 'نَبْرُ الْمُصْطَلَحِ', transliteration: 'nabru al-musthalah', meaning: 'tekanan istilah' },
      { arabic: 'وَقْفٌ مَعْنَوِيٌّ', transliteration: 'waqf manawi', meaning: 'jeda berbasis makna' },
    ],
  };

  return [...shared, ...bySkill[skillId], ...getMasteryVocabulary(skillId).slice(0, 4)];
}

function getScholarPatterns(skillId: ArabicSkillId): GeneratedArabicLesson['patterns'] {
  const shared = [
    { label: 'Research gap', arabic: 'مَعَ كَثْرَةِ الدِّرَاسَاتِ فِي ... إِلَّا أَنَّ جَانِبَ ... لَمْ يُبْحَثْ بِصُورَةٍ كَافِيَةٍ.', transliteration: 'Maa katsrati ad-dirasat fi ... illa anna janiba ... lam yub-hats bi-shuratin kafiyah.', meaning: 'Walaupun studi tentang ... banyak, sisi ... belum dikaji secara memadai.' },
    { label: 'Batas klaim', arabic: 'لَا تَدَّعِي هَذِهِ الدِّرَاسَةُ ... وَإِنَّمَا تَسْعَى إِلَى بَيَانِ ...', transliteration: 'La taddai hadzihi ad-dirasah ... wa innama tasa ila bayani ...', meaning: 'Studi ini tidak mengklaim ..., melainkan berusaha menjelaskan ...' },
    { label: 'Metodologi', arabic: 'تَعْتَمِدُ الدِّرَاسَةُ عَلَى الْمَنْهَجِ ... مَعَ تَحْلِيلِ ... وَمُقَارَنَةِ ...', transliteration: 'Tatamidu ad-dirasah ala al-manhaj ... maa tahlili ... wa muqaranati ...', meaning: 'Studi ini memakai metode ... dengan analisis ... dan perbandingan ...' },
  ];

  const bySkill: Record<ArabicSkillId, GeneratedArabicLesson['patterns']> = {
    kalam: [
      { label: 'Jawaban penguji', arabic: 'أَشْكُرُ هَذَا السُّؤَالَ، وَأُقَيِّدُ جَوَابِي بِنُقْطَتَيْنِ...', transliteration: 'Asykuru hadza as-sual, wa uqayyidu jawabi bi-nuqthatain...', meaning: 'Terima kasih atas pertanyaan ini, saya batasi jawaban saya pada dua poin...' },
      { label: 'Menerima kritik', arabic: 'هَذِهِ مُلَاحَظَةٌ مُهِمَّةٌ، وَسَأُعِيدُ صِيَاغَةَ الْفَرْضِيَّةِ عَلَى ضَوْئِهَا.', transliteration: 'Hadzihi mulahazhah muhimmah, wa sauidu shiyaghata al-fardhiyyah ala dhau-iha.', meaning: 'Ini catatan penting, dan saya akan merumuskan ulang hipotesis berdasarkan itu.' },
    ],
    istima: [
      { label: 'Catatan posisi', arabic: 'يَبْدُو أَنَّ الْمُتَحَدِّثَ انْتَقَلَ مِنَ التَّقْرِيرِ إِلَى التَّحَفُّظِ عِنْدَمَا قَالَ...', transliteration: 'Yabdu anna al-mutahaddits intaqala mina at-taqrir ila at-tahaffuzh indama qala...', meaning: 'Tampak pembicara berpindah dari pernyataan ke kehati-hatian ketika berkata...' },
      { label: 'Rekonstruksi argumen', arabic: 'يُمْكِنُ تَرْتِيبُ حُجَّتِهِ فِي ثَلَاثِ خُطُوَاتٍ: ...', transliteration: 'Yumkinu tartibu hujjatihi fi tsalatsi khuthuwat...', meaning: 'Argumennya dapat disusun dalam tiga langkah...' },
    ],
    qiraah: [
      { label: 'Kritik sumber', arabic: 'قِيمَةُ هَذَا الْمَصْدَرِ تَظْهَرُ فِي ... غَيْرَ أَنَّ حُدُودَهُ تَكْمُنُ فِي ...', transliteration: 'Qimatu hadza al-mashdar tazhharu fi ... ghaira anna hududahu takmunu fi ...', meaning: 'Nilai sumber ini tampak pada ..., tetapi batasannya terletak pada ...' },
      { label: 'Sintesis bacaan', arabic: 'يَلْتَقِي النَّصَّانِ فِي ... وَيَفْتَرِقَانِ فِي ...', transliteration: 'Yaltaqi an-nashshan fi ... wa yaftariqani fi ...', meaning: 'Dua teks bertemu pada ..., dan berbeda pada ...' },
    ],
    kitabah: [
      { label: 'Abstrak', arabic: 'يَهْدِفُ هَذَا الْبَحْثُ إِلَى ... مِنْ خِلَالِ ... وَيَخْلُصُ إِلَى ...', transliteration: 'Yahdifu hadza al-bahtsu ila ... min khilali ... wa yakhlushu ila ...', meaning: 'Kajian ini bertujuan ... melalui ... dan menyimpulkan ...' },
      { label: 'Tanggapan reviewer', arabic: 'اسْتِجَابَةً لِمُلَاحَظَةِ الْمُرَاجِعِ، أُضِيفَتْ فِقْرَةٌ تُوَضِّحُ ...', transliteration: 'Istijabatan li-mulahazhati al-muraji, udhifat fiqrah tuwadhdihu...', meaning: 'Menanggapi catatan reviewer, ditambahkan paragraf yang menjelaskan ...' },
    ],
    mufradat: [
      { label: 'Definisi operasional', arabic: 'أَقْصِدُ بِـ ... فِي هَذَا الْبَحْثِ ... لَا ...', transliteration: 'Aqshidu bi ... fi hadza al-bahts ... la ...', meaning: 'Yang saya maksud dengan ... dalam penelitian ini adalah ..., bukan ...' },
      { label: 'Batas istilah', arabic: 'يُسْتَعْمَلُ هَذَا الْمُصْطَلَحُ هُنَا بِمَعْنًى أَضْيَقَ مِنْ ...', transliteration: 'Yustamalu hadza al-musthalah huna bi-manan adhyaqa min...', meaning: 'Istilah ini dipakai di sini dengan makna yang lebih sempit daripada ...' },
    ],
    grammar: [
      { label: 'Hasr akademik', arabic: 'لَا يَدُلُّ النَّصُّ عَلَى ... وَإِنَّمَا يَدُلُّ عَلَى ...', transliteration: 'La yadullu an-nashshu ala ... wa innama yadullu ala...', meaning: 'Teks tidak menunjukkan ..., melainkan menunjukkan ...' },
      { label: 'Pasif ilmiah', arabic: 'تَمَّ تَحْلِيلُ النَّصِّ وَمُقَارَنَةُ النُّسَخِ وَتَوْثِيقُ الْفُرُوقِ.', transliteration: 'Tamma tahlilu an-nashshi wa muqaranatu an-nusakh wa tautsiqu al-furuq.', meaning: 'Teks dianalisis, naskah dibandingkan, dan perbedaan didokumentasikan.' },
    ],
    pronunciation: [
      { label: 'Waqaf seminar', arabic: 'يَهْدِفُ هَذَا الْبَحْثُ إِلَى بَيَانِ الْمَسْأَلَةِ | ثُمَّ تَحْلِيلِ مَصَادِرِهَا | ثُمَّ عَرْضِ النَّتَائِجِ.', transliteration: 'Yahdifu hadza al-bahts ila bayani al-mas-alah | tsumma tahlili mashadiriha | tsumma ardhi an-nata-ij.', meaning: 'Jeda presentasi mengikuti unit tujuan, analisis, dan hasil.' },
      { label: 'Nada sanggahan', arabic: 'قَدْ يُقَالُ ذَلِكَ، وَلَكِنَّ الْبَيَانَ يَحْتَاجُ إِلَى تَقْيِيدٍ.', transliteration: 'Qad yuqalu dzalik, walakinna al-bayana yahtaju ila taqyid.', meaning: 'Nada sanggahan tetap sopan dan berbasis pembatasan klaim.' },
    ],
  };

  return [...shared, ...bySkill[skillId]];
}

function getScholarExamples(skillId: ArabicSkillId, topic: string): GeneratedArabicLesson['examples'] {
  const examples: Record<ArabicSkillId, GeneratedArabicLesson['examples']> = {
    kalam: [
      { arabic: 'أَعْرِضُ فِي هَذِهِ الْوَرَقَةِ سُؤَالًا رَئِيسًا يَتَعَلَّقُ بِمَوْضُوعِ الدِّرَاسَةِ.', transliteration: 'Aridhu fi hadzihi al-waraqah sualan raisan yataallaqu bi-maudhui ad-dirasah.', meaning: `Saya memaparkan pertanyaan utama yang terkait dengan ${topic.toLowerCase()}.` },
      { arabic: 'أُقَيِّدُ هَذَا الْحُكْمَ بِحُدُودِ الْمَصَادِرِ الَّتِي اعْتَمَدْتُ عَلَيْهَا.', transliteration: 'Uqayyidu hadza al-hukm bi-hududi al-mashadir allati itamadtu alaiha.', meaning: 'Saya membatasi klaim ini sesuai batas sumber yang digunakan.' },
    ],
    istima: [
      { arabic: 'ذَكَرَ الْمُحَاضِرُ الدَّلِيلَ أَوَّلًا، ثُمَّ قَيَّدَ النَّتِيجَةَ بِسِيَاقٍ مُعَيَّنٍ.', transliteration: 'Dzakara al-muhadhir ad-dalila awwalan, tsumma qayyada an-natijata bi-siyaqin muayyan.', meaning: 'Pembicara menyebut bukti dulu, lalu membatasi simpulan pada konteks tertentu.' },
      { arabic: 'النَّبْرَةُ تُوحِي بِأَنَّهُ لَا يَرْفُضُ الرَّأْيَ، بَلْ يُرَاجِعُ مَنْهَجَهُ.', transliteration: 'An-nabrah tuhi bi-annahu la yarfudhu ar-ray, bal yurajiu manhajahu.', meaning: 'Nadanya menunjukkan ia tidak menolak pendapat, tetapi meninjau metodenya.' },
    ],
    qiraah: [
      { arabic: 'يُقَدِّمُ النَّصُّ مُعْطَيَاتٍ مُهِمَّةً، لَكِنَّهُ لَا يَكْفِي وَحْدَهُ لِبِنَاءِ نَتِيجَةٍ عَامَّةٍ.', transliteration: 'Yuqaddimu an-nashshu muthayatin muhimmah, lakinnahu la yakfi wahdahu li-bina-i natijatin ammah.', meaning: 'Teks memberi data penting, tetapi tidak cukup sendirian untuk simpulan umum.' },
      { arabic: 'تَظْهَرُ فَجْوَةُ الْبَحْثِ عِنْدَ مُقَارَنَةِ هَذَا النَّصِّ بِالنُّسْخَةِ الْأُخْرَى.', transliteration: 'Tazhharu fajwatu al-bahts inda muqaranati hadza an-nash bi an-nuskhati al-ukhra.', meaning: 'Research gap tampak saat teks ini dibandingkan dengan versi lain.' },
    ],
    kitabah: [
      { arabic: 'يَهْدِفُ هَذَا الْبَحْثُ إِلَى تَحْلِيلِ الْمَسْأَلَةِ مِنْ زَاوِيَةٍ نَصِّيَّةٍ وَمَنْهَجِيَّةٍ.', transliteration: 'Yahdifu hadza al-bahts ila tahlili al-mas-alah min zawiyatin nashshiyyah wa manhajiyyah.', meaning: 'Kajian ini bertujuan menganalisis isu dari sisi tekstual dan metodologis.' },
      { arabic: 'تُبَيِّنُ النَّتَائِجُ أَنَّ الْفَرْضِيَّةَ تَحْتَاجُ إِلَى تَقْيِيدٍ لَا إِلَى رَفْضٍ كُلِّيٍّ.', transliteration: 'Tubayyinu an-nata-ij anna al-fardhiyyah tahtaju ila taqyid la ila rafdh kulliyy.', meaning: 'Hasil menunjukkan hipotesis perlu dibatasi, bukan ditolak total.' },
    ],
    mufradat: [
      { arabic: 'الْمُصْطَلَحُ الْمِحْوَرِيُّ فِي هَذَا الدَّرْسِ هُوَ مِفْتَاحُ تَحْلِيلِ الْمَصْدَرِ.', transliteration: 'Al-musthalah al-mihwari fi hadza ad-dars huwa miftahu tahlili al-mashdar.', meaning: 'Istilah kunci dalam lesson ini menjadi pintu analisis sumber.' },
      { arabic: 'لَا بُدَّ مِنْ تَمْيِيزِ الْمَعْنَى اللُّغَوِيِّ عَنِ الْمَعْنَى الِاصْطِلَاحِيِّ.', transliteration: 'La budda min tamyizi al-mana al-lughawi ani al-mana al-ishthilahi.', meaning: 'Makna bahasa harus dibedakan dari makna terminologis.' },
    ],
    grammar: [
      { arabic: 'وُضِعَتِ الْجُمْلَةُ الِاعْتِرَاضِيَّةُ لِتَقْيِيدِ النَّتِيجَةِ لَا لِتَغْيِيرِ أَصْلِهَا.', transliteration: 'Wudhiati al-jumlah al-itiradhiyyah li-taqyidi an-natijah la li-taghyiri ashliha.', meaning: 'Kalimat sisipan diletakkan untuk membatasi hasil, bukan mengubah pokoknya.' },
      { arabic: 'أَفَادَ أُسْلُوبُ الْحَصْرِ أَنَّ الْمُرَادَ هُوَ الْمَنْهَجُ لَا النَّتِيجَةُ فَقَطْ.', transliteration: 'Afada uslubu al-hashr anna al-murada huwa al-manhaj la an-natijah faqat.', meaning: 'Struktur hasr menunjukkan yang dimaksud adalah metode, bukan hanya hasil.' },
    ],
    pronunciation: [
      { arabic: 'سَأَبْدَأُ بِسُؤَالِ الْبَحْثِ | ثُمَّ أَنْتَقِلُ إِلَى الْمَنْهَجِ | ثُمَّ أَعْرِضُ النَّتَائِجَ.', transliteration: 'Sa-abda-u bi-su-ali al-bahts | tsumma antaqilu ila al-manhaj | tsumma aridhu an-nata-ij.', meaning: 'Chunking presentasi: pertanyaan riset, metode, lalu hasil.' },
      { arabic: 'يَنْبَغِي نَبْرُ الْمُصْطَلَحِ دُونَ مُبَالَغَةٍ حَتَّى يَبْقَى الْإِلْقَاءُ أَكَادِيمِيًّا.', transliteration: 'Yanbaghi nabru al-musthalah duna mubalaghah hatta yabqa al-ilqa akadimiyyan.', meaning: 'Tekanan istilah perlu jelas tanpa berlebihan agar delivery tetap akademik.' },
    ],
  };

  const shared = [
    { arabic: 'تُسَاهِمُ هَذِهِ الدِّرَاسَةُ فِي تَوْضِيحِ جَانِبٍ لَمْ يَنَلْ حَظَّهُ مِنَ الْبَحْثِ.', transliteration: 'Tusahimu hadzihi ad-dirasah fi taudhihi janibin lam yanal hazhzhahu mina al-bahts.', meaning: 'Studi ini berkontribusi menjelaskan sisi yang belum cukup diteliti.' },
    { arabic: 'وَيَبْقَى هَذَا الِاسْتِنْتَاجُ مَفْتُوحًا لِدِرَاسَاتٍ أَوْسَعَ.', transliteration: 'Wa yabqa hadza al-istintaj maftuhan li-dirasatin ausa.', meaning: 'Kesimpulan ini tetap terbuka untuk kajian yang lebih luas.' },
  ];

  return [...examples[skillId], ...shared, ...getMasteryExamples(skillId).slice(0, 2)];
}

function getScholarSteps(skillId: ArabicSkillId): string[] {
  const steps: Record<ArabicSkillId, string[]> = {
    kalam: ['Rumuskan research question', 'Presentasikan metode dan data', 'Jawab sanggahan', 'Tutup dengan revisi klaim'],
    istima: ['Catat klaim pembicara', 'Pisahkan bukti dan tafsir', 'Rekonstruksi argumen', 'Tulis kritik listening'],
    qiraah: ['Identifikasi sumber', 'Tandai istilah dan footnote', 'Nilai reliabilitas', 'Buat sintesis literatur'],
    kitabah: ['Susun abstrak', 'Bangun metodologi', 'Tulis analisis berbasis sumber', 'Revisi dengan rubrik akademik'],
    mufradat: ['Kumpulkan istilah', 'Tulis definisi operasional', 'Bandingkan sinonim', 'Pakai dalam paragraf riset'],
    grammar: ['Tandai struktur klaim', 'Analisis pembatas makna', 'Parafrase akademik', 'Jelaskan efek retoris'],
    pronunciation: ['Tandai chunking', 'Latih TTS/shadowing', 'Rekam seminar mini', 'Review pacing dan istilah'],
  };

  return steps[skillId];
}

function makeScholarPractice(skillId: ArabicSkillId, topic: string): GeneratedArabicLesson['practice'] {
  const shared: GeneratedArabicLesson['practice'] = [
    { question: 'Dalam level Scholar, research gap berarti...', options: ['celah kajian yang belum dibahas cukup oleh studi sebelumnya', 'daftar kosakata harian', 'hasil yang sudah pasti benar'], answer: 'celah kajian yang belum dibahas cukup oleh studi sebelumnya' },
    { question: 'Kalimat "لا تدعي هذه الدراسة..." dipakai untuk...', options: ['membatasi klaim penelitian', 'membuat salam pembuka', 'menghapus metodologi'], answer: 'membatasi klaim penelitian' },
    { question: 'Sumber primer dalam riset Arabic biasanya berupa...', options: ['teks asli, manuskrip, dokumen, audio, atau data utama', 'komentar tanpa rujukan', 'terjemahan bebas saja'], answer: 'teks asli, manuskrip, dokumen, audio, atau data utama' },
    { question: 'Amanah ilmiah menuntut...', options: ['sitasi jelas, parafrasa jujur, dan pemisahan data dari interpretasi', 'menyalin teks tanpa sumber', 'membuat klaim seluas mungkin'], answer: 'sitasi jelas, parafrasa jujur, dan pemisahan data dari interpretasi' },
    { question: 'Untuk topik "' + topic + '", output Scholar paling tepat adalah...', options: ['artefak akademik seperti abstrak, outline, review literatur, glosarium, atau rekaman seminar', 'satu kata tanpa konteks', 'hafalan angka'], answer: 'artefak akademik seperti abstrak, outline, review literatur, glosarium, atau rekaman seminar' },
    { question: 'Peer review sebaiknya ditanggapi dengan...', options: ['revisi terukur dan penjelasan perubahan', 'mengabaikan semua kritik', 'mengganti topik tanpa alasan'], answer: 'revisi terukur dan penjelasan perubahan' },
    { question: 'Metodologi penelitian menjelaskan...', options: ['cara data dikumpulkan, dianalisis, dan dibatasi', 'warna tampilan halaman', 'jumlah huruf Arab'], answer: 'cara data dikumpulkan, dianalisis, dan dibatasi' },
    { question: 'Kritik sumber tidak berarti...', options: ['menolak semua sumber tanpa analisis', 'menilai konteks dan reliabilitas', 'memeriksa batas data'], answer: 'menolak semua sumber tanpa analisis' },
    { question: 'Definisi operasional berguna untuk...', options: ['membatasi makna istilah sesuai kebutuhan riset', 'membuat istilah menjadi kabur', 'menghindari contoh'], answer: 'membatasi makna istilah sesuai kebutuhan riset' },
    { question: 'Kesimpulan Scholar yang baik harus...', options: ['terhubung ke data dan menyebut batas klaim', 'lebih luas dari bukti', 'tanpa rujukan ke metode'], answer: 'terhubung ke data dan menyebut batas klaim' },
  ];

  const bySkill: Record<ArabicSkillId, GeneratedArabicLesson['practice']> = {
    kalam: [
      { question: 'Saat menjawab penguji, respons terbaik adalah...', options: ['berterima kasih, membatasi jawaban, lalu menjawab berbasis data', 'menjawab emosional', 'mengulang judul saja'], answer: 'berterima kasih, membatasi jawaban, lalu menjawab berbasis data' },
      { question: 'Presentasi seminar Scholar perlu dimulai dengan...', options: ['masalah riset dan alasan pentingnya', 'cerita acak tanpa fokus', 'kesimpulan tanpa data'], answer: 'masalah riset dan alasan pentingnya' },
    ],
    istima: [
      { question: 'Dalam listening seminar, "nada kehati-hatian" menunjukkan...', options: ['pembicara membatasi klaim atau belum menyimpulkan final', 'pembicara pasti salah', 'audio tidak penting'], answer: 'pembicara membatasi klaim atau belum menyimpulkan final' },
      { question: 'Catatan listening akademik sebaiknya memisahkan...', options: ['klaim, bukti, keberatan, dan simpulan', 'nama file dan warna layar', 'kata pendek saja'], answer: 'klaim, bukti, keberatan, dan simpulan' },
    ],
    qiraah: [
      { question: 'Close reading pada teks Arab akademik menuntut...', options: ['membaca istilah, footnote, konteks, dan struktur argumen', 'membaca judul saja', 'melewati kutipan'], answer: 'membaca istilah, footnote, konteks, dan struktur argumen' },
      { question: 'Reliabilitas sumber dinilai dari...', options: ['asal sumber, konteks, konsistensi, dan dukungan bukti', 'panjang paragraf saja', 'ukuran font'], answer: 'asal sumber, konteks, konsistensi, dan dukungan bukti' },
    ],
    kitabah: [
      { question: 'Abstrak riset Arab harus memuat...', options: ['tujuan, metode, data/sumber, hasil, dan kontribusi', 'salam dan hobi', 'daftar angka tanpa kalimat'], answer: 'tujuan, metode, data/sumber, hasil, dan kontribusi' },
      { question: 'Tanggapan reviewer yang baik berbunyi seperti...', options: ['catatan diterima, bagian direvisi, dan alasannya dijelaskan', 'reviewer diabaikan', 'semua kritik dianggap salah'], answer: 'catatan diterima, bagian direvisi, dan alasannya dijelaskan' },
    ],
    mufradat: [
      { question: 'Glosarium Scholar harus berisi...', options: ['istilah, definisi, kolokasi, contoh, dan batas makna', 'terjemahan satu kata saja', 'kata tanpa konteks'], answer: 'istilah, definisi, kolokasi, contoh, dan batas makna' },
      { question: 'Medan makna membantu pelajar...', options: ['melihat hubungan istilah yang berdekatan', 'menghapus sinonim', 'menghindari definisi'], answer: 'melihat hubungan istilah yang berdekatan' },
    ],
    grammar: [
      { question: 'Hasr dalam tulisan akademik berguna untuk...', options: ['membatasi fokus klaim', 'membuat kalimat tanpa makna', 'mengubah semua kata menjadi fiil'], answer: 'membatasi fokus klaim' },
      { question: 'Pasif ilmiah seperti "تم تحليل النص" menonjolkan...', options: ['proses penelitian, bukan pelaku', 'warna teks', 'ucapan salam'], answer: 'proses penelitian, bukan pelaku' },
    ],
    pronunciation: [
      { question: 'Delivery akademik perlu pacing yang...', options: ['stabil, jelas, dan mengikuti unit makna', 'secepat mungkin tanpa jeda', 'selalu datar'], answer: 'stabil, jelas, dan mengikuti unit makna' },
      { question: 'Menekan istilah teknis berarti...', options: ['memberi penekanan ringan pada kata kunci tanpa berlebihan', 'berteriak pada semua kata', 'menghilangkan waqaf'], answer: 'memberi penekanan ringan pada kata kunci tanpa berlebihan' },
    ],
  };

  return [...shared, ...bySkill[skillId], ...makeMasteryPractice(skillId, topic).slice(0, 8)];
}

function getScholarTask(skillId: ArabicSkillId, topic: string): string {
  const tasks: Record<ArabicSkillId, string> = {
    kalam: `Siapkan seminar Arab 8-10 menit tentang ${topic.toLowerCase()}: research question, gap, metode, dua bukti utama, satu keberatan, jawaban keberatan, dan revisi klaim final.`,
    istima: `Dengarkan audio seminar/panel Arab bertema ${topic.toLowerCase()}. Buat catatan 400 kata: klaim, bukti, keberatan, nada kehati-hatian, perubahan posisi, dan ringkasan kritis.`,
    qiraah: `Baca dua sumber Arab tentang ${topic.toLowerCase()}. Buat literature map: sumber primer/sekunder, istilah kunci, metode penulis, gap, bias, dan sintesis 300 kata.`,
    kitabah: `Tulis mini paper Arab 700-900 kata tentang ${topic.toLowerCase()}: abstrak, pendahuluan, metodologi, analisis sumber, hasil, batasan, kesimpulan, dan 5 istilah kunci.`,
    mufradat: `Susun glosarium riset untuk ${topic.toLowerCase()}: 30 istilah Arab, definisi operasional, kolokasi, contoh akademik, sinonim dekat, dan catatan batas makna.`,
    grammar: `Analisis paragraf akademik Arab tentang ${topic.toLowerCase()}: struktur klaim, hasr/taqyid, pasif ilmiah, rujukan dhamir, nominalisasi, lalu parafrase menjadi gaya jurnal.`,
    pronunciation: `Rekam presentasi scholar 7 menit tentang ${topic.toLowerCase()}. Tandai chunking, waqaf maknawi, tekanan istilah, nada sanggahan, pacing, lalu tulis self-review 150 kata.`,
  };

  return tasks[skillId];
}

function getMasteryTask(skillId: ArabicSkillId, topic: string): string {
  const tasks: Record<ArabicSkillId, string> = {
    kalam: `Buat rekaman majelis ilmiah 6-8 menit tentang ${topic.toLowerCase()}: tahrir masalah, dua pendapat, tarjih, adab ikhtilaf, dan versi ringkas untuk pemula.`,
    istima: `Dengarkan audio Arab panjang bertema ${topic.toLowerCase()}. Buat peta audio: istilah teknis, alur istidlal, nada implisit, tarjih pembicara, dan ringkasan kritis 180 kata.`,
    qiraah: `Baca teks turats adaptif atau artikel akademik tentang ${topic.toLowerCase()}. Tulis ta liq 220 kata: konteks, manhaj penulis, istilah kunci, argumen, dan evaluasi.`,
    kitabah: `Tulis makalah Arab 450-650 kata tentang ${topic.toLowerCase()}: muqaddimah, tahrir masalah, analisis, tarjih, khatimah, dan abstrak 60 kata.`,
    mufradat: `Susun glosarium Mastery untuk ${topic.toLowerCase()}: 25 istilah, definisi Arab singkat, kolokasi, contoh, dan perbedaan dengan sinonim terdekat.`,
    grammar: `Parsing paragraf Arab kompleks tentang ${topic.toLowerCase()}: i rab kunci, jumlah sisipan, hasr/qashr, taqdim-taakhir, efek balaghi, lalu parafrase modern.`,
    pronunciation: `Rekam pembacaan dars 6 menit tentang ${topic.toLowerCase()}. Tandai waqaf maknawi, tekanan istilah, pacing, makharij, dan buat catatan self-review.`,
  };

  return tasks[skillId];
}

export function getArabicLessonPreview(skillId: ArabicSkillId, lesson: number, level: GeneratedArabicContentLevel = 'beginner') {
  const safeLesson = Math.max(1, Math.min(20, lesson));
  if (level === 'scholar') return scholarTopics[skillId][safeLesson - 1] ?? `Portfolio ${skillId} Scholar`;
  if (level === 'mastery') return masteryTopics[skillId][safeLesson - 1] ?? `Portfolio ${skillId} Mastery`;
  if (level === 'proficiency') return proficiencyTopics[skillId][safeLesson - 1] ?? `Review ${skillId} C2`;
  if (level === 'advanced') return advancedTopics[skillId][safeLesson - 1] ?? `Review ${skillId} C1`;
  if (level === 'upper-intermediate') return upperIntermediateTopics[skillId][safeLesson - 1] ?? `Review ${skillId} B2`;
  if (level === 'intermediate') return intermediateTopics[skillId][safeLesson - 1] ?? `Review ${skillId} B1`;

  return getFoundationTopic(level === 'elementary' ? 'elementary' : 'beginner', skillId, lesson);
}

export function getGeneratedArabicLesson(skillId: ArabicSkillId, lesson: number, level: GeneratedArabicContentLevel = 'beginner'): GeneratedArabicLesson {
  const generated = withUpperTheme(buildGeneratedArabicLesson(skillId, lesson, level), skillId, lesson, level);
  return { ...generated, practice: shuffleQuestionOptions(generated.practice, hashSeed('arabic', level, skillId, lesson)) };
}

/**
 * B1+ lessons share skill-level material; each lesson number adds its own
 * vocabulary theme (words, explanation line and quiz questions).
 */
// Shared skill drills repeat across all 20 lessons, so each lesson only shows a
// rotating slice of them; lesson-specific questions (theme words, theme
// sentences, passage) carry the rest.
const SHARED_DRILLS_PER_LESSON = 3;
const MIN_UPPER_PRACTICE = 12;
// Spreads the theme-word and passage questions over the seven skills that
// share a lesson number, instead of asking all of them in every skill.
const skillSlot: Record<ArabicSkillId, number> = { mufradat: 0, qiraah: 0, istima: 1, kalam: 1, kitabah: 2, grammar: 3, pronunciation: 2 };

function withUpperTheme(lesson: GeneratedArabicLesson, skillId: ArabicSkillId, lessonId: number, level: GeneratedArabicContentLevel): GeneratedArabicLesson {
  if (!isArabicUpperLevel(level)) return lesson;
  const theme = getArabicUpperTheme(level, Math.max(1, Math.min(20, lessonId)));
  if (!theme) return lesson;
  const random = seededRandom(hashSeed('arabic-theme', level, skillId, lessonId));
  const meanings = getArabicUpperLevelWords(level).map((word) => word.meaning);
  const slot = skillSlot[skillId];
  // Mufradat quizzes every theme word; other skills take the one word in their slot.
  const quizWords = skillId === 'mufradat' ? theme.vocabulary : theme.vocabulary.filter((_, index) => index === slot % theme.vocabulary.length);
  const themeQuiz = quizWords
    .map((word) => buildChoiceQuestion(`Apa arti「${word.arabic}」(${word.transliteration})?`, word.meaning, meanings, random))
    .filter((question): question is ChoiceQuestion => question !== null);
  const passage = getArabicUpperPassage(level, Math.max(1, Math.min(20, lessonId)));
  const passageQuiz: ChoiceQuestion[] = [];
  if (passage) {
    const comprehension = passage.questions
      .map((item) => buildChoiceQuestion(`Bacaan: ${item.question}`, item.answer, item.distractors, random))
      .filter((question): question is ChoiceQuestion => question !== null);
    // Receptive skills get every comprehension question plus a sentence-meaning item;
    // the others get one comprehension question, a different one per skill.
    const receptive = skillId === 'qiraah' || skillId === 'istima';
    if (receptive) passageQuiz.push(...comprehension);
    else if (comprehension.length) passageQuiz.push(comprehension[slot % comprehension.length]);
    if (receptive) {
      const sentence = passage.sentences[Math.floor(random() * passage.sentences.length)];
      const sentenceMeanings = passage.sentences.map((item) => item.meaning);
      const meaningQuestion = buildChoiceQuestion(`Arti kalimat bacaan「${sentence.arabic}」adalah...`, sentence.meaning, sentenceMeanings, random);
      if (meaningQuestion) passageQuiz.push(meaningQuestion);
    }
  }
  const lessonNumber = Math.max(1, Math.min(20, lessonId));
  const toSentence = ([arabic, transliteration, meaning]: [string, string, string]) => ({ arabic, transliteration, meaning });
  const themeSentences = getArabicThemeSentences(level, lessonNumber).map(toSentence);
  const specific = buildArabicThemePractice(skillId, {
    sentences: [...themeSentences, ...(passage?.sentences ?? [])],
    words: theme.vocabulary,
    levelSentences: levelThemeSentences(level),
    levelWords: getArabicUpperLevelWords(level),
    pairedSentences: themeSentences.length,
  }, hashSeed('arabic-theme-practice', level, skillId, lessonNumber));

  const seen = new Set<string>();
  const fresh = (item: ChoiceQuestion) => (seen.has(item.question) ? false : (seen.add(item.question), true));
  const lessonSpecific = [...specific, ...themeQuiz, ...passageQuiz].filter(fresh);
  // Shared drills that mention this lesson's topic are lesson-specific too.
  const topicDrills = lesson.practice.filter((item) => item.question.includes(lesson.subtitle)).filter(fresh);
  const sharedDrills = lesson.practice.filter(fresh);
  const rotated = sharedDrills.length
    ? Array.from({ length: sharedDrills.length }, (_, index) => {
      const start = hashSeed('arabic-shared-drills', level, skillId) + (lessonNumber - 1) * SHARED_DRILLS_PER_LESSON;
      return sharedDrills[(start + index) % sharedDrills.length];
    })
    : [];
  const sharedCount = Math.max(SHARED_DRILLS_PER_LESSON, MIN_UPPER_PRACTICE - lessonSpecific.length - topicDrills.length);
  const practice = [...lessonSpecific, ...topicDrills, ...rotated.slice(0, sharedCount)];
  const exampleKeys = new Set(themeSentences.map((item) => item.arabic));
  const passageNote = passage
    ? [skillId === 'istima'
      ? `Dengarkan teks "${theme.title}" dulu tanpa melihat tulisan, jawab pertanyaan bacaan, lalu buka teks untuk mengecek.`
      : `Baca teks pendek "${theme.title}", garis bawahi istilah tema, lalu jawab pertanyaan pemahaman di tab latihan.`]
    : [];
  return {
    ...lesson,
    explanation: [`Tema kosakata lesson ini: ${theme.title}. Pakai keempat istilah tema dalam latihan dan tugas akhir.`, ...passageNote, ...(lesson.explanation ?? [])],
    vocabulary: [...theme.vocabulary, ...(lesson.vocabulary ?? [])],
    examples: [...themeSentences, ...lesson.examples.filter((item) => !exampleKeys.has(item.arabic))],
    passage: passage ? { title: theme.title, sentences: passage.sentences, listenFirst: skillId === 'istima' } : undefined,
    practice,
  };
}

const levelSentenceCache = new Map<string, ArabicPassageSentence[]>();
function levelThemeSentences(level: keyof typeof arabicThemeSentences): ArabicPassageSentence[] {
  if (!levelSentenceCache.has(level)) {
    levelSentenceCache.set(level, arabicThemeSentences[level].flat().map(([arabic, transliteration, meaning]) => ({ arabic, transliteration, meaning })));
  }
  return levelSentenceCache.get(level)!;
}

function buildGeneratedArabicLesson(skillId: ArabicSkillId, lesson: number, level: GeneratedArabicContentLevel): GeneratedArabicLesson {
  const safeLesson = Math.max(1, Math.min(20, lesson));
  if (level === 'scholar') {
    const topic = getArabicLessonPreview(skillId, safeLesson, 'scholar');
    const skillTitle = skillId.charAt(0).toUpperCase() + skillId.slice(1);

    return {
      skillId,
      title: `${skillTitle} Scholar - Lesson ${safeLesson}`,
      subtitle: topic,
      objective: `Menguasai Arabic scholar/research bertema ${topic.toLowerCase()} dengan orientasi riset, tahqiq ringan, kritik sumber, seminar akademik, TTS, dan produksi ilmiah.`,
      focus: getScholarFocus(skillId),
      explanation: [
        `Lesson Scholar ini memakai tema "${topic}" sebagai jalur riset setelah Mastery. Fokusnya adalah mengubah kemahiran Arabic tinggi menjadi kemampuan akademik: membaca sumber primer, menguji metode, menyusun argumen, dan mempresentasikan temuan.`,
        'Materi Scholar menuntut bukti kerja yang bisa diperiksa: research question, literature map, catatan kritik sumber, definisi operasional, abstrak, outline paper, atau rekaman seminar.',
        'Gunakan prinsip amanah ilmiah: jangan memperluas klaim melebihi data, bedakan kutipan dari parafrasa, jelaskan batas sumber, dan beri ruang untuk revisi setelah peer review.',
        'Setiap contoh Arab dapat diputar dengan TTS. Dengarkan ritme akademiknya, tirukan chunking-nya, lalu pakai pola yang sama untuk topik risetmu sendiri.',
      ],
      patterns: getScholarPatterns(skillId),
      vocabulary: getScholarVocabulary(skillId),
      examples: getScholarExamples(skillId, topic),
      productionSteps: getScholarSteps(skillId),
      practice: makeScholarPractice(skillId, topic),
      task: getScholarTask(skillId, topic),
    };
  }

  if (level === 'mastery') {
    const topic = getArabicLessonPreview(skillId, safeLesson, 'mastery');
    const skillTitle = skillId.charAt(0).toUpperCase() + skillId.slice(1);

    return {
      skillId,
      title: `${skillTitle} Mastery - Lesson ${safeLesson}`,
      subtitle: topic,
      objective: `Menguasai Arabic mastery/post-C2 bertema ${topic.toLowerCase()} dengan orientasi turats adaptif, wacana akademik Arab, balaghah, TTS, dan produksi profesional tingkat ahli.`,
      focus: getMasteryFocus(skillId),
      explanation: [
        `Lesson Mastery ini memakai tema "${topic}" sebagai jalur pasca-C2. Fokusnya bukan lagi sekadar lancar, tetapi mampu membaca, mendengar, menjelaskan, dan memproduksi bahasa Arab dalam konteks ilmiah, turats adaptif, media Arab, dan forum ahli.`,
        ...getProficiencyExplanation(skillId, topic).slice(1),
        'Target akhir level ini adalah portfolio: rekaman, tulisan, glosarium, analisis teks, atau presentasi yang bisa dipakai sebagai bukti kemahiran Arabic tingkat ahli.',
      ],
      patterns: getMasteryPatterns(skillId),
      vocabulary: getMasteryVocabulary(skillId),
      examples: getMasteryExamples(skillId),
      productionSteps: getMasterySteps(skillId),
      practice: makeMasteryPractice(skillId, topic),
      task: getMasteryTask(skillId, topic),
    };
  }

  if (level === 'proficiency') {
    const topic = getArabicLessonPreview(skillId, safeLesson, 'proficiency');
    const skillTitle = skillId.charAt(0).toUpperCase() + skillId.slice(1);

    return {
      skillId,
      title: `${skillTitle} Proficiency - Lesson ${safeLesson}`,
      subtitle: topic,
      objective: `Menguasai Arabic proficiency/C2 bertema ${topic.toLowerCase()} dengan materi wacana tingkat mahir, contoh berharakat, TTS, kosakata konseptual, pola retorika, dan latihan produksi mandiri.`,
      focus: getProficiencyFocus(skillId),
      explanation: getProficiencyExplanation(skillId, topic),
      patterns: getProficiencyPatterns(skillId),
      vocabulary: getProficiencyVocabulary(skillId),
      examples: getProficiencyExamples(skillId),
      productionSteps: getProficiencySteps(skillId),
      practice: makeProficiencyPractice(skillId, topic),
      task: getProficiencyTask(skillId, topic),
    };
  }

  if (level === 'advanced') {
    const topic = getArabicLessonPreview(skillId, safeLesson, 'advanced');
    const skillTitle = skillId.charAt(0).toUpperCase() + skillId.slice(1);

    return {
      skillId,
      title: `${skillTitle} Advanced - Lesson ${safeLesson}`,
      subtitle: topic,
      objective: `Menguasai Arabic advanced/C1 bertema ${topic.toLowerCase()} dengan materi analitis, contoh berharakat, TTS, kosakata akademik, pola retorika, dan latihan produksi tingkat lanjut.`,
      focus: getAdvancedFocus(skillId),
      explanation: getAdvancedExplanation(skillId, topic),
      patterns: advancedPatterns[skillId],
      vocabulary: advancedVocabulary[skillId],
      examples: getAdvancedExamples(skillId),
      productionSteps: getAdvancedSteps(skillId),
      practice: makeAdvancedPractice(skillId, topic),
      task: `Buat output C1 untuk topik ${topic.toLowerCase()}: esai 180-220 kata atau rekaman 3 menit. Sertakan tesis bernuansa, sintesis dua sudut pandang, bukti, konsesi, rekomendasi, dan penutup retoris.`,
    };
  }

  if (level === 'upper-intermediate') {
    const topic = getArabicLessonPreview(skillId, safeLesson, 'upper-intermediate');
    const skillTitle = skillId.charAt(0).toUpperCase() + skillId.slice(1);

    return {
      skillId,
      title: `${skillTitle} Upper-Intermediate - Lesson ${safeLesson}`,
      subtitle: topic,
      objective: `Menguasai Arabic upper-intermediate/B2 bertema ${topic.toLowerCase()} dengan materi argumentatif, contoh berharakat, TTS, kosakata formal, pola B2, dan latihan produksi mandiri.`,
      focus: getUpperIntermediateFocus(skillId),
      explanation: getUpperIntermediateExplanation(skillId, topic),
      patterns: upperIntermediatePatterns[skillId],
      vocabulary: upperIntermediateVocabulary[skillId],
      examples: getUpperIntermediateExamples(skillId),
      productionSteps: getUpperIntermediateSteps(skillId),
      practice: makeUpperIntermediatePractice(skillId, topic),
      task: `Buat output B2 untuk topik ${topic.toLowerCase()}: minimal 8 kalimat atau rekaman 90 detik. Sertakan tesis, alasan, contoh, konsesi dengan وَلٰكِنْ/مَعَ ذٰلِكَ, dan kesimpulan.`,
    };
  }

  if (level === 'intermediate') {
    const topic = getArabicLessonPreview(skillId, safeLesson, 'intermediate');
    const skillTitle = skillId.charAt(0).toUpperCase() + skillId.slice(1);

    return {
      skillId,
      title: `${skillTitle} Intermediate - Lesson ${safeLesson}`,
      subtitle: topic,
      objective: `Menguasai Arabic intermediate/B1 bertema ${topic.toLowerCase()} dengan materi terstruktur, contoh berharakat, TTS, kosakata, pola komunikasi, dan latihan mandiri.`,
      focus: getIntermediateFocus(skillId),
      explanation: getIntermediateExplanation(skillId, topic),
      patterns: intermediatePatterns[skillId],
      vocabulary: intermediateVocabulary[skillId],
      examples: getIntermediateExamples(skillId),
      productionSteps: getIntermediateSteps(skillId),
      practice: makeIntermediatePractice(skillId, topic, safeLesson),
      task: getIntermediateTask(skillId, topic),
    };
  }

  // Pemula and elementary lessons come from the authored foundation banks
  // (per-lesson vocabulary, sentences, nahwu points and makharij drills).
  return getFoundationLesson(skillId, lesson, level === 'elementary' ? 'elementary' : 'beginner');
}
