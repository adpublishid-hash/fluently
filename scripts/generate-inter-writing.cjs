
// generate-inter-writing.cjs
// Generates Intermediate Writing lessons 1-20 for Talky
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '../src/pages/module/english/intermediate/writing');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

// ── Lesson data (20 lessons, CEFR B1 Writing focus) ──────────────────────────
const LESSONS = [
  {
    id: 1,
    title: 'My Hometown',
    subtitle: 'Describing familiar places',
    topic: 'hometown',
    heroEmoji: '🏙️',
    heroDesc: 'Belajar menulis teks deskriptif tentang tempat yang kamu kenal dengan baik.',
    sampleTitle: '✍️ My Hometown – Bandung',
    sample: `I come from Bandung, a city in West Java, Indonesia. It is also known as the "Paris of Java" because of its cool weather and beautiful landscape. Bandung is surrounded by mountains, which makes it one of the most scenic cities in Indonesia.

There are many interesting places to visit in Bandung. Dago is a popular area full of cafes, restaurants, and art galleries. Another famous spot is the Tangkuban Perahu volcano, where visitors can see an active crater. The city is also well-known for its factory outlets and fashion district, which attract many tourists every weekend.

The people of Bandung are very friendly and creative. The city has a strong arts and music scene. Many musicians, designers, and young entrepreneurs come from here. I am proud to be from Bandung and I always enjoy coming back to visit.`,
    comprehension: [
      { q: 'Apa julukan kota Bandung?', opts: ['City of Heroes', 'Paris of Java', 'City of Flowers', 'Gateway of Java'], ans: 'Paris of Java' },
      { q: 'Mengapa Bandung disebut dengan julukan tersebut?', opts: ['Karena banyak fashion', 'Karena cuaca sejuk dan pemandangan indah', 'Karena banyak musisi', 'Karena dekat laut'], ans: 'Karena cuaca sejuk dan pemandangan indah' },
      { q: 'Apa yang terkenal dari kawasan Dago?', opts: ['Kawah Gunung', 'Pabrik tekstil', 'Kafe, restoran, dan galeri seni', 'Pantai'], ans: 'Kafe, restoran, dan galeri seni' },
      { q: 'Apa Tangkuban Perahu itu?', opts: ['Sebuah danau', 'Sebuah gunung berapi aktif', 'Sebuah pantai', 'Sebuah museum'], ans: 'Sebuah gunung berapi aktif' },
      { q: 'Apa yang membuat Bandung terkenal di bidang fashion?', opts: ['Pusat belanja modern', 'Factory outlet dan kawasan fashion', 'Mall internasional', 'Pasar tradisional'], ans: 'Factory outlet dan kawasan fashion' },
    ],
    quiz: [
      { q: 'What does the writer use to START the first paragraph?', opts: ['A question', 'A personal statement about origin', 'A famous quote', 'A surprising fact'], ans: 'A personal statement about origin', exp: 'Penulis memulai dengan "I come from Bandung..." – pernyataan personal yang langsung memperkenalkan topik.' },
      { q: 'What is the writing style of this text?', opts: ['Narrative', 'Argumentative', 'Descriptive', 'Procedural'], ans: 'Descriptive', exp: 'Teks ini bersifat deskriptif – menggambarkan sebuah tempat dengan detail karakteristiknya.' },
      { q: 'Which sentence is a TOPIC SENTENCE of the second paragraph?', opts: ['I come from Bandung...', 'There are many interesting places to visit in Bandung.', 'The people of Bandung are friendly.', 'I am proud to be from Bandung.'], ans: 'There are many interesting places to visit in Bandung.', exp: 'Topic sentence adalah kalimat utama yang memperkenalkan isi paragraf. Kalimat ini diikuti oleh contoh-contoh tempat.' },
      { q: 'What is the purpose of the LAST paragraph?', opts: ['To introduce the city', 'To list tourist spots', 'To describe the people and give a personal closing statement', 'To talk about food'], ans: 'To describe the people and give a personal closing statement', exp: 'Paragraf terakhir mendeskripsikan karakter masyarakat Bandung dan diakhiri dengan kesan pribadi penulis.' },
      { q: 'Which of these is a SUPPORTING DETAIL in the second paragraph?', opts: ['Bandung is in West Java', 'Dago area is full of cafes and galleries', 'People are creative', 'The writer feels proud'], ans: 'Dago area is full of cafes and galleries', exp: 'Supporting details adalah rincian yang mendukung topic sentence. Dago adalah contoh tempat menarik di Bandung.' },
      { q: 'What phrase shows the writer\'s PERSONAL OPINION?', opts: ['It is also known as...', 'There are many interesting places', 'I am proud to be from Bandung', 'The city is well-known for'], ans: 'I am proud to be from Bandung', exp: '"I am proud to be from Bandung" adalah ekspresi pendapat/perasaan pribadi – ciri khas teks personal.' },
      { q: 'Choose the CORRECT use of "which" in formal writing:', opts: ['"Bandung which is a city..." (no comma)', '"Bandung, which makes it scenic" ✓', '"Bandung, which but has mountains"', '"Bandung that, which..."'], ans: '"Bandung, which makes it scenic" ✓', exp: 'Relative clause non-restriktif menggunakan koma + "which" untuk menambahkan info ekstra tentang subjek.' },
      { q: 'What is the function of "Another famous spot is the Tangkuban Perahu volcano"?', opts: ['Topic sentence', 'Transition to a new topic', 'Supporting detail', 'Concluding sentence'], ans: 'Supporting detail', exp: 'Kalimat ini memberikan contoh kedua dari tempat menarik di Bandung, sehingga fungsinya adalah supporting detail.' },
      { q: 'Which word signals ADDITION of information?', opts: ['However', 'Therefore', 'Also', 'Although'], ans: 'Also', exp: '"Also" adalah kata penghubung penambahan (addition). Digunakan untuk menambah poin baru yang sejalan dengan sebelumnya.' },
      { q: 'How many paragraphs does a typical descriptive text about a place have?', opts: ['1', '2', '3 or more', '10+'], ans: '3 or more', exp: 'Teks deskriptif yang baik memiliki minimal 3 paragraf: pengantar, isi (detail), dan penutup/kesan pribadi.' },
      { q: 'What does "scenic" mean?', opts: ['Ramai', 'Bising', 'Indah secara visual / pemandangan indah', 'Berbahaya'], ans: 'Indah secara visual / pemandangan indah', exp: '"Scenic" artinya memiliki pemandangan alam yang indah dan menarik.' },
      { q: 'In the sentence "Bandung is surrounded by mountains", what is the grammatical structure used?', opts: ['Active voice, present tense', 'Passive voice, present tense', 'Active voice, past tense', 'Passive voice, past tense'], ans: 'Passive voice, present tense', exp: '"is surrounded" = to be (is) + past participle (surrounded) → Passive Voice, Present Simple.' },
      { q: 'Which paragraph contains the WRITER\'S FEELINGS?', opts: ['First paragraph', 'Second paragraph', 'Third paragraph', 'All paragraphs'], ans: 'Third paragraph', exp: 'Paragraf ketiga: "I am proud to be from Bandung and I always enjoy coming back to visit." – mengandung perasaan penulis.' },
      { q: 'What is the correct order for a descriptive essay about a place?', opts: ['Details → Introduction → Conclusion', 'Introduction → Details → Personal Feeling/Conclusion', 'Personal Feeling → Details → Introduction', 'Conclusion → Introduction → Details'], ans: 'Introduction → Details → Personal Feeling/Conclusion', exp: 'Urutan logis: Perkenalan tempat → Rincian (detail menarik) → Penutup dengan kesan pribadi.' },
      { q: 'The phrase "attract many tourists every weekend" uses which verb tense?', opts: ['Past Simple', 'Present Perfect', 'Present Simple', 'Future Simple'], ans: 'Present Simple', exp: 'Kata kerja "attract" tanpa –ed dan bukan bentuk "have + V3" → Present Simple untuk menyatakan fakta/rutinitas.' },
      { q: 'Identify the TRANSITION PHRASE in: "Another famous spot is..."', opts: ['"Another" signals addition of a new example', '"Famous spot" is the subject', '"is" is the main verb', '"Another" signals contrast'], ans: '"Another" signals addition of a new example', exp: '"Another" adalah transisi untuk menambah contoh baru setelah contoh pertama (Dago) disebutkan.' },
      { q: 'What writing tip is shown by using specific names like "Dago" and "Tangkuban Perahu"?', opts: ['Using vague general descriptions', 'Using specific details makes writing more vivid and credible', 'Using formal academic tone', 'Avoiding personal examples'], ans: 'Using specific details makes writing more vivid and credible', exp: 'Menggunakan nama spesifik membuat tulisan lebih hidup, detail, dan dapat dipercaya.' },
      { q: 'Which sentence would BEST fit as a CONCLUDING sentence for a paragraph about food in Bandung?', opts: ['"Bandung has mountains."', '"Overall, Bandung\'s culinary scene is one of the most diverse in Indonesia."', '"I went to Bandung yesterday."', '"The city has many cafes."'], ans: '"Overall, Bandung\'s culinary scene is one of the most diverse in Indonesia."', exp: 'Kalimat penutup yang baik merangkum isi paragraf dengan kata transisi seperti "Overall" dan pernyataan yang kuat.' },
      { q: 'The text says the city has a "strong arts and music scene." What does "scene" mean here?', opts: ['Pemandangan alam', 'Komunitas/lingkungan aktif dalam bidang tersebut', 'Panggung pertunjukan', 'Gambar atau foto'], ans: 'Komunitas/lingkungan aktif dalam bidang tersebut', exp: '"Scene" dalam konteks ini berarti komunitas atau dunia yang aktif dalam suatu bidang (mis. music scene = komunitas musik).' },
      { q: 'What is the MAIN IDEA of the entire text?', opts: ['How to travel to Bandung', 'A personal description of the writer\'s hometown, Bandung', 'A comparison of Indonesian cities', 'The history of West Java'], ans: 'A personal description of the writer\'s hometown, Bandung', exp: 'Keseluruhan teks menggambarkan kota asal penulis (Bandung) dari berbagai aspek: geografi, pariwisata, dan masyarakat.' },
    ],
  },
  {
    id: 2,
    title: 'A Letter to My Friend',
    subtitle: 'Personal letters about experiences',
    topic: 'personal letter',
    heroEmoji: '✉️',
    heroDesc: 'Belajar menulis surat pribadi kepada teman yang menggambarkan pengalaman dan kesan.',
    sampleTitle: '✍️ Contoh Surat Pribadi',
    sample: `Jakarta, 15 March

Dear Rina,

How are you? I hope you are doing well. It has been a while since we last met, and I really miss spending time with you!

I am writing to tell you about my recent trip to Yogyakarta. My family and I visited the city last week during the school holiday. It was a wonderful experience that I will never forget.

On the first day, we went to the Prambanan Temple. I was amazed by how tall and detailed the temple carvings were. The guide told us many interesting stories about the history of the temple. On the second day, we explored Malioboro Street. We tried the famous local food, including gudeg and bakpia. We also bought some batik souvenirs.

One of my favourite moments was watching the sunset at Parangtritis Beach. The orange and purple colours in the sky were absolutely beautiful. I felt so relaxed and peaceful.

I really wish you could have been there with me! Perhaps we can plan a trip together next time.

Write back soon,
Dewi`,
    comprehension: [
      { q: 'Kepada siapa surat ini ditulis?', opts: ['Dewi', 'Rina', 'Ibu Dewi', 'Guru Dewi'], ans: 'Rina' },
      { q: 'Ke mana Dewi dan keluarganya pergi liburan?', opts: ['Bali', 'Bandung', 'Yogyakarta', 'Surabaya'], ans: 'Yogyakarta' },
      { q: 'Apa yang paling berkesan dari hari pertama kunjungan?', opts: ['Pantai Parangtritis', 'Candi Prambanan', 'Jalan Malioboro', 'Bakpia'], ans: 'Candi Prambanan' },
      { q: 'Apa makanan yang disebutkan di surat?', opts: ['Nasi goreng dan sate', 'Gudeg dan bakpia', 'Rendang dan pempek', 'Mie dan gado-gado'], ans: 'Gudeg dan bakpia' },
      { q: 'Apa momen favorit Dewi?', opts: ['Makan gudeg', 'Belanja batik', 'Melihat matahari terbenam di pantai', 'Mendengar cerita pemandu'], ans: 'Melihat matahari terbenam di pantai' },
    ],
    quiz: [
      { q: 'What is the GREETING in a personal letter?', opts: ['Jakarta, 15 March', 'Dear Rina,', 'Write back soon,', 'How are you?'], ans: 'Dear Rina,', exp: '"Dear [Name]," adalah salam pembuka (greeting/salutation) dalam surat pribadi.' },
      { q: 'What is the CLOSING in this letter?', opts: ['Dear Rina,', 'I hope you are doing well', 'Write back soon, Dewi', 'It has been a while'], ans: 'Write back soon, Dewi', exp: '"Write back soon, Dewi" adalah penutup surat (closing + signature).' },
      { q: 'What is the PURPOSE of the FIRST BODY PARAGRAPH?', opts: ['To describe the sunset', 'To say goodbye', 'To announce the topic of the letter (the trip)', 'To list food they ate'], ans: 'To announce the topic of the letter (the trip)', exp: 'Paragraf pembuka isi surat memperkenalkan topik utama – dalam hal ini, perjalanan ke Yogyakarta.' },
      { q: 'Which tense is mainly used when describing past events in a personal letter?', opts: ['Present Simple', 'Past Simple', 'Future Simple', 'Present Perfect'], ans: 'Past Simple', exp: 'Past Simple digunakan untuk menceritakan kejadian yang sudah terjadi di masa lalu (went, tried, bought, watched).' },
      { q: 'What is the function of "I was amazed by..."?', opts: ['Stating a fact', 'Expressing a personal feeling/reaction', 'Giving an instruction', 'Describing the future'], ans: 'Expressing a personal feeling/reaction', exp: '"I was amazed by..." mengekspresikan reaksi/perasaan pribadi – unsur penting dalam surat personal.' },
      { q: 'In a personal letter, which phrase is MOST suitable to open the body?', opts: ['"In conclusion..."', '"I am writing to tell you about..."', '"According to research..."', '"The hypothesis is..."'], ans: '"I am writing to tell you about..."', exp: '"I am writing to tell you about..." adalah kalimat pembuka yang umum dan sopan dalam surat personal.' },
      { q: 'What is "On the first day, ... On the second day, ..." an example of?', opts: ['Comparison', 'Cause and effect', 'Time sequencing / chronological order', 'Opinion giving'], ans: 'Time sequencing / chronological order', exp: 'Frasa "On the first day" dan "On the second day" menunjukkan urutan waktu/kronologis dalam bercerita.' },
      { q: 'What does "I really wish you could have been there" express?', opts: ['A command', 'A regret or wish about the past', 'A future plan', 'An apology'], ans: 'A regret or wish about the past', exp: '"I wish + could have + V3" mengekspresikan penyesalan/keinginan tentang sesuatu yang tidak terjadi di masa lalu.' },
      { q: 'Which closing phrase is MOST informal/friendly?', opts: ['"Yours faithfully,"', '"Yours sincerely,"', '"Write back soon,"', '"Best regards,"'], ans: '"Write back soon,"', exp: '"Write back soon" terasa lebih informal dan akrab – cocok untuk surat kepada teman.' },
      { q: 'What details are used to make the sunset description vivid?', opts: ['The name of the beach only', 'Colors: orange and purple', 'The time', 'The temperature'], ans: 'Colors: orange and purple', exp: 'Deskripsi "orange and purple colours" membuat tulisan lebih hidup dan visual, bukan sekadar berkata "sunsetnya indah".' },
      { q: 'The sentence "It was a wonderful experience that I will never forget" is a...?', opts: ['Topic sentence', 'Supporting detail', 'Emphatic/emotional statement', 'Definition'], ans: 'Emphatic/emotional statement', exp: 'Kalimat ini menekankan betapa berkesan pengalamannya – berfungsi sebagai pernyataan emosional yang kuat.' },
      { q: 'What makes "The orange and purple colours in the sky were absolutely beautiful" effective?', opts: ['It is very short', 'It uses specific sensory (visual) adjectives', 'It uses passive voice', 'It starts with a number'], ans: 'It uses specific sensory (visual) adjectives', exp: 'Penggunaan kata sifat spesifik yang bersifat sensorik (visual colours) membuat deskripsi lebih menarik.' },
      { q: 'Which sentence invites the reader to RESPOND?', opts: ['"I hope you are doing well."', '"Write back soon,"', '"Perhaps we can plan a trip together next time."', '"I really miss spending time with you!"'], ans: '"Perhaps we can plan a trip together next time."', exp: 'Mengajak pembaca untuk merencanakan sesuatu bersama adalah teknik untuk mengundang respons dan mempererat hubungan.' },
      { q: 'What is the DATE and PLACE written at the TOP of the letter?', opts: ['Yogyakarta, 15 March', 'Jakarta, 15 March', 'Bali, 15 March', 'Bandung, 15 March'], ans: 'Jakarta, 15 March', exp: 'Surat ditulis dari Jakarta pada 15 March – ditulis di pojok kiri atas sebelum salam pembuka.' },
      { q: 'Which phrase shows the writer MISSES the recipient?', opts: ['"I am writing to tell you..."', '"I really miss spending time with you!"', '"Please write back."', '"On the first day..."'], ans: '"I really miss spending time with you!"', exp: '"I really miss spending time with you!" secara eksplisit mengungkapkan rasa rindu kepada penerima surat.' },
      { q: 'What is the CORRECT structure of a personal letter (in order)?', opts: ['Greeting → Closing → Body', 'Date & Place → Greeting → Body → Closing', 'Body → Date → Greeting', 'Closing → Body → Date'], ans: 'Date & Place → Greeting → Body → Closing', exp: 'Urutan surat pribadi yang benar: Tempat & Tanggal → Salam (Dear...) → Isi surat → Penutup & Tanda Tangan.' },
      { q: 'In "We also bought some batik souvenirs", what is the function of "also"?', opts: ['Contrast', 'Result', 'Addition', 'Condition'], ans: 'Addition', exp: '"Also" berfungsi menambah informasi tentang aktivitas lain yang dilakukan selain yang sudah disebutkan sebelumnya.' },
      { q: 'What is the DIFFERENCE between a personal letter and a formal letter?', opts: ['Personal letters use formal vocabulary only', 'Personal letters use friendly/informal language and share feelings', 'Formal letters are always longer', 'There is no difference'], ans: 'Personal letters use friendly/informal language and share feelings', exp: 'Surat pribadi menggunakan bahasa yang lebih santai dan personal, serta sering mengekspresikan perasaan dan pengalaman.' },
      { q: 'Choose the best OPENING LINE for a personal letter to a friend:', opts: ['"I hereby inform you that..."', '"How are you? I hope you\'re doing great!"', '"To whom it may concern,"', '"This letter is in reference to..."'], ans: '"How are you? I hope you\'re doing great!"', exp: 'Sapaan informal dan penuh perhatian adalah cara terbaik untuk membuka surat pribadi kepada teman.' },
      { q: 'The letter says "It has been a while since we last met." What does this express?', opts: ['They just met', 'They haven\'t seen each other for some time', 'They will meet tomorrow', 'They don\'t know each other'], ans: 'They haven\'t seen each other for some time', exp: '"It has been a while since we last met" = sudah lama sejak kita terakhir bertemu – menggunakan Present Perfect untuk menyatakan period of time.' },
    ],
  },
  {
    id: 3,
    title: 'My Daily Routine',
    subtitle: 'Connected sentences about familiar topics',
    topic: 'daily life',
    heroEmoji: '🌅',
    heroDesc: 'Menulis teks sederhana yang saling terhubung tentang rutinitas sehari-hari.',
    sampleTitle: '✍️ A Typical School Day',
    sample: `My school days follow a similar pattern. I usually wake up at five-thirty in the morning. After washing my face and brushing my teeth, I have a quick breakfast with my family. My mother often makes rice with eggs and vegetables, which is my favourite meal of the day.

I leave the house at six-fifteen and take the school bus. The journey takes about twenty minutes. During the ride, I usually listen to music or review my notes. I try to arrive at school before the bell rings.

Classes start at seven o'clock and finish at two in the afternoon. After school, I sometimes stay back for the English club. When I get home, I rest for about an hour before doing my homework. In the evening, I study for about two hours and then spend some time reading or watching educational videos. I usually go to bed at ten o'clock.

Although my routine seems busy, I enjoy it because I feel productive and organised. Having a routine helps me manage my time well.`,
    comprehension: [
      { q: 'Jam berapa penulis biasanya bangun?', opts: ['Pukul 5.00', 'Pukul 5.30', 'Pukul 6.00', 'Pukul 6.15'], ans: 'Pukul 5.30' },
      { q: 'Apa sarapan favorit penulis?', opts: ['Roti dan telur', 'Nasi dengan telur dan sayuran', 'Sereal', 'Mie goreng'], ans: 'Nasi dengan telur dan sayuran' },
      { q: 'Berapa lama perjalanan ke sekolah?', opts: ['5 menit', '10 menit', '20 menit', '30 menit'], ans: '20 menit' },
      { q: 'Apa yang penulis lakukan setelah sekolah kadang-kadang?', opts: ['Main game', 'Ikut English club', 'Tidur siang', 'Berolahraga'], ans: 'Ikut English club' },
      { q: 'Pukul berapa penulis biasanya tidur?', opts: ['Pukul 9', 'Pukul 10', 'Pukul 11', 'Pukul 12'], ans: 'Pukul 10' },
    ],
    quiz: [
      { q: 'What tense is mainly used in a text about daily routines?', opts: ['Past Simple', 'Present Simple', 'Future Simple', 'Present Perfect'], ans: 'Present Simple', exp: 'Rutinitas sehari-hari dinyatakan dengan Present Simple karena merupakan kebiasaan yang berulang.' },
      { q: 'Which word shows FREQUENCY in "I usually wake up at five-thirty"?', opts: ['Wake', 'Up', 'Usually', 'Five-thirty'], ans: 'Usually', exp: '"Usually" adalah adverb of frequency yang menunjukkan seberapa sering suatu aktivitas dilakukan.' },
      { q: 'What is the role of "After washing my face and brushing my teeth"?', opts: ['Main clause', 'Adverbial phrase showing time/sequence', 'Subject of the sentence', 'Direct object'], ans: 'Adverbial phrase showing time/sequence', exp: '"After + verb-ing" adalah frasa adverbial waktu yang menunjukkan urutan aktivitas.' },
      { q: 'Which connective shows CONTRAST in the last paragraph?', opts: ['And', 'Because', 'Although', 'When'], ans: 'Although', exp: '"Although" adalah konjungsi kontras – menghubungkan dua ide yang berlawanan (rutinitas sibuk vs. menyukainya).' },
      { q: 'What does "which is my favourite meal of the day" refer to?', opts: ['Mother', 'School', 'Rice with eggs and vegetables', 'The morning'], ans: 'Rice with eggs and vegetables', exp: '"Which" dalam relative clause ini mengacu pada "rice with eggs and vegetables" yang disebutkan sebelumnya.' },
      { q: 'The sentence "Having a routine helps me manage my time well" shows...', opts: ['A complaint', 'A benefit/positive conclusion', 'A past experience', 'A future goal'], ans: 'A benefit/positive conclusion', exp: 'Kalimat ini menyatakan manfaat dari rutinitas – berfungsi sebagai penutup yang positif dan afirmatif.' },
      { q: 'What is the function of "During the ride" in the paragraph?', opts: ['To contrast two ideas', 'To introduce a new topic', 'To show what happens at the same time as another action', 'To express a condition'], ans: 'To show what happens at the same time as another action', exp: '"During the ride" menunjukkan aktivitas yang terjadi bersamaan/selama perjalanan berlangsung.' },
      { q: 'Why does the writer say "I try to arrive at school before the bell rings"?', opts: ['To show they are always late', 'To express an effort/intention', 'To describe a command from the teacher', 'To state a future plan'], ans: 'To express an effort/intention', exp: '"I try to..." mengekspresikan usaha atau niat yang dilakukan, meskipun belum tentu selalu berhasil.' },
      { q: 'What word connects cause and effect in "I enjoy it because I feel productive"?', opts: ['Although', 'Because', 'However', 'Therefore'], ans: 'Because', exp: '"Because" menghubungkan sebab (merasa produktif) dengan akibat (menikmati rutinitas).' },
      { q: 'Which phrase shows a HABIT that is NOT always done?', opts: ['"I usually wake up"', '"I sometimes stay back for the English club"', '"Classes start at seven"', '"I usually go to bed at ten"'], ans: '"I sometimes stay back for the English club"', exp: '"Sometimes" menunjukkan kebiasaan yang tidak selalu terjadi, hanya sesekali.' },
      { q: 'What does organising a daily routine text by TIME show?', opts: ['Random writing', 'Chronological / time-based paragraph structure', 'Spatial description', 'Classification'], ans: 'Chronological / time-based paragraph structure', exp: 'Tulisan tentang rutinitas paling logis disusun secara kronologis – dari pagi ke malam.' },
      { q: 'In "I rest for about an hour before doing my homework", what does "before" show?', opts: ['A contrast', 'A time relationship (sequence)', 'A reason', 'A result'], ans: 'A time relationship (sequence)', exp: '"Before" menunjukkan urutan waktu – istirahat terjadi SEBELUM mengerjakan PR.' },
      { q: 'What would BEST replace "about two hours" in formal writing?', opts: ['"approximately two hours"', '"kinda two hours"', '"lots of hours"', '"a big amount of hours"'], ans: '"approximately two hours"', exp: '"Approximately" adalah kata yang lebih formal untuk menggantikan "about" dalam konteks akademis.' },
      { q: 'Which sentence acts as the TOPIC SENTENCE of the last paragraph?', opts: ['"I usually go to bed at ten."', '"Although my routine seems busy, I enjoy it because I feel productive and organised."', '"I study for about two hours."', '"I rest for about an hour."'], ans: '"Although my routine seems busy, I enjoy it because I feel productive and organised."', exp: 'Kalimat ini memperkenalkan ide utama paragraf terakhir – evaluasi/penilaian terhadap rutinitas tersebut.' },
      { q: 'What is the correct way to write time in formal text?', opts: ['"5:30 in the morning"', '"five-thirty in the morning" or "05:30"', '"5 and a half hours"', '"early"'], ans: '"five-thirty in the morning" or "05:30"', exp: 'Waktu bisa ditulis secara tertulis (five-thirty) atau angka (05:30), keduanya dianggap benar dalam penulisan formal.' },
      { q: 'What is the MAIN PURPOSE of the text?', opts: ['To complain about school', 'To describe the writer\'s daily school routine', 'To teach someone how to study', 'To entertain with a funny story'], ans: 'To describe the writer\'s daily school routine', exp: 'Tujuan utama teks adalah mendeskripsikan rutinitas sehari-hari penulis di hari sekolah.' },
      { q: 'Which adverb of frequency means "at all times"?', opts: ['Sometimes', 'Often', 'Always', 'Rarely'], ans: 'Always', exp: '"Always" berarti selalu – frekuensi tertinggi dalam urutan: always > usually > often > sometimes > rarely > never.' },
      { q: 'What does "I feel productive and organised" reveal about the writer?', opts: ['The writer dislikes routine', 'The writer values efficiency and discipline', 'The writer never has free time', 'The writer is bored'], ans: 'The writer values efficiency and discipline', exp: 'Merasa "productive and organised" menunjukkan bahwa penulis menghargai efisiensi dan kedisiplinan dalam hidupnya.' },
      { q: 'Identify the COMPOUND sentence: ', opts: ['"I wake up at five-thirty."', '"After brushing my teeth, I have breakfast."', '"Classes start at seven and finish at two."', '"Although busy, I enjoy it."'], ans: '"Classes start at seven and finish at two."', exp: 'Compound sentence = dua klausa independen dihubungkan dengan kata sambung (and). "Classes start at seven" + "finish at two".' },
      { q: 'What would be a good TITLE for this text?', opts: ['"My Dream Holiday"', '"A Typical School Day"', '"Learning English"', '"My Future Plans"'], ans: '"A Typical School Day"', exp: 'Teks ini mendeskripsikan rutinitas sehari-hari di hari sekolah, sehingga judul paling tepat adalah "A Typical School Day".' },
    ],
  },
];

