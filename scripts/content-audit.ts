// Prints a coverage/quality report for generated lessons.
// Usage: npm run content:audit
import { runContentAudit } from '../src/content/contentAudit';

const rows = runContentAudit();
const percent = (value: number) => `${Math.round(value * 100)}%`;

console.log('language   level                lessons  questions  invalid  dup-lessons  answer-first  unique-q');
rows.forEach((row) => {
  console.log(
    [
      row.language.padEnd(10),
      row.level.padEnd(20),
      String(row.lessons).padStart(7),
      String(row.questions).padStart(10),
      String(row.invalidQuestions.length).padStart(8),
      String(row.duplicateLessons.length).padStart(12),
      percent(row.answerFirstRatio).padStart(13),
      percent(row.uniqueQuestionRatio).padStart(9),
    ].join(' '),
  );
});

const failing = rows.filter((row) => row.invalidQuestions.length || row.duplicateLessons.length);
failing.forEach((row) => {
  console.log(`\n${row.language}/${row.level}`);
  row.invalidQuestions.slice(0, 5).forEach((item) => console.log(`  invalid: ${item}`));
  row.duplicateLessons.slice(0, 5).forEach((item) => console.log(`  duplicate: ${item}`));
});
