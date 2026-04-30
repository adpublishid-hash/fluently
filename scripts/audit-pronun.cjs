const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src/pages/module/english/elementary/pronunciation');

for (let i = 1; i <= 15; i++) {
  const f = path.join(dir, `Lesson${i}.tsx`);
  if (!fs.existsSync(f)) continue;
  const c = fs.readFileSync(f, 'utf8');
  const hasPractice = c.includes('MINIMAL_PAIRS') || c.includes('checkPractice') || c.includes('practiceIndex');
  const hasQuiz = c.includes('QUIZ_QUESTIONS') || c.includes('quizStep');
  const hasChallengeTab = c.includes("id: 'challenge'");
  const hasOldSinglePractice = c.includes("id: 'practice'") && !hasChallengeTab;
  console.log(`L${i}: practice=${hasPractice} quiz=${hasQuiz} hasChallenge=${hasChallengeTab} singlePractice=${hasOldSinglePractice}`);
}
