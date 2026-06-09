export type UserPlan = 'free' | 'pro' | 'lifetime';

type PlanUser = {
  email?: string;
  plan?: UserPlan;
  planExpiresAt?: string | null;
  role?: string;
} | null;

export const ADMIN_EMAIL = 'wahib.chelsea@gmail.com';

export type PremiumFeature =
  | 'module'
  | 'practice'
  | 'game'
  | 'chat'
  | 'ielts'
  | 'exam'
  | 'goals'
  | 'notes'
  | 'analytics'
  | 'admin';

export type PremiumBlock = {
  feature: PremiumFeature;
  title: string;
  reason: string;
};

export const FREE_LIMITS = {
  moduleLessons: 5,
  practiceTopics: 3,
  gameModes: 5,
  chatTopics: 1,
  goals: 2,
  notes: 5,
};

export const FREE_GAME_MODE_IDS = ['word-match', 'letter-quest', 'sentence-builder', 'tense-master', 'verb-forms'];
export const FREE_CHAT_SCENARIO_IDS = ['a1', 'a2'];

export const FREE_PRACTICE_TOPIC_IDS: Record<string, string[]> = {
  vocabulary: ['general', 'business-office', 'travel-tourism'],
  grammar: ['general-grammar', 'be-auxiliary', 'nouns-articles'],
  listening: ['coffee-order', 'hotel-check-in', 'job-interview'],
  speaking: ['self-introduction', 'daily-routine', 'ordering-food'],
  writing: ['simple-sentences', 'daily-journal', 'email-request'],
  reading: ['daily-life', 'school-notice', 'travel-blog'],
};

export function isAdminEmail(user: PlanUser) {
  return (user?.email ?? '').trim().toLowerCase() === ADMIN_EMAIL;
}

export function getEffectivePlan(user: PlanUser): UserPlan {
  if (!user) return 'free';
  if (isAdminEmail(user) || user.plan === 'lifetime') return 'lifetime';
  if (user.plan === 'pro') {
    if (!user.planExpiresAt) return 'pro';
    return new Date(user.planExpiresAt).getTime() > Date.now() ? 'pro' : 'free';
  }
  return 'free';
}

export function hasFullAccess(user: PlanUser) {
  return getEffectivePlan(user) !== 'free';
}

function getPracticeSkill(pathname: string) {
  const parts = pathname.split('/').filter(Boolean);
  if (parts[0] !== 'latihan') return null;
  if (parts.length === 2) return parts[1];
  if (parts.length >= 3) return parts[2];
  return null;
}

export function getPremiumBlock(pathname: string, search: string, user: PlanUser): PremiumBlock | null {
  if (pathname.startsWith('/admin') && !isAdminEmail(user)) {
    return {
      feature: 'admin',
      title: 'Akses admin dibatasi',
      reason: `Admin hanya bisa diakses oleh ${ADMIN_EMAIL}.`,
    };
  }

  if (hasFullAccess(user) || pathname === '/upgrade') return null;

  if (pathname.startsWith('/ielts')) {
    return {
      feature: 'ielts',
      title: 'IELTS hanya untuk Pro',
      reason: 'Free member bisa belajar modul inti dulu. IELTS Prep terbuka untuk member Pro dan Lifetime.',
    };
  }

  if (pathname.startsWith('/ujian')) {
    return {
      feature: 'exam',
      title: 'Exam premium terkunci',
      reason: 'TOEFL, IELTS, dan exam mode hanya tersedia untuk member Pro dan Lifetime.',
    };
  }

  if (pathname.startsWith('/analytics')) {
    return {
      feature: 'analytics',
      title: 'Analytics hanya untuk Pro',
      reason: 'Upgrade untuk membuka analisis progres, performa skill, dan insight belajar lengkap.',
    };
  }

  const lessonMatch = pathname.match(/\/lesson-(\d+)(?:\/)?$/);
  if (pathname.startsWith('/modul/') && lessonMatch && Number(lessonMatch[1]) > FREE_LIMITS.moduleLessons) {
    return {
      feature: 'module',
      title: 'Lesson premium terkunci',
      reason: `Free member hanya bisa membuka Lesson 1-${FREE_LIMITS.moduleLessons} di setiap modul.`,
    };
  }

  if (pathname.startsWith('/latihan/')) {
    const topicId = new URLSearchParams(search).get('topic');
    const skillId = getPracticeSkill(pathname);
    if (topicId && skillId) {
      const freeTopics = FREE_PRACTICE_TOPIC_IDS[skillId] || [];
      if (freeTopics.length && !freeTopics.includes(topicId)) {
        return {
          feature: 'practice',
          title: 'Topik practice premium',
          reason: `Free member hanya bisa membuka ${FREE_LIMITS.practiceTopics} topik pertama di setiap latihan.`,
        };
      }
    }
  }

  if (pathname.startsWith('/game/')) {
    const parts = pathname.split('/').filter(Boolean);
    const modeId = parts[2];
    if (modeId && !FREE_GAME_MODE_IDS.includes(modeId)) {
      return {
        feature: 'game',
        title: 'Game premium terkunci',
        reason: `Free member hanya bisa memainkan ${FREE_LIMITS.gameModes} game pertama.`,
      };
    }
  }

  if (pathname.startsWith('/chat/')) {
    const parts = pathname.split('/').filter(Boolean);
    const scenarioId = parts[2];
    if (scenarioId && !FREE_CHAT_SCENARIO_IDS.includes(scenarioId)) {
      return {
        feature: 'chat',
        title: 'Level AI Chat premium',
        reason: 'Free member hanya bisa memakai AI Chat di A1 Beginner dan A2 Elementary. Upgrade Pro untuk membuka B1 sampai C2.',
      };
    }
  }

  return null;
}
