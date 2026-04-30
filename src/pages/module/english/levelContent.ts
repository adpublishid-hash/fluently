import type { SkillType } from '../../../types';

type LevelSkill = {
  id: SkillType;
  label: string;
  sublabel: string;
  icon: string;
  color: string;
  bgColor: string;
  progress: number;
};

type LevelContent = {
  titleKey: string;
  subtitle: string;
  badge: string;
  badgeIcon: string;
  badgeColor: string;
  skillsIntro: string;
  skills: LevelSkill[];
};

const baseSkill = {
  speaking: { icon: '/assets/icons/new/7. Webinar.png', color: '#E74C3C', bgColor: '#FDEDEC' },
  listening: { icon: '/assets/icons/new/5. Video Lecture.png', color: '#3498DB', bgColor: '#EBF5FB' },
  reading: { icon: '/assets/icons/new/4. E-Library.png', color: '#4FA3D1', bgColor: '#EAF7FC' },
  writing: { icon: '/assets/icons/new/25. Pen & Notebook.png', color: '#F39C12', bgColor: '#FEF9E7' },
  grammar: { icon: '/assets/icons/new/21. Pencil & Ruler.png', color: '#8E44AD', bgColor: '#F4ECF7' },
  vocabulary: { icon: '/assets/icons/new/16. Language Learning.png', color: '#2980B9', bgColor: '#D6EAF8' },
  pronunciation: { icon: '/assets/icons/new/17. Learning Method.png', color: '#E83E8C', bgColor: '#FDEDF4' },
} satisfies Record<SkillType, { icon: string; color: string; bgColor: string }>;

function skill(id: SkillType, label: string, sublabel: string, progress: number): LevelSkill {
  return { id, label, sublabel, progress, ...baseSkill[id] };
}

