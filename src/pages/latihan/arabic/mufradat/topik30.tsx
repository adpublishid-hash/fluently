import { ArabicMufradatPracticePage, type ArabicMufradatDrill, type ArabicMufradatTopicMaterial } from '../../components/ArabicMufradatPracticePage';

const material: ArabicMufradatTopicMaterial = {
  "id": "arabic-mufradat-negara",
  "title": "Mufradat 30: Negara",
  "description": "Kosakata negara dan identitas umum.",
  "topicNumber": 30,
  "focus": "Hafalkan arti, pelafalan, dan penggunaan kosakata tema negara.",
  "goal": "Kenali kata Arab, ucapkan dengan jelas, lalu tulis arti atau contoh pemakaiannya."
};

const drills: ArabicMufradatDrill[] = [
  {
    "id": "negara-1",
    "arabic": "دَوْلَةٌ",
    "transliteration": "daulatun",
    "meaning": "negara",
    "category": "Negara",
    "example": "كَلِمَةُ الْيَوْمِ: دَوْلَةٌ",
    "prompt": "Apa arti kata دَوْلَةٌ?",
    "answer": "negara",
    "hint": "Tema: Negara. Ucapkan daulatun sebelum melihat jawaban."
  },
  {
    "id": "negara-2",
    "arabic": "عَاصِمَةٌ",
    "transliteration": "'ashimatun",
    "meaning": "ibu kota",
    "category": "Negara",
    "example": "كَلِمَةُ الْيَوْمِ: عَاصِمَةٌ",
    "prompt": "Apa arti kata عَاصِمَةٌ?",
    "answer": "ibu kota",
    "hint": "Tema: Negara. Ucapkan 'ashimatun sebelum melihat jawaban."
  },
  {
    "id": "negara-3",
    "arabic": "عَالَمٌ",
    "transliteration": "'alamun",
    "meaning": "dunia",
    "category": "Negara",
    "example": "كَلِمَةُ الْيَوْمِ: عَالَمٌ",
    "prompt": "Apa arti kata عَالَمٌ?",
    "answer": "dunia",
    "hint": "Tema: Negara. Ucapkan 'alamun sebelum melihat jawaban."
  },
  {
    "id": "negara-4",
    "arabic": "لُغَةٌ",
    "transliteration": "lughatun",
    "meaning": "bahasa",
    "category": "Negara",
    "example": "كَلِمَةُ الْيَوْمِ: لُغَةٌ",
    "prompt": "Apa arti kata لُغَةٌ?",
    "answer": "bahasa",
    "hint": "Tema: Negara. Ucapkan lughatun sebelum melihat jawaban."
  }
];

export default function ArabicMufradatTopik30Page() {
  return <ArabicMufradatPracticePage material={material} drills={drills} />;
}
