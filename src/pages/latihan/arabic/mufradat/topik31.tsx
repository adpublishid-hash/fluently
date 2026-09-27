import { ArabicMufradatPracticePage, type ArabicMufradatDrill, type ArabicMufradatTopicMaterial } from '../../components/ArabicMufradatPracticePage';

const material: ArabicMufradatTopicMaterial = {
  "id": "arabic-mufradat-perasaan",
  "title": "Mufradat 31: Perasaan",
  "description": "Kosakata untuk mengungkapkan perasaan.",
  "topicNumber": 31,
  "focus": "Hafalkan arti, pelafalan, dan penggunaan kosakata tema perasaan.",
  "goal": "Kenali kata Arab, ucapkan dengan jelas, lalu tulis arti atau contoh pemakaiannya."
};

const drills: ArabicMufradatDrill[] = [
  {
    "id": "perasaan-1",
    "arabic": "سَعِيدٌ",
    "transliteration": "sa'idun",
    "meaning": "senang",
    "category": "Perasaan",
    "example": "كَلِمَةُ الْيَوْمِ: سَعِيدٌ",
    "prompt": "Apa arti kata سَعِيدٌ?",
    "answer": "senang",
    "hint": "Tema: Perasaan. Ucapkan sa'idun sebelum melihat jawaban."
  },
  {
    "id": "perasaan-2",
    "arabic": "حَزِينٌ",
    "transliteration": "hazinun",
    "meaning": "sedih",
    "category": "Perasaan",
    "example": "كَلِمَةُ الْيَوْمِ: حَزِينٌ",
    "prompt": "Apa arti kata حَزِينٌ?",
    "answer": "sedih",
    "hint": "Tema: Perasaan. Ucapkan hazinun sebelum melihat jawaban."
  },
  {
    "id": "perasaan-3",
    "arabic": "خَائِفٌ",
    "transliteration": "kha ifun",
    "meaning": "takut",
    "category": "Perasaan",
    "example": "كَلِمَةُ الْيَوْمِ: خَائِفٌ",
    "prompt": "Apa arti kata خَائِفٌ?",
    "answer": "takut",
    "hint": "Tema: Perasaan. Ucapkan kha ifun sebelum melihat jawaban."
  },
  {
    "id": "perasaan-4",
    "arabic": "غَاضِبٌ",
    "transliteration": "ghadhibun",
    "meaning": "marah",
    "category": "Perasaan",
    "example": "كَلِمَةُ الْيَوْمِ: غَاضِبٌ",
    "prompt": "Apa arti kata غَاضِبٌ?",
    "answer": "marah",
    "hint": "Tema: Perasaan. Ucapkan ghadhibun sebelum melihat jawaban."
  }
];

export default function ArabicMufradatTopik31Page() {
  return <ArabicMufradatPracticePage material={material} drills={drills} />;
}
