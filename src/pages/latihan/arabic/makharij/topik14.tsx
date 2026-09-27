import { ArabicMakharijPracticePage, type ArabicMakharijDrill, type ArabicMakharijTopicMaterial } from '../../components/ArabicMakharijPracticePage';

const material: ArabicMakharijTopicMaterial = {
  "id": "arabic-makharij-qaf-dan-kaf",
  "title": "Makharij 14: Qaf dan Kaf",
  "description": "Membedakan ق yang tebal dan ك yang ringan.",
  "topicNumber": 14,
  "focus": "Pangkal lidah dan tengah lidah.",
  "goal": "Dengarkan model, ucapkan pelan, lalu nilai apakah bunyimu sudah jelas dan stabil."
};

const drills: ArabicMakharijDrill[] = [
  {
    "id": "qaf-dan-kaf-1",
    "title": "Qaf",
    "letter": "ق",
    "transliteration": "qaf",
    "place": "Pangkal lidah menyentuh langit-langit belakang.",
    "meaning": "Qaf tebal.",
    "prompt": "Ucapkan ق dalam kata قَلْبٌ, lalu rasakan titik keluarnya.",
    "modelWord": "قَلْبٌ",
    "modelTransliteration": "qalbun",
    "modelMeaning": "hati",
    "hint": "Jangan menjadi كَلْبٌ. Fokus: Pangkal lidah menyentuh langit-langit belakang.",
    "contrast": "Jangan menjadi كَلْبٌ."
  },
  {
    "id": "qaf-dan-kaf-2",
    "title": "Kaf",
    "letter": "ك",
    "transliteration": "kaf",
    "place": "Tengah lidah menyentuh langit-langit.",
    "meaning": "Kaf ringan.",
    "prompt": "Ucapkan ك dalam kata كَلْبٌ, lalu rasakan titik keluarnya.",
    "modelWord": "كَلْبٌ",
    "modelTransliteration": "kalbun",
    "modelMeaning": "anjing",
    "hint": "Jangan ditebalkan seperti ق. Fokus: Tengah lidah menyentuh langit-langit.",
    "contrast": "Jangan ditebalkan seperti ق."
  },
  {
    "id": "qaf-dan-kaf-3",
    "title": "Qi",
    "letter": "قِ",
    "transliteration": "qi",
    "place": "Qaf dengan kasrah tetap terasa belakang.",
    "meaning": "Qaf kasrah.",
    "prompt": "Ucapkan قِ dalam kata قِطَارٌ, lalu rasakan titik keluarnya.",
    "modelWord": "قِطَارٌ",
    "modelTransliteration": "qitarun",
    "modelMeaning": "kereta",
    "hint": "Kasrah tidak membuat qaf menjadi kaf. Fokus: Qaf dengan kasrah tetap terasa belakang.",
    "contrast": "Kasrah tidak membuat qaf menjadi kaf."
  },
  {
    "id": "qaf-dan-kaf-4",
    "title": "Ku",
    "letter": "كُ",
    "transliteration": "ku",
    "place": "Kaf dengan dhammah tetap ringan.",
    "meaning": "Kaf dhammah.",
    "prompt": "Ucapkan كُ dalam kata كُرْسِيٌّ, lalu rasakan titik keluarnya.",
    "modelWord": "كُرْسِيٌّ",
    "modelTransliteration": "kursiyyun",
    "modelMeaning": "kursi",
    "hint": "Jaga kaf tetap depan dan ringan. Fokus: Kaf dengan dhammah tetap ringan.",
    "contrast": "Jaga kaf tetap depan dan ringan."
  }
];

export default function ArabicMakharijTopik14Page() {
  return <ArabicMakharijPracticePage material={material} drills={drills} />;
}
