export const japaneseLevels = {
  beginner: {
    id: 'beginner',
    title: 'Japanese Beginner',
    badge: 'JLPT N5',
    subtitle: 'Hiragana, katakana, sapaan, partikel dasar, kata kerja awal, dan kalimat harian paling sederhana.',
    color: '#DC2626',
    bgColor: '#FEE2E2',
  },
  elementary: {
    id: 'elementary',
    title: 'Japanese Elementary',
    badge: 'JLPT N4',
    subtitle: 'Percakapan sehari-hari, pola lampau, te-form, permintaan, lokasi, waktu, dan narasi pendek.',
    color: '#EA580C',
    bgColor: '#FFEDD5',
  },
  intermediate: {
    id: 'intermediate',
    title: 'Japanese Intermediate',
    badge: 'JLPT N3',
    subtitle: 'Topik familiar, kalimat majemuk, opini dasar, bacaan menengah, dan ekspresi natural.',
    color: '#2563EB',
    bgColor: '#DBEAFE',
  },
  advanced: {
    id: 'advanced',
    title: 'Japanese Advanced',
    badge: 'JLPT N2',
    subtitle: 'Artikel, berita, keigo dasar-menengah, nuansa grammar, opini formal, dan wacana kompleks.',
    color: '#7C3AED',
    bgColor: '#EDE9FE',
  },
  proficiency: {
    id: 'proficiency',
    title: 'Japanese Proficiency',
    badge: 'JLPT N1',
    subtitle: 'Nuansa akademik/profesional, idiom, retorika, bacaan abstrak, dan komunikasi sangat mahir.',
    color: '#0F172A',
    bgColor: '#E2E8F0',
  },
} as const;

export type JapaneseLevelId = keyof typeof japaneseLevels;
export type JapaneseSkillId = 'grammar' | 'speaking' | 'listening' | 'reading' | 'writing' | 'vocabulary' | 'pronunciation';

export const japaneseSkills: Array<{
  id: JapaneseSkillId;
  label: string;
  sublabel: string;
  icon: string;
  color: string;
  bgColor: string;
}> = [
  {
    id: 'grammar',
    label: 'Grammar',
    sublabel: 'Partikel, konjugasi, pola kalimat, nuansa, dan struktur Jepang',
    icon: '/assets/icons/new/21. Pencil & Ruler.png',
    color: '#DC2626',
    bgColor: '#FEE2E2',
  },
  {
    id: 'speaking',
    label: 'Speaking',
    sublabel: 'Dialog, shadowing, roleplay, aizuchi, dan respons natural',
    icon: '/assets/icons/new/7. Webinar.png',
    color: '#EA580C',
    bgColor: '#FFEDD5',
  },
  {
    id: 'listening',
    label: 'Listening',
    sublabel: 'Audio Jepang, kata kunci, intonasi, kecepatan, dan pemahaman',
    icon: '/assets/icons/new/18. Audio Lesson.png',
    color: '#0EA5E9',
    bgColor: '#E0F2FE',
  },
  {
    id: 'reading',
    label: 'Reading',
    sublabel: 'Kana, kanji, teks JLPT, skimming, scanning, dan inferensi',
    icon: '/assets/icons/new/4. E-Library.png',
    color: '#2563EB',
    bgColor: '#DBEAFE',
  },
  {
    id: 'writing',
    label: 'Writing',
    sublabel: 'Kana, kanji, kalimat, email, catatan, opini, dan esai pendek',
    icon: '/assets/icons/new/3. Online Course.png',
    color: '#16A34A',
    bgColor: '#DCFCE7',
  },
  {
    id: 'vocabulary',
    label: 'Vocabulary',
    sublabel: 'Kosakata JLPT, kanji, kolokasi, contoh kalimat, dan review',
    icon: '/assets/icons/new/16. Language Learning.png',
    color: '#CA8A04',
    bgColor: '#FEF3C7',
  },
  {
    id: 'pronunciation',
    label: 'Pronunciation',
    sublabel: 'Mora, pitch accent, long vowel, small tsu, dan ritme Jepang',
    icon: '/assets/icons/new/17. Learning Method.png',
    color: '#DB2777',
    bgColor: '#FCE7F3',
  },
];

export const japaneseLessonCounts: Record<JapaneseLevelId, Record<JapaneseSkillId, number>> = {
  beginner: { grammar: 20, speaking: 20, listening: 20, reading: 20, writing: 20, vocabulary: 20, pronunciation: 20 },
  elementary: { grammar: 20, speaking: 20, listening: 20, reading: 20, writing: 20, vocabulary: 20, pronunciation: 20 },
  intermediate: { grammar: 20, speaking: 20, listening: 20, reading: 20, writing: 20, vocabulary: 20, pronunciation: 20 },
  advanced: { grammar: 20, speaking: 20, listening: 20, reading: 20, writing: 20, vocabulary: 20, pronunciation: 20 },
  proficiency: { grammar: 20, speaking: 20, listening: 20, reading: 20, writing: 20, vocabulary: 20, pronunciation: 20 },
};

export function normalizeJapaneseLevel(level?: string): JapaneseLevelId {
  if (level === 'elementary') return 'elementary';
  if (level === 'intermediate') return 'intermediate';
  if (level === 'advanced') return 'advanced';
  if (level === 'proficiency') return 'proficiency';
  return 'beginner';
}

export function isJapaneseSkill(value?: string): value is JapaneseSkillId {
  return value === 'grammar' || value === 'speaking' || value === 'listening' || value === 'reading' || value === 'writing' || value === 'vocabulary' || value === 'pronunciation';
}
