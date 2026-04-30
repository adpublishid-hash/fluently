// build-upper-inter-grammar.cjs
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '../src/pages/module/english/upper-intermediate/grammar');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const ACCENT_COLOR = '#1A5276';

const LESSONS = [
  {
    id: 1, title: 'Advanced Perfect Tenses', subtitle: 'Perfect Tenses: Present, Past & Future',
    theory: [
      { name: 'Present Perfect vs Past Simple', color: 'blue', icon: '🔵', points: [
        'Present Perfect: untuk pengalaman/recently completed actions yang masih relevan sekarang.',
        'Kalimat: "I **have worked** here for 5 years." (masih bekerja di sini)',
        'Past Simple: untuk waktu spesifik di masa lalu yang sudah selesai.',
        'Kalimat: "I **worked** there in 2019." (sudah tidak bekerja di sana)',
        'Signal words Present Perfect: already, yet, ever, never, just, recently, for, since',
        'Signal words Past Simple: yesterday, last year, in 2020, ago, when',
      ]},
      { name: 'Past Perfect', color: 'indigo', icon: '🟣', points: [
        'Past Perfect: aksi yang selesai SEBELUM aksi lain di masa lalu.',
        'Rumus: had + past participle',
        '"Before she arrived, he **had already eaten**." (makan selesai sebelum tiba)',
        '"I **had never seen** such a beautiful place before visiting Bali."',
        'Digunakan bersama before, after, when, by the time, already',
        'Memberi konteks latar belakang dalam narasi masa lalu.',
      ]},
      { name: 'Future Perfect', color: 'violet', icon: '🔮', points: [
        'Future Perfect: aksi yang akan selesai SEBELUM waktu tertentu di masa depan.',
        'Rumus: will have + past participle',
        '"By 2030, the company **will have expanded** to 50 countries."',
        '"By the time you arrive, I **will have finished** cooking."',
        'Signal words: by then, by [time], before [event], by the time',
        'Digunakan untuk proyeksi, prediksi, atau rencana masa depan yang pasti.',
      ]},
    ],
    examples: [
      '"She **has been studying** English for three years." → Present Perfect Continuous (masih berlangsung)',
      '"They **had been waiting** for two hours when the bus finally came." → Past Perfect Continuous',
      '"By next month, I **will have been working** here for a decade." → Future Perfect Continuous',
    ],
    quiz: [
      { q: 'Choose the correct tense: "When I arrived, she ___ (already leave) the office."', opts: ['already left', 'had already left', 'has already left', 'was already leaving'], ans: 'had already left', exp: 'Past Perfect (had left) digunakan untuk aksi yang selesai SEBELUM aksi lain di masa lalu (arrived).' },
      { q: 'Which sentence uses Present Perfect CORRECTLY?', opts: ['I have seen him yesterday.', 'She has moved to London last year.', 'We have already submitted the report.', 'They have worked there in 2020.'], ans: 'We have already submitted the report.', exp: '"Already" adalah signal word Present Perfect. Kalimat lain salah karena menggunakan time adverb past (yesterday, last year, in 2020).' },
      { q: '"By the time you read this, I ___ (finish) the project." Choose correctly.', opts: ['will finish', 'will have finished', 'have finished', 'had finished'], ans: 'will have finished', exp: 'Future Perfect (will have finished) digunakan untuk aksi yang selesai SEBELUM waktu tertentu di masa depan.' },
      { q: 'She ___ English for 10 years, so she is fluent now.', opts: ['studied', 'has studied', 'had studied', 'will study'], ans: 'has studied', exp: 'Present Perfect dengan "for" menunjukkan aksi yang dimulai masa lalu dan masih relevan sekarang.' },
      { q: 'He told me he ___ never ___ to Japan before.', opts: ['has, been', 'will, go', 'had, been', 'was, gone'], ans: 'had, been', exp: 'Past Perfect dalam reported speech: dia menceritakan pengalamannya sebelum saat berbicara.' },
      { q: '"Researchers ___ the data by the time the conference begins." Best choice?', opts: ['analyse', 'have analysed', 'will have analysed', 'had analysed'], ans: 'will have analysed', exp: 'Future Perfect menunjukkan bahwa analisis akan selesai sebelum konferensi dimulai.' },
      { q: 'Which time expression goes with the Past Perfect tense?', opts: ['yesterday', 'by the time', 'since last year', 'tomorrow'], ans: 'by the time', exp: '"By the time" + Past Perfect menunjukkan urutan kronologis dua peristiwa masa lalu.' },
      { q: 'I ___ three novels this year. (tahun ini belum selesai)', opts: ['read', 'have read', 'had read', 'will read'], ans: 'have read', exp: 'Present Perfect digunakan karena waktu (this year) belum selesai - masih dalam periode yang sama.' },
      { q: '"Before smartphones, people ___ maps to navigate." Choose correctly.', opts: ['use', 'have used', 'had used', 'will have used'], ans: 'had used', exp: 'Past Perfect menunjukkan kebiasaan yang ada sebelum peristiwa lain (sebelum era smartphone).' },
      { q: 'Which sentence shows the CORRECT future perfect structure?', opts: ['She will finish the project.', 'She finishes the project by Monday.', 'She will have finished the project by Monday.', 'She had finished the project by Monday.'], ans: 'She will have finished the project by Monday.', exp: 'Future Perfect: will + have + past participle, with "by Monday" sebagai deadline masa depan.' },
      { q: 'The signal word "yet" is typically used with which tense?', opts: ['Past Simple', 'Past Perfect', 'Present Perfect', 'Future Perfect'], ans: 'Present Perfect', exp: '"Yet" digunakan dalam kalimat Present Perfect, biasanya dalam pertanyaan atau kalimat negatif.' },
      { q: '"___ you ever ___ bungee jumping?" Choose correctly.', opts: ['Did, try', 'Have, tried', 'Had, tried', 'Will, try'], ans: 'Have, tried', exp: '"Ever" dalam pertanyaan tentang pengalaman hidup → Present Perfect (Have you ever...).' },
      { q: 'By 2050, scientists predict they ___ a cure for cancer.', opts: ['find', 'have found', 'had found', 'will have found'], ans: 'will have found', exp: 'Future Perfect (will have found) untuk proyeksi yang akan selesai sebelum tahun 2050.' },
      { q: '"I ___ here since 2015" means I am still here now.', opts: ['was working', 'worked', 'have been working', 'had worked'], ans: 'have been working', exp: 'Present Perfect Continuous (have been working + since) = aktivitas yang dimulai di masa lalu dan masih berlangsung.' },
      { q: 'Which sentence INCORRECTLY uses Past Perfect?', opts: ['She had eaten before he arrived.', 'They had left when I called.', 'He had been born in 1990.', 'I had went to the store.'], ans: 'I had went to the store.', exp: '"Had went" adalah kesalahan - Past Participle dari "go" adalah "gone", bukan "went".' },
      { q: 'He was exhausted because he ___ all night.', opts: ['works', 'worked', 'had been working', 'will work'], ans: 'had been working', exp: 'Past Perfect Continuous (had been working) menunjukkan aksi yang berlangsung lama dan menyebabkan kondisi masa lalu.' },
      { q: 'The phrase "by the time" signals which tense combination?', opts: ['Present + Past', 'Past + Present Perfect', 'Past + Past Perfect', 'Future + Past'], ans: 'Past + Past Perfect', exp: '"By the time + Past Simple, + Past Perfect" → By the time she arrived, he had left.' },
      { q: '"The team members ___ extensive training before the match." Which is BEST?', opts: ['undertook', 'had undertaken', 'have undertaken', 'will undertake'], ans: 'had undertaken', exp: 'Past Perfect karena pelatihan selesai sebelum pertandingan (urutan peristiwa masa lalu).' },
      { q: 'Which shows CORRECT signal word for Future Perfect?', opts: ['yesterday', 'just', 'by next year', 'since'], ans: 'by next year', exp: '"By + future time" → Future Perfect: "By next year, she will have graduated."' },
      { q: 'Which sentence uses "for" correctly with Present Perfect?', opts: ['I have been here for yesterday.', 'She has lived there for 2010.', 'They have worked here for 5 years.', 'He has studied for last month.'], ans: 'They have worked here for 5 years.', exp: '"For + duration" (5 years) dengan Present Perfect berarti aksi berlangsung dari waktu tertentu hingga sekarang.' },
    ]
  },
  {
    id: 2, title: 'Conditional Sentences', subtitle: 'Conditional Type 2, 3 & Mixed',
    theory: [
      { name: 'Type 2: Unreal Present/Future', color: 'amber', icon: '🔶', points: [
        'Gunakan Type 2 untuk situasi hipotetis yang tidak nyata di masa sekarang atau masa depan.',
        'Rumus: If + Past Simple, would/could/might + base verb',
        '"If I **had** more time, I **would study** medicine." (Kenyataan: tidak punya waktu)',
        '"If she **were** the CEO, she **would change** the company culture."',
        'Catatan: "were" digunakan untuk semua orang (I/he/she/it) dalam conditional formal (If I were...)',
        'Gunakan "could" untuk kemampuan dan "might" untuk kemungkinan yang lebih lemah.',
      ]},
      { name: 'Type 3: Unreal Past', color: 'red', icon: '🔴', points: [
        'Gunakan Type 3 untuk situasi yang tidak terjadi di masa lalu dan konsekuensinya.',
        'Rumus: If + Past Perfect, would/could/might + have + past participle',
        '"If he **had studied** harder, he **would have passed** the exam." (Kenyataan: tidak belajar, gagal)',
        '"If they **hadn\'t invested** early, they **wouldn\'t have made** a profit."',
        'Sering mengekspresikan penyesalan atau spekulasi tentang masa lalu.',
        'Gunakan "could have" atau "might have" untuk kemungkinan alternatif.',
      ]},
      { name: 'Mixed Conditionals', color: 'purple', icon: '🟣', points: [
        'Mencampur waktu Type 2 dan Type 3 untuk situasi yang lebih kompleks.',
        'Tipe A: If + Past Perfect (masa lalu) → would + base verb (masa kini)',
        '"If he **had studied** medicine, he **would be** a doctor now." (dulu tidak belajar, sekarang bukan dokter)',
        'Tipe B: If + Past Simple (masa kini/kebiasaan) → would have + past participle (masa lalu)',
        '"If she **were** more organized, she **would have finished** on time." (sifatnya, hasil masa lalu)',
        'Mixed conditionals menunjukkan hubungan lintas waktu yang kompleks.',
      ]},
    ],
    examples: [
      '"If I **were** president, I **would prioritise** education spending." (Type 2 - tidak nyata kini)',
      '"If she **had taken** the job offer, she **would have earned** more money." (Type 3 - penyesalan masa lalu)',
      '"If he **had been** born in a different era, he **would be** a different person today." (Mixed)',
    ],
    quiz: [
      { q: 'Which is a correct Type 2 Conditional?', opts: ['If she studies hard, she will pass.', 'If she studied hard, she would pass.', 'If she had studied, she would have passed.', 'If she studies, she would pass.'], ans: 'If she studied hard, she would pass.', exp: 'Type 2: If + Past Simple (studied), + would + base verb (pass). Situasi hipotetis masa kini.' },
      { q: 'Which is a correct Type 3 Conditional?', opts: ['If he had left early, he catches the train.', 'If he had left early, he would catch the train.', 'If he had left early, he would have caught the train.', 'If he left early, he would have caught the train.'], ans: 'If he had left early, he would have caught the train.', exp: 'Type 3: If + Past Perfect (had left), + would have + past participle (caught). Situasi tidak nyata di masa lalu.' },
      { q: 'Fill in: "If I ___ (be) you, I ___ (accept) the offer."', opts: ['am, will accept', 'were, would accept', 'was, would have accepted', 'had been, would accept'], ans: 'were, would accept', exp: 'Type 2 dengan "were" formal (bukan "was") untuk conditional unreal present.' },
      { q: '"If they ___ (invest) earlier, they ___ (not lose) their money." Type 3 form?', opts: ['had invested, wouldn\'t have lost', 'invested, wouldn\'t lose', 'had invested, hadn\'t lose', 'invested, would have lost'], ans: 'had invested, wouldn\'t have lost', exp: 'Type 3: If + had invested + wouldn\'t have lost (past perfect → would+have+pp).' },
      { q: '"If he ___ wealthy, he ___ a yacht." Which option is correct for Type 2?', opts: ['was, bought', 'were, would buy', 'had been, would buy', 'is, buys'], ans: 'were, would buy', exp: 'Type 2: "If he were wealthy" (past form, hipotetis) + "would buy" (result clause).' },
      { q: 'Identify the MIXED conditional: A past cause → a present result.', opts: ['If I had a car, I would drive to work.', 'If she hadn\'t studied, she wouldn\'t have graduated.', 'If he had chosen that career, he would be rich now.', 'If we leave now, we will catch the bus.'], ans: 'If he had chosen that career, he would be rich now.', exp: '"Had chosen" (masa lalu) → "would be" (masa kini) = Mixed Conditional tipe A.' },
      { q: 'Which conditional expresses REGRET about a past decision?', opts: ['Type 0', 'Type 1', 'Type 2', 'Type 3'], ans: 'Type 3', exp: 'Type 3 digunakan untuk menyatakan penyesalan atau spekulasi tentang hal yang tidak terjadi di masa lalu.' },
      { q: '"If I ___ (know) the answer, I ___ (tell) you." Present impossibility?', opts: ['know, will tell', 'knew, would tell', 'had known, would have told', 'knew, would have told'], ans: 'knew, would tell', exp: 'Type 2: If + Past Simple (knew) + would + base verb (tell). Saya tidak tahu, jadi ini hipotetis.' },
      { q: 'In formal conditional Type 2, which form is correct for "if + to be"?', opts: ['If I was rich...', 'If I am rich...', 'If I were rich...', 'If I will be rich...'], ans: 'If I were rich...', exp: 'Dalam formal/subjunctive conditional, "were" digunakan untuk semua person (I/he/she/it/they were).' },
      { q: '"If you ___ (come) to the party, you ___ (have) a great time." Type 3:', opts: ['come, have', 'came, would have', 'had come, would have had', 'came, would have had'], ans: 'had come, would have had', exp: 'Type 3: If + had come (past perfect) + would have had (would + have + pp).' },
      { q: 'What does "I would have helped you if you had asked" express?', opts: ['A future plan', 'A real present situation', 'A regret that help was not given in the past', 'A general truth'], ans: 'A regret that help was not given in the past', exp: 'Type 3 dengan "would have helped" dan "had asked" mengekspresikan penyesalan tentang masa lalu.' },
      { q: '"If she ___ (be) more disciplined, she would have qualified for the team."', opts: ['is', 'were', 'has been', 'had been'], ans: 'had been', exp: 'Ini mixed conditional: "had been" (masa lalu) + "would have qualified" (result yang terjadi di masa lalu).' },
      { q: 'Which modal verb shows possibility (not certainty) in a conditional result?', opts: ['would', 'might', 'should', 'must'], ans: 'might', exp: '"Might" menunjukkan hasil yang mungkin tapi tidak pasti, lebih lemah dari "would".' },
      { q: '"If they had communicated better, the project ___ a success."', opts: ['would be', 'will be', 'would have been', 'would had been'], ans: 'would have been', exp: 'Type 3: "had communicated" (pp) → "would have been" (would + have + pp).' },
      { q: '"___ I known you were coming, I would have baked a cake." What replaces "if"?', opts: ['Were', 'Had', 'Should', 'Did'], ans: 'Had', exp: '"Had I known..." adalah inversion conditional formal, setara dengan "If I had known...".' },
      { q: 'Which type deals with general scientific laws and facts?', opts: ['Type 0', 'Type 1', 'Type 2', 'Type 3'], ans: 'Type 0', exp: 'Type 0 (Zero Conditional): If + present simple, + present simple. Untuk kebenaran umum/ilmiah.' },
      { q: 'Mixed Conditional Type B: present state → past result. Example?', opts: ['If he were taller, he would play basketball.', 'If he had studied, he would be successful now.', 'If she were organized, she would have finished on time.', 'If they leave early, they will arrive on time.'], ans: 'If she were organized, she would have finished on time.', exp: '"Were organized" (sifat kini) → "would have finished" (hasil masa lalu) = Mixed Type B.' },
      { q: '"Could have" in Type 3 means...', opts: ['A certain past result', 'A possible past result that did not happen', 'A future possibility', 'A current ability'], ans: 'A possible past result that did not happen', exp: '"Could have" berarti ada kemungkinan hasil tersebut terjadi di masa lalu, tapi tidak terjadi.' },
      { q: 'Which sentence uses WITHOUT + gerund to replace a conditional?', opts: ['If you had not helped me, I would have failed.', 'Without your help, I would have failed.', 'Had you not helped, I would have failed.', 'All of the above'], ans: 'All of the above', exp: 'Semua ekspresi di atas setara dengan Type 3 conditional yang membayangkan berbagai cara penyampaian.' },
      { q: '"If I ___ the CEO, I ___ the bonus structure immediately." (hipotetis kini)', opts: ['am, will change', 'were, would change', 'had been, would change', 'was, changed'], ans: 'were, would change', exp: 'Type 2: "If I were the CEO" (hipotetis kini) + "would change" (hasil yang diinginkan).' },
    ]
  },
];

