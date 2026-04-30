const fs = require('fs');
const path = require('path');

const EXAMPLES_BANK = {
  2: [
    { tag: "Experience", en: "I have visited Tokyo three times.", id: "Saya sudah pernah ke Tokyo tiga kali." },
    { tag: "Recent Action", en: "She has just finished her project.", id: "Dia baru saja menyelesaikan proyeknya." },
    { tag: "Unfinished Time", en: "We have lived in this city since 2015.", id: "Kami telah tinggal di kota ini sejak 2015." },
    { tag: "Result Now", en: "He has lost his keys, so he can't open the door.", id: "Dia kehilangan kuncinya, jadi dia tidak bisa membuka pintu." },
    { tag: "Question", en: "Have you ever eaten sushi?", id: "Pernahkah kamu makan sushi?" },
    { tag: "Negative", en: "I haven't seen that movie yet.", id: "Saya belum menonton film itu." }
  ],
  3: [
    { tag: "Specific Past", en: "I traveled to London last year.", id: "Saya bepergian ke London tahun lalu." },
    { tag: "Life Experience", en: "I have traveled to London before.", id: "Saya pernah bepergian ke London sebelumnya." },
    { tag: "Finished Action", en: "Did you finish the report yesterday?", id: "Apakah kamu menyelesaikan laporannya kemarin?" },
    { tag: "Unfinished Action", en: "Have you finished the report?", id: "Apakah kamu sudah menyelesaikan laporannya?" },
    { tag: "Past vs Present", en: "He lived there for 5 years, but now he is here.", id: "Dia tinggal di sana selama 5 tahun, tapi sekarang dia di sini." },
    { tag: "Still Ongoing", en: "He has lived there for 5 years.", id: "Dia sudah tinggal di sana selama 5 tahun (dan masih)." }
  ],
  4: [
    { tag: "Action in Progress", en: "I was watching TV at 8 PM yesterday.", id: "Saya sedang menonton TV jam 8 malam kemarin." },
    { tag: "Interrupted Action", en: "She was reading when the phone rang.", id: "Dia sedang membaca saat telepon berdering." },
    { tag: "Parallel Actions", en: "While I was studying, my brother was playing games.", id: "Saat saya sedang belajar, adik saya sedang bermain game." },
    { tag: "Background Atmosphere", en: "The sun was shining and the birds were singing.", id: "Matahari bersinar dan burung-burung bernyanyi." },
    { tag: "Question", en: "What were you doing when the accident happened?", id: "Apa yang sedang kamu lakukan saat kecelakaan itu terjadi?" }
  ],
  5: [
    { tag: "Habit/Fact", en: "I work in a bank.", id: "Saya bekerja di bank." },
    { tag: "Happening Now", en: "I am working on a special project this week.", id: "Saya sedang mengerjakan proyek khusus minggu ini." },
    { tag: "Routine", en: "She usually drinks tea in the morning.", id: "Dia biasanya minum teh di pagi hari." },
    { tag: "Temporary Situation", en: "She is drinking coffee today because she is tired.", id: "Dia sedang minum kopi hari ini karena dia lelah." },
    { tag: "Stative Verb (No ING)", en: "I understand the concept completely.", id: "Saya memahami konsep itu sepenuhnya." }
  ],
  6: [
    { tag: "Interruption", en: "I was walking to school when I saw her.", id: "Saya sedang berjalan ke sekolah ketika saya melihatnya." },
    { tag: "Specific Time Progress", en: "At 10 AM, we were still driving.", id: "Pada jam 10 pagi, kami masih menyetir." },
    { tag: "Completed Action sequence", en: "He woke up, took a shower, and left.", id: "Dia bangun, mandi, dan pergi." },
    { tag: "While Clause", en: "While they were sleeping, somebody knocked on the door.", id: "Saat mereka sedang tidur, seseorang mengetuk pintu." },
    { tag: "When Clause", en: "When the lights went out, I was cooking dinner.", id: "Saat lampu mati, saya sedang memasak makan malam." }
  ],
  7: [
    { tag: "Future Continuous", en: "This time tomorrow, I will be flying to Paris.", id: "Besok di waktu yang sama, saya akan sedang terbang ke Paris." },
    { tag: "Definite Plan", en: "I am meeting the manager at 2 PM.", id: "Saya akan bertemu manajer jam 2 siang." },
    { tag: "Intention (Going to)", en: "We are going to buy a new car next month.", id: "Kami berencana membeli mobil baru bulan depan." },
    { tag: "Polite Inquiry", en: "Will you be using the computer later?", id: "Apakah kamu akan menggunakan komputer ini nanti?" },
    { tag: "Schedule (Simple Present)", en: "The train leaves at 8:00 AM tomorrow.", id: "Kereta berangkat jam 8:00 pagi besok." }
  ],
  8: [
    { tag: "Strong Obligation", en: "You must wear a seatbelt in the car.", id: "Kamu wajib memakai sabuk pengaman di dalam mobil." },
    { tag: "External Rule", en: "I have to arrive at work by 9 AM.", id: "Saya harus tiba di tempat kerja jam 9 pagi." },
    { tag: "Strong Advice", en: "You really should stop smoking.", id: "Kamu benar-benar harus berhenti merokok." },
    { tag: "No Obligation", en: "You don't have to wear a suit. Casual is fine.", id: "Kamu tidak perlu memakai jas. Santai saja tidak apa-apa." },
    { tag: "Prohibition", en: "You must not park here.", id: "Kamu dilarang parkir di sini." },
    { tag: "Mild Recommendation", en: "You ought to try that new restaurant.", id: "Kamu sebaiknya mencoba restoran baru itu." }
  ],
  9: [
    { tag: "First Conditional (Real)", en: "If it rains, we will cancel the picnic.", id: "Jika hujan, kami akan membatalkan piknik." },
    { tag: "First Conditional Promise", en: "I will call you if I finish early.", id: "Saya akan meneleponmu jika saya selesai lebih awal." },
    { tag: "Second Conditional (Unreal)", en: "If I won the lottery, I would buy a mansion.", id: "Jika saya memenangkan lotre, saya akan membeli rumah besar." },
    { tag: "Second Conditional Advice", en: "If I were you, I would apologize.", id: "Jika saya jadi kamu, saya akan minta maaf." },
    { tag: "Unless", en: "You will fail the exam unless you study.", id: "Kamu akan gagal ujian kecuali kamu belajar." }
  ],
  10: [
    { tag: "Present Passive", en: "The letters are delivered every morning.", id: "Surat-surat dikirim setiap pagi." },
    { tag: "Past Passive", en: "My car was stolen last night.", id: "Mobil saya dicuri tadi malam." },
    { tag: "Present Perfect Passive", en: "The room has been cleaned.", id: "Ruangan itu telah dibersihkan." },
    { tag: "Future Passive", en: "The report will be finished tomorrow.", id: "Laporan itu akan diselesaikan besok." },
    { tag: "Focus on Action", en: "The pyramids were built thousands of years ago.", id: "Piramida dibangun ribuan tahun yang lalu." }
  ],
  11: [
    { tag: "Defining (People)", en: "The man who called you is my brother.", id: "Pria yang meneleponmu tadi adalah saudaraku." },
    { tag: "Defining (Things)", en: "This is the book which everyone is reading.", id: "Ini adalah buku yang sedang dibaca semua orang." },
    { tag: "Defining (Places)", en: "That is the restaurant where we met.", id: "Itu adalah restoran tempat kita bertemu." },
    { tag: "Possession", en: "The girl whose dog ran away is crying.", id: "Gadis yang anjingnya kabur sedang menangis." },
    { tag: "Non-defining", en: "My father, who is 60, still runs marathons.", id: "Ayahku, yang berusia 60 tahun, masih berlari maraton." }
  ],
  12: [
    { tag: "Gerund after Preposition", en: "He is interested in learning French.", id: "Dia tertarik untuk belajar bahasa Prancis." },
    { tag: "Gerund Subject", en: "Reading is my favorite hobby.", id: "Membaca adalah hobi favorit saya." },
    { tag: "Infinitive of Purpose", en: "I went to the store to buy milk.", id: "Saya pergi ke toko untuk membeli susu." },
    { tag: "Remember + Gerund", en: "I remember locking the door.", id: "Saya ingat sudah mengunci pintu (memori masa lalu)." },
    { tag: "Remember + Infinitive", en: "Please remember to lock the door.", id: "Tolong ingat untuk mengunci pintu (tugas)." },
    { tag: "Stop + Gerund", en: "He stopped smoking last year.", id: "Dia berhenti merokok (berhenti total)." },
    { tag: "Stop + Infinitive", en: "He stopped to smoke a cigarette.", id: "Dia berhenti beraktivitas untuk merokok." }
  ],
  13: [
    { tag: "Specific Item", en: "Can you pass the salt, please?", id: "Tolong berikan garam itu (yang ada di meja)." },
    { tag: "General Concept (Zero Article)", en: "Apples are good for your health.", id: "Apel baik untuk kesehatanmu." },
    { tag: "Institution (Zero Article)", en: "He goes to church every Sunday.", id: "Dia pergi ke gereja setiap Minggu (sebagai umat)." },
    { tag: "Physical Building", en: "The workers went to the church to fix the roof.", id: "Pekerja pergi ke gereja (bangunan) untuk memperbaiki atap." },
    { tag: "Geographical Names", en: "The Amazon is the longest river in South America.", id: "Amazon adalah sungai terpanjang di Amerika Selatan." }
  ],
  14: [
    { tag: "Contrast", en: "Although it was raining, we went out.", id: "Meskipun sedang hujan, kami tetap keluar." },
    { tag: "Reason", en: "We stayed home because of the bad weather.", id: "Kami tinggal di rumah karena cuaca buruk." },
    { tag: "Addition", en: "Furthermore, the project will increase revenue.", id: "Selain itu, proyek ini akan meningkatkan pendapatan." },
    { tag: "Result", en: "He studied hard; therefore, he passed his exams.", id: "Dia belajar keras; oleh karena itu, dia lulus ujiannya." },
    { tag: "Alternative", en: "You can either stay here or come with us.", id: "Kamu bisa tetap di sini atau ikut dengan kami." },
    { tag: "Time", en: "As soon as she arrived, the meeting started.", id: "Segera setelah dia tiba, rapat dimulai." }
  ],
  15: [
    { tag: "Indirect Question", en: "Could you tell me where the station is?", id: "Bisakah Anda memberitahu saya di mana stasiunnya?" },
    { tag: "Tag Question (Pos)", en: "You are the new manager, aren't you?", id: "Anda adalah manajer baru, kan?" },
    { tag: "Tag Question (Neg)", en: "He didn't finish the report, did he?", id: "Dia belum menyelesaikan laporan, kan?" },
    { tag: "Subject Question", en: "Who broke the window?", id: "Siapa yang memecahkan jendela ini?" },
    { tag: "Preposition at End", en: "Who were you talking to?", id: "Kamu sedang berbicara dengan siapa?" }
  ],
  16: [
    { tag: "As...as", en: "This car is not as fast as that one.", id: "Mobil ini tidak secepat yang itu." },
    { tag: "Double Comparative", en: "The more you read, the more you know.", id: "Semakin banyak kamu membaca, semakin banyak yang kamu tahu." },
    { tag: "Progressive Change", en: "The weather is getting hotter and hotter.", id: "Cuacanya menjadi semakin panas." },
    { tag: "Far/Further", en: "Let's discuss this without any further delay.", id: "Mari kita diskusikan ini tanpa penundaan lebih lanjut." },
    { tag: "Modified Comparative", en: "She is much smarter than her brother.", id: "Dia jauh lebih pintar dari saudara laki-lakinya." }
  ],
  17: [
    { tag: "Both/Neither", en: "Neither of the options is acceptable.", id: "Tidak ada satu pun dari kedua opsi itu yang dapat diterima." },
    { tag: "All/None", en: "All the students passed, none of them failed.", id: "Semua siswa lulus, tidak ada satupun yang gagal." },
    { tag: "Few/A few", en: "I have a few friends here (positive).", id: "Saya punya beberapa teman di sini." },
    { tag: "Little vs A little", en: "There is little hope left (negative).", id: "Hanya tersisa sedikit harapan." },
    { tag: "A lot of / Lots of", en: "We have plenty of time.", id: "Kita punya banyak waktu." }
  ],
  18: [
    { tag: "-ED (Feeling)", en: "I was surprised by the news.", id: "Saya terkejut dengan berita itu." },
    { tag: "-ING (Cause)", en: "The news was surprising.", id: "Berita itu mengejutkan." },
    { tag: "Adjective Order", en: "He bought a beautiful big old wooden table.", id: "Dia membeli meja kayu tua besar yang indah." },
    { tag: "The + Adjective", en: "We must help the poor.", id: "Kita harus membantu orang miskin." },
    { tag: "Adjective as Noun", en: "The rich are getting richer.", id: "Orang kaya menjadi semakin kaya." }
  ],
  19: [
    { tag: "Its vs It's", en: "It's a nice day, and the dog is wagging its tail.", id: "Ini adalah hari yang menyenangkan, dan anjing itu mengibaskan ekornya." },
    { tag: "Your vs You're", en: "You're responsible for your own actions.", id: "Kamu bertanggung jawab atas tindakanmu sendiri." },
    { tag: "Advice vs Advise", en: "I advise you to listen to my advice.", id: "Saya menyarankan kamu untuk mendengarkan saran saya." },
    { tag: "Lose vs Loose", en: "Don't lose those loose pants.", id: "Jangan sampai kehilangan celana longgar itu." },
    { tag: "Affect vs Effect", en: "The bad weather will affect the mission's effect.", id: "Cuaca buruk akan berdampak pada hasil misi." }
  ],
  20: [
    { tag: "Mixed Tenses", en: "While I was driving home, it started to rain heavily.", id: "Saat saya sedang menyetir pulang, hujan mulai turun dengan deras." },
    { tag: "Conditionals", en: "If she hadn't helped me, I wouldn't have finished.", id: "Jika dia tidak membantuku, saya tidak akan selesai." },
    { tag: "Relative Clause", en: "The company, which was founded in 1990, went bankrupt.", id: "Perusahaan itu, yang didirikan pada tahun 1990, bangkrut." },
    { tag: "Passive Form", en: "The bridge has been completely rebuilt.", id: "Jembatan itu telah dibangun kembali seluruhnya." },
    { tag: "Gerunds", en: "Avoid driving during rush hour.", id: "Hindari menyetir selama jam sibuk." }
  ]
};

