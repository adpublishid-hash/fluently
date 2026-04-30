// build-upper-inter-pronunciation.cjs
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '../src/pages/module/english/upper-intermediate/pronunciation');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const ACCENT_COLOR = '#7D3C98';

const LESSONS = [
  {
    id: 1, title: 'Word Stress in Multi-syllable Words', subtitle: 'Tekanan Kata pada Kata Bersuku Banyak',
    points: [
      '**Prinsip Dasar:** Bahasa Inggris memiliki tekanan kata (word stress) yang tetap dan mempengaruhi makna.',
      'Dalam kata 2 suku: kata benda biasanya ditekan pada suku PERTAMA → **RE**cord, **PRE**sent',
      'Dalam kata kerja: biasanya ditekan suku KEDUA → re**CORD**, pre**SENT**',
      'Akhiran -tion, -sion, -ic, -ical: tekanan SEBELUM akhiran → commu**NI**cation, eco**NO**mic',
      'Akhiran -ate, -ize, -fy: tekanan pada suku KETIGA dari belakang → **AP**preciate, **DI**gitize',
      'Akhiran -ity, -ogy: "com**MU**nity", "bi**O**logy" – tekanan geser ke depan akhiran',
    ],
    examples: [
      { word: 'RECord (noun)', ipa: '/ˈrekərd/', meaning: 'Catatan / rekaman' },
      { word: 'reCORD (verb)', ipa: '/rɪˈkɔːrd/', meaning: 'Merekam' },
      { word: 'PREsent (noun/adj)', ipa: '/ˈprezənt/', meaning: 'Hadiah / saat ini' },
      { word: 'preSENT (verb)', ipa: '/prɪˈzent/', meaning: 'Mempresentasikan' },
      { word: 'comMUnication', ipa: '/kəˌmjuːnɪˈkeɪʃən/', meaning: 'Komunikasi' },
      { word: 'ecoNOMic', ipa: '/ˌiːkəˈnɒmɪk/', meaning: 'Ekonomi (adj)' },
      { word: 'APpreciate', ipa: '/əˈpriːʃieɪt/', meaning: 'Menghargai' },
      { word: 'inTELligence', ipa: '/ɪnˈtelɪdʒəns/', meaning: 'Kecerdasan' },
    ],
    quiz: [
      { q: 'In the word "photography", which syllable is stressed?', opts: ['PHO-to-gra-phy', 'pho-TO-gra-phy', 'pho-to-GRA-phy', 'pho-to-gra-PHY'], ans: 'pho-TO-gra-phy', exp: '"Photography" → phOtography. Akhiran -phy mengikuti pola tekanan pada suku ketiga dari belakang.' },
      { q: 'The word "REBEL" (noun) vs "reBEL" (verb) demonstrates ___', opts: ['Change in meaning only', 'Stress shift between noun and verb forms', 'Different spelling', 'Different number of syllables'], ans: 'Stress shift between noun and verb forms', exp: 'Banyak kata 2 suku berubah tekanan tergantung kata benda (suku 1) atau kata kerja (suku 2).' },
      { q: 'Where is the stress in "communication"?', opts: ['com-MU-ni-ca-tion', 'COM-mu-ni-ca-tion', 'com-mu-ni-CA-tion', 'com-mu-NI-ca-tion'], ans: 'com-mu-NI-ca-tion', exp: '"Communication" → comMUNication. Akhiran -tion diikuti tekanan pada suku sebelumnya.' },
      { q: 'Which pair shows CORRECT stress shift?', opts: ['INcrease (noun) / INcrease (verb)', 'INcrease (noun) / inCREASE (verb)', 'inCREASE (noun) / INcrease (verb)', 'inCREASE (noun) / inCREASE (verb)'], ans: 'INcrease (noun) / inCREASE (verb)', exp: 'INcrease (noun: kenaikan) / inCREASE (verb: meningkat) → stress shift pada 2-syllable words.' },
      { q: 'The suffix "-ic" (as in "economic") shifts stress to ___', opts: ['The last syllable', 'Two syllables before -ic', 'The syllable directly before -ic', 'The first syllable always'], ans: 'The syllable directly before -ic', exp: 'Akhiran "-ic" menarik tekanan ke suku kata tepat sebelumnya: ecoNOmic, photoGRAPHic.' },
      { q: 'How many syllables does "university" have?', opts: ['4', '5', '6', '3'], ans: '5', exp: 'u-ni-VER-si-ty = 5 suku kata, dengan tekanan utama pada suku ketiga (VER).' },
      { q: 'In "photograph" vs "photography", the stress ___', opts: ['Stays on the same syllable', 'Shifts from syllable 1 to syllable 2', 'Shifts from syllable 2 to syllable 1', 'Disappears entirely'], ans: 'Shifts from syllable 1 to syllable 2', exp: 'PHOtograph (suku 1) → phoTOgraphy (suku 2). Akhiran -y menggeser tekanan.' },
      { q: 'Which word has stress on the FINAL syllable?', opts: ['Beautiful', 'Interesting', 'Compress (verb)', 'Yesterday'], ans: 'Compress (verb)', ans: 'Compress (verb)', exp: 'comPRESS – kata kerja 2 suku biasanya ditekan pada suku kedua (terakhir).' },
      { q: 'The word "analyze" has stress on ___', opts: ['a-NA-lyze', 'AN-a-lyze', 'an-a-LYZE', 'an-AL-yze'], ans: 'AN-a-lyze', exp: 'ANalyze – akhiran -ize: tekanan pada suku KETIGA dari belakang (AN-a-lyze).' },
      { q: 'Incorrect word stress will most likely cause ___', opts: ['Spelling errors', 'Difficulty being understood', 'Grammar mistakes', 'Vocabulary gaps'], ans: 'Difficulty being understood', exp: 'Tekanan kata yang salah dapat membuat penutur asli sulit memahami ucapan Anda.' },
      { q: '"Technology" is stressed on which syllable?', opts: ['TECH-no-lo-gy', 'tech-NO-lo-gy', 'tech-no-LO-gy', 'tech-no-lo-GY'], ans: 'tech-NO-lo-gy', exp: 'techNOlogy – akhiran -ogy mengikuti pola tekanan pada suku ketiga dari belakang.' },
      { q: 'Which suffixes attract stress to the syllable DIRECTLY BEFORE them?', opts: ['-tion, -sion, -ic', '-ing, -er, -ed', '-ful, -less, -ness', '-able, -ible, -al'], ans: '-tion, -sion, -ic', exp: 'Akhiran -tion, -sion, -ic secara konsisten menarik tekanan ke suku tepat sebelum mereka.' },
      { q: 'In "PERMIT" (noun) vs "perMIT" (verb), meaning is ___', opts: ['The same', 'Slightly different', 'Completely different', 'Unclear'], ans: 'Completely different', exp: 'PERMIT = izin (kata benda); perMIT = mengizinkan (kata kerja) – maknanya berbeda sesuai fungsi.' },
      { q: 'Which word is stressed correctly as "ADvertise"?', opts: ['ad-VER-tise', 'AD-ver-tise', 'ad-ver-TISE', 'ad-VER-tise'], ans: 'AD-ver-tise', exp: 'ADvertise – akhiran -ise (dalam kata 3 suku) ditekan pada suku pertama.' },
      { q: 'Compound nouns usually have stress on ___', opts: ['The second part', 'Both parts equally', 'The first part', 'The final syllable'], ans: 'The first part', exp: 'Kata benda gabungan (compound noun): BLACKboard, AIRport – tekanan pada bagian pertama.' },
      { q: '"Academic" has its stress on which syllable?', opts: ['AC-a-dem-ic', 'ac-A-dem-ic', 'ac-a-DEM-ic', 'ac-a-dem-IC'], ans: 'ac-a-DEM-ic', exp: 'acaDEMic – akhiran -ic menarik tekanan ke suku tepat sebelumnya: acaDEMic.' },
      { q: 'Where is stress in "OBject" vs "obJECT"?', opts: ['Both on first syllable', 'OBject=noun, obJECT=verb', 'OBject=verb, obJECT=noun', 'Both on second syllable'], ans: 'OBject=noun, obJECT=verb', exp: 'OBject (keberatan/benda, noun/disuse) vs obJECT (menolak, verb) – classic stress shift.' },
      { q: 'Which sentence demonstrates CORRECT stress use?', opts: ['She wants to REbel against the rules.', 'He gave me a PERmit to enter.', 'They need to adVANce quickly.', 'The conFLICT caused many problems.'], ans: 'He gave me a PERmit to enter.', exp: 'PERmit (noun, suku 1). REbel sebagai verb harus reBEL; adVANce memang benar. conFLICT bisa noun atau verb.' },
      { q: 'In "information", where is the primary stress?', opts: ['IN-for-ma-tion', 'in-FOR-ma-tion', 'in-for-MA-tion', 'in-for-ma-TION'], ans: 'in-for-MA-tion', exp: 'inforMAtion – akhiran -tion menarik tekanan ke suku tepat sebelumnya: inforMAtion.' },
      { q: 'Which is NOT a rule for English word stress?', opts: ['Nouns of 2 syllables often stress syllable 1', 'Verbs of 2 syllables often stress syllable 2', '-tion suffixes attract stress before them', 'All words end in stressed syllables'], ans: 'All words end in stressed syllables', exp: 'Tidak ada aturan bahwa semua kata berakhir dengan suku tertekan – ini bukan pola umum bahasa Inggris.' },
    ]
  },
  {
    id: 2, title: 'Connected Speech & Weak Forms', subtitle: 'Penghubungan Suara dan Bentuk Lemah',
    points: [
      '**Weak Forms:** Kata-kata fungsional (preposisi, artikel, konjungsi) sering diucapkan dengan versi yang lebih lemah.',
      '"and" = /ænd/ → /ən/ atau /n/: "fish and chips" → "fish \'n\' chips"',
      '"to" = /tuː/ → /tə/: "I want to go" → "I wanna go" (sangat informal)',
      '"of" = /ɒv/ → /əv/ atau /ə/: "cup of tea" → "cuppa tea"',
      '"for" = /fɔːr/ → /fər/: "wait for me" → "wait fer me"',
      '**Assimilation:** Suara berubah karena pengaruh suara di sebelahnya → "ten boys" → "tem boys"',
      '**Elision:** Suara hilang sepenuhnya → "next day" → "nex\' day", "different" → "diff\'rent"',
      '**Linking:** Konsonan akhir dihubungkan ke vokal awal kata berikutnya → "an apple" → "anapple"',
    ],
    examples: [
      { word: 'fish and chips', ipa: '/fɪʃ ən tʃɪps/', meaning: '"and" melemah menjadi /ən/' },
      { word: 'want to see', ipa: '/wɒntə siː/', meaning: '"to" melemah menjadi /tə/' },
      { word: 'cup of tea', ipa: '/kʌpəv tiː/', meaning: '"of" melemah menjadi /əv/' },
      { word: 'I can go', ipa: '/aɪ kən ɡoʊ/', meaning: '"can" dalam konteks positif melemah → /kən/' },
      { word: 'last bus', ipa: '/læs bʌs/', meaning: 'Elision: /t/ hilang sebelum konsonan' },
      { word: 'good morning', ipa: '/ɡʊm ˈmɔːnɪŋ/', meaning: 'Assimilation: /d/ → /m/ sebelum /m/' },
      { word: 'an apple', ipa: '/ənˈæpəl/', meaning: 'Linking: "an" + "apple" dihubungkan' },
      { word: 'I\'ve been there', ipa: '/aɪvˈbɪn ðeər/', meaning: '"have" melemah dalam auxiliary' },
    ],
    quiz: [
      { q: 'In natural speech, "and" is often reduced to ___', opts: ['/ænd/ always', '/ən/ or /n/', '/ɑːnd/', '/end/'], ans: '/ən/ or /n/', exp: '"And" dalam connected speech sering diucapkan sebagai /ən/ atau bahkan hanya /n/ (fish n chips).' },
      { q: 'What is "elision" in connected speech?', opts: ['Adding extra syllables', 'Linking two words together', 'Dropping a sound completely', 'Making a sound stronger'], ans: 'Dropping a sound completely', exp: 'Elision adalah penghilangan suara dalam connected speech: "next" + "day" → "nex\' day".' },
      { q: '"Good morning" → /ɡʊm ˈmɔːnɪŋ/ is an example of ___', opts: ['Elision', 'Assimilation', 'Linking', 'Weak forms'], ans: 'Assimilation', exp: 'Assimilation: /d/ berubah menjadi /m/ karena pengaruh konsonan /m/ yang mengikuti.' },
      { q: 'Which word has a STRONG and a WEAK form?', opts: ['Table', 'Can', 'Elephant', 'Beautiful'], ans: 'Can', exp: '"Can" (bisa): strong /kæn/ vs weak /kən/. Dalam kalimat positif biasanya lemah.' },
      { q: '"I want to go" spoken naturally sounds like ___', opts: ['/aɪ wɒnt tuː ɡoʊ/', '/aɪ wɒntə ɡoʊ/', '/aɪ WONT tuː ɡoʊ/', '/aɪ wanttu ɡoʊ/'], ans: '/aɪ wɒntə ɡoʊ/', exp: '"to" sebelum konsonan sering diucapkan sebagai /tə/ dalam connected speech.' },
      { q: 'Linking in "an apple" makes it sound like ___', opts: ['an + apple (two separate words)', 'a + napple (linked)', 'ann + apple', 'anapple (one word)'], ans: 'a + napple (linked)', exp: 'Konsonan /n/ di akhir "an" dihubungkan ke vokal /æ/ awal "apple" → "an-apple" terdengar seperti "a-napple".' },
      { q: 'Why do native speakers use weak forms?', opts: ['To sound uneducated', 'To speak more naturally, rhythmically, and quickly', 'To hide their mistakes', 'To confuse learners'], ans: 'To speak more naturally, rhythmically, and quickly', exp: 'Weak forms dan connected speech adalah ciri alami bahasa yang membuat percakapan lebih lancar dan ritmis.' },
      { q: 'In "I\'d like a cup of tea", "of" is typically pronounced as ___', opts: ['/ɒv/', '/əv/ or /ə/', '/ɔːf/', '/ɑːv/'], ans: '/əv/ or /ə/', exp: '"Of" adalah salah satu kata paling umum yang dilemahkan dalam connected speech menjadi /əv/ atau bahkan /ə/.' },
      { q: 'Which phrase demonstrates ELISION (sound deletion)?', opts: ['good morning → /ɡʊm mɔːnɪŋ/', 'an apple → /ənæpəl/', 'next please → /neks pliːz/', 'fish and chips → /fɪʃ ən tʃɪps/'], ans: 'next please → /neks pliːz/', exp: '"Next please": /t/ di akhir "next" hilang sebelum konsonan /p/ → "nex\' please".' },
      { q: 'The word "for" in connected speech often sounds like ___', opts: ['/fɔːr/', '/fər/', '/fɒr/', '/fuːr/'], ans: '/fər/', exp: '"For" dalam unstressed position: /fɔːr/ → /fər/ (schwa replacement).' },
      { q: 'Recognizing weak forms helps with ___', opts: ['Writing formal essays', 'Listening comprehension in natural speech', 'Grammar accuracy', 'Vocabulary building'], ans: 'Listening comprehension in natural speech', exp: 'Memahami weak forms sangat penting agar bisa mengikuti percakapan alami antara penutur asli.' },
      { q: '"CAN\'T" (stress form) vs "can" (weak) – how to tell them apart?', opts: ['By spelling', 'By context and vowel clarity: /kænt/ vs /kən/', 'By counting syllables', 'They sound identical'], ans: 'By context and vowel clarity: /kænt/ vs /kən/', exp: 'CAN\'T (negatif) selalu kuat /kænt/. "Can" positif dilemahkan /kən/ dalam mid-sentence position.' },
      { q: 'In "I\'ve been to London", "have" sounds like ___?', opts: ['/hæv/', '/ɪv/', '/eɪv/', '/hɑːv/'], ans: '/ɪv/', exp: 'Auxiliary "have" dalam "I\'ve" dikontraksikan menjadi /ɪv/, sebuah bentuk sangat lemah.' },
      { q: 'The process where consonants at end of words link to vowels at start of next is ___', opts: ['Elision', 'Assimilation', 'Linking', 'Reduction'], ans: 'Linking', exp: 'Consonant-to-vowel linking membuat percakapan lebih mulus dan alami dalam bahasa Inggris.' },
      { q: 'Which sentence uses connected speech MOST naturally?', opts: ['I WANT TO GO TO THE STORE.', 'I wanna go t\'the store.', 'I wants to go to store.', 'I want go to store.'], ans: 'I wanna go t\'the store.', exp: '"Wanna" dan pengurangan "to the" adalah contoh connected speech alami yang umum terjadi.' },
      { q: 'Pick the stressed (strong) form of "the" used before vowel-initial words:', opts: ['/ðə/', '/ðɪ/', '/ðiː/', '/ðæ/'], ans: '/ðɪ/', exp: '"The" sebelum vokal: /ðɪ/ (strong). Sebelum konsonan: /ðə/ (weak). "The apple" = /ðɪ æpəl/.' },
      { q: 'What causes assimilation in English?', opts: ['Random choice by speakers', 'Influence of neighboring sounds on each other', 'Grammar rules', 'Formal vs informal settings'], ans: 'Influence of neighboring sounds on each other', exp: 'Assimilation terjadi karena suara mempengaruhi suara di sebelahnya untuk kemudahan produksi.' },
      { q: 'In "What do you want?", natural speech makes "do you" sound like ___', opts: ['/duː juː/', '/dʒuː/ or /djə/', '/duː juː/', '/dɪd juː/'], ans: '/dʒuː/ or /djə/', exp: '"do you" → /dju/ dengan assimilation /d/ + /j/ → menjadi /dʒ/ seperti "j" dalam "jump".' },
      { q: 'Connected speech features are important for ___', opts: ['Passing grammar tests only', 'Sounding natural and being understood by native speakers', 'Reading textbooks', 'Formal letter writing'], ans: 'Sounding natural and being understood by native speakers', exp: 'Connected speech adalah inti dari fluency alami dan sangat penting untuk komunikasi lisan yang efektif.' },
      { q: 'In "last year", the /t/ in "last" before /j/ may become ___', opts: ['Stressed', 'Dropped entirely', 'Lengthened', 'Replaced by /d/'], ans: 'Dropped entirely', exp: 'Elision: /t/ dalam "last" sering hilang sebelum konsonan atau dalam cluster konsonan: "las\' year".' },
    ]
  },
];

