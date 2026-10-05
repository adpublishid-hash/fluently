import type { JapaneseSkillId } from '../../../../module/japanese/japaneseModuleData';
import type { JapaneseQuizTopic } from '../types';
import { grammar } from './grammar';
import { listening } from './listening';
import { pronunciation } from './pronunciation';
import { reading } from './reading';
import { speaking } from './speaking';
import { vocabulary } from './vocabulary';
import { writing } from './writing';

export const proficiencyQuiz: Partial<Record<JapaneseSkillId, JapaneseQuizTopic[]>> = { grammar, speaking, listening, reading, writing, vocabulary, pronunciation };
