import { ArabicMufradatPracticePage, type ArabicMufradatDrill, type ArabicMufradatTopicMaterial } from '../../components/ArabicMufradatPracticePage';

const material: ArabicMufradatTopicMaterial = {
  "id": "arabic-mufradat-cuaca",
  "title": "Mufradat 17: Cuaca",
  "description": "Kosakata cuaca dan kondisi udara.",
  "topicNumber": 17,
  "focus": "Hafalkan arti, pelafalan, dan penggunaan kosakata tema cuaca.",
  "goal": "Kenali kata Arab, ucapkan dengan jelas, lalu tulis arti atau contoh pemakaiannya."
};

const drills: ArabicMufradatDrill[] = [
  {
    "id": "cuaca-1",
    "arabic": "جَوٌّ",
    "transliteration": "jawwun",
    "meaning": "cuaca",
    "category": "Cuaca",
    "example": "كَلِمَةُ الْيَوْمِ: جَوٌّ",
    "prompt": "Apa arti kata جَوٌّ?",
    "answer": "cuaca",
    "hint": "Tema: Cuaca. Ucapkan jawwun sebelum melihat jawaban."
  },
  {
    "id": "cuaca-2",
    "arabic": "شَمْسٌ",
    "transliteration": "syamsun",
    "meaning": "matahari",
    "category": "Cuaca",
    "example": "كَلِمَةُ الْيَوْمِ: شَمْسٌ",
    "prompt": "Apa arti kata شَمْسٌ?",
    "answer": "matahari",
    "hint": "Tema: Cuaca. Ucapkan syamsun sebelum melihat jawaban."
  },
  {
    "id": "cuaca-3",
    "arabic": "مَطَرٌ",
    "transliteration": "matharun",
    "meaning": "hujan",
    "category": "Cuaca",
    "example": "كَلِمَةُ الْيَوْمِ: مَطَرٌ",
    "prompt": "Apa arti kata مَطَرٌ?",
    "answer": "hujan",
    "hint": "Tema: Cuaca. Ucapkan matharun sebelum melihat jawaban."
  },
  {
    "id": "cuaca-4",
    "arabic": "رِيحٌ",
    "transliteration": "rihun",
    "meaning": "angin",
    "category": "Cuaca",
    "example": "كَلِمَةُ الْيَوْمِ: رِيحٌ",
    "prompt": "Apa arti kata رِيحٌ?",
    "answer": "angin",
    "hint": "Tema: Cuaca. Ucapkan rihun sebelum melihat jawaban."
  }
];

export default function ArabicMufradatTopik17Page() {
  return <ArabicMufradatPracticePage material={material} drills={drills} />;
}