// ── writingUtils template ────────────────────────────────────────────────────
const UTILS_CONTENT = `import React, { useState } from 'react';
import { CheckCircleIcon, XCircleIcon, StarIcon } from '../../../../../components/Icons';

export const WRITING_KEY = 'talky_intermediate_writing_completed';
export function getCompletedWritingLessons(): number[] { try { return JSON.parse(localStorage.getItem(WRITING_KEY) || '[]'); } catch { return []; } }
export function markWritingComplete(id: number) { const d = getCompletedWritingLessons(); if (!d.includes(id)) localStorage.setItem(WRITING_KEY, JSON.stringify([...d, id])); }

/* ─────────────── QUIZ ENGINE ─────────────── */
export interface QuizItem { q: string; opts: string[]; ans: string; exp: string; }

export function QuizEngine({ items, onComplete }: { items: QuizItem[]; onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [sel, setSel] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  const pick = (o: string) => { if (checked) return; setSel(o); setChecked(true); if (o === items[step].ans) setScore(s => s + 1); };
  const next = () => { if (step < items.length - 1) { setStep(s => s + 1); setSel(null); setChecked(false); } else setDone(true); };
  const restart = () => { setStep(0); setScore(0); setDone(false); setSel(null); setChecked(false); };

  if (done) return (
    <div className="text-center py-8 max-w-md mx-auto animate-fade-in">
      <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4"><StarIcon className="w-12 h-12 text-amber-500" /></div>
      <h2 className="text-2xl font-bold text-slate-800 mb-1">Latihan Selesai! 🎉</h2>
      <p className="text-slate-500 mb-1">Skor: <span className="font-extrabold text-amber-600 text-3xl">{score}</span><span className="text-xl">/{items.length}</span></p>
      <p className="text-sm text-slate-400 mb-6">{score >= Math.round(items.length * 0.8) ? '🏆 Pemahaman menulis sangat baik (B1 Target tercapai)!' : score >= Math.round(items.length * 0.6) ? '👍 Cukup baik! Terus berlatih.' : '📚 Pelajari lagi materi dan contoh teksnya!'}</p>
      <button onClick={restart} className="px-6 py-3 bg-amber-100 text-amber-700 rounded-xl font-bold mr-3 cursor-pointer hover:bg-amber-200">Ulangi</button>
      <button onClick={onComplete} className="px-6 py-3 bg-amber-500 text-white rounded-xl font-bold cursor-pointer hover:bg-amber-600 shadow-md">Tandai Selesai ✓</button>
    </div>
  );

  const q = items[step];
  return (
    <div className="max-w-xl mx-auto animate-fade-in">
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-amber-100">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-bold text-slate-400">Soal {step + 1} dari {items.length}</span>
          <span className="text-xs font-bold bg-amber-50 text-amber-600 px-2 py-1 rounded-lg">Skor: {score}</span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full mb-5 overflow-hidden">
          <div className="h-full bg-amber-400 transition-all rounded-full" style={{ width: \`\${((step + 1) / items.length) * 100}%\` }} />
        </div>
        <h3 className="text-base font-bold text-slate-800 mb-5">{q.q}</h3>
        <div className="space-y-2.5">
          {q.opts.map((o, i) => {
            let cls = 'border-slate-200 hover:border-amber-400 hover:bg-amber-50 cursor-pointer';
            if (checked) { if (o === q.ans) cls = 'bg-amber-50 border-amber-400 text-amber-800'; else if (o === sel) cls = 'bg-red-50 border-red-400 text-red-700'; else cls = 'opacity-40 border-slate-100 cursor-default'; }
            return (
              <button key={i} onClick={() => pick(o)} disabled={checked} className={\`w-full p-3.5 rounded-xl border-2 text-left text-sm font-medium transition-all flex items-center justify-between \${cls}\`}>
                <span>{o}</span>
                {checked && o === q.ans && <CheckCircleIcon className="w-5 h-5 text-amber-600 shrink-0" />}
                {checked && o === sel && o !== q.ans && <XCircleIcon className="w-5 h-5 text-red-500 shrink-0" />}
              </button>
            );
          })}
        </div>
        {checked && (
          <div className="mt-4 animate-fade-in">
            <div className={\`p-3 rounded-xl text-sm mb-4 border \${sel === q.ans ? 'bg-amber-50 text-amber-800 border-amber-100' : 'bg-orange-50 text-orange-800 border-orange-100'}\`}>
              💡 {q.exp}
            </div>
            <button onClick={next} className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all cursor-pointer shadow-md">
              {step < items.length - 1 ? 'Selanjutnya →' : 'Lihat Rekap'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────── WRITING CARD ─────────────── */
export function WritingCard({ title, icon, children, highlight }: { title?: string; icon?: string; children: React.ReactNode; highlight?: string; }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-4 hover:border-amber-100 transition-all">
      {title && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-4 py-3 border-b border-amber-100 flex items-center gap-2">
          {icon && <span className="text-xl">{icon}</span>}
          <p className="text-xs font-extrabold text-amber-800 uppercase tracking-wider">{title}</p>
          {highlight && <span className="ml-auto text-[10px] font-bold bg-amber-500 text-white px-2 py-0.5 rounded-full">{highlight}</span>}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}

/* ─────────────── COMPREHENSION Q&A ─────────────── */
export interface ComprehensionQ { q: string; opts: string[]; ans: string; }

export function ComprehensionSection({ passageTitle, passage, questions }: {
  passageTitle: string; passage: React.ReactNode; questions: ComprehensionQ[];
}) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showAns, setShowAns] = useState(false);
  const correctCount = questions.filter((q, i) => answers[i] === q.ans).length;

  return (
    <div className="space-y-4 max-w-xl mx-auto animate-fade-in">
      <WritingCard title={passageTitle} icon="📄">
        <div className="text-[15px] text-slate-700 leading-relaxed space-y-3">{passage}</div>
      </WritingCard>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-extrabold text-slate-800">✏️ Pemahaman Teks (B1)</h3>
          {Object.keys(answers).length === questions.length && !showAns && (
            <button onClick={() => setShowAns(true)} className="text-xs font-bold px-3 py-1.5 bg-amber-500 text-white rounded-xl hover:bg-amber-600 cursor-pointer shadow-sm">Cek Jawaban</button>
          )}
          {showAns && <span className="text-xs font-bold text-amber-700">{correctCount}/{questions.length} benar</span>}
        </div>
        <div className="space-y-3">
          {questions.map((q, i) => (
            <div key={i} className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm transition-all hover:border-amber-100">
              <p className="text-sm font-semibold text-slate-800 mb-3">{i + 1}. {q.q}</p>
              <div className="space-y-2">
                {q.opts.map((opt, j) => {
                  let cls = 'border-slate-200 hover:border-amber-300 hover:bg-amber-50 cursor-pointer';
                  if (showAns) { if (opt === q.ans) cls = 'bg-amber-50 border-amber-400 text-amber-800 font-bold'; else if (opt === answers[i]) cls = 'bg-red-50 border-red-300 text-red-700'; else cls = 'opacity-40 border-slate-100 cursor-default'; }
                  else if (answers[i] === opt) cls = 'border-amber-400 bg-amber-50 text-amber-800 font-medium shadow-sm';
                  return (
                    <button key={j} onClick={() => !showAns && setAnswers(p => ({ ...p, [i]: opt }))} disabled={showAns} className={\`w-full text-left text-sm px-3 py-2.5 rounded-lg border-2 transition-all \${cls}\`}>
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        {showAns && (
          <button onClick={() => { setAnswers({}); setShowAns(false); }} className="w-full mt-4 py-3 border-2 border-amber-400 text-amber-700 font-bold rounded-xl text-sm hover:bg-amber-50 cursor-pointer shadow-sm transition-colors">
            Ulangi Pemahaman Konten
          </button>
        )}
      </div>
    </div>
  );
}
`;

