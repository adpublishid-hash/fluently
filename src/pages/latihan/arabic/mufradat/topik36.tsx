import { ArabicMufradatPracticePage, type ArabicMufradatDrill, type ArabicMufradatTopicMaterial } from '../../components/ArabicMufradatPracticePage';

const material: ArabicMufradatTopicMaterial = {
  "id": "arabic-mufradat-pertanyaan-umum",
  "title": "Mufradat 36: Pertanyaan Umum",
  "description": "Kata tanya yang sering dipakai.",
  "topicNumber": 36,
  "focus": "Hafalkan arti, pelafalan, dan penggunaan kosakata tema pertanyaan umum.",
  "goal": "Kenali kata Arab, ucapkan dengan jelas, lalu tulis arti atau contoh pemakaiannya."
};

const drills: ArabicMufradatDrill[] = [
  {
    "id": "pertanyaan-umum-1",
    "arabic": "مَنْ",
    "transliteration": "man",
    "meaning": "siapa",
    "category": "Pertanyaan Umum",
    "example": "كَلِمَةُ الْيَوْمِ: مَنْ",
    "prompt": "Apa arti kata مَنْ?",
    "answer": "siapa",
    "hint": "Tema: Pertanyaan Umum. Ucapkan man sebelum melihat jawaban."
  },
  {
    "id": "pertanyaan-umum-2",
    "arabic": "مَا",
    "transliteration": "ma",
    "meaning": "apa",
    "category": "Pertanyaan Umum",
    "example": "كَلِمَةُ الْيَوْمِ: مَا",
    "prompt": "Apa arti kata مَا?",
    "answer": "apa",
    "hint": "Tema: Pertanyaan Umum. Ucapkan ma sebelum melihat jawaban."
  },
  {
    "id": "pertanyaan-umum-3",
    "arabic": "أَيْنَ",
    "transliteration": "ayna",
    "meaning": "di mana",
    "category": "Pertanyaan Umum",
    "example": "كَلِمَةُ الْيَوْمِ: أَيْنَ",
    "prompt": "Apa arti kata أَيْنَ?",
    "answer": "di mana",
    "hint": "Tema: Pertanyaan Umum. Ucapkan ayna sebelum melihat jawaban."
  },
  {
    "id": "pertanyaan-umum-4",
    "arabic": "مَتَى",
    "transliteration": "mata",
    "meaning": "kapan",
    "category": "Pertanyaan Umum",
    "example": "كَلِمَةُ الْيَوْمِ: مَتَى",
    "prompt": "Apa arti kata مَتَى?",
    "answer": "kapan",
    "hint": "Tema: Pertanyaan Umum. Ucapkan mata sebelum melihat jawaban."
  }
];

export default function ArabicMufradatTopik36Page() {
  return <ArabicMufradatPracticePage material={material} drills={drills} />;
}
