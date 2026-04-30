const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '../src/pages/module/english/upper-intermediate/speaking');

// Enhanced SECTIONS data for each lesson
// Each lesson: { sections: string (replacement for const SECTIONS array) }
const ENHANCEMENTS = {
  // L1: Expressing Complex Opinions - already good, add more items
  1: {
    sections: `const SECTIONS: SpeakingSection[] = [
  {
    name: "Frasa Opini Formal",
    icon: "💬",
    items: [
      { phrase: "From my perspective,", usage: "Dari sudut pandang saya, ..." },
      { phrase: "As far as I'm aware,", usage: "Sejauh yang saya ketahui, ..." },
      { phrase: "It seems to me that...", usage: "Tampaknya bagi saya bahwa ..." },
      { phrase: "I would argue that...", usage: "Saya akan berargumen bahwa ..." },
      { phrase: "It is my contention that...", usage: "Saya berpendapat bahwa ... (sangat formal)" },
      { phrase: "There is a strong case for...", usage: "Ada argumen kuat untuk ..." },
      { phrase: "One cannot deny that...", usage: "Seseorang tidak dapat menyangkal bahwa ..." },
      { phrase: "The evidence clearly suggests...", usage: "Bukti dengan jelas menunjukkan ..." },
      { phrase: "I am strongly of the view that...", usage: "Saya sangat berpandangan bahwa ..." },
      { phrase: "It would be difficult to dispute the fact that...", usage: "Akan sulit untuk menyangkal fakta bahwa ..." }
    ]
  },
  {
    name: "Hedging & Qualification",
    icon: "⚖️",
    items: [
      { phrase: "To some extent,", usage: "Sampai taraf tertentu, ..." },
      { phrase: "This may not always be the case,", usage: "Ini mungkin tidak selalu berlaku demikian, ..." },
      { phrase: "While X is generally true, ...", usage: "Meskipun X umumnya benar, ..." },
      { phrase: "In most, though not all, cases,", usage: "Dalam sebagian besar, meski tidak semua, kasus, ..." },
      { phrase: "Broadly speaking, although...", usage: "Secara umum, meskipun ..." },
      { phrase: "That said, it is worth noting...", usage: "Dengan demikian, perlu dicatat ..." },
      { phrase: "This is a contentious issue, however...", usage: "Ini adalah isu yang kontroversial, namun ..." },
      { phrase: "Exceptions aside,", usage: "Mengecualikan pengecualian, ..." },
      { phrase: "Under certain circumstances,", usage: "Dalam kondisi tertentu, ..." },
      { phrase: "It is not entirely clear whether...", usage: "Belum sepenuhnya jelas apakah ..." }
    ]
  },
  {
    name: "Contoh Dialog",
    icon: "🗣️",
    items: [
      { phrase: "A: Do you think social media is harmful?", usage: "Pertanyaan membuka diskusi" },
      { phrase: "B: From my perspective, it's a double-edged sword.", usage: "Opini dengan frasa formal" },
      { phrase: "B: To some extent, it enables connection...", usage: "Hedging untuk keseimbangan argumen" },
      { phrase: "B: However, I would argue that its long-term psychological impact is underestimated.", usage: "Argumen berlawanan dengan konektor formal" },
      { phrase: "A: What evidence would you cite for that position?", usage: "Meminta klarifikasi dengan formal" },
      { phrase: "B: The evidence clearly suggests a correlation between heavy use and anxiety levels.", usage: "Menggunakan bukti dalam argumen" }
    ]
  }
];`
  },
  // L2: Formal Debates & Argumentation
  2: {
    sections: `const SECTIONS: SpeakingSection[] = [
  {
    name: "Pembuka Debat Formal",
    icon: "🎤",
    items: [
      { phrase: "I would like to open by stating that...", usage: "Pembuka pernyataan posisi formal" },
      { phrase: "The motion before us today is...", usage: "Menyatakan topik debat secara formal" },
      { phrase: "I stand firmly in favour of / against the proposition that...", usage: "Menyatakan posisi dengan tegas" },
      { phrase: "Allow me to present three key arguments in support of...", usage: "Mengumumkan struktur argumen" },
      { phrase: "My position rests on the following premise:", usage: "Menyatakan premis dasar argumen" },
      { phrase: "Before I begin, I would like to establish some common ground:", usage: "Membangun common ground" },
      { phrase: "The crux of my argument is that...", usage: "Menyatakan inti argumen" },
      { phrase: "I shall argue that the weight of evidence supports...", usage: "Menyatakan arah argumen dengan formal" }
    ]
  },
  {
    name: "Menanggapi & Mementahkan Argumen",
    icon: "⚔️",
    items: [
      { phrase: "While I acknowledge your point, I would counter that...", usage: "Mengakui lalu mementahkan argumen" },
      { phrase: "With respect, this argument overlooks a crucial factor:", usage: "Menunjukkan kelemahan argumen dengan sopan" },
      { phrase: "The evidence presented does not, in fact, support this claim.", usage: "Melemahkan dasar argumen lawan" },
      { phrase: "I would challenge the assumption that...", usage: "Mempersoalkan asumsi dasar lawan" },
      { phrase: "Your argument would hold if... However, in reality...", usage: "Conditionally conceding then refuting" },
      { phrase: "One must distinguish between X and Y in this context.", usage: "Membuat perbedaan penting dalam debat" },
      { phrase: "I take issue with the framing of this question.", usage: "Mempersoalkan cara pertanyaan dibingkai" },
      { phrase: "The data you cite is inconsistent with more recent findings.", usage: "Melemahkan data yang digunakan lawan" }
    ]
  },
  {
    name: "Penutup & Kesimpulan",
    icon: "🏁",
    items: [
      { phrase: "In conclusion, I have demonstrated that...", usage: "Pembuka kesimpulan yang kuat" },
      { phrase: "The evidence overwhelmingly supports the view that...", usage: "Merangkum bukti dalam kesimpulan" },
      { phrase: "I urge you to consider the long-term consequences of...", usage: "Call to action dalam penutup" },
      { phrase: "For all these reasons, I firmly maintain that...", usage: "Menyatakan kembali posisi dengan tegas" },
      { phrase: "The balance of argument clearly lies with...", usage: "Menyatakan bahwa argumen sendiri lebih kuat" },
      { phrase: "I rest my case.", usage: "Penutup formal debat (very formal)" }
    ]
  }
];`
  },
  // L3: Academic Presentations
  3: {
    sections: `const SECTIONS: SpeakingSection[] = [
  {
    name: "Pembuka Presentasi Akademik",
    icon: "📊",
    items: [
      { phrase: "Good morning/afternoon. Today I will be presenting...", usage: "Pembuka presentasi standar" },
      { phrase: "The focus of my presentation is...", usage: "Menyatakan topik utama presentasi" },
      { phrase: "I will structure my talk as follows:", usage: "Memberikan overview struktur presentasi" },
      { phrase: "My presentation will cover three main areas:", usage: "Mengumumkan tiga bagian utama" },
      { phrase: "I will begin by... then move on to... and conclude with...", usage: "Roadmap presentasi" },
      { phrase: "Please feel free to ask questions at the end.", usage: "Mengatur sesi tanya jawab" },
      { phrase: "Before I begin, I would like to provide some background context.", usage: "Memperkenalkan konteks latar belakang" },
      { phrase: "The research underpinning this presentation was conducted over...", usage: "Menyebut dasar penelitian" }
    ]
  },
  {
    name: "Transisi & Penanda Struktur",
    icon: "🔄",
    items: [
      { phrase: "Moving on to my second point...", usage: "Transisi ke poin berikutnya" },
      { phrase: "This brings me to the core of my argument:", usage: "Transisi ke bagian utama" },
      { phrase: "As I mentioned earlier,", usage: "Merujuk kembali ke poin sebelumnya" },
      { phrase: "To illustrate this point, consider the following example:", usage: "Memperkenalkan contoh atau ilustrasi" },
      { phrase: "If you look at the slide, you will see that...", usage: "Merujuk ke slide atau visual" },
      { phrase: "This data clearly demonstrates that...", usage: "Menginterpretasikan data dalam presentasi" },
      { phrase: "To summarise this section before moving on:", usage: "Mini kesimpulan sebelum transisi" },
      { phrase: "I would now like to turn your attention to...", usage: "Mengalihkan fokus audiens" }
    ]
  },
  {
    name: "Penutup & Q&A",
    icon: "🎯",
    items: [
      { phrase: "In conclusion, the key takeaways from today's presentation are:", usage: "Penutup presentasi formal" },
      { phrase: "To summarise the main points I have covered:", usage: "Merangkum poin utama" },
      { phrase: "The implications of these findings are significant:", usage: "Menekankan implikasi penelitian" },
      { phrase: "Further research is needed to fully understand...", usage: "Membuka area penelitian lanjutan" },
      { phrase: "I would be happy to take any questions.", usage: "Membuka sesi pertanyaan" },
      { phrase: "That is a very pertinent question. To address it directly:", usage: "Merespons pertanyaan dengan formal" }
    ]
  }
];`
  },
  // L4: Describing Trends & Data
  4: {
    sections: `const SECTIONS: SpeakingSection[] = [
  {
    name: "Mendeskripsikan Kenaikan",
    icon: "📈",
    items: [
      { phrase: "There has been a significant increase in...", usage: "Kenaikan yang signifikan" },
      { phrase: "The figures show a sharp rise in...", usage: "Kenaikan tajam berdasarkan angka" },
      { phrase: "X has grown substantially over the past decade.", usage: "Pertumbuhan substansial dalam periode tertentu" },
      { phrase: "The data reveals a steady upward trend in...", usage: "Tren kenaikan yang stabil" },
      { phrase: "There has been an exponential growth in...", usage: "Pertumbuhan eksponensial" },
      { phrase: "X has more than doubled since...", usage: "Lebih dari dua kali lipat sejak..." },
      { phrase: "The rate of increase has been particularly dramatic in...", usage: "Menekankan dramatisnya kenaikan" },
      { phrase: "X peaked at Y in [year], before levelling off.", usage: "Puncak dan stabilisasi" }
    ]
  },
  {
    name: "Mendeskripsikan Penurunan & Stagnasi",
    icon: "📉",
    items: [
      { phrase: "There has been a marked decline in...", usage: "Penurunan yang terlihat jelas" },
      { phrase: "X has fallen sharply over the same period.", usage: "Penurunan tajam dalam periode yang sama" },
      { phrase: "The figures indicate a gradual decrease in...", usage: "Penurunan bertahap" },
      { phrase: "X has remained relatively stable at approximately...", usage: "Tetap stabil di angka tertentu" },
      { phrase: "Growth has stalled, with X remaining flat since...", usage: "Pertumbuhan terhenti/stagnan" },
      { phrase: "There has been a notable drop in X since the introduction of...", usage: "Penurunan terasa setelah sesuatu terjadi" },
      { phrase: "The trend reversed in [year], falling from X to Y.", usage: "Tren berbalik arah" },
      { phrase: "X experienced a dramatic slump during the period of...", usage: "Penurunan tajam (slump)" }
    ]
  },
  {
    name: "Analisis & Interpretasi Data",
    icon: "🔍",
    items: [
      { phrase: "This suggests that...", usage: "Interpretasi implikasi data" },
      { phrase: "One possible explanation for this trend is...", usage: "Memberikan penjelasan atas tren" },
      { phrase: "The figures are consistent with the theory that...", usage: "Menghubungkan data dengan teori" },
      { phrase: "It is worth noting that this data should be interpreted cautiously.", usage: "Catatan kehati-hatian dalam interpretasi" },
      { phrase: "Correlation does not necessarily imply causation.", usage: "Peringatan ilmiah penting" },
      { phrase: "When compared with the regional average, the figures are...", usage: "Membandingkan dengan rata-rata regional" }
    ]
  }
];`
  },
  // L5: Making Formal Suggestions
  5: {
    sections: `const SECTIONS: SpeakingSection[] = [
  {
    name: "Frasa Saran Formal",
    icon: "💡",
    items: [
      { phrase: "I would like to suggest that we consider...", usage: "Saran formal yang sopan" },
      { phrase: "It might be worth exploring the possibility of...", usage: "Saran tentatif dengan hedging" },
      { phrase: "One approach that has proven effective is...", usage: "Merekomendasikan pendekatan yang terbukti" },
      { phrase: "I would strongly recommend that the team...", usage: "Rekomendasi kuat dengan kewenangan" },
      { phrase: "Could we perhaps consider an alternative approach?", usage: "Saran pertanyaan yang sopan" },
      { phrase: "There may be merit in exploring...", usage: "Membuka kemungkinan tanpa menekan" },
      { phrase: "The most pragmatic course of action would be to...", usage: "Saran pragmatis berbasis realitas" },
      { phrase: "I propose that we adopt a phased approach to...", usage: "Saran implementasi bertahap" }
    ]
  },
  {
    name: "Mendukung & Menolak Saran",
    icon: "🤝",
    items: [
      { phrase: "That is a very constructive suggestion. I would add that...", usage: "Mendukung saran lalu menambahkan" },
      { phrase: "I see the merit in that, though I am not entirely convinced that...", usage: "Dukungan bersyarat" },
      { phrase: "While that approach has advantages, there are potential drawbacks...", usage: "Mengakui kelebihan lalu menyebut kekurangan" },
      { phrase: "With respect, I don't think that would be entirely feasible because...", usage: "Menolak saran dengan sopan" },
      { phrase: "Could we perhaps combine both approaches?", usage: "Mengusulkan solusi gabungan" },
      { phrase: "That solution addresses the immediate problem, but may not...", usage: "Setuju jangka pendek, tapi ragu jangka panjang" },
      { phrase: "I think we should perhaps pilot this initiative before scaling it.", usage: "Rekomendasi uji coba sebelum implementasi penuh" },
      { phrase: "Let us weigh the costs and benefits before committing.", usage: "Menyarankan evaluasi dahulu" }
    ]
  },
  {
    name: "Contoh Dialog Rapat",
    icon: "🏢",
    items: [
      { phrase: "A: We need to address the rising staff turnover.", usage: "Memperkenalkan masalah dalam rapat" },
      { phrase: "B: I would suggest conducting exit interviews to identify root causes.", usage: "Mengemukakan saran konkret" },
      { phrase: "A: That is a sound idea. Could we perhaps also review the compensation structure?", usage: "Mendukung lalu menambahkan saran" },
      { phrase: "B: Absolutely. There may be merit in benchmarking our salaries against industry standards.", usage: "Memperkuat argumen dengan referensi industri" },
      { phrase: "C: With respect, I think any changes should be data-driven.", usage: "Menambahkan persyaratan pada saran" },
      { phrase: "All: I think we are in agreement that a two-pronged approach is most prudent.", usage: "Mencapai konsensus dalam diskusi" }
    ]
  }
];`
  },
  // L6: Expressing Concession & Disagreement
  6: {
    sections: `const SECTIONS: SpeakingSection[] = [
  {
    name: "Konsesi Formal",
    icon: "🤲",
    items: [
      { phrase: "I concede that this is a valid point, however...", usage: "Mengakui poin lawan lalu menambahkan sanggahan" },
      { phrase: "You raise a fair point. Nevertheless, I maintain that...", usage: "Mengakui keadilan argumen lawan" },
      { phrase: "I would not dispute that... but one must also consider...", usage: "Konsesi parsial dengan penambahan" },
      { phrase: "That is certainly true, up to a point. The issue is that...", usage: "Konsesi dengan batasan" },
      { phrase: "Granted, there are some merits to that position. That said...", usage: "Mengakui sebagian lalu meneruskan posisi sendiri" },
      { phrase: "I take your point. At the same time, we cannot ignore...", usage: "Menerima poin lalu menambahkan perspektif" },
      { phrase: "While I accept that... I would argue that the broader picture suggests...", usage: "Konsesi sambil memperluas perspektif" },
      { phrase: "I partially agree. However, the evidence suggests otherwise regarding...", usage: "Persetujuan parsial yang nuansir" }
    ]
  },
  {
    name: "Ketidaksetujuan yang Sopan",
    icon: "❌",
    items: [
      { phrase: "I'm afraid I have to disagree on this particular point.", usage: "Ketidaksetujuan yang sopan dan formal" },
      { phrase: "With respect, I believe there is a flaw in that reasoning.", usage: "Menunjukkan kelemahan logika lawan" },
      { phrase: "I understand your position, but I cannot fully subscribe to it.", usage: "Tidak bisa sepenuhnya setuju" },
      { phrase: "That view, while understandable, is difficult to reconcile with...", usage: "Pandangan yang sulit dikompromikan" },
      { phrase: "I see it rather differently. In my view...", usage: "Menyatakan perspektif yang berbeda" },
      { phrase: "I'd push back on that a little. The data suggest...", usage: "Soft pushback berbasis data" },
      { phrase: "I think we're looking at this from different angles.", usage: "Mengakui perbedaan perspektif tanpa konfrontasi" },
      { phrase: "I respectfully disagree. The evidence points in a different direction.", usage: "Ketidaksetujuan berbasis bukti" }
    ]
  },
  {
    name: "Contoh Dialog Diskusi",
    icon: "🗣️",
    items: [
      { phrase: "A: I believe stricter regulations are the only answer.", usage: "Pernyataan posisi yang kuat" },
      { phrase: "B: I concede that regulation has a role, but I'd push back on 'the only answer.'", usage: "Konsesi + soft disagreement" },
      { phrase: "B: The evidence suggests that market-based solutions can also be effective.", usage: "Menghadirkan perspektif alternatif berbasis bukti" },
      { phrase: "A: You raise a fair point. At the same time, markets have historically underperformed in...", usage: "Konsesi + argumen balik" },
      { phrase: "B: That is certainly true in some cases. Nevertheless, with appropriate incentives...", usage: "Konsesi terbatas + kelanjutan argumen" },
      { phrase: "A: Perhaps a hybrid approach would address both concerns.", usage: "Mencari kompromi" }
    ]
  }
];`
  },
  // L7: Complex Descriptions
  7: {
    sections: `const SECTIONS: SpeakingSection[] = [
  {
    name: "Mendeskripsikan Konsep Abstrak",
    icon: "🔮",
    items: [
      { phrase: "This can best be understood as...", usage: "Memperkenalkan definisi atau analogi" },
      { phrase: "The concept encompasses...", usage: "Mendeskripsikan ruang lingkup konsep" },
      { phrase: "At its core, this refers to...", usage: "Menjelaskan inti sebuah konsep" },
      { phrase: "This phenomenon is characterised by...", usage: "Mendeskripsikan ciri-ciri utama" },
      { phrase: "To put it in more concrete terms...", usage: "Membuat abstrak menjadi konkret" },
      { phrase: "One way to think about this is...", usage: "Menawarkan cara berpikir alternatif" },
      { phrase: "The distinction between X and Y is crucial here.", usage: "Menekankan perbedaan penting" },
      { phrase: "What makes this particularly complex is...", usage: "Mengidentifikasi sumber kompleksitas" }
    ]
  },
  {
    name: "Deskripsi Proses & Sistem",
    icon: "⚙️",
    items: [
      { phrase: "The process begins with... and proceeds through several stages:", usage: "Mendeskripsikan awal dan tahapan proses" },
      { phrase: "At each stage, the following occurs:", usage: "Menjelaskan setiap tahapan" },
      { phrase: "The key components of this system are:", usage: "Mengidentifikasi komponen utama sistem" },
      { phrase: "The relationship between X and Y is complex and mutually reinforcing.", usage: "Mendeskripsikan hubungan timbal balik" },
      { phrase: "When X occurs, it triggers a cascade of effects including...", usage: "Efek berantai setelah sebuah kejadian" },
      { phrase: "The net result of this process is...", usage: "Kesimpulan atau hasil akhir proses" },
      { phrase: "This feedback loop means that changes in X directly affect Y.", usage: "Menjelaskan feedback loop" },
      { phrase: "Critically, this system depends on...", usage: "Mengidentifikasi ketergantungan kritis" }
    ]
  },
  {
    name: "Deskripsi Perbandingan",
    icon: "⚖️",
    items: [
      { phrase: "Compared with its predecessor, the new model is significantly...", usage: "Perbandingan dengan versi sebelumnya" },
      { phrase: "There are notable similarities between X and Y: both...", usage: "Mengidentifikasi kesamaan" },
      { phrase: "However, key differences emerge when we examine...", usage: "Mengidentifikasi perbedaan kunci" },
      { phrase: "In terms of X, A outperforms B. With regard to Y, however...", usage: "Perbandingan multi-dimensi" },
      { phrase: "The contrast between X and Y could not be more striking.", usage: "Menekankan perbedaan yang sangat jelas" },
      { phrase: "Both approaches have their merits, but the contexts differ significantly.", usage: "Membandingkan pendekatan dengan mempertimbangkan konteks" }
    ]
  }
];`
  },
  // L8: Narrative Storytelling
  8: {
    sections: `const SECTIONS: SpeakingSection[] = [
  {
    name: "Memulai Narasi",
    icon: "📖",
    items: [
      { phrase: "Let me tell you about an experience that significantly shaped my perspective.", usage: "Pembuka narasi yang menarik" },
      { phrase: "This takes us back to [year/time period], when...", usage: "Mengatur latar waktu narasi" },
      { phrase: "The story begins at a point when...", usage: "Memulai narasi dengan konteks" },
      { phrase: "What happened next is something I have reflected on many times since.", usage: "Membangun antisipasi dalam narasi" },
      { phrase: "To understand why this mattered, I need to provide some background.", usage: "Memperkenalkan konteks latar belakang" },
      { phrase: "Cast your mind back to a time when...", usage: "Mengajak pendengar berimajinasi" },
      { phrase: "The sequence of events unfolded as follows:", usage: "Mengumumkan kronologi narasi" },
      { phrase: "What I am about to describe changed the way I understood...", usage: "Membangun relevansi narasi" }
    ]
  },
  {
    name: "Membangun Narasi",
    icon: "🎭",
    items: [
      { phrase: "Initially, everything seemed straightforward. However...", usage: "Kontras antara ekspektasi dan realita" },
      { phrase: "At that point, I realised that...", usage: "Momen kesadaran dalam narasi" },
      { phrase: "What made this particularly challenging was...", usage: "Mengidentifikasi tantangan utama" },
      { phrase: "The situation deteriorated when...", usage: "Intensifikasi konflik dalam narasi" },
      { phrase: "Had I known then what I know now...", usage: "Refleksi retrospektif" },
      { phrase: "Despite the obstacles, we managed to...", usage: "Ketahanan menghadapi rintangan" },
      { phrase: "The turning point came when...", usage: "Titik balik narasi" },
      { phrase: "Looking back, it is clear that...", usage: "Refleksi dari perspektif sekarang" }
    ]
  },
  {
    name: "Menutup Narasi & Refleksi",
    icon: "💭",
    items: [
      { phrase: "In hindsight, the experience taught me that...", usage: "Refleksi setelah pengalaman" },
      { phrase: "The legacy of this episode is...", usage: "Warisan atau dampak jangka panjang" },
      { phrase: "What struck me most in the end was...", usage: "Hal yang paling berkesan dari narasi" },
      { phrase: "This experience fundamentally changed my approach to...", usage: "Dampak narasi pada pendekatan hidup" },
      { phrase: "The moral of the story, if there is one, is that...", usage: "Menarik pelajaran dari narasi" },
      { phrase: "And that is why, to this day, I firmly believe that...", usage: "Menghubungkan narasi ke keyakinan saat ini" }
    ]
  }
];`
  },
  // L9: Giving & Responding to Feedback
  9: {
    sections: `const SECTIONS: SpeakingSection[] = [
  {
    name: "Memberikan Umpan Balik Konstruktif",
    icon: "📝",
    items: [
      { phrase: "Overall, this is a strong piece of work. My main suggestion would be...", usage: "Umpan balik positif diikuti saran" },
      { phrase: "I found this particularly effective because...", usage: "Mengidentifikasi kekuatan spesifik" },
      { phrase: "One area where there is room for improvement is...", usage: "Menyebutkan area perbaikan dengan diplomatis" },
      { phrase: "I would suggest reconsidering the structure of...", usage: "Saran spesifik mengenai struktur" },
      { phrase: "This section works well. The following section, however, could benefit from...", usage: "Kontras antara yang baik dan yang perlu diperbaiki" },
      { phrase: "The argument would be strengthened if you were to add...", usage: "Saran untuk memperkuat argumen" },
      { phrase: "I appreciate the effort you have put into this, and I would encourage you to...", usage: "Apresiasi disertai dorongan" },
      { phrase: "This demonstrates a solid understanding. To take it to the next level, consider...", usage: "Praises + stretch target" }
    ]
  },
  {
    name: "Merespons Umpan Balik",
    icon: "💬",
    items: [
      { phrase: "Thank you for that valuable feedback. I will certainly take it on board.", usage: "Respons profesional menerima umpan balik" },
      { phrase: "I take your point about X. Could you elaborate on what you mean by...?", usage: "Menerima umpan balik lalu meminta klarifikasi" },
      { phrase: "I see where you are coming from, though I made that choice deliberately because...", usage: "Menjelaskan keputusan di balik karya" },
      { phrase: "That is helpful. To ensure I understand correctly, are you suggesting that...?", usage: "Memverifikasi pemahaman umpan balik" },
      { phrase: "I appreciate the positive feedback. Regarding your concern about...", usage: "Mengakui pujian lalu merespon kritik" },
      { phrase: "I had not considered that angle. It is a thought-provoking point.", usage: "Mengakui perspektif baru dari umpan balik" },
      { phrase: "I will revise this section with your comments in mind.", usage: "Komitmen untuk revisi berdasarkan umpan balik" },
      { phrase: "Would you be able to prioritise which of these suggestions is most critical?", usage: "Meminta prioritisasi umpan balik" }
    ]
  },
  {
    name: "Contoh Dialog Sesi Umpan Balik",
    icon: "🎤",
    items: [
      { phrase: "A: This report is well-researched. The analysis on page 3 is particularly compelling.", usage: "Umpan balik positif yang spesifik" },
      { phrase: "B: Thank you. I spent considerable time on that section.", usage: "Respons yang menghargai umpan balik" },
      { phrase: "A: One area where I think you could develop further is the conclusion.", usage: "Umpan balik konstruktif yang diplomatis" },
      { phrase: "B: I take your point. Could you clarify what additional elements you feel are missing?", usage: "Meminta elaborasi umpan balik" },
      { phrase: "A: I think a more explicit link to the policy implications would strengthen it.", usage: "Umpan balik yang spesifik dan actionable" },
      { phrase: "B: That is a very useful suggestion. I will address this in the next draft.", usage: "Komitmen revisi yang profesional" }
    ]
  }
];`
  },
  // L10: Making & Supporting Claims
  10: {
    sections: `const SECTIONS: SpeakingSection[] = [
  {
    name: "Membuat Klaim Kuat",
    icon: "💪",
    items: [
      { phrase: "The evidence strongly indicates that...", usage: "Klaim berbasis bukti yang kuat" },
      { phrase: "It is well established that...", usage: "Klaim yang sudah diterima luas" },
      { phrase: "A compelling argument can be made that...", usage: "Mendahului klaim kuat" },
      { phrase: "Research consistently demonstrates that...", usage: "Klaim berbasis konsistensi penelitian" },
      { phrase: "There is growing consensus that...", usage: "Klaim yang mencerminkan pemahaman kolektif berkembang" },
      { phrase: "The data leaves little room for doubt that...", usage: "Klaim dengan keyakinan tinggi" },
      { phrase: "It would be difficult to argue against the proposition that...", usage: "Klaim yang sulit dibantah" },
      { phrase: "The facts of the matter are unambiguous:", usage: "Klaim berdasarkan fakta yang jelas" }
    ]
  },
  {
    name: "Mendukung Klaim dengan Bukti",
    icon: "📊",
    items: [
      { phrase: "To support this claim, consider the following evidence:", usage: "Mengintroduksi bukti pendukung" },
      { phrase: "This is borne out by research conducted by...", usage: "Merujuk penelitian pendukung" },
      { phrase: "Statistical data from [source] reveals that...", usage: "Menggunakan data statistik" },
      { phrase: "According to [authority/study], this accounts for...", usage: "Mengutip otoritas atau penelitian" },
      { phrase: "To put this in perspective, consider that...", usage: "Memberikan konteks atau perspektif angka" },
      { phrase: "A case in point is the example of...", usage: "Memberikan contoh yang relevan" },
      { phrase: "Multiple independent studies have reached the same conclusion:", usage: "Memperkuat klaim dengan konsistensi penelitian" },
      { phrase: "This is further corroborated by the fact that...", usage: "Menambahkan corroboration" }
    ]
  },
  {
    name: "Mengakui Kompleksitas Klaim",
    icon: "🔍",
    items: [
      { phrase: "It must be acknowledged that this is a complex issue with multiple dimensions.", usage: "Mengakui kompleksitas sebelum membuat klaim" },
      { phrase: "While the evidence strongly supports this claim, some nuance is required.", usage: "Klaim kuat dengan pengakuan nuansa" },
      { phrase: "The causality is not straightforward, but the correlation is striking.", usage: "Membedakan korelasi dan kausalitas" },
      { phrase: "This claim holds true under most conditions, though exceptions exist.", usage: "Klaim umum dengan pengakuan pengecualian" },
      { phrase: "The literature is not entirely unanimous on this point, however...", usage: "Mengakui perdebatan dalam literatur" },
      { phrase: "A more nuanced reading of the data suggests...", usage: "Interpretasi data yang lebih dalam" }
    ]
  }
];`
  }
};

