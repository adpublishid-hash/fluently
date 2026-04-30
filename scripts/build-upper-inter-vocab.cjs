// build-upper-inter-vocab.cjs
// Generates 20 Upper-Intermediate (B2) Vocabulary lessons
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '../src/pages/module/english/upper-intermediate/vocabulary');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const ACCENT_COLOR = '#117A65';

const LESSONS = [
  {
    id: 1, title: 'Academic Research', subtitle: 'Kosakata Penelitian & Studi',
    cat1: { name: 'Nouns', desc: 'Kata benda dalam konteks riset akademik.', color: 'teal', items: [
      { word: 'Hypothesis', ipa: '/haɪˈpɒθɪsɪs/', meaning: 'Hipotesis – dugaan sementara yang diuji' },
      { word: 'Methodology', ipa: '/ˌmeθəˈdɒlədʒi/', meaning: 'Metodologi – cara/sistem penelitian' },
      { word: 'Dissertation', ipa: '/ˌdɪsəˈteɪʃən/', meaning: 'Disertasi – karya tulis ilmiah panjang' },
      { word: 'Inference', ipa: '/ˈɪnfərəns/', meaning: 'Inferensi – kesimpulan logis' },
      { word: 'Paradigm', ipa: '/ˈpærədaɪm/', meaning: 'Paradigma – kerangka berpikir dominan' },
      { word: 'Variable', ipa: '/ˈveəriəbəl/', meaning: 'Variabel – faktor yang dapat berubah' },
      { word: 'Correlation', ipa: '/ˌkɒrəˈleɪʃən/', meaning: 'Korelasi – hubungan antar variabel' },
      { word: 'Abstract', ipa: '/ˈæbstrækt/', meaning: 'Abstrak – ringkasan karya ilmiah' },
      { word: 'Citation', ipa: '/saɪˈteɪʃən/', meaning: 'Kutipan – referensi sumber' },
      { word: 'Peer review', ipa: '/pɪr rɪˈvjuː/', meaning: 'Tinjauan sejawat – evaluasi oleh peneliti lain' },
    ]},
    cat2: { name: 'Verbs', desc: 'Kata kerja dalam konteks analisis akademik.', color: 'emerald', items: [
      { word: 'Analyse', ipa: '/ˈænəlaɪz/', meaning: 'Menganalisis secara mendalam' },
      { word: 'Synthesise', ipa: '/ˈsɪnθəsaɪz/', meaning: 'Mensintesis – menggabungkan informasi' },
      { word: 'Evaluate', ipa: '/ɪˈvæljueɪt/', meaning: 'Mengevaluasi secara kritis' },
      { word: 'Substantiate', ipa: '/səbˈstænʃieɪt/', meaning: 'Mensubstansiasi – membuktikan dengan fakta' },
      { word: 'Contradict', ipa: '/ˌkɒntrəˈdɪkt/', meaning: 'Bertentangan dengan pernyataan lain' },
      { word: 'Propose', ipa: '/prəˈpoʊz/', meaning: 'Mengusulkan sebuah teori atau ide' },
      { word: 'Validate', ipa: '/ˈvælɪdeɪt/', meaning: 'Memvalidasi – memastikan kebenaran' },
      { word: 'Cite', ipa: '/saɪt/', meaning: 'Mengutip sumber' },
      { word: 'Deduce', ipa: '/dɪˈdjuːs/', meaning: 'Menyimpulkan secara logis' },
      { word: 'Interpret', ipa: '/ɪnˈtɜːrprɪt/', meaning: 'Menginterpretasikan data/teks' },
    ]},
    cat3: { name: 'Academic Phrases', desc: 'Frasa penting untuk karya tulis formal.', color: 'cyan', items: [
      { word: 'Based on evidence', ipa: '/beɪst ɒn ˈevɪdəns/', meaning: 'Berdasarkan bukti' },
      { word: 'In contrast to', ipa: '/ɪn ˈkɒntrɑːst tuː/', meaning: 'Berbeda dengan / bertolak belakang' },
      { word: 'It can be argued that', ipa: '/ɪt kæn biː ˈɑːrgjuːd ðæt/', meaning: 'Dapat diargumentasikan bahwa' },
      { word: 'To a significant extent', ipa: '/tuː ə sɪɡˈnɪfɪkənt ɪkˈstent/', meaning: 'Hingga tingkat yang signifikan' },
      { word: 'Further research is needed', ipa: '/ˈfɜːðər rɪˈsɜːrʃ ɪz ˈniːdɪd/', meaning: 'Diperlukan penelitian lebih lanjut' },
      { word: 'The data suggests that', ipa: '/ðə ˈdeɪtə səˈdʒests ðæt/', meaning: 'Data menunjukkan bahwa' },
      { word: 'According to the findings', ipa: '/əˈkɔːrdɪŋ tuː ðə ˈfaɪndɪŋz/', meaning: 'Menurut temuan/hasil penelitian' },
      { word: 'This raises the question of', ipa: '/ðɪs reɪzɪz ðə ˈkwestʃən ɒv/', meaning: 'Ini menimbulkan pertanyaan tentang' },
      { word: 'Despite the limitations', ipa: '/dɪˈspaɪt ðə ˌlɪmɪˈteɪʃənz/', meaning: 'Terlepas dari keterbatasan' },
      { word: 'Broadly speaking', ipa: '/ˈbrɔːdli ˈspiːkɪŋ/', meaning: 'Secara umum / garis besar' },
    ]},
    quiz: [
      { q: 'A researcher\'s initial untested explanation is called a ___', opts: ['Dissertation', 'Hypothesis', 'Citation', 'Abstract'], ans: 'Hypothesis', exp: 'Hypothesis adalah pernyataan awal yang belum dibuktikan yang ingin diuji dalam penelitian.' },
      { q: 'When researchers test each other\'s work for accuracy, it is called ___', opts: ['Peer review', 'Correlation', 'Paradigm', 'Variable'], ans: 'Peer review', exp: 'Peer review adalah proses evaluasi karya ilmiah oleh para ahli di bidang yang sama.' },
      { q: 'To ___ means to combine information from multiple sources into one coherent whole.', opts: ['Contradict', 'Cite', 'Synthesise', 'Deduce'], ans: 'Synthesise', exp: 'To synthesise berarti mengintegrasikan informasi dari berbagai sumber menjadi satu kesimpulan yang kohesif.' },
      { q: 'The researcher used statistical tests to ___ a link between stress and illness.', opts: ['Substantiate', 'Propose', 'Abstract', 'Infer'], ans: 'Substantiate', exp: 'Substantiate berarti membuktikan atau mendukung klaim dengan bukti nyata.' },
      { q: '"___ the limitations, the study provided valuable insights." Choose the correct phrase.', opts: ['Based on evidence', 'Despite the limitations', 'According to the findings', 'Broadly speaking'], ans: 'Despite the limitations', exp: '"Despite the limitations" digunakan untuk mengakui kekurangan sekaligus menyatakan nilai positif.' },
      { q: 'A factor in a scientific experiment that can change is called a ___', opts: ['Citation', 'Variable', 'Peer review', 'Inference'], ans: 'Variable', exp: 'Variable adalah faktor atau elemen yang dapat berubah dalam sebuah percobaan ilmiah.' },
      { q: 'To ___ means to reach a logical conclusion from given information.', opts: ['Evaluate', 'Validate', 'Interpret', 'Deduce'], ans: 'Deduce', exp: 'To deduce berarti mengambil kesimpulan melalui penalaran logis dari fakta yang ada.' },
      { q: 'The phrase used to introduce a general summary is ___', opts: ['This raises the question of', 'It can be argued that', 'Broadly speaking', 'In contrast to'], ans: 'Broadly speaking', exp: '"Broadly speaking" digunakan untuk mengawali pernyataan umum atau gambaran besar.' },
      { q: 'A short summary at the beginning of a research paper is called an ___', opts: ['Abstract', 'Methodology', 'Correlation', 'Paradigm'], ans: 'Abstract', exp: 'An abstract adalah ringkasan singkat dari seluruh isi sebuah makalah atau karya tulis ilmiah.' },
      { q: 'To ___ data means to explain its meaning in context.', opts: ['Cite', 'Analyse', 'Interpret', 'Contradict'], ans: 'Interpret', exp: 'To interpret berarti memberikan penjelasan atas arti atau makna dari data atau informasi.' },
      { q: 'A ___ is a relationship between two variables but does not imply one causes the other.', opts: ['Hypothesis', 'Correlation', 'Inference', 'Dissertation'], ans: 'Correlation', exp: 'Correlation menunjukkan hubungan antara dua variabel, bukan sebab-akibat langsung.' },
      { q: 'To ___ a reference means to acknowledge the original author of information you use.', opts: ['Validate', 'Cite', 'Propose', 'Evaluate'], ans: 'Cite', exp: 'Citing a source (mengutip sumber) adalah praktik intelektual yang penting untuk menghindari plagiarisme.' },
      { q: 'The ___ of a research paper describes HOW the study was carried out.', opts: ['Abstract', 'Citation', 'Hypothesis', 'Methodology'], ans: 'Methodology', exp: 'Methodology (metodologi) mendeskripsikan pendekatan, teknik, dan proses yang digunakan dalam penelitian.' },
      { q: 'The phrase "___ suggests that" is used to introduce findings from ___', opts: ['Conclusions; opinion', 'The data; research', 'An abstract; books', 'A citation; interviews'], ans: 'The data; research', exp: '"The data suggests that..." adalah frasa baku untuk memperkenalkan temuan empiris dari data penelitian.' },
      { q: '"Further ___ is needed to confirm these results." Fill in the blank.', opts: ['evaluation', 'citation', 'research', 'hypothesis'], ans: 'research', exp: '"Further research is needed" adalah frasa penutup umum dalam penelitian yang menunjukkan area yang belum terjawab.' },
      { q: 'An existing dominant framework or worldview in a field is called a ___', opts: ['Paradigm', 'Variable', 'Correlation', 'Inference'], ans: 'Paradigm', exp: 'A paradigm (paradigma) adalah kerangka berpikir atau model utama yang mendominasi sebuah bidang ilmu.' },
      { q: 'To ___ something means to check and confirm that it is correct and accurate.', opts: ['Propose', 'Contradict', 'Analyse', 'Validate'], ans: 'Validate', exp: 'To validate berarti mengonfirmasi atau membuktikan keakuratan sesuatu melalui pengujian.' },
      { q: 'A long academic paper completed for a degree, especially a PhD, is called a ___', opts: ['Abstract', 'Dissertation', 'Peer review', 'Methodology'], ans: 'Dissertation', exp: 'A dissertation adalah karya tulis ilmiah panjang yang diselesaikan sebagai bagian dari program gelar akademik.' },
      { q: 'The phrase "___ to the findings, pollution is the primary cause" is best completed with ___', opts: ['In contrast', 'According', 'Based on evidence', 'This raises'], ans: 'According', exp: '"According to the findings" berarti "menurut temuan/hasil" – digunakan untuk merujuk pada data spesifik.' },
      { q: 'To ___ a statement means to show it is not true or conflicts with another statement.', opts: ['Evaluate', 'Synthesise', 'Deduce', 'Contradict'], ans: 'Contradict', exp: 'To contradict berarti menyatakan sesuatu yang bertentangan dengan klaim atau fakta yang lain.' },
    ]
  },
  {
    id: 2, title: 'Business & Finance', subtitle: 'Bahasa Inggris Bisnis & Keuangan',
    cat1: { name: 'Financial Terms', desc: 'Istilah keuangan penting di dunia bisnis.', color: 'green', items: [
      { word: 'Revenue', ipa: '/ˈrevɪnjuː/', meaning: 'Pendapatan total perusahaan' },
      { word: 'Expenditure', ipa: '/ɪkˈspendɪtʃə/', meaning: 'Pengeluaran / biaya' },
      { word: 'Deficit', ipa: '/ˈdefɪsɪt/', meaning: 'Defisit – pengeluaran melebihi pendapatan' },
      { word: 'Equity', ipa: '/ˈekwɪti/', meaning: 'Ekuitas – nilai kepemilikan aset' },
      { word: 'Liability', ipa: '/ˌlaɪəˈbɪlɪti/', meaning: 'Liabilitas – kewajiban/utang perusahaan' },
      { word: 'Dividend', ipa: '/ˈdɪvɪdend/', meaning: 'Dividen – pembagian keuntungan kepada pemegang saham' },
      { word: 'Inflation', ipa: '/ɪnˈfleɪʃən/', meaning: 'Inflasi – kenaikan harga umum' },
      { word: 'Interest rate', ipa: '/ˈɪntrəst reɪt/', meaning: 'Suku bunga – biaya meminjam uang' },
      { word: 'Portfolio', ipa: '/pɔːrtˈfoʊlioʊ/', meaning: 'Portofolio – kumpulan investasi' },
      { word: 'Commodities', ipa: '/kəˈmɒdɪtiz/', meaning: 'Komoditas – barang dagang primer (emas, minyak, dll)' },
    ]},
    cat2: { name: 'Business Actions', desc: 'Kata kerja konteks bisnis formal.', color: 'lime', items: [
      { word: 'Negotiate', ipa: '/nɪˈɡoʊʃieɪt/', meaning: 'Bernegosiasi untuk mencapai kesepakatan' },
      { word: 'Mitigate', ipa: '/ˈmɪtɪɡeɪt/', meaning: 'Mengurangi dampak negatif / risiko' },
      { word: 'Acquire', ipa: '/əˈkwaɪər/', meaning: 'Mengakuisisi – membeli perusahaan lain' },
      { word: 'Allocate', ipa: '/ˈæləkeɪt/', meaning: 'Mengalokasikan dana/sumber daya' },
      { word: 'Diversify', ipa: '/daɪˈvɜːrsɪfaɪ/', meaning: 'Mendiversifikasi – memperluas ke berbagai area' },
      { word: 'Forecast', ipa: '/ˈfɔːrkæst/', meaning: 'Memperkirakan hasil di masa depan' },
      { word: 'Outsource', ipa: '/ˈaʊtsɔːrs/', meaning: 'Menggunakan pihak ketiga untuk pekerjaan tertentu' },
      { word: 'Streamline', ipa: '/ˈstriːmlaɪn/', meaning: 'Memperlancar / mengefisienkan proses' },
      { word: 'Leverage', ipa: '/ˈlevərɪdʒ/', meaning: 'Memanfaatkan aset/posisi untuk keuntungan' },
      { word: 'Restructure', ipa: '/riːˈstrʌktʃər/', meaning: 'Merestrukturisasi organisasi atau utang' },
    ]},
    cat3: { name: 'Business Phrases', desc: 'Frasa formal dalam konteks bisnis internasional.', color: 'emerald', items: [
      { word: 'Bottom line', ipa: '/ˈbɒtəm laɪn/', meaning: 'Laba bersih / kesimpulan akhir' },
      { word: 'Blue-chip company', ipa: '/bluː tʃɪp ˈkʌmpəni/', meaning: 'Perusahaan besar dan terpercaya' },
      { word: 'Cash flow', ipa: '/kæʃ floʊ/', meaning: 'Arus kas – pergerakan uang masuk dan keluar' },
      { word: 'Break even', ipa: '/breɪk ˈiːvən/', meaning: 'Impas – tidak untung tidak rugi' },
      { word: 'Return on investment', ipa: '/rɪˈtɜːn ɒn ɪnˈvestmənt/', meaning: 'Keuntungan dari modal yang diinvestasikan (ROI)' },
      { word: 'Market share', ipa: '/ˈmɑːrkɪt ʃeər/', meaning: 'Pangsa pasar – persentase penjualan di pasar' },
      { word: 'Supply chain', ipa: '/səˈplaɪ tʃeɪn/', meaning: 'Rantai pasok – alur produksi hingga konsumen' },
      { word: 'Due diligence', ipa: '/djuː ˈdɪlɪdʒəns/', meaning: 'Uji tuntas – riset menyeluruh sebelum transaksi' },
      { word: 'Stakeholder', ipa: '/ˈsteɪkhoʊldər/', meaning: 'Pemangku kepentingan (pemegang saham, karyawan, dll)' },
      { word: 'Fiscal year', ipa: '/ˈfɪskəl jɪər/', meaning: 'Tahun fiskal – periode akuntansi resmi perusahaan' },
    ]},
    quiz: [
      { q: 'The total income generated by a company is called its ___', opts: ['Deficit', 'Revenue', 'Equity', 'Dividend'], ans: 'Revenue', exp: 'Revenue adalah total pendapatan yang diperoleh perusahaan dari aktivitas bisnisnya.' },
      { q: 'When a company spends more than it earns, it runs a ___', opts: ['Portfolio', 'Dividend', 'Deficit', 'Commodity'], ans: 'Deficit', exp: 'Deficit terjadi ketika pengeluaran melebihi pendapatan, menghasilkan kekurangan dana.' },
      { q: 'To ___ risks means to take actions to reduce their potential impact.', opts: ['Acquire', 'Mitigate', 'Leverage', 'Outsource'], ans: 'Mitigate', exp: 'To mitigate risk berarti mengambil langkah-langkah untuk mengurangi kemungkinan atau dampak risiko.' },
      { q: 'The ___ refers to the net profit - the final number on a financial statement.', opts: ['Market share', 'Blue-chip', 'Bottom line', 'Cash flow'], ans: 'Bottom line', exp: '"Bottom line" secara literal adalah baris terakhir laporan keuangan yang menunjukkan laba/rugi bersih.' },
      { q: 'Companies ___ their investments to spread risk across different assets.', opts: ['Restructure', 'Diversify', 'Allocate', 'Forecast'], ans: 'Diversify', exp: 'To diversify berarti menyebar investasi ke berbagai jenis aset untuk mengurangi risiko.' },
      { q: 'The point where income equals expenses is called ___', opts: ['Break even', 'Due diligence', 'Supply chain', 'Fiscal year'], ans: 'Break even', exp: 'Break even adalah titik impas di mana pendapatan sama persis dengan pengeluaran.' },
      { q: 'All the parties with an interest in a company are called ___', opts: ['Dividends', 'Commodities', 'Stakeholders', 'Liabilities'], ans: 'Stakeholders', exp: 'Stakeholders mencakup semua pihak yang memiliki kepentingan: pemegang saham, karyawan, pelanggan, pemerintah.' },
      { q: 'Thorough research conducted before a business deal is called ___', opts: ['Leverage', 'Due diligence', 'ROI', 'Cash flow'], ans: 'Due diligence', exp: 'Due diligence adalah proses investigasi menyeluruh sebelum penandatanganan kontrak atau akuisisi.' },
      { q: 'The ___ of a company refers to the chain from raw materials to the final customer.', opts: ['Market share', 'Fiscal year', 'Supply chain', 'Portfolio'], ans: 'Supply chain', exp: 'Supply chain mencakup semua proses dari produksi bahan baku hingga pengiriman ke konsumen akhir.' },
      { q: 'To ___ a business function means to hire an external company to do that work.', opts: ['Streamline', 'Outsource', 'Negotiate', 'Acquire'], ans: 'Outsource', exp: 'Outsourcing berarti mempekerjakan pihak ketiga untuk melakukan pekerjaan tertentu demi efisiensi biaya.' },
      { q: 'The money flowing in and out of a business is called ___', opts: ['Equity', 'Cash flow', 'Dividend', 'Blue-chip'], ans: 'Cash flow', exp: 'Cash flow (arus kas) adalah ukuran pergerakan uang masuk dan keluar dari sebuah bisnis.' },
      { q: 'To ___ means to formally buy another company.', opts: ['Leverage', 'Mitigate', 'Acquire', 'Forecast'], ans: 'Acquire', exp: 'To acquire berarti mengambil alih kepemilikan perusahaan lain melalui pembelian.' },
      { q: 'A company\'s percentage of total industry sales is its ___', opts: ['Equity', 'Market share', 'ROI', 'Inflation'], ans: 'Market share', exp: 'Market share adalah persentase penjualan perusahaan dibandingkan total penjualan industri.' },
      { q: 'Raw materials like oil, gold, and wheat are called ___', opts: ['Liabilities', 'Dividends', 'Interest rates', 'Commodities'], ans: 'Commodities', exp: 'Commodities adalah barang komoditas primer yang diperdagangkan di pasar internasional.' },
      { q: 'A company\'s official accounting period is called its ___', opts: ['Portfolio', 'Fiscal year', 'Equity', 'Deficit'], ans: 'Fiscal year', exp: 'Fiscal year adalah periode akuntansi resmi (12 bulan) yang tidak selalu sama dengan tahun kalender.' },
      { q: 'To ___ a process means to make it more efficient and less complicated.', opts: ['Restructure', 'Forecast', 'Allocate', 'Streamline'], ans: 'Streamline', exp: 'To streamline berarti menyederhanakan dan mengefisienkan proses sehingga lebih cepat dan murah.' },
      { q: 'The debts and financial obligations of a company are called its ___', opts: ['Revenues', 'Liabilities', 'Equities', 'Dividends'], ans: 'Liabilities', exp: 'Liabilities adalah semua kewajiban finansial perusahaan, termasuk utang dan pinjaman.' },
      { q: 'The profit earned for every dollar invested is called ___', opts: ['Return on investment', 'Break even', 'Cash flow', 'Market share'], ans: 'Return on investment', exp: 'ROI (Return on Investment) mengukur profitabilitas relatif dari setiap modal yang diinvestasikan.' },
      { q: 'A ___ company is a large, well-known company with a strong financial history.', opts: ['Bottom-line', 'Blue-chip', 'Supply chain', 'Stakeholder'], ans: 'Blue-chip', exp: 'Blue-chip company adalah perusahaan besar, mapan, dan terpercaya yang memiliki rekam jejak finansial kuat.' },
      { q: 'Money paid to shareholders from company profits are called ___', opts: ['Revenue', 'Equity', 'Dividends', 'Commodities'], ans: 'Dividends', exp: 'Dividends adalah pembayaran dari keuntungan perusahaan kepada para pemegang saham.' },
    ]
  },
  {
    id: 3, title: 'Environment & Sustainability', subtitle: 'Kosakata Lingkungan & Keberlanjutan',
    cat1: { name: 'Environmental Nouns', desc: 'Istilah utama dalam wacana lingkungan hidup global.', color: 'green', items: [
      { word: 'Carbon footprint', ipa: '/ˈkɑːrbən ˈfʊtprɪnt/', meaning: 'Jejak karbon – emisi CO2 total aktivitas seseorang' },
      { word: 'Biodiversity', ipa: '/ˌbaɪoʊdaɪˈvɜːrsɪti/', meaning: 'Keanekaragaman hayati' },
      { word: 'Deforestation', ipa: '/dɪˌfɒrɪˈsteɪʃən/', meaning: 'Penggundulan hutan' },
      { word: 'Greenhouse gas', ipa: '/ˈɡriːnhaʊs ɡæs/', meaning: 'Gas rumah kaca (CO2, metana, dll)' },
      { word: 'Renewable energy', ipa: '/rɪˈnjuːəbəl ˈenərdʒi/', meaning: 'Energi terbarukan (surya, angin, dll)' },
      { word: 'Ecosystem', ipa: '/ˈiːkoʊsɪstəm/', meaning: 'Ekosistem – komunitas makhluk hidup dan lingkungannya' },
      { word: 'Soil erosion', ipa: '/sɔɪl ɪˈroʊʒən/', meaning: 'Erosi tanah – hilangnya lapisan atas tanah' },
      { word: 'Fossil fuel', ipa: '/ˈfɒsəl fjuːəl/', meaning: 'Bahan bakar fosil (batu bara, minyak, gas alam)' },
      { word: 'Habitat loss', ipa: '/ˈhæbɪtæt lɒs/', meaning: 'Hilangnya habitat alami hewan dan tumbuhan' },
      { word: 'Carbon offset', ipa: '/ˈkɑːrbən ˈɒfset/', meaning: 'Kompensasi karbon – investasi untuk mengurangi emisi di tempat lain' },
    ]},
    cat2: { name: 'Environmental Verbs', desc: 'Kata kerja tindakan lingkungan yang penting.', color: 'lime', items: [
      { word: 'Conserve', ipa: '/kənˈsɜːrv/', meaning: 'Melestarikan / menghemat sumber daya' },
      { word: 'Contaminate', ipa: '/kənˈtæmɪneɪt/', meaning: 'Mencemari (air, tanah, udara)' },
      { word: 'Deplete', ipa: '/dɪˈpliːt/', meaning: 'Menguras / mengurangi secara besar-besaran' },
      { word: 'Emit', ipa: '/ɪˈmɪt/', meaning: 'Mengeluarkan / memancarkan (gas, panas)' },
      { word: 'Recycle', ipa: '/ˌriːˈsaɪkəl/', meaning: 'Mendaur ulang bahan untuk digunakan kembali' },
      { word: 'Restore', ipa: '/rɪˈstɔːr/', meaning: 'Memulihkan ekosistem yang rusak' },
      { word: 'Mitigate', ipa: '/ˈmɪtɪɡeɪt/', meaning: 'Mengurangi dampak negatif lingkungan' },
      { word: 'Pollute', ipa: '/pəˈluːt/', meaning: 'Mencemari lingkungan' },
      { word: 'Degrade', ipa: '/dɪˈɡreɪd/', meaning: 'Menurunkan kualitas lingkungan secara bertahap' },
      { word: 'Harness', ipa: '/ˈhɑːrnɪs/', meaning: 'Memanfaatkan (energi surya, angin, dll)' },
    ]},
    cat3: { name: 'Environmental Concepts', desc: 'Konsep penting dalam kebijakan dan gerakan lingkungan.', color: 'teal', items: [
      { word: 'Sustainable development', ipa: '/səˈsteɪnəbəl dɪˈveləpmənt/', meaning: 'Pembangunan berkelanjutan' },
      { word: 'Climate justice', ipa: '/ˈklaɪmɪt ˈdʒʌstɪs/', meaning: 'Keadilan iklim – pembagian beban perubahan iklim yang adil' },
      { word: 'Carbon neutral', ipa: '/ˈkɑːrbən ˈnjuːtrəl/', meaning: 'Netral karbon – tidak menambah emisi bersih' },
      { word: 'Circular economy', ipa: '/ˈsɜːrkyələr ɪˈkɒnəmi/', meaning: 'Ekonomi sirkular – tanpa limbah, semua didaur ulang' },
      { word: 'Greenwashing', ipa: '/ˈɡriːnwɒʃɪŋ/', meaning: 'Greenwashing – klaim ramah lingkungan yang menyesatkan' },
      { word: 'Tipping point', ipa: '/ˈtɪpɪŋ pɔɪnt/', meaning: 'Titik kritis – ambang batas perubahan iklim yang tidak dapat dipulihkan' },
      { word: 'Net zero', ipa: '/net ˈzɪəroʊ/', meaning: 'Net zero – target menghilangkan total emisi karbon bersih' },
      { word: 'Biodegradable', ipa: '/ˌbaɪoʊdɪˈɡreɪdəbəl/', meaning: 'Dapat terurai secara biologis' },
      { word: 'Ecological footprint', ipa: '/ˌiːkəˈlɒdʒɪkəl ˈfʊtprɪnt/', meaning: 'Jejak ekologis – total sumber daya alam yang dikonsumsi' },
      { word: 'Anthropogenic', ipa: '/ˌænθrəpəˈdʒenɪk/', meaning: 'Disebabkan oleh aktivitas manusia' },
    ]},
    quiz: [
      { q: 'CO2 released from your daily activities is called your ___', opts: ['Ecosystem', 'Carbon footprint', 'Biodiversity', 'Net zero'], ans: 'Carbon footprint', exp: 'Carbon footprint adalah total emisi gas rumah kaca yang dihasilkan oleh aktivitas seseorang atau organisasi.' },
      { q: 'To ___ the ozone layer means to reduce or use it up significantly.', opts: ['Emit', 'Conserve', 'Deplete', 'Restore'], ans: 'Deplete', exp: 'To deplete berarti menguras atau mengurangi sesuatu secara signifikan, seperti lapisan ozon.' },
      { q: 'Energy from sources like wind and solar that will not run out is called ___', opts: ['Fossil fuel', 'Greenhouse gas', 'Renewable energy', 'Carbon offset'], ans: 'Renewable energy', exp: 'Renewable energy berasal dari sumber-sumber alam yang dapat diperbaharui dan tidak habis.' },
      { q: 'A company claiming to be eco-friendly without evidence is called ___', opts: ['Carbon neutral', 'Greenwashing', 'Net zero', 'Tipping point'], ans: 'Greenwashing', exp: 'Greenwashing adalah praktik menyesatkan konsumen tentang komitmen lingkungan perusahaan.' },
      { q: 'The goal of having no net carbon emissions is called ___', opts: ['Circular economy', 'Carbon offset', 'Net zero', 'Ecological footprint'], ans: 'Net zero', exp: 'Net zero adalah komitmen untuk menyeimbangkan emisi yang dihasilkan dengan emisi yang dihapus.' },
      { q: 'An economy where waste is eliminated and resources are reused is called ___', opts: ['Sustainable development', 'Fossil fuel', 'Circular economy', 'Climate justice'], ans: 'Circular economy', exp: 'Circular economy adalah model ekonomi yang menghilangkan limbah dan memaksimalkan penggunaan ulang sumber daya.' },
      { q: 'The wide variety of plant and animal species in an area is called ___', opts: ['Ecosystem', 'Biodiversity', 'Habitat loss', 'Deforestation'], ans: 'Biodiversity', exp: 'Biodiversity mengacu pada keanekaragaman semua kehidupan di suatu daerah atau planet.' },
      { q: 'Chemicals released into the environment by factories ___ the water supply.', opts: ['Restore', 'Harness', 'Contaminate', 'Recycle'], ans: 'Contaminate', exp: 'To contaminate berarti memasukkan zat berbahaya ke lingkungan, menjadikannya tidak aman.' },
      { q: 'Climate change caused by human activity is described as ___', opts: ['Ecological', 'Biodegradable', 'Anthropogenic', 'Circular'], ans: 'Anthropogenic', exp: 'Anthropogenic berarti disebabkan atau dipengaruhi oleh aktivitas manusia.' },
      { q: 'A material that can naturally decompose is called ___', opts: ['Carbon neutral', 'Biodegradable', 'Renewable', 'Tipping point'], ans: 'Biodegradable', exp: 'Biodegradable materials dapat terurai secara alami oleh organisme biologis.' },
      { q: 'The critical threshold beyond which changes become irreversible is the ___', opts: ['Net zero', 'Greenwashing', 'Tipping point', 'Carbon offset'], ans: 'Tipping point', exp: 'Tipping point adalah batas kritis di mana perubahan iklim menjadi tidak dapat dikembalikan ke kondisi semula.' },
      { q: 'To ___ solar energy means to capture and use it effectively.', opts: ['Emit', 'Deplete', 'Pollute', 'Harness'], ans: 'Harness', exp: 'To harness energy berarti menangkap dan mengubah sumber daya alam menjadi bentuk energi yang dapat digunakan.' },
      { q: 'The cutting down of large areas of forest is called ___', opts: ['Soil erosion', 'Deforestation', 'Habitat loss', 'Ecosystem'], ans: 'Deforestation', exp: 'Deforestation adalah penebangan hutan secara besar-besaran, seringkali untuk pertanian atau pembangunan.' },
      { q: 'To ___ a damaged ecosystem means to bring it back to its original state.', opts: ['Degrade', 'Conserve', 'Restore', 'Distribute'], ans: 'Restore', exp: 'To restore an ecosystem berarti memulihkannya dari kerusakan menuju kondisi yang lebih sehat dan alami.' },
      { q: 'Development that meets present needs without compromising future generations is called ___', opts: ['Climate justice', 'Net zero', 'Sustainable development', 'Circular economy'], ans: 'Sustainable development', exp: 'Sustainable development memenuhi kebutuhan saat ini tanpa mengorbankan kemampuan generasi mendatang.' },
      { q: 'The community of living things and their environment is called an ___', opts: ['Fossil fuel', 'Ecosystem', 'Carbon footprint', 'Biodiversity'], ans: 'Ecosystem', exp: 'Ecosystem adalah sistem yang terdiri dari semua organisme hidup beserta lingkungan fisik tempat mereka tinggal.' },
      { q: 'Buying carbon offsets means paying to ___ emissions you create elsewhere.', opts: ['Increase', 'Match', 'Compensate for', 'Emit'], ans: 'Compensate for', exp: 'Carbon offset berarti membayar untuk proyek lingkungan yang mengurangi emisi setara dengan yang Anda hasilkan.' },
      { q: 'Which phrase means "impartial distribution of climate change burdens and benefits"?', opts: ['Carbon neutral', 'Greenwashing', 'Climate justice', 'Net zero'], ans: 'Climate justice', exp: 'Climate justice menyerukan pembagian yang adil atas beban perubahan iklim, terutama antara negara kaya dan miskin.' },
      { q: 'Gases like CO2 and methane that trap heat in the atmosphere are called ___', opts: ['Fossil fuels', 'Carbon offsets', 'Greenhouse gases', 'Renewable energy'], ans: 'Greenhouse gases', exp: 'Greenhouse gases adalah gas yang memerangkap panas di atmosfer, menyebabkan pemanasan global.' },
      { q: 'The total natural resources consumed by a person or country is called their ___', opts: ['Carbon footprint', 'Ecological footprint', 'Net zero', 'Biodiversity'], ans: 'Ecological footprint', exp: 'Ecological footprint mengukur seluruh sumber daya alam yang dibutuhkan untuk mendukung gaya hidup seseorang.' },
    ]
  },
];

