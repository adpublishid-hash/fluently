const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '../src/pages/module/english/upper-intermediate/vocabulary');

// Enhanced CAT1 data for lessons 6-20 with example sentences
const ENHANCED_DATA = {
  6: { // Politics & Society
    cat1: [
      { word: "Sovereignty", ipa: "/ˈsɒvrənti/", meaning: "Kedaulatan – kekuasaan tertinggi atas suatu negara. Contoh: The treaty was seen as a threat to national **sovereignty**." },
      { word: "Coalition", ipa: "/ˌkəʊəˈlɪʃən/", meaning: "Koalisi – aliansi partai politik atau kelompok. Contoh: A **coalition** government was formed after no party achieved a majority." },
      { word: "Legislature", ipa: "/ˈledʒɪslətʃə/", meaning: "Badan legislatif – lembaga pembuat undang-undang. Contoh: The **legislature** passed the new immigration bill by a narrow margin." },
      { word: "Polarisation", ipa: "/ˌpəʊlərɪˈzeɪʃən/", meaning: "Polarisasi – perpecahan tajam menjadi dua kelompok bertentangan. Contoh: Political **polarisation** has made constructive dialogue increasingly difficult." },
      { word: "Referendum", ipa: "/ˌrefəˈrendəm/", meaning: "Referendum – pemungutan suara langsung oleh rakyat. Contoh: The country held a **referendum** on whether to leave the trade bloc." },
      { word: "Bureaucracy", ipa: "/bjʊəˈrɒkrəsi/", meaning: "Birokrasi – sistem administrasi pemerintahan yang kompleks. Contoh: Cutting through **bureaucracy** remained the biggest challenge for new entrepreneurs." },
      { word: "Censorship", ipa: "/ˈsensəʃɪp/", meaning: "Sensor – pembatasan ekspresi atau informasi oleh otoritas. Contoh: Critics accused the government of imposing **censorship** on independent media." },
      { word: "Geopolitical", ipa: "/ˌdʒiːəʊpəˈlɪtɪkəl/", meaning: "Geopolitik – berkaitan dengan pengaruh geografi terhadap politik. Contoh: The conflict had significant **geopolitical** implications for the entire region." },
      { word: "Electoral", ipa: "/ɪˈlektərəl/", meaning: "Elektoral – berkaitan dengan pemilihan umum. Contoh: **Electoral** reform was a central demand of the opposition parties." },
      { word: "Populism", ipa: "/ˈpɒpjʊlɪzəm/", meaning: "Populisme – ideologi yang mengklaim mewakili rakyat melawan elit. Contoh: The rise of **populism** has challenged traditional party structures across Europe." }
    ],
    tipsText: "Kosakata topik ini sering muncul dalam berita, debat politik, dan esai akademik. Penting untuk memahami nuansa tiap kata: 'sovereignty' (kedaulatan negara) berbeda dari 'authority' (kewenangan). Gunakan kata-kata ini dalam konteks formal: laporan kebijakan, diskusi, dan analisis geopolitik."
  },
  7: { // Arts & Culture
    cat1: [
      { word: "Aesthetic", ipa: "/iːsˈθetɪk/", meaning: "Estetika – berkaitan dengan keindahan dan apresiasi seni. Contoh: The building's **aesthetic** appeal drew architects from around the world." },
      { word: "Curator", ipa: "/kjʊəˈreɪtə/", meaning: "Kurator – pengelola koleksi museum atau galeri seni. Contoh: The **curator** designed the exhibition to challenge conventional interpretations." },
      { word: "Avant-garde", ipa: "/ˌævɒ̃ˈɡɑːd/", meaning: "Avangarde – gaya seni yang eksperimental dan inovatif. Contoh: Her **avant-garde** compositions shocked traditionalists but inspired a new generation." },
      { word: "Narrative", ipa: "/ˈnærətɪv/", meaning: "Narasi – urutan peristiwa yang membentuk cerita. Contoh: The film challenges the dominant **narrative** around colonialism and identity." },
      { word: "Genre", ipa: "/ˈʒɒnrə/", meaning: "Genre – kategori atau jenis karya seni. Contoh: She works across multiple **genres**, blending fiction with documentary elements." },
      { word: "Cultural heritage", ipa: "/ˈkʌltʃərəl ˈherɪtɪdʒ/", meaning: "Warisan budaya – tradisi dan artefak dari generasi sebelumnya. Contoh: Protecting **cultural heritage** is a priority for UNESCO and national governments alike." },
      { word: "Subversive", ipa: "/səbˈvɜːsɪv/", meaning: "Subversif – bertujuan mengacaukan atau menentang tatanan yang ada. Contoh: His **subversive** art provoked debate about censorship and freedom of expression." },
      { word: "Patronage", ipa: "/ˈpeɪtrənɪdʒ/", meaning: "Patronase – dukungan finansial kepada seniman atau lembaga seni. Contoh: Without royal **patronage**, many Renaissance artists would not have flourished." },
      { word: "Semiotics", ipa: "/ˌsiːmiˈɒtɪks/", meaning: "Semiotika – studi tentang tanda dan simbol. Contoh: A **semiotics** analysis reveals how advertising constructs cultural meaning." },
      { word: "Motif", ipa: "/məʊˈtiːf/", meaning: "Motif – elemen berulang dalam karya seni atau sastra. Contoh: The **motif** of imprisonment recurs throughout the novel as a symbol of social constraint." }
    ],
    tipsText: "Dalam menganalisis seni dan budaya secara akademik, gunakan present tense: 'The artist **explores**...' | 'The work **reflects**...' | 'The narrative **challenges**...' Hindari kata evaluatif tidak spesifik seperti 'beautiful' atau 'good' – pilih kata yang lebih presisi: 'evocative', 'thought-provoking', 'technically accomplished'."
  },
  8: { // Philosophy & Ethics
    cat1: [
      { word: "Epistemology", ipa: "/ɪˌpɪstɪˈmɒlədʒi/", meaning: "Epistemologi – cabang filsafat yang mempelajari pengetahuan. Contoh: **Epistemology** asks fundamental questions: What can we know, and how do we know it?" },
      { word: "Ontology", ipa: "/ɒnˈtɒlədʒi/", meaning: "Ontologi – studi tentang keberadaan dan hakikat realitas. Contoh: **Ontological** arguments for the existence of God have been debated for centuries." },
      { word: "Utilitarianism", ipa: "/juːˌtɪlɪˈteəriənɪzəm/", meaning: "Utilitarianisme – etika yang bertujuan memaksimalkan kebahagiaan. Contoh: **Utilitarianism** judges actions by their consequences for overall well-being." },
      { word: "Metaphysics", ipa: "/ˌmetəˈfɪzɪks/", meaning: "Metafisika – filsafat yang mempelajari hakikat realitas. Contoh: Questions about the mind-body problem fall within the domain of **metaphysics**." },
      { word: "Determinism", ipa: "/dɪˈtɜːmɪnɪzəm/", meaning: "Determinisme – pandangan bahwa semua peristiwa ditentukan oleh sebab-sebab sebelumnya. Contoh: **Determinism** challenges our intuitive belief in free will and moral responsibility." },
      { word: "Deontological", ipa: "/ˌdiːɒntəˈlɒdʒɪkəl/", meaning: "Deontologis – berkaitan dengan etika berbasis kewajiban/aturan. Contoh: Kant's **deontological** ethics holds that some actions are inherently right or wrong regardless of outcomes." },
      { word: "Autonomy", ipa: "/ɔːˈtɒnəmi/", meaning: "Otonomi – kemampuan bertindak berdasarkan pilihan sendiri. Contoh: Respecting patient **autonomy** is a cornerstone of modern medical ethics." },
      { word: "Cognition", ipa: "/kɒɡˈnɪʃən/", meaning: "Kognisi – proses mental untuk memperoleh pengetahuan. Contoh: Advances in neuroscience are transforming our understanding of human **cognition**." },
      { word: "Nihilism", ipa: "/ˈnaɪɪlɪzəm/", meaning: "Nihilisme – keyakinan bahwa hidup tidak memiliki makna intrinsik. Contoh: Nietzsche's philosophy transcends simple **nihilism** by proposing the creation of new values." },
      { word: "Pragmatism", ipa: "/ˈpræɡmətɪzəm/", meaning: "Pragmatisme – pendekatan yang menilai sesuatu berdasarkan kepraktisan. Contoh: **Pragmatism**, as a philosophical tradition, prioritises practical consequences over abstract principles." }
    ],
    tipsText: "Dalam esai filsafat, hindari pernyataan absolut. Gunakan hedging: 'It could be argued that...' | 'One interpretation is...' | 'This presupposes that...' Filosofi B2 menuntut keakuratan: bedakan 'ethics' (apa yang harus dilakukan) vs 'metaethics' (apa itu 'seharusnya') vs 'applied ethics' (kasus spesifik)."
  },
  9: { // Science & Discovery
    cat1: [
      { word: "Empirical", ipa: "/ɪmˈpɪrɪkəl/", meaning: "Empiris – berdasarkan observasi dan eksperimen, bukan teori. Contoh: The claim was supported by robust **empirical** evidence from multiple independent studies." },
      { word: "Replication", ipa: "/ˌreplɪˈkeɪʃən/", meaning: "Replikasi – pengulangan percobaan untuk memverifikasi hasil. Contoh: The **replication** crisis in psychology has raised serious concerns about published findings." },
      { word: "Hypothesis", ipa: "/haɪˈpɒθɪsɪs/", meaning: "Hipotesis – dugaan sementara yang dapat diuji. Contoh: The **hypothesis** was formulated based on preliminary observations of cellular behaviour." },
      { word: "Genome", ipa: "/ˈdʒiːnəʊm/", meaning: "Genom – keseluruhan informasi genetik suatu organisme. Contoh: Mapping the human **genome** has opened entirely new frontiers in personalised medicine." },
      { word: "Quantum", ipa: "/ˈkwɒntəm/", meaning: "Kuantum – satuan energi terkecil yang tidak dapat dibagi. Contoh: **Quantum** computing promises to solve problems beyond the reach of classical computers." },
      { word: "Neuroplasticity", ipa: "/ˌnjʊərəʊplæˈstɪsɪti/", meaning: "Neuroplastisitas – kemampuan otak berubah dan beradaptasi. Contoh: Studies in **neuroplasticity** demonstrate that the brain continues developing well into adulthood." },
      { word: "Biodegradable", ipa: "/ˌbaɪəʊdɪˈɡreɪdəbəl/", meaning: "Biodegradable – dapat terurai secara alami. Contoh: The packaging is fully **biodegradable** and leaves no harmful residues in the environment." },
      { word: "Catalyst", ipa: "/ˈkætəlɪst/", meaning: "Katalis – zat yang mempercepat reaksi atau proses (termasuk metaforis). Contoh: The discovery acted as a **catalyst** for a new wave of research into viral transmission." },
      { word: "Longitudinal", ipa: "/ˌlɒŋɡɪˈtjuːdɪnəl/", meaning: "Longitudinal – berlangsung dalam jangka panjang untuk mengamati perubahan. Contoh: A **longitudinal** study tracking 5,000 participants over 20 years confirmed the correlation." },
      { word: "Peer-reviewed", ipa: "/pɪr rɪˈvjuːd/", meaning: "Sudah ditinjau sejawat – dievaluasi oleh ilmuwan lain sebelum publikasi. Contoh: Only **peer-reviewed** research was considered when formulating the public health recommendations." }
    ],
    tipsText: "Bahasa sains akademik menggunakan passive voice secara ekstensif: 'The experiment **was conducted**...' | 'The findings **were published** in...' Hindari generalisasi berlebihan dari data: 'This **suggests** a correlation' bukan 'This **proves** that...'. Ingat: correlation ≠ causation."
  },
  10: { // Media & Communication
    cat1: [
      { word: "Disinformation", ipa: "/ˌdɪsɪnfəˈmeɪʃən/", meaning: "Disinformasi – informasi salah yang disebarkan dengan sengaja. Contoh: State-sponsored **disinformation** campaigns have undermined trust in democratic institutions." },
      { word: "Investigative", ipa: "/ɪnˈvestɪɡətɪv/", meaning: "Investigatif – melibatkan penelitian mendalam dan sistematis. Contoh: **Investigative** journalism exposed the extent of the data privacy scandal." },
      { word: "Algorithmic", ipa: "/ˌælɡəˈrɪðmɪk/", meaning: "Algoritmik – berkaitan dengan algoritma komputer. Contoh: **Algorithmic** bias in hiring tools has been shown to disadvantage minority applicants." },
      { word: "Clickbait", ipa: "/ˈklɪkbeɪt/", meaning: "Clickbait – konten yang dirancang untuk menarik klik tanpa substansi. Contoh: The rise of **clickbait** has incentivised sensationalism over accurate, nuanced reporting." },
      { word: "Plurality", ipa: "/plʊəˈrælɪti/", meaning: "Pluralitas – keberagaman suara atau pandangan dalam media. Contoh: Media **plurality** is essential for a functioning democracy and informed citizenry." },
      { word: "Soundbite", ipa: "/ˈsaʊndbaɪt/", meaning: "Soundbite – kutipan singkat yang dirancang untuk disiarkan. Contoh: Modern political communication has become dominated by **soundbites** rather than substantive debate." },
      { word: "Gatekeeping", ipa: "/ˈɡeɪtkiːpɪŋ/", meaning: "Gatekeeping – kontrol atas informasi apa yang disebarluaskan. Contoh: Social media has disrupted traditional **gatekeeping** roles once held by editors and broadcasters." },
      { word: "Paywalled", ipa: "/ˈpeɪwɔːld/", meaning: "Di balik paywall – konten yang hanya dapat diakses jika membayar. Contoh: Quality journalism is increasingly **paywalled** as advertising revenues decline." },
      { word: "Echo chamber", ipa: "/ˈekəʊ ˌtʃeɪmbə/", meaning: "Ruang gema – lingkungan di mana seseorang hanya terpapar pandangan yang sudah diterima. Contoh: Social media algorithms create **echo chambers** that reinforce existing beliefs." },
      { word: "Propaganda", ipa: "/ˌprɒpəˈɡændə/", meaning: "Propaganda – informasi yang disebarkan untuk mempengaruhi opini publik. Contoh: The regime's **propaganda** machine controlled all major broadcasters and newspapers." }
    ],
    tipsText: "Kosakata media B2 membutuhkan kemampuan berpikir kritis. Gunakan: 'The report **frames** the issue as...' | 'This narrative **perpetuates**...' | 'The source has a potential **bias** towards...' Dalam analisis media, bedakan 'fact' (fakta yang dapat diverifikasi) vs 'opinion' vs 'interpretation'."
  },
  11: { // Law & Justice
    cat1: [
      { word: "Jurisdiction", ipa: "/ˌdʒʊərɪsˈdɪkʃən/", meaning: "Yurisdiksi – kewenangan hukum atas wilayah tertentu. Contoh: The case fell outside the court's **jurisdiction** and was referred to an international tribunal." },
      { word: "Precedent", ipa: "/ˈpresɪdənt/", meaning: "Preseden – keputusan hukum sebelumnya yang menjadi acuan. Contoh: The ruling set an important **precedent** for future environmental liability cases." },
      { word: "Litigation", ipa: "/ˌlɪtɪˈɡeɪʃən/", meaning: "Litigasi – proses penyelesaian sengketa melalui pengadilan. Contoh: The company faced extensive **litigation** following the data breach." },
      { word: "Acquittal", ipa: "/əˈkwɪtəl/", meaning: "Pembebasan – keputusan tidak bersalah di pengadilan. Contoh: The jury's **acquittal** was met with widespread public surprise and debate." },
      { word: "Statute", ipa: "/ˈstætʃuːt/", meaning: "Statuta – undang-undang yang disahkan secara formal. Contoh: The **statute** was amended to address emerging challenges in digital commerce." },
      { word: "Culpability", ipa: "/ˌkʌlpəˈbɪlɪti/", meaning: "Kelalaian/pertanggungjawaban – tingkat kesalahan atau tanggung jawab moral. Contoh: The report assigned **culpability** to several senior executives for the regulatory failures." },
      { word: "Arbitration", ipa: "/ˌɑːbɪˈtreɪʃən/", meaning: "Arbitrase – penyelesaian sengketa di luar pengadilan oleh pihak ketiga. Contoh: The two companies agreed to resolve the dispute through binding **arbitration**." },
      { word: "Due process", ipa: "/djuː ˈprəʊses/", meaning: "Proses hukum yang adil – hak untuk diperlakukan sesuai prosedur hukum. Contoh: The defendant argued that his right to **due process** had been violated." },
      { word: "Non-disclosure", ipa: "/nɒn dɪsˈkləʊʒə/", meaning: "Non-pengungkapan – larangan mengungkapkan informasi tertentu. Contoh: All parties signed a **non-disclosure** agreement before beginning negotiations." },
      { word: "Extradition", ipa: "/ˌekstrəˈdɪʃən/", meaning: "Ekstradisi – penyerahan buronan ke negara lain. Contoh: The suspect fought against **extradition** to face charges in a foreign country." }
    ],
    tipsText: "Bahasa hukum formal menggunakan: 'It is alleged that...' | 'The court ruled in favour of...' | 'Subject to...' | 'In accordance with...' Bedakan 'guilty' (terbukti bersalah di pengadilan) vs 'culpable' (bertanggung jawab secara moral) – keduanya berbeda secara hukum."
  },
  12: { // Psychology & Behavior
    cat1: [
      { word: "Cognitive dissonance", ipa: "/ˈkɒɡnɪtɪv ˈdɪsənəns/", meaning: "Disonansi kognitif – ketidaknyamanan mental saat dua keyakinan bertentangan. Contoh: **Cognitive dissonance** arises when smokers know the health risks but continue smoking." },
      { word: "Intrinsic motivation", ipa: "/ɪnˈtrɪnsɪk ˌməʊtɪˈveɪʃən/", meaning: "Motivasi intrinsik – dorongan dari dalam diri, bukan hadiah eksternal. Contoh: **Intrinsic motivation** produces more sustained engagement than external rewards alone." },
      { word: "Metacognition", ipa: "/ˌmetəkɒɡˈnɪʃən/", meaning: "Metakognisi – kemampuan berpikir tentang proses berpikir sendiri. Contoh: Developing **metacognition** helps students become more effective and self-directed learners." },
      { word: "Self-efficacy", ipa: "/self ˈefɪkəsi/", meaning: "Efikasi diri – keyakinan seseorang terhadap kemampuannya sendiri. Contoh: High **self-efficacy** is strongly correlated with academic achievement and resilience." },
      { word: "Behavioural patterns", ipa: "/bɪˈheɪvjərəl ˈpætənz/", meaning: "Pola perilaku – cara bertindak yang muncul secara konsisten. Contoh: Identifying negative **behavioural patterns** is the first step in effective therapy." },
      { word: "Attachment theory", ipa: "/əˈtætʃmənt ˈθɪəri/", meaning: "Teori keterikatan – hubungan emosional antara bayi dan pengasuh. Contoh: **Attachment theory** explains how early relationships shape adult emotional bonds." },
      { word: "Conformity", ipa: "/kənˈfɔːmɪti/", meaning: "Konformitas – menyesuaikan perilaku dengan norma kelompok. Contoh: Milgram's classic studies revealed the disturbing power of **conformity** and authority." },
      { word: "Neurological", ipa: "/ˌnjʊərəˈlɒdʒɪkəl/", meaning: "Neurologis – berkaitan dengan sistem saraf. Contoh: **Neurological** research has revealed the biological basis of anxiety disorders." },
      { word: "Resilience", ipa: "/rɪˈzɪliəns/", meaning: "Ketahanan – kemampuan pulih dari kesulitan. Contoh: Psychological **resilience** can be cultivated through mindfulness and social support." },
      { word: "Cognitive bias", ipa: "/ˈkɒɡnɪtɪv ˈbaɪəs/", meaning: "Bias kognitif – kecenderungan pikiran yang menyimpang dari rasionalitas. Contoh: Confirmation bias is one of the most well-documented **cognitive biases** in human decision-making." }
    ],
    tipsText: "Psikologi akademik menggunakan hedging yang cermat: 'Research **suggests** that...' | '**According to** the findings...' | 'This **may indicate**...' Bedakan 'psychologist' (non-medis) vs 'psychiatrist' (dokter spesialis). Dalam B2, kuasai compound terms: cognitive dissonance, intrinsic motivation, self-efficacy."
  },
  13: { // Travel & Globalization
    cat1: [
      { word: "Diaspora", ipa: "/daɪˈæspərə/", meaning: "Diaspora – komunitas yang tersebar di luar tanah air aslinya. Contoh: The Indian **diaspora** plays a significant cultural and economic role in over 100 countries." },
      { word: "Transnational", ipa: "/trænsˈnæʃənəl/", meaning: "Transnasional – melampaui batas-batas nasional. Contoh: **Transnational** corporations must navigate an increasingly complex regulatory landscape." },
      { word: "Cultural assimilation", ipa: "/ˈkʌltʃərəl əˌsɪmɪˈleɪʃən/", meaning: "Asimilasi budaya – proses mengadopsi norma budaya baru. Contoh: **Cultural assimilation** can be both a survival strategy and a painful loss of identity." },
      { word: "Cosmopolitan", ipa: "/ˌkɒzməˈpɒlɪtən/", meaning: "Kosmopolitan – berkenalan dengan banyak budaya, terbuka pada dunia global. Contoh: London's **cosmopolitan** population makes it one of the world's most culturally diverse cities." },
      { word: "Multilateral", ipa: "/ˌmʌltiˈlætərəl/", meaning: "Multilateral – melibatkan banyak negara. Contoh: Addressing climate change requires **multilateral** agreements and coordinated global action." },
      { word: "Migration", ipa: "/maɪˈɡreɪʃən/", meaning: "Migrasi – perpindahan populasi dari satu tempat ke tempat lain. Contoh: Economic **migration** has reshaped labour markets across both sending and receiving countries." },
      { word: "Xenophobia", ipa: "/ˌzenəˈfəʊbiə/", meaning: "Xenofobia – ketakutan atau kebencian terhadap orang asing. Contoh: The report linked economic anxiety to rising **xenophobia** in the affected communities." },
      { word: "Homogenisation", ipa: "/ˌhɒmədʒɪnaɪˈzeɪʃən/", meaning: "Homogenisasi – proses menjadi seragam atau kehilangan keragaman. Contoh: Critics argue that globalisation leads to cultural **homogenisation** at the expense of local traditions." },
      { word: "Ecotourism", ipa: "/ˈiːkəʊˌtʊərɪzəm/", meaning: "Ekowisata – pariwisata yang bertanggung jawab pada lingkungan. Contoh: **Ecotourism** provides an economic alternative to deforestation in many biodiversity hotspots." },
      { word: "Sovereignty", ipa: "/ˈsɒvrənti/", meaning: "Kedaulatan – kekuasaan independen suatu negara. Contoh: Trade agreements were negotiated with careful attention to maintaining national **sovereignty**." }
    ],
    tipsText: "Dalam konteks globalisasi, kuasai perbedaan: 'emigrant' (meninggalkan negara asal) vs 'immigrant' (tiba di negara baru) vs 'refugee' (mengungsi dari bahaya). Gunakan: 'cultural exchange', 'globalised economy', 'cross-border' dalam tulisan formal. Hindari 'foreigner' dalam tulisan akademik – gunakan 'international student', 'migrant worker', dll."
  },
  14: { // Urban Life & Infrastructure
    cat1: [
      { word: "Gentrification", ipa: "/ˌdʒentrɪfɪˈkeɪʃən/", meaning: "Gentrifikasi – pembaruan kota yang meningkatkan harga properti dan menggeser penduduk asli. Contoh: **Gentrification** in the historic district has priced out long-term residents." },
      { word: "Urban sprawl", ipa: "/ˈɜːbən sprɔːl/", meaning: "Perluasan perkotaan tak terkendali – penyebaran kota ke daerah pinggiran. Contoh: **Urban sprawl** has increased car dependency and contributed to air pollution." },
      { word: "Infrastructure", ipa: "/ˈɪnfrəstrʌktʃə/", meaning: "Infrastruktur – sistem fisik dasar yang mendukung masyarakat. Contoh: Ageing **infrastructure** poses serious risks to public safety and economic productivity." },
      { word: "Zoning", ipa: "/ˈzəʊnɪŋ/", meaning: "Zonasi – pembagian wilayah kota berdasarkan fungsi penggunaan lahan. Contoh: Mixed-use **zoning** allows residential and commercial properties to coexist in the same area." },
      { word: "Sustainable development", ipa: "/səˈsteɪnəbəl dɪˈveləpmənt/", meaning: "Pembangunan berkelanjutan – pertumbuhan yang memenuhi kebutuhan kini tanpa merugikan masa depan. Contoh: **Sustainable development** requires balancing economic growth with environmental protection." },
      { word: "High-density", ipa: "/haɪ ˈdensɪti/", meaning: "Kepadatan tinggi – area dengan jumlah populasi atau bangunan yang tinggi per unit area. Contoh: **High-density** housing near transport hubs can reduce urban sprawl and car dependency." },
      { word: "Municipal", ipa: "/mjuːˈnɪsɪpəl/", meaning: "Municipal – berkaitan dengan pemerintahan kota lokal. Contoh: **Municipal** authorities struggled to manage the rapid influx of new residents." },
      { word: "Transit-oriented", ipa: "/ˈtrænsɪt ˈɔːrientɪd/", meaning: "Berorientasi transit – pembangunan yang berpusat di sekitar transportasi umum. Contoh: **Transit-oriented** development reduces car ownership and promotes walkable communities." },
      { word: "Congestion", ipa: "/kənˈdʒestʃən/", meaning: "Kemacetan – kepadatan lalu lintas yang menghambat pergerakan. Contoh: Traffic **congestion** costs the city an estimated $1.5 billion in lost productivity each year." },
      { word: "Resilient city", ipa: "/rɪˈzɪliənt ˈsɪti/", meaning: "Kota tangguh – kota yang mampu bertahan dan pulih dari krisis. Contoh: Building a **resilient city** requires planning for climate change, economic shocks, and social disruption." }
    ],
    tipsText: "Kosakata urban planning B2 penting untuk esai lingkungan dan kebijakan kota. Kuasai kolokasi: infrastructure deficit | smart city | urban regeneration | affordable housing | public realm. Ganti 'city problems' dengan 'urban challenges' | 'city planning' dengan 'urban planning' atau 'spatial planning'."
  },
  15: { // Education Systems
    cat1: [
      { word: "Curriculum", ipa: "/kəˈrɪkjʊləm/", meaning: "Kurikulum – rencana materi pelajaran. Contoh: The national **curriculum** was revised to incorporate digital literacy as a core skill." },
      { word: "Pedagogy", ipa: "/ˈpedəɡɒdʒi/", meaning: "Pedagogik – seni dan ilmu mengajar. Contoh: Project-based learning represents a significant shift in **pedagogy** away from rote memorisation." },
      { word: "Academic attainment", ipa: "/ˌækəˈdemɪk əˈteɪnmənt/", meaning: "Prestasi akademik – tingkat pencapaian siswa. Contoh: Socioeconomic background remains the strongest predictor of **academic attainment**." },
      { word: "Formative assessment", ipa: "/ˈfɔːmətɪv əˈsesmənt/", meaning: "Penilaian formatif – evaluasi berkelanjutan selama proses belajar. Contoh: **Formative assessment** provides ongoing feedback that helps students improve incrementally." },
      { word: "Inclusive education", ipa: "/ɪnˈkluːsɪv ˌedʒuˈkeɪʃən/", meaning: "Pendidikan inklusif – sistem yang mengakomodasi semua kebutuhan belajar. Contoh: **Inclusive education** ensures that students with disabilities learn alongside their peers." },
      { word: "Literacy", ipa: "/ˈlɪtərəsi/", meaning: "Literasi – kemampuan membaca dan menulis; kini diperluas ke digital/financial literacy. Contoh: Digital **literacy** is now considered as essential as reading and writing in the modern economy." },
      { word: "Standardised testing", ipa: "/ˈstændədaɪzd ˈtestɪŋ/", meaning: "Ujian standar – penilaian yang seragam di semua sekolah. Contoh: Critics argue that **standardised testing** narrows the curriculum and disadvantages creative students." },
      { word: "Lifelong learning", ipa: "/ˈlaɪflɒŋ ˈlɜːnɪŋ/", meaning: "Pembelajaran seumur hidup – komitmen untuk terus belajar sepanjang hayat. Contoh: **Lifelong learning** has become a necessity in a rapidly changing labour market." },
      { word: "Critical thinking", ipa: "/ˈkrɪtɪkəl ˈθɪŋkɪŋ/", meaning: "Pemikiran kritis – kemampuan menganalisis dan mengevaluasi informasi secara sistematis. Contoh: The new curriculum prioritises **critical thinking** skills over factual recall and memorisation." },
      { word: "Neurodiversity", ipa: "/ˌnjʊərəʊdaɪˈvɜːsɪti/", meaning: "Neurodiversitas – keragaman alami dalam cara otak berfungsi. Contoh: Schools are increasingly recognising **neurodiversity** and tailoring approaches to individual learning profiles." }
    ],
    tipsText: "Kosakata pendidikan B2 penting untuk esai kebijakan. Gunakan: 'educational outcomes' | 'pedagogical approaches' | 'evidence-based practice' | 'student-centred learning'. Bedakan 'education' (proses luas) vs 'schooling' (institusi sekolah) vs 'training' (skills spesifik)."
  },
  16: { // Food Industry & Nutrition
    cat1: [
      { word: "Nutritional", ipa: "/njuːˈtrɪʃənəl/", meaning: "Gizi – berkaitan dengan kandungan nutrisi makanan. Contoh: The **nutritional** value of ultra-processed food is typically far lower than whole food alternatives." },
      { word: "Food sovereignty", ipa: "/fuːd ˈsɒvrənti/", meaning: "Kedaulatan pangan – hak masyarakat menentukan sistem pangan sendiri. Contoh: Advocates of **food sovereignty** argue against corporate control of global food systems." },
      { word: "Agri-food system", ipa: "/ˈæɡrifuːd ˈsɪstəm/", meaning: "Sistem agri-pangan – jaringan produksi, distribusi, dan konsumsi pangan. Contoh: Transforming the **agri-food system** is essential for addressing climate change and food insecurity." },
      { word: "Microbiome", ipa: "/ˈmaɪkrəʊbaɪəʊm/", meaning: "Mikrobioma – komunitas mikroorganisme dalam tubuh. Contoh: Research on the gut **microbiome** suggests links between diet and mental health." },
      { word: "Caloric", ipa: "/kəˈlɒrɪk/", meaning: "Kalori – berkaitan dengan kandungan energi makanan. Contoh: **Caloric** restriction has been associated with longevity in several animal studies." },
      { word: "Food insecurity", ipa: "/fuːd ɪnˈsɪkjʊərɪti/", meaning: "Ketidakamanan pangan – kondisi kekurangan akses pangan yang cukup. Contoh: **Food insecurity** affects nearly 800 million people globally, disproportionately in low-income nations." },
      { word: "Fortified", ipa: "/ˈfɔːtɪfaɪd/", meaning: "Diperkaya – makanan yang ditambahkan nutrisi. Contoh: **Fortified** flour and rice have been effective in reducing micronutrient deficiency in many countries." },
      { word: "Sustainable agriculture", ipa: "/səˈsteɪnəbəl ˈæɡrɪkʌltʃə/", meaning: "Pertanian berkelanjutan – praktik bertani yang menjaga keseimbangan ekosistem. Contoh: **Sustainable agriculture** practices reduce pesticide use and protect soil health for future generations." },
      { word: "Obesity", ipa: "/əʊˈbiːsɪti/", meaning: "Obesitas – kondisi kelebihan berat badan yang berisiko terhadap kesehatan. Contoh: Childhood **obesity** rates have tripled over the past four decades in many high-income countries." },
      { word: "Plant-based", ipa: "/plɑːnt beɪst/", meaning: "Berbasis nabati – produk yang berasal dari tumbuhan. Contoh: The shift towards **plant-based** diets is driven by both environmental and health considerations." }
    ],
    tipsText: "Kosakata nutrisi B2 penting untuk esai kesehatan publik. Gunakan: 'dietary patterns' | 'public health implications' | 'chronic disease prevention' | 'nutritional deficiency'. Bedakan 'healthy' (sifat umum) vs 'nutritious' (kaya nutrisi) vs 'wholesome' (menyehatkan secara keseluruhan)."
  },
  17: { // Sports & Performance
    cat1: [
      { word: "Athletic performance", ipa: "/æθˈletɪk pəˈfɔːməns/", meaning: "Performa atletik – kemampuan fisik dan teknis seorang atlet. Contoh: **Athletic performance** at the elite level depends on genetics, training, and psychological resilience." },
      { word: "Biomechanics", ipa: "/ˌbaɪəʊmɪˈkænɪks/", meaning: "Biomekanik – ilmu yang mempelajari gerakan tubuh manusia. Contoh: **Biomechanics** research has revolutionised training methods in competitive swimming." },
      { word: "Doping", ipa: "/ˈdəʊpɪŋ/", meaning: "Doping – penggunaan zat terlarang untuk meningkatkan performa. Contoh: Anti-**doping** regulations have become increasingly stringent at international competitions." },
      { word: "Sports psychology", ipa: "/spɔːts saɪˈkɒlədʒi/", meaning: "Psikologi olahraga – studi tentang aspek mental performa atletik. Contoh: **Sports psychology** techniques, including visualisation and mindfulness, are now widely used by elite athletes." },
      { word: "Endurance", ipa: "/ɪnˈdjʊərəns/", meaning: "Ketahanan – kemampuan mempertahankan aktivitas fisik dalam jangka panjang. Contoh: Developing **endurance** requires consistent aerobic training over several months." },
      { word: "Sportsmanship", ipa: "/ˈspɔːtsmənʃɪp/", meaning: "Sportivitas – perilaku jujur dan etis dalam olahraga. Contoh: The committee commended him for exemplary **sportsmanship** in a highly competitive environment." },
      { word: "Tactical", ipa: "/ˈtæktɪkəl/", meaning: "Taktis – berkaitan dengan strategi dalam kompetisi. Contoh: The coach devised a **tactical** approach that exploited the opponent's defensive weaknesses." },
      { word: "Cardiovascular", ipa: "/ˌkɑːdiəʊˈvæskjʊlə/", meaning: "Kardiovaskular – berkaitan dengan jantung dan pembuluh darah. Contoh: Regular exercise provides **cardiovascular** benefits that reduce the risk of heart disease significantly." },
      { word: "Physiological", ipa: "/ˌfɪziəˈlɒdʒɪkəl/", meaning: "Fisiologis – berkaitan dengan fungsi fisik tubuh. Contoh: **Physiological** adaptations to high-altitude training include increased red blood cell production." },
      { word: "Periodisation", ipa: "/ˌpɪəriədaɪˈzeɪʃən/", meaning: "Periodisasi – perencanaan latihan dalam siklus terstruktur. Contoh: **Periodisation** allows athletes to peak at the right time for major competitions." }
    ],
    tipsText: "Kosakata olahraga akademik B2 digunakan dalam analisis kebijakan olahraga, esai sosiologis, dan laporan kesehatan. Gunakan: 'elite athlete', 'performance-enhancing', 'physical conditioning' dalam konteks formal. Bedakan 'practice' (latihan rutin) vs 'training' (program terencana) vs 'drill' (latihan teknik spesifik)."
  },
  18: { // Relationships & Society
    cat1: [
      { word: "Social cohesion", ipa: "/ˈsəʊʃəl kəʊˈhɪʒən/", meaning: "Kohesi sosial – rasa persatuan dan saling percaya dalam masyarakat. Contoh: Economic inequality continues to erode **social cohesion** in many urban communities." },
      { word: "Interpersonal", ipa: "/ˌɪntəˈpɜːsənəl/", meaning: "Interpersonal – berkaitan dengan hubungan antara individu. Contoh: Strong **interpersonal** skills are essential in any collaborative work environment." },
      { word: "Social mobility", ipa: "/ˈsəʊʃəl məʊˈbɪlɪti/", meaning: "Mobilitas sosial – kemampuan seseorang berpindah antar strata sosial. Contoh: Education is widely regarded as the primary driver of **social mobility** in developed economies." },
      { word: "Civic engagement", ipa: "/ˈsɪvɪk ɪnˈɡeɪdʒmənt/", meaning: "Keterlibatan sipil – partisipasi aktif dalam kehidupan masyarakat. Contoh: Declining **civic engagement** is a major concern for organisations committed to democratic renewal." },
      { word: "Intergenerational", ipa: "/ˌɪntədʒenəˈreɪʃənəl/", meaning: "Antargenerasi – berlangsung antara atau melibatkan beberapa generasi. Contoh: **Intergenerational** poverty is deeply entrenched and difficult to break without systemic intervention." },
      { word: "Stigma", ipa: "/ˈstɪɡmə/", meaning: "Stigma – label negatif yang diasosiasikan dengan kondisi atau kelompok tertentu. Contoh: Reducing the **stigma** surrounding mental health is crucial for improving access to treatment." },
      { word: "Empathy", ipa: "/ˈempəθi/", meaning: "Empati – kemampuan memahami dan merasakan perspektif orang lain. Contoh: Healthcare professionals must be trained to demonstrate genuine **empathy** in patient interactions." },
      { word: "Marginalisation", ipa: "/ˌmɑːdʒɪnəlaɪˈzeɪʃən/", meaning: "Marginalisasi – proses mengecualikan kelompok dari kehidupan sosial utama. Contoh: The **marginalisation** of minority communities perpetuates cycles of disadvantage and inequality." },
      { word: "Welfare state", ipa: "/ˈwelfeə steɪt/", meaning: "Negara kesejahteraan – sistem pemerintahan yang menjamin kebutuhan dasar warganya. Contoh: The **welfare state** model is under pressure as ageing populations increase demand for public services." },
      { word: "Social capital", ipa: "/ˈsəʊʃəl ˈkæpɪtəl/", meaning: "Modal sosial – nilai jaringan hubungan dan kepercayaan antar individu. Contoh: Communities with high **social capital** demonstrate greater resilience during economic and social crises." }
    ],
    tipsText: "Kosakata masyarakat B2 esensial untuk sosiologi dan kebijakan sosial. Kuasai perbedaan: 'equality' (perlakuan sama) vs 'equity' (perlakuan adil sesuai kebutuhan berbeda). Gunakan: 'social stratification' | 'systemic inequality' | 'community resilience' dalam konteks akademik."
  },
  19: { // Literature & Language
    cat1: [
      { word: "Intertextuality", ipa: "/ˌɪntətekstjʊˈælɪti/", meaning: "Intertekstualitas – hubungan antar teks sastra. Contoh: **Intertextuality** enriches the novel's meaning through its allusions to classical mythology." },
      { word: "Unreliable narrator", ipa: "/ʌnrɪˈlaɪəbəl nəˈreɪtə/", meaning: "Narator tidak dapat dipercaya – pencerita yang persepsinya dipertanyakan. Contoh: The **unreliable narrator** creates deliberate ambiguity about the true sequence of events." },
      { word: "Allegory", ipa: "/ˈæləɡəri/", meaning: "Alegoris – narasi yang memiliki makna tersembunyi di balik makna literal. Contoh: Orwell's Animal Farm is a powerful political **allegory** that critiques totalitarian regimes." },
      { word: "Stream of consciousness", ipa: "/striːm əv ˈkɒnʃəsnəs/", meaning: "Aliran kesadaran – teknik narasi yang merekam pikiran karakter secara spontan. Contoh: Virginia Woolf's **stream of consciousness** technique revolutionised the modern novel." },
      { word: "Symbolism", ipa: "/ˈsɪmbəlɪzəm/", meaning: "Simbolisme – penggunaan elemen untuk mewakili konsep abstrak. Contoh: The recurring image of the green light functions as **symbolism** for the American Dream in Fitzgerald's work." },
      { word: "Postcolonialism", ipa: "/ˌpəʊstkəˈləʊniəlɪzəm/", meaning: "Postkolonialisme – perspektif kritis terhadap warisan kolonialisme. Contoh: **Postcolonialism** theory examines how colonial legacies continue to shape literature and identity." },
      { word: "Foreshadowing", ipa: "/ˈfɔːʃædəʊɪŋ/", meaning: "Foreshadowing – petunjuk awal tentang peristiwa yang akan datang. Contoh: The storm in the opening chapter serves as **foreshadowing** for the protagonist's turbulent journey ahead." },
      { word: "Discourse analysis", ipa: "/ˈdɪskɔːs əˈnælɪsɪs/", meaning: "Analisis wacana – kajian penggunaan bahasa dalam konteks sosial. Contoh: **Discourse analysis** reveals how political language constructs and reinforces power relationships." },
      { word: "Satire", ipa: "/ˈsætaɪə/", meaning: "Satir – humor yang mengkritik atau mengejek kelemahan sosial. Contoh: Swift's A Modest Proposal remains one of the most devastating examples of political **satire** in English literature." },
      { word: "Motif", ipa: "/məʊˈtiːf/", meaning: "Motif – elemen berulang dalam karya sastra yang membawa makna. Contoh: The **motif** of blindness in King Lear operates on both literal and metaphorical levels." }
    ],
    tipsText: "Analisis sastra akademik selalu menggunakan **present tense**: 'The narrator **suggests**...' | 'The imagery **reflects**...' | 'The metaphor **reinforces**...' Jangan katakan 'Shakespeare **wrote** about...' – katakan 'Shakespeare **explores**...' Kuasai: theme vs motif vs symbol vs allegory."
  },
  20: { // Future & AI Technology
    cat1: [
      { word: "Artificial general intelligence", ipa: "/ˌɑːtɪˈfɪʃəl ˈdʒenərəl ɪnˈtelɪdʒəns/", meaning: "Kecerdasan buatan umum – AI yang mampu berpikir seperti manusia di segala bidang. Contoh: **Artificial general intelligence** remains a theoretical goal, though progress is accelerating rapidly." },
      { word: "Surveillance capitalism", ipa: "/səˈveɪləns ˈkæpɪtəlɪzəm/", meaning: "Kapitalisme pengawasan – model bisnis berbasis data perilaku pengguna. Contoh: **Surveillance capitalism** raises profound questions about privacy and the commodification of human experience." },
      { word: "Automation anxiety", ipa: "/ˌɔːtəˈmeɪʃən æŋˈzaɪɪti/", meaning: "Kecemasan otomasi – ketakutan kehilangan pekerjaan akibat teknologi. Contoh: **Automation anxiety** is widespread among workers in manufacturing and routine cognitive sectors." },
      { word: "Digital divide", ipa: "/ˈdɪdʒɪtəl dɪˈvaɪd/", meaning: "Kesenjangan digital – perbedaan akses teknologi antara kelompok masyarakat. Contoh: The **digital divide** risks creating a two-tier society in which technological benefits are inequitably distributed." },
      { word: "Algorithmic bias", ipa: "/ˌælɡəˈrɪðmɪk ˈbaɪəs/", meaning: "Bias algoritmik – ketidakadilan dalam sistem AI yang mencerminkan bias data. Contoh: **Algorithmic bias** in facial recognition software has disproportionately misidentified people of colour." },
      { word: "Singularity", ipa: "/ˌsɪŋɡjʊˈlærɪti/", meaning: "Singularitas – titik hipotetis di mana AI melampaui kecerdasan manusia. Contoh: The **singularity** hypothesis remains controversial, with experts deeply divided on its likelihood and timeframe." },
      { word: "Neural network", ipa: "/ˈnjʊərəl ˈnetwɜːk/", meaning: "Jaringan saraf tiruan – sistem komputasi yang meniru otak manusia. Contoh: Deep **neural networks** have achieved remarkable accuracy in image recognition and natural language processing." },
      { word: "Data sovereignty", ipa: "/ˈdeɪtə ˈsɒvrənti/", meaning: "Kedaulatan data – hak individu atau negara atas data yang mereka hasilkan. Contoh: **Data sovereignty** laws are being introduced across jurisdictions to limit foreign corporate data access." },
      { word: "Existential risk", ipa: "/ˌeɡzɪˈstenʃəl rɪsk/", meaning: "Risiko eksistensial – ancaman terhadap keberadaan peradaban atau humanitas. Contoh: Leading AI researchers increasingly consider **existential risk** in their ethical frameworks." },
      { word: "Autonomous systems", ipa: "/ɔːˈtɒnəməs ˈsɪstəmz/", meaning: "Sistem otonom – teknologi yang beroperasi tanpa intervensi manusia. Contoh: **Autonomous systems** in military applications raise serious ethical and legal questions under international law." }
    ],
    tipsText: "Kosakata AI B2 crucial untuk era digital. Bedakan: AI (kecerdasan buatan – luas) | ML (machine learning – subset AI) | deep learning (subset ML) | AGI (AI umum). Dalam debat etika AI, gunakan: 'algorithmic transparency' | 'responsible AI' | 'AI governance' | 'existential risk'. Data adalah plural secara formal: 'The data **suggest**...'"
  }
};