// Generic fallback for lessons 3-20
const TOPICS = [
  { id: 3, title: 'Passive Voice Complex', subtitle: 'Passive dalam Konteks Formal & Akademik' },
  { id: 4, title: 'Reported Speech Advanced', subtitle: 'Indirect Speech & Reporting Verbs' },
  { id: 5, title: 'Inversion & Emphasis', subtitle: 'Emphatic Structures (Never, Rarely, Only...)' },
  { id: 6, title: 'Relative Clauses', subtitle: 'Defining & Non-defining Relative Clauses' },
  { id: 7, title: 'Gerunds & Infinitives', subtitle: 'Advanced Verb Patterns (B2 Level)' },
  { id: 8, title: 'Modal Verbs for Deduction', subtitle: 'Must/Can\'t/Could/Might for Speculation B2' },
  { id: 9, title: 'Subjunctive Mood', subtitle: 'Formal Subjunctive & Wish Patterns' },
  { id: 10, title: 'Cleft Sentences', subtitle: 'It is/What is... Emphatic Cleft Structures' },
  { id: 11, title: 'Participle Clauses', subtitle: 'Present & Past Participle Clauses' },
  { id: 12, title: 'Articles Advanced', subtitle: 'A/An/The – Complex Rules B2' },
  { id: 13, title: 'Ellipsis & Substitution', subtitle: 'Avoiding Repetition in Formal Texts' },
  { id: 14, title: 'Discourse Markers Advanced', subtitle: 'Linking Ideas in Academic Writing & Debate' },
  { id: 15, title: 'Nominalization', subtitle: 'Converting Verbs to Nouns for Academic Style' },
  { id: 16, title: 'Comparative Structures', subtitle: 'Complex Comparisons & Superlatives B2' },
  { id: 17, title: 'Quantifiers Advanced', subtitle: 'Few/Little/A few/A little + Formal Usage' },
  { id: 18, title: 'Conjunctions B2', subtitle: 'Complex Connectors & Sentence Joining' },
  { id: 19, title: 'Error Recognition', subtitle: 'Identifying & Correcting Common B2 Mistakes' },
  { id: 20, title: 'Grammar Review & Application', subtitle: 'Mixed B2 Grammar Practice' },
];

