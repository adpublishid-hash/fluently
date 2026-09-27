import { ArabicMakharijPracticePage, type ArabicMakharijDrill, type ArabicMakharijTopicMaterial } from '../../components/ArabicMakharijPracticePage';

const material: ArabicMakharijTopicMaterial = {
  "id": "arabic-makharij-hamzah",
  "title": "Makharij 12: Hamzah",
  "description": "Melatih hamzah di awal, tengah, dan akhir kata.",
  "topicNumber": 12,
  "focus": "Bunyi putus yang bersih.",
  "goal": "Dengarkan model, ucapkan pelan, lalu nilai apakah bunyimu sudah jelas dan stabil."
};

const drills: ArabicMakharijDrill[] = [
  {
    "id": "hamzah-1",
    "title": "Hamzah awal",
    "letter": "أ",
    "transliteration": "a",
    "place": "Pangkal tenggorokan dengan hentakan awal.",
    "meaning": "Hamzah di awal.",
    "prompt": "Ucapkan أ dalam kata أَكَلَ, lalu rasakan titik keluarnya.",
    "modelWord": "أَكَلَ",
    "modelTransliteration": "akala",
    "modelMeaning": "dia makan",
    "hint": "Jangan dilembutkan seperti ع. Fokus: Pangkal tenggorokan dengan hentakan awal.",
    "contrast": "Jangan dilembutkan seperti ع."
  },
  {
    "id": "hamzah-2",
    "title": "Hamzah kasrah",
    "letter": "إ",
    "transliteration": "i",
    "place": "Pangkal tenggorokan dengan i pendek.",
    "meaning": "Hamzah awal kasrah.",
    "prompt": "Ucapkan إ dalam kata إِمَامٌ, lalu rasakan titik keluarnya.",
    "modelWord": "إِمَامٌ",
    "modelTransliteration": "imamun",
    "modelMeaning": "imam",
    "hint": "Mulai dari hentakan suara jelas. Fokus: Pangkal tenggorokan dengan i pendek.",
    "contrast": "Mulai dari hentakan suara jelas."
  },
  {
    "id": "hamzah-3",
    "title": "Hamzah tengah",
    "letter": "ؤ",
    "transliteration": "u",
    "place": "Hamzah di tengah kata dengan putus singkat.",
    "meaning": "Hamzah tengah.",
    "prompt": "Ucapkan ؤ dalam kata سُؤَالٌ, lalu rasakan titik keluarnya.",
    "modelWord": "سُؤَالٌ",
    "modelTransliteration": "sualun",
    "modelMeaning": "pertanyaan",
    "hint": "Jangan menghilangkan putusnya. Fokus: Hamzah di tengah kata dengan putus singkat.",
    "contrast": "Jangan menghilangkan putusnya."
  },
  {
    "id": "hamzah-4",
    "title": "Hamzah akhir",
    "letter": "ء",
    "transliteration": "hamzah",
    "place": "Hamzah akhir berhenti jelas.",
    "meaning": "Hamzah di akhir.",
    "prompt": "Ucapkan ء dalam kata مَاءٌ, lalu rasakan titik keluarnya.",
    "modelWord": "مَاءٌ",
    "modelTransliteration": "maun",
    "modelMeaning": "air",
    "hint": "Akhiri dengan putus ringan. Fokus: Hamzah akhir berhenti jelas.",
    "contrast": "Akhiri dengan putus ringan."
  }
];

export default function ArabicMakharijTopik12Page() {
  return <ArabicMakharijPracticePage material={material} drills={drills} />;
}
