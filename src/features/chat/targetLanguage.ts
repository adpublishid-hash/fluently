export type TargetLanguage = 'English' | 'Arabic' | 'Mandarin' | 'Japanese';

export const targetLanguageOptions: Array<{ value: TargetLanguage; label: string; localLabel: string; code: string }> = [
  { value: 'English', label: 'English', localLabel: 'Bahasa Inggris', code: 'EN' },
  { value: 'Arabic', label: 'Arabic', localLabel: 'Bahasa Arab', code: 'AR' },
  { value: 'Mandarin', label: 'Mandarin', localLabel: 'Bahasa Mandarin', code: 'ZH' },
  { value: 'Japanese', label: 'Japanese', localLabel: 'Bahasa Jepang', code: 'JA' },
];

export const normalizeTargetLanguage = (value?: string | null): TargetLanguage => {
  const normalized = (value || '').toLowerCase();
  if (normalized.includes('arab')) return 'Arabic';
  if (normalized.includes('mandarin') || normalized.includes('chinese') || normalized.includes('zh')) return 'Mandarin';
  if (normalized.includes('japan') || normalized.includes('nihon')) return 'Japanese';
  return 'English';
};

export const getTargetLanguageLabel = (value?: string | null) => {
  const language = normalizeTargetLanguage(value);
  return targetLanguageOptions.find(option => option.value === language)?.localLabel || 'Bahasa Inggris';
};

export const getSpeechRecognitionLanguage = (value?: string | null) => {
  const language = normalizeTargetLanguage(value);
  if (language === 'Arabic') return 'ar-SA';
  if (language === 'Mandarin') return 'zh-CN';
  if (language === 'Japanese') return 'ja-JP';
  return 'en-US';
};
