const fs = require('fs');
const path = require('path');

// === LISTENING ENHANCEMENT ===
const LISTENING_BASE = path.join(__dirname, '../src/pages/module/english/upper-intermediate/listening');

// Enhanced VOCAB data for each lesson (the quick vocab items shown in listening lessons)
// Format: replace existing VOCAB array with more specific vocabulary related to each dialogue's topic

const LISTENING_VOCAB_ENHANCEMENTS = {
  // L1: Climate Change Policy - already should have specific vocab from original
  1: [
    { word: "Mitigation", meaning: "Mitigasi – mengurangi dampak perubahan iklim" },
    { word: "Carbon-neutral", meaning: "Karbon-netral – tidak menghasilkan emisi bersih" },
    { word: "Tipping point", meaning: "Titik kritis – ambang batas perubahan tak dapat dibalik" },
    { word: "Emissions trading", meaning: "Perdagangan emisi – sistem izin emisi karbon" },
    { word: "Renewable energy", meaning: "Energi terbarukan – energi dari sumber alam yang tak habis" },
    { word: "Climate accord", meaning: "Perjanjian iklim – kesepakatan internasional tentang iklim" },
    { word: "Fossil fuels", meaning: "Bahan bakar fosil – energi dari batubara, minyak, gas" },
    { word: "Net-zero", meaning: "Net-zero – keseimbangan antara emisi dan penyerapan karbon" }
  ],
  2: [
    { word: "Refugee", meaning: "Pengungsi – orang yang melarikan diri dari bahaya" },
    { word: "Asylum seeker", meaning: "Pencari suaka – orang yang meminta perlindungan resmi" },
    { word: "Host country", meaning: "Negara penerima – negara yang menerima pengungsi" },
    { word: "Displacement", meaning: "Pengungsian paksa – terpaksa meninggalkan rumah" },
    { word: "Integration policy", meaning: "Kebijakan integrasi – program penyatuan imigran" },
    { word: "Humanitarian", meaning: "Kemanusiaan – berkaitan dengan kesejahteraan manusia" },
    { word: "Border control", meaning: "Kontrol perbatasan – pengawasan masuk-keluar negara" },
    { word: "Stateless", meaning: "Tanpa kewarganegaraan – tidak diakui negara manapun" }
  ],
  3: [
    { word: "Algorithmic ethics", meaning: "Etika algoritmik – prinsip moral dalam desain AI" },
    { word: "Autonomous", meaning: "Otonom – mampu beroperasi tanpa intervensi manusia" },
    { word: "Data privacy", meaning: "Privasi data – hak atas perlindungan informasi pribadi" },
    { word: "Bias in AI", meaning: "Bias AI – ketidakadilan dalam sistem kecerdasan buatan" },
    { word: "Transparency", meaning: "Transparansi – keterbukaan sistem atau proses" },
    { word: "Accountability", meaning: "Akuntabilitas – tanggung jawab atas tindakan" },
    { word: "Machine learning", meaning: "Pembelajaran mesin – AI yang belajar dari data" },
    { word: "Regulation", meaning: "Regulasi – aturan yang mengatur teknologi dan industri" }
  ],
  4: [
    { word: "Digitisation", meaning: "Digitisasi – konversi ke format digital" },
    { word: "E-commerce", meaning: "Perdagangan elektronik – transaksi bisnis online" },
    { word: "Gig economy", meaning: "Ekonomi gig – model kerja berbasis kontrak jangka pendek" },
    { word: "Fintech", meaning: "Teknologi keuangan – inovasi dalam layanan finansial" },
    { word: "Blockchain", meaning: "Blockchain – sistem pencatatan data terdesentralisasi" },
    { word: "Digital currency", meaning: "Mata uang digital – uang dalam bentuk elektronik" },
    { word: "Disruption", meaning: "Disrupsi – gangguan terhadap model bisnis yang ada" },
    { word: "Platform economy", meaning: "Ekonomi platform – model bisnis berbasis platform digital" }
  ],
  5: [
    { word: "Urban density", meaning: "Kepadatan urban – jumlah penduduk per unit area kota" },
    { word: "Green space", meaning: "Ruang hijau – area terbuka alam di perkotaan" },
    { word: "Mixed-use zone", meaning: "Zona campuran – area dengan berbagai fungsi bangunan" },
    { word: "Congestion charge", meaning: "Biaya kemacetan – pajak memasuki zona padat" },
    { word: "Transit hub", meaning: "Pusat transit – titik koneksi berbagai moda transportasi" },
    { word: "Walkability", meaning: "Walkabilitas – kemudahan bejalan kaki di sebuah area" },
    { word: "Smart grid", meaning: "Jaringan pintar – sistem energi berkelanjutan berbasis teknologi" },
    { word: "Urban regeneration", meaning: "Regenerasi perkotaan – pembaruan wilayah kota" }
  ],
  6: [
    { word: "Mental health literacy", meaning: "Literasi kesehatan mental – pemahaman tentang kesehatan jiwa" },
    { word: "Stigma", meaning: "Stigma – prasangka negatif terhadap kondisi mental" },
    { word: "Therapy", meaning: "Terapi – treatment profesional untuk masalah psikologi" },
    { word: "Anxiety disorder", meaning: "Gangguan kecemasan – kondisi kecemasan yang mengganggu fungsi" },
    { word: "Burnout", meaning: "Burnout – kelelahan ekstrem akibat stres kerja berkepanjangan" },
    { word: "Resilience", meaning: "Ketahanan – kemampuan pulih dari kesulitan" },
    { word: "Mindfulness", meaning: "Mindfulness – kesadaran penuh akan momen saat ini" },
    { word: "Workplace wellbeing", meaning: "Kesehatan kerja – program kesejahteraan karyawan" }
  ],
  7: [
    { word: "Solar energy", meaning: "Energi surya – listrik dari panel matahari" },
    { word: "Wind turbine", meaning: "Turbin angin – mesin penghasil listrik dari angin" },
    { word: "Energy storage", meaning: "Penyimpanan energi – teknologi baterai/penyimpan tenaga" },
    { word: "Grid parity", meaning: "Paritas jaringan – titik kompetitif energi terbarukan vs fosil" },
    { word: "Decarbonisation", meaning: "Dekarbonisasi – pengurangan emisi karbon dalam ekonomi" },
    { word: "Offshore wind", meaning: "Angin lepas pantai – turbin angin di laut" },
    { word: "Hydroelectric", meaning: "Hidroelektrik – listrik dari tenaga air" },
    { word: "Carbon capture", meaning: "Penangkapan karbon – teknologi menyerap CO₂ dari atmosfer" }
  ],
  8: [
    { word: "Curriculum reform", meaning: "Reformasi kurikulum – perubahan fundamental materi pelajaran" },
    { word: "Standardised testing", meaning: "Ujian standar – penilaian seragam nasional" },
    { word: "Teacher attrition", meaning: "Turnover guru – tingkat guru yang meninggalkan profesi" },
    { word: "Critical thinking", meaning: "Berpikir kritis – kemampuan analisis dan evaluasi" },
    { word: "Digital literacy", meaning: "Literasi digital – kecakapan menggunakan teknologi" },
    { word: "Inclusive education", meaning: "Pendidikan inklusif – akomodasi semua kebutuhan belajar" },
    { word: "STEM focus", meaning: "Fokus STEM – penekanan pada sains, teknologi, teknik, matematika" },
    { word: "Early intervention", meaning: "Intervensi dini – dukungan belajar sedini mungkin" }
  ],
  9: [
    { word: "Universal healthcare", meaning: "Kesehatan universal – layanan kesehatan untuk semua warga" },
    { word: "Preventive medicine", meaning: "Kedokteran preventif – fokus pencegahan penyakit" },
    { word: "Health equity", meaning: "Ekuitas kesehatan – akses setara terhadap layanan medis" },
    { word: "Chronic disease", meaning: "Penyakit kronis – kondisi jangka panjang yang berkelanjutan" },
    { word: "Medical research", meaning: "Riset medis – penelitian ilmiah tentang kesehatan" },
    { word: "Triage", meaning: "Triase – prioritisasi pasien berdasarkan keparahan kondisi" },
    { word: "NHS / public health", meaning: "Kesehatan publik – program kesehatan masyarakat oleh pemerintah" },
    { word: "Pandemic preparedness", meaning: "Kesiapan pandemi – kemampuan merespons wabah global" }
  ],
  10: [
    { word: "Social comparison", meaning: "Perbandingan sosial – mengevaluasi diri berdasarkan orang lain" },
    { word: "Echo chamber", meaning: "Ruang gema – hanya terpapar pandangan yang sudah dianut" },
    { word: "Digital wellbeing", meaning: "Kesehatan digital – keseimbangan penggunaan teknologi" },
    { word: "Misinformation", meaning: "Misinformasi – informasi salah yang menyebar tanpa niat" },
    { word: "Influencer", meaning: "Influencer – orang berpengaruh di media sosial" },
    { word: "Viral content", meaning: "Konten viral – konten yang menyebar cepat secara online" },
    { word: "Social media addiction", meaning: "Kecanduan media sosial – penggunaan berlebihan yang merusak" },
    { word: "Privacy settings", meaning: "Pengaturan privasi – kontrol atas data yang dibagikan secara online" }
  ],
  11: [
    { word: "Global supply chain", meaning: "Rantai pasokan global – jaringan produksi lintas negara" },
    { word: "Trade liberalisation", meaning: "Liberalisasi perdagangan – pengurangan hambatan impor/ekspor" },
    { word: "Cultural homogenisation", meaning: "Homogenisasi budaya – penyeragaman budaya karena globalisasi" },
    { word: "Multinational", meaning: "Multinasional – perusahaan yang beroperasi di banyak negara" },
    { word: "Outsourcing", meaning: "Outsourcing – mengalihkan pekerjaan ke pihak lain/luar negeri" },
    { word: "Race to the bottom", meaning: "Kompetisi ke bawah – penurunan standar untuk bersaing" },
    { word: "Free trade agreement", meaning: "FTA – perjanjian perdagangan bebas antar negara" },
    { word: "Income inequality", meaning: "Ketimpangan pendapatan – jurang antara yang kaya dan miskin" }
  ],
  12: [
    { word: "Recidivism", meaning: "Residivisme – kecenderungan mengulang pelanggaran hukum" },
    { word: "Rehabilitation", meaning: "Rehabilitasi – program pemulihan untuk pelanggar hukum" },
    { word: "Mandatory sentencing", meaning: "Hukuman wajib – vonis minimum yang ditetapkan undang-undang" },
    { word: "Restorative justice", meaning: "Keadilan restoratif – proses perbaikan antara pelaku dan korban" },
    { word: "Overcrowding", meaning: "Overcrowding – kepadatan berlebih di fasilitas penjara" },
    { word: "Deterrence", meaning: "Deterensi – efek pencegahan kejahatan melalui hukuman" },
    { word: "Social reintegration", meaning: "Reintegrasi sosial – kembali ke masyarakat setelah hukuman" },
    { word: "Juvenile justice", meaning: "Keadilan remaja – sistem hukum untuk pelanggar di bawah umur" }
  ],
  13: [
    { word: "Orbital mechanics", meaning: "Mekanika orbital – fisika gerakan benda di luar angkasa" },
    { word: "ISS", meaning: "Stasiun Luar Angkasa Internasional – ISS – laboratorium di orbit" },
    { word: "Mars colonisation", meaning: "Kolonisasi Mars – rencana mendirikan pemukiman di Mars" },
    { word: "Space debris", meaning: "Sampah luar angkasa – objek buatan yang tak terpakai di orbit" },
    { word: "Spacecraft", meaning: "Pesawat luar angkasa – kendaraan yang beroperasi di antariksa" },
    { word: "Exoplanet", meaning: "Exoplanet – planet di luar tata surya kita" },
    { word: "Zero-gravity", meaning: "Gravitasi nol – kondisi tanpa gaya tarik gravitasi" },
    { word: "Commercial spaceflight", meaning: "Penerbangan luar angkasa komersial – layanan swasta ke antariksa" }
  ],
  14: [
    { word: "Deep learning", meaning: "Pembelajaran mendalam – subset ML menggunakan jaringan saraf kompleks" },
    { word: "Natural language processing", meaning: "NLP – kemampuan AI memproses bahasa manusia" },
    { word: "Generative AI", meaning: "AI generatif – AI yang menciptakan konten baru" },
    { word: "Superintelligence", meaning: "Superintelegensi – AI yang melampaui kecerdasan manusia" },
    { word: "Human-AI interaction", meaning: "Interaksi manusia-AI – studi tentang kolaborasi manusia dan mesin" },
    { word: "AI governance", meaning: "Tata kelola AI – kerangka aturan dan pengawasan AI" },
    { word: "Bias mitigation", meaning: "Mitigasi bias – upaya mengurangi ketidakadilan dalam AI" },
    { word: "Explainability", meaning: "Keterpahaman – kemampuan menjelaskan keputusan AI" }
  ],
  15: [
    { word: "Gut microbiome", meaning: "Mikrobioma usus – komunitas bakteri dalam saluran pencernaan" },
    { word: "Macronutrients", meaning: "Makronutrien – karbohidrat, protein, lemak dalam jumlah besar" },
    { word: "Micronutrients", meaning: "Mikronutrien – vitamin dan mineral dalam jumlah kecil" },
    { word: "Nutritional epidemiology", meaning: "Epidemiologi nutrisi – studi hubungan diet dan penyakit populasi" },
    { word: "Metabolic syndrome", meaning: "Sindrom metabolik – kumpulan kondisi yang meningkatkan risiko penyakit" },
    { word: "Ultra-processed food", meaning: "Makanan ultra-olahan – produk dengan bahan tambahan berlebihan" },
    { word: "Plant-based diet", meaning: "Diet nabati – pola makan yang mengutamakan tumbuhan" },
    { word: "Caloric density", meaning: "Kepadatan kalori – jumlah kalori per satuan volume makanan" }
  ],
  16: [
    { word: "Wealth redistribution", meaning: "Redistribusi kekayaan – transfer sumber daya dari kaya ke miskin" },
    { word: "Poverty trap", meaning: "Jebakan kemiskinan – kondisi sulit keluar dari kemiskinan" },
    { word: "Universal Basic Income", meaning: "UBI – pendapatan dasar universal untuk semua warga" },
    { word: "Progressive taxation", meaning: "Pajak progresif – tarif pajak meningkat seiring pendapatan" },
    { word: "Wealth gap", meaning: "Kesenjangan kekayaan – perbedaan aset antara kelompok" },
    { word: "Intergenerational poverty", meaning: "Kemiskinan antargenerasi – kemiskinan yang diwariskan" },
    { word: "Social safety net", meaning: "Jaring pengaman sosial – program perlindungan untuk yang rentan" },
    { word: "Gini coefficient", meaning: "Koefisien Gini – ukuran ketimpangan distribusi pendapatan" }
  ],
  17: [
    { word: "Gene editing", meaning: "Penyuntingan gen – modifikasi DNA secara presisi" },
    { word: "CRISPR", meaning: "CRISPR – teknologi penyuntingan gen yang revolusioner" },
    { word: "Personalised medicine", meaning: "Kedokteran personal – perawatan berbasis profil genetik individu" },
    { word: "Genomics", meaning: "Genomik – studi tentang seluruh set gen organisme" },
    { word: "Bioethics", meaning: "Bioetika – etika dalam penelitian dan praktik medis" },
    { word: "Clinical trial", meaning: "Uji klinis – pengujian sistematis obat pada manusia" },
    { word: "Bioinformatics", meaning: "Bioinformatika – penggunaan komputasi dalam analisis biologis" },
    { word: "Stem cell", meaning: "Sel induk – sel yang dapat berkembang menjadi berbagai jenis sel" }
  ],
  18: [
    { word: "Post-truth", meaning: "Post-truth – era di mana fakta kurang berpengaruh dari emosi" },
    { word: "Deepfake", meaning: "Deepfake – konten buatan AI yang memanipulasi gambar/suara" },
    { word: "News literacy", meaning: "Literasi berita – kemampuan mengevaluasi kualitas informasi" },
    { word: "Editorial independence", meaning: "Independensi editorial – kebebasan dari pengaruh eksternal" },
    { word: "Citizen journalism", meaning: "Jurnalisme warga – pelaporan berita oleh masyarakat biasa" },
    { word: "Paywalled", meaning: "Di balik paywall – konten yang memerlukan langganan berbayar" },
    { word: "Filter bubble", meaning: "Filter bubble – paparan informasi yang disesuaikan algoritma" },
    { word: "Fact-checking", meaning: "Pengecekan fakta – verifikasi kebenaran klaim atau berita" }
  ],
  19: [
    { word: "Cultural identity", meaning: "Identitas budaya – rasa memiliki terhadap kelompok budaya" },
    { word: "Assimilation vs. multiculturalism", meaning: "Asimilasi vs multikulturalisme – dua pendekatan terhadap keberagaman" },
    { word: "Diaspora community", meaning: "Komunitas diaspora – kelompok bermukim di luar tanah asal" },
    { word: "Heritage language", meaning: "Bahasa warisan – bahasa asli yang dipertahankan di perantauan" },
    { word: "Cultural appropriation", meaning: "Apropriasi budaya – adopsi elemen budaya pihak lain tanpa izin" },
    { word: "Indigenous rights", meaning: "Hak-hak indigenus – hak kelompok pribumi atas tanah dan budaya" },
    { word: "Soft power", meaning: "Kekuatan lunak – pengaruh budaya/nilai suatu negara di dunia" },
    { word: "National identity", meaning: "Identitas nasional – rasa kepemilikan pada sebuah bangsa" }
  ],
  20: [
    { word: "Automation displacement", meaning: "Perpindahan akibat otomasi – kehilangan pekerjaan karena mesin" },
    { word: "Reskilling", meaning: "Reskilling – melatih ulang pekerja untuk kompetensi baru" },
    { word: "Remote work", meaning: "Kerja jarak jauh – bekerja dari luar kantor secara digital" },
    { word: "Portfolio career", meaning: "Karier portofolio – gabungan beberapa pekerjaan/proyek" },
    { word: "Labour market", meaning: "Pasar tenaga kerja – sistem penawaran dan permintaan kerja" },
    { word: "Workplace flexibility", meaning: "Fleksibilitas kerja – kebebasan jadwal dan lokasi bekerja" },
    { word: "Green jobs", meaning: "Pekerjaan hijau – karier di sektor ramah lingkungan" },
    { word: "Universal Basic Income", meaning: "UBI – usulan pendapatan dasar tanpa syarat" }
  ]
};

