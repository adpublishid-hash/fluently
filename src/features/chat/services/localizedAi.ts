import { aiFetch } from '../../../services/aiClient';
import {
  formatLocalizedLesson,
  localizedLanguageCopy,
  type FormattedLocalizedLesson,
  type LocalizedFeedbackResult,
  type LocalizedFocus,
  type LocalizedLanguage,
  type LocalizedLessonPayload,
  type LocalizedLessonVariation,
  type LocalizedReportResult,
} from '../localizedLesson';

type LessonRequest = {
  language: LocalizedLanguage;
  focus: LocalizedFocus;
  name: string;
  topic: string;
  levelId?: string;
  /** Aborts the request (the learner cancelled or the session changed). */
  signal?: AbortSignal;
};

type LessonOptions = {
  variation?: LocalizedLessonVariation | null;
  avoid?: string[];
  review?: Array<{ original: string; corrected: string }>;
};

type AssistRequest = LessonRequest & {
  action: 'hint' | 'example' | 'ask';
  question?: string;
  context: string;
  lastCoachMessage: string;
};

type ReportRequest = LessonRequest & {
  transcript: Array<{ role: 'coach' | 'student'; text: string }>;
};

type FeedbackRequest = LessonRequest & {
  answer: string;
  context: string;
  targetItems?: string[];
};

export async function requestLocalizedLesson(
  { language, focus, name, topic, levelId, signal }: LessonRequest,
  { variation = null, avoid = [], review = [] }: LessonOptions = {},
): Promise<FormattedLocalizedLesson | null> {
  try {
    const response = await aiFetch('/api/ai/localized-lesson', {
      language: localizedLanguageCopy[language].apiId,
      focus,
      name,
      topic: topic.replace(/^Day \d+\s*-\s*/i, ''),
      levelId,
      variation,
      avoid,
      review,
    }, { signal });
    if (!response.ok) return null;
    const data = await response.json();
    if (!data?.lesson || typeof data.lesson !== 'object') return null;
    return formatLocalizedLesson(language, focus, data.lesson as LocalizedLessonPayload[typeof focus], { name, topic, levelId, variation });
  } catch {
    return null;
  }
}

export async function requestLocalizedFeedback({ language, focus, name, topic, levelId, answer, context, targetItems = [], signal }: FeedbackRequest): Promise<LocalizedFeedbackResult | null> {
  try {
    const response = await aiFetch('/api/ai/localized-feedback', {
      language: localizedLanguageCopy[language].apiId,
      focus,
      name,
      topic: topic.replace(/^Day \d+\s*-\s*/i, ''),
      levelId,
      answer,
      context,
      targetItems,
    }, { signal });
    if (!response.ok) return null;
    const data = await response.json();
    if (!data || typeof data.feedback !== 'string') return null;
    return {
      status: data.status === 'correct' || data.status === 'incorrect' ? data.status : 'almost',
      score: typeof data.score === 'number' ? data.score : null,
      feedback: data.feedback.trim(),
      corrected: String(data.corrected || '').trim(),
      correctedReading: String(data.correctedReading || '').trim(),
      completedItems: Array.isArray(data.completedItems) ? data.completedItems.map(String) : [],
      nextTask: String(data.nextTask || '').trim(),
    };
  } catch {
    return null;
  }
}

export async function requestLocalizedAssist({ language, focus, name, topic, levelId, action, question = '', context, lastCoachMessage, signal }: AssistRequest): Promise<string | null> {
  try {
    const response = await aiFetch('/api/ai/localized-assist', {
      language: localizedLanguageCopy[language].apiId,
      focus,
      name,
      topic: topic.replace(/^Day \d+\s*-\s*/i, ''),
      levelId,
      action,
      question,
      context,
      lastCoachMessage,
    }, { signal });
    if (!response.ok) return null;
    const data = await response.json();
    return typeof data?.reply === 'string' && data.reply.trim() ? data.reply.trim() : null;
  } catch {
    return null;
  }
}

export async function requestLocalizedReport({ language, focus, name, topic, levelId, transcript, signal }: ReportRequest): Promise<LocalizedReportResult | null> {
  try {
    const response = await aiFetch('/api/ai/localized-report', {
      language: localizedLanguageCopy[language].apiId,
      focus,
      name,
      topic: topic.replace(/^Day \d+\s*-\s*/i, ''),
      levelId,
      transcript,
    }, { signal });
    if (!response.ok) return null;
    const data = await response.json();
    if (!data || typeof data.score !== 'number' || typeof data.summary !== 'string') return null;
    const strings = (value: unknown) => (Array.isArray(value) ? value.map(String) : []);
    return {
      score: data.score,
      category: String(data.category || ''),
      summary: data.summary,
      strengths: strings(data.strengths),
      errors: Array.isArray(data.errors) ? data.errors : [],
      vocabulary: Array.isArray(data.vocabulary) ? data.vocabulary : [],
      nextSteps: strings(data.nextSteps),
    };
  } catch {
    return null;
  }
}
