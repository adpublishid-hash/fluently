const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '../src/pages/module/english/upper-intermediate/vocabulary');

// Enhanced vocabulary data per lesson
// Each entry enhances the 'meaning' field to include example sentence in Indonesian/English
// and replaces B2_TIPS with topic-specific tips

const LESSON_DATA = {
  1: { // Academic Research
    cat1: [
      { word: "Hypothesis", ipa: "/haɪˈpɒθɪsɪs/", meaning: "Hipotesis – dugaan sementara yang diuji. Contoh: The study tested the **hypothesis** that exercise improves cognitive function." },
      { word: "Methodology", ipa: "/ˌmeθəˈdɒlədʒi/", meaning: "Metodologi – cara/sistem penelitian. Contoh: The **methodology** of the survey involved both qualitative and quantitative data collection." },
      { word: "Dissertation", ipa: "/ˌdɪsəˈteɪʃən/", meaning: "Disertasi – karya tulis ilmiah panjang. Contoh: She spent three years writing her doctoral **dissertation** on climate policy." },
      { word: "Inference", ipa: "/ˈɪnfərəns/", meaning: "Inferensi – kesimpulan logis dari bukti. Contoh: The researchers made a cautious **inference** based on the available data." },
      { word: "Paradigm", ipa: "/ˈpærədaɪm/", meaning: "Paradigma – kerangka berpikir dominan. Contoh: The discovery triggered a **paradigm** shift in modern biology." },
      { word: "Variable", ipa: "/ˈveəriəbəl/", meaning: "Variabel – faktor yang dapat berubah. Contoh: The researchers controlled all **variables** to ensure a fair experiment." },
      { word: "Correlation", ipa: "/ˌkɒrəˈleɪʃən/", meaning: "Korelasi – hubungan statistik antar variabel. Contoh: There is a strong **correlation** between sleep deprivation and academic performance." },
      { word: "Abstract", ipa: "/ˈæbstrækt/", meaning: "Abstrak – ringkasan karya ilmiah. Contoh: Always read the **abstract** first to determine if the paper is relevant." },
      { word: "Citation", ipa: "/saɪˈteɪʃən/", meaning: "Kutipan – referensi sumber. Contoh: The essay requires a minimum of ten academic **citations** in APA format." },
      { word: "Peer review", ipa: "/pɪr rɪˈvjuː/", meaning: "Tinjauan sejawat – evaluasi oleh peneliti lain. Contoh: The paper was accepted after rigorous **peer review** by three independent experts." }
    ],
    tips: [
      "🎓 **Academic Register**: Kata-kata akademik seperti 'hypothesis', 'methodology', dan 'paradigm' sering muncul dalam jurnal ilmiah dan laporan resmi.",
      "📖 **Collocations Penting**: conduct research | test a hypothesis | empirical evidence | peer-reviewed journal | draw an inference",
      "⚠️ **Kesalahan Umum**: Jangan gunakan 'correlation' untuk menyatakan kausalitas! Correlation ≠ causation.",
      "💡 **Tip B2**: Pelajari cara mengutip sumber secara formal: 'As Smith (2021) argues...' | 'According to a study conducted by...'",
      "🔑 **Penggunaan Aktif**: Gunakan 'synthesise' saat Anda menggabungkan berbagai sumber, bukan sekadar merangkum satu sumber saja."
    ]
  },
  2: { // Business & Finance
    cat1: [
      { word: "Liquidate", ipa: "/ˈlɪkwɪdeɪt/", meaning: "Melikuidasi – menjual aset untuk membayar hutang. Contoh: The company had to **liquidate** its assets after declaring bankruptcy." },
      { word: "Portfolio", ipa: "/pɔːtˈfəʊliəʊ/", meaning: "Portofolio – kumpulan investasi atau proyek. Contoh: She manages a diverse **portfolio** of assets worth over $10 million." },
      { word: "Stakeholder", ipa: "/ˈsteɪkhəʊldə/", meaning: "Pemangku kepentingan – semua pihak yang berkepentingan. Contoh: All **stakeholders** were consulted before the merger was finalised." },
      { word: "Dividend", ipa: "/ˈdɪvɪdend/", meaning: "Dividen – bagian keuntungan yang dibagikan ke pemegang saham. Contoh: The company announced a record **dividend** payment this quarter." },
      { word: "Leverage", ipa: "/ˈliːvərɪdʒ/", meaning: "Leverage – menggunakan modal pinjaman untuk memperbesar keuntungan. Contoh: The firm used significant **leverage** to fund its ambitious expansion." },
      { word: "Venture capital", ipa: "/ˈventʃə ˈkæpɪtəl/", meaning: "Modal ventura – investasi berisiko tinggi di perusahaan rintisan. Contoh: The startup secured **venture capital** funding to scale its operations globally." },
      { word: "Fiscal policy", ipa: "/ˈfɪskəl ˈpɒlɪsi/", meaning: "Kebijakan fiskal – penggunaan pajak dan belanja pemerintah. Contoh: The government tightened its **fiscal policy** in response to rising inflation." },
      { word: "Recession", ipa: "/rɪˈseʃən/", meaning: "Resesi – penurunan aktivitas ekonomi yang berkelanjutan. Contoh: The economy entered its deepest **recession** in over two decades." },
      { word: "Monetary", ipa: "/ˈmɒnɪtri/", meaning: "Moneter – berkaitan dengan uang dan keuangan. Contoh: The central bank implemented expansionary **monetary** policy to stimulate growth." },
      { word: "Acquisition", ipa: "/ˌækwɪˈzɪʃən/", meaning: "Akuisisi – pengambilalihan perusahaan lain. Contoh: The tech giant announced the **acquisition** of its main competitor for $5 billion." }
    ],
    tips: [
      "💼 **Business Collocations**: conduct a merger | hostile takeover | revenue stream | profit margin | balance sheet | bottom line",
      "📊 **Penting di B2**: Kemampuan mendeskripsikan tren finansial penting: 'The revenue grew significantly' | 'Profits declined sharply'",
      "⚠️ **Kesalahan Umum**: Jangan artikan 'leverage' hanya sebagai 'pengaruh' – dalam bisnis artinya penggunaan modal pinjaman.",
      "💡 **Tip B2**: Kuasai kata kerja bisnis: acquire, merge, divest, scale up/down, outsource, benchmark, diversify",
      "🔑 **Register**: Dalam laporan bisnis, gunakan nominalisasi: 'The implementation of the strategy' bukan 'They implemented the strategy'"
    ]
  },
  3: { // Environment & Sustainability
    cat1: [
      { word: "Biodiversity", ipa: "/ˌbaɪəʊdaɪˈvɜːsɪti/", meaning: "Keanekaragaman hayati – variasi kehidupan di bumi. Contoh: Tropical rainforests are critical for maintaining global **biodiversity**." },
      { word: "Emissions", ipa: "/ɪˈmɪʃənz/", meaning: "Emisi – pelepasan gas (terutama CO₂) ke atmosfer. Contoh: The country pledged to reduce carbon **emissions** by 45% before 2030." },
      { word: "Renewable", ipa: "/rɪˈnjuːəbəl/", meaning: "Terbarukan – sumber daya yang dapat dipulihkan secara alami. Contoh: Investment in **renewable** energy has tripled over the past decade." },
      { word: "Deforestation", ipa: "/ˌdiːˌfɒrɪˈsteɪʃən/", meaning: "Deforestasi – penebangan hutan secara besar-besaran. Contoh: Rampant **deforestation** in the Amazon threatens global climate stability." },
      { word: "Carbon footprint", ipa: "/ˈkɑːbən ˈfʊtprɪnt/", meaning: "Jejak karbon – total emisi gas rumah kaca dari seseorang/perusahaan. Contoh: Airlines are under pressure to reduce their **carbon footprint** significantly." },
      { word: "Ecosystem", ipa: "/ˈiːkəʊsɪstəm/", meaning: "Ekosistem – komunitas organisme dan lingkungannya. Contoh: Coral bleaching has devastated the ocean **ecosystem** along the Great Barrier Reef." },
      { word: "Sustainability", ipa: "/səˌsteɪnəˈbɪlɪti/", meaning: "Keberlanjutan – kemampuan memenuhi kebutuhan tanpa merusak masa depan. Contoh: Corporate **sustainability** is now a key factor in investment decisions." },
      { word: "Climate change", ipa: "/ˈklaɪmɪt tʃeɪndʒ/", meaning: "Perubahan iklim – perubahan jangka panjang pola cuaca global. Contoh: **Climate change** is driving more frequent and severe weather events worldwide." },
      { word: "Mitigation", ipa: "/ˌmɪtɪˈɡeɪʃən/", meaning: "Mitigasi – tindakan untuk mengurangi dampak negatif. Contoh: **Mitigation** strategies include transitioning to clean energy and reforestation." },
      { word: "Ecological", ipa: "/ˌiːkəˈlɒdʒɪkəl/", meaning: "Ekologis – berkaitan dengan hubungan makhluk hidup dan lingkungannya. Contoh: The oil spill caused long-lasting **ecological** damage to the coastal region." }
    ],
    tips: [
      "🌿 **Environmental Collocations**: carbon-neutral | net-zero emissions | fossil fuels | greenhouse gases | environmental degradation",
      "📢 **B2 Tip**: Bedakan 'mitigation' (mengurangi dampak) vs 'adaptation' (menyesuaikan diri dengan dampak yang tak terhindarkan).",
      "⚠️ **Kesalahan Umum**: 'Ecologic' bukan kata yang tepat dalam bahasa Inggris – gunakan 'ecological' sebagai adjective.",
      "💡 **Academic usage**: Dalam esai lingkungan, gunakan: 'This poses a significant threat to...' | 'The ramifications are far-reaching...'",
      "🔑 **Kosakata Formal**: Ganti 'bad for the environment' dengan 'environmentally detrimental' atau 'ecologically harmful'."
    ]
  },
  4: { // Technology & Innovation
    cat1: [
      { word: "Algorithm", ipa: "/ˈælɡərɪðəm/", meaning: "Algoritma – serangkaian instruksi sistematis. Contoh: Social media platforms use complex **algorithms** to curate personalised content." },
      { word: "Automation", ipa: "/ˌɔːtəˈmeɪʃən/", meaning: "Otomatisasi – penggantian kerja manusia dengan mesin. Contoh: **Automation** has transformed manufacturing, reducing costs but displacing workers." },
      { word: "Disruptive", ipa: "/dɪsˈrʌptɪv/", meaning: "Disruptif – merevolusi atau mengubah industri secara fundamental. Contoh: Streaming services have been **disruptive** to the traditional broadcasting industry." },
      { word: "Scalable", ipa: "/ˈskeɪləbəl/", meaning: "Skalabel – mampu berkembang/diperbesar tanpa kehilangan efisiensi. Contoh: The startup developed a **scalable** solution that could serve millions of users." },
      { word: "Encryption", ipa: "/ɪnˈkrɪpʃən/", meaning: "Enkripsi – pengkodean data untuk keamanan. Contoh: End-to-end **encryption** ensures that only the sender and recipient can read messages." },
      { word: "Artificial intelligence", ipa: "/ˌɑːtɪˈfɪʃəl ɪnˈtelɪdʒəns/", meaning: "Kecerdasan buatan – simulasi kecerdasan manusia oleh mesin. Contoh: **Artificial intelligence** is revolutionising diagnostics in healthcare and radiology." },
      { word: "Platform", ipa: "/ˈplætfɔːm/", meaning: "Platform – infrastruktur digital yang memungkinkan interaksi antar pengguna. Contoh: The digital **platform** connects freelancers with clients across 150 countries." },
      { word: "Innovation", ipa: "/ˌɪnəˈveɪʃən/", meaning: "Inovasi – pengenalan ide atau produk baru yang berdampak. Contoh: Continuous **innovation** is essential to remain competitive in the tech sector." },
      { word: "Integration", ipa: "/ˌɪntɪˈɡreɪʃən/", meaning: "Integrasi – penggabungan sistem atau komponen secara mulus. Contoh: The **integration** of AI into existing workflows has increased productivity significantly." },
      { word: "Cybersecurity", ipa: "/ˈsaɪbəsɪˌkjʊərɪti/", meaning: "Keamanan siber – perlindungan sistem digital dari serangan. Contoh: **Cybersecurity** breaches cost global businesses over $4 trillion annually." }
    ],
    tips: [
      "💻 **Tech Collocations**: machine learning | deep learning | neural network | digital transformation | data breach | cloud computing",
      "📊 **B2 Tip**: Gunakan 'leverage technology' (memanfaatkan teknologi), bukan sekadar 'use technology' dalam tulisan formal.",
      "⚠️ **Kesalahan Umum**: 'Disruptive' dalam konteks bisnis adalah positif (inovatif), tidak negatif seperti dalam percakapan sehari-hari.",
      "💡 **Frasa Formal**: The rapid proliferation of... | the exponential growth of... | unprecedented technological advancement",
      "🔑 **Register B2**: Ganti 'easy to grow' dengan 'scalable' | 'protected data' dengan 'encrypted data' | 'computer thinking' dengan 'artificial intelligence'"
    ]
  },
  5: { // Health & Medicine
    cat1: [
      { word: "Chronic", ipa: "/ˈkrɒnɪk/", meaning: "Kronis – berlangsung lama dan terus-menerus. Contoh: **Chronic** stress has been linked to cardiovascular disease and immune suppression." },
      { word: "Diagnosis", ipa: "/ˌdaɪəɡˈnəʊsɪs/", meaning: "Diagnosis – identifikasi penyakit berdasarkan gejala. Contoh: Early **diagnosis** is critical for improving outcomes in cancer treatment." },
      { word: "Therapeutic", ipa: "/ˌθerəˈpjuːtɪk/", meaning: "Terapeutik – bersifat menyembuhkan atau mengobati. Contoh: The **therapeutic** benefits of mindfulness have been well documented." },
      { word: "Immunise", ipa: "/ˈɪmjʊnaɪz/", meaning: "Mengimunisasi – memberikan vaksin untuk membangun kekebalan. Contoh: The campaign successfully **immunised** over 90% of children against measles." },
      { word: "Prognosis", ipa: "/prɒɡˈnəʊsɪs/", meaning: "Prognosis – prediksi perjalanan penyakit. Contoh: The patient's **prognosis** improved significantly following the new treatment." },
      { word: "Pathogen", ipa: "/ˈpæθədʒən/", meaning: "Patogen – mikroorganisme penyebab penyakit. Contoh: The **pathogen** responsible for the outbreak was identified within 48 hours." },
      { word: "Palliative", ipa: "/ˈpæliətɪv/", meaning: "Paliatif – perawatan yang meringankan, bukan menyembuhkan. Contoh: **Palliative** care focuses on improving quality of life for terminally ill patients." },
      { word: "Epidemic", ipa: "/ˌepɪˈdemɪk/", meaning: "Epidemi – wabah penyakit yang menyebar di komunitas tertentu. Contoh: Health authorities declared a **epidemic** after the virus spread to 12 cities." },
      { word: "Hereditary", ipa: "/hɪˈredɪtri/", meaning: "Herediter – diwariskan dari orang tua melalui gen. Contoh: Some forms of heart disease are **hereditary** and can be detected through genetic testing." },
      { word: "Intervention", ipa: "/ˌɪntəˈvenʃən/", meaning: "Intervensi – tindakan untuk mengubah kondisi kesehatan. Contoh: Early **intervention** programmes significantly reduce the impact of developmental disorders." }
    ],
    tips: [
      "🏥 **Medical Collocations**: medical intervention | clinical trial | chronic condition | therapeutic approach | early detection",
      "📊 **B2 Tip**: Bedakan 'epidemic' (satu wilayah) vs 'pandemic' (seluruh dunia) vs 'endemic' (selalu ada di wilayah tertentu).",
      "⚠️ **Kesalahan Umum**: 'Diagnose' adalah kata kerja: 'The doctor **diagnosed** her with diabetes.' Jangan gunakan 'diagnosis' sebagai verba.",
      "💡 **Formal Usage**: 'The study **demonstrates** a significant correlation between...' | 'Treatment **yielded** positive outcomes in...'",
      "🔑 **Register**: Dalam akademik medis, gunakan 'mortality rate' bukan 'death rate' | 'morbidity' bukan 'illness rate'"
    ]
  }
};