const PRON_TOPICS = [
  { id: 3, title: 'Intonation for Questions & Statements' },
  { id: 4, title: 'Stress Patterns in Sentences' },
  { id: 5, title: 'Vowel Reduction & Schwa Sound' },
  { id: 6, title: 'Consonant Clusters & Final Sounds' },
  { id: 7, title: 'Linking Sounds in Natural Speech' },
  { id: 8, title: 'Rhythm & Stress Timing' },
  { id: 9, title: 'British vs American Pronunciation' },
  { id: 10, title: 'Stress in Compound Nouns & Phrases' },
  { id: 11, title: 'Nuclear Stress & Emphasis' },
  { id: 12, title: 'Intonation in Complex Sentences' },
  { id: 13, title: 'Vowel Sounds – Common Distinctions' },
  { id: 14, title: 'Consonant Sounds – Voiced & Unvoiced' },
  { id: 15, title: 'Pitch & Tone in Academic Contexts' },
  { id: 16, title: 'Weak Syllables in Long Words' },
  { id: 17, title: 'Pronunciation of -ed Endings' },
  { id: 18, title: 'Pronunciation of Numbers & Abbreviations' },
  { id: 19, title: 'Pronunciation of Academic Vocabulary' },
  { id: 20, title: 'Pronunciation Review & Self-Assessment' },
];

