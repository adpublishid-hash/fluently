// Generates plausible wrong verb forms from a root so Sharaf Forms tests morphology, not root matching.
const FATHA = 'َ';
const DAMMA = 'ُ';
const KASRA = 'ِ';
const SHADDA = 'ّ';
const SUKUN = 'ْ';

export type FormKey = 'Madhi' | 'Mudhari' | 'Amr' | 'Masdar';

/** Canonical mark order so generated and authored spellings compare equal. */
export const arabicNormalize = (value: string) => value.normalize('NFC');

const strength: Record<string, number> = { [KASRA]: 3, [DAMMA]: 2, [FATHA]: 1, [SUKUN]: 0 };
const seatFor: Record<string, string> = { [KASRA]: 'ئ', [DAMMA]: 'ؤ', [FATHA]: 'أ' };

function radicals(root: string) {
  return root.split('-');
}

/** Writes a hamza radical on its seat: medial hamza takes the stronger neighbouring vowel, final hamza the preceding one. */
function hamza(letter: string, before: string, on: string, final: boolean) {
  if (letter !== 'أ' && letter !== 'ء') return letter;
  const vowel = final ? before : strength[before] >= strength[on] ? before : on;
  return seatFor[vowel] ?? 'أ';
}

/** Form I madhi/mudhari with each bab vowel plus the passive, e.g. دَرَسَ دَرِسَ دَرُسَ دُرِسَ. */
export function formOneVariants(root: string, form: 'Madhi' | 'Mudhari') {
  const [c1, c2, c3] = radicals(root);
  const babs = [FATHA, KASRA, DAMMA];
  if (form === 'Madhi') {
    const build = (v1: string, v2: string) => `${c1}${v1}${hamza(c2, v1, v2, false)}${v2}${hamza(c3, v2, FATHA, true)}${FATHA}`;
    return [...babs.map((vowel) => build(FATHA, vowel)), build(DAMMA, KASRA)].map(arabicNormalize);
  }
  const build = (prefix: string, v2: string) => `${prefix}${c1}${SUKUN}${hamza(c2, SUKUN, v2, false)}${v2}${hamza(c3, v2, DAMMA, true)}${DAMMA}`;
  return [...babs.map((vowel) => build(`ي${FATHA}`, vowel)), build(`ي${DAMMA}`, FATHA)].map(arabicNormalize);
}

type Template = Record<FormKey, (c1: string, c2: string, c3: string) => string>;

const F = FATHA;
const D = DAMMA;
const K = KASRA;
const S = SUKUN;
const SH = SHADDA;

export const waznTemplates: Record<string, Template> = {
  'فَعَّلَ': {
    Madhi: (a, b, c) => `${a}${F}${b}${SH}${F}${c}${F}`,
    Mudhari: (a, b, c) => `ي${D}${a}${F}${b}${SH}${K}${c}${D}`,
    Amr: (a, b, c) => `${a}${F}${b}${SH}${K}${c}${S}`,
    Masdar: (a, b, c) => `ت${F}${a}${S}${b}${K}ي${c}`,
  },
  'فَاعَلَ': {
    Madhi: (a, b, c) => `${a}${F}ا${b}${F}${c}${F}`,
    Mudhari: (a, b, c) => `ي${D}${a}${F}ا${b}${K}${c}${D}`,
    Amr: (a, b, c) => `${a}${F}ا${b}${K}${c}${S}`,
    Masdar: (a, b, c) => `م${D}${a}${F}ا${b}${F}${c}${F}ة`,
  },
  'أَفْعَلَ': {
    Madhi: (a, b, c) => `أ${F}${a}${S}${b}${F}${c}${F}`,
    Mudhari: (a, b, c) => `ي${D}${a}${S}${b}${K}${c}${D}`,
    Amr: (a, b, c) => `أ${F}${a}${S}${b}${K}${c}${S}`,
    Masdar: (a, b, c) => `إ${K}${a}${S}${b}${F}ا${c}`,
  },
  'تَفَعَّلَ': {
    Madhi: (a, b, c) => `ت${F}${a}${F}${b}${SH}${F}${c}${F}`,
    Mudhari: (a, b, c) => `ي${F}ت${F}${a}${F}${b}${SH}${F}${c}${D}`,
    Amr: (a, b, c) => `ت${F}${a}${F}${b}${SH}${F}${c}${S}`,
    Masdar: (a, b, c) => `ت${F}${a}${F}${b}${SH}${D}${c}`,
  },
  'تَفَاعَلَ': {
    Madhi: (a, b, c) => `ت${F}${a}${F}ا${b}${F}${c}${F}`,
    Mudhari: (a, b, c) => `ي${F}ت${F}${a}${F}ا${b}${F}${c}${D}`,
    Amr: (a, b, c) => `ت${F}${a}${F}ا${b}${F}${c}${S}`,
    Masdar: (a, b, c) => `ت${F}${a}${F}ا${b}${D}${c}`,
  },
  'اِنْفَعَلَ': {
    Madhi: (a, b, c) => `ا${K}ن${S}${a}${F}${b}${F}${c}${F}`,
    Mudhari: (a, b, c) => `ي${F}ن${S}${a}${F}${b}${K}${c}${D}`,
    Amr: (a, b, c) => `ا${K}ن${S}${a}${F}${b}${K}${c}${S}`,
    Masdar: (a, b, c) => `ا${K}ن${S}${a}${K}${b}${F}ا${c}`,
  },
  'اِفْتَعَلَ': {
    Madhi: (a, b, c) => `ا${K}${a}${S}ت${F}${b}${F}${c}${F}`,
    Mudhari: (a, b, c) => `ي${F}${a}${S}ت${F}${b}${K}${c}${D}`,
    Amr: (a, b, c) => `ا${K}${a}${S}ت${F}${b}${K}${c}${S}`,
    Masdar: (a, b, c) => `ا${K}${a}${S}ت${K}${b}${F}ا${c}`,
  },
  'اِسْتَفْعَلَ': {
    Madhi: (a, b, c) => `ا${K}س${S}ت${F}${a}${S}${b}${F}${c}${F}`,
    Mudhari: (a, b, c) => `ي${F}س${S}ت${F}${a}${S}${b}${K}${c}${D}`,
    Amr: (a, b, c) => `ا${K}س${S}ت${F}${a}${S}${b}${K}${c}${S}`,
    Masdar: (a, b, c) => `ا${K}س${S}ت${K}${a}${S}${b}${F}ا${c}`,
  },
};

/** Wazns whose regular template would be misspelt for this root (assimilation, hollow or doubled radicals). */
function waznFits(wazn: string, [c1, c2, c3]: string[]) {
  const doubled = c2 === c3;
  const hollow = c2 === 'و' || c2 === 'ي';
  const soundOnly = ['أَفْعَلَ', 'اِنْفَعَلَ', 'اِفْتَعَلَ', 'اِسْتَفْعَلَ'];
  if ((doubled || hollow) && soundOnly.includes(wazn)) return false;
  if (doubled && (wazn === 'فَاعَلَ' || wazn === 'تَفَاعَلَ')) return false;
  if (wazn === 'اِفْتَعَلَ' && 'صضطظدذزثو'.includes(c1)) return false;
  return true;
}

/** The requested form of the same root in every other wazn that spells regularly for it. */
export function otherWaznForms(root: string, ownWazn: string, form: FormKey) {
  const letters = radicals(root);
  return Object.entries(waznTemplates)
    .filter(([wazn]) => wazn !== ownWazn && waznFits(wazn, letters))
    .map(([, template]) => arabicNormalize(template[form](letters[0], letters[1], letters[2])));
}
