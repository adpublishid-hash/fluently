import { ArabicMufradatPracticePage, type ArabicMufradatDrill, type ArabicMufradatTopicMaterial } from '../../components/ArabicMufradatPracticePage';

const material: ArabicMufradatTopicMaterial = {
  "id": "arabic-mufradat-kota",
  "title": "Mufradat 29: Kota",
  "description": "Kosakata tempat dan bagian kota.",
  "topicNumber": 29,
  "focus": "Hafalkan arti, pelafalan, dan penggunaan kosakata tema kota.",
  "goal": "Kenali kata Arab, ucapkan dengan jelas, lalu tulis arti atau contoh pemakaiannya."
};

const drills: ArabicMufradatDrill[] = [
  {
    "id": "kota-1",
    "arabic": "مَدِينَةٌ",
    "transliteration": "madinatun",
    "meaning": "kota",
    "category": "Kota",
    "example": "كَلِمَةُ الْيَوْمِ: مَدِينَةٌ",
    "prompt": "Apa arti kata مَدِينَةٌ?",
    "answer": "kota",
    "hint": "Tema: Kota. Ucapkan madinatun sebelum melihat jawaban."
  },
  {
    "id": "kota-2",
    "arabic": "شَارِعٌ",
    "transliteration": "syari'un",
    "meaning": "jalan",
    "category": "Kota",
    "example": "كَلِمَةُ الْيَوْمِ: شَارِعٌ",
    "prompt": "Apa arti kata شَارِعٌ?",
    "answer": "jalan",
    "hint": "Tema: Kota. Ucapkan syari'un sebelum melihat jawaban."
  },
  {
    "id": "kota-3",
    "arabic": "حَيٌّ",
    "transliteration": "hayyun",
    "meaning": "lingkungan",
    "category": "Kota",
    "example": "كَلِمَةُ الْيَوْمِ: حَيٌّ",
    "prompt": "Apa arti kata حَيٌّ?",
    "answer": "lingkungan",
    "hint": "Tema: Kota. Ucapkan hayyun sebelum melihat jawaban."
  },
  {
    "id": "kota-4",
    "arabic": "مَحَطَّةٌ",
    "transliteration": "mahaththatun",
    "meaning": "stasiun",
    "category": "Kota",
    "example": "كَلِمَةُ الْيَوْمِ: مَحَطَّةٌ",
    "prompt": "Apa arti kata مَحَطَّةٌ?",
    "answer": "stasiun",
    "hint": "Tema: Kota. Ucapkan mahaththatun sebelum melihat jawaban."
  }
];

export default function ArabicMufradatTopik29Page() {
  return <ArabicMufradatPracticePage material={material} drills={drills} />;
}
