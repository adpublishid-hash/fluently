const fs = require('fs');
const path = require('path');

const SWAPS = [
    { regex: /\bShe\b/g, replacements: ['He', 'My sister', 'The girl', 'My mother', 'Anna'] },
    { regex: /\bshe\b/g, replacements: ['he', 'the girl'] },
    { regex: /\bHe\b/g, replacements: ['She', 'My brother', 'The boy', 'My father', 'Mark'] },
    { regex: /\bhe\b/g, replacements: ['she', 'the boy'] },
    { regex: /\bWe\b/g, replacements: ['They', 'My friends', 'The students', 'My parents'] },
    { regex: /\bwe\b/g, replacements: ['they', 'my friends'] },
    { regex: /\bThey\b/g, replacements: ['We', 'The dogs', 'The teachers'] },
    { regex: /\bthey\b/g, replacements: ['we', 'the kids'] },
    { regex: /\bLondon\b/g, replacements: ['Paris', 'Tokyo', 'New York', 'Sydney', 'Jakarta'] },
    { regex: /\bpizza\b/g, replacements: ['sushi', 'burger', 'pasta', 'chicken', 'cake'] },
    { regex: /\bfootball\b/g, replacements: ['tennis', 'basketball', 'golf', 'chess'] },
    { regex: /\bcar\b/g, replacements: ['bus', 'truck', 'van', 'bike', 'motorcycle'] },
    { regex: /\btired\b/g, replacements: ['hungry', 'thirsty', 'angry', 'sad', 'happy'] },
    { regex: /\bbusy\b/g, replacements: ['ready', 'present', 'late', 'early', 'awake'] },
    { regex: /\bhappy\b/g, replacements: ['sad', 'bored', 'excited', 'upset'] },
    { regex: /\byesterday\b/g, replacements: ['last night', 'this morning', 'last week', 'last month'] },
    { regex: /\btoday\b/g, replacements: ['this morning', 'this afternoon', 'tonight'] },
    { regex: /\btomorrow\b/g, replacements: ['next week', 'soon', 'later'] },
    { regex: /\bbrother\b/g, replacements: ['sister', 'friend', 'cousin', 'uncle'] },
    { regex: /\bapple\b/g, replacements: ['orange', 'banana', 'mango', 'peach'] },
    { regex: /\bJohn\b/g, replacements: ['Mark', 'Alex', 'David', 'Chris', 'Tom'] },
    { regex: /\bMary\b/g, replacements: ['Sarah', 'Emma', 'Lisa', 'Anna', 'Jane'] },
    { regex: /\bdog\b/g, replacements: ['cat', 'bird', 'rabbit', 'fish'] },
    { regex: /\bbook\b/g, replacements: ['magazine', 'newspaper', 'comic', 'novel'] },
    { regex: /\bwater\b/g, replacements: ['coffee', 'tea', 'milk', 'juice'] },
    { regex: /\bhouse\b/g, replacements: ['apartment', 'flat', 'office', 'school'] },
    { regex: /\bfast\b/g, replacements: ['quick', 'rapid'] },
    { regex: /\bad\b/g, replacements: ['terrible', 'awful', 'poor'] },
    { regex: /\bgood\b/g, replacements: ['great', 'excellent', 'nice'] },
];

function generateVariations(baseQuestion, count, startIndex) {
    let variations = [];
    for (let c = 0; c < count; c++) {
        let q = JSON.parse(JSON.stringify(baseQuestion));
        q.id = startIndex + c;
        
        let swapsToApply = SWAPS.filter(() => Math.random() > 0.5); // 50% chance for each swap rule
        
        swapsToApply.forEach(swap => {
            let replacer = swap.replacements[Math.floor(Math.random() * swap.replacements.length)];
            if(q.question) q.question = q.question.replace(swap.regex, replacer);
            if(q.answer) q.answer = q.answer.replace(swap.regex, replacer);
            if(q.options) q.options = q.options.map(o => o.replace(swap.regex, replacer));
            if(q.explanation) q.explanation = q.explanation.replace(swap.regex, replacer);
        });
        
        variations.push(q);
    }
    return variations;
}

const dir = path.join(__dirname, '../src/pages/module/english/elementary/grammar');
console.log('Starting grammar expansion...');

for (let i = 1; i <= 20; i++) {
    const file = path.join(dir, `Lesson${i}.tsx`);
    if (!fs.existsSync(file)) {
        console.log(`Missing Lesson${i}.tsx`);
        continue;
    }
    
    let content = fs.readFileSync(file, 'utf8');
    
    // find QUIZ_QUESTIONS array
    const existingBlockRegex = /const QUIZ_QUESTIONS = \[([\s\S]*?)\];/;
    let match = content.match(existingBlockRegex);
    if (!match) continue;

    let arrayContent = match[1].trim();
    // parse base questions loosely by extracting objects based on their braces
    let questions = [];
    // very naive JS object parser since JSON.parse won't work on rough JS strings
    let matches = arrayContent.match(/\{[\s\S]*?\}/g);
    if (!matches || matches.length < 5) {
        console.log(`Lesson ${i} has fewer than 5 object blocks, skipping.`);
        continue;
    }
    
    if (matches.length >= 15) {
        console.log(`Lesson ${i} already has ${matches.length} questions. Skipping.`);
        continue;
    }

    // Rather than fully parsing the JS objects, we can construct the base manually 
    // or just regex parts. It's safer to extract via eval but we can't eval easily.
    // Let's use Function to safely parse the array
    let baseArray;
    try {
        baseArray = new Function(`return [${arrayContent}]`)();
    } catch(e) {
        console.log(`Lesson ${i}: Failed to parse array. Skipping.`);
        continue;
    }

    let needed = 20 - baseArray.length;
    let newQuestions = [];
    let startId = baseArray.length ? baseArray[baseArray.length - 1].id + 1 : 6;

    // Use modulo to cycle through base questions so we expand evenly
    for (let c = 0; c < needed; c++) {
        let baseQ = baseArray[c % baseArray.length];
        let vars = generateVariations(baseQ, 1, startId + c);
        newQuestions.push(vars[0]);
    }

    // Convert new questions back to JS string
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
console.log('Grammar expansion complete!');
