// build-writing-enhanced.cjs
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '../src/pages/module/english/intermediate/writing');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

// Bank Soal
const MECHANICS_BANK = [
  { q: 'Which cohesive device BEST shows CONTRAST?', opts: ['Consequently', 'Nevertheless', 'Furthermore', 'Similarly'], ans: 'Nevertheless', exp: '"Nevertheless" setara dengan "However" atau "Despite that", digunakan untuk menunjukkan kontras yang kuat.' },
  { q: 'How would you combine these sentences with a relative clause? "The man called the police. His car was stolen."', opts: ['The man called the police whose car was stolen.', 'The man whose car was stolen called the police.', 'The man whom car was stolen called the police.', 'The man whom called the police had his car stolen.'], ans: 'The man whose car was stolen called the police.', exp: '"Whose" digunakan untuk kepemilikan. Klausul relative disematkan langsung setelah "The man".' },
  { q: 'Which is correctly punctuated?', opts: ['Although, it was raining we went out.', 'Although it was raining, we went out.', 'Although it was raining we went out,', 'Although, it was raining, we went out.'], ans: 'Although it was raining, we went out.', exp: 'Jika kalimat dimulai dengan konjungsi subordinatif (Although), gunakan koma sebelum klausa utama.' },
  { q: 'Choose the most FORMAL word to replace "but":', opts: ['However', 'Also', 'So', 'And'], ans: 'However', exp: '"However" adalah transisi formal yang sangat baik untuk menggantikan "but" di awal kalimat.' },
  { q: 'What is the function of "therefore"?', opts: ['To add a point', 'To show a difference', 'To show a result or consequence', 'To give an example'], ans: 'To show a result or consequence', exp: '"Therefore" berarti "oleh karena itu", digunakan untuk menunjukkan akibat dari kalimat sebelumnya.' },
  { q: 'Identify the error: "I look forward to hear from you soon."', opts: ['look forward', 'to hear', 'from you', 'soon'], ans: 'to hear', exp: 'Aturan baku: "look forward to" selalu diikuti oleh Gerund (V-ing), sehingga seharusnya "to hearing".' },
  { q: 'Which sentence uses the PASSIVE voice correctly?', opts: ['The report was finished by Anna yesterday.', 'The report finished Anna yesterday.', 'Anna was finished the report yesterday.', 'The report was finish by Anna.'], ans: 'The report was finished by Anna yesterday.', exp: 'Pasif: Subject (The report) + to be (was) + Past Participle (finished).' },
  { q: 'Choose the correct preposition: "I am writing to complain ___ the poor service."', opts: ['about', 'for', 'to', 'with'], ans: 'about', exp: 'Kata kerja "complain" diikuti oleh preposisi "about" untuk menunjukkan hal yang dikeluhkan.' },
  { q: 'Which phrase is best for SUMMARISING an essay?', opts: ['First of all', 'In contrast', 'To conclude', 'For instance'], ans: 'To conclude', exp: '"To conclude" (atau In conclusion) secara spesifik digunakan di paragraf terakhir untuk merangkum tulisan.' },
  { q: 'What is a "Topic Sentence"?', opts: ['The last sentence of a text', 'A sentence that explains the main idea of a paragraph', 'A famous quote', 'The title of an essay'], ans: 'A sentence that explains the main idea of a paragraph', exp: 'Topic sentence (kalimat utama) memberi tahu pembaca apa gagasan pokok dari paragraf tersebut.' },
  { q: 'Which sentence adds INFORMATION?', opts: ['Moreover, the city has excellent public transport.', 'Despite this, the city is loud.', 'Therefore, we left early.', 'As a result, prices increased.'], ans: 'Moreover, the city has excellent public transport.', exp: '"Moreover" (lebih lanjut lagi) digunakan untuk memberikan informasi tambahan yang mendukung argumen.' },
  { q: 'How do you make this formal? "Send me the files ASAP."', opts: ['Please dispatch the files really quick.', 'I require the files immediately.', 'Please send the documents at your earliest convenience.', 'Shoot the documents to me.'], ans: 'Please send the documents at your earliest convenience.', exp: '"At your earliest convenience" adalah frasa kesopanan baku dalam korespondensi bisnis/formal.' },
  { q: 'Choose the correct form: "If I ___ more time, I would check the document again."', opts: ['have', 'had', 'have had', 'having'], ans: 'had', exp: 'Ini adalah Conditional Type 2 (unreal present): If + Past Simple (had), Subject + would + V1.' },
  { q: 'Which word means "in addition"?', opts: ['However', 'Instead', 'Furthermore', 'Whereas'], ans: 'Furthermore', exp: '"Furthermore" adalah adverb formal yang fungsinya menambah argumen atau informasi.' },
  { q: 'Choose the correct contrast linker: "___ the bad weather, the event was a success."', opts: ['Although', 'Despite', 'However', 'Because'], ans: 'Despite', exp: '"Despite" diikuti langsung oleh frasa kata benda (the bad weather), bukan klausa bersubjek-predikat.' },
  { q: 'Identify the spelling error in this formal text: "The goverment should take action immediately."', opts: ['immediately', 'action', 'goverment', 'should'], ans: 'goverment', exp: 'Ejaan yang benar adalah "governMENT" (ada huruf n yang sering terlupa).' },
  { q: 'Which sentence is an opinion, not a fact?', opts: ['Water boils at 100 degrees.', 'The population of Tokyo is huge.', 'Pineapples are the most delicious fruit.', 'Paris is the capital of France.'], ans: 'Pineapples are the most delicious fruit.', exp: '"The most delicious" adalah penilaian subjektif atau opini.' },
  { q: 'In writing, what does "proofreading" mean?', opts: ['Writing the first draft wildly', 'Finding academic sources', 'Carefully checking for grammatical and spelling errors', 'Outlining paragraphs'], ans: 'Carefully checking for grammatical and spelling errors', exp: 'Proofreading adalah tahapan akhir untuk membaca ulang dan memperbaiki kesalahan minor.' },
  { q: '"On the one hand... ___". What finishes this paired conjunction?', opts: ['On the second hand...', 'On the other side...', 'On the other hand...', 'However...'], ans: 'On the other hand...', exp: 'Pasangan frasa idiomatis ini selalu "On the one hand... On the other hand..." untuk membandingkan dua sisi.' },
  { q: 'Which choice correctly joins these: "It was late. I kept writing."', opts: ['It was late so I kept writing.', 'Although it was late, I kept writing.', 'Because it was late, I kept writing.', 'It was late, therefore I kept writing.'], ans: 'Although it was late, I kept writing.', exp: 'Konteks kalimat menunjukkan kontras (sudah malam tapi tetap nulis), jadi "Although" adalah yang paling masuk akal.' },
  { q: 'Which phrase is most appropriate for a formal email greeting?', opts: ['Hi mate,', 'Hey there,', 'Dear Mr. Smith,', 'What’s up Smith,'], ans: 'Dear Mr. Smith,', exp: 'Dalam email formal, sapaan standar adalah "Dear [Title] [Last Name],".' },
  { q: 'Select the correct preposition: "I apologise ___ the delay."', opts: ['for', 'from', 'with', 'about'], ans: 'for', exp: '"Apologise" selalu diikut oleh "for" ketika merujuk pada alasan (apologise for something).' },
  { q: 'What is the function of "For instance"?', opts: ['To contrast', 'To conclude', 'To provide an example', 'To show cause'], ans: 'To provide an example', exp: '"For instance" adalah variasi formal dari "For example" pada level B1/B2.' },
  { q: 'Which word modifies a verb strongly?', opts: ['Beautiful', 'Quick', 'Significantly', 'Happy'], ans: 'Significantly', exp: '"Significantly" adalah adverb (kata keterangan) yang memodifikasi/menjelaskan verb.' },
  { q: 'Identify the compound adjective: "She bought a ___ car."', opts: ['very fast', 'brand-new', 'beautifully', 'red'], ans: 'brand-new', exp: '"Brand-new" adalah adjective gabungan (compound adjective) yang dihubungkan dengan hyphen.' },
  { q: 'Choose the correct structure: "Not only ___ fast, but she is also strong."', opts: ['she runs', 'runs she', 'is she running', 'does she run'], ans: 'does she run', exp: 'Struktur Inversion: Saat kalimat diawali "Not only", dilanjutkan dengan auxiliary + subjek (does she run).' },
  { q: 'Which option is less formal? "Commence"', opts: ['Begin', 'Terminate', 'Execute', 'Finalize'], ans: 'Begin', exp: '"Commence" adalah bentuk sangat formal untuk kata "begin" atau "start".' },
  { q: 'What is the purpose of a thesis statement in an essay?', opts: ['To greet the reader', 'To state the main argument or focus of the essay', 'To ask a rhetorical question', 'To give a dictionary definition'], ans: 'To state the main argument or focus of the essay', exp: 'Thesis statement berada di paragraf pertama untuk menjabarkan argumen/titik berat esai.' },
  { q: 'Choose the sentence with correct parallel structure:', opts: ['I like swimming, to read, and hike.', 'I like to swim, reading, and to hike.', 'I like swimming, reading, and hiking.', 'I like swim, read, and hike.'], ans: 'I like swimming, reading, and hiking.', exp: 'Struktur paralel mengharuskan semua elemen dalam daftar memiliki bentuk gramatikal yang sama (V-ing, V-ing, V-ing).' },
  { q: '"Due to" is primarily used to indicate...', opts: ['Addition', 'Time', 'Cause or Reason', 'Condition'], ans: 'Cause or Reason', exp: '"Due to" (= because of) digunakan untuk menunjukkan alasan/penyebab dari sesuatu.' }
];

