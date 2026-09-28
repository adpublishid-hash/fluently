import rubricData from '../../../server/content/rubrics.json';

export type RubricLanguage = 'english' | 'japanese' | 'mandarin' | 'arabic';
export type RubricSkill = 'speaking' | 'writing';
export type SkillRubric = { target: string; expectations: string[]; prompt: string; model: string; translation: string };
export type LevelRubric = { id: string; label: string; speaking: SkillRubric; writing: SkillRubric };
export type RubricCriterion = { id: string; label: string };
export type RubricBand = { score: number; label: string; descriptor: string };

type RubricFile = {
  scale: RubricBand[];
  criteria: Record<RubricSkill, RubricCriterion[]>;
  languages: Record<RubricLanguage, LevelRubric[]>;
};

const data = rubricData as RubricFile;

export const rubricScale = data.scale;
export const rubricCriteria = data.criteria;

const englishModuleLevels: Record<string, string> = {
  beginner: 'a1', elementary: 'a2', intermediate: 'b1', 'upper-intermediate': 'b2', advanced: 'c1', proficiency: 'c2',
};

/** Maps a module/study level id to the rubric level id for the language. */
export function rubricLevelId(language: RubricLanguage, level: string): string {
  if (language === 'english') return englishModuleLevels[level] ?? level;
  if (language === 'arabic' && level === 'beginner') return 'pemula';
  return level;
}

export function getRubricLevels(language: RubricLanguage): LevelRubric[] {
  return data.languages[language] ?? [];
}

export function getLevelRubric(language: RubricLanguage, level: string): LevelRubric | undefined {
  const id = rubricLevelId(language, level);
  return getRubricLevels(language).find((item) => item.id === id);
}

export function isRubricLanguage(value?: string): value is RubricLanguage {
  return value === 'english' || value === 'japanese' || value === 'mandarin' || value === 'arabic';
}
