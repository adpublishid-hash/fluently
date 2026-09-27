import { ArabicMufradatPracticePage, type ArabicMufradatDrill, type ArabicMufradatTopicMaterial } from '../../components/ArabicMufradatPracticePage';

const material: ArabicMufradatTopicMaterial = {
  "id": "arabic-mufradat-minuman",
  "title": "Mufradat 8: Minuman",
  "description": "Kosakata minuman dasar.",
  "topicNumber": 8,
  "focus": "Hafalkan arti, pelafalan, dan penggunaan kosakata tema minuman.",
  "goal": "Kenali kata Arab, ucapkan dengan jelas, lalu tulis arti atau contoh pemakaiannya."
};

const drills: ArabicMufradatDrill[] = [
  {
    "id": "minuman-1",
    "arabic": "مَاءٌ",
    "transliteration": "ma un",
    "meaning": "air",
    "category": "Minuman",
    "example": "كَلِمَةُ الْيَوْمِ: مَاءٌ",
    "prompt": "Apa arti kata مَاءٌ?",
    "answer": "air",
    "hint": "Tema: Minuman. Ucapkan ma un sebelum melihat jawaban."
  },
  {
    "id": "minuman-2",
    "arabic": "شَايٌ",
    "transliteration": "syayun",
    "meaning": "teh",
    "category": "Minuman",
    "example": "كَلِمَةُ الْيَوْمِ: شَايٌ",
    "prompt": "Apa arti kata شَايٌ?",
    "answer": "teh",
    "hint": "Tema: Minuman. Ucapkan syayun sebelum melihat jawaban."
  },
  {
    "id": "minuman-3",
    "arabic": "قَهْوَةٌ",
    "transliteration": "qahwatun",
    "meaning": "kopi",
    "category": "Minuman",
    "example": "كَلِمَةُ الْيَوْمِ: قَهْوَةٌ",
    "prompt": "Apa arti kata قَهْوَةٌ?",
    "answer": "kopi",
    "hint": "Tema: Minuman. Ucapkan qahwatun sebelum melihat jawaban."
  },
  {
    "id": "minuman-4",
    "arabic": "حَلِيبٌ",
    "transliteration": "halibun",
    "meaning": "susu",
    "category": "Minuman",
    "example": "كَلِمَةُ الْيَوْمِ: حَلِيبٌ",
    "prompt": "Apa arti kata حَلِيبٌ?",
    "answer": "susu",
    "hint": "Tema: Minuman. Ucapkan halibun sebelum melihat jawaban."
  }
];

export default function ArabicMufradatTopik8Page() {
  return <ArabicMufradatPracticePage material={material} drills={drills} />;
}
