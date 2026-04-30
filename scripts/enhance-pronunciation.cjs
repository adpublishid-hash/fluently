const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '../src/pages/module/english/upper-intermediate/pronunciation');

// Enhanced EXAMPLES (word-stress cards) and POINTS (practice tips)
// EXAMPLES format: { word, ipa, meaning } – 10 items per lesson
// POINTS format: string[] – bullet points about the rule

const ENHANCED = {
  1: { // Word Stress in Multi-syllable Words
    examples: [
      { word: "PHOtograph", ipa: "/ˈfəʊtəɡrɑːf/", meaning: "Foto – tekanan pada suku PERTAMA (noun)" },
      { word: "phoTOGraphy", ipa: "/fəˈtɒɡrəfi/", meaning: "Fotografi – tekanan pada suku KEDUA (sebelum -y)" },
      { word: "photoGRAPHic", ipa: "/ˌfəʊtəˈɡræfɪk/", meaning: "Fotografis – tekanan pada suku KETIGA (sebelum -ic)" },
      { word: "ECOnomy", ipa: "/ɪˈkɒnəmi/", meaning: "Ekonomi – tekanan suku kedua" },
      { word: "ecoNOMic", ipa: "/ˌiːkəˈnɒmɪk/", meaning: "Ekonomik – tekanan geser ke suku tiga" },
      { word: "econoMIcally", ipa: "/ˌiːkəˈnɒmɪkli/", meaning: "Secara ekonomis – tekanan tetap di posisi sama" },
      { word: "COMplex (n/adj)", ipa: "/ˈkɒmpleks/", meaning: "Kompleks (kata benda/sifat) – tekanan suku PERTAMA" },
      { word: "comPLEX (v)", ipa: "/kəmˈpleks/", meaning: "Mengkomplekskan (kata kerja) – tekanan suku KEDUA" },
      { word: "SYNthesis", ipa: "/ˈsɪnθɪsɪs/", meaning: "Sintesis – tekanan suku pertama" },
      { word: "synTHEtic", ipa: "/sɪnˈθetɪk/", meaning: "Sintetis – tekanan geser ke suku dua (-ic rule)" }
    ],
    points: [
      "**Prinsip Dasar:** Word stress bersifat tetap dan mempengaruhi makna. Kata yang sama bisa berganti makna saat stressnya berubah.",
      "**Noun/Adjective vs Verb:** Banyak kata 2 suku dapat berubah stress: **RE**cord (n) → re**CORD** (v) | **PRE**sent (n) → pre**SENT** (v)",
      "**Aturan Akhiran -tion, -sion, -ic, -ical:** Tekanan selalu tepat SEBELUM akhiran: commu**NI**cation | eco**NO**mic | his**TOR**ical",
      "**Akhiran -ity, -ogy, -ography:** Tekanan dua suku sebelum akhiran: **na**tion**AL**ity (no – na**TION**ality) | bi**OL**ogy | pho**TOG**raphy",
      "**Akhiran -ate, -ize, -fy (3+ suku):** Tekanan tiga suku dari akhir: **AP**preciate | **OR**ganize | **CLAR**ify",
      "**Word families – stress bergeser:** Berlatih keluarga kata: **PHO**to → pho**TO**graphy → pho**TO**grapher → pho**TO**graphic – catat pergeserannya!"
    ]
  },
  2: { // Connected Speech & Weak Forms
    examples: [
      { word: "of → /əv/", ipa: "/əv/", meaning: "Weak form: 'a lot **of** time' = /ə ˈlɒt əv ˈtaɪm/" },
      { word: "to → /tə/", ipa: "/tə/", meaning: "Weak form: 'go **to** school' = /ˈɡəʊ tə ˈskuːl/" },
      { word: "for → /fə/", ipa: "/fə/", meaning: "Weak form: 'wait **for** me' = /ˈweɪt fə ˈmiː/" },
      { word: "and → /ən/", ipa: "/ən/", meaning: "Weak form: 'fish **and** chips' = /ˈfɪʃ ən ˈtʃɪps/" },
      { word: "the → /ðə/", ipa: "/ðə/", meaning: "Weak form (before consonant): '**the** book' = /ðə ˈbʊk/" },
      { word: "can → /kən/", ipa: "/kən/", meaning: "Weak form: 'you **can** do it' = /jə kən ˈduː ɪt/" },
      { word: "have → /həv/", ipa: "/həv/ or /əv/", meaning: "Weak form: 'they **have** gone' = /ðeɪ həv ˈɡɒn/" },
      { word: "want to → /ˈwɒnə/", ipa: "/ˈwɒnə/", meaning: "Reduction (casual): 'I want to go' = /aɪ ˈwɒnə ˈɡəʊ/'" },
      { word: "should have → /ˈʃʊdəv/", ipa: "/ˈʃʊdəv/", meaning: "Modal perfect reduction: 'should've done it'" },
      { word: "going to → /ˈɡɒnə/", ipa: "/ˈɡɒnə/", meaning: "Reduction (casual): 'I'm going to study' = /aɪm ˈɡɒnə ˈstʌdi/'" }
    ],
    points: [
      "**Kata Tugas (Function Words)** seperti 'the, a, of, to, for, and, can, have' hampir SELALU memiliki weak form dalam kalimat.",
      "**Strong form** hanya muncul ketika kata tersebut ditekankan: 'Not BECAUSE of that – FOR that.' – 'for' = strong /fɔː/",
      "**Gunakan weak forms** untuk terdengar lebih alami. Sering menggunakan strong forms membuat ucapan terdengar kaku.",
      "**Hindari di tulisan formal:** Reducsi seperti 'gonna', 'wanna', 'shoulda' = hanya untuk percakapan, TIDAK di tulisan resmi.",
      "**Latihan listening:** Dengarkan podcast atau wawancara BBC dan perhatikan bagaimana penutur asli memperlemah function words.",
      "**Aturan the:** /ðə/ sebelum konsonan ('the book') | /ðiː/ sebelum vokal ('the apple') – ini juga berlaku dalam kecepatan normal."
    ]
  },
  3: { // Intonation for Questions & Statements
    examples: [
      { word: "Are you COMING? ↗", ipa: "Rising", meaning: "Yes/No question – selalu naik di akhir" },
      { word: "WHERE are you going? ↘", ipa: "Falling", meaning: "Wh-question – turun di kata tanya" },
      { word: "She's a teacher. ↘", ipa: "Falling", meaning: "Statement – turun = kepastian" },
      { word: "She's a teacher? ↗", ipa: "Rising", meaning: "Echo question – naik = terkejut/tidak percaya" },
      { word: "tea ↗, coffee ↗, or water ↘", ipa: "List pattern", meaning: "Naik di tiap item, turun di item terakhir" },
      { word: "It's hot, ↗ isn't it? ↘", ipa: "Tag – confirmation", meaning: "Statement naik, tag turun = meminta konfirmasi" },
      { word: "It's hot, ↘ isn't it? ↗", ipa: "Tag – genuine", meaning: "Statement turun, tag naik = pertanyaan sungguhan" },
      { word: "That's INteresting. ↘↗", ipa: "Fall-rise", meaning: "Turun-naik = sopan tapi sedikit ragu/skeptis" },
      { word: "HOWever ↘", ipa: "Fall on 'how-'", meaning: "Discourse marker: tekanan + nada turun = kontras" },
      { word: "From my PERSpective, ↗", ipa: "Rise on last stress", meaning: "Introductory phrase naik – lebih banyak yang akan diucapkan" }
    ],
    points: [
      "**Intonation bukan hanya estetika** – ia membawa makna gramatikal. Salah intonasi bisa mengubah jenis kalimat.",
      "**Yes/No questions selalu naik ↗:** 'Are you sure?' | 'Is this correct?' – naik di akhir kalimat.",
      "**Wh-questions biasanya turun ↘:** 'Where did you go?' | 'What time is it?' – turun di akhir.",
      "**Fall-rise ↘↗ menandakan keraguan atau politeness:** 'I'm not sure... ↘↗' | 'That's an interesting point ↘↗ but...'",
      "**Tag questions:** Jika ragu, tag naik ↗. Jika sudah yakin dan cuma verifikasi, tag turun ↘.",
      "**Latihan:** Rekam dirimu membaca kalimat yang sama dengan 3 intonasi berbeda dan perhatikan perubahan maknanya."
    ]
  },
  4: { // Stress Patterns in Sentences
    examples: [
      { word: "CONTENT words", ipa: "Nouns, verbs, adjectives, adverbs", meaning: "Kata konten = selalu diberi tekanan dalam kalimat" },
      { word: "function words", ipa: "Articles, prepositions, conjunctions", meaning: "Kata fungsi = biasanya tidak ditekan; gunakan weak form" },
      { word: "SHE is the BEST canDIdate.", ipa: "/ʃi ɪz ðə ˈbest ˈkændɪdɪt/", meaning: "'she', 'is', 'the' = lemah; 'best', 'candidate' = ditekan" },
      { word: "I didn't say she STOLE it.", ipa: "Stress on 'stole'", meaning: "Kontrastif: dia melakukan hal lain (bukan mencuri)" },
      { word: "I didn't SAY she stole it.", ipa: "Stress on 'say'", meaning: "Kontrastif: aku mengimplisasikannya, tidak mengatakannya" },
      { word: "I DIDN'T say she stole it.", ipa: "Stress on 'didn't'", meaning: "Kontrastif: penolakan – aku tidak mengatakannya sama sekali" },
      { word: "Tonic stress", ipa: "Last main stressed word", meaning: "Kata konten terakhir dalam unit nada biasanya menerima tekanan tonik" },
      { word: "De-accenting", ipa: "Given information loses stress", meaning: "'I have a CAR. The car is RED.' – 'car' kehilangan tekanan di kalimat kedua" },
      { word: "Wide vs narrow focus", ipa: "All vs one content word", meaning: "Wide: semua kata konten ditekan (jawaban umum). Narrow: satu ditekan (koreksi/kontras)" },
      { word: "FIVE people (correction)", ipa: "Narrow stress", meaning: "'No, I said FIVE – not fifteen.' – narrow focus untuk koreksi" }
    ],
    points: [
      "**Konten vs Fungsi:** Kata konten (noun, verb utama, adjective, adverb) = DITEKAN. Kata fungsi (article, preposition, pronoun lemah) = tidak ditekan.",
      "**Tekanan kontrastif** sangat kuat dalam bahasa Inggris. Kalimat 'I didn't say SHE stole it' (bukan dia tapi orang lain) vs 'I DIDN'T say she stole it' (saya sama sekali tidak bicara) = makna berbeda!",
      "**De-accenting:** Informasi yang sudah diketahui pendengar kehilangan tekanan. Pertama sebut sesuatu = ditekan; disebutkan lagi = tidak ditekan.",
      "**Kesalahan umum:** Menekanan terlalu banyak kata atau terlalu merata membuat ucapan terdengar monoton dan tidak alami.",
      "**Latihan praktis:** Bayangkan konteks yang berbeda untuk kalimat yang sama dan ubah posisi tekanannya. Perhatikan bagaimana maknanya berubah.",
      "**Dalam presentasi akademik:** Tandai kata kunci di script Anda sebelum berbicara – ini membantu memastikan tekanan pada informasi baru dan penting."
    ]
  },
  5: { // Vowel Reduction & Schwa Sound
    examples: [
      { word: "schwa /ə/", ipa: "/ə/", meaning: "Vokal paling umum di Inggris – muncul di SEMUA suku tak bertekanan" },
      { word: "about", ipa: "/əˈbaʊt/", meaning: "Suku pertama 'a-' → schwa /ə/" },
      { word: "today", ipa: "/təˈdeɪ/", meaning: "'to' → /tə/ (schwa dalam connected speech)" },
      { word: "policeman", ipa: "/pəˈliːsmən/", meaning: "'po-' dan '-man' keduanya schwa" },
      { word: "banana", ipa: "/bəˈnɑːnə/", meaning: "3 suku kata: 2 di antaranya schwa" },
      { word: "government", ipa: "/ˈɡʌvənmənt/", meaning: "Suku tengah '-ern-' diperlemah menjadi schwa" },
      { word: "international", ipa: "/ˌɪntəˈnæʃənəl/", meaning: "Me-ngandung 4 schwa: in-ter-na-shon-al" },
      { word: "consider", ipa: "/kənˈsɪdə/", meaning: "Kedua suku tak bertekanan = schwa" },
      { word: "particular", ipa: "/pəˈtɪkjʊlə/", meaning: "'par-' dan '-lar' = schwa di British English" },
      { word: "comfortable", ipa: "/ˈkʌmftəbəl/", meaning: "Diucapkan 3 suku: /ˈkʌmf.tə.bəl/ – bukan 4 suku" }
    ],
    points: [
      "**Schwa /ə/ adalah vokal paling sering dalam bahasa Inggris** – lebih umum dari vokal lainnya. Hanya muncul di suku TIDAK BERTEKANAN.",
      "**Cara melatih schwa:** Katakan kata dengan tekanan penuh terlebih dahulu, lalu 'lemahkan' suku yang tidak ditekan. Itu dia schwanya.",
      "**Bukan hanya 'e' – schwa bisa berasal dari huruf apa saja:** 'a' dalam 'about' | 'o' dalam 'police' | 'ai' dalam 'mountain' | 'ou' dalam 'famous'",
      "**Bahasa Inggris tanpa schwa terdengar kaku:** Mengucapkan semua vokal dengan penuh membuat ucapan terdengar seperti membaca kamus, bukan berbicara alami.",
      "**Kalimat latihan:** Hitung schwa dalam: 'The government announced a particular economic strategy' – setidaknya 6-8 schwa!",
      "**Perhatian:** Schwa TIDAK digunakan ketika suku kata ditekan untuk tujuan kontrastif: 'I said ABOUT, not AROUND.' – 'about' disini bukan schwa karena ditekankan."
    ]
  },
  6: { // Consonant Clusters & Final Sounds
    examples: [
      { word: "strength", ipa: "/streŋkθ/", meaning: "7 fonem – salah satu cluster paling kompleks di Inggris" },
      { word: "twelfth", ipa: "/twelfθ/", meaning: "Cluster akhir sangat kompleks: -lf + th" },
      { word: "text", ipa: "/tekst/", meaning: "Cluster akhir: -kst (3 konsonan)" },
      { word: "/θ/ – think", ipa: "/θɪŋk/", meaning: "Dental frikatif tak bersuara – lidah ke gigi atas" },
      { word: "/ð/ – this", ipa: "/ðɪs/", meaning: "Dental frikatif bersuara – lidah ke gigi atas, suara muncul" },
      { word: "elision: last time", ipa: "/ˈlɑːs taɪm/", meaning: "Elisi: /d/ atau /t/ hilang sebelum konsonan di connected speech" },
      { word: "assimilation: ten boys", ipa: "/ˈtem bɔɪz/", meaning: "Asimilasi: 'n' → 'm' sebelum bilabial /b/" },
      { word: "dogs vs. cats", ipa: "/dɒɡz/ vs /kæts/", meaning: "Akhir -s: /z/ setelah konsonan bersuara, /s/ setelah tak bersuara" },
      { word: "button", ipa: "/ˈbʌtn̩/", meaning: "Konsonan silabik: 'n' menggantikan suku tak bertekanan" },
      { word: "sixths", ipa: "/sɪksθs/", meaning: "Cluster 4 konsonan: -ksts – sangat menantang!" }
    ],
    points: [
      "**Bahasa Inggris memiliki cluster konsonan yang sangat kompleks.** Jangan memasukkan vokal di antara konsonan! 'street' = /striːt/ bukan /sɨtriːt/",
      "**Elision dalam connected speech:** Final /t/ dan /d/ sering hilang sebelum konsonan: 'last night' = /ˈlɑːs naɪt/ | 'old friend' = /ˈəʊl frend/",
      "**Asimilasi:** Konsonan berubah sesuai konsonan berikutnya: 'ten boys' = /ˈtem bɔɪz/ (/n/ → /m/ sebelum /b/) | 'this year' = /ðɪʃ ˈjɪə/",
      "**Suara /θ/ dan /ð/ sangat khas bahasa Inggris** – tidak ada dalam banyak bahasa lain. Latihan khusus diperlukan: lidah HARUS menyentuh bagian belakang gigi atas.",
      "**Akhiran -s voiced/voiceless:** books /bʊks/, bags /bæɡz/, churches /ˈtʃɜːtʃɪz/ – tentukan berdasarkan konsonan akhir kata dasar.",
      "**Latihan cluster:** Ucapkan perlahan: 'strengths', 'twelfths', 'sixths', 'texts' – pastikan SEMUA konsonan terdengar."
    ]
  },
  7: { // Linking Sounds in Natural Speech
    examples: [
      { word: "Consonant + Vowel link", ipa: "C→V", meaning: "'take_it' → /ˈteɪ.kɪt/ | 'an_apple' → /ə.ˈnæ.pəl/" },
      { word: "an orange", ipa: "/əˈnɒrɪndʒ/", meaning: "'an' + 'orange' → terdengar seperti 'a-norange'" },
      { word: "hold on", ipa: "/ˈhəʊl.dɒn/", meaning: "Final /d/ links to initial vowel of next word" },
      { word: "Intrusive /r/", ipa: "/r/ inserted", meaning: "'law and order' → /ˈlɔːr ən ˈɔːdə/ – /r/ disisipkan setelah /ɔː/" },
      { word: "the idea of", ipa: "/ðə aɪˈdɪər əv/", meaning: "Intrusive /r/ setelah /ə/ sebelum vokal: idea_r_of" },
      { word: "go out (linking /w/)", ipa: "/ˈɡəʊ.waʊt/", meaning: "Linking /w/ disisipkan setelah vokal belakang bulat" },
      { word: "who else", ipa: "/ˈhuːwels/", meaning: "Linking /w/ setelah /uː/" },
      { word: "say it (linking /j/)", ipa: "/ˈseɪ.jɪt/", meaning: "Linking /j/ setelah diftong /eɪ/ sebelum vokal" },
      { word: "my opinion", ipa: "/maɪˈjəpɪnjən/", meaning: "Linking /j/ setelah /aɪ/ sebelum vokal" },
      { word: "Vowel hiatus (no link)", ipa: "Two separate vowels", meaning: "Dalam beberapa kasus formal, dua vowal dipisahkan dengan glottal stop /ʔ/" }
    ],
    points: [
      "**Bahasa Inggris selalu bertendensi menghindari hiatus** (dua vokal berdekatan tanpa konsonan). Itulah mengapa linking sounds muncul secara alami.",
      "**Linking C→V paling umum:** Konsonan akhir kata pertama 'bergabung' dengan vokal awal kata berikutnya: 'fill_it_in' → /ˈfɪ.lɪ.tɪn/",
      "**Intrusive /r/ adalah fitur RP British English:** 'Law and order' / 'the idea of' – penutur asli British secara natural menyisipkan /r/ di sini, bahkan ketika tidak ada huruf 'r' di spelled form.",
      "**Linking /j/:** Setelah vokal depan /iː, ɪ, eɪ, aɪ, ɔɪ/ yang diakhiri dengan /j/ glide – 'she_y_ate' | 'I_y_am' | 'they_y_are'",
      "**Linking /w/:** Setelah vokal belakang bulat /uː, ʊ, əʊ, aʊ/ – 'do_w_it' | 'go_w_out' | 'allow_w_us'",
      "**Kesalahan umum:** Memperkenalkan glottal stop /ʔ/ di antara kata dengan suara terlalu terputus dan memperkenalkan jeda tidak alami."
    ]
  },
  8: { // Rhythm & Stress Timing
    examples: [
      { word: "Dogs eat bones.", ipa: "/ˈdɒɡz ˈiːt ˈbəʊnz/", meaning: "3 ketukan – 3 kata bertekanan" },
      { word: "The dogs are eating bones.", ipa: "/ðə ˈdɒɡz ər ˈiːtɪŋ ˈbəʊnz/", meaning: "Masih 3 ketukan! 'the', 'are' dikecilkan" },
      { word: "The big dogs are eating bones.", ipa: "/ðə ˌbɪɡ ˈdɒɡz ər ˈiːtɪŋ ˈbəʊnz/", meaning: "4 ketukan sekarang (big ditambahkan)" },
      { word: "Isochrony", ipa: "/aɪˈsɒkrəni/", meaning: "Prinsip bahwa ketukan bertekanan terjadi pada interval yang kira-kira sama" },
      { word: "probably → /ˈprɒbli/", ipa: "/ˈprɒbli/", meaning: "3 suku dikurangi jadi 2 dalam ucapan cepat" },
      { word: "da-DUM-da-da-DUM", ipa: "Pola iamb", meaning: "Pola ritme khas bahasa Inggris: suku lemah lalu kuat" },
      { word: "Weak syllable 'squeezing'", ipa: "Unstressed syllables compress", meaning: "Suku tak bertekanan 'diperas' di antara ketukan sehingga ketukan tetap berjarak sama" },
      { word: "Cleft sentence rhythm", ipa: "It WAS he who TOLD her.", meaning: "Struktur khusus menekankan informasi baru dengan ritme yang jelas" },
      { word: "Academic reading pace", ipa: "~130-150 words/min", meaning: "Presentasi akademik = lebih lambat dari percakapan (~200 wpm)" },
      { word: "Tempo variation", ipa: "Slow down on key points", meaning: "Penutur yang baik MEMPERLAMBAT pada poin penting untuk menekankannya" }
    ],
    points: [
      "**Bahasa Inggris adalah bahasa STRESS-TIMED** (bukan syllable-timed seperti bahasa Prancis/Indonesia). Ketukan bertekanan terjadi pada interval yang kira-kira sama, bukan setiap suku kata.",
      "**Efeknya:** Suku tak bertekanan 'diperas' antara ketukan bertekanan. Makin banyak suku tak bertekanan, makin cepat mereka diucapkan.",
      "**Latihan ritme klasik:** Ucapkan semua versi berikut dengan kecepatan yang SAMA: 'Cats eat mice.' | 'Cats eating mice' | 'The cats are eating mice' | 'The cats have been eating mice.'",
      "**Jangan menekanan setiap suku kata!** Ini kesalahan umum penutur non-native yang membuat ucapan terdengar 'robotic' dan sulit dipahami.",
      "**Dalam presentasi:** Variasikan tempo. Perlambat saat ada poin penting, percepat saat backgrounding, beri jeda sebelum kata kunci untuk efek dramatis.",
      "**Ritme dalam kalimat panjang:** Bagi kalimat panjang menjadi 'sense groups' (kelompok makna) – setiap kelompok memiliki ritme tersendiri dengan satu puncak tekanan."
    ]
  },
  9: { // British vs American Pronunciation
    examples: [
      { word: "bath: RP /bɑːθ/ GA /bæθ/", ipa: "BATH vowel", meaning: "RP menggunakan /ɑː/ panjang; GA menggunakan /æ/ pendek dalam bath, class, path, can't" },
      { word: "car: RP /kɑː/ GA /kɑːr/", ipa: "Rhotic", meaning: "GA adalah rhotic – semua /r/ diucapkan; RP tidak mengucapkan /r/ sebelum konsonan/akhir kata" },
      { word: "lot: RP /lɒt/ GA /lɑːt/", ipa: "LOT vowel", meaning: "RP /ɒ/ bulat; GA /ɑː/ tak bulat – kata: hot, lot, not, top, stop" },
      { word: "butter: RP /ˈbʌtə/ GA /ˈbʌɾər/", ipa: "T-flapping", meaning: "GA: /t/ antara vokal → flap /ɾ/ (mirip /d/ singkat): butter, better, water, city" },
      { word: "new: RP /njuː/ GA /nuː/", ipa: "Yod-dropping", meaning: "GA menghilangkan /j/ setelah /n/, /t/, /d/: new, tune, dune" },
      { word: "advertisement: RP /ədˈvɜːtɪsmənt/ GA /ˈædvərtaɪzmənt/", ipa: "Stress difference", meaning: "Perbedaan stress antar aksen – ada banyak kata seperti ini" },
      { word: "either: RP /ˈaɪðə/ GA /ˈiːðər/", ipa: "Vowel difference", meaning: "RP /aɪ/; GA /iː/ – juga: neither, leisure" },
      { word: "schedule: RP /ˈʃedjuːl/ GA /ˈskedjuːl/", ipa: "Initial consonant", meaning: "RP /ʃ/; GA /sk/ – perbedaan konsonan awal" },
      { word: "Global English norm", ipa: "International intelligibility", meaning: "Di tingkat B2: tujuan utama adalah intelligibility global, bukan meniru native accent sepenuhnya" },
      { word: "BBC vs CNN accent", ipa: "RP vs GA", meaning: "RP = Received Pronunciation (Standard British) | GA = General American" }
    ],
    points: [
      "**4 perbedaan utama RP vs GA:** (1) BATH vowel /ɑː/ vs /æ/ | (2) Rhoticity (GA mengucapkan r, RP tidak) | (3) LOT vowel /ɒ/ vs /ɑː/ | (4) T-flapping di GA",
      "**Pilihlah satu aksen dan kuasai** – konsistensi lebih penting dari mencampur. Namun penutur B2 harus bisa memahami keduanya.",
      "**T-flapping (GA):** 'water' diucapkan hampir seperti 'wader' | 'better' → 'bedder' | 'city' → 'siddy'. Ini fitur khas GA yang sangat mencolok.",
      "**Yod-dropping (GA):** 'new' = /nuː/ bukan /njuː/ | 'tune' = /tuːn/ bukan /tjuːn/ | 'dune' = /duːn/ bukan /djuːn/",
      "**English as a Lingua Franca (ELF):** Dalam konteks internasional, beberapa fitur (seperti konsonan /θ/ dan /ð/, word stress) lebih penting untuk intelligibility dari pada meniru aksen native.",
      "**Dengarkan keduanya:** Gunakan BBC News (RP) dan NPR/CNN (GA) sebagai sumber listening. Perhatikan perbedaan dengan contoh kata yang sama."
    ]
  },
  10: { // Stress in Compound Nouns & Phrases
    examples: [
      { word: "BLACKbird (compound noun)", ipa: "/ˈblækbɜːd/", meaning: "Burung hitam jenis tertentu – stress PERTAMA (ini tidak harus hitam!)" },
      { word: "black BIRD (adj + noun)", ipa: "/ˌblæk ˈbɜːd/", meaning: "Burung yang berwarna hitam – stress KEDUA" },
      { word: "GREENhouse (compound)", ipa: "/ˈɡriːnhaʊs/", meaning: "Rumah kaca untuk tanaman – stress PERTAMA" },
      { word: "green HOUSE (adj + noun)", ipa: "/ˌɡriːn ˈhaʊs/", meaning: "Rumah yang dicat hijau – stress KEDUA" },
      { word: "POST office", ipa: "/ˈpəʊst ˌɒfɪs/", meaning: "Kantor pos – compound noun, stress PERTAMA" },
      { word: "FOOD chain", ipa: "/ˈfuːd tʃeɪn/", meaning: "Rantai makanan – compound noun, stress PERTAMA" },
      { word: "Look UP (phrasal verb)", ipa: "/ˈlʊk ʌp/", meaning: "Phrasal verb: stress pada PARTICLE 'up', bukan verba" },
      { word: "LOOK-out (compound noun from PV)", ipa: "/ˈlʊkaʊt/", meaning: "Pengawas – compound noun dari phrasal verb, stress PERTAMA" },
      { word: "BBC (initialism)", ipa: "/ˌbiː biː ˈsiː/", meaning: "Initialism: setiap huruf dieja; stress pada huruf TERAKHIR" },
      { word: "BUSINESS meeting (compound adj)", ipa: "/ˈbɪznɪs ˌmiːtɪŋ/", meaning: "Compound modifier: stress PERTAMA" }
    ],
    points: [
      "**Aturan compound noun:** Kata benda majemuk hampir SELALU memiliki stress pada elemen PERTAMA: BUS stop | WINdow sill | TUNnel vision | BREAK-through",
      "**Aturan adjective + noun:** Ketika adjective + noun (bukan compound), stress jatuh pada NOUN (elemen kedua): a BIG cat (bukan BIGcat) | a FAST car",
      "**Cara membedakan:** Compound noun memiliki MAKNA KHUSUS yang lebih dari sekadar penjumlahan kata-katanya. 'Blackbird' = spesies tertentu, bukan sekadar burung yang hitam.",
      "**Phrasal verbs:** Stress pada PARTICLE: look UP | turn DOWN | carry OUT. Namun noun yang dibentuk dari phrasal verb = stress pertama: LOOK-out | BREAK-down | TURN-out",
      "**Initialisms vs acronyms:** BBC (spelled out) = stress pada huruf terakhir /ˌbiː biː ˈsiː/. NASA (diucapkan sebagai kata) = stress normal /ˈnæsə/.",
      "**Latihan:** Cari 10 compound nouns yang Anda ketahui dan latihan stressnya. Perhatikan: fireworks, bookshelf, sunflower, bedroom, toothbrush."
    ]
  },
  11: { // Nuclear Stress & Emphasis
    examples: [
      { word: "Default nuclear stress", ipa: "Last content word", meaning: "Default: stress tonik pada kata konten TERAKHIR dalam unit nada" },
      { word: "She's going to PARIS.", ipa: "Paris = new info", meaning: "Paris = informasi baru → nuclear stress default" },
      { word: "SHE's going to Paris.", ipa: "Contrastive – 'she', not he", meaning: "Stress kontrastif: memindahkan nuclear stress ke 'she' untuk kontras" },
      { word: "She's GOING to Paris.", ipa: "Confirming the action", meaning: "Stress kontrastif: menegaskan tindak lanjutnya" },
      { word: "De-accent given info", ipa: "Old info = unstressed", meaning: "'I want a DOG. The DOG should be small.' – 'dog' tak ditekan di kalimat kedua" },
      { word: "Narrow focus + correction", ipa: "Only key word stressed", meaning: "'Not FIFTEEN – FIVE people.' – narrow focus untuk koreksi" },
      { word: "Wide focus + new info", ipa: "All content stressed", meaning: "'What happened?' → 'She LEFT the MEETING EARLY.' – wide focus, semua ditekan" },
      { word: "Discourse accent", ipa: "Pitch peak on key term", meaning: "Puncak pitch pada kata yang paling informatif dalam ujaran" },
      { word: "Emphatic stress (boosting)", ipa: "Extra stress for intensity", meaning: "'It was ABSOLUTELY BRILLIANT!' – intensifier + kata sifat ditekan kuat" },
      { word: "Intonation units (tone groups)", ipa: "Phrases with one nuclear stress", meaning: "Setiap 'kelompok nada' punya satu nuclear stress; pemisahan dengan jeda" }
    ],
    points: [
      "**Nuclear stress** adalah puncak pitch yang paling menonjol dalam sebuah 'tone unit' (kelompok intonasi). Ini adalah elemen paling penting dalam intonasi bahasa Inggris.",
      "**Default nuclear stress** = kata konten TERAKHIR dalam tone unit. Ini digunakan untuk informasi baru (wide focus).",
      "**Contrastive nuclear stress** = memindahkan nuclear stress ke kata MANAPUN untuk tujuan kontras, koreksi, atau penekanan.",
      "**De-accenting:** Informasi yang sudah diketahui pendengar (given information) kehilangan tekanan. Ini penting untuk natural speech flow.",
      "**Dalam debat dan presentasi akademik:** Kuasai contrastive stress untuk menandai koreksi dan kontras: 'The data SUGGEST a correlation, not a CAUSE.'",
      "**Latihan:** Bacalah kalimat yang sama 5 kali, setiap kali stresskan kata yang berbeda, dan perhatikan bagaimana maknanya berubah secara dramatis."
    ]
  },
  12: { // Intonation in Complex Sentences
    examples: [
      { word: "Subordinate clause first ↗→ Main clause ↘", ipa: "If..., then...", meaning: "'Although it rained, ↗ / the match continued. ↘' – Sub. naik, utama turun" },
      { word: "Non-defining relative ↗...↗ ↘", ipa: "Parenthetical pitch", meaning: "'The CEO, ↗ who had led the firm for years, ↗ resigned last month. ↘'" },
      { word: "List pattern ↗↗↗↘", ipa: "Rise on each, fall on last", meaning: "'First, ↗ / then, ↗ / and finally ↘' – naik terus sampai item terakhir" },
      { word: "Contrast: fall-rise ↘↗", ipa: "Fall-rise on contrasted element", meaning: "'While the plan was SOUND, ↘↗ / the execution was POOR. ↘'" },
      { word: "Parenthetical digression ↘↘", ipa: "Low pitch for asides", meaning: "'The solution – ↘ and many experts agree – ↘ is complex. ↘' – lower pitch" },
      { word: "Conditional: if ↗ / result ↘", ipa: "Standard conditional intonation", meaning: "'If the results are negative, ↗ / we'll reconsider the approach. ↘'" },
      { word: "However, ↗ Furthermore, ↗", ipa: "Discourse marker intonation", meaning: "Discourse markers biasanya naik sebelum klausa utama yang mengikutinya" },
      { word: "Hedged claim ↘↗", ipa: "Fall-rise for tentativeness", meaning: "'It could be argued ↘↗ that the findings are inconclusive.'" },
      { word: "Academic list structure", ipa: "Numbered points", meaning: "'My FIRST point ↘ is X. ↘ My SECOND ↘ is Y. ↘ And THIRD, ↘ Z. ↘'" },
      { word: "Tag question: confirmation vs genuine", ipa: "Falling vs rising tag", meaning: "'It's important, ↗ isn't it? ↘' = confirmation | 'It's important, ↘ isn't it? ↗' = genuine" }
    ],
    points: [
      "**Kalimat kompleks memiliki multiple tone units** – setiap klausa atau frasa penting memiliki intonasi tersendiri.",
      "**Klausa subordinate sebelum klausa utama:** Biasanya naik di akhir klausa subordinate (mengundang pendengar untuk terus mendengar), lalu turun di akhir klausa utama.",
      "**Non-defining relative clauses:** Disampaikan dengan 'parenthetical pitch' – biasanya sedikit lebih rendah dan lebih cepat, seperti informasi tambahan dalam kurung.",
      "**Contrast intonation:** Elemen yang dikontraskan biasanya mendapat fall-rise ↘↗ – ini menandakan 'benar, tapi ada sisi lain'. Sangat umum dalam argumen akademik.",
      "**Discourse markers** seperti 'However', 'Nevertheless', 'Furthermore' biasanya mendapat intonasi khas: naik sedikit sebelum klausa utama untuk menandai transisi.",
      "**Kalimat akademik panjang:** Kelompokkan dalam sense groups yang jelas dengan jeda dan intonasi yang tepat. Jangan dibaca sebagai satu tone unit panjang."
    ]
  },
  13: { // Vowel Sounds – Common Distinctions
    examples: [
      { word: "ship /ɪ/ vs sheep /iː/", ipa: "/ʃɪp/ vs /ʃiːp/", meaning: "Pendek vs panjang: /ɪ/ = tegang singkat; /iː/ = panjang penuh" },
      { word: "bed /e/ vs bad /æ/", ipa: "/bed/ vs /bæd/", meaning: "/e/ = vokal tengah; /æ/ = buka mulut lebih turun dan lebar" },
      { word: "pull /ʊ/ vs pool /uː/", ipa: "/pʊl/ vs /puːl/", meaning: "/ʊ/ = singkat, lebih tengah; /uː/ = panjang, penuh bulat" },
      { word: "hot /ɒ/ vs hurt /ɜː/", ipa: "/hɒt/ vs /hɜːt/", meaning: "/ɒ/ = belakang, bulat; /ɜː/ = tengah, bibir netral" },
      { word: "cat /æ/ vs cart /ɑː/", ipa: "/kæt/ vs /kɑːt/", meaning: "/æ/ = depan terbuka; /ɑː/ = belakang terbuka, lebih panjang" },
      { word: "bay /eɪ/ diphthong", ipa: "/beɪ/", meaning: "Diftong: meluncur dari /e/ → /ɪ/" },
      { word: "boy /ɔɪ/ diphthong", ipa: "/bɔɪ/", meaning: "Diftong: meluncur dari /ɔ/ → /ɪ/" },
      { word: "now /aʊ/ diphthong", ipa: "/naʊ/", meaning: "Diftong: meluncur dari /a/ → /ʊ/" },
      { word: "Vowel length distinction", ipa: "Length matters in English", meaning: "'/ɪ/ vs /iː/' dibedakan oleh kualitas DAN durasi (panjang suara)" },
      { word: "Minimal pairs practice", ipa: "One phoneme difference", meaning: "bit-beat | bad-bed | cat-cut | pull-pool | cot-caught – latihan bedakan!" }
    ],
    points: [
      "**Bahasa Inggris memiliki 20+ vokal** (termasuk diftong), jauh lebih banyak dari kebanyakan bahasa. Ini sumber kesalahan yang umum bagi penutur non-native.",
      "**Vokal panjang vs pendek:** /ɪ/ vs /iː/ | /ʊ/ vs /uː/ | /e/ vs /eə/ – ini berbeda dalam KUALITAS (posisi lidah) DAN DURASI.",
      "**Diftong:** Bahasa Inggris memiliki 8 diftong utama. Penting: Anda HARUS menyelesaikan gerakan glide – jangan berhenti di tengah.",
      "**Kesalahan umum:** Mengganti /æ/ dengan /e/ (bad → bed), atau /ɑː/ dengan /æ/ (car → caa). Kedua pasang ini berbeda tempat artikulasi.",
      "**Latihan minimal pairs:** Masukkan minimal pairs ke dalam kalimat: 'I have a BIT left / I've been here a BEAT.' – kemudian latih dengan partner.",
      "**Dengarkan, rekam, bandingkan:** Rekam diri Anda mengucapkan minimal pairs, bandingkan dengan rekaman penutur asli, dan identifikasi perbedaan."
    ]
  },
  14: { // Consonant Sounds – Voiced & Unvoiced
    examples: [
      { word: "/p/ – /b/ pair", ipa: "/p/ pit vs /b/ bit", meaning: "/p/ tak bersuara (tanpa getar pita suara) – /b/ bersuara (pita suara bergetar)" },
      { word: "/t/ – /d/ pair", ipa: "/t/ ten vs /d/ den", meaning: "Keduanya alveolar; /t/ tak bersuara; /d/ bersuara" },
      { word: "/k/ – /g/ pair", ipa: "/k/ cap vs /g/ gap", meaning: "Keduanya velar; /k/ tak bersuara; /g/ bersuara" },
      { word: "/f/ – /v/ pair", ipa: "/f/ fan vs /v/ van", meaning: "Labiodental; /f/ tak bersuara; /v/ bersuara" },
      { word: "/θ/ – /ð/ pair", ipa: "/θ/ thin vs /ð/ this", meaning: "Dental; lidah menyentuh/di dekat gigi; /θ/ tak bersuara; /ð/ bersuara" },
      { word: "/s/ – /z/ pair", ipa: "/s/ sip vs /z/ zip", meaning: "Alveolar sibilant; /s/ tak bersuara; /z/ bersuara" },
      { word: "/ʃ/ – /ʒ/ pair", ipa: "/ʃ/ ship vs /ʒ/ measure", meaning: "Palato-alveolar; /ʃ/ tak bersuara; /ʒ/ bersuara (jarang di awal kata)" },
      { word: "/tʃ/ – /dʒ/ pair", ipa: "/tʃ/ chin vs /dʒ/ gin", meaning: "Affrikat; /tʃ/ tak bersuara; /dʒ/ bersuara" },
      { word: "cats /s/ vs dogs /z/", ipa: "/kæts/ vs /dɒɡz/", meaning: "Akhiran -s: setelah voiceless → /s/; setelah voiced → /z/" },
      { word: "Aspiration at word start", ipa: "Aspirated /pʰ tʰ kʰ/", meaning: "Di awal kata: /p/, /t/, /k/ diikuti semburan udara: pin, tin, kin" }
    ],
    points: [
      "**Perbedaan bersuara/tak bersuara adalah kritis** dalam bahasa Inggris. Tukar voicing bisa mengubah makna: pin/bin, cat/gat, fan/van, tin/din.",
      "**Cara melatih voicing:** Sentuh tenggorokan saat mengucapkan. Konsonan BERSUARA = Anda merasakan getaran. Konsonan TAK BERSUARA = tidak ada getaran.",
      "**Aspirasi:** Konsonan tak bersuara /p/, /t/, /k/ di AWAL kata diikuti semburan udara kecil. Tidak ada aspirasi di akhir kata: 'cap' tidak sama bersuaranya dengan initial /k/.",
      "**Aturan akhiran -s:** Setelah konsonan tak bersuara → /s/ (cats, books, stops) | Setelah konsonan bersuara atau vokal → /z/ (dogs, trees, cows) | Setelah /s, z, ʃ, ʒ, tʃ, dʒ/ → /ɪz/ (buses, roses, watches)",
      "**Kesulitan /θ/ dan /ð/:** Ini tidak ada dalam banyak bahasa. Lidah HARUS menyentuh bagian belakang gigi atas dan dilepaskan perlahan. Jangan ganti dengan /t/, /d/, /s/, atau /z/.",
      "**Latihan voicing dalam kata:** Perhatikan 'face' (noun) /feɪs/ vs 'phase' /feɪz/ – minimal pair yang disebabkan oleh perbedaan voiced/voiceless."
    ]
  },
  15: { // Pitch & Tone in Academic Contexts
    examples: [
      { word: "Wide pitch range = engaging", ipa: "High to low variation", meaning: "Penutur akademik yang baik menggunakan range pitch yang lebar untuk mempertahankan perhatian" },
      { word: "High key = new section/topic", ipa: "Pitch jump up", meaning: "Memulai bagian baru dalam presentasi: penutur sering dimulai pada pitch lebih tinggi" },
      { word: "Low key = parenthetical", ipa: "Lower pitch for asides", meaning: "Digression atau informasi tambahan: pitch lebih rendah dan lebih cepat" },
      { word: "Slow tempo = key point", ipa: "Deliberate slowing", meaning: "Memperlambat pada poin penting = tanda bahwa pendengar harus mencatat/memperhatikan" },
      { word: "Pause before key term", ipa: "Strategic silence", meaning: "Jeda sebelum istilah teknis atau klaim penting = sinyal betapa pentingnya yang berikut" },
      { word: "Falling tone = certainty ↘", ipa: "Full fall", meaning: "'The findings clearly demonstrate... ↘' – nada turun = klaim dengan keyakinan tinggi" },
      { word: "Fall-rise = hedging ↘↗", ipa: "Tentative claim", meaning: "'It could be argued... ↘↗' – turun-naik = klaim akademik yang lebih hati-hati" },
      { word: "Pitch peak = informationally key", ipa: "Highest pitch on key word", meaning: "Puncak pitch tertinggi = kata yang paling informatif dalam ujaran" },
      { word: "Even tone = background info", ipa: "Mid-level monotone", meaning: "Informasi latar belakang: pitch lebih rata (tidak semua informasi sama pentingnya)" },
      { word: "Pausing for effect", ipa: "/pɔːzɪŋ fər ɪˈfekt/", meaning: "Jeda yang disengaja setelah klaim penting memberi pendengar waktu untuk memprosesnya" }
    ],
    points: [
      "**Pitch dalam konteks akademik lebih disengaja** dari percakapan biasa. Penutur akademik menggunakan pitch secara strategis untuk membimbing pendengar melalui argumen.",
      "**Variasi pitch = engagement:** Pitch yang terlalu datar (monoton) membuat pendengar kehilangan konsentrasi. Naik-turun yang disengaja mempertahankan perhatian.",
      "**Nada turun ↘ = pernyataan dengan kepastian.** Dalam akademik, ini digunakan ketika Anda yakin dengan klaim. Nada turun-naik ↘↗ = klaim yang lebih hati-hati atau tentatif.",
      "**Pitch 'reset' untuk struktur:** Ketika memulai poin baru, 'reset' ke pitch lebih tinggi memberi sinyal kepada pendengar bahwa ada informasi baru yang datang.",
      "**Tempo dan pitch bekerja bersama:** Perlambat dan naikkan pitch saat memulai poin penting; percepat dan turunkan pitch untuk informasi background.",
      "**Latihan presentasi akademik:** Rekam diri Anda, dengarkan kembali, dan evaluasi: Apakah ada variasi pitch yang cukup? Apakah Anda memperlambat pada poin penting? Apakah Anda berikan jeda yang cukup?"
    ]
  },
  16: { // Weak Syllables in Long Words
    examples: [
      { word: "comfortable", ipa: "/ˈkʌmftəbəl/", meaning: "4 suku dikurangi jadi 3: /ˈkʌmf.tə.bəl/ – 'fort' suku hilang" },
      { word: "temperature", ipa: "/ˈtemprɪtʃə/", meaning: "4 suku dikurangi jadi 3: /ˈtem.prɪ.tʃə/" },
      { word: "interesting", ipa: "/ˈɪntrɪstɪŋ/", meaning: "4 suku dikurangi jadi 3: /ˈɪn.trɪ.stɪŋ/" },
      { word: "probably", ipa: "/ˈprɒbli/", meaning: "3 suku dikurangi jadi 2: /ˈprɒb.li/" },
      { word: "secretary", ipa: "/ˈsekrɪtri/", meaning: "4 suku dikurangi jadi 3: /ˈsek.rɪ.tri/" },
      { word: "history", ipa: "/ˈhɪstri/", meaning: "3 suku sering dikurangi jadi 2: /ˈhɪs.tri/" },
      { word: "every", ipa: "/ˈevri/", meaning: "3 suku sering dikurangi jadi 2: /ˈev.ri/" },
      { word: "usually", ipa: "/ˈjuːʒli/", meaning: "4 suku dikurangi jadi 2: /ˈjuːʒ.li/" },
      { word: "necessary", ipa: "/ˈnesɪsri/", meaning: "4 suku dikurangi jadi 3 dalam fast speech" },
      { word: "particularly", ipa: "/pəˈtɪkjʊli/", meaning: "6 suku dikurangi jadi 4-5: pə-ˈtɪk-jʊ-li" }
    ],
    points: [
      "**Suku kata lemah dihilangkan dalam ucapan alami.** Ini disebut 'syncope' (penghilangan suku kata) atau 'elision'. Hasilnya adalah ucapan yang lebih cepat dan alami.",
      "**Suku kata yang biasanya hilang:** Suku tak bertekanan yang diapit oleh konsonan: 'inter**e**sting' (suku tengah 'e') | 'com**for**table' (suku kedua 'for')",
      "**Aturan umum:** Jika ada vokal pendek /ə, ɪ/ dalam suku tak bertekanan yang diapit konsonan, vokal tersebut sering dihilangkan dalam ucapan cepat.",
      "**Tetap gunakan semua suku kata dalam ucapan formal dan lambat** – misalnya saat mengajar atau dalam konteks formal yang membutuhkan kejelasan maksimum.",
      "**Kenali kata-kata ini dalam listening:** Jika mendengar /ˈprɒbli/, kenali bahwa itu adalah 'probably'. Jika /ˈjuːʒli/, itu 'usually'.",
      "**Latihan:** Ucapkan 10 kata panjang pertama-tama dengan SEMUA suku kata, kemudian dengan reduksi alami. Bandingkan dan rasakan perbedaannya."
    ]
  },
  17: { // Pronunciation of -ed Endings
    examples: [
      { word: "wanted /ˈwɒntɪd/", ipa: "/ˈwɒntɪd/", meaning: "Setelah /t/: tambah suku /ɪd/ – 'want' berakhir /t/ → wanted /ɪd/" },
      { word: "needed /ˈniːdɪd/", ipa: "/ˈniːdɪd/", meaning: "Setelah /d/: tambah suku /ɪd/ – 'need' berakhir /d/ → needed /ɪd/" },
      { word: "walked /wɔːkt/", ipa: "/wɔːkt/", meaning: "Setelah /k/ (tak bersuara): tambah /t/ – walk → walked /t/" },
      { word: "kissed /kɪst/", ipa: "/kɪst/", meaning: "Setelah /s/ (tak bersuara): tambah /t/ – kiss → kissed /t/" },
      { word: "laughed /lɑːft/", ipa: "/lɑːft/", meaning: "Setelah /f/ (tak bersuara): tambah /t/ – laugh → laughed /t/" },
      { word: "called /kɔːld/", ipa: "/kɔːld/", meaning: "Setelah /l/ (bersuara): tambah /d/ – call → called /d/" },
      { word: "lived /lɪvd/", ipa: "/lɪvd/", meaning: "Setelah /v/ (bersuara): tambah /d/ – live → lived /d/" },
      { word: "played /pleɪd/", ipa: "/pleɪd/", meaning: "Setelah vokal (bersuara): tambah /d/ – play → played /d/" },
      { word: "learned (adj) /ˈlɜːnɪd/", ipa: "/ˈlɜːnɪd/", meaning: "Adjektif 'learned': selalu /ɪd/ (a learned professor)" },
      { word: "Naked, sacred, wicked", ipa: "/ˈneɪkɪd, ˈseɪkrɪd, ˈwɪkɪd/", meaning: "Adjektif bersejarah: selalu /ɪd/ apapun konsonan sebelumnya" }
    ],
    points: [
      "**3 aturan -ed yang simpel:**\n  1. Setelah /t/ atau /d/ → ucapkan /ɪd/ (tambah suku kata)\n  2. Setelah konsonan TAK BERSUARA lainnya → ucapkan /t/ (tanpa suku tambahan)\n  3. Setelah konsonan BERSUARA atau vokal → ucapkan /d/ (tanpa suku tambahan)",
      "**Test cepat:** Ucapkan kata dasar dengan berbisik. Apakah akhirannya berbunyi seperti /t/ atau /d/? Atau apakah ada vokal singkat sebelum meluncur ke konsonan akhir? Jika ya, gunakan /ɪd/.",
      "**Kelompok /ɪd/:** wanted, needed, decided, started, ended, hated, waited, suggested, recommended – semua verba berakhir /t/ atau /d/",
      "**Kelompok /d/:** called, lived, moved, played, occurred, showed, happened, allowed, followed, proved – semuanya bersuara",
      "**Kelompok /t/:** talked, walked, worked, stopped, kissed, washed, watched, faxed, laughed, reached – semua tak bersuara",
      "**Adjektif dengan -ed = selalu /ɪd/:** a learned man | a wicked witch | naked truth | sacred ground – ini tidak mengikuti aturan verba!"
    ]
  },
  18: { // Pronunciation of Numbers & Abbreviations
    examples: [
      { word: "101 (British)", ipa: "/wʌn həndred ənd wʌn/", meaning: "British: 'one hundred AND one' – 'and' wajib" },
      { word: "3.5 (decimal)", ipa: "/θriː ˈpɔɪnt faɪv/", meaning: "3.5 = 'three point five' – bukan 'three comma five'" },
      { word: "75% (percent)", ipa: "/ˌsevənti faɪv pəˈsent/", meaning: "75% = 'seventy-five percent' – tekanan pada 'per-CENT'" },
      { word: "1999 (year)", ipa: "/ˌnaɪntiːn ˈnaɪnti naɪn/", meaning: "1999 = 'nineteen ninety-nine'" },
      { word: "2023 (year)", ipa: "/ˌtwenti ˈtwenti θriː/", meaning: "2023 = 'twenty twenty-three'" },
      { word: "BBC (initialism)", ipa: "/ˌbiː biː ˈsiː/", meaning: "Initialism: setiap huruf dieja; stress pada terakhir" },
      { word: "NASA (acronym)", ipa: "/ˈnæsə/", meaning: "Acronym: diucapkan sebagai kata" },
      { word: "GDP / GNP", ipa: "/ˌdʒiː diː ˈpiː/ | /ˌdʒiː en ˈpiː/", meaning: "Economic abbreviations: spelled letter by letter" },
      { word: "Fractions: 1/3 = one third", ipa: "/wʌn θɜːd/", meaning: "1/4 = one quarter | 3/4 = three quarters | 2/3 = two thirds" },
      { word: "£10,000 (currency)", ipa: "/ˈten ˈθaʊzənd ˈpaʊndz/", meaning: "Currency: amount first, then unit. '$5M' = 'five million dollars'" }
    ],
    points: [
      "**British 'and' dalam angka:** 101, 1,040, 2,305 semua membutuhkan 'and': 'one hundred AND one' | 'one thousand AND forty' | 'two thousand, three hundred AND five'",
      "**Tahun:** Pre-2000 dibaca pair: 1984 = 'nineteen eighty-four'. 2000-2009 = 'two thousand and [four]'. 2010-sekarang bisa: 'twenty twelve' ATAU 'two thousand and twelve'.",
      "**Desimal dan persen:** 3.14 = 'three point one four' (bukan 'fourteen'). 0.5% = 'zero point five percent' atau 'nought point five percent' (British).",
      "**Initialisms vs Acronyms: Initialism** = diucapkan huruf per huruf (BBC, USA, UN). **Acronym** = diucapkan sebagai kata (NASA, WHO ketika diucapkan /huː/, STEM /stem/).",
      "**Nomor telepon:** Setiap digit diucapkan terpisah. '0' bisa diucapkan 'zero' atau 'oh' (British). Kelompok dengan jeda alami: 020 7834 5678 = 'oh two oh / seven eight three four / five six seven eight'",
      "**Dalam prestek dan akademik:** Latih membaca tabel data, grafik, dan statistik dengan lancar. Jangan terhenti pada angka yang tidak familiar."
    ]
  },
  19: { // Pronunciation of Academic Vocabulary
    examples: [
      { word: "paradigm /ˈpærədaɪm/", ipa: "/ˈpærədaɪm/", meaning: "Huruf 'g' DIAM – bukan /ˈpærədɪɡm/. Salah satu kata akademik paling mispronounced." },
      { word: "hierarchy /ˈhaɪərɑːki/", ipa: "/ˈhaɪərɑːki/", meaning: "Sering diucapkan /haɪˈɑːrki/ secara salah – stres pada suku PERTAMA" },
      { word: "deteriorate /dɪˈtɪəriəreɪt/", ipa: "/dɪˈtɪəriəreɪt/", meaning: "5 suku: di-TE-ri-o-rate – jangan melewatkan suku 'ri'" },
      { word: "liaison /liˈeɪzɒn/", ipa: "/liˈeɪzɒn/", meaning: "Asal Prancis: /ʒ/ di tengah, bukan /z/; tekanan suku ke-2" },
      { word: "genre /ˈʒɒnrə/", ipa: "/ˈʒɒnrə/", meaning: "Asal Prancis: /ʒ/ di awal, BUKAN /dʒ/ atau /ɡ/" },
      { word: "algorithm /ˈælɡərɪðəm/", ipa: "/ˈælɡərɪðəm/", meaning: "'th' = /ð/ bersuara – bukan /t/. 4 suku: al-go-ri-thm" },
      { word: "cohesion /kəʊˈhiːʒən/", ipa: "/kəʊˈhiːʒən/", meaning: "/ʒ/ di tengah – seperti 'measure', 'treasure'. Suku ke-2 ditekan." },
      { word: "hypothesis /haɪˈpɒθɪsɪs/", ipa: "/haɪˈpɒθɪsɪs/", meaning: "4 suku: hy-PO-the-sis. /θ/ dental tak bersuara" },
      { word: "phenomena /fɪˈnɒmɪnə/", ipa: "/fɪˈnɒmɪnə/", meaning: "Plural dari 'phenomenon' – gunakan 'phenomena ARE...' (plural)" },
      { word: "data /ˈdeɪtə/ or /ˈdætə/", ipa: "/ˈdeɪtə/", meaning: "Plural secara formal: 'The data SUGGEST...' Juga: datum = satu data point" }
    ],
    points: [
      "**Kata akademik yang sering salah diucapkan** perlu dilatih secara khusus. Berikut adalah 10 yang paling sering salah: paradigm, deteriorate, hierarchy, liaison, genre, algorithm, phenomenon, prerogative, pronunciation, mischievous.",
      "**Kata asal Prancis:** genre, liaison, questionnaire, entrepreneur, rendezvous – semua mempertahankan suara Prancis seperti /ʒ/ yang tidak ada di kata asli Inggris.",
      "**Aturan penghitungan suku kata:** Sebelum mengucapkan kata baru yang panjang, tentukan dulu berapa suku katanya dan mana yang ditekan. Gunakan kamus dengan transkripsi IPA.",
      "**phenomena vs phenomenon:** Kesalahan gramatikal SANGAT umum. Phenomena = plural (diikuti 'are'), phenomenon = singular (diikuti 'is').",
      "**data vs datum:** Dalam formal academic writing: 'data' adalah plural ('the data suggest...'). Dalam percakapan informal, 'data' sering diperlakukan sebagai singular.",
      "**Latihan target:** Buat list 20 kata akademik yang relevan dengan bidang studi Anda dan latih prononciation-nya setiap hari sampai otomatis."
    ]
  },
  20: { // Pronunciation Review & Self-Assessment
    examples: [
      { word: "Review: Word Stress", ipa: "Lessons 1, 4, 10, 11", meaning: "Latih: ekonomi keluarga kata (economy/economic/economically) & compound nouns (BLACKbird vs black BIRD)" },
      { word: "Review: Weak Forms", ipa: "Lesson 2", meaning: "Latih: of/to/for/and + schwa (Lesson 5) dalam kalimat yang sama" },
      { word: "Review: Intonation", ipa: "Lessons 3, 12, 15", meaning: "Latih: Y/N? ↗ | Wh? ↘ | Complex sentences | Hedging fall-rise ↘↗" },
      { word: "Review: Connected Speech", ipa: "Lessons 7, 8", meaning: "Latih: linking sounds + rhythm & stress-timing dalam teks akademik" },
      { word: "Review: Vowels", ipa: "Lessons 5, 13", meaning: "Latih: schwa di semua suku tak bertekanan + minimal pairs (bit/beat, bad/bed, etc.)" },
      { word: "Review: Consonants", ipa: "Lessons 6, 14", meaning: "Latih: cluster /str-, -ngths/ + voiced/unvoiced pairs (/θ/ vs /ð/, /s/ vs /z/)" },
      { word: "Review: -ed endings", ipa: "Lesson 17", meaning: "Latih: /t/ vs /d/ vs /ɪd/ dalam teks yang mengandung banyak kata lampau" },
      { word: "Review: Academic vocab", ipa: "Lesson 19", meaning: "Latih: paradigm, hypothesis, algorithm, liaison, genre, phenomena" },
      { word: "Self-assessment criteria", ipa: "Checklist B2", meaning: "Nilai diri: stress accuracy | schwa | connected speech | intonation | consonant clarity" },
      { word: "Recording practice", ipa: "2-minute academic talk", meaning: "Rekam diri berbicara selama 2 menit tentang topik akademik, lalu evaluasi 9 kriteria" }
    ],
    points: [
      "**Checklist Penilaian Diri B2:** (1) Tekanan kata ✓ (2) Weak forms/schwa ✓ (3) Connected speech ✓ (4) Intonasi bervariasi ✓ (5) Vokal dibedakan ✓ (6) Konsonan jelas ✓ (7) Akhiran -ed benar ✓ (8) Kata akademik tepat ✓ (9) Ritme alami ✓",
      "**Strategi peningkatan:** Fokus pada SATU area setiap minggu. Jangan mencoba memperbaiki semua sekaligus. Rekam dan dengarkan progres Anda.",
      "**Latihan terbaik:** Shadowing – mendengarkan penutur asli dan langsung meniru, termasuk kecepatan, intonasi, dan ritme. Ini lebih efektif dari belajar aturan saja.",
      "**Ukur kemajuan:** Rekam suara Anda membaca teks akademik 3 bulan yang lalu dan sekarang. Perubahan yang terdengar adalah bukti kemajuan.",
      "**Target B2 pronunciation:** Bukan meniru penutur asli sepenuhnya, tetapi diucapkan dengan cukup jelas sehingga penutur asli BERBAGAI aksen dapat memahami Anda dengan mudah.",
      "**Selamat!** Anda telah menyelesaikan seluruh 20 lesson Pronunciation Upper-Intermediate. Terus berlatih dan ingat: pronunciation terbaik datang dari listening yang banyak dan praktik yang konsisten."
    ]
  }
};

