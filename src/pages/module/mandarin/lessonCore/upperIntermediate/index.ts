import type { MandarinSkillId } from '../../mandarinModuleData';
import type { LessonCoreTuple } from '../types';
import { grammar } from './grammar';
import { listening } from './listening';
import { pronunciation } from './pronunciation';
import { reading } from './reading';
import { speaking } from './speaking';
import { vocabulary } from './vocabulary';
import { writing } from './writing';

export const upperIntermediateCore: Record<MandarinSkillId, LessonCoreTuple[]> = { grammar, speaking, listening, reading, writing, vocabulary, pronunciation };