// ─── Quick fallback template for lessons 4-20 ────────────────────────────────
const LESSON_META = [
  { id: 4, title: 'Technology & Innovation', subtitle: 'Inovasi & Teknologi Digital', theme: 'indigo' },
  { id: 5, title: 'Health & Medicine', subtitle: 'Kesehatan & Kedokteran Modern', theme: 'rose' },
  { id: 6, title: 'Politics & Society', subtitle: 'Politik & Kehidupan Bermasyarakat', theme: 'purple' },
  { id: 7, title: 'Arts & Culture', subtitle: 'Seni, Budaya & Ekspresi Diri', theme: 'amber' },
  { id: 8, title: 'Philosophy & Ethics', subtitle: 'Filsafat & Dilema Etika', theme: 'violet' },
  { id: 9, title: 'Science & Discovery', subtitle: 'Ilmu Pengetahuan & Penemuan Baru', theme: 'sky' },
  { id: 10, title: 'Media & Communication', subtitle: 'Media, Jurnalisme & Komunikasi Modern', theme: 'cyan' },
  { id: 11, title: 'Law & Justice', subtitle: 'Hukum, Keadilan & Sistem Peradilan', theme: 'slate' },
  { id: 12, title: 'Psychology & Behavior', subtitle: 'Psikologi & Perilaku Manusia', theme: 'pink' },
  { id: 13, title: 'Travel & Globalization', subtitle: 'Perjalanan & Globalisasi Dunia', theme: 'teal' },
  { id: 14, title: 'Urban Life & Infrastructure', subtitle: 'Kehidupan Kota & Infrastruktur', theme: 'gray' },
  { id: 15, title: 'Education Systems', subtitle: 'Sistem Pendidikan Dunia', theme: 'blue' },
  { id: 16, title: 'Food Industry & Nutrition', subtitle: 'Industri Pangan & Gizi', theme: 'orange' },
  { id: 17, title: 'Sports & Performance', subtitle: 'Olahraga, Kompetisi & Performa Atletik', theme: 'green' },
  { id: 18, title: 'Relationships & Society', subtitle: 'Hubungan Sosial & Dinamika Masyarakat', theme: 'rose' },
  { id: 19, title: 'Literature & Language', subtitle: 'Kesusastraan & Linguistik Terapan', theme: 'purple' },
  { id: 20, title: 'Future & AI Technology', subtitle: 'Masa Depan & Kecerdasan Buatan', theme: 'blue' },
];