// For lessons 11-20, create generic but topic-specific enhancements
const LESSON_TOPICS = {
  11: { title: "Formal Interview Discourse", icon1: "👔", icon2: "💼", icon3: "🎤",
    cat1: "Pembuka Wawancara", cat2: "Menjawab Pertanyaan Sulit", cat3: "Contoh Dialog Wawancara" },
  12: { title: "Group Discussion Leadership", icon1: "👥", icon2: "📋", icon3: "🗣️",
    cat1: "Memimpin Diskusi Kelompok", cat2: "Mengelola Perbedaan Pendapat", cat3: "Mencapai Konsensus" },
  13: { title: "Expressing Hypotheticals", icon1: "🔮", icon2: "💭", icon3: "💬",
    cat1: "Situasi Hipotetis Formal", cat2: "Spekulasi Masa Depan", cat3: "Kondisional dalam Diskusi" },
  14: { title: "Cause & Effect Analysis", icon1: "🔍", icon2: "⚡", icon3: "📊",
    cat1: "Mengidentifikasi Penyebab", cat2: "Menjelaskan Efek & Dampak", cat3: "Hubungan Sebab-Akibat Kompleks" },
  15: { title: "Comparing & Contrasting Complex Ideas", icon1: "⚖️", icon2: "↔️", icon3: "📊",
    cat1: "Persamaan & Perbedaan", cat2: "Evaluasi Komparatif", cat3: "Analisis Multi-Perspektif" },
  16: { title: "Hedging Language in Speaking", icon1: "🛡️", icon2: "⚖️", icon3: "💬",
    cat1: "Hedging Standar", cat2: "Hedging dalam Akademik", cat3: "Praktik Hedging" },
  17: { title: "Summarising & Paraphrasing", icon1: "📝", icon2: "🔄", icon3: "💼",
    cat1: "Teknik Meringkas", cat2: "Parafrase Formal", cat3: "Aplikasi dalam Diskusi" },
  18: { title: "Intercultural Communication", icon1: "🌍", icon2: "🤝", icon3: "💬",
    cat1: "Kesadaran Budaya", cat2: "Bahasa Lintas Budaya", cat3: "Dialog Antar Budaya" },
  19: { title: "Critical Thinking in Discussion", icon1: "🧠", icon2: "🔍", icon3: "💬",
    cat1: "Mengevaluasi Argumen", cat2: "Identifikasi Fallacy", cat3: "Diskusi Kritis" },
  20: { title: "Integrated Speaking Practice", icon1: "🎯", icon2: "🔄", icon3: "🏆",
    cat1: "Review Frasa Kunci", cat2: "Strategi Terpadu", cat3: "Simulasi" }
};

