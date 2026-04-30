import type {
  CEFRLevelData, SkillData, DayData,
  GameCategoryData, GameModeData,
  PracticeQuestionTypeData,
  ChatAIModeData, ChatScenarioData,
  LeaderboardEntry, User,
  ChatMessage, Course, CourseCollection,
} from '../types';


/* ══════════════════════════════════════════
   USER
   ══════════════════════════════════════════ */

export const mockUser: User = {
  id: 1,
  name: 'Karina',
  email: 'karina@talky.app',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Karina&backgroundColor=b6e3f4',
  xp: 2450,
  streak: 12,
  level: 7,
  createdAt: '2025-01-15',
};

/* ══════════════════════════════════════════
   MODUL — CEFR Levels
   ══════════════════════════════════════════ */

export const cefrLevels: CEFRLevelData[] = [
  { id: 'basic',        labelKey: 'cefr.basic',        sublabel: 'A1 – A2', color: '#7EC3E6', bgColor: '#EAF7FC', icon: '/assets/icons/new/1. Creative Learning.png', progress: 45 },
  { id: 'intermediate', labelKey: 'cefr.intermediate',  sublabel: 'B1 – B2', color: '#3498DB', bgColor: '#EBF5FB', icon: '/assets/icons/new/4. E-Library.png', progress: 20 },
  { id: 'advanced',     labelKey: 'cefr.advanced',      sublabel: 'C1 – C2', color: '#9B59B6', bgColor: '#F4ECF7', icon: '/assets/icons/new/20. Completion Certificate.png', progress: 0 },
];

/* ══════════════════════════════════════════
   MODUL — Skills (per CEFR level)
   ══════════════════════════════════════════ */

export const skills: SkillData[] = [
  { id: 'speaking',    labelKey: 'skill.speaking',    sublabelKey: 'skill.speakingSub',    icon: '/assets/icons/new/7. Webinar.png', color: '#E74C3C', bgColor: '#FDEDEC', totalDays: 30, completedDays: 12 },
  { id: 'listening',   labelKey: 'skill.listening',   sublabelKey: 'skill.listeningSub',   icon: '/assets/icons/new/5. Video Lecture.png', color: '#3498DB', bgColor: '#EBF5FB', totalDays: 30, completedDays: 8 },
  { id: 'reading',     labelKey: 'skill.reading',     sublabelKey: 'skill.readingSub',     icon: '/assets/icons/new/4. E-Library.png', color: '#4FA3D1', bgColor: '#EAF7FC', totalDays: 30, completedDays: 15 },
  { id: 'writing',     labelKey: 'skill.writing',     sublabelKey: 'skill.writingSub',     icon: '/assets/icons/new/25. Pen & Notebook.png', color: '#F39C12', bgColor: '#FEF9E7', totalDays: 30, completedDays: 5 },
  { id: 'grammar',     labelKey: 'skill.grammar',     sublabelKey: 'skill.grammarSub',     icon: '/assets/icons/new/21. Pencil & Ruler.png', color: '#8E44AD', bgColor: '#F4ECF7', totalDays: 30, completedDays: 10 },
  { id: 'vocabulary',  labelKey: 'skill.vocabulary',  sublabelKey: 'skill.vocabularySub',  icon: '/assets/icons/new/16. Language Learning.png', color: '#2980B9', bgColor: '#D6EAF8', totalDays: 30, completedDays: 18 },
  { id: 'pronunciation', labelKey: 'skill.pronunciation', sublabelKey: 'skill.pronunciationSub', icon: '/assets/icons/new/17. Learning Method.png', color: '#E83E8C', bgColor: '#FDEDEC', totalDays: 30, completedDays: 10 },
];

/* ══════════════════════════════════════════
   MODUL — Days (sample for any skill)
   ══════════════════════════════════════════ */

export function generateDays(completedDays: number, totalDays: number): DayData[] {
  return Array.from({ length: totalDays }, (_, i) => ({
    id: i + 1,
    titleKey: 'day.title',
    subtitleKey: `day.subtitle${(i % 5) + 1}`,
    status: i < completedDays ? 'completed' as const : i === completedDays ? 'available' as const : 'locked' as const,
  }));
}

/* ══════════════════════════════════════════
   GAME — Categories
   ══════════════════════════════════════════ */

