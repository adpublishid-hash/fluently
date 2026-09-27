export const mandarinLevels = {
  beginner: {
    id: 'beginner',
    title: 'Mandarin Beginner',
    badge: 'HSK 1',
    subtitle: 'Pinyin, nada dasar, sapaan, angka, kata benda harian, dan kalimat Mandarin paling awal.',
    color: '#DC2626',
    bgColor: '#FEE2E2',
  },
  elementary: {
    id: 'elementary',
    title: 'Mandarin Elementary',
    badge: 'HSK 2',
    subtitle: 'Percakapan sehari-hari, pola dasar, waktu, lokasi, kebutuhan, dan respons sederhana.',
    color: '#EA580C',
    bgColor: '#FFEDD5',
  },
  intermediate: {
    id: 'intermediate',
    title: 'Mandarin Intermediate',
    badge: 'HSK 3',
    subtitle: 'Topik familiar, kalimat majemuk, narasi pendek, opini dasar, dan komunikasi rutin.',
    color: '#CA8A04',
    bgColor: '#FEF3C7',
  },
  'upper-intermediate': {
    id: 'upper-intermediate',
    title: 'Mandarin Upper-Intermediate',
    badge: 'HSK 4',
    subtitle: 'Diskusi lebih luas, argumen sederhana, teks menengah, dan ekspresi yang lebih natural.',
    color: '#16A34A',
    bgColor: '#DCFCE7',
  },
  advanced: {
    id: 'advanced',
    title: 'Mandarin Advanced',
    badge: 'HSK 5',
    subtitle: 'Berita, opini, tulisan formal, percakapan kompleks, dan kosakata abstrak tingkat lanjut.',
    color: '#2563EB',
    bgColor: '#DBEAFE',
  },
  proficiency: {
    id: 'proficiency',
    title: 'Mandarin Proficiency',
    badge: 'HSK 6',
    subtitle: 'Wacana kompleks, nuansa makna, idiom, presentasi profesional, dan pemahaman hampir mahir.',
    color: '#7C3AED',
    bgColor: '#EDE9FE',
  },
  'hsk-7': {
    id: 'hsk-7',
    title: 'Mandarin Expert',
    badge: 'HSK 7',
    subtitle: 'Wacana akademik, seminar, opini panjang, kritik argumen, dan sintesis lintas teks.',
    color: '#9333EA',
    bgColor: '#F3E8FF',
  },
  'hsk-8': {
    id: 'hsk-8',
    title: 'Mandarin Scholar',
    badge: 'HSK 8',
    subtitle: 'Analisis riset, policy paper, debat profesional, register formal, dan penulisan akademik.',
    color: '#BE123C',
    bgColor: '#FFE4E6',
  },
  'hsk-9': {
    id: 'hsk-9',
    title: 'Mandarin Mastery',
    badge: 'HSK 9',
    subtitle: 'Kemahiran akademik native-like, retorika ahli, kritik sumber, dan komunikasi profesional tingkat tinggi.',
    color: '#0F172A',
    bgColor: '#E2E8F0',
  },
} as const;

export type MandarinLevelId = keyof typeof mandarinLevels;
export type MandarinSkillId = 'grammar' | 'speaking' | 'listening' | 'reading' | 'writing' | 'vocabulary' | 'pronunciation';

