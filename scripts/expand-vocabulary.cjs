const fs = require('fs');
const path = require('path');

const VOCAB_SWAPS = [
    { regex: /\bHe\b/g, replacements: ['She', 'My friend', 'My brother', 'Tom', 'The man'] },
    { regex: /\bshe\b/gi, replacements: ['he', 'my friend', 'the woman'] },
    { regex: /\bShe\b/g, replacements: ['He', 'My sister', 'The woman', 'Anna', 'My mother'] },
    { regex: /\bhis\b/g, replacements: ['her', 'my', 'our'] },
    { regex: /\bHer\b/g, replacements: ['His', 'My', 'Our'] },
    { regex: /\bshop\b/g, replacements: ['store', 'market', 'boutique'] },
    { regex: /\bbuy\b/g, replacements: ['purchase', 'get'] },
    { regex: /\bbuys\b/g, replacements: ['purchases', 'gets'] },
    { regex: /\bhappiness\b/gi, replacements: ['joy', 'delight', 'pleasure'] },
    { regex: /\bmoney\b/g, replacements: ['cash', 'funds'] },
    { regex: /\bwork\b/g, replacements: ['job', 'office'] },
    { regex: /\boffice\b/g, replacements: ['company', 'building'] },
    { regex: /\bWhich sentence is correct\?/g, replacements: ['Choose the correct sentence.', 'Identify the right sentence.'] },
    { regex: /\bpeople\b/g, replacements: ['individuals', 'persons'] },
    // A lot of vocabulary answers require the sentence context to be identical,
    // so just lightly perturbing subject pronouns is the safest way to generate "new" iterations
    // without breaking the vocabulary context clue (e.g. "He likes to give money to charity -> She likes...")
];

function generateVariations(baseQuestion, count, startIndex) {
    let variations = [];
    for (let c = 0; c < count; c++) {
        let q = JSON.parse(JSON.stringify(baseQuestion));
        q.id = startIndex + c;
        VOCAB_SWAPS.forEach(swap => {
            if (Math.random() > 0.4) {
                let replacer = swap.replacements[Math.floor(Math.random() * swap.replacements.length)];
                if(q.question) q.question = q.question.replace(swap.regex, replacer);
                if(q.answer) q.answer = q.answer.replace(swap.regex, replacer);
                // Be careful not to replace things in options since they are the actual vocab words
                // only replace if options is full sentences
            }
        });
        variations.push(q);
    }
    return variations;
}

const dir = path.join(__dirname, '../src/pages/module/english/elementary/vocabulary');
console.log('Starting vocabulary expansion...');

for (let i = 2; i <= 15; i++) {
    const file = path.join(dir, `Lesson${i}.tsx`);
    if (!fs.existsSync(file)) {
        console.log(`Missing Lesson${i}.tsx`);
        continue;
    }
    
    let content = fs.readFileSync(file, 'utf8');
    
    const existingBlockRegex = /const QUIZ_QUESTIONS = \[([\s\S]*?)\];/;
    let match = content.match(existingBlockRegex);
    if (!match) {
        console.log(`Lesson ${i} has no QUIZ_QUESTIONS array. Skipping.`);
        continue;
    }

    let arrayContent = match[1].trim();
    let matches = arrayContent.match(/\{[\s\S]*?\}/g);
    if (!matches || matches.length < 1) {
        console.log(`Lesson ${i} has no base question. Skipping.`);
        continue;
    }
    
    if (matches.length >= 15) {
        console.log(`Lesson ${i} already expanded. Skipping.`);
        continue;
    }

    let baseArray;
    try {
        baseArray = new Function(`return [${arrayContent}]`)();
    } catch(e) {
        console.log(`Lesson ${i}: Failed to parse array securely. Skipping.`);
        continue;
    }

    let needed = 20 - baseArray.length;
    let newQuestions = [];
    let startId = baseArray.length ? baseArray[baseArray.length - 1].id + 1 : 6;

    for (let c = 0; c < needed; c++) {
        let baseQ = baseArray[c % baseArray.length];
        let vars = generateVariations(baseQ, 1, startId + c);
        
        let q = vars[0];
        let uniqueOpts = Array.from(new Set(q.options));
        if (uniqueOpts.length < q.options.length) {
            q.options = baseQ.options;
            q.answer = baseQ.answer;
        }
        
        newQuestions.push(q);
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

    let newFullArrayStr = `const QUIZ_QUESTIONS = [\n${arrayContent}${arrayContent.endsWith(',') ? '' : ','}\n${newChunk}\n];`;
    
    let newContent = content.replace(existingBlockRegex, () => newFullArrayStr);
    fs.writeFileSync(file, newContent, 'utf8');
    console.log(`Updated Lesson ${i} with ${needed} new questions.`);
}
console.log('Vocabulary expansion complete!');
