const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, '../src/pages/module/english/elementary/writing');

// 20 unique quiz questions per lesson, tailored to each topic
const ENHANCED_QUIZZES = {
  1: [
    { q: 'Susunan kalimat yang benar adalah...', opts: ['I like pizza.', 'Like I pizza.', 'Pizza I like.', 'Like pizza I.'], ans: 'I like pizza.', exp: 'Struktur: S (I) + V (like) + O (pizza).' },
    { q: 'Pilih to be yang benar untuk "She"', opts: ['am', 'are', 'is', 'be'], ans: 'is', exp: '"She" selalu dipasangkan dengan "is".' },
    { q: 'Kalimat mana yang tidak punya Subjek?', opts: ['They swim.', 'Runs fast.', 'He is tall.', 'We eat rice.'], ans: 'Runs fast.', exp: 'Kalimat harus memiliki Subjek.' },
    { q: 'Mana kalimat yang strukturnya salah?', opts: ['We play tennis.', 'She are a nurse.', 'I am tired.', 'They study math.'], ans: 'She are a nurse.', exp: 'Seharusnya "She is a nurse."' },
    { q: 'Terjemahan "Saya makan nasi" yang benar:', opts: ['I eat rice.', 'Eat I rice.', 'Rice I eat.', 'Me eat rice.'], ans: 'I eat rice.', exp: 'S (I) + V (eat) + O (rice).' },
    { q: '"He ___ a doctor." Isi yang benar:', opts: ['am', 'is', 'are', 'be'], ans: 'is', exp: 'He/She/It menggunakan "is".' },
    { q: '"We ___ students." Isi yang benar:', opts: ['am', 'is', 'are', 'was'], ans: 'are', exp: 'We/They/You menggunakan "are".' },
    { q: 'Kalimat yang menggunakan to be dengan benar:', opts: ['I are happy.', 'They is smart.', 'She is kind.', 'We am here.'], ans: 'She is kind.', exp: '"She" + "is" = benar.' },
    { q: '"They ___ football every Sunday."', opts: ['plays', 'play', 'playing', 'played'], ans: 'play', exp: '"They" menggunakan verb dasar tanpa -s.' },
    { q: 'Pilih kalimat S+V+O yang lengkap:', opts: ['Running fast.', 'She reads books.', 'Very happy.', 'In the park.'], ans: 'She reads books.', exp: 'S (She) + V (reads) + O (books).' },
    { q: '"I ___ a student." Isi yang benar:', opts: ['am', 'is', 'are', 'be'], ans: 'am', exp: '"I" menggunakan "am".' },
    { q: 'Mana yang benar?', opts: ['She have a cat.', 'She has a cat.', 'She having cat.', 'She haves a cat.'], ans: 'She has a cat.', exp: 'She/He/It menggunakan "has".' },
    { q: '"My parents ___ teachers."', opts: ['is', 'am', 'are', 'was'], ans: 'are', exp: '"Parents" = jamak, gunakan "are".' },
    { q: '"The cat ___ on the sofa."', opts: ['sit', 'sits', 'sitting', 'sitted'], ans: 'sits', exp: '"The cat" = singular, verb + s.' },
    { q: '"We ___ to school every day."', opts: ['goes', 'go', 'going', 'goed'], ans: 'go', exp: '"We" menggunakan verb dasar.' },
    { q: 'Terjemahan "Dia laki-laki pintar":',  opts: ['He is a smart boy.', 'Smart he is boy.', 'Boy smart he is.', 'He smart is boy.'], ans: 'He is a smart boy.', exp: 'S + is + a + adj + noun.' },
    { q: '"It ___ cold outside."', opts: ['am', 'is', 'are', 'be'], ans: 'is', exp: '"It" menggunakan "is".' },
    { q: '"You ___ very kind."', opts: ['am', 'is', 'are', 'was'], ans: 'are', exp: '"You" selalu menggunakan "are".' },
    { q: 'Kalimat negatif yang benar:', opts: ['She do not like math.', 'She does not like math.', 'She not likes math.', 'She no like math.'], ans: 'She does not like math.', exp: '"She" + "does not" + verb dasar.' },
    { q: '"___ they your friends?"', opts: ['Am', 'Is', 'Are', 'Was'], ans: 'Are', exp: '"They" menggunakan "Are" untuk pertanyaan.' }
  ],
  2: [
    { q: 'Pesan informal ke teman yang paling tepat:', opts: ['I await your arrival.', 'See you at 5!', 'Please arrive promptly.', 'Your presence is requested.'], ans: 'See you at 5!', exp: '"See you at 5!" adalah sapaan kasual.' },
    { q: 'Cara memberi tahu kamu telat:', opts: ['I am late 5 mins.', 'I will be 5 minutes late.', 'Late me 5 minutes.', '5 minutes I am late.'], ans: 'I will be 5 minutes late.', exp: '"I will be [time] late" yang lazim.' },
    { q: '"Wait ___ me at the station."', opts: ['to', 'for', 'at', 'on'], ans: 'for', exp: '"Wait for" adalah frasa yang benar.' },
    { q: 'Pesan mana yang paling jelas?', opts: ['Coming.', 'I am on my way. 10 minutes.', 'Later.', 'Soon.'], ans: 'I am on my way. 10 minutes.', exp: 'Pesan jelas berisi detail waktu.' },
    { q: '"Can you ___ the door?"', opts: ['opening', 'opens', 'open', 'opened'], ans: 'open', exp: 'Setelah "can", verb dasar.' },
    { q: 'Pesan sopan membatalkan janji:', opts: ['Not coming.', 'Sorry, I can\\\'t make it today.', 'No.', 'Cancel.'], ans: 'Sorry, I can\\\'t make it today.', exp: 'Tambahkan "sorry" dan alasan.' },
    { q: '"Let\\\'s ___ lunch together."', opts: ['has', 'have', 'having', 'had'], ans: 'have', exp: '"Let\\\'s" + verb dasar.' },
    { q: 'Ajakan teman yang tepat:', opts: ['Do you want to go to the mall?', 'Mall you go?', 'Going mall?', 'Want mall?'], ans: 'Do you want to go to the mall?', exp: 'Kalimat lengkap dengan "Do you want to..."' },
    { q: '"I ___ at the coffee shop now."', opts: ['am', 'is', 'are', 'be'], ans: 'am', exp: '"I" menggunakan "am".' },
    { q: 'Cara mengakhiri pesan kasual:', opts: ['Yours sincerely,', 'See you later!', 'Best regards,', 'Respectfully,'], ans: 'See you later!', exp: 'Pesan kasual diakhiri santai.' },
    { q: '"Don\\\'t ___ to bring your book."', opts: ['forgot', 'forget', 'forgetting', 'forgets'], ans: 'forget', exp: '"Don\\\'t forget" = jangan lupa.' },
    { q: '"I will ___ you at the park."', opts: ['meeting', 'met', 'meet', 'meets'], ans: 'meet', exp: '"Will" + verb dasar.' },
    { q: '"Are you ___ tomorrow?"', opts: ['freely', 'free', 'freed', 'freeing'], ans: 'free', exp: 'Adjective setelah to be.' },
    { q: '"Please ___ me a message."', opts: ['sending', 'sent', 'send', 'sends'], ans: 'send', exp: 'Imperatif = verb dasar.' },
    { q: '"We ___ meeting at 3 PM."', opts: ['is', 'am', 'are', 'was'], ans: 'are', exp: '"We are" + v-ing.' },
    { q: '"She said she ___ come."', opts: ['will', 'is', 'am', 'are'], ans: 'will', exp: '"Will come" = akan datang.' },
    { q: '"I need to ___ something first."', opts: ['doing', 'did', 'do', 'does'], ans: 'do', exp: '"Need to" + verb dasar.' },
    { q: '"Can you ___ me a favor?"', opts: ['doing', 'did', 'do', 'does'], ans: 'do', exp: '"Do me a favor" = tolong bantuan.' },
    { q: '"Let me ___ about it."', opts: ['thinks', 'thought', 'think', 'thinking'], ans: 'think', exp: '"Let me" + verb dasar.' },
    { q: '"Text me ___ you get there."', opts: ['where', 'when', 'what', 'why'], ans: 'when', exp: '"When" = pada saat.' }
  ],
  3: [
    { q: 'Kalimat menunjukkan kedaruratan:', opts: ['I like ice cream.', 'Call me immediately!', 'See you tomorrow.', 'Nice day.'], ans: 'Call me immediately!', exp: '"Immediately" = segera.' },
    { q: '"___ is an emergency."', opts: ['He', 'It', 'They', 'We'], ans: 'It', exp: '"It" untuk merujuk situasi.' },
    { q: 'ASAP artinya:', opts: ['After School And Play', 'As Soon As Possible', 'Always Stay And Pray', 'Any Service At Price'], ans: 'As Soon As Possible', exp: 'ASAP = As Soon As Possible.' },
    { q: '"I cannot come ___ I am sick."', opts: ['because', 'but', 'so', 'and'], ans: 'because', exp: '"Because" memberikan alasan.' },
    { q: 'Catatan darurat yang baik harus berisi:', opts: ['Masalah + Aksi yang diminta', 'Hanya nama', 'Cerita panjang', 'Emoji saja'], ans: 'Masalah + Aksi yang diminta', exp: 'Harus jelas dan actionable.' },
    { q: '"Please ___ the doctor."', opts: ['calling', 'called', 'call', 'calls'], ans: 'call', exp: 'Imperatif = verb dasar.' },
    { q: '"I am ___ well today."', opts: ['no', 'not', 'none', 'nothing'], ans: 'not', exp: '"Not" untuk negasi setelah to be.' },
    { q: '"Don\\\'t forget ___ lock the door."', opts: ['to', 'for', 'at', 'in'], ans: 'to', exp: '"Don\\\'t forget to" + verb.' },
    { q: 'Catatan paling informatif:', opts: ['I left.', 'Gone.', 'Mom, went to clinic. Back at 5 PM.', 'Bye.'], ans: 'Mom, went to clinic. Back at 5 PM.', exp: 'Berisi tujuan dan perkiraan waktu.' },
    { q: '"There ___ an accident on the road."', opts: ['is', 'are', 'am', 'be'], ans: 'is', exp: '"There is" untuk singular noun.' },
    { q: '"Please call me ___ soon as possible."', opts: ['so', 'as', 'very', 'too'], ans: 'as', exp: '"As soon as possible" = ASAP.' },
    { q: '"I ___ to leave quickly."', opts: ['needs', 'need', 'needing', 'needed'], ans: 'need', exp: '"I need to" = saya perlu.' },
    { q: '"It is very ___!"', opts: ['urgently', 'urgent', 'urgency', 'urge'], ans: 'urgent', exp: 'Adjective setelah to be.' },
    { q: '"___ worry about me."', opts: ['Do', 'Don\\\'t', 'Doesn\\\'t', 'Didn\\\'t'], ans: 'Don\\\'t', exp: '"Don\\\'t worry" = jangan khawatir.' },
    { q: '"I will ___ home soon."', opts: ['comes', 'coming', 'come', 'came'], ans: 'come', exp: '"Will" + verb dasar.' },
    { q: '"Take ___ of yourself."', opts: ['caring', 'cared', 'care', 'cares'], ans: 'care', exp: '"Take care" = jaga diri.' },
    { q: '"Something bad ___ happened."', opts: ['have', 'has', 'having', 'had'], ans: 'has', exp: '"Something" = singular.' },
    { q: '"I feel very ___."', opts: ['sickly', 'sick', 'sicker', 'sicks'], ans: 'sick', exp: 'Adjective setelah "feel".' },
    { q: '"Call the ambulance ___!"', opts: ['quick', 'quickly', 'quicker', 'quickest'], ans: 'quickly', exp: 'Adverb memodifikasi verb.' },
    { q: '"Help! I ___ my way."', opts: ['lose', 'lost', 'losing', 'loses'], ans: 'lost', exp: 'Past tense untuk situasi saat ini.' }
  ],
  4: [
    { q: 'Salam pembuka email profesional:', opts: ['Hey John!', 'Dear Mr. Smith,', 'What is up bro', 'Yo Smith'], ans: 'Dear Mr. Smith,', exp: '"Dear" + nama keluarga.' },
    { q: 'Penutup email formal:', opts: ['Bye bye!', 'See ya!', 'Best regards,', 'XOXO'], ans: 'Best regards,', exp: '"Best regards" untuk formal.' },
    { q: '"I ___ writing to ask about the class."', opts: ['is', 'am', 'are', 'be'], ans: 'am', exp: '"I am writing..." = opening email umum.' },
    { q: 'Subject email yang baik:', opts: ['(kosong)', 'Hai', 'Request for Meeting - March 5', 'aaa'], ans: 'Request for Meeting - March 5', exp: 'Subject harus jelas dan spesifik.' },
    { q: '"Could you please ___ me the file?"', opts: ['sending', 'sent', 'send', 'sends'], ans: 'send', exp: 'Setelah "please", verb dasar.' },
    { q: 'Kalimat cocok di badan email:', opts: ['Gimana kabar?', 'Oi', 'I hope this email finds you well.', 'Yo bro'], ans: 'I hope this email finds you well.', exp: 'Frasa formal pembuka email.' },
    { q: '"Thank you ___ your reply."', opts: ['to', 'for', 'at', 'in'], ans: 'for', exp: '"Thank you for" + noun.' },
    { q: '"I look forward ___ hearing from you."', opts: ['at', 'for', 'in', 'to'], ans: 'to', exp: '"Look forward to" + noun/v-ing.' },
    { q: '"Please find the document ___."', opts: ['attaching', 'attached', 'attach', 'attaches'], ans: 'attached', exp: '"Attached" = sudah dilampirkan.' },
    { q: 'Urutan email yang benar:', opts: ['Penutup > Isi > Salam', 'Salam > Isi > Penutup', 'Isi > Salam > Penutup', 'Penutup > Salam > Isi'], ans: 'Salam > Isi > Penutup', exp: 'Salam, lalu isi, lalu penutup.' },
    { q: '"I would like to ___ a meeting."', opts: ['scheduling', 'schedule', 'scheduled', 'schedules'], ans: 'schedule', exp: '"Would like to" + verb dasar.' },
    { q: '"Kindly ___ me know."', opts: ['lets', 'letting', 'let', 'letted'], ans: 'let', exp: '"Kindly let" = tolong beritahu.' },
    { q: '"I apologize ___ the inconvenience."', opts: ['to', 'for', 'at', 'in'], ans: 'for', exp: '"Apologize for" + noun.' },
    { q: '"CC" di email artinya:', opts: ['Carbon Copy', 'Central Computer', 'Close Case', 'Cancel Contact'], ans: 'Carbon Copy', exp: 'CC = salinan email ke orang lain.' },
    { q: '"I will get ___ to you soon."', opts: ['up', 'back', 'down', 'in'], ans: 'back', exp: '"Get back to" = membalas.' },
    { q: '"Please ___ this email to your team."', opts: ['forwarding', 'forwarded', 'forward', 'forwards'], ans: 'forward', exp: 'Imperatif = verb dasar.' },
    { q: '"I am ___ to inform you that..."', opts: ['writing', 'write', 'wrote', 'written'], ans: 'writing', exp: '"Am writing" = present continuous.' },
    { q: '"As ___ in my previous email..."', opts: ['mention', 'mentioned', 'mentioning', 'mentions'], ans: 'mentioned', exp: '"As mentioned" = seperti yang disebutkan.' },
    { q: '"Regarding" artinya:', opts: ['Tentang', 'Terhadap', 'Bersama', 'Oleh'], ans: 'Tentang', exp: '"Regarding" = mengenai/tentang.' },
    { q: '"I ___ to hear from you soon."', opts: ['hopes', 'hope', 'hoping', 'hoped'], ans: 'hope', exp: '"I hope" = simple present.' }
  ],
  5: [
    { q: 'Cara bilang terima kasih untuk bantuan:', opts: ['Thanks to help me.', 'Thank you for your help.', 'Thanks your help.', 'Thank your help to me.'], ans: 'Thank you for your help.', exp: '"Thank you for" + noun/v-ing.' },
    { q: '"Thank you for ___ me."', opts: ['help', 'helps', 'helping', 'helped'], ans: 'helping', exp: 'Setelah "for", gunakan v-ing.' },
    { q: 'Ucapan terima kasih paling spesifik:', opts: ['Thanks.', 'Thank you for the blue scarf!', 'Thanks a lot.', 'Yeah thanks.'], ans: 'Thank you for the blue scarf!', exp: 'Sebutkan item spesifik.' },
    { q: '"I really ___ the birthday present."', opts: ['appreciation', 'appreciating', 'appreciate', 'appreciated'], ans: 'appreciate', exp: 'Simple present untuk perasaan saat ini.' },
    { q: '"You ___ so kind to visit me."', opts: ['is', 'am', 'are', 'was'], ans: 'are', exp: '"You" = "are".' },
    { q: 'Penutup surat yang tepat:', opts: ['OK bye.', 'With love, Ana.', 'Whatever.', 'End.'], ans: 'With love, Ana.', exp: '"With love" untuk surat pribadi.' },
    { q: '"It ___ my day!"', opts: ['make', 'made', 'makes', 'making'], ans: 'made', exp: '"Made" (past) karena sudah terjadi.' },
    { q: '"I was ___ to receive your gift."', opts: ['happy', 'happily', 'happiness', 'happier'], ans: 'happy', exp: 'Adjective setelah to be.' },
    { q: '"The cake you ___ was delicious."', opts: ['bake', 'baked', 'baking', 'bakes'], ans: 'baked', exp: 'Past tense karena sudah dibuat.' },
    { q: '"I can\\\'t ___ to use it!"', opts: ['waiting', 'waited', 'waits', 'wait'], ans: 'wait', exp: '"Can\\\'t wait" = sangat menantikan.' },
    { q: '"I am so ___ for your support."', opts: ['gratefully', 'grateful', 'gratefulness', 'grate'], ans: 'grateful', exp: 'Adjective setelah "so".' },
    { q: '"That was very ___ of you."', opts: ['thought', 'thoughtful', 'thoughtfully', 'think'], ans: 'thoughtful', exp: '"Thoughtful" = penuh perhatian.' },
    { q: '"You always ___ me smile."', opts: ['makes', 'make', 'making', 'made'], ans: 'make', exp: '"You make" (present habitual).' },
    { q: '"I ___ blessed to have you."', opts: ['am', 'is', 'are', 'was'], ans: 'am', exp: '"I am" + adjective.' },
    { q: '"Words ___ express how grateful I am."', opts: ['can', 'cannot', 'doesn\\\'t', 'isn\\\'t'], ans: 'cannot', exp: '"Cannot express" = tak bisa ungkapkan.' },
    { q: '"Your gift was ___!"', opts: ['perfectly', 'perfect', 'perfection', 'perfects'], ans: 'perfect', exp: 'Adjective setelah "was".' },
    { q: '"I will ___ forget your kindness."', opts: ['ever', 'never', 'always', 'sometimes'], ans: 'never', exp: '"Will never forget" = takkan pernah lupa.' },
    { q: '"Please ___ my thanks to your family."', opts: ['passing', 'passed', 'pass', 'passes'], ans: 'pass', exp: '"Please pass" = tolong sampaikan.' },
    { q: '"You ___ the best friend ever!"', opts: ['is', 'am', 'are', 'was'], ans: 'are', exp: '"You are" = kamu adalah.' },
    { q: '"I ___ so lucky to know you."', opts: ['am', 'is', 'are', 'be'], ans: 'am', exp: '"I am" untuk diri sendiri.' }
  ]
};