const UI_TEMPLATE = `
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-100">
                <h3 className="font-bold text-slate-800 flex items-center gap-2"><BookOpen className="w-5 h-5 text-indigo-500" /> Contoh Kalimat</h3>
                <p className="text-xs text-slate-500 mt-1">Dengar dan ulangi untuk berlatih.</p>
              </div>
              <div className="divide-y divide-slate-100">
                {GRAMMAR_EXAMPLES.map((item: any, idx: number) => (
                  <div key={idx} className="p-4 hover:bg-indigo-50 transition-colors flex items-center justify-between">
                    <div>
                      {(item.tag || item.type || item.category) && (
                        <span className="text-[10px] font-bold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100 mb-1 inline-block uppercase tracking-wide">
                          {item.tag || item.type || item.category}
                        </span>
                      )}
                      <p className="text-sm font-bold text-slate-800 mb-1">{item.en || item.word || item.phrase || item.sentence || item.example}</p>
                      {(item.id || item.meaning || item.translation) && (
                        <p className="text-xs text-slate-500 italic">{item.id || item.meaning || item.translation}</p>
                      )}
                    </div>
                    <button
                      onClick={() => playSound(item.en || item.word || item.phrase || item.sentence || item.example || '')}
                      className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-400 flex items-center justify-center hover:border-indigo-300 hover:text-indigo-600 transition-all shadow-sm flex-shrink-0"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>`;