// ── Generate lesson for IDs 4-20 using template ───────────────────────────
const LESSON_META = [
  { id: 4, title: 'My Favourite Place', subtitle: 'Personal description', topic: 'favourite place', heroEmoji: '🌿', heroDesc: 'Menulis tentang tempat favoritmu dengan detail yang menarik.' },
  { id: 5, title: 'A Weekend Story', subtitle: 'Narrating weekend activities', topic: 'weekend', heroEmoji: '🎉', heroDesc: 'Menceritakan kegiatan akhir pekan dengan kalimat yang saling terhubung.' },
  { id: 6, title: 'My Best Friend', subtitle: 'Describing a person', topic: 'friendship', heroEmoji: '👫', heroDesc: 'Mendeskripsikan seseorang yang penting bagimu.' },
  { id: 7, title: 'A Memorable Trip', subtitle: 'Narrating travel experiences', topic: 'travel', heroEmoji: '✈️', heroDesc: 'Menceritakan perjalanan yang tidak terlupakan.' },
  { id: 8, title: 'Food I Love', subtitle: 'Describing favourite food', topic: 'food', heroEmoji: '🍜', heroDesc: 'Menulis deskripsi makanan favoritmu dengan detail indrawi.' },
  { id: 9, title: 'Letter of Invitation', subtitle: 'Writing a personal invitation', topic: 'invitation', heroEmoji: '💌', heroDesc: 'Menulis surat undangan kepada teman untuk acara spesial.' },
  { id: 10, title: 'My Future Plans', subtitle: 'Writing about hopes and dreams', topic: 'future', heroEmoji: '🌟', heroDesc: 'Menulis tentang rencana dan harapanmu untuk masa depan.' },
  { id: 11, title: 'A Problem and Solution', subtitle: 'Connected argument writing', topic: 'problem solving', heroEmoji: '🔧', heroDesc: 'Menulis tentang masalah dan cara mengatasinya.' },
  { id: 12, title: 'Describing My School', subtitle: 'Descriptive writing – buildings', topic: 'school', heroEmoji: '🏫', heroDesc: 'Mendeskripsikan sekolahmu secara detail dan terstruktur.' },
  { id: 13, title: 'A Thank You Letter', subtitle: 'Expressing gratitude in writing', topic: 'thank you letter', heroEmoji: '🙏', heroDesc: 'Menulis surat ucapan terima kasih yang tulus dan personal.' },
  { id: 14, title: 'My Hobby', subtitle: 'Writing about personal interests', topic: 'hobbies', heroEmoji: '🎨', heroDesc: 'Menulis tentang hobimu secara detail dan menarik.' },
  { id: 15, title: 'A Story About My Pet', subtitle: 'Narrative writing', topic: 'pets', heroEmoji: '🐾', heroDesc: 'Menceritakan kisah tentang hewan peliharaanmu.' },
  { id: 16, title: 'An Apology Letter', subtitle: 'Writing a sincere apology', topic: 'apology letter', heroEmoji: '😔', heroDesc: 'Menulis surat permintaan maaf yang tulus dan sopan.' },
  { id: 17, title: 'My Neighbourhood', subtitle: 'Describing a local area', topic: 'neighbourhood', heroEmoji: '🏘️', heroDesc: 'Mendeskripsikan lingkungan sekitar tempat tinggalmu.' },
  { id: 18, title: 'A Complaint Letter', subtitle: 'Formal complaint writing', topic: 'complaint', heroEmoji: '📮', heroDesc: 'Menulis surat keluhan yang sopan dan efektif.' },
  { id: 19, title: 'Writing with Conjunctions', subtitle: 'Connecting ideas effectively', topic: 'conjunctions', heroEmoji: '🔗', heroDesc: 'Berlatih menghubungkan kalimat dengan kata sambung yang tepat.' },
  { id: 20, title: 'Review & Writing Test', subtitle: 'Final writing assessment', topic: 'review', heroEmoji: '📝', heroDesc: 'Ujian akhir menulis – terapkan semua yang sudah dipelajari!' },
];