function buildExamplesStr(examples) {
  const items = examples.map(e =>
    `  {\n    "word": "${e.word.replace(/"/g, '\\"').replace(/\\/g, '\\\\').replace(/↗/g, '↗').replace(/↘/g, '↘')}",\n    "ipa": "${e.ipa.replace(/"/g, '\\"')}",\n    "meaning": "${e.meaning.replace(/"/g, '\\"')}"\n  }`
  ).join(',\n');
  return `const EXAMPLES: ExampleItem[] = [\n${items}\n];`;
}

function buildPointsStr(points) {
  const items = points.map(p => {
    const escaped = p.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
    return `  "${escaped}"`;
  }).join(',\n');
  return `const POINTS: string[] = [\n${items}\n];`;
}

let successCount = 0;

for (let lNum = 1; lNum <= 20; lNum++) {
  const file = path.join(BASE, `Lesson${lNum}.tsx`);
  if (!fs.existsSync(file)) { console.log(`⚠️ Lesson${lNum}.tsx not found`); continue; }

  const enh = ENHANCED[lNum];
  if (!enh) { console.log(`ℹ️ No enhancement for Lesson${lNum}`); continue; }

  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  if (enh.examples) {
    const exStr = buildExamplesStr(enh.examples);
    const exRegex = /const EXAMPLES: ExampleItem\[\] = \[[\s\S]*?\];/;
    if (exRegex.test(content)) {
      content = content.replace(exRegex, exStr);
      changed = true;
      console.log(`  ✅ Enhanced EXAMPLES in Lesson${lNum}`);
    }
  }

  if (enh.points) {
    const ptStr = buildPointsStr(enh.points);
    const ptRegex = /const POINTS: string\[\] = \[[\s\S]*?\];/;
    if (ptRegex.test(content)) {
      content = content.replace(ptRegex, ptStr);
      changed = true;
      console.log(`  ✅ Enhanced POINTS in Lesson${lNum}`);
    }
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`✅ Pronunciation Lesson${lNum} enhanced.`);
    successCount++;
  } else {
    console.log(`ℹ️ Pronunciation Lesson${lNum}: no changes.`);
  }
}

console.log(`\n🎯 Pronunciation Enhancement: ${successCount}/20 lessons done.`);
