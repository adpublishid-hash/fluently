import type { JapaneseSkillId } from '../../japaneseModuleData';
import type { LessonCoreTuple } from '../types';
import { grammar } from './grammar';
import { listening } from './listening';
import { pronunciation } from './pronunciation';
import { reading } from './reading';
import { speaking } from './speaking';
import { vocabulary } from './vocabulary';
import { writing } from './writing';

export const advancedCore: Record<JapaneseSkillId, LessonCoreTuple[]> = { grammar, speaking, listening, reading, writing, vocabulary, pronunciation };