// ── Writing Page ──────────────────────────────────────────────────────────
const WRITING_PAGE = `import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Check, Play } from 'lucide-react';
import PageContainer from '../../../../../components/layout/PageContainer';
import { PageHeader } from '../../../../../components/shared/NavComponents';
import { getCompletedWritingLessons } from './writingUtils';

const SKILL = {
  id: 'writing',
  icon: '/assets/icons/new/25. Pen & Notebook.png',
  color: '#F39C12',
  bgColor: '#FEF9E7',
};

const TOTAL_LESSONS = 20;

const LESSON_TITLES: Record<number, string> = {
  1: 'My Hometown',
  2: 'A Letter to My Friend',
  3: 'My Daily Routine',
  4: 'My Favourite Place',
  5: 'A Weekend Story',
  6: 'My Best Friend',
  7: 'A Memorable Trip',
  8: 'Food I Love',
  9: 'Letter of Invitation',
  10: 'My Future Plans',
  11: 'A Problem and Solution',
  12: 'Describing My School',
  13: 'A Thank You Letter',
  14: 'My Hobby',
  15: 'A Story About My Pet',
  16: 'An Apology Letter',
  17: 'My Neighbourhood',
  18: 'A Complaint Letter',
  19: 'Writing with Conjunctions',
  20: 'Review & Writing Test',
};

export default function InterWritingPage() {
  const navigate = useNavigate();
  const [completedIds, setCompletedIds] = useState<number[]>([]);

  useEffect(() => { setCompletedIds(getCompletedWritingLessons()); }, []);

  const completedCount = completedIds.length;
  const progressPercent = TOTAL_LESSONS > 0 ? (completedCount / TOTAL_LESSONS) * 100 : 0;
  const lessons = Array.from({ length: TOTAL_LESSONS }, (_, i) => i + 1);

  return (
    <PageContainer>
      <div className="pb-28 md:pb-8">
        <PageHeader titleKey="skill.writing" subtitleKey="modul.daysSubtitle" />

        <motion.div
          className="mx-5 md:mx-0 mb-6 rounded-2xl p-5 relative overflow-hidden"
          style={{ backgroundColor: SKILL.bgColor, border: \`1px solid \${SKILL.color}20\` }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl p-2 shrink-0" style={{ backgroundColor: \`\${SKILL.color}15\` }}>
              <img src={SKILL.icon} alt="" className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="font-bold text-[15px] text-[#1A1A2E]">Writing</h3>
              <p className="text-xs text-[#6B7280]">
                {completedCount}/{TOTAL_LESSONS} Pelajaran
              </p>
            </div>
            <div className="ml-auto inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: SKILL.color }}>
              🎓 Intermediate
            </div>
          </div>
          <div className="mt-3 h-2 bg-white/60 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: SKILL.color }}
              initial={{ width: 0 }}
              animate={{ width: \`\${progressPercent}%\` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
          {completedCount > 0 && (
            <p className="text-[11px] font-semibold mt-1.5" style={{ color: SKILL.color }}>
              {completedCount === TOTAL_LESSONS
                ? '🎉 Semua pelajaran selesai!'
                : \`\${completedCount} dari \${TOTAL_LESSONS} pelajaran selesai\`}
            </p>
          )}
        </motion.div>

        <div className="px-5 md:px-0">
          <h2 className="text-lg font-extrabold text-[#1A1A2E] mb-1">Learning Path</h2>
          <p className="text-[13px] text-[#6B7280] mb-5">Complete each lesson to build your writing skills</p>

          <div className="space-y-3">
            {lessons.map((id, i) => {
              const done = completedIds.includes(id);
              return (
                <motion.button
                  key={id}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl text-left transition-all border-2 shadow-sm hover:shadow-md cursor-pointer"
                  style={{
                    borderColor: done ? '#26C76D' : \`\${SKILL.color}30\`,
                    backgroundColor: done ? '#F0FDF6' : 'white',
                  }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.03 * i }}
                  whileHover={{ scale: 1.01, borderColor: done ? '#26C76D' : SKILL.color }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(\`/modul/english/intermediate/writing/lesson-\${id}\`)}
                >
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 text-white transition-colors"
                    style={{ backgroundColor: done ? '#26C76D' : SKILL.color }}
                  >
                    {done ? <Check size={18} strokeWidth={3} /> : <Play size={16} fill="white" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-sm text-[#1A1A2E]">Lesson {id}</p>
                      {done && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white bg-[#26C76D]">
                          ✓ Selesai
                        </span>
                      )}
                    </div>
                    <p className="text-[12px] text-[#6B7280] truncate mt-0.5">
                      {LESSON_TITLES[id]}
                    </p>
                  </div>

                  <span
                    className="text-[10px] font-bold px-3 py-1.5 rounded-full text-white shrink-0"
                    style={{ backgroundColor: done ? '#26C76D' : SKILL.color }}
                  >
                    {done ? 'Completed' : 'Start'}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
`;