const EMPTY_FALLBACK = `<div className="flex flex-col items-center justify-center p-8 text-center animate-fade-in"><BookOpen className="w-16 h-16 text-slate-200 mb-4 mx-auto" /><p className="text-[var(--color-text-secondary)] font-medium">Contoh kalimat belum tersedia.</p></div>`;

for (let i = 2; i <= 20; i++) {
  const file = path.join(__dirname, '../src/pages/module/english/intermediate/grammar/Lesson' + i + '.tsx');
  if (!fs.existsSync(file)) continue;

  let content = fs.readFileSync(file, 'utf8');
  if (!content.includes('const GRAMMAR_EXAMPLES =')) {
    // Insert array just before QUIZ_QUESTIONS
    let arrStr = `const GRAMMAR_EXAMPLES = ${JSON.stringify(EXAMPLES_BANK[i], null, 2)};\n\n`;
    content = content.replace('const QUIZ_QUESTIONS =', arrStr + 'const QUIZ_QUESTIONS =');
  }

  if (content.includes('Contoh kalimat belum tersedia.')) {
    content = content.replace(EMPTY_FALLBACK, UI_TEMPLATE);
  } else if (content.includes('<p className="text-[var(--color-text-secondary)] font-medium">Contoh belum tersedia.</p>')) {
     const OLD_FALLBACK = `<div className="flex flex-col items-center justify-center p-8 text-center animate-fade-in"><BookOpen className="w-16 h-16 text-slate-200 mb-4 mx-auto" /><p className="text-[var(--color-text-secondary)] font-medium">Contoh belum tersedia.</p></div>`;
     content = content.replace(OLD_FALLBACK, UI_TEMPLATE);
  }

  fs.writeFileSync(file, content, 'utf8');
  console.log('Processed Lesson ' + i);
}
