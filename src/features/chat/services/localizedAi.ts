import { aiFetch } from '../../../services/aiClient';
import {
  formatLocalizedLesson,
  localizedLanguageCopy,
  type FormattedLocalizedLesson,
  type LocalizedFeedbackResult,
  type LocalizedFocus,
  type LocalizedLanguage,
  type LocalizedLessonPayload,
} from '../localizedLesson';

type LessonRequest = {
  language: LocalizedLanguage;
  focus: LocalizedFocus;
  name: string;
  topic: string;
  levelId?: string;
};

type FeedbackRequest = LessonRequest & {
  answer: string;
  context: string;
  targetItems?: string[];
};

export async function requestLocalizedLesson({ language, focus, name, topic, levelId }: LessonRequest): Promise<FormattedLocalizedLesson | null> {
  try {
    const response = await aiFetch('/api/ai/localized-lesson', {
      language: localizedLanguageCopy[language].apiId,
      focus,
      name,
      topic: topic.replace(/^Day \d+\s*-\s*/i, ''),
      levelId,
    });
    if (!response.ok) return null;
    const data = await response.json();
    if (!data?.lesson || typeof data.lesson !== 'object') return null;
    return formatLocalizedLesson(language, focus, data.lesson as LocalizedLessonPayload[typeof focus], { name, topic, levelId });
  } catch {
    return null;
  }
}

export async function requestLocalizedFeedback({ language, focus, name, topic, levelId, answer, context, targetItems = [] }: FeedbackRequest): Promise<LocalizedFeedbackResult | null> {
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
    });
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