export const mandarinSkills: Array<{
  id: MandarinSkillId;
  label: string;
  sublabel: string;
  icon: string;
  color: string;
  bgColor: string;
}> = [
  {
    id: 'grammar',
    label: 'Yǔfǎ',
    sublabel: 'Yǔfǎ, struktur kalimat, partikel, kata kerja, dan pola Mandarin',
    icon: '/assets/icons/new/21. Pencil & Ruler.png',
    color: '#DC2626',
    bgColor: '#FEE2E2',
  },
  {
    id: 'speaking',
    label: 'Kǒuyǔ',
    sublabel: 'Kǒuyǔ, dialog, respons, roleplay, dan produksi lisan Mandarin',
    icon: '/assets/icons/new/7. Webinar.png',
    color: '#EA580C',
    bgColor: '#FFEDD5',
  },
  {
    id: 'listening',
    label: 'Tīnglì',
    sublabel: 'Tīnglì, TTS Mandarin, kata kunci audio, nada, dan pemahaman lisan',
    icon: '/assets/icons/new/18. Audio Lesson.png',
    color: '#0EA5E9',
    bgColor: '#E0F2FE',
  },
  {
    id: 'reading',
    label: 'Yuèdú',
    sublabel: 'Yuèdú, karakter Hanzi, pinyin, teks pendek, dan pemahaman bacaan',
    icon: '/assets/icons/new/4. E-Library.png',
    color: '#2563EB',
    bgColor: '#DBEAFE',
  },
  {
    id: 'writing',
    label: 'Xiězuò',
    sublabel: 'Xiězuò, Hanzi, stroke order, kalimat, paragraf, dan tulisan praktis',
    icon: '/assets/icons/new/3. Online Course.png',
    color: '#16A34A',
    bgColor: '#DCFCE7',
  },
  {
    id: 'vocabulary',
    label: 'Cíhuì',
    sublabel: 'Cíhuì, kosakata HSK, kolokasi, contoh kalimat, dan review',
    icon: '/assets/icons/new/16. Language Learning.png',
    color: '#CA8A04',
    bgColor: '#FEF3C7',
  },
  {
    id: 'pronunciation',
    label: 'Pīnyīn',
    sublabel: 'Pinyin, initial-final, tone, tone sandhi, dan shadowing',
    icon: '/assets/icons/new/17. Learning Method.png',
    color: '#DB2777',
    bgColor: '#FCE7F3',
  },
];

export const mandarinLessonCounts: Record<MandarinLevelId, Record<MandarinSkillId, number>> = {
  beginner: {
    grammar: 20,
    speaking: 20,
    listening: 20,
    reading: 20,
    writing: 20,
    vocabulary: 20,
    pronunciation: 20,
  },
  elementary: {
    grammar: 20,
    speaking: 20,
    listening: 20,
    reading: 20,
    writing: 20,
    vocabulary: 20,
    pronunciation: 20,
  },
  intermediate: {
    grammar: 20,
    speaking: 20,
    listening: 20,
    reading: 20,
    writing: 20,
    vocabulary: 20,
    pronunciation: 20,
  },
  'upper-intermediate': {
    grammar: 20,
    speaking: 20,
    listening: 20,
    reading: 20,
    writing: 20,
    vocabulary: 20,
    pronunciation: 20,
  },
  advanced: {
    grammar: 20,
    speaking: 20,
    listening: 20,
    reading: 20,
    writing: 20,
    vocabulary: 20,
    pronunciation: 20,
  },
  proficiency: {
    grammar: 20,
    speaking: 20,
    listening: 20,
    reading: 20,
    writing: 20,
    vocabulary: 20,
    pronunciation: 20,
  },
  'hsk-7': {
    grammar: 20,
    speaking: 20,
    listening: 20,
    reading: 20,
    writing: 20,
    vocabulary: 20,
    pronunciation: 20,
  },
  'hsk-8': {
    grammar: 20,
    speaking: 20,
    listening: 20,
    reading: 20,
    writing: 20,
    vocabulary: 20,
    pronunciation: 20,
  },
  'hsk-9': {
    grammar: 20,
    speaking: 20,
    listening: 20,
    reading: 20,
    writing: 20,
    vocabulary: 20,
    pronunciation: 20,
  },
};

export function normalizeMandarinLevel(level?: string): MandarinLevelId {
  if (level === 'elementary') return 'elementary';
  if (level === 'intermediate') return 'intermediate';
  if (level === 'upper-intermediate') return 'upper-intermediate';
  if (level === 'advanced') return 'advanced';
  if (level === 'proficiency') return 'proficiency';
  if (level === 'hsk-7') return 'hsk-7';
  if (level === 'hsk-8') return 'hsk-8';
  if (level === 'hsk-9') return 'hsk-9';
  return 'beginner';
}

export function isMandarinSkill(value?: string): value is MandarinSkillId {
  return value === 'grammar' || value === 'speaking' || value === 'listening' || value === 'reading' || value === 'writing' || value === 'vocabulary' || value === 'pronunciation';
}
