import { ArabicMufradatPracticePage, type ArabicMufradatDrill, type ArabicMufradatTopicMaterial } from '../../components/ArabicMufradatPracticePage';

const material: ArabicMufradatTopicMaterial = {
  "id": "arabic-mufradat-waktu",
  "title": "Mufradat 10: Waktu",
  "description": "Kosakata waktu dasar untuk rutinitas.",
  "topicNumber": 10,
  "focus": "Hafalkan arti, pelafalan, dan penggunaan kosakata tema waktu.",
  "goal": "Kenali kata Arab, ucapkan dengan jelas, lalu tulis arti atau contoh pemakaiannya."
};

const drills: ArabicMufradatDrill[] = [
  {
    "id": "waktu-1",
    "arabic": "صَبَاحٌ",
    "transliteration": "shabahun",
    "meaning": "pagi",
    "category": "Waktu",
    "example": "كَلِمَةُ الْيَوْمِ: صَبَاحٌ",
    "prompt": "Apa arti kata صَبَاحٌ?",
    "answer": "pagi",
    "hint": "Tema: Waktu. Ucapkan shabahun sebelum melihat jawaban."
  },
  {
    "id": "waktu-2",
    "arabic": "مَسَاءٌ",
    "transliteration": "masa un",
    "meaning": "sore atau malam",
    "category": "Waktu",
    "example": "كَلِمَةُ الْيَوْمِ: مَسَاءٌ",
    "prompt": "Apa arti kata مَسَاءٌ?",
    "answer": "sore atau malam",
    "hint": "Tema: Waktu. Ucapkan masa un sebelum melihat jawaban."
  },
  {
    "id": "waktu-3",
    "arabic": "لَيْلٌ",
    "transliteration": "lailun",
    "meaning": "malam",
    "category": "Waktu",
    "example": "كَلِمَةُ الْيَوْمِ: لَيْلٌ",
    "prompt": "Apa arti kata لَيْلٌ?",
    "answer": "malam",
    "hint": "Tema: Waktu. Ucapkan lailun sebelum melihat jawaban."
  },
  {
    "id": "waktu-4",
    "arabic": "سَاعَةٌ",
    "transliteration": "sa'atun",
    "meaning": "jam",
    "category": "Waktu",
    "example": "كَلِمَةُ الْيَوْمِ: سَاعَةٌ",
    "prompt": "Apa arti kata سَاعَةٌ?",
    "answer": "jam",
    "hint": "Tema: Waktu. Ucapkan sa'atun sebelum melihat jawaban."
  }
];

export default function ArabicMufradatTopik10Page() {
  return <ArabicMufradatPracticePage material={material} drills={drills} />;
}
