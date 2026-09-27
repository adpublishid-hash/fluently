import { ArabicMakharijPracticePage, type ArabicMakharijDrill, type ArabicMakharijTopicMaterial } from '../../components/ArabicMakharijPracticePage';

const material: ArabicMakharijTopicMaterial = {
  "id": "arabic-makharij-sin-dan-shad",
  "title": "Makharij 15: Sin dan Shad",
  "description": "Membedakan س tipis dan ص tebal.",
  "topicNumber": 15,
  "focus": "Kontras tipis dan tebal pada bunyi s.",
  "goal": "Dengarkan model, ucapkan pelan, lalu nilai apakah bunyimu sudah jelas dan stabil."
};

const drills: ArabicMakharijDrill[] = [
  {
    "id": "sin-dan-shad-1",
    "title": "Sin tipis",
    "letter": "س",
    "transliteration": "sin",
    "place": "Ujung lidah dekat gigi dengan bunyi tipis.",
    "meaning": "S tipis.",
    "prompt": "Ucapkan س dalam kata سَلَامٌ, lalu rasakan titik keluarnya.",
    "modelWord": "سَلَامٌ",
    "modelTransliteration": "salamun",
    "modelMeaning": "salam",
    "hint": "Jangan menaikkan pangkal lidah. Fokus: Ujung lidah dekat gigi dengan bunyi tipis.",
    "contrast": "Jangan menaikkan pangkal lidah."
  },
  {
    "id": "sin-dan-shad-2",
    "title": "Shad tebal",
    "letter": "ص",
    "transliteration": "shad",
    "place": "Bunyi s dengan rongga mulut lebih penuh.",
    "meaning": "S tebal.",
    "prompt": "Ucapkan ص dalam kata صَبْرٌ, lalu rasakan titik keluarnya.",
    "modelWord": "صَبْرٌ",
    "modelTransliteration": "shabrun",
    "modelMeaning": "sabar",
    "hint": "Bedakan dari سَبْرٌ. Fokus: Bunyi s dengan rongga mulut lebih penuh.",
    "contrast": "Bedakan dari سَبْرٌ."
  },
  {
    "id": "sin-dan-shad-3",
    "title": "Si",
    "letter": "سِ",
    "transliteration": "si",
    "place": "Sin dengan kasrah ringan.",
    "meaning": "Sin kasrah.",
    "prompt": "Ucapkan سِ dalam kata سِرٌّ, lalu rasakan titik keluarnya.",
    "modelWord": "سِرٌّ",
    "modelTransliteration": "sirrun",
    "modelMeaning": "rahasia",
    "hint": "Tetap tipis meski cepat. Fokus: Sin dengan kasrah ringan.",
    "contrast": "Tetap tipis meski cepat."
  },
  {
    "id": "sin-dan-shad-4",
    "title": "Sha",
    "letter": "صَ",
    "transliteration": "sha",
    "place": "Shad dengan fathah tebal.",
    "meaning": "Shad fathah.",
    "prompt": "Ucapkan صَ dalam kata صَامَ, lalu rasakan titik keluarnya.",
    "modelWord": "صَامَ",
    "modelTransliteration": "shama",
    "modelMeaning": "dia berpuasa",
    "hint": "Jaga ketebalan tanpa berlebihan. Fokus: Shad dengan fathah tebal.",
    "contrast": "Jaga ketebalan tanpa berlebihan."
  }
];

export default function ArabicMakharijTopik15Page() {
  return <ArabicMakharijPracticePage material={material} drills={drills} />;
}
