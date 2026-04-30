const fs = require('fs');
const path = require('path');

const MATERI_BANK = {
  11: {
    summary: "Relative Clauses digunakan untuk memberikan informasi tambahan tentang orang (who), benda (which/that), atau tempat (where) tanpa harus membuat dua kalimat terpisah.",
    rules: [
      { title: "Who & Whom (Untuk Orang)", desc: "Gunakan 'who' sebagai subjek, dan 'whom' sebagai objek (formal).", example: "The doctor who treated me is very friendly." },
      { title: "Which & That (Untuk Benda)", desc: "Gunakan 'which' atau 'that' untuk merujuk pada benda atau hewan.", example: "This is the car that I bought yesterday." },
      { title: "Where & Whose (Tempat & Kepemilikan)", desc: "Gunakan 'where' untuk tempat, dan 'whose' untuk menunjukkan kepemilikan (siapa yang punya).", example: "The man whose wallet I found gave me a reward." },
      { title: "Defining Clauses (Penting)", desc: "Klausa ini tidak menggunakan koma karena informasinya wajib ada agar kalimat masuk akal.", example: "The book that you gave me is fantastic." },
      { title: "Non-Defining Clauses (Tambahan Info)", desc: "Gunakan koma. Info ini hanya ekstra, jika dihapus pun inti kalimat tetap utuh.", example: "My brother, who lives in Paris, is an architect." }
    ]
  },
  12: {
    summary: "Aturan kapan harus menggunakan Gerund (Verb+ing) dan kapan harus menggunakan Infinitive (To+Verb) merupakan salah satu konsep tersulit dalam grammar karena setiap kata kerja punya pasangannya sendiri.",
    rules: [
      { title: "Gerund sebagai Subjek", desc: "Jika kata kerja diletakkan di awal kalimat sebagai subjek, tambahkan -ing.", example: "Smoking is bad for your health." },
      { title: "Verbs + Gerund", desc: "Kata kerja yang harus diikuti gerund (Verb+ing) antara lain: enjoy, mind, suggest, avoid, finish.", example: "I enjoy reading books in the park." },
      { title: "Verbs + Infinitive", desc: "Kata kerja yang harus diikuti infinitive (To+Verb) antara lain: want, decide, hope, promise, plan.", example: "He promised to help me with the homework." },
      { title: "Stop + Gerund vs Infinitive", desc: "Maknanya berubah total! Stop + Gerund = berhenti melakukan sesuatu. Stop + Infinitive = berhenti (sejenak) untuk melakukan sesuatu.", example: "He stopped smoking (berhenti total). He stopped to smoke (berhenti jalan untuk merokok)." },
      { title: "Prepositions + Gerund", desc: "Setelah kata depan seperti in, on, at, for, about, always gunakan Gerund.", example: "She is interested in learning French." }
    ]
  },
  13: {
    summary: "Kita sudah memahami basic 'a, an, the'. Di level ini, kita akan mempelajari Zero Article (kapan kita JANGAN menggunakan article) dan pengecualian khusus lainnya.",
    rules: [
      { title: "Zero Article (Fakta & Jid)", desc: "Jangan gunakan 'A' atau 'The' untuk menyatakan fakta umum (plural/uncountable).", example: "Apples are good for you. (Bukan: The apples are good for you)" },
      { title: "The (Hal Spesifik)", desc: "Gunakan 'The' hanya jika pembicara dan pendengar tahu secara spesifik benda mana yang dimaksud.", example: "The apples on the table are rotten." },
      { title: "Institusi vs Bangunan Fisik", desc: "Jangan pakai 'The' untuk tujuan asli institusi (go to hospital = untuk dirawat). Gunakan 'The' merujuk ke bangunan (go to the hospital = mengunjungi orang sakit/pekerja bangunan).", example: "Go to bed (tidur). Jump on the bed (melompat di kasur)." },
      { title: "Geographical Names", desc: "Gunakan 'The' untuk lautan, sungai, dan negara jamak (The USA). JANGAN gunakan untuk danau tunggal, negara tunggal, atau benua.", example: "The Amazon River, tapi Lake Victoria." },
      { title: "Penyakit & Olahraga", desc: "Zero Article untuk penyakit dan olahraga.", example: "I have cancer. He plays tennis." }
    ]
  },
  14: {
    summary: "Linking Words (Kata Hubung) digunakan untuk menghubungkan dua ide sehingga tulisan/ucapanmu lebih mengalir dan terstruktur.",
    rules: [
      { title: "Contras (Meskipun/Tapi)", desc: "Although, even though, despite, in spite of. (Ingat: despite diikuti kata benda/Noun Phrase, bukan kalimat).", example: "Despite the rain, we went out." },
      { title: "Reason (Karena)", desc: "Because of, due to, since, as. ('Because of/Due to' wajib diikuti Noun).", example: "The match was cancelled due to bad weather." },
      { title: "Result (Oleh karena itu)", desc: "Therefore, consequently, as a result, so.", example: "He didn't study hard; therefore, he failed." },
      { title: "Addition (Selain itu)", desc: "Moreover, furthermore, additionally, besides.", example: "It is safe. Furthermore, it is cheap." },
      { title: "Time (Waktu)", desc: "As soon as, meanwhile, whenever.", example: "As soon as he arrives, we will start." }
    ]
  },
  15: {
    summary: "Indirect Questions adalah cara sopan untuk bertanya. Tag Questions digunakan di akhir kalimat untuk mencari persetujuan. Mari kita pelajari strukturnya.",
    rules: [
      { title: "Indirect Questions: Tidak dibalik!", desc: "Dalam kalimat tanya langsung, kita membalik kata kerja (Where is the bank?). Di kalimat tidak langsung, urutannya kembali normal (S + V).", example: "Do you know where the bank is?" },
      { title: "Indirect Yes/No Questions", desc: "Gunakan 'if' atau 'whether'.", example: "Could you tell me if he is coming?" },
      { title: "Tag Questions: Positive - Negative", desc: "Jika kalimat utamanya positif, tag-nya negatif.", example: "You are happy, aren't you?" },
      { title: "Tag Questions: Negative - Positive", desc: "Jika kalimat utamanya negatif, tag-nya positif.", example: "He doesn't like pizza, does he?" },
      { title: "Pengecualian Kritis", desc: "Tag untuk 'I am' adalah 'aren't I?'. Tag untuk 'Let's' adalah 'shall we?'.", example: "I am late, aren't I?" }
    ]
  },
  16: {
    summary: "Berbagai cara tingkat lanjut dalam bahasa Inggris untuk membandingkan satu benda dengan benda lain tanpa hanya mengandalkan kata sifat aslinya.",
    rules: [
      { title: "As... As (Setara/Tidak Setara)", desc: "Untuk menunjukkan dua subjek setara (Atau tidak setara jika memakai Not).", example: "This car is not as fast as that one." },
      { title: "Double Comparatives", desc: "Struktur 'The + More/er... The + More/er' digunakan untuk hubungan sebab akibat.", example: "The more you study, the smarter you get." },
      { title: "Progressive Change", desc: "Adjective-er and Adjective-er (semakin lama semakin).", example: "The weather is getting hotter and hotter." },
      { title: "Modifiers (Membesar-besarkan)", desc: "Gunakan 'much', 'a lot', 'far', 'slightly' sebelum kata sifat perbandingan.", example: "She is much taller than her sister." },
      { title: "Superlative Pengecualian", desc: "Gunakan 'The + Adjective-est + I have ever...'.", example: "It is the best movie I have ever seen." }
    ]
  },
  17: {
    summary: "Adjective Advanced Quantifiers adalah kata ukur (seperti some, many, much, few, little) yang sering menjebak antara hal yang bisa dihitung dan tidak bisa dihitung.",
    rules: [
      { title: "Few vs A few (Countable)", desc: "A few = beberapa (cukup, positif). Few = sangat sedikit (tidak cukup, negatif).", example: "I have a few friends (positif, cukup)." },
      { title: "Little vs A little (Uncountable)", desc: "A little = sedikit (cukup). Little = sangat sedikit (tidak cukup).", example: "There is little water left (hampir habis, kita mungkin mati)." },
      { title: "Both vs Neither", desc: "Both = keduanya. Neither = tidak ada satu pun dari keduanya.", example: "Neither of them knows the answer." },
      { title: "All vs None", desc: "All = semua (lebih dari dua). None = tidak ada satu pun (lebih dari dua) yang bisa/ada.", example: "None of the students passed." },
      { title: "Each vs Every", desc: "Setiap. Keduanya diikuti oleh Noun tunggal (Singular noun).", example: "Every student has a book." }
    ]
  },
  18: {
    summary: "Dalam grammar Inggris, Adjective (-ed dan -ing) sering disalahpahami, dan posisi beberapa kata sifat (Adjective Order) dalam satu kalimat memiliki rumus paten.",
    rules: [
      { title: "-ED Adjectives (Perasaan)", desc: "Hanya untuk subjek yang bisa 'merasakan' (biasanya manusia/hewan).", example: "I am completely bored." },
      { title: "-ING Adjectives (Penyebab Perasaan)", desc: "Berlaku untuk hal/orang yang memberikan karakteristik/rasa kepada orang lain.", example: "The movie was so boring." },
      { title: "Osascomp (Adjective Order)", desc: "Opinion, Size, Age, Shape, Color, Origin, Material, Purpose. Urutan jika ada lebih dari 1 kata sifat.", example: "A beautiful (Op) big (Si) red (Co) car." },
      { title: "The + Adjective = Kelompok", desc: "Menjadikan kata sifat sebagai jamak utuh (The rich = Orang-orang kaya).", example: "The poor need our help." },
      { title: "Adjective vs Adverb", desc: "Adjective menjelaskan Noun (Good). Adverb menjelaskan Verba (Well). (He is good vs He plays well).", example: "He cooks really well." }
    ]
  },
  19: {
    summary: "Banyak native speaker sekalipun sering terjebak dalam kesalahan grammar level Intermediate ini. Mari kita pelajari the 'Common Mistakes' agar tidak salah tempat.",
    rules: [
      { title: "Its vs It's", desc: "Its = Kepemilikan. It's = It is / It has.", example: "The dog wagged its tail. It's very hot today." },
      { title: "Your vs You're", desc: "Your = Milikmu. You're = You are.", example: "You're responsible for your own actions." },
      { title: "Advise vs Advice", desc: "Advice (C) = Noun. Advise (Z) = Verb.", example: "I advise you to listen to my advice." },
      { title: "Lose vs Loose", desc: "Lose (Z) = Kalah/Hilang. Loose (S) = Longgar.", example: "Don't lose those loose pants." },
      { title: "Affect vs Effect", desc: "Affect = Verb (Mempengaruhi). Effect = Noun (Hasil/Dampak).", example: "The medicine didn't affect me. It had no effect." }
    ]
  },
  20: {
    summary: "Ini adalah tes campuran dari silabus Intermediate A2/B1. Pahami struktur tenses kompleks, conditionals, dan pengunaan klausa pasif secara integratif.",
    rules: [
      { title: "Pemetaan Tenses Campuran", desc: "Past Continuous (interupsi) + Simple Past. Present Perfect + Present. Pemahaman timeline waktu penting saat mendeskripsikan rentetan waktu.", example: "She had been waiting for an hour when the bus finally arrived." },
      { title: "Reported vs Direct Speech", desc: "Ubah Tenses mundur satu langkah ke belakang jika menggunakan klausa lampau (He said that...).", example: "'I am tired' -> He said that he was tired." },
      { title: "Klausa Relatif Penanda Formal", desc: "Gunakan koma di non-defining. Hati-hati jangan tambahkan preposisi ganda di ujung kalimat khusus jika sudah ada 'where/in which'.", example: "The house where I lived (Bukan: The house where I lived in)." },
      { title: "Modal Verbs of Deduction", desc: "Must = 90% Yakin Benar. Can't = 90% Yakin Tidak. Might = 50% Ragu.", example: "He has a Ferrari; he must be rich." },
      { title: "Uji Latihan Akhir", desc: "Buka Tab 'Latihan' di sebelah. Pertanyaan kuis Final Assessment ini mencakup ringkasan dari semua bab 1 hingga 19.", example: "Semoga berhasil!" }
    ]
  }
};