function buildVocabArray(items) {
  return items.map(item =>
    `  { "word": "${item.word.replace(/"/g, '\\"')}", "meaning": "${item.meaning.replace(/"/g, '\\"')}" }`
  ).join(',\n');
}

let successCount = 0;

for (let lNum = 1; lNum <= 20; lNum++) {
  const file = path.join(LISTENING_BASE, `Lesson${lNum}.tsx`);
  if (!fs.existsSync(file)) { console.log(`⚠️ Lesson${lNum}.tsx not found`); continue; }

  const vocabItems = LISTENING_VOCAB_ENHANCEMENTS[lNum];
  if (!vocabItems) continue;

  let content = fs.readFileSync(file, 'utf8');

  // Find and replace VOCAB array
  const vocabRegex = /const VOCAB[^=]*=\s*\[[\s\S]*?\];/;
  if (vocabRegex.test(content)) {
    const newVocab = `const VOCAB = [\n${buildVocabArray(vocabItems)}\n];`;
    content = content.replace(vocabRegex, newVocab);
    fs.writeFileSync(file, content, 'utf8');
    console.log(`✅ Listening Lesson${lNum} vocab enhanced.`);
    successCount++;
  } else {
    console.log(`ℹ️ Listening Lesson${lNum}: VOCAB pattern not found.`);
  }
}

