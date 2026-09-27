import { ArabicMakharijPracticePage, type ArabicMakharijDrill, type ArabicMakharijTopicMaterial } from '../../components/ArabicMakharijPracticePage';

const material: ArabicMakharijTopicMaterial = {
  "id": "arabic-makharij-dal-dan-dhad",
  "title": "Makharij 16: Dal dan Dhad",
  "description": "Membedakan د tipis dan ض tebal.",
  "topicNumber": 16,
  "focus": "Ujung lidah dan sisi lidah.",
  "goal": "Dengarkan model, ucapkan pelan, lalu nilai apakah bunyimu sudah jelas dan stabil."
};

const drills: ArabicMakharijDrill[] = [
  {
    "id": "dal-dan-dhad-1",
    "title": "Dal",
    "letter": "د",
    "transliteration": "dal",
    "place": "Ujung lidah menyentuh pangkal gigi atas.",
    "meaning": "Dal tipis.",
    "prompt": "Ucapkan د dalam kata دَارٌ, lalu rasakan titik keluarnya.",
    "modelWord": "دَارٌ",
    "modelTransliteration": "darun",
    "modelMeaning": "rumah",
    "hint": "Jangan ditebalkan seperti ض. Fokus: Ujung lidah menyentuh pangkal gigi atas.",
    "contrast": "Jangan ditebalkan seperti ض."
  },
  {
    "id": "dal-dan-dhad-2",
    "title": "Dhad",
    "letter": "ض",
    "transliteration": "dhad",
    "place": "Sisi lidah menyentuh geraham atas.",
    "meaning": "Dhad tebal khas Arab.",
    "prompt": "Ucapkan ض dalam kata ضَرَبَ, lalu rasakan titik keluarnya.",
    "modelWord": "ضَرَبَ",
    "modelTransliteration": "dharaba",
    "modelMeaning": "dia memukul",
    "hint": "Jangan diganti د biasa. Fokus: Sisi lidah menyentuh geraham atas.",
    "contrast": "Jangan diganti د biasa."
  },
  {
    "id": "dal-dan-dhad-3",
    "title": "Di",
    "letter": "دِ",
    "transliteration": "di",
    "place": "Dal dengan kasrah tipis.",
    "meaning": "Dal kasrah.",
    "prompt": "Ucapkan دِ dalam kata دِينٌ, lalu rasakan titik keluarnya.",
    "modelWord": "دِينٌ",
    "modelTransliteration": "dinun",
    "modelMeaning": "agama",
    "hint": "Tetap ringan dan jelas. Fokus: Dal dengan kasrah tipis.",
    "contrast": "Tetap ringan dan jelas."
  },
  {
    "id": "dal-dan-dhad-4",
    "title": "Dha",
    "letter": "ضَ",
    "transliteration": "dha",
    "place": "Dhad dengan fathah tebal.",
    "meaning": "Dhad fathah.",
    "prompt": "Ucapkan ضَ dalam kata ضَوْءٌ, lalu rasakan titik keluarnya.",
    "modelWord": "ضَوْءٌ",
    "modelTransliteration": "dhawun",
    "modelMeaning": "cahaya",
    "hint": "Rasakan sisi lidah bekerja. Fokus: Dhad dengan fathah tebal.",
    "contrast": "Rasakan sisi lidah bekerja."
  }
];

export default function ArabicMakharijTopik16Page() {
  return <ArabicMakharijPracticePage material={material} drills={drills} />;
}