function fallbackTheory(title) {
  return [
    { name: 'Overview', color: 'blue', icon: '📘', points: [
      `${title} adalah salah satu aspek grammar penting di level B2 CEFR.`,
      'Di level ini, ketepatan gramatikal dalam konteks formal menjadi sangat penting.',
      'Structure ini banyak digunakan dalam academic writing, debat, dan presentasi formal.',
      'Pelajari pola kalimat, signal words, dan konteks penggunaannya dengan seksama.',
      'Berlatih dengan contoh kalimat nyata dari berbagai teks akademik dan berita.',
    ]},
    { name: 'Key Patterns', color: 'indigo', icon: '🔑', points: [
      'Identifikasi struktur gramatikal utama dan pola sintaksis yang digunakan.',
      'Perhatikan perbedaan antara formal dan informal usage untuk struktur ini.',
      'Pelajari pasangan / kombinasi kata yang sering muncul bersama.',
      'Latih penggunaan dalam kalimat panjang dan teks multi-paragraf.',
    ]},
    { name: 'Common Errors', color: 'red', icon: '⚠️', points: [
      'Kesalahan umum level ini sering terjadi saat terburu-buru atau tidak cek kembali.',
      'Selalu verifikasi agreement (subjek-verb, tense consistency) dalam kalimat panjang.',
      'Perhatikan preposisi yang mengikuti kata kerja atau kata sifat tertentu.',
      'Review kembali tulisan Anda sebelum disubmit untuk menemukan kesalahan halus.',
    ]},
  ];
}

