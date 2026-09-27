import { ArabicMufradatPracticePage, type ArabicMufradatDrill, type ArabicMufradatTopicMaterial } from '../../components/ArabicMufradatPracticePage';

const material: ArabicMufradatTopicMaterial = {
  "id": "arabic-mufradat-arah",
  "title": "Mufradat 21: Arah",
  "description": "Kosakata arah dan posisi dasar.",
  "topicNumber": 21,
  "focus": "Hafalkan arti, pelafalan, dan penggunaan kosakata tema arah.",
  "goal": "Kenali kata Arab, ucapkan dengan jelas, lalu tulis arti atau contoh pemakaiannya."
};

const drills: ArabicMufradatDrill[] = [
  {
    "id": "arah-1",
    "arabic": "يَمِينٌ",
    "transliteration": "yaminun",
    "meaning": "kanan",
    "category": "Arah",
    "example": "كَلِمَةُ الْيَوْمِ: يَمِينٌ",
    "prompt": "Apa arti kata يَمِينٌ?",
    "answer": "kanan",
    "hint": "Tema: Arah. Ucapkan yaminun sebelum melihat jawaban."
  },
  {
    "id": "arah-2",
    "arabic": "يَسَارٌ",
    "transliteration": "yasarun",
    "meaning": "kiri",
    "category": "Arah",
    "example": "كَلِمَةُ الْيَوْمِ: يَسَارٌ",
    "prompt": "Apa arti kata يَسَارٌ?",
    "answer": "kiri",
    "hint": "Tema: Arah. Ucapkan yasarun sebelum melihat jawaban."
  },
  {
    "id": "arah-3",
    "arabic": "أَمَامَ",
    "transliteration": "amama",
    "meaning": "di depan",
    "category": "Arah",
    "example": "كَلِمَةُ الْيَوْمِ: أَمَامَ",
    "prompt": "Apa arti kata أَمَامَ?",
    "answer": "di depan",
    "hint": "Tema: Arah. Ucapkan amama sebelum melihat jawaban."
  },
  {
    "id": "arah-4",
    "arabic": "خَلْفَ",
    "transliteration": "khalfa",
    "meaning": "di belakang",
    "category": "Arah",
    "example": "كَلِمَةُ الْيَوْمِ: خَلْفَ",
    "prompt": "Apa arti kata خَلْفَ?",
    "answer": "di belakang",
    "hint": "Tema: Arah. Ucapkan khalfa sebelum melihat jawaban."
  }
];

export default function ArabicMufradatTopik21Page() {
  return <ArabicMufradatPracticePage material={material} drills={drills} />;
}