export const gameCategories: GameCategoryData[] = [
  { id: 'vocabulary', labelKey: 'gameCategory.vocabulary', sublabelKey: 'gameCategory.vocabularySub', icon: '/assets/icons/new/29. Sticky Notes.png', color: '#F39C12', bgColor: '#FEF9E7' },
  { id: 'grammar',    labelKey: 'gameCategory.grammar',    sublabelKey: 'gameCategory.grammarSub',    icon: '/assets/icons/new/21. Pencil & Ruler.png', color: '#8E44AD', bgColor: '#F4ECF7' },
  { id: 'listening',  labelKey: 'gameCategory.listening',  sublabelKey: 'gameCategory.listeningSub',  icon: '/assets/icons/new/5. Video Lecture.png', color: '#3498DB', bgColor: '#EBF5FB' },
  { id: 'speaking',   labelKey: 'gameCategory.speaking',   sublabelKey: 'gameCategory.speakingSub',   icon: '/assets/icons/new/7. Webinar.png', color: '#E74C3C', bgColor: '#FDEDEC' },
];

/* ══════════════════════════════════════════
   GAME — Modes
   ══════════════════════════════════════════ */

export const gameModes: GameModeData[] = [
  { id: 'word-match',   labelKey: 'gameMode.wordMatch',   sublabelKey: 'gameMode.wordMatchSub',   icon: '/assets/icons/new/9. Mind Map.png', color: '#4FA3D1', bgColor: '#EAF7FC' },
  { id: 'memory-card',  labelKey: 'gameMode.memoryCard',  sublabelKey: 'gameMode.memoryCardSub',  icon: '/assets/icons/new/22. Highlighter & Markers.png', color: '#3498DB', bgColor: '#EBF5FB' },
  { id: 'speed-quiz',   labelKey: 'gameMode.speedQuiz',   sublabelKey: 'gameMode.speedQuizSub',   icon: '/assets/icons/new/15. Time Management.png', color: '#F39C12', bgColor: '#FEF9E7' },
  { id: 'crossword',    labelKey: 'gameMode.crossword',   sublabelKey: 'gameMode.crosswordSub',   icon: '/assets/icons/new/10. Problem-solving.png', color: '#9B59B6', bgColor: '#F4ECF7' },
  { id: 'clan-battle',  labelKey: 'gameMode.clanBattle',  sublabelKey: 'gameMode.clanBattleSub',  icon: '/assets/icons/new/13. Study Group.png', color: '#E74C3C', bgColor: '#FDEDEC' },
];

/* ══════════════════════════════════════════
   LATIHAN — Practice question types
   ══════════════════════════════════════════ */

export const practiceQuestionTypes: PracticeQuestionTypeData[] = [
  { id: 'multiple-choice',    labelKey: 'practice.multipleChoice',    sublabelKey: 'practice.multipleChoiceSub',    icon: '/assets/icons/new/28. Checklist.png', color: '#3498DB', bgColor: '#EBF5FB' },
  { id: 'short-answer',       labelKey: 'practice.shortAnswer',       sublabelKey: 'practice.shortAnswerSub',       icon: '/assets/icons/new/25. Pen & Notebook.png', color: '#4FA3D1', bgColor: '#EAF7FC' },
  { id: 'sentence-arrange',   labelKey: 'practice.sentenceArrange',   sublabelKey: 'practice.sentenceArrangeSub',   icon: '/assets/icons/new/8. Brainstorming.png', color: '#F39C12', bgColor: '#FEF9E7' },
  { id: 'voice-record',       labelKey: 'practice.voiceRecord',       sublabelKey: 'practice.voiceRecordSub',       icon: '/assets/icons/new/7. Webinar.png', color: '#E74C3C', bgColor: '#FDEDEC' },
  { id: 'translation',        labelKey: 'practice.translation',       sublabelKey: 'practice.translationSub',       icon: '/assets/icons/new/16. Language Learning.png', color: '#9B59B6', bgColor: '#F4ECF7' },
];

/* ══════════════════════════════════════════
   CHAT AI — Modes
   ══════════════════════════════════════════ */

export const chatAIModes: ChatAIModeData[] = [
  { id: 'free-chat',        labelKey: 'chatMode.freeChat',        sublabelKey: 'chatMode.freeChatSub',        icon: '/assets/icons/new/13. Study Group.png', color: '#4FA3D1', bgColor: '#EAF7FC' },
  { id: 'roleplay',         labelKey: 'chatMode.roleplay',        sublabelKey: 'chatMode.roleplaySub',        icon: '/assets/icons/new/2. Creative Thinking.png', color: '#E74C3C', bgColor: '#FDEDEC' },
  { id: 'text-correction',  labelKey: 'chatMode.textCorrection',  sublabelKey: 'chatMode.textCorrectionSub',  icon: '/assets/icons/new/22. Highlighter & Markers.png', color: '#3498DB', bgColor: '#EBF5FB' },
  { id: 'pronunciation',    labelKey: 'chatMode.pronunciation',   sublabelKey: 'chatMode.pronunciationSub',   icon: '/assets/icons/new/12. Interactive Whiteboard.png', color: '#F39C12', bgColor: '#FEF9E7' },
  { id: 'ask-teacher',      labelKey: 'chatMode.askTeacher',      sublabelKey: 'chatMode.askTeacherSub',      icon: '/assets/icons/new/6. Classroom Lecture.png', color: '#9B59B6', bgColor: '#F4ECF7' },
];

