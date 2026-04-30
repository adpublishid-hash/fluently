export type FormulaBlock = {
  label: string;
  pattern: string;
  example: string;
  note: string;
};

export type GrammarExample = {
  en: string;
  id: string;
  note: string;
};

export type PracticeQuestion = {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
};

export type IntermediateGrammarLesson = {
  id: number;
  title: string;
  summary: string;
  objective: string;
  keyUses: string[];
  formulas: FormulaBlock[];
  commonMistakes: string[];
  examples: GrammarExample[];
  practice: PracticeQuestion[];
};

const distractorPatterns = [
  'Subject + will + verb-ing',
  'Subject + did + past participle',
  'Subject + have/has + base verb',
  'If + will + base verb, would + base verb',
  'Subject + modal + to + base verb',
  'Subject + be + base verb',
];

function uniqueOptions(options: string[], fallback: string[]): string[] {
  const seen = new Set<string>();
  const merged = [...options, ...fallback].filter((item) => {
    if (!item || seen.has(item)) return false;
    seen.add(item);
    return true;
  });
  return merged.slice(0, 3);
}

function parseCorrection(mistake: string): { wrong: string; correct: string } | null {
  const match = mistake.match(/Salah:\s*(.*?)\.\s*Benar:\s*(.*?)\./);
  if (!match) return null;
  return { wrong: match[1], correct: match[2] };
}

export function getExpandedGrammarExamples(lesson: IntermediateGrammarLesson): GrammarExample[] {
  const formulaExamples = lesson.formulas.map((formula) => ({
    en: formula.example,
    id: formula.pattern,
    note: `${formula.label}: ${formula.note}`,
  }));

  const correctionExamples = lesson.commonMistakes
    .map(parseCorrection)
    .filter((item): item is { wrong: string; correct: string } => Boolean(item))
    .map((item) => ({
      en: item.correct,
      id: `Hindari: ${item.wrong}`,
      note: 'Versi koreksi yang lebih natural dan akurat.',
    }));

  const practiceExamples = lesson.practice.slice(0, 4).map((item) => ({
    en: item.question.replace('___', item.answer),
    id: item.explanation,
    note: 'Contoh dari pola latihan.',
  }));

  const merged = [...lesson.examples, ...formulaExamples, ...correctionExamples, ...practiceExamples];
  const seen = new Set<string>();
  return merged.filter((item) => {
    if (seen.has(item.en)) return false;
    seen.add(item.en);
    return true;
  });
}

export function getInteractivePracticeSet(lesson: IntermediateGrammarLesson): PracticeQuestion[] {
  const questions: PracticeQuestion[] = [...lesson.practice];

  lesson.formulas.forEach((formula, index) => {
    const distractors = uniqueOptions(
      lesson.formulas
        .filter((item) => item.pattern !== formula.pattern)
        .map((item) => item.pattern),
      distractorPatterns,
    );

    questions.push({
      question: `Rumus mana yang tepat untuk "${formula.label}"?`,
      options: uniqueOptions([formula.pattern, ...distractors], distractorPatterns),
      answer: formula.pattern,
      explanation: formula.note,
    });

    questions.push({
      question: `Kalimat mana yang memakai pola "${formula.label}" dengan benar?`,
      options: uniqueOptions([
        formula.example,
        lesson.examples[index % lesson.examples.length]?.en,
        lesson.practice[index % lesson.practice.length]?.question.replace('___', lesson.practice[index % lesson.practice.length]?.options[0] ?? ''),
      ], lesson.examples.map((item) => item.en)),
      answer: formula.example,
      explanation: `Contoh ini mengikuti rumus: ${formula.pattern}.`,
    });
  });

  lesson.commonMistakes.forEach((mistake) => {
    const correction = parseCorrection(mistake);
    if (!correction) return;
    questions.push({
      question: 'Pilih kalimat yang benar.',
      options: uniqueOptions([correction.correct, correction.wrong], lesson.examples.map((item) => item.en)),
      answer: correction.correct,
      explanation: mistake,
    });
  });

  lesson.examples.forEach((example) => {
    questions.push({
      question: `Apa fungsi grammar dari kalimat ini? "${example.en}"`,
      options: uniqueOptions([example.note, lesson.objective, lesson.keyUses[0]], lesson.keyUses),
      answer: example.note,
      explanation: example.note,
    });
  });

  let cursor = 0;
  while (questions.length < 20) {
    const formula = lesson.formulas[cursor % lesson.formulas.length];
    const example = lesson.examples[cursor % lesson.examples.length];
    questions.push({
      question: `Lengkapi ide grammar berikut: ${formula.label}`,
      options: uniqueOptions([formula.example, example.en, formula.pattern], lesson.examples.map((item) => item.en)),
      answer: formula.example,
      explanation: `${formula.example} adalah contoh untuk ${formula.pattern}.`,
    });
    cursor += 1;
  }

  return questions.slice(0, 20);
}

