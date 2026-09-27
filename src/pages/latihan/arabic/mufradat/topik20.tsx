import { ArabicMufradatPracticePage, type ArabicMufradatDrill, type ArabicMufradatTopicMaterial } from '../../components/ArabicMufradatPracticePage';

const material: ArabicMufradatTopicMaterial = {
  "id": "arabic-mufradat-sifat-dasar",
  "title": "Mufradat 20: Sifat Dasar",
  "description": "Kosakata sifat untuk mendeskripsikan benda dan orang.",
  "topicNumber": 20,
  "focus": "Hafalkan arti, pelafalan, dan penggunaan kosakata tema sifat dasar.",
  "goal": "Kenali kata Arab, ucapkan dengan jelas, lalu tulis arti atau contoh pemakaiannya."
};

const drills: ArabicMufradatDrill[] = [
  {
    "id": "sifat-dasar-1",
    "arabic": "كَبِيرٌ",
    "transliteration": "kabirun",
    "meaning": "besar",
    "category": "Sifat Dasar",
    "example": "كَلِمَةُ الْيَوْمِ: كَبِيرٌ",
    "prompt": "Apa arti kata كَبِيرٌ?",
    "answer": "besar",
    "hint": "Tema: Sifat Dasar. Ucapkan kabirun sebelum melihat jawaban."
  },
  {
    "id": "sifat-dasar-2",
    "arabic": "صَغِيرٌ",
    "transliteration": "shaghirun",
    "meaning": "kecil",
    "category": "Sifat Dasar",
    "example": "كَلِمَةُ الْيَوْمِ: صَغِيرٌ",
    "prompt": "Apa arti kata صَغِيرٌ?",
    "answer": "kecil",
    "hint": "Tema: Sifat Dasar. Ucapkan shaghirun sebelum melihat jawaban."
  },
  {
    "id": "sifat-dasar-3",
    "arabic": "جَدِيدٌ",
    "transliteration": "jadidun",
    "meaning": "baru",
    "category": "Sifat Dasar",
    "example": "كَلِمَةُ الْيَوْمِ: جَدِيدٌ",
    "prompt": "Apa arti kata جَدِيدٌ?",
    "answer": "baru",
    "hint": "Tema: Sifat Dasar. Ucapkan jadidun sebelum melihat jawaban."
  },
  {
    "id": "sifat-dasar-4",
    "arabic": "جَمِيلٌ",
    "transliteration": "jamilun",
    "meaning": "indah",
    "category": "Sifat Dasar",
    "example": "كَلِمَةُ الْيَوْمِ: جَمِيلٌ",
    "prompt": "Apa arti kata جَمِيلٌ?",
    "answer": "indah",
    "hint": "Tema: Sifat Dasar. Ucapkan jamilun sebelum melihat jawaban."
  }
];

export default function ArabicMufradatTopik20Page() {
  return <ArabicMufradatPracticePage material={material} drills={drills} />;
}
