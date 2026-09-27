import { ArabicMakharijPracticePage, type ArabicMakharijDrill, type ArabicMakharijTopicMaterial } from '../../components/ArabicMakharijPracticePage';

const material: ArabicMakharijTopicMaterial = {
  "id": "arabic-makharij-huruf-tebal",
  "title": "Makharij 4: Huruf Tebal",
  "description": "Melatih huruf tafkhim agar bunyinya penuh dan mantap.",
  "topicNumber": 4,
  "focus": "Kha, shad, dhad, tha, zha, ghain, qaf.",
  "goal": "Dengarkan model, ucapkan pelan, lalu nilai apakah bunyimu sudah jelas dan stabil."
};

const drills: ArabicMakharijDrill[] = [
  {
    "id": "huruf-tebal-1",
    "title": "Shad",
    "letter": "ص",
    "transliteration": "shad",
    "place": "Ujung lidah dengan rongga mulut terangkat.",
    "meaning": "Sin tebal yang penuh.",
    "prompt": "Ucapkan ص dalam kata صَبْرٌ, lalu rasakan titik keluarnya.",
    "modelWord": "صَبْرٌ",
    "modelTransliteration": "shabrun",
    "modelMeaning": "sabar",
    "hint": "Bedakan dari س yang tipis. Fokus: Ujung lidah dengan rongga mulut terangkat.",
    "contrast": "Bedakan dari س yang tipis."
  },
  {
    "id": "huruf-tebal-2",
    "title": "Dhad",
    "letter": "ض",
    "transliteration": "dhad",
    "place": "Sisi lidah menyentuh geraham atas.",
    "meaning": "Dal tebal khas Arab.",
    "prompt": "Ucapkan ض dalam kata ضَوْءٌ, lalu rasakan titik keluarnya.",
    "modelWord": "ضَوْءٌ",
    "modelTransliteration": "dhawun",
    "modelMeaning": "cahaya",
    "hint": "Jangan diganti د biasa. Fokus: Sisi lidah menyentuh geraham atas.",
    "contrast": "Jangan diganti د biasa."
  },
  {
    "id": "huruf-tebal-3",
    "title": "Tha tebal",
    "letter": "ط",
    "transliteration": "tha",
    "place": "Ujung lidah dengan pangkal lidah terangkat.",
    "meaning": "Ta tebal dan penuh.",
    "prompt": "Ucapkan ط dalam kata طَالِبٌ, lalu rasakan titik keluarnya.",
    "modelWord": "طَالِبٌ",
    "modelTransliteration": "thalibun",
    "modelMeaning": "pelajar",
    "hint": "Bedakan dari ت yang tipis. Fokus: Ujung lidah dengan pangkal lidah terangkat.",
    "contrast": "Bedakan dari ت yang tipis."
  },
  {
    "id": "huruf-tebal-4",
    "title": "Qaf",
    "letter": "ق",
    "transliteration": "qaf",
    "place": "Pangkal lidah menyentuh langit-langit belakang.",
    "meaning": "Kaf tebal dari belakang.",
    "prompt": "Ucapkan ق dalam kata قَلْبٌ, lalu rasakan titik keluarnya.",
    "modelWord": "قَلْبٌ",
    "modelTransliteration": "qalbun",
    "modelMeaning": "hati",
    "hint": "Bedakan dari ك yang lebih depan dan ringan. Fokus: Pangkal lidah menyentuh langit-langit belakang.",
    "contrast": "Bedakan dari ك yang lebih depan dan ringan."
  }
];

export default function ArabicMakharijTopik4Page() {
  return <ArabicMakharijPracticePage material={material} drills={drills} />;
}
