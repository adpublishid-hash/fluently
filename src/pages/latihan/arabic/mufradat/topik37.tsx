import { ArabicMufradatPracticePage, type ArabicMufradatDrill, type ArabicMufradatTopicMaterial } from '../../components/ArabicMufradatPracticePage';

const material: ArabicMufradatTopicMaterial = {
  "id": "arabic-mufradat-kata-sambung",
  "title": "Mufradat 37: Kata Sambung",
  "description": "Kosakata penghubung kalimat dasar.",
  "topicNumber": 37,
  "focus": "Hafalkan arti, pelafalan, dan penggunaan kosakata tema kata sambung.",
  "goal": "Kenali kata Arab, ucapkan dengan jelas, lalu tulis arti atau contoh pemakaiannya."
};

const drills: ArabicMufradatDrill[] = [
  {
    "id": "kata-sambung-1",
    "arabic": "وَ",
    "transliteration": "wa",
    "meaning": "dan",
    "category": "Kata Sambung",
    "example": "كَلِمَةُ الْيَوْمِ: وَ",
    "prompt": "Apa arti kata وَ?",
    "answer": "dan",
    "hint": "Tema: Kata Sambung. Ucapkan wa sebelum melihat jawaban."
  },
  {
    "id": "kata-sambung-2",
    "arabic": "أَوْ",
    "transliteration": "au",
    "meaning": "atau",
    "category": "Kata Sambung",
    "example": "كَلِمَةُ الْيَوْمِ: أَوْ",
    "prompt": "Apa arti kata أَوْ?",
    "answer": "atau",
    "hint": "Tema: Kata Sambung. Ucapkan au sebelum melihat jawaban."
  },
  {
    "id": "kata-sambung-3",
    "arabic": "لٰكِنْ",
    "transliteration": "lakin",
    "meaning": "tetapi",
    "category": "Kata Sambung",
    "example": "كَلِمَةُ الْيَوْمِ: لٰكِنْ",
    "prompt": "Apa arti kata لٰكِنْ?",
    "answer": "tetapi",
    "hint": "Tema: Kata Sambung. Ucapkan lakin sebelum melihat jawaban."
  },
  {
    "id": "kata-sambung-4",
    "arabic": "ثُمَّ",
    "transliteration": "tsumma",
    "meaning": "kemudian",
    "category": "Kata Sambung",
    "example": "كَلِمَةُ الْيَوْمِ: ثُمَّ",
    "prompt": "Apa arti kata ثُمَّ?",
    "answer": "kemudian",
    "hint": "Tema: Kata Sambung. Ucapkan tsumma sebelum melihat jawaban."
  }
];

export default function ArabicMufradatTopik37Page() {
  return <ArabicMufradatPracticePage material={material} drills={drills} />;
}