// Generic fallback vocab items
const FALLBACK_ITEMS = (tema) => [
  { word: 'Innovate', ipa: '/ˈɪnəveɪt/', meaning: 'Berinovasi – memperkenalkan perubahan baru' },
  { word: 'Perspective', ipa: '/pərˈspektɪv/', meaning: 'Perspektif – sudut pandang tertentu' },
  { word: 'Implication', ipa: '/ˌɪmplɪˈkeɪʃən/', meaning: 'Implikasi – konsekuensi tidak langsung' },
  { word: 'Controversy', ipa: '/ˈkɒntrəvɜːrsi/', meaning: 'Kontroversi – perdebatan publik yang serius' },
  { word: 'Implement', ipa: '/ˈɪmplɪment/', meaning: 'Mengimplementasikan – menerapkan rencana' },
  { word: 'Acknowledge', ipa: '/əkˈnɒlɪdʒ/', meaning: 'Mengakui / mengakui keberadaan sesuatu' },
  { word: 'Substantial', ipa: '/səbˈstænʃəl/', meaning: 'Substansial – besar atau penting secara signifikan' },
  { word: 'Navigate', ipa: '/ˈnævɪɡeɪt/', meaning: 'Menavigasi – menemukan jalan melalui suatu situasi' },
  { word: 'Advocate', ipa: '/ˈædvəkeɪt/', meaning: 'Mengadvokasi – mendukung secara aktif sebuah cause' },
  { word: 'Emerge', ipa: '/ɪˈmɜːrdʒ/', meaning: 'Muncul – menjadi terlihat atau dikenal' },
];

