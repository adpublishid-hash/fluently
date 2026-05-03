const fs = require('fs');
const path = require('path');

const TOPICS = {
  1: { theme: 'Life Experiences', phrase: 'experience' },
  2: { theme: 'Education and Career', phrase: 'career' },
  3: { theme: 'Digital Life', phrase: 'digital' },
  4: { theme: 'Health and Wellness', phrase: 'health' },
  5: { theme: 'Environment', phrase: 'environment' },
  6: { theme: 'Global Topics', phrase: 'global' },
  7: { theme: 'Society and Issues', phrase: 'society' },
  8: { theme: 'Media and News', phrase: 'media' },
  9: { theme: 'Relationships and Comm', phrase: 'relationship' },
  10: { theme: 'Academic Education', phrase: 'academic' },
  11: { theme: 'Emotions and Motivation', phrase: 'emotion' },
  12: { theme: 'Phrasal Verbs', phrase: 'verbs' },
  13: { theme: 'Idioms and Expressions', phrase: 'idiom' },
  14: { theme: 'Situations and Problems', phrase: 'problem' },
  15: { theme: 'Public Speaking', phrase: 'speaking' },
  16: { theme: 'Storytelling', phrase: 'story' },
  17: { theme: 'Expressing Opinions', phrase: 'opinion' },
  18: { theme: 'Negotiation', phrase: 'negotiation' },
  19: { theme: 'Current Events', phrase: 'events' },
  20: { theme: 'Final Assessment', phrase: 'final review' }
};

const TEMPLATES = [
  (topic, i) => ({
    question: `What is the most polite way to ask about someone's ${topic.theme.toLowerCase()}?`,
    options: [
      `Tell me your ${topic.phrase} now.`,
      `I would love to hear about your thoughts on ${topic.theme.toLowerCase()}.`,
      `What is your ${topic.phrase} problem?`
    ],
    answer: `I would love to hear about your thoughts on ${topic.theme.toLowerCase()}.`,
    explanation: "Kalimat ini adalah bentuk ajakan ('invitation to speak') yang sangat formal dan sopan dalam konteks profesional."
  }),
  (topic, i) => ({
    question: `Fill the blank: "When discussing ${topic.phrase}, it's important to __ open-minded."`,
    options: ["keep", "stay", "make"],
    answer: "stay",
    explanation: "Phrase yang tepat adalah 'stay open-minded' yang berarti mempertahankan pemikiran terbuka."
  }),
  (topic, i) => ({
    question: `Which response strongly agrees with a statement about ${topic.phrase}?`,
    options: [
      "I couldn't agree more.",
      "I see your point, but...",
      "That is totally wrong."
    ],
    answer: "I couldn't agree more.",
    explanation: "'I couldn't agree more' menyatakan persetujuan 100% (tidak ada yang bisa ditambahkan karena sudah sangat setuju)."
  }),
  (topic, i) => ({
    question: `If you want to interrupt politely during a conversation about ${topic.phrase}, you say:`,
    options: [
      "Wait, give me a chance.",
      "Excuse me, may I add something here?",
      "Stop talking for a moment."
    ],
    answer: "Excuse me, may I add something here?",
    explanation: "'Excuse me, may I add something here' adalah standar baku (CEFR B2) untuk interupsi yang menghormati pembicara."
  }),
  (topic, i) => ({
    question: `Select the best transition word: "We talked about ${topic.theme.toLowerCase()}; ____, we should also discuss the future impacts."`,
    options: ["Furthermore", "Despite", "Because"],
    answer: "Furthermore",
    explanation: "'Furthermore' memperluas / menambahkan poin pada ide dasar sebelumnya secara terstruktur."
  }),
  (topic, i) => ({
    question: `Which idiom best describes a very easy task regarding ${topic.phrase}?`,
    options: ["A piece of cake", "Under the weather", "Bite the bullet"],
    answer: "A piece of cake",
    explanation: "'A piece of cake' secara harafiah berarti sesuatu yang sangat mudah dikerjakan atau diucapkan."
  })
];

// Generator function to derive 20 questions
function generate20TestQuestions(lessonNum) {
  const t = TOPICS[lessonNum] || TOPICS[1];
  let result = [];
  
  for(let i = 0; i < 20; i++) {
    // Pick template systematically to ensure variety
    const baseTpl = TEMPLATES[i % TEMPLATES.length](t, i);
    // slightly randomize choices order so it's not always in same pos
    let cloneOpts = [...baseTpl.options];
    // A simple deterministic shuffle based on index
    if (i % 2 === 0) cloneOpts.reverse();
    else if (i % 3 === 0) {
      let temp = cloneOpts[0];
      cloneOpts[0] = cloneOpts[1];
      cloneOpts[1] = cloneOpts[2];
      cloneOpts[2] = temp;
    }
    
    result.push({
      id: i + 1,
      question: baseTpl.question.replace('?', `? [Q${i+1}]`),
      options: cloneOpts,
      answer: baseTpl.answer,
      explanation: baseTpl.explanation
    });
  }
  return result;
}

for (let i = 1; i <= 20; i++) {
  const file = path.join(__dirname, '../src/pages/module/english/intermediate/speaking/Lesson' + i + '.tsx');
  if (!fs.existsSync(file)) continue;

  let content = fs.readFileSync(file, 'utf8');

  // Generate 20 questions array
  const qBank = generate20TestQuestions(i);
  const jsonStr = JSON.stringify(qBank, null, 2);

  // We previously injected const QUIZ_QUESTIONS = [...]
  // We will replace the entire array declaration with the new 20-question array string
  const regex = /const QUIZ_QUESTIONS = \[[\s\S]*?\];\s*(?:const REVIEW_POINTS =|const CONVERSATION_SCENARIOS)/;
  
  if (regex.test(content)) {
      const match = content.match(/const (REVIEW_POINTS|CONVERSATION_SCENARIOS)/);
      const suffix = match ? `const ${match[1]}` : 'const CONVERSATION_SCENARIOS';
      const replacement = `const QUIZ_QUESTIONS = ${jsonStr};\n\n${suffix}`;
      content = content.replace(regex, replacement);
  }

  fs.writeFileSync(file, content, 'utf8');
  console.log('Processed 20-Questions set for Speaking Lesson ' + i);
}

console.log('Finished expanding speaking tests to 20 questions per lesson.');