export const englishLevelContent: Record<string, LevelContent> = {
  beginner: {
    titleKey: 'cefr.beginner',
    subtitle: 'Build survival English for greetings, names, numbers, time, and simple daily needs.',
    badge: 'A1',
    badgeIcon: '/assets/icons/new/1. Creative Learning.png',
    badgeColor: '#7EC3E6',
    skillsIntro: 'Start with short, controlled language you can use immediately.',
    skills: [
      skill('speaking', 'Speaking', 'Greet, introduce yourself, ask simple questions', 40),
      skill('listening', 'Listening', 'Catch slow speech, names, numbers, and key words', 27),
      skill('reading', 'Reading', 'Understand signs, short messages, and simple forms', 50),
      skill('writing', 'Writing', 'Write basic sentences, profiles, and short notes', 17),
      skill('grammar', 'Grammar', 'Be, have, present simple, articles, and basic word order', 33),
      skill('vocabulary', 'Vocabulary', 'Core daily words for people, places, food, and routines', 60),
      skill('pronunciation', 'Pronunciation', 'Clear alphabet sounds, word stress, and simple intonation', 33),
    ],
  },
  elementary: {
    titleKey: 'cefr.elementary',
    subtitle: 'Expand A2 communication for routine tasks, personal experiences, plans, and familiar topics.',
    badge: 'A2',
    badgeIcon: '/assets/icons/new/3. Online Course.png',
    badgeColor: '#4FA3D1',
    skillsIntro: 'Move from single sentences into connected everyday communication.',
    skills: [
      skill('speaking', 'Speaking', 'Handle routine conversations about work, travel, and shopping', 28),
      skill('listening', 'Listening', 'Follow short dialogues and public announcements', 20),
      skill('reading', 'Reading', 'Read short emails, menus, notices, and simple stories', 35),
      skill('writing', 'Writing', 'Write connected messages, invitations, and descriptions', 18),
      skill('grammar', 'Grammar', 'Past simple, future plans, comparatives, modals, and questions', 25),
      skill('vocabulary', 'Vocabulary', 'Everyday topics: health, transport, hobbies, and services', 32),
      skill('pronunciation', 'Pronunciation', 'Sentence stress, endings, and clearer connected speech', 20),
    ],
  },
  intermediate: {
    titleKey: 'cefr.intermediate',
    subtitle: 'Develop B1 independence for opinions, stories, problem-solving, and real-life conversations.',
    badge: 'B1',
    badgeIcon: '/assets/icons/new/4. E-Library.png',
    badgeColor: '#3498DB',
    skillsIntro: 'Practice longer answers, clearer structure, and more flexible language.',
    skills: [
      skill('speaking', 'Speaking', 'Explain opinions, experiences, goals, and simple arguments', 12),
      skill('listening', 'Listening', 'Understand main points in conversations, podcasts, and lessons', 8),
      skill('reading', 'Reading', 'Read articles, instructions, and personal narratives', 15),
      skill('writing', 'Writing', 'Write paragraphs, emails, reviews, and short reports', 5),
      skill('grammar', 'Grammar', 'Present perfect, conditionals, passive basics, and relative clauses', 10),
      skill('vocabulary', 'Vocabulary', 'Topic vocabulary for work, media, travel, and relationships', 18),
      skill('pronunciation', 'Pronunciation', 'Connected speech, rhythm, linking, and natural stress', 10),
    ],
  },
  'upper-intermediate': {
    titleKey: 'cefr.upperIntermediate',
    subtitle: 'Strengthen B2 fluency for detailed discussion, academic topics, and professional situations.',
    badge: 'B2',
    badgeIcon: '/assets/icons/new/20. Completion Certificate.png',
    badgeColor: '#1A5276',
    skillsIntro: 'Focus on nuance, accuracy, and confident extended communication.',
    skills: [
      skill('speaking', 'Speaking', 'Discuss abstract topics, defend opinions, and negotiate meaning', 0),
      skill('listening', 'Listening', 'Follow lectures, debates, interviews, and varied accents', 0),
      skill('reading', 'Reading', 'Analyze longer articles, arguments, and academic-style texts', 0),
      skill('writing', 'Writing', 'Write essays, reports, summaries, and formal correspondence', 0),
      skill('grammar', 'Grammar', 'Complex clauses, advanced conditionals, discourse markers', 0),
      skill('vocabulary', 'Vocabulary', 'Academic, workplace, collocation, and idiomatic vocabulary', 0),
      skill('pronunciation', 'Pronunciation', 'Natural intonation, emphasis, pausing, and fluency control', 0),
    ],
  },
  advanced: {
    titleKey: 'cefr.advanced',
    subtitle: 'Refine C1 English for complex ideas, specialized topics, persuasion, and high accuracy.',
    badge: 'C1',
    badgeIcon: '/assets/icons/new/30. Badge & Achievement.png',
    badgeColor: '#1B2631',
    skillsIntro: 'Polish precision, register control, and sophisticated expression.',
    skills: [
      skill('speaking', 'Speaking', 'Present complex arguments and adapt tone to context', 0),
      skill('listening', 'Listening', 'Track implicit meaning, stance, humor, and fast interaction', 0),
      skill('reading', 'Reading', 'Interpret dense texts, inference, bias, and rhetorical structure', 0),
      skill('writing', 'Writing', 'Produce structured essays, proposals, critiques, and analysis', 0),
      skill('grammar', 'Grammar', 'Inversion, nominalization, participle clauses, and emphasis', 0),
      skill('vocabulary', 'Vocabulary', 'Precise academic, legal, political, and professional lexis', 0),
      skill('pronunciation', 'Pronunciation', 'Advanced stress, tone, discourse flow, and accent clarity', 0),
    ],
  },
  proficiency: {
    titleKey: 'cefr.proficiency',
    subtitle: 'Master C2-level control for near-native nuance, style, accuracy, and specialized discourse.',
    badge: 'C2',
    badgeIcon: '/assets/icons/new/30. Badge & Achievement.png',
    badgeColor: '#1C2833',
    skillsIntro: 'Work on mastery: subtle meaning, elegance, speed, and complete control.',
    skills: [
      skill('speaking', 'Speaking', 'Speak with nuance, authority, precision, and flexible style', 0),
      skill('listening', 'Listening', 'Understand rapid, idiomatic, layered, and specialized speech', 0),
      skill('reading', 'Reading', 'Evaluate literature, research, policy, and complex argumentation', 0),
      skill('writing', 'Writing', 'Write polished academic, creative, and professional texts', 0),
      skill('grammar', 'Grammar', 'Control rare structures, stylistic variation, and sentence rhythm', 0),
      skill('vocabulary', 'Vocabulary', 'Command idiom, register, connotation, and domain terminology', 0),
      skill('pronunciation', 'Pronunciation', 'Fine-tune prosody, emphasis, pacing, and public delivery', 0),
    ],
  },
};
