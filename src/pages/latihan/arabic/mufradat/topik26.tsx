import { ArabicMufradatPracticePage, type ArabicMufradatDrill, type ArabicMufradatTopicMaterial } from '../../components/ArabicMufradatPracticePage';

const material: ArabicMufradatTopicMaterial = {
  "id": "arabic-mufradat-peralatan-rumah",
  "title": "Mufradat 26: Peralatan Rumah",
  "description": "Kosakata benda rumah tangga.",
  "topicNumber": 26,
  "focus": "Hafalkan arti, pelafalan, dan penggunaan kosakata tema peralatan rumah.",
  "goal": "Kenali kata Arab, ucapkan dengan jelas, lalu tulis arti atau contoh pemakaiannya."
};

const drills: ArabicMufradatDrill[] = [
  {
    "id": "peralatan-rumah-1",
    "arabic": "سَرِيرٌ",
    "transliteration": "sarirun",
    "meaning": "tempat tidur",
    "category": "Peralatan Rumah",
    "example": "كَلِمَةُ الْيَوْمِ: سَرِيرٌ",
    "prompt": "Apa arti kata سَرِيرٌ?",
    "answer": "tempat tidur",
    "hint": "Tema: Peralatan Rumah. Ucapkan sarirun sebelum melihat jawaban."
  },
  {
    "id": "peralatan-rumah-2",
    "arabic": "طَاوِلَةٌ",
    "transliteration": "thawilatun",
    "meaning": "meja",
    "category": "Peralatan Rumah",
    "example": "كَلِمَةُ الْيَوْمِ: طَاوِلَةٌ",
    "prompt": "Apa arti kata طَاوِلَةٌ?",
    "answer": "meja",
    "hint": "Tema: Peralatan Rumah. Ucapkan thawilatun sebelum melihat jawaban."
  },
  {
    "id": "peralatan-rumah-3",
    "arabic": "مِصْبَاحٌ",
    "transliteration": "mishbahun",
    "meaning": "lampu",
    "category": "Peralatan Rumah",
    "example": "كَلِمَةُ الْيَوْمِ: مِصْبَاحٌ",
    "prompt": "Apa arti kata مِصْبَاحٌ?",
    "answer": "lampu",
    "hint": "Tema: Peralatan Rumah. Ucapkan mishbahun sebelum melihat jawaban."
  },
  {
    "id": "peralatan-rumah-4",
    "arabic": "مِفْتَاحٌ",
    "transliteration": "miftahun",
    "meaning": "kunci",
    "category": "Peralatan Rumah",
    "example": "كَلِمَةُ الْيَوْمِ: مِفْتَاحٌ",
    "prompt": "Apa arti kata مِفْتَاحٌ?",
    "answer": "kunci",
    "hint": "Tema: Peralatan Rumah. Ucapkan miftahun sebelum melihat jawaban."
  }
];

export default function ArabicMufradatTopik26Page() {
  return <ArabicMufradatPracticePage material={material} drills={drills} />;
}