const LESSON_11_20_CONTENT = {
  11: `const SECTIONS: SpeakingSection[] = [
  {
    name: "Pembuka Wawancara Formal",
    icon: "👔",
    items: [
      { phrase: "Thank you for the opportunity to interview for this position.", usage: "Pembuka sopan dan profesional" },
      { phrase: "I have been looking forward to discussing how my experience aligns with...", usage: "Menunjukkan antusiasme dan kesiapan" },
      { phrase: "Could you tell me a little more about the specific challenges the role presents?", usage: "Pertanyaan informatif untuk pewawancara" },
      { phrase: "I would like to draw your attention to three key aspects of my background:", usage: "Mengatur struktur respons" },
      { phrase: "In my most recent role, I was responsible for...", usage: "Memperkenalkan pengalaman relevan" },
      { phrase: "This experience has equipped me with...", usage: "Menghubungkan pengalaman ke kompetensi" },
      { phrase: "My approach to this challenge has consistently been to...", usage: "Mendeskripsikan metode kerja" },
      { phrase: "I am particularly drawn to this organisation because of its commitment to...", usage: "Menunjukkan riset tentang perusahaan" }
    ]
  },
  {
    name: "Menjawab Pertanyaan Sulit",
    icon: "💼",
    items: [
      { phrase: "That is a perceptive question. To answer it directly:", usage: "Mengakui kualitas pertanyaan sebelum menjawab" },
      { phrase: "I think it is important to be transparent about...", usage: "Kejujuran dalam menjawab pertanyaan sulit" },
      { phrase: "Looking back, I might have approached that situation differently by...", usage: "Refleksi dan pembelajaran dari masa lalu" },
      { phrase: "The strength that also represents a development area for me is...", usage: "Menjawab kekuatan sekaligus keterbatasan" },
      { phrase: "I would rather describe it as a challenge I have actively worked to address.", usage: "Frame ulang kelemahan sebagai area pengembangan" },
      { phrase: "In that instance, I prioritised X over Y, which ultimately led to...", usage: "Menjelaskan trade-off keputusan" },
      { phrase: "I learned from that experience that effective leadership requires...", usage: "Mengambil pelajaran dari pengalaman sulit" },
      { phrase: "My salary expectation is in the range of X, though I am open to discussion based on...", usage: "Menjawab pertanyaan gaji secara profesional" }
    ]
  },
  {
    name: "Penutup Wawancara",
    icon: "🎤",
    items: [
      { phrase: "Do you have any reservations about my candidacy that I could address?", usage: "Membuka diskusi tentang hambatan potensial" },
      { phrase: "What does success look like in this role during the first 90 days?", usage: "Pertanyaan strategic tentang ekspektasi" },
      { phrase: "I am very enthusiastic about this opportunity and would welcome the chance to contribute.", usage: "Reiterate interest dengan profesionalisme" },
      { phrase: "Could you describe the team culture and working dynamic?", usage: "Pertanyaan tentang budaya tim" },
      { phrase: "What are the primary challenges facing the department currently?", usage: "Pertanyaan strategic yang menunjukkan business understanding" },
      { phrase: "Thank you again for your time. I look forward to hearing from you.", usage: "Penutup profesional yang tegas" }
    ]
  }
];`,
  12: `const SECTIONS: SpeakingSection[] = [
  {
    name: "Memimpin Diskusi Kelompok",
    icon: "👥",
    items: [
      { phrase: "Let us begin by establishing our objectives for this session.", usage: "Membuka diskusi dengan menetapkan tujuan" },
      { phrase: "I would like to invite everyone to share their initial thoughts on...", usage: "Membuka diskusi inklusif" },
      { phrase: "To ensure we stay on track, perhaps we could focus on...", usage: "Menjaga diskusi tetap fokus" },
      { phrase: "We seem to be covering several points simultaneously. Could we address one at a time?", usage: "Mengelola diskusi yang menyimpang" },
      { phrase: "We have heard from X and Y. I would like to bring in Z's perspective as well.", usage: "Memastikan partisipasi merata" },
      { phrase: "Let us take stock of where we have reached so far.", usage: "Memeriksa kemajuan diskusi" },
      { phrase: "We are running short on time. Shall we prioritise the most pressing issues?", usage: "Manajemen waktu dalam diskusi" },
      { phrase: "I would like to summarise the key points that have emerged so far:", usage: "Merangkum poin diskusi berkala" }
    ]
  },
  {
    name: "Mengelola Perbedaan Pendapat",
    icon: "📋",
    items: [
      { phrase: "It seems we have two differing perspectives here. Let us examine both.", usage: "Mengakui perbedaan dan menelaah keduanya" },
      { phrase: "Could we perhaps find common ground between these two positions?", usage: "Mencari titik temu" },
      { phrase: "These views are not necessarily mutually exclusive. Consider that...", usage: "Menunjukkan pandangan tidak harus saling menghilangkan" },
      { phrase: "I appreciate both viewpoints. The key question is which approach best serves...", usage: "Mengevaluasi pandangan berdasarkan tujuan" },
      { phrase: "Let us set aside this point temporarily and return to it once we have more information.", usage: "Menangguhkan keputusan yang membutuhkan lebih banyak data" },
      { phrase: "Both of you raise valid concerns. Could we explore a middle ground?", usage: "Fasilitasi kompromi" },
      { phrase: "It may be helpful to clarify what we mean by X before proceeding.", usage: "Mengklarifikasi istilah sebelum lanjut" },
      { phrase: "What specific evidence would help us resolve this disagreement?", usage: "Mengarahkan diskusi ke basis data" }
    ]
  },
  {
    name: "Mencapai Konsensus",
    icon: "🗣️",
    items: [
      { phrase: "Are we in agreement that...? Let us confirm before moving forward.", usage: "Memeriksa kesepakatan sebelum lanjut" },
      { phrase: "It appears we have reached a consensus on X. The next step would be...", usage: "Menyatakan konsensus dan menetapkan tindak lanjut" },
      { phrase: "Can we agree to disagree on this point and move to the next agenda item?", usage: "Bersepakat untuk tidak sepakat" },
      { phrase: "Before we close, let us confirm the actions each of us will take.", usage: "Konfirmasi action items sebelum menutup" },
      { phrase: "I believe we have made significant progress. Let us schedule a follow-up to...", usage: "Menutup diskusi dengan agenda tindak lanjut" },
      { phrase: "Thank you all for your contributions. The key decisions we have made are:", usage: "Merangkum keputusan akhir" }
    ]
  }
];`,
  13: `const SECTIONS: SpeakingSection[] = [
  {
    name: "Situasi Hipotetis Formal",
    icon: "🔮",
    items: [
      { phrase: "Suppose, for the sake of argument, that...", usage: "Memperkenalkan skenario hipotetis" },
      { phrase: "In a hypothetical scenario where X were the case...", usage: "Framing skenario hipotetis formal" },
      { phrase: "Were we to implement this policy, the likely outcomes would be...", usage: "Spekulasi formal tentang hasil kebijakan" },
      { phrase: "Let us imagine, for a moment, that the situation were reversed.", usage: "Mengundang audiens ke perspektif terbalik" },
      { phrase: "If we were to extrapolate from the current trends, we might expect...", usage: "Ekstrapolasi tren ke masa depan" },
      { phrase: "One can only speculate, but the available evidence suggests...", usage: "Spekulasi berbasis bukti" },
      { phrase: "Under different circumstances, the outcome might have been...", usage: "Mempertimbangkan alternatif counterfactual" },
      { phrase: "Had the initial assumptions been different, we would likely have seen...", usage: "Counterfactual – jika asumsi berbeda" }
    ]
  },
  {
    name: "Spekulasi Masa Depan",
    icon: "💭",
    items: [
      { phrase: "Looking ahead, it seems plausible that...", usage: "Spekulasi tentang masa depan yang terukur" },
      { phrase: "There is a realistic possibility that within the next decade...", usage: "Kemungkinan yang realistis jangka menengah" },
      { phrase: "Barring any unforeseen disruptions, we might expect...", usage: "Proyeksi bersyarat" },
      { phrase: "Technological advances could fundamentally alter the landscape of...", usage: "Dampak teknologi pada bidang tertentu" },
      { phrase: "The trajectory of current events suggests that...", usage: "Proyeksi berbasis tren saat ini" },
      { phrase: "It remains to be seen whether...", usage: "Ketidakpastian yang diakui" },
      { phrase: "The most optimistic projection would be..., though a more cautious estimate...", usage: "Membandingkan proyeksi optimis vs konservatif" },
      { phrase: "If the political will exists, there is every reason to believe that...", usage: "Kondisional berbasis political will" }
    ]
  },
  {
    name: "Kondisional dalam Diskusi",
    icon: "💬",
    items: [
      { phrase: "If that were indeed the case, it would have profound implications for...", usage: "Kondisional formal untuk implikasi" },
      { phrase: "Given that X, it follows logically that...", usage: "Reasoning berbasis premis" },
      { phrase: "On the assumption that this data is accurate, we can conclude...", usage: "Kesimpulan berbasis asumsi" },
      { phrase: "Even if we were to grant that premise, the conclusion does not necessarily follow.", usage: "Menantang logical leap" },
      { phrase: "In the event that negotiations fail, the alternatives would be...", usage: "Rencana alternatif" },
      { phrase: "Should the situation deteriorate further, policymakers would need to consider...", usage: "Respons terhadap skenario lebih buruk" }
    ]
  }
];`,
  14: `const SECTIONS: SpeakingSection[] = [
  {
    name: "Mengidentifikasi Penyebab",
    icon: "🔍",
    items: [
      { phrase: "The root cause of this issue appears to be...", usage: "Mengidentifikasi penyebab utama" },
      { phrase: "Several contributing factors have led to this outcome:", usage: "Mengidentifikasi faktor-faktor kontribusi" },
      { phrase: "This can be attributed primarily to...", usage: "Mengatribusikan penyebab secara formal" },
      { phrase: "The underlying driver of this trend is...", usage: "Mengidentifikasi penggerak utama tren" },
      { phrase: "It would be an oversimplification to attribute this solely to...", usage: "Menghindari oversimplifikasi penyebab" },
      { phrase: "A combination of structural and contextual factors has contributed to...", usage: "Penyebab ganda: struktural dan kontekstual" },
      { phrase: "The trigger for this outcome was..., though the deeper causes include...", usage: "Membedakan trigger dan penyebab lebih dalam" },
      { phrase: "If we trace the chain of causation, it is clear that...", usage: "Menelusuri rantai sebab-akibat" }
    ]
  },
  {
    name: "Menjelaskan Efek & Dampak",
    icon: "⚡",
    items: [
      { phrase: "The consequences of this are far-reaching and include...", usage: "Dampak yang luas dan beragam" },
      { phrase: "This has had a profound impact on...", usage: "Dampak yang mendalam" },
      { phrase: "The effects have been felt particularly acutely in...", usage: "Dampak yang paling dirasakan di..." },
      { phrase: "In the short term, the immediate effects include... In the long term, however...", usage: "Dampak jangka pendek vs panjang" },
      { phrase: "The ripple effects of this decision have been significant, affecting...", usage: "Efek riak yang meluas" },
      { phrase: "This has created a cascade of secondary effects, including...", usage: "Cascade effects dari keputusan utama" },
      { phrase: "While the direct effects are observable, the indirect consequences may be more significant.", usage: "Membedakan dampak langsung dan tidak langsung" },
      { phrase: "The cumulative effect of these factors has been to...", usage: "Efek kumulatif dari berbagai faktor" }
    ]
  },
  {
    name: "Hubungan Sebab-Akibat Kompleks",
    icon: "📊",
    items: [
      { phrase: "While X is a contributing factor, it does not fully account for...", usage: "X berkontribusi tapi tidak cukup menjelaskan" },
      { phrase: "The relationship between X and Y is bidirectional.", usage: "Hubungan timbal balik dua arah" },
      { phrase: "One must be cautious about inferring causation from correlation alone.", usage: "Peringatan tentang inferensi kausalitas" },
      { phrase: "The evidence points to a complex interplay between X, Y, and Z.", usage: "Interaksi kompleks multiple faktor" },
      { phrase: "This creates a self-reinforcing cycle in which X leads to Y, which in turn exacerbates X.", usage: "Siklus yang memperkuat dirinya sendiri" },
      { phrase: "The magnitude of the effect depends critically on...", usage: "Besarnya efek tergantung pada variabel tertentu" }
    ]
  }
];`,
  15: `const SECTIONS: SpeakingSection[] = [
  {
    name: "Persamaan & Perbedaan",
    icon: "⚖️",
    items: [
      { phrase: "Both X and Y share the characteristic of...", usage: "Mengidentifikasi persamaan utama" },
      { phrase: "While X and Y appear similar on the surface, closer examination reveals...", usage: "Perbedaan yang tidak tampak dari luar" },
      { phrase: "The fundamental distinction between the two is...", usage: "Perbedaan mendasar antara dua hal" },
      { phrase: "In contrast to X, Y tends to...", usage: "Kontras langsung dengan frasa formal" },
      { phrase: "Whereas X prioritises... Y places greater emphasis on...", usage: "Membandingkan prioritas dua hal" },
      { phrase: "The parallels between X and Y are striking, particularly in...", usage: "Keserupaan yang mencolok" },
      { phrase: "Unlike X, which relies on..., Y operates on the principle that...", usage: "Perbedaan mekanisme atau prinsip" },
      { phrase: "Both models share underlying assumptions, yet diverge significantly in their applications.", usage: "Sama dalam asumsi, beda dalam penerapan" }
    ]
  },
  {
    name: "Evaluasi Komparatif",
    icon: "↔️",
    items: [
      { phrase: "When evaluated against agreed criteria, X outperforms Y in terms of...", usage: "Evaluasi berbasis kriteria yang jelas" },
      { phrase: "The relative strengths and weaknesses of each approach must be weighed carefully.", usage: "Keseimbangan dalam evaluasi" },
      { phrase: "On balance, the evidence suggests that X is more effective, though Y has advantages in...", usage: "Penilaian dengan kualifikasi" },
      { phrase: "The choice between X and Y ultimately depends on the specific context and objectives.", usage: "Keputusan tergantung konteks" },
      { phrase: "In terms of cost-effectiveness, X clearly has the advantage. However, in terms of...", usage: "Perbandingan multi-dimensi" },
      { phrase: "There is no one-size-fits-all answer here; the optimal approach varies by situation.", usage: "Menghindari oversimplifikasi evaluatif" },
      { phrase: "A nuanced comparison reveals that each approach has distinct advantages under different conditions.", usage: "Evaluasi nuansir yang kontekstual" },
      { phrase: "Taken in isolation, X may appear superior. However, when considered alongside...", usage: "Perbandingan dalam konteks yang lebih luas" }
    ]
  },
  {
    name: "Analisis Multi-Perspektif",
    icon: "📊",
    items: [
      { phrase: "From an economic standpoint, X is clearly preferable. From a social perspective, however...", usage: "Analisis dari berbagai sudut pandang" },
      { phrase: "Viewed through a historical lens, these developments echo the pattern seen in...", usage: "Perspektif historis dalam perbandingan" },
      { phrase: "Different stakeholders will evaluate this differently depending on their priorities.", usage: "Multiperspektif berdasarkan kepentingan" },
      { phrase: "The short-term comparison favours X, while long-term analysis suggests Y may be more sustainable.", usage: "Perbandingan jangka pendek vs panjang" },
      { phrase: "At a macro level, the differences are subtle. At the micro level, however, they are significant.", usage: "Analisis di tingkat makro vs mikro" },
      { phrase: "The comparison is not straightforward given the differences in context, scale, and objectives.", usage: "Kompleksitas perbandingan yang jujur" }
    ]
  }
];`,
  16: `const SECTIONS: SpeakingSection[] = [
  {
    name: "Hedging Standar B2",
    icon: "🛡️",
    items: [
      { phrase: "It is generally accepted that..., though exceptions exist.", usage: "Pernyataan umum dengan pengakuan pengecualian" },
      { phrase: "There is some evidence to suggest that...", usage: "Klaim lemah berbasis bukti terbatas" },
      { phrase: "This tends to be the case, at least under normal circumstances.", usage: "Generalisasi bersyarat" },
      { phrase: "One might argue that..., though this remains contested.", usage: "Klaim yang masih diperdebatkan" },
      { phrase: "It is perhaps too early to draw definitive conclusions.", usage: "Kehati-hatian dalam membuat simpulan" },
      { phrase: "The data appears to support this interpretation, though further research is warranted.", usage: "Interpretasi berbasis data dengan catatan" },
      { phrase: "This is, at best, a preliminary finding that requires further validation.", usage: "Temuan awal yang perlu divalidasi" },
      { phrase: "While the correlation is suggestive, causal links have not yet been conclusively established.", usage: "Membedakan korelasi dan kausalitas" }
    ]
  },
  {
    name: "Hedging dalam Akademik & Formal",
    icon: "⚖️",
    items: [
      { phrase: "The available evidence is consistent with the view that...", usage: "Bukti konsisten dengan pandangan tertentu" },
      { phrase: "It would appear that..., though this interpretation is not without its critics.", usage: "Interpretasi yang ada penentangnya" },
      { phrase: "The balance of evidence tends to favour the conclusion that...", usage: "Keseimbangan bukti mendukung simpulan" },
      { phrase: "This is a plausible interpretation, though alternative explanations cannot be ruled out.", usage: "Plausibel tapi tidak menutup alternatif" },
      { phrase: "Under most conditions, this holds true. However, in edge cases...", usage: "Berlaku untuk sebagian besar, kecuali ketika..." },
      { phrase: "It may be premature to generalise from these specific findings.", usage: "Kehati-hatian dalam generalisasi" },
      { phrase: "The evidence is suggestive rather than conclusive at this stage.", usage: "Bukti masih sugestif, belum konklusif" },
      { phrase: "It remains an open question whether...", usage: "Pertanyaan yang belum terjawab" }
    ]
  },
  {
    name: "Praktik Hedging dalam Dialog",
    icon: "💬",
    items: [
      { phrase: "A: So you're saying that X definitively causes Y?", usage: "Pertanyaan mengkonfirmasi klaim" },
      { phrase: "B: Not quite. The evidence suggests an association, though causality is harder to establish.", usage: "Hedging respons dari klaim terlalu kuat" },
      { phrase: "A: Can we conclude from this that the policy failed?", usage: "Pertanyaan mengenai simpulan" },
      { phrase: "B: It would be premature to say it failed categorically. What we can say is that...", usage: "Kehati-hatian dalam simpulan" },
      { phrase: "A: Does the research support this universally?", usage: "Pertanyaan tentang universalitas" },
      { phrase: "B: It appears to hold in most contexts studied, though cross-cultural applicability requires further investigation.", usage: "Hedging terkait universalitas lintas budaya" }
    ]
  }
];`,
  17: `const SECTIONS: SpeakingSection[] = [
  {
    name: "Teknik Meringkas",
    icon: "📝",
    items: [
      { phrase: "In essence, the main argument is that...", usage: "Merangkum inti argumen" },
      { phrase: "To put it more concisely, the author's central claim is...", usage: "Versi lebih ringkas dari argumen utama" },
      { phrase: "The key points of the discussion can be summarised as follows:", usage: "Merangkum poin-poin utama diskusi" },
      { phrase: "Stripping away the detail, the core message is...", usage: "Mengidentifikasi pesan inti tanpa detail" },
      { phrase: "If I were to boil this down to its essence, I would say...", usage: "Esensi yang paling inti" },
      { phrase: "To recap the main threads of the argument:", usage: "Merekapitulasi benang utama argumen" },
      { phrase: "The overarching conclusion that emerges is...", usage: "Kesimpulan keseluruhan yang muncul" },
      { phrase: "Three key themes run through this discussion: first..., second..., and finally...", usage: "Merangkum tema dalam struktur yang jelas" }
    ]
  },
  {
    name: "Parafrase Formal",
    icon: "🔄",
    items: [
      { phrase: "In other words, what the speaker is saying is...", usage: "Parafrase langsung" },
      { phrase: "To put this another way,", usage: "Cara lain mengungkapkan hal yang sama" },
      { phrase: "What this amounts to is...", usage: "Makna yang sesungguhnya" },
      { phrase: "Rephrased, the argument runs as follows:", usage: "Framing ulang argumen" },
      { phrase: "Essentially, this is equivalent to saying that...", usage: "Ekuivalensi makna" },
      { phrase: "The author appears to be suggesting that..., which I interpret as...", usage: "Parafrase dengan interpretasi" },
      { phrase: "To put this in more accessible terms,", usage: "Menyederhanakan istilah teknis" },
      { phrase: "If we read between the lines, the implication is that...", usage: "Mengidentifikasi makna tersirat" }
    ]
  },
  {
    name: "Aplikasi dalam Diskusi",
    icon: "💼",
    items: [
      { phrase: "So, if I understand your position correctly, you are arguing that...", usage: "Memparafrase posisi lawan bicara" },
      { phrase: "Let me see if I have correctly understood your point:", usage: "Mengonfirmasi pemahaman dengan parafrase" },
      { phrase: "Am I right in thinking that you are essentially saying...?", usage: "Verifikasi dengan cara lain" },
      { phrase: "To summarise what we have discussed so far:", usage: "Merangkum kemajuan diskusi" },
      { phrase: "Before we move on, perhaps I could recap the key decisions made:", usage: "Merangkum keputusan sebelum lanjut" },
      { phrase: "What I take from this is..., though I may have misread your intention.", usage: "Mengambil makna dengan kehati-hatian" }
    ]
  }
];`,
  18: `const SECTIONS: SpeakingSection[] = [
  {
    name: "Kesadaran Budaya",
    icon: "🌍",
    items: [
      { phrase: "It is important to recognise that cultural norms vary significantly across contexts.", usage: "Mengakui keragaman norma budaya" },
      { phrase: "What may be considered appropriate in one cultural context can be perceived very differently in another.", usage: "Kontekstualisasi norma budaya" },
      { phrase: "I am mindful that my perspective here is shaped by my own cultural background.", usage: "Kesadaran terhadap bias budaya sendiri" },
      { phrase: "Cross-cultural communication requires sensitivity and a willingness to adapt.", usage: "Komponen komunikasi lintas budaya yang efektif" },
      { phrase: "The concept of directness, for example, is valued very differently across cultures.", usage: "Contoh perbedaan konseptual lintas budaya" },
      { phrase: "It would be reductive to generalise about cultural practices without acknowledging diversity within cultures.", usage: "Menghindari stereotip budaya" },
      { phrase: "From a cultural perspective, this gesture carries very different connotations in...", usage: "Kontekstualisasi gestur atau praktik spesifik" },
      { phrase: "Building intercultural competence requires constant learning and self-reflection.", usage: "Kompetensi lintas budaya sebagai proses berkelanjutan" }
    ]
  },
  {
    name: "Bahasa Lintas Budaya",
    icon: "🤝",
    items: [
      { phrase: "I hope this translation captures the intended meaning accurately.", usage: "Kehati-hatian dalam terjemahan dan makna" },
      { phrase: "There is no direct equivalent in [language] for this concept.", usage: "Keterbatasan ekuivalensi linguistik" },
      { phrase: "Could you clarify what you mean by that term in your cultural context?", usage: "Meminta klarifikasi berbasis konteks budaya" },
      { phrase: "The concept may require some unpacking for those from different cultural backgrounds.", usage: "Mengantisipasi kesenjangan pemahaman budaya" },
      { phrase: "Communication styles tend to differ between high-context and low-context cultures.", usage: "Perbedaan gaya komunikasi high vs low context" },
      { phrase: "Silence, in some cultural contexts, conveys respect rather than disinterest.", usage: "Reinterpretasi perilaku dari lensa budaya berbeda" },
      { phrase: "The degree of formality expected in this type of interaction varies by culture.", usage: "Variasi tingkat formalitas berbasis budaya" },
      { phrase: "I appreciate you sharing that. It gives me a richer understanding of your perspective.", usage: "Apresiasi terhadap berbagi perspektif budaya" }
    ]
  },
  {
    name: "Dialog Antar Budaya",
    icon: "💬",
    items: [
      { phrase: "A: In our culture, direct disagreement is generally avoided in formal settings.", usage: "Menjelaskan norma budaya sendiri" },
      { phrase: "B: That is a fascinating insight. Can you help me understand how disagreement is typically expressed?", usage: "Rasa ingin tahu yang genuini tentang norma budaya" },
      { phrase: "A: Typically, we would signal discomfort indirectly by...", usage: "Menjelaskan komunikasi tidak langsung" },
      { phrase: "B: I appreciate that. I should mention that in my context, directness is generally valued as a sign of respect.", usage: "Menjelaskan norma budaya sendiri sebagai kontras" },
      { phrase: "A: That is very helpful context. How should I interpret your silence during discussions?", usage: "Practical question tentang komunikasi" },
      { phrase: "B: In our interactions, feel free to interpret my silence as thoughtful consideration rather than disagreement.", usage: "Menetapkan kode komunikasi bersama" }
    ]
  }
];`,
  19: `const SECTIONS: SpeakingSection[] = [
  {
    name: "Mengevaluasi Argumen",
    icon: "🧠",
    items: [
      { phrase: "The strength of this argument rests on the quality of its underlying evidence.", usage: "Menilai kualitas argumen dari sisi bukti" },
      { phrase: "While this is a persuasive claim, it relies heavily on an unexamined assumption.", usage: "Mengidentifikasi asumsi tersembunyi" },
      { phrase: "The logic here is sound, provided we accept the initial premise.", usage: "Menilai logika dengan syarat" },
      { phrase: "This argument would be more compelling if supported by empirical evidence.", usage: "Meminta bukti empiris" },
      { phrase: "There is an internal inconsistency in this line of reasoning: on one hand..., yet on the other...", usage: "Mengidentifikasi inkonsistensi internal" },
      { phrase: "The argument conflates two distinct concepts: X and Y are not equivalent.", usage: "Mengidentifikasi equivocation" },
      { phrase: "This is a well-structured argument, though the conclusion may not necessarily follow from the premises.", usage: "Menilai struktur logis" },
      { phrase: "One must distinguish between what the evidence demonstrates and what it merely suggests.", usage: "Tingkat kepastian dalam interpretasi bukti" }
    ]
  },
  {
    name: "Identifikasi Logical Fallacies",
    icon: "🔍",
    items: [
      { phrase: "That appears to be a false dilemma — there may be options beyond A and B.", usage: "Mengidentifikasi false dichotomy" },
      { phrase: "This reasoning assumes that correlation implies causation, which is not necessarily the case.", usage: "Korelasi vs kausalitas" },
      { phrase: "Be cautious of hasty generalisations — one case does not establish a pattern.", usage: "Mengidentifikasi hasty generalisation" },
      { phrase: "This seems to be an appeal to authority rather than evidence.", usage: "Mengidentifikasi appeal to authority" },
      { phrase: "The argument here is essentially circular — it relies on its own conclusion as evidence.", usage: "Mengidentifikasi circular reasoning" },
      { phrase: "This may be a straw man argument — that is not quite what the opposing view holds.", usage: "Mengidentifikasi straw man" },
      { phrase: "We should be careful not to commit the ad hominem fallacy by attacking the person, not the argument.", usage: "Menghindari ad hominem" },
      { phrase: "The slippery slope assumption here requires evidence that each step necessarily leads to the next.", usage: "Mengidentifikasi slippery slope" }
    ]
  },
  {
    name: "Diskusi Kritis yang Produktif",
    icon: "💬",
    items: [
      { phrase: "Let us examine the evidence on both sides before drawing any conclusions.", usage: "Pendekatan balanced sebelum simpulan" },
      { phrase: "Rather than dismissing this view outright, let us explore the reasoning behind it.", usage: "Pendekatan steel-manning argumen lawan" },
      { phrase: "What specific evidence would change your position on this?", usage: "Pertanyaan penting tentang falsifiability" },
      { phrase: "I think we should be epistemically humble here given the complexity of the issue.", usage: "Mengedepankan kerendahan hati epistemik" },
      { phrase: "Let us focus on the strongest version of each argument.", usage: "Mengutamakan argumen terkuat dari tiap sisi" },
      { phrase: "What assumptions are we making that we might not have examined carefully?", usage: "Mengidentifikasi asumsi tak tersirat" }
    ]
  }
];`,
  20: `const SECTIONS: SpeakingSection[] = [
  {
    name: "Review Frasa Kunci B2",
    icon: "🎯",
    items: [
      { phrase: "From my perspective, the evidence clearly suggests that...", usage: "Opini formal + klaim berbasis bukti" },
      { phrase: "While I concede that X has merit, I would argue that Y is ultimately more significant.", usage: "Konsesi + argumen utama" },
      { phrase: "What the data reveal is not simply a correlation but a robust causal pattern.", usage: "Klaim kausal yang kuat berbasis data" },
      { phrase: "Not only does this approach address the immediate issue, but it also represents a systemic solution.", usage: "Not only...but also: klaim dua dimensi" },
      { phrase: "It is my contention that this represents one of the most pressing challenges of our era.", usage: "Opini formal yang kuat dengan framing" },
      { phrase: "The weight of evidence strongly supports the view that...", usage: "Klaim berbasis konvergensi bukti" },
      { phrase: "I would urge a more nuanced reading of the available evidence.", usage: "Mendorong analisis yang lebih dalam dan bernuansa" },
      { phrase: "In light of these considerations, the most prudent course of action would be...", usage: "Rekomendasi berbasis analisis yang komprehensif" }
    ]
  },
  {
    name: "Strategi Terpadu Speaking B2",
    icon: "🔄",
    items: [
      { phrase: "Structure your response: Position → Evidence → Concession → Restatement.", usage: "Struktur argumen empat tahap" },
      { phrase: "Use hedging language to show intellectual honesty: 'The evidence tends to suggest...'", usage: "Hedging sebagai tanda kejujuran intelektual" },
      { phrase: "Employ discourse markers to guide your listener: 'Furthermore...', 'Nevertheless...'", usage: "Discourse markers sebagai navigasi argumen" },
      { phrase: "Balance formal and accessible language: avoid jargon that obscures your message.", usage: "Keseimbangan register formal dan accessible" },
      { phrase: "Actively listen and paraphrase: 'If I understand you correctly, you are suggesting...'", usage: "Parafrase aktif sebagai strategi diskusi" },
      { phrase: "Flag transitions clearly: 'Moving on to my second argument...'", usage: "Signal transisi yang jelas" },
      { phrase: "End with a memorable conclusion: 'For all these reasons, I firmly maintain that...'", usage: "Penutup yang kuat dan tegas" },
      { phrase: "Acknowledge complexity: 'This is a multifaceted issue that resists simple solutions.'", usage: "Mengakui kompleksitas sebagai tanda sophistication" }
    ]
  },
  {
    name: "Simulasi & Praktek Mandiri",
    icon: "🏆",
    items: [
      { phrase: "TASK: Present a 2-minute argument on a current issue using formal opinion phrases.", usage: "Latihan presentasi pendapat formal" },
      { phrase: "TASK: Practise conceding a point before reinforcing your main argument.", usage: "Latihan konsesi + pemulihan argumen" },
      { phrase: "TASK: Describe a trend using precise language without overstatement.", usage: "Latihan deskripsi tren yang akurat" },
      { phrase: "TASK: Summarise a complex issue in exactly three sentences.", usage: "Latihan meringkas dengan batasan ketat" },
      { phrase: "TASK: Role-play a formal job interview using the structures from Lesson 11.", usage: "Simulasi wawancara kerja formal" },
      { phrase: "TASK: Identify and name three logical fallacies in a given argument.", usage: "Latihan identifikasi fallacy" }
    ]
  }
];`
};

let successCount = 0;

for (let lNum = 1; lNum <= 20; lNum++) {
  const file = path.join(BASE, `Lesson${lNum}.tsx`);
  if (!fs.existsSync(file)) { console.log(`⚠️ Lesson${lNum}.tsx not found`); continue; }

  const enh = ENHANCEMENTS[lNum] || { sections: LESSON_11_20_CONTENT[lNum] };
  if (!enh || !enh.sections) { console.log(`ℹ️ No sections content for Lesson${lNum}`); continue; }

  let content = fs.readFileSync(file, 'utf8');
  const sectionsRegex = /const SECTIONS: SpeakingSection\[\] = \[[\s\S]*?\];/;
  if (sectionsRegex.test(content)) {
    content = content.replace(sectionsRegex, enh.sections);
    fs.writeFileSync(file, content, 'utf8');
    console.log(`✅ Lesson${lNum} Speaking enhanced.`);
    successCount++;
  } else {
    console.log(`⚠️ Could not find SECTIONS in Lesson${lNum}`);
  }
}

console.log(`\n🎯 Speaking Enhancement: ${successCount}/20 lessons done.`);