function fallbackPronPoints(title) {
  return [
    `**${title}** adalah aspek penting dalam penguasaan pronunciation B2.`,
    'Di level B2, penutur mampu berbicara dengan intonasi dan ritme yang alami.',
    'Perhatikan perbedaan minimal antara dua bunyi yang mirip dalam bahasa Inggris.',
    'Praktik mendengarkan rekaman penutur asli sangat membantu melatih kepekaan fonetik.',
    'Gunakan kamus fonetik (IPA) untuk memverifikasi pengucapan kata-kata baru.',
    'Rekam diri sendiri dan bandingkan dengan model pronunciation yang benar.',
  ];
}

function fallbackPronExamples(title) {
  return [
    { word: 'Practice regularly', ipa: '/ˈpræktɪs ˈreɡjʊləli/', meaning: 'Berlatih secara teratur' },
    { word: 'Listen carefully', ipa: '/ˈlɪsən ˈkeəfʊli/', meaning: 'Dengarkan dengan seksama' },
    { word: 'Repeat after me', ipa: '/rɪˈpiːt ˈɑːftər miː/', meaning: 'Ulangi setelah saya' },
    { word: 'Correct your errors', ipa: '/kəˈrekt jɔːr ˈerərz/', meaning: 'Perbaiki kesalahanmu' },
    { word: 'Natural speech flow', ipa: '/ˈnætʃərəl spiːtʃ floʊ/', meaning: 'Aliran bicara yang alami' },
    { word: 'Confident speaker', ipa: '/ˈkɒnfɪdənt ˈspiːkər/', meaning: 'Pembicara yang percaya diri' },
  ];
}

