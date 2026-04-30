const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src/pages/module/english/elementary/speaking');
console.log('Starting expansion...');

for (let i = 1; i <= 15; i++) {
    const file = path.join(dir, `Lesson${i}.tsx`);
    if (!fs.existsSync(file)) {
        console.log(`File not found: Lesson${i}.tsx`);
        continue;
    }
    let content = fs.readFileSync(file, 'utf8');

    // Fix Lesson 11 blank bug first
    if (i === 11) {
        content = content.replace(/<PlayCircle/g, '<Play');
    }

    // Determine current questions length
    const existingBlockRegex = /const PRACTICE_QUESTIONS = \[([\s\S]*?)\];/;
    let match = content.match(existingBlockRegex);
    if (!match) continue;
    
    // Check if we already have >5 questions to avoid double appending
    const idMatches = [...match[1].matchAll(/id:\s*(\d+)/g)];
    if (idMatches.length >= 15) {
        console.log(`Lesson ${i} already has ${idMatches.length} questions. Skipping append.`);
        if (i === 11) {
             fs.writeFileSync(file, content, 'utf8'); // save the fix
             console.log(`Saved Lesson 11 fix.`);
        }
        continue;
    }

    // extract scenarios dialogue lines
    // matching: text: "...", translation: "..."
    const dialogueRegex = /text:\s*(["'])(.*?)\1,\s*translation:\s*(["'])(.*?)\3/g;
    let matches;
    let lines = [];
    while ((matches = dialogueRegex.exec(content)) !== null) {
        lines.push({ text: matches[2], translation: matches[4] });
    }

    if (lines.length < 5) {
        console.log(`Not enough dialogue lines in Lesson ${i} (${lines.length} lines). Cannot safely expand.`);
        continue;
    }

    // We want to add exactly enough questions to reach 20.
    const needed = 20 - idMatches.length;

    // We prefer unique lines
    // shuffle lines
    let randomLines = [...lines];
    for(let j = randomLines.length - 1; j > 0; j--) {
        const k = Math.floor(Math.random() * (j + 1));
        [randomLines[j], randomLines[k]] = [randomLines[k], randomLines[j]];
    }

    let newQuestions = [];
    let startId = idMatches.length ? parseInt(idMatches[idMatches.length-1][1]) + 1 : 6;

    for(let q = 0; q < needed; q++) {
        let line = randomLines[q % randomLines.length];
        let type = q % 3; // 0: trans to id, 1: trans to en, 2: fill blank
        
        let prompt, correctText, explanation;
        let wrong1, wrong2;
        
        const getWrongText = (excludeText, isTranslation) => {
             let pool = lines.filter(l => (isTranslation ? l.translation : l.text) !== excludeText);
             if (pool.length === 0) pool = lines;
             return isTranslation ? pool[Math.floor(Math.random()*pool.length)].translation : pool[Math.floor(Math.random()*pool.length)].text;
        };

        if (type === 0) {
            prompt = `Apa arti dari kalimat: "${line.text}"?`;
            correctText = line.translation;
            wrong1 = getWrongText(line.translation, true);
            wrong2 = getWrongText(line.translation, true);
            if(wrong1 === wrong2 || wrong1 === correctText || wrong2 === correctText) {
                wrong1 += " (sekitar sini)";
                wrong2 += " (bukan ini)";
            }
            explanation = `Kalimat "${line.text}" memiliki arti "${line.translation}".`;
        } else if (type === 1) {
            prompt = `Bagaimana cara mengatakan: "${line.translation}"?`;
            correctText = line.text;
            wrong1 = getWrongText(line.text, false);
            wrong2 = getWrongText(line.text, false);
            if(wrong1 === wrong2 || wrong1 === correctText || wrong2 === correctText) {
                wrong1 += " (opsi lain)";
                wrong2 += " (opsi salah)";
            }
            explanation = `Terjemahan yang tepat untuk "${line.translation}" adalah "${line.text}".`;
        } else {
            // Fill in the blank
            let words = line.text.split(' ');
            if (words.length >= 3) {
                // target a word between index 1 and length-1 (not the first/last ideally)
                let targetIdx = Math.floor(Math.random() * (words.length - 1)) + 1;
                let targetWordWithPunct = words[targetIdx];
                let targetWord = words[targetIdx].replace(/[.,?!]/g, '');
                
                if (targetWord.length < 2) {
                    targetIdx = 0;
                    targetWordWithPunct = words[targetIdx];
                    targetWord = targetWordWithPunct.replace(/[.,?!]/g, '');
                }
                
                let hiddenText = line.text.replace(targetWordWithPunct, `___${targetWordWithPunct.replace(targetWord, '')}`);
                prompt = `Lengkapi kalimat: "${hiddenText}"\n(Arti: ${line.translation})`;
                correctText = targetWord;
                
                // Get wrong words from other random lines
                let wrongLine1 = randomLines[(q + 1) % randomLines.length].text.split(' ');
                let wrongLine2 = randomLines[(q + 2) % randomLines.length].text.split(' ');
                wrong1 = (wrongLine1[Math.floor(Math.random() * wrongLine1.length)] || "is").replace(/[.,?!"]/g, '');
                wrong2 = (wrongLine2[Math.floor(Math.random() * wrongLine2.length)] || "are").replace(/[.,?!"]/g, '');
                
                if(wrong1 === wrong2 || wrong1 === correctText || wrong2 === correctText) {
                    wrong1 = "do";
                    wrong2 = "does";
                }
                if(wrong1 === correctText) wrong1 = "well";
                if(wrong2 === correctText) wrong2 = "good";

                explanation = `Kata yang hilang untuk melengkapi kalimat tersebut adalah '${targetWord}'.`;
            } else {
                prompt = `Apa arti dari kalimat: "${line.text}"?`;
                correctText = line.translation;
                wrong1 = getWrongText(line.translation, true) + "!";
                wrong2 = getWrongText(line.translation, true) + "?";
                explanation = `Kalimat "${line.text}" secara persis berarti "${line.translation}".`;
            }
        }

        // randomize options safely
        let opts = [
            { text: correctText, correct: true },
            { text: wrong1, correct: false },
            { text: wrong2, correct: false }
        ];
        opts.sort(() => Math.random() - 0.5);

        newQuestions.push(`  {
    id: ${startId + q},
    prompt: ${JSON.stringify(prompt)},
    options: [
      { text: ${JSON.stringify(opts[0].text)}, correct: ${opts[0].correct} },
      { text: ${JSON.stringify(opts[1].text)}, correct: ${opts[1].correct} },
      { text: ${JSON.stringify(opts[2].text)}, correct: ${opts[2].correct} }
    ],
    explanation: ${JSON.stringify(explanation)}
  }`);
    }

    let insideArray = match[1].trim();
    if (insideArray.length > 0 && !insideArray.endsWith(',')) {
        insideArray += ',';
    }
    
    let newContent = content.replace(existingBlockRegex, `const PRACTICE_QUESTIONS = [\n${insideArray}\n${newQuestions.join(',\n')}\n];`);

    fs.writeFileSync(file, newContent, 'utf8');
    console.log(`Updated Lesson ${i} with ${needed} new questions (Total: 20).`);
}
console.log('Expansion complete!');