/* ══════════════════════════════════════════
   CHAT AI — Scenarios
   ══════════════════════════════════════════ */

export const chatScenarios: ChatScenarioData[] = [
  { id: 'restaurant',  labelKey: 'chatScenario.restaurant',  sublabelKey: 'chatScenario.restaurantSub',  icon: '/assets/icons/new/24. Backpack.png', color: '#E74C3C', bgColor: '#FDEDEC' },
  { id: 'airport',     labelKey: 'chatScenario.airport',     sublabelKey: 'chatScenario.airportSub',     icon: '/assets/icons/new/30. Badge & Achievement.png', color: '#3498DB', bgColor: '#EBF5FB' },
  { id: 'interview',   labelKey: 'chatScenario.interview',   sublabelKey: 'chatScenario.interviewSub',   icon: '/assets/icons/new/19. Laptop.png', color: '#4FA3D1', bgColor: '#EAF7FC' },
  { id: 'shopping',    labelKey: 'chatScenario.shopping',    sublabelKey: 'chatScenario.shoppingSub',    icon: '/assets/icons/new/29. Sticky Notes.png', color: '#F39C12', bgColor: '#FEF9E7' },
  { id: 'small-talk',  labelKey: 'chatScenario.smallTalk',   sublabelKey: 'chatScenario.smallTalkSub',   icon: '/assets/icons/new/13. Study Group.png', color: '#9B59B6', bgColor: '#F4ECF7' },
];

/* ══════════════════════════════════════════
   LEADERBOARD
   ══════════════════════════════════════════ */