function fallbackQuiz(title) {
  return [
    { q: `Which describes the primary characteristic of ${title}?`, opts: ['It only appears in spoken English', 'It is a complex grammatical structure used in formal B2 contexts', 'It is only used in questions', 'It replaces all other grammar patterns'], ans: 'It is a complex grammatical structure used in formal B2 contexts', exp: `${title} adalah struktur gramatikal B2 yang digunakan secara luas dalam konteks formal dan akademik.` },
    { q: 'At CEFR B2 level, writers are expected to use grammar with ___', opts: ['No errors at all', 'A high degree of accuracy in complex contexts', 'Only basic sentences', 'Primarily spoken patterns'], ans: 'A high degree of accuracy in complex contexts', exp: 'CEFR B2 mengharuskan pengguna untuk menampilkan kontrol gramatikal yang baik dalam teks kompleks.' },
    { q: 'Which sentence demonstrates higher grammatical sophistication?', opts: ['I work here.', 'Having worked here for years, I understand the culture well.', 'I am working here now.', 'I worked here.'], ans: 'Having worked here for years, I understand the culture well.', exp: 'Participle clause "Having worked..." menunjukkan tingkat sophistication gramatikal yang lebih tinggi.' },
    { q: 'Formal academic writing generally requires ___', opts: ['Contractions and slang', 'Passive voice and complex sentence structures', 'Simple subject-verb patterns', 'Conversational tone'], ans: 'Passive voice and complex sentence structures', exp: 'Academic writing formal menggunakan passive voice dan struktur kompleks untuk objektivitas dan presisi.' },
    { q: 'Which is a sign of B2-level grammatical competence?', opts: ['Using only simple sentences', 'Mixing tenses randomly', 'Using varied sentence structures appropriately', 'Avoiding all complex grammar'], ans: 'Using varied sentence structures appropriately', exp: 'B2 menunjukkan kemampuan menggunakan berbagai struktur kalimat yang kompleks dengan tepat.' },
    { q: 'Error correction is important because it ___', opts: ['Makes writing shorter', 'Improves clarity and credibility of the text', 'Eliminates all vocabulary', 'Replaces ideas with structure'], ans: 'Improves clarity and credibility of the text', exp: 'Memperbaiki kesalahan gramatikal meningkatkan kejernihan dan kredibilitas tulisan Anda.' },
    { q: 'Which word signals strong contrast in formal writing?', opts: ['And', 'So', 'Nevertheless', 'Because'], ans: 'Nevertheless', exp: '"Nevertheless" adalah konektor formal yang kuat untuk menyatakan kontras antara dua argumen.' },
    { q: 'The passive voice is preferred in academic writing because it ___', opts: ['Sounds more informal', 'Focuses on the action not the actor for objectivity', 'Is shorter than active voice', 'Is easier to construct'], ans: 'Focuses on the action not the actor for objectivity', exp: 'Passive voice memindahkan fokus dari pelaku ke tindakan, menciptakan nada objektif yang cocok untuk akademik.' },
    { q: 'Which structure correctly uses "not only... but also"?', opts: ['Not only he studies, but also works.', 'Not only does he study, but he also works.', 'Not only he does study, but also works.', 'Not only studying, but also work.'], ans: 'Not only does he study, but he also works.', exp: '"Not only" diikuti inversion: does/is/has + subject. "Not only does he study, but he also works."' },
    { q: 'Which connector adds information while contrasting simultaneously?', opts: ['Therefore', 'However', 'While', 'Despite'], ans: 'While', exp: '"While" dapat digunakan untuk menambahkan informasi yang berkontras dalam satu kalimat ("While X is true, Y is also important").' },
    { q: 'Cleft sentences are used to ___', opts: ['Shorten sentences', 'Emphasize a specific element of a sentence', 'Replace relative clauses', 'Remove the subject'], ans: 'Emphasize a specific element of a sentence', exp: 'Cleft sentences ("It is X that...") digunakan untuk memberikan penekanan pada elemen tertentu.' },
    { q: 'Which is an example of nominalization?', opts: ['He decided to go.', 'His decision to go shocked us.', 'He was going there.', 'Going was his plan.'], ans: 'His decision to go shocked us.', exp: 'Nominalization: kata kerja "decided" diubah menjadi nomina "decision" untuk gaya akademik yang lebih formal.' },
    { q: 'Which preposition commonly follows "the reason"?', opts: ['of', 'by', 'for', 'to'], ans: 'for', exp: '"The reason for + noun" atau "the reason why + clause" adalah kolokasi baku dalam formal English.' },
    { q: 'To avoid repetition in formal texts, writers use ___', opts: ['Synonyms and ellipsis', 'The same word repeatedly', 'Short sentences', 'Only pronouns'], ans: 'Synonyms and ellipsis', exp: 'Sinonim dan ellipsis (menghilangkan bagian yang sudah jelas) digunakan untuk menghindari repetisi.' },
    { q: 'Which is NOT a discourse marker for adding information?', opts: ['Furthermore', 'In addition', 'Nevertheless', 'Moreover'], ans: 'Nevertheless', exp: '"Nevertheless" digunakan untuk kontras, bukan untuk menambah informasi. Tiga lainnya digunakan untuk penambahan.' },
    { q: 'In academic style, "big" should be replaced with ___', opts: ['Large', 'Substantial', 'Huge', 'Significant'], ans: 'Substantial', exp: '"Substantial" atau "significant" adalah pilihan yang lebih akademik dibandingkan "big" atau "large".' },
    { q: '"Despite" is followed by ___', opts: ['A full clause', 'A noun phrase or gerund', 'An infinitive', 'An adjective only'], ans: 'A noun phrase or gerund', exp: '"Despite" diikuti langsung oleh noun phrase atau gerund: "Despite the rain" / "Despite working hard".' },
    { q: 'Which structure shows condition without "if"?', opts: ['Unless + past', 'Were + subject + infinitive', 'Although + subject', 'Since + noun'], ans: 'Were + subject + infinitive', exp: '"Were I to leave early..." adalah inversion conditional formal yang menggantikan "If I were to leave early...".' },
    { q: 'Which linking expression introduces a conclusion?', opts: ['In contrast', 'In addition', 'As a result', 'On the other hand'], ans: 'As a result', exp: '"As a result" menunjukkan hasil atau konsekuensi dari pernyataan sebelumnya.' },
    { q: 'Which is the BEST academic version of "The company got more money from investors"?', opts: ['The company received additional funding from investors.', 'The company got more dollars from people.', 'More money was got by the company.', 'Investors gave the company lots of cash.'], ans: 'The company received additional funding from investors.', exp: '"Received additional funding" adalah ekspresi formal yang tepat untuk konteks akademik dan bisnis.' },
  ];
}

