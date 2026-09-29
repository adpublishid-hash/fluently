export const arabicLevels = {
  pemula: {
    id: 'pemula',
    title: 'Arabic Pemula',
    badge: 'Pemula',
    subtitle: 'Huruf, bunyi, kosakata dasar, percakapan awal, dan tata bahasa Arab pemula.',
    color: '#0F766E',
    bgColor: '#CCFBF1',
  },
  elementary: {
    id: 'elementary',
    title: 'Arabic Elementary',
    badge: 'Elementary',
    subtitle: 'Kalimat sehari-hari, percakapan lebih panjang, mufradat, nahwu dasar, dan makharij.',
    color: '#1D4ED8',
    bgColor: '#DBEAFE',
  },
  intermediate: {
    id: 'intermediate',
    title: 'Arabic Intermediate',
    badge: 'Intermediate',
    subtitle: 'Dialog lebih natural, teks pendek-menengah, sharaf dasar, tarkib, dan komunikasi A2-B1.',
    color: '#7C3AED',
    bgColor: '#EDE9FE',
  },
  'upper-intermediate': {
    id: 'upper-intermediate',
    title: 'Arabic Upper-Intermediate',
    badge: 'Upper-Intermediate',
    subtitle: 'Diskusi kompleks, teks argumentatif, nahwu-sharaf lanjutan, dan komunikasi B2.',
    color: '#C2410C',
    bgColor: '#FFEDD5',
  },
  advanced: {
    id: 'advanced',
    title: 'Arabic Advanced',
    badge: 'Advanced',
    subtitle: 'Wacana akademik/profesional, retorika Arab, analisis teks, dan komunikasi C1.',
    color: '#BE123C',
    bgColor: '#FFE4E6',
  },
  proficiency: {
    id: 'proficiency',
    title: 'Arabic Proficiency',
    badge: 'Proficiency',
    subtitle: 'Kemahiran C2: sintesis wacana, retorika matang, nuansa sastra-akademik, dan produksi setara mahir.',
    color: '#0F172A',
    bgColor: '#E2E8F0',
  },
  mastery: {
    id: 'mastery',
    title: 'Arabic Mastery',
    badge: 'Mastery',
    subtitle: 'Jalur pasca-C2: turats adaptif, media akademik, balaghah, debat ahli, dan produksi profesional.',
    color: '#6D28D9',
    bgColor: '#F3E8FF',
  },
  scholar: {
    id: 'scholar',
    title: 'Arabic Scholar',
    badge: 'Scholar',
    subtitle: 'Jalur riset: tahqiq ringan, kritik sumber, makalah ilmiah, seminar akademik, dan analisis turats mendalam.',
    color: '#854D0E',
    bgColor: '#FEF3C7',
  },
} as const;

export type ArabicLevelId = keyof typeof arabicLevels;
export type ArabicSkillId = 'kalam' | 'istima' | 'qiraah' | 'kitabah' | 'mufradat' | 'grammar' | 'pronunciation';

export const arabicSkills: Array<{
  id: ArabicSkillId;
  label: string;
  sublabel: string;
  icon: string;
  color: string;
  bgColor: string;
}> = [
  {
    id: 'kalam',
    label: 'Kalam',
    sublabel: 'Percakapan dan latihan berbicara bahasa Arab',
    icon: '/assets/icons/new/7. Webinar.png',
    color: '#E74C3C',
    bgColor: '#FDEDEC',
  },
  {
    id: 'istima',
    label: "Istima'",
    sublabel: 'Listening Arabic, audio, kata kunci, dan pemahaman',
    icon: '/assets/icons/new/18. Audio Lesson.png',
    color: '#0EA5E9',
    bgColor: '#E0F2FE',
  },
  {
    id: 'qiraah',
    label: "Qira'ah",
    sublabel: 'Reading Arabic, teks pendek, dan pemahaman bacaan',
    icon: '/assets/icons/new/4. E-Library.png',
    color: '#2563EB',
    bgColor: '#DBEAFE',
  },
  {
    id: 'kitabah',
    label: 'Kitabah',
    sublabel: 'Writing Arabic, huruf sambung, kalimat, dan paragraf',
    icon: '/assets/icons/new/21. Pencil & Ruler.png',
    color: '#F59E0B',
    bgColor: '#FEF3C7',
  },
  {
    id: 'mufradat',
    label: 'Mufradat',
    sublabel: 'Kosakata Arab, arti, contoh, dan latihan',
    icon: '/assets/icons/new/16. Language Learning.png',
    color: '#2980B9',
    bgColor: '#D6EAF8',
  },
  {
    id: 'grammar',
    label: 'Grammar',
    sublabel: 'Nahwu dan struktur kalimat Arab',
    icon: '/assets/icons/new/21. Pencil & Ruler.png',
    color: '#8E44AD',
    bgColor: '#F4ECF7',
  },
  {
    id: 'pronunciation',
    label: 'Makharij',
    sublabel: 'Titik keluar huruf, bunyi, dan pelafalan Arab',
    icon: '/assets/icons/new/17. Learning Method.png',
    color: '#E83E8C',
    bgColor: '#FDEDF4',
  },
];

export const arabicLessonCounts: Record<ArabicLevelId, Record<ArabicSkillId, number>> = {
  pemula: {
    kalam: 20,
    istima: 20,
    qiraah: 20,
    kitabah: 20,
    mufradat: 40,
    grammar: 20,
    pronunciation: 20,
  },
  elementary: {
    kalam: 20,
    istima: 20,
    qiraah: 20,
    kitabah: 20,
    mufradat: 20,
    grammar: 20,
    pronunciation: 20,
  },
  intermediate: {
    kalam: 20,
    istima: 20,
    qiraah: 20,
    kitabah: 20,
    mufradat: 20,
    grammar: 20,
    pronunciation: 20,
  },
  'upper-intermediate': {
    kalam: 20,
    istima: 20,
    qiraah: 20,
    kitabah: 20,
    mufradat: 20,
    grammar: 20,
    pronunciation: 20,
  },
  advanced: {
    kalam: 20,
    istima: 20,
    qiraah: 20,
    kitabah: 20,
    mufradat: 20,
    grammar: 20,
    pronunciation: 20,
  },
  proficiency: {
    kalam: 20,
    istima: 20,
    qiraah: 20,
    kitabah: 20,
    mufradat: 20,
    grammar: 20,
    pronunciation: 20,
  },
  mastery: {
    kalam: 20,
    istima: 20,
    qiraah: 20,
    kitabah: 20,
    mufradat: 20,
    grammar: 20,
    pronunciation: 20,
  },
  scholar: {
    kalam: 20,
    istima: 20,
    qiraah: 20,
    kitabah: 20,
    mufradat: 20,
    grammar: 20,
    pronunciation: 20,
  },
};

export function normalizeArabicLevel(level?: string): ArabicLevelId {
  if (level === 'elementary') return 'elementary';
  if (level === 'intermediate') return 'intermediate';
  if (level === 'upper-intermediate') return 'upper-intermediate';
  if (level === 'advanced') return 'advanced';
  if (level === 'proficiency') return 'proficiency';
  if (level === 'mastery') return 'mastery';
  if (level === 'scholar') return 'scholar';
  return 'pemula';
}
