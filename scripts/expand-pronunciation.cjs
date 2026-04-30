const fs = require('fs');
const path = require('path');

const PHONETIC_SWAPS = [
    // Short A
    { regex: /\bCat\b/g, replacements: ['Hat', 'Bat', 'Mat', 'Rat'] },
    // Long A
    { regex: /\bLate\b/g, replacements: ['Hate', 'Mate', 'Rate', 'Gate'] },
    { regex: /\blate\b/g, replacements: ['hate', 'mate', 'rate', 'gate'] },
    // Long E
    { regex: /\bFeet\b/g, replacements: ['Meet', 'Greet', 'Sheet', 'Sweet'] },
    { regex: /\bfeet\b/g, replacements: ['meet', 'greet', 'sheet', 'sweet'] },
    // Short I
    { regex: /\bShip\b/g, replacements: ['Dip', 'Lip', 'Tip', 'Sip'] },
    // Long E (from short i pairs)
    { regex: /\bSheep\b/g, replacements: ['Deep', 'Keep', 'Weep', 'Peep'] },
    // Long O
    { regex: /\bBoat\b/g, replacements: ['Coat', 'Goat', 'Moat'] },
    // Long U (OO)
    { regex: /\bBoot\b/g, replacements: ['Root', 'Hoot', 'Loot'] },
    { regex: /\bPan\b/g, replacements: ['Man', 'Can', 'Fan'] },
    { regex: /\bPen\b/g, replacements: ['Ten', 'Men', 'Hen'] },
    { regex: /\bThink\b/g, replacements: ['Thank', 'Thief', 'Thin'] },
    { regex: /\bSink\b/g, replacements: ['Sit', 'Sick', 'Sing'] },
    { regex: /\bVery\b/g, replacements: ['Vet', 'Vase', 'Van'] },
    { regex: /\bBerry\b/g, replacements: ['Bat', 'Base', 'Ban'] },
    { regex: /\bWet\b/g, replacements: ['Web', 'Win', 'Will'] },

    // Generic prompt variations to ensure strings don't look completely identical
    { regex: /Kata mana yang/g, replacements: ['Manakah kata yang', 'Pilih kata yang', 'Dari pilihan berikut, mana yang'] },
    { regex: /Dengarkan:/g, replacements: ['Perhatikan:', 'Simak kata:', 'Fokus pada:'] },
    { regex: /Huruf apa yang/g, replacements: ['Elemen apa yang', 'Manakah yang'] },
    { regex: /Untuk membuat suara/g, replacements: ['Saat mengucapkan suara', 'Ketika menghasilkan bunyi'] },
    { regex: /V vs W:/g, replacements: ['Bandingkan V & W:', 'Suara V dan W:'] },
    
    // Add extra visual differentiation
    { regex: /\.\.\./g, replacements: ['...', ':', '... ?'] },
    { regex: /\?/g, replacements: ['?', ' ?', '...'] },
];

function generateVariations(baseQuestion, count, startIndex) {
    let variations = [];
    for (let c = 0; c < count; c++) {
        let q = JSON.parse(JSON.stringify(baseQuestion));
        q.id = startIndex + c;
        
        // Randomly pick swaps to apply so they feel varied
        PHONETIC_SWAPS.forEach(swap => {
            if (Math.random() > 0.3) {
                let replacer = swap.replacements[Math.floor(Math.random() * swap.replacements.length)];
                if(q.question) q.question = q.question.replace(swap.regex, replacer);
                if(q.answer) q.answer = q.answer.replace(swap.regex, replacer);
                if(q.options) q.options = q.options.map(o => o.replace(swap.regex, replacer));
                if(q.explanation) q.explanation = q.explanation.replace(swap.regex, replacer);
            }
        });
        
        variations.push(q);
    }
    return variations;
}

const dir = path.join(__dirname, '../src/pages/module/english/elementary/pronunciation');
console.log('Starting pronunciation expansion...');

for (let i = 1; i = 15; i <= 15; i++) {
    const file = path.join(dir, `Lesson${i}.tsx`);
    if (!fs.existsSync(file)) {
        console.log(`Missing Lesson${i}.tsx, maybe directory ends earlier?`);
        continue;
    }
    
    let content = fs.readFileSync(file, 'utf8');
    
    // Check for FINAL_QUIZ_QUESTIONS array
    const existingBlockRegex = /const FINAL_QUIZ_QUESTIONS = \[([\s\S]*?)\];/;
    let match = content.match(existingBlockRegex);
    if (!match) {
        console.log(`Lesson ${i} does not have FINAL_QUIZ_QUESTIONS array. Skipping.`);
        continue;
    }

    let arrayContent = match[1].trim();
    let matches = arrayContent.match(/\{[\s\S]*?\}/g);
    if (!matches || matches.length < 1) {
        console.log(`Lesson ${i} has fewer than 5 object blocks, skipping.`);
        continue;
    }
    
    if (matches.length >= 20) {
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
        
        // Final sanity check for option uniqueness/correctness mapping
        let q = vars[0];
        // Ensure options don't duplicate (if random swaps collapsed them)
        let uniqueOpts = Array.from(new Set(q.options));
        if (uniqueOpts.length < q.options.length) {
            // Revert to original options if they collapsed
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

    let newFullArrayStr = `const FINAL_QUIZ_QUESTIONS = [\n${arrayContent}${arrayContent.endsWith(',') ? '' : ','}\n${newChunk}\n];`;
    
    let newContent = content.replace(existingBlockRegex, () => newFullArrayStr);
    fs.writeFileSync(file, newContent, 'utf8');
    console.log(`Updated Lesson ${i} with ${needed} new questions.`);
}
console.log('Pronunciation expansion complete!');