// Generate enhanced vocabulary tips for lessons 6-20
const TIPS_DATA = {
  6: ["🏛️ **Political Collocations**: political discourse | legislative process | electoral reform | civil society | democratic governance", "📊 **B2 Tip**: Bedakan 'bipartisan' (didukung dua partai) vs 'partisan' (mendukung satu partai saja).", "💡 **Formal Register**: policy-maker | constituent | sovereignty | legislation | referendum", "⚠️ **Kesalahan Umum**: 'Politics' adalah uncountable: 'Politics **is** complex' – bukan 'Politics are...'", "🔑 **Frasa Akademik**: The political landscape | political polarisation | populist rhetoric | democratic backsliding"],
  7: ["🎨 **Arts Collocations**: creative expression | artistic movement | cultural heritage | aesthetic value | avant-garde", "📊 **B2 Tip**: Gunakan 'aesthetic' sebagai adjective: '**aesthetic** merit' | bukan 'aesthetical'.", "💡 **Formal Usage**: 'The work exemplifies...' | 'The composition reflects...' | 'The narrative subverts...'", "⚠️ **Kesalahan Umum**: 'Critique' bisa noun dan verb: 'She wrote a **critique**' / 'She **critiqued** the exhibition'.", "🔑 **Kritik Seni B2**: Avoid vague terms: ganti 'beautiful' dengan 'evocative' | 'powerful' dengan 'compelling' | 'interesting' dengan 'thought-provoking'"],
  8: ["🧠 **Philosophy Collocations**: epistemology | ontology | moral philosophy | ethical framework | philosophical inquiry", "📊 **B2 Tip**: Dalam esai filsafat, gunakan 'one might argue' bukan 'I think' untuk suara yang lebih formal dan akademik.", "💡 **Frasa Kritis**: This raises the question of... | This presupposes that... | The implication is that...", "⚠️ **Kesalahan Umum**: 'Ethics' bisa singular (sebagai bidang studi): 'Ethics **is** a branch of philosophy.'", "🔑 **Register**: ganti 'thoughts about right and wrong' dengan 'ethical considerations' | 'questions about knowledge' dengan 'epistemological inquiry'"],
  9: ["🔬 **Science Collocations**: empirical evidence | scientific consensus | laboratory conditions | control group | statistical significance", "📊 **B2 Tip**: 'Significant' dalam ilmu pengetahuan = bermakna secara statistik, bukan sekadar 'penting'.", "💡 **Academic Phrases**: The findings **indicate** | The results **suggest** | The data **reveal** | The study **demonstrates**", "⚠️ **Kesalahan Umum**: Gunakan 'phenomena' (plural) dan 'phenomenon' (singular): '**This phenomenon** is...' | 'These **phenomena** are...'", "🔑 **Critical thinking**: Correlation doesn't imply causation | Peer-reviewed sources | Replication crisis in science"],
  10: ["📰 **Media Collocations**: media bias | editorial standards | digital journalism | misinformation | fact-checking", "📊 **B2 Tip**: Bedakan 'disinformation' (disebarkan dengan sengaja) vs 'misinformation' (salah tapi tanpa niat).", "💡 **Critical Media Literacy**: Evaluate source credibility | Identify confirmation bias | Recognise sensationalist headlines", "⚠️ **Kesalahan Umum**: 'The media' bisa singular atau plural tergantung konteks: '**The media are** criticising...' / '**Social media is** powerful...'", "🔑 **Frasa Formal**: Mass media | Mainstream media | Investigative journalism | Narrative framing | Editorial independence"],
  11: ["⚖️ **Legal Collocations**: due process | jurisdiction | precedent | plaintiff | defendant | verdict | statute", "📊 **B2 Tip**: Bedakan 'guilty' (terbukti bersalah di pengadilan) vs 'culpable' (bertanggung jawab secara moral).", "💡 **Formal Legal Language**: 'The court ruled that...' | 'It is alleged that...' | 'The evidence is admissible.'", "⚠️ **Kesalahan Umum**: 'Acquittal' (dibebaskan) ≠ 'innocent' (tidak bersalah) – seseorang bisa dibebaskan walau bukti kurang.", "🔑 **Register**: Ganti 'the law says' dengan 'the statute stipulates' | 'fair' dengan 'equitable' | 'guilty' dengan 'convicted'"],
  12: ["🧠 **Psychology Collocations**: cognitive bias | behavioural pattern | psychological wellbeing | social cognition | emotional regulation", "📊 **B2 Tip**: Bedakan 'effect' (noun) vs 'affect' (verb dalam psikologi): 'The **affect** of the patient was flat.' (= emotional expression).", "💡 **Formal Phrasing**: 'The study examines the psychosocial impact of...' | 'Cognitive distortions contribute to...'", "⚠️ **Kesalahan Umum**: 'Psychologic' bukan kata yang valid – gunakan 'psychological' | 'Psychologist' bukan 'psychiatrist' (psikiater = dokter).", "🔑 **Advanced Vocabulary**: metacognition | cognitive dissonance | neuroplasticity | intrinsic motivation | self-efficacy"],
  13: ["🌍 **Travel & Global Collocations**: cultural immersion | diaspora | cosmopolitan | geopolitical | transnational", "📊 **B2 Tip**: Bedakan 'emigrant' (keluar dari negara asal) vs 'immigrant' (masuk ke negara baru) vs 'migrant' (keduanya).", "💡 **Frasa Akademik**: 'Globalisation has accelerated...' | 'Cross-cultural competence...' | 'Cultural homogenisation...'", "⚠️ **Kesalahan Umum**: 'Economic' (adj) vs 'economical' (hemat): 'Economic growth' bukan 'economical growth'.", "🔑 **Register**: ganti 'countries' dengan 'nations' atau 'states' dalam konteks geopolitik formal"],
  14: ["🏙️ **Urban Collocations**: urban sprawl | infrastructure deficit | smart city | gentrification | public transport | municipal", "📊 **B2 Tip**: 'Gentrification' = proses pembaruan yang meningkatkan harga properti dan menggeser penghuni asli.", "💡 **Formal Phrasing**: 'The urban landscape is characterised by...' | 'Infrastructure investment is critical for...'", "⚠️ **Kesalahan Umum**: 'Municipality' (pemerintah kota) ≠ 'metropolis' (kota besar metropolitan).", "🔑 **Planning Vocabulary**: zoning | master plan | sustainable development | mixed-use development | transit-oriented development"],
  15: ["🎓 **Education Collocations**: curriculum design | pedagogical approach | critical thinking | inclusive education | assessment framework", "📊 **B2 Tip**: Bedakan 'education' (proses) vs 'pedagogy' (teori mengajar) vs 'didactics' (praktik mengajar).", "💡 **Academic Phrasing**: 'The curriculum fosters...' | 'Educational outcomes are measured by...' | 'The pedagogical approach underpins...'", "⚠️ **Kesalahan Umum**: 'Learn' vs 'teach': 'The teacher **taught** the students.' Students **learn** – they cannot be 'learned'.", "🔑 **Vocabulary**: literacy | numeracy | academic attainment | formative assessment | personalised learning | STEM education"],
  16: ["🍽️ **Food & Nutrition Collocations**: nutritional value | caloric intake | dietary supplement | processed food | food security", "📊 **B2 Tip**: Bedakan 'malnutrition' (kekurangan gizi) vs 'undernutrition' (kurang kalori) vs 'obesity' (kelebihan berat badan).", "💡 **Formal Phrasing**: 'Nutritional deficiency contributes to...' | 'Dietary patterns have been linked to...'", "⚠️ **Kesalahan Umum**: 'Healthy' vs 'healthful': In formal British English, 'a **healthy** diet' is correct (not 'healthful').", "🔑 **Vocabulary**: micronutrients | macronutrients | glycaemic index | saturated fats | food sovereignty | agri-food system"],
  17: ["🏆 **Sports Collocations**: athletic performance | competitive edge | endurance training | doping regulations | sportsmanship", "📊 **B2 Tip**: Dalam konteks olahraga formal, 'performance-enhancing drugs' adalah istilah resmi, bukan sekadar 'doping'.", "💡 **Formal Phrasing**: 'Peak athletic performance requires...' | 'The psychological resilience of elite athletes...'", "⚠️ **Kesalahan Umum**: 'Practice' (noun, British) vs 'practise' (verb, British); American English: 'practice' untuk keduanya.", "🔑 **Vocabulary**: biomechanics | physiological adaptation | motor skills | tactical awareness | psychological conditioning"],
  18: ["👥 **Society Collocations**: social cohesion | community resilience | social mobility | inequality | civic engagement", "📊 **B2 Tip**: Bedakan 'equality' (perlakuan sama) vs 'equity' (perlakuan adil sesuai kebutuhan yang berbeda).", "💡 **Formal Phrasing**: 'Social stratification perpetuates...' | 'The erosion of social trust...' | 'Systemic inequality...'", "⚠️ **Kesalahan Umum**: 'Society' adalah uncountable: 'Society **has** changed' – bukan 'Society **have** changed'.", "🔑 **Vocabulary**: social capital | civic duty | intergenerational poverty | grassroots movement | welfare state"],
  19: ["📚 **Language & Literature Collocations**: literary analysis | narrative structure | authorial intent | intertextuality | discourse", "📊 **B2 Tip**: Analisis sastra akademik menggunakan present tense: 'The narrator **suggests**...' (bukan 'suggested').", "💡 **Critical Terms**: 'The text explores...' | 'The metaphor reinforces...' | 'The motif symbolises...' | 'The narrative lens...'", "⚠️ **Kesalahan Umum**: 'Theme' (idea) ≠ 'topic' (subject): A theme is an abstract message; a topic is the subject matter.", "🔑 **Vocabulary**: protagonist | antagonist | foreshadowing | allegory | unreliable narrator | stream of consciousness"],
  20: ["🤖 **AI & Future Collocations**: machine learning | neural network | autonomous system | digital ethics | singularity | big data", "📊 **B2 Tip**: Bedakan 'AI' (kecerdasan buatan – luas) vs 'ML' (machine learning – subset AI) vs 'deep learning' (subset ML).", "💡 **Formal Phrasing**: 'The proliferation of AI raises profound ethical questions...' | 'Algorithmic bias perpetuates...'", "⚠️ **Kesalahan Umum**: 'Data' secara formal adalah plural: 'The **data suggest**...' (bukan 'data suggests' dalam formal writing).", "🔑 **Critical Vocabulary**: automation anxiety | surveillance capitalism | digital divide | data sovereignty | existential risk | AGI (artificial general intelligence)"]
};

