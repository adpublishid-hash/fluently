import { aiFetch } from '../../services/aiClient';
import { buildFormattedExam, examFormats, type ExamPart, type FormattedQuestion } from './examFormats';
import type { StudyLanguage } from './studyBank';

// AI-generated mock exams: each official part is requested from
// /api/ai/exam-section in parallel; any part (or missing items in it) that the
// AI cannot deliver is filled from the built-in question bank.

type GeneratedQuestion = { type: string; stem: string; options: string[]; answer: number; explanation: string };
type GeneratedGroup = { title: string; passage: string; audio: string; questions: GeneratedQuestion[] };

export type WritingTask = { prompt: string; instruction: string; words: string[]; target: string };

export type AiExamPartStatus = { partId: string; generated: number; fromBank: number };

export type AiExam = {
  questions: FormattedQuestion[];
  parts: AiExamPartStatus[];
  writing: { part: ExamPart; task: WritingTask } | null;
};

const sectionOf: Record<ExamPart['kind'], FormattedQuestion['section']> = {
  listening: 'Menyimak',
  reading: 'Membaca',
  vocabulary: 'Kosakata',
  grammar: 'Tata bahasa',
};

// HSK 书写 is only in the AI paper; it needs a rubric-based assessment.
const writingParts: Partial<Record<StudyLanguage, ExamPart & { minLevel: number }>> = {
  mandarin: { id: 'shuxie', native: '书写', label: 'Menulis', kind: 'vocabulary', count: 1, minLevel: 2 },
};

export function getAiWritingPart(language: StudyLanguage, levelIndex: number): ExamPart | null {
  const part = writingParts[language];
  return part && levelIndex >= part.minLevel ? part : null;
}

/** Turns generated groups into exam questions (listening text becomes audio-only). */
export function toFormattedQuestions(part: ExamPart, level: string, groups: GeneratedGroup[]): FormattedQuestion[] {
  return groups.flatMap((group) => group.questions
    .filter((item) => item.options[item.answer] !== undefined)
    .map((item) => ({
      question: item.stem,
      options: item.options,
      answer: item.options[item.answer],
      part: part.id,
      section: sectionOf[part.kind],
      level,
      type: item.type || undefined,
      explanation: item.explanation || undefined,
      ...(group.audio ? { audio: group.audio } : {}),
      ...(group.passage ? { context: { title: group.title || part.native, text: group.passage } } : {}),
    })));
}

async function requestSection(language: StudyLanguage, levelId: string, partId: string, seed: string) {
  const response = await aiFetch('/api/ai/exam-section', { language, levelId, partId, seed });
  if (!response.ok) throw new Error(`exam-section ${partId} ${response.status}`);
  return response.json() as Promise<{ groups?: GeneratedGroup[]; task?: WritingTask }>;
}

export async function generateAiExam(language: StudyLanguage, levelId: string, levelIndex: number, seed: string): Promise<AiExam> {
  const format = examFormats[language];
  const writingPart = getAiWritingPart(language, levelIndex);
  const bank = buildFormattedExam(language, levelId, `exam-${seed}`);
  const [sections, writing] = await Promise.all([
    Promise.allSettled(format.parts.map((part) => requestSection(language, levelId, part.id, `${seed}-${part.id}`))),
    writingPart
      ? requestSection(language, levelId, writingPart.id, `${seed}-${writingPart.id}`).then((data) => data.task ?? null).catch(() => null)
      : Promise.resolve(null),
  ]);

  const questions: FormattedQuestion[] = [];
  const parts: AiExamPartStatus[] = format.parts.map((part, index) => {
    const result = sections[index];
    const generated = result.status === 'fulfilled' && Array.isArray(result.value.groups)
      ? toFormattedQuestions(part, levelId, result.value.groups).slice(0, part.count)
      : [];
    const fill = bank.filter((item) => item.part === part.id).slice(0, part.count - generated.length);
    questions.push(...generated, ...fill);
    return { partId: part.id, generated: generated.length, fromBank: fill.length };
  });

  return {
    questions,
    parts,
    writing: writingPart && writing ? { part: writingPart, task: writing } : null,
  };
}

export type WritingAssessment = {
  overall: number;
  summary: string;
  strengths: string[];
  improvements: string[];
  corrected: string;
};

export async function assessExamWriting(language: StudyLanguage, levelId: string, task: WritingTask, answer: string): Promise<WritingAssessment | null> {
  if (answer.trim().length < 5) return null;
  try {
    const response = await aiFetch('/api/ai/assess', { language, levelId, skill: 'writing', task: task.prompt, answer });
    if (!response.ok) return null;
    const data = await response.json();
    if (typeof data?.overall !== 'number') return null;
    return {
      overall: data.overall,
      summary: String(data.summary || ''),
      strengths: Array.isArray(data.strengths) ? data.strengths.map(String) : [],
      improvements: Array.isArray(data.improvements) ? data.improvements.map(String) : [],
      corrected: String(data.corrected || ''),
    };
  } catch {
    return null;
  }
}

/** Parts scoring under the threshold, weakest first, for the result advice. */
export function weakParts(sections: Array<{ id: string; label: string; correct: number; total: number }>, threshold = 0.6) {
  return sections
    .filter((item) => item.total > 0 && item.correct / item.total < threshold)
    .sort((a, b) => a.correct / a.total - b.correct / b.total);
}
