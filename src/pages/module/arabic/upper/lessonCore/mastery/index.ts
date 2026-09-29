import type { ArabicSkillId } from '../../../arabicModuleData';
import type { LessonCoreTuple } from '../types';
import { grammar } from './grammar';
import { istima } from './istima';
import { kalam } from './kalam';
import { kitabah } from './kitabah';
import { mufradat } from './mufradat';
import { pronunciation } from './pronunciation';
import { qiraah } from './qiraah';

export const masteryCore: Record<ArabicSkillId, LessonCoreTuple[]> = { kalam, istima, qiraah, kitabah, mufradat, grammar, pronunciation };
