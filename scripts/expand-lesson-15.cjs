const fs = require('fs');
const path = require('path');

const PHONETIC_SWAPS = [
    { regex: /\bSeat\b/g, replacements: ['Meet', 'Greet', 'Sheet'] },
    { regex: /\bwent\b/g, replacements: ['walked', 'ran', 'drove'] },
    { regex: /\bpark\b/g, replacements: ['store', 'school', 'house'] },
    { regex: /\bstarted\b/g, replacements: ['wanted', 'needed', 'waited'] },
    { regex: /\bKata mana yang/g, replacements: ['Manakah kata yang', 'Pilih kata yang'] }
];

function generateVariations(baseQuestion, count, startIndex) {
    let variations = [];
    for (let c = 0; c < count; c++) {
        let q = JSON.parse(JSON.stringify(baseQuestion));
        q.id = startIndex + c;
        PHONETIC_SWAPS.forEach(swap => {
            if (Math.random() > 0.3) {
                let replacer = swap.replacements[Math.floor(Math.random() * swap.replacements.length)];
                if(q.question) q.question = q.question.replace(swap.regex, replacer);
                if(q.answer) q.answer = q.answer.replace(swap.regex, replacer);
                if(q.options) q.options = q.options.map(o => o.replace(swap.regex, replacer));
            }
        });
        variations.push(q);
    }
    return variations;
}

const file = path.join(__dirname, '../src/pages/module/english/elementary/pronunciation/Lesson15.tsx');
let content = fs.readFileSync(file, 'utf8');
const existingBlockRegex = /const FINAL_QUIZ_QUESTIONS = \[([\s\S]*?)\];/;
let match = content.match(existingBlockRegex);
let arrayContent = match[1].trim();
let baseArray = new Function(`return [${arrayContent}]`)();
let needed = 20 - baseArray.length;
let newQuestions = [];
let startId = baseArray[baseArray.length - 1].id + 1;

for (let c = 0; c < needed; c++) {
    let baseQ = baseArray[c % baseArray.length];
    let vars = generateVariations(baseQ, 1, startId + c);
    newQuestions.push(vars[0]);
}

let newChunk = newQuestions.map(q => {
    return `  {
    id: ${q.id},
    question: ${JSON.stringify(q.question)},
    options: ${JSON.stringify(q.options)},
    answer: ${JSON.stringify(q.answer)},
    explanation: ${JSON.stringify(q.explanation)}
  }`;
}).join(',\n');

let newFullArrayStr = `const FINAL_QUIZ_QUESTIONS = [\n${arrayContent}${arrayContent.endsWith(',') ? '' : ','}\n${newChunk}\n];`;
let newContent = content.replace(existingBlockRegex, () => newFullArrayStr);
fs.writeFileSync(file, newContent, 'utf8');
console.log('Lesson 15 expansion complete!');