// ── Build a lesson TSX from data ─────────────────────────────────────────
function buildLessonTsx(lesson) {
  const { id, title, subtitle, topic, heroEmoji, heroDesc, sampleTitle, sample, comprehension, quiz } = lesson;
  const nextId = id < 20 ? id + 1 : null;
  const nextPath = nextId ? `/modul/english/intermediate/writing/lesson-${nextId}` : `/modul/english/intermediate/writing`;

  const paragraphs = sample.split('\n\n').filter(Boolean);
  const passageJsx = paragraphs.map((p, i) => `<p className="mb-4" key={${i}}>${p.replace(/'/g, "\\'")}</p>`).join('\n        ');

  const quizItems = quiz.map(q =>
    `  { q: '${q.q.replace(/'/g, "\\'")}', opts: [${q.opts.map(o => `"${o.replace(/"/g, '\\"')}"`).join(',')}], ans: "${q.ans.replace(/"/g, '\\"')}", exp: '${q.exp.replace(/'/g, "\\'")}' },`
  ).join('\n');

  const comprItems = comprehension.map(q =>
    `    { q: '${q.q.replace(/'/g, "\\'")}', opts: [${q.opts.map(o => `"${o.replace(/"/g, '\\"')}"`).join(',')}], ans: "${q.ans.replace(/"/g, '\\"')}" },`
  ).join('\n');

  return `import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine, WritingCard, ComprehensionSection, getCompletedWritingLessons, markWritingComplete } from './writingUtils';
import type { QuizItem, ComprehensionQ } from './writingUtils';
import { BookOpen, PenTool, CheckCircle2, ChevronLeft } from 'lucide-react';

/* ══ DATA: QUIZ 20 SOAL (CEFR B1) ═══════════════════════════════════════════════ */
const QUIZ: QuizItem[] = [
${quizItems}
];

/* ══ DATA: KONTEN BACAAN (B1) ═══════════════════════════════════════════════ */
const COMPREHENSION: { passageTitle: string; passage: React.ReactNode; questions: ComprehensionQ[] } = {
  passageTitle: '${sampleTitle}',
  passage: (
    <>
      <div className="bg-amber-50 p-6 font-serif rounded-xl border border-amber-100 shadow-inner text-slate-800 whitespace-pre-line leading-relaxed">
        ${paragraphs.map((p, i) => `<p className="mb-4">${p.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>`).join('\n        ')}
      </div>
    </>
  ),
  questions: [
${comprItems}
  ],
};

/* ══ MAIN COMPONENT ═══════════════════════════════════════════════ */
export default function InterWritingLesson${id}(): React.ReactElement {
  const navigate = useNavigate();
  const nextPath = '${nextPath}';
  const [isCompleted, setIsCompleted] = useState(() => getCompletedWritingLessons().includes(${id}));
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'baca' | 'latihan' | 'kuis'>('baca');

  const handleComplete = () => { markWritingComplete(${id}); setIsCompleted(true); setShowModal(true); };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 animate-fade-in" style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }} onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-[2rem] p-8 max-w-sm w-full text-center shadow-2xl relative overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-amber-400 to-orange-500 rounded-t-[2rem] -z-10" />
            <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 bg-white shadow-xl border-4 border-amber-50 mt-4">
              <span className="text-5xl">🏆</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-800 mb-2">Lesson Selesai! 🎉</h2>
            <p className="text-slate-500 mb-8 leading-relaxed">Selamat! Kamu berhasil mempelajari materi menulis Level <b>B1 (Intermediate)</b>.</p>
            <div className="space-y-3">
              <button onClick={() => { setShowModal(false); navigate(nextPath); }} className="w-full py-4 rounded-xl font-bold text-white bg-amber-500 hover:bg-amber-600 shadow-lg shadow-amber-200 transition-all active:scale-95">Pelajari Materi Selanjutnya</button>
              <button onClick={() => setShowModal(false)} className="w-full py-4 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all">Tutup</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col h-[100dvh] md:h-[calc(100vh-2rem)] bg-slate-50 md:rounded-3xl overflow-hidden shadow-2xl md:max-w-4xl md:mx-auto md:my-4 border border-slate-200">
        <header className="flex-none bg-white/80 backdrop-blur-xl sticky top-0 z-20 border-b border-slate-100 shadow-sm transition-all py-3 px-4">
          <div className="flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-600 transition-colors">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="text-center">
              <h1 className="text-base font-extrabold text-slate-800 tracking-tight">${title}</h1>
              <p className="text-[10px] text-amber-600 font-bold uppercase tracking-widest bg-amber-50 inline-block px-2 py-0.5 rounded-full mt-0.5">B1 Writing • Lesson ${id}</p>
            </div>
            <button onClick={() => navigate(nextPath)} className="px-4 py-2 rounded-full text-xs font-bold text-amber-600 bg-amber-50 hover:bg-amber-100 transition-colors">Next ›</button>
          </div>
        </header>

        <div className="flex bg-white border-b border-slate-100 sticky top-[65px] z-10 shadow-sm p-2 gap-2">
          {(['baca', 'latihan', 'kuis'] as const).map((tab) => {
            const labels = { baca: 'Materi', latihan: 'Pemahaman', kuis: 'Kuis 20 Soal' };
            const icons = { baca: <BookOpen className="w-4 h-4" />, latihan: <PenTool className="w-4 h-4" />, kuis: <CheckCircle2 className="w-4 h-4" /> };
            const isActive = activeTab === tab;
            return (
              <button key={tab} onClick={() => setActiveTab(tab)} className={\`flex-1 py-3 text-sm font-bold tracking-wide transition-all rounded-xl flex items-center justify-center gap-2 \${isActive ? 'bg-amber-500 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}\`}>
                {icons[tab]} {labels[tab]}
              </button>
            );
          })}
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-8 pb-28 space-y-6">
            {activeTab === 'baca' && (
              <div className="animate-fade-in space-y-6">
                <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-10">
                    <BookOpen className="w-32 h-32" />
                  </div>
                  <div className="text-4xl mb-3 relative z-10">${heroEmoji}</div>
                  <h2 className="text-xl md:text-2xl font-extrabold mb-2 relative z-10">${title}</h2>
                  <p className="text-sm md:text-base text-amber-100 leading-relaxed max-w-lg relative z-10">
                    ${heroDesc}
                  </p>
                </div>

                <WritingCard title="Petunjuk Belajar" icon="💡">
                  <p className="text-sm text-slate-700 mb-3 leading-relaxed">
                    Di lesson ini, kamu akan mempelajari cara menulis <strong>${subtitle}</strong> dengan baik. Perhatikan:
                  </p>
                  <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside bg-slate-50 p-4 rounded-xl">
                    <li><strong className="text-slate-800">Struktur:</strong> Paragraf pembuka, isi, dan penutup</li>
                    <li><strong className="text-slate-800">Kohesi:</strong> Gunakan kata sambung untuk menghubungkan kalimat</li>
                    <li><strong className="text-slate-800">Kosakata:</strong> Gunakan kata-kata yang sesuai dengan topik</li>
                    <li><strong className="text-slate-800">Ekspresi Pribadi:</strong> Sertakan perasaan dan pendapat kamu</li>
                  </ul>
                  <p className="text-sm text-slate-700 mt-4 font-medium italic">
                    Lanjut ke tab <b>Pemahaman</b> untuk membaca contoh teks!
                  </p>
                </WritingCard>

                <WritingCard title="Topik: ${subtitle}" icon="📌">
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'Level', val: 'B1 Intermediate' },
                      { label: 'Jenis Teks', val: '${topic}' },
                      { label: 'Soal Kuis', val: '20 soal' },
                      { label: 'Fokus', val: 'Writing Skills' },
                    ].map(item => (
                      <div key={item.label} className="bg-amber-50 rounded-xl p-3 border border-amber-100">
                        <p className="text-[10px] font-bold text-amber-600 uppercase mb-1">{item.label}</p>
                        <p className="text-xs font-bold text-slate-800">{item.val}</p>
                      </div>
                    ))}
                  </div>
                </WritingCard>
              </div>
            )}

            {activeTab === 'latihan' && <ComprehensionSection {...COMPREHENSION} />}
            {activeTab === 'kuis' && <QuizEngine items={QUIZ} onComplete={handleComplete} />}
          </div>
        </div>

        <div className="sticky bottom-0 z-30 bg-white/90 backdrop-blur-xl border-t border-slate-200 p-4">
          <button onClick={isCompleted ? () => navigate(-1) : handleComplete} className="w-full py-4 rounded-2xl font-bold text-white flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all hover:shadow-xl" style={{ background: isCompleted ? 'linear-gradient(135deg,#10B981,#059669)' : 'linear-gradient(135deg,#F39C12,#E67E22)' }}>
            <CheckCircle2 className="w-5 h-5" />
            {isCompleted ? 'Sudah Selesai ✓ (Kembali)' : 'Tandai Selesai ✓'}
          </button>
        </div>
      </div>
    </>
  );
}
`;
}

// ── Generic lesson template for 4-20 ────────────────────────────────────
function buildGenericLessonTsx(meta) {
  const { id, title, subtitle, topic, heroEmoji, heroDesc } = meta;
  const nextId = id < 20 ? id + 1 : null;
  const nextPath = nextId ? `/modul/english/intermediate/writing/lesson-${nextId}` : `/modul/english/intermediate/writing`;

  const genericQuiz = [
    { q: `What is the MAIN PURPOSE of a "${subtitle}" text?`, opts: ['To give instructions', 'To share personal ideas and experiences about the topic', 'To write a scientific report', 'To describe a process'], ans: 'To share personal ideas and experiences about the topic', exp: `Teks "${subtitle}" bertujuan untuk berbagi pengalaman, pendapat, atau deskripsi personal tentang topik yang dipilih.` },
    { q: 'Which tense is most commonly used in descriptive/personal writing?', opts: ['Past Perfect', 'Present Simple or Past Simple', 'Future Continuous', 'Past Perfect Continuous'], ans: 'Present Simple or Past Simple', exp: 'Tulisan personal biasanya menggunakan Present Simple untuk fakta/deskripsi atau Past Simple untuk kejadian yang sudah lampau.' },
    { q: 'A good paragraph ALWAYS begins with a...', opts: ['Concluding sentence', 'Random detail', 'Topic sentence', 'Quotation'], ans: 'Topic sentence', exp: 'Topic sentence adalah kalimat utama yang memperkenalkan ide pokok suatu paragraf.' },
    { q: 'Which word shows CONTRAST?', opts: ['Furthermore', 'Moreover', 'However', 'Additionally'], ans: 'However', exp: '"However" digunakan untuk menunjukkan kontras atau perubahan arah dalam argumen/cerita.' },
    { q: 'In formal writing, you should AVOID using...', opts: ['Complex sentences', 'Passive voice', 'Contractions like "don\'t" or "I\'m"', 'Adverbs of frequency'], ans: 'Contractions like "don\'t" or "I\'m"', exp: 'Kontraksi (don\'t, I\'m, it\'s) sebaiknya dihindari dalam tulisan formal. Gunakan bentuk penuh: do not, I am, it is.' },
    { q: 'What is COHESION in writing?', opts: ['Writing very long sentences', 'Using linking words so sentences connect smoothly', 'Avoiding any punctuation', 'Writing only short sentences'], ans: 'Using linking words so sentences connect smoothly', exp: 'Cohesion berarti ide dan kalimat dalam tulisan saling terhubung dengan lancar menggunakan kata penghubung (connectives).' },
    { q: 'Choose the CORRECT sentence structure:', opts: ['"Is a beautiful city Bandung."', '"Bandung is a beautiful city."', '"Beautiful is Bandung city."', '"A Bandung is beautiful city."'], ans: '"Bandung is a beautiful city."', exp: 'Kalimat bahasa Inggris yang benar mengikuti pola: Subject + Verb + Object/Complement.' },
    { q: 'Which linking word shows RESULT or CONSEQUENCE?', opts: ['Although', 'However', 'Therefore', 'Meanwhile'], ans: 'Therefore', exp: '"Therefore" menunjukkan hasil atau konsekuensi dari pernyataan sebelumnya (sebab → akibat).' },
    { q: 'What does "vivid description" mean?', opts: ['Very short writing', 'Clear, detailed, and imaginative description', 'Technical writing', 'Writing full of numbers'], ans: 'Clear, detailed, and imaginative description', exp: '"Vivid" artinya hidup dan jelas. Deskripsi yang vivid menggunakan detail spesifik dan bahasa yang imajinatif.' },
    { q: 'The CONCLUDING SENTENCE of a paragraph should...', opts: ['Introduce a completely new topic', 'Summarise or reinforce the main idea', 'List more examples', 'Ask a question'], ans: 'Summarise or reinforce the main idea', exp: 'Kalimat penutup paragraf berfungsi merangkum atau memperkuat ide utama yang telah disampaikan.' },
    { q: 'What is the purpose of a BODY PARAGRAPH?', opts: ['To introduce the topic', 'To provide details, examples, or arguments supporting the main idea', 'To conclude the text', 'To greet the reader'], ans: 'To provide details, examples, or arguments supporting the main idea', exp: 'Paragraf isi (body paragraph) berisi detail, contoh, dan argumen yang mendukung ide utama teks.' },
    { q: 'Identify the ADJECTIVE in: "She lives in a beautiful, quiet neighbourhood."', opts: ['Lives', 'Neighbourhood', 'Beautiful, quiet', 'She'], ans: 'Beautiful, quiet', exp: '"Beautiful" dan "quiet" adalah adjektif (kata sifat) yang mendeskripsikan kata benda "neighbourhood".' },
    { q: 'What does "coherence" in a text mean?', opts: ['Grammatical complexity', 'Ideas flow logically from one to the next', 'Using many long words', 'Changing topics frequently'], ans: 'Ideas flow logically from one to the next', exp: 'Coherence berarti ide-ide dalam tulisan mengalir secara logis dan mudah diikuti oleh pembaca.' },
    { q: 'Which phrase ADDS extra information?', opts: ['In contrast', 'In addition', 'As a result', 'On the other hand'], ans: 'In addition', exp: '"In addition" digunakan untuk menambah informasi baru yang mendukung atau melengkapi poin sebelumnya.' },
    { q: 'What is a SIMILE?', opts: ['A comparison using "like" or "as"', 'A direct statement of fact', 'A synonym word', 'A type of verb tense'], ans: 'A comparison using "like" or "as"', exp: 'Simile adalah perbandingan menggunakan kata "like" atau "as". Contoh: "She sings like an angel."' },
    { q: 'In writing, "show, don\'t tell" means...', opts: ['Never describe your feelings', 'Use specific details to let readers experience the feeling, not just state it', 'Only write short sentences', 'Use direct quotes only'], ans: 'Use specific details to let readers experience the feeling, not just state it', exp: '"Show, don\'t tell" berarti gunakan detail spesifik agar pembaca merasakannya sendiri, bukan sekadar menyebutkan emosinya.' },
    { q: 'What is PROOFREADING?', opts: ['Writing the first draft', 'Checking writing for errors in grammar, spelling, and punctuation', 'Reading someone else\'s work', 'Planning the essay structure'], ans: 'Checking writing for errors in grammar, spelling, and punctuation', exp: 'Proofreading adalah proses memeriksa tulisan untuk menemukan dan memperbaiki kesalahan tata bahasa, ejaan, dan tanda baca.' },
    { q: 'Which sentence uses PASSIVE VOICE?', opts: ['"I wrote the letter."', '"She reads the book."', '"The cake was baked by my mother."', '"They played football."'], ans: '"The cake was baked by my mother."', exp: 'Passive voice: to be + past participle. "Was baked" = bentuk pasif dari "baked". Objek menjadi subjek kalimat.' },
    { q: 'What makes a personal letter DIFFERENT from a formal letter?', opts: ['Personal letters never use "Dear"', 'Personal letters use friendly language, contractions, and share emotions freely', 'Formal letters are always shorter', 'There is no difference between them'], ans: 'Personal letters use friendly language, contractions, and share emotions freely', exp: 'Surat pribadi menggunakan bahasa santai, kontraksi, dan bebas mengekspresikan emosi; surat formal menggunakan bahasa baku.' },
    { q: `The best way to improve your ${topic} writing is to...`, opts: ['Only read grammar rules', 'Practise regularly and read examples of good ${topic} texts', 'Memorise all vocabulary', 'Only write in your first language'], ans: `Practise regularly and read examples of good ${topic} texts`, exp: 'Cara terbaik meningkatkan keterampilan menulis adalah dengan berlatih rutin dan membaca banyak contoh teks yang baik.' },
  ];

  const genericComp = [
    { q: `Apa jenis teks yang sedang dipelajari di Lesson ${id}?`, opts: [subtitle, 'Formal letter', 'Scientific report', 'Poetry'], ans: subtitle },
    { q: 'Apa yang dimaksud dengan "connected sentences"?', opts: ['Kalimat yang tidak berhubungan', 'Kalimat yang saling terhubung dengan kata sambung', 'Kalimat yang sangat pendek', 'Kalimat tanpa kata kerja'], ans: 'Kalimat yang saling terhubung dengan kata sambung' },
    { q: 'Berapa banyak soal kuis yang harus diselesaikan?', opts: ['5 soal', '10 soal', '15 soal', '20 soal'], ans: '20 soal' },
    { q: 'Pada level B1, kemampuan menulis yang diharapkan adalah...', opts: ['Menulis satu kata saja', `Menulis teks sederhana yang saling terhubung tentang topik familiar`, 'Menulis tesis akademik', 'Menulis cerita fiksi kompleks'], ans: `Menulis teks sederhana yang saling terhubung tentang topik familiar` },
    { q: 'Apa fungsi kata sambung (conjunctions) dalam menulis?', opts: ['Membuat kalimat lebih pendek', 'Menghubungkan dan mengalirkan ide antar kalimat', 'Menggantikan kata benda', 'Menunjukkan waktu saja'], ans: 'Menghubungkan dan mengalirkan ide antar kalimat' },
  ];

  const sampleText = `This is Lesson ${id}: ${title}. In this lesson, you will practise writing about ${subtitle.toLowerCase()}. At the B1 level, you are expected to write connected texts about familiar and interesting topics.

Think about what you want to say. Organise your ideas into clear paragraphs. Use linking words like "firstly", "however", "in addition", and "therefore" to connect your sentences.

Remember to include a topic sentence at the beginning of each paragraph, supporting details in the middle, and a conclusion at the end. Your writing should express your personal ideas, feelings, and experiences clearly.`;

  return `import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine, WritingCard, ComprehensionSection, getCompletedWritingLessons, markWritingComplete } from './writingUtils';
import type { QuizItem, ComprehensionQ } from './writingUtils';
import { BookOpen, PenTool, CheckCircle2, ChevronLeft } from 'lucide-react';

const QUIZ: QuizItem[] = [
${genericQuiz.map(q => `  { q: '${q.q.replace(/'/g, "\\'")}', opts: [${q.opts.map(o => `"${o.replace(/"/g, '\\"')}"`).join(',')}], ans: "${q.ans.replace(/"/g, '\\"')}", exp: '${q.exp.replace(/'/g, "\\'")}' },`).join('\n')}
];

