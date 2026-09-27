import { ArabicMufradatPracticePage, type ArabicMufradatDrill, type ArabicMufradatTopicMaterial } from '../../components/ArabicMufradatPracticePage';

const material: ArabicMufradatTopicMaterial = {
  "id": "arabic-mufradat-kata-depan",
  "title": "Mufradat 38: Kata Depan",
  "description": "Huruf jar dan preposisi paling dasar.",
  "topicNumber": 38,
  "focus": "Hafalkan arti, pelafalan, dan penggunaan kosakata tema kata depan.",
  "goal": "Kenali kata Arab, ucapkan dengan jelas, lalu tulis arti atau contoh pemakaiannya."
};

const drills: ArabicMufradatDrill[] = [
  {
    "id": "kata-depan-1",
    "arabic": "فِي",
    "transliteration": "fi",
    "meaning": "di dalam",
    "category": "Kata Depan",
    "example": "كَلِمَةُ الْيَوْمِ: فِي",
    "prompt": "Apa arti kata فِي?",
    "answer": "di dalam",
    "hint": "Tema: Kata Depan. Ucapkan fi sebelum melihat jawaban."
  },
  {
    "id": "kata-depan-2",
    "arabic": "عَلَى",
    "transliteration": "'ala",
    "meaning": "di atas",
    "category": "Kata Depan",
    "example": "كَلِمَةُ الْيَوْمِ: عَلَى",
    "prompt": "Apa arti kata عَلَى?",
    "answer": "di atas",
    "hint": "Tema: Kata Depan. Ucapkan 'ala sebelum melihat jawaban."
  },
  {
    "id": "kata-depan-3",
    "arabic": "إِلَى",
    "transliteration": "ila",
    "meaning": "ke",
    "category": "Kata Depan",
    "example": "كَلِمَةُ الْيَوْمِ: إِلَى",
    "prompt": "Apa arti kata إِلَى?",
    "answer": "ke",
    "hint": "Tema: Kata Depan. Ucapkan ila sebelum melihat jawaban."
  },
  {
    "id": "kata-depan-4",
    "arabic": "مِنْ",
    "transliteration": "min",
    "meaning": "dari",
    "category": "Kata Depan",
    "example": "كَلِمَةُ الْيَوْمِ: مِنْ",
    "prompt": "Apa arti kata مِنْ?",
    "answer": "dari",
    "hint": "Tema: Kata Depan. Ucapkan min sebelum melihat jawaban."
  }
];

export default function ArabicMufradatTopik38Page() {
  return <ArabicMufradatPracticePage material={material} drills={drills} />;
}