const FALLBACK_QUIZ = (title) => [
  { q: `Which word best describes introducing a new idea in the field of ${title}?`, opts: ['Innovate', 'Navigate', 'Acknowledge', 'Emerge'], ans: 'Innovate', exp: 'To innovate berarti memperkenalkan ide, metode, atau produk baru yang mengubah cara sesuatu dilakukan.' },
  { q: 'A point of view or way of thinking is called a ___', opts: ['Perspective', 'Controversy', 'Implication', 'Advocate'], ans: 'Perspective', exp: 'Perspective adalah cara melihat atau memaknai sesuatu berdasarkan sudut pandang tertentu.' },
  { q: 'The indirect consequence of an action is its ___', opts: ['Implement', 'Substantial', 'Implication', 'Navigate'], ans: 'Implication', exp: 'Implication adalah efek atau konsekuensi tidak langsung dari suatu tindakan atau pernyataan.' },
  { q: 'A public debate where people strongly disagree is called a ___', opts: ['Controversy', 'Perspective', 'Implementation', 'Emergence'], ans: 'Controversy', exp: 'Controversy adalah perdebatan atau perselisihan publik yang hangat dan seringkali berlangsung lama.' },
  { q: 'To put a plan or policy into action is to ___ it.', opts: ['Acknowledge', 'Advocate', 'Navigate', 'Implement'], ans: 'Implement', exp: 'To implement berarti menerapkan atau melaksanakan suatu rencana, kebijakan, atau sistem.' },
  { q: 'To admit or recognize something officially is to ___ it.', opts: ['Emerge', 'Acknowledge', 'Innovate', 'Implement'], ans: 'Acknowledge', exp: 'To acknowledge berarti mengakui atau mengakui secara resmi keberadaan atau kebenaran sesuatu.' },
  { q: 'A ___ amount is one that is large and significant.', opts: ['Potential', 'Controversial', 'Substantial', 'Emerging'], ans: 'Substantial', exp: 'Substantial berarti besar, signifikan, atau cukup penting untuk diperhatikan.' },
  { q: 'To ___ a complex situation means to successfully manage your way through it.', opts: ['Emerge', 'Advocate', 'Navigate', 'Innovate'], ans: 'Navigate', exp: 'To navigate berarti menemukan cara untuk melewati situasi yang kompleks atau sulit.' },
  { q: 'Someone who publicly supports a cause is called an ___', opts: ['Innovator', 'Advocate', 'Perspective', 'Enabler'], ans: 'Advocate', exp: 'An advocate adalah orang yang secara aktif mendukung atau membela sebuah cause atauide.' },
  { q: 'When a new trend ___ it becomes gradually visible in society.', opts: ['Innovates', 'Navigates', 'Emerges', 'Implements'], ans: 'Emerges', exp: 'To emerge berarti muncul atau menjadi terlihat secara bertahap, seringkali dari situasi tersembunyi.' },
  { q: 'The act of putting a strategy into practice is called its ___', opts: ['Innovation', 'Implication', 'Implementation', 'Controversy'], ans: 'Implementation', exp: 'Implementation adalah proses penerapan nyata dari rencana, kebijakan, atau sistem.' },
  { q: 'To look at a problem from a different ___ can reveal new solutions.', opts: ['Implication', 'Advocacy', 'Perspective', 'Innovation'], ans: 'Perspective', exp: 'Perspective berbeda berarti melihat masalah dari sudut pandang yang berbeda untuk mendapatkan solusi baru.' },
  { q: 'Which adjective describes something that is significant and important in size or scale?', opts: ['Emerging', 'Substantial', 'Controversial', 'Innovative'], ans: 'Substantial', exp: 'Substantial digunakan untuk menggambarkan sesuatu yang besar, bermakna, atau signifikan.' },
  { q: 'New technologies ___ from scientific research constantly.', opts: ['Advocate', 'Navigate', 'Innovate', 'Emerge'], ans: 'Emerge', exp: 'Teknologi baru emerge (muncul) dari penelitian ilmiah secara terus-menerus.' },
  { q: 'The ___ of a new policy on society must be carefully considered.', opts: ['Innovation', 'Controversy', 'Implications', 'Navigation'], ans: 'Implications', exp: 'Implications of a policy adalah dampak atau konsekuensi tidak langsung yang perlu dianalisis.' },
  { q: 'To ___ a cause means to speak in its defense publicly.', opts: ['Implement', 'Acknowledge', 'Navigate', 'Advocate'], ans: 'Advocate', exp: 'To advocate for something berarti berbicara atau bertindak mendukung sebuah tujuan atau cause.' },
  { q: 'A solution that is creative and uses new methods is called ___', opts: ['Substantial', 'Controversial', 'Innovative', 'Navigable'], ans: 'Innovative', exp: 'Innovative berarti menggunakan pendekatan atau ide baru yang kreatif dan berbeda dari yang sudah ada.' },
  { q: 'Accepting and admitting mistakes is important for ___', opts: ['Navigation', 'Controversy', 'Acknowledgement', 'Innovation'], ans: 'Acknowledgement', exp: 'Acknowledgement of mistakes berarti pengakuan resmi atas kesalahan, penting untuk kepercayaan dan integritas.' },
  { q: 'The new policy promised to ___ a national digital education programme.', opts: ['Acknowledge', 'Navigate', 'Emerge', 'Implement'], ans: 'Implement', exp: 'To implement a programme berarti menerapkan dan menjalankan program tersebut secara aktif.' },
  { q: 'An issue that causes strong public disagreement is described as ___', opts: ['Substantial', 'Innovative', 'Controversial', 'Navigable'], ans: 'Controversial', exp: 'Controversial mendeskripsikan topik atau isu yang memancing perdebatan kuat dan perbedaan pendapat.' },
];

