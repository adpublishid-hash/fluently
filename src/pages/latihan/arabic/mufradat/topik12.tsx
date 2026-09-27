import { ArabicMufradatPracticePage, type ArabicMufradatDrill, type ArabicMufradatTopicMaterial } from '../../components/ArabicMufradatPracticePage';

const material: ArabicMufradatTopicMaterial = {
  "id": "arabic-mufradat-pakaian",
  "title": "Mufradat 12: Pakaian",
  "description": "Kosakata pakaian dan benda yang dikenakan.",
  "topicNumber": 12,
  "focus": "Hafalkan arti, pelafalan, dan penggunaan kosakata tema pakaian.",
  "goal": "Kenali kata Arab, ucapkan dengan jelas, lalu tulis arti atau contoh pemakaiannya."
};

const drills: ArabicMufradatDrill[] = [
  {
    "id": "pakaian-1",
    "arabic": "قَمِيصٌ",
    "transliteration": "qamishun",
    "meaning": "kemeja",
    "category": "Pakaian",
    "example": "كَلِمَةُ الْيَوْمِ: قَمِيصٌ",
    "prompt": "Apa arti kata قَمِيصٌ?",
    "answer": "kemeja",
    "hint": "Tema: Pakaian. Ucapkan qamishun sebelum melihat jawaban."
  },
  {
    "id": "pakaian-2",
    "arabic": "سِرْوَالٌ",
    "transliteration": "sirwalun",
    "meaning": "celana",
    "category": "Pakaian",
    "example": "كَلِمَةُ الْيَوْمِ: سِرْوَالٌ",
    "prompt": "Apa arti kata سِرْوَالٌ?",
    "answer": "celana",
    "hint": "Tema: Pakaian. Ucapkan sirwalun sebelum melihat jawaban."
  },
  {
    "id": "pakaian-3",
    "arabic": "ثَوْبٌ",
    "transliteration": "tsaubun",
    "meaning": "pakaian atau gamis",
    "category": "Pakaian",
    "example": "كَلِمَةُ الْيَوْمِ: ثَوْبٌ",
    "prompt": "Apa arti kata ثَوْبٌ?",
    "answer": "pakaian atau gamis",
    "hint": "Tema: Pakaian. Ucapkan tsaubun sebelum melihat jawaban."
  },
  {
    "id": "pakaian-4",
    "arabic": "حِذَاءٌ",
    "transliteration": "hidza un",
    "meaning": "sepatu",
    "category": "Pakaian",
    "example": "كَلِمَةُ الْيَوْمِ: حِذَاءٌ",
    "prompt": "Apa arti kata حِذَاءٌ?",
    "answer": "sepatu",
    "hint": "Tema: Pakaian. Ucapkan hidza un sebelum melihat jawaban."
  }
];

export default function ArabicMufradatTopik12Page() {
  return <ArabicMufradatPracticePage material={material} drills={drills} />;
}
