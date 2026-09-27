import { ArabicMufradatPracticePage, type ArabicMufradatDrill, type ArabicMufradatTopicMaterial } from '../../components/ArabicMufradatPracticePage';

const material: ArabicMufradatTopicMaterial = {
  "id": "arabic-mufradat-rumah",
  "title": "Mufradat 4: Rumah",
  "description": "Kosakata bagian rumah sederhana.",
  "topicNumber": 4,
  "focus": "Hafalkan arti, pelafalan, dan penggunaan kosakata tema rumah.",
  "goal": "Kenali kata Arab, ucapkan dengan jelas, lalu tulis arti atau contoh pemakaiannya."
};

const drills: ArabicMufradatDrill[] = [
  {
    "id": "rumah-1",
    "arabic": "بَيْتٌ",
    "transliteration": "baitun",
    "meaning": "rumah",
    "category": "Rumah",
    "example": "كَلِمَةُ الْيَوْمِ: بَيْتٌ",
    "prompt": "Apa arti kata بَيْتٌ?",
    "answer": "rumah",
    "hint": "Tema: Rumah. Ucapkan baitun sebelum melihat jawaban."
  },
  {
    "id": "rumah-2",
    "arabic": "غُرْفَةٌ",
    "transliteration": "ghurfatun",
    "meaning": "kamar",
    "category": "Rumah",
    "example": "كَلِمَةُ الْيَوْمِ: غُرْفَةٌ",
    "prompt": "Apa arti kata غُرْفَةٌ?",
    "answer": "kamar",
    "hint": "Tema: Rumah. Ucapkan ghurfatun sebelum melihat jawaban."
  },
  {
    "id": "rumah-3",
    "arabic": "بَابٌ",
    "transliteration": "babun",
    "meaning": "pintu",
    "category": "Rumah",
    "example": "كَلِمَةُ الْيَوْمِ: بَابٌ",
    "prompt": "Apa arti kata بَابٌ?",
    "answer": "pintu",
    "hint": "Tema: Rumah. Ucapkan babun sebelum melihat jawaban."
  },
  {
    "id": "rumah-4",
    "arabic": "نَافِذَةٌ",
    "transliteration": "naafidzatun",
    "meaning": "jendela",
    "category": "Rumah",
    "example": "كَلِمَةُ الْيَوْمِ: نَافِذَةٌ",
    "prompt": "Apa arti kata نَافِذَةٌ?",
    "answer": "jendela",
    "hint": "Tema: Rumah. Ucapkan naafidzatun sebelum melihat jawaban."
  }
];

export default function ArabicMufradatTopik4Page() {
  return <ArabicMufradatPracticePage material={material} drills={drills} />;
}