function getMechanicsQuestions(seed) {
  let deck = [...MECHANICS_BANK];
  let rng = seed * 16807;
  for (let i = deck.length - 1; i > 0; i--) {
    rng = (rng * 16807) % 2147483647;
    let j = rng % (i + 1);
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck.slice(0, 15);
}

const DETAILED_LESSONS = [
  {
    id: 1, title: 'My Hometown', subtitle: 'Descriptive Writing', topic: 'hometown', heroEmoji: '🏙️',
    heroDesc: 'Belajar menulis paragraf deskriptif menggunakan detail sensorik dan struktur topik yang kuat.',
    sample: `I come from Bandung, a bustling city in West Java, Indonesia. Also known as the "Paris of Java", Bandung is famous for its cool climate, lush green landscapes, and historical architecture. The city lies in a river basin entirely surrounded by volcanic mountains, providing spectacular panoramic views.\n\nOne of the most defining aspects of Bandung is its vibrant culinary and fashion scene. The streets of Dago and Riau are lined with trendy cafes, traditional food stalls selling 'siomay' and 'surabi', and massive factory outlets. During the weekends, thousands of tourists flock to the city to experience this unique blend of modern lifestyle and traditional Sundanese culture.\n\nDespite the heavy traffic congestion during holidays, the people of Bandung remain incredibly warm and welcoming. There is a strong sense of community and creativity here. From indie music festivals to local art galleries, the city pulses with creative energy. I am immensely proud of my hometown because it manages to balance rapid development with its beautiful natural heritage.`,
    comprehension: [
      { q: 'Why is Bandung called the "Paris of Java"?', opts: ['Because it is in France', 'Due to its cool climate and historical architecture', 'Because it is extremely hot', 'Because of its traffic'], ans: 'Due to its cool climate and historical architecture' },
      { q: 'What is mentioned as a geographical feature of Bandung?', opts: ['A large ocean', 'A huge desert', 'Surrounded by volcanic mountains', 'A flat prairie'], ans: 'Surrounded by volcanic mountains' },
      { q: 'What can tourists find along Dago and Riau streets?', opts: ['Government offices', 'Trendy cafes and factory outlets', 'Farms and barns', 'Schools and universities'], ans: 'Trendy cafes and factory outlets' },
      { q: 'What negative aspect of Bandung is mentioned in the text?', opts: ['Poor food quality', 'Heavy traffic congestion', 'Unfriendly people', 'Lack of art galleries'], ans: 'Heavy traffic congestion' },
      { q: 'How does the writer feel about their hometown?', opts: ['Indifferent', 'Ashamed', 'Disappointed', 'Immensely proud'], ans: 'Immensely proud' }
    ],
    specificQuiz: [
      { q: 'What is the function of the FIRST sentence in paragraph two?', opts: ['To conclude the essay', 'To introduce the main topic of that paragraph (culinary & fashion)', 'To ask a question', 'To provide a specific example'], ans: 'To introduce the main topic of that paragraph (culinary & fashion)', exp: 'It serves as the topic sentence for the second paragraph.' },
      { q: 'In the text, what does the phrase "flock to the city" mean?', opts: ['To leave a place', 'To gather or travel in large numbers', 'To fly like birds', 'To complain loudly'], ans: 'To gather or travel in large numbers', exp: '"Flock" means people travel there in large groups.' },
      { q: 'Which cohesive device is used to contrast traffic with people\'s warmth?', opts: ['Also', 'Despite', 'Because', 'Furthermore'], ans: 'Despite', exp: '"Despite the heavy traffic... people remain warm" contrasts a negative with a positive.' },
      { q: 'Identify the adjective used to describe the mountains:', opts: ['Trendy', 'Volcanic', 'Traditional', 'Vibrant'], ans: 'Volcanic', exp: 'The text specifically mentions "volcanic mountains".' },
      { q: 'What happens to the structure of the last paragraph?', opts: ['It only talks about food', 'It summarizes personal feelings and closes the text logically', 'It introduces a totally new city', 'It ends without a clear point'], ans: 'It summarizes personal feelings and closes the text logically', exp: 'The conclusion shares feelings ("proud") and summarizes the balance of the city.' }
    ]
  },
  {
    id: 2, title: 'Personal Email', subtitle: 'Informal Interaction', topic: 'personal communication', heroEmoji: '✉️',
    heroDesc: 'Menulis surat pribadi dengan nada santai, kontraksi, dan ungkapan emosional.',
    sample: `Subject: Guess who's back in town!\n\nHi Sarah,\n\nHow have you been? I hope everything is going great with your new job. It feels like ages since we last caught up over coffee.\n\nI’m writing to let you know that I’ve just moved back to Jakarta after finishing my master’s degree in Melbourne! The graduation ceremony was absolutely exhausting but totally worth it. Now that I’m back, I have so much free time before I start looking for full-time work, and I really want to hear all about your recent promotion.\n\nAre you free this weekend? We should definitely go to that new Italian restaurant you were raving about on Instagram. Let me know what day works best for you. I can drive us there since I just got my car fixed.\n\nCan’t wait to see you soon!\n\nWarmly,\nDavid`,
    comprehension: [
      { q: 'What is the purpose of this email?', opts: ['To apply for a job', 'To complain about a restaurant', 'To inform a friend about moving back and arranging to meet', 'To send an invoice'], ans: 'To inform a friend about moving back and arranging to meet' },
      { q: 'Where did David just return from?', opts: ['Jakarta', 'Italy', 'Melbourne', 'London'], ans: 'Melbourne' },
      { q: 'Why does David have free time right now?', opts: ['He was fired', 'He is waiting to start looking for work after graduation', 'He is on holiday', 'He works part-time'], ans: 'He is waiting to start looking for work after graduation' },
      { q: 'What type of food are they planning to eat?', opts: ['Indonesian', 'Japanese', 'Italian', 'Mexican'], ans: 'Italian' },
      { q: 'How will they get to the restaurant?', opts: ['David will drive', 'Sarah will drive', 'They will take a taxi', 'They will walk'], ans: 'David will drive' }
    ],
    specificQuiz: [
      { q: 'Which greeting is highly informal and typical for a friend?', opts: ['Dear Madam,', 'To Whom It May Concern,', 'Hi Sarah,', 'Dear Ms. Sarah,'], ans: 'Hi Sarah,', exp: '"Hi" followed by a first name is the standard informal greeting.' },
      { q: 'What does the phrase "caught up" mean contextually?', opts: ['To run fast', 'To talk and update each other on life', 'To catch a ball', 'To get a virus'], ans: 'To talk and update each other on life', exp: '"Catch up" is an informal phrasal verb meaning to exchange news.' },
      { q: 'Identify the contraction used in the text that makes it informal:', opts: ['I am', 'Absolutely', 'I\'ve', 'Ceremony'], ans: 'I\'ve', exp: 'Contractions like "I\'ve" (I have) are hallmarks of informal/personal writing.' },
      { q: 'What is the function of the question "How have you been?"', opts: ['Rhetorical social greeting showing care', 'A strict medical inquiry', 'A test of grammar', 'To end the letter'], ans: 'Rhetorical social greeting showing care', exp: 'It is a friendly opening to establish a warm tone.' },
      { q: 'Choose the most appropriate informal sign-off used here.', opts: ['Yours faithfully,', 'Warmly,', 'Best regards,', 'Sincerely,'], ans: 'Warmly,', exp: 'Warmly, Best, or Cheers are appropriate for personal letters.' }
    ]
  },
  {
    id: 3, title: 'My Daily Routine', subtitle: 'Chronological Narrative', topic: 'daily routines', heroEmoji: '🌅',
    heroDesc: 'Menggunakan *time sequence markers* untuk menceritakan aktivitas sehari-hari secara rasional.',
    sample: `My weekdays typically follow a very structured routine. I am an early riser, so my alarm goes off at 5:30 AM every morning. First, I drink a large glass of water and do a quick 20-minute yoga session to stretch my body. Afterwards, I take a shower and prepare a healthy breakfast, which usually consists of oatmeal and a fresh banana.\n\nBy 7:00 AM, I am out the door. My office is located in the city center, so the commute takes roughly 45 minutes on the commuter train. During the ride, I like to listen to educational podcasts to make the most of my travel time. My workday officially begins at 8:00 AM and is usually filled with meetings, drafting reports, and replying to endless emails.\n\nIn the late afternoon, I finish up my tasks and head home by 5:30 PM. Once I get home, the evening is my personal time to unwind. I usually cook dinner while listening to music, and then I settle on the couch to read a novel or watch an episode of a documentary. I try to be in bed by 10:30 PM so that I have enough energy for the following day.`,
    comprehension: [
      { q: 'What time does the writer usually wake up?', opts: ['7:00 AM', '8:00 AM', '5:30 AM', '6:00 AM'], ans: '5:30 AM' },
      { q: 'What does the writer do immediately after drinking water?', opts: ['Takes a shower', 'Eats oatmeal', 'Does a 20-minute yoga session', 'Listens to a podcast'], ans: 'Does a 20-minute yoga session' },
      { q: 'How long does the commute to the office take?', opts: ['20 minutes', '45 minutes', '1 hour', '10 minutes'], ans: '45 minutes' },
      { q: 'What does the writer do during the train ride?', opts: ['Sleeps', 'Replies to emails', 'Listens to educational podcasts', 'Reads a novel'], ans: 'Listens to educational podcasts' },
      { q: 'Why does the writer go to bed at 10:30 PM?', opts: ['Because the TV show ends', 'To have enough energy for the next day', 'Because the house is dark', 'To avoid catching a cold'], ans: 'To have enough energy for the next day' }
    ],
    specificQuiz: [
      { q: 'Which word in the text functions as a TIME SEQUENCER?', opts: ['Typically', 'Structured', 'Afterwards', 'Located'], ans: 'Afterwards', exp: '"Afterwards" explicitly shows the order of events in time.' },
      { q: 'What grammatical tense dominates this text?', opts: ['Past Simple', 'Present Simple', 'Future Perfect', 'Present Continuous'], ans: 'Present Simple', exp: 'Routines and habits are always expressed using the Present Simple (e.g., goes off, drink, take).' },
      { q: 'What does the phrase "an early riser" mean?', opts: ['Someone who bakes bread', 'Someone who wakes up early in the morning', 'An alarm clock', 'A type of yoga'], ans: 'Someone who wakes up early in the morning', exp: 'It is a common idiom/noun phrase for a morning person.' },
      { q: 'Identify the subordinating conjunction used for purpose in the last paragraph:', opts: ['So that', 'Once', 'While', 'In the late afternoon'], ans: 'So that', exp: '"So that" explains the reason or purpose for going to bed at 10:30.' },
      { q: 'Which transition phrase opens the final paragraph logically?', opts: ['First', 'During the ride', 'In the late afternoon', 'By 7:00 AM'], ans: 'In the late afternoon', exp: 'It shifts the chronological timeline from the workday into the evening.' }
    ]
  },
  {
    id: 18, title: 'A Formal Complaint', subtitle: 'Formal Letter Writing', topic: 'complaint', heroEmoji: '📮',
    heroDesc: 'Menulis surat keluhan (Complaint Letter) menggunakan format bisnis yang sopan, diplomatis, namun tegas.',
    sample: `Dear Customer Service Manager,\n\nI am writing to formally express my extreme dissatisfaction with the service I received at your downtown branch on 12th October, as well as the defective product I was sold.\n\nLast Tuesday, I purchased a VisionX Pro laptop (Receipt No: 88492). The sales assistant assured me that the device was brand new and fully functional. However, upon returning home and unboxing the product, I discovered that the screen had a noticeable crack in the bottom left corner, and the charging cable was missing entirely.\n\nWhen I returned to the store the following day to request an exchange, the staff member on duty was highly dismissive and outright refused to assist me, claiming that the damage occurred after purchase. This lack of professionalism is entirely unacceptable for a store with your reputation.\n\nI have attached photographs of the damaged unit and a copy of the receipt. I expect a prompt replacement of the laptop or a full refund within five business days. If this matter is not resolved satisfactorily, I will be forced to elevate my complaint to the Consumer Protection Board.\n\nI look forward to your immediate response.\n\nYours faithfully,\nJonathan Sterling`,
    comprehension: [
      { q: 'What is the purpose of Jonathan\'s letter?', opts: ['To apply for a job as a manager', 'To complain about a defective product and rude service', 'To write a positive review', 'To ask for technical support for software'], ans: 'To complain about a defective product and rude service' },
      { q: 'What two physical issues did the laptop have?', opts: ['A cracked screen and a missing charging cable', 'A virus and a broken keyboard', 'Wrong color and dead battery', 'It was too heavy and too expensive'], ans: 'A cracked screen and a missing charging cable' },
      { q: 'How did the staff react when Jonathan requested an exchange?', opts: ['They apologized profusely', 'They gave him a refund instantly', 'They were dismissive and refused to help', 'They offered him a discount on another item'], ans: 'They were dismissive and refused to help' },
      { q: 'What resolution is the writer demanding?', opts: ['A free phone', 'A prompt replacement or full refund', 'For the staff member to be fired', 'A discount voucher'], ans: 'A prompt replacement or full refund' },
      { q: 'What action will he take if not resolved?', opts: ['He will break the laptop', 'He will elevate the issue to the Consumer Protection Board', 'He will never buy laptops again', 'He will call the police immediately'], ans: 'He will elevate the issue to the Consumer Protection Board' }
    ],
    specificQuiz: [
      { q: 'Why does the writer use "Dear Customer Service Manager," rather than "Hi Manager,"?', opts: ['He forgot the manager\'s name', 'It sets a strict, formal, and professional tone', 'He is trying to be funny', 'It is shorter'], ans: 'It sets a strict, formal, and professional tone', exp: 'Formal business complaints must use professional honorifics.' },
      { q: 'What phrase states the PURPOSE of the letter clearly in the opening?', opts: ['"I am writing to formally express my extreme dissatisfaction..."', '"Last Tuesday, I purchased..."', '"I have attached photographs..."', '"I look forward to..."'], ans: '"I am writing to formally express my extreme dissatisfaction..."', exp: 'Standard formal letters state their objective immediately in the first sentence.' },
      { q: 'Identify the strong vocabulary used to express anger diplomatically:', opts: ['Mad, bad, sad', 'Extreme dissatisfaction, dismissive, unacceptable', 'Broken, missing, cracked', 'Brand new, fully functional'], ans: 'Extreme dissatisfaction, dismissive, unacceptable', exp: 'These academic words convey anger professionally without using insults or slang.' },
      { q: 'What is the effect of using "I expect" in the final paragraph?', opts: ['It begs for mercy', 'It firmly states a demand without being abusive', 'It states a future prediction', 'It asks a question'], ans: 'It firmly states a demand without being abusive', exp: '"I expect" is a strong diplomatic imperative commanding action.' },
      { q: 'Why is "Yours faithfully" used instead of "Yours sincerely"?', opts: ['Because the writer is religious', 'Because the writer does not know the specific name of the recipient', 'It is an informal phrase', 'Because the letter is sent by email'], ans: 'Because the writer does not know the specific name of the recipient', exp: 'UK/International standard: If starting with Dear Manager/Sir/Madam, close with Yours faithfully. If you know the name (Dear Mr. Smith), use Yours sincerely.' }
    ]
  }
];

const fallbackPassage = {
  heroEmoji: '📝', heroDesc: 'Latihan penguatan mekanikal teks', subtitle: 'Structured Essay',
  sample: `Learning to write effectively in a second language is a journey that requires both patience and practice. While vocabulary and grammar form the foundation, the ability to weave sentences into a coherent paragraph is what truly indicates proficiency. Consequently, intermediate learners must focus significantly on cohesive devices.\n\nThere are several methods to improve writing fluency. Reading extensive literature exposes students to varied sentence structures and formal registers. Additionally, seeking peer review can highlight persistent errors that a student might conventionally overlook. By comparing feedback, learners can identify their weaknesses.\n\nUltimately, writing is a communicative tool. The primary objective is to convey ideas as clearly and concisely as possible. Therefore, minimizing ambiguity through proper punctuation and strict paragraphing rules is essential. Mastery is not achieved overnight, but through consistent, deliberate practice.`,
  comprehension: [
    { q: 'What is considered the foundation of writing according to the text?', opts: ['Spelling and reading', 'Vocabulary and grammar', 'Speaking loudly', 'Finding errors'], ans: 'Vocabulary and grammar' },
    { q: 'What indicates true proficiency?', opts: ['Knowing 1000 words', 'Typing fast', 'The ability to weave sentences into a coherent paragraph', 'Using passive voice'], ans: 'The ability to weave sentences into a coherent paragraph' },
    { q: 'How does reading literature help?', opts: ['It wastes time', 'It exposes students to varied structures and registers', 'It hurts visibility', 'It makes you sleepy'], ans: 'It exposes students to varied structures and registers' },
    { q: 'What is the primary objective of writing?', opts: ['To confuse the reader', 'To convey ideas clearly and concisely', 'To get a high score', 'To write long sentences'], ans: 'To convey ideas clearly and concisely' },
    { q: 'How is mastery achieved?', opts: ['Through consistent, deliberate practice', 'Overnight magically', 'By buying special pens', 'By ignoring rules'], ans: 'Through consistent, deliberate practice' }
  ],
  specificQuiz: [
    { q: 'Identify the contrast linker in paragraph one:', opts: ['While', 'Consequently', 'Foundation', 'Indicates'], ans: 'While', exp: '"While vocabulary forms the base, the ability to weave..." sets up a contrast of importance.' },
    { q: 'What does "Consequently" mean in this context?', opts: ['Before', 'As a logical result', 'In addition', 'However'], ans: 'As a logical result', exp: 'Because paragraphing shows proficiency, AS A RESULT, learners must focus on cohesion.' },
    { q: 'What is the grammatical subject of "reading extensive literature exposes students"?', opts: ['Students', 'Literature', 'Reading extensive literature (Gerund phrase)', 'Exposes'], ans: 'Reading extensive literature (Gerund phrase)', exp: 'The entire gerund phrase acts as the subject.' },
    { q: 'In the phrase "can highlight persistent errors", what does "persistent" mean?', opts: ['Easy to see', 'Occurring repeatedly and constantly', 'Funny', 'Grammatical'], ans: 'Occurring repeatedly and constantly', exp: '"Persistent" means something stubborn that keeps happening.' },
    { q: 'Why is "Therefore" used in the last paragraph?', opts: ['To introduce a cause', 'To conclude a logical argument', 'To change subjects', 'To start a story'], ans: 'To conclude a logical argument', exp: 'It logically connects the objective (clarity) with the necessary action (proper punctuation).' }
  ]
};

const LESSON_TITLES = {
  1: 'My Hometown', 2: 'A Letter to My Friend', 3: 'My Daily Routine', 4: 'A Memorable Journey',
  5: 'Giving an Opinion', 6: 'Describing a Person', 7: 'Writing Instructions', 8: 'Food I Love',
  9: 'Letter of Invitation', 10: 'My Future Plans', 11: 'A Problem and Solution', 12: 'Describing My School',
  13: 'A Thank You Letter', 14: 'My Hobby', 15: 'A Story About My Pet', 16: 'Comparing and Contrasting',
  17: 'My Neighbourhood', 18: 'A Formal Complaint', 19: 'Writing with Conjunctions', 20: 'Review & Writing Test',
};

function buildFile(id) {
  let spec = DETAILED_LESSONS.find(l => l.id === id);
  if (!spec) {
    spec = { ...fallbackPassage, id, title: LESSON_TITLES[id], topic: LESSON_TITLES[id].toLowerCase() };
  }

  const nextId = id < 20 ? id + 1 : null;
  const nextPath = nextId ? '/modul/english/intermediate/writing/lesson-' + nextId : '/modul/english/intermediate/writing';

  const fullQuiz = [...spec.specificQuiz, ...getMechanicsQuestions(id)];

  // Convert passages safely without backtick strings!
  const passagesHtml = spec.sample.split('\\n').map(p => '<p className="mb-4">' + p.replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</p>').join('');

  // Dump JSON into strings
  const quizItems = JSON.stringify(fullQuiz, null, 2);
  const comprItems = JSON.stringify(spec.comprehension, null, 2);

  // We write the source code exactly, using \` as string literal where safe.
  // Using JSON.stringify ensures no syntax errors are introduced by data!
  return `import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine, WritingCard, ComprehensionSection, getCompletedWritingLessons, markWritingComplete } from './writingUtils';
import type { QuizItem, ComprehensionQ } from './writingUtils';
import { BookOpen, PenTool, CheckCircle2, ChevronLeft } from 'lucide-react';

const QUIZ: QuizItem[] = ${quizItems};

const COMPREHENSION: { passageTitle: string; passage: React.ReactNode; questions: ComprehensionQ[] } = {
  passageTitle: '✍️ ${spec.title}',
  passage: (
    <>
      <div className="bg-amber-50 p-6 font-serif rounded-xl border border-amber-100 shadow-inner text-slate-800 leading-relaxed text-[15px]" 
           dangerouslySetInnerHTML={{ __html: ${JSON.stringify(passagesHtml)} }} />
    </>
  ),
  questions: ${comprItems},
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
            <p className="text-slate-500 mb-8 leading-relaxed">Selamat! Kamu berhasil menaklukkan tantangan <b>B1/B2 Writing Analysis</b>.</p>
            <div className="space-y-3">
              <button onClick={() => { setShowModal(false); navigate(nextPath); }} className="w-full py-4 rounded-xl font-bold text-white bg-amber-500 hover:bg-amber-600 shadow-lg shadow-amber-200 transition-all active:scale-95">Materi Selanjutnya</button>
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
              <h1 className="text-base font-extrabold text-slate-800 tracking-tight">${spec.title}</h1>
              <p className="text-[10px] text-amber-600 font-bold uppercase tracking-widest bg-amber-50 inline-block px-2 py-0.5 rounded-full mt-0.5">B1/B2 Writing • Lesson ${id}</p>
            </div>
            <button onClick={() => navigate(nextPath)} className="px-4 py-2 rounded-full text-xs font-bold text-amber-600 bg-amber-50 hover:bg-amber-100 transition-colors">Next ›</button>
          </div>
        </header>

        <div className="flex bg-white border-b border-slate-100 sticky top-[65px] z-10 shadow-sm p-2 gap-2">
          {(['baca', 'latihan', 'kuis'] as const).map((tab) => {
            const labels = { baca: 'Materi Detail', latihan: 'Pemahaman (5)', kuis: 'Super Kuis (20)' };
            const icons = { baca: <BookOpen className="w-4 h-4" />, latihan: <PenTool className="w-4 h-4" />, kuis: <CheckCircle2 className="w-4 h-4" /> };
            const isActive = activeTab === tab;
            return (
              <button key={tab} onClick={() => setActiveTab(tab)} className={'flex-1 py-3 text-sm font-bold tracking-wide transition-all rounded-xl flex items-center justify-center gap-2 ' + (isActive ? 'bg-amber-500 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800')}>
                {icons[tab]} <span className="hidden sm:inline">{labels[tab]}</span>
              </button>
            );
          })}
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-8 pb-28 space-y-6">
            {activeTab === 'baca' && (
              <div className="animate-fade-in space-y-6">
                <div className="bg-gradient-to-br from-indigo-700 to-purple-800 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-10">
                    <BookOpen className="w-32 h-32" />
                  </div>
                  <div className="text-4xl mb-3 relative z-10">${spec.heroEmoji}</div>
                  <h2 className="text-xl md:text-2xl font-extrabold mb-2 relative z-10">${spec.title}</h2>
                  <p className="text-sm md:text-base text-indigo-100 leading-relaxed max-w-lg relative z-10">
                    ${spec.heroDesc}
                  </p>
                  <p className="mt-4 text-xs font-bold inline-block bg-white/20 px-3 py-1 rounded-full text-white backdrop-blur-sm shadow-sm border border-white/20">🔥 Enhanced B1/B2 Format</p>
                </div>

                <WritingCard title="Target Mekanikal" icon="🎯">
                  <p className="text-sm text-slate-700 mb-3 leading-relaxed">
                    Untuk menaklukkan level B1-B2 dalam tulisan <strong>${spec.topic}</strong>, perhatikan elemen berikut:
                  </p>
                  <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside bg-slate-50 p-4 rounded-xl shadow-inner border border-slate-100">
                    <li><strong className="text-slate-800">Advanced Lexical Resource:</strong> Hindari kosakata berulang. Gunakan sinonim yang lebih kaya (e.g. <i>crucial, significantly, furthermore</i>).</li>
                    <li><strong className="text-slate-800">Cohesive Devices:</strong> Jangan hanya bertumpu pada 'and', 'but', 'so'. Gunakan <i>Despite, Nevertheless, Consequently, Moreover</i>.</li>
                    <li><strong className="text-slate-800">Sentence Variety:</strong> Padukan kalimat pendek dengan <i>Complex Sentences</i> (Relative clauses, if-clauses).</li>
                  </ul>
                  <p className="text-sm text-indigo-700 mt-4 font-bold bg-indigo-50 p-3 rounded-lg border border-indigo-100 inline-block w-full">
                    👉 Buka tab "Pemahaman" untuk membaca esai contoh lengkap dan uji akurasi bacaanmu!
                  </p>
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
            {isCompleted ? 'Validasi Target Selesai ✓ (Kembali)' : 'Tandai Kuis Selesai ✓'}
          </button>
        </div>
      </div>
    </>
  );
}
`;
}

console.log('Generating SAFE Enhanced Writing files...');
for (let id = 1; id <= 20; id++) {
  const code = buildFile(id);
  fs.writeFileSync(path.join(OUT_DIR, `Lesson${id}.tsx`), code, 'utf8');
  console.log(`✅ Lesson${id}.tsx generated (Enhanced Content)`);
}
console.log('🚀 All 20 enhanced lessons successfully safely built!');