function fallbackPronQuiz(title) {
  return [
    { q: `Why is mastering ${title} important at B2 level?`, opts: ['It is not important', 'It helps you sound natural and be easily understood', 'It only matters for writing', 'It is only for advanced learners'], ans: 'It helps you sound natural and be easily understood', exp: `Menguasai ${title} di level B2 membuat Anda terdengar lebih alami dan mudah dipahami oleh penutur asli.` },
    { q: 'What does "IPA" stand for in pronunciation?', opts: ['International Phonetic Alphabet', 'Internal Pronunciation Aid', 'Important Phonics Assessment', 'International Pronunciation Application'], ans: 'International Phonetic Alphabet', exp: 'IPA (International Phonetic Alphabet) adalah sistem simbol standar untuk merepresentasikan bunyi bahasa.' },
    { q: 'The best way to improve pronunciation is to ___', opts: ['Only read textbooks', 'Listen to and mimic native speakers\' natural speech', 'Memorize all phonetic rules', 'Speak only in your first language'], ans: 'Listen to and mimic native speakers\' natural speech', exp: 'Mendengarkan dan meniru penutur asli (shadowing) adalah teknik paling efektif untuk pronunciation.' },
    { q: 'A "minimal pair" is ___', opts: ['Two words with identical pronunciation', 'Two words that differ by only one sound', 'Two words with the same spelling', 'Two words from the same word family'], ans: 'Two words that differ by only one sound', exp: 'Contoh minimal pair: ship/sheep, bad/bed, cat/cut – hanya satu bunyi yang berbeda.' },
    { q: 'In English, stress usually falls on ___', opts: ['The last syllable always', 'Content words (nouns, verbs, adjectives)', 'Only prepositions and articles', 'Every third word'], ans: 'Content words (nouns, verbs, adjectives)', exp: 'Dalam kalimat, kata konten (noun, verb, adjective, adverb) biasanya mendapat tekanan lebih kuat.' },
    { q: 'Rising intonation at the end of a sentence typically signals ___', opts: ['A statement of fact', 'A yes/no question or uncertainty', 'A completed thought', 'An exclamation'], ans: 'A yes/no question or uncertainty', exp: 'Intonasi naik di akhir kalimat umumnya menandakan pertanyaan yes/no atau ekspresi ketidakpastian.' },
    { q: 'The schwa sound /ə/ is ___', opts: ['The loudest vowel sound', 'The most common unstressed vowel in English', 'Found only in stressed syllables', 'Never found in connected speech'], ans: 'The most common unstressed vowel in English', exp: 'Schwa /ə/ adalah suara paling umum dalam bahasa Inggris, selalu muncul dalam suku kata tidak bertekanan.' },
    { q: 'Which tool helps you check the pronunciation of an unfamiliar word?', opts: ['A grammar book', 'A phonetic dictionary with IPA', 'A synonym finder', 'A spell checker'], ans: 'A phonetic dictionary with IPA', exp: 'Kamus fonetik dengan tulisan IPA (seperti Cambridge Dictionary online) membantu verifikasi pengucapan.' },
    { q: 'Recording yourself practice is useful because ___', opts: ['It is entertaining only', 'You can identify errors you cannot hear when speaking', 'It replaces teacher feedback completely', 'It is required for B2 certification'], ans: 'You can identify errors you cannot hear when speaking', exp: 'Merekam dan mendengarkan kembali bicara Anda membantu mendeteksi kesalahan yang tidak terasa saat berbicara.' },
    { q: 'Which element of speech makes English sound natural and rhythmic?', opts: ['Syllable counting', 'Stress-timed rhythm (stressed syllables at regular intervals)', 'Speaking very slowly', 'Pronouncing every syllable equally'], ans: 'Stress-timed rhythm (stressed syllables at regular intervals)', exp: 'English adalah bahasa stress-timed: suku kata bertekanan muncul pada interval yang relatif teratur.' },
    { q: 'Which sound is a voiced fricative?', opts: ['/p/', '/t/', '/v/', '/k/'], ans: '/v/', exp: '/v/ adalah konsonan frikatif bersuara. Pasangannya yang tidak bersuara adalah /f/.' },
    { q: 'In "butter", the "t" in American English is often pronounced as ___', opts: ['/t/ (full stop)', '/d/ (flapped)', '/θ/ (th sound)', '/r/ (rhotic)'], ans: '/d/ (flapped)', exp: 'Dalam American English, /t/ di antara dua vokal sering diucapkan sebagai flap /d/: "butter" → "budder".' },
    { q: 'The word "beautiful" has how many syllables?', opts: ['2', '3', '4', '5'], ans: '3', exp: '"Beautiful" = beau-ti-ful = 3 suku kata, dengan tekanan pada BEAUtiful.' },
    { q: 'Which is a correct IPA transcription for "thought"?', opts: ['/θɒt/', '/θaʊt/', '/ðɒt/', '/θuːt/'], ans: '/θɒt/', exp: '"Thought" = /θɒt/ – pengucapan dengan /θ/ (tidak bersuara) dan vokal pendek /ɒ/.' },
    { q: 'The difference between /iː/ (sheep) and /ɪ/ (ship) is ___', opts: ['Consonant type', 'Vowel length and position', 'Stress placement', 'Number of syllables'], ans: 'Vowel length and position', exp: '/iː/ adalah vowel panjang, /ɪ/ adalah vowel pendek. Lidah lebih tinggi untuk /iː/ daripada /ɪ/.' },
    { q: 'Falling intonation in English typically indicates ___', opts: ['A question needing a yes/no answer', 'Uncertainty', 'A completed statement or an information question (WH)', 'Agreement'], ans: 'A completed statement or an information question (WH)', exp: 'Intonasi turun biasanya menandakan kalimat berita yang selesai atau pertanyaan information (wh-question).' },
    { q: 'Which word has a SILENT consonant?', opts: ['Garden', 'Know', 'Speak', 'Table'], ans: 'Know', exp: '"Know" /noʊ/ – huruf "k" tidak diucapkan. Pola /kn-/ di awal kata selalu hanya /n/ dalam bahasa Inggris modern.' },
    { q: 'B2 pronunciation competence means you can ___', opts: ['Speak with a perfect native accent', 'Speak clearly enough to be consistently understood with occasional errors', 'Never make pronunciation mistakes', 'Only speak slowly and carefully'], ans: 'Speak clearly enough to be consistently understood with occasional errors', exp: 'CEFR B2: dapat berbicara dengan jelas dan konsisten dipahami, meski dengan sedikit aksen.' },
    { q: 'What is "shadowing" in language learning?', opts: ['Repeating word lists', 'Speaking simultaneously with or immediately after a recording', 'Writing pronunciation notes', 'Reading texts aloud slowly'], ans: 'Speaking simultaneously with or immediately after a recording', exp: 'Shadowing adalah teknik di mana Anda mengikuti/meniru speaker secara langsung untuk melatih pronunciation dan ritme.' },
    { q: 'To make /θ/ (as in "think"), you place your tongue ___', opts: ['Behind your upper teeth', 'Between or behind your teeth with air flowing over it', 'At the roof of your mouth', 'Against your lower teeth'], ans: 'Between or behind your teeth with air flowing over it', exp: '/θ/ dibuat dengan meletakkan lidah di atau di belakang gigi atas, memungkinkan udara mengalir – bunyi "th" tidak bersuara.' },
  ];
}

