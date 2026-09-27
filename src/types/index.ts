/* ══════════════════════════════════════════
   TALKY — Type Definitions
   ══════════════════════════════════════════ */

// ── Navigation ──
export type TabType = 'modul' | 'video' | 'game' | 'latihan' | 'chat' | 'shop' | 'profile' | 'admin';

export const ViewState = {
  MODULES_LESSON_LIST: 'modules-lesson-list',
} as const;

export type ViewState = (typeof ViewState)[keyof typeof ViewState] | string;

// ── CEFR Levels ──
export type CEFRLevel = 'basic' | 'intermediate' | 'advanced';
export type CEFRLevelWithMixed = CEFRLevel | 'mixed';

// ── Skills (shared by Modul & Latihan) ──
export type SkillType = 'speaking' | 'listening' | 'reading' | 'writing' | 'grammar' | 'vocabulary' | 'pronunciation';

// ── Game ──
export type GameCategory = 'vocabulary' | 'grammar' | 'listening' | 'speaking';
export type GameMode = 'word-match' | 'memory-card' | 'speed-quiz' | 'crossword' | 'clan-battle';
export type GameType = 'word-match' | 'spelling-bee' | 'sentence-builder';
export type GameDifficulty = 'easy' | 'medium' | 'hard';

// ── Latihan (Practice) ──
export type PracticeQuestionType = 'multiple-choice' | 'short-answer' | 'sentence-arrange' | 'voice-record' | 'translation' | 'vocabulary';

// ── Chat AI ──
export type ChatAIMode = 'vocabulary' | 'pronunciation' | 'grammar' | 'speaking' | 'reading' | 'writing';
export type ChatScenario = 'restaurant' | 'airport' | 'interview' | 'shopping' | 'small-talk';
export type ChatDifficulty = 'easy' | 'normal' | 'challenge';

// ── Data Models ──

export interface CEFRLevelData {
  id: CEFRLevel;
  labelKey: string;      // Translation key
  sublabel: string;      // e.g. "A1 – A2"
  color: string;
  bgColor: string;
  icon: string;          // Emoji
  progress: number;      // 0-100
}

export interface SkillData {
  id: SkillType;
  labelKey: string;
  sublabelKey: string;
  icon: string;
  color: string;
  bgColor: string;
  totalDays: number;
  completedDays: number;
}

export interface DayData {
  id: number;
  titleKey: string;
  subtitleKey: string;
  status: 'completed' | 'available' | 'locked';
}

export interface GameCategoryData {
  id: GameCategory;
  labelKey: string;
  sublabelKey: string;
  icon: string;
  color: string;
  bgColor: string;
}

export interface GameModeData {
  id: GameMode;
  labelKey: string;
  sublabelKey: string;
  icon: string;
  color: string;
  bgColor: string;
}

export interface PracticeQuestionTypeData {
  id: PracticeQuestionType;
  labelKey: string;
  sublabelKey: string;
  icon: string;
  color: string;
  bgColor: string;
}

export interface ChatAIModeData {
  id: ChatAIMode;
  labelKey: string;
  sublabelKey: string;
  icon: string;
  color: string;
  bgColor: string;
}

export interface ChatScenarioData {
  id: ChatScenario;
  labelKey: string;
  sublabelKey: string;
  icon: string;
  color: string;
  bgColor: string;
}

// ── Legacy (still used by Rank, Profile etc.) ──

export interface User {
  id: number;
  name: string;
  email: string;
  avatarUrl?: string;
  xp: number;
  streak: number;
  level: number;
  createdAt: string;
}

export interface LeaderboardEntry {
  rank: number;
  user: {
    id: number;
    name: string;
    avatarUrl?: string;
    xp: number;
    streak: number;
    level: number;
  };
  isCurrentUser?: boolean;
}

export interface ChatMessage {
  id: string;
  text: string;
  isAi: boolean;
  timestamp: Date;
}

export interface GameScore {
  id: number;
  userId: number;
  gameType: string;
  score: number;
  playedAt: string;
}

// ── Courses ──
export type CourseCategory = 'work' | 'daily-life' | 'family-friends' | 'travel' | 'personal-interest';
export type CourseDifficulty = 'beginner' | 'intermediate' | 'advanced';

export interface Course {
  id: string;
  title: string;
  iconUrl: string;
  category: CourseCategory;
  difficulty: CourseDifficulty;
  totalLessons: number;
  completedLessons: number;
  progress: number;
  bgColor?: string;
  locked?: boolean;
}

export interface CourseCollection {
  id: string;
  title: string;
  subtitle: string;
  count: number;
  iconUrl: string;
  bgColor: string;
}