function buildFile(id, spec) {
  const nextId = id < 20 ? id + 1 : null;
  const nextPath = nextId ? '/modul/english/upper-intermediate/grammar/lesson-' + nextId : '/modul/english/upper-intermediate/grammar';
  const theory = spec.theory || fallbackTheory(spec.title);
  const examples = spec.examples || ['Study advanced grammar patterns carefully.', 'Apply them in formal writing contexts.', 'Practise with authentic academic texts.'];
  const quiz = spec.quiz || fallbackQuiz(spec.title);

  const theoryData = JSON.stringify(theory, null, 2);
  const examplesData = JSON.stringify(examples, null, 2);
  const quizData = JSON.stringify(quiz, null, 2);

  return `import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LessonShell from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Star, Lightbulb } from 'lucide-react';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

interface TheoryBlock { name: string; color: string; icon: string; points: string[]; }
interface QuizItem { q: string; opts: string[]; ans: string; exp: string; }

const THEORY: TheoryBlock[] = ${theoryData};
const EXAMPLES: string[] = ${examplesData};
const QUIZ: QuizItem[] = ${quizData};

const UpperInterGrammarLesson${id}: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('upper_intermediate_grammar', ${id});
  const nextLessonPath = '${nextPath}';

  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string|null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  const handleCheckQuiz = (opt: string) => {
    if (isAnswerChecked) return;
    setSelectedOption(opt);
    setIsAnswerChecked(true);
    if (opt === QUIZ[quizStep].ans) setQuizScore(p => p + 1);
  };

  const nextQuestion = () => {
    if (quizStep < QUIZ.length - 1) { setQuizStep(p => p+1); setSelectedOption(null); setIsAnswerChecked(false); }
    else setShowResult(true);
  };

  const restartQuiz = () => { setQuizStep(0); setQuizScore(0); setShowResult(false); setSelectedOption(null); setIsAnswerChecked(false); };

  const COLORS: Record<string,string> = { blue:'#2563EB', indigo:'#4F46E5', amber:'#D97706', red:'#DC2626', violet:'#7C3AED', purple:'#9333EA', green:'#16A34A' };

  return (
    <>
      <LessonCompleteModal
        show={showCompleteModal}
        onClose={() => setShowCompleteModal(false)}
        lessonLabel="Upper-Intermediate Grammar Lesson ${id}"
        accentColor="${ACCENT_COLOR}"
        nextLessonPath={nextLessonPath}
        onNext={() => { setShowCompleteModal(false); navigate(nextLessonPath); }}
        onBack={() => { setShowCompleteModal(false); navigate(-1); }}
      />
      <LessonShell
        title="${spec.title}"
        subtitle="Grammar B2 • Pelajaran ${id}"
        accentColor="${ACCENT_COLOR}"
        nextLesson={nextLessonPath}
        tabs={[
          { id: 'learn', label: 'Teori', icon: <BookOpen size={14} /> },
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
              <div className="rounded-3xl p-6 text-white shadow-xl relative overflow-hidden" style={{background:'linear-gradient(135deg,${ACCENT_COLOR},#0E2D4A)'}}>
                <div className="text-3xl mb-2">📐</div>
                <h2 className="text-xl font-extrabold mb-1">${spec.title}</h2>
                <p className="text-sm opacity-90">${spec.subtitle}</p>
                <div className="mt-3 inline-block bg-white/20 px-3 py-1 rounded-full text-xs font-bold">🎯 CEFR B2 · Grammar</div>
              </div>

              {THEORY.map((block, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">{block.icon}</span>
                    <h3 className="font-bold text-slate-800">{block.name}</h3>
                  </div>
                  <ul className="space-y-2">
                    {block.points.map((p, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{backgroundColor: COLORS[block.color] || '#4F46E5'}}></span>
                        <span dangerouslySetInnerHTML={{__html: p.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>')}} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="bg-indigo-50 rounded-2xl p-5 border border-indigo-100">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-bold text-indigo-800 text-sm">Contoh Kalimat</h3>
                </div>
                {EXAMPLES.map((ex, i) => (
                  <div key={i} className="bg-white p-3 rounded-xl border border-indigo-100 mb-2 text-sm text-slate-700"
                    dangerouslySetInnerHTML={{__html: ex.replace(/\*\*(.*?)\*\*/g,'<strong class="text-indigo-700">$1</strong>').replace(/→/g,'<span class="text-slate-400 mx-1">→</span>')}} />
                ))}
              </div>
            </div>
          );

          if (tabId === 'practice') return (
            <div className="p-4 animate-fade-in">
              <div className="max-w-xl mx-auto">
                {!showResult ? (
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xs font-bold text-slate-400 uppercase">Soal {quizStep+1}/{QUIZ.length}</span>
                      <span className="text-xs font-bold bg-blue-50 text-blue-700 px-3 py-1 rounded-full">Skor: {quizScore}</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 mb-5">
                      <div className="h-1.5 rounded-full bg-blue-600 transition-all" style={{width: ((quizStep/QUIZ.length)*100)+'%'}}></div>
                    </div>
                    <h3 className="text-base font-bold text-slate-800 mb-5">{QUIZ[quizStep].q}</h3>
                    <div className="space-y-3">
                      {QUIZ[quizStep].opts.map((opt, i) => {
                        let cls = 'border-slate-200 hover:border-blue-300 hover:bg-blue-50';
                        if (isAnswerChecked) {
                          if (opt === QUIZ[quizStep].ans) cls = 'bg-green-50 border-green-500 text-green-800';
                          else if (opt === selectedOption) cls = 'bg-red-50 border-red-400 text-red-700';
                          else cls = 'opacity-40 border-slate-200';
                        }
                        return (
                          <button key={i} onClick={() => handleCheckQuiz(opt)} disabled={isAnswerChecked}
                            className={'w-full p-4 rounded-xl border-2 text-left font-medium transition-all flex items-center justify-between text-sm ' + cls}>
                            <span>{opt}</span>
                            {isAnswerChecked && opt === QUIZ[quizStep].ans && <CheckCircle2 size={16} className="text-green-600 shrink-0" />}
                            {isAnswerChecked && opt === selectedOption && opt !== QUIZ[quizStep].ans && <XCircle size={16} className="text-red-500 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                    {isAnswerChecked && (
                      <div className="mt-5">
                        <div className={'p-3 rounded-xl text-sm mb-4 ' + (selectedOption === QUIZ[quizStep].ans ? 'bg-green-50 text-green-800 border border-green-100' : 'bg-orange-50 text-orange-800 border border-orange-100')}>
                          <strong>{selectedOption === QUIZ[quizStep].ans ? '✅ Benar!' : '❌ Belum tepat.'}</strong> {QUIZ[quizStep].exp}
                        </div>
                        <button onClick={nextQuestion} className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all">
                          {quizStep < QUIZ.length-1 ? 'Lanjutkan →' : 'Lihat Skor'}
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Star className="w-10 h-10 text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Kuis Grammar Selesai!</h2>
                    <p className="text-slate-500 mb-2">Skor: <strong className="text-blue-600 text-2xl">{quizScore}</strong> / {QUIZ.length}</p>
                    <p className="text-sm text-slate-400 mb-8">{quizScore >= 16 ? '🏆 Excellent! Grammar B2 kamu sangat solid.' : quizScore >= 10 ? '👍 Good job! Terus berlatih.' : '💪 Jangan menyerah, review teori lagi!'}</p>
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

export default UpperInterGrammarLesson${id};
`;
}

console.log('Building Upper-Intermediate Grammar (B2) lessons...');
const ALL_TOPICS = [...LESSONS, ...TOPICS];
for (let id = 1; id <= 20; id++) {
  const spec = ALL_TOPICS.find(l => l.id === id) || { id, title: `Grammar Lesson ${id}`, subtitle: 'B2 Grammar Practice' };
  const code = buildFile(id, spec);
  fs.writeFileSync(path.join(OUT_DIR, `Lesson${id}.tsx`), code, 'utf8');
  console.log(`✅ Grammar Lesson${id}.tsx`);
}
console.log('🚀 All 20 Upper-Intermediate Grammar lessons built!');