function buildVocabArray(items) {
  return items.map(item => {
    const meaning = item.meaning.replace(/\*\*/g, '**').replace(/'/g, "\\'");
    return `  {\n    "word": "${item.word}",\n    "ipa": "${item.ipa}",\n    "meaning": "${item.meaning.replace(/"/g, '\\"')}"\n  }`;
  }).join(',\n');
}

function buildTipsArray(tips) {
  return tips.map(t => `  "${t.replace(/"/g, '\\"')}"`).join(',\n');
}

let successCount = 0;

for (let lNum = 1; lNum <= 20; lNum++) {
  const file = path.join(BASE, `Lesson${lNum}.tsx`);
  if (!fs.existsSync(file)) { console.log(`⚠️ Lesson${lNum}.tsx not found`); continue; }

  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // Enhance CAT1 if we have data
  if (LESSON_DATA[lNum] && LESSON_DATA[lNum].cat1) {
    const cat1Str = `const CAT1: VocabItem[] = [\n${buildVocabArray(LESSON_DATA[lNum].cat1)}\n];`;
    const cat1Regex = /const CAT1: VocabItem\[\] = \[[\s\S]*?\];/;
    if (cat1Regex.test(content)) {
      content = content.replace(cat1Regex, cat1Str);
      changed = true;
      console.log(`  ✅ Enhanced CAT1 in Lesson${lNum}`);
    }
  }

  // Enhance B2_TIPS if we have data
  const tipsData = (LESSON_DATA[lNum] && LESSON_DATA[lNum].tips) ? LESSON_DATA[lNum].tips : TIPS_DATA[lNum];
  if (tipsData) {
    const tipsStr = `const B2_TIPS: string[] = [\n${buildTipsArray(tipsData)}\n];`;
    const tipsRegex = /const B2_TIPS: string\[\] = \[[\s\S]*?\];/;
    if (tipsRegex.test(content)) {
      content = content.replace(tipsRegex, tipsStr);
      changed = true;
      console.log(`  ✅ Enhanced B2_TIPS in Lesson${lNum}`);
    }
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`✅ Lesson${lNum} Vocabulary enhanced.`);
    successCount++;
  } else {
    console.log(`ℹ️ Lesson${lNum}: no changes made.`);
  }
}

console.log(`\n🎯 Vocabulary Enhancement: ${successCount}/20 lessons done.`);
