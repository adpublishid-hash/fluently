import { ArabicMufradatPracticePage, type ArabicMufradatDrill, type ArabicMufradatTopicMaterial } from '../../components/ArabicMufradatPracticePage';

const material: ArabicMufradatTopicMaterial = {
  "id": "arabic-mufradat-sayur",
  "title": "Mufradat 25: Sayur",
  "description": "Kosakata sayuran yang sering dipakai.",
  "topicNumber": 25,
  "focus": "Hafalkan arti, pelafalan, dan penggunaan kosakata tema sayur.",
  "goal": "Kenali kata Arab, ucapkan dengan jelas, lalu tulis arti atau contoh pemakaiannya."
};

const drills: ArabicMufradatDrill[] = [
  {
    "id": "sayur-1",
    "arabic": "خَسٌّ",
    "transliteration": "khassun",
    "meaning": "selada",
    "category": "Sayur",
    "example": "كَلِمَةُ الْيَوْمِ: خَسٌّ",
    "prompt": "Apa arti kata خَسٌّ?",
    "answer": "selada",
    "hint": "Tema: Sayur. Ucapkan khassun sebelum melihat jawaban."
  },
  {
    "id": "sayur-2",
    "arabic": "جَزَرٌ",
    "transliteration": "jazarun",
    "meaning": "wortel",
    "category": "Sayur",
    "example": "كَلِمَةُ الْيَوْمِ: جَزَرٌ",
    "prompt": "Apa arti kata جَزَرٌ?",
    "answer": "wortel",
    "hint": "Tema: Sayur. Ucapkan jazarun sebelum melihat jawaban."
  },
  {
    "id": "sayur-3",
    "arabic": "خِيَارٌ",
    "transliteration": "khiyarun",
    "meaning": "timun",
    "category": "Sayur",
    "example": "كَلِمَةُ الْيَوْمِ: خِيَارٌ",
    "prompt": "Apa arti kata خِيَارٌ?",
    "answer": "timun",
    "hint": "Tema: Sayur. Ucapkan khiyarun sebelum melihat jawaban."
  },
  {
    "id": "sayur-4",
    "arabic": "بَصَلٌ",
    "transliteration": "bashalun",
    "meaning": "bawang",
    "category": "Sayur",
    "example": "كَلِمَةُ الْيَوْمِ: بَصَلٌ",
    "prompt": "Apa arti kata بَصَلٌ?",
    "answer": "bawang",
    "hint": "Tema: Sayur. Ucapkan bashalun sebelum melihat jawaban."
  }
];

export default function ArabicMufradatTopik25Page() {
  return <ArabicMufradatPracticePage material={material} drills={drills} />;
}