function buildFile(id, spec) {
  const nextId = id < 20 ? id + 1 : null;
  const nextPath = nextId ? '/modul/english/upper-intermediate/pronunciation/lesson-' + nextId : '/modul/english/upper-intermediate/pronunciation';

  const points = spec.points || fallbackPronPoints(spec.title);
  const examples = spec.examples || fallbackPronExamples(spec.title);
  const quiz = spec.quiz || fallbackPronQuiz(spec.title);
  const subtitle = spec.subtitle || spec.title;

  const pointsData = JSON.stringify(points, null, 2);
  const examplesData = JSON.stringify(examples, null, 2);
  const quizData = JSON.stringify(quiz, null, 2);

  return `import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LessonShell from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Volume2, Star, Mic } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

interface ExampleItem { word: string; ipa: string; meaning: string; }
interface QuizItem { q: string; opts: string[]; ans: string; exp: string; }

const EXAMPLES: ExampleItem[] = ${examplesData};
const QUIZ: QuizItem[] = ${quizData};
const POINTS: string[] = ${pointsData};

const UpperInterPronLesson${id}: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('upper_intermediate_pronunciation', ${id});
  const nextLessonPath = '${nextPath}';

  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string|null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  const playSound = (text: string) => { playAudio(text, 0.8); };

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

  return (
    <>
      <LessonCompleteModal
        show={showCompleteModal}
        onClose={() => setShowCompleteModal(false)}
        lessonLabel="Upper-Intermediate Pronunciation Lesson ${id}"
        accentColor="${ACCENT_COLOR}"
        nextLessonPath={nextLessonPath}
        onNext={() => { setShowCompleteModal(false); navigate(nextLessonPath); }}
        onBack={() => { setShowCompleteModal(false); navigate(-1); }}
      />
      <LessonShell
        title="${spec.title}"
        subtitle="Pronunciation B2 • Pelajaran ${id}"
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
            style={{ background: isCompleted ? 'linear-gradient(135deg,#26C76D,#1ea85a)' : 'linear-gradient(135deg,${ACCENT_COLOR},#5B2882)' }}
          >
            <CheckCircle2 size={18} />
            {isCompleted ? 'Sudah Selesai ✓' : 'Selesai & Simpan Progress'}
          </button>
        )}
      >
        {(tabId) => {
          if (tabId === 'learn') return (
            <div className="space-y-6 animate-fade-in p-4">
              <div className="rounded-3xl p-6 text-white shadow-xl relative overflow-hidden" style={{background:'linear-gradient(135deg,${ACCENT_COLOR},#4A235A)'}}>
                <div className="text-3xl mb-2">🎙️</div>
                <h2 className="text-xl font-extrabold mb-1">${spec.title}</h2>
                <p className="text-sm opacity-90">${subtitle}</p>
                <div className="mt-3 inline-block bg-white/20 px-3 py-1 rounded-full text-xs font-bold">🔊 CEFR B2 · Pronunciation</div>
              </div>

              <div className="bg-white rounded-2xl p-5 shadow-sm border border-purple-100">
                <div className="flex items-center gap-2 mb-4">
                  <Mic className="w-5 h-5 text-purple-600" />
                  <h3 className="font-bold text-slate-800">Panduan & Aturan Kunci</h3>
                </div>
                <ul className="space-y-2">
                  {POINTS.map((p, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 shrink-0"></span>
                      <span dangerouslySetInnerHTML={{__html: p.replace(/\*\*(.*?)\*\*/g,'<strong class=&quot;text-purple-800&quot;>$1</strong>')}} />
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-purple-50 rounded-2xl p-5 border border-purple-100">
                <h3 className="font-bold text-purple-800 text-sm mb-3">🔊 Contoh & Latihan Pengucapan</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {EXAMPLES.map((ex, i) => (
                    <button key={i} onClick={() => playSound(ex.word)}
                      className="bg-white p-3 rounded-xl border border-purple-100 flex items-center gap-3 group hover:border-purple-300 hover:shadow-sm transition-all active:scale-95 text-left">
                      <Volume2 className="w-4 h-4 text-purple-400 group-hover:text-purple-600 shrink-0" />
                      <div>
                        <p className="font-bold text-slate-800 text-sm">{ex.word}</p>
                        <p className="text-xs font-mono text-purple-600">{ex.ipa}</p>
                        <p className="text-xs text-slate-500 italic">{ex.meaning}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100">
                <p className="text-sm text-amber-800">💡 <strong>Tips:</strong> Gunakan fitur Text-to-Speech di browser atau aplikasi seperti Forvo untuk mendengar pengucapan penutur asli dari berbagai aksen.</p>
              </div>
            </div>
          );

          if (tabId === 'practice') return (
            <div className="p-4 animate-fade-in">
              <div className="max-w-xl mx-auto">
                {!showResult ? (
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xs font-bold text-slate-400 uppercase">Soal {quizStep+1}/{QUIZ.length}</span>
                      <span className="text-xs font-bold bg-purple-50 text-purple-700 px-3 py-1 rounded-full">Skor: {quizScore}</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 mb-5">
                      <div className="h-1.5 rounded-full bg-purple-600 transition-all" style={{width: ((quizStep/QUIZ.length)*100)+'%'}}></div>
                    </div>
                    <h3 className="text-base font-bold text-slate-800 mb-5">{QUIZ[quizStep].q}</h3>
                    <div className="space-y-2">
                      {QUIZ[quizStep].opts.map((opt, i) => {
                        let cls = 'border-slate-200 hover:border-purple-300 hover:bg-purple-50';
                        if (isAnswerChecked) {
                          if (opt === QUIZ[quizStep].ans) cls = 'bg-green-50 border-green-500 text-green-800';
                          else if (opt === selectedOption) cls = 'bg-red-50 border-red-400 text-red-700';
                          else cls = 'opacity-40 border-slate-200';
                        }
                        return (
                          <button key={i} onClick={() => handleCheckQuiz(opt)} disabled={isAnswerChecked}
                            className={'w-full p-3 rounded-xl border-2 text-left font-medium transition-all flex items-center justify-between text-sm ' + cls}>
                            <span>{opt}</span>
                            {isAnswerChecked && opt === QUIZ[quizStep].ans && <CheckCircle2 size={16} className="text-green-600 shrink-0" />}
                            {isAnswerChecked && opt === selectedOption && opt !== QUIZ[quizStep].ans && <XCircle size={16} className="text-red-500 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                    {isAnswerChecked && (
                      <div className="mt-4">
                        <div className={'p-3 rounded-xl text-sm mb-3 ' + (selectedOption === QUIZ[quizStep].ans ? 'bg-green-50 text-green-800' : 'bg-orange-50 text-orange-800')}>
                          <strong>{selectedOption === QUIZ[quizStep].ans ? '✅ Tepat!' : '❌ Belum tepat.'}</strong> {QUIZ[quizStep].exp}
                        </div>
                        <button onClick={nextQuestion} className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all">
                          {quizStep < QUIZ.length-1 ? 'Lanjut →' : 'Lihat Skor'}
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Star className="w-10 h-10 text-purple-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Kuis Selesai!</h2>
                    <p className="text-slate-500 mb-2">Skor: <strong className="text-purple-600 text-2xl">{quizScore}</strong> / {QUIZ.length}</p>
                    <p className="text-sm text-slate-400 mb-8">{quizScore >= 16 ? '🎯 Excellent B2 Pronunciation!' : quizScore >= 10 ? '👍 Good job!' : '💪 Review lagi dan coba!'}</p>
                    <button onClick={restartQuiz} className="px-8 py-3 text-white rounded-xl font-bold" style={{backgroundColor:'${ACCENT_COLOR}'}}>Ulangi</button>
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

export default UpperInterPronLesson${id};
`;
}

console.log('Building Upper-Intermediate Pronunciation (B2) lessons...');
const ALL_LESSONS = [...LESSONS, ...PRON_TOPICS];
for (let id = 1; id <= 20; id++) {
  const spec = ALL_LESSONS.find(l => l.id === id) || { id, title: `Pronunciation Lesson ${id}`, subtitle: 'B2 Pronunciation Practice' };
  const code = buildFile(id, spec);
  fs.writeFileSync(path.join(OUT_DIR, `Lesson${id}.tsx`), code, 'utf8');
  console.log(`✅ Pronunciation Lesson${id}.tsx`);
}
console.log('🚀 All 20 Upper-Intermediate Pronunciation lessons built!');
