// Level rubrics for speaking/writing assessment (shared with the client UI).
const rubrics = require('../data/rubrics.json');

const SKILLS = new Set(['speaking', 'writing']);
const LANGUAGE_NAMES = { english: 'English', japanese: 'Japanese', mandarin: 'Mandarin Chinese', arabic: 'Modern Standard Arabic' };

function findRubric(language, levelId, skill) {
  if (!SKILLS.has(skill)) return null;
  const level = (rubrics.languages[language] || []).find((item) => item.id === levelId);
  if (!level) return null;
  return { level, rubric: level[skill], criteria: rubrics.criteria[skill], scale: rubrics.scale };
}

function buildAssessmentPrompt({ language, skill, level, rubric, criteria, scale, task, answer }) {
  return `You are Fluently AI, a fair and precise ${LANGUAGE_NAMES[language]} examiner for Indonesian learners.

Assess the learner's ${skill === 'speaking' ? 'spoken answer (a speech-recognition transcript, so ignore punctuation and minor recognition errors)' : 'written answer'} against the level rubric.

Level: ${level.label}
Task: ${task || rubric.prompt}
Target length: ${rubric.target}
Level expectations:
${rubric.expectations.map((item, index) => `${index + 1}. ${item}`).join('\n')}
Criteria (score each 1-4):
${criteria.map((item) => `- ${item.id}: ${item.label}`).join('\n')}
Score scale:
${scale.map((item) => `${item.score} = ${item.label}: ${item.descriptor}`).join('\n')}
Reference model answer (for calibration only, do not require the same content):
${rubric.model}

Learner answer:
"""${answer}"""

Rules:
- Judge against THIS level, not native perfection. Do not overpraise; an off-task or very short answer cannot score above 2 for task/fluency.
- Write all feedback in Indonesian. Quote the learner's exact words when pointing out an error.
- "corrected" must be the learner's answer rewritten correctly at this level (keep their ideas), in ${LANGUAGE_NAMES[language]}.

Return valid JSON only:
{
  "scores": { ${criteria.map((item) => `"${item.id}": 1-4`).join(', ')} },
  "summary": "1-2 kalimat penilaian umum",
  "strengths": ["..."],
  "improvements": ["kesalahan/perbaikan spesifik"],
  "corrected": "versi yang diperbaiki",
  "nextStep": "satu latihan konkret berikutnya"
}`;
}

/** Validates the model output; returns null when it is unusable. */
function normalizeAssessment(parsed, criteria) {
  if (!parsed || typeof parsed !== 'object' || !parsed.scores || typeof parsed.scores !== 'object') return null;
  const scores = {};
  for (const item of criteria) {
    const value = Math.round(Number(parsed.scores[item.id]));
    if (!Number.isFinite(value)) return null;
    scores[item.id] = Math.min(4, Math.max(1, value));
  }
  const total = Object.values(scores).reduce((sum, value) => sum + value, 0);
  const list = (value) => (Array.isArray(value) ? value.map((row) => String(row).slice(0, 400)).filter(Boolean).slice(0, 6) : []);
  return {
    scores,
    overall: Math.round((total / (criteria.length * 4)) * 100),
    summary: String(parsed.summary || '').slice(0, 600),
    strengths: list(parsed.strengths),
    improvements: list(parsed.improvements),
    corrected: String(parsed.corrected || '').slice(0, 4000),
    nextStep: String(parsed.nextStep || '').slice(0, 400),
  };
}

module.exports = { rubrics, findRubric, buildAssessmentPrompt, normalizeAssessment };