function buildFile(id, spec) {
  const nextId = id < 20 ? id + 1 : null;
  const nextPath = nextId ? '/modul/english/upper-intermediate/vocabulary/lesson-' + nextId : '/modul/english/upper-intermediate/vocabulary';
  const cat1 = spec.cat1 || { name: 'Kosakata Utama', desc: 'Istilah kunci topik ini.', color: 'teal', items: FALLBACK_ITEMS(spec.title).slice(0,10) };
  const cat2 = spec.cat2 || { name: 'Kata Kerja Penting', desc: 'Verba aktif di topik ini.', color: 'emerald', items: FALLBACK_ITEMS(spec.title).reverse().slice(0,10) };
  const cat3 = spec.cat3 || { name: 'Frasa & Ekspresi', desc: 'Kolokasi dan ekspresi tingkat lanjut.', color: 'cyan', items: FALLBACK_ITEMS(spec.title).slice(0,10) };
  const quiz = spec.quiz || FALLBACK_QUIZ(spec.title);

  const cat1Data = JSON.stringify(cat1.items, null, 2);
  const cat2Data = JSON.stringify(cat2.items, null, 2);
  const cat3Data = JSON.stringify(cat3.items, null, 2);
  const quizData = JSON.stringify(quiz, null, 2);

  return `import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LessonShell from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Volume2, Sparkles, Star, Lightbulb } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

interface VocabItem { word: string; ipa: string; meaning: string; }
interface QuizItem { q: string; opts: string[]; ans: string; exp: string; }

const CAT1: VocabItem[] = ${cat1Data};
const CAT2: VocabItem[] = ${cat2Data};
const CAT3: VocabItem[] = ${cat3Data};
const QUIZ: QuizItem[] = ${quizData};

const UpperInterVocabLesson${id}: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('upper_intermediate_vocabulary', ${id});
  const nextLessonPath = '${nextPath}';

  const [activeSection, setActiveSection] = useState<'cat1'|'cat2'|'cat3'>('cat1');
  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string|null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  const playSound = (text: string) => { playAudio(text, 0.9); };

  const handleCheckQuiz = (option: string) => {
    if (isAnswerChecked) return;
    setSelectedOption(option);
    setIsAnswerChecked(true);
    if (option === QUIZ[quizStep].ans) { setQuizScore(p => p + 1); playSound('Correct!'); }
    else { playSound('Incorrect.'); }
  };

  const nextQuestion = () => {
    if (quizStep < QUIZ.length - 1) { setQuizStep(p => p + 1); setSelectedOption(null); setIsAnswerChecked(false); }
    else { setShowResult(true); }
  };

  const restartQuiz = () => { setQuizStep(0); setQuizScore(0); setShowResult(false); setSelectedOption(null); setIsAnswerChecked(false); };

  const SECTIONS = { cat1: CAT1, cat2: CAT2, cat3: CAT3 };
  const LABELS = { cat1: '${cat1.name}', cat2: '${cat2.name}', cat3: '${cat3.name}' };
  const DESCS = { cat1: '${cat1.desc}', cat2: '${cat2.desc}', cat3: '${cat3.desc}' };

  return (
    <>
      <LessonCompleteModal
        show={showCompleteModal}
        onClose={() => setShowCompleteModal(false)}
        lessonLabel="Upper-Intermediate Vocabulary Lesson ${id}"
        accentColor="${ACCENT_COLOR}"
        nextLessonPath={nextLessonPath}
        onNext={() => { setShowCompleteModal(false); navigate(nextLessonPath); }}
        onBack={() => { setShowCompleteModal(false); navigate(-1); }}
      />
      <LessonShell
        title="${spec.title}"
        subtitle="Vocabulary B2 • Pelajaran ${id}"
        accentColor="${ACCENT_COLOR}"
        nextLesson={nextLessonPath}
        tabs={[
          { id: 'learn', label: 'Pelajari', icon: <BookOpen size={14} /> },
          { id: 'practice', label: 'Latihan', icon: <PenTool size={14} /> }
        ]}
        footer={() => (
          <button
            onClick={isCompleted ? () => navigate(-1) : handleSelesai}
            className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg transition-all hover:opacity-90 active:scale-[0.98]"
            style={{ background: isCompleted ? 'linear-gradient(135deg,#26C76D,#1ea85a)' : 'linear-gradient(135deg,${ACCENT_COLOR},${ACCENT_COLOR}cc)' }}
          >
            <CheckCircle2 size={18} />
            {isCompleted ? 'Sudah Selesai ✓' : 'Selesai & Simpan Progress'}
          </button>
        )}
      >
        {(tabId) => {
          if (tabId === 'learn') return (
            <div className="space-y-6 animate-fade-in p-4">
              <div className="rounded-3xl p-6 text-white relative overflow-hidden shadow-xl" style={{ background: 'linear-gradient(135deg,${ACCENT_COLOR},#0E5A4F)' }}>
                <div className="text-3xl mb-2">📚</div>
                <h2 className="text-xl font-extrabold mb-1">${spec.title}</h2>
                <p className="text-sm opacity-90">${spec.subtitle}</p>
                <div className="mt-3 inline-block bg-white/20 px-3 py-1 rounded-full text-xs font-bold">🎯 CEFR B2 · 30 Kosakata</div>
              </div>

              <div className="flex gap-2 flex-wrap">
                {(['cat1','cat2','cat3'] as const).map(k => (
                  <button key={k} onClick={() => setActiveSection(k)}
                    className={'px-4 py-2 rounded-full text-xs font-bold transition-all ' + (activeSection === k ? 'text-white shadow-md' : 'bg-white text-slate-500 border border-slate-200')}
                    style={activeSection === k ? {backgroundColor:'${ACCENT_COLOR}'} : {}}>
                    {LABELS[k]}
                  </button>
                ))}
              </div>

              <div className="bg-teal-50 p-4 rounded-2xl border border-teal-100 flex items-center gap-3 mb-2">
                <Sparkles className="w-5 h-5 text-teal-600 shrink-0" />
                <p className="text-sm text-teal-800 font-medium">{DESCS[activeSection]}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {SECTIONS[activeSection].map((item, i) => (
                  <button key={i} onClick={() => playSound(item.word)}
                    className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-teal-300 hover:shadow-md transition-all active:scale-95 text-left">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-xs shrink-0">{i+1}</div>
                      <div>
                        <p className="font-bold text-slate-800">{item.word}</p>
                        <p className="text-xs text-slate-400 font-mono mb-0.5">{item.ipa}</p>
                        <p className="text-xs text-slate-500 italic">{item.meaning}</p>
                      </div>
                    </div>
                    <Volume2 className="w-4 h-4 text-slate-300 group-hover:text-teal-500 shrink-0" />
                  </button>
                ))}
              </div>

              <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100 mt-4">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-5 h-5 text-amber-500" />
                  <h3 className="font-bold text-amber-800 text-sm">💡 Tips B2</h3>
                </div>
                <p className="text-sm text-slate-700">Gunakan kosakata level ini dalam konteks formal: laporan, presentasi, dan esai akademik. Semakin sering dipraktikkan dalam kalimat nyata, semakin cepat terkuasai!</p>
              </div>
            </div>
          );

          if (tabId === 'practice') return (
            <div className="p-4 animate-fade-in">
              <div className="max-w-xl mx-auto">
                {!showResult ? (
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-teal-100">
                    <div className="flex justify-between items-center mb-5">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Soal {quizStep+1} / {QUIZ.length}</span>
                      <span className="text-xs font-bold bg-teal-50 text-teal-600 px-3 py-1 rounded-full">Skor: {quizScore}</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 mb-6">
                      <div className="h-1.5 rounded-full transition-all" style={{width: ((quizStep/(QUIZ.length-1))*100)+'%', backgroundColor:'${ACCENT_COLOR}'}}></div>
                    </div>
                    <h3 className="text-base font-bold text-slate-800 mb-5">{QUIZ[quizStep].q}</h3>
                    <div className="space-y-3">
                      {QUIZ[quizStep].opts.map((opt, i) => {
                        let cls = 'border-slate-200 hover:border-teal-300 hover:bg-teal-50';
                        if (isAnswerChecked) {
                          if (opt === QUIZ[quizStep].ans) cls = 'bg-green-50 border-green-500 text-green-800';
                          else if (opt === selectedOption) cls = 'bg-red-50 border-red-400 text-red-700';
                          else cls = 'opacity-40 border-slate-200';
                        }
                        return (
                          <button key={i} onClick={() => handleCheckQuiz(opt)} disabled={isAnswerChecked}
                            className={'w-full p-4 rounded-xl border-2 text-left font-medium transition-all flex items-center justify-between ' + cls}>
                            <span>{opt}</span>
                            {isAnswerChecked && opt === QUIZ[quizStep].ans && <CheckCircle2 size={18} className="text-green-600" />}
                            {isAnswerChecked && opt === selectedOption && opt !== QUIZ[quizStep].ans && <XCircle size={18} className="text-red-500" />}
                          </button>
                        );
                      })}
                    </div>
                    {isAnswerChecked && (
                      <div className="mt-5">
                        <div className={'p-3 rounded-xl text-sm mb-4 ' + (selectedOption === QUIZ[quizStep].ans ? 'bg-green-50 text-green-800 border border-green-100' : 'bg-orange-50 text-orange-800 border border-orange-100')}>
                          <strong>{selectedOption === QUIZ[quizStep].ans ? '✅ Tepat!' : '❌ Belum tepat.'}</strong> {QUIZ[quizStep].exp}
                        </div>
                        <button onClick={nextQuestion} className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all">
                          {quizStep < QUIZ.length-1 ? 'Lanjut →' : 'Lihat Skor Akhir'}
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Star className="w-10 h-10 text-yellow-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Kuis Selesai!</h2>
                    <p className="text-slate-500 mb-2">Skor kamu: <strong className="text-teal-600 text-xl">{quizScore}</strong> / {QUIZ.length}</p>
                    <p className="text-sm text-slate-400 mb-8">{quizScore >= 16 ? '🎉 Luar biasa! Kosakata B2 kamu sangat kuat.' : quizScore >= 10 ? '👍 Bagus! Terus berlatih.' : '💪 Jangan menyerah, coba lagi!'}</p>
                    <button onClick={restartQuiz} className="px-8 py-3 text-white rounded-xl font-bold transition-all" style={{backgroundColor:'${ACCENT_COLOR}'}}>Ulangi Kuis</button>
                  </div>
                )}
              </div>
            </div>
          );

          return null;
        }}
      </LessonShell>
    </>
  );
};

export default UpperInterVocabLesson${id};
`;
}

console.log('Building Upper-Intermediate Vocabulary (B2) lessons...');
for (let id = 1; id <= 20; id++) {
  let spec = LESSONS.find(l => l.id === id);
  if (!spec) {
    const meta = LESSON_META.find(m => m.id === id);
    spec = { id, ...meta, quiz: FALLBACK_QUIZ(meta.title) };
  }
  const code = buildFile(id, spec);
  fs.writeFileSync(path.join(OUT_DIR, `Lesson${id}.tsx`), code, 'utf8');
  console.log(`✅ Vocabulary Lesson${id}.tsx`);
}
console.log('🚀 All 20 Upper-Intermediate Vocabulary lessons built!');