export const intermediateGrammarLessons: IntermediateGrammarLesson[] = [
  {
    id: 1,
    title: 'Present Perfect vs Past Simple',
    summary: 'Membedakan pengalaman yang masih relevan dengan kejadian selesai di waktu lampau.',
    objective: 'Siswa mampu memilih tense yang tepat saat membicarakan pengalaman, berita terbaru, dan waktu lampau spesifik.',
    keyUses: [
      'Present Perfect dipakai saat waktunya tidak spesifik atau hasilnya masih terasa sekarang.',
      'Past Simple dipakai saat ada waktu selesai yang jelas seperti yesterday, last week, atau in 2020.',
      'Gunakan ever, never, just, already, yet, for, dan since dengan Present Perfect.',
    ],
    formulas: [
      { label: 'Present Perfect positive', pattern: 'Subject + have/has + past participle (V3)', example: 'I have visited Singapore twice.', note: 'Fokus pada pengalaman, bukan waktu detail.' },
      { label: 'Present Perfect negative', pattern: 'Subject + have/has + not + V3', example: 'She has not finished the report yet.', note: 'Yet biasanya dipakai dalam negatif dan pertanyaan.' },
      { label: 'Present Perfect question', pattern: 'Have/Has + subject + V3?', example: 'Have you ever tried Thai food?', note: 'Ever menanyakan pengalaman hidup.' },
      { label: 'Past Simple', pattern: 'Subject + V2 / did not + base verb', example: 'We met them last Friday.', note: 'Last Friday membuat waktunya spesifik dan selesai.' },
    ],
    commonMistakes: [
      'Salah: I have seen him yesterday. Benar: I saw him yesterday.',
      'Salah: She has went home. Benar: She has gone home.',
      'Salah: Did you ever been there? Benar: Have you ever been there?',
    ],
    examples: [
      { en: 'I have lost my keys, so I cannot enter the house.', id: 'Saya kehilangan kunci, jadi saya tidak bisa masuk rumah.', note: 'Hasilnya masih terasa sekarang.' },
      { en: 'I lost my keys yesterday, but I found them later.', id: 'Saya kehilangan kunci kemarin, tapi menemukannya kemudian.', note: 'Waktu selesai jelas.' },
      { en: 'She has worked here since 2021.', id: 'Dia sudah bekerja di sini sejak 2021.', note: 'Since menunjuk titik mulai.' },
      { en: 'She worked here in 2021.', id: 'Dia bekerja di sini pada 2021.', note: 'Kejadian selesai di masa lampau.' },
    ],
    practice: [
      { question: 'I ___ my wallet yesterday.', options: ['have lost', 'lost', 'has lost'], answer: 'lost', explanation: 'Yesterday adalah waktu lampau spesifik, jadi gunakan Past Simple.' },
      { question: 'Have you ___ this film before?', options: ['saw', 'seen', 'see'], answer: 'seen', explanation: 'Present Perfect memakai past participle atau V3.' },
      { question: 'She ___ three emails this morning, and it is still morning.', options: ['sent', 'has sent', 'send'], answer: 'has sent', explanation: 'This morning masih berlangsung, jadi Present Perfect bisa dipakai.' },
    ],
  },
  {
    id: 2,
    title: 'Present Perfect Continuous',
    summary: 'Menjelaskan aktivitas yang dimulai di masa lalu dan masih berlangsung atau baru saja selesai.',
    objective: 'Siswa mampu menekankan durasi aktivitas dengan for dan since.',
    keyUses: [
      'Dipakai untuk aktivitas yang berlangsung dari masa lalu sampai sekarang.',
      'Menekankan proses atau durasi, bukan hasil akhir.',
      'Sering muncul dengan for, since, recently, dan lately.',
    ],
    formulas: [
      { label: 'Positive', pattern: 'Subject + have/has + been + verb-ing', example: 'I have been studying for two hours.', note: 'For menunjukkan durasi.' },
      { label: 'Negative', pattern: 'Subject + have/has + not + been + verb-ing', example: 'He has not been sleeping well lately.', note: 'Lately berarti akhir-akhir ini.' },
      { label: 'Question', pattern: 'Have/Has + subject + been + verb-ing?', example: 'Have you been waiting long?', note: 'Pertanyaan menanyakan durasi/proses.' },
      { label: 'Contrast', pattern: 'Present Perfect = result; Present Perfect Continuous = process', example: 'I have read the book. / I have been reading the book.', note: 'Read selesai; been reading menekankan aktivitas.' },
    ],
    commonMistakes: [
      'Salah: I am living here since 2020. Benar: I have been living here since 2020.',
      'Salah: She has been know him. Benar: She has known him.',
      'Stative verbs seperti know, believe, own biasanya tidak memakai continuous.',
    ],
    examples: [
      { en: 'They have been learning English for six months.', id: 'Mereka sudah belajar bahasa Inggris selama enam bulan.', note: 'Aktivitas masih berlanjut.' },
      { en: 'Why are you tired? I have been running.', id: 'Kenapa kamu lelah? Saya habis berlari.', note: 'Efek aktivitas terlihat sekarang.' },
      { en: 'She has been working from home recently.', id: 'Dia akhir-akhir ini bekerja dari rumah.', note: 'Kebiasaan sementara.' },
    ],
    practice: [
      { question: 'We ___ for the bus for 30 minutes.', options: ['wait', 'have been waiting', 'waited'], answer: 'have been waiting', explanation: 'For 30 minutes menekankan durasi sampai sekarang.' },
      { question: 'He ___ tired because he has been studying all night.', options: ['is', 'has', 'was'], answer: 'is', explanation: 'Kondisi sekarang adalah akibat aktivitas.' },
      { question: 'She ___ him since childhood.', options: ['has been knowing', 'has known', 'is knowing'], answer: 'has known', explanation: 'Know adalah stative verb, gunakan Present Perfect biasa.' },
    ],
  },
  {
    id: 3,
    title: 'Past Perfect vs Past Simple',
    summary: 'Menunjukkan kejadian yang terjadi lebih dulu sebelum kejadian lain di masa lalu.',
    objective: 'Siswa mampu menyusun urutan kejadian lampau dengan had + V3.',
    keyUses: [
      'Past Perfect dipakai untuk kejadian yang terjadi lebih dulu.',
      'Past Simple dipakai untuk kejadian kedua atau rangkaian utama.',
      'Sering dipakai dengan before, after, already, dan by the time.',
    ],
    formulas: [
      { label: 'Past Perfect positive', pattern: 'Subject + had + past participle (V3)', example: 'I had eaten before they arrived.', note: 'Makan terjadi lebih dulu.' },
      { label: 'Past Perfect negative', pattern: 'Subject + had not + V3', example: 'She had not seen the email before the meeting.', note: 'Belum terjadi sebelum titik lampau.' },
      { label: 'Past Perfect question', pattern: 'Had + subject + V3?', example: 'Had you met him before the conference?', note: 'Menanyakan pengalaman sebelum masa lampau lain.' },
      { label: 'Past Simple sequence', pattern: 'Subject + V2 + after/before + subject + had + V3', example: 'We left after the rain had stopped.', note: 'After membantu menunjukkan urutan.' },
    ],
    commonMistakes: [
      'Salah: I had went home. Benar: I had gone home.',
      'Jangan pakai Past Perfect jika hanya ada satu kejadian lampau sederhana.',
      'Salah: When I arrived, he left. Bisa berarti dia pergi setelah saya tiba; gunakan had left jika dia sudah pergi sebelumnya.',
    ],
    examples: [
      { en: 'When I arrived, the movie had already started.', id: 'Saat saya tiba, filmnya sudah mulai.', note: 'Film mulai sebelum saya tiba.' },
      { en: 'She failed the test because she had not prepared enough.', id: 'Dia gagal karena tidak cukup persiapan.', note: 'Persiapan terjadi sebelum tes.' },
      { en: 'After we had checked in, we went to our room.', id: 'Setelah check-in, kami pergi ke kamar.', note: 'Urutan formal dan jelas.' },
    ],
    practice: [
      { question: 'By the time we arrived, the train ___.', options: ['left', 'had left', 'has left'], answer: 'had left', explanation: 'Kereta pergi sebelum kami tiba.' },
      { question: 'I ___ my homework before I watched TV.', options: ['had finished', 'have finished', 'finish'], answer: 'had finished', explanation: 'Homework selesai lebih dulu di masa lalu.' },
      { question: 'She was angry because he ___ her birthday.', options: ['forgot', 'had forgotten', 'has forgotten'], answer: 'had forgotten', explanation: 'Lupa terjadi sebelum dia marah.' },
    ],
  },
  {
    id: 4,
    title: 'Past Perfect Continuous',
    summary: 'Menekankan durasi aktivitas sebelum kejadian lain di masa lalu.',
    objective: 'Siswa mampu menjelaskan penyebab atau latar belakang kejadian lampau.',
    keyUses: [
      'Dipakai untuk aktivitas yang sedang berlangsung sebelum titik lampau lain.',
      'Menekankan durasi dengan for atau since.',
      'Sering dipakai untuk menjelaskan alasan kondisi masa lalu.',
    ],
    formulas: [
      { label: 'Positive', pattern: 'Subject + had + been + verb-ing', example: 'I had been working for ten hours when you called.', note: 'Aktivitas berlangsung sebelum panggilan.' },
      { label: 'Negative', pattern: 'Subject + had not + been + verb-ing', example: 'They had not been waiting long when the bus came.', note: 'Menjelaskan durasi yang tidak lama.' },
      { label: 'Question', pattern: 'Had + subject + been + verb-ing?', example: 'Had she been crying before the meeting?', note: 'Menanyakan aktivitas sebelum kejadian lampau.' },
      { label: 'Cause in the past', pattern: 'Subject + was/were + adjective because + subject + had been + verb-ing', example: 'He was exhausted because he had been driving all night.', note: 'Aktivitas menjadi penyebab kondisi.' },
    ],
    commonMistakes: [
      'Salah: I was tired because I was working all day. Lebih tepat: I had been working all day.',
      'Jangan gunakan continuous untuk stative verbs seperti know atau own.',
      'Bedakan had worked (hasil) dan had been working (proses/durasi).',
    ],
    examples: [
      { en: 'Her eyes were red because she had been crying.', id: 'Matanya merah karena dia habis menangis.', note: 'Efek aktivitas terlihat di masa lalu.' },
      { en: 'We had been walking for an hour before we found a cafe.', id: 'Kami sudah berjalan satu jam sebelum menemukan kafe.', note: 'Durasi sebelum kejadian lain.' },
      { en: 'The ground was wet because it had been raining.', id: 'Tanahnya basah karena sebelumnya hujan.', note: 'Penyebab kondisi lampau.' },
    ],
    practice: [
      { question: 'He was sleepy because he ___ all night.', options: ['had been studying', 'has studied', 'studies'], answer: 'had been studying', explanation: 'Aktivitas berlangsung sebelum kondisi lampau.' },
      { question: 'They ___ for two hours before the manager arrived.', options: ['waited', 'had been waiting', 'have waited'], answer: 'had been waiting', explanation: 'Durasi sebelum kejadian lain di masa lampau.' },
      { question: 'The road was wet because it ___.', options: ['had been raining', 'rains', 'has rained'], answer: 'had been raining', explanation: 'Menjelaskan penyebab kondisi lampau.' },
    ],
  },
  {
    id: 5,
    title: 'Future Forms: Will, Going To, Present Continuous',
    summary: 'Memilih bentuk future sesuai fungsi: keputusan spontan, rencana, prediksi, dan jadwal pribadi.',
    objective: 'Siswa mampu membedakan will, be going to, dan Present Continuous untuk masa depan.',
    keyUses: [
      'Will untuk keputusan spontan, janji, tawaran, dan prediksi umum.',
      'Be going to untuk rencana atau bukti kuat sekarang.',
      'Present Continuous untuk arrangement yang sudah diatur.',
    ],
    formulas: [
      { label: 'Will', pattern: 'Subject + will + base verb', example: 'I will call you later.', note: 'Keputusan atau janji.' },
      { label: 'Going to', pattern: 'Subject + am/is/are + going to + base verb', example: 'We are going to move next month.', note: 'Rencana sudah ada.' },
      { label: 'Present Continuous for future', pattern: 'Subject + am/is/are + verb-ing + future time', example: 'I am meeting Sarah tonight.', note: 'Arrangement pribadi.' },
      { label: 'Negative future', pattern: 'Subject + will not / am not going to + base verb', example: 'They will not join us.', note: 'Will not sering disingkat won\'t.' },
    ],
    commonMistakes: [
      'Salah: I will going to call you. Benar: I will call you atau I am going to call you.',
      'Gunakan going to jika ada bukti: Look at those clouds. It is going to rain.',
      'Present Continuous future perlu konteks waktu masa depan.',
    ],
    examples: [
      { en: 'The phone is ringing. I will answer it.', id: 'Telepon berbunyi. Saya akan mengangkatnya.', note: 'Keputusan spontan.' },
      { en: 'Look at the traffic. We are going to be late.', id: 'Lihat macetnya. Kita akan terlambat.', note: 'Prediksi berdasarkan bukti.' },
      { en: 'We are having dinner with clients tomorrow.', id: 'Kami akan makan malam dengan klien besok.', note: 'Arrangement sudah dibuat.' },
    ],
    practice: [
      { question: 'Look! That glass ___.', options: ['will fall', 'is going to fall', 'falls'], answer: 'is going to fall', explanation: 'Ada bukti sekarang, gunakan going to.' },
      { question: 'I forgot my wallet. I ___ lend you some money.', options: ['am going to', 'will', 'am lending'], answer: 'will', explanation: 'Keputusan spontan untuk membantu.' },
      { question: 'We ___ the dentist at 4 PM tomorrow.', options: ['are seeing', 'will seeing', 'see'], answer: 'are seeing', explanation: 'Appointment yang sudah diatur.' },
    ],
  },
  {
    id: 6,
    title: 'Future Continuous & Future Perfect',
    summary: 'Membicarakan aktivitas yang sedang berlangsung atau sudah selesai pada waktu tertentu di masa depan.',
    objective: 'Siswa mampu memakai will be + V-ing dan will have + V3 untuk jadwal dan target.',
    keyUses: [
      'Future Continuous untuk aktivitas yang sedang berlangsung di waktu masa depan.',
      'Future Perfect untuk aktivitas yang akan selesai sebelum waktu tertentu.',
      'Sering dipakai dengan by, by the time, at this time tomorrow, dan in two years.',
    ],
    formulas: [
      { label: 'Future Continuous', pattern: 'Subject + will be + verb-ing', example: 'At 8 PM, I will be studying.', note: 'Sedang berlangsung pada waktu masa depan.' },
      { label: 'Future Perfect', pattern: 'Subject + will have + past participle (V3)', example: 'By Friday, we will have finished the project.', note: 'Selesai sebelum Jumat.' },
      { label: 'Future Perfect negative', pattern: 'Subject + will not have + V3', example: 'She will not have arrived by noon.', note: 'Belum selesai sebelum titik waktu.' },
      { label: 'Question', pattern: 'Will + subject + be + V-ing? / Will + subject + have + V3?', example: 'Will you be working tonight?', note: 'Pilih bentuk sesuai makna.' },
    ],
    commonMistakes: [
      'Salah: I will be study. Benar: I will be studying.',
      'Salah: By 2027, I will finish my degree. Lebih tepat: I will have finished my degree.',
      'Future Perfect biasanya membutuhkan batas waktu masa depan.',
    ],
    examples: [
      { en: 'This time tomorrow, I will be flying to Bali.', id: 'Besok pada jam ini, saya akan sedang terbang ke Bali.', note: 'Aktivitas berlangsung.' },
      { en: 'By the end of the month, they will have moved to a new office.', id: 'Pada akhir bulan, mereka sudah akan pindah kantor.', note: 'Selesai sebelum batas waktu.' },
      { en: 'Do not call at 9. I will be presenting.', id: 'Jangan telepon jam 9. Saya akan sedang presentasi.', note: 'Jadwal sedang berlangsung.' },
    ],
    practice: [
      { question: 'At 10 AM tomorrow, I ___ a test.', options: ['will take', 'will be taking', 'will have taken'], answer: 'will be taking', explanation: 'Aktivitas sedang berlangsung pada jam 10.' },
      { question: 'By next week, we ___ the report.', options: ['will have completed', 'will be completing', 'complete'], answer: 'will have completed', explanation: 'Selesai sebelum next week.' },
      { question: 'This time next year, she ___ in Canada.', options: ['will be studying', 'will have studied', 'studies'], answer: 'will be studying', explanation: 'Aktivitas berlangsung pada waktu masa depan.' },
    ],
  },
  {
    id: 7,
    title: 'Modals of Deduction and Possibility',
    summary: 'Menggunakan must, might, may, could, dan can\'t untuk menebak berdasarkan bukti.',
    objective: 'Siswa mampu menyatakan tingkat kepastian dalam present dan past.',
    keyUses: [
      'Must berarti sangat yakin sesuatu benar.',
      'Might, may, could berarti mungkin.',
      'Can\'t berarti sangat yakin sesuatu tidak benar.',
    ],
    formulas: [
      { label: 'Present deduction', pattern: 'Subject + must/might/may/could/can\'t + base verb', example: 'He must be tired.', note: 'Kesimpulan sekarang.' },
      { label: 'Continuous deduction', pattern: 'Subject + modal + be + verb-ing', example: 'She might be sleeping.', note: 'Kemungkinan sedang terjadi.' },
      { label: 'Past deduction', pattern: 'Subject + modal + have + V3', example: 'They must have left early.', note: 'Kesimpulan tentang masa lalu.' },
      { label: 'Negative certainty', pattern: 'Subject + can\'t + have + V3', example: 'He can\'t have forgotten the meeting.', note: 'Yakin tidak terjadi.' },
    ],
    commonMistakes: [
      'Salah: He must to be tired. Benar: He must be tired.',
      'Salah: She might went home. Benar: She might have gone home.',
      'Mungkin dalam bahasa Inggris bukan always maybe; gunakan might/may/could dalam kalimat.',
    ],
    examples: [
      { en: 'The lights are off. They must be asleep.', id: 'Lampunya mati. Mereka pasti tidur.', note: 'Kesimpulan kuat.' },
      { en: 'She is not answering. She might be in a meeting.', id: 'Dia tidak menjawab. Mungkin sedang rapat.', note: 'Kemungkinan.' },
      { en: 'He can\'t have paid the bill. It is still unpaid.', id: 'Dia tidak mungkin sudah membayar tagihan. Masih belum dibayar.', note: 'Bukti menolak kemungkinan.' },
    ],
    practice: [
      { question: 'Her car is outside. She ___ be at home.', options: ['must', 'can\'t', 'should to'], answer: 'must', explanation: 'Ada bukti kuat bahwa dia di rumah.' },
      { question: 'He looks confused. He ___ understand the instructions.', options: ['must', 'can\'t', 'has to'], answer: 'can\'t', explanation: 'Can\'t menunjukkan kesimpulan negatif kuat.' },
      { question: 'They are late. They ___ missed the bus.', options: ['might have', 'must to have', 'can have'], answer: 'might have', explanation: 'Kemungkinan masa lalu memakai modal + have + V3.' },
    ],
  },
  {
    id: 8,
    title: 'Modals for Obligation, Permission, and Advice',
    summary: 'Membedakan must, have to, should, ought to, can, may, dan be allowed to.',
    objective: 'Siswa mampu memberi saran, menjelaskan aturan, dan meminta izin dengan sopan.',
    keyUses: [
      'Must sering terasa kuat dan berasal dari pembicara/aturan penting.',
      'Have to menunjukkan kewajiban dari situasi atau aturan luar.',
      'Should dan ought to dipakai untuk saran.',
      'Can, may, dan be allowed to dipakai untuk izin.',
    ],
    formulas: [
      { label: 'Obligation', pattern: 'Subject + must/have to + base verb', example: 'Employees have to wear ID cards.', note: 'Kewajiban.' },
      { label: 'No obligation', pattern: 'Subject + do/does not have to + base verb', example: 'You do not have to come early.', note: 'Tidak perlu, bukan larangan.' },
      { label: 'Prohibition', pattern: 'Subject + must not + base verb', example: 'You must not park here.', note: 'Larangan kuat.' },
      { label: 'Advice', pattern: 'Subject + should/ought to + base verb', example: 'You should check your email.', note: 'Saran.' },
    ],
    commonMistakes: [
      'Don\'t have to bukan larangan; artinya tidak perlu.',
      'Salah: You should to rest. Benar: You should rest.',
      'May lebih formal daripada can untuk izin.',
    ],
    examples: [
      { en: 'You must not share your password.', id: 'Kamu tidak boleh membagikan kata sandi.', note: 'Larangan.' },
      { en: 'We have to submit the form by Monday.', id: 'Kami harus menyerahkan formulir sebelum Senin.', note: 'Kewajiban dari aturan.' },
      { en: 'You do not have to print the ticket.', id: 'Kamu tidak perlu mencetak tiket.', note: 'Tidak wajib.' },
    ],
    practice: [
      { question: 'You ___ smoke in the hospital.', options: ['must not', 'do not have to', 'should'], answer: 'must not', explanation: 'Ini larangan.' },
      { question: 'You ___ bring food. Lunch is provided.', options: ['must not', 'do not have to', 'may not'], answer: 'do not have to', explanation: 'Tidak perlu membawa makanan.' },
      { question: 'She has a fever. She ___ see a doctor.', options: ['should', 'must not', 'can to'], answer: 'should', explanation: 'Should untuk saran.' },
    ],
  },
  {
    id: 9,
    title: 'Zero and First Conditional',
    summary: 'Membicarakan fakta umum dan kemungkinan nyata di masa depan.',
    objective: 'Siswa mampu memakai if/unless untuk fakta, aturan, dan rencana nyata.',
    keyUses: [
      'Zero Conditional untuk fakta umum atau hasil yang selalu benar.',
      'First Conditional untuk kemungkinan nyata di masa depan.',
      'Unless berarti if not.',
    ],
    formulas: [
      { label: 'Zero Conditional', pattern: 'If + Present Simple, Present Simple', example: 'If water reaches 100 degrees, it boils.', note: 'Fakta umum.' },
      { label: 'First Conditional', pattern: 'If + Present Simple, will + base verb', example: 'If it rains, we will stay home.', note: 'Kemungkinan nyata.' },
      { label: 'Unless', pattern: 'Unless + Present Simple, will + base verb', example: 'Unless you hurry, you will miss the train.', note: 'Unless = if not.' },
      { label: 'Modal result', pattern: 'If + Present Simple, can/should/must + base verb', example: 'If you feel sick, you should rest.', note: 'Hasil bisa memakai modal.' },
    ],
    commonMistakes: [
      'Salah: If it will rain, we will stay. Benar: If it rains, we will stay.',
      'Jangan pakai will di klausa if untuk First Conditional biasa.',
      'Unless sudah berarti if not, jadi jangan tambah not setelah unless.',
    ],
    examples: [
      { en: 'If you heat ice, it melts.', id: 'Jika es dipanaskan, es mencair.', note: 'Fakta umum.' },
      { en: 'If I finish early, I will call you.', id: 'Jika saya selesai lebih awal, saya akan meneleponmu.', note: 'Kemungkinan nyata.' },
      { en: 'Unless we leave now, we will be late.', id: 'Jika kita tidak pergi sekarang, kita akan terlambat.', note: 'Unless = if not.' },
    ],
    practice: [
      { question: 'If she ___ hard, she will pass.', options: ['studies', 'will study', 'studied'], answer: 'studies', explanation: 'Klausa if First Conditional memakai Present Simple.' },
      { question: 'If you mix red and blue, you ___ purple.', options: ['will got', 'get', 'would get'], answer: 'get', explanation: 'Zero Conditional untuk fakta umum.' },
      { question: 'Unless he apologizes, I ___ him.', options: ['will not forgive', 'do not forgive', 'would not forgive'], answer: 'will not forgive', explanation: 'Unless + present, will + base verb.' },
    ],
  },
  {
    id: 10,
    title: 'Second and Third Conditional',
    summary: 'Membahas situasi tidak nyata sekarang dan penyesalan masa lalu.',
    objective: 'Siswa mampu memakai would dan would have untuk imajinasi serta regret.',
    keyUses: [
      'Second Conditional untuk situasi tidak nyata atau kecil kemungkinan di masa sekarang/masa depan.',
      'Third Conditional untuk situasi lampau yang tidak terjadi.',
      'If I were you dipakai untuk memberi saran.',
    ],
    formulas: [
      { label: 'Second Conditional', pattern: 'If + Past Simple, would + base verb', example: 'If I had more time, I would travel.', note: 'Tidak nyata sekarang.' },
      { label: 'Be verb in Second Conditional', pattern: 'If + subject + were, would + base verb', example: 'If I were you, I would apologize.', note: 'Were umum dipakai untuk semua subjek dalam gaya formal.' },
      { label: 'Third Conditional', pattern: 'If + Past Perfect, would have + V3', example: 'If we had left earlier, we would have arrived on time.', note: 'Penyesalan masa lalu.' },
      { label: 'Negative Third Conditional', pattern: 'If + subject + had not + V3, subject + would not have + V3', example: 'If she had not helped me, I would not have passed.', note: 'Hasil lampau yang berbeda.' },
    ],
    commonMistakes: [
      'Salah: If I will have time, I would travel. Benar: If I had time, I would travel.',
      'Salah: If I had studied, I would pass. Benar: I would have passed.',
      'Jangan campur Second dan Third Conditional kecuali sedang belajar Mixed Conditional.',
    ],
    examples: [
      { en: 'If I lived near the office, I would walk to work.', id: 'Jika saya tinggal dekat kantor, saya akan berjalan kaki.', note: 'Tidak nyata sekarang.' },
      { en: 'If they had booked earlier, they would have paid less.', id: 'Jika mereka memesan lebih awal, mereka akan membayar lebih murah.', note: 'Penyesalan lampau.' },
      { en: 'If I were you, I would tell the truth.', id: 'Jika saya jadi kamu, saya akan berkata jujur.', note: 'Saran.' },
    ],
    practice: [
      { question: 'If I ___ rich, I would buy a house.', options: ['am', 'were', 'will be'], answer: 'were', explanation: 'Second Conditional memakai Past Simple/were.' },
      { question: 'If she had called me, I ___ helped her.', options: ['would have', 'will have', 'would'], answer: 'would have', explanation: 'Third Conditional memakai would have + V3.' },
      { question: 'If they ___ earlier, they would not have missed the train.', options: ['leave', 'had left', 'left'], answer: 'had left', explanation: 'Klausa if Third Conditional memakai Past Perfect.' },
    ],
  },
  {
    id: 11,
    title: 'Mixed Conditionals',
    summary: 'Menghubungkan kondisi masa lalu dengan hasil sekarang, atau kondisi sekarang dengan hasil masa lalu.',
    objective: 'Siswa mampu membuat kalimat conditional yang waktunya berbeda.',
    keyUses: [
      'Past condition -> present result: sesuatu di masa lalu memengaruhi keadaan sekarang.',
      'Present condition -> past result: sifat/kondisi sekarang menjelaskan kejadian lampau.',
      'Cocok untuk menjelaskan regret yang dampaknya masih ada.',
    ],
    formulas: [
      { label: 'Past condition, present result', pattern: 'If + Past Perfect, would + base verb', example: 'If I had studied medicine, I would be a doctor now.', note: 'Masa lalu memengaruhi sekarang.' },
      { label: 'Present condition, past result', pattern: 'If + Past Simple, would have + V3', example: 'If she were more careful, she would not have made that mistake.', note: 'Sifat sekarang memengaruhi kejadian lampau.' },
      { label: 'Negative mixed', pattern: 'If + subject + had not + V3, subject + would/would not + base verb now', example: 'If we had not moved, we would still live near the beach.', note: 'Hasil sekarang berbeda.' },
    ],
    commonMistakes: [
      'Past Perfect di klausa if tidak selalu harus diikuti would have; lihat waktunya.',
      'Tambahkan penanda now jika hasilnya sekarang.',
      'Past Simple dalam mixed conditional sering berarti kondisi tidak nyata sekarang.',
    ],
    examples: [
      { en: 'If I had saved more money, I would be less stressed now.', id: 'Jika dulu saya menabung lebih banyak, sekarang saya tidak terlalu stres.', note: 'Past condition -> present result.' },
      { en: 'If he were more organized, he would have finished the task yesterday.', id: 'Jika dia lebih teratur, dia sudah menyelesaikan tugas kemarin.', note: 'Present trait -> past result.' },
      { en: 'If we had taken the job, we would live in Tokyo now.', id: 'Jika kami menerima pekerjaan itu, sekarang kami tinggal di Tokyo.', note: 'Keputusan lampau, hasil sekarang.' },
    ],
    practice: [
      { question: 'If I had learned to drive, I ___ more independent now.', options: ['would be', 'would have been', 'will be'], answer: 'would be', explanation: 'Kondisi lampau berdampak sekarang.' },
      { question: 'If she were more patient, she ___ angry yesterday.', options: ['would not get', 'would not have got', 'will not get'], answer: 'would not have got', explanation: 'Kondisi sekarang menjelaskan kejadian lampau.' },
      { question: 'If we had not missed the flight, we ___ in Paris now.', options: ['would be', 'would have been', 'are'], answer: 'would be', explanation: 'Hasilnya sekarang.' },
    ],
  },
  {
    id: 12,
    title: 'Passive Voice Across Tenses',
    summary: 'Mengubah fokus dari pelaku ke tindakan, proses, atau objek.',
    objective: 'Siswa mampu membentuk passive voice dalam present, past, perfect, modal, dan future.',
    keyUses: [
      'Passive dipakai saat pelaku tidak diketahui, tidak penting, atau ingin disembunyikan.',
      'Objek kalimat aktif menjadi subjek kalimat pasif.',
      'By + agent dipakai jika pelaku penting disebutkan.',
    ],
    formulas: [
      { label: 'Present Simple Passive', pattern: 'Subject + am/is/are + V3', example: 'The room is cleaned every day.', note: 'Rutinitas/proses umum.' },
      { label: 'Past Simple Passive', pattern: 'Subject + was/were + V3', example: 'The bridge was built in 1998.', note: 'Kejadian lampau.' },
      { label: 'Present Perfect Passive', pattern: 'Subject + have/has + been + V3', example: 'The report has been sent.', note: 'Hasil masih relevan.' },
      { label: 'Modal Passive', pattern: 'Subject + modal + be + V3', example: 'The form must be completed.', note: 'Aturan/saran dalam bentuk pasif.' },
      { label: 'Future Passive', pattern: 'Subject + will + be + V3', example: 'The winners will be announced tomorrow.', note: 'Aksi masa depan.' },
    ],
    commonMistakes: [
      'Salah: The room cleans every day. Benar: The room is cleaned every day.',
      'Salah: The email has sent. Benar: The email has been sent.',
      'Past participle wajib dipakai dalam passive.',
    ],
    examples: [
      { en: 'Coffee is grown in many tropical countries.', id: 'Kopi ditanam di banyak negara tropis.', note: 'Fokus pada kopi.' },
      { en: 'My bike was stolen last night.', id: 'Sepeda saya dicuri tadi malam.', note: 'Pelaku tidak diketahui.' },
      { en: 'The application must be submitted online.', id: 'Aplikasi harus dikirim secara online.', note: 'Aturan formal.' },
    ],
    practice: [
      { question: 'This cheese ___ in France.', options: ['makes', 'is made', 'made'], answer: 'is made', explanation: 'Present Simple Passive: is/am/are + V3.' },
      { question: 'The window ___ yesterday.', options: ['was broken', 'has broken', 'breaks'], answer: 'was broken', explanation: 'Past Simple Passive.' },
      { question: 'The documents must ___ before Friday.', options: ['submit', 'be submitted', 'submitted'], answer: 'be submitted', explanation: 'Modal Passive: modal + be + V3.' },
    ],
  },
  {
    id: 13,
    title: 'Reported Speech',
    summary: 'Melaporkan perkataan orang lain dengan perubahan tense, pronoun, dan time expression.',
    objective: 'Siswa mampu mengubah direct speech menjadi reported speech.',
    keyUses: [
      'Backshift tense umum terjadi jika reporting verb berbentuk past.',
      'Pronoun berubah sesuai pembicara dan konteks.',
      'Time expression juga berubah: today -> that day, tomorrow -> the next day.',
    ],
    formulas: [
      { label: 'Statement', pattern: 'Subject + said/told + (that) + clause', example: 'He said that he was tired.', note: 'Said tidak perlu object; told perlu object.' },
      { label: 'Backshift', pattern: 'Present Simple -> Past Simple; Present Perfect -> Past Perfect', example: '"I have finished" -> She said she had finished.', note: 'Tense mundur satu tahap.' },
      { label: 'Reported yes/no question', pattern: 'Subject + asked + if/whether + subject + verb', example: 'She asked if I liked coffee.', note: 'Urutan kata menjadi statement.' },
      { label: 'Reported command', pattern: 'Subject + told/asked + object + to + base verb', example: 'He told me to wait.', note: 'Perintah memakai to-infinitive.' },
    ],
    commonMistakes: [
      'Salah: He told that he was busy. Benar: He said that... atau He told me that...',
      'Salah: She asked where did I live. Benar: She asked where I lived.',
      'Jangan lupa ubah pronoun sesuai konteks.',
    ],
    examples: [
      { en: 'Direct: "I am busy." Reported: She said that she was busy.', id: 'Dia berkata bahwa dia sibuk.', note: 'Am berubah menjadi was.' },
      { en: 'Direct: "Do you need help?" Reported: He asked if I needed help.', id: 'Dia bertanya apakah saya butuh bantuan.', note: 'Question berubah menjadi statement order.' },
      { en: 'Direct: "Please close the door." Reported: She asked me to close the door.', id: 'Dia meminta saya menutup pintu.', note: 'Request memakai asked + object + to.' },
    ],
    practice: [
      { question: '"I live here." -> He said he ___ there.', options: ['lives', 'lived', 'has lived'], answer: 'lived', explanation: 'Present Simple mundur menjadi Past Simple.' },
      { question: 'She asked ___ I was ready.', options: ['that', 'if', 'to'], answer: 'if', explanation: 'Yes/no question memakai if atau whether.' },
      { question: 'He told me ___ quiet.', options: ['be', 'to be', 'being'], answer: 'to be', explanation: 'Reported command: told + object + to + verb.' },
    ],
  },
  {
    id: 14,
    title: 'Relative Clauses',
    summary: 'Menggabungkan informasi tentang orang, benda, tempat, waktu, dan kepemilikan.',
    objective: 'Siswa mampu memakai who, which, that, where, when, dan whose.',
    keyUses: [
      'Defining relative clause memberi informasi penting tanpa koma.',
      'Non-defining relative clause memberi informasi tambahan dan memakai koma.',
      'Who untuk orang, which untuk benda/ide, where untuk tempat, whose untuk kepemilikan.',
    ],
    formulas: [
      { label: 'Defining clause', pattern: 'Noun + who/which/that + verb', example: 'The woman who lives next door is a doctor.', note: 'Informasi penting untuk mengenali orangnya.' },
      { label: 'Object relative clause', pattern: 'Noun + who/which/that + subject + verb', example: 'The book that I bought is excellent.', note: 'Relative pronoun bisa dihilangkan dalam object clause informal.' },
      { label: 'Non-defining clause', pattern: 'Noun, who/which + clause, main clause', example: 'My brother, who lives in Seoul, is visiting us.', note: 'Pakai koma; that tidak dipakai.' },
      { label: 'Whose', pattern: 'Noun + whose + noun + verb', example: 'I met a student whose parents are teachers.', note: 'Menunjukkan kepemilikan.' },
    ],
    commonMistakes: [
      'Jangan pakai that dalam non-defining relative clause.',
      'Salah: The man which called you. Benar: The man who called you.',
      'Non-defining clause harus memakai koma.',
    ],
    examples: [
      { en: 'This is the restaurant where we had dinner.', id: 'Ini restoran tempat kami makan malam.', note: 'Where untuk tempat.' },
      { en: 'The laptop that I use for work is very light.', id: 'Laptop yang saya pakai untuk kerja sangat ringan.', note: 'That sebagai object.' },
      { en: 'Anna, who speaks Arabic, helped us translate the menu.', id: 'Anna, yang bisa bahasa Arab, membantu menerjemahkan menu.', note: 'Info tambahan.' },
    ],
    practice: [
      { question: 'The person ___ called you is my manager.', options: ['which', 'who', 'where'], answer: 'who', explanation: 'Who untuk orang.' },
      { question: 'This is the city ___ I was born.', options: ['where', 'which', 'whose'], answer: 'where', explanation: 'Where untuk tempat.' },
      { question: 'My sister, ___ lives abroad, is coming home.', options: ['that', 'who', 'where'], answer: 'who', explanation: 'Non-defining clause memakai who, bukan that.' },
    ],
  },
  {
    id: 15,
    title: 'Gerunds and Infinitives',
    summary: 'Memilih verb-ing atau to + verb setelah kata kerja tertentu.',
    objective: 'Siswa mampu memakai gerund dan infinitive dengan makna yang tepat.',
    keyUses: [
      'Gerund sering dipakai setelah enjoy, avoid, finish, mind, dan preposition.',
      'Infinitive sering dipakai setelah want, decide, hope, plan, dan need.',
      'Beberapa verb berubah makna: stop, remember, forget, try.',
    ],
    formulas: [
      { label: 'Gerund after verb', pattern: 'Subject + verb + verb-ing', example: 'I enjoy cooking.', note: 'Enjoy selalu diikuti gerund.' },
      { label: 'Infinitive after verb', pattern: 'Subject + verb + to + base verb', example: 'They decided to leave.', note: 'Decide diikuti infinitive.' },
      { label: 'After preposition', pattern: 'Preposition + verb-ing', example: 'She is interested in learning Spanish.', note: 'Preposition diikuti gerund.' },
      { label: 'Meaning change', pattern: 'stop + verb-ing / stop + to + verb', example: 'He stopped smoking. / He stopped to smoke.', note: 'Berhenti merokok vs berhenti untuk merokok.' },
    ],
    commonMistakes: [
      'Salah: I enjoy to swim. Benar: I enjoy swimming.',
      'Salah: She decided leaving. Benar: She decided to leave.',
      'Setelah preposition gunakan verb-ing.',
    ],
    examples: [
      { en: 'We are thinking about moving to a bigger apartment.', id: 'Kami sedang mempertimbangkan pindah ke apartemen lebih besar.', note: 'About + verb-ing.' },
      { en: 'He promised to call me after work.', id: 'Dia berjanji menelepon saya setelah kerja.', note: 'Promise + to verb.' },
      { en: 'I forgot to lock the door.', id: 'Saya lupa mengunci pintu.', note: 'Tidak melakukan aksinya.' },
    ],
    practice: [
      { question: 'She avoids ___ at night.', options: ['drive', 'to drive', 'driving'], answer: 'driving', explanation: 'Avoid diikuti gerund.' },
      { question: 'They hope ___ abroad next year.', options: ['study', 'to study', 'studying'], answer: 'to study', explanation: 'Hope diikuti infinitive.' },
      { question: 'I am good at ___.', options: ['cook', 'to cook', 'cooking'], answer: 'cooking', explanation: 'At adalah preposition, diikuti gerund.' },
    ],
  },
  {
    id: 16,
    title: 'Articles: A, An, The, and Zero Article',
    summary: 'Menggunakan article untuk benda umum, spesifik, unik, dan generalisasi.',
    objective: 'Siswa mampu memilih a/an, the, atau tanpa article dalam konteks B1.',
    keyUses: [
      'A/an untuk singular countable noun yang belum spesifik.',
      'The untuk noun yang spesifik, sudah disebut, atau unik.',
      'Zero article untuk plural/uncountable secara umum, bahasa, olahraga, dan banyak nama tempat.',
    ],
    formulas: [
      { label: 'A/An', pattern: 'a/an + singular countable noun', example: 'I saw a cat in the garden.', note: 'Pertama kali disebut dan belum spesifik.' },
      { label: 'The', pattern: 'the + specific noun', example: 'The cat was sleeping under the tree.', note: 'Sudah diketahui cat yang mana.' },
      { label: 'Zero article general', pattern: 'Plural noun / uncountable noun without article', example: 'Children need attention. / Water is important.', note: 'Generalisasi.' },
      { label: 'Unique things', pattern: 'the + unique noun', example: 'the sun, the internet, the government', note: 'Hal yang dianggap unik dalam konteks.' },
    ],
    commonMistakes: [
      'Salah: I need advice from a teacher? Benar jika satu guru: a teacher; umum: teachers.',
      'Salah: The life is hard. Benar: Life is hard.',
      'Gunakan an berdasarkan bunyi vokal, bukan huruf: an hour, a university.',
    ],
    examples: [
      { en: 'I bought a book. The book is about psychology.', id: 'Saya membeli sebuah buku. Buku itu tentang psikologi.', note: 'A pertama kali, the setelah spesifik.' },
      { en: 'She goes to school by bus.', id: 'Dia pergi ke sekolah dengan bus.', note: 'Zero article untuk institusi sebagai fungsi.' },
      { en: 'The information you sent was useful.', id: 'Informasi yang kamu kirim berguna.', note: 'The karena spesifik.' },
    ],
    practice: [
      { question: 'I watched ___ interesting documentary last night.', options: ['a', 'an', 'the'], answer: 'an', explanation: 'Interesting berbunyi vokal.' },
      { question: '___ water is essential for life.', options: ['A', 'The', 'Zero article'], answer: 'Zero article', explanation: 'Water secara umum tidak memakai article.' },
      { question: 'Can you close ___ door?', options: ['a', 'the', 'zero article'], answer: 'the', explanation: 'Door spesifik dalam konteks.' },
    ],
  },
  {
    id: 17,
    title: 'Quantifiers and Noun Agreement',
    summary: 'Memilih much, many, a few, a little, several, plenty of, dan enough.',
    objective: 'Siswa mampu memakai quantifier sesuai countable dan uncountable nouns.',
    keyUses: [
      'Many dan a few untuk countable plural nouns.',
      'Much dan a little untuk uncountable nouns.',
      'Some, any, a lot of, plenty of, dan enough bisa dipakai lebih fleksibel.',
    ],
    formulas: [
      { label: 'Countable plural', pattern: 'many/a few/several + plural noun', example: 'There are several options.', note: 'Option bisa dihitung.' },
      { label: 'Uncountable', pattern: 'much/a little + uncountable noun', example: 'We have a little time.', note: 'Time dalam konteks ini tidak dihitung.' },
      { label: 'Questions and negatives', pattern: 'much/many often in questions and negatives', example: 'Do you have much experience?', note: 'Much lebih umum di question/negative.' },
      { label: 'Enough', pattern: 'enough + noun / adjective + enough', example: 'We have enough chairs. / It is big enough.', note: 'Posisi enough berubah.' },
    ],
    commonMistakes: [
      'Salah: many information. Benar: much information atau a lot of information.',
      'Salah: a few money. Benar: a little money.',
      'Enough setelah adjective: good enough, bukan enough good.',
    ],
    examples: [
      { en: 'There are a few problems we need to solve.', id: 'Ada beberapa masalah yang perlu kita selesaikan.', note: 'Problems bisa dihitung.' },
      { en: 'We do not have much luggage.', id: 'Kami tidak punya banyak bagasi.', note: 'Luggage uncountable.' },
      { en: 'The room is not large enough for 50 people.', id: 'Ruangan ini tidak cukup besar untuk 50 orang.', note: 'Adjective + enough.' },
    ],
    practice: [
      { question: 'There is not ___ information on the website.', options: ['many', 'much', 'few'], answer: 'much', explanation: 'Information adalah uncountable noun.' },
      { question: 'I have ___ close friends in this city.', options: ['a little', 'a few', 'much'], answer: 'a few', explanation: 'Friends adalah countable plural.' },
      { question: 'This coffee is not sweet ___.', options: ['enough', 'too', 'many'], answer: 'enough', explanation: 'Adjective + enough.' },
    ],
  },
  {
    id: 18,
    title: 'Comparatives, Superlatives, and Degree Modifiers',
    summary: 'Membandingkan benda, orang, situasi, dan perubahan dengan lebih akurat.',
    objective: 'Siswa mampu memakai comparative, superlative, as...as, dan modifiers.',
    keyUses: [
      'Comparative membandingkan dua hal.',
      'Superlative menunjukkan yang paling dalam satu kelompok.',
      'Modifiers seperti much, far, a bit, slightly membuat perbandingan lebih spesifik.',
    ],
    formulas: [
      { label: 'Short adjective comparative', pattern: 'adjective-er + than', example: 'This route is faster than the old one.', note: 'Untuk adjective pendek.' },
      { label: 'Long adjective comparative', pattern: 'more + adjective + than', example: 'This method is more effective than that one.', note: 'Untuk adjective panjang.' },
      { label: 'Superlative', pattern: 'the + adjective-est / the most + adjective', example: 'It is the most reliable option.', note: 'Pakai the.' },
      { label: 'Equality', pattern: 'as + adjective/adverb + as', example: 'This laptop is as light as mine.', note: 'Setara.' },
      { label: 'Modifier', pattern: 'much/far/a bit/slightly + comparative', example: 'The new app is much easier to use.', note: 'Menunjukkan tingkat perbedaan.' },
    ],
    commonMistakes: [
      'Salah: more faster. Benar: faster atau much faster.',
      'Salah: the most easiest. Benar: the easiest.',
      'Good -> better -> the best; bad -> worse -> the worst.',
    ],
    examples: [
      { en: 'The second interview was much more difficult than the first.', id: 'Wawancara kedua jauh lebih sulit daripada yang pertama.', note: 'Much memperkuat comparative.' },
      { en: 'This is the least expensive plan available.', id: 'Ini paket paling murah yang tersedia.', note: 'Least untuk kebalikan most.' },
      { en: 'Her presentation was as clear as yours.', id: 'Presentasinya sejelas presentasimu.', note: 'As...as menunjukkan kesetaraan.' },
    ],
    practice: [
      { question: 'This problem is ___ than I expected.', options: ['more hard', 'harder', 'the hardest'], answer: 'harder', explanation: 'Hard adalah adjective pendek, gunakan -er.' },
      { question: 'It is ___ restaurant in town.', options: ['the best', 'better', 'best'], answer: 'the best', explanation: 'Superlative memakai the.' },
      { question: 'The new phone is ___ more expensive.', options: ['much', 'many', 'most'], answer: 'much', explanation: 'Much bisa memodifikasi comparative.' },
    ],
  },
  {
    id: 19,
    title: 'Indirect Questions and Question Tags',
    summary: 'Membuat pertanyaan lebih sopan dan mengonfirmasi informasi.',
    objective: 'Siswa mampu memakai indirect questions dan tag questions dalam percakapan.',
    keyUses: [
      'Indirect question lebih sopan dalam situasi formal.',
      'Urutan kata dalam indirect question seperti statement.',
      'Question tag biasanya berlawanan: positive sentence + negative tag.',
    ],
    formulas: [
      { label: 'Indirect WH question', pattern: 'Can you tell me + question word + subject + verb?', example: 'Can you tell me where the station is?', note: 'Bukan where is the station.' },
      { label: 'Indirect yes/no question', pattern: 'Do you know + if/whether + subject + verb?', example: 'Do you know if she is available?', note: 'If/whether untuk yes/no.' },
      { label: 'Positive sentence tag', pattern: 'Positive statement, negative auxiliary + subject?', example: 'You are coming, aren\'t you?', note: 'Tag negatif.' },
      { label: 'Negative sentence tag', pattern: 'Negative statement, positive auxiliary + subject?', example: 'He does not drive, does he?', note: 'Tag positif.' },
    ],
    commonMistakes: [
      'Salah: Do you know where is he? Benar: Do you know where he is?',
      'Salah: You like coffee, do you? Benar: You like coffee, don\'t you?',
      'I am memiliki tag khusus: aren\'t I?',
    ],
    examples: [
      { en: 'Could you tell me what time the meeting starts?', id: 'Bisakah Anda memberi tahu jam berapa rapat dimulai?', note: 'Indirect question sopan.' },
      { en: 'Do you know whether the office is open today?', id: 'Apakah Anda tahu apakah kantor buka hari ini?', note: 'Whether untuk yes/no.' },
      { en: 'She has finished the task, hasn\'t she?', id: 'Dia sudah menyelesaikan tugasnya, kan?', note: 'Present Perfect tag.' },
    ],
    practice: [
      { question: 'Can you tell me where ___?', options: ['is the bank', 'the bank is', 'does the bank'], answer: 'the bank is', explanation: 'Indirect question memakai statement order.' },
      { question: 'You have met him before, ___?', options: ['have you', 'haven\'t you', 'did you'], answer: 'haven\'t you', explanation: 'Positive statement + negative tag.' },
      { question: 'She does not work here, ___?', options: ['does she', 'doesn\'t she', 'is she'], answer: 'does she', explanation: 'Negative statement + positive tag.' },
    ],
  },
  {
    id: 20,
    title: 'Intermediate Grammar Review',
    summary: 'Menggabungkan tenses, modals, conditionals, passive, reported speech, clauses, dan question forms.',
    objective: 'Siswa mampu memilih struktur grammar B1 sesuai konteks komunikasi.',
    keyUses: [
      'Identifikasi waktu: present, past, future, atau mixed time.',
      'Tentukan fokus kalimat: pelaku, aksi, hasil, durasi, kemungkinan, atau kondisi.',
      'Pilih struktur berdasarkan fungsi komunikasi, bukan terjemahan kata per kata.',
    ],
    formulas: [
      { label: 'Tense decision', pattern: 'Time marker + meaning -> tense choice', example: 'since 2020 -> Present Perfect; yesterday -> Past Simple', note: 'Penanda waktu membantu memilih tense.' },
      { label: 'Conditional decision', pattern: 'Real future -> First; unreal present -> Second; unreal past -> Third', example: 'If I had known, I would have helped.', note: 'Perhatikan real atau unreal.' },
      { label: 'Passive decision', pattern: 'Object focus + be + V3', example: 'The problem has been solved.', note: 'Fokus pada masalah, bukan pelaku.' },
      { label: 'Reported speech decision', pattern: 'Past reporting verb -> backshift tense', example: 'She said she was ready.', note: 'Tense biasanya mundur.' },
    ],
    commonMistakes: [
      'Menerjemahkan langsung dari bahasa Indonesia tanpa melihat fungsi grammar.',
      'Lupa auxiliary dalam pertanyaan, passive, dan perfect tense.',
      'Mencampur formula conditional tanpa memperhatikan waktu.',
    ],
    examples: [
      { en: 'If we had prepared better, we would feel more confident now.', id: 'Jika dulu kami lebih siap, sekarang kami akan lebih percaya diri.', note: 'Mixed Conditional.' },
      { en: 'The schedule has been changed because the speaker is still travelling.', id: 'Jadwal sudah diubah karena pembicara masih dalam perjalanan.', note: 'Passive + Present Continuous.' },
      { en: 'Could you tell me whether the documents have been approved?', id: 'Bisakah Anda memberi tahu apakah dokumennya sudah disetujui?', note: 'Indirect question + Present Perfect Passive.' },
    ],
    practice: [
      { question: 'By next month, I ___ here for five years.', options: ['will work', 'will have worked', 'have worked'], answer: 'will have worked', explanation: 'By next month menunjukkan selesai/tercapai sebelum waktu masa depan.' },
      { question: 'The report ___ by the manager yesterday.', options: ['approved', 'was approved', 'has approved'], answer: 'was approved', explanation: 'Past Passive: was/were + V3.' },
      { question: 'She asked me where I ___.', options: ['live', 'lived', 'do live'], answer: 'lived', explanation: 'Reported question dengan backshift dan statement order.' },
      { question: 'If he had listened, he ___ the mistake now.', options: ['would avoid', 'would have avoided', 'will avoid'], answer: 'would avoid', explanation: 'Past condition dengan present result: mixed conditional.' },
    ],
  },
];

export const getIntermediateGrammarLesson = (id: number) => intermediateGrammarLessons.find((lesson) => lesson.id === id);
