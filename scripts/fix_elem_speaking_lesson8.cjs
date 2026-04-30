const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'src', 'pages', 'module', 'english', 'elementary', 'speaking', 'Lesson8.tsx');
const code = fs.readFileSync(file, 'utf8');
const lines = code.split(/\r?\n/);

// Keep lines 1-211 (indices 0-210) then replace 212-606 with clean questions 7-20
const head = lines.slice(0, 211); // up to and including "  },"  (end of q6)
const tail = lines.slice(606);    // from "];" onward

const replacement = `  {
    id: 7,
    prompt: "Bagaimana cara mengatakan: \\"Ya, kita ganti di Stasiun Pusat.\\"?",
    options: [
      { text: "Let me check the tracking system.", correct: false },
      { text: "Okay, it is five pounds per day.", correct: false },
      { text: "Yes, we change at Central Station.", correct: true }
    ],
    explanation: "Terjemahan yang tepat untuk \\"Ya, kita ganti di Stasiun Pusat.\\" adalah \\"Yes, we change at Central Station.\\"."
  },
  {
    id: 8,
    prompt: "Lengkapi kalimat: \\"I ___ it is not too heavy.\\"\\n(Arti: Saya harap tidak terlalu berat.)",
    options: [
      { text: "you", correct: false },
      { text: "Which", correct: false },
      { text: "hope", correct: true }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'hope'."
  },
  {
    id: 9,
    prompt: "Apa arti dari kalimat: \\"I am sorry. Can you describe it?\\"?",
    options: [
      { text: "Mau ke mana, Pak?", correct: false },
      { text: "Maaf. Bisakah Anda mendeskripsikannya?", correct: true },
      { text: "Oke, harganya lima pound per hari.", correct: false }
    ],
    explanation: "Kalimat \\"I am sorry. Can you describe it?\\" memiliki arti \\"Maaf. Bisakah Anda mendeskripsikannya?\\"."
  },
  {
    id: 10,
    prompt: "Bagaimana cara mengatakan: \\"Jalur mana yang ke stadion?\\"?",
    options: [
      { text: "Sure. It will take about 20 minutes.", correct: false },
      { text: "Return, please. Coming back today.", correct: false },
      { text: "Which line goes to the stadium?", correct: true }
    ],
    explanation: "Terjemahan yang tepat untuk \\"Jalur mana yang ke stadion?\\" adalah \\"Which line goes to the stadium?\\"."
  },
  {
    id: 11,
    prompt: "Lengkapi kalimat: \\"May I see your passport ___ ticket?\\"\\n(Arti: Boleh lihat paspor dan tiket Anda?)",
    options: [
      { text: "was", correct: false },
      { text: "One", correct: false },
      { text: "and", correct: true }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'and'."
  },
  {
    id: 12,
    prompt: "Apa arti dari kalimat: \\"Yes, the view was beautiful.\\"?",
    options: [
      { text: "Ya, pemandangannya indah.", correct: true },
      { text: "Oh tidak. Berapa lama penundaannya?", correct: false },
      { text: "Maaf. Bisakah Anda mendeskripsikannya?", correct: false }
    ],
    explanation: "Kalimat \\"Yes, the view was beautiful.\\" memiliki arti \\"Ya, pemandangannya indah.\\"."
  },
  {
    id: 13,
    prompt: "Bagaimana cara mengatakan: \\"Satu tiket ke London, tolong.\\"?",
    options: [
      { text: "Yes, please put it on the scale.", correct: false },
      { text: "We will miss our connection!", correct: false },
      { text: "One ticket to London, please.", correct: true }
    ],
    explanation: "Terjemahan yang tepat untuk \\"Satu tiket ke London, tolong.\\" adalah \\"One ticket to London, please.\\"."
  },
  {
    id: 14,
    prompt: "Lengkapi kalimat: \\"They said about ___ hours.\\"\\n(Arti: Mereka bilang sekitar dua jam.)",
    options: [
      { text: "think", correct: false },
      { text: "Yes", correct: false },
      { text: "two", correct: true }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'two'."
  },
  {
    id: 15,
    prompt: "Apa arti dari kalimat: \\"Yes, here is my international license.\\"?",
    options: [
      { text: "Saya harap tidak terlalu berat.", correct: false },
      { text: "Tolong cepat, saya ada rapat.", correct: false },
      { text: "Ya, ini SIM internasional saya.", correct: true }
    ],
    explanation: "Kalimat \\"Yes, here is my international license.\\" memiliki arti \\"Ya, ini SIM internasional saya.\\"."
  },
  {
    id: 16,
    prompt: "Bagaimana cara mengatakan: \\"Sepertinya Jalur Merah.\\"?",
    options: [
      { text: "Do you have a driving license?", correct: false },
      { text: "I think it is the Red Line.", correct: true },
      { text: "Please hurry, I have a meeting.", correct: false }
    ],
    explanation: "Terjemahan yang tepat untuk \\"Sepertinya Jalur Merah.\\" adalah \\"I think it is the Red Line.\\"."
  },
  {
    id: 17,
    prompt: "Lengkapi kalimat: \\"Okay, it is ___ per day.\\"\\n(Arti: Oke, harganya lima pound per hari.)",
    options: [
      { text: "minutes", correct: false },
      { text: "you", correct: false },
      { text: "five pounds", correct: true }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'five pounds'."
  },
  {
    id: 18,
    prompt: "Apa arti dari kalimat: \\"No, you need the number 10 bus.\\"?",
    options: [
      { text: "Tidak, Anda butuh bus nomor 10.", correct: true },
      { text: "Baik. Akan memakan waktu sekitar 20 menit.", correct: false },
      { text: "Biar saya cek sistem pelacakannya.", correct: false }
    ],
    explanation: "Kalimat \\"No, you need the number 10 bus.\\" memiliki arti \\"Tidak, Anda butuh bus nomor 10.\\"."
  },
  {
    id: 19,
    prompt: "Bagaimana cara mengatakan: \\"Baik. Akan memakan waktu sekitar 20 menit.\\"?",
    options: [
      { text: "Sure. It will take about 20 minutes.", correct: true },
      { text: "Did you visit the Eiffel Tower?", correct: false },
      { text: "That will be twenty-five pounds. Platform 4.", correct: false }
    ],
    explanation: "Terjemahan yang tepat untuk \\"Baik. Akan memakan waktu sekitar 20 menit.\\" adalah \\"Sure. It will take about 20 minutes.\\"."
  },
  {
    id: 20,
    prompt: "Lengkapi kalimat: \\"___ you have a driving license?\\"\\n(Arti: Apakah Anda punya SIM?)",
    options: [
      { text: "Do", correct: true },
      { text: "please", correct: false },
      { text: "catch", correct: false }
    ],
    explanation: "Kata yang hilang untuk melengkapi kalimat tersebut adalah 'Do'."
  }`;

const out = [...head, replacement, ...tail].join('\n');
fs.writeFileSync(file, out);
console.log('Rebuilt PRACTICE_QUESTIONS in speaking/Lesson8.tsx');
