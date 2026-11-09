import { getAuthHeaders } from '../../../services/aiKeyService';

// Learners flag AI coach messages that look wrong; admins review them in the admin panel.

export type ContentReportReason = 'wrong' | 'level' | 'format' | 'other';

export type ContentReportContext = {
  language: 'english' | 'japanese' | 'mandarin' | 'arabic';
  focus: string;
  topic: string;
  levelId?: string;
};

export const contentReportReasons: Array<{ id: ContentReportReason; label: string }> = [
  { id: 'wrong', label: 'Isi salah' },
  { id: 'level', label: 'Level tidak sesuai' },
  { id: 'format', label: 'Tampilan rusak' },
  { id: 'other', label: 'Lainnya' },
];

export async function sendContentReport(
  context: ContentReportContext,
  report: { reason: ContentReportReason; note: string; excerpt: string },
): Promise<boolean> {
  try {
    const response = await fetch('/api/chat/content-reports', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify({ ...context, ...report, excerpt: report.excerpt.slice(0, 4000) }),
    });
    return response.ok;
  } catch {
    return false;
  }
}