console.log(`\n🎯 Listening Enhancement: ${successCount}/20 lessons done.`);

// === PRONUNCIATION ENHANCEMENT ===
const PRON_BASE = path.join(__dirname, '../src/pages/module/english/upper-intermediate/pronunciation');

// Read lesson 1 to understand POINTS pattern
const pron1File = path.join(PRON_BASE, 'Lesson1.tsx');
if (fs.existsSync(pron1File)) {
  const pron1Content = fs.readFileSync(pron1File, 'utf8');
  // Check what arrays exist
  const hasPoints = /const POINTS/.test(pron1Content);
  const hasExamples = /const EXAMPLES/.test(pron1Content);
  console.log('\n📢 Pronunciation L1 arrays found:', { hasPoints, hasExamples });
}

// Get pronunciation lesson topics
const PRON_TOPICS = {};
for (let i = 1; i <= 20; i++) {
  const f = path.join(PRON_BASE, `Lesson${i}.tsx`);
  if (fs.existsSync(f)) {
    const c = fs.readFileSync(f, 'utf8');
    const titleMatch = c.match(/title="([^"]+)"/);
    if (titleMatch) PRON_TOPICS[i] = titleMatch[1];
  }
}
console.log('\n📢 Pronunciation Topics:', JSON.stringify(PRON_TOPICS, null, 2));