const COMPREHENSION: { passageTitle: string; passage: React.ReactNode; questions: ComprehensionQ[] } = {
  passageTitle: '✍️ Contoh Teks: ${title}',
  passage: (
    <>
      <div className="bg-amber-50 p-6 font-serif rounded-xl border border-amber-100 shadow-inner text-slate-800 leading-relaxed">
        ${sampleText.split('\n\n').map(p => `<p className="mb-4">${p}</p>`).join('\n        ')}
      </div>
    </>
  ),
  questions: [
${genericComp.map(q => `    { q: '${q.q.replace(/'/g, "\\'")}', opts: [${q.opts.map(o => `"${o.replace(/"/g, '\\"')}"`).join(',')}], ans: "${q.ans.replace(/"/g, '\\"')}" },`).join('\n')}
  ],
};

export default function InterWritingLesson${id}(): React.ReactElement {
  const navigate = useNavigate();
  const nextPath = '${nextPath}';
  const [isCompleted, setIsCompleted] = useState(() => getCompletedWritingLessons().includes(${id}));
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'baca' | 'latihan' | 'kuis'>('baca');

  const handleComplete = () => { markWritingComplete(${id}); setIsCompleted(true); setShowModal(true); };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 animate-fade-in" style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }} onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-[2rem] p-8 max-w-sm w-full text-center shadow-2xl relative overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-amber-400 to-orange-500 rounded-t-[2rem] -z-10" />
            <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 bg-white shadow-xl border-4 border-amber-50 mt-4">
              <span className="text-5xl">🏆</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-800 mb-2">Lesson Selesai! 🎉</h2>
            <p className="text-slate-500 mb-8 leading-relaxed">Selamat! Kamu berhasil mempelajari materi menulis Level <b>B1 (Intermediate)</b>.</p>
            <div className="space-y-3">
              <button onClick={() => { setShowModal(false); navigate(nextPath); }} className="w-full py-4 rounded-xl font-bold text-white bg-amber-500 hover:bg-amber-600 shadow-lg shadow-amber-200 transition-all active:scale-95">Pelajari Materi Selanjutnya</button>
              <button onClick={() => setShowModal(false)} className="w-full py-4 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all">Tutup</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col h-[100dvh] md:h-[calc(100vh-2rem)] bg-slate-50 md:rounded-3xl overflow-hidden shadow-2xl md:max-w-4xl md:mx-auto md:my-4 border border-slate-200">
        <header className="flex-none bg-white/80 backdrop-blur-xl sticky top-0 z-20 border-b border-slate-100 shadow-sm transition-all py-3 px-4">
          <div className="flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-600 transition-colors">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="text-center">
              <h1 className="text-base font-extrabold text-slate-800 tracking-tight">${title}</h1>
              <p className="text-[10px] text-amber-600 font-bold uppercase tracking-widest bg-amber-50 inline-block px-2 py-0.5 rounded-full mt-0.5">B1 Writing • Lesson ${id}</p>
            </div>
            <button onClick={() => navigate(nextPath)} className="px-4 py-2 rounded-full text-xs font-bold text-amber-600 bg-amber-50 hover:bg-amber-100 transition-colors">Next ›</button>
          </div>
        </header>

        <div className="flex bg-white border-b border-slate-100 sticky top-[65px] z-10 shadow-sm p-2 gap-2">
          {(['baca', 'latihan', 'kuis'] as const).map((tab) => {
            const labels = { baca: 'Materi', latihan: 'Pemahaman', kuis: 'Kuis 20 Soal' };
            const icons = { baca: <BookOpen className="w-4 h-4" />, latihan: <PenTool className="w-4 h-4" />, kuis: <CheckCircle2 className="w-4 h-4" /> };
            const isActive = activeTab === tab;
            return (
              <button key={tab} onClick={() => setActiveTab(tab)} className={\`flex-1 py-3 text-sm font-bold tracking-wide transition-all rounded-xl flex items-center justify-center gap-2 \${isActive ? 'bg-amber-500 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}\`}>
                {icons[tab]} {labels[tab]}
              </button>
            );
          })}
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-8 pb-28 space-y-6">
            {activeTab === 'baca' && (
              <div className="animate-fade-in space-y-6">
                <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-10">
                    <BookOpen className="w-32 h-32" />
                  </div>
                  <div className="text-4xl mb-3 relative z-10">${heroEmoji}</div>
                  <h2 className="text-xl md:text-2xl font-extrabold mb-2 relative z-10">${title}</h2>
                  <p className="text-sm md:text-base text-amber-100 leading-relaxed max-w-lg relative z-10">
                    ${heroDesc}
                  </p>
                </div>

                <WritingCard title="Petunjuk Belajar" icon="💡">
                  <p className="text-sm text-slate-700 mb-3 leading-relaxed">
                    Di lesson ini, kamu akan mempelajari cara menulis <strong>${subtitle}</strong> dengan baik. Perhatikan:
                  </p>
                  <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside bg-slate-50 p-4 rounded-xl">
                    <li><strong className="text-slate-800">Struktur:</strong> Paragraf pembuka, isi, dan penutup</li>
                    <li><strong className="text-slate-800">Kohesi:</strong> Gunakan kata sambung untuk menghubungkan kalimat</li>
                    <li><strong className="text-slate-800">Kosakata:</strong> Gunakan kata-kata yang sesuai dengan topik</li>
                    <li><strong className="text-slate-800">Ekspresi Pribadi:</strong> Sertakan perasaan dan pendapat kamu</li>
                  </ul>
                  <p className="text-sm text-slate-700 mt-4 font-medium italic">
                    Lanjut ke tab <b>Pemahaman</b> untuk membaca contoh teks!
                  </p>
                </WritingCard>

                <WritingCard title="Topik: ${subtitle}" icon="📌">
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'Level', val: 'B1 Intermediate' },
                      { label: 'Jenis Teks', val: '${topic}' },
                      { label: 'Soal Kuis', val: '20 soal' },
                      { label: 'Fokus', val: 'Writing Skills' },
                    ].map(item => (
                      <div key={item.label} className="bg-amber-50 rounded-xl p-3 border border-amber-100">
                        <p className="text-[10px] font-bold text-amber-600 uppercase mb-1">{item.label}</p>
                        <p className="text-xs font-bold text-slate-800">{item.val}</p>
                      </div>
                    ))}
                  </div>
                </WritingCard>
              </div>
            )}

            {activeTab === 'latihan' && <ComprehensionSection {...COMPREHENSION} />}
            {activeTab === 'kuis' && <QuizEngine items={QUIZ} onComplete={handleComplete} />}
          </div>
        </div>

        <div className="sticky bottom-0 z-30 bg-white/90 backdrop-blur-xl border-t border-slate-200 p-4">
          <button onClick={isCompleted ? () => navigate(-1) : handleComplete} className="w-full py-4 rounded-2xl font-bold text-white flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all hover:shadow-xl" style={{ background: isCompleted ? 'linear-gradient(135deg,#10B981,#059669)' : 'linear-gradient(135deg,#F39C12,#E67E22)' }}>
            <CheckCircle2 className="w-5 h-5" />
            {isCompleted ? 'Sudah Selesai ✓ (Kembali)' : 'Tandai Selesai ✓'}
          </button>
        </div>
      </div>
    </>
  );
}
`;
}

// ── Write all files ──────────────────────────────────────────────────────
console.log('Generating Intermediate Writing module...');

// writingUtils.tsx
fs.writeFileSync(path.join(OUT_DIR, 'writingUtils.tsx'), UTILS_CONTENT, 'utf8');
console.log('✓ writingUtils.tsx');

// WritingPage.tsx
fs.writeFileSync(path.join(OUT_DIR, 'WritingPage.tsx'), WRITING_PAGE, 'utf8');
console.log('✓ WritingPage.tsx');

// Lessons 1, 2, 3 (detailed)
for (const lesson of LESSONS) {
  const content = buildLessonTsx(lesson);
  fs.writeFileSync(path.join(OUT_DIR, `Lesson${lesson.id}.tsx`), content, 'utf8');
  console.log(`✓ Lesson${lesson.id}.tsx`);
}

// Lessons 4-20 (generic template)
for (const meta of LESSON_META) {
  const content = buildGenericLessonTsx(meta);
  fs.writeFileSync(path.join(OUT_DIR, `Lesson${meta.id}.tsx`), content, 'utf8');
  console.log(`✓ Lesson${meta.id}.tsx`);
}

console.log('\n✅ All writing module files generated successfully!');
console.log(`📁 Output: ${OUT_DIR}`);
