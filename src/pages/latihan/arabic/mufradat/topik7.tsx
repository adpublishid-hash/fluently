import { ArabicMufradatPracticePage, type ArabicMufradatDrill, type ArabicMufradatTopicMaterial } from '../../components/ArabicMufradatPracticePage';

const material: ArabicMufradatTopicMaterial = {
  "id": "arabic-mufradat-makanan",
  "title": "Mufradat 7: Makanan",
  "description": "Kosakata makanan sehari-hari.",
  "topicNumber": 7,
  "focus": "Hafalkan arti, pelafalan, dan penggunaan kosakata tema makanan.",
  "goal": "Kenali kata Arab, ucapkan dengan jelas, lalu tulis arti atau contoh pemakaiannya."
};

const drills: ArabicMufradatDrill[] = [
  {
    "id": "makanan-1",
    "arabic": "خُبْزٌ",
    "transliteration": "khubzun",
    "meaning": "roti",
    "category": "Makanan",
    "example": "كَلِمَةُ الْيَوْمِ: خُبْزٌ",
    "prompt": "Apa arti kata خُبْزٌ?",
    "answer": "roti",
    "hint": "Tema: Makanan. Ucapkan khubzun sebelum melihat jawaban."
  },
  {
    "id": "makanan-2",
    "arabic": "أُرْزٌّ",
    "transliteration": "uruzzun",
    "meaning": "nasi",
    "category": "Makanan",
    "example": "كَلِمَةُ الْيَوْمِ: أُرْزٌّ",
    "prompt": "Apa arti kata أُرْزٌّ?",
    "answer": "nasi",
    "hint": "Tema: Makanan. Ucapkan uruzzun sebelum melihat jawaban."
  },
  {
    "id": "makanan-3",
    "arabic": "لَحْمٌ",
    "transliteration": "lahmun",
    "meaning": "daging",
    "category": "Makanan",
    "example": "كَلِمَةُ الْيَوْمِ: لَحْمٌ",
    "prompt": "Apa arti kata لَحْمٌ?",
    "answer": "daging",
    "hint": "Tema: Makanan. Ucapkan lahmun sebelum melihat jawaban."
  },
  {
    "id": "makanan-4",
    "arabic": "سَمَكٌ",
    "transliteration": "samakun",
    "meaning": "ikan",
    "category": "Makanan",
    "example": "كَلِمَةُ الْيَوْمِ: سَمَكٌ",
    "prompt": "Apa arti kata سَمَكٌ?",
    "answer": "ikan",
    "hint": "Tema: Makanan. Ucapkan samakun sebelum melihat jawaban."
  }
];

export default function ArabicMufradatTopik7Page() {
  return <ArabicMufradatPracticePage material={material} drills={drills} />;
}