// For lessons 6-15, generate 20 questions by expanding the existing templates
// The lessons 6-15 already have adequate templates that just need the {v} stripping

// Read each lesson file and replace the QUIZ array if we have enhanced data
Object.entries(ENHANCED_QUIZZES).forEach(([lessonId, quiz]) => {
  const filePath = path.join(DIR, `Lesson${lessonId}.tsx`);
  if (!fs.existsSync(filePath)) {
    console.log(`Lesson${lessonId}.tsx not found, skipping.`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  
  // Find and replace the QUIZ array
  const quizStart = content.indexOf('const QUIZ = [');
  const quizEnd = content.indexOf('];\n', quizStart);
  
  if (quizStart === -1 || quizEnd === -1) {
    console.log(`Could not find QUIZ array in Lesson${lessonId}.tsx`);
    return;
  }
  
  const quizString = JSON.stringify(quiz, null, 2)
    .replace(/"([^"]+)":/g, '$1:'); // Remove quotes from keys
  
  const newContent = content.substring(0, quizStart) + 
    'const QUIZ = ' + quizString + 
    content.substring(quizEnd + 1);
  
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`Enhanced Lesson ${lessonId} with ${quiz.length} unique quiz questions.`);
});

console.log('\nDone! Lessons 1-5 enhanced with 20 unique questions each.');
console.log('Lessons 6-15 quiz templates are already expanded by the generator.');