function buildVocabArray(items) {
  return items.map(item => {
    return `  {\n    "word": "${item.word}",\n    "ipa": "${item.ipa}",\n    "meaning": "${item.meaning.replace(/"/g, '\\"')}"\n  }`;
  }).join(',\n');
}

let successCount = 0;

for (let lNum = 6; lNum <= 20; lNum++) {
  const file = path.join(BASE, `Lesson${lNum}.tsx`);
  if (!fs.existsSync(file)) { console.log(`⚠️ Lesson${lNum}.tsx not found`); continue; }

  const data = ENHANCED_DATA[lNum];
  if (!data) { console.log(`ℹ️ No data for lesson ${lNum}`); continue; }

  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // Replace CAT1
  if (data.cat1) {
    const cat1Str = `const CAT1: VocabItem[] = [\n${buildVocabArray(data.cat1)}\n];`;
    const cat1Regex = /const CAT1: VocabItem\[\] = \[[\s\S]*?\];/;
    if (cat1Regex.test(content)) {
      content = content.replace(cat1Regex, cat1Str);
      changed = true;
    }
  }

  // Replace inline tips text in JSX
  if (data.tipsText) {
    // The tips text is inside <p className="text-sm text-slate-700">...</p> in the Tips B2 section
    const tipsRegex = /<p className="text-sm text-slate-700">Gunakan kosakata level ini dalam konteks formal:.*?<\/p>/s;
    const newTipsEl = `<p className="text-sm text-slate-700">${data.tipsText}</p>`;
    if (tipsRegex.test(content)) {
      content = content.replace(tipsRegex, newTipsEl);
      changed = true;
      console.log(`  ✅ Updated tips text in Lesson${lNum}`);
    } else {
      // Try another pattern
      const altPattern = /<p className="text-sm text-slate-700">[^<]{20,}<\/p>/;
      if (altPattern.test(content)) {
        // Replace first matching paragraph inside tips section
        const tipsSection = content.indexOf('Tips B2');
        if (tipsSection >= 0) {
          const beforeTips = content.substring(0, tipsSection);
          const afterTips = content.substring(tipsSection);
          const updatedAfter = afterTips.replace(/<p className="text-sm text-slate-700">[^<]+<\/p>/, newTipsEl);
          if (updatedAfter !== afterTips) {
            content = beforeTips + updatedAfter;
            changed = true;
            console.log(`  ✅ Updated tips text (alt) in Lesson${lNum}`);
          }
        }
      }
    }
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`✅ Lesson${lNum} Vocabulary enhanced.`);
    successCount++;
  } else {
    console.log(`ℹ️ Lesson${lNum}: limited changes.`);
    // Still write if cat1 was changed but we logged it differently
    if (data.cat1 && /const CAT1: VocabItem\[\] = \[/.test(content)) {
      // Check if we should have changed it
      const cat1Str = `const CAT1: VocabItem[] = [\n${buildVocabArray(data.cat1)}\n];`;
      if (!content.includes(data.cat1[0].meaning.substring(0, 20))) {
        // File not yet updated
      }
    }
  }
}

console.log(`\n🎯 Vocabulary (6-20) Enhancement: ${successCount}/15 lessons done.`);