const UI_TEMPLATE = (summary) => `
            <div className="grid gap-4 mb-6">
              {GRAMMAR_RULES.map((item: any, idx: number) => (
                <div key={idx} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-[16px] font-bold text-slate-800 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs shrink-0">{idx + 1}</span>
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-600 mb-3 leading-relaxed">{item.desc}</p>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <p className="text-sm font-medium text-slate-700 flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" />
                      {item.example}
                    </p>
                  </div>
                </div>
              ))}
            </div>`;

for (let i = 11; i <= 20; i++) {
  const file = path.join(__dirname, '../src/pages/module/english/intermediate/grammar/Lesson' + i + '.tsx');
  if (!fs.existsSync(file)) continue;

  let content = fs.readFileSync(file, 'utf8');
  
  if (!content.includes('const GRAMMAR_RULES =')) {
    // Insert array just before GRAMMAR_EXAMPLES
    let str = `const GRAMMAR_RULES = ${JSON.stringify(MATERI_BANK[i].rules, null, 2)};\n\n`;
    content = content.replace('const GRAMMAR_EXAMPLES =', str + 'const GRAMMAR_EXAMPLES =');
  }

  // Replace undefined placeholder with summary
  content = content.replace(
      '<p className="text-sm opacity-90 leading-relaxed">undefined...</p>',
      `<p className="text-sm opacity-90 leading-relaxed">${MATERI_BANK[i].summary}</p>`
  );

  // Insert Map Logic under </section> if it hasn't been inserted
  if (!content.includes('{GRAMMAR_RULES.map')) {
      content = content.replace(
          /(<\/section>)\s*(<\/div>)/,
          `$1\n${UI_TEMPLATE(MATERI_BANK[i].summary)}\n$2`
      );
  }

  fs.writeFileSync(file, content, 'utf8');
  console.log('Processed Materi Lesson ' + i);
}
console.log('Done.');
