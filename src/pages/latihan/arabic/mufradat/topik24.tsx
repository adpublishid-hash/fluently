import { ArabicMufradatPracticePage, type ArabicMufradatDrill, type ArabicMufradatTopicMaterial } from '../../components/ArabicMufradatPracticePage';

const material: ArabicMufradatTopicMaterial = {
  "id": "arabic-mufradat-buah",
  "title": "Mufradat 24: Buah",
  "description": "Kosakata buah-buahan dasar.",
  "topicNumber": 24,
  "focus": "Hafalkan arti, pelafalan, dan penggunaan kosakata tema buah.",
  "goal": "Kenali kata Arab, ucapkan dengan jelas, lalu tulis arti atau contoh pemakaiannya."
};

const drills: ArabicMufradatDrill[] = [
  {
    "id": "buah-1",
    "arabic": "تُفَّاحٌ",
    "transliteration": "tuffahun",
    "meaning": "apel",
    "category": "Buah",
    "example": "كَلِمَةُ الْيَوْمِ: تُفَّاحٌ",
    "prompt": "Apa arti kata تُفَّاحٌ?",
    "answer": "apel",
    "hint": "Tema: Buah. Ucapkan tuffahun sebelum melihat jawaban."
  },
  {
    "id": "buah-2",
    "arabic": "مَوْزٌ",
    "transliteration": "mauzun",
    "meaning": "pisang",
    "category": "Buah",
    "example": "كَلِمَةُ الْيَوْمِ: مَوْزٌ",
    "prompt": "Apa arti kata مَوْزٌ?",
    "answer": "pisang",
    "hint": "Tema: Buah. Ucapkan mauzun sebelum melihat jawaban."
  },
  {
    "id": "buah-3",
    "arabic": "بُرْتُقَالٌ",
    "transliteration": "burtuqalun",
    "meaning": "jeruk",
    "category": "Buah",
    "example": "كَلِمَةُ الْيَوْمِ: بُرْتُقَالٌ",
    "prompt": "Apa arti kata بُرْتُقَالٌ?",
    "answer": "jeruk",
    "hint": "Tema: Buah. Ucapkan burtuqalun sebelum melihat jawaban."
  },
  {
    "id": "buah-4",
    "arabic": "تَمْرٌ",
    "transliteration": "tamrun",
    "meaning": "kurma",
    "category": "Buah",
    "example": "كَلِمَةُ الْيَوْمِ: تَمْرٌ",
    "prompt": "Apa arti kata تَمْرٌ?",
    "answer": "kurma",
    "hint": "Tema: Buah. Ucapkan tamrun sebelum melihat jawaban."
  }
];

export default function ArabicMufradatTopik24Page() {
  return <ArabicMufradatPracticePage material={material} drills={drills} />;
}