export const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, user: { id: 10, name: 'Emma Wilson', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma&backgroundColor=ffd5dc', xp: 5200, streak: 45, level: 15 } },
  { rank: 2, user: { id: 11, name: 'James Chen', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James&backgroundColor=c0aede', xp: 4800, streak: 38, level: 14 } },
  { rank: 3, user: { id: 12, name: 'Sofia Martinez', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia&backgroundColor=b6e3f4', xp: 4350, streak: 30, level: 13 } },
  { rank: 4, user: { id: 13, name: 'Liam Johnson', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Liam&backgroundColor=ffd5dc', xp: 3900, streak: 25, level: 12 } },
  { rank: 5, user: { id: 14, name: 'Aisha Patel', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha&backgroundColor=d1d4f9', xp: 3600, streak: 22, level: 11 } },
  { rank: 6, user: { id: 1, name: 'Karina', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Karina&backgroundColor=b6e3f4', xp: 2450, streak: 12, level: 7 }, isCurrentUser: true },
  { rank: 7, user: { id: 15, name: 'Noah Kim', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Noah&backgroundColor=c0aede', xp: 2200, streak: 10, level: 6 } },
  { rank: 8, user: { id: 16, name: 'Olivia Brown', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia&backgroundColor=ffd5dc', xp: 1950, streak: 8, level: 5 } },
  { rank: 9, user: { id: 17, name: 'Ethan Davis', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ethan&backgroundColor=b6e3f4', xp: 1700, streak: 6, level: 5 } },
  { rank: 10, user: { id: 18, name: 'Mia Garcia', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mia&backgroundColor=d1d4f9', xp: 1500, streak: 5, level: 4 } },
];

/* ══════════════════════════════════════════
   CHAT — Mock initial messages
   ══════════════════════════════════════════ */

export const mockChatMessages: ChatMessage[] = [
  {
    id: '1',
    text: "Hi! I'm Fluently, your AI English tutor 🐻 How can I help you today?",
    isAi: true,
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
  },
  {
    id: '2',
    text: 'Can you help me improve my business English?',
    isAi: false,
    timestamp: new Date(Date.now() - 4 * 60 * 1000),
  },
  {
    id: '3',
    text: "Absolutely! Business English is a great area to focus on. Let's start with some common phrases used in meetings. For example: \"I'd like to bring up a point\" is a polite way to share your opinion. Shall we practice more?",
    isAi: true,
    timestamp: new Date(Date.now() - 3 * 60 * 1000),
  },
];

/* ══════════════════════════════════════════
   COURSES — Mock courses data
   ══════════════════════════════════════════ */

export const mockCourses: Course[] = [
  { id: 'c1', title: 'Business Email Writing',       iconUrl: '/assets/icons/new/25. Pen & Notebook.png',         category: 'work',              difficulty: 'intermediate', totalLessons: 12, completedLessons: 8,  progress: 67, bgColor: '#EBF5FB' },
  { id: 'c2', title: 'Meeting & Presentation',       iconUrl: '/assets/icons/new/7. Webinar.png',                  category: 'work',              difficulty: 'intermediate', totalLessons: 10, completedLessons: 3,  progress: 30, bgColor: '#FEF9E7' },
  { id: 'c3', title: 'Negotiations & Deals',         iconUrl: '/assets/icons/new/29. Sticky Notes.png',            category: 'work',              difficulty: 'advanced',     totalLessons: 8,  completedLessons: 0,  progress: 0,  bgColor: '#F4ECF7', locked: true },
  { id: 'c4', title: 'Daily Conversations',          iconUrl: '/assets/icons/new/13. Study Group.png',             category: 'daily-life',        difficulty: 'beginner',     totalLessons: 15, completedLessons: 10, progress: 66, bgColor: '#EAF7FC' },
  { id: 'c5', title: 'Grocery & Shopping',           iconUrl: '/assets/icons/new/24. Backpack.png',                category: 'daily-life',        difficulty: 'beginner',     totalLessons: 8,  completedLessons: 2,  progress: 25, bgColor: '#FEF9E7' },
  { id: 'c6', title: 'Talking About Family',         iconUrl: '/assets/icons/new/1. Creative Learning.png',        category: 'family-friends',    difficulty: 'beginner',     totalLessons: 10, completedLessons: 5,  progress: 50, bgColor: '#FDEDEC' },
  { id: 'c7', title: 'Making Friends',               iconUrl: '/assets/icons/new/2. Creative Thinking.png',        category: 'family-friends',    difficulty: 'beginner',     totalLessons: 8,  completedLessons: 0,  progress: 0,  bgColor: '#EAF7FC', locked: false },
  { id: 'c8', title: 'Airport & Check-in',           iconUrl: '/assets/icons/new/30. Badge & Achievement.png',     category: 'travel',            difficulty: 'intermediate', totalLessons: 10, completedLessons: 4,  progress: 40, bgColor: '#EBF5FB' },
  { id: 'c9', title: 'Hotel & Accommodation',        iconUrl: '/assets/icons/new/19. Laptop.png',                  category: 'travel',            difficulty: 'intermediate', totalLessons: 8,  completedLessons: 0,  progress: 0,  bgColor: '#F4ECF7', locked: true },
  { id: 'c10', title: 'Hobbies & Interests',        iconUrl: '/assets/icons/new/22. Highlighter & Markers.png',   category: 'personal-interest', difficulty: 'beginner',     totalLessons: 12, completedLessons: 6,  progress: 50, bgColor: '#FEF9E7' },
  { id: 'c11', title: 'Sports Talk',                iconUrl: '/assets/icons/new/15. Time Management.png',          category: 'personal-interest', difficulty: 'beginner',     totalLessons: 8,  completedLessons: 0,  progress: 0,  bgColor: '#EAF7FC', locked: false },
];

/* ══════════════════════════════════════════
   COURSES — Collections
   ══════════════════════════════════════════ */

export const courseCollections: CourseCollection[] = [
  { id: 'col1', title: 'Work Ready',         subtitle: 'Professional English',   count: 8,  iconUrl: '/assets/icons/new/7. Webinar.png',               bgColor: '#EBF5FB' },
  { id: 'col2', title: 'Travel Smart',       subtitle: 'Go anywhere confidently', count: 6,  iconUrl: '/assets/icons/new/30. Badge & Achievement.png',  bgColor: '#EAF7FC' },
  { id: 'col3', title: 'Social Pro',         subtitle: 'Connect with people',     count: 5,  iconUrl: '/assets/icons/new/13. Study Group.png',           bgColor: '#FDEDEC' },
  { id: 'col4', title: 'Daily Life',         subtitle: 'Everyday situations',     count: 7,  iconUrl: '/assets/icons/new/24. Backpack.png',              bgColor: '#FEF9E7' },
  { id: 'col5', title: 'Hobby English',      subtitle: 'Talk about your passion', count: 4,  iconUrl: '/assets/icons/new/22. Highlighter & Markers.png', bgColor: '#F4ECF7' },
  { id: 'col6', title: 'Grammar Boost',      subtitle: 'Fix your grammar gaps',   count: 10, iconUrl: '/assets/icons/new/21. Pencil & Ruler.png',        bgColor: '#EAF7FC' },
];

/* ══════════════════════════════════════════
   COURSES — Category labels & difficulty colors
   ══════════════════════════════════════════ */

export const categoryLabels: Record<string, string> = {
  'work':              'Work & Career',
  'daily-life':       'Daily Life',
  'family-friends':   'Family & Friends',
  'travel':           'Travel',
  'personal-interest': 'Personal Interests',
};

export const difficultyColors: Record<string, string> = {
  beginner:     '#4FA3D1',
  intermediate: '#2980B9',
  advanced:     '#8E44AD',
};
